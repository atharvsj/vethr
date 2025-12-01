// import React, { useState } from "react";
// import {
//   Drawer,
//   List,
//   ListItem,
//   ListItemIcon,
//   ListItemText,
//   IconButton,
//   Divider,
//   Collapse,
//   Box,
// } from "@mui/material";
// import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
// import HomeIcon from "@mui/icons-material/Home";
// import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
// import GroupIcon from "@mui/icons-material/Group";
// import WorkIcon from "@mui/icons-material/Work";
// import ExpandLess from "@mui/icons-material/ExpandLess";
// import ExpandMore from "@mui/icons-material/ExpandMore";
// import { useNavigate, useLocation } from "react-router-dom";
// import StarIcon from '@mui/icons-material/Star';
// import AssignmentIcon from '@mui/icons-material/Assignment';
// import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
// import HelpIcon from '@mui/icons-material/Help';
// import PersonAddIcon from '@mui/icons-material/PersonAdd';
// import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
// import TopicIcon from '@mui/icons-material/Topic';
// import PaymentIcon from '@mui/icons-material/Payment';
// import BadgeIcon from '@mui/icons-material/Badge';

// export default function Sidebar({ open, toggleDrawer, drawerWidth }) {
//   const [attendanceOpen, setAttendanceOpen] = useState(false);
//   const [addempOpen, setAddempOpen] = useState(false);
//   const [leaveOpen, setLeaveOpen] = useState(false);
//   const [AppsOpen, setAppsOpen] = useState(false);
//   const navigate = useNavigate();
//   const location = useLocation(); 

//   const handleLeaveClick = () => {
//     setLeaveOpen(!leaveOpen);
//   };


//   const handleAttendanceClick = () => {
//     setAttendanceOpen(!attendanceOpen);
//   };

//   const handleAddempClick = () => {
//     setAddempOpen(!addempOpen);
//   };

//   const handleAppsClick = () => {
//     setAppsOpen(!AppsOpen);
//   };


//   const handleNavigation = (route) => {
//     navigate(route);
//   };

//   // Function to check if the current route matches the section for active state
//   const isActive = (route) => location.pathname === route;

//   return (
//     <Drawer
//       sx={{
//         width: drawerWidth,
//         flexShrink: 0,
//         "& .MuiDrawer-paper": {
//           width: drawerWidth,
//           boxSizing: "border-box",
//         },
//       }}
//       variant="persistent"
//       anchor="left"
//       open={open}
//     >
//       <Box
//         sx={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "flex-end",
//           p: 1,
//           minHeight: 64,
//         }}
//       >
//         <IconButton onClick={toggleDrawer}>
//           <ChevronLeftIcon />
//         </IconButton>
//       </Box>
//       <Divider />
//       <List>
//         {/* Home Item */}
//         <ListItem
//           button
//           onClick={() => handleNavigation("/hrms/dashboardhr/home")}
//           selected={isActive("/hrms/dashboardhr/home")}
//         >
//           <ListItemIcon>
//             <HomeIcon />
//           </ListItemIcon>
//           <ListItemText primary="Home" />
//         </ListItem>

//         {/* Attendance Dropdown */}

//         <ListItem button onClick={handleAttendanceClick}>
//           <ListItemIcon>
//             <CalendarTodayIcon />
//           </ListItemIcon>
//           <ListItemText primary="Attendance" />
//           {attendanceOpen ? <ExpandLess /> : <ExpandMore />}
//         </ListItem>
//         <Collapse in={attendanceOpen} timeout="auto" unmountOnExit>
//           <List component="div" disablePadding>
//             <ListItem
//               button
//               sx={{ pl: 4 }}
//               onClick={() => handleNavigation("/hrms/dashboardhr/attendance")}
//               selected={isActive("/hrms/dashboardhr/attendance")}
//             >
//               <ListItemText primary="Attendance" />
//             </ListItem>

//             <ListItem
//               button
//               sx={{ pl: 4 }}
//               onClick={() => handleNavigation("/hrms/dashboardhr/monthly-report")}
//               selected={isActive("/hrms/dashboardhr/monthly-report")}
//             >
//               <ListItemText primary="Monthly Report" />
//             </ListItem>

//           </List>
//         </Collapse>

// {/*  Active Employee */}
//         {/* <ListItem
//           button
//           onClick={() => handleNavigation("/hrms/dashboardhr/employee")}
//           selected={isActive("/hrms/dashboardhr/employee")}
//         >
//           <ListItemIcon>
//             <BadgeIcon />
//           </ListItemIcon>
//           <ListItemText primary="Active Employee" />
//         </ListItem> */}

// {/* Holiday */}

//         <ListItem
//           button
//           onClick={() => handleNavigation("/hrms/dashboardhr/holiday-view")}
//           selected={isActive("/hrms/dashboardhr/holiday-view")}
//         >
//           <ListItemIcon>
//             <StarIcon />
//           </ListItemIcon>
//           <ListItemText primary="Holiday" />
//         </ListItem>

// {/* Project */}

//         <ListItem
//           button
//           onClick={() => handleNavigation("/hrms/dashboardhr/projects")}
//           selected={isActive("/hrms/dashboardhr/projects")}
//         >
//           <ListItemIcon>
//             <AssignmentIcon />
//           </ListItemIcon>
//           <ListItemText primary="Project" />
//         </ListItem>


// {/* Task */}

//         <ListItem
//           button
//           onClick={() => handleNavigation("/hrms/dashboardhr/tasks")}
//           selected={isActive("/hrms/dashboardhr/tasks")}
//         >
//           <ListItemIcon>
//             <WorkIcon />
//           </ListItemIcon>
//           <ListItemText primary="Task" />
//         </ListItem>



// {/* Leave Request */}


// <ListItem button onClick={handleLeaveClick}>
//           <ListItemIcon>
//             <CalendarTodayIcon />
//           </ListItemIcon>
//           <ListItemText primary="Leave Request" />
//           {leaveOpen ? <ExpandLess /> : <ExpandMore />}

//         </ListItem>
//         <Collapse in={leaveOpen} timeout="auto" unmountOnExit>
//           <List component="div" disablePadding>
//             <ListItem
//               button
//               sx={{ pl: 4 }}
//               onClick={() => handleNavigation("/hrms/dashboardhr/leave-request")}
//               selected={isActive("/hrms/dashboardhr/leave-request")}
//             >
//               <ListItemText primary="Leave Request" />
//             </ListItem>

//             <ListItem
//               button
//               sx={{ pl: 4 }}
//               onClick={() => handleNavigation("/hrms/dashboardhr/leavetype")}
//               selected={isActive("/hrms/dashboardhr/leavetype")}
//             >
//               <ListItemText primary="Leave Type" />
//             </ListItem>

//           </List>
//         </Collapse>

//         {/* Policies */}
//         <ListItem
//           button
//           onClick={() => handleNavigation("/hrms/dashboardhr/policies")}
//           selected={isActive("/hrms/dashboardhr/policies")}
//         >
//           <ListItemIcon>
//             <QuestionAnswerIcon />
//           </ListItemIcon>
//           <ListItemText primary="Policies" />
//         </ListItem>

//  {/* Apps */}

//         <ListItem button onClick={handleAppsClick}>
//           <ListItemIcon>
//             <GroupIcon />
//           </ListItemIcon>
//           <ListItemText primary="Apps" />
//           {AppsOpen ? <ExpandLess /> : <ExpandMore />}
//         </ListItem>

//         <Collapse in={AppsOpen} timeout="auto" unmountOnExit>

//           <List component="div" disablePadding>

//             <ListItem
//               button
//               sx={{ pl: 4 }}
//               onClick={() => handleNavigation("/hrms/dashboardhr/eventshr")}
//               selected={isActive("/hrms/dashboardhr/eventshr")}
//             >
//               <ListItemText primary="Events" />
//             </ListItem>

//             <ListItem
//               button
//               sx={{ pl: 4 }}
//               onClick={() => handleNavigation("/hrms/dashboardhr/assesthr")}
//               selected={isActive("/hrms/dashboardhr/assesthr")}
//             >
//               <ListItemText primary="Assests" />
//             </ListItem>

//             <ListItem
//               button
//               sx={{ pl: 4 }}
//               onClick={() => handleNavigation("/hrms/dashboardhr/awardshr")}
//               selected={isActive("/hrms/dashboardhr/awardshr")}
//             >
//               <ListItemText primary="Awards" />
//             </ListItem>

//           </List>
//         </Collapse>

//     {/* Documents */}
//         <ListItem
//           button
//           onClick={() => handleNavigation("/hrms/dashboardhr/documenthr")}
//           selected={isActive("/hrms/dashboardhr/documenthr")}
//         >
//           <ListItemIcon>
//             <TopicIcon />
//           </ListItemIcon>
//           <ListItemText primary="Documents" />
//         </ListItem>


//         {/* Employee Confirmation */}
//         <ListItem
//           button
//           onClick={() => handleNavigation("/hrms/dashboardhr/confirmation")}
//           selected={isActive("/hrms/dashboardhr/confirmation")}
//         >
//           <ListItemIcon>
//             <TopicIcon />
//           </ListItemIcon>
//           <ListItemText primary="Employee Confirmation" />
//         </ListItem>

//     {/* Resignation */}
//     <ListItem
//           button
//           onClick={() => handleNavigation("/hrms/dashboardhr/resignationhr")}
//           selected={isActive("/hrms/dashboardhr/resignationhr")}
//         >
//           <ListItemIcon>
//             <PersonRemoveIcon />
//           </ListItemIcon>
//           <ListItemText primary="Resignation" />
//         </ListItem>


//         {/* Helpdesk */}
//         <ListItem
//           button
//           onClick={() => handleNavigation("/hrms/dashboardhr/helpdeskhr")}
//           selected={isActive("/hrms/dashboardhr/helpdeskhr")}
//         >
//           <ListItemIcon>
//             <HelpIcon />
//           </ListItemIcon>
//           <ListItemText primary="Helpdesk" />
//         </ListItem>



//         {/* Payroll */}
//         <ListItem
//           button
//           onClick={() => handleNavigation("/hrms/dashboardhr/payrollhr")}
//           selected={isActive("/hrms/dashboardhr/payrollhr")}
//         >
//           <ListItemIcon>
//             <PaymentIcon />
//           </ListItemIcon>
//           <ListItemText primary="Payroll" />
//         </ListItem>


//       </List>
//     </Drawer>
//   );
// }  ///// 


















// import React, { useState, useEffect } from "react";
// import {
//   Drawer,
//   List,
//   ListItem,
//   ListItemIcon,
//   ListItemText,
//   IconButton,
//   Divider,
//   Collapse,
//   Box,
//   CircularProgress, // Added for loading indicator
// } from "@mui/material";
// import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
// import HomeIcon from "@mui/icons-material/Home";
// import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
// import GroupIcon from "@mui/icons-material/Group";
// import WorkIcon from "@mui/icons-material/Work";
// import ExpandLess from "@mui/icons-material/ExpandLess";
// import ExpandMore from "@mui/icons-material/ExpandMore";
// import { useNavigate, useLocation } from "react-router-dom";
// import StarIcon from '@mui/icons-material/Star';
// import AssignmentIcon from '@mui/icons-material/Assignment';
// import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
// import HelpIcon from '@mui/icons-material/Help';
// // import PersonAddIcon from '@mui/icons-material/PersonAdd'; // This was unused
// import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
// import TopicIcon from '@mui/icons-material/Topic';
// import PaymentIcon from '@mui/icons-material/Payment';
// import RemoveIcon from "@mui/icons-material/Remove";
// import AddIcon from "@mui/icons-material/Add";
// // import BadgeIcon from '@mui/icons-material/Badge'; // This was unused

// export default function Sidebar({ open, toggleDrawer, drawerWidth }) {
//   const [attendanceOpen, setAttendanceOpen] = useState(false);
//   // const [addempOpen, setAddempOpen] = useState(false); // This was unused
//   const [leaveOpen, setLeaveOpen] = useState(false);
//   const [AppsOpen, setAppsOpen] = useState(false);
//   const navigate = useNavigate();
//   const location = useLocation();

//   // --- State for API-driven visibility (Integrated from the first example) ---
//   const [isLoading, setIsLoading] = useState(true);
//   // Condition 2 & 3: Is true only if policy status is 'Y'. Controls Attendance and Payroll.
//   const [showMenusForPolicyAck, setShowMenusForPolicyAck] = useState(false);
//   // Condition 1: Is true only if employee_confirm is 'N' or null.
//   const [showLeaveForConfirmationStatus, setShowLeaveForConfirmationStatus] = useState(false);


//   // --- useEffect for fetching API data (Integrated from the first example) ---
//   useEffect(() => {
//     // Note: Assuming the employee ID is stored under 'loggedInUser' for the HR dashboard as well.
//     // If it's stored under a different key, change "loggedInUser" accordingly.
//     const employeeId = localStorage.getItem("loggedInUser") || '';

//     if (!employeeId) {
//       console.error("Employee ID not found.");
//       setIsLoading(false);
//       return;
//     }

//     const fetchAllStatuses = async () => {
//       setIsLoading(true);
//       try {
//         const confirmationPromise = fetch(`https://tdtlworld.com/hrms-backend/EmpConfirmation/${employeeId}/`);
//         const policyAckPromise = fetch(`https://tdtlworld.com/hrms-backend/policy_ack/${employeeId}/`);

//         const [confirmationResponse, policyAckResponse] = await Promise.all([
//           confirmationPromise,
//           policyAckPromise
//         ]);

//         // --- Process Employee Confirmation (Condition 1) ---
//         // SHOW Leave Request if employee_confirm is 'N' or null. HIDE if 'Y'.
//         if (confirmationResponse.ok) {
//           const data = await confirmationResponse.json();
//           const confirmationData = Array.isArray(data) ? data[0] : data;
//           if (confirmationData && (confirmationData.employee_confirm === 'N' || confirmationData.employee_confirm === null)) {
//             setShowLeaveForConfirmationStatus(true);
//           } else {
//             setShowLeaveForConfirmationStatus(false);
//           }
//         } else {
//           console.error(`Confirmation API call failed: ${confirmationResponse.status}`);
//           setShowLeaveForConfirmationStatus(false);
//         }

//         // --- Process Policy Acknowledgment (Condition 2 & 3) ---
//         // SHOW Attendance & Payroll if status is 'Y'. HIDE if 'N' or null.
//         if (policyAckResponse.ok) {
//           const policyData = await policyAckResponse.json();
//           if (policyData && policyData.status === 'Y') {
//             setShowMenusForPolicyAck(true);
//           } else {
//             setShowMenusForPolicyAck(false);
//           }
//         } else {
//           console.error(`Policy Ack API call failed: ${policyAckResponse.status}`);
//           setShowMenusForPolicyAck(false);
//         }

//       } catch (error) {
//         console.error("Error fetching employee status data:", error);
//         setShowMenusForPolicyAck(false);
//         setShowLeaveForConfirmationStatus(false);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchAllStatuses();
//   }, []); // Empty array ensures this runs only once on mount


//   // --- Helper variable for combined leave conditions ---
//   const canShowLeaveMenu = showMenusForPolicyAck && showLeaveForConfirmationStatus;


//   const handleLeaveClick = () => {
//     setLeaveOpen(!leaveOpen);
//   };

//   const handleAttendanceClick = () => {
//     setAttendanceOpen(!attendanceOpen);
//   };

//   // const handleAddempClick = () => { // This was unused
//   //   setAddempOpen(!addempOpen);
//   // };

//   const handleAppsClick = () => {
//     setAppsOpen(!AppsOpen);
//   };

//   const handleNavigation = (route) => {
//     navigate(route);
//   };

//   const isActive = (route) => location.pathname === route;

//   return (
//     <Drawer
//       sx={{
//         width: drawerWidth,
//         flexShrink: 0,
//         "& .MuiDrawer-paper": {
//           width: drawerWidth,
//           boxSizing: "border-box",
//         },
//       }}
//       variant="persistent"
//       anchor="left"
//       open={open}
//     >
//       <Box
//         sx={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "flex-end",
//           p: 1,
//           minHeight: 64,
//         }}
//       >
//         <IconButton onClick={toggleDrawer}>
//           <ChevronLeftIcon />
//         </IconButton>
//       </Box>
//       <Divider />

//       {/* Show a spinner while fetching data */}
//       {isLoading && (
//         <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
//           <CircularProgress />
//         </Box>
//       )}

//       {/* Show menu items only after loading is complete */}
//       {!isLoading && (
//         <List>
//           {/* Home Item */}
//           <ListItem
//             button
//             onClick={() => handleNavigation("/hrms/dashboardhr/home")}
//             selected={isActive("/hrms/dashboardhr/home")}
//           >
//             <ListItemIcon><HomeIcon /></ListItemIcon>
//             <ListItemText primary="Home" />
//           </ListItem>
//             <ListItem
//           button
//           onClick={() => handleNavigation("/hrms/dashboardhr/add_employees")}
//           selected={isActive("/hrms/dashboardhr/add_employees")}
//         >
//           <ListItemIcon>
//            <AddIcon />
//           </ListItemIcon>
//           <ListItemText primary="Add New Employee" />
//         </ListItem>
//           <ListItem
//             button
//             onClick={() => handleNavigation("/hrms/dashboardhr/employeeExitMain")}
//             selected={isActive("/hrms/dashboardhr/employeeExitMain")}
//           >
//             <ListItemIcon><RemoveIcon /></ListItemIcon>
//             <ListItemText primary="Employee Exit Main" />
//           </ListItem>
        
//           {/* Attendance Dropdown (Conditionally Rendered) */}
//           {showMenusForPolicyAck && (
//             <>
//               <ListItem button onClick={handleAttendanceClick}>
//                 <ListItemIcon><CalendarTodayIcon /></ListItemIcon>
//                 <ListItemText primary="Attendance" />
//                 {attendanceOpen ? <ExpandLess /> : <ExpandMore />}
//               </ListItem>
//               <Collapse in={attendanceOpen} timeout="auto" unmountOnExit>
//                 <List component="div" disablePadding>
//                   <ListItem
//                     button
//                     sx={{ pl: 4 }}
//                     onClick={() => handleNavigation("/hrms/dashboardhr/attendance")}
//                     selected={isActive("/hrms/dashboardhr/attendance")}
//                   >
//                     <ListItemText primary="Attendance" />
//                   </ListItem>
//                   <ListItem
//                     button
//                     sx={{ pl: 4 }}
//                     onClick={() => handleNavigation("/hrms/dashboardhr/monthly-report")}
//                     selected={isActive("/hrms/dashboardhr/monthly-report")}
//                   >
//                     <ListItemText primary="Monthly Report" />
//                   </ListItem>
//                 </List>
//               </Collapse>
//             </>
//           )}

//           {/* Holiday */}
//           <ListItem
//             button
//             onClick={() => handleNavigation("/hrms/dashboardhr/holiday-view")}
//             selected={isActive("/hrms/dashboardhr/holiday-view")}
//           >
//             <ListItemIcon><StarIcon /></ListItemIcon>
//             <ListItemText primary="Holiday" />
//           </ListItem>

//           {/* Project */}
//           <ListItem
//             button
//             onClick={() => handleNavigation("/hrms/dashboardhr/projects")}
//             selected={isActive("/hrms/dashboardhr/projects")}
//           >
//             <ListItemIcon><AssignmentIcon /></ListItemIcon>
//             <ListItemText primary="Project" />
//           </ListItem>

//           {/* Task */}
//           <ListItem
//             button
//             onClick={() => handleNavigation("/hrms/dashboardhr/tasks")}
//             selected={isActive("/hrms/dashboardhr/tasks")}
//           >
//             <ListItemIcon><WorkIcon /></ListItemIcon>
//             <ListItemText primary="Task" />
//           </ListItem>

//           {/* Leave Request (Conditionally Rendered) */}
//           {canShowLeaveMenu && (
//             <>
//               <ListItem button onClick={handleLeaveClick}>
//                 <ListItemIcon><CalendarTodayIcon /></ListItemIcon>
//                 <ListItemText primary="Leave Request" />
//                 {leaveOpen ? <ExpandLess /> : <ExpandMore />}
//               </ListItem>
//               <Collapse in={leaveOpen} timeout="auto" unmountOnExit>
//                 <List component="div" disablePadding>
//                   <ListItem
//                     button
//                     sx={{ pl: 4 }}
//                     onClick={() => handleNavigation("/hrms/dashboardhr/leave-request")}
//                     selected={isActive("/hrms/dashboardhr/leave-request")}
//                   >
//                     <ListItemText primary="Leave Request" />
//                   </ListItem>
//                   <ListItem
//                     button
//                     sx={{ pl: 4 }}
//                     onClick={() => handleNavigation("/hrms/dashboardhr/leavetype")}
//                     selected={isActive("/hrms/dashboardhr/leavetype")}
//                   >
//                     <ListItemText primary="Leave Type" />
//                   </ListItem>
//                 </List>
//               </Collapse>
//             </>
//           )}

//           {/* Policies */}
//           <ListItem
//             button
//             onClick={() => handleNavigation("/hrms/dashboardhr/policies")}
//             selected={isActive("/hrms/dashboardhr/policies")}
//           >
//             <ListItemIcon><QuestionAnswerIcon /></ListItemIcon>
//             <ListItemText primary="Policies" />
//           </ListItem>


//            <ListItem
//             button
//             onClick={() => handleNavigation("/hrms/dashboardhr/MetricsForm")}
//             selected={isActive("/hrms/dashboardhr/MetricsForm")}
//           >
//             <ListItemIcon><QuestionAnswerIcon /></ListItemIcon>
//             <ListItemText primary="Metrics Form" />
//           </ListItem>

//           {/* Apps */}
//           <ListItem button onClick={handleAppsClick}>
//             <ListItemIcon><GroupIcon /></ListItemIcon>
//             <ListItemText primary="Apps" />
//             {AppsOpen ? <ExpandLess /> : <ExpandMore />}
//           </ListItem>
//           <Collapse in={AppsOpen} timeout="auto" unmountOnExit>
//             <List component="div" disablePadding>
//               <ListItem
//                 button
//                 sx={{ pl: 4 }}
//                 onClick={() => handleNavigation("/hrms/dashboardhr/eventshr")}
//                 selected={isActive("/hrms/dashboardhr/eventshr")}
//               >
//                 <ListItemText primary="Events" />
//               </ListItem>
//               <ListItem
//                 button
//                 sx={{ pl: 4 }}
//                 onClick={() => handleNavigation("/hrms/dashboardhr/assesthr")}
//                 selected={isActive("/hrms/dashboardhr/assesthr")}
//               >
//                 <ListItemText primary="Assests" />
//               </ListItem>
//               <ListItem
//                 button
//                 sx={{ pl: 4 }}
//                 onClick={() => handleNavigation("/hrms/dashboardhr/awardshr")}
//                 selected={isActive("/hrms/dashboardhr/awardshr")}
//               >
//                 <ListItemText primary="Awards" />
//               </ListItem>
//             </List>
//           </Collapse>

//           {/* Documents */}
//           <ListItem
//             button
//             onClick={() => handleNavigation("/hrms/dashboardhr/documenthr")}
//             selected={isActive("/hrms/dashboardhr/documenthr")}
//           >
//             <ListItemIcon><TopicIcon /></ListItemIcon>
//             <ListItemText primary="Documents" />
//           </ListItem>

//           {/* Employee Confirmation */}
//           <ListItem
//             button
//             onClick={() => handleNavigation("/hrms/dashboardhr/confirmation")}
//             selected={isActive("/hrms/dashboardhr/confirmation")}
//           >
//             <ListItemIcon><TopicIcon /></ListItemIcon>
//             <ListItemText primary="Employee Confirmation" />
//           </ListItem>

//           {/* Resignation */}
//           <ListItem
//             button
//             onClick={() => handleNavigation("/hrms/dashboardhr/resignationhr")}
//             selected={isActive("/hrms/dashboardhr/resignationhr")}
//           >
//             <ListItemIcon><PersonRemoveIcon /></ListItemIcon>
//             <ListItemText primary="Resignation" />
//           </ListItem>


//           {/* Payroll (Conditionally Rendered) */}
//           {showMenusForPolicyAck && (
//             <ListItem
//               button
//               onClick={() => handleNavigation("/hrms/dashboardhr/payrollhr")}
//               selected={isActive("/hrms/dashboardhr/payrollhr")}
//             >
//               <ListItemIcon><PaymentIcon /></ListItemIcon>
//               <ListItemText primary="Payroll" />
//             </ListItem>
//           )}



//           {/* Helpdesk */}
//           <ListItem
//             button
//             onClick={() => handleNavigation("/hrms/dashboardhr/helpdeskhr")}
//             selected={isActive("/hrms/dashboardhr/helpdeskhr")}
//           >
//             <ListItemIcon><HelpIcon /></ListItemIcon>
//             <ListItemText primary="Helpdesk" />
//           </ListItem>

//         </List>
//       )}
//     </Drawer>
//   );
// }













// import React, { useState, useEffect } from "react";
// import {
//   Drawer,
//   List,
//   ListItem,
//   ListItemIcon,
//   ListItemText,
//   IconButton,
//   Divider,
//   Collapse,
//   Box,
//   CircularProgress,
// } from "@mui/material";
// import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
// import HomeIcon from "@mui/icons-material/Home";
// import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
// import GroupIcon from "@mui/icons-material/Group";
// import WorkIcon from "@mui/icons-material/Work";
// import ExpandLess from "@mui/icons-material/ExpandLess";
// import ExpandMore from "@mui/icons-material/ExpandMore";
// import { useNavigate, useLocation } from "react-router-dom";
// import StarIcon from '@mui/icons-material/Star';
// import AssignmentIcon from '@mui/icons-material/Assignment';
// import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
// import HelpIcon from '@mui/icons-material/Help';
// import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
// import TopicIcon from '@mui/icons-material/Topic';
// import PaymentIcon from '@mui/icons-material/Payment';
// import RemoveIcon from "@mui/icons-material/Remove";
// import AddIcon from "@mui/icons-material/Add";
// import MenuIcon from "@mui/icons-material/Menu"; // Added for the toggle button

// // --- Style Definitions (Copied from the first example) ---
// const primaryOrange = "#F58E35";
// const accentWhite = "#FFFFFF";
// const defaultTextAndIconsColor = "#FFFFFF";
// const hoverBackground = "rgba(255, 255, 255, 0.2)";

// const listItemStyles = {
//   color: defaultTextAndIconsColor,
//   "& .MuiListItemIcon-root": {
//     color: defaultTextAndIconsColor,
//   },
//   "& .MuiListItemText-primary": {
//     fontWeight: "bold",
//   },
//   transition: "background-color 0.2s ease, color 0.2s ease",
//   borderRadius: 1,
//   "&:hover": {
//     backgroundColor: hoverBackground,
//   },
//   "&.Mui-selected": {
//     backgroundColor: accentWhite,
//     color: primaryOrange,
//     "& .MuiListItemIcon-root": {
//       color: primaryOrange,
//     },
//     "&:hover": {
//       backgroundColor: accentWhite,
//     },
//   },
// };

// export default function Sidebar({ open, toggleDrawer, drawerWidth }) {
//   // --- Refactored State Management (from the first example) ---
//   const [openMenu, setOpenMenu] = useState(null);
//   const navigate = useNavigate();
//   const location = useLocation();

//   // --- State for API-driven visibility (Preserved from the original second example) ---
//   const [isLoading, setIsLoading] = useState(true);
//   const [showMenusForPolicyAck, setShowMenusForPolicyAck] = useState(false);
//   const [showLeaveForConfirmationStatus, setShowLeaveForConfirmationStatus] = useState(false);

//   // --- useEffect for fetching API data (Preserved from the original second example) ---
//   useEffect(() => {
//     const employeeId = localStorage.getItem("loggedInUser") || '';

//     if (!employeeId) {
//       console.error("Employee ID not found.");
//       setIsLoading(false);
//       return;
//     }

//     const fetchAllStatuses = async () => {
//       setIsLoading(true);
//       try {
//         const [confirmationResponse, policyAckResponse] = await Promise.all([
//           fetch(`https://tdtlworld.com/hrms-backend/EmpConfirmation/${employeeId}/`),
//           fetch(`https://tdtlworld.com/hrms-backend/policy_ack/${employeeId}/`)
//         ]);

//         if (confirmationResponse.ok) {
//           const data = await confirmationResponse.json();
//           const confirmationData = Array.isArray(data) ? data[0] : data;
//           setShowLeaveForConfirmationStatus(
//             !confirmationData || confirmationData.employee_confirm === "N" || confirmationData.employee_confirm === null
//           );
//         } else {
//           console.error(`Confirmation API call failed: ${confirmationResponse.status}`);
//           setShowLeaveForConfirmationStatus(false);
//         }

//         if (policyAckResponse.ok) {
//           const policyData = await policyAckResponse.json();
//           setShowMenusForPolicyAck(policyData && policyData.status === 'Y');
//         } else {
//           console.error(`Policy Ack API call failed: ${policyAckResponse.status}`);
//           setShowMenusForPolicyAck(false);
//         }

//       } catch (error) {
//         console.error("Error fetching employee status data:", error);
//         setShowMenusForPolicyAck(false);
//         setShowLeaveForConfirmationStatus(false);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchAllStatuses();
//   }, []);

//   // --- useEffect for setting active menu (from the first example) ---
//   useEffect(() => {
//     const currentPath = location.pathname;
//     const attendanceRoutes = ["/hrms/dashboardhr/attendance", "/hrms/dashboardhr/monthly-report"];
//     const leaveRoutes = ["/hrms/dashboardhr/leave-request", "/hrms/dashboardhr/leavetype"];
//     const appRoutes = ["/hrms/dashboardhr/eventshr", "/hrms/dashboardhr/assesthr", "/hrms/dashboardhr/awardshr"];

//     if (attendanceRoutes.includes(currentPath)) setOpenMenu("attendance");
//     else if (leaveRoutes.includes(currentPath)) setOpenMenu("leave");
//     else if (appRoutes.includes(currentPath)) setOpenMenu("apps");
//   }, [location.pathname]);

//   // --- Refactored Click Handler ---
//   const handleMenuClick = (menuName) => {
//     setOpenMenu((prevOpenMenu) => (prevOpenMenu === menuName ? null : menuName));
//   };

//   const handleNavigation = (route) => navigate(route);
//   const isActive = (route) => location.pathname === route;

//   const canShowLeaveMenu = showMenusForPolicyAck && showLeaveForConfirmationStatus;

//   return (
//     <>
//       <Drawer
//         sx={{
//           width: drawerWidth,
//           flexShrink: 0,
//           "& .MuiDrawer-paper": {
//             width: drawerWidth,
//             boxSizing: "border-box",
//             backgroundColor: primaryOrange,      // Applied style
//             color: defaultTextAndIconsColor,  // Applied style
//           },
//         }}
//         variant="persistent"
//         anchor="left"
//         open={open}
//       >
//         <Box sx={{ minHeight: 64 }} /> {/* Spacer for AppBar */}
//         <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.3)" }} />

//         {isLoading && (
//           <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
//             <CircularProgress sx={{ color: defaultTextAndIconsColor }} />
//           </Box>
//         )}

//         {!isLoading && (
//           <List sx={{ p: 1, "& .MuiListItemText-primary": { fontWeight: "bold" } }}>
//             <ListItem button onClick={() => handleNavigation("/hrms/dashboardhr/home")} selected={isActive("/hrms/dashboardhr/home")} sx={listItemStyles}>
//               <ListItemIcon><HomeIcon /></ListItemIcon>
//               <ListItemText primary="Home" />
//             </ListItem>

//             <ListItem button onClick={() => handleNavigation("/hrms/dashboardhr/add_employees")} selected={isActive("/hrms/dashboardhr/add_employees")} sx={listItemStyles}>
//               <ListItemIcon><AddIcon /></ListItemIcon>
//               <ListItemText primary="Add New Employee" />
//             </ListItem>

//             <ListItem button onClick={() => handleNavigation("/hrms/dashboardhr/employeeExitMain")} selected={isActive("/hrms/dashboardhr/employeeExitMain")} sx={listItemStyles}>
//               <ListItemIcon><RemoveIcon /></ListItemIcon>
//               <ListItemText primary="Employee Exit " />
//             </ListItem>

//             {showMenusForPolicyAck && (
//               <>
//                 <ListItem button onClick={() => handleMenuClick("attendance")} sx={listItemStyles}>
//                   <ListItemIcon><CalendarTodayIcon /></ListItemIcon>
//                   <ListItemText primary="Attendance" />
//                   {openMenu === "attendance" ? <ExpandLess /> : <ExpandMore />}
//                 </ListItem>
//                 <Collapse in={openMenu === "attendance"} timeout="auto" unmountOnExit>
//                   <List component="div" disablePadding>
//                     <ListItem button sx={{ ...listItemStyles, pl: 4 }} onClick={() => handleNavigation("/hrms/dashboardhr/attendance")} selected={isActive("/hrms/dashboardhr/attendance")}>
//                       <ListItemText primary="Attendance" />
//                     </ListItem>
//                     <ListItem button sx={{ ...listItemStyles, pl: 4 }} onClick={() => handleNavigation("/hrms/dashboardhr/monthly-report")} selected={isActive("/hrms/dashboardhr/monthly-report")}>
//                       <ListItemText primary="Monthly Report" />
//                     </ListItem>
//                   </List>
//                 </Collapse>
//               </>
//             )}

//             <ListItem button onClick={() => handleNavigation("/hrms/dashboardhr/holiday-view")} selected={isActive("/hrms/dashboardhr/holiday-view")} sx={listItemStyles}>
//               <ListItemIcon><StarIcon /></ListItemIcon>
//               <ListItemText primary="Holiday" />
//             </ListItem>

//             <ListItem button onClick={() => handleNavigation("/hrms/dashboardhr/projects")} selected={isActive("/hrms/dashboardhr/projects")} sx={listItemStyles}>
//               <ListItemIcon><AssignmentIcon /></ListItemIcon>
//               <ListItemText primary="Project" />
//             </ListItem>

//             <ListItem button onClick={() => handleNavigation("/hrms/dashboardhr/tasks")} selected={isActive("/hrms/dashboardhr/tasks")} sx={listItemStyles}>
//               <ListItemIcon><WorkIcon /></ListItemIcon>
//               <ListItemText primary="Task" />
//             </ListItem>

//             {canShowLeaveMenu && (
//               <>
//                 <ListItem button onClick={() => handleMenuClick("leave")} sx={listItemStyles}>
//                   <ListItemIcon><CalendarTodayIcon /></ListItemIcon>
//                   <ListItemText primary="Leave Request" />
//                   {openMenu === "leave" ? <ExpandLess /> : <ExpandMore />}
//                 </ListItem>
//                 <Collapse in={openMenu === "leave"} timeout="auto" unmountOnExit>
//                   <List component="div" disablePadding>
//                     <ListItem button sx={{ ...listItemStyles, pl: 4 }} onClick={() => handleNavigation("/hrms/dashboardhr/leave-request")} selected={isActive("/hrms/dashboardhr/leave-request")}>
//                       <ListItemText primary="Leave Request" />
//                     </ListItem>
//                     <ListItem button sx={{ ...listItemStyles, pl: 4 }} onClick={() => handleNavigation("/hrms/dashboardhr/leavetype")} selected={isActive("/hrms/dashboardhr/leavetype")}>
//                       <ListItemText primary="Leave Type" />
//                     </ListItem>
//                   </List>
//                 </Collapse>
//               </>
//             )}

//             <ListItem button onClick={() => handleNavigation("/hrms/dashboardhr/policies")} selected={isActive("/hrms/dashboardhr/policies")} sx={listItemStyles}>
//               <ListItemIcon><QuestionAnswerIcon /></ListItemIcon>
//               <ListItemText primary="Policies" />
//             </ListItem>

//             <ListItem button onClick={() => handleNavigation("/hrms/dashboardhr/MetricsForm")} selected={isActive("/hrms/dashboardhr/MetricsForm")} sx={listItemStyles}>
//               <ListItemIcon><QuestionAnswerIcon /></ListItemIcon>
//               <ListItemText primary="Metrics Form" />
//             </ListItem>

//             <ListItem button onClick={() => handleMenuClick("apps")} sx={listItemStyles}>
//               <ListItemIcon><GroupIcon /></ListItemIcon>
//               <ListItemText primary="Apps" />
//               {openMenu === "apps" ? <ExpandLess /> : <ExpandMore />}
//             </ListItem>
//             <Collapse in={openMenu === "apps"} timeout="auto" unmountOnExit>
//               <List component="div" disablePadding>
//                 <ListItem button sx={{ ...listItemStyles, pl: 4 }} onClick={() => handleNavigation("/hrms/dashboardhr/eventshr")} selected={isActive("/hrms/dashboardhr/eventshr")}>
//                   <ListItemText primary="Events" />
//                 </ListItem>
//                 <ListItem button sx={{ ...listItemStyles, pl: 4 }} onClick={() => handleNavigation("/hrms/dashboardhr/assesthr")} selected={isActive("/hrms/dashboardhr/assesthr")}>
//                   <ListItemText primary="Assests" />
//                 </ListItem>
//                 <ListItem button sx={{ ...listItemStyles, pl: 4 }} onClick={() => handleNavigation("/hrms/dashboardhr/awardshr")} selected={isActive("/hrms/dashboardhr/awardshr")}>
//                   <ListItemText primary="Awards" />
//                 </ListItem>
//               </List>
//             </Collapse>

//             <ListItem button onClick={() => handleNavigation("/hrms/dashboardhr/documenthr")} selected={isActive("/hrms/dashboardhr/documenthr")} sx={listItemStyles}>
//               <ListItemIcon><TopicIcon /></ListItemIcon>
//               <ListItemText primary="Documents" />
//             </ListItem>

//             <ListItem button onClick={() => handleNavigation("/hrms/dashboardhr/confirmation")} selected={isActive("/hrms/dashboardhr/confirmation")} sx={listItemStyles}>
//               <ListItemIcon><TopicIcon /></ListItemIcon>
//               <ListItemText primary="Employee Confirmation" />
//             </ListItem>

//             <ListItem button onClick={() => handleNavigation("/hrms/dashboardhr/resignationhr")} selected={isActive("/hrms/dashboardhr/resignationhr")} sx={listItemStyles}>
//               <ListItemIcon><PersonRemoveIcon /></ListItemIcon>
//               <ListItemText primary="Resignation" />
//             </ListItem>

//             {showMenusForPolicyAck && (
//               <ListItem button onClick={() => handleNavigation("/hrms/dashboardhr/payrollhr")} selected={isActive("/hrms/dashboardhr/payrollhr")} sx={listItemStyles}>
//                 <ListItemIcon><PaymentIcon /></ListItemIcon>
//                 <ListItemText primary="Payroll" />
//               </ListItem>
//             )}

//             <ListItem button onClick={() => handleNavigation("/hrms/dashboardhr/helpdeskhr")} selected={isActive("/hrms/dashboardhr/helpdeskhr")} sx={listItemStyles}>
//               <ListItemIcon><HelpIcon /></ListItemIcon>
//               <ListItemText primary="Helpdesk" />
//             </ListItem>
//           </List>
//         )}
//       </Drawer>

//       {/* --- Floating Toggle Button (from the first example) --- */}
//       <IconButton
//         onClick={toggleDrawer}
//         sx={{
//           position: "fixed",
//           top: 80,
//           left: open ? `${drawerWidth}px` : 0,
//           backgroundColor: primaryOrange,
//           color: accentWhite,
//           "&:hover": { backgroundColor: "#e0792d" },
//           zIndex: (theme) => theme.zIndex.drawer + 1,
//           transition: (theme) => theme.transitions.create("left", {
//             easing: theme.transitions.easing.sharp,
//             duration: theme.transitions.duration.leavingScreen,
//           }),
//           borderTopLeftRadius: 0,
//           borderBottomLeftRadius: 0,
//           borderTopRightRadius: 16,
//           borderBottomRightRadius: 16,
//           p: 1,
//         }}
//       >
//         {open ? <ChevronLeftIcon /> : <MenuIcon />}
//       </IconButton>
//     </>
//   );
// }





import React, { useState, useEffect } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Divider,
  Collapse,
  Box,
  CircularProgress,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import HomeIcon from "@mui/icons-material/Home";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import GroupIcon from "@mui/icons-material/Group";
import WorkIcon from "@mui/icons-material/Work";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { useNavigate, useLocation } from "react-router-dom";
import StarIcon from '@mui/icons-material/Star';
import AssignmentIcon from '@mui/icons-material/Assignment';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import HelpIcon from '@mui/icons-material/Help';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import TopicIcon from '@mui/icons-material/Topic';
import PaymentIcon from '@mui/icons-material/Payment';
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import MenuIcon from "@mui/icons-material/Menu"; // Added for the toggle button

// --- Style Definitions (Copied from the first example) ---
const primaryOrange = "#F58E35";
const accentWhite = "#FFFFFF";
const defaultTextAndIconsColor = "#FFFFFF";
const hoverBackground = "rgba(255, 255, 255, 0.2)";

const listItemStyles = {
  color: defaultTextAndIconsColor,
  "& .MuiListItemIcon-root": {
    color: defaultTextAndIconsColor,
  },
  "& .MuiListItemText-primary": {
    fontWeight: "bold",
  },
  transition: "background-color 0.2s ease, color 0.2s ease",
  borderRadius: 1,
  "&:hover": {
    backgroundColor: hoverBackground,
  },
  "&.Mui-selected": {
    backgroundColor: accentWhite,
    color: primaryOrange,
    "& .MuiListItemIcon-root": {
      color: primaryOrange,
    },
    "&:hover": {
      backgroundColor: accentWhite,
    },
  },
};

export default function Sidebar({ open, toggleDrawer, drawerWidth }) {
  // --- Refactored State Management (from the first example) ---
  const [openMenu, setOpenMenu] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // --- State for API-driven visibility (Preserved from the original second example) ---
  const [isLoading, setIsLoading] = useState(true);
  const [showMenusForPolicyAck, setShowMenusForPolicyAck] = useState(false);
  const [showLeaveForConfirmationStatus, setShowLeaveForConfirmationStatus] = useState(false);

  // --- useEffect for fetching API data (Preserved from the original second example) ---
  useEffect(() => {
    const employeeId = localStorage.getItem("loggedInUser") || '';

    if (!employeeId) {
      console.error("Employee ID not found.");
      setIsLoading(false);
      return;
    }

    const fetchAllStatuses = async () => {
      setIsLoading(true);
      try {
        const [confirmationResponse, policyAckResponse] = await Promise.all([
          fetch(`https://tdtlworld.com/hrms-backend/EmpConfirmation/${employeeId}/`),
          fetch(`https://tdtlworld.com/hrms-backend/policy_ack/${employeeId}/`)
        ]);

        if (confirmationResponse.ok) {
          const data = await confirmationResponse.json();
          const confirmationData = Array.isArray(data) ? data[0] : data;
          setShowLeaveForConfirmationStatus(
            !confirmationData || confirmationData.employee_confirm === "N" || confirmationData.employee_confirm === null
          );
        } else {
          console.error(`Confirmation API call failed: ${confirmationResponse.status}`);
          setShowLeaveForConfirmationStatus(false);
        }

        if (policyAckResponse.ok) {
          const policyData = await policyAckResponse.json();
          setShowMenusForPolicyAck(policyData && policyData.status === 'Y');
        } else {
          console.error(`Policy Ack API call failed: ${policyAckResponse.status}`);
          setShowMenusForPolicyAck(false);
        }

      } catch (error) {
        console.error("Error fetching employee status data:", error);
        setShowMenusForPolicyAck(false);
        setShowLeaveForConfirmationStatus(false);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllStatuses();
  }, []);

  // --- useEffect for setting active menu (from the first example) ---
  useEffect(() => {
    const currentPath = location.pathname;
    const attendanceRoutes = ["/hrms/dashboardhr/attendance", "/hrms/dashboardhr/monthly-report"];
    const leaveRoutes = ["/hrms/dashboardhr/leave-request", "/hrms/dashboardhr/leavetype"];
    const appRoutes = ["/hrms/dashboardhr/eventshr", "/hrms/dashboardhr/assesthr", "/hrms/dashboardhr/awardshr"];

    if (attendanceRoutes.includes(currentPath)) setOpenMenu("attendance");
    else if (leaveRoutes.includes(currentPath)) setOpenMenu("leave");
    else if (appRoutes.includes(currentPath)) setOpenMenu("apps");
  }, [location.pathname]);

  // --- Refactored Click Handler ---
  const handleMenuClick = (menuName) => {
    setOpenMenu((prevOpenMenu) => (prevOpenMenu === menuName ? null : menuName));
  };

  const handleNavigation = (route) => navigate(route);
  const isActive = (route) => location.pathname === route;

  const canShowLeaveMenu = showMenusForPolicyAck && showLeaveForConfirmationStatus;

  return (
    <>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: primaryOrange,      // Applied style
            color: defaultTextAndIconsColor,  // Applied style
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <Box sx={{ minHeight: 64 }} /> {/* Spacer for AppBar */}
        <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.3)" }} />

        {isLoading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
            <CircularProgress sx={{ color: defaultTextAndIconsColor }} />
          </Box>
        )}

        {!isLoading && (
          <List sx={{ p: 1, "& .MuiListItemText-primary": { fontWeight: "bold" } }}>
            <ListItem button onClick={() => handleNavigation("/hrms/dashboardhr/home")} selected={isActive("/hrms/dashboardhr/home")} sx={listItemStyles}>
              <ListItemIcon><HomeIcon /></ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>

            <ListItem button onClick={() => handleNavigation("/hrms/dashboardhr/add_employees")} selected={isActive("/hrms/dashboardhr/add_employees")} sx={listItemStyles}>
              <ListItemIcon><AddIcon /></ListItemIcon>
              <ListItemText primary="Add New Employee" />
            </ListItem>

            <ListItem button onClick={() => handleNavigation("/hrms/dashboardhr/employeeExitMain")} selected={isActive("/hrms/dashboardhr/employeeExitMain")} sx={listItemStyles}>
              <ListItemIcon><RemoveIcon /></ListItemIcon>
              <ListItemText primary="Employee Exit " />
            </ListItem>

            {showMenusForPolicyAck && (
              <>
                <ListItem button onClick={() => handleMenuClick("attendance")} sx={listItemStyles}>
                  <ListItemIcon><CalendarTodayIcon /></ListItemIcon>
                  <ListItemText primary="Attendance" />
                  {openMenu === "attendance" ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={openMenu === "attendance"} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <ListItem button sx={{ ...listItemStyles, pl: 4 }} onClick={() => handleNavigation("/hrms/dashboardhr/attendance")} selected={isActive("/hrms/dashboardhr/attendance")}>
                      <ListItemText primary="Attendance" />
                    </ListItem>
                    <ListItem button sx={{ ...listItemStyles, pl: 4 }} onClick={() => handleNavigation("/hrms/dashboardhr/monthly-report")} selected={isActive("/hrms/dashboardhr/monthly-report")}>
                      <ListItemText primary="Monthly Report" />
                    </ListItem>
                  </List>
                </Collapse>
              </>
            )}

            <ListItem button onClick={() => handleNavigation("/hrms/dashboardhr/holiday-view")} selected={isActive("/hrms/dashboardhr/holiday-view")} sx={listItemStyles}>
              <ListItemIcon><StarIcon /></ListItemIcon>
              <ListItemText primary="Holiday" />
            </ListItem>

            <ListItem button onClick={() => handleNavigation("/hrms/dashboardhr/revenue-expense")} selected={isActive("/hrms/dashboardhr/revenue-expense")} sx={listItemStyles}>
              <ListItemIcon><PaymentIcon /></ListItemIcon>
              <ListItemText primary="Revenue & Expense" />
            </ListItem>

            <ListItem button onClick={() => handleNavigation("/hrms/dashboardhr/projects")} selected={isActive("/hrms/dashboardhr/projects")} sx={listItemStyles}>
              <ListItemIcon><AssignmentIcon /></ListItemIcon>
              <ListItemText primary="Project" />
            </ListItem>

            <ListItem button onClick={() => handleNavigation("/hrms/dashboardhr/tasks")} selected={isActive("/hrms/dashboardhr/tasks")} sx={listItemStyles}>
              <ListItemIcon><WorkIcon /></ListItemIcon>
              <ListItemText primary="Task" />
            </ListItem>

            {canShowLeaveMenu && (
              <>
                <ListItem button onClick={() => handleMenuClick("leave")} sx={listItemStyles}>
                  <ListItemIcon><CalendarTodayIcon /></ListItemIcon>
                  <ListItemText primary="Leave Request" />
                  {openMenu === "leave" ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={openMenu === "leave"} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <ListItem button sx={{ ...listItemStyles, pl: 4 }} onClick={() => handleNavigation("/hrms/dashboardhr/leave-request")} selected={isActive("/hrms/dashboardhr/leave-request")}>
                      <ListItemText primary="Leave Request" />
                    </ListItem>
                    <ListItem button sx={{ ...listItemStyles, pl: 4 }} onClick={() => handleNavigation("/hrms/dashboardhr/leavetype")} selected={isActive("/hrms/dashboardhr/leavetype")}>
                      <ListItemText primary="Leave Type" />
                    </ListItem>
                  </List>
                </Collapse>
              </>
            )}

            <ListItem button onClick={() => handleNavigation("/hrms/dashboardhr/policies")} selected={isActive("/hrms/dashboardhr/policies")} sx={listItemStyles}>
              <ListItemIcon><QuestionAnswerIcon /></ListItemIcon>
              <ListItemText primary="Policies" />
            </ListItem>

            <ListItem button onClick={() => handleNavigation("/hrms/dashboardhr/MetricsForm")} selected={isActive("/hrms/dashboardhr/MetricsForm")} sx={listItemStyles}>
              <ListItemIcon><QuestionAnswerIcon /></ListItemIcon>
              <ListItemText primary="Metrics Form" />
            </ListItem>

            <ListItem button onClick={() => handleMenuClick("apps")} sx={listItemStyles}>
              <ListItemIcon><GroupIcon /></ListItemIcon>
              <ListItemText primary="Apps" />
              {openMenu === "apps" ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={openMenu === "apps"} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem button sx={{ ...listItemStyles, pl: 4 }} onClick={() => handleNavigation("/hrms/dashboardhr/eventshr")} selected={isActive("/hrms/dashboardhr/eventshr")}>
                  <ListItemText primary="Events" />
                </ListItem>
                <ListItem button sx={{ ...listItemStyles, pl: 4 }} onClick={() => handleNavigation("/hrms/dashboardhr/assesthr")} selected={isActive("/hrms/dashboardhr/assesthr")}>
                  <ListItemText primary="Assests" />
                </ListItem>
                <ListItem button sx={{ ...listItemStyles, pl: 4 }} onClick={() => handleNavigation("/hrms/dashboardhr/awardshr")} selected={isActive("/hrms/dashboardhr/awardshr")}>
                  <ListItemText primary="Awards" />
                </ListItem>
              </List>
            </Collapse>

            <ListItem button onClick={() => handleNavigation("/hrms/dashboardhr/documenthr")} selected={isActive("/hrms/dashboardhr/documenthr")} sx={listItemStyles}>
              <ListItemIcon><TopicIcon /></ListItemIcon>
              <ListItemText primary="Documents" />
            </ListItem>

            <ListItem button onClick={() => handleNavigation("/hrms/dashboardhr/confirmation")} selected={isActive("/hrms/dashboardhr/confirmation")} sx={listItemStyles}>
              <ListItemIcon><TopicIcon /></ListItemIcon>
              <ListItemText primary="Employee Confirmation" />
            </ListItem>

            <ListItem button onClick={() => handleNavigation("/hrms/dashboardhr/resignationhr")} selected={isActive("/hrms/dashboardhr/resignationhr")} sx={listItemStyles}>
              <ListItemIcon><PersonRemoveIcon /></ListItemIcon>
              <ListItemText primary="Resignation" />
            </ListItem>

            {showMenusForPolicyAck && (
              <ListItem button onClick={() => handleNavigation("/hrms/dashboardhr/payrollhr")} selected={isActive("/hrms/dashboardhr/payrollhr")} sx={listItemStyles}>
                <ListItemIcon><PaymentIcon /></ListItemIcon>
                <ListItemText primary="Payroll" />
              </ListItem>
            )}

            <ListItem button onClick={() => handleNavigation("/hrms/dashboardhr/helpdeskhr")} selected={isActive("/hrms/dashboardhr/helpdeskhr")} sx={listItemStyles}>
              <ListItemIcon><HelpIcon /></ListItemIcon>
              <ListItemText primary="Helpdesk" />
            </ListItem>
          </List>
        )}
      </Drawer>

      {/* --- Floating Toggle Button (from the first example) --- */}
      <IconButton
        onClick={toggleDrawer}
        sx={{
          position: "fixed",
          top: 80,
          left: open ? `${drawerWidth}px` : 0,
          backgroundColor: primaryOrange,
          color: accentWhite,
          "&:hover": { backgroundColor: "#e0792d" },
          zIndex: (theme) => theme.zIndex.drawer + 1,
          transition: (theme) => theme.transitions.create("left", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
          borderTopRightRadius: 16,
          borderBottomRightRadius: 16,
          p: 1,
        }}
      >
        {open ? <ChevronLeftIcon /> : <MenuIcon />}
      </IconButton>
    </>
  );
}