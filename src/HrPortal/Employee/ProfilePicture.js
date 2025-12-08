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
// import { EmployeeContext } from '../../SuperAdmin/Employee/EmployeeContext';
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



// import React, { useState, useContext } from 'react';
// import { Box, Typography, Button, InputLabel, FormHelperText } from '@mui/material';
// import ImageIcon from '@mui/icons-material/Image';
// import axiosInstance from '../../utils/axiosInstance';
// import { EmployeeContext } from './EmployeeContext';
// import Swal from 'sweetalert2';

// const PRIMARY_COLOR = "#8C257C";

// const ProfilePicture = ({ onNext, onBack }) => {
//   const [file, setFile] = useState(null);
//   const [fileName, setFileName] = useState('');
//   const [error, setError] = useState(false);
//   const { employeeId } = useContext(EmployeeContext);

//   const handleFileChange = (e) => {
//     if (e.target.files.length > 0) {
//       setFile(e.target.files[0]);
//       setFileName(e.target.files[0].name);
//       setError(false);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!file) { 
//         setError(true);
//         Swal.fire({
//             icon: 'error',
//             title: 'No File Selected',
//             text: 'Please upload a profile picture to continue.',
//             confirmButtonColor: PRIMARY_COLOR
//         });
//         return; 
//     }

//     const formData = new FormData();
//     formData.append('user_id', employeeId);
//     formData.append('file', file);

//     try {
//       Swal.showLoading();
//       await axiosInstance.post('/api/update_profile_photo/', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
//       Swal.close();
//       setFile(null);
//       if (onNext) onNext();
//     } catch (error) { Swal.fire('Upload Failed', 'Error uploading file.', 'error'); }
//   };

//   return (
//     <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 600, p: 3 }}>
//       <Box display="flex" alignItems="center" gap={1} mb={2}>
//         <ImageIcon sx={{ color: PRIMARY_COLOR }} />
//         <Typography variant="h6" color={PRIMARY_COLOR} fontWeight="bold">Profile Picture</Typography>
//       </Box>

//       <InputLabel sx={{ mb: 1, color: error ? 'error.main' : 'text.primary' }}>Select Profile Picture *</InputLabel>
//       <Button 
//         variant="outlined" 
//         component="label" 
//         fullWidth 
//         sx={{ 
//             justifyContent: 'flex-start', 
//             textTransform: 'none', 
//             borderColor: error ? 'error.main' : PRIMARY_COLOR, 
//             color: error ? 'error.main' : PRIMARY_COLOR,
//             '&:hover': { borderColor: error ? 'error.main' : PRIMARY_COLOR }
//         }}
//       >
//         {fileName || 'Choose file...'}
//         <input type="file" accept="image/*" hidden onChange={handleFileChange} />
//       </Button>
//       {error && <FormHelperText error>Profile picture is required.</FormHelperText>}

//       <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
//         <Button onClick={onBack} variant="outlined" sx={{ borderRadius: '8px', borderColor: '#ccc', color: '#555', '&:hover': { borderColor: '#8C257C', color: '#8C257C' } }}>Back</Button>
//         <Button type="submit" variant="contained" sx={{ background: `linear-gradient(135deg, ${PRIMARY_COLOR} 0%, #6d1d60 100%)`, color: 'white', borderRadius: '8px' }}>
//           Upload & Next
//         </Button>
//       </Box>
//     </Box>
//   );
// };

// export default ProfilePicture;  


// import React, { useState, useContext, useEffect } from 'react';
// import { Box, Typography, Button, InputLabel, FormHelperText, Avatar } from '@mui/material';
// import ImageIcon from '@mui/icons-material/Image';
// import axiosInstance from '../../utils/axiosInstance';
// import { EmployeeContext } from './EmployeeContext';
// import Swal from 'sweetalert2';

// const PRIMARY_COLOR = "#8C257C";

// const ProfilePicture = ({ onNext, onBack }) => {
//   const [file, setFile] = useState(null);
//   const [fileName, setFileName] = useState('');
//   const [error, setError] = useState(false);
//   const [preview, setPreview] = useState('');
//   const { employeeId } = useContext(EmployeeContext);

//   useEffect(() => {
//     if (employeeId) {
//       setPreview(`https://tdtlworld.com/hrms-backend/api/get_profile_photo/${employeeId}/`);
//     }
//   }, [employeeId]);

//   const handleFileChange = (e) => {
//     if (e.target.files.length > 0) {
//       const selectedFile = e.target.files[0];
//       setFile(selectedFile);
//       setFileName(selectedFile.name);
//       setPreview(URL.createObjectURL(selectedFile));
//       setError(false);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!file) { 
//         setError(true);
//         Swal.fire({
//             icon: 'error',
//             title: 'No File Selected',
//             text: 'Please upload a profile picture to continue.',
//             confirmButtonColor: PRIMARY_COLOR
//         });
//         return; 
//     }

//     const formData = new FormData();
//     formData.append('user_id', employeeId);
//     formData.append('file', file);

//     try {
//       Swal.showLoading();
//       await axiosInstance.post('/api/update_profile_photo/', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
//       Swal.close();
//       setFile(null);
//       if (onNext) onNext();
//     } catch (error) { Swal.fire('Upload Failed', 'Error uploading file.', 'error'); }
//   };

//   return (
//     <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 600, p: 3 }}>
//       <Box display="flex" alignItems="center" gap={1} mb={2}>
//         <ImageIcon sx={{ color: PRIMARY_COLOR }} />
//         <Typography variant="h6" color={PRIMARY_COLOR} fontWeight="bold">Profile Picture</Typography>
//       </Box>

//       <Box display="flex" justifyContent="center" mb={3}>
//         <Avatar 
//             src={preview} 
//             alt="Profile Preview"
//             sx={{ 
//                 width: 120, 
//                 height: 120, 
//                 border: `3px solid ${PRIMARY_COLOR}`,
//                 bgcolor: '#f0f0f0'
//             }} 
//         />
//       </Box>

//       <InputLabel sx={{ mb: 1, color: error ? 'error.main' : 'text.primary' }}>Select Profile Picture *</InputLabel>
//       <Button 
//         variant="outlined" 
//         component="label" 
//         fullWidth 
//         sx={{ 
//             justifyContent: 'flex-start', 
//             textTransform: 'none', 
//             borderColor: error ? 'error.main' : PRIMARY_COLOR, 
//             color: error ? 'error.main' : PRIMARY_COLOR,
//             '&:hover': { borderColor: error ? 'error.main' : PRIMARY_COLOR }
//         }}
//       >
//         {fileName || 'Choose file...'}
//         <input type="file" accept="image/*" hidden onChange={handleFileChange} />
//       </Button>
//       {error && <FormHelperText error>Profile picture is required.</FormHelperText>}

//       <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
//         <Button onClick={onBack} variant="outlined" sx={{ borderRadius: '8px', borderColor: '#ccc', color: '#555', '&:hover': { borderColor: '#8C257C', color: '#8C257C' } }}>Back</Button>
//         <Button type="submit" variant="contained" sx={{ background: `linear-gradient(135deg, ${PRIMARY_COLOR} 0%, #6d1d60 100%)`, color: 'white', borderRadius: '8px' }}>
//           Upload & Next
//         </Button>
//       </Box>
//     </Box>
//   );
// };

// export default ProfilePicture;

// import React, { useState, useContext, useEffect } from 'react';
// import { Box, Typography, Button, InputLabel, FormHelperText, Avatar, CircularProgress } from '@mui/material';
// import ImageIcon from '@mui/icons-material/Image';
// import axiosInstance from '../../utils/axiosInstance';
// import { EmployeeContext } from './EmployeeContext';
// import Swal from 'sweetalert2';
// import { useLocation, useParams } from 'react-router-dom';

// const PRIMARY_COLOR = "#8C257C";
// const API_ENDPOINT = 'https://tdtlworld.com/hrms-backend/api/update_profile_photo/';
// const GET_PHOTO_ENDPOINT = 'https://tdtlworld.com/hrms-backend/api/get_profile_photo/';

// const ProfilePicture = ({ onNext, onBack }) => {
//   const [file, setFile] = useState(null);
//   const [fileName, setFileName] = useState('');
//   const [error, setError] = useState(false);
//   const [preview, setPreview] = useState('');
//   const [loading, setLoading] = useState(true);
  
//   const { employeeId } = useContext(EmployeeContext);
//   const params = useParams();
//   const location = useLocation();

//   // Determine effective user id (priority: query ?id=, route param, EmployeeContext)
//   const getEffectiveId = () => {
//     try {
//       const q = new URLSearchParams(location.search);
//       const qId = q.get('id');
//       if (qId) return qId;
//     } catch (e) { /* ignore */ }

//     if (params?.id) return params.id;
//     return employeeId;
//   };

//   useEffect(() => {
//     const effectiveId = getEffectiveId();
//     if (effectiveId) {
//       setPreview(`${GET_PHOTO_ENDPOINT}${effectiveId}/`);
//     }
//     setLoading(false);
//   }, [employeeId, location.search, params.id]);

//   const handleFileChange = (e) => {
//     if (e.target.files.length > 0) {
//       const selectedFile = e.target.files[0];
      
//       // Validate file type
//       const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'];
//       if (!validTypes.includes(selectedFile.type)) {
//         Swal.fire({
//           icon: 'error',
//           title: 'Invalid File Type',
//           text: 'Please upload only PNG, JPG, JPEG, or GIF files.',
//           confirmButtonColor: PRIMARY_COLOR
//         });
//         return;
//       }

//       // Validate file size (max 5MB)
//       if (selectedFile.size > 5 * 1024 * 1024) {
//         Swal.fire({
//           icon: 'error',
//           title: 'File Too Large',
//           text: 'Please upload a file smaller than 5MB.',
//           confirmButtonColor: PRIMARY_COLOR
//         });
//         return;
//       }

//       setFile(selectedFile);
//       setFileName(selectedFile.name);
//       setPreview(URL.createObjectURL(selectedFile));
//       setError(false);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     const effectiveId = getEffectiveId();
//     if (!effectiveId) {
//       Swal.fire({
//         icon: 'error',
//         title: 'Missing ID',
//         text: 'No employee id found in URL or context.',
//         confirmButtonColor: PRIMARY_COLOR
//       });
//       return;
//     }

//     if (!file) { 
//       setError(true);
//       Swal.fire({
//         icon: 'error',
//         title: 'No File Selected',
//         text: 'Please upload a profile picture to continue.',
//         confirmButtonColor: PRIMARY_COLOR
//       });
//       return; 
//     }

//     const formData = new FormData();
//     formData.append('user_id', effectiveId);
//     formData.append('file', file);

//     try {
//       Swal.fire({
//         title: 'Uploading...',
//         text: 'Please wait while your profile picture is being updated.',
//         allowOutsideClick: false,
//         didOpen: () => Swal.showLoading()
//       });

//       await axiosInstance.post(API_ENDPOINT, formData, { 
//         headers: { 'Content-Type': 'multipart/form-data' } 
//       });

//       Swal.close();
//       Swal.fire({
//         icon: 'success',
//         title: 'Success!',
//         text: 'Your profile picture has been updated successfully.',
//         confirmButtonColor: PRIMARY_COLOR
//       });

//       setFile(null);
//       setFileName('');
//       if (onNext) onNext();
//     } catch (error) {
//       console.error('Upload error:', error);
//       const errorMessage = error.response?.data?.message || 'Error uploading file. Please try again.';
//       Swal.fire({
//         icon: 'error',
//         title: 'Upload Failed',
//         text: errorMessage,
//         confirmButtonColor: PRIMARY_COLOR
//       });
//     }
//   };

//   if (loading) {
//     return <Box display="flex" justifyContent="center" p={4}><CircularProgress /></Box>;
//   }

//   return (
//     <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 600, p: 3 }}>
//       <Box display="flex" alignItems="center" gap={1} mb={2}>
//         <ImageIcon sx={{ color: PRIMARY_COLOR }} />
//         <Typography variant="h6" color={PRIMARY_COLOR} fontWeight="bold">Profile Picture</Typography>
//       </Box>

//       <Box display="flex" justifyContent="center" mb={3}>
//         <Avatar 
//           src={preview} 
//           alt="Profile Preview"
//           sx={{ 
//             width: 120, 
//             height: 120, 
//             border: `3px solid ${PRIMARY_COLOR}`,
//             bgcolor: '#f0f0f0',
//             fontSize: '3rem'
//           }} 
//         />
//       </Box>

//       <InputLabel sx={{ mb: 1, color: error ? 'error.main' : 'text.primary', fontWeight: 600 }}>
//         Select Profile Picture *
//       </InputLabel>
//       <Button 
//         variant="outlined" 
//         component="label" 
//         fullWidth 
//         sx={{ 
//           justifyContent: 'flex-start', 
//           textTransform: 'none', 
//           borderColor: error ? 'error.main' : PRIMARY_COLOR, 
//           color: error ? 'error.main' : PRIMARY_COLOR,
//           '&:hover': { borderColor: error ? 'error.main' : PRIMARY_COLOR, bgcolor: 'rgba(140, 37, 124, 0.04)' }
//         }}
//       >
//         {fileName || 'Choose file...'}
//         <input type="file" accept="image/png,image/jpeg,image/jpg,image/gif" hidden onChange={handleFileChange} />
//       </Button>
//       {error && <FormHelperText error>Profile picture is required.</FormHelperText>}
//       <FormHelperText sx={{ mt: 1 }}>Allowed formats: PNG, JPG, JPEG, GIF (Max 5MB)</FormHelperText>

//       <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
//         <Button 
//           onClick={onBack} 
//           variant="outlined" 
//           sx={{ 
//             borderRadius: '8px', 
//             borderColor: '#ccc', 
//             color: '#555', 
//             '&:hover': { borderColor: PRIMARY_COLOR, color: PRIMARY_COLOR } 
//           }}
//         >
//           Back
//         </Button>
//         <Button 
//           type="submit" 
//           variant="contained" 
//           sx={{ 
//             background: `linear-gradient(135deg, ${PRIMARY_COLOR} 0%, #6d1d60 100%)`, 
//             color: 'white', 
//             borderRadius: '8px' 
//           }}
//         >
//           Upload & Next
//         </Button>
//       </Box>
//     </Box>
//   );
// };

// export default ProfilePicture;


// // ...existing code...
// import React, { useState, useContext, useEffect } from 'react';
// import { Box, Typography, Button, InputLabel, FormHelperText, Avatar, CircularProgress } from '@mui/material';
// import ImageIcon from '@mui/icons-material/Image';
// import axiosInstance from '../../utils/axiosInstance';
// import { EmployeeContext } from './EmployeeContext';
// import Swal from 'sweetalert2';
// import { useLocation, useParams } from 'react-router-dom';

// const PRIMARY_COLOR = "#8C257C";
// const API_ENDPOINT = 'https://tdtlworld.com/hrms-backend/api/update_profile_photo/';
// const GET_PHOTO_ENDPOINT = 'https://tdtlworld.com/hrms-backend/api/get_profile_photo/';

// const ProfilePicture = ({ onNext, onBack }) => {
//   const [file, setFile] = useState(null);
//   const [fileName, setFileName] = useState('');
//   const [error, setError] = useState(false);
//   const [preview, setPreview] = useState('');
//   const [loading, setLoading] = useState(true);

//   const { employeeId } = useContext(EmployeeContext);
//   const params = useParams();
//   const location = useLocation();

//   const getEffectiveId = () => {
//     try {
//       const q = new URLSearchParams(location.search);
//       const qId = q.get('id');
//       if (qId) return qId;
//     } catch (e) { /* ignore */ }
//     if (params?.id) return params.id;
//     return employeeId;
//   };

//   const getEmployeeCode = () => {
//     try {
//       const sessionCode = sessionStorage.getItem('employee_id');
//       if (sessionCode) return sessionCode;
//     } catch (e) { /* ignore */ }

//     try {
//       const q = new URLSearchParams(location.search);
//       const qCode = q.get('employee_id') || q.get('emp_code');
//       if (qCode) return qCode;
//     } catch (e) { /* ignore */ }

//     if (params?.employee_id) return params.employee_id;
//     if (params?.emp_code) return params.emp_code;
//     return '';
//   };

//   const buildPreviewUrl = (numericId, empCode) => {
//     if (!numericId) return '';
//     if (empCode) return `${GET_PHOTO_ENDPOINT}${numericId}/${encodeURIComponent(empCode)}/`;
//     return `${GET_PHOTO_ENDPOINT}${numericId}/`;
//   };

//   useEffect(() => {
//     const effectiveId = getEffectiveId();
//     const empCode = getEmployeeCode();
//     if (effectiveId) {
//       setPreview(buildPreviewUrl(effectiveId, empCode));
//     } else {
//       setPreview('');
//     }
//     setLoading(false);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [employeeId, location.search, params.id, params.employee_id, params.emp_code]);

//   const handleFileChange = (e) => {
//     if (e.target.files && e.target.files.length > 0) {
//       const selectedFile = e.target.files[0];
//       const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'];
//       if (!validTypes.includes(selectedFile.type)) {
//         Swal.fire({ icon: 'error', title: 'Invalid File Type', text: 'Please upload PNG/JPG/JPEG/GIF.', confirmButtonColor: PRIMARY_COLOR });
//         return;
//       }
//       if (selectedFile.size > 5 * 1024 * 1024) {
//         Swal.fire({ icon: 'error', title: 'File Too Large', text: 'Max 5MB.', confirmButtonColor: PRIMARY_COLOR });
//         return;
//       }
//       setFile(selectedFile);
//       setFileName(selectedFile.name);
//       setPreview(URL.createObjectURL(selectedFile));
//       setError(false);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const effectiveId = getEffectiveId();
//     if (!effectiveId) {
//       Swal.fire({ icon: 'error', title: 'Missing ID', text: 'No employee id found in URL or context.', confirmButtonColor: PRIMARY_COLOR });
//       return;
//     }
//     if (!file) {
//       setError(true);
//       Swal.fire({ icon: 'error', title: 'No File Selected', text: 'Please upload a profile picture to continue.', confirmButtonColor: PRIMARY_COLOR });
//       return;
//     }

//     const formData = new FormData();
//     formData.append('user_id', effectiveId);
//     formData.append('file', file);

//     try {
//       Swal.fire({ title: 'Uploading...', allowOutsideClick: false, didOpen: () => Swal.showLoading() });
//       await axiosInstance.post(API_ENDPOINT, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
//       Swal.close();
//       Swal.fire({ icon: 'success', title: 'Success!', text: 'Profile picture updated.', confirmButtonColor: PRIMARY_COLOR });
//       setFile(null);
//       setFileName('');
//       const empCode = getEmployeeCode();
//       setPreview(buildPreviewUrl(effectiveId, empCode));
//       if (onNext) onNext();
//     } catch (err) {
//       console.error('Upload error:', err);
//       const errorMessage = err.response?.data?.message || 'Error uploading file. Please try again.';
//       Swal.fire({ icon: 'error', title: 'Upload Failed', text: errorMessage, confirmButtonColor: PRIMARY_COLOR });
//     }
//   };

//   if (loading) {
//     return <Box display="flex" justifyContent="center" p={4}><CircularProgress sx={{ color: PRIMARY_COLOR }} /></Box>;
//   }

//   return (
//     <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 600, p: 3 }}>
//       <Box display="flex" alignItems="center" gap={1} mb={2}>
//         <ImageIcon sx={{ color: PRIMARY_COLOR }} />
//         <Typography variant="h6" color={PRIMARY_COLOR} fontWeight="bold">Profile Picture</Typography>
//       </Box>

//       <Box display="flex" justifyContent="center" mb={3}>
//         <Avatar
//           src={preview}
//           alt="Profile Preview"
//           sx={{ width: 120, height: 120, border: `3px solid ${PRIMARY_COLOR}`, bgcolor: '#f0f0f0', fontSize: '3rem' }}
//         />
//       </Box>

//       <InputLabel sx={{ mb: 1, color: error ? 'error.main' : 'text.primary', fontWeight: 600 }}>Select Profile Picture *</InputLabel>
//       <Button variant="outlined" component="label" fullWidth sx={{ justifyContent: 'flex-start', textTransform: 'none', borderColor: error ? 'error.main' : PRIMARY_COLOR, color: error ? 'error.main' : PRIMARY_COLOR, '&:hover': { borderColor: error ? 'error.main' : PRIMARY_COLOR, bgcolor: 'rgba(140, 37, 124, 0.04)' } }}>
//         {fileName || 'Choose file...'}
//         <input type="file" accept="image/png,image/jpeg,image/jpg,image/gif" hidden onChange={handleFileChange} />
//       </Button>
//       {error && <FormHelperText error>Profile picture is required.</FormHelperText>}
//       <FormHelperText sx={{ mt: 1 }}>Allowed formats: PNG, JPG, JPEG, GIF (Max 5MB)</FormHelperText>

//       <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
//         <Button onClick={onBack} variant="outlined" sx={{ borderRadius: '8px', borderColor: '#ccc', color: '#555', '&:hover': { borderColor: PRIMARY_COLOR, color: PRIMARY_COLOR } }}>Back</Button>
//         <Button type="submit" variant="contained" sx={{ background: `linear-gradient(135deg, ${PRIMARY_COLOR} 0%, #6d1d60 100%)`, color: 'white', borderRadius: '8px' }}>Upload & Next</Button>
//       </Box>
//     </Box>
//   );
// };

// export default ProfilePicture;
// // ...existing code...







// import React, { useState, useContext } from 'react';
// import { Box, Typography, Button, InputLabel, FormHelperText } from '@mui/material';
// import ImageIcon from '@mui/icons-material/Image';
// import axiosInstance from '../../utils/axiosInstance';
// import { EmployeeContext } from './EmployeeContext';
// import Swal from 'sweetalert2';

// const PRIMARY_COLOR = "#8C257C";

// const ProfilePicture = ({ onNext, onBack }) => {
//   const [file, setFile] = useState(null);
//   const [fileName, setFileName] = useState('');
//   const [error, setError] = useState(false);
//   const { employeeId } = useContext(EmployeeContext);

//   const handleFileChange = (e) => {
//     if (e.target.files.length > 0) {
//       setFile(e.target.files[0]);
//       setFileName(e.target.files[0].name);
//       setError(false);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!file) { 
//         setError(true);
//         Swal.fire({
//             icon: 'error',
//             title: 'No File Selected',
//             text: 'Please upload a profile picture to continue.',
//             confirmButtonColor: PRIMARY_COLOR
//         });
//         return; 
//     }

//     const formData = new FormData();
//     formData.append('user_id', employeeId);
//     formData.append('file', file);

//     try {
//       Swal.showLoading();
//       await axiosInstance.post('/api/update_profile_photo/', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
//       Swal.close();
//       setFile(null);
//       if (onNext) onNext();
//     } catch (error) { Swal.fire('Upload Failed', 'Error uploading file.', 'error'); }
//   };

//   return (
//     <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 600, p: 3 }}>
//       <Box display="flex" alignItems="center" gap={1} mb={2}>
//         <ImageIcon sx={{ color: PRIMARY_COLOR }} />
//         <Typography variant="h6" color={PRIMARY_COLOR} fontWeight="bold">Profile Picture</Typography>
//       </Box>

//       <InputLabel sx={{ mb: 1, color: error ? 'error.main' : 'text.primary' }}>Select Profile Picture *</InputLabel>
//       <Button 
//         variant="outlined" 
//         component="label" 
//         fullWidth 
//         sx={{ 
//             justifyContent: 'flex-start', 
//             textTransform: 'none', 
//             borderColor: error ? 'error.main' : PRIMARY_COLOR, 
//             color: error ? 'error.main' : PRIMARY_COLOR,
//             '&:hover': { borderColor: error ? 'error.main' : PRIMARY_COLOR }
//         }}
//       >
//         {fileName || 'Choose file...'}
//         <input type="file" accept="image/*" hidden onChange={handleFileChange} />
//       </Button>
//       {error && <FormHelperText error>Profile picture is required.</FormHelperText>}

//       <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
//         <Button onClick={onBack} variant="outlined" sx={{ borderRadius: '8px', borderColor: '#ccc', color: '#555', '&:hover': { borderColor: '#8C257C', color: '#8C257C' } }}>Back</Button>
//         <Button type="submit" variant="contained" sx={{ background: `linear-gradient(135deg, ${PRIMARY_COLOR} 0%, #6d1d60 100%)`, color: 'white', borderRadius: '8px' }}>
//           Upload & Next
//         </Button>
//       </Box>
//     </Box>
//   );
// };

// export default ProfilePicture;  


import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, InputLabel, FormHelperText, Avatar, CircularProgress } from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import axiosInstance from '../../utils/axiosInstance';
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom';

const PRIMARY_COLOR = "#8C257C";
const BASE_URL = "https://tdtlworld.com/hrms-backend"; // Base URL for prepending to relative paths

const ProfilePicture = ({ onNext, onBack }) => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  
  const [fetchedPhoto, setFetchedPhoto] = useState(null);
  const [loadingPhoto, setLoadingPhoto] = useState(false);
  const [error, setError] = useState(false);

  // Get ID (e.g., 935) from URL
  const { id } = useParams(); 

  // -------------------------------------------------------
  // API INTEGRATION: Fetch Profile Photo Chain
  // -------------------------------------------------------
  useEffect(() => {
    const getProfilePhotoChain = async () => {
      if (!id) return; 

      setLoadingPhoto(true);
      try {
        // Step 1: Call edit_employee
        const employeeResponse = await axiosInstance.get(`/api/edit_employee/${id}/`);
        const resData = employeeResponse.data;
        
        // Extract Employee ID (e.g., V1201) - Robust Check
        let customEmployeeId = null;
        if (resData.employee_id) customEmployeeId = resData.employee_id;
        else if (resData.data?.employee_id) customEmployeeId = resData.data.employee_id;
        else if (Array.isArray(resData) && resData[0]?.employee_id) customEmployeeId = resData[0].employee_id;
        else if (Array.isArray(resData.data) && resData.data[0]?.employee_id) customEmployeeId = resData.data[0].employee_id;

        if (customEmployeeId) {
          // Step 2: Call get_profile_photo (Expect JSON, NOT Blob)
          // Removed responseType: 'blob'
          const photoResponse = await axiosInstance.get(`/api/get_profile_photo/${customEmployeeId}/`);
          
          console.log("Photo API Response:", photoResponse.data); // Debugging

          // Extract the URL string from the response
          // API might return: { "profile_photo": "/media/..." } or just "/media/..." or { "data": "..." }
          let photoPath = 
            photoResponse.data.profile_photo || 
            photoResponse.data.image || 
            photoResponse.data.url || 
            photoResponse.data.data ||
            photoResponse.data;

          // If we found a path string
          if (photoPath && typeof photoPath === 'string') {
            // If it's a relative path (e.g. /media/...), prepend the domain
            if (!photoPath.startsWith('http')) {
                // Ensure no double slashes when joining
                const cleanPath = photoPath.startsWith('/') ? photoPath : `/${photoPath}`;
                photoPath = `${BASE_URL}${cleanPath}`;
            }
            setFetchedPhoto(photoPath);
          }
        }
      } catch (err) {
        console.error("Error fetching profile photo chain:", err);
      } finally {
        setLoadingPhoto(false);
      }
    };

    getProfilePhotoChain();
  }, [id]);

  // -------------------------------------------------------
  // UPLOAD LOGIC
  // -------------------------------------------------------
  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setFileName(e.target.files[0].name);
      setError(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!file && !fetchedPhoto) { 
        setError(true);
        Swal.fire({
            icon: 'error',
            title: 'No File Selected',
            text: 'Please upload a profile picture to continue.',
            confirmButtonColor: PRIMARY_COLOR
        });
        return; 
    }

    // Proceed if existing photo exists and no new file selected
    if (!file && fetchedPhoto) {
        if (onNext) onNext();
        return;
    }

    const formData = new FormData();
    formData.append('user_id', id); 
    formData.append('file', file);

    try {
      Swal.showLoading();
      await axiosInstance.post('/api/update_profile_photo/', formData, { 
          headers: { 'Content-Type': 'multipart/form-data' } 
      });
      Swal.close();
      setFile(null);
      if (onNext) onNext();
    } catch (error) { 
        console.error(error);
        Swal.fire('Upload Failed', 'Error uploading file.', 'error'); 
    }
  };

  const displayImage = file ? URL.createObjectURL(file) : fetchedPhoto;

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 600, p: 3 }}>
      <Box display="flex" alignItems="center" gap={1} mb={2}>
        <ImageIcon sx={{ color: PRIMARY_COLOR }} />
        <Typography variant="h6" color={PRIMARY_COLOR} fontWeight="bold">Profile Picture</Typography>
      </Box>

      {/* PHOTO PREVIEW */}
      <Box display="flex" justifyContent="center" mb={3}>
        {loadingPhoto ? (
          <CircularProgress sx={{ color: PRIMARY_COLOR }} />
        ) : (
          <Avatar
            src={displayImage}
            alt="Profile Preview"
            sx={{ 
                width: 150, 
                height: 150, 
                border: `3px solid ${PRIMARY_COLOR}`,
                bgcolor: '#f5f5f5'
            }}
          >
            <ImageIcon sx={{ width: 80, height: 80, color: '#ccc' }} />
          </Avatar>
        )}
      </Box>

      <InputLabel sx={{ mb: 1, color: error ? 'error.main' : 'text.primary' }}>Select Profile Picture *</InputLabel>
      <Button 
        variant="outlined" 
        component="label" 
        fullWidth 
        sx={{ 
            justifyContent: 'flex-start', 
            textTransform: 'none', 
            borderColor: error ? 'error.main' : PRIMARY_COLOR, 
            color: error ? 'error.main' : PRIMARY_COLOR,
            '&:hover': { borderColor: error ? 'error.main' : PRIMARY_COLOR }
        }}
      >
        {fileName || 'Choose file...'}
        <input type="file" accept="image/*" hidden onChange={handleFileChange} />
      </Button>
      {error && <FormHelperText error>Profile picture is required.</FormHelperText>}

      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
        <Button onClick={onBack} variant="outlined" sx={{ borderRadius: '8px', borderColor: '#ccc', color: '#555', '&:hover': { borderColor: '#8C257C', color: '#8C257C' } }}>Back</Button>
        <Button type="submit" variant="contained" sx={{ background: `linear-gradient(135deg, ${PRIMARY_COLOR} 0%, #6d1d60 100%)`, color: 'white', borderRadius: '8px' }}>
          {file ? 'Upload & Next' : 'Next'}
        </Button>
      </Box>
    </Box>
  );
};

export default ProfilePicture;