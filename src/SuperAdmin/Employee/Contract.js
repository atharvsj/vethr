// // import React, { useState, useMemo, useEffect, useCallback, useContext } from 'react';
// // import { EmployeeContext } from './EmployeeContext';
// // import {
// //   Box,
// //   TextField,
// //   MenuItem,
// //   Grid,
// //   Typography,
// //   Button,
// //   InputAdornment,
// //   TextareaAutosize,
// //   Paper,
// //   Tabs,
// //   Tab,
// //   CircularProgress,
// //   Alert,
// // } from '@mui/material';
// // import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// // import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// // import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// // import Lock from '@mui/icons-material/Lock';
// // import dayjs from 'dayjs';

// // // Assuming your axios instance is set up here
// // import axiosInstance from '../../utils/axiosInstance';

// // // Import child components
// // import Allowances from './Allowances';
// // import Commissions from './Commissions';
// // import StatutoryDeductions from './StatutoryDeductions';
// // import Reimbursements from './Reimbursements';

// // const probationOptions = [{ value: 'Y', label: 'Yes' }, { value: 'N', 'label': 'No' }];

// // const Detail = () => {
// //   const [tab, setTab] = useState(0);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);

// //   // Form state
// //   const [joiningDate, setJoiningDate] = useState(null);
// //   const [departmentId, setDepartmentId] = useState('');
// //   const [designationId, setDesignationId] = useState('');
// //   const [grossSalary, setGrossSalary] = useState('0.00');
// //   const [basicSalaryMonthly, setBasicSalaryMonthly] = useState('0.00');
// //   // REMOVED: hourlyRate state
// //   const [probation, setProbation] = useState('');
// //   const [probationEndDate, setProbationEndDate] = useState(null);
// //   const [officeShiftId, setOfficeShiftId] = useState('');
// //   const [roleDescription, setRoleDescription] = useState('');
// //   // REMOVED: billing state
// //   const [managerId, setManagerId] = useState('');

// //   // State to hold dropdown options from API
// //   const [departmentsList, setDepartmentsList] = useState([]);
// //   const [designationsList, setDesignationsList] = useState([]);
// //   const [officeShiftsList, setOfficeShiftsList] = useState([]);

// //   const { employeeId } = useContext(EmployeeContext);
// //   const userId = employeeId;

// //   useEffect(() => {
// //     const fetchDropdownData = async () => {
// //       try {
// //         const [deptRes, desigRes, shiftRes] = await Promise.all([
// //           axiosInstance.get('api/departments/dropdown/'),
// //           axiosInstance.get('api/designations/dropdown/'),
// //           axiosInstance.get('api/office_shift_dropdown/'),
// //         ]);

// //         if (deptRes.data && deptRes.data.status === true) {
// //           setDepartmentsList(deptRes.data.data || []);
// //         }
// //         if (desigRes.data && desigRes.data.status === true) {
// //           setDesignationsList(desigRes.data.data || []);
// //         }
// //         if (shiftRes.data && shiftRes.data.status === 'success') {
// //           setOfficeShiftsList(shiftRes.data.office_shift_data || []);
// //         }
// //       } catch (err) {
// //         console.error("Failed to fetch dropdown data", err);
// //         setError("Failed to load required form options.");
// //       }
// //     };

// //     fetchDropdownData();
// //   }, []);


// //   const fetchContractDetails = useCallback(async () => {
// //     setLoading(true);
// //     setError(null);
// //     try {
// //       const response = await axiosInstance.post('api/contract_details/', {
// //         user_id: userId,
// //         type: 1,
// //       });

// //       if (response.data && response.data.contract_details && response.data.contract_details.length > 0) {
// //         const details = response.data.contract_details[0];

// //         setJoiningDate(details.contract_date ? dayjs(details.contract_date, 'DD-MM-YYYY') : null);
// //         setDepartmentId(details.department_id || '');
// //         setDesignationId(details.designation_id || '');
// //         setBasicSalaryMonthly(details.basic_salary || '0.00');
// //         // REMOVED: setHourlyRate
// //         setOfficeShiftId(details.office_shift_id || '');
// //         setProbation(details.probation || '');
// //         // REMOVED: setBilling
// //         setProbationEndDate(details.probation_end_date ? dayjs(details.probation_end_date) : null);
// //         setRoleDescription(details.role_description || '');
// //       } else {
// //         setJoiningDate(null);
// //         setDepartmentId('');
// //         setError("No contract details found for this user. You can create a new one.");
// //       }
// //     } catch (err) {
// //       setError(err.message || "An error occurred while fetching contract details.");
// //       console.error("Fetch error:", err);
// //     } finally {
// //       setLoading(false);
// //     }
// //   }, [userId]);

// //   useEffect(() => {
// //     if (userId) {
// //       fetchContractDetails();
// //     } else {
// //       setLoading(false);
// //     }
// //   }, [userId, fetchContractDetails]);


// //   const handleUpdateDetails = async () => {
// //     if (!userId) {
// //         alert("Cannot update: Employee ID is missing.");
// //         return;
// //     }
// //     const payload = {
// //       user_id: userId,
// //       company_id: 2,
// //       type: 1,
// //       department_id: departmentId,
// //       designation_id: designationId,
// //       basic_salary: parseFloat(basicSalaryMonthly),
// //       // REMOVED: hourly_rate
// //       office_shift_id: officeShiftId,
// //       probation: probation === 'Y' ? 1 : 0,
// //       probation_end_date: probationEndDate ? probationEndDate.format('YYYY-MM-DD') : null,
// //       manager: 523,
// //       role_description: roleDescription,
// //       // REMOVED: billing
// //       contract_date: joiningDate ? joiningDate.format('YYYY-MM-DD') : null,
// //     };

// //     try {
// //       await axiosInstance.patch(`api/contract_details/`, payload);
// //       alert('Details Updated Successfully!');
// //     } catch (err) {
// //       alert('Failed to update details. Check console for details.');
// //       console.error("Update error:", err.response ? err.response.data : err);
// //     }
// //   };

// //   if (loading) {
// //     return <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress /></Box>;
// //   }

// //   if (error) {
// //     return <Alert severity="warning">{error}</Alert>;
// //   }

// //   return (
// //     <LocalizationProvider dateAdapter={AdapterDayjs}>
// //       <Paper sx={{ p: 2 }}>
// //         <Box display="flex" alignItems="center" mb={2}>
// //           <Lock color="primary" sx={{ mr: 1 }} />
// //           <Typography variant="h6">Set Detail</Typography>
// //         </Box>

// //         <Tabs value={tab} onChange={(e, val) => setTab(val)} sx={{ mb: 2 }}>
// //           <Tab label="Details" />
// //           <Tab label="Allowances" />
         
// //           <Tab label="Statutory Deductions" />
// //           <Tab label="Reimbursements" />
// //         </Tabs>

// //         {tab === 0 && (
// //           <Grid container spacing={3}>
// //             <Grid item xs={12} sm={6}>
// //               <DatePicker
// //                 label="Joining Date *"
// //                 value={joiningDate}
// //                 onChange={(newValue) => setJoiningDate(newValue)}
// //                 slots={{
// //                   textField: (params) => <TextField {...params} fullWidth size="small" required />,
// //                 }}
// //               />
// //             </Grid>
// //             <Grid item xs={12} sm={6}>
// //               <TextField
// //                 select
// //                 label="Department *"
// //                 value={departmentId}
// //                 onChange={(e) => setDepartmentId(e.target.value)}
// //                 fullWidth size="small" required
// //               >
// //                 {departmentsList.map((option) => (
// //                   <MenuItem key={option.department_id} value={option.department_id}>
// //                     {option.department_name}
// //                   </MenuItem>
// //                 ))}
// //               </TextField>
// //             </Grid>
// //             <Grid item xs={12} sm={6}>
// //               <TextField
// //                 select
// //                 label="Designation *"
// //                 value={designationId}
// //                 onChange={(e) => setDesignationId(e.target.value)}
// //                 fullWidth size="small" required
// //               >
// //                 {designationsList.map((option) => (
// //                   <MenuItem key={option.designation_id} value={option.designation_id}>
// //                     {option.designation_name}
// //                   </MenuItem>
// //                 ))}
// //               </TextField>
// //             </Grid>
// //             <Grid item xs={12} sm={6}>
// //               <TextField label="Gross Salary *" type="number" value={grossSalary} onChange={(e) => setGrossSalary(e.target.value)} fullWidth size="small" required />
// //             </Grid>
// //             <Grid item xs={12} sm={6}>
// //               <TextField label="Basic Salary Monthly *" type="number" value={basicSalaryMonthly} onChange={(e) => setBasicSalaryMonthly(e.target.value)} fullWidth size="small" required InputProps={{ startAdornment: <InputAdornment position="start">INR</InputAdornment> }} />
// //             </Grid>
            
// //             {/* REMOVED: Hourly Rate field */}
            
// //             {/* REMOVED: Billing field */}
            
// //             <Grid item xs={12} sm={6}>
// //               <TextField select label="Probation *" value={probation} onChange={(e) => setProbation(e.target.value)} fullWidth size="small" required >
// //                 {probationOptions.map((option) => (<MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>))}
// //               </TextField>
// //             </Grid>
// //             <Grid item xs={12} sm={6}>
// //               <DatePicker label="Probation End Date *" value={probationEndDate} onChange={(newValue) => setProbationEndDate(newValue)} slots={{ textField: (params) => <TextField {...params} fullWidth size="small" required />, }} />
// //             </Grid>
// //             <Grid item xs={12} sm={6}>
// //               <TextField select label="Office Shift *" value={officeShiftId} onChange={(e) => setOfficeShiftId(e.target.value)} fullWidth size="small" required >
// //                 {officeShiftsList.map((option) => (
// //                     <MenuItem key={option.office_shift_id} value={option.office_shift_id}>
// //                         {option.office_shift_name}
// //                     </MenuItem>
// //                 ))}
// //               </TextField>
// //             </Grid>
// //             <Grid item xs={12}>
// //               <Typography variant="subtitle2" gutterBottom sx={{ color: 'text.secondary' }}>Role Description *</Typography>
// //               <TextareaAutosize minRows={3} placeholder="Enter role description here..." value={roleDescription} onChange={(e) => setRoleDescription(e.target.value)} style={{ width: '100%', padding: '8.5px 14px', borderRadius: '4px', borderColor: 'rgba(0, 0, 0, 0.23)', fontFamily: 'inherit', fontSize: '1rem', resize: 'vertical', boxSizing: 'border-box' }} required />
// //             </Grid>
// //             <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
// //               <Button variant="contained" color="primary" onClick={handleUpdateDetails}>
// //                 Update Details
// //               </Button>
// //             </Grid>
// //           </Grid>
// //         )}

// //         {tab === 1 && <Allowances />}
        
// //         {tab === 2 && <StatutoryDeductions />}
// //         {tab === 3 && <Reimbursements />}
// //       </Paper>
// //     </LocalizationProvider>
// //   );
// // };

// // export default Detail;
// // import React, { useState, useMemo, useEffect, useCallback, useContext } from 'react';
// // import { EmployeeContext } from './EmployeeContext';
// // import {
// //   Box,
// //   TextField,
// //   MenuItem,
// //   Grid,
// //   Typography,
// //   Button,
// //   InputAdornment,
// //   TextareaAutosize,
// //   Paper,
// //   Tabs,
// //   Tab,
// //   CircularProgress,
// //   Alert,
// // } from '@mui/material';
// // import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// // import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// // import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// // import Lock from '@mui/icons-material/Lock';
// // import dayjs from 'dayjs';

// // // 1. Import SweetAlert2
// // import Swal from 'sweetalert2';

// // // Assuming your axios instance is set up here
// // import axiosInstance from '../../utils/axiosInstance';

// // // Import child components
// // import Allowances from './Allowances';
// // import Commissions from './Commissions';
// // import StatutoryDeductions from './StatutoryDeductions';
// // import Reimbursements from './Reimbursements';

// // const probationOptions = [{ value: 'Y', label: 'Yes' }, { value: 'N', 'label': 'No' }];

// // const Detail = () => {
// //   const [tab, setTab] = useState(0);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);

// //   // Form state
// //   const [joiningDate, setJoiningDate] = useState(null);
// //   const [departmentId, setDepartmentId] = useState('');
// //   const [designationId, setDesignationId] = useState('');
// //   const [grossSalary, setGrossSalary] = useState('0.00');
// //   const [basicSalaryMonthly, setBasicSalaryMonthly] = useState('0.00');
// //   const [probation, setProbation] = useState('');
// //   const [probationEndDate, setProbationEndDate] = useState(null);
// //   const [officeShiftId, setOfficeShiftId] = useState('');
// //   const [roleDescription, setRoleDescription] = useState('');
// //   const [managerId, setManagerId] = useState('');

// //   // State to hold dropdown options from API
// //   const [departmentsList, setDepartmentsList] = useState([]);
// //   const [designationsList, setDesignationsList] = useState([]);
// //   const [officeShiftsList, setOfficeShiftsList] = useState([]);

// //   const { employeeId } = useContext(EmployeeContext);
// //   const userId = employeeId;

// //   useEffect(() => {
// //     const fetchDropdownData = async () => {
// //       try {
// //         const [deptRes, desigRes, shiftRes] = await Promise.all([
// //           axiosInstance.get('api/departments/dropdown/'),
// //           axiosInstance.get('api/designations/dropdown/'),
// //           axiosInstance.get('api/office_shift_dropdown/'),
// //         ]);

// //         if (deptRes.data && deptRes.data.status === true) {
// //           setDepartmentsList(deptRes.data.data || []);
// //         }
// //         if (desigRes.data && desigRes.data.status === true) {
// //           setDesignationsList(desigRes.data.data || []);
// //         }
// //         if (shiftRes.data && shiftRes.data.status === 'success') {
// //           setOfficeShiftsList(shiftRes.data.office_shift_data || []);
// //         }
// //       } catch (err) {
// //         console.error("Failed to fetch dropdown data", err);
// //         setError("Failed to load required form options.");
// //       }
// //     };

// //     fetchDropdownData();
// //   }, []);


// //   const fetchContractDetails = useCallback(async () => {
// //     setLoading(true);
// //     setError(null);
// //     try {
// //       const response = await axiosInstance.post('api/contract_details/', {
// //         user_id: userId,
// //         type: 1,
// //       });

// //       if (response.data && response.data.contract_details && response.data.contract_details.length > 0) {
// //         const details = response.data.contract_details[0];

// //         setJoiningDate(details.contract_date ? dayjs(details.contract_date, 'DD-MM-YYYY') : null);
// //         setDepartmentId(details.department_id || '');
// //         setDesignationId(details.designation_id || '');
// //         setBasicSalaryMonthly(details.basic_salary || '0.00');
// //         setOfficeShiftId(details.office_shift_id || '');
// //         setProbation(details.probation || '');
// //         setProbationEndDate(details.probation_end_date ? dayjs(details.probation_end_date) : null);
// //         setRoleDescription(details.role_description || '');
// //       } else {
// //         setJoiningDate(null);
// //         setDepartmentId('');
// //         setError("No contract details found for this user. You can create a new one.");
// //       }
// //     } catch (err) {
// //       setError(err.message || "An error occurred while fetching contract details.");
// //       console.error("Fetch error:", err);
// //     } finally {
// //       setLoading(false);
// //     }
// //   }, [userId]);

// //   useEffect(() => {
// //     if (userId) {
// //       fetchContractDetails();
// //     } else {
// //       setLoading(false);
// //     }
// //   }, [userId, fetchContractDetails]);


// //   const handleUpdateDetails = async () => {
// //     if (!userId) {
// //       // 2. Use Swal for validation alerts
// //       Swal.fire({
// //         icon: 'error',
// //         title: 'Missing Information',
// //         text: 'Cannot update: Employee ID is missing.',
// //       });
// //       return;
// //     }

// //     // *** Bonus: Add validation for required fields before submitting
// //     const requiredFields = { joiningDate, departmentId, designationId, grossSalary, basicSalaryMonthly, probation, probationEndDate, officeShiftId, roleDescription };
// //     for (const field in requiredFields) {
// //       if (!requiredFields[field]) {
// //         Swal.fire({
// //           icon: 'warning',
// //           title: 'Validation Error',
// //           text: `Please fill out the "${field.replace(/([A-Z])/g, ' $1').trim()}" field. It is required.`,
// //         });
// //         return;
// //       }
// //     }

// //     const payload = {
// //       user_id: userId,
// //       company_id: 2,
// //       type: 1,
// //       department_id: departmentId,
// //       designation_id: designationId,
// //       basic_salary: parseFloat(basicSalaryMonthly),
// //       office_shift_id: officeShiftId,
// //       probation: probation === 'Y' ? 1 : 0,
// //       probation_end_date: probationEndDate ? probationEndDate.format('YYYY-MM-DD') : null,
// //       manager: 523, // This seems hardcoded, ensure it's correct
// //       role_description: roleDescription,
// //       contract_date: joiningDate ? joiningDate.format('YYYY-MM-DD') : null,
// //     };

// //     // 3. Add loading state with Swal
// //     Swal.fire({
// //       title: 'Updating Details...',
// //       text: 'Please wait.',
// //       allowOutsideClick: false,
// //       didOpen: () => {
// //         Swal.showLoading();
// //       },
// //     });

// //     try {
// //       await axiosInstance.patch(`api/contract_details/`, payload);
// //       // 4. Show success message with Swal
// //       Swal.fire({
// //         icon: 'success',
// //         title: 'Updated!',
// //         text: 'Details have been updated successfully.',
// //       });
// //     } catch (err) {
// //       const errorMessage = err.response?.data?.message || 'Failed to update details. Please check the console.';
// //       console.error("Update error:", err.response ? err.response.data : err);
// //       // 5. Show error message with Swal
// //       Swal.fire({
// //         icon: 'error',
// //         title: 'Update Failed',
// //         text: errorMessage,
// //       });
// //     }
// //   };

// //   if (loading) {
// //     return <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress /></Box>;
// //   }

// //   if (error) {
// //     return <Alert severity="warning">{error}</Alert>;
// //   }

// //   return (
// //     <LocalizationProvider dateAdapter={AdapterDayjs}>
// //       <Paper sx={{ p: 2 }}>
// //         <Box display="flex" alignItems="center" mb={2}>
// //           <Lock color="primary" sx={{ mr: 1 }} />
// //           <Typography variant="h6">Set Details</Typography>
// //         </Box>

// //         <Tabs value={tab} onChange={(e, val) => setTab(val)} sx={{ mb: 2 }}>
// //           <Tab label="Details" />
// //           <Tab label="Allowances" />
// //           <Tab label="Statutory Deductions" />
// //           <Tab label="Reimbursements" />
// //         </Tabs>

// //         {tab === 0 && (
// //           <Grid container spacing={3}>
// //             <Grid item xs={12} sm={6}>
// //               <DatePicker
// //                 label="Joining Date *"
// //                 value={joiningDate}
// //                 onChange={(newValue) => setJoiningDate(newValue)}
// //                 slots={{
// //                   textField: (params) => <TextField {...params} fullWidth size="small" required />,
// //                 }}
// //               />
// //             </Grid>
// //             <Grid item xs={12} sm={6}>
// //               <TextField
// //                 select
// //                 label="Department *"
// //                 value={departmentId}
// //                 onChange={(e) => setDepartmentId(e.target.value)}
// //                 fullWidth size="small" required
// //               >
// //                 {departmentsList.map((option) => (
// //                   <MenuItem key={option.department_id} value={option.department_id}>
// //                     {option.department_name}
// //                   </MenuItem>
// //                 ))}
// //               </TextField>
// //             </Grid>
// //             <Grid item xs={12} sm={6}>
// //               <TextField
// //                 select
// //                 label="Designation *"
// //                 value={designationId}
// //                 onChange={(e) => setDesignationId(e.target.value)}
// //                 fullWidth size="small" required
// //               >
// //                 {designationsList.map((option) => (
// //                   <MenuItem key={option.designation_id} value={option.designation_id}>
// //                     {option.designation_name}
// //                   </MenuItem>
// //                 ))}
// //               </TextField>
// //             </Grid>
// //             <Grid item xs={12} sm={6}>
// //               <TextField label="Gross Salary *" type="number" value={grossSalary} onChange={(e) => setGrossSalary(e.target.value)} fullWidth size="small" required />
// //             </Grid>
// //             <Grid item xs={12} sm={6}>
// //               <TextField label="Basic Salary Monthly *" type="number" value={basicSalaryMonthly} onChange={(e) => setBasicSalaryMonthly(e.target.value)} fullWidth size="small" required InputProps={{ startAdornment: <InputAdornment position="start">INR</InputAdornment> }} />
// //             </Grid>
            
// //             <Grid item xs={12} sm={6}>
// //               <TextField select label="Probation *" value={probation} onChange={(e) => setProbation(e.target.value)} fullWidth size="small" required >
// //                 {probationOptions.map((option) => (<MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>))}
// //               </TextField>
// //             </Grid>
// //             <Grid item xs={12} sm={6}>
// //               <DatePicker label="Probation End Date *" value={probationEndDate} onChange={(newValue) => setProbationEndDate(newValue)} slots={{ textField: (params) => <TextField {...params} fullWidth size="small" required />, }} />
// //             </Grid>
// //             <Grid item xs={12} sm={6}>
// //               <TextField select label="Office Shift *" value={officeShiftId} onChange={(e) => setOfficeShiftId(e.target.value)} fullWidth size="small" required >
// //                 {officeShiftsList.map((option) => (
// //                     <MenuItem key={option.office_shift_id} value={option.office_shift_id}>
// //                         {option.office_shift_name}
// //                     </MenuItem>
// //                 ))}
// //               </TextField>
// //             </Grid>
// //             <Grid item xs={12}>
// //               <Typography variant="subtitle2" gutterBottom sx={{ color: 'text.secondary' }}>Role Description *</Typography>
// //               <TextareaAutosize minRows={3} placeholder="Enter role description here..." value={roleDescription} onChange={(e) => setRoleDescription(e.target.value)} style={{ width: '100%', padding: '8.5px 14px', borderRadius: '4px', borderColor: 'rgba(0, 0, 0, 0.23)', fontFamily: 'inherit', fontSize: '1rem', resize: 'vertical', boxSizing: 'border-box' }} required />
// //             </Grid>
// //             <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
// //               <Button variant="contained" color="primary" onClick={handleUpdateDetails}>
// //                 Update Details
// //               </Button>
// //             </Grid>
// //           </Grid>
// //         )}

// //         {tab === 1 && <Allowances />}
        
// //         {tab === 2 && <StatutoryDeductions />}
// //         {tab === 3 && <Reimbursements />}
// //       </Paper>
// //     </LocalizationProvider>
// //   );
// // };

// // export default Detail;
// // import React, { useState, useCallback, useContext, useEffect } from 'react';
// // import { EmployeeContext } from './EmployeeContext';
// // import {
// //   Box,
// //   TextField,
// //   MenuItem,
// //   Grid,
// //   Typography,
// //   Button,
// //   InputAdornment,
// //   TextareaAutosize,
// //   Paper,
// //   Tabs,
// //   Tab,
// //   CircularProgress,
// //   Alert,
// // } from '@mui/material';
// // import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// // import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// // import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// // import Lock from '@mui/icons-material/Lock';
// // import dayjs from 'dayjs';

// // // 1. Import SweetAlert2
// // import Swal from 'sweetalert2';

// // // Assuming your axios instance is set up here
// // import axiosInstance from '../../utils/axiosInstance';

// // // Import child components
// // import Allowances from './Allowances';
// // import Commissions from './Commissions';
// // import StatutoryDeductions from './StatutoryDeductions';
// // import Reimbursements from './Reimbursements';

// // const probationOptions = [{ value: 'Y', label: 'Yes' }, { value: 'N', 'label': 'No' }];

// // const Detail = () => {
// //   const [tab, setTab] = useState(0);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);

// //   // Form state
// //   const [joiningDate, setJoiningDate] = useState(null);
// //   const [departmentId, setDepartmentId] = useState('');
// //   const [designationId, setDesignationId] = useState('');
// //   const [grossSalary, setGrossSalary] = useState('0.00');
// //   const [basicSalaryMonthly, setBasicSalaryMonthly] = useState('0.00');
// //   const [probation, setProbation] = useState('');
// //   const [probationEndDate, setProbationEndDate] = useState(null);
// //   const [officeShiftId, setOfficeShiftId] = useState('');
// //   const [roleDescription, setRoleDescription] = useState('');
// //   const [managerId, setManagerId] = useState('');

// //   // State to hold dropdown options from API
// //   const [departmentsList, setDepartmentsList] = useState([]);
// //   const [designationsList, setDesignationsList] = useState([]);
// //   const [officeShiftsList, setOfficeShiftsList] = useState([]);

// //   const { employeeId } = useContext(EmployeeContext);
// //   const userId = employeeId;

// //   useEffect(() => {
// //     const fetchDropdownData = async () => {
// //       try {
// //         const [deptRes, desigRes, shiftRes] = await Promise.all([
// //           axiosInstance.get('api/departments/dropdown/'),
// //           axiosInstance.get('api/designations/dropdown/'),
// //           axiosInstance.get('api/office_shift_dropdown/'),
// //         ]);

// //         if (deptRes.data && deptRes.data.status === true) {
// //           setDepartmentsList(deptRes.data.data || []);
// //         }
// //         if (desigRes.data && desigRes.data.status === true) {
// //           setDesignationsList(desigRes.data.data || []);
// //         }
// //         if (shiftRes.data && shiftRes.data.status === 'success') {
// //           setOfficeShiftsList(shiftRes.data.office_shift_data || []);
// //         }
// //       } catch (err) {
// //         console.error("Failed to fetch dropdown data", err);
// //         setError("Failed to load required form options.");
// //       }
// //     };

// //     fetchDropdownData();
// //   }, []);


// //   const fetchContractDetails = useCallback(async () => {
// //     setLoading(true);
// //     setError(null);
// //     try {
// //       const response = await axiosInstance.post('api/contract_details/', {
// //         user_id: userId,
// //         type: 1,
// //       });

// //       if (response.data && response.data.contract_details && response.data.contract_details.length > 0) {
// //         const details = response.data.contract_details[0];

// //         setJoiningDate(details.contract_date ? dayjs(details.contract_date, 'DD-MM-YYYY') : null);
// //         setDepartmentId(details.department_id || '');
// //         setDesignationId(details.designation_id || '');
// //         setBasicSalaryMonthly(details.basic_salary || '0.00');
// //         // Set gross salary from API
// //         setGrossSalary(details.gross_salary || '0.00');
// //         setOfficeShiftId(details.office_shift_id || '');
// //         setProbation(details.probation || '');
// //         setProbationEndDate(details.probation_end_date ? dayjs(details.probation_end_date) : null);
// //         setRoleDescription(details.role_description || '');
// //       } else {
// //         setJoiningDate(null);
// //         setDepartmentId('');
// //         setError("No contract details found for this user. You can create a new one.");
// //       }
// //     } catch (err) {
// //       setError(err.message || "An error occurred while fetching contract details.");
// //       console.error("Fetch error:", err);
// //     } finally {
// //       setLoading(false);
// //     }
// //   }, [userId]);

// //   useEffect(() => {
// //     if (userId) {
// //       fetchContractDetails();
// //     } else {
// //       setLoading(false);
// //     }
// //   }, [userId, fetchContractDetails]);


// //   const handleUpdateDetails = async () => {
// //     if (!userId) {
// //       // 2. Use Swal for validation alerts
// //       Swal.fire({
// //         icon: 'error',
// //         title: 'Missing Information',
// //         text: 'Cannot update: Employee ID is missing.',
// //       });
// //       return;
// //     }

// //     // *** Bonus: Add validation for required fields before submitting
// //     const requiredFields = { joiningDate, departmentId, designationId, grossSalary, basicSalaryMonthly, probation, probationEndDate, officeShiftId, roleDescription };
// //     for (const field in requiredFields) {
// //       if (!requiredFields[field]) {
// //         Swal.fire({
// //           icon: 'warning',
// //           title: 'Validation Error',
// //           text: `Please fill out the "${field.replace(/([A-Z])/g, ' $1').trim()}" field. It is required.`,
// //         });
// //         return;
// //       }
// //     }

// //     const payload = {
// //       user_id: userId,
// //       company_id: 2,
// //       type: 1,
// //       department_id: departmentId,
// //       designation_id: designationId,
// //       basic_salary: parseFloat(basicSalaryMonthly),
// //       // Add gross_salary to the payload
// //       gross_salary: parseFloat(grossSalary),
// //       office_shift_id: officeShiftId,
// //       // Send 'Y' or 'N' directly
// //       probation: probation,
// //       probation_end_date: probationEndDate ? probationEndDate.format('YYYY-MM-DD') : null,
// //       manager: 523, // This seems hardcoded, ensure it's correct
// //       role_description: roleDescription,
// //       contract_date: joiningDate ? joiningDate.format('YYYY-MM-DD') : null,
// //     };

// //     // 3. Add loading state with Swal
// //     Swal.fire({
// //       title: 'Updating Details...',
// //       text: 'Please wait.',
// //       allowOutsideClick: false,
// //       didOpen: () => {
// //         Swal.showLoading();
// //       },
// //     });

// //     try {
// //       await axiosInstance.patch(`api/contract_details/`, payload);
// //       // 4. Show success message with Swal
// //       Swal.fire({
// //         icon: 'success',
// //         title: 'Updated!',
// //         text: 'Details have been updated successfully.',
// //       });
// //     } catch (err) {
// //       const errorMessage = err.response?.data?.message || 'Failed to update details. Please check the console.';
// //       console.error("Update error:", err.response ? err.response.data : err);
// //       // 5. Show error message with Swal
// //       Swal.fire({
// //         icon: 'error',
// //         title: 'Update Failed',
// //         text: errorMessage,
// //       });
// //     }
// //   };

// //   if (loading) {
// //     return <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress /></Box>;
// //   }

// //   if (error) {
// //     return <Alert severity="warning">{error}</Alert>;
// //   }

// //   return (
// //     <LocalizationProvider dateAdapter={AdapterDayjs}>
// //       <Paper sx={{ p: 2 }}>
// //         <Box display="flex" alignItems="center" mb={2}>
// //           <Lock color="primary" sx={{ mr: 1 }} />
// //           <Typography variant="h6">Set Details</Typography>
// //         </Box>

// //         <Tabs value={tab} onChange={(e, val) => setTab(val)} sx={{ mb: 2 }}>
// //           <Tab label="Details" />
// //           <Tab label="Allowances" />
// //           <Tab label="Statutory Deductions" />
// //           <Tab label="Reimbursements" />
// //         </Tabs>

// //         {tab === 0 && (
// //           <Grid container spacing={3}>
// //             <Grid item xs={12} sm={6}>
// //               <DatePicker
// //                 label="Joining Date *"
// //                 value={joiningDate}
// //                 onChange={(newValue) => setJoiningDate(newValue)}
// //                 slots={{
// //                   textField: (params) => <TextField {...params} fullWidth size="small" required />,
// //                 }}
// //               />
// //             </Grid>
// //             <Grid item xs={12} sm={6}>
// //               <TextField
// //                 select
// //                 label="Department *"
// //                 value={departmentId}
// //                 onChange={(e) => setDepartmentId(e.target.value)}
// //                 fullWidth size="small" required
// //               >
// //                 {departmentsList.map((option) => (
// //                   <MenuItem key={option.department_id} value={option.department_id}>
// //                     {option.department_name}
// //                   </MenuItem>
// //                 ))}
// //               </TextField>
// //             </Grid>
// //             <Grid item xs={12} sm={6}>
// //               <TextField
// //                 select
// //                 label="Designation *"
// //                 value={designationId}
// //                 onChange={(e) => setDesignationId(e.target.value)}
// //                 fullWidth size="small" required
// //               >
// //                 {designationsList.map((option) => (
// //                   <MenuItem key={option.designation_id} value={option.designation_id}>
// //                     {option.designation_name}
// //                   </MenuItem>
// //                 ))}
// //               </TextField>
// //             </Grid>
// //             <Grid item xs={12} sm={6}>
// //               <TextField label="Gross Salary *" type="number" value={grossSalary} onChange={(e) => setGrossSalary(e.target.value)} fullWidth size="small" required />
// //             </Grid>
// //             <Grid item xs={12} sm={6}>
// //               <TextField label="Basic Salary Monthly *" type="number" value={basicSalaryMonthly} onChange={(e) => setBasicSalaryMonthly(e.target.value)} fullWidth size="small" required InputProps={{ startAdornment: <InputAdornment position="start">INR</InputAdornment> }} />
// //             </Grid>
            
// //             <Grid item xs={12} sm={6}>
// //               <TextField select label="Probation *" value={probation} onChange={(e) => setProbation(e.target.value)} fullWidth size="small" required >
// //                 {probationOptions.map((option) => (<MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>))}
// //               </TextField>
// //             </Grid>
// //             <Grid item xs={12} sm={6}>
// //               <DatePicker label="Probation End Date *" value={probationEndDate} onChange={(newValue) => setProbationEndDate(newValue)} slots={{ textField: (params) => <TextField {...params} fullWidth size="small" required />, }} />
// //             </Grid>
// //             <Grid item xs={12} sm={6}>
// //               <TextField select label="Office Shift *" value={officeShiftId} onChange={(e) => setOfficeShiftId(e.target.value)} fullWidth size="small" required >
// //                 {officeShiftsList.map((option) => (
// //                     <MenuItem key={option.office_shift_id} value={option.office_shift_id}>
// //                         {option.office_shift_name}
// //                     </MenuItem>
// //                 ))}
// //               </TextField>
// //             </Grid>
// //             <Grid item xs={12}>
// //               <Typography variant="subtitle2" gutterBottom sx={{ color: 'text.secondary' }}>Role Description *</Typography>
// //               <TextareaAutosize minRows={3} placeholder="Enter role description here..." value={roleDescription} onChange={(e) => setRoleDescription(e.target.value)} style={{ width: '100%', padding: '8.5px 14px', borderRadius: '4px', borderColor: 'rgba(0, 0, 0, 0.23)', fontFamily: 'inherit', fontSize: '1rem', resize: 'vertical', boxSizing: 'border-box' }} required />
// //             </Grid>
// //             <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
// //               <Button variant="contained" color="primary" onClick={handleUpdateDetails}>
// //                 Update Details
// //               </Button>
// //             </Grid>
// //           </Grid>
// //         )}

// //         {tab === 1 && <Allowances />}
        
// //         {tab === 2 && <StatutoryDeductions />}
// //         {tab === 3 && <Reimbursements />}
// //       </Paper>
// //     </LocalizationProvider>
// //   );
// // };

// // export default Detail;
// import React, { useState, useCallback, useContext, useEffect } from 'react';
// import { EmployeeContext } from './EmployeeContext';
// import {
//   Box,
//   TextField,
//   MenuItem,
//   Grid,
//   Typography,
//   Button,
//   InputAdornment,
//   TextareaAutosize,
//   Paper,
//   Tabs,
//   Tab,
//   CircularProgress,
//   Alert,
// } from '@mui/material';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import Lock from '@mui/icons-material/Lock';
// import dayjs from 'dayjs';

// // 1. Import SweetAlert2
// import Swal from 'sweetalert2';

// // Assuming your axios instance is set up here
// import axiosInstance from '../../utils/axiosInstance';

// // Import child components
// import Allowances from './Allowances';
// import Commissions from './Commissions';
// import StatutoryDeductions from './StatutoryDeductions';
// import Reimbursements from './Reimbursements';

// const probationOptions = [{ value: 'Y', label: 'Yes' }, { value: 'N', 'label': 'No' }];

// const Detail = () => {
//   const [tab, setTab] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Form state
//   const [joiningDate, setJoiningDate] = useState(null);
//   const [departmentId, setDepartmentId] = useState('');
//   const [designationId, setDesignationId] = useState('');
//   const [grossSalary, setGrossSalary] = useState('0.00');
//   // REMOVED: basicSalaryMonthly state
//   const [probation, setProbation] = useState('');
//   const [probationEndDate, setProbationEndDate] = useState(null);
//   const [officeShiftId, setOfficeShiftId] = useState('');
//   const [roleDescription, setRoleDescription] = useState('');
//   const [managerId, setManagerId] = useState('');

//   // State to hold dropdown options from API
//   const [departmentsList, setDepartmentsList] = useState([]);
//   const [designationsList, setDesignationsList] = useState([]);
//   const [officeShiftsList, setOfficeShiftsList] = useState([]);

//   const { employeeId } = useContext(EmployeeContext);
//   const userId = employeeId;

//   useEffect(() => {
//     const fetchDropdownData = async () => {
//       try {
//         const [deptRes, desigRes, shiftRes] = await Promise.all([
//           axiosInstance.get('api/departments/dropdown/'),
//           axiosInstance.get('api/designations/dropdown/'),
//           axiosInstance.get('api/office_shift_dropdown/'),
//         ]);

//         if (deptRes.data && deptRes.data.status === true) {
//           setDepartmentsList(deptRes.data.data || []);
//         }
//         if (desigRes.data && desigRes.data.status === true) {
//           setDesignationsList(desigRes.data.data || []);
//         }
//         if (shiftRes.data && shiftRes.data.status === 'success') {
//           setOfficeShiftsList(shiftRes.data.office_shift_data || []);
//         }
//       } catch (err) {
//         console.error("Failed to fetch dropdown data", err);
//         setError("Failed to load required form options.");
//       }
//     };

//     fetchDropdownData();
//   }, []);


//   const fetchContractDetails = useCallback(async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await axiosInstance.post('api/contract_details/', {
//         user_id: userId,
//         type: 1,
//       });

//       if (response.data && response.data.contract_details && response.data.contract_details.length > 0) {
//         const details = response.data.contract_details[0];

//         setJoiningDate(details.contract_date ? dayjs(details.contract_date, 'DD-MM-YYYY') : null);
//         setDepartmentId(details.department_id || '');
//         setDesignationId(details.designation_id || '');
//         // REMOVED: setBasicSalaryMonthly
//         setGrossSalary(details.gross_salary || '0.00');
//         setOfficeShiftId(details.office_shift_id || '');
//         setProbation(details.probation || '');
//         setProbationEndDate(details.probation_end_date ? dayjs(details.probation_end_date) : null);
//         setRoleDescription(details.role_description || '');
//       } else {
//         setJoiningDate(null);
//         setDepartmentId('');
//         setError("No contract details found for this user. You can create a new one.");
//       }
//     } catch (err) {
//       setError(err.message || "An error occurred while fetching contract details.");
//       console.error("Fetch error:", err);
//     } finally {
//       setLoading(false);
//     }
//   }, [userId]);

//   useEffect(() => {
//     if (userId) {
//       fetchContractDetails();
//     } else {
//       setLoading(false);
//     }
//   }, [userId, fetchContractDetails]);


//   const handleUpdateDetails = async () => {
//     if (!userId) {
//       Swal.fire({
//         icon: 'error',
//         title: 'Missing Information',
//         text: 'Cannot update: Employee ID is missing.',
//       });
//       return;
//     }

//     // REMOVED: basicSalaryMonthly from required fields validation
//     const requiredFields = { joiningDate, departmentId, designationId, grossSalary, probation, probationEndDate, officeShiftId, roleDescription };
//     for (const field in requiredFields) {
//       if (!requiredFields[field]) {
//         Swal.fire({
//           icon: 'warning',
//           title: 'Validation Error',
//           text: `Please fill out the "${field.replace(/([A-Z])/g, ' $1').trim()}" field. It is required.`,
//         });
//         return;
//       }
//     }

//     const payload = {
//       user_id: userId,
//       company_id: 2,
//       type: 1,
//       department_id: departmentId,
//       designation_id: designationId,
//       // REMOVED: basic_salary from payload
//       gross_salary: parseFloat(grossSalary),
//       office_shift_id: officeShiftId,
//       probation: probation,
//       probation_end_date: probationEndDate ? probationEndDate.format('YYYY-MM-DD') : null,
//       manager: 523,
//       role_description: roleDescription,
//       contract_date: joiningDate ? joiningDate.format('YYYY-MM-DD') : null,
//     };

//     Swal.fire({
//       title: 'Updating Details...',
//       text: 'Please wait.',
//       allowOutsideClick: false,
//       didOpen: () => {
//         Swal.showLoading();
//       },
//     });

//     try {
//       await axiosInstance.patch(`api/contract_details/`, payload);
//       Swal.fire({
//         icon: 'success',
//         title: 'Updated!',
//         text: 'Details have been updated successfully.',
//       });
//     } catch (err) {
//       const errorMessage = err.response?.data?.message || 'Failed to update details. Please check the console.';
//       console.error("Update error:", err.response ? err.response.data : err);
//       Swal.fire({
//         icon: 'error',
//         title: 'Update Failed',
//         text: errorMessage,
//       });
//     }
//   };

//   if (loading) {
//     return <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress /></Box>;
//   }

//   if (error) {
//     return <Alert severity="warning">{error}</Alert>;
//   }

//   return (
//     <LocalizationProvider dateAdapter={AdapterDayjs}>
//       <Paper sx={{ p: 2 }}>
//         <Box display="flex" alignItems="center" mb={2}>
//           <Lock color="primary" sx={{ mr: 1 }} />
//           <Typography variant="h6">Set Details</Typography>
//         </Box>

//         <Tabs value={tab} onChange={(e, val) => setTab(val)} sx={{ mb: 2 }}>
//           <Tab label="Details" />
//           <Tab label="Allowances" />
//           <Tab label="Statutory Deductions" />
//           <Tab label="Reimbursements" />
//         </Tabs>

//         {tab === 0 && (
//           <Grid container spacing={3}>
//             <Grid item xs={12} sm={6}>
//               <DatePicker
//                 label="Joining Date *"
//                 value={joiningDate}
//                 onChange={(newValue) => setJoiningDate(newValue)}
//                 slots={{
//                   textField: (params) => <TextField {...params} fullWidth size="small" required />,
//                 }}
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 select
//                 label="Department *"
//                 value={departmentId}
//                 onChange={(e) => setDepartmentId(e.target.value)}
//                 fullWidth size="small" required
//               >
//                 {departmentsList.map((option) => (
//                   <MenuItem key={option.department_id} value={option.department_id}>
//                     {option.department_name}
//                   </MenuItem>
//                 ))}
//               </TextField>
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 select
//                 label="Designation *"
//                 value={designationId}
//                 onChange={(e) => setDesignationId(e.target.value)}
//                 fullWidth size="small" required
//               >
//                 {designationsList.map((option) => (
//                   <MenuItem key={option.designation_id} value={option.designation_id}>
//                     {option.designation_name}
//                   </MenuItem>
//                 ))}
//               </TextField>
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField label="Gross Salary *" type="number" value={grossSalary} onChange={(e) => setGrossSalary(e.target.value)} fullWidth size="small" required InputProps={{ startAdornment: <InputAdornment position="start">INR</InputAdornment> }}/>
//             </Grid>
            
//             {/* REMOVED: Basic Salary Monthly TextField */}

//             <Grid item xs={12} sm={6}>
//               <TextField select label="Probation *" value={probation} onChange={(e) => setProbation(e.target.value)} fullWidth size="small" required >
//                 {probationOptions.map((option) => (<MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>))}
//               </TextField>
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <DatePicker label="Probation End Date *" value={probationEndDate} onChange={(newValue) => setProbationEndDate(newValue)} slots={{ textField: (params) => <TextField {...params} fullWidth size="small" required />, }} />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField select label="Office Shift *" value={officeShiftId} onChange={(e) => setOfficeShiftId(e.target.value)} fullWidth size="small" required >
//                 {officeShiftsList.map((option) => (
//                     <MenuItem key={option.office_shift_id} value={option.office_shift_id}>
//                         {option.office_shift_name}
//                     </MenuItem>
//                 ))}
//               </TextField>
//             </Grid>
//             <Grid item xs={12}>
//               <Typography variant="subtitle2" gutterBottom sx={{ color: 'text.secondary' }}>Role Description *</Typography>
//               <TextareaAutosize minRows={3} placeholder="Enter role description here..." value={roleDescription} onChange={(e) => setRoleDescription(e.target.value)} style={{ width: '100%', padding: '8.5px 14px', borderRadius: '4px', borderColor: 'rgba(0, 0, 0, 0.23)', fontFamily: 'inherit', fontSize: '1rem', resize: 'vertical', boxSizing: 'border-box' }} required />
//             </Grid>
//             <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
//               <Button variant="contained" color="primary" onClick={handleUpdateDetails}>
//                 Update Details
//               </Button>
//             </Grid>
//           </Grid>
//         )}

//         {tab === 1 && <Allowances />}
        
//         {tab === 2 && <StatutoryDeductions />}
//         {tab === 3 && <Reimbursements />}
//       </Paper>
//     </LocalizationProvider>
//   );
// };

// export default Detail;
// import React, { useState, useCallback, useContext, useEffect } from 'react';
// import { EmployeeContext } from './EmployeeContext';
// import {
//   Box,
//   TextField,
//   MenuItem,
//   Grid,
//   Typography,
//   Button,
//   InputAdornment,
//   TextareaAutosize,
//   Paper,
//   Tabs,
//   Tab,
//   CircularProgress,
//   Alert,
// } from '@mui/material';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import Lock from '@mui/icons-material/Lock';
// import dayjs from 'dayjs';

// import Swal from 'sweetalert2';

// // Assuming your axios instance is set up here
// import axiosInstance from '../../utils/axiosInstance';

// // Import child components
// import Allowances from './Allowances';
// import Commissions from './Commissions';
// import StatutoryDeductions from './StatutoryDeductions';
// import Reimbursements from './Reimbursements';

// const probationOptions = [{ value: 'Y', label: 'Yes' }, { value: 'N', 'label': 'No' }];

// const Detail = () => {
//   const [tab, setTab] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Form state
//   const [joiningDate, setJoiningDate] = useState(null);
//   const [departmentId, setDepartmentId] = useState('');
//   const [designationId, setDesignationId] = useState('');
//   const [grossSalary, setGrossSalary] = useState('0.00');
//   const [probation, setProbation] = useState('');
//   // REMOVED: probationEndDate state
//   const [officeShiftId, setOfficeShiftId] = useState('');
//   const [roleDescription, setRoleDescription] = useState('');
//   const [managerId, setManagerId] = useState('');

//   // State to hold dropdown options from API
//   const [departmentsList, setDepartmentsList] = useState([]);
//   const [designationsList, setDesignationsList] = useState([]);
//   const [officeShiftsList, setOfficeShiftsList] = useState([]);

//   const { employeeId } = useContext(EmployeeContext);
//   const userId = employeeId;

//   useEffect(() => {
//     const fetchDropdownData = async () => {
//       try {
//         const [deptRes, desigRes, shiftRes] = await Promise.all([
//           axiosInstance.get('api/departments/dropdown/'),
//           axiosInstance.get('api/designations/dropdown/'),
//           axiosInstance.get('api/office_shift_dropdown/'),
//         ]);

//         if (deptRes.data && deptRes.data.status === true) {
//           setDepartmentsList(deptRes.data.data || []);
//         }
//         if (desigRes.data && desigRes.data.status === true) {
//           setDesignationsList(desigRes.data.data || []);
//         }
//         if (shiftRes.data && shiftRes.data.status === 'success') {
//           setOfficeShiftsList(shiftRes.data.office_shift_data || []);
//         }
//       } catch (err) {
//         console.error("Failed to fetch dropdown data", err);
//         setError("Failed to load required form options.");
//       }
//     };

//     fetchDropdownData();
//   }, []);


//   const fetchContractDetails = useCallback(async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await axiosInstance.post('api/contract_details/', {
//         user_id: userId,
//         type: 1,
//       });

//       if (response.data && response.data.contract_details && response.data.contract_details.length > 0) {
//         const details = response.data.contract_details[0];

//         setJoiningDate(details.contract_date ? dayjs(details.contract_date, 'DD-MM-YYYY') : null);
//         setDepartmentId(details.department_id || '');
//         setDesignationId(details.designation_id || '');
//         setGrossSalary(details.gross_salary || '0.00');
//         setOfficeShiftId(details.office_shift_id || '');
//         setProbation(details.probation || '');
//         // REMOVED: setProbationEndDate
//         setRoleDescription(details.role_description || '');
//       } else {
//         setJoiningDate(null);
//         setDepartmentId('');
//         setError("No contract details found for this user. You can create a new one.");
//       }
//     } catch (err) {
//       setError(err.message || "An error occurred while fetching contract details.");
//       console.error("Fetch error:", err);
//     } finally {
//       setLoading(false);
//     }
//   }, [userId]);

//   useEffect(() => {
//     if (userId) {
//       fetchContractDetails();
//     } else {
//       setLoading(false);
//     }
//   }, [userId, fetchContractDetails]);


//   const handleUpdateDetails = async () => {
//     if (!userId) {
//       Swal.fire({
//         icon: 'error',
//         title: 'Missing Information',
//         text: 'Cannot update: Employee ID is missing.',
//       });
//       return;
//     }

//     // REMOVED: probationEndDate from required fields validation
//     const requiredFields = { joiningDate, departmentId, designationId, grossSalary, probation, officeShiftId, roleDescription };
//     for (const field in requiredFields) {
//       if (!requiredFields[field]) {
//         Swal.fire({
//           icon: 'warning',
//           title: 'Validation Error',
//           text: `Please fill out the "${field.replace(/([A-Z])/g, ' $1').trim()}" field. It is required.`,
//         });
//         return;
//       }
//     }

//     const payload = {
//       user_id: userId,
//       company_id: 2,
//       type: 1,
//       department_id: departmentId,
//       designation_id: designationId,
//       gross_salary: parseFloat(grossSalary),
//       office_shift_id: officeShiftId,
//       probation: probation,
//       // REMOVED: probation_end_date from payload
//       manager: 523,
//       role_description: roleDescription,
//       contract_date: joiningDate ? joiningDate.format('YYYY-MM-DD') : null,
//     };

//     Swal.fire({
//       title: 'Updating Details...',
//       text: 'Please wait.',
//       allowOutsideClick: false,
//       didOpen: () => {
//         Swal.showLoading();
//       },
//     });

//     try {
//       await axiosInstance.patch(`api/contract_details/`, payload);
//       Swal.fire({
//         icon: 'success',
//         title: 'Updated!',
//         text: 'Details have been updated successfully.',
//       });
//     } catch (err) {
//       const errorMessage = err.response?.data?.message || 'Failed to update details. Please check the console.';
//       console.error("Update error:", err.response ? err.response.data : err);
//       Swal.fire({
//         icon: 'error',
//         title: 'Update Failed',
//         text: errorMessage,
//       });
//     }
//   };

//   if (loading) {
//     return <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress /></Box>;
//   }

//   if (error) {
//     return <Alert severity="warning">{error}</Alert>;
//   }

//   return (
//     <LocalizationProvider dateAdapter={AdapterDayjs}>
//       <Paper sx={{ p: 2 }}>
//         <Box display="flex" alignItems="center" mb={2}>
//           <Lock color="primary" sx={{ mr: 1 }} />
//           <Typography variant="h6">Set Details</Typography>
//         </Box>

//         <Tabs value={tab} onChange={(e, val) => setTab(val)} sx={{ mb: 2 }}>
//           <Tab label="Details" />
//           <Tab label="Allowances" />
//           <Tab label="Statutory Deductions" />
//           <Tab label="Reimbursements" />
//         </Tabs>

//         {tab === 0 && (
//           <Grid container spacing={3}>
//             <Grid item xs={12} sm={6}>
//               <DatePicker
//                 label="Joining Date *"
//                 value={joiningDate}
//                 onChange={(newValue) => setJoiningDate(newValue)}
//                 slots={{
//                   textField: (params) => <TextField {...params} fullWidth size="small" required />,
//                 }}
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 select
//                 label="Department *"
//                 value={departmentId}
//                 onChange={(e) => setDepartmentId(e.target.value)}
//                 fullWidth size="small" required
//               >
//                 {departmentsList.map((option) => (
//                   <MenuItem key={option.department_id} value={option.department_id}>
//                     {option.department_name}
//                   </MenuItem>
//                 ))}
//               </TextField>
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 select
//                 label="Designation *"
//                 value={designationId}
//                 onChange={(e) => setDesignationId(e.target.value)}
//                 fullWidth size="small" required
//               >
//                 {designationsList.map((option) => (
//                   <MenuItem key={option.designation_id} value={option.designation_id}>
//                     {option.designation_name}
//                   </MenuItem>
//                 ))}
//               </TextField>
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField label="Gross Salary *" type="number" value={grossSalary} onChange={(e) => setGrossSalary(e.target.value)} fullWidth size="small" required InputProps={{ startAdornment: <InputAdornment position="start">INR</InputAdornment> }}/>
//             </Grid>
            
//             <Grid item xs={12} sm={6}>
//               <TextField select label="Probation *" value={probation} onChange={(e) => setProbation(e.target.value)} fullWidth size="small" required >
//                 {probationOptions.map((option) => (<MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>))}
//               </TextField>
//             </Grid>

//             {/* REMOVED: Probation End Date DatePicker */}

//             <Grid item xs={12} sm={6}>
//               <TextField select label="Office Shift *" value={officeShiftId} onChange={(e) => setOfficeShiftId(e.target.value)} fullWidth size="small" required >
//                 {officeShiftsList.map((option) => (
//                     <MenuItem key={option.office_shift_id} value={option.office_shift_id}>
//                         {option.office_shift_name}
//                     </MenuItem>
//                 ))}
//               </TextField>
//             </Grid>
//             <Grid item xs={12}>
//               <Typography variant="subtitle2" gutterBottom sx={{ color: 'text.secondary' }}>Role Description *</Typography>
//               <TextareaAutosize minRows={3} placeholder="Enter role description here..." value={roleDescription} onChange={(e) => setRoleDescription(e.target.value)} style={{ width: '100%', padding: '8.5px 14px', borderRadius: '4px', borderColor: 'rgba(0, 0, 0, 0.23)', fontFamily: 'inherit', fontSize: '1rem', resize: 'vertical', boxSizing: 'border-box' }} required />
//             </Grid>
//             <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
//               <Button variant="contained" color="primary" onClick={handleUpdateDetails}>
//                 Update Details
//               </Button>
//             </Grid>
//           </Grid>
//         )}

//         {tab === 1 && <Allowances />}
        
//         {tab === 2 && <StatutoryDeductions />}
//         {tab === 3 && <Reimbursements />}
//       </Paper>
//     </LocalizationProvider>
//   );
// };

// export default Detail;




// import React, { useState, useCallback, useContext, useEffect } from 'react';
// import { EmployeeContext } from './EmployeeContext';
// import {
//   Box,
//   TextField,
//   MenuItem,
//   Grid,
//   Typography,
//   Button,
//   InputAdornment,
//   TextareaAutosize,
//   Paper,
//   Tabs,
//   Tab,
//   CircularProgress,
//   Alert,
// } from '@mui/material';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import Lock from '@mui/icons-material/Lock';
// import dayjs from 'dayjs';

// import Swal from 'sweetalert2';

// // Assuming your axios instance is set up here
// import axiosInstance from '../../utils/axiosInstance';

// // Import child components
// import Allowances from './Allowances';
// import Commissions from './Commissions';
// import StatutoryDeductions from './StatutoryDeductions';
// import Reimbursements from './Reimbursements';

// const probationOptions = [{ value: 'Y', label: 'Yes' }, { value: 'N', 'label': 'No' }];

// const Detail = () => {
//   const [tab, setTab] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Form state
//   const [joiningDate, setJoiningDate] = useState(null);
//   const [departmentId, setDepartmentId] = useState('');
//   const [designationId, setDesignationId] = useState('');
//   const [grossSalary, setGrossSalary] = useState('0.00');
//   const [probation, setProbation] = useState('');
//   const [officeShiftId, setOfficeShiftId] = useState('');
//   const [roleDescription, setRoleDescription] = useState('');
//   // REMOVED: managerId state

//   // State to hold dropdown options from API
//   const [departmentsList, setDepartmentsList] = useState([]);
//   const [designationsList, setDesignationsList] = useState([]);
//   const [officeShiftsList, setOfficeShiftsList] = useState([]);
//   // REMOVED: managersList state

//   const { employeeId } = useContext(EmployeeContext);
//   const userId = employeeId;

//   useEffect(() => {
//     const fetchDropdownData = async () => {
//       try {
//         // REMOVED: managerRes from Promise.all
//         const [deptRes, desigRes, shiftRes] = await Promise.all([
//           axiosInstance.get('api/departments/dropdown/'),
//           axiosInstance.get('api/designations/dropdown/'),
//           axiosInstance.get('api/office_shift_dropdown/'),
//         ]);

//         if (deptRes.data && deptRes.data.status === true) {
//           setDepartmentsList(deptRes.data.data || []);
//         }
//         if (desigRes.data && desigRes.data.status === true) {
//           setDesignationsList(desigRes.data.data || []);
//         }
//         if (shiftRes.data && shiftRes.data.status === 'success') {
//           setOfficeShiftsList(shiftRes.data.office_shift_data || []);
//         }
//         // REMOVED: managerRes handling
//       } catch (err) {
//         console.error("Failed to fetch dropdown data", err);
//         setError("Failed to load required form options.");
//       }
//     };

//     fetchDropdownData();
//   }, []);


//   const fetchContractDetails = useCallback(async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await axiosInstance.post('api/contract_details/', {
//         user_id: userId,
//         type: 1,
//       });

//       if (response.data && response.data.contract_details && response.data.contract_details.length > 0) {
//         const details = response.data.contract_details[0];

//         setJoiningDate(details.contract_date ? dayjs(details.contract_date, 'YYYY-MM-DD') : null);
//         setDepartmentId(details.department_id || '');
//         setDesignationId(details.designation_id || '');
//         setGrossSalary(details.gross_salary || '0.00');
//         setOfficeShiftId(details.office_shift_id || '');
//         setProbation(details.probation || '');
//         setRoleDescription(details.role_description || '');
//         // REMOVED: setManagerId
//       } else {
//         // Reset form if no details are found
//         setJoiningDate(null);
//         setDepartmentId('');
//         setDesignationId('');
//         setGrossSalary('0.00');
//         setOfficeShiftId('');
//         setProbation('');
//         setRoleDescription('');
//         // REMOVED: setManagerId
//         setError("No contract details found for this user. You can create a new one.");
//       }
//     } catch (err) {
//       setError(err.message || "An error occurred while fetching contract details.");
//       console.error("Fetch error:", err);
//     } finally {
//       setLoading(false);
//     }
//   }, [userId]);

//   useEffect(() => {
//     if (userId) {
//       fetchContractDetails();
//     } else {
//       setLoading(false);
//     }
//   }, [userId, fetchContractDetails]);


//   const handleUpdateDetails = async () => {
//     if (!userId) {
//       Swal.fire({
//         icon: 'error',
//         title: 'Missing Information',
//         text: 'Cannot update: Employee ID is missing.',
//       });
//       return;
//     }

//     // REMOVED: managerId from required fields
//     const requiredFields = { joiningDate, departmentId, designationId, grossSalary, probation, officeShiftId, roleDescription };
//     for (const field in requiredFields) {
//       if (!requiredFields[field]) {
//         Swal.fire({
//           icon: 'warning',
//           title: 'Validation Error',
//           text: `Please fill out the "${field.replace(/([A-Z])/g, ' $1').trim()}" field. It is required.`,
//         });
//         return;
//       }
//     }

//     const payload = {
//       user_id: userId,
//       company_id: 2,
//       type: 1,
//       department_id: departmentId,
//       designation_id: designationId,
//       gross_salary: parseFloat(grossSalary),
//       office_shift_id: officeShiftId,
//       probation: probation,
//       // REMOVED: manager property from payload
//       role_description: roleDescription,
//       contract_date: joiningDate ? joiningDate.format('YYYY-MM-DD') : null,
//     };

//     Swal.fire({
//       title: 'Updating Details...',
//       text: 'Please wait.',
//       allowOutsideClick: false,
//       didOpen: () => {
//         Swal.showLoading();
//       },
//     });

//     try {
//       await axiosInstance.patch(`api/contract_details/`, payload);
//       Swal.fire({
//         icon: 'success',
//         title: 'Updated!',
//         text: 'Details have been updated successfully.',
//       });
//     } catch (err) {
//       const errorMessage = err.response?.data?.message || 'Failed to update details. Please check the console.';
//       console.error("Update error:", err.response ? err.response.data : err);
//       Swal.fire({
//         icon: 'error',
//         title: 'Update Failed',
//         text: errorMessage,
//       });
//     }
//   };

//   if (loading) {
//     return <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress /></Box>;
//   }

//   if (error && !joiningDate) { 
//     return <Alert severity="warning">{error}</Alert>;
//   }

//   return (
//     <LocalizationProvider dateAdapter={AdapterDayjs}>
//       <Paper sx={{ p: 2 }}>
//         <Box display="flex" alignItems="center" mb={2}>
//           <Lock color="primary" sx={{ mr: 1 }} />
//           <Typography variant="h6">Set Details</Typography>
//         </Box>

//         <Tabs value={tab} onChange={(e, val) => setTab(val)} sx={{ mb: 2 }}>
//           <Tab label="Details" />
//           <Tab label="Allowances" />
//           <Tab label="Statutory Deductions" />
//           <Tab label="Reimbursements" />
//         </Tabs>

//         {tab === 0 && (
//           <Grid container spacing={3}>
//             <Grid item xs={12} sm={6}>
//               <DatePicker
//                 label="Joining Date *"
//                 value={joiningDate}
//                 onChange={(newValue) => setJoiningDate(newValue)}
//                 slots={{
//                   textField: (params) => <TextField {...params} fullWidth size="small" required />,
//                 }}
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 select
//                 label="Department *"
//                 value={departmentId}
//                 onChange={(e) => setDepartmentId(e.target.value)}
//                 fullWidth size="small" required
//               >
//                 {departmentsList.map((option) => (
//                   <MenuItem key={option.department_id} value={option.department_id}>
//                     {option.department_name}
//                   </MenuItem>
//                 ))}
//               </TextField>
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 select
//                 label="Designation *"
//                 value={designationId}
//                 onChange={(e) => setDesignationId(e.target.value)}
//                 fullWidth size="small" required
//               >
//                 {designationsList.map((option) => (
//                   <MenuItem key={option.designation_id} value={option.designation_id}>
//                     {option.designation_name}
//                   </MenuItem>
//                 ))}
//               </TextField>
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField label="Gross Salary *" type="number" value={grossSalary} onChange={(e) => setGrossSalary(e.target.value)} fullWidth size="small" required InputProps={{ startAdornment: <InputAdornment position="start">INR</InputAdornment> }}/>
//             </Grid>
            
//             <Grid item xs={12} sm={6}>
//               <TextField select label="Probation *" value={probation} onChange={(e) => setProbation(e.target.value)} fullWidth size="small" required >
//                 {probationOptions.map((option) => (<MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>))}
//               </TextField>
//             </Grid>

//             <Grid item xs={12} sm={6}>
//               <TextField select label="Office Shift *" value={officeShiftId} onChange={(e) => setOfficeShiftId(e.target.value)} fullWidth size="small" required >
//                 {officeShiftsList.map((option) => (
//                     <MenuItem key={option.office_shift_id} value={option.office_shift_id}>
//                         {option.office_shift_name}
//                     </MenuItem>
//                 ))}
//               </TextField>
//             </Grid>
            
//             {/* REMOVED: MANAGER FIELD */}

//             <Grid item xs={12}>
//               <Typography variant="subtitle2" gutterBottom sx={{ color: 'text.secondary' }}>Role Description *</Typography>
//               <TextareaAutosize minRows={3} placeholder="Enter role description here..." value={roleDescription} onChange={(e) => setRoleDescription(e.target.value)} style={{ width: '100%', padding: '8.5px 14px', borderRadius: '4px', borderColor: 'rgba(0, 0, 0, 0.23)', fontFamily: 'inherit', fontSize: '1rem', resize: 'vertical', boxSizing: 'border-box' }} required />
//             </Grid>
//             <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
//               <Button variant="contained" color="primary" onClick={handleUpdateDetails}>
//                 Update Details
//               </Button>
//             </Grid>
//           </Grid>
//         )}

//         {tab === 1 && <Allowances />}
        
//         {tab === 2 && <StatutoryDeductions />}
//         {tab === 3 && <Reimbursements />}
//       </Paper>
//     </LocalizationProvider>
//   );
// };

// export default Detail;












// import React, { useState, useCallback, useContext, useEffect } from 'react';
// import { EmployeeContext } from './EmployeeContext';
// import {
//   Box,
//   TextField,
//   MenuItem,
//   Grid,
//   Typography,
//   Button,
//   InputAdornment,
//   TextareaAutosize,
//   Paper,
//   Tabs,
//   Tab,
//   CircularProgress,
//   Alert,
//   // New imports for the Standardized Table
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TablePagination,
//   InputBase,
//   IconButton,
// } from '@mui/material';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import Lock from '@mui/icons-material/Lock';
// import SearchIcon from '@mui/icons-material/Search';
// import dayjs from 'dayjs';
// import Swal from 'sweetalert2';

// // Assuming your axios instance is set up here
// import axiosInstance from '../../utils/axiosInstance';
// import StatutoryDeductions from './StatutoryDeductions';
// import Reimbursements from './Reimbursements';

// // --- Reusable Standardized Table Component ---
// // For best practice, this component should be in its own file, e.g., /components/StandardizedTable.js
// const StandardizedTable = ({ columns, data, title }) => {
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filteredData, setFilteredData] = useState(data);

//   useEffect(() => {
//     setFilteredData(
//       data.filter((row) =>
//         columns.some((col) => {
//           const value = row[col.id];
//           return value && value.toString().toLowerCase().includes(searchTerm.toLowerCase());
//         })
//       )
//     );
//     setPage(0); // Reset to first page on search
//   }, [searchTerm, data, columns]);

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(+event.target.value);
//     setPage(0);
//   };
  
//   // To handle empty rows and prevent layout shift
//   const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredData.length) : 0;

//   return (
//     <Paper sx={{ width: '100%', overflow: 'hidden', p: 2 }}>
//       <Box sx={{
//         display: 'flex',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         mb: 2
//       }}>
//         <Typography variant="h6" component="div">
//           {title}
//         </Typography>
//         <Paper component="form" sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 300 }}>
//           <InputBase
//             sx={{ ml: 1, flex: 1 }}
//             placeholder="Search..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//           <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
//             <SearchIcon />
//           </IconButton>
//         </Paper>
//       </Box>
//       <TableContainer sx={{ maxHeight: 440 }}>
//         <Table stickyHeader aria-label="sticky table">
//           <TableHead>
//             <TableRow>
//               {columns.map((column) => (
//                 <TableCell
//                   key={column.id}
//                   align={column.align || 'left'}
//                   style={{ minWidth: column.minWidth }}
//                   sx={{ 
//                     backgroundColor: '#8C257C', // Purple Header
//                     color: 'white',
//                     fontWeight: 'bold',
//                   }}
//                 >
//                   {column.label}
//                 </TableCell>
//               ))}
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {filteredData
//               .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//               .map((row) => {
//                 return (
//                   <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
//                     {columns.map((column) => {
//                       const value = row[column.id];
//                       return (
//                         <TableCell key={column.id} align={column.align}>
//                           {column.format && typeof value === 'number'
//                             ? column.format(value)
//                             : value}
//                         </TableCell>
//                       );
//                     })}
//                   </TableRow>
//                 );
//               })}
//             {emptyRows > 0 && (
//               <TableRow style={{ height: 53 * emptyRows }}>
//                 <TableCell colSpan={columns.length} />
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </TableContainer>
//       <Box sx={{
//         display: 'flex',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         pt: 2
//       }}>
//         <Typography variant="body2" color="text.secondary">
//           Total Rows: {filteredData.length}
//         </Typography>
//         <TablePagination
//           rowsPerPageOptions={[10, 25, 100]}
//           component="div"
//           count={filteredData.length}
//           rowsPerPage={rowsPerPage}
//           page={page}
//           onPageChange={handleChangePage}
//           onRowsPerPageChange={handleChangeRowsPerPage}
//         />
//       </Box>
//     </Paper>
//   );
// };

// // --- Child Components ---

// // Allowances component now uses the StandardizedTable
// const Allowances = () => {
//   // This is where you would fetch your actual allowances data
//   // For demonstration, we'll use mock data.
//   const [allowances, setAllowances] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const { employeeId } = useContext(EmployeeContext);

//   useEffect(() => {
   
//     const mockData = [
//       { id: 1, type: 'House Rent Allowance', amount: 15000, is_taxable: 'Yes' },
//       { id: 2, type: 'Travel Allowance', amount: 5000, is_taxable: 'No' },
//       { id: 3, type: 'Medical Allowance', amount: 2500, is_taxable: 'Yes' },
//       // ...add more mock data to test pagination and search
//     ];
//     setAllowances(mockData);
//     setLoading(false);
//   }, [employeeId]);
  
//   const columns = [
//     { id: 'type', label: 'Allowance Type', minWidth: 170 },
//     { id: 'amount', label: 'Amount (INR)', minWidth: 100, align: 'right', format: (value) => value.toLocaleString('en-IN') },
//     { id: 'is_taxable', label: 'Is Taxable', minWidth: 100 },
//   ];

//   if (loading) {
//     return <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress /></Box>;
//   }

//   return <StandardizedTable columns={columns} data={allowances} title="Employee Allowances" />;
// };




// const probationOptions = [{ value: 'Y', label: 'Yes' }, { value: 'N', 'label': 'No' }];

// const Detail = () => {
//   const [tab, setTab] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Form state
//   const [joiningDate, setJoiningDate] = useState(null);
//   const [departmentId, setDepartmentId] = useState('');
//   const [designationId, setDesignationId] = useState('');
//   const [grossSalary, setGrossSalary] = useState('0.00');
//   const [probation, setProbation] = useState('');
//   const [officeShiftId, setOfficeShiftId] = useState('');
//   const [roleDescription, setRoleDescription] = useState('');
  
//   // State to hold dropdown options from API
//   const [departmentsList, setDepartmentsList] = useState([]);
//   const [designationsList, setDesignationsList] = useState([]);
//   const [officeShiftsList, setOfficeShiftsList] = useState([]);
  
//   const { employeeId } = useContext(EmployeeContext);
//   const userId = employeeId;

//   useEffect(() => {
//     const fetchDropdownData = async () => {
//       try {
//         const [deptRes, desigRes, shiftRes] = await Promise.all([
//           axiosInstance.get('api/departments/dropdown/'),
//           axiosInstance.get('api/designations/dropdown/'),
//           axiosInstance.get('api/office_shift_dropdown/'),
//         ]);

//         if (deptRes.data && deptRes.data.status === true) {
//           setDepartmentsList(deptRes.data.data || []);
//         }
//         if (desigRes.data && desigRes.data.status === true) {
//           setDesignationsList(desigRes.data.data || []);
//         }
//         if (shiftRes.data && shiftRes.data.status === 'success') {
//           setOfficeShiftsList(shiftRes.data.office_shift_data || []);
//         }
//       } catch (err) {
//         console.error("Failed to fetch dropdown data", err);
//         setError("Failed to load required form options.");
//       }
//     };

//     fetchDropdownData();
//   }, []);


//   const fetchContractDetails = useCallback(async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await axiosInstance.post('api/contract_details/', {
//         user_id: userId,
//         type: 1,
//       });

//       if (response.data && response.data.contract_details && response.data.contract_details.length > 0) {
//         const details = response.data.contract_details[0];

//         setJoiningDate(details.contract_date ? dayjs(details.contract_date, 'YYYY-MM-DD') : null);
//         setDepartmentId(details.department_id || '');
//         setDesignationId(details.designation_id || '');
//         setGrossSalary(details.gross_salary || '0.00');
//         setOfficeShiftId(details.office_shift_id || '');
//         setProbation(details.probation || '');
//         setRoleDescription(details.role_description || '');
//       } else {
//         setJoiningDate(null);
//         setDepartmentId('');
//         setDesignationId('');
//         setGrossSalary('0.00');
//         setOfficeShiftId('');
//         setProbation('');
//         setRoleDescription('');
//         setError("No contract details found for this user. You can create a new one.");
//       }
//     } catch (err) {
//       setError(err.message || "An error occurred while fetching contract details.");
//       console.error("Fetch error:", err);
//     } finally {
//       setLoading(false);
//     }
//   }, [userId]);

//   useEffect(() => {
//     if (userId) {
//       fetchContractDetails();
//     } else {
//       setLoading(false);
//     }
//   }, [userId, fetchContractDetails]);


//   const handleUpdateDetails = async () => {
//     if (!userId) {
//       Swal.fire({
//         icon: 'error',
//         title: 'Missing Information',
//         text: 'Cannot update: Employee ID is missing.',
//       });
//       return;
//     }

//     const requiredFields = { joiningDate, departmentId, designationId, grossSalary, probation, officeShiftId, roleDescription };
//     for (const field in requiredFields) {
//       if (!requiredFields[field]) {
//         Swal.fire({
//           icon: 'warning',
//           title: 'Validation Error',
//           text: `Please fill out the "${field.replace(/([A-Z])/g, ' $1').trim()}" field. It is required.`,
//         });
//         return;
//       }
//     }

//     const payload = {
//       user_id: userId,
//       company_id: 2,
//       type: 1,
//       department_id: departmentId,
//       designation_id: designationId,
//       gross_salary: parseFloat(grossSalary),
//       office_shift_id: officeShiftId,
//       probation: probation,
//       role_description: roleDescription,
//       contract_date: joiningDate ? joiningDate.format('YYYY-MM-DD') : null,
//     };

//     Swal.fire({
//       title: 'Updating Details...',
//       text: 'Please wait.',
//       allowOutsideClick: false,
//       didOpen: () => {
//         Swal.showLoading();
//       },
//     });

//     try {
//       await axiosInstance.patch(`api/contract_details/`, payload);
//       Swal.fire({
//         icon: 'success',
//         title: 'Updated!',
//         text: 'Details have been updated successfully.',
//       });
//     } catch (err) {
//       const errorMessage = err.response?.data?.message || 'Failed to update details. Please check the console.';
//       console.error("Update error:", err.response ? err.response.data : err);
//       Swal.fire({
//         icon: 'error',
//         title: 'Update Failed',
//         text: errorMessage,
//       });
//     }
//   };

//   if (loading) {
//     return <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress /></Box>;
//   }

//   if (error && !joiningDate) { 
//     return <Alert severity="warning">{error}</Alert>;
//   }

//   return (
//     <LocalizationProvider dateAdapter={AdapterDayjs}>
//       <Paper sx={{ p: 2 }}>
//         <Box display="flex" alignItems="center" mb={2}>
//           <Lock sx={{ color: '#8C257C', mr: 1 }} />
//           <Typography variant="h6" sx={{ color: '#8C257C' }}>Set Details</Typography>
//         </Box>

//         <Tabs 
//           value={tab} 
//           onChange={(e, val) => setTab(val)} 
//           sx={{ mb: 2 }}
//           textColor="primary"
//           indicatorColor="primary"
//         >
//           <Tab label="Details" />
//           <Tab label="Allowances" />
//           <Tab label="Statutory Deductions" />
//           <Tab label="Reimbursements" />
//         </Tabs>

//         {tab === 0 && (
//           <Grid container spacing={3}>
//             <Grid item xs={12} sm={6}>
//               <DatePicker
//                 label="Joining Date *"
//                 value={joiningDate}
//                 onChange={(newValue) => setJoiningDate(newValue)}
//                 slots={{
//                   textField: (params) => <TextField {...params} fullWidth size="small" required />,
//                 }}
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 select
//                 label="Department *"
//                 value={departmentId}
//                 onChange={(e) => setDepartmentId(e.target.value)}
//                 fullWidth size="small" required
//               >
//                 {departmentsList.map((option) => (
//                   <MenuItem key={option.department_id} value={option.department_id}>
//                     {option.department_name}
//                   </MenuItem>
//                 ))}
//               </TextField>
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 select
//                 label="Designation *"
//                 value={designationId}
//                 onChange={(e) => setDesignationId(e.target.value)}
//                 fullWidth size="small" required
//               >
//                 {designationsList.map((option) => (
//                   <MenuItem key={option.designation_id} value={option.designation_id}>
//                     {option.designation_name}
//                   </MenuItem>
//                 ))}
//               </TextField>
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField label="Gross Salary *" type="number" value={grossSalary} onChange={(e) => setGrossSalary(e.target.value)} fullWidth size="small" required InputProps={{ startAdornment: <InputAdornment position="start">INR</InputAdornment> }}/>
//             </Grid>
            
//             <Grid item xs={12} sm={6}>
//               <TextField select label="Probation *" value={probation} onChange={(e) => setProbation(e.target.value)} fullWidth size="small" required >
//                 {probationOptions.map((option) => (<MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>))}
//               </TextField>
//             </Grid>

//             <Grid item xs={12} sm={6}>
//               <TextField select label="Office Shift *" value={officeShiftId} onChange={(e) => setOfficeShiftId(e.target.value)} fullWidth size="small" required >
//                 {officeShiftsList.map((option) => (
//                     <MenuItem key={option.office_shift_id} value={option.office_shift_id}>
//                         {option.office_shift_name}
//                     </MenuItem>
//                 ))}
//               </TextField>
//             </Grid>
            
//             <Grid item xs={12}>
//               <Typography variant="subtitle2" gutterBottom sx={{ color: 'text.secondary' }}>Role Description *</Typography>
//               <TextareaAutosize minRows={3} placeholder="Enter role description here..." value={roleDescription} onChange={(e) => setRoleDescription(e.target.value)} style={{ width: '100%', padding: '8.5px 14px', borderRadius: '4px', borderColor: 'rgba(0, 0, 0, 0.23)', fontFamily: 'inherit', fontSize: '1rem', resize: 'vertical', boxSizing: 'border-box' }} required />
//             </Grid>
//             <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
//               <Button 
//                 variant="contained" 
//                 onClick={handleUpdateDetails}
//                 sx={{ 
//                   backgroundColor: '#8C257C', // Purple button
//                   '&:hover': {
//                     backgroundColor: '#731e65' // Darker purple on hover
//                   }
//                 }}
//               >
//                 Update Details
//               </Button>
//             </Grid>
//           </Grid>
//         )}

//         {tab === 1 && <Allowances />}
//         {tab === 2 && <StatutoryDeductions />}
//         {tab === 3 && <Reimbursements />}
//       </Paper>
//     </LocalizationProvider>
//   );
// };

// export default Detail;





  // import React, { useState, useCallback, useContext, useEffect } from 'react';
  // import { EmployeeContext } from './EmployeeContext';
  // import {
  //   Box,
  //   TextField,
  //   MenuItem,
  //   Grid,
  //   Typography,
  //   Button,
  //   InputAdornment,
  //   TextareaAutosize,
  //   Paper,
  //   Tabs,
  //   Tab,
  //   CircularProgress,
  //   Alert,
  //   Table,
  //   TableBody,
  //   TableCell,
  //   TableContainer,
  //   TableHead,
  //   TableRow,
  //   TablePagination,
  //   InputBase,
  //   IconButton,
  // } from '@mui/material';
  // import { DatePicker } from '@mui/x-date-pickers/DatePicker';
  // import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
  // import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
  // import Lock from '@mui/icons-material/Lock';
  // import SearchIcon from '@mui/icons-material/Search';
  // import dayjs from 'dayjs';
  // import Swal from 'sweetalert2';
  // import axiosInstance from '../../utils/axiosInstance';
  // import StatutoryDeductions from './StatutoryDeductions';
  // import Reimbursements from './Reimbursements';

  // // --- Reusable Standardized Table Component ---
  // const StandardizedTable = ({ columns, data, title }) => {
  //   const [page, setPage] = useState(0);
  //   const [rowsPerPage, setRowsPerPage] = useState(10);
  //   const [searchTerm, setSearchTerm] = useState('');
  //   const [filteredData, setFilteredData] = useState(data);

  //   useEffect(() => {
  //     setFilteredData(
  //       data.filter((row) =>
  //         columns.some((col) => {
  //           const value = row[col.id];
  //           return value && value.toString().toLowerCase().includes(searchTerm.toLowerCase());
  //         })
  //       )
  //     );
  //     setPage(0);
  //   }, [searchTerm, data, columns]);

  //   const handleChangePage = (event, newPage) => {
  //     setPage(newPage);
  //   };

  //   const handleChangeRowsPerPage = (event) => {
  //     setRowsPerPage(+event.target.value);
  //     setPage(0);
  //   };

  //   const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredData.length) : 0;

  //   return (
  //     <Paper sx={{ width: '100%', overflow: 'hidden', p: 2 }}>
  //       <Box sx={{
  //         display: 'flex',
  //         justifyContent: 'space-between',
  //         alignItems: 'center',
  //         mb: 2
  //       }}>
  //         <Typography variant="h6" component="div">
  //           {title}
  //         </Typography>
  //         <Paper
  //           component="form"
  //           onSubmit={(e) => e.preventDefault()}
  //           sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 300 }}
  //         >
  //           <InputBase
  //             sx={{ ml: 1, flex: 1 }}
  //             placeholder="Search..."
  //             value={searchTerm}
  //             onChange={(e) => setSearchTerm(e.target.value)}
  //           />
  //           <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
  //             <SearchIcon />
  //           </IconButton>
  //         </Paper>
  //       </Box>
  //       <TableContainer sx={{ maxHeight: 440 }}>
  //         <Table stickyHeader aria-label="sticky table">
  //           <TableHead>
  //             <TableRow>
  //               {columns.map((column) => (
  //                 <TableCell
  //                   key={column.id}
  //                   align={column.align || 'left'}
  //                   style={{ minWidth: column.minWidth }}
  //                   sx={{
  //                     backgroundColor: '#8C257C',
  //                     color: 'white',
  //                     fontWeight: 'bold',
  //                   }}
  //                 >
  //                   {column.label}
  //                 </TableCell>
  //               ))}
  //             </TableRow>
  //           </TableHead>
  //           <TableBody>
  //             {filteredData
  //               .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
  //               .map((row) => {
  //                 return (
  //                   <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
  //                     {columns.map((column) => {
  //                       const value = row[column.id];
  //                       return (
  //                         <TableCell key={column.id} align={column.align}>
  //                           {column.format && typeof value === 'number'
  //                             ? column.format(value)
  //                             : value}
  //                         </TableCell>
  //                       );
  //                     })}
  //                   </TableRow>
  //                 );
  //               })}
  //             {emptyRows > 0 && (
  //               <TableRow style={{ height: 53 * emptyRows }}>
  //                 <TableCell colSpan={columns.length} />
  //               </TableRow>
  //             )}
  //           </TableBody>
  //         </Table>
  //       </TableContainer>
  //       <Box sx={{
  //         display: 'flex',
  //         justifyContent: 'space-between',
  //         alignItems: 'center',
  //         pt: 2
  //       }}>
  //         <Typography variant="body2" color="text.secondary">
  //           Total Rows: {filteredData.length}
  //         </Typography>
  //         <TablePagination
  //           rowsPerPageOptions={[10, 25, 100]}
  //           component="div"
  //           count={filteredData.length}
  //           rowsPerPage={rowsPerPage}
  //           page={page}
  //           onPageChange={handleChangePage}
  //           onRowsPerPageChange={handleChangeRowsPerPage}
  //         />
  //       </Box>
  //     </Paper>
  //   );
  // };

  // // --- Allowances Component ---
  // const Allowances = () => {
  //   const [allowances, setAllowances] = useState([]);
  //   const [loading, setLoading] = useState(true);
  //   const { employeeId } = useContext(EmployeeContext);

  //   useEffect(() => {
  //     const mockData = [
  //       { id: 1, type: 'House Rent Allowance', amount: 15000, is_taxable: 'Yes' },
  //       { id: 2, type: 'Travel Allowance', amount: 5000, is_taxable: 'No' },
  //       { id: 3, type: 'Medical Allowance', amount: 2500, is_taxable: 'Yes' },
  //     ];
  //     setAllowances(mockData);
  //     setLoading(false);
  //   }, [employeeId]);

  //   const columns = [
  //     { id: 'type', label: 'Allowance Type', minWidth: 170 },
  //     { id: 'amount', label: 'Amount (INR)', minWidth: 100, align: 'right', format: (value) => value.toLocaleString('en-IN') },
  //     { id: 'is_taxable', label: 'Is Taxable', minWidth: 100 },
  //   ];

  //   if (loading) {
  //     return <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress /></Box>;
  //   }

  //   return <StandardizedTable columns={columns} data={allowances} title="Employee Allowances" />;
  // };

  // const probationOptions = [{ value: 'Y', label: 'Yes' }, { value: 'N', label: 'No' }];

  // const Detail = () => {
  //   const [tab, setTab] = useState(0);
  //   const [loading, setLoading] = useState(true);
  //   const [error, setError] = useState(null);

  //   const [joiningDate, setJoiningDate] = useState(null);
  //   const [departmentId, setDepartmentId] = useState('');
  //   const [designationId, setDesignationId] = useState('');
  //   const [grossSalary, setGrossSalary] = useState('0.00');
  //   const [probation, setProbation] = useState('');
  //   const [officeShiftId, setOfficeShiftId] = useState('');
  //   const [roleDescription, setRoleDescription] = useState('');

  //   const [departmentsList, setDepartmentsList] = useState([]);
  //   const [designationsList, setDesignationsList] = useState([]);
  //   const [officeShiftsList, setOfficeShiftsList] = useState([]);

  //   const { employeeId } = useContext(EmployeeContext);
  //   const userId = employeeId;

  //   useEffect(() => {
  //     const fetchDropdownData = async () => {
  //       try {
  //         const [deptRes, desigRes, shiftRes] = await Promise.all([
  //           axiosInstance.get('api/departments/dropdown/'),
  //           axiosInstance.get('api/designations/dropdown/'),
  //           axiosInstance.get('api/office_shift_dropdown/'),
  //         ]);

  //         if (deptRes.data && deptRes.data.status === true) {
  //           setDepartmentsList(deptRes.data.data || []);
  //         }
  //         if (desigRes.data && desigRes.data.status === true) {
  //           setDesignationsList(desigRes.data.data || []);
  //         }
  //         if (shiftRes.data && shiftRes.data.status === 'success') {
  //           setOfficeShiftsList(shiftRes.data.office_shift_data || []);
  //         }
  //       } catch (err) {
  //         console.error("Failed to fetch dropdown data", err);
  //         setError("Failed to load required form options.");
  //       }
  //     };

  //     fetchDropdownData();
  //   }, []);

  //   const fetchContractDetails = useCallback(async () => {
  //     setLoading(true);
  //     setError(null);
  //     try {
  //       const response = await axiosInstance.post('api/contract_details/', {
  //         user_id: userId,
  //         type: 1,
  //       });

  //       if (response.data && response.data.contract_details && response.data.contract_details.length > 0) {
  //         const details = response.data.contract_details[0];

  //         setJoiningDate(details.contract_date ? dayjs(details.contract_date, 'YYYY-MM-DD') : null);
  //         setDepartmentId(details.department_id || '');
  //         setDesignationId(details.designation_id || '');
  //         setGrossSalary(details.gross_salary || '0.00');
  //         setOfficeShiftId(details.office_shift_id || '');
  //         // 👇 Convert 'y' or 'n' response to dropdown-compatible value
  //         setProbation(details.probation?.toLowerCase() === 'y' ? 'Y' : 'N');
  //         setRoleDescription(details.role_description || '');
  //       } else {
  //         setJoiningDate(null);
  //         setDepartmentId('');
  //         setDesignationId('');
  //         setGrossSalary('0.00');
  //         setOfficeShiftId('');
  //         setProbation('');
  //         setRoleDescription('');
  //         setError("No contract details found for this user. You can create a new one.");
  //       }
  //     } catch (err) {
  //       setError(err.message || "An error occurred while fetching contract details.");
  //       console.error("Fetch error:", err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }, [userId]);

  //   useEffect(() => {
  //     if (userId) {
  //       fetchContractDetails();
  //     } else {
  //       setLoading(false);
  //     }
  //   }, [userId, fetchContractDetails]);

  //   const handleUpdateDetails = async () => {
  //     if (!userId) {
  //       Swal.fire({
  //         icon: 'error',
  //         title: 'Missing Information',
  //         text: 'Cannot update: Employee ID is missing.',
  //       });
  //       return;
  //     }

  //     const requiredFields = { joiningDate, departmentId, designationId, grossSalary, probation, officeShiftId, roleDescription };
  //     for (const field in requiredFields) {
  //       if (!requiredFields[field]) {
  //         Swal.fire({
  //           icon: 'warning',
  //           title: 'Validation Error',
  //           text: `Please fill out the "${field.replace(/([A-Z])/g, ' $1').trim()}" field. It is required.`,
  //         });
  //         return;
  //       }
  //     }

  //     const payload = {
  //       user_id: userId,
  //       company_id: 2,
  //       type: 1,
  //       department_id: departmentId,
  //       designation_id: designationId,
  //       gross_salary: parseFloat(grossSalary),
  //       office_shift_id: officeShiftId,
  //       probation: probation,
  //       role_description: roleDescription,
  //       contract_date: joiningDate ? joiningDate.format('YYYY-MM-DD') : null,
  //     };

  //     Swal.fire({
  //       title: 'Updating Details...',
  //       text: 'Please wait.',
  //       allowOutsideClick: false,
  //       didOpen: () => {
  //         Swal.showLoading();
  //       },
  //     });

  //     try {
  //       await axiosInstance.patch(`api/contract_details/`, payload);
  //       Swal.fire({
  //         icon: 'success',
  //         title: 'Updated!',
  //         text: 'Details have been updated successfully.',
  //       });
  //     } catch (err) {
  //       const errorMessage = err.response?.data?.message || 'Failed to update details. Please check the console.';
  //       console.error("Update error:", err.response ? err.response.data : err);
  //       Swal.fire({
  //         icon: 'error',
  //         title: 'Update Failed',
  //         text: errorMessage,
  //       });
  //     }
  //   };

  //   if (loading) {
  //     return <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress /></Box>;
  //   }

  //   if (error && !joiningDate) {
  //     return <Alert severity="warning">{error}</Alert>;
  //   }

  //   return (
  //     <LocalizationProvider dateAdapter={AdapterDayjs}>
  //       <Paper sx={{ p: 2 }}>
  //         <Box display="flex" alignItems="center" mb={2}>
  //           <Lock sx={{ color: '#8C257C', mr: 1 }} />
  //           <Typography variant="h6" sx={{ color: '#8C257C' }}>Set Details</Typography>
  //         </Box>

  //         <Tabs
  //           value={tab}
  //           onChange={(e, val) => setTab(val)}
  //           sx={{ mb: 2 }}
  //           textColor="primary"
  //           indicatorColor="primary"
  //         >
  //           <Tab label="Details" />
  //           <Tab label="Allowances" />
  //           <Tab label="Statutory Deductions" />
  //           <Tab label="Reimbursements" />
  //         </Tabs>

  //         {tab === 0 && (
  //           <Grid container spacing={3}>
  //             <Grid item xs={12} sm={6}>
  //               <DatePicker
  //                 label="Joining Date *"
  //                 value={joiningDate}
  //                 onChange={(newValue) => setJoiningDate(newValue)}
  //                 slots={{
  //                   textField: (params) => <TextField {...params} fullWidth size="small" required />,
  //                 }}
  //               />
  //             </Grid>
  //             <Grid item xs={12} sm={6}>
  //               <TextField
  //                 select
  //                 label="Department *"
  //                 value={departmentId}
  //                 onChange={(e) => setDepartmentId(e.target.value)}
  //                 fullWidth size="small" required
  //               >
  //                 {departmentsList.map((option) => (
  //                   <MenuItem key={option.department_id} value={option.department_id}>
  //                     {option.department_name}
  //                   </MenuItem>
  //                 ))}
  //               </TextField>
  //             </Grid>
  //             <Grid item xs={12} sm={6}>
  //               <TextField
  //                 select
  //                 label="Designation *"
  //                 value={designationId}
  //                 onChange={(e) => setDesignationId(e.target.value)}
  //                 fullWidth size="small" required
  //               >
  //                 {designationsList.map((option) => (
  //                   <MenuItem key={option.designation_id} value={option.designation_id}>
  //                     {option.designation_name}
  //                   </MenuItem>
  //                 ))}
  //               </TextField>
  //             </Grid>
  //             <Grid item xs={12} sm={6}>
  //               <TextField label="Gross Salary *" type="number" value={grossSalary} onChange={(e) => setGrossSalary(e.target.value)} fullWidth size="small" required InputProps={{ startAdornment: <InputAdornment position="start">INR</InputAdornment> }} />
  //             </Grid>

  //             <Grid item xs={12} sm={6}>
  //               <TextField select label="Probation *" value={probation} onChange={(e) => setProbation(e.target.value)} fullWidth size="small" required >
  //                 {probationOptions.map((option) => (<MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>))}
  //               </TextField>
  //             </Grid>

  //             <Grid item xs={12} sm={6}>
  //               <TextField select label="Office Shift *" value={officeShiftId} onChange={(e) => setOfficeShiftId(e.target.value)} fullWidth size="small" required >
  //                 {officeShiftsList.map((option) => (
  //                   <MenuItem key={option.office_shift_id} value={option.office_shift_id}>
  //                     {option.office_shift_name}
  //                   </MenuItem>
  //                 ))}
  //               </TextField>
  //             </Grid>

  //             <Grid item xs={12}>
  //               <Typography variant="subtitle2" gutterBottom sx={{ color: 'text.secondary' }}>Role Description *</Typography>
  //               <TextareaAutosize minRows={3} placeholder="Enter role description here..." value={roleDescription} onChange={(e) => setRoleDescription(e.target.value)} style={{ width: '100%', padding: '8.5px 14px', borderRadius: '4px', borderColor: 'rgba(0, 0, 0, 0.23)', fontFamily: 'inherit', fontSize: '1rem', resize: 'vertical', boxSizing: 'border-box' }} required />
  //             </Grid>
  //             <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
  //               <Button
  //                 variant="contained"
  //                 onClick={handleUpdateDetails}
  //                 sx={{
  //                   backgroundColor: '#8C257C',
  //                   '&:hover': {
  //                     backgroundColor: '#731e65'
  //                   }
  //                 }}
  //               >
  //                 Update Details
  //               </Button>
  //             </Grid>
  //           </Grid>
  //         )}

  //         {tab === 1 && <Allowances />}
  //         {tab === 2 && <StatutoryDeductions />}
  //         {tab === 3 && <Reimbursements />}
  //       </Paper>
  //     </LocalizationProvider>
  //   );
  // };

  // export default Detail;





//   import React, { useState, useCallback, useContext, useEffect } from 'react';
// import { EmployeeContext } from './EmployeeContext';
// import {
//   Box,
//   TextField,
//   MenuItem,
//   Grid,
//   Typography,
//   Button,
//   InputAdornment,
//   TextareaAutosize,
//   Paper,
//   Tabs,
//   Tab,
//   CircularProgress,
//   Alert,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TablePagination,
//   InputBase,
//   IconButton,
// } from '@mui/material';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import Lock from '@mui/icons-material/Lock';
// import SearchIcon from '@mui/icons-material/Search';
// import dayjs from 'dayjs';
// import Swal from 'sweetalert2';
// import axiosInstance from '../../utils/axiosInstance';
// import StatutoryDeductions from './StatutoryDeductions';
// import Reimbursements from './Reimbursements';

// // --- Reusable Standardized Table Component ---
// const StandardizedTable = ({ columns, data, title }) => {
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filteredData, setFilteredData] = useState(data);

//   useEffect(() => {
//     setFilteredData(
//       data.filter((row) =>
//         columns.some((col) => {
//           const value = row[col.id];
//           return value && value.toString().toLowerCase().includes(searchTerm.toLowerCase());
//         })
//       )
//     );
//     setPage(0);
//   }, [searchTerm, data, columns]);

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(+event.target.value);
//     setPage(0);
//   };

//   const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredData.length) : 0;

//   return (
//     <Paper sx={{ width: '100%', overflow: 'hidden', p: 2 }}>
//       <Box sx={{
//         display: 'flex',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         mb: 2
//       }}>
//         <Typography variant="h6" component="div">
//           {title}
//         </Typography>
//         <Paper
//           component="form"
//           onSubmit={(e) => e.preventDefault()}
//           sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 300 }}
//         >
//           <InputBase
//             sx={{ ml: 1, flex: 1 }}
//             placeholder="Search..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//           <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
//             <SearchIcon />
//           </IconButton>
//         </Paper>
//       </Box>
//       <TableContainer sx={{ maxHeight: 440 }}>
//         <Table stickyHeader aria-label="sticky table">
//           <TableHead>
//             <TableRow>
//               {columns.map((column) => (
//                 <TableCell
//                   key={column.id}
//                   align={column.align || 'left'}
//                   style={{ minWidth: column.minWidth }}
//                   sx={{
//                     backgroundColor: '#8C257C',
//                     color: 'white',
//                     fontWeight: 'bold',
//                   }}
//                 >
//                   {column.label}
//                 </TableCell>
//               ))}
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {filteredData
//               .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//               .map((row) => {
//                 return (
//                   <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
//                     {columns.map((column) => {
//                       const value = row[column.id];
//                       return (
//                         <TableCell key={column.id} align={column.align}>
//                           {column.format && typeof value === 'number'
//                             ? column.format(value)
//                             : value}
//                         </TableCell>
//                       );
//                     })}
//                   </TableRow>
//                 );
//               })}
//             {emptyRows > 0 && (
//               <TableRow style={{ height: 53 * emptyRows }}>
//                 <TableCell colSpan={columns.length} />
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </TableContainer>
//       <Box sx={{
//         display: 'flex',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         pt: 2
//       }}>
//         <Typography variant="body2" color="text.secondary">
//           Total Rows: {filteredData.length}
//         </Typography>
//         <TablePagination
//           rowsPerPageOptions={[10, 25, 100]}
//           component="div"
//           count={filteredData.length}
//           rowsPerPage={rowsPerPage}
//           page={page}
//           onPageChange={handleChangePage}
//           onRowsPerPageChange={handleChangeRowsPerPage}
//         />
//       </Box>
//     </Paper>
//   );
// };

// // --- Allowances Component ---
// const Allowances = () => {
//   const [allowances, setAllowances] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const { employeeId } = useContext(EmployeeContext);

//   useEffect(() => {
//     const mockData = [
//       { id: 1, type: 'House Rent Allowance', amount: 15000, is_taxable: 'Yes' },
//       { id: 2, type: 'Travel Allowance', amount: 5000, is_taxable: 'No' },
//       { id: 3, type: 'Medical Allowance', amount: 2500, is_taxable: 'Yes' },
//     ];
//     setAllowances(mockData);
//     setLoading(false);
//   }, [employeeId]);

//   const columns = [
//     { id: 'type', label: 'Allowance Type', minWidth: 170 },
//     { id: 'amount', label: 'Amount (INR)', minWidth: 100, align: 'right', format: (value) => value.toLocaleString('en-IN') },
//     { id: 'is_taxable', label: 'Is Taxable', minWidth: 100 },
//   ];

//   if (loading) {
//     return <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress /></Box>;
//   }

//   return <StandardizedTable columns={columns} data={allowances} title="Employee Allowances" />;
// };

// const probationOptions = [{ value: 'Y', label: 'Yes' }, { value: 'N', label: 'No' }];

// const Detail = () => {
//   const [tab, setTab] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const [joiningDate, setJoiningDate] = useState(null);
//   const [departmentId, setDepartmentId] = useState('');
//   const [designationId, setDesignationId] = useState('');
//   const [grossSalary, setGrossSalary] = useState('0.00');
//   const [probation, setProbation] = useState('');
//   const [officeShiftId, setOfficeShiftId] = useState('');
//   const [roleDescription, setRoleDescription] = useState('');

//   const [departmentsList, setDepartmentsList] = useState([]);
//   const [designationsList, setDesignationsList] = useState([]);
//   const [officeShiftsList, setOfficeShiftsList] = useState([]);

//   const { employeeId } = useContext(EmployeeContext);
//   const userId = employeeId;

//   useEffect(() => {
//     const fetchDropdownData = async () => {
//       try {
//         const [deptRes, desigRes, shiftRes] = await Promise.all([
//           axiosInstance.get('api/departments/dropdown/'),
//           axiosInstance.get('api/designations/dropdown/'),
//           axiosInstance.get('api/office_shift_dropdown/'),
//         ]);

//         if (deptRes.data && deptRes.data.status === true) {
//           setDepartmentsList(deptRes.data.data || []);
//         }
//         if (desigRes.data && desigRes.data.status === true) {
//           setDesignationsList(desigRes.data.data || []);
//         }
//         if (shiftRes.data && shiftRes.data.status === 'success') {
//           setOfficeShiftsList(shiftRes.data.office_shift_data || []);
//         }
//       } catch (err) {
//         console.error("Failed to fetch dropdown data", err);
//         setError("Failed to load required form options.");
//       }
//     };

//     fetchDropdownData();
//   }, []);

//   const fetchContractDetails = useCallback(async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await axiosInstance.post('api/contract_details/', {
//         user_id: userId,
//         type: 1,
//       });

//       if (response.data && response.data.contract_details && response.data.contract_details.length > 0) {
//         const details = response.data.contract_details[0];

//         setJoiningDate(details.contract_date ? dayjs(details.contract_date, 'YYYY-MM-DD') : null);
//         setDepartmentId(details.department_id || '');
//         setDesignationId(details.designation_id || '');
//         setGrossSalary(details.gross_salary || '0.00');
//         setOfficeShiftId(details.office_shift_id || '');
//         setProbation(details.probation?.toLowerCase() === 'y' ? 'Y' : 'N');
//         setRoleDescription(details.role_description || '');
//       } else {
//         setJoiningDate(null);
//         setDepartmentId('');
//         setDesignationId('');
//         setGrossSalary('0.00');
//         setOfficeShiftId('');
//         setProbation('');
//         setRoleDescription('');
//         setError("No contract details found for this user. You can create a new one.");
//       }
//     } catch (err) {
//       setError(err.message || "An error occurred while fetching contract details.");
//       console.error("Fetch error:", err);
//     } finally {
//       setLoading(false);
//     }
//   }, [userId]);

//   useEffect(() => {
//     if (userId) {
//       fetchContractDetails();
//     } else {
//       setLoading(false);
//     }
//   }, [userId, fetchContractDetails]);

//   const handleUpdateDetails = async () => {
//     if (!userId) {
//       Swal.fire({
//         icon: 'error',
//         title: 'Missing Information',
//         text: 'Cannot update: Employee ID is missing.',
//       });
//       return;
//     }

//     // --- CHANGE 1: Removed 'roleDescription' from the required fields check ---
//     const requiredFields = { joiningDate, departmentId, designationId, grossSalary, probation, officeShiftId };
//     for (const field in requiredFields) {
//       if (!requiredFields[field]) {
//         Swal.fire({
//           icon: 'warning',
//           title: 'Validation Error',
//           text: `Please fill out the "${field.replace(/([A-Z])/g, ' $1').trim()}" field. It is required.`,
//         });
//         return;
//       }
//     }

//     const payload = {
//       user_id: userId,
//       company_id: 2,
//       type: 1,
//       department_id: departmentId,
//       designation_id: designationId,
//       gross_salary: parseFloat(grossSalary),
//       office_shift_id: officeShiftId,
//       probation: probation,
//       role_description: roleDescription,
//       contract_date: joiningDate ? joiningDate.format('YYYY-MM-DD') : null,
//     };

//     Swal.fire({
//       title: 'Updating Details...',
//       text: 'Please wait.',
//       allowOutsideClick: false,
//       didOpen: () => {
//         Swal.showLoading();
//       },
//     });

//     try {
//       await axiosInstance.patch(`api/contract_details/`, payload);
//       Swal.fire({
//         icon: 'success',
//         title: 'Updated!',
//         text: 'Details have been updated successfully.',
//       });
//     } catch (err) {
//       const errorMessage = err.response?.data?.message || 'Failed to update details. Please check the console.';
//       console.error("Update error:", err.response ? err.response.data : err);
//       Swal.fire({
//         icon: 'error',
//         title: 'Update Failed',
//         text: errorMessage,
//       });
//     }
//   };

//   if (loading) {
//     return <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress /></Box>;
//   }

//   if (error && !joiningDate) {
//     return <Alert severity="warning">{error}</Alert>;
//   }

//   return (
//     <LocalizationProvider dateAdapter={AdapterDayjs}>
//       <Paper sx={{ p: 2 }}>
//         <Box display="flex" alignItems="center" mb={2}>
//           <Lock sx={{ color: '#8C257C', mr: 1 }} />
//           <Typography variant="h6" sx={{ color: '#8C257C' }}>Set Details</Typography>
//         </Box>

//         <Tabs
//           value={tab}
//           onChange={(e, val) => setTab(val)}
//           sx={{ mb: 2 }}
//           textColor="primary"
//           indicatorColor="primary"
//         >
//           <Tab label="Details" />
//           <Tab label="Allowances" />
//           <Tab label="Statutory Deductions" />
//           <Tab label="Reimbursements" />
//         </Tabs>

//         {tab === 0 && (
//           <Grid container spacing={3}>
//             <Grid item xs={12} sm={6}>
//               <DatePicker
//                 label="Joining Date *"
//                 value={joiningDate}
//                 onChange={(newValue) => setJoiningDate(newValue)}
//                 slots={{
//                   textField: (params) => <TextField {...params} fullWidth size="small" required />,
//                 }}
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 select
//                 label="Department *"
//                 value={departmentId}
//                 onChange={(e) => setDepartmentId(e.target.value)}
//                 fullWidth size="small" required
//               >
//                 {departmentsList.map((option) => (
//                   <MenuItem key={option.department_id} value={option.department_id}>
//                     {option.department_name}
//                   </MenuItem>
//                 ))}
//               </TextField>
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 select
//                 label="Designation *"
//                 value={designationId}
//                 onChange={(e) => setDesignationId(e.target.value)}
//                 fullWidth size="small" required
//               >
//                 {designationsList.map((option) => (
//                   <MenuItem key={option.designation_id} value={option.designation_id}>
//                     {option.designation_name}
//                   </MenuItem>
//                 ))}
//               </TextField>
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField label="Gross Salary *" type="number" value={grossSalary} onChange={(e) => setGrossSalary(e.target.value)} fullWidth size="small" required InputProps={{ startAdornment: <InputAdornment position="start"></InputAdornment> }} />
//             </Grid>

//             <Grid item xs={12} sm={6}>
//               <TextField select label="Probation *" value={probation} onChange={(e) => setProbation(e.target.value)} fullWidth size="small" required >
//                 {probationOptions.map((option) => (<MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>))}
//               </TextField>
//             </Grid>

//             <Grid item xs={12} sm={6}>
//               <TextField select label="Office Shift *" value={officeShiftId} onChange={(e) => setOfficeShiftId(e.target.value)} fullWidth size="small" required >
//                 {officeShiftsList.map((option) => (
//                   <MenuItem key={option.office_shift_id} value={option.office_shift_id}>
//                     {option.office_shift_name}
//                   </MenuItem>
//                 ))}
//               </TextField>
//             </Grid>

//             <Grid item xs={12}>
//               {/* --- CHANGE 2: Removed '*' from the label --- */}
//               <Typography variant="subtitle2" gutterBottom sx={{ color: 'text.secondary' }}>Role Description</Typography>
//               {/* --- CHANGE 3: Removed the 'required' attribute --- */}
//               <TextareaAutosize minRows={3} placeholder="Enter role description here..." value={roleDescription} onChange={(e) => setRoleDescription(e.target.value)} style={{ width: '100%', padding: '8.5px 14px', borderRadius: '4px', borderColor: 'rgba(0, 0, 0, 0.23)', fontFamily: 'inherit', fontSize: '1rem', resize: 'vertical', boxSizing: 'border-box' }} />
//             </Grid>
//             <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
//               <Button
//                 variant="contained"
//                 onClick={handleUpdateDetails}
//                 sx={{
//                   backgroundColor: '#8C257C',
//                   '&:hover': {
//                     backgroundColor: '#731e65'
//                   }
//                 }}
//               >
//                 Update Details
//               </Button>
//             </Grid>
//           </Grid>
//         )}

//         {tab === 1 && <Allowances />}
//         {tab === 2 && <StatutoryDeductions />}
//         {tab === 3 && <Reimbursements />}
//       </Paper>
//     </LocalizationProvider>
//   );
// };

// export default Detail;




  // import React, { useState, useCallback, useContext, useEffect } from 'react';
  // import { EmployeeContext } from './EmployeeContext';
  // import {
  //   Box,
  //   TextField,
  //   MenuItem,
  //   Grid,
  //   Typography,
  //   Button,
  //   InputAdornment,
  //   TextareaAutosize,
  //   Paper,
  //   Tabs,
  //   Tab,
  //   CircularProgress,
  //   Alert,
  //   Table,
  //   TableBody,
  //   TableCell,
  //   TableContainer,
  //   TableHead,
  //   TableRow,
  //   TablePagination,
  //   InputBase,
  //   IconButton,
  // } from '@mui/material';
  // import { DatePicker } from '@mui/x-date-pickers/DatePicker';
  // import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
  // import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
  // import Lock from '@mui/icons-material/Lock';
  // import SearchIcon from '@mui/icons-material/Search';
  // import dayjs from 'dayjs';
  // import Swal from 'sweetalert2';
  // import axiosInstance from '../../utils/axiosInstance';
  // import StatutoryDeductions from './StatutoryDeductions';
  // import Reimbursements from './Reimbursements';

  // // --- Reusable Standardized Table Component ---
  // const StandardizedTable = ({ columns, data, title }) => {
  //   const [page, setPage] = useState(0);
  //   const [rowsPerPage, setRowsPerPage] = useState(10);
  //   const [searchTerm, setSearchTerm] = useState('');
  //   const [filteredData, setFilteredData] = useState(data);

  //   useEffect(() => {
  //     setFilteredData(
  //       data.filter((row) =>
  //         columns.some((col) => {
  //           const value = row[col.id];
  //           return value && value.toString().toLowerCase().includes(searchTerm.toLowerCase());
  //         })
  //       )
  //     );
  //     setPage(0);
  //   }, [searchTerm, data, columns]);

  //   const handleChangePage = (event, newPage) => {
  //     setPage(newPage);
  //   };

  //   const handleChangeRowsPerPage = (event) => {
  //     setRowsPerPage(+event.target.value);
  //     setPage(0);
  //   };

  //   const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredData.length) : 0;

  //   return (
  //     <Paper sx={{ width: '100%', overflow: 'hidden', p: 2 }}>
  //       {/* --- CHANGE START: Modified the container for Title and Search Bar --- */}
  //       <Box sx={{ mb: 2 }}>
  //         <Typography variant="h6" component="div">
  //           {title}
  //         </Typography>
  //         <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%', mt: 1 }}>
  //           <Paper
  //             component="form"
  //             onSubmit={(e) => e.preventDefault()}
  //             sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 300 }}
  //           >
  //             <InputBase
  //               sx={{ ml: 1, flex: 1 }}
  //               placeholder="Search..."
  //               value={searchTerm}
  //               onChange={(e) => setSearchTerm(e.target.value)}
  //             />
  //             <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
  //               <SearchIcon />
  //             </IconButton>
  //           </Paper>
  //         </Box>
  //       </Box>
  //       {/* --- CHANGE END --- */}
  //       <TableContainer sx={{ maxHeight: 440 }}>
  //         <Table stickyHeader aria-label="sticky table">
  //           <TableHead>
  //             <TableRow>
  //               {columns.map((column) => (
  //                 <TableCell
  //                   key={column.id}
  //                   align={column.align || 'left'}
  //                   style={{ minWidth: column.minWidth }}
  //                   sx={{
  //                     backgroundColor: '#8C257C',
  //                     color: 'white',
  //                     fontWeight: 'bold',
  //                   }}
  //                 >
  //                   {column.label}
  //                 </TableCell>
  //               ))}
  //             </TableRow>
  //           </TableHead>
  //           <TableBody>
  //             {filteredData
  //               .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
  //               .map((row) => {
  //                 return (
  //                   <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
  //                     {columns.map((column) => {
  //                       const value = row[column.id];
  //                       return (
  //                         <TableCell key={column.id} align={column.align}>
  //                           {column.format && typeof value === 'number'
  //                             ? column.format(value)
  //                             : value}
  //                         </TableCell>
  //                       );
  //                     })}
  //                   </TableRow>
  //                 );
  //               })}
  //             {emptyRows > 0 && (
  //               <TableRow style={{ height: 53 * emptyRows }}>
  //                 <TableCell colSpan={columns.length} />
  //               </TableRow>
  //             )}
  //           </TableBody>
  //         </Table>
  //       </TableContainer>
  //       <Box sx={{
  //         display: 'flex',
  //         justifyContent: 'space-between',
  //         alignItems: 'center',
  //         pt: 2
  //       }}>
  //         <Typography variant="body2" color="text.secondary">
  //           Total Rows: {filteredData.length}
  //         </Typography>
  //         <TablePagination
  //           rowsPerPageOptions={[10, 25, 100]}
  //           component="div"
  //           count={filteredData.length}
  //           rowsPerPage={rowsPerPage}
  //           page={page}
  //           onPageChange={handleChangePage}
  //           onRowsPerPageChange={handleChangeRowsPerPage}
  //         />
  //       </Box>
  //     </Paper>
  //   );
  // };

  // // --- Allowances Component ---
  // const Allowances = () => {
  //   const [allowances, setAllowances] = useState([]);
  //   const [loading, setLoading] = useState(true);
  //   const { employeeId } = useContext(EmployeeContext);

  //   useEffect(() => {
  //     const mockData = [
  //       { id: 1, type: 'House Rent Allowance', amount: 15000, is_taxable: 'Yes' },
  //       { id: 2, type: 'Travel Allowance', amount: 5000, is_taxable: 'No' },
  //       { id: 3, type: 'Medical Allowance', amount: 2500, is_taxable: 'Yes' },
  //     ];
  //     setAllowances(mockData);
  //     setLoading(false);
  //   }, [employeeId]);

  //   const columns = [
  //     { id: 'type', label: 'Allowance Type', minWidth: 170 },
  //     { id: 'amount', label: 'Amount (INR)', minWidth: 100, align: 'right', format: (value) => value.toLocaleString('en-IN') },
  //     { id: 'is_taxable', label: 'Is Taxable', minWidth: 100 },
  //   ];

  //   if (loading) {
  //     return <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress /></Box>;
  //   }

  //   return <StandardizedTable columns={columns} data={allowances} title="Employee Allowances" />;
  // };

  // const probationOptions = [{ value: 'Y', label: 'Yes' }, { value: 'N', label: 'No' }];

  // const Detail = () => {
  //   const [tab, setTab] = useState(0);
  //   const [loading, setLoading] = useState(true);
  //   const [error, setError] = useState(null);

  //   const [joiningDate, setJoiningDate] = useState(null);
  //   const [departmentId, setDepartmentId] = useState('');
  //   const [designationId, setDesignationId] = useState('');
  //   const [grossSalary, setGrossSalary] = useState('0.00');
  //   const [probation, setProbation] = useState('');
  //   const [officeShiftId, setOfficeShiftId] = useState('');
  //   const [roleDescription, setRoleDescription] = useState('');

  //   const [departmentsList, setDepartmentsList] = useState([]);
  //   const [designationsList, setDesignationsList] = useState([]);
  //   const [officeShiftsList, setOfficeShiftsList] = useState([]);

  //   const { employeeId } = useContext(EmployeeContext);
  //   const userId = employeeId;

  //   useEffect(() => {
  //     const fetchDropdownData = async () => {
  //       try {
  //         const [deptRes, desigRes, shiftRes] = await Promise.all([
  //           axiosInstance.get('api/departments/dropdown/'),
  //           axiosInstance.get('api/designations/dropdown/'),
  //           axiosInstance.get('api/office_shift_dropdown/'),
  //         ]);

  //         if (deptRes.data && deptRes.data.status === true) {
  //           setDepartmentsList(deptRes.data.data || []);
  //         }
  //         if (desigRes.data && desigRes.data.status === true) {
  //           setDesignationsList(desigRes.data.data || []);
  //         }
  //         if (shiftRes.data && shiftRes.data.status === 'success') {
  //           setOfficeShiftsList(shiftRes.data.office_shift_data || []);
  //         }
  //       } catch (err) {
  //         console.error("Failed to fetch dropdown data", err);
  //         setError("Failed to load required form options.");
  //       }
  //     };

  //     fetchDropdownData();
  //   }, []);

  //   const fetchContractDetails = useCallback(async () => {
  //     setLoading(true);
  //     setError(null);
  //     try {
  //       const response = await axiosInstance.post('api/contract_details/', {
  //         user_id: userId,
  //         type: 1,
  //       });

  //       if (response.data && response.data.contract_details && response.data.contract_details.length > 0) {
  //         const details = response.data.contract_details[0];

  //         setJoiningDate(details.contract_date ? dayjs(details.contract_date, 'YYYY-MM-DD') : null);
  //         setDepartmentId(details.department_id || '');
  //         setDesignationId(details.designation_id || '');
  //         setGrossSalary(details.gross_salary || '0.00');
  //         setOfficeShiftId(details.office_shift_id || '');
  //         setProbation(details.probation?.toLowerCase() === 'y' ? 'Y' : 'N');
  //         setRoleDescription(details.role_description || '');
  //       } else {
  //         setJoiningDate(null);
  //         setDepartmentId('');
  //         setDesignationId('');
  //         setGrossSalary('0.00');
  //         setOfficeShiftId('');
  //         setProbation('');
  //         setRoleDescription('');
  //         setError("No contract details found for this user. You can create a new one.");
  //       }
  //     } catch (err) {
  //       setError(err.message || "An error occurred while fetching contract details.");
  //       console.error("Fetch error:", err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }, [userId]);

  //   useEffect(() => {
  //     if (userId) {
  //       fetchContractDetails();
  //     } else {
  //       setLoading(false);
  //     }
  //   }, [userId, fetchContractDetails]);

  //   const handleUpdateDetails = async () => {
  //     if (!userId) {
  //       Swal.fire({
  //         icon: 'error',
  //         title: 'Missing Information',
  //         text: 'Cannot update: Employee ID is missing.',
  //       });
  //       return;
  //     }

  //     const requiredFields = { joiningDate, departmentId, designationId, grossSalary, probation, officeShiftId };
  //     for (const field in requiredFields) {
  //       if (!requiredFields[field]) {
  //         Swal.fire({
  //           icon: 'warning',
  //           title: 'Validation Error',
  //           text: `Please fill out the "${field.replace(/([A-Z])/g, ' $1').trim()}" field. It is required.`,
  //         });
  //         return;
  //       }
  //     }

  //     const payload = {
  //       user_id: userId,
  //       company_id: 2,
  //       type: 1,
  //       department_id: departmentId,
  //       designation_id: designationId,
  //       gross_salary: parseFloat(grossSalary),
  //       office_shift_id: officeShiftId,
  //       probation: probation,
  //       role_description: roleDescription,
  //       contract_date: joiningDate ? joiningDate.format('YYYY-MM-DD') : null,
  //     };

  //     Swal.fire({
  //       title: 'Updating Details...',
  //       text: 'Please wait.',
  //       allowOutsideClick: false,
  //       didOpen: () => {
  //         Swal.showLoading();
  //       },
  //     });

  //     try {
  //       await axiosInstance.patch(`api/contract_details/`, payload);
  //       Swal.fire({
  //         icon: 'success',
  //         title: 'Updated!',
  //         text: 'Details have been updated successfully.',
  //       });
  //     } catch (err) {
  //       const errorMessage = err.response?.data?.message || 'Failed to update details. Please check the console.';
  //       console.error("Update error:", err.response ? err.response.data : err);
  //       Swal.fire({
  //         icon: 'error',
  //         title: 'Update Failed',
  //         text: errorMessage,
  //       });
  //     }
  //   };

  //   if (loading) {
  //     return <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress /></Box>;
  //   }

  //   if (error && !joiningDate) {
  //     return <Alert severity="warning">{error}</Alert>;
  //   }

  //   return (
  //     <LocalizationProvider dateAdapter={AdapterDayjs}>
  //       <Paper sx={{ p: 2 }}>
  //         <Box display="flex" alignItems="center" mb={2}>
  //           <Lock sx={{ color: '#8C257C', mr: 1 }} />
  //           <Typography variant="h6" sx={{ color: '#8C257C' }}>Set Details</Typography>
  //         </Box>

  //         <Tabs
  //           value={tab}
  //           onChange={(e, val) => setTab(val)}
  //           sx={{ mb: 2 }}
  //           textColor="primary"
  //           indicatorColor="primary"
  //         >
  //           <Tab label="Details" />
  //           <Tab label="Allowances" />
  //           <Tab label="Statutory Deductions" />
  //           <Tab label="Reimbursements" />
  //         </Tabs>

  //         {tab === 0 && (
  //           <Grid container spacing={3}>
  //             <Grid item xs={12} sm={6}>
  //               <DatePicker
  //                 label="Joining Date *"
  //                 value={joiningDate}
  //                 onChange={(newValue) => setJoiningDate(newValue)}
  //                 slots={{
  //                   textField: (params) => <TextField {...params} fullWidth size="small" required />,
  //                 }}
  //               />
  //             </Grid>
  //             <Grid item xs={12} sm={6}>
  //               <TextField
  //                 select
  //                 label="Department *"
  //                 value={departmentId}
  //                 onChange={(e) => setDepartmentId(e.target.value)}
  //                 fullWidth size="small" required
  //               >
  //                 {departmentsList.map((option) => (
  //                   <MenuItem key={option.department_id} value={option.department_id}>
  //                     {option.department_name}
  //                   </MenuItem>
  //                 ))}
  //               </TextField>
  //             </Grid>
  //             <Grid item xs={12} sm={6}>
  //               <TextField
  //                 select
  //                 label="Designation *"
  //                 value={designationId}
  //                 onChange={(e) => setDesignationId(e.target.value)}
  //                 fullWidth size="small" required
  //               >
  //                 {designationsList.map((option) => (
  //                   <MenuItem key={option.designation_id} value={option.designation_id}>
  //                     {option.designation_name}
  //                   </MenuItem>
  //                 ))}
  //               </TextField>
  //             </Grid>
  //             <Grid item xs={12} sm={6}>
  //               <TextField label="Gross Salary *" type="number" value={grossSalary} onChange={(e) => setGrossSalary(e.target.value)} fullWidth size="small" required InputProps={{ startAdornment: <InputAdornment position="start">INR</InputAdornment> }} />
  //             </Grid>

  //             <Grid item xs={12} sm={6}>
  //               <TextField select label="Probation *" value={probation} onChange={(e) => setProbation(e.target.value)} fullWidth size="small" required >
  //                 {probationOptions.map((option) => (<MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>))}
  //               </TextField>
  //             </Grid>

  //             <Grid item xs={12} sm={6}>
  //               <TextField select label="Office Shift *" value={officeShiftId} onChange={(e) => setOfficeShiftId(e.target.value)} fullWidth size="small" required >
  //                 {officeShiftsList.map((option) => (
  //                   <MenuItem key={option.office_shift_id} value={option.office_shift_id}>
  //                     {option.office_shift_name}
  //                   </MenuItem>
  //                 ))}
  //               </TextField>
  //             </Grid>

  //             <Grid item xs={12}>
  //               <Typography variant="subtitle2" gutterBottom sx={{ color: 'text.secondary' }}>Role Description</Typography>
  //               <TextareaAutosize minRows={3} placeholder="Enter role description here..." value={roleDescription} onChange={(e) => setRoleDescription(e.target.value)} style={{ width: '100%', padding: '8.5px 14px', borderRadius: '4px', borderColor: 'rgba(0, 0, 0, 0.23)', fontFamily: 'inherit', fontSize: '1rem', resize: 'vertical', boxSizing: 'border-box' }} />
  //             </Grid>
  //             <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
  //               <Button
  //                 variant="contained"
  //                 onClick={handleUpdateDetails}
  //                 sx={{
  //                   backgroundColor: '#8C257C',
  //                   '&:hover': {
  //                     backgroundColor: '#731e65'
  //                   }
  //                 }}
  //               >
  //                 Update Details
  //               </Button>
  //             </Grid>
  //           </Grid>
  //         )}

  //         {tab === 1 && <Allowances />}
  //         {tab === 2 && <StatutoryDeductions />}
  //         {tab === 3 && <Reimbursements />}
  //       </Paper>
  //     </LocalizationProvider>
  //   );
  // };

  // export default Detail;











//   import React, { useState, useCallback, useContext, useEffect } from 'react';
// import { EmployeeContext } from './EmployeeContext';
// import {
//   Box,
//   TextField,
//   MenuItem,
//   Grid,
//   Typography,
//   Button,
//   InputAdornment,
//   TextareaAutosize,
//   Paper,
//   Tabs,
//   Tab,
//   CircularProgress,
//   Alert,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TablePagination,
//   InputBase,
//   IconButton,
//   FormControl,
//   InputLabel,
//   Select,
// } from '@mui/material';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import Lock from '@mui/icons-material/Lock';
// import SearchIcon from '@mui/icons-material/Search';
// import { Edit, Delete } from '@mui/icons-material';
// import dayjs from 'dayjs';
// import Swal from 'sweetalert2';
// import axiosInstance from '../../utils/axiosInstance';
// import StatutoryDeductions from './StatutoryDeductions';
// import Reimbursements from './Reimbursements';

// const StandardizedTable = ({ columns, data, title }) => {
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filteredData, setFilteredData] = useState(data);

//   useEffect(() => {
//     setFilteredData(
//       data.filter((row) =>
//         columns.some((col) => {
//           const value = row[col.id];
//           return value && value.toString().toLowerCase().includes(searchTerm.toLowerCase());
//         })
//       )
//     );
//     setPage(0);
//   }, [searchTerm, data, columns]);

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(+event.target.value);
//     setPage(0);
//   };

//   const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredData.length) : 0;

//   return (
//     <Paper sx={{ width: '100%', overflow: 'hidden', p: 2 }}>
//       <Box sx={{ mb: 2 }}>
//         <Typography variant="h6" component="div">
//           {title}
//         </Typography>
//         <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%', mt: 1 }}>
//           <Paper
//             component="form"
//             onSubmit={(e) => e.preventDefault()}
//             sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 300 }}
//           >
//             <InputBase
//               sx={{ ml: 1, flex: 1 }}
//               placeholder="Search..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//             <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
//               <SearchIcon />
//             </IconButton>
//           </Paper>
//         </Box>
//       </Box>
//       <TableContainer sx={{ maxHeight: 440 }}>
//         <Table stickyHeader aria-label="sticky table">
//           <TableHead>
//             <TableRow>
//               {columns.map((column) => (
//                 <TableCell
//                   key={column.id}
//                   align={column.align || 'left'}
//                   style={{ minWidth: column.minWidth }}
//                   sx={{
//                     backgroundColor: '#8C257C',
//                     color: 'white',
//                     fontWeight: 'bold',
//                   }}
//                 >
//                   {column.label}
//                 </TableCell>
//               ))}
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {filteredData
//               .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//               .map((row) => {
//                 return (
//                   <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
//                     {columns.map((column) => {
//                       const value = row[column.id];
//                       return (
//                         <TableCell key={column.id} align={column.align}>
//                           {column.format && typeof value === 'number'
//                             ? column.format(value)
//                             : value}
//                         </TableCell>
//                       );
//                     })}
//                   </TableRow>
//                 );
//               })}
//             {emptyRows > 0 && (
//               <TableRow style={{ height: 53 * emptyRows }}>
//                 <TableCell colSpan={columns.length} />
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </TableContainer>
//       <Box sx={{
//         display: 'flex',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         pt: 2
//       }}>
//         <Typography variant="body2" color="text.secondary">
//           Total Rows: {filteredData.length}
//         </Typography>
//         <TablePagination
//           rowsPerPageOptions={[10, 25, 100]}
//           component="div"
//           count={filteredData.length}
//           rowsPerPage={rowsPerPage}
//           page={page}
//           onPageChange={handleChangePage}
//           onRowsPerPageChange={handleChangeRowsPerPage}
//         />
//       </Box>
//     </Paper>
//   );
// };

// const Allowances = () => {
//   const { employeeId } = useContext(EmployeeContext);

//   const [formData, setFormData] = useState({
//     title: '',
//     amount: '',
//     allowance_option: '',
//     amount_option: '',
//   });

//   const [allowances, setAllowances] = useState([]);
//   const [editingId, setEditingId] = useState(null);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [searchTerm, setSearchTerm] = useState('');

//   const fetchAllowances = useCallback(async () => {
//     try {
//       const res = await axiosInstance.post('/api/contract_details/', {
//         user_id: employeeId,
//         type: 2,
//       });

//       const details = res.data.contract_details;
//       setAllowances(Array.isArray(details) ? details : []);
//     } catch (error) {
//       console.error('Error fetching allowances:', error);
//       Swal.fire({
//         icon: 'error',
//         title: 'Fetch Error',
//         text: 'Could not load allowances. Please try refreshing the page.'
//       });
//       setAllowances([]);
//     }
//   }, [employeeId]);

//   useEffect(() => {
//     if (employeeId) fetchAllowances();
//   }, [employeeId, fetchAllowances]);


//   const handleSave = async () => {
//     if (!formData.title || !formData.amount || !formData.allowance_option || !formData.amount_option) {
//       Swal.fire({
//         icon: 'warning',
//         title: 'Missing Fields',
//         text: 'Please fill out all the required fields before saving.',
//       });
//       return;
//     }

//     const payload = {
//       user_id: employeeId,
//       type: 2,
//       pay_title: formData.title,
//       pay_amount: formData.amount,
//       is_taxable: formData.allowance_option,
//       is_fixed: formData.amount_option,
//       salary_month: '01'
//     };

//     const action = editingId !== null ? 'Updating' : 'Saving';

//     Swal.fire({
//       title: `${action} Allowance...`,
//       text: 'Please wait.',
//       allowOutsideClick: false,
//       didOpen: () => {
//         Swal.showLoading();
//       },
//     });

//     if (editingId !== null) {
//       payload.pay_id = editingId;
//     }

//     try {
//       await axiosInstance.patch('/api/contract_details/', payload);
//       await fetchAllowances();

//       Swal.fire({
//         icon: 'success',
//         title: 'Success!',
//         text: `Allowance has been ${editingId !== null ? 'updated' : 'saved'} successfully.`,
//       });

//       setFormData({ title: '', amount: '', allowance_option: '', amount_option: '' });
//       setEditingId(null);
//     } catch (error) {
//       console.error('Error saving record:', error);
//       const errorMessage = error.response?.data?.message || 'An unexpected error occurred.';
//       Swal.fire({
//         icon: 'error',
//         title: 'Operation Failed',
//         text: errorMessage,
//       });
//     }
//   };

//   const handleEdit = (row) => {
//     setFormData({
//       title: row.title,
//       amount: row.amount,
//       allowance_option: row.allowance_option,
//       amount_option: row.amount_option !== null ? row.amount_option.toString() : '',
//     });
//     setEditingId(row.id);
//   };

//   const handleDelete = async (id) => {
//     Swal.fire({
//       title: 'Are you sure?',
//       text: "You won't be able to revert this!",
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#3085d6',
//       cancelButtonColor: '#d33',
//       confirmButtonText: 'Yes, delete it!'
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         try {
//           await axiosInstance.delete('/api/contract_details/', {
//             data: { pay_id: id, type: 2 },
//           });
//           await fetchAllowances();
//           Swal.fire(
//             'Deleted!',
//             'The allowance has been deleted.',
//             'success'
//           );
//         } catch (error) {
//           console.error('Error deleting record:', error);
//           const errorMessage = error.response?.data?.message || 'Failed to delete the record.';
//           Swal.fire(
//             'Error!',
//             errorMessage,
//             'error'
//           );
//         }
//       }
//     });
//   };


//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleRowsPerPageChange = (e) => {
//     setRowsPerPage(parseInt(e.target.value));
//     setCurrentPage(1);
//   };

//   const handlePageChange = (newPage) => {
//     if (newPage > 0 && newPage <= Math.ceil(filteredAllowances.length / rowsPerPage)) {
//       setCurrentPage(newPage);
//     }
//   };

//   const filteredAllowances = allowances.filter(row =>
//     row.title.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const pageCount = Math.ceil(filteredAllowances.length / rowsPerPage);
//   const currentRows = filteredAllowances.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

//   const tableHeaderStyles = {
//     color: 'white',
//     fontWeight: 'bold',
//     // borderRight: '1px solid rgba(224, 224, 224, 0.2)',
//     // '&:last-child': {
//     //   borderRight: 0,
//     // }
//   };

//   return (
//     <Box sx={{ p: 3 }}>
//       <Typography variant="h6" gutterBottom>List All Allowances</Typography>

//       <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
//         <FormControl size="small" sx={{ minWidth: 80 }}>
//           <InputLabel sx={{ fontSize: '0.8rem' }}>Rows</InputLabel>
//           <Select
//             value={rowsPerPage}
//             label="Rows"
//             onChange={handleRowsPerPageChange}
//             sx={{ fontSize: '0.8rem', height: '35px' }}
//           >
//             {[10, 25, 50, 100].map(num => (
//               <MenuItem key={num} value={num} sx={{ fontSize: '0.8rem' }}>{num}</MenuItem>
//             ))}
//           </Select>
//         </FormControl>

//         <TextField
//           size="small"
//           placeholder="Search by Title..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           sx={{ width: 220, '& .MuiInputBase-input': { fontSize: '0.8rem', height: '1.2em' } }}
//         />
//       </Box>

//       {employeeId && (
//         <TableContainer component={Paper} sx={{ mb: 2 }}>
//           <Table>
//             <TableHead>
//               <TableRow sx={{ backgroundColor: '#8C257C' }}>
//                 <TableCell sx={tableHeaderStyles}>SR. NO.</TableCell>
//                 <TableCell sx={tableHeaderStyles}>TITLE</TableCell>
//                 <TableCell sx={tableHeaderStyles}>AMOUNT</TableCell>
//                 <TableCell sx={tableHeaderStyles}>ALLOWANCE OPTION</TableCell>
//                 <TableCell sx={tableHeaderStyles}>AMOUNT OPTION</TableCell>
//                 <TableCell align="right" sx={tableHeaderStyles}>ACTIONS</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {currentRows.length === 0 ? (
//                 <TableRow><TableCell colSpan={6} align="center">No records found</TableCell></TableRow>
//               ) : (
//                 currentRows.map((row, index) => (
//                     <TableRow key={row.id} hover>
//                       <TableCell>{(currentPage - 1) * rowsPerPage + index + 1}</TableCell>
//                       <TableCell>{row.title}</TableCell>
//                       <TableCell>{row.amount}</TableCell>
//                       <TableCell>{row.allowance_option}</TableCell>
//                       <TableCell>{row.amount_option === 0 ? 'Fixed' : 'Percentage'}</TableCell>
//                       <TableCell align="right">
//                           <IconButton size="small" sx={{ color: '#8C257C' }} onClick={() => handleEdit(row)}>
//                             <Edit fontSize="small" />
//                           </IconButton>
//                           <IconButton size="small" color="error" onClick={() => handleDelete(row.id)}>
//                             <Delete fontSize="small" />
//                           </IconButton>
//                       </TableCell>
//                     </TableRow>
//                   ))
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       )}

//       <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
//         <Typography variant="body2" color="text.secondary">
//             Total Rows: {filteredAllowances.length}
//         </Typography>

//         <Box display="flex" alignItems="center" gap={1}>
//           <Button
//             variant="outlined"
//             size="small"
//             sx={{ fontSize: '0.7rem', minWidth: '70px', py: 0.5 }}
//             onClick={() => handlePageChange(currentPage - 1)}
//             disabled={currentPage === 1}
//           >
//             Previous
//           </Button>

//           <Typography sx={{ fontSize: '0.75rem', minWidth: '100px', textAlign: 'center' }}>
//             Page {currentPage} of {pageCount || 1}
//           </Typography>

//           <Button
//             variant="outlined"
//             size="small"
//             sx={{ fontSize: '0.7rem', minWidth: '70px', py: 0.5 }}
//             onClick={() => handlePageChange(currentPage + 1)}
//             disabled={currentPage === pageCount || pageCount === 0}
//           >
//             Next
//           </Button>
//         </Box>
//       </Box>

//       <Grid container spacing={2} mt={3}>
//         <Grid item xs={12} sm={6}>
//           <FormControl fullWidth size="small" required>
//             <InputLabel>Allowance Option</InputLabel>
//             <Select
//               name="allowance_option"
//               value={formData.allowance_option ?? ''}
//               label="Allowance Option"
//               onChange={handleChange}
//             >
//               <MenuItem value="Non Taxable">Non Taxable</MenuItem>
//               <MenuItem value="Fully">Fully Taxable</MenuItem>
//               <MenuItem value="Partial">Partially Taxable</MenuItem>
//             </Select>
//           </FormControl>
//         </Grid>

//         <Grid item xs={12} sm={6}>
//           <FormControl fullWidth size="small" required>
//             <InputLabel>Amount Option</InputLabel>
//             <Select
//               name="amount_option"
//               value={formData.amount_option ?? ''}
//               label="Amount Option"
//               onChange={handleChange}
//             >
//               <MenuItem value="0">Fixed</MenuItem>
//               <MenuItem value="1">Percentage</MenuItem>
//             </Select>
//           </FormControl>
//         </Grid>

//         <Grid item xs={12} sm={6}>
//           <TextField
//             fullWidth
//             size="small"
//             label="Title"
//             name="title"
//             value={formData.title}
//             onChange={handleChange}
//             required
//           />
//         </Grid>

//         <Grid item xs={12} sm={6}>
//           <Box display="flex" alignItems="center">
//             <Typography sx={{ mr: 1 }}>INR</Typography>
//             <TextField
//               fullWidth
//               size="small"
//               label="Amount"
//               name="amount"
//               type="number"
//               value={formData.amount}
//               onChange={handleChange}
//               required
//             />
//           </Box>
//         </Grid>

//         <Grid item xs={12}>
//           <Box display="flex" justifyContent="flex-end">
//             <Button
//               variant="contained"
//               sx={{
//                 textTransform: 'none',
//                 px: 4,
//                 backgroundColor: '#8C257C',
//                 '&:hover': {
//                   backgroundColor: '#6d1b60'
//                 }
//               }}
//               onClick={handleSave}
//             >
//               {editingId !== null ? 'Update' : 'Save'}
//             </Button>
//           </Box>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// const probationOptions = [{ value: 'Y', label: 'Yes' }, { value: 'N', label: 'No' }];

// const Detail = () => {
//   const [tab, setTab] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const [joiningDate, setJoiningDate] = useState(null);
//   const [departmentId, setDepartmentId] = useState('');
//   const [designationId, setDesignationId] = useState('');
//   const [grossSalary, setGrossSalary] = useState('0.00');
//   const [probation, setProbation] = useState('');
//   const [officeShiftId, setOfficeShiftId] = useState('');
//   const [roleDescription, setRoleDescription] = useState('');

//   const [departmentsList, setDepartmentsList] = useState([]);
//   const [designationsList, setDesignationsList] = useState([]);
//   const [officeShiftsList, setOfficeShiftsList] = useState([]);

//   const { employeeId } = useContext(EmployeeContext);
//   const userId = employeeId;

//   useEffect(() => {
//     const fetchDropdownData = async () => {
//       try {
//         const [deptRes, desigRes, shiftRes] = await Promise.all([
//           axiosInstance.get('api/departments/dropdown/'),
//           axiosInstance.get('api/designations/dropdown/'),
//           axiosInstance.get('api/office_shift_dropdown/'),
//         ]);

//         if (deptRes.data && deptRes.data.status === true) {
//           setDepartmentsList(deptRes.data.data || []);
//         }
//         if (desigRes.data && desigRes.data.status === true) {
//           setDesignationsList(desigRes.data.data || []);
//         }
//         if (shiftRes.data && shiftRes.data.status === 'success') {
//           setOfficeShiftsList(shiftRes.data.office_shift_data || []);
//         }
//       } catch (err) {
//         console.error("Failed to fetch dropdown data", err);
//         setError("Failed to load required form options.");
//       }
//     };

//     fetchDropdownData();
//   }, []);

//   const fetchContractDetails = useCallback(async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await axiosInstance.post('api/contract_details/', {
//         user_id: userId,
//         type: 1,
//       });

//       if (response.data && response.data.contract_details && response.data.contract_details.length > 0) {
//         const details = response.data.contract_details[0];

//         setJoiningDate(details.contract_date ? dayjs(details.contract_date, 'YYYY-MM-DD') : null);
//         setDepartmentId(details.department_id || '');
//         setDesignationId(details.designation_id || '');
//         setGrossSalary(details.gross_salary || '0.00');
//         setOfficeShiftId(details.office_shift_id || '');
//         setProbation(details.probation?.toLowerCase() === 'y' ? 'Y' : 'N');
//         setRoleDescription(details.role_description || '');
//       } else {
//         setJoiningDate(null);
//         setDepartmentId('');
//         setDesignationId('');
//         setGrossSalary('0.00');
//         setOfficeShiftId('');
//         setProbation('');
//         setRoleDescription('');
//         setError("No contract details found for this user. You can create a new one.");
//       }
//     } catch (err) {
//       setError(err.message || "An error occurred while fetching contract details.");
//       console.error("Fetch error:", err);
//     } finally {
//       setLoading(false);
//     }
//   }, [userId]);

//   useEffect(() => {
//     if (userId) {
//       fetchContractDetails();
//     } else {
//       setLoading(false);
//     }
//   }, [userId, fetchContractDetails]);

//   const handleUpdateDetails = async () => {
//     if (!userId) {
//       Swal.fire({
//         icon: 'error',
//         title: 'Missing Information',
//         text: 'Cannot update: Employee ID is missing.',
//       });
//       return;
//     }

//     const requiredFields = { joiningDate, departmentId, designationId, grossSalary, probation, officeShiftId };
//     for (const field in requiredFields) {
//       if (!requiredFields[field]) {
//         Swal.fire({
//           icon: 'warning',
//           title: 'Validation Error',
//           text: `Please fill out the "${field.replace(/([A-Z])/g, ' $1').trim()}" field. It is required.`,
//         });
//         return;
//       }
//     }

//     const payload = {
//       user_id: userId,
//       company_id: 2,
//       type: 1,
//       department_id: departmentId,
//       designation_id: designationId,
//       gross_salary: parseFloat(grossSalary),
//       office_shift_id: officeShiftId,
//       probation: probation,
//       role_description: roleDescription,
//       contract_date: joiningDate ? joiningDate.format('YYYY-MM-DD') : null,
//     };

//     Swal.fire({
//       title: 'Updating Details...',
//       text: 'Please wait.',
//       allowOutsideClick: false,
//       didOpen: () => {
//         Swal.showLoading();
//       },
//     });

//     try {
//       await axiosInstance.patch(`api/contract_details/`, payload);
//       Swal.fire({
//         icon: 'success',
//         title: 'Updated!',
//         text: 'Details have been updated successfully.',
//       });
//     } catch (err) {
//       const errorMessage = err.response?.data?.message || 'Failed to update details. Please check the console.';
//       console.error("Update error:", err.response ? err.response.data : err);
//       Swal.fire({
//         icon: 'error',
//         title: 'Update Failed',
//         text: errorMessage,
//       });
//     }
//   };

//   if (loading) {
//     return <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress /></Box>;
//   }

//   if (error && !joiningDate) {
//     return <Alert severity="warning">{error}</Alert>;
//   }

//   return (
//     <LocalizationProvider dateAdapter={AdapterDayjs}>
//       <Paper sx={{ p: 2 }}>
//         <Box display="flex" alignItems="center" mb={2}>
//           <Lock sx={{ color: '#8C257C', mr: 1 }} />
//           <Typography variant="h6" sx={{ color: '#8C257C' }}>Set Details</Typography>
//         </Box>

//         <Tabs
//           value={tab}
//           onChange={(e, val) => setTab(val)}
//           sx={{ mb: 2 }}
//           textColor="primary"
//           indicatorColor="primary"
//         >
//           <Tab label="Details" />
//           <Tab label="Allowances" />
//           <Tab label="Statutory Deductions" />
//           <Tab label="Reimbursements" />
//         </Tabs>

//         {tab === 0 && (
//           <Grid container spacing={3}>
//             <Grid item xs={12} sm={6}>
//               <DatePicker
//                 label="Joining Date *"
//                 value={joiningDate}
//                 onChange={(newValue) => setJoiningDate(newValue)}
//                 slots={{
//                   textField: (params) => <TextField {...params} fullWidth size="small" required />,
//                 }}
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 select
//                 label="Department *"
//                 value={departmentId}
//                 onChange={(e) => setDepartmentId(e.target.value)}
//                 fullWidth size="small" required
//               >
//                 {departmentsList.map((option) => (
//                   <MenuItem key={option.department_id} value={option.department_id}>
//                     {option.department_name}
//                   </MenuItem>
//                 ))}
//               </TextField>
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 select
//                 label="Designation *"
//                 value={designationId}
//                 onChange={(e) => setDesignationId(e.target.value)}
//                 fullWidth size="small" required
//               >
//                 {designationsList.map((option) => (
//                   <MenuItem key={option.designation_id} value={option.designation_id}>
//                     {option.designation_name}
//                   </MenuItem>
//                 ))}
//               </TextField>
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField label="Gross Salary *" type="number" value={grossSalary} onChange={(e) => setGrossSalary(e.target.value)} fullWidth size="small" required InputProps={{ startAdornment: <InputAdornment position="start">INR</InputAdornment> }} />
//             </Grid>

//             <Grid item xs={12} sm={6}>
//               <TextField select label="Probation *" value={probation} onChange={(e) => setProbation(e.target.value)} fullWidth size="small" required >
//                 {probationOptions.map((option) => (<MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>))}
//               </TextField>
//             </Grid>

//             <Grid item xs={12} sm={6}>
//               <TextField select label="Office Shift *" value={officeShiftId} onChange={(e) => setOfficeShiftId(e.target.value)} fullWidth size="small" required >
//                 {officeShiftsList.map((option) => (
//                   <MenuItem key={option.office_shift_id} value={option.office_shift_id}>
//                     {option.office_shift_name}
//                   </MenuItem>
//                 ))}
//               </TextField>
//             </Grid>

//             <Grid item xs={12}>
//               <Typography variant="subtitle2" gutterBottom sx={{ color: 'text.secondary' }}>Role Description</Typography>
//               <TextareaAutosize minRows={3} placeholder="Enter role description here..." value={roleDescription} onChange={(e) => setRoleDescription(e.target.value)} style={{ width: '100%', padding: '8.5px 14px', borderRadius: '4px', borderColor: 'rgba(0, 0, 0, 0.23)', fontFamily: 'inherit', fontSize: '1rem', resize: 'vertical', boxSizing: 'border-box' }} />
//             </Grid>
//             <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
//               <Button
//                 variant="contained"
//                 onClick={handleUpdateDetails}
//                 sx={{
//                   backgroundColor: '#8C257C',
//                   '&:hover': {
//                     backgroundColor: '#731e65'
//                   }
//                 }}
//               >
//                 Update Details
//               </Button>
//             </Grid>
//           </Grid>
//         )}

//         {tab === 1 && <Allowances />}
//         {tab === 2 && <StatutoryDeductions />}
//         {tab === 3 && <Reimbursements />}
//       </Paper>
//     </LocalizationProvider>
//   );
// };

// export default Detail;




import React, { useState, useCallback, useContext, useEffect } from 'react';
import { EmployeeContext } from './EmployeeContext';
import {
  Box,
  TextField,
  MenuItem,
  Grid,
  Typography,
  Button,
  InputAdornment,
  TextareaAutosize,
  Paper,
  Tabs,
  Tab,
  CircularProgress,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  InputBase,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  Pagination,
  Skeleton,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Lock from '@mui/icons-material/Lock';
import SearchIcon from '@mui/icons-material/Search';
import { Edit, Delete } from '@mui/icons-material';
import dayjs from 'dayjs';
import Swal from 'sweetalert2';
import axiosInstance from '../../utils/axiosInstance';
import StatutoryDeductions from './StatutoryDeductions';
import Reimbursements from './Reimbursements';

const PRIMARY_COLOR = "#8C257C";
const PRIMARY_DARK_COLOR = "#6d1d60";
const SECONDARY_COLOR = "#F58E35";

const StandardizedTable = ({ columns, data, title }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    setFilteredData(
      data.filter((row) =>
        columns.some((col) => {
          const value = row[col.id];
          return value && value.toString().toLowerCase().includes(searchTerm.toLowerCase());
        })
      )
    );
    setPage(0);
  }, [searchTerm, data, columns]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredData.length) : 0;

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', p: 2 }}>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h6" component="div">
          {title}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%', mt: 1 }}>
          <Paper
            component="form"
            onSubmit={(e) => e.preventDefault()}
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 300 }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>
        </Box>
      </Box>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align || 'left'}
                  style={{ minWidth: column.minWidth }}
                  sx={{
                    backgroundColor: PRIMARY_COLOR,
                    color: 'white',
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={columns.length} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        pt: 2
      }}>
        <Typography variant="body2" color="text.secondary">
          Total Rows: {filteredData.length}
        </Typography>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={filteredData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
    </Paper>
  );
};

const Allowances = () => {
  const { employeeId } = useContext(EmployeeContext);

  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    allowance_option: '',
    amount_option: '',
  });

  const [allowances, setAllowances] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchAllowances = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.post('/api/contract_details/', {
        user_id: employeeId,
        type: 2,
      });
      const details = res.data.contract_details;
      setAllowances(Array.isArray(details) ? details : []);
    } catch (error) {
      console.error('Error fetching allowances:', error);
      Swal.fire({
        icon: 'error',
        title: 'Fetch Error',
        text: 'Could not load allowances. Please try refreshing the page.'
      });
      setAllowances([]);
    } finally {
        setLoading(false);
    }
  }, [employeeId]);

  useEffect(() => {
    if (employeeId) fetchAllowances();
  }, [employeeId, fetchAllowances]);


  const handleSave = async () => {
    if (!formData.title || !formData.amount || !formData.allowance_option || !formData.amount_option) {
      Swal.fire({
        icon: 'warning',
        title: 'Missing Fields',
        text: 'Please fill out all the required fields before saving.',
      });
      return;
    }

    const payload = {
      user_id: employeeId,
      type: 2,
      pay_title: formData.title,
      pay_amount: formData.amount,
      is_taxable: formData.allowance_option,
      is_fixed: formData.amount_option,
      salary_month: '01'
    };

    const action = editingId !== null ? 'Updating' : 'Saving';

    Swal.fire({
      title: `${action} Allowance...`,
      text: 'Please wait.',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    if (editingId !== null) {
      payload.pay_id = editingId;
    }

    try {
      await axiosInstance.patch('/api/contract_details/', payload);
      await fetchAllowances();

      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: `Allowance has been ${editingId !== null ? 'updated' : 'saved'} successfully.`,
      });

      setFormData({ title: '', amount: '', allowance_option: '', amount_option: '' });
      setEditingId(null);
    } catch (error) {
      console.error('Error saving record:', error);
      const errorMessage = error.response?.data?.message || 'An unexpected error occurred.';
      Swal.fire({
        icon: 'error',
        title: 'Operation Failed',
        text: errorMessage,
      });
    }
  };

  const handleEdit = (row) => {
    setFormData({
      title: row.title,
      amount: row.amount,
      allowance_option: row.allowance_option,
      amount_option: row.amount_option !== null ? row.amount_option.toString() : '',
    });
    setEditingId(row.id);
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosInstance.delete('/api/contract_details/', {
            data: { pay_id: id, type: 2 },
          });
          await fetchAllowances();
          Swal.fire(
            'Deleted!',
            'The allowance has been deleted.',
            'success'
          );
        } catch (error) {
          console.error('Error deleting record:', error);
          const errorMessage = error.response?.data?.message || 'Failed to delete the record.';
          Swal.fire(
            'Error!',
            errorMessage,
            'error'
          );
        }
      }
    });
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const filteredAllowances = allowances.filter(row =>
    row.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const paginatedRows = filteredAllowances.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handlePaginationChange = (event, newPage) => {
    setPage(newPage - 1);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  
  const startEntry = filteredAllowances.length > 0 ? page * rowsPerPage + 1 : 0;
  const endEntry = Math.min((page + 1) * rowsPerPage, filteredAllowances.length);


  return (
    <Box sx={{ p: 3 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6" gutterBottom fontWeight="bold" color="#8C257C">List All Allowances</Typography>
        
        <Box display="flex" justifyContent="flex-end" alignItems="center" mb={2}>
                <TextField
                  size="small"
                  placeholder="Search Title"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  sx={{ width: 250 }}
                />
              </Box>
        
      </Box>

      {employeeId && (
        <TableContainer component={Paper} sx={{ mb: 2 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: PRIMARY_COLOR }}>
                <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>SR. NO.</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>TITLE</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>AMOUNT</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>ALLOWANCE OPTION</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>AMOUNT OPTION</TableCell>
                <TableCell align="right" sx={{ fontWeight: 'bold', color: 'white' }}>ACTIONS</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ p: 4 }}>
                    <CircularProgress sx={{ color: PRIMARY_COLOR }} />
                  </TableCell>
                </TableRow>
              ) : paginatedRows.length === 0 ? (
                <TableRow><TableCell colSpan={6} align="center">No records found</TableCell></TableRow>
              ) : (
                paginatedRows.map((row, index) => (
                    <TableRow key={row.id} hover>
                      <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                      <TableCell>{row.title}</TableCell>
                      <TableCell>{row.amount}</TableCell>
                      <TableCell>{row.allowance_option}</TableCell>
                      <TableCell>{row.amount_option === 0 ? 'Fixed' : 'Percentage'}</TableCell>
                      <TableCell align="right">
                          <IconButton size="small" sx={{ color: PRIMARY_COLOR }} onClick={() => handleEdit(row)}>
                            <Edit fontSize="small" />
                          </IconButton>
                          <IconButton size="small" color="error" onClick={() => handleDelete(row.id)}>
                            <Delete fontSize="small" />
                          </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Box sx={{ p: 2, borderTop: '1px solid rgba(224, 224, 224, 1)' }}>
          {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Skeleton variant="text" width={200} />
                  <Skeleton variant="rectangular" width={300} height={40} />
              </Box>
          ) : (
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <FormControl variant="outlined" size="small">
                          <Select
                              value={rowsPerPage}
                              onChange={handleChangeRowsPerPage}
                              sx={{
                                  backgroundColor: PRIMARY_COLOR,
                                  color: 'white',
                                  borderRadius: '4px',
                                  transition: 'background-color 0.3s',
                                  '&:hover': {
                                      backgroundColor: PRIMARY_DARK_COLOR,
                                  },
                                  '& .MuiOutlinedInput-notchedOutline': {
                                      border: 'none',
                                  },
                                  '& .MuiSvgIcon-root': {
                                      color: 'white',
                                  },
                              }}
                          >
                              {[5, 10, 15, 25].map((value) => (
                                  <MenuItem key={value} value={value}>{value}</MenuItem>
                              ))}
                          </Select>
                      </FormControl>
                      <Typography variant="body2" color="text.secondary">
                         {`Showing ${startEntry} to ${endEntry} of ${filteredAllowances.length} results`}
                      </Typography>
                  </Box>

                  <Pagination
                      count={Math.ceil(filteredAllowances.length / rowsPerPage)}
                      page={page + 1}
                      onChange={handlePaginationChange}
                      showFirstButton
                      showLastButton
                      sx={{
                          '& .MuiPaginationItem-root': {
                              borderRadius: '4px',
                              transition: 'background-color 0.3s, color 0.3s',
                              '&:hover': {
                                  backgroundColor: SECONDARY_COLOR,
                                  color: 'white',
                              }
                          },
                          '& .MuiPaginationItem-page':{
                              color: PRIMARY_COLOR,
                              '&.Mui-selected': {
                                  backgroundColor: PRIMARY_COLOR,
                                  color: 'white',
                                  '&:hover': {
                                      backgroundColor: SECONDARY_COLOR,
                                  }
                              },
                          },
                           '& .MuiPaginationItem-icon': {
                              color: PRIMARY_COLOR,
                          }
                      }}
                  />
              </Box>
          )}
      </Box>

      <Grid container spacing={2} mt={3}>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth size="small" required>
            <InputLabel>Allowance Option</InputLabel>
            <Select
              name="allowance_option"
              value={formData.allowance_option ?? ''}
              label="Allowance Option"
              onChange={handleChange}
            >
              <MenuItem value="Non Taxable">Non Taxable</MenuItem>
              <MenuItem value="Fully">Fully Taxable</MenuItem>
              <MenuItem value="Partial">Partially Taxable</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth size="small" required>
            <InputLabel>Amount Option</InputLabel>
            <Select
              name="amount_option"
              value={formData.amount_option ?? ''}
              label="Amount Option"
              onChange={handleChange}
            >
              <MenuItem value="0">Fixed</MenuItem>
              <MenuItem value="1">Percentage</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            size="small"
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Box display="flex" alignItems="center">
            <Typography sx={{ mr: 1 }}></Typography>
            <TextField
              fullWidth
              size="small"
              label="INR Amount"
              name="amount"
              type="number"
              value={formData.amount}
              onChange={handleChange}
              required
            />
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Box display="flex" justifyContent="flex-end">
            <Button
              variant="contained"
              sx={{
                textTransform: 'none',
                px: 4,
                backgroundColor: PRIMARY_COLOR,
                '&:hover': {
                  backgroundColor: PRIMARY_DARK_COLOR,
                }
              }}
              onClick={handleSave}
            >
              {editingId !== null ? 'Update' : 'Save'}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

const probationOptions = [{ value: 'Y', label: 'Yes' }, { value: 'N', label: 'No' }];

const Detail = () => {
  const [tab, setTab] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [joiningDate, setJoiningDate] = useState(null);
  const [departmentId, setDepartmentId] = useState('');
  const [designationId, setDesignationId] = useState('');
  const [grossSalary, setGrossSalary] = useState('0.00');
  const [probation, setProbation] = useState('');
  const [officeShiftId, setOfficeShiftId] = useState('');
  const [roleDescription, setRoleDescription] = useState('');

  const [departmentsList, setDepartmentsList] = useState([]);
  const [designationsList, setDesignationsList] = useState([]);
  const [officeShiftsList, setOfficeShiftsList] = useState([]);

  const { employeeId } = useContext(EmployeeContext);
  const userId = employeeId;

  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        const [deptRes, desigRes, shiftRes] = await Promise.all([
          axiosInstance.get('api/departments/dropdown/'),
          axiosInstance.get('api/designations/dropdown/'),
          axiosInstance.get('api/office_shift_dropdown/'),
        ]);

        if (deptRes.data && deptRes.data.status === true) {
          setDepartmentsList(deptRes.data.data || []);
        }
        if (desigRes.data && desigRes.data.status === true) {
          setDesignationsList(desigRes.data.data || []);
        }
        if (shiftRes.data && shiftRes.data.status === 'success') {
          setOfficeShiftsList(shiftRes.data.office_shift_data || []);
        }
      } catch (err) {
        console.error("Failed to fetch dropdown data", err);
        setError("Failed to load required form options.");
      }
    };

    fetchDropdownData();
  }, []);

  const fetchContractDetails = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.post('api/contract_details/', {
        user_id: userId,
        type: 1,
      });

      if (response.data && response.data.contract_details && response.data.contract_details.length > 0) {
        const details = response.data.contract_details[0];

        setJoiningDate(details.contract_date ? dayjs(details.contract_date, 'YYYY-MM-DD') : null);
        setDepartmentId(details.department_id || '');
        setDesignationId(details.designation_id || '');
        setGrossSalary(details.gross_salary || '0.00');
        setOfficeShiftId(details.office_shift_id || '');
        setProbation(details.probation?.toLowerCase() === 'y' ? 'Y' : 'N');
        setRoleDescription(details.role_description || '');
      } else {
        setJoiningDate(null);
        setDepartmentId('');
        setDesignationId('');
        setGrossSalary('0.00');
        setOfficeShiftId('');
        setProbation('');
        setRoleDescription('');
        setError("No contract details found for this user. You can create a new one.");
      }
    } catch (err) {
      setError(err.message || "An error occurred while fetching contract details.");
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      fetchContractDetails();
    } else {
      setLoading(false);
    }
  }, [userId, fetchContractDetails]);

  const handleUpdateDetails = async () => {
    if (!userId) {
      Swal.fire({
        icon: 'error',
        title: 'Missing Information',
        text: 'Cannot update: Employee ID is missing.',
      });
      return;
    }

    const requiredFields = { joiningDate, departmentId, designationId, grossSalary, probation, officeShiftId };
    for (const field in requiredFields) {
      if (!requiredFields[field]) {
        Swal.fire({
          icon: 'warning',
          title: 'Validation Error',
          text: `Please fill out the "${field.replace(/([A-Z])/g, ' $1').trim()}" field. It is required.`,
        });
        return;
      }
    }

    const payload = {
      user_id: userId,
      company_id: 2,
      type: 1,
      department_id: departmentId,
      designation_id: designationId,
      gross_salary: parseFloat(grossSalary),
      office_shift_id: officeShiftId,
      probation: probation,
      role_description: roleDescription,
      contract_date: joiningDate ? joiningDate.format('YYYY-MM-DD') : null,
    };

    Swal.fire({
      title: 'Updating Details...',
      text: 'Please wait.',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      await axiosInstance.patch(`api/contract_details/`, payload);
      Swal.fire({
        icon: 'success',
        title: 'Updated!',
        text: 'Details have been updated successfully.',
      });
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to update details. Please check the console.';
      console.error("Update error:", err.response ? err.response.data : err);
      Swal.fire({
        icon: 'error',
        title: 'Update Failed',
        text: errorMessage,
      });
    }
  };

  if (loading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress /></Box>;
  }

  if (error && !joiningDate) {
    return <Alert severity="warning">{error}</Alert>;
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Typography variant="h5"  mb={4} fontWeight="bold" sx={{ color: PRIMARY_COLOR }}>Set Details</Typography>

        <Tabs
          value={tab}
          onChange={(e, val) => setTab(val)}
          TabIndicatorProps={{
            style: {
              backgroundColor: SECONDARY_COLOR
            }
          }}
          sx={{
            mb: 2,
            '& .MuiTab-root': {
              textTransform: 'none',
              '&.Mui-selected': {
                color: PRIMARY_COLOR,
                fontWeight: 'bold',
              },
            },
          }}
        >
          <Tab label="Details" />
          <Tab label="Allowances" />
          <Tab label="Statutory Deductions" />
          <Tab label="Reimbursements" />
        </Tabs>

        {tab === 0 && (
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <DatePicker
                label="Joining Date "
                value={joiningDate}
                onChange={(newValue) => setJoiningDate(newValue)}
                slots={{
                  textField: (params) => <TextField {...params} fullWidth size="small" required />,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                label="Department "
                value={departmentId}
                onChange={(e) => setDepartmentId(e.target.value)}
                fullWidth size="small" required
              >
                {departmentsList.map((option) => (
                  <MenuItem key={option.department_id} value={option.department_id}>
                    {option.department_name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                label="Designation "
                value={designationId}
                onChange={(e) => setDesignationId(e.target.value)}
                fullWidth size="small" required
              >
                {designationsList.map((option) => (
                  <MenuItem key={option.designation_id} value={option.designation_id}>
                    {option.designation_name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Gross Salary " type="number" value={grossSalary} onChange={(e) => setGrossSalary(e.target.value)} fullWidth size="small" required InputProps={{ startAdornment: <InputAdornment position="start">INR</InputAdornment> }} />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField select label="Probation " value={probation} onChange={(e) => setProbation(e.target.value)} fullWidth size="small" required >
                {probationOptions.map((option) => (<MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>))}
              </TextField>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField select label="Office Shift " value={officeShiftId} onChange={(e) => setOfficeShiftId(e.target.value)} fullWidth size="small" required >
                {officeShiftsList.map((option) => (
                  <MenuItem key={option.office_shift_id} value={option.office_shift_id}>
                    {option.office_shift_name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="subtitle2" gutterBottom sx={{ color: 'text.secondary' }}>Role Description</Typography>
              <TextareaAutosize minRows={3} placeholder="Enter role description here..." value={roleDescription} onChange={(e) => setRoleDescription(e.target.value)} style={{ width: '100%', padding: '8.5px 14px', borderRadius: '4px', borderColor: 'rgba(0, 0, 0, 0.23)', fontFamily: 'inherit', fontSize: '1rem', resize: 'vertical', boxSizing: 'border-box' }} />
            </Grid>
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
              <Button
                variant="contained"
                onClick={handleUpdateDetails}
                sx={{
                  backgroundColor: PRIMARY_COLOR,
                  '&:hover': {
                    backgroundColor: PRIMARY_DARK_COLOR
                  }
                }}
              >
                Update Details
              </Button>
            </Grid>
          </Grid>
        )}

        {tab === 1 && <Allowances />}
        {tab === 2 && <StatutoryDeductions />}
        {tab === 3 && <Reimbursements />}
    </LocalizationProvider>
  );
};

export default Detail;