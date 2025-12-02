// import React, { useEffect, useState, useContext } from 'react';
// import {
//   Box, Tabs, Tab, Typography, TextField, MenuItem, Button,
//   InputAdornment, Grid
// } from '@mui/material';
// import FacebookIcon from '@mui/icons-material/Facebook';
// import TwitterIcon from '@mui/icons-material/Twitter';
// import GoogleIcon from '@mui/icons-material/Google';
// import LinkedInIcon from '@mui/icons-material/LinkedIn';
// import PersonIcon from '@mui/icons-material/Person';
// import EmailIcon from '@mui/icons-material/Email';
// import axiosInstance from '../../utils/axiosInstance';
// import { EmployeeContext } from './EmployeeContext';

// function TabPanel({ children, value, index }) {
//   return (
//     <div role="tabpanel" hidden={value !== index}>
//       {value === index && <Box sx={{ pt: 2 }}>{children}</Box>}
//     </div>
//   );
// }

// const PersonalInformation = () => {
//   const { employeeId } = useContext(EmployeeContext);
//   useEffect(() => {
//     console.log("employee id from context in personalinfo:", employeeId);
//   }, [employeeId]);
//   const userId = employeeId;
//   const [tabIndex, setTabIndex] = useState(0);

//   const [bioData, setBioData] = useState({ bio: '', experience: '' });
//   const [socialData, setSocialData] = useState({
//     fb_profile: '', twitter_profile: '', gplus_profile: '', linkedin_profile: ''
//   });
//   // 1. Updated bankData state with new fields
//   const [bankData, setBankData] = useState({
//     account_title: '',
//     account_number: '',
//     bank_name: '',
//     ifsc_code: '',
//     bank_branch: '',
//     pf_no: '',       // New field
//     esic_no: '',     // New field
//     pan_no: ''       // New field
//   });
//   const [contactData, setContactData] = useState({
//     contact_full_name: '', contact_phone_no: '', contact_email: '', contact_address: ''
//   });

//   const fetchData = async (type) => {
//     try {
//       const res = await axiosInstance.post('/api/personal_info/', { user_id: userId, type });
//       const data = res.data.personal_details;
//       switch (type) {
//         case 1:
//           setBioData(data);
//           break;
//         case 2:
//           setSocialData(data);
//           break;
//         case 3:
//           setBankData(prev => ({...prev, ...data})); // Merge fetched data with existing state
//           break;
//         case 4:
//           setContactData(data);
//           break;
//         default:
//           break;
//       }
//     } catch (err) {
//       console.error('Fetch error:', err);
//     }
//   };

//   useEffect(() => {
//     if (userId) { // Ensure userId is available before fetching
//         requestAnimationFrame(() => {
//             fetchData(tabIndex + 1);
//         });
//     }
//   }, [tabIndex, userId]);

//   const handleChange = (e, setter) => {
//     const { name, value } = e.target;
//     setter(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (type, data) => {
//     try {
//       await axiosInstance.patch('/api/personal_info/', { user_id: userId, type, ...data });
//       alert('Updated successfully');
//     } catch (err) {
//       console.error('Update error:', err);
//       alert('Failed to update');
//     }
//   };

//   return (
//     <Box sx={{ p: 3 }}>
//       <Typography variant="h6" gutterBottom>👤 Personal Information</Typography>

//       <Tabs
//         value={tabIndex}
//         onChange={(e, newValue) => setTabIndex(newValue)}
//         sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}
//         textColor="primary"
//         indicatorColor="primary"
//       >
//         <Tab label="Bio" />
//         <Tab label="Social Profile" />
//         <Tab label="Bank Account" />
//         <Tab label="Emergency Contact" />
//       </Tabs>

//       <TabPanel value={tabIndex} index={0}>
//         <TextField
//           label="Bio"
//           name="bio"
//           value={bioData.bio || ''}
//           onChange={(e) => handleChange(e, setBioData)}
//           fullWidth
//           multiline
//           minRows={2}
//           required
//           sx={{ mb: 3 }}
//         />
//         <TextField
//           label="Experience"
//           name="experience"
//           value={bioData.experience || ''}
//           onChange={(e) => handleChange(e, setBioData)}
//           select
//           fullWidth
//           sx={{ mb: 3 }}
//         >
//           {Array.from({ length: 50 }, (_, i) => (
//             <MenuItem key={i + 1} value={i + 1}>
//               {i + 1} {i + 1 === 1 ? 'Year' : 'Years'}
//             </MenuItem>
//           ))}
//         </TextField>

//         <Box textAlign="right">
//           <Button
//             variant="contained"
//             sx={{ backgroundColor: '#6c63ff', px: 4 }}
//             onClick={() => handleSubmit(1, bioData)}
//           >
//             Update Bio
//           </Button>
//         </Box>
//       </TabPanel>

//       <TabPanel value={tabIndex} index={1}>
//         <Box sx={{ maxWidth: 600 }}>
//           {[
//             { label: 'Facebook', name: 'fb_profile', icon: <FacebookIcon sx={{ color: '#3b5998' }} /> },
//             { label: 'Twitter', name: 'twitter_profile', icon: <TwitterIcon sx={{ color: '#00acee' }} /> },
//             { label: 'Google Plus', name: 'gplus_profile', icon: <GoogleIcon sx={{ color: '#db4437' }} /> },
//             { label: 'LinkedIn', name: 'linkedin_profile', icon: <LinkedInIcon sx={{ color: '#0e76a8' }} /> },
//           ].map(({ label, name, icon }, i) => (
//             <Box key={i} sx={{ mb: 2 }}>
//               <Typography variant="body1" sx={{ mb: 1 }}>{label}</Typography>
//               <TextField
//                 fullWidth
//                 name={name}
//                 value={socialData[name] || ''}
//                 onChange={(e) => handleChange(e, setSocialData)}
//                 InputProps={{ startAdornment: <InputAdornment position="start">{icon}</InputAdornment> }}
//               />
//             </Box>
//           ))}
//           <Button variant="contained" onClick={() => handleSubmit(2, socialData)}>Update Social</Button>
//         </Box>
//       </TabPanel>

//       <TabPanel value={tabIndex} index={2}>
//         <Box component="form" sx={{ maxWidth: 800 }}>
//           <Grid container spacing={2}>
//             {/* 2. Added the new fields to the mapping array for rendering */}
//             {[
//               { label: "Account Title", name: "account_title" },
//               { label: "Account Number", name: "account_number" },
//               { label: "Bank Name", name: "bank_name" },
//               { label: "IFSC Code", name: "ifsc_code" },
//               { label: "PF No.", name: "pf_no" },
//               { label: "ESIC No.", name: "esic_no" },
//               { label: "PAN No.", name: "pan_no" },
//               { label: "Bank Branch", name: "bank_branch", full: true },
//             ].map((field, idx) => (
//               <Grid item xs={12} sm={field.full ? 12 : 6} key={idx}>
//                 <TextField
//                   label={field.label}
//                   name={field.name}
//                   value={bankData[field.name] || ''}
//                   onChange={(e) => handleChange(e, setBankData)}
//                   fullWidth
//                   required
//                 />
//               </Grid>
//             ))}
//           </Grid>
//           <Box sx={{ mt: 3 }}>
//             <Button variant="contained" onClick={() => handleSubmit(3, bankData)}>Update Bank Info</Button>
//           </Box>
//         </Box>
//       </TabPanel>

//       <TabPanel value={tabIndex} index={3}>
//         <Box component="form" sx={{ maxWidth: 800 }}>
//           <Grid container spacing={2}>
//             <Grid item xs={12}>
//               <TextField
//                 label="Full Name"
//                 name="contact_full_name"
//                 value={contactData.contact_full_name || ''}
//                 onChange={(e) => handleChange(e, setContactData)}
//                 fullWidth
//                 required
//                 InputProps={{ startAdornment: <InputAdornment position="start"><PersonIcon /></InputAdornment> }}
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 label="Contact Number"
//                 name="contact_phone_no"
//                 value={contactData.contact_phone_no || ''}
//                 onChange={(e) => handleChange(e, setContactData)}
//                 fullWidth
//                 required
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 label="Email"
//                 name="contact_email"
//                 value={contactData.contact_email || ''}
//                 onChange={(e) => handleChange(e, setContactData)}
//                 fullWidth
//                 required
//                 InputProps={{ startAdornment: <InputAdornment position="start"><EmailIcon /></InputAdornment> }}
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 label="Address"
//                 name="contact_address"
//                 value={contactData.contact_address || ''}
//                 onChange={(e) => handleChange(e, setContactData)}
//                 fullWidth
//                 required
//                 multiline
//                 minRows={2}
//               />
//             </Grid>
//           </Grid>
//           <Box sx={{ mt: 3 }}>
//             <Button variant="contained" onClick={() => handleSubmit(4, contactData)}>Update Contact</Button>
//           </Box>
//         </Box>
//       </TabPanel>
//     </Box>
//   );
// };

// export default PersonalInformation;
// import React, { useEffect, useState, useContext } from 'react';
// import {
//   Box, Tabs, Tab, Typography, TextField, MenuItem, Button,
//   InputAdornment, Grid
// } from '@mui/material';
// import FacebookIcon from '@mui/icons-material/Facebook';
// import TwitterIcon from '@mui/icons-material/Twitter';
// import GoogleIcon from '@mui/icons-material/Google';
// import LinkedInIcon from '@mui/icons-material/LinkedIn';
// import PersonIcon from '@mui/icons-material/Person';
// import EmailIcon from '@mui/icons-material/Email';
// import axiosInstance from '../../utils/axiosInstance';
// import { EmployeeContext } from './EmployeeContext';

// function TabPanel({ children, value, index }) {
//   return (
//     <div role="tabpanel" hidden={value !== index}>
//       {value === index && <Box sx={{ pt: 2 }}>{children}</Box>}
//     </div>
//   );
// }

// const PersonalInformation = () => {
//   const { employeeId } = useContext(EmployeeContext);
//   useEffect(() => {
//     console.log("employee id from context in personalinfo:", employeeId);
//   }, [employeeId]);
//   const userId = employeeId;
//   const [tabIndex, setTabIndex] = useState(0);

//   const [bioData, setBioData] = useState({ bio: '', experience: '' });
//   const [socialData, setSocialData] = useState({
//     fb_profile: '', twitter_profile: '', gplus_profile: '', linkedin_profile: ''
//   });
//   // 1. Updated bankData state with new fields
//   const [bankData, setBankData] = useState({
//     account_title: '',
//     account_number: '',
//     bank_name: '',
//     ifsc_code: '',
//     bank_branch: '',
//     pf_no: '',       // New field
//     esic_no: '',     // New field
//     pan_no: ''       // New field
//   });
//   const [contactData, setContactData] = useState({
//     contact_full_name: '', contact_phone_no: '', contact_email: '', contact_address: ''
//   });

//   const fetchData = async (type) => {
//     try {
//       const res = await axiosInstance.post('/api/personal_info/', { user_id: userId, type });
//       const data = res.data.personal_details;
//       switch (type) {
//         case 1:
//           setBioData(data);
//           break;
//         case 2:
//           setSocialData(data);
//           break;
//         case 3:
//           setBankData(prev => ({...prev, ...data})); // Merge fetched data with existing state
//           break;
//         case 4:
//           setContactData(data);
//           break;
//         default:
//           break;
//       }
//     } catch (err) {
//       console.error('Fetch error:', err);
//     }
//   };

//   useEffect(() => {
//     if (userId) { // Ensure userId is available before fetching
//         requestAnimationFrame(() => {
//             fetchData(tabIndex + 1);
//         });
//     }
//   }, [tabIndex, userId]);

//   const handleChange = (e, setter) => {
//     const { name, value } = e.target;
//     setter(prev => ({ ...prev, [name]: value }));
//   };

//  // In your PersonalInformation component

// const handleSubmit = async (type, data) => {
//   try {
//     let payload = { user_id: userId, type, ...data };

//     // --- THE FIX: Remap keys specifically for the Bank Account tab ---
//     if (type === 3) {
//       payload = {
//         user_id: userId,
//         type: type,
//         account_title: data.account_title,
//         account_number: data.account_number,
//         bank_name: data.bank_name,
//         ifsc_code: data.ifsc_code,
//         bank_branch: data.bank_branch,
//         pf_number: data.pf_no,       // Remap pf_no to pf_number
//         esic_number: data.esic_no,     // Remap esic_no to esic_number
//         pan_number: data.pan_no        // Remap pan_no to pan_number
//       };
//     }

//     await axiosInstance.patch('/api/personal_info/', payload);
//     alert('Updated successfully');

//   } catch (err) {
//     console.error('Update error:', err.response?.data || err.message);
//     alert('Failed to update');
//   }
// };

//   return (
//     <Box sx={{ p: 3 }}>
//       <Typography variant="h6" gutterBottom>👤 Personal Information</Typography>

//       <Tabs
//         value={tabIndex}
//         onChange={(e, newValue) => setTabIndex(newValue)}
//         sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}
//         textColor="primary"
//         indicatorColor="primary"
//       >
//         <Tab label="Bio" />
//         <Tab label="Social Profile" />
//         <Tab label="Bank Account" />
//         <Tab label="Emergency Contact" />
//       </Tabs>

//       <TabPanel value={tabIndex} index={0}>
//         <TextField
//           label="Bio"
//           name="bio"
//           value={bioData.bio || ''}
//           onChange={(e) => handleChange(e, setBioData)}
//           fullWidth
//           multiline
//           minRows={2}
//           required
//           sx={{ mb: 3 }}
//         />
//         <TextField
//           label="Experience"
//           name="experience"
//           value={bioData.experience || ''}
//           onChange={(e) => handleChange(e, setBioData)}
//           select
//           fullWidth
//           sx={{ mb: 3 }}
//         >
//           {Array.from({ length: 50 }, (_, i) => (
//             <MenuItem key={i + 1} value={i + 1}>
//               {i + 1} {i + 1 === 1 ? 'Year' : 'Years'}
//             </MenuItem>
//           ))}
//         </TextField>

//         <Box textAlign="right">
//           <Button
//             variant="contained"
//             sx={{ backgroundColor: '#6c63ff', px: 4 }}
//             onClick={() => handleSubmit(1, bioData)}
//           >
//             Update Bio
//           </Button>
//         </Box>
//       </TabPanel>

//       <TabPanel value={tabIndex} index={1}>
//         <Box sx={{ maxWidth: 600 }}>
//           {[
//             { label: 'Facebook', name: 'fb_profile', icon: <FacebookIcon sx={{ color: '#3b5998' }} /> },
//             { label: 'Twitter', name: 'twitter_profile', icon: <TwitterIcon sx={{ color: '#00acee' }} /> },
//             { label: 'Google Plus', name: 'gplus_profile', icon: <GoogleIcon sx={{ color: '#db4437' }} /> },
//             { label: 'LinkedIn', name: 'linkedin_profile', icon: <LinkedInIcon sx={{ color: '#0e76a8' }} /> },
//           ].map(({ label, name, icon }, i) => (
//             <Box key={i} sx={{ mb: 2 }}>
//               <Typography variant="body1" sx={{ mb: 1 }}>{label}</Typography>
//               <TextField
//                 fullWidth
//                 name={name}
//                 value={socialData[name] || ''}
//                 onChange={(e) => handleChange(e, setSocialData)}
//                 InputProps={{ startAdornment: <InputAdornment position="start">{icon}</InputAdornment> }}
//               />
//             </Box>
//           ))}
//           <Button variant="contained" onClick={() => handleSubmit(2, socialData)}>Update Social</Button>
//         </Box>
//       </TabPanel>

//       <TabPanel value={tabIndex} index={2}>
//         <Box component="form" sx={{ maxWidth: 800 }}>
//           <Grid container spacing={2}>
//             {/* 2. Added the new fields to the mapping array for rendering */}
//             {[
//               { label: "Account Title", name: "account_title" },
//               { label: "Account Number", name: "account_number" },
//               { label: "Bank Name", name: "bank_name" },
//               { label: "IFSC Code", name: "ifsc_code" },
//               { label: "PF No.", name: "pf_no" },
//               { label: "ESIC No.", name: "esic_no" },
//               { label: "PAN No.", name: "pan_no" },
//               { label: "Bank Branch", name: "bank_branch", full: true },
//             ].map((field, idx) => (
//               <Grid item xs={12} sm={field.full ? 12 : 6} key={idx}>
//                 <TextField
//                   label={field.label}
//                   name={field.name}
//                   value={bankData[field.name] || ''}
//                   onChange={(e) => handleChange(e, setBankData)}
//                   fullWidth
//                   required
//                 />
//               </Grid>
//             ))}
//           </Grid>
//           <Box sx={{ mt: 3 }}>
//             <Button variant="contained" onClick={() => handleSubmit(3, bankData)}>Update Bank Info</Button>
//           </Box>
//         </Box>
//       </TabPanel>

//       <TabPanel value={tabIndex} index={3}>
//         <Box component="form" sx={{ maxWidth: 800 }}>
//           <Grid container spacing={2}>
//             <Grid item xs={12}>
//               <TextField
//                 label="Full Name"
//                 name="contact_full_name"
//                 value={contactData.contact_full_name || ''}
//                 onChange={(e) => handleChange(e, setContactData)}
//                 fullWidth
//                 required
//                 InputProps={{ startAdornment: <InputAdornment position="start"><PersonIcon /></InputAdornment> }}
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 label="Contact Number"
//                 name="contact_phone_no"
//                 value={contactData.contact_phone_no || ''}
//                 onChange={(e) => handleChange(e, setContactData)}
//                 fullWidth
//                 required
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 label="Email"
//                 name="contact_email"
//                 value={contactData.contact_email || ''}
//                 onChange={(e) => handleChange(e, setContactData)}
//                 fullWidth
//                 required
//                 InputProps={{ startAdornment: <InputAdornment position="start"><EmailIcon /></InputAdornment> }}
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 label="Address"
//                 name="contact_address"
//                 value={contactData.contact_address || ''}
//                 onChange={(e) => handleChange(e, setContactData)}
//                 fullWidth
//                 required
//                 multiline
//                 minRows={2}
//               />
//             </Grid>
//           </Grid>
//           <Box sx={{ mt: 3 }}>
//             <Button variant="contained" onClick={() => handleSubmit(4, contactData)}>Update Contact</Button>
//           </Box>
//         </Box>
//       </TabPanel>
//     </Box>
//   );
// };

// export default PersonalInformation;
// import React, { useEffect, useState, useContext } from 'react';
// import {
//   Box, Tabs, Tab, Typography, TextField, MenuItem, Button,
//   InputAdornment, Grid
// } from '@mui/material';
// import FacebookIcon from '@mui/icons-material/Facebook';
// import TwitterIcon from '@mui/icons-material/Twitter';
// import GoogleIcon from '@mui/icons-material/Google';
// import LinkedInIcon from '@mui/icons-material/LinkedIn';
// import PersonIcon from '@mui/icons-material/Person';
// import EmailIcon from '@mui/icons-material/Email';
// import axiosInstance from '../../utils/axiosInstance';
// import { EmployeeContext } from './EmployeeContext';
// // 1. Import SweetAlert2
// import Swal from 'sweetalert2';

// function TabPanel({ children, value, index }) {
//   return (
//     <div role="tabpanel" hidden={value !== index}>
//       {value === index && <Box sx={{ pt: 2 }}>{children}</Box>}
//     </div>
//   );
// }

// const PersonalInformation = () => {
//   const { employeeId } = useContext(EmployeeContext);
//   const userId = employeeId;
//   const [tabIndex, setTabIndex] = useState(0);

//   const [bioData, setBioData] = useState({ bio: '', experience: '' });
//   const [socialData, setSocialData] = useState({
//     fb_profile: '', twitter_profile: '', gplus_profile: '', linkedin_profile: ''
//   });
//   const [bankData, setBankData] = useState({
//     account_title: '',
//     account_number: '',
//     bank_name: '',
//     ifsc_code: '',
//     bank_branch: '',
//     pf_no: '',
//     esic_no: '',
//     pan_no: ''
//   });
//   const [contactData, setContactData] = useState({
//     contact_full_name: '', contact_phone_no: '', contact_email: '', contact_address: ''
//   });

//   const fetchData = async (type) => {
//     try {
//       const res = await axiosInstance.post('/api/personal_info/', { user_id: userId, type });
//       const data = res.data.personal_details;
//       switch (type) {
//         case 1:
//           setBioData(data || { bio: '', experience: '' });
//           break;
//         case 2:
//           setSocialData(data || { fb_profile: '', twitter_profile: '', gplus_profile: '', linkedin_profile: '' });
//           break;
//         case 3:
//           // Ensure all fields are initialized even if not present in the API response
//           setBankData({
//               account_title: data.account_title || '',
//               account_number: data.account_number || '',
//               bank_name: data.bank_name || '',
//               ifsc_code: data.ifsc_code || '',
//               bank_branch: data.bank_branch || '',
//               pf_no: data.pf_no || '',
//               esic_no: data.esic_no || '',
//               pan_no: data.pan_no || ''
//           });
//           break;
//         case 4:
//           setContactData(data || { contact_full_name: '', contact_phone_no: '', contact_email: '', contact_address: '' });
//           break;
//         default:
//           break;
//       }
//     } catch (err) {
//       console.error('Fetch error:', err);
//        // 2. Add Swal for fetch errors
//        Swal.fire({
//         icon: 'error',
//         title: 'Fetch Error',
//         text: `Failed to load data for this tab. Please try again.`
//       });
//     }
//   };

//   useEffect(() => {
//     if (userId) {
//         requestAnimationFrame(() => {
//             fetchData(tabIndex + 1);
//         });
//     }
//   }, [tabIndex, userId]);

//   const handleChange = (e, setter) => {
//     const { name, value } = e.target;
//     setter(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (type, data) => {
//     // 3. Add Swal for loading state
//     Swal.fire({
//         title: 'Updating...',
//         text: 'Please wait while we save your information.',
//         allowOutsideClick: false,
//         didOpen: () => {
//             Swal.showLoading();
//         }
//     });

//     try {
//       let payload = { user_id: userId, type, ...data };

//       if (type === 3) {
//         payload = {
//           user_id: userId,
//           type: type,
//           account_title: data.account_title,
//           account_number: data.account_number,
//           bank_name: data.bank_name,
//           ifsc_code: data.ifsc_code,
//           bank_branch: data.bank_branch,
//           pf_number: data.pf_no,
//           esic_number: data.esic_no,
//           pan_number: data.pan_no
//         };
//       }

//       await axiosInstance.patch('/api/personal_info/', payload);

//       // 4. Add Swal for success
//       Swal.fire({
//         icon: 'success',
//         title: 'Updated!',
//         text: 'Your information has been updated successfully.'
//       });

//     } catch (err) {
//       console.error('Update error:', err.response?.data || err.message);
//       const errorMessage = err.response?.data?.message || 'Failed to update information.';
//       // 5. Add Swal for errors
//       Swal.fire({
//         icon: 'error',
//         title: 'Update Failed',
//         text: errorMessage
//       });
//     }
//   };

//   return (
//     <Box sx={{ p: 3 }}>
//       <Typography variant="h6" gutterBottom>👤 Personal Information</Typography>

//       <Tabs
//         value={tabIndex}
//         onChange={(e, newValue) => setTabIndex(newValue)}
//         sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}
//         textColor="primary"
//         indicatorColor="primary"
//       >
//         <Tab label="Bio" />
//         <Tab label="Social Profile" />
//         <Tab label="Bank Account" />
//         <Tab label="Emergency Contact" />
//       </Tabs>

//       <TabPanel value={tabIndex} index={0}>
//         <TextField
//           label="Bio"
//           name="bio"
//           value={bioData.bio || ''}
//           onChange={(e) => handleChange(e, setBioData)}
//           fullWidth
//           multiline
//           minRows={2}
//           required
//           sx={{ mb: 3 }}
//         />
//         <TextField
//           label="Experience"
//           name="experience"
//           value={bioData.experience || ''}
//           onChange={(e) => handleChange(e, setBioData)}
//           select
//           fullWidth
//           sx={{ mb: 3 }}
//         >
//           {Array.from({ length: 50 }, (_, i) => (
//             <MenuItem key={i + 1} value={i + 1}>
//               {i + 1} {i + 1 === 1 ? 'Year' : 'Years'}
//             </MenuItem>
//           ))}
//         </TextField>

//         <Box textAlign="right">
//           <Button
//             variant="contained"
//             sx={{ backgroundColor: '#6c63ff', px: 4 }}
//             onClick={() => handleSubmit(1, bioData)}
//           >
//             Update Bio
//           </Button>
//         </Box>
//       </TabPanel>

//       <TabPanel value={tabIndex} index={1}>
//         <Box sx={{ maxWidth: 600 }}>
//           {[
//             { label: 'Facebook', name: 'fb_profile', icon: <FacebookIcon sx={{ color: '#3b5998' }} /> },
//             { label: 'Twitter', name: 'twitter_profile', icon: <TwitterIcon sx={{ color: '#00acee' }} /> },
//             { label: 'Google Plus', name: 'gplus_profile', icon: <GoogleIcon sx={{ color: '#db4437' }} /> },
//             { label: 'LinkedIn', name: 'linkedin_profile', icon: <LinkedInIcon sx={{ color: '#0e76a8' }} /> },
//           ].map(({ label, name, icon }, i) => (
//             <Box key={i} sx={{ mb: 2 }}>
//               <Typography variant="body1" sx={{ mb: 1 }}>{label}</Typography>
//               <TextField
//                 fullWidth
//                 name={name}
//                 value={socialData[name] || ''}
//                 onChange={(e) => handleChange(e, setSocialData)}
//                 InputProps={{ startAdornment: <InputAdornment position="start">{icon}</InputAdornment> }}
//               />
//             </Box>
//           ))}
//           <Button variant="contained" onClick={() => handleSubmit(2, socialData)}>Update Social</Button>
//         </Box>
//       </TabPanel>

//       <TabPanel value={tabIndex} index={2}>
//         <Box component="form" sx={{ maxWidth: 800 }}>
//           <Grid container spacing={2}>
//             {[
//               { label: "Account Title", name: "account_title" },
//               { label: "Account Number", name: "account_number" },
//               { label: "Bank Name", name: "bank_name" },
//               { label: "IFSC Code", name: "ifsc_code" },
//               { label: "PF No.", name: "pf_no" },
//               { label: "ESIC No.", name: "esic_no" },
//               { label: "PAN No.", name: "pan_no" },
//               { label: "Bank Branch", name: "bank_branch", full: true },
//             ].map((field, idx) => (
//               <Grid item xs={12} sm={field.full ? 12 : 6} key={idx}>
//                 <TextField
//                   label={field.label}
//                   name={field.name}
//                   value={bankData[field.name] || ''}
//                   onChange={(e) => handleChange(e, setBankData)}
//                   fullWidth
//                   required
//                 />
//               </Grid>
//             ))}
//           </Grid>
//           <Box sx={{ mt: 3 }}>
//             <Button variant="contained" onClick={() => handleSubmit(3, bankData)}>Update Bank Info</Button>
//           </Box>
//         </Box>
//       </TabPanel>

//       <TabPanel value={tabIndex} index={3}>
//         <Box component="form" sx={{ maxWidth: 800 }}>
//           <Grid container spacing={2}>
//             <Grid item xs={12}>
//               <TextField
//                 label="Full Name"
//                 name="contact_full_name"
//                 value={contactData.contact_full_name || ''}
//                 onChange={(e) => handleChange(e, setContactData)}
//                 fullWidth
//                 required
//                 InputProps={{ startAdornment: <InputAdornment position="start"><PersonIcon /></InputAdornment> }}
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 label="Contact Number"
//                 name="contact_phone_no"
//                 value={contactData.contact_phone_no || ''}
//                 onChange={(e) => handleChange(e, setContactData)}
//                 fullWidth
//                 required
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 label="Email"
//                 name="contact_email"
//                 value={contactData.contact_email || ''}
//                 onChange={(e) => handleChange(e, setContactData)}
//                 fullWidth
//                 required
//                 InputProps={{ startAdornment: <InputAdornment position="start"><EmailIcon /></InputAdornment> }}
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 label="Address"
//                 name="contact_address"
//                 value={contactData.contact_address || ''}
//                 onChange={(e) => handleChange(e, setContactData)}
//                 fullWidth
//                 required
//                 multiline
//                 minRows={2}
//               />
//             </Grid>
//           </Grid>
//           <Box sx={{ mt: 3 }}>
//             <Button variant="contained" onClick={() => handleSubmit(4, contactData)}>Update Contact</Button>
//           </Box>
//         </Box>
//       </TabPanel>
//     </Box>
//   );
// };

// export default PersonalInformation;




// import React, { useEffect, useState, useContext, useCallback } from 'react';
// import { EmployeeContext } from './EmployeeContext';
// import {
//   Box, Tabs, Tab, Typography, TextField, MenuItem, Button,
//   InputAdornment, Grid
// } from '@mui/material';
// import FacebookIcon from '@mui/icons-material/Facebook';
// import TwitterIcon from '@mui/icons-material/Twitter';
// import GoogleIcon from '@mui/icons-material/Google';
// import LinkedInIcon from '@mui/icons-material/LinkedIn';
// import PersonIcon from '@mui/icons-material/Person';
// import EmailIcon from '@mui/icons-material/Email';
// import axiosInstance from '../../utils/axiosInstance';
// import Swal from 'sweetalert2';

// function TabPanel({ children, value, index }) {
//   return (
//     <div role="tabpanel" hidden={value !== index}>
//       {value === index && <Box sx={{ pt: 2 }}>{children}</Box>}
//     </div>
//   );
// }

// const PersonalInformation = () => {
//   const { employeeId } = useContext(EmployeeContext);
//   const userId = employeeId;
//   const [tabIndex, setTabIndex] = useState(0);

//   // State for each tab
//   const [bioData, setBioData] = useState({ bio: '', experience: '' });
//   const [socialData, setSocialData] = useState({
//     fb_profile: '', twitter_profile: '', gplus_profile: '', linkedin_profile: ''
//   });
//   // MODIFIED: Bank data state is now separate
//   const [bankData, setBankData] = useState({
//     account_title: '', account_number: '', bank_name: '', ifsc_code: '', bank_branch: ''
//   });
//   // NEW: State for the "Other Details" tab
//   const [otherData, setOtherData] = useState({
//     pf_no: '', esic_no: '', pan_no: '', aadhar_no: ''
//   });
//   const [contactData, setContactData] = useState({
//     contact_full_name: '', contact_phone_no: '', contact_email: '', contact_address: ''
//   });

//   const fetchData = useCallback(async (type) => {
//     try {
//       const res = await axiosInstance.post('/api/personal_info/', { user_id: userId, type });
//       const data = res.data.personal_details;

//       switch (type) {
//         case 1:
//           setBioData(data || { bio: '', experience: '' });
//           break;
//         case 2:
//           setSocialData(data || { fb_profile: '', twitter_profile: '', gplus_profile: '', linkedin_profile: '' });
//           break;
//         case 3:
//           // MODIFIED: Populate both bank and other details from a single API call
//           setBankData({
//               account_title: data.account_title || '',
//               account_number: data.account_number || '',
//               bank_name: data.bank_name || '',
//               ifsc_code: data.ifsc_code || '',
//               bank_branch: data.bank_branch || '',
//           });
//           setOtherData({
//               pf_no: data.pf_no || '',
//               esic_no: data.esic_no || '',
//               pan_no: data.pan_no || '',
//               aadhar_no: data.aadhar_no || '' // Assuming API might send this
//           });
//           break;
//         case 4:
//           setContactData(data || { contact_full_name: '', contact_phone_no: '', contact_email: '', contact_address: '' });
//           break;
//         default:
//           break;
//       }
//     } catch (err) {
//       console.error('Fetch error:', err);
//        Swal.fire({
//         icon: 'error',
//         title: 'Fetch Error',
//         text: `Failed to load data for this tab. Please try again.`
//       });
//     }
//   }, [userId]);

//   useEffect(() => {
//     if (userId) {
//         // Determine which data type to fetch based on the selected tab
//         let fetchType;
//         if (tabIndex === 2 || tabIndex === 4) { // Bank Account or Other Details
//             fetchType = 3;
//         } else if (tabIndex === 3) { // Emergency Contact
//             fetchType = 4;
//         } else { // Bio or Social
//             fetchType = tabIndex + 1;
//         }

//         requestAnimationFrame(() => {
//             fetchData(fetchType);
//         });
//     }
//   }, [tabIndex, userId, fetchData]);

//   const handleChange = (e, setter) => {
//     const { name, value } = e.target;
//     setter(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (type, data) => {
//     Swal.fire({
//         title: 'Updating...',
//         text: 'Please wait while we save your information.',
//         allowOutsideClick: false,
//         didOpen: () => {
//             Swal.showLoading();
//         }
//     });

//     try {
//       let payload = { user_id: userId, type, ...data };
//       await axiosInstance.patch('/api/personal_info/', payload);

//       Swal.fire({
//         icon: 'success',
//         title: 'Updated!',
//         text: 'Your information has been updated successfully.'
//       });

//     } catch (err) {
//       console.error('Update error:', err.response?.data || err.message);
//       const errorMessage = err.response?.data?.message || 'Failed to update information.';
//       Swal.fire({
//         icon: 'error',
//         title: 'Update Failed',
//         text: errorMessage
//       });
//     }
//   };

//   // NEW: A dedicated submit handler for Bank and Other details
//   const handleBankAndOtherSubmit = async () => {
//     Swal.fire({
//         title: 'Updating...',
//         text: 'Please wait while we save your information.',
//         allowOutsideClick: false,
//         didOpen: () => Swal.showLoading()
//     });

//     try {
//         // Combine data from both states and map to the correct API keys
//         const payload = {
//             user_id: userId,
//             type: 3,
//             account_title: bankData.account_title,
//             account_number: bankData.account_number,
//             bank_name: bankData.bank_name,
//             ifsc_code: bankData.ifsc_code,
//             bank_branch: bankData.bank_branch,
//             pf_number: otherData.pf_no,
//             esic_number: otherData.esic_no,
//             pan_number: otherData.pan_no,
//             aadhar_number: otherData.aadhar_no,
//         };

//         await axiosInstance.patch('/api/personal_info/', payload);

//         Swal.fire({ icon: 'success', title: 'Updated!', text: 'Information has been updated successfully.' });

//     } catch (err) {
//         console.error('Update error:', err.response?.data || err.message);
//         const errorMessage = err.response?.data?.message || 'Failed to update information.';
//         Swal.fire({ icon: 'error', title: 'Update Failed', text: errorMessage });
//     }
//   };

//   return (
//     <Box sx={{ p: 3 }}>
//       <Typography variant="h6" gutterBottom>👤 Personal Information</Typography>

//       <Tabs
//         value={tabIndex}
//         onChange={(e, newValue) => setTabIndex(newValue)}
//         sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}
//         textColor="primary"
//         indicatorColor="primary"
//       >
//         <Tab label="Bio" />
//         <Tab label="Social Profile" />
//         <Tab label="Bank Account" />
//         <Tab label="Emergency Contact" />
//         <Tab label="Other Details" />
//       </Tabs>

//       {/* --- BIO TAB --- */}
//       <TabPanel value={tabIndex} index={0}>
//         <TextField label="Bio" name="bio" value={bioData.bio || ''} onChange={(e) => handleChange(e, setBioData)} fullWidth multiline minRows={2} required sx={{ mb: 3 }} />
//         <TextField label="Experience" name="experience" value={bioData.experience || ''} onChange={(e) => handleChange(e, setBioData)} select fullWidth sx={{ mb: 3 }}>
//           {Array.from({ length: 50 }, (_, i) => (<MenuItem key={i + 1} value={i + 1}>{i + 1} {i + 1 === 1 ? 'Year' : 'Years'}</MenuItem>))}
//         </TextField>
//         <Box textAlign="right"><Button variant="contained" sx={{ backgroundColor: '#6c63ff', px: 4 }} onClick={() => handleSubmit(1, bioData)}>Update Bio</Button></Box>
//       </TabPanel>

//       {/* --- SOCIAL TAB --- */}
//       <TabPanel value={tabIndex} index={1}>
//         <Box sx={{ maxWidth: 600 }}>
//           {[
//             { label: 'Facebook', name: 'fb_profile', icon: <FacebookIcon sx={{ color: '#3b5998' }} /> },
//             { label: 'Twitter', name: 'twitter_profile', icon: <TwitterIcon sx={{ color: '#00acee' }} /> },
//             { label: 'Google Plus', name: 'gplus_profile', icon: <GoogleIcon sx={{ color: '#db4437' }} /> },
//             { label: 'LinkedIn', name: 'linkedin_profile', icon: <LinkedInIcon sx={{ color: '#0e76a8' }} /> },
//           ].map(({ label, name, icon }) => (
//             <Box key={name} sx={{ mb: 2 }}>
//               <Typography variant="body1" sx={{ mb: 1 }}>{label}</Typography>
//               <TextField fullWidth name={name} value={socialData[name] || ''} onChange={(e) => handleChange(e, setSocialData)} InputProps={{ startAdornment: <InputAdornment position="start">{icon}</InputAdornment> }} />
//             </Box>
//           ))}
//           <Button variant="contained" onClick={() => handleSubmit(2, socialData)}>Update Social</Button>
//         </Box>
//       </TabPanel>

//       {/* --- BANK ACCOUNT TAB (MODIFIED) --- */}
//       <TabPanel value={tabIndex} index={2}>
//         <Box component="form" sx={{ maxWidth: 800 }}>
//           <Grid container spacing={2}>
//             {[
//               { label: "Account Title", name: "account_title" }, { label: "Account Number", name: "account_number" },
//               { label: "Bank Name", name: "bank_name" }, { label: "IFSC Code", name: "ifsc_code" },
//               { label: "Bank Branch", name: "bank_branch", full: true },
//             ].map((field) => (
//               <Grid item xs={12} sm={field.full ? 12 : 6} key={field.name}>
//                 <TextField label={field.label} name={field.name} value={bankData[field.name] || ''} onChange={(e) => handleChange(e, setBankData)} fullWidth required />
//               </Grid>
//             ))}
//           </Grid>
//           <Box sx={{ mt: 3 }}>
//             <Button variant="contained" onClick={handleBankAndOtherSubmit}>Update Bank Info</Button>
//           </Box>
//         </Box>
//       </TabPanel>

//       {/* --- EMERGENCY CONTACT TAB --- */}
//       <TabPanel value={tabIndex} index={3}>
//         <Box component="form" sx={{ maxWidth: 800 }}>
//           <Grid container spacing={2}>
//             <Grid item xs={12}><TextField label="Full Name" name="contact_full_name" value={contactData.contact_full_name || ''} onChange={(e) => handleChange(e, setContactData)} fullWidth required InputProps={{ startAdornment: <InputAdornment position="start"><PersonIcon /></InputAdornment> }} /></Grid>
//             <Grid item xs={12} sm={6}><TextField label="Contact Number" name="contact_phone_no" value={contactData.contact_phone_no || ''} onChange={(e) => handleChange(e, setContactData)} fullWidth required /></Grid>
//             <Grid item xs={12} sm={6}><TextField label="Email" name="contact_email" value={contactData.contact_email || ''} onChange={(e) => handleChange(e, setContactData)} fullWidth required InputProps={{ startAdornment: <InputAdornment position="start"><EmailIcon /></InputAdornment> }} /></Grid>
//             <Grid item xs={12}><TextField label="Address" name="contact_address" value={contactData.contact_address || ''} onChange={(e) => handleChange(e, setContactData)} fullWidth required multiline minRows={2} /></Grid>
//           </Grid>
//           <Box sx={{ mt: 3 }}><Button variant="contained" onClick={() => handleSubmit(4, contactData)}>Update Contact</Button></Box>
//         </Box>
//       </TabPanel>

//       {/* --- OTHER DETAILS TAB (NEW) --- */}
//       <TabPanel value={tabIndex} index={4}>
//         <Box component="form" sx={{ maxWidth: 800 }}>
//           <Grid container spacing={2}>
//             {[
//               { label: "PF No.", name: "pf_no" }, { label: "ESIC No.", name: "esic_no" },
//               { label: "PAN No.", name: "pan_no" }, { label: "Aadhar No.", name: "aadhar_no" },
//             ].map((field) => (
//               <Grid item xs={12} sm={6} key={field.name}>
//                 <TextField label={field.label} name={field.name} value={otherData[field.name] || ''} onChange={(e) => handleChange(e, setOtherData)} fullWidth required />
//               </Grid>
//             ))}
//           </Grid>
//           <Box sx={{ mt: 3 }}>
//             <Button variant="contained" onClick={handleBankAndOtherSubmit}>Update Other Details</Button>
//           </Box>
//         </Box>
//       </TabPanel>

//     </Box>
//   );
// };

// export default PersonalInformation;    ////// /







// import React, { useEffect, useState, useContext, useCallback } from 'react';
// import { EmployeeContext } from './EmployeeContext';
// import {
//   Box, Tabs, Tab, Typography, TextField, MenuItem, Button,
//   InputAdornment, Grid
// } from '@mui/material';
// import FacebookIcon from '@mui/icons-material/Facebook';
// import TwitterIcon from '@mui/icons-material/Twitter';
// import GoogleIcon from '@mui/icons-material/Google';
// import LinkedInIcon from '@mui/icons-material/LinkedIn';
// import PersonIcon from '@mui/icons-material/Person';
// import EmailIcon from '@mui/icons-material/Email';
// import axiosInstance from '../../utils/axiosInstance';
// import Swal from 'sweetalert2';

// function TabPanel({ children, value, index }) {
//   return (
//     <div role="tabpanel" hidden={value !== index}>
//       {value === index && <Box sx={{ pt: 2 }}>{children}</Box>}
//     </div>
//   );
// }

// const PersonalInformation = () => {
//   const { employeeId } = useContext(EmployeeContext);
//   const userId = employeeId;
//   const [tabIndex, setTabIndex] = useState(0);

//   // State for each tab
//   const [bioData, setBioData] = useState({ bio: '', experience: '' });
//   const [socialData, setSocialData] = useState({
//     fb_profile: '', twitter_profile: '', gplus_profile: '', linkedin_profile: ''
//   });
//   // MODIFIED: Bank data state is now separate
//   const [bankData, setBankData] = useState({
//     account_title: '', account_number: '', bank_name: '', ifsc_code: '', bank_branch: ''
//   });
//   // NEW: State for the "Other Details" tab
//   const [otherData, setOtherData] = useState({
//     pf_no: '', esic_no: '', pan_no: '', aadhar_no: ''
//   });
//   const [contactData, setContactData] = useState({
//     contact_full_name: '', contact_phone_no: '', contact_email: '', contact_address: ''
//   });

//   const fetchData = useCallback(async (type) => {
//     try {
//       const res = await axiosInstance.post('/api/personal_info/', { user_id: userId, type });
//       const data = res.data.personal_details;

//       switch (type) {
//         case 1:
//           setBioData(data || { bio: '', experience: '' });
//           break;
//         case 2:
//           setSocialData(data || { fb_profile: '', twitter_profile: '', gplus_profile: '', linkedin_profile: '' });
//           break;
//         case 3:
//           // MODIFIED: Populate both bank and other details from a single API call
//           setBankData({
//             account_title: data.account_title || '',
//             account_number: data.account_number || '',
//             bank_name: data.bank_name || '',
//             ifsc_code: data.ifsc_code || '',
//             bank_branch: data.bank_branch || '',
//           });
//           setOtherData({
//             pf_no: data.pf_no || '',
//             esic_no: data.esic_no || '',
//             pan_no: data.pan_no || '',
//             aadhar_no: data.aadhar_no || '' // Assuming API might send this
//           });
//           break;
//         case 4:
//           setContactData(data || { contact_full_name: '', contact_phone_no: '', contact_email: '', contact_address: '' });
//           break;
//         default:
//           break;
//       }
//     } catch (err) {
//       console.error('Fetch error:', err);
//       Swal.fire({
//         icon: 'error',
//         title: 'Fetch Error',
//         text: `Failed to load data for this tab. Please try again.`
//       });
//     }
//   }, [userId]);

//   useEffect(() => {
//     if (userId) {
//       // Determine which data type to fetch based on the selected tab
//       let fetchType;
//       if (tabIndex === 2 || tabIndex === 4) { // Bank Account or Other Details
//         fetchType = 3;
//       } else if (tabIndex === 3) { // Emergency Contact
//         fetchType = 4;
//       } else { // Bio or Social
//         fetchType = tabIndex + 1;
//       }

//       requestAnimationFrame(() => {
//         fetchData(fetchType);
//       });
//     }
//   }, [tabIndex, userId, fetchData]);

//   const handleChange = (e, setter) => {
//     const { name, value } = e.target;
//     setter(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (type, data) => {
//     Swal.fire({
//       title: 'Updating...',
//       text: 'Please wait while we save your information.',
//       allowOutsideClick: false,
//       didOpen: () => {
//         Swal.showLoading();
//       }
//     });

//     try {
//       let payload = { user_id: userId, type, ...data };
//       await axiosInstance.patch('/api/personal_info/', payload);

//       Swal.fire({
//         icon: 'success',
//         title: 'Updated!',
//         text: 'Your information has been updated successfully.'
//       });

//     } catch (err) {
//       console.error('Update error:', err.response?.data || err.message);
//       const errorMessage = err.response?.data?.message || 'Failed to update information.';
//       Swal.fire({
//         icon: 'error',
//         title: 'Update Failed',
//         text: errorMessage
//       });
//     }
//   };

//   // NEW: A dedicated submit handler for Bank and Other details
//   const handleBankAndOtherSubmit = async () => {
//     Swal.fire({
//       title: 'Updating...',
//       text: 'Please wait while we save your information.',
//       allowOutsideClick: false,
//       didOpen: () => Swal.showLoading()
//     });

//     try {
//       // Combine data from both states and map to the correct API keys
//       const payload = {
//         user_id: userId,
//         type: 3,
//         account_title: bankData.account_title,
//         account_number: bankData.account_number,
//         bank_name: bankData.bank_name,
//         ifsc_code: bankData.ifsc_code,
//         bank_branch: bankData.bank_branch,
//         pf_number: otherData.pf_no,
//         esic_number: otherData.esic_no,
//         pan_number: otherData.pan_no,
//         aadhar_number: otherData.aadhar_no,
//       };

//       await axiosInstance.patch('/api/personal_info/', payload);

//       Swal.fire({ icon: 'success', title: 'Updated!', text: 'Information has been updated successfully.' });

//     } catch (err) {
//       console.error('Update error:', err.response?.data || err.message);
//       const errorMessage = err.response?.data?.message || 'Failed to update information.';
//       Swal.fire({ icon: 'error', title: 'Update Failed', text: errorMessage });
//     }
//   };

//   return (
//     <Box sx={{ p: 3 }}>
//       <Typography variant="h6" gutterBottom>👤 Personal Information</Typography>

//       <Tabs
//         value={tabIndex}
//         onChange={(e, newValue) => setTabIndex(newValue)}
//         sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}
//         textColor="primary"
//         indicatorColor="primary"
//       >
//         <Tab label="Bio" />
//         <Tab label="Social Profile" />
//         <Tab label="Bank Account" />
//         <Tab label="Emergency Contact" />
//         <Tab label="Other Details" />
//       </Tabs>

//       {/* --- BIO TAB --- */}
//       <TabPanel value={tabIndex} index={0}>
//         <TextField label="Bio" name="bio" value={bioData.bio || ''} onChange={(e) => handleChange(e, setBioData)} fullWidth multiline minRows={2} required sx={{ mb: 3 }} />
//         <TextField label="Experience" name="experience" value={bioData.experience || ''} onChange={(e) => handleChange(e, setBioData)} select fullWidth sx={{ mb: 3 }}>
//           {Array.from({ length: 50 }, (_, i) => (<MenuItem key={i + 1} value={i + 1}>{i + 1} {i + 1 === 1 ? 'Year' : 'Years'}</MenuItem>))}
//         </TextField>
//         <Box textAlign="right"><Button variant="contained" sx={{ backgroundColor: '#6c63ff', px: 4 }} onClick={() => handleSubmit(1, bioData)}>Update Bio</Button></Box>
//       </TabPanel>

//       {/* --- SOCIAL TAB --- */}
//       <TabPanel value={tabIndex} index={1}>
//         <Box sx={{ maxWidth: 600 }}>
//           {[
//             { label: 'Facebook', name: 'fb_profile', icon: <FacebookIcon sx={{ color: '#3b5998' }} /> },
//             { label: 'Twitter', name: 'twitter_profile', icon: <TwitterIcon sx={{ color: '#00acee' }} /> },
//             { label: 'Google Plus', name: 'gplus_profile', icon: <GoogleIcon sx={{ color: '#db4437' }} /> },
//             { label: 'LinkedIn', name: 'linkedin_profile', icon: <LinkedInIcon sx={{ color: '#0e76a8' }} /> },
//           ].map(({ label, name, icon }) => (
//             <Box key={name} sx={{ mb: 2 }}>
//               <Typography variant="body1" sx={{ mb: 1 }}>{label}</Typography>
//               <TextField fullWidth name={name} value={socialData[name] || ''} onChange={(e) => handleChange(e, setSocialData)} InputProps={{ startAdornment: <InputAdornment position="start">{icon}</InputAdornment> }} />
//             </Box>
//           ))}
//           <Button variant="contained" onClick={() => handleSubmit(2, socialData)}>Update Social</Button>
//         </Box>
//       </TabPanel>

//       {/* --- BANK ACCOUNT TAB (MODIFIED) --- */}
//       <TabPanel value={tabIndex} index={2}>
//         <Box component="form" sx={{ maxWidth: 800 }}>
//           <Grid container spacing={2}>
//             {[
//               { label: "Account Title", name: "account_title" }, { label: "Account Number", name: "account_number" },
//               { label: "Bank Name", name: "bank_name" }, { label: "IFSC Code", name: "ifsc_code" },
//               { label: "Bank Branch", name: "bank_branch", full: true },
//             ].map((field) => (
//               <Grid item xs={12} sm={field.full ? 12 : 6} key={field.name}>
//                 <TextField label={field.label} name={field.name} value={bankData[field.name] || ''} onChange={(e) => handleChange(e, setBankData)} fullWidth required />
//               </Grid>
//             ))}
//           </Grid>
//           <Box sx={{ mt: 3 }}>
//             <Button variant="contained" onClick={handleBankAndOtherSubmit}>Update Bank Info</Button>
//           </Box>
//         </Box>
//       </TabPanel>

//       {/* --- EMERGENCY CONTACT TAB --- */}
//       <TabPanel value={tabIndex} index={3}>
//         <Box component="form" sx={{ maxWidth: 800 }}>
//           <Grid container spacing={2}>
//             <Grid item xs={12}><TextField label="Full Name" name="contact_full_name" value={contactData.contact_full_name || ''} onChange={(e) => handleChange(e, setContactData)} fullWidth required InputProps={{ startAdornment: <InputAdornment position="start"><PersonIcon /></InputAdornment> }} /></Grid>
//             <Grid item xs={12} sm={6}><TextField label="Contact Number" name="contact_phone_no" value={contactData.contact_phone_no || ''} onChange={(e) => handleChange(e, setContactData)} fullWidth required /></Grid>
//             <Grid item xs={12} sm={6}><TextField label="Email" name="contact_email" value={contactData.contact_email || ''} onChange={(e) => handleChange(e, setContactData)} fullWidth required InputProps={{ startAdornment: <InputAdornment position="start"><EmailIcon /></InputAdornment> }} /></Grid>
//             <Grid item xs={12}><TextField label="Address" name="contact_address" value={contactData.contact_address || ''} onChange={(e) => handleChange(e, setContactData)} fullWidth required multiline minRows={2} /></Grid>
//           </Grid>
//           <Box sx={{ mt: 3 }}><Button variant="contained" onClick={() => handleSubmit(4, contactData)}>Update Contact</Button></Box>
//         </Box>
//       </TabPanel>

//       {/* --- OTHER DETAILS TAB (NEW) --- */}
//       <TabPanel value={tabIndex} index={4}>
//         <Box component="form" sx={{ maxWidth: 800 }}>
//           <Grid container spacing={2}>
//             {[
//               { label: "PF No.", name: "pf_no" }, { label: "ESIC No.", name: "esic_no" },
//               { label: "PAN No.", name: "pan_no" }, { label: "Aadhar No.", name: "aadhar_no" },
//             ].map((field) => (
//               <Grid item xs={12} sm={6} key={field.name}>
//                 <TextField label={field.label} name={field.name} value={otherData[field.name] || ''} onChange={(e) => handleChange(e, setOtherData)} fullWidth required />
//               </Grid>
//             ))}
//           </Grid>
//           <Box sx={{ mt: 3 }}>
//             <Button variant="contained" onClick={handleBankAndOtherSubmit}>Update Other Details</Button>
//           </Box>
//         </Box>
//       </TabPanel>

//     </Box>
//   );
// };

// export default PersonalInformation;









// import React, { useEffect, useState, useContext } from 'react';
// import {
//     Box, Tabs, Tab, Typography, TextField, MenuItem, Button,
//     InputAdornment, Grid
// } from '@mui/material';
// import FacebookIcon from '@mui/icons-material/Facebook';
// import TwitterIcon from '@mui/icons-material/Twitter';
// import GoogleIcon from '@mui/icons-material/Google';
// import LinkedInIcon from '@mui/icons-material/LinkedIn';
// import PersonIcon from '@mui/icons-material/Person';
// import EmailIcon from '@mui/icons-material/Email';
// import axiosInstance from '../../utils/axiosInstance';
// import { EmployeeContext } from '../../SuperAdmin/Employee/EmployeeContext';
// import Swal from 'sweetalert2';
 
// function TabPanel({ children, value, index }) {
//     return (
//         <div role="tabpanel" hidden={value !== index}>
//             {value === index && <Box sx={{ pt: 2 }}>{children}</Box>}
//         </div>
//     );
// }
 
// const PersonalInformation = () => {
//     const { employeeId } = useContext(EmployeeContext);
//     const userId = employeeId;
//     const [tabIndex, setTabIndex] = useState(0);
 
//     const [bioData, setBioData] = useState({ bio: '', experience: '' });
//     const [socialData, setSocialData] = useState({
//         fb_profile: '', twitter_profile: '', gplus_profile: '', linkedin_profile: ''
//     });
//     const [bankData, setBankData] = useState({
//         account_title: '',
//         account_number: '',
//         bank_name: '',
//         ifsc_code: '',
//         bank_branch: ''
//     });
//     const [contactData, setContactData] = useState({
//         contact_full_name: '', contact_phone_no: '', contact_phone_no_2: '', contact_email: '', contact_address: ''
//     });
//     const [otherData, setOtherData] = useState({
//         uan_number: '',
//         pf_no: '',
//         esic_no: '',
//         pan_no: '',
//         aadhar_no: '',
//         passport_no: '',
//         vehicle_no: '',
//         driving_licence_no: ''
//     });

//        const [policeStationData, setPoliceStationData] = useState({
//         police_station_address: '',
//         police_station_state: '', // This will hold the state_name
//         police_station_state_id: null, // NEW: This will hold the state_id
//         police_station_district: '',
//         police_station_village: '',
//         police_station_pincode: ''
//     });
//     const [countries, setCountries] = useState([]);
//     const [selectedCountry, setSelectedCountry] = useState(''); // Stores the selected country name
//     const [states, setStates] = useState([]);
 
//     const fetchData = async (type) => {
//         try {
//             const res = await axiosInstance.post('/api/personal_info/', { user_id: userId, type });
//             const data = res.data.personal_details;
//             switch (type) {
//                 case 1:
//                     setBioData(data || { bio: '', experience: '' });
//                     break;
//                 case 2:
//                     setSocialData(data || { fb_profile: '', twitter_profile: '', gplus_profile: '', linkedin_profile: '' });
//                     break;
//                 case 3:
//                     setBankData({
//                         account_title: data.account_title || '',
//                         account_number: data.account_number || '',
//                         bank_name: data.bank_name || '',
//                         ifsc_code: data.ifsc_code || '',
//                         bank_branch: data.bank_branch || ''
//                     });
//                     break;
//                 case 4:
//                     setContactData(data || { contact_full_name: '', contact_phone_no: '', contact_phone_no_2: '', contact_email: '', contact_address: '' });
//                     break;
//                 case 5:
//                     setOtherData({
//                         uan_number: data.uan_number || '',
//                         pf_no: data.pf_no || '',
//                         esic_no: data.esic_no || '',
//                         pan_no: data.pan_no || '',
//                         aadhar_no: data.aadhar_no || '',
//                         passport_no: data.passport_no || '',
//                         vehicle_no: data.vehicle_no || '',
//                         driving_licence_no: data.driving_licence_no || ''
//                     });
//                     break;

//                                 case 6: // New case for Police Station Details
//                     setPoliceStationData({ // Ensure data properties are initialized even if 'data' is null
//                         police_station_address: data?.police_station_address || '',
//                         police_station_state: data?.police_station_state || '',
//                         police_station_state_id: data?.police_station_state_id || null, // NEW: Initialize state_id from fetched data
//                         police_station_district: data?.police_station_district || '',
//                         police_station_village: data?.police_station_village || '',
//                         police_station_pincode: data?.police_station_pincode || ''
//                     });
//                     // --- UPDATE THIS BLOCK ---
//                     if (data && data.police_station_state && countries.length > 0) {
//                         // Assuming 'India' for states. If your backend returns country for policeStationData, use data.country_name
//                         setSelectedCountry('India');
//                     } else if (countries.length > 0 && !selectedCountry) {
//                         const indiaCountry = countries.find(c => c.country_name === 'India');
//                         setSelectedCountry(indiaCountry ? 'India' : countries[0]?.country_name || '');
//                     }
//                     // --- END UPDATE ---
//                     break;
//                 default:
//                     break;
//             }
//         } catch (err) {
//             console.error('Fetch error:', err);
//             Swal.fire({
//                 icon: 'error',
//                 title: 'Fetch Error',
//                 text: 'Failed to load data for this tab. Please try again.'
//             });
//         }
//     };
 
//        useEffect(() => {
//         if (userId) {
//             const loadDataAndCountries = async () => {
//                 // Fetch countries first, as states depend on selectedCountry
//                 try {
//                     const res = await axiosInstance.get('/api/countries/');
//                     const fetchedCountries = res.data.data;
//                     setCountries(fetchedCountries);

//                     let defaultCountry = '';
//                     const indiaCountry = fetchedCountries.find(c => c.country_name === 'India');
//                     if (indiaCountry) {
//                         defaultCountry = 'India';
//                     } else if (fetchedCountries.length > 0) {
//                         defaultCountry = fetchedCountries[0].country_name;
//                     }
//                     setSelectedCountry(defaultCountry);

//                 } catch (err) {
//                     console.error('Failed to fetch countries:', err);
//                     Swal.fire({
//                         icon: 'error',
//                         title: 'Country Fetch Error',
//                         text: 'Failed to load countries. Please try again.'
//                     });
//                 }

//                 // Then fetch personal data
//                 await fetchData(tabIndex + 1); // fetchData will set policeStationData, which includes state_name and state_id
//             };
//             loadDataAndCountries();
//         }
//     }, [tabIndex, userId]); // Keep original dependencies. policeStationData.police_station_state is handled by the other useEffect
 
//     const handleChange = (e, setter) => {
//         const { name, value } = e.target;
//         setter(prev => ({ ...prev, [name]: value }));
//     };
 
//     const handleSubmit = async (type, data) => {
//         Swal.fire({
//             title: 'Updating...',
//             text: 'Please wait while we save your information.',
//             allowOutsideClick: false,
//             didOpen: () => {
//                 Swal.showLoading();
//             }
//         });
 
//         try {
//             let payload = { user_id: userId, type, ...data };
 
//             if (type === 3) {
//                 payload = {
//                     user_id: userId,
//                     type: type,
//                     account_title: data.account_title,
//                     account_number: data.account_number,
//                     bank_name: data.bank_name,
//                     ifsc_code: data.ifsc_code,
//                     bank_branch: data.bank_branch
//                 };
//             }
 
//             if (type === 5) {
//                 payload = {
//                     user_id: userId,
//                     type: type,
//                     uan_number: data.uan_number,
//                     pf_number: data.pf_no,
//                     esic_number: data.esic_no,
//                     pan_number: data.pan_no,
//                     aadhar_number: data.aadhar_no,
//                     passport_number: data.passport_no,
//                     vehicle_number: data.vehicle_no,
//                     driving_licence_number: data.driving_licence_no
//                 };
//             }

//             if (type === 6) { // Police Station Details
//                 payload = {
//                     user_id: userId,
//                     type: type,
//                     police_station_address: data.police_station_address,
//                     police_station_state: data.police_station_state_id, 
//                     police_station_district: data.police_station_district,
//                     police_station_village: data.police_station_village,
//                     police_station_pincode: data.police_station_pincode
//                 };
//             }
 
//             await axiosInstance.patch('/api/personal_info/', payload);
 
//             Swal.fire({
//                 icon: 'success',
//                 title: 'Updated!',
//                 text: 'Your information has been updated successfully.'
//             });
 
//         } catch (err) {
//             console.error('Update error:', err.response?.data || err.message);
//             const errorMessage = err.response?.data?.message || 'Failed to update information.';
//             Swal.fire({
//                 icon: 'error',
//                 title: 'Update Failed',
//                 text: errorMessage
//             });
//         }
//     };

//         // --- ADD THIS NEW useEffect BLOCK ---
//     useEffect(() => {
//         if (selectedCountry) {
//             const fetchStates = async () => {
//                 try {
//                     const res = await axiosInstance.get(`/api/states/?country_name=${selectedCountry}`);
//                     setStates(res.data.data);
//                     // Reset selected state if the previously selected state is not in the new list
//                     if (policeStationData.police_station_state && !res.data.data.some(s => s.state_name === policeStationData.police_station_state)) {
//                         setPoliceStationData(prev => ({ ...prev, police_station_state: '' }));
//                     }
//                 } catch (err) {
//                     console.error('Failed to fetch states:', err);
//                     Swal.fire({
//                         icon: 'error',
//                         title: 'State Fetch Error',
//                         text: 'Failed to load states. Please try again.'
//                     });
//                 }
//             };
//             fetchStates();
//         } else {
//             setStates([]); // Clear states if no country is selected
//             setPoliceStationData(prev => ({ ...prev, police_station_state: '' })); // Clear selected state as well
//         }
//     }, [selectedCountry, policeStationData.police_station_state]); // Add policeStationData.police_station_state to dependencies to re-evaluate state clearing
//     // --- END NEW useEffect BLOCK ---
 
//     return (
//         <Box sx={{ p: 3 }}>
//             <Typography variant="h6" gutterBottom>👤 Personal Information</Typography>
//             <Tabs
//                 value={tabIndex}
//                 onChange={(e, newValue) => setTabIndex(newValue)}
//                 sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}
//                 textColor="primary"
//                 indicatorColor="primary"
//                 variant="scrollable" // Add this line
//                 scrollButtons="auto" // Add this line (or "on")
//             >
//                 <Tab label="Bio" />
//                 <Tab label="Social Profile" />
//                 <Tab label="Bank Account" />
//                 <Tab label="Emergency Contact" />
//                 <Tab label="Identification Details" />
//                 <Tab label="Police Station Details" />
//             </Tabs>
 
//             <TabPanel value={tabIndex} index={0}>
//                 <TextField
//                     label="Bio"
//                     name="bio"
//                     value={bioData.bio || ''}
//                     onChange={(e) => handleChange(e, setBioData)}
//                     fullWidth
//                     multiline
//                     minRows={2}
//                     required
//                     sx={{ mb: 3 }}
//                 />
//                 <TextField
//                     label="Experience"
//                     name="experience"
//                     value={bioData.experience || ''}
//                     onChange={(e) => handleChange(e, setBioData)}
//                     select
//                     fullWidth
//                     sx={{ mb: 3 }}
//                 >
//                     {Array.from({ length: 50 }, (_, i) => (
//                         <MenuItem key={i + 1} value={i + 1}>
//                             {i + 1} {i + 1 === 1 ? 'Year' : 'Years'}
//                         </MenuItem>
//                     ))}
//                 </TextField>
//                 <Box textAlign="right">
//                     <Button
//                         variant="contained"
//                         sx={{ backgroundColor: '#6c63ff', px: 4 }}
//                         onClick={() => handleSubmit(1, bioData)}
//                     >
//                         Update Bio
//                     </Button>
//                 </Box>
//             </TabPanel>
 
//             <TabPanel value={tabIndex} index={1}>
//                 <Box sx={{ maxWidth: 600 }}>
//                     {[
//                         { label: 'Facebook', name: 'fb_profile', icon: <FacebookIcon sx={{ color: '#3b5998' }} /> },
//                         { label: 'Twitter', name: 'twitter_profile', icon: <TwitterIcon sx={{ color: '#00acee' }} /> },
//                         { label: 'Google Plus', name: 'gplus_profile', icon: <GoogleIcon sx={{ color: '#db4437' }} /> },
//                         { label: 'LinkedIn', name: 'linkedin_profile', icon: <LinkedInIcon sx={{ color: '#0e76a8' }} /> },
//                     ].map(({ label, name, icon }, i) => (
//                         <Box key={i} sx={{ mb: 2 }}>
//                             <Typography variant="body1" sx={{ mb: 1 }}>{label}</Typography>
//                             <TextField
//                                 fullWidth
//                                 name={name}
//                                 value={socialData[name] || ''}
//                                 onChange={(e) => handleChange(e, setSocialData)}
//                                 InputProps={{ startAdornment: <InputAdornment position="start">{icon}</InputAdornment> }}
//                             />
//                         </Box>
//                     ))}
//                     <Button variant="contained" onClick={() => handleSubmit(2, socialData)}>Update Social</Button>
//                 </Box>
//             </TabPanel>
 
//             <TabPanel value={tabIndex} index={2}>
//                 <Box component="form" sx={{ maxWidth: 800 }}>
//                     <Grid container spacing={2}>
//                         {[
//                             { label: "Account Holder Name", name: "account_title" },
//                             { label: "Account Number", name: "account_number" },
//                             { label: "Bank Name", name: "bank_name" },
//                             { label: "IFSC Code", name: "ifsc_code" },
//                             { label: "Bank Branch", name: "bank_branch", full: true },
//                         ].map((field, idx) => (
//                             <Grid item xs={12} sm={field.full ? 12 : 6} key={idx}>
//                                 <TextField
//                                     label={field.label}
//                                     name={field.name}
//                                     value={bankData[field.name] || ''}
//                                     onChange={(e) => handleChange(e, setBankData)}
//                                     fullWidth
//                                     required
//                                 />
//                             </Grid>
//                         ))}
//                     </Grid>
//                     <Box sx={{ mt: 3 }}>
//                         <Button variant="contained" onClick={() => handleSubmit(3, bankData)}>Update Bank Info</Button>
//                     </Box>
//                 </Box>
//             </TabPanel>
 
//             <TabPanel value={tabIndex} index={3}>
//                 <Box component="form" sx={{ maxWidth: 800 }}>
//                     <Grid container spacing={2}>
//                         <Grid item xs={12}>
//                             <TextField
//                                 label="Full Name"
//                                 name="contact_full_name"
//                                 value={contactData.contact_full_name || ''}
//                                 onChange={(e) => handleChange(e, setContactData)}
//                                 fullWidth
//                                 required
//                                 InputProps={{ startAdornment: <InputAdornment position="start"><PersonIcon /></InputAdornment> }}
//                             />
//                         </Grid>
//                         <Grid item xs={12} sm={6}>
//                             <TextField
//                                 label="Emergency Contact 1"
//                                 name="contact_phone_no"
//                                 value={contactData.contact_phone_no || ''}
//                                 onChange={(e) => handleChange(e, setContactData)}
//                                 fullWidth
//                                 required
//                                 type="tel"
//                                 onInput={(e) => {
//                                     e.target.value = e.target.value.replace(/[^0-9]/g, '').slice(0, 10);
//                                 }}
//                             />
//                         </Grid>
//                         <Grid item xs={12} sm={6}>
//                             <TextField
//                                 label="Emergency Contact 2"
//                                 name="contact_phone_no_2"
//                                 value={contactData.contact_phone_no_2 || ''}
//                                 onChange={(e) => handleChange(e, setContactData)}
//                                 fullWidth
//                                 required
//                                 type="tel"
//                                 onInput={(e) => {
//                                     e.target.value = e.target.value.replace(/[^0-9]/g, '').slice(0, 10);
//                                 }}
//                             />
//                         </Grid>
//                         <Grid item xs={12}>
//                             <TextField
//                                 label="Email"
//                                 name="contact_email"
//                                 value={contactData.contact_email || ''}
//                                 onChange={(e) => handleChange(e, setContactData)}
//                                 fullWidth
//                                 required
//                                 InputProps={{ startAdornment: <InputAdornment position="start"><EmailIcon /></InputAdornment> }}
//                             />
//                         </Grid>
//                         <Grid item xs={12}>
//                             <TextField
//                                 label="Address"
//                                 name="contact_address"
//                                 value={contactData.contact_address || ''}
//                                 onChange={(e) => handleChange(e, setContactData)}
//                                 fullWidth
//                                 required
//                                 multiline
//                                 minRows={2}
//                             />
//                         </Grid>
//                     </Grid>
//                     <Box sx={{ mt: 3 }}>
//                         <Button variant="contained" onClick={() => handleSubmit(4, contactData)}>Update Contact</Button>
//                     </Box>
//                 </Box>
//             </TabPanel>
 
//             <TabPanel value={tabIndex} index={4}>
//                 <Box component="form" sx={{ maxWidth: 800 }}>
//                     <Grid container spacing={2}>
//                         <Grid item xs={12} sm={6}>
//                             <TextField
//                                 label="UAN NO."
//                                 name="uan_number"
//                                 value={otherData.uan_number || ''}
//                                 onChange={(e) => handleChange(e, setOtherData)}
//                                 fullWidth
//                                 required
//                             />
//                         </Grid>
//                         {[
//                             { label: "PF No.", name: "pf_no" },
//                             { label: "ESIC No.", name: "esic_no" },
//                             { label: "PAN No.", name: "pan_no" },
//                             { label: "Aadhar No.", name: "aadhar_no" },
//                             { label: "Passport No.", name: "passport_no" },
//                             { label: "Vehicle No.", name: "vehicle_no" },
//                             { label: "Driving Licence No.", name: "driving_licence_no", full: true },
//                         ].map((field, idx) => (
//                             <Grid item xs={12} sm={field.full ? 12 : 6} key={idx}>
//                                 <TextField
//                                     label={field.label}
//                                     name={field.name}
//                                     value={otherData[field.name] || ''}
//                                     onChange={(e) => handleChange(e, setOtherData)}
//                                     fullWidth
//                                     required
//                                 />
//                             </Grid>
//                         ))}
//                     </Grid>
//                     <Box sx={{ mt: 3 }}>
//                         <Button variant="contained" onClick={() => handleSubmit(5, otherData)}>Update Other Details</Button>
//                     </Box>
//                 </Box>

                
//             </TabPanel>
//               <TabPanel value={tabIndex} index={5}>
//                 <Box component="form" sx={{ maxWidth: 800 }}>
//                     <Grid container spacing={2}>
//                         {[
//                             { label: "Police Station Address", name: "police_station_address", full: true },
//                             // --- REPLACE THE EXISTING 'STATE' TEXTFIELD WITH THIS ---
//                             {
//                                 label: "Country",
//                                 name: "country", // This name is for local handling, not sent to API directly
//                                 type: "select-country",
//                                 value: selectedCountry,
//                                 options: countries.map(c => ({ value: c.country_name, label: c.country_name }))
//                             },
//                             {
//                                 label: "State",
//                                 name: "police_station_state",
//                                 type: "select-state",
//                                 value: policeStationData.police_station_state || '',
//                                options: states.map(s => ({ value: s.state_name, label: s.state_name, id: s.state_id }))
//                             },
//                             // --- END REPLACEMENT ---
//                             { label: "District", name: "police_station_district" },
//                             { label: "Village/City", name: "police_station_village" },
//                             { label: "Pincode", name: "police_station_pincode", type: "number" },
//                         ].map((field, idx) => (
//                             <Grid item xs={12} sm={field.full ? 12 : 6} key={idx}>
//                                 {field.type === "select-country" ? (
                                    
//                                     <TextField
//                                         select
//                                         label={field.label}
//                                         value={field.value}
//                                         onChange={(e) => setSelectedCountry(e.target.value)}
//                                         fullWidth
//                                         required
//                                     >
//                                         <MenuItem value=""><em>None</em></MenuItem>
//                                         {field.options.map((option, i) => (
//                                             <MenuItem key={i} value={option.value}>
//                                                 {option.label}
//                                             </MenuItem>
//                                         ))}
//                                     </TextField>
//                                 ) : field.type === "select-state" ? (
//                                     <TextField
//                                         select
//                                         label={field.label}
//                                         name={field.name}
//                                         value={field.value}
//                                         onChange={(e) => {
//                                             const selectedStateName = e.target.value;
//                                             const selectedStateObject = states.find(s => s.state_name === selectedStateName);

//                                             setPoliceStationData(prev => ({
//                                                 ...prev,
//                                                 police_station_state: selectedStateName, // Store the name for display/backend if expected
//                                                 police_station_state_id: selectedStateObject ? selectedStateObject.state_id : null // NEW: Store the state_id
//                                             }));
//                                         }}
//                                         fullWidth
//                                         required
//                                         disabled={!selectedCountry || states.length === 0} // Disable if no country selected or no states
//                                     >
//                                         <MenuItem value=""><em>None</em></MenuItem>
//                                         {states.length > 0 ? (
//                                             field.options.map((option, i) => (
//                                                 <MenuItem key={i} value={option.value}>
//                                                     {option.label}
//                                                 </MenuItem>
//                                             ))
//                                         ) : (
//                                             <MenuItem disabled>No States Available</MenuItem>
//                                         )}
//                                     </TextField>
//                                 ) : ( // Existing TextField rendering for other fields
//                                     <TextField
//                                         label={field.label}
//                                         name={field.name}
//                                         value={policeStationData[field.name] || ''}
//                                         onChange={(e) => handleChange(e, setPoliceStationData)}
//                                         fullWidth
//                                         required
//                                         type={field.type || "text"}
//                                         inputProps={field.type === "number" ? { pattern: "[0-9]*" } : {}}
//                                         onInput={field.name === "police_station_pincode" ? (e) => {
//                                             e.target.value = e.target.value.replace(/[^0-9]/g, '').slice(0, 6);
//                                         } : undefined}
//                                     />
//                                 )}
//                             </Grid>
//                         ))}
//                     </Grid>
//                     <Box sx={{ mt: 3 }}>
//                         <Button
//                             variant="contained"
//                             sx={{ backgroundColor: '#6c63ff', px: 4 }}
//                             onClick={() => handleSubmit(6, policeStationData)}
//                         >
//                             Update Police Station Details
//                         </Button>
//                     </Box>
//                 </Box>
//             </TabPanel>
//         </Box>
//     );
// };
 
// export default PersonalInformation;










// import React, { useEffect, useState, useContext } from 'react';
// import {
//     Box, Tabs, Tab, Typography, TextField, MenuItem, Button,
//     InputAdornment, Grid, CircularProgress
// } from '@mui/material';
// import FacebookIcon from '@mui/icons-material/Facebook';
// import TwitterIcon from '@mui/icons-material/Twitter';
// import GoogleIcon from '@mui/icons-material/Google';
// import LinkedInIcon from '@mui/icons-material/LinkedIn';
// import PersonIcon from '@mui/icons-material/Person';
// import EmailIcon from '@mui/icons-material/Email';
// import axiosInstance from '../../utils/axiosInstance';
// import { EmployeeContext } from '../../SuperAdmin/Employee/EmployeeContext';
// import Swal from 'sweetalert2';

// function TabPanel({ children, value, index }) {
//     return (
//         <div role="tabpanel" hidden={value !== index}>
//             {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
//         </div>
//     );
// }

// const PersonalInformation = () => {
//     const { employeeId } = useContext(EmployeeContext);
//     const userId = employeeId;
//     const [tabIndex, setTabIndex] = useState(0);
//     const [isLoading, setIsLoading] = useState(false);
//     const [isSubmitting, setIsSubmitting] = useState(false);

//     const initialFormData = {
//         bio: { bio: '', experience: '' },
//         social: { fb_profile: '', twitter_profile: '', gplus_profile: '', linkedin_profile: '' },
//         bank: { account_title: '', account_number: '', bank_name: '', ifsc_code: '', bank_branch: '' },
//         contact: { contact_full_name: '', contact_phone_no: '', contact_phone_no_2: '', contact_email: '', contact_address: '' },
//         other: { uan_number: '', pf_no: '', esic_no: '', pan_no: '', aadhar_no: '', passport_no: '', vehicle_no: '', driving_licence_no: '' },
//         policeStation: { police_station_address: '', police_station_state: '', police_station_state_id: null, police_station_district: '', police_station_village: '', police_station_pincode: '' }
//     };

//     const [formData, setFormData] = useState(initialFormData);
//     const [errors, setErrors] = useState({});
//     const [countries, setCountries] = useState([]);
//     const [states, setStates] = useState([]);
//     const [selectedCountry, setSelectedCountry] = useState('');

//     const fetchData = async (type) => {
//         if (!userId) return;
//         setIsLoading(true);
//         try {
//             const res = await axiosInstance.post('/api/personal_info/', { user_id: userId, type });
//             const data = res.data.personal_details || {};
           
//             setFormData(prev => {
//                 switch (type) {
//                     case 1: return { ...prev, bio: { bio: data.bio || '', experience: data.experience || '' } };
//                     case 2: return { ...prev, social: { fb_profile: data.fb_profile || '', twitter_profile: data.twitter_profile || '', gplus_profile: data.gplus_profile || '', linkedin_profile: data.linkedin_profile || '' } };
//                     case 3: return { ...prev, bank: { account_title: data.account_title || '', account_number: data.account_number || '', bank_name: data.bank_name || '', ifsc_code: data.ifsc_code || '', bank_branch: data.bank_branch || '' } };
//                     case 4: return { ...prev, contact: { contact_full_name: data.contact_full_name || '', contact_phone_no: data.contact_phone_no || '', contact_phone_no_2: data.contact_phone_no_2 || '', contact_email: data.contact_email || '', contact_address: data.contact_address || '' } };
//                     case 5: return { ...prev, other: { uan_number: data.uan_number || '', pf_no: data.pf_no || '', esic_no: data.esic_no || '', pan_no: data.pan_no || '', aadhar_no: data.aadhar_no || '', passport_no: data.passport_no || '', vehicle_no: data.vehicle_no || '', driving_licence_no: data.driving_licence_no || '' } };
//                     case 6:
//                         if (data.police_station_country) setSelectedCountry(data.police_station_country);
//                         return { ...prev, policeStation: { police_station_address: data.police_station_address || '', police_station_state: data.police_station_state || '', police_station_state_id: data.police_station_state_id || null, police_station_district: data.police_station_district || '', police_station_village: data.police_station_village || '', police_station_pincode: data.police_station_pincode || '' } };
//                     default: return prev;
//                 }
//             });
//         } catch (err) {
//             Swal.fire({ icon: 'error', title: 'Fetch Error', text: 'Failed to load data. Please refresh the page.' });
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     useEffect(() => {
//         const fetchCountries = async () => {
//             try {
//                 const res = await axiosInstance.get('/api/countries/');
//                 const fetchedCountries = res.data.data;
//                 setCountries(fetchedCountries);
//                 const india = fetchedCountries.find(c => c.country_name === 'India');
//                 setSelectedCountry(india ? 'India' : (fetchedCountries[0]?.country_name || ''));
//             } catch (err) { console.error('Failed to fetch countries:', err); }
//         };
//         fetchCountries();
//     }, []);
   
//     useEffect(() => {
//         if (userId) {
//             setErrors({});
//             fetchData(tabIndex + 1);
//         }
//     }, [tabIndex, userId]);
   
//     useEffect(() => {
//         if (selectedCountry) {
//             const fetchStates = async () => {
//                 try {
//                     const res = await axiosInstance.get(`/api/states/?country_name=${selectedCountry}`);
//                     setStates(res.data.data);
//                 } catch (err) { console.error('Failed to fetch states:', err); }
//             };
//             fetchStates();
//         } else {
//             setStates([]);
//         }
//     }, [selectedCountry]);
   
//     const handleChange = (form, name, value) => {
//         setFormData(prev => ({ ...prev, [form]: { ...prev[form], [name]: value } }));
//         if (errors[name]) {
//             setErrors(prev => ({ ...prev, [name]: null }));
//         }
//     };

//     const validate = (data, type) => {
//         const newErrors = {};
//         const digitsOnly = /^[0-9]+$/;
//         const charsOnly = /^[a-zA-Z\s]+$/;
//         const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
//         const alphanumeric = /^[a-zA-Z0-9\s-]+$/;

//         const requiredFields = {
//             1: ['bio', 'experience'],
//             2: ['fb_profile', 'twitter_profile', 'gplus_profile', 'linkedin_profile'],
//             3: ['account_title', 'account_number', 'bank_name', 'ifsc_code', 'bank_branch'],
//             4: ['contact_full_name', 'contact_phone_no', 'contact_phone_no_2', 'contact_email', 'contact_address'],
//             5: ['uan_number', 'pf_no', 'esic_no', 'pan_no', 'aadhar_no', 'passport_no', 'vehicle_no', 'driving_licence_no'],
//             6: ['police_station_address', 'police_station_state_id', 'police_station_district', 'police_station_village', 'police_station_pincode']
//         };

//         if (requiredFields[type]) {
//             requiredFields[type].forEach(field => {
//                 if (!data[field]) newErrors[field] = 'This field is required.';
//             });
//         }
       
//         if (type === 3) {
//             if (data.account_title && !charsOnly.test(data.account_title)) newErrors.account_title = 'Only characters are allowed.';
//             if (data.account_number && !digitsOnly.test(data.account_number)) newErrors.account_number = 'Only digits are allowed.';
//             if (data.bank_name && !charsOnly.test(data.bank_name)) newErrors.bank_name = 'Only characters are allowed.';
//             if (data.bank_branch && !charsOnly.test(data.bank_branch)) newErrors.bank_branch = 'Only characters are allowed.';
//         }
       
//         if (type === 4) {
//             if (data.contact_full_name && !charsOnly.test(data.contact_full_name)) newErrors.contact_full_name = 'Only characters are allowed.';
//             if (data.contact_email && !/\S+@\S+\.\S+/.test(data.contact_email)) newErrors.contact_email = 'Please enter a valid email address.';
//         }

//         if (type === 5) {
//             if (data.uan_number && !digitsOnly.test(data.uan_number)) newErrors.uan_number = 'Only digits are allowed.';
//             if (data.pf_no && !digitsOnly.test(data.pf_no)) newErrors.pf_no = 'Only digits are allowed.';
//             if (data.esic_no && !digitsOnly.test(data.esic_no)) newErrors.esic_no = 'Only digits are allowed.';
//             if (data.pan_no && !panRegex.test(data.pan_no.toUpperCase())) newErrors.pan_no = 'Invalid PAN format. (e.g., ABCDE1234F)';
//             if (data.aadhar_no && !digitsOnly.test(data.aadhar_no)) newErrors.aadhar_no = 'Only digits are allowed.';
//             if (data.passport_no && !alphanumeric.test(data.passport_no)) newErrors.passport_no = 'Only alphanumeric characters are allowed.';
//             if (data.vehicle_no && !alphanumeric.test(data.vehicle_no)) newErrors.vehicle_no = 'Only alphanumeric characters are allowed.';
//             if (data.driving_licence_no && !alphanumeric.test(data.driving_licence_no)) newErrors.driving_licence_no = 'Only alphanumeric characters are allowed.';
//         }

//         if (type === 6) {
//             if (data.police_station_district && !charsOnly.test(data.police_station_district)) newErrors.police_station_district = 'Only characters are allowed.';
//             if (data.police_station_village && !charsOnly.test(data.police_station_village)) newErrors.police_station_village = 'Only characters are allowed.';
//         }

//         setErrors(newErrors);
//         return Object.keys(newErrors).length === 0;
//     };

//     const handleSubmit = async (type) => {
//         const dataMap = { 1: formData.bio, 2: formData.social, 3: formData.bank, 4: formData.contact, 5: formData.other, 6: formData.policeStation };
//         const dataToSubmit = dataMap[type];

//         if (!validate(dataToSubmit, type)) {
//             Swal.fire({ icon: 'error', title: 'Validation Error', text: 'Please fill in all required fields correctly.' });
//             return;
//         }

//         setIsSubmitting(true);
//         Swal.fire({ title: 'Updating...', text: 'Please wait...', allowOutsideClick: false, didOpen: () => Swal.showLoading() });

//         try {
//             const payload = { user_id: userId, type, ...dataToSubmit };
//             if (type === 5) {
//                 payload.pf_number = payload.pf_no; delete payload.pf_no;
//                 payload.esic_number = payload.esic_no; delete payload.esic_no;
//                 payload.pan_number = payload.pan_no; delete payload.pan_no;
//                 payload.aadhar_number = payload.aadhar_no; delete payload.aadhar_no;
//                 payload.passport_number = payload.passport_no; delete payload.passport_no;
//                 payload.vehicle_number = payload.vehicle_no; delete payload.vehicle_no;
//                 payload.driving_licence_number = payload.driving_licence_no; delete payload.driving_licence_no;
//             }
//             if (type === 6) payload.police_station_state = payload.police_station_state_id;

//             await axiosInstance.patch('/api/personal_info/', payload);
//             Swal.fire({ icon: 'success', title: 'Updated!', text: 'Your information has been updated successfully.' });

//         } catch (err) {
//             const errorMessage = err.response?.data?.message || 'Failed to update information.';
//             Swal.fire({ icon: 'error', title: 'Update Failed', text: errorMessage });
//         } finally {
//             setIsSubmitting(false);
//         }
//     };
   

    
//     return (
//         <Box sx={{ p: 3 }}>
//             <Typography variant="h6" gutterBottom>👤 Personal Information</Typography>
//             <Tabs value={tabIndex} onChange={(e, newValue) => setTabIndex(newValue)} sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }} textColor="primary" indicatorColor="primary" variant="scrollable" scrollButtons="auto">
//                 <Tab label="Bio" /> <Tab label="Social Profile" /> <Tab label="Bank Account" /> <Tab label="Emergency Contact" /> <Tab label="Identification Details" /> <Tab label="Police Station Details" />
//             </Tabs>
           
//             {isLoading ? <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}><CircularProgress /></Box> :
//             <>
//                 <TabPanel value={tabIndex} index={0}>
//                     <TextField label="Bio" name="bio" value={formData.bio.bio} onChange={(e) => handleChange('bio', e.target.name, e.target.value)} fullWidth multiline minRows={3} sx={{ mb: 3 }} error={!!errors.bio} helperText={errors.bio} />
//                     <TextField label="Experience" name="experience" value={formData.bio.experience} onChange={(e) => handleChange('bio', e.target.name, e.target.value)} select fullWidth sx={{ mb: 3 }} error={!!errors.experience} helperText={errors.experience}>
//                         {Array.from({ length: 50 }, (_, i) => (<MenuItem key={i + 1} value={i + 1}>{i + 1} {i + 1 === 1 ? 'Year' : 'Years'}</MenuItem>))}
//                     </TextField>
//                     <Box textAlign="right"><Button variant="contained" sx={{ px: 4 }} onClick={() => handleSubmit(1)} disabled={isSubmitting}>Update Bio</Button></Box>
//                 </TabPanel>

//                 <TabPanel value={tabIndex} index={1}>
//                     <Box sx={{ maxWidth: 600 }}>
//                         {[ { label: 'Facebook', name: 'fb_profile', icon: <FacebookIcon sx={{ color: '#3b5998' }} /> }, { label: 'Twitter', name: 'twitter_profile', icon: <TwitterIcon sx={{ color: '#00acee' }} /> }, { label: 'Google Plus', name: 'gplus_profile', icon: <GoogleIcon sx={{ color: '#db4437' }} /> }, { label: 'LinkedIn', name: 'linkedin_profile', icon: <LinkedInIcon sx={{ color: '#0e76a8' }} /> }, ].map(({ label, name, icon }) => (
//                             <Box key={name} sx={{ mb: 2 }}>
//                                 <TextField label={label} fullWidth name={name} value={formData.social[name]} onChange={(e) => handleChange('social', e.target.name, e.target.value)} InputProps={{ startAdornment: <InputAdornment position="start">{icon}</InputAdornment> }} error={!!errors[name]} helperText={errors[name]}/>
//                             </Box>
//                         ))}
//                         <Button variant="contained" onClick={() => handleSubmit(2)} disabled={isSubmitting}>Update Social</Button>
//                     </Box>
//                 </TabPanel>

//                 <TabPanel value={tabIndex} index={2}>
//                     <Grid container spacing={2} maxWidth={800}>
//                         <Grid item xs={12} sm={6}><TextField label="Account Holder Name" name="account_title" value={formData.bank.account_title} onChange={(e) => handleChange('bank', e.target.name, e.target.value.replace(/[^a-zA-Z\s]/g, ''))} fullWidth error={!!errors.account_title} helperText={errors.account_title} /></Grid>
//                         <Grid item xs={12} sm={6}><TextField label="Account Number" name="account_number" value={formData.bank.account_number} onChange={(e) => handleChange('bank', e.target.name, e.target.value.replace(/[^0-9]/g, ''))} fullWidth error={!!errors.account_number} helperText={errors.account_number} /></Grid>
//                         <Grid item xs={12} sm={6}><TextField label="Bank Name" name="bank_name" value={formData.bank.bank_name} onChange={(e) => handleChange('bank', e.target.name, e.target.value.replace(/[^a-zA-Z\s]/g, ''))} fullWidth error={!!errors.bank_name} helperText={errors.bank_name} /></Grid>
//                         <Grid item xs={12} sm={6}><TextField label="IFSC Code" name="ifsc_code" value={formData.bank.ifsc_code} onChange={(e) => handleChange('bank', e.target.name, e.target.value)} fullWidth error={!!errors.ifsc_code} helperText={errors.ifsc_code} /></Grid>
//                         <Grid item xs={12}><TextField label="Bank Branch" name="bank_branch" value={formData.bank.bank_branch} onChange={(e) => handleChange('bank', e.target.name, e.target.value.replace(/[^a-zA-Z\s]/g, ''))} fullWidth error={!!errors.bank_branch} helperText={errors.bank_branch} /></Grid>
//                         <Grid item xs={12}><Button variant="contained" onClick={() => handleSubmit(3)} disabled={isSubmitting}>Update Bank Info</Button></Grid>
//                     </Grid>
//                 </TabPanel>

//                 <TabPanel value={tabIndex} index={3}>
//                     <Grid container spacing={2} maxWidth={800}>
//                         <Grid item xs={12}><TextField label="Full Name" name="contact_full_name" value={formData.contact.contact_full_name} onChange={(e) => handleChange('contact', e.target.name, e.target.value.replace(/[^a-zA-Z\s]/g, ''))} fullWidth error={!!errors.contact_full_name} helperText={errors.contact_full_name} InputProps={{ startAdornment: <InputAdornment position="start"><PersonIcon /></InputAdornment> }} /></Grid>
//                         <Grid item xs={12} sm={6}><TextField label="Emergency Contact 1" name="contact_phone_no" value={formData.contact.contact_phone_no} onChange={(e) => handleChange('contact', e.target.name, e.target.value.replace(/[^0-9]/g, '').slice(0, 10))} fullWidth type="tel" error={!!errors.contact_phone_no} helperText={errors.contact_phone_no} /></Grid>
//                         <Grid item xs={12} sm={6}><TextField label="Emergency Contact 2" name="contact_phone_no_2" value={formData.contact.contact_phone_no_2} onChange={(e) => handleChange('contact', e.target.name, e.target.value.replace(/[^0-9]/g, '').slice(0, 10))} fullWidth type="tel" error={!!errors.contact_phone_no_2} helperText={errors.contact_phone_no_2} /></Grid>
//                         <Grid item xs={12}><TextField label="Email" name="contact_email" value={formData.contact.contact_email} onChange={(e) => handleChange('contact', e.target.name, e.target.value)} fullWidth error={!!errors.contact_email} helperText={errors.contact_email} InputProps={{ startAdornment: <InputAdornment position="start"><EmailIcon /></InputAdornment> }} /></Grid>
//                         <Grid item xs={12}><TextField label="Address" name="contact_address" value={formData.contact.contact_address} onChange={(e) => handleChange('contact', e.target.name, e.target.value)} fullWidth multiline minRows={2} error={!!errors.contact_address} helperText={errors.contact_address} /></Grid>
//                         <Grid item xs={12}><Button variant="contained" onClick={() => handleSubmit(4)} disabled={isSubmitting}>Update Contact</Button></Grid>
//                     </Grid>
//                 </TabPanel>
               
//                 <TabPanel value={tabIndex} index={4}>
//                     <Grid container spacing={2} maxWidth={800}>
//                         <Grid item xs={12} sm={6}><TextField label="UAN No." name="uan_number" value={formData.other.uan_number} onChange={(e) => handleChange('other', e.target.name, e.target.value.replace(/[^0-9]/g, ''))} fullWidth error={!!errors.uan_number} helperText={errors.uan_number} /></Grid>
//                         <Grid item xs={12} sm={6}><TextField label="PF No." name="pf_no" value={formData.other.pf_no} onChange={(e) => handleChange('other', e.target.name, e.target.value.replace(/[^0-9]/g, ''))} fullWidth error={!!errors.pf_no} helperText={errors.pf_no} /></Grid>
//                         <Grid item xs={12} sm={6}><TextField label="ESIC No." name="esic_no" value={formData.other.esic_no} onChange={(e) => handleChange('other', e.target.name, e.target.value.replace(/[^0-9]/g, ''))} fullWidth error={!!errors.esic_no} helperText={errors.esic_no} /></Grid>
//                         <Grid item xs={12} sm={6}><TextField label="PAN No." name="pan_no" value={formData.other.pan_no} onChange={(e) => handleChange('other', e.target.name, e.target.value.toUpperCase())} fullWidth error={!!errors.pan_no} helperText={errors.pan_no} inputProps={{ maxLength: 10 }} /></Grid>
//                         <Grid item xs={12} sm={6}><TextField label="Aadhar No." name="aadhar_no" value={formData.other.aadhar_no} onChange={(e) => handleChange('other', e.target.name, e.target.value.replace(/[^0-9]/g, ''))} fullWidth error={!!errors.aadhar_no} helperText={errors.aadhar_no} /></Grid>
//                         <Grid item xs={12} sm={6}><TextField label="Passport No." name="passport_no" value={formData.other.passport_no} onChange={(e) => handleChange('other', e.target.name, e.target.value)} fullWidth error={!!errors.passport_no} helperText={errors.passport_no} /></Grid>
//                         <Grid item xs={12} sm={6}><TextField label="Vehicle No." name="vehicle_no" value={formData.other.vehicle_no} onChange={(e) => handleChange('other', e.target.name, e.target.value)} fullWidth error={!!errors.vehicle_no} helperText={errors.vehicle_no} /></Grid>
//                         <Grid item xs={12} sm={6}><TextField label="Driving Licence No." name="driving_licence_no" value={formData.other.driving_licence_no} onChange={(e) => handleChange('other', e.target.name, e.target.value)} fullWidth error={!!errors.driving_licence_no} helperText={errors.driving_licence_no} /></Grid>
//                         <Grid item xs={12}><Button variant="contained" onClick={() => handleSubmit(5)} disabled={isSubmitting}>Update Other Details</Button></Grid>
//                     </Grid>
//                 </TabPanel>

//                 <TabPanel value={tabIndex} index={5}>
//                     <Grid container spacing={2} maxWidth={800}>
//                         <Grid item xs={12}><TextField label="Police Station Address" name="police_station_address" value={formData.policeStation.police_station_address} onChange={(e) => handleChange('policeStation', e.target.name, e.target.value)} fullWidth error={!!errors.police_station_address} helperText={errors.police_station_address} /></Grid>
//                         <Grid item xs={12} sm={6}><TextField select label="Country" value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)} fullWidth>{countries.map(c => <MenuItem key={c.country_id} value={c.country_name}>{c.country_name}</MenuItem>)}</TextField></Grid>
//                         <Grid item xs={12} sm={6}>
//                             <TextField select label="State" name="police_station_state" value={formData.policeStation.police_station_state}
//                                 onChange={(e) => {
//                                     const stateName = e.target.value; const stateObj = states.find(s => s.state_name === stateName);
//                                     setFormData(prev => ({ ...prev, policeStation: { ...prev.policeStation, police_station_state: stateName, police_station_state_id: stateObj ? stateObj.state_id : null } }));
//                                 }} fullWidth disabled={!selectedCountry || states.length === 0} error={!!errors.police_station_state_id} helperText={errors.police_station_state_id}>
//                                 {states.length > 0 ? states.map(s => <MenuItem key={s.state_id} value={s.state_name}>{s.state_name}</MenuItem>) : <MenuItem disabled>No States Available</MenuItem>}
//                             </TextField>
//                         </Grid>
//                         <Grid item xs={12} sm={6}><TextField label="District" name="police_station_district" value={formData.policeStation.police_station_district} onChange={(e) => handleChange('policeStation', e.target.name, e.target.value.replace(/[^a-zA-Z\s]/g, ''))} fullWidth error={!!errors.police_station_district} helperText={errors.police_station_district} /></Grid>
//                         <Grid item xs={12} sm={6}><TextField label="Village/City" name="police_station_village" value={formData.policeStation.police_station_village} onChange={(e) => handleChange('policeStation', e.target.name, e.target.value.replace(/[^a-zA-Z\s]/g, ''))} fullWidth error={!!errors.police_station_village} helperText={errors.police_station_village} /></Grid>
//                         <Grid item xs={12} sm={6}><TextField label="Pincode" name="police_station_pincode" value={formData.policeStation.police_station_pincode} onChange={(e) => handleChange('policeStation', e.target.name, e.target.value.replace(/[^0-9]/g, '').slice(0, 6))} fullWidth type="tel" error={!!errors.police_station_pincode} helperText={errors.police_station_pincode} /></Grid>
//                         <Grid item xs={12}><Button variant="contained" sx={{ px: 4 }} onClick={() => handleSubmit(6)} disabled={isSubmitting}>Update Police Station Details</Button></Grid>
//                     </Grid>
//                 </TabPanel>
//             </>
//             }
//         </Box>
//     );
// };
 
// export default PersonalInformation;


// import React, { useEffect, useState, useContext } from 'react';
// import { 
//     Box, Typography, TextField, MenuItem, Button, Grid, CircularProgress, 
//     Stepper, Step, StepButton, FormControl, FormLabel, RadioGroup, 
//     FormControlLabel, Radio, InputAdornment, Paper
// } from '@mui/material';
// import { Facebook, Twitter, LinkedIn, Google } from '@mui/icons-material';
// import axiosInstance from '../../utils/axiosInstance';
// import { EmployeeContext } from './EmployeeContext';
// import Swal from 'sweetalert2';

// // --- THEME COLORS ---
// const PRIMARY_COLOR = "#8C257C"; // Purple
// const GRADIENT_BTN = `linear-gradient(135deg, ${PRIMARY_COLOR} 0%, #6d1d60 100%)`;

// const PersonalInformation = ({ onNext, onBack }) => {
//     const { employeeId } = useContext(EmployeeContext);
//     const userId = employeeId;
    
//     const steps = [
//         "Professional Information", 
//         "Bank Account", 
//         "Identification Details", 
//         "Emergency Contact", 
//         "Police Station", 
//         "Social Profile"
//     ];
    
//     const [activeStep, setActiveStep] = useState(0);
//     const [isLoading, setIsLoading] = useState(false);
    
//     // States for Dropdowns
//     const [countries, setCountries] = useState([]);
//     const [states, setStates] = useState([]);
//     const [selectedCountry, setSelectedCountry] = useState('');

//     const initialFormData = {
//         bio: { bio: '', experience: '', degree: '', is_fresher: 'fresher', exp_years: '', exp_months: '' },
//         social: { fb_profile: '', twitter_profile: '', gplus_profile: '', linkedin_profile: '' },
//         bank: { account_title: '', account_number: '', bank_name: '', ifsc_code: '', bank_branch: '' },
//         contact: { contact_full_name: '', contact_phone_no: '', contact_phone_no_2: '', contact_email: '', contact_address: '', relationship: '' },
//         other: { uan_number: '', pf_no: '', esic_no: '', pan_no: '', aadhar_no: '', passport_no: '', vehicle_no: '', driving_licence_no: '' },
//         policeStation: { police_station_address: '', police_station_state: '', police_station_state_id: null, police_station_district: '', police_station_village: '', police_station_pincode: '' }
//     };
    
//     const [formData, setFormData] = useState(initialFormData);

//     // API Type mapping
//     const getApiType = (index) => {
//         switch(index) {
//             case 0: return 1; // Bio
//             case 1: return 3; // Bank
//             case 2: return 5; // Other/ID
//             case 3: return 4; // Contact
//             case 4: return 6; // Police
//             case 5: return 2; // Social
//             default: return 1;
//         }
//     };

//     // --- FETCH DATA ---
//     useEffect(() => {
//         const fetchCountries = async () => {
//             try {
//                 const res = await axiosInstance.get('/api/countries/');
//                 setCountries(res.data.data || []);
//             } catch (e) {}
//         };
//         fetchCountries();
//     }, []);

//     useEffect(() => {
//         if (!userId) return;
//         const fetchStepData = async () => {
//             setIsLoading(true);
//             const type = getApiType(activeStep);
//             try {
//                 const res = await axiosInstance.post('/api/personal_info/', { user_id: userId, type });
//                 const data = res.data.personal_details || {};
                
//                 setFormData(prev => {
//                     const newState = { ...prev };
//                     if (type === 1) newState.bio = { ...prev.bio, bio: data.bio || '', experience: data.experience || '' };
//                     else if (type === 2) newState.social = { fb_profile: data.fb_profile, twitter_profile: data.twitter_profile, linkedin_profile: data.linkedin_profile, gplus_profile: data.gplus_profile };
//                     else if (type === 3) newState.bank = { account_title: data.account_title, account_number: data.account_number, bank_name: data.bank_name, ifsc_code: data.ifsc_code, bank_branch: data.bank_branch };
//                     else if (type === 4) newState.contact = { 
//                         contact_full_name: data.contact_full_name, 
//                         contact_phone_no: data.contact_phone_no, 
//                         contact_phone_no_2: data.contact_phone_no_2, 
//                         contact_email: data.contact_email, 
//                         contact_address: data.contact_address,
//                         relationship: prev.contact.relationship 
//                     };
//                     else if (type === 5) newState.other = { uan_number: data.uan_number, pf_no: data.pf_no, esic_no: data.esic_no, pan_no: data.pan_no, aadhar_no: data.aadhar_no, passport_no: data.passport_no, vehicle_no: data.vehicle_no, driving_licence_no: data.driving_licence_no };
//                     else if (type === 6) {
//                         if (data.police_station_country) setSelectedCountry(data.police_station_country);
//                         newState.policeStation = { 
//                             police_station_address: data.police_station_address, 
//                             police_station_state: data.police_station_state, 
//                             police_station_state_id: data.police_station_state_id, 
//                             police_station_district: data.police_station_district,
//                             police_station_village: data.police_station_village,
//                             police_station_pincode: data.police_station_pincode
//                         };
//                     }
//                     return newState;
//                 });
//             } catch (err) { console.error(err); } 
//             finally { setIsLoading(false); }
//         };
//         fetchStepData();
//     }, [activeStep, userId]);

//     // Fetch States when Country changes
//     useEffect(() => {
//         if (selectedCountry) {
//             axiosInstance.get(`/api/states/?country_name=${selectedCountry}`)
//                 .then(res => setStates(res.data.data || []))
//                 .catch(() => {});
//         }
//     }, [selectedCountry]);

//     const handleChange = (section, field, value) => {
//         setFormData(prev => ({ ...prev, [section]: { ...prev[section], [field]: value } }));
//     };

//     // --- SAVE LOGIC ---
//     const handleSaveStep = async () => {
//         const type = getApiType(activeStep);
//         let payload = { user_id: userId, type };
        
//         // Construct payload
//         if (activeStep === 0) payload = { ...payload, ...formData.bio };
//         else if (activeStep === 1) payload = { ...payload, ...formData.bank };
//         else if (activeStep === 2) {
//             const d = formData.other;
//             payload = { 
//                 ...payload, 
//                 uan_number: d.uan_number, pf_number: d.pf_no, esic_number: d.esic_no, 
//                 pan_number: d.pan_no, aadhar_number: d.aadhar_no, passport_number: d.passport_no, 
//                 vehicle_number: d.vehicle_no, driving_licence_number: d.driving_licence_no 
//             };
//         } else if (activeStep === 3) payload = { ...payload, ...formData.contact };
//         else if (activeStep === 4) {
//             payload = { ...payload, ...formData.policeStation };
//             payload.police_station_state = formData.policeStation.police_station_state_id;
//         } else if (activeStep === 5) payload = { ...payload, ...formData.social };

//         try {
//             Swal.showLoading();
//             await axiosInstance.patch('/api/personal_info/', payload);
//             Swal.close();
            
//             if (activeStep < steps.length - 1) {
//                 setActiveStep(prev => prev + 1);
//             } else {
//                 if(onNext) onNext();
//             }
//         } catch (err) {
//             Swal.fire("Error", "Failed to save details.", "error");
//         }
//     };

//     const handleInternalBack = () => {
//         if (activeStep > 0) {
//             setActiveStep(prev => prev - 1);
//         } else {
//             if(onBack) onBack();
//         }
//     };

//     // --- RENDER FORMS ---
//     const renderForm = () => {
//         if(isLoading) return <Box display="flex" justifyContent="center" p={4}><CircularProgress sx={{ color: PRIMARY_COLOR }} /></Box>;

//         switch(activeStep) {
//             case 0: // Professional
//                 return (
//                     <Grid container spacing={3} maxWidth={900} mx="auto">
//                         <Grid item xs={12}><TextField fullWidth label="Bio / Summary" multiline rows={3} value={formData.bio.bio} onChange={(e) => handleChange('bio', 'bio', e.target.value)} /></Grid>
//                         <Grid item xs={12} sm={6}><TextField fullWidth label="Education Degree" value={formData.bio.degree} onChange={(e) => handleChange('bio', 'degree', e.target.value)} /></Grid>
//                         <Grid item xs={12} sm={6}>
//                             <FormControl component="fieldset" sx={{ ml: 1 }}>
//                                 <FormLabel component="legend" sx={{ fontSize: '0.875rem' }}>Experience Type</FormLabel>
//                                 <RadioGroup row value={formData.bio.is_fresher} onChange={(e) => handleChange('bio', 'is_fresher', e.target.value)}>
//                                     <FormControlLabel value="fresher" control={<Radio sx={{color: PRIMARY_COLOR, '&.Mui-checked': {color: PRIMARY_COLOR}}} />} label="Fresher" />
//                                     <FormControlLabel value="experienced" control={<Radio sx={{color: PRIMARY_COLOR, '&.Mui-checked': {color: PRIMARY_COLOR}}} />} label="Experienced" />
//                                 </RadioGroup>
//                             </FormControl>
//                         </Grid>
//                         {formData.bio.is_fresher === 'experienced' && (
//                             <>
//                                 <Grid item xs={6}><TextField fullWidth label="Years" type="number" value={formData.bio.exp_years} onChange={(e) => handleChange('bio', 'exp_years', e.target.value)} /></Grid>
//                                 <Grid item xs={6}><TextField fullWidth label="Months" type="number" value={formData.bio.exp_months} onChange={(e) => handleChange('bio', 'exp_months', e.target.value)} /></Grid>
//                             </>
//                         )}
//                         <Grid item xs={12}>
//                             <TextField select fullWidth label="Total Experience (Legacy)" value={formData.bio.experience} onChange={(e)=>handleChange('bio', 'experience', e.target.value)}>
//                                 {Array.from({length:30}, (_,i)=> <MenuItem key={i} value={i+1}>{i+1} Years</MenuItem>)}
//                             </TextField>
//                         </Grid>
//                     </Grid>
//                 );
//             case 1: // Bank
//                 return (
//                     <Grid container spacing={3} maxWidth={900} mx="auto">
//                          <Grid item xs={12} sm={6}><TextField fullWidth label="Account Holder" value={formData.bank.account_title} onChange={(e)=>handleChange('bank','account_title',e.target.value)} /></Grid>
//                          <Grid item xs={12} sm={6}><TextField fullWidth label="Account Number" value={formData.bank.account_number} onChange={(e)=>handleChange('bank','account_number',e.target.value)} /></Grid>
//                          <Grid item xs={12} sm={6}><TextField fullWidth label="Bank Name" value={formData.bank.bank_name} onChange={(e)=>handleChange('bank','bank_name',e.target.value)} /></Grid>
//                          <Grid item xs={12} sm={6}><TextField fullWidth label="IFSC Code" value={formData.bank.ifsc_code} onChange={(e)=>handleChange('bank','ifsc_code',e.target.value)} /></Grid>
//                          <Grid item xs={12}><TextField fullWidth label="Branch" value={formData.bank.bank_branch} onChange={(e)=>handleChange('bank','bank_branch',e.target.value)} /></Grid>
//                     </Grid>
//                 );
//             case 2: // ID
//                 return (
//                     <Grid container spacing={3} maxWidth={900} mx="auto">
//                         <Grid item xs={12} sm={6}><TextField fullWidth label="PAN No" value={formData.other.pan_no} onChange={(e)=>handleChange('other','pan_no',e.target.value)} /></Grid>
//                         <Grid item xs={12} sm={6}><TextField fullWidth label="Aadhar No" value={formData.other.aadhar_no} onChange={(e)=>handleChange('other','aadhar_no',e.target.value)} /></Grid>
//                         <Grid item xs={12} sm={6}><TextField fullWidth label="UAN" value={formData.other.uan_number} onChange={(e)=>handleChange('other','uan_number',e.target.value)} /></Grid>
//                         <Grid item xs={12} sm={6}><TextField fullWidth label="PF No" value={formData.other.pf_no} onChange={(e)=>handleChange('other','pf_no',e.target.value)} /></Grid>
//                         <Grid item xs={12} sm={6}><TextField fullWidth label="ESIC No" value={formData.other.esic_no} onChange={(e)=>handleChange('other','esic_no',e.target.value)} /></Grid>
//                     </Grid>
//                 );
//             case 3: // Emergency
//                 return (
//                     <Grid container spacing={3} maxWidth={900} mx="auto">
//                         <Grid item xs={12}><TextField fullWidth label="Full Name" value={formData.contact.contact_full_name} onChange={(e)=>handleChange('contact','contact_full_name',e.target.value)} /></Grid>
//                         <Grid item xs={12}><TextField fullWidth label="Relationship" value={formData.contact.relationship} onChange={(e)=>handleChange('contact','relationship',e.target.value)} /></Grid>
//                         <Grid item xs={12} sm={6}><TextField fullWidth label="Phone 1" value={formData.contact.contact_phone_no} onChange={(e)=>handleChange('contact','contact_phone_no',e.target.value)} /></Grid>
//                         <Grid item xs={12} sm={6}><TextField fullWidth label="Phone 2" value={formData.contact.contact_phone_no_2} onChange={(e)=>handleChange('contact','contact_phone_no_2',e.target.value)} /></Grid>
//                         <Grid item xs={12}><TextField fullWidth label="Address" value={formData.contact.contact_address} onChange={(e)=>handleChange('contact','contact_address',e.target.value)} /></Grid>
//                     </Grid>
//                 );
//             case 4: // Police
//                 return (
//                     <Grid container spacing={3} maxWidth={900} mx="auto">
//                         <Grid item xs={12}><TextField fullWidth label="Station Address" value={formData.policeStation.police_station_address} onChange={(e)=>handleChange('policeStation','police_station_address',e.target.value)} /></Grid>
//                         <Grid item xs={12} sm={6}>
//                             <TextField select fullWidth label="Country" value={selectedCountry} onChange={(e)=>setSelectedCountry(e.target.value)}>
//                                 {countries.map(c => <MenuItem key={c.country_id} value={c.country_name}>{c.country_name}</MenuItem>)}
//                             </TextField>
//                         </Grid>
//                         <Grid item xs={12} sm={6}>
//                             <TextField select fullWidth label="State" value={formData.policeStation.police_station_state} onChange={(e) => {
//                                 const s = states.find(st=>st.state_name === e.target.value);
//                                 setFormData(prev=>({...prev, policeStation: {...prev.policeStation, police_station_state: e.target.value, police_station_state_id: s?.state_id}}));
//                             }}>
//                                 {states.map(s=><MenuItem key={s.state_id} value={s.state_name}>{s.state_name}</MenuItem>)}
//                             </TextField>
//                         </Grid>
//                         <Grid item xs={12} sm={6}><TextField fullWidth label="District" value={formData.policeStation.police_station_district} onChange={(e)=>handleChange('policeStation','police_station_district',e.target.value)} /></Grid>
//                         <Grid item xs={12} sm={6}><TextField fullWidth label="Pincode" value={formData.policeStation.police_station_pincode} onChange={(e)=>handleChange('policeStation','police_station_pincode',e.target.value)} /></Grid>
//                     </Grid>
//                 );
//             case 5: // Social
//                 return (
//                     <Box maxWidth={600} mx="auto">
//                         <TextField fullWidth label="Facebook" sx={{mb:3}} value={formData.social.fb_profile} onChange={(e)=>handleChange('social','fb_profile',e.target.value)} InputProps={{startAdornment: <Facebook color="primary" sx={{mr:1}}/>}} />
//                         <TextField fullWidth label="Twitter" sx={{mb:3}} value={formData.social.twitter_profile} onChange={(e)=>handleChange('social','twitter_profile',e.target.value)} InputProps={{startAdornment: <Twitter color="primary" sx={{mr:1}}/>}} />
//                         <TextField fullWidth label="LinkedIn" sx={{mb:3}} value={formData.social.linkedin_profile} onChange={(e)=>handleChange('social','linkedin_profile',e.target.value)} InputProps={{startAdornment: <LinkedIn color="primary" sx={{mr:1}}/>}} />
//                         <TextField fullWidth label="Google Plus" sx={{mb:3}} value={formData.social.gplus_profile} onChange={(e)=>handleChange('social','gplus_profile',e.target.value)} InputProps={{startAdornment: <Google color="primary" sx={{mr:1}}/>}} />
//                     </Box>
//                 );
//             default: return null;
//         }
//     };

//     return (
//         <Box sx={{ p: 2 }}>
//             {/* CLICKABLE INTERNAL STEPPER WITH PURPLE THEME */}
//             <Stepper activeStep={activeStep} alternativeLabel nonLinear sx={{ 
//                 mb: 5,
//                 '& .MuiStepConnector-line': { borderColor: '#e0e0e0' },
//                 '& .MuiStepIcon-root': { color: '#ccc' },
//                 '& .MuiStepIcon-root.Mui-active': { color: PRIMARY_COLOR },
//                 '& .MuiStepIcon-root.Mui-completed': { color: PRIMARY_COLOR },
//                 '& .MuiStepLabel-label': { fontWeight: 500 },
//                 '& .MuiStepLabel-label.Mui-active': { color: PRIMARY_COLOR, fontWeight: 700 }
//             }}>
//                 {steps.map((label, index) => (
//                     <Step key={label}>
//                         <StepButton onClick={() => setActiveStep(index)}>
//                             {label}
//                         </StepButton>
//                     </Step>
//                 ))}
//             </Stepper>
            
//             <Paper elevation={0} sx={{ mt: 2, minHeight: '300px', p: 2, border: '1px solid #f0f0f0', borderRadius: 2 }}>
//                 <Typography variant="h6" gutterBottom color={PRIMARY_COLOR} fontWeight="bold" sx={{borderBottom: `2px solid ${PRIMARY_COLOR}`, display:'inline-block', mb: 3}}>
//                     {steps[activeStep]}
//                 </Typography>
                
//                 {renderForm()}
                
//                 <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 5 }}>
//                     <Button 
//                         onClick={handleInternalBack} 
//                         variant="outlined" 
//                         sx={{ 
//                             borderRadius: '8px', 
//                             borderColor: '#ccc', 
//                             color: '#555', 
//                             '&:hover': { borderColor: PRIMARY_COLOR, color: PRIMARY_COLOR } 
//                         }}
//                     >
//                         Back
//                     </Button>
//                     <Button 
//                         variant="contained" 
//                         onClick={handleSaveStep} 
//                         sx={{ 
//                             background: GRADIENT_BTN, 
//                             color: 'white', 
//                             borderRadius: '8px',
//                             px: 3
//                         }}
//                     >
//                         {activeStep === steps.length - 1 ? "Save & Next" : "Save & Next"}
//                     </Button>
//                 </Box>
//             </Paper>
//         </Box>
//     );
// };
// export default PersonalInformation;


// import React, { useEffect, useState, useContext } from 'react';
// import { 
//     Box, Typography, TextField, MenuItem, Button, Grid, CircularProgress, 
//     Stepper, Step, StepButton, FormControl, FormLabel, RadioGroup, 
//     FormControlLabel, Radio, Paper, InputAdornment, FormHelperText
// } from '@mui/material';
// import { Facebook, Twitter, LinkedIn, Google } from '@mui/icons-material';
// import axiosInstance from '../../utils/axiosInstance';
// import { EmployeeContext } from './EmployeeContext';
// import Swal from 'sweetalert2';

// // --- THEME COLORS ---
// const PRIMARY_COLOR = "#8C257C"; // Purple
// const GRADIENT_BTN = `linear-gradient(135deg, ${PRIMARY_COLOR} 0%, #6d1d60 100%)`;

// const PersonalInformation = ({ onNext, onBack }) => {
//     const { employeeId } = useContext(EmployeeContext);
//     const userId = employeeId;
    
//     const steps = [
//         "Professional Information", 
//         "Bank Account", 
//         "Identification Details", 
//         "Emergency Contact", 
//         "Police Station", 
//         "Social Profile"
//     ];
    
//     const [activeStep, setActiveStep] = useState(0);
//     const [isLoading, setIsLoading] = useState(false);
    
//     // Validation State
//     const [errors, setErrors] = useState({});

//     // States for Dropdowns
//     const [countries, setCountries] = useState([]);
//     const [states, setStates] = useState([]);
//     const [selectedCountry, setSelectedCountry] = useState('');

//     const initialFormData = {
//         bio: { bio: '', experience: '', degree: '', is_fresher: 'fresher', exp_years: '', exp_months: '' },
//         social: { fb_profile: '', twitter_profile: '', gplus_profile: '', linkedin_profile: '' },
//         bank: { account_title: '', account_number: '', bank_name: '', ifsc_code: '', bank_branch: '' },
//         contact: { contact_full_name: '', contact_phone_no: '', contact_phone_no_2: '', contact_email: '', contact_address: '', relationship: '' },
//         other: { uan_number: '', pf_no: '', esic_no: '', pan_no: '', aadhar_no: '', passport_no: '', vehicle_no: '', driving_licence_no: '' },
//         policeStation: { police_station_address: '', police_station_state: '', police_station_state_id: null, police_station_district: '', police_station_village: '', police_station_pincode: '' }
//     };
    
//     const [formData, setFormData] = useState(initialFormData);

//     // API Type mapping
//     const getApiType = (index) => {
//         switch(index) {
//             case 0: return 1; // Bio
//             case 1: return 3; // Bank
//             case 2: return 5; // Other/ID
//             case 3: return 4; // Contact
//             case 4: return 6; // Police
//             case 5: return 2; // Social
//             default: return 1;
//         }
//     };

//     // --- FETCH DATA ---
//     useEffect(() => {
//         const fetchCountries = async () => {
//             try {
//                 const res = await axiosInstance.get('/api/countries/');
//                 setCountries(res.data.data || []);
//             } catch (e) {}
//         };
//         fetchCountries();
//     }, []);

//     useEffect(() => {
//         if (!userId) return;
//         const fetchStepData = async () => {
//             setIsLoading(true);
//             const type = getApiType(activeStep);
//             try {
//                 const res = await axiosInstance.post('/api/personal_info/', { user_id: userId, type });
//                 const data = res.data.personal_details || {};
                
//                 setFormData(prev => {
//                     const newState = { ...prev };
//                     if (type === 1) newState.bio = { ...prev.bio, bio: data.bio || '', experience: data.experience || '' };
//                     else if (type === 2) newState.social = { fb_profile: data.fb_profile, twitter_profile: data.twitter_profile, linkedin_profile: data.linkedin_profile, gplus_profile: data.gplus_profile };
//                     else if (type === 3) newState.bank = { account_title: data.account_title, account_number: data.account_number, bank_name: data.bank_name, ifsc_code: data.ifsc_code, bank_branch: data.bank_branch };
//                     else if (type === 4) newState.contact = { 
//                         contact_full_name: data.contact_full_name, 
//                         contact_phone_no: data.contact_phone_no, 
//                         contact_phone_no_2: data.contact_phone_no_2, 
//                         contact_email: data.contact_email, 
//                         contact_address: data.contact_address,
//                         relationship: prev.contact.relationship 
//                     };
//                     else if (type === 5) newState.other = { uan_number: data.uan_number, pf_no: data.pf_no, esic_no: data.esic_no, pan_no: data.pan_no, aadhar_no: data.aadhar_no, passport_no: data.passport_no, vehicle_no: data.vehicle_no, driving_licence_no: data.driving_licence_no };
//                     else if (type === 6) {
//                         if (data.police_station_country) setSelectedCountry(data.police_station_country);
//                         newState.policeStation = { 
//                             police_station_address: data.police_station_address, 
//                             police_station_state: data.police_station_state, 
//                             police_station_state_id: data.police_station_state_id, 
//                             police_station_district: data.police_station_district,
//                             police_station_village: data.police_station_village,
//                             police_station_pincode: data.police_station_pincode
//                         };
//                     }
//                     return newState;
//                 });
//             } catch (err) { console.error(err); } 
//             finally { setIsLoading(false); }
//         };
//         fetchStepData();
//     }, [activeStep, userId]);

//     // Fetch States when Country changes
//     useEffect(() => {
//         if (selectedCountry) {
//             axiosInstance.get(`/api/states/?country_name=${selectedCountry}`)
//                 .then(res => setStates(res.data.data || []))
//                 .catch(() => {});
//         }
//     }, [selectedCountry]);

//     const handleChange = (section, field, value) => {
//         setFormData(prev => ({ ...prev, [section]: { ...prev[section], [field]: value } }));
//         // Clear error when user types
//         if (errors[field]) {
//             setErrors(prev => ({ ...prev, [field]: false }));
//         }
//     };

//     // --- VALIDATION LOGIC ---
//     const validateStep = () => {
//         const newErrors = {};
//         let isValid = true;

//         const checkField = (field, value, section) => {
//             if (!value || value.toString().trim() === '') {
//                 newErrors[field] = true;
//                 isValid = false;
//             }
//         };

//         if (activeStep === 0) { // Professional
//             checkField('bio', formData.bio.bio);
//             checkField('degree', formData.bio.degree);
//             checkField('experience', formData.bio.experience);
            
//             if (formData.bio.is_fresher === 'experienced') {
//                 checkField('exp_years', formData.bio.exp_years);
//                 checkField('exp_months', formData.bio.exp_months);
//             }
//         } 
//         else if (activeStep === 1) { // Bank
//             checkField('account_title', formData.bank.account_title);
//             checkField('account_number', formData.bank.account_number);
//             checkField('bank_name', formData.bank.bank_name);
//             checkField('ifsc_code', formData.bank.ifsc_code); // IFSC
//             checkField('bank_branch', formData.bank.bank_branch);
//         } 
//         else if (activeStep === 2) { // ID
//             checkField('pan_no', formData.other.pan_no);
//             checkField('aadhar_no', formData.other.aadhar_no);
//             checkField('uan_number', formData.other.uan_number);
//             checkField('pf_no', formData.other.pf_no);
//             checkField('esic_no', formData.other.esic_no);
//         } 
//         else if (activeStep === 3) { // Emergency
//             checkField('contact_full_name', formData.contact.contact_full_name);
//             checkField('relationship', formData.contact.relationship);
//             checkField('contact_phone_no', formData.contact.contact_phone_no);
//             checkField('contact_phone_no_2', formData.contact.contact_phone_no_2);
//             checkField('contact_address', formData.contact.contact_address);
//         } 
//         else if (activeStep === 4) { // Police
//             checkField('police_station_address', formData.policeStation.police_station_address);
//             checkField('police_station_district', formData.policeStation.police_station_district);
//             checkField('police_station_pincode', formData.policeStation.police_station_pincode);
            
//             if (!selectedCountry) { newErrors['country'] = true; isValid = false; }
//             if (!formData.policeStation.police_station_state) { newErrors['state'] = true; isValid = false; }
//         } 
//         else if (activeStep === 5) { // Social
//             checkField('fb_profile', formData.social.fb_profile);
//             checkField('twitter_profile', formData.social.twitter_profile);
//             checkField('linkedin_profile', formData.social.linkedin_profile);
//             checkField('gplus_profile', formData.social.gplus_profile);
//         }

//         setErrors(newErrors);

//         if (!isValid) {
//             Swal.fire({
//                 icon: 'error',
//                 title: 'Incomplete Details',
//                 text: 'Please fill all the required fields before continuing.',
//                 confirmButtonColor: PRIMARY_COLOR
//             });
//             // Scroll to the first error
//             setTimeout(() => {
//                 const errorElement = document.querySelector('.Mui-error');
//                 if (errorElement) {
//                     errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
//                 }
//             }, 100);
//         }

//         return isValid;
//     };

//     // --- SAVE LOGIC ---
//     const handleSaveStep = async () => {
//         if (!validateStep()) return;

//         const type = getApiType(activeStep);
//         let payload = { user_id: userId, type };
        
//         // Construct payload
//         if (activeStep === 0) payload = { ...payload, ...formData.bio };
//         else if (activeStep === 1) payload = { ...payload, ...formData.bank };
//         else if (activeStep === 2) {
//             const d = formData.other;
//             payload = { 
//                 ...payload, 
//                 uan_number: d.uan_number, pf_number: d.pf_no, esic_number: d.esic_no, 
//                 pan_number: d.pan_no, aadhar_number: d.aadhar_no, passport_number: d.passport_no, 
//                 vehicle_number: d.vehicle_no, driving_licence_number: d.driving_licence_no 
//             };
//         } else if (activeStep === 3) payload = { ...payload, ...formData.contact };
//         else if (activeStep === 4) {
//             payload = { ...payload, ...formData.policeStation };
//             payload.police_station_state = formData.policeStation.police_station_state_id;
//         } else if (activeStep === 5) payload = { ...payload, ...formData.social };

//         try {
//             Swal.showLoading();
//             await axiosInstance.patch('/api/personal_info/', payload);
//             Swal.close();
            
//             if (activeStep < steps.length - 1) {
//                 setActiveStep(prev => prev + 1);
//                 setErrors({}); // Clear errors for next step
//             } else {
//                 if(onNext) onNext();
//             }
//         } catch (err) {
//             Swal.fire("Error", "Failed to save details.", "error");
//         }
//     };

//     // Handle clicking stepper icons directly
//     const handleStepClick = (index) => {
//         // Only allow moving backward without validation, 
//         // OR allow moving forward only if current step is valid.
//         if (index < activeStep) {
//             setActiveStep(index);
//             setErrors({});
//         } else if (index > activeStep) {
//             // Must validate current step before moving forward
//             if (validateStep()) {
//                 // Ideally, we should save before moving, but if just navigating:
//                 setActiveStep(index);
//                 setErrors({});
//             }
//         }
//     };

//     const handleInternalBack = () => {
//         setErrors({});
//         if (activeStep > 0) {
//             setActiveStep(prev => prev - 1);
//         } else {
//             if(onBack) onBack();
//         }
//     };

//     // --- RENDER FORMS ---
//     const renderForm = () => {
//         if(isLoading) return <Box display="flex" justifyContent="center" p={4}><CircularProgress sx={{ color: PRIMARY_COLOR }} /></Box>;

//         switch(activeStep) {
//             case 0: // Professional
//                 return (
//                     <Grid container spacing={3}>
//                         <Grid item xs={12}>
//                             <TextField fullWidth label="Bio / Summary" multiline rows={3} value={formData.bio.bio} onChange={(e) => handleChange('bio', 'bio', e.target.value)} error={!!errors.bio} />
//                         </Grid>
//                         <Grid item xs={12} sm={6}>
//                             <TextField fullWidth label="Education Degree" value={formData.bio.degree} onChange={(e) => handleChange('bio', 'degree', e.target.value)} error={!!errors.degree} />
//                         </Grid>
//                         <Grid item xs={12} sm={6}>
//                             <FormControl component="fieldset" sx={{ ml: 1 }}>
//                                 <FormLabel component="legend" sx={{ fontSize: '0.875rem' }}>Experience Type</FormLabel>
//                                 <RadioGroup row value={formData.bio.is_fresher} onChange={(e) => handleChange('bio', 'is_fresher', e.target.value)}>
//                                     <FormControlLabel value="fresher" control={<Radio sx={{color: PRIMARY_COLOR, '&.Mui-checked': {color: PRIMARY_COLOR}}} />} label="Fresher" />
//                                     <FormControlLabel value="experienced" control={<Radio sx={{color: PRIMARY_COLOR, '&.Mui-checked': {color: PRIMARY_COLOR}}} />} label="Experienced" />
//                                 </RadioGroup>
//                             </FormControl>
//                         </Grid>
//                         {formData.bio.is_fresher === 'experienced' && (
//                             <>
//                                 <Grid item xs={6}><TextField fullWidth label="Years" type="number" value={formData.bio.exp_years} onChange={(e) => handleChange('bio', 'exp_years', e.target.value)} error={!!errors.exp_years} /></Grid>
//                                 <Grid item xs={6}><TextField fullWidth label="Months" type="number" value={formData.bio.exp_months} onChange={(e) => handleChange('bio', 'exp_months', e.target.value)} error={!!errors.exp_months} /></Grid>
//                             </>
//                         )}
//                         <Grid item xs={12}>
//                             <TextField select fullWidth label="Total Experience (Legacy)" value={formData.bio.experience} onChange={(e)=>handleChange('bio', 'experience', e.target.value)} error={!!errors.experience}>
//                                 {Array.from({length:30}, (_,i)=> <MenuItem key={i} value={i+1}>{i+1} Years</MenuItem>)}
//                             </TextField>
//                         </Grid>
//                     </Grid>
//                 );
//             case 1: // Bank
//                 return (
//                     <Grid container spacing={3}>
//                          <Grid item xs={12} sm={6}><TextField fullWidth label="Account Holder" value={formData.bank.account_title} onChange={(e)=>handleChange('bank','account_title',e.target.value)} error={!!errors.account_title} /></Grid>
//                          <Grid item xs={12} sm={6}><TextField fullWidth label="Account Number" value={formData.bank.account_number} onChange={(e)=>handleChange('bank','account_number',e.target.value)} error={!!errors.account_number} /></Grid>
//                          <Grid item xs={12} sm={6}><TextField fullWidth label="Bank Name" value={formData.bank.bank_name} onChange={(e)=>handleChange('bank','bank_name',e.target.value)} error={!!errors.bank_name} /></Grid>
//                          <Grid item xs={12} sm={6}><TextField fullWidth label="IFSC Code" value={formData.bank.ifsc_code} onChange={(e)=>handleChange('bank','ifsc_code',e.target.value)} error={!!errors.ifsc_code} /></Grid>
//                          <Grid item xs={12}><TextField fullWidth label="Branch" value={formData.bank.bank_branch} onChange={(e)=>handleChange('bank','bank_branch',e.target.value)} error={!!errors.bank_branch} /></Grid>
//                     </Grid>
//                 );
//             case 2: // ID
//                 return (
//                     <Grid container spacing={3}>
//                         <Grid item xs={12} sm={6}><TextField fullWidth label="PAN No" value={formData.other.pan_no} onChange={(e)=>handleChange('other','pan_no',e.target.value)} error={!!errors.pan_no} /></Grid>
//                         <Grid item xs={12} sm={6}><TextField fullWidth label="Aadhar No" value={formData.other.aadhar_no} onChange={(e)=>handleChange('other','aadhar_no',e.target.value)} error={!!errors.aadhar_no} /></Grid>
//                         <Grid item xs={12} sm={6}><TextField fullWidth label="UAN" value={formData.other.uan_number} onChange={(e)=>handleChange('other','uan_number',e.target.value)} error={!!errors.uan_number} /></Grid>
//                         <Grid item xs={12} sm={6}><TextField fullWidth label="PF No" value={formData.other.pf_no} onChange={(e)=>handleChange('other','pf_no',e.target.value)} error={!!errors.pf_no} /></Grid>
//                         <Grid item xs={12} sm={6}><TextField fullWidth label="ESIC No" value={formData.other.esic_no} onChange={(e)=>handleChange('other','esic_no',e.target.value)} error={!!errors.esic_no} /></Grid>
//                     </Grid>
//                 );
//             case 3: // Emergency
//                 return (
//                     <Grid container spacing={3}>
//                         <Grid item xs={12}><TextField fullWidth label="Full Name" value={formData.contact.contact_full_name} onChange={(e)=>handleChange('contact','contact_full_name',e.target.value)} error={!!errors.contact_full_name} /></Grid>
//                         <Grid item xs={12}><TextField fullWidth label="Relationship" value={formData.contact.relationship} onChange={(e)=>handleChange('contact','relationship',e.target.value)} error={!!errors.relationship} /></Grid>
//                         <Grid item xs={12} sm={6}><TextField fullWidth label="Phone 1" value={formData.contact.contact_phone_no} onChange={(e)=>handleChange('contact','contact_phone_no',e.target.value)} error={!!errors.contact_phone_no} /></Grid>
//                         <Grid item xs={12} sm={6}><TextField fullWidth label="Phone 2" value={formData.contact.contact_phone_no_2} onChange={(e)=>handleChange('contact','contact_phone_no_2',e.target.value)} error={!!errors.contact_phone_no_2} /></Grid>
//                         <Grid item xs={12}><TextField fullWidth label="Address" value={formData.contact.contact_address} onChange={(e)=>handleChange('contact','contact_address',e.target.value)} error={!!errors.contact_address} /></Grid>
//                     </Grid>
//                 );
//             case 4: // Police
//                 return (
//                     <Grid container spacing={3}>
//                         <Grid item xs={12}><TextField fullWidth label="Station Address" value={formData.policeStation.police_station_address} onChange={(e)=>handleChange('policeStation','police_station_address',e.target.value)} error={!!errors.police_station_address} /></Grid>
//                         <Grid item xs={12} sm={6}>
//                             <TextField select fullWidth label="Country" value={selectedCountry} error={!!errors.country} onChange={(e)=>{
//                                 setSelectedCountry(e.target.value);
//                                 setErrors(prev => ({ ...prev, country: false }));
//                             }}>
//                                 {countries.map(c => <MenuItem key={c.country_id} value={c.country_name}>{c.country_name}</MenuItem>)}
//                             </TextField>
//                         </Grid>
//                         <Grid item xs={12} sm={6}>
//                             <TextField select fullWidth label="State" value={formData.policeStation.police_station_state} error={!!errors.state} onChange={(e) => {
//                                 const s = states.find(st=>st.state_name === e.target.value);
//                                 setFormData(prev=>({...prev, policeStation: {...prev.policeStation, police_station_state: e.target.value, police_station_state_id: s?.state_id}}));
//                                 setErrors(prev => ({ ...prev, state: false }));
//                             }}>
//                                 {states.map(s=><MenuItem key={s.state_id} value={s.state_name}>{s.state_name}</MenuItem>)}
//                             </TextField>
//                         </Grid>
//                         <Grid item xs={12} sm={6}><TextField fullWidth label="District" value={formData.policeStation.police_station_district} onChange={(e)=>handleChange('policeStation','police_station_district',e.target.value)} error={!!errors.police_station_district} /></Grid>
//                         <Grid item xs={12} sm={6}><TextField fullWidth label="Pincode" value={formData.policeStation.police_station_pincode} onChange={(e)=>handleChange('policeStation','police_station_pincode',e.target.value)} error={!!errors.police_station_pincode} /></Grid>
//                     </Grid>
//                 );
//             case 5: // Social
//                 return (
//                     <Box sx={{ width: '100%' }}>
//                         <TextField 
//                             fullWidth 
//                             label="Facebook" 
//                             sx={{mb:3}} 
//                             value={formData.social.fb_profile} 
//                             onChange={(e)=>handleChange('social','fb_profile',e.target.value)} 
//                             error={!!errors.fb_profile}
//                             InputProps={{
//                                 startAdornment: (
//                                     <InputAdornment position="start">
//                                         <Facebook color="primary" />
//                                     </InputAdornment>
//                                 )
//                             }} 
//                         />
//                         <TextField 
//                             fullWidth 
//                             label="Twitter" 
//                             sx={{mb:3}} 
//                             value={formData.social.twitter_profile} 
//                             onChange={(e)=>handleChange('social','twitter_profile',e.target.value)} 
//                             error={!!errors.twitter_profile}
//                             InputProps={{
//                                 startAdornment: (
//                                     <InputAdornment position="start">
//                                         <Twitter color="primary" />
//                                     </InputAdornment>
//                                 )
//                             }} 
//                         />
//                         <TextField 
//                             fullWidth 
//                             label="LinkedIn" 
//                             sx={{mb:3}} 
//                             value={formData.social.linkedin_profile} 
//                             onChange={(e)=>handleChange('social','linkedin_profile',e.target.value)} 
//                             error={!!errors.linkedin_profile}
//                             InputProps={{
//                                 startAdornment: (
//                                     <InputAdornment position="start">
//                                         <LinkedIn color="primary" />
//                                     </InputAdornment>
//                                 )
//                             }} 
//                         />
//                         <TextField 
//                             fullWidth 
//                             label="Google Plus" 
//                             sx={{mb:3}} 
//                             value={formData.social.gplus_profile} 
//                             onChange={(e)=>handleChange('social','gplus_profile',e.target.value)} 
//                             error={!!errors.gplus_profile}
//                             InputProps={{
//                                 startAdornment: (
//                                     <InputAdornment position="start">
//                                         <Google color="primary" />
//                                     </InputAdornment>
//                                 )
//                             }} 
//                         />
//                     </Box>
//                 );
//             default: return null;
//         }
//     };

//     return (
//         <Box sx={{ p: 2 }}>
//             {/* CLICKABLE INTERNAL STEPPER */}
//             <Stepper activeStep={activeStep} alternativeLabel nonLinear sx={{ 
//                 mb: 5,
//                 '& .MuiStepConnector-line': { borderColor: '#e0e0e0' },
//                 '& .MuiStepIcon-root': { color: '#ccc' },
//                 '& .MuiStepIcon-root.Mui-active': { color: PRIMARY_COLOR },
//                 '& .MuiStepIcon-root.Mui-completed': { color: PRIMARY_COLOR },
//                 '& .MuiStepLabel-label': { fontWeight: 500 },
//                 '& .MuiStepLabel-label.Mui-active': { color: PRIMARY_COLOR, fontWeight: 700 }
//             }}>
//                 {steps.map((label, index) => (
//                     <Step key={label}>
//                         <StepButton onClick={() => handleStepClick(index)}>
//                             {label}
//                         </StepButton>
//                     </Step>
//                 ))}
//             </Stepper>
            
//             <Paper elevation={0} sx={{ mt: 2, minHeight: '300px', p: 2, border: '1px solid #f0f0f0', borderRadius: 2 }}>
//                 <Typography variant="h6" gutterBottom color={PRIMARY_COLOR} fontWeight="bold" sx={{ mb: 3 }}>
//                     {steps[activeStep]}
//                 </Typography>
                
//                 {renderForm()}
                
//                 <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 5 }}>
//                     <Button 
//                         onClick={handleInternalBack} 
//                         variant="outlined" 
//                         sx={{ 
//                             borderRadius: '8px', 
//                             borderColor: '#ccc', 
//                             color: '#555', 
//                             '&:hover': { borderColor: PRIMARY_COLOR, color: PRIMARY_COLOR } 
//                         }}
//                     >
//                         Back
//                     </Button>
//                     <Button 
//                         variant="contained" 
//                         onClick={handleSaveStep} 
//                         sx={{ 
//                             background: GRADIENT_BTN, 
//                             color: 'white', 
//                             borderRadius: '8px',
//                             px: 3
//                         }}
//                     >
//                         {activeStep === steps.length - 1 ? "Save & Next" : "Save & Next"}
//                     </Button>
//                 </Box>
//             </Paper>
//         </Box>
//     );
// };
// export default PersonalInformation;



import React, { useEffect, useState, useContext } from 'react';
import { 
    Box, Typography, TextField, MenuItem, Button, Grid, CircularProgress, 
    Stepper, Step, StepButton, FormControl, FormLabel, RadioGroup, 
    FormControlLabel, Radio, Paper, InputAdornment, FormHelperText
} from '@mui/material';
import { Facebook, Twitter, LinkedIn, Google } from '@mui/icons-material';
import axiosInstance from '../../utils/axiosInstance';
import { EmployeeContext } from './EmployeeContext';
import Swal from 'sweetalert2';

const PRIMARY_COLOR = "#8C257C"; 
const GRADIENT_BTN = `linear-gradient(135deg, ${PRIMARY_COLOR} 0%, #6d1d60 100%)`;

const PersonalInformation = ({ onNext, onBack }) => {
    const { employeeId } = useContext(EmployeeContext);
    const userId = employeeId;
    
    const steps = [
        "Professional Information", 
        "Bank Account", 
        "Identification Details", 
        "Emergency Contact", 
        "Police Station", 
        "Social Profile"
    ];
    
    const [activeStep, setActiveStep] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    
    const [errors, setErrors] = useState({});

    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState('');

    const initialFormData = {
        bio: { bio: '', experience: '', degree: '', is_fresher: 'fresher', exp_years: '', exp_months: '' },
        social: { fb_profile: '', twitter_profile: '', gplus_profile: '', linkedin_profile: '' },
        bank: { account_title: '', account_number: '', bank_name: '', ifsc_code: '', bank_branch: '' },
        contact: { contact_full_name: '', contact_phone_no: '', contact_phone_no_2: '', contact_email: '', contact_address: '', relationship: '' },
        other: { uan_number: '', pf_no: '', esic_no: '', pan_no: '', aadhar_no: '', passport_no: '', vehicle_no: '', driving_licence_no: '' },
        policeStation: { police_station_address: '', police_station_state: '', police_station_state_id: null, police_station_district: '', police_station_village: '', police_station_pincode: '' }
    };
    
    const [formData, setFormData] = useState(initialFormData);

    const getApiType = (index) => {
        switch(index) {
            case 0: return 1; 
            case 1: return 3; 
            case 2: return 5; 
            case 3: return 4; 
            case 4: return 6; 
            case 5: return 2; 
            default: return 1;
        }
    };

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const res = await axiosInstance.get('/api/countries/');
                setCountries(res.data.data || []);
            } catch (e) {}
        };
        fetchCountries();
    }, []);

    useEffect(() => {
        if (!userId) return;
        const fetchStepData = async () => {
            setIsLoading(true);
            const type = getApiType(activeStep);
            try {
                const res = await axiosInstance.post('/api/personal_info/', { user_id: userId, type });
                const data = res.data.personal_details || {};
                
                setFormData(prev => {
                    const newState = { ...prev };
                    if (type === 1) newState.bio = { ...prev.bio, bio: data.bio || '', experience: data.experience || '' };
                    else if (type === 2) newState.social = { fb_profile: data.fb_profile, twitter_profile: data.twitter_profile, linkedin_profile: data.linkedin_profile, gplus_profile: data.gplus_profile };
                    else if (type === 3) newState.bank = { account_title: data.account_title, account_number: data.account_number, bank_name: data.bank_name, ifsc_code: data.ifsc_code, bank_branch: data.bank_branch };
                    else if (type === 4) newState.contact = { 
                        contact_full_name: data.contact_full_name, 
                        contact_phone_no: data.contact_phone_no, 
                        contact_phone_no_2: data.contact_phone_no_2, 
                        contact_email: data.contact_email, 
                        contact_address: data.contact_address,
                        relationship: prev.contact.relationship 
                    };
                    else if (type === 5) newState.other = { 
                        uan_number: data.uan_number, 
                        pf_no: data.pf_number, 
                        esic_no: data.esic_number, 
                        pan_no: data.pan_number, 
                        aadhar_no: data.aadhar_no, 
                        passport_no: data.passport_no, 
                        vehicle_no: data.vehicle_no, 
                        driving_licence_no: data.driving_licence_no 
                    };
                    else if (type === 6) {
                        if (data.police_station_country) setSelectedCountry(data.police_station_country);
                        newState.policeStation = { 
                            police_station_address: data.police_station_address, 
                            police_station_state: data.police_station_state, 
                            police_station_state_id: data.police_station_state_id, 
                            police_station_district: data.police_station_district,
                            police_station_village: data.police_station_village,
                            police_station_pincode: data.police_station_pincode
                        };
                    }
                    return newState;
                });
            } catch (err) { console.error(err); } 
            finally { setIsLoading(false); }
        };
        fetchStepData();
    }, [activeStep, userId]);

    useEffect(() => {
        if (selectedCountry) {
            axiosInstance.get(`/api/states/?country_name=${selectedCountry}`)
                .then(res => setStates(res.data.data || []))
                .catch(() => {});
        }
    }, [selectedCountry]);

    const handleChange = (section, field, value) => {
        setFormData(prev => ({ ...prev, [section]: { ...prev[section], [field]: value } }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: false }));
        }
    };

    const validateStep = () => {
        const newErrors = {};
        let isValid = true;

        const checkField = (field, value, section) => {
            if (!value || value.toString().trim() === '') {
                newErrors[field] = true;
                isValid = false;
            }
        };

        if (activeStep === 0) { 
            checkField('bio', formData.bio.bio);
            checkField('degree', formData.bio.degree);
            checkField('experience', formData.bio.experience);
            
            if (formData.bio.is_fresher === 'experienced') {
                checkField('exp_years', formData.bio.exp_years);
                checkField('exp_months', formData.bio.exp_months);
            }
        } 
        else if (activeStep === 1) { 
            checkField('account_title', formData.bank.account_title);
            checkField('account_number', formData.bank.account_number);
            checkField('bank_name', formData.bank.bank_name);
            checkField('ifsc_code', formData.bank.ifsc_code); 
            checkField('bank_branch', formData.bank.bank_branch);
        } 
        else if (activeStep === 2) { 
            checkField('pan_no', formData.other.pan_no);
            checkField('aadhar_no', formData.other.aadhar_no);
            checkField('uan_number', formData.other.uan_number);
            checkField('pf_no', formData.other.pf_no);
            checkField('esic_no', formData.other.esic_no);
        } 
        else if (activeStep === 3) { 
            checkField('contact_full_name', formData.contact.contact_full_name);
            checkField('relationship', formData.contact.relationship);
            checkField('contact_phone_no', formData.contact.contact_phone_no);
            checkField('contact_phone_no_2', formData.contact.contact_phone_no_2);
            checkField('contact_address', formData.contact.contact_address);
        } 
        else if (activeStep === 4) { 
            checkField('police_station_address', formData.policeStation.police_station_address);
            checkField('police_station_district', formData.policeStation.police_station_district);
            checkField('police_station_pincode', formData.policeStation.police_station_pincode);
            
            if (!selectedCountry) { newErrors['country'] = true; isValid = false; }
            if (!formData.policeStation.police_station_state) { newErrors['state'] = true; isValid = false; }
        } 
        else if (activeStep === 5) { 
            checkField('fb_profile', formData.social.fb_profile);
            checkField('twitter_profile', formData.social.twitter_profile);
            checkField('linkedin_profile', formData.social.linkedin_profile);
            checkField('gplus_profile', formData.social.gplus_profile);
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
                const errorElement = document.querySelector('.Mui-error');
                if (errorElement) {
                    errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }, 100);
        }

        return isValid;
    };

    const handleSaveStep = async () => {
        if (!validateStep()) return;

        const type = getApiType(activeStep);
        let payload = { user_id: userId, type };
        
        if (activeStep === 0) payload = { ...payload, ...formData.bio };
        else if (activeStep === 1) payload = { ...payload, ...formData.bank };
        else if (activeStep === 2) {
            const d = formData.other;
            payload = { 
                ...payload, 
                uan_number: d.uan_number, pf_number: d.pf_no, esic_number: d.esic_no, 
                pan_number: d.pan_no, aadhar_number: d.aadhar_no, passport_number: d.passport_no, 
                vehicle_number: d.vehicle_no, driving_licence_number: d.driving_licence_no 
            };
        } else if (activeStep === 3) payload = { ...payload, ...formData.contact };
        else if (activeStep === 4) {
            payload = { ...payload, ...formData.policeStation };
            payload.police_station_state = formData.policeStation.police_station_state_id;
        } else if (activeStep === 5) payload = { ...payload, ...formData.social };

        try {
            Swal.showLoading();
            await axiosInstance.patch('/api/personal_info/', payload);
            Swal.close();
            
            if (activeStep < steps.length - 1) {
                setActiveStep(prev => prev + 1);
                setErrors({}); 
            } else {
                if(onNext) onNext();
            }
        } catch (err) {
            Swal.fire("Error", "Failed to save details.", "error");
        }
    };

    const handleStepClick = (index) => {
        if (index < activeStep) {
            setActiveStep(index);
            setErrors({});
        } else if (index > activeStep) {
            if (validateStep()) {
                setActiveStep(index);
                setErrors({});
            }
        }
    };

    const handleInternalBack = () => {
        setErrors({});
        if (activeStep > 0) {
            setActiveStep(prev => prev - 1);
        } else {
            if(onBack) onBack();
        }
    };

    const renderForm = () => {
        if(isLoading) return <Box display="flex" justifyContent="center" p={4}><CircularProgress sx={{ color: PRIMARY_COLOR }} /></Box>;

        switch(activeStep) {
            case 0: 
                return (
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField fullWidth label="Bio / Summary" multiline rows={3} value={formData.bio.bio} onChange={(e) => handleChange('bio', 'bio', e.target.value)} error={!!errors.bio} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField fullWidth label="Education Degree" value={formData.bio.degree} onChange={(e) => handleChange('bio', 'degree', e.target.value)} error={!!errors.degree} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl component="fieldset" sx={{ ml: 1 }}>
                                <FormLabel component="legend" sx={{ fontSize: '0.875rem' }}>Experience Type</FormLabel>
                                <RadioGroup row value={formData.bio.is_fresher} onChange={(e) => handleChange('bio', 'is_fresher', e.target.value)}>
                                    <FormControlLabel value="fresher" control={<Radio sx={{color: PRIMARY_COLOR, '&.Mui-checked': {color: PRIMARY_COLOR}}} />} label="Fresher" />
                                    <FormControlLabel value="experienced" control={<Radio sx={{color: PRIMARY_COLOR, '&.Mui-checked': {color: PRIMARY_COLOR}}} />} label="Experienced" />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        {formData.bio.is_fresher === 'experienced' && (
                            <>
                                <Grid item xs={6}><TextField fullWidth label="Years" type="number" value={formData.bio.exp_years} onChange={(e) => handleChange('bio', 'exp_years', e.target.value)} error={!!errors.exp_years} /></Grid>
                                <Grid item xs={6}><TextField fullWidth label="Months" type="number" value={formData.bio.exp_months} onChange={(e) => handleChange('bio', 'exp_months', e.target.value)} error={!!errors.exp_months} /></Grid>
                            </>
                        )}
                        <Grid item xs={12}>
                            <TextField select fullWidth label="Total Experience (Legacy)" value={formData.bio.experience} onChange={(e)=>handleChange('bio', 'experience', e.target.value)} error={!!errors.experience}>
                                {Array.from({length:30}, (_,i)=> <MenuItem key={i} value={i+1}>{i+1} Years</MenuItem>)}
                            </TextField>
                        </Grid>
                    </Grid>
                );
            case 1: 
                return (
                    <Grid container spacing={3}>
                         <Grid item xs={12} sm={6}><TextField fullWidth label="Account Holder" value={formData.bank.account_title} onChange={(e)=>handleChange('bank','account_title',e.target.value)} error={!!errors.account_title} /></Grid>
                         <Grid item xs={12} sm={6}><TextField fullWidth label="Account Number" value={formData.bank.account_number} onChange={(e)=>handleChange('bank','account_number',e.target.value)} error={!!errors.account_number} /></Grid>
                         <Grid item xs={12} sm={6}><TextField fullWidth label="Bank Name" value={formData.bank.bank_name} onChange={(e)=>handleChange('bank','bank_name',e.target.value)} error={!!errors.bank_name} /></Grid>
                         <Grid item xs={12} sm={6}><TextField fullWidth label="IFSC Code" value={formData.bank.ifsc_code} onChange={(e)=>handleChange('bank','ifsc_code',e.target.value)} error={!!errors.ifsc_code} /></Grid>
                         <Grid item xs={12}><TextField fullWidth label="Branch" value={formData.bank.bank_branch} onChange={(e)=>handleChange('bank','bank_branch',e.target.value)} error={!!errors.bank_branch} /></Grid>
                    </Grid>
                );
            case 2: 
                return (
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}><TextField fullWidth label="PAN No" value={formData.other.pan_no} onChange={(e)=>handleChange('other','pan_no',e.target.value)} error={!!errors.pan_no} /></Grid>
                        <Grid item xs={12} sm={6}><TextField fullWidth label="Aadhar No" value={formData.other.aadhar_no} onChange={(e)=>handleChange('other','aadhar_no',e.target.value)} error={!!errors.aadhar_no} /></Grid>
                        <Grid item xs={12} sm={6}><TextField fullWidth label="UAN" value={formData.other.uan_number} onChange={(e)=>handleChange('other','uan_number',e.target.value)} error={!!errors.uan_number} /></Grid>
                        <Grid item xs={12} sm={6}><TextField fullWidth label="PF No" value={formData.other.pf_no} onChange={(e)=>handleChange('other','pf_no',e.target.value)} error={!!errors.pf_no} /></Grid>
                        <Grid item xs={12} sm={6}><TextField fullWidth label="ESIC No" value={formData.other.esic_no} onChange={(e)=>handleChange('other','esic_no',e.target.value)} error={!!errors.esic_no} /></Grid>
                    </Grid>
                );
            case 3: 
                return (
                    <Grid container spacing={3}>
                        <Grid item xs={12}><TextField fullWidth label="Full Name" value={formData.contact.contact_full_name} onChange={(e)=>handleChange('contact','contact_full_name',e.target.value)} error={!!errors.contact_full_name} /></Grid>
                        <Grid item xs={12}><TextField fullWidth label="Relationship" value={formData.contact.relationship} onChange={(e)=>handleChange('contact','relationship',e.target.value)} error={!!errors.relationship} /></Grid>
                        <Grid item xs={12} sm={6}><TextField fullWidth label="Phone 1" value={formData.contact.contact_phone_no} onChange={(e)=>handleChange('contact','contact_phone_no',e.target.value)} error={!!errors.contact_phone_no} /></Grid>
                        <Grid item xs={12} sm={6}><TextField fullWidth label="Phone 2" value={formData.contact.contact_phone_no_2} onChange={(e)=>handleChange('contact','contact_phone_no_2',e.target.value)} error={!!errors.contact_phone_no_2} /></Grid>
                        <Grid item xs={12}><TextField fullWidth label="Address" value={formData.contact.contact_address} onChange={(e)=>handleChange('contact','contact_address',e.target.value)} error={!!errors.contact_address} /></Grid>
                    </Grid>
                );
            case 4: 
                return (
                    <Grid container spacing={3}>
                        <Grid item xs={12}><TextField fullWidth label="Station Address" value={formData.policeStation.police_station_address} onChange={(e)=>handleChange('policeStation','police_station_address',e.target.value)} error={!!errors.police_station_address} /></Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField select fullWidth label="Country" value={selectedCountry} error={!!errors.country} onChange={(e)=>{
                                setSelectedCountry(e.target.value);
                                setErrors(prev => ({ ...prev, country: false }));
                            }}>
                                {countries.map(c => <MenuItem key={c.country_id} value={c.country_name}>{c.country_name}</MenuItem>)}
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField select fullWidth label="State" value={formData.policeStation.police_station_state} error={!!errors.state} onChange={(e) => {
                                const s = states.find(st=>st.state_name === e.target.value);
                                setFormData(prev=>({...prev, policeStation: {...prev.policeStation, police_station_state: e.target.value, police_station_state_id: s?.state_id}}));
                                setErrors(prev => ({ ...prev, state: false }));
                            }}>
                                {states.map(s=><MenuItem key={s.state_id} value={s.state_name}>{s.state_name}</MenuItem>)}
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={6}><TextField fullWidth label="District" value={formData.policeStation.police_station_district} onChange={(e)=>handleChange('policeStation','police_station_district',e.target.value)} error={!!errors.police_station_district} /></Grid>
                        <Grid item xs={12} sm={6}><TextField fullWidth label="Pincode" value={formData.policeStation.police_station_pincode} onChange={(e)=>handleChange('policeStation','police_station_pincode',e.target.value)} error={!!errors.police_station_pincode} /></Grid>
                    </Grid>
                );
            case 5: 
                return (
                    <Box sx={{ width: '100%' }}>
                        <TextField 
                            fullWidth 
                            label="Facebook" 
                            sx={{mb:3}} 
                            value={formData.social.fb_profile} 
                            onChange={(e)=>handleChange('social','fb_profile',e.target.value)} 
                            error={!!errors.fb_profile}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Facebook color="primary" />
                                    </InputAdornment>
                                )
                            }} 
                        />
                        <TextField 
                            fullWidth 
                            label="Twitter" 
                            sx={{mb:3}} 
                            value={formData.social.twitter_profile} 
                            onChange={(e)=>handleChange('social','twitter_profile',e.target.value)} 
                            error={!!errors.twitter_profile}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Twitter color="primary" />
                                    </InputAdornment>
                                )
                            }} 
                        />
                        <TextField 
                            fullWidth 
                            label="LinkedIn" 
                            sx={{mb:3}} 
                            value={formData.social.linkedin_profile} 
                            onChange={(e)=>handleChange('social','linkedin_profile',e.target.value)} 
                            error={!!errors.linkedin_profile}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LinkedIn color="primary" />
                                    </InputAdornment>
                                )
                            }} 
                        />
                        <TextField 
                            fullWidth 
                            label="Google Plus" 
                            sx={{mb:3}} 
                            value={formData.social.gplus_profile} 
                            onChange={(e)=>handleChange('social','gplus_profile',e.target.value)} 
                            error={!!errors.gplus_profile}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Google color="primary" />
                                    </InputAdornment>
                                )
                            }} 
                        />
                    </Box>
                );
            default: return null;
        }
    };

    return (
        <Box sx={{ p: 2 }}>
            <Stepper activeStep={activeStep} alternativeLabel nonLinear sx={{ 
                mb: 5,
                '& .MuiStepConnector-line': { borderColor: '#e0e0e0' },
                '& .MuiStepIcon-root': { color: '#ccc' },
                '& .MuiStepIcon-root.Mui-active': { color: PRIMARY_COLOR },
                '& .MuiStepIcon-root.Mui-completed': { color: PRIMARY_COLOR },
                '& .MuiStepLabel-label': { fontWeight: 500 },
                '& .MuiStepLabel-label.Mui-active': { color: PRIMARY_COLOR, fontWeight: 700 }
            }}>
                {steps.map((label, index) => (
                    <Step key={label}>
                        <StepButton onClick={() => handleStepClick(index)}>
                            {label}
                        </StepButton>
                    </Step>
                ))}
            </Stepper>
            
            <Paper elevation={0} sx={{ mt: 2, minHeight: '300px', p: 2, border: '1px solid #f0f0f0', borderRadius: 2 }}>
                <Typography variant="h6" gutterBottom color={PRIMARY_COLOR} fontWeight="bold" sx={{ mb: 3 }}>
                    {steps[activeStep]}
                </Typography>
                
                {renderForm()}
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 5 }}>
                    <Button 
                        onClick={handleInternalBack} 
                        variant="outlined" 
                        sx={{ 
                            borderRadius: '8px', 
                            borderColor: '#ccc', 
                            color: '#555', 
                            '&:hover': { borderColor: PRIMARY_COLOR, color: PRIMARY_COLOR } 
                        }}
                    >
                        Back
                    </Button>
                    <Button 
                        variant="contained" 
                        onClick={handleSaveStep} 
                        sx={{ 
                            background: GRADIENT_BTN, 
                            color: 'white', 
                            borderRadius: '8px',
                            px: 3
                        }}
                    >
                        {activeStep === steps.length - 1 ? "Save & Next" : "Save & Next"}
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
};
export default PersonalInformation;