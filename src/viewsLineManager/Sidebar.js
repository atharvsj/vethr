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
// //           onClick={() => handleNavigation("/hrms/dashboardLM/home")}
// //           selected={isActive("/hrms/dashboardLM/home")}
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
// //               onClick={() => handleNavigation("/hrms/dashboardLM/attendance")}
// //               selected={isActive("/hrms/dashboardLM/attendance")}
// //             >
// //               <ListItemText primary="Attendance" />
// //             </ListItem>

// //             <ListItem
// //               button
// //               sx={{ pl: 4 }}
// //               onClick={() => handleNavigation("/hrms/dashboardLM/monthly-report")}
// //               selected={isActive("/hrms/dashboardLM/monthly-report")}
// //             >
// //               <ListItemText primary="Monthly Report" />
// //             </ListItem>

// //           </List>
// //         </Collapse>

// //         {/* Holiday */}
// //         <ListItem
// //           button
// //           onClick={() => handleNavigation("/hrms/dashboardLM/holiday")}
// //           selected={isActive("/hrms/dashboardLM/holiday")}
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
// //               onClick={() => handleNavigation("/hrms/dashboardLM/leave-request")}
// //               selected={isActive("/hrms/dashboardLM/leave-request")}
// //             >
// //               <ListItemText primary="Leave Request" />
// //             </ListItem>

// //             <ListItem
// //               button
// //               sx={{ pl: 4 }}
// //               onClick={() => handleNavigation("/hrms/dashboardLM/leavetype")}
// //               selected={isActive("/hrms/dashboardLM/leavetype")}
// //             >
// //               <ListItemText primary="Leave Type" />
// //             </ListItem>

// //           </List>
// //         </Collapse>

// //         <ListItem button 
// //          onClick={() => handleNavigation("/hrms/dashboardLM/performanceTable")} 
// //          selected={isActive("/hrms/dashboardLM/performanceTable")}>
// //                       <ListItemIcon>
// //             <EqualizerIcon />
// //           </ListItemIcon>
// //                       <ListItemText primary="Performance Table" />
// //                     </ListItem>

// //         {/* Policies */}
// //         <ListItem
// //           button
// //           onClick={() => handleNavigation("/hrms/dashboardLM/policies")}
// //           selected={isActive("/hrms/dashboardLM/policies")}
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
// //               onClick={() => handleNavigation("/hrms/dashboardLM/appscomp")}
// //               selected={isActive("/hrms/dashboardLM/appscomp")}
// //             >
// //               <ListItemText primary="Events" />
// //             </ListItem>
// //             <ListItem
// //               button
// //               sx={{ pl: 4 }}
// //               onClick={() => handleNavigation("/hrms/dashboardLM/assest")}
// //               selected={isActive("/hrms/dashboardLM/assest")}
// //             >
// //               <ListItemText primary="Assests" />
// //             </ListItem>
// //             <ListItem
// //               button
// //               sx={{ pl: 4 }}
// //               onClick={() => handleNavigation("/hrms/dashboardLM/award")}
// //               selected={isActive("/hrms/dashboardLM/award")}
// //             >
// //               <ListItemText primary="Awards" />
// //             </ListItem>
// //           </List>
// //         </Collapse>

// //         {/* Resignation */}
// //         <ListItem
// //           button
// //           onClick={() => handleNavigation("/hrms/dashboardLM/resignation")}
// //           selected={isActive("/hrms/dashboardLM/resignation")}
// //         >
// //           <ListItemIcon>
// //             <PersonRemoveIcon />
// //           </ListItemIcon>
// //           <ListItemText primary="Resignation" />
// //         </ListItem>

// //         {/* Helpdesk */}
// //         <ListItem
// //           button
// //           onClick={() => handleNavigation("/hrms/dashboardLM/helpdesk")}
// //           selected={isActive("/hrms/dashboardLM/helpdesk")}
// //         >
// //           <ListItemIcon>
// //             <HelpIcon />
// //           </ListItemIcon>
// //           <ListItemText primary="Helpdesk" />
// //         </ListItem>

// //         {/* Payroll */}
// //         <ListItem
// //           button
// //           onClick={() => handleNavigation("/hrms/dashboardLM/payroll")}
// //           selected={isActive("/hrms/dashboardLM/payroll")}
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
//             onClick={() => handleNavigation("/hrms/dashboardLM/home")}
//             selected={isActive("/hrms/dashboardLM/home")}
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
//                     onClick={() => handleNavigation("/hrms/dashboardLM/attendance")}
//                     selected={isActive("/hrms/dashboardLM/attendance")}
//                   >
//                     <ListItemText primary="Attendance" />
//                   </ListItem>
//                   <ListItem
//                     button
//                     sx={{ pl: 4 }}
//                     onClick={() => handleNavigation("/hrms/dashboardLM/monthly-report")}
//                     selected={isActive("/hrms/dashboardLM/monthly-report")}
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
//             onClick={() => handleNavigation("/hrms/dashboardLM/holiday")}
//             selected={isActive("/hrms/dashboardLM/holiday")}
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
//                     onClick={() =>
//                       handleNavigation("/hrms/dashboardLM/leaveapprovals")
//                     }
//                     selected={isActive("/hrms/dashboardLM/leaveapprovals")}
//                   >
//                     <ListItemText primary="Leave Approvals" />
//                   </ListItem>
//                   <ListItem
//                     button
//                     sx={{ pl: 4 }}
//                     onClick={() => handleNavigation("/hrms/dashboardLM/leave-request")}
//                     selected={isActive("/hrms/dashboardLM/leave-request")}
//                   >
//                     <ListItemText primary="Leave Request" />
//                   </ListItem>

//                   <ListItem
//                     button
//                     sx={{ pl: 4 }}
//                     onClick={() => handleNavigation("/hrms/dashboardLM/leavetype")}
//                     selected={isActive("/hrms/dashboardLM/leavetype")}
//                   >
//                     <ListItemText primary="Leave Type" />
//                   </ListItem>
//                 </List>
//               </Collapse>
//             </>
//           )}

//           <ListItem button
//             onClick={() => handleNavigation("/hrms/dashboardLM/performanceTable")}
//             selected={isActive("/hrms/dashboardLM/performanceTable")}>
//             <ListItemIcon>
//               <EqualizerIcon />
//             </ListItemIcon>
//             <ListItemText primary="Performance Table" />
//           </ListItem>

//           {/* Policies */}
//           <ListItem
//             button
//             onClick={() => handleNavigation("/hrms/dashboardLM/policies")}
//             selected={isActive("/hrms/dashboardLM/policies")}
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
//                 onClick={() => handleNavigation("/hrms/dashboardLM/appscomp")}
//                 selected={isActive("/hrms/dashboardLM/appscomp")}
//               >
//                 <ListItemText primary="Events" />
//               </ListItem>
//               <ListItem
//                 button
//                 sx={{ pl: 4 }}
//                 onClick={() => handleNavigation("/hrms/dashboardLM/assest")}
//                 selected={isActive("/hrms/dashboardLM/assest")}
//               >
//                 <ListItemText primary="Assests" />
//               </ListItem>
//               <ListItem
//                 button
//                 sx={{ pl: 4 }}
//                 onClick={() => handleNavigation("/hrms/dashboardLM/award")}
//                 selected={isActive("/hrms/dashboardLM/award")}
//               >
//                 <ListItemText primary="Awards" />
//               </ListItem>
//             </List>
//           </Collapse>

//           {/* Resignation */}
//           <ListItem
//             button
//             onClick={() => handleNavigation("/hrms/dashboardLM/resignation")}
//             selected={isActive("/hrms/dashboardLM/resignation")}
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
//               onClick={() => handleNavigation("/hrms/dashboardLM/payroll")}
//               selected={isActive("/hrms/dashboardLM/payroll")}
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
//             onClick={() => handleNavigation("/hrms/dashboardLM/helpdesk")}
//             selected={isActive("/hrms/dashboardLM/helpdesk")}
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
//             onClick={() => handleNavigation("/hrms/dashboardLM/home")}
//             selected={isActive("/hrms/dashboardLM/home")}
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
//                     onClick={() => handleNavigation("/hrms/dashboardLM/attendance")}
//                     selected={isActive("/hrms/dashboardLM/attendance")}
//                   >
//                     <ListItemText primary="Attendance" />
//                   </ListItem>
//                   <ListItem
//                     button
//                     sx={{ pl: 4 }}
//                     onClick={() => handleNavigation("/hrms/dashboardLM/monthly-report")}
//                     selected={isActive("/hrms/dashboardLM/monthly-report")}
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
//             onClick={() => handleNavigation("/hrms/dashboardLM/holiday")}
//             selected={isActive("/hrms/dashboardLM/holiday")}
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
//                     onClick={() =>
//                       handleNavigation("/hrms/dashboardLM/leaveapprovals")
//                     }
//                     selected={isActive("/hrms/dashboardLM/leaveapprovals")}
//                   >
//                     <ListItemText primary="Leave Approvals" />
//                   </ListItem>
//                   <ListItem
//                     button
//                     sx={{ pl: 4 }}
//                     onClick={() => handleNavigation("/hrms/dashboardLM/leave-request")}
//                     selected={isActive("/hrms/dashboardLM/leave-request")}
//                   >
//                     <ListItemText primary="Leave Request" />
//                   </ListItem>

//                   <ListItem
//                     button
//                     sx={{ pl: 4 }}
//                     onClick={() => handleNavigation("/hrms/dashboardLM/leavetype")}
//                     selected={isActive("/hrms/dashboardLM/leavetype")}
//                   >
//                     <ListItemText primary="Leave Type" />
//                   </ListItem>
//                 </List>
//               </Collapse>
//             </>
//           )}

//           <ListItem button
//             onClick={() => handleNavigation("/hrms/dashboardLM/performanceTable")}
//             selected={isActive("/hrms/dashboardLM/performanceTable")}>
//             <ListItemIcon>
//               <EqualizerIcon />
//             </ListItemIcon>
//             <ListItemText primary="Performance Table" />
//           </ListItem>

//           {/* Policies */}
//           <ListItem
//             button
//             onClick={() => handleNavigation("/hrms/dashboardLM/policies")}
//             selected={isActive("/hrms/dashboardLM/policies")}
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
//                 onClick={() => handleNavigation("/hrms/dashboardLM/appscomp")}
//                 selected={isActive("/hrms/dashboardLM/appscomp")}
//               >
//                 <ListItemText primary="Events" />
//               </ListItem>
//               <ListItem
//                 button
//                 sx={{ pl: 4 }}
//                 onClick={() => handleNavigation("/hrms/dashboardLM/assest")}
//                 selected={isActive("/hrms/dashboardLM/assest")}
//               >
//                 <ListItemText primary="Assests" />
//               </ListItem>
//               <ListItem
//                 button
//                 sx={{ pl: 4 }}
//                 onClick={() => handleNavigation("/hrms/dashboardLM/award")}
//                 selected={isActive("/hrms/dashboardLM/award")}
//               >
//                 <ListItemText primary="Awards" />
//               </ListItem>
//             </List>
//           </Collapse>

//           {/* Resignation */}
//           <ListItem
//             button
//             onClick={() => handleNavigation("/hrms/dashboardLM/resignation")}
//             selected={isActive("/hrms/dashboardLM/resignation")}
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
//               onClick={() => handleNavigation("/hrms/dashboardLM/payroll")}
//               selected={isActive("/hrms/dashboardLM/payroll")}
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
//             onClick={() => handleNavigation("/hrms/dashboardLM/helpdesk")}
//             selected={isActive("/hrms/dashboardLM/helpdesk")}
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

// // --- Style Definitions for the new UI ---
// const primaryOrange = '#F58E35';
// const accentWhite = '#FFFFFF';
// const defaultTextAndIcons = '#FFFFFF';
// const hoverBackground = 'rgba(255, 255, 255, 0.2)'; // Light white for hover effect

// // Common styles for all list items to ensure consistency
// const listItemStyles = {
//   // Default state for text and icon
//   color: defaultTextAndIcons,
//   '& .MuiListItemIcon-root': {
//     color: defaultTextAndIcons,
//   },
  
//   // Hover state
//   '&:hover': {
//     backgroundColor: hoverBackground,
//   },

//   // Selected (active) state
//   '&.Mui-selected': {
//     backgroundColor: accentWhite,
//     color: primaryOrange, // Change text color to orange for visibility
//     '& .MuiListItemText-primary': {
//       fontWeight: 'bold', // Make text bold as requested
//     },
//     '& .MuiListItemIcon-root': {
//       color: primaryOrange, // Change icon color to match the text
//     },
//     '&:hover': {
//       backgroundColor: accentWhite, // Keep the background white on hover
//     },
//   },
// };

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

//   return (
//     <Drawer
//       sx={{
//         width: drawerWidth,
//         flexShrink: 0,
//         "& .MuiDrawer-paper": {
//           width: drawerWidth,
//           boxSizing: "border-box",
//           backgroundColor: primaryOrange, // Set the main background color to ORANGE
//           color: defaultTextAndIcons, // Set default text color to WHITE
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
//         <IconButton onClick={toggleDrawer} sx={{ color: defaultTextAndIcons }}>
//           <ChevronLeftIcon />
//         </IconButton>
//       </Box>
//       <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.3)' }} />

//       {isLoading && (
//         <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
//           <CircularProgress sx={{ color: defaultTextAndIcons }} />
//         </Box>
//       )}

//       {!isLoading && (
//         <List>
//           {/* Home Item */}
//           <ListItem
//             button
//             onClick={() => handleNavigation("/hrms/dashboardLM/home")}
//             selected={isActive("/hrms/dashboardLM/home")}
//             sx={listItemStyles}
//           >
//             <ListItemIcon>
//               <HomeIcon />
//             </ListItemIcon>
//             <ListItemText primary="Home" />
//           </ListItem>

//           {/* Attendance Dropdown (Conditional) */}
//           {showMenusForPolicyAck && (
//             <>
//               <ListItem button onClick={() => handleMenuClick('attendance')} sx={listItemStyles}>
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
//                     onClick={() => handleNavigation("/hrms/dashboardLM/attendance")}
//                     selected={isActive("/hrms/dashboardLM/attendance")}
//                     sx={{ ...listItemStyles, pl: 4 }}
//                   >
//                     <ListItemText primary="Attendance" />
//                   </ListItem>
//                   <ListItem
//                     button
//                     onClick={() => handleNavigation("/hrms/dashboardLM/monthly-report")}
//                     selected={isActive("/hrms/dashboardLM/monthly-report")}
//                     sx={{ ...listItemStyles, pl: 4 }}
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
//             onClick={() => handleNavigation("/hrms/dashboardLM/holiday")}
//             selected={isActive("/hrms/dashboardLM/holiday")}
//             sx={listItemStyles}
//           >
//             <ListItemIcon>
//               <StarIcon />
//             </ListItemIcon>
//             <ListItemText primary="Holiday" />
//           </ListItem>

//           {/* Leave Request Dropdown (Conditional) */}
//           {canShowLeaveMenu && (
//             <>
//               <ListItem button onClick={() => handleMenuClick('leave')} sx={listItemStyles}>
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
//                     onClick={() => handleNavigation("/hrms/dashboardLM/leaveapprovals")}
//                     selected={isActive("/hrms/dashboardLM/leaveapprovals")}
//                     sx={{ ...listItemStyles, pl: 4 }}
//                   >
//                     <ListItemText primary="Leave Approvals" />
//                   </ListItem>
//                   <ListItem
//                     button
//                     onClick={() => handleNavigation("/hrms/dashboardLM/leave-request")}
//                     selected={isActive("/hrms/dashboardLM/leave-request")}
//                     sx={{ ...listItemStyles, pl: 4 }}
//                   >
//                     <ListItemText primary="Leave Request" />
//                   </ListItem>
//                   <ListItem
//                     button
//                     onClick={() => handleNavigation("/hrms/dashboardLM/leavetype")}
//                     selected={isActive("/hrms/dashboardLM/leavetype")}
//                     sx={{ ...listItemStyles, pl: 4 }}
//                   >
//                     <ListItemText primary="Leave Type" />
//                   </ListItem>
//                 </List>
//               </Collapse>
//             </>
//           )}

//           {/* Performance Table */}
//           <ListItem
//             button
//             onClick={() => handleNavigation("/hrms/dashboardLM/performanceTable")}
//             selected={isActive("/hrms/dashboardLM/performanceTable")}
//             sx={listItemStyles}
//           >
//             <ListItemIcon>
//               <EqualizerIcon />
//             </ListItemIcon>
//             <ListItemText primary="Performance Table" />
//           </ListItem>

//           {/* Policies */}
//           <ListItem
//             button
//             onClick={() => handleNavigation("/hrms/dashboardLM/policies")}
//             selected={isActive("/hrms/dashboardLM/policies")}
//             sx={listItemStyles}
//           >
//             <ListItemIcon>
//               <QuestionAnswerIcon />
//             </ListItemIcon>
//             <ListItemText primary="Policies" />
//           </ListItem>

//           {/* Apps Dropdown */}
//           <ListItem button onClick={() => handleMenuClick('apps')} sx={listItemStyles}>
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
//                 onClick={() => handleNavigation("/hrms/dashboardLM/appscomp")}
//                 selected={isActive("/hrms/dashboardLM/appscomp")}
//                 sx={{ ...listItemStyles, pl: 4 }}
//               >
//                 <ListItemText primary="Events" />
//               </ListItem>
//               <ListItem
//                 button
//                 onClick={() => handleNavigation("/hrms/dashboardLM/assest")}
//                 selected={isActive("/hrms/dashboardLM/assest")}
//                 sx={{ ...listItemStyles, pl: 4 }}
//               >
//                 <ListItemText primary="Assets" />
//               </ListItem>
//               <ListItem
//                 button
//                 onClick={() => handleNavigation("/hrms/dashboardLM/award")}
//                 selected={isActive("/hrms/dashboardLM/award")}
//                 sx={{ ...listItemStyles, pl: 4 }}
//               >
//                 <ListItemText primary="Awards" />
//               </ListItem>
//             </List>
//           </Collapse>

//           {/* Resignation */}
//           <ListItem
//             button
//             onClick={() => handleNavigation("/hrms/dashboardLM/resignation")}
//             selected={isActive("/hrms/dashboardLM/resignation")}
//             sx={listItemStyles}
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
//               onClick={() => handleNavigation("/hrms/dashboardLM/payroll")}
//               selected={isActive("/hrms/dashboardLM/payroll")}
//               sx={listItemStyles}
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
//             onClick={() => handleNavigation("/hrms/dashboardLM/helpdesk")}
//             selected={isActive("/hrms/dashboardLM/helpdesk")}
//             sx={listItemStyles}
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
















// import { useState, useEffect } from "react"
// import axios from "axios"
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
// } from "@mui/material"
// import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"
// import HomeIcon from "@mui/icons-material/Home"
// import CalendarTodayIcon from "@mui/icons-material/CalendarToday"
// import GroupIcon from "@mui/icons-material/Group"
// import ExpandLess from "@mui/icons-material/ExpandLess"
// import ExpandMore from "@mui/icons-material/ExpandMore"
// import { useNavigate, useLocation } from "react-router-dom"
// import StarIcon from "@mui/icons-material/Star"
// import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer"
// import HelpIcon from "@mui/icons-material/Help"
// import PersonRemoveIcon from "@mui/icons-material/PersonRemove"
// import PaymentIcon from "@mui/icons-material/Payment"
// import EqualizerIcon from "@mui/icons-material/Equalizer"

// // --- Style Definitions for the new UI ---
// const primaryOrange = "#F58E35"
// const accentWhite = "#FFFFFF"
// const defaultTextAndIcons = "#FFFFFF"
// const hoverBackground = "rgba(255, 255, 255, 0.2)" // Light white for hover effect

// // Common styles for all list items to ensure consistency
// const listItemStyles = {
//   color: defaultTextAndIcons,
//   "& .MuiListItemIcon-root": {
//     color: defaultTextAndIcons,
//   },
//   "& .MuiListItemText-primary": {
//     fontWeight: "bold",
//   },
//   transition: "background-color 0.2s ease, color 0.2s ease",
//   borderRadius: 1, // 8px with default theme spacing

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
// }

// export default function Sidebar({ open, toggleDrawer, drawerWidth }) {
//   const [openMenu, setOpenMenu] = useState(null)
//   const [isLoading, setIsLoading] = useState(true)
//   const [showMenusForPolicyAck, setShowMenusForPolicyAck] = useState(false)
//   const [showLeaveForConfirmationStatus, setShowLeaveForConfirmationStatus] = useState(false)
//   const navigate = useNavigate()
//   const location = useLocation()

//   useEffect(() => {
//     const employeeId = localStorage.getItem("loggedInUser") || ""

//     if (!employeeId) {
//       console.error("Employee ID not found in localStorage.")
//       setIsLoading(false)
//       return
//     }

//     const fetchAllStatuses = async () => {
//       setIsLoading(true)
//       let confirmationStatus = false
//       let policyAckStatus = false

//       try {
//         const response = await axios.get(`https://tdtlworld.com/hrms-backend/EmpConfirmation/${employeeId}/`)
//         const data = Array.isArray(response.data) ? response.data[0] : response.data
//         if (data && (data.employee_confirm === "N" || data.employee_confirm == null)) {
//           confirmationStatus = true
//         }
//       } catch (error) {
//         if (error.response && error.response.status === 404) {
//           console.log("EmpConfirmation record not found (404), showing Leave menu.")
//           confirmationStatus = true
//         } else {
//           console.error("Confirmation API request failed:", error.message || error)
//           confirmationStatus = false
//         }
//       }

//       try {
//         const response = await axios.get(`https://tdtlworld.com/hrms-backend/policy_ack/${employeeId}/`)
//         if (response.data && response.data.status === "Y") {
//           policyAckStatus = true
//         }
//       } catch (error) {
//         if (!error.response || error.response.status !== 404) {
//           console.error("Policy Ack API request failed:", error.message || error)
//         } else {
//           console.log("Policy Ack record not found (404), hiding related menus.")
//         }
//         policyAckStatus = false
//       }

//       setShowLeaveForConfirmationStatus(confirmationStatus)
//       setShowMenusForPolicyAck(policyAckStatus)
//       setIsLoading(false)
//     }

//     fetchAllStatuses()
//   }, [])

//   const handleMenuClick = (menuName) => {
//     setOpenMenu((prevOpenMenu) => (prevOpenMenu === menuName ? null : menuName))
//   }

//   const handleNavigation = (route) => {
//     navigate(route)
//   }

//   const isActive = (route) => location.pathname === route

//   const canShowLeaveMenu = showMenusForPolicyAck && showLeaveForConfirmationStatus

//   return (
//     <Drawer
//       sx={{
//         width: drawerWidth,
//         flexShrink: 0,
//         "& .MuiDrawer-paper": {
//           width: drawerWidth,
//           boxSizing: "border-box",
//           backgroundColor: primaryOrange, // Set the main background color to ORANGE
//           color: defaultTextAndIcons, // Set default text color to WHITE
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
//         <IconButton onClick={toggleDrawer} sx={{ color: defaultTextAndIcons }}>
//           <ChevronLeftIcon />
//         </IconButton>
//       </Box>
//       <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.3)" }} />

//       {isLoading && (
//         <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
//           <CircularProgress sx={{ color: defaultTextAndIcons }} />
//         </Box>
//       )}

//       {!isLoading && (
//         <List sx={{ "& .MuiListItemText-primary": { fontWeight: "bold" } }}>
//           {/* Home Item */}
//           <ListItem
//             button
//             onClick={() => handleNavigation("/hrms/dashboardLM/home")}
//             selected={isActive("/hrms/dashboardLM/home")}
//             sx={listItemStyles}
//           >
//             <ListItemIcon>
//               <HomeIcon />
//             </ListItemIcon>
//             <ListItemText primary="Home" />
//           </ListItem>

//           {/* Attendance Dropdown (Conditional) */}
//           {showMenusForPolicyAck && (
//             <>
//               <ListItem button onClick={() => handleMenuClick("attendance")} sx={listItemStyles}>
//                 <ListItemIcon>
//                   <CalendarTodayIcon />
//                 </ListItemIcon>
//                 <ListItemText primary="Attendance" />
//                 {openMenu === "attendance" ? <ExpandLess /> : <ExpandMore />}
//               </ListItem>
//               <Collapse in={openMenu === "attendance"} timeout="auto" unmountOnExit>
//                 <List component="div" disablePadding>
//                   <ListItem
//                     button
//                     onClick={() => handleNavigation("/hrms/dashboardLM/attendance")}
//                     selected={isActive("/hrms/dashboardLM/attendance")}
//                     sx={{ ...listItemStyles, pl: 4 }}
//                   >
//                     <ListItemText primary="Attendance" />
//                   </ListItem>
//                   <ListItem
//                     button
//                     onClick={() => handleNavigation("/hrms/dashboardLM/monthly-report")}
//                     selected={isActive("/hrms/dashboardLM/monthly-report")}
//                     sx={{ ...listItemStyles, pl: 4 }}
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
//             onClick={() => handleNavigation("/hrms/dashboardLM/holiday")}
//             selected={isActive("/hrms/dashboardLM/holiday")}
//             sx={listItemStyles}
//           >
//             <ListItemIcon>
//               <StarIcon />
//             </ListItemIcon>
//             <ListItemText primary="Holiday" />
//           </ListItem>

//           {/* Leave Request Dropdown (Conditional) */}
//           {canShowLeaveMenu && (
//             <>
//               <ListItem button onClick={() => handleMenuClick("leave")} sx={listItemStyles}>
//                 <ListItemIcon>
//                   <CalendarTodayIcon />
//                 </ListItemIcon>
//                 <ListItemText primary="Leave Request" />
//                 {openMenu === "leave" ? <ExpandLess /> : <ExpandMore />}
//               </ListItem>
//               <Collapse in={openMenu === "leave"} timeout="auto" unmountOnExit>
//                 <List component="div" disablePadding>
//                   <ListItem
//                     button
//                     onClick={() => handleNavigation("/hrms/dashboardLM/leaveapprovals")}
//                     selected={isActive("/hrms/dashboardLM/leaveapprovals")}
//                     sx={{ ...listItemStyles, pl: 4 }}
//                   >
//                     <ListItemText primary="Leave Approvals" />
//                   </ListItem>
//                   <ListItem
//                     button
//                     onClick={() => handleNavigation("/hrms/dashboardLM/leave-request")}
//                     selected={isActive("/hrms/dashboardLM/leave-request")}
//                     sx={{ ...listItemStyles, pl: 4 }}
//                   >
//                     <ListItemText primary="Leave Request" />
//                   </ListItem>
//                   <ListItem
//                     button
//                     onClick={() => handleNavigation("/hrms/dashboardLM/leavetype")}
//                     selected={isActive("/hrms/dashboardLM/leavetype")}
//                     sx={{ ...listItemStyles, pl: 4 }}
//                   >
//                     <ListItemText primary="Leave Type" />
//                   </ListItem>
//                 </List>
//               </Collapse>
//             </>
//           )}

//           {/* Performance Table */}
//           <ListItem
//             button
//             onClick={() => handleNavigation("/hrms/dashboardLM/performanceTable")}
//             selected={isActive("/hrms/dashboardLM/performanceTable")}
//             sx={listItemStyles}
//           >
//             <ListItemIcon>
//               <EqualizerIcon />
//             </ListItemIcon>
//             <ListItemText primary="Performance Table" />
//           </ListItem>

//           {/* Policies */}
//           <ListItem
//             button
//             onClick={() => handleNavigation("/hrms/dashboardLM/policies")}
//             selected={isActive("/hrms/dashboardLM/policies")}
//             sx={listItemStyles}
//           >
//             <ListItemIcon>
//               <QuestionAnswerIcon />
//             </ListItemIcon>
//             <ListItemText primary="Policies" />
//           </ListItem>

//           {/* Apps Dropdown */}
//           <ListItem button onClick={() => handleMenuClick("apps")} sx={listItemStyles}>
//             <ListItemIcon>
//               <GroupIcon />
//             </ListItemIcon>
//             <ListItemText primary="Apps" />
//             {openMenu === "apps" ? <ExpandLess /> : <ExpandMore />}
//           </ListItem>
//           <Collapse in={openMenu === "apps"} timeout="auto" unmountOnExit>
//             <List component="div" disablePadding>
//               <ListItem
//                 button
//                 onClick={() => handleNavigation("/hrms/dashboardLM/appscomp")}
//                 selected={isActive("/hrms/dashboardLM/appscomp")}
//                 sx={{ ...listItemStyles, pl: 4 }}
//               >
//                 <ListItemText primary="Events" />
//               </ListItem>
//               <ListItem
//                 button
//                 onClick={() => handleNavigation("/hrms/dashboardLM/assest")}
//                 selected={isActive("/hrms/dashboardLM/assest")}
//                 sx={{ ...listItemStyles, pl: 4 }}
//               >
//                 <ListItemText primary="Assets" />
//               </ListItem>
//               <ListItem
//                 button
//                 onClick={() => handleNavigation("/hrms/dashboardLM/award")}
//                 selected={isActive("/hrms/dashboardLM/award")}
//                 sx={{ ...listItemStyles, pl: 4 }}
//               >
//                 <ListItemText primary="Awards" />
//               </ListItem>
//             </List>
//           </Collapse>

//           {/* Resignation */}
//           <ListItem
//             button
//             onClick={() => handleNavigation("/hrms/dashboardLM/resignation")}
//             selected={isActive("/hrms/dashboardLM/resignation")}
//             sx={listItemStyles}
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
//               onClick={() => handleNavigation("/hrms/dashboardLM/payroll")}
//               selected={isActive("/hrms/dashboardLM/payroll")}
//               sx={listItemStyles}
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
//             onClick={() => handleNavigation("/hrms/dashboardLM/helpdesk")}
//             selected={isActive("/hrms/dashboardLM/helpdesk")}
//             sx={listItemStyles}
//           >
//             <ListItemIcon>
//               <HelpIcon />
//             </ListItemIcon>
//             <ListItemText primary="Helpdesk" />
//           </ListItem>
//         </List>
//       )}
//     </Drawer>
//   )
// }













// import { useState, useEffect } from "react"
// import axios from "axios"
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
// } from "@mui/material"
// import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"
// import HomeIcon from "@mui/icons-material/Home"
// import CalendarTodayIcon from "@mui/icons-material/CalendarToday"
// import GroupIcon from "@mui/icons-material/Group"
// import ExpandLess from "@mui/icons-material/ExpandLess"
// import ExpandMore from "@mui/icons-material/ExpandMore"
// import { useNavigate, useLocation } from "react-router-dom"
// import StarIcon from "@mui/icons-material/Star"
// import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer"
// import HelpIcon from "@mui/icons-material/Help"
// import PersonRemoveIcon from "@mui/icons-material/PersonRemove"
// import PaymentIcon from "@mui/icons-material/Payment"
// import EqualizerIcon from "@mui/icons-material/Equalizer"

// // --- Style Definitions for the new UI ---
// const primaryOrange = "#F58E35"
// const accentWhite = "#FFFFFF"
// const defaultTextAndIcons = "#FFFFFF"
// const hoverBackground = "rgba(255, 255, 255, 0.2)" // Light white for hover effect

// // Common styles for all list items to ensure consistency
// const listItemStyles = {
//   color: defaultTextAndIcons,
//   "& .MuiListItemIcon-root": {
//     color: defaultTextAndIcons,
//   },
//   "& .MuiListItemText-primary": {
//     fontWeight: "bold",
//   },
//   transition: "background-color 0.2s ease, color 0.2s ease",
//   borderRadius: 1, // 8px with default theme spacing

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
// }

// export default function Sidebar({ open, toggleDrawer, drawerWidth }) {
//   const [openMenu, setOpenMenu] = useState(null)
//   const [isLoading, setIsLoading] = useState(true)
//   const [showMenusForPolicyAck, setShowMenusForPolicyAck] = useState(false)
//   const [showLeaveForConfirmationStatus, setShowLeaveForConfirmationStatus] = useState(false)
//   const navigate = useNavigate()
//   const location = useLocation()

//   // This effect fetches user-specific data to determine which menu items to display.
//   // It runs only once when the component mounts.
//   useEffect(() => {
//     const employeeId = localStorage.getItem("loggedInUser") || ""

//     if (!employeeId) {
//       console.error("Employee ID not found in localStorage.")
//       setIsLoading(false)
//       return
//     }

//     const fetchAllStatuses = async () => {
//       setIsLoading(true)
//       let confirmationStatus = false
//       let policyAckStatus = false

//       try {
//         const response = await axios.get(`https://tdtlworld.com/hrms-backend/EmpConfirmation/${employeeId}/`)
//         const data = Array.isArray(response.data) ? response.data[0] : response.data
//         if (data && (data.employee_confirm === "N" || data.employee_confirm == null)) {
//           confirmationStatus = true
//         }
//       } catch (error) {
//         if (error.response && error.response.status === 404) {
//           console.log("EmpConfirmation record not found (404), showing Leave menu.")
//           confirmationStatus = true
//         } else {
//           console.error("Confirmation API request failed:", error.message || error)
//           confirmationStatus = false
//         }
//       }

//       try {
//         const response = await axios.get(`https://tdtlworld.com/hrms-backend/policy_ack/${employeeId}/`)
//         if (response.data && response.data.status === "Y") {
//           policyAckStatus = true
//         }
//       } catch (error) {
//         if (!error.response || error.response.status !== 404) {
//           console.error("Policy Ack API request failed:", error.message || error)
//         } else {
//           console.log("Policy Ack record not found (404), hiding related menus.")
//         }
//         policyAckStatus = false
//       }

//       setShowLeaveForConfirmationStatus(confirmationStatus)
//       setShowMenusForPolicyAck(policyAckStatus)
//       setIsLoading(false)
//     }

//     fetchAllStatuses()
//   }, [])
  
//   // --- NEW ---
//   // This effect ensures the correct collapsible menu is open based on the current URL.
//   // It runs whenever the location (URL path) changes.
//   useEffect(() => {
//     const currentPath = location.pathname

//     const attendanceRoutes = ["/hrms/dashboardLM/attendance", "/hrms/dashboardLM/monthly-report"]
//     const leaveRoutes = [
//       "/hrms/dashboardLM/leaveapprovals",
//       "/hrms/dashboardLM/leave-request",
//       "/hrms/dashboardLM/leavetype",
//     ]
//     const appRoutes = [
//       "/hrms/dashboardLM/appscomp",
//       "/hrms/dashboardLM/assest",
//       "/hrms/dashboardLM/award",
//     ]

//     if (attendanceRoutes.includes(currentPath)) {
//       setOpenMenu("attendance")
//     } else if (leaveRoutes.includes(currentPath)) {
//       setOpenMenu("leave")
//     } else if (appRoutes.includes(currentPath)) {
//       setOpenMenu("apps")
//     }
//     // Note: We don't close the menu if the route doesn't match. This provides a better
//     // user experience, as the menu stays open if the user navigates to a top-level item.
//   }, [location.pathname])


//   const handleMenuClick = (menuName) => {
//     setOpenMenu((prevOpenMenu) => (prevOpenMenu === menuName ? null : menuName))
//   }

//   const handleNavigation = (route) => {
//     navigate(route)
//   }

//   // This function checks if the given route is the currently active one.
//   const isActive = (route) => location.pathname === route

//   const canShowLeaveMenu = showMenusForPolicyAck && showLeaveForConfirmationStatus

//   return (
//     <Drawer
//       sx={{
//         width: drawerWidth,
//         flexShrink: 0,
//         "& .MuiDrawer-paper": {
//           width: drawerWidth,
//           boxSizing: "border-box",
//           backgroundColor: primaryOrange,
//           color: defaultTextAndIcons,
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
//         <IconButton onClick={toggleDrawer} sx={{ color: defaultTextAndIcons }}>
//           <ChevronLeftIcon />
//         </IconButton>
//       </Box>
//       <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.3)" }} />

//       {isLoading && (
//         <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
//           <CircularProgress sx={{ color: defaultTextAndIcons }} />
//         </Box>
//       )}

//       {!isLoading && (
//         <List sx={{ "& .MuiListItemText-primary": { fontWeight: "bold" } }}>
//           {/* Home Item */}
//           <ListItem
//             button
//             onClick={() => handleNavigation("/hrms/dashboardLM/home")}
//             selected={isActive("/hrms/dashboardLM/home")}
//             sx={listItemStyles}
//           >
//             <ListItemIcon>
//               <HomeIcon />
//             </ListItemIcon>
//             <ListItemText primary="Home" />
//           </ListItem>

//           {/* Attendance Dropdown (Conditional) */}
//           {showMenusForPolicyAck && (
//             <>
//               <ListItem button onClick={() => handleMenuClick("attendance")} sx={listItemStyles}>
//                 <ListItemIcon>
//                   <CalendarTodayIcon />
//                 </ListItemIcon>
//                 <ListItemText primary="Attendance" />
//                 {openMenu === "attendance" ? <ExpandLess /> : <ExpandMore />}
//               </ListItem>
//               <Collapse in={openMenu === "attendance"} timeout="auto" unmountOnExit>
//                 <List component="div" disablePadding>
//                   <ListItem
//                     button
//                     onClick={() => handleNavigation("/hrms/dashboardLM/attendance")}
//                     selected={isActive("/hrms/dashboardLM/attendance")}
//                     sx={{ ...listItemStyles, pl: 4 }}
//                   >
//                     <ListItemText primary="Attendance" />
//                   </ListItem>
//                   <ListItem
//                     button
//                     onClick={() => handleNavigation("/hrms/dashboardLM/monthly-report")}
//                     selected={isActive("/hrms/dashboardLM/monthly-report")}
//                     sx={{ ...listItemStyles, pl: 4 }}
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
//             onClick={() => handleNavigation("/hrms/dashboardLM/holiday")}
//             selected={isActive("/hrms/dashboardLM/holiday")}
//             sx={listItemStyles}
//           >
//             <ListItemIcon>
//               <StarIcon />
//             </ListItemIcon>
//             <ListItemText primary="Holiday" />
//           </ListItem>

//           {/* Leave Request Dropdown (Conditional) */}
//           {canShowLeaveMenu && (
//             <>
//               <ListItem button onClick={() => handleMenuClick("leave")} sx={listItemStyles}>
//                 <ListItemIcon>
//                   <CalendarTodayIcon />
//                 </ListItemIcon>
//                 <ListItemText primary="Leave Request" />
//                 {openMenu === "leave" ? <ExpandLess /> : <ExpandMore />}
//               </ListItem>
//               <Collapse in={openMenu === "leave"} timeout="auto" unmountOnExit>
//                 <List component="div" disablePadding>
//                   <ListItem
//                     button
//                     onClick={() => handleNavigation("/hrms/dashboardLM/leaveapprovals")}
//                     selected={isActive("/hrms/dashboardLM/leaveapprovals")}
//                     sx={{ ...listItemStyles, pl: 4 }}
//                   >
//                     <ListItemText primary="Leave Approvals" />
//                   </ListItem>
//                   <ListItem
//                     button
//                     onClick={() => handleNavigation("/hrms/dashboardLM/leave-request")}
//                     selected={isActive("/hrms/dashboardLM/leave-request")}
//                     sx={{ ...listItemStyles, pl: 4 }}
//                   >
//                     <ListItemText primary="Leave Request" />
//                   </ListItem>
//                   <ListItem
//                     button
//                     onClick={() => handleNavigation("/hrms/dashboardLM/leavetype")}
//                     selected={isActive("/hrms/dashboardLM/leavetype")}
//                     sx={{ ...listItemStyles, pl: 4 }}
//                   >
//                     <ListItemText primary="Leave Type" />
//                   </ListItem>
//                 </List>
//               </Collapse>
//             </>
//           )}

//           {/* Performance Table */}
//           <ListItem
//             button
//             onClick={() => handleNavigation("/hrms/dashboardLM/performanceTable")}
//             selected={isActive("/hrms/dashboardLM/performanceTable")}
//             sx={listItemStyles}
//           >
//             <ListItemIcon>
//               <EqualizerIcon />
//             </ListItemIcon>
//             <ListItemText primary="Performance Table" />
//           </ListItem>

//           {/* Policies */}
//           <ListItem
//             button
//             onClick={() => handleNavigation("/hrms/dashboardLM/policies")}
//             selected={isActive("/hrms/dashboardLM/policies")}
//             sx={listItemStyles}
//           >
//             <ListItemIcon>
//               <QuestionAnswerIcon />
//             </ListItemIcon>
//             <ListItemText primary="Policies" />
//           </ListItem>

//           {/* Apps Dropdown */}
//           <ListItem button onClick={() => handleMenuClick("apps")} sx={listItemStyles}>
//             <ListItemIcon>
//               <GroupIcon />
//             </ListItemIcon>
//             <ListItemText primary="Apps" />
//             {openMenu === "apps" ? <ExpandLess /> : <ExpandMore />}
//           </ListItem>
//           <Collapse in={openMenu === "apps"} timeout="auto" unmountOnExit>
//             <List component="div" disablePadding>
//               <ListItem
//                 button
//                 onClick={() => handleNavigation("/hrms/dashboardLM/appscomp")}
//                 selected={isActive("/hrms/dashboardLM/appscomp")}
//                 sx={{ ...listItemStyles, pl: 4 }}
//               >
//                 <ListItemText primary="Events" />
//               </ListItem>
//               <ListItem
//                 button
//                 onClick={() => handleNavigation("/hrms/dashboardLM/assest")}
//                 selected={isActive("/hrms/dashboardLM/assest")}
//                 sx={{ ...listItemStyles, pl: 4 }}
//               >
//                 <ListItemText primary="Assets" />
//               </ListItem>
//               <ListItem
//                 button
//                 onClick={() => handleNavigation("/hrms/dashboardLM/award")}
//                 selected={isActive("/hrms/dashboardLM/award")}
//                 sx={{ ...listItemStyles, pl: 4 }}
//               >
//                 <ListItemText primary="Awards" />
//               </ListItem>
//             </List>
//           </Collapse>

//           {/* Resignation */}
//           <ListItem
//             button
//             onClick={() => handleNavigation("/hrms/dashboardLM/resignation")}
//             selected={isActive("/hrms/dashboardLM/resignation")}
//             sx={listItemStyles}
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
//               onClick={() => handleNavigation("/hrms/dashboardLM/payroll")}
//               selected={isActive("/hrms/dashboardLM/payroll")}
//               sx={listItemStyles}
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
//             onClick={() => handleNavigation("/hrms/dashboardLM/helpdesk")}
//             selected={isActive("/hrms/dashboardLM/helpdesk")}
//             sx={listItemStyles}
//           >
//             <ListItemIcon>
//               <HelpIcon />
//             </ListItemIcon>
//             <ListItemText primary="Helpdesk" />
//           </ListItem>
//         </List>
//       )}
//     </Drawer>
//   )
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
// import MenuIcon from "@mui/icons-material/Menu"; // <-- Import MenuIcon
// import RemoveIcon from "@mui/icons-material/Remove";



// // --- Style Definitions for the new UI ---
// const primaryOrange = "#F58E35";
// const accentWhite = "#FFFFFF";
// const defaultTextAndIconsColor = "#FFFFFF";
// const hoverBackground = "rgba(255, 255, 255, 0.2)"; // Light white for hover effect

// // Common styles for all list items to ensure consistency
// const listItemStyles = {
//   color: defaultTextAndIconsColor,
//   "& .MuiListItemIcon-root": {
//     color: defaultTextAndIconsColor,
//   },
//   "& .MuiListItemText-primary": {
//     fontWeight: "bold",
//   },
//   transition: "background-color 0.2s ease, color 0.2s ease",
//   borderRadius: 1, // 8px with default theme spacing

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
//   const [openMenu, setOpenMenu] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [showMenusForPolicyAck, setShowMenusForPolicyAck] = useState(false);
//   const [showLeaveForConfirmationStatus, setShowLeaveForConfirmationStatus] = useState(false);
//   const navigate = useNavigate();
//   const location = useLocation();

//   // This effect fetches user-specific data to determine which menu items to display.
//   // It runs only once when the component mounts.
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

//   // This effect ensures the correct collapsible menu is open based on the current URL.
//   // It runs whenever the location (URL path) changes.
//   useEffect(() => {
//     const currentPath = location.pathname;

//     const attendanceRoutes = ["/hrms/dashboardLM/attendance", "/hrms/dashboardLM/monthly-report"];
//     const leaveRoutes = [
//       "/hrms/dashboardLM/leaveapprovals",
//       "/hrms/dashboardLM/leave-request",
//       "/hrms/dashboardLM/leavetype",
//     ];
//     const appRoutes = ["/hrms/dashboardLM/appscomp", "/hrms/dashboardLM/assest", "/hrms/dashboardLM/award"];

//     if (attendanceRoutes.includes(currentPath)) {
//       setOpenMenu("attendance");
//     } else if (leaveRoutes.includes(currentPath)) {
//       setOpenMenu("leave");
//     } else if (appRoutes.includes(currentPath)) {
//       setOpenMenu("apps");
//     }
//   }, [location.pathname]);

//   const handleMenuClick = (menuName) => {
//     setOpenMenu((prevOpenMenu) => (prevOpenMenu === menuName ? null : menuName));
//   };

//   const handleNavigation = (route) => {
//     navigate(route);
//   };

//   // This function checks if the given route is the currently active one.
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
//             backgroundColor: primaryOrange,
//             color: defaultTextAndIconsColor,
//           },
//         }}
//         variant="persistent"
//         anchor="left"
//         open={open}
//       >
//         {/* Header Spacer to push content below the app bar */}
//         <Box sx={{ minHeight: 64 }} />
//         <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.3)" }} />

//         {isLoading && (
//           <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
//             <CircularProgress sx={{ color: defaultTextAndIconsColor }} />
//           </Box>
//         )}

//         {!isLoading && (
//           <List sx={{ p: 1, "& .MuiListItemText-primary": { fontWeight: "bold" } }}>
//             {/* Home Item */}
//             <ListItem
//               button
//               onClick={() => handleNavigation("/hrms/dashboardLM/home")}
//               selected={isActive("/hrms/dashboardLM/home")}
//               sx={listItemStyles}
//             >
//               <ListItemIcon>
//                 <HomeIcon />
//               </ListItemIcon>
//               <ListItemText primary="Home" />
//             </ListItem>

//             {/* Attendance Dropdown (Conditional) */}
//             {showMenusForPolicyAck && (
//               <>
//                 <ListItem button onClick={() => handleMenuClick("attendance")} sx={listItemStyles}>
//                   <ListItemIcon>
//                     <CalendarTodayIcon />
//                   </ListItemIcon>
//                   <ListItemText primary="Attendance" />
//                   {openMenu === "attendance" ? <ExpandLess /> : <ExpandMore />}
//                 </ListItem>
//                 <Collapse in={openMenu === "attendance"} timeout="auto" unmountOnExit>
//                   <List component="div" disablePadding>
//                     <ListItem
//                       button
//                       onClick={() => handleNavigation("/hrms/dashboardLM/attendance")}
//                       selected={isActive("/hrms/dashboardLM/attendance")}
//                       sx={{ ...listItemStyles, pl: 4 }}
//                     >
//                       <ListItemText primary="Attendance" />
//                     </ListItem>
//                     <ListItem
//                       button
//                       onClick={() => handleNavigation("/hrms/dashboardLM/monthly-report")}
//                       selected={isActive("/hrms/dashboardLM/monthly-report")}
//                       sx={{ ...listItemStyles, pl: 4 }}
//                     >
//                       <ListItemText primary="Monthly Report" />
//                     </ListItem>
//                   </List>
//                 </Collapse>
//               </>
//             )}

//             {/* Holiday */}
//             <ListItem
//               button
//               onClick={() => handleNavigation("/hrms/dashboardLM/holiday")}
//               selected={isActive("/hrms/dashboardLM/holiday")}
//               sx={listItemStyles}
//             >
//               <ListItemIcon>
//                 <StarIcon />
//               </ListItemIcon>
//               <ListItemText primary="Holiday" />
//             </ListItem>

//             {/* Leave Request Dropdown (Conditional) */}
//             {canShowLeaveMenu && (
//               <>
//                 <ListItem button onClick={() => handleMenuClick("leave")} sx={listItemStyles}>
//                   <ListItemIcon>
//                     <CalendarTodayIcon />
//                   </ListItemIcon>
//                   <ListItemText primary="Leave Request" />
//                   {openMenu === "leave" ? <ExpandLess /> : <ExpandMore />}
//                 </ListItem>
//                 <Collapse in={openMenu === "leave"} timeout="auto" unmountOnExit>
//                   <List component="div" disablePadding>
//                     <ListItem
//                       button
//                       onClick={() => handleNavigation("/hrms/dashboardLM/leaveapprovals")}
//                       selected={isActive("/hrms/dashboardLM/leaveapprovals")}
//                       sx={{ ...listItemStyles, pl: 4 }}
//                     >
//                       <ListItemText primary="Leave Approvals" />
//                     </ListItem>
//                     <ListItem
//                       button
//                       onClick={() => handleNavigation("/hrms/dashboardLM/leave-request")}
//                       selected={isActive("/hrms/dashboardLM/leave-request")}
//                       sx={{ ...listItemStyles, pl: 4 }}
//                     >
//                       <ListItemText primary="Leave Request" />
//                     </ListItem>
//                     <ListItem
//                       button
//                       onClick={() => handleNavigation("/hrms/dashboardLM/leavetype")}
//                       selected={isActive("/hrms/dashboardLM/leavetype")}
//                       sx={{ ...listItemStyles, pl: 4 }}
//                     >
//                       <ListItemText primary="Leave Type" />
//                     </ListItem>
//                   </List>
//                 </Collapse>
//               </>
//             )}

//             {/* Performance Table */}
//             <ListItem
//               button
//               onClick={() => handleNavigation("/hrms/dashboardLM/performanceTable")}
//               selected={isActive("/hrms/dashboardLM/performanceTable")}
//               sx={listItemStyles}
//             >
//               <ListItemIcon>
//                 <EqualizerIcon />
//               </ListItemIcon>
//               <ListItemText primary="Performance Table" />
//             </ListItem>

//             {/* Policies */}
//             <ListItem
//               button
//               onClick={() => handleNavigation("/hrms/dashboardLM/policies")}
//               selected={isActive("/hrms/dashboardLM/policies")}
//               sx={listItemStyles}
//             >
//               <ListItemIcon>
//                 <QuestionAnswerIcon />
//               </ListItemIcon>
//               <ListItemText primary="Policies" />
//             </ListItem>

//             {/* Apps Dropdown */}
//             <ListItem button onClick={() => handleMenuClick("apps")} sx={listItemStyles}>
//               <ListItemIcon>
//                 <GroupIcon />
//               </ListItemIcon>
//               <ListItemText primary="Apps" />
//               {openMenu === "apps" ? <ExpandLess /> : <ExpandMore />}
//             </ListItem>
//             <Collapse in={openMenu === "apps"} timeout="auto" unmountOnExit>
//               <List component="div" disablePadding>
//                 <ListItem
//                   button
//                   onClick={() => handleNavigation("/hrms/dashboardLM/appscomp")}
//                   selected={isActive("/hrms/dashboardLM/appscomp")}
//                   sx={{ ...listItemStyles, pl: 4 }}
//                 >
//                   <ListItemText primary="Events" />
//                 </ListItem>
//                 <ListItem
//                   button
//                   onClick={() => handleNavigation("/hrms/dashboardLM/assest")}
//                   selected={isActive("/hrms/dashboardLM/assest")}
//                   sx={{ ...listItemStyles, pl: 4 }}
//                 >
//                   <ListItemText primary="Assets" />
//                 </ListItem>
//                 <ListItem
//                   button
//                   onClick={() => handleNavigation("/hrms/dashboardLM/award")}
//                   selected={isActive("/hrms/dashboardLM/award")}
//                   sx={{ ...listItemStyles, pl: 4 }}
//                 >
//                   <ListItemText primary="Awards" />
//                 </ListItem>
//               </List>
//             </Collapse>

//             {/* Resignation */}
//             <ListItem
//               button
//               onClick={() => handleNavigation("/hrms/dashboardLM/resignation")}
//               selected={isActive("/hrms/dashboardLM/resignation")}
//               sx={listItemStyles}
//             >
//               <ListItemIcon>
//                 <PersonRemoveIcon />
//               </ListItemIcon>
//               <ListItemText primary="Resignation" />
//             </ListItem>

//             {/* Payroll (Conditional) */}
//             {showMenusForPolicyAck && (
//               <ListItem
//                 button
//                 onClick={() => handleNavigation("/hrms/dashboardLM/payroll")}
//                 selected={isActive("/hrms/dashboardLM/payroll")}
//                 sx={listItemStyles}
//               >
//                 <ListItemIcon>
//                   <PaymentIcon />
//                 </ListItemIcon>
//                 <ListItemText primary="Payroll" />
//               </ListItem>
//             )}


//             {/* Employee Exit */}
//                     <ListItem
//                           button
//                           onClick={() => handleNavigation("/hrms/dashboardLM/employeeExitLM")}
//                           selected={isActive("/hrms/dashboardLM/employeeExitLM")}
//                           sx={listItemStyles}
//                         >
//                           <ListItemIcon><RemoveIcon /></ListItemIcon>
//                           <ListItemText primary="Employee Exit " />
//                         </ListItem>

//             {/* Helpdesk */}
//             <ListItem
//               button
//               onClick={() => handleNavigation("/hrms/dashboardLM/helpdesk")}
//               selected={isActive("/hrms/dashboardLM/helpdesk")}
//               sx={listItemStyles}
//             >
//               <ListItemIcon>
//                 <HelpIcon />
//               </ListItemIcon>
//               <ListItemText primary="Helpdesk" />
//             </ListItem>
//           </List>
//         )}
//       </Drawer>

//       {/* --- NEW: Always-Visible Floating Toggle Button --- */}
//       <IconButton
//         onClick={toggleDrawer}
//         sx={{
//           position: "fixed",
//           top: 80,
//           // Move the button along with the drawer
//           left: open ? `${drawerWidth}px` : 0,
//           backgroundColor: primaryOrange,
//           color: accentWhite,
//           "&:hover": { backgroundColor: "#e0792d" }, // A slightly darker orange for hover
//           zIndex: (theme) => theme.zIndex.drawer + 1, // Ensure it's above the drawer
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
//           p: 1,
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

// --- Style Definitions ---
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
  const [openMenu, setOpenMenu] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showMenusForPolicyAck, setShowMenusForPolicyAck] = useState(false);
  const [showLeaveForConfirmationStatus, setShowLeaveForConfirmationStatus] = useState(false);
  const [lastWorkingDay, setLastWorkingDay] = useState(null); // Added state for exit logic

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
        // Fetch all data in parallel for better performance
        const [confirmationResponse, policyAckResponse, exitDateResponse] = await Promise.all([
          fetch(`https://tdtlworld.com/hrms-backend/EmpConfirmation/${employeeId}/`),
          fetch(`https://tdtlworld.com/hrms-backend/policy_ack/${employeeId}/`),
          fetch(`https://tdtlworld.com/hrms-backend/get-exit-date/${employeeId}/`)
        ]);

        // Handle Confirmation Status
        if (confirmationResponse.ok) {
          const data = await confirmationResponse.json();
          const confirmationData = Array.isArray(data) ? data[0] : data;
          setShowLeaveForConfirmationStatus(
            !confirmationData || confirmationData.employee_confirm === "N" || confirmationData.employee_confirm === null
          );
        } else if (confirmationResponse.status === 404) {
          console.log("EmpConfirmation record not found (404), showing Leave menu.");
          setShowLeaveForConfirmationStatus(true);
        } else {
          console.error(`Confirmation API call failed: ${confirmationResponse.status}`);
          setShowLeaveForConfirmationStatus(false);
        }

        // Handle Policy Ack Status
        if (policyAckResponse.ok) {
          const policyData = await policyAckResponse.json();
          setShowMenusForPolicyAck(policyData && policyData.status === 'Y');
        } else {
          console.error(`Policy Ack API call failed: ${policyAckResponse.status}`);
          setShowMenusForPolicyAck(false);
        }

        // Handle Exit Date Status
        if (exitDateResponse.ok) {
          const exitData = await exitDateResponse.json();
          setLastWorkingDay(exitData && exitData.last_working_day ? exitData.last_working_day : 'NA');
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

  useEffect(() => {
    const currentPath = location.pathname;
    const attendanceRoutes = ["/hrms/dashboardLM/attendance", "/hrms/dashboardLM/monthly-report"];
    const leaveRoutes = ["/hrms/dashboardLM/leaveapprovals", "/hrms/dashboardLM/leave-request", "/hrms/dashboardLM/leavetype"];
    const appRoutes = ["/hrms/dashboardLM/appscomp", "/hrms/dashboardLM/assest", "/hrms/dashboardLM/award"];

    if (attendanceRoutes.includes(currentPath)) setOpenMenu("attendance");
    else if (leaveRoutes.includes(currentPath)) setOpenMenu("leave");
    else if (appRoutes.includes(currentPath)) setOpenMenu("apps");
  }, [location.pathname]);

  const handleMenuClick = (menuName) => {
    setOpenMenu((prevOpenMenu) => (prevOpenMenu === menuName ? null : menuName));
  };

  const handleNavigation = (route) => navigate(route);
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

  return (
    <>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: primaryOrange,
            color: defaultTextAndIconsColor,
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
            <CircularProgress sx={{ color: defaultTextAndIconsColor }} />
          </Box>
        )}

        {/* VIEW FOR ACTIVE EMPLOYEES */}
        {!isLoading && showAllPages && !showPostExitPages && (
          <List sx={{ p: 1, "& .MuiListItemText-primary": { fontWeight: "bold" } }}>
            <ListItem button onClick={() => handleNavigation("/hrms/dashboardLM/home")} selected={isActive("/hrms/dashboardLM/home")} sx={listItemStyles}>
              <ListItemIcon><HomeIcon /></ListItemIcon>
              <ListItemText primary="Home" />
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
                    <ListItem button onClick={() => handleNavigation("/hrms/dashboardLM/attendance")} selected={isActive("/hrms/dashboardLM/attendance")} sx={{ ...listItemStyles, pl: 4 }}>
                      <ListItemText primary="Attendance" />
                    </ListItem>
                    <ListItem button onClick={() => handleNavigation("/hrms/dashboardLM/monthly-report")} selected={isActive("/hrms/dashboardLM/monthly-report")} sx={{ ...listItemStyles, pl: 4 }}>
                      <ListItemText primary="Monthly Report" />
                    </ListItem>
                  </List>
                </Collapse>
              </>
            )}

            <ListItem button onClick={() => handleNavigation("/hrms/dashboardLM/holiday")} selected={isActive("/hrms/dashboardLM/holiday")} sx={listItemStyles}>
              <ListItemIcon><StarIcon /></ListItemIcon>
              <ListItemText primary="Holiday" />
            </ListItem>

            {/* Leave Request is hidden if employee is exiting in 15 days or less */}
            {canShowLeaveMenu && daysUntilExit > 15 && (
              <>
                <ListItem button onClick={() => handleMenuClick("leave")} sx={listItemStyles}>
                  <ListItemIcon><CalendarTodayIcon /></ListItemIcon>
                  <ListItemText primary="Leave Request" />
                  {openMenu === "leave" ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={openMenu === "leave"} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <ListItem button onClick={() => handleNavigation("/hrms/dashboardLM/leaveapprovals")} selected={isActive("/hrms/dashboardLM/leaveapprovals")} sx={{ ...listItemStyles, pl: 4 }}>
                      <ListItemText primary="Leave Approvals" />
                    </ListItem>
                    <ListItem button onClick={() => handleNavigation("/hrms/dashboardLM/leave-request")} selected={isActive("/hrms/dashboardLM/leave-request")} sx={{ ...listItemStyles, pl: 4 }}>
                      <ListItemText primary="Leave Request" />
                    </ListItem>
                    <ListItem button onClick={() => handleNavigation("/hrms/dashboardLM/leavetype")} selected={isActive("/hrms/dashboardLM/leavetype")} sx={{ ...listItemStyles, pl: 4 }}>
                      <ListItemText primary="Leave Type" />
                    </ListItem>
                  </List>
                </Collapse>
              </>
            )}

            <ListItem button onClick={() => handleNavigation("/hrms/dashboardLM/performanceTable")} selected={isActive("/hrms/dashboardLM/performanceTable")} sx={listItemStyles}>
              <ListItemIcon><EqualizerIcon /></ListItemIcon>
              <ListItemText primary="Performance Table" />
            </ListItem>

            <ListItem button onClick={() => handleNavigation("/hrms/dashboardLM/policies")} selected={isActive("/hrms/dashboardLM/policies")} sx={listItemStyles}>
              <ListItemIcon><QuestionAnswerIcon /></ListItemIcon>
              <ListItemText primary="Policies" />
            </ListItem>

            <ListItem button onClick={() => handleMenuClick("apps")} sx={listItemStyles}>
              <ListItemIcon><GroupIcon /></ListItemIcon>
              <ListItemText primary="Apps" />
              {openMenu === "apps" ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={openMenu === "apps"} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem button onClick={() => handleNavigation("/hrms/dashboardLM/appscomp")} selected={isActive("/hrms/dashboardLM/appscomp")} sx={{ ...listItemStyles, pl: 4 }}>
                  <ListItemText primary="Events" />
                </ListItem>
                <ListItem button onClick={() => handleNavigation("/hrms/dashboardLM/assest")} selected={isActive("/hrms/dashboardLM/assest")} sx={{ ...listItemStyles, pl: 4 }}>
                  <ListItemText primary="Assets" />
                </ListItem>
                <ListItem button onClick={() => handleNavigation("/hrms/dashboardLM/award")} selected={isActive("/hrms/dashboardLM/award")} sx={{ ...listItemStyles, pl: 4 }}>
                  <ListItemText primary="Awards" />
                </ListItem>
              </List>
            </Collapse>

            <ListItem button onClick={() => handleNavigation("/hrms/dashboardLM/resignation")} selected={isActive("/hrms/dashboardLM/resignation")} sx={listItemStyles}>
              <ListItemIcon><PersonRemoveIcon /></ListItemIcon>
              <ListItemText primary="Resignation" />
            </ListItem>

            {showMenusForPolicyAck && (
              <ListItem button onClick={() => handleNavigation("/hrms/dashboardLM/payroll")} selected={isActive("/hrms/dashboardLM/payroll")} sx={listItemStyles}>
                <ListItemIcon><PaymentIcon /></ListItemIcon>
                <ListItemText primary="Payroll" />
              </ListItem>
            )}

            {/* Show Employee Exit link only if a last working day is set */}
            {showEmployeeExitPage && (
              <ListItem button onClick={() => handleNavigation("/hrms/dashboardLM/employeeExitLM")} selected={isActive("/hrms/dashboardLM/employeeExitLM")} sx={listItemStyles}>
                <ListItemIcon><RemoveIcon /></ListItemIcon>
                <ListItemText primary="Employee Exit" />
              </ListItem>
            )}

            <ListItem button onClick={() => handleNavigation("/hrms/dashboardLM/helpdesk")} selected={isActive("/hrms/dashboardLM/helpdesk")} sx={listItemStyles}>
              <ListItemIcon><HelpIcon /></ListItemIcon>
              <ListItemText primary="Helpdesk" />
            </ListItem>
          </List>
        )}

        {/* VIEW FOR POST-EXIT EMPLOYEES */}
        {!isLoading && showPostExitPages && (
          <List sx={{ p: 1, "& .MuiListItemText-primary": { fontWeight: "bold" } }}>
            <ListItem button onClick={() => handleMenuClick('apps')} sx={listItemStyles} selected={isActive("/hrms/dashboardLM/assest")}>
              <ListItemIcon><GroupIcon /></ListItemIcon>
              <ListItemText primary="Apps" />
              {openMenu === 'apps' || isActive("/hrms/dashboardLM/assest") ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={openMenu === 'apps' || isActive("/hrms/dashboardLM/assest")} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem button onClick={() => handleNavigation("/hrms/dashboardLM/assest")} selected={isActive("/hrms/dashboardLM/assest")} sx={{ ...listItemStyles, pl: 4 }}>
                  <ListItemText primary="Assets" />
                </ListItem>
              </List>
            </Collapse>

            <ListItem button onClick={() => handleNavigation("/hrms/dashboardLM/employeeExitLM")} selected={isActive("/hrms/dashboardLM/employeeExitLM")} sx={listItemStyles}>
              <ListItemIcon><RemoveIcon /></ListItemIcon>
              <ListItemText primary="Employee Exit" />
            </ListItem>
          </List>
        )}
      </Drawer>

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