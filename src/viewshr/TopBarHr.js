// // import React, { useState } from "react";
// // import {
// //   AppBar,
// //   Toolbar,
// //   Typography,
// //   IconButton,
// //   Avatar,
// //   Box,
// //   Menu,
// //   MenuItem,
// //   Drawer,
// //   List,
// //   ListItem,
// //   ListItemText,
// //   Button,
// //   Paper,
// //   TextField,
// //   FormControl,
// //   InputLabel,
// //   Select,
// //   Input,
// //   Grid,
// //   Tab,
// //   Tabs,
// //   Dialog,
// //   DialogTitle,
// //   DialogContent,
// //   DialogActions,
// //   MenuItem as MuiMenuItem,
// // } from "@mui/material";
// // import * as material from "@mui/material";
// // import MenuIcon from "@mui/icons-material/Menu";
// // import NotificationsIcon from "@mui/icons-material/Notifications";
// // import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
// // import AssignmentIcon from "@mui/icons-material/Assignment";
// // import { useNavigate } from "react-router-dom";
// // import { Visibility, Delete } from "@mui/icons-material";
// // import { LocalizationProvider, StaticDatePicker } from "@mui/x-date-pickers";
// // import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
// // import DeleteIcon from "@mui/icons-material/Delete";
// // import EditIcon from "@mui/icons-material/Edit";
// // import { CheckCircle } from "@mui/icons-material";
// // import tdtlLogo from "./tdtl-logo.png";
// // import { Link } from "react-router-dom";
// // import adminlogo from "./admin-logo.jpeg";
// // export default function TopBar({ open, toggleDrawer }) {
// //   const [anchorEl, setAnchorEl] = useState(null);
// //   const [accountSidebarOpen, setAccountSidebarOpen] = useState(false);
// //   const [selectedOption, setSelectedOption] = useState(null);
// //   const [selectedTab, setSelectedTab] = useState(0); // Define the selectedTab state here
// //   const [profilePicture, setProfilePicture] = useState([adminlogo]);
// //   const [userName, setUserName] = useState("Devendra");
// //   const [accountEmail, setAccountEmail] = useState("prasad@example.com");

// //   const [formDrawerOpen, setFormDrawerOpen] = useState(false);
// //   const [currentPassword, setCurrentPassword] = useState("");
// //   const [newPassword, setNewPassword] = useState("");
// //   const [confirmNewPassword, setConfirmNewPassword] = useState("");
// //   const navigate = useNavigate();
// //   const [documents, setDocuments] = useState([]); // State to store documents
// //   const [selectedDocument, setSelectedDocument] = useState(null); // State to store selected document for viewing
// //   const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
// //   const [notificationsEl, setNotificationsEl] = useState(null);
// //   const [calendarEl, setCalendarEl] = useState(null);
// //   const [todoDialogOpen, setTodoDialogOpen] = useState(false);
// //   const [todos, setTodos] = useState([]);
// //   const [newTodo, setNewTodo] = useState("");
// //   const [showLogoutDialog, setShowLogoutDialog] = useState(false);

// //   const [editIndex, setEditIndex] = useState(null);

// //   const handleProfileClick = (event) => {
// //     setAnchorEl(event.currentTarget);
// //   };
// //   const handleNotificationsClick = (event) => {
// //     setNotificationsEl(event.currentTarget);
// //   };
// //   const handleNotificationsClose = () => {
// //     setNotificationsEl(null);
// //   };
// //   const handleCalendarClick = (event) => {
// //     setCalendarEl(event.currentTarget);
// //   };

// //   const handleCalendarClose = () => {
// //     setCalendarEl(null);
// //   };

// //   const handleTodoClick = () => {
// //     setTodoDialogOpen(true);
// //   };

// //   const handleTodoClose = () => {
// //     setTodoDialogOpen(false);
// //     setEditIndex(null);
// //     setNewTodo("");
// //   };

// //   const handleMenuClose = () => {
// //     setAnchorEl(null);
// //   };
// //   const handleAddTodo = () => {
// //     if (newTodo.trim()) {
// //       if (editIndex !== null) {
// //         const updatedTodos = [...todos];
// //         updatedTodos[editIndex] = newTodo;
// //         setTodos(updatedTodos);
// //         setEditIndex(null);
// //       } else {
// //         setTodos([...todos, newTodo]);
// //       }
// //       setNewTodo("");
// //     }
// //   };

// //   const handleEditTodo = (index) => {
// //     setEditIndex(index);
// //     setNewTodo(todos[index]);
// //     setTodoDialogOpen(true);
// //   };

// //   const handleDeleteTodo = (index) => {
// //     setTodos(todos.filter((_, i) => i !== index));
// //   };

// //   const handleAccountClick = () => {
// //     setAccountSidebarOpen(true);
// //     handleMenuClose();
// //   };
// //   const handleLogout = () => {
// //     setAnchorEl(null);
// //     setShowLogoutDialog(true);
// //     setTimeout(() => {
// //       setShowLogoutDialog(false);
// //       navigate("/"); // Redirect to LoginPage
// //     }, 1000);
// //   };

// //   const handleAccountSidebarClose = () => {
// //     setAccountSidebarOpen(false);
// //     setSelectedOption(null);
// //   };

// //   const handleOptionClick = (option) => {
// //     setSelectedOption(option);
// //     setFormDrawerOpen(true);
// //   };

// //   const handleFormDrawerClose = () => {
// //     setFormDrawerOpen(false);
// //   };

// //   const handleFileChange = (event) => {
// //     const file = event.target.files[0];
// //     if (file) {
// //       const reader = new FileReader();
// //       reader.onload = (e) => {
// //         setProfilePicture(e.target.result);
// //       };
// //       reader.readAsDataURL(file);
// //     }
// //   };

// //   const handlePasswordChange = () => {
// //     if (newPassword !== confirmNewPassword) {
// //       alert("New passwords do not match!");
// //       return;
// //     }
// //     if (newPassword.length < 6) {
// //       alert("New password must be at least 6 characters long!");
// //       return;
// //     }
// //     alert("Password successfully updated!");
// //     setCurrentPassword("");
// //     setNewPassword("");
// //     setConfirmNewPassword("");
// //   };

// //   // new
// //   const handleUploadDocument = (event) => {
// //     const file = event.target.files[0];
// //     if (file && file.type === "application/pdf") {
// //       const newDocument = {
// //         id: documents.length + 1,
// //         name: file.name,
// //         url: URL.createObjectURL(file), // Generate a URL to preview the PDF
// //       };
// //       setDocuments([...documents, newDocument]);
// //     } else {
// //       alert("Please upload a valid PDF file.");
// //     }
// //     setUploadDialogOpen(false); // Close the dialog after upload
// //   };

// //   // Function to handle document view (opens in dialog)
// //   const handleViewDocument = (document) => {
// //     setSelectedDocument(document);
// //   };

// //   // Function to handle document deletion
// //   const handleDeleteDocument = (id) => {
// //     setDocuments(documents.filter((document) => document.id !== id));
// //   };

// //   // Function to close the view dialog
// //   const handleCloseViewDocument = () => {
// //     setSelectedDocument(null);
// //   };

// //   // Component to render the list of uploaded documents
// //   const DocumentList = () => (
// //     <Box sx={{ padding: 2 }}>
// //       <Typography variant="h6">Document List</Typography>
// //       <List>
// //         {documents.map((document) => (
// //           <ListItem key={document.id}>
// //             <ListItemText primary={document.name} />
// //             <IconButton
// //               onClick={() => handleViewDocument(document)}
// //               color="primary"
// //             >
// //               <Visibility />
// //             </IconButton>
// //             <IconButton
// //               onClick={() => handleDeleteDocument(document.id)}
// //               color="secondary"
// //             >
// //               <Delete />
// //             </IconButton>
// //           </ListItem>
// //         ))}
// //       </List>
// //     </Box>
// //   );

// //   // Component to render the PDF upload form
// //   const DocumentUpload = () => (
// //     <Box sx={{ padding: 2 }}>
// //       <Typography variant="h6">Upload a New Document (PDF)</Typography>
// //       <input
// //         type="file"
// //         accept="application/pdf"
// //         onChange={handleUploadDocument}
// //       />
// //       <DialogActions>
// //         <Button
// //           variant="contained"
// //           color="secondary"
// //           onClick={() => setUploadDialogOpen(false)}
// //         >
// //           Close
// //         </Button>
// //       </DialogActions>
// //     </Box>
// //   );

// //   // Component to render the PDF viewer (inside a modal)
// //   const DocumentView = () => {
// //     if (!selectedDocument) return null;

// //     return (
// //       <Box sx={{ padding: 2 }}>
// //         <Typography variant="h6">View Document</Typography>
// //         <Typography variant="body1">{selectedDocument.name}</Typography>
// //         <Box sx={{ mt: 2 }}>
// //           <iframe
// //             src={selectedDocument.url}
// //             width="100%"
// //             height="600px"
// //             title="Document Viewer"
// //           />
// //         </Box>
// //         <DialogActions>
// //           <Button
// //             variant="contained"
// //             color="secondary"
// //             onClick={handleCloseViewDocument}
// //           >
// //             Close
// //           </Button>
// //         </DialogActions>
// //       </Box>
// //     );
// //   };
// //   // new
// //   const renderContent = () => {
// //     switch (selectedOption) {
// //       case "Basic Information":
// //         return <BasicInformationForm />;
// //       case "Personal Information":
// //         return (
// //           <PersonalInformation
// //             selectedTab={selectedTab}
// //             setSelectedTab={setSelectedTab}
// //           />
// //         );
// //       case "Profile Picture":
// //         return (
// //           <Box sx={{ padding: 2 }}>
// //             <Typography variant="h6" gutterBottom>
// //               Update Profile Picture
// //             </Typography>
// //             <Paper sx={{ padding: 2, textAlign: "center" }}>
// //               <Avatar
// //                 src={profilePicture}
// //                 sx={{ width: 100, height: 100, margin: "0 auto 16px" }}
// //               />
// //               <Input
// //                 type="file"
// //                 accept="image/*"
// //                 onChange={handleFileChange}
// //                 sx={{ display: "block", margin: "16px auto" }}
// //               />
// //               <Button
// //                 variant="contained"
// //                 color="primary"
// //                 onClick={handleFormDrawerClose}
// //               >
// //                 Save
// //               </Button>
// //             </Paper>
// //           </Box>
// //         );
// //       case "Account Information":
// //         return (
// //           <AccountInformationForm
// //             userName={userName}
// //             setUserName={setUserName}
// //             accountEmail={accountEmail}
// //             setAccountEmail={setAccountEmail}
// //           />
// //         );
// //       case "Documents":
// //         return (
// //           <Box sx={{ padding: 2 }}>
// //             <Typography variant="h6" gutterBottom>
// //               Document Management (PDFs)
// //             </Typography>

// //             {/* Button to open the upload dialog */}
// //             <Button
// //               variant="contained"
// //               color="primary"
// //               onClick={() => setUploadDialogOpen(true)}
// //               sx={{ mb: 2 }}
// //             >
// //               Upload Document
// //             </Button>

// //             {/* Document list */}
// //             <DocumentList />

// //             {/* Upload Document Dialog */}
// //             <Dialog
// //               open={uploadDialogOpen}
// //               onClose={() => setUploadDialogOpen(false)}
// //             >
// //               <DialogTitle>Upload PDF Document</DialogTitle>
// //               <DialogContent>
// //                 <DocumentUpload />
// //               </DialogContent>
// //             </Dialog>

// //             {/* View Document Dialog */}
// //             <Dialog
// //               open={Boolean(selectedDocument)}
// //               onClose={handleCloseViewDocument}
// //             >
// //               <DialogTitle>View PDF Document</DialogTitle>
// //               <DialogContent>
// //                 <DocumentView />
// //               </DialogContent>
// //             </Dialog>
// //           </Box>
// //         );
// //       case "Change Password":
// //         return (
// //           <Box sx={{ padding: 2 }}>
// //             <Typography variant="h6" gutterBottom>
// //               Change Password
// //             </Typography>
// //             <TextField
// //               label="Current Password"
// //               fullWidth
// //               type="password"
// //               value={currentPassword}
// //               onChange={(e) => setCurrentPassword(e.target.value)}
// //               sx={{ mt: 2 }}
// //             />
// //             <TextField
// //               label="New Password"
// //               fullWidth
// //               type="password"
// //               value={newPassword}
// //               onChange={(e) => setNewPassword(e.target.value)}
// //               sx={{ mt: 2 }}
// //             />
// //             <TextField
// //               label="Confirm New Password"
// //               fullWidth
// //               type="password"
// //               value={confirmNewPassword}
// //               onChange={(e) => setConfirmNewPassword(e.target.value)}
// //               sx={{ mt: 2 }}
// //             />
// //             <Button
// //               variant="contained"
// //               color="primary"
// //               onClick={handlePasswordChange}
// //               sx={{ mt: 2 }}
// //             >
// //               Change Password
// //             </Button>
// //           </Box>
// //         );
// //       case "Contract":
// //         return <ContractForm />;
// //       default:
// //         return (
// //           <Typography variant="h6">Select an option to view details</Typography>
// //         );
// //     }
// //   };

// //   const ContractForm = () => (
// //     <Box sx={{ padding: 2 }}>
// //       <Typography variant="h6" gutterBottom>
// //         Set Contract
// //       </Typography>
// //       <Grid container spacing={2}>
// //         <Grid item xs={12} sm={6}>
// //           <TextField
// //             label="Contract Date"
// //             fullWidth
// //             type="date"
// //             InputLabelProps={{ shrink: true }}
// //           />
// //         </Grid>
// //         <Grid item xs={12} sm={6}>
// //           <FormControl fullWidth>
// //             <InputLabel>Billing</InputLabel>
// //             <Select>
// //               <MuiMenuItem value="Yes">Yes</MuiMenuItem>
// //               <MuiMenuItem value="No">No</MuiMenuItem>
// //             </Select>
// //           </FormControl>
// //         </Grid>
// //         <Grid item xs={12} sm={6}>
// //           <TextField
// //             label="Department"
// //             fullWidth
// //             defaultValue="Integrated Technology Services"
// //           />
// //         </Grid>
// //         <Grid item xs={12} sm={6}>
// //           <TextField
// //             label="Designation"
// //             fullWidth
// //             defaultValue="Junior Software Engineer"
// //           />
// //         </Grid>
// //         <Grid item xs={12} sm={6}>
// //           <TextField label="Basic Salary" fullWidth type="number" />
// //         </Grid>
// //         <Grid item xs={12} sm={6}>
// //           <TextField label="Hourly Rate" fullWidth type="number" />
// //         </Grid>
// //         <Grid item xs={12} sm={6}>
// //           <FormControl fullWidth>
// //             <InputLabel>Payslip Type</InputLabel>
// //             <Select>
// //               <MuiMenuItem value="Per Month">Per Month</MuiMenuItem>
// //               <MuiMenuItem value="Per Week">Per Week</MuiMenuItem>
// //             </Select>
// //           </FormControl>
// //         </Grid>
// //         <Grid item xs={12} sm={6}>
// //           <FormControl fullWidth>
// //             <InputLabel>Office Shift</InputLabel>
// //             <Select>
// //               <MuiMenuItem value="Morning Shift">Morning Shift</MuiMenuItem>
// //               <MuiMenuItem value="Night Shift">Night Shift</MuiMenuItem>
// //             </Select>
// //           </FormControl>
// //         </Grid>
// //         <Grid item xs={12} sm={6}>
// //           <TextField
// //             label="Contract End"
// //             fullWidth
// //             type="date"
// //             InputLabelProps={{ shrink: true }}
// //           />
// //         </Grid>
// //         <Grid item xs={12} sm={6}>
// //           <FormControl fullWidth>
// //             <InputLabel>Probation</InputLabel>
// //             <Select>
// //               <MuiMenuItem value="Yes">Yes</MuiMenuItem>
// //               <MuiMenuItem value="No">No</MuiMenuItem>
// //             </Select>
// //           </FormControl>
// //         </Grid>
// //       </Grid>
// //       <Button variant="contained" color="primary" sx={{ mt: 2 }}>
// //         Save Contract
// //       </Button>
// //     </Box>
// //   );

// //   return (
// //     <>
// //       <AppBar
// //         position="fixed"
// //         sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
// //       >
// //         <Toolbar>
// //           <IconButton
// //             color="inherit"
// //             aria-label="toggle drawer"
// //             onClick={toggleDrawer}
// //             edge="start"
// //             sx={{ mr: 2 }}
// //           >
// //             <MenuIcon />
// //           </IconButton>
// //           {/* <Typography variant="h6" noWrap component="div">
// //             Dashboard
// //           </Typography> */}
// //           <Box>
// //             <Link to="/dashboard/home">
// //               <img
// //                 src={tdtlLogo}
// //                 alt="TDTL Logo"
// //                 style={{
// //                   height: "40px", // Adjust height as needed
// //                   width: "auto",
// //                   cursor: "pointer",
// //                 }}
// //               />
// //             </Link>
// //           </Box>
// //           <Box sx={{ flexGrow: 1 }} />
// //           <material.IconButton
// //             color="inherit"
// //             onClick={handleNotificationsClick}
// //           >
// //             <material.Badge badgeContent={3} color="secondary">
// //               <NotificationsIcon />
// //             </material.Badge>
// //           </material.IconButton>
// //           <material.Menu
// //             anchorEl={notificationsEl}
// //             open={Boolean(notificationsEl)}
// //             onClose={handleNotificationsClose}
// //             anchorOrigin={{
// //               vertical: "bottom",
// //               horizontal: "right",
// //             }}
// //             transformOrigin={{
// //               vertical: "top",
// //               horizontal: "right",
// //             }}
// //           >
// //             <material.MenuItem onClick={handleNotificationsClose}>
// //               Lorem ipsum dolor sit amet.
// //             </material.MenuItem>
// //             <material.MenuItem onClick={handleNotificationsClose}>
// //               Lorem ipsum dolor sit amet.
// //             </material.MenuItem>
// //             <material.MenuItem onClick={handleNotificationsClose}>
// //               Lorem ipsum dolor sit amet.
// //             </material.MenuItem>
// //           </material.Menu>
// //           <material.IconButton color="inherit" onClick={handleCalendarClick}>
// //             <CalendarTodayIcon />
// //           </material.IconButton>
// //           <material.Menu
// //             anchorEl={calendarEl}
// //             open={Boolean(calendarEl)}
// //             onClose={handleCalendarClose}
// //             anchorOrigin={{
// //               vertical: "bottom",
// //               horizontal: "right",
// //             }}
// //             transformOrigin={{
// //               vertical: "top",
// //               horizontal: "right",
// //             }}
// //           >
// //             <LocalizationProvider dateAdapter={AdapterDateFns}>
// //               <StaticDatePicker
// //                 displayStaticWrapperAs="desktop"
// //                 value={new Date()}
// //                 onChange={() => {}}
// //               />
// //             </LocalizationProvider>
// //           </material.Menu>

// //           <material.IconButton color="inherit" onClick={handleTodoClick}>
// //             <AssignmentIcon />
// //           </material.IconButton>
// //           <material.Dialog
// //             open={todoDialogOpen}
// //             onClose={handleTodoClose}
// //             maxWidth="xs"
// //             fullWidth
// //           >
// //             <material.DialogTitle>Todo List</material.DialogTitle>
// //             <material.DialogContent>
// //               <material.TextField
// //                 label="New Todo"
// //                 value={newTodo}
// //                 onChange={(e) => setNewTodo(e.target.value)}
// //                 fullWidth
// //                 margin="normal"
// //               />
// //               <material.Button
// //                 variant="contained"
// //                 color="primary"
// //                 onClick={handleAddTodo}
// //                 fullWidth
// //               >
// //                 {editIndex !== null ? "Update Todo" : "Add Todo"}
// //               </material.Button>
// //               <material.List>
// //                 {todos.map((todo, index) => (
// //                   <material.ListItem key={index}>
// //                     <material.ListItemText primary={todo} />
// //                     <material.ListItemSecondaryAction>
// //                       <material.IconButton
// //                         edge="end"
// //                         onClick={() => handleEditTodo(index)}
// //                       >
// //                         <EditIcon />
// //                       </material.IconButton>
// //                       <material.IconButton
// //                         edge="end"
// //                         onClick={() => handleDeleteTodo(index)}
// //                       >
// //                         <DeleteIcon />
// //                       </material.IconButton>
// //                     </material.ListItemSecondaryAction>
// //                   </material.ListItem>
// //                 ))}
// //               </material.List>
// //             </material.DialogContent>
// //             <material.DialogActions>
// //               <material.Button onClick={handleTodoClose} color="secondary">
// //                 Close
// //               </material.Button>
// //             </material.DialogActions>
// //           </material.Dialog>

// //           <Box
// //             sx={{
// //               display: "flex",
// //               alignItems: "center",
// //               justifyContent: "center",
// //               ml: 2,
// //             }}
// //             onClick={handleProfileClick}
// //           >
// //             <Avatar alt="Profile Picture" src={profilePicture} />
// //             <Box sx={{ ml: 1 }}>
// //               <Typography variant="subtitle">{userName}</Typography>
// //               <br />
// //               <Typography variant="caption">Admin</Typography>
// //             </Box>
// //           </Box>
// //           <Menu
// //             anchorEl={anchorEl}
// //             open={Boolean(anchorEl)}
// //             onClose={handleMenuClose}
// //           >
// //             <MenuItem onClick={handleAccountClick}>My Account</MenuItem>
// //             <material.MenuItem onClick={handleLogout}>Logout</material.MenuItem>

// //             <material.Dialog
// //               open={showLogoutDialog}
// //               sx={{
// //                 "& .MuiDialog-paper": {
// //                   minWidth: "300px",
// //                   borderRadius: "16px",
// //                   textAlign: "center",
// //                   padding: "16px",
// //                 },
// //               }}
// //             >
// //               <material.DialogContent>
// //                 <CheckCircle sx={{ fontSize: 80, color: "#4caf50", mb: 2 }} />
// //                 <material.Typography
// //                   variant="h5"
// //                   sx={{ fontWeight: "bold", color: "#333" }}
// //                 >
// //                   Logout Successful!
// //                 </material.Typography>
// //                 <material.Typography sx={{ color: "#666", mt: 1 }}>
// //                   Redirecting to login...
// //                 </material.Typography>
// //               </material.DialogContent>
// //             </material.Dialog>
// //           </Menu>
// //         </Toolbar>
// //       </AppBar>

// //       <Drawer
// //         anchor="right"
// //         open={accountSidebarOpen}
// //         onClose={handleAccountSidebarClose}
// //         sx={{
// //           "& .MuiDrawer-paper": {
// //             width: 300,
// //             padding: 2,
// //             top: 64,
// //           },
// //         }}
// //       >
// //         <Typography variant="h6">My Account</Typography>
// //         <List>
// //           {[
// //             "Basic Information",
// //             "Personal Information",
// //             "Profile Picture",
// //             "Account Information",
// //             "Documents",
// //             "Change Password",
// //             "Contract",
// //           ].map((text) => (
// //             <ListItem button key={text} onClick={() => handleOptionClick(text)}>
// //               <ListItemText primary={text} />
// //             </ListItem>
// //           ))}
// //         </List>
// //       </Drawer>

// //       <Drawer
// //         anchor="right"
// //         open={formDrawerOpen}
// //         onClose={handleFormDrawerClose}
// //         sx={{
// //           "& .MuiDrawer-paper": {
// //             width: 600,
// //             padding: 2,
// //             top: 64,
// //           },
// //         }}
// //       >
// //         {renderContent()}
// //       </Drawer>
// //     </>
// //   );
// // }

// // // Basic Information Form
// // const BasicInformationForm = () => (
// //   <Box sx={{ padding: 6 }}>
// //     <Typography variant="h6" gutterBottom>
// //       Basic Information Form
// //     </Typography>
// //     <Grid container spacing={2}>
// //       <Grid item xs={12} sm={4}>
// //         <TextField label="First Name" fullWidth />
// //       </Grid>
// //       <Grid item xs={12} sm={4}>
// //         <TextField label="Middle Name" fullWidth />
// //       </Grid>
// //       <Grid item xs={12} sm={4}>
// //         <TextField label="Last Name" fullWidth />
// //       </Grid>
// //       <Grid item xs={12} sm={6}>
// //         <TextField label="Contact Number" fullWidth />
// //       </Grid>
// //       <Grid item xs={12} sm={6}>
// //         <FormControl fullWidth>
// //           <InputLabel>Gender</InputLabel>
// //           <Select>
// //             <MenuItem value="Male">Male</MenuItem>
// //             <MenuItem value="Female">Female</MenuItem>
// //             <MenuItem value="Other">Other</MenuItem>
// //           </Select>
// //         </FormControl>
// //       </Grid>
// //       <Grid item xs={12} sm={6}>
// //         <TextField label="Employee ID" fullWidth />
// //       </Grid>
// //       <Grid item xs={12} sm={6}>
// //         <TextField
// //           label="Date of Birth"
// //           type="date"
// //           fullWidth
// //           InputLabelProps={{ shrink: true }}
// //         />
// //       </Grid>
// //       <Grid item xs={12} sm={6}>
// //         <FormControl fullWidth>
// //           <InputLabel>Marital Status</InputLabel>
// //           <Select>
// //             <MenuItem value="Single">Single</MenuItem>
// //             <MenuItem value="Married">Married</MenuItem>
// //           </Select>
// //         </FormControl>
// //       </Grid>
// //       <Grid item xs={12} sm={6}>
// //         <TextField label="State" fullWidth />
// //       </Grid>
// //       <Grid item xs={12} sm={6}>
// //         <TextField label="City" fullWidth />
// //       </Grid>
// //       <Grid item xs={12} sm={6}>
// //         <TextField label="Zip Code" fullWidth />
// //       </Grid>
// //       <Grid item xs={12} sm={6}>
// //         <TextField label="Religion" fullWidth />
// //       </Grid>
// //       <Grid item xs={12} sm={6}>
// //         <TextField label="Blood Group" fullWidth />
// //       </Grid>
// //       <Grid item xs={12} sm={6}>
// //         <TextField label="Nationality" fullWidth />
// //       </Grid>
// //       <Grid item xs={12} sm={6}>
// //         <TextField label="Citizenship" fullWidth />
// //       </Grid>
// //       <Grid item xs={12}>
// //         <TextField label="Address" fullWidth multiline rows={3} />
// //       </Grid>
// //     </Grid>
// //     <Button variant="contained" color="primary" sx={{ mt: 2 }}>
// //       Update Profile
// //     </Button>
// //   </Box>
// // );

// // // Account Information Form
// // const AccountInformationForm = ({
// //   userName,
// //   setUserName,
// //   accountEmail,
// //   setAccountEmail,
// // }) => (
// //   <Box>
// //     <Typography variant="h6">Account Information Form</Typography>
// //     <TextField
// //       label="User Name"
// //       fullWidth
// //       value={userName}
// //       onChange={(e) => setUserName(e.target.value)}
// //       sx={{ mt: 2 }}
// //     />
// //     <TextField
// //       label="Email"
// //       fullWidth
// //       value={accountEmail}
// //       onChange={(e) => setAccountEmail(e.target.value)}
// //       sx={{ mt: 2 }}
// //     />
// //     <Button variant="contained" color="primary" sx={{ mt: 2 }}>
// //       Save Changes
// //     </Button>
// //   </Box>
// // );

// // // Personal Information Component with Tabs
// // const PersonalInformation = ({ selectedTab, setSelectedTab }) => {
// //   const [bio, setBio] = useState("");
// //   const [experience, setExperience] = useState("");
// //   const [facebookUrl, setFacebookUrl] = useState("");
// //   const [twitterUrl, setTwitterUrl] = useState("");
// //   const [googlePlusUrl, setGooglePlusUrl] = useState("");
// //   const [linkedinUrl, setLinkedinUrl] = useState("");

// //   const [fullName, setFullName] = useState("");
// //   const [contactNumber, setContactNumber] = useState("");
// //   const [email, setEmail] = useState("");
// //   const [address, setAddress] = useState("");

// //   const handleTabChange = (event, newValue) => {
// //     setSelectedTab(newValue);
// //   };

// //   const handleUpdateSocialProfile = () => {
// //     alert("Social profile updated!");
// //   };

// //   const handleSubmitEmergencyContact = () => {
// //     alert("Emergency contact submitted!");
// //   };

// //   return (
// //     <Box sx={{ padding: 6 }}>
// //       <Typography variant="h6">Personal Information</Typography>
// //       <Tabs
// //         value={selectedTab}
// //         onChange={handleTabChange}
// //         indicatorColor="primary"
// //         textColor="primary"
// //         sx={{ mt: 2 }}
// //       >
// //         <Tab label="Bio" />
// //         <Tab label="Social Profile" />
// //         <Tab label="Bank Account" />
// //         <Tab label="Emergency Contact" />
// //       </Tabs>

// //       {selectedTab === 0 && (
// //         <Box sx={{ mt: 2 }}>
// //           <Typography variant="h6">Bio</Typography>
// //           <TextField
// //             label="Bio"
// //             fullWidth
// //             value={bio}
// //             onChange={(e) => setBio(e.target.value)}
// //             sx={{ mt: 2 }}
// //           />
// //           <FormControl fullWidth sx={{ mt: 2 }}>
// //             <InputLabel>Experience</InputLabel>
// //             <Select
// //               value={experience}
// //               onChange={(e) => setExperience(e.target.value)}
// //             >
// //               <MuiMenuItem value="Beginner">Beginner</MuiMenuItem>
// //               <MuiMenuItem value="Intermediate">Intermediate</MuiMenuItem>
// //               <MuiMenuItem value="Expert">Expert</MuiMenuItem>
// //             </Select>
// //           </FormControl>
// //           <Button variant="contained" color="primary" sx={{ mt: 2 }}>
// //             Update Bio
// //           </Button>
// //         </Box>
// //       )}
// //       {selectedTab === 1 && (
// //         <Box sx={{ mt: 2 }}>
// //           <Typography variant="h6">Social Profile</Typography>
// //           <TextField
// //             label="Facebook URL"
// //             fullWidth
// //             value={facebookUrl}
// //             onChange={(e) => setFacebookUrl(e.target.value)}
// //             sx={{ mt: 2 }}
// //           />
// //           <TextField
// //             label="Twitter URL"
// //             fullWidth
// //             value={twitterUrl}
// //             onChange={(e) => setTwitterUrl(e.target.value)}
// //             sx={{ mt: 2 }}
// //           />
// //           <TextField
// //             label="Google Plus URL"
// //             fullWidth
// //             value={googlePlusUrl}
// //             onChange={(e) => setGooglePlusUrl(e.target.value)}
// //             sx={{ mt: 2 }}
// //           />
// //           <TextField
// //             label="LinkedIn URL"
// //             fullWidth
// //             value={linkedinUrl}
// //             onChange={(e) => setLinkedinUrl(e.target.value)}
// //             sx={{ mt: 2 }}
// //           />
// //           <Button
// //             variant="contained"
// //             color="primary"
// //             sx={{ mt: 2 }}
// //             onClick={handleUpdateSocialProfile}
// //           >
// //             Update
// //           </Button>
// //         </Box>
// //       )}
// //       {selectedTab === 2 && (
// //         <Box sx={{ mt: 4 }}>
// //           <Typography variant="h6">Bank Account</Typography>
// //           <TextField label="Account Title" fullWidth sx={{ mt: 2 }} />
// //           <TextField label="Account Number" fullWidth sx={{ mt: 2 }} />
// //           <TextField label="Bank Name" fullWidth sx={{ mt: 2 }} />
// //           <TextField label="IBAN" fullWidth sx={{ mt: 2 }} />
// //           <TextField label="SWIFT Code" fullWidth sx={{ mt: 2 }} />
// //           <TextField label="Bank Branch" fullWidth sx={{ mt: 2 }} />
// //           <Button variant="contained" color="primary" sx={{ mt: 2 }}>
// //             Save Bank Account Info
// //           </Button>
// //         </Box>
// //       )}
// //       {selectedTab === 3 && (
// //         <Box sx={{ mt: 2 }}>
// //           <Typography variant="h6">Emergency Contact</Typography>
// //           <TextField
// //             label="Full Name"
// //             fullWidth
// //             value={fullName}
// //             onChange={(e) => setFullName(e.target.value)}
// //             sx={{ mt: 2 }}
// //           />
// //           <TextField
// //             label="Contact Number"
// //             fullWidth
// //             value={contactNumber}
// //             onChange={(e) => setContactNumber(e.target.value)}
// //             sx={{ mt: 2 }}
// //           />
// //           <TextField
// //             label="Email"
// //             fullWidth
// //             value={email}
// //             onChange={(e) => setEmail(e.target.value)}
// //             sx={{ mt: 2 }}
// //           />
// //           <TextField
// //             label="Address"
// //             fullWidth
// //             value={address}
// //             onChange={(e) => setAddress(e.target.value)}
// //             sx={{ mt: 2 }}
// //           />
// //           <Button
// //             variant="contained"
// //             color="primary"
// //             sx={{ mt: 2 }}
// //             onClick={handleSubmitEmergencyContact}
// //           >
// //             Submit Contact
// //           </Button>
// //         </Box>
// //       )}
// //     </Box>
// //   );
// // };


// import React, { useState } from "react";
// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   IconButton,
//   Avatar,
//   Box,
//   Menu,
//   MenuItem,
//   Drawer,
//   List,
//   ListItem,
//   ListItemText,
//   Button,
//   Paper,
//   TextField,
//   FormControl,
//   InputLabel,
//   Select,
//   Input,
//   Grid,
//   Tab,
//   Tabs,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   MenuItem as MuiMenuItem,
// } from "@mui/material";
// import * as material from "@mui/material";
// import MenuIcon from "@mui/icons-material/Menu";
// import NotificationsIcon from "@mui/icons-material/Notifications";
// import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
// import AssignmentIcon from "@mui/icons-material/Assignment";
// import { useNavigate } from "react-router-dom";
// import { Visibility, Delete } from "@mui/icons-material";
// import { LocalizationProvider, StaticDatePicker } from "@mui/x-date-pickers";
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
// import DeleteIcon from "@mui/icons-material/Delete";
// import EditIcon from "@mui/icons-material/Edit";
// import { CheckCircle } from "@mui/icons-material";
// import tdtlLogo from "./tdtl-logo.png";
// import { Link } from "react-router-dom";
// import adminlogo from "./admin-logo.jpeg";
// export default function TopBar({ open, toggleDrawer }) {
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [accountSidebarOpen, setAccountSidebarOpen] = useState(false);
//   const [selectedOption, setSelectedOption] = useState(null);
//   const [selectedTab, setSelectedTab] = useState(0); // Define the selectedTab state here
//   const [profilePicture, setProfilePicture] = useState([adminlogo]);
//   const [userName, setUserName] = useState("Devendra");
//   const [accountEmail, setAccountEmail] = useState("prasad@example.com");

//   const [formDrawerOpen, setFormDrawerOpen] = useState(false);
//   const [currentPassword, setCurrentPassword] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmNewPassword, setConfirmNewPassword] = useState("");
//   const navigate = useNavigate();
//   const [documents, setDocuments] = useState([]); // State to store documents
//   const [selectedDocument, setSelectedDocument] = useState(null); // State to store selected document for viewing
//   const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
//   const [notificationsEl, setNotificationsEl] = useState(null);
//   const [calendarEl, setCalendarEl] = useState(null);
//   const [todoDialogOpen, setTodoDialogOpen] = useState(false);
//   const [todos, setTodos] = useState([]);
//   const [newTodo, setNewTodo] = useState("");
//   const [showLogoutDialog, setShowLogoutDialog] = useState(false);

//   const [editIndex, setEditIndex] = useState(null);

//   const handleProfileClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };
//   const handleNotificationsClick = (event) => {
//     setNotificationsEl(event.currentTarget);
//   };
//   const handleNotificationsClose = () => {
//     setNotificationsEl(null);
//   };
//   const handleCalendarClick = (event) => {
//     setCalendarEl(event.currentTarget);
//   };

//   const handleCalendarClose = () => {
//     setCalendarEl(null);
//   };

//   const handleTodoClick = () => {
//     setTodoDialogOpen(true);
//   };

//   const handleTodoClose = () => {
//     setTodoDialogOpen(false);
//     setEditIndex(null);
//     setNewTodo("");
//   };

//   const handleMenuClose = () => {
//     setAnchorEl(null);
//   };
//   const handleAddTodo = () => {
//     if (newTodo.trim()) {
//       if (editIndex !== null) {
//         const updatedTodos = [...todos];
//         updatedTodos[editIndex] = newTodo;
//         setTodos(updatedTodos);
//         setEditIndex(null);
//       } else {
//         setTodos([...todos, newTodo]);
//       }
//       setNewTodo("");
//     }
//   };

//   const handleEditTodo = (index) => {
//     setEditIndex(index);
//     setNewTodo(todos[index]);
//     setTodoDialogOpen(true);
//   };

//   const handleDeleteTodo = (index) => {
//     setTodos(todos.filter((_, i) => i !== index));
//   };

//   const handleAccountClick = () => {
//     setAccountSidebarOpen(true);
//     handleMenuClose();
//   };
//   // const handleLogout = () => {
//   //   setAnchorEl(null);
//   //   setShowLogoutDialog(true);
//   //   setTimeout(() => {
//   //     setShowLogoutDialog(false);
//   //     navigate("/"); // Redirect to LoginPage
//   //   }, 1000);
//   // };

//   const handleLogout = () => {
//     // Clear tokens and role from localStorage
//     localStorage.removeItem("accessToken");
//     localStorage.removeItem("refreshToken");
//     localStorage.removeItem("userRole");

//     setAnchorEl(null);
//     setShowLogoutDialog(true);

//     setTimeout(() => {
//       setShowLogoutDialog(false);
//       window.location.href = "/hrms"; // Redirect to LoginPage
//     }, 3000);
//   };

//   const handleAccountSidebarClose = () => {
//     setAccountSidebarOpen(false);
//     setSelectedOption(null);
//   };

//   const handleOptionClick = (option) => {
//     setSelectedOption(option);
//     setFormDrawerOpen(true);
//   };

//   const handleFormDrawerClose = () => {
//     setFormDrawerOpen(false);
//   };

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         setProfilePicture(e.target.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handlePasswordChange = () => {
//     if (newPassword !== confirmNewPassword) {
//       alert("New passwords do not match!");
//       return;
//     }
//     if (newPassword.length < 6) {
//       alert("New password must be at least 6 characters long!");
//       return;
//     }
//     alert("Password successfully updated!");
//     setCurrentPassword("");
//     setNewPassword("");
//     setConfirmNewPassword("");
//   };

//   // new
//   const handleUploadDocument = (event) => {
//     const file = event.target.files[0];
//     if (file && file.type === "application/pdf") {
//       const newDocument = {
//         id: documents.length + 1,
//         name: file.name,
//         url: URL.createObjectURL(file), // Generate a URL to preview the PDF
//       };
//       setDocuments([...documents, newDocument]);
//     } else {
//       alert("Please upload a valid PDF file.");
//     }
//     setUploadDialogOpen(false); // Close the dialog after upload
//   };

//   // Function to handle document view (opens in dialog)
//   const handleViewDocument = (document) => {
//     setSelectedDocument(document);
//   };

//   // Function to handle document deletion
//   const handleDeleteDocument = (id) => {
//     setDocuments(documents.filter((document) => document.id !== id));
//   };

//   // Function to close the view dialog
//   const handleCloseViewDocument = () => {
//     setSelectedDocument(null);
//   };

//   // Component to render the list of uploaded documents
//   const DocumentList = () => (
//     <Box sx={{ padding: 2 }}>
//       <Typography variant="h6">Document List</Typography>
//       <List>
//         {documents.map((document) => (
//           <ListItem key={document.id}>
//             <ListItemText primary={document.name} />
//             <IconButton
//               onClick={() => handleViewDocument(document)}
//               color="primary"
//             >
//               <Visibility />
//             </IconButton>
//             <IconButton
//               onClick={() => handleDeleteDocument(document.id)}
//               color="secondary"
//             >
//               <Delete />
//             </IconButton>
//           </ListItem>
//         ))}
//       </List>
//     </Box>
//   );

//   // Component to render the PDF upload form
//   const DocumentUpload = () => (
//     <Box sx={{ padding: 2 }}>
//       <Typography variant="h6">Upload a New Document (PDF)</Typography>
//       <input
//         type="file"
//         accept="application/pdf"
//         onChange={handleUploadDocument}
//       />
//       <DialogActions>
//         <Button
//           variant="contained"
//           color="secondary"
//           onClick={() => setUploadDialogOpen(false)}
//         >
//           Close
//         </Button>
//       </DialogActions>
//     </Box>
//   );

//   // Component to render the PDF viewer (inside a modal)
//   const DocumentView = () => {
//     if (!selectedDocument) return null;

//     return (
//       <Box sx={{ padding: 2 }}>
//         <Typography variant="h6">View Document</Typography>
//         <Typography variant="body1">{selectedDocument.name}</Typography>
//         <Box sx={{ mt: 2 }}>
//           <iframe
//             src={selectedDocument.url}
//             width="100%"
//             height="600px"
//             title="Document Viewer"
//           />
//         </Box>
//         <DialogActions>
//           <Button
//             variant="contained"
//             color="secondary"
//             onClick={handleCloseViewDocument}
//           >
//             Close
//           </Button>
//         </DialogActions>
//       </Box>
//     );
//   };
//   // new
//   const renderContent = () => {
//     switch (selectedOption) {
//       case "Basic Information":
//         return <BasicInformationForm />;
//       case "Personal Information":
//         return (
//           <PersonalInformation
//             selectedTab={selectedTab}
//             setSelectedTab={setSelectedTab}
//           />
//         );
//       case "Profile Picture":
//         return (
//           <Box sx={{ padding: 2 }}>
//             <Typography variant="h6" gutterBottom>
//               Update Profile Picture
//             </Typography>
//             <Paper sx={{ padding: 2, textAlign: "center" }}>
//               <Avatar
//                 src={profilePicture}
//                 sx={{ width: 100, height: 100, margin: "0 auto 16px" }}
//               />
//               <Input
//                 type="file"
//                 accept="image/*"
//                 onChange={handleFileChange}
//                 sx={{ display: "block", margin: "16px auto" }}
//               />
//               <Button
//                 variant="contained"
//                 color="primary"
//                 onClick={handleFormDrawerClose}
//               >
//                 Save
//               </Button>
//             </Paper>
//           </Box>
//         );
//       case "Account Information":
//         return (
//           <AccountInformationForm
//             userName={userName}
//             setUserName={setUserName}
//             accountEmail={accountEmail}
//             setAccountEmail={setAccountEmail}
//           />
//         );
//       case "Documents":
//         return (
//           <Box sx={{ padding: 2 }}>
//             <Typography variant="h6" gutterBottom>
//               Document Management (PDFs)
//             </Typography>

//             {/* Button to open the upload dialog */}
//             <Button
//               variant="contained"
//               color="primary"
//               onClick={() => setUploadDialogOpen(true)}
//               sx={{ mb: 2 }}
//             >
//               Upload Document
//             </Button>

//             {/* Document list */}
//             <DocumentList />

//             {/* Upload Document Dialog */}
//             <Dialog
//               open={uploadDialogOpen}
//               onClose={() => setUploadDialogOpen(false)}
//             >
//               <DialogTitle>Upload PDF Document</DialogTitle>
//               <DialogContent>
//                 <DocumentUpload />
//               </DialogContent>
//             </Dialog>

//             {/* View Document Dialog */}
//             <Dialog
//               open={Boolean(selectedDocument)}
//               onClose={handleCloseViewDocument}
//             >
//               <DialogTitle>View PDF Document</DialogTitle>
//               <DialogContent>
//                 <DocumentView />
//               </DialogContent>
//             </Dialog>
//           </Box>
//         );
//       case "Change Password":
//         return (
//           <Box sx={{ padding: 2 }}>
//             <Typography variant="h6" gutterBottom>
//               Change Password
//             </Typography>
//             <TextField
//               label="Current Password"
//               fullWidth
//               type="password"
//               value={currentPassword}
//               onChange={(e) => setCurrentPassword(e.target.value)}
//               sx={{ mt: 2 }}
//             />
//             <TextField
//               label="New Password"
//               fullWidth
//               type="password"
//               value={newPassword}
//               onChange={(e) => setNewPassword(e.target.value)}
//               sx={{ mt: 2 }}
//             />
//             <TextField
//               label="Confirm New Password"
//               fullWidth
//               type="password"
//               value={confirmNewPassword}
//               onChange={(e) => setConfirmNewPassword(e.target.value)}
//               sx={{ mt: 2 }}
//             />
//             <Button
//               variant="contained"
//               color="primary"
//               onClick={handlePasswordChange}
//               sx={{ mt: 2 }}
//             >
//               Change Password
//             </Button>
//           </Box>
//         );
//       case "Contract":
//         return <ContractForm />;
//       default:
//         return (
//           <Typography variant="h6">Select an option to view details</Typography>
//         );
//     }
//   };

//   const ContractForm = () => (
//     <Box sx={{ padding: 2 }}>
//       <Typography variant="h6" gutterBottom>
//         Set Contract
//       </Typography>
//       <Grid container spacing={2}>
//         <Grid item xs={12} sm={6}>
//           <TextField
//             label="Contract Date"
//             fullWidth
//             type="date"
//             InputLabelProps={{ shrink: true }}
//           />
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <FormControl fullWidth>
//             <InputLabel>Billing</InputLabel>
//             <Select>
//               <MuiMenuItem value="Yes">Yes</MuiMenuItem>
//               <MuiMenuItem value="No">No</MuiMenuItem>
//             </Select>
//           </FormControl>
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <TextField
//             label="Department"
//             fullWidth
//             defaultValue="Integrated Technology Services"
//           />
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <TextField
//             label="Designation"
//             fullWidth
//             defaultValue="Junior Software Engineer"
//           />
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <TextField label="Basic Salary" fullWidth type="number" />
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <TextField label="Hourly Rate" fullWidth type="number" />
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <FormControl fullWidth>
//             <InputLabel>Payslip Type</InputLabel>
//             <Select>
//               <MuiMenuItem value="Per Month">Per Month</MuiMenuItem>
//               <MuiMenuItem value="Per Week">Per Week</MuiMenuItem>
//             </Select>
//           </FormControl>
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <FormControl fullWidth>
//             <InputLabel>Office Shift</InputLabel>
//             <Select>
//               <MuiMenuItem value="Morning Shift">Morning Shift</MuiMenuItem>
//               <MuiMenuItem value="Night Shift">Night Shift</MuiMenuItem>
//             </Select>
//           </FormControl>
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <TextField
//             label="Contract End"
//             fullWidth
//             type="date"
//             InputLabelProps={{ shrink: true }}
//           />
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <FormControl fullWidth>
//             <InputLabel>Probation</InputLabel>
//             <Select>
//               <MuiMenuItem value="Yes">Yes</MuiMenuItem>
//               <MuiMenuItem value="No">No</MuiMenuItem>
//             </Select>
//           </FormControl>
//         </Grid>
//       </Grid>
//       <Button variant="contained" color="primary" sx={{ mt: 2 }}>
//         Save Contract
//       </Button>
//     </Box>
//   );

//   return (
//     <>
//       <AppBar
//         position="fixed"
//         sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
//       >
//         <Toolbar>
//           <IconButton
//             color="inherit"
//             aria-label="toggle drawer"
//             onClick={toggleDrawer}
//             edge="start"
//             sx={{ mr: 2 }}
//           >
//             <MenuIcon />
//           </IconButton>
//           {/* <Typography variant="h6" noWrap component="div">
//             Dashboard
//           </Typography> */}
//           <Box>
//             <Link to="/hrms/dashboard/home">
//               <img
//                 src={tdtlLogo}
//                 alt="TDTL Logo"
//                 style={{
//                   height: "40px", // Adjust height as needed
//                   width: "auto",
//                   cursor: "pointer",
//                 }}
//               />
//             </Link>
//           </Box>
//           <Box sx={{ flexGrow: 1 }} />
//           <material.IconButton
//             color="inherit"
//             onClick={handleNotificationsClick}
//           >
//             <material.Badge badgeContent={3} color="secondary">
//               <NotificationsIcon />
//             </material.Badge>
//           </material.IconButton>
//           <material.Menu
//             anchorEl={notificationsEl}
//             open={Boolean(notificationsEl)}
//             onClose={handleNotificationsClose}
//             anchorOrigin={{
//               vertical: "bottom",
//               horizontal: "right",
//             }}
//             transformOrigin={{
//               vertical: "top",
//               horizontal: "right",
//             }}
//           >
//             <material.MenuItem onClick={handleNotificationsClose}>
//               Lorem ipsum dolor sit amet.
//             </material.MenuItem>
//             <material.MenuItem onClick={handleNotificationsClose}>
//               Lorem ipsum dolor sit amet.
//             </material.MenuItem>
//             <material.MenuItem onClick={handleNotificationsClose}>
//               Lorem ipsum dolor sit amet.
//             </material.MenuItem>
//           </material.Menu>
//           <material.IconButton color="inherit" onClick={handleCalendarClick}>
//             <CalendarTodayIcon />
//           </material.IconButton>
//           <material.Menu
//             anchorEl={calendarEl}
//             open={Boolean(calendarEl)}
//             onClose={handleCalendarClose}
//             anchorOrigin={{
//               vertical: "bottom",
//               horizontal: "right",
//             }}
//             transformOrigin={{
//               vertical: "top",
//               horizontal: "right",
//             }}
//           >
//             <LocalizationProvider dateAdapter={AdapterDateFns}>
//               <StaticDatePicker
//                 displayStaticWrapperAs="desktop"
//                 value={new Date()}
//                 onChange={() => {}}
//               />
//             </LocalizationProvider>
//           </material.Menu>

//           <material.IconButton color="inherit" onClick={handleTodoClick}>
//             <AssignmentIcon />
//           </material.IconButton>
//           <material.Dialog
//             open={todoDialogOpen}
//             onClose={handleTodoClose}
//             maxWidth="xs"
//             fullWidth
//           >
//             <material.DialogTitle>Todo List</material.DialogTitle>
//             <material.DialogContent>
//               <material.TextField
//                 label="New Todo"
//                 value={newTodo}
//                 onChange={(e) => setNewTodo(e.target.value)}
//                 fullWidth
//                 margin="normal"
//               />
//               <material.Button
//                 variant="contained"
//                 color="primary"
//                 onClick={handleAddTodo}
//                 fullWidth
//               >
//                 {editIndex !== null ? "Update Todo" : "Add Todo"}
//               </material.Button>
//               <material.List>
//                 {todos.map((todo, index) => (
//                   <material.ListItem key={index}>
//                     <material.ListItemText primary={todo} />
//                     <material.ListItemSecondaryAction>
//                       <material.IconButton
//                         edge="end"
//                         onClick={() => handleEditTodo(index)}
//                       >
//                         <EditIcon />
//                       </material.IconButton>
//                       <material.IconButton
//                         edge="end"
//                         onClick={() => handleDeleteTodo(index)}
//                       >
//                         <DeleteIcon />
//                       </material.IconButton>
//                     </material.ListItemSecondaryAction>
//                   </material.ListItem>
//                 ))}
//               </material.List>
//             </material.DialogContent>
//             <material.DialogActions>
//               <material.Button onClick={handleTodoClose} color="secondary">
//                 Close
//               </material.Button>
//             </material.DialogActions>
//           </material.Dialog>

//           <Box
//             sx={{
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               ml: 2,
//             }}
//             onClick={handleProfileClick}
//           >
//             <Avatar alt="Profile Picture" src={profilePicture} />
//             <Box sx={{ ml: 1 }}>
//               <Typography variant="subtitle">{userName}</Typography>
//               <br />
//               <Typography variant="caption">HR</Typography>
//             </Box>
//           </Box>
//           <Menu
//             anchorEl={anchorEl}
//             open={Boolean(anchorEl)}
//             onClose={handleMenuClose}
//           >
//             <MenuItem onClick={handleAccountClick}>My Account</MenuItem>
//             <material.MenuItem onClick={handleLogout}>Logout</material.MenuItem>

//             <material.Dialog
//               open={showLogoutDialog}
//               sx={{
//                 "& .MuiDialog-paper": {
//                   minWidth: "300px",
//                   borderRadius: "16px",
//                   textAlign: "center",
//                   padding: "16px",
//                 },
//               }}
//             >
//               <material.DialogContent>
//                 <CheckCircle sx={{ fontSize: 80, color: "#4caf50", mb: 2 }} />
//                 <material.Typography
//                   variant="h5"
//                   sx={{ fontWeight: "bold", color: "#333" }}
//                 >
//                   Logout Successful!
//                 </material.Typography>
//                 <material.Typography sx={{ color: "#666", mt: 1 }}>
//                   Redirecting to login...
//                 </material.Typography>
//               </material.DialogContent>
//             </material.Dialog>
//           </Menu>
//         </Toolbar>
//       </AppBar>

//       <Drawer
//         anchor="right"
//         open={accountSidebarOpen}
//         onClose={handleAccountSidebarClose}
//         sx={{
//           "& .MuiDrawer-paper": {
//             width: 300,
//             padding: 2,
//             top: 64,
//           },
//         }}
//       >
//         <Typography variant="h6">My Account</Typography>
//         <List>
//           {[
//             "Basic Information",
//             "Personal Information",
//             "Profile Picture",
//             "Account Information",
//             "Documents",
//             "Change Password",
//             "Contract",
//           ].map((text) => (
//             <ListItem button key={text} onClick={() => handleOptionClick(text)}>
//               <ListItemText primary={text} />
//             </ListItem>
//           ))}
//         </List>
//       </Drawer>

//       <Drawer
//         anchor="right"
//         open={formDrawerOpen}
//         onClose={handleFormDrawerClose}
//         sx={{
//           "& .MuiDrawer-paper": {
//             width: 600,
//             padding: 2,
//             top: 64,
//           },
//         }}
//       >
//         {renderContent()}
//       </Drawer>
//     </>
//   );
// }

// // Basic Information Form
// const BasicInformationForm = () => (
//   <Box sx={{ padding: 6 }}>
//     <Typography variant="h6" gutterBottom>
//       Basic Information Form
//     </Typography>
//     <Grid container spacing={2}>
//       <Grid item xs={12} sm={4}>
//         <TextField label="First Name" fullWidth />
//       </Grid>
//       <Grid item xs={12} sm={4}>
//         <TextField label="Middle Name" fullWidth />
//       </Grid>
//       <Grid item xs={12} sm={4}>
//         <TextField label="Last Name" fullWidth />
//       </Grid>
//       <Grid item xs={12} sm={6}>
//         <TextField label="Contact Number" fullWidth />
//       </Grid>
//       <Grid item xs={12} sm={6}>
//         <FormControl fullWidth>
//           <InputLabel>Gender</InputLabel>
//           <Select>
//             <MenuItem value="Male">Male</MenuItem>
//             <MenuItem value="Female">Female</MenuItem>
//             <MenuItem value="Other">Other</MenuItem>
//           </Select>
//         </FormControl>
//       </Grid>
//       <Grid item xs={12} sm={6}>
//         <TextField label="Employee ID" fullWidth />
//       </Grid>
//       <Grid item xs={12} sm={6}>
//         <TextField
//           label="Date of Birth"
//           type="date"
//           fullWidth
//           InputLabelProps={{ shrink: true }}
//         />
//       </Grid>
//       <Grid item xs={12} sm={6}>
//         <FormControl fullWidth>
//           <InputLabel>Marital Status</InputLabel>
//           <Select>
//             <MenuItem value="Single">Single</MenuItem>
//             <MenuItem value="Married">Married</MenuItem>
//           </Select>
//         </FormControl>
//       </Grid>
//       <Grid item xs={12} sm={6}>
//         <TextField label="State" fullWidth />
//       </Grid>
//       <Grid item xs={12} sm={6}>
//         <TextField label="City" fullWidth />
//       </Grid>
//       <Grid item xs={12} sm={6}>
//         <TextField label="Zip Code" fullWidth />
//       </Grid>
//       <Grid item xs={12} sm={6}>
//         <TextField label="Religion" fullWidth />
//       </Grid>
//       <Grid item xs={12} sm={6}>
//         <TextField label="Blood Group" fullWidth />
//       </Grid>
//       <Grid item xs={12} sm={6}>
//         <TextField label="Nationality" fullWidth />
//       </Grid>
//       <Grid item xs={12} sm={6}>
//         <TextField label="Citizenship" fullWidth />
//       </Grid>
//       <Grid item xs={12}>
//         <TextField label="Address" fullWidth multiline rows={3} />
//       </Grid>
//     </Grid>
//     <Button variant="contained" color="primary" sx={{ mt: 2 }}>
//       Update Profile
//     </Button>
//   </Box>
// );

// // Account Information Form
// const AccountInformationForm = ({
//   userName,
//   setUserName,
//   accountEmail,
//   setAccountEmail,
// }) => (
//   <Box>
//     <Typography variant="h6">Account Information Form</Typography>
//     <TextField
//       label="User Name"
//       fullWidth
//       value={userName}
//       onChange={(e) => setUserName(e.target.value)}
//       sx={{ mt: 2 }}
//     />
//     <TextField
//       label="Email"
//       fullWidth
//       value={accountEmail}
//       onChange={(e) => setAccountEmail(e.target.value)}
//       sx={{ mt: 2 }}
//     />
//     <Button variant="contained" color="primary" sx={{ mt: 2 }}>
//       Save Changes
//     </Button>
//   </Box>
// );

// // Personal Information Component with Tabs
// const PersonalInformation = ({ selectedTab, setSelectedTab }) => {
//   const [bio, setBio] = useState("");
//   const [experience, setExperience] = useState("");
//   const [facebookUrl, setFacebookUrl] = useState("");
//   const [twitterUrl, setTwitterUrl] = useState("");
//   const [googlePlusUrl, setGooglePlusUrl] = useState("");
//   const [linkedinUrl, setLinkedinUrl] = useState("");

//   const [fullName, setFullName] = useState("");
//   const [contactNumber, setContactNumber] = useState("");
//   const [email, setEmail] = useState("");
//   const [address, setAddress] = useState("");

//   const handleTabChange = (event, newValue) => {
//     setSelectedTab(newValue);
//   };

//   const handleUpdateSocialProfile = () => {
//     alert("Social profile updated!");
//   };

//   const handleSubmitEmergencyContact = () => {
//     alert("Emergency contact submitted!");
//   };

//   return (
//     <Box sx={{ padding: 6 }}>
//       <Typography variant="h6">Personal Information</Typography>
//       <Tabs
//         value={selectedTab}
//         onChange={handleTabChange}
//         indicatorColor="primary"
//         textColor="primary"
//         sx={{ mt: 2 }}
//       >
//         <Tab label="Bio" />
//         <Tab label="Social Profile" />
//         <Tab label="Bank Account" />
//         <Tab label="Emergency Contact" />
//       </Tabs>

//       {selectedTab === 0 && (
//         <Box sx={{ mt: 2 }}>
//           <Typography variant="h6">Bio</Typography>
//           <TextField
//             label="Bio"
//             fullWidth
//             value={bio}
//             onChange={(e) => setBio(e.target.value)}
//             sx={{ mt: 2 }}
//           />
//           <FormControl fullWidth sx={{ mt: 2 }}>
//             <InputLabel>Experience</InputLabel>
//             <Select
//               value={experience}
//               onChange={(e) => setExperience(e.target.value)}
//             >
//               <MuiMenuItem value="Beginner">Beginner</MuiMenuItem>
//               <MuiMenuItem value="Intermediate">Intermediate</MuiMenuItem>
//               <MuiMenuItem value="Expert">Expert</MuiMenuItem>
//             </Select>
//           </FormControl>
//           <Button variant="contained" color="primary" sx={{ mt: 2 }}>
//             Update Bio
//           </Button>
//         </Box>
//       )}
//       {selectedTab === 1 && (
//         <Box sx={{ mt: 2 }}>
//           <Typography variant="h6">Social Profile</Typography>
//           <TextField
//             label="Facebook URL"
//             fullWidth
//             value={facebookUrl}
//             onChange={(e) => setFacebookUrl(e.target.value)}
//             sx={{ mt: 2 }}
//           />
//           <TextField
//             label="Twitter URL"
//             fullWidth
//             value={twitterUrl}
//             onChange={(e) => setTwitterUrl(e.target.value)}
//             sx={{ mt: 2 }}
//           />
//           <TextField
//             label="Google Plus URL"
//             fullWidth
//             value={googlePlusUrl}
//             onChange={(e) => setGooglePlusUrl(e.target.value)}
//             sx={{ mt: 2 }}
//           />
//           <TextField
//             label="LinkedIn URL"
//             fullWidth
//             value={linkedinUrl}
//             onChange={(e) => setLinkedinUrl(e.target.value)}
//             sx={{ mt: 2 }}
//           />
//           <Button
//             variant="contained"
//             color="primary"
//             sx={{ mt: 2 }}
//             onClick={handleUpdateSocialProfile}
//           >
//             Update
//           </Button>
//         </Box>
//       )}
//       {selectedTab === 2 && (
//         <Box sx={{ mt: 4 }}>
//           <Typography variant="h6">Bank Account</Typography>
//           <TextField label="Account Title" fullWidth sx={{ mt: 2 }} />
//           <TextField label="Account Number" fullWidth sx={{ mt: 2 }} />
//           <TextField label="Bank Name" fullWidth sx={{ mt: 2 }} />
//           <TextField label="IBAN" fullWidth sx={{ mt: 2 }} />
//           <TextField label="SWIFT Code" fullWidth sx={{ mt: 2 }} />
//           <TextField label="Bank Branch" fullWidth sx={{ mt: 2 }} />
//           <Button variant="contained" color="primary" sx={{ mt: 2 }}>
//             Save Bank Account Info
//           </Button>
//         </Box>
//       )}
//       {selectedTab === 3 && (
//         <Box sx={{ mt: 2 }}>
//           <Typography variant="h6">Emergency Contact</Typography>
//           <TextField
//             label="Full Name"
//             fullWidth
//             value={fullName}
//             onChange={(e) => setFullName(e.target.value)}
//             sx={{ mt: 2 }}
//           />
//           <TextField
//             label="Contact Number"
//             fullWidth
//             value={contactNumber}
//             onChange={(e) => setContactNumber(e.target.value)}
//             sx={{ mt: 2 }}
//           />
//           <TextField
//             label="Email"
//             fullWidth
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             sx={{ mt: 2 }}
//           />
//           <TextField
//             label="Address"
//             fullWidth
//             value={address}
//             onChange={(e) => setAddress(e.target.value)}
//             sx={{ mt: 2 }}
//           />
//           <Button
//             variant="contained"
//             color="primary"
//             sx={{ mt: 2 }}
//             onClick={handleSubmitEmergencyContact}
//           >
//             Submit Contact
//           </Button>
//         </Box>
//       )}
//     </Box>
//   );
// };



// import { useState, useEffect } from "react"
// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   IconButton,
//   Avatar,
//   Box,
//   Menu,
//   MenuItem,
//   Drawer,
//   List,
//   ListItem,
//   ListItemText,
//   Button,
//   DialogActions,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   TextField,
//   ListItemSecondaryAction,
//   Badge,
// } from "@mui/material"
// import MenuIcon from "@mui/icons-material/Menu"
// import NotificationsIcon from "@mui/icons-material/Notifications"
// import CalendarTodayIcon from "@mui/icons-material/CalendarToday"
// import AssignmentIcon from "@mui/icons-material/Assignment"
// import { LocalizationProvider, StaticDatePicker } from "@mui/x-date-pickers"
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
// import DeleteIcon from "@mui/icons-material/Delete"
// import EditIcon from "@mui/icons-material/Edit"
// import { CheckCircle } from "@mui/icons-material"
// import tdtlLogo from "./vetrinalogo.png"
// import { Link } from "react-router-dom"
// import adminlogo from "./admin-logo.jpeg"

// import axiosInstance from "../utils/axiosInstance";

// // Import sub-components
// import BasicInformationForm from "./basicinfotopbar"
// import PersonalInformation from "./personalinfotopbar"
// import ProfileTopBar from "./profiletopbar"
// // import AccountTopBar from "./accounttopbar" // Removed
// import DocumentTopBar from "./documenttopbar"
// import ChangePassTopBar from "./changepasstopbar"
// import ContractTopBar from "./contracttopbar"

// export default function TopBar({ open, toggleDrawer }) {
//   const [anchorEl, setAnchorEl] = useState(null)
//   const [accountSidebarOpen, setAccountSidebarOpen] = useState(false)
//   const [selectedOption, setSelectedOption] = useState(null)
//   const [selectedTab, setSelectedTab] = useState(0)
//   const [profilePicture, setProfilePicture] = useState(adminlogo)
//   const [formDrawerOpen, setFormDrawerOpen] = useState(false)

//   // --- STATES FOR DYNAMIC UI DATA ---
//   const [userName, setUserName] = useState("User");
//   const [userRole, setUserRole] = useState("Employee");
//   const [notifications, setNotifications] = useState([]);
//   const [notificationsEl, setNotificationsEl] = useState(null);
//   const [todos, setTodos] = useState([]);
//   const [todoDialogOpen, setTodoDialogOpen] = useState(false);
//   const [newTodo, setNewTodo] = useState("");
//   const [editingTodo, setEditingTodo] = useState(null);
//   const [calendarEl, setCalendarEl] = useState(null);
//   const [showLogoutDialog, setShowLogoutDialog] = useState(false);

//   const employeeId = localStorage.getItem("loggedInEmpId"); 
//   const userId = localStorage.getItem("loggedInUser"); 
//   const empid = localStorage.getItem("EmID");

//   // --- API: Fetch User Name and Role ---
//   useEffect(() => {
//     const fetchUserData = async () => {
//       if (!employeeId) return;
//       try {
//         const response = await axiosInstance.get('/api/dropdown/employee-role/');
//         if (response.data && Array.isArray(response.data)) {
//           const currentUser = response.data.find(emp => emp.id === Number(employeeId));
//           if (currentUser) {
//             setUserName(currentUser.employee_name);
//             setUserRole(currentUser.role_name);
//           }
//         }
//       } catch (error) {
//         console.error("Failed to fetch user role data:", error);
//       }
//     };
//     fetchUserData();
//   }, [employeeId]);


//   // --- API: Fetch Notifications ---
//   useEffect(() => {
//     const fetchNotifications = async () => {
//       if (!employeeId) return;
//       try {
//         const response = await axiosInstance.get(`/notifications/global/${empid}/`);
//         const { birthdays, work_anniversaries, new_joinees, announcements } = response.data;
        
//         let formattedMessages = [];
//         if (birthdays?.length > 0) birthdays.forEach(b => formattedMessages.push(`🎂 Happy Birthday to ${b.full_name}!`));
//         if (work_anniversaries?.length > 0) work_anniversaries.forEach(w => formattedMessages.push(`🎉 Happy Work Anniversary to ${w.full_name}!`));
//         if (new_joinees?.length > 0) new_joinees.forEach(n => formattedMessages.push(`👋 Welcome to our new joinee, ${n.full_name}!`));
//         if (announcements?.length > 0) announcements.forEach(a => formattedMessages.push(`📢 Announcement: ${a.title}`));
//         setNotifications(formattedMessages);
//       } catch (error) {
//         console.error("Failed to fetch notifications:", error);
//       }
//     };
//     fetchNotifications();
//   }, [employeeId]);

//   // --- API: To-Do CRUD Operations ---
//   const fetchTodos = async () => {
//     try {
//       const response = await axiosInstance.get('/api/todos/');
//       setTodos(response.data || []);
//     } catch (error) { console.error("Failed to fetch todos:", error); }
//   };

//   const handleTodoClick = () => {
//     fetchTodos();
//     setTodoDialogOpen(true);
//   };
  
//   const handleAddOrUpdateTodo = async () => {
//     if (!newTodo.trim()) return;
//     if (editingTodo) { // UPDATE
//       try {
//         await axiosInstance.patch(`/api/todos/${editingTodo.todo_item_id}/`, { description: newTodo });
//         setEditingTodo(null);
//       } catch (error) { console.error("Failed to update todo:", error); }
//     } else { // CREATE
//       try {
//         await axiosInstance.post('/api/todos/', { description: newTodo });
//       } catch (error) { console.error("Failed to add todo:", error); }
//     }
//     setNewTodo("");
//     fetchTodos();
//   };
  
//   const handleEditTodo = (todo) => {
//     setEditingTodo(todo);
//     setNewTodo(todo.description);
//   };
  
//   const handleDeleteTodo = async (todoId) => {
//     try {
//       await axiosInstance.delete(`/api/todos/${todoId}/`);
//       fetchTodos();
//     } catch (error) { console.error("Failed to delete todo:", error); }
//   };

//   const handleTodoClose = () => {
//     setTodoDialogOpen(false);
//     setEditingTodo(null);
//     setNewTodo("");
//   };

//   // --- Other UI Handlers ---
//   const handleProfileClick = (event) => setAnchorEl(event.currentTarget);
//   const handleMenuClose = () => setAnchorEl(null);
//   const handleNotificationsClick = (event) => setNotificationsEl(event.currentTarget);
//   const handleNotificationsClose = () => setNotificationsEl(null);
//   const handleCalendarClick = (event) => setCalendarEl(event.currentTarget);
//   const handleCalendarClose = () => setCalendarEl(null);
  
//   const handleAccountClick = () => {
//     setAccountSidebarOpen(true);
//     handleMenuClose();
//   };

//   const handleLogout = () => {
//     localStorage.clear();
//     setAnchorEl(null);
//     setShowLogoutDialog(true);
//     setTimeout(() => {
//       setShowLogoutDialog(false);
//       window.location.href = "/hrms";
//     }, 3000);
//   };

//   const handleAccountSidebarClose = () => {
//     setAccountSidebarOpen(false);
//     setSelectedOption(null);
//   };

//   const handleOptionClick = (option) => {
//     setSelectedOption(option);
//     setFormDrawerOpen(true);
//   };

//   const handleFormDrawerClose = () => {
//     setFormDrawerOpen(false);
//   };

//   const renderContent = () => {
//     switch (selectedOption) {
//       case "Basic Information": return <BasicInformationForm onBack={handleFormDrawerClose}/>;
//       case "Personal Information": return <PersonalInformation selectedTab={selectedTab} setSelectedTab={setSelectedTab}  onBack={handleFormDrawerClose} />;
//       case "Profile Picture": return <ProfileTopBar  onBack={handleFormDrawerClose} />;
//       // case "Account Information": return <AccountTopBar />; // Removed
//       case "Documents": return <DocumentTopBar  onBack={handleFormDrawerClose} />;
//       case "Change Password": return <ChangePassTopBar  onBack={handleFormDrawerClose} />;
//       case "Details": return <ContractTopBar onBack={handleFormDrawerClose} />;
//       default: return <Typography variant="h6" sx={{ p: 2 }}>Select an option to view details</Typography>;
//     }
//   };

//   return (
//     <>
//       <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, background: "linear-gradient(135deg,rgba(239, 77, 36, 0.90) 0%,rgb(155, 10, 199)100%)", boxShadow: "0 4px 20px rgba(102, 126, 234, 0.3)"  }}>
//         <Toolbar>
//           <IconButton color="inherit" aria-label="toggle drawer" onClick={toggleDrawer} edge="start" sx={{ mr: 2 }}>
//             <MenuIcon />
//           </IconButton>
//           <Box>
//             <Link to="/hrms/dashboard/home">
//               <img src={tdtlLogo} alt="TDTL Logo" style={{ height: "40px", width: "auto" }}/>
//             </Link>
//           </Box>
//           <Box sx={{ flexGrow: 1 }} />
          
//           <IconButton color="inherit" onClick={handleNotificationsClick}>
//             <Badge badgeContent={notifications.length} color="secondary">
//               <NotificationsIcon />
//             </Badge>
//           </IconButton>
//           <Menu anchorEl={notificationsEl} open={Boolean(notificationsEl)} onClose={handleNotificationsClose}>
//             {notifications.length > 0 ? (
//               notifications.map((msg, index) => <MenuItem key={index} onClick={handleNotificationsClose}>{msg}</MenuItem>)
//             ) : (
//               <MenuItem onClick={handleNotificationsClose}>No new notifications</MenuItem>
//             )}
//           </Menu>

//           <IconButton color="inherit" onClick={handleCalendarClick}><CalendarTodayIcon /></IconButton>
//           <Menu anchorEl={calendarEl} open={Boolean(calendarEl)} onClose={handleCalendarClose}>
//             <LocalizationProvider dateAdapter={AdapterDateFns}>
//               <StaticDatePicker displayStaticWrapperAs="desktop" value={new Date()} onChange={() => {}} />
//             </LocalizationProvider>
//           </Menu>
          
//           <IconButton color="inherit" onClick={handleTodoClick}><AssignmentIcon /></IconButton>

//           <Box sx={{ display: "flex", alignItems: "center", ml: 2, cursor: 'pointer' }} onClick={handleProfileClick}>
//             <Avatar alt="Profile Picture" src={profilePicture} />
//             <Box sx={{ ml: 1 }}>
//               <Typography variant="subtitle2" sx={{ lineHeight: 1.3, fontWeight: 'bold' }}>
//                 {userName}
//               </Typography>
//               <Typography variant="body2" sx={{ lineHeight: 1.3, color: 'rgba(255, 255, 255, 0.9)' }}>
//                 {userRole} ({userId})
//               </Typography>
//             </Box>
//           </Box>
//           <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
//             <MenuItem onClick={handleAccountClick}>My Account</MenuItem>
//             <MenuItem onClick={handleLogout}>Logout</MenuItem>
//           </Menu>
//         </Toolbar>
//       </AppBar>
      
//       {/* TO-DO DIALOG */}
//       <Dialog open={todoDialogOpen} onClose={handleTodoClose} maxWidth="xs" fullWidth>
//         <DialogTitle>{editingTodo ? "Update Todo" : "Todo List"}</DialogTitle>
//         <DialogContent>
//           <TextField
//             label={editingTodo ? "Update your task" : "New Todo"}
//             value={newTodo}
//             onChange={(e) => setNewTodo(e.target.value)}
//             fullWidth
//             margin="normal"
//           />
//           <Button variant="contained" color="primary" onClick={handleAddOrUpdateTodo} fullWidth>
//             {editingTodo ? "Update Todo" : "Add Todo"}
//           </Button>
//           <List>
//             {todos.map((todo) => (
//               <ListItem key={todo.todo_item_id}>
//                 <ListItemText primary={todo.description} />
//                 <ListItemSecondaryAction>
//                   <IconButton edge="end" onClick={() => handleEditTodo(todo)}><EditIcon /></IconButton>
//                   <IconButton edge="end" onClick={() => handleDeleteTodo(todo.todo_item_id)}><DeleteIcon /></IconButton>
//                 </ListItemSecondaryAction>
//               </ListItem>
//             ))}
//           </List>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleTodoClose} color="secondary">Close</Button>
//         </DialogActions>
//       </Dialog>
      
//       {/* LOGOUT DIALOG */}
//       <Dialog open={showLogoutDialog} sx={{ "& .MuiDialog-paper": { minWidth: "300px", borderRadius: "16px", textAlign: "center", padding: "16px" }}}>
//         <DialogContent>
//           <CheckCircle sx={{ fontSize: 80, color: "#4caf50", mb: 2 }} />
//           <Typography variant="h5" sx={{ fontWeight: "bold", color: "#333" }}>Logout Successful!</Typography>
//           <Typography sx={{ color: "#666", mt: 1 }}>Redirecting to login...</Typography>
//         </DialogContent>
//       </Dialog>
      
//       {/* DRAWERS */}
//       <Drawer anchor="right" open={accountSidebarOpen} onClose={handleAccountSidebarClose} sx={{ "& .MuiDrawer-paper": { width: 300, padding: 2, top: 64 } }}>
//         <Typography variant="h6">My Account</Typography>
//         <List>
//           {/* List of options with "Account Information" removed */}
//           {["Basic Information", "Personal Information", "Profile Picture", "Documents", "Change Password", "Details"].map((text) => (
//             <ListItem button key={text} onClick={() => handleOptionClick(text)}>
//               <ListItemText primary={text} />
//             </ListItem>
//           ))}
//         </List>
//       </Drawer>
//       <Drawer
//         anchor="right"
//         open={formDrawerOpen}
//         onClose={handleFormDrawerClose}
//         sx={{ "& .MuiDrawer-paper": { width: 600, padding: 2, top: 64, height: "calc(100vh - 64px)", overflowY: "auto" } }}
//       >
//         {renderContent()}
//       </Drawer>
//     </>
//   )
// }
// import { useState, useEffect } from "react"
// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   IconButton,
//   Avatar,
//   Box,
//   Menu,
//   MenuItem,
//   Drawer,
//   List,
//   ListItem,
//   ListItemText,
//   Button,
//   DialogActions,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   TextField,
//   ListItemSecondaryAction,
//   Badge,
// } from "@mui/material"
// import MenuIcon from "@mui/icons-material/Menu"
// import NotificationsIcon from "@mui/icons-material/Notifications"
// import CalendarTodayIcon from "@mui/icons-material/CalendarToday"
// import AssignmentIcon from "@mui/icons-material/Assignment"
// import { LocalizationProvider, StaticDatePicker } from "@mui/x-date-pickers"
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
// import DeleteIcon from "@mui/icons-material/Delete"
// import EditIcon from "@mui/icons-material/Edit"
// import { CheckCircle } from "@mui/icons-material"
// import tdtlLogo from "./vetrinalogo.png"
// import { Link } from "react-router-dom"
// import adminlogo from "./admin-logo.jpeg"

// import axiosInstance from "../utils/axiosInstance";

// // Import sub-components
// import BasicInformationForm from "./basicinfotopbar"
// import PersonalInformation from "./personalinfotopbar"
// import ProfileTopBar from "./profiletopbar"
// import DocumentTopBar from "./documenttopbar"
// import ChangePassTopBar from "./changepasstopbar"
// import ContractTopBar from "./contracttopbar"

// export default function TopBar({ open, toggleDrawer }) {
//   const [anchorEl, setAnchorEl] = useState(null)
//   const [accountSidebarOpen, setAccountSidebarOpen] = useState(false)
//   const [selectedOption, setSelectedOption] = useState(null)
//   const [selectedTab, setSelectedTab] = useState(0)
//   const [profilePicture, setProfilePicture] = useState(adminlogo)
//   const [formDrawerOpen, setFormDrawerOpen] = useState(false)

//   // --- STATES FOR DYNAMIC UI DATA ---
//   const [userName, setUserName] = useState("User");
//   const [userRole, setUserRole] = useState("Employee");
//   const [notifications, setNotifications] = useState([]);
//   const [unreadCount, setUnreadCount] = useState(0); // State for the badge count
//   const [notificationsEl, setNotificationsEl] = useState(null);
//   const [todos, setTodos] = useState([]);
//   const [todoDialogOpen, setTodoDialogOpen] = useState(false);
//   const [newTodo, setNewTodo] = useState("");
//   const [editingTodo, setEditingTodo] = useState(null);
//   const [calendarEl, setCalendarEl] = useState(null);
//   const [showLogoutDialog, setShowLogoutDialog] = useState(false);

//   const employeeId = localStorage.getItem("loggedInEmpId"); 
//   const userId = localStorage.getItem("loggedInUser"); 
//   const empid = localStorage.getItem("EmID");

//   // --- API: Fetch User Name and Role ---
//   useEffect(() => {
//     const fetchUserData = async () => {
//       if (!employeeId) return;
//       try {
//         const response = await axiosInstance.get('/api/dropdown/employee-role/');
//         if (response.data && Array.isArray(response.data)) {
//           const currentUser = response.data.find(emp => emp.id === Number(employeeId));
//           if (currentUser) {
//             setUserName(currentUser.employee_name);
//             setUserRole(currentUser.role_name);
//           }
//         }
//       } catch (error) {
//         console.error("Failed to fetch user role data:", error);
//       }
//     };
//     fetchUserData();
//   }, [employeeId]);


//   // --- API: Fetch Notifications (UPDATED) ---
//   useEffect(() => {
//     const fetchNotifications = async () => {
//       if (!empid) return; // Use the correct ID for the API endpoint
//       try {
//         const response = await axiosInstance.get(`/notifications/global/${empid}/`);
//         const { 
//           birthdays, work_anniversaries, new_joinees, announcements, 
//           events, awards, policy_notification, asset_notification 
//         } = response.data;
        
//         let formattedMessages = [];
//         if (birthdays?.length > 0) birthdays.forEach(b => formattedMessages.push(`🎂 Happy Birthday to ${b.full_name}!`));
//         if (work_anniversaries?.length > 0) work_anniversaries.forEach(w => formattedMessages.push(`🎉 Happy Work Anniversary to ${w.full_name}!`));
//         if (new_joinees?.length > 0) new_joinees.forEach(n => formattedMessages.push(`👋 Welcome to our new joinee, ${n.full_name}!`));
//         if (announcements?.length > 0) announcements.forEach(a => formattedMessages.push(`📢 Announcement: ${a.title}`));
        
//         // --- THE FIX: Handle all new notification types ---
//         if (events?.length > 0) events.forEach(e => formattedMessages.push(`🗓️ Event Today: ${e.event_title}`));
//         if (awards?.length > 0) awards.forEach(a => formattedMessages.push(`🏆 Award: ${a.award_information}`));
//         if (policy_notification) {
//           formattedMessages.push(`📜 Policy Update: ${policy_notification}`);
//         }
//         if (asset_notification) {
//           formattedMessages.push(`💻 Asset Update: ${asset_notification}`);
//         }

//         setNotifications(formattedMessages);
//         setUnreadCount(formattedMessages.length); // Set the initial count for the badge
//       } catch (error) {
//         console.error("Failed to fetch notifications:", error);
//       }
//     };
//     fetchNotifications();
//   }, [empid]); // Depend on the ID used in the API call

//   // --- API: To-Do CRUD Operations ---
//   const fetchTodos = async () => {
//     try {
//       const response = await axiosInstance.get('/api/todos/');
//       setTodos(response.data || []);
//     } catch (error) { console.error("Failed to fetch todos:", error); }
//   };

//   const handleTodoClick = () => {
//     fetchTodos();
//     setTodoDialogOpen(true);
//   };
  
//   const handleAddOrUpdateTodo = async () => {
//     if (!newTodo.trim()) return;
//     if (editingTodo) { // UPDATE
//       try {
//         await axiosInstance.patch(`/api/todos/${editingTodo.todo_item_id}/`, { description: newTodo });
//         setEditingTodo(null);
//       } catch (error) { console.error("Failed to update todo:", error); }
//     } else { // CREATE
//       try {
//         await axiosInstance.post('/api/todos/', { description: newTodo });
//       } catch (error) { console.error("Failed to add todo:", error); }
//     }
//     setNewTodo("");
//     fetchTodos();
//   };
  
//   const handleEditTodo = (todo) => {
//     setEditingTodo(todo);
//     setNewTodo(todo.description);
//   };
  
//   const handleDeleteTodo = async (todoId) => {
//     try {
//       await axiosInstance.delete(`/api/todos/${todoId}/`);
//       fetchTodos();
//     } catch (error) { console.error("Failed to delete todo:", error); }
//   };

//   const handleTodoClose = () => {
//     setTodoDialogOpen(false);
//     setEditingTodo(null);
//     setNewTodo("");
//   };

//   // --- Other UI Handlers ---
//   const handleProfileClick = (event) => setAnchorEl(event.currentTarget);
//   const handleMenuClose = () => setAnchorEl(null);
  
//   const handleNotificationsClick = (event) => {
//     setNotificationsEl(event.currentTarget);
//     setUnreadCount(0); // <-- Reset count when user clicks the bell
//   };

//   const handleNotificationsClose = () => setNotificationsEl(null);
//   const handleCalendarClick = (event) => setCalendarEl(event.currentTarget);
//   const handleCalendarClose = () => setCalendarEl(null);
  
//   const handleAccountClick = () => {
//     setAccountSidebarOpen(true);
//     handleMenuClose();
//   };

//   const handleLogout = () => {
//     localStorage.clear();
//     setAnchorEl(null);
//     setShowLogoutDialog(true);
//     setTimeout(() => {
//       setShowLogoutDialog(false);
//       window.location.href = "/hrms";
//     }, 3000);
//   };

//   const handleAccountSidebarClose = () => {
//     setAccountSidebarOpen(false);
//     setSelectedOption(null);
//   };

//   const handleOptionClick = (option) => {
//     setSelectedOption(option);
//     setFormDrawerOpen(true);
//   };

//   const handleFormDrawerClose = () => {
//     setFormDrawerOpen(false);
//   };

//   const renderContent = () => {
//     switch (selectedOption) {
//       case "Basic Information": return <BasicInformationForm onBack={handleFormDrawerClose}/>;
//       case "Personal Information": return <PersonalInformation selectedTab={selectedTab} setSelectedTab={setSelectedTab}  onBack={handleFormDrawerClose} />;
//       case "Profile Picture": return <ProfileTopBar  onBack={handleFormDrawerClose} />;
//       case "Documents": return <DocumentTopBar  onBack={handleFormDrawerClose} />;
//       case "Change Password": return <ChangePassTopBar  onBack={handleFormDrawerClose} />;
//       case "Details": return <ContractTopBar onBack={handleFormDrawerClose} />;
//       default: return <Typography variant="h6" sx={{ p: 2 }}>Select an option to view details</Typography>;
//     }
//   };

//   return (
//     <>
//       <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, background: "linear-gradient(135deg,rgba(239, 77, 36, 0.90) 0%,rgb(155, 10, 199)100%)", boxShadow: "0 4px 20px rgba(102, 126, 234, 0.3)"  }}>
//         <Toolbar>
//           <IconButton color="inherit" aria-label="toggle drawer" onClick={toggleDrawer} edge="start" sx={{ mr: 2 }}>
//             <MenuIcon />
//           </IconButton>
//           <Box>
//             <Link to="/hrms/dashboard/home">
//               <img src={tdtlLogo} alt="TDTL Logo" style={{ height: "40px", width: "auto" }}/>
//             </Link>
//           </Box>
//           <Box sx={{ flexGrow: 1 }} />
          
//           <IconButton color="inherit" onClick={handleNotificationsClick}>
//             <Badge badgeContent={unreadCount} color="secondary">
//               <NotificationsIcon />
//             </Badge>
//           </IconButton>
//           <Menu anchorEl={notificationsEl} open={Boolean(notificationsEl)} onClose={handleNotificationsClose}>
//             {notifications.length > 0 ? (
//               notifications.map((msg, index) => <MenuItem key={index} onClick={handleNotificationsClose}>{msg}</MenuItem>)
//             ) : (
//               <MenuItem onClick={handleNotificationsClose}>No new notifications</MenuItem>
//             )}
//           </Menu>

//           <IconButton color="inherit" onClick={handleCalendarClick}><CalendarTodayIcon /></IconButton>
//           <Menu anchorEl={calendarEl} open={Boolean(calendarEl)} onClose={handleCalendarClose}>
//             <LocalizationProvider dateAdapter={AdapterDateFns}>
//               <StaticDatePicker displayStaticWrapperAs="desktop" value={new Date()} onChange={() => {}} />
//             </LocalizationProvider>
//           </Menu>
          
//           <IconButton color="inherit" onClick={handleTodoClick}><AssignmentIcon /></IconButton>

//           <Box 
//             onClick={handleProfileClick} 
//             sx={{ 
//               display: "flex", 
//               alignItems: "center", 
//               ml: 2, 
//               cursor: 'pointer',
//               p: 1,
//               borderRadius: 2,
//               '&:hover': {
//                 backgroundColor: 'rgba(255, 255, 255, 0.1)',
//               },
//             }}
//           >
//             <Avatar alt="Profile Picture" src={profilePicture} />
//             <Box sx={{ ml: 1.5 }}>
//               <Typography variant="subtitle2" sx={{ lineHeight: 1.3, fontWeight: 'bold' }}>
//                 {userName}
//               </Typography>
//               <Typography variant="body2" sx={{ lineHeight: 1.3, color: 'rgba(255, 255, 255, 0.9)' }}>
//                 {userRole} ({userId})
//               </Typography>
//             </Box>
//           </Box>
          
//           <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
//             <MenuItem onClick={handleAccountClick}>My Account</MenuItem>
//             <MenuItem onClick={handleLogout}>Logout</MenuItem>
//           </Menu>
//         </Toolbar>
//       </AppBar>
      
//       <Dialog open={todoDialogOpen} onClose={handleTodoClose} maxWidth="xs" fullWidth>
//         <DialogTitle>{editingTodo ? "Update Todo" : "Todo List"}</DialogTitle>
//         <DialogContent>
//           <TextField
//             label={editingTodo ? "Update your task" : "New Todo"}
//             value={newTodo}
//             onChange={(e) => setNewTodo(e.target.value)}
//             fullWidth
//             margin="normal"
//           />
//           <Button variant="contained" color="primary" onClick={handleAddOrUpdateTodo} fullWidth>
//             {editingTodo ? "Update Todo" : "Add Todo"}
//           </Button>
//           <List>
//             {todos.map((todo) => (
//               <ListItem key={todo.todo_item_id}>
//                 <ListItemText primary={todo.description} />
//                 <ListItemSecondaryAction>
//                   <IconButton edge="end" onClick={() => handleEditTodo(todo)}><EditIcon /></IconButton>
//                   <IconButton edge="end" onClick={() => handleDeleteTodo(todo.todo_item_id)}><DeleteIcon /></IconButton>
//                 </ListItemSecondaryAction>
//               </ListItem>
//             ))}
//           </List>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleTodoClose} color="secondary">Close</Button>
//         </DialogActions>
//       </Dialog>
      
//       <Dialog open={showLogoutDialog} sx={{ "& .MuiDialog-paper": { minWidth: "300px", borderRadius: "16px", textAlign: "center", padding: "16px" }}}>
//         <DialogContent>
//           <CheckCircle sx={{ fontSize: 80, color: "#4caf50", mb: 2 }} />
//           <Typography variant="h5" sx={{ fontWeight: "bold", color: "#333" }}>Logout Successful!</Typography>
//           <Typography sx={{ color: "#666", mt: 1 }}>Redirecting to login...</Typography>
//         </DialogContent>
//       </Dialog>
      
//       <Drawer anchor="right" open={accountSidebarOpen} onClose={handleAccountSidebarClose} sx={{ "& .MuiDrawer-paper": { width: 300, padding: 2, top: 64 } }}>
//         <Typography variant="h6">My Account</Typography>
//         <List>
//           {["Basic Information", "Personal Information", "Profile Picture", "Documents", "Change Password", "Details"].map((text) => (
//             <ListItem button key={text} onClick={() => handleOptionClick(text)}>
//               <ListItemText primary={text} />
//             </ListItem>
//           ))}
//         </List>
//       </Drawer>
//       <Drawer
//         anchor="right"
//         open={formDrawerOpen}
//         onClose={handleFormDrawerClose}
//         sx={{ "& .MuiDrawer-paper": { width: 600, padding: 2, top: 64, height: "calc(100vh - 64px)", overflowY: "auto" } }}
//       >
//         {renderContent()}
//       </Drawer>
//     </>
//   )
// }
// import { useState, useEffect } from "react"
// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   IconButton,
//   Avatar,
//   Box,
//   Menu,
//   MenuItem,
//   Drawer,
//   List,
//   ListItem,
//   ListItemText,
//   Button,
//   DialogActions,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   TextField,
//   ListItemSecondaryAction,
//   Badge,
// } from "@mui/material"
// import MenuIcon from "@mui/icons-material/Menu"
// import NotificationsIcon from "@mui/icons-material/Notifications"
// import CalendarTodayIcon from "@mui/icons-material/CalendarToday"
// import AssignmentIcon from "@mui/icons-material/Assignment"
// import { LocalizationProvider, StaticDatePicker } from "@mui/x-date-pickers"
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
// import DeleteIcon from "@mui/icons-material/Delete"
// import EditIcon from "@mui/icons-material/Edit"
// import { CheckCircle } from "@mui/icons-material"
// import tdtlLogo from "./vetrinalogo.png"
// import { Link } from "react-router-dom"
// import adminlogo from "./admin-logo.jpeg"

// import axiosInstance from "../utils/axiosInstance";

// // Import sub-components
// import BasicInformationForm from "./basicinfotopbar"
// import PersonalInformation from "./personalinfotopbar"
// import ProfileTopBar from "./profiletopbar"
// import DocumentTopBar from "./documenttopbar"
// import ChangePassTopBar from "./changepasstopbar"
// import ContractTopBar from "./contracttopbar"

// export default function TopBar({ open, toggleDrawer }) {
//   const [anchorEl, setAnchorEl] = useState(null)
//   const [accountSidebarOpen, setAccountSidebarOpen] = useState(false)
//   const [selectedOption, setSelectedOption] = useState(null)
//   const [selectedTab, setSelectedTab] = useState(0)
//   const [profilePicture, setProfilePicture] = useState(adminlogo)
//   const [formDrawerOpen, setFormDrawerOpen] = useState(false)

//   // --- STATES FOR DYNAMIC UI DATA ---
//   const [userName, setUserName] = useState("User");
//   const [userRole, setUserRole] = useState("Employee");
//   const [notifications, setNotifications] = useState([]);
//   const [unreadCount, setUnreadCount] = useState(0);
//   const [notificationsEl, setNotificationsEl] = useState(null);
//   const [todos, setTodos] = useState([]);
//   const [todoDialogOpen, setTodoDialogOpen] = useState(false);
//   const [newTodo, setNewTodo] = useState("");
//   const [editingTodo, setEditingTodo] = useState(null);
//   const [calendarEl, setCalendarEl] = useState(null);
//   const [showLogoutDialog, setShowLogoutDialog] = useState(false);

//   const employeeId = localStorage.getItem("loggedInEmpId"); 
//   const userId = localStorage.getItem("loggedInUser"); 
//   const empid = localStorage.getItem("EmID");

//   // --- API: Fetch User Name and Role ---
//   useEffect(() => {
//     const fetchUserData = async () => {
//       if (!employeeId) return;
//       try {
//         const response = await axiosInstance.get('/api/dropdown/employee-role/');
//         if (response.data && Array.isArray(response.data)) {
//           const currentUser = response.data.find(emp => emp.id === Number(employeeId));
//           if (currentUser) {
//             setUserName(currentUser.employee_name);
//             setUserRole(currentUser.role_name);
//           }
//         }
//       } catch (error) {
//         console.error("Failed to fetch user role data:", error);
//       }
//     };
//     fetchUserData();
//   }, [employeeId]);


//   // --- API: Fetch Notifications (with persistent count) ---
//   useEffect(() => {
//     const fetchNotifications = async () => {
//       if (!empid) return;
//       try {
//         const response = await axiosInstance.get(`/notifications/global/${empid}/`);
//         const { 
//           birthdays, work_anniversaries, new_joinees, announcements, 
//           events, awards, policy_notification, asset_notification 
//         } = response.data;
        
//         let formattedMessages = [];
//         if (birthdays?.length > 0) birthdays.forEach(b => formattedMessages.push(`🎂 Happy Birthday to ${b.full_name}!`));
//         if (work_anniversaries?.length > 0) work_anniversaries.forEach(w => formattedMessages.push(`🎉 Happy Work Anniversary to ${w.full_name}!`));
//         if (new_joinees?.length > 0) new_joinees.forEach(n => formattedMessages.push(`👋 Welcome to our new joinee, ${n.full_name}!`));
//         if (announcements?.length > 0) announcements.forEach(a => formattedMessages.push(`📢 Announcement: ${a.title}`));
//         if (events?.length > 0) events.forEach(e => formattedMessages.push(`🗓️ Event Today: ${e.event_title}`));
//         if (awards?.length > 0) awards.forEach(a => formattedMessages.push(`🏆 Award: ${a.award_information}`));
//         if (policy_notification) formattedMessages.push(`📜 Policy Update: ${policy_notification}`);
//         if (asset_notification) formattedMessages.push(`💻 Asset Update: ${asset_notification}`);

//         setNotifications(formattedMessages);
        
//         // --- START: NEW PERSISTENT COUNT LOGIC ---
//         // 1. Get the last count the user saw from localStorage. Default to 0 if none exists.
//         const lastViewedCount = parseInt(localStorage.getItem('viewedNotificationCount') || '0', 10);
        
//         // 2. The number of *new* unread items is the difference.
//         const newUnreadCount = formattedMessages.length - lastViewedCount;
        
//         // 3. Set the badge count, ensuring it's not negative.
//         setUnreadCount(newUnreadCount > 0 ? newUnreadCount : 0);
//         // --- END: NEW PERSISTENT COUNT LOGIC ---

//       } catch (error) {
//         console.error("Failed to fetch notifications:", error);
//       }
//     };
//     fetchNotifications();
//   }, [empid]);

//   // --- API: To-Do CRUD Operations ---
//   const fetchTodos = async () => {
//     try {
//       const response = await axiosInstance.get('/api/todos/');
//       setTodos(response.data || []);
//     } catch (error) { console.error("Failed to fetch todos:", error); }
//   };

//   const handleTodoClick = () => {
//     fetchTodos();
//     setTodoDialogOpen(true);
//   };
  
//   const handleAddOrUpdateTodo = async () => {
//     if (!newTodo.trim()) return;
//     if (editingTodo) {
//       try {
//         await axiosInstance.patch(`/api/todos/${editingTodo.todo_item_id}/`, { description: newTodo });
//         setEditingTodo(null);
//       } catch (error) { console.error("Failed to update todo:", error); }
//     } else {
//       try {
//         await axiosInstance.post('/api/todos/', { description: newTodo });
//       } catch (error) { console.error("Failed to add todo:", error); }
//     }
//     setNewTodo("");
//     fetchTodos();
//   };
  
//   const handleEditTodo = (todo) => {
//     setEditingTodo(todo);
//     setNewTodo(todo.description);
//   };
  
//   const handleDeleteTodo = async (todoId) => {
//     try {
//       await axiosInstance.delete(`/api/todos/${todoId}/`);
//       fetchTodos();
//     } catch (error) { console.error("Failed to delete todo:", error); }
//   };

//   const handleTodoClose = () => {
//     setTodoDialogOpen(false);
//     setEditingTodo(null);
//     setNewTodo("");
//   };

//   // --- Other UI Handlers ---
//   const handleProfileClick = (event) => setAnchorEl(event.currentTarget);
//   const handleMenuClose = () => setAnchorEl(null);
  
//   // --- UPDATED: This function now marks notifications as "viewed" persistently ---
//   const handleNotificationsClick = (event) => {
//     setNotificationsEl(event.currentTarget);
    
//     // --- START: NEW LOGIC TO MARK AS VIEWED ---
//     // 1. Save the current total number of notifications to localStorage.
//     // This is the new "high-water mark" of what the user has seen.
//     localStorage.setItem('viewedNotificationCount', notifications.length);

//     // 2. Reset the visible badge count to 0 in the UI.
//     setUnreadCount(0);
//     // --- END: NEW LOGIC ---
//   };
  
//   const handleNotificationsClose = () => setNotificationsEl(null);
//   const handleCalendarClick = (event) => setCalendarEl(event.currentTarget);
//   const handleCalendarClose = () => setCalendarEl(null);
  
//   const handleAccountClick = () => {
//     setAccountSidebarOpen(true);
//     handleMenuClose();
//   };

//   const handleLogout = () => {
//     localStorage.clear();
//     setAnchorEl(null);
//     setShowLogoutDialog(true);
//     setTimeout(() => {
//       setShowLogoutDialog(false);
//       window.location.href = "/hrms";
//     }, 3000);
//   };

//   const handleAccountSidebarClose = () => {
//     setAccountSidebarOpen(false);
//     setSelectedOption(null);
//   };

//   const handleOptionClick = (option) => {
//     setSelectedOption(option);
//     setFormDrawerOpen(true);
//   };

//   const handleFormDrawerClose = () => {
//     setFormDrawerOpen(false);
//   };

//   const renderContent = () => {
//     switch (selectedOption) {
//       case "Basic Information": return <BasicInformationForm onBack={handleFormDrawerClose}/>;
//       case "Personal Information": return <PersonalInformation selectedTab={selectedTab} setSelectedTab={setSelectedTab}  onBack={handleFormDrawerClose} />;
//       case "Profile Picture": return <ProfileTopBar  onBack={handleFormDrawerClose} />;
//       case "Documents": return <DocumentTopBar  onBack={handleFormDrawerClose} />;
//       case "Change Password": return <ChangePassTopBar  onBack={handleFormDrawerClose} />;
//       case "Details": return <ContractTopBar onBack={handleFormDrawerClose} />;
//       default: return <Typography variant="h6" sx={{ p: 2 }}>Select an option to view details</Typography>;
//     }
//   };

//   return (
//     <>
//       <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, background: "linear-gradient(135deg,rgba(239, 77, 36, 0.90) 0%,rgb(155, 10, 199)100%)", boxShadow: "0 4px 20px rgba(102, 126, 234, 0.3)"  }}>
//         <Toolbar>
//           <IconButton color="inherit" aria-label="toggle drawer" onClick={toggleDrawer} edge="start" sx={{ mr: 2 }}>
//             <MenuIcon />
//           </IconButton>
//           <Box>
//             <Link to="/hrms/dashboard/home">
//               <img src={tdtlLogo} alt="TDTL Logo" style={{ height: "40px", width: "auto" }}/>
//             </Link>
//           </Box>
//           <Box sx={{ flexGrow: 1 }} />
          
//           <IconButton color="inherit" onClick={handleNotificationsClick}>
//             <Badge badgeContent={unreadCount} color="secondary">
//               <NotificationsIcon />
//             </Badge>
//           </IconButton>
//           <Menu anchorEl={notificationsEl} open={Boolean(notificationsEl)} onClose={handleNotificationsClose}>
//             {notifications.length > 0 ? (
//               notifications.map((msg, index) => <MenuItem key={index} onClick={handleNotificationsClose}>{msg}</MenuItem>)
//             ) : (
//               <MenuItem onClick={handleNotificationsClose}>No new notifications</MenuItem>
//             )}
//           </Menu>

//           <IconButton color="inherit" onClick={handleCalendarClick}><CalendarTodayIcon /></IconButton>
//           <Menu anchorEl={calendarEl} open={Boolean(calendarEl)} onClose={handleCalendarClose}>
//             <LocalizationProvider dateAdapter={AdapterDateFns}>
//               <StaticDatePicker displayStaticWrapperAs="desktop" value={new Date()} onChange={() => {}} />
//             </LocalizationProvider>
//           </Menu>
          
//           <IconButton color="inherit" onClick={handleTodoClick}><AssignmentIcon /></IconButton>

//           <Box 
//             onClick={handleProfileClick} 
//             sx={{ 
//               display: "flex", 
//               alignItems: "center", 
//               ml: 2, 
//               cursor: 'pointer',
//               p: 1,
//               borderRadius: 2,
//               '&:hover': {
//                 backgroundColor: 'rgba(255, 255, 255, 0.1)',
//               },
//             }}
//           >
//             <Avatar alt="Profile Picture" src={profilePicture} />
//             <Box sx={{ ml: 1.5 }}>
//               <Typography variant="subtitle2" sx={{ lineHeight: 1.3, fontWeight: 'bold' }}>
//                 {userName}
//               </Typography>
//               <Typography variant="body2" sx={{ lineHeight: 1.3, color: 'rgba(255, 255, 255, 0.9)' }}>
//                 {userRole} ({userId})
//               </Typography>
//             </Box>
//           </Box>
          
//           <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
//             <MenuItem onClick={handleAccountClick}>My Account</MenuItem>
//             <MenuItem onClick={handleLogout}>Logout</MenuItem>
//           </Menu>
//         </Toolbar>
//       </AppBar>
      
//       <Dialog open={todoDialogOpen} onClose={handleTodoClose} maxWidth="xs" fullWidth>
//         <DialogTitle>{editingTodo ? "Update Todo" : "Todo List"}</DialogTitle>
//         <DialogContent>
//           <TextField
//             label={editingTodo ? "Update your task" : "New Todo"}
//             value={newTodo}
//             onChange={(e) => setNewTodo(e.target.value)}
//             fullWidth
//             margin="normal"
//           />
//           <Button variant="contained" color="primary" onClick={handleAddOrUpdateTodo} fullWidth>
//             {editingTodo ? "Update Todo" : "Add Todo"}
//           </Button>
//           <List>
//             {todos.map((todo) => (
//               <ListItem key={todo.todo_item_id}>
//                 <ListItemText primary={todo.description} />
//                 <ListItemSecondaryAction>
//                   <IconButton edge="end" onClick={() => handleEditTodo(todo)}><EditIcon /></IconButton>
//                   <IconButton edge="end" onClick={() => handleDeleteTodo(todo.todo_item_id)}><DeleteIcon /></IconButton>
//                 </ListItemSecondaryAction>
//               </ListItem>
//             ))}
//           </List>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleTodoClose} color="secondary">Close</Button>
//         </DialogActions>
//       </Dialog>
      
//       <Dialog open={showLogoutDialog} sx={{ "& .MuiDialog-paper": { minWidth: "300px", borderRadius: "16px", textAlign: "center", padding: "16px" }}}>
//         <DialogContent>
//           <CheckCircle sx={{ fontSize: 80, color: "#4caf50", mb: 2 }} />
//           <Typography variant="h5" sx={{ fontWeight: "bold", color: "#333" }}>Logout Successful!</Typography>
//           <Typography sx={{ color: "#666", mt: 1 }}>Redirecting to login...</Typography>
//         </DialogContent>
//       </Dialog>
      
//       <Drawer anchor="right" open={accountSidebarOpen} onClose={handleAccountSidebarClose} sx={{ "& .MuiDrawer-paper": { width: 300, padding: 2, top: 64 } }}>
//         <Typography variant="h6">My Account</Typography>
//         <List>
//           {["Basic Information", "Personal Information", "Profile Picture", "Documents", "Change Password", "Details"].map((text) => (
//             <ListItem button key={text} onClick={() => handleOptionClick(text)}>
//               <ListItemText primary={text} />
//             </ListItem>
//           ))}
//         </List>
//       </Drawer>
//       <Drawer
//         anchor="right"
//         open={formDrawerOpen}
//         onClose={handleFormDrawerClose}
//         sx={{ "& .MuiDrawer-paper": { width: 600, padding: 2, top: 64, height: "calc(100vh - 64px)", overflowY: "auto" } }}
//       >
//         {renderContent()}
//       </Drawer>
//     </>
//   )
// }
// 




// import { useState, useEffect } from "react"
// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   IconButton,
//   Avatar,
//   Box,
//   Menu,
//   MenuItem,
//   Drawer,
//   List,
//   ListItem,
//   ListItemText,
//   Button,
//   DialogActions,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   TextField,
//   ListItemSecondaryAction,
//   Badge,
//   Divider, // 1. Import Divider
// } from "@mui/material"
// import MenuIcon from "@mui/icons-material/Menu"
// import NotificationsIcon from "@mui/icons-material/Notifications"
// import CalendarTodayIcon from "@mui/icons-material/CalendarToday"
// import AssignmentIcon from "@mui/icons-material/Assignment"
// import { LocalizationProvider, StaticDatePicker } from "@mui/x-date-pickers"
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
// import DeleteIcon from "@mui/icons-material/Delete"
// import EditIcon from "@mui/icons-material/Edit"
// import { CheckCircle } from "@mui/icons-material"
// import tdtlLogo from "./vetrinalogo.png"
// import { Link } from "react-router-dom"
// import adminlogo from "./admin-logo.jpeg"
// import CloseIcon from '@mui/icons-material/Close'; // 2. Import CloseIcon

// import axiosInstance from "../utils/axiosInstance";

// // Import sub-components
// import BasicInformationForm from "./basicinfotopbar"
// import PersonalInformation from "./personalinfotopbar"
// import ProfileTopBar from "./profiletopbar"
// import DocumentTopBar from "./documenttopbar"
// import ChangePassTopBar from "./changepasstopbar"
// import ContractTopBar from "./contracttopbar"

// export default function TopBar({ open, toggleDrawer }) {
//   const [anchorEl, setAnchorEl] = useState(null)
//   const [accountSidebarOpen, setAccountSidebarOpen] = useState(false)
//   const [selectedOption, setSelectedOption] = useState(null)
//   const [selectedTab, setSelectedTab] = useState(0)
//   const [profilePicture, setProfilePicture] = useState(adminlogo)
//   const [formDrawerOpen, setFormDrawerOpen] = useState(false)

//   // --- STATES FOR DYNAMIC UI DATA ---
//   const [userName, setUserName] = useState("User");
//   const [userRole, setUserRole] = useState("Employee");
//   const [notifications, setNotifications] = useState([]);
//   const [unreadCount, setUnreadCount] = useState(0);
//   const [notificationsEl, setNotificationsEl] = useState(null);
//   const [todos, setTodos] = useState([]);
//   const [todoDialogOpen, setTodoDialogOpen] = useState(false);
//   const [newTodo, setNewTodo] = useState("");
//   const [editingTodo, setEditingTodo] = useState(null);
//   const [calendarEl, setCalendarEl] = useState(null);
//   const [showLogoutDialog, setShowLogoutDialog] = useState(false);

//   const employeeId = localStorage.getItem("loggedInEmpId"); 
//   const userId = localStorage.getItem("loggedInUser"); 
//   const empid = localStorage.getItem("EmID");

//   // --- API: Fetch User Name and Role ---
//   useEffect(() => {
//     const fetchUserData = async () => {
//       if (!employeeId) return;
//       try {
//         const response = await axiosInstance.get('/api/dropdown/employee-role/');
//         if (response.data && Array.isArray(response.data)) {
//           const currentUser = response.data.find(emp => emp.id === Number(employeeId));
//           if (currentUser) {
//             setUserName(currentUser.employee_name);
//             setUserRole(currentUser.role_name);
//           }
//         }
//       } catch (error) {
//         console.error("Failed to fetch user role data:", error);
//       }
//     };
//     fetchUserData();
//   }, [employeeId]);


//   // --- API: Fetch Notifications (with persistent count logic) ---
//   useEffect(() => {
//     const fetchNotifications = async () => {
//       if (!empid) return;
//       try {
//         const response = await axiosInstance.get(`/notifications/global/${empid}/`);
//         const { 
//           birthdays, work_anniversaries, new_joinees, announcements, 
//           events, awards, policy_notification, asset_notification 
//         } = response.data;
        
//         let formattedMessages = [];
//         if (birthdays?.length > 0) birthdays.forEach(b => formattedMessages.push(`🎂 Happy Birthday to ${b.full_name}!`));
//         if (work_anniversaries?.length > 0) work_anniversaries.forEach(w => formattedMessages.push(`🎉 Happy Work Anniversary to ${w.full_name}!`));
//         if (new_joinees?.length > 0) new_joinees.forEach(n => formattedMessages.push(`👋 Welcome to our new joinee, ${n.full_name}!`));
//         if (announcements?.length > 0) announcements.forEach(a => formattedMessages.push(`📢 Announcement: ${a.title}`));
//         if (events?.length > 0) events.forEach(e => formattedMessages.push(`🗓️ Event Today: ${e.event_title}`));
//         if (awards?.length > 0) awards.forEach(a => formattedMessages.push(`🏆 Award: ${a.award_information}`));
//         if (policy_notification) formattedMessages.push(`📜 Policy Update: ${policy_notification}`);
//         if (asset_notification) formattedMessages.push(`💻 Asset Update: ${asset_notification}`);

//         setNotifications(formattedMessages);
        
//         const lastViewedCount = parseInt(localStorage.getItem('viewedNotificationCount') || '0', 10);
//         const newUnreadCount = formattedMessages.length - lastViewedCount;
//         setUnreadCount(newUnreadCount > 0 ? newUnreadCount : 0);

//       } catch (error) {
//         console.error("Failed to fetch notifications:", error);
//       }
//     };
//     fetchNotifications();
//   }, [empid]);

//   // --- API: To-Do CRUD Operations ---
//   const fetchTodos = async () => {
//     try {
//       const response = await axiosInstance.get('/api/todos/');
//       setTodos(response.data || []);
//     } catch (error) { console.error("Failed to fetch todos:", error); }
//   };

//   const handleTodoClick = () => {
//     fetchTodos();
//     setTodoDialogOpen(true);
//   };
  
//   const handleAddOrUpdateTodo = async () => {
//     if (!newTodo.trim()) return;
//     if (editingTodo) {
//       try {
//         await axiosInstance.patch(`/api/todos/${editingTodo.todo_item_id}/`, { description: newTodo });
//         setEditingTodo(null);
//       } catch (error) { console.error("Failed to update todo:", error); }
//     } else {
//       try {
//         await axiosInstance.post('/api/todos/', { description: newTodo });
//       } catch (error) { console.error("Failed to add todo:", error); }
//     }
//     setNewTodo("");
//     fetchTodos();
//   };
  
//   const handleEditTodo = (todo) => {
//     setEditingTodo(todo);
//     setNewTodo(todo.description);
//   };
  
//   const handleDeleteTodo = async (todoId) => {
//     try {
//       await axiosInstance.delete(`/api/todos/${todoId}/`);
//       fetchTodos();
//     } catch (error) { console.error("Failed to delete todo:", error); }
//   };

//   const handleTodoClose = () => {
//     setTodoDialogOpen(false);
//     setEditingTodo(null);
//     setNewTodo("");
//   };

//   // --- Other UI Handlers ---
//   const handleProfileClick = (event) => setAnchorEl(event.currentTarget);
//   const handleMenuClose = () => setAnchorEl(null);
  
//   const handleNotificationsClick = (event) => {
//     setNotificationsEl(event.currentTarget);
//     localStorage.setItem('viewedNotificationCount', notifications.length);
//     setUnreadCount(0);
//   };
  
//   const handleNotificationsClose = () => setNotificationsEl(null);
//   const handleCalendarClick = (event) => setCalendarEl(event.currentTarget);
//   const handleCalendarClose = () => setCalendarEl(null);
  
//   const handleAccountClick = () => {
//     setAccountSidebarOpen(true);
//     handleMenuClose();
//   };

//   const handleLogout = () => {
//     localStorage.clear();
//     setAnchorEl(null);
//     setShowLogoutDialog(true);
//     setTimeout(() => {
//       setShowLogoutDialog(false);
//       window.location.href = "/hrms";
//     }, 3000);
//   };

//   const handleAccountSidebarClose = () => {
//     setAccountSidebarOpen(false);
//     setSelectedOption(null);
//   };

//   const handleOptionClick = (option) => {
//     setSelectedOption(option);
//     setFormDrawerOpen(true);
//   };

//   const handleFormDrawerClose = () => {
//     setFormDrawerOpen(false);
//   };

//   const renderContent = () => {
//     switch (selectedOption) {
//       case "Basic Information": return <BasicInformationForm onBack={handleFormDrawerClose}/>;
//       case "Personal Information": return <PersonalInformation selectedTab={selectedTab} setSelectedTab={setSelectedTab}  onBack={handleFormDrawerClose} />;
//       case "Profile Picture": return <ProfileTopBar  onBack={handleFormDrawerClose} />;
//       case "Documents": return <DocumentTopBar  onBack={handleFormDrawerClose} />;
//       case "Change Password": return <ChangePassTopBar  onBack={handleFormDrawerClose} />;
//       case "Details": return <ContractTopBar onBack={handleFormDrawerClose} />;
//       default: return <Typography variant="h6" sx={{ p: 2 }}>Select an option to view details</Typography>;
//     }
//   };

//   return (
//     <>
//       <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, background: "linear-gradient(135deg,rgba(239, 77, 36, 0.90) 0%,rgb(155, 10, 199)100%)", boxShadow: "0 4px 20px rgba(102, 126, 234, 0.3)"  }}>
//         <Toolbar>
//           <IconButton color="inherit" aria-label="toggle drawer" onClick={toggleDrawer} edge="start" sx={{ mr: 2 }}>
//             <MenuIcon />
//           </IconButton>
//           <Box>
//             <Link to="/hrms/dashboard/home">
//               <img src={tdtlLogo} alt="TDTL Logo" style={{ height: "40px", width: "auto" }}/>
//             </Link>
//           </Box>
//           <Box sx={{ flexGrow: 1 }} />
          
//           <IconButton color="inherit" onClick={handleNotificationsClick}>
//             <Badge badgeContent={unreadCount} color="secondary">
//               <NotificationsIcon />
//             </Badge>
//           </IconButton>
//           <Menu anchorEl={notificationsEl} open={Boolean(notificationsEl)} onClose={handleNotificationsClose}>
//             {notifications.length > 0 ? (
//               notifications.map((msg, index) => <MenuItem key={index} onClick={handleNotificationsClose}>{msg}</MenuItem>)
//             ) : (
//               <MenuItem onClick={handleNotificationsClose}>No new notifications</MenuItem>
//             )}
//           </Menu>

//           <IconButton color="inherit" onClick={handleCalendarClick}><CalendarTodayIcon /></IconButton>
//           <Menu anchorEl={calendarEl} open={Boolean(calendarEl)} onClose={handleCalendarClose}>
//             <LocalizationProvider dateAdapter={AdapterDateFns}>
//               <StaticDatePicker displayStaticWrapperAs="desktop" value={new Date()} onChange={() => {}} />
//             </LocalizationProvider>
//           </Menu>
          
//           <IconButton color="inherit" onClick={handleTodoClick}><AssignmentIcon /></IconButton>

//           <Box 
//             onClick={handleProfileClick} 
//             sx={{ 
//               display: "flex", alignItems: "center", ml: 2, cursor: 'pointer',
//               p: 1, borderRadius: 2, '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' }
//             }}>
//             <Avatar alt="Profile Picture" src={profilePicture} />
//             <Box sx={{ ml: 1.5 }}>
//               <Typography variant="subtitle2" sx={{ lineHeight: 1.3, fontWeight: 'bold' }}>
//                 {userName}
//               </Typography>
//               <Typography variant="body2" sx={{ lineHeight: 1.3, color: 'rgba(255, 255, 255, 0.9)' }}>
//                 {userRole} ({userId})
//               </Typography>
//             </Box>
//           </Box>
          
//           <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
//             <MenuItem onClick={handleAccountClick}>My Account</MenuItem>
//             <MenuItem onClick={handleLogout}>Logout</MenuItem>
//           </Menu>
//         </Toolbar>
//       </AppBar>
      
//       <Dialog open={todoDialogOpen} onClose={handleTodoClose} maxWidth="xs" fullWidth>
//         <DialogTitle>{editingTodo ? "Update Todo" : "Todo List"}</DialogTitle>
//         <DialogContent>
//           <TextField
//             label={editingTodo ? "Update your task" : "New Todo"}
//             value={newTodo}
//             onChange={(e) => setNewTodo(e.target.value)}
//             fullWidth margin="normal"
//           />
//           <Button variant="contained" color="primary" onClick={handleAddOrUpdateTodo} fullWidth>
//             {editingTodo ? "Update Todo" : "Add Todo"}
//           </Button>
//           <List>
//             {todos.map((todo) => (
//               <ListItem key={todo.todo_item_id}>
//                 <ListItemText primary={todo.description} />
//                 <ListItemSecondaryAction>
//                   <IconButton edge="end" onClick={() => handleEditTodo(todo)}><EditIcon /></IconButton>
//                   <IconButton edge="end" onClick={() => handleDeleteTodo(todo.todo_item_id)}><DeleteIcon /></IconButton>
//                 </ListItemSecondaryAction>
//               </ListItem>
//             ))}
//           </List>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleTodoClose} color="secondary">Close</Button>
//         </DialogActions>
//       </Dialog>
      
//       <Dialog open={showLogoutDialog} sx={{ "& .MuiDialog-paper": { minWidth: "300px", borderRadius: "16px", textAlign: "center", padding: "16px" }}}>
//         <DialogContent>
//           <CheckCircle sx={{ fontSize: 80, color: "#4caf50", mb: 2 }} />
//           <Typography variant="h5" sx={{ fontWeight: "bold", color: "#333" }}>Logout Successful!</Typography>
//           <Typography sx={{ color: "#666", mt: 1 }}>Redirecting to login...</Typography>
//         </DialogContent>
//       </Dialog>
      
//       {/* 3. UPDATED "MY ACCOUNT" DRAWER */}
//       <Drawer
//         anchor="right"
//         open={accountSidebarOpen}
//         onClose={handleAccountSidebarClose}
//         sx={{ "& .MuiDrawer-paper": { width: 300, top: 64 } }}
//       >
//         <Box>
//           {/* New Header with Centered Title and Close Button */}
//           <Box
//             sx={{
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'space-between',
//               p: '12px 8px 12px 16px', // Adjust padding
//               borderBottom: '1px solid',
//               borderColor: 'divider'
//             }}
//           >
//             {/* This is a spacer to help center the title */}
//             <IconButton sx={{ visibility: 'hidden' }}><CloseIcon /></IconButton>
//             <Typography variant="h6" sx={{ flexGrow: 1, textAlign: 'center' }}>
//               My Account
//             </Typography>
//             <IconButton onClick={handleAccountSidebarClose}>
//               <CloseIcon />
//             </IconButton>
//           </Box>

//           {/* Existing Content */}
//           <List sx={{ p: 2 }}> {/* Apply padding here */}
//             {["Basic Information", "Personal Information", "Profile Picture", "Documents", "Change Password", "Details"].map((text) => (
//               <ListItem button key={text} onClick={() => handleOptionClick(text)}>
//                 <ListItemText primary={text} />
//               </ListItem>
//             ))}
//           </List>
//         </Box>
//       </Drawer>

//       <Drawer
//         anchor="right"
//         open={formDrawerOpen}
//         onClose={handleFormDrawerClose}
//         sx={{ "& .MuiDrawer-paper": { width: 600, padding: 2, top: 64, height: "calc(100vh - 64px)", overflowY: "auto" } }}
//       >
//         {renderContent()}
//       </Drawer>
//     </>
//   )
// }






// import { useState, useEffect, useCallback } from "react"
// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   IconButton,
//   Avatar,
//   Box,
//   Menu,
//   MenuItem,
//   Drawer,
//   List,
//   ListItem,
//   ListItemText,
//   Button,
//   DialogActions,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   TextField,
//   ListItemSecondaryAction,
//   Badge,
//   Divider,
// } from "@mui/material"
// import MenuIcon from "@mui/icons-material/Menu"
// import NotificationsIcon from "@mui/icons-material/Notifications"
// import CalendarTodayIcon from "@mui/icons-material/CalendarToday"
// import AssignmentIcon from "@mui/icons-material/Assignment"
// import { LocalizationProvider, StaticDatePicker } from "@mui/x-date-pickers"
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
// import DeleteIcon from "@mui/icons-material/Delete"
// import EditIcon from "@mui/icons-material/Edit"
// import { CheckCircle } from "@mui/icons-material"
// import tdtlLogo from "./vetrinalogo.png"
// import { Link } from "react-router-dom"
// import adminlogo from "./admin-logo.jpeg"
// import CloseIcon from "@mui/icons-material/Close";

// import axiosInstance from "../utils/axiosInstance";

// // Import sub-components
// import BasicInformationForm from "./basicinfotopbar"
// import PersonalInformation from "./personalinfotopbar"
// import ProfileTopBar from "./profiletopbar"
// import DocumentTopBar from "./documenttopbar"
// import ChangePassTopBar from "./changepasstopbar"
// import ContractTopBar from "./contracttopbar"

// export default function TopBar({ open, toggleDrawer }) {
//   const [anchorEl, setAnchorEl] = useState(null)
//   const [accountSidebarOpen, setAccountSidebarOpen] = useState(false)
//   const [selectedOption, setSelectedOption] = useState(null)
//   const [selectedTab, setSelectedTab] = useState(0)
//   const [profilePicture, setProfilePicture] = useState(adminlogo)
//   const [formDrawerOpen, setFormDrawerOpen] = useState(false)

//   // --- STATES FOR DYNAMIC UI DATA ---
//   const [userName, setUserName] = useState("User");
//   const [userRole, setUserRole] = useState("Employee");
//   const [notifications, setNotifications] = useState([]);
//   const [unreadCount, setUnreadCount] = useState(0);
//   const [notificationsEl, setNotificationsEl] = useState(null);
//   const [todos, setTodos] = useState([]);
//   const [todoDialogOpen, setTodoDialogOpen] = useState(false);
//   const [newTodo, setNewTodo] = useState("");
//   const [editingTodo, setEditingTodo] = useState(null);
//   const [calendarEl, setCalendarEl] = useState(null);
//   const [showLogoutDialog, setShowLogoutDialog] = useState(false);

//   const employeeId = localStorage.getItem("loggedInEmpId");
//   const userId = localStorage.getItem("loggedInUser");
//   const empid = localStorage.getItem("EmID");

//   // --- API: Fetch User Name and Role ---
//   useEffect(() => {
//     const fetchUserData = async () => {
//       if (!employeeId) return;
//       try {
//         const response = await axiosInstance.get('/api/dropdown/employee-role/');
//         if (response.data && Array.isArray(response.data)) {
//           const currentUser = response.data.find(emp => emp.id === Number(employeeId));
//           if (currentUser) {
//             setUserName(currentUser.employee_name);
//             setUserRole(currentUser.role_name);
//           }
//         }
//       } catch (error) {
//         console.error("Failed to fetch user role data:", error);
//       }
//     };
//     fetchUserData();
//   }, [employeeId]);

//   // --- API: Fetch Profile Photo ---
//   useEffect(() => {
//     const fetchProfilePhoto = async () => {
//       if (!empid) return;
//       try {
//         const response = await axiosInstance.get(`/api/get_profile_photo/${empid}/`);
//         if (response.data && response.data.status === 'success' && response.data.data) {
//           const secureUrl = response.data.data.replace(/^http:\/\//i, 'https://');
//           setProfilePicture(secureUrl);
//         }
//       } catch (error) {
//         console.error("Failed to fetch profile photo:", error);
//       }
//     };
//     fetchProfilePhoto();
//   }, [empid]);


//   const fetchAllNotifications = useCallback(async () => {
//     if (!userId || !empid) return;

//     const fetchGlobalNotifications = axiosInstance.get(`/notifications/global/${empid}/`).then(response => {
//       const {
//         birthdays, work_anniversaries, new_joinees, announcements,
//         events, awards, policy_notification, asset_notification
//       } = response.data;
//       let formattedMessages = [];
//       if (birthdays?.length > 0) birthdays.forEach(b => formattedMessages.push({ text: `🎂 Happy Birthday to ${b.full_name}!` }));
//       if (work_anniversaries?.length > 0) work_anniversaries.forEach(w => formattedMessages.push({ text: `🎉 Happy Work Anniversary to ${w.full_name}!` }));
//       if (new_joinees?.length > 0) new_joinees.forEach(n => formattedMessages.push({ text: `👋 Welcome to our new joinee, ${n.full_name}!` }));
//       if (announcements?.length > 0) announcements.forEach(a => formattedMessages.push({ text: `📢 Announcement: ${a.title}` }));
//       if (events?.length > 0) events.forEach(e => formattedMessages.push({ text: `🗓️ Event Today: ${e.event_title}` }));
//       if (awards?.length > 0) awards.forEach(a => formattedMessages.push({ text: `🏆 Award: ${a.award_information}` }));
//       if (asset_notification) formattedMessages.push({ text: `💻 Asset Update: ${asset_notification}` });
//       return formattedMessages.map((msg, index) => ({ ...msg, id: `global-${index}`, isGlobal: true }));
//     }).catch(error => {
//       console.error("Failed to fetch global notifications:", error);
//       return [];
//     });

//     const fetchUserNotifications = axiosInstance.get('/api/view_notification/', { params: { user_id: employeeId } }).then(response => {
//       if (response.data?.status === 'success' && Array.isArray(response.data.data)) {
//         const userData = response.data.data;
//         const newUnreadCount = userData.filter(n => n.is_view === 'N').length;
//         setUnreadCount(newUnreadCount);
//         return userData.map(n => ({
//           ...n,
//           text: `🧾Policy Update: ${n.notification_text}`,
//           id: n.notification_id,
//           isGlobal: false
//         }));
//       }
//       return [];
//     }).catch(error => {
//       console.error("Failed to fetch user notifications:", error);
//       return [];
//     });

//     const [globalNotifs, userNotifs] = await Promise.all([
//       fetchGlobalNotifications,
//       fetchUserNotifications
//     ]);
    
//     setNotifications([...userNotifs, ...globalNotifs]);
//   }, [userId, empid, employeeId]);

//   useEffect(() => {
//     fetchAllNotifications();
//   }, [fetchAllNotifications]);

//   // --- API: To-Do CRUD Operations ---
//   const fetchTodos = async () => {
//     try {
//       const response = await axiosInstance.get('/api/todos/');
//       setTodos(response.data || []);
//     } catch (error) { console.error("Failed to fetch todos:", error); }
//   };

//   const handleTodoClick = () => {
//     fetchTodos();
//     setTodoDialogOpen(true);
//   };

//   const handleAddOrUpdateTodo = async () => {
//     if (!newTodo.trim()) return;
//     if (editingTodo) {
//       try {
//         await axiosInstance.patch(`/api/todos/${editingTodo.todo_item_id}/`, { description: newTodo });
//         setEditingTodo(null);
//       } catch (error) { console.error("Failed to update todo:", error); }
//     } else {
//       try {
//         await axiosInstance.post('/api/todos/', { description: newTodo });
//       } catch (error) { console.error("Failed to add todo:", error); }
//     }
//     setNewTodo("");
//     fetchTodos();
//   };

//   const handleEditTodo = (todo) => {
//     setEditingTodo(todo);
//     setNewTodo(todo.description);
//   };

//   const handleDeleteTodo = async (todoId) => {
//     try {
//       await axiosInstance.delete(`/api/todos/${todoId}/`);
//       fetchTodos();
//     } catch (error) { console.error("Failed to delete todo:", error); }
//   };

//   const handleTodoClose = () => {
//     setTodoDialogOpen(false);
//     setEditingTodo(null);
//     setNewTodo("");
//   };

//   // --- Other UI Handlers ---
//   const handleProfileClick = (event) => setAnchorEl(event.currentTarget);
//   const handleMenuClose = () => setAnchorEl(null);

//   const handleNotificationsClick = async (event) => {
//     setNotificationsEl(event.currentTarget);
//     const unread = notifications.filter(n => !n.isGlobal && n.is_view === 'N');
//     if (unread.length === 0) return;

//     const updatePromises = unread.map(n =>
//       axiosInstance.patch('/api/view_notification/', {
//         notification_id: n.id,
//         action: 'view'
//       })
//     );
//     try {
//       await Promise.all(updatePromises);
//       await fetchAllNotifications();
//     } catch (error) {
//       console.error("Failed to mark notifications as viewed:", error);
//     }
//   };

//   const handleNotificationsClose = () => setNotificationsEl(null);

//   const handleNotificationItemClick = async (notification) => {
//     if (notification.isGlobal) {
//       return;
//     }
//     try {
//       await axiosInstance.patch('/api/view_notification/', {
//         notification_id: notification.id,
//         action: 'click'
//       });
//       await fetchAllNotifications();
//     } catch (error) {
//       console.error("Failed to mark notification as clicked:", error);
//     }
//   };

//   const handleCalendarClick = (event) => setCalendarEl(event.currentTarget);
//   const handleCalendarClose = () => setCalendarEl(null);

//   const handleAccountClick = () => {
//     setAccountSidebarOpen(true);
//     handleMenuClose();
//   };

//   const handleLogout = () => {
//     localStorage.clear();
//     setAnchorEl(null);
//     setShowLogoutDialog(true);
//     setTimeout(() => {
//       setShowLogoutDialog(false);
//       window.location.href = "/hrms";
//     }, 3000);
//   };

//   const handleAccountSidebarClose = () => {
//     setAccountSidebarOpen(false);
//     setSelectedOption(null);
//   };

//   const handleOptionClick = (option) => {
//     setSelectedOption(option);
//     setFormDrawerOpen(true);
//   };

//   const handleFormDrawerClose = () => {
//     setFormDrawerOpen(false);
//   };

//   const renderContent = () => {
//     switch (selectedOption) {
//       case "Basic Information": return <BasicInformationForm onBack={handleFormDrawerClose}/>;
//       case "Personal Information": return <PersonalInformation selectedTab={selectedTab} setSelectedTab={setSelectedTab}  onBack={handleFormDrawerClose} />;
//       case "Profile Picture": return <ProfileTopBar  onBack={handleFormDrawerClose} />;
//       case "Documents": return <DocumentTopBar  onBack={handleFormDrawerClose} />;
//       case "Change Password": return <ChangePassTopBar  onBack={handleFormDrawerClose} />;
//       case "Details": return <ContractTopBar onBack={handleFormDrawerClose} />;
//       default: return <Typography variant="h6" sx={{ p: 2 }}>Select an option to view details</Typography>;
//     }
//   };

//   return (
//     <>
//       <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, background: "linear-gradient(135deg,rgba(239, 77, 36, 0.90) 0%,rgb(155, 10, 199)100%)", boxShadow: "0 4px 20px rgba(102, 126, 234, 0.3)"  }}>
//         <Toolbar>
//           <IconButton color="inherit" aria-label="toggle drawer" onClick={toggleDrawer} edge="start" sx={{ mr: 2 }}>
//             <MenuIcon />
//           </IconButton>
//           <Box>
//             <Link to="/hrms/dashboard/home">
//               <img src={tdtlLogo} alt="TDTL Logo" style={{ height: "40px", width: "auto" }}/>
//             </Link>
//           </Box>
//           <Box sx={{ flexGrow: 1 }} />

//           <IconButton color="inherit" onClick={handleNotificationsClick}>
//             <Badge badgeContent={unreadCount} color="secondary">
//               <NotificationsIcon />
//             </Badge>
//           </IconButton>
//           <Menu anchorEl={notificationsEl} open={Boolean(notificationsEl)} onClose={handleNotificationsClose}>
//             {notifications.length > 0 ? (
//               notifications.map((notification) => (
//                 <MenuItem key={notification.id} onClick={() => handleNotificationItemClick(notification)}>
//                   {notification.text}
//                 </MenuItem>
//               ))
//             ) : (
//               <MenuItem onClick={handleNotificationsClose}>No new notifications</MenuItem>
//             )}
//           </Menu>

//           <IconButton color="inherit" onClick={handleCalendarClick}><CalendarTodayIcon /></IconButton>
//           <Menu anchorEl={calendarEl} open={Boolean(calendarEl)} onClose={handleCalendarClose}>
//             <LocalizationProvider dateAdapter={AdapterDateFns}>
//               <StaticDatePicker displayStaticWrapperAs="desktop" value={new Date()} onChange={() => {}} />
//             </LocalizationProvider>
//           </Menu>

//           <IconButton color="inherit" onClick={handleTodoClick}><AssignmentIcon /></IconButton>

//           <Box
//             onClick={handleProfileClick}
//             sx={{
//               display: "flex", alignItems: "center", ml: 2, cursor: 'pointer',
//               p: 1, borderRadius: 2, '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' }
//             }}>
//             <Avatar alt="Profile Picture" src={profilePicture} />
//             <Box sx={{ ml: 1.5 }}>
//               <Typography variant="subtitle2" sx={{ lineHeight: 1.3, fontWeight: 'bold' }}>
//                 {userName}
//               </Typography>
//               <Typography variant="body2" sx={{ lineHeight: 1.3, color: 'rgba(255, 255, 255, 0.9)' }}>
//                 {userRole} ({userId})
//               </Typography>
//             </Box>
//           </Box>

//           <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
//             <MenuItem onClick={handleAccountClick}>My Account</MenuItem>
//             <MenuItem onClick={handleLogout}>Logout</MenuItem>
//           </Menu>
//         </Toolbar>
//       </AppBar>

//       <Dialog open={todoDialogOpen} onClose={handleTodoClose} maxWidth="xs" fullWidth>
//         <DialogTitle>{editingTodo ? "Update Todo" : "Todo List"}</DialogTitle>
//         <DialogContent>
//           <TextField
//             label={editingTodo ? "Update your task" : "New Todo"}
//             value={newTodo}
//             onChange={(e) => setNewTodo(e.target.value)}
//             fullWidth margin="normal"
//           />
//           <Button variant="contained" color="primary" onClick={handleAddOrUpdateTodo} fullWidth>
//             {editingTodo ? "Update Todo" : "Add Todo"}
//           </Button>
//           <List>
//             {todos.map((todo) => (
//               <ListItem key={todo.todo_item_id}>
//                 <ListItemText primary={todo.description} />
//                 <ListItemSecondaryAction>
//                   <IconButton edge="end" onClick={() => handleEditTodo(todo)}><EditIcon /></IconButton>
//                   <IconButton edge="end" onClick={() => handleDeleteTodo(todo.todo_item_id)}><DeleteIcon /></IconButton>
//                 </ListItemSecondaryAction>
//               </ListItem>
//             ))}
//           </List>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleTodoClose} color="secondary">Close</Button>
//         </DialogActions>
//       </Dialog>

//       <Dialog open={showLogoutDialog} sx={{ "& .MuiDialog-paper": { minWidth: "300px", borderRadius: "16px", textAlign: "center", padding: "16px" }}}>
//         <DialogContent>
//           <CheckCircle sx={{ fontSize: 80, color: "#4caf50", mb: 2 }} />
//           <Typography variant="h5" sx={{ fontWeight: "bold", color: "#333" }}>Logout Successful!</Typography>
//           <Typography sx={{ color: "#666", mt: 1 }}>Redirecting to login...</Typography>
//         </DialogContent>
//       </Dialog>

//       <Drawer
//         anchor="right"
//         open={accountSidebarOpen}
//         onClose={handleAccountSidebarClose}
//         sx={{ "& .MuiDrawer-paper": { width: 300, top: 64 } }}
//       >
//         <Box>
//           <Box
//             sx={{
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'space-between',
//               p: '12px 8px 12px 16px',
//             }}
//           >
//             <IconButton sx={{ visibility: 'hidden' }}><CloseIcon /></IconButton>
//             <Typography variant="h6" sx={{ flexGrow: 1, textAlign: 'center' }}>
//               My Account
//             </Typography>
//             <IconButton onClick={handleAccountSidebarClose}>
//               <CloseIcon />
//             </IconButton>
//           </Box>
//           <Divider />

//           <List sx={{ p: 0 }}>
//             {["Basic Information", "Personal Information", "Profile Picture", "Documents", "Change Password", "Details"].map((text) => (
//               <ListItem button key={text} onClick={() => handleOptionClick(text)}>
//                 <ListItemText primary={text} />
//               </ListItem>
//             ))}
//           </List>
//         </Box>
//       </Drawer>

//       <Drawer
//         anchor="right"
//         open={formDrawerOpen}
//         onClose={handleFormDrawerClose}
//         sx={{ "& .MuiDrawer-paper": { width: 600, padding: 2, top: 64, height: "calc(100vh - 64px)", overflowY: "auto" } }}
//       >
//         {renderContent()}
//       </Drawer>
//     </>
//   )
// }





// import { useState, useEffect, useCallback } from "react"
// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   IconButton,
//   Avatar,
//   Box,
//   Menu,
//   MenuItem,
//   Drawer,
//   List,
//   ListItem,
//   ListItemText,
//   Button,
//   DialogActions,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   TextField,
//   ListItemSecondaryAction,
//   Badge,
//   Divider,
// } from "@mui/material"
// import MenuIcon from "@mui/icons-material/Menu"
// import NotificationsIcon from "@mui/icons-material/Notifications"
// import CalendarTodayIcon from "@mui/icons-material/CalendarToday"
// import AssignmentIcon from "@mui/icons-material/Assignment"
// import { LocalizationProvider, StaticDatePicker } from "@mui/x-date-pickers"
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
// import DeleteIcon from "@mui/icons-material/Delete"
// import EditIcon from "@mui/icons-material/Edit"
// import { CheckCircle } from "@mui/icons-material"
// import tdtlLogo from "./vetrinalogo.png"
// import { Link } from "react-router-dom"
// import adminlogo from "./admin-logo.jpeg"
// import CloseIcon from "@mui/icons-material/Close";

// import axiosInstance from "../utils/axiosInstance";

// // Import sub-components
// import BasicInformationForm from "./basicinfotopbar"
// import PersonalInformation from "./personalinfotopbar"
// import ProfileTopBar from "./profiletopbar"
// import DocumentTopBar from "./documenttopbar"
// import ChangePassTopBar from "./changepasstopbar"
// import ContractTopBar from "./contracttopbar"

// export default function TopBar({ open, toggleDrawer }) {
//   const [anchorEl, setAnchorEl] = useState(null)
//   const [accountSidebarOpen, setAccountSidebarOpen] = useState(false)
//   const [selectedOption, setSelectedOption] = useState(null)
//   const [selectedTab, setSelectedTab] = useState(0)
//   const [profilePicture, setProfilePicture] = useState(adminlogo)
//   const [formDrawerOpen, setFormDrawerOpen] = useState(false)

//   // --- STATES FOR DYNAMIC UI DATA ---
//   const [userName, setUserName] = useState("User");
//   const [userRole, setUserRole] = useState("Employee");
//   const [notifications, setNotifications] = useState([]);
//   const [unreadCount, setUnreadCount] = useState(0);
//   const [notificationsEl, setNotificationsEl] = useState(null);
//   const [todos, setTodos] = useState([]);
//   const [todoDialogOpen, setTodoDialogOpen] = useState(false);
//   const [newTodo, setNewTodo] = useState("");
//   const [editingTodo, setEditingTodo] = useState(null);
//   const [calendarEl, setCalendarEl] = useState(null);
//   const [showLogoutDialog, setShowLogoutDialog] = useState(false);

//   const employeeId = localStorage.getItem("loggedInEmpId");
//   const userId = localStorage.getItem("loggedInUser");
//   const empid = localStorage.getItem("EmID");

//   // --- API: Fetch User Name and Role ---
//   useEffect(() => {
//     const fetchUserData = async () => {
//       if (!employeeId) return;
//       try {
//         const response = await axiosInstance.get('/api/dropdown/employee-role/');
//         if (response.data && Array.isArray(response.data)) {
//           const currentUser = response.data.find(emp => emp.id === Number(employeeId));
//           if (currentUser) {
//             setUserName(currentUser.employee_name);
//             setUserRole(currentUser.role_name);
//           }
//         }
//       } catch (error) {
//         console.error("Failed to fetch user role data:", error);
//       }
//     };
//     fetchUserData();
//   }, [employeeId]);

//   // --- API: Fetch Profile Photo ---
//   useEffect(() => {
//     const fetchProfilePhoto = async () => {
//       if (!empid) return;
//       try {
//         const response = await axiosInstance.get(`/api/get_profile_photo/${empid}/`);
//         if (response.data && response.data.status === 'success' && response.data.data) {
//           const secureUrl = response.data.data.replace(/^http:\/\//i, 'https://');
//           setProfilePicture(secureUrl);
//         }
//       } catch (error) {
//         console.error("Failed to fetch profile photo:", error);
//       }
//     };
//     fetchProfilePhoto();
//   }, [empid]);


//   const fetchAllNotifications = useCallback(async () => {
//     if (!userId || !empid) return;

//     const fetchGlobalNotifications = axiosInstance.get(`/notifications/global/${empid}/`).then(response => {
//       const {
//         birthdays, work_anniversaries, new_joinees, announcements,
//         events, awards, policy_notification, asset_notification
//       } = response.data;
//       let formattedMessages = [];
//       if (birthdays?.length > 0) birthdays.forEach(b => formattedMessages.push({ text: `🎂 Happy Birthday to ${b.full_name}!` }));
//       if (work_anniversaries?.length > 0) work_anniversaries.forEach(w => formattedMessages.push({ text: `🎉 Happy Work Anniversary to ${w.full_name}!` }));
//       if (new_joinees?.length > 0) new_joinees.forEach(n => formattedMessages.push({ text: `👋 Welcome to our new joinee, ${n.full_name}!` }));
//       if (announcements?.length > 0) announcements.forEach(a => formattedMessages.push({ text: `📢 Announcement: ${a.title}` }));
//       if (events?.length > 0) events.forEach(e => formattedMessages.push({ text: `🗓️ Event Today: ${e.event_title}` }));
//       if (awards?.length > 0) awards.forEach(a => formattedMessages.push({ text: `🏆 Award: ${a.award_information}` }));
//       if (asset_notification) formattedMessages.push({ text: `💻 Asset Update: ${asset_notification}` });
//       return formattedMessages.map((msg, index) => ({ ...msg, id: `global-${index}`, isGlobal: true }));
//     }).catch(error => {
//       console.error("Failed to fetch global notifications:", error);
//       return [];
//     });

//     const fetchUserNotifications = axiosInstance.get('/api/view_notification/', { params: { user_id: employeeId } }).then(response => {
//       if (response.data?.status === 'success' && Array.isArray(response.data.data)) {
//         const userData = response.data.data;
//         const newUnreadCount = userData.filter(n => n.is_view === 'N').length;
//         setUnreadCount(newUnreadCount);
//         return userData.map(n => ({
//           ...n,
//           text: `🧾Policy Update: ${n.notification_text}`,
//           id: n.notification_id,
//           isGlobal: false
//         }));
//       }
//       return [];
//     }).catch(error => {
//       console.error("Failed to fetch user notifications:", error);
//       return [];
//     });

//     const [globalNotifs, userNotifs] = await Promise.all([
//       fetchGlobalNotifications,
//       fetchUserNotifications
//     ]);
    
//     setNotifications([...userNotifs, ...globalNotifs]);
//   }, [userId, empid, employeeId]);

//   useEffect(() => {
//     fetchAllNotifications();
//   }, [fetchAllNotifications]);

//   // --- API: To-Do CRUD Operations ---
//   const fetchTodos = async () => {
//     try {
//       const response = await axiosInstance.get('/api/todos/');
//       setTodos(response.data || []);
//     } catch (error) { console.error("Failed to fetch todos:", error); }
//   };

//   const handleTodoClick = () => {
//     fetchTodos();
//     setTodoDialogOpen(true);
//   };

//   const handleAddOrUpdateTodo = async () => {
//     if (!newTodo.trim()) return;
//     if (editingTodo) {
//       try {
//         await axiosInstance.patch(`/api/todos/${editingTodo.todo_item_id}/`, { description: newTodo });
//         setEditingTodo(null);
//       } catch (error) { console.error("Failed to update todo:", error); }
//     } else {
//       try {
//         await axiosInstance.post('/api/todos/', { description: newTodo });
//       } catch (error) { console.error("Failed to add todo:", error); }
//     }
//     setNewTodo("");
//     fetchTodos();
//   };

//   const handleEditTodo = (todo) => {
//     setEditingTodo(todo);
//     setNewTodo(todo.description);
//   };

//   const handleDeleteTodo = async (todoId) => {
//     try {
//       await axiosInstance.delete(`/api/todos/${todoId}/`);
//       fetchTodos();
//     } catch (error) { console.error("Failed to delete todo:", error); }
//   };

//   const handleTodoClose = () => {
//     setTodoDialogOpen(false);
//     setEditingTodo(null);
//     setNewTodo("");
//   };

//   // --- Other UI Handlers ---
//   const handleProfileClick = (event) => setAnchorEl(event.currentTarget);
//   const handleMenuClose = () => setAnchorEl(null);

//   const handleNotificationsClick = async (event) => {
//     setNotificationsEl(event.currentTarget);
//     const unread = notifications.filter(n => !n.isGlobal && n.is_view === 'N');
//     if (unread.length === 0) return;

//     const updatePromises = unread.map(n =>
//       axiosInstance.patch('/api/view_notification/', {
//         notification_id: n.id,
//         action: 'view'
//       })
//     );
//     try {
//       await Promise.all(updatePromises);
//       await fetchAllNotifications();
//     } catch (error) {
//       console.error("Failed to mark notifications as viewed:", error);
//     }
//   };

//   const handleNotificationsClose = () => setNotificationsEl(null);

//   const handleNotificationItemClick = async (notification) => {
//     if (notification.isGlobal) {
//       return;
//     }
//     try {
//       await axiosInstance.patch('/api/view_notification/', {
//         notification_id: notification.id,
//         action: 'click'
//       });
//       await fetchAllNotifications();
//     } catch (error) {
//       console.error("Failed to mark notification as clicked:", error);
//     }
//   };

//   const handleCalendarClick = (event) => setCalendarEl(event.currentTarget);
//   const handleCalendarClose = () => setCalendarEl(null);

//   const handleAccountClick = () => {
//     setAccountSidebarOpen(true);
//     handleMenuClose();
//   };

//   const handleLogout = () => {
//     localStorage.clear();
//     setAnchorEl(null);
//     setShowLogoutDialog(true);
//     setTimeout(() => {
//       setShowLogoutDialog(false);
//       window.location.href = "/hrms";
//     }, 3000);
//   };

//   const handleAccountSidebarClose = () => {
//     setAccountSidebarOpen(false);
//     setSelectedOption(null);
//   };

//   const handleOptionClick = (option) => {
//     setSelectedOption(option);
//     setFormDrawerOpen(true);
//   };

//   const handleFormDrawerClose = () => {
//     setFormDrawerOpen(false);
//   };

//   const renderContent = () => {
//     switch (selectedOption) {
//       case "Basic Information": return <BasicInformationForm onBack={handleFormDrawerClose}/>;
//       case "Personal Information": return <PersonalInformation selectedTab={selectedTab} setSelectedTab={setSelectedTab}  onBack={handleFormDrawerClose} />;
//       case "Profile Picture": return <ProfileTopBar  onBack={handleFormDrawerClose} />;
//       case "Documents": return <DocumentTopBar  onBack={handleFormDrawerClose} />;
//       case "Change Password": return <ChangePassTopBar  onBack={handleFormDrawerClose} />;
//       case "Details": return <ContractTopBar onBack={handleFormDrawerClose} />;
//       default: return <Typography variant="h6" sx={{ p: 2 }}>Select an option to view details</Typography>;
//     }
//   };

//   return (
//     <>
//       <AppBar position="fixed" sx={{ 
//         zIndex: (theme) => theme.zIndex.drawer + 1, 
//         background: "linear-gradient(to right, #F58E35, #8C257C)", 
//         boxShadow: "0 4px 20px rgba(102, 126, 234, 0.3)" 
//       }}>
//         <Toolbar>
         
//           <Box sx={{
//               backgroundColor: 'white',
//               borderRadius: '8px',
//               padding: '4px',
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//               mr: 2,
//             }}>
//             <Link to="/hrms/dashboard/home">
//               <img 
//                 src={tdtlLogo} 
//                 alt="TDTL Logo" 
//                 style={{ height: "36px", width: "auto", display: 'block' }}
//               />
//             </Link>
//           </Box>
//           <Box sx={{ flexGrow: 1 }} />

//           <IconButton color="inherit" onClick={handleNotificationsClick}>
//             <Badge badgeContent={unreadCount} color="secondary">
//               <NotificationsIcon />
//             </Badge>
//           </IconButton>
//           <Menu anchorEl={notificationsEl} open={Boolean(notificationsEl)} onClose={handleNotificationsClose}>
//             {notifications.length > 0 ? (
//               notifications.map((notification) => (
//                 <MenuItem key={notification.id} onClick={() => handleNotificationItemClick(notification)}>
//                   {notification.text}
//                 </MenuItem>
//               ))
//             ) : (
//               <MenuItem onClick={handleNotificationsClose}>No new notifications</MenuItem>
//             )}
//           </Menu>

//           <IconButton color="inherit" onClick={handleCalendarClick}><CalendarTodayIcon /></IconButton>
//           <Menu anchorEl={calendarEl} open={Boolean(calendarEl)} onClose={handleCalendarClose}>
//             <LocalizationProvider dateAdapter={AdapterDateFns}>
//               <StaticDatePicker displayStaticWrapperAs="desktop" value={new Date()} onChange={() => {}} />
//             </LocalizationProvider>
//           </Menu>

//           <IconButton color="inherit" onClick={handleTodoClick}><AssignmentIcon /></IconButton>

//           <Box
//             onClick={handleProfileClick}
//             sx={{
//               display: "flex", alignItems: "center", ml: 2, cursor: 'pointer',
//               p: 1, borderRadius: 2, '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' }
//             }}>
//             <Avatar alt="Profile Picture" src={profilePicture} />
//             <Box sx={{ ml: 1.5 }}>
//               <Typography variant="subtitle2" sx={{ lineHeight: 1.3, fontWeight: 'bold' }}>
//                 {userName}
//               </Typography>
//               <Typography variant="body2" sx={{ lineHeight: 1.3, color: 'rgba(255, 255, 255, 0.9)' }}>
//                 {userRole} ({userId})
//               </Typography>
//             </Box>
//           </Box>

//           <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
//             <MenuItem onClick={handleAccountClick}>My Account</MenuItem>
//             <MenuItem onClick={handleLogout}>Logout</MenuItem>
//           </Menu>
//         </Toolbar>
//       </AppBar>

//       <Dialog open={todoDialogOpen} onClose={handleTodoClose} maxWidth="xs" fullWidth>
//         <DialogTitle>{editingTodo ? "Update Todo" : "Todo List"}</DialogTitle>
//         <DialogContent>
//           <TextField
//             label={editingTodo ? "Update your task" : "New Todo"}
//             value={newTodo}
//             onChange={(e) => setNewTodo(e.target.value)}
//             fullWidth margin="normal"
//           />
//           <Button variant="contained" color="primary" onClick={handleAddOrUpdateTodo} fullWidth>
//             {editingTodo ? "Update Todo" : "Add Todo"}
//           </Button>
//           <List>
//             {todos.map((todo) => (
//               <ListItem key={todo.todo_item_id}>
//                 <ListItemText primary={todo.description} />
//                 <ListItemSecondaryAction>
//                   <IconButton edge="end" onClick={() => handleEditTodo(todo)}><EditIcon /></IconButton>
//                   <IconButton edge="end" onClick={() => handleDeleteTodo(todo.todo_item_id)}><DeleteIcon /></IconButton>
//                 </ListItemSecondaryAction>
//               </ListItem>
//             ))}
//           </List>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleTodoClose} color="secondary">Close</Button>
//         </DialogActions>
//       </Dialog>

//       <Dialog open={showLogoutDialog} sx={{ "& .MuiDialog-paper": { minWidth: "300px", borderRadius: "16px", textAlign: "center", padding: "16px" }}}>
//         <DialogContent>
//           <CheckCircle sx={{ fontSize: 80, color: "#4caf50", mb: 2 }} />
//           <Typography variant="h5" sx={{ fontWeight: "bold", color: "#333" }}>Logout Successful!</Typography>
//           <Typography sx={{ color: "#666", mt: 1 }}>Redirecting to login...</Typography>
//         </DialogContent>
//       </Dialog>

//       <Drawer
//         anchor="right"
//         open={accountSidebarOpen}
//         onClose={handleAccountSidebarClose}
//         sx={{ "& .MuiDrawer-paper": { width: 300, top: 64 } }}
//       >
//         <Box>
//           <Box
//             sx={{
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'space-between',
//               p: '12px 8px 12px 16px',
//             }}
//           >
//             <IconButton sx={{ visibility: 'hidden' }}><CloseIcon /></IconButton>
//             <Typography variant="h6" sx={{ flexGrow: 1, textAlign: 'center' }}>
//               My Account
//             </Typography>
//             <IconButton onClick={handleAccountSidebarClose}>
//               <CloseIcon />
//             </IconButton>
//           </Box>
//           <Divider />

//           <List sx={{ p: 0 }}>
//             {["Basic Information", "Personal Information", "Profile Picture", "Documents", "Change Password", "Details"].map((text) => (
//               <ListItem button key={text} onClick={() => handleOptionClick(text)}>
//                 <ListItemText primary={text} />
//               </ListItem>
//             ))}
//           </List>
//         </Box>
//       </Drawer>

//       <Drawer
//         anchor="right"
//         open={formDrawerOpen}
//         onClose={handleFormDrawerClose}
//         sx={{ "& .MuiDrawer-paper": { width: 600, padding: 2, top: 64, height: "calc(100vh - 64px)", overflowY: "auto" } }}
//       >
//         {renderContent()}
//       </Drawer>
//     </>
//   )
// }








import { useState, useEffect, useCallback } from "react"
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Box,
  Menu,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Button,
  DialogActions,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  ListItemSecondaryAction,
  Badge,
  Divider,
} from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import NotificationsIcon from "@mui/icons-material/Notifications"
import CalendarTodayIcon from "@mui/icons-material/CalendarToday"
import AssignmentIcon from "@mui/icons-material/Assignment"
import { LocalizationProvider, StaticDatePicker } from "@mui/x-date-pickers"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from "@mui/icons-material/Edit"
import { CheckCircle } from "@mui/icons-material"
import tdtlLogo from "./vetrinalogo.png"
import { Link } from "react-router-dom"
import adminlogo from "./admin-logo.jpeg"
import CloseIcon from "@mui/icons-material/Close";

import axiosInstance from "../utils/axiosInstance";
import Swal from 'sweetalert2';

// Import sub-components
import BasicInformationForm from "./basicinfotopbar"
import PersonalInformation from "./personalinfotopbar"
import ProfileTopBar from "./profiletopbar"
import DocumentTopBar from "./documenttopbar"
import ChangePassTopBar from "./changepasstopbar"
import ContractTopBar from "./contracttopbar"
import SignatureUploader from './UploadSign';



export default function TopBar({ open, toggleDrawer }) {
  const [anchorEl, setAnchorEl] = useState(null)
  const [accountSidebarOpen, setAccountSidebarOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState(null)
  const [selectedTab, setSelectedTab] = useState(0)
  const [profilePicture, setProfilePicture] = useState(adminlogo)
  const [formDrawerOpen, setFormDrawerOpen] = useState(false)

  // --- STATES FOR DYNAMIC UI DATA ---
  const [userName, setUserName] = useState("User");
  const [userRole, setUserRole] = useState("Employee");
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [notificationsEl, setNotificationsEl] = useState(null);
  const [todos, setTodos] = useState([]);
  const [todoDialogOpen, setTodoDialogOpen] = useState(false);
  const [newTodo, setNewTodo] = useState("");
  const [editingTodo, setEditingTodo] = useState(null);
  const [calendarEl, setCalendarEl] = useState(null);

  const employeeId = localStorage.getItem("loggedInEmpId");
  const userId = localStorage.getItem("loggedInUser");
  const empid = localStorage.getItem("EmID");

  // --- API: Fetch User Name and Role ---
  useEffect(() => {
    const fetchUserData = async () => {
      if (!employeeId) return;
      try {
        const response = await axiosInstance.get('/api/dropdown/employee-role/');
        if (response.data && Array.isArray(response.data)) {
          const currentUser = response.data.find(emp => emp.id === Number(employeeId));
          if (currentUser) {
            setUserName(currentUser.employee_name);
            setUserRole(currentUser.role_name);
          }
        }
      } catch (error) {
        console.error("Failed to fetch user role data:", error);
      }
    };
    fetchUserData();
  }, [employeeId]);

  // --- API: Fetch Profile Photo ---
  useEffect(() => {
    const fetchProfilePhoto = async () => {
      if (!empid) return;
      try {
        const response = await axiosInstance.get(`/api/get_profile_photo/${empid}/`);
        if (response.data && response.data.status === 'success' && response.data.data) {
          const secureUrl = response.data.data.replace(/^http:\/\//i, 'https://');
          setProfilePicture(secureUrl);
        }
      } catch (error) {
        console.error("Failed to fetch profile photo:", error);
      }
    };
    fetchProfilePhoto();
  }, [empid]);


  const fetchAllNotifications = useCallback(async () => {
    if (!userId || !empid) return;

    const fetchGlobalNotifications = axiosInstance.get(`/notifications/global/${empid}/`).then(response => {
      const {
        birthdays, work_anniversaries, new_joinees, announcements,
        events, awards, policy_notification, asset_notification
      } = response.data;
      let formattedMessages = [];
      if (birthdays?.length > 0) birthdays.forEach(b => formattedMessages.push({ text: `🎂 Happy Birthday to ${b.full_name}!` }));
      if (work_anniversaries?.length > 0) work_anniversaries.forEach(w => formattedMessages.push({ text: `🎉 Happy Work Anniversary to ${w.full_name}!` }));
      if (new_joinees?.length > 0) new_joinees.forEach(n => formattedMessages.push({ text: `👋 Welcome to our new joinee, ${n.full_name}!` }));
      if (announcements?.length > 0) announcements.forEach(a => formattedMessages.push({ text: `📢 Announcement: ${a.title}` }));
      if (events?.length > 0) events.forEach(e => formattedMessages.push({ text: `🗓️ Event Today: ${e.event_title}` }));
      if (awards?.length > 0) awards.forEach(a => formattedMessages.push({ text: `🏆 Award: ${a.award_information}` }));
      if (asset_notification) formattedMessages.push({ text: `💻 Asset Update: ${asset_notification}` });
      return formattedMessages.map((msg, index) => ({ ...msg, id: `global-${index}`, isGlobal: true }));
    }).catch(error => {
      console.error("Failed to fetch global notifications:", error);
      return [];
    });

    const fetchUserNotifications = axiosInstance.get('/api/view_notification/', { params: { user_id: employeeId } }).then(response => {
      if (response.data?.status === 'success' && Array.isArray(response.data.data)) {
        const userData = response.data.data;
        const newUnreadCount = userData.filter(n => n.is_view === 'N').length;
        setUnreadCount(newUnreadCount);
        return userData.map(n => ({
          ...n,
          text: `🧾Policy Update: ${n.notification_text}`,
          id: n.notification_id,
          isGlobal: false
        }));
      }
      return [];
    }).catch(error => {
      console.error("Failed to fetch user notifications:", error);
      return [];
    });

    const [globalNotifs, userNotifs] = await Promise.all([
      fetchGlobalNotifications,
      fetchUserNotifications
    ]);
    
    setNotifications([...userNotifs, ...globalNotifs]);
  }, [userId, empid, employeeId]);

  useEffect(() => {
    fetchAllNotifications();
  }, [fetchAllNotifications]);

  // --- API: To-Do CRUD Operations ---
  const fetchTodos = async () => {
    try {
      const response = await axiosInstance.get('/api/todos/');
      setTodos(response.data || []);
    } catch (error) { console.error("Failed to fetch todos:", error); }
  };

  const handleTodoClick = () => {
    fetchTodos();
    setTodoDialogOpen(true);
  };

  const handleAddOrUpdateTodo = async () => {
    if (!newTodo.trim()) return;
    if (editingTodo) {
      try {
        await axiosInstance.patch(`/api/todos/${editingTodo.todo_item_id}/`, { description: newTodo });
        setEditingTodo(null);
      } catch (error) { console.error("Failed to update todo:", error); }
    } else {
      try {
        await axiosInstance.post('/api/todos/', { description: newTodo });
      } catch (error) { console.error("Failed to add todo:", error); }
    }
    setNewTodo("");
    fetchTodos();
  };

  const handleEditTodo = (todo) => {
    setEditingTodo(todo);
    setNewTodo(todo.description);
  };

  const handleDeleteTodo = async (todoId) => {
    try {
      await axiosInstance.delete(`/api/todos/${todoId}/`);
      fetchTodos();
    } catch (error) { console.error("Failed to delete todo:", error); }
  };

  const handleTodoClose = () => {
    setTodoDialogOpen(false);
    setEditingTodo(null);
    setNewTodo("");
  };

  // --- Other UI Handlers ---
  const handleProfileClick = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleNotificationsClick = async (event) => {
    setNotificationsEl(event.currentTarget);
    const unread = notifications.filter(n => !n.isGlobal && n.is_view === 'N');
    if (unread.length === 0) return;

    const updatePromises = unread.map(n =>
      axiosInstance.patch('/api/view_notification/', {
        notification_id: n.id,
        action: 'view'
      })
    );
    try {
      await Promise.all(updatePromises);
      await fetchAllNotifications();
    } catch (error) {
      console.error("Failed to mark notifications as viewed:", error);
    }
  };

  const handleNotificationsClose = () => setNotificationsEl(null);

  const handleNotificationItemClick = async (notification) => {
    if (notification.isGlobal) {
      return;
    }
    try {
      await axiosInstance.patch('/api/view_notification/', {
        notification_id: notification.id,
        action: 'click'
      });
      await fetchAllNotifications();
    } catch (error) {
      console.error("Failed to mark notification as clicked:", error);
    }
  };

  const handleCalendarClick = (event) => setCalendarEl(event.currentTarget);
  const handleCalendarClose = () => setCalendarEl(null);

  const handleAccountClick = () => {
    setAccountSidebarOpen(true);
    handleMenuClose();
  };

  const handleLogout = () => {
    localStorage.clear();
    setAnchorEl(null);
    Swal.fire({
        title: 'Logout Successful!',
        text: 'Redirecting to login...',
        icon: 'success',
        timer: 3000,
        timerProgressBar: true,
        didOpen: () => {
            Swal.showLoading()
        }
    }).then(() => {
        window.location.href = "/hrms";
    });
};

  const handleAccountSidebarClose = () => {
    setAccountSidebarOpen(false);
    setSelectedOption(null);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setFormDrawerOpen(true);
  };

  const handleFormDrawerClose = () => {
    setFormDrawerOpen(false);
  };

  const renderContent = () => {
    switch (selectedOption) {
      case "Basic Information": return <BasicInformationForm onBack={handleFormDrawerClose}/>;
      case "Personal Information": return <PersonalInformation selectedTab={selectedTab} setSelectedTab={setSelectedTab}  onBack={handleFormDrawerClose} />;
      case "Profile Picture": return <ProfileTopBar  onBack={handleFormDrawerClose} />;
      case "Documents": return <DocumentTopBar  onBack={handleFormDrawerClose} />;
      case "Change Password": return <ChangePassTopBar  onBack={handleFormDrawerClose} />;
      case "Details": return <ContractTopBar onBack={handleFormDrawerClose} />;
            case "Upload Signature": return <SignatureUploader onBack={handleFormDrawerClose} />;
      default: return <Typography variant="h6" sx={{ p: 2 }}>Select an option to view details</Typography>;
    }
  };

  return (
    <>
      <AppBar position="fixed" sx={{ 
        zIndex: (theme) => theme.zIndex.drawer + 1, 
        background: "linear-gradient(to right, #F58E35, #8C257C)", 
        boxShadow: "0 4px 20px rgba(102, 126, 234, 0.3)" 
      }}>
        <Toolbar>
         
          <Box sx={{
              backgroundColor: 'white',
              borderRadius: '8px',
              padding: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mr: 2,
            }}>
            <Link to="/hrms/dashboard/home">
              <img 
                src={tdtlLogo} 
                alt="TDTL Logo" 
                style={{ height: "36px", width: "auto", display: 'block' }}
              />
            </Link>
          </Box>
          <Box sx={{ flexGrow: 1 }} />

          <IconButton color="inherit" onClick={handleNotificationsClick}>
            <Badge badgeContent={unreadCount} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <Menu anchorEl={notificationsEl} open={Boolean(notificationsEl)} onClose={handleNotificationsClose}>
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <MenuItem key={notification.id} onClick={() => handleNotificationItemClick(notification)}>
                  {notification.text}
                </MenuItem>
              ))
            ) : (
              <MenuItem onClick={handleNotificationsClose}>No new notifications</MenuItem>
            )}
          </Menu>

          <IconButton color="inherit" onClick={handleCalendarClick}><CalendarTodayIcon /></IconButton>
          <Menu anchorEl={calendarEl} open={Boolean(calendarEl)} onClose={handleCalendarClose}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <StaticDatePicker displayStaticWrapperAs="desktop" value={new Date()} onChange={() => {}} />
            </LocalizationProvider>
          </Menu>

          <IconButton color="inherit" onClick={handleTodoClick}><AssignmentIcon /></IconButton>

          <Box
            onClick={handleProfileClick}
            sx={{
              display: "flex", alignItems: "center", ml: 2, cursor: 'pointer',
              p: 1, borderRadius: 2, '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' }
            }}>
            <Avatar alt="Profile Picture" src={profilePicture} />
            <Box sx={{ ml: 1.5 }}>
              <Typography variant="subtitle2" sx={{ lineHeight: 1.3, fontWeight: 'bold' }}>
                {userName}
              </Typography>
              <Typography variant="body2" sx={{ lineHeight: 1.3, color: 'rgba(255, 255, 255, 0.9)' }}>
                {userRole} ({userId})
              </Typography>
            </Box>
          </Box>

          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
            <MenuItem onClick={handleAccountClick}>My Account</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      <Dialog open={todoDialogOpen} onClose={handleTodoClose} maxWidth="xs" fullWidth>
        <DialogTitle>{editingTodo ? "Update Todo" : "Todo List"}</DialogTitle>
        <DialogContent>
          <TextField
            label={editingTodo ? "Update your task" : "New Todo"}
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            fullWidth margin="normal"
          />
          <Button variant="contained" color="primary" onClick={handleAddOrUpdateTodo} fullWidth>
            {editingTodo ? "Update Todo" : "Add Todo"}
          </Button>
          <List>
            {todos.map((todo) => (
              <ListItem key={todo.todo_item_id}>
                <ListItemText primary={todo.description} />
                <ListItemSecondaryAction>
                  <IconButton edge="end" onClick={() => handleEditTodo(todo)}><EditIcon /></IconButton>
                  <IconButton edge="end" onClick={() => handleDeleteTodo(todo.todo_item_id)}><DeleteIcon /></IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleTodoClose} color="secondary">Close</Button>
        </DialogActions>
      </Dialog>

      <Drawer
        anchor="right"
        open={accountSidebarOpen}
        onClose={handleAccountSidebarClose}
        sx={{ "& .MuiDrawer-paper": { width: 300, top: 64 } }}
      >
        <Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              p: '12px 8px 12px 16px',
            }}
          >
            <IconButton sx={{ visibility: 'hidden' }}><CloseIcon /></IconButton>
            <Typography variant="h6" sx={{ flexGrow: 1, textAlign: 'center' }}>
              My Account
            </Typography>
            <IconButton onClick={handleAccountSidebarClose}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Divider />

          <List sx={{ p: 0 }}>
            {["Basic Information", "Personal Information", "Profile Picture", "Documents", "Change Password", "Details", "Upload Signature"].map((text) => (
              <ListItem button key={text} onClick={() => handleOptionClick(text)}>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      <Drawer
        anchor="right"
        open={formDrawerOpen}
        onClose={handleFormDrawerClose}
        sx={{ "& .MuiDrawer-paper": { width: 600, padding: 2, top: 64, height: "calc(100vh - 64px)", overflowY: "auto" } }}
      >
        {renderContent()}
      </Drawer>
    </>
  )
}