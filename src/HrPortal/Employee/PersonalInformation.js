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
//     iban: '',
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
//               { label: "IFSC Code", name: "iban" },
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
//     iban: '',
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
//         iban: data.iban,
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
//               { label: "IFSC Code", name: "iban" },
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

// // export default PersonalInformation;
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
// import { EmployeeContext } from '../../SuperAdmin/Employee/EmployeeContext';
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
//     iban: '',
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
//               iban: data.iban || '',
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
//           iban: data.iban,
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
//               { label: "IFSC Code", name: "iban" },
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
//     Box, Typography, TextField, MenuItem, Button, Grid, CircularProgress, 
//     Stepper, Step, StepButton, FormControl, FormLabel, RadioGroup, 
//     FormControlLabel, Radio, Paper, InputAdornment, FormHelperText
// } from '@mui/material';
// import { Facebook, Twitter, LinkedIn, Google } from '@mui/icons-material';
// import axiosInstance from '../../utils/axiosInstance';
// import { EmployeeContext } from './EmployeeContext';
// import Swal from 'sweetalert2';

// const PRIMARY_COLOR = "#8C257C"; 
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
    
//     const [errors, setErrors] = useState({});

//     const [countries, setCountries] = useState([]);
//     const [states, setStates] = useState([]);
//     const [selectedCountry, setSelectedCountry] = useState('');

//     const initialFormData = {
//         bio: { bio: '', experience: '', degree: '', is_fresher: 'fresher', exp_years: '', exp_months: '' },
//         social: { fb_profile: '', twitter_profile: '', gplus_profile: '', linkedin_profile: '' },
//         bank: { account_title: '', account_number: '', bank_name: '', ifsc_code: '', bank_branch: '' },
//         contact: { contact_full_name: '', contact_phone_no: '', contact_phone_no_2: '', contact_email: '', contact_address: '' },
//         other: { uan_number: '', pf_no: '', esic_no: '', pan_no: '', aadhar_no: '', passport_no: '', vehicle_no: '', driving_licence_no: '' },
//         policeStation: { police_station_address: '', police_station_state: '', police_station_state_id: null, police_station_district: '', police_station_village: '', police_station_pincode: '' }
//     };
    
//     const [formData, setFormData] = useState(initialFormData);

//     const getApiType = (index) => {
//         switch(index) {
//             case 0: return 1; 
//             case 1: return 3; 
//             case 2: return 5; 
//             case 3: return 4; 
//             case 4: return 6; 
//             case 5: return 2; 
//             default: return 1;
//         }
//     };

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
//                         contact_address: data.contact_address
//                     };
//                     else if (type === 5) newState.other = { 
//                         uan_number: data.uan_number, 
//                         pf_no: data.pf_number, 
//                         esic_no: data.esic_number, 
//                         pan_no: data.pan_number, 
//                         aadhar_no: data.aadhar_no, 
//                         passport_no: data.passport_no, 
//                         vehicle_no: data.vehicle_no, 
//                         driving_licence_no: data.driving_licence_no 
//                     };
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

//     useEffect(() => {
//         if (selectedCountry) {
//             axiosInstance.get(`/api/states/?country_name=${selectedCountry}`)
//                 .then(res => setStates(res.data.data || []))
//                 .catch(() => {});
//         }
//     }, [selectedCountry]);

//     const handleChange = (section, field, value) => {
//         setFormData(prev => ({ ...prev, [section]: { ...prev[section], [field]: value } }));
//         if (errors[field]) {
//             setErrors(prev => ({ ...prev, [field]: false }));
//         }
//     };

//     const validateStep = () => {
//         const newErrors = {};
//         let isValid = true;

//         const checkField = (field, value, section) => {
//             if (!value || value.toString().trim() === '') {
//                 newErrors[field] = true;
//                 isValid = false;
//             }
//         };

//         if (activeStep === 0) { 
//             checkField('bio', formData.bio.bio);
//             checkField('degree', formData.bio.degree);
//             checkField('experience', formData.bio.experience);
            
//             if (formData.bio.is_fresher === 'experienced') {
//                 checkField('exp_years', formData.bio.exp_years);
//                 checkField('exp_months', formData.bio.exp_months);
//             }
//         } 
//         else if (activeStep === 1) { 
//             checkField('account_title', formData.bank.account_title);
//             checkField('account_number', formData.bank.account_number);
//             checkField('bank_name', formData.bank.bank_name);
//             checkField('ifsc_code', formData.bank.ifsc_code); 
//             checkField('bank_branch', formData.bank.bank_branch);
//         } 
//         else if (activeStep === 2) { 
//             checkField('pan_no', formData.other.pan_no);
//             checkField('aadhar_no', formData.other.aadhar_no);
//             checkField('uan_number', formData.other.uan_number);
//             checkField('pf_no', formData.other.pf_no);
//             checkField('esic_no', formData.other.esic_no);
//         } 
//         else if (activeStep === 3) { 
//             checkField('contact_full_name', formData.contact.contact_full_name);
//             checkField('contact_phone_no', formData.contact.contact_phone_no);
//             checkField('contact_phone_no_2', formData.contact.contact_phone_no_2);
//             checkField('contact_address', formData.contact.contact_address);
//         } 
//         else if (activeStep === 4) { 
//             checkField('police_station_address', formData.policeStation.police_station_address);
//             checkField('police_station_district', formData.policeStation.police_station_district);
//             checkField('police_station_pincode', formData.policeStation.police_station_pincode);
            
//             if (!selectedCountry) { newErrors['country'] = true; isValid = false; }
//             if (!formData.policeStation.police_station_state) { newErrors['state'] = true; isValid = false; }
//         } 
//         else if (activeStep === 5) { 
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
//             setTimeout(() => {
//                 const errorElement = document.querySelector('.Mui-error');
//                 if (errorElement) {
//                     errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
//                 }
//             }, 100);
//         }

//         return isValid;
//     };

//     const handleSaveStep = async () => {
//         if (!validateStep()) return;

//         const type = getApiType(activeStep);
//         let payload = { user_id: userId, type };
        
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
//                 setErrors({}); 
//             } else {
//                 if(onNext) onNext();
//             }
//         } catch (err) {
//             Swal.fire("Error", "Failed to save details.", "error");
//         }
//     };

//     const handleStepClick = (index) => {
//         if (index < activeStep) {
//             setActiveStep(index);
//             setErrors({});
//         } else if (index > activeStep) {
//             if (validateStep()) {
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

//     const renderForm = () => {
//         if(isLoading) return <Box display="flex" justifyContent="center" p={4}><CircularProgress sx={{ color: PRIMARY_COLOR }} /></Box>;

//         switch(activeStep) {
//             case 0: 
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
//             case 1: 
//                 return (
//                     <Grid container spacing={3}>
//                          <Grid item xs={12} sm={6}><TextField fullWidth label="Account Holder" value={formData.bank.account_title} onChange={(e)=>handleChange('bank','account_title',e.target.value)} error={!!errors.account_title} /></Grid>
//                          <Grid item xs={12} sm={6}><TextField fullWidth label="Account Number" value={formData.bank.account_number} onChange={(e)=>handleChange('bank','account_number',e.target.value)} error={!!errors.account_number} /></Grid>
//                          <Grid item xs={12} sm={6}><TextField fullWidth label="Bank Name" value={formData.bank.bank_name} onChange={(e)=>handleChange('bank','bank_name',e.target.value)} error={!!errors.bank_name} /></Grid>
//                          <Grid item xs={12} sm={6}><TextField fullWidth label="IFSC Code" value={formData.bank.ifsc_code} onChange={(e)=>handleChange('bank','ifsc_code',e.target.value)} error={!!errors.ifsc_code} /></Grid>
//                          <Grid item xs={12}><TextField fullWidth label="Branch" value={formData.bank.bank_branch} onChange={(e)=>handleChange('bank','bank_branch',e.target.value)} error={!!errors.bank_branch} /></Grid>
//                     </Grid>
//                 );
//             case 2: 
//                 return (
//                     <Grid container spacing={3}>
//                         <Grid item xs={12} sm={6}><TextField fullWidth label="PAN No" value={formData.other.pan_no} onChange={(e)=>handleChange('other','pan_no',e.target.value)} error={!!errors.pan_no} /></Grid>
//                         <Grid item xs={12} sm={6}><TextField fullWidth label="Aadhar No" value={formData.other.aadhar_no} onChange={(e)=>handleChange('other','aadhar_no',e.target.value)} error={!!errors.aadhar_no} /></Grid>
//                         <Grid item xs={12} sm={6}><TextField fullWidth label="UAN" value={formData.other.uan_number} onChange={(e)=>handleChange('other','uan_number',e.target.value)} error={!!errors.uan_number} /></Grid>
//                         <Grid item xs={12} sm={6}><TextField fullWidth label="PF No" value={formData.other.pf_no} onChange={(e)=>handleChange('other','pf_no',e.target.value)} error={!!errors.pf_no} /></Grid>
//                         <Grid item xs={12} sm={6}><TextField fullWidth label="ESIC No" value={formData.other.esic_no} onChange={(e)=>handleChange('other','esic_no',e.target.value)} error={!!errors.esic_no} /></Grid>
//                     </Grid>
//                 );
//             case 3: 
//                 return (
//                     <Grid container spacing={3}>
//                         <Grid item xs={12}><TextField fullWidth label="Full Name" value={formData.contact.contact_full_name} onChange={(e)=>handleChange('contact','contact_full_name',e.target.value)} error={!!errors.contact_full_name} /></Grid>
//                         <Grid item xs={12} sm={6}><TextField fullWidth label="Phone 1" value={formData.contact.contact_phone_no} onChange={(e)=>handleChange('contact','contact_phone_no',e.target.value)} error={!!errors.contact_phone_no} /></Grid>
//                         <Grid item xs={12} sm={6}><TextField fullWidth label="Phone 2" value={formData.contact.contact_phone_no_2} onChange={(e)=>handleChange('contact','contact_phone_no_2',e.target.value)} error={!!errors.contact_phone_no_2} /></Grid>
//                         <Grid item xs={12}><TextField fullWidth label="Address" value={formData.contact.contact_address} onChange={(e)=>handleChange('contact','contact_address',e.target.value)} error={!!errors.contact_address} /></Grid>
//                     </Grid>
//                 );
//             case 4: 
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
//             case 5: 
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
    FormControlLabel, Radio, Paper, InputAdornment
} from '@mui/material';
import { Facebook, Twitter, LinkedIn, Google } from '@mui/icons-material';
import axiosInstance from '../../utils/axiosInstance';
import { EmployeeContext } from './EmployeeContext';
import Swal from 'sweetalert2';
import { useLocation, useParams } from 'react-router-dom';

const PRIMARY_COLOR = "#8C257C";
const GRADIENT_BTN = `linear-gradient(135deg, ${PRIMARY_COLOR} 0%, #6d1d60 100%)`;
const API_ENDPOINT = 'https://tdtlworld.com/hrms-backend/api/personal_info/';

const PersonalInformation = ({ onNext, onBack }) => {
    const { employeeId } = useContext(EmployeeContext);
    const params = useParams();
    const location = useLocation();
    
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
    const [initLoading, setInitLoading] = useState(true);
    
    const [errors, setErrors] = useState({});

    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState('');

    const initialFormData = {
        bio: { bio: '', experience: '', degree: '', is_fresher: 'fresher', exp_years: '', exp_months: '' },
        social: { fb_profile: '', twitter_profile: '', gplus_profile: '', linkedin_profile: '' },
        bank: { account_title: '', account_number: '', bank_name: '', ifsc_code: '', bank_branch: '' },
        contact: { contact_full_name: '', contact_phone_no: '', contact_phone_no_2: '', contact_email: '', contact_address: '' },
        other: { 
            uan_number: '', 
            pf_no: '', 
            esic_no: '', 
            pan_no: '', 
            aadhar_no: '', 
            passport_no: '', 
            vehicle_no: '', 
            driving_licence_no: '' 
        },
        policeStation: { 
            police_station_address: '', 
            police_station_state: '', 
            police_station_state_id: null, 
            police_station_district: '', 
            police_station_village: '', 
            police_station_pincode: '' 
        }
    };
    
    const [formData, setFormData] = useState(initialFormData);

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

    const getApiType = (index) => {
        switch(index) {
            case 0: return 1;  // Bio
            case 1: return 3;  // Bank Account
            case 2: return 5;  // Identification Details
            case 3: return 4;  // Emergency Contact
            case 4: return 6;  // Police Station
            case 5: return 2;  // Social Profile
            default: return 1;
        }
    };

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const res = await axiosInstance.get('/api/countries/');
                setCountries(res.data.data || []);
            } catch (e) { console.error(e); }
        };
        fetchCountries();
        setInitLoading(false);
    }, []);

    useEffect(() => {
        const effectiveId = getEffectiveId();
        if (!effectiveId) return;

        const fetchStepData = async () => {
            setIsLoading(true);
            const type = getApiType(activeStep);
            try {
                const res = await axiosInstance.post(API_ENDPOINT, { user_id: effectiveId, type });
                const data = res.data.personal_details || {};
                
                setFormData(prev => {
                    const newState = { ...prev };
                    
                    if (type === 1) {
                        // Bio Data
                        newState.bio = { 
                            bio: data.bio || '', 
                            experience: data.experience || '', 
                            degree: data.degree || '', 
                            is_fresher: data.is_fresher || 'fresher', 
                            exp_years: data.exp_years || '', 
                            exp_months: data.exp_months || '' 
                        };
                    } 
                    else if (type === 2) {
                        // Social Profile Data
                        newState.social = { 
                            fb_profile: data.fb_profile || '', 
                            twitter_profile: data.twitter_profile || '', 
                            linkedin_profile: data.linkedin_profile || '', 
                            gplus_profile: data.gplus_profile || '' 
                        };
                    } 
                    else if (type === 3) {
                        // Bank Account Data
                        newState.bank = { 
                            account_title: data.account_title || '', 
                            account_number: data.account_number || '', 
                            bank_name: data.bank_name || '', 
                            ifsc_code: data.ifsc_code || '', 
                            bank_branch: data.bank_branch || '' 
                        };
                    } 
                    else if (type === 4) {
                        // Emergency Contact Data
                        newState.contact = { 
                            contact_full_name: data.contact_full_name || '', 
                            contact_phone_no: data.contact_phone_no || '', 
                            contact_phone_no_2: data.contact_phone_no_2 || '', 
                            contact_email: data.contact_email || '', 
                            contact_address: data.contact_address || ''
                        };
                    } 
                    else if (type === 5) {
                        // MAPPED: Identification Details
                        // API Response → Form Field
                        // pf_number → pf_no
                        // esic_number → esic_no
                        // pan_number → pan_no
                        // passport_no → passport_no
                        // vehicle_number → vehicle_no
                        // driving_licence_number → driving_licence_no
                        // aadhar_no → aadhar_no (already matches)
                        // uan_number → uan_number (already matches)
                        newState.other = { 
                            uan_number: data.uan_number ? String(data.uan_number) : '', 
                            pf_no: data.pf_number ? String(data.pf_number) : '', 
                            esic_no: data.esic_number ? String(data.esic_number) : '', 
                            pan_no: data.pan_number ? String(data.pan_number) : '', 
                            aadhar_no: data.aadhar_no ? String(data.aadhar_no) : '', 
                            passport_no: data.passport_no ? String(data.passport_no) : '', 
                            vehicle_no: data.vehicle_no ? String(data.vehicle_no) : '', 
                            driving_licence_no: data.driving_licence_no ? String(data.driving_licence_no) : ''
                        };
                    } 
                    else if (type === 6) {
                        // Police Station Data
                        if (data.police_station_country) setSelectedCountry(data.police_station_country);
                        newState.policeStation = { 
                            police_station_address: data.police_station_address || '', 
                            police_station_state: data.police_station_state || '', 
                            police_station_state_id: data.police_station_state_id || null, 
                            police_station_district: data.police_station_district || '',
                            police_station_village: data.police_station_village || '',
                            police_station_pincode: data.police_station_pincode || ''
                        };
                    }
                    return newState;
                });
            } catch (err) { 
                console.error('Fetch error:', err);
                Swal.fire({
                    icon: 'error',
                    title: 'Fetch Error',
                    text: 'Failed to load step data. Please try again.',
                    confirmButtonColor: PRIMARY_COLOR
                });
            } 
            finally { setIsLoading(false); }
        };
        fetchStepData();
    }, [activeStep, employeeId, location.search, params.id]);

    useEffect(() => {
        if (selectedCountry) {
            axiosInstance.get(`/api/states/?country_name=${selectedCountry}`)
                .then(res => setStates(res.data.data || []))
                .catch(e => console.error(e));
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

        const checkField = (field, value) => {
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
        const effectiveId = getEffectiveId();
        if (!effectiveId) {
            Swal.fire({
                icon: 'error',
                title: 'Missing ID',
                text: 'No employee id found in URL or context.',
                confirmButtonColor: PRIMARY_COLOR
            });
            return;
        }

        if (!validateStep()) return;

        const type = getApiType(activeStep);
        let payload = { user_id: effectiveId, type };
        
        if (activeStep === 0) {
            // Bio Data - send as-is
            payload = { ...payload, ...formData.bio };
        } 
        else if (activeStep === 1) {
            // Bank Account Data - send as-is
            payload = { ...payload, ...formData.bank };
        } 
        else if (activeStep === 2) {
            // MAPPED: Identification Details
            // Form Field → API Request
            // pf_no → pf_number
            // esic_no → esic_number
            // pan_no → pan_number
            // passport_no → passport_no
            // vehicle_no → vehicle_no
            // driving_licence_no → driving_licence_no
            // aadhar_no → aadhar_no
            // uan_number → uan_number
            const d = formData.other;
            payload = { 
                ...payload, 
                uan_number: d.uan_number, 
                pf_number: d.pf_no, 
                esic_number: d.esic_no, 
                pan_number: d.pan_no, 
                aadhar_no: d.aadhar_no, 
                passport_no: d.passport_no, 
                vehicle_no: d.vehicle_no, 
                driving_licence_no: d.driving_licence_no 
            };
        } 
        else if (activeStep === 3) {
            // Emergency Contact Data - send as-is
            payload = { ...payload, ...formData.contact };
        } 
        else if (activeStep === 4) {
            // Police Station Data
            payload = { ...payload, ...formData.policeStation };
            payload.police_station_state = formData.policeStation.police_station_state_id;
        } 
        else if (activeStep === 5) {
            // Social Profile Data - send as-is
            payload = { ...payload, ...formData.social };
        }

        try {
            Swal.fire({
                title: 'Saving...',
                text: 'Please wait while we update your information.',
                allowOutsideClick: false,
                didOpen: () => Swal.showLoading()
            });

            await axiosInstance.patch(API_ENDPOINT, payload);
            Swal.close();
            
            if (activeStep < steps.length - 1) {
                setActiveStep(prev => prev + 1);
                setErrors({}); 
            } else {
                Swal.fire({
                    icon: 'success',
                    title: 'All Done!',
                    text: 'Your personal information has been saved successfully.',
                    confirmButtonColor: PRIMARY_COLOR
                }).then(() => {
                    if(onNext) onNext();
                });
            }
        } catch (err) {
            console.error('Save error:', err);
            const errorMessage = err.response?.data?.message || 'Failed to save details. Please try again.';
            Swal.fire({
                icon: 'error',
                title: 'Save Failed',
                text: errorMessage,
                confirmButtonColor: PRIMARY_COLOR
            });
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
                            <TextField fullWidth label="Bio / Summary" multiline rows={3} value={formData.bio.bio} onChange={(e) => handleChange('bio', 'bio', e.target.value)} error={!!errors.bio} helperText={errors.bio ? 'Bio is required' : ''} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField fullWidth label="Education Degree" value={formData.bio.degree} onChange={(e) => handleChange('bio', 'degree', e.target.value)} error={!!errors.degree} helperText={errors.degree ? 'Degree is required' : ''} />
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
                                <Grid item xs={6}><TextField fullWidth label="Years" type="number" value={formData.bio.exp_years} onChange={(e) => handleChange('bio', 'exp_years', e.target.value)} error={!!errors.exp_years} helperText={errors.exp_years ? 'Required' : ''} /></Grid>
                                <Grid item xs={6}><TextField fullWidth label="Months" type="number" value={formData.bio.exp_months} onChange={(e) => handleChange('bio', 'exp_months', e.target.value)} error={!!errors.exp_months} helperText={errors.exp_months ? 'Required' : ''} /></Grid>
                            </>
                        )}
                        <Grid item xs={12}>
                            <TextField select fullWidth label="Total Experience (Years)" value={formData.bio.experience} onChange={(e)=>handleChange('bio', 'experience', e.target.value)} error={!!errors.experience} helperText={errors.experience ? 'Required' : ''}>
                                {Array.from({length:30}, (_,i)=> <MenuItem key={i} value={i+1}>{i+1} Years</MenuItem>)}
                            </TextField>
                        </Grid>
                    </Grid>
                );
            case 1: 
                return (
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}><TextField fullWidth label="Account Holder" value={formData.bank.account_title} onChange={(e)=>handleChange('bank','account_title',e.target.value)} error={!!errors.account_title} helperText={errors.account_title ? 'Required' : ''} /></Grid>
                        <Grid item xs={12} sm={6}><TextField fullWidth label="Account Number" value={formData.bank.account_number} onChange={(e)=>handleChange('bank','account_number',e.target.value)} error={!!errors.account_number} helperText={errors.account_number ? 'Required' : ''} /></Grid>
                        <Grid item xs={12} sm={6}><TextField fullWidth label="Bank Name" value={formData.bank.bank_name} onChange={(e)=>handleChange('bank','bank_name',e.target.value)} error={!!errors.bank_name} helperText={errors.bank_name ? 'Required' : ''} /></Grid>
                        <Grid item xs={12} sm={6}><TextField fullWidth label="IFSC Code" value={formData.bank.ifsc_code} onChange={(e)=>handleChange('bank','ifsc_code',e.target.value)} error={!!errors.ifsc_code} helperText={errors.ifsc_code ? 'Required' : ''} /></Grid>
                        <Grid item xs={12}><TextField fullWidth label="Branch" value={formData.bank.bank_branch} onChange={(e)=>handleChange('bank','bank_branch',e.target.value)} error={!!errors.bank_branch} helperText={errors.bank_branch ? 'Required' : ''} /></Grid>
                    </Grid>
                );
            case 2: 
                return (
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}><TextField fullWidth label="PAN No" value={formData.other.pan_no} onChange={(e)=>handleChange('other','pan_no',e.target.value)} error={!!errors.pan_no} helperText={errors.pan_no ? 'Required' : ''} /></Grid>
                        <Grid item xs={12} sm={6}><TextField fullWidth label="Aadhar No" value={formData.other.aadhar_no} onChange={(e)=>handleChange('other','aadhar_no',e.target.value)} error={!!errors.aadhar_no} helperText={errors.aadhar_no ? 'Required' : ''} /></Grid>
                        <Grid item xs={12} sm={6}><TextField fullWidth label="UAN" value={formData.other.uan_number} onChange={(e)=>handleChange('other','uan_number',e.target.value)} error={!!errors.uan_number} helperText={errors.uan_number ? 'Required' : ''} /></Grid>
                        <Grid item xs={12} sm={6}><TextField fullWidth label="PF No" value={formData.other.pf_no} onChange={(e)=>handleChange('other','pf_no',e.target.value)} error={!!errors.pf_no} helperText={errors.pf_no ? 'Required' : ''} /></Grid>
                        <Grid item xs={12} sm={6}><TextField fullWidth label="ESIC No" value={formData.other.esic_no} onChange={(e)=>handleChange('other','esic_no',e.target.value)} error={!!errors.esic_no} helperText={errors.esic_no ? 'Required' : ''} /></Grid>
                        <Grid item xs={12} sm={6}><TextField fullWidth label="Passport No" value={formData.other.passport_no} onChange={(e)=>handleChange('other','passport_no',e.target.value)} helperText="Optional" /></Grid>
                        <Grid item xs={12} sm={6}><TextField fullWidth label="Vehicle No" value={formData.other.vehicle_no} onChange={(e)=>handleChange('other','vehicle_no',e.target.value)} helperText="Optional" /></Grid>
                        <Grid item xs={12} sm={6}><TextField fullWidth label="Driving License No" value={formData.other.driving_licence_no} onChange={(e)=>handleChange('other','driving_licence_no',e.target.value)} helperText="Optional" /></Grid>
                    </Grid>
                );
            case 3: 
                return (
                    <Grid container spacing={3}>
                        <Grid item xs={12}><TextField fullWidth label="Full Name" value={formData.contact.contact_full_name} onChange={(e)=>handleChange('contact','contact_full_name',e.target.value)} error={!!errors.contact_full_name} helperText={errors.contact_full_name ? 'Required' : ''} /></Grid>
                        <Grid item xs={12} sm={6}><TextField fullWidth label="Phone 1" value={formData.contact.contact_phone_no} onChange={(e)=>handleChange('contact','contact_phone_no',e.target.value)} error={!!errors.contact_phone_no} helperText={errors.contact_phone_no ? 'Required' : ''} /></Grid>
                        <Grid item xs={12} sm={6}><TextField fullWidth label="Phone 2" value={formData.contact.contact_phone_no_2} onChange={(e)=>handleChange('contact','contact_phone_no_2',e.target.value)} error={!!errors.contact_phone_no_2} helperText={errors.contact_phone_no_2 ? 'Required' : ''} /></Grid>
                        <Grid item xs={12}><TextField fullWidth label="Email" type="email" value={formData.contact.contact_email} onChange={(e)=>handleChange('contact','contact_email',e.target.value)} helperText="Optional" /></Grid>
                        <Grid item xs={12}><TextField fullWidth label="Address" multiline rows={2} value={formData.contact.contact_address} onChange={(e)=>handleChange('contact','contact_address',e.target.value)} error={!!errors.contact_address} helperText={errors.contact_address ? 'Required' : ''} /></Grid>
                    </Grid>
                );
            case 4: 
                return (
                    <Grid container spacing={3}>
                        <Grid item xs={12}><TextField fullWidth label="Station Address" multiline rows={2} value={formData.policeStation.police_station_address} onChange={(e)=>handleChange('policeStation','police_station_address',e.target.value)} error={!!errors.police_station_address} helperText={errors.police_station_address ? 'Required' : ''} /></Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField select fullWidth label="Country" value={selectedCountry} error={!!errors.country} onChange={(e)=>{
                                setSelectedCountry(e.target.value);
                                setErrors(prev => ({ ...prev, country: false }));
                            }} helperText={errors.country ? 'Required' : ''}>
                                <MenuItem value="">-- Select Country --</MenuItem>
                                {countries.map(c => <MenuItem key={c.country_id} value={c.country_name}>{c.country_name}</MenuItem>)}
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField select fullWidth label="State" value={formData.policeStation.police_station_state} error={!!errors.state} onChange={(e) => {
                                const s = states.find(st=>st.state_name === e.target.value);
                                setFormData(prev=>({...prev, policeStation: {...prev.policeStation, police_station_state: e.target.value, police_station_state_id: s?.state_id}}));
                                setErrors(prev => ({ ...prev, state: false }));
                            }} helperText={errors.state ? 'Required' : ''}>
                                <MenuItem value="">-- Select State --</MenuItem>
                                {states.map(s=><MenuItem key={s.state_id} value={s.state_name}>{s.state_name}</MenuItem>)}
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={6}><TextField fullWidth label="District" value={formData.policeStation.police_station_district} onChange={(e)=>handleChange('policeStation','police_station_district',e.target.value)} error={!!errors.police_station_district} helperText={errors.police_station_district ? 'Required' : ''} /></Grid>
                        <Grid item xs={12} sm={6}><TextField fullWidth label="Pincode" value={formData.policeStation.police_station_pincode} onChange={(e)=>handleChange('policeStation','police_station_pincode',e.target.value)} error={!!errors.police_station_pincode} helperText={errors.police_station_pincode ? 'Required' : ''} /></Grid>
                        <Grid item xs={12}><TextField fullWidth label="Village" value={formData.policeStation.police_station_village} onChange={(e)=>handleChange('policeStation','police_station_village',e.target.value)} helperText="Optional" /></Grid>
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
                            helperText={errors.fb_profile ? 'Required' : ''}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Facebook sx={{ color: PRIMARY_COLOR }} />
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
                            helperText={errors.twitter_profile ? 'Required' : ''}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Twitter sx={{ color: PRIMARY_COLOR }} />
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
                            helperText={errors.linkedin_profile ? 'Required' : ''}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LinkedIn sx={{ color: PRIMARY_COLOR }} />
                                    </InputAdornment>
                                )
                            }} 
                        />
                        <TextField 
                            fullWidth 
                            label="Google Plus" 
                            value={formData.social.gplus_profile} 
                            onChange={(e)=>handleChange('social','gplus_profile',e.target.value)} 
                            error={!!errors.gplus_profile}
                            helperText={errors.gplus_profile ? 'Required' : ''}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Google sx={{ color: PRIMARY_COLOR }} />
                                    </InputAdornment>
                                )
                            }} 
                        />
                    </Box>
                );
            default: return null;
        }
    };

    if(initLoading) return <Box display="flex" justifyContent="center" p={4}><CircularProgress sx={{ color: PRIMARY_COLOR }} /></Box>;

    return (
        <Box sx={{ p: 2 }}>
            <Stepper activeStep={activeStep} alternativeLabel nonLinear sx={{ 
                mb: 5,
                '& .MuiStepConnector-line': { borderColor: '#e0e0e0' },
                '& .MuiStepIcon-root': { color: '#ccc' },
                '& .MuiStepIcon-root.Mui-active': { color: PRIMARY_COLOR },
                '& .MuiStepIcon-root.Mui-completed': { color: PRIMARY_COLOR },
                '& .MuiStepLabel-label': { fontWeight: 500 },
                '& .MuiStepLabel-label.Mui-active': { color: PRIMARY_COLOR, fontWei0ght: 700 }
            }}>
                {steps.map((label, index) => (
                    <Step key={label}>
                        <StepButton onClick={() => handleStepClick(index)}>
                            {label}
                        </StepButton>
                    </Step>
                ))}
            </Stepper>
            
            <Paper elevation={0} sx={{ mt: 2, minHeight: '300px', p: 3, border: '1px solid #f0f0f0', borderRadius: 2 }}>
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
                        {activeStep === steps.length - 1 ? "Save & Complete" : "Save & Next"}
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
};

export default PersonalInformation;