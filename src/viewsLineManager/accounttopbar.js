"use client"
import { useState, useEffect } from "react";
import { Box, Typography, TextField, Button, CircularProgress } from "@mui/material";
import axiosInstance from "../utils/axiosInstance"; // Assuming you have a configured axios instance

const AccountTopBar = () => {
  // Get the logged-in user's ID from localStorage
  const employeeId = localStorage.getItem("loggedInEmpId");

  // State to hold the account information
  const [accountData, setAccountData] = useState({
    username: "",
    email: ""
  });

  // State to manage loading status
  const [loading, setLoading] = useState(true);

  // useEffect to fetch the account data when the component mounts
  useEffect(() => {
    // Do not fetch if the employeeId is not available
    if (!employeeId) {
      setLoading(false);
      console.warn("No loggedInEmpId found in localStorage.");
      return;
    }

    const fetchAccountData = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.post('api/account_info/', { user_id: employeeId });
        if (response.data.status === 'success' && response.data.data) {
          // Populate the state with the fetched data
          setAccountData(response.data.data);
        } else {
          console.error("Failed to fetch account data:", response.data.message);
        }
      } catch (error) {
        console.error("An error occurred while fetching account data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAccountData();
  }, [employeeId]); // Dependency array ensures this runs if the ID changes

  // Handler to update state when the user types in the text fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAccountData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handler to save the changes via a PATCH request
  const handleUpdate = async () => {
    if (!employeeId) {
      alert("Cannot save changes: No user specified.");
      return;
    }

    // Prepare the payload for the PATCH request
    const patchPayload = {
      user_id: employeeId,
      username: accountData.username,
      email: accountData.email
    };

    try {
      const response = await axiosInstance.patch('api/account_info/', patchPayload);
      if (response.data.status === 'success') {
        alert('Account changes saved successfully!');
      } else {
        alert(`Failed to save changes: ${response.data.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error("An error occurred while saving changes:", error);
      alert('An error occurred while saving the changes.');
    }
  };

  // Display a loading spinner while data is being fetched
  if (loading) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
        <CircularProgress size={24} />
        <Typography sx={{ ml: 2 }}>Loading Account Information...</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h6">Account Information Form</Typography>
      <TextField
        label="User Name"
        name="username" // Name should match the state key
        fullWidth
        value={accountData.username || ''}
        onChange={handleChange}
        sx={{ mt: 2 }}
      />
      <TextField
        label="Email"
        name="email" // Name should match the state key
        fullWidth
        value={accountData.email || ''}
        onChange={handleChange}
        sx={{ mt: 2 }}
      />
      <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleUpdate}>
        Save Changes
      </Button>
    </Box>
  );
};

export default AccountTopBar;