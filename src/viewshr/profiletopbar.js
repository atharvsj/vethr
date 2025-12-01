"use client"
import { useState } from "react";
import { Box, Typography, Paper, Avatar, Button, CircularProgress, Stack } from "@mui/material";
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

  // Handle file selection from the input
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      // Create a temporary URL for the live preview
      setPreviewPicture(URL.createObjectURL(file));
    }
  };

  // Handle the save/upload process
  const handleSave = async () => {
    if (!selectedFile) {
      alert("Please select a file to upload.");
      return;
    }
    if (!employeeId) {
      alert("Cannot upload picture: User not identified.");
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
        alert('Profile picture updated successfully!');
        // Reset the form after a successful upload
        setSelectedFile(null);
        setPreviewPicture(null);
      } else {
        alert(`Failed to update picture: ${response.data.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error("Error uploading profile picture:", error);
      alert("An error occurred while uploading the picture.");
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
        <Avatar
          src={previewPicture}
          sx={{ width: 120, height: 120, margin: "0 auto 16px", border: '2px solid #ddd' }}
        >
          {/* Show a default icon if no image is selected for preview */}
          {!previewPicture && <PersonIcon sx={{ width: 70, height: 70 }} />}
        </Avatar>
        
        {/* Use a Stack component to align buttons horizontally */}
        <Stack direction="row" spacing={2} justifyContent="center">
          {/* Back button added here */}
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
      </Paper>
    </Box>
  );
};

export default ProfileTopBar;