// import React, { useEffect, useState, useContext } from 'react';
// import { EmployeeContext } from './EmployeeContext';
// import {
//   Box,
//   Grid,
//   TextField,
//   InputAdornment,
//   Typography,
//   Button,
//   InputLabel,
// } from '@mui/material';
// import PersonIcon from '@mui/icons-material/Person';
// import EmailIcon from '@mui/icons-material/Email';
// import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
// import axiosInstance from '../../utils/axiosInstance';
// import Swal from 'sweetalert2';

// const AccountInformation = () => {
//   const [username, setUsername] = useState('');
//   const [email, setEmail] = useState('');
//   const { employeeId } = useContext(EmployeeContext);
//   const userId = employeeId;

//   useEffect(() => {
//     console.log('employee id from context in basicinfo:', employeeId);
//   }, [employeeId]);

//   useEffect(() => {
//     const fetchAccountInfo = async () => {
//       try {
//         const response = await axiosInstance.post('/api/account_info/', {
//           user_id: userId,
//         });

//         if (response.data.status === 'success') {
//           const { username, email } = response.data.data;
//           setUsername(username);
//           setEmail(email);
//         }
//       } catch (error) {
//         console.error('Error fetching account info:', error);
//         Swal.fire({
//           icon: 'error',
//           title: 'Error',
//           text: 'Failed to fetch account information.',
//         });
//       }
//     };

//     if (userId) fetchAccountInfo();
//   }, [userId]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axiosInstance.patch('/api/account_info/', {
//         user_id: userId,
//         username,
//         email,
//       });
//       Swal.fire({
//         icon: 'success',
//         title: 'Success',
//         text: 'Account information has been saved.',
//       });
//     } catch (error) {
//       console.error('Error updating account info:', error);
//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: 'Failed to save account information.',
//       });
//     }
//   };

//   return (
//     <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 700 }}>
//       <Box display="flex" alignItems="center" gap={1} mb={2}>
//         <PhoneIphoneIcon color="primary" />
//         <Box>
//           <Typography variant="h6">Account Information</Typography>
//           <Typography variant="body2" color="text.secondary">
//             Change your account information
//           </Typography>
//         </Box>
//       </Box>

//       <Grid container spacing={2}>
//         <Grid item xs={12} sm={6}>
//           <InputLabel required>Username</InputLabel>
//           <TextField
//             fullWidth
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             placeholder="Username"
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <PersonIcon />
//                 </InputAdornment>
//               ),
//             }}
//           />
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <InputLabel required>Account Email</InputLabel>
//           <TextField
//             fullWidth
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder="Email"
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <EmailIcon />
//                 </InputAdornment>
//               ),
//             }}
//           />
//         </Grid>
//       </Grid>

//       <Box sx={{ mt: 3 }}>
//         <Button type="submit" variant="contained" color="primary">
//           Save
//         </Button>
//       </Box>
//     </Box>
//   );
// };

// // export default AccountInformation;
//  import React, { useEffect, useState, useContext } from 'react';
// import {
//   Box,
//   Typography,
//   Button,
//   Grid,
//   TextField,
//   InputAdornment,
//   InputLabel
// } from '@mui/material';
// import PersonIcon from '@mui/icons-material/Person';
// import EmailIcon from '@mui/icons-material/Email';
// import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
// import { EmployeeContext } from '../../SuperAdmin/Employee/EmployeeContext';
// import axiosInstance from '../../utils/axiosInstance';
// import Swal from 'sweetalert2';

// const AccountInformation = () => {
//   const [username, setUsername] = useState('');
//   const [email, setEmail] = useState('');
//   const { employeeId } = useContext(EmployeeContext);
//   const userId = employeeId;

//   useEffect(() => {
//     // This is for debugging and is fine.
//     console.log('employee id from context in AccountInformation:', employeeId);
//   }, [employeeId]);

//   useEffect(() => {
//     const fetchAccountInfo = async () => {
//       try {
//         const response = await axiosInstance.post('/api/account_info/', {
//           user_id: userId,
//         });

//         if (response.data.status === 'success') {
//           const { username, email } = response.data.data;
//           setUsername(username);
//           setEmail(email);
//         }
//       } catch (error) {
//         console.error('Error fetching account info:', error);
//         Swal.fire({
//           icon: 'error',
//           title: 'Fetch Error',
//           text: 'Failed to fetch account information. Please try again.',
//         });
//       }
//     };

//     if (userId) fetchAccountInfo();
//   }, [userId]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // 1. Add a loading indicator with Swal
//     Swal.fire({
//       title: 'Saving...',
//       text: 'Please wait while we update your account information.',
//       allowOutsideClick: false,
//       didOpen: () => {
//         Swal.showLoading();
//       },
//     });

//     try {
//       await axiosInstance.patch('/api/account_info/', {
//         user_id: userId,
//         username,
//         email,
//       });

//       // 2. On success, the loading alert is replaced by the success message
//       Swal.fire({
//         icon: 'success',
//         title: 'Success!',
//         text: 'Your account information has been saved successfully.',
//       });
//     } catch (error) {
//       console.error('Error updating account info:', error);
//       const errorMessage = error.response?.data?.message || 'Failed to save account information.';
      
//       // 3. On error, the loading alert is replaced by the error message
//       Swal.fire({
//         icon: 'error',
//         title: 'Update Failed',
//         text: errorMessage,
//       });
//     }
//   };

//   return (
//     <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 700, p: 3 }}>
//       <Box display="flex" alignItems="center" gap={1} mb={2}>
//         <PhoneIphoneIcon color="primary" />
//         <Box>
//           <Typography variant="h6">Account Information</Typography>
//           <Typography variant="body2" color="text.secondary">
//             Change your account information
//           </Typography>
//         </Box>
//       </Box>

//       <Grid container spacing={2}>
//         <Grid item xs={12} sm={6}>
//           <InputLabel required>Username</InputLabel>
//           <TextField
//             fullWidth
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             placeholder="Username"
//             required // Added for good practice
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <PersonIcon />
//                 </InputAdornment>
//               ),
//             }}
//           />
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <InputLabel required>Account Email</InputLabel>
//           <TextField
//             fullWidth
//             value={email}
//             type="email" // Added for better validation and mobile experience
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder="Email"
//             required // Added for good practice
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <EmailIcon />
//                 </InputAdornment>
//               ),
//             }}
//           />
//         </Grid>
//       </Grid>

//       <Box sx={{ mt: 3 }}>
//         <Button type="submit" variant="contained" color="primary">
//           Save
//         </Button>
//       </Box>
//     </Box>
//   );
// };

// export default AccountInformation;





import React, { useEffect, useState, useContext } from 'react';
import { Box, Typography, Button, Grid, TextField, InputAdornment, InputLabel } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import { EmployeeContext } from './EmployeeContext';
import axiosInstance from '../../utils/axiosInstance';
import Swal from 'sweetalert2';

const PRIMARY_COLOR = "#8C257C";

const AccountInformation = ({ onNext, onBack }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});
  const { employeeId } = useContext(EmployeeContext);
  const userId = employeeId;

  useEffect(() => {
    const fetchAccountInfo = async () => {
      if (!userId) return;
      try {
        const response = await axiosInstance.post('/api/account_info/', { user_id: userId });
        if (response.data.status === 'success') {
          const { username, email } = response.data.data;
          setUsername(username || '');
          setEmail(email || '');
        }
      } catch (error) { console.error(error); }
    };
    fetchAccountInfo();
  }, [userId]);

  const validate = () => {
    const newErrors = {};
    let isValid = true;
    if(!username.trim()) { newErrors.username = true; isValid = false; }
    if(!email.trim()) { newErrors.email = true; isValid = false; }

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!validate()) return;

    Swal.fire({ title: 'Saving...', didOpen: () => Swal.showLoading() });
    try {
      await axiosInstance.patch('/api/account_info/', { user_id: userId, username, email });
      Swal.close();
      if (onNext) onNext();
    } catch (error) {
      Swal.fire('Error', 'Failed to save account information.', 'error');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 700, p: 3 }}>
      <Box display="flex" alignItems="center" gap={1} mb={2}>
        <PhoneIphoneIcon sx={{ color: PRIMARY_COLOR }} />
        <Typography variant="h6" color={PRIMARY_COLOR} fontWeight="bold">Account Information</Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <InputLabel required sx={{ mb: 1 }}>Username</InputLabel>
          <TextField 
            fullWidth size="small" 
            value={username} 
            onChange={(e) => { setUsername(e.target.value); setErrors(p => ({...p, username: false})); }} 
            error={!!errors.username}
            required 
            InputProps={{ startAdornment: (<InputAdornment position="start"><PersonIcon /></InputAdornment>) }} 
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputLabel required sx={{ mb: 1 }}>Account Email</InputLabel>
          <TextField 
            fullWidth size="small" type="email"
            value={email} 
            onChange={(e) => { setEmail(e.target.value); setErrors(p => ({...p, email: false})); }} 
            error={!!errors.email}
            required 
            InputProps={{ startAdornment: (<InputAdornment position="start"><EmailIcon /></InputAdornment>) }} 
          />
        </Grid>
      </Grid>

      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
        <Button onClick={onBack} variant="outlined" sx={{ borderRadius: '8px', borderColor: '#ccc', color: '#555', '&:hover': { borderColor: '#8C257C', color: '#8C257C' } }}>Back</Button>
        <Button type="submit" variant="contained" sx={{ background: `linear-gradient(135deg, ${PRIMARY_COLOR} 0%, #6d1d60 100%)`, color: 'white', borderRadius: '8px' }}>Save & Next</Button>
      </Box>
    </Box>
  );
};

export default AccountInformation;