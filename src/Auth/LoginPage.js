// import { useState, useEffect } from "react"
// import {
//   Box,
//   TextField,
//   Button,
//   Typography,
//   Link,
//   Paper,
//   Dialog,
//   DialogContent,
//   IconButton,
//   InputAdornment,
//   Container,
//   Grow,
//   Fade,
//   CircularProgress,
// } from "@mui/material"
// import { useNavigate } from "react-router-dom"
// import { Visibility, VisibilityOff, CheckCircle, LockOutlined, PersonOutlined } from "@mui/icons-material"
// import { motion } from "framer-motion"
// import logo from "../Auth/vetrinalogo.png"
// import hrmsImage from "../Assests/hrms.png"

// // Create a styled component for the animated background
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
//     {[...Array(20)].map((_, i) => (
//       <Box
//         component={motion.div}
//         key={i}
//         initial={{
//           x: Math.random() * 100 - 50,
//           y: Math.random() * 100 - 50,
//           opacity: 0.1 + Math.random() * 0.3,
//           scale: 0.5 + Math.random() * 1.5,
//         }}
//         animate={{
//           x: [Math.random() * 100 - 50, Math.random() * 100 - 50, Math.random() * 100 - 50],
//           y: [Math.random() * 100 - 50, Math.random() * 100 - 50, Math.random() * 100 - 50],
//           opacity: [0.1 + Math.random() * 0.3, 0.2 + Math.random() * 0.3, 0.1 + Math.random() * 0.3],
//         }}
//         transition={{
//           duration: 15 + Math.random() * 15,
//           repeat: Number.POSITIVE_INFINITY,
//           repeatType: "reverse",
//         }}
//         sx={{
//           position: "absolute",
//           width: 100 + Math.random() * 150,
//           height: 100 + Math.random() * 150,
//           borderRadius: "50%",
//           background: `radial-gradient(circle, rgba(25,118,210,0.2) 0%, rgba(25,118,210,0) 70%)`,
//           filter: "blur(8px)",
//           left: `${Math.random() * 100}%`,
//           top: `${Math.random() * 100}%`,
//         }}
//       />
//     ))}
//   </Box>
// )

// const LoginPage = () => {
//   const navigate = useNavigate()
//   const [username, setUsername] = useState("")
//   const [password, setPassword] = useState("")
//   const [passwordVisible, setPasswordVisible] = useState(false)
//   const [errorMessage, setErrorMessage] = useState("")
//   const [showSuccessDialog, setShowSuccessDialog] = useState(false)
//   const [isLoading, setIsLoading] = useState(false)
//   localStorage.setItem("loggedInUser", username);
//   const togglePasswordVisibility = () => {
//     setPasswordVisible((prev) => !prev)
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     setErrorMessage("")
//     setIsLoading(true)

//     const loginUrl = "https://tdtlworld.com/hrms-backend/login/"
    
//     const payload = { username, password }

//     try {
//       const response = await fetch(loginUrl, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       })

//       if (!response.ok) {
//         const errorData = await response.json()
//         setErrorMessage(errorData.detail || "Login failed. Please try again.")
//         setIsLoading(false)
//         return
//       }

//       const data = await response.json()
//       const { access, refresh, role, user_id, employee_id } = data

//       localStorage.setItem("accessToken", access)
//       localStorage.setItem("refreshToken", refresh)
//       localStorage.setItem("userRole", role)
//       localStorage.setItem("loggedInUser", username);
//       localStorage.setItem("loggedInEmpId", user_id);
//       localStorage.setItem("EmID", employee_id);

//       let path = ""
//       if (role === "staff") path = "/hrms/dashboard/home"
//       else if (role === "Intern") path = "/hrms/interndashboard/home"
//       else if (role === "Reporting Manager") path = "/hrms/dashboard/home"
//       else if (role === "Admin") path = "/hrms/admindashboard/home"
//       else if (role === "Superadmin") path = "/hrms/admindashboard/home"
//       else if (role === "Manager 1") path = "/hrms/dashboard/home"
//       else if (role === "HR") path = "/hrms/dashboardhr/home"
//       else if (role === "Line Manager") path = "/hrms/dashboardLM/home"
//       else if (role === "Head") path = "/hrms/dashboardHead/home"
//       else {
//         setErrorMessage("Invalid role. Please contact support.")
//         setIsLoading(false)
//         return
//       }

//       setIsLoading(false)
//       setShowSuccessDialog(true)
//       setTimeout(() => {
//         setShowSuccessDialog(false)
//         navigate(path)
//       }, 1500)
//     } catch (error) {
//       console.error("Error during login:", error)
//       setErrorMessage("An error occurred. Please try again.")
//       setIsLoading(false)
//     }
//   }

//   useEffect(() => {
//     if (localStorage.getItem("accessToken")) {
//       localStorage.removeItem("accessToken")
//       localStorage.removeItem("refreshToken")
//       localStorage.removeItem("userRole")
//     }
//     localStorage.removeItem("showSuccessDialog")
//   }, [])

//   // Common input field styles with autofill override and consistent height
//   const inputFieldStyles = {
//     "& .MuiOutlinedInput-root": {
//       color: "white",
//       borderRadius: 2,
//       backgroundColor: "rgba(255,255,255,0.05)",
//       height: "56px", // Fixed height to prevent expansion
//       "& fieldset": {
//         borderColor: "rgba(255,255,255,0.2)",
//       },
//       "&:hover fieldset": {
//         borderColor: "rgba(255,255,255,0.4)",
//       },
//       "&.Mui-focused fieldset": {
//         borderColor: "#2196f3",
//       },
//       // Override autofill styles
//       "& input:-webkit-autofill": {
//         WebkitBoxShadow: "0 0 0 1000px rgba(255,255,255,0.05) inset !important",
//         WebkitTextFillColor: "white !important",
//         transition: "background-color 5000s ease-in-out 0s",
//       },
//       "& input:-webkit-autofill:hover": {
//         WebkitBoxShadow: "0 0 0 1000px rgba(255,255,255,0.05) inset !important",
//         WebkitTextFillColor: "white !important",
//       },
//       "& input:-webkit-autofill:focus": {
//         WebkitBoxShadow: "0 0 0 1000px rgba(255,255,255,0.05) inset !important",
//         WebkitTextFillColor: "white !important",
//       },
//       "& input:-webkit-autofill:active": {
//         WebkitBoxShadow: "0 0 0 1000px rgba(255,255,255,0.05) inset !important",
//         WebkitTextFillColor: "white !important",
//       },
//     },
//     "& .MuiInputLabel-root": {
//       color: "rgba(255,255,255,0.7)",
//     },
//     "& .MuiInputBase-input": {
//       height: "auto", // Allow text to flow naturally within fixed container height
//     },
//   }

//   return (
//     <Box
//       component={motion.div}
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.8 }}
//       sx={{
//         minHeight: "100vh",
//         display: "flex",
//         background: "linear-gradient(135deg, #0a1929 0%, #1a365d 100%)",
//         position: "relative",
//         overflow: "hidden",
//       }}
//     >
//       <AnimatedBackground />

//       {/* Left side with HRMS image covering the entire panel */}
//       <Box
//         component={motion.div}
//         initial={{ x: -50, opacity: 0 }}
//         animate={{ x: 0, opacity: 1 }}
//         transition={{ duration: 0.8, delay: 0.2 }}
//         sx={{
//           flex: 1,
//           display: { xs: "none", md: "flex" },
//           position: "relative",
//           overflow: "hidden",
//           zIndex: 1,
//         }}
//       >
//         <Box
//           component={motion.div}
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.6, delay: 0.4 }}
//           sx={{
//             width: "100%",
//             height: "100%",
//             overflow: "hidden",
//           }}
//         >
//           <img
//             src={hrmsImage || "/placeholder.svg"}
//             alt="HRMS Background"
//             style={{
//               display: "block",
//               width: "110%",
//               height: "105%",
//               objectFit: "contain",
//             }}
//           />
//         </Box>
//       </Box>

//       {/* Right side with login form */}
//       <Box
//         component={motion.div}
//         initial={{ x: 50, opacity: 0 }}
//         animate={{ x: 0, opacity: 1 }}
//         transition={{ duration: 0.8, delay: 0.4 }}
//         sx={{
//           flex: 1,
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           justifyContent: "center",
//           p: { xs: 2, sm: 3, md: 4 },
//           position: "relative",
//           zIndex: 1,
//         }}
//       >
//         <Container maxWidth="sm">
//           <Fade in={true} timeout={1000}>
//             <Box sx={{ mb: 4, textAlign: "center" }}>
//               <motion.img
//                 src={logo}
//                 alt="The DataTech Labs"
//                 style={{ maxWidth: "220px" }}
//                 initial={{ y: -20, opacity: 0 }}
//                 animate={{ y: 0, opacity: 1 }}
//                 transition={{ delay: 0.6, duration: 0.5 }}
//               />
//             </Box>
//           </Fade>

//           <Paper
//             component={motion.div}
//             initial={{ y: 20, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             transition={{ delay: 0.8, duration: 0.5 }}
//             elevation={16}
//             sx={{
//               p: { xs: 2, sm: 3, md: 4 },
//               borderRadius: 3,
//               background: "rgba(255, 255, 255, 0.05)",
//               backdropFilter: "blur(10px)",
//               border: "1px solid rgba(255, 255, 255, 0.1)",
//               boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
//             }}
//           >
//             <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
//               <Typography
//                 variant="h4"
//                 component={motion.div}
//                 initial={{ x: -20, opacity: 0 }}
//                 animate={{ x: 0, opacity: 1 }}
//                 transition={{ delay: 1, duration: 0.5 }}
//                 sx={{
//                   color: "white",
//                   mb: 1,
//                   fontWeight: 600,
//                   fontFamily: "'Poppins', sans-serif",
//                 }}
//               >
//                 Sign in
//               </Typography>

//               <Typography
//                 component={motion.div}
//                 initial={{ x: -20, opacity: 0 }}
//                 animate={{ x: 0, opacity: 1 }}
//                 transition={{ delay: 1.1, duration: 0.5 }}
//                 sx={{ color: "#ccc", mb: 3 }}
//               >
//                 Access your VetHR workspace
//               </Typography>

//               {errorMessage && (
//                 <Grow in={!!errorMessage}>
//                   <Paper
//                     elevation={0}
//                     sx={{
//                       mb: 3,
//                       p: 2,
//                       bgcolor: "rgba(211, 47, 47, 0.1)",
//                       borderLeft: "4px solid #d32f2f",
//                       borderRadius: 1,
//                     }}
//                   >
//                     <Typography color="error">{errorMessage}</Typography>
//                   </Paper>
//                 </Grow>
//               )}

//               <Box
//                 component={motion.div}
//                 initial={{ y: 20, opacity: 0 }}
//                 animate={{ y: 0, opacity: 1 }}
//                 transition={{ delay: 1.2, duration: 0.5 }}
//                 sx={{ mb: 3 }}
//               >
//                 <TextField
//                   fullWidth
//                   variant="outlined"
//                   placeholder="User Name"
//                   value={username}
//                   onChange={(e) => setUsername(e.target.value)}
//                   InputProps={{
//                     startAdornment: (
//                       <InputAdornment position="start">
//                         <PersonOutlined sx={{ color: "rgba(255,255,255,0.7)" }} />
//                       </InputAdornment>
//                     ),
//                   }}
//                   sx={inputFieldStyles}
//                 />
//               </Box>

//               <Box
//                 component={motion.div}
//                 initial={{ y: 20, opacity: 0 }}
//                 animate={{ y: 0, opacity: 1 }}
//                 transition={{ delay: 1.3, duration: 0.5 }}
//                 sx={{ mb: 4 }}
//               >
//                 <TextField
//                   fullWidth
//                   type={passwordVisible ? "text" : "password"}
//                   variant="outlined"
//                   placeholder="Password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   InputProps={{
//                     startAdornment: (
//                       <InputAdornment position="start">
//                         <LockOutlined sx={{ color: "rgba(255,255,255,0.7)" }} />
//                       </InputAdornment>
//                     ),
//                     endAdornment: (
//                       <InputAdornment position="end">
//                         <IconButton
//                           onClick={togglePasswordVisibility}
//                           edge="end"
//                           sx={{
//                             color: "rgba(255,255,255,0.7)",
//                             padding: "8px", // Consistent padding to prevent layout shift
//                           }}
//                         >
//                           {passwordVisible ? <VisibilityOff /> : <Visibility />}
//                         </IconButton>
//                       </InputAdornment>
//                     ),
//                   }}
//                   sx={inputFieldStyles}
//                 />
//               </Box>

//               <Box
//                 component={motion.div}
//                 initial={{ y: 20, opacity: 0 }}
//                 animate={{ y: 0, opacity: 1 }}
//                 transition={{ delay: 1.4, duration: 0.5 }}
//               >
//                 <Button
//                   component={motion.button}
//                   whileHover={{ scale: 1.03 }}
//                   whileTap={{ scale: 0.98 }}
//                   fullWidth
//                   type="submit"
//                   variant="contained"
//                   disabled={isLoading}
//                   sx={{
//                     mb: 3,
//                     py: 1.5,
//                     borderRadius: 2,
//                     backgroundColor: "#2196f3",
//                     backgroundImage:
//                       "linear-gradient(135deg,rgba(95, 116, 224, 0.89) 0%,hsla(289, 78.70%, 46.10%, 0.89) 100%)",
//                     boxShadow: "0 8px 16px rgba(33, 150, 243, 0.3)",
//                     "&:hover": {
//                       backgroundColor: "#1976d2",
//                       boxShadow: "0 12px 20px rgba(33, 150, 243, 0.4)",
//                     },
//                     textTransform: "none",
//                     fontSize: "1rem",
//                     fontWeight: 600,
//                   }}
//                 >
//                   {isLoading ? <CircularProgress size={24} color="inherit" /> : "Sign in"}
//                 </Button>

//                 <Typography
//                   component={motion.div}
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   transition={{ delay: 1.5, duration: 0.5 }}
//                   sx={{ textAlign: "center", color: "#ccc" }}
//                 >
//                   <Link
//                     component={motion.a}
//                     whileHover={{ scale: 1.05 }}
//                     onClick={() => navigate("/forgot-password")}
//                     sx={{
//                       color: "#64b5f6",
//                       textDecoration: "none",
//                       cursor: "pointer",
//                       "&:hover": {
//                         textDecoration: "underline",
//                         color: "#90caf9",
//                       },
//                       transition: "color 0.3s ease",
//                     }}
//                   >
//                     Forgot password? Don't worry click here!
//                   </Link>
//                 </Typography>
//               </Box>
//             </Box>
//           </Paper>
//         </Container>


//         <Typography
//           component={motion.div}
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 1.6, duration: 0.5 }}
//           sx={{
//             color: "rgba(255,255,255,0.5)",
//             position: "absolute",
//             bottom: 20,
//             fontSize: "0.875rem",
//           }}
//         >
//           © 2025 The Data Tech Labs Inc. All rights reserved.
//         </Typography>
//       </Box>

//       {/* Success Dialog */}
//       <Dialog
//         open={showSuccessDialog}
//         PaperProps={{
//           component: motion.div,
//           initial: { scale: 0.8, opacity: 0 },
//           animate: { scale: 1, opacity: 1 },
//           transition: { duration: 0.3 },
//           style: {
//             borderRadius: "16px",
//             overflow: "hidden",
//             background: "rgba(255, 255, 255, 0.95)",
//             backdropFilter: "blur(10px)",
//             boxShadow: "0 24px 48px rgba(0, 0, 0, 0.2)",
//           },
//         }}
//       >
//         <DialogContent
//           sx={{
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//             py: 5,
//             px: 8,
//             minWidth: "320px",
//           }}
//         >
//           <motion.div
//             initial={{ scale: 0, rotate: -180 }}
//             animate={{ scale: 1, rotate: 0 }}
//             transition={{
//               type: "spring",
//               stiffness: 260,
//               damping: 20,
//               delay: 0.2,
//             }}
//           >
//             <CheckCircle sx={{ fontSize: 90, color: "#4caf50", mb: 2 }} />
//           </motion.div>

//           <Typography
//             variant="h5"
//             component={motion.div}
//             initial={{ y: 20, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             transition={{ delay: 0.4, duration: 0.5 }}
//             sx={{
//               textAlign: "center",
//               fontWeight: "bold",
//               color: "#333",
//               fontFamily: "'Poppins', sans-serif",
//             }}
//           >
//             Login Successful!
//           </Typography>

//           <Typography
//             component={motion.div}
//             initial={{ y: 20, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             transition={{ delay: 0.6, duration: 0.5 }}
//             sx={{
//               textAlign: "center",
//               color: "#666",
//               mt: 1,
//             }}
//           >
//             Redirecting to dashboard...
//           </Typography>

//           <Box
//             component={motion.div}
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.8, duration: 0.5 }}
//             sx={{ mt: 3 }}
//           >
//             <CircularProgress size={24} color="primary" />
//           </Box>
//         </DialogContent>
//       </Dialog>
//     </Box>
//   )
// }

// export default LoginPage







// import { useState, useEffect } from "react";
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
//   Fade,
//   CircularProgress,
// } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import { Visibility, VisibilityOff, PersonOutlined, LockOutlined } from "@mui/icons-material";
// import { motion } from "framer-motion";
// import Swal from "sweetalert2";
// import logo from "../Auth/vetrinalogo.png";
// import hrmsImage from "../Assests/hrms.png";

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
//     {[...Array(20)].map((_, i) => (
//       <Box
//         component={motion.div}
//         key={i}
//         initial={{
//           x: Math.random() * 100 - 50,
//           y: Math.random() * 100 - 50,
//           opacity: 0.1 + Math.random() * 0.3,
//           scale: 0.5 + Math.random() * 1.5,
//         }}
//         animate={{
//           x: [Math.random() * 100 - 50, Math.random() * 100 - 50, Math.random() * 100 - 50],
//           y: [Math.random() * 100 - 50, Math.random() * 100 - 50, Math.random() * 100 - 50],
//           opacity: [0.1 + Math.random() * 0.3, 0.2 + Math.random() * 0.3, 0.1 + Math.random() * 0.3],
//         }}
//         transition={{
//           duration: 15 + Math.random() * 15,
//           repeat: Number.POSITIVE_INFINITY,
//           repeatType: "reverse",
//         }}
//         sx={{
//           position: "absolute",
//           width: 100 + Math.random() * 150,
//           height: 100 + Math.random() * 150,
//           borderRadius: "50%",
//           background: `radial-gradient(circle, rgba(25,118,210,0.2) 0%, rgba(25,118,210,0) 70%)`,
//           filter: "blur(8px)",
//           left: `${Math.random() * 100}%`,
//           top: `${Math.random() * 100}%`,
//         }}
//       />
//     ))}
//   </Box>
// );

// const LoginPage = () => {
//   const navigate = useNavigate();
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [passwordVisible, setPasswordVisible] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   const togglePasswordVisibility = () => {
//     setPasswordVisible((prev) => !prev);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);

//     const loginUrl = "https://tdtlworld.com/hrms-backend/login/";
//     const payload = { username, password };

//     try {
//       const response = await fetch(loginUrl, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         setIsLoading(false);
//         Swal.fire({
//           icon: "error",
//           title: "Login Failed",
//           text: errorData.detail || "Incorrect username or password.",
//           showConfirmButton: false,
//           timer: 2500,
//           background: '#f1f1f1',
//           color: '#333',
//           customClass: {
//             popup: 'responsive-swal'
//           }
//         });
//         return;
//       }

//       const data = await response.json();
//       const { access, refresh, role, user_id, employee_id } = data;

//       localStorage.setItem("accessToken", access);
//       localStorage.setItem("refreshToken", refresh);
//       localStorage.setItem("userRole", role);
//       localStorage.setItem("loggedInUser", username);
//       localStorage.setItem("loggedInEmpId", user_id);
//       localStorage.setItem("EmID", employee_id);

//       let path = "";
//       if (role === "staff") path = "/hrms/dashboard/home";
//       else if (role === "Intern") path = "/hrms/interndashboard/home";
//       else if (role === "Reporting Manager") path = "/hrms/dashboard/home";
//       else if (role === "Admin") path = "/hrms/admindashboard/home";
//       else if (role === "Superadmin") path = "/hrms/admindashboard/home";
//       else if (role === "Manager 1") path = "/hrms/dashboard/home";
//       else if (role === "HR") path = "/hrms/dashboardhr/home";
//       else if (role === "Line Manager") path = "/hrms/dashboardLM/home";
//       else if (role === "Head") path = "/hrms/dashboardHead/home";
//       else {
//         setIsLoading(false);
//         Swal.fire({
//           icon: "error",
//           title: "Invalid Role",
//           text: "Your user role is not configured. Please contact support.",
//           showConfirmButton: false,
//           timer: 2500,
//           background: '#f1f1f1',
//           color: '#333',
//           customClass: {
//             popup: 'responsive-swal'
//           }
//         });
//         return;
//       }

//       setIsLoading(false);
//       Swal.fire({
//         icon: "success",
//         title: "Login Successful!",
//         text: "Redirecting to your dashboard...",
//         timer: 1500,
//         showConfirmButton: false,
//         background: '#f1f1f1',
//         color: '#333',
//         customClass: {
//             popup: 'responsive-swal'
//         },
//         willClose: () => {
//           navigate(path);
//         },
//       });
//     } catch (error) {
//       console.error("Error during login:", error);
//       setIsLoading(false);
//       Swal.fire({
//         icon: "error",
//         title: "Network Error",
//         text: "An error occurred. Please check your connection and try again.",
//         showConfirmButton: false,
//         timer: 2500,
//         background: '#f1f1f1',
//         color: '#333',
//         customClass: {
//             popup: 'responsive-swal'
//         }
//       });
//     }
//   };
 
//   useEffect(() => {
//     const style = document.createElement('style');
//     style.innerHTML = `
//       .responsive-swal {
//         width: 450px !important;
//       }
//       @media (max-width: 600px) {
//         .responsive-swal {
//           width: 85vw !important;
//         }
//         .responsive-swal .swal2-title {
//           font-size: 1.2rem !important;
//         }
//         .responsive-swal .swal2-html-container {
//           font-size: 0.9rem !important;
//         }
//         .responsive-swal .swal2-icon {
//            width: 4em !important;
//            height: 4em !important;
//            margin: 1em auto !important;
//         }
//       }
//     `;
//     document.head.appendChild(style);

//     return () => {
//       document.head.removeChild(style);
//     };
//   }, []);

//   useEffect(() => {
//     if (localStorage.getItem("accessToken")) {
//       localStorage.removeItem("accessToken");
//       localStorage.removeItem("refreshToken");
//       localStorage.removeItem("userRole");
//     }
//   }, []);

//   const inputFieldStyles = {
//     "& .MuiOutlinedInput-root": {
//       color: "white",
//       borderRadius: 2,
//       backgroundColor: "rgba(255,255,255,0.05)",
//       height: "56px",
//       "& fieldset": {
//         borderColor: "rgba(255,255,255,0.2)",
//       },
//       "&:hover fieldset": {
//         borderColor: "rgba(255,255,255,0.4)",
//       },
//       "&.Mui-focused fieldset": {
//         borderColor: "#2196f3",
//       },
//       "& input:-webkit-autofill, & input:-webkit-autofill:hover, & input:-webkit-autofill:focus, & input:-webkit-autofill:active": {
//         WebkitBoxShadow: "0 0 0 1000px rgba(255,255,255,0.05) inset !important",
//         WebkitTextFillColor: "white !important",
//         transition: "background-color 5000s ease-in-out 0s",
//       },
//     },
//     "& .MuiInputLabel-root": {
//       color: "rgba(255,255,255,0.7)",
//     },
//     "& .MuiInputBase-input": {
//       height: "auto",
//     },
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
//         background: "linear-gradient(135deg, #0a1929 0%, #1a365d 100%)",
//         position: "relative",
//         overflow: "hidden",
//       }}
//     >
//       <AnimatedBackground />

//       <Box
//         component={motion.div}
//         initial={{ x: -50, opacity: 0 }}
//         animate={{ x: 0, opacity: 1 }}
//         transition={{ duration: 0.8, delay: 0.2 }}
//         sx={{
//           flex: 1,
//           display: { xs: "none", md: "flex" },
//           position: "relative",
//           overflow: "hidden",
//           zIndex: 1,
//         }}
//       >
//         <Box
//           component={motion.div}
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.6, delay: 0.4 }}
//           sx={{
//             width: "100%",
//             height: "100%",
//             overflow: "hidden",
//           }}
//         >
//           <img
//             src={hrmsImage || "/placeholder.svg"}
//             alt="HRMS Background"
//             style={{
//               display: "block",
//               width: "110%",
//               height: "105%",
//               objectFit: "contain",
//             }}
//           />
//         </Box>
//       </Box>

//       <Box
//         component={motion.div}
//         initial={{ x: 50, opacity: 0 }}
//         animate={{ x: 0, opacity: 1 }}
//         transition={{ duration: 0.8, delay: 0.4 }}
//         sx={{
//           flex: 1,
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           justifyContent: "center",
//           p: { xs: 2, sm: 3, md: 4 },
//           position: "relative",
//           zIndex: 1,
//         }}
//       >
//         <Container maxWidth="sm">
//           <Fade in={true} timeout={1000}>
//             <Box sx={{ mb: 4, textAlign: "center" }}>
//               <motion.img
//                 src={logo}
//                 alt="The DataTech Labs"
//                 style={{ maxWidth: "220px" }}
//                 initial={{ y: -20, opacity: 0 }}
//                 animate={{ y: 0, opacity: 1 }}
//                 transition={{ delay: 0.6, duration: 0.5 }}
//               />
//             </Box>
//           </Fade>

//           <Paper
//             component={motion.div}
//             initial={{ y: 20, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             transition={{ delay: 0.8, duration: 0.5 }}
//             elevation={16}
//             sx={{
//               p: { xs: 2, sm: 3, md: 4 },
//               borderRadius: 3,
//               background: "rgba(255, 255, 255, 0.05)",
//               backdropFilter: "blur(10px)",
//               border: "1px solid rgba(255, 255, 255, 0.1)",
//               boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
//             }}
//           >
//             <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
//               <Typography
//                 variant="h4"
//                 component={motion.div}
//                 initial={{ x: -20, opacity: 0 }}
//                 animate={{ x: 0, opacity: 1 }}
//                 transition={{ delay: 1, duration: 0.5 }}
//                 sx={{
//                   color: "white",
//                   mb: 1,
//                   fontWeight: 600,
//                   fontFamily: "'Poppins', sans-serif",
//                 }}
//               >
//                 Sign in
//               </Typography>

//               <Typography
//                 component={motion.div}
//                 initial={{ x: -20, opacity: 0 }}
//                 animate={{ x: 0, opacity: 1 }}
//                 transition={{ delay: 1.1, duration: 0.5 }}
//                 sx={{ color: "#ccc", mb: 3 }}
//               >
//                 Access your VetHR workspace
//               </Typography>

//               <Box
//                 component={motion.div}
//                 initial={{ y: 20, opacity: 0 }}
//                 animate={{ y: 0, opacity: 1 }}
//                 transition={{ delay: 1.2, duration: 0.5 }}
//                 sx={{ mb: 3 }}
//               >
//                 <TextField
//                   fullWidth
//                   variant="outlined"
//                   placeholder="User Name"
//                   value={username}
//                   onChange={(e) => setUsername(e.target.value)}
//                   InputProps={{
//                     startAdornment: (
//                       <InputAdornment position="start">
//                         <PersonOutlined sx={{ color: "rgba(255,255,255,0.7)" }} />
//                       </InputAdornment>
//                     ),
//                   }}
//                   sx={inputFieldStyles}
//                 />
//               </Box>

//               <Box
//                 component={motion.div}
//                 initial={{ y: 20, opacity: 0 }}
//                 animate={{ y: 0, opacity: 1 }}
//                 transition={{ delay: 1.3, duration: 0.5 }}
//                 sx={{ mb: 4 }}
//               >
//                 <TextField
//                   fullWidth
//                   type={passwordVisible ? "text" : "password"}
//                   variant="outlined"
//                   placeholder="Password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   InputProps={{
//                     startAdornment: (
//                       <InputAdornment position="start">
//                         <LockOutlined sx={{ color: "rgba(255,255,255,0.7)" }} />
//                       </InputAdornment>
//                     ),
//                     endAdornment: (
//                       <InputAdornment position="end">
//                         <IconButton
//                           onClick={togglePasswordVisibility}
//                           edge="end"
//                           sx={{
//                             color: "rgba(255,255,255,0.7)",
//                             padding: "8px",
//                           }}
//                         >
//                           {passwordVisible ? <VisibilityOff /> : <Visibility />}
//                         </IconButton>
//                       </InputAdornment>
//                     ),
//                   }}
//                   sx={inputFieldStyles}
//                 />
//               </Box>

//               <Box
//                 component={motion.div}
//                 initial={{ y: 20, opacity: 0 }}
//                 animate={{ y: 0, opacity: 1 }}
//                 transition={{ delay: 1.4, duration: 0.5 }}
//               >
//                 <Button
//                   component={motion.button}
//                   whileHover={{ scale: 1.03 }}
//                   whileTap={{ scale: 0.98 }}
//                   fullWidth
//                   type="submit"
//                   variant="contained"
//                   disabled={isLoading}
//                   sx={{
//                     mb: 3,
//                     py: 1.5,
//                     borderRadius: 2,
//                     backgroundColor: "#2196f3",
//                     backgroundImage:
//                       "linear-gradient(135deg,rgba(95, 116, 224, 0.89) 0%,hsla(289, 78.70%, 46.10%, 0.89) 100%)",
//                     boxShadow: "0 8px 16px rgba(33, 150, 243, 0.3)",
//                     "&:hover": {
//                       backgroundColor: "#1976d2",
//                       boxShadow: "0 12px 20px rgba(33, 150, 243, 0.4)",
//                     },
//                     textTransform: "none",
//                     fontSize: "1rem",
//                     fontWeight: 600,
//                   }}
//                 >
//                   {isLoading ? <CircularProgress size={24} color="inherit" /> : "Sign in"}
//                 </Button>

//                 <Typography
//                   component={motion.div}
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   transition={{ delay: 1.5, duration: 0.5 }}
//                   sx={{ textAlign: "center", color: "#ccc" }}
//                 >
//                   <Link
//                     component="button"
//                     type="button"
//                     onClick={() => navigate("/forgot-password")}
//                     sx={{
//                       color: "#64b5f6",
//                       textDecoration: "none",
//                       cursor: "pointer",
//                       background: 'none',
//                       border: 'none',
//                       padding: 0,
//                       fontFamily: 'inherit',
//                       fontSize: 'inherit',
//                       "&:hover": {
//                         textDecoration: "underline",
//                         color: "#90caf9",
//                       },
//                       transition: "color 0.3s ease",
//                     }}
//                   >
//                     Forgot password? Don't worry click here!
//                   </Link>
//                 </Typography>
//               </Box>
//             </Box>
//           </Paper>
//         </Container>

//         <Typography
//           component={motion.div}
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 1.6, duration: 0.5 }}
//           sx={{
//             color: "rgba(255,255,255,0.5)",
//             position: "absolute",
//             bottom: 20,
//             fontSize: "0.875rem",
//           }}
//         >
//           © 2025 The Data Tech Labs Inc. All rights reserved.
//         </Typography>
//       </Box>
//     </Box>
//   );
// };

// export default LoginPage;





import { useState, useEffect } from "react";
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
  Fade,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff, PersonOutlined, LockOutlined } from "@mui/icons-material";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import logo from "../Auth/vetrinalogo.png";
import hrmsImage from "../Assests/hrms.png";

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
    {[...Array(20)].map((_, i) => (
      <Box
        component={motion.div}
        key={i}
        initial={{
          x: Math.random() * 100 - 50,
          y: Math.random() * 100 - 50,
          opacity: 0.1 + Math.random() * 0.3,
          scale: 0.5 + Math.random() * 1.5,
        }}
        animate={{
          x: [Math.random() * 100 - 50, Math.random() * 100 - 50, Math.random() * 100 - 50],
          y: [Math.random() * 100 - 50, Math.random() * 100 - 50, Math.random() * 100 - 50],
          opacity: [0.1 + Math.random() * 0.3, 0.2 + Math.random() * 0.3, 0.1 + Math.random() * 0.3],
        }}
        transition={{
          duration: 15 + Math.random() * 15,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
        sx={{
          position: "absolute",
          width: 100 + Math.random() * 150,
          height: 100 + Math.random() * 150,
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(25,118,210,0.2) 0%, rgba(25,118,210,0) 70%)`,
          filter: "blur(8px)",
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
        }}
      />
    ))}
  </Box>
);

const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const loginUrl = "https://tdtlworld.com/hrms-backend/login/";
    const payload = { username, password };

    try {
      const response = await fetch(loginUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setIsLoading(false);

        // **MODIFICATION START**: Check for different error message formats
        let errorMessage = "Incorrect username or password."; // Default message
        if (errorData.non_field_errors && Array.isArray(errorData.non_field_errors) && errorData.non_field_errors.length > 0) {
          // Handle specific error like "Your account is deactivated."
          errorMessage = errorData.non_field_errors[0];
        } else if (errorData.detail) {
          // Handle generic detail error
          errorMessage = errorData.detail;
        }
        // **MODIFICATION END**

        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: errorMessage, // Use the dynamically determined error message
          showConfirmButton: false,
          timer: 2500,
          background: '#f1f1f1',
          color: '#333',
          customClass: {
            popup: 'responsive-swal'
          }
        });
        return;
      }

      const data = await response.json();
      const { access, refresh, role, user_id, employee_id ,role_id} = data;

      localStorage.setItem("accessToken", access);
      localStorage.setItem("refreshToken", refresh);
      localStorage.setItem("userRole", role);
      localStorage.setItem("loggedInUser", username);
      localStorage.setItem("loggedInEmpId", user_id);
      localStorage.setItem("EmID", employee_id);
      localStorage.setItem("userRoleId", role_id);


      let path = "";
      if (role === "staff") path = "/hrms/dashboard/home";
      else if (role === "Intern") path = "/hrms/interndashboard/home";
      else if (role === "Reporting Manager") path = "/hrms/dashboard/home";
      else if (role === "Admin") path = "/hrms/admindashboard/home";
      else if (role === "Superadmin") path = "/hrms/admindashboard/home";
      else if (role === "Manager 1") path = "/hrms/dashboard/home";
      else if (role === "HR") path = "/hrms/dashboardhr/home";
      else if (role === "Line Manager") path = "/hrms/dashboardLM/home";
      else if (role === "Head") path = "/hrms/dashboardHead/home";
      else {
        setIsLoading(false);
        Swal.fire({
          icon: "error",
          title: "Invalid Role",
          text: "Your user role is not configured. Please contact support.",
          showConfirmButton: false,
          timer: 2500,
          background: '#f1f1f1',
          color: '#333',
          customClass: {
            popup: 'responsive-swal'
          }
        });
        return;
      }

      setIsLoading(false);
      Swal.fire({
        icon: "success",
        title: "Login Successful!",
        text: "Redirecting to your dashboard...",
        timer: 1500,
        showConfirmButton: false,
        background: '#f1f1f1',
        color: '#333',
        customClass: {
            popup: 'responsive-swal'
        },
        willClose: () => {
          navigate(path);
        },
      });
    } catch (error) {
      console.error("Error during login:", error);
      setIsLoading(false);
      Swal.fire({
        icon: "error",
        title: "Network Error",
        text: "An error occurred. Please check your connection and try again.",
        showConfirmButton: false,
        timer: 2500,
        background: '#f1f1f1',
        color: '#333',
        customClass: {
            popup: 'responsive-swal'
        }
      });
    }
  };
 
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      .responsive-swal {
        width: 450px !important;
      }
      @media (max-width: 600px) {
        .responsive-swal {
          width: 85vw !important;
        }
        .responsive-swal .swal2-title {
          font-size: 1.2rem !important;
        }
        .responsive-swal .swal2-html-container {
          font-size: 0.9rem !important;
        }
        .responsive-swal .swal2-icon {
           width: 4em !important;
           height: 4em !important;
           margin: 1em auto !important;
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("userRole");
    }
  }, []);

  const inputFieldStyles = {
    "& .MuiOutlinedInput-root": {
      color: "white",
      borderRadius: 2,
      backgroundColor: "rgba(255,255,255,0.05)",
      height: "56px",
      "& fieldset": {
        borderColor: "rgba(255,255,255,0.2)",
      },
      "&:hover fieldset": {
        borderColor: "rgba(255,255,255,0.4)",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#2196f3",
      },
      "& input:-webkit-autofill, & input:-webkit-autofill:hover, & input:-webkit-autofill:focus, & input:-webkit-autofill:active": {
        WebkitBoxShadow: "0 0 0 1000px rgba(255,255,255,0.05) inset !important",
        WebkitTextFillColor: "white !important",
        transition: "background-color 5000s ease-in-out 0s",
      },
    },
    "& .MuiInputLabel-root": {
      color: "rgba(255,255,255,0.7)",
    },
    "& .MuiInputBase-input": {
      height: "auto",
    },
  };

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      sx={{
        minHeight: "100vh",
        display: "flex",
        background: "linear-gradient(135deg, #0a1929 0%, #1a365d 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <AnimatedBackground />

      <Box
        component={motion.div}
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        sx={{
          flex: 1,
          display: { xs: "none", md: "flex" },
          position: "relative",
          overflow: "hidden",
          zIndex: 1,
        }}
      >
        <Box
          component={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          sx={{
            width: "100%",
            height: "100%",
            overflow: "hidden",
          }}
        >
          <img
            src={hrmsImage || "/placeholder.svg"}
            alt="HRMS Background"
            style={{
              display: "block",
              width: "110%",
              height: "105%",
              objectFit: "contain",
            }}
          />
        </Box>
      </Box>

      <Box
        component={motion.div}
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          p: { xs: 2, sm: 3, md: 4 },
          position: "relative",
          zIndex: 1,
        }}
      >
        <Container maxWidth="sm">
          <Fade in={true} timeout={1000}>
            <Box sx={{ mb: 4, textAlign: "center" }}>
              <motion.img
                src={logo}
                alt="The DataTech Labs"
                style={{ maxWidth: "220px" }}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              />
            </Box>
          </Fade>

          <Paper
            component={motion.div}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            elevation={16}
            sx={{
              p: { xs: 2, sm: 3, md: 4 },
              borderRadius: 3,
              background: "rgba(255, 255, 255, 0.05)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
            }}
          >
            <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
              <Typography
                variant="h4"
                component={motion.div}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
                sx={{
                  color: "white",
                  mb: 1,
                  fontWeight: 600,
                  fontFamily: "'Poppins', sans-serif",
                }}
              >
                Sign in
              </Typography>

              <Typography
                component={motion.div}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1.1, duration: 0.5 }}
                sx={{ color: "#ccc", mb: 3 }}
              >
                Access your VetHR workspace
              </Typography>

              <Box
                component={motion.div}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.5 }}
                sx={{ mb: 3 }}
              >
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="User Name"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonOutlined sx={{ color: "rgba(255,255,255,0.7)" }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={inputFieldStyles}
                />
              </Box>

              <Box
                component={motion.div}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.3, duration: 0.5 }}
                sx={{ mb: 4 }}
              >
                <TextField
                  fullWidth
                  type={passwordVisible ? "text" : "password"}
                  variant="outlined"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockOutlined sx={{ color: "rgba(255,255,255,0.7)" }} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={togglePasswordVisibility}
                          edge="end"
                          sx={{
                            color: "rgba(255,255,255,0.7)",
                            padding: "8px",
                          }}
                        >
                          {passwordVisible ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={inputFieldStyles}
                />
              </Box>

              <Box
                component={motion.div}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.4, duration: 0.5 }}
              >
                <Button
                  component={motion.button}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  fullWidth
                  type="submit"
                  variant="contained"
                  disabled={isLoading}
                  sx={{
                    mb: 3,
                    py: 1.5,
                    borderRadius: 2,
                    backgroundColor: "#2196f3",
                    backgroundImage:
                      "linear-gradient(135deg,rgba(95, 116, 224, 0.89) 0%,hsla(289, 78.70%, 46.10%, 0.89) 100%)",
                    boxShadow: "0 8px 16px rgba(33, 150, 243, 0.3)",
                    "&:hover": {
                      backgroundColor: "#1976d2",
                      boxShadow: "0 12px 20px rgba(33, 150, 243, 0.4)",
                    },
                    textTransform: "none",
                    fontSize: "1rem",
                    fontWeight: 600,
                  }}
                >
                  {isLoading ? <CircularProgress size={24} color="inherit" /> : "Sign in"}
                </Button>

                <Typography
                  component={motion.div}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5, duration: 0.5 }}
                  sx={{ textAlign: "center", color: "#ccc" }}
                >
                  <Link
                    component="button"
                    type="button"
                    onClick={() => navigate("/hrms/forgot-password")}
                    sx={{
                      color: "#64b5f6",
                      textDecoration: "none",
                      cursor: "pointer",
                      background: 'none',
                      border: 'none',
                      padding: 0,
                      fontFamily: 'inherit',
                      fontSize: 'inherit',
                      "&:hover": {
                        textDecoration: "underline",
                        color: "#90caf9",
                      },
                      transition: "color 0.3s ease",
                    }}
                  >
                    Forgot password? Don't worry click here!
                  </Link>
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Container>

        <Typography
          component={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.5 }}
          sx={{
            color: "rgba(255,255,255,0.5)",
            position: "absolute",
            bottom: 20,
            fontSize: "0.875rem",
          }}
        >
          © 2025 The Data Tech Labs Inc. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default LoginPage;