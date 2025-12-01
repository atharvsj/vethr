import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Link,
  Paper,
  Dialog,
  DialogContent,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff, CheckCircle } from "@mui/icons-material";
import logo from "./tdtllogo.png";

const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Payload to send to the backend
    const loginData = {
      username,
      password,
    };

    try {
      // Make POST request to backend
      const response = await fetch("YOUR_API_ENDPOINT", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      // For demo purposes - remove this in production
      if (username && password) {
        setShowSuccessDialog(true);
        setTimeout(() => {
          setShowSuccessDialog(false);
          navigate("/admindashboard/home");
        }, 1000);
        return;
      }

      if (response.ok) {
        setShowSuccessDialog(true);
        setTimeout(() => {
          setShowSuccessDialog(false);
          navigate("/admindashboard/home");
        }, 2000);
      } else {
        setErrorMessage("Invalid credentials. Please try again.");
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again later.");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        background: "#282c34",
        position: "relative",
      }}
    >
      {/* Left side with quote */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          background: "linear-gradient(135deg, #f5f5f5 25%, #e0e0e0 100%)",
          p: 4,
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            maxWidth: "500px",
            position: "relative",
            borderRadius: 2,
          }}
        >
          <Typography
            variant="h5"
            sx={{
              color: "#1a237e",
              fontWeight: 500,
              textAlign: "center",
              mb: 2,
            }}
          >
            "Talent Wins Games, But Teamwork and Intelligence Wins
            Championships."
          </Typography>
        </Paper>
      </Box>

      {/* Right side with login form */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          p: 4,
        }}
      >
        <Box sx={{ mb: 4 }}>
          <img
            src={logo}
            alt="The DataTech Labs"
            style={{
              filter: "brightness(0) invert(1)",
              maxWidth: "200px",
            }}
          />
        </Box>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            width: "100%",
            maxWidth: "400px",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              color: "white",
              mb: 1,
            }}
          >
            Sign in
          </Typography>

          <Typography
            sx={{
              color: "#ccc",
              mb: 3,
            }}
          >
            Welcome back, Please login into an account
          </Typography>

          {errorMessage && (
            <Typography color="error" sx={{ mb: 2 }}>
              {errorMessage}
            </Typography>
          )}

          <TextField
            fullWidth
            variant="outlined"
            placeholder="User Name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            sx={{
              mb: 2,
              backgroundColor: "rgba(255,255,255,0.1)",
              "& .MuiOutlinedInput-root": {
                color: "white",
              },
            }}
          />

          <TextField
            fullWidth
            type={passwordVisible ? "text" : "password"}
            variant="outlined"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={togglePasswordVisibility}
                    edge="end"
                    sx={{ color: "white" }}
                  >
                    {passwordVisible ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              mb: 3,
              backgroundColor: "rgba(255,255,255,0.1)",
              "& .MuiOutlinedInput-root": {
                color: "white",
              },
            }}
          />

          <Button
            fullWidth
            type="submit"
            variant="contained"
            sx={{
              mb: 2,
              py: 1.5,
              backgroundColor: "#2196f3",
              "&:hover": {
                backgroundColor: "#1976d2",
              },
            }}
          >
            Sign in
          </Button>

          <Typography
            sx={{
              textAlign: "center",
              color: "#ccc",
            }}
          >
            <Link
              href="#"
              sx={{
                color: "#2196f3",
                textDecoration: "none",
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              Forgot password? Don't worry click here!
            </Link>
          </Typography>
        </Box>

        <Typography
          sx={{
            color: "#ccc",
            position: "absolute",
            bottom: 20,
            fontSize: "0.875rem",
          }}
        >
          © 2022 The Data Tech Labs Inc. All rights reserved.
        </Typography>
      </Box>

      {/* Success Dialog */}
      <Dialog
        open={showSuccessDialog}
        sx={{
          "& .MuiDialog-paper": {
            minWidth: "300px",
            borderRadius: "16px",
          },
        }}
      >
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            py: 4,
            px: 6,
          }}
        >
          <CheckCircle
            sx={{
              fontSize: 80,
              color: "#4caf50",
              mb: 2,
            }}
          />
          <Typography
            variant="h5"
            sx={{
              textAlign: "center",
              fontWeight: "bold",
              color: "#333",
            }}
          >
            Login Successful!
          </Typography>
          <Typography
            sx={{
              textAlign: "center",
              color: "#666",
              mt: 1,
            }}
          >
            Redirecting to dashboard...
          </Typography>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default LoginPage;
