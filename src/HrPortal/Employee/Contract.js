// import React, { useState, useMemo, useEffect, useCallback, useContext } from 'react';
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
//   const [basicSalaryMonthly, setBasicSalaryMonthly] = useState('0.00');
//   // REMOVED: hourlyRate state
//   const [probation, setProbation] = useState('');
//   const [probationEndDate, setProbationEndDate] = useState(null);
//   const [officeShiftId, setOfficeShiftId] = useState('');
//   const [roleDescription, setRoleDescription] = useState('');
//   // REMOVED: billing state
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
//         setBasicSalaryMonthly(details.basic_salary || '0.00');
//         // REMOVED: setHourlyRate
//         setOfficeShiftId(details.office_shift_id || '');
//         setProbation(details.probation || '');
//         // REMOVED: setBilling
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
//         alert("Cannot update: Employee ID is missing.");
//         return;
//     }
//     const payload = {
//       user_id: userId,
//       company_id: 2,
//       type: 1,
//       department_id: departmentId,
//       designation_id: designationId,
//       basic_salary: parseFloat(basicSalaryMonthly),
//       // REMOVED: hourly_rate
//       office_shift_id: officeShiftId,
//       probation: probation === 'Y' ? 1 : 0,
//       probation_end_date: probationEndDate ? probationEndDate.format('YYYY-MM-DD') : null,
//       manager: 523,
//       role_description: roleDescription,
//       // REMOVED: billing
//       contract_date: joiningDate ? joiningDate.format('YYYY-MM-DD') : null,
//     };

//     try {
//       await axiosInstance.patch(`api/contract_details/`, payload);
//       alert('Details Updated Successfully!');
//     } catch (err) {
//       alert('Failed to update details. Check console for details.');
//       console.error("Update error:", err.response ? err.response.data : err);
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
//           <Typography variant="h6">Set Detail</Typography>
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
//               <TextField label="Gross Salary *" type="number" value={grossSalary} onChange={(e) => setGrossSalary(e.target.value)} fullWidth size="small" required />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField label="Basic Salary Monthly *" type="number" value={basicSalaryMonthly} onChange={(e) => setBasicSalaryMonthly(e.target.value)} fullWidth size="small" required InputProps={{ startAdornment: <InputAdornment position="start">INR</InputAdornment> }} />
//             </Grid>
            
//             {/* REMOVED: Hourly Rate field */}
            
//             {/* REMOVED: Billing field */}
            
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
// import React, { useState, useMemo, useEffect, useCallback, useContext } from 'react';
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
//   const [basicSalaryMonthly, setBasicSalaryMonthly] = useState('0.00');
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
//         setBasicSalaryMonthly(details.basic_salary || '0.00');
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
//       // 2. Use Swal for validation alerts
//       Swal.fire({
//         icon: 'error',
//         title: 'Missing Information',
//         text: 'Cannot update: Employee ID is missing.',
//       });
//       return;
//     }

//     // *** Bonus: Add validation for required fields before submitting
//     const requiredFields = { joiningDate, departmentId, designationId, grossSalary, basicSalaryMonthly, probation, probationEndDate, officeShiftId, roleDescription };
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
//       basic_salary: parseFloat(basicSalaryMonthly),
//       office_shift_id: officeShiftId,
//       probation: probation === 'Y' ? 1 : 0,
//       probation_end_date: probationEndDate ? probationEndDate.format('YYYY-MM-DD') : null,
//       manager: 523, // This seems hardcoded, ensure it's correct
//       role_description: roleDescription,
//       contract_date: joiningDate ? joiningDate.format('YYYY-MM-DD') : null,
//     };

//     // 3. Add loading state with Swal
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
//       // 4. Show success message with Swal
//       Swal.fire({
//         icon: 'success',
//         title: 'Updated!',
//         text: 'Details have been updated successfully.',
//       });
//     } catch (err) {
//       const errorMessage = err.response?.data?.message || 'Failed to update details. Please check the console.';
//       console.error("Update error:", err.response ? err.response.data : err);
//       // 5. Show error message with Swal
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
//               <TextField label="Gross Salary *" type="number" value={grossSalary} onChange={(e) => setGrossSalary(e.target.value)} fullWidth size="small" required />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField label="Basic Salary Monthly *" type="number" value={basicSalaryMonthly} onChange={(e) => setBasicSalaryMonthly(e.target.value)} fullWidth size="small" required InputProps={{ startAdornment: <InputAdornment position="start">INR</InputAdornment> }} />
//             </Grid>
            
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
//   const [basicSalaryMonthly, setBasicSalaryMonthly] = useState('0.00');
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
//         setBasicSalaryMonthly(details.basic_salary || '0.00');
//         // Set gross salary from API
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
//       // 2. Use Swal for validation alerts
//       Swal.fire({
//         icon: 'error',
//         title: 'Missing Information',
//         text: 'Cannot update: Employee ID is missing.',
//       });
//       return;
//     }

//     // *** Bonus: Add validation for required fields before submitting
//     const requiredFields = { joiningDate, departmentId, designationId, grossSalary, basicSalaryMonthly, probation, probationEndDate, officeShiftId, roleDescription };
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
//       basic_salary: parseFloat(basicSalaryMonthly),
//       // Add gross_salary to the payload
//       gross_salary: parseFloat(grossSalary),
//       office_shift_id: officeShiftId,
//       // Send 'Y' or 'N' directly
//       probation: probation,
//       probation_end_date: probationEndDate ? probationEndDate.format('YYYY-MM-DD') : null,
//       manager: 523, // This seems hardcoded, ensure it's correct
//       role_description: roleDescription,
//       contract_date: joiningDate ? joiningDate.format('YYYY-MM-DD') : null,
//     };

//     // 3. Add loading state with Swal
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
//       // 4. Show success message with Swal
//       Swal.fire({
//         icon: 'success',
//         title: 'Updated!',
//         text: 'Details have been updated successfully.',
//       });
//     } catch (err) {
//       const errorMessage = err.response?.data?.message || 'Failed to update details. Please check the console.';
//       console.error("Update error:", err.response ? err.response.data : err);
//       // 5. Show error message with Swal
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
//               <TextField label="Gross Salary *" type="number" value={grossSalary} onChange={(e) => setGrossSalary(e.target.value)} fullWidth size="small" required />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField label="Basic Salary Monthly *" type="number" value={basicSalaryMonthly} onChange={(e) => setBasicSalaryMonthly(e.target.value)} fullWidth size="small" required InputProps={{ startAdornment: <InputAdornment position="start">INR</InputAdornment> }} />
//             </Grid>
            
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

// // export default Detail;
// import React, { useState, useCallback, useContext, useEffect } from 'react';

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
// import Allowances from '../../SuperAdmin/Employee//Allowances';
// import Commissions from './Commissions';
// import StatutoryDeductions from '../../SuperAdmin/Employee//StatutoryDeductions';
// import Reimbursements from '../../SuperAdmin/Employee//Reimbursements';
// import { EmployeeContext } from '../../SuperAdmin/Employee/EmployeeContext';

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
//               <TextareaAutosize minRows={3} placeholder="Enter role description here... " value={roleDescription} onChange={(e) => setRoleDescription(e.target.value)} style={{ width: '100%', padding: '8.5px 14px', borderRadius: '4px', borderColor: 'rgba(0, 0, 0, 0.23)', fontFamily: 'inherit', fontSize: '1rem', resize: 'vertical', boxSizing: 'border-box' }} required />
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





// import React, { useState, useEffect, useContext } from 'react';
// import { EmployeeContext } from './EmployeeContext';
// import { Box, TextField, MenuItem, Grid, Typography, Button, InputAdornment, CircularProgress } from '@mui/material';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import dayjs from 'dayjs';
// import Swal from 'sweetalert2';
// import axiosInstance from '../../utils/axiosInstance';

// const PRIMARY_COLOR = "#8C257C";
// const probationOptions = [{ value: 'Y', label: 'Yes' }, { value: 'N', label: 'No' }];

// const Detail = ({ onNext, onBack }) => {
//   const { employeeId } = useContext(EmployeeContext);
//   const [loading, setLoading] = useState(true);
  
//   // Form State
//   const [joiningDate, setJoiningDate] = useState(null);
//   const [departmentId, setDepartmentId] = useState('');
//   const [designationId, setDesignationId] = useState('');
//   const [grossSalary, setGrossSalary] = useState('');
//   const [probation, setProbation] = useState('');
//   const [officeShiftId, setOfficeShiftId] = useState('');
//   const [roleDescription, setRoleDescription] = useState('');
  
//   // Validation State
//   const [errors, setErrors] = useState({});

//   // Dropdown Data
//   const [departmentsList, setDepartmentsList] = useState([]);
//   const [designationsList, setDesignationsList] = useState([]);
//   const [officeShiftsList, setOfficeShiftsList] = useState([]);

//   useEffect(() => {
//     const init = async () => {
//        try {
//          const [d, des, s] = await Promise.all([
//              axiosInstance.get('api/departments/dropdown/'),
//              axiosInstance.get('api/designations/dropdown/'),
//              axiosInstance.get('api/office_shift_dropdown/')
//          ]);
//          setDepartmentsList(d.data.data || []);
//          setDesignationsList(des.data.data || []);
//          setOfficeShiftsList(s.data.office_shift_data || []);
         
//          if(employeeId) {
//              const res = await axiosInstance.post('api/contract_details/', { user_id: employeeId, type: 1 });
//              if(res.data.contract_details?.[0]) {
//                  const det = res.data.contract_details[0];
//                  setJoiningDate(det.contract_date ? dayjs(det.contract_date) : null);
//                  setDepartmentId(det.department_id || '');
//                  setDesignationId(det.designation_id || '');
//                  setGrossSalary(det.gross_salary || '');
//                  setProbation(det.probation === 'Y' || det.probation === 'y' ? 'Y' : 'N');
//                  setOfficeShiftId(det.office_shift_id || '');
//                  setRoleDescription(det.role_description || '');
//              }
//          }
//        } catch(e) { console.error(e); }
//        finally { setLoading(false); }
//     };
//     init();
//   }, [employeeId]);

//   const validate = () => {
//       const newErrors = {};
//       let isValid = true;

//       if (!joiningDate) { newErrors.joiningDate = true; isValid = false; }
//       if (!departmentId) { newErrors.departmentId = true; isValid = false; }
//       if (!designationId) { newErrors.designationId = true; isValid = false; }
//       if (!grossSalary || grossSalary <= 0) { newErrors.grossSalary = true; isValid = false; }
//       if (!probation) { newErrors.probation = true; isValid = false; }
//       if (!officeShiftId) { newErrors.officeShiftId = true; isValid = false; }
//       if (!roleDescription.trim()) { newErrors.roleDescription = true; isValid = false; }

//       setErrors(newErrors);

//       if (!isValid) {
//           Swal.fire({
//               icon: 'error',
//               title: 'Incomplete Details',
//               text: 'Please fill all the required fields before continuing.',
//               confirmButtonColor: PRIMARY_COLOR
//           });
//           setTimeout(() => {
//             const el = document.querySelector('.Mui-error');
//             if(el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
//           }, 100);
//       }
//       return isValid;
//   };

//   const handleSaveAndNext = async () => {
//     if (!validate()) return;

//     const payload = {
//         user_id: employeeId, company_id: 2, type: 1,
//         department_id: departmentId, designation_id: designationId,
//         gross_salary: parseFloat(grossSalary), office_shift_id: officeShiftId,
//         probation: probation, role_description: roleDescription,
//         contract_date: joiningDate ? joiningDate.format('YYYY-MM-DD') : null,
//     };
//     try {
//         Swal.showLoading();
//         await axiosInstance.patch(`api/contract_details/`, payload);
//         Swal.close();
//         if(onNext) onNext();
//     } catch(e) { Swal.fire('Error', 'Failed to save', 'error'); }
//   };

//   const handleFieldChange = (setter, field, value) => {
//       setter(value);
//       if(errors[field]) setErrors(prev => ({...prev, [field]: false}));
//   };

//   if (loading) return <Box display="flex" justifyContent="center" p={4}><CircularProgress /></Box>;

//   return (
//     <LocalizationProvider dateAdapter={AdapterDayjs}>
//       <Box sx={{ p: 2 }}>
//         <Typography variant="h6" color={PRIMARY_COLOR} gutterBottom fontWeight="bold">Details</Typography>
//         <Grid container spacing={3}>
//             <Grid item xs={12} sm={6}>
//                 <DatePicker 
//                     label="Joining Date" 
//                     value={joiningDate} 
//                     onChange={(val) => handleFieldChange(setJoiningDate, 'joiningDate', val)} 
//                     slotProps={{ 
//                         textField: { 
//                             fullWidth: true, 
//                             size: 'small', 
//                             error: !!errors.joiningDate 
//                         } 
//                     }} 
//                 />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//                 <TextField 
//                     select label="Department" fullWidth size="small" 
//                     value={departmentId} 
//                     onChange={(e)=> handleFieldChange(setDepartmentId, 'departmentId', e.target.value)}
//                     error={!!errors.departmentId}
//                 >
//                     {departmentsList.map(o=><MenuItem key={o.department_id} value={o.department_id}>{o.department_name}</MenuItem>)}
//                 </TextField>
//             </Grid>
//             <Grid item xs={12} sm={6}>
//                 <TextField 
//                     select label="Designation" fullWidth size="small" 
//                     value={designationId} 
//                     onChange={(e)=> handleFieldChange(setDesignationId, 'designationId', e.target.value)}
//                     error={!!errors.designationId}
//                 >
//                     {designationsList.map(o=><MenuItem key={o.designation_id} value={o.designation_id}>{o.designation_name}</MenuItem>)}
//                 </TextField>
//             </Grid>
//             <Grid item xs={12} sm={6}>
//                 <TextField 
//                     label="Gross Salary" type="number" fullWidth size="small" 
//                     value={grossSalary} 
//                     onChange={(e)=> handleFieldChange(setGrossSalary, 'grossSalary', e.target.value)}
//                     error={!!errors.grossSalary}
//                     InputProps={{startAdornment:<InputAdornment position="start">INR</InputAdornment>}} 
//                 />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//                 <TextField 
//                     select label="Probation" fullWidth size="small" 
//                     value={probation} 
//                     onChange={(e)=> handleFieldChange(setProbation, 'probation', e.target.value)}
//                     error={!!errors.probation}
//                 >
//                     {probationOptions.map(o=><MenuItem key={o.value} value={o.value}>{o.label}</MenuItem>)}
//                 </TextField>
//             </Grid>
//             <Grid item xs={12} sm={6}>
//                 <TextField 
//                     select label="Office Shift" fullWidth size="small" 
//                     value={officeShiftId} 
//                     onChange={(e)=> handleFieldChange(setOfficeShiftId, 'officeShiftId', e.target.value)}
//                     error={!!errors.officeShiftId}
//                 >
//                     {officeShiftsList.map(o=><MenuItem key={o.office_shift_id} value={o.office_shift_id}>{o.office_shift_name}</MenuItem>)}
//                 </TextField>
//             </Grid>
//             <Grid item xs={12}>
//                 <TextField
//                     label="Role Description"
//                     multiline
//                     rows={3}
//                     fullWidth
//                     value={roleDescription}
//                     onChange={(e)=> handleFieldChange(setRoleDescription, 'roleDescription', e.target.value)}
//                     error={!!errors.roleDescription}
//                 />
//             </Grid>
//         </Grid>

//         <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
//              <Button onClick={onBack} variant="outlined" sx={{ borderRadius: '8px', borderColor: '#ccc', color: '#555', '&:hover': { borderColor: '#8C257C', color: '#8C257C' } }}>Back</Button>
//              <Button onClick={handleSaveAndNext} variant="contained" sx={{ background: `linear-gradient(135deg, ${PRIMARY_COLOR} 0%, #6d1d60 100%)`, color: 'white', borderRadius: '8px' }}>Save & Next</Button>
//         </Box>
//       </Box>
//     </LocalizationProvider>
//   );
// };
// export default Detail;



import React, { useState, useEffect, useContext } from 'react';
import { EmployeeContext } from './EmployeeContext';
import { Box, TextField, MenuItem, Grid, Typography, Button, InputAdornment, CircularProgress } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import Swal from 'sweetalert2';
import axiosInstance from '../../utils/axiosInstance';
import { useLocation, useParams } from 'react-router-dom';

const PRIMARY_COLOR = "#8C257C";
const probationOptions = [{ value: 'Y', label: 'Yes' }, { value: 'N', label: 'No' }];

// API endpoint (full URL as requested)
const CONTRACT_API = 'https://tdtlworld.com/hrms-backend/api/contract_details/';

const Detail = ({ onNext, onBack }) => {
  const { employeeId } = useContext(EmployeeContext);
  const params = useParams();
  const location = useLocation();

  const [loading, setLoading] = useState(true);
  
  // Form State
  const [joiningDate, setJoiningDate] = useState(null);
  const [departmentId, setDepartmentId] = useState('');
  const [designationId, setDesignationId] = useState('');
  const [grossSalary, setGrossSalary] = useState('');
  const [probation, setProbation] = useState('');
  const [officeShiftId, setOfficeShiftId] = useState('');
  const [roleDescription, setRoleDescription] = useState('');
  
  // Validation State
  const [errors, setErrors] = useState({});

  // Dropdown Data
  const [departmentsList, setDepartmentsList] = useState([]);
  const [designationsList, setDesignationsList] = useState([]);
  const [officeShiftsList, setOfficeShiftsList] = useState([]);

  // Determine effective user id (priority: query ?id=, route param, EmployeeContext)
  const getEffectiveId = () => {
    try {
      const q = new URLSearchParams(location.search);
      const qId = q.get('id');
      if (qId) return qId;
    } catch (e) { /* ignore */ }

    if (params?.id) return params.id;
    return employeeId;
  };

  useEffect(() => {
    const init = async () => {
       setLoading(true);
       const effectiveId = getEffectiveId();
       try {
         const [d, des, s] = await Promise.all([
             axiosInstance.get('api/departments/dropdown/'),
             axiosInstance.get('api/designations/dropdown/'),
             axiosInstance.get('api/office_shift_dropdown/')
         ]);
         setDepartmentsList(d.data.data || []);
         setDesignationsList(des.data.data || []);
         setOfficeShiftsList(s.data.office_shift_data || []);
         
         if(effectiveId) {
             const res = await axiosInstance.post(CONTRACT_API, { user_id: effectiveId, type: 1 });
             if(res.data.contract_details?.[0]) {
                 const det = res.data.contract_details[0];
                 setJoiningDate(det.contract_date ? dayjs(det.contract_date) : null);
                 setDepartmentId(det.department_id || '');
                 setDesignationId(det.designation_id || '');
                 setGrossSalary(det.gross_salary || '');
                 setProbation(det.probation === 'Y' || det.probation === 'y' ? 'Y' : (det.probation === 'N' ? 'N' : ''));
                 setOfficeShiftId(det.office_shift_id || '');
                 setRoleDescription(det.role_description || '');
             }
         } else {
           // no id available
           console.warn('No employee id found in query, route or context.');
         }
       } catch(e) { console.error('Init error', e); }
       finally { setLoading(false); }
    };
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [employeeId, location.search, params.id]);

  const validate = () => {
      const newErrors = {};
      let isValid = true;

      if (!joiningDate) { newErrors.joiningDate = true; isValid = false; }
      if (!departmentId) { newErrors.departmentId = true; isValid = false; }
      if (!designationId) { newErrors.designationId = true; isValid = false; }
      if (!grossSalary || Number(grossSalary) <= 0) { newErrors.grossSalary = true; isValid = false; }
      if (!probation) { newErrors.probation = true; isValid = false; }
      if (!officeShiftId) { newErrors.officeShiftId = true; isValid = false; }
      if (!roleDescription.trim()) { newErrors.roleDescription = true; isValid = false; }

      setErrors(newErrors);

      if (!isValid) {
          Swal.fire({
              icon: 'error',
              title: 'Incomplete Details',
              text: 'Please fill all the required fields before continuing.',
              confirmButtonColor: PRIMARY_COLOR
          });
          setTimeout(() => {
            const el = document.querySelector('.Mui-error');
            if(el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }, 100);
      }
      return isValid;
  };

  const handleSaveAndNext = async () => {
    const effectiveId = getEffectiveId();
    if (!effectiveId) {
      Swal.fire({ icon: 'error', title: 'Missing ID', text: 'No employee id found in URL or context.' });
      return;
    }
    if (!validate()) return;

    const payload = {
        user_id: effectiveId,
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
    try {
        Swal.fire({ title: 'Updating Details...', allowOutsideClick: false, didOpen: () => Swal.showLoading() });
        await axiosInstance.patch(CONTRACT_API, payload);
        Swal.close();
        if(onNext) onNext();
    } catch(e) {
        console.error('Save error', e);
        Swal.fire('Error', 'Failed to save', 'error');
    }
  };

  const handleFieldChange = (setter, field, value) => {
      setter(value);
      if(errors[field]) setErrors(prev => ({...prev, [field]: false}));
  };

  if (loading) return <Box display="flex" justifyContent="center" p={4}><CircularProgress /></Box>;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" color={PRIMARY_COLOR} gutterBottom fontWeight="bold">Details</Typography>
        <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
                <DatePicker 
                    label="Joining Date" 
                    value={joiningDate} 
                    onChange={(val) => handleFieldChange(setJoiningDate, 'joiningDate', val)} 
                    slotProps={{ 
                        textField: { 
                            fullWidth: true, 
                            size: 'small', 
                            error: !!errors.joiningDate 
                        } 
                    }} 
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField 
                    select label="Department" fullWidth size="small" 
                    value={departmentId} 
                    onChange={(e)=> handleFieldChange(setDepartmentId, 'departmentId', e.target.value)}
                    error={!!errors.departmentId}
                >
                    {departmentsList.map(o=><MenuItem key={o.department_id} value={o.department_id}>{o.department_name}</MenuItem>)}
                </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField 
                    select label="Designation" fullWidth size="small" 
                    value={designationId} 
                    onChange={(e)=> handleFieldChange(setDesignationId, 'designationId', e.target.value)}
                    error={!!errors.designationId}
                >
                    {designationsList.map(o=><MenuItem key={o.designation_id} value={o.designation_id}>{o.designation_name}</MenuItem>)}
                </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField 
                    label="Gross Salary" type="number" fullWidth size="small" 
                    value={grossSalary} 
                    onChange={(e)=> handleFieldChange(setGrossSalary, 'grossSalary', e.target.value)}
                    error={!!errors.grossSalary}
                    InputProps={{startAdornment:<InputAdornment position="start">INR</InputAdornment>}} 
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField 
                    select label="Probation" fullWidth size="small" 
                    value={probation} 
                    onChange={(e)=> handleFieldChange(setProbation, 'probation', e.target.value)}
                    error={!!errors.probation}
                >
                    {probationOptions.map(o=><MenuItem key={o.value} value={o.value}>{o.label}</MenuItem>)}
                </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField 
                    select label="Office Shift" fullWidth size="small" 
                    value={officeShiftId} 
                    onChange={(e)=> handleFieldChange(setOfficeShiftId, 'officeShiftId', e.target.value)}
                    error={!!errors.officeShiftId}
                >
                    {officeShiftsList.map(o=><MenuItem key={o.office_shift_id} value={o.office_shift_id}>{o.office_shift_name}</MenuItem>)}
                </TextField>
            </Grid>
            <Grid item xs={12}>
                <TextField
                    label="Role Description"
                    multiline
                    rows={3}
                    fullWidth
                    value={roleDescription}
                    onChange={(e)=> handleFieldChange(setRoleDescription, 'roleDescription', e.target.value)}
                    error={!!errors.roleDescription}
                />
            </Grid>
        </Grid>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
             <Button onClick={onBack} variant="outlined" sx={{ borderRadius: '8px', borderColor: '#ccc', color: '#555', '&:hover': { borderColor: '#8C257C', color: '#8C257C' } }}>Back</Button>
             <Button onClick={handleSaveAndNext} variant="contained" sx={{ background: `linear-gradient(135deg, ${PRIMARY_COLOR} 0%, #6d1d60 100%)`, color: 'white', borderRadius: '8px' }}>Save & Next</Button>
        </Box>
      </Box>
    </LocalizationProvider>
  );
};
export default Detail;
