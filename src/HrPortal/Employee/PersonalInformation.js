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

// export default PersonalInformation;
import React, { useEffect, useState, useContext } from 'react';
import {
  Box, Tabs, Tab, Typography, TextField, MenuItem, Button,
  InputAdornment, Grid
} from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import GoogleIcon from '@mui/icons-material/Google';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import axiosInstance from '../../utils/axiosInstance';
import { EmployeeContext } from '../../SuperAdmin/Employee/EmployeeContext';
// 1. Import SweetAlert2
import Swal from 'sweetalert2';

function TabPanel({ children, value, index }) {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box sx={{ pt: 2 }}>{children}</Box>}
    </div>
  );
}

const PersonalInformation = () => {
  const { employeeId } = useContext(EmployeeContext);
  const userId = employeeId;
  const [tabIndex, setTabIndex] = useState(0);

  const [bioData, setBioData] = useState({ bio: '', experience: '' });
  const [socialData, setSocialData] = useState({
    fb_profile: '', twitter_profile: '', gplus_profile: '', linkedin_profile: ''
  });
  const [bankData, setBankData] = useState({
    account_title: '',
    account_number: '',
    bank_name: '',
    iban: '',
    bank_branch: '',
    pf_no: '',
    esic_no: '',
    pan_no: ''
  });
  const [contactData, setContactData] = useState({
    contact_full_name: '', contact_phone_no: '', contact_email: '', contact_address: ''
  });

  const fetchData = async (type) => {
    try {
      const res = await axiosInstance.post('/api/personal_info/', { user_id: userId, type });
      const data = res.data.personal_details;
      switch (type) {
        case 1:
          setBioData(data || { bio: '', experience: '' });
          break;
        case 2:
          setSocialData(data || { fb_profile: '', twitter_profile: '', gplus_profile: '', linkedin_profile: '' });
          break;
        case 3:
          // Ensure all fields are initialized even if not present in the API response
          setBankData({
              account_title: data.account_title || '',
              account_number: data.account_number || '',
              bank_name: data.bank_name || '',
              iban: data.iban || '',
              bank_branch: data.bank_branch || '',
              pf_no: data.pf_no || '',
              esic_no: data.esic_no || '',
              pan_no: data.pan_no || ''
          });
          break;
        case 4:
          setContactData(data || { contact_full_name: '', contact_phone_no: '', contact_email: '', contact_address: '' });
          break;
        default:
          break;
      }
    } catch (err) {
      console.error('Fetch error:', err);
       // 2. Add Swal for fetch errors
       Swal.fire({
        icon: 'error',
        title: 'Fetch Error',
        text: `Failed to load data for this tab. Please try again.`
      });
    }
  };

  useEffect(() => {
    if (userId) {
        requestAnimationFrame(() => {
            fetchData(tabIndex + 1);
        });
    }
  }, [tabIndex, userId]);

  const handleChange = (e, setter) => {
    const { name, value } = e.target;
    setter(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (type, data) => {
    // 3. Add Swal for loading state
    Swal.fire({
        title: 'Updating...',
        text: 'Please wait while we save your information.',
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading();
        }
    });

    try {
      let payload = { user_id: userId, type, ...data };

      if (type === 3) {
        payload = {
          user_id: userId,
          type: type,
          account_title: data.account_title,
          account_number: data.account_number,
          bank_name: data.bank_name,
          iban: data.iban,
          bank_branch: data.bank_branch,
          pf_number: data.pf_no,
          esic_number: data.esic_no,
          pan_number: data.pan_no
        };
      }

      await axiosInstance.patch('/api/personal_info/', payload);
      
      // 4. Add Swal for success
      Swal.fire({
        icon: 'success',
        title: 'Updated!',
        text: 'Your information has been updated successfully.'
      });

    } catch (err) {
      console.error('Update error:', err.response?.data || err.message);
      const errorMessage = err.response?.data?.message || 'Failed to update information.';
      // 5. Add Swal for errors
      Swal.fire({
        icon: 'error',
        title: 'Update Failed',
        text: errorMessage
      });
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>👤 Personal Information</Typography>

      <Tabs
        value={tabIndex}
        onChange={(e, newValue) => setTabIndex(newValue)}
        sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}
        textColor="primary"
        indicatorColor="primary"
      >
        <Tab label="Bio" />
        <Tab label="Social Profile" />
        <Tab label="Bank Account" />
        <Tab label="Emergency Contact" />
      </Tabs>

      <TabPanel value={tabIndex} index={0}>
        <TextField
          label="Bio"
          name="bio"
          value={bioData.bio || ''}
          onChange={(e) => handleChange(e, setBioData)}
          fullWidth
          multiline
          minRows={2}
          required
          sx={{ mb: 3 }}
        />
        <TextField
          label="Experience"
          name="experience"
          value={bioData.experience || ''}
          onChange={(e) => handleChange(e, setBioData)}
          select
          fullWidth
          sx={{ mb: 3 }}
        >
          {Array.from({ length: 50 }, (_, i) => (
            <MenuItem key={i + 1} value={i + 1}>
              {i + 1} {i + 1 === 1 ? 'Year' : 'Years'}
            </MenuItem>
          ))}
        </TextField>

        <Box textAlign="right">
          <Button
            variant="contained"
            sx={{ backgroundColor: '#6c63ff', px: 4 }}
            onClick={() => handleSubmit(1, bioData)}
          >
            Update Bio
          </Button>
        </Box>
      </TabPanel>

      <TabPanel value={tabIndex} index={1}>
        <Box sx={{ maxWidth: 600 }}>
          {[
            { label: 'Facebook', name: 'fb_profile', icon: <FacebookIcon sx={{ color: '#3b5998' }} /> },
            { label: 'Twitter', name: 'twitter_profile', icon: <TwitterIcon sx={{ color: '#00acee' }} /> },
            { label: 'Google Plus', name: 'gplus_profile', icon: <GoogleIcon sx={{ color: '#db4437' }} /> },
            { label: 'LinkedIn', name: 'linkedin_profile', icon: <LinkedInIcon sx={{ color: '#0e76a8' }} /> },
          ].map(({ label, name, icon }, i) => (
            <Box key={i} sx={{ mb: 2 }}>
              <Typography variant="body1" sx={{ mb: 1 }}>{label}</Typography>
              <TextField
                fullWidth
                name={name}
                value={socialData[name] || ''}
                onChange={(e) => handleChange(e, setSocialData)}
                InputProps={{ startAdornment: <InputAdornment position="start">{icon}</InputAdornment> }}
              />
            </Box>
          ))}
          <Button variant="contained" onClick={() => handleSubmit(2, socialData)}>Update Social</Button>
        </Box>
      </TabPanel>

      <TabPanel value={tabIndex} index={2}>
        <Box component="form" sx={{ maxWidth: 800 }}>
          <Grid container spacing={2}>
            {[
              { label: "Account Title", name: "account_title" },
              { label: "Account Number", name: "account_number" },
              { label: "Bank Name", name: "bank_name" },
              { label: "IFSC Code", name: "iban" },
              { label: "PF No.", name: "pf_no" },
              { label: "ESIC No.", name: "esic_no" },
              { label: "PAN No.", name: "pan_no" },
              { label: "Bank Branch", name: "bank_branch", full: true },
            ].map((field, idx) => (
              <Grid item xs={12} sm={field.full ? 12 : 6} key={idx}>
                <TextField
                  label={field.label}
                  name={field.name}
                  value={bankData[field.name] || ''}
                  onChange={(e) => handleChange(e, setBankData)}
                  fullWidth
                  required
                />
              </Grid>
            ))}
          </Grid>
          <Box sx={{ mt: 3 }}>
            <Button variant="contained" onClick={() => handleSubmit(3, bankData)}>Update Bank Info</Button>
          </Box>
        </Box>
      </TabPanel>

      <TabPanel value={tabIndex} index={3}>
        <Box component="form" sx={{ maxWidth: 800 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Full Name"
                name="contact_full_name"
                value={contactData.contact_full_name || ''}
                onChange={(e) => handleChange(e, setContactData)}
                fullWidth
                required
                InputProps={{ startAdornment: <InputAdornment position="start"><PersonIcon /></InputAdornment> }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Contact Number"
                name="contact_phone_no"
                value={contactData.contact_phone_no || ''}
                onChange={(e) => handleChange(e, setContactData)}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Email"
                name="contact_email"
                value={contactData.contact_email || ''}
                onChange={(e) => handleChange(e, setContactData)}
                fullWidth
                required
                InputProps={{ startAdornment: <InputAdornment position="start"><EmailIcon /></InputAdornment> }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Address"
                name="contact_address"
                value={contactData.contact_address || ''}
                onChange={(e) => handleChange(e, setContactData)}
                fullWidth
                required
                multiline
                minRows={2}
              />
            </Grid>
          </Grid>
          <Box sx={{ mt: 3 }}>
            <Button variant="contained" onClick={() => handleSubmit(4, contactData)}>Update Contact</Button>
          </Box>
        </Box>
      </TabPanel>
    </Box>
  );
};

export default PersonalInformation;