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
//   CircularProgress, // Added for a loading indicator
// } from "@mui/material";
// import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
// import HomeIcon from "@mui/icons-material/Home";
// import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
// import GroupIcon from "@mui/icons-material/Group";
// import ExpandLess from "@mui/icons-material/ExpandLess";
// import ExpandMore from "@mui/icons-material/ExpandMore";
// import { useNavigate, useLocation } from "react-router-dom";
// import StarIcon from '@mui/icons-material/Star';
// import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
// import HelpIcon from '@mui/icons-material/Help';
// import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
// import PaymentIcon from '@mui/icons-material/Payment';
// import RemoveIcon from "@mui/icons-material/Remove";
 
// export default function Sidebar({ open, toggleDrawer, drawerWidth }) {
//   const [openMenu, setOpenMenu] = useState(null);
 
//   // --- State for API-driven visibility ---
//   const [isLoading, setIsLoading] = useState(true);
//   // Condition 2 & 3: Is true only if policy status is 'Y'. Controls Attendance and Payroll.
//   const [showMenusForPolicyAck, setShowMenusForPolicyAck] = useState(false);
//   // Condition 1: Is true only if employee_confirm is 'N' or null.
//   const [showLeaveForConfirmationStatus, setShowLeaveForConfirmationStatus] = useState(false);
//   // New Condition: Show Employee Exit if last_working_day is present.
//   const [showEmployeeExit, setShowEmployeeExit] = useState(false);
 
//   const navigate = useNavigate();
//   const location = useLocation();
 
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
//         const confirmationPromise = fetch(`https://tdtlworld.com/hrms-backend/EmpConfirmation/${employeeId}/`);
//         const policyAckPromise = fetch(`https://tdtlworld.com/hrms-backend/policy_ack/${employeeId}/`);
//         // Add the new API call promise
//         const exitDatePromise = fetch(`https://tdtlworld.com/hrms-backend/get-exit-date/${employeeId}/`);
 
//         const [
//           confirmationResponse,
//           policyAckResponse,
//           exitDateResponse // Get the response from the promise
//         ] = await Promise.all([
//           confirmationPromise,
//           policyAckPromise,
//           exitDatePromise
//         ]);
 
//         // --- Process Employee Confirmation (Condition 1) ---
//         // SHOW Leave Request if employee_confirm is 'N' or null. HIDE if 'Y'.
//         if (confirmationResponse.ok) {
//           const data = await confirmationResponse.json();
//           const confirmationData = Array.isArray(data) ? data[0] : data;
//           if (confirmationData && (confirmationData.employee_confirm === 'N' || confirmationData.employee_confirm === null)) {
//             setShowLeaveForConfirmationStatus(true);
//           } else {
//             setShowLeaveForConfirmationStatus(false); // Hide if 'Y' or any other value
//           }
//         } else {
//           console.error(`Confirmation API call failed: ${confirmationResponse.status}`);
//           setShowLeaveForConfirmationStatus(false); // Default to hidden on error
//         }
 
//         // --- Process Policy Acknowledgment (Condition 2 & 3) ---
//         // SHOW Attendance & Payroll if status is 'Y'. HIDE if 'N' or null.
//         if (policyAckResponse.ok) {
//           const policyData = await policyAckResponse.json();
//           if (policyData && policyData.status === 'Y') {
//             setShowMenusForPolicyAck(true);
//           } else {
//             setShowMenusForPolicyAck(false); // Hide if 'N', null, or any other value
//           }
//         } else {
//           console.error(`Policy Ack API call failed: ${policyAckResponse.status}`);
//           setShowMenusForPolicyAck(false); // Default to hidden on error
//         }
 
//         // --- Process Employee Exit Date (New Condition) ---
//         // SHOW Employee Exit if last_working_day is present and not 'NA'.
//         if (exitDateResponse.ok) {
//           const exitData = await exitDateResponse.json();
//           // Check if last_working_day exists, is not null, and is not "NA"
//           if (exitData && exitData.last_working_day && exitData.last_working_day !== 'NA') {
//             setShowEmployeeExit(true);
//           } else {
//             setShowEmployeeExit(false);
//           }
//         } else {
//           console.error(`Exit Date API call failed: ${exitDateResponse.status}`);
//           setShowEmployeeExit(false); // Default to hidden on error
//         }
 
//       } catch (error) {
//         console.error("Error fetching employee status data:", error);
//         setShowMenusForPolicyAck(false);
//         setShowLeaveForConfirmationStatus(false);
//         setShowEmployeeExit(false); // Ensure it's hidden on a general error
//       } finally {
//         setIsLoading(false);
//       }
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
 
//   // This variable combines the conditions for the Leave menu for cleaner JSX
//   const canShowLeaveMenu = showMenusForPolicyAck && showLeaveForConfirmationStatus;
 
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
//       <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end", p: 1, minHeight: 64 }}>
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
//           {/* Home Item (Always Visible) */}
//           <ListItem button onClick={() => handleNavigation("/hrms/dashboard/home")} selected={isActive("/hrms/dashboard/home")}>
//             <ListItemIcon><HomeIcon /></ListItemIcon>
//             <ListItemText primary="Home" />
//           </ListItem>
 
//           {/* Attendance Dropdown (Condition 2 & 3) */}
//           {showMenusForPolicyAck && (
//             <>
//               <ListItem button onClick={() => handleMenuClick('attendance')}>
//                 <ListItemIcon><CalendarTodayIcon /></ListItemIcon>
//                 <ListItemText primary="Attendance" />
//                 {openMenu === 'attendance' ? <ExpandLess /> : <ExpandMore />}
//               </ListItem>
//               <Collapse in={openMenu === 'attendance'} timeout="auto" unmountOnExit>
//                 <List component="div" disablePadding>
//                   <ListItem button sx={{ pl: 4 }} onClick={() => handleNavigation("/hrms/dashboard/attendance")} selected={isActive("/hrms/dashboard/attendance")}>
//                     <ListItemText primary="Attendance" />
//                   </ListItem>
//                   <ListItem button sx={{ pl: 4 }} onClick={() => handleNavigation("/hrms/dashboard/monthly-report")} selected={isActive("/hrms/dashboard/monthly-report")}>
//                     <ListItemText primary="Monthly Report" />
//                   </ListItem>
//                 </List>
//               </Collapse>
//             </>
//           )}
 
//           {/* Leave Request Dropdown (Combined Conditions) */}
//           {canShowLeaveMenu && (
//             <>
//               <ListItem button onClick={() => handleMenuClick('leave')}>
//                 <ListItemIcon><CalendarTodayIcon /></ListItemIcon>
//                 <ListItemText primary="Leave Request" />
//                 {openMenu === 'leave' ? <ExpandLess /> : <ExpandMore />}
//               </ListItem>
//               <Collapse in={openMenu === 'leave'} timeout="auto" unmountOnExit>
//                 <List component="div" disablePadding>
//                   <ListItem button sx={{ pl: 4 }} onClick={() => handleNavigation("/hrms/dashboard/leave-request")} selected={isActive("/hrms/dashboard/leave-request")}>
//                     <ListItemText primary="Leave Request" />
//                   </ListItem>
//                   <ListItem button sx={{ pl: 4 }} onClick={() => handleNavigation("/hrms/dashboard/leavetype")} selected={isActive("/hrms/dashboard/leavetype")}>
//                     <ListItemText primary="Leave Type" />
//                   </ListItem>
//                 </List>
//               </Collapse>
//             </>
//           )}
 
//           {/* Holiday (Always Visible) */}
//           <ListItem button onClick={() => handleNavigation("/hrms/dashboard/holiday")} selected={isActive("/hrms/dashboard/holiday")}>
//             <ListItemIcon><StarIcon /></ListItemIcon>
//             <ListItemText primary="Holiday" />
//           </ListItem>
 
//           {/* Policies (Always Visible) */}
//           <ListItem button onClick={() => handleNavigation("/hrms/dashboard/policies")} selected={isActive("/hrms/dashboard/policies")}>
//             <ListItemIcon><QuestionAnswerIcon /></ListItemIcon>
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
//                 onClick={() => handleNavigation("/hrms/dashboard/appscomp")}
//               >
//                 <ListItemText primary="Events" />
//               </ListItem>
//               <ListItem
//                 button
//                 sx={{ pl: 4 }}
//                 onClick={() => handleNavigation("/hrms/dashboard/assest")}
//               >
//                 <ListItemText primary="Assests" />
//               </ListItem>
//               <ListItem
//                 button
//                 sx={{ pl: 4 }}
//                 onClick={() => handleNavigation("/hrms/dashboard/award")}
//               >
//                 <ListItemText primary="Awards" />
//               </ListItem>
//             </List>
//           </Collapse>
 
//           {/* Payroll (Condition 2 & 3) */}
//           {showMenusForPolicyAck && (
//             <ListItem button onClick={() => handleNavigation("/hrms/dashboard/payroll")} selected={isActive("/hrms/dashboard/payroll")}>
//               <ListItemIcon><PaymentIcon /></ListItemIcon>
//               <ListItemText primary="Payroll" />
//             </ListItem>
//           )}
 
//           {/* Resignation (Always Visible) */}
//           <ListItem button onClick={() => handleNavigation("/hrms/dashboard/resignation")} selected={isActive("/hrms/dashboard/resignation")}>
//             <ListItemIcon><PersonRemoveIcon /></ListItemIcon>
//             <ListItemText primary="Resignation" />
//           </ListItem>
 
//           {/* Helpdesk (Always Visible) */}
//           <ListItem button onClick={() => handleNavigation("/hrms/dashboard/helpdesk")} selected={isActive("/hrms/dashboard/helpdesk")}>
//             <ListItemIcon><HelpIcon /></ListItemIcon>
//             <ListItemText primary="Helpdesk" />
//           </ListItem>
 
//           {/* Employee Exit (Conditionally Visible) */}
//           {showEmployeeExit && (
//             <ListItem button onClick={() => handleNavigation("/hrms/dashboard/employeeExitEmp")} selected={isActive("/hrms/dashboard/employeeExitEmp")}>
//               <ListItemIcon><RemoveIcon /></ListItemIcon>
//               <ListItemText primary="Employee Exit " />
//             </ListItem>
//           )}
//         </List>
//       )}
//     </Drawer >
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
//   CircularProgress, // Added for a loading indicator
// } from "@mui/material";
// import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
// import HomeIcon from "@mui/icons-material/Home";
// import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
// import GroupIcon from "@mui/icons-material/Group";
// import ExpandLess from "@mui/icons-material/ExpandLess";
// import ExpandMore from "@mui/icons-material/ExpandMore";
// import { useNavigate, useLocation } from "react-router-dom";
// import StarIcon from '@mui/icons-material/Star';
// import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
// import HelpIcon from '@mui/icons-material/Help';
// import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
// import PaymentIcon from '@mui/icons-material/Payment';
// import RemoveIcon from "@mui/icons-material/Remove";
 
// export default function Sidebar({ open, toggleDrawer, drawerWidth }) {
//   const [openMenu, setOpenMenu] = useState(null);
 
//   // --- State for API-driven visibility ---
//   const [isLoading, setIsLoading] = useState(true);
//   // Condition 2 & 3: Is true only if policy status is 'Y'. Controls Attendance and Payroll.
//   const [showMenusForPolicyAck, setShowMenusForPolicyAck] = useState(false);
//   // Condition 1: Is true only if employee_confirm is 'N' or null.
//   const [showLeaveForConfirmationStatus, setShowLeaveForConfirmationStatus] = useState(false);
//   // New Condition: Show Employee Exit if last_working_day is present.
//   const [showEmployeeExit, setShowEmployeeExit] = useState(false);
 
//   const navigate = useNavigate();
//   const location = useLocation();
 
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
//         const confirmationPromise = fetch(`https://tdtlworld.com/hrms-backend/EmpConfirmation/${employeeId}/`);
//         const policyAckPromise = fetch(`https://tdtlworld.com/hrms-backend/policy_ack/${employeeId}/`);
//         // Add the new API call promise
//         const exitDatePromise = fetch(`https://tdtlworld.com/hrms-backend/get-exit-date/${employeeId}/`);
 
//         const [
//           confirmationResponse,
//           policyAckResponse,
//           exitDateResponse // Get the response from the promise
//         ] = await Promise.all([
//           confirmationPromise,
//           policyAckPromise,
//           exitDatePromise
//         ]);
 
//         // --- Process Employee Confirmation (Condition 1) ---
//         // SHOW Leave Request if employee_confirm is 'N' or null. HIDE if 'Y'.
//         if (confirmationResponse.ok) {
//           const data = await confirmationResponse.json();
//           const confirmationData = Array.isArray(data) ? data[0] : data;
//           if (confirmationData && (confirmationData.employee_confirm === 'N' || confirmationData.employee_confirm === null)) {
//             setShowLeaveForConfirmationStatus(true);
//           } else {
//             setShowLeaveForConfirmationStatus(false); // Hide if 'Y' or any other value
//           }
//         } else {
//           console.error(`Confirmation API call failed: ${confirmationResponse.status}`);
//           setShowLeaveForConfirmationStatus(false); // Default to hidden on error
//         }
 
//         // --- Process Policy Acknowledgment (Condition 2 & 3) ---
//         // SHOW Attendance & Payroll if status is 'Y'. HIDE if 'N' or null.
//         if (policyAckResponse.ok) {
//           const policyData = await policyAckResponse.json();
//           if (policyData && policyData.status === 'Y') {
//             setShowMenusForPolicyAck(true);
//           } else {
//             setShowMenusForPolicyAck(false); // Hide if 'N', null, or any other value
//           }
//         } else {
//           console.error(`Policy Ack API call failed: ${policyAckResponse.status}`);
//           setShowMenusForPolicyAck(false); // Default to hidden on error
//         }
 
//         // --- Process Employee Exit Date (New Condition) ---
//         // SHOW Employee Exit if last_working_day is present and not 'NA'.
//         if (exitDateResponse.ok) {
//           const exitData = await exitDateResponse.json();
//           // Check if last_working_day exists, is not null, and is not "NA"
//           if (exitData && exitData.last_working_day && exitData.last_working_day !== 'NA') {
//             setShowEmployeeExit(true);
//           } else {
//             setShowEmployeeExit(false);
//           }
//         } else {
//           console.error(`Exit Date API call failed: ${exitDateResponse.status}`);
//           setShowEmployeeExit(false); // Default to hidden on error
//         }
 
//       } catch (error) {
//         console.error("Error fetching employee status data:", error);
//         setShowMenusForPolicyAck(false);
//         setShowLeaveForConfirmationStatus(false);
//         setShowEmployeeExit(false); // Ensure it's hidden on a general error
//       } finally {
//         setIsLoading(false);
//       }
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
 
//   // This variable combines the conditions for the Leave menu for cleaner JSX
//   const canShowLeaveMenu = showMenusForPolicyAck && showLeaveForConfirmationStatus;
 
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
//       <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end", p: 1, minHeight: 64 }}>
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
//           {/* Home Item (Always Visible) */}
//           <ListItem button onClick={() => handleNavigation("/hrms/dashboard/home")} selected={isActive("/hrms/dashboard/home")}>
//             <ListItemIcon><HomeIcon /></ListItemIcon>
//             <ListItemText primary="Home" />
//           </ListItem>
 
//           {/* Attendance Dropdown (Condition 2 & 3) */}
//           {showMenusForPolicyAck && (
//             <>
//               <ListItem button onClick={() => handleMenuClick('attendance')}>
//                 <ListItemIcon><CalendarTodayIcon /></ListItemIcon>
//                 <ListItemText primary="Attendance" />
//                 {openMenu === 'attendance' ? <ExpandLess /> : <ExpandMore />}
//               </ListItem>
//               <Collapse in={openMenu === 'attendance'} timeout="auto" unmountOnExit>
//                 <List component="div" disablePadding>
//                   <ListItem button sx={{ pl: 4 }} onClick={() => handleNavigation("/hrms/dashboard/attendance")} selected={isActive("/hrms/dashboard/attendance")}>
//                     <ListItemText primary="Attendance" />
//                   </ListItem>
//                   <ListItem button sx={{ pl: 4 }} onClick={() => handleNavigation("/hrms/dashboard/monthly-report")} selected={isActive("/hrms/dashboard/monthly-report")}>
//                     <ListItemText primary="Monthly Report" />
//                   </ListItem>
//                 </List>
//               </Collapse>
//             </>
//           )}
 
//           {/* Leave Request Dropdown (Combined Conditions) */}
//           {canShowLeaveMenu && (
//             <>
//               <ListItem button onClick={() => handleMenuClick('leave')}>
//                 <ListItemIcon><CalendarTodayIcon /></ListItemIcon>
//                 <ListItemText primary="Leave Request" />
//                 {openMenu === 'leave' ? <ExpandLess /> : <ExpandMore />}
//               </ListItem>
//               <Collapse in={openMenu === 'leave'} timeout="auto" unmountOnExit>
//                 <List component="div" disablePadding>
//                   <ListItem button sx={{ pl: 4 }} onClick={() => handleNavigation("/hrms/dashboard/leave-request")} selected={isActive("/hrms/dashboard/leave-request")}>
//                     <ListItemText primary="Leave Request" />
//                   </ListItem>
//                   <ListItem button sx={{ pl: 4 }} onClick={() => handleNavigation("/hrms/dashboard/leavetype")} selected={isActive("/hrms/dashboard/leavetype")}>
//                     <ListItemText primary="Leave Type" />
//                   </ListItem>
//                 </List>
//               </Collapse>
//             </>
//           )}
 
//           {/* Holiday (Always Visible) */}
//           <ListItem button onClick={() => handleNavigation("/hrms/dashboard/holiday")} selected={isActive("/hrms/dashboard/holiday")}>
//             <ListItemIcon><StarIcon /></ListItemIcon>
//             <ListItemText primary="Holiday" />
//           </ListItem>
 
//           {/* Policies (Always Visible) */}
//           <ListItem button onClick={() => handleNavigation("/hrms/dashboard/policies")} selected={isActive("/hrms/dashboard/policies")}>
//             <ListItemIcon><QuestionAnswerIcon /></ListItemIcon>
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
//                 onClick={() => handleNavigation("/hrms/dashboard/appscomp")}
//               >
//                 <ListItemText primary="Events" />
//               </ListItem>
//               <ListItem
//                 button
//                 sx={{ pl: 4 }}
//                 onClick={() => handleNavigation("/hrms/dashboard/assest")}
//               >
//                 <ListItemText primary="Assets" /> 
//               </ListItem>
//               <ListItem
//                 button
//                 sx={{ pl: 4 }}
//                 onClick={() => handleNavigation("/hrms/dashboard/award")}
//               >
//                 <ListItemText primary="Awards" />
//               </ListItem>
//             </List>
//           </Collapse>
 
//           {/* Payroll (Condition 2 & 3) */}
//           {showMenusForPolicyAck && (
//             <ListItem button onClick={() => handleNavigation("/hrms/dashboard/payroll")} selected={isActive("/hrms/dashboard/payroll")}>
//               <ListItemIcon><PaymentIcon /></ListItemIcon>
//               <ListItemText primary="Payroll" />
//             </ListItem>
//           )}
 
//           {/* Resignation (Always Visible) */}
//           <ListItem button onClick={() => handleNavigation("/hrms/dashboard/resignation")} selected={isActive("/hrms/dashboard/resignation")}>
//             <ListItemIcon><PersonRemoveIcon /></ListItemIcon>
//             <ListItemText primary="Resignation" />
//           </ListItem>
 
//           {/* Helpdesk (Always Visible) */}
//           <ListItem button onClick={() => handleNavigation("/hrms/dashboard/helpdesk")} selected={isActive("/hrms/dashboard/helpdesk")}>
//             <ListItemIcon><HelpIcon /></ListItemIcon>
//             <ListItemText primary="Helpdesk" />
//           </ListItem>
 
//           {/* Employee Exit (Conditionally Visible) */}
//           {showEmployeeExit && (
//             <ListItem button onClick={() => handleNavigation("/hrms/dashboard/employeeExitEmp")} selected={isActive("/hrms/dashboard/employeeExitEmp")}>
//               <ListItemIcon><RemoveIcon /></ListItemIcon>
//               <ListItemText primary="Employee Exit " />
//             </ListItem>
//           )}
//         </List>
//       )}
//     </Drawer >
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
// import ExpandLess from "@mui/icons-material/ExpandLess";
// import ExpandMore from "@mui/icons-material/ExpandMore";
// import { useNavigate, useLocation } from "react-router-dom";
// import StarIcon from '@mui/icons-material/Star';
// import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
// import HelpIcon from '@mui/icons-material/Help';
// import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
// import PaymentIcon from '@mui/icons-material/Payment';
// import RemoveIcon from "@mui/icons-material/Remove";

// const primaryOrange = "#F58E35";
// const accentWhite = "#FFFFFF";
// const defaultTextAndIcons = "#FFFFFF";
// const hoverBackground = "rgba(255, 255, 255, 0.2)";

// const listItemStyles = {
//   color: defaultTextAndIcons,
//   "& .MuiListItemIcon-root": {
//     color: defaultTextAndIcons,
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
//   const [openMenu, setOpenMenu] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [showMenusForPolicyAck, setShowMenusForPolicyAck] = useState(false);
//   const [showLeaveForConfirmationStatus, setShowLeaveForConfirmationStatus] = useState(false);
//   const [showEmployeeExit, setShowEmployeeExit] = useState(false);

//   const navigate = useNavigate();
//   const location = useLocation();

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
//         const confirmationPromise = fetch(`https://tdtlworld.com/hrms-backend/EmpConfirmation/${employeeId}/`);
//         const policyAckPromise = fetch(`https://tdtlworld.com/hrms-backend/policy_ack/${employeeId}/`);
//         const exitDatePromise = fetch(`https://tdtlworld.com/hrms-backend/get-exit-date/${employeeId}/`);

//         const [
//           confirmationResponse,
//           policyAckResponse,
//           exitDateResponse
//         ] = await Promise.all([
//           confirmationPromise,
//           policyAckPromise,
//           exitDatePromise
//         ]);

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

//         if (exitDateResponse.ok) {
//           const exitData = await exitDateResponse.json();
//           if (exitData && exitData.last_working_day && exitData.last_working_day !== 'NA') {
//             setShowEmployeeExit(true);
//           } else {
//             setShowEmployeeExit(false);
//           }
//         } else {
//           console.error(`Exit Date API call failed: ${exitDateResponse.status}`);
//           setShowEmployeeExit(false);
//         }

//       } catch (error) {
//         console.error("Error fetching employee status data:", error);
//         setShowMenusForPolicyAck(false);
//         setShowLeaveForConfirmationStatus(false);
//         setShowEmployeeExit(false);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchAllStatuses();
//   }, []);

//   useEffect(() => {
//     const currentPath = location.pathname;

//     const attendanceRoutes = ["/hrms/dashboard/attendance", "/hrms/dashboard/monthly-report"];
//     const leaveRoutes = ["/hrms/dashboard/leave-request", "/hrms/dashboard/leavetype"];
//     const appRoutes = ["/hrms/dashboard/appscomp", "/hrms/dashboard/assest", "/hrms/dashboard/award"];

//     if (attendanceRoutes.includes(currentPath)) {
//       setOpenMenu("attendance");
//     } else if (leaveRoutes.includes(currentPath)) {
//       setOpenMenu("leave");
//     } else if (appRoutes.includes(currentPath)) {
//       setOpenMenu("apps");
//     }
//   }, [location.pathname]);

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
//           backgroundColor: primaryOrange,
//           color: defaultTextAndIcons,
//         },
//       }}
//       variant="persistent"
//       anchor="left"
//       open={open}
//     >
//       <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end", p: 1, minHeight: 64 }}>
//         <IconButton onClick={toggleDrawer} sx={{ color: defaultTextAndIcons }}>
//           <ChevronLeftIcon />
//         </IconButton>
//       </Box>
//       <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.3)" }} />

//       {isLoading && (
//         <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
//           <CircularProgress sx={{ color: defaultTextAndIcons }} />
//         </Box>
//       )}

//       {!isLoading && (
//         <List sx={{ "& .MuiListItemText-primary": { fontWeight: "bold" } }}>
//           <ListItem
//             button
//             onClick={() => handleNavigation("/hrms/dashboard/home")}
//             selected={isActive("/hrms/dashboard/home")}
//             sx={listItemStyles}
//           >
//             <ListItemIcon><HomeIcon /></ListItemIcon>
//             <ListItemText primary="Home" />
//           </ListItem>

//           {showMenusForPolicyAck && (
//             <>
//               <ListItem button onClick={() => handleMenuClick('attendance')} sx={listItemStyles}>
//                 <ListItemIcon><CalendarTodayIcon /></ListItemIcon>
//                 <ListItemText primary="Attendance" />
//                 {openMenu === 'attendance' ? <ExpandLess /> : <ExpandMore />}
//               </ListItem>
//               <Collapse in={openMenu === 'attendance'} timeout="auto" unmountOnExit>
//                 <List component="div" disablePadding>
//                   <ListItem
//                     button
//                     onClick={() => handleNavigation("/hrms/dashboard/attendance")}
//                     selected={isActive("/hrms/dashboard/attendance")}
//                     sx={{ ...listItemStyles, pl: 4 }}
//                   >
//                     <ListItemText primary="Attendance" />
//                   </ListItem>
//                   <ListItem
//                     button
//                     onClick={() => handleNavigation("/hrms/dashboard/monthly-report")}
//                     selected={isActive("/hrms/dashboard/monthly-report")}
//                     sx={{ ...listItemStyles, pl: 4 }}
//                   >
//                     <ListItemText primary="Monthly Report" />
//                   </ListItem>
//                 </List>
//               </Collapse>
//             </>
//           )}

//           {canShowLeaveMenu && (
//             <>
//               <ListItem button onClick={() => handleMenuClick('leave')} sx={listItemStyles}>
//                 <ListItemIcon><CalendarTodayIcon /></ListItemIcon>
//                 <ListItemText primary="Leave Request" />
//                 {openMenu === 'leave' ? <ExpandLess /> : <ExpandMore />}
//               </ListItem>
//               <Collapse in={openMenu === 'leave'} timeout="auto" unmountOnExit>
//                 <List component="div" disablePadding>
//                   <ListItem
//                     button
//                     onClick={() => handleNavigation("/hrms/dashboard/leave-request")}
//                     selected={isActive("/hrms/dashboard/leave-request")}
//                     sx={{ ...listItemStyles, pl: 4 }}
//                   >
//                     <ListItemText primary="Leave Request" />
//                   </ListItem>
//                   <ListItem
//                     button
//                     onClick={() => handleNavigation("/hrms/dashboard/leavetype")}
//                     selected={isActive("/hrms/dashboard/leavetype")}
//                     sx={{ ...listItemStyles, pl: 4 }}
//                   >
//                     <ListItemText primary="Leave Type" />
//                   </ListItem>
//                 </List>
//               </Collapse>
//             </>
//           )}

//           <ListItem
//             button
//             onClick={() => handleNavigation("/hrms/dashboard/holiday")}
//             selected={isActive("/hrms/dashboard/holiday")}
//             sx={listItemStyles}
//           >
//             <ListItemIcon><StarIcon /></ListItemIcon>
//             <ListItemText primary="Holiday" />
//           </ListItem>

//           <ListItem
//             button
//             onClick={() => handleNavigation("/hrms/dashboard/policies")}
//             selected={isActive("/hrms/dashboard/policies")}
//             sx={listItemStyles}
//           >
//             <ListItemIcon><QuestionAnswerIcon /></ListItemIcon>
//             <ListItemText primary="Policies" />
//           </ListItem>

//           <ListItem button onClick={() => handleMenuClick('apps')} sx={listItemStyles}>
//             <ListItemIcon><GroupIcon /></ListItemIcon>
//             <ListItemText primary="Apps" />
//             {openMenu === 'apps' ? <ExpandLess /> : <ExpandMore />}
//           </ListItem>
//           <Collapse in={openMenu === 'apps'} timeout="auto" unmountOnExit>
//             <List component="div" disablePadding>
//               <ListItem
//                 button
//                 onClick={() => handleNavigation("/hrms/dashboard/appscomp")}
//                 selected={isActive("/hrms/dashboard/appscomp")}
//                 sx={{ ...listItemStyles, pl: 4 }}
//               >
//                 <ListItemText primary="Events" />
//               </ListItem>
//               <ListItem
//                 button
//                 onClick={() => handleNavigation("/hrms/dashboard/assest")}
//                 selected={isActive("/hrms/dashboard/assest")}
//                 sx={{ ...listItemStyles, pl: 4 }}
//               >
//                 <ListItemText primary="Assets" />
//               </ListItem>
//               <ListItem
//                 button
//                 onClick={() => handleNavigation("/hrms/dashboard/award")}
//                 selected={isActive("/hrms/dashboard/award")}
//                 sx={{ ...listItemStyles, pl: 4 }}
//               >
//                 <ListItemText primary="Awards" />
//               </ListItem>
//             </List>
//           </Collapse>

//           {showMenusForPolicyAck && (
//             <ListItem
//               button
//               onClick={() => handleNavigation("/hrms/dashboard/payroll")}
//               selected={isActive("/hrms/dashboard/payroll")}
//               sx={listItemStyles}
//             >
//               <ListItemIcon><PaymentIcon /></ListItemIcon>
//               <ListItemText primary="Payroll" />
//             </ListItem>
//           )}

//           <ListItem
//             button
//             onClick={() => handleNavigation("/hrms/dashboard/resignation")}
//             selected={isActive("/hrms/dashboard/resignation")}
//             sx={listItemStyles}
//           >
//             <ListItemIcon><PersonRemoveIcon /></ListItemIcon>
//             <ListItemText primary="Resignation" />
//           </ListItem>

//           <ListItem
//             button
//             onClick={() => handleNavigation("/hrms/dashboard/helpdesk")}
//             selected={isActive("/hrms/dashboard/helpdesk")}
//             sx={listItemStyles}
//           >
//             <ListItemIcon><HelpIcon /></ListItemIcon>
//             <ListItemText primary="Helpdesk" />
//           </ListItem>

//           {showEmployeeExit && (
//             <ListItem
//               button
//               onClick={() => handleNavigation("/hrms/dashboard/employeeExitEmp")}
//               selected={isActive("/hrms/dashboard/employeeExitEmp")}
//               sx={listItemStyles}
//             >
//               <ListItemIcon><RemoveIcon /></ListItemIcon>
//               <ListItemText primary="Employee Exit " />
//             </ListItem>
//           )}
//         </List>
//       )}
//     </Drawer >
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
// import ExpandLess from "@mui/icons-material/ExpandLess";
// import ExpandMore from "@mui/icons-material/ExpandMore";
// import { useNavigate, useLocation } from "react-router-dom";
// import StarIcon from '@mui/icons-material/Star';
// import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
// import HelpIcon from '@mui/icons-material/Help';
// import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
// import PaymentIcon from '@mui/icons-material/Payment';
// import RemoveIcon from "@mui/icons-material/Remove";

// const primaryOrange = "#F58E35";
// const accentWhite = "#FFFFFF";
// const defaultTextAndIcons = "#FFFFFF";
// const hoverBackground = "rgba(255, 255, 255, 0.2)";

// const listItemStyles = {
//   color: defaultTextAndIcons,
//   "& .MuiListItemIcon-root": {
//     color: defaultTextAndIcons,
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
//   const [openMenu, setOpenMenu] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [showMenusForPolicyAck, setShowMenusForPolicyAck] = useState(false);
//   const [showLeaveForConfirmationStatus, setShowLeaveForConfirmationStatus] = useState(false);
//   const [lastWorkingDay, setLastWorkingDay] = useState(null);

//   const navigate = useNavigate();
//   const location = useLocation();

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
//         const confirmationPromise = fetch(`https://tdtlworld.com/hrms-backend/EmpConfirmation/${employeeId}/`);
//         const policyAckPromise = fetch(`https://tdtlworld.com/hrms-backend/policy_ack/${employeeId}/`);
//         const exitDatePromise = fetch(`https://tdtlworld.com/hrms-backend/get-exit-date/${employeeId}/`);

//         const [
//           confirmationResponse,
//           policyAckResponse,
//           exitDateResponse
//         ] = await Promise.all([
//           confirmationPromise,
//           policyAckPromise,
//           exitDatePromise
//         ]);

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

//         if (exitDateResponse.ok) {
//           const exitData = await exitDateResponse.json();
//           if (exitData && exitData.last_working_day) {
//             setLastWorkingDay(exitData.last_working_day);
//           } else {
//             setLastWorkingDay('NA');
//           }
//         } else {
//           console.error(`Exit Date API call failed: ${exitDateResponse.status}`);
//           setLastWorkingDay('NA');
//         }
        

//       } catch (error) {
//         console.error("Error fetching employee status data:", error);
//         setShowMenusForPolicyAck(false);
//         setShowLeaveForConfirmationStatus(false);
//         setLastWorkingDay('NA');
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchAllStatuses();
//   }, []);

//   useEffect(() => {
//     const currentPath = location.pathname;

//     const attendanceRoutes = ["/hrms/dashboard/attendance", "/hrms/dashboard/monthly-report"];
//     const leaveRoutes = ["/hrms/dashboard/leave-request", "/hrms/dashboard/leavetype"];
//     const appRoutes = ["/hrms/dashboard/appscomp", "/hrms/dashboard/assest", "/hrms/dashboard/award"];

//     if (attendanceRoutes.includes(currentPath)) {
//       setOpenMenu("attendance");
//     } else if (leaveRoutes.includes(currentPath)) {
//       setOpenMenu("leave");
//     } else if (appRoutes.includes(currentPath)) {
//       setOpenMenu("apps");
//     }
//   }, [location.pathname]);

//   const handleMenuClick = (menuName) => {
//     setOpenMenu(prevOpenMenu => (prevOpenMenu === menuName ? null : menuName));
//   };

//   const handleNavigation = (route) => {
//     navigate(route);
//   };

//   const isActive = (route) => location.pathname === route;

//   const canShowLeaveMenu = showMenusForPolicyAck && showLeaveForConfirmationStatus;

//   const today = new Date();
//   today.setHours(0, 0, 0, 0); 
//   const exitDate = lastWorkingDay && lastWorkingDay !== 'NA' ? new Date(lastWorkingDay) : null;
  
//   let daysUntilExit = Infinity;
//   if (exitDate) {
//     const timeDiff = exitDate.getTime() - today.getTime();
//     daysUntilExit = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
//   }

//   const showAllPages = lastWorkingDay === 'NA' || daysUntilExit > 0;
//   const showPostExitPages = daysUntilExit <= 0 && lastWorkingDay !== 'NA';
//   const showEmployeeExitPage = lastWorkingDay && lastWorkingDay !== 'NA';

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
//       <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end", p: 1, minHeight: 64 }}>
//         <IconButton onClick={toggleDrawer} sx={{ color: defaultTextAndIcons }}>
//           <ChevronLeftIcon />
//         </IconButton>
//       </Box>
//       <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.3)" }} />

//       {isLoading && (
//         <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
//           <CircularProgress sx={{ color: defaultTextAndIcons }} />
//         </Box>
//       )}

//       {!isLoading && showAllPages && !showPostExitPages && (
//         <List sx={{ "& .MuiListItemText-primary": { fontWeight: "bold" } }}>
//           <ListItem
//             button
//             onClick={() => handleNavigation("/hrms/dashboard/home")}
//             selected={isActive("/hrms/dashboard/home")}
//             sx={listItemStyles}
//           >
//             <ListItemIcon><HomeIcon /></ListItemIcon>
//             <ListItemText primary="Home" />
//           </ListItem>

//           {showMenusForPolicyAck && (
//             <>
//               <ListItem button onClick={() => handleMenuClick('attendance')} sx={listItemStyles}>
//                 <ListItemIcon><CalendarTodayIcon /></ListItemIcon>
//                 <ListItemText primary="Attendance" />
//                 {openMenu === 'attendance' ? <ExpandLess /> : <ExpandMore />}
//               </ListItem>
//               <Collapse in={openMenu === 'attendance'} timeout="auto" unmountOnExit>
//                 <List component="div" disablePadding>
//                   <ListItem
//                     button
//                     onClick={() => handleNavigation("/hrms/dashboard/attendance")}
//                     selected={isActive("/hrms/dashboard/attendance")}
//                     sx={{ ...listItemStyles, pl: 4 }}
//                   >
//                     <ListItemText primary="Attendance" />
//                   </ListItem>
//                   <ListItem
//                     button
//                     onClick={() => handleNavigation("/hrms/dashboard/monthly-report")}
//                     selected={isActive("/hrms/dashboard/monthly-report")}
//                     sx={{ ...listItemStyles, pl: 4 }}
//                   >
//                     <ListItemText primary="Monthly Report" />
//                   </ListItem>
//                 </List>
//               </Collapse>
//             </>
//           )}

//           {canShowLeaveMenu && daysUntilExit > 15 && (
//             <>
//               <ListItem button onClick={() => handleMenuClick('leave')} sx={listItemStyles}>
//                 <ListItemIcon><CalendarTodayIcon /></ListItemIcon>
//                 <ListItemText primary="Leave Request" />
//                 {openMenu === 'leave' ? <ExpandLess /> : <ExpandMore />}
//               </ListItem>
//               <Collapse in={openMenu === 'leave'} timeout="auto" unmountOnExit>
//                 <List component="div" disablePadding>
//                   <ListItem
//                     button
//                     onClick={() => handleNavigation("/hrms/dashboard/leave-request")}
//                     selected={isActive("/hrms/dashboard/leave-request")}
//                     sx={{ ...listItemStyles, pl: 4 }}
//                   >
//                     <ListItemText primary="Leave Request" />
//                   </ListItem>
//                   <ListItem
//                     button
//                     onClick={() => handleNavigation("/hrms/dashboard/leavetype")}
//                     selected={isActive("/hrms/dashboard/leavetype")}
//                     sx={{ ...listItemStyles, pl: 4 }}
//                   >
//                     <ListItemText primary="Leave Type" />
//                   </ListItem>
//                 </List>
//               </Collapse>
//             </>
//           )}

//           <ListItem
//             button
//             onClick={() => handleNavigation("/hrms/dashboard/holiday")}
//             selected={isActive("/hrms/dashboard/holiday")}
//             sx={listItemStyles}
//           >
//             <ListItemIcon><StarIcon /></ListItemIcon>
//             <ListItemText primary="Holiday" />
//           </ListItem>

//           <ListItem
//             button
//             onClick={() => handleNavigation("/hrms/dashboard/policies")}
//             selected={isActive("/hrms/dashboard/policies")}
//             sx={listItemStyles}
//           >
//             <ListItemIcon><QuestionAnswerIcon /></ListItemIcon>
//             <ListItemText primary="Policies" />
//           </ListItem>

//           <ListItem button onClick={() => handleMenuClick('apps')} sx={listItemStyles}>
//             <ListItemIcon><GroupIcon /></ListItemIcon>
//             <ListItemText primary="Apps" />
//             {openMenu === 'apps' ? <ExpandLess /> : <ExpandMore />}
//           </ListItem>
//           <Collapse in={openMenu === 'apps'} timeout="auto" unmountOnExit>
//             <List component="div" disablePadding>
//               <ListItem
//                 button
//                 onClick={() => handleNavigation("/hrms/dashboard/appscomp")}
//                 selected={isActive("/hrms/dashboard/appscomp")}
//                 sx={{ ...listItemStyles, pl: 4 }}
//               >
//                 <ListItemText primary="Events" />
//               </ListItem>
//               <ListItem
//                 button
//                 onClick={() => handleNavigation("/hrms/dashboard/assest")}
//                 selected={isActive("/hrms/dashboard/assest")}
//                 sx={{ ...listItemStyles, pl: 4 }}
//               >
//                 <ListItemText primary="Assets" />
//               </ListItem>
//               <ListItem
//                 button
//                 onClick={() => handleNavigation("/hrms/dashboard/award")}
//                 selected={isActive("/hrms/dashboard/award")}
//                 sx={{ ...listItemStyles, pl: 4 }}
//               >
//                 <ListItemText primary="Awards" />
//               </ListItem>
//             </List>
//           </Collapse>

//           {showMenusForPolicyAck && (
//             <ListItem
//               button
//               onClick={() => handleNavigation("/hrms/dashboard/payroll")}
//               selected={isActive("/hrms/dashboard/payroll")}
//               sx={listItemStyles}
//             >
//               <ListItemIcon><PaymentIcon /></ListItemIcon>
//               <ListItemText primary="Payroll" />
//             </ListItem>
//           )}

//           <ListItem
//             button
//             onClick={() => handleNavigation("/hrms/dashboard/resignation")}
//             selected={isActive("/hrms/dashboard/resignation")}
//             sx={listItemStyles}
//           >
//             <ListItemIcon><PersonRemoveIcon /></ListItemIcon>
//             <ListItemText primary="Resignation" />
//           </ListItem>

//           <ListItem
//             button
//             onClick={() => handleNavigation("/hrms/dashboard/helpdesk")}
//             selected={isActive("/hrms/dashboard/helpdesk")}
//             sx={listItemStyles}
//           >
//             <ListItemIcon><HelpIcon /></ListItemIcon>
//             <ListItemText primary="Helpdesk" />
//           </ListItem>

//           {showEmployeeExitPage && (
//             <ListItem
//               button
//               onClick={() => handleNavigation("/hrms/dashboard/employeeExitEmp")}
//               selected={isActive("/hrms/dashboard/employeeExitEmp")}
//               sx={listItemStyles}
//             >
//               <ListItemIcon><RemoveIcon /></ListItemIcon>
//               <ListItemText primary="Employee Exit " />
//             </ListItem>
//           )}
//         </List>
//       )}

//       {!isLoading && showPostExitPages && (
//         <List sx={{ "& .MuiListItemText-primary": { fontWeight: "bold" } }}>
//            <ListItem button onClick={() => handleMenuClick('apps')} sx={listItemStyles} selected={isActive("/hrms/dashboard/assest")}>
//             <ListItemIcon><GroupIcon /></ListItemIcon>
//             <ListItemText primary="Apps" />
//             {openMenu === 'apps' || isActive("/hrms/dashboard/assest") ? <ExpandLess /> : <ExpandMore />}
//           </ListItem>
//           <Collapse in={openMenu === 'apps' || isActive("/hrms/dashboard/assest")} timeout="auto" unmountOnExit>
//             <List component="div" disablePadding>
//               <ListItem
//                 button
//                 onClick={() => handleNavigation("/hrms/dashboard/assest")}
//                 selected={isActive("/hrms/dashboard/assest")}
//                 sx={{ ...listItemStyles, pl: 4 }}
//               >
//                 <ListItemText primary="Assets" />
//               </ListItem>
//             </List>
//           </Collapse>
          
//           <ListItem
//               button
//               onClick={() => handleNavigation("/hrms/dashboard/employeeExitEmp")}
//               selected={isActive("/hrms/dashboard/employeeExitEmp")}
//               sx={listItemStyles}
//             >
//               <ListItemIcon><RemoveIcon /></ListItemIcon>
//               <ListItemText primary="Employee Exit " />
//             </ListItem>
//         </List>
//       )}
//     </Drawer >
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
// import ExpandLess from "@mui/icons-material/ExpandLess";
// import ExpandMore from "@mui/icons-material/ExpandMore";
// import { useNavigate, useLocation } from "react-router-dom";
// import StarIcon from '@mui/icons-material/Star';
// import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
// import HelpIcon from '@mui/icons-material/Help';
// import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
// import PaymentIcon from '@mui/icons-material/Payment';
// import RemoveIcon from "@mui/icons-material/Remove";
// import MenuIcon from "@mui/icons-material/Menu"; // Added for the toggle button

// const primaryOrange = "#F58E35";
// const accentWhite = "#FFFFFF";
// const defaultTextAndIcons = "#FFFFFF";
// const hoverBackground = "rgba(255, 255, 255, 0.2)";

// const listItemStyles = {
//   color: defaultTextAndIcons,
//   "& .MuiListItemIcon-root": {
//     color: defaultTextAndIcons,
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
//   const [openMenu, setOpenMenu] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [showMenusForPolicyAck, setShowMenusForPolicyAck] = useState(false);
//   const [showLeaveForConfirmationStatus, setShowLeaveForConfirmationStatus] = useState(false);
//   const [lastWorkingDay, setLastWorkingDay] = useState(null);

//   const navigate = useNavigate();
//   const location = useLocation();

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
//         const confirmationPromise = fetch(`https://tdtlworld.com/hrms-backend/EmpConfirmation/${employeeId}/`);
//         const policyAckPromise = fetch(`https://tdtlworld.com/hrms-backend/policy_ack/${employeeId}/`);
//         const exitDatePromise = fetch(`https://tdtlworld.com/hrms-backend/get-exit-date/${employeeId}/`);

//         const [
//           confirmationResponse,
//           policyAckResponse,
//           exitDateResponse
//         ] = await Promise.all([
//           confirmationPromise,
//           policyAckPromise,
//           exitDatePromise
//         ]);

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

//         if (exitDateResponse.ok) {
//           const exitData = await exitDateResponse.json();
//           if (exitData && exitData.last_working_day) {
//             setLastWorkingDay(exitData.last_working_day);
//           } else {
//             setLastWorkingDay('NA');
//           }
//         } else {
//           console.error(`Exit Date API call failed: ${exitDateResponse.status}`);
//           setLastWorkingDay('NA');
//         }
//       } catch (error) {
//         console.error("Error fetching employee status data:", error);
//         setShowMenusForPolicyAck(false);
//         setShowLeaveForConfirmationStatus(false);
//         setLastWorkingDay('NA');
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchAllStatuses();
//   }, []);

//   useEffect(() => {
//     const currentPath = location.pathname;
//     const attendanceRoutes = ["/hrms/dashboard/attendance", "/hrms/dashboard/monthly-report"];
//     const leaveRoutes = ["/hrms/dashboard/leave-request", "/hrms/dashboard/leavetype"];
//     const appRoutes = ["/hrms/dashboard/appscomp", "/hrms/dashboard/assest", "/hrms/dashboard/award"];

//     if (attendanceRoutes.includes(currentPath)) {
//       setOpenMenu("attendance");
//     } else if (leaveRoutes.includes(currentPath)) {
//       setOpenMenu("leave");
//     } else if (appRoutes.includes(currentPath)) {
//       setOpenMenu("apps");
//     }
//   }, [location.pathname]);

//   const handleMenuClick = (menuName) => {
//     setOpenMenu(prevOpenMenu => (prevOpenMenu === menuName ? null : menuName));
//   };

//   const handleNavigation = (route) => {
//     navigate(route);
//   };

//   const isActive = (route) => location.pathname === route;
//   const canShowLeaveMenu = showMenusForPolicyAck && showLeaveForConfirmationStatus;
//   const today = new Date();
//   today.setHours(0, 0, 0, 0); 
//   const exitDate = lastWorkingDay && lastWorkingDay !== 'NA' ? new Date(lastWorkingDay) : null;
  
//   let daysUntilExit = Infinity;
//   if (exitDate) {
//     const timeDiff = exitDate.getTime() - today.getTime();
//     daysUntilExit = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
//   }

//   const showAllPages = lastWorkingDay === 'NA' || daysUntilExit > 0;
//   const showPostExitPages = daysUntilExit <= 0 && lastWorkingDay !== 'NA';
//   const showEmployeeExitPage = lastWorkingDay && lastWorkingDay !== 'NA';

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
//             color: defaultTextAndIcons,
//           },
//         }}
//         variant="persistent"
//         anchor="left"
//         open={open}
//       >
//         {/* This Box acts as a spacer for the App Bar */}
//         <Box sx={{ minHeight: 64 }} /> 
//         <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.3)" }} />

//         {isLoading && (
//           <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
//             <CircularProgress sx={{ color: defaultTextAndIcons }} />
//           </Box>
//         )}

//         {!isLoading && showAllPages && !showPostExitPages && (
//           <List sx={{ p: 1, "& .MuiListItemText-primary": { fontWeight: "bold" } }}>
//             <ListItem
//               button
//               onClick={() => handleNavigation("/hrms/dashboard/home")}
//               selected={isActive("/hrms/dashboard/home")}
//               sx={listItemStyles}
//             >
//               <ListItemIcon><HomeIcon /></ListItemIcon>
//               <ListItemText primary="Home" />
//             </ListItem>

//             {showMenusForPolicyAck && (
//               <>
//                 <ListItem button onClick={() => handleMenuClick('attendance')} sx={listItemStyles}>
//                   <ListItemIcon><CalendarTodayIcon /></ListItemIcon>
//                   <ListItemText primary="Attendance" />
//                   {openMenu === 'attendance' ? <ExpandLess /> : <ExpandMore />}
//                 </ListItem>
//                 <Collapse in={openMenu === 'attendance'} timeout="auto" unmountOnExit>
//                   <List component="div" disablePadding>
//                     <ListItem button onClick={() => handleNavigation("/hrms/dashboard/attendance")} selected={isActive("/hrms/dashboard/attendance")} sx={{ ...listItemStyles, pl: 4 }}>
//                       <ListItemText primary="Attendance" />
//                     </ListItem>
//                     <ListItem button onClick={() => handleNavigation("/hrms/dashboard/monthly-report")} selected={isActive("/hrms/dashboard/monthly-report")} sx={{ ...listItemStyles, pl: 4 }}>
//                       <ListItemText primary="Monthly Report" />
//                     </ListItem>
//                   </List>
//                 </Collapse>
//               </>
//             )}

//             {canShowLeaveMenu && daysUntilExit > 15 && (
//               <>
//                 <ListItem button onClick={() => handleMenuClick('leave')} sx={listItemStyles}>
//                   <ListItemIcon><CalendarTodayIcon /></ListItemIcon>
//                   <ListItemText primary="Leave Request" />
//                   {openMenu === 'leave' ? <ExpandLess /> : <ExpandMore />}
//                 </ListItem>
//                 <Collapse in={openMenu === 'leave'} timeout="auto" unmountOnExit>
//                   <List component="div" disablePadding>
//                     <ListItem button onClick={() => handleNavigation("/hrms/dashboard/leave-request")} selected={isActive("/hrms/dashboard/leave-request")} sx={{ ...listItemStyles, pl: 4 }}>
//                       <ListItemText primary="Leave Request" />
//                     </ListItem>
//                     <ListItem button onClick={() => handleNavigation("/hrms/dashboard/leavetype")} selected={isActive("/hrms/dashboard/leavetype")} sx={{ ...listItemStyles, pl: 4 }}>
//                       <ListItemText primary="Leave Type" />
//                     </ListItem>
//                   </List>
//                 </Collapse>
//               </>
//             )}

//             <ListItem button onClick={() => handleNavigation("/hrms/dashboard/holiday")} selected={isActive("/hrms/dashboard/holiday")} sx={listItemStyles}>
//               <ListItemIcon><StarIcon /></ListItemIcon>
//               <ListItemText primary="Holiday" />
//             </ListItem>

//             <ListItem button onClick={() => handleNavigation("/hrms/dashboard/policies")} selected={isActive("/hrms/dashboard/policies")} sx={listItemStyles}>
//               <ListItemIcon><QuestionAnswerIcon /></ListItemIcon>
//               <ListItemText primary="Policies" />
//             </ListItem>

//             <ListItem button onClick={() => handleMenuClick('apps')} sx={listItemStyles}>
//               <ListItemIcon><GroupIcon /></ListItemIcon>
//               <ListItemText primary="Apps" />
//               {openMenu === 'apps' ? <ExpandLess /> : <ExpandMore />}
//             </ListItem>
//             <Collapse in={openMenu === 'apps'} timeout="auto" unmountOnExit>
//               <List component="div" disablePadding>
//                 <ListItem button onClick={() => handleNavigation("/hrms/dashboard/appscomp")} selected={isActive("/hrms/dashboard/appscomp")} sx={{ ...listItemStyles, pl: 4 }}>
//                   <ListItemText primary="Events" />
//                 </ListItem>
//                 <ListItem button onClick={() => handleNavigation("/hrms/dashboard/assest")} selected={isActive("/hrms/dashboard/assest")} sx={{ ...listItemStyles, pl: 4 }}>
//                   <ListItemText primary="Assets" />
//                 </ListItem>
//                 <ListItem button onClick={() => handleNavigation("/hrms/dashboard/award")} selected={isActive("/hrms/dashboard/award")} sx={{ ...listItemStyles, pl: 4 }}>
//                   <ListItemText primary="Awards" />
//                 </ListItem>
//               </List>
//             </Collapse>

//             {showMenusForPolicyAck && (
//               <ListItem button onClick={() => handleNavigation("/hrms/dashboard/payroll")} selected={isActive("/hrms/dashboard/payroll")} sx={listItemStyles}>
//                 <ListItemIcon><PaymentIcon /></ListItemIcon>
//                 <ListItemText primary="Payroll" />
//               </ListItem>
//             )}

//             <ListItem button onClick={() => handleNavigation("/hrms/dashboard/resignation")} selected={isActive("/hrms/dashboard/resignation")} sx={listItemStyles}>
//               <ListItemIcon><PersonRemoveIcon /></ListItemIcon>
//               <ListItemText primary="Resignation" />
//             </ListItem>

//             <ListItem button onClick={() => handleNavigation("/hrms/dashboard/helpdesk")} selected={isActive("/hrms/dashboard/helpdesk")} sx={listItemStyles}>
//               <ListItemIcon><HelpIcon /></ListItemIcon>
//               <ListItemText primary="Helpdesk" />
//             </ListItem>

//             {showEmployeeExitPage && (
//               <ListItem button onClick={() => handleNavigation("/hrms/dashboard/employeeExitEmp")} selected={isActive("/hrms/dashboard/employeeExitEmp")} sx={listItemStyles}>
//                 <ListItemIcon><RemoveIcon /></ListItemIcon>
//                 <ListItemText primary="Employee Exit" />
//               </ListItem>
//             )}
//           </List>
//         )}

//         {!isLoading && showPostExitPages && (
//           <List sx={{ p: 1, "& .MuiListItemText-primary": { fontWeight: "bold" } }}>
//             <ListItem button onClick={() => handleMenuClick('apps')} sx={listItemStyles} selected={isActive("/hrms/dashboard/assest")}>
//               <ListItemIcon><GroupIcon /></ListItemIcon>
//               <ListItemText primary="Apps" />
//               {openMenu === 'apps' || isActive("/hrms/dashboard/assest") ? <ExpandLess /> : <ExpandMore />}
//             </ListItem>
//             <Collapse in={openMenu === 'apps' || isActive("/hrms/dashboard/assest")} timeout="auto" unmountOnExit>
//               <List component="div" disablePadding>
//                 <ListItem button onClick={() => handleNavigation("/hrms/dashboard/assest")} selected={isActive("/hrms/dashboard/assest")} sx={{ ...listItemStyles, pl: 4 }}>
//                   <ListItemText primary="Assets" />
//                 </ListItem>
//               </List>
//             </Collapse>
            
//             <ListItem button onClick={() => handleNavigation("/hrms/dashboard/employeeExitEmp")} selected={isActive("/hrms/dashboard/employeeExitEmp")} sx={listItemStyles}>
//               <ListItemIcon><RemoveIcon /></ListItemIcon>
//               <ListItemText primary="Employee Exit" />
//             </ListItem>
//           </List>
//         )}
//       </Drawer>

//       {/* --- Floating Toggle Button --- */}
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
//           boxShadow: 3,
//         }}
//       >
//         {open ? <ChevronLeftIcon /> : <MenuIcon />}
//       </IconButton>
//     </>
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
// import ExpandLess from "@mui/icons-material/ExpandLess";
// import ExpandMore from "@mui/icons-material/ExpandMore";
// import { useNavigate, useLocation } from "react-router-dom";
// import StarIcon from '@mui/icons-material/Star';
// import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
// import HelpIcon from '@mui/icons-material/Help';
// import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
// import PaymentIcon from '@mui/icons-material/Payment';
// import RemoveIcon from "@mui/icons-material/Remove";
// import MenuIcon from "@mui/icons-material/Menu";

// const primaryOrange = "#F58E35";
// const accentWhite = "#FFFFFF";
// const defaultTextAndIcons = "#FFFFFF";
// const hoverBackground = "rgba(255, 255, 255, 0.2)";

// const listItemStyles = {
//   color: defaultTextAndIcons,
//   "& .MuiListItemIcon-root": {
//     color: defaultTextAndIcons,
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
//   const [openMenu, setOpenMenu] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [showMenusForPolicyAck, setShowMenusForPolicyAck] = useState(false);
//   const [showLeaveForConfirmationStatus, setShowLeaveForConfirmationStatus] = useState(false);
//   const [lastWorkingDay, setLastWorkingDay] = useState(null);

//   const navigate = useNavigate();
//   const location = useLocation();

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
//         const confirmationPromise = fetch(`https://tdtlworld.com/hrms-backend/EmpConfirmation/${employeeId}/`);
//         const policyAckPromise = fetch(`https://tdtlworld.com/hrms-backend/policy_ack/${employeeId}/`);
//         const exitDatePromise = fetch(`https://tdtlworld.com/hrms-backend/get-exit-date/${employeeId}/`);

//         const [
//           confirmationResponse,
//           policyAckResponse,
//           exitDateResponse
//         ] = await Promise.all([
//           confirmationPromise,
//           policyAckPromise,
//           exitDatePromise
//         ]);

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

//         if (exitDateResponse.ok) {
//           const exitData = await exitDateResponse.json();
//           if (exitData && exitData.last_working_day) {
//             setLastWorkingDay(exitData.last_working_day);
//           } else {
//             setLastWorkingDay('NA');
//           }
//         } else {
//           console.error(`Exit Date API call failed: ${exitDateResponse.status}`);
//           setLastWorkingDay('NA');
//         }
//       } catch (error) {
//         console.error("Error fetching employee status data:", error);
//         setShowMenusForPolicyAck(false);
//         setShowLeaveForConfirmationStatus(false);
//         setLastWorkingDay('NA');
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchAllStatuses();
//   }, []);

//   useEffect(() => {
//     const currentPath = location.pathname;
//     const attendanceRoutes = ["/hrms/dashboard/attendance", "/hrms/dashboard/monthly-report"];
//     const leaveRoutes = ["/hrms/dashboard/leave-request", "/hrms/dashboard/leavetype"];
//     const appRoutes = ["/hrms/dashboard/appscomp", "/hrms/dashboard/assest", "/hrms/dashboard/award"];

//     if (attendanceRoutes.includes(currentPath)) {
//       setOpenMenu("attendance");
//     } else if (leaveRoutes.includes(currentPath)) {
//       setOpenMenu("leave");
//     } else if (appRoutes.includes(currentPath)) {
//       setOpenMenu("apps");
//     }
//   }, [location.pathname]);

//   const handleMenuClick = (menuName) => {
//     setOpenMenu(prevOpenMenu => (prevOpenMenu === menuName ? null : menuName));
//   };

//   const handleNavigation = (route) => {
//     navigate(route);
//   };

//   const isActive = (route) => location.pathname === route;
//   const canShowLeaveMenu = showMenusForPolicyAck && showLeaveForConfirmationStatus;
//   const today = new Date();
//   today.setHours(0, 0, 0, 0); 
//   const exitDate = lastWorkingDay && lastWorkingDay !== 'NA' ? new Date(lastWorkingDay) : null;
  
//   let daysUntilExit = Infinity;
//   if (exitDate) {
//     const timeDiff = exitDate.getTime() - today.getTime();
//     daysUntilExit = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
//   }

//   const showAllPages = lastWorkingDay === 'NA' || daysUntilExit > 0;
//   const showPostExitPages = daysUntilExit <= 0 && lastWorkingDay !== 'NA';
//   const showEmployeeExitPage = lastWorkingDay && lastWorkingDay !== 'NA';

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
//             color: defaultTextAndIcons,
//           },
//         }}
//         variant="persistent"
//         anchor="left"
//         open={open}
//       >
//         <Box sx={{ minHeight: 64 }} /> 
//         <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.3)" }} />

//         {isLoading && (
//           <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
//             <CircularProgress sx={{ color: defaultTextAndIcons }} />
//           </Box>
//         )}

//         {!isLoading && showAllPages && !showPostExitPages && (
//           <List sx={{ p: 1, "& .MuiListItemText-primary": { fontWeight: "bold" } }}>
//             <ListItem
//               button
//               onClick={() => handleNavigation("/hrms/dashboard/home")}
//               selected={isActive("/hrms/dashboard/home")}
//               sx={listItemStyles}
//             >
//               <ListItemIcon><HomeIcon /></ListItemIcon>
//               <ListItemText primary="Home" />
//             </ListItem>

//             {showMenusForPolicyAck && (
//               <>
//                 <ListItem button onClick={() => handleMenuClick('attendance')} sx={listItemStyles}>
//                   <ListItemIcon><CalendarTodayIcon /></ListItemIcon>
//                   <ListItemText primary="Attendance" />
//                   {openMenu === 'attendance' ? <ExpandLess /> : <ExpandMore />}
//                 </ListItem>
//                 <Collapse in={openMenu === 'attendance'} timeout="auto" unmountOnExit>
//                   <List component="div" disablePadding>
//                     <ListItem button onClick={() => handleNavigation("/hrms/dashboard/attendance")} selected={isActive("/hrms/dashboard/attendance")} sx={{ ...listItemStyles, pl: 4 }}>
//                       <ListItemText primary="Attendance" />
//                     </ListItem>
//                     <ListItem button onClick={() => handleNavigation("/hrms/dashboard/monthly-report")} selected={isActive("/hrms/dashboard/monthly-report")} sx={{ ...listItemStyles, pl: 4 }}>
//                       <ListItemText primary="Monthly Report" />
//                     </ListItem>
//                   </List>
//                 </Collapse>
//               </>
//             )}

//             {canShowLeaveMenu && daysUntilExit > 15 && (
//               <>
//                 <ListItem button onClick={() => handleMenuClick('leave')} sx={listItemStyles}>
//                   <ListItemIcon><CalendarTodayIcon /></ListItemIcon>
//                   <ListItemText primary="Leave Request" />
//                   {openMenu === 'leave' ? <ExpandLess /> : <ExpandMore />}
//                 </ListItem>
//                 <Collapse in={openMenu === 'leave'} timeout="auto" unmountOnExit>
//                   <List component="div" disablePadding>
//                     <ListItem button onClick={() => handleNavigation("/hrms/dashboard/leave-request")} selected={isActive("/hrms/dashboard/leave-request")} sx={{ ...listItemStyles, pl: 4 }}>
//                       <ListItemText primary="Leave Request" />
//                     </ListItem>
//                     <ListItem button onClick={() => handleNavigation("/hrms/dashboard/leavetype")} selected={isActive("/hrms/dashboard/leavetype")} sx={{ ...listItemStyles, pl: 4 }}>
//                       <ListItemText primary="Leave Type" />
//                     </ListItem>
//                   </List>
//                 </Collapse>
//               </>
//             )}

//             <ListItem button onClick={() => handleNavigation("/hrms/dashboard/holiday")} selected={isActive("/hrms/dashboard/holiday")} sx={listItemStyles}>
//               <ListItemIcon><StarIcon /></ListItemIcon>
//               <ListItemText primary="Holiday" />
//             </ListItem>

//             <ListItem button onClick={() => handleNavigation("/hrms/dashboard/policies")} selected={isActive("/hrms/dashboard/policies")} sx={listItemStyles}>
//               <ListItemIcon><QuestionAnswerIcon /></ListItemIcon>
//               <ListItemText primary="Policies" />
//             </ListItem>

//             <ListItem button onClick={() => handleMenuClick('apps')} sx={listItemStyles}>
//               <ListItemIcon><GroupIcon /></ListItemIcon>
//               <ListItemText primary="Apps" />
//               {openMenu === 'apps' ? <ExpandLess /> : <ExpandMore />}
//             </ListItem>
//             <Collapse in={openMenu === 'apps'} timeout="auto" unmountOnExit>
//               <List component="div" disablePadding>
//                 <ListItem button onClick={() => handleNavigation("/hrms/dashboard/appscomp")} selected={isActive("/hrms/dashboard/appscomp")} sx={{ ...listItemStyles, pl: 4 }}>
//                   <ListItemText primary="Events" />
//                 </ListItem>
//                 <ListItem button onClick={() => handleNavigation("/hrms/dashboard/assest")} selected={isActive("/hrms/dashboard/assest")} sx={{ ...listItemStyles, pl: 4 }}>
//                   <ListItemText primary="Assets" />
//                 </ListItem>
//                 <ListItem button onClick={() => handleNavigation("/hrms/dashboard/award")} selected={isActive("/hrms/dashboard/award")} sx={{ ...listItemStyles, pl: 4 }}>
//                   <ListItemText primary="Awards" />
//                 </ListItem>
//               </List>
//             </Collapse>

//             {showMenusForPolicyAck && (
//               <ListItem button onClick={() => handleNavigation("/hrms/dashboard/payroll")} selected={isActive("/hrms/dashboard/payroll")} sx={listItemStyles}>
//                 <ListItemIcon><PaymentIcon /></ListItemIcon>
//                 <ListItemText primary="Payroll" />
//               </ListItem>
//             )}

//             <ListItem button onClick={() => handleNavigation("/hrms/dashboard/resignation")} selected={isActive("/hrms/dashboard/resignation")} sx={listItemStyles}>
//               <ListItemIcon><PersonRemoveIcon /></ListItemIcon>
//               <ListItemText primary="Resignation" />
//             </ListItem>

//             <ListItem button onClick={() => handleNavigation("/hrms/dashboard/helpdesk")} selected={isActive("/hrms/dashboard/helpdesk")} sx={listItemStyles}>
//               <ListItemIcon><HelpIcon /></ListItemIcon>
//               <ListItemText primary="Helpdesk" />
//             </ListItem>

//             {showEmployeeExitPage && (
//               <ListItem button onClick={() => handleNavigation("/hrms/dashboard/employeeExitEmp")} selected={isActive("/hrms/dashboard/employeeExitEmp")} sx={listItemStyles}>
//                 <ListItemIcon><RemoveIcon /></ListItemIcon>
//                 <ListItemText primary="Employee Exit" />
//               </ListItem>
//             )}
//           </List>
//         )}

//         {!isLoading && showPostExitPages && (
//           <List sx={{ p: 1, "& .MuiListItemText-primary": { fontWeight: "bold" } }}>
//             <ListItem button onClick={() => handleMenuClick('apps')} sx={listItemStyles}>
//               <ListItemIcon><GroupIcon /></ListItemIcon>
//               <ListItemText primary="Apps" />
//               {openMenu === 'apps' || isActive("/hrms/dashboard/assest") ? <ExpandLess /> : <ExpandMore />}
//             </ListItem>
//             <Collapse in={openMenu === 'apps' || isActive("/hrms/dashboard/assest")} timeout="auto" unmountOnExit>
//               <List component="div" disablePadding>
//                 <ListItem button onClick={() => handleNavigation("/hrms/dashboard/assest")} selected={isActive("/hrms/dashboard/assest")} sx={{ ...listItemStyles, pl: 4 }}>
//                   <ListItemText primary="Assets" />
//                 </ListItem>
//               </List>
//             </Collapse>
            
//             <ListItem button onClick={() => handleNavigation("/hrms/dashboard/employeeExitEmp")} selected={isActive("/hrms/dashboard/employeeExitEmp")} sx={listItemStyles}>
//               <ListItemIcon><RemoveIcon /></ListItemIcon>
//               <ListItemText primary="Employee Exit" />
//             </ListItem>
//           </List>
//         )}
//       </Drawer>

//       <IconButton
//               onClick={toggleDrawer}
//               sx={{
//                 position: "fixed",
//                 top: 80, 
//                 // Move the button along with the drawer
//                 left: open ? `${drawerWidth}px` : 0,
//                 backgroundColor: "#F58E35",
//                 color: "white",
//                 "&:hover": { backgroundColor: "#e0792d" },
//                 zIndex: (theme) => theme.zIndex.drawer + 3, // Make it higher than mobile drawer
//                 // Add transition for smooth movement
//                 transition: (theme) =>
//                   theme.transitions.create("left", {
//                     easing: theme.transitions.easing.sharp,
//                     duration: theme.transitions.duration.leavingScreen,
//                   }),
//                 // "Tag" like styling
//                 borderTopLeftRadius: 0,
//                 borderBottomLeftRadius: 0,
//                 borderTopRightRadius: 16,
//                 borderBottomRightRadius: 16,
//               }}
//             >
//         {open ? <ChevronLeftIcon /> : <MenuIcon />}
//       </IconButton>
//     </>
//   );
// }







import React, { useState, useEffect, useMemo } from "react";
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
  styled,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import HomeIcon from "@mui/icons-material/Home";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import GroupIcon from "@mui/icons-material/Group";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { useNavigate, useLocation } from "react-router-dom";
import StarIcon from '@mui/icons-material/Star';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import HelpIcon from '@mui/icons-material/Help';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import PaymentIcon from '@mui/icons-material/Payment';
import RemoveIcon from "@mui/icons-material/Remove";
import MenuIcon from "@mui/icons-material/Menu";


const ActiveListItem = styled(ListItem)(({ theme, selected, hasactivechild }) => ({
    backgroundColor: selected || hasactivechild ? '#FFFFFF' : 'transparent',
    color: selected || hasactivechild ? '#F58E35' : '#FFFFFF',
  
    '&:hover': {
      backgroundColor: selected || hasactivechild ? '#f5f5f5' : 'rgba(255, 255, 255, 0.1)',
    },
  
    '& .MuiListItemIcon-root': {
      color: selected || hasactivechild ? '#F58E35' : '#FFFFFF',
    },
    margin: '2px 8px',
    borderRadius: '4px',
    padding: '8px 12px',
    transition: 'all 0.2s ease',
}));


export default function Sidebar({ open, toggleDrawer, drawerWidth }) {
  const [openMenu, setOpenMenu] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showMenusForPolicyAck, setShowMenusForPolicyAck] = useState(false);
  const [showLeaveForConfirmationStatus, setShowLeaveForConfirmationStatus] = useState(false);
  const [lastWorkingDay, setLastWorkingDay] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  const hasActiveChild = (routes) => {
    return routes.some(route => location.pathname === route);
  };

  const attendanceRoutes = useMemo(() => [
    "/hrms/dashboard/attendance", 
    "/hrms/dashboard/monthly-report"
  ], []);
  
  const leaveRoutes = useMemo(() => [
    "/hrms/dashboard/leave-request", 
    "/hrms/dashboard/leavetype"
  ], []);

  const appRoutes = useMemo(() => [
    "/hrms/dashboard/appscomp", 
    "/hrms/dashboard/assest", 
    "/hrms/dashboard/award"
  ], []);

  const postExitAppRoutes = useMemo(() => [
    "/hrms/dashboard/assest"
  ], []);


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

        if (confirmationResponse.ok) {
          const data = await confirmationResponse.json();
          const confirmationData = Array.isArray(data) ? data[0] : data;
          if (confirmationData && (confirmationData.employee_confirm === 'N' || confirmationData.employee_confirm === null)) {
            setShowLeaveForConfirmationStatus(true);
          } else {
            setShowLeaveForConfirmationStatus(false);
          }
        } else {
          console.error(`Confirmation API call failed: ${confirmationResponse.status}`);
          setShowLeaveForConfirmationStatus(false);
        }

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

  useEffect(() => {
    const currentPath = location.pathname;
    if (attendanceRoutes.includes(currentPath)) {
      setOpenMenu("attendance");
    } else if (leaveRoutes.includes(currentPath)) {
      setOpenMenu("leave");
    } else if (appRoutes.includes(currentPath) || postExitAppRoutes.includes(currentPath)) {
      setOpenMenu("apps");
    }
  }, [location.pathname, attendanceRoutes, leaveRoutes, appRoutes, postExitAppRoutes]);

  const handleMenuClick = (menuName) => {
    setOpenMenu(prevOpenMenu => (prevOpenMenu === menuName ? null : menuName));
  };

  const handleNavigation = (route) => {
    navigate(route);
  };

  const isActive = (route) => location.pathname === route;
  const canShowLeaveMenu = showMenusForPolicyAck && showLeaveForConfirmationStatus;
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
            backgroundColor: "#F58E35",
            color: "#FFFFFF",
            overflow: "hidden",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <Box sx={{ minHeight: 64 }} /> 
        <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.3)" }} />

        <Box sx={{ 
            overflowY: 'auto',
            height: '100%',
            '&::-webkit-scrollbar': {
                display: 'none'
            },
            '-ms-overflow-style': 'none',
            'scrollbar-width': 'none'
        }}>
            {isLoading && (
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
                <CircularProgress sx={{ color: "#FFFFFF" }} />
            </Box>
            )}

            {!isLoading && showAllPages && !showPostExitPages && (
            <List sx={{ p: 1 }}>
                <ActiveListItem
                button
                onClick={() => handleNavigation("/hrms/dashboard/home")}
                selected={isActive("/hrms/dashboard/home")}
                hasactivechild={false}
                >
                <ListItemIcon><HomeIcon /></ListItemIcon>
                <ListItemText primary="Home" />
                </ActiveListItem>

                {showMenusForPolicyAck && (
                <>
                    <ActiveListItem button onClick={() => handleMenuClick('attendance')} selected={false} hasactivechild={hasActiveChild(attendanceRoutes)}>
                    <ListItemIcon><CalendarTodayIcon /></ListItemIcon>
                    <ListItemText primary="Attendance" />
                    {openMenu === 'attendance' ? <ExpandLess /> : <ExpandMore />}
                    </ActiveListItem>
                    <Collapse in={openMenu === 'attendance'} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ActiveListItem button onClick={() => handleNavigation("/hrms/dashboard/attendance")} selected={isActive("/hrms/dashboard/attendance")} hasactivechild={false} sx={{ pl: 4 }}>
                        <ListItemText primary="Attendance" />
                        </ActiveListItem>
                        <ActiveListItem button onClick={() => handleNavigation("/hrms/dashboard/monthly-report")} selected={isActive("/hrms/dashboard/monthly-report")} hasactivechild={false} sx={{ pl: 4 }}>
                        <ListItemText primary="Monthly Report" />
                        </ActiveListItem>
                    </List>
                    </Collapse>
                </>
                )}

                {canShowLeaveMenu && daysUntilExit > 15 && (
                <>
                    <ActiveListItem button onClick={() => handleMenuClick('leave')} selected={false} hasactivechild={hasActiveChild(leaveRoutes)}>
                    <ListItemIcon><CalendarTodayIcon /></ListItemIcon>
                    <ListItemText primary="Leave Request" />
                    {openMenu === 'leave' ? <ExpandLess /> : <ExpandMore />}
                    </ActiveListItem>
                    <Collapse in={openMenu === 'leave'} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ActiveListItem button onClick={() => handleNavigation("/hrms/dashboard/leave-request")} selected={isActive("/hrms/dashboard/leave-request")} hasactivechild={false} sx={{ pl: 4 }}>
                        <ListItemText primary="Leave Request" />
                        </ActiveListItem>
                        <ActiveListItem button onClick={() => handleNavigation("/hrms/dashboard/leavetype")} selected={isActive("/hrms/dashboard/leavetype")} hasactivechild={false} sx={{ pl: 4 }}>
                        <ListItemText primary="Leave Type" />
                        </ActiveListItem>
                    </List>
                    </Collapse>
                </>
                )}

                <ActiveListItem button onClick={() => handleNavigation("/hrms/dashboard/holiday")} selected={isActive("/hrms/dashboard/holiday")} hasactivechild={false}>
                <ListItemIcon><StarIcon /></ListItemIcon>
                <ListItemText primary="Holiday" />
                </ActiveListItem>

                <ActiveListItem button onClick={() => handleNavigation("/hrms/dashboard/policies")} selected={isActive("/hrms/dashboard/policies")} hasactivechild={false}>
                <ListItemIcon><QuestionAnswerIcon /></ListItemIcon>
                <ListItemText primary="Policies" />
                </ActiveListItem>

                <ActiveListItem button onClick={() => handleMenuClick('apps')} selected={false} hasactivechild={hasActiveChild(appRoutes)}>
                <ListItemIcon><GroupIcon /></ListItemIcon>
                <ListItemText primary="Apps" />
                {openMenu === 'apps' ? <ExpandLess /> : <ExpandMore />}
                </ActiveListItem>
                <Collapse in={openMenu === 'apps'} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ActiveListItem button onClick={() => handleNavigation("/hrms/dashboard/appscomp")} selected={isActive("/hrms/dashboard/appscomp")} hasactivechild={false} sx={{ pl: 4 }}>
                    <ListItemText primary="Events" />
                    </ActiveListItem>
                    <ActiveListItem button onClick={() => handleNavigation("/hrms/dashboard/assest")} selected={isActive("/hrms/dashboard/assest")} hasactivechild={false} sx={{ pl: 4 }}>
                    <ListItemText primary="Assets" />
                    </ActiveListItem>
                    <ActiveListItem button onClick={() => handleNavigation("/hrms/dashboard/award")} selected={isActive("/hrms/dashboard/award")} hasactivechild={false} sx={{ pl: 4 }}>
                    <ListItemText primary="Awards" />
                    </ActiveListItem>
                </List>
                </Collapse>

                {showMenusForPolicyAck && (
                <ActiveListItem button onClick={() => handleNavigation("/hrms/dashboard/payroll")} selected={isActive("/hrms/dashboard/payroll")} hasactivechild={false}>
                    <ListItemIcon><PaymentIcon /></ListItemIcon>
                    <ListItemText primary="Payroll" />
                </ActiveListItem>
                )}

                <ActiveListItem button onClick={() => handleNavigation("/hrms/dashboard/resignation")} selected={isActive("/hrms/dashboard/resignation")} hasactivechild={false}>
                <ListItemIcon><PersonRemoveIcon /></ListItemIcon>
                <ListItemText primary="Resignation" />
                </ActiveListItem>

                <ActiveListItem button onClick={() => handleNavigation("/hrms/dashboard/helpdesk")} selected={isActive("/hrms/dashboard/helpdesk")} hasactivechild={false}>
                <ListItemIcon><HelpIcon /></ListItemIcon>
                <ListItemText primary="Helpdesk" />
                </ActiveListItem>

                {showEmployeeExitPage && (
                <ActiveListItem button onClick={() => handleNavigation("/hrms/dashboard/employeeExitEmp")} selected={isActive("/hrms/dashboard/employeeExitEmp")} hasactivechild={false}>
                    <ListItemIcon><RemoveIcon /></ListItemIcon>
                    <ListItemText primary="Employee Exit" />
                </ActiveListItem>
                )}
            </List>
            )}

            {!isLoading && showPostExitPages && (
            <List sx={{ p: 1 }}>
                <ActiveListItem button onClick={() => handleMenuClick('apps')} selected={false} hasactivechild={hasActiveChild(postExitAppRoutes)}>
                <ListItemIcon><GroupIcon /></ListItemIcon>
                <ListItemText primary="Apps" />
                {openMenu === 'apps' || hasActiveChild(postExitAppRoutes) ? <ExpandLess /> : <ExpandMore />}
                </ActiveListItem>
                <Collapse in={openMenu === 'apps' || hasActiveChild(postExitAppRoutes)} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ActiveListItem button onClick={() => handleNavigation("/hrms/dashboard/assest")} selected={isActive("/hrms/dashboard/assest")} hasactivechild={false} sx={{ pl: 4 }}>
                    <ListItemText primary="Assets" />
                    </ActiveListItem>
                </List>
                </Collapse>
                
                <ActiveListItem button onClick={() => handleNavigation("/hrms/dashboard/employeeExitEmp")} selected={isActive("/hrms/dashboard/employeeExitEmp")} hasactivechild={false}>
                <ListItemIcon><RemoveIcon /></ListItemIcon>
                <ListItemText primary="Employee Exit" />
                </ActiveListItem>
            </List>
            )}
        </Box>
      </Drawer>

      <IconButton
              onClick={toggleDrawer}
              sx={{
                position: "fixed",
                top: 80, 
                left: open ? `${drawerWidth}px` : 0,
                backgroundColor: "#F58E35",
                color: "white",
                "&:hover": { backgroundColor: "#e0792d" },
                zIndex: (theme) => theme.zIndex.drawer + 3, 
                transition: (theme) =>
                  theme.transitions.create("left", {
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