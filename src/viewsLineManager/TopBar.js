
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
//         setUnreadCount(formattedMessages.length); // Set the initial count
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

//   // --- API: Fetch Profile Photo (ADDED WITH FIX) ---
//   useEffect(() => {
//     const fetchProfilePhoto = async () => {
//       if (!empid) return; // Don't run if empid is not available
//       try {
//         const response = await axiosInstance.get(`/api/get_profile_photo/${empid}/`);
//         if (response.data && response.data.status === 'success' && response.data.data) {
//           // FIX: Ensure the URL is HTTPS to prevent mixed content issues.
//           const secureUrl = response.data.data.replace(/^http:\/\//i, 'https://');
//           setProfilePicture(secureUrl);
//         }
//       } catch (error) {
//         console.error("Failed to fetch profile photo:", error);
//       }
//     };
//     fetchProfilePhoto();
//   }, [empid]); // Rerun this effect if empid changes


//   // --- API: Fetch Notifications (UPDATED) ---
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
//         if (policy_notification) {
//           formattedMessages.push(`📜 Policy Update: ${policy_notification}`);
//         }
//         if (asset_notification) {
//           formattedMessages.push(`💻 Asset Update: ${asset_notification}`);
//         }

//         setNotifications(formattedMessages);
//         setUnreadCount(formattedMessages.length); // Set the initial count
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

import axiosInstance from "../utils/axiosInstance";

// Import sub-components
import BasicInformationForm from "./basicinfotopbar"
import PersonalInformation from "./personalinfotopbar"
import ProfileTopBar from "./profiletopbar"
import DocumentTopBar from "./documenttopbar"
import ChangePassTopBar from "./changepasstopbar"
import ContractTopBar from "./contracttopbar"

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
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

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
    setShowLogoutDialog(true);
    setTimeout(() => {
      setShowLogoutDialog(false);
      window.location.href = "/hrms";
    }, 3000);
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
      default: return <Typography variant="h6" sx={{ p: 2 }}>Select an option to view details</Typography>;
    }
  };

  return (
    <>
      <AppBar 
        position="fixed" 
        sx={{ 
          zIndex: (theme) => theme.zIndex.drawer + 1, 
          background: "linear-gradient(to right, #F58E35, #8C257C)", 
          boxShadow: "0 4px 20px rgba(102, 126, 234, 0.3)"  
        }}
      >
        <Toolbar>
         
          <Box 
            sx={{ 
              backgroundColor: 'white', 
              padding: '5px', 
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <Link to="/hrms/dashboard/home">
              <img 
                src={tdtlLogo} 
                alt="TDTL Logo" 
                style={{ height: "40px", width: "auto", display: 'block' }}
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
              display: "flex",
              alignItems: "center",
              ml: 2,
              cursor: 'pointer',
              p: 1,
              borderRadius: 2,
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              },
            }}
          >
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
            fullWidth
            margin="normal"
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

      <Dialog open={showLogoutDialog} sx={{ "& .MuiDialog-paper": { minWidth: "300px", borderRadius: "16px", textAlign: "center", padding: "16px" }}}>
        <DialogContent>
          <CheckCircle sx={{ fontSize: 80, color: "#4caf50", mb: 2 }} />
          <Typography variant="h5" sx={{ fontWeight: "bold", color: "#333" }}>Logout Successful!</Typography>
          <Typography sx={{ color: "#666", mt: 1 }}>Redirecting to login...</Typography>
        </DialogContent>
      </Dialog>

      <Drawer anchor="right" open={accountSidebarOpen} onClose={handleAccountSidebarClose} sx={{ "& .MuiDrawer-paper": { width: 300, padding: 2, top: 64 } }}>
        <Typography variant="h6">My Account</Typography>
        <List>
          {["Basic Information", "Personal Information", "Profile Picture", "Documents", "Change Password", "Details"].map((text) => (
            <ListItem button key={text} onClick={() => handleOptionClick(text)}>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
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