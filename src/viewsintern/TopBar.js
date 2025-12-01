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
//   TextField,
//   FormControl,
//   InputLabel,
//   Select,
//   Grid,
//   MenuItem as MuiMenuItem,
// } from "@mui/material";
// import * as material from "@mui/material";
// import MenuIcon from "@mui/icons-material/Menu";
// import NotificationsIcon from "@mui/icons-material/Notifications";
// import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
// import AssignmentIcon from "@mui/icons-material/Assignment";
// import { useNavigate } from "react-router-dom";

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
//   const [profilePicture, setProfilePicture] = useState([adminlogo]);
//   const [userName, setUserName] = useState("Gayatri Kashid");

//   const [formDrawerOpen, setFormDrawerOpen] = useState(false);
//   const navigate = useNavigate();
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
//   const handleLogout = () => {
//     setAnchorEl(null);
//     setShowLogoutDialog(true);
//     setTimeout(() => {
//       setShowLogoutDialog(false);
//       navigate("/"); // Redirect to LoginPage
//     }, 1000);
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

//   // new
//   const renderContent = () => {
//     switch (selectedOption) {
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
//               <MuiMenuItem value="Per Hour">Per Hour</MuiMenuItem>
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
//             <Link to="/dashboard/home">
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
//               <Typography variant="caption">Intern</Typography>
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
//           {["Contract"].map((text) => (
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


import React, { useState } from "react";
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
  TextField,
  FormControl,
  InputLabel,
  Select,
  Grid,
  MenuItem as MuiMenuItem,
} from "@mui/material";
import * as material from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { useNavigate } from "react-router-dom";

import { LocalizationProvider, StaticDatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { CheckCircle } from "@mui/icons-material";
import tdtlLogo from "./tdtl-logo.png";
import { Link } from "react-router-dom";
import adminlogo from "./admin-logo.jpeg";
export default function TopBar({ open, toggleDrawer }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [accountSidebarOpen, setAccountSidebarOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [profilePicture, setProfilePicture] = useState([adminlogo]);
  const [userName, setUserName] = useState("Gayatri Kashid");

  const [formDrawerOpen, setFormDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const [notificationsEl, setNotificationsEl] = useState(null);
  const [calendarEl, setCalendarEl] = useState(null);
  const [todoDialogOpen, setTodoDialogOpen] = useState(false);
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const [editIndex, setEditIndex] = useState(null);

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleNotificationsClick = (event) => {
    setNotificationsEl(event.currentTarget);
  };
  const handleNotificationsClose = () => {
    setNotificationsEl(null);
  };
  const handleCalendarClick = (event) => {
    setCalendarEl(event.currentTarget);
  };

  const handleCalendarClose = () => {
    setCalendarEl(null);
  };

  const handleTodoClick = () => {
    setTodoDialogOpen(true);
  };

  const handleTodoClose = () => {
    setTodoDialogOpen(false);
    setEditIndex(null);
    setNewTodo("");
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleAddTodo = () => {
    if (newTodo.trim()) {
      if (editIndex !== null) {
        const updatedTodos = [...todos];
        updatedTodos[editIndex] = newTodo;
        setTodos(updatedTodos);
        setEditIndex(null);
      } else {
        setTodos([...todos, newTodo]);
      }
      setNewTodo("");
    }
  };

  const handleEditTodo = (index) => {
    setEditIndex(index);
    setNewTodo(todos[index]);
    setTodoDialogOpen(true);
  };

  const handleDeleteTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  const handleAccountClick = () => {
    setAccountSidebarOpen(true);
    handleMenuClose();
  };
  // const handleLogout = () => {
  //   setAnchorEl(null);
  //   setShowLogoutDialog(true);
  //   setTimeout(() => {
  //     setShowLogoutDialog(false);
  //     navigate("/"); // Redirect to LoginPage
  //   }, 1000);
  // };

  const handleLogout = () => {
    // Clear tokens and role from localStorage
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userRole");

    setAnchorEl(null);
    setShowLogoutDialog(true);

    setTimeout(() => {
      setShowLogoutDialog(false);
      window.location.href = "/hrms"; // Redirect to LoginPage
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

  // new
  const renderContent = () => {
    switch (selectedOption) {
      case "Contract":
        return <ContractForm />;
      default:
        return (
          <Typography variant="h6">Select an option to view details</Typography>
        );
    }
  };

  const ContractForm = () => (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h6" gutterBottom>
        Set Contract
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Contract Date"
            fullWidth
            type="date"
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Billing</InputLabel>
            <Select>
              <MuiMenuItem value="Yes">Yes</MuiMenuItem>
              <MuiMenuItem value="No">No</MuiMenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Department"
            fullWidth
            defaultValue="Integrated Technology Services"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Designation"
            fullWidth
            defaultValue="Junior Software Engineer"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="Basic Salary" fullWidth type="number" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="Hourly Rate" fullWidth type="number" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Payslip Type</InputLabel>
            <Select>
              <MuiMenuItem value="Per Month">Per Month</MuiMenuItem>
              <MuiMenuItem value="Per Hour">Per Hour</MuiMenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Office Shift</InputLabel>
            <Select>
              <MuiMenuItem value="Morning Shift">Morning Shift</MuiMenuItem>
              <MuiMenuItem value="Night Shift">Night Shift</MuiMenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Contract End"
            fullWidth
            type="date"
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Probation</InputLabel>
            <Select>
              <MuiMenuItem value="Yes">Yes</MuiMenuItem>
              <MuiMenuItem value="No">No</MuiMenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Button variant="contained" color="primary" sx={{ mt: 2 }}>
        Save Contract
      </Button>
    </Box>
  );

  return (
    <>
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
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
          {/* <Typography variant="h6" noWrap component="div">
            Dashboard
          </Typography> */}
          <Box>
            <Link to="/dashboard/home">
              <img
                src={tdtlLogo}
                alt="TDTL Logo"
                style={{
                  height: "40px", // Adjust height as needed
                  width: "auto",
                  cursor: "pointer",
                }}
              />
            </Link>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <material.IconButton
            color="inherit"
            onClick={handleNotificationsClick}
          >
            <material.Badge badgeContent={3} color="secondary">
              <NotificationsIcon />
            </material.Badge>
          </material.IconButton>
          <material.Menu
            anchorEl={notificationsEl}
            open={Boolean(notificationsEl)}
            onClose={handleNotificationsClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",  
              horizontal: "right",
            }}
          >
            <material.MenuItem onClick={handleNotificationsClose}>
              Lorem ipsum dolor sit amet.
            </material.MenuItem>
            <material.MenuItem onClick={handleNotificationsClose}>
              Lorem ipsum dolor sit amet.
            </material.MenuItem>
            <material.MenuItem onClick={handleNotificationsClose}>
              Lorem ipsum dolor sit amet.
            </material.MenuItem>
          </material.Menu>
          <material.IconButton color="inherit" onClick={handleCalendarClick}>
            <CalendarTodayIcon />
          </material.IconButton>
          <material.Menu
            anchorEl={calendarEl}
            open={Boolean(calendarEl)}
            onClose={handleCalendarClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <StaticDatePicker
                displayStaticWrapperAs="desktop"
                value={new Date()}
                onChange={() => {}}
              />
            </LocalizationProvider>
          </material.Menu>

          <material.IconButton color="inherit" onClick={handleTodoClick}>
            <AssignmentIcon />
          </material.IconButton>
          <material.Dialog
            open={todoDialogOpen}
            onClose={handleTodoClose}
            maxWidth="xs"
            fullWidth
          >
            <material.DialogTitle>Todo List</material.DialogTitle>
            <material.DialogContent>
              <material.TextField
                label="New Todo"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                fullWidth
                margin="normal"
              />
              <material.Button
                variant="contained"
                color="primary"
                onClick={handleAddTodo}
                fullWidth
              >
                {editIndex !== null ? "Update Todo" : "Add Todo"}
              </material.Button>
              <material.List>
                {todos.map((todo, index) => (
                  <material.ListItem key={index}>
                    <material.ListItemText primary={todo} />
                    <material.ListItemSecondaryAction>
                      <material.IconButton
                        edge="end"
                        onClick={() => handleEditTodo(index)}
                      >
                        <EditIcon />
                      </material.IconButton>
                      <material.IconButton
                        edge="end"
                        onClick={() => handleDeleteTodo(index)}
                      >
                        <DeleteIcon />
                      </material.IconButton>
                    </material.ListItemSecondaryAction>
                  </material.ListItem>
                ))}
              </material.List>
            </material.DialogContent>
            <material.DialogActions>
              <material.Button onClick={handleTodoClose} color="secondary">
                Close
              </material.Button>
            </material.DialogActions>
          </material.Dialog>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              ml: 2,
            }}
            onClick={handleProfileClick}
          >
            <Avatar alt="Profile Picture" src={profilePicture} />
            <Box sx={{ ml: 1 }}>
              <Typography variant="subtitle">{userName}</Typography>
              <br />
              <Typography variant="caption">Intern</Typography>
            </Box>
          </Box>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleAccountClick}>My Account</MenuItem>
            <material.MenuItem onClick={handleLogout}>Logout</material.MenuItem>

            <material.Dialog
              open={showLogoutDialog}
              sx={{
                "& .MuiDialog-paper": {
                  minWidth: "300px",
                  borderRadius: "16px",
                  textAlign: "center",
                  padding: "16px",
                },
              }}
            >
              <material.DialogContent>
                <CheckCircle sx={{ fontSize: 80, color: "#4caf50", mb: 2 }} />
                <material.Typography
                  variant="h5"
                  sx={{ fontWeight: "bold", color: "#333" }}
                >
                  Logout Successful!
                </material.Typography>
                <material.Typography sx={{ color: "#666", mt: 1 }}>
                  Redirecting to login...
                </material.Typography>
              </material.DialogContent>
            </material.Dialog>
          </Menu>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="right"
        open={accountSidebarOpen}
        onClose={handleAccountSidebarClose}
        sx={{
          "& .MuiDrawer-paper": {
            width: 300,
            padding: 2,
            top: 64,
          },
        }}
      >
        <Typography variant="h6">My Account</Typography>
        <List>
          {["Contract"].map((text) => (
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
        sx={{
          "& .MuiDrawer-paper": {
            width: 600,
            padding: 2,
            top: 64,
          },
        }}
      >
        {renderContent()}
      </Drawer>
    </>
  );
}