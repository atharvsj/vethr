// // import React, { useState } from "react";
// // import {
// //   Drawer,
// //   List,
// //   ListItem,
// //   ListItemIcon,
// //   ListItemText,
// //   IconButton,
// //   Divider,
// //   Collapse,
// //   Box,
// // } from "@mui/material";
// // import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
// // import HomeIcon from "@mui/icons-material/Home";
// // import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
// // import GroupIcon from "@mui/icons-material/Group";
// // import WorkIcon from "@mui/icons-material/Work";
// // import ExpandLess from "@mui/icons-material/ExpandLess";
// // import ExpandMore from "@mui/icons-material/ExpandMore";
// // import { useNavigate, useLocation } from "react-router-dom";
// // import StarIcon from '@mui/icons-material/Star';
// // import AssignmentIcon from '@mui/icons-material/Assignment';
// // import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
// // import HelpIcon from '@mui/icons-material/Help';
// // import PersonAddIcon from '@mui/icons-material/PersonAdd';
// // import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
// // import TopicIcon from '@mui/icons-material/Topic';
// // import PaymentIcon from '@mui/icons-material/Payment';
// // import EqualizerIcon from '@mui/icons-material/Equalizer';

// // export default function Sidebar({ open, toggleDrawer, drawerWidth }) {
// //   // Single state to manage which menu is open
// //   const [openMenu, setOpenMenu] = useState(null);
  
// //   const navigate = useNavigate();
// //   const location = useLocation(); 

// //   // Unified handler for all top-level menus
// //   const handleMenuClick = (menuName) => {
// //     // If the clicked menu is already open, close it. Otherwise, open the new one.
// //     setOpenMenu(prevOpenMenu => (prevOpenMenu === menuName ? null : menuName));
// //   };

// //   const handleNavigation = (route) => {
// //     navigate(route);
// //   };

// //   // Function to check if the current route matches the section for active state
// //   const isActive = (route) => location.pathname === route;

// //   return (
// //     <Drawer
// //       sx={{
// //         width: drawerWidth,
// //         flexShrink: 0,
// //         "& .MuiDrawer-paper": {
// //           width: drawerWidth,
// //           boxSizing: "border-box",
// //         },
// //       }}
// //       variant="persistent"
// //       anchor="left"
// //       open={open}
// //     >
// //       <Box
// //         sx={{
// //           display: "flex",
// //           alignItems: "center",
// //           justifyContent: "flex-end",
// //           p: 1,
// //           minHeight: 64,
// //         }}
// //       >
// //         <IconButton onClick={toggleDrawer}>
// //           <ChevronLeftIcon />
// //         </IconButton>
// //       </Box>
// //       <Divider />
// //       <List>
// //         {/* Home Item */}
// //         <ListItem
// //           button
// //           onClick={() => handleNavigation("/hrms/dashboardHead/home")}
// //           selected={isActive("/hrms/dashboardHead/home")}
// //         >
// //           <ListItemIcon>
// //             <HomeIcon />
// //           </ListItemIcon>
// //           <ListItemText primary="Home" />
// //         </ListItem>
        
// //         {/* Attendance Dropdown */}
// //         <ListItem button onClick={() => handleMenuClick('attendance')}>
// //           <ListItemIcon>
// //             <CalendarTodayIcon />
// //           </ListItemIcon>
// //           <ListItemText primary="Attendance" />
// //           {openMenu === 'attendance' ? <ExpandLess /> : <ExpandMore />}
// //         </ListItem>
// //         <Collapse in={openMenu === 'attendance'} timeout="auto" unmountOnExit>
// //           <List component="div" disablePadding>
// //             <ListItem
// //               button
// //               sx={{ pl: 4 }}
// //               onClick={() => handleNavigation("/hrms/dashboardHead/attendance")}
// //               selected={isActive("/hrms/dashboardHead/attendance")}
// //             >
// //               <ListItemText primary="Attendance" />
// //             </ListItem>
            
// //             <ListItem
// //               button
// //               sx={{ pl: 4 }}
// //               onClick={() => handleNavigation("/hrms/dashboardHead/monthly-report")}
// //               selected={isActive("/hrms/dashboardHead/monthly-report")}
// //             >
// //               <ListItemText primary="Monthly Report" />
// //             </ListItem>
           
// //           </List>
// //         </Collapse>
        
// //         {/* Holiday */}
// //         <ListItem
// //           button
// //           onClick={() => handleNavigation("/hrms/dashboardHead/holiday")}
// //           selected={isActive("/hrms/dashboardHead/holiday")}
// //         >
// //           <ListItemIcon>
// //             <StarIcon />
// //           </ListItemIcon>
// //           <ListItemText primary="Holiday" />
// //         </ListItem>

// //         {/* Leave Request Dropdown */}
// //         <ListItem button onClick={() => handleMenuClick('leave')}>
// //           <ListItemIcon>
// //             <CalendarTodayIcon />
// //           </ListItemIcon>
// //           <ListItemText primary="Leave Request" />
// //           {openMenu === 'leave' ? <ExpandLess /> : <ExpandMore />}
// //         </ListItem>
// //         <Collapse in={openMenu === 'leave'} timeout="auto" unmountOnExit>
// //           <List component="div" disablePadding>
// //             <ListItem
// //               button
// //               sx={{ pl: 4 }}
// //               onClick={() => handleNavigation("/hrms/dashboardHead/leave-request")}
// //               selected={isActive("/hrms/dashboardHead/leave-request")}
// //             >
// //               <ListItemText primary="Leave Request" />
// //             </ListItem>
            
// //             <ListItem
// //               button
// //               sx={{ pl: 4 }}
// //               onClick={() => handleNavigation("/hrms/dashboardHead/leavetype")}
// //               selected={isActive("/hrms/dashboardHead/leavetype")}
// //             >
// //               <ListItemText primary="Leave Type" />
// //             </ListItem>
           
// //           </List>
// //         </Collapse>

// //         <ListItem 
// //         button
// //          onClick={() => handleNavigation("/hrms/dashboardHead/performanceTable")} 
// //          selected={isActive("/hrms/dashboardHead/performanceTable")}
// //          >
// //           <ListItemIcon>
// //             <EqualizerIcon />
// //           </ListItemIcon>

// //                               <ListItemText primary="Performance Table" />
// //                             </ListItem>

// //         {/* Policies */}
// //         <ListItem
// //           button
// //           onClick={() => handleNavigation("/hrms/dashboardHead/policies")}
// //           selected={isActive("/hrms/dashboardHead/policies")}
// //         >
// //           <ListItemIcon>
// //             <QuestionAnswerIcon />
// //           </ListItemIcon>
// //           <ListItemText primary="Policies" />
// //         </ListItem>

// //         {/* Apps Dropdown */}
// //         <ListItem button onClick={() => handleMenuClick('apps')}>
// //           <ListItemIcon>
// //             <GroupIcon />
// //           </ListItemIcon>
// //           <ListItemText primary="Apps" />
// //           {openMenu === 'apps' ? <ExpandLess /> : <ExpandMore />}
// //         </ListItem>
// //         <Collapse in={openMenu === 'apps'} timeout="auto" unmountOnExit>
// //           <List component="div" disablePadding>
// //             <ListItem
// //               button
// //               sx={{ pl: 4 }}
// //               onClick={() => handleNavigation("/hrms/dashboardHead/appscomp")}
// //               selected={isActive("/hrms/dashboardHead/appscomp")}
// //             >
// //               <ListItemText primary="Events" />
// //             </ListItem>
// //             <ListItem
// //               button
// //               sx={{ pl: 4 }}
// //               onClick={() => handleNavigation("/hrms/dashboardHead/assest")}
// //               selected={isActive("/hrms/dashboardHead/assest")}
// //             >
// //               <ListItemText primary="Assests" />
// //             </ListItem>
// //             <ListItem
// //               button
// //               sx={{ pl: 4 }}
// //               onClick={() => handleNavigation("/hrms/dashboardHead/award")}
// //               selected={isActive("/hrms/dashboardHead/award")}
// //             >
// //               <ListItemText primary="Awards" />
// //             </ListItem>
// //           </List>
// //         </Collapse>

// //         {/* Resignation */}
// //         <ListItem
// //           button
// //           onClick={() => handleNavigation("/hrms/dashboardHead/resignation")}
// //           selected={isActive("/hrms/dashboardHead/resignation")}
// //         >
// //           <ListItemIcon>
// //             <PersonRemoveIcon />
// //           </ListItemIcon>
// //           <ListItemText primary="Resignation" />
// //         </ListItem>

// //         {/* Helpdesk */}
// //         <ListItem
// //           button
// //           onClick={() => handleNavigation("/hrms/dashboardHead/helpdesk")}
// //           selected={isActive("/hrms/dashboardHead/helpdesk")}
// //         >
// //           <ListItemIcon>
// //             <HelpIcon />
// //           </ListItemIcon>
// //           <ListItemText primary="Helpdesk" />
// //         </ListItem>

// //         {/* Payroll */}
// //         <ListItem
// //           button
// //           onClick={() => handleNavigation("/hrms/dashboardHead/payroll")}
// //           selected={isActive("/hrms/dashboardHead/payroll")}
// //         >
// //           <ListItemIcon>
// //             <PaymentIcon />
// //           </ListItemIcon>
// //           <ListItemText primary="Payroll" />
// //         </ListItem>
// //       </List>
// //     </Drawer>
// //   );
// // }
// import React, { useState, useEffect } from "react";
// import axios from 'axios'; // Step 1: Import axios
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
// import PersonAddIcon from '@mui/icons-material/PersonAdd';
// import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
// import TopicIcon from '@mui/icons-material/Topic';
// import PaymentIcon from '@mui/icons-material/Payment';
// import EqualizerIcon from '@mui/icons-material/Equalizer';

// export default function Sidebar({ open, toggleDrawer, drawerWidth }) {
//   const [openMenu, setOpenMenu] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [showMenusForPolicyAck, setShowMenusForPolicyAck] = useState(false);
//   const [showLeaveForConfirmationStatus, setShowLeaveForConfirmationStatus] = useState(false);
//   const navigate = useNavigate();
//   const location = useLocation();

//   // --- Step 2: Refactor useEffect to use axios ---
//   useEffect(() => {
//     const employeeId = localStorage.getItem("loggedInUser") || '';

//     if (!employeeId) {
//       console.error("Employee ID not found in localStorage.");
//       setIsLoading(false);
//       return;
//     }

//     const fetchAllStatuses = async () => {
//       setIsLoading(true);

//       // We will handle each API call individually to manage their specific error cases (like 404)
//       // without stopping the other call from completing.
//       let confirmationStatus = false;
//       let policyAckStatus = false;

//       // --- Call 1: Employee Confirmation ---
//       try {
//         const response = await axios.get(`https://tdtlworld.com/hrms-backend/EmpConfirmation/${employeeId}/`);
//         const data = Array.isArray(response.data) ? response.data[0] : response.data;
//         // SHOW if confirm is 'N' or null/undefined. HIDE if 'Y'.
//         if (data && (data.employee_confirm === 'N' || data.employee_confirm == null)) {
//           confirmationStatus = true;
//         }
//       } catch (error) {
//         if (error.response && error.response.status === 404) {
//           // A 404 means the record doesn't exist, so the employee is not confirmed yet. SHOW the menu.
//           console.log("EmpConfirmation record not found (404), showing Leave menu.");
//           confirmationStatus = true;
//         } else {
//           // For any other error, log it and default to hiding the menu.
//           console.error("Confirmation API request failed:", error.message || error);
//           confirmationStatus = false;
//         }
//       }

//       // --- Call 2: Policy Acknowledgment ---
//       try {
//         const response = await axios.get(`https://tdtlworld.com/hrms-backend/policy_ack/${employeeId}/`);
//         // SHOW ONLY if the response is successful and the status is 'Y'.
//         if (response.data && response.data.status === 'Y') {
//           policyAckStatus = true;
//         }
//       } catch (error) {
//         // For the policy menu, ANY error (including 404) means we should HIDE it.
//         if (!error.response || error.response.status !== 404) {
//           console.error("Policy Ack API request failed:", error.message || error);
//         } else {
//           console.log("Policy Ack record not found (404), hiding related menus.");
//         }
//         policyAckStatus = false;
//       }

//       // Finally, update the state once after both API calls are processed.
//       setShowLeaveForConfirmationStatus(confirmationStatus);
//       setShowMenusForPolicyAck(policyAckStatus);
//       setIsLoading(false);
//     };

//     fetchAllStatuses();
//   }, []); // Empty array ensures this runs only once on mount

//   const handleMenuClick = (menuName) => {
//     setOpenMenu(prevOpenMenu => (prevOpenMenu === menuName ? null : menuName));
//   };

//   const handleNavigation = (route) => {
//     navigate(route);
//   };

//   const isActive = (route) => location.pathname === route;

//   const canShowLeaveMenu = showMenusForPolicyAck && showLeaveForConfirmationStatus;

//   // The rest of the component (JSX) remains unchanged
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

//       {isLoading && (
//         <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
//           <CircularProgress />
//         </Box>
//       )}

//       {!isLoading && (
//         <List>
//           {/* Home Item */}
//           <ListItem
//             button
//             onClick={() => handleNavigation("/hrms/dashboardHead/home")}
//             selected={isActive("/hrms/dashboardHead/home")}
//           >
//             <ListItemIcon>
//               <HomeIcon />
//             </ListItemIcon>
//             <ListItemText primary="Home" />
//           </ListItem>

//           {/* Attendance Dropdown (Conditional) */}
//           {showMenusForPolicyAck && (
//             <>
//               <ListItem button onClick={() => handleMenuClick('attendance')}>
//                 <ListItemIcon>
//                   <CalendarTodayIcon />
//                 </ListItemIcon>
//                 <ListItemText primary="Attendance" />
//                 {openMenu === 'attendance' ? <ExpandLess /> : <ExpandMore />}
//               </ListItem>
//               <Collapse in={openMenu === 'attendance'} timeout="auto" unmountOnExit>
//                 <List component="div" disablePadding>
//                   <ListItem
//                     button
//                     sx={{ pl: 4 }}
//                     onClick={() => handleNavigation("/hrms/dashboardHead/attendance")}
//                     selected={isActive("/hrms/dashboardHead/attendance")}
//                   >
//                     <ListItemText primary="Attendance" />
//                   </ListItem>
//                   <ListItem
//                     button
//                     sx={{ pl: 4 }}
//                     onClick={() => handleNavigation("/hrms/dashboardHead/monthly-report")}
//                     selected={isActive("/hrms/dashboardHead/monthly-report")}
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
//             onClick={() => handleNavigation("/hrms/dashboardHead/holiday")}
//             selected={isActive("/hrms/dashboardHead/holiday")}
//           >
//             <ListItemIcon>
//               <StarIcon />
//             </ListItemIcon>
//             <ListItemText primary="Holiday" />
//           </ListItem>

//           {/* Leave Request Dropdown (Conditional) */}
//           {canShowLeaveMenu && (
//             <>
//               <ListItem button onClick={() => handleMenuClick('leave')}>
//                 <ListItemIcon>
//                   <CalendarTodayIcon />
//                 </ListItemIcon>
//                 <ListItemText primary="Leave Request" />
//                 {openMenu === 'leave' ? <ExpandLess /> : <ExpandMore />}
//               </ListItem>
//               <Collapse in={openMenu === 'leave'} timeout="auto" unmountOnExit>
//                 <List component="div" disablePadding>
//                   <ListItem
//                     button
//                     sx={{ pl: 4 }}
//                     onClick={() => handleNavigation("/hrms/dashboardHead/leave-request")}
//                     selected={isActive("/hrms/dashboardHead/leave-request")}
//                   >
//                     <ListItemText primary="Leave Request" />
//                   </ListItem>
//                   <ListItem
//                     button
//                     sx={{ pl: 4 }}
//                     onClick={() => handleNavigation("/hrms/dashboardHead/leavetype")}
//                     selected={isActive("/hrms/dashboardHead/leavetype")}
//                   >
//                     <ListItemText primary="Leave Type" />
//                   </ListItem>
//                 </List>
//               </Collapse>
//             </>
//           )}

//           <ListItem button
//             onClick={() => handleNavigation("/hrms/dashboardHead/performanceTable")}
//             selected={isActive("/hrms/dashboardHead/performanceTable")}>
//             <ListItemIcon>
//               <EqualizerIcon />
//             </ListItemIcon>
//             <ListItemText primary="Performance Table" />
//           </ListItem>

//           {/* Policies */}
//           <ListItem
//             button
//             onClick={() => handleNavigation("/hrms/dashboardHead/policies")}
//             selected={isActive("/hrms/dashboardHead/policies")}
//           >
//             <ListItemIcon>
//               <QuestionAnswerIcon />
//             </ListItemIcon>
//             <ListItemText primary="Policies" />
//           </ListItem>

//           {/* Apps Dropdown */}
//           <ListItem button onClick={() => handleMenuClick('apps')}>
//             <ListItemIcon>
//               <GroupIcon />
//             </ListItemIcon>
//             <ListItemText primary="Apps" />
//             {openMenu === 'apps' ? <ExpandLess /> : <ExpandMore />}
//           </ListItem>
//           <Collapse in={openMenu === 'apps'} timeout="auto" unmountOnExit>
//             <List component="div" disablePadding>
//               <ListItem
//                 button
//                 sx={{ pl: 4 }}
//                 onClick={() => handleNavigation("/hrms/dashboardHead/appscomp")}
//                 selected={isActive("/hrms/dashboardHead/appscomp")}
//               >
//                 <ListItemText primary="Events" />
//               </ListItem>
//               <ListItem
//                 button
//                 sx={{ pl: 4 }}
//                 onClick={() => handleNavigation("/hrms/dashboardHead/assest")}
//                 selected={isActive("/hrms/dashboardHead/assest")}
//               >
//                 <ListItemText primary="Assests" />
//               </ListItem>
//               <ListItem
//                 button
//                 sx={{ pl: 4 }}
//                 onClick={() => handleNavigation("/hrms/dashboardHead/award")}
//                 selected={isActive("/hrms/dashboardHead/award")}
//               >
//                 <ListItemText primary="Awards" />
//               </ListItem>
//             </List>
//           </Collapse>

//           {/* Resignation */}
//           <ListItem
//             button
//             onClick={() => handleNavigation("/hrms/dashboardHead/resignation")}
//             selected={isActive("/hrms/dashboardHead/resignation")}
//           >
//             <ListItemIcon>
//               <PersonRemoveIcon />
//             </ListItemIcon>
//             <ListItemText primary="Resignation" />
//           </ListItem>



//           {/* Payroll (Conditional) */}
//           {showMenusForPolicyAck && (
//             <ListItem
//               button
//               onClick={() => handleNavigation("/hrms/dashboardHead/payroll")}
//               selected={isActive("/hrms/dashboardHead/payroll")}
//             >
//               <ListItemIcon>
//                 <PaymentIcon />
//               </ListItemIcon>
//               <ListItemText primary="Payroll" />
//             </ListItem>
//           )}



//           {/* Helpdesk */}
//           <ListItem
//             button
//             onClick={() => handleNavigation("/hrms/dashboardHead/helpdesk")}
//             selected={isActive("/hrms/dashboardHead/helpdesk")}
//           >
//             <ListItemIcon>
//               <HelpIcon />
//             </ListItemIcon>
//             <ListItemText primary="Helpdesk" />
//           </ListItem>

//         </List>
//       )}
//     </Drawer>
//   );
// }
















// import React, { useState, useEffect } from "react";
// import axios from 'axios'; // Step 1: Import axios
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
// import PersonAddIcon from '@mui/icons-material/PersonAdd';
// import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
// import TopicIcon from '@mui/icons-material/Topic';
// import PaymentIcon from '@mui/icons-material/Payment';
// import EqualizerIcon from '@mui/icons-material/Equalizer';

// export default function Sidebar({ open, toggleDrawer, drawerWidth }) {
//   const [openMenu, setOpenMenu] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [showMenusForPolicyAck, setShowMenusForPolicyAck] = useState(false);
//   const [showLeaveForConfirmationStatus, setShowLeaveForConfirmationStatus] = useState(false);
//   const navigate = useNavigate();
//   const location = useLocation();

//   // --- Step 2: Refactor useEffect to use axios ---
//   useEffect(() => {
//     const employeeId = localStorage.getItem("loggedInUser") || '';

//     if (!employeeId) {
//       console.error("Employee ID not found in localStorage.");
//       setIsLoading(false);
//       return;
//     }

//     const fetchAllStatuses = async () => {
//       setIsLoading(true);

//       // We will handle each API call individually to manage their specific error cases (like 404)
//       // without stopping the other call from completing.
//       let confirmationStatus = false;
//       let policyAckStatus = false;

//       // --- Call 1: Employee Confirmation ---
//       try {
//         const response = await axios.get(`https://tdtlworld.com/hrms-backend/EmpConfirmation/${employeeId}/`);
//         const data = Array.isArray(response.data) ? response.data[0] : response.data;
//         // SHOW if confirm is 'N' or null/undefined. HIDE if 'Y'.
//         if (data && (data.employee_confirm === 'N' || data.employee_confirm == null)) {
//           confirmationStatus = true;
//         }
//       } catch (error) {
//         if (error.response && error.response.status === 404) {
//           // A 404 means the record doesn't exist, so the employee is not confirmed yet. SHOW the menu.
//           console.log("EmpConfirmation record not found (404), showing Leave menu.");
//           confirmationStatus = true;
//         } else {
//           // For any other error, log it and default to hiding the menu.
//           console.error("Confirmation API request failed:", error.message || error);
//           confirmationStatus = false;
//         }
//       }

//       // --- Call 2: Policy Acknowledgment ---
//       try {
//         const response = await axios.get(`https://tdtlworld.com/hrms-backend/policy_ack/${employeeId}/`);
//         // SHOW ONLY if the response is successful and the status is 'Y'.
//         if (response.data && response.data.status === 'Y') {
//           policyAckStatus = true;
//         }
//       } catch (error) {
//         // For the policy menu, ANY error (including 404) means we should HIDE it.
//         if (!error.response || error.response.status !== 404) {
//           console.error("Policy Ack API request failed:", error.message || error);
//         } else {
//           console.log("Policy Ack record not found (404), hiding related menus.");
//         }
//         policyAckStatus = false;
//       }

//       // Finally, update the state once after both API calls are processed.
//       setShowLeaveForConfirmationStatus(confirmationStatus);
//       setShowMenusForPolicyAck(policyAckStatus);
//       setIsLoading(false);
//     };

//     fetchAllStatuses();
//   }, []); // Empty array ensures this runs only once on mount

//   const handleMenuClick = (menuName) => {
//     setOpenMenu(prevOpenMenu => (prevOpenMenu === menuName ? null : menuName));
//   };

//   const handleNavigation = (route) => {
//     navigate(route);
//   };

//   const isActive = (route) => location.pathname === route;

//   const canShowLeaveMenu = showMenusForPolicyAck && showLeaveForConfirmationStatus;

//   // The rest of the component (JSX) remains unchanged
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

//       {isLoading && (
//         <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
//           <CircularProgress />
//         </Box>
//       )}

//       {!isLoading && (
//         <List>
//           {/* Home Item */}
//           <ListItem
//             button
//             onClick={() => handleNavigation("/hrms/dashboardHead/home")}
//             selected={isActive("/hrms/dashboardHead/home")}
//           >
//             <ListItemIcon>
//               <HomeIcon />
//             </ListItemIcon>
//             <ListItemText primary="Home" />
//           </ListItem>

//           {/* Attendance Dropdown (Conditional) */}
//           {showMenusForPolicyAck && (
//             <>
//               <ListItem button onClick={() => handleMenuClick('attendance')}>
//                 <ListItemIcon>
//                   <CalendarTodayIcon />
//                 </ListItemIcon>
//                 <ListItemText primary="Attendance" />
//                 {openMenu === 'attendance' ? <ExpandLess /> : <ExpandMore />}
//               </ListItem>
//               <Collapse in={openMenu === 'attendance'} timeout="auto" unmountOnExit>
//                 <List component="div" disablePadding>
//                   <ListItem
//                     button
//                     sx={{ pl: 4 }}
//                     onClick={() => handleNavigation("/hrms/dashboardHead/attendance")}
//                     selected={isActive("/hrms/dashboardHead/attendance")}
//                   >
//                     <ListItemText primary="Attendance" />
//                   </ListItem>
//                   <ListItem
//                     button
//                     sx={{ pl: 4 }}
//                     onClick={() => handleNavigation("/hrms/dashboardHead/monthly-report")}
//                     selected={isActive("/hrms/dashboardHead/monthly-report")}
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
//             onClick={() => handleNavigation("/hrms/dashboardHead/holiday")}
//             selected={isActive("/hrms/dashboardHead/holiday")}
//           >
//             <ListItemIcon>
//               <StarIcon />
//             </ListItemIcon>
//             <ListItemText primary="Holiday" />
//           </ListItem>

//           {/* Leave Request Dropdown (Conditional) */}
//           {canShowLeaveMenu && (
//             <>
//               <ListItem button onClick={() => handleMenuClick('leave')}>
//                 <ListItemIcon>
//                   <CalendarTodayIcon />
//                 </ListItemIcon>
//                 <ListItemText primary="Leave Request" />
//                 {openMenu === 'leave' ? <ExpandLess /> : <ExpandMore />}
//               </ListItem>
//               <Collapse in={openMenu === 'leave'} timeout="auto" unmountOnExit>
//                 <List component="div" disablePadding>
//                   <ListItem
//                     button
//                     sx={{ pl: 4 }}
//                     onClick={() => handleNavigation("/hrms/dashboardHead/leave-request")}
//                     selected={isActive("/hrms/dashboardHead/leave-request")}
//                   >
//                     <ListItemText primary="Leave Request" />
//                   </ListItem>
//                   <ListItem
//                     button
//                     sx={{ pl: 4 }}
//                     onClick={() => handleNavigation("/hrms/dashboardHead/leavetype")}
//                     selected={isActive("/hrms/dashboardHead/leavetype")}
//                   >
//                     <ListItemText primary="Leave Type" />
//                   </ListItem>
//                 </List>
//               </Collapse>
//             </>
//           )}

//           <ListItem button
//             onClick={() => handleNavigation("/hrms/dashboardHead/performanceTable")}
//             selected={isActive("/hrms/dashboardHead/performanceTable")}>
//             <ListItemIcon>
//               <EqualizerIcon />
//             </ListItemIcon>
//             <ListItemText primary="Performance Table" />
//           </ListItem>

//           {/* Policies */}
//           <ListItem
//             button
//             onClick={() => handleNavigation("/hrms/dashboardHead/policies")}
//             selected={isActive("/hrms/dashboardHead/policies")}
//           >
//             <ListItemIcon>
//               <QuestionAnswerIcon />
//             </ListItemIcon>
//             <ListItemText primary="Policies" />
//           </ListItem>

//           {/* Apps Dropdown */}
//           <ListItem button onClick={() => handleMenuClick('apps')}>
//             <ListItemIcon>
//               <GroupIcon />
//             </ListItemIcon>
//             <ListItemText primary="Apps" />
//             {openMenu === 'apps' ? <ExpandLess /> : <ExpandMore />}
//           </ListItem>
//           <Collapse in={openMenu === 'apps'} timeout="auto" unmountOnExit>
//             <List component="div" disablePadding>
//               <ListItem
//                 button
//                 sx={{ pl: 4 }}
//                 onClick={() => handleNavigation("/hrms/dashboardHead/appscomp")}
//                 selected={isActive("/hrms/dashboardHead/appscomp")}
//               >
//                 <ListItemText primary="Events" />
//               </ListItem>
//               <ListItem
//                 button
//                 sx={{ pl: 4 }}
//                 onClick={() => handleNavigation("/hrms/dashboardHead/assest")}
//                 selected={isActive("/hrms/dashboardHead/assest")}
//               >
//                 <ListItemText primary="Assests" />
//               </ListItem>
//               <ListItem
//                 button
//                 sx={{ pl: 4 }}
//                 onClick={() => handleNavigation("/hrms/dashboardHead/award")}
//                 selected={isActive("/hrms/dashboardHead/award")}
//               >
//                 <ListItemText primary="Awards" />
//               </ListItem>
//             </List>
//           </Collapse>

//           {/* Resignation */}
//           <ListItem
//             button
//             onClick={() => handleNavigation("/hrms/dashboardHead/resignation")}
//             selected={isActive("/hrms/dashboardHead/resignation")}
//           >
//             <ListItemIcon>
//               <PersonRemoveIcon />
//             </ListItemIcon>
//             <ListItemText primary="Resignation" />
//           </ListItem>



//           {/* Payroll (Conditional) */}
//           {showMenusForPolicyAck && (
//             <ListItem
//               button
//               onClick={() => handleNavigation("/hrms/dashboardHead/payroll")}
//               selected={isActive("/hrms/dashboardHead/payroll")}
//             >
//               <ListItemIcon>
//                 <PaymentIcon />
//               </ListItemIcon>
//               <ListItemText primary="Payroll" />
//             </ListItem>
//           )}



//           {/* Helpdesk */}
//           <ListItem
//             button
//             onClick={() => handleNavigation("/hrms/dashboardHead/helpdesk")}
//             selected={isActive("/hrms/dashboardHead/helpdesk")}
//           >
//             <ListItemIcon>
//               <HelpIcon />
//             </ListItemIcon>
//             <ListItemText primary="Helpdesk" />
//           </ListItem>

//         </List>
//       )}
//     </Drawer>
//   );
// }









// import React, { useState, useEffect } from "react";
// import axios from 'axios';
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
// import PersonAddIcon from '@mui/icons-material/PersonAdd';
// import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
// import TopicIcon from '@mui/icons-material/Topic';
// import PaymentIcon from '@mui/icons-material/Payment';
// import EqualizerIcon from '@mui/icons-material/Equalizer';

// export default function Sidebar({ open, toggleDrawer, drawerWidth }) {
//   const [openMenu, setOpenMenu] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [showMenusForPolicyAck, setShowMenusForPolicyAck] = useState(false);
//   const [showLeaveForConfirmationStatus, setShowLeaveForConfirmationStatus] = useState(false);
//   const navigate = useNavigate();
//   const location = useLocation();

//   useEffect(() => {
//     const employeeId = localStorage.getItem("loggedInUser") || '';

//     if (!employeeId) {
//       console.error("Employee ID not found in localStorage.");
//       setIsLoading(false);
//       return;
//     }

//     const fetchAllStatuses = async () => {
//       setIsLoading(true);
//       let confirmationStatus = false;
//       let policyAckStatus = false;

//       try {
//         const response = await axios.get(`https://tdtlworld.com/hrms-backend/EmpConfirmation/${employeeId}/`);
//         const data = Array.isArray(response.data) ? response.data[0] : response.data;
//         if (data && (data.employee_confirm === 'N' || data.employee_confirm == null)) {
//           confirmationStatus = true;
//         }
//       } catch (error) {
//         if (error.response && error.response.status === 404) {
//           console.log("EmpConfirmation record not found (404), showing Leave menu.");
//           confirmationStatus = true;
//         } else {
//           console.error("Confirmation API request failed:", error.message || error);
//           confirmationStatus = false;
//         }
//       }

//       try {
//         const response = await axios.get(`https://tdtlworld.com/hrms-backend/policy_ack/${employeeId}/`);
//         if (response.data && response.data.status === 'Y') {
//           policyAckStatus = true;
//         }
//       } catch (error) {
//         if (!error.response || error.response.status !== 404) {
//           console.error("Policy Ack API request failed:", error.message || error);
//         } else {
//           console.log("Policy Ack record not found (404), hiding related menus.");
//         }
//         policyAckStatus = false;
//       }

//       setShowLeaveForConfirmationStatus(confirmationStatus);
//       setShowMenusForPolicyAck(policyAckStatus);
//       setIsLoading(false);
//     };

//     fetchAllStatuses();
//   }, []);

//   const handleMenuClick = (menuName) => {
//     setOpenMenu(prevOpenMenu => (prevOpenMenu === menuName ? null : menuName));
//   };

//   const handleNavigation = (route) => {
//     navigate(route);
//   };

//   const isActive = (route) => location.pathname === route;

//   const canShowLeaveMenu = showMenusForPolicyAck && showLeaveForConfirmationStatus;

//   // --- UI Style Definitions ---

//   // Common styles for top-level ListItems
//   const listItemStyles = {
//     // Styles for hover and selected states
//     "&:hover, &.Mui-selected": {
//       backgroundColor: "white",
//       color: "#F58E35",
//       "& .MuiListItemIcon-root, & .MuiSvgIcon-root": {
//         color: "#F58E35",
//       },
//     },
//     // Prevent hover style from overriding the selected style
//     "&.Mui-selected:hover": {
//       backgroundColor: "white",
//     },
//   };

//   // Common styles for nested (indented) ListItems
//   const nestedListItemStyles = {
//     pl: 4,
//     ...listItemStyles, // Inherit common styles
//   };

//   // Common props for ListItemText to make it bold
//   const listItemTextProps = {
//     primaryTypographyProps: { fontWeight: "bold" },
//   };

//   return (
//     <Drawer
//       sx={{
//         width: drawerWidth,
//         flexShrink: 0,
//         "& .MuiDrawer-paper": {
//           width: drawerWidth,
//           boxSizing: "border-box",
//           backgroundColor: "#F58E35", // Set background color
//           color: "white", // Set default text color
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
//           <ChevronLeftIcon sx={{ color: "white" }} />
//         </IconButton>
//       </Box>
//       <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.3)" }} />

//       {isLoading && (
//         <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
//           <CircularProgress sx={{ color: 'white' }} />
//         </Box>
//       )}

//       {!isLoading && (
//         <List>
//           {/* Home */}
//           <ListItem
//             button
//             onClick={() => handleNavigation("/hrms/dashboardHead/home")}
//             selected={isActive("/hrms/dashboardHead/home")}
//             sx={listItemStyles}
//           >
//             <ListItemIcon sx={{ color: "white" }}><HomeIcon /></ListItemIcon>
//             <ListItemText primary="Home" {...listItemTextProps} />
//           </ListItem>

//           {/* Attendance Dropdown */}
//           {showMenusForPolicyAck && (
//             <>
//               <ListItem button onClick={() => handleMenuClick('attendance')} sx={listItemStyles}>
//                 <ListItemIcon sx={{ color: "white" }}><CalendarTodayIcon /></ListItemIcon>
//                 <ListItemText primary="Attendance" {...listItemTextProps} />
//                 {openMenu === 'attendance' ? <ExpandLess /> : <ExpandMore />}
//               </ListItem>
//               <Collapse in={openMenu === 'attendance'} timeout="auto" unmountOnExit>
//                 <List component="div" disablePadding>
//                   <ListItem
//                     button
//                     onClick={() => handleNavigation("/hrms/dashboardHead/attendance")}
//                     selected={isActive("/hrms/dashboardHead/attendance")}
//                     sx={nestedListItemStyles}
//                   >
//                     <ListItemText primary="Attendance" {...listItemTextProps} />
//                   </ListItem>
//                   <ListItem
//                     button
//                     onClick={() => handleNavigation("/hrms/dashboardHead/monthly-report")}
//                     selected={isActive("/hrms/dashboardHead/monthly-report")}
//                     sx={nestedListItemStyles}
//                   >
//                     <ListItemText primary="Monthly Report" {...listItemTextProps} />
//                   </ListItem>
//                 </List>
//               </Collapse>
//             </>
//           )}

//           {/* Holiday */}
//           <ListItem
//             button
//             onClick={() => handleNavigation("/hrms/dashboardHead/holiday")}
//             selected={isActive("/hrms/dashboardHead/holiday")}
//             sx={listItemStyles}
//           >
//             <ListItemIcon sx={{ color: "white" }}><StarIcon /></ListItemIcon>
//             <ListItemText primary="Holiday" {...listItemTextProps} />
//           </ListItem>

//           {/* Leave Request Dropdown */}
//           {canShowLeaveMenu && (
//             <>
//               <ListItem button onClick={() => handleMenuClick('leave')} sx={listItemStyles}>
//                 <ListItemIcon sx={{ color: "white" }}><CalendarTodayIcon /></ListItemIcon>
//                 <ListItemText primary="Leave Request" {...listItemTextProps} />
//                 {openMenu === 'leave' ? <ExpandLess /> : <ExpandMore />}
//               </ListItem>
//               <Collapse in={openMenu === 'leave'} timeout="auto" unmountOnExit>
//                 <List component="div" disablePadding>
//                   <ListItem
//                     button
//                     onClick={() => handleNavigation("/hrms/dashboardHead/leave-request")}
//                     selected={isActive("/hrms/dashboardHead/leave-request")}
//                     sx={nestedListItemStyles}
//                   >
//                     <ListItemText primary="Leave Request" {...listItemTextProps} />
//                   </ListItem>
//                   <ListItem
//                     button
//                     onClick={() => handleNavigation("/hrms/dashboardHead/leavetype")}
//                     selected={isActive("/hrms/dashboardHead/leavetype")}
//                     sx={nestedListItemStyles}
//                   >
//                     <ListItemText primary="Leave Type" {...listItemTextProps} />
//                   </ListItem>
//                 </List>
//               </Collapse>
//             </>
//           )}

//           {/* Performance Table */}
//           <ListItem
//             button
//             onClick={() => handleNavigation("/hrms/dashboardHead/performanceTable")}
//             selected={isActive("/hrms/dashboardHead/performanceTable")}
//             sx={listItemStyles}
//           >
//             <ListItemIcon sx={{ color: "white" }}><EqualizerIcon /></ListItemIcon>
//             <ListItemText primary="Performance Table" {...listItemTextProps} />
//           </ListItem>

//           {/* Policies */}
//           <ListItem
//             button
//             onClick={() => handleNavigation("/hrms/dashboardHead/policies")}
//             selected={isActive("/hrms/dashboardHead/policies")}
//             sx={listItemStyles}
//           >
//             <ListItemIcon sx={{ color: "white" }}><QuestionAnswerIcon /></ListItemIcon>
//             <ListItemText primary="Policies" {...listItemTextProps} />
//           </ListItem>

//           {/* Apps Dropdown */}
//           <ListItem button onClick={() => handleMenuClick('apps')} sx={listItemStyles}>
//             <ListItemIcon sx={{ color: "white" }}><GroupIcon /></ListItemIcon>
//             <ListItemText primary="Apps" {...listItemTextProps} />
//             {openMenu === 'apps' ? <ExpandLess /> : <ExpandMore />}
//           </ListItem>
//           <Collapse in={openMenu === 'apps'} timeout="auto" unmountOnExit>
//             <List component="div" disablePadding>
//               <ListItem
//                 button
//                 onClick={() => handleNavigation("/hrms/dashboardHead/appscomp")}
//                 selected={isActive("/hrms/dashboardHead/appscomp")}
//                 sx={nestedListItemStyles}
//               >
//                 <ListItemText primary="Events" {...listItemTextProps} />
//               </ListItem>
//               <ListItem
//                 button
//                 onClick={() => handleNavigation("/hrms/dashboardHead/assest")}
//                 selected={isActive("/hrms/dashboardHead/assest")}
//                 sx={nestedListItemStyles}
//               >
//                 <ListItemText primary="Assests" {...listItemTextProps} />
//               </ListItem>
//               <ListItem
//                 button
//                 onClick={() => handleNavigation("/hrms/dashboardHead/award")}
//                 selected={isActive("/hrms/dashboardHead/award")}
//                 sx={nestedListItemStyles}
//               >
//                 <ListItemText primary="Awards" {...listItemTextProps} />
//               </ListItem>
//             </List>
//           </Collapse>

//           {/* Resignation */}
//           <ListItem
//             button
//             onClick={() => handleNavigation("/hrms/dashboardHead/resignation")}
//             selected={isActive("/hrms/dashboardHead/resignation")}
//             sx={listItemStyles}
//           >
//             <ListItemIcon sx={{ color: "white" }}><PersonRemoveIcon /></ListItemIcon>
//             <ListItemText primary="Resignation" {...listItemTextProps} />
//           </ListItem>

//           {/* Payroll */}
//           {showMenusForPolicyAck && (
//             <ListItem
//               button
//               onClick={() => handleNavigation("/hrms/dashboardHead/payroll")}
//               selected={isActive("/hrms/dashboardHead/payroll")}
//               sx={listItemStyles}
//             >
//               <ListItemIcon sx={{ color: "white" }}><PaymentIcon /></ListItemIcon>
//               <ListItemText primary="Payroll" {...listItemTextProps} />
//             </ListItem>
//           )}

//           {/* Helpdesk */}
//           <ListItem
//             button
//             onClick={() => handleNavigation("/hrms/dashboardHead/helpdesk")}
//             selected={isActive("/hrms/dashboardHead/helpdesk")}
//             sx={listItemStyles}
//           >
//             <ListItemIcon sx={{ color: "white" }}><HelpIcon /></ListItemIcon>
//             <ListItemText primary="Helpdesk" {...listItemTextProps} />
//           </ListItem>
//         </List>
//       )}
//     </Drawer>
//   );
// }










// import React, { useState, useEffect } from "react";
// import axios from "axios";
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
// import ExpandLess from "@mui/icons-material/ExpandLess";
// import ExpandMore from "@mui/icons-material/ExpandMore";
// import { useNavigate, useLocation } from "react-router-dom";
// import StarIcon from "@mui/icons-material/Star";
// import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
// import HelpIcon from "@mui/icons-material/Help";
// import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
// import PaymentIcon from "@mui/icons-material/Payment";
// import EqualizerIcon from "@mui/icons-material/Equalizer";
// import MenuIcon from "@mui/icons-material/Menu";
// import RemoveIcon from "@mui/icons-material/Remove";



// export default function Sidebar({ open, toggleDrawer, drawerWidth }) {
//   const [openMenu, setOpenMenu] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [showMenusForPolicyAck, setShowMenusForPolicyAck] = useState(false);
//   const [showLeaveForConfirmationStatus, setShowLeaveForConfirmationStatus] = useState(false);
//   const navigate = useNavigate();
//   const location = useLocation();

//   useEffect(() => {
//     const employeeId = localStorage.getItem("loggedInUser") || "";

//     if (!employeeId) {
//       console.error("Employee ID not found in localStorage.");
//       setIsLoading(false);
//       return;
//     }

//     const fetchAllStatuses = async () => {
//       setIsLoading(true);
//       let confirmationStatus = false;
//       let policyAckStatus = false;

//       try {
//         const response = await axios.get(`https://tdtlworld.com/hrms-backend/EmpConfirmation/${employeeId}/`);
//         const data = Array.isArray(response.data) ? response.data[0] : response.data;
//         if (data && (data.employee_confirm === "N" || data.employee_confirm == null)) {
//           confirmationStatus = true;
//         }
//       } catch (error) {
//         if (error.response && error.response.status === 404) {
//           console.log("EmpConfirmation record not found (404), showing Leave menu.");
//           confirmationStatus = true;
//         } else {
//           console.error("Confirmation API request failed:", error.message || error);
//           confirmationStatus = false;
//         }
//       }

//       try {
//         const response = await axios.get(`https://tdtlworld.com/hrms-backend/policy_ack/${employeeId}/`);
//         if (response.data && response.data.status === "Y") {
//           policyAckStatus = true;
//         }
//       } catch (error) {
//         if (!error.response || error.response.status !== 404) {
//           console.error("Policy Ack API request failed:", error.message || error);
//         } else {
//           console.log("Policy Ack record not found (404), hiding related menus.");
//         }
//         policyAckStatus = false;
//       }

//       setShowLeaveForConfirmationStatus(confirmationStatus);
//       setShowMenusForPolicyAck(policyAckStatus);
//       setIsLoading(false);
//     };

//     fetchAllStatuses();
//   }, []);

//   const handleMenuClick = (menuName) => {
//     setOpenMenu((prevOpenMenu) => (prevOpenMenu === menuName ? null : menuName));
//   };

//   const handleNavigation = (route) => {
//     navigate(route);
//   };

//   const isActive = (route) => location.pathname === route;

//   const canShowLeaveMenu = showMenusForPolicyAck && showLeaveForConfirmationStatus;

//   // --- UI Style Definitions ---
//   const listItemStyles = {
//     "&:hover, &.Mui-selected": {
//       backgroundColor: "white",
//       color: "#F58E35",
//       "& .MuiListItemIcon-root, & .MuiSvgIcon-root": {
//         color: "#F58E35",
//       },
//     },
//     "&.Mui-selected:hover": {
//       backgroundColor: "white",
//     },
//   };

//   const nestedListItemStyles = {
//     pl: 4,
//     ...listItemStyles,
//   };

//   const listItemTextProps = {
//     primaryTypographyProps: { fontWeight: "bold" },
//   };

//   return (
//     <>
//       {/* Sidebar Drawer */}
//       <Drawer
//         sx={{
//           width: drawerWidth,
//           flexShrink: 0,
//           "& .MuiDrawer-paper": {
//             width: drawerWidth,
//             boxSizing: "border-box",
//             backgroundColor: "#F58E35",
//             color: "white",
//           },
//         }}
//         variant="persistent"
//         anchor="left"
//         open={open}
//       >
//         {/* Header Spacer - Removed the old close button from here */}
//         <Box sx={{ minHeight: 64 }} />

//         <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.3)" }} />

//         {isLoading && (
//           <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
//             <CircularProgress sx={{ color: "white" }} />
//           </Box>
//         )}

//         {!isLoading && (
//           <List>
//             {/* Home */}
//             <ListItem
//               button
//               onClick={() => handleNavigation("/hrms/dashboardHead/home")}
//               selected={isActive("/hrms/dashboardHead/home")}
//               sx={listItemStyles}
//             >
//               <ListItemIcon sx={{ color: "white" }}>
//                 <HomeIcon />
//               </ListItemIcon>
//               <ListItemText primary="Home" {...listItemTextProps} />
//             </ListItem>

//             {/* Attendance Dropdown */}
//             {showMenusForPolicyAck && (
//               <>
//                 <ListItem button onClick={() => handleMenuClick("attendance")} sx={listItemStyles}>
//                   <ListItemIcon sx={{ color: "white" }}>
//                     <CalendarTodayIcon />
//                   </ListItemIcon>
//                   <ListItemText primary="Attendance" {...listItemTextProps} />
//                   {openMenu === "attendance" ? <ExpandLess /> : <ExpandMore />}
//                 </ListItem>
//                 <Collapse in={openMenu === "attendance"} timeout="auto" unmountOnExit>
//                   <List component="div" disablePadding>
//                     <ListItem
//                       button
//                       onClick={() => handleNavigation("/hrms/dashboardHead/attendance")}
//                       selected={isActive("/hrms/dashboardHead/attendance")}
//                       sx={nestedListItemStyles}
//                     >
//                       <ListItemText primary="Attendance" {...listItemTextProps} />
//                     </ListItem>
//                     <ListItem
//                       button
//                       onClick={() => handleNavigation("/hrms/dashboardHead/monthly-report")}
//                       selected={isActive("/hrms/dashboardHead/monthly-report")}
//                       sx={nestedListItemStyles}
//                     >
//                       <ListItemText primary="Monthly Report" {...listItemTextProps} />
//                     </ListItem>
//                   </List>
//                 </Collapse>
//               </>
//             )}

//             {/* Holiday */}
//             <ListItem
//               button
//               onClick={() => handleNavigation("/hrms/dashboardHead/holiday")}
//               selected={isActive("/hrms/dashboardHead/holiday")}
//               sx={listItemStyles}
//             >
//               <ListItemIcon sx={{ color: "white" }}>
//                 <StarIcon />
//               </ListItemIcon>
//               <ListItemText primary="Holiday" {...listItemTextProps} />
//             </ListItem>

//             {/* Leave Request Dropdown */}
//             {canShowLeaveMenu && (
//               <>
//                 <ListItem button onClick={() => handleMenuClick("leave")} sx={listItemStyles}>
//                   <ListItemIcon sx={{ color: "white" }}>
//                     <CalendarTodayIcon />
//                   </ListItemIcon>
//                   <ListItemText primary="Leave Request" {...listItemTextProps} />
//                   {openMenu === "leave" ? <ExpandLess /> : <ExpandMore />}
//                 </ListItem>
//                 <Collapse in={openMenu === "leave"} timeout="auto" unmountOnExit>
//                   <List component="div" disablePadding>
//                     <ListItem
//                       button
//                       onClick={() => handleNavigation("/hrms/dashboardHead/leave-request")}
//                       selected={isActive("/hrms/dashboardHead/leave-request")}
//                       sx={nestedListItemStyles}
//                     >
//                       <ListItemText primary="Leave Request" {...listItemTextProps} />
//                     </ListItem>
//                     <ListItem
//                       button
//                       onClick={() => handleNavigation("/hrms/dashboardHead/leavetype")}
//                       selected={isActive("/hrms/dashboardHead/leavetype")}
//                       sx={nestedListItemStyles}
//                     >
//                       <ListItemText primary="Leave Type" {...listItemTextProps} />
//                     </ListItem>
//                   </List>
//                 </Collapse>
//               </>
//             )}

//             {/* Performance Table */}
//             <ListItem
//               button
//               onClick={() => handleNavigation("/hrms/dashboardHead/performanceTable")}
//               selected={isActive("/hrms/dashboardHead/performanceTable")}
//               sx={listItemStyles}
//             >
//               <ListItemIcon sx={{ color: "white" }}>
//                 <EqualizerIcon />
//               </ListItemIcon>
//               <ListItemText primary="Performance Table" {...listItemTextProps} />
//             </ListItem>

//             {/* Policies */}
//             <ListItem
//               button
//               onClick={() => handleNavigation("/hrms/dashboardHead/policies")}
//               selected={isActive("/hrms/dashboardHead/policies")}
//               sx={listItemStyles}
//             >
//               <ListItemIcon sx={{ color: "white" }}>
//                 <QuestionAnswerIcon />
//               </ListItemIcon>
//               <ListItemText primary="Policies" {...listItemTextProps} />
//             </ListItem>

//             {/* Apps Dropdown */}
//             <ListItem button onClick={() => handleMenuClick("apps")} sx={listItemStyles}>
//               <ListItemIcon sx={{ color: "white" }}>
//                 <GroupIcon />
//               </ListItemIcon>
//               <ListItemText primary="Apps" {...listItemTextProps} />
//               {openMenu === "apps" ? <ExpandLess /> : <ExpandMore />}
//             </ListItem>
//             <Collapse in={openMenu === "apps"} timeout="auto" unmountOnExit>
//               <List component="div" disablePadding>
//                 <ListItem
//                   button
//                   onClick={() => handleNavigation("/hrms/dashboardHead/appscomp")}
//                   selected={isActive("/hrms/dashboardHead/appscomp")}
//                   sx={nestedListItemStyles}
//                 >
//                   <ListItemText primary="Events" {...listItemTextProps} />
//                 </ListItem>
//                 <ListItem
//                   button
//                   onClick={() => handleNavigation("/hrms/dashboardHead/assest")}
//                   selected={isActive("/hrms/dashboardHead/assest")}
//                   sx={nestedListItemStyles}
//                 >
//                   <ListItemText primary="Assests" {...listItemTextProps} />
//                 </ListItem>
//                 <ListItem
//                   button
//                   onClick={() => handleNavigation("/hrms/dashboardHead/award")}
//                   selected={isActive("/hrms/dashboardHead/award")}
//                   sx={nestedListItemStyles}
//                 >
//                   <ListItemText primary="Awards" {...listItemTextProps} />
//                 </ListItem>
//               </List>
//             </Collapse>

//             {/* Resignation */}
//             <ListItem
//               button
//               onClick={() => handleNavigation("/hrms/dashboardHead/resignation")} 
//               selected={isActive("/hrms/dashboardHead/resignation")}
//               sx={listItemStyles}
//             >
//               <ListItemIcon sx={{ color: "white" }}>
//                 <PersonRemoveIcon />
//               </ListItemIcon>
//               <ListItemText primary="Resignation" {...listItemTextProps} />
//             </ListItem>

//             {/* Payroll */}
//             {showMenusForPolicyAck && (
//               <ListItem
//                 button
//                 onClick={() => handleNavigation("/hrms/dashboardHead/payroll")}
//                 selected={isActive("/hrms/dashboardHead/payroll")}
//                 sx={listItemStyles}
//               >
//                 <ListItemIcon sx={{ color: "white" }}>
//                   <PaymentIcon />
//                 </ListItemIcon>
//                 <ListItemText primary="Payroll" {...listItemTextProps} />
//               </ListItem>
//             )}

//             {/* Helpdesk */}
//             <ListItem
//               button
//               onClick={() => handleNavigation("/hrms/dashboardHead/helpdesk")}
//               selected={isActive("/hrms/dashboardHead/helpdesk")}
//               sx={listItemStyles}
//             >
//               <ListItemIcon sx={{ color: "white" }}>
//                 <HelpIcon />
//               </ListItemIcon>
//               <ListItemText primary="Helpdesk" {...listItemTextProps} />
//             </ListItem>
//           </List>
//         )}


//         {/* Employee Exit */}
//         <ListItem
//               button
//               onClick={() => handleNavigation("/hrms/dashboardHead/employeeExitHead")}
//               selected={isActive("/hrms/dashboardHead/employeeExitHead")}
//               sx={listItemStyles}
//             >
//               <ListItemIcon><RemoveIcon /></ListItemIcon>
//               <ListItemText primary="Employee Exit " />
//             </ListItem>
          



//       </Drawer>

//       {/* Always-Visible Floating Toggle Button */}
//       <IconButton
//         onClick={toggleDrawer}
//         sx={{
//           position: "fixed",
//           top: 80,
//           // Move the button along with the drawer
//           left: open ? `${drawerWidth}px` : 0,
//           backgroundColor: "#F58E35",
//           color: "white",
//           "&:hover": { backgroundColor: "#e0792d" },
//           zIndex: 2000,
//           // Add transition for smooth movement
//           transition: (theme) =>
//             theme.transitions.create("left", {
//               easing: theme.transitions.easing.sharp,
//               duration: theme.transitions.duration.leavingScreen,
//             }),
//           // "Tag" like styling
//           borderTopLeftRadius: 0,
//           borderBottomLeftRadius: 0,
//           borderTopRightRadius: 16,
//           borderBottomRightRadius: 16,
//         }}
//       >
//         {/* Change icon based on sidebar state */}
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
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { useNavigate, useLocation } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import HelpIcon from "@mui/icons-material/Help";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import PaymentIcon from "@mui/icons-material/Payment";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import MenuIcon from "@mui/icons-material/Menu";
import RemoveIcon from "@mui/icons-material/Remove";

export default function Sidebar({ open, toggleDrawer, drawerWidth }) {
  const [openMenu, setOpenMenu] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showMenusForPolicyAck, setShowMenusForPolicyAck] = useState(false);
  const [showLeaveForConfirmationStatus, setShowLeaveForConfirmationStatus] = useState(false);
  const [lastWorkingDay, setLastWorkingDay] = useState(null); // Added for exit logic

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const employeeId = localStorage.getItem("loggedInUser") || "";

    if (!employeeId) {
      console.error("Employee ID not found in localStorage.");
      setIsLoading(false);
      return;
    }

    const fetchAllStatuses = async () => {
      setIsLoading(true);
      try {
        const confirmationPromise = fetch(`https://tdtlworld.com/hrms-backend/EmpConfirmation/${employeeId}/`);
        const policyAckPromise = fetch(`https://tdtlworld.com/hrms-backend/policy_ack/${employeeId}/`);
        const exitDatePromise = fetch(`https://tdtlworld.com/hrms-backend/get-exit-date/${employeeId}/`);

        const [
          confirmationResponse,
          policyAckResponse,
          exitDateResponse
        ] = await Promise.all([
          confirmationPromise,
          policyAckPromise,
          exitDatePromise
        ]);

        // Handle Confirmation Status
        if (confirmationResponse.ok) {
          const data = await confirmationResponse.json();
          const confirmationData = Array.isArray(data) ? data[0] : data;
          if (confirmationData && (confirmationData.employee_confirm === 'N' || confirmationData.employee_confirm === null)) {
            setShowLeaveForConfirmationStatus(true);
          } else {
            setShowLeaveForConfirmationStatus(false);
          }
        } else if (confirmationResponse.status === 404) {
            console.log("EmpConfirmation record not found (404), showing Leave menu.");
            setShowLeaveForConfirmationStatus(true); // As per original logic, show if not found
        } 
        else {
          console.error(`Confirmation API call failed: ${confirmationResponse.status}`);
          setShowLeaveForConfirmationStatus(false);
        }

        // Handle Policy Ack Status
        if (policyAckResponse.ok) {
          const policyData = await policyAckResponse.json();
          if (policyData && policyData.status === 'Y') {
            setShowMenusForPolicyAck(true);
          } else {
            setShowMenusForPolicyAck(false);
          }
        } else {
          console.error(`Policy Ack API call failed: ${policyAckResponse.status}`);
          setShowMenusForPolicyAck(false);
        }

        // Handle Exit Date Status
        if (exitDateResponse.ok) {
          const exitData = await exitDateResponse.json();
          if (exitData && exitData.last_working_day) {
            setLastWorkingDay(exitData.last_working_day);
          } else {
            setLastWorkingDay('NA');
          }
        } else {
          console.error(`Exit Date API call failed: ${exitDateResponse.status}`);
          setLastWorkingDay('NA');
        }
        
      } catch (error) {
        console.error("Error fetching employee status data:", error);
        setShowMenusForPolicyAck(false);
        setShowLeaveForConfirmationStatus(false);
        setLastWorkingDay('NA');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllStatuses();
  }, []);
  
  // Auto-expand menu based on current route
  useEffect(() => {
    const currentPath = location.pathname;
    const appRoutes = ["/hrms/dashboardHead/appscomp", "/hrms/dashboardHead/assest", "/hrms/dashboardHead/award"];

    if (appRoutes.includes(currentPath)) {
      setOpenMenu("apps");
    }
  }, [location.pathname]);


  const handleMenuClick = (menuName) => {
    setOpenMenu((prevOpenMenu) => (prevOpenMenu === menuName ? null : menuName));
  };

  const handleNavigation = (route) => {
    navigate(route);
  };

  const isActive = (route) => location.pathname === route;

  const canShowLeaveMenu = showMenusForPolicyAck && showLeaveForConfirmationStatus;

  // --- Calculate Exit Related Conditions ---
  const today = new Date();
  today.setHours(0, 0, 0, 0); 
  const exitDate = lastWorkingDay && lastWorkingDay !== 'NA' ? new Date(lastWorkingDay) : null;
  
  let daysUntilExit = Infinity;
  if (exitDate) {
    const timeDiff = exitDate.getTime() - today.getTime();
    daysUntilExit = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
  }

  const showAllPages = lastWorkingDay === 'NA' || daysUntilExit > 0;
  const showPostExitPages = daysUntilExit <= 0 && lastWorkingDay !== 'NA';
  const showEmployeeExitPage = lastWorkingDay && lastWorkingDay !== 'NA';

  // --- UI Style Definitions ---
  const listItemStyles = {
    color: "white",
    "& .MuiListItemIcon-root": {
      color: "white",
    },
    "&:hover, &.Mui-selected": {
      backgroundColor: "white",
      color: "#F58E35",
      "& .MuiListItemIcon-root, & .MuiSvgIcon-root": {
        color: "#F58E35",
      },
    },
    "&.Mui-selected:hover": {
      backgroundColor: "white",
    },
  };

  const nestedListItemStyles = {
    pl: 4,
    ...listItemStyles,
  };

  const listItemTextProps = {
    primaryTypographyProps: { fontWeight: "bold" },
  };

  return (
    <>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "#F58E35",
            color: "white",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <Box sx={{ minHeight: 64 }} />
        <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.3)" }} />

        {isLoading && (
          <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
            <CircularProgress sx={{ color: "white" }} />
          </Box>
        )}

        {/* VIEW FOR ACTIVE EMPLOYEES */}
        {!isLoading && showAllPages && !showPostExitPages && (
          <List>
            {/* Home */}
            <ListItem
              button
              onClick={() => handleNavigation("/hrms/dashboardHead/home")}
              selected={isActive("/hrms/dashboardHead/home")}
              sx={listItemStyles}
            >
              <ListItemIcon><HomeIcon /></ListItemIcon>
              <ListItemText primary="Home" {...listItemTextProps} />
            </ListItem>

            {/* Attendance Dropdown */}
            {showMenusForPolicyAck && (
              <>
                <ListItem button onClick={() => handleMenuClick("attendance")} sx={listItemStyles}>
                  <ListItemIcon><CalendarTodayIcon /></ListItemIcon>
                  <ListItemText primary="Attendance" {...listItemTextProps} />
                  {openMenu === "attendance" ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={openMenu === "attendance"} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <ListItem button onClick={() => handleNavigation("/hrms/dashboardHead/attendance")} selected={isActive("/hrms/dashboardHead/attendance")} sx={nestedListItemStyles} >
                      <ListItemText primary="Attendance" {...listItemTextProps} />
                    </ListItem>
                    <ListItem button onClick={() => handleNavigation("/hrms/dashboardHead/monthly-report")} selected={isActive("/hrms/dashboardHead/monthly-report")} sx={nestedListItemStyles} >
                      <ListItemText primary="Monthly Report" {...listItemTextProps} />
                    </ListItem>
                  </List>
                </Collapse>
              </>
            )}

            {/* Holiday */}
            <ListItem button onClick={() => handleNavigation("/hrms/dashboardHead/holiday")} selected={isActive("/hrms/dashboardHead/holiday")} sx={listItemStyles} >
              <ListItemIcon><StarIcon /></ListItemIcon>
              <ListItemText primary="Holiday" {...listItemTextProps} />
            </ListItem>

            {/* Leave Request Dropdown - HIDDEN IF EXITING SOON */}
            {canShowLeaveMenu && daysUntilExit > 15 && (
              <>
                <ListItem button onClick={() => handleMenuClick("leave")} sx={listItemStyles}>
                  <ListItemIcon><CalendarTodayIcon /></ListItemIcon>
                  <ListItemText primary="Leave Request" {...listItemTextProps} />
                  {openMenu === "leave" ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={openMenu === "leave"} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <ListItem button onClick={() => handleNavigation("/hrms/dashboardHead/leave-request")} selected={isActive("/hrms/dashboardHead/leave-request")} sx={nestedListItemStyles} >
                      <ListItemText primary="Leave Request" {...listItemTextProps} />
                    </ListItem>
                    <ListItem button onClick={() => handleNavigation("/hrms/dashboardHead/leavetype")} selected={isActive("/hrms/dashboardHead/leavetype")} sx={nestedListItemStyles} >
                      <ListItemText primary="Leave Type" {...listItemTextProps} />
                    </ListItem>
                  </List>
                </Collapse>
              </>
            )}

            {/* Performance Table */}
            <ListItem button onClick={() => handleNavigation("/hrms/dashboardHead/performanceTable")} selected={isActive("/hrms/dashboardHead/performanceTable")} sx={listItemStyles} >
              <ListItemIcon><EqualizerIcon /></ListItemIcon>
              <ListItemText primary="Performance Table" {...listItemTextProps} />
            </ListItem>

            {/* Policies */}
            <ListItem button onClick={() => handleNavigation("/hrms/dashboardHead/policies")} selected={isActive("/hrms/dashboardHead/policies")} sx={listItemStyles} >
              <ListItemIcon><QuestionAnswerIcon /></ListItemIcon>
              <ListItemText primary="Policies" {...listItemTextProps} />
            </ListItem>

            {/* Apps Dropdown */}
            <ListItem button onClick={() => handleMenuClick("apps")} sx={listItemStyles}>
              <ListItemIcon><GroupIcon /></ListItemIcon>
              <ListItemText primary="Apps" {...listItemTextProps} />
              {openMenu === "apps" ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={openMenu === "apps"} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem button onClick={() => handleNavigation("/hrms/dashboardHead/appscomp")} selected={isActive("/hrms/dashboardHead/appscomp")} sx={nestedListItemStyles} >
                  <ListItemText primary="Events" {...listItemTextProps} />
                </ListItem>
                <ListItem button onClick={() => handleNavigation("/hrms/dashboardHead/assest")} selected={isActive("/hrms/dashboardHead/assest")} sx={nestedListItemStyles} >
                  <ListItemText primary="Assets" {...listItemTextProps} />
                </ListItem>
                <ListItem button onClick={() => handleNavigation("/hrms/dashboardHead/award")} selected={isActive("/hrms/dashboardHead/award")} sx={nestedListItemStyles} >
                  <ListItemText primary="Awards" {...listItemTextProps} />
                </ListItem>
              </List>
            </Collapse>

            {/* Resignation */}
            <ListItem button onClick={() => handleNavigation("/hrms/dashboardHead/resignation")} selected={isActive("/hrms/dashboardHead/resignation")} sx={listItemStyles} >
              <ListItemIcon><PersonRemoveIcon /></ListItemIcon>
              <ListItemText primary="Resignation" {...listItemTextProps} />
            </ListItem>

            {/* Payroll */}
            {showMenusForPolicyAck && (
              <ListItem button onClick={() => handleNavigation("/hrms/dashboardHead/payroll")} selected={isActive("/hrms/dashboardHead/payroll")} sx={listItemStyles} >
                <ListItemIcon><PaymentIcon /></ListItemIcon>
                <ListItemText primary="Payroll" {...listItemTextProps} />
              </ListItem>
            )}

            {/* Helpdesk */}
            <ListItem button onClick={() => handleNavigation("/hrms/dashboardHead/helpdesk")} selected={isActive("/hrms/dashboardHead/helpdesk")} sx={listItemStyles} >
              <ListItemIcon><HelpIcon /></ListItemIcon>
              <ListItemText primary="Helpdesk" {...listItemTextProps} />
            </ListItem>
            
            {/* Employee Exit - Shown only if exit date is set */}
            {showEmployeeExitPage && (
              <ListItem button onClick={() => handleNavigation("/hrms/dashboardHead/employeeExitHead")} selected={isActive("/hrms/dashboardHead/employeeExitHead")} sx={listItemStyles}>
                <ListItemIcon><RemoveIcon /></ListItemIcon>
                <ListItemText primary="Employee Exit" {...listItemTextProps} />
              </ListItem>
            )}
          </List>
        )}

        {/* VIEW FOR POST-EXIT EMPLOYEES */}
        {!isLoading && showPostExitPages && (
            <List>
                <ListItem button onClick={() => handleMenuClick('apps')} sx={listItemStyles} selected={isActive("/hrms/dashboardHead/assest")}>
                    <ListItemIcon><GroupIcon /></ListItemIcon>
                    <ListItemText primary="Apps" {...listItemTextProps}/>
                    {openMenu === 'apps' || isActive("/hrms/dashboardHead/assest") ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={openMenu === 'apps' || isActive("/hrms/dashboardHead/assest")} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItem button onClick={() => handleNavigation("/hrms/dashboardHead/assest")} selected={isActive("/hrms/dashboardHead/assest")} sx={nestedListItemStyles}>
                            <ListItemText primary="Assets" {...listItemTextProps} />
                        </ListItem>
                    </List>
                </Collapse>
            
                <ListItem button onClick={() => handleNavigation("/hrms/dashboardHead/employeeExitHead")} selected={isActive("/hrms/dashboardHead/employeeExitHead")} sx={listItemStyles}>
                    <ListItemIcon><RemoveIcon /></ListItemIcon>
                    <ListItemText primary="Employee Exit" {...listItemTextProps} />
                </ListItem>
            </List>
        )}
      </Drawer>

      {/* Floating Toggle Button */}
      <IconButton
        onClick={toggleDrawer}
        sx={{
          position: "fixed",
          top: 80,
          left: open ? `${drawerWidth}px` : 0,
          backgroundColor: "#F58E35",
          color: "white",
          "&:hover": { backgroundColor: "#e0792d" },
          zIndex: 2000,
          transition: (theme) => theme.transitions.create("left", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
          borderTopRightRadius: 16,
          borderBottomRightRadius: 16,
        }}
      >
        {open ? <ChevronLeftIcon /> : <MenuIcon />}
      </IconButton>
    </>
  );
}