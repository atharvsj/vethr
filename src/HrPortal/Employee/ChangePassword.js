import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Typography,
  Alert,
  Divider,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const ChangePassword = () => {
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    repeat: false,
  });

  const [form, setForm] = useState({
    currentPassword: '',
    newPassword: '',
    repeatPassword: '',
  });

  const handleToggleVisibility = (field) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    // Add validation and submit logic here
    console.log(form);
  };

  return (
    <Box p={2}>
      {/* Alert Banner */}
      <Alert severity="warning" sx={{ mb: 3 }}>
        <strong>Alert!</strong> Don’t share this password with anyone. The password should be changed at least once in 3 months.
      </Alert>

      <Typography variant="h6" gutterBottom>
        🔒 Change Password
      </Typography>

      {/* Password Fields */}
      <Box display="flex" flexDirection="column" gap={2} mt={2}>
        {/* Current Password */}
        <TextField
          label="Current password"
          type={showPassword.current ? 'text' : 'password'}
          name="currentPassword"
          value={form.currentPassword}
          onChange={handleChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => handleToggleVisibility('current')}>
                  {showPassword.current ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        {/* New Password */}
        <Box display="flex" gap={2}>
          <TextField
            label="New password"
            name="newPassword"
            type={showPassword.new ? 'text' : 'password'}
            value={form.newPassword}
            onChange={handleChange}
            required
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => handleToggleVisibility('new')}>
                    {showPassword.new ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {/* Repeat Password */}
          <TextField
            label="Repeat new password"
            name="repeatPassword"
            type={showPassword.repeat ? 'text' : 'password'}
            value={form.repeatPassword}
            onChange={handleChange}
            required
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => handleToggleVisibility('repeat')}>
                    {showPassword.repeat ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>

        {/* Submit Button */}
        <Box textAlign="right">
          <Button variant="contained" color="error" onClick={handleSubmit}>
            Change Password
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ChangePassword;
