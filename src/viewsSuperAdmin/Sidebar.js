// import React, { useState, useMemo } from "react";
// import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
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
//   styled,
// } from "@mui/material";
// import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
// import HomeIcon from "@mui/icons-material/Home";
// import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
// import GroupIcon from "@mui/icons-material/Group";
// import WorkIcon from "@mui/icons-material/Work";
// import ExpandLess from "@mui/icons-material/ExpandLess";
// import ExpandMore from "@mui/icons-material/ExpandMore";
// import HelpIcon from "@mui/icons-material/Help";
// import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
// import { useNavigate, useLocation } from "react-router-dom";
// import AddBoxIcon from "@mui/icons-material/AddBox";
// import PersonAddIcon from "@mui/icons-material/PersonAdd";
// import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
// import DashboardIcon from '@mui/icons-material/Dashboard';
// import PolicyIcon from '@mui/icons-material/Policy';
// import SummarizeIcon from '@mui/icons-material/Summarize';

// // Styled component for active list items
// // CHANGED: Colors updated to the requested orange for active/selected states.
// const ActiveListItem = styled(ListItem)(({ theme, selected, hasactivechild }) => ({
//   // Use a light orange for the background when active
//   backgroundColor: selected || hasactivechild ? '#feed E1' : 'transparent',
//   // Use a solid orange for the border when active
//   borderBottom: selected || hasactivechild ? `3px solid #F4511E` : 'none',
//   // Use a solid orange for the text color when active
//   color: selected || hasactivechild ? '#F4511E' : 'inherit',
//   '&:hover': {
//     backgroundColor: '#f5f5f5',
//   },
//   // Use a solid orange for the icon color when active
//   '& .MuiListItemIcon-root': {
//     color: selected || hasactivechild ? '#F4511E' : '#757575',
//   },
//   margin: '2px 8px',
//   borderRadius: '4px',
//   padding: '8px 12px',
//   transition: 'all 0.2s ease',
// }));

// export default function Sidebar({ open, toggleDrawer, drawerWidth }) {
//   // Single state to manage which top-level menu is open
//   const [openMenu, setOpenMenu] = useState(null);

//   // State for nested dropdowns within Reports
//   const [attendanceReportOpen, setAttendanceReportOpen] = useState(false);
//   const [leaveReportOpen, setLeaveReportOpen] = useState(false);
//   const [payrollReportOpen, setPayrollReportOpen] = useState(false);
//   const [confirmationReportOpen, setConfirmationReportOpen] = useState(false);

//   const navigate = useNavigate();
//   const location = useLocation();

//   // Check if any child route is active for dropdown headers
//   const hasActiveChild = (routes) => {
//     return routes.some(route => location.pathname === route);
//   };

//   // Employee routes
//   const employeeRoutes = useMemo(() => [
//     "/hrms/admindashboard/employeesMain",
//     "/hrms/admindashboard/employees",
//     "/hrms/admindashboard/shifts",
//     "/hrms/admindashboard/employeeexits"
//   ], []);

//   // Core HR routes
//   const coreHRRoutes = useMemo(() => [
//     "/hrms/admindashboard/corehrdashboard",
//     "/hrms/admindashboard/companydetails",
//     "/hrms/admindashboard/employeehub",
//     "/hrms/admindashboard/department",
//     "/hrms/admindashboard/designation",
//     "/hrms/admindashboard/division",
//     "/hrms/admindashboard/grade",
//     "/hrms/admindashboard/payrollSetup",
//     "/hrms/admindashboard/headquaters",
//     "/hrms/admindashboard/makeannouncement"
//   ], []);

//   // Policy Management routes
//   const policyRoutes = useMemo(() => [
//     "/hrms/admindashboard/policies",
//     "/hrms/admindashboard/policyDashboard",
//     "/hrms/admindashboard/policyallocation"
//   ], []);

//   // Attendance routes
//   const attendanceRoutes = useMemo(() => [
//     "/hrms/admindashboard/attendancemain",
//     "/hrms/admindashboard/monthly-report"
//   ], []);

//   // Apps routes
//   const appsRoutes = useMemo(() => [
//     "/hrms/admindashboard/eventadmin",
//     "/hrms/admindashboard/assestadmin",
//     "/hrms/admindashboard/awardsadmin",
//     "/hrms/admindashboard/visitorbook",
//     "/hrms/admindashboard/holidaysadmin"
//   ], []);

//   // Confirmation routes
//   const confirmationRoutes = useMemo(() => [
//     "/hrms/admindashboard/parametercreation",
//     "/hrms/admindashboard/employeeconfirmationMain",
//     "/hrms/admindashboard/performanceTable",
//     "/hrms/admindashboard/dashboardConfirmation"
//   ], []);

//   // Payroll routes
//   const payrollRoutes = useMemo(() => [
//     "/hrms/admindashboard/DashboardPayroll",
//     "/hrms/admindashboard/PayrollSetupManagement"
//   ], []);

//   // Leave Management routes
//   const leaveRoutes = useMemo(() => [
//     "/hrms/admindashboard/leaverequest",
//     "/hrms/admindashboard/mainLeave",
//     "/hrms/admindashboard/leaveSetup"
//   ], []);

//   // Attendance Report routes
//   const attendanceReportRoutes = useMemo(() => [
//     "/hrms/admindashboard/DailyAttendanceReport",
//     "/hrms/admindashboard/MonthlyAttendanceReprt",
//     "/hrms/admindashboard/MonthlyPunchINOUT"
//   ], []);

//   // Leave Report routes
//   const leaveReportRoutes = useMemo(() => [
//     "/hrms/admindashboard/AllEmpLeaveReports",
//     "/hrms/admindashboard/annualLeaveReport",
//     "/hrms/admindashboard/departmentWiseLeaveReport",
//     "/hrms/admindashboard/employeeAnnualLeaveReport",
//     "/hrms/admindashboard/employeePendingLeaveReport",
//     "/hrms/admindashboard/monthlyleaveReport",
//     "/hrms/admindashboard/LeaveBalanceReport"
//   ], []);

//   // Payroll Report routes
//   const payrollReportRoutes = useMemo(() => [
//     "/hrms/admindashboard/payrollSummaryReport",
//     "/hrms/admindashboard/taxDeductionReport",
//     "/hrms/admindashboard/bonusPaymentReport",
//     "/hrms/admindashboard/loanDeductionReport"
//   ], []);

//   // Confirmation Report routes
//   const confirmationReportRoutes = useMemo(() => [
//     "/hrms/admindashboard/confirmationStatusReport",
//     "/hrms/admindashboard/employeePerformanceReport",
//     "/hrms/admindashboard/confirmationProcessReport"
//   ], []);

//   // Reports routes (all report categories)
//   const reportsRoutes = useMemo(() => [
//     ...attendanceReportRoutes,
//     ...leaveReportRoutes,
//     ...payrollReportRoutes,
//     ...confirmationReportRoutes,
//     "/hrms/admindashboard/newJoinerReport",
//     "/hrms/admindashboard/annualManpowerReport",
//     "/hrms/admindashboard/employeeAttritionReport"
//   ], [attendanceReportRoutes, leaveReportRoutes, payrollReportRoutes, confirmationReportRoutes]);

//   // Unified handler for all top-level menus
//   const handleMenuClick = (menuName) => {
//     setOpenMenu(prevOpenMenu => (prevOpenMenu === menuName ? null : menuName));
//   };

//   const handleAttendanceReportClick = () => {
//     setAttendanceReportOpen(!attendanceReportOpen);
//   };

//   const handleLeaveReportClick = () => {
//     setLeaveReportOpen(!leaveReportOpen);
//   };

//   const handlePayrollReportClick = () => {
//     setPayrollReportOpen(!payrollReportOpen);
//   };

//   const handleConfirmationReportClick = () => {
//     setConfirmationReportOpen(!confirmationReportOpen);
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
//           cursor: "pointer",
//           backgroundColor: '#fafafa',
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
//           backgroundColor: 'primary.main',
//           color: 'primary.contrastText',
//         }}
//       >
//         <IconButton onClick={toggleDrawer} sx={{ color: 'inherit' }}>
//           <ChevronLeftIcon />
//         </IconButton>
//       </Box>
//       <Divider />
//       <List sx={{ p: 1 }}>
//         {/* Home Item */}
//         <ActiveListItem
//           button
//           onClick={() => handleNavigation("/hrms/admindashboard/home")}
//           selected={isActive("/hrms/admindashboard/home")}
//           hasactivechild={false}
//         >
//           <ListItemIcon>
//             <HomeIcon />
//           </ListItemIcon>
//           <ListItemText primary="Home" />
//         </ActiveListItem>

//         {/* Employees Item */}
//         <ActiveListItem
//           button
//           onClick={() => handleMenuClick('employees')}
//           selected={false}
//           hasactivechild={hasActiveChild(employeeRoutes)}
//         >
//           <ListItemIcon>
//             <GroupIcon />
//           </ListItemIcon>
//           <ListItemText primary="Employees" />
//           {openMenu === 'employees' ? <ExpandLess /> : <ExpandMore />}
//         </ActiveListItem>
//         <Collapse in={openMenu === 'employees'} timeout="auto" unmountOnExit>
//           <List component="div" disablePadding>
//             <ActiveListItem
//               button
//               sx={{ pl: 4 }}
//               onClick={() => handleNavigation("/hrms/admindashboard/employeesMain")}
//               selected={isActive("/hrms/admindashboard/employeesMain")}
//               hasactivechild={false}
//             >
//               <ListItemText primary="Dashboard" />
//             </ActiveListItem>
//             <ActiveListItem
//               button
//               sx={{ pl: 4 }}
//               onClick={() => handleNavigation("/hrms/admindashboard/employees")}
//               selected={isActive("/hrms/admindashboard/employees")}
//               hasactivechild={false}
//             >
//               <ListItemText primary="Employees List" />
//             </ActiveListItem>
//             <ActiveListItem
//               button
//               sx={{ pl: 4 }}
//               onClick={() => handleNavigation("/hrms/admindashboard/shifts")}
//               selected={isActive("/hrms/admindashboard/shifts")}
//               hasactivechild={false}
//             >
//               <ListItemText primary="Shifts & Scheduling" />
//             </ActiveListItem>
//             <ActiveListItem
//               button
//               sx={{ pl: 4 }}
//               onClick={() => handleNavigation("/hrms/admindashboard/employeeexits")}
//               selected={isActive("/hrms/admindashboard/employeeexits")}
//               hasactivechild={false}
//             >
//               <ListItemText primary="Employees Exit" />
//             </ActiveListItem>
//           </List>
//         </Collapse>

//         {/* Core HR Dropdown */}
//         <ActiveListItem
//           button
//           onClick={() => handleMenuClick('coreHR')}
//           selected={false}
//           hasactivechild={hasActiveChild(coreHRRoutes)}
//         >
//           <ListItemIcon>
//             <WorkIcon />
//           </ListItemIcon>
//           <ListItemText primary="Core HR" />
//           {openMenu === 'coreHR' ? <ExpandLess /> : <ExpandMore />}
//         </ActiveListItem>
//         <Collapse in={openMenu === 'coreHR'} timeout="auto" unmountOnExit>
//           <List component="div" disablePadding>
//             <ActiveListItem
//               button
//               sx={{ pl: 4 }}
//               onClick={() => handleNavigation("/hrms/admindashboard/corehrdashboard")}
//               selected={isActive("/hrms/admindashboard/corehrdashboard")}
//               hasactivechild={false}
//             >
//               <ListItemText primary="Dashboard" />
//             </ActiveListItem>
//             <ActiveListItem
//               button
//               sx={{ pl: 4 }}
//               onClick={() => handleNavigation("/hrms/admindashboard/companydetails")}
//               selected={isActive("/hrms/admindashboard/companydetails")}
//               hasactivechild={false}
//             >
//               <ListItemText primary="Company Details" />
//             </ActiveListItem>
//             <ActiveListItem
//               button
//               sx={{ pl: 4 }}
//               onClick={() => handleNavigation("/hrms/admindashboard/employeehub")}
//               selected={isActive("/hrms/admindashboard/employeehub")}
//               hasactivechild={false}
//             >
//               <ListItemText primary="Employee Hub" />
//             </ActiveListItem>
//             <ActiveListItem
//               button
//               sx={{ pl: 4 }}
//               onClick={() => handleNavigation("/hrms/admindashboard/department")}
//               selected={isActive("/hrms/admindashboard/department")}
//               hasactivechild={false}
//             >
//               <ListItemText primary="Department" />
//             </ActiveListItem>
//             <ActiveListItem
//               button
//               sx={{ pl: 4 }}
//               onClick={() => handleNavigation("/hrms/admindashboard/designation")}
//               selected={isActive("/hrms/admindashboard/designation")}
//               hasactivechild={false}
//             >
//               <ListItemText primary="Designation" />
//             </ActiveListItem>
//             <ActiveListItem
//               button
//               sx={{ pl: 4 }}
//               onClick={() => handleNavigation("/hrms/admindashboard/division")}
//               selected={isActive("/hrms/admindashboard/division")}
//               hasactivechild={false}
//             >
//               <ListItemText primary="Division" />
//             </ActiveListItem>
//             <ActiveListItem
//               button
//               sx={{ pl: 4 }}
//               onClick={() => handleNavigation("/hrms/admindashboard/grade")}
//               selected={isActive("/hrms/admindashboard/grade")}
//               hasactivechild={false}
//             >
//               <ListItemText primary="Grade" />
//             </ActiveListItem>
//             <ActiveListItem
//               button
//               sx={{ pl: 4 }}
//               onClick={() => handleNavigation("/hrms/admindashboard/payrollSetup")}
//               selected={isActive("/hrms/admindashboard/payrollSetup")}
//               hasactivechild={false}
//             >
//               <ListItemText primary="Pay Roll Set Up" />
//             </ActiveListItem>
//             <ActiveListItem
//               button
//               sx={{ pl: 4 }}
//               onClick={() => handleNavigation("/hrms/admindashboard/headquaters")}
//               selected={isActive("/hrms/admindashboard/headquaters")}
//               hasactivechild={false}
//             >
//               <ListItemText primary="Headquaters" />
//             </ActiveListItem>
//             <ActiveListItem
//               button
//               sx={{ pl: 4 }}
//               onClick={() => handleNavigation("/hrms/admindashboard/makeannouncement")}
//               selected={isActive("/hrms/admindashboard/makeannouncement")}
//               hasactivechild={false}
//             >
//               <ListItemText primary="Make Announcement" />
//             </ActiveListItem>
//           </List>
//         </Collapse>

//         {/* Policy Management */}
//         <ActiveListItem
//           button
//           onClick={() => handleMenuClick('policyManagement')}
//           selected={false}
//           hasactivechild={hasActiveChild(policyRoutes)}
//         >
//           <ListItemIcon>
//             <PolicyIcon />
//           </ListItemIcon>
//           <ListItemText primary="Policy Management" />
//           {openMenu === 'policyManagement' ? <ExpandLess /> : <ExpandMore />}
//         </ActiveListItem>
//         <Collapse in={openMenu === 'policyManagement'} timeout="auto" unmountOnExit>
//           <List component="div" disablePadding>
//             <ActiveListItem
//               button
//               sx={{ pl: 4 }}
//               onClick={() => handleNavigation("/hrms/admindashboard/policies")}
//               selected={isActive("/hrms/admindashboard/policies")}
//               hasactivechild={false}
//             >
//               <ListItemText primary="Policies" />
//             </ActiveListItem>
//             <ActiveListItem
//               button
//               sx={{ pl: 4 }}
//               onClick={() => handleNavigation("/hrms/admindashboard/policyDashboard")}
//               selected={isActive("/hrms/admindashboard/policyDashboard")}
//               hasactivechild={false}
//             >
//               <ListItemText primary="Policy Dashboard" />
//             </ActiveListItem>
//             <ActiveListItem
//               button
//               sx={{ pl: 4 }}
//               onClick={() => handleNavigation("/hrms/admindashboard/policyallocation")}
//               selected={isActive("/hrms/admindashboard/policyallocation")}
//               hasactivechild={false}
//             >
//               <ListItemText primary="Policy Allocation" />
//             </ActiveListItem>
//           </List>
//         </Collapse>

//         {/* Attendance Dropdown */}
//         <ActiveListItem
//           button
//           onClick={() => handleMenuClick('attendance')}
//           selected={false}
//           hasactivechild={hasActiveChild(attendanceRoutes)}
//         >
//           <ListItemIcon>
//             <CalendarTodayIcon />
//           </ListItemIcon>
//           <ListItemText primary="Attendance" />
//           {openMenu === 'attendance' ? <ExpandLess /> : <ExpandMore />}
//         </ActiveListItem>
//         <Collapse in={openMenu === 'attendance'} timeout="auto" unmountOnExit>
//           <List component="div" disablePadding>
//             <ActiveListItem
//               button
//               sx={{ pl: 4 }}
//               onClick={() => handleNavigation("/hrms/admindashboard/attendancemain")}
//               selected={isActive("/hrms/admindashboard/attendancemain")}
//               hasactivechild={false}
//             >
//               <ListItemText primary="Daily Attendance" />
//             </ActiveListItem>
//             <ActiveListItem
//               button
//               sx={{ pl: 4 }}
//               onClick={() => handleNavigation("/hrms/admindashboard/monthly-report")}
//               selected={isActive("/hrms/admindashboard/monthly-report")}
//               hasactivechild={false}
//             >
//               <ListItemText primary="Monthly Report" />
//             </ActiveListItem>
//           </List>
//         </Collapse>

//         {/* Apps */}
//         <ActiveListItem
//           button
//           onClick={() => handleMenuClick('apps')}
//           selected={false}
//           hasactivechild={hasActiveChild(appsRoutes)}
//         >
//           <ListItemIcon>
//             <DashboardIcon />
//           </ListItemIcon>
//           <ListItemText primary="Apps" />
//           {openMenu === 'apps' ? <ExpandLess /> : <ExpandMore />}
//         </ActiveListItem>
//         <Collapse in={openMenu === 'apps'} timeout="auto" unmountOnExit>
//           <List component="div" disablePadding>
//             <ActiveListItem
//               button
//               sx={{ pl: 4 }}
//               onClick={() => handleNavigation("/hrms/admindashboard/eventadmin")}
//               selected={isActive("/hrms/admindashboard/eventadmin")}
//               hasactivechild={false}
//             >
//               <ListItemText primary="Events" />
//             </ActiveListItem>
//             <ActiveListItem
//               button
//               sx={{ pl: 4 }}
//               onClick={() => handleNavigation("/hrms/admindashboard/assestadmin")}
//               selected={isActive("/hrms/admindashboard/assestadmin")}
//               hasactivechild={false}
//             >
//               <ListItemText primary="Assests" />
//             </ActiveListItem>
//             <ActiveListItem
//               button
//               sx={{ pl: 4 }}
//               onClick={() => handleNavigation("/hrms/admindashboard/awardsadmin")}
//               selected={isActive("/hrms/admindashboard/awardsadmin")}
//               hasactivechild={false}
//             >
//               <ListItemText primary="Awards" />
//             </ActiveListItem>
//             <ActiveListItem
//               button
//               sx={{ pl: 4 }}
//               onClick={() => handleNavigation("/hrms/admindashboard/visitorbook")}
//               selected={isActive("/hrms/admindashboard/visitorbook")}
//               hasactivechild={false}
//             >
//               <ListItemText primary="Visitor Book" />
//             </ActiveListItem>
//             <ActiveListItem
//               button
//               sx={{ pl: 4 }}
//               onClick={() => handleNavigation("/hrms/admindashboard/holidaysadmin")}
//               selected={isActive("/hrms/admindashboard/holidaysadmin")}
//               hasactivechild={false}
//             >
//               <ListItemText primary="Holidays" />
//             </ActiveListItem>
//           </List>
//         </Collapse>

//         {/* Employee Confirmation */}
//         <ActiveListItem
//           button
//           onClick={() => handleMenuClick('confirmation')}
//           selected={false}
//           hasactivechild={hasActiveChild(confirmationRoutes)}
//         >
//           <ListItemIcon>
//             <PersonAddIcon />
//           </ListItemIcon>
//           <ListItemText primary="Employee Confirmation" />
//           {openMenu === 'confirmation' ? <ExpandLess /> : <ExpandMore />}
//         </ActiveListItem>
//         <Collapse in={openMenu === 'confirmation'} timeout="auto" unmountOnExit>
//           <List component="div" disablePadding>
//             <ActiveListItem
//               button
//               sx={{ pl: 4 }}
//               onClick={() => handleNavigation("/hrms/admindashboard/parametercreation")}
//               selected={isActive("/hrms/admindashboard/parametercreation")}
//               hasactivechild={false}
//             >
//               <ListItemText primary="Parameter Creation" />
//             </ActiveListItem>
//             <ActiveListItem
//               button
//               sx={{ pl: 4 }}
//               onClick={() => handleNavigation("/hrms/admindashboard/employeeconfirmationMain")}
//               selected={isActive("/hrms/admindashboard/employeeconfirmationMain")}
//               hasactivechild={false}
//             >
//               <ListItemText primary="Confirmation Form" />
//             </ActiveListItem>
//             <ActiveListItem
//               button
//               sx={{ pl: 4 }}
//               onClick={() => handleNavigation("/hrms/admindashboard/performanceTable")}
//               selected={isActive("/hrms/admindashboard/performanceTable")}
//               hasactivechild={false}
//             >
//               <ListItemText primary="Performance Table" />
//             </ActiveListItem>
//             <ActiveListItem
//               button
//               sx={{ pl: 4 }}
//               onClick={() => handleNavigation("/hrms/admindashboard/dashboardConfirmation")}
//               selected={isActive("/hrms/admindashboard/dashboardConfirmation")}
//               hasactivechild={false}
//             >
//               <ListItemText primary="Dashboard Confirmation" />
//             </ActiveListItem>
//           </List>
//         </Collapse>

//         {/* Payroll Dropdown */}
//         <ActiveListItem
//           button
//           onClick={() => handleMenuClick('payroll')}
//           selected={false}
//           hasactivechild={hasActiveChild(payrollRoutes)}
//         >
//           <ListItemIcon>
//             <AccountBalanceWalletIcon />
//           </ListItemIcon>
//           <ListItemText primary="Payroll" />
//           {openMenu === 'payroll' ? <ExpandLess /> : <ExpandMore />}
//         </ActiveListItem>
//         <Collapse in={openMenu === 'payroll'} timeout="auto" unmountOnExit>
//           <List component="div" disablePadding>
//             <ActiveListItem
//               button
//               sx={{ pl: 4 }}
//               onClick={() => handleNavigation("/hrms/admindashboard/DashboardPayroll")}
//               selected={isActive("/hrms/admindashboard/DashboardPayroll")}
//               hasactivechild={false}
//             >
//               <ListItemText primary="Dashboard" />
//             </ActiveListItem>
//             <ActiveListItem
//               button
//               sx={{ pl: 4 }}
//               onClick={() => handleNavigation("/hrms/admindashboard/PayrollSetupManagement")}
//               selected={isActive("/hrms/admindashboard/PayrollSetupManagement")}
//               hasactivechild={false}
//             >
//               <ListItemText primary="Payroll Setup Configuration" />
//             </ActiveListItem>
//           </List>
//         </Collapse>

//         {/* Leave Management */}
//         <ActiveListItem
//           button
//           onClick={() => handleMenuClick('leaveManagement')}
//           selected={false}
//           hasactivechild={hasActiveChild(leaveRoutes)}
//         >
//           <ListItemIcon>
//             <AddBoxIcon />
//           </ListItemIcon>
//           <ListItemText primary="Leave Management" />
//           {openMenu === 'leaveManagement' ? <ExpandLess /> : <ExpandMore />}
//         </ActiveListItem>
//         <Collapse in={openMenu === 'leaveManagement'} timeout="auto" unmountOnExit>
//           <List component="div" disablePadding>
//             <ActiveListItem
//               button
//               sx={{ pl: 4 }}
//               onClick={() => handleNavigation("/hrms/admindashboard/leaverequest")}
//               selected={isActive("/hrms/admindashboard/leaverequest")}
//               hasactivechild={false}
//             >
//               <ListItemText primary="Leave Request" />
//             </ActiveListItem>
//             <ActiveListItem
//               button
//               sx={{ pl: 4 }}
//               onClick={() => handleNavigation("/hrms/admindashboard/mainLeave")}
//               selected={isActive("/hrms/admindashboard/mainLeave")}
//               hasactivechild={false}
//             >
//               <ListItemText primary="Dashboard" />
//             </ActiveListItem>
//             <ActiveListItem
//               button
//               sx={{ pl: 4 }}
//               onClick={() => handleNavigation("/hrms/admindashboard/leaveSetup")}
//               selected={isActive("/hrms/admindashboard/leaveSetup")}
//               hasactivechild={false}
//             >
//               <ListItemText primary="Leave Set Up" />
//             </ActiveListItem>
//           </List>
//         </Collapse>

//         {/* Reports Dropdown */}
//         <ActiveListItem
//           button
//           onClick={() => handleMenuClick('reports')}
//           selected={false}
//           hasactivechild={hasActiveChild(reportsRoutes)}
//         >
//           <ListItemIcon>
//             <SummarizeIcon />
//           </ListItemIcon>
//           <ListItemText primary="Reports" />
//           {openMenu === 'reports' ? <ExpandLess /> : <ExpandMore />}
//         </ActiveListItem>
//         <Collapse in={openMenu === 'reports'} timeout="auto" unmountOnExit>
//           <List component="div" disablePadding>

//             {/* New Joiner Report */}
//             <ActiveListItem
//               button
//               sx={{ pl: 4 }}
//               onClick={() => handleNavigation("/hrms/admindashboard/newJoinerReport")}
//               selected={isActive("/hrms/admindashboard/newJoinerReport")}
//               hasactivechild={false}
//             >
//               <ListItemIcon>
//                 <InsertDriveFileIcon />
//               </ListItemIcon>
//               <ListItemText primary="New Joiner Report" />
//             </ActiveListItem>

//             {/* Annual Manpower Report */}
//             <ActiveListItem
//               button
//               sx={{ pl: 4 }}
//               onClick={() => handleNavigation("/hrms/admindashboard/annualManpowerReport")}
//               selected={isActive("/hrms/admindashboard/annualManpowerReport")}
//               hasactivechild={false}
//             >
//               <ListItemIcon>
//                 <InsertDriveFileIcon />
//               </ListItemIcon>
//               <ListItemText primary="Annual Manpower Report" />
//             </ActiveListItem>

//             {/* Employee Attrition Report */}
//             <ActiveListItem
//               button
//               sx={{ pl: 4 }}
//               onClick={() => handleNavigation("/hrms/admindashboard/employeeAttritionReport")}
//               selected={isActive("/hrms/admindashboard/employeeAttritionReport")}
//               hasactivechild={false}
//             >
//               <ListItemIcon>
//                 <InsertDriveFileIcon />
//               </ListItemIcon>
//               <ListItemText primary="Employee Attrition Report" />
//             </ActiveListItem>

//             {/* Attendance Reports */}
//             <ActiveListItem
//               button
//               sx={{ pl: 4 }}
//               onClick={handleAttendanceReportClick}
//               selected={false}
//               hasactivechild={hasActiveChild(attendanceReportRoutes)}
//             >
//               <ListItemIcon>
//                 <CalendarTodayIcon />
//               </ListItemIcon>
//               <ListItemText primary="Attendance Reports" />
//               {attendanceReportOpen ? <ExpandLess /> : <ExpandMore />}
//             </ActiveListItem>
//             <Collapse in={attendanceReportOpen} timeout="auto" unmountOnExit>
//               <List component="div" disablePadding>
//                 <ActiveListItem
//                   button
//                   sx={{ pl: 6 }}
//                   onClick={() => handleNavigation("/hrms/admindashboard/DailyAttendanceReport")}
//                   selected={isActive("/hrms/admindashboard/DailyAttendanceReport")}
//                   hasactivechild={false}
//                 >
//                   <ListItemText primary="Daily Attendance Report" />
//                 </ActiveListItem>
//                 <ActiveListItem
//                   button
//                   sx={{ pl: 6 }}
//                   onClick={() => handleNavigation("/hrms/admindashboard/MonthlyAttendanceReprt")}
//                   selected={isActive("/hrms/admindashboard/MonthlyAttendanceReprt")}
//                   hasactivechild={false}
//                 >
//                   <ListItemText primary="Monthly Attendance Report" />
//                 </ActiveListItem>
//                 <ActiveListItem
//                   button
//                   sx={{ pl: 6 }}
//                   onClick={() => handleNavigation("/hrms/admindashboard/MonthlyPunchINOUT")}
//                   selected={isActive("/hrms/admindashboard/MonthlyPunchINOUT")}
//                   hasactivechild={false}
//                 >
//                   <ListItemText primary="Monthly Punch IN/OUT" />
//                 </ActiveListItem>
//               </List>
//             </Collapse>

//             {/* Leave Reports */}
//             <ActiveListItem
//               button
//               sx={{ pl: 4 }}
//               onClick={handleLeaveReportClick}
//               selected={false}
//               hasactivechild={hasActiveChild(leaveReportRoutes)}
//             >
//               <ListItemIcon>
//                 <AddBoxIcon />
//               </ListItemIcon>
//               <ListItemText primary="Leave Reports" />
//               {leaveReportOpen ? <ExpandLess /> : <ExpandMore />}
//             </ActiveListItem>
//             <Collapse in={leaveReportOpen} timeout="auto" unmountOnExit>
//               <List component="div" disablePadding>
//                 <ActiveListItem
//                   button
//                   sx={{ pl: 6 }}
//                   onClick={() => handleNavigation("/hrms/admindashboard/AllEmpLeaveReports")}
//                   selected={isActive("/hrms/admindashboard/AllEmpLeaveReports")}
//                   hasactivechild={false}
//                 >
//                   <ListItemText primary="All Employee Summary Report" />
//                 </ActiveListItem>
//                 <ActiveListItem
//                   button
//                   sx={{ pl: 6 }}
//                   onClick={() => handleNavigation("/hrms/admindashboard/annualLeaveReport")}
//                   selected={isActive("/hrms/admindashboard/annualLeaveReport")}
//                   hasactivechild={false}
//                 >
//                   <ListItemText primary="Annual Leave Report" />
//                 </ActiveListItem>
//                 <ActiveListItem
//                   button
//                   sx={{ pl: 6 }}
//                   onClick={() => handleNavigation("/hrms/admindashboard/departmentWiseLeaveReport")}
//                   selected={isActive("/hrms/admindashboard/departmentWiseLeaveReport")}
//                   hasactivechild={false}
//                 >
//                   <ListItemText primary="Leave Pattern Report" />
//                 </ActiveListItem>
//                 <ActiveListItem
//                   button
//                   sx={{ pl: 6 }}
//                   onClick={() => handleNavigation("/hrms/admindashboard/employeeAnnualLeaveReport")}
//                   selected={isActive("/hrms/admindashboard/employeeAnnualLeaveReport")}
//                   hasactivechild={false}
//                 >
//                   <ListItemText primary="Employee Annual Leave Report" />
//                 </ActiveListItem>
//                 <ActiveListItem
//                   button
//                   sx={{ pl: 6 }}
//                   onClick={() => handleNavigation("/hrms/admindashboard/employeePendingLeaveReport")}
//                   selected={isActive("/hrms/admindashboard/employeePendingLeaveReport")}
//                   hasactivechild={false}
//                 >
//                   <ListItemText primary="Employee Pending Leave Report" />
//                 </ActiveListItem>
//                 <ActiveListItem
//                   button
//                   sx={{ pl: 6 }}
//                   onClick={() => handleNavigation("/hrms/admindashboard/monthlyleaveReport")}
//                   selected={isActive("/hrms/admindashboard/monthlyleaveReport")}
//                   hasactivechild={false}
//                 >
//                   <ListItemText primary="Monthly Leave Report" />
//                 </ActiveListItem>
//                 <ActiveListItem
//                   button
//                   sx={{ pl: 6 }}
//                   onClick={() => handleNavigation("/hrms/admindashboard/LeaveBalanceReport")}
//                   selected={isActive("/hrms/admindashboard/LeaveBalanceReport")}
//                   hasactivechild={false}
//                 >
//                   <ListItemText primary="Leave Balance Report" />
//                 </ActiveListItem>
//               </List>
//             </Collapse>

//             {/* Payroll Reports */}
//             <ActiveListItem
//               button
//               sx={{ pl: 4 }}
//               onClick={handlePayrollReportClick}
//               selected={false}
//               hasactivechild={hasActiveChild(payrollReportRoutes)}
//             >
//               <ListItemIcon>
//                 <AccountBalanceWalletIcon />
//               </ListItemIcon>
//               <ListItemText primary="Payroll Reports" />
//               {payrollReportOpen ? <ExpandLess /> : <ExpandMore />}
//             </ActiveListItem>
//             <Collapse in={payrollReportOpen} timeout="auto" unmountOnExit>
//               <List component="div" disablePadding>
//                 <ActiveListItem
//                   button
//                   sx={{ pl: 6 }}
//                   onClick={() => handleNavigation("/hrms/admindashboard/payrollSummaryReport")}
//                   selected={isActive("/hrms/admindashboard/payrollSummaryReport")}
//                   hasactivechild={false}
//                 >
//                   <ListItemText primary="Payroll Summary Report" />
//                 </ActiveListItem>
//                 <ActiveListItem
//                   button
//                   sx={{ pl: 6 }}
//                   onClick={() => handleNavigation("/hrms/admindashboard/taxDeductionReport")}
//                   selected={isActive("/hrms/admindashboard/taxDeductionReport")}
//                   hasactivechild={false}
//                 >
//                   <ListItemText primary="Tax Deduction Report" />
//                 </ActiveListItem>
//                 <ActiveListItem
//                   button
//                   sx={{ pl: 6 }}
//                   onClick={() => handleNavigation("/hrms/admindashboard/bonusPaymentReport")}
//                   selected={isActive("/hrms/admindashboard/bonusPaymentReport")}
//                   hasactivechild={false}
//                 >
//                   <ListItemText primary="Bonus Payment Report" />
//                 </ActiveListItem>
//                 <ActiveListItem
//                   button
//                   sx={{ pl: 6 }}
//                   onClick={() => handleNavigation("/hrms/admindashboard/loanDeductionReport")}
//                   selected={isActive("/hrms/admindashboard/loanDeductionReport")}
//                   hasactivechild={false}
//                 >
//                   <ListItemText primary="Loan Deduction Report" />
//                 </ActiveListItem>
//               </List>
//             </Collapse>

//             {/* Confirmation Reports */}
//             <ActiveListItem
//               button
//               sx={{ pl: 4 }}
//               onClick={handleConfirmationReportClick}
//               selected={false}
//               hasactivechild={hasActiveChild(confirmationReportRoutes)}
//             >
//               <ListItemIcon>
//                 <PersonAddIcon />
//               </ListItemIcon>
//               <ListItemText primary="Confirmation Reports" />
//               {confirmationReportOpen ? <ExpandLess /> : <ExpandMore />}
//             </ActiveListItem>
//             <Collapse in={confirmationReportOpen} timeout="auto" unmountOnExit>
//               <List component="div" disablePadding>
//                 <ActiveListItem
//                   button
//                   sx={{ pl: 6 }}
//                   onClick={() => handleNavigation("/hrms/admindashboard/confirmationStatusReport")}
//                   selected={isActive("/hrms/admindashboard/confirmationStatusReport")}
//                   hasactivechild={false}
//                 >
//                   <ListItemText primary="Confirmation Status Report" />
//                 </ActiveListItem>
//                 <ActiveListItem
//                   button
//                   sx={{ pl: 6 }}
//                   onClick={() => handleNavigation("/hrms/admindashboard/employeePerformanceReport")}
//                   selected={isActive("/hrms/admindashboard/employeePerformanceReport")}
//                   hasactivechild={false}
//                 >
//                   <ListItemText primary="Employee Performance Report" />
//                 </ActiveListItem>
//                 <ActiveListItem
//                   button
//                   sx={{ pl: 6 }}
//                   onClick={() => handleNavigation("/hrms/admindashboard/confirmationProcessReport")}
//                   selected={isActive("/hrms/admindashboard/confirmationProcessReport")}
//                   hasactivechild={false}
//                 >
//                   <ListItemText primary="Confirmation Process Report" />
//                 </ActiveListItem>
//               </List>
//             </Collapse>
//           </List>
//         </Collapse>

//         {/* Resignation */}
//         <ActiveListItem
//           button
//           onClick={() => handleNavigation("/hrms/admindashboard/resignpaneladmin")}
//           selected={isActive("/hrms/admindashboard/resignpaneladmin")}
//           hasactivechild={false}
//         >
//           <ListItemIcon>
//             <PersonRemoveIcon />
//           </ListItemIcon>
//           <ListItemText primary="Resignation" />
//         </ActiveListItem>

//         {/* HelpDesk */}
//         <ActiveListItem
//           button
//           onClick={() => handleNavigation("/hrms/admindashboard/helpdesk")}
//           selected={isActive("/hrms/admindashboard/helpdesk")}
//           hasactivechild={false}
//         >
//           <ListItemIcon>
//             <HelpIcon />
//           </ListItemIcon>
//           <ListItemText primary="HelpDesk" />
//         </ActiveListItem>
//       </List>
//     </Drawer>
//   );
// }   ///////////////







// import React, { useState, useMemo } from "react";
// import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
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
//   styled,
// } from "@mui/material";
// import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
// import HomeIcon from "@mui/icons-material/Home";
// import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
// import GroupIcon from "@mui/icons-material/Group";
// import WorkIcon from "@mui/icons-material/Work";
// import ExpandLess from "@mui/icons-material/ExpandLess";
// import ExpandMore from "@mui/icons-material/ExpandMore";
// import HelpIcon from "@mui/icons-material/Help";
// import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
// import { useNavigate, useLocation } from "react-router-dom";
// import AddBoxIcon from "@mui/icons-material/AddBox";
// import PersonAddIcon from "@mui/icons-material/PersonAdd";
// import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
// import DashboardIcon from '@mui/icons-material/Dashboard';
// import PolicyIcon from '@mui/icons-material/Policy';
// import SummarizeIcon from '@mui/icons-material/Summarize';

// // Styled component for active list items
// // CHANGED: Active items now have a solid orange background with white text/icons for a more professional look.
// const ActiveListItem = styled(ListItem)(({ theme, selected, hasactivechild }) => ({
//   // If active, background is solid orange. Otherwise, transparent.
//   backgroundColor: selected || hasactivechild ? '#F4511E' : 'transparent',
//   // If active, text color is white for contrast.
//   color: selected || hasactivechild ? '#ffffff' : 'inherit',

//   // Hover effects
//   '&:hover': {
//     // A slightly darker orange for active items, and light gray for inactive ones.
//     backgroundColor: selected || hasactivechild ? '#e64a19' : '#f5f5f5',
//   },

//   // Icon color logic
//   '& .MuiListItemIcon-root': {
//     // If active, icon is white. Otherwise, it's the standard gray.
//     color: selected || hasactivechild ? '#ffffff' : '#757575',
//   },
//   margin: '2px 8px',
//   borderRadius: '4px',
//   padding: '8px 12px',
//   transition: 'all 0.2s ease',
// }));


// export default function Sidebar({ open, toggleDrawer, drawerWidth }) {
//   // Single state to manage which top-level menu is open
//   const [openMenu, setOpenMenu] = useState(null);

//   // State for nested dropdowns within Reports
//   const [attendanceReportOpen, setAttendanceReportOpen] = useState(false);
//   const [leaveReportOpen, setLeaveReportOpen] = useState(false);
//   const [payrollReportOpen, setPayrollReportOpen] = useState(false);
//   const [confirmationReportOpen, setConfirmationReportOpen] = useState(false);

//   const navigate = useNavigate();
//   const location = useLocation();

//   // Check if any child route is active for dropdown headers
//   const hasActiveChild = (routes) => {
//     return routes.some(route => location.pathname === route);
//   };

//   // Employee routes
//   const employeeRoutes = useMemo(() => [
//     "/hrms/admindashboard/employeesMain",
//     "/hrms/admindashboard/employees",
//     "/hrms/admindashboard/shifts",
//     "/hrms/admindashboard/employeeexits"
//   ], []);

//   // Core HR routes
//   const coreHRRoutes = useMemo(() => [
//     "/hrms/admindashboard/corehrdashboard",
//     "/hrms/admindashboard/companydetails",
//     "/hrms/admindashboard/employeehub",
//     "/hrms/admindashboard/department",
//     "/hrms/admindashboard/designation",
//     "/hrms/admindashboard/division",
//     "/hrms/admindashboard/grade",
//     "/hrms/admindashboard/payrollSetup",
//     "/hrms/admindashboard/headquaters",
//     "/hrms/admindashboard/makeannouncement"
//   ], []);

//   // Policy Management routes
//   const policyRoutes = useMemo(() => [
//     "/hrms/admindashboard/policies",
//     "/hrms/admindashboard/policyDashboard",
//     "/hrms/admindashboard/policyallocation"
//   ], []);

//   // Attendance routes
//   const attendanceRoutes = useMemo(() => [
//     "/hrms/admindashboard/attendancemain",
//     "/hrms/admindashboard/monthly-report"
//   ], []);

//   // Apps routes
//   const appsRoutes = useMemo(() => [
//     "/hrms/admindashboard/eventadmin",
//     "/hrms/admindashboard/assestadmin",
//     "/hrms/admindashboard/awardsadmin",
//     "/hrms/admindashboard/visitorbook",
//     "/hrms/admindashboard/holidaysadmin"
//   ], []);

//   // Confirmation routes
//   const confirmationRoutes = useMemo(() => [
//     "/hrms/admindashboard/parametercreation",
//     "/hrms/admindashboard/employeeconfirmationMain",
//     "/hrms/admindashboard/performanceTable",
//     "/hrms/admindashboard/dashboardConfirmation"
//   ], []);

//   // Payroll routes
//   const payrollRoutes = useMemo(() => [
//     "/hrms/admindashboard/DashboardPayroll",
//     "/hrms/admindashboard/PayrollSetupManagement"
//   ], []);

//   // Leave Management routes
//   const leaveRoutes = useMemo(() => [
//     "/hrms/admindashboard/leaverequest",
//     "/hrms/admindashboard/mainLeave",
//     "/hrms/admindashboard/leaveSetup"
//   ], []);

//   // Attendance Report routes
//   const attendanceReportRoutes = useMemo(() => [
//     "/hrms/admindashboard/DailyAttendanceReport",
//     "/hrms/admindashboard/MonthlyAttendanceReprt",
//     "/hrms/admindashboard/MonthlyPunchINOUT"
//   ], []);

//   // Leave Report routes
//   const leaveReportRoutes = useMemo(() => [
//     "/hrms/admindashboard/AllEmpLeaveReports",
//     "/hrms/admindashboard/annualLeaveReport",
//     "/hrms/admindashboard/departmentWiseLeaveReport",
//     "/hrms/admindashboard/employeeAnnualLeaveReport",
//     "/hrms/admindashboard/employeePendingLeaveReport",
//     "/hrms/admindashboard/monthlyleaveReport",
//     "/hrms/admindashboard/LeaveBalanceReport"
//   ], []);

//   // Payroll Report routes
//   const payrollReportRoutes = useMemo(() => [
//     "/hrms/admindashboard/payrollSummaryReport",
//     "/hrms/admindashboard/taxDeductionReport",
//     "/hrms/admindashboard/bonusPaymentReport",
//     "/hrms/admindashboard/loanDeductionReport"
//   ], []);

//   // Confirmation Report routes
//   const confirmationReportRoutes = useMemo(() => [
//     "/hrms/admindashboard/confirmationStatusReport",
//     "/hrms/admindashboard/employeePerformanceReport",
//     "/hrms/admindashboard/confirmationProcessReport"
//   ], []);

//   // Reports routes (all report categories)
//   const reportsRoutes = useMemo(() => [
//     ...attendanceReportRoutes,
//     ...leaveReportRoutes,
//     ...payrollReportRoutes,
//     ...confirmationReportRoutes,
//     "/hrms/admindashboard/NewJoinerReport",
//     "/hrms/admindashboard/annualManpowerReport",
//     "/hrms/admindashboard/employeeAttritionReport"
//   ], [attendanceReportRoutes, leaveReportRoutes, payrollReportRoutes, confirmationReportRoutes]);

//   // Unified handler for all top-level menus
//   const handleMenuClick = (menuName) => {
//     setOpenMenu(prevOpenMenu => (prevOpenMenu === menuName ? null : menuName));
//   };

//   const handleAttendanceReportClick = () => {
//     setAttendanceReportOpen(!attendanceReportOpen);
//   };

//   const handleLeaveReportClick = () => {
//     setLeaveReportOpen(!leaveReportOpen);
//   };

//   const handlePayrollReportClick = () => {
//     setPayrollReportOpen(!payrollReportOpen);
//   };

//   const handleConfirmationReportClick = () => {
//     setConfirmationReportOpen(!confirmationReportOpen);
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
//           cursor: "pointer",
//           backgroundColor: '#fafafa',
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
//           backgroundColor: 'primary.main',
//           color: 'primary.contrastText',
//         }}
//       >
//         <IconButton onClick={toggleDrawer} sx={{ color: 'inherit' }}>
//           <ChevronLeftIcon />
//         </IconButton>
//       </Box>
//       <Divider />
//       <List sx={{ p: 1 }}>
//         {/* Home Item */}
//         <ActiveListItem
//           button
//           onClick={() => handleNavigation("/hrms/admindashboard/home")}
//           selected={isActive("/hrms/admindashboard/home")}
//           hasactivechild={false}
//         >
//           <ListItemIcon>
//             <HomeIcon />
//           </ListItemIcon>
//           <ListItemText primary="Home" />
//         </ActiveListItem>

//         {/* Employees Item */}
//         <ActiveListItem
//           button
//           onClick={() => handleMenuClick('employees')}
//           selected={false}
//           hasactivechild={hasActiveChild(employeeRoutes)}
//         >
//           <ListItemIcon>
//             <GroupIcon />
//           </ListItemIcon>
//           <ListItemText primary="Employees" />
//           {openMenu === 'employees' ? <ExpandLess /> : <ExpandMore />}
//         </ActiveListItem>
//         <Collapse in={openMenu === 'employees'} timeout="auto" unmountOnExit>
//           <List component="div" disablePadding>
//             <ActiveListItem
//               button
//               sx={{ pl: 4 }}
//               onClick={() => handleNavigation("/hrms/admindashboard/employeesMain")}
//               selected={isActive("/hrms/admindashboard/employeesMain")}
//               hasactivechild={false}
//             >
//               <ListItemText primary="Dashboard" />
//             </ActiveListItem>
//             <ActiveListItem
//               button
//               sx={{ pl: 4 }}
//               onClick={() => handleNavigation("/hrms/admindashboard/employees")}
//               selected={isActive("/hrms/admindashboard/employees")}
//               hasactivechild={false}
//             >
//               <ListItemText primary="Employees List" />
//             </ActiveListItem>
//             <ActiveListItem
//               button
//               sx={{ pl: 4 }}
//               onClick={() => handleNavigation("/hrms/admindashboard/shifts")}
//               selected={isActive("/hrms/admindashboard/shifts")}
//               hasactivechild={false}
//             >
//               <ListItemText primary="Shifts & Scheduling" />
//             </ActiveListItem>
//             <ActiveListItem
//               button
//               sx={{ pl: 4 }}
//               onClick={() => handleNavigation("/hrms/admindashboard/employeeexits")}
//               selected={isActive("/hrms/admindashboard/employeeexits")}
//               hasactivechild={false}
//             >
//               <ListItemText primary="Employees Exit" />
//             </ActiveListItem>
//           </List>
//         </Collapse>

//         {/* Core HR Dropdown */}
//         <ActiveListItem
//           button
//           onClick={() => handleMenuClick('coreHR')}
//           selected={false}
//           hasactivechild={hasActiveChild(coreHRRoutes)}
//         >
//           <ListItemIcon>
//             <WorkIcon />
//           </ListItemIcon>
//           <ListItemText primary="Core HR" />
//           {openMenu === 'coreHR' ? <ExpandLess /> : <ExpandMore />}
//         </ActiveListItem>
//         <Collapse in={openMenu === 'coreHR'} timeout="auto" unmountOnExit>
//           <List component="div" disablePadding>
//             <ActiveListItem
//               button
//               sx={{ pl: 4 }}
//               onClick={() => handleNavigation("/hrms/admindashboard/corehrdashboard")}
//               selected={isActive("/hrms/admindashboard/corehrdashboard")}
//               hasactivechild={false}
//             >
//               <ListItemText primary="Dashboard" />
//             </ActiveListItem>
//             <ActiveListItem
//               button
//               sx={{ pl: 4 }}
//               onClick={() => handleNavigation("/hrms/admindashboard/companydetails")}
//               selected={isActive("/hrms/admindashboard/companydetails")}
//               hasactivechild={false}
//             >
//               <ListItemText primary="Company Details" />
//             </ActiveListItem>
//             <ActiveListItem
//               button
//               sx={{ pl: 4 }}
//               onClick={() => handleNavigation("/hrms/admindashboard/employeehub")}
//               selected={isActive("/hrms/admindashboard/employeehub")}
//               hasactivechild={false}
//             >
//               <ListItemText primary="Employee Hub" />
//             </ActiveListItem>
//             <ActiveListItem
//               button
//               sx={{ pl: 4 }}
//               onClick={() => handleNavigation("/hrms/admindashboard/department")}
//               selected={isActive("/hrms/admindashboard/department")}
//               hasactivechild={false}
//             >
//               <ListItemText primary="Department" />
//             </ActiveListItem>
//             <ActiveListItem
//               button
//               sx={{ pl: 4 }}
//               onClick={() => handleNavigation("/hrms/admindashboard/designation")}
//               selected={isActive("/hrms/admindashboard/designation")}
//               hasactivechild={false}
//             >
//               <ListItemText primary="Designation" />
//             </ActiveListItem>
//             <ActiveListItem
//               button
//               sx={{ pl: 4 }}
//               onClick={() => handleNavigation("/hrms/admindashboard/division")}
//               selected={isActive("/hrms/admindashboard/division")}
//               hasactivechild={false}
//             >
//               <ListItemText primary="Division" />
//             </ActiveListItem>
//             <ActiveListItem
//               button
//               sx={{ pl: 4 }}
//               onClick={() => handleNavigation("/hrms/admindashboard/grade")}
//               selected={isActive("/hrms/admindashboard/grade")}
//               hasactivechild={false}
//             >
//               <ListItemText primary="Grade" />
//             </ActiveListItem>
//             <ActiveListItem
//               button
//               sx={{ pl: 4 }}
//               onClick={() => handleNavigation("/hrms/admindashboard/payrollSetup")}
//               selected={isActive("/hrms/admindashboard/payrollSetup")}
//               hasactivechild={false}
//             >
//               <ListItemText primary="Pay Roll Set Up" />
//             </ActiveListItem>
//             <ActiveListItem
//               button
//               sx={{ pl: 4 }}
//               onClick={() => handleNavigation("/hrms/admindashboard/headquaters")}
//               selected={isActive("/hrms/admindashboard/headquaters")}
//               hasactivechild={false}
//             >
//               <ListItemText primary="Headquaters" />
//             </ActiveListItem>
//             <ActiveListItem
//               button
//               sx={{ pl: 4 }}
//               onClick={() => handleNavigation("/hrms/admindashboard/makeannouncement")}
//               selected={isActive("/hrms/admindashboard/makeannouncement")}
//               hasactivechild={false}
//             >
//               <ListItemText primary="Make Announcement" />
//             </ActiveListItem>
//           </List>
//         </Collapse>

//         {/* Policy Management */}
//         <ActiveListItem
//           button
//           onClick={() => handleMenuClick('policyManagement')}
//           selected={false}
//           hasactivechild={hasActiveChild(policyRoutes)}
//         >
//           <ListItemIcon>
//             <PolicyIcon />
//           </ListItemIcon>
//           <ListItemText primary="Policy Management" />
//           {openMenu === 'policyManagement' ? <ExpandLess /> : <ExpandMore />}
//         </ActiveListItem>
//         <Collapse in={openMenu === 'policyManagement'} timeout="auto" unmountOnExit>
//           <List component="div" disablePadding>
//             <ActiveListItem
//               button
//               sx={{ pl: 4 }}
//               onClick={() => handleNavigation("/hrms/admindashboard/policies")}
//               selected={isActive("/hrms/admindashboard/policies")}
//               hasactivechild={false}
//             >
//               <ListItemText primary="Policies" />
//             </ActiveListItem>
//             <ActiveListItem
//               button
//               sx={{ pl: 4 }}
//               onClick={() => handleNavigation("/hrms/admindashboard/policyDashboard")}
//               selected={isActive("/hrms/admindashboard/policyDashboard")}
//               hasactivechild={false}
//             >
//               <ListItemText primary="Policy Dashboard" />
//             </ActiveListItem>
//             <ActiveListItem
//               button
//               sx={{ pl: 4 }}
//               onClick={() => handleNavigation("/hrms/admindashboard/policyallocation")}
//               selected={isActive("/hrms/admindashboard/policyallocation")}
//               hasactivechild={false}
//             >
//               <ListItemText primary="Policy Allocation" />
//             </ActiveListItem>
//           </List>
//         </Collapse>

//         {/* Attendance Dropdown */}
//         <ActiveListItem
//           button
//           onClick={() => handleMenuClick('attendance')}
//           selected={false}
//           hasactivechild={hasActiveChild(attendanceRoutes)}
//         >
//           <ListItemIcon>
//             <CalendarTodayIcon />
//           </ListItemIcon>
//           <ListItemText primary="Attendance" />
//           {openMenu === 'attendance' ? <ExpandLess /> : <ExpandMore />}
//         </ActiveListItem>
//         <Collapse in={openMenu === 'attendance'} timeout="auto" unmountOnExit>
//           <List component="div" disablePadding>
//             <ActiveListItem
//               button
//               sx={{ pl: 4 }}
//               onClick={() => handleNavigation("/hrms/admindashboard/attendancemain")}
//               selected={isActive("/hrms/admindashboard/attendancemain")}
//               hasactivechild={false}
//             >
//               <ListItemText primary="Daily Attendance" />
//             </ActiveListItem>
//             <ActiveListItem
//               button
//               sx={{ pl: 4 }}
//               onClick={() => handleNavigation("/hrms/admindashboard/monthly-report")}
//               selected={isActive("/hrms/admindashboard/monthly-report")}
//               hasactivechild={false}
//             >
//               <ListItemText primary="Monthly Report" />
//             </ActiveListItem>
//           </List>
//         </Collapse>

//         {/* Apps */}
//         <ActiveListItem
//           button
//           onClick={() => handleMenuClick('apps')}
//           selected={false}
//           hasactivechild={hasActiveChild(appsRoutes)}
//         >
//           <ListItemIcon>
//             <DashboardIcon />
//           </ListItemIcon>
//           <ListItemText primary="Apps" />
//           {openMenu === 'apps' ? <ExpandLess /> : <ExpandMore />}
//         </ActiveListItem>
//         <Collapse in={openMenu === 'apps'} timeout="auto" unmountOnExit>
//           <List component="div" disablePadding>
//             <ActiveListItem
//               button
//               sx={{ pl: 4 }}
//               onClick={() => handleNavigation("/hrms/admindashboard/eventadmin")}
//               selected={isActive("/hrms/admindashboard/eventadmin")}
//               hasactivechild={false}
//             >
//               <ListItemText primary="Events" />
//             </ActiveListItem>
//             <ActiveListItem
//               button
//               sx={{ pl: 4 }}
//               onClick={() => handleNavigation("/hrms/admindashboard/assestadmin")}
//               selected={isActive("/hrms/admindashboard/assestadmin")}
//               hasactivechild={false}
//             >
//               <ListItemText primary="Assests" />
//             </ActiveListItem>
//             <ActiveListItem
//               button
//               sx={{ pl: 4 }}
//               onClick={() => handleNavigation("/hrms/admindashboard/awardsadmin")}
//               selected={isActive("/hrms/admindashboard/awardsadmin")}
//               hasactivechild={false}
//             >
//               <ListItemText primary="Awards" />
//             </ActiveListItem>
//             <ActiveListItem
//               button
//               sx={{ pl: 4 }}
//               onClick={() => handleNavigation("/hrms/admindashboard/visitorbook")}
//               selected={isActive("/hrms/admindashboard/visitorbook")}
//               hasactivechild={false}
//             >
//               <ListItemText primary="Visitor Book" />
//             </ActiveListItem>
//             <ActiveListItem
//               button
//               sx={{ pl: 4 }}
//               onClick={() => handleNavigation("/hrms/admindashboard/holidaysadmin")}
//               selected={isActive("/hrms/admindashboard/holidaysadmin")}
//               hasactivechild={false}
//             >
//               <ListItemText primary="Holidays" />
//             </ActiveListItem>
//           </List>
//         </Collapse>

//         {/* Employee Confirmation */}
//         <ActiveListItem
//           button
//           onClick={() => handleMenuClick('confirmation')}
//           selected={false}
//           hasactivechild={hasActiveChild(confirmationRoutes)}
//         >
//           <ListItemIcon>
//             <PersonAddIcon />
//           </ListItemIcon>
//           <ListItemText primary="Employee Confirmation" />
//           {openMenu === 'confirmation' ? <ExpandLess /> : <ExpandMore />}
//         </ActiveListItem>
//         <Collapse in={openMenu === 'confirmation'} timeout="auto" unmountOnExit>
//           <List component="div" disablePadding>
//             <ActiveListItem
//               button
//               sx={{ pl: 4 }}
//               onClick={() => handleNavigation("/hrms/admindashboard/parametercreation")}
//               selected={isActive("/hrms/admindashboard/parametercreation")}
//               hasactivechild={false}
//             >
//               <ListItemText primary="Parameter Creation" />
//             </ActiveListItem>
//             <ActiveListItem
//               button
//               sx={{ pl: 4 }}
//               onClick={() => handleNavigation("/hrms/admindashboard/employeeconfirmationMain")}
//               selected={isActive("/hrms/admindashboard/employeeconfirmationMain")}
//               hasactivechild={false}
//             >
//               <ListItemText primary="Confirmation Form" />
//             </ActiveListItem>
//             <ActiveListItem
//               button
//               sx={{ pl: 4 }}
//               onClick={() => handleNavigation("/hrms/admindashboard/performanceTable")}
//               selected={isActive("/hrms/admindashboard/performanceTable")}
//               hasactivechild={false}
//             >
//               <ListItemText primary="Performance Table" />
//             </ActiveListItem>
//             <ActiveListItem
//               button
//               sx={{ pl: 4 }}
//               onClick={() => handleNavigation("/hrms/admindashboard/dashboardConfirmation")}
//               selected={isActive("/hrms/admindashboard/dashboardConfirmation")}
//               hasactivechild={false}
//             >
//               <ListItemText primary="Dashboard Confirmation" />
//             </ActiveListItem>
//           </List>
//         </Collapse>

//         {/* Payroll Dropdown */}
//         <ActiveListItem
//           button
//           onClick={() => handleMenuClick('payroll')}
//           selected={false}
//           hasactivechild={hasActiveChild(payrollRoutes)}
//         >
//           <ListItemIcon>
//             <AccountBalanceWalletIcon />
//           </ListItemIcon>
//           <ListItemText primary="Payroll" />
//           {openMenu === 'payroll' ? <ExpandLess /> : <ExpandMore />}
//         </ActiveListItem>
//         <Collapse in={openMenu === 'payroll'} timeout="auto" unmountOnExit>
//           <List component="div" disablePadding>
//             <ActiveListItem
//               button
//               sx={{ pl: 4 }}
//               onClick={() => handleNavigation("/hrms/admindashboard/DashboardPayroll")}
//               selected={isActive("/hrms/admindashboard/DashboardPayroll")}
//               hasactivechild={false}
//             >
//               <ListItemText primary="Dashboard" />
//             </ActiveListItem>
//             <ActiveListItem
//               button
//               sx={{ pl: 4 }}
//               onClick={() => handleNavigation("/hrms/admindashboard/PayrollSetupManagement")}
//               selected={isActive("/hrms/admindashboard/PayrollSetupManagement")}
//               hasactivechild={false}
//             >
//               <ListItemText primary="Payroll Setup Configuration" />
//             </ActiveListItem>

//             <ActiveListItem button sx={{ pl: 4 }}
//               hasactivechild={false}
//               selected={isActive("/hrms/admindashboard/payrollReport")}
//               onClick={() => handleNavigation("/hrms/admindashboard/payrollReport")}>
//               <ListItemText primary="Payroll Reports" />
//             </ActiveListItem>
//           </List>
//         </Collapse>

//         {/* Leave Management */}
//         <ActiveListItem
//           button
//           onClick={() => handleMenuClick('leaveManagement')}
//           selected={false}
//           hasactivechild={hasActiveChild(leaveRoutes)}
//         >
//           <ListItemIcon>
//             <AddBoxIcon />
//           </ListItemIcon>
//           <ListItemText primary="Leave Management" />
//           {openMenu === 'leaveManagement' ? <ExpandLess /> : <ExpandMore />}
//         </ActiveListItem>
//         <Collapse in={openMenu === 'leaveManagement'} timeout="auto" unmountOnExit>
//           <List component="div" disablePadding>
//             <ActiveListItem
//               button
//               sx={{ pl: 4 }}
//               onClick={() => handleNavigation("/hrms/admindashboard/leaverequest")}
//               selected={isActive("/hrms/admindashboard/leaverequest")}
//               hasactivechild={false}
//             >
//               <ListItemText primary="Leave Request" />
//             </ActiveListItem>
//             <ActiveListItem
//               button
//               sx={{ pl: 4 }}
//               onClick={() => handleNavigation("/hrms/admindashboard/mainLeave")}
//               selected={isActive("/hrms/admindashboard/mainLeave")}
//               hasactivechild={false}
//             >
//               <ListItemText primary="Dashboard" />
//             </ActiveListItem>
//             <ActiveListItem
//               button
//               sx={{ pl: 4 }}
//               onClick={() => handleNavigation("/hrms/admindashboard/leaveSetup")}
//               selected={isActive("/hrms/admindashboard/leaveSetup")}
//               hasactivechild={false}
//             >
//               <ListItemText primary="Leave Set Up" />
//             </ActiveListItem>
//           </List>
//         </Collapse>

//         {/* Reports Dropdown */}
//         <ActiveListItem
//           button
//           onClick={() => handleMenuClick('reports')}
//           selected={false}
//           hasactivechild={hasActiveChild(reportsRoutes)}
//         >
//           <ListItemIcon>
//             <SummarizeIcon />
//           </ListItemIcon>
//           <ListItemText primary="Reports" />
//           {openMenu === 'reports' ? <ExpandLess /> : <ExpandMore />}
//         </ActiveListItem>
//         <Collapse in={openMenu === 'reports'} timeout="auto" unmountOnExit>
//           <List component="div" disablePadding>

//             {/* New Joiner Report */}
//             <ActiveListItem
//               button
//               sx={{ pl: 4 }}
//               onClick={() => handleNavigation("/hrms/admindashboard/NewJoinerReport")}
//               selected={isActive("/hrms/admindashboard/NewJoinerReport")}
//               hasactivechild={false}
//             >
//               <ListItemIcon>
//                 <InsertDriveFileIcon />
//               </ListItemIcon>
//               <ListItemText primary="New Joiner Report" />
//             </ActiveListItem>

//             {/* Annual Manpower Report */}
//             <ActiveListItem
//               button
//               sx={{ pl: 4 }}
//               onClick={() => handleNavigation("/hrms/admindashboard/annualManpowerReport")}
//               selected={isActive("/hrms/admindashboard/annualManpowerReport")}
//               hasactivechild={false}
//             >
//               <ListItemIcon>
//                 <InsertDriveFileIcon />
//               </ListItemIcon>
//               <ListItemText primary="Annual Manpower Report" />
//             </ActiveListItem>

//             {/* Employee Attrition Report */}
//             <ActiveListItem
//               button
//               sx={{ pl: 4 }}
//               onClick={() => handleNavigation("/hrms/admindashboard/employeeAttritionReport")}
//               selected={isActive("/hrms/admindashboard/employeeAttritionReport")}
//               hasactivechild={false}
//             >
//               <ListItemIcon>
//                 <InsertDriveFileIcon />
//               </ListItemIcon>
//               <ListItemText primary="Employee Attrition Report" />
//             </ActiveListItem>

//             {/* Attendance Reports */}
//             <ActiveListItem
//               button
//               sx={{ pl: 4 }}
//               onClick={handleAttendanceReportClick}
//               selected={false}
//               hasactivechild={hasActiveChild(attendanceReportRoutes)}
//             >
//               <ListItemIcon>
//                 <CalendarTodayIcon />
//               </ListItemIcon>
//               <ListItemText primary="Attendance Reports" />
//               {attendanceReportOpen ? <ExpandLess /> : <ExpandMore />}
//             </ActiveListItem>
//             <Collapse in={attendanceReportOpen} timeout="auto" unmountOnExit>
//               <List component="div" disablePadding>
//                 <ActiveListItem
//                   button
//                   sx={{ pl: 6 }}
//                   onClick={() => handleNavigation("/hrms/admindashboard/DailyAttendanceReport")}
//                   selected={isActive("/hrms/admindashboard/DailyAttendanceReport")}
//                   hasactivechild={false}
//                 >
//                   <ListItemText primary="Daily Attendance Report" />
//                 </ActiveListItem>
//                 <ActiveListItem
//                   button
//                   sx={{ pl: 6 }}
//                   onClick={() => handleNavigation("/hrms/admindashboard/MonthlyAttendanceReprt")}
//                   selected={isActive("/hrms/admindashboard/MonthlyAttendanceReprt")}
//                   hasactivechild={false}
//                 >
//                   <ListItemText primary="Monthly Attendance Report" />
//                 </ActiveListItem>
//                 <ActiveListItem
//                   button
//                   sx={{ pl: 6 }}
//                   onClick={() => handleNavigation("/hrms/admindashboard/MonthlyPunchINOUT")}
//                   selected={isActive("/hrms/admindashboard/MonthlyPunchINOUT")}
//                   hasactivechild={false}
//                 >
//                   <ListItemText primary="Monthly Punch IN/OUT" />
//                 </ActiveListItem>
//               </List>
//             </Collapse>

//             {/* Leave Reports */}
//             <ActiveListItem
//               button
//               sx={{ pl: 4 }}
//               onClick={handleLeaveReportClick}
//               selected={false}
//               hasactivechild={hasActiveChild(leaveReportRoutes)}
//             >
//               <ListItemIcon>
//                 <AddBoxIcon />
//               </ListItemIcon>
//               <ListItemText primary="Leave Reports" />
//               {leaveReportOpen ? <ExpandLess /> : <ExpandMore />}
//             </ActiveListItem>
//             <Collapse in={leaveReportOpen} timeout="auto" unmountOnExit>
//               <List component="div" disablePadding>
//                 <ActiveListItem
//                   button
//                   sx={{ pl: 6 }}
//                   onClick={() => handleNavigation("/hrms/admindashboard/AllEmpLeaveReports")}
//                   selected={isActive("/hrms/admindashboard/AllEmpLeaveReports")}
//                   hasactivechild={false}
//                 >
//                   <ListItemText primary="All Employee Summary Report" />
//                 </ActiveListItem>
//                 <ActiveListItem
//                   button
//                   sx={{ pl: 6 }}
//                   onClick={() => handleNavigation("/hrms/admindashboard/annualLeaveReport")}
//                   selected={isActive("/hrms/admindashboard/annualLeaveReport")}
//                   hasactivechild={false}
//                 >
//                   <ListItemText primary="Annual Leave Report" />
//                 </ActiveListItem>
//                 <ActiveListItem
//                   button
//                   sx={{ pl: 6 }}
//                   onClick={() => handleNavigation("/hrms/admindashboard/departmentWiseLeaveReport")}
//                   selected={isActive("/hrms/admindashboard/departmentWiseLeaveReport")}
//                   hasactivechild={false}
//                 >
//                   <ListItemText primary="Leave Pattern Report" />
//                 </ActiveListItem>
//                 <ActiveListItem
//                   button
//                   sx={{ pl: 6 }}
//                   onClick={() => handleNavigation("/hrms/admindashboard/employeeAnnualLeaveReport")}
//                   selected={isActive("/hrms/admindashboard/employeeAnnualLeaveReport")}
//                   hasactivechild={false}
//                 >
//                   <ListItemText primary="Employee Annual Leave Report" />
//                 </ActiveListItem>
//                 <ActiveListItem
//                   button
//                   sx={{ pl: 6 }}
//                   onClick={() => handleNavigation("/hrms/admindashboard/employeePendingLeaveReport")}
//                   selected={isActive("/hrms/admindashboard/employeePendingLeaveReport")}
//                   hasactivechild={false}
//                 >
//                   <ListItemText primary="Employee Pending Leave Report" />
//                 </ActiveListItem>
//                 <ActiveListItem
//                   button
//                   sx={{ pl: 6 }}
//                   onClick={() => handleNavigation("/hrms/admindashboard/monthlyleaveReport")}
//                   selected={isActive("/hrms/admindashboard/monthlyleaveReport")}
//                   hasactivechild={false}
//                 >
//                   <ListItemText primary="Monthly Leave Report" />
//                 </ActiveListItem>
//                 <ActiveListItem
//                   button
//                   sx={{ pl: 6 }}
//                   onClick={() => handleNavigation("/hrms/admindashboard/LeaveBalanceReport")}
//                   selected={isActive("/hrms/admindashboard/LeaveBalanceReport")}
//                   hasactivechild={false}
//                 >
//                   <ListItemText primary="Leave Balance Report" />
//                 </ActiveListItem>
//               </List>
//             </Collapse>

//             {/* Payroll Reports */}
//             <ActiveListItem
//               button
//               sx={{ pl: 4 }}
//               onClick={handlePayrollReportClick}
//               selected={false}
//               hasactivechild={hasActiveChild(payrollReportRoutes)}
//             >
//               <ListItemIcon>
//                 <AccountBalanceWalletIcon />
//               </ListItemIcon>
//               <ListItemText primary="Payroll Reports" />
//               {payrollReportOpen ? <ExpandLess /> : <ExpandMore />}
//             </ActiveListItem>
//             <Collapse in={payrollReportOpen} timeout="auto" unmountOnExit>
//               <List component="div" disablePadding>
//                 <ActiveListItem
//                   button
//                   sx={{ pl: 6 }}
//                   onClick={() => handleNavigation("/hrms/admindashboard/payrollSummaryReport")}
//                   selected={isActive("/hrms/admindashboard/payrollSummaryReport")}
//                   hasactivechild={false}
//                 >
//                   <ListItemText primary="Payroll Summary Report" />
//                 </ActiveListItem>
//                 <ActiveListItem
//                   button
//                   sx={{ pl: 6 }}
//                   onClick={() => handleNavigation("/hrms/admindashboard/taxDeductionReport")}
//                   selected={isActive("/hrms/admindashboard/taxDeductionReport")}
//                   hasactivechild={false}
//                 >
//                   <ListItemText primary="Tax Deduction Report" />
//                 </ActiveListItem>
//                 <ActiveListItem
//                   button
//                   sx={{ pl: 6 }}
//                   onClick={() => handleNavigation("/hrms/admindashboard/bonusPaymentReport")}
//                   selected={isActive("/hrms/admindashboard/bonusPaymentReport")}
//                   hasactivechild={false}
//                 >
//                   <ListItemText primary="Bonus Payment Report" />
//                 </ActiveListItem>
//                 <ActiveListItem
//                   button
//                   sx={{ pl: 6 }}
//                   onClick={() => handleNavigation("/hrms/admindashboard/loanDeductionReport")}
//                   selected={isActive("/hrms/admindashboard/loanDeductionReport")}
//                   hasactivechild={false}
//                 >
//                   <ListItemText primary="Loan Deduction Report" />
//                 </ActiveListItem>
//               </List>
//             </Collapse>

//             {/* Confirmation Reports */}
//             <ActiveListItem
//               button
//               sx={{ pl: 4 }}
//               onClick={handleConfirmationReportClick}
//               selected={false}
//               hasactivechild={hasActiveChild(confirmationReportRoutes)}
//             >
//               <ListItemIcon>
//                 <PersonAddIcon />
//               </ListItemIcon>
//               <ListItemText primary="Confirmation Reports" />
//               {confirmationReportOpen ? <ExpandLess /> : <ExpandMore />}
//             </ActiveListItem>
//             <Collapse in={confirmationReportOpen} timeout="auto" unmountOnExit>
//               <List component="div" disablePadding>
//                 <ActiveListItem
//                   button
//                   sx={{ pl: 6 }}
//                   onClick={() => handleNavigation("/hrms/admindashboard/confirmationStatusReport")}
//                   selected={isActive("/hrms/admindashboard/confirmationStatusReport")}
//                   hasactivechild={false}
//                 >
//                   <ListItemText primary="Confirmation Status Report" />
//                 </ActiveListItem>
//                 <ActiveListItem
//                   button
//                   sx={{ pl: 6 }}
//                   onClick={() => handleNavigation("/hrms/admindashboard/employeePerformanceReport")}
//                   selected={isActive("/hrms/admindashboard/employeePerformanceReport")}
//                   hasactivechild={false}
//                 >
//                   <ListItemText primary="Employee Performance Report" />
//                 </ActiveListItem>
//                 <ActiveListItem
//                   button
//                   sx={{ pl: 6 }}
//                   onClick={() => handleNavigation("/hrms/admindashboard/confirmationProcessReport")}
//                   selected={isActive("/hrms/admindashboard/confirmationProcessReport")}
//                   hasactivechild={false}
//                 >
//                   <ListItemText primary="Confirmation Process Report" />
//                 </ActiveListItem>
//               </List>
//             </Collapse>
//           </List>
//         </Collapse>

//         {/* Resignation */}
//         <ActiveListItem
//           button
//           onClick={() => handleNavigation("/hrms/admindashboard/resignpaneladmin")}
//           selected={isActive("/hrms/admindashboard/resignpaneladmin")}
//           hasactivechild={false}
//         >
//           <ListItemIcon>
//             <PersonRemoveIcon />
//           </ListItemIcon>
//           <ListItemText primary="Resignation" />
//         </ActiveListItem>

//         {/* HelpDesk */}
//         <ActiveListItem
//           button
//           onClick={() => handleNavigation("/hrms/admindashboard/helpdesk")}
//           selected={isActive("/hrms/admindashboard/helpdesk")}
//           hasactivechild={false}
//         >
//           <ListItemIcon>
//             <HelpIcon />
//           </ListItemIcon>
//           <ListItemText primary="HelpDesk" />
//         </ActiveListItem>
//       </List>
//     </Drawer>
//   );
// }   





// import React, { useState, useMemo } from "react";
// import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
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
//   styled,
//   useMediaQuery,
//   useTheme,
  
// } from "@mui/material";
// import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
// import HomeIcon from "@mui/icons-material/Home";
// import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
// import GroupIcon from "@mui/icons-material/Group";
// import WorkIcon from "@mui/icons-material/Work";
// import ExpandLess from "@mui/icons-material/ExpandLess";
// import ExpandMore from "@mui/icons-material/ExpandMore";
// import HelpIcon from "@mui/icons-material/Help";
// import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
// import { useNavigate, useLocation } from "react-router-dom";
// import AddBoxIcon from "@mui/icons-material/AddBox";
// import PersonAddIcon from "@mui/icons-material/PersonAdd";
// import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
// import DashboardIcon from '@mui/icons-material/Dashboard';
// import PolicyIcon from '@mui/icons-material/Policy';
// import SummarizeIcon from '@mui/icons-material/Summarize';
// import LogoutIcon from "@mui/icons-material/Logout";


// // Styled component for active list items
// // CHANGED: Active items now have a solid orange background with white text/icons for a more professional look.
// const ActiveListItem = styled(ListItem)(({ theme, selected, hasactivechild }) => ({
//   // If active, background is solid orange. Otherwise, transparent.
//   backgroundColor: selected || hasactivechild ? '#F4511E' : 'transparent',
//   // If active, text color is white for contrast.
//   color: selected || hasactivechild ? '#ffffff' : 'inherit',

//   // Hover effects
//   '&:hover': {
//     // A slightly darker orange for active items, and light gray for inactive ones.
//     backgroundColor: selected || hasactivechild ? '#e64a19' : '#f5f5f5',
//   },

//   // Icon color logic
//   '& .MuiListItemIcon-root': {
//     // If active, icon is white. Otherwise, it's the standard gray.
//     color: selected || hasactivechild ? '#ffffff' : '#757575',
//   },
//   margin: '2px 8px',
//   borderRadius: '4px',
//   padding: '8px 12px',
//   transition: 'all 0.2s ease',
// }));


// export default function Sidebar({ open, toggleDrawer, drawerWidth }) {
//   // Single state to manage which top-level menu is open
//   const [openMenu, setOpenMenu] = useState(null);

//   // State for nested dropdowns within Reports
//   const [attendanceReportOpen, setAttendanceReportOpen] = useState(false);
//   const [leaveReportOpen, setLeaveReportOpen] = useState(false);
//   const [payrollReportOpen, setPayrollReportOpen] = useState(false);
//   const [confirmationReportOpen, setConfirmationReportOpen] = useState(false);

//   const navigate = useNavigate();
//   const location = useLocation();

//   const theme = useTheme();
//   // Check if the screen size is strictly 'xs' (extra-small, mobile)
//   // This means it will be true for screens < 600px (theme.breakpoints.values.sm)
//   const isMobileOnly = useMediaQuery(theme.breakpoints.down('sm')); // <--- CHANGE IS HERE

//   // Check if any child route is active for dropdown headers
//   const hasActiveChild = (routes) => {
//     return routes.some(route => location.pathname === route);
//   };

//   // Employee routes
//   const employeeRoutes = useMemo(() => [
//     "/hrms/admindashboard/employeesMain",
//     "/hrms/admindashboard/employees",
//     "/hrms/admindashboard/shifts",
//     "/hrms/admindashboard/employeeexits"
//   ], []);

//   // Core HR routes
//   const coreHRRoutes = useMemo(() => [
//     "/hrms/admindashboard/corehrdashboard",
//     "/hrms/admindashboard/companydetails",
//     "/hrms/admindashboard/role",
//     "/hrms/admindashboard/employeehub",
//     "/hrms/admindashboard/department",
//     "/hrms/admindashboard/designation",
//     "/hrms/admindashboard/division",
//     "/hrms/admindashboard/grade",
//     "/hrms/admindashboard/payrollSetup",
//     "/hrms/admindashboard/headquaters",
//     "/hrms/admindashboard/makeannouncement"
//   ], []);

//   // Policy Management routes
//   const policyRoutes = useMemo(() => [
//     "/hrms/admindashboard/policies",
//     "/hrms/admindashboard/policyDashboard",
//     "/hrms/admindashboard/policyallocation"
//   ], []);

//   // Attendance routes
//   const attendanceRoutes = useMemo(() => [
//     "/hrms/admindashboard/attendancemain",
//     "/hrms/admindashboard/monthly-report"
//   ], []);

//   // Apps routes
//   const appsRoutes = useMemo(() => [
//     "/hrms/admindashboard/eventadmin",
//     "/hrms/admindashboard/assestadmin",
//     "/hrms/admindashboard/awardsadmin",
//     "/hrms/admindashboard/visitorbook",
//     "/hrms/admindashboard/holidaysadmin"
//   ], []);

//   // Confirmation routes
//   const confirmationRoutes = useMemo(() => [
//     "/hrms/admindashboard/parametercreation",
//     "/hrms/admindashboard/employeeconfirmationMain",
//     "/hrms/admindashboard/performanceTable",
//     "/hrms/admindashboard/dashboardConfirmation"
//   ], []);

//   // Payroll routes
//   const payrollRoutes = useMemo(() => [
//     "/hrms/admindashboard/DashboardPayroll",
//     "/hrms/admindashboard/PayrollSetupManagement"
//   ], []);

//   // Leave Management routes
//   const leaveRoutes = useMemo(() => [
//     "/hrms/admindashboard/leaverequest",
//     "/hrms/admindashboard/mainLeave",
//     "/hrms/admindashboard/leaveSetup"
//   ], []);

//   // Attendance Report routes
//   const attendanceReportRoutes = useMemo(() => [
//     "/hrms/admindashboard/DailyAttendanceReport",
//     "/hrms/admindashboard/MonthlyAttendanceReprt",
//     "/hrms/admindashboard/MonthlyPunchINOUT"
//   ], []);

//   // Leave Report routes
//   const leaveReportRoutes = useMemo(() => [
//     "/hrms/admindashboard/AllEmpLeaveReports",
//     "/hrms/admindashboard/annualLeaveReport",
//     "/hrms/admindashboard/departmentWiseLeaveReport",
//     "/hrms/admindashboard/employeeAnnualLeaveReport",
//     "/hrms/admindashboard/employeePendingLeaveReport",
//     "/hrms/admindashboard/monthlyleaveReport",
//     "/hrms/admindashboard/LeaveBalanceReport"
//   ], []);

//   // Payroll Report routes
//   const payrollReportRoutes = useMemo(() => [
//     "/hrms/admindashboard/payrollSummaryReport",
//     "/hrms/admindashboard/taxDeductionReport",
//     "/hrms/admindashboard/bonusPaymentReport",
//     "/hrms/admindashboard/loanDeductionReport"
//   ], []);

//   // Confirmation Report routes
//   const confirmationReportRoutes = useMemo(() => [
//     "/hrms/admindashboard/confirmationStatusReport",
//     "/hrms/admindashboard/employeePerformanceReport",
//     "/hrms/admindashboard/confirmationProcessReport"
//   ], []);

//   // Reports routes (all report categories)
//   const reportsRoutes = useMemo(() => [
//     ...attendanceReportRoutes,
//     ...leaveReportRoutes,
//     ...payrollReportRoutes,
//     ...confirmationReportRoutes,
//     "/hrms/admindashboard/NewJoinerReport",
//     "/hrms/admindashboard/annualManpowerReport",
//     "/hrms/admindashboard/employeeAttritionReport",
//     // START: Added new report routes
//     "/hrms/admindashboard/hrMasterDataReport",
//     "/hrms/admindashboard/employeeConfirmationReport",
//     "/hrms/admindashboard/employeeLeavePatternReport",
//     "/hrms/admindashboard/employeePipReport",
//     "/hrms/admindashboard/employeeExitReport",
//     "/hrms/admindashboard/AnnualManpowerReport",
//     "/hrms/admindashboard/EmployeeAttritionReport",
//     "/hrms/admindashboard/PerformanceManagementReport",
//     "/hrms/admindashboard/AnnualAppraisalReport",
//     "/hrms/admindashboard/PromotionReport",
//     "/hrms/admindashboard/GratuityEligibilityReport",
//     "/hrms/admindashboard/PFReport",
//     "/hrms/admindashboard/SalaryReport",
//     "/hrms/admindashboard/EmpPayrollSalaryReport",
//     "/hrms/admindashboard/EmpPayrollSalaryReport",
//     "/hrms/admindashboard/PTReport",
//     "/hrms/admindashboard/EmpMasterDataReport",
//     "/hrms/admindashboard/Recruitmenttracker",











//     // END: Added new report routes
//   ], [attendanceReportRoutes, leaveReportRoutes, payrollReportRoutes, confirmationReportRoutes]);

//   // Unified handler for all top-level menus
//   const handleMenuClick = (menuName) => {
//     setOpenMenu(prevOpenMenu => (prevOpenMenu === menuName ? null : menuName));
//   };

//   const handleAttendanceReportClick = () => {
//     setAttendanceReportOpen(!attendanceReportOpen);
//   };

//   const handleLeaveReportClick = () => {
//     setLeaveReportOpen(!leaveReportOpen);
//   };

//   const handlePayrollReportClick = () => {
//     setPayrollReportOpen(!payrollReportOpen);
//   };

//   const handleConfirmationReportClick = () => {
//     setConfirmationReportOpen(!confirmationReportOpen);
//   };

//   const handleNavigation = (route) => {
//     navigate(route);
//   };

//   const isActive = (route) => location.pathname === route;

//   return (
//  <Drawer
//       sx={{
//         width: drawerWidth,
//         flexShrink: 0, // Keep flexShrink 0 to ensure persistent drawer takes space
//         "& .MuiDrawer-paper": {
//           width: drawerWidth,
//           boxSizing: "border-box",
//           cursor: "pointer",
//           backgroundColor: '#fafafa',
//           // Ensure it overlays content ONLY on mobile (xs breakpoint)
//           ...(isMobileOnly && {
//             zIndex: (theme) => theme.zIndex.drawer + 2,
//             position: 'absolute', // Important for overlapping correctly in a temporary variant
//           }),
//         },
//       }}
//       // If it's mobile (isMobileOnly is true), use "temporary" variant.
//       // Otherwise (tablet/desktop), use "persistent".
//       variant={isMobileOnly ? "temporary" : "persistent"} // <--- USE isMobileOnly
//       anchor="left"
//       open={open}
//       // ModalProps are only relevant for "temporary" variant on mobile
//       ModalProps={isMobileOnly ? { // <--- USE isMobileOnly
//         keepMounted: true,
//         onBackdropClick: toggleDrawer,
//       } : {}} // Empty object for tablet/desktop
//     >
//       <Box
//         sx={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "flex-end",
//           p: 1,
//           minHeight: 64,
//           backgroundColor: 'primary.main',
//           color: 'primary.contrastText',
//         }}
//       >
//         <IconButton onClick={toggleDrawer} sx={{ color: 'inherit' }}>
//           <ChevronLeftIcon />
//         </IconButton>
//       </Box>
//       <Divider />
//       <List sx={{ p: 1 }}>
//         {/* Home Item */}
//         <ActiveListItem
//           button
//           onClick={() => handleNavigation("/hrms/admindashboard/home")}
//           selected={isActive("/hrms/admindashboard/home")}
//           hasactivechild={false}
//         >
//           <ListItemIcon>
//             <HomeIcon />
//           </ListItemIcon>
//           <ListItemText primary="Home" />
//         </ActiveListItem>

//         {/* Employees Item */}
//         <ActiveListItem
//           button
//           onClick={() => handleMenuClick('employees')}
//           selected={false}
//           hasactivechild={hasActiveChild(employeeRoutes)}
//         >
//           <ListItemIcon>
//             <GroupIcon />
//           </ListItemIcon>
//           <ListItemText primary="Employees" />
//           {openMenu === 'employees' ? <ExpandLess /> : <ExpandMore />}
//         </ActiveListItem>
//         <Collapse in={openMenu === 'employees'} timeout="auto" unmountOnExit>
//           <List component="div" disablePadding>
//             <ActiveListItem
//               button
//               sx={{ pl: 4 }}
//               onClick={() => handleNavigation("/hrms/admindashboard/employeesMain")}
//               selected={isActive("/hrms/admindashboard/employeesMain")}
//               hasactivechild={false}
//             >
//               <ListItemText primary="Dashboard" />
//             </ActiveListItem>
//             <ActiveListItem
//               button
//               sx={{ pl: 4 }}
//               onClick={() => handleNavigation("/hrms/admindashboard/employees")}
//               selected={isActive("/hrms/admindashboard/employees")}
//               hasactivechild={false}
//             >
//               <ListItemText primary="Employees List" />
//             </ActiveListItem>
//             <ActiveListItem
//               button
//               sx={{ pl: 4 }}
//               onClick={() => handleNavigation("/hrms/admindashboard/shifts")}
//               selected={isActive("/hrms/admindashboard/shifts")}
//               hasactivechild={false}
//             >
//               <ListItemText primary="Shifts & Scheduling" />
//             </ActiveListItem>
//             <ActiveListItem
//               button
//               sx={{ pl: 4 }}
//               onClick={() => handleNavigation("/hrms/admindashboard/employeeexits")}
//               selected={isActive("/hrms/admindashboard/employeeexits")}
//               hasactivechild={false}
//             >
//               <ListItemText primary="Employees Exit" />
//             </ActiveListItem>
//           </List>
//         </Collapse>

//         {/* Core HR Dropdown */}
//         <ActiveListItem
//           button
//           onClick={() => handleMenuClick('coreHR')}
//           selected={false}
//           hasactivechild={hasActiveChild(coreHRRoutes)}
//         >
//           <ListItemIcon>
//             <WorkIcon />
//           </ListItemIcon>
//           <ListItemText primary="Core HR" />
//           {openMenu === 'coreHR' ? <ExpandLess /> : <ExpandMore />}
//         </ActiveListItem>
//         <Collapse in={openMenu === 'coreHR'} timeout="auto" unmountOnExit>
//           <List component="div" disablePadding>
//             <ActiveListItem
//               button
//               sx={{ pl: 4 }}
//               onClick={() => handleNavigation("/hrms/admindashboard/corehrdashboard")}
//               selected={isActive("/hrms/admindashboard/corehrdashboard")}
//               hasactivechild={false}
//             >
//               <ListItemText primary="Dashboard" />
//             </ActiveListItem>


//             <ActiveListItem
//               button
//               sx={{ pl: 4 }}
//               onClick={() => handleNavigation("/hrms/admindashboard/role")}
//               selected={isActive("/hrms/admindashboard/role")}
//               hasactivechild={false}
//             >
//               <ListItemText primary="Create Role" />
//             </ActiveListItem>

//             <ActiveListItem
//               button
//               sx={{ pl: 4 }}
//               onClick={() => handleNavigation("/hrms/admindashboard/companydetails")}
//               selected={isActive("/hrms/admindashboard/companydetails")}
//               hasactivechild={false}
//             >
//               <ListItemText primary="Company Details" />
//             </ActiveListItem>



//             <ActiveListItem
//               button
//               sx={{ pl: 4 }}
//               onClick={() => handleNavigation("/hrms/admindashboard/employeehub")}
//               selected={isActive("/hrms/admindashboard/employeehub")}
//               hasactivechild={false}
//             >
//               <ListItemText primary="Employee Hub" />
//             </ActiveListItem>



//             <ActiveListItem
//               button
//               sx={{ pl: 4 }}
//               onClick={() => handleNavigation("/hrms/admindashboard/department")}
//               selected={isActive("/hrms/admindashboard/department")}
//               hasactivechild={false}
//             >
//               <ListItemText primary="Department" />
//             </ActiveListItem>
//             <ActiveListItem
//               button
//               sx={{ pl: 4 }}
//               onClick={() => handleNavigation("/hrms/admindashboard/designation")}
//               selected={isActive("/hrms/admindashboard/designation")}
//               hasactivechild={false}
//             >
//               <ListItemText primary="Designation" />
//             </ActiveListItem>
//             <ActiveListItem
//               button
//               sx={{ pl: 4 }}
//               onClick={() => handleNavigation("/hrms/admindashboard/division")}
//               selected={isActive("/hrms/admindashboard/division")}
//               hasactivechild={false}
//             >
//               <ListItemText primary="Division" />
//             </ActiveListItem>
//             <ActiveListItem
//               button
//               sx={{ pl: 4 }}
//               onClick={() => handleNavigation("/hrms/admindashboard/grade")}
//               selected={isActive("/hrms/admindashboard/grade")}
//               hasactivechild={false}
//             >
//               <ListItemText primary="Grade" />
//             </ActiveListItem>
//             <ActiveListItem
//               button
//               sx={{ pl: 4 }}
//               onClick={() => handleNavigation("/hrms/admindashboard/payrollSetup")}
//               selected={isActive("/hrms/admindashboard/payrollSetup")}
//               hasactivechild={false}
//             >
//               <ListItemText primary="Pay Roll Set Up" />
//             </ActiveListItem>
//             <ActiveListItem
//               button
//               sx={{ pl: 4 }}
//               onClick={() => handleNavigation("/hrms/admindashboard/headquaters")}
//               selected={isActive("/hrms/admindashboard/headquaters")}
//               hasactivechild={false}
//             >
//               <ListItemText primary="Headquaters" />
//             </ActiveListItem>
//             <ActiveListItem
//               button
//               sx={{ pl: 4 }}
//               onClick={() => handleNavigation("/hrms/admindashboard/makeannouncement")}
//               selected={isActive("/hrms/admindashboard/makeannouncement")}
//               hasactivechild={false}
//             >
//               <ListItemText primary="Make Announcement" />
//             </ActiveListItem>
//           </List>
//         </Collapse>

//         {/* Policy Management */}
//         <ActiveListItem
//           button
//           onClick={() => handleMenuClick('policyManagement')}
//           selected={false}
//           hasactivechild={hasActiveChild(policyRoutes)}
//         >
//           <ListItemIcon>
//             <PolicyIcon />
//           </ListItemIcon>
//           <ListItemText primary="Policy Management" />
//           {openMenu === 'policyManagement' ? <ExpandLess /> : <ExpandMore />}
//         </ActiveListItem>
//         <Collapse in={openMenu === 'policyManagement'} timeout="auto" unmountOnExit>
//           <List component="div" disablePadding>
//             <ActiveListItem
//               button
//               sx={{ pl: 4 }}
//               onClick={() => handleNavigation("/hrms/admindashboard/policies")}
//               selected={isActive("/hrms/admindashboard/policies")}
//               hasactivechild={false}
//             >
//               <ListItemText primary="Policies" />
//             </ActiveListItem>
//             <ActiveListItem
//               button
//               sx={{ pl: 4 }}
//               onClick={() => handleNavigation("/hrms/admindashboard/policyDashboard")}
//               selected={isActive("/hrms/admindashboard/policyDashboard")}
//               hasactivechild={false}
//             >
//               <ListItemText primary="Policy Dashboard" />
//             </ActiveListItem>
//             <ActiveListItem
//               button
//               sx={{ pl: 4 }}
//               onClick={() => handleNavigation("/hrms/admindashboard/policyallocation")}
//               selected={isActive("/hrms/admindashboard/policyallocation")}
//               hasactivechild={false}
//             >
//               <ListItemText primary="Policy Allocation" />
//             </ActiveListItem>
//           </List>
//         </Collapse>

//         {/* Attendance Dropdown */}
//         <ActiveListItem
//           button
//           onClick={() => handleMenuClick('attendance')}
//           selected={false}
//           hasactivechild={hasActiveChild(attendanceRoutes)}
//         >
//           <ListItemIcon>
//             <CalendarTodayIcon />
//           </ListItemIcon>
//           <ListItemText primary="Attendance" />
//           {openMenu === 'attendance' ? <ExpandLess /> : <ExpandMore />}
//         </ActiveListItem>
//         <Collapse in={openMenu === 'attendance'} timeout="auto" unmountOnExit>
//           <List component="div" disablePadding>
//             <ActiveListItem
//               button
//               sx={{ pl: 4 }}
//               onClick={() => handleNavigation("/hrms/admindashboard/attendancemain")}
//               selected={isActive("/hrms/admindashboard/attendancemain")}
//               hasactivechild={false}
//             >
//               <ListItemText primary="Daily Attendance" />
//             </ActiveListItem>
//             <ActiveListItem
//               button
//               sx={{ pl: 4 }}
//               onClick={() => handleNavigation("/hrms/admindashboard/monthly-report")}
//               selected={isActive("/hrms/admindashboard/monthly-report")}
//               hasactivechild={false}
//             >
//               <ListItemText primary="Monthly Report" />
//             </ActiveListItem>
//           </List>
//         </Collapse>

//         {/* Apps */}
//         <ActiveListItem
//           button
//           onClick={() => handleMenuClick('apps')}
//           selected={false}
//           hasactivechild={hasActiveChild(appsRoutes)}
//         >
//           <ListItemIcon>
//             <DashboardIcon />
//           </ListItemIcon>
//           <ListItemText primary="Apps" />
//           {openMenu === 'apps' ? <ExpandLess /> : <ExpandMore />}
//         </ActiveListItem>
//         <Collapse in={openMenu === 'apps'} timeout="auto" unmountOnExit>
//           <List component="div" disablePadding>
//             <ActiveListItem
//               button
//               sx={{ pl: 4 }}
//               onClick={() => handleNavigation("/hrms/admindashboard/eventadmin")}
//               selected={isActive("/hrms/admindashboard/eventadmin")}
//               hasactivechild={false}
//             >
//               <ListItemText primary="Events" />
//             </ActiveListItem>
//             <ActiveListItem
//               button
//               sx={{ pl: 4 }}
//               onClick={() => handleNavigation("/hrms/admindashboard/assestadmin")}
//               selected={isActive("/hrms/admindashboard/assestadmin")}
//               hasactivechild={false}
//             >
//               <ListItemText primary="Assets" />
//             </ActiveListItem>
//             <ActiveListItem
//               button
//               sx={{ pl: 4 }}
//               onClick={() => handleNavigation("/hrms/admindashboard/awardsadmin")}
//               selected={isActive("/hrms/admindashboard/awardsadmin")}
//               hasactivechild={false}
//             >
//               <ListItemText primary="Awards" />
//             </ActiveListItem>
//             <ActiveListItem
//               button
//               sx={{ pl: 4 }}
//               onClick={() => handleNavigation("/hrms/admindashboard/visitorbook")}
//               selected={isActive("/hrms/admindashboard/visitorbook")}
//               hasactivechild={false}
//             >
//               <ListItemText primary="Visitor Book" />
//             </ActiveListItem>
//             <ActiveListItem
//               button
//               sx={{ pl: 4 }}
//               onClick={() => handleNavigation("/hrms/admindashboard/holidaysadmin")}
//               selected={isActive("/hrms/admindashboard/holidaysadmin")}
//               hasactivechild={false}
//             >
//               <ListItemText primary="Holidays" />
//             </ActiveListItem>
//           </List>
//         </Collapse>

//         {/* Employee Confirmation */}
//         <ActiveListItem
//           button
//           onClick={() => handleMenuClick('confirmation')}
//           selected={false}
//           hasactivechild={hasActiveChild(confirmationRoutes)}
//         >
//           <ListItemIcon>
//             <PersonAddIcon />
//           </ListItemIcon>
//           <ListItemText primary="Employee Confirmation" />
//           {openMenu === 'confirmation' ? <ExpandLess /> : <ExpandMore />}
//         </ActiveListItem>
//         <Collapse in={openMenu === 'confirmation'} timeout="auto" unmountOnExit>
//           <List component="div" disablePadding>
//             <ActiveListItem
//               button
//               sx={{ pl: 4 }}
//               onClick={() => handleNavigation("/hrms/admindashboard/parametercreation")}
//               selected={isActive("/hrms/admindashboard/parametercreation")}
//               hasactivechild={false}
//             >
//               <ListItemText primary="Parameter Creation" />
//             </ActiveListItem>
//             <ActiveListItem
//               button
//               sx={{ pl: 4 }}
//               onClick={() => handleNavigation("/hrms/admindashboard/employeeconfirmationMain")}
//               selected={isActive("/hrms/admindashboard/employeeconfirmationMain")}
//               hasactivechild={false}
//             >
//               <ListItemText primary="Confirmation Form" />
//             </ActiveListItem>
//             <ActiveListItem
//               button
//               sx={{ pl: 4 }}
//               onClick={() => handleNavigation("/hrms/admindashboard/performanceTable")}
//               selected={isActive("/hrms/admindashboard/performanceTable")}
//               hasactivechild={false}
//             >
//               <ListItemText primary="Performance Table" />
//             </ActiveListItem>
//             <ActiveListItem
//               button
//               sx={{ pl: 4 }}
//               onClick={() => handleNavigation("/hrms/admindashboard/dashboardConfirmation")}
//               selected={isActive("/hrms/admindashboard/dashboardConfirmation")}
//               hasactivechild={false}
//             >
//               <ListItemText primary="Dashboard Confirmation" />
//             </ActiveListItem>
//           </List>
//         </Collapse>

//         {/* Payroll Dropdown */}
//         <ActiveListItem
//           button
//           onClick={() => handleMenuClick('payroll')}
//           selected={false}
//           hasactivechild={hasActiveChild(payrollRoutes)}
//         >
//           <ListItemIcon>
//             <AccountBalanceWalletIcon />
//           </ListItemIcon>
//           <ListItemText primary="Payroll" />
//           {openMenu === 'payroll' ? <ExpandLess /> : <ExpandMore />}
//         </ActiveListItem>
//         <Collapse in={openMenu === 'payroll'} timeout="auto" unmountOnExit>
//           <List component="div" disablePadding>
//             <ActiveListItem
//               button
//               sx={{ pl: 4 }}
//               onClick={() => handleNavigation("/hrms/admindashboard/DashboardPayroll")}
//               selected={isActive("/hrms/admindashboard/DashboardPayroll")}
//               hasactivechild={false}
//             >
//               <ListItemText primary="Dashboard" />
//             </ActiveListItem>
//             <ActiveListItem
//               button
//               sx={{ pl: 4 }}
//               onClick={() => handleNavigation("/hrms/admindashboard/PayrollSetupManagement")}
//               selected={isActive("/hrms/admindashboard/PayrollSetupManagement")}
//               hasactivechild={false}
//             >
//               <ListItemText primary="Payroll Setup Configuration" />
//             </ActiveListItem>

//             <ActiveListItem button sx={{ pl: 4 }}
//               hasactivechild={false}
//               selected={isActive("/hrms/admindashboard/payrollReport")}
//               onClick={() => handleNavigation("/hrms/admindashboard/payrollReport")}>
//               <ListItemText primary="Payroll Reports" />
//             </ActiveListItem>
//           </List>
//         </Collapse>

//         {/* Leave Management */}
//         <ActiveListItem
//           button
//           onClick={() => handleMenuClick('leaveManagement')}
//           selected={false}
//           hasactivechild={hasActiveChild(leaveRoutes)}
//         >
//           <ListItemIcon>
//             <AddBoxIcon />
//           </ListItemIcon>
//           <ListItemText primary="Leave Management" />
//           {openMenu === 'leaveManagement' ? <ExpandLess /> : <ExpandMore />}
//         </ActiveListItem>
//         <Collapse in={openMenu === 'leaveManagement'} timeout="auto" unmountOnExit>
//           <List component="div" disablePadding>
//             <ActiveListItem
//               button
//               sx={{ pl: 4 }}
//               onClick={() => handleNavigation("/hrms/admindashboard/leaverequest")}
//               selected={isActive("/hrms/admindashboard/leaverequest")}
//               hasactivechild={false}
//             >
//               <ListItemText primary="Leave Request" />
//             </ActiveListItem>
//             <ActiveListItem
//               button
//               sx={{ pl: 4 }}
//               onClick={() => handleNavigation("/hrms/admindashboard/mainLeave")}
//               selected={isActive("/hrms/admindashboard/mainLeave")}
//               hasactivechild={false}
//             >
//               <ListItemText primary="Dashboard" />
//             </ActiveListItem>
//             <ActiveListItem
//               button
//               sx={{ pl: 4 }}
//               onClick={() => handleNavigation("/hrms/admindashboard/leaveSetup")}
//               selected={isActive("/hrms/admindashboard/leaveSetup")}
//               hasactivechild={false}
//             >
//               <ListItemText primary="Leave Set Up" />
//             </ActiveListItem>
//           </List>
//         </Collapse>


//         <ActiveListItem
//           button
//           onClick={() => handleNavigation("/hrms/admindashboard/MetricsFromAdmin")}
//           selected={isActive("/hrms/admindashboard/MetricsFromAdmin")}
//           hasactivechild={false}
//         >
//           <ListItemIcon>
//             <HelpIcon />
//           </ListItemIcon>
//           <ListItemText primary="Metrics Form " />
//         </ActiveListItem>


//         <ActiveListItem
//           button
//           onClick={() => handleNavigation("/hrms/admindashboard/ExitandTerminationAd")}
//           selected={isActive("/hrms/admindashboard/ExitandTerminationAd")}
//           hasactivechild={false}
//         >
//           <ListItemIcon>
//            <LogoutIcon />
//           </ListItemIcon>
//           <ListItemText primary="Exit & Termination " />
//         </ActiveListItem>

//         {/* Reports Dropdown */}
//         <ActiveListItem
//           button
//           onClick={() => handleMenuClick('reports')}
//           selected={false}
//           hasactivechild={hasActiveChild(reportsRoutes)}
//         >
//           <ListItemIcon>
//             <SummarizeIcon />
//           </ListItemIcon>
//           <ListItemText primary="Reports" />
//           {openMenu === 'reports' ? <ExpandLess /> : <ExpandMore />}
//         </ActiveListItem>
//         <Collapse in={openMenu === 'reports'} timeout="auto" unmountOnExit>
//           <List component="div" disablePadding>

//             {/* New Joiner Report */}
//             <ActiveListItem
//               button
//               sx={{ pl: 4 }}
//               onClick={() => handleNavigation("/hrms/admindashboard/NewJoinerReport")}
//               selected={isActive("/hrms/admindashboard/NewJoinerReport")}
//               hasactivechild={false}
//             >
//               <ListItemIcon>
//                 <InsertDriveFileIcon />
//               </ListItemIcon>
//               <ListItemText primary="New Joiner Report" />
//             </ActiveListItem>

//             {/* Annual Manpower Report */}
//             <ActiveListItem
//               button
//               sx={{ pl: 4 }}
//               onClick={() => handleNavigation("/hrms/admindashboard/annualManpowerReport")}
//               selected={isActive("/hrms/admindashboard/annualManpowerReport")}
//               hasactivechild={false}
//             >
//               <ListItemIcon>
//                 <InsertDriveFileIcon />
//               </ListItemIcon>
//               <ListItemText primary="Annual Manpower Report" />
//             </ActiveListItem>

//             {/* Employee Attrition Report */}
//             <ActiveListItem
//               button
//               sx={{ pl: 4 }}
//               onClick={() => handleNavigation("/hrms/admindashboard/employeeAttritionReport")}
//               selected={isActive("/hrms/admindashboard/employeeAttritionReport")}
//               hasactivechild={false}
//             >
//               <ListItemIcon>
//                 <InsertDriveFileIcon />
//               </ListItemIcon>
//               <ListItemText primary="Employee Attrition Rate Report" />
//             </ActiveListItem>

//             {/* START: Added new report menu items */}
//             {/* HR Master Data Report */}
//             <ActiveListItem
//               button
//               sx={{ pl: 4 }}
//               onClick={() => handleNavigation("/hrms/admindashboard/hrMasterDataReport")}
//               selected={isActive("/hrms/admindashboard/hrMasterDataReport")}
//               hasactivechild={false}
//             >
//               <ListItemIcon>
//                 <InsertDriveFileIcon />
//               </ListItemIcon>
//               <ListItemText primary="HR Master Data Report" />
//             </ActiveListItem>





//             <ActiveListItem
//               button
//               sx={{ pl: 4 }}
//               onClick={() => handleNavigation("/hrms/admindashboard/Recruitmenttracker")}
//               selected={isActive("/hrms/admindashboard/Recruitmenttracker")}
//               hasactivechild={false}
//             >
//               <ListItemIcon>
//                 <InsertDriveFileIcon />
//               </ListItemIcon>
//               <ListItemText primary="Recruitment Tracker Report" />
//             </ActiveListItem>


//             {/* Employee Confirmation Report */}
//             <ActiveListItem
//               button
//               sx={{ pl: 4 }}
//               onClick={() => handleNavigation("/hrms/admindashboard/employeeConfirmationReport")}
//               selected={isActive("/hrms/admindashboard/employeeConfirmationReport")}
//               hasactivechild={false}
//             >
//               <ListItemIcon>
//                 <InsertDriveFileIcon />
//               </ListItemIcon>
//               <ListItemText primary="Employee Confirmation Report" />
//             </ActiveListItem>



//             {/* Employee PIP Report */}
//             <ActiveListItem
//               button
//               sx={{ pl: 4 }}
//               onClick={() => handleNavigation("/hrms/admindashboard/employeePipReport")}
//               selected={isActive("/hrms/admindashboard/employeePipReport")}
//               hasactivechild={false}
//             >
//               <ListItemIcon>
//                 <InsertDriveFileIcon />
//               </ListItemIcon>
//               <ListItemText primary="Employee PIP Report" />
//             </ActiveListItem>


//             {/* Employee Exit Report */}
//             <ActiveListItem
//               button
//               sx={{ pl: 6 }}
//               onClick={() => handleNavigation("/hrms/admindashboard/employeeExitReport")}
//               selected={isActive("/hrms/admindashboard/employeeExitReport")}
//               hasactivechild={false}
//             >
//               <ListItemIcon>
//                 <InsertDriveFileIcon />
//               </ListItemIcon>
//               <ListItemText primary="Employee Exit Report" />
//             </ActiveListItem>




//             {/* Performance management report */}
//             <ActiveListItem
//               button
//               sx={{ pl: 6 }}
//               onClick={() => handleNavigation("/hrms/admindashboard/PerformanceManagementReport")}
//               selected={isActive("/hrms/admindashboard/PerformanceManagementReport")}
//               hasactivechild={false}
//             >
//               <ListItemIcon>
//                 <InsertDriveFileIcon />
//               </ListItemIcon>
//               <ListItemText primary="Performance Management Report" />
//             </ActiveListItem>
//             {/* END: Added new report menu items */}

//             {/* Annual Appraisal Report */}
//             <ActiveListItem
//               button
//               sx={{ pl: 6 }}
//               onClick={() => handleNavigation("/hrms/admindashboard/AnnualAppraisalReport")}
//               selected={isActive("/hrms/admindashboard/AnnualAppraisalReport")}
//               hasactivechild={false}
//             >
//               <ListItemIcon>
//                 <InsertDriveFileIcon />
//               </ListItemIcon>
//               <ListItemText primary="Annual Appraisal Report" />
//             </ActiveListItem>


//             <ActiveListItem
//               button
//               sx={{ pl: 6 }}
//               onClick={() => handleNavigation("/hrms/admindashboard/PromotionReport")}
//               selected={isActive("/hrms/admindashboard/PromotionReport")}
//               hasactivechild={false}
//             >
//               <ListItemIcon>
//                 <InsertDriveFileIcon />
//               </ListItemIcon>
//               <ListItemText primary="Promotion Report" />
//             </ActiveListItem>


//             <ActiveListItem
//               button
//               sx={{ pl: 6 }}
//               onClick={() => handleNavigation("/hrms/admindashboard/GratuityEligibilityReport")}
//               selected={isActive("/hrms/admindashboard/GratuityEligibilityReport")}
//               hasactivechild={false}
//             >
//               <ListItemIcon>
//                 <InsertDriveFileIcon />
//               </ListItemIcon>
//               <ListItemText primary="Gratuity Eligibility Report" />
//             </ActiveListItem>



//             <ActiveListItem
//               button
//               sx={{ pl: 6 }}
//               onClick={() => handleNavigation("/hrms/admindashboard/EmpMasterDataReport")}
//               selected={isActive("/hrms/admindashboard/EmpMasterDataReport")}
//               hasactivechild={false}
//             >
//               <ListItemIcon>
//                 <InsertDriveFileIcon />
//               </ListItemIcon>
//               <ListItemText primary="Employee Master Data Report" />
//             </ActiveListItem>






//             {/* END: Added new report menu items */}




//             {/* Attendance Reports */}
//             <ActiveListItem
//               button
//               sx={{ pl: 4 }}
//               onClick={handleAttendanceReportClick}
//               selected={false}
//               hasactivechild={hasActiveChild(attendanceReportRoutes)}
//             >
//               <ListItemIcon>
//                 <CalendarTodayIcon />
//               </ListItemIcon>
//               <ListItemText primary="Attendance Reports" />
//               {attendanceReportOpen ? <ExpandLess /> : <ExpandMore />}
//             </ActiveListItem>
//             <Collapse in={attendanceReportOpen} timeout="auto" unmountOnExit>
//               <List component="div" disablePadding>
//                 <ActiveListItem
//                   button
//                   sx={{ pl: 6 }}
//                   onClick={() => handleNavigation("/hrms/admindashboard/DailyAttendanceReport")}
//                   selected={isActive("/hrms/admindashboard/DailyAttendanceReport")}
//                   hasactivechild={false}
//                 >
//                   <ListItemIcon>
//                     <InsertDriveFileIcon />
//                   </ListItemIcon>
//                   <ListItemText primary="Daily Attendance Report" />
//                 </ActiveListItem>
//                 <ActiveListItem
//                   button
//                   sx={{ pl: 6 }}
//                   onClick={() => handleNavigation("/hrms/admindashboard/MonthlyAttendanceReprt")}
//                   selected={isActive("/hrms/admindashboard/MonthlyAttendanceReprt")}
//                   hasactivechild={false}
//                 >
//                   <ListItemIcon>
//                     <InsertDriveFileIcon />
//                   </ListItemIcon>
//                   <ListItemText primary="Monthly Attendance Report" />
//                 </ActiveListItem>
//                 <ActiveListItem
//                   button
//                   sx={{ pl: 6 }}
//                   onClick={() => handleNavigation("/hrms/admindashboard/MonthlyPunchINOUT")}
//                   selected={isActive("/hrms/admindashboard/MonthlyPunchINOUT")}
//                   hasactivechild={false}
//                 >
//                   <ListItemIcon>
//                     <InsertDriveFileIcon />
//                   </ListItemIcon>
//                   <ListItemText primary="Monthly Punch IN/OUT" />
//                 </ActiveListItem>
//               </List>
//             </Collapse>

//             {/* Leave Reports */}
//             <ActiveListItem
//               button
//               sx={{ pl: 4 }}
//               onClick={handleLeaveReportClick}
//               selected={false}
//               hasactivechild={hasActiveChild(leaveReportRoutes)}
//             >
//               <ListItemIcon>
//                 <AddBoxIcon />
//               </ListItemIcon>
//               <ListItemText primary="Leave Reports" />
//               {leaveReportOpen ? <ExpandLess /> : <ExpandMore />}
//             </ActiveListItem>
//             <Collapse in={leaveReportOpen} timeout="auto" unmountOnExit>
//               <List component="div" disablePadding>
//                 <ActiveListItem
//                   button
//                   sx={{ pl: 6 }}
//                   onClick={() => handleNavigation("/hrms/admindashboard/AllEmpLeaveReports")}
//                   selected={isActive("/hrms/admindashboard/AllEmpLeaveReports")}
//                   hasactivechild={false}
//                 >
//                   <ListItemIcon>
//                     <InsertDriveFileIcon />
//                   </ListItemIcon>
//                   <ListItemText primary="All Employee Leave Summary Report" />
//                 </ActiveListItem>

//                 {/* Employee Leave Pattern Report */}
//                 <ActiveListItem
//                   button
//                   sx={{ pl: 4 }}
//                   onClick={() => handleNavigation("/hrms/admindashboard/employeeLeavePatternReport")}
//                   selected={isActive("/hrms/admindashboard/employeeLeavePatternReport")}
//                   hasactivechild={false}
//                 >
//                   <ListItemIcon>
//                     <InsertDriveFileIcon />
//                   </ListItemIcon>
//                   <ListItemText primary="Employee Leave Pattern Report" />
//                 </ActiveListItem>


//                 <ActiveListItem
//                   button
//                   sx={{ pl: 6 }}
//                   onClick={() => handleNavigation("/hrms/admindashboard/monthlyleaveReport")}
//                   selected={isActive("/hrms/admindashboard/monthlyleaveReport")}
//                   hasactivechild={false}
//                 >
//                   <ListItemIcon>
//                     <InsertDriveFileIcon />
//                   </ListItemIcon>
//                   <ListItemText primary="Monthly Leave Report" />
//                 </ActiveListItem>
//                 <ActiveListItem
//                   button
//                   sx={{ pl: 6 }}
//                   onClick={() => handleNavigation("/hrms/admindashboard/LeaveBalanceReport")}
//                   selected={isActive("/hrms/admindashboard/LeaveBalanceReport")}
//                   hasactivechild={false}
//                 >
//                   <ListItemIcon>
//                     <InsertDriveFileIcon />
//                   </ListItemIcon>
//                   <ListItemText primary="Leave Balance Report" />
//                 </ActiveListItem>
//               </List>
//             </Collapse>

//             {/* Payroll Reports */}
//             <ActiveListItem
//               button
//               sx={{ pl: 4 }}
//               onClick={handlePayrollReportClick}
//               selected={false}
//               hasactivechild={hasActiveChild(payrollReportRoutes)}
//             >
//               <ListItemIcon>
//                 <AccountBalanceWalletIcon />
//               </ListItemIcon>
//               <ListItemText primary="Payroll Reports" />
//               {payrollReportOpen ? <ExpandLess /> : <ExpandMore />}
//             </ActiveListItem>
//             <Collapse in={payrollReportOpen} timeout="auto" unmountOnExit>
//               <List component="div" disablePadding>
               
//                 <ActiveListItem
//                   button
//                   sx={{ pl: 6 }}
//                   onClick={() => handleNavigation("/hrms/admindashboard/PFReport")}
//                   selected={isActive("/hrms/admindashboard/PFReport")}
//                   hasactivechild={false}
//                 >
//                   <ListItemIcon>
//                     <InsertDriveFileIcon />
//                   </ListItemIcon>
//                   <ListItemText primary="PF Report" />
//                 </ActiveListItem>



//                 <ActiveListItem
//                   button
//                   sx={{ pl: 6 }}
//                   onClick={() => handleNavigation("/hrms/admindashboard/PTReport")}
//                   selected={isActive("/hrms/admindashboard/PTReport")}
//                   hasactivechild={false}
//                 >
//                   <ListItemIcon>
//                     <InsertDriveFileIcon />
//                   </ListItemIcon>
//                   <ListItemText primary="PT Report" />
//                 </ActiveListItem>



//                 <ActiveListItem
//                   button
//                   sx={{ pl: 6 }}
//                   onClick={() => handleNavigation("/hrms/admindashboard/SalaryReport")}
//                   selected={isActive("/hrms/admindashboard/SalaryReport")}
//                   hasactivechild={false}
//                 >
//                   <ListItemIcon>
//                     <InsertDriveFileIcon />
//                   </ListItemIcon>
//                   <ListItemText primary="Salary Report" />
//                 </ActiveListItem>




//                 <ActiveListItem
//                   button
//                   sx={{ pl: 6 }}
//                   onClick={() => handleNavigation("/hrms/admindashboard/EmpPayrollSalaryReport")}
//                   selected={isActive("/hrms/admindashboard/EmpPayrollSalaryReport")}
//                   hasactivechild={false}
//                 >
//                   <ListItemIcon>
//                     <InsertDriveFileIcon />
//                   </ListItemIcon>
//                   <ListItemText primary="Payroll Salary Report" />
//                 </ActiveListItem>




//               </List>
//             </Collapse>

//           </List>
//         </Collapse>

//         {/* Resignation */}
//         <ActiveListItem
//           button
//           onClick={() => handleNavigation("/hrms/admindashboard/resignpaneladmin")}
//           selected={isActive("/hrms/admindashboard/resignpaneladmin")}
//           hasactivechild={false}
//         >
//           <ListItemIcon>
//             <PersonRemoveIcon />
//           </ListItemIcon>
//           <ListItemText primary="Resignation" />
//         </ActiveListItem>

//         {/* HelpDesk */}
//         <ActiveListItem
//           button
//           onClick={() => handleNavigation("/hrms/admindashboard/helpdesk")}
//           selected={isActive("/hrms/admindashboard/helpdesk")}
//           hasactivechild={false}
//         >
//           <ListItemIcon>
//             <HelpIcon />
//           </ListItemIcon>
//           <ListItemText primary="HelpDesk" />
//         </ActiveListItem>
//       </List>
//     </Drawer>
//   );
// }

























// import React, { useState, useMemo } from "react";
// import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
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
//   styled,
//   useMediaQuery,
//   useTheme,
// } from "@mui/material";
// import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
// import MenuIcon from "@mui/icons-material/Menu";
// import HomeIcon from "@mui/icons-material/Home";
// import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
// import GroupIcon from "@mui/icons-material/Group";
// import WorkIcon from "@mui/icons-material/Work";
// import ExpandLess from "@mui/icons-material/ExpandLess";
// import ExpandMore from "@mui/icons-material/ExpandMore";
// import HelpIcon from "@mui/icons-material/Help";
// import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
// import { useNavigate, useLocation, Link } from "react-router-dom";
// import AddBoxIcon from "@mui/icons-material/AddBox";
// import PersonAddIcon from "@mui/icons-material/PersonAdd";
// import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
// import DashboardIcon from '@mui/icons-material/Dashboard';
// import PolicyIcon from '@mui/icons-material/Policy';
// import SummarizeIcon from '@mui/icons-material/Summarize';
// import LogoutIcon from "@mui/icons-material/Logout";
// import tdtlLogo from "./vetrinalogo.png";

// const ActiveListItem = styled(ListItem)(({ theme, selected, hasactivechild }) => ({
//   backgroundColor: selected || hasactivechild ? '#FFFFFF' : 'transparent',
//   color: selected || hasactivechild ? '#F58E35' : '#FFFFFF',

//   '&:hover': {
//     backgroundColor: selected || hasactivechild ? '#f5f5f5' : 'rgba(255, 255, 255, 0.1)',
//   },

//   '& .MuiListItemIcon-root': {
//     color: selected || hasactivechild ? '#F58E35' : '#FFFFFF',
//   },
//   margin: '2px 8px',
//   borderRadius: '4px',
//   padding: '8px 12px',
//   transition: 'all 0.2s ease',
// }));


// export default function Sidebar({ open, toggleDrawer, drawerWidth }) {
//   const [openMenu, setOpenMenu] = useState(null);

//   const [attendanceReportOpen, setAttendanceReportOpen] = useState(false);
//   const [leaveReportOpen, setLeaveReportOpen] = useState(false);
//   const [payrollReportOpen, setPayrollReportOpen] = useState(false);
//   const [confirmationReportOpen, setConfirmationReportOpen] = useState(false);

//   const navigate = useNavigate();
//   const location = useLocation();

//   const theme = useTheme();
//   const isMobileOnly = useMediaQuery(theme.breakpoints.down('sm'));

//   const hasActiveChild = (routes) => {
//     return routes.some(route => location.pathname === route);
//   };

//   const employeeRoutes = useMemo(() => [
//     "/hrms/admindashboard/employeesMain",
//     "/hrms/admindashboard/employees",
//     "/hrms/admindashboard/shifts",
//     "/hrms/admindashboard/employeeexits"
//   ], []);

//   const coreHRRoutes = useMemo(() => [
//     "/hrms/admindashboard/corehrdashboard",
//     "/hrms/admindashboard/companydetails",
//     "/hrms/admindashboard/role",
//     "/hrms/admindashboard/employeehub",
//     "/hrms/admindashboard/department",
//     "/hrms/admindashboard/designation",
//     "/hrms/admindashboard/division",
//     "/hrms/admindashboard/grade",
//     "/hrms/admindashboard/payrollSetup",
//     "/hrms/admindashboard/headquaters",
//     "/hrms/admindashboard/makeannouncement"
//   ], []);

//   const policyRoutes = useMemo(() => [
//     "/hrms/admindashboard/policies",
//     "/hrms/admindashboard/policyDashboard",
//     "/hrms/admindashboard/policyallocation"
//   ], []);

//   const attendanceRoutes = useMemo(() => [
//     "/hrms/admindashboard/attendancemain",
//     "/hrms/admindashboard/monthly-report"
//   ], []);

//   const appsRoutes = useMemo(() => [
//     "/hrms/admindashboard/eventadmin",
//     "/hrms/admindashboard/assestadmin",
//     "/hrms/admindashboard/awardsadmin",
//     "/hrms/admindashboard/visitorbook",
//     "/hrms/admindashboard/holidaysadmin"
//   ], []);

//   const confirmationRoutes = useMemo(() => [
//     "/hrms/admindashboard/parametercreation",
//     "/hrms/admindashboard/employeeconfirmationMain",
//     "/hrms/admindashboard/performanceTable",
//     "/hrms/admindashboard/dashboardConfirmation"
//   ], []);

//   const payrollRoutes = useMemo(() => [
//     "/hrms/admindashboard/DashboardPayroll",
//     "/hrms/admindashboard/PayrollSetupManagement"
//   ], []);

//   const leaveRoutes = useMemo(() => [
//     "/hrms/admindashboard/leaverequest",
//     "/hrms/admindashboard/mainLeave",
//     "/hrms/admindashboard/leaveSetup"
//   ], []);

//   const attendanceReportRoutes = useMemo(() => [
//     "/hrms/admindashboard/DailyAttendanceReport",
//     "/hrms/admindashboard/MonthlyAttendanceReprt",
//     "/hrms/admindashboard/MonthlyPunchINOUT"
//   ], []);

//   const leaveReportRoutes = useMemo(() => [
//     "/hrms/admindashboard/AllEmpLeaveReports",
//     "/hrms/admindashboard/annualLeaveReport",
//     "/hrms/admindashboard/departmentWiseLeaveReport",
//     "/hrms/admindashboard/employeeAnnualLeaveReport",
//     "/hrms/admindashboard/employeePendingLeaveReport",
//     "/hrms/admindashboard/monthlyleaveReport",
//     "/hrms/admindashboard/LeaveBalanceReport"
//   ], []);

//   const payrollReportRoutes = useMemo(() => [
//     "/hrms/admindashboard/payrollSummaryReport",
//     "/hrms/admindashboard/taxDeductionReport",
//     "/hrms/admindashboard/bonusPaymentReport",
//     "/hrms/admindashboard/loanDeductionReport"
//   ], []);

//   const confirmationReportRoutes = useMemo(() => [
//     "/hrms/admindashboard/confirmationStatusReport",
//     "/hrms/admindashboard/employeePerformanceReport",
//     "/hrms/admindashboard/confirmationProcessReport"
//   ], []);

//   const reportsRoutes = useMemo(() => [
//     ...attendanceReportRoutes,
//     ...leaveReportRoutes,
//     ...payrollReportRoutes,
//     ...confirmationReportRoutes,
//     "/hrms/admindashboard/NewJoinerReport",
//     "/hrms/admindashboard/annualManpowerReport",
//     "/hrms/admindashboard/employeeAttritionReport",
//     "/hrms/admindashboard/hrMasterDataReport",
//     "/hrms/admindashboard/employeeConfirmationReport",
//     "/hrms/admindashboard/employeeLeavePatternReport",
//     "/hrms/admindashboard/employeePipReport",
//     "/hrms/admindashboard/employeeExitReport",
//     "/hrms/admindashboard/AnnualManpowerReport",
//     "/hrms/admindashboard/EmployeeAttritionReport",
//     "/hrms/admindashboard/PerformanceManagementReport",
//     "/hrms/admindashboard/AnnualAppraisalReport",
//     "/hrms/admindashboard/PromotionReport",
//     "/hrms/admindashboard/GratuityEligibilityReport",
//     "/hrms/admindashboard/PFReport",
//     "/hrms/admindashboard/SalaryReport",
//     "/hrms/admindashboard/EmpPayrollSalaryReport",
//     "/hrms/admindashboard/EmpPayrollSalaryReport",
//     "/hrms/admindashboard/PTReport",
//     "/hrms/admindashboard/EmpMasterDataReport",
//     "/hrms/admindashboard/Recruitmenttracker",
//   ], [attendanceReportRoutes, leaveReportRoutes, payrollReportRoutes, confirmationReportRoutes]);

//   const handleMenuClick = (menuName) => {
//     setOpenMenu(prevOpenMenu => (prevOpenMenu === menuName ? null : menuName));
//   };

//   const handleAttendanceReportClick = () => {
//     setAttendanceReportOpen(!attendanceReportOpen);
//   };

//   const handleLeaveReportClick = () => {
//     setLeaveReportOpen(!leaveReportOpen);
//   };

//   const handlePayrollReportClick = () => {
//     setPayrollReportOpen(!payrollReportOpen);
//   };

//   const handleConfirmationReportClick = () => {
//     setConfirmationReportOpen(!confirmationReportOpen);
//   };

//   const handleNavigation = (route) => {
//     navigate(route);
//   };

//   const isActive = (route) => location.pathname === route;

//   return (
//    <>
//     <Drawer
//       sx={{
//         width: drawerWidth,
//         flexShrink: 0,
//         "& .MuiDrawer-paper": {
//           width: drawerWidth,
//           boxSizing: "border-box",
//           cursor: "pointer",
//           backgroundColor: '#F58E35',
//           ...(isMobileOnly && {
//             zIndex: (theme) => theme.zIndex.drawer + 2,
//             position: 'absolute',
//           }),
//         },
//       }}
//       variant={isMobileOnly ? "temporary" : "persistent"}
//       anchor="left"
//       open={open}
//       ModalProps={isMobileOnly ? {
//         keepMounted: true,
//         onBackdropClick: toggleDrawer,
//       } : {}}
//     >
//       <Box
//         sx={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "space-between",
//           p: 1,
//           minHeight: 64,
//           backgroundColor: '#F58E35',
//           color: '#FFFFFF',
//         }}
//       >
//         <Box sx={{
//           backgroundColor: 'white',
//           borderRadius: '4px',
//           padding: '4px',
//           display: 'flex',
//           alignItems: 'center',
//           ml: 1
//         }}>
//           <Link to="/hrms/admindashboard/home">
//             <img
//               src={tdtlLogo || "/placeholder.svg"}
//               alt="TDTL Logo"
//               style={{
//                 height: "40px",
//                 width: "auto",
//                 cursor: "pointer",
//                 display: "block",
//               }}
//             />
//           </Link>
//         </Box>
//         {/* <IconButton onClick={toggleDrawer} sx={{ color: 'inherit' }}>
//           <ChevronLeftIcon />
//         </IconButton> */}
//       </Box>
//       <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.2)'}} />
//       <List sx={{
//           p: 1,
//           overflowY: 'auto',
//           '&::-webkit-scrollbar': {
//             display: 'none',
//           },
//           '-ms-overflow-style': 'none',
//           'scrollbar-width': 'none',
//       }}>
//         <ActiveListItem
//           button
//           onClick={() => handleNavigation("/hrms/admindashboard/home")}
//           selected={isActive("/hrms/admindashboard/home")}
//           hasactivechild={false}
//         >
//           <ListItemIcon>
//             <HomeIcon />
//           </ListItemIcon>
//           <ListItemText primary="Home" />
//         </ActiveListItem>

//         <ActiveListItem
//           button
//           onClick={() => handleMenuClick('employees')}
//           selected={false}
//           hasactivechild={hasActiveChild(employeeRoutes)}
//         >
//           <ListItemIcon>
//             <GroupIcon />
//           </ListItemIcon>
//           <ListItemText primary="Employees" />
//           {openMenu === 'employees' ? <ExpandLess /> : <ExpandMore />}
//         </ActiveListItem>
//         <Collapse in={openMenu === 'employees'} timeout="auto" unmountOnExit>
//           <List component="div" disablePadding>
//             <ActiveListItem
//               button
//               sx={{ pl: 4 }}
//               onClick={() => handleNavigation("/hrms/admindashboard/employeesMain")}
//               selected={isActive("/hrms/admindashboard/employeesMain")}
//               hasactivechild={false}
//             >
//               <ListItemText primary="Dashboard" />
//             </ActiveListItem>
//             <ActiveListItem
//               button
//               sx={{ pl: 4 }}
//               onClick={() => handleNavigation("/hrms/admindashboard/employees")}
//               selected={isActive("/hrms/admindashboard/employees")}
//               hasactivechild={false}
//             >
//               <ListItemText primary="Employees List" />
//             </ActiveListItem>
//             <ActiveListItem
//               button
//               sx={{ pl: 4 }}
//               onClick={() => handleNavigation("/hrms/admindashboard/shifts")}
//               selected={isActive("/hrms/admindashboard/shifts")}
//               hasactivechild={false}
//             >
//               <ListItemText primary="Shifts & Scheduling" />
//             </ActiveListItem>
//             <ActiveListItem
//               button
//               sx={{ pl: 4 }}
//               onClick={() => handleNavigation("/hrms/admindashboard/employeeexits")}
//               selected={isActive("/hrms/admindashboard/employeeexits")}
//               hasactivechild={false}
//             >
//               <ListItemText primary="Employees Exit" />
//             </ActiveListItem>
//           </List>
//         </Collapse>

//         <ActiveListItem
//           button
//           onClick={() => handleMenuClick('coreHR')}
//           selected={false}
//           hasactivechild={hasActiveChild(coreHRRoutes)}
//         >
//           <ListItemIcon>
//             <WorkIcon />
//           </ListItemIcon>
//           <ListItemText primary="Core HR" />
//           {openMenu === 'coreHR' ? <ExpandLess /> : <ExpandMore />}
//         </ActiveListItem>
//         <Collapse in={openMenu === 'coreHR'} timeout="auto" unmountOnExit>
//           <List component="div" disablePadding>
//             <ActiveListItem
//               button
//               sx={{ pl: 4 }}
//               onClick={() => handleNavigation("/hrms/admindashboard/corehrdashboard")}
//               selected={isActive("/hrms/admindashboard/corehrdashboard")}
//               hasactivechild={false}
//             >
//               <ListItemText primary="Dashboard" />
//             </ActiveListItem>


//             <ActiveListItem
//               button
//               sx={{ pl: 4 }}
//               onClick={() => handleNavigation("/hrms/admindashboard/role")}
//               selected={isActive("/hrms/admindashboard/role")}
//               hasactivechild={false}
//             >
//               <ListItemText primary="Create Role" />
//             </ActiveListItem>

//             <ActiveListItem
//               button
//               sx={{ pl: 4 }}
//               onClick={() => handleNavigation("/hrms/admindashboard/companydetails")}
//               selected={isActive("/hrms/admindashboard/companydetails")}
//               hasactivechild={false}
//             >
//               <ListItemText primary="Company Details" />
//             </ActiveListItem>



//             <ActiveListItem
//               button
//               sx={{ pl: 4 }}
//               onClick={() => handleNavigation("/hrms/admindashboard/employeehub")}
//               selected={isActive("/hrms/admindashboard/employeehub")}
//               hasactivechild={false}
//             >
//               <ListItemText primary="Employee Hub" />
//             </ActiveListItem>



//             <ActiveListItem
//               button
//               sx={{ pl: 4 }}
//               onClick={() => handleNavigation("/hrms/admindashboard/department")}
//               selected={isActive("/hrms/admindashboard/department")}
//               hasactivechild={false}
//             >
//               <ListItemText primary="Department" />
//             </ActiveListItem>
//             <ActiveListItem
//               button
//               sx={{ pl: 4 }}
//               onClick={() => handleNavigation("/hrms/admindashboard/designation")}
//               selected={isActive("/hrms/admindashboard/designation")}
//               hasactivechild={false}
//             >
//               <ListItemText primary="Designation" />
//             </ActiveListItem>
//             <ActiveListItem
//               button
//               sx={{ pl: 4 }}
//               onClick={() => handleNavigation("/hrms/admindashboard/division")}
//               selected={isActive("/hrms/admindashboard/division")}
//               hasactivechild={false}
//             >
//               <ListItemText primary="Division" />
//             </ActiveListItem>
//             <ActiveListItem
//               button
//               sx={{ pl: 4 }}
//               onClick={() => handleNavigation("/hrms/admindashboard/grade")}
//               selected={isActive("/hrms/admindashboard/grade")}
//               hasactivechild={false}
//             >
//               <ListItemText primary="Grade" />
//             </ActiveListItem>
//             {/* <ActiveListItem
//               button
//               sx={{ pl: 4 }}
//               onClick={() => handleNavigation("/hrms/admindashboard/payrollSetup")}
//               selected={isActive("/hrms/admindashboard/payrollSetup")}
//               hasactivechild={false}
//             >
//               <ListItemText primary="Pay Roll Set Up" />
//             </ActiveListItem> */}
//             <ActiveListItem
//               button
//               sx={{ pl: 4 }}
//               onClick={() => handleNavigation("/hrms/admindashboard/headquaters")}
//               selected={isActive("/hrms/admindashboard/headquaters")}
//               hasactivechild={false}
//             >
//               <ListItemText primary="Headquaters" />
//             </ActiveListItem>
//             <ActiveListItem
//               button
//               sx={{ pl: 4 }}
//               onClick={() => handleNavigation("/hrms/admindashboard/makeannouncement")}
//               selected={isActive("/hrms/admindashboard/makeannouncement")}
//               hasactivechild={false}
//             >
//               <ListItemText primary="Make Announcement" />
//             </ActiveListItem>
//           </List>
//         </Collapse>

//         <ActiveListItem
//           button
//           onClick={() => handleMenuClick('policyManagement')}
//           selected={false}
//           hasactivechild={hasActiveChild(policyRoutes)}
//         >
//           <ListItemIcon>
//             <PolicyIcon />
//           </ListItemIcon>
//           <ListItemText primary="Policy Management" />
//           {openMenu === 'policyManagement' ? <ExpandLess /> : <ExpandMore />}
//         </ActiveListItem>
//         <Collapse in={openMenu === 'policyManagement'} timeout="auto" unmountOnExit>
//           <List component="div" disablePadding>
//             <ActiveListItem
//               button
//               sx={{ pl: 4 }}
//               onClick={() => handleNavigation("/hrms/admindashboard/policies")}
//               selected={isActive("/hrms/admindashboard/policies")}
//               hasactivechild={false}
//             >
//               <ListItemText primary="Policies" />
//             </ActiveListItem>
//             <ActiveListItem
//               button
//               sx={{ pl: 4 }}
//               onClick={() => handleNavigation("/hrms/admindashboard/policyDashboard")}
//               selected={isActive("/hrms/admindashboard/policyDashboard")}
//               hasactivechild={false}
//             >
//               <ListItemText primary="Policy Dashboard" />
//             </ActiveListItem>
//             <ActiveListItem
//               button
//               sx={{ pl: 4 }}
//               onClick={() => handleNavigation("/hrms/admindashboard/policyallocation")}
//               selected={isActive("/hrms/admindashboard/policyallocation")}
//               hasactivechild={false}
//             >
//               <ListItemText primary="Policy Allocation" />
//             </ActiveListItem>
//           </List>
//         </Collapse>

//         <ActiveListItem
//           button
//           onClick={() => handleMenuClick('attendance')}
//           selected={false}
//           hasactivechild={hasActiveChild(attendanceRoutes)}
//         >
//           <ListItemIcon>
//             <CalendarTodayIcon />
//           </ListItemIcon>
//           <ListItemText primary="Attendance" />
//           {openMenu === 'attendance' ? <ExpandLess /> : <ExpandMore />}
//         </ActiveListItem>
//         <Collapse in={openMenu === 'attendance'} timeout="auto" unmountOnExit>
//           <List component="div" disablePadding>
//             <ActiveListItem
//               button
//               sx={{ pl: 4 }}
//               onClick={() => handleNavigation("/hrms/admindashboard/attendancemain")}
//               selected={isActive("/hrms/admindashboard/attendancemain")}
//               hasactivechild={false}
//             >
//               <ListItemText primary="Daily Attendance" />
//             </ActiveListItem>
//             <ActiveListItem
//               button
//               sx={{ pl: 4 }}
//               onClick={() => handleNavigation("/hrms/admindashboard/monthly-report")}
//               selected={isActive("/hrms/admindashboard/monthly-report")}
//               hasactivechild={false}
//             >
//               <ListItemText primary="Monthly Report" />
//             </ActiveListItem>
//           </List>
//         </Collapse>

//         <ActiveListItem
//           button
//           onClick={() => handleMenuClick('apps')}
//           selected={false}
//           hasactivechild={hasActiveChild(appsRoutes)}
//         >
//           <ListItemIcon>
//             <DashboardIcon />
//           </ListItemIcon>
//           <ListItemText primary="Apps" />
//           {openMenu === 'apps' ? <ExpandLess /> : <ExpandMore />}
//         </ActiveListItem>
//         <Collapse in={openMenu === 'apps'} timeout="auto" unmountOnExit>
//           <List component="div" disablePadding>
//             <ActiveListItem
//               button
//               sx={{ pl: 4 }}
//               onClick={() => handleNavigation("/hrms/admindashboard/eventadmin")}
//               selected={isActive("/hrms/admindashboard/eventadmin")}
//               hasactivechild={false}
//             >
//               <ListItemText primary="Events" />
//             </ActiveListItem>
//             <ActiveListItem
//               button
//               sx={{ pl: 4 }}
//               onClick={() => handleNavigation("/hrms/admindashboard/assestadmin")}
//               selected={isActive("/hrms/admindashboard/assestadmin")}
//               hasactivechild={false}
//             >
//               <ListItemText primary="Assets" />
//             </ActiveListItem>
//             <ActiveListItem
//               button
//               sx={{ pl: 4 }}
//               onClick={() => handleNavigation("/hrms/admindashboard/awardsadmin")}
//               selected={isActive("/hrms/admindashboard/awardsadmin")}
//               hasactivechild={false}
//             >
//               <ListItemText primary="Awards" />
//             </ActiveListItem>
//             <ActiveListItem
//               button
//               sx={{ pl: 4 }}
//               onClick={() => handleNavigation("/hrms/admindashboard/visitorbook")}
//               selected={isActive("/hrms/admindashboard/visitorbook")}
//               hasactivechild={false}
//             >
//               <ListItemText primary="Visitor Book" />
//             </ActiveListItem>
//             <ActiveListItem
//               button
//               sx={{ pl: 4 }}
//               onClick={() => handleNavigation("/hrms/admindashboard/holidaysadmin")}
//               selected={isActive("/hrms/admindashboard/holidaysadmin")}
//               hasactivechild={false}
//             >
//               <ListItemText primary="Holidays" />
//             </ActiveListItem>
//           </List>
//         </Collapse>

//         <ActiveListItem
//           button
//           onClick={() => handleMenuClick('confirmation')}
//           selected={false}
//           hasactivechild={hasActiveChild(confirmationRoutes)}
//         >
//           <ListItemIcon>
//             <PersonAddIcon />
//           </ListItemIcon>
//           <ListItemText primary="Employee Confirmation" />
//           {openMenu === 'confirmation' ? <ExpandLess /> : <ExpandMore />}
//         </ActiveListItem>
//         <Collapse in={openMenu === 'confirmation'} timeout="auto" unmountOnExit>
//           <List component="div" disablePadding>
//             <ActiveListItem
//               button
//               sx={{ pl: 4 }}
//               onClick={() => handleNavigation("/hrms/admindashboard/parametercreation")}
//               selected={isActive("/hrms/admindashboard/parametercreation")}
//               hasactivechild={false}
//             >
//               <ListItemText primary="Parameter Creation" />
//             </ActiveListItem>
//             <ActiveListItem
//               button
//               sx={{ pl: 4 }}
//               onClick={() => handleNavigation("/hrms/admindashboard/employeeconfirmationMain")}
//               selected={isActive("/hrms/admindashboard/employeeconfirmationMain")}
//               hasactivechild={false}
//             >
//               <ListItemText primary="Confirmation Form" />
//             </ActiveListItem>
//             <ActiveListItem
//               button
//               sx={{ pl: 4 }}
//               onClick={() => handleNavigation("/hrms/admindashboard/performanceTable")}
//               selected={isActive("/hrms/admindashboard/performanceTable")}
//               hasactivechild={false}
//             >
//               <ListItemText primary="Performance Table" />
//             </ActiveListItem>
//             <ActiveListItem
//               button
//               sx={{ pl: 4 }}
//               onClick={() => handleNavigation("/hrms/admindashboard/dashboardConfirmation")}
//               selected={isActive("/hrms/admindashboard/dashboardConfirmation")}
//               hasactivechild={false}
//             >
//               <ListItemText primary="Dashboard Confirmation" />
//             </ActiveListItem>
//           </List>
//         </Collapse>

//         <ActiveListItem
//           button
//           onClick={() => handleMenuClick('payroll')}
//           selected={false}
//           hasactivechild={hasActiveChild(payrollRoutes)}
//         >
//           <ListItemIcon>
//             <AccountBalanceWalletIcon />
//           </ListItemIcon>
//           <ListItemText primary="Payroll" />
//           {openMenu === 'payroll' ? <ExpandLess /> : <ExpandMore />}
//         </ActiveListItem>
//         <Collapse in={openMenu === 'payroll'} timeout="auto" unmountOnExit>
//           <List component="div" disablePadding>
//             <ActiveListItem
//               button
//               sx={{ pl: 4 }}
//               onClick={() => handleNavigation("/hrms/admindashboard/DashboardPayroll")}
//               selected={isActive("/hrms/admindashboard/DashboardPayroll")}
//               hasactivechild={false}
//             >
//               <ListItemText primary="Dashboard" />
//             </ActiveListItem>
//             <ActiveListItem
//               button
//               sx={{ pl: 4 }}
//               onClick={() => handleNavigation("/hrms/admindashboard/PayrollSetupManagement")}
//               selected={isActive("/hrms/admindashboard/PayrollSetupManagement")}
//               hasactivechild={false}
//             >
//               <ListItemText primary="Payroll Setup Configuration" />
//             </ActiveListItem>

//             <ActiveListItem button sx={{ pl: 4 }}
//               hasactivechild={false}
//               selected={isActive("/hrms/admindashboard/payrollReport")}
//               onClick={() => handleNavigation("/hrms/admindashboard/payrollReport")}>
//               <ListItemText primary="Payroll Reports" />
//             </ActiveListItem>
//           </List>
//         </Collapse>

//         <ActiveListItem
//           button
//           onClick={() => handleMenuClick('leaveManagement')}
//           selected={false}
//           hasactivechild={hasActiveChild(leaveRoutes)}
//         >
//           <ListItemIcon>
//             <AddBoxIcon />
//           </ListItemIcon>
//           <ListItemText primary="Leave Management" />
//           {openMenu === 'leaveManagement' ? <ExpandLess /> : <ExpandMore />}
//         </ActiveListItem>
//         <Collapse in={openMenu === 'leaveManagement'} timeout="auto" unmountOnExit>
//           <List component="div" disablePadding>
//             <ActiveListItem
//               button
//               sx={{ pl: 4 }}
//               onClick={() => handleNavigation("/hrms/admindashboard/leaverequest")}
//               selected={isActive("/hrms/admindashboard/leaverequest")}
//               hasactivechild={false}
//             >
//               <ListItemText primary="Leave Request" />
//             </ActiveListItem>
//             <ActiveListItem
//               button
//               sx={{ pl: 4 }}
//               onClick={() => handleNavigation("/hrms/admindashboard/mainLeave")}
//               selected={isActive("/hrms/admindashboard/mainLeave")}
//               hasactivechild={false}
//             >
//               <ListItemText primary="Dashboard" />
//             </ActiveListItem>
//             <ActiveListItem
//               button
//               sx={{ pl: 4 }}
//               onClick={() => handleNavigation("/hrms/admindashboard/leaveSetup")}
//               selected={isActive("/hrms/admindashboard/leaveSetup")}
//               hasactivechild={false}
//             >
//               <ListItemText primary="Leave Set Up" />
//             </ActiveListItem>
//           </List>
//         </Collapse>


//         <ActiveListItem
//           button
//           onClick={() => handleNavigation("/hrms/admindashboard/MetricsFromAdmin")}
//           selected={isActive("/hrms/admindashboard/MetricsFromAdmin")}
//           hasactivechild={false}
//         >
//           <ListItemIcon>
//             <HelpIcon />
//           </ListItemIcon>
//           <ListItemText primary="Metrics Form " />
//         </ActiveListItem>


//         <ActiveListItem
//           button
//           onClick={() => handleNavigation("/hrms/admindashboard/ExitandTerminationAd")}
//           selected={isActive("/hrms/admindashboard/ExitandTerminationAd")}
//           hasactivechild={false}
//         >
//           <ListItemIcon>
//            <LogoutIcon />
//           </ListItemIcon>
//           <ListItemText primary="Exit & Termination " />
//         </ActiveListItem>

//         <ActiveListItem
//           button
//           onClick={() => handleMenuClick('reports')}
//           selected={false}
//           hasactivechild={hasActiveChild(reportsRoutes)}
//         >
//           <ListItemIcon>
//             <SummarizeIcon />
//           </ListItemIcon>
//           <ListItemText primary="Reports" />
//           {openMenu === 'reports' ? <ExpandLess /> : <ExpandMore />}
//         </ActiveListItem>
//         <Collapse in={openMenu === 'reports'} timeout="auto" unmountOnExit>
//           <List component="div" disablePadding>

//             <ActiveListItem
//               button
//               sx={{ pl: 4 }}
//               onClick={() => handleNavigation("/hrms/admindashboard/NewJoinerReport")}
//               selected={isActive("/hrms/admindashboard/NewJoinerReport")}
//               hasactivechild={false}
//             >
//               <ListItemIcon>
//                 <InsertDriveFileIcon />
//               </ListItemIcon>
//               <ListItemText primary="New Joiner Report" />
//             </ActiveListItem>

//             <ActiveListItem
//               button
//               sx={{ pl: 4 }}
//               onClick={() => handleNavigation("/hrms/admindashboard/annualManpowerReport")}
//               selected={isActive("/hrms/admindashboard/annualManpowerReport")}
//               hasactivechild={false}
//             >
//               <ListItemIcon>
//                 <InsertDriveFileIcon />
//               </ListItemIcon>
//               <ListItemText primary="Annual Manpower Report" />
//             </ActiveListItem>

//             <ActiveListItem
//               button
//               sx={{ pl: 4 }}
//               onClick={() => handleNavigation("/hrms/admindashboard/employeeAttritionReport")}
//               selected={isActive("/hrms/admindashboard/employeeAttritionReport")}
//               hasactivechild={false}
//             >
//               <ListItemIcon>
//                 <InsertDriveFileIcon />
//               </ListItemIcon>
//               <ListItemText primary="Employee Attrition Rate Report" />
//             </ActiveListItem>

//             <ActiveListItem
//               button
//               sx={{ pl: 4 }}
//               onClick={() => handleNavigation("/hrms/admindashboard/hrMasterDataReport")}
//               selected={isActive("/hrms/admindashboard/hrMasterDataReport")}
//               hasactivechild={false}
//             >
//               <ListItemIcon>
//                 <InsertDriveFileIcon />
//               </ListItemIcon>
//               <ListItemText primary="HR Master Data Report" />
//             </ActiveListItem>





//             <ActiveListItem
//               button
//               sx={{ pl: 4 }}
//               onClick={() => handleNavigation("/hrms/admindashboard/Recruitmenttracker")}
//               selected={isActive("/hrms/admindashboard/Recruitmenttracker")}
//               hasactivechild={false}
//             >
//               <ListItemIcon>
//                 <InsertDriveFileIcon />
//               </ListItemIcon>
//               <ListItemText primary="Recruitment Tracker Report" />
//             </ActiveListItem>


//             <ActiveListItem
//               button
//               sx={{ pl: 4 }}
//               onClick={() => handleNavigation("/hrms/admindashboard/employeeConfirmationReport")}
//               selected={isActive("/hrms/admindashboard/employeeConfirmationReport")}
//               hasactivechild={false}
//             >
//               <ListItemIcon>
//                 <InsertDriveFileIcon />
//               </ListItemIcon>
//               <ListItemText primary="Employee Confirmation Report" />
//             </ActiveListItem>



//             <ActiveListItem
//               button
//               sx={{ pl: 4 }}
//               onClick={() => handleNavigation("/hrms/admindashboard/employeePipReport")}
//               selected={isActive("/hrms/admindashboard/employeePipReport")}
//               hasactivechild={false}
//             >
//               <ListItemIcon>
//                 <InsertDriveFileIcon />
//               </ListItemIcon>
//               <ListItemText primary="Employee PIP Report" />
//             </ActiveListItem>


//             <ActiveListItem
//               button
//               sx={{ pl: 6 }}
//               onClick={() => handleNavigation("/hrms/admindashboard/employeeExitReport")}
//               selected={isActive("/hrms/admindashboard/employeeExitReport")}
//               hasactivechild={false}
//             >
//               <ListItemIcon>
//                 <InsertDriveFileIcon />
//               </ListItemIcon>
//               <ListItemText primary="Employee Exit Report" />
//             </ActiveListItem>




//             <ActiveListItem
//               button
//               sx={{ pl: 6 }}
//               onClick={() => handleNavigation("/hrms/admindashboard/PerformanceManagementReport")}
//               selected={isActive("/hrms/admindashboard/PerformanceManagementReport")}
//               hasactivechild={false}
//             >
//               <ListItemIcon>
//                 <InsertDriveFileIcon />
//               </ListItemIcon>
//               <ListItemText primary="Performance Management Report" />
//             </ActiveListItem>

//             <ActiveListItem
//               button
//               sx={{ pl: 6 }}
//               onClick={() => handleNavigation("/hrms/admindashboard/AnnualAppraisalReport")}
//               selected={isActive("/hrms/admindashboard/AnnualAppraisalReport")}
//               hasactivechild={false}
//             >
//               <ListItemIcon>
//                 <InsertDriveFileIcon />
//               </ListItemIcon>
//               <ListItemText primary="Annual Appraisal Report" />
//             </ActiveListItem>


//             <ActiveListItem
//               button
//               sx={{ pl: 6 }}
//               onClick={() => handleNavigation("/hrms/admindashboard/PromotionReport")}
//               selected={isActive("/hrms/admindashboard/PromotionReport")}
//               hasactivechild={false}
//             >
//               <ListItemIcon>
//                 <InsertDriveFileIcon />
//               </ListItemIcon>
//               <ListItemText primary="Promotion Report" />
//             </ActiveListItem>


//             <ActiveListItem
//               button
//               sx={{ pl: 6 }}
//               onClick={() => handleNavigation("/hrms/admindashboard/GratuityEligibilityReport")}
//               selected={isActive("/hrms/admindashboard/GratuityEligibilityReport")}
//               hasactivechild={false}
//             >
//               <ListItemIcon>
//                 <InsertDriveFileIcon />
//               </ListItemIcon>
//               <ListItemText primary="Gratuity Eligibility Report" />
//             </ActiveListItem>



//             <ActiveListItem
//               button
//               sx={{ pl: 6 }}
//               onClick={() => handleNavigation("/hrms/admindashboard/EmpMasterDataReport")}
//               selected={isActive("/hrms/admindashboard/EmpMasterDataReport")}
//               hasactivechild={false}
//             >
//               <ListItemIcon>
//                 <InsertDriveFileIcon />
//               </ListItemIcon>
//               <ListItemText primary="Employee Master Data Report" />
//             </ActiveListItem>

//             <ActiveListItem
//               button
//               sx={{ pl: 4 }}
//               onClick={handleAttendanceReportClick}
//               selected={false}
//               hasactivechild={hasActiveChild(attendanceReportRoutes)}
//             >
//               <ListItemIcon>
//                 <CalendarTodayIcon />
//               </ListItemIcon>
//               <ListItemText primary="Attendance Reports" />
//               {attendanceReportOpen ? <ExpandLess /> : <ExpandMore />}
//             </ActiveListItem>
//             <Collapse in={attendanceReportOpen} timeout="auto" unmountOnExit>
//               <List component="div" disablePadding>
//                 <ActiveListItem
//                   button
//                   sx={{ pl: 6 }}
//                   onClick={() => handleNavigation("/hrms/admindashboard/DailyAttendanceReport")}
//                   selected={isActive("/hrms/admindashboard/DailyAttendanceReport")}
//                   hasactivechild={false}
//                 >
//                   <ListItemIcon>
//                     <InsertDriveFileIcon />
//                   </ListItemIcon>
//                   <ListItemText primary="Daily Attendance Report" />
//                 </ActiveListItem>
//                 <ActiveListItem
//                   button
//                   sx={{ pl: 6 }}
//                   onClick={() => handleNavigation("/hrms/admindashboard/MonthlyAttendanceReprt")}
//                   selected={isActive("/hrms/admindashboard/MonthlyAttendanceReprt")}
//                   hasactivechild={false}
//                 >
//                   <ListItemIcon>
//                     <InsertDriveFileIcon />
//                   </ListItemIcon>
//                   <ListItemText primary="Monthly Attendance Report" />
//                 </ActiveListItem>
//                 <ActiveListItem
//                   button
//                   sx={{ pl: 6 }}
//                   onClick={() => handleNavigation("/hrms/admindashboard/MonthlyPunchINOUT")}
//                   selected={isActive("/hrms/admindashboard/MonthlyPunchINOUT")}
//                   hasactivechild={false}
//                 >
//                   <ListItemIcon>
//                     <InsertDriveFileIcon />
//                   </ListItemIcon>
//                   <ListItemText primary="Monthly Punch IN/OUT" />
//                 </ActiveListItem>
//               </List>
//             </Collapse>

//             <ActiveListItem
//               button
//               sx={{ pl: 4 }}
//               onClick={handleLeaveReportClick}
//               selected={false}
//               hasactivechild={hasActiveChild(leaveReportRoutes)}
//             >
//               <ListItemIcon>
//                 <AddBoxIcon />
//               </ListItemIcon>
//               <ListItemText primary="Leave Reports" />
//               {leaveReportOpen ? <ExpandLess /> : <ExpandMore />}
//             </ActiveListItem>
//             <Collapse in={leaveReportOpen} timeout="auto" unmountOnExit>
//               <List component="div" disablePadding>
//                 <ActiveListItem
//                   button
//                   sx={{ pl: 6 }}
//                   onClick={() => handleNavigation("/hrms/admindashboard/AllEmpLeaveReports")}
//                   selected={isActive("/hrms/admindashboard/AllEmpLeaveReports")}
//                   hasactivechild={false}
//                 >
//                   <ListItemIcon>
//                     <InsertDriveFileIcon />
//                   </ListItemIcon>
//                   <ListItemText primary="All Employee Leave Summary Report" />
//                 </ActiveListItem>

//                 <ActiveListItem
//                   button
//                   sx={{ pl: 4 }}
//                   onClick={() => handleNavigation("/hrms/admindashboard/employeeLeavePatternReport")}
//                   selected={isActive("/hrms/admindashboard/employeeLeavePatternReport")}
//                   hasactivechild={false}
//                 >
//                   <ListItemIcon>
//                     <InsertDriveFileIcon />
//                   </ListItemIcon>
//                   <ListItemText primary="Employee Leave Pattern Report" />
//                 </ActiveListItem>


//                 <ActiveListItem
//                   button
//                   sx={{ pl: 6 }}
//                   onClick={() => handleNavigation("/hrms/admindashboard/monthlyleaveReport")}
//                   selected={isActive("/hrms/admindashboard/monthlyleaveReport")}
//                   hasactivechild={false}
//                 >
//                   <ListItemIcon>
//                     <InsertDriveFileIcon />
//                   </ListItemIcon>
//                   <ListItemText primary="Monthly Leave Report" />
//                 </ActiveListItem>
//                 <ActiveListItem
//                   button
//                   sx={{ pl: 6 }}
//                   onClick={() => handleNavigation("/hrms/admindashboard/LeaveBalanceReport")}
//                   selected={isActive("/hrms/admindashboard/LeaveBalanceReport")}
//                   hasactivechild={false}
//                 >
//                   <ListItemIcon>
//                     <InsertDriveFileIcon />
//                   </ListItemIcon>
//                   <ListItemText primary="Leave Balance Report" />
//                 </ActiveListItem>
//               </List>
//             </Collapse>

//             <ActiveListItem
//               button
//               sx={{ pl: 4 }}
//               onClick={handlePayrollReportClick}
//               selected={false}
//               hasactivechild={hasActiveChild(payrollReportRoutes)}
//             >
//               <ListItemIcon>
//                 <AccountBalanceWalletIcon />
//               </ListItemIcon>
//               <ListItemText primary="Payroll Reports" />
//               {payrollReportOpen ? <ExpandLess /> : <ExpandMore />}
//             </ActiveListItem>
//             <Collapse in={payrollReportOpen} timeout="auto" unmountOnExit>
//               <List component="div" disablePadding>
               
//                 <ActiveListItem
//                   button
//                   sx={{ pl: 6 }}
//                   onClick={() => handleNavigation("/hrms/admindashboard/PFReport")}
//                   selected={isActive("/hrms/admindashboard/PFReport")}
//                   hasactivechild={false}
//                 >
//                   <ListItemIcon>
//                     <InsertDriveFileIcon />
//                   </ListItemIcon>
//                   <ListItemText primary="PF Report" />
//                 </ActiveListItem>



//                 <ActiveListItem
//                   button
//                   sx={{ pl: 6 }}
//                   onClick={() => handleNavigation("/hrms/admindashboard/PTReport")}
//                   selected={isActive("/hrms/admindashboard/PTReport")}
//                   hasactivechild={false}
//                 >
//                   <ListItemIcon>
//                     <InsertDriveFileIcon />
//                   </ListItemIcon>
//                   <ListItemText primary="PT Report" />
//                 </ActiveListItem>



//                 <ActiveListItem
//                   button
//                   sx={{ pl: 6 }}
//                   onClick={() => handleNavigation("/hrms/admindashboard/SalaryReport")}
//                   selected={isActive("/hrms/admindashboard/SalaryReport")}
//                   hasactivechild={false}
//                 >
//                   <ListItemIcon>
//                     <InsertDriveFileIcon />
//                   </ListItemIcon>
//                   <ListItemText primary="Salary Report" />
//                 </ActiveListItem>




//                 <ActiveListItem
//                   button
//                   sx={{ pl: 6 }}
//                   onClick={() => handleNavigation("/hrms/admindashboard/EmpPayrollSalaryReport")}
//                   selected={isActive("/hrms/admindashboard/EmpPayrollSalaryReport")}
//                   hasactivechild={false}
//                 >
//                   <ListItemIcon>
//                     <InsertDriveFileIcon />
//                   </ListItemIcon>
//                   <ListItemText primary="Payroll Salary Report" />
//                 </ActiveListItem>
//               </List>
//             </Collapse>
//           </List>
//         </Collapse>

//         <ActiveListItem
//           button
//           onClick={() => handleNavigation("/hrms/admindashboard/resignpaneladmin")}
//           selected={isActive("/hrms/admindashboard/resignpaneladmin")}
//           hasactivechild={false}
//         >
//           <ListItemIcon>
//             <PersonRemoveIcon />
//           </ListItemIcon>
//           <ListItemText primary="Resignation" />
//         </ActiveListItem>

//         <ActiveListItem
//           button
//           onClick={() => handleNavigation("/hrms/admindashboard/helpdesk")}
//           selected={isActive("/hrms/admindashboard/helpdesk")}
//           hasactivechild={false}
//         >
//           <ListItemIcon>
//             <HelpIcon />
//           </ListItemIcon>
//           <ListItemText primary="HelpDesk" />
//         </ActiveListItem>
//       </List>
//     </Drawer>


//        <IconButton
//         onClick={toggleDrawer}
//         sx={{
//           position: "fixed",
//           top: 80, 
//           // Move the button along with the drawer
//           left: open ? `${drawerWidth}px` : 0,
//           backgroundColor: "#F58E35",
//           color: "white",
//           "&:hover": { backgroundColor: "#e0792d" },
//           zIndex: (theme) => theme.zIndex.drawer + 3, // Make it higher than mobile drawer
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

//    </>
    


//   );
// }












import React, { useState, useMemo } from "react";
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
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
  styled,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import GroupIcon from "@mui/icons-material/Group";
import WorkIcon from "@mui/icons-material/Work";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import HelpIcon from "@mui/icons-material/Help";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { useNavigate, useLocation, Link } from "react-router-dom";
import AddBoxIcon from "@mui/icons-material/AddBox";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PolicyIcon from '@mui/icons-material/Policy';
import SummarizeIcon from '@mui/icons-material/Summarize';
import LogoutIcon from "@mui/icons-material/Logout";
import tdtlLogo from "./vetrinalogo.png";

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

  const [attendanceReportOpen, setAttendanceReportOpen] = useState(false);
  const [leaveReportOpen, setLeaveReportOpen] = useState(false);
  const [payrollReportOpen, setPayrollReportOpen] = useState(false);
  const [confirmationReportOpen, setConfirmationReportOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const theme = useTheme();
  const isMobileOnly = useMediaQuery(theme.breakpoints.down('sm'));

  const hasActiveChild = (routes) => {
    return routes.some(route => location.pathname === route);
  };

  const employeeRoutes = useMemo(() => [
    "/hrms/admindashboard/employeesMain",
    "/hrms/admindashboard/employees",
    "/hrms/admindashboard/shifts",
    "/hrms/admindashboard/employeeexits"
  ], []);

  const coreHRRoutes = useMemo(() => [
    "/hrms/admindashboard/corehrdashboard",
    "/hrms/admindashboard/companydetails",
    "/hrms/admindashboard/role",
    "/hrms/admindashboard/employeehub",
    "/hrms/admindashboard/department",
    "/hrms/admindashboard/designation",
    "/hrms/admindashboard/division",
    "/hrms/admindashboard/grade",
    "/hrms/admindashboard/payrollSetup",
    "/hrms/admindashboard/headquaters",
    "/hrms/admindashboard/makeannouncement"
  ], []);

  const policyRoutes = useMemo(() => [
    "/hrms/admindashboard/policies",
    "/hrms/admindashboard/policyDashboard",
    "/hrms/admindashboard/policyallocation"
  ], []);

  const attendanceRoutes = useMemo(() => [
    "/hrms/admindashboard/attendancemain",
    "/hrms/admindashboard/monthly-report"
  ], []);

  const appsRoutes = useMemo(() => [
    "/hrms/admindashboard/eventadmin",
    "/hrms/admindashboard/assestadmin",
    "/hrms/admindashboard/awardsadmin",
    "/hrms/admindashboard/visitorbook",
    "/hrms/admindashboard/holidaysadmin"
  ], []);

  const confirmationRoutes = useMemo(() => [
    "/hrms/admindashboard/parametercreation",
    "/hrms/admindashboard/employeeconfirmationMain",
    "/hrms/admindashboard/performanceTable",
    "/hrms/admindashboard/dashboardConfirmation"
  ], []);

  const payrollRoutes = useMemo(() => [
    "/hrms/admindashboard/DashboardPayroll",
    "/hrms/admindashboard/PayrollSetupManagement"
  ], []);

  const leaveRoutes = useMemo(() => [
    "/hrms/admindashboard/leaverequest",
    "/hrms/admindashboard/mainLeave",
    "/hrms/admindashboard/leaveSetup"
  ], []);

  const attendanceReportRoutes = useMemo(() => [
    "/hrms/admindashboard/DailyAttendanceReport",
    "/hrms/admindashboard/MonthlyAttendanceReprt",
    "/hrms/admindashboard/MonthlyPunchINOUT"
  ], []);

  const leaveReportRoutes = useMemo(() => [
    "/hrms/admindashboard/AllEmpLeaveReports",
    "/hrms/admindashboard/annualLeaveReport",
    "/hrms/admindashboard/departmentWiseLeaveReport",
    "/hrms/admindashboard/employeeAnnualLeaveReport",
    "/hrms/admindashboard/employeePendingLeaveReport",
    "/hrms/admindashboard/monthlyleaveReport",
    "/hrms/admindashboard/LeaveBalanceReport"
  ], []);

  const payrollReportRoutes = useMemo(() => [
    "/hrms/admindashboard/payrollSummaryReport",
    "/hrms/admindashboard/taxDeductionReport",
    "/hrms/admindashboard/bonusPaymentReport",
    "/hrms/admindashboard/loanDeductionReport"
  ], []);

  const confirmationReportRoutes = useMemo(() => [
    "/hrms/admindashboard/confirmationStatusReport",
    "/hrms/admindashboard/employeePerformanceReport",
    "/hrms/admindashboard/confirmationProcessReport"
  ], []);

  const reportsRoutes = useMemo(() => [
    ...attendanceReportRoutes,
    ...leaveReportRoutes,
    ...payrollReportRoutes,
    ...confirmationReportRoutes,
    "/hrms/admindashboard/NewJoinerReport",
    "/hrms/admindashboard/annualManpowerReport",
    "/hrms/admindashboard/employeeAttritionReport",
    "/hrms/admindashboard/hrMasterDataReport",
    "/hrms/admindashboard/employeeConfirmationReport",
    "/hrms/admindashboard/employeeLeavePatternReport",
    "/hrms/admindashboard/employeePipReport",
    "/hrms/admindashboard/employeeExitReport",
    "/hrms/admindashboard/AnnualManpowerReport",
    "/hrms/admindashboard/EmployeeAttritionReport",
    "/hrms/admindashboard/PerformanceManagementReport",
    "/hrms/admindashboard/AnnualAppraisalReport",
    "/hrms/admindashboard/PromotionReport",
    "/hrms/admindashboard/GratuityEligibilityReport",
    "/hrms/admindashboard/PFReport",
    "/hrms/admindashboard/SalaryReport",
    "/hrms/admindashboard/EmpPayrollSalaryReport",
    "/hrms/admindashboard/EmpPayrollSalaryReport",
    "/hrms/admindashboard/PTReport",
    "/hrms/admindashboard/EmpMasterDataReport",
    "/hrms/admindashboard/Recruitmenttracker",
  ], [attendanceReportRoutes, leaveReportRoutes, payrollReportRoutes, confirmationReportRoutes]);

  const handleMenuClick = (menuName) => {
    setOpenMenu(prevOpenMenu => (prevOpenMenu === menuName ? null : menuName));
  };

  const handleAttendanceReportClick = () => {
    setAttendanceReportOpen(!attendanceReportOpen);
  };

  const handleLeaveReportClick = () => {
    setLeaveReportOpen(!leaveReportOpen);
  };

  const handlePayrollReportClick = () => {
    setPayrollReportOpen(!payrollReportOpen);
  };

  const handleConfirmationReportClick = () => {
    setConfirmationReportOpen(!confirmationReportOpen);
  };

  const handleNavigation = (route) => {
    navigate(route);
  };

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
          cursor: "pointer",
          backgroundColor: '#F58E35',
          ...(isMobileOnly && {
            zIndex: (theme) => theme.zIndex.drawer + 2,
            position: 'absolute',
          }),
        },
      }}
      variant={isMobileOnly ? "temporary" : "persistent"}
      anchor="left"
      open={open}
      ModalProps={isMobileOnly ? {
        keepMounted: true,
        onBackdropClick: toggleDrawer,
      } : {}}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          p: 1,
          minHeight: 64,
          backgroundColor: '#F58E35',
          color: '#FFFFFF',
        }}
      >
        <Box sx={{
          backgroundColor: 'white',
          borderRadius: '4px',
          padding: '4px',
          display: 'flex',
          alignItems: 'center',
          ml: 1
        }}>
          <Link to="/hrms/admindashboard/home">
            <img
              src={tdtlLogo || "/placeholder.svg"}
              alt="TDTL Logo"
              style={{
                height: "40px",
                width: "auto",
                cursor: "pointer",
                display: "block",
              }}
            />
          </Link>
        </Box>
        {/* <IconButton onClick={toggleDrawer} sx={{ color: 'inherit' }}>
          <ChevronLeftIcon />
        </IconButton> */}
      </Box>
      <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.2)'}} />
      <List sx={{
          p: 1,
          overflowY: 'auto',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
      }}>
        <ActiveListItem
          button
          onClick={() => handleNavigation("/hrms/admindashboard/home")}
          selected={isActive("/hrms/admindashboard/home")}
          hasactivechild={false}
        >
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ActiveListItem>

        <ActiveListItem
          button
          onClick={() => handleMenuClick('employees')}
          selected={false}
          hasactivechild={hasActiveChild(employeeRoutes)}
        >
          <ListItemIcon>
            <GroupIcon />
          </ListItemIcon>
          <ListItemText primary="Employees" />
          {openMenu === 'employees' ? <ExpandLess /> : <ExpandMore />}
        </ActiveListItem>
        <Collapse in={openMenu === 'employees'} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ActiveListItem
              button
              sx={{ pl: 4 }}
              onClick={() => handleNavigation("/hrms/admindashboard/employeesMain")}
              selected={isActive("/hrms/admindashboard/employeesMain")}
              hasactivechild={false}
            >
              <ListItemText primary="Dashboard" />
            </ActiveListItem>
            <ActiveListItem
              button
              sx={{ pl: 4 }}
              onClick={() => handleNavigation("/hrms/admindashboard/employees")}
              selected={isActive("/hrms/admindashboard/employees")}
              hasactivechild={false}
            >
              <ListItemText primary="Employees List" />
            </ActiveListItem>
            <ActiveListItem
              button
              sx={{ pl: 4 }}
              onClick={() => handleNavigation("/hrms/admindashboard/shifts")}
              selected={isActive("/hrms/admindashboard/shifts")}
              hasactivechild={false}
            >
              <ListItemText primary="Shifts & Scheduling" />
            </ActiveListItem>
            <ActiveListItem
              button
              sx={{ pl: 4 }}
              onClick={() => handleNavigation("/hrms/admindashboard/employeeexits")}
              selected={isActive("/hrms/admindashboard/employeeexits")}
              hasactivechild={false}
            >
              <ListItemText primary="Employees Exit" />
            </ActiveListItem>
          </List>
        </Collapse>

        <ActiveListItem
          button
          onClick={() => handleMenuClick('coreHR')}
          selected={false}
          hasactivechild={hasActiveChild(coreHRRoutes)}
        >
          <ListItemIcon>
            <WorkIcon />
          </ListItemIcon>
          <ListItemText primary="Core HR" />
          {openMenu === 'coreHR' ? <ExpandLess /> : <ExpandMore />}
        </ActiveListItem>
        <Collapse in={openMenu === 'coreHR'} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ActiveListItem
              button
              sx={{ pl: 4 }}
              onClick={() => handleNavigation("/hrms/admindashboard/corehrdashboard")}
              selected={isActive("/hrms/admindashboard/corehrdashboard")}
              hasactivechild={false}
            >
              <ListItemText primary="Dashboard" />
            </ActiveListItem>


            <ActiveListItem
              button
              sx={{ pl: 4 }}
              onClick={() => handleNavigation("/hrms/admindashboard/role")}
              selected={isActive("/hrms/admindashboard/role")}
              hasactivechild={false}
            >
              <ListItemText primary="Create Role" />
            </ActiveListItem>

            <ActiveListItem
              button
              sx={{ pl: 4 }}
              onClick={() => handleNavigation("/hrms/admindashboard/companydetails")}
              selected={isActive("/hrms/admindashboard/companydetails")}
              hasactivechild={false}
            >
              <ListItemText primary="Company Details" />
            </ActiveListItem>



            <ActiveListItem
              button
              sx={{ pl: 4 }}
              onClick={() => handleNavigation("/hrms/admindashboard/employeehub")}
              selected={isActive("/hrms/admindashboard/employeehub")}
              hasactivechild={false}
            >
              <ListItemText primary="Holiday Hub" />
            </ActiveListItem>



            <ActiveListItem
              button
              sx={{ pl: 4 }}
              onClick={() => handleNavigation("/hrms/admindashboard/department")}
              selected={isActive("/hrms/admindashboard/department")}
              hasactivechild={false}
            >
              <ListItemText primary="Department" />
            </ActiveListItem>
            <ActiveListItem
              button
              sx={{ pl: 4 }}
              onClick={() => handleNavigation("/hrms/admindashboard/designation")}
              selected={isActive("/hrms/admindashboard/designation")}
              hasactivechild={false}
            >
              <ListItemText primary="Designation" />
            </ActiveListItem>
            <ActiveListItem
              button
              sx={{ pl: 4 }}
              onClick={() => handleNavigation("/hrms/admindashboard/division")}
              selected={isActive("/hrms/admindashboard/division")}
              hasactivechild={false}
            >
              <ListItemText primary="Division" />
            </ActiveListItem>
            <ActiveListItem
              button
              sx={{ pl: 4 }}
              onClick={() => handleNavigation("/hrms/admindashboard/grade")}
              selected={isActive("/hrms/admindashboard/grade")}
              hasactivechild={false}
            >
              <ListItemText primary="Grade" />
            </ActiveListItem>
            {/* <ActiveListItem
              button
              sx={{ pl: 4 }}
              onClick={() => handleNavigation("/hrms/admindashboard/payrollSetup")}
              selected={isActive("/hrms/admindashboard/payrollSetup")}
              hasactivechild={false}
            >
              <ListItemText primary="Pay Roll Set Up" />
            </ActiveListItem> */}
            <ActiveListItem
              button
              sx={{ pl: 4 }}
              onClick={() => handleNavigation("/hrms/admindashboard/headquaters")}
              selected={isActive("/hrms/admindashboard/headquaters")}
              hasactivechild={false}
            >
              <ListItemText primary="Headquaters" />
            </ActiveListItem>
            <ActiveListItem
              button
              sx={{ pl: 4 }}
              onClick={() => handleNavigation("/hrms/admindashboard/makeannouncement")}
              selected={isActive("/hrms/admindashboard/makeannouncement")}
              hasactivechild={false}
            >
              <ListItemText primary="Make Announcement" />
            </ActiveListItem>
          </List>
        </Collapse>

        <ActiveListItem
          button
          onClick={() => handleMenuClick('policyManagement')}
          selected={false}
          hasactivechild={hasActiveChild(policyRoutes)}
        >
          <ListItemIcon>
            <PolicyIcon />
          </ListItemIcon>
          <ListItemText primary="Policy Management" />
          {openMenu === 'policyManagement' ? <ExpandLess /> : <ExpandMore />}
        </ActiveListItem>
        <Collapse in={openMenu === 'policyManagement'} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ActiveListItem
              button
              sx={{ pl: 4 }}
              onClick={() => handleNavigation("/hrms/admindashboard/policies")}
              selected={isActive("/hrms/admindashboard/policies")}
              hasactivechild={false}
            >
              <ListItemText primary="Policies" />
            </ActiveListItem>
            <ActiveListItem
              button
              sx={{ pl: 4 }}
              onClick={() => handleNavigation("/hrms/admindashboard/policyDashboard")}
              selected={isActive("/hrms/admindashboard/policyDashboard")}
              hasactivechild={false}
            >
              <ListItemText primary="Policy Dashboard" />
            </ActiveListItem>
            <ActiveListItem
              button
              sx={{ pl: 4 }}
              onClick={() => handleNavigation("/hrms/admindashboard/policyallocation")}
              selected={isActive("/hrms/admindashboard/policyallocation")}
              hasactivechild={false}
            >
              <ListItemText primary="Policy Allocation" />
            </ActiveListItem>
          </List>
        </Collapse>

        <ActiveListItem
          button
          onClick={() => handleMenuClick('attendance')}
          selected={false}
          hasactivechild={hasActiveChild(attendanceRoutes)}
        >
          <ListItemIcon>
            <CalendarTodayIcon />
          </ListItemIcon>
          <ListItemText primary="Attendance" />
          {openMenu === 'attendance' ? <ExpandLess /> : <ExpandMore />}
        </ActiveListItem>
        <Collapse in={openMenu === 'attendance'} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ActiveListItem
              button
              sx={{ pl: 4 }}
              onClick={() => handleNavigation("/hrms/admindashboard/attendancemain")}
              selected={isActive("/hrms/admindashboard/attendancemain")}
              hasactivechild={false}
            >
              <ListItemText primary="Daily Attendance" />
            </ActiveListItem>
            <ActiveListItem
              button
              sx={{ pl: 4 }}
              onClick={() => handleNavigation("/hrms/admindashboard/monthly-report")}
              selected={isActive("/hrms/admindashboard/monthly-report")}
              hasactivechild={false}
            >
              <ListItemText primary="Monthly Report" />
            </ActiveListItem>
          </List>
        </Collapse>

        <ActiveListItem
          button
          onClick={() => handleMenuClick('apps')}
          selected={false}
          hasactivechild={hasActiveChild(appsRoutes)}
        >
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Apps" />
          {openMenu === 'apps' ? <ExpandLess /> : <ExpandMore />}
        </ActiveListItem>
        <Collapse in={openMenu === 'apps'} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ActiveListItem
              button
              sx={{ pl: 4 }}
              onClick={() => handleNavigation("/hrms/admindashboard/eventadmin")}
              selected={isActive("/hrms/admindashboard/eventadmin")}
              hasactivechild={false}
            >
              <ListItemText primary="Events" />
            </ActiveListItem>
            <ActiveListItem
              button
              sx={{ pl: 4 }}
              onClick={() => handleNavigation("/hrms/admindashboard/assestadmin")}
              selected={isActive("/hrms/admindashboard/assestadmin")}
              hasactivechild={false}
            >
              <ListItemText primary="Assets" />
            </ActiveListItem>
            <ActiveListItem
              button
              sx={{ pl: 4 }}
              onClick={() => handleNavigation("/hrms/admindashboard/awardsadmin")}
              selected={isActive("/hrms/admindashboard/awardsadmin")}
              hasactivechild={false}
            >
              <ListItemText primary="Awards" />
            </ActiveListItem>
            <ActiveListItem
              button
              sx={{ pl: 4 }}
              onClick={() => handleNavigation("/hrms/admindashboard/visitorbook")}
              selected={isActive("/hrms/admindashboard/visitorbook")}
              hasactivechild={false}
            >
              <ListItemText primary="Visitor Book" />
            </ActiveListItem>
            <ActiveListItem
              button
              sx={{ pl: 4 }}
              onClick={() => handleNavigation("/hrms/admindashboard/holidaysadmin")}
              selected={isActive("/hrms/admindashboard/holidaysadmin")}
              hasactivechild={false}
            >
              <ListItemText primary="Holidays" />
            </ActiveListItem>
          </List>
        </Collapse>

        <ActiveListItem
          button
          onClick={() => handleMenuClick('confirmation')}
          selected={false}
          hasactivechild={hasActiveChild(confirmationRoutes)}
        >
          <ListItemIcon>
            <PersonAddIcon />
          </ListItemIcon>
          <ListItemText primary="Employee Confirmation" />
          {openMenu === 'confirmation' ? <ExpandLess /> : <ExpandMore />}
        </ActiveListItem>
        <Collapse in={openMenu === 'confirmation'} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ActiveListItem
              button
              sx={{ pl: 4 }}
              onClick={() => handleNavigation("/hrms/admindashboard/parametercreation")}
              selected={isActive("/hrms/admindashboard/parametercreation")}
              hasactivechild={false}
            >
              <ListItemText primary="Parameter Creation" />
            </ActiveListItem>
            <ActiveListItem
              button
              sx={{ pl: 4 }}
              onClick={() => handleNavigation("/hrms/admindashboard/employeeconfirmationMain")}
              selected={isActive("/hrms/admindashboard/employeeconfirmationMain")}
              hasactivechild={false}
            >
              <ListItemText primary="Confirmation Form" />
            </ActiveListItem>
            <ActiveListItem
              button
              sx={{ pl: 4 }}
              onClick={() => handleNavigation("/hrms/admindashboard/performanceTable")}
              selected={isActive("/hrms/admindashboard/performanceTable")}
              hasactivechild={false}
            >
              <ListItemText primary="Performance Table" />
            </ActiveListItem>
            <ActiveListItem
              button
              sx={{ pl: 4 }}
              onClick={() => handleNavigation("/hrms/admindashboard/dashboardConfirmation")}
              selected={isActive("/hrms/admindashboard/dashboardConfirmation")}
              hasactivechild={false}
            >
              <ListItemText primary="Dashboard Confirmation" />
            </ActiveListItem>
          </List>
        </Collapse>

        <ActiveListItem
          button
          onClick={() => handleMenuClick('payroll')}
          selected={false}
          hasactivechild={hasActiveChild(payrollRoutes)}
        >
          <ListItemIcon>
            <AccountBalanceWalletIcon />
          </ListItemIcon>
          <ListItemText primary="Payroll" />
          {openMenu === 'payroll' ? <ExpandLess /> : <ExpandMore />}
        </ActiveListItem>
        <Collapse in={openMenu === 'payroll'} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ActiveListItem
              button
              sx={{ pl: 4 }}
              onClick={() => handleNavigation("/hrms/admindashboard/DashboardPayroll")}
              selected={isActive("/hrms/admindashboard/DashboardPayroll")}
              hasactivechild={false}
            >
              <ListItemText primary="Dashboard" />
            </ActiveListItem>
            <ActiveListItem
              button
              sx={{ pl: 4 }}
              onClick={() => handleNavigation("/hrms/admindashboard/PayrollSetupManagement")}
              selected={isActive("/hrms/admindashboard/PayrollSetupManagement")}
              hasactivechild={false}
            >
              <ListItemText primary="Payroll Setup Configuration" />
            </ActiveListItem>

            <ActiveListItem button sx={{ pl: 4 }}
              hasactivechild={false}
              selected={isActive("/hrms/admindashboard/payrollReport")}
              onClick={() => handleNavigation("/hrms/admindashboard/payrollReport")}>
              <ListItemText primary="Payroll Reports" />
            </ActiveListItem>
          </List>
        </Collapse>

        <ActiveListItem
          button
          onClick={() => handleMenuClick('leaveManagement')}
          selected={false}
          hasactivechild={hasActiveChild(leaveRoutes)}
        >
          <ListItemIcon>
            <AddBoxIcon />
          </ListItemIcon>
          <ListItemText primary="Leave Management" />
          {openMenu === 'leaveManagement' ? <ExpandLess /> : <ExpandMore />}
        </ActiveListItem>
        <Collapse in={openMenu === 'leaveManagement'} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ActiveListItem
              button
              sx={{ pl: 4 }}
              onClick={() => handleNavigation("/hrms/admindashboard/leaverequest")}
              selected={isActive("/hrms/admindashboard/leaverequest")}
              hasactivechild={false}
            >
              <ListItemText primary="Leave Request" />
            </ActiveListItem>
            <ActiveListItem
              button
              sx={{ pl: 4 }}
              onClick={() => handleNavigation("/hrms/admindashboard/mainLeave")}
              selected={isActive("/hrms/admindashboard/mainLeave")}
              hasactivechild={false}
            >
              <ListItemText primary="Leave Dashboard" />
            </ActiveListItem>
            <ActiveListItem
              button
              sx={{ pl: 4 }}
              onClick={() => handleNavigation("/hrms/admindashboard/leaveSetup")}
              selected={isActive("/hrms/admindashboard/leaveSetup")}
              hasactivechild={false}
            >
              <ListItemText primary="Leave Set Up" />
            </ActiveListItem>
          </List>
        </Collapse>


        <ActiveListItem
          button
          onClick={() => handleNavigation("/hrms/admindashboard/MetricsFromAdmin")}
          selected={isActive("/hrms/admindashboard/MetricsFromAdmin")}
          hasactivechild={false}
        >
          <ListItemIcon>
            <HelpIcon />
          </ListItemIcon>
          <ListItemText primary="Metrics Form " />
        </ActiveListItem>


        <ActiveListItem
          button
          onClick={() => handleNavigation("/hrms/admindashboard/ExitandTerminationAd")}
          selected={isActive("/hrms/admindashboard/ExitandTerminationAd")}
          hasactivechild={false}
        >
          <ListItemIcon>
           <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Exit Dashboard " />
        </ActiveListItem>

        <ActiveListItem
          button
          onClick={() => handleMenuClick('reports')}
          selected={false}
          hasactivechild={hasActiveChild(reportsRoutes)}
        >
          <ListItemIcon>
            <SummarizeIcon />
          </ListItemIcon>
          <ListItemText primary="Reports" />
          {openMenu === 'reports' ? <ExpandLess /> : <ExpandMore />}
        </ActiveListItem>
        <Collapse in={openMenu === 'reports'} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>

            <ActiveListItem
              button
              sx={{ pl: 4 }}
              onClick={() => handleNavigation("/hrms/admindashboard/NewJoinerReport")}
              selected={isActive("/hrms/admindashboard/NewJoinerReport")}
              hasactivechild={false}
            >
              <ListItemIcon>
                <InsertDriveFileIcon />
              </ListItemIcon>
              <ListItemText primary="New Joiner Report" />
            </ActiveListItem>

            <ActiveListItem
              button
              sx={{ pl: 4 }}
              onClick={() => handleNavigation("/hrms/admindashboard/annualManpowerReport")}
              selected={isActive("/hrms/admindashboard/annualManpowerReport")}
              hasactivechild={false}
            >
              <ListItemIcon>
                <InsertDriveFileIcon />
              </ListItemIcon>
              <ListItemText primary="Annual Manpower Report" />
            </ActiveListItem>

            <ActiveListItem
              button
              sx={{ pl: 4 }}
              onClick={() => handleNavigation("/hrms/admindashboard/employeeAttritionReport")}
              selected={isActive("/hrms/admindashboard/employeeAttritionReport")}
              hasactivechild={false}
            >
              <ListItemIcon>
                <InsertDriveFileIcon />
              </ListItemIcon>
              <ListItemText primary="Employee Attrition Rate Report" />
            </ActiveListItem>

            <ActiveListItem
              button
              sx={{ pl: 4 }}
              onClick={() => handleNavigation("/hrms/admindashboard/hrMasterDataReport")}
              selected={isActive("/hrms/admindashboard/hrMasterDataReport")}
              hasactivechild={false}
            >
              <ListItemIcon>
                <InsertDriveFileIcon />
              </ListItemIcon>
              <ListItemText primary="HR Master Data Report" />
            </ActiveListItem>





            <ActiveListItem
              button
              sx={{ pl: 4 }}
              onClick={() => handleNavigation("/hrms/admindashboard/Recruitmenttracker")}
              selected={isActive("/hrms/admindashboard/Recruitmenttracker")}
              hasactivechild={false}
            >
              <ListItemIcon>
                <InsertDriveFileIcon />
              </ListItemIcon>
              <ListItemText primary="Recruitment Tracker Report" />
            </ActiveListItem>


            <ActiveListItem
              button
              sx={{ pl: 4 }}
              onClick={() => handleNavigation("/hrms/admindashboard/employeeConfirmationReport")}
              selected={isActive("/hrms/admindashboard/employeeConfirmationReport")}
              hasactivechild={false}
            >
              <ListItemIcon>
                <InsertDriveFileIcon />
              </ListItemIcon>
              <ListItemText primary="Employee Confirmation Report" />
            </ActiveListItem>



            <ActiveListItem
              button
              sx={{ pl: 4 }}
              onClick={() => handleNavigation("/hrms/admindashboard/employeePipReport")}
              selected={isActive("/hrms/admindashboard/employeePipReport")}
              hasactivechild={false}
            >
              <ListItemIcon>
                <InsertDriveFileIcon />
              </ListItemIcon>
              <ListItemText primary="Employee PIP Report" />
            </ActiveListItem>


            <ActiveListItem
              button
              sx={{ pl: 6 }}
              onClick={() => handleNavigation("/hrms/admindashboard/employeeExitReport")}
              selected={isActive("/hrms/admindashboard/employeeExitReport")}
              hasactivechild={false}
            >
              <ListItemIcon>
                <InsertDriveFileIcon />
              </ListItemIcon>
              <ListItemText primary="Employee Exit Report" />
            </ActiveListItem>




            <ActiveListItem
              button
              sx={{ pl: 6 }}
              onClick={() => handleNavigation("/hrms/admindashboard/PerformanceManagementReport")}
              selected={isActive("/hrms/admindashboard/PerformanceManagementReport")}
              hasactivechild={false}
            >
              <ListItemIcon>
                <InsertDriveFileIcon />
              </ListItemIcon>
              <ListItemText primary="Performance Management Report" />
            </ActiveListItem>

            <ActiveListItem
              button
              sx={{ pl: 6 }}
              onClick={() => handleNavigation("/hrms/admindashboard/AnnualAppraisalReport")}
              selected={isActive("/hrms/admindashboard/AnnualAppraisalReport")}
              hasactivechild={false}
            >
              <ListItemIcon>
                <InsertDriveFileIcon />
              </ListItemIcon>
              <ListItemText primary="Annual Appraisal Report" />
            </ActiveListItem>


            <ActiveListItem
              button
              sx={{ pl: 6 }}
              onClick={() => handleNavigation("/hrms/admindashboard/PromotionReport")}
              selected={isActive("/hrms/admindashboard/PromotionReport")}
              hasactivechild={false}
            >
              <ListItemIcon>
                <InsertDriveFileIcon />
              </ListItemIcon>
              <ListItemText primary="Promotion Report" />
            </ActiveListItem>


            <ActiveListItem
              button
              sx={{ pl: 6 }}
              onClick={() => handleNavigation("/hrms/admindashboard/GratuityEligibilityReport")}
              selected={isActive("/hrms/admindashboard/GratuityEligibilityReport")}
              hasactivechild={false}
            >
              <ListItemIcon>
                <InsertDriveFileIcon />
              </ListItemIcon>
              <ListItemText primary="Gratuity Eligibility Report" />
            </ActiveListItem>



            <ActiveListItem
              button
              sx={{ pl: 6 }}
              onClick={() => handleNavigation("/hrms/admindashboard/EmpMasterDataReport")}
              selected={isActive("/hrms/admindashboard/EmpMasterDataReport")}
              hasactivechild={false}
            >
              <ListItemIcon>
                <InsertDriveFileIcon />
              </ListItemIcon>
              <ListItemText primary="Employee Master Data Report" />
            </ActiveListItem>

            <ActiveListItem
              button
              sx={{ pl: 4 }}
              onClick={handleAttendanceReportClick}
              selected={false}
              hasactivechild={hasActiveChild(attendanceReportRoutes)}
            >
              <ListItemIcon>
                <CalendarTodayIcon />
              </ListItemIcon>
              <ListItemText primary="Attendance Reports" />
              {attendanceReportOpen ? <ExpandLess /> : <ExpandMore />}
            </ActiveListItem>
            <Collapse in={attendanceReportOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ActiveListItem
                  button
                  sx={{ pl: 6 }}
                  onClick={() => handleNavigation("/hrms/admindashboard/DailyAttendanceReport")}
                  selected={isActive("/hrms/admindashboard/DailyAttendanceReport")}
                  hasactivechild={false}
                >
                  <ListItemIcon>
                    <InsertDriveFileIcon />
                  </ListItemIcon>
                  <ListItemText primary="Daily Attendance Report" />
                </ActiveListItem>
                <ActiveListItem
                  button
                  sx={{ pl: 6 }}
                  onClick={() => handleNavigation("/hrms/admindashboard/MonthlyAttendanceReprt")}
                  selected={isActive("/hrms/admindashboard/MonthlyAttendanceReprt")}
                  hasactivechild={false}
                >
                  <ListItemIcon>
                    <InsertDriveFileIcon />
                  </ListItemIcon>
                  <ListItemText primary="Monthly Attendance Report" />
                </ActiveListItem>
                <ActiveListItem
                  button
                  sx={{ pl: 6 }}
                  onClick={() => handleNavigation("/hrms/admindashboard/MonthlyPunchINOUT")}
                  selected={isActive("/hrms/admindashboard/MonthlyPunchINOUT")}
                  hasactivechild={false}
                >
                  <ListItemIcon>
                    <InsertDriveFileIcon />
                  </ListItemIcon>
                  <ListItemText primary="Monthly Punch IN/OUT" />
                </ActiveListItem>
              </List>
            </Collapse>

            <ActiveListItem
              button
              sx={{ pl: 4 }}
              onClick={handleLeaveReportClick}
              selected={false}
              hasactivechild={hasActiveChild(leaveReportRoutes)}
            >
              <ListItemIcon>
                <AddBoxIcon />
              </ListItemIcon>
              <ListItemText primary="Leave Reports" />
              {leaveReportOpen ? <ExpandLess /> : <ExpandMore />}
            </ActiveListItem>
            <Collapse in={leaveReportOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ActiveListItem
                  button
                  sx={{ pl: 6 }}
                  onClick={() => handleNavigation("/hrms/admindashboard/AllEmpLeaveReports")}
                  selected={isActive("/hrms/admindashboard/AllEmpLeaveReports")}
                  hasactivechild={false}
                >
                  <ListItemIcon>
                    <InsertDriveFileIcon />
                  </ListItemIcon>
                  <ListItemText primary="All Employee Leave Summary Report" />
                </ActiveListItem>

                <ActiveListItem
                  button
                  sx={{ pl: 4 }}
                  onClick={() => handleNavigation("/hrms/admindashboard/employeeLeavePatternReport")}
                  selected={isActive("/hrms/admindashboard/employeeLeavePatternReport")}
                  hasactivechild={false}
                >
                  <ListItemIcon>
                    <InsertDriveFileIcon />
                  </ListItemIcon>
                  <ListItemText primary="Employee Leave Pattern Report" />
                </ActiveListItem>


                <ActiveListItem
                  button
                  sx={{ pl: 6 }}
                  onClick={() => handleNavigation("/hrms/admindashboard/monthlyleaveReport")}
                  selected={isActive("/hrms/admindashboard/monthlyleaveReport")}
                  hasactivechild={false}
                >
                  <ListItemIcon>
                    <InsertDriveFileIcon />
                  </ListItemIcon>
                  <ListItemText primary="Monthly Leave Report" />
                </ActiveListItem>
                <ActiveListItem
                  button
                  sx={{ pl: 6 }}
                  onClick={() => handleNavigation("/hrms/admindashboard/LeaveBalanceReport")}
                  selected={isActive("/hrms/admindashboard/LeaveBalanceReport")}
                  hasactivechild={false}
                >
                  <ListItemIcon>
                    <InsertDriveFileIcon />
                  </ListItemIcon>
                  <ListItemText primary="Leave Balance Report" />
                </ActiveListItem>
              </List>
            </Collapse>

            <ActiveListItem
              button
              sx={{ pl: 4 }}
              onClick={handlePayrollReportClick}
              selected={false}
              hasactivechild={hasActiveChild(payrollReportRoutes)}
            >
              <ListItemIcon>
                <AccountBalanceWalletIcon />
              </ListItemIcon>
              <ListItemText primary="Payroll Reports" />
              {payrollReportOpen ? <ExpandLess /> : <ExpandMore />}
            </ActiveListItem>
            <Collapse in={payrollReportOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
               
                <ActiveListItem
                  button
                  sx={{ pl: 6 }}
                  onClick={() => handleNavigation("/hrms/admindashboard/PFReport")}
                  selected={isActive("/hrms/admindashboard/PFReport")}
                  hasactivechild={false}
                >
                  <ListItemIcon>
                    <InsertDriveFileIcon />
                  </ListItemIcon>
                  <ListItemText primary="PF Report" />
                </ActiveListItem>



                <ActiveListItem
                  button
                  sx={{ pl: 6 }}
                  onClick={() => handleNavigation("/hrms/admindashboard/PTReport")}
                  selected={isActive("/hrms/admindashboard/PTReport")}
                  hasactivechild={false}
                >
                  <ListItemIcon>
                    <InsertDriveFileIcon />
                  </ListItemIcon>
                  <ListItemText primary="PT Report" />
                </ActiveListItem>



                <ActiveListItem
                  button
                  sx={{ pl: 6 }}
                  onClick={() => handleNavigation("/hrms/admindashboard/SalaryReport")}
                  selected={isActive("/hrms/admindashboard/SalaryReport")}
                  hasactivechild={false}
                >
                  <ListItemIcon>
                    <InsertDriveFileIcon />
                  </ListItemIcon>
                  <ListItemText primary="Salary Report" />
                </ActiveListItem>




                <ActiveListItem
                  button
                  sx={{ pl: 6 }}
                  onClick={() => handleNavigation("/hrms/admindashboard/EmpPayrollSalaryReport")}
                  selected={isActive("/hrms/admindashboard/EmpPayrollSalaryReport")}
                  hasactivechild={false}
                >
                  <ListItemIcon>
                    <InsertDriveFileIcon />
                  </ListItemIcon>
                  <ListItemText primary="Payroll Salary Report" />
                </ActiveListItem>
              </List>
            </Collapse>
          </List>
        </Collapse>

        <ActiveListItem
          button
          onClick={() => handleNavigation("/hrms/admindashboard/resignpaneladmin")}
          selected={isActive("/hrms/admindashboard/resignpaneladmin")}
          hasactivechild={false}
        >
          <ListItemIcon>
            <PersonRemoveIcon />
          </ListItemIcon>
          <ListItemText primary="Resignation" />
        </ActiveListItem>

        <ActiveListItem
          button
          onClick={() => handleNavigation("/hrms/admindashboard/helpdesk")}
          selected={isActive("/hrms/admindashboard/helpdesk")}
          hasactivechild={false}
        >
          <ListItemIcon>
            <HelpIcon />
          </ListItemIcon>
          <ListItemText primary="HelpDesk" />
        </ActiveListItem>
      </List>
    </Drawer>


       <IconButton
        onClick={toggleDrawer}
        sx={{
          position: "fixed",
          top: 80,
          // Move the button along with the drawer
          left: open ? `${drawerWidth}px` : 0,
          backgroundColor: "#F58E35",
          color: "white",
          "&:hover": { backgroundColor: "#e0792d" },
          zIndex: (theme) => theme.zIndex.drawer + 3, // Make it higher than mobile drawer
          // Add transition for smooth movement
          transition: (theme) =>
            theme.transitions.create("left", {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
          // "Tag" like styling
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
          borderTopRightRadius: 16,
          borderBottomRightRadius: 16,
        }}
      >
        {/* Change icon based on sidebar state */}
        {open ? <ChevronLeftIcon /> : <MenuIcon />}
      </IconButton>

   </>
   


  );
}