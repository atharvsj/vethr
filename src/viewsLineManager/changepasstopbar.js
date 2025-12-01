"use client"
import { useState } from "react";
import { Box, Typography, TextField, Button, CircularProgress } from "@mui/material";
import axiosInstance from "../utils/axiosInstance"; // Assuming you have a configured axios instance

const ChangePassTopBar = () => {
  // Get the logged-in user's ID from localStorage
  const employeeId = localStorage.getItem("loggedInEmpId");

  // Internal state for the form fields
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const handlePasswordChange = async () => {
    // 1. Validation
    if (!currentPassword || !newPassword || !confirmNewPassword) {
      alert("Please fill in all password fields.");
      return;
    }
    if (newPassword !== confirmNewPassword) {
      alert("New password and confirm password do not match.");
      return;
    }
    if (!employeeId) {
      alert("Could not identify the user. Please log in again.");
      return;
    }

    setIsSaving(true);

    // 2. Prepare the payload for the API
    const patchPayload = {
      user_id: Number(employeeId),
      new_password: newPassword
      // NOTE: Your API payload does not require the 'current_password'.
      // Some systems validate it, but we will follow your provided API structure.
    };

    // 3. Make the API call
    try {
      const response = await axiosInstance.patch('api/change_password/', patchPayload);
      if (response.data.status === 'success') {
        alert(response.data.message || 'Password updated successfully!');
        // Clear fields on success for security
        setCurrentPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
      } else {
        alert(`Failed to change password: ${response.data.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error("Error changing password:", error);
      alert("An error occurred while changing the password.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h6" gutterBottom>
        Change Password
      </Typography>
      <TextField
        label="Current Password"
        fullWidth
        type="password"
        value={currentPassword}
        onChange={(e) => setCurrentPassword(e.target.value)}
        sx={{ mt: 2 }}
      />
      <TextField
        label="New Password"
        fullWidth
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        sx={{ mt: 2 }}
      />
      <TextField
        label="Confirm New Password"
        fullWidth
        type="password"
        value={confirmNewPassword}
        onChange={(e) => setConfirmNewPassword(e.target.value)}
        sx={{ mt: 2 }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handlePasswordChange}
        disabled={isSaving}
        sx={{ mt: 2 }}
      >
        {isSaving ? <CircularProgress size={24} color="inherit" /> : "Change Password"}
      </Button>
    </Box>
  );
};

export default ChangePassTopBar;