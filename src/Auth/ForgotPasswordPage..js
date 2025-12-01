"use client"

import { useState } from "react"
import {
  Box,
  TextField,
  Button,
  Typography,
  Link,
  Paper,
  IconButton,
  InputAdornment,
  Container,
  Grow,
  Fade,
  CircularProgress,
  Alert,
} from "@mui/material"
import { useNavigate } from "react-router-dom"
import {
  MailOutline,
  LockOutlined,
  Visibility,
  VisibilityOff,
  ArrowBack,
  LockResetOutlined,
  PasswordOutlined,
} from "@mui/icons-material"
import { motion } from "framer-motion"
import logo from "../SuperAdmin/tdtllogo.png"

const AnimatedBackground = () => (
  <Box
    sx={{
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      overflow: "hidden",
      zIndex: 0,
    }}
  >
    {[...Array(15)].map((_, i) => (
      <Box
        component={motion.div}
        key={i}
        initial={{
          x: Math.random() * 100 - 50,
          y: Math.random() * 100 - 50,
          opacity: 0.1 + Math.random() * 0.2,
          scale: 0.3 + Math.random() * 1.2,
        }}
        animate={{
          x: [Math.random() * 100 - 50, Math.random() * 100 - 50],
          y: [Math.random() * 100 - 50, Math.random() * 100 - 50],
          opacity: [0.1 + Math.random() * 0.2, 0.2 + Math.random() * 0.2],
        }}
        transition={{
          duration: 10 + Math.random() * 10,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "mirror",
        }}
        sx={{
          position: "absolute",
          width: 80 + Math.random() * 120,
          height: 80 + Math.random() * 120,
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(25,118,210,0.15) 0%, rgba(25,118,210,0) 60%)`,
          filter: "blur(5px)",
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
        }}
      />
    ))}
  </Box>
)

const ForgotPasswordPage = () => {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [email, setEmail] = useState("")
  const [otp, setOtp] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [successMessage, setSuccessMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const API_URL_SEND_OTP = "/api/auth/send-otp"
  const API_URL_VERIFY_OTP = "/api/auth/verify-otp"
  const API_URL_RESET_PASSWORD = "/api/auth/reset-password"

  // Enhanced input field styles with autofill override and consistent height
  const textFieldStyles = {
    "& .MuiOutlinedInput-root": {
      color: "white",
      borderRadius: 2,
      backgroundColor: "rgba(255,255,255,0.05)",
      height: "56px", // Fixed height to prevent expansion
      "& fieldset": {
        borderColor: "rgba(255,255,255,0.2)",
      },
      "&:hover fieldset": {
        borderColor: "rgba(255,255,255,0.4)",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#2196f3",
      },
      // Override autofill styles
      "& input:-webkit-autofill": {
        WebkitBoxShadow: "0 0 0 1000px rgba(255,255,255,0.05) inset !important",
        WebkitTextFillColor: "white !important",
        transition: "background-color 5000s ease-in-out 0s",
      },
      "& input:-webkit-autofill:hover": {
        WebkitBoxShadow: "0 0 0 1000px rgba(255,255,255,0.05) inset !important",
        WebkitTextFillColor: "white !important",
      },
      "& input:-webkit-autofill:focus": {
        WebkitBoxShadow: "0 0 0 1000px rgba(255,255,255,0.05) inset !important",
        WebkitTextFillColor: "white !important",
      },
      "& input:-webkit-autofill:active": {
        WebkitBoxShadow: "0 0 0 1000px rgba(255,255,255,0.05) inset !important",
        WebkitTextFillColor: "white !important",
      },
    },
    "& .MuiInputLabel-root": {
      color: "rgba(255,255,255,0.7)",
    },
    "& .MuiInputBase-input": {
      height: "auto", // Allow text to flow naturally within fixed container height
    },
  }

  const buttonStyles = {
    py: 1.5,
    borderRadius: 2,
    backgroundColor: "#2196f3",
    backgroundImage: "linear-gradient(135deg,rgba(95, 116, 224, 0.89) 0%,hsla(289, 78.70%, 46.10%, 0.89) 100%)",
    boxShadow: "0 8px 16px rgba(33, 150, 243, 0.3)",
    "&:hover": {
      backgroundColor: "#1976d2",
      boxShadow: "0 12px 20px rgba(33, 150, 243, 0.4)",
    },
    textTransform: "none",
    fontSize: "1rem",
    fontWeight: 600,
  }

  const handleSendOtp = async (e) => {
    e.preventDefault()
    setErrorMessage("")
    setSuccessMessage("")
    if (!email) {
      setErrorMessage("Please enter your email address.")
      return
    }
    setIsLoading(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      console.log("Pretending to send OTP to:", email)
      setSuccessMessage("OTP has been sent to your email (simulated).")
      setStep(2)
    } catch (error) {
      setErrorMessage(error.message || "An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleVerifyOtp = async (e) => {
    e.preventDefault()
    setErrorMessage("")
    setSuccessMessage("")
    if (!otp) {
      setErrorMessage("Please enter the OTP.")
      return
    }
    setIsLoading(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      if (otp === "123456") {
        console.log("OTP Verified for:", email)
        setSuccessMessage("OTP verified successfully!")
        setStep(3)
      } else {
        throw new Error("Invalid OTP (simulated - use 123456).")
      }
    } catch (error) {
      setErrorMessage(error.message || "An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleResetPassword = async (e) => {
    e.preventDefault()
    setErrorMessage("")
    setSuccessMessage("")
    if (!newPassword || !confirmPassword) {
      setErrorMessage("Please fill in both password fields.")
      return
    }
    if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match.")
      return
    }
    setIsLoading(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      console.log("Password reset for:", email, "with new password:", newPassword)
      setSuccessMessage("Password has been reset successfully!")
      setStep(4)
    } catch (error) {
      setErrorMessage(error.message || "An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <Box component="form" onSubmit={handleSendOtp} sx={{ width: "100%" }}>
            <Typography variant="h5" sx={{ color: "white", mb: 1, fontWeight: 500 }}>
              Forgot Your Password?
            </Typography>
            <Typography sx={{ color: "#ccc", mb: 3 }}>
              Enter your email address and we'll send you an OTP to reset your password.
            </Typography>
            <Box sx={{ mb: 3 }}>
              <TextField
                fullWidth
                type="email"
                variant="outlined"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MailOutline sx={{ color: "rgba(255,255,255,0.7)" }} />
                    </InputAdornment>
                  ),
                }}
                sx={textFieldStyles}
              />
            </Box>
            <Button fullWidth type="submit" variant="contained" disabled={isLoading} sx={buttonStyles}>
              {isLoading ? <CircularProgress size={24} color="inherit" /> : "Send OTP"}
            </Button>
          </Box>
        )
      case 2:
        return (
          <Box component="form" onSubmit={handleVerifyOtp} sx={{ width: "100%" }}>
            <Typography variant="h5" sx={{ color: "white", mb: 1, fontWeight: 500 }}>
              Enter OTP
            </Typography>
            <Typography sx={{ color: "#ccc", mb: 3 }}>
              An OTP has been sent to {email}. Please enter it below.
            </Typography>
            <Box sx={{ mb: 3 }}>
              <TextField
                fullWidth
                type="text"
                variant="outlined"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                inputProps={{ maxLength: 6 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PasswordOutlined sx={{ color: "rgba(255,255,255,0.7)" }} />
                    </InputAdornment>
                  ),
                }}
                sx={textFieldStyles}
              />
            </Box>
            <Button fullWidth type="submit" variant="contained" disabled={isLoading} sx={buttonStyles}>
              {isLoading ? <CircularProgress size={24} color="inherit" /> : "Verify OTP"}
            </Button>
            <Button
              fullWidth
              variant="text"
              onClick={() => setStep(1)}
              sx={{ mt: 2, color: "#64b5f6" }}
              disabled={isLoading}
            >
              Entered wrong email?
            </Button>
          </Box>
        )
      case 3:
        return (
          <Box component="form" onSubmit={handleResetPassword} sx={{ width: "100%" }}>
            <Typography variant="h5" sx={{ color: "white", mb: 2, fontWeight: 500 }}>
              Set New Password
            </Typography>
            <Box sx={{ mb: 3 }}>
              <TextField
                fullWidth
                type={passwordVisible ? "text" : "password"}
                variant="outlined"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlined sx={{ color: "rgba(255,255,255,0.7)" }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setPasswordVisible(!passwordVisible)}
                        edge="end"
                        sx={{
                          color: "rgba(255,255,255,0.7)",
                          padding: "8px", // Consistent padding to prevent layout shift
                        }}
                      >
                        {passwordVisible ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={textFieldStyles}
              />
            </Box>
            <Box sx={{ mb: 3 }}>
              <TextField
                fullWidth
                type={confirmPasswordVisible ? "text" : "password"}
                variant="outlined"
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockResetOutlined sx={{ color: "rgba(255,255,255,0.7)" }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                        edge="end"
                        sx={{
                          color: "rgba(255,255,255,0.7)",
                          padding: "8px", // Consistent padding to prevent layout shift
                        }}
                      >
                        {confirmPasswordVisible ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={textFieldStyles}
              />
            </Box>
            <Button fullWidth type="submit" variant="contained" disabled={isLoading} sx={buttonStyles}>
              {isLoading ? <CircularProgress size={24} color="inherit" /> : "Reset Password"}
            </Button>
          </Box>
        )
      case 4:
        return (
          <Box sx={{ textAlign: "center" }}>
            <Grow in={true}>
              <Alert severity="success" sx={{ mb: 3, justifyContent: "center" }}>
                {successMessage}
              </Alert>
            </Grow>
            <Button variant="contained" onClick={() => navigate("/hrms")} sx={buttonStyles}>
              Back to Login
            </Button>
          </Box>
        )
      default:
        return null
    }
  }

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #0a1929 0%, #1a365d 100%)",
        position: "relative",
        overflow: "hidden",
        p: 2,
      }}
    >
      <AnimatedBackground />

      <Container maxWidth="xs">
        <Fade in={true} timeout={1000}>
          <Box sx={{ mb: 3, textAlign: "center" }}>
            <motion.img
              src={logo}
              alt="The DataTech Labs"
              style={{ maxWidth: "180px" }}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            />
          </Box>
        </Fade>

        <Paper
          component={motion.div}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          elevation={16}
          sx={{
            p: { xs: 2.5, sm: 4 },
            borderRadius: 3,
            background: "rgba(255, 255, 255, 0.05)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
            position: "relative",
          }}
        >
          {step > 1 && step < 4 && (
            <IconButton
              onClick={() => setStep((prev) => prev - 1)}
              sx={{ position: "absolute", top: 8, left: 8, color: "rgba(255,255,255,0.7)" }}
              disabled={isLoading}
            >
              <ArrowBack />
            </IconButton>
          )}

          {errorMessage && (
            <Grow in={!!errorMessage}>
              <Alert severity="error" sx={{ mb: 2 }}>
                {errorMessage}
              </Alert>
            </Grow>
          )}
          {successMessage && step < 4 && (
            <Grow in={!!successMessage}>
              <Alert severity="success" sx={{ mb: 2 }}>
                {successMessage}
              </Alert>
            </Grow>
          )}

          {renderStepContent()}

          {step < 4 && (
            <Typography sx={{ textAlign: "center", color: "#ccc", mt: 3 }}>
              Remembered your password?{" "}
              <Link
                component="button"
                onClick={() => navigate("/hrms")}
                sx={{
                  color: "#64b5f6",
                  textDecoration: "none",
                  background: "none",
                  border: "none",
                  padding: 0,
                  cursor: "pointer",
                  font: "inherit",
                  "&:hover": { textDecoration: "underline", color: "#90caf9" },
                  transition: "color 0.3s ease",
                }}
                disabled={isLoading}
              >
                Login here
              </Link>
            </Typography>
          )}
        </Paper>
      </Container>
    </Box>
  )
}

export default ForgotPasswordPage

// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   TextField,
//   Button,
//   Typography,
//   Link,
//   Paper,
//   IconButton,
//   InputAdornment,
//   Container,
//   Grow,
//   Fade,
//   CircularProgress,
//   Alert, // For success/error messages
// } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import {
//   MailOutline,
//   LockOutlined,
//   Visibility,
//   VisibilityOff,
//   ArrowBack,
//   LockResetOutlined,
//   PasswordOutlined, // For OTP
// } from "@mui/icons-material";
// import { motion } from "framer-motion";
// import logo from "../SuperAdmin/tdtllogo.png";

// // Re-using the AnimatedBackground from LoginPage
// // If it's in a separate file, import it. Otherwise, copy it here.
// // For simplicity, I'm assuming you might copy it or have it as a shared component.
// const AnimatedBackground = () => (
//   <Box
//     sx={{
//       position: "absolute",
//       top: 0,
//       left: 0,
//       right: 0,
//       bottom: 0,
//       overflow: "hidden",
//       zIndex: 0,
//     }}
//   >
//     {[...Array(15)].map((_, i) => (
//       <Box
//         component={motion.div}
//         key={i}
//         initial={{
//           x: Math.random() * 100 - 50,
//           y: Math.random() * 100 - 50,
//           opacity: 0.1 + Math.random() * 0.2,
//           scale: 0.3 + Math.random() * 1.2,
//         }}
//         animate={{
//           x: [
//             Math.random() * 100 - 50,
//             Math.random() * 100 - 50,
//           ],
//           y: [
//             Math.random() * 100 - 50,
//             Math.random() * 100 - 50,
//           ],
//           opacity: [
//             0.1 + Math.random() * 0.2,
//             0.2 + Math.random() * 0.2,
//           ]
//         }}
//         transition={{
//           duration: 10 + Math.random() * 10,
//           repeat: Infinity,
//           repeatType: "mirror"
//         }}
//         sx={{
//           position: "absolute",
//           width: 80 + Math.random() * 120,
//           height: 80 + Math.random() * 120,
//           borderRadius: "50%",
//           background: `radial-gradient(circle, rgba(25,118,210,0.15) 0%, rgba(25,118,210,0) 60%)`,
//           filter: "blur(5px)",
//           left: `${Math.random() * 100}%`,
//           top: `${Math.random() * 100}%`,
//         }}
//       />
//     ))}
//   </Box>
// );


// const ForgotPasswordPage = () => {
//   const navigate = useNavigate();
//   const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: Reset Password, 4: Success
//   const [email, setEmail] = useState("");
//   const [otp, setOtp] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [passwordVisible, setPasswordVisible] = useState(false);
//   const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");
//   const [isLoading, setIsLoading] = useState(false);

//   // Placeholder for actual API URLs
//   const API_URL_SEND_OTP = "/api/auth/send-otp"; // Replace with your actual endpoint
//   const API_URL_VERIFY_OTP = "/api/auth/verify-otp"; // Replace
//   const API_URL_RESET_PASSWORD = "/api/auth/reset-password"; // Replace

//   const handleSendOtp = async (e) => {
//     e.preventDefault();
//     setErrorMessage("");
//     setSuccessMessage("");
//     if (!email) {
//       setErrorMessage("Please enter your email address.");
//       return;
//     }
//     setIsLoading(true);

//     // --- API Call to Send OTP ---
//     try {
//       // const response = await fetch(API_URL_SEND_OTP, {
//       //   method: "POST",
//       //   headers: { "Content-Type": "application/json" },
//       //   body: JSON.stringify({ email }),
//       // });
//       // if (!response.ok) {
//       //   const errorData = await response.json();
//       //   throw new Error(errorData.detail || "Failed to send OTP.");
//       // }
//       // const data = await response.json();
//       // setSuccessMessage(data.message || "OTP sent to your email!");

//       // STUBBED RESPONSE FOR NOW:
//       await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
//       console.log("Pretending to send OTP to:", email);
//       setSuccessMessage("OTP has been sent to your email (simulated).");
//       setStep(2); // Move to OTP step

//     } catch (error) {
//       setErrorMessage(error.message || "An error occurred. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleVerifyOtp = async (e) => {
//     e.preventDefault();
//     setErrorMessage("");
//     setSuccessMessage("");
//     if (!otp) {
//       setErrorMessage("Please enter the OTP.");
//       return;
//     }
//     setIsLoading(true);

//     // --- API Call to Verify OTP ---
//     try {
//       // const response = await fetch(API_URL_VERIFY_OTP, {
//       //   method: "POST",
//       //   headers: { "Content-Type": "application/json" },
//       //   body: JSON.stringify({ email, otp }), // Send email along with OTP
//       // });
//       // if (!response.ok) {
//       //   const errorData = await response.json();
//       //   throw new Error(errorData.detail || "Invalid or expired OTP.");
//       // }
//       // const data = await response.json();
//       // setSuccessMessage(data.message || "OTP verified successfully!");

//       // STUBBED RESPONSE FOR NOW:
//       await new Promise(resolve => setTimeout(resolve, 1000));
//       if (otp === "123456") { // Simulate correct OTP
//         console.log("OTP Verified for:", email);
//         setSuccessMessage("OTP verified successfully!");
//         setStep(3); // Move to Reset Password step
//       } else {
//         throw new Error("Invalid OTP (simulated - use 123456).");
//       }
//     } catch (error) {
//       setErrorMessage(error.message || "An error occurred. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleResetPassword = async (e) => {
//     e.preventDefault();
//     setErrorMessage("");
//     setSuccessMessage("");
//     if (!newPassword || !confirmPassword) {
//       setErrorMessage("Please fill in both password fields.");
//       return;
//     }
//     if (newPassword !== confirmPassword) {
//       setErrorMessage("Passwords do not match.");
//       return;
//     }
//     // Add password strength validation if needed
//     setIsLoading(true);

//     // --- API Call to Reset Password ---
//     try {
//       // const response = await fetch(API_URL_RESET_PASSWORD, {
//       //   method: "POST",
//       //   headers: { "Content-Type": "application/json" },
//       //   body: JSON.stringify({ email, otp, newPassword }), // Or a token from verify OTP step
//       // });
//       // if (!response.ok) {
//       //   const errorData = await response.json();
//       //   throw new Error(errorData.detail || "Failed to reset password.");
//       // }
//       // const data = await response.json();

//       // STUBBED RESPONSE FOR NOW:
//       await new Promise(resolve => setTimeout(resolve, 1000));
//       console.log("Password reset for:", email, "with new password:", newPassword);
//       setSuccessMessage("Password has been reset successfully!");
//       setStep(4); // Move to Success step

//     } catch (error) {
//       setErrorMessage(error.message || "An error occurred. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const renderStepContent = () => {
//     switch (step) {
//       case 1: // Email Input
//         return (
//           <Box component="form" onSubmit={handleSendOtp} sx={{ width: "100%" }}>
//             <Typography variant="h5" sx={{ color: "white", mb: 1, fontWeight: 500 }}>
//               Forgot Your Password?
//             </Typography>
//             <Typography sx={{ color: "#ccc", mb: 3 }}>
//               Enter your email address and we'll send you an OTP to reset your password.
//             </Typography>
//             <Box sx={{ mb: 3 }}>
//               <TextField
//                 fullWidth
//                 type="email"
//                 variant="outlined"
//                 placeholder="Email Address"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <MailOutline sx={{ color: "rgba(255,255,255,0.7)" }} />
//                     </InputAdornment>
//                   ),
//                 }}
//                 sx={textFieldStyles}
//               />
//             </Box>
//             <Button fullWidth type="submit" variant="contained" disabled={isLoading} sx={buttonStyles}>
//               {isLoading ? <CircularProgress size={24} color="inherit" /> : "Send OTP"}
//             </Button>
//           </Box>
//         );
//       case 2: // OTP Input
//         return (
//           <Box component="form" onSubmit={handleVerifyOtp} sx={{ width: "100%" }}>
//             <Typography variant="h5" sx={{ color: "white", mb: 1, fontWeight: 500 }}>
//               Enter OTP
//             </Typography>
//             <Typography sx={{ color: "#ccc", mb: 3 }}>
//               An OTP has been sent to {email}. Please enter it below.
//             </Typography>
//             <Box sx={{ mb: 3 }}>
//               <TextField
//                 fullWidth
//                 type="text" // Could be "number" but text is more flexible for OTPs
//                 variant="outlined"
//                 placeholder="Enter OTP"
//                 value={otp}
//                 onChange={(e) => setOtp(e.target.value)}
//                 inputProps={{ maxLength: 6 }} // Common OTP length
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <PasswordOutlined sx={{ color: "rgba(255,255,255,0.7)" }} />
//                     </InputAdornment>
//                   ),
//                 }}
//                 sx={textFieldStyles}
//               />
//             </Box>
//             <Button fullWidth type="submit" variant="contained" disabled={isLoading} sx={buttonStyles}>
//               {isLoading ? <CircularProgress size={24} color="inherit" /> : "Verify OTP"}
//             </Button>
//             <Button fullWidth variant="text" onClick={() => setStep(1)} sx={{ mt: 2, color: "#64b5f6" }} disabled={isLoading}>
//                 Entered wrong email?
//             </Button>
//           </Box>
//         );
//       case 3: // Reset Password
//         return (
//           <Box component="form" onSubmit={handleResetPassword} sx={{ width: "100%" }}>
//             <Typography variant="h5" sx={{ color: "white", mb: 2, fontWeight: 500 }}>
//               Set New Password
//             </Typography>
//             <Box sx={{ mb: 3 }}>
//               <TextField
//                 fullWidth
//                 type={passwordVisible ? "text" : "password"}
//                 variant="outlined"
//                 placeholder="New Password"
//                 value={newPassword}
//                 onChange={(e) => setNewPassword(e.target.value)}
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <LockOutlined sx={{ color: "rgba(255,255,255,0.7)" }} />
//                     </InputAdornment>
//                   ),
//                   endAdornment: (
//                     <InputAdornment position="end">
//                       <IconButton onClick={() => setPasswordVisible(!passwordVisible)} edge="end" sx={{ color: "rgba(255,255,255,0.7)" }}>
//                         {passwordVisible ? <VisibilityOff /> : <Visibility />}
//                       </IconButton>
//                     </InputAdornment>
//                   ),
//                 }}
//                 sx={textFieldStyles}
//               />
//             </Box>
//             <Box sx={{ mb: 3 }}>
//               <TextField
//                 fullWidth
//                 type={confirmPasswordVisible ? "text" : "password"}
//                 variant="outlined"
//                 placeholder="Confirm New Password"
//                 value={confirmPassword}
//                 onChange={(e) => setConfirmPassword(e.target.value)}
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <LockResetOutlined sx={{ color: "rgba(255,255,255,0.7)" }} />
//                     </InputAdornment>
//                   ),
//                   endAdornment: (
//                     <InputAdornment position="end">
//                       <IconButton onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)} edge="end" sx={{ color: "rgba(255,255,255,0.7)" }}>
//                         {confirmPasswordVisible ? <VisibilityOff /> : <Visibility />}
//                       </IconButton>
//                     </InputAdornment>
//                   ),
//                 }}
//                 sx={textFieldStyles}
//               />
//             </Box>
//             <Button fullWidth type="submit" variant="contained" disabled={isLoading} sx={buttonStyles}>
//               {isLoading ? <CircularProgress size={24} color="inherit" /> : "Reset Password"}
//             </Button>
//           </Box>
//         );
//       case 4: // Success
//         return (
//           <Box sx={{ textAlign: "center" }}>
//              <Grow in={true}>
//                 <Alert severity="success" sx={{ mb: 3, justifyContent: 'center' }}>
//                     {successMessage}
//                 </Alert>
//              </Grow>
//             <Button
//               variant="contained"
//               onClick={() => navigate("/")}
//               sx={buttonStyles}
//             >
//               Back to Login
//             </Button>
//           </Box>
//         );
//       default:
//         return null;
//     }
//   };

//   const textFieldStyles = {
//     "& .MuiOutlinedInput-root": {
//       color: "white", borderRadius: 2, backgroundColor: "rgba(255,255,255,0.05)",
//       "& fieldset": { borderColor: "rgba(255,255,255,0.2)" },
//       "&:hover fieldset": { borderColor: "rgba(255,255,255,0.4)" },
//       "&.Mui-focused fieldset": { borderColor: "#2196f3" },
//     },
//     "& .MuiInputLabel-root, & .MuiPlaceholder-root": { color: "rgba(255,255,255,0.7)" },
//   };

//   const buttonStyles = {
//     py: 1.5, borderRadius: 2,
//     backgroundColor: "#2196f3",
//     backgroundImage: "linear-gradient(135deg,rgba(95, 116, 224, 0.89) 0%,hsla(289, 78.70%, 46.10%, 0.89) 100%)",
//     boxShadow: "0 8px 16px rgba(33, 150, 243, 0.3)",
//     "&:hover": { backgroundColor: "#1976d2", boxShadow: "0 12px 20px rgba(33, 150, 243, 0.4)" },
//     textTransform: "none", fontSize: "1rem", fontWeight: 600,
//   };

//   return (
//     <Box
//       component={motion.div}
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.8 }}
//       sx={{
//         minHeight: "100vh",
//         display: "flex",
//         alignItems: "center", // Center content vertically
//         justifyContent: "center", // Center content horizontally
//         background: "linear-gradient(135deg, #0a1929 0%, #1a365d 100%)",
//         position: "relative",
//         overflow: "hidden",
//         p: 2, // Add some padding for smaller screens
//       }}
//     >
//       <AnimatedBackground /> {/* This will be behind everything */}

//       <Container maxWidth="xs"> {/* xs is good for forms */}
//         <Fade in={true} timeout={1000}>
//           <Box sx={{ mb: 3, textAlign: "center" }}>
//             <motion.img
//               src={logo}
//               alt="The DataTech Labs"
//               style={{ maxWidth: "180px" }} // Slightly smaller logo
//               initial={{ y: -20, opacity: 0 }}
//               animate={{ y: 0, opacity: 1 }}
//               transition={{ delay: 0.2, duration: 0.5 }}
//             />
//           </Box>
//         </Fade>

//         <Paper
//           component={motion.div}
//           initial={{ y: 20, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ delay: 0.4, duration: 0.5 }}
//           elevation={16}
//           sx={{
//             p: { xs: 2.5, sm: 4 },
//             borderRadius: 3,
//             background: "rgba(255, 255, 255, 0.05)",
//             backdropFilter: "blur(10px)",
//             border: "1px solid rgba(255, 255, 255, 0.1)",
//             boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
//             position: 'relative', // For back button positioning
//           }}
//         >
//           {step > 1 && step < 4 && ( // Show back button only on OTP and Reset Password steps
//             <IconButton
//               onClick={() => setStep(prev => prev - 1)}
//               sx={{ position: 'absolute', top: 8, left: 8, color: 'rgba(255,255,255,0.7)' }}
//               disabled={isLoading}
//             >
//               <ArrowBack />
//             </IconButton>
//           )}

//           {errorMessage && (
//             <Grow in={!!errorMessage}>
//               <Alert severity="error" sx={{ mb: 2 }}>{errorMessage}</Alert>
//             </Grow>
//           )}
//           {successMessage && step < 4 && ( // Show success only for OTP sent/verified, not final success
//              <Grow in={!!successMessage}>
//                 <Alert severity="success" sx={{ mb: 2 }}>{successMessage}</Alert>
//              </Grow>
//           )}

//           {renderStepContent()}

//           {step < 4 && ( // Show "Back to Login" link only before final success step
//              <Typography sx={{ textAlign: "center", color: "#ccc", mt: 3 }}>
//                 Remembered your password?{""}
//                 <Link
//                     component="button" // Use button for onClick
//                     onClick={() => navigate("/")}
//                     sx={{
//                     color: "#64b5f6",
//                     textDecoration: "none",
//                     background: 'none',
//                     border: 'none',
//                     padding: 0,
//                     cursor: 'pointer',
//                     font: 'inherit',
//                     "&:hover": { textDecoration: "underline", color: "#90caf9" },
//                     transition: "color 0.3s ease",
//                     }}
//                     disabled={isLoading}
//                 >
//                     Login here
//                 </Link>
//             </Typography>
//           )}
//         </Paper>
//       </Container>
//     </Box>
//   );
// };

// export default ForgotPasswordPage;