// // // import { useState, useEffect, useRef } from 'react';
// // // import {
// // //   Box, Typography, TextField, Button, Grid, FormControl,
// // //   InputLabel, Select, MenuItem, CircularProgress, Stack
// // // } from "@mui/material";
// // // import axiosInstance from "../utils/axiosInstance";

// // // // The component now accepts an 'onBack' prop
// // // const BasicInformationForm = ({ onBack }) => {
// // //   const employeeId = localStorage.getItem("loggedInEmpId");

// // //   // State to hold all form data. Internally, we'll use country_id for clarity.
// // //   const [formData, setFormData] = useState({
// // //     first_name: '',
// // //     middle_name: '',
// // //     last_name: '',
// // //     contact_number: '',
// // //     gender: '',
// // //     employee_id: '',
// // //     date_of_birth: '',
// // //     marital_status: '',
// // //     country_id: '', // Internally represents the selected country
// // //     state_id: '',
// // //     employee_hub_id: '',
// // //     city: '',
// // //     zipcode: '',
// // //     religion_id: '',
// // //     blood_group: '',
// // //     address_1: '',
// // //     address_2: ''
// // //   });

// // //   // State for all dropdown options
// // //   const [countries, setCountries] = useState([]);
// // //   const [states, setStates] = useState([]);
// // //   const [religions, setReligions] = useState([]);
// // //   const [employeeHubs, setEmployeeHubs] = useState([]);
// // //   const [loading, setLoading] = useState(true);
  
// // //   const isInitialMount = useRef(true);

// // //   // Effect for initial data fetching
// // //   useEffect(() => {
// // //     if (!employeeId) {
// // //       setLoading(false);
// // //       return;
// // //     }

// // //     const fetchInitialData = async () => {
// // //       setLoading(true);
// // //       try {
// // //         const [infoRes, countryRes, religionRes, hubRes] = await Promise.all([
// // //           axiosInstance.post('api/emp_basic_info/', { user_id: employeeId }),
// // //           axiosInstance.get('api/countries/'),
// // //           axiosInstance.get('api/religion-dropdown/'),
// // //           axiosInstance.get('api/employee_hub/'),
// // //         ]);

// // //         const allCountries = countryRes.data.status === 'success' ? countryRes.data.data : [];
// // //         const allHubs = hubRes.data.status === 'success' ? hubRes.data.data : [];
// // //         const allReligions = Array.isArray(religionRes.data) ? religionRes.data : [];

// // //         setCountries(allCountries);
// // //         setEmployeeHubs(allHubs);
// // //         setReligions(allReligions);

// // //         if (infoRes.data.status === 'success' && infoRes.data.data.length > 0) {
// // //           const employeeData = { ...infoRes.data.data[0] };
// // //           if (employeeData.date_of_birth) {
// // //             employeeData.date_of_birth = employeeData.date_of_birth.split('T')[0];
// // //           }

// // //           const hub = allHubs.find(h => h.employee_hub_name === employeeData.employee_hub_name);
// // //           if (hub) {
// // //             employeeData.employee_hub_id = hub.employee_hub_id;
// // //           }
          
// // //           const initialCountryId = employeeData.citizenship_id;
          
// // //           setFormData(prev => ({ ...prev, ...employeeData, country_id: initialCountryId }));

// // //           if (initialCountryId && allCountries.length > 0) {
// // //             const countryName = allCountries.find(c => c.country_id === initialCountryId)?.country_name;
// // //             if (countryName) {
// // //               const stateRes = await axiosInstance.get(`api/states/?country_name=${countryName}`);
// // //               if (stateRes.data.status === 'success') {
// // //                 setStates(stateRes.data.data);
// // //               }
// // //             }
// // //           }
// // //         }
// // //       } catch (error) {
// // //         console.error("Failed to fetch initial data:", error);
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     };

// // //     fetchInitialData();
// // //   }, [employeeId]);
  
// // //   // Effect for fetching states when the country changes
// // //   useEffect(() => {
// // //     if (isInitialMount.current) {
// // //         isInitialMount.current = false;
// // //         return;
// // //     }

// // //     const fetchStates = async () => {
// // //         if (!formData.country_id) {
// // //             setStates([]);
// // //             return;
// // //         }

// // //         const selectedCountry = countries.find(c => c.country_id === formData.country_id);
// // //         if (selectedCountry) {
// // //             try {
// // //                 const response = await axiosInstance.get(`api/states/?country_name=${selectedCountry.country_name}`);
// // //                 setStates(response.data.status === 'success' ? response.data.data : []);
// // //             } catch (error) {
// // //                 console.error("Failed to fetch states:", error);
// // //                 setStates([]);
// // //             }
// // //         }
// // //     };

// // //     fetchStates();
// // //   }, [formData.country_id, countries]);


// // //   const handleChange = (event) => {
// // //     const { name, value } = event.target;
    
// // //     if (name === 'country_id') {
// // //       setFormData(prev => ({ 
// // //         ...prev, 
// // //         country_id: value, 
// // //         state_id: ''
// // //       }));
// // //     } else {
// // //       setFormData(prev => ({ ...prev, [name]: value }));
// // //     }
// // //   };

// // //   const handleUpdate = async () => {
// // //     if (!employeeId) {
// // //       alert("Cannot update profile: No user is specified.");
// // //       return;
// // //     }
    
// // //     const stateName = states.find(s => s.state_id === formData.state_id)?.state_name || '';
// // //     const religionName = religions.find(r => r.value === formData.religion_id)?.label || '';
// // //     const hubName = employeeHubs.find(h => h.employee_hub_id === formData.employee_hub_id)?.employee_hub_name || null;

// // //     const patchPayload = {
// // //       user_id: Number(employeeId),
// // //       first_name: formData.first_name,
// // //       middle_name: formData.middle_name,
// // //       last_name: formData.last_name,
// // //       contact_number: formData.contact_number,
// // //       gender: formData.gender,
// // //       employee_id: formData.employee_id,
// // //       date_of_birth: formData.date_of_birth,
// // //       marital_status: Number(formData.marital_status),
// // //       citizenship_id: Number(formData.country_id),
// // //       state_id: Number(formData.state_id),
// // //       state: stateName,
// // //       city: formData.city,
// // //       zipcode: formData.zipcode,
// // //       religion_id: Number(formData.religion_id),
// // //       religion: religionName,
// // //       blood_group: formData.blood_group,
// // //       address_1: formData.address_1,
// // //       address_2: formData.address_2,
// // //       employee_hub_id: Number(formData.employee_hub_id),
// // //       employee_hub_name: hubName,
// // //       is_active: 1, 
// // //       role_id: 3,
// // //     };

// // //     try {
// // //       const response = await axiosInstance.patch('api/emp_basic_info/', patchPayload);
// // //       if (response.data.status === 'success') {
// // //         alert('Profile updated successfully!');
// // //       } else {
// // //         alert(`Failed to update profile: ${response.data.message || 'Unknown error'}`);
// // //       }
// // //     } catch (error) {
// // //       console.error("Error updating profile:", error.response?.data || error);
// // //       alert('An error occurred while updating the profile.');
// // //     }
// // //   };

// // //   if (loading) {
// // //     return (
// // //       <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
// // //         <CircularProgress />
// // //         <Typography sx={{ ml: 2 }}>Loading Information...</Typography>
// // //       </Box>
// // //     );
// // //   }

// // //   return (
// // //     <Box sx={{ padding: 6 }}>
// // //       <Typography variant="h6" gutterBottom>Basic Information Form</Typography>
// // //       <Grid container spacing={3}>
// // //         <Grid item xs={12} sm={4}><TextField name="first_name" label="First Name" value={formData.first_name || ''} onChange={handleChange} fullWidth /></Grid>
// // //         <Grid item xs={12} sm={4}><TextField name="middle_name" label="Middle Name" value={formData.middle_name || ''} onChange={handleChange} fullWidth /></Grid>
// // //         <Grid item xs={12} sm={4}><TextField name="last_name" label="Last Name" value={formData.last_name || ''} onChange={handleChange} fullWidth /></Grid>
// // //         <Grid item xs={12} sm={6}><TextField name="contact_number" label="Contact Number" value={formData.contact_number || ''} onChange={handleChange} fullWidth /></Grid>
// // //         <Grid item xs={12} sm={6}>
// // //           <FormControl fullWidth><InputLabel>Gender</InputLabel><Select name="gender" label="Gender" value={formData.gender || ''} onChange={handleChange}><MenuItem value="1">Male</MenuItem><MenuItem value="2">Female</MenuItem><MenuItem value="3">Other</MenuItem></Select></FormControl>
// // //         </Grid>
// // //         <Grid item xs={12} sm={6}><TextField name="employee_id" label="Employee ID" value={formData.employee_id || ''} onChange={handleChange} fullWidth /></Grid>
// // //         <Grid item xs={12} sm={6}><TextField name="date_of_birth" label="Date of Birth" type="date" value={formData.date_of_birth || ''} onChange={handleChange} fullWidth InputLabelProps={{ shrink: true }} /></Grid>
// // //         <Grid item xs={12} sm={6}>
// // //           <FormControl fullWidth><InputLabel>Marital Status</InputLabel><Select name="marital_status" label="Marital Status" value={formData.marital_status === 0 ? "0" : formData.marital_status || ''} onChange={handleChange}><MenuItem value="0">Single</MenuItem><MenuItem value="1">Married</MenuItem></Select></FormControl>
// // //         </Grid>
// // //         <Grid item xs={12} sm={6}>
// // //           <FormControl fullWidth><InputLabel>Religion</InputLabel><Select name="religion_id" label="Religion" value={formData.religion_id || ''} onChange={handleChange}>
// // //               {religions.map((religion) => (<MenuItem key={religion.value} value={religion.value}>{religion.label}</MenuItem>))}
// // //           </Select></FormControl>
// // //         </Grid>
// // //         <Grid item xs={12} sm={6}>
// // //             <FormControl fullWidth><InputLabel>Country</InputLabel><Select name="country_id" label="Country" value={formData.country_id || ''} onChange={handleChange}>
// // //                 {countries.map((country) => (<MenuItem key={country.country_id} value={country.country_id}>{country.country_name}</MenuItem>))}
// // //             </Select></FormControl>
// // //         </Grid>
// // //         <Grid item xs={12} sm={6}>
// // //           <FormControl fullWidth disabled={!formData.country_id || states.length === 0}>
// // //             <InputLabel>State</InputLabel>
// // //             <Select name="state_id" label="State" value={formData.state_id || ''} onChange={handleChange}>
// // //               {states.map((state) => (<MenuItem key={state.state_id} value={state.state_id}>{state.state_name}</MenuItem>))}
// // //             </Select>
// // //           </FormControl>
// // //         </Grid>
// // //         <Grid item xs={12} sm={6}><TextField name="city" label="City" value={formData.city || ''} onChange={handleChange} fullWidth /></Grid>
// // //         <Grid item xs={12} sm={6}><TextField name="zipcode" label="Zip Code" value={formData.zipcode || ''} onChange={handleChange} fullWidth /></Grid>
// // //         <Grid item xs={12} sm={6}><TextField name="blood_group" label="Blood Group" value={formData.blood_group || ''} onChange={handleChange} fullWidth /></Grid>
// // //         <Grid item xs={12} sm={6}>
// // //             <FormControl fullWidth><InputLabel>Employee Hub</InputLabel><Select name="employee_hub_id" label="Employee Hub" value={formData.employee_hub_id || ''} onChange={handleChange}>
// // //                 {employeeHubs.map((hub) => (<MenuItem key={hub.employee_hub_id} value={hub.employee_hub_id}>{hub.employee_hub_name}</MenuItem>))}
// // //             </Select></FormControl>
// // //         </Grid>
// // //         <Grid item xs={12} sm={6}><TextField name="address_1" label="Address 1" value={formData.address_1 || ''} onChange={handleChange} fullWidth /></Grid>
// // //         <Grid item xs={12} sm={6}><TextField name="address_2" label="Address 2" value={formData.address_2 || ''} onChange={handleChange} fullWidth /></Grid>
// // //       </Grid>
// // //       {/* Container for the buttons */}
// // //       <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
// // //         <Button variant="outlined" color="secondary" onClick={onBack}>
// // //           Back
// // //         </Button>
// // //         <Button variant="contained" color="primary" onClick={handleUpdate}>
// // //           Update Profile
// // //         </Button>
// // //       </Stack>
// // //     </Box>
// // //   )
// // // }

// // // export default BasicInformationForm;
// // import { useState, useEffect, useRef } from 'react';
// // import {
// //   Box, Typography, TextField, Button, Grid, FormControl,
// //   InputLabel, Select, MenuItem, CircularProgress, Stack, Alert
// // } from "@mui/material";
// // import axiosInstance from "../utils/axiosInstance";

// // // The component now accepts an 'onBack' prop
// // const BasicInformationForm = ({ onBack }) => {
// //   const employeeId = localStorage.getItem("loggedInEmpId");

// //   // State to hold all form data.
// //   const [formData, setFormData] = useState({
// //     first_name: '',
// //     middle_name: '',
// //     last_name: '',
// //     contact_number: '',
// //     gender: '',
// //     employee_id: '',
// //     date_of_birth: '',
// //     marital_status: '',
// //     country_id: '',
// //     state_id: '',
// //     employee_hub_id: '',
// //     city: '',
// //     zipcode: '',
// //     religion_id: '',
// //     blood_group: '',
// //     address_1: '',
// //     address_2: ''
// //   });

// //   // State for all dropdown options
// //   const [countries, setCountries] = useState([]);
// //   const [states, setStates] = useState([]);
// //   const [religions, setReligions] = useState([]);
// //   const [employeeHubs, setEmployeeHubs] = useState([]);
// //   const [loading, setLoading] = useState(true);
  
// //   // **1. State to hold messages for the form**
// //   const [message, setMessage] = useState({ text: '', type: '' }); // type can be 'success' or 'error'

// //   const isInitialMount = useRef(true);

// //   // Effect for initial data fetching
// //   useEffect(() => {
// //     if (!employeeId) {
// //       setLoading(false);
// //       return;
// //     }

// //     const fetchInitialData = async () => {
// //       setLoading(true);
// //       try {
// //         const [infoRes, countryRes, religionRes, hubRes] = await Promise.all([
// //           axiosInstance.post('api/emp_basic_info/', { user_id: employeeId }),
// //           axiosInstance.get('api/countries/'),
// //           axiosInstance.get('api/religion-dropdown/'),
// //           axiosInstance.get('api/employee_hub/'),
// //         ]);

// //         const allCountries = countryRes.data.status === 'success' ? countryRes.data.data : [];
// //         const allHubs = hubRes.data.status === 'success' ? hubRes.data.data : [];
// //         const allReligions = Array.isArray(religionRes.data) ? religionRes.data : [];

// //         setCountries(allCountries);
// //         setEmployeeHubs(allHubs);
// //         setReligions(allReligions);

// //         if (infoRes.data.status === 'success' && infoRes.data.data.length > 0) {
// //           const employeeData = { ...infoRes.data.data[0] };
// //           if (employeeData.date_of_birth) {
// //             employeeData.date_of_birth = employeeData.date_of_birth.split('T')[0];
// //           }

// //           const hub = allHubs.find(h => h.employee_hub_name === employeeData.employee_hub_name);
// //           if (hub) {
// //             employeeData.employee_hub_id = hub.employee_hub_id;
// //           }
          
// //           const initialCountryId = employeeData.citizenship_id;
          
// //           setFormData(prev => ({ ...prev, ...employeeData, country_id: initialCountryId }));

// //           if (initialCountryId && allCountries.length > 0) {
// //             const countryName = allCountries.find(c => c.country_id === initialCountryId)?.country_name;
// //             if (countryName) {
// //               const stateRes = await axiosInstance.get(`api/states/?country_name=${countryName}`);
// //               if (stateRes.data.status === 'success') {
// //                 setStates(stateRes.data.data);
// //               }
// //             }
// //           }
// //         }
// //       } catch (error) {
// //         console.error("Failed to fetch initial data:", error);
// //         setMessage({ text: 'Failed to load employee data.', type: 'error' });
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchInitialData();
// //   }, [employeeId]);
  
// //   // Effect for fetching states when the country changes
// //   useEffect(() => {
// //     if (isInitialMount.current) {
// //         isInitialMount.current = false;
// //         return;
// //     }

// //     const fetchStates = async () => {
// //         if (!formData.country_id) {
// //             setStates([]);
// //             return;
// //         }

// //         const selectedCountry = countries.find(c => c.country_id === formData.country_id);
// //         if (selectedCountry) {
// //             try {
// //                 const response = await axiosInstance.get(`api/states/?country_name=${selectedCountry.country_name}`);
// //                 setStates(response.data.status === 'success' ? response.data.data : []);
// //             } catch (error) {
// //                 console.error("Failed to fetch states:", error);
// //                 setStates([]);
// //             }
// //         }
// //     };

// //     fetchStates();
// //   }, [formData.country_id, countries]);


// //   const handleChange = (event) => {
// //     const { name, value } = event.target;
    
// //     if (name === 'country_id') {
// //       setFormData(prev => ({ 
// //         ...prev, 
// //         country_id: value, 
// //         state_id: ''
// //       }));
// //     } else {
// //       setFormData(prev => ({ ...prev, [name]: value }));
// //     }
// //   };

// //   const handleUpdate = async () => {
// //     // Clear any previous messages before a new attempt
// //     setMessage({ text: '', type: '' });

// //     if (!employeeId) {
// //       setMessage({ text: 'Cannot update profile: No user is specified.', type: 'error' });
// //       return;
// //     }
    
// //     const stateName = states.find(s => s.state_id === formData.state_id)?.state_name || '';
// //     const religionName = religions.find(r => r.value === formData.religion_id)?.label || '';
// //     const hubName = employeeHubs.find(h => h.employee_hub_id === formData.employee_hub_id)?.employee_hub_name || null;

// //     const patchPayload = {
// //       user_id: Number(employeeId),
// //       first_name: formData.first_name,
// //       middle_name: formData.middle_name,
// //       last_name: formData.last_name,
// //       contact_number: formData.contact_number,
// //       gender: formData.gender,
// //       employee_id: formData.employee_id,
// //       date_of_birth: formData.date_of_birth,
// //       marital_status: Number(formData.marital_status),
// //       citizenship_id: Number(formData.country_id),
// //       state_id: Number(formData.state_id),
// //       state: stateName,
// //       city: formData.city,
// //       zipcode: formData.zipcode,
// //       religion_id: Number(formData.religion_id),
// //       religion: religionName,
// //       blood_group: formData.blood_group,
// //       address_1: formData.address_1,
// //       address_2: formData.address_2,
// //       employee_hub_id: Number(formData.employee_hub_id),
// //       employee_hub_name: hubName,
// //       is_active: 1, 
// //       role_id: 3,
// //     };

// //     try {
// //       const response = await axiosInstance.patch('api/emp_basic_info/', patchPayload);
// //       if (response.data.status === 'success') {
// //         setMessage({ text: 'Profile updated successfully!', type: 'success' });
// //       } else {
// //         setMessage({ text: response.data.message || 'An unknown error occurred.', type: 'error' });
// //       }
// //     } catch (error) {
// //       console.error("Error updating profile:", error.response?.data || error);
// //       const errorMessage = error.response?.data?.message || 'An error occurred while updating the profile.';
// //       setMessage({ text: errorMessage, type: 'error' });
// //     }
// //   };

// //   if (loading) {
// //     return (
// //       <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
// //         <CircularProgress />
// //         <Typography sx={{ ml: 2 }}>Loading Information...</Typography>
// //       </Box>
// //     );
// //   }

// //   return (
// //     <Box sx={{ padding: 6 }}>
// //       <Typography variant="h6" gutterBottom>Basic Information Form</Typography>
      
// //       {/* **2. Display Alert message on the form** */}
// //       {message.text && (
// //         <Alert 
// //           severity={message.type} 
// //           onClose={() => setMessage({ text: '', type: '' })}
// //           sx={{ mb: 2 }}
// //         >
// //           {message.text}
// //         </Alert>
// //       )}

// //       <Grid container spacing={3}>
// //         <Grid item xs={12} sm={4}><TextField name="first_name" label="First Name" value={formData.first_name || ''} onChange={handleChange} fullWidth /></Grid>
// //         <Grid item xs={12} sm={4}><TextField name="middle_name" label="Middle Name" value={formData.middle_name || ''} onChange={handleChange} fullWidth /></Grid>
// //         <Grid item xs={12} sm={4}><TextField name="last_name" label="Last Name" value={formData.last_name || ''} onChange={handleChange} fullWidth /></Grid>
// //         <Grid item xs={12} sm={6}><TextField name="contact_number" label="Contact Number" value={formData.contact_number || ''} onChange={handleChange} fullWidth /></Grid>
// //         <Grid item xs={12} sm={6}>
// //           <FormControl fullWidth><InputLabel>Gender</InputLabel><Select name="gender" label="Gender" value={formData.gender || ''} onChange={handleChange}><MenuItem value="1">Male</MenuItem><MenuItem value="2">Female</MenuItem><MenuItem value="3">Other</MenuItem></Select></FormControl>
// //         </Grid>
        
// //         <Grid item xs={12} sm={6}>
// //           <TextField 
// //             name="employee_id" 
// //             label="Employee ID" 
// //             value={formData.employee_id || ''} 
// //             onChange={handleChange} 
// //             fullWidth 
// //             InputProps={{
// //               readOnly: true,
// //             }}
// //           />
// //         </Grid>
        
// //         <Grid item xs={12} sm={6}><TextField name="date_of_birth" label="Date of Birth" type="date" value={formData.date_of_birth || ''} onChange={handleChange} fullWidth InputLabelProps={{ shrink: true }} /></Grid>
// //         <Grid item xs={12} sm={6}>
// //           <FormControl fullWidth><InputLabel>Marital Status</InputLabel><Select name="marital_status" label="Marital Status" value={formData.marital_status === 0 ? "0" : formData.marital_status || ''} onChange={handleChange}><MenuItem value="0">Single</MenuItem><MenuItem value="1">Married</MenuItem></Select></FormControl>
// //         </Grid>
// //         <Grid item xs={12} sm={6}>
// //           <FormControl fullWidth><InputLabel>Religion</InputLabel><Select name="religion_id" label="Religion" value={formData.religion_id || ''} onChange={handleChange}>
// //               {religions.map((religion) => (<MenuItem key={religion.value} value={religion.value}>{religion.label}</MenuItem>))}
// //           </Select></FormControl>
// //         </Grid>
// //         <Grid item xs={12} sm={6}>
// //             <FormControl fullWidth><InputLabel>Country</InputLabel><Select name="country_id" label="Country" value={formData.country_id || ''} onChange={handleChange}>
// //                 {countries.map((country) => (<MenuItem key={country.country_id} value={country.country_id}>{country.country_name}</MenuItem>))}
// //             </Select></FormControl>
// //         </Grid>
// //         <Grid item xs={12} sm={6}>
// //           <FormControl fullWidth disabled={!formData.country_id || states.length === 0}>
// //             <InputLabel>State</InputLabel>
// //             <Select name="state_id" label="State" value={formData.state_id || ''} onChange={handleChange}>
// //               {states.map((state) => (<MenuItem key={state.state_id} value={state.state_id}>{state.state_name}</MenuItem>))}
// //             </Select>
// //           </FormControl>
// //         </Grid>
// //         <Grid item xs={12} sm={6}><TextField name="city" label="City" value={formData.city || ''} onChange={handleChange} fullWidth /></Grid>
// //         <Grid item xs={12} sm={6}><TextField name="zipcode" label="Zip Code" value={formData.zipcode || ''} onChange={handleChange} fullWidth /></Grid>
// //         <Grid item xs={12} sm={6}><TextField name="blood_group" label="Blood Group" value={formData.blood_group || ''} onChange={handleChange} fullWidth /></Grid>

// //         <Grid item xs={12} sm={6}>
// //             <FormControl fullWidth disabled>
// //               <InputLabel>Employee Hub</InputLabel>
// //               <Select
// //                 name="employee_hub_id"
// //                 label="Employee Hub"
// //                 value={formData.employee_hub_id || ''}
// //                 onChange={handleChange}
// //                 sx={{
// //                   '&.Mui-disabled': {
// //                     color: 'rgba(0, 0, 0, 0.87)',
// //                     WebkitTextFillColor: 'rgba(0, 0, 0, 0.87)',
// //                   },
// //                   '& .MuiOutlinedInput-notchedOutline': {
// //                     borderColor: 'rgba(0, 0, 0, 0.23)',
// //                   },
// //                   '& .MuiSelect-icon.Mui-disabled': {
// //                     display: 'none',
// //                   },
// //                 }}
// //               >
// //                   {employeeHubs.map((hub) => (<MenuItem key={hub.employee_hub_id} value={hub.employee_hub_id}>{hub.employee_hub_name}</MenuItem>))}
// //               </Select>
// //             </FormControl>
// //         </Grid>
        
// //         <Grid item xs={12} sm={6}><TextField name="address_1" label="Address 1" value={formData.address_1 || ''} onChange={handleChange} fullWidth /></Grid>
// //         <Grid item xs={12} sm={6}><TextField name="address_2" label="Address 2" value={formData.address_2 || ''} onChange={handleChange} fullWidth /></Grid>
// //       </Grid>
      
// //       <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
// //         <Button variant="outlined" color="secondary" onClick={onBack}>
// //           Back
// //         </Button>
// //         <Button variant="contained" color="primary" onClick={handleUpdate}>
// //           Update Profile
// //         </Button>
// //       </Stack>
// //     </Box>
// //   )
// // }

// // export default BasicInformationForm;
// // import { useState, useEffect, useRef } from 'react';
// // import {
// //   Box, Typography, TextField, Button, Grid, FormControl,
// //   InputLabel, Select, MenuItem, CircularProgress, Stack, Alert
// // } from "@mui/material";
// // import axiosInstance from "../utils/axiosInstance";

// // // The component now accepts an 'onBack' prop
// // const BasicInformationForm = ({ onBack }) => {
// //   const employeeId = localStorage.getItem("loggedInEmpId");

// //   // State to hold all form data.
// //   const [formData, setFormData] = useState({
// //     first_name: '',
// //     middle_name: '',
// //     last_name: '',
// //     contact_number: '',
// //     gender: '',
// //     employee_id: '',
// //     date_of_birth: '',
// //     marital_status: '',
// //     country_id: '',
// //     state_id: '',
// //     employee_hub_id: '',
// //     city: '',
// //     zipcode: '',
// //     religion_id: '',
// //     blood_group: '',
// //     address_1: '',
// //     address_2: ''
// //   });

// //   // State for all dropdown options
// //   const [countries, setCountries] = useState([]);
// //   const [states, setStates] = useState([]);
// //   const [religions, setReligions] = useState([]);
// //   const [employeeHubs, setEmployeeHubs] = useState([]);
// //   const [loading, setLoading] = useState(true);
  
// //   // State to hold messages for the form
// //   const [message, setMessage] = useState({ text: '', type: '' }); // type can be 'success' or 'error'

// //   const isInitialMount = useRef(true);

// //   // Effect for initial data fetching
// //   useEffect(() => {
// //     if (!employeeId) {
// //       setLoading(false);
// //       return;
// //     }

// //     const fetchInitialData = async () => {
// //       setLoading(true);
// //       try {
// //         const [infoRes, countryRes, religionRes, hubRes] = await Promise.all([
// //           axiosInstance.post('api/emp_basic_info/', { user_id: employeeId }),
// //           axiosInstance.get('api/countries/'),
// //           axiosInstance.get('api/religion-dropdown/'),
// //           axiosInstance.get('api/employee_hub/'),
// //         ]);

// //         const allCountries = countryRes.data.status === 'success' ? countryRes.data.data : [];
// //         const allHubs = hubRes.data.status === 'success' ? hubRes.data.data : [];
// //         const allReligions = Array.isArray(religionRes.data) ? religionRes.data : [];

// //         setCountries(allCountries);
// //         setEmployeeHubs(allHubs);
// //         setReligions(allReligions);

// //         if (infoRes.data.status === 'success' && infoRes.data.data.length > 0) {
// //           const employeeData = { ...infoRes.data.data[0] };
// //           if (employeeData.date_of_birth) {
// //             employeeData.date_of_birth = employeeData.date_of_birth.split('T')[0];
// //           }

// //           const hub = allHubs.find(h => h.employee_hub_name === employeeData.employee_hub_name);
// //           if (hub) {
// //             employeeData.employee_hub_id = hub.employee_hub_id;
// //           }
          
// //           const initialCountryId = employeeData.citizenship_id;
          
// //           setFormData(prev => ({ ...prev, ...employeeData, country_id: initialCountryId }));

// //           if (initialCountryId && allCountries.length > 0) {
// //             const countryName = allCountries.find(c => c.country_id === initialCountryId)?.country_name;
// //             if (countryName) {
// //               const stateRes = await axiosInstance.get(`api/states/?country_name=${countryName}`);
// //               if (stateRes.data.status === 'success') {
// //                 setStates(stateRes.data.data);
// //               }
// //             }
// //           }
// //         }
// //       } catch (error) {
// //         console.error("Failed to fetch initial data:", error);
// //         setMessage({ text: 'Failed to load employee data.', type: 'error' });
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchInitialData();
// //   }, [employeeId]);
  
// //   // Effect for fetching states when the country changes
// //   useEffect(() => {
// //     if (isInitialMount.current) {
// //         isInitialMount.current = false;
// //         return;
// //     }

// //     const fetchStates = async () => {
// //         if (!formData.country_id) {
// //             setStates([]);
// //             return;
// //         }

// //         const selectedCountry = countries.find(c => c.country_id === formData.country_id);
// //         if (selectedCountry) {
// //             try {
// //                 const response = await axiosInstance.get(`api/states/?country_name=${selectedCountry.country_name}`);
// //                 setStates(response.data.status === 'success' ? response.data.data : []);
// //             } catch (error) {
// //                 console.error("Failed to fetch states:", error);
// //                 setStates([]);
// //             }
// //         }
// //     };

// //     fetchStates();
// //   }, [formData.country_id, countries]);


// //   const handleChange = (event) => {
// //     const { name, value } = event.target;
    
// //     if (name === 'country_id') {
// //       setFormData(prev => ({ 
// //         ...prev, 
// //         country_id: value, 
// //         state_id: ''
// //       }));
// //     } else {
// //       setFormData(prev => ({ ...prev, [name]: value }));
// //     }
// //   };

// //   const handleUpdate = async () => {
// //     setMessage({ text: '', type: '' });

// //     if (!employeeId) {
// //       setMessage({ text: 'Cannot update profile: No user is specified.', type: 'error' });
// //       return;
// //     }
    
// //     const stateName = states.find(s => s.state_id === formData.state_id)?.state_name || '';
// //     const religionName = religions.find(r => r.value === formData.religion_id)?.label || '';
// //     const hubName = employeeHubs.find(h => h.employee_hub_id === formData.employee_hub_id)?.employee_hub_name || null;

// //     const patchPayload = {
// //       user_id: Number(employeeId),
// //       first_name: formData.first_name,
// //       middle_name: formData.middle_name,
// //       last_name: formData.last_name,
// //       contact_number: formData.contact_number,
// //       gender: formData.gender,
// //       employee_id: formData.employee_id,
// //       date_of_birth: formData.date_of_birth,
// //       marital_status: Number(formData.marital_status),
// //       citizenship_id: Number(formData.country_id),
// //       state_id: Number(formData.state_id),
// //       state: stateName,
// //       city: formData.city,
// //       zipcode: formData.zipcode,
// //       religion_id: Number(formData.religion_id),
// //       religion: religionName,
// //       blood_group: formData.blood_group,
// //       address_1: formData.address_1,
// //       address_2: formData.address_2,
// //       employee_hub_id: Number(formData.employee_hub_id),
// //       employee_hub_name: hubName,
// //       is_active: 1, 
// //       role_id: 3,
// //     };

// //     try {
// //       const response = await axiosInstance.patch('api/emp_basic_info/', patchPayload);
// //       if (response.data.status === 'success') {
// //         setMessage({ text: 'Profile updated successfully!', type: 'success' });
// //       } else {
// //         setMessage({ text: response.data.message || 'An unknown error occurred.', type: 'error' });
// //       }
// //     } catch (error) {
// //       console.error("Error updating profile:", error.response?.data || error);
// //       const errorMessage = error.response?.data?.message || 'An error occurred while updating the profile.';
// //       setMessage({ text: errorMessage, type: 'error' });
// //     }
// //   };

// //   if (loading) {
// //     return (
// //       <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
// //         <CircularProgress />
// //         <Typography sx={{ ml: 2 }}>Loading Information...</Typography>
// //       </Box>
// //     );
// //   }

// //   return (
// //     <Box sx={{ padding: 6 }}>
// //       <Typography variant="h6" gutterBottom>Basic Information Form</Typography>
      
// //       <Grid container spacing={3}>
// //         <Grid item xs={12} sm={4}><TextField name="first_name" label="First Name" value={formData.first_name || ''} onChange={handleChange} fullWidth /></Grid>
// //         <Grid item xs={12} sm={4}><TextField name="middle_name" label="Middle Name" value={formData.middle_name || ''} onChange={handleChange} fullWidth /></Grid>
// //         <Grid item xs={12} sm={4}><TextField name="last_name" label="Last Name" value={formData.last_name || ''} onChange={handleChange} fullWidth /></Grid>
// //         <Grid item xs={12} sm={6}><TextField name="contact_number" label="Contact Number" value={formData.contact_number || ''} onChange={handleChange} fullWidth /></Grid>
// //         <Grid item xs={12} sm={6}>
// //           <FormControl fullWidth><InputLabel>Gender</InputLabel><Select name="gender" label="Gender" value={formData.gender || ''} onChange={handleChange}><MenuItem value="1">Male</MenuItem><MenuItem value="2">Female</MenuItem><MenuItem value="3">Other</MenuItem></Select></FormControl>
// //         </Grid>
        
// //         <Grid item xs={12} sm={6}>
// //           <TextField 
// //             name="employee_id" 
// //             label="Employee ID" 
// //             value={formData.employee_id || ''} 
// //             onChange={handleChange} 
// //             fullWidth 
// //             InputProps={{
// //               readOnly: true,
// //             }}
// //           />
// //         </Grid>
        
// //         <Grid item xs={12} sm={6}><TextField name="date_of_birth" label="Date of Birth" type="date" value={formData.date_of_birth || ''} onChange={handleChange} fullWidth InputLabelProps={{ shrink: true }} /></Grid>
// //         <Grid item xs={12} sm={6}>
// //           <FormControl fullWidth><InputLabel>Marital Status</InputLabel><Select name="marital_status" label="Marital Status" value={formData.marital_status === 0 ? "0" : formData.marital_status || ''} onChange={handleChange}><MenuItem value="0">Single</MenuItem><MenuItem value="1">Married</MenuItem></Select></FormControl>
// //         </Grid>
// //         <Grid item xs={12} sm={6}>
// //           <FormControl fullWidth><InputLabel>Religion</InputLabel><Select name="religion_id" label="Religion" value={formData.religion_id || ''} onChange={handleChange}>
// //               {religions.map((religion) => (<MenuItem key={religion.value} value={religion.value}>{religion.label}</MenuItem>))}
// //           </Select></FormControl>
// //         </Grid>
// //         <Grid item xs={12} sm={6}>
// //             <FormControl fullWidth><InputLabel>Country</InputLabel><Select name="country_id" label="Country" value={formData.country_id || ''} onChange={handleChange}>
// //                 {countries.map((country) => (<MenuItem key={country.country_id} value={country.country_id}>{country.country_name}</MenuItem>))}
// //             </Select></FormControl>
// //         </Grid>
// //         <Grid item xs={12} sm={6}>
// //           <FormControl fullWidth disabled={!formData.country_id || states.length === 0}>
// //             <InputLabel>State</InputLabel>
// //             <Select name="state_id" label="State" value={formData.state_id || ''} onChange={handleChange}>
// //               {states.map((state) => (<MenuItem key={state.state_id} value={state.state_id}>{state.state_name}</MenuItem>))}
// //             </Select>
// //           </FormControl>
// //         </Grid>
// //         <Grid item xs={12} sm={6}><TextField name="city" label="City" value={formData.city || ''} onChange={handleChange} fullWidth /></Grid>
// //         <Grid item xs={12} sm={6}><TextField name="zipcode" label="Zip Code" value={formData.zipcode || ''} onChange={handleChange} fullWidth /></Grid>
// //         <Grid item xs={12} sm={6}><TextField name="blood_group" label="Blood Group" value={formData.blood_group || ''} onChange={handleChange} fullWidth /></Grid>

// //         <Grid item xs={12} sm={6}>
// //             <FormControl fullWidth disabled>
// //               <InputLabel>Employee Hub</InputLabel>
// //               <Select
// //                 name="employee_hub_id"
// //                 label="Employee Hub"
// //                 value={formData.employee_hub_id || ''}
// //                 onChange={handleChange}
// //                 sx={{
// //                   '&.Mui-disabled': {
// //                     color: 'rgba(0, 0, 0, 0.87)',
// //                     WebkitTextFillColor: 'rgba(0, 0, 0, 0.87)',
// //                   },
// //                   '& .MuiOutlinedInput-notchedOutline': {
// //                     borderColor: 'rgba(0, 0, 0, 0.23)',
// //                   },
// //                   '& .MuiSelect-icon.Mui-disabled': {
// //                     display: 'none',
// //                   },
// //                 }}
// //               >
// //                   {employeeHubs.map((hub) => (<MenuItem key={hub.employee_hub_id} value={hub.employee_hub_id}>{hub.employee_hub_name}</MenuItem>))}
// //               </Select>
// //             </FormControl>
// //         </Grid>
        
// //         <Grid item xs={12} sm={6}><TextField name="address_1" label="Address 1" value={formData.address_1 || ''} onChange={handleChange} fullWidth /></Grid>
// //         <Grid item xs={12} sm={6}><TextField name="address_2" label="Address 2" value={formData.address_2 || ''} onChange={handleChange} fullWidth /></Grid>
// //       </Grid>
      
// //       {/* MODIFIED: This Stack now contains the message and the buttons */}
// //       <Stack 
// //         direction="row" 
// //         spacing={2} 
// //         sx={{ mt: 3, alignItems: 'center', justifyContent: 'flex-end' }}
// //       >
// //         {message.text && (
// //           <Alert 
// //             severity={message.type} 
// //             onClose={() => setMessage({ text: '', type: '' })}
// //             // The sx prop ensures the alert doesn't take up the full width
// //             sx={{ flex: '1 1 auto', mr: 'auto' }} 
// //           >
// //             {message.text}
// //           </Alert>
// //         )}
// //         <Button variant="outlined" color="secondary" onClick={onBack}>
// //           Back
// //         </Button>
// //         <Button variant="contained" color="primary" onClick={handleUpdate}>
// //           Update Profile
// //         </Button>
// //       </Stack>
// //     </Box>
// //   )
// // }

// // export default BasicInformationForm;
// import { useState, useEffect, useRef } from 'react';
// import {
//   Box, Typography, TextField, Button, Grid, FormControl,
//   InputLabel, Select, MenuItem, CircularProgress, Stack, Alert
// } from "@mui/material";
// import axiosInstance from "../utils/axiosInstance";

// // The component now accepts an 'onBack' prop
// const BasicInformationForm = ({ onBack }) => {
//   const employeeId = localStorage.getItem("loggedInEmpId");

//   // State to hold all form data.
//   const [formData, setFormData] = useState({
//     first_name: '',
//     middle_name: '',
//     last_name: '',
//     contact_number: '',
//     gender: '',
//     employee_id: '',
//     date_of_birth: '',
//     marital_status: '',
//     country_id: '',
//     state_id: '',
//     employee_hub_id: '',
//     city: '',
//     zipcode: '',
//     religion_id: '',
//     blood_group: '',
//     address_1: '',
//     address_2: ''
//   });

//   // State for all dropdown options
//   const [countries, setCountries] = useState([]);
//   const [states, setStates] = useState([]);
//   const [religions, setReligions] = useState([]);
//   const [employeeHubs, setEmployeeHubs] = useState([]);
//   const [loading, setLoading] = useState(true);
  
//   // State to hold messages for the form
//   const [message, setMessage] = useState({ text: '', type: '' });

//   const isInitialMount = useRef(true);

//   // Effect for initial data fetching for dropdowns
//   useEffect(() => {
//     const fetchDropdowns = async () => {
//         try {
//             const [countryRes, religionRes, hubRes] = await Promise.all([
//                 axiosInstance.get('api/countries/'),
//                 axiosInstance.get('api/religion-dropdown/'),
//                 axiosInstance.get('api/employee_hub/'),
//             ]);

//             setCountries(countryRes.data.status === 'success' ? countryRes.data.data : []);
//             setEmployeeHubs(hubRes.data.status === 'success' ? hubRes.data.data : []);
//             setReligions(Array.isArray(religionRes.data) ? religionRes.data : []);
//         } catch (error) {
//             console.error("Failed to fetch dropdown data:", error);
//             setMessage({ text: 'Failed to load necessary form options.', type: 'error' });
//         }
//     };
//     fetchDropdowns();
//   }, []);

//   // Effect to fetch employee data once dropdowns are ready
//   useEffect(() => {
//     if (!employeeId || employeeHubs.length === 0) {
//       if (!employeeId) setLoading(false);
//       return;
//     }

//     const fetchInitialData = async () => {
//       setLoading(true);
//       try {
//         const infoRes = await axiosInstance.post('api/emp_basic_info/', { user_id: employeeId });
        
//         if (infoRes.data.status === 'success' && infoRes.data.data.length > 0) {
//           const employeeData = { ...infoRes.data.data[0] };

//           // Format date if it exists
//           if (employeeData.date_of_birth) {
//             employeeData.date_of_birth = employeeData.date_of_birth.split('T')[0];
//           }

//           // Find the hub ID from the hub name provided in the response
//           const hub = employeeHubs.find(h => h.employee_hub_name === employeeData.employee_hub_name);
//           if (hub) {
//             employeeData.employee_hub_id = hub.employee_hub_id;
//           }
          
//           const initialCountryId = employeeData.citizenship_id;
          
//           // Set form data with all the fetched details
//           setFormData(prev => ({ ...prev, ...employeeData, country_id: initialCountryId }));

//           // If a country is identified, fetch the list of states for it
//           if (initialCountryId && countries.length > 0) {
//             const countryName = countries.find(c => c.country_id === initialCountryId)?.country_name;
//             if (countryName) {
//               const stateRes = await axiosInstance.get(`api/states/?country_name=${countryName}`);
//               if (stateRes.data.status === 'success') {
//                 setStates(stateRes.data.data);
//               }
//             }
//           }
//         }
//       } catch (error) {
//         console.error("Failed to fetch initial data:", error);
//         setMessage({ text: 'Failed to load employee data.', type: 'error' });
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchInitialData();
//   }, [employeeId, employeeHubs, countries]); // Rerun if dropdowns change
  
//   // Effect for fetching states when the country changes
//   useEffect(() => {
//     if (isInitialMount.current) {
//         isInitialMount.current = false;
//         return;
//     }

//     const fetchStates = async () => {
//         if (!formData.country_id) {
//             setStates([]);
//             return;
//         }

//         const selectedCountry = countries.find(c => c.country_id === formData.country_id);
//         if (selectedCountry) {
//             try {
//                 const response = await axiosInstance.get(`api/states/?country_name=${selectedCountry.country_name}`);
//                 setStates(response.data.status === 'success' ? response.data.data : []);
//             } catch (error) {
//                 console.error("Failed to fetch states:", error);
//                 setStates([]);
//             }
//         }
//     };

//     fetchStates();
//   }, [formData.country_id, countries]);


//   const handleChange = (event) => {
//     setMessage({ text: '', type: '' });
//     const { name, value } = event.target;
    
//     if (name === 'country_id') {
//       setFormData(prev => ({ 
//         ...prev, 
//         country_id: value, 
//         state_id: ''
//       }));
//     } else {
//       setFormData(prev => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleUpdate = async () => {
//     setMessage({ text: '', type: '' });

//     if (!employeeId) {
//       setMessage({ text: 'Cannot update profile: No user is specified.', type: 'error' });
//       return;
//     }
    
//     const stateName = states.find(s => s.state_id === formData.state_id)?.state_name || '';
//     const religionName = religions.find(r => r.value === formData.religion_id)?.label || '';
//     const hubName = employeeHubs.find(h => h.employee_hub_id === formData.employee_hub_id)?.employee_hub_name || null;

//     const patchPayload = {
//       user_id: Number(employeeId),
//       first_name: formData.first_name,
//       middle_name: formData.middle_name,
//       last_name: formData.last_name,
//       contact_number: formData.contact_number,
//       gender: formData.gender,
//       employee_id: formData.employee_id,
//       date_of_birth: formData.date_of_birth,
//       marital_status: Number(formData.marital_status),
//       citizenship_id: Number(formData.country_id),
//       state_id: Number(formData.state_id),
//       state: stateName,
//       city: formData.city,
//       zipcode: formData.zipcode,
//       religion_id: Number(formData.religion_id),
//       religion: religionName,
//       blood_group: formData.blood_group,
//       address_1: formData.address_1,
//       address_2: formData.address_2,
//       employee_hub_id: Number(formData.employee_hub_id),
//       employee_hub_name: hubName,
//       is_active: 1, 
//       role_id: 3,
//     };

//     try {
//       const response = await axiosInstance.patch('api/emp_basic_info/', patchPayload);
//       if (response.data.status === 'success') {
//         setMessage({ text: 'Profile updated successfully!', type: 'success' });
//       } else {
//         setMessage({ text: response.data.message || 'An unknown error occurred.', type: 'error' });
//       }
//     } catch (error) {
//       console.error("Error updating profile:", error.response?.data || error);
//       const errorMessage = error.response?.data?.message || 'An error occurred while updating the profile.';
//       setMessage({ text: errorMessage, type: 'error' });
//     }
//   };

//   if (loading) {
//     return (
//       <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
//         <CircularProgress />
//         <Typography sx={{ ml: 2 }}>Loading Information...</Typography>
//       </Box>
//     );
//   }

//   return (
//     <Box sx={{ padding: 6 }}>
//       <Typography variant="h6" gutterBottom>Basic Information Form</Typography>
      
//       <Grid container spacing={3}>
//         <Grid item xs={12} sm={4}><TextField name="first_name" label="First Name" value={formData.first_name || ''} onChange={handleChange} fullWidth /></Grid>
//         <Grid item xs={12} sm={4}><TextField name="middle_name" label="Middle Name" value={formData.middle_name || ''} onChange={handleChange} fullWidth /></Grid>
//         <Grid item xs={12} sm={4}><TextField name="last_name" label="Last Name" value={formData.last_name || ''} onChange={handleChange} fullWidth /></Grid>
//         <Grid item xs={12} sm={6}><TextField name="contact_number" label="Contact Number" value={formData.contact_number || ''} onChange={handleChange} fullWidth /></Grid>
//         <Grid item xs={12} sm={6}>
//           <FormControl fullWidth><InputLabel>Gender</InputLabel><Select name="gender" label="Gender" value={formData.gender || ''} onChange={handleChange}><MenuItem value="1">Male</MenuItem><MenuItem value="2">Female</MenuItem><MenuItem value="3">Other</MenuItem></Select></FormControl>
//         </Grid>
        
//         {/* MODIFIED: Employee ID is read-only but appears normal */}
//         <Grid item xs={12} sm={6}>
//           <TextField 
//             name="employee_id" 
//             label="Employee ID" 
//             value={formData.employee_id || ''} 
//             fullWidth 
//             InputProps={{
//               readOnly: true,
//             }}
//           />
//         </Grid>
        
//         <Grid item xs={12} sm={6}><TextField name="date_of_birth" label="Date of Birth" type="date" value={formData.date_of_birth || ''} onChange={handleChange} fullWidth InputLabelProps={{ shrink: true }} /></Grid>
//         <Grid item xs={12} sm={6}>
//           <FormControl fullWidth><InputLabel>Marital Status</InputLabel><Select name="marital_status" label="Marital Status" value={formData.marital_status === 0 ? "0" : formData.marital_status || ''} onChange={handleChange}><MenuItem value="0">Single</MenuItem><MenuItem value="1">Married</MenuItem></Select></FormControl>
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <FormControl fullWidth><InputLabel>Religion</InputLabel><Select name="religion_id" label="Religion" value={formData.religion_id || ''} onChange={handleChange}>
//               {religions.map((religion) => (<MenuItem key={religion.value} value={religion.value}>{religion.label}</MenuItem>))}
//           </Select></FormControl>
//         </Grid>
//         <Grid item xs={12} sm={6}>
//             <FormControl fullWidth><InputLabel>Country</InputLabel><Select name="country_id" label="Country" value={formData.country_id || ''} onChange={handleChange}>
//                 {countries.map((country) => (<MenuItem key={country.country_id} value={country.country_id}>{country.country_name}</MenuItem>))}
//             </Select></FormControl>
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <FormControl fullWidth disabled={!formData.country_id || states.length === 0}>
//             <InputLabel>State</InputLabel>
//             <Select name="state_id" label="State" value={formData.state_id || ''} onChange={handleChange}>
//               {states.map((state) => (<MenuItem key={state.state_id} value={state.state_id}>{state.state_name}</MenuItem>))}
//             </Select>
//           </FormControl>
//         </Grid>
//         <Grid item xs={12} sm={6}><TextField name="city" label="City" value={formData.city || ''} onChange={handleChange} fullWidth /></Grid>
//         <Grid item xs={12} sm={6}><TextField name="zipcode" label="Zip Code" value={formData.zipcode || ''} onChange={handleChange} fullWidth /></Grid>
//         <Grid item xs={12} sm={6}><TextField name="blood_group" label="Blood Group" value={formData.blood_group || ''} onChange={handleChange} fullWidth /></Grid>

//         {/* MODIFIED: Employee Hub is read-only but appears normal */}
//                <Grid item xs={12} sm={6}>
//             <FormControl fullWidth disabled>
//               <InputLabel>Employee Hub</InputLabel>
//               <Select
//                 name="employee_hub_id"
//                 label="Employee Hub"
//                 value={formData.employee_hub_id || ''}
//                 sx={{
//                   // This block targets the disabled state of the component
//                   '&.Mui-disabled': {
//                     // This sets the text color to black (or a very dark grey, standard for MUI text)
//                     color: 'rgba(0, 0, 0, 0.87)', 
//                     // This is a browser-specific property to ensure the text color is applied correctly
//                     WebkitTextFillColor: 'rgba(0, 0, 0, 0.87)',
//                   },
//                   // This ensures the border color remains standard grey
//                   '& .MuiOutlinedInput-notchedOutline': {
//                     borderColor: 'rgba(0, 0, 0, 0.23)',
//                   },
//                   // This hides the dropdown arrow since it's not clickable
//                   '& .MuiSelect-icon.Mui-disabled': {
//                     display: 'none',
//                   },
//                 }}
//               >
//                   {employeeHubs.map((hub) => (<MenuItem key={hub.employee_hub_id} value={hub.employee_hub_id}>{hub.employee_hub_name}</MenuItem>))}
//               </Select>
//             </FormControl>
//         </Grid>
        
//         <Grid item xs={12} sm={6}><TextField name="address_1" label="Address 1" value={formData.address_1 || ''} onChange={handleChange} fullWidth /></Grid>
//         <Grid item xs={12} sm={6}><TextField name="address_2" label="Address 2" value={formData.address_2 || ''} onChange={handleChange} fullWidth /></Grid>
//       </Grid>
      
//       <Stack 
//         direction="row" 
//         spacing={2} 
//         sx={{ mt: 3, alignItems: 'center', justifyContent: 'flex-end' }}
//       >
//         {message.text && (
//           <Alert 
//             severity={message.type} 
//             onClose={() => setMessage({ text: '', type: '' })}
//             sx={{ flex: '1 1 auto', mr: 'auto' }} 
//           >
//             {message.text}
//           </Alert>
//         )}
//         <Button variant="outlined" color="secondary" onClick={onBack}>
//           Back
//         </Button>
//         <Button variant="contained" color="primary" onClick={handleUpdate}>
//           Update Profile
//         </Button>
//       </Stack>
//     </Box>
//   )
// }

// export default BasicInformationForm;
// import { useState, useEffect, useRef } from 'react';
// import {
//   Box, Typography, TextField, Button, Grid, FormControl,
//   InputLabel, Select, MenuItem, CircularProgress, Stack, Alert
// } from "@mui/material";
// import axiosInstance from "../utils/axiosInstance";

// // The component now accepts an 'onBack' prop
// const BasicInformationForm = ({ onBack }) => {
//   const employeeId = localStorage.getItem("loggedInEmpId");

//   // State to hold all form data.
//   const [formData, setFormData] = useState({
//     first_name: '',
//     middle_name: '',
//     last_name: '',
//     contact_number: '',
//     gender: '',
//     employee_id: '',
//     date_of_birth: '',
//     age: '',
//     marital_status: '',
//     country_id: '',
//     state_id: '',
//     employee_hub_id: '',
//     city: '',
//     zipcode: '',
//     religion_id: '',
//     blood_group: '',
//     address_1: '',
//     address_2: ''
//   });

//   // State for all dropdown options
//   const [countries, setCountries] = useState([]);
//   const [states, setStates] = useState([]);
//   const [religions, setReligions] = useState([]);
//   const [employeeHubs, setEmployeeHubs] = useState([]);
//   const [loading, setLoading] = useState(true);
  
//   // State to hold messages for the form
//   const [message, setMessage] = useState({ text: '', type: '' });

//   const isInitialMount = useRef(true);

//   // Effect for initial data fetching for dropdowns
//   useEffect(() => {
//     const fetchDropdowns = async () => {
//         try {
//             const [countryRes, religionRes, hubRes] = await Promise.all([
//                 axiosInstance.get('api/countries/'),
//                 axiosInstance.get('api/religion-dropdown/'),
//                 axiosInstance.get('api/employee_hub/'),
//             ]);

//             setCountries(countryRes.data.status === 'success' ? countryRes.data.data : []);
//             setEmployeeHubs(hubRes.data.status === 'success' ? hubRes.data.data : []);
//             setReligions(Array.isArray(religionRes.data) ? religionRes.data : []);
//         } catch (error) {
//             console.error("Failed to fetch dropdown data:", error);
//             setMessage({ text: 'Failed to load necessary form options.', type: 'error' });
//         }
//     };
//     fetchDropdowns();
//   }, []);

//   // Effect to fetch employee data once dropdowns are ready
//   useEffect(() => {
//     if (!employeeId || employeeHubs.length === 0) {
//       if (!employeeId) setLoading(false);
//       return;
//     }

//     const fetchInitialData = async () => {
//       setLoading(true);
//       try {
//         const infoRes = await axiosInstance.post('api/emp_basic_info/', { user_id: employeeId });
        
//         if (infoRes.data.status === 'success' && infoRes.data.data.length > 0) {
//           const employeeData = { ...infoRes.data.data[0] };

//           // Format date if it exists
//           if (employeeData.date_of_birth) {
//             employeeData.date_of_birth = employeeData.date_of_birth.split('T')[0];
//           }

//           // Translate the incoming gender string to the numeric value used by the form
//           if (employeeData.gender) {
//             const genderStr = String(employeeData.gender).toLowerCase();
//             if (genderStr === 'male' || genderStr === '1') {
//               employeeData.gender = '1';
//             } else if (genderStr === 'female' || genderStr === '2') {
//               employeeData.gender = '2';
//             } else if (genderStr === 'other' || genderStr === '3') {
//               employeeData.gender = '3';
//             }
//           }

//           // Find the hub ID from the hub name provided in the response
//           const hub = employeeHubs.find(h => h.employee_hub_name === employeeData.employee_hub_name);
//           if (hub) {
//             employeeData.employee_hub_id = hub.employee_hub_id;
//           }
          
//           const initialCountryId = employeeData.citizenship_id;
          
//           // Set form data with all the fetched details
//           setFormData(prev => ({ ...prev, ...employeeData, country_id: initialCountryId }));

//           // If a country is identified, fetch the list of states for it
//           if (initialCountryId && countries.length > 0) {
//             const countryName = countries.find(c => c.country_id === initialCountryId)?.country_name;
//             if (countryName) {
//               const stateRes = await axiosInstance.get(`api/states/?country_name=${countryName}`);
//               if (stateRes.data.status === 'success') {
//                 setStates(stateRes.data.data);
//               }
//             }
//           }
//         }
//       } catch (error) {
//         console.error("Failed to fetch initial data:", error);
//         setMessage({ text: 'Failed to load employee data.', type: 'error' });
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchInitialData();
//   }, [employeeId, employeeHubs, countries]); // Rerun if dropdowns change
  
//   // Effect for fetching states when the country changes
//   useEffect(() => {
//     if (isInitialMount.current) {
//         isInitialMount.current = false;
//         return;
//     }

//     const fetchStates = async () => {
//         if (!formData.country_id) {
//             setStates([]);
//             return;
//         }

//         const selectedCountry = countries.find(c => c.country_id === formData.country_id);
//         if (selectedCountry) {
//             try {
//                 const response = await axiosInstance.get(`api/states/?country_name=${selectedCountry.country_name}`);
//                 setStates(response.data.status === 'success' ? response.data.data : []);
//             } catch (error) {
//                 console.error("Failed to fetch states:", error);
//                 setStates([]);
//             }
//         }
//     };

//     fetchStates();
//   }, [formData.country_id, countries]);


//   const handleChange = (event) => {
//     setMessage({ text: '', type: '' });
//     const { name, value } = event.target;

//     if (name === 'age') {
//       if (value === '' || parseInt(value, 10) >= 0) {
//         setFormData(prev => ({ ...prev, [name]: value }));
//       }
//       return; 
//     }
    
//     if (name === 'country_id') {
//       setFormData(prev => ({ 
//         ...prev, 
//         country_id: value, 
//         state_id: ''
//       }));
//     } else {
//       setFormData(prev => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleUpdate = async () => {
//     setMessage({ text: '', type: '' });

//     if (!employeeId) {
//       setMessage({ text: 'Cannot update profile: No user is specified.', type: 'error' });
//       return;
//     }
    
//     const stateName = states.find(s => s.state_id === formData.state_id)?.state_name || '';
//     const religionName = religions.find(r => r.value === formData.religion_id)?.label || '';
//     const hubName = employeeHubs.find(h => h.employee_hub_id === formData.employee_hub_id)?.employee_hub_name || null;

//     const patchPayload = {
//       user_id: Number(employeeId),
//       first_name: formData.first_name,
//       middle_name: formData.middle_name,
//       last_name: formData.last_name,
//       contact_number: formData.contact_number,
//       gender: formData.gender,
//       employee_id: formData.employee_id,
//       date_of_birth: formData.date_of_birth,
//       age: formData.age ? parseInt(formData.age, 10) : null,
//       marital_status: Number(formData.marital_status),
//       citizenship_id: Number(formData.country_id),
//       state_id: Number(formData.state_id),
//       state: stateName,
//       city: formData.city,
//       zipcode: formData.zipcode,
//       religion_id: Number(formData.religion_id),
//       religion: religionName,
//       blood_group: formData.blood_group,
//       address_1: formData.address_1,
//       address_2: formData.address_2,
//       employee_hub_id: Number(formData.employee_hub_id),
//       employee_hub_name: hubName,
//       is_active: 1, 
//       role_id: 3,
//     };

//     try {
//       const response = await axiosInstance.patch('api/emp_basic_info/', patchPayload);
//       if (response.data.status === 'success') {
//         setMessage({ text: 'Profile updated successfully!', type: 'success' });
//       } else {
//         setMessage({ text: response.data.message || 'An unknown error occurred.', type: 'error' });
//       }
//     } catch (error) {
//       console.error("Error updating profile:", error.response?.data || error);
//       const errorMessage = error.response?.data?.message || 'An error occurred while updating the profile.';
//       setMessage({ text: errorMessage, type: 'error' });
//     }
//   };

//   if (loading) {
//     return (
//       <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
//         <CircularProgress />
//         <Typography sx={{ ml: 2 }}>Loading Information...</Typography>
//       </Box>
//     );
//   }

//   return (
//     <Box sx={{ padding: 6 }}>
//       <Typography variant="h6" gutterBottom>Basic Information Form</Typography>
      
//       <Grid container spacing={3}>
//         <Grid item xs={12} sm={4}><TextField name="first_name" label="First Name" value={formData.first_name || ''} onChange={handleChange} fullWidth /></Grid>
//         <Grid item xs={12} sm={4}><TextField name="middle_name" label="Middle Name" value={formData.middle_name || ''} onChange={handleChange} fullWidth /></Grid>
//         <Grid item xs={12} sm={4}><TextField name="last_name" label="Last Name" value={formData.last_name || ''} onChange={handleChange} fullWidth /></Grid>
//         <Grid item xs={12} sm={6}><TextField name="contact_number" label="Contact Number" value={formData.contact_number || ''} onChange={handleChange} fullWidth /></Grid>
//         <Grid item xs={12} sm={6}>
//           <FormControl fullWidth><InputLabel>Gender</InputLabel><Select name="gender" label="Gender" value={formData.gender || ''} onChange={handleChange}><MenuItem value="1">Male</MenuItem><MenuItem value="2">Female</MenuItem><MenuItem value="3">Other</MenuItem></Select></FormControl>
//         </Grid>
        
//         <Grid item xs={12} sm={6}>
//           <TextField 
//             name="employee_id" 
//             label="Employee ID" 
//             value={formData.employee_id || ''} 
//             fullWidth 
//             InputProps={{
//               readOnly: true,
//             }}
//           />
//         </Grid>
        
//         <Grid item xs={12} sm={6}><TextField name="date_of_birth" label="Date of Birth" type="date" value={formData.date_of_birth || ''} onChange={handleChange} fullWidth InputLabelProps={{ shrink: true }} /></Grid>
        
//         <Grid item xs={12} sm={6}>
//           <TextField 
//             name="age" 
//             label="Age" 
//             type="number" 
//             value={formData.age || ''} 
//             onChange={handleChange} 
//             fullWidth
//             inputProps={{ min: "0" }} 
//           />
//         </Grid>

//         <Grid item xs={12} sm={6}>
//           <FormControl fullWidth><InputLabel>Marital Status</InputLabel><Select name="marital_status" label="Marital Status" value={formData.marital_status === 0 ? "0" : formData.marital_status || ''} onChange={handleChange}><MenuItem value="0">Single</MenuItem><MenuItem value="1">Married</MenuItem></Select></FormControl>
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <FormControl fullWidth><InputLabel>Religion</InputLabel><Select name="religion_id" label="Religion" value={formData.religion_id || ''} onChange={handleChange}>
//               {religions.map((religion) => (<MenuItem key={religion.value} value={religion.value}>{religion.label}</MenuItem>))}
//           </Select></FormControl>
//         </Grid>
//         <Grid item xs={12} sm={6}>
//             <FormControl fullWidth><InputLabel>Country</InputLabel><Select name="country_id" label="Country" value={formData.country_id || ''} onChange={handleChange}>
//                 {countries.map((country) => (<MenuItem key={country.country_id} value={country.country_id}>{country.country_name}</MenuItem>))}
//             </Select></FormControl>
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <FormControl fullWidth disabled={!formData.country_id || states.length === 0}>
//             <InputLabel>State</InputLabel>
//             <Select name="state_id" label="State" value={formData.state_id || ''} onChange={handleChange}>
//               {states.map((state) => (<MenuItem key={state.state_id} value={state.state_id}>{state.state_name}</MenuItem>))}
//             </Select>
//           </FormControl>
//         </Grid>
//         <Grid item xs={12} sm={6}><TextField name="city" label="City" value={formData.city || ''} onChange={handleChange} fullWidth /></Grid>
//         <Grid item xs={12} sm={6}><TextField name="zipcode" label="Zip Code" value={formData.zipcode || ''} onChange={handleChange} fullWidth /></Grid>
//         <Grid item xs={12} sm={6}><TextField name="blood_group" label="Blood Group" value={formData.blood_group || ''} onChange={handleChange} fullWidth /></Grid>

//         {/* ======================= START: UPDATED FIELD ======================= */}
//         <Grid item xs={12} sm={6}>
//             <FormControl fullWidth disabled>
//               <InputLabel sx={{ color: '#000' }}>Holiday Hub</InputLabel>
//               <Select
//                 name="employee_hub_id"
//                 label="Holiday Hub"
//                 value={formData.employee_hub_id || ''}
//                 sx={{
//                   '&.Mui-disabled': {
//                     color: '#000', // Set text color to black
//                     WebkitTextFillColor: '#000', // For webkit browsers
//                   },
//                   '& .MuiOutlinedInput-notchedOutline': {
//                     borderColor: 'rgba(0, 0, 0, 0.23)',
//                   },
//                   '& .MuiSelect-icon.Mui-disabled': {
//                     display: 'none',
//                   },
//                 }}
//               >
//                   {employeeHubs.map((hub) => (<MenuItem key={hub.employee_hub_id} value={hub.employee_hub_id}>{hub.employee_hub_name}</MenuItem>))}
//               </Select>
//             </FormControl>
//         </Grid>
//         {/* ======================== END: UPDATED FIELD ======================== */}
        
//         <Grid item xs={12} sm={6}><TextField name="address_1" label="Address 1" value={formData.address_1 || ''} onChange={handleChange} fullWidth /></Grid>
//         <Grid item xs={12} sm={6}><TextField name="address_2" label="Address 2" value={formData.address_2 || ''} onChange={handleChange} fullWidth /></Grid>
//       </Grid>
      
//       <Stack 
//         direction="row" 
//         spacing={2} 
//         sx={{ mt: 3, alignItems: 'center', justifyContent: 'flex-end' }}
//       >
//         {message.text && (
//           <Alert 
//             severity={message.type} 
//             onClose={() => setMessage({ text: '', type: '' })}
//             sx={{ flex: '1 1 auto', mr: 'auto' }} 
//           >
//             {message.text}
//           </Alert>
//         )}
//         <Button variant="outlined" color="secondary" onClick={onBack}>
//           Back
//         </Button>
//         <Button variant="contained" color="primary" onClick={handleUpdate}>
//           Update Profile
//         </Button>
//       </Stack>
//     </Box>
//   )
// }
   
// export default BasicInformationForm;






import { useState, useEffect, useRef } from 'react';
import {
  Box, Typography, TextField, Button, Grid, FormControl,
  InputLabel, Select, MenuItem, CircularProgress, Stack, Alert,
  Paper, Divider, Checkbox, FormControlLabel
} from "@mui/material";
import axiosInstance from "../utils/axiosInstance";

const BasicInformationForm = ({ onBack }) => {
  const employeeId = localStorage.getItem("loggedInEmpId");

  const [formData, setFormData] = useState({
    first_name: '',
    middle_name: '',
    last_name: '',
    contact_number: '',
    gender: '',
    employee_id: '',
    date_of_birth: '',
    age: '',
    marital_status: '',
    religion_id: '',
    blood_group: '',
    employee_hub_id: '',
    
    address_1: '',
    country_id: '',
    state_id: '',
    city: '',
    zipcode: '',

    corr_address_1: '',
    corr_country_id: '',
    corr_state_id: '',
    corr_city: '',
    corr_zip_code: '',
  });

  const [countries, setCountries] = useState([]);
  const [permStatesList, setPermStatesList] = useState([]);
  const [corrStatesList, setCorrStatesList] = useState([]);
  const [religions, setReligions] = useState([]);
  const [employeeHubs, setEmployeeHubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSameAddress, setIsSameAddress] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  const isInitialMount = useRef(true);

  useEffect(() => {
    const fetchDropdowns = async () => {
        try {
            const [countryRes, religionRes, hubRes] = await Promise.all([
                axiosInstance.get('api/countries/'),
                axiosInstance.get('api/religion-dropdown/'),
                axiosInstance.get('api/employee_hub/'),
            ]);

            setCountries(countryRes.data.status === 'success' ? countryRes.data.data : []);
            setEmployeeHubs(hubRes.data.status === 'success' ? hubRes.data.data : []);
            setReligions(Array.isArray(religionRes.data) ? religionRes.data : []);
        } catch (error) {
            console.error("Failed to fetch dropdown data:", error);
            setMessage({ text: 'Failed to load necessary form options.', type: 'error' });
        }
    };
    fetchDropdowns();
  }, []);

  useEffect(() => {
    if (!employeeId || countries.length === 0) {
      if (!employeeId) setLoading(false);
      return;
    }

    const fetchInitialData = async () => {
      setLoading(true);
      try {
        const infoRes = await axiosInstance.post('api/emp_basic_info/', { user_id: employeeId });
        
        if (infoRes.data.status === 'success' && infoRes.data.data.length > 0) {
          const data = { ...infoRes.data.data[0] };

          if (data.date_of_birth) {
            data.date_of_birth = data.date_of_birth.split('T')[0];
          }

          if (data.gender) {
            const genderStr = String(data.gender).toLowerCase();
            if (genderStr === 'male' || genderStr === '1') data.gender = '1';
            else if (genderStr === 'female' || genderStr === '2') data.gender = '2';
            else if (genderStr === 'other' || genderStr === '3') data.gender = '3';
          }
          
          const hub = employeeHubs.find(h => h.employee_hub_name === data.employee_hub_name);
          
          const formattedData = {
            ...data,
            employee_hub_id: hub ? hub.employee_hub_id : '',
            corr_address_1: data.address_2 || '',
            corr_country_id: Number(data.correspondence_country || ''),
            corr_state_id: Number(data.correspondence_state || ''),
            corr_city: data.correspondence_city || '',
            corr_zip_code: data.correspondence_pincode || '',
          };

          setFormData(prev => ({ ...prev, ...formattedData }));
        }
      } catch (error) {
        console.error("Failed to fetch initial data:", error);
        setMessage({ text: 'Failed to load employee data.', type: 'error' });
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, [employeeId, employeeHubs, countries]);
  
  useEffect(() => {
    const fetchStates = async (countryId, setStateList) => {
        if (!countryId) {
            setStateList([]);
            return;
        }
        const selectedCountry = countries.find(c => c.country_id === countryId);
        if (selectedCountry) {
            try {
                const response = await axiosInstance.get(`api/states/?country_name=${selectedCountry.country_name}`);
                setStateList(response.data.status === 'success' ? response.data.data : []);
            } catch (error) {
                console.error("Failed to fetch states:", error);
                setStateList([]);
            }
        }
    };

    if (isInitialMount.current && countries.length > 0) {
        if (formData.country_id) fetchStates(formData.country_id, setPermStatesList);
        if (formData.corr_country_id) fetchStates(formData.corr_country_id, setCorrStatesList);
        if (formData.country_id || formData.corr_country_id) {
            isInitialMount.current = false;
        }
    } else {
        fetchStates(formData.country_id, setPermStatesList);
    }
  }, [formData.country_id, countries, formData.corr_country_id]);

  useEffect(() => {
    const fetchCorrStates = async () => {
        if (!formData.corr_country_id) {
            setCorrStatesList([]);
            return;
        }
        const selectedCountry = countries.find(c => c.country_id === formData.corr_country_id);
        if (selectedCountry) {
            try {
                const response = await axiosInstance.get(`api/states/?country_name=${selectedCountry.country_name}`);
                setCorrStatesList(response.data.status === 'success' ? response.data.data : []);
            } catch (error) {
                console.error("Failed to fetch correspondence states:", error);
                setCorrStatesList([]);
            }
        }
    };
    fetchCorrStates();
  }, [formData.corr_country_id, countries]);

  useEffect(() => {
    if (isSameAddress) {
      setFormData(prev => ({
        ...prev,
        corr_address_1: prev.address_1,
        corr_country_id: prev.country_id,
        corr_state_id: prev.state_id,
        corr_city: prev.city,
        corr_zip_code: prev.zipcode,
      }));
    }
  }, [isSameAddress, formData.address_1, formData.country_id, formData.state_id, formData.city, formData.zipcode]);

  const handleChange = (event) => {
    setMessage({ text: '', type: '' });
    const { name, value } = event.target;
    
    setFormData(prev => {
      const updatedState = { ...prev, [name]: value };
      if (name === 'country_id') updatedState.state_id = '';
      if (name === 'corr_country_id') updatedState.corr_state_id = '';
      return updatedState;
    });
  };

  const handleSameAddressChange = (event) => setIsSameAddress(event.target.checked);

  const handleUpdate = async () => {
    setMessage({ text: '', type: '' });

    if (!employeeId) {
      setMessage({ text: 'Cannot update profile: No user is specified.', type: 'error' });
      return;
    }
    
    const patchPayload = {
      user_id: Number(employeeId),
      first_name: formData.first_name,
      middle_name: formData.middle_name,
      last_name: formData.last_name,
      contact_number: formData.contact_number,
      gender: formData.gender,
      employee_id: formData.employee_id,
      date_of_birth: formData.date_of_birth,
      age: formData.age ? parseInt(formData.age, 10) : null,
      marital_status: Number(formData.marital_status),
      religion_id: Number(formData.religion_id),
      blood_group: formData.blood_group,
      employee_hub_id: Number(formData.employee_hub_id),
      
      address_1: formData.address_1,
      city: formData.city,
      zipcode: formData.zipcode,
      state_id: formData.state_id,
      country_id: formData.country_id,

      address_2: formData.corr_address_1,
      correspondence_city: formData.corr_city,
      correspondence_pincode: formData.corr_zip_code,
      correspondence_state: formData.corr_state_id,
      correspondence_country: formData.corr_country_id,
      
      is_active: 1, 
      role_id: 3,
    };

    try {
      const response = await axiosInstance.patch('api/emp_basic_info/', patchPayload);
      if (response.data.status === 'success') {
        setMessage({ text: 'Profile updated successfully!', type: 'success' });
      } else {
        setMessage({ text: response.data.message || 'An unknown error occurred.', type: 'error' });
      }
    } catch (error) {
      console.error("Error updating profile:", error.response?.data || error);
      const errorMessage = error.response?.data?.message || 'An error occurred while updating the profile.';
      setMessage({ text: errorMessage, type: 'error' });
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
        <Typography sx={{ ml: 2 }}>Loading Information...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
        <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Basic Information</Typography>
            <Divider sx={{ mb: 3 }} />

            <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>Personal Details</Typography>
            <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={12} sm={4}><TextField name="first_name" label="First Name" value={formData.first_name || ''} onChange={handleChange} fullWidth /></Grid>
                <Grid item xs={12} sm={4}><TextField name="middle_name" label="Middle Name" value={formData.middle_name || ''} onChange={handleChange} fullWidth /></Grid>
                <Grid item xs={12} sm={4}><TextField name="last_name" label="Last Name" value={formData.last_name || ''} onChange={handleChange} fullWidth /></Grid>
                <Grid item xs={12} sm={4}><TextField name="contact_number" label="Contact Number" value={formData.contact_number || ''} onChange={handleChange} fullWidth /></Grid>
                <Grid item xs={12} sm={4}><FormControl fullWidth><InputLabel>Gender</InputLabel><Select name="gender" label="Gender" value={formData.gender || ''} onChange={handleChange}><MenuItem value="1">Male</MenuItem><MenuItem value="2">Female</MenuItem><MenuItem value="3">Other</MenuItem></Select></FormControl></Grid>
                <Grid item xs={12} sm={4}><TextField name="date_of_birth" label="Date of Birth" type="date" value={formData.date_of_birth || ''} onChange={handleChange} fullWidth InputLabelProps={{ shrink: true }} /></Grid>
                <Grid item xs={12} sm={4}><TextField name="age" label="Age" type="number" value={formData.age || ''} onChange={handleChange} fullWidth inputProps={{ min: "0" }} /></Grid>
                <Grid item xs={12} sm={4}><FormControl fullWidth><InputLabel>Marital Status</InputLabel><Select name="marital_status" label="Marital Status" value={formData.marital_status === 0 ? "0" : formData.marital_status || ''} onChange={handleChange}><MenuItem value="0">Single</MenuItem><MenuItem value="1">Married</MenuItem></Select></FormControl></Grid>
                <Grid item xs={12} sm={4}><FormControl fullWidth><InputLabel>Religion</InputLabel><Select name="religion_id" label="Religion" value={formData.religion_id || ''} onChange={handleChange}>{religions.map((religion) => (<MenuItem key={religion.value} value={religion.value}>{religion.label}</MenuItem>))}</Select></FormControl></Grid>
                <Grid item xs={12} sm={4}><TextField name="blood_group" label="Blood Group" value={formData.blood_group || ''} onChange={handleChange} fullWidth /></Grid>
            </Grid>

            <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>Employment Details</Typography>
            <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={12} sm={4}><TextField name="employee_id" label="Employee ID" value={formData.employee_id || ''} fullWidth InputProps={{ readOnly: true, }}/></Grid>
                <Grid item xs={12} sm={4}><FormControl fullWidth><InputLabel>Holiday Hub</InputLabel><Select name="employee_hub_id" label="Holiday Hub" value={formData.employee_hub_id || ''} onChange={handleChange}>{employeeHubs.map((hub) => (<MenuItem key={hub.employee_hub_id} value={hub.employee_hub_id}>{hub.employee_hub_name}</MenuItem>))}</Select></FormControl></Grid>
            </Grid>
       
            <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>Permanent Address</Typography>
            <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={12}><TextField fullWidth label="Address" name="address_1" value={formData.address_1 || ''} onChange={handleChange} /></Grid>
                <Grid item xs={12} sm={4}><FormControl fullWidth><InputLabel>Country</InputLabel><Select name="country_id" value={formData.country_id || ''} onChange={handleChange} label="Country">{countries.map((c) => (<MenuItem key={c.country_id} value={c.country_id}>{c.country_name}</MenuItem>))}</Select></FormControl></Grid>
                <Grid item xs={12} sm={4}><FormControl fullWidth disabled={!formData.country_id || permStatesList.length === 0}><InputLabel>State / Province</InputLabel><Select name="state_id" value={formData.state_id || ''} onChange={handleChange} label="State / Province">{permStatesList.map((s) => (<MenuItem key={s.state_id} value={s.state_id}>{s.state_name}</MenuItem>))}</Select></FormControl></Grid>
                <Grid item xs={12} sm={4}><TextField fullWidth label="City" name="city" value={formData.city ||''} onChange={handleChange} /></Grid>
                <Grid item xs={12} sm={4}><TextField fullWidth label="Zip / Postal Code" name="zipcode" value={formData.zipcode ||''} onChange={handleChange} /></Grid>
            </Grid>

            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>Corresponding Address</Typography>
                <FormControlLabel control={<Checkbox checked={isSameAddress} onChange={handleSameAddressChange} />} label="Same as Permanent Address" />
            </Box>
            <Grid container spacing={2}>
                <Grid item xs={12}><TextField fullWidth disabled={isSameAddress} label="Address" name="corr_address_1" value={formData.corr_address_1 || ''} onChange={handleChange} /></Grid>
                <Grid item xs={12} sm={4}><FormControl fullWidth disabled={isSameAddress}><InputLabel>Country</InputLabel><Select name="corr_country_id" value={formData.corr_country_id || ''} onChange={handleChange} label="Country">{countries.map((c) => (<MenuItem key={c.country_id} value={c.country_id}>{c.country_name}</MenuItem>))}</Select></FormControl></Grid>
                <Grid item xs={12} sm={4}><FormControl fullWidth disabled={isSameAddress || !formData.corr_country_id || corrStatesList.length === 0}><InputLabel>State / Province</InputLabel><Select name="corr_state_id" value={formData.corr_state_id || ''} onChange={handleChange} label="State / Province">{corrStatesList.map((s) => (<MenuItem key={s.state_id} value={s.state_id}>{s.state_name}</MenuItem>))}</Select></FormControl></Grid>
                <Grid item xs={12} sm={4}><TextField fullWidth disabled={isSameAddress} label="City" name="corr_city" value={formData.corr_city ||''} onChange={handleChange} /></Grid>
                <Grid item xs={12} sm={4}><TextField fullWidth disabled={isSameAddress} label="Zip / Postal Code" name="corr_zip_code" value={formData.corr_zip_code ||''} onChange={handleChange} /></Grid>
            </Grid>

            <Stack direction="row" spacing={2} sx={{ mt: 4, alignItems: 'center', justifyContent: 'flex-end' }}>
                {message.text && (
                <Alert 
                    severity={message.type} 
                    onClose={() => setMessage({ text: '', type: '' })}
                    sx={{ flex: '1 1 auto', mr: 'auto' }} 
                >
                    {message.text}
                </Alert>
                )}
                <Button variant="outlined" color="secondary" onClick={onBack}>
                Back
                </Button>
                <Button variant="contained" color="primary" onClick={handleUpdate}>
                Update Profile
                </Button>
            </Stack>
      </Paper>
    </Box>
  )
}
   
export default BasicInformationForm;