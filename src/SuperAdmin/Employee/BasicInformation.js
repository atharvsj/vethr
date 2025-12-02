// // import React, { useState, useContext, useEffect } from 'react';
// // import { EmployeeContext } from './EmployeeContext';
// // import axiosInstance from "../../utils/axiosInstance";
// // import {
// //   Box, Grid, TextField, Typography, MenuItem, Button, FormControl, InputLabel, Select, CircularProgress, Alert
// // } from '@mui/material';
// // import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// // import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// // import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// // import dayjs from 'dayjs';

// // const BasicInformationForm = () => {
// //   const { employeeId } = useContext(EmployeeContext);
  
// //   const [formData, setFormData] = useState({
// //     first_name: '',
// //     middle_name: '',
// //     last_name: '',
// //     contact_number: '',
// //     gender: '',
// //     employee_id: '',
// //     date_of_birth: null,
// //     is_active: 1,
// //     marital_status: 0,
// //     role_id: '',
// //     religion_id: '',
// //     blood_group: '',
// //     country_id: '',
// //     state_id: '',
// //     city: '',
// //     zip_code: '',
// //     address_1: '',
// //     address_2: '',
// //     employee_hub_id: '',
// //   });

// //   const [loading, setLoading] = useState(true);
// //   const [isSaving, setIsSaving] = useState(false);
// //   const [alertInfo, setAlertInfo] = useState({ show: false, message: '', severity: 'success' });
  
// //   const [religionOptions, setReligionOptions] = useState([]);
// //   const [roleOptions, setRoleOptions] = useState([]);
// //   const [countriesList, setCountriesList] = useState([]);
// //   const [statesList, setStatesList] = useState([]);
// //   const [employeeHubs, setEmployeeHubs] = useState([]);

// //   // --- MODIFIED: This useEffect now depends on employeeHubs to perform the lookup ---
// //   useEffect(() => {
// //     // Exit if we don't have the necessary data to proceed
// //     if (!employeeId || employeeHubs.length === 0) {
// //         if (!employeeId) setLoading(false); // Only stop loading if there is no employee
// //         return;
// //     }

// //     setLoading(true);
// //     axiosInstance
// //       .post('/api/emp_basic_info/', { user_id: employeeId })
// //       .then((response) => {
// //         const data = response.data?.data?.[0];
// //         if (data) {
// //           // --- THE FIX: Find the hub ID using the hub name from the API ---
// //           const selectedHub = employeeHubs.find(hub => hub.employee_hub_name === data.employee_hub_name);
          
// //           const formattedData = {
// //             ...data,
// //             is_active: Number(data.is_active),
// //             marital_status: Number(data.marital_status),
// //             gender: Number(data.gender),
// //             role_id: Number(data.role_id),
// //             religion_id: Number(data.religion_id),
// //             country_id: Number(data.country_id || data.citizenship_id),
// //             state_id: Number(data.state_id),
// //             zip_code: data.zip_code || data.zipcode,
// //             employee_hub_id: selectedHub ? selectedHub.employee_hub_id : '', // Use the found ID
// //           };
// //           setFormData(formattedData);
// //         }
// //       })
// //       .catch((error) => {
// //         console.error('Error fetching employee detail:', error);
// //         setAlertInfo({ show: true, message: 'Failed to fetch employee details.', severity: 'error' });
// //       })
// //       .finally(() => {
// //           setLoading(false);
// //       });
// //   }, [employeeId, employeeHubs]); // Dependency array now includes employeeHubs

// //   useEffect(() => {
// //     const fetchDropdowns = async () => {
// //       try {
// //         const [religionRes, roleRes, countryRes, hubRes] = await Promise.all([
// //           axiosInstance.get('/api/religion-dropdown/'),
// //           axiosInstance.get('/roles/'),
// //           axiosInstance.get('/api/countries/'),
// //           axiosInstance.get('/api/employee_hub/')
// //         ]);
// //         setReligionOptions(religionRes.data || []);
// //         setRoleOptions(roleRes.data || []);
// //         if (countryRes.data.status === 'success') {
// //           setCountriesList(countryRes.data.data || []);
// //         }
// //         if (hubRes.data.status === 'success') {
// //           setEmployeeHubs(hubRes.data.data || []);
// //         }
// //       } catch (error) {
// //         console.error('Error fetching dropdown data:', error);
// //       }
// //     };
// //     fetchDropdowns();
// //   }, []);

// //   useEffect(() => {
// //     const fetchStates = async (countryName) => {
// //       try {
// //         const res = await axiosInstance.get(`/api/states/?country_name=${countryName}`);
// //         if (res.data.status === 'success') {
// //           setStatesList(res.data.data);
// //         }
// //       } catch (error) {
// //         console.error(`Error fetching states for ${countryName}:`, error);
// //         setStatesList([]);
// //       }
// //     };

// //     if (formData.country_id && countriesList.length > 0) {
// //       const selectedCountry = countriesList.find(c => c.country_id === formData.country_id);
// //       if (selectedCountry) {
// //         fetchStates(selectedCountry.country_name);
// //       }
// //     } else {
// //       setStatesList([]);
// //     }
// //   }, [formData.country_id, countriesList]);

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     const numericFields = [ 'gender', 'is_active', 'marital_status', 'role_id', 'religion_id', 'country_id', 'state_id', 'employee_hub_id' ];
// //     const finalValue = numericFields.includes(name) ? Number(value) : value;
// //     setFormData(prev => {
// //       const updatedState = { ...prev, [name]: finalValue };
// //       if (name === 'country_id') updatedState.state_id = '';
// //       return updatedState;
// //     });
// //   };

// //   const handleDateChange = (value) => {
// //     setFormData(prev => ({ ...prev, date_of_birth: value }));
// //   };

// //   const handleSubmit = async () => {
// //     if (!employeeId) {
// //       setAlertInfo({ show: true, message: 'Employee ID is missing. Cannot update.', severity: 'error' });
// //       return;
// //     }
// //     setIsSaving(true);
// //     setAlertInfo({ show: false, message: '', severity: 'success' });

// //     const payload = {
// //       ...formData,
// //       user_id: employeeId,
// //       date_of_birth: formData.date_of_birth ? dayjs(formData.date_of_birth).format('YYYY-MM-DD') : null,
// //       citizenship_id: formData.country_id,
// //       zipcode: formData.zip_code,
// //     };
// //     delete payload.country_id;
// //     delete payload.zip_code;
    
// //     try {
// //       await axiosInstance.patch('/api/emp_basic_info/', payload);
// //       setAlertInfo({ show: true, message: 'Profile updated successfully!', severity: 'success' });
// //     } catch (error) {
// //       console.error('Error updating profile:', error.response?.data || error.message);
// //       setAlertInfo({ show: true, message: 'Failed to update profile. Please try again.', severity: 'error' });
// //     } finally {
// //       setIsSaving(false);
// //     }
// //   };

// //   if (loading) {
// //     return <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress /></Box>
// //   }

// //   return (
// //     <Box sx={{ p: 3 }}>
// //       <Typography variant="h6" gutterBottom>🟣 Basic Information</Typography>
      
// //       {alertInfo.show && (
// //           <Alert severity={alertInfo.severity} sx={{ mb: 2 }} onClose={() => setAlertInfo(prev => ({...prev, show: false}))}>
// //               {alertInfo.message}
// //           </Alert>
// //       )}

// //       <Grid container spacing={2}>
// //         <Grid item xs={12} sm={4}><TextField fullWidth label="First Name" name="first_name" value={formData.first_name || ''} onChange={handleChange} required /></Grid>
// //         <Grid item xs={12} sm={4}><TextField fullWidth label="Middle Name" name="middle_name" value={formData.middle_name || ''} onChange={handleChange} /></Grid>
// //         <Grid item xs={12} sm={4}><TextField fullWidth label="Last Name" name="last_name" value={formData.last_name || ''} onChange={handleChange} required /></Grid>
// //         <Grid item xs={12} sm={8}><TextField fullWidth label="Contact Number" name="contact_number" value={formData.contact_number || ''} onChange={handleChange} /></Grid>
// //         <Grid item xs={12} sm={4}><FormControl fullWidth><InputLabel>Gender</InputLabel><Select name="gender" value={formData.gender || ""} onChange={handleChange} label="Gender"><MenuItem value={1}>Male</MenuItem><MenuItem value={2}>Female</MenuItem><MenuItem value={3}>Other</MenuItem></Select></FormControl></Grid>
        
// //         <Grid item xs={12} sm={4}><TextField fullWidth label="Employee ID" name="employee_id" value={formData.employee_id || ''} onChange={handleChange} required /></Grid>
// //         <Grid item xs={12} sm={4}>
// //           <FormControl fullWidth>
// //             <InputLabel>Employee Hub</InputLabel>
// //             <Select name="employee_hub_id" value={formData.employee_hub_id || ''} onChange={handleChange} label="Employee Hub">
// //               {employeeHubs.map(hub => ( <MenuItem key={hub.employee_hub_id} value={hub.employee_hub_id}>{hub.employee_hub_name}</MenuItem> ))}
// //             </Select>
// //           </FormControl>
// //         </Grid>
// //         <Grid item xs={12} sm={4}>
// //           <LocalizationProvider dateAdapter={AdapterDayjs}>
// //             <DatePicker label="Date of Birth" value={formData.date_of_birth ? dayjs(formData.date_of_birth) : null} onChange={handleDateChange} format="DD-MM-YYYY" slotProps={{ textField: { fullWidth: true } }} />
// //           </LocalizationProvider>
// //         </Grid>

// //         <Grid item xs={12} sm={4}><FormControl fullWidth variant="outlined"><InputLabel>Status</InputLabel><Select name="is_active" value={formData.is_active} onChange={handleChange} label="Status"><MenuItem value={1}>Active</MenuItem><MenuItem value={0}>Inactive</MenuItem></Select></FormControl></Grid>
// //         <Grid item xs={12} sm={4}><FormControl fullWidth><InputLabel>Marital Status</InputLabel><Select name="marital_status" value={formData.marital_status} onChange={handleChange} label="Marital Status"><MenuItem value={0}>Single</MenuItem><MenuItem value={1}>Married</MenuItem></Select></FormControl></Grid>
// //         <Grid item xs={12} sm={4}><FormControl fullWidth><InputLabel>Role</InputLabel><Select name="role_id" value={formData.role_id || ''} onChange={handleChange} label="Role">{roleOptions.map(role => (<MenuItem key={role.role_id} value={role.role_id}>{role.role_name}</MenuItem>))}</Select></FormControl></Grid>
// //         <Grid item xs={12} sm={4}><FormControl fullWidth><InputLabel>Religion</InputLabel><Select name="religion_id" value={formData.religion_id || ''} onChange={handleChange} label="Religion">{religionOptions.map((option) => (<MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>))}</Select></FormControl></Grid>
// //         <Grid item xs={12} sm={4}><FormControl fullWidth><InputLabel>Blood Group</InputLabel><Select name="blood_group" value={formData.blood_group || ''} onChange={handleChange} label="Blood Group"><MenuItem value="A+">A+</MenuItem><MenuItem value="A-">A-</MenuItem><MenuItem value="B+">B+</MenuItem><MenuItem value="B-">B-</MenuItem><MenuItem value="O+">O+</MenuItem><MenuItem value="O-">O-</MenuItem><MenuItem value="AB+">AB+</MenuItem><MenuItem value="AB-">AB-</MenuItem></Select></FormControl></Grid>
// //         <Grid item xs={12} sm={4}><FormControl fullWidth><InputLabel>Citizenship (Country)</InputLabel><Select name="country_id" value={formData.country_id || ''} onChange={handleChange} label="Citizenship (Country)">{countriesList.map((country) => (<MenuItem key={country.country_id} value={country.country_id}>{country.country_name}</MenuItem>))}</Select></FormControl></Grid>
// //         <Grid item xs={12} sm={4}><FormControl fullWidth disabled={!formData.country_id || statesList.length === 0}><InputLabel>State / Province</InputLabel><Select name="state_id" value={formData.state_id || ''} onChange={handleChange} label="State / Province">{statesList.map((state) => (<MenuItem key={state.state_id} value={state.state_id}>{state.state_name}</MenuItem>))}</Select></FormControl></Grid>
// //         <Grid item xs={12} sm={4}><TextField fullWidth label="City" name="city" value={formData.city ||''} onChange={handleChange} /></Grid>
// //         <Grid item xs={12} sm={4}><TextField fullWidth label="Zip Code / Postal Code" name="zip_code" value={formData.zip_code ||''} onChange={handleChange} /></Grid>
// //         <Grid item xs={12} sm={6}><TextField fullWidth label="Address Line 1" name="address_1" value={formData.address_1 || ''} onChange={handleChange} /></Grid>
// //         <Grid item xs={12} sm={6}><TextField fullWidth label="Address Line 2" name="address_2" value={formData.address_2 || ''} onChange={handleChange} /></Grid>
// //         <Grid item xs={12}>
// //           <Box display="flex" justifyContent="flex-end">
// //             <Button variant="contained" color="primary" sx={{ textTransform: 'none', px: 4 }} onClick={handleSubmit} disabled={isSaving}>
// //               {isSaving ? <CircularProgress size={24} color="inherit" /> : 'Update Profile'}
// //             </Button>
// //           </Box>
// //         </Grid>
// //       </Grid>
// //     </Box>
// //   );
// // };

// //  export default BasicInformationForm;
// import React, { useState, useContext, useEffect } from 'react';
// import { EmployeeContext } from './EmployeeContext';
// import axiosInstance from "../../utils/axiosInstance";
// import {
//   Box, Grid, TextField, Typography, MenuItem, Button, FormControl, InputLabel, Select, CircularProgress
// } from '@mui/material';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import dayjs from 'dayjs';
// // 1. Import SweetAlert2
// import Swal from 'sweetalert2';

// const BasicInformationForm = () => {
//   const { employeeId } = useContext(EmployeeContext);
  
//   const [formData, setFormData] = useState({
//     first_name: '',
//     middle_name: '',
//     last_name: '',
//     contact_number: '',
//     gender: '',
//     employee_id: '',
//     date_of_birth: null,
//     is_active: 1,
//     marital_status: 0,
//     role_id: '',
//     religion_id: '',
//     blood_group: '',
//     country_id: '',
//     state_id: '',
//     city: '',
//     zip_code: '',
//     address_1: '',
//     address_2: '',
//     employee_hub_id: '',
//   });

//   const [loading, setLoading] = useState(true);
  
//   const [religionOptions, setReligionOptions] = useState([]);
//   const [roleOptions, setRoleOptions] = useState([]);
//   const [countriesList, setCountriesList] = useState([]);
//   const [statesList, setStatesList] = useState([]);
//   const [employeeHubs, setEmployeeHubs] = useState([]);

//   useEffect(() => {
//     if (!employeeId || employeeHubs.length === 0) {
//         if (!employeeId) setLoading(false);
//         return;
//     }

//     setLoading(true);
//     axiosInstance
//       .post('/api/emp_basic_info/', { user_id: employeeId })
//       .then((response) => {
//         const data = response.data?.data?.[0];
//         if (data) {
//           const selectedHub = employeeHubs.find(hub => hub.employee_hub_name === data.employee_hub_name);
          
//           const formattedData = {
//             ...data,
//             is_active: Number(data.is_active),
//             marital_status: Number(data.marital_status),
//             gender: Number(data.gender),
//             role_id: Number(data.role_id),
//             religion_id: Number(data.religion_id),
//             country_id: Number(data.country_id || data.citizenship_id),
//             state_id: Number(data.state_id),
//             zip_code: data.zip_code || data.zipcode,
//             employee_hub_id: selectedHub ? selectedHub.employee_hub_id : '',
//           };
//           setFormData(formattedData);
//         }
//       })
//       .catch((error) => {
//         console.error('Error fetching employee detail:', error);
//         // 2. Use Swal for fetch errors
//         Swal.fire({
//           icon: 'error',
//           title: 'Fetch Error',
//           text: 'Failed to fetch employee details. Please try again.'
//         });
//       })
//       .finally(() => {
//           setLoading(false);
//       });
//   }, [employeeId, employeeHubs]);

//   useEffect(() => {
//     const fetchDropdowns = async () => {
//       try {
//         const [religionRes, roleRes, countryRes, hubRes] = await Promise.all([
//           axiosInstance.get('/api/religion-dropdown/'),
//           axiosInstance.get('/roles/'),
//           axiosInstance.get('/api/countries/'),
//           axiosInstance.get('/api/employee_hub/')
//         ]);
//         setReligionOptions(religionRes.data || []);
//         setRoleOptions(roleRes.data || []);
//         if (countryRes.data.status === 'success') {
//           setCountriesList(countryRes.data.data || []);
//         }
//         if (hubRes.data.status === 'success') {
//           setEmployeeHubs(hubRes.data.data || []);
//         }
//       } catch (error) {
//         console.error('Error fetching dropdown data:', error);
//       }
//     };
//     fetchDropdowns();
//   }, []);

//   useEffect(() => {
//     const fetchStates = async (countryName) => {
//       try {
//         const res = await axiosInstance.get(`/api/states/?country_name=${countryName}`);
//         if (res.data.status === 'success') {
//           setStatesList(res.data.data);
//         }
//       } catch (error) {
//         console.error(`Error fetching states for ${countryName}:`, error);
//         setStatesList([]);
//       }
//     };

//     if (formData.country_id && countriesList.length > 0) {
//       const selectedCountry = countriesList.find(c => c.country_id === formData.country_id);
//       if (selectedCountry) {
//         fetchStates(selectedCountry.country_name);
//       }
//     } else {
//       setStatesList([]);
//     }
//   }, [formData.country_id, countriesList]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     const numericFields = [ 'gender', 'is_active', 'marital_status', 'role_id', 'religion_id', 'country_id', 'state_id', 'employee_hub_id' ];
//     const finalValue = numericFields.includes(name) ? Number(value) : value;
//     setFormData(prev => {
//       const updatedState = { ...prev, [name]: finalValue };
//       if (name === 'country_id') updatedState.state_id = '';
//       return updatedState;
//     });
//   };

//   const handleDateChange = (value) => {
//     setFormData(prev => ({ ...prev, date_of_birth: value }));
//   };

//   const handleSubmit = async () => {
//     // 3. Use Swal for validation
//     if (!employeeId) {
//       Swal.fire({
//         icon: 'error',
//         title: 'Missing Information',
//         text: 'Employee ID is missing. Cannot update.',
//       });
//       return;
//     }
    
//     // 4. Use Swal for loading state
//     Swal.fire({
//       title: 'Updating Profile...',
//       text: 'Please wait.',
//       allowOutsideClick: false,
//       didOpen: () => {
//         Swal.showLoading();
//       },
//     });

//     const payload = {
//       ...formData,
//       user_id: employeeId,
//       date_of_birth: formData.date_of_birth ? dayjs(formData.date_of_birth).format('YYYY-MM-DD') : null,
//       citizenship_id: formData.country_id,
//       zipcode: formData.zip_code,
//     };
//     delete payload.country_id;
//     delete payload.zip_code;
    
//     try {
//       await axiosInstance.patch('/api/emp_basic_info/', payload);
//       // 5. Use Swal for success message
//       Swal.fire({
//         icon: 'success',
//         title: 'Updated!',
//         text: 'Profile updated successfully!',
//       });
//     } catch (error) {
//       console.error('Error updating profile:', error.response?.data || error.message);
//       const errorMessage = error.response?.data?.message || 'Failed to update profile. Please try again.';
//       // 6. Use Swal for error message
//       Swal.fire({
//         icon: 'error',
//         title: 'Update Failed',
//         text: errorMessage,
//       });
//     }
//   };

//   if (loading) {
//     return <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress /></Box>
//   }

//   return (
//     <Box sx={{ p: 3 }}>
//       <Typography variant="h6" gutterBottom>🟣 Basic Information</Typography>
      
//       {/* The Alert component is no longer needed */}

//       <Grid container spacing={2}>
//         <Grid item xs={12} sm={4}><TextField fullWidth label="First Name" name="first_name" value={formData.first_name || ''} onChange={handleChange} required /></Grid>
//         <Grid item xs={12} sm={4}><TextField fullWidth label="Middle Name" name="middle_name" value={formData.middle_name || ''} onChange={handleChange} /></Grid>
//         <Grid item xs={12} sm={4}><TextField fullWidth label="Last Name" name="last_name" value={formData.last_name || ''} onChange={handleChange} required /></Grid>
//         <Grid item xs={12} sm={8}><TextField fullWidth label="Contact Number" name="contact_number" value={formData.contact_number || ''} onChange={handleChange} /></Grid>
//         <Grid item xs={12} sm={4}><FormControl fullWidth><InputLabel>Gender</InputLabel><Select name="gender" value={formData.gender || ""} onChange={handleChange} label="Gender"><MenuItem value={1}>Male</MenuItem><MenuItem value={2}>Female</MenuItem><MenuItem value={3}>Other</MenuItem></Select></FormControl></Grid>
        
//         <Grid item xs={12} sm={4}><TextField fullWidth label="Employee ID" name="employee_id" value={formData.employee_id || ''} onChange={handleChange} required /></Grid>
//         <Grid item xs={12} sm={4}>
//           <FormControl fullWidth>
//             <InputLabel>Employee Hub</InputLabel>
//             <Select name="employee_hub_id" value={formData.employee_hub_id || ''} onChange={handleChange} label="Employee Hub">
//               {employeeHubs.map(hub => ( <MenuItem key={hub.employee_hub_id} value={hub.employee_hub_id}>{hub.employee_hub_name}</MenuItem> ))}
//             </Select>
//           </FormControl>
//         </Grid>
//         <Grid item xs={12} sm={4}>
//           <LocalizationProvider dateAdapter={AdapterDayjs}>
//             <DatePicker label="Date of Birth" value={formData.date_of_birth ? dayjs(formData.date_of_birth) : null} onChange={handleDateChange} format="DD-MM-YYYY" slotProps={{ textField: { fullWidth: true } }} />
//           </LocalizationProvider>
//         </Grid>

//         <Grid item xs={12} sm={4}><FormControl fullWidth variant="outlined"><InputLabel>Status</InputLabel><Select name="is_active" value={formData.is_active} onChange={handleChange} label="Status"><MenuItem value={1}>Active</MenuItem><MenuItem value={0}>Inactive</MenuItem></Select></FormControl></Grid>
//         <Grid item xs={12} sm={4}><FormControl fullWidth><InputLabel>Marital Status</InputLabel><Select name="marital_status" value={formData.marital_status} onChange={handleChange} label="Marital Status"><MenuItem value={0}>Single</MenuItem><MenuItem value={1}>Married</MenuItem></Select></FormControl></Grid>
//         <Grid item xs={12} sm={4}><FormControl fullWidth><InputLabel>Role</InputLabel><Select name="role_id" value={formData.role_id || ''} onChange={handleChange} label="Role">{roleOptions.map(role => (<MenuItem key={role.role_id} value={role.role_id}>{role.role_name}</MenuItem>))}</Select></FormControl></Grid>
//         <Grid item xs={12} sm={4}><FormControl fullWidth><InputLabel>Religion</InputLabel><Select name="religion_id" value={formData.religion_id || ''} onChange={handleChange} label="Religion">{religionOptions.map((option) => (<MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>))}</Select></FormControl></Grid>
//         <Grid item xs={12} sm={4}><FormControl fullWidth><InputLabel>Blood Group</InputLabel><Select name="blood_group" value={formData.blood_group || ''} onChange={handleChange} label="Blood Group"><MenuItem value="A+">A+</MenuItem><MenuItem value="A-">A-</MenuItem><MenuItem value="B+">B+</MenuItem><MenuItem value="B-">B-</MenuItem><MenuItem value="O+">O+</MenuItem><MenuItem value="O-">O-</MenuItem><MenuItem value="AB+">AB+</MenuItem><MenuItem value="AB-">AB-</MenuItem></Select></FormControl></Grid>
//         <Grid item xs={12} sm={4}><FormControl fullWidth><InputLabel>Citizenship (Country)</InputLabel><Select name="country_id" value={formData.country_id || ''} onChange={handleChange} label="Citizenship (Country)">{countriesList.map((country) => (<MenuItem key={country.country_id} value={country.country_id}>{country.country_name}</MenuItem>))}</Select></FormControl></Grid>
//         <Grid item xs={12} sm={4}><FormControl fullWidth disabled={!formData.country_id || statesList.length === 0}><InputLabel>State / Province</InputLabel><Select name="state_id" value={formData.state_id || ''} onChange={handleChange} label="State / Province">{statesList.map((state) => (<MenuItem key={state.state_id} value={state.state_id}>{state.state_name}</MenuItem>))}</Select></FormControl></Grid>
//         <Grid item xs={12} sm={4}><TextField fullWidth label="City" name="city" value={formData.city ||''} onChange={handleChange} /></Grid>
//         <Grid item xs={12} sm={4}><TextField fullWidth label="Zip Code / Postal Code" name="zip_code" value={formData.zip_code ||''} onChange={handleChange} /></Grid>
//         <Grid item xs={12} sm={6}><TextField fullWidth label="Address Line 1" name="address_1" value={formData.address_1 || ''} onChange={handleChange} /></Grid>
//         <Grid item xs={12} sm={6}><TextField fullWidth label="Address Line 2" name="address_2" value={formData.address_2 || ''} onChange={handleChange} /></Grid>
//         <Grid item xs={12}>
//           <Box display="flex" justifyContent="flex-end">
//             <Button variant="contained" color="primary" sx={{ textTransform: 'none', px: 4 }} onClick={handleSubmit}>
//               Update Profile
//             </Button>
//           </Box>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// export default BasicInformationForm;
// import React, { useState, useContext, useEffect } from 'react';
// import { EmployeeContext } from './EmployeeContext';
// import axiosInstance from "../../utils/axiosInstance";
// import {
//   Box, Grid, TextField, Typography, MenuItem, Button, FormControl, InputLabel, Select, CircularProgress
// } from '@mui/material';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import dayjs from 'dayjs';
// // 1. Import SweetAlert2
// import Swal from 'sweetalert2';

// const BasicInformationForm = () => {
//   const { employeeId } = useContext(EmployeeContext);
  
//   const [formData, setFormData] = useState({
//     first_name: '',
//     middle_name: '',
//     last_name: '',
//     contact_number: '',
//     gender: '', // Will be a number for the dropdown
//     employee_id: '',
//     date_of_birth: null,
//     is_active: 1,
//     marital_status: 0,
//     role_id: '',
//     religion_id: '',
//     blood_group: '',
//     country_id: '',
//     state_id: '',
//     city: '',
//     zip_code: '',
//     address_1: '',
//     address_2: '',
//     employee_hub_id: '',
//   });

//   const [loading, setLoading] = useState(true);
  
//   const [religionOptions, setReligionOptions] = useState([]);
//   const [roleOptions, setRoleOptions] = useState([]);
//   const [countriesList, setCountriesList] = useState([]);
//   const [statesList, setStatesList] = useState([]); // Back to a simple states list
//   const [employeeHubs, setEmployeeHubs] = useState([]);

//   // **FIX: Helper function to convert gender string from API to numeric value for the form**
//   const genderStringToValue = (genderStr) => {
//     if (!genderStr) return '';
//     const lowerCaseGender = genderStr.toLowerCase();
//     if (lowerCaseGender === 'male') return 1;
//     if (lowerCaseGender === 'female') return 2;
//     if (lowerCaseGender === 'other') return 3;
//     return ''; // Return empty if no match
//   };

//   useEffect(() => {
//     const fetchDropdowns = async () => {
//       try {
//         const [religionRes, roleRes, countryRes, hubRes] = await Promise.all([
//           axiosInstance.get('/api/religion-dropdown/'),
//           axiosInstance.get('/roles/'),
//           axiosInstance.get('/api/countries/'),
//           axiosInstance.get('/api/employee_hub/')
//         ]);
//         setReligionOptions(religionRes.data || []);
//         setRoleOptions(roleRes.data || []);
//         if (countryRes.data.status === 'success') {
//           setCountriesList(countryRes.data.data || []);
//         }
//         if (hubRes.data.status === 'success') {
//           setEmployeeHubs(hubRes.data.data || []);
//         }
//       } catch (error) {
//         console.error('Error fetching dropdown data:', error);
//       }
//     };
//     fetchDropdowns();
//   }, []);

//   useEffect(() => {
//     // We can proceed if we have an employeeId and the hubs list is populated
//     if (!employeeId || employeeHubs.length === 0) {
//         if (!employeeId) setLoading(false);
//         return;
//     }

//     setLoading(true);
//     axiosInstance
//       .post('/api/emp_basic_info/', { user_id: employeeId })
//       .then((response) => {
//         const data = response.data?.data?.[0];
//         if (data) {
//           const selectedHub = employeeHubs.find(hub => hub.employee_hub_name === data.employee_hub_name);
          
//           const formattedData = {
//             ...data,
//             is_active: Number(data.is_active),
//             marital_status: Number(data.marital_status),
//             // **FIX: Use the helper function to set the correct numeric value for gender**
//             gender: genderStringToValue(data.gender),
//             role_id: Number(data.role_id),
//             religion_id: Number(data.religion_id),
//             country_id: Number(data.country_id || data.citizenship_id),
//             state_id: Number(data.state_id),
//             zip_code: data.zip_code || data.zipcode,
//             employee_hub_id: selectedHub ? selectedHub.employee_hub_id : '',
//           };
//           setFormData(formattedData);
//         }
//       })
//       .catch((error) => {
//         console.error('Error fetching employee detail:', error);
//         Swal.fire({
//           icon: 'error',
//           title: 'Fetch Error',
//           text: 'Failed to fetch employee details. Please try again.'
//         });
//       })
//       .finally(() => {
//           setLoading(false);
//       });
//   }, [employeeId, employeeHubs]); // Dependency on employeeHubs ensures it runs after hubs are fetched

//   // Original logic for fetching states when a country is selected
//   useEffect(() => {
//     const fetchStates = async (countryName) => {
//       try {
//         const res = await axiosInstance.get(`/api/states/?country_name=${countryName}`);
//         if (res.data.status === 'success') {
//           setStatesList(res.data.data);
//         }
//       } catch (error) {
//         console.error(`Error fetching states for ${countryName}:`, error);
//         setStatesList([]);
//       }
//     };

//     if (formData.country_id && countriesList.length > 0) {
//       const selectedCountry = countriesList.find(c => c.country_id === formData.country_id);
//       if (selectedCountry) {
//         fetchStates(selectedCountry.country_name);
//       }
//     } else {
//       setStatesList([]);
//     }
//   }, [formData.country_id, countriesList]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     const numericFields = [ 'gender', 'is_active', 'marital_status', 'role_id', 'religion_id', 'country_id', 'state_id', 'employee_hub_id' ];
//     const finalValue = numericFields.includes(name) ? Number(value) : value;
//     setFormData(prev => {
//       const updatedState = { ...prev, [name]: finalValue };
//       if (name === 'country_id') updatedState.state_id = '';
//       return updatedState;
//     });
//   };

//   const handleDateChange = (value) => {
//     setFormData(prev => ({ ...prev, date_of_birth: value }));
//   };

//   const handleSubmit = async () => {
//     if (!employeeId) {
//       Swal.fire({
//         icon: 'error',
//         title: 'Missing Information',
//         text: 'Employee ID is missing. Cannot update.',
//       });
//       return;
//     }
    
//     Swal.fire({
//       title: 'Updating Profile...',
//       text: 'Please wait.',
//       allowOutsideClick: false,
//       didOpen: () => {
//         Swal.showLoading();
//       },
//     });

//     const payload = {
//       ...formData,
//       user_id: employeeId,
//       date_of_birth: formData.date_of_birth ? dayjs(formData.date_of_birth).format('YYYY-MM-DD') : null,
//       citizenship_id: formData.country_id,
//       zipcode: formData.zip_code,
//     };
//     delete payload.country_id;
//     delete payload.zip_code;
    
//     try {
//       await axiosInstance.patch('/api/emp_basic_info/', payload);
//       Swal.fire({
//         icon: 'success',
//         title: 'Updated!',
//         text: 'Profile updated successfully!',
//       });
//     } catch (error) {
//       console.error('Error updating profile:', error.response?.data || error.message);
//       const errorMessage = error.response?.data?.message || 'Failed to update profile. Please try again.';
//       Swal.fire({
//         icon: 'error',
//         title: 'Update Failed',
//         text: errorMessage,
//       });
//     }
//   };

//   if (loading) {
//     return <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress /></Box>
//   }

//   return (
//     <Box sx={{ p: 3 }}>
//       <Typography variant="h6" gutterBottom>🟣 Basic Information</Typography>
      
//       <Grid container spacing={2}>
//         <Grid item xs={12} sm={4}><TextField fullWidth label="First Name" name="first_name" value={formData.first_name || ''} onChange={handleChange} required /></Grid>
//         <Grid item xs={12} sm={4}><TextField fullWidth label="Middle Name" name="middle_name" value={formData.middle_name || ''} onChange={handleChange} /></Grid>
//         <Grid item xs={12} sm={4}><TextField fullWidth label="Last Name" name="last_name" value={formData.last_name || ''} onChange={handleChange} required /></Grid>
//         <Grid item xs={12} sm={8}><TextField fullWidth label="Contact Number" name="contact_number" value={formData.contact_number || ''} onChange={handleChange} /></Grid>
//         <Grid item xs={12} sm={4}>
//             <FormControl fullWidth>
//                 <InputLabel>Gender</InputLabel>
//                 <Select name="gender" value={formData.gender || ""} onChange={handleChange} label="Gender">
//                     <MenuItem value={1}>Male</MenuItem>
//                     <MenuItem value={2}>Female</MenuItem>
//                     <MenuItem value={3}>Other</MenuItem>
//                 </Select>
//             </FormControl>
//         </Grid>
        
//         <Grid item xs={12} sm={4}><TextField fullWidth label="Employee ID" name="employee_id" value={formData.employee_id || ''} onChange={handleChange} required /></Grid>
//         <Grid item xs={12} sm={4}>
//           <FormControl fullWidth>
//             <InputLabel>Employee Hub</InputLabel>
//             <Select name="employee_hub_id" value={formData.employee_hub_id || ''} onChange={handleChange} label="Employee Hub">
//               {employeeHubs.map(hub => ( <MenuItem key={hub.employee_hub_id} value={hub.employee_hub_id}>{hub.employee_hub_name}</MenuItem> ))}
//             </Select>
//           </FormControl>
//         </Grid>
//         <Grid item xs={12} sm={4}>
//           <LocalizationProvider dateAdapter={AdapterDayjs}>
//             <DatePicker label="Date of Birth" value={formData.date_of_birth ? dayjs(formData.date_of_birth) : null} onChange={handleDateChange} format="DD-MM-YYYY" slotProps={{ textField: { fullWidth: true } }} />
//           </LocalizationProvider>
//         </Grid>

//         <Grid item xs={12} sm={4}><FormControl fullWidth variant="outlined"><InputLabel>Status</InputLabel><Select name="is_active" value={formData.is_active} onChange={handleChange} label="Status"><MenuItem value={1}>Active</MenuItem><MenuItem value={0}>Inactive</MenuItem></Select></FormControl></Grid>
//         <Grid item xs={12} sm={4}><FormControl fullWidth><InputLabel>Marital Status</InputLabel><Select name="marital_status" value={formData.marital_status} onChange={handleChange} label="Marital Status"><MenuItem value={0}>Single</MenuItem><MenuItem value={1}>Married</MenuItem></Select></FormControl></Grid>
//         <Grid item xs={12} sm={4}><FormControl fullWidth><InputLabel>Role</InputLabel><Select name="role_id" value={formData.role_id || ''} onChange={handleChange} label="Role">{roleOptions.map(role => (<MenuItem key={role.role_id} value={role.role_id}>{role.role_name}</MenuItem>))}</Select></FormControl></Grid>
//         <Grid item xs={12} sm={4}><FormControl fullWidth><InputLabel>Religion</InputLabel><Select name="religion_id" value={formData.religion_id || ''} onChange={handleChange} label="Religion">{religionOptions.map((option) => (<MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>))}</Select></FormControl></Grid>
//         <Grid item xs={12} sm={4}><FormControl fullWidth><InputLabel>Blood Group</InputLabel><Select name="blood_group" value={formData.blood_group || ''} onChange={handleChange} label="Blood Group"><MenuItem value="A+">A+</MenuItem><MenuItem value="A-">A-</MenuItem><MenuItem value="B+">B+</MenuItem><MenuItem value="B-">B-</MenuItem><MenuItem value="O+">O+</MenuItem><MenuItem value="O-">O-</MenuItem><MenuItem value="AB+">AB+</MenuItem><MenuItem value="AB-">AB-</MenuItem></Select></FormControl></Grid>
//         <Grid item xs={12} sm={4}><FormControl fullWidth><InputLabel>Citizenship (Country)</InputLabel><Select name="country_id" value={formData.country_id || ''} onChange={handleChange} label="Citizenship (Country)">{countriesList.map((country) => (<MenuItem key={country.country_id} value={country.country_id}>{country.country_name}</MenuItem>))}</Select></FormControl></Grid>
//         <Grid item xs={12} sm={4}><FormControl fullWidth disabled={!formData.country_id || statesList.length === 0}><InputLabel>State / Province</InputLabel><Select name="state_id" value={formData.state_id || ''} onChange={handleChange} label="State / Province">{statesList.map((state) => (<MenuItem key={state.state_id} value={state.state_id}>{state.state_name}</MenuItem>))}</Select></FormControl></Grid>
//         <Grid item xs={12} sm={4}><TextField fullWidth label="City" name="city" value={formData.city ||''} onChange={handleChange} /></Grid>
//         <Grid item xs={12} sm={4}><TextField fullWidth label="Zip Code / Postal Code" name="zip_code" value={formData.zip_code ||''} onChange={handleChange} /></Grid>
//         <Grid item xs={12} sm={6}><TextField fullWidth label="Address Line 1" name="address_1" value={formData.address_1 || ''} onChange={handleChange} /></Grid>
//         <Grid item xs={12} sm={6}><TextField fullWidth label="Address Line 2" name="address_2" value={formData.address_2 || ''} onChange={handleChange} /></Grid>
//         <Grid item xs={12}>
//           <Box display="flex" justifyContent="flex-end">
//             <Button variant="contained" color="primary" sx={{ textTransform: 'none', px: 4 }} onClick={handleSubmit}>
//               Update Profile
//             </Button>
//           </Box>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// export default BasicInformationForm;
// import React, { useState, useContext, useEffect } from 'react';
// import { EmployeeContext } from './EmployeeContext';
// import axiosInstance from "../../utils/axiosInstance";
// import {
//   Box, Grid, TextField, Typography, MenuItem, Button, FormControl, InputLabel, Select, CircularProgress
// } from '@mui/material';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import dayjs from 'dayjs';
// import Swal from 'sweetalert2';

// const BasicInformationForm = () => {
//   const { employeeId } = useContext(EmployeeContext);
  
//   const [formData, setFormData] = useState({
//     first_name: '',
//     middle_name: '',
//     last_name: '',
//     contact_number: '',
//     age: '', // **NEW: Added age field**
//     gender: '',
//     employee_id: '',
//     date_of_birth: null,
//     is_active: 1,
//     marital_status: 0,
//     role_id: '',
//     religion_id: '',
//     blood_group: '',
//     country_id: '',
//     state_id: '',
//     city: '',
//     zip_code: '',
//     address_1: '',
//     address_2: '',
//     employee_hub_id: '',
//   });

//   const [loading, setLoading] = useState(true);
  
//   const [religionOptions, setReligionOptions] = useState([]);
//   const [roleOptions, setRoleOptions] = useState([]);
//   const [countriesList, setCountriesList] = useState([]);
//   const [statesList, setStatesList] = useState([]);
//   const [employeeHubs, setEmployeeHubs] = useState([]);

//   const genderStringToValue = (genderStr) => {
//     if (!genderStr) return '';
//     const lowerCaseGender = genderStr.toLowerCase();
//     if (lowerCaseGender === 'male') return 1;
//     if (lowerCaseGender === 'female') return 2;
//     if (lowerCaseGender === 'other') return 3;
//     return '';
//   };

//   useEffect(() => {
//     const fetchDropdowns = async () => {
//       try {
//         const [religionRes, roleRes, countryRes, hubRes] = await Promise.all([
//           axiosInstance.get('/api/religion-dropdown/'),
//           axiosInstance.get('/roles/'),
//           axiosInstance.get('/api/countries/'),
//           axiosInstance.get('/api/employee_hub/')
//         ]);
//         setReligionOptions(religionRes.data || []);
//         setRoleOptions(roleRes.data || []);
//         if (countryRes.data.status === 'success') {
//           setCountriesList(countryRes.data.data || []);
//         }
//         if (hubRes.data.status === 'success') {
//           setEmployeeHubs(hubRes.data.data || []);
//         }
//       } catch (error) {
//         console.error('Error fetching dropdown data:', error);
//       }
//     };
//     fetchDropdowns();
//   }, []);

//   useEffect(() => {
//     if (!employeeId || employeeHubs.length === 0) {
//         if (!employeeId) setLoading(false);
//         return;
//     }

//     setLoading(true);
//     axiosInstance
//       .post('/api/emp_basic_info/', { user_id: employeeId })
//       .then((response) => {
//         const data = response.data?.data?.[0];
//         if (data) {
//           const selectedHub = employeeHubs.find(hub => hub.employee_hub_name === data.employee_hub_name);
          
//           const formattedData = {
//             ...data,
//             is_active: Number(data.is_active),
//             marital_status: Number(data.marital_status),
//             gender: genderStringToValue(data.gender),
//             role_id: Number(data.role_id),
//             religion_id: Number(data.religion_id),
//             country_id: Number(data.country_id || data.citizenship_id),
//             state_id: Number(data.state_id),
//             zip_code: data.zip_code || data.zipcode,
//             employee_hub_id: selectedHub ? selectedHub.employee_hub_id : '',
//           };
//           setFormData(formattedData);
//         }
//       })
//       .catch((error) => {
//         console.error('Error fetching employee detail:', error);
//         Swal.fire({
//           icon: 'error',
//           title: 'Fetch Error',
//           text: 'Failed to fetch employee details. Please try again.'
//         });
//       })
//       .finally(() => {
//           setLoading(false);
//       });
//   }, [employeeId, employeeHubs]);

//   useEffect(() => {
//     const fetchStates = async (countryName) => {
//       try {
//         const res = await axiosInstance.get(`/api/states/?country_name=${countryName}`);
//         if (res.data.status === 'success') {
//           setStatesList(res.data.data);
//         }
//       } catch (error) {
//         console.error(`Error fetching states for ${countryName}:`, error);
//         setStatesList([]);
//       }
//     };

//     if (formData.country_id && countriesList.length > 0) {
//       const selectedCountry = countriesList.find(c => c.country_id === formData.country_id);
//       if (selectedCountry) {
//         fetchStates(selectedCountry.country_name);
//       }
//     } else {
//       setStatesList([]);
//     }
//   }, [formData.country_id, countriesList]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     // **NEW: age is now a numeric field**
//     const numericFields = [ 'age', 'gender', 'is_active', 'marital_status', 'role_id', 'religion_id', 'country_id', 'state_id', 'employee_hub_id' ];
//     const finalValue = numericFields.includes(name) ? Number(value) : value;
//     setFormData(prev => {
//       const updatedState = { ...prev, [name]: finalValue };
//       if (name === 'country_id') updatedState.state_id = '';
//       return updatedState;
//     });
//   };

//   const handleDateChange = (value) => {
//     setFormData(prev => ({ ...prev, date_of_birth: value }));
//   };

//   const handleSubmit = async () => {
//     if (!employeeId) {
//       Swal.fire({
//         icon: 'error',
//         title: 'Missing Information',
//         text: 'Employee ID is missing. Cannot update.',
//       });
//       return;
//     }
    
//     Swal.fire({
//       title: 'Updating Profile...',
//       text: 'Please wait.',
//       allowOutsideClick: false,
//       didOpen: () => {
//         Swal.showLoading();
//       },
//     });

//     const payload = {
//       ...formData,
//       user_id: employeeId,
//       date_of_birth: formData.date_of_birth ? dayjs(formData.date_of_birth).format('YYYY-MM-DD') : null,
//       citizenship_id: formData.country_id,
//       zipcode: formData.zip_code,
//       age: formData.age ? parseInt(formData.age, 10) : null, // **NEW: Parse age to integer**
//     };
//     delete payload.country_id;
//     delete payload.zip_code;
    
//     try {
//       await axiosInstance.patch('/api/emp_basic_info/', payload);
//       Swal.fire({
//         icon: 'success',
//         title: 'Updated!',
//         text: 'Profile updated successfully!',
//       });
//     } catch (error) {
//       console.error('Error updating profile:', error.response?.data || error.message);
//       const errorMessage = error.response?.data?.message || 'Failed to update profile. Please try again.';
//       Swal.fire({
//         icon: 'error',
//         title: 'Update Failed',
//         text: errorMessage,
//       });
//     }
//   };

//   if (loading) {
//     return <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress /></Box>
//   }

//   return (
//     <Box sx={{ p: 3 }}>
//       <Typography variant="h6" gutterBottom>🟣 Basic Information</Typography>
      
//       <Grid container spacing={2}>
//         <Grid item xs={12} sm={4}><TextField fullWidth label="First Name" name="first_name" value={formData.first_name || ''} onChange={handleChange} required /></Grid>
//         <Grid item xs={12} sm={4}><TextField fullWidth label="Middle Name" name="middle_name" value={formData.middle_name || ''} onChange={handleChange} /></Grid>
//         <Grid item xs={12} sm={4}><TextField fullWidth label="Last Name" name="last_name" value={formData.last_name || ''} onChange={handleChange} required /></Grid>
        
//         {/* ======================= START: UPDATED GRID LAYOUT ======================= */}
//         <Grid item xs={12} sm={5}><TextField fullWidth label="Contact Number" name="contact_number" value={formData.contact_number || ''} onChange={handleChange} /></Grid>
//         <Grid item xs={12} sm={3}><TextField fullWidth label="Age" name="age" type="number" value={formData.age || ''} onChange={handleChange} /></Grid>
//         <Grid item xs={12} sm={4}>
//             <FormControl fullWidth>
//                 <InputLabel>Gender</InputLabel>
//                 <Select name="gender" value={formData.gender || ""} onChange={handleChange} label="Gender">
//                     <MenuItem value={1}>Male</MenuItem>
//                     <MenuItem value={2}>Female</MenuItem>
//                     <MenuItem value={3}>Other</MenuItem>
//                 </Select>
//             </FormControl>
//         </Grid>
//         {/* ======================== END: UPDATED GRID LAYOUT ======================== */}
        
//         <Grid item xs={12} sm={4}><TextField fullWidth label="Employee ID" name="employee_id" value={formData.employee_id || ''} onChange={handleChange} required /></Grid>
//         <Grid item xs={12} sm={4}>
//           <FormControl fullWidth>
//             <InputLabel>Employee Hub</InputLabel>
//             <Select name="employee_hub_id" value={formData.employee_hub_id || ''} onChange={handleChange} label="Employee Hub">
//               {employeeHubs.map(hub => ( <MenuItem key={hub.employee_hub_id} value={hub.employee_hub_id}>{hub.employee_hub_name}</MenuItem> ))}
//             </Select>
//           </FormControl>
//         </Grid>
//         <Grid item xs={12} sm={4}>
//           <LocalizationProvider dateAdapter={AdapterDayjs}>
//             <DatePicker label="Date of Birth" value={formData.date_of_birth ? dayjs(formData.date_of_birth) : null} onChange={handleDateChange} format="DD-MM-YYYY" slotProps={{ textField: { fullWidth: true } }} />
//           </LocalizationProvider>
//         </Grid>

//         <Grid item xs={12} sm={4}><FormControl fullWidth variant="outlined"><InputLabel>Status</InputLabel><Select name="is_active" value={formData.is_active} onChange={handleChange} label="Status"><MenuItem value={1}>Active</MenuItem><MenuItem value={0}>Inactive</MenuItem></Select></FormControl></Grid>
//         <Grid item xs={12} sm={4}><FormControl fullWidth><InputLabel>Marital Status</InputLabel><Select name="marital_status" value={formData.marital_status} onChange={handleChange} label="Marital Status"><MenuItem value={0}>Single</MenuItem><MenuItem value={1}>Married</MenuItem></Select></FormControl></Grid>
//         <Grid item xs={12} sm={4}><FormControl fullWidth><InputLabel>Role</InputLabel><Select name="role_id" value={formData.role_id || ''} onChange={handleChange} label="Role">{roleOptions.map(role => (<MenuItem key={role.role_id} value={role.role_id}>{role.role_name}</MenuItem>))}</Select></FormControl></Grid>
//         <Grid item xs={12} sm={4}><FormControl fullWidth><InputLabel>Religion</InputLabel><Select name="religion_id" value={formData.religion_id || ''} onChange={handleChange} label="Religion">{religionOptions.map((option) => (<MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>))}</Select></FormControl></Grid>
//         <Grid item xs={12} sm={4}><FormControl fullWidth><InputLabel>Blood Group</InputLabel><Select name="blood_group" value={formData.blood_group || ''} onChange={handleChange} label="Blood Group"><MenuItem value="A+">A+</MenuItem><MenuItem value="A-">A-</MenuItem><MenuItem value="B+">B+</MenuItem><MenuItem value="B-">B-</MenuItem><MenuItem value="O+">O+</MenuItem><MenuItem value="O-">O-</MenuItem><MenuItem value="AB+">AB+</MenuItem><MenuItem value="AB-">AB-</MenuItem></Select></FormControl></Grid>
//         <Grid item xs={12} sm={4}><FormControl fullWidth><InputLabel>Citizenship (Country)</InputLabel><Select name="country_id" value={formData.country_id || ''} onChange={handleChange} label="Citizenship (Country)">{countriesList.map((country) => (<MenuItem key={country.country_id} value={country.country_id}>{country.country_name}</MenuItem>))}</Select></FormControl></Grid>
//         <Grid item xs={12} sm={4}><FormControl fullWidth disabled={!formData.country_id || statesList.length === 0}><InputLabel>State / Province</InputLabel><Select name="state_id" value={formData.state_id || ''} onChange={handleChange} label="State / Province">{statesList.map((state) => (<MenuItem key={state.state_id} value={state.state_id}>{state.state_name}</MenuItem>))}</Select></FormControl></Grid>
//         <Grid item xs={12} sm={4}><TextField fullWidth label="City" name="city" value={formData.city ||''} onChange={handleChange} /></Grid>
//         <Grid item xs={12} sm={4}><TextField fullWidth label="Zip Code / Postal Code" name="zip_code" value={formData.zip_code ||''} onChange={handleChange} /></Grid>
//         <Grid item xs={12} sm={6}><TextField fullWidth label="Address Line 1" name="address_1" value={formData.address_1 || ''} onChange={handleChange} /></Grid>
//         <Grid item xs={12} sm={6}><TextField fullWidth label="Address Line 2" name="address_2" value={formData.address_2 || ''} onChange={handleChange} /></Grid>
//         <Grid item xs={12}>
//           <Box display="flex" justifyContent="flex-end">
//             <Button variant="contained" color="primary" sx={{ textTransform: 'none', px: 4 }} onClick={handleSubmit}>
//               Update Profile
//             </Button>
//           </Box>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// export default BasicInformationForm;



// import React, { useState, useContext, useEffect } from 'react';
// import { EmployeeContext } from './EmployeeContext';
// import axiosInstance from "../../utils/axiosInstance";
// import {
//   Box, Grid, TextField, Typography, MenuItem, Button, FormControl, InputLabel, Select, CircularProgress
// } from '@mui/material';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import dayjs from 'dayjs';
// import Swal from 'sweetalert2';
 
// const BasicInformationForm = () => {
//   const { employeeId } = useContext(EmployeeContext);
 
//   const [formData, setFormData] = useState({
//     first_name: '',
//     middle_name: '',
//     last_name: '',
//     contact_number: '',
//     age: '',
//     gender: '',
//     employee_id: '',
//     date_of_birth: null,
//     is_active: 1, // Default to Active
//     marital_status: 0, // Default to Single
//     role_id: '',
//     religion_id: '',
//     blood_group: '',
//     country_id: '',
//     state_id: '',
//     city: '',
//     zip_code: '',
//     address_1: '',
//     address_2: '',
//     employee_hub_id: '',
//   });
 
//   const [loading, setLoading] = useState(true);
 
//   const [religionOptions, setReligionOptions] = useState([]);
//   const [roleOptions, setRoleOptions] = useState([]);
//   const [countriesList, setCountriesList] = useState([]);
//   const [statesList, setStatesList] = useState([]);
//   const [employeeHubs, setEmployeeHubs] = useState([]);
 
//   // Helper to convert gender string from API to numeric value for dropdown
//   const genderStringToValue = (genderStr) => {
//     if (!genderStr) return '';
//     const lowerCaseGender = genderStr.toLowerCase();
//     if (lowerCaseGender === 'male') return 1;
//     if (lowerCaseGender === 'female') return 2;
//     if (lowerCaseGender === 'other') return 3;
//     return '';
//   };
 
//   // Helper to convert isActive string from API to numeric value for dropdown
//   const isActiveStringToValue = (isActiveStr) => {
//     if (!isActiveStr) return 1; // Default to Active if not provided
//     const lowerCaseIsActive = isActiveStr.toLowerCase();
//     return lowerCaseIsActive === 'active' ? 1 : 0;
//   };
 
//   // Helper to convert maritalStatus string from API to numeric value for dropdown
//   const maritalStatusStringToValue = (maritalStatusStr) => {
//     if (!maritalStatusStr) return 0; // Default to Single if not provided
//     const lowerCaseMaritalStatus = maritalStatusStr.toLowerCase();
//     return lowerCaseMaritalStatus === 'married' ? 1 : 0;
//   };
 
//   useEffect(() => {
//     const fetchDropdowns = async () => {
//       try {
//         const [religionRes, roleRes, countryRes, hubRes] = await Promise.all([
//           axiosInstance.get('/api/religion-dropdown/'),
//           axiosInstance.get('/roles/'),
//           axiosInstance.get('/api/countries/'),
//           axiosInstance.get('/api/employee_hub/')
//         ]);
//         setReligionOptions(religionRes.data || []);
//         setRoleOptions(roleRes.data || []);
//         if (countryRes.data.status === 'success') {
//           setCountriesList(countryRes.data.data || []);
//         }
//         if (hubRes.data.status === 'success') {
//           setEmployeeHubs(hubRes.data.data || []);
//         }
//       } catch (error) {
//         console.error('Error fetching dropdown data:', error);
//       }
//     };
//     fetchDropdowns();
//   }, []);
 
//   useEffect(() => {
//     if (!employeeId || employeeHubs.length === 0) {
//         if (!employeeId) setLoading(false);
//         return;
//     }
 
//     setLoading(true);
//     axiosInstance
//       .post('/api/emp_basic_info/', { user_id: employeeId })
//       .then((response) => {
//         const data = response.data?.data?.[0];
//         if (data) {
//           const selectedHub = employeeHubs.find(hub => hub.employee_hub_name === data.employee_hub_name);
         
//           const formattedData = {
//             ...data,
//             is_active: isActiveStringToValue(data.is_active), // Map is_active string to value
//             marital_status: maritalStatusStringToValue(data.marital_status), // Map marital_status string to value
//             gender: genderStringToValue(data.gender),
//             role_id: Number(data.role_id),
//             religion_id: Number(data.religion_id),
//             country_id: Number(data.country_id || data.citizenship_id), // Use country_id if available, otherwise citizenship_id
//             state_id: Number(data.state_id),
//             zip_code: data.zip_code || data.zipcode,
//             employee_hub_id: selectedHub ? selectedHub.employee_hub_id : '',
//             // Ensure date_of_birth is handled by dayjs for the DatePicker
//             date_of_birth: data.date_of_birth ? dayjs(data.date_of_birth) : null,
//           };
//           setFormData(formattedData);
//         }
//       })
//       .catch((error) => {
//         console.error('Error fetching employee detail:', error);
//         Swal.fire({
//           icon: 'error',
//           title: 'Fetch Error',
//           text: 'Failed to fetch employee details. Please try again.'
//         });
//       })
//       .finally(() => {
//           setLoading(false);
//       });
//   }, [employeeId, employeeHubs]);
 
//   useEffect(() => {
//     const fetchStates = async (countryName) => {
//       try {
//         const res = await axiosInstance.get(`/api/states/?country_name=${countryName}`);
//         if (res.data.status === 'success') {
//           setStatesList(res.data.data);
//         }
//       } catch (error) {
//         console.error(`Error fetching states for ${countryName}:`, error);
//         setStatesList([]);
//       }
//     };
 
//     if (formData.country_id && countriesList.length > 0) {
//       const selectedCountry = countriesList.find(c => c.country_id === formData.country_id);
//       if (selectedCountry) {
//         fetchStates(selectedCountry.country_name);
//       }
//     } else {
//       setStatesList([]);
//     }
//   }, [formData.country_id, countriesList]);
 
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     // age and other specific fields should be parsed to Number if they are meant to be numeric
//     const numericFields = [ 'age', 'gender', 'is_active', 'marital_status', 'role_id', 'religion_id', 'country_id', 'state_id', 'employee_hub_id' ];
//     const finalValue = numericFields.includes(name) ? Number(value) : value;
//     setFormData(prev => {
//       const updatedState = { ...prev, [name]: finalValue };
//       if (name === 'country_id') updatedState.state_id = ''; // Reset state when country changes
//       return updatedState;
//     });
//   };
 
//   const handleDateChange = (value) => {
//     setFormData(prev => ({ ...prev, date_of_birth: value }));
//   };
 
//   const handleSubmit = async () => {
//     if (!employeeId) {
//       Swal.fire({
//         icon: 'error',
//         title: 'Missing Information',
//         text: 'Employee ID is missing. Cannot update.',
//       });
//       return;
//     }
   
//     Swal.fire({
//       title: 'Updating Profile...',
//       text: 'Please wait.',
//       allowOutsideClick: false,
//       didOpen: () => {
//         Swal.showLoading();
//       },
//     });
 
//     // Prepare payload for API
//     const payload = {
//       ...formData,
//       user_id: employeeId,
//       date_of_birth: formData.date_of_birth ? dayjs(formData.date_of_birth).format('YYYY-MM-DD') : null,
//       citizenship_id: formData.country_id, // API expects citizenship_id, not country_id
//       zipcode: formData.zip_code, // API expects zipcode, not zip_code
//       age: formData.age ? parseInt(formData.age, 10) : null,
//       // Map dropdown values back to API expected strings if necessary, though current API seems to accept numeric
//       // If API expects 'Active'/'Inactive' and 'Married'/'Unmarried' strings, you'd need these:
//       // is_active: formData.is_active === 1 ? 'Active' : 'Inactive',
//       // marital_status: formData.marital_status === 1 ? 'Married' : 'Unmarried',
//       // gender: formData.gender === 1 ? 'Male' : (formData.gender === 2 ? 'Female' : 'Other'),
//     };
   
//     // Remove client-side only fields before sending
//     delete payload.country_id;
//     delete payload.zip_code;
   
//     try {
//       await axiosInstance.patch('/api/emp_basic_info/', payload);
//       Swal.fire({
//         icon: 'success',
//         title: 'Updated!',
//         text: 'Profile updated successfully!',
//       });
//     } catch (error) {
//       console.error('Error updating profile:', error.response?.data || error.message);
//       const errorMessage = error.response?.data?.message || 'Failed to update profile. Please try again.';
//       Swal.fire({
//         icon: 'error',
//         title: 'Update Failed',
//         text: errorMessage,
//       });
//     }
//   };
 
//   if (loading) {
//     return <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress /></Box>
//   }
 
//   return (
//     <Box sx={{ p: 3 }}>
     
//       <Typography variant="h6" gutterBottom>🟣 Basic Information</Typography>
     
//       <Grid container spacing={2}>
//         <Grid item xs={12} sm={4}><TextField fullWidth label="First Name" name="first_name" value={formData.first_name || ''} onChange={handleChange} required /></Grid>
//         <Grid item xs={12} sm={4}><TextField fullWidth label="Middle Name" name="middle_name" value={formData.middle_name || ''} onChange={handleChange} /></Grid>
//         <Grid item xs={12} sm={4}><TextField fullWidth label="Last Name" name="last_name" value={formData.last_name || ''} onChange={handleChange} required /></Grid>
       
//         <Grid item xs={12} sm={5}><TextField fullWidth label="Contact Number" name="contact_number" value={formData.contact_number || ''} onChange={handleChange} /></Grid>
//         <Grid item xs={12} sm={3}><TextField fullWidth label="Age" name="age" type="number" value={formData.age || ''} onChange={handleChange} /></Grid>
//         <Grid item xs={12} sm={4}>
//             <FormControl fullWidth>
//                 <InputLabel>Gender</InputLabel>
//                 <Select name="gender" value={formData.gender || ""} onChange={handleChange} label="Gender">
//                     <MenuItem value={1}>Male</MenuItem>
//                     <MenuItem value={2}>Female</MenuItem>
//                     <MenuItem value={3}>Other</MenuItem>
//                 </Select>
//             </FormControl>
//         </Grid>
       
//         {/* Employee ID field is now disabled */}
//        <Grid item xs={12} sm={4}>
//   <TextField
//     fullWidth
//     label="Employee ID"
//     name="employee_id"
//     value={formData.employee_id || ''}
//     onChange={handleChange}
//     required
//     InputProps={{
//       readOnly: true, // prevents editing but keeps normal styles
//     }}
//   />
// </Grid>
//   <Grid item xs={12} sm={4}>
//           <FormControl fullWidth>
//             <InputLabel>Employee Hub</InputLabel>
//             <Select name="employee_hub_id" value={formData.employee_hub_id || ''} onChange={handleChange} label="Employee Hub">
//               {employeeHubs.map(hub => ( <MenuItem key={hub.employee_hub_id} value={hub.employee_hub_id}>{hub.employee_hub_name}</MenuItem> ))}
//             </Select>
//           </FormControl>
//         </Grid>
//         <Grid item xs={12} sm={4}>
//           <LocalizationProvider dateAdapter={AdapterDayjs}>
//             <DatePicker label="Date of Birth" value={formData.date_of_birth} onChange={handleDateChange} format="DD-MM-YYYY" slotProps={{ textField: { fullWidth: true } }} />
//           </LocalizationProvider>
//         </Grid>
 
//         {/* Status Dropdown mapping `is_active` */}
//         <Grid item xs={12} sm={4}><FormControl fullWidth variant="outlined"><InputLabel>Status</InputLabel><Select name="is_active" value={formData.is_active} onChange={handleChange} label="Status"><MenuItem value={1}>Active</MenuItem><MenuItem value={0}>Inactive</MenuItem></Select></FormControl></Grid>
//         {/* Marital Status Dropdown mapping `marital_status` */}
//         <Grid item xs={12} sm={4}><FormControl fullWidth><InputLabel>Marital Status</InputLabel><Select name="marital_status" value={formData.marital_status} onChange={handleChange} label="Marital Status"><MenuItem value={0}>Single</MenuItem><MenuItem value={1}>Married</MenuItem></Select></FormControl></Grid>
//         <Grid item xs={12} sm={4}><FormControl fullWidth><InputLabel>Role</InputLabel><Select name="role_id" value={formData.role_id || ''} onChange={handleChange} label="Role">{roleOptions.map(role => (<MenuItem key={role.role_id} value={role.role_id}>{role.role_name}</MenuItem>))}</Select></FormControl></Grid>
//         <Grid item xs={12} sm={4}><FormControl fullWidth><InputLabel>Religion</InputLabel><Select name="religion_id" value={formData.religion_id || ''} onChange={handleChange} label="Religion">{religionOptions.map((option) => (<MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>))}</Select></FormControl></Grid>
//         <Grid item xs={12} sm={4}><FormControl fullWidth><InputLabel>Blood Group</InputLabel><Select name="blood_group" value={formData.blood_group || ''} onChange={handleChange} label="Blood Group"><MenuItem value="A+">A+</MenuItem><MenuItem value="A-">A-</MenuItem><MenuItem value="B+">B+</MenuItem><MenuItem value="B-">B-</MenuItem><MenuItem value="O+">O+</MenuItem><MenuItem value="O-">O-</MenuItem><MenuItem value="AB+">AB+</MenuItem><MenuItem value="AB-">AB-</MenuItem></Select></FormControl></Grid>
//         <Grid item xs={12} sm={4}><FormControl fullWidth><InputLabel>Citizenship (Country)</InputLabel><Select name="country_id" value={formData.country_id || ''} onChange={handleChange} label="Citizenship (Country)">{countriesList.map((country) => (<MenuItem key={country.country_id} value={country.country_id}>{country.country_name}</MenuItem>))}</Select></FormControl></Grid>
//         <Grid item xs={12} sm={4}><FormControl fullWidth disabled={!formData.country_id || statesList.length === 0}><InputLabel>State / Province</InputLabel><Select name="state_id" value={formData.state_id || ''} onChange={handleChange} label="State / Province">{statesList.map((state) => (<MenuItem key={state.state_id} value={state.state_id}>{state.state_name}</MenuItem>))}</Select></FormControl></Grid>
//         <Grid item xs={12} sm={4}><TextField fullWidth label="City" name="city" value={formData.city ||''} onChange={handleChange} /></Grid>
//         <Grid item xs={12} sm={4}><TextField fullWidth label="Zip Code / Postal Code" name="zip_code" value={formData.zip_code ||''} onChange={handleChange} /></Grid>
//         <Grid item xs={12} sm={6}><TextField fullWidth label="Address Line 1" name="address_1" value={formData.address_1 || ''} onChange={handleChange} /></Grid>
//         <Grid item xs={12} sm={6}><TextField fullWidth label="Address Line 2" name="address_2" value={formData.address_2 || ''} onChange={handleChange} /></Grid>
//         <Grid item xs={12}>
//           <Box display="flex" justifyContent="flex-end">
//             <Button variant="contained" color="primary" sx={{ textTransform: 'none', px: 4 }} onClick={handleSubmit}>
//               Update Profile
//             </Button>
//           </Box>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };
 
// export default BasicInformationForm;



// import React, { useState, useContext, useEffect } from 'react';

// import { EmployeeContext } from './EmployeeContext';

// import axiosInstance from "../../utils/axiosInstance";

// import {

//   Box, Grid, TextField, Typography, MenuItem, Button, FormControl, InputLabel, Select, CircularProgress

// } from '@mui/material';

// import { DatePicker } from '@mui/x-date-pickers/DatePicker';

// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

// import dayjs from 'dayjs';

// import Swal from 'sweetalert2';

 

// const BasicInformationForm = () => {

//   const { employeeId } = useContext(EmployeeContext);

 

//   const [formData, setFormData] = useState({

//     first_name: '',

//     middle_name: '',

//     last_name: '',

//     contact_number: '',

//     age: '',

//     gender: '',

//     employee_id: '',

//     date_of_birth: null,

//     is_active: 1, // Default to Active

//     marital_status: 0, // Default to Single

//     role_id: '',

//     religion_id: '',

//     blood_group: '',

//     country_id: '',

//     state_id: '',

//     city: '',

//     zip_code: '',

//     address_1: '',

//     address_2: '',

//     employee_hub_id: '',

//   });

 

//   const [loading, setLoading] = useState(true);

//   const [errors, setErrors] = useState({});

 

//   const [religionOptions, setReligionOptions] = useState([]);

//   const [roleOptions, setRoleOptions] = useState([]);

//   const [countriesList, setCountriesList] = useState([]);

//   const [statesList, setStatesList] = useState([]);

//   const [employeeHubs, setEmployeeHubs] = useState([]);

 

//   // Helper to convert gender string from API to numeric value for dropdown

//   const genderStringToValue = (genderStr) => {

//     if (!genderStr) return '';

//     const lowerCaseGender = genderStr.toLowerCase();

//     if (lowerCaseGender === 'male') return 1;

//     if (lowerCaseGender === 'female') return 2;

//     if (lowerCaseGender === 'other') return 3;

//     return '';

//   };

 

//   // Helper to convert isActive string from API to numeric value for dropdown

//   const isActiveStringToValue = (isActiveStr) => {

//     if (!isActiveStr) return 1; // Default to Active if not provided

//     const lowerCaseIsActive = isActiveStr.toLowerCase();

//     return lowerCaseIsActive === 'active' ? 1 : 0;

//   };

 

//   // Helper to convert maritalStatus string from API to numeric value for dropdown

//   const maritalStatusStringToValue = (maritalStatusStr) => {

//     if (!maritalStatusStr) return 0; // Default to Single if not provided

//     const lowerCaseMaritalStatus = maritalStatusStr.toLowerCase();

//     return lowerCaseMaritalStatus === 'married' ? 1 : 0;

//   };

 

//   useEffect(() => {

//     const fetchDropdowns = async () => {

//       try {

//         const [religionRes, roleRes, countryRes, hubRes] = await Promise.all([

//           axiosInstance.get('/api/religion-dropdown/'),

//           axiosInstance.get('/roles/'),

//           axiosInstance.get('/api/countries/'),

//           axiosInstance.get('/api/employee_hub/')

//         ]);

//         setReligionOptions(religionRes.data || []);

//         setRoleOptions(roleRes.data || []);

//         if (countryRes.data.status === 'success') {

//           setCountriesList(countryRes.data.data || []);

//         }

//         if (hubRes.data.status === 'success') {

//           setEmployeeHubs(hubRes.data.data || []);

//         }

//       } catch (error) {

//         console.error('Error fetching dropdown data:', error);

//       }

//     };

//     fetchDropdowns();

//   }, []);

 

//   useEffect(() => {

//     if (!employeeId || employeeHubs.length === 0) {

//         if (!employeeId) setLoading(false);

//         return;

//     }

 

//     setLoading(true);

//     axiosInstance

//       .post('/api/emp_basic_info/', { user_id: employeeId })

//       .then((response) => {

//         const data = response.data?.data?.[0];

//         if (data) {

//           const selectedHub = employeeHubs.find(hub => hub.employee_hub_name === data.employee_hub_name);

         

//           const formattedData = {

//             ...data,

//             is_active: isActiveStringToValue(data.is_active), // Map is_active string to value

//             marital_status: maritalStatusStringToValue(data.marital_status), // Map marital_status string to value

//             gender: genderStringToValue(data.gender),

//             role_id: Number(data.role_id),

//             religion_id: Number(data.religion_id),

//             country_id: Number(data.country_id || data.citizenship_id), // Use country_id if available, otherwise citizenship_id

//             state_id: Number(data.state_id),

//             zip_code: data.zip_code || data.zipcode,

//             employee_hub_id: selectedHub ? selectedHub.employee_hub_id : '',

//             // Ensure date_of_birth is handled by dayjs for the DatePicker

//             date_of_birth: data.date_of_birth ? dayjs(data.date_of_birth) : null,

//           };

//           setFormData(formattedData);

//         }

//       })

//       .catch((error) => {

//         console.error('Error fetching employee detail:', error);

//         Swal.fire({

//           icon: 'error',

//           title: 'Fetch Error',

//           text: 'Failed to fetch employee details. Please try again.'

//         });

//       })

//       .finally(() => {

//           setLoading(false);

//       });

//   }, [employeeId, employeeHubs]);

 

//   useEffect(() => {

//     const fetchStates = async (countryName) => {

//       try {

//         const res = await axiosInstance.get(`/api/states/?country_name=${countryName}`);

//         if (res.data.status === 'success') {

//           setStatesList(res.data.data);

//         }

//       } catch (error) {

//         console.error(`Error fetching states for ${countryName}:`, error);

//         setStatesList([]);

//       }

//     };

 

//     if (formData.country_id && countriesList.length > 0) {

//       const selectedCountry = countriesList.find(c => c.country_id === formData.country_id);

//       if (selectedCountry) {

//         fetchStates(selectedCountry.country_name);

//       }

//     } else {

//       setStatesList([]);

//     }

//   }, [formData.country_id, countriesList]);

 

//   // Calculate age when date_of_birth changes

//   useEffect(() => {

//     if (formData.date_of_birth) {

//       const birthDate = dayjs(formData.date_of_birth);

//       const today = dayjs();

//       const age = today.diff(birthDate, 'year');

//       setFormData(prev => ({ ...prev, age: age >= 0 ? age : '' })); // Set age only if non-negative

//       if (age < 0) {

//         setErrors(prev => ({ ...prev, date_of_birth: 'Date of birth cannot be in the future.' }));

//       } else {

//         setErrors(prev => {

//           const newErrors = { ...prev };

//           delete newErrors.date_of_birth;

//           return newErrors;

//         });

//       }

//     } else {

//       setFormData(prev => ({ ...prev, age: '' }));

//       setErrors(prev => {

//         const newErrors = { ...prev };

//         delete newErrors.date_of_birth;

//         return newErrors;

//       });

//     }

//   }, [formData.date_of_birth]);

 

//   const handleChange = (e) => {

//     const { name, value } = e.target;

//     let newErrors = { ...errors };

//     let finalValue = value;

 

//     if (name === 'contact_number') {

//       const re = /^[0-9\b]+$/;

//       if (value === '' || (re.test(value) && value.length <= 10)) {

//         finalValue = value;

//         delete newErrors.contact_number;

//       } else {

//         if (value.length > 10) {

//           newErrors.contact_number = 'Contact number must be 10 digits.';

//         } else if (!re.test(value)) {

//           newErrors.contact_number = 'Contact number must contain only digits.';

//         }

//         finalValue = value.replace(/[^0-9]/g, '').substring(0, 10); // Strip non-digits and limit to 10

//       }

//     } else {

//       const numericFields = [ 'age', 'gender', 'is_active', 'marital_status', 'role_id', 'religion_id', 'country_id', 'state_id', 'employee_hub_id' ];

//       finalValue = numericFields.includes(name) ? Number(value) : value;

//     }

 

//     setErrors(newErrors);

//     setFormData(prev => {

//       const updatedState = { ...prev, [name]: finalValue };

//       if (name === 'country_id') updatedState.state_id = ''; // Reset state when country changes

//       return updatedState;

//     });

//   };

 

//   const handleDateChange = (value) => {

//     setFormData(prev => ({ ...prev, date_of_birth: value }));

//   };

 

//   const validateForm = () => {

//     let tempErrors = {};

//     let isValid = true;

 

//     if (!formData.first_name) {

//       tempErrors.first_name = 'First Name is required.';

//       isValid = false;

//     }

//     if (!formData.last_name) {

//       tempErrors.last_name = 'Last Name is required.';

//       isValid = false;

//     }

//     if (formData.contact_number && formData.contact_number.length !== 10) {

//       tempErrors.contact_number = 'Contact number must be exactly 10 digits.';

//       isValid = false;

//     }

//     if (formData.date_of_birth && dayjs().diff(formData.date_of_birth, 'year') < 0) {

//       tempErrors.date_of_birth = 'Date of birth cannot be in the future.';

//       isValid = false;

//     }

 

//     setErrors(tempErrors);

//     return isValid;

//   };

 

//   const handleSubmit = async () => {

//     if (!employeeId) {

//       Swal.fire({

//         icon: 'error',

//         title: 'Missing Information',

//         text: 'Employee ID is missing. Cannot update.',

//       });

//       return;

//     }

   

//     if (!validateForm()) {

//       Swal.fire({

//         icon: 'error',

//         title: 'Validation Error',

//         text: 'Please correct the errors in the form.',

//       });

//       return;

//     }

 

//     Swal.fire({

//       title: 'Updating Profile...',

//       text: 'Please wait.',

//       allowOutsideClick: false,

//       didOpen: () => {

//         Swal.showLoading();

//       },

//     });

 

//     // Prepare payload for API

//     const payload = {

//       ...formData,

//       user_id: employeeId,

//       date_of_birth: formData.date_of_birth ? dayjs(formData.date_of_birth).format('YYYY-MM-DD') : null,

//       citizenship_id: formData.country_id, // API expects citizenship_id, not country_id

//       zipcode: formData.zip_code, // API expects zipcode, not zip_code

//       age: formData.age ? parseInt(formData.age, 10) : null,

//       // Map dropdown values back to API expected strings if necessary, though current API seems to accept numeric

//       // If API expects 'Active'/'Inactive' and 'Married'/'Unmarried' strings, you'd need these:

//       // is_active: formData.is_active === 1 ? 'Active' : 'Inactive',

//       // marital_status: formData.marital_status === 1 ? 'Married' : 'Unmarried',

//       // gender: formData.gender === 1 ? 'Male' : (formData.gender === 2 ? 'Female' : 'Other'),

//     };

   

//     // Remove client-side only fields before sending

//     delete payload.country_id;

//     delete payload.zip_code;

   

//     try {

//       await axiosInstance.patch('/api/emp_basic_info/', payload);

//       Swal.fire({

//         icon: 'success',

//         title: 'Updated!',

//         text: 'Profile updated successfully!',

//       });

//     } catch (error) {

//       console.error('Error updating profile:', error.response?.data || error.message);

//       const errorMessage = error.response?.data?.message || 'Failed to update profile. Please try again.';

//       Swal.fire({

//         icon: 'error',

//         title: 'Update Failed',

//         text: errorMessage,

//       });

//     }

//   };

 

//   if (loading) {

//     return <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress /></Box>

//   }

 

//   return (

//     <Box sx={{ p: 3 }}>

     

//       <Typography variant="h6" gutterBottom>🟣 Basic Information</Typography>

     

//       <Grid container spacing={2}>

//       <Grid item xs={12} sm={4}>
//   <TextField
//     fullWidth
//     label="First Name"
//     name="first_name"
//     value={formData.first_name || ''}
//     onChange={handleChange}
//     onKeyPress={(e) => {
//       if (!/^[A-Za-z]$/.test(e.key)) {
//         e.preventDefault();
//       }
//     }}
//     required
//     error={!!errors.first_name}
//     helperText={errors.first_name}
//   />
// </Grid>
 
// <Grid item xs={12} sm={4}>
//   <TextField
//     fullWidth
//     label="Middle Name"
//     name="middle_name"
//     value={formData.middle_name || ''}
//     onChange={handleChange}
//     onKeyPress={(e) => {
//       if (!/^[A-Za-z]$/.test(e.key)) {
//         e.preventDefault();
//       }
//     }}
//   />
// </Grid>
 
// <Grid item xs={12} sm={4}>
//   <TextField
//     fullWidth
//     label="Last Name"
//     name="last_name"
//     value={formData.last_name || ''}
//     onChange={handleChange}
//     onKeyPress={(e) => {
//       if (!/^[A-Za-z]$/.test(e.key)) {
//         e.preventDefault();
//       }
//     }}
//     required
//     error={!!errors.last_name}
//     helperText={errors.last_name}
//   />
// </Grid>
       

//         <Grid item xs={12} sm={5}>

//           <TextField

//             fullWidth

//             label="Contact Number"

//             name="contact_number"

//             value={formData.contact_number || ''}

//             onChange={handleChange}

//             inputProps={{ maxLength: 10 }}

//             error={!!errors.contact_number}

//             helperText={errors.contact_number}

//           />

//         </Grid>

//         <Grid item xs={12} sm={3}>

//           <TextField

//             fullWidth

//             label="Age"

//             name="age"

//             type="number"

//             value={formData.age || ''}

//             InputProps={{

//               readOnly: true, // Age is now generated

//             }}

//             error={!!errors.age}

//             helperText={errors.age}

//           />

//         </Grid>

//         <Grid item xs={12} sm={4}>

//             <FormControl fullWidth>

//                 <InputLabel>Gender</InputLabel>

//                 <Select name="gender" value={formData.gender || ""} onChange={handleChange} label="Gender">

//                     <MenuItem value={1}>Male</MenuItem>

//                     <MenuItem value={2}>Female</MenuItem>

//                     <MenuItem value={3}>Other</MenuItem>

//                 </Select>

//             </FormControl>

//         </Grid>

       

//        <Grid item xs={12} sm={4}>

//           <TextField

//             fullWidth

//             label="Employee ID"

//             name="employee_id"

//             value={formData.employee_id || ''}

//             onChange={handleChange}

//             required

//             InputProps={{

//               readOnly: true,

//             }}

//           />

//         </Grid>

//         <Grid item xs={12} sm={4}>

//           <FormControl fullWidth>

//             <InputLabel>Employee Hub</InputLabel>

//             <Select name="employee_hub_id" value={formData.employee_hub_id || ''} onChange={handleChange} label="Employee Hub">

//               {employeeHubs.map(hub => ( <MenuItem key={hub.employee_hub_id} value={hub.employee_hub_id}>{hub.employee_hub_name}</MenuItem> ))}

//             </Select>

//           </FormControl>

//         </Grid>

//         <Grid item xs={12} sm={4}>

//           <LocalizationProvider dateAdapter={AdapterDayjs}>

//             <DatePicker

//               label="Date of Birth"

//               value={formData.date_of_birth}

//               onChange={handleDateChange}

//               format="DD-MM-YYYY"

//               slotProps={{

//                 textField: {

//                   fullWidth: true,

//                   error: !!errors.date_of_birth,

//                   helperText: errors.date_of_birth,

//                 }

//               }}

//             />

//           </LocalizationProvider>

//         </Grid>

 

//         <Grid item xs={12} sm={4}><FormControl fullWidth variant="outlined"><InputLabel>Status</InputLabel><Select name="is_active" value={formData.is_active} onChange={handleChange} label="Status"><MenuItem value={1}>Active</MenuItem><MenuItem value={0}>Inactive</MenuItem></Select></FormControl></Grid>

//         <Grid item xs={12} sm={4}><FormControl fullWidth><InputLabel>Marital Status</InputLabel><Select name="marital_status" value={formData.marital_status} onChange={handleChange} label="Marital Status"><MenuItem value={0}>Single</MenuItem><MenuItem value={1}>Married</MenuItem></Select></FormControl></Grid>

//         <Grid item xs={12} sm={4}><FormControl fullWidth><InputLabel>Role</InputLabel><Select name="role_id" value={formData.role_id || ''} onChange={handleChange} label="Role">{roleOptions.map(role => (<MenuItem key={role.role_id} value={role.role_id}>{role.role_name}</MenuItem>))}</Select></FormControl></Grid>

//         <Grid item xs={12} sm={4}><FormControl fullWidth><InputLabel>Religion</InputLabel><Select name="religion_id" value={formData.religion_id || ''} onChange={handleChange} label="Religion">{religionOptions.map((option) => (<MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>))}</Select></FormControl></Grid>

//         <Grid item xs={12} sm={4}><FormControl fullWidth><InputLabel>Blood Group</InputLabel><Select name="blood_group" value={formData.blood_group || ''} onChange={handleChange} label="Blood Group"><MenuItem value="A+">A+</MenuItem><MenuItem value="A-">A-</MenuItem><MenuItem value="B+">B+</MenuItem><MenuItem value="B-">B-</MenuItem><MenuItem value="O+">O+</MenuItem><MenuItem value="O-">O-</MenuItem><MenuItem value="AB+">AB+</MenuItem><MenuItem value="AB-">AB-</MenuItem></Select></FormControl></Grid>

//         <Grid item xs={12} sm={4}><FormControl fullWidth><InputLabel>Citizenship (Country)</InputLabel><Select name="country_id" value={formData.country_id || ''} onChange={handleChange} label="Citizenship (Country)">{countriesList.map((country) => (<MenuItem key={country.country_id} value={country.country_id}>{country.country_name}</MenuItem>))}</Select></FormControl></Grid>

//         <Grid item xs={12} sm={4}><FormControl fullWidth disabled={!formData.country_id || statesList.length === 0}><InputLabel>State / Province</InputLabel><Select name="state_id" value={formData.state_id || ''} onChange={handleChange} label="State / Province">{statesList.map((state) => (<MenuItem key={state.state_id} value={state.state_id}>{state.state_name}</MenuItem>))}</Select></FormControl></Grid>

//         <Grid item xs={12} sm={4}><TextField fullWidth label="City" name="city" value={formData.city ||''} onChange={handleChange} /></Grid>

//         <Grid item xs={12} sm={4}><TextField fullWidth label="Zip Code / Postal Code" name="zip_code" value={formData.zip_code ||''} onChange={handleChange} /></Grid>

//         <Grid item xs={12} sm={6}><TextField fullWidth label="Address Line 1 (Permenent Address)" name="address_1" value={formData.address_1 || ''} onChange={handleChange} /></Grid>

//         <Grid item xs={12} sm={6}><TextField fullWidth label="Address Line 2" name="address_2" value={formData.address_2 || ''} onChange={handleChange} /></Grid>

//         <Grid item xs={12}>

//           <Box display="flex" justifyContent="flex-end">

//             <Button variant="contained" color="primary" sx={{ textTransform: 'none', px: 4 }} onClick={handleSubmit}>

//               Update Profile

//             </Button>

//           </Box>

//         </Grid>

//       </Grid>

//     </Box>

//   );

// };

 

// export default BasicInformationForm;
























// import React, { useState, useContext, useEffect } from 'react';

// import { EmployeeContext } from './EmployeeContext';

// import axiosInstance from "../../utils/axiosInstance";

// import {

//   Box, Grid, TextField, Typography, MenuItem, Button, FormControl, InputLabel, Select, CircularProgress

// } from '@mui/material';

// import { DatePicker } from '@mui/x-date-pickers/DatePicker';

// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

// import dayjs from 'dayjs';

// import Swal from 'sweetalert2';

 

// const BasicInformationForm = () => {

//   const { employeeId } = useContext(EmployeeContext);

 

//   const [formData, setFormData] = useState({

//     first_name: '',

//     middle_name: '',

//     last_name: '',

//     contact_number: '',

//     age: '',

//     gender: '',

//     employee_id: '',

//     date_of_birth: null,

//     is_active: 1, // Default to Active

//     marital_status: 0, // Default to Single

//     role_id: '',

//     blood_group: '',

//     country_id: '',

//     state_id: '',

//     city: '',

//     zip_code: '',

//     address_1: '',

//     address_2: '',

//     employee_hub_id: '',

//   });

 

//   const [loading, setLoading] = useState(true);

//   const [errors, setErrors] = useState({});

 


//   const [roleOptions, setRoleOptions] = useState([]);

//   const [countriesList, setCountriesList] = useState([]);

//   const [statesList, setStatesList] = useState([]);

//   const [employeeHubs, setEmployeeHubs] = useState([]);

 

//   // Helper to convert gender string from API to numeric value for dropdown

//   const genderStringToValue = (genderStr) => {

//     if (!genderStr) return '';

//     const lowerCaseGender = genderStr.toLowerCase();

//     if (lowerCaseGender === 'male') return 1;

//     if (lowerCaseGender === 'female') return 2;

//     if (lowerCaseGender === 'other') return 3;

//     return '';

//   };

 

//   // Helper to convert isActive string from API to numeric value for dropdown

//   const isActiveStringToValue = (isActiveStr) => {

//     if (!isActiveStr) return 1; // Default to Active if not provided

//     const lowerCaseIsActive = isActiveStr.toLowerCase();

//     return lowerCaseIsActive === 'active' ? 1 : 0;

//   };

 

//   // Helper to convert maritalStatus string from API to numeric value for dropdown

//   const maritalStatusStringToValue = (maritalStatusStr) => {

//     if (!maritalStatusStr) return 0; // Default to Single if not provided

//     const lowerCaseMaritalStatus = maritalStatusStr.toLowerCase();

//     return lowerCaseMaritalStatus === 'married' ? 1 : 0;

//   };

 

//   useEffect(() => {

//     const fetchDropdowns = async () => {

//       try {

//         const [ roleRes, countryRes, hubRes] = await Promise.all([


//           axiosInstance.get('/roles/'),

//           axiosInstance.get('/api/countries/'),

//           axiosInstance.get('/api/employee_hub/')

//         ]);


//         setRoleOptions(roleRes.data || []);

//         if (countryRes.data.status === 'success') {

//           setCountriesList(countryRes.data.data || []);

//         }

//         if (hubRes.data.status === 'success') {

//           setEmployeeHubs(hubRes.data.data || []);

//         }

//       } catch (error) {

//         console.error('Error fetching dropdown data:', error);

//       }

//     };

//     fetchDropdowns();

//   }, []);

 

//   useEffect(() => {

//     if (!employeeId || employeeHubs.length === 0) {

//         if (!employeeId) setLoading(false);

//         return;

//     }

 

//     setLoading(true);

//     axiosInstance

//       .post('/api/emp_basic_info/', { user_id: employeeId })

//       .then((response) => {

//         const data = response.data?.data?.[0];

//         if (data) {

//           const selectedHub = employeeHubs.find(hub => hub.employee_hub_name === data.employee_hub_name);

         

//           const formattedData = {

//             ...data,

//             is_active: isActiveStringToValue(data.is_active), // Map is_active string to value

//             marital_status: maritalStatusStringToValue(data.marital_status), // Map marital_status string to value

//             gender: genderStringToValue(data.gender),

//             role_id: Number(data.role_id),


//             country_id: Number(data.country_id || data.citizenship_id), // Use country_id if available, otherwise citizenship_id

//             state_id: Number(data.state_id),

//             zip_code: data.zip_code || data.zipcode,

//             employee_hub_id: selectedHub ? selectedHub.employee_hub_id : '',

//             // Ensure date_of_birth is handled by dayjs for the DatePicker

//             date_of_birth: data.date_of_birth ? dayjs(data.date_of_birth) : null,

//           };

//           setFormData(formattedData);

//         }

//       })

//       .catch((error) => {

//         console.error('Error fetching employee detail:', error);

//         Swal.fire({

//           icon: 'error',

//           title: 'Fetch Error',

//           text: 'Failed to fetch employee details. Please try again.'

//         });

//       })

//       .finally(() => {

//           setLoading(false);

//       });

//   }, [employeeId, employeeHubs]);

 

//   useEffect(() => {

//     const fetchStates = async (countryName) => {

//       try {

//         const res = await axiosInstance.get(`/api/states/?country_name=${countryName}`);

//         if (res.data.status === 'success') {

//           setStatesList(res.data.data);

//         }

//       } catch (error) {

//         console.error(`Error fetching states for ${countryName}:`, error);

//         setStatesList([]);

//       }

//     };

 

//     if (formData.country_id && countriesList.length > 0) {

//       const selectedCountry = countriesList.find(c => c.country_id === formData.country_id);

//       if (selectedCountry) {

//         fetchStates(selectedCountry.country_name);

//       }

//     } else {

//       setStatesList([]);

//     }

//   }, [formData.country_id, countriesList]);

 

//   // Calculate age when date_of_birth changes

//   useEffect(() => {

//     if (formData.date_of_birth) {

//       const birthDate = dayjs(formData.date_of_birth);

//       const today = dayjs();

//       const age = today.diff(birthDate, 'year');

//       setFormData(prev => ({ ...prev, age: age >= 0 ? age : '' })); // Set age only if non-negative

//       if (age < 0) {

//         setErrors(prev => ({ ...prev, date_of_birth: 'Date of birth cannot be in the future.' }));

//       } else {

//         setErrors(prev => {

//           const newErrors = { ...prev };

//           delete newErrors.date_of_birth;

//           return newErrors;

//         });

//       }

//     } else {

//       setFormData(prev => ({ ...prev, age: '' }));

//       setErrors(prev => {

//         const newErrors = { ...prev };

//         delete newErrors.date_of_birth;

//         return newErrors;

//       });

//     }

//   }, [formData.date_of_birth]);

 

//   const handleChange = (e) => {

//     const { name, value } = e.target;

//     let newErrors = { ...errors };

//     let finalValue = value;

 

//     if (name === 'contact_number') {

//       const re = /^[0-9\b]+$/;

//       if (value === '' || (re.test(value) && value.length <= 10)) {

//         finalValue = value;

//         delete newErrors.contact_number;

//       } else {

//         if (value.length > 10) {

//           newErrors.contact_number = 'Contact number must be 10 digits.';

//         } else if (!re.test(value)) {

//           newErrors.contact_number = 'Contact number must contain only digits.';

//         }

//         finalValue = value.replace(/[^0-9]/g, '').substring(0, 10); // Strip non-digits and limit to 10

//       }

//     } else {

//       const numericFields = [ 'age', 'gender', 'is_active', 'marital_status', 'role_id',  'country_id', 'state_id', 'employee_hub_id' ];

//       finalValue = numericFields.includes(name) ? Number(value) : value;

//     }

 

//     setErrors(newErrors);

//     setFormData(prev => {

//       const updatedState = { ...prev, [name]: finalValue };

//       if (name === 'country_id') updatedState.state_id = ''; // Reset state when country changes

//       return updatedState;

//     });

//   };

 

//   const handleDateChange = (value) => {

//     setFormData(prev => ({ ...prev, date_of_birth: value }));

//   };

 

//   const validateForm = () => {

//     let tempErrors = {};

//     let isValid = true;

 

//     if (!formData.first_name) {

//       tempErrors.first_name = 'First Name is required.';

//       isValid = false;

//     }

//     if (!formData.last_name) {

//       tempErrors.last_name = 'Last Name is required.';

//       isValid = false;

//     }

//     if (formData.contact_number && formData.contact_number.length !== 10) {

//       tempErrors.contact_number = 'Contact number must be exactly 10 digits.';

//       isValid = false;

//     }

//     if (formData.date_of_birth && dayjs().diff(formData.date_of_birth, 'year') < 0) {

//       tempErrors.date_of_birth = 'Date of birth cannot be in the future.';

//       isValid = false;

//     }

 

//     setErrors(tempErrors);

//     return isValid;

//   };

 

//   const handleSubmit = async () => {

//     if (!employeeId) {

//       Swal.fire({

//         icon: 'error',

//         title: 'Missing Information',

//         text: 'Employee ID is missing. Cannot update.',

//       });

//       return;

//     }

   

//     if (!validateForm()) {

//       Swal.fire({

//         icon: 'error',

//         title: 'Validation Error',

//         text: 'Please correct the errors in the form.',

//       });

//       return;

//     }

 

//     Swal.fire({

//       title: 'Updating Profile...',

//       text: 'Please wait.',

//       allowOutsideClick: false,

//       didOpen: () => {

//         Swal.showLoading();

//       },

//     });

 

//     // Prepare payload for API

//     const payload = {

//       ...formData,

//       user_id: employeeId,

//       date_of_birth: formData.date_of_birth ? dayjs(formData.date_of_birth).format('YYYY-MM-DD') : null,

//       citizenship_id: formData.country_id, // API expects citizenship_id, not country_id

//       zipcode: formData.zip_code, // API expects zipcode, not zip_code

//       age: formData.age ? parseInt(formData.age, 10) : null,

//       // Map dropdown values back to API expected strings if necessary, though current API seems to accept numeric

//       // If API expects 'Active'/'Inactive' and 'Married'/'Unmarried' strings, you'd need these:

//       // is_active: formData.is_active === 1 ? 'Active' : 'Inactive',

//       // marital_status: formData.marital_status === 1 ? 'Married' : 'Unmarried',

//       // gender: formData.gender === 1 ? 'Male' : (formData.gender === 2 ? 'Female' : 'Other'),

//     };

   

//     // Remove client-side only fields before sending

//     delete payload.country_id;

//     delete payload.zip_code;

   

//     try {

//       await axiosInstance.patch('/api/emp_basic_info/', payload);

//       Swal.fire({

//         icon: 'success',

//         title: 'Updated!',

//         text: 'Profile updated successfully!',

//       });

//     } catch (error) {

//       console.error('Error updating profile:', error.response?.data || error.message);

//       const errorMessage = error.response?.data?.message || 'Failed to update profile. Please try again.';

//       Swal.fire({

//         icon: 'error',

//         title: 'Update Failed',

//         text: errorMessage,

//       });

//     }

//   };

 

//   if (loading) {

//     return <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress /></Box>

//   }

 

//   return (

//     <Box sx={{ p: 3 }}>

     

//       <Typography variant="h6" gutterBottom>🟣 Basic - Information</Typography>

     

//       <Grid container spacing={2}>

//       <Grid item xs={12} sm={4}>
//   <TextField
//     fullWidth
//     label="First Name"
//     name="first_name"
//     value={formData.first_name || ''}
//     onChange={handleChange}
//     onKeyPress={(e) => {
//       if (!/^[A-Za-z]$/.test(e.key)) {
//         e.preventDefault();
//       }
//     }}
//     required
//     error={!!errors.first_name}
//     helperText={errors.first_name}
//   />
// </Grid>
 
// <Grid item xs={12} sm={4}>
//   <TextField
//     fullWidth
//     label="Middle Name"
//     name="middle_name"
//     value={formData.middle_name || ''}
//     onChange={handleChange}
//     onKeyPress={(e) => {
//       if (!/^[A-Za-z]$/.test(e.key)) {
//         e.preventDefault();
//       }
//     }}
//   />
// </Grid>
 
// <Grid item xs={12} sm={4}>
//   <TextField
//     fullWidth
//     label="Last Name"
//     name="last_name"
//     value={formData.last_name || ''}
//     onChange={handleChange}
//     onKeyPress={(e) => {
//       if (!/^[A-Za-z]$/.test(e.key)) {
//         e.preventDefault();
//       }
//     }}
//     required
//     error={!!errors.last_name}
//     helperText={errors.last_name}
//   />
// </Grid>
       

//         <Grid item xs={12} sm={5}>

//           <TextField

//             fullWidth

//             label="Contact Number"

//             name="contact_number"

//             value={formData.contact_number || ''}

//             onChange={handleChange}

//             inputProps={{ maxLength: 10 }}

//             error={!!errors.contact_number}

//             helperText={errors.contact_number}

//           />

//         </Grid>

//         <Grid item xs={12} sm={3}>

//           <TextField

//             fullWidth

//             label="Age"

//             name="age"

//             type="number"

//             value={formData.age || ''}

//             InputProps={{

//               readOnly: true, // Age is now generated

//             }}

//             error={!!errors.age}

//             helperText={errors.age}

//           />

//         </Grid>

//         <Grid item xs={12} sm={4}>

//             <FormControl fullWidth>

//                 <InputLabel>Gender</InputLabel>

//                 <Select name="gender" value={formData.gender || ""} onChange={handleChange} label="Gender">

//                     <MenuItem value={1}>Male</MenuItem>

//                     <MenuItem value={2}>Female</MenuItem>

//                     <MenuItem value={3}>Other</MenuItem>

//                 </Select>

//             </FormControl>

//         </Grid>

       

//        <Grid item xs={12} sm={4}>

//           <TextField

//             fullWidth

//             label="Employee ID"

//             name="employee_id"

//             value={formData.employee_id || ''}

//             onChange={handleChange}

//             required

//             InputProps={{

//               readOnly: true,

//             }}

//           />

//         </Grid>

//         <Grid item xs={12} sm={4}>

//           <FormControl fullWidth>

//             <InputLabel>Employee Hub</InputLabel>

//             <Select name="employee_hub_id" value={formData.employee_hub_id || ''} onChange={handleChange} label="Employee Hub">

//               {employeeHubs.map(hub => ( <MenuItem key={hub.employee_hub_id} value={hub.employee_hub_id}>{hub.employee_hub_name}</MenuItem> ))}

//             </Select>

//           </FormControl>

//         </Grid>

//         <Grid item xs={12} sm={4}>

//           <LocalizationProvider dateAdapter={AdapterDayjs}>

//             <DatePicker

//               label="Date of Birth"

//               value={formData.date_of_birth}

//               onChange={handleDateChange}

//               format="DD-MM-YYYY"

//               slotProps={{

//                 textField: {

//                   fullWidth: true,

//                   error: !!errors.date_of_birth,

//                   helperText: errors.date_of_birth,

//                 }

//               }}

//             />

//           </LocalizationProvider>

//         </Grid>

 

//         <Grid item xs={12} sm={4}><FormControl fullWidth variant="outlined"><InputLabel>Status</InputLabel><Select name="is_active" value={formData.is_active} onChange={handleChange} label="Status"><MenuItem value={1}>Active</MenuItem><MenuItem value={0}>Inactive</MenuItem></Select></FormControl></Grid>

//         <Grid item xs={12} sm={4}><FormControl fullWidth><InputLabel>Marital Status</InputLabel><Select name="marital_status" value={formData.marital_status} onChange={handleChange} label="Marital Status"><MenuItem value={0}>Single</MenuItem><MenuItem value={1}>Married</MenuItem></Select></FormControl></Grid>

//         <Grid item xs={12} sm={4}><FormControl fullWidth><InputLabel>Role</InputLabel><Select name="role_id" value={formData.role_id || ''} onChange={handleChange} label="Role">{roleOptions.map(role => (<MenuItem key={role.role_id} value={role.role_id}>{role.role_name}</MenuItem>))}</Select></FormControl></Grid>


//         <Grid item xs={12} sm={4}><FormControl fullWidth><InputLabel>Blood Group</InputLabel><Select name="blood_group" value={formData.blood_group || ''} onChange={handleChange} label="Blood Group"><MenuItem value="A+">A+</MenuItem><MenuItem value="A-">A-</MenuItem><MenuItem value="B+">B+</MenuItem><MenuItem value="B-">B-</MenuItem><MenuItem value="O+">O+</MenuItem><MenuItem value="O-">O-</MenuItem><MenuItem value="AB+">AB+</MenuItem><MenuItem value="AB-">AB-</MenuItem></Select></FormControl></Grid>

//         <Grid item xs={12} sm={4}><FormControl fullWidth><InputLabel>Citizenship (Country)</InputLabel><Select name="country_id" value={formData.country_id || ''} onChange={handleChange} label="Citizenship (Country)">{countriesList.map((country) => (<MenuItem key={country.country_id} value={country.country_id}>{country.country_name}</MenuItem>))}</Select></FormControl></Grid>

//         <Grid item xs={12} sm={4}><FormControl fullWidth disabled={!formData.country_id || statesList.length === 0}><InputLabel>State / Province</InputLabel><Select name="state_id" value={formData.state_id || ''} onChange={handleChange} label="State / Province">{statesList.map((state) => (<MenuItem key={state.state_id} value={state.state_id}>{state.state_name}</MenuItem>))}</Select></FormControl></Grid>

//         <Grid item xs={12} sm={4}><TextField fullWidth label="City" name="city" value={formData.city ||''} onChange={handleChange} /></Grid>

//         <Grid item xs={12} sm={4}><TextField fullWidth label="Zip Code / Postal Code" name="zip_code" value={formData.zip_code ||''} onChange={handleChange} /></Grid>

//         <Grid item xs={12} sm={6}><TextField fullWidth label="Address Line 1 (Permenent Address)" name="address_1" value={formData.address_1 || ''} onChange={handleChange} /></Grid>

//         <Grid item xs={12} sm={6}><TextField fullWidth label="Address Line 2" name="address_2" value={formData.address_2 || ''} onChange={handleChange} /></Grid>

//         <Grid item xs={12}>

//           <Box display="flex" justifyContent="flex-end">

//             <Button variant="contained" color="primary" sx={{ textTransform: 'none', px: 4 }} onClick={handleSubmit}>

//               Update Profile

//             </Button>

//           </Box>

//         </Grid>

//       </Grid>

//     </Box>

//   );

// };

 

// export default BasicInformationForm;






// import React, { useState, useContext, useEffect } from 'react';
// import { EmployeeContext } from './EmployeeContext';
// import axiosInstance from "../../utils/axiosInstance";
// import {
//   Box,
//   Grid,
//   TextField,
//   Typography,
//   MenuItem,
//   Button,
//   FormControl,
//   InputLabel,
//   Select,
//   CircularProgress,
//   Paper,
//   Divider,
//   Checkbox,
//   FormControlLabel
// } from '@mui/material';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import dayjs from 'dayjs';
// import Swal from 'sweetalert2';

// const BasicInformationForm = () => {
//   const { employeeId } = useContext(EmployeeContext);

//   const [formData, setFormData] = useState({
//     // Personal Info
//     first_name: '',
//     middle_name: '',
//     last_name: '',
//     date_of_birth: null,
//     age: '',
//     gender: '',
//     marital_status: 0,
//     blood_group: '',
//     contact_number: '',

//     // Employment Info
//     employee_id: '',
//     role_id: '',
//     employee_hub_id: '',
//     is_active: 1,

//     // Permanent Address
//     address_1: '',
//     country_id: '',
//     state_id: '',
//     city: '',
//     zip_code: '',

//     // Corresponding Address
//     corr_address_1: '',
//     corr_country_id: '',
//     corr_state_id: '',
//     corr_city: '',
//     corr_zip_code: '',
//   });

//   const [loading, setLoading] = useState(true);
//   const [errors, setErrors] = useState({});

//   // Dropdown options
//   const [roleOptions, setRoleOptions] = useState([]);
//   const [countriesList, setCountriesList] = useState([]);
//   const [employeeHubs, setEmployeeHubs] = useState([]);

//   // State lists for addresses
//   const [permStatesList, setPermStatesList] = useState([]);
//   const [corrStatesList, setCorrStatesList] = useState([]);

//   // "Same as Permanent" checkbox state
//   const [isSameAddress, setIsSameAddress] = useState(false);

//   // Helper to convert string values from API to numeric values for dropdowns
//   const genderStringToValue = (genderStr) => {
//     if (!genderStr) return '';
//     const lowerCaseGender = genderStr.toLowerCase();
//     if (lowerCaseGender === 'male') return 1;
//     if (lowerCaseGender === 'female') return 2;
//     if (lowerCaseGender === 'other') return 3;
//     return '';
//   };
//   const isActiveStringToValue = (isActiveStr) => (isActiveStr?.toLowerCase() === 'active' ? 1 : 0);
//   const maritalStatusStringToValue = (maritalStatusStr) => (maritalStatusStr?.toLowerCase() === 'married' ? 1 : 0);

//   // Fetch all dropdown data on component mount
//   useEffect(() => {
//     const fetchDropdowns = async () => {
//       try {
//         const [roleRes, countryRes, hubRes] = await Promise.all([
//           axiosInstance.get('/roles/'),
//           axiosInstance.get('/api/countries/'),
//           axiosInstance.get('/api/employee_hub/')
//         ]);
//         setRoleOptions(roleRes.data || []);
//         if (countryRes.data.status === 'success') setCountriesList(countryRes.data.data || []);
//         if (hubRes.data.status === 'success') setEmployeeHubs(hubRes.data.data || []);
//       } catch (error) {
//         console.error('Error fetching dropdown data:', error);
//       }
//     };
//     fetchDropdowns();
//   }, []);

//   // Fetch employee data when employeeId is available
//   useEffect(() => {
//     if (!employeeId) {
//       setLoading(false);
//       return;
//     }

//     setLoading(true);
//     axiosInstance
//       .post('/api/emp_basic_info/', { user_id: employeeId })
//       .then((response) => {
//         const data = response.data?.data?.[0];
//         if (data) {
//           const selectedHub = employeeHubs.find(hub => hub.employee_hub_name === data.employee_hub_name);
          
//           const formattedData = {
//             ...formData,
//             ...data,
//             is_active: isActiveStringToValue(data.is_active),
//             marital_status: maritalStatusStringToValue(data.marital_status),
//             gender: genderStringToValue(data.gender),
//             role_id: Number(data.role_id),
//             date_of_birth: data.date_of_birth ? dayjs(data.date_of_birth) : null,
//             employee_hub_id: selectedHub ? selectedHub.employee_hub_id : '',
//             country_id: Number(data.country_id || data.citizenship_id),
//             state_id: Number(data.state_id),
//             zip_code: data.zip_code || data.zipcode,
//             corr_address_1: data.corr_address_1 || '',
//             corr_country_id: Number(data.corr_country_id || ''),
//             corr_state_id: Number(data.corr_state_id || ''),
//             corr_city: data.corr_city || '',
//             corr_zip_code: data.corr_zip_code || '',
//           };
//           setFormData(formattedData);
//         }
//       })
//       .catch((error) => {
//         console.error('Error fetching employee detail:', error);
//         Swal.fire({ icon: 'error', title: 'Fetch Error', text: 'Failed to fetch employee details.' });
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   }, [employeeId, employeeHubs]);

//   // Fetch states for Permanent Address
//   useEffect(() => {
//     const fetchStates = async (countryName) => {
//       setPermStatesList([]); // Reset states list
//       try {
//         const res = await axiosInstance.get(`/api/states/?country_name=${countryName}`);
//         if (res.data.status === 'success') setPermStatesList(res.data.data);
//       } catch (error) {
//         console.error(`Error fetching states for ${countryName}:`, error);
//       }
//     };
//     if (formData.country_id && countriesList.length > 0) {
//       const selectedCountry = countriesList.find(c => c.country_id === formData.country_id);
//       if (selectedCountry) fetchStates(selectedCountry.country_name);
//     } else {
//       setPermStatesList([]);
//     }
//   }, [formData.country_id, countriesList]);

//   // Fetch states for Corresponding Address
//   useEffect(() => {
//     const fetchStates = async (countryName) => {
//       setCorrStatesList([]); // Reset states list
//       try {
//         const res = await axiosInstance.get(`/api/states/?country_name=${countryName}`);
//         if (res.data.status === 'success') setCorrStatesList(res.data.data);
//       } catch (error) {
//         console.error(`Error fetching states for ${countryName}:`, error);
//       }
//     };
//     if (formData.corr_country_id && countriesList.length > 0) {
//       const selectedCountry = countriesList.find(c => c.country_id === formData.corr_country_id);
//       if (selectedCountry) fetchStates(selectedCountry.country_name);
//     } else {
//       setCorrStatesList([]);
//     }
//   }, [formData.corr_country_id, countriesList]);

//   // Calculate age from date_of_birth
//   useEffect(() => {
//     if (formData.date_of_birth) {
//       const birthDate = dayjs(formData.date_of_birth);
//       const today = dayjs();
//       const age = today.diff(birthDate, 'year');
//       setFormData(prev => ({ ...prev, age: age >= 0 ? age : '' }));
//       if (age < 0) {
//         setErrors(prev => ({ ...prev, date_of_birth: 'Date of birth cannot be in the future.' }));
//       } else {
//         setErrors(prev => { const newErrors = { ...prev }; delete newErrors.date_of_birth; return newErrors; });
//       }
//     } else {
//       setFormData(prev => ({ ...prev, age: '' }));
//     }
//   }, [formData.date_of_birth]);
  
//   // Logic for "Same as Permanent Address" checkbox
//   useEffect(() => {
//     if (isSameAddress) {
//       setFormData(prev => ({
//         ...prev,
//         corr_address_1: prev.address_1,
//         corr_country_id: prev.country_id,
//         corr_state_id: prev.state_id,
//         corr_city: prev.city,
//         corr_zip_code: prev.zip_code,
//       }));
//     }
//   }, [isSameAddress, formData.address_1, formData.country_id, formData.state_id, formData.city, formData.zip_code]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     let finalValue = value;
//     if (name === 'contact_number') {
//       finalValue = value.replace(/[^0-9]/g, '').substring(0, 10);
//     }
//     const numericFields = ['age', 'gender', 'is_active', 'marital_status', 'role_id', 'employee_hub_id', 'country_id', 'state_id', 'corr_country_id', 'corr_state_id'];
//     if (numericFields.includes(name)) finalValue = Number(value);

//     setFormData(prev => {
//       const updatedState = { ...prev, [name]: finalValue };
//       if (name === 'country_id') updatedState.state_id = '';
//       if (name === 'corr_country_id') updatedState.corr_state_id = '';
//       return updatedState;
//     });
//   };

//   const handleDateChange = (value) => {
//     setFormData(prev => ({ ...prev, date_of_birth: value }));
//   };

//   const handleSameAddressChange = (event) => setIsSameAddress(event.target.checked);

//   const validateForm = () => {
//     let tempErrors = {};
//     if (!formData.first_name.trim()) tempErrors.first_name = 'First Name is required.';
//     if (!formData.last_name.trim()) tempErrors.last_name = 'Last Name is required.';
//     if (formData.contact_number && formData.contact_number.length !== 10) tempErrors.contact_number = 'Contact number must be 10 digits.';
//     if (formData.date_of_birth && dayjs().isBefore(formData.date_of_birth)) tempErrors.date_of_birth = 'Date of birth cannot be in the future.';
//     setErrors(tempErrors);
//     return Object.keys(tempErrors).length === 0;
//   };

//   const handleSubmit = async () => {
//     if (!validateForm()) {
//       Swal.fire({ icon: 'error', title: 'Validation Error', text: 'Please correct the errors in the form.' });
//       return;
//     }
//     if (!employeeId) {
//       Swal.fire({ icon: 'error', title: 'Missing Information', text: 'Employee ID is missing.' });
//       return;
//     }

//     Swal.fire({ title: 'Updating Profile...', text: 'Please wait.', allowOutsideClick: false, didOpen: () => Swal.showLoading() });
    
//     const payload = {
//       ...formData,
//       user_id: employeeId,
//       date_of_birth: formData.date_of_birth ? dayjs(formData.date_of_birth).format('YYYY-MM-DD') : null,
//       citizenship_id: formData.country_id,
//       zipcode: formData.zip_code,
//       age: formData.age ? parseInt(formData.age, 10) : null,
//     };
//     delete payload.country_id;
//     delete payload.zip_code;

//     try {
//       await axiosInstance.patch('/api/emp_basic_info/', payload);
//       Swal.fire({ icon: 'success', title: 'Updated!', text: 'Profile updated successfully!' });
//     } catch (error) {
//       const errorMessage = error.response?.data?.message || 'Failed to update profile.';
//       Swal.fire({ icon: 'error', title: 'Update Failed', text: errorMessage });
//     }
//   };

//   if (loading) {
//     return <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress /></Box>;
//   }

//   return (
//     <Box sx={{ p: 3 }}>
//       <Paper elevation={3} sx={{ p: 3 }}>
//         <Typography variant="h6" gutterBottom>🟣 Basic Information</Typography>
//         <Divider sx={{ mb: 3 }} />

//         {/* --- Personal Information Section --- */}
//         <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>Personal Details</Typography>
//         <Grid container spacing={2} sx={{ mb: 3 }}>
//           <Grid item xs={12} sm={4}><TextField fullWidth label="First Name" name="first_name" value={formData.first_name || ''} onChange={handleChange} required error={!!errors.first_name} helperText={errors.first_name} /></Grid>
//           <Grid item xs={12} sm={4}><TextField fullWidth label="Middle Name" name="middle_name" value={formData.middle_name || ''} onChange={handleChange} /></Grid>
//           <Grid item xs={12} sm={4}><TextField fullWidth label="Last Name" name="last_name" value={formData.last_name || ''} onChange={handleChange} required error={!!errors.last_name} helperText={errors.last_name} /></Grid>
//           <Grid item xs={12} sm={4}><LocalizationProvider dateAdapter={AdapterDayjs}><DatePicker label="Date of Birth" value={formData.date_of_birth} onChange={handleDateChange} format="DD-MM-YYYY" slotProps={{ textField: { fullWidth: true, error: !!errors.date_of_birth, helperText: errors.date_of_birth }}}/></LocalizationProvider></Grid>
//           <Grid item xs={12} sm={2}><TextField fullWidth label="Age" name="age" type="number" value={formData.age || ''} InputProps={{ readOnly: true }} /></Grid>
//           <Grid item xs={12} sm={3}><FormControl fullWidth><InputLabel>Gender</InputLabel><Select name="gender" value={formData.gender || ''} onChange={handleChange} label="Gender"><MenuItem value={1}>Male</MenuItem><MenuItem value={2}>Female</MenuItem><MenuItem value={3}>Other</MenuItem></Select></FormControl></Grid>
//           <Grid item xs={12} sm={3}><FormControl fullWidth><InputLabel>Marital Status</InputLabel><Select name="marital_status" value={formData.marital_status} onChange={handleChange} label="Marital Status"><MenuItem value={0}>Single</MenuItem><MenuItem value={1}>Married</MenuItem></Select></FormControl></Grid>
//           <Grid item xs={12} sm={4}><FormControl fullWidth><InputLabel>Blood Group</InputLabel><Select name="blood_group" value={formData.blood_group || ''} onChange={handleChange} label="Blood Group"><MenuItem value="A+">A+</MenuItem><MenuItem value="A-">A-</MenuItem><MenuItem value="B+">B+</MenuItem><MenuItem value="B-">B-</MenuItem><MenuItem value="O+">O+</MenuItem><MenuItem value="O-">O-</MenuItem><MenuItem value="AB+">AB+</MenuItem><MenuItem value="AB-">AB-</MenuItem></Select></FormControl></Grid>
//           <Grid item xs={12} sm={4}><TextField fullWidth label="Contact Number" name="contact_number" value={formData.contact_number || ''} onChange={handleChange} inputProps={{ maxLength: 10 }} error={!!errors.contact_number} helperText={errors.contact_number} /></Grid>
//         </Grid>

//         {/* --- Employment Information Section --- */}
//         <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>Employment Details</Typography>
//         <Grid container spacing={2} sx={{ mb: 3 }}>
//           <Grid item xs={12} sm={4}><TextField fullWidth label="Employee ID" name="employee_id" value={formData.employee_id || ''} InputProps={{ readOnly: true }} /></Grid>
//           <Grid item xs={12} sm={4}><FormControl fullWidth><InputLabel>Role</InputLabel><Select name="role_id" value={formData.role_id || ''} onChange={handleChange} label="Role">{roleOptions.map(role => (<MenuItem key={role.role_id} value={role.role_id}>{role.role_name}</MenuItem>))}</Select></FormControl></Grid>
//           <Grid item xs={12} sm={4}><FormControl fullWidth><InputLabel>Employee Hub</InputLabel><Select name="employee_hub_id" value={formData.employee_hub_id || ''} onChange={handleChange} label="Employee Hub">{employeeHubs.map(hub => ( <MenuItem key={hub.employee_hub_id} value={hub.employee_hub_id}>{hub.employee_hub_name}</MenuItem> ))}</Select></FormControl></Grid>
//           <Grid item xs={12} sm={4}><FormControl fullWidth><InputLabel>Status</InputLabel><Select name="is_active" value={formData.is_active} onChange={handleChange} label="Status"><MenuItem value={1}>Active</MenuItem><MenuItem value={0}>Inactive</MenuItem></Select></FormControl></Grid>
//         </Grid>
        
//         {/* --- Permanent Address Section --- */}
//         <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>Permanent Address</Typography>
//         <Grid container spacing={2} sx={{ mb: 3 }}>
//             <Grid item xs={12}><TextField fullWidth label="Address" name="address_1" value={formData.address_1 || ''} onChange={handleChange} /></Grid>
//             <Grid item xs={12} sm={4}><FormControl fullWidth><InputLabel>Country</InputLabel><Select name="country_id" value={formData.country_id || ''} onChange={handleChange} label="Country">{countriesList.map((c) => (<MenuItem key={c.country_id} value={c.country_id}>{c.country_name}</MenuItem>))}</Select></FormControl></Grid>
//             <Grid item xs={12} sm={4}><FormControl fullWidth disabled={!formData.country_id || permStatesList.length === 0}><InputLabel>State / Province</InputLabel><Select name="state_id" value={formData.state_id || ''} onChange={handleChange} label="State / Province">{permStatesList.map((s) => (<MenuItem key={s.state_id} value={s.state_id}>{s.state_name}</MenuItem>))}</Select></FormControl></Grid>
//             <Grid item xs={12} sm={4}><TextField fullWidth label="City" name="city" value={formData.city ||''} onChange={handleChange} /></Grid>
//             <Grid item xs={12} sm={4}><TextField fullWidth label="Zip / Postal Code" name="zip_code" value={formData.zip_code ||''} onChange={handleChange} /></Grid>
//         </Grid>

//         {/* --- Corresponding Address Section --- */}
//         <Box display="flex" justifyContent="space-between" alignItems="center">
//           <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>Corresponding Address</Typography>
//           <FormControlLabel control={<Checkbox checked={isSameAddress} onChange={handleSameAddressChange} />} label="Same as Permanent Address" />
//         </Box>
//         <Grid container spacing={2}>
//             <Grid item xs={12}><TextField fullWidth disabled={isSameAddress} label="Address" name="corr_address_1" value={formData.corr_address_1 || ''} onChange={handleChange} /></Grid>
//             <Grid item xs={12} sm={4}><FormControl fullWidth disabled={isSameAddress}><InputLabel>Country</InputLabel><Select name="corr_country_id" value={formData.corr_country_id || ''} onChange={handleChange} label="Country">{countriesList.map((c) => (<MenuItem key={c.country_id} value={c.country_id}>{c.country_name}</MenuItem>))}</Select></FormControl></Grid>
//             <Grid item xs={12} sm={4}><FormControl fullWidth disabled={isSameAddress || !formData.corr_country_id || corrStatesList.length === 0}><InputLabel>State / Province</InputLabel><Select name="corr_state_id" value={formData.corr_state_id || ''} onChange={handleChange} label="State / Province">{corrStatesList.map((s) => (<MenuItem key={s.state_id} value={s.state_id}>{s.state_name}</MenuItem>))}</Select></FormControl></Grid>
//             <Grid item xs={12} sm={4}><TextField fullWidth disabled={isSameAddress} label="City" name="corr_city" value={formData.corr_city ||''} onChange={handleChange} /></Grid>
//             <Grid item xs={12} sm={4}><TextField fullWidth disabled={isSameAddress} label="Zip / Postal Code" name="corr_zip_code" value={formData.corr_zip_code ||''} onChange={handleChange} /></Grid>
//         </Grid>

//         {/* --- Submit Button --- */}
//         <Grid item xs={12} sx={{ mt: 4 }}>
//           <Box display="flex" justifyContent="flex-end">
//             <Button variant="contained" color="primary" sx={{ textTransform: 'none', px: 4 }} onClick={handleSubmit}>
//               Update Profile
//             </Button>
//           </Box>
//         </Grid>
//       </Paper>
//     </Box>
//   );
// };

// export default BasicInformationForm;











// import React, { useState, useContext, useEffect } from 'react';
// import { EmployeeContext } from './EmployeeContext';
// import axiosInstance from "../../utils/axiosInstance";
// import {
//   Box,
//   Grid,
//   TextField,
//   Typography,
//   MenuItem,
//   Button,
//   FormControl,
//   InputLabel,
//   Select,
//   CircularProgress,
//   Paper,
//   Divider,
//   Checkbox,
//   FormControlLabel
// } from '@mui/material';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import dayjs from 'dayjs';
// import Swal from 'sweetalert2';

// const BasicInformationForm = () => {
//   const { employeeId } = useContext(EmployeeContext);

//   const [formData, setFormData] = useState({
//     // Personal Info
//     first_name: '',
//     middle_name: '',
//     last_name: '',
//     date_of_birth: null,
//     age: '',
//     gender: '',
//     marital_status: 0,
//     blood_group: '',
//     contact_number: '',

//     // Employment Info
//     employee_id: '',
//     role_id: '',
//     employee_hub_id: '',
//     is_active: 1,

//     // Permanent Address (corresponds to API's address_1)
//     address_1: '',
//     country_id: '',
//     state_id: '',
//     city: '',
//     zip_code: '',

//     // Corresponding Address (corresponds to API's address_2)
//     corr_address_1: '',
//     corr_country_id: '',
//     corr_state_id: '',
//     corr_city: '',
//     corr_zip_code: '',
//   });

//   const [loading, setLoading] = useState(true);
//   const [errors, setErrors] = useState({});

//   // Dropdown options
//   const [roleOptions, setRoleOptions] = useState([]);
//   const [countriesList, setCountriesList] = useState([]);
//   const [employeeHubs, setEmployeeHubs] = useState([]);

//   // State lists for addresses
//   const [permStatesList, setPermStatesList] = useState([]);
//   const [corrStatesList, setCorrStatesList] = useState([]);

//   // "Same as Permanent" checkbox state
//   const [isSameAddress, setIsSameAddress] = useState(false);

//   // --- Data Transformation Helpers ---
//   // API String -> Form Numeric Value
//   const genderStringToValue = (genderStr) => {
//     if (!genderStr) return '';
//     const lowerCaseGender = genderStr.toLowerCase();
//     if (lowerCaseGender === 'male') return 1;
//     if (lowerCaseGender === 'female') return 2;
//     if (lowerCaseGender === 'other') return 3;
//     return '';
//   };
//   const isActiveStringToValue = (isActiveStr) => (isActiveStr?.toLowerCase() === 'yes' ? 1 : 0);
//   const maritalStatusStringToValue = (maritalStatusStr) => (maritalStatusStr?.toLowerCase() === 'married' ? 1 : 0);
  
//   // Form Numeric Value -> API String
//   const genderValueToString = (genderVal) => {
//     if (genderVal === 1) return 'male';
//     if (genderVal === 2) return 'female';
//     if (genderVal === 3) return 'other';
//     return '';
//   };
//   const isActiveValueToString = (isActiveVal) => (isActiveVal === 1 ? 'yes' : 'no');
//   const maritalStatusValueToString = (maritalStatusVal) => (maritalStatusVal === 1 ? 'married' : 'single');

//   // Fetch all dropdown data on component mount
//   useEffect(() => {
//     const fetchDropdowns = async () => {
//       try {
//         const [roleRes, countryRes, hubRes] = await Promise.all([
//           axiosInstance.get('/roles/'),
//           axiosInstance.get('/api/countries/'),
//           axiosInstance.get('/api/employee_hub/')
//         ]);
//         setRoleOptions(roleRes.data || []);
//         if (countryRes.data.status === 'success') setCountriesList(countryRes.data.data || []);
//         if (hubRes.data.status === 'success') setEmployeeHubs(hubRes.data.data || []);
//       } catch (error) {
//         console.error('Error fetching dropdown data:', error);
//       }
//     };
//     fetchDropdowns();
//   }, []);

//   // Fetch employee data when employeeId is available
//   useEffect(() => {
//     if (!employeeId) {
//       setLoading(false);
//       return;
//     }

//     setLoading(true);
//     axiosInstance
//       .post('/api/emp_basic_info/', { user_id: employeeId })
//       .then((response) => {
//         const data = response.data?.data?.[0];
//         if (data) {
//           const selectedHub = employeeHubs.find(hub => hub.employee_hub_name === data.employee_hub_name);
          
//           const formattedData = {
//             // Personal
//             first_name: data.first_name || '',
//             middle_name: data.middle_name || '',
//             last_name: data.last_name || '',
//             date_of_birth: data.date_of_birth ? dayjs(data.date_of_birth) : null,
//             gender: genderStringToValue(data.gender),
//             marital_status: maritalStatusStringToValue(data.marital_status),
//             blood_group: data.blood_group || '',
//             contact_number: data.contact_number || '',
            
//             // Employment
//             employee_id: data.employee_id || '',
//             is_active: isActiveStringToValue(data.is_active),
//             role_id: Number(data.role_id || ''),
//             employee_hub_id: selectedHub ? selectedHub.employee_hub_id : '',
            
//             // Permanent Address (from API address_1)
//             address_1: data.address_1 || '',
//             country_id: Number(data.country_id || ''),
//             state_id: Number(data.state_id || ''),
//             city: data.city || '',
//             zip_code: data.zipcode || '',
            
//             // Corresponding Address (from API address_2 and correspondence fields)
//             corr_address_1: data.address_2 || '', // <-- CORRECTED: Mapped from API's address_2
//             corr_country_id: Number(data.correspondence_country || ''),
//             corr_state_id: Number(data.correspondence_state || ''),
//             corr_city: data.correspondence_city || '',
//             corr_zip_code: data.correspondence_pincode || '',
//           };
//           setFormData(formattedData);
//         }
//       })
//       .catch((error) => {
//         console.error('Error fetching employee detail:', error);
//         Swal.fire({ icon: 'error', title: 'Fetch Error', text: 'Failed to fetch employee details.' });
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   }, [employeeId, employeeHubs]); // Dependency on employeeHubs ensures it runs after hubs are fetched

//   // Fetch states for Permanent Address
//   useEffect(() => {
//     const fetchStates = async (countryName) => {
//       setPermStatesList([]);
//       try {
//         const res = await axiosInstance.get(`/api/states/?country_name=${countryName}`);
//         if (res.data.status === 'success') setPermStatesList(res.data.data);
//       } catch (error) {
//         console.error(`Error fetching states for ${countryName}:`, error);
//       }
//     };
//     if (formData.country_id && countriesList.length > 0) {
//       const selectedCountry = countriesList.find(c => c.country_id === formData.country_id);
//       if (selectedCountry) fetchStates(selectedCountry.country_name);
//     } else {
//       setPermStatesList([]);
//     }
//   }, [formData.country_id, countriesList]);

//   // Fetch states for Corresponding Address
//   useEffect(() => {
//     const fetchStates = async (countryName) => {
//       setCorrStatesList([]);
//       try {
//         const res = await axiosInstance.get(`/api/states/?country_name=${countryName}`);
//         if (res.data.status === 'success') setCorrStatesList(res.data.data);
//       } catch (error) {
//         console.error(`Error fetching states for ${countryName}:`, error);
//       }
//     };
//     if (formData.corr_country_id && countriesList.length > 0) {
//       const selectedCountry = countriesList.find(c => c.country_id === formData.corr_country_id);
//       if (selectedCountry) fetchStates(selectedCountry.country_name);
//     } else {
//       setCorrStatesList([]);
//     }
//   }, [formData.corr_country_id, countriesList]);

//   // Calculate age from date_of_birth
//   useEffect(() => {
//     if (formData.date_of_birth) {
//       const birthDate = dayjs(formData.date_of_birth);
//       const today = dayjs();
//       const age = today.diff(birthDate, 'year');
//       setFormData(prev => ({ ...prev, age: age >= 0 ? age : '' }));
//       if (age < 0) {
//         setErrors(prev => ({ ...prev, date_of_birth: 'Date of birth cannot be in the future.' }));
//       } else {
//         setErrors(prev => { const newErrors = { ...prev }; delete newErrors.date_of_birth; return newErrors; });
//       }
//     } else {
//       setFormData(prev => ({ ...prev, age: '' }));
//     }
//   }, [formData.date_of_birth]);
  
//   // Logic for "Same as Permanent Address" checkbox
//   useEffect(() => {
//     if (isSameAddress) {
//       setFormData(prev => ({
//         ...prev,
//         corr_address_1: prev.address_1,
//         corr_country_id: prev.country_id,
//         corr_state_id: prev.state_id,
//         corr_city: prev.city,
//         corr_zip_code: prev.zip_code,
//       }));
//     }
//   }, [isSameAddress, formData.address_1, formData.country_id, formData.state_id, formData.city, formData.zip_code]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     let finalValue = value;
//     if (name === 'contact_number') {
//       finalValue = value.replace(/[^0-9]/g, '').substring(0, 10);
//     }
//     const numericFields = ['age', 'gender', 'is_active', 'marital_status', 'role_id', 'employee_hub_id', 'country_id', 'state_id', 'corr_country_id', 'corr_state_id'];
//     if (numericFields.includes(name)) finalValue = Number(value) || '';

//     setFormData(prev => {
//       const updatedState = { ...prev, [name]: finalValue };
//       if (name === 'country_id') updatedState.state_id = '';
//       if (name === 'corr_country_id') updatedState.corr_state_id = '';
//       return updatedState;
//     });
//   };

//   const handleDateChange = (value) => {
//     setFormData(prev => ({ ...prev, date_of_birth: value }));
//   };

//   const handleSameAddressChange = (event) => setIsSameAddress(event.target.checked);

//   const validateForm = () => {
//     let tempErrors = {};
//     if (!formData.first_name.trim()) tempErrors.first_name = 'First Name is required.';
//     if (!formData.last_name.trim()) tempErrors.last_name = 'Last Name is required.';
//     if (formData.contact_number && formData.contact_number.length !== 10) tempErrors.contact_number = 'Contact number must be 10 digits.';
//     if (formData.date_of_birth && dayjs().isBefore(formData.date_of_birth)) tempErrors.date_of_birth = 'Date of birth cannot be in the future.';
//     setErrors(tempErrors);
//     return Object.keys(tempErrors).length === 0;
//   };

//   const handleSubmit = async () => {
//     if (!validateForm()) {
//       Swal.fire({ icon: 'error', title: 'Validation Error', text: 'Please correct the errors in the form.' });
//       return;
//     }
//     if (!employeeId) {
//       Swal.fire({ icon: 'error', title: 'Missing Information', text: 'Employee ID is missing.' });
//       return;
//     }

//     Swal.fire({ title: 'Updating Profile...', text: 'Please wait.', allowOutsideClick: false, didOpen: () => Swal.showLoading() });
    
//     const payload = {
//       user_id: employeeId,
//       // Personal
//       first_name: formData.first_name,
//       middle_name: formData.middle_name,
//       last_name: formData.last_name,
//       contact_number: formData.contact_number,
//       gender: genderValueToString(formData.gender),
//       age: formData.age ? parseInt(formData.age, 10) : null,
//       date_of_birth: formData.date_of_birth ? dayjs(formData.date_of_birth).format('YYYY-MM-DD') : null,
//       marital_status: maritalStatusValueToString(formData.marital_status),
//       blood_group: formData.blood_group,

//       // Employment
//       employee_id: formData.employee_id,
//       is_active: isActiveValueToString(formData.is_active),
//       role_id: formData.role_id,
//       employee_hub_id: formData.employee_hub_id,
      
//       // Permanent Address
//       address_1: formData.address_1,
//       city: formData.city,
//       zipcode: formData.zip_code,
//       state_id: formData.state_id,
//       country_id: formData.country_id,
      
//       // Correspondence Address
//       address_2: formData.corr_address_1, // <-- CORRECTED: Mapped form's corr_address_1 to payload's address_2
//       correspondence_city: formData.corr_city,
//       correspondence_pincode: formData.corr_zip_code,
//       correspondence_state: formData.corr_state_id,
//       correspondence_country: formData.corr_country_id,
//     };

//     try {
//       await axiosInstance.patch('/api/emp_basic_info/', payload);
//       Swal.fire({ icon: 'success', title: 'Updated!', text: 'Profile updated successfully!' });
//     } catch (error) {
//       const errorMessage = error.response?.data?.message || 'Failed to update profile.';
//       Swal.fire({ icon: 'error', title: 'Update Failed', text: errorMessage });
//     }
//   };

//   if (loading) {
//     return <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress /></Box>;
//   }

//   return (
//     <Box sx={{ p: 3 }}>
//       <Paper elevation={3} sx={{ p: 3 }}>
//         <Typography variant="h6" gutterBottom>🟣 Basic Information</Typography>
//         <Divider sx={{ mb: 3 }} />

//         {/* --- Personal Information Section --- */}
//         <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>Personal Details</Typography>
//         <Grid container spacing={2} sx={{ mb: 3 }}>
//           <Grid item xs={12} sm={4}><TextField fullWidth label="First Name" name="first_name" value={formData.first_name || ''} onChange={handleChange} required error={!!errors.first_name} helperText={errors.first_name} /></Grid>
//           <Grid item xs={12} sm={4}><TextField fullWidth label="Middle Name" name="middle_name" value={formData.middle_name || ''} onChange={handleChange} /></Grid>
//           <Grid item xs={12} sm={4}><TextField fullWidth label="Last Name" name="last_name" value={formData.last_name || ''} onChange={handleChange} required error={!!errors.last_name} helperText={errors.last_name} /></Grid>
//           <Grid item xs={12} sm={4}><LocalizationProvider dateAdapter={AdapterDayjs}><DatePicker label="Date of Birth" value={formData.date_of_birth} onChange={handleDateChange} format="DD-MM-YYYY" slotProps={{ textField: { fullWidth: true, error: !!errors.date_of_birth, helperText: errors.date_of_birth }}}/></LocalizationProvider></Grid>
//           <Grid item xs={12} sm={2}><TextField fullWidth label="Age" name="age" type="number" value={formData.age || ''} InputProps={{ readOnly: true }} /></Grid>
//           <Grid item xs={12} sm={3}><FormControl fullWidth><InputLabel>Gender</InputLabel><Select name="gender" value={formData.gender || ''} onChange={handleChange} label="Gender"><MenuItem value={1}>Male</MenuItem><MenuItem value={2}>Female</MenuItem><MenuItem value={3}>Other</MenuItem></Select></FormControl></Grid>
//           <Grid item xs={12} sm={3}><FormControl fullWidth><InputLabel>Marital Status</InputLabel><Select name="marital_status" value={formData.marital_status} onChange={handleChange} label="Marital Status"><MenuItem value={0}>Single</MenuItem><MenuItem value={1}>Married</MenuItem></Select></FormControl></Grid>
//           <Grid item xs={12} sm={4}><FormControl fullWidth><InputLabel>Blood Group</InputLabel><Select name="blood_group" value={formData.blood_group || ''} onChange={handleChange} label="Blood Group"><MenuItem value="A+">A+</MenuItem><MenuItem value="A-">A-</MenuItem><MenuItem value="B+">B+</MenuItem><MenuItem value="B-">B-</MenuItem><MenuItem value="O+">O+</MenuItem><MenuItem value="O-">O-</MenuItem><MenuItem value="AB+">AB+</MenuItem><MenuItem value="AB-">AB-</MenuItem></Select></FormControl></Grid>
//           <Grid item xs={12} sm={4}><TextField fullWidth label="Contact Number" name="contact_number" value={formData.contact_number || ''} onChange={handleChange} inputProps={{ maxLength: 10 }} error={!!errors.contact_number} helperText={errors.contact_number} /></Grid>
//         </Grid>

//         {/* --- Employment Information Section --- */}
//         <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>Employment Details</Typography>
//         <Grid container spacing={2} sx={{ mb: 3 }}>
//           <Grid item xs={12} sm={4}><TextField fullWidth label="Employee ID" name="employee_id" value={formData.employee_id || ''} InputProps={{ readOnly: true }} /></Grid>
//           <Grid item xs={12} sm={4}><FormControl fullWidth><InputLabel>Role</InputLabel><Select name="role_id" value={formData.role_id || ''} onChange={handleChange} label="Role">{roleOptions.map(role => (<MenuItem key={role.role_id} value={role.role_id}>{role.role_name}</MenuItem>))}</Select></FormControl></Grid>
//           <Grid item xs={12} sm={4}><FormControl fullWidth><InputLabel>Employee Hub</InputLabel><Select name="employee_hub_id" value={formData.employee_hub_id || ''} onChange={handleChange} label="Employee Hub">{employeeHubs.map(hub => ( <MenuItem key={hub.employee_hub_id} value={hub.employee_hub_id}>{hub.employee_hub_name}</MenuItem> ))}</Select></FormControl></Grid>
//           <Grid item xs={12} sm={4}><FormControl fullWidth><InputLabel>Status</InputLabel><Select name="is_active" value={formData.is_active} onChange={handleChange} label="Status"><MenuItem value={1}>Active</MenuItem><MenuItem value={0}>Inactive</MenuItem></Select></FormControl></Grid>
//         </Grid>
        
//         {/* --- Permanent Address Section --- */}
//         <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>Permanent Address</Typography>
//         <Grid container spacing={2} sx={{ mb: 3 }}>
//             <Grid item xs={12}><TextField fullWidth label="Address" name="address_1" value={formData.address_1 || ''} onChange={handleChange} /></Grid>
//             <Grid item xs={12} sm={4}><FormControl fullWidth><InputLabel>Country</InputLabel><Select name="country_id" value={formData.country_id || ''} onChange={handleChange} label="Country">{countriesList.map((c) => (<MenuItem key={c.country_id} value={c.country_id}>{c.country_name}</MenuItem>))}</Select></FormControl></Grid>
//             <Grid item xs={12} sm={4}><FormControl fullWidth disabled={!formData.country_id || permStatesList.length === 0}><InputLabel>State / Province</InputLabel><Select name="state_id" value={formData.state_id || ''} onChange={handleChange} label="State / Province">{permStatesList.map((s) => (<MenuItem key={s.state_id} value={s.state_id}>{s.state_name}</MenuItem>))}</Select></FormControl></Grid>
//             <Grid item xs={12} sm={4}><TextField fullWidth label="City" name="city" value={formData.city ||''} onChange={handleChange} /></Grid>
//             <Grid item xs={12} sm={4}><TextField fullWidth label="Zip / Postal Code" name="zip_code" value={formData.zip_code ||''} onChange={handleChange} /></Grid>
//         </Grid>

//         {/* --- Corresponding Address Section --- */}
//         <Box display="flex" justifyContent="space-between" alignItems="center">
//           <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>Corresponding Address</Typography>
//           <FormControlLabel control={<Checkbox checked={isSameAddress} onChange={handleSameAddressChange} />} label="Same as Permanent Address" />
//         </Box>
//         <Grid container spacing={2}>
//             <Grid item xs={12}><TextField fullWidth disabled={isSameAddress} label="Address" name="corr_address_1" value={formData.corr_address_1 || ''} onChange={handleChange} /></Grid>
//             <Grid item xs={12} sm={4}><FormControl fullWidth disabled={isSameAddress}><InputLabel>Country</InputLabel><Select name="corr_country_id" value={formData.corr_country_id || ''} onChange={handleChange} label="Country">{countriesList.map((c) => (<MenuItem key={c.country_id} value={c.country_id}>{c.country_name}</MenuItem>))}</Select></FormControl></Grid>
//             <Grid item xs={12} sm={4}><FormControl fullWidth disabled={isSameAddress || !formData.corr_country_id || corrStatesList.length === 0}><InputLabel>State / Province</InputLabel><Select name="corr_state_id" value={formData.corr_state_id || ''} onChange={handleChange} label="State / Province">{corrStatesList.map((s) => (<MenuItem key={s.state_id} value={s.state_id}>{s.state_name}</MenuItem>))}</Select></FormControl></Grid>
//             <Grid item xs={12} sm={4}><TextField fullWidth disabled={isSameAddress} label="City" name="corr_city" value={formData.corr_city ||''} onChange={handleChange} /></Grid>
//             <Grid item xs={12} sm={4}><TextField fullWidth disabled={isSameAddress} label="Zip / Postal Code" name="corr_zip_code" value={formData.corr_zip_code ||''} onChange={handleChange} /></Grid>
//         </Grid>

//         {/* --- Submit Button --- */}
//         <Grid item xs={12} sx={{ mt: 4 }}>
//           <Box display="flex" justifyContent="flex-end">
//             <Button variant="contained" color="primary" sx={{ textTransform: 'none', px: 4 }} onClick={handleSubmit}>
//               Update Profile
//             </Button>
//           </Box>
//         </Grid>
//       </Paper>
//     </Box>
//   );
// };

// export default BasicInformationForm;








// import React, { useState, useContext, useEffect } from 'react';
// import { EmployeeContext } from './EmployeeContext';
// import axiosInstance from "../../utils/axiosInstance";
// import {
//   Box,
//   Grid,
//   TextField,
//   Typography,
//   MenuItem,
//   Button,
//   FormControl,
//   InputLabel,
//   Select,
//   CircularProgress,
//   Paper,
//   Divider,
//   Checkbox,
//   FormControlLabel
// } from '@mui/material';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import dayjs from 'dayjs';
// import Swal from 'sweetalert2';

// const BasicInformationForm = () => {
//   const { employeeId } = useContext(EmployeeContext);

//   const [formData, setFormData] = useState({
//     first_name: '',
//     middle_name: '',
//     last_name: '',
//     date_of_birth: null,
//     age: '',
//     gender: '',
//     marital_status: 0,
//     blood_group: '',
//     contact_number: '',
//     employee_id: '',
//     role_id: '',
//     employee_hub_id: '',
//     is_active: 1,
//     address_1: '',
//     country_id: '',
//     state_id: '',
//     city: '',
//     zip_code: '',
//     corr_address_1: '',
//     corr_country_id: '',
//     corr_state_id: '',
//     corr_city: '',
//     corr_zip_code: '',
//   });

//   const [loading, setLoading] = useState(true);
//   const [errors, setErrors] = useState({});
//   const [roleOptions, setRoleOptions] = useState([]);
//   const [countriesList, setCountriesList] = useState([]);
//   const [employeeHubs, setEmployeeHubs] = useState([]);
//   const [permStatesList, setPermStatesList] = useState([]);
//   const [corrStatesList, setCorrStatesList] = useState([]);
//   const [isSameAddress, setIsSameAddress] = useState(false);

//   const genderStringToValue = (genderStr) => {
//     if (!genderStr) return '';
//     const lowerCaseGender = genderStr.toLowerCase();
//     if (lowerCaseGender === 'male') return 1;
//     if (lowerCaseGender === 'female') return 2;
//     if (lowerCaseGender === 'other') return 3;
//     return '';
//   };
//   const isActiveStringToValue = (isActiveStr) => (isActiveStr?.toLowerCase() === 'yes' ? 1 : 0);
//   const maritalStatusStringToValue = (maritalStatusStr) => (maritalStatusStr?.toLowerCase() === 'married' ? 1 : 0);
 
//   const genderValueToString = (genderVal) => {
//     if (genderVal === 1) return 'male';
//     if (genderVal === 2) return 'female';
//     if (genderVal === 3) return 'other';
//     return '';
//   };
//   const maritalStatusValueToString = (maritalStatusVal) => (maritalStatusVal === 1 ? 'married' : 'single');

//   useEffect(() => {
//     const fetchDropdowns = async () => {
//       try {
//         const [roleRes, countryRes, hubRes] = await Promise.all([
//           axiosInstance.get('/roles/'),
//           axiosInstance.get('/api/countries/'),
//           axiosInstance.get('/api/employee_hub/')
//         ]);
//         setRoleOptions(roleRes.data || []);
//         if (countryRes.data.status === 'success') setCountriesList(countryRes.data.data || []);
//         if (hubRes.data.status === 'success') setEmployeeHubs(hubRes.data.data || []);
//       } catch (error) {
//         console.error('Error fetching dropdown data:', error);
//       }
//     };
//     fetchDropdowns();
//   }, []);

//   useEffect(() => {
//     if (!employeeId) {
//       setLoading(false);
//       return;
//     }

//     setLoading(true);
//     axiosInstance
//       .post('/api/emp_basic_info/', { user_id: employeeId })
//       .then((response) => {
//         const data = response.data?.data?.[0];
//         if (data) {
//           const selectedHub = employeeHubs.find(hub => hub.employee_hub_name === data.employee_hub_name);
         
//           const formattedData = {
//             first_name: data.first_name || '',
//             middle_name: data.middle_name || '',
//             last_name: data.last_name || '',
//             date_of_birth: data.date_of_birth ? dayjs(data.date_of_birth) : null,
//             gender: genderStringToValue(data.gender),
//             marital_status: maritalStatusStringToValue(data.marital_status),
//             blood_group: data.blood_group || '',
//             contact_number: data.contact_number || '',
//             employee_id: data.employee_id || '',
//             is_active: isActiveStringToValue(data.is_active),
//             role_id: Number(data.role_id || ''),
//             employee_hub_id: selectedHub ? selectedHub.employee_hub_id : '',
//             address_1: data.address_1 || '',
//             country_id: Number(data.country_id || ''),
//             state_id: Number(data.state_id || ''),
//             city: data.city || '',
//             zip_code: data.zipcode || '',
//             corr_address_1: data.address_2 || '',
//             corr_country_id: Number(data.correspondence_country || ''),
//             corr_state_id: Number(data.correspondence_state || ''),
//             corr_city: data.correspondence_city || '',
//             corr_zip_code: data.correspondence_pincode || '',
//           };
//           setFormData(formattedData);
//         }
//       })
//       .catch((error) => {
//         console.error('Error fetching employee detail:', error);
//         Swal.fire({ icon: 'error', title: 'Fetch Error', text: 'Failed to fetch employee details.' });
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   }, [employeeId, employeeHubs]);

//   useEffect(() => {
//     const fetchStates = async (countryName) => {
//       setPermStatesList([]);
//       try {
//         const res = await axiosInstance.get(`/api/states/?country_name=${countryName}`);
//         if (res.data.status === 'success') setPermStatesList(res.data.data);
//       } catch (error) {
//         console.error(`Error fetching states for ${countryName}:`, error);
//       }
//     };
//     if (formData.country_id && countriesList.length > 0) {
//       const selectedCountry = countriesList.find(c => c.country_id === formData.country_id);
//       if (selectedCountry) fetchStates(selectedCountry.country_name);
//     } else {
//       setPermStatesList([]);
//     }
//   }, [formData.country_id, countriesList]);

//   useEffect(() => {
//     const fetchStates = async (countryName) => {
//       setCorrStatesList([]);
//       try {
//         const res = await axiosInstance.get(`/api/states/?country_name=${countryName}`);
//         if (res.data.status === 'success') setCorrStatesList(res.data.data);
//       } catch (error) {
//         console.error(`Error fetching states for ${countryName}:`, error);
//       }
//     };
//     if (formData.corr_country_id && countriesList.length > 0) {
//       const selectedCountry = countriesList.find(c => c.country_id === formData.corr_country_id);
//       if (selectedCountry) fetchStates(selectedCountry.country_name);
//     } else {
//       setCorrStatesList([]);
//     }
//   }, [formData.corr_country_id, countriesList]);

//   useEffect(() => {
//     if (formData.date_of_birth) {
//       const birthDate = dayjs(formData.date_of_birth);
//       const today = dayjs();
//       const age = today.diff(birthDate, 'year');
//       setFormData(prev => ({ ...prev, age: age >= 0 ? age : '' }));
//       if (age < 0) {
//         setErrors(prev => ({ ...prev, date_of_birth: 'Date of birth cannot be in the future.' }));
//       } else {
//         setErrors(prev => { const newErrors = { ...prev }; delete newErrors.date_of_birth; return newErrors; });
//       }
//     } else {
//       setFormData(prev => ({ ...prev, age: '' }));
//     }
//   }, [formData.date_of_birth]);
 
//   useEffect(() => {
//     if (isSameAddress) {
//       setFormData(prev => ({
//         ...prev,
//         corr_address_1: prev.address_1,
//         corr_country_id: prev.country_id,
//         corr_state_id: prev.state_id,
//         corr_city: prev.city,
//         corr_zip_code: prev.zip_code,
//       }));
//     }
//   }, [isSameAddress, formData.address_1, formData.country_id, formData.state_id, formData.city, formData.zip_code]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     let finalValue = value;
//     if (name === 'contact_number') {
//       finalValue = value.replace(/[^0-9]/g, '').substring(0, 10);
//     }
//     const numericFields = ['age', 'gender', 'is_active', 'marital_status', 'role_id', 'employee_hub_id', 'country_id', 'state_id', 'corr_country_id', 'corr_state_id'];
//     if (numericFields.includes(name)) finalValue = Number(value) || '';

//     setFormData(prev => {
//       const updatedState = { ...prev, [name]: finalValue };
//       if (name === 'country_id') updatedState.state_id = '';
//       if (name === 'corr_country_id') updatedState.corr_state_id = '';
//       return updatedState;
//     });
//   };

//   const handleDateChange = (value) => {
//     setFormData(prev => ({ ...prev, date_of_birth: value }));
//   };

//   const handleSameAddressChange = (event) => setIsSameAddress(event.target.checked);

//   const validateForm = () => {
//     let tempErrors = {};
//     if (!formData.first_name.trim()) tempErrors.first_name = 'First Name is required.';
//     if (!formData.last_name.trim()) tempErrors.last_name = 'Last Name is required.';
//     if (formData.contact_number && formData.contact_number.length !== 10) tempErrors.contact_number = 'Contact number must be 10 digits.';
//     if (formData.date_of_birth && dayjs().isBefore(formData.date_of_birth)) tempErrors.date_of_birth = 'Date of birth cannot be in the future.';
//     setErrors(tempErrors);
//     return Object.keys(tempErrors).length === 0;
//   };

//   const handleSubmit = async () => {
//     if (!validateForm()) {
//       Swal.fire({ icon: 'error', title: 'Validation Error', text: 'Please correct the errors in the form.' });
//       return;
//     }
//     if (!employeeId) {
//       Swal.fire({ icon: 'error', title: 'Missing Information', text: 'Employee ID is missing.' });
//       return;
//     }

//     Swal.fire({ title: 'Updating Profile...', text: 'Please wait.', allowOutsideClick: false, didOpen: () => Swal.showLoading() });
   
//     const payload = {
//       user_id: employeeId,
//       first_name: formData.first_name,
//       middle_name: formData.middle_name,
//       last_name: formData.last_name,
//       contact_number: formData.contact_number,
//       gender: genderValueToString(formData.gender),
//       age: formData.age ? parseInt(formData.age, 10) : null,
//       date_of_birth: formData.date_of_birth ? dayjs(formData.date_of_birth).format('YYYY-MM-DD') : null,
//       marital_status: maritalStatusValueToString(formData.marital_status),
//       blood_group: formData.blood_group,
//       employee_id: formData.employee_id,
//       is_active: formData.is_active,
//       role_id: formData.role_id,
//       employee_hub_id: formData.employee_hub_id,
//       address_1: formData.address_1,
//       city: formData.city,
//       zipcode: formData.zip_code,
//       state_id: formData.state_id,
//       country_id: formData.country_id,
//       address_2: formData.corr_address_1,
//       correspondence_city: formData.corr_city,
//       correspondence_pincode: formData.corr_zip_code,
//       correspondence_state: formData.corr_state_id,
//       correspondence_country: formData.corr_country_id,
//     };

//     try {
//       await axiosInstance.patch('/api/emp_basic_info/', payload);
//       Swal.fire({ icon: 'success', title: 'Updated!', text: 'Profile updated successfully!' });
//     } catch (error) {
//       const errorMessage = error.response?.data?.message || 'Failed to update profile.';
//       Swal.fire({ icon: 'error', title: 'Update Failed', text: errorMessage });
//     }
//   };

//   if (loading) {
//     return <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress /></Box>;
//   }

  

//   return (
//     <Box sx={{ p: 3 }}>
//       <Paper elevation={3} sx={{ p: 3 }}>
//         <Typography variant="h6" gutterBottom>🟣 Basic Information</Typography>
//         <Divider sx={{ mb: 3 }} />

//         <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>Personal Details</Typography>
//         <Grid container spacing={2} sx={{ mb: 3 }}>
//           <Grid item xs={12} sm={4}><TextField fullWidth label="First Name" name="first_name" value={formData.first_name || ''} onChange={handleChange} required error={!!errors.first_name} helperText={errors.first_name} /></Grid>
//           <Grid item xs={12} sm={4}><TextField fullWidth label="Middle Name" name="middle_name" value={formData.middle_name || ''} onChange={handleChange} /></Grid>
//           <Grid item xs={12} sm={4}><TextField fullWidth label="Last Name" name="last_name" value={formData.last_name || ''} onChange={handleChange} required error={!!errors.last_name} helperText={errors.last_name} /></Grid>
//           <Grid item xs={12} sm={4}><LocalizationProvider dateAdapter={AdapterDayjs}><DatePicker label="Date of Birth" value={formData.date_of_birth} onChange={handleDateChange} format="DD-MM-YYYY" slotProps={{ textField: { fullWidth: true, error: !!errors.date_of_birth, helperText: errors.date_of_birth }}}/></LocalizationProvider></Grid>
//           <Grid item xs={12} sm={2}><TextField fullWidth label="Age" name="age" type="number" value={formData.age || ''} InputProps={{ readOnly: true }} /></Grid>
//           <Grid item xs={12} sm={3}><FormControl fullWidth><InputLabel>Gender</InputLabel><Select name="gender" value={formData.gender || ''} onChange={handleChange} label="Gender"><MenuItem value={1}>Male</MenuItem><MenuItem value={2}>Female</MenuItem><MenuItem value={3}>Other</MenuItem></Select></FormControl></Grid>
//           <Grid item xs={12} sm={3}><FormControl fullWidth><InputLabel>Marital Status</InputLabel><Select name="marital_status" value={formData.marital_status} onChange={handleChange} label="Marital Status"><MenuItem value={0}>Single</MenuItem><MenuItem value={1}>Married</MenuItem></Select></FormControl></Grid>
//           <Grid item xs={12} sm={4}><FormControl fullWidth><InputLabel>Blood Group</InputLabel><Select name="blood_group" value={formData.blood_group || ''} onChange={handleChange} label="Blood Group"><MenuItem value="A+">A+</MenuItem><MenuItem value="A-">A-</MenuItem><MenuItem value="B+">B+</MenuItem><MenuItem value="B-">B-</MenuItem><MenuItem value="O+">O+</MenuItem><MenuItem value="O-">O-</MenuItem><MenuItem value="AB+">AB+</MenuItem><MenuItem value="AB-">AB-</MenuItem></Select></FormControl></Grid>
//           <Grid item xs={12} sm={4}><TextField fullWidth label="Contact Number" name="contact_number" value={formData.contact_number || ''} onChange={handleChange} inputProps={{ maxLength: 10 }} error={!!errors.contact_number} helperText={errors.contact_number} /></Grid>
//         </Grid>

//         <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>Employment Details</Typography>
//         <Grid container spacing={2} sx={{ mb: 3 }}>
//           <Grid item xs={12} sm={4}><TextField fullWidth label="Employee ID" name="employee_id" value={formData.employee_id || ''} InputProps={{ readOnly: true }} /></Grid>
//           <Grid item xs={12} sm={4}><FormControl fullWidth><InputLabel>Role</InputLabel><Select name="role_id" value={formData.role_id || ''} onChange={handleChange} label="Role">{roleOptions.map(role => (<MenuItem key={role.role_id} value={role.role_id}>{role.role_name}</MenuItem>))}</Select></FormControl></Grid>
//           <Grid item xs={12} sm={4}><FormControl fullWidth><InputLabel>Holiday Hub</InputLabel><Select name="employee_hub_id" value={formData.employee_hub_id || ''} onChange={handleChange} label="holiday Hub">{employeeHubs.map(hub => ( <MenuItem key={hub.employee_hub_id} value={hub.employee_hub_id}>{hub.employee_hub_name}</MenuItem> ))}</Select></FormControl></Grid>
//           <Grid item xs={12} sm={4}><FormControl fullWidth><InputLabel>Status</InputLabel><Select name="is_active" value={formData.is_active} onChange={handleChange} label="Status"><MenuItem value={1}>Active</MenuItem><MenuItem value={0}>Inactive</MenuItem></Select></FormControl></Grid>
//         </Grid>
       
//         <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>Permanent Address</Typography>
//         <Grid container spacing={2} sx={{ mb: 3 }}>
//             <Grid item xs={12}><TextField fullWidth label="Address" name="address_1" value={formData.address_1 || ''} onChange={handleChange} /></Grid>
//             <Grid item xs={12} sm={4}><FormControl fullWidth><InputLabel>Country</InputLabel><Select name="country_id" value={formData.country_id || ''} onChange={handleChange} label="Country">{countriesList.map((c) => (<MenuItem key={c.country_id} value={c.country_id}>{c.country_name}</MenuItem>))}</Select></FormControl></Grid>
//             <Grid item xs={12} sm={4}><FormControl fullWidth disabled={!formData.country_id || permStatesList.length === 0}><InputLabel>State / Province</InputLabel><Select name="state_id" value={formData.state_id || ''} onChange={handleChange} label="State / Province">{permStatesList.map((s) => (<MenuItem key={s.state_id} value={s.state_id}>{s.state_name}</MenuItem>))}</Select></FormControl></Grid>
//             <Grid item xs={12} sm={4}><TextField fullWidth label="City" name="city" value={formData.city ||''} onChange={handleChange} /></Grid>
//             <Grid item xs={12} sm={4}><TextField fullWidth label="Zip / Postal Code" name="zip_code" value={formData.zip_code ||''} onChange={handleChange} /></Grid>
//         </Grid>

//         <Box display="flex" justifyContent="space-between" alignItems="center">
//           <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>Corresponding Address</Typography>
//           <FormControlLabel control={<Checkbox checked={isSameAddress} onChange={handleSameAddressChange} />} label="Same as Permanent Address" />
//         </Box>
//         <Grid container spacing={2}>
//             <Grid item xs={12}><TextField fullWidth disabled={isSameAddress} label="Address" name="corr_address_1" value={formData.corr_address_1 || ''} onChange={handleChange} /></Grid>
//             <Grid item xs={12} sm={4}><FormControl fullWidth disabled={isSameAddress}><InputLabel>Country</InputLabel><Select name="corr_country_id" value={formData.corr_country_id || ''} onChange={handleChange} label="Country">{countriesList.map((c) => (<MenuItem key={c.country_id} value={c.country_id}>{c.country_name}</MenuItem>))}</Select></FormControl></Grid>
//             <Grid item xs={12} sm={4}><FormControl fullWidth disabled={isSameAddress || !formData.corr_country_id || corrStatesList.length === 0}><InputLabel>State / Province</InputLabel><Select name="corr_state_id" value={formData.corr_state_id || ''} onChange={handleChange} label="State / Province">{corrStatesList.map((s) => (<MenuItem key={s.state_id} value={s.state_id}>{s.state_name}</MenuItem>))}</Select></FormControl></Grid>
//             <Grid item xs={12} sm={4}><TextField fullWidth disabled={isSameAddress} label="City" name="corr_city" value={formData.corr_city ||''} onChange={handleChange} /></Grid>
//             <Grid item xs={12} sm={4}><TextField fullWidth disabled={isSameAddress} label="Zip / Postal Code" name="corr_zip_code" value={formData.corr_zip_code ||''} onChange={handleChange} /></Grid>
//         </Grid>

//         <Grid item xs={12} sx={{ mt: 4 }}>
//           <Box display="flex" justifyContent="flex-end">
//             <Button variant="contained" color="primary" sx={{ textTransform: 'none', px: 4 }} onClick={handleSubmit}>
//               Update Profile
//             </Button>
//           </Box>
//         </Grid>
//       </Paper>
//     </Box>
//   );
// };

// export default BasicInformationForm;



// import React, { useState, useContext, useEffect } from 'react';
// import { EmployeeContext } from './EmployeeContext';
// import axiosInstance from "../../utils/axiosInstance";
// import {
//   Box, Grid, TextField, Typography, MenuItem, Button, FormControl,
//   InputLabel, Select, CircularProgress, Checkbox, FormControlLabel
// } from '@mui/material';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import dayjs from 'dayjs';
// import Swal from 'sweetalert2';

// const PRIMARY_COLOR = "#8C257C";

// const BasicInformation = ({ onNext, onBack }) => {
//   const { employeeId } = useContext(EmployeeContext);
//   const [loading, setLoading] = useState(true);
  
//   // State
//   const [roleOptions, setRoleOptions] = useState([]);
//   const [countriesList, setCountriesList] = useState([]);
//   const [employeeHubs, setEmployeeHubs] = useState([]);
//   const [permStatesList, setPermStatesList] = useState([]);
//   const [corrStatesList, setCorrStatesList] = useState([]);
//   const [isSameAddress, setIsSameAddress] = useState(false);

//   const [formData, setFormData] = useState({
//     first_name: '', middle_name: '', last_name: '',
//     date_of_birth: null, age: '', gender: '', marital_status: 0,
//     blood_group: '', contact_number: '', employee_id: '',
//     role_id: '', employee_hub_id: '', is_active: 1,
//     address_1: '', country_id: '', state_id: '', city: '', zip_code: '',
//     corr_address_1: '', corr_country_id: '', corr_state_id: '', corr_city: '', corr_zip_code: '',
//   });

//   const genderStringToValue = (str) => {
//     if (!str) return '';
//     const s = str.toLowerCase();
//     return s === 'male' ? 1 : s === 'female' ? 2 : 3;
//   };
//   const genderValueToString = (v) => (v === 1 ? 'male' : v === 2 ? 'female' : 'other');

//   useEffect(() => {
//     const fetchDropdowns = async () => {
//       try {
//         const [roleRes, countryRes, hubRes] = await Promise.all([
//           axiosInstance.get('/roles/'),
//           axiosInstance.get('/api/countries/'),
//           axiosInstance.get('/api/employee_hub/')
//         ]);
//         setRoleOptions(roleRes.data || []);
//         if (countryRes.data.status === 'success') setCountriesList(countryRes.data.data || []);
//         if (hubRes.data.status === 'success') setEmployeeHubs(hubRes.data.data || []);
//       } catch (error) { console.error(error); }
//     };
//     fetchDropdowns();
//   }, []);

//   useEffect(() => {
//     if (!employeeId) return;
//     setLoading(true);
//     axiosInstance.post('/api/emp_basic_info/', { user_id: employeeId })
//       .then((res) => {
//         const data = res.data?.data?.[0];
//         if (data) {
//           const selectedHub = employeeHubs.find(h => h.employee_hub_name === data.employee_hub_name);
//           setFormData({
//             first_name: data.first_name || '',
//             middle_name: data.middle_name || '',
//             last_name: data.last_name || '',
//             date_of_birth: data.date_of_birth ? dayjs(data.date_of_birth) : null,
//             gender: genderStringToValue(data.gender),
//             marital_status: data.marital_status?.toLowerCase() === 'married' ? 1 : 0,
//             blood_group: data.blood_group || '',
//             contact_number: data.contact_number || '',
//             employee_id: data.employee_id || '',
//             is_active: data.is_active?.toLowerCase() === 'yes' ? 1 : 0,
//             role_id: Number(data.role_id || ''),
//             employee_hub_id: selectedHub ? selectedHub.employee_hub_id : '',
//             address_1: data.address_1 || '',
//             country_id: Number(data.country_id || ''),
//             state_id: Number(data.state_id || ''),
//             city: data.city || '',
//             zip_code: data.zipcode || '',
//             corr_address_1: data.address_2 || '',
//             corr_country_id: Number(data.correspondence_country || ''),
//             corr_state_id: Number(data.correspondence_state || ''),
//             corr_city: data.correspondence_city || '',
//             corr_zip_code: data.correspondence_pincode || '',
//           });
//         }
//       })
//       .finally(() => setLoading(false));
//   }, [employeeId, employeeHubs]);

//   useEffect(() => {
//     if (formData.country_id && countriesList.length) {
//       const c = countriesList.find(x => x.country_id === formData.country_id);
//       if (c) axiosInstance.get(`/api/states/?country_name=${c.country_name}`).then(r => setPermStatesList(r.data.data));
//     }
//   }, [formData.country_id, countriesList]);

//   useEffect(() => {
//     if (formData.corr_country_id && countriesList.length) {
//       const c = countriesList.find(x => x.country_id === formData.corr_country_id);
//       if (c) axiosInstance.get(`/api/states/?country_name=${c.country_name}`).then(r => setCorrStatesList(r.data.data));
//     }
//   }, [formData.corr_country_id, countriesList]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleDateChange = (val) => {
//     setFormData(prev => ({ ...prev, date_of_birth: val }));
//     if (val) {
//       const age = dayjs().diff(val, 'year');
//       setFormData(prev => ({ ...prev, age: age >= 0 ? age : '' }));
//     }
//   };

//   const handleSubmit = async () => {
//     if (!formData.first_name || !formData.last_name) {
//       Swal.fire('Error', 'First and Last Name are required', 'error');
//       return;
//     }

//     const payload = {
//       user_id: employeeId,
//       ...formData,
//       date_of_birth: formData.date_of_birth ? formData.date_of_birth.format('YYYY-MM-DD') : null,
//       gender: genderValueToString(formData.gender),
//       marital_status: formData.marital_status === 1 ? 'married' : 'single',
//       address_2: formData.corr_address_1,
//       correspondence_city: formData.corr_city,
//       correspondence_pincode: formData.corr_zip_code,
//       correspondence_state: formData.corr_state_id,
//       correspondence_country: formData.corr_country_id,
//       zipcode: formData.zip_code
//     };

//     try {
//       Swal.showLoading();
//       await axiosInstance.patch('/api/emp_basic_info/', payload);
//       Swal.close();
//       if (onNext) onNext();
//     } catch (error) {
//       Swal.fire('Error', 'Failed to update profile.', 'error');
//     }
//   };

//   if (loading) return <Box display="flex" justifyContent="center" p={4}><CircularProgress /></Box>;

//   return (
//     <Box sx={{ p: 2 }}>
//       <Typography variant="h6" gutterBottom color={PRIMARY_COLOR} fontWeight="bold">Basic Information</Typography>
      
//       <Grid container spacing={2} sx={{ mb: 3 }}>
//           <Grid item xs={12} sm={4}><TextField fullWidth label="First Name" name="first_name" value={formData.first_name} onChange={handleChange} required /></Grid>
//           <Grid item xs={12} sm={4}><TextField fullWidth label="Middle Name" name="middle_name" value={formData.middle_name} onChange={handleChange} /></Grid>
//           <Grid item xs={12} sm={4}><TextField fullWidth label="Last Name" name="last_name" value={formData.last_name} onChange={handleChange} required /></Grid>
          
//           <Grid item xs={12} sm={4}>
//             <LocalizationProvider dateAdapter={AdapterDayjs}>
//                 <DatePicker label="Date of Birth" value={formData.date_of_birth} onChange={handleDateChange} slotProps={{ textField: { fullWidth: true } }}/>
//             </LocalizationProvider>
//           </Grid>
//           <Grid item xs={12} sm={2}><TextField fullWidth label="Age" value={formData.age} InputProps={{ readOnly: true }} /></Grid>
          
//           <Grid item xs={12} sm={3}>
//             <FormControl fullWidth><InputLabel>Gender</InputLabel>
//                 <Select name="gender" value={formData.gender} onChange={handleChange} label="Gender">
//                     <MenuItem value={1}>Male</MenuItem><MenuItem value={2}>Female</MenuItem><MenuItem value={3}>Other</MenuItem>
//                 </Select>
//             </FormControl>
//           </Grid>
//           <Grid item xs={12} sm={3}>
//             <FormControl fullWidth><InputLabel>Marital Status</InputLabel>
//                 <Select name="marital_status" value={formData.marital_status} onChange={handleChange} label="Marital Status">
//                     <MenuItem value={0}>Single</MenuItem><MenuItem value={1}>Married</MenuItem>
//                 </Select>
//             </FormControl>
//           </Grid>
          
//           <Grid item xs={12} sm={6}><TextField fullWidth label="Contact" name="contact_number" value={formData.contact_number} onChange={handleChange} /></Grid>
//           <Grid item xs={12} sm={6}>
//             <FormControl fullWidth><InputLabel>Blood Group</InputLabel>
//                 <Select name="blood_group" value={formData.blood_group} onChange={handleChange} label="Blood Group">
//                     {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map(b => <MenuItem key={b} value={b}>{b}</MenuItem>)}
//                 </Select>
//             </FormControl>
//           </Grid>
//       </Grid>

//       <Typography variant="subtitle1" fontWeight="bold" gutterBottom>Addresses</Typography>
//       <Grid container spacing={2}>
//         <Grid item xs={12}><TextField fullWidth label="Permanent Address" name="address_1" value={formData.address_1} onChange={handleChange} /></Grid>
//         <Grid item xs={6} md={3}>
//             <TextField select fullWidth label="Country" name="country_id" value={formData.country_id} onChange={handleChange}>
//                 {countriesList.map(c => <MenuItem key={c.country_id} value={c.country_id}>{c.country_name}</MenuItem>)}
//             </TextField>
//         </Grid>
//         <Grid item xs={6} md={3}>
//             <TextField select fullWidth label="State" name="state_id" value={formData.state_id} onChange={handleChange}>
//                 {permStatesList.map(s => <MenuItem key={s.state_id} value={s.state_id}>{s.state_name}</MenuItem>)}
//             </TextField>
//         </Grid>
//         <Grid item xs={6} md={3}><TextField fullWidth label="City" name="city" value={formData.city} onChange={handleChange} /></Grid>
//         <Grid item xs={6} md={3}><TextField fullWidth label="Zip Code" name="zip_code" value={formData.zip_code} onChange={handleChange} /></Grid>
//       </Grid>
      
//       <Box mt={2} mb={2}>
//          <FormControlLabel control={<Checkbox checked={isSameAddress} onChange={(e) => {
//              setIsSameAddress(e.target.checked);
//              if(e.target.checked) {
//                  setFormData(prev => ({
//                      ...prev,
//                      corr_address_1: prev.address_1, corr_country_id: prev.country_id,
//                      corr_state_id: prev.state_id, corr_city: prev.city, corr_zip_code: prev.zip_code
//                  }));
//              }
//          }} />} label="Correspondence same as Permanent" />
//       </Box>
      
//       {!isSameAddress && (
//         <Grid container spacing={2}>
//              <Grid item xs={12}><TextField fullWidth label="Correspondence Address" name="corr_address_1" value={formData.corr_address_1} onChange={handleChange} /></Grid>
//              <Grid item xs={6} md={3}>
//                 <TextField select fullWidth label="Country" name="corr_country_id" value={formData.corr_country_id} onChange={handleChange}>
//                     {countriesList.map(c => <MenuItem key={c.country_id} value={c.country_id}>{c.country_name}</MenuItem>)}
//                 </TextField>
//              </Grid>
//              <Grid item xs={6} md={3}>
//                 <TextField select fullWidth label="State" name="corr_state_id" value={formData.corr_state_id} onChange={handleChange}>
//                     {corrStatesList.map(s => <MenuItem key={s.state_id} value={s.state_id}>{s.state_name}</MenuItem>)}
//                 </TextField>
//              </Grid>
//              <Grid item xs={6} md={3}><TextField fullWidth label="City" name="corr_city" value={formData.corr_city} onChange={handleChange} /></Grid>
//              <Grid item xs={6} md={3}><TextField fullWidth label="Zip Code" name="corr_zip_code" value={formData.corr_zip_code} onChange={handleChange} /></Grid>
//         </Grid>
//       )}

//       {/* Buttons */}
//       <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
//         <Button onClick={onBack} variant="outlined" sx={{ 
//   borderRadius: '8px', 
//   borderColor: '#ccc', 
//   color: '#555',
//   '&:hover': { borderColor: '#8C257C', color: '#8C257C' } 
// }}>Back</Button>
//         <Button variant="contained" onClick={handleSubmit} sx={{ 
//   background: 'linear-gradient(135deg, #8C257C 0%, #6d1d60 100%)', 
//   color: 'white',
//   boxShadow: '0 4px 12px rgba(140, 37, 124, 0.3)',
//   borderRadius: '8px' 
// }}>
//             Save & Next
//         </Button>
//       </Box>
//     </Box>
//   );
// };

// export default BasicInformation;



// import React, { useState, useContext, useEffect } from 'react';
// import { EmployeeContext } from './EmployeeContext';
// import axiosInstance from "../../utils/axiosInstance";
// import {
//   Box, Grid, TextField, Typography, MenuItem, Button, FormControl,
//   InputLabel, Select, CircularProgress, Checkbox, FormControlLabel, FormHelperText
// } from '@mui/material';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import dayjs from 'dayjs';
// import Swal from 'sweetalert2';

// const PRIMARY_COLOR = "#8C257C";

// const BasicInformation = ({ onNext, onBack }) => {
//   const { employeeId } = useContext(EmployeeContext);
//   const [loading, setLoading] = useState(true);
  
//   // State
//   const [countriesList, setCountriesList] = useState([]);
//   const [employeeHubs, setEmployeeHubs] = useState([]);
//   const [permStatesList, setPermStatesList] = useState([]);
//   const [corrStatesList, setCorrStatesList] = useState([]);
//   const [isSameAddress, setIsSameAddress] = useState(false);
  
//   // Errors State
//   const [errors, setErrors] = useState({});

//   const [formData, setFormData] = useState({
//     first_name: '', middle_name: '', last_name: '',
//     date_of_birth: null, age: '', gender: '', marital_status: '',
//     blood_group: '', contact_number: '', employee_id: '',
//     address_1: '', country_id: '', state_id: '', city: '', zip_code: '',
//     corr_address_1: '', corr_country_id: '', corr_state_id: '', corr_city: '', corr_zip_code: '',
//   });

//   const genderStringToValue = (str) => {
//     if (!str) return '';
//     const s = str.toLowerCase();
//     return s === 'male' ? 1 : s === 'female' ? 2 : 3;
//   };
//   const genderValueToString = (v) => (v === 1 ? 'male' : v === 2 ? 'female' : 'other');

//   useEffect(() => {
//     const fetchDropdowns = async () => {
//       try {
//         const [countryRes, hubRes] = await Promise.all([
//           axiosInstance.get('/api/countries/'),
//           axiosInstance.get('/api/employee_hub/')
//         ]);
//         if (countryRes.data.status === 'success') setCountriesList(countryRes.data.data || []);
//         if (hubRes.data.status === 'success') setEmployeeHubs(hubRes.data.data || []);
//       } catch (error) { console.error(error); }
//     };
//     fetchDropdowns();
//   }, []);

//   useEffect(() => {
//     if (!employeeId) return;
//     setLoading(true);
//     axiosInstance.post('/api/emp_basic_info/', { user_id: employeeId })
//       .then((res) => {
//         const data = res.data?.data?.[0];
//         if (data) {
//           setFormData(prev => ({
//             ...prev,
//             first_name: data.first_name || '',
//             middle_name: data.middle_name || '',
//             last_name: data.last_name || '',
//             date_of_birth: data.date_of_birth ? dayjs(data.date_of_birth) : null,
//             gender: genderStringToValue(data.gender),
//             marital_status: data.marital_status?.toLowerCase() === 'married' ? 1 : 0,
//             blood_group: data.blood_group || '',
//             contact_number: data.contact_number || '',
//             employee_id: data.employee_id || '',
//             address_1: data.address_1 || '',
//             country_id: Number(data.country_id || ''),
//             state_id: Number(data.state_id || ''),
//             city: data.city || '',
//             zip_code: data.zipcode || '',
//             corr_address_1: data.address_2 || '',
//             corr_country_id: Number(data.correspondence_country || ''),
//             corr_state_id: Number(data.correspondence_state || ''),
//             corr_city: data.correspondence_city || '',
//             corr_zip_code: data.correspondence_pincode || '',
//           }));
//         }
//       })
//       .finally(() => setLoading(false));
//   }, [employeeId]);

//   useEffect(() => {
//     if (formData.country_id && countriesList.length) {
//       const c = countriesList.find(x => x.country_id === formData.country_id);
//       if (c) axiosInstance.get(`/api/states/?country_name=${c.country_name}`).then(r => setPermStatesList(r.data.data));
//     }
//   }, [formData.country_id, countriesList]);

//   useEffect(() => {
//     if (formData.corr_country_id && countriesList.length) {
//       const c = countriesList.find(x => x.country_id === formData.corr_country_id);
//       if (c) axiosInstance.get(`/api/states/?country_name=${c.country_name}`).then(r => setCorrStatesList(r.data.data));
//     }
//   }, [formData.corr_country_id, countriesList]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//     if(errors[name]) setErrors(prev => ({...prev, [name]: false}));
//   };

//   const handleDateChange = (val) => {
//     setFormData(prev => ({ ...prev, date_of_birth: val }));
//     if(errors.date_of_birth) setErrors(prev => ({...prev, date_of_birth: false}));
//     if (val) {
//       const age = dayjs().diff(val, 'year');
//       setFormData(prev => ({ ...prev, age: age >= 0 ? age : '' }));
//     }
//   };

//   const validate = () => {
//     const newErrors = {};
//     let isValid = true;
//     const fieldsToCheck = [
//         'first_name', 'last_name', 'gender', 'marital_status', 
//         'contact_number', 'blood_group', 'address_1', 'country_id', 
//         'state_id', 'city', 'zip_code'
//     ];

//     fieldsToCheck.forEach(field => {
//         if (!formData[field] || formData[field] === '') {
//             newErrors[field] = true;
//             isValid = false;
//         }
//     });

//     if (!formData.date_of_birth) { newErrors.date_of_birth = true; isValid = false; }

//     if (!isSameAddress) {
//         const corrFields = ['corr_address_1', 'corr_country_id', 'corr_state_id', 'corr_city', 'corr_zip_code'];
//         corrFields.forEach(field => {
//             if (!formData[field] || formData[field] === '') {
//                 newErrors[field] = true;
//                 isValid = false;
//             }
//         });
//     }

//     setErrors(newErrors);

//     if (!isValid) {
//         Swal.fire({
//             icon: 'error',
//             title: 'Incomplete Details',
//             text: 'Please fill all the required fields before continuing.',
//             confirmButtonColor: PRIMARY_COLOR
//         });
//         setTimeout(() => {
//             const el = document.querySelector('.Mui-error');
//             if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
//         }, 100);
//     }
//     return isValid;
//   };

//   const handleSubmit = async () => {
//     if (!validate()) return;

//     const payload = {
//       user_id: employeeId,
//       ...formData,
//       date_of_birth: formData.date_of_birth ? formData.date_of_birth.format('YYYY-MM-DD') : null,
//       gender: genderValueToString(formData.gender),
//       marital_status: formData.marital_status === 1 ? 'married' : 'single',
//       address_2: isSameAddress ? formData.address_1 : formData.corr_address_1,
//       correspondence_city: isSameAddress ? formData.city : formData.corr_city,
//       correspondence_pincode: isSameAddress ? formData.zip_code : formData.corr_zip_code,
//       correspondence_state: isSameAddress ? formData.state_id : formData.corr_state_id,
//       correspondence_country: isSameAddress ? formData.country_id : formData.corr_country_id,
//       zipcode: formData.zip_code
//     };

//     try {
//       Swal.showLoading();
//       await axiosInstance.patch('/api/emp_basic_info/', payload);
//       Swal.close();
//       if (onNext) onNext();
//     } catch (error) {
//       Swal.fire('Error', 'Failed to update profile.', 'error');
//     }
//   };

//   if (loading) return <Box display="flex" justifyContent="center" p={4}><CircularProgress /></Box>;

//   return (
//     <Box sx={{ p: 2 }}>
//       <Typography variant="h6" gutterBottom color={PRIMARY_COLOR} fontWeight="bold">Basic Information</Typography>
      
//       <Grid container spacing={2} sx={{ mb: 3 }}>
//           <Grid item xs={12} sm={4}><TextField fullWidth label="First Name" name="first_name" value={formData.first_name} onChange={handleChange} error={!!errors.first_name} /></Grid>
//           <Grid item xs={12} sm={4}><TextField fullWidth label="Middle Name" name="middle_name" value={formData.middle_name} onChange={handleChange} /></Grid>
//           <Grid item xs={12} sm={4}><TextField fullWidth label="Last Name" name="last_name" value={formData.last_name} onChange={handleChange} error={!!errors.last_name} /></Grid>
          
//           <Grid item xs={12} sm={4}>
//             <LocalizationProvider dateAdapter={AdapterDayjs}>
//                 <DatePicker 
//                     label="Date of Birth" 
//                     value={formData.date_of_birth} 
//                     onChange={handleDateChange} 
//                     slotProps={{ textField: { fullWidth: true, error: !!errors.date_of_birth } }}
//                 />
//             </LocalizationProvider>
//           </Grid>
//           <Grid item xs={12} sm={2}><TextField fullWidth label="Age" value={formData.age} InputProps={{ readOnly: true }} /></Grid>
          
//           <Grid item xs={12} sm={3}>
//             <FormControl fullWidth error={!!errors.gender}>
//                 <InputLabel>Gender</InputLabel>
//                 <Select name="gender" value={formData.gender} onChange={handleChange} label="Gender">
//                     <MenuItem value={1}>Male</MenuItem><MenuItem value={2}>Female</MenuItem><MenuItem value={3}>Other</MenuItem>
//                 </Select>
//             </FormControl>
//           </Grid>
//           <Grid item xs={12} sm={3}>
//             <FormControl fullWidth error={!!errors.marital_status}>
//                 <InputLabel>Marital Status</InputLabel>
//                 <Select name="marital_status" value={formData.marital_status} onChange={handleChange} label="Marital Status">
//                     <MenuItem value={0}>Single</MenuItem><MenuItem value={1}>Married</MenuItem>
//                 </Select>
//             </FormControl>
//           </Grid>
          
//           <Grid item xs={12} sm={6}><TextField fullWidth label="Contact" name="contact_number" value={formData.contact_number} onChange={handleChange} error={!!errors.contact_number} /></Grid>
//           <Grid item xs={12} sm={6}>
//             <FormControl fullWidth error={!!errors.blood_group}>
//                 <InputLabel>Blood Group</InputLabel>
//                 <Select name="blood_group" value={formData.blood_group} onChange={handleChange} label="Blood Group">
//                     {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map(b => <MenuItem key={b} value={b}>{b}</MenuItem>)}
//                 </Select>
//             </FormControl>
//           </Grid>
//       </Grid>

//       <Typography variant="subtitle1" fontWeight="bold" gutterBottom>Permanent Address</Typography>
//       <Grid container spacing={2}>
//         <Grid item xs={12}><TextField fullWidth label="Address Line 1" name="address_1" value={formData.address_1} onChange={handleChange} error={!!errors.address_1} /></Grid>
//         <Grid item xs={6} md={3}>
//             <TextField select fullWidth label="Country" name="country_id" value={formData.country_id} onChange={handleChange} error={!!errors.country_id}>
//                 {countriesList.map(c => <MenuItem key={c.country_id} value={c.country_id}>{c.country_name}</MenuItem>)}
//             </TextField>
//         </Grid>
//         <Grid item xs={6} md={3}>
//             <TextField select fullWidth label="State" name="state_id" value={formData.state_id} onChange={handleChange} error={!!errors.state_id}>
//                 {permStatesList.map(s => <MenuItem key={s.state_id} value={s.state_id}>{s.state_name}</MenuItem>)}
//             </TextField>
//         </Grid>
//         <Grid item xs={6} md={3}><TextField fullWidth label="City" name="city" value={formData.city} onChange={handleChange} error={!!errors.city} /></Grid>
//         <Grid item xs={6} md={3}><TextField fullWidth label="Zip Code" name="zip_code" value={formData.zip_code} onChange={handleChange} error={!!errors.zip_code} /></Grid>
//       </Grid>
      
//       <Box mt={2} mb={2}>
//          <FormControlLabel control={<Checkbox checked={isSameAddress} onChange={(e) => {
//              setIsSameAddress(e.target.checked);
//              if (e.target.checked) {
//                  setErrors(prev => ({
//                      ...prev, 
//                      corr_address_1: false, corr_country_id: false, corr_state_id: false, corr_city: false, corr_zip_code: false 
//                  }));
//              }
//          }} />} label="Correspondence same as Permanent" />
//       </Box>
      
//       {!isSameAddress && (
//         <>
//             <Typography variant="subtitle1" fontWeight="bold" gutterBottom>Correspondence Address</Typography>
//             <Grid container spacing={2}>
//                  <Grid item xs={12}><TextField fullWidth label="Address Line 1" name="corr_address_1" value={formData.corr_address_1} onChange={handleChange} error={!!errors.corr_address_1} /></Grid>
//                  <Grid item xs={6} md={3}>
//                     <TextField select fullWidth label="Country" name="corr_country_id" value={formData.corr_country_id} onChange={handleChange} error={!!errors.corr_country_id}>
//                         {countriesList.map(c => <MenuItem key={c.country_id} value={c.country_id}>{c.country_name}</MenuItem>)}
//                     </TextField>
//                  </Grid>
//                  <Grid item xs={6} md={3}>
//                     <TextField select fullWidth label="State" name="corr_state_id" value={formData.corr_state_id} onChange={handleChange} error={!!errors.corr_state_id}>
//                         {corrStatesList.map(s => <MenuItem key={s.state_id} value={s.state_id}>{s.state_name}</MenuItem>)}
//                     </TextField>
//                  </Grid>
//                  <Grid item xs={6} md={3}><TextField fullWidth label="City" name="corr_city" value={formData.corr_city} onChange={handleChange} error={!!errors.corr_city} /></Grid>
//                  <Grid item xs={6} md={3}><TextField fullWidth label="Zip Code" name="corr_zip_code" value={formData.corr_zip_code} onChange={handleChange} error={!!errors.corr_zip_code} /></Grid>
//             </Grid>
//         </>
//       )}

//       <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
//         <Button onClick={onBack} variant="outlined" sx={{ borderRadius: '8px', borderColor: '#ccc', color: '#555', '&:hover': { borderColor: '#8C257C', color: '#8C257C' } }}>Back</Button>
//         <Button variant="contained" onClick={handleSubmit} sx={{ background: `linear-gradient(135deg, ${PRIMARY_COLOR} 0%, #6d1d60 100%)`, color: 'white', borderRadius: '8px' }}>Save & Next</Button>
//       </Box>
//     </Box>
//   );
// };

// export default BasicInformation;



import React, { useState, useContext, useEffect } from 'react';
import { EmployeeContext } from './EmployeeContext';
import axiosInstance from "../../utils/axiosInstance";
import {
  Box, Grid, TextField, Typography, MenuItem, Button, FormControl,
  InputLabel, Select, CircularProgress, Checkbox, FormControlLabel
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import Swal from 'sweetalert2';

const PRIMARY_COLOR = "#8C257C";

const BasicInformation = ({ onNext, onBack }) => {
  const { employeeId } = useContext(EmployeeContext);
  const [loading, setLoading] = useState(true);
  
  const [countriesList, setCountriesList] = useState([]);
  const [employeeHubs, setEmployeeHubs] = useState([]);
  const [permStatesList, setPermStatesList] = useState([]);
  const [corrStatesList, setCorrStatesList] = useState([]);
  const [isSameAddress, setIsSameAddress] = useState(false);
  
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    first_name: '', middle_name: '', last_name: '',
    date_of_birth: null, age: '', gender: '', marital_status: '',
    blood_group: '', contact_number: '', employee_id: '',
    address_1: '', country_id: '', state_id: '', city: '', zip_code: '',
    corr_address_1: '', corr_country_id: '', corr_state_id: '', corr_city: '', corr_zip_code: '',
  });

  const genderStringToValue = (str) => {
    if (!str) return '';
    const s = str.toLowerCase();
    return s === 'male' ? 1 : s === 'female' ? 2 : 3;
  };
  const genderValueToString = (v) => (v === 1 ? 'male' : v === 2 ? 'female' : 'other');

  useEffect(() => {
    const fetchDropdowns = async () => {
      try {
        const [countryRes, hubRes] = await Promise.all([
          axiosInstance.get('/api/countries/'),
          axiosInstance.get('/api/employee_hub/')
        ]);
        if (countryRes.data.status === 'success') setCountriesList(countryRes.data.data || []);
        if (hubRes.data.status === 'success') setEmployeeHubs(hubRes.data.data || []);
      } catch (error) { console.error(error); }
    };
    fetchDropdowns();
  }, []);

  useEffect(() => {
    if (!employeeId) return;
    setLoading(true);
    axiosInstance.post('/api/emp_basic_info/', { user_id: employeeId })
      .then((res) => {
        const data = res.data?.data?.[0];
        if (data) {
          setFormData(prev => ({
            ...prev,
            first_name: data.first_name || '',
            middle_name: data.middle_name || '',
            last_name: data.last_name || '',
            date_of_birth: data.date_of_birth ? dayjs(data.date_of_birth) : null,
            age: data.age || '',
            gender: genderStringToValue(data.gender),
            marital_status: data.marital_status?.toLowerCase() === 'married' ? 1 : 0,
            blood_group: data.blood_group || '',
            contact_number: data.contact_number || '',
            employee_id: data.employee_id || '',
            address_1: data.address_1 || '',
            country_id: Number(data.country_id || ''),
            state_id: Number(data.state_id || ''),
            city: data.city || '',
            zip_code: data.zipcode || '',
            corr_address_1: data.address_2 || '',
            corr_country_id: Number(data.correspondence_country || ''),
            corr_state_id: Number(data.correspondence_state || ''),
            corr_city: data.correspondence_city || '',
            corr_zip_code: data.correspondence_pincode || '',
          }));
        }
      })
      .finally(() => setLoading(false));
  }, [employeeId]);

  useEffect(() => {
    if (formData.country_id && countriesList.length) {
      const c = countriesList.find(x => x.country_id === formData.country_id);
      if (c) axiosInstance.get(`/api/states/?country_name=${c.country_name}`).then(r => setPermStatesList(r.data.data));
    }
  }, [formData.country_id, countriesList]);

  useEffect(() => {
    if (formData.corr_country_id && countriesList.length) {
      const c = countriesList.find(x => x.country_id === formData.corr_country_id);
      if (c) axiosInstance.get(`/api/states/?country_name=${c.country_name}`).then(r => setCorrStatesList(r.data.data));
    }
  }, [formData.corr_country_id, countriesList]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if(errors[name]) setErrors(prev => ({...prev, [name]: false}));
  };

  const handleDateChange = (val) => {
    setFormData(prev => ({ ...prev, date_of_birth: val }));
    if(errors.date_of_birth) setErrors(prev => ({...prev, date_of_birth: false}));
    if (val) {
      const age = dayjs().diff(val, 'year');
      setFormData(prev => ({ ...prev, age: age >= 0 ? age : '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    let isValid = true;
    const fieldsToCheck = [
        'first_name', 'last_name', 'gender', 'marital_status', 
        'contact_number', 'blood_group', 'address_1', 'country_id', 
        'state_id', 'city', 'zip_code'
    ];

    fieldsToCheck.forEach(field => {
        if (formData[field] === '' || formData[field] === null || formData[field] === undefined) {
            newErrors[field] = true;
            isValid = false;
        }
    });

    if (!formData.date_of_birth) { newErrors.date_of_birth = true; isValid = false; }

    if (!isSameAddress) {
        const corrFields = ['corr_address_1', 'corr_country_id', 'corr_state_id', 'corr_city', 'corr_zip_code'];
        corrFields.forEach(field => {
            if (formData[field] === '' || formData[field] === null || formData[field] === undefined) {
                newErrors[field] = true;
                isValid = false;
            }
        });
    }

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
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
    }
    return isValid;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    const payload = {
      user_id: employeeId,
      ...formData,
      date_of_birth: formData.date_of_birth ? formData.date_of_birth.format('YYYY-MM-DD') : null,
      gender: genderValueToString(formData.gender),
      marital_status: formData.marital_status === 1 ? 'married' : 'single',
      address_2: isSameAddress ? formData.address_1 : formData.corr_address_1,
      correspondence_city: isSameAddress ? formData.city : formData.corr_city,
      correspondence_pincode: isSameAddress ? formData.zip_code : formData.corr_zip_code,
      correspondence_state: isSameAddress ? formData.state_id : formData.corr_state_id,
      correspondence_country: isSameAddress ? formData.country_id : formData.corr_country_id,
      zipcode: formData.zip_code
    };

    try {
      Swal.showLoading();
      await axiosInstance.patch('/api/emp_basic_info/', payload);
      Swal.close();
      if (onNext) onNext();
    } catch (error) {
      Swal.fire('Error', 'Failed to update profile.', 'error');
    }
  };

  if (loading) return <Box display="flex" justifyContent="center" p={4}><CircularProgress /></Box>;

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom color={PRIMARY_COLOR} fontWeight="bold">Basic Information</Typography>
      
      <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={4}><TextField fullWidth label="First Name" name="first_name" value={formData.first_name} onChange={handleChange} error={!!errors.first_name} /></Grid>
          <Grid item xs={12} sm={4}><TextField fullWidth label="Middle Name" name="middle_name" value={formData.middle_name} onChange={handleChange} /></Grid>
          <Grid item xs={12} sm={4}><TextField fullWidth label="Last Name" name="last_name" value={formData.last_name} onChange={handleChange} error={!!errors.last_name} /></Grid>
          
          <Grid item xs={12} sm={4}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker 
                    label="Date of Birth" 
                    value={formData.date_of_birth} 
                    onChange={handleDateChange} 
                    slotProps={{ textField: { fullWidth: true, error: !!errors.date_of_birth } }}
                />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} sm={2}><TextField fullWidth label="Age" name="age" value={formData.age} onChange={handleChange} /></Grid>
          
          <Grid item xs={12} sm={3}>
            <FormControl fullWidth error={!!errors.gender}>
                <InputLabel>Gender</InputLabel>
                <Select name="gender" value={formData.gender} onChange={handleChange} label="Gender">
                    <MenuItem value={1}>Male</MenuItem><MenuItem value={2}>Female</MenuItem><MenuItem value={3}>Other</MenuItem>
                </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={3}>
            <FormControl fullWidth error={!!errors.marital_status}>
                <InputLabel>Marital Status</InputLabel>
                <Select name="marital_status" value={formData.marital_status} onChange={handleChange} label="Marital Status">
                    <MenuItem value={0}>Single</MenuItem><MenuItem value={1}>Married</MenuItem>
                </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} sm={6}><TextField fullWidth label="Contact" name="contact_number" value={formData.contact_number} onChange={handleChange} error={!!errors.contact_number} /></Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth error={!!errors.blood_group}>
                <InputLabel>Blood Group</InputLabel>
                <Select name="blood_group" value={formData.blood_group} onChange={handleChange} label="Blood Group">
                    {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map(b => <MenuItem key={b} value={b}>{b}</MenuItem>)}
                </Select>
            </FormControl>
          </Grid>
      </Grid>

      <Typography variant="subtitle1" fontWeight="bold" gutterBottom>Permanent Address</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}><TextField fullWidth label="Address Line 1" name="address_1" value={formData.address_1} onChange={handleChange} error={!!errors.address_1} /></Grid>
        <Grid item xs={6} md={3}>
            <TextField select fullWidth label="Country" name="country_id" value={formData.country_id} onChange={handleChange} error={!!errors.country_id}>
                {countriesList.map(c => <MenuItem key={c.country_id} value={c.country_id}>{c.country_name}</MenuItem>)}
            </TextField>
        </Grid>
        <Grid item xs={6} md={3}>
            <TextField select fullWidth label="State" name="state_id" value={formData.state_id} onChange={handleChange} error={!!errors.state_id}>
                {permStatesList.map(s => <MenuItem key={s.state_id} value={s.state_id}>{s.state_name}</MenuItem>)}
            </TextField>
        </Grid>
        <Grid item xs={6} md={3}><TextField fullWidth label="City" name="city" value={formData.city} onChange={handleChange} error={!!errors.city} /></Grid>
        <Grid item xs={6} md={3}><TextField fullWidth label="Zip Code" name="zip_code" value={formData.zip_code} onChange={handleChange} error={!!errors.zip_code} /></Grid>
      </Grid>
      
      <Box mt={2} mb={2}>
         <FormControlLabel control={<Checkbox checked={isSameAddress} onChange={(e) => {
             setIsSameAddress(e.target.checked);
             if (e.target.checked) {
                 setErrors(prev => ({
                     ...prev, 
                     corr_address_1: false, corr_country_id: false, corr_state_id: false, corr_city: false, corr_zip_code: false 
                 }));
             }
         }} />} label="Correspondence same as Permanent" />
      </Box>
      
      {!isSameAddress && (
        <>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>Correspondence Address</Typography>
            <Grid container spacing={2}>
                 <Grid item xs={12}><TextField fullWidth label="Address Line 1" name="corr_address_1" value={formData.corr_address_1} onChange={handleChange} error={!!errors.corr_address_1} /></Grid>
                 <Grid item xs={6} md={3}>
                    <TextField select fullWidth label="Country" name="corr_country_id" value={formData.corr_country_id} onChange={handleChange} error={!!errors.corr_country_id}>
                        {countriesList.map(c => <MenuItem key={c.country_id} value={c.country_id}>{c.country_name}</MenuItem>)}
                    </TextField>
                 </Grid>
                 <Grid item xs={6} md={3}>
                    <TextField select fullWidth label="State" name="corr_state_id" value={formData.corr_state_id} onChange={handleChange} error={!!errors.corr_state_id}>
                        {corrStatesList.map(s => <MenuItem key={s.state_id} value={s.state_id}>{s.state_name}</MenuItem>)}
                    </TextField>
                 </Grid>
                 <Grid item xs={6} md={3}><TextField fullWidth label="City" name="corr_city" value={formData.corr_city} onChange={handleChange} error={!!errors.corr_city} /></Grid>
                 <Grid item xs={6} md={3}><TextField fullWidth label="Zip Code" name="corr_zip_code" value={formData.corr_zip_code} onChange={handleChange} error={!!errors.corr_zip_code} /></Grid>
            </Grid>
        </>
      )}

      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
        <Button onClick={onBack} variant="outlined" sx={{ borderRadius: '8px', borderColor: '#ccc', color: '#555', '&:hover': { borderColor: '#8C257C', color: '#8C257C' } }}>Back</Button>
        <Button variant="contained" onClick={handleSubmit} sx={{ background: `linear-gradient(135deg, ${PRIMARY_COLOR} 0%, #6d1d60 100%)`, color: 'white', borderRadius: '8px' }}>Save & Next</Button>
      </Box>
    </Box>
  );
};

export default BasicInformation;