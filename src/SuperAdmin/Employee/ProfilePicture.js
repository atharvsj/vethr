// import React, { useState, useContext, useEffect } from 'react';
// import {
//   Box,
//   Typography,
//   Button,
//   InputLabel,
// } from '@mui/material';
// import ImageIcon from '@mui/icons-material/Image';
// import axiosInstance from '../../utils/axiosInstance';
// import { EmployeeContext } from './EmployeeContext';
// import Swal from 'sweetalert2';  // Import SweetAlert2
// import withReactContent from 'sweetalert2-react-content';

// const MySwal = withReactContent(Swal);

// const ProfilePicture = () => {
//   const [file, setFile] = useState(null);
//   const [fileName, setFileName] = useState('');
//   const { employeeId } = useContext(EmployeeContext);

//   useEffect(() => {
//     console.log("employee id from context in profile photo :", employeeId);
//   }, [employeeId]);

//   const handleFileChange = (e) => {
//     if (e.target.files.length > 0) {
//       setFile(e.target.files[0]);
//       setFileName(e.target.files[0].name);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!file || !employeeId) {
//       return MySwal.fire({
//         icon: 'warning',
//         title: 'Missing Information',
//         text: 'Please select a file and ensure employee ID is available.',
//       });
//     }

//     const formData = new FormData();
//     formData.append('user_id', employeeId);
//     formData.append('file', file);

//     try {
//       await axiosInstance.post('/api/update_profile_photo/', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       await MySwal.fire({
//         icon: 'success',
//         title: 'Success',
//         text: 'Profile picture updated!',
//       });

//       // Optionally reset file and filename
//       setFile(null);
//       setFileName('');
//     } catch (error) {
//       console.error('Error uploading file:', error);
//       return MySwal.fire({
//         icon: 'error',
//         title: 'Upload Failed',
//         text: 'Upload failed. Please try again.',
//       });
//     }
//   };

//   return (
//     <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 600 }}>
//       <Box display="flex" alignItems="center" gap={1} mb={2}>
//         <ImageIcon color="primary" />
//         <Typography variant="h6">Profile Picture</Typography>
//       </Box>

//       <InputLabel required sx={{ mb: 1 }}>
//         Profile Picture
//       </InputLabel>

//       <Button
//         variant="outlined"
//         component="label"
//         fullWidth
//         sx={{ justifyContent: 'flex-start', textTransform: 'none' }}
//       >
//         {fileName || 'Choose file...'}
//         <input
//           type="file"
//           accept="image/png, image/jpeg, image/jpg, image/gif"
//           hidden
//           onChange={handleFileChange}
//         />
//       </Button>

//       <Typography variant="caption" sx={{ mt: 1, display: 'block' }}>
//         Upload files only: gif, png, jpg, jpeg
//       </Typography>

//       <Box sx={{ mt: 3 }}>
//         <Button type="submit" variant="contained" color="primary">
//           Update Picture
//         </Button>
//       </Box>
//     </Box>
//   );
// };

// // export default ProfilePicture;
// import React, { useState, useContext, useEffect } from 'react';
// import {
//   Box,
//   Typography,
//   Button,
//   InputLabel,
// } from '@mui/material';
// import ImageIcon from '@mui/icons-material/Image';
// import axiosInstance from '../../utils/axiosInstance';
// import { EmployeeContext } from './EmployeeContext';
// import Swal from 'sweetalert2';
// import withReactContent from 'sweetalert2-react-content';

// const MySwal = withReactContent(Swal);

// const ProfilePicture = () => {
//   const [file, setFile] = useState(null);
//   const [fileName, setFileName] = useState('');
//   const { employeeId } = useContext(EmployeeContext);

//   useEffect(() => {
//     // This effect is fine for debugging, no changes needed here.
//     console.log("employee id from context in profile photo :", employeeId);
//   }, [employeeId]);

//   const handleFileChange = (e) => {
//     if (e.target.files.length > 0) {
//       setFile(e.target.files[0]);
//       setFileName(e.target.files[0].name);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!file || !employeeId) {
//       return MySwal.fire({
//         icon: 'warning',
//         title: 'Missing Information',
//         text: 'Please select a file to upload.',
//       });
//     }

//     const formData = new FormData();
//     formData.append('user_id', employeeId);
//     formData.append('file', file);

//     // 1. Show a loading alert immediately
//     MySwal.fire({
//       title: 'Uploading...',
//       text: 'Please wait while your picture is being updated.',
//       allowOutsideClick: false,
//       didOpen: () => {
//         MySwal.showLoading();
//       },
//     });

//     try {
//       await axiosInstance.post('/api/update_profile_photo/', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       // 2. On success, the loading alert is replaced with the success message
//       await MySwal.fire({
//         icon: 'success',
//         title: 'Success!',
//         text: 'Your profile picture has been updated.',
//       });

//       // Reset file input after successful upload
//       setFile(null);
//       setFileName('');
//     } catch (error) {
//       console.error('Error uploading file:', error);
//       const errorMessage = error.response?.data?.message || 'The upload failed. Please try again.';
      
//       // 3. On error, the loading alert is replaced with the error message
//       return MySwal.fire({
//         icon: 'error',
//         title: 'Upload Failed',
//         text: errorMessage,
//       });
//     }
//   };

//   return (
//     <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 600, p: 3 }}>
//       <Box display="flex" alignItems="center" gap={1} mb={2}>
//         <ImageIcon color="primary" />
//         <Typography variant="h6">Profile Picture</Typography>
//       </Box>

//       <InputLabel required sx={{ mb: 1 }}>
//         Profile Picture
//       </InputLabel>


//       <Button
//         variant="outlined"
//         component="label"
//         fullWidth
//         sx={{ justifyContent: 'flex-start', textTransform: 'none' }}
//       >
//         {fileName || 'Choose file...'}
//         <input
//           type="file"
//           accept="image/png, image/jpeg, image/jpg, image/gif"
//           hidden
//           onChange={handleFileChange}
//         />
//       </Button>

//       <Typography variant="caption" sx={{ mt: 1, display: 'block' }}>
//         Allowed file types: png, jpg, jpeg, gif.
//       </Typography>

//       <Box sx={{ mt: 3 }}>
//         <Button type="submit" variant="contained" color="primary">
//           Update Picture
//         </Button>
//       </Box>
//     </Box>
//   );
// };

// export default ProfilePicture;



import React, { useState, useContext } from 'react';
import { Box, Typography, Button, InputLabel } from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import axiosInstance from '../../utils/axiosInstance';
import { EmployeeContext } from './EmployeeContext';
import Swal from 'sweetalert2';

const PRIMARY_COLOR = "#8C257C";

const ProfilePicture = ({ onNext, onBack }) => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const { employeeId } = useContext(EmployeeContext);

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setFileName(e.target.files[0].name);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) { if(onNext) onNext(); return; }

    const formData = new FormData();
    formData.append('user_id', employeeId);
    formData.append('file', file);

    try {
      Swal.showLoading();
      await axiosInstance.post('/api/update_profile_photo/', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      Swal.close();
      setFile(null);
      if (onNext) onNext();
    } catch (error) { Swal.fire('Upload Failed', 'Error uploading file.', 'error'); }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 600, p: 3 }}>
      <Box display="flex" alignItems="center" gap={1} mb={2}>
        <ImageIcon sx={{ color: PRIMARY_COLOR }} />
        <Typography variant="h6" color={PRIMARY_COLOR} fontWeight="bold">Profile Picture</Typography>
      </Box>

      <InputLabel sx={{ mb: 1 }}>Select Profile Picture</InputLabel>
      <Button variant="outlined" component="label" fullWidth sx={{ justifyContent: 'flex-start', textTransform: 'none', borderColor: PRIMARY_COLOR, color: PRIMARY_COLOR }}>
        {fileName || 'Choose file...'}
        <input type="file" accept="image/*" hidden onChange={handleFileChange} />
      </Button>

      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
        <Button onClick={onBack} variant="outlined" sx={{ 
  borderRadius: '8px', 
  borderColor: '#ccc', 
  color: '#555',
  '&:hover': { borderColor: '#8C257C', color: '#8C257C' } 
}}>Back</Button>
        <Button type="submit" variant="contained" sx={{ 
  background: 'linear-gradient(135deg, #8C257C 0%, #6d1d60 100%)', 
  color: 'white',
  boxShadow: '0 4px 12px rgba(140, 37, 124, 0.3)',
  borderRadius: '8px' 
}}>
          {file ? "Upload & Next" : "Skip & Next"}
        </Button>
      </Box>
    </Box>
  );
};

export default ProfilePicture;