
// import { useState } from "react";
// import { Box, Typography, TextField, Button, CircularProgress } from "@mui/material";
// import axiosInstance from "../utils/axiosInstance"; // Assuming you have a configured axios instance

// const ChangePassTopBar = () => {
//   // Get the logged-in user's ID from localStorage
//   const employeeId = localStorage.getItem("loggedInEmpId");

//   // Internal state for the form fields
//   const [currentPassword, setCurrentPassword] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmNewPassword, setConfirmNewPassword] = useState("");
//   const [isSaving, setIsSaving] = useState(false);

//   const handlePasswordChange = async () => {
//     // 1. Validation
//     if (!currentPassword || !newPassword || !confirmNewPassword) {
//       alert("Please fill in all password fields.");
//       return;
//     }
//     if (newPassword !== confirmNewPassword) {
//       alert("New password and confirm password do not match.");
//       return;
//     }
//     if (!employeeId) {
//       alert("Could not identify the user. Please log in again.");
//       return;
//     }

//     setIsSaving(true);

//     // 2. Prepare the payload for the API
//     const patchPayload = {
//       user_id: Number(employeeId),
//       new_password: newPassword
//       // NOTE: Your API payload does not require the 'current_password'.
//       // Some systems validate it, but we will follow your provided API structure.
//     };

//     // 3. Make the API call
//     try {
//       const response = await axiosInstance.patch('api/change_password/', patchPayload);
//       if (response.data.status === 'success') {
//         alert(response.data.message || 'Password updated successfully!');
//         // Clear fields on success for security
//         setCurrentPassword("");
//         setNewPassword("");
//         setConfirmNewPassword("");
//       } else {
//         alert(`Failed to change password: ${response.data.message || 'Unknown error'}`);
//       }
//     } catch (error) {
//       console.error("Error changing password:", error);
//       alert("An error occurred while changing the password.");
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   return (
//     <Box sx={{ padding: 2 }}>
//       <Typography variant="h6" gutterBottom>
//         Change Password
//       </Typography>
//       <TextField
//         label="Current Password"
//         fullWidth
//         type="password"
//         value={currentPassword}
//         onChange={(e) => setCurrentPassword(e.target.value)}
//         sx={{ mt: 2 }}
//       />
//       <TextField
//         label="New Password"
//         fullWidth
//         type="password"
//         value={newPassword}
//         onChange={(e) => setNewPassword(e.target.value)}
//         sx={{ mt: 2 }}
//       />
//       <TextField
//         label="Confirm New Password"
//         fullWidth
//         type="password"
//         value={confirmNewPassword}
//         onChange={(e) => setConfirmNewPassword(e.target.value)}
//         sx={{ mt: 2 }}
//       />
//       <Button
//         variant="contained"
//         color="primary"
//         onClick={handlePasswordChange}
//         disabled={isSaving}
//         sx={{ mt: 2 }}
//       >
//         {isSaving ? <CircularProgress size={24} color="inherit" /> : "Change Password"}
//       </Button>
//     </Box>
//   );
// };

// export default ChangePassTopBar;
// import { useState } from "react";
// import { 
//   Box, 
//   Typography, 
//   TextField, 
//   Button, 
//   CircularProgress, 
//   Stack, 
//   Alert,
//   InputAdornment,
//   IconButton
// } from "@mui/material";
// import { Visibility, VisibilityOff } from '@mui/icons-material';
// import axiosInstance from "../utils/axiosInstance";

// const ChangePassTopBar = () => {
//   const employeeId = localStorage.getItem("loggedInEmpId");

//   const [currentPassword, setCurrentPassword] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmNewPassword, setConfirmNewPassword] = useState("");
//   const [isSaving, setIsSaving] = useState(false);

//   // 1. State for messages and password visibility
//   const [message, setMessage] = useState({ text: '', type: '' });
//   const [showNewPassword, setShowNewPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   const handlePasswordChange = async () => {
//     setMessage({ text: '', type: '' }); // Clear previous messages

//     // 2. Validation with on-form messages
//     if (!currentPassword || !newPassword || !confirmNewPassword) {
//       setMessage({ text: "Please fill in all password fields.", type: "error" });
//       return;
//     }
//     if (newPassword !== confirmNewPassword) {
//       setMessage({ text: "New password and confirm password do not match.", type: "error" });
//       return;
//     }
//     if (!employeeId) {
//       setMessage({ text: "Could not identify the user. Please log in again.", type: "error" });
//       return;
//     }

//     setIsSaving(true);

//     const patchPayload = {
//       user_id: Number(employeeId),
//       new_password: newPassword,
//     };

//     try {
//       const response = await axiosInstance.patch('api/change_password/', patchPayload);
//       if (response.data.status === 'success') {
//         setMessage({ text: response.data.message || 'Password updated successfully!', type: 'success' });
//         setCurrentPassword("");
//         setNewPassword("");
//         setConfirmNewPassword("");
//       } else {
//         setMessage({ text: response.data.message || 'Unknown error', type: 'error' });
//       }
//     } catch (error) {
//       console.error("Error changing password:", error);
//       const errorMessage = error.response?.data?.message || 'An error occurred while changing the password.';
//       setMessage({ text: errorMessage, type: 'error' });
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   // 3. Handlers to toggle password visibility
//   const handleClickShowNewPassword = () => setShowNewPassword((show) => !show);
//   const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

//   // Clear messages when user starts typing
//   const createChangeHandler = (setter) => (e) => {
//     setMessage({ text: '', type: '' });
//     setter(e.target.value);
//   };

//   return (
//     <Box sx={{ padding: 2 }}>
//       <Typography variant="h6" gutterBottom>
//         Change Password
//       </Typography>
//       <TextField
//         label="Current Password"
//         fullWidth
//         type="password"
//         value={currentPassword}
//         onChange={createChangeHandler(setCurrentPassword)}
//         sx={{ mt: 2 }}
//       />
//       <TextField
//         label="New Password"
//         fullWidth
//         type={showNewPassword ? 'text' : 'password'}
//         value={newPassword}
//         onChange={createChangeHandler(setNewPassword)}
//         sx={{ mt: 2 }}
//         InputProps={{
//           endAdornment: (
//             <InputAdornment position="end">
//               <IconButton
//                 aria-label="toggle new password visibility"
//                 onClick={handleClickShowNewPassword}
//                 edge="end"
//               >
//                 {showNewPassword ? <VisibilityOff /> : <Visibility />}
//               </IconButton>
//             </InputAdornment>
//           ),
//         }}
//       />
//       <TextField
//         label="Confirm New Password"
//         fullWidth
//         type={showConfirmPassword ? 'text' : 'password'}
//         value={confirmNewPassword}
//         onChange={createChangeHandler(setConfirmNewPassword)}
//         sx={{ mt: 2 }}
//         InputProps={{
//           endAdornment: (
//             <InputAdornment position="end">
//               <IconButton
//                 aria-label="toggle confirm password visibility"
//                 onClick={handleClickShowConfirmPassword}
//                 edge="end"
//               >
//                 {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
//               </IconButton>
//             </InputAdornment>
//           ),
//         }}
//       />
      
//       {/* 4. Stack to hold the message and the button */}
//       <Stack direction="row" spacing={2} sx={{ mt: 2, alignItems: 'center' }}>
//         {message.text && (
//           <Alert 
//             severity={message.type} 
//             sx={{ flexGrow: 1 }} // Allows the alert to take up space
//             onClose={() => setMessage({text: '', type: ''})}
//           >
//             {message.text}
//           </Alert>
//         )}
//         <Button
//           variant="contained"
//           color="primary"
//           onClick={handlePasswordChange}
//           disabled={isSaving}
//           sx={{ ml: 'auto' }} // Pushes the button to the right
//         >
//           {isSaving ? <CircularProgress size={24} color="inherit" /> : "Change Password"}
//         </Button>
//       </Stack>
//     </Box>
//   );
// };

// export default ChangePassTopBar;
// import { useState } from "react";
// import { 
//   Box, 
//   Typography, 
//   TextField, 
//   Button, 
//   CircularProgress, 
//   Stack, 
//   Alert,
//   InputAdornment,
//   IconButton
// } from "@mui/material";
// import { Visibility, VisibilityOff } from '@mui/icons-material';
// import axiosInstance from "../utils/axiosInstance";

// const ChangePassTopBar = ({ onBack }) => {
//   const employeeId = localStorage.getItem("loggedInEmpId");

//   const [currentPassword, setCurrentPassword] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmNewPassword, setConfirmNewPassword] = useState("");
//   const [isSaving, setIsSaving] = useState(false);

//   const [message, setMessage] = useState({ text: '', type: '' });
//   const [showNewPassword, setShowNewPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   const handlePasswordChange = async () => {
//     setMessage({ text: '', type: '' });

//     if (!currentPassword || !newPassword || !confirmNewPassword) {
//       setMessage({ text: "Please fill in all password fields.", type: "error" });
//       return;
//     }
//     if (newPassword !== confirmNewPassword) {
//       setMessage({ text: "New password and confirm password do not match.", type: "error" });
//       return;
//     }
//     if (!employeeId) {
//       setMessage({ text: "Could not identify the user. Please log in again.", type: "error" });
//       return;
//     }

//     setIsSaving(true);

//     const patchPayload = {
//       user_id: Number(employeeId),
//       new_password: newPassword,
//     };

//     try {
//       const response = await axiosInstance.patch('api/change_password/', patchPayload);
//       if (response.data.status === 'success') {
//         setMessage({ text: response.data.message || 'Password updated successfully!', type: 'success' });
//         setCurrentPassword("");
//         setNewPassword("");
//         setConfirmNewPassword("");
//       } else {
//         setMessage({ text: response.data.message || 'Unknown error', type: 'error' });
//       }
//     } catch (error) {
//       console.error("Error changing password:", error);
//       const errorMessage = error.response?.data?.message || 'An error occurred while changing the password.';
//       setMessage({ text: errorMessage, type: 'error' });
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   const handleClickShowNewPassword = () => setShowNewPassword((show) => !show);
//   const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

//   const createChangeHandler = (setter) => (e) => {
//     setMessage({ text: '', type: '' });
//     setter(e.target.value);
//   };

//   return (
//     <Box sx={{ padding: 2 }}>
//       <Typography variant="h6" gutterBottom>
//         Change Password
//       </Typography>

//       <TextField
//         label="Current Password"
//         fullWidth
//         type="password"
//         value={currentPassword}
//         onChange={createChangeHandler(setCurrentPassword)}
//         sx={{ mt: 2 }}
//       />

//       <TextField
//         label="New Password"
//         fullWidth
//         type={showNewPassword ? 'text' : 'password'}
//         value={newPassword}
//         onChange={createChangeHandler(setNewPassword)}
//         sx={{ mt: 2 }}
//         InputProps={{
//           endAdornment: (
//             <InputAdornment position="end">
//               <IconButton
//                 aria-label="toggle new password visibility"
//                 onClick={handleClickShowNewPassword}
//                 edge="end"
//               >
//                 {showNewPassword ? <VisibilityOff /> : <Visibility />}
//               </IconButton>
//             </InputAdornment>
//           ),
//         }}
//       />

//       <TextField
//         label="Confirm New Password"
//         fullWidth
//         type={showConfirmPassword ? 'text' : 'password'}
//         value={confirmNewPassword}
//         onChange={createChangeHandler(setConfirmNewPassword)}
//         sx={{ mt: 2 }}
//         InputProps={{
//           endAdornment: (
//             <InputAdornment position="end">
//               <IconButton
//                 aria-label="toggle confirm password visibility"
//                 onClick={handleClickShowConfirmPassword}
//                 edge="end"
//               >
//                 {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
//               </IconButton>
//             </InputAdornment>
//           ),
//         }}
//       />

//       <Stack direction="row" spacing={2} sx={{ mt: 2, alignItems: 'center' }}>
//         {message.text && (
//           <Alert 
//             severity={message.type} 
//             sx={{ flexGrow: 1 }}
//             onClose={() => setMessage({text: '', type: ''})}
//           >
//             {message.text}
//           </Alert>
//         )}
//         <Button
//           variant="contained"
//           color="primary"
//           onClick={handlePasswordChange}
//           disabled={isSaving}
//           sx={{ ml: 'auto' }}
//         >
//           {isSaving ? <CircularProgress size={24} color="inherit" /> : "Change Password"}
//         </Button>
//       </Stack>

//       {/* Back Button */}
//       <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
//         <Button variant="outlined" color="secondary" onClick={onBack}>
//           Back
//         </Button>
//       </Box>
//     </Box>
//   );
// };

// export default ChangePassTopBar;
import { useState, useEffect } from "react"; // Import useEffect
import {
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Stack,
  Alert,
  InputAdornment,
  IconButton
} from "@mui/material";
import { Visibility, VisibilityOff } from '@mui/icons-material';
import axiosInstance from "../utils/axiosInstance";
 
const ChangePassTopBar = ({ onBack }) => {
  const employeeId = localStorage.getItem("loggedInEmpId");
 
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [isSaving, setIsSaving] = useState(false);
 
  const [message, setMessage] = useState({ text: '', type: '' });
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
 
  // State for validation errors
  const [currentPasswordError, setCurrentPasswordError] = useState("");
  const [newPasswordError, setNewPasswordError] = useState("");
  const [confirmNewPasswordError, setConfirmNewPasswordError] = useState("");
 
  // Debounce the validation checks slightly for better UX
  // A simple approach, for more complex scenarios consider a custom hook or library
  useEffect(() => {
    // Validate New Password and Confirm New Password match
    if (newPassword && confirmNewPassword && newPassword !== confirmNewPassword) {
      setConfirmNewPasswordError("New password and confirm password do not match.");
    } else {
      setConfirmNewPasswordError("");
    }
 
    // Validate Current Password and New Password are not the same
    if (currentPassword && newPassword && currentPassword === newPassword) {
      setNewPasswordError("New password cannot be the same as the current password.");
    } else if (newPasswordError === "New password cannot be the same as the current password.") {
      setNewPasswordError(""); // Clear if the condition is no longer met
    }
 
    // Clear general message when typing
    setMessage({ text: '', type: '' });
  }, [newPassword, confirmNewPassword, currentPassword]); // Rerun validation when these change
 
  const handlePasswordChange = async () => {
    setMessage({ text: '', type: '' });
 
    // Re-run all validations to ensure button disabling works even if user bypassed typing
    let hasError = false;
 
    if (!currentPassword) {
      setCurrentPasswordError("Current password is required.");
      hasError = true;
    } else {
      setCurrentPasswordError("");
    }
 
    if (!newPassword) {
      setNewPasswordError("New password is required.");
      hasError = true;
    } else if (currentPassword === newPassword) {
      setNewPasswordError("New password cannot be the same as the current password.");
      hasError = true;
    } else {
      setNewPasswordError("");
    }
 
    if (!confirmNewPassword) {
      setConfirmNewPasswordError("Confirm new password is required.");
      hasError = true;
    } else if (newPassword !== confirmNewPassword) {
      setConfirmNewPasswordError("New password and confirm password do not match.");
      hasError = true;
    } else {
      setConfirmNewPasswordError("");
    }
 
 
    if (hasError || currentPasswordError || newPasswordError || confirmNewPasswordError) {
      setMessage({ text: "Please correct the errors in the form.", type: "error" });
      return;
    }
 
    if (!employeeId) {
      setMessage({ text: "Could not identify the user. Please log in again.", type: "error" });
      return;
    }
 
    setIsSaving(true);
 
    const patchPayload = {
      user_id: Number(employeeId),
      new_password: newPassword,
      // You might need to send the current_password to the backend for verification
      // depending on your API design. If so, add it here:
      // current_password: currentPassword,
    };
 
    try {
      const response = await axiosInstance.patch('api/change_password/', patchPayload);
      if (response.data.status === 'success') {
        setMessage({ text: response.data.message || 'Password updated successfully!', type: 'success' });
        setCurrentPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
        // Clear all errors on success
        setCurrentPasswordError("");
        setNewPasswordError("");
        setConfirmNewPasswordError("");
      } else {
        setMessage({ text: response.data.message || 'Unknown error', type: 'error' });
      }
    } catch (error) {
      console.error("Error changing password:", error);
      const errorMessage = error.response?.data?.message || 'An error occurred while changing the password.';
      setMessage({ text: errorMessage, type: 'error' });
      // If backend returns a specific error for current password, you can set it here
      if (error.response?.data?.field === 'current_password') {
        setCurrentPasswordError(error.response.data.message);
      }
    } finally {
      setIsSaving(false);
    }
  };
 
  const handleClickShowNewPassword = () => setShowNewPassword((show) => !show);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);
 
  const createChangeHandler = (setter, setErrorSetter) => (e) => {
    setMessage({ text: '', type: '' }); // Clear general message on any input change
    setErrorSetter(""); // Clear specific error when user starts typing again
    setter(e.target.value);
  };
 
  // Determine if the button should be disabled
  const isFormInvalid =
    !currentPassword || !newPassword || !confirmNewPassword || // Basic check for empty fields
    currentPasswordError || newPasswordError || confirmNewPasswordError || // Any active validation errors
    isSaving; // Or if it's currently saving
 
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
        onChange={createChangeHandler(setCurrentPassword, setCurrentPasswordError)}
        sx={{ mt: 2 }}
        error={!!currentPasswordError}
        helperText={currentPasswordError}
      />
 
      <TextField
        label="New Password"
        fullWidth
        type={showNewPassword ? 'text' : 'password'}
        value={newPassword}
        onChange={createChangeHandler(setNewPassword, setNewPasswordError)}
        sx={{ mt: 2 }}
        error={!!newPasswordError}
        helperText={newPasswordError}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle new password visibility"
                onClick={handleClickShowNewPassword}
                edge="end"
              >
                {showNewPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
 
      <TextField
        label="Confirm New Password"
        fullWidth
        type={showConfirmPassword ? 'text' : 'password'}
        value={confirmNewPassword}
        onChange={createChangeHandler(setConfirmNewPassword, setConfirmNewPasswordError)}
        sx={{ mt: 2 }}
        error={!!confirmNewPasswordError}
        helperText={confirmNewPasswordError}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle confirm password visibility"
                onClick={handleClickShowConfirmPassword}
                edge="end"
              >
                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
 
      <Stack direction="row" spacing={2} sx={{ mt: 2, alignItems: 'center' }}>
        {message.text && (
          <Alert
            severity={message.type}
            sx={{ flexGrow: 1 }}
            onClose={() => setMessage({text: '', type: ''})}
          >
            {message.text}
          </Alert>
        )}
        <Button
          variant="contained"
          color="primary"
          onClick={handlePasswordChange}
          disabled={isFormInvalid}
          sx={{ ml: 'auto' }}
        >
          {isSaving ? <CircularProgress size={24} color="inherit" /> : "Change Password"}
        </Button>
      </Stack>
 
      {/* Back Button */}
      <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
        <Button variant="outlined" color="secondary" onClick={onBack}>
          Back
        </Button>
      </Box>
    </Box>
  );
};
 
export default ChangePassTopBar;