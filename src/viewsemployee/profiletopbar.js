
// import { useState } from "react";
// import { Box, Typography, Paper, Avatar, Button, CircularProgress, Stack } from "@mui/material";
// import { styled } from '@mui/material/styles';
// import PersonIcon from '@mui/icons-material/Person';
// import axiosInstance from "../utils/axiosInstance";

// // Custom styled component to hide the default file input
// const Input = styled('input')({
//   display: 'none',
// });

// // The component now accepts an 'onBack' prop
// const ProfileTopBar = ({ onBack }) => {
//   const employeeId = localStorage.getItem("loggedInEmpId");

//   // State to manage the displayed picture, the selected file, and upload status
//   const [previewPicture, setPreviewPicture] = useState(null);
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [isUploading, setIsUploading] = useState(false);

//   // Handle file selection from the input
//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       setSelectedFile(file);
//       // Create a temporary URL for the live preview
//       setPreviewPicture(URL.createObjectURL(file));
//     }
//   };

//   // Handle the save/upload process
//   const handleSave = async () => {
//     if (!selectedFile) {
//       alert("Please select a file to upload.");
//       return;
//     }
//     if (!employeeId) {
//       alert("Cannot upload picture: User not identified.");
//       return;
//     }

//     setIsUploading(true);

//     const formData = new FormData();
//     formData.append("user_id", employeeId);
//     formData.append("file", selectedFile);

//     try {
//       const response = await axiosInstance.post('api/update_profile_photo/', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       if (response.data.status === 'success') {
//         alert('Profile picture updated successfully!');
//         // Reset the form after a successful upload
//         setSelectedFile(null);
//         setPreviewPicture(null);
//       } else {
//         alert(`Failed to update picture: ${response.data.message || 'Unknown error'}`);
//       }
//     } catch (error) {
//       console.error("Error uploading profile picture:", error);
//       alert("An error occurred while uploading the picture.");
//     } finally {
//       setIsUploading(false);
//     }
//   };

//   return (
//     <Box sx={{ padding: 2 }}>
//       <Typography variant="h6" gutterBottom>
//         Update Profile Picture
//       </Typography>
//       <Paper sx={{ padding: 3, textAlign: "center" }}>
//         <Avatar
//           src={previewPicture}
//           sx={{ width: 120, height: 120, margin: "0 auto 16px", border: '2px solid #ddd' }}
//         >
//           {/* Show a default icon if no image is selected for preview */}
//           {!previewPicture && <PersonIcon sx={{ width: 70, height: 70 }} />}
//         </Avatar>
        
//         {/* Use a Stack component to align buttons horizontally */}
//         <Stack direction="row" spacing={2} justifyContent="center">
//           {/* Back button added here */}
//           <Button variant="outlined" color="secondary" onClick={onBack}>
//             Back
//           </Button>

//           <label htmlFor="profile-picture-upload">
//             <Input accept="image/*" id="profile-picture-upload" type="file" onChange={handleFileChange} />
//             <Button variant="outlined" component="span">
//               Choose Image
//             </Button>
//           </label>
          
//           <Button 
//               variant="contained" 
//               color="primary" 
//               onClick={handleSave} 
//               disabled={!selectedFile || isUploading}
//           >
//             {isUploading ? <CircularProgress size={24} color="inherit" /> : "Save"}
//           </Button>
//         </Stack>
//       </Paper>
//     </Box>
//   );
// };

// export default ProfileTopBar;
// import { useState } from "react";
// import { Box, Typography, Paper, Avatar, Button, CircularProgress, Stack, Alert } from "@mui/material";
// import { styled } from '@mui/material/styles';
// import PersonIcon from '@mui/icons-material/Person';
// import axiosInstance from "../utils/axiosInstance";

// // Custom styled component to hide the default file input
// const Input = styled('input')({
//   display: 'none',
// });

// // The component now accepts an 'onBack' prop
// const ProfileTopBar = ({ onBack }) => {
//   const employeeId = localStorage.getItem("loggedInEmpId");

//   // State to manage the displayed picture, the selected file, and upload status
//   const [previewPicture, setPreviewPicture] = useState(null);
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [isUploading, setIsUploading] = useState(false);
//   // 1. State to hold messages for the form
//   const [message, setMessage] = useState({ text: '', type: '' });

//   // Handle file selection from the input
//   const handleFileChange = (event) => {
//     // Clear any previous messages when a new file is chosen
//     setMessage({ text: '', type: '' });
    
//     const file = event.target.files[0];
//     if (file) {
//       setSelectedFile(file);
//       // Create a temporary URL for the live preview
//       setPreviewPicture(URL.createObjectURL(file));
//     }
//   };

//   // Handle the save/upload process
//   const handleSave = async () => {
//     // 2. Clear and use the message state instead of alert()
//     setMessage({ text: '', type: '' });
//     if (!selectedFile) {
//       setMessage({ text: 'Please select a file to upload.', type: 'error' });
//       return;
//     }
//     if (!employeeId) {
//       setMessage({ text: 'Cannot upload picture: User not identified.', type: 'error' });
//       return;
//     }

//     setIsUploading(true);

//     const formData = new FormData();
//     formData.append("user_id", employeeId);
//     formData.append("file", selectedFile);

//     try {
//       const response = await axiosInstance.post('api/update_profile_photo/', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       if (response.data.status === 'success') {
//         setMessage({ text: 'Profile picture updated successfully!', type: 'success' });
//         // Reset the form after a successful upload
//         setSelectedFile(null);
//         setPreviewPicture(null);
//       } else {
//         setMessage({ text: response.data.message || 'Unknown error', type: 'error' });
//       }
//     } catch (error) {
//       console.error("Error uploading profile picture:", error);
//       const errorMessage = error.response?.data?.message || 'An error occurred while uploading the picture.';
//       setMessage({ text: errorMessage, type: 'error' });
//     } finally {
//       setIsUploading(false);
//     }
//   };

//   return (
//     <Box sx={{ padding: 2 }}>
//       <Typography variant="h6" gutterBottom>
//         Update Profile Picture
//       </Typography>
//       <Paper sx={{ padding: 3, textAlign: "center" }}>
//         <Avatar
//           src={previewPicture}
//           sx={{ width: 120, height: 120, margin: "0 auto 16px", border: '2px solid #ddd' }}
//         >
//           {/* Show a default icon if no image is selected for preview */}
//           {!previewPicture && <PersonIcon sx={{ width: 70, height: 70 }} />}
//         </Avatar>
        
//         {/* 3. This Stack now includes the Alert and is vertically centered */}
//         <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
//           {message.text && (
//             <Alert 
//               severity={message.type} 
//               onClose={() => setMessage({ text: '', type: '' })}
//             >
//               {message.text}
//             </Alert>
//           )}

//           <Button variant="outlined" color="secondary" onClick={onBack}>
//             Back
//           </Button>

//           <label htmlFor="profile-picture-upload">
//             <Input accept="image/*" id="profile-picture-upload" type="file" onChange={handleFileChange} />
//             <Button variant="outlined" component="span">
//               Choose Image
//             </Button>
//           </label>
          
//           <Button 
//               variant="contained" 
//               color="primary" 
//               onClick={handleSave} 
//               disabled={!selectedFile || isUploading}
//           >
//             {isUploading ? <CircularProgress size={24} color="inherit" /> : "Save"}
//           </Button>
//         </Stack>
//       </Paper>
//     </Box>
//   );
// };

// export default ProfileTopBar;
import { useState, useEffect } from "react"; // 1. Imported useEffect
import { Box, Typography, Paper, Avatar, Button, CircularProgress, Stack, Alert } from "@mui/material";
import { styled } from '@mui/material/styles';
import PersonIcon from '@mui/icons-material/Person';
import axiosInstance from "../utils/axiosInstance";

// Custom styled component to hide the default file input
const Input = styled('input')({
  display: 'none',
});

// The component now accepts an 'onBack' prop
const ProfileTopBar = ({ onBack }) => {
  const employeeId = localStorage.getItem("loggedInEmpId");

  // State to manage the displayed picture, the selected file, and upload status
  const [previewPicture, setPreviewPicture] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  // --- NEW: Function to fetch the existing profile picture ---
  const fetchProfilePicture = async () => {
    // Don't run if there is no employee ID
    if (!employeeId) {
      console.log("No employee ID found, skipping profile picture fetch.");
      return;
    }
    try {
      // Use the employeeId from localStorage to build the URL
      const response = await axiosInstance.get(`/api/get_profile_photo/${employeeId}/`);

      if (response.data && response.data.status === 'success' && response.data.data) {
        // Ensure the URL is HTTPS to avoid mixed content errors on a secure site
        const secureUrl = response.data.data.replace(/^http:\/\//i, 'https://');
        setPreviewPicture(secureUrl);
      }
    } catch (error) {
      console.error("Failed to fetch existing profile picture:", error);
      // Optionally, inform the user that the existing image couldn't be loaded
      setMessage({ text: 'Could not load existing profile picture.', type: 'warning' });
    }
  };
  
  // 2. useEffect hook to fetch the initial profile picture when the component loads
  useEffect(() => {
    fetchProfilePicture();
  }, [employeeId]); // The dependency array ensures this runs if employeeId changes

  // Handle file selection from the input
  const handleFileChange = (event) => {
    setMessage({ text: '', type: '' });
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      // Create a temporary local URL for the live preview, overwriting the fetched one
      setPreviewPicture(URL.createObjectURL(file));
    }
  };

  // Handle the save/upload process
  const handleSave = async () => {
    setMessage({ text: '', type: '' });
    if (!selectedFile) {
      setMessage({ text: 'Please select a file to upload.', type: 'error' });
      return;
    }
    if (!employeeId) {
      setMessage({ text: 'Cannot upload picture: User not identified.', type: 'error' });
      return;
    }

    setIsUploading(true);

    const formData = new FormData();
    formData.append("user_id", employeeId);
    formData.append("file", selectedFile);

    try {
      const response = await axiosInstance.post('api/update_profile_photo/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.status === 'success') {
        setMessage({ text: 'Profile picture updated successfully!', type: 'success' });
        setSelectedFile(null);
        // 3. Re-fetch the picture from the server to show the updated, canonical version
        await fetchProfilePicture();
      } else {
        setMessage({ text: response.data.message || 'Unknown error', type: 'error' });
      }
    } catch (error) {
      console.error("Error uploading profile picture:", error);
      const errorMessage = error.response?.data?.message || 'An error occurred while uploading the picture.';
      setMessage({ text: errorMessage, type: 'error' });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h6" gutterBottom>
        Update Profile Picture
      </Typography>
      <Paper sx={{ padding: 3, textAlign: "center" }}>
        {/* The Avatar now shows the fetched image or the newly selected preview */}
        <Avatar
          src={previewPicture}
          sx={{ width: 120, height: 120, margin: "0 auto 16px", border: '2px solid #ddd' }}
        >
          {!previewPicture && <PersonIcon sx={{ width: 70, height: 70 }} />}
        </Avatar>
        
        <Stack direction="row" spacing={2} justifyContent="center" alignItems="center" sx={{ mt: 2 }}>
          <Button variant="outlined" color="secondary" onClick={onBack}>
            Back
          </Button>

          <label htmlFor="profile-picture-upload">
            <Input accept="image/*" id="profile-picture-upload" type="file" onChange={handleFileChange} />
            <Button variant="outlined" component="span">
              Choose Image
            </Button>
          </label>
          
          <Button 
              variant="contained" 
              color="primary" 
              onClick={handleSave} 
              disabled={!selectedFile || isUploading}
          >
            {isUploading ? <CircularProgress size={24} color="inherit" /> : "Save"}
          </Button>
        </Stack>

        {/* Display messages below the buttons for better layout */}
        {message.text && (
            <Alert 
              severity={message.type} 
              onClose={() => setMessage({ text: '', type: '' })}
              sx={{ mt: 2, justifyContent: 'center' }}
            >
              {message.text}
            </Alert>
          )}
      </Paper>
    </Box>
  );
};

export default ProfileTopBar;