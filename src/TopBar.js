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
//   Paper,
//   TextField,
//   FormControl,
//   InputLabel,
//   Select,
//   Grid,
//   DialogActions,
//   Divider,
//   Card,
//   CardContent,
//   Stack,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   CircularProgress,
//   Badge,
//   Alert,
//   InputAdornment,
// } from "@mui/material"
// import MenuIcon from "@mui/icons-material/Menu"
// import NotificationsIcon from "@mui/icons-material/Notifications"
// import CalendarTodayIcon from "@mui/icons-material/CalendarToday"
// import AssignmentIcon from "@mui/icons-material/Assignment"
// import { useNavigate } from "react-router-dom"
// import { Visibility, VisibilityOff, Delete } from "@mui/icons-material"
// import { LocalizationProvider, StaticDatePicker } from "@mui/x-date-pickers"
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
// import DeleteIcon from "@mui/icons-material/Delete"
// import EditIcon from "@mui/icons-material/Edit"
// import { CheckCircle } from "@mui/icons-material"
// import tdtlLogo from "./vetrinalogo.png"
// import { Link } from "react-router-dom"
// import adminlogo from "./admin-logo.png"
// import { MailOutline as MailOutlineIcon, Phone as PhoneIcon } from "@mui/icons-material"
// import axiosInstance from "../utils/axiosInstance"
// import CloseIcon from "@mui/icons-material/Close"

// // --- API Configuration ---
// const TODO_API_URL = "https://tdtlworld.com/hrms-backend/api/todos/"
// const getAuthToken = () => localStorage.getItem("accessToken")

// export default function TopBar({ open, toggleDrawer }) {
//   const [anchorEl, setAnchorEl] = useState(null)

//   // States for "My Account"
//   const [accountSidebarOpen, setAccountSidebarOpen] = useState(false)
//   const [selectedOption, setSelectedOption] = useState(null)
//   const [formDrawerOpen, setFormDrawerOpen] = useState(false)
//   const [accountData, setAccountData] = useState(null)
//   const [loadingData, setLoadingData] = useState(false)
//   const [isChangingPassword, setIsChangingPassword] = useState(false)
  
//   const [accountMessage, setAccountMessage] = useState({ text: '', type: '' });

//   // States updated by API
//   const [profilePicture, setProfilePicture] = useState(adminlogo)
//   const [userName, setUserName] = useState("User")
//   const [userRole, setUserRole] = useState("Role")

//   // States for "Change Password" form
//   const [currentPassword, setCurrentPassword] = useState("")
//   const [newPassword, setNewPassword] = useState("")
//   const [confirmNewPassword, setConfirmNewPassword] = useState("")
//   const [showNewPassword, setShowNewPassword] = useState(false)
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false)
//   const [passwordMessage, setPasswordMessage] = useState({ text: '', type: '' });

//   const navigate = useNavigate()

//   // States for other TopBar features
//   const [notifications, setNotifications] = useState([]);
//   const [unreadCount, setUnreadCount] = useState(0);
//   const [notificationsEl, setNotificationsEl] = useState(null)
//   const [calendarEl, setCalendarEl] = useState(null)
//   const [todoDialogOpen, setTodoDialogOpen] = useState(false)
//   const [todos, setTodos] = useState([])
//   const [newTodo, setNewTodo] = useState("")
//   const [editingTodoId, setEditingTodoId] = useState(null)
//   const [showLogoutDialog, setShowLogoutDialog] = useState(false)

//   const userId = localStorage.getItem("loggedInUser")
//   const employeeId = localStorage.getItem("loggedInEmpId");
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

//   // --- API to fetch profile photo on initial load ---
//   useEffect(() => {
//     const fetchProfilePhoto = async () => {
//       if (!empid) return;
//       try {
//         const response = await axiosInstance.get(`/api/get_profile_photo/${empid}/`);
//         if (response.data && response.data.status === "success" && response.data.data) {
//           const secureUrl = response.data.data.replace(/^http:\/\//i, 'https://');
//           setProfilePicture(secureUrl);
//         }
//       } catch (error) {
//         console.error("Failed to fetch profile photo:", error);
//       }
//     };
//     fetchProfilePhoto();
//   }, [empid]);

//   // --- API: Fetch Notifications ---
//   useEffect(() => {
//     const fetchNotifications = async () => {
//       if (!userId || !empid) return;
//       try {
//         const response = await axiosInstance.get(`/notifications/global/${empid}/`);
//         const {
//           birthdays, work_anniversaries, new_joinees,
//           announcements, events, awards,
//           policy_notification, asset_notification
//         } = response.data;

//         let formattedMessages = [];
//         if (birthdays?.length > 0) birthdays.forEach(b => formattedMessages.push(`🎂 Happy Birthday to ${b.full_name}!`));
//         if (work_anniversaries?.length > 0) work_anniversaries.forEach(w => formattedMessages.push(`🎉 Happy ${w.years_completed} year Work Anniversary to ${w.full_name}!`));
//         if (new_joinees?.length > 0) new_joinees.forEach(n => formattedMessages.push(`👋 Welcome to our new joinee, ${n.full_name}!`));
//         if (announcements?.length > 0) announcements.forEach(a => formattedMessages.push(`📢 Announcement: ${a.title}`));
//         if (events?.length > 0) events.forEach(e => formattedMessages.push(`🗓️ Event Today: ${e.event_title}`));
//         if (awards?.length > 0) awards.forEach(a => formattedMessages.push(`🏆 Congratulations to ${a.full_name} on their award!`));
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
//   }, [userId, empid]);

//   // --- API: Fetch Detailed Account Data for Forms ---
//   useEffect(() => {
//     const fetchAccountData = async () => {
//       if (!accountSidebarOpen || accountData) return;
//       setLoadingData(true)
//       try {
//         const response = await axiosInstance.get(`/my_account/${userId}`)
//         setAccountData(response.data)
//         if (response.data.profile_picture?.url) {
//           let fullUrl = response.data.profile_picture.url;
//           if (!fullUrl.startsWith('http')) {
//             fullUrl = `https://tdtlworld.com/hrms-backend${fullUrl}`;
//           }
//           const secureUrl = fullUrl.replace(/^http:\/\//i, 'https://');
//           setProfilePicture(secureUrl);
//         }
//       } catch (error) {
//         console.error("Failed to fetch account data:", error)
//       } finally {
//         setLoadingData(false)
//       }
//     }
//     fetchAccountData()
//   }, [accountSidebarOpen, userId, accountData])

//   const handleSave = async (updatedData) => {
//     try {
//       await axiosInstance.patch(`/my_account/${userId}`, updatedData, {
//         headers: { 'Content-Type': 'application/json' }
//       });
//       setAccountData(null); 
//       setFormDrawerOpen(false); 
//       setAccountMessage({ text: 'Profile updated successfully!', type: 'success' });
//     } catch (error) {
//       console.error("Failed to update data:", error);
//       const errorMessage = error.response?.data?.error || "An error occurred while saving. Please try again.";
//       throw new Error(errorMessage);
//     }
//   }

//   const handlePasswordChange = async () => {
//     setPasswordMessage({ text: '', type: '' });
//     if (newPassword !== confirmNewPassword) {
//       setPasswordMessage({ text: "New passwords do not match!", type: 'error' });
//       return;
//     }
//     if (!currentPassword || newPassword.length < 6) {
//       setPasswordMessage({ text: "Please provide the current password and ensure the new password is at least 6 characters long.", type: 'error' });
//       return;
//     }

//     const passwordData = {
//       current_password: currentPassword,
//       new_password: newPassword,
//       confirm_password: confirmNewPassword,
//     };

//     setIsChangingPassword(true);
//     try {
//       await axiosInstance.patch(`/my_account/${userId}`, passwordData, { headers: { 'Content-Type': 'application/json' } });
//       setPasswordMessage({ text: 'Password changed successfully!', type: 'success' });
//       setCurrentPassword("");
//       setNewPassword("");
//       setConfirmNewPassword("");
//     } catch (error) {
//       const errorMessage = error.response?.data?.error || "An error occurred while changing the password.";
//       setPasswordMessage({ text: errorMessage, type: 'error' });
//     } finally {
//       setIsChangingPassword(false);
//     }
//   };

//   const handleProfilePictureSave = async (file) => {
//     if (!file) return;
//     const formData = new FormData();
//     formData.append('profile_picture', file);

//     try {
//       await axiosInstance.patch(`/my_account/${userId}`, formData, {
//         headers: { 'Content-Type': 'multipart/form-data' }
//       });
//       setAccountData(null); 
//       setFormDrawerOpen(false); 
//       setAccountMessage({ text: 'Picture updated successfully!', type: 'success' });
//     }
//     catch (error)
//     {
//       console.error("Failed to upload profile picture:", error);
//       throw new Error("Failed to upload profile picture.");
//     }
//   }

//   // --- To-Do API Functions ---
//   const fetchTodos = async () => {
//     try {
//       const token = getAuthToken()
//       if (!token) return
//       const response = await fetch(TODO_API_URL, { headers: { Authorization: `Bearer ${token}` } })
//       if (!response.ok) throw new Error("Failed to fetch todos")
//       const data = await response.json()
//       setTodos(data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)))
//     } catch (error) {
//       console.error("Error fetching todos:", error)
//     }
//   }

//   const handleAddOrUpdateTodo = async () => {
//     if (!newTodo.trim()) return
//     const token = getAuthToken()
//     const method = editingTodoId ? "PATCH" : "POST"
//     const url = editingTodoId ? `${TODO_API_URL}${editingTodoId}/` : TODO_API_URL
//     try {
//       await fetch(url, {
//         method,
//         headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
//         body: JSON.stringify({ description: newTodo }),
//       })
//       setNewTodo("")
//       setEditingTodoId(null)
//       fetchTodos()
//     } catch (error) {
//       console.error(`Error saving todo:`, error)
//     }
//   }

//   const handleDeleteTodo = async (id) => {
//     if (!window.confirm("Are you sure?")) return
//     try {
//       const token = getAuthToken()
//       await fetch(`${TODO_API_URL}${id}/`, {
//         method: "DELETE",
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       fetchTodos()
//     } catch (error) {
//       console.error("Error deleting todo:", error)
//     }
//   }

//   // --- Event Handlers ---
//   const handleProfileClick = (event) => setAnchorEl(event.currentTarget)
//   const handleCalendarClick = (event) => setCalendarEl(event.currentTarget)
//   const handleCalendarClose = () => setCalendarEl(null)
//   const handleMenuClose = () => setAnchorEl(null)

//   const handleNotificationsClick = (event) => {
//     setNotificationsEl(event.currentTarget);
//     localStorage.setItem('viewedNotificationCount', notifications.length);
//     setUnreadCount(0);
//   };

//   const handleNotificationsClose = () => setNotificationsEl(null)
//   const handleTodoClick = () => { fetchTodos(); setTodoDialogOpen(true); }
//   const handleTodoClose = () => { setTodoDialogOpen(false); setEditingTodoId(null); setNewTodo(""); }
//   const handleEditTodo = (todo) => { setEditingTodoId(todo.todo_item_id); setNewTodo(todo.description); }
//   const handleAccountClick = () => { setAccountSidebarOpen(true); handleMenuClose(); }

//   const handleLogout = () => {
//     localStorage.clear()
//     setAnchorEl(null)
//     setShowLogoutDialog(true)
//     setTimeout(() => {
//       setShowLogoutDialog(false)
//       window.location.href = "/hrms"
//     }, 3000)
//   }
  
//   const handleAccountSidebarClose = () => {
//     setAccountSidebarOpen(false);
//     setSelectedOption(null);
//     setAccountMessage({ text: '', type: '' });
//   }
  
//   const handleOptionClick = (option) => {
//     setAccountMessage({ text: '', type: '' });
//     setSelectedOption(option);
//     setFormDrawerOpen(true);
//   }

//   const handleFormDrawerClose = () => { setFormDrawerOpen(false); }

//   // Handlers for Change Password form
//   const createPasswordChangeHandler = (setter) => (e) => {
//     setPasswordMessage({ text: '', type: '' });
//     setter(e.target.value);
//   }
//   const handleClickShowNewPassword = () => setShowNewPassword(show => !show);
//   const handleClickShowConfirmPassword = () => setShowConfirmPassword(show => !show);

//   // --- Render Functions ---
//   const renderContent = () => {
//     if (loadingData) {
//       return <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress /></Box>
//     }
//     if (!accountData) {
//       return <Typography sx={{ p: 2 }}>Could not load account data. Please try again.</Typography>
//     }

//     switch (selectedOption) {
//       case "Personal Information":
//         return <PersonalInformationForm data={accountData.personal_info} onSave={handleSave} onBack={handleFormDrawerClose} />
//       case "Profile Picture":
//         return <ProfilePictureForm initialPicture={profilePicture} onSave={handleProfilePictureSave} onBack={handleFormDrawerClose} />
//       case "Change Password":
//         return (
//           <Box sx={{ padding: 3 }}>
//             <Typography variant="h6" gutterBottom>Change Password</Typography>
//             <TextField label="Current Password" fullWidth type="password" value={currentPassword} onChange={createPasswordChangeHandler(setCurrentPassword)} sx={{ mt: 2 }} required />
//             <TextField
//               label="New Password"
//               fullWidth
//               type={showNewPassword ? 'text' : 'password'}
//               value={newPassword}
//               onChange={createPasswordChangeHandler(setNewPassword)}
//               sx={{ mt: 2 }} required
//               InputProps={{
//                 endAdornment: (
//                   <InputAdornment position="end">
//                     <IconButton onClick={handleClickShowNewPassword} edge="end">
//                       {showNewPassword ? <VisibilityOff /> : <Visibility />}
//                     </IconButton>
//                   </InputAdornment>
//                 )
//               }}
//             />
//             <TextField
//               label="Confirm New Password"
//               fullWidth
//               type={showConfirmPassword ? 'text' : 'password'}
//               value={confirmNewPassword}
//               onChange={createPasswordChangeHandler(setConfirmNewPassword)}
//               sx={{ mt: 2 }} required
//               InputProps={{
//                 endAdornment: (
//                   <InputAdornment position="end">
//                     <IconButton onClick={handleClickShowConfirmPassword} edge="end">
//                       {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
//                     </IconButton>
//                   </InputAdornment>
//                 )
//               }}
//             />
//             <Stack direction="row" spacing={2} sx={{ mt: 3, alignItems: 'center' }}>
//                 {passwordMessage.text && (
//                     <Alert severity={passwordMessage.type} sx={{ flexGrow: 1 }} onClose={() => setPasswordMessage({text: '', type: ''})}>
//                         {passwordMessage.text}
//                     </Alert>
//                 )}
//                 <Box sx={{ display: 'flex', gap: 2, ml: 'auto' }}>
//                     <Button variant="outlined" onClick={handleFormDrawerClose}>Back</Button>
//                     <Button variant="contained" color="primary" onClick={handlePasswordChange} disabled={isChangingPassword}>
//                         {isChangingPassword ? <CircularProgress size={24} color="inherit" /> : 'Change Password'}
//                     </Button>
//                 </Box>
//             </Stack>
//           </Box>
//         )
//       default:
//         return <Typography variant="h6" sx={{ p: 2 }}>Select an option to view details</Typography>
//     }
//   }

//   return (
//     <>
//       <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, background: "linear-gradient(135deg,rgba(239, 77, 36, 0.90) 0%,rgb(155, 10, 199)100%)", boxShadow: "0 4px 20px rgba(102, 126, 234, 0.3)", }} >
//         <Toolbar>
//           <IconButton color="inherit" aria-label="toggle drawer" onClick={toggleDrawer} edge="start" sx={{ mr: 2 }}><MenuIcon /></IconButton>
//           <Box><Link to="/hrms/admindashboard/home"><img src={tdtlLogo || "/placeholder.svg"} alt="TDTL Logo" style={{ height: "50px", width: "auto", cursor: "pointer" }} /></Link></Box>
//           <Box sx={{ flexGrow: 1 }} />
//           <IconButton color="inherit" onClick={handleNotificationsClick}>
//             <Badge badgeContent={unreadCount} color="secondary"><NotificationsIcon /></Badge>
//           </IconButton>
//           <Menu anchorEl={notificationsEl} open={Boolean(notificationsEl)} onClose={handleNotificationsClose}>
//             {notifications.length > 0 ? (
//               notifications.map((msg, index) => (<MenuItem key={index} onClick={handleNotificationsClose}>{msg}</MenuItem>))
//             ) : (
//               <MenuItem onClick={handleNotificationsClose}>No new notifications</MenuItem>
//             )}
//           </Menu>
//           <IconButton color="inherit" onClick={handleCalendarClick}><CalendarTodayIcon /></IconButton>
//           <Menu anchorEl={calendarEl} open={Boolean(calendarEl)} onClose={handleCalendarClose}>
//             <LocalizationProvider dateAdapter={AdapterDateFns}><StaticDatePicker displayStaticWrapperAs="desktop" value={new Date()} onChange={() => { }} /></LocalizationProvider>
//           </Menu>
//           <IconButton color="inherit" onClick={handleTodoClick}><AssignmentIcon /></IconButton>
//           <Dialog open={todoDialogOpen} onClose={handleTodoClose} maxWidth="sm" fullWidth>
//             <DialogTitle>Todo List</DialogTitle>
//             <DialogContent>
//               <TextField label={editingTodoId ? "Update Todo" : "New Todo"} value={newTodo} onChange={(e) => setNewTodo(e.target.value)} fullWidth margin="normal" variant="outlined" />
//               <Button variant="contained" color="primary" onClick={handleAddOrUpdateTodo} fullWidth>{editingTodoId ? "Update Todo" : "Add Todo"}</Button>
//               <List sx={{ mt: 2, maxHeight: 300, overflow: "auto" }}>
//                 {todos.map((todo) => (
//                   <ListItem key={todo.todo_item_id} divider secondaryAction={<><IconButton edge="end" onClick={() => handleEditTodo(todo)}><EditIcon /></IconButton><IconButton edge="end" onClick={() => handleDeleteTodo(todo.todo_item_id)} sx={{ ml: 1 }}><DeleteIcon /></IconButton></>}>
//                     <ListItemText primary={todo.description} />
//                   </ListItem>
//                 ))}
//               </List>
//             </DialogContent>
//             <DialogActions><Button onClick={handleTodoClose} color="secondary">Close</Button></DialogActions>
//           </Dialog>
//           <Box
//             onClick={handleProfileClick}
//             sx={{
//               display: "flex", alignItems: "center", justifyContent: "center", ml: 2, mr: 1, cursor: "pointer",
//               p: 1, borderRadius: 2, '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' }
//             }}>
//             <Avatar alt={userName} src={profilePicture} />
//             <Box sx={{ ml: 1.5 }}>
//               <Typography variant="subtitle2" sx={{ lineHeight: 1.2 }}>{userName}</Typography>
//               <Typography variant="caption" sx={{ opacity: 0.8 }}>{userRole} ({userId})</Typography>
//             </Box>
//           </Box>
//           <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
//             <MenuItem onClick={handleAccountClick}>My Account</MenuItem>
//             <MenuItem onClick={handleLogout}>Logout</MenuItem>
//           </Menu>
//           <Dialog open={showLogoutDialog} sx={{ "& .MuiDialog-paper": { minWidth: "300px", borderRadius: "16px", textAlign: "center", padding: "16px" } }}>
//             <DialogContent>
//               <CheckCircle sx={{ fontSize: 80, color: "#4caf50", mb: 2 }} />
//               <Typography variant="h5" sx={{ fontWeight: "bold", color: "#333" }}>Logout Successful!</Typography>
//               <Typography sx={{ color: "#666", mt: 1 }}>Redirecting to login...</Typography>
//             </DialogContent>
//           </Dialog>
//         </Toolbar>
//       </AppBar>
//       <Drawer
//         anchor="right"
//         open={accountSidebarOpen}
//         onClose={handleAccountSidebarClose}
//         sx={{ "& .MuiDrawer-paper": { width: 300, top: 64 } }}
//       >
//         <Box>
//             <Box sx={{
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'space-between',
//                 p: '12px 8px 12px 16px',
//             }}>
//                 <Typography variant="h6" sx={{ flexGrow: 1, textAlign: 'center', ml: '40px' }}>
//                     My Account
//                 </Typography>
//                 <IconButton onClick={handleAccountSidebarClose}>
//                     <CloseIcon />
//                 </IconButton>
//             </Box>
//             <Divider />
//             <Box sx={{ p: 2, flex: 1 }}>
//                 <UserCard data={accountData?.my_account} profilePicture={profilePicture} loading={loadingData} />
                
//                 {accountMessage.text && (
//                   <Alert
//                     severity={accountMessage.type}
//                     sx={{ mt: 2 }}
//                     onClose={() => setAccountMessage({ text: '', type: '' })}
//                   >
//                     {accountMessage.text}
//                   </Alert>
//                 )}
//             </Box>

//             <Divider />
//             <List sx={{ p: 0 }}>
//                 {["Personal Information", "Profile Picture", "Change Password"].map((text) => (
//                     <ListItem button key={text} onClick={() => handleOptionClick(text)}>
//                         <ListItemText primary={text} />
//                     </ListItem>
//                 ))}
//             </List>
//         </Box>
//       </Drawer>
//       <Drawer anchor="right" open={formDrawerOpen} onClose={handleFormDrawerClose} sx={{ "& .MuiDrawer-paper": { width: 600, padding: 2, top: 64 } }}>
//         {renderContent()}
//       </Drawer>
//     </>
//   )
// }

// const UserCard = ({ data, profilePicture, loading }) => {
//   if (loading) { return <Box display="flex" justifyContent="center"><CircularProgress /></Box>; }
//   if (!data) return null;
//   return (
//     <Card sx={{ width: "100%", maxWidth: 360, borderRadius: 3, boxShadow: 3, mx: "auto" }}>
//       <CardContent>
//         <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
//           <Avatar src={profilePicture} sx={{ width: 56, height: 56 }} />
//           <Box flexGrow={1} minWidth={0}><Typography variant="h6" noWrap>{data.full_name}</Typography><Typography variant="body2" color="text.secondary" noWrap>@{data.email.split('@')[0]}</Typography></Box>
//         </Stack>
//         <Stack direction="row" alignItems="center" spacing={1} mt={2} wrap="wrap"><MailOutlineIcon fontSize="small" /><Typography variant="body2" sx={{ wordBreak: "break-all" }}>{data.email}</Typography></Stack>
//         <Stack direction="row" alignItems="center" spacing={1} mt={1}><PhoneIcon fontSize="small" /><Typography variant="body2">{data.contact_number}</Typography></Stack>
//       </CardContent>
//     </Card>
//   );
// };

// // ======================= START: MODIFIED COMPONENT =======================
// const PersonalInformationForm = ({ data, onSave, onBack }) => {
//   const [formData, setFormData] = useState({
//     first_name: '', last_name: '', username: '', contact_number: '', email: '',
//     gender: '', address: '', address_line_2: '', state: '', city: '', zip_code: '',
//     ...data
//   });
//   const [states, setStates] = useState([]);
//   const [message, setMessage] = useState({ text: '', type: '' });
//   const [isSaving, setIsSaving] = useState(false);

//   useEffect(() => {
//     const processAndSetData = () => {
//         const processedData = { ...data };
//         if (processedData.gender) {
//             const genderStr = String(processedData.gender).toLowerCase();
//             if (genderStr === 'male') processedData.gender = '1';
//             else if (genderStr === 'female') processedData.gender = '2';
//             else if (genderStr === 'other') processedData.gender = '3';
//         }
//         setFormData(prevData => ({ ...prevData, ...processedData }));
//     };
//     if (data) processAndSetData();

//     const fetchStates = async () => {
//       try {
//         const response = await axiosInstance.get('/api/states/?country_name=India');
//         if (response.data && response.data.status === 'success') {
//           setStates(response.data.data);
//         }
//       } catch (error) {
//         console.error("Failed to fetch states:", error);
//       }
//     };
//     fetchStates();
//   }, [data]);

//   const handleChange = (e) => {
//     setMessage({ text: '', type: '' });
//     setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
//   }

//   const handleSubmit = async () => {
//     setMessage({ text: '', type: '' });
//     setIsSaving(true);
//     try {
//         await onSave(formData);
//     } catch (error) {
//         setMessage({ text: error.message, type: 'error' });
//     } finally {
//         setIsSaving(false);
//     }
//   };

//   return (
//     <Box sx={{ padding: 3 }}>
//       <Typography variant="h6" gutterBottom>Personal Information</Typography>
//       <Grid container spacing={2}>
//         <Grid item xs={12} sm={6}><TextField name="first_name" label="First Name" value={formData.first_name || ''} onChange={handleChange} fullWidth /></Grid>
//         <Grid item xs={12} sm={6}><TextField name="last_name" label="Last Name" value={formData.last_name || ''} onChange={handleChange} fullWidth /></Grid>
        
//         {/* --- MODIFICATION HERE --- */}
//         <Grid item xs={12} sm={6}>
//           <TextField 
//             name="username" 
//             label="User Name" // This field acts as the Employee ID
//             value={formData.username || ''} 
//             fullWidth 
//             // Use InputProps to make the field read-only without changing its visual style
//             InputProps={{
//               readOnly: true,
//             }}
//           />
//         </Grid>

//         <Grid item xs={12} sm={6}><TextField name="contact_number" label="Contact Number" value={formData.contact_number || ''} onChange={handleChange} fullWidth /></Grid>
//         <Grid item xs={12} sm={6}><TextField name="email" label="Email" value={formData.email || ''} onChange={handleChange} fullWidth /></Grid>
//         <Grid item xs={12} sm={6}><FormControl fullWidth><InputLabel>Gender</InputLabel><Select name="gender" value={formData.gender || ''} onChange={handleChange} label="Gender"><MenuItem value="1">Male</MenuItem><MenuItem value="2">Female</MenuItem><MenuItem value="3">Other</MenuItem></Select></FormControl></Grid>
//         <Grid item xs={12}><TextField name="address" label="Address" value={formData.address || ''} onChange={handleChange} fullWidth /></Grid>
//         <Grid item xs={12}><TextField name="address_line_2" label="Address Line 2" value={formData.address_line_2 || ''} onChange={handleChange} fullWidth /></Grid>
//         <Grid item xs={12} sm={4}>
//           <FormControl fullWidth>
//             <InputLabel>State</InputLabel>
//             <Select name="state" value={formData.state || ''} label="State" onChange={handleChange}>
//               {states.map((state) => (<MenuItem key={state.state_id} value={state.state_id}>{state.state_name}</MenuItem>))}
//             </Select>
//           </FormControl>
//         </Grid>
//         <Grid item xs={12} sm={4}><TextField name="city" label="City" value={formData.city || ''} onChange={handleChange} fullWidth /></Grid>
//         <Grid item xs={12} sm={4}><TextField name="zip_code" label="Zip Code" value={formData.zip_code || ''} onChange={handleChange} fullWidth /></Grid>
//       </Grid>
//       <Stack direction="row" spacing={2} sx={{ mt: 3, alignItems: 'center' }}>
//         {message.text && (
//             <Alert severity={message.type} sx={{ flexGrow: 1 }} onClose={() => setMessage({text: '', type: ''})}>
//                 {message.text}
//             </Alert>
//         )}
//         <Box sx={{ display: 'flex', gap: 2, ml: 'auto' }}>
//             <Button variant="outlined" onClick={onBack}>Back</Button>
//             <Button variant="contained" color="primary" onClick={handleSubmit} disabled={isSaving}>
//               {isSaving ? <CircularProgress size={24} /> : 'Update Profile'}
//             </Button>
//         </Box>
//       </Stack>
//     </Box>
//   );
// };
// // ======================== END: MODIFIED COMPONENT ========================


// // --- FIX APPLIED TO THIS COMPONENT ---
// const ProfilePictureForm = ({ initialPicture, onSave, onBack }) => {
//   const [picturePreview, setPicturePreview] = useState(initialPicture);
//   const [pictureFile, setPictureFile] = useState(null);
//   const [message, setMessage] = useState({ text: '', type: '' });
//   const [isSaving, setIsSaving] = useState(false);

//   // This useEffect hook syncs the internal state with the prop from the parent.
//   // This is crucial for displaying the initially fetched image.
//   useEffect(() => {
//     setPicturePreview(initialPicture);
//   }, [initialPicture]);


//   const handleFileChange = (event) => {
//     setMessage({ text: '', type: '' });
//     const file = event.target.files[0];
//     if (file) { setPictureFile(file); setPicturePreview(URL.createObjectURL(file)); }
//   };

//   const handleSaveClick = async () => {
//     if (!pictureFile) {
//         setMessage({ text: 'Please choose a file first.', type: 'error' });
//         return;
//     }
//     setMessage({ text: '', type: '' });
//     setIsSaving(true);
//     try {
//         await onSave(pictureFile);
//         // On success, the parent component handles everything.
//     } catch (error) {
//         setMessage({ text: error.message, type: 'error' });
//     } finally {
//         setIsSaving(false);
//     }
//   };

//   return (
//     <Box sx={{ padding: 3 }}>
//       <Typography variant="h6" gutterBottom>Update Profile Picture</Typography>
//       <Paper sx={{ padding: 2, textAlign: "center" }}>
//         <Avatar src={picturePreview} sx={{ width: 120, height: 120, margin: "0 auto 16px" }} />
//         <Button variant="outlined" component="label">Choose File<input type="file" accept="image/*" hidden onChange={handleFileChange} /></Button>
//         {pictureFile && <Typography variant="caption" display="block" mt={1}>{pictureFile.name}</Typography>}
//         <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ mt: 2, alignItems: 'center' }}>
//             {message.text && (
//                 <Alert severity={message.type} sx={{ flexGrow: 1, mr: 2 }} onClose={() => setMessage({text: '', type: ''})}>
//                     {message.text}
//                 </Alert>
//             )}
//             <Box sx={{ display: 'flex', gap: 2 }}>
//                 <Button variant="outlined" onClick={onBack}>Back</Button>
//                 <Button variant="contained" color="primary" onClick={handleSaveClick} disabled={isSaving}>
//                   {isSaving ? <CircularProgress size={24} /> : 'Save Picture'}
//                 </Button>
//             </Box>
//         </Stack>
//       </Paper>
//     </Box>
//   );
// };












// import { useState, useEffect } from "react";
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
//   Grid,
//   DialogActions,
//   Divider,
//   Card,
//   CardContent,
//   Stack,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   CircularProgress,
//   Badge,
//   Alert,
//   InputAdornment,
//   useMediaQuery, // Import useMediaQuery
//   useTheme, // Import useTheme
// } from "@mui/material";
// import MenuIcon from "@mui/icons-material/Menu";
// import NotificationsIcon from "@mui/icons-material/Notifications";
// import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
// import AssignmentIcon from "@mui/icons-material/Assignment";
// import { useNavigate } from "react-router-dom";
// import { Visibility, VisibilityOff, Delete } from "@mui/icons-material";
// import { LocalizationProvider, StaticDatePicker } from "@mui/x-date-pickers";
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
// import DeleteIcon from "@mui/icons-material/Delete";
// import EditIcon from "@mui/icons-material/Edit";
// import { CheckCircle } from "@mui/icons-material";
// import tdtlLogo from "./vetrinalogo.png";
// import { Link } from "react-router-dom";
// import adminlogo from "./admin-logo.png";
// import {
//   MailOutline as MailOutlineIcon,
//   Phone as PhoneIcon,
// } from "@mui/icons-material";
// import axiosInstance from "../utils/axiosInstance";
// import CloseIcon from "@mui/icons-material/Close";

// // --- API Configuration ---
// const TODO_API_URL = "https://tdtlworld.com/hrms-backend/api/todos/";
// const getAuthToken = () => localStorage.getItem("accessToken");

// export default function TopBar({ open, toggleDrawer }) {
//   const [anchorEl, setAnchorEl] = useState(null);

//   // States for "My Account"
//   const [accountSidebarOpen, setAccountSidebarOpen] = useState(false);
//   const [selectedOption, setSelectedOption] = useState(null);
//   const [formDrawerOpen, setFormDrawerOpen] = useState(false);
//   const [accountData, setAccountData] = useState(null);
//   const [loadingData, setLoadingData] = useState(false);
//   const [isChangingPassword, setIsChangingPassword] = useState(false); // Used for password change save state

//   const [accountMessage, setAccountMessage] = useState({ text: "", type: "" });

//   // States updated by API
//   const [profilePicture, setProfilePicture] = useState(adminlogo);
//   const [userName, setUserName] = useState("User");
//   const [userRole, setUserRole] = useState("Role");

//   // States for "Change Password" form
//   const [currentPassword, setCurrentPassword] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmNewPassword, setConfirmNewPassword] = useState("");
//   const [showNewPassword, setShowNewPassword] = useState(false);
//   const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false); // Corrected state name
//   const [passwordMessage, setPasswordMessage] = useState({
//     text: "",
//     type: "",
//   });

//   const navigate = useNavigate();

//   // States for other TopBar features
//   const [notifications, setNotifications] = useState([]);
//   const [unreadCount, setUnreadCount] = useState(0);
//   const [notificationsEl, setNotificationsEl] = useState(null);
//   const [calendarEl, setCalendarEl] = useState(null);
//   const [todoDialogOpen, setTodoDialogOpen] = useState(false);
//   const [todos, setTodos] = useState([]);
//   const [newTodo, setNewTodo] = useState("");
//   const [editingTodoId, setEditingTodoId] = useState(null);
//   const [showLogoutDialog, setShowLogoutDialog] = useState(false);

//   const userId = localStorage.getItem("loggedInUser");
//   const employeeId = localStorage.getItem("loggedInEmpId");
//   const empid = localStorage.getItem("EmID");

//   // --- Responsive Hooks ---
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // True if screen is 'sm' or smaller

//   // --- API: Fetch User Name and Role ---
//   useEffect(() => {
//     const fetchUserData = async () => {
//       if (!employeeId) return;
//       try {
//         const response = await axiosInstance.get("/api/dropdown/employee-role/");
//         if (response.data && Array.isArray(response.data)) {
//           const currentUser = response.data.find(
//             (emp) => emp.id === Number(employeeId)
//           );
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

//   // --- API to fetch profile photo on initial load ---
//   useEffect(() => {
//     const fetchProfilePhoto = async () => {
//       if (!empid) return;
//       try {
//         const response = await axiosInstance.get(
//           `/api/get_profile_photo/${empid}/`
//         );
//         if (response.data && response.data.status === "success" && response.data.data) {
//           const secureUrl = response.data.data.replace(/^http:\/\//i, "https://");
//           setProfilePicture(secureUrl);
//         }
//       } catch (error) {
//         console.error("Failed to fetch profile photo:", error);
//       }
//     };
//     fetchProfilePhoto();
//   }, [empid]);

//   // --- API: Fetch Notifications ---
//   useEffect(() => {
//     const fetchNotifications = async () => {
//       if (!userId || !empid) return;
//       try {
//         const response = await axiosInstance.get(`/notifications/global/${empid}/`);
//         const {
//           birthdays,
//           work_anniversaries,
//           new_joinees,
//           announcements,
//           events,
//           awards,
//           policy_notification,
//           asset_notification,
//         } = response.data;

//         let formattedMessages = [];
//         if (birthdays?.length > 0)
//           birthdays.forEach((b) =>
//             formattedMessages.push(`🎂 Happy Birthday to ${b.full_name}!`)
//           );
//         if (work_anniversaries?.length > 0)
//           work_anniversaries.forEach((w) =>
//             formattedMessages.push(
//               `🎉 Happy ${w.years_completed} year Work Anniversary to ${w.full_name}!`
//             )
//           );
//         if (new_joinees?.length > 0)
//           new_joinees.forEach((n) =>
//             formattedMessages.push(`👋 Welcome to our new joinee, ${n.full_name}!`)
//           );
//         if (announcements?.length > 0)
//           announcements.forEach((a) =>
//             formattedMessages.push(`📢 Announcement: ${a.title}`)
//           );
//         if (events?.length > 0)
//           events.forEach((e) =>
//             formattedMessages.push(`🗓️ Event Today: ${e.event_title}`)
//           );
//         if (awards?.length > 0)
//           awards.forEach((a) =>
//             formattedMessages.push(`🏆 Congratulations to ${a.full_name} on their award!`)
//           );
//         if (policy_notification)
//           formattedMessages.push(`📜 Policy Update: ${policy_notification}`);
//         if (asset_notification)
//           formattedMessages.push(`💻 Asset Update: ${asset_notification}`);

//         setNotifications(formattedMessages);

//         const lastViewedCount = parseInt(
//           localStorage.getItem("viewedNotificationCount") || "0",
//           10
//         );
//         const newUnreadCount = formattedMessages.length - lastViewedCount;
//         setUnreadCount(newUnreadCount > 0 ? newUnreadCount : 0);
//       } catch (error) {
//         console.error("Failed to fetch notifications:", error);
//       }
//     };
//     fetchNotifications();
//   }, [userId, empid]);

//   // --- API: Fetch Detailed Account Data for Forms ---
//   useEffect(() => {
//     const fetchAccountData = async () => {
//       if (!accountSidebarOpen || accountData) return;
//       setLoadingData(true);
//       try {
//         const response = await axiosInstance.get(`/my_account/${userId}`);
//         setAccountData(response.data);
//         if (response.data.profile_picture?.url) {
//           let fullUrl = response.data.profile_picture.url;
//           if (!fullUrl.startsWith("http")) {
//             fullUrl = `https://tdtlworld.com/hrms-backend${fullUrl}`;
//           }
//           const secureUrl = fullUrl.replace(/^http:\/\//i, "https://");
//           setProfilePicture(secureUrl);
//         }
//       } catch (error) {
//         console.error("Failed to fetch account data:", error);
//       } finally {
//         setLoadingData(false);
//       }
//     };
//     fetchAccountData();
//   }, [accountSidebarOpen, userId, accountData]);

//   const handleSave = async (updatedData) => {
//     try {
//       await axiosInstance.patch(`/my_account/${userId}`, updatedData, {
//         headers: { "Content-Type": "application/json" },
//       });
//       setAccountData(null);
//       setFormDrawerOpen(false);
//       setAccountMessage({ text: "Profile updated successfully!", type: "success" });
//     } catch (error) {
//       console.error("Failed to update data:", error);
//       const errorMessage =
//         error.response?.data?.error ||
//         "An error occurred while saving. Please try again.";
//       throw new Error(errorMessage);
//     }
//   };

//   const handlePasswordChange = async () => {
//     setPasswordMessage({ text: "", type: "" });
//     if (newPassword !== confirmNewPassword) {
//       setPasswordMessage({ text: "New passwords do not match!", type: "error" });
//       return;
//     }
//     if (!currentPassword || newPassword.length < 6) {
//       setPasswordMessage({
//         text: "Please provide the current password and ensure the new password is at least 6 characters long.",
//         type: "error",
//       });
//       return;
//     }

//     const passwordData = {
//       current_password: currentPassword,
//       new_password: newPassword,
//       confirm_password: confirmNewPassword,
//     };

//     setIsChangingPassword(true); // Start saving state for password change
//     try {
//       await axiosInstance.patch(`/my_account/${userId}`, passwordData, {
//         headers: { "Content-Type": "application/json" },
//       });
//       setPasswordMessage({ text: "Password changed successfully!", type: "success" });
//       setCurrentPassword("");
//       setNewPassword("");
//       setConfirmNewPassword("");
//     } catch (error) {
//       const errorMessage =
//         error.response?.data?.error || "An error occurred while changing the password.";
//       setPasswordMessage({ text: errorMessage, type: "error" });
//     } finally {
//       setIsChangingPassword(false); // End saving state for password change
//     }
//   };

//   const handleProfilePictureSave = async (file) => {
//     if (!file) return;
//     const formData = new FormData();
//     formData.append("profile_picture", file);

//     try {
//       await axiosInstance.patch(`/my_account/${userId}`, formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       setAccountData(null);
//       setFormDrawerOpen(false);
//       setAccountMessage({ text: "Picture updated successfully!", type: "success" });
//     } catch (error) {
//       console.error("Failed to upload profile picture:", error);
//       throw new Error("Failed to upload profile picture.");
//     }
//   };

//   // --- To-Do API Functions ---
//   const fetchTodos = async () => {
//     try {
//       const token = getAuthToken();
//       if (!token) return;
//       const response = await fetch(TODO_API_URL, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       if (!response.ok) throw new Error("Failed to fetch todos");
//       const data = await response.json();
//       setTodos(data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)));
//     } catch (error) {
//       console.error("Error fetching todos:", error);
//     }
//   };

//   const handleAddOrUpdateTodo = async () => {
//     if (!newTodo.trim()) return;
//     const token = getAuthToken();
//     const method = editingTodoId ? "PATCH" : "POST";
//     const url = editingTodoId ? `${TODO_API_URL}${editingTodoId}/` : TODO_API_URL;
//     try {
//       await fetch(url, {
//         method,
//         headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
//         body: JSON.stringify({ description: newTodo }),
//       });
//       setNewTodo("");
//       setEditingTodoId(null);
//       fetchTodos();
//     } catch (error) {
//       console.error(`Error saving todo:`, error);
//     }
//   };

//   const handleDeleteTodo = async (id) => {
//     if (!window.confirm("Are you sure?")) return;
//     try {
//       const token = getAuthToken();
//       await fetch(`${TODO_API_URL}${id}/`, {
//         method: "DELETE",
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       fetchTodos();
//     } catch (error) {
//       console.error("Error deleting todo:", error);
//     }
//   };

//   // --- Event Handlers ---
//   const handleProfileClick = (event) => setAnchorEl(event.currentTarget);
//   const handleCalendarClick = (event) => setCalendarEl(event.currentTarget);
//   const handleCalendarClose = () => setCalendarEl(null);
//   const handleMenuClose = () => setAnchorEl(null);

//   const handleNotificationsClick = (event) => {
//     setNotificationsEl(event.currentTarget);
//     localStorage.setItem("viewedNotificationCount", notifications.length);
//     setUnreadCount(0);
//   };

//   const handleNotificationsClose = () => setNotificationsEl(null);
//   const handleTodoClick = () => {
//     fetchTodos();
//     setTodoDialogOpen(true);
//   };
//   const handleTodoClose = () => {
//     setTodoDialogOpen(false);
//     setEditingTodoId(null);
//     setNewTodo("");
//   };
//   const handleEditTodo = (todo) => {
//     setEditingTodoId(todo.todo_item_id);
//     setNewTodo(todo.description);
//   };
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
//     setAccountMessage({ text: "", type: "" });
//   };

//   const handleOptionClick = (option) => {
//     setAccountMessage({ text: "", type: "" });
//     setSelectedOption(option);
//     setFormDrawerOpen(true);
//   };

//   const handleFormDrawerClose = () => {
//     setFormDrawerOpen(false);
//   };

//   // Handlers for Change Password form
//   const createPasswordChangeHandler = (setter) => (e) => {
//     setPasswordMessage({ text: "", type: "" });
//     setter(e.target.value);
//   };
//   const handleClickShowNewPassword = () => setShowNewPassword((show) => !show);
//   const handleClickShowConfirmPassword = () =>
//     setShowConfirmNewPassword((show) => !show); // Corrected function name

//   // --- Render Functions ---
//   const renderContent = () => {
//     if (loadingData) {
//       return (
//         <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
//           <CircularProgress />
//         </Box>
//       );
//     }
//     if (!accountData) {
//       return (
//         <Typography sx={{ p: 2 }}>
//           Could not load account data. Please try again.
//         </Typography>
//       );
//     }

//     switch (selectedOption) {
//       case "Personal Information":
//         return (
//           <PersonalInformationForm
//             data={accountData.personal_info}
//             onSave={handleSave}
//             onBack={handleFormDrawerClose}
//           />
//         );
//       case "Profile Picture":
//         return (
//           <ProfilePictureForm
//             initialPicture={profilePicture}
//             onSave={handleProfilePictureSave}
//             onBack={handleFormDrawerClose}
//           />
//         );
//       case "Change Password":
//         return (
//           <Box sx={{ padding: 3 }}>
//             <Typography variant="h6" gutterBottom>
//               Change Password
//             </Typography>
//             <TextField
//               label="Current Password"
//               fullWidth
//               type="password"
//               value={currentPassword}
//               onChange={createPasswordChangeHandler(setCurrentPassword)}
//               sx={{ mt: 2 }}
//               required
//             />
//             <TextField
//               label="New Password"
//               fullWidth
//               type={showNewPassword ? "text" : "password"}
//               value={newPassword}
//               onChange={createPasswordChangeHandler(setNewPassword)}
//               sx={{ mt: 2 }}
//               required
//               InputProps={{
//                 endAdornment: (
//                   <InputAdornment position="end">
//                     <IconButton onClick={handleClickShowNewPassword} edge="end">
//                       {showNewPassword ? <VisibilityOff /> : <Visibility />}
//                     </IconButton>
//                   </InputAdornment>
//                 ),
//               }}
//             />
//             <TextField
//               label="Confirm New Password"
//               fullWidth
//               type={showConfirmNewPassword ? "text" : "password"} // Corrected state name
//               value={confirmNewPassword}
//               onChange={createPasswordChangeHandler(setConfirmNewPassword)}
//               sx={{ mt: 2 }}
//               required
//               InputProps={{
//                 endAdornment: (
//                   <InputAdornment position="end">
//                     <IconButton onClick={handleClickShowConfirmPassword} edge="end">
//                       {showConfirmNewPassword ? <VisibilityOff /> : <Visibility />} {/* Corrected state name */}
//                     </IconButton>
//                   </InputAdornment>
//                 ),
//               }}
//             />
//             <Stack
//               direction="row"
//               spacing={2}
//               sx={{ mt: 3, alignItems: "center" }}
//             >
//               {passwordMessage.text && (
//                 <Alert
//                   severity={passwordMessage.type}
//                   sx={{ flexGrow: 1 }}
//                   onClose={() => setPasswordMessage({ text: "", type: "" })}
//                 >
//                   {passwordMessage.text}
//                 </Alert>
//               )}
//               <Box sx={{ display: "flex", gap: 2, ml: "auto" }}>
//                 <Button variant="outlined" onClick={handleFormDrawerClose}>
//                   Back
//                 </Button>
//                 <Button
//                   variant="contained"
//                   color="primary"
//                   onClick={handlePasswordChange}
//                   disabled={isChangingPassword}
//                 >
//                   {isChangingPassword ? ( // Corrected variable name
//                     <CircularProgress size={24} color="inherit" />
//                   ) : (
//                     "Change Password"
//                   )}
//                 </Button>
//               </Box>
//             </Stack>
//           </Box>
//         );
//       default:
//         return (
//           <Typography variant="h6" sx={{ p: 2 }}>
//             Select an option to view details
//           </Typography>
//         );
//     }
//   };

//   return (
//     <>
//       <AppBar
//         position="fixed"
//         sx={{
//           zIndex: (theme) => theme.zIndex.drawer + 1,
//           background:
//             "linear-gradient(135deg,rgba(239, 77, 36, 0.90) 0%,rgb(155, 10, 199)100%)",
//           boxShadow: "0 4px 20px rgba(102, 126, 234, 0.3)",
//         }}
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
//           <Box>
//             <Link to="/hrms/admindashboard/home">
//               <img
//                 src={tdtlLogo || "/placeholder.svg"}
//                 alt="TDTL Logo"
//                 style={{
//                   height: isMobile ? "35px" : "50px", // Adjust logo size based on screen
//                   width: "auto",
//                   cursor: "pointer",
//                 }}
//               />
//             </Link>
//           </Box>
//           <Box sx={{ flexGrow: 1 }} />

//           {/* Notifications Icon (visible only on desktop) */}
//           {!isMobile && (
//             <IconButton color="inherit" onClick={handleNotificationsClick}>
//               <Badge badgeContent={unreadCount} color="secondary">
//                 <NotificationsIcon />
//               </Badge>
//             </IconButton>
//           )}
//           <Menu
//             anchorEl={notificationsEl}
//             open={Boolean(notificationsEl)}
//             onClose={handleNotificationsClose}
//           >
//             {notifications.length > 0 ? (
//               notifications.map((msg, index) => (
//                 <MenuItem key={index} onClick={handleNotificationsClose}>
//                   {msg}
//                 </MenuItem>
//               ))
//             ) : (
//               <MenuItem onClick={handleNotificationsClose}>
//                 No new notifications
//               </MenuItem>
//             )}
//           </Menu>

//           {/* Calendar Icon (visible only on desktop) */}
//           {!isMobile && (
//             <IconButton color="inherit" onClick={handleCalendarClick}>
//               <CalendarTodayIcon />
//             </IconButton>
//           )}
//           <Menu
//             anchorEl={calendarEl}
//             open={Boolean(calendarEl)}
//             onClose={handleCalendarClose}
//           >
//             <LocalizationProvider dateAdapter={AdapterDateFns}>
//               <StaticDatePicker
//                 displayStaticWrapperAs="desktop"
//                 value={new Date()}
//                 onChange={() => {}}
//               />
//             </LocalizationProvider>
//           </Menu>

//           {/* Todo List Icon (visible only on desktop) */}
//           {!isMobile && (
//             <IconButton color="inherit" onClick={handleTodoClick}>
//               <AssignmentIcon />
//             </IconButton>
//           )}
//           <Dialog open={todoDialogOpen} onClose={handleTodoClose} maxWidth="sm" fullWidth>
//             <DialogTitle>Todo List</DialogTitle>
//             <DialogContent>
//               <TextField
//                 label={editingTodoId ? "Update Todo" : "New Todo"}
//                 value={newTodo}
//                 onChange={(e) => setNewTodo(e.target.value)}
//                 fullWidth
//                 margin="normal"
//                 variant="outlined"
//               />
//               <Button
//                 variant="contained"
//                 color="primary"
//                 onClick={handleAddOrUpdateTodo}
//                 fullWidth
//               >
//                 {editingTodoId ? "Update Todo" : "Add Todo"}
//               </Button>
//               <List sx={{ mt: 2, maxHeight: 300, overflow: "auto" }}>
//                 {todos.map((todo) => (
//                   <ListItem
//                     key={todo.todo_item_id}
//                     divider
//                     secondaryAction={
//                       <>
//                         <IconButton edge="end" onClick={() => handleEditTodo(todo)}>
//                           <EditIcon />
//                         </IconButton>
//                         <IconButton
//                           edge="end"
//                           onClick={() => handleDeleteTodo(todo.todo_item_id)}
//                           sx={{ ml: 1 }}
//                         >
//                           <DeleteIcon />
//                         </IconButton>
//                       </>
//                     }
//                   >
//                     <ListItemText primary={todo.description} />
//                   </ListItem>
//                 ))}
//               </List>
//             </DialogContent>
//             <DialogActions>
//               <Button onClick={handleTodoClose} color="secondary">
//                 Close
//               </Button>
//             </DialogActions>
//           </Dialog>

//           <Box
//             onClick={handleProfileClick}
//             sx={{
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               ml: 2,
//               mr: 1,
//               cursor: "pointer",
//               p: 1,
//               borderRadius: 2,
//               "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.1)" },
//             }}
//           >
//             <Avatar alt={userName} src={profilePicture} />
//             {!isMobile && ( // Hide name and role on mobile
//               <Box sx={{ ml: 1.5 }}>
//                 <Typography variant="subtitle2" sx={{ lineHeight: 1.2 }}>
//                   {userName}
//                 </Typography>
//                 <Typography variant="caption" sx={{ opacity: 0.8 }}>
//                   {userRole} ({userId})
//                 </Typography>
//               </Box>
//             )}
//           </Box>
//           <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
//             {/* Notifications, Calendar, Todo in profile menu on mobile */}
//             {isMobile && (
//               <MenuItem onClick={handleNotificationsClick}>
//                 <Badge badgeContent={unreadCount} color="secondary" sx={{ mr: 1 }}>
//                   <NotificationsIcon />
//                 </Badge>
//                 Notifications
//               </MenuItem>
//             )}
//             {isMobile && <MenuItem onClick={handleCalendarClick}>
//                 <CalendarTodayIcon sx={{ mr: 1 }} /> Calendar
//             </MenuItem>}
//             {isMobile && <MenuItem onClick={handleTodoClick}>
//                 <AssignmentIcon sx={{ mr: 1 }} /> To-Do List
//             </MenuItem>}
//             <MenuItem onClick={handleAccountClick}>My Account</MenuItem>
//             <MenuItem onClick={handleLogout}>Logout</MenuItem>
//           </Menu>
//           <Dialog
//             open={showLogoutDialog}
//             sx={{
//               "& .MuiDialog-paper": {
//                 minWidth: "300px",
//                 borderRadius: "16px",
//                 textAlign: "center",
//                 padding: "16px",
//               },
//             }}
//           >
//             <DialogContent>
//               <CheckCircle sx={{ fontSize: 80, color: "#4caf50", mb: 2 }} />
//               <Typography variant="h5" sx={{ fontWeight: "bold", color: "#333" }}>
//                 Logout Successful!
//               </Typography>
//               <Typography sx={{ color: "#666", mt: 1 }}>
//                 Redirecting to login...
//               </Typography>
//             </DialogContent>
//           </Dialog>
//         </Toolbar>
//       </AppBar>
//       <Drawer
//         anchor="right"
//         open={accountSidebarOpen}
//         onClose={handleAccountSidebarClose}
//         sx={{ "& .MuiDrawer-paper": { width: 300, top: 64 } }}
//       >
//         <Box>
//           <Box
//             sx={{
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "space-between",
//               p: "12px 8px 12px 16px",
//             }}
//           >
//             <Typography variant="h6" sx={{ flexGrow: 1, textAlign: "center", ml: "40px" }}>
//               My Account
//             </Typography>
//             <IconButton onClick={handleAccountSidebarClose}>
//               <CloseIcon />
//             </IconButton>
//           </Box>
//           <Divider />
//           <Box sx={{ p: 2, flex: 1 }}>
//             <UserCard
//               data={accountData?.my_account}
//               profilePicture={profilePicture}
//               loading={loadingData}
//             />

//             {accountMessage.text && (
//               <Alert
//                 severity={accountMessage.type}
//                 sx={{ mt: 2 }}
//                 onClose={() => setAccountMessage({ text: "", type: "" })}
//               >
//                 {accountMessage.text}
//               </Alert>
//             )}
//           </Box>

//           <Divider />
//           <List sx={{ p: 0 }}>
//             {["Personal Information", "Profile Picture", "Change Password"].map(
//               (text) => (
//                 <ListItem button key={text} onClick={() => handleOptionClick(text)}>
//                   <ListItemText primary={text} />
//                 </ListItem>
//               )
//             )}
//           </List>
//         </Box>
//       </Drawer>
//       <Drawer
//         anchor="right"
//         open={formDrawerOpen}
//         onClose={handleFormDrawerClose}
//         sx={{ "& .MuiDrawer-paper": { width: 600, padding: 2, top: 64 } }}
//       >
//         {renderContent()}
//       </Drawer>
//     </>
//   );
// }

// const UserCard = ({ data, profilePicture, loading }) => {
//   if (loading) {
//     return (
//       <Box display="flex" justifyContent="center">
//         <CircularProgress />
//       </Box>
//     );
//   }
//   if (!data) return null;
//   return (
//     <Card sx={{ width: "100%", maxWidth: 360, borderRadius: 3, boxShadow: 3, mx: "auto" }}>
//       <CardContent>
//         <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
//           <Avatar src={profilePicture} sx={{ width: 56, height: 56 }} />
//           <Box flexGrow={1} minWidth={0}>
//             <Typography variant="h6" noWrap>
//               {data.full_name}
//             </Typography>
//             <Typography variant="body2" color="text.secondary" noWrap>
//               @{data.email.split("@")[0]}
//             </Typography>
//           </Box>
//         </Stack>
//         <Stack
//           direction="row"
//           alignItems="center"
//           spacing={1}
//           mt={2}
//           wrap="wrap"
//         >
//           <MailOutlineIcon fontSize="small" />
//           <Typography variant="body2" sx={{ wordBreak: "break-all" }}>
//             {data.email}
//           </Typography>
//         </Stack>
//         <Stack direction="row" alignItems="center" spacing={1} mt={1}>
//           <PhoneIcon fontSize="small" />
//           <Typography variant="body2">{data.contact_number}</Typography>
//         </Stack>
//       </CardContent>
//     </Card>
//   );
// };

// // ======================= START: MODIFIED COMPONENT =======================
// const PersonalInformationForm = ({ data, onSave, onBack }) => {
//   const [formData, setFormData] = useState({
//     first_name: "",
//     last_name: "",
//     username: "",
//     contact_number: "",
//     email: "",
//     gender: "",
//     address: "",
//     address_line_2: "",
//     state: "",
//     city: "",
//     zip_code: "",
//     ...data,
//   });
//   const [states, setStates] = useState([]);
//   const [message, setMessage] = useState({ text: "", type: "" });
//   const [isSaving, setIsSaving] = useState(false);

//   useEffect(() => {
//     const processAndSetData = () => {
//       const processedData = { ...data };
//       if (processedData.gender) {
//         const genderStr = String(processedData.gender).toLowerCase();
//         if (genderStr === "male") processedData.gender = "1";
//         else if (genderStr === "female") processedData.gender = "2";
//         else if (genderStr === "other") processedData.gender = "3";
//       }
//       setFormData((prevData) => ({ ...prevData, ...processedData }));
//     };
//     if (data) processAndSetData();

//     const fetchStates = async () => {
//       try {
//         const response = await axiosInstance.get("/api/states/?country_name=India");
//         if (response.data && response.data.status === "success") {
//           setStates(response.data.data);
//         }
//       } catch (error) {
//         console.error("Failed to fetch states:", error);
//       }
//     };
//     fetchStates();
//   }, [data]);

//   const handleChange = (e) => {
//     setMessage({ text: "", type: "" });
//     setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleSubmit = async () => {
//     setMessage({ text: "", type: "" });
//     setIsSaving(true);
//     try {
//       await onSave(formData);
//       setMessage({ text: "Profile updated successfully!", type: "success" }); // Add success message here
//     } catch (error) {
//       setMessage({ text: error.message, type: "error" });
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   return (
//     <Box sx={{ padding: 3 }}>
//       <Typography variant="h6" gutterBottom>
//         Personal Information
//       </Typography>
//       <Grid container spacing={2}>
//         <Grid item xs={12} sm={6}>
//           <TextField
//             name="first_name"
//             label="First Name"
//             value={formData.first_name || ""}
//             onChange={handleChange}
//             fullWidth
//           />
//         </Grid>
//                <Grid item xs={12} sm={6}>
//           <TextField
//             name="last_name"
//             label="Last Name"
//             value={formData.last_name || ""}
//             onChange={handleChange}
//             fullWidth
//           />
//         </Grid>

//         {/* --- MODIFICATION HERE --- */}
//         <Grid item xs={12} sm={6}>
//           <TextField
//             name="username"
//             label="User Name" // This field acts as the Employee ID
//             value={formData.username || ""}
//             fullWidth
//             // Use InputProps to make the field read-only without changing its visual style
//             InputProps={{
//               readOnly: true,
//             }}
//           />
//         </Grid>

//         <Grid item xs={12} sm={6}>
//           <TextField
//             name="contact_number"
//             label="Contact Number"
//             value={formData.contact_number || ""}
//             onChange={handleChange}
//             fullWidth
//           />
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <TextField
//             name="email"
//             label="Email"
//             value={formData.email || ""}
//             onChange={handleChange}
//             fullWidth
//           />
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <FormControl fullWidth>
//             <InputLabel>Gender</InputLabel>
//             <Select
//               name="gender"
//               value={formData.gender || ""}
//               onChange={handleChange}
//               label="Gender"
//             >
//               <MenuItem value="1">Male</MenuItem>
//               <MenuItem value="2">Female</MenuItem>
//               <MenuItem value="3">Other</MenuItem>
//             </Select>
//           </FormControl>
//         </Grid>
//         <Grid item xs={12}>
//           <TextField
//             name="address"
//             label="Address"
//             value={formData.address || ""}
//             onChange={handleChange}
//             fullWidth
//           />
//         </Grid>
//         <Grid item xs={12}>
//           <TextField
//             name="address_line_2"
//             label="Address Line 2"
//             value={formData.address_line_2 || ""}
//             onChange={handleChange}
//             fullWidth
//           />
//         </Grid>
//         <Grid item xs={12} sm={4}>
//           <FormControl fullWidth>
//             <InputLabel>State</InputLabel>
//             <Select
//               name="state"
//               value={formData.state || ""}
//               label="State"
//               onChange={handleChange}
//             >
//               {states.map((state) => (
//                 <MenuItem key={state.state_id} value={state.state_id}>
//                   {state.state_name}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//         </Grid>
//         <Grid item xs={12} sm={4}>
//           <TextField
//             name="city"
//             label="City"
//             value={formData.city || ""}
//             onChange={handleChange}
//             fullWidth
//           />
//         </Grid>
//         <Grid item xs={12} sm={4}>
//           <TextField
//             name="zip_code"
//             label="Zip Code"
//             value={formData.zip_code || ""}
//             onChange={handleChange}
//             fullWidth
//           />
//         </Grid>
//       </Grid>
//       <Stack direction="row" spacing={2} sx={{ mt: 3, alignItems: "center" }}>
//         {message.text && (
//           <Alert
//             severity={message.type}
//             sx={{ flexGrow: 1 }}
//             onClose={() => setMessage({ text: "", type: "" })}
//           >
//             {message.text}
//           </Alert>
//         )}
//         <Box sx={{ display: "flex", gap: 2, ml: "auto" }}>
//           <Button variant="outlined" onClick={onBack}>
//             Back
//           </Button>
//           <Button variant="contained" color="primary" onClick={handleSubmit} disabled={isSaving}>
//             {isSaving ? <CircularProgress size={24} /> : "Update Profile"}
//           </Button>
//         </Box>
//       </Stack>
//     </Box>
//   );
// };
// // ======================== END: MODIFIED COMPONENT ========================

// // --- FIX APPLIED TO THIS COMPONENT ---
// const ProfilePictureForm = ({ initialPicture, onSave, onBack }) => {
//   const [picturePreview, setPicturePreview] = useState(initialPicture);
//   const [pictureFile, setPictureFile] = useState(null);
//   const [message, setMessage] = useState({ text: "", type: "" });
//   const [isSaving, setIsSaving] = useState(false);

//   // This useEffect hook syncs the internal state with the prop from the parent.
//   // This is crucial for displaying the initially fetched image.
//   useEffect(() => {
//     setPicturePreview(initialPicture);
//   }, [initialPicture]);


//   const handleFileChange = (event) => {
//     setMessage({ text: '', type: '' });
//     const file = event.target.files[0];
//     if (file) { setPictureFile(file); setPicturePreview(URL.createObjectURL(file)); }
//   };

//   const handleSaveClick = async () => {
//     if (!pictureFile) {
//         setMessage({ text: 'Please choose a file first.', type: 'error' });
//         return;
//     }
//     setMessage({ text: '', type: '' });
//     setIsSaving(true);
//     try {
//         await onSave(pictureFile);
//         setMessage({ text: 'Profile picture updated successfully!', type: 'success' }); // Add success message here
//     } catch (error) {
//         setMessage({ text: error.message, type: 'error' });
//     } finally {
//         setIsSaving(false);
//     }
//   };

//   return (
//     <Box sx={{ padding: 3 }}>
//       <Typography variant="h6" gutterBottom>Update Profile Picture</Typography>
//       <Paper sx={{ padding: 2, textAlign: "center" }}>
//         <Avatar src={picturePreview} sx={{ width: 120, height: 120, margin: "0 auto 16px" }} />
//         <Button variant="outlined" component="label">Choose File<input type="file" accept="image/*" hidden onChange={handleFileChange} /></Button>
//         {pictureFile && <Typography variant="caption" display="block" mt={1}>{pictureFile.name}</Typography>}
//         <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ mt: 2, alignItems: 'center' }}>
//             {message.text && (
//                 <Alert severity={message.type} sx={{ flexGrow: 1, mr: 2 }} onClose={() => setMessage({text: '', type: ''})}>
//                     {message.text}
//                 </Alert>
//             )}
//             <Box sx={{ display: 'flex', gap: 2 }}>
//                 <Button variant="outlined" onClick={onBack}>Back</Button>
//                 <Button variant="contained" color="primary" onClick={handleSaveClick} disabled={isSaving}>
//                   {isSaving ? <CircularProgress size={24} /> : 'Save Picture'}
//                 </Button>
//             </Box>
//         </Stack>
//       </Paper>
//     </Box>
//   );
// };




import { useState, useEffect } from "react";
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
  Paper,
  TextField,
  FormControl,
  InputLabel,
  Select,
  Grid,
  DialogActions,
  Divider,
  Card,
  CardContent,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  CircularProgress,
  Badge,
  Alert,
  InputAdornment,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff, Delete } from "@mui/icons-material";
import { LocalizationProvider, StaticDatePicker, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import tdtlLogo from "./vetrinalogo.png";
import { Link } from "react-router-dom";
import adminlogo from "./admin-logo.png";
import {
  MailOutline as MailOutlineIcon,
  Phone as PhoneIcon,
} from "@mui/icons-material";
import axiosInstance from "../utils/axiosInstance";
import CloseIcon from "@mui/icons-material/Close";
import Swal from "sweetalert2"; // Import SweetAlert2

// --- API Configuration ---
const TODO_API_URL = "https://tdtlworld.com/hrms-backend/api/todos/";
const getAuthToken = () => localStorage.getItem("accessToken");

export default function TopBar({ open, toggleDrawer }) {
  const [anchorEl, setAnchorEl] = useState(null);

  // States for "My Account"
  const [accountSidebarOpen, setAccountSidebarOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [formDrawerOpen, setFormDrawerOpen] = useState(false);
  const [accountData, setAccountData] = useState(null);
  const [loadingData, setLoadingData] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const [accountMessage, setAccountMessage] = useState({ text: "", type: "" });

  // States updated by API
  const [profilePicture, setProfilePicture] = useState(adminlogo);
  const [userName, setUserName] = useState("User");
  const [userRole, setUserRole] = useState("Role");

  // States for "Change Password" form
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState({
    text: "",
    type: "",
  });

  const navigate = useNavigate();

  // States for other TopBar features
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [notificationsEl, setNotificationsEl] = useState(null);
  const [calendarEl, setCalendarEl] = useState(null);
  const [todoDialogOpen, setTodoDialogOpen] = useState(false);
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editingTodoId, setEditingTodoId] = useState(null);

  const userId = localStorage.getItem("loggedInUser");
  const employeeId = localStorage.getItem("loggedInEmpId");
  const empid = localStorage.getItem("EmID");

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const fetchUserData = async () => {
      if (!employeeId) return;
      try {
        const response = await axiosInstance.get("/api/dropdown/employee-role/");
        if (response.data && Array.isArray(response.data)) {
          const currentUser = response.data.find(
            (emp) => emp.id === Number(employeeId)
          );
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

  useEffect(() => {
    const fetchProfilePhoto = async () => {
      if (!empid) return;
      try {
        const response = await axiosInstance.get(
          `/api/get_profile_photo/${empid}/`
        );
        if (response.data && response.data.status === "success" && response.data.data) {
          const secureUrl = response.data.data.replace(/^http:\/\//i, "https://");
          setProfilePicture(secureUrl);
        }
      } catch (error) {
        console.error("Failed to fetch profile photo:", error);
      }
    };
    fetchProfilePhoto();
  }, [empid]);

  useEffect(() => {
    const fetchNotifications = async () => {
      if (!userId || !empid) return;
      try {
        const response = await axiosInstance.get(`/notifications/global/${empid}/`);
        const {
          birthdays,
          work_anniversaries,
          new_joinees,
          announcements,
          events,
          awards,
          policy_notification,
          asset_notification,
        } = response.data;

        let formattedMessages = [];
        if (birthdays?.length > 0)
          birthdays.forEach((b) =>
            formattedMessages.push(`🎂 Happy Birthday to ${b.full_name}!`)
          );
        if (work_anniversaries?.length > 0)
          work_anniversaries.forEach((w) =>
            formattedMessages.push(
              `🎉 Happy ${w.years_completed} year Work Anniversary to ${w.full_name}!`
            )
          );
        if (new_joinees?.length > 0)
          new_joinees.forEach((n) =>
            formattedMessages.push(`👋 Welcome to our new joinee, ${n.full_name}!`)
          );
        if (announcements?.length > 0)
          announcements.forEach((a) =>
            formattedMessages.push(`📢 Announcement: ${a.title}`)
          );
        if (events?.length > 0)
          events.forEach((e) =>
            formattedMessages.push(`🗓️ Event Today: ${e.event_title}`)
          );
        if (awards?.length > 0)
          awards.forEach((a) =>
            formattedMessages.push(`🏆 Congratulations to ${a.full_name} on their award!`)
          );
        if (policy_notification)
          formattedMessages.push(`📜 Policy Update: ${policy_notification}`);
        if (asset_notification)
          formattedMessages.push(`💻 Asset Update: ${asset_notification}`);

        setNotifications(formattedMessages);

        const lastViewedCount = parseInt(
          localStorage.getItem("viewedNotificationCount") || "0",
          10
        );
        const newUnreadCount = formattedMessages.length - lastViewedCount;
        setUnreadCount(newUnreadCount > 0 ? newUnreadCount : 0);
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
      }
    };
    fetchNotifications();
  }, [userId, empid]);

  useEffect(() => {
    const fetchAccountData = async () => {
      if (!accountSidebarOpen || accountData) return;
      setLoadingData(true);
      try {
        const response = await axiosInstance.get(`/my_account/${userId}`);
        setAccountData(response.data);
        if (response.data.profile_picture?.url) {
          let fullUrl = response.data.profile_picture.url;
          if (!fullUrl.startsWith("http")) {
            fullUrl = `https://tdtlworld.com/hrms-backend${fullUrl}`;
          }
          const secureUrl = fullUrl.replace(/^http:\/\//i, "https://");
          setProfilePicture(secureUrl);
        }
      } catch (error) {
        console.error("Failed to fetch account data:", error);
      } finally {
        setLoadingData(false);
      }
    };
    fetchAccountData();
  }, [accountSidebarOpen, userId, accountData]);

  const handleSave = async (updatedData) => {
    try {
      await axiosInstance.patch(`/my_account/${userId}`, updatedData, {
        headers: { "Content-Type": "application/json" },
      });
      setAccountData(null);
      setFormDrawerOpen(false);
      setAccountMessage({ text: "Profile updated successfully!", type: "success" });
    } catch (error) {
      console.error("Failed to update data:", error);
      const errorMessage =
        error.response?.data?.error ||
        "An error occurred while saving. Please try again.";
      throw new Error(errorMessage);
    }
  };

  const handlePasswordChange = async () => {
    setPasswordMessage({ text: "", type: "" });
    if (newPassword !== confirmNewPassword) {
      setPasswordMessage({ text: "New passwords do not match!", type: "error" });
      return;
    }
    if (!currentPassword || newPassword.length < 6) {
      setPasswordMessage({
        text: "Please provide the current password and ensure the new password is at least 6 characters long.",
        type: "error",
      });
      return;
    }

    const passwordData = {
      current_password: currentPassword,
      new_password: newPassword,
      confirm_password: confirmNewPassword,
    };

    setIsChangingPassword(true);
    try {
      await axiosInstance.patch(`/my_account/${userId}`, passwordData, {
        headers: { "Content-Type": "application/json" },
      });
      setPasswordMessage({ text: "Password changed successfully!", type: "success" });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
    } catch (error) {
      const errorMessage =
        error.response?.data?.error || "An error occurred while changing the password.";
      setPasswordMessage({ text: errorMessage, type: "error" });
    } finally {
      setIsChangingPassword(false);
    }
  };

  const handleProfilePictureSave = async (file) => {
    if (!file) return;
    const formData = new FormData();
    formData.append("profile_picture", file);

    try {
      await axiosInstance.patch(`/my_account/${userId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setAccountData(null);
      setFormDrawerOpen(false);
      setAccountMessage({ text: "Picture updated successfully!", type: "success" });
    } catch (error) {
      console.error("Failed to upload profile picture:", error);
      throw new Error("Failed to upload profile picture.");
    }
  };

  const fetchTodos = async () => {
    try {
      const token = getAuthToken();
      if (!token) return;
      const response = await fetch(TODO_API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error("Failed to fetch todos");
      const data = await response.json();
      setTodos(data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)));
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const handleAddOrUpdateTodo = async () => {
    if (!newTodo.trim()) return;
    const token = getAuthToken();
    const method = editingTodoId ? "PATCH" : "POST";
    const url = editingTodoId ? `${TODO_API_URL}${editingTodoId}/` : TODO_API_URL;
    try {
      await fetch(url, {
        method,
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({ description: newTodo }),
      });
      setNewTodo("");
      setEditingTodoId(null);
      fetchTodos();
    } catch (error) {
      console.error(`Error saving todo:`, error);
    }
  };

  const handleDeleteTodo = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      const token = getAuthToken();
      await fetch(`${TODO_API_URL}${id}/`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTodos();
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const handleProfileClick = (event) => setAnchorEl(event.currentTarget);
  const handleCalendarClick = (event) => setCalendarEl(event.currentTarget);
  const handleCalendarClose = () => setCalendarEl(null);
  const handleMenuClose = () => setAnchorEl(null);

  const handleNotificationsClick = (event) => {
    setNotificationsEl(event.currentTarget);
    localStorage.setItem("viewedNotificationCount", notifications.length);
    setUnreadCount(0);
  };

  const handleNotificationsClose = () => setNotificationsEl(null);
  const handleTodoClick = () => {
    fetchTodos();
    setTodoDialogOpen(true);
  };
  const handleTodoClose = () => {
    setTodoDialogOpen(false);
    setEditingTodoId(null);
    setNewTodo("");
  };
  const handleEditTodo = (todo) => {
    setEditingTodoId(todo.todo_item_id);
    setNewTodo(todo.description);
  };
  const handleAccountClick = () => {
    setAccountSidebarOpen(true);
    handleMenuClose();
  };

  const handleLogout = () => {
    localStorage.clear();
    setAnchorEl(null);
    Swal.fire({
      icon: 'success',
      title: 'Logout Successful!',
      text: 'Redirecting to login...',
      timer: 2000,
      showConfirmButton: false,
      background: '#fff',
      customClass: {
        popup: 'custom-swal-popup'
      },
      willClose: () => {
        window.location.href = "/hrms";
      }
    });
  };

  const handleAccountSidebarClose = () => {
    setAccountSidebarOpen(false);
    setSelectedOption(null);
    setAccountMessage({ text: "", type: "" });
  };

  const handleOptionClick = (option) => {
    setAccountMessage({ text: "", type: "" });
    setSelectedOption(option);
    setFormDrawerOpen(true);
  };

  const handleFormDrawerClose = () => {
    setFormDrawerOpen(false);
  };

  const createPasswordChangeHandler = (setter) => (e) => {
    setPasswordMessage({ text: "", type: "" });
    setter(e.target.value);
  };
  const handleClickShowNewPassword = () => setShowNewPassword((show) => !show);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmNewPassword((show) => !show);

  const renderContent = () => {
    if (loadingData) {
      return (
        <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
          <CircularProgress />
        </Box>
      );
    }
    if (!accountData) {
      return (
        <Typography sx={{ p: 2 }}>
          Could not load account data. Please try again.
        </Typography>
      );
    }

    switch (selectedOption) {
      case "Personal Information":
        return (
          <PersonalInformationForm
            data={accountData.personal_info}
            onSave={handleSave}
            onBack={handleFormDrawerClose}
          />
        );
      case "Profile Picture":
        return (
          <ProfilePictureForm
            initialPicture={profilePicture}
            onSave={handleProfilePictureSave}
            onBack={handleFormDrawerClose}
          />
        );
      case "Change Password":
        return (
          <Box sx={{ padding: 3 }}>
            <Typography variant="h6" gutterBottom>
              Change Password
            </Typography>
            <TextField
              label="Current Password"
              fullWidth
              type="password"
              value={currentPassword}
              onChange={createPasswordChangeHandler(setCurrentPassword)}
              sx={{ mt: 2 }}
              required
            />
            <TextField
              label="New Password"
              fullWidth
              type={showNewPassword ? "text" : "password"}
              value={newPassword}
              onChange={createPasswordChangeHandler(setNewPassword)}
              sx={{ mt: 2 }}
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickShowNewPassword} edge="end">
                      {showNewPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="Confirm New Password"
              fullWidth
              type={showConfirmNewPassword ? "text" : "password"}
              value={confirmNewPassword}
              onChange={createPasswordChangeHandler(setConfirmNewPassword)}
              sx={{ mt: 2 }}
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickShowConfirmPassword} edge="end">
                      {showConfirmNewPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Stack
              direction="row"
              spacing={2}
              sx={{ mt: 3, alignItems: "center" }}
            >
              {passwordMessage.text && (
                <Alert
                  severity={passwordMessage.type}
                  sx={{ flexGrow: 1 }}
                  onClose={() => setPasswordMessage({ text: "", type: "" })}
                >
                  {passwordMessage.text}
                </Alert>
              )}
              <Box sx={{ display: "flex", gap: 2, ml: "auto" }}>
                <Button variant="outlined" onClick={handleFormDrawerClose}>
                  Back
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handlePasswordChange}
                  disabled={isChangingPassword}
                >
                  {isChangingPassword ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    "Change Password"
                  )}
                </Button>
              </Box>
            </Stack>
          </Box>
        );
      default:
        return (
          <Typography variant="h6" sx={{ p: 2 }}>
            Select an option to view details
          </Typography>
        );
    }
  };

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          background:
            "linear-gradient(135deg,rgba(239, 77, 36, 0.90) 0%,rgb(155, 10, 199)100%)",
          boxShadow: "0 4px 20px rgba(102, 126, 234, 0.3)",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="toggle drawer"
            onClick={toggleDrawer}
            edge="start"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Box>
            <Link to="/hrms/admindashboard/home">
              <img
                src={tdtlLogo || "/placeholder.svg"}
                alt="TDTL Logo"
                style={{
                  height: isMobile ? "35px" : "50px",
                  width: "auto",
                  cursor: "pointer",
                }}
              />
            </Link>
          </Box>
          <Box sx={{ flexGrow: 1 }} />

          {!isMobile && (
            <IconButton color="inherit" onClick={handleNotificationsClick}>
              <Badge badgeContent={unreadCount} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          )}
          <Menu
            anchorEl={notificationsEl}
            open={Boolean(notificationsEl)}
            onClose={handleNotificationsClose}
          >
            {notifications.length > 0 ? (
              notifications.map((msg, index) => (
                <MenuItem key={index} onClick={handleNotificationsClose}>
                  {msg}
                </MenuItem>
              ))
            ) : (
              <MenuItem onClick={handleNotificationsClose}>
                No new notifications
              </MenuItem>
            )}
          </Menu>

          {!isMobile && (
            <IconButton color="inherit" onClick={handleCalendarClick}>
              <CalendarTodayIcon />
            </IconButton>
          )}
          <Menu
            anchorEl={calendarEl}
            open={Boolean(calendarEl)}
            onClose={handleCalendarClose}
          >
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <StaticDatePicker
                displayStaticWrapperAs="desktop"
                value={new Date()}
                onChange={() => {}}
              />
            </LocalizationProvider>
          </Menu>

          {!isMobile && (
            <IconButton color="inherit" onClick={handleTodoClick}>
              <AssignmentIcon />
            </IconButton>
          )}
          <Dialog open={todoDialogOpen} onClose={handleTodoClose} maxWidth="sm" fullWidth>
            <DialogTitle>Todo List</DialogTitle>
            <DialogContent>
              <TextField
                label={editingTodoId ? "Update Todo" : "New Todo"}
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                fullWidth
                margin="normal"
                variant="outlined"
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddOrUpdateTodo}
                fullWidth
              >
                {editingTodoId ? "Update Todo" : "Add Todo"}
              </Button>
              <List sx={{ mt: 2, maxHeight: 300, overflow: "auto" }}>
                {todos.map((todo) => (
                  <ListItem
                    key={todo.todo_item_id}
                    divider
                    secondaryAction={
                      <>
                        <IconButton edge="end" onClick={() => handleEditTodo(todo)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          edge="end"
                          onClick={() => handleDeleteTodo(todo.todo_item_id)}
                          sx={{ ml: 1 }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </>
                    }
                  >
                    <ListItemText primary={todo.description} />
                  </ListItem>
                ))}
              </List>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleTodoClose} color="secondary">
                Close
              </Button>
            </DialogActions>
          </Dialog>

          <Box
            onClick={handleProfileClick}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              ml: 2,
              mr: 1,
              cursor: "pointer",
              p: 1,
              borderRadius: 2,
              "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.1)" },
            }}
          >
            <Avatar alt={userName} src={profilePicture} />
            {!isMobile && (
              <Box sx={{ ml: 1.5 }}>
                <Typography variant="subtitle2" sx={{ lineHeight: 1.2 }}>
                  {userName}
                </Typography>
                <Typography variant="caption" sx={{ opacity: 0.8 }}>
                  {userRole} ({userId})
                </Typography>
              </Box>
            )}
          </Box>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
            {isMobile && (
              <MenuItem onClick={handleNotificationsClick}>
                <Badge badgeContent={unreadCount} color="secondary" sx={{ mr: 1 }}>
                  <NotificationsIcon />
                </Badge>
                Notifications
              </MenuItem>
            )}
            {isMobile && <MenuItem onClick={handleCalendarClick}>
                <CalendarTodayIcon sx={{ mr: 1 }} /> Calendar
            </MenuItem>}
            {isMobile && <MenuItem onClick={handleTodoClick}>
                <AssignmentIcon sx={{ mr: 1 }} /> To-Do List
            </MenuItem>}
            <MenuItem onClick={handleAccountClick}>My Account</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="right"
        open={accountSidebarOpen}
        onClose={handleAccountSidebarClose}
        sx={{ "& .MuiDrawer-paper": { width: 300, top: 64 } }}
      >
        <Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              p: "12px 8px 12px 16px",
            }}
          >
            <Typography variant="h6" sx={{ flexGrow: 1, textAlign: "center", ml: "40px" }}>
              My Account
            </Typography>
            <IconButton onClick={handleAccountSidebarClose}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Divider />
          <Box sx={{ p: 2, flex: 1 }}>
            <UserCard
              data={accountData?.my_account}
              profilePicture={profilePicture}
              loading={loadingData}
            />

            {accountMessage.text && (
              <Alert
                severity={accountMessage.type}
                sx={{ mt: 2 }}
                onClose={() => setAccountMessage({ text: "", type: "" })}
              >
                {accountMessage.text}
              </Alert>
            )}
          </Box>

          <Divider />
          <List sx={{ p: 0 }}>
            {["Personal Information", "Profile Picture", "Change Password"].map(
              (text) => (
                <ListItem button key={text} onClick={() => handleOptionClick(text)}>
                  <ListItemText primary={text} />
                </ListItem>
              )
            )}
          </List>
        </Box>
      </Drawer>
      <Drawer
        anchor="right"
        open={formDrawerOpen}
        onClose={handleFormDrawerClose}
        sx={{ "& .MuiDrawer-paper": { width: 600, padding: 2, top: 64 } }}
      >
        {renderContent()}
      </Drawer>
    </>
  );
}

const UserCard = ({ data, profilePicture, loading }) => {
  if (loading) {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress />
      </Box>
    );
  }
  if (!data) return null;
  return (
    <Card sx={{ width: "100%", maxWidth: 360, borderRadius: 3, boxShadow: 3, mx: "auto" }}>
      <CardContent>
        <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
          <Avatar src={profilePicture} sx={{ width: 56, height: 56 }} />
          <Box flexGrow={1} minWidth={0}>
            <Typography variant="h6" noWrap>
              {data.full_name}
            </Typography>
            <Typography variant="body2" color="text.secondary" noWrap>
              @{data.email.split("@")[0]}
            </Typography>
          </Box>
        </Stack>
        <Stack
          direction="row"
          alignItems="center"
          spacing={1}
          mt={2}
          wrap="wrap"
        >
          <MailOutlineIcon fontSize="small" />
          <Typography variant="body2" sx={{ wordBreak: "break-all" }}>
            {data.email}
          </Typography>
        </Stack>
        <Stack direction="row" alignItems="center" spacing={1} mt={1}>
          <PhoneIcon fontSize="small" />
          <Typography variant="body2">{data.contact_number}</Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};

const PersonalInformationForm = ({ data, onSave, onBack }) => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    contact_number: "",
    email: "",
    gender: "",
    address: "",
    address_line_2: "",
    state: "",
    city: "",
    zip_code: "",
    ...data,
  });
  const [states, setStates] = useState([]);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const processAndSetData = () => {
      const processedData = { ...data };
      if (processedData.gender) {
        const genderStr = String(processedData.gender).toLowerCase();
        if (genderStr === "male") processedData.gender = "1";
        else if (genderStr === "female") processedData.gender = "2";
        else if (genderStr === "other") processedData.gender = "3";
      }
      setFormData((prevData) => ({ ...prevData, ...processedData }));
    };
    if (data) processAndSetData();

    const fetchStates = async () => {
      try {
        const response = await axiosInstance.get("/api/states/?country_name=India");
        if (response.data && response.data.status === "success") {
          setStates(response.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch states:", error);
      }
    };
    fetchStates();
  }, [data]);

  const handleChange = (e) => {
    setMessage({ text: "", type: "" });
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    setMessage({ text: "", type: "" });
    setIsSaving(true);
    try {
      await onSave(formData);
      setMessage({ text: "Profile updated successfully!", type: "success" });
    } catch (error) {
      setMessage({ text: error.message, type: "error" });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h6" gutterBottom>
        Personal Information
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            name="first_name"
            label="First Name"
            value={formData.first_name || ""}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
               <Grid item xs={12} sm={6}>
          <TextField
            name="last_name"
            label="Last Name"
            value={formData.last_name || ""}
            onChange={handleChange}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            name="username"
            label="User Name"
            value={formData.username || ""}
            fullWidth
            InputProps={{
              readOnly: true,
            }}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            name="contact_number"
            label="Contact Number"
            value={formData.contact_number || ""}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="email"
            label="Email"
            value={formData.email || ""}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Gender</InputLabel>
            <Select
              name="gender"
              value={formData.gender || ""}
              onChange={handleChange}
              label="Gender"
            >
              <MenuItem value="1">Male</MenuItem>
              <MenuItem value="2">Female</MenuItem>
              <MenuItem value="3">Other</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="address"
            label="Address"
            value={formData.address || ""}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="address_line_2"
            label="Address Line 2"
            value={formData.address_line_2 || ""}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth>
            <InputLabel>State</InputLabel>
            <Select
              name="state"
              value={formData.state || ""}
              label="State"
              onChange={handleChange}
            >
              {states.map((state) => (
                <MenuItem key={state.state_id} value={state.state_id}>
                  {state.state_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            name="city"
            label="City"
            value={formData.city || ""}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            name="zip_code"
            label="Zip Code"
            value={formData.zip_code || ""}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
      </Grid>
      <Stack direction="row" spacing={2} sx={{ mt: 3, alignItems: "center" }}>
        {message.text && (
          <Alert
            severity={message.type}
            sx={{ flexGrow: 1 }}
            onClose={() => setMessage({ text: "", type: "" })}
          >
            {message.text}
          </Alert>
        )}
        <Box sx={{ display: "flex", gap: 2, ml: "auto" }}>
          <Button variant="outlined" onClick={onBack}>
            Back
          </Button>
          <Button variant="contained" color="primary" onClick={handleSubmit} disabled={isSaving}>
            {isSaving ? <CircularProgress size={24} /> : "Update Profile"}
          </Button>
        </Box>
      </Stack>
    </Box>
  );
};

const ProfilePictureForm = ({ initialPicture, onSave, onBack }) => {
  const [picturePreview, setPicturePreview] = useState(initialPicture);
  const [pictureFile, setPictureFile] = useState(null);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setPicturePreview(initialPicture);
  }, [initialPicture]);


  const handleFileChange = (event) => {
    setMessage({ text: '', type: '' });
    const file = event.target.files[0];
    if (file) { setPictureFile(file); setPicturePreview(URL.createObjectURL(file)); }
  };

  const handleSaveClick = async () => {
    if (!pictureFile) {
        setMessage({ text: 'Please choose a file first.', type: 'error' });
        return;
    }
    setMessage({ text: '', type: '' });
    setIsSaving(true);
    try {
        await onSave(pictureFile);
        setMessage({ text: 'Profile picture updated successfully!', type: 'success' });
    } catch (error) {
        setMessage({ text: error.message, type: 'error' });
    } finally {
        setIsSaving(false);
    }
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h6" gutterBottom>Update Profile Picture</Typography>
      <Paper sx={{ padding: 2, textAlign: "center" }}>
        <Avatar src={picturePreview} sx={{ width: 120, height: 120, margin: "0 auto 16px" }} />
        <Button variant="outlined" component="label">Choose File<input type="file" accept="image/*" hidden onChange={handleFileChange} /></Button>
        {pictureFile && <Typography variant="caption" display="block" mt={1}>{pictureFile.name}</Typography>}
        <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ mt: 2, alignItems: 'center' }}>
            {message.text && (
                <Alert severity={message.type} sx={{ flexGrow: 1, mr: 2 }} onClose={() => setMessage({text: '', type: ''})}>
                    {message.text}
                </Alert>
            )}
            <Box sx={{ display: 'flex', gap: 2 }}>
                <Button variant="outlined" onClick={onBack}>Back</Button>
                <Button variant="contained" color="primary" onClick={handleSaveClick} disabled={isSaving}>
                  {isSaving ? <CircularProgress size={24} /> : 'Save Picture'}
                </Button>
            </Box>
        </Stack>
      </Paper>
    </Box>
  );
};

const AddNewAssetForm = ({ onSave, onBack }) => {
  const [formData, setFormData] = useState({
    assets_name: "",
    quantity: "",
    assets_category_id: "",
    brand_id: "",
    employee_id: "",
    purchase_date: null,
    serial_number: "",
    manufacturer: "",
    company_asset_code: "",
    invoice_number: "",
    warranty_end_date: null,
    asset_note: "",
    asset_image: null,
    is_working: "yes",
  });
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
 
  const handleDateChange = (name, newValue) => {
    setFormData(prev => ({ ...prev, [name]: newValue }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({ ...prev, asset_image: e.target.files[0] }));
  };

  const handleSubmit = async () => {
    if (!formData.quantity) {
      setMessage({ text: "Quantity is a mandatory field.", type: "error" });
      return;
    }
    setMessage({ text: "", type: "" });
    setIsSaving(true);
    try {
      // Create a FormData object to handle file uploads
      const dataToSubmit = new FormData();
      Object.keys(formData).forEach(key => {
        // Format dates to 'YYYY-MM-DD' if they are not null
        if ((key === 'purchase_date' || key === 'warranty_end_date') && formData[key]) {
          dataToSubmit.append(key, new Date(formData[key]).toISOString().split('T')[0]);
        } else if (formData[key] !== null) {
          dataToSubmit.append(key, formData[key]);
        }
      });
      // await onSave(dataToSubmit); // This would be the prop function to call the API
      setMessage({ text: "Asset added successfully!", type: "success" });
    } catch (error) {
      setMessage({ text: error.message, type: "error" });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ padding: 3 }}>
        <Typography variant="h6" gutterBottom>Add New Asset</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField name="assets_name" label="Asset Name" value={formData.assets_name} onChange={handleChange} fullWidth />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField name="quantity" label="Quantity" value={formData.quantity} onChange={handleChange} type="number" required fullWidth />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Asset Category</InputLabel>
              <Select name="assets_category_id" value={formData.assets_category_id} label="Asset Category" onChange={handleChange}>
                <MenuItem value={3}>Laptop</MenuItem>
                <MenuItem value={4}>Keyboard</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Brand</InputLabel>
              <Select name="brand_id" value={formData.brand_id} label="Brand" onChange={handleChange}>
                <MenuItem value={5}>Dell</MenuItem>
                <MenuItem value={6}>HP</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Employee</InputLabel>
              <Select name="employee_id" value={formData.employee_id} label="Employee" onChange={handleChange}>
                <MenuItem value={"emp001"}>John Doe (emp001)</MenuItem>
                <MenuItem value={"emp002"}>Jane Smith (emp002)</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
              <DatePicker
                label="Purchase Date"
                value={formData.purchase_date}
                onChange={(newValue) => handleDateChange('purchase_date', newValue)}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField name="serial_number" label="Serial Number" value={formData.serial_number} onChange={handleChange} fullWidth />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField name="manufacturer" label="Manufacturer" value={formData.manufacturer} onChange={handleChange} fullWidth />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField name="company_asset_code" label="Company Asset Code" value={formData.company_asset_code} onChange={handleChange} fullWidth />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField name="invoice_number" label="Invoice Number" value={formData.invoice_number} onChange={handleChange} fullWidth />
          </Grid>
          <Grid item xs={12} sm={6}>
              <DatePicker
                label="Warranty End Date"
                value={formData.warranty_end_date}
                onChange={(newValue) => handleDateChange('warranty_end_date', newValue)}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Is Working</InputLabel>
              <Select name="is_working" value={formData.is_working} label="Is Working" onChange={handleChange}>
                <MenuItem value={"yes"}>Yes</MenuItem>
                <MenuItem value={"no"}>No</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField name="asset_note" label="Asset Note" value={formData.asset_note} onChange={handleChange} fullWidth multiline rows={3} />
          </Grid>
          <Grid item xs={12}>
            <Button variant="outlined" component="label">
              Upload Asset Image
              <input type="file" accept="image/*" hidden onChange={handleFileChange} />
            </Button>
            {formData.asset_image && <Typography variant="caption" display="block" mt={1}>{formData.asset_image.name}</Typography>}
          </Grid>
        </Grid>
        <Stack direction="row" spacing={2} sx={{ mt: 3, alignItems: "center" }}>
          {message.text && (
            <Alert severity={message.type} sx={{ flexGrow: 1 }} onClose={() => setMessage({ text: "", type: "" })}>
              {message.text}
            </Alert>
          )}
          <Box sx={{ display: "flex", gap: 2, ml: "auto" }}>
            <Button variant="outlined" onClick={onBack}>Cancel</Button>
            <Button variant="contained" color="primary" onClick={handleSubmit} disabled={isSaving}>
              {isSaving ? <CircularProgress size={24} /> : "Save Asset"}
            </Button>
          </Box>
        </Stack>
      </Box>
    </LocalizationProvider>
  );
};