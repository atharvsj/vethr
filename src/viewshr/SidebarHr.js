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
// import WorkIcon from "@mui/icons-material/Work";
// import ExpandLess from "@mui/icons-material/ExpandLess";
// import ExpandMore from "@mui/icons-material/ExpandMore";
// import { useNavigate, useLocation } from "react-router-dom";
// import HelpIcon from '@mui/icons-material/Help';
// import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
// import PaymentIcon from '@mui/icons-material/Payment';
// import RemoveIcon from "@mui/icons-material/Remove";
// import MenuIcon from "@mui/icons-material/Menu";
// import PolicyIcon from '@mui/icons-material/Policy';
// import SummarizeIcon from '@mui/icons-material/Summarize';
// import PersonAddIcon from '@mui/icons-material/PersonAdd';

// const primaryOrange = "#F58E35";
// const accentWhite = "#FFFFFF";
// const defaultTextAndIconsColor = "#FFFFFF";
// const hoverBackground = "rgba(255, 255, 255, 0.2)";

// const listItemStyles = {
//   color: defaultTextAndIconsColor,
//   "& .MuiListItemIcon-root": {
//     color: defaultTextAndIconsColor,
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
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [isLoading, setIsLoading] = useState(true);
//   const [showMenusForPolicyAck, setShowMenusForPolicyAck] = useState(false);

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
//           // Confirmation check - kept for potential future use
//         } else {
//           console.error(`Confirmation API call failed: ${confirmationResponse.status}`);
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
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchAllStatuses();
//   }, []);

//   useEffect(() => {
//     const currentPath = location.pathname;
    
//     const hrMasterRoutes = [
//       "/hrms/dashboardhr/corehrdashboard", "/hrms/dashboardhr/companydetails", 
//       "/hrms/dashboardhr/employeehub", "/hrms/dashboardhr/department", 
//       "/hrms/dashboardhr/designation", "/hrms/dashboardhr/division", 
//       "/hrms/dashboardhr/grade", "/hrms/dashboardhr/payrollSetup", 
//       "/hrms/dashboardhr/headquaters", "/hrms/dashboardhr/makeannouncement",
//       "/hrms/dashboardhr/role", "/hrms/dashboardhr/holidaysadmin", 
//       "/hrms/dashboardhr/shifts", "/hrms/dashboardhr/assestadmin", 
//       "/hrms/dashboardhr/employees", "/hrms/dashboardhr/awardsadmin",
//       "/hrms/dashboardhr/leaveSetup", "/hrms/dashboardhr/parametercreation",
//       "/hrms/dashboardhr/policies"
//     ];
//     const policyManagementRoutes = ["/hrms/dashboardhr/policyDashboard", "/hrms/dashboardhr/policyallocation"];
//     const attendanceRoutes = ["/hrms/dashboardhr/attendance", "/hrms/dashboardhr/monthly-report"];
//     const employeeConfirmationRoutes = ["/hrms/dashboardhr/confirmation", "/hrms/dashboardhr/parametercreation", "/hrms/dashboardhr/employeeconfirmationMain", "/hrms/dashboardhr/performanceTable", "/hrms/dashboardhr/dashboardConfirmation"];
//     const leaveManagementRoutes = ["/hrms/dashboardhr/leave-request", "/hrms/dashboardhr/leavetype", "/hrms/dashboardhr/mainLeave", "/hrms/dashboardhr/leaveSetup"];
//     const payrollRoutes = ["/hrms/dashboardhr/payrollhr", "/hrms/dashboardhr/DashboardPayroll", "/hrms/dashboardhr/PayrollSetupManagement"];
//     const reportsRoutes = ["/hrms/dashboardhr/newJoinerReport", "/hrms/dashboardhr/annualManpowerReport", "/hrms/dashboardhr/employeeAttritionReport"];

//     if (hrMasterRoutes.includes(currentPath)) setOpenMenu("hrMaster");
//     else if (policyManagementRoutes.includes(currentPath)) setOpenMenu("policyManagement");
//     else if (attendanceRoutes.includes(currentPath)) setOpenMenu("attendance");
//     else if (employeeConfirmationRoutes.includes(currentPath)) setOpenMenu("employeeConfirmation");
//     else if (leaveManagementRoutes.includes(currentPath)) setOpenMenu("leaveManagement");
//     else if (payrollRoutes.includes(currentPath)) setOpenMenu("payroll");
//     else if (reportsRoutes.includes(currentPath)) setOpenMenu("reports");
//   }, [location.pathname]);

//   const handleMenuClick = (menuName) => {
//     setOpenMenu((prevOpenMenu) => (prevOpenMenu === menuName ? null : menuName));
//   };

//   const handleNavigation = (route) => navigate(route);
//   const isActive = (route) => location.pathname === route;

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
//         <Box sx={{ minHeight: 64 }} />
//         <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.3)" }} />

//         {isLoading && (
//           <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
//             <CircularProgress sx={{ color: defaultTextAndIconsColor }} />
//           </Box>
//         )}

//         {!isLoading && (
//           <List sx={{ p: 1 }}>
//             {/* 1. HOME */}
//             <ListItem 
//               button 
//               onClick={() => handleNavigation("/hrms/dashboardhr/home")} 
//               selected={isActive("/hrms/dashboardhr/home")} 
//               sx={listItemStyles}
//             >
//               <ListItemIcon><HomeIcon /></ListItemIcon>
//               <ListItemText primary="Home" />
//             </ListItem>

//             {/* 2. HR MASTER SECTION */}
//             <ListItem 
//               button 
//               onClick={() => handleMenuClick('hrMaster')} 
//               sx={listItemStyles}
//             >
//               <ListItemIcon><WorkIcon /></ListItemIcon>
//               <ListItemText primary="HR Master" />
//               {openMenu === 'hrMaster' ? <ExpandLess /> : <ExpandMore />}
//             </ListItem>
//             <Collapse in={openMenu === 'hrMaster'} timeout="auto" unmountOnExit>
//               <List component="div" disablePadding>
//                 <ListItem button sx={{ ...listItemStyles, pl: 4 }} onClick={() => handleNavigation("/hrms/dashboardhr/department")} selected={isActive("/hrms/dashboardhr/department")}>
//                   <ListItemText primary="Department" />
//                 </ListItem>
//                 <ListItem button sx={{ ...listItemStyles, pl: 4 }} onClick={() => handleNavigation("/hrms/dashboardhr/division")} selected={isActive("/hrms/dashboardhr/division")}>
//                   <ListItemText primary="Division" />
//                 </ListItem>
//                 <ListItem button sx={{ ...listItemStyles, pl: 4 }} onClick={() => handleNavigation("/hrms/dashboardhr/designation")} selected={isActive("/hrms/dashboardhr/designation")}>
//                   <ListItemText primary="Designation" />
//                 </ListItem>
//                 <ListItem button sx={{ ...listItemStyles, pl: 4 }} onClick={() => handleNavigation("/hrms/dashboardhr/headquaters")} selected={isActive("/hrms/dashboardhr/headquaters")}>
//                   <ListItemText primary="Headquarter" />
//                 </ListItem>
//                 <ListItem button sx={{ ...listItemStyles, pl: 4 }} onClick={() => handleNavigation("/hrms/dashboardhr/role")} selected={isActive("/hrms/dashboardhr/role")}>
//                   <ListItemText primary="User" />
//                 </ListItem>
//                 <ListItem button sx={{ ...listItemStyles, pl: 4 }} onClick={() => handleNavigation("/hrms/dashboardhr/grade")} selected={isActive("/hrms/dashboardhr/grade")}>
//                   <ListItemText primary="Grade" />
//                 </ListItem>
//                 <ListItem button sx={{ ...listItemStyles, pl: 4 }} onClick={() => handleNavigation("/hrms/dashboardhr/holidaysadmin")} selected={isActive("/hrms/dashboardhr/holidaysadmin")}>
//                   <ListItemText primary="Holiday Hub" />
//                 </ListItem>
//                 <ListItem button sx={{ ...listItemStyles, pl: 4 }} onClick={() => handleNavigation("/hrms/dashboardhr/shifts")} selected={isActive("/hrms/dashboardhr/shifts")}>
//                   <ListItemText primary="Shift & Scheduling" />
//                 </ListItem>
//                 <ListItem button sx={{ ...listItemStyles, pl: 4 }} onClick={() => handleNavigation("/hrms/dashboardhr/policies")} selected={isActive("/hrms/dashboardhr/policies")}>
//                   <ListItemText primary="Policies" />
//                 </ListItem>
//                 <ListItem button sx={{ ...listItemStyles, pl: 4 }} onClick={() => handleNavigation("/hrms/dashboardhr/assestadmin")} selected={isActive("/hrms/dashboardhr/assestadmin")}>
//                   <ListItemText primary="Assets" />
//                 </ListItem>
//                 <ListItem button sx={{ ...listItemStyles, pl: 4 }} onClick={() => handleNavigation("/hrms/dashboardhr/employees")} selected={isActive("/hrms/dashboardhr/employees")}>
//                   <ListItemText primary="Employees" />
//                 </ListItem>
//                 <ListItem button sx={{ ...listItemStyles, pl: 4 }} onClick={() => handleNavigation("/hrms/dashboardhr/awardsadmin")} selected={isActive("/hrms/dashboardhr/awardsadmin")}>
//                   <ListItemText primary="Awards" />
//                 </ListItem>
//                 <ListItem button sx={{ ...listItemStyles, pl: 4 }} onClick={() => handleNavigation("/hrms/dashboardhr/leaveSetup")} selected={isActive("/hrms/dashboardhr/leaveSetup")}>
//                   <ListItemText primary="Leave Setup" />
//                 </ListItem>
//                 <ListItem button sx={{ ...listItemStyles, pl: 4 }} onClick={() => handleNavigation("/hrms/dashboardhr/parametercreation")} selected={isActive("/hrms/dashboardhr/parametercreation")}>
//                   <ListItemText primary="Employee Confirmation Parameters" />
//                 </ListItem>
//               </List>
//             </Collapse>

//             {/* 3. POLICY MANAGEMENT */}
//             <ListItem 
//               button 
//               onClick={() => handleMenuClick('policyManagement')} 
//               sx={listItemStyles}
//             >
//               <ListItemIcon><PolicyIcon /></ListItemIcon>
//               <ListItemText primary="Policy Management" />
//               {openMenu === 'policyManagement' ? <ExpandLess /> : <ExpandMore />}
//             </ListItem>
//             <Collapse in={openMenu === 'policyManagement'} timeout="auto" unmountOnExit>
//               <List component="div" disablePadding>
//                 <ListItem button sx={{ ...listItemStyles, pl: 4 }} onClick={() => handleNavigation("/hrms/dashboardhr/policyDashboard")} selected={isActive("/hrms/dashboardhr/policyDashboard")}>
//                   <ListItemText primary="Policy Dashboard" />
//                 </ListItem>
//                 <ListItem button sx={{ ...listItemStyles, pl: 4 }} onClick={() => handleNavigation("/hrms/dashboardhr/policyallocation")} selected={isActive("/hrms/dashboardhr/policyallocation")}>
//                   <ListItemText primary="Policy Allocation" />
//                 </ListItem>
//               </List>
//             </Collapse>

//             {/* 4. ATTENDANCE */}
//             {showMenusForPolicyAck && (
//               <>
//                 <ListItem 
//                   button 
//                   onClick={() => handleMenuClick('attendance')} 
//                   sx={listItemStyles}
//                 >
//                   <ListItemIcon><CalendarTodayIcon /></ListItemIcon>
//                   <ListItemText primary="Attendance" />
//                   {openMenu === 'attendance' ? <ExpandLess /> : <ExpandMore />}
//                 </ListItem>
//                 <Collapse in={openMenu === 'attendance'} timeout="auto" unmountOnExit>
//                   <List component="div" disablePadding>
//                     <ListItem button sx={{ ...listItemStyles, pl: 4 }} onClick={() => handleNavigation("/hrms/dashboardhr/attendance")} selected={isActive("/hrms/dashboardhr/attendance")}>
//                       <ListItemText primary="Daily Attendance" />
//                     </ListItem>
//                     <ListItem button sx={{ ...listItemStyles, pl: 4 }} onClick={() => handleNavigation("/hrms/dashboardhr/monthly-report")} selected={isActive("/hrms/dashboardhr/monthly-report")}>
//                       <ListItemText primary="Monthly Report" />
//                     </ListItem>
//                   </List>
//                 </Collapse>
//               </>
//             )}

//             {/* 5. EMPLOYEE CONFIRMATION */}
//             <ListItem 
//               button 
//               onClick={() => handleMenuClick('employeeConfirmation')} 
//               sx={listItemStyles}
//             >
//               <ListItemIcon><PersonAddIcon /></ListItemIcon>
//               <ListItemText primary="Employee Confirmation" />
//               {openMenu === 'employeeConfirmation' ? <ExpandLess /> : <ExpandMore />}
//             </ListItem>
//             <Collapse in={openMenu === 'employeeConfirmation'} timeout="auto" unmountOnExit>
//               <List component="div" disablePadding>
//                 <ListItem button sx={{ ...listItemStyles, pl: 4 }} onClick={() => handleNavigation("/hrms/dashboardhr/parametercreation")} selected={isActive("/hrms/dashboardhr/parametercreation")}>
//                   <ListItemText primary="Parameter Creation" />
//                 </ListItem>
//                 <ListItem button sx={{ ...listItemStyles, pl: 4 }} onClick={() => handleNavigation("/hrms/dashboardhr/employeeconfirmationMain")} selected={isActive("/hrms/dashboardhr/employeeconfirmationMain")}>
//                   <ListItemText primary="Confirmation Form" />
//                 </ListItem>
//                 <ListItem button sx={{ ...listItemStyles, pl: 4 }} onClick={() => handleNavigation("/hrms/dashboardhr/performanceTable")} selected={isActive("/hrms/dashboardhr/performanceTable")}>
//                   <ListItemText primary="Performance Table" />
//                 </ListItem>
//                 <ListItem button sx={{ ...listItemStyles, pl: 4 }} onClick={() => handleNavigation("/hrms/dashboardhr/dashboardConfirmation")} selected={isActive("/hrms/dashboardhr/dashboardConfirmation")}>
//                   <ListItemText primary="Dashboard Confirmation" />
//                 </ListItem>
//               </List>
//             </Collapse>

//             {/* 6. LEAVE MANAGEMENT */}
//             <ListItem 
//               button 
//               onClick={() => handleMenuClick('leaveManagement')} 
//               sx={listItemStyles}
//             >
//               <ListItemIcon><CalendarTodayIcon /></ListItemIcon>
//               <ListItemText primary="Leave Management" />
//               {openMenu === 'leaveManagement' ? <ExpandLess /> : <ExpandMore />}
//             </ListItem>
//             <Collapse in={openMenu === 'leaveManagement'} timeout="auto" unmountOnExit>
//               <List component="div" disablePadding>
//                 <ListItem button sx={{ ...listItemStyles, pl: 4 }} onClick={() => handleNavigation("/hrms/dashboardhr/leave-request")} selected={isActive("/hrms/dashboardhr/leave-request")}>
//                   <ListItemText primary="Leave Request" />
//                 </ListItem>
//                 <ListItem button sx={{ ...listItemStyles, pl: 4 }} onClick={() => handleNavigation("/hrms/dashboardhr/leavetype")} selected={isActive("/hrms/dashboardhr/leavetype")}>
//                   <ListItemText primary="Leave Type" />
//                 </ListItem>
//                 <ListItem button sx={{ ...listItemStyles, pl: 4 }} onClick={() => handleNavigation("/hrms/dashboardhr/mainLeave")} selected={isActive("/hrms/dashboardhr/mainLeave")}>
//                   <ListItemText primary="Dashboard" />
//                 </ListItem>
//               </List>
//             </Collapse>

//             {/* 7. PAYROLL */}
//             {showMenusForPolicyAck && (
//               <>
//                 <ListItem 
//                   button 
//                   onClick={() => handleMenuClick('payroll')} 
//                   sx={listItemStyles}
//                 >
//                   <ListItemIcon><PaymentIcon /></ListItemIcon>
//                   <ListItemText primary="Payroll" />
//                   {openMenu === 'payroll' ? <ExpandLess /> : <ExpandMore />}
//                 </ListItem>
//                 <Collapse in={openMenu === 'payroll'} timeout="auto" unmountOnExit>
//                   <List component="div" disablePadding>
//                     <ListItem button sx={{ ...listItemStyles, pl: 4 }} onClick={() => handleNavigation("/hrms/dashboardhr/DashboardPayroll")} selected={isActive("/hrms/dashboardhr/DashboardPayroll")}>
//                       <ListItemText primary="Dashboard" />
//                     </ListItem>
//                     <ListItem button sx={{ ...listItemStyles, pl: 4 }} onClick={() => handleNavigation("/hrms/dashboardhr/payrollhr")} selected={isActive("/hrms/dashboardhr/payrollhr")}>
//                       <ListItemText primary="Payroll" />
//                     </ListItem>
//                   </List>
//                 </Collapse>
//               </>
//             )}

//             {/* 8. EMPLOYEE EXIT */}
//             <ListItem 
//               button 
//               onClick={() => handleNavigation("/hrms/dashboardhr/employeeExitMain")} 
//               selected={isActive("/hrms/dashboardhr/employeeExitMain")} 
//               sx={listItemStyles}
//             >
//               <ListItemIcon><RemoveIcon /></ListItemIcon>
//               <ListItemText primary="Employee Exit" />
//             </ListItem>

//             {/* 9. RESIGNATION */}
//             <ListItem 
//               button 
//               onClick={() => handleNavigation("/hrms/dashboardhr/resignationhr")} 
//               selected={isActive("/hrms/dashboardhr/resignationhr")} 
//               sx={listItemStyles}
//             >
//               <ListItemIcon><PersonRemoveIcon /></ListItemIcon>
//               <ListItemText primary="Resignation" />
//             </ListItem>

//             {/* 10. REPORTS */}
//             <ListItem 
//               button 
//               onClick={() => handleMenuClick('reports')} 
//               sx={listItemStyles}
//             >
//               <ListItemIcon><SummarizeIcon /></ListItemIcon>
//               <ListItemText primary="Reports" />
//               {openMenu === 'reports' ? <ExpandLess /> : <ExpandMore />}
//             </ListItem>
//             <Collapse in={openMenu === 'reports'} timeout="auto" unmountOnExit>
//               <List component="div" disablePadding>
//                 <ListItem button sx={{ ...listItemStyles, pl: 4 }} onClick={() => handleNavigation("/hrms/dashboardhr/newJoinerReport")} selected={isActive("/hrms/dashboardhr/newJoinerReport")}>
//                   <ListItemText primary="New Joiner Report" />
//                 </ListItem>
//                 <ListItem button sx={{ ...listItemStyles, pl: 4 }} onClick={() => handleNavigation("/hrms/dashboardhr/annualManpowerReport")} selected={isActive("/hrms/dashboardhr/annualManpowerReport")}>
//                   <ListItemText primary="Annual Manpower Report" />
//                 </ListItem>
//                 <ListItem button sx={{ ...listItemStyles, pl: 4 }} onClick={() => handleNavigation("/hrms/dashboardhr/employeeAttritionReport")} selected={isActive("/hrms/dashboardhr/employeeAttritionReport")}>
//                   <ListItemText primary="Employee Attrition Report" />
//                 </ListItem>
//               </List>
//             </Collapse>

//             {/* Additional Items */}
//             <ListItem 
//               button 
//               onClick={() => handleNavigation("/hrms/dashboardhr/helpdeskhr")} 
//               selected={isActive("/hrms/dashboardhr/helpdeskhr")} 
//               sx={listItemStyles}
//             >
//               <ListItemIcon><HelpIcon /></ListItemIcon>
//               <ListItemText primary="Helpdesk" />
//             </ListItem>
//           </List>
//         )}
//       </Drawer>

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
import WorkIcon from "@mui/icons-material/Work";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { useNavigate, useLocation } from "react-router-dom";
import HelpIcon from '@mui/icons-material/Help';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import PaymentIcon from '@mui/icons-material/Payment';
import RemoveIcon from "@mui/icons-material/Remove";
import MenuIcon from "@mui/icons-material/Menu";
import PolicyIcon from '@mui/icons-material/Policy';
import SummarizeIcon from '@mui/icons-material/Summarize';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
const primaryOrange = "#F58E35";
const accentWhite = "#FFFFFF";
const defaultTextAndIconsColor = "#FFFFFF";
const hoverBackground = "rgba(255, 255, 255, 0.2)";
const listItemStyles = {
color: defaultTextAndIconsColor,
"& .MuiListItemIcon-root": {
color: defaultTextAndIconsColor,
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
const navigate = useNavigate();
const location = useLocation();
const [isLoading, setIsLoading] = useState(true);
const [showMenusForPolicyAck, setShowMenusForPolicyAck] = useState(false);
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
      // Confirmation check
    } else {
      console.error(`Confirmation API call failed: ${confirmationResponse.status}`);
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
  } finally {
    setIsLoading(false);
  }
};

fetchAllStatuses();
}, []);
useEffect(() => {
const currentPath = location.pathname;

const hrMasterRoutes = [
  "/hrms/dashboardhr/corehrdashboard", "/hrms/dashboardhr/companydetails", 
  "/hrms/dashboardhr/employeehub", "/hrms/dashboardhr/department", 
  "/hrms/dashboardhr/designation", "/hrms/dashboardhr/division", 
  "/hrms/dashboardhr/grade", "/hrms/dashboardhr/payrollSetup", 
  "/hrms/dashboardhr/headquaters", "/hrms/dashboardhr/makeannouncement",
  "/hrms/dashboardhr/role", "/hrms/dashboardhr/holidaysadmin", 
  "/hrms/dashboardhr/shifts", "/hrms/dashboardhr/assestadmin", 
  "/hrms/dashboardhr/employees", "/hrms/dashboardhr/awardsadmin",
  "/hrms/dashboardhr/leaveSetup", "/hrms/dashboardhr/parametercreation",
  "/hrms/dashboardhr/policies"
];
const policyManagementRoutes = ["/hrms/dashboardhr/policyDashboard", "/hrms/dashboardhr/policyallocation"];
const attendanceRoutes = ["/hrms/dashboardhr/attendance", "/hrms/dashboardhr/monthly-report"];
const employeeConfirmationRoutes = ["/hrms/dashboardhr/confirmation", "/hrms/dashboardhr/parametercreation", "/hrms/dashboardhr/employeeconfirmationMain", "/hrms/dashboardhr/performanceTable", "/hrms/dashboardhr/dashboardConfirmation"];
const leaveManagementRoutes = ["/hrms/dashboardhr/leave-request", "/hrms/dashboardhr/leavetype", "/hrms/dashboardhr/mainLeave", "/hrms/dashboardhr/leaveSetup"];
const payrollRoutes = ["/hrms/dashboardhr/payrollhr", "/hrms/dashboardhr/DashboardPayroll", "/hrms/dashboardhr/PayrollSetupManagement"];
const reportsRoutes = ["/hrms/dashboardhr/newJoinerReport", "/hrms/dashboardhr/annualManpowerReport", "/hrms/dashboardhr/employeeAttritionReport"];

if (hrMasterRoutes.includes(currentPath)) setOpenMenu("hrMaster");
else if (policyManagementRoutes.includes(currentPath)) setOpenMenu("policyManagement");
else if (attendanceRoutes.includes(currentPath)) setOpenMenu("attendance");
else if (employeeConfirmationRoutes.includes(currentPath)) setOpenMenu("employeeConfirmation");
else if (leaveManagementRoutes.includes(currentPath)) setOpenMenu("leaveManagement");
else if (payrollRoutes.includes(currentPath)) setOpenMenu("payroll");
else if (reportsRoutes.includes(currentPath)) setOpenMenu("reports");
}, [location.pathname]);
const handleMenuClick = (menuName) => {
setOpenMenu((prevOpenMenu) => (prevOpenMenu === menuName ? null : menuName));
};
const handleNavigation = (route) => navigate(route);
const isActive = (route) => location.pathname === route;
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
scrollbarWidth: "none",
"&::-webkit-scrollbar": {
display: "none",
},
},
}}
variant="persistent"
anchor="left"
open={open}
>
<Box sx={{ minHeight: 64 }} />
<Divider sx={{ borderColor: "rgba(255, 255, 255, 0.3)" }} />

{isLoading && (
      <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
        <CircularProgress sx={{ color: defaultTextAndIconsColor }} />
      </Box>
    )}

    {!isLoading && (
      <List sx={{ p: 1 }}>
        <ListItem 
          button 
          onClick={() => handleNavigation("/hrms/dashboardhr/home")} 
          selected={isActive("/hrms/dashboardhr/home")} 
          sx={listItemStyles}
        >
          <ListItemIcon><HomeIcon /></ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>

        <ListItem 
          button 
          onClick={() => handleMenuClick('hrMaster')} 
          sx={listItemStyles}
        >
          <ListItemIcon><WorkIcon /></ListItemIcon>
          <ListItemText primary="HR Master" />
          {openMenu === 'hrMaster' ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openMenu === 'hrMaster'} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button sx={{ ...listItemStyles, pl: 4 }} onClick={() => handleNavigation("/hrms/dashboardhr/department")} selected={isActive("/hrms/dashboardhr/department")}>
              <ListItemText primary="Department" />
            </ListItem>
            <ListItem button sx={{ ...listItemStyles, pl: 4 }} onClick={() => handleNavigation("/hrms/dashboardhr/division")} selected={isActive("/hrms/dashboardhr/division")}>
              <ListItemText primary="Division" />
            </ListItem>
            <ListItem button sx={{ ...listItemStyles, pl: 4 }} onClick={() => handleNavigation("/hrms/dashboardhr/designation")} selected={isActive("/hrms/dashboardhr/designation")}>
              <ListItemText primary="Designation" />
            </ListItem>
            <ListItem button sx={{ ...listItemStyles, pl: 4 }} onClick={() => handleNavigation("/hrms/dashboardhr/headquaters")} selected={isActive("/hrms/dashboardhr/headquaters")}>
              <ListItemText primary="Headquarter" />
            </ListItem>
            <ListItem button sx={{ ...listItemStyles, pl: 4 }} onClick={() => handleNavigation("/hrms/dashboardhr/role")} selected={isActive("/hrms/dashboardhr/role")}>
              <ListItemText primary="User" />
            </ListItem>
            <ListItem button sx={{ ...listItemStyles, pl: 4 }} onClick={() => handleNavigation("/hrms/dashboardhr/grade")} selected={isActive("/hrms/dashboardhr/grade")}>
              <ListItemText primary="Grade" />
            </ListItem>
            <ListItem button sx={{ ...listItemStyles, pl: 4 }} onClick={() => handleNavigation("/hrms/dashboardhr/holidaysadmin")} selected={isActive("/hrms/dashboardhr/holidaysadmin")}>
              <ListItemText primary="Holiday Hub" />
            </ListItem>
            <ListItem button sx={{ ...listItemStyles, pl: 4 }} onClick={() => handleNavigation("/hrms/dashboardhr/shifts")} selected={isActive("/hrms/dashboardhr/shifts")}>
              <ListItemText primary="Shift & Scheduling" />
            </ListItem>
            <ListItem button sx={{ ...listItemStyles, pl: 4 }} onClick={() => handleNavigation("/hrms/dashboardhr/policies")} selected={isActive("/hrms/dashboardhr/policies")}>
              <ListItemText primary="Policies" />
            </ListItem>
            <ListItem button sx={{ ...listItemStyles, pl: 4 }} onClick={() => handleNavigation("/hrms/dashboardhr/assestadmin")} selected={isActive("/hrms/dashboardhr/assestadmin")}>
              <ListItemText primary="Assets" />
            </ListItem>
            <ListItem button sx={{ ...listItemStyles, pl: 4 }} onClick={() => handleNavigation("/hrms/dashboardhr/employees")} selected={isActive("/hrms/dashboardhr/employees")}>
              <ListItemText primary="Employees" />
            </ListItem>
            <ListItem button sx={{ ...listItemStyles, pl: 4 }} onClick={() => handleNavigation("/hrms/dashboardhr/awardsadmin")} selected={isActive("/hrms/dashboardhr/awardsadmin")}>
              <ListItemText primary="Awards" />
            </ListItem>
            <ListItem button sx={{ ...listItemStyles, pl: 4 }} onClick={() => handleNavigation("/hrms/dashboardhr/leaveSetup")} selected={isActive("/hrms/dashboardhr/leaveSetup")}>
              <ListItemText primary="Leave Setup" />
            </ListItem>
            <ListItem button sx={{ ...listItemStyles, pl: 4 }} onClick={() => handleNavigation("/hrms/dashboardhr/parametercreation")} selected={isActive("/hrms/dashboardhr/parametercreation")}>
              <ListItemText primary="Employee Confirmation Parameters" />
            </ListItem>
          </List>
        </Collapse>

        <ListItem 
          button 
          onClick={() => handleMenuClick('policyManagement')} 
          sx={listItemStyles}
        >
          <ListItemIcon><PolicyIcon /></ListItemIcon>
          <ListItemText primary="Policy Management" />
          {openMenu === 'policyManagement' ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openMenu === 'policyManagement'} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button sx={{ ...listItemStyles, pl: 4 }} onClick={() => handleNavigation("/hrms/dashboardhr/policyDashboard")} selected={isActive("/hrms/dashboardhr/policyDashboard")}>
              <ListItemText primary="Policy Dashboard" />
            </ListItem>
            <ListItem button sx={{ ...listItemStyles, pl: 4 }} onClick={() => handleNavigation("/hrms/dashboardhr/policyallocation")} selected={isActive("/hrms/dashboardhr/policyallocation")}>
              <ListItemText primary="Policy Allocation" />
            </ListItem>
          </List>
        </Collapse>

        {showMenusForPolicyAck && (
          <>
            <ListItem 
              button 
              onClick={() => handleMenuClick('attendance')} 
              sx={listItemStyles}
            >
              <ListItemIcon><CalendarTodayIcon /></ListItemIcon>
              <ListItemText primary="Attendance" />
              {openMenu === 'attendance' ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={openMenu === 'attendance'} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem button sx={{ ...listItemStyles, pl: 4 }} onClick={() => handleNavigation("/hrms/dashboardhr/attendance")} selected={isActive("/hrms/dashboardhr/attendance")}>
                  <ListItemText primary="Daily Attendance" />
                </ListItem>
                <ListItem button sx={{ ...listItemStyles, pl: 4 }} onClick={() => handleNavigation("/hrms/dashboardhr/monthly-report")} selected={isActive("/hrms/dashboardhr/monthly-report")}>
                  <ListItemText primary="Monthly Report" />
                </ListItem>
              </List>
            </Collapse>
          </>
        )}

        <ListItem 
          button 
          onClick={() => handleMenuClick('employeeConfirmation')} 
          sx={listItemStyles}
        >
          <ListItemIcon><PersonAddIcon /></ListItemIcon>
          <ListItemText primary="Employee Confirmation" />
          {openMenu === 'employeeConfirmation' ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openMenu === 'employeeConfirmation'} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button sx={{ ...listItemStyles, pl: 4 }} onClick={() => handleNavigation("/hrms/dashboardhr/parametercreation")} selected={isActive("/hrms/dashboardhr/parametercreation")}>
              <ListItemText primary="Parameter Creation" />
            </ListItem>
            <ListItem button sx={{ ...listItemStyles, pl: 4 }} onClick={() => handleNavigation("/hrms/dashboardhr/employeeconfirmationMain")} selected={isActive("/hrms/dashboardhr/employeeconfirmationMain")}>
              <ListItemText primary="Confirmation Form" />
            </ListItem>
            <ListItem button sx={{ ...listItemStyles, pl: 4 }} onClick={() => handleNavigation("/hrms/dashboardhr/performanceTable")} selected={isActive("/hrms/dashboardhr/performanceTable")}>
              <ListItemText primary="Performance Table" />
            </ListItem>
            <ListItem button sx={{ ...listItemStyles, pl: 4 }} onClick={() => handleNavigation("/hrms/dashboardhr/dashboardConfirmation")} selected={isActive("/hrms/dashboardhr/dashboardConfirmation")}>
              <ListItemText primary="Dashboard Confirmation" />
            </ListItem>
          </List>
        </Collapse>

        <ListItem 
          button 
          onClick={() => handleMenuClick('leaveManagement')} 
          sx={listItemStyles}
        >
          <ListItemIcon><CalendarTodayIcon /></ListItemIcon>
          <ListItemText primary="Leave Management" />
          {openMenu === 'leaveManagement' ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openMenu === 'leaveManagement'} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button sx={{ ...listItemStyles, pl: 4 }} onClick={() => handleNavigation("/hrms/dashboardhr/leave-request")} selected={isActive("/hrms/dashboardhr/leave-request")}>
              <ListItemText primary="Leave Request" />
            </ListItem>
            <ListItem button sx={{ ...listItemStyles, pl: 4 }} onClick={() => handleNavigation("/hrms/dashboardhr/leavetype")} selected={isActive("/hrms/dashboardhr/leavetype")}>
              <ListItemText primary="Leave Type" />
            </ListItem>
            <ListItem button sx={{ ...listItemStyles, pl: 4 }} onClick={() => handleNavigation("/hrms/dashboardhr/mainLeave")} selected={isActive("/hrms/dashboardhr/mainLeave")}>
              <ListItemText primary="Dashboard" />
            </ListItem>
          </List>
        </Collapse>

        {showMenusForPolicyAck && (
          <>
            <ListItem 
              button 
              onClick={() => handleMenuClick('payroll')} 
              sx={listItemStyles}
            >
              <ListItemIcon><PaymentIcon /></ListItemIcon>
              <ListItemText primary="Payroll" />
              {openMenu === 'payroll' ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={openMenu === 'payroll'} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem button sx={{ ...listItemStyles, pl: 4 }} onClick={() => handleNavigation("/hrms/dashboardhr/DashboardPayroll")} selected={isActive("/hrms/dashboardhr/DashboardPayroll")}>
                  <ListItemText primary="Dashboard" />
                </ListItem>
                <ListItem button sx={{ ...listItemStyles, pl: 4 }} onClick={() => handleNavigation("/hrms/dashboardhr/payrollhr")} selected={isActive("/hrms/dashboardhr/payrollhr")}>
                  <ListItemText primary="Payroll" />
                </ListItem>
              </List>
            </Collapse>
          </>
        )}

        <ListItem 
          button 
          onClick={() => handleNavigation("/hrms/dashboardhr/employeeExitMain")} 
          selected={isActive("/hrms/dashboardhr/employeeExitMain")} 
          sx={listItemStyles}
        >
          <ListItemIcon><RemoveIcon /></ListItemIcon>
          <ListItemText primary="Employee Exit" />
        </ListItem>

        <ListItem 
          button 
          onClick={() => handleNavigation("/hrms/dashboardhr/resignationhr")} 
          selected={isActive("/hrms/dashboardhr/resignationhr")} 
          sx={listItemStyles}
        >
          <ListItemIcon><PersonRemoveIcon /></ListItemIcon>
          <ListItemText primary="Resignation" />
        </ListItem>

        <ListItem 
          button 
          onClick={() => handleMenuClick('reports')} 
          sx={listItemStyles}
        >
          <ListItemIcon><SummarizeIcon /></ListItemIcon>
          <ListItemText primary="Reports" />
          {openMenu === 'reports' ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openMenu === 'reports'} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button sx={{ ...listItemStyles, pl: 4 }} onClick={() => handleNavigation("/hrms/dashboardhr/newJoinerReport")} selected={isActive("/hrms/dashboardhr/newJoinerReport")}>
              <ListItemText primary="New Joiner Report" />
            </ListItem>
            <ListItem button sx={{ ...listItemStyles, pl: 4 }} onClick={() => handleNavigation("/hrms/dashboardhr/annualManpowerReport")} selected={isActive("/hrms/dashboardhr/annualManpowerReport")}>
              <ListItemText primary="Annual Manpower Report" />
            </ListItem>
            <ListItem button sx={{ ...listItemStyles, pl: 4 }} onClick={() => handleNavigation("/hrms/dashboardhr/employeeAttritionReport")} selected={isActive("/hrms/dashboardhr/employeeAttritionReport")}>
              <ListItemText primary="Employee Attrition Report" />
            </ListItem>
          </List>
        </Collapse>

        <ListItem 
          button 
          onClick={() => handleNavigation("/hrms/dashboardhr/helpdeskhr")} 
          selected={isActive("/hrms/dashboardhr/helpdeskhr")} 
          sx={listItemStyles}
        >
          <ListItemIcon><HelpIcon /></ListItemIcon>
          <ListItemText primary="Helpdesk" />
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
