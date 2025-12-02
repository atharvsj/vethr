// import React from 'react';
// import './App.css';
// import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// import DashboardAdmin from './DashboardSuperAdmin';
// import DashboardEmployee from './DashboardEmployee';
// import DashboardHr from './DashboardHr';
// import DashboardIntern from "./DashboardIntern";
// import Login from './Auth/LoginPage';


// import HomeView from "./SuperAdmin/AdminHomeView";
// import AdminAttendanceView from "./SuperAdmin/AdminAttendanceView";
// import MonthlyReport from "./SuperAdmin/AdminMonthlyReport";
// import AdminEmployeesView from "./SuperAdmin/Employee/AdminEmployeesView";
// import RolesView from "./SuperAdmin/Employee/Roles";
// import ShiftsView from "./SuperAdmin/Employee/Shifts";
// import EmployeeExit from "./SuperAdmin/Employee/EmployeeExit";
// import ManualAttendance from "./SuperAdmin/AdminManualAttendance";
// import OvertimeRequest from "./SuperAdmin/AdminOvertimeRequest";
// import Account from "./SuperAdmin/Finance/Accounts";
// import Department from "./SuperAdmin/CoreHR/Department";
// import Designation from "./SuperAdmin/CoreHR/Designation";
// import Policies from "./SuperAdmin/CoreHR/Policies";
// import MakeAnnouncement from "./SuperAdmin/CoreHR/MakeAnnouncement";
// import OrganizationChart from "./SuperAdmin/CoreHR/OrganizationChart";
// import Monitoring from "./SuperAdmin/AdminMonitoring";
// import Tasks from "./SuperAdmin/AdminTasks";
// import Projects from "./SuperAdmin/AdminProjects";
// import ManageClients from "./SuperAdmin/AdminManageClients";
// import ManageLeads from "./SuperAdmin/AdminLeads";
// import Deposit from "./SuperAdmin/Finance/Deposit";
// import Transactions from "./SuperAdmin/Finance/Transactions";
// import Expense from "./SuperAdmin/Finance/Expense";
// import Payroll from "./SuperAdmin/Payroll/Payroll";
// import PayslipHistory from "./SuperAdmin/Payroll/PayslipHistory";
// import AdvanceSalary from "./SuperAdmin/Payroll/AdvanceSalary";
// import Loan from "./SuperAdmin/Payroll/Loan";
// import PerformanceIndicator from "./SuperAdmin/Performances/PerformanceIndicator";
// import PerformanceAppraisal from "./SuperAdmin/Performances/PerformanceAppraisal";
// import Competencies from "./SuperAdmin/Performances/Competencies";
// import BillingInvoices from "./SuperAdmin/Invoices/BillingInvoices";
// import InvoicePayments from "./SuperAdmin/Invoices/InvoicePayment";
// import TaxType from "./SuperAdmin/Invoices/TaxType";
// import CalendarPage from "./SuperAdmin/Invoices/Calendar";
// import GoalsCalendar from "./SuperAdmin/Performances/GoalsCalendar";
// import EstimateCalendar from "./SuperAdmin/Estimates/EstimateCalendar";
// import Estimates from "./SuperAdmin/Estimates/Estimates";
// import LeaveRequest from "./SuperAdmin/AdminLeaveRequest";
// import TrainingSession from "./SuperAdmin/TrainingSections/TrainingSession";
// import TrainingCalendar from "./SuperAdmin/TrainingSections/TrainingCalendar";
// import TrainingSkills from "./SuperAdmin/TrainingSections/TrainingSkills";
// import Trainers from "./SuperAdmin/TrainingSections/Trainers";
// import DisciplinaryCases from "./SuperAdmin/Disciplinary Cases/DisciplinaryCases";
// import CaseType from "./SuperAdmin/Disciplinary Cases/CaseType";
// import GoalType from "./SuperAdmin/Performances/GoalType";
// import TrackGoals from "./SuperAdmin/Performances/TrackGoals";
// import NewOpenings from "./SuperAdmin/Recruitement/NewOpenings";
// import Candidates from "./SuperAdmin/Recruitement/Candidates";
// import Interviews from "./SuperAdmin/Recruitement/Interviews";
// import Promotions from "./SuperAdmin/Recruitement/Promotions";
// import EventAdmin from "./SuperAdmin/Apps/EventsAdmin";
// import AwardsAdmin from "./SuperAdmin/Apps/AwardsAdmin";
// import AssestAdmin from "./SuperAdmin/Apps/AssestsAdmin";
// import HolidaysAdmin from './SuperAdmin/Apps/Holidays';
// import TravelsHome from './SuperAdmin/Travels/TravelsHome';
// import TravelArrangemntAdmin from './SuperAdmin/Travels/AdminArrangementTravels';
// import PayrollReport from "./SuperAdmin/Payroll/PayrollReport";
// import BankStatement from "./SuperAdmin/Payroll/BankStatement";
// import VisitorBook from './SuperAdmin/Apps/VistorBook';
// import ConfirmationReport from "./SuperAdmin/Payroll/ConfirmationReport";
// import SalaryStructureReport from "./SuperAdmin/Payroll/SalaryStructureReport";
// import PfReport from "./SuperAdmin/Payroll/PfReport";
// import PtReport from "./SuperAdmin/Payroll/PtReport";
// import YTDEmployeeSalaryReport from "./SuperAdmin/Payroll/YTDEmployeeSalaryReport";
// import ConfirmationList from "./SuperAdmin/Payroll/ConfirmationList";
// import DashboardPayroll from "./SuperAdmin/Payroll/DashboardPayroll";
// import AttendanceReport from "./SuperAdmin/Payroll/AttendanceReport";
// import PayrollSalaryReport from "./SuperAdmin/Payroll/PayrollSalaryReport";
// import Assets from "./SuperAdmin/Apps/Assets";
// import Category from "./SuperAdmin/Apps/Category";
// import Brands from "./SuperAdmin/Apps/Brands";
// import Helpdesk from './SuperAdmin/Helpdesk';
// import ResignPanel from './SuperAdmin/ResignAdminPanel';
// import DailyMonitoringData from './SuperAdmin/MonitorningPMD/DailyMonitoringData';
// import DashboardMonitoringPMD from './SuperAdmin/MonitorningPMD/Dashboard';
// import EmployeeListPMD from './SuperAdmin/MonitorningPMD/EmployeeList';
// import ViewReportPMD from './SuperAdmin/MonitorningPMD/ViewReport';


// import HomeViewEmp from './EmployeePortal/HomeViewEmp';
// import AttendanceViewEmp from './EmployeePortal/AttendanceViewEmp';
// import HolidayViewEmp from './EmployeePortal/HolidayViewEmp';
// import ProjectsViewEmp from './EmployeePortal/ProjectsViewEmp';
// import TasksViewEmp from './EmployeePortal/TasksViewEmp';
// import LeaveRequestViewEmp from './EmployeePortal/LeaveRequestViewEmp';
// import LeaveTypeEmp from './EmployeePortal/LeaveTypeEmp';
// import MonthlyReportEmp from './EmployeePortal/MonthlyReportEmp';
// import PoliciesEmp from './EmployeePortal/PoliciesEmp';
// import HelpdeskEmp from './EmployeePortal/HelpDeskEmp';
// import AppsCompEmp from './EmployeePortal/AppsCompEmp';
// import AssestEmp from './EmployeePortal/AssestEmp';
// import AwardsEmp from './EmployeePortal/AwardsEmp';
// import DocumentsEmp from './EmployeePortal/DocumentsEmp';
// import ResignationManagementEmp from './EmployeePortal/ResignationPageEmp';
// import PayRollEmp from "./EmployeePortal/PayRollEmp";
// import AssetsEmp from "./EmployeePortal/AssetsEmp";
// import CategoryEmp from "./EmployeePortal/CategoryEmp";
// import BrandEmp from "./EmployeePortal/BrandEmp";
// import ProjectDetail from "./EmployeePortal/ProjectDetail";



// import HomeViewHr from './HrPortal/HomeViewHr';
// import ActiveEmpHr from './HrPortal/ActiveEmpHr';
// import AttendanceViewHr from './HrPortal/AttendanceViewHr';
// import MonthlyReportHr from './HrPortal/MonthlyReportHr';
// import HolidayViewHr from './HrPortal/HolidayViewHr';
// import ProjectsViewHr from './HrPortal/ProjectViewHr';
// import TasksViewHr from './HrPortal/TaskViewHr';
// import LeaveManagementHr from './HrPortal/LeaveRequestViewHr';
// import LeaveTypeHr from './HrPortal/LeaveTypeHr';
// import PoliciesHr from './HrPortal/PoliciesHr';
// import EventsHr from './HrPortal/EventsHr';
// import AssestHr from './HrPortal/AssestHr';
// import AwardsHr from './HrPortal/AwardsHr';
// import DocumentsHr from './HrPortal/DocumentsHr';
// import ResignationHr from './HrPortal/ResignationPageHr';
// import HelpdeskHr from './HrPortal/HelpDeskHr';
// import PayRollHr from './HrPortal/PayRollHr';
// import YtdEmployeeSalaryReport from './SuperAdmin/Payroll/YTDEmployeeSalaryReport';
// // import LeaveRequestViewHr from './HrPortal/LeaveRequestViewHr';


// import HomeViewIntern from "./InternPortal/HomeViewIntern";
// import AttendanceViewIntern from "./InternPortal/AttendanceViewIntern";
// import MonthlyReportIntern from "./InternPortal/MonthlyReportIntern";
// import HolidayViewIntern from "./InternPortal/HolidayViewIntern";
// import ProjectsViewIntern from "./InternPortal/ProjectsViewIntern";
// import TasksViewIntern from "./InternPortal/TasksViewIntern";
// import HelpdeskIntern from "./InternPortal/HelpDeskIntern";
// import DisciplinaryIntern from "./InternPortal/DisciplinaryIntern";
// import EmployeeDetail from './SuperAdmin/Employee/EmployeeDetail';

// import { Outlet } from 'react-router-dom';
// import ChatBot from './ChatBot';

// const InternLayout = () => {
//   return (
//     <>
//       <Outlet />
//       <ChatBot />
//     </>
//   );
// };

// function App() {
//   const router = createBrowserRouter([
//     {
//       path: "/",
//       element: <Login />
//     },
//     {
//       path: "/dashboard", 
//       element: <DashboardEmployee />,
//       children: [
//         {
//           element: <InternLayout />,
//           children: [
//             {
//               path: "home", 
//               element: <HomeViewEmp />,
//             },
//             {
//               path: "attendance",
//               element: <AttendanceViewEmp />,
//             },
//             {
//               path: "monthly-report", 
//               element: <MonthlyReportEmp />,
//             },
//             {
//               path: "holiday", 
//               element: <HolidayViewEmp />,
//             },
//             {
//               path: "projects", 
//               element: <ProjectsViewEmp />,
//             },
//             {
//               path: "projectdetail", 
//               element: <ProjectDetail />,
//             },
//             {
//               path: "tasks", 
//               element: <TasksViewEmp />,
//             },
//             {
//               path: "leave-request", 
//               element: <LeaveRequestViewEmp />,
//             },  
//             {
//               path: "leavetype", 
//               element: <LeaveTypeEmp />,
//             },
//             {
//               path: "policies",
//               element: <PoliciesEmp />,
//             },
//             {
//               path: "helpdesk", 
//               element: <HelpdeskEmp />,
//             },
//             {
//               path: "appscomp", 
//               element: <AppsCompEmp />,
//             },
//             {
//               path: "assest", 
//               element: <AssestEmp />,
//             }, {
//               path: "assetsemp", // Overtime request inside the dashboard
//               element: <AssetsEmp />,
//             },
//             {
//               path: "categoryemp", // Overtime request inside the dashboard
//               element: <CategoryEmp />,
//             },
//             {
//               path: "brandemp", // Overtime request inside the dashboard
//               element: <BrandEmp />,
//             },
//             {
//               path: "award", 
//               element: <AwardsEmp />,
//             },
//             {
//               path: "document", 
//               element: <DocumentsEmp />,
//             },

//             {
//               path: "resignation", 
//               element: <ResignationManagementEmp />,
//             },
//             {
//               path: "payroll", 
//               element: <PayRollEmp />,
//             },

//           ],
//         },
//       ],

//     },
//     {
//       path: "/admindashboard", // Dashboard Layout for all the child routes
//       element: <DashboardAdmin />,
//       children: [
//         {
//           element: <InternLayout />,
//           children: [
//             {
//               path: "home", // Home view inside the dashboard
//               element: <HomeView />,
//             },
//             {
//               path: "attendance", // Attendance view inside the dashboard
//               element: <AdminAttendanceView />,
//             },
//             {
//               path: "monthly-report", // Monthly Report view inside the dashboard
//               element: <MonthlyReport />,
//             },
//             {
//               path: "employees", // Employees view inside the dashboard
//               element: <AdminEmployeesView />,
//             },
//             {
//               path: "employeedetail", // Employees view inside the dashboard
//               element: <EmployeeDetail/>,
//             },
//             {
//               path: "roles", // Employees view inside the dashboard
//               element: <RolesView />,
//             },
//             {
//               path: "shifts", // Employees view inside the dashboard
//               element: <ShiftsView />,
//             },
//             {
//               path: "employeeexits", // Employees view inside the dashboard
//               element: <EmployeeExit />,
//             },
//             {
//               path: "manual-attendance", // Manual Attendance view inside the dashboard
//               element: <ManualAttendance />,
//             },
//             {
//               path: "overtime-request", // Overtime request inside the dashboard
//               element: <OvertimeRequest />,
//             },
//             {
//               path: "department", // Overtime request inside the dashboard
//               element: <Department />,
//             },
//             {
//               path: "designation", // Overtime request inside the dashboard
//               element: <Designation />,
//             },
//             {
//               path: "policies", // Overtime request inside the dashboard
//               element: <Policies />,
//             },
//             {
//               path: "makeannouncement", // Overtime request inside the dashboard
//               element: <MakeAnnouncement />,
//             },
//             {
//               path: "organizationchart", // Overtime request inside the dashboard
//               element: <OrganizationChart />,
//             },
//             {
//               path: "eventadmin", // Overtime request inside the dashboard
//               element: <EventAdmin />,
//             },
//             {
//               path: "assestadmin", // Overtime request inside the dashboard
//               element: <AssestAdmin />,
//             },
//             {
//               path: "assets", // Overtime request inside the dashboard
//               element: <Assets />,
//             },
//             {
//               path: "category", // Overtime request inside the dashboard
//               element: <Category />,
//             },
//             {
//               path: "brand", // Overtime request inside the dashboard
//               element: <Brands />,
//             },
//             {
//               path: "awardsadmin", // Overtime request inside the dashboard
//               element: <AwardsAdmin />,
//             }, 
//             {
//               path: "visitorbook", // Overtime request inside the dashboard
//               element: <VisitorBook />,
//             }, 
//             {
//               path: "holidaysadmin", // Overtime request inside the dashboard
//               element: <HolidaysAdmin />,
//             },
//             {
//               path: "travelshome", // Overtime request inside the dashboard
//               element: <TravelsHome />,
//             },
//             {
//               path: "travelsarrangment", // Overtime request inside the dashboard
//               element: <TravelArrangemntAdmin />,
//             },
//             {
//               path: "monitoring", // Overtime request inside the dashboard
//               element: <Monitoring />,
//             },
//             {
//               path: "dailyMonitoringData", // Overtime request inside the dashboard
//               element: <DailyMonitoringData />,
//             },
//             {
//               path: "dashboardPMD", // Overtime request inside the dashboard
//               element: <DashboardMonitoringPMD />,
//             },
//             {
//               path: "employeelist", // Overtime request inside the dashboard
//               element: <EmployeeListPMD />,
//             },
//             {
//               path: "view-report/:employeeId", // Overtime request inside the dashboard
//               element: <ViewReportPMD />,
//             },
//             {
//               path: "taskData", // Overtime request inside the dashboard
//               element: <Tasks />,
//             },
//             {
//               path: "projects", // Overtime request inside the dashboard
//               element: <Projects />,
//             },
//             {
//               path: "manageclients", // Overtime request inside the dashboard
//               element: <ManageClients />,
//             },
//             {
//               path: "manageleads", // Overtime request inside the dashboard
//               element: <ManageLeads />,
//             },
//             {
//               path: "account", // Overtime request inside the dashboard
//               element: <Account />,
//             },
//             {
//               path: "deposit", // Overtime request inside the dashboard
//               element: <Deposit />,
//             },
//             {
//               path: "expense", // Overtime request inside the dashboard
//               element: <Expense />,
//             },
//             {
//               path: "transactions", // Overtime request inside the dashboard
//               element: <Transactions />,
//             },
//             {
//               path: "payroll", // Overtime request inside the dashboard
//               element: <Payroll />,
//             },
//             {
//               path: "payrollReport",
//               element:<PayrollReport/>,
//             },
//             {
//               path: "bankStatement",
//               element:<BankStatement/>,
//             },
//             {
//               path: "ConfirmationReport",
//               element:<ConfirmationReport/>,
//             },
//             {
//               path: "SalaryStructureReport",
//               element:<SalaryStructureReport/>,
//             },
//             {
//               path: "PfReport",
//               element:<PfReport/>,
//             },
//             {
//               path: "PtReport",
//               element:<PtReport/>,
//             },
//              {
//               path: "YtdEmployeeSalaryReport",
//               element:<YTDEmployeeSalaryReport/>,
//             }, 
//             {
//               path: "ConfirmationList",
//               element:<ConfirmationList/>,
//             },
//             {
//               path: "DashboardPayroll",
//               element:<DashboardPayroll/>,
//             },
//             {
//               path: "AttendanceReport",
//               element:<AttendanceReport/>,
//             },   
//             {
//               path: "PayrollSalaryReport",
//               element:<PayrollSalaryReport/>,
//             },
//             {
//               path: "paysliphistory", // Overtime request inside the dashboard
//               element: <PayslipHistory />,
//             },
//             {
//               path: "advancesalary", // Overtime request inside the dashboard
//               element: <AdvanceSalary />,
//             },
//             {
//               path: "loan", // Overtime request inside the dashboard
//               element: <Loan />,
//             },
//             //
//             {
//               path: "billinginvoices", // Overtime request inside the dashboard
//               element: <BillingInvoices />,
//             },

//             {
//               path: "calendar", // Overtime request inside the dashboard
//               element: <CalendarPage />,
//             },
//             {
//               path: "invoicepayments", // Overtime request inside the dashboard
//               element: <InvoicePayments />,
//             },
//             {
//               path: "taxtype", // Overtime request inside the dashboard
//               element: <TaxType />,
//             },
//             {
//               path: "estimates", // Overtime request inside the dashboard
//               element: <Estimates />,
//             },
//             {
//               path: "estimatescalendar", // Overtime request inside the dashboard
//               element: <EstimateCalendar />,
//             },
//             {
//               path: "leaverequest", // Overtime request inside the dashboard
//               element: <LeaveRequest />,
//             },
//             {
//               path: "trainingsessions", // Overtime request inside the dashboard
//               element: <TrainingSession />,
//             },
//             {
//               path: "trainers", // Overtime request inside the dashboard
//               element: <Trainers />,
//             },
//             {
//               path: "training-skills", // Overtime request inside the dashboard
//               element: <TrainingSkills />,
//             },
//             {
//               path: "training-calendar", // Overtime request inside the dashboard
//               element: <TrainingCalendar />,
//             },
//             {
//               path: "disciplinary-cases", // Overtime request inside the dashboard
//               element: <DisciplinaryCases />,
//             },
//             {
//               path: "case-type", // Overtime request inside the dashboard
//               element: <CaseType />,
//             },
//             {
//               path: "kpi-indicator", // Overtime request inside the dashboard
//               element: <PerformanceIndicator />,
//             },
//             {
//               path: "kpi-appraisal", // Overtime request inside the dashboard
//               element: <PerformanceAppraisal />,
//             },
//             {
//               path: "competencies", // Overtime request inside the dashboard
//               element: <Competencies />,
//             },
//             {
//               path: "goalscalendar", // Overtime request inside the dashboard
//               element: <GoalsCalendar />,
//             },
//             {
//               path: "goaltype", // Overtime request inside the dashboard
//               element: <GoalType />,
//             },
//             {
//               path: "trackgoals", // Overtime request inside the dashboard
//               element: <TrackGoals />,
//             },
//             {
//               path: "payroll", // Overtime request inside the dashboard
//               element: <Payroll />,
//             },
//             {
//               path: "paysliphistory", // Overtime request inside the dashboard
//               element: <PayslipHistory />,
//             },
//             {
//               path: "newopenings", // Overtime request inside the dashboard
//               element: <NewOpenings />,
//             },
//             {
//               path: "candidates", // Overtime request inside the dashboard
//               element: <Candidates />,
//             },
//             {
//               path: "interviews", // Overtime request inside the dashboard
//               element: <Interviews />,
//             },
//             {
//               path: "helpdesk", // helpdesk
//               element: <Helpdesk />,
//             },
//             {
//               path: "resignpaneladmin", // helpdesk
//               element: <ResignPanel />,
//             },
//             {
//               path: "promotions", // Overtime request inside the dashboard
//               element: <Promotions />,
//             },
//           ],
//         },
//       ],

//     },
//     {
//       path: "/interndashboard",
//       element: <DashboardIntern />,
//       children:[
//         {
//           element: <InternLayout />,
//           children: [
//             {
//               path: "home",
//               element: <HomeViewIntern />,
//             },
//             {
//               path: "attendance",
//               element: <AttendanceViewIntern />,
//             },
//             {
//               path: "monthly-report",
//               element: <MonthlyReportIntern />,
//             },
//             {
//               path: "holiday",
//               element: <HolidayViewIntern />,
//             },
//             {
//               path: "projects",
//               element: <ProjectsViewIntern />,
//             },
//             {
//               path: "tasks",
//               element: <TasksViewIntern />,
//             },
//             {
//               path: "helpdesk",
//               element: <HelpdeskIntern />,
//             },
//             {
//               path: "disciplinary",
//               element: <DisciplinaryIntern />,
//             },
//           ],
//         },
//       ],

//     },

//     {
//       path: "/dashboardhr", 
//       element: <DashboardHr />,
//       children: [
//         {
//           element: <InternLayout />,
//           children: [
//             {
//               path: "home", 
//               element: <HomeViewHr />,
//             },
//             {
//               path: "employee", 
//               element: <ActiveEmpHr />,
//             },
//             {
//               path: "attendance", 
//               element: <AttendanceViewHr />,
//             },
//             {
//               path: "monthly-report", 
//               element: <MonthlyReportHr />,
//             },
//             {
//               path: "holiday-view", 
//               element: <HolidayViewHr />,
//             },
//             {
//               path: "projects", 
//               element: <ProjectsViewHr />,
//             },
//             {
//               path: "tasks", 
//               element: <TasksViewHr />,
//             },
//             {
//               path: "leave-request", 
//               element: <LeaveManagementHr />,
//             },
//             {
//               path: "leavetype", 
//               element: <LeaveTypeHr />,
//             },
//             {
//               path: "policies", 
//               element: <PoliciesHr />,
//             },
//             {
//               path: "eventshr", 
//               element: <EventsHr />,
//             },
//             {
//               path: "assesthr", 
//               element: <AssestHr />,
//             },
//             {
//               path: "awardshr", 
//               element: <AwardsHr />,
//             },
//             {
//               path: "documenthr", 
//               element: <DocumentsHr />,
//             },
//             {
//               path: "resignationhr", 
//               element: <ResignationHr />,
//             },
//             {
//               path: "helpdeskhr", 
//               element: <HelpdeskHr />,
//             },
//             {
//               path: "payrollhr", 
//               element: <PayRollHr />,
//             },

//           ],
//         },
//       ],

//     },


//   ]);

//   return (
//     <RouterProvider router={router} />
//   );
// }

// export default App;





// import React from "react";
// import "./App.css";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import DashboardAdmin from "./DashboardSuperAdmin";
// import DashboardEmployee from "./DashboardEmployee";
// import DashboardHr from "./DashboardHr";
// import DashboardIntern from "./DashboardIntern";
// import DashboardHead from "./DashboardHead";
// import DashboardLineManager from "./DashboardLineManager";

// import Login from "./Auth/LoginPage";
// import ForgotPasswordPage from "./Auth/ForgotPasswordPage.";
// import HomeView from "./SuperAdmin/AdminHomeView";
// import AdminAttendanceView from "./SuperAdmin/AdminAttendanceView";
// import MonthlyReport from "./SuperAdmin/AdminMonthlyReport";
// import AdminEmployeesView from "./SuperAdmin/Employee/AdminEmployeesView";
// import RolesView from "./SuperAdmin/Employee/Roles";
// import ShiftsView from "./SuperAdmin/Employee/Shifts";
// import EmployeeExit from "./SuperAdmin/Employee/EmployeeExit";
// import ManualAttendance from "./SuperAdmin/AdminManualAttendance";
// import OvertimeRequest from "./SuperAdmin/AdminOvertimeRequest";
// import Account from "./SuperAdmin/Finance/Accounts";
// import Department from "./SuperAdmin/CoreHR/Department";
// import Designation from "./SuperAdmin/CoreHR/Designation";
// import Headquarters from "./SuperAdmin/CoreHR/HeadQuaters";
// import Policies from "./SuperAdmin/CoreHR/Policies";
// import MakeAnnouncement from "./SuperAdmin/CoreHR/MakeAnnouncement";
// import OrganizationChart from "./SuperAdmin/CoreHR/OrganizationChart";
// import Monitoring from "./SuperAdmin/AdminMonitoring";
// import Tasks from "./SuperAdmin/AdminTasks";
// import Projects from "./SuperAdmin/AdminProjects";
// import ManageClients from "./SuperAdmin/AdminManageClients";
// import ManageLeads from "./SuperAdmin/AdminLeads";
// import Deposit from "./SuperAdmin/Finance/Deposit";
// import Transactions from "./SuperAdmin/Finance/Transactions";
// import Expense from "./SuperAdmin/Finance/Expense";
// import Payroll from "./SuperAdmin/Payroll/Payroll";
// import PayslipHistory from "./SuperAdmin/Payroll/PayslipHistory";
// import AdvanceSalary from "./SuperAdmin/Payroll/AdvanceSalary";
// import Loan from "./SuperAdmin/Payroll/Loan";
// import PerformanceIndicator from "./SuperAdmin/Performances/PerformanceIndicator";
// import PerformanceAppraisal from "./SuperAdmin/Performances/PerformanceAppraisal";
// import Competencies from "./SuperAdmin/Performances/Competencies";
// import BillingInvoices from "./SuperAdmin/Invoices/BillingInvoices";
// import InvoicePayments from "./SuperAdmin/Invoices/InvoicePayment";
// import TaxType from "./SuperAdmin/Invoices/TaxType";
// import CalendarPage from "./SuperAdmin/Invoices/Calendar";
// import GoalsCalendar from "./SuperAdmin/Performances/GoalsCalendar";
// import EstimateCalendar from "./SuperAdmin/Estimates/EstimateCalendar";
// import Estimates from "./SuperAdmin/Estimates/Estimates";
// import LeaveRequest from "./SuperAdmin/AdminLeaveRequest";
// import TrainingSession from "./SuperAdmin/TrainingSections/TrainingSession";
// import TrainingCalendar from "./SuperAdmin/TrainingSections/TrainingCalendar";
// import TrainingSkills from "./SuperAdmin/TrainingSections/TrainingSkills";
// import Trainers from "./SuperAdmin/TrainingSections/Trainers";
// import DisciplinaryCases from "./SuperAdmin/Disciplinary Cases/DisciplinaryCases";
// import CaseType from "./SuperAdmin/Disciplinary Cases/CaseType";
// import GoalType from "./SuperAdmin/Performances/GoalType";
// import TrackGoals from "./SuperAdmin/Performances/TrackGoals";
// import NewOpenings from "./SuperAdmin/Recruitement/NewOpenings";
// import Candidates from "./SuperAdmin/Recruitement/Candidates";
// import Interviews from "./SuperAdmin/Recruitement/Interviews";
// import Promotions from "./SuperAdmin/Recruitement/Promotions";
// import EventAdmin from "./SuperAdmin/Apps/EventsAdmin";
// import AwardsAdmin from "./SuperAdmin/Apps/AwardsAdmin";
// import AssestAdmin from "./SuperAdmin/Apps/AssestsAdmin";
// import HolidaysAdmin from "./SuperAdmin/Apps/Holidays";
// import TravelsHome from "./SuperAdmin/Travels/TravelsHome";
// import TravelArrangemntAdmin from "./SuperAdmin/Travels/AdminArrangementTravels";
// import PayrollReport from "./SuperAdmin/Payroll/PayrollReport";
// import BankStatement from "./SuperAdmin/Payroll/BankStatement";
// import VisitorBook from './SuperAdmin/Apps/VistorBook';
// import CoreHrDashboard from './SuperAdmin/CoreHR/DashboardCoreHr';
// import Division from "./SuperAdmin/CoreHR/Division";
// import Grade from "./SuperAdmin/CoreHR/Grade";
// import CompanyDetails from "./SuperAdmin/CoreHR/CompanyDetails";
// import EmployeeConfirmation from './SuperAdmin/EmployeeConfirmation/Confirmation';
// import PerformanceTable from './SuperAdmin/EmployeeConfirmation/PerformanceTable';
// import Marks from './SuperAdmin/EmployeeConfirmation/Marks';
// import MainEmployeeExit from './SuperAdmin/ExitEmployeeEmployee/main';
// import AssetDashboard from "./SuperAdmin/ExitEmployeeEmployee/AssetDashboard";
// import EmployeeExitProcess from "./SuperAdmin/ExitEmployeeEmployee/EmployeeExitProcess";
// import ExitDashboard from "./SuperAdmin/ExitEmployeeEmployee/ExitDashboard";
// import TerminationDashboard from "./SuperAdmin/ExitEmployeeEmployee/TerminationDashboard";

// import ConfirmationReport from "./SuperAdmin/Payroll/ConfirmationReport";
// import SalaryStructureReport from "./SuperAdmin/Payroll/SalaryStructureReport";
// import PfReport from "./SuperAdmin/Payroll/PfReport";
// import PtReport from "./SuperAdmin/Payroll/PtReport";
// import YTDEmployeeSalaryReport from "./SuperAdmin/Payroll/YTDEmployeeSalaryReport";
// import ConfirmationList from "./SuperAdmin/Payroll/ConfirmationList";
// import DashboardPayroll from "./SuperAdmin/Payroll/DashboardPayroll";
// import AttendanceReport from "./SuperAdmin/Payroll/AttendanceReport";
// import PayrollSalaryReport from "./SuperAdmin/Payroll/PayrollSalaryReport";
// import Assets from "./SuperAdmin/Apps/Assets";
// import Category from "./SuperAdmin/Apps/Category";
// import Brands from "./SuperAdmin/Apps/Brands";
// import Helpdesk from "./SuperAdmin/Helpdesk";
// import ResignPanel from "./SuperAdmin/ResignAdminPanel";
// import DailyMonitoringData from "./SuperAdmin/MonitorningPMD/DailyMonitoringData";
// import DashboardMonitoringPMD from "./SuperAdmin/MonitorningPMD/Dashboard";
// import EmployeeListPMD from "./SuperAdmin/MonitorningPMD/EmployeeList";
// import ViewReportPMD from "./SuperAdmin/MonitorningPMD/ViewReport";
// import { EmployeeIdProvider } from './SuperAdmin/Employee/EmployeeContext';
// import EmployeeDetailReport from "./SuperAdmin/Employee/EmployeeDetailReport";
// import EmployeeMasterReport from "./SuperAdmin/Employee/EmployeeMasterReport";
// import AnnualManpowerReport from "./SuperAdmin/Employee/AnnualManpowerReport";
// import DesignationDepartmentReport from "./SuperAdmin/Employee/DesignationDepartmantReport";
// import LeaveSetup from "./SuperAdmin/CoreHR/LeaveSetup";
// import PayrollSetup from "./SuperAdmin/CoreHR/PayrollSetup";
// import HolidayTBL from './SuperAdmin/LeavePanelDashboard/HolidayTBL';
// import LeaveManagementTable from './SuperAdmin/LeavePanelDashboard/LeaveManagementTable';
// import LeaveTypewiseTable from './SuperAdmin/LeavePanelDashboard/LeaveTypewiseTable';
// import MainLeave from './SuperAdmin/LeavePanelDashboard/Main';
// import PendingApprovalsTable from "./SuperAdmin/LeavePanelDashboard/PendingApprovalsTable";
// import AnnualLeaveReport from './SuperAdmin/Leave Reports/AnnualLeaveReport';
// import DepartmentWiseLeaveReport from './SuperAdmin/Leave Reports/DepartmentWiseLeaveReport';
// import EmployeeAnnualLeaveReport from './SuperAdmin/Leave Reports/EmployeeAnnualLeaveReport';
// import EmployeePendingLeaveReport from './SuperAdmin/Leave Reports/EmployeePendingLeaveReport';
// import MonthlyleaveReport from './SuperAdmin/Leave Reports/MonthlyLeaveReport';
// import BirthdayInMonth from './SuperAdmin/Employee/EmployeeDashbord/BirthdaysInMonth';
// import ConfirmationPending from './SuperAdmin/Employee/EmployeeDashbord/ConfirmationPending';
// import EmployeesMain from './SuperAdmin/Employee/EmployeeDashbord/EmployeesMain';
// import WorkAnniversary from "./SuperAdmin/Employee/EmployeeDashbord/WorkAnniversary";
// import AdminLeaveDetails from './SuperAdmin/LeaveDetails';
// import AdminAttendanceMain from './SuperAdmin/AttendanceSection/AttendanceMain';
// import Attendance1 from "./SuperAdmin/AttendanceSection/AttendanceFirst";
// import Attendance2 from "./SuperAdmin/AttendanceSection/AttendanceSecond";
// import DashboardConfirmation from './SuperAdmin/EmployeeConfirmation/DashboardConfirmation';
// import ConfirmationMain from "./SuperAdmin/EmployeeConfirmation/ConfirmationMain";
// import Parameter from './SuperAdmin/EmployeeConfirmation/ParameterCreation';
// import MainPayroll from './SuperAdmin/Pay Roll Managment/page';
// import PaymentInfo from "./SuperAdmin/Pay Roll Managment/payment-info";
// import PayrollSetupManagement from "./SuperAdmin/Pay Roll Managment/payroll-setup";
// import PayslipFinalization from "./SuperAdmin/Pay Roll Managment/payslip-finalization";
// import SalaryCalculation from "./SuperAdmin/Pay Roll Managment/salary-calculation";
// import PolicyAllocation from "./SuperAdmin/Policy/PolicyAllocation";


// import HomeViewEmp from "./EmployeePortal/HomeViewEmp";
// import AttendanceViewEmp from "./EmployeePortal/AttendanceViewEmp";
// import HolidayViewEmp from "./EmployeePortal/HolidayViewEmp";
// import ProjectsViewEmp from "./EmployeePortal/ProjectsViewEmp";
// import TasksViewEmp from "./EmployeePortal/TasksViewEmp";
// import LeaveRequestViewEmp from "./EmployeePortal/LeaveRequestViewEmp";
// import LeaveTypeEmp from "./EmployeePortal/LeaveTypeEmp";
// import MonthlyReportEmp from "./EmployeePortal/MonthlyReportEmp";
// import PoliciesEmp from "./EmployeePortal/PoliciesEmp";
// import HelpdeskEmp from "./EmployeePortal/HelpDeskEmp";
// import AppsCompEmp from "./EmployeePortal/AppsCompEmp";
// import AssestEmp from "./EmployeePortal/AssestEmp";
// import AwardsEmp from "./EmployeePortal/AwardsEmp";
// import DocumentsEmp from "./EmployeePortal/DocumentsEmp";
// import ResignationManagementEmp from "./EmployeePortal/ResignationPageEmp";
// import PayRollEmp from "./EmployeePortal/PayRollEmp";
// import AssetsEmp from "./EmployeePortal/AssetsEmp";
// import CategoryEmp from "./EmployeePortal/CategoryEmp";
// import BrandEmp from "./EmployeePortal/BrandEmp";
// import ProjectDetail from "./EmployeePortal/ProjectDetail";


// import HomeViewHead from "./HeadPortal/HomeViewHead";
// import AttendanceViewHead from "./HeadPortal/AttendanceViewHead";
// import HolidayViewHead from "./HeadPortal/HolidayViewHead";
// import ProjectsViewHead from "./HeadPortal/ProjectsViewHead";
// import TasksViewHead from "./HeadPortal/TasksViewHead";
// import LeaveRequestViewHead from "./HeadPortal/LeaveRequestViewHead";
// import LeaveTypeHead from "./HeadPortal/LeaveTypeHead";
// import MonthlyReportHead from "./HeadPortal/MonthlyReportHead";
// import PoliciesHead from "./HeadPortal/PoliciesHead";
// import HelpdeskHead from "./HeadPortal/HelpDeskHead";
// import AppsCompHead from "./HeadPortal/AppsCompHead";
// import AssestHead from "./HeadPortal/AssestHead";
// import AwardsHead from "./HeadPortal/AwardsHead";
// import DocumentsHead from "./HeadPortal/DocumentsHead";
// import ResignationManagementHead from "./HeadPortal/ResignationPageHead";
// import PayRollHead from "./HeadPortal/PayRollHead";
// import AssetsHead from "./HeadPortal/AssetsHead";
// import CategoryHead from "./HeadPortal/CategoryHead";
// import BrandHead from "./HeadPortal/BrandHead";
// import ProjectDetailHead from "./HeadPortal/ProjectDetailHead";
// import PerformanceTableHead from "./HeadPortal/EmployeeConfirmation/PerformanceTableHead";
// import MarksHead from "./HeadPortal/EmployeeConfirmation/MarksHead";


// import HomeViewLM from "./LineManagerPortal/HomeViewLM";
// import AttendanceViewLM from "./LineManagerPortal/AttendanceViewLM";
// import HolidayViewLM from "./LineManagerPortal/HolidayViewLM";
// import ProjectsViewLM from "./LineManagerPortal/ProjectsViewLM";
// import TasksViewLM from "./LineManagerPortal/TasksViewLM";
// import LeaveRequestViewLM from "./LineManagerPortal/LeaveRequestViewLM";
// import LeaveTypeLM from "./LineManagerPortal/LeaveTypeLM";
// import MonthlyReportLM from "./LineManagerPortal/MonthlyReportLM";
// import PoliciesLM from "./LineManagerPortal/PoliciesLM";
// import HelpdeskLM from "./LineManagerPortal/HelpDeskLM";
// import AppsCompLM from "./LineManagerPortal/AppsCompLM";
// import AssestLM from "./LineManagerPortal/AssestLM";
// import AwardsLM from "./LineManagerPortal/AwardsLM";
// import DocumentsLM from "./LineManagerPortal/DocumentsLM";
// import ResignationManagementLM from "./LineManagerPortal/ResignationPageLM";
// import PayRollLM from "./LineManagerPortal/PayRollLM";
// import AssetsLM from "./LineManagerPortal/AssetsLM";
// import CategoryLM from "./LineManagerPortal/CategoryLM";
// import BrandLM from "./LineManagerPortal/BrandLM";
// import ProjectDetailLM from "./LineManagerPortal/ProjectDetailLM";
// import PerformanceTableLM from "./LineManagerPortal/EmployeeConfirmation/PerformanceTableLM";
// import MarksLM from "./LineManagerPortal/EmployeeConfirmation/MarksLM";



// import HomeViewHr from "./HrPortal/HomeViewHr";
// import ActiveEmpHr from "./HrPortal/ActiveEmpHr";
// import AttendanceViewHr from "./HrPortal/AttendanceViewHr";
// import MonthlyReportHr from "./HrPortal/MonthlyReportHr";
// import HolidayViewHr from "./HrPortal/HolidayViewHr";
// import ProjectsViewHr from "./HrPortal/ProjectViewHr";
// import TasksViewHr from "./HrPortal/TaskViewHr";
// import LeaveManagementHr from "./HrPortal/LeaveRequestViewHr";
// import LeaveTypeHr from "./HrPortal/LeaveTypeHr";
// import PoliciesHr from "./HrPortal/PoliciesHr";
// import EventsHr from "./HrPortal/EventsHr";
// import AssestHr from "./HrPortal/AssestHr";
// import AwardsHr from "./HrPortal/AwardsHr";
// import DocumentsHr from "./HrPortal/DocumentsHr";
// import ResignationHr from "./HrPortal/ResignationPageHr";
// import HelpdeskHr from "./HrPortal/HelpDeskHr";
// import PayRollHr from "./HrPortal/PayRollHr";
// import ConfirmationEmployeeHr from './HrPortal/Confirmation';

// import YtdEmployeeSalaryReport from "./SuperAdmin/Payroll/YTDEmployeeSalaryReport";
// // import LeaveRequestViewHr from './HrPortal/LeaveRequestViewHr';
// import PolicyDashboard from "./SuperAdmin/CoreHR/PolicyDashboard";
// import HomeViewIntern from "./InternPortal/HomeViewIntern";
// import AttendanceViewIntern from "./InternPortal/AttendanceViewIntern";
// import MonthlyReportIntern from "./InternPortal/MonthlyReportIntern";
// import HolidayViewIntern from "./InternPortal/HolidayViewIntern";
// import ProjectsViewIntern from "./InternPortal/ProjectsViewIntern";
// import TasksViewIntern from "./InternPortal/TasksViewIntern";
// import HelpdeskIntern from "./InternPortal/HelpDeskIntern";
// import DisciplinaryIntern from "./InternPortal/DisciplinaryIntern";
// import EmployeeDetail from "./SuperAdmin/Employee/EmployeeDetail";
// import EmployeeHub from './SuperAdmin/CoreHR/EmployeeHub';
// import ProtectedRoute from "./Auth/ProtectedRoute";

// import { Outlet } from "react-router-dom";
// import ChatBot from "./ChatBot";

// const Layout = () => {
//   return (
//     <>
//       <Outlet />
//       {/* <ChatBot /> */}
//     </>
//   );
// };

// function App() {
//   const router = createBrowserRouter([
//     {
//       path: "/hrms",      
//       element: <Login />,
//     },
//     {
//       path: "/hrms/forgot-password",
//       element: <ForgotPasswordPage />,
//     },
//     {
//       path: "/hrms/dashboard",
//       element: <ProtectedRoute requiredRole="staff" />,
//       children: [
//         {
//           element: <DashboardEmployee />,
//           children: [
//             {
//               element: <Layout />,
//               children: [
//                 {
//                   path: "home",
//                   element: <HomeViewEmp />,
//                 },
//                 {
//                   path: "attendance",
//                   element: <AttendanceViewEmp />,
//                 },
//                 {
//                   path: "monthly-report",
//                   element: <MonthlyReportEmp />,
//                 },
//                 {
//                   path: "holiday",
//                   element: <HolidayViewEmp />,
//                 },
//                 {
//                   path: "projects",
//                   element: <ProjectsViewEmp />,
//                 },
//                 {
//                   path: "projectdetail",
//                   element: <ProjectDetail />,
//                 },
//                 {
//                   path: "tasks",
//                   element: <TasksViewEmp />,
//                 },
//                 {
//                   path: "leave-request",
//                   element: <LeaveRequestViewEmp />,
//                 },
//                 {
//                   path: "leavetype",
//                   element: <LeaveTypeEmp />,
//                 },
//                 {
//                   path: "policies",
//                   element: <PoliciesEmp />,
//                 },
//                 {
//                   path: "helpdesk",
//                   element: <HelpdeskEmp />,
//                 },
//                 {
//                   path: "appscomp",
//                   element: <AppsCompEmp />,
//                 },
//                 {
//                   path: "assest",
//                   element: <AssestEmp />,
//                 },
//                 {
//                   path: "assetsemp", // Overtime request inside the dashboard
//                   element: <AssetsEmp />,
//                 },
//                 {
//                   path: "categoryemp", // Overtime request inside the dashboard
//                   element: <CategoryEmp />,
//                 },
//                 {
//                   path: "brandemp", // Overtime request inside the dashboard
//                   element: <BrandEmp />,
//                 },
//                 {
//                   path: "award",
//                   element: <AwardsEmp />,
//                 },
//                 {
//                   path: "document",
//                   element: <DocumentsEmp />,
//                 },

//                 {
//                   path: "resignation",
//                   element: <ResignationManagementEmp />,
//                 },
//                 {
//                   path: "payroll",
//                   element: <PayRollEmp />,
//                 },
//               ],
//             },
//           ],
//         },
//       ],
//     },
//     {
//       path: "/hrms/dashboardHead",
//       element: <ProtectedRoute requiredRole="Head" />,
//       children: [
//         {
//           element: <DashboardHead />,
//           children: [
//             {
//               element: <Layout />,
//               children: [
//                 {
//                   path: "home",
//                   element: <HomeViewHead />,
//                 },
//                 {
//                   path: "attendance",
//                   element: <AttendanceViewHead />,
//                 },
//                 {
//                   path: "monthly-report",
//                   element: <MonthlyReportHead />,
//                 },
//                 {
//                   path: "holiday",
//                   element: <HolidayViewHead />,
//                 },
//                 {
//                   path: "projects",
//                   element: <ProjectsViewHead />,
//                 },
//                 {
//                   path: "projectdetail",
//                   element: <ProjectDetailHead />,
//                 },
//                 {
//                   path: "tasks",
//                   element: <TasksViewHead />,
//                 },
//                 {
//                   path: "leave-request",
//                   element: <LeaveRequestViewHead />,
//                 },
//                 {
//                   path: "leavetype",
//                   element: <LeaveTypeHead />,
//                 },
//                 {
//                   path: "policies",
//                   element: <PoliciesHead />,
//                 },
//                 {
//                   path: "helpdesk",
//                   element: <HelpdeskHead />,
//                 },
//                 {
//                   path: "appscomp",
//                   element: <AppsCompHead />,
//                 },
//                 {
//                   path: "assest",
//                   element: <AssestHead />,
//                 },
//                 {
//                   path: "assetsemp", // Overtime request inside the dashboard
//                   element: <AssetsHead />,
//                 },
//                 {
//                   path: "categoryemp", // Overtime request inside the dashboard
//                   element: <CategoryHead />,
//                 },
//                 {
//                   path: "brandemp", // Overtime request inside the dashboard
//                   element: <BrandHead />,
//                 },
//                 {
//                   path: "award",
//                   element: <AwardsHead />,
//                 },
//                 {
//                   path: "document",
//                   element: <DocumentsHead />,
//                 },

//                 {
//                   path: "resignation",
//                   element: <ResignationManagementHead />,
//                 },
//                 {
//                   path: "payroll",
//                   element: <PayRollHead />,
//                 },
//                 {
//                   path: "performanceTable", 
//                   element: <PerformanceTableHead />,
//                 },
//                 {
//                   path: "marks/:id",
//                   element: <MarksHead />,
//                 },
//               ],
//             },
//           ],
//         },
//       ],
//     },
//     {
//       path: "/hrms/dashboardLM",
//       element: <ProtectedRoute requiredRole="Line Manager" />,
//       children: [
//         {
//           element: <DashboardLineManager />,
//           children: [
//             {
//               element: <Layout />,
//               children: [
//                 {
//                   path: "home",
//                   element: <HomeViewLM />,
//                 },
//                 {
//                   path: "attendance",
//                   element: <AttendanceViewLM />,
//                 },
//                 {
//                   path: "monthly-report",
//                   element: <MonthlyReportLM />,
//                 },
//                 {
//                   path: "holiday",
//                   element: <HolidayViewLM />,
//                 },
//                 {
//                   path: "projects",
//                   element: <ProjectsViewLM />,
//                 },
//                 {
//                   path: "projectdetail",
//                   element: <ProjectDetailLM />,
//                 },
//                 {
//                   path: "tasks",
//                   element: <TasksViewLM />,
//                 },
//                 {
//                   path: "leave-request",
//                   element: <LeaveRequestViewLM />,
//                 },
//                 {
//                   path: "leavetype",
//                   element: <LeaveTypeLM />,
//                 },
//                 {
//                   path: "policies",
//                   element: <PoliciesLM />,
//                 },
//                 {
//                   path: "helpdesk",
//                   element: <HelpdeskLM />,
//                 },
//                 {
//                   path: "appscomp",
//                   element: <AppsCompLM />,
//                 },
//                 {
//                   path: "assest",
//                   element: <AssestLM />,
//                 },
//                 {
//                   path: "assetsemp", // Overtime request inside the dashboard
//                   element: <AssetsLM />,
//                 },
//                 {
//                   path: "categoryemp", // Overtime request inside the dashboard
//                   element: <CategoryLM />,
//                 },
//                 {
//                   path: "brandemp", // Overtime request inside the dashboard
//                   element: <BrandLM />,
//                 },
//                 {
//                   path: "award",
//                   element: <AwardsLM />,
//                 },
//                 {
//                   path: "document",
//                   element: <DocumentsLM />,
//                 },

//                 {
//                   path: "resignation",
//                   element: <ResignationManagementLM />,
//                 },
//                 {
//                   path: "payroll",
//                   element: <PayRollLM />,
//                 },
//                 {
//                   path: "performanceTable", 
//                   element: <PerformanceTableLM />,
//                 },
//                 {
//                   path: "marks/:id",
//                   element: <MarksLM />,
//                 },

//               ],
//             },
//           ],
//         },
//       ],
//     },

//     {
//       path: "/hrms/admindashboard", // Dashboard Layout for all the child routes
//       element: <ProtectedRoute requiredRole="Admin" />,
//       children: [
//         {
//           element: <DashboardAdmin />,
//           children: [
//             {
//               element: <Layout />,
//               children: [
//                 {
//                   path: "home", // Home view inside the dashboard
//                   element: <HomeView />,
//                 },
//                       {
//                   path: "mainemployeeexit", // Home view inside the dashboard
//                   element: <MainEmployeeExit />,
//                 },
//                                       {
//                   path: "assetdashboard", // Home view inside the dashboard
//                   element: <AssetDashboard />,
//                 },
//                                       {
//                   path: "employeeexitprocess", // Home view inside the dashboard
//                   element: <EmployeeExitProcess />,
//                 },
//                                       {
//                   path: "termination", // Home view inside the dashboard
//                   element: <TerminationDashboard />,
//                 },
//                                       {
//                   path: "exitdashboard", // Home view inside the dashboard
//                   element: <ExitDashboard />,
//                 },
//                                 {
//                   path: "MainPayroll", // Home view inside the dashboard
//                   element: <MainPayroll />,
//                 },
//                                 {
//                   path: "PaymentInfo", // Home view inside the dashboard
//                   element: <PaymentInfo />,
//                 },
//                                 {
//                   path: "PayrollSetupManagement", // Home view inside the dashboard
//                   element: <PayrollSetupManagement />,
//                 },
//                                 {
//                   path: "PayslipFinalization", // Home view inside the dashboard
//                   element: <PayslipFinalization />,
//                 },
//                                 {
//                   path: "SalaryCalculation", // Home view inside the dashboard
//                   element: <SalaryCalculation />,
//                 },
//                 {
//                   path: "attendance", // Attendance view inside the dashboard
//                   element: <AdminAttendanceView />,
//                 },
//                 {
//                   path: "monthly-report", // Monthly Report view inside the dashboard
//                   element: <MonthlyReport />,
//                 },
//                 {
//                   path: "employees", // Employees view inside the dashboard
//                   element: <AdminEmployeesView />,
//                 },
//                 {
//                   path: "employeedetail/:id", // Employees view inside the dashboard
//                   element: <EmployeeIdProvider> <EmployeeDetail/></EmployeeIdProvider>,
//                  },
//                 {
//                   path: "annualManpowerReport", // Employees view inside the dashboard
//                   element: <AnnualManpowerReport />,
//                 },
//                 {
//                   path: "designationVSdepartmentReport", // Employees view inside the dashboard
//                   element: <DesignationDepartmentReport />,
//                 },
//                 {
//                   path: "employeeDetailReport", // Employees view inside the dashboard
//                   element: <EmployeeDetailReport />,
//                 },
//                 {
//                   path: "employeeMasterReport", // Employees view inside the dashboard
//                   element: <EmployeeMasterReport />,
//                 },
//                 {
//                   path: "birthdayInMonth", // Employees view inside the dashboard
//                   element: <BirthdayInMonth />,
//                 },
//                 {
//                   path: "confirmationPending", // Employees view inside the dashboard
//                   element: <ConfirmationPending />,
//                 },
//                                 {
//                   path: "employeesMain", // Employees view inside the dashboard
//                   element: <EmployeesMain />,
//                 },
//                                 {
//                   path: "workAnniversary", // Employees view inside the dashboard
//                   element: <WorkAnniversary />,
//                 },

//                 {
//                   path: "roles", // Employees view inside the dashboard
//                   element: <RolesView />,
//                 },
//                 {
//                   path: "shifts", // Employees view inside the dashboard
//                   element: <ShiftsView />,
//                 },
//                 {
//                   path: "employeeexits", // Employees view inside the dashboard
//                   element: <EmployeeExit />,
//                 },
//                 {
//                   path: "manual-attendance", // Manual Attendance view inside the dashboard
//                   element: <ManualAttendance />,
//                 },
//                 {
//                   path: "overtime-request", // Overtime request inside the dashboard
//                   element: <OvertimeRequest />,
//                 },
//                 {
//                   path: "department", // Overtime request inside the dashboard
//                   element: <Department />,
//                 },
//                 {
//                   path: "designation", // Overtime request inside the dashboard
//                   element: <Designation />,
//                 },
//                                 {
//                   path: "corehrdashboard", 
//                   element: <CoreHrDashboard />,
//                 },
//                                 {
//                   path: "division", 
//                   element: <Division />,
//                 },
//                                 {
//                   path: "grade", 
//                   element: <Grade />,
//                 },
//                               {
//                   path: "employeehub", 
//                   element: <EmployeeHub />,
//                 },
//                                 {
//                   path: "companydetails", 
//                   element: <CompanyDetails />,
//                 },
//                 {
//                   path: "headquaters", // Overtime request inside the dashboard
//                   element: <Headquarters />,
//                 },
//                 {
//                   path: "policies", // Overtime request inside the dashboard
//                   element: <Policies />,
//                 },
//                  {
//                   path: "policyDashboard", // Overtime request inside the dashboard
//                   element: <PolicyDashboard />,
//                 },
//                  {
//           path: "payrollSetup", // Overtime request inside the dashboard
//           element: <PayrollSetup />,
//         },
//          {
//           path: "leaveSetup", // Overtime request inside the dashboard
//           element: <LeaveSetup />,
//         },
//                 {
//                   path: "makeannouncement", // Overtime request inside the dashboard
//                   element: <MakeAnnouncement />,
//                 },
//                 {
//                   path: "organizationchart", // Overtime request inside the dashboard
//                   element: <OrganizationChart />,
//                 },
//                 {
//                   path: "eventadmin", // Overtime request inside the dashboard
//                   element: <EventAdmin />,
//                 },
//                 {
//                   path: "assestadmin", // Overtime request inside the dashboard
//                   element: <AssestAdmin />,
//                 },
//                 {
//                   path: "assets", // Overtime request inside the dashboard
//                   element: <Assets />,
//                 },
//                 {
//                   path: "category", // Overtime request inside the dashboard
//                   element: <Category />,
//                 },
//                 {
//                   path: "brand", // Overtime request inside the dashboard
//                   element: <Brands />,
//                 },
//                 {
//                   path: "awardsadmin", // Overtime request inside the dashboard
//                   element: <AwardsAdmin />,
//                 },
//                             {
//               path: "visitorbook", // Overtime request inside the dashboard
//               element: <VisitorBook />,
//             }, 
//                 {
//                   path: "holidaysadmin", // Overtime request inside the dashboard
//                   element: <HolidaysAdmin />,
//                 },
//                 {
//                   path: "travelshome", // Overtime request inside the dashboard
//                   element: <TravelsHome />,
//                 },
//                 {
//                   path: "travelsarrangment", // Overtime request inside the dashboard
//                   element: <TravelArrangemntAdmin />,
//                 },
//                 {
//                   path: "monitoring", // Overtime request inside the dashboard
//                   element: <Monitoring />,
//                 },
//                 {
//                   path: "parametercreation", 
//                   element: <Parameter />,
//                 },
//                 {
//                   path: "employeeconfirmation", 
//                   element: <EmployeeConfirmation />,
//                 },
//                  {
//                   path: "performanceTable", 
//                   element: <PerformanceTable />,
//                 },

//                 {
//                   path: "marks/:id",
//                   element: <Marks />,
//                 },
//                 {
//                   path: "employeeconfirmationMain", 
//                   element: <ConfirmationMain />,
//                 },
//                 {
//                   path: "dailyMonitoringData", // Overtime request inside the dashboard
//                   element: <DailyMonitoringData />,
//                 },
//                 {
//                   path: "dashboardPMD", // Overtime request inside the dashboard
//                   element: <DashboardMonitoringPMD />,
//                 },
//                 {
//                   path: "employeelist", // Overtime request inside the dashboard
//                   element: <EmployeeListPMD />,
//                 },
//                 {
//                   path: "view-report/:employeeId", // Overtime request inside the dashboard
//                   element: <ViewReportPMD />,
//                 },
//                 {
//                   path: "taskData", // Overtime request inside the dashboard
//                   element: <Tasks />,
//                 },
//                 {
//                   path: "projects", // Overtime request inside the dashboard
//                   element: <Projects />,
//                 },
//                 {
//                   path: "manageclients", // Overtime request inside the dashboard
//                   element: <ManageClients />,
//                 },
//                 {
//                   path: "manageleads", // Overtime request inside the dashboard
//                   element: <ManageLeads />,
//                 },
//                 {
//                   path: "account", // Overtime request inside the dashboard
//                   element: <Account />,
//                 },
//                 {
//                   path: "deposit", // Overtime request inside the dashboard
//                   element: <Deposit />,
//                 },
//                 {
//                   path: "expense", // Overtime request inside the dashboard
//                   element: <Expense />,
//                 },
//                 {
//                   path: "transactions", // Overtime request inside the dashboard
//                   element: <Transactions />,
//                 },
//                 {
//                   path: "policyallocation",
//                   element: <PolicyAllocation />,
//                 },
//                 {
//                   path: "payroll", // Overtime request inside the dashboard
//                   element: <Payroll />,
//                 },
//                 {
//                   path: "payrollReport",
//                   element: <PayrollReport />,
//                 },
//                 {
//                   path: "bankStatement",
//                   element: <BankStatement />,
//                 },
//                 {
//                   path: "ConfirmationReport",
//                   element: <ConfirmationReport />,
//                 },
//                 {
//                   path: "dashboardConfirmation",
//                   element: <DashboardConfirmation />,
//                 },
//                 {
//                   path: "SalaryStructureReport",
//                   element: <SalaryStructureReport />,
//                 },
//                 {
//                   path: "PfReport",
//                   element: <PfReport />,
//                 },
//                 {
//                   path: "PtReport",
//                   element: <PtReport />,
//                 },
//                 {
//                   path: "YtdEmployeeSalaryReport",
//                   element: <YTDEmployeeSalaryReport />,
//                 },
//                 {
//                   path: "ConfirmationList",
//                   element: <ConfirmationList />,
//                 },
//                 {
//                   path: "DashboardPayroll",
//                   element: <DashboardPayroll />,
//                 },
//                 {
//                   path: "AttendanceReport",
//                   element: <AttendanceReport />,
//                 },
//                                 {
//                   path: "attendancemain",
//                   element: <AdminAttendanceMain />,
//                 },
//                  {
//                   path: "attendance1",
//                   element: <Attendance1 />,
//                 },
//                  {
//                   path: "attendance2",
//                   element: <Attendance2 />,
//                 },

//                 {
//                   path: "PayrollSalaryReport",
//                   element: <PayrollSalaryReport />,
//                 },

//                 {
//                   path: "paysliphistory", // Overtime request inside the dashboard
//                   element: <PayslipHistory />,
//                 },
//                 {
//                   path: "advancesalary", // Overtime request inside the dashboard
//                   element: <AdvanceSalary />,
//                 },
//                 {
//                   path: "loan", // Overtime request inside the dashboard
//                   element: <Loan />,
//                 },
//                 //
//                 {
//                   path: "billinginvoices", // Overtime request inside the dashboard
//                   element: <BillingInvoices />,
//                 },

//                 {
//                   path: "calendar", // Overtime request inside the dashboard
//                   element: <CalendarPage />,
//                 },
//                 {
//                   path: "invoicepayments", // Overtime request inside the dashboard
//                   element: <InvoicePayments />,
//                 },
//                 {
//                   path: "taxtype", // Overtime request inside the dashboard
//                   element: <TaxType />,
//                 },
//                 {
//                   path: "estimates", // Overtime request inside the dashboard
//                   element: <Estimates />,
//                 },
//                 {
//                   path: "estimatescalendar", // Overtime request inside the dashboard
//                   element: <EstimateCalendar />,
//                 },
//                 {
//                   path: "leaverequest", // Overtime request inside the dashboard
//                   element: <LeaveRequest />,
//                 },
//                 {
//                   path: "leavedetails/:id", // Overtime request inside the dashboard
//                   element: <AdminLeaveDetails />,
//                 },
//                                 {
//                   path: "holidayTBL", // Overtime request inside the dashboard
//                   element: <HolidayTBL />,
//                 },
//                                 {
//                   path: "leaveManagementTable", // Overtime request inside the dashboard
//                   element: <LeaveManagementTable />,
//                 },
//                                 {
//                   path: "leaveTypewiseTable", // Overtime request inside the dashboard
//                   element: <LeaveTypewiseTable />,
//                 },
//                                 {
//                   path: "mainLeave", // Overtime request inside the dashboard
//                   element: <MainLeave />,
//                 },
//                 {
//                   path: "pendingApprovalsTable", // Overtime request inside the dashboard
//                   element: <PendingApprovalsTable />,
//                 },
//                 {
//                   path: "annualLeaveReport", // Overtime request inside the dashboard
//                   element: <AnnualLeaveReport />,
//                 },
//                 {
//                   path: "departmentWiseLeaveReport", // Overtime request inside the dashboard
//                   element: <DepartmentWiseLeaveReport />,
//                 },
//                                                 {
//                   path: "employeeAnnualLeaveReport", // Overtime request inside the dashboard
//                   element: <EmployeeAnnualLeaveReport />,
//                 },
//                                                 {
//                   path: "employeePendingLeaveReport", // Overtime request inside the dashboard
//                   element: <EmployeePendingLeaveReport />,
//                 },
//                                                 {
//                   path: "monthlyleaveReport", // Overtime request inside the dashboard
//                   element: <MonthlyleaveReport />,
//                 },


//                 {
//                   path: "trainingsessions", // Overtime request inside the dashboard
//                   element: <TrainingSession />,
//                 },
//                 {
//                   path: "trainers", // Overtime request inside the dashboard
//                   element: <Trainers />,
//                 },
//                 {
//                   path: "training-skills", // Overtime request inside the dashboard
//                   element: <TrainingSkills />,
//                 },
//                 {
//                   path: "training-calendar", // Overtime request inside the dashboard
//                   element: <TrainingCalendar />,
//                 },
//                 {
//                   path: "disciplinary-cases", // Overtime request inside the dashboard
//                   element: <DisciplinaryCases />,
//                 },
//                 {
//                   path: "case-type", // Overtime request inside the dashboard
//                   element: <CaseType />,
//                 },
//                 {
//                   path: "kpi-indicator", // Overtime request inside the dashboard
//                   element: <PerformanceIndicator />,
//                 },
//                 {
//                   path: "kpi-appraisal", // Overtime request inside the dashboard
//                   element: <PerformanceAppraisal />,
//                 },
//                 {
//                   path: "competencies", // Overtime request inside the dashboard
//                   element: <Competencies />,
//                 },
//                 {
//                   path: "goalscalendar", // Overtime request inside the dashboard
//                   element: <GoalsCalendar />,
//                 },
//                 {
//                   path: "goaltype", // Overtime request inside the dashboard
//                   element: <GoalType />,
//                 },
//                 {
//                   path: "trackgoals", // Overtime request inside the dashboard
//                   element: <TrackGoals />,
//                 },
//                 {
//                   path: "payroll", // Overtime request inside the dashboard
//                   element: <Payroll />,
//                 },
//                 {
//                   path: "paysliphistory", // Overtime request inside the dashboard
//                   element: <PayslipHistory />,
//                 },
//                 {
//                   path: "newopenings", // Overtime request inside the dashboard
//                   element: <NewOpenings />,
//                 },
//                 {
//                   path: "candidates", // Overtime request inside the dashboard
//                   element: <Candidates />,
//                 },
//                 {
//                   path: "interviews", // Overtime request inside the dashboard
//                   element: <Interviews />,
//                 },
//                 {
//                   path: "helpdesk", // helpdesk
//                   element: <Helpdesk />,
//                 },
//                 {
//                   path: "resignpaneladmin", // helpdesk
//                   element: <ResignPanel />,
//                 },
//                 {
//                   path: "promotions", // Overtime request inside the dashboard
//                   element: <Promotions />,
//                 },
//               ],
//             },
//           ],
//         },
//       ],
//     },


//     {
//       path: "/hrms/interndashboard",
//       element: <ProtectedRoute requiredRole="Intern" />,
//       children: [
//         {
//           element: <DashboardIntern />, // dashboard layout
//           children: [
//             {
//               element: <Layout />, // includes Chatbot + Outlet
//               children: [
//                 { path: "home", element: <HomeViewIntern /> },
//                 { path: "attendance", element: <AttendanceViewIntern /> },
//                 { path: "monthly-report", element: <MonthlyReportIntern /> },
//                 { path: "holiday", element: <HolidayViewIntern /> },
//                 { path: "projects", element: <ProjectsViewIntern /> },
//                 { path: "tasks", element: <TasksViewIntern /> },
//                 { path: "helpdesk", element: <HelpdeskIntern /> },
//                 { path: "disciplinary", element: <DisciplinaryIntern /> },
//               ],
//             },
//           ],
//         },
//       ],
//     },
//     {
//       path: "/hrms/dashboardhr",
//       element: <ProtectedRoute requiredRole="HR" />,
//       children: [
//         {
//           element: <DashboardHr />,
//           children: [
//             {
//               element: <Layout />,
//               children: [
//                 { path: "home", element: <HomeViewHr /> },
//                 { path: "employee", element: <ActiveEmpHr /> },
//                 { path: "attendance", element: <AttendanceViewHr /> },
//                 { path: "monthly-report", element: <MonthlyReportHr /> },
//                 { path: "holiday-view", element: <HolidayViewHr /> },
//                 { path: "projects", element: <ProjectsViewHr /> },
//                 { path: "tasks", element: <TasksViewHr /> },
//                 { path: "leave-request", element: <LeaveManagementHr /> },
//                 { path: "leavetype", element: <LeaveTypeHr /> },
//                 { path: "policies", element: <PoliciesHr /> },
//                 { path: "eventshr", element: <EventsHr /> },
//                 { path: "assesthr", element: <AssestHr /> },
//                 { path: "awardshr", element: <AwardsHr /> },
//                 { path: "documenthr", element: <DocumentsHr /> },
//                 { path: "resignationhr", element: <ResignationHr /> },
//                 { path: "helpdeskhr", element: <HelpdeskHr /> },
//                 { path: "payrollhr", element: <PayRollHr /> },
//                 { path: "confirmation", element: <ConfirmationEmployeeHr /> },
//               ],
//             },
//           ],
//         },
//       ],
//     },
//   ]);

//   return <RouterProvider router={router} />;
// }

// export default App; ////








// import React from "react";
// import "./App.css";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import DashboardAdmin from "./DashboardSuperAdmin";
// import DashboardEmployee from "./DashboardEmployee";
// import DashboardHr from "./DashboardHr";
// import DashboardIntern from "./DashboardIntern";
// import DashboardHead from "./DashboardHead";
// import DashboardLineManager from "./DashboardLineManager";

// import Login from "./Auth/LoginPage";
// import ForgotPasswordPage from "./Auth/ForgotPasswordPage.";
// import HomeView from "./SuperAdmin/AdminHomeView";
// import MonthlyReport from "./SuperAdmin/AdminMonthlyReport";
// import AdminEmployeesView from "./SuperAdmin/Employee/AdminEmployeesView";
// import RolesView from "./SuperAdmin/Employee/Roles";
// import ShiftsView from "./SuperAdmin/Employee/Shifts";
// import EmployeeExit from "./SuperAdmin/Employee/EmployeeExit";


// // attendence 

// import AdminAttendanceView from "./SuperAdmin/AdminAttendanceView";
// import ManualAttendance from "./SuperAdmin/AdminManualAttendance";


// import DailyAttendanceReport from "./SuperAdmin/AttendanceSection/AttendenceReports/DailyAttendanceReport";
// import MonthlyAttendanceReprt from "./SuperAdmin/AttendanceSection/AttendenceReports/MonthlyAttendanceReprt";
// import MonthlyPunchINOUT from "./SuperAdmin/AttendanceSection/AttendenceReports/MonthlyPunchINOUT";

// // Allreport  
// import NewJoinerReport from "./SuperAdmin/AllReports/NewjoinerReport";

// import OvertimeRequest from "./SuperAdmin/AdminOvertimeRequest";
// import Account from "./SuperAdmin/Finance/Accounts";
// import Department from "./SuperAdmin/CoreHR/Department";
// import Designation from "./SuperAdmin/CoreHR/Designation";
// import Headquarters from "./SuperAdmin/CoreHR/HeadQuaters";
// import Policies from "./SuperAdmin/CoreHR/Policies";
// import MakeAnnouncement from "./SuperAdmin/CoreHR/MakeAnnouncement";
// import OrganizationChart from "./SuperAdmin/CoreHR/OrganizationChart";
// import Monitoring from "./SuperAdmin/AdminMonitoring";
// import Tasks from "./SuperAdmin/AdminTasks";
// import Projects from "./SuperAdmin/AdminProjects";
// import ManageClients from "./SuperAdmin/AdminManageClients";
// import ManageLeads from "./SuperAdmin/AdminLeads";
// import Deposit from "./SuperAdmin/Finance/Deposit";
// import Transactions from "./SuperAdmin/Finance/Transactions";
// import Expense from "./SuperAdmin/Finance/Expense";
// import Payroll from "./SuperAdmin/Payroll/Payroll";
// import PayslipHistory from "./SuperAdmin/Payroll/PayslipHistory";
// import AdvanceSalary from "./SuperAdmin/Payroll/AdvanceSalary";
// import Loan from "./SuperAdmin/Payroll/Loan";
// import PerformanceIndicator from "./SuperAdmin/Performances/PerformanceIndicator";
// import PerformanceAppraisal from "./SuperAdmin/Performances/PerformanceAppraisal";
// import Competencies from "./SuperAdmin/Performances/Competencies";
// import BillingInvoices from "./SuperAdmin/Invoices/BillingInvoices";
// import InvoicePayments from "./SuperAdmin/Invoices/InvoicePayment";
// import TaxType from "./SuperAdmin/Invoices/TaxType";
// import CalendarPage from "./SuperAdmin/Invoices/Calendar";
// import GoalsCalendar from "./SuperAdmin/Performances/GoalsCalendar";
// import EstimateCalendar from "./SuperAdmin/Estimates/EstimateCalendar";
// import Estimates from "./SuperAdmin/Estimates/Estimates";
// import LeaveRequest from "./SuperAdmin/AdminLeaveRequest";
// import TrainingSession from "./SuperAdmin/TrainingSections/TrainingSession";
// import TrainingCalendar from "./SuperAdmin/TrainingSections/TrainingCalendar";
// import TrainingSkills from "./SuperAdmin/TrainingSections/TrainingSkills";
// import Trainers from "./SuperAdmin/TrainingSections/Trainers";
// import DisciplinaryCases from "./SuperAdmin/Disciplinary Cases/DisciplinaryCases";
// import CaseType from "./SuperAdmin/Disciplinary Cases/CaseType";
// import GoalType from "./SuperAdmin/Performances/GoalType";
// import TrackGoals from "./SuperAdmin/Performances/TrackGoals";
// import NewOpenings from "./SuperAdmin/Recruitement/NewOpenings";
// import Candidates from "./SuperAdmin/Recruitement/Candidates";
// import Interviews from "./SuperAdmin/Recruitement/Interviews";
// import Promotions from "./SuperAdmin/Recruitement/Promotions";
// import EventAdmin from "./SuperAdmin/Apps/EventsAdmin";
// import AwardsAdmin from "./SuperAdmin/Apps/AwardsAdmin";
// import AssestAdmin from "./SuperAdmin/Apps/AssestsAdmin";
// import HolidaysAdmin from "./SuperAdmin/Apps/Holidays";
// import TravelsHome from "./SuperAdmin/Travels/TravelsHome";
// import TravelArrangemntAdmin from "./SuperAdmin/Travels/AdminArrangementTravels";
// // payroll 
// import PayrollReport from "./SuperAdmin/Payroll/PayrollReport";

// import BankStatement from "./SuperAdmin/Payroll/BankStatement";
// import VisitorBook from './SuperAdmin/Apps/VistorBook';
// import CoreHrDashboard from './SuperAdmin/CoreHR/DashboardCoreHr';
// import Division from "./SuperAdmin/CoreHR/Division";
// import Grade from "./SuperAdmin/CoreHR/Grade";
// import CompanyDetails from "./SuperAdmin/CoreHR/CompanyDetails";
// import EmployeeConfirmation from './SuperAdmin/EmployeeConfirmation/Confirmation';
// import PerformanceTable from './SuperAdmin/EmployeeConfirmation/PerformanceTable';
// import Marks from './SuperAdmin/EmployeeConfirmation/Marks';
// import MainEmployeeExit from './SuperAdmin/ExitEmployeeEmployee/main';
// import AssetDashboard from "./SuperAdmin/ExitEmployeeEmployee/AssetDashboard";
// import EmployeeExitProcess from "./SuperAdmin/ExitEmployeeEmployee/EmployeeExitProcess";
// import ExitDashboard from "./SuperAdmin/ExitEmployeeEmployee/ExitDashboard";
// import TerminationDashboard from "./SuperAdmin/ExitEmployeeEmployee/TerminationDashboard";

// import ConfirmationReport from "./SuperAdmin/Payroll/ConfirmationReport";
// import SalaryStructureReport from "./SuperAdmin/Payroll/SalaryStructureReport";
// import PfReport from "./SuperAdmin/Payroll/PfReport";
// import PtReport from "./SuperAdmin/Payroll/PtReport";
// import YTDEmployeeSalaryReport from "./SuperAdmin/Payroll/YTDEmployeeSalaryReport";
// import ConfirmationList from "./SuperAdmin/Payroll/ConfirmationList";
// import DashboardPayroll from "./SuperAdmin/Payroll/DashboardPayroll";
// import AttendanceReport from "./SuperAdmin/Payroll/AttendanceReport";
// import PayrollSalaryReport from "./SuperAdmin/Payroll/PayrollSalaryReport";
// import Assets from "./SuperAdmin/Apps/Assets";
// import Category from "./SuperAdmin/Apps/Category";
// import Brands from "./SuperAdmin/Apps/Brands";
// import Helpdesk from "./SuperAdmin/Helpdesk";
// import ResignPanel from "./SuperAdmin/ResignAdminPanel";
// import DailyMonitoringData from "./SuperAdmin/MonitorningPMD/DailyMonitoringData";
// import DashboardMonitoringPMD from "./SuperAdmin/MonitorningPMD/Dashboard";
// import EmployeeListPMD from "./SuperAdmin/MonitorningPMD/EmployeeList";
// import ViewReportPMD from "./SuperAdmin/MonitorningPMD/ViewReport";
// import { EmployeeIdProvider } from './SuperAdmin/Employee/EmployeeContext';
// import EmployeeDetailReport from "./SuperAdmin/Employee/EmployeeDetailReport";
// import EmployeeMasterReport from "./SuperAdmin/Employee/EmployeeMasterReport";
// import AnnualManpowerReport from "./SuperAdmin/Employee/AnnualManpowerReport";
// import DesignationDepartmentReport from "./SuperAdmin/Employee/DesignationDepartmantReport";
// import LeaveSetup from "./SuperAdmin/CoreHR/LeaveSetup";
// import PayrollSetup from "./SuperAdmin/CoreHR/PayrollSetup";
// import HolidayTBL from './SuperAdmin/LeavePanelDashboard/HolidayTBL';
// import LeaveManagementTable from './SuperAdmin/LeavePanelDashboard/LeaveManagementTable';
// import LeaveTypewiseTable from './SuperAdmin/LeavePanelDashboard/LeaveTypewiseTable';
// import MainLeave from './SuperAdmin/LeavePanelDashboard/Main';
// import PendingApprovalsTable from "./SuperAdmin/LeavePanelDashboard/PendingApprovalsTable";
// import AnnualLeaveReport from './SuperAdmin/Leave Reports/AnnualLeaveReport';
// import DepartmentWiseLeaveReport from './SuperAdmin/Leave Reports/DepartmentWiseLeaveReport';
// import EmployeeAnnualLeaveReport from './SuperAdmin/Leave Reports/EmployeeAnnualLeaveReport';
// import AllEmpLeaveReports from "./SuperAdmin/Leave Reports/AllEmpLeaveReports";
// import LeaveBalanceReport from "./SuperAdmin/Leave Reports/LeaveBalanceReport";



// import EmployeePendingLeaveReport from './SuperAdmin/Leave Reports/EmployeePendingLeaveReport';
// import MonthlyleaveReport from './SuperAdmin/Leave Reports/MonthlyLeaveReport';
// import BirthdayInMonth from './SuperAdmin/Employee/EmployeeDashbord/BirthdaysInMonth';
// import ConfirmationPending from './SuperAdmin/Employee/EmployeeDashbord/ConfirmationPending';
// import EmployeesMain from './SuperAdmin/Employee/EmployeeDashbord/EmployeesMain';
// import WorkAnniversary from "./SuperAdmin/Employee/EmployeeDashbord/WorkAnniversary";
// import AdminLeaveDetails from './SuperAdmin/LeaveDetails';
// import AdminAttendanceMain from './SuperAdmin/AttendanceSection/AttendanceMain';
// import Attendance1 from "./SuperAdmin/AttendanceSection/AttendanceFirst";
// import Attendance2 from "./SuperAdmin/AttendanceSection/AttendanceSecond";
// import DashboardConfirmation from './SuperAdmin/EmployeeConfirmation/DashboardConfirmation';
// import ConfirmationMain from "./SuperAdmin/EmployeeConfirmation/ConfirmationMain";
// import Parameter from './SuperAdmin/EmployeeConfirmation/ParameterCreation';
// import MainPayroll from './SuperAdmin/Pay Roll Managment/page';
// import PaymentInfo from "./SuperAdmin/Pay Roll Managment/payment-info";
// import PayrollSetupManagement from "./SuperAdmin/Pay Roll Managment/payroll-setup";
// import PayslipFinalization from "./SuperAdmin/Pay Roll Managment/payslip-finalization";
// import SalaryCalculation from "./SuperAdmin/Pay Roll Managment/salary-calculation";
// import PolicyAllocation from "./SuperAdmin/Policy/PolicyAllocation";


// import HomeViewEmp from "./EmployeePortal/HomeViewEmp";
// import AttendanceViewEmp from "./EmployeePortal/AttendanceViewEmp";
// import HolidayViewEmp from "./EmployeePortal/HolidayViewEmp";
// import ProjectsViewEmp from "./EmployeePortal/ProjectsViewEmp";
// import TasksViewEmp from "./EmployeePortal/TasksViewEmp";
// import LeaveRequestViewEmp from "./EmployeePortal/LeaveRequestViewEmp";
// import LeaveTypeEmp from "./EmployeePortal/LeaveTypeEmp";
// import MonthlyReportEmp from "./EmployeePortal/MonthlyReportEmp";
// import PoliciesEmp from "./EmployeePortal/PoliciesEmp";
// import HelpdeskEmp from "./EmployeePortal/HelpDeskEmp";
// import AppsCompEmp from "./EmployeePortal/AppsCompEmp";
// import AssestEmp from "./EmployeePortal/AssestEmp";
// import AwardsEmp from "./EmployeePortal/AwardsEmp";
// import DocumentsEmp from "./EmployeePortal/DocumentsEmp";
// import ResignationManagementEmp from "./EmployeePortal/ResignationPageEmp";
// import PayRollEmp from "./EmployeePortal/PayRollEmp";
// import AssetsEmp from "./EmployeePortal/AssetsEmp";
// import CategoryEmp from "./EmployeePortal/CategoryEmp";
// import BrandEmp from "./EmployeePortal/BrandEmp";
// import ProjectDetail from "./EmployeePortal/ProjectDetail";


// import HomeViewHead from "./HeadPortal/HomeViewHead";
// import AttendanceViewHead from "./HeadPortal/AttendanceViewHead";
// import HolidayViewHead from "./HeadPortal/HolidayViewHead";
// import ProjectsViewHead from "./HeadPortal/ProjectsViewHead";
// import TasksViewHead from "./HeadPortal/TasksViewHead";
// import LeaveRequestViewHead from "./HeadPortal/LeaveRequestViewHead";
// import LeaveTypeHead from "./HeadPortal/LeaveTypeHead";
// import MonthlyReportHead from "./HeadPortal/MonthlyReportHead";
// import PoliciesHead from "./HeadPortal/PoliciesHead";
// import HelpdeskHead from "./HeadPortal/HelpDeskHead";
// import AppsCompHead from "./HeadPortal/AppsCompHead";
// import AssestHead from "./HeadPortal/AssestHead";
// import AwardsHead from "./HeadPortal/AwardsHead";
// import DocumentsHead from "./HeadPortal/DocumentsHead";
// import ResignationManagementHead from "./HeadPortal/ResignationPageHead";
// import PayRollHead from "./HeadPortal/PayRollHead";
// import AssetsHead from "./HeadPortal/AssetsHead";
// import CategoryHead from "./HeadPortal/CategoryHead";
// import BrandHead from "./HeadPortal/BrandHead";
// import ProjectDetailHead from "./HeadPortal/ProjectDetailHead";
// import PerformanceTableHead from "./HeadPortal/EmployeeConfirmation/PerformanceTableHead";
// import MarksHead from "./HeadPortal/EmployeeConfirmation/MarksHead";


// import HomeViewLM from "./LineManagerPortal/HomeViewLM";
// import AttendanceViewLM from "./LineManagerPortal/AttendanceViewLM";
// import HolidayViewLM from "./LineManagerPortal/HolidayViewLM";
// import ProjectsViewLM from "./LineManagerPortal/ProjectsViewLM";
// import TasksViewLM from "./LineManagerPortal/TasksViewLM";
// import LeaveApprovalsLM from "./LineManagerPortal/LeaveApprovals";
// import LeaveRequestViewLM from "./LineManagerPortal/LeaveRequestViewLM";
// import LeaveTypeLM from "./LineManagerPortal/LeaveTypeLM";
// import MonthlyReportLM from "./LineManagerPortal/MonthlyReportLM";
// import PoliciesLM from "./LineManagerPortal/PoliciesLM";
// import HelpdeskLM from "./LineManagerPortal/HelpDeskLM";
// import AppsCompLM from "./LineManagerPortal/AppsCompLM";
// import AssestLM from "./LineManagerPortal/AssestLM";
// import AwardsLM from "./LineManagerPortal/AwardsLM";
// import DocumentsLM from "./LineManagerPortal/DocumentsLM";
// import ResignationManagementLM from "./LineManagerPortal/ResignationPageLM";
// import PayRollLM from "./LineManagerPortal/PayRollLM";
// import AssetsLM from "./LineManagerPortal/AssetsLM";
// import CategoryLM from "./LineManagerPortal/CategoryLM";
// import BrandLM from "./LineManagerPortal/BrandLM";
// import ProjectDetailLM from "./LineManagerPortal/ProjectDetailLM";
// import PerformanceTableLM from "./LineManagerPortal/EmployeeConfirmation/PerformanceTableLM";
// import MarksLM from "./LineManagerPortal/EmployeeConfirmation/MarksLM";



// import HomeViewHr from "./HrPortal/HomeViewHr";
// import ActiveEmpHr from "./HrPortal/ActiveEmpHr";
// import AttendanceViewHr from "./HrPortal/AttendanceViewHr";
// import MonthlyReportHr from "./HrPortal/MonthlyReportHr";
// import HolidayViewHr from "./HrPortal/HolidayViewHr";
// import ProjectsViewHr from "./HrPortal/ProjectViewHr";
// import TasksViewHr from "./HrPortal/TaskViewHr";
// import LeaveManagementHr from "./HrPortal/LeaveRequestViewHr";
// import LeaveTypeHr from "./HrPortal/LeaveTypeHr";
// import PoliciesHr from "./HrPortal/PoliciesHr";
// import EventsHr from "./HrPortal/EventsHr";
// import AssestHr from "./HrPortal/AssestHr";
// import AwardsHr from "./HrPortal/AwardsHr";
// import DocumentsHr from "./HrPortal/DocumentsHr";
// import ResignationHr from "./HrPortal/ResignationPageHr";
// import HelpdeskHr from "./HrPortal/HelpDeskHr";
// import PayRollHr from "./HrPortal/PayRollHr";
// import ConfirmationEmployeeHr from './HrPortal/Confirmation';

// import AdminEmployeesViewHr from "./HrPortal/Employee/AdminEmployeesViewHr";
// import EmployeeExitHr from "./HrPortal/Employee/EmployeeExitHr";
// import EmployeeDetailHr from "./HrPortal/Employee/EmployeeDetailHr";

// import YtdEmployeeSalaryReport from "./SuperAdmin/Payroll/YTDEmployeeSalaryReport";
// // import LeaveRequestViewHr from './HrPortal/LeaveRequestViewHr';
// import PolicyDashboard from "./SuperAdmin/CoreHR/PolicyDashboard";
// import HomeViewIntern from "./InternPortal/HomeViewIntern";
// import AttendanceViewIntern from "./InternPortal/AttendanceViewIntern";
// import MonthlyReportIntern from "./InternPortal/MonthlyReportIntern";
// import HolidayViewIntern from "./InternPortal/HolidayViewIntern";
// import ProjectsViewIntern from "./InternPortal/ProjectsViewIntern";
// import TasksViewIntern from "./InternPortal/TasksViewIntern";
// import HelpdeskIntern from "./InternPortal/HelpDeskIntern";
// import DisciplinaryIntern from "./InternPortal/DisciplinaryIntern";
// import EmployeeDetail from "./SuperAdmin/Employee/EmployeeDetail";
// import EmployeeHub from './SuperAdmin/CoreHR/EmployeeHub';
// import ProtectedRoute from "./Auth/ProtectedRoute";

// import { Outlet } from "react-router-dom";
// import ChatBot from "./ChatBot";

// const Layout = () => {
//   return (
//     <>
//       <Outlet />
//       {/* <ChatBot /> */}
//     </>
//   );
// };

// function App() {
//   const router = createBrowserRouter([
//     {
//       path: "/hrms",
//       element: <Login />,
//     },
//     {
//       path: "/hrms/forgot-password",
//       element: <ForgotPasswordPage />,
//     },
//     {
//       path: "/hrms/dashboard",
//       element: <ProtectedRoute requiredRole="staff" />,
//       children: [
//         {
//           element: <DashboardEmployee />,
//           children: [
//             {
//               element: <Layout />,
//               children: [
//                 {
//                   path: "home",
//                   element: <HomeViewEmp />,
//                 },
//                 {
//                   path: "attendance",
//                   element: <AttendanceViewEmp />,
//                 },
//                 {
//                   path: "monthly-report",
//                   element: <MonthlyReportEmp />,
//                 },
//                 {
//                   path: "holiday",
//                   element: <HolidayViewEmp />,
//                 },
//                 {
//                   path: "projects",
//                   element: <ProjectsViewEmp />,
//                 },
//                 {
//                   path: "projectdetail",
//                   element: <ProjectDetail />,
//                 },
//                 {
//                   path: "tasks",
//                   element: <TasksViewEmp />,
//                 },
//                 {
//                   path: "leave-request",
//                   element: <LeaveRequestViewEmp />,
//                 },
//                 {
//                   path: "leavetype",
//                   element: <LeaveTypeEmp />,
//                 },
//                 {
//                   path: "policies",
//                   element: <PoliciesEmp />,
//                 },
//                 {
//                   path: "helpdesk",
//                   element: <HelpdeskEmp />,
//                 },
//                 {
//                   path: "appscomp",
//                   element: <AppsCompEmp />,
//                 },
//                 {
//                   path: "assest",
//                   element: <AssestEmp />,
//                 },
//                 {
//                   path: "assetsemp", // Overtime request inside the dashboard
//                   element: <AssetsEmp />,
//                 },
//                 {
//                   path: "categoryemp", // Overtime request inside the dashboard
//                   element: <CategoryEmp />,
//                 },
//                 {
//                   path: "brandemp", // Overtime request inside the dashboard
//                   element: <BrandEmp />,
//                 },
//                 {
//                   path: "award",
//                   element: <AwardsEmp />,
//                 },
//                 {
//                   path: "document",
//                   element: <DocumentsEmp />,
//                 },

//                 {
//                   path: "resignation",
//                   element: <ResignationManagementEmp />,
//                 },
//                 {
//                   path: "payroll",
//                   element: <PayRollEmp />,
//                 },
//               ],
//             },
//           ],
//         },
//       ],
//     },
//     {
//       path: "/hrms/dashboardHead",
//       element: <ProtectedRoute requiredRole="Head" />,
//       children: [
//         {
//           element: <DashboardHead />,
//           children: [
//             {
//               element: <Layout />,
//               children: [
//                 {
//                   path: "home",
//                   element: <HomeViewHead />,
//                 },
//                 {
//                   path: "attendance",
//                   element: <AttendanceViewHead />,
//                 },
//                 {
//                   path: "monthly-report",
//                   element: <MonthlyReportHead />,
//                 },
//                 {
//                   path: "holiday",
//                   element: <HolidayViewHead />,
//                 },
//                 {
//                   path: "projects",
//                   element: <ProjectsViewHead />,
//                 },
//                 {
//                   path: "projectdetail",
//                   element: <ProjectDetailHead />,
//                 },
//                 {
//                   path: "tasks",
//                   element: <TasksViewHead />,
//                 },
//                 {
//                   path: "leave-request",
//                   element: <LeaveRequestViewHead />,
//                 },
//                 {
//                   path: "leavetype",
//                   element: <LeaveTypeHead />,
//                 },
//                 {
//                   path: "policies",
//                   element: <PoliciesHead />,
//                 },
//                 {
//                   path: "helpdesk",
//                   element: <HelpdeskHead />,
//                 },
//                 {
//                   path: "appscomp",
//                   element: <AppsCompHead />,
//                 },
//                 {
//                   path: "assest",
//                   element: <AssestHead />,
//                 },
//                 {
//                   path: "assetsemp", // Overtime request inside the dashboard
//                   element: <AssetsHead />,
//                 },
//                 {
//                   path: "categoryemp", // Overtime request inside the dashboard
//                   element: <CategoryHead />,
//                 },
//                 {
//                   path: "brandemp", // Overtime request inside the dashboard
//                   element: <BrandHead />,
//                 },
//                 {
//                   path: "award",
//                   element: <AwardsHead />,
//                 },
//                 {
//                   path: "document",
//                   element: <DocumentsHead />,
//                 },

//                 {
//                   path: "resignation",
//                   element: <ResignationManagementHead />,
//                 },
//                 {
//                   path: "payroll",
//                   element: <PayRollHead />,
//                 },
//                 {
//                   path: "performanceTable",
//                   element: <PerformanceTableHead />,
//                 },
//                 {
//                   path: "marks/:id",
//                   element: <MarksHead />,
//                 },
//               ],
//             },
//           ],
//         },
//       ],
//     },
//     {
//       path: "/hrms/dashboardLM",
//       element: <ProtectedRoute requiredRole="Line Manager" />,
//       children: [
//         {
//           element: <DashboardLineManager />,
//           children: [
//             {
//               element: <Layout />,
//               children: [
//                 {
//                   path: "home",
//                   element: <HomeViewLM />,
//                 },
//                 {
//                   path: "attendance",
//                   element: <AttendanceViewLM />,
//                 },
//                 {
//                   path: "monthly-report",
//                   element: <MonthlyReportLM />,
//                 },
//                 {
//                   path: "holiday",
//                   element: <HolidayViewLM />,
//                 },
//                 {
//                   path: "projects",
//                   element: <ProjectsViewLM />,
//                 },
//                 {
//                   path: "projectdetail",
//                   element: <ProjectDetailLM />,
//                 },
//                 {
//                   path: "tasks",
//                   element: <TasksViewLM />,
//                 },
//                 {
//                   path: "leave-request",
//                   element: <LeaveRequestViewLM />,
//                 },
//                 {
//                   path: "leavetype",
//                   element: <LeaveTypeLM />,
//                 },
//                 {
//                   path: "leaveapprovals",
//                   element: <LeaveApprovalsLM />,
//                 },
//                 {
//                   path: "policies",
//                   element: <PoliciesLM />,
//                 },
//                 {
//                   path: "helpdesk",
//                   element: <HelpdeskLM />,
//                 },
//                 {
//                   path: "appscomp",
//                   element: <AppsCompLM />,
//                 },
//                 {
//                   path: "assest",
//                   element: <AssestLM />,
//                 },
//                 {
//                   path: "assetsemp", // Overtime request inside the dashboard
//                   element: <AssetsLM />,
//                 },
//                 {
//                   path: "categoryemp", // Overtime request inside the dashboard
//                   element: <CategoryLM />,
//                 },
//                 {
//                   path: "brandemp", // Overtime request inside the dashboard
//                   element: <BrandLM />,
//                 },
//                 {
//                   path: "award",
//                   element: <AwardsLM />,
//                 },
//                 {
//                   path: "document",
//                   element: <DocumentsLM />,
//                 },

//                 {
//                   path: "resignation",
//                   element: <ResignationManagementLM />,
//                 },
//                 {
//                   path: "payroll",
//                   element: <PayRollLM />,
//                 },
//                 {
//                   path: "performanceTable",
//                   element: <PerformanceTableLM />,
//                 },
//                 {
//                   path: "marks/:id",
//                   element: <MarksLM />,
//                 },

//               ],
//             },
//           ],
//         },
//       ],
//     },

//     {
//       path: "/hrms/admindashboard", // Dashboard Layout for all the child routes
//       element: <ProtectedRoute requiredRole="Admin" />,
//       children: [
//         {
//           element: <DashboardAdmin />,
//           children: [
//             {
//               element: <Layout />,
//               children: [
//                 {
//                   path: "home", // Home view inside the dashboard
//                   element: <HomeView />,
//                 },
//                 {
//                   path: "mainemployeeexit", // Home view inside the dashboard
//                   element: <MainEmployeeExit />,
//                 },
//                 {
//                   path: "assetdashboard", // Home view inside the dashboard
//                   element: <AssetDashboard />,
//                 },
//                 {
//                   path: "employeeexitprocess", // Home view inside the dashboard
//                   element: <EmployeeExitProcess />,
//                 },
//                 {
//                   path: "termination", // Home view inside the dashboard
//                   element: <TerminationDashboard />,
//                 },
//                 {
//                   path: "exitdashboard", // Home view inside the dashboard
//                   element: <ExitDashboard />,
//                 },
//                 {
//                   path: "MainPayroll", // Home view inside the dashboard
//                   element: <MainPayroll />,
//                 },
//                 {
//                   path: "PaymentInfo", // Home view inside the dashboard
//                   element: <PaymentInfo />,
//                 },
//                 {
//                   path: "PayrollSetupManagement", // Home view inside the dashboard
//                   element: <PayrollSetupManagement />,
//                 },
//                 {
//                   path: "PayslipFinalization", // Home view inside the dashboard
//                   element: <PayslipFinalization />,
//                 },
//                 {
//                   path: "SalaryCalculation", // Home view inside the dashboard
//                   element: <SalaryCalculation />,
//                 },
//                 {
//                   path: "attendance", // Attendance view inside the dashboard
//                   element: <AdminAttendanceView />,
//                 },
//                 {
//                   path: "DailyAttendanceReport", // Home view inside the dashboard
//                   element: <DailyAttendanceReport />,
//                 },
//                 {
//                   path: "MonthlyAttendanceReprt", // Home view inside the dashboard
//                   element: <MonthlyAttendanceReprt />,
//                 },
//                 {
//                   path: "MonthlyPunchINOUT", // Home view inside the dashboard
//                   element: <MonthlyPunchINOUT />,
//                 },
//                 {
//                   path: "monthly-report", // Monthly Report view inside the dashboard
//                   element: <MonthlyReport />,
//                 },
//                 {
//                   path: "employees", // Employees view inside the dashboard
//                   element: <AdminEmployeesView />,
//                 },
//                 {
//                   path: "employeedetail/:id", // Employees view inside the dashboard
//                   element: <EmployeeIdProvider> <EmployeeDetail /></EmployeeIdProvider>,
//                 },
//                 {
//                   path: "annualManpowerReport", // Employees view inside the dashboard
//                   element: <AnnualManpowerReport />,
//                 },
//                 {
//                   path: "designationVSdepartmentReport", // Employees view inside the dashboard
//                   element: <DesignationDepartmentReport />,
//                 },
//                 {
//                   path: "employeeDetailReport", // Employees view inside the dashboard
//                   element: <EmployeeDetailReport />,
//                 },
//                 {
//                   path: "employeeMasterReport", // Employees view inside the dashboard
//                   element: <EmployeeMasterReport />,
//                 },
//                 {
//                   path: "NewJoinerReport", // Employees view inside the dashboard
//                   element: <NewJoinerReport />,
//                 },
//                 {
//                   path: "birthdayInMonth", // Employees view inside the dashboard
//                   element: <BirthdayInMonth />,
//                 },
//                 {
//                   path: "confirmationPending", // Employees view inside the dashboard
//                   element: <ConfirmationPending />,
//                 },
//                 {
//                   path: "employeesMain", // Employees view inside the dashboard
//                   element: <EmployeesMain />,
//                 },
//                 {
//                   path: "workAnniversary", // Employees view inside the dashboard
//                   element: <WorkAnniversary />,
//                 },

//                 {
//                   path: "roles", // Employees view inside the dashboard
//                   element: <RolesView />,
//                 },
//                 {
//                   path: "shifts", // Employees view inside the dashboard
//                   element: <ShiftsView />,
//                 },
//                 {
//                   path: "employeeexits", // Employees view inside the dashboard
//                   element: <EmployeeExit />,
//                 },
//                 {
//                   path: "manual-attendance", // Manual Attendance view inside the dashboard
//                   element: <ManualAttendance />,
//                 },
//                 {
//                   path: "overtime-request", // Overtime request inside the dashboard
//                   element: <OvertimeRequest />,
//                 },
//                 {
//                   path: "department", // Overtime request inside the dashboard
//                   element: <Department />,
//                 },
//                 {
//                   path: "designation", // Overtime request inside the dashboard
//                   element: <Designation />,
//                 },
//                 {
//                   path: "corehrdashboard",
//                   element: <CoreHrDashboard />,
//                 },
//                 {
//                   path: "division",
//                   element: <Division />,
//                 },
//                 {
//                   path: "grade",
//                   element: <Grade />,
//                 },
//                 {
//                   path: "employeehub",
//                   element: <EmployeeHub />,
//                 },
//                 {
//                   path: "companydetails",
//                   element: <CompanyDetails />,
//                 },
//                 {
//                   path: "headquaters", // Overtime request inside the dashboard
//                   element: <Headquarters />,
//                 },
//                 {
//                   path: "policies", // Overtime request inside the dashboard
//                   element: <Policies />,
//                 },
//                 {
//                   path: "policyDashboard", // Overtime request inside the dashboard
//                   element: <PolicyDashboard />,
//                 },
//                 {
//                   path: "payrollSetup", // Overtime request inside the dashboard
//                   element: <PayrollSetup />,
//                 },
//                 {
//                   path: "leaveSetup", // Overtime request inside the dashboard
//                   element: <LeaveSetup />,
//                 },
//                 {
//                   path: "makeannouncement", // Overtime request inside the dashboard
//                   element: <MakeAnnouncement />,
//                 },
//                 {
//                   path: "organizationchart", // Overtime request inside the dashboard
//                   element: <OrganizationChart />,
//                 },
//                 {
//                   path: "eventadmin", // Overtime request inside the dashboard
//                   element: <EventAdmin />,
//                 },
//                 {
//                   path: "assestadmin", // Overtime request inside the dashboard
//                   element: <AssestAdmin />,
//                 },
//                 {
//                   path: "assets", // Overtime request inside the dashboard
//                   element: <Assets />,
//                 },
//                 {
//                   path: "category", // Overtime request inside the dashboard
//                   element: <Category />,
//                 },
//                 {
//                   path: "brand", // Overtime request inside the dashboard
//                   element: <Brands />,
//                 },
//                 {
//                   path: "awardsadmin", // Overtime request inside the dashboard
//                   element: <AwardsAdmin />,
//                 },
//                 {
//                   path: "visitorbook", // Overtime request inside the dashboard
//                   element: <VisitorBook />,
//                 },
//                 {
//                   path: "holidaysadmin", // Overtime request inside the dashboard
//                   element: <HolidaysAdmin />,
//                 },
//                 {
//                   path: "travelshome", // Overtime request inside the dashboard
//                   element: <TravelsHome />,
//                 },
//                 {
//                   path: "travelsarrangment", // Overtime request inside the dashboard
//                   element: <TravelArrangemntAdmin />,
//                 },
//                 {
//                   path: "monitoring", // Overtime request inside the dashboard
//                   element: <Monitoring />,
//                 },
//                 {
//                   path: "parametercreation",
//                   element: <Parameter />,
//                 },
//                 {
//                   path: "employeeconfirmation",
//                   element: <EmployeeConfirmation />,
//                 },
//                 {
//                   path: "performanceTable",
//                   element: <PerformanceTable />,
//                 },

//                 {
//                   path: "marks/:id",
//                   element: <Marks />,
//                 },
//                 {
//                   path: "employeeconfirmationMain",
//                   element: <ConfirmationMain />,
//                 },
//                 {
//                   path: "dailyMonitoringData", // Overtime request inside the dashboard
//                   element: <DailyMonitoringData />,
//                 },
//                 {
//                   path: "dashboardPMD", // Overtime request inside the dashboard
//                   element: <DashboardMonitoringPMD />,
//                 },
//                 {
//                   path: "employeelist", // Overtime request inside the dashboard
//                   element: <EmployeeListPMD />,
//                 },
//                 {
//                   path: "view-report/:employeeId", // Overtime request inside the dashboard
//                   element: <ViewReportPMD />,
//                 },
//                 {
//                   path: "taskData", // Overtime request inside the dashboard
//                   element: <Tasks />,
//                 },
//                 {
//                   path: "projects", // Overtime request inside the dashboard
//                   element: <Projects />,
//                 },
//                 {
//                   path: "manageclients", // Overtime request inside the dashboard
//                   element: <ManageClients />,
//                 },
//                 {
//                   path: "manageleads", // Overtime request inside the dashboard
//                   element: <ManageLeads />,
//                 },
//                 {
//                   path: "account", // Overtime request inside the dashboard
//                   element: <Account />,
//                 },
//                 {
//                   path: "deposit", // Overtime request inside the dashboard
//                   element: <Deposit />,
//                 },
//                 {
//                   path: "expense", // Overtime request inside the dashboard
//                   element: <Expense />,
//                 },
//                 {
//                   path: "transactions", // Overtime request inside the dashboard
//                   element: <Transactions />,
//                 },
//                 {
//                   path: "policyallocation",
//                   element: <PolicyAllocation />,
//                 },
//                 {
//                   path: "payroll", // Overtime request inside the dashboard
//                   element: <Payroll />,
//                 },
//                 {
//                   path: "payrollReport",
//                   element: <PayrollReport />,
//                 },
//                 {
//                   path: "bankStatement",
//                   element: <BankStatement />,
//                 },
//                 {
//                   path: "ConfirmationReport",
//                   element: <ConfirmationReport />,
//                 },
//                 {
//                   path: "dashboardConfirmation",
//                   element: <DashboardConfirmation />,
//                 },
//                 {
//                   path: "SalaryStructureReport",
//                   element: <SalaryStructureReport />,
//                 },
//                 {
//                   path: "PfReport",
//                   element: <PfReport />,
//                 },
//                 {
//                   path: "PtReport",
//                   element: <PtReport />,
//                 },
//                 {
//                   path: "YtdEmployeeSalaryReport",
//                   element: <YTDEmployeeSalaryReport />,
//                 },
//                 {
//                   path: "ConfirmationList",
//                   element: <ConfirmationList />,
//                 },
//                 {
//                   path: "DashboardPayroll",
//                   element: <DashboardPayroll />,
//                 },
//                 {
//                   path: "AttendanceReport",
//                   element: <AttendanceReport />,
//                 },
//                 {
//                   path: "attendancemain",
//                   element: <AdminAttendanceMain />,
//                 },
//                 {
//                   path: "attendance1",
//                   element: <Attendance1 />,
//                 },
//                 {
//                   path: "attendance2",
//                   element: <Attendance2 />,
//                 },

//                 {
//                   path: "PayrollSalaryReport",
//                   element: <PayrollSalaryReport />,
//                 },

//                 {
//                   path: "paysliphistory", // Overtime request inside the dashboard
//                   element: <PayslipHistory />,
//                 },
//                 {
//                   path: "advancesalary", // Overtime request inside the dashboard
//                   element: <AdvanceSalary />,
//                 },
//                 {
//                   path: "loan", // Overtime request inside the dashboard
//                   element: <Loan />,
//                 },
//                 //
//                 {
//                   path: "billinginvoices", // Overtime request inside the dashboard
//                   element: <BillingInvoices />,
//                 },

//                 {
//                   path: "calendar", // Overtime request inside the dashboard
//                   element: <CalendarPage />,
//                 },
//                 {
//                   path: "invoicepayments", // Overtime request inside the dashboard
//                   element: <InvoicePayments />,
//                 },
//                 {
//                   path: "taxtype", // Overtime request inside the dashboard
//                   element: <TaxType />,
//                 },
//                 {
//                   path: "estimates", // Overtime request inside the dashboard
//                   element: <Estimates />,
//                 },
//                 {
//                   path: "estimatescalendar", // Overtime request inside the dashboard
//                   element: <EstimateCalendar />,
//                 },
//                 {
//                   path: "leaverequest", // Overtime request inside the dashboard
//                   element: <LeaveRequest />,
//                 },
//                 {
//                   path: "leavedetails/:id", // Overtime request inside the dashboard
//                   element: <AdminLeaveDetails />,
//                 },
//                 {
//                   path: "holidayTBL", // Overtime request inside the dashboard
//                   element: <HolidayTBL />,
//                 },
//                 {
//                   path: "leaveManagementTable", // Overtime request inside the dashboard
//                   element: <LeaveManagementTable />,
//                 },
//                 {
//                   path: "leaveTypewiseTable", // Overtime request inside the dashboard
//                   element: <LeaveTypewiseTable />,
//                 },
//                 {
//                   path: "mainLeave", // Overtime request inside the dashboard
//                   element: <MainLeave />,
//                 },
//                 {
//                   path: "pendingApprovalsTable", // Overtime request inside the dashboard
//                   element: <PendingApprovalsTable />,
//                 },
//                 {
//                   path: "annualLeaveReport", // Overtime request inside the dashboard
//                   element: <AnnualLeaveReport />,
//                 },
//                 {
//                   path: "AllEmpLeaveReports", // Overtime request inside the dashboard
//                   element: <AllEmpLeaveReports />,
//                 },
//                 {
//                   path: "LeaveBalanceReport", // Overtime request inside the dashboard
//                   element: <LeaveBalanceReport />,
//                 },

//                 {
//                   path: "departmentWiseLeaveReport", // Overtime request inside the dashboard
//                   element: <DepartmentWiseLeaveReport />,
//                 },
//                 {
//                   path: "employeeAnnualLeaveReport", // Overtime request inside the dashboard
//                   element: <EmployeeAnnualLeaveReport />,
//                 },
//                 {
//                   path: "employeePendingLeaveReport", // Overtime request inside the dashboard
//                   element: <EmployeePendingLeaveReport />,
//                 },
//                 {
//                   path: "monthlyleaveReport", // Overtime request inside the dashboard
//                   element: <MonthlyleaveReport />,
//                 },


//                 {
//                   path: "trainingsessions", // Overtime request inside the dashboard
//                   element: <TrainingSession />,
//                 },
//                 {
//                   path: "trainers", // Overtime request inside the dashboard
//                   element: <Trainers />,
//                 },
//                 {
//                   path: "training-skills", // Overtime request inside the dashboard
//                   element: <TrainingSkills />,
//                 },
//                 {
//                   path: "training-calendar", // Overtime request inside the dashboard
//                   element: <TrainingCalendar />,
//                 },
//                 {
//                   path: "disciplinary-cases", // Overtime request inside the dashboard
//                   element: <DisciplinaryCases />,
//                 },
//                 {
//                   path: "case-type", // Overtime request inside the dashboard
//                   element: <CaseType />,
//                 },
//                 {
//                   path: "kpi-indicator", // Overtime request inside the dashboard
//                   element: <PerformanceIndicator />,
//                 },
//                 {
//                   path: "kpi-appraisal", // Overtime request inside the dashboard
//                   element: <PerformanceAppraisal />,
//                 },
//                 {
//                   path: "competencies", // Overtime request inside the dashboard
//                   element: <Competencies />,
//                 },
//                 {
//                   path: "goalscalendar", // Overtime request inside the dashboard
//                   element: <GoalsCalendar />,
//                 },
//                 {
//                   path: "goaltype", // Overtime request inside the dashboard
//                   element: <GoalType />,
//                 },
//                 {
//                   path: "trackgoals", // Overtime request inside the dashboard
//                   element: <TrackGoals />,
//                 },
//                 {
//                   path: "payroll", // Overtime request inside the dashboard
//                   element: <Payroll />,
//                 },
//                 {
//                   path: "paysliphistory", // Overtime request inside the dashboard
//                   element: <PayslipHistory />,
//                 },
//                 {
//                   path: "newopenings", // Overtime request inside the dashboard
//                   element: <NewOpenings />,
//                 },
//                 {
//                   path: "candidates", // Overtime request inside the dashboard
//                   element: <Candidates />,
//                 },
//                 {
//                   path: "interviews", // Overtime request inside the dashboard
//                   element: <Interviews />,
//                 },
//                 {
//                   path: "helpdesk", // helpdesk
//                   element: <Helpdesk />,
//                 },
//                 {
//                   path: "resignpaneladmin", // helpdesk
//                   element: <ResignPanel />,
//                 },
//                 {
//                   path: "promotions", // Overtime request inside the dashboard
//                   element: <Promotions />,
//                 },
//               ],
//             },
//           ],
//         },
//       ],
//     },


//     {
//       path: "/hrms/interndashboard",
//       element: <ProtectedRoute requiredRole="Intern" />,
//       children: [
//         {
//           element: <DashboardIntern />, // dashboard layout
//           children: [
//             {
//               element: <Layout />, // includes Chatbot + Outlet
//               children: [
//                 { path: "home", element: <HomeViewIntern /> },
//                 { path: "attendance", element: <AttendanceViewIntern /> },
//                 { path: "monthly-report", element: <MonthlyReportIntern /> },
//                 { path: "holiday", element: <HolidayViewIntern /> },
//                 { path: "projects", element: <ProjectsViewIntern /> },
//                 { path: "tasks", element: <TasksViewIntern /> },
//                 { path: "helpdesk", element: <HelpdeskIntern /> },
//                 { path: "disciplinary", element: <DisciplinaryIntern /> },
//               ],
//             },
//           ],
//         },
//       ],
//     },
//     {
//       path: "/hrms/dashboardhr",
//       element: <ProtectedRoute requiredRole="HR" />,
//       children: [
//         {
//           element: <DashboardHr />,
//           children: [
//             {
//               element: <Layout />,
//               children: [
//                 { path: "home", element: <HomeViewHr /> },
//                 {
//                   path: "add_employees", // Employees view inside the dashboard
//                   element: <AdminEmployeesViewHr />,
//                 },
//                 {
//                   path: "employeedetailHr/:id", // Employees view inside the dashboard
//                   element: <EmployeeIdProvider> <EmployeeDetailHr /></EmployeeIdProvider>,
//                 },
//                 { path: "EmployeeExitHr", element: <EmployeeExitHr /> },
//                 { path: "employee", element: <ActiveEmpHr /> },
//                 { path: "attendance", element: <AttendanceViewHr /> },
//                 { path: "monthly-report", element: <MonthlyReportHr /> },
//                 { path: "holiday-view", element: <HolidayViewHr /> },
//                 { path: "projects", element: <ProjectsViewHr /> },
//                 { path: "tasks", element: <TasksViewHr /> },
//                 { path: "leave-request", element: <LeaveManagementHr /> },
//                 { path: "leavetype", element: <LeaveTypeHr /> },
//                 { path: "policies", element: <PoliciesHr /> },
//                 { path: "eventshr", element: <EventsHr /> },
//                 { path: "assesthr", element: <AssestHr /> },
//                 { path: "awardshr", element: <AwardsHr /> },
//                 { path: "documenthr", element: <DocumentsHr /> },
//                 { path: "resignationhr", element: <ResignationHr /> },
//                 { path: "helpdeskhr", element: <HelpdeskHr /> },
//                 { path: "payrollhr", element: <PayRollHr /> },
//                 { path: "confirmation", element: <ConfirmationEmployeeHr /> },
//               ],
//             },
//           ],
//         },
//       ],
//     },
//   ]);

//   return <RouterProvider router={router} />;
// }

// export default App;    //////  








// import React from "react";
// import "./App.css";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import DashboardAdmin from "./DashboardSuperAdmin";
// import DashboardEmployee from "./DashboardEmployee";
// import DashboardHr from "./DashboardHr";
// import DashboardIntern from "./DashboardIntern";
// import DashboardHead from "./DashboardHead";
// import DashboardLineManager from "./DashboardLineManager";

// import Login from "./Auth/LoginPage";
// import ForgotPasswordPage from "./Auth/ForgotPasswordPage.";
// import HomeView from "./SuperAdmin/AdminHomeView";
// import MonthlyReport from "./SuperAdmin/AdminMonthlyReport";
// import AdminEmployeesView from "./SuperAdmin/Employee/AdminEmployeesView";
// import RolesView from "./SuperAdmin/Employee/Roles";
// import ShiftsView from "./SuperAdmin/Employee/Shifts";
// import EmployeeExit from "./SuperAdmin/Employee/EmployeeExit";


// // attendence 

// import AdminAttendanceView from "./SuperAdmin/AdminAttendanceView";
// import ManualAttendance from "./SuperAdmin/AdminManualAttendance";

// import EmployeeExitEmp from "./EmployeePortal/EmployeeExitEmp";
// import DailyAttendanceReport from "./SuperAdmin/AttendanceSection/AttendenceReports/DailyAttendanceReport";
// import MonthlyAttendanceReprt from "./SuperAdmin/AttendanceSection/AttendenceReports/MonthlyAttendanceReprt";
// import MonthlyPunchINOUT from "./SuperAdmin/AttendanceSection/AttendenceReports/MonthlyPunchINOUT";

// // Allreport  
// import NewJoinerReport from "./SuperAdmin/AllReports/NewjoinerReport";

// import OvertimeRequest from "./SuperAdmin/AdminOvertimeRequest";
// import Account from "./SuperAdmin/Finance/Accounts";
// import Department from "./SuperAdmin/CoreHR/Department";
// import Designation from "./SuperAdmin/CoreHR/Designation";
// import Headquarters from "./SuperAdmin/CoreHR/HeadQuaters";
// import Policies from "./SuperAdmin/CoreHR/Policies";
// import MakeAnnouncement from "./SuperAdmin/CoreHR/MakeAnnouncement";
// import OrganizationChart from "./SuperAdmin/CoreHR/OrganizationChart";
// import Monitoring from "./SuperAdmin/AdminMonitoring";
// import Tasks from "./SuperAdmin/AdminTasks";
// import Projects from "./SuperAdmin/AdminProjects";
// import ManageClients from "./SuperAdmin/AdminManageClients";
// import ManageLeads from "./SuperAdmin/AdminLeads";
// import Deposit from "./SuperAdmin/Finance/Deposit";
// import Transactions from "./SuperAdmin/Finance/Transactions";
// import Expense from "./SuperAdmin/Finance/Expense";
// import Payroll from "./SuperAdmin/Payroll/Payroll";
// import PayslipHistory from "./SuperAdmin/Payroll/PayslipHistory";
// import AdvanceSalary from "./SuperAdmin/Payroll/AdvanceSalary";
// import Loan from "./SuperAdmin/Payroll/Loan";
// import PerformanceIndicator from "./SuperAdmin/Performances/PerformanceIndicator";
// import PerformanceAppraisal from "./SuperAdmin/Performances/PerformanceAppraisal";
// import Competencies from "./SuperAdmin/Performances/Competencies";
// import BillingInvoices from "./SuperAdmin/Invoices/BillingInvoices";
// import InvoicePayments from "./SuperAdmin/Invoices/InvoicePayment";
// import TaxType from "./SuperAdmin/Invoices/TaxType";
// import CalendarPage from "./SuperAdmin/Invoices/Calendar";
// import GoalsCalendar from "./SuperAdmin/Performances/GoalsCalendar";
// import EstimateCalendar from "./SuperAdmin/Estimates/EstimateCalendar";
// import Estimates from "./SuperAdmin/Estimates/Estimates";
// import LeaveRequest from "./SuperAdmin/AdminLeaveRequest";
// import TrainingSession from "./SuperAdmin/TrainingSections/TrainingSession";
// import TrainingCalendar from "./SuperAdmin/TrainingSections/TrainingCalendar";
// import TrainingSkills from "./SuperAdmin/TrainingSections/TrainingSkills";
// import Trainers from "./SuperAdmin/TrainingSections/Trainers";
// import DisciplinaryCases from "./SuperAdmin/Disciplinary Cases/DisciplinaryCases";
// import CaseType from "./SuperAdmin/Disciplinary Cases/CaseType";
// import GoalType from "./SuperAdmin/Performances/GoalType";
// import TrackGoals from "./SuperAdmin/Performances/TrackGoals";
// import NewOpenings from "./SuperAdmin/Recruitement/NewOpenings";
// import Candidates from "./SuperAdmin/Recruitement/Candidates";
// import Interviews from "./SuperAdmin/Recruitement/Interviews";
// import Promotions from "./SuperAdmin/Recruitement/Promotions";
// import EventAdmin from "./SuperAdmin/Apps/EventsAdmin";
// import AwardsAdmin from "./SuperAdmin/Apps/AwardsAdmin";
// import AssestAdmin from "./SuperAdmin/Apps/AssestsAdmin";
// import HolidaysAdmin from "./SuperAdmin/Apps/Holidays";
// import TravelsHome from "./SuperAdmin/Travels/TravelsHome";
// import TravelArrangemntAdmin from "./SuperAdmin/Travels/AdminArrangementTravels";
// // payroll 
// import PayrollReport from "./SuperAdmin/Payroll/PayrollReport";

// import BankStatement from "./SuperAdmin/Payroll/BankStatement";
// import VisitorBook from './SuperAdmin/Apps/VistorBook';
// import CoreHrDashboard from './SuperAdmin/CoreHR/DashboardCoreHr';
// import Division from "./SuperAdmin/CoreHR/Division";
// import Grade from "./SuperAdmin/CoreHR/Grade";
// import CompanyDetails from "./SuperAdmin/CoreHR/CompanyDetails";
// import EmployeeConfirmation from './SuperAdmin/EmployeeConfirmation/Confirmation';
// // import PerformanceTable from './SuperAdmin/EmployeeConfirmation/PerformanceTable';
// // import Marks from './SuperAdmin/EmployeeConfirmation/Marks';
// import { PerformanceTable, Marks } from './SuperAdmin/EmployeeConfirmation/PerformanceTable';
// import MainEmployeeExit from './SuperAdmin/ExitEmployeeEmployee/main';
// import AssetDashboard from "./SuperAdmin/ExitEmployeeEmployee/AssetDashboard";
// import EmployeeExitProcess from "./SuperAdmin/ExitEmployeeEmployee/EmployeeExitProcess";
// import ExitDashboard from "./SuperAdmin/ExitEmployeeEmployee/ExitDashboard";
// import TerminationDashboard from "./SuperAdmin/ExitEmployeeEmployee/TerminationDashboard";

// import ConfirmationReport from "./SuperAdmin/Payroll/ConfirmationReport";
// import SalaryStructureReport from "./SuperAdmin/Payroll/SalaryStructureReport";
// import PfReport from "./SuperAdmin/Payroll/PfReport";
// import PtReport from "./SuperAdmin/Payroll/PtReport";
// import YTDEmployeeSalaryReport from "./SuperAdmin/Payroll/YTDEmployeeSalaryReport";
// import ConfirmationList from "./SuperAdmin/Payroll/ConfirmationList";
// import DashboardPayroll from "./SuperAdmin/Payroll/DashboardPayroll";
// import AttendanceReport from "./SuperAdmin/Payroll/AttendanceReport";
// import PayrollSalaryReport from "./SuperAdmin/Payroll/PayrollSalaryReport";
// import Assets from "./SuperAdmin/Apps/Assets";
// import Category from "./SuperAdmin/Apps/Category";
// import Brands from "./SuperAdmin/Apps/Brands";
// import Helpdesk from "./SuperAdmin/Helpdesk";
// import ResignPanel from "./SuperAdmin/ResignAdminPanel";
// import DailyMonitoringData from "./SuperAdmin/MonitorningPMD/DailyMonitoringData";
// import DashboardMonitoringPMD from "./SuperAdmin/MonitorningPMD/Dashboard";
// import EmployeeListPMD from "./SuperAdmin/MonitorningPMD/EmployeeList";
// import ViewReportPMD from "./SuperAdmin/MonitorningPMD/ViewReport";
// import { EmployeeIdProvider } from './SuperAdmin/Employee/EmployeeContext';
// import EmployeeDetailReport from "./SuperAdmin/Employee/EmployeeDetailReport";
// import EmployeeMasterReport from "./SuperAdmin/Employee/EmployeeMasterReport";
// // import AnnualManpowerReport from "./SuperAdmin/Employee/AnnualManpowerReport";
// import DesignationDepartmentReport from "./SuperAdmin/Employee/DesignationDepartmantReport";
// import LeaveSetup from "./SuperAdmin/CoreHR/LeaveSetup";
// import PayrollSetup from "./SuperAdmin/CoreHR/PayrollSetup";
// import HolidayTBL from './SuperAdmin/LeavePanelDashboard/HolidayTBL';
// import LeaveManagementTable from './SuperAdmin/LeavePanelDashboard/LeaveManagementTable';
// import LeaveTypewiseTable from './SuperAdmin/LeavePanelDashboard/LeaveTypewiseTable';
// import MainLeave from './SuperAdmin/LeavePanelDashboard/Main';
// import PendingApprovalsTable from "./SuperAdmin/LeavePanelDashboard/PendingApprovalsTable";
// import AnnualLeaveReport from './SuperAdmin/Leave Reports/AnnualLeaveReport';
// import DepartmentWiseLeaveReport from './SuperAdmin/Leave Reports/DepartmentWiseLeaveReport';
// import EmployeeAnnualLeaveReport from './SuperAdmin/Leave Reports/EmployeeAnnualLeaveReport';
// import AllEmpLeaveReports from "./SuperAdmin/Leave Reports/AllEmpLeaveReports";
// import LeaveBalanceReport from "./SuperAdmin/Leave Reports/LeaveBalanceReport";



// import EmployeePendingLeaveReport from './SuperAdmin/Leave Reports/EmployeePendingLeaveReport';
// import MonthlyleaveReport from './SuperAdmin/Leave Reports/MonthlyLeaveReport';
// import BirthdayInMonth from './SuperAdmin/Employee/EmployeeDashbord/BirthdaysInMonth';
// import ConfirmationPending from './SuperAdmin/Employee/EmployeeDashbord/ConfirmationPending';
// import EmployeesMain from './SuperAdmin/Employee/EmployeeDashbord/EmployeesMain';
// import WorkAnniversary from "./SuperAdmin/Employee/EmployeeDashbord/WorkAnniversary";
// import AdminLeaveDetails from './SuperAdmin/LeaveDetails';
// import AdminAttendanceMain from './SuperAdmin/AttendanceSection/AttendanceMain';
// import Attendance1 from "./SuperAdmin/AttendanceSection/AttendanceFirst";
// import Attendance2 from "./SuperAdmin/AttendanceSection/AttendanceSecond";
// import DashboardConfirmation from './SuperAdmin/EmployeeConfirmation/DashboardConfirmation';
// import ConfirmationMain from "./SuperAdmin/EmployeeConfirmation/ConfirmationMain";
// import Parameter from './SuperAdmin/EmployeeConfirmation/ParameterCreation';
// import MainPayroll from './SuperAdmin/Pay Roll Managment/page';
// import PaymentInfo from "./SuperAdmin/Pay Roll Managment/payment-info";
// import PayrollSetupManagement from "./SuperAdmin/Pay Roll Managment/payroll-setup";
// import PayslipFinalization from "./SuperAdmin/Pay Roll Managment/payslip-finalization";
// import SalaryCalculation from "./SuperAdmin/Pay Roll Managment/salary-calculation";
// import PolicyAllocation from "./SuperAdmin/Policy/PolicyAllocation";
// import Role from './SuperAdmin/CoreHR/Roles'


// import HomeViewEmp from "./EmployeePortal/HomeViewEmp";
// import AttendanceViewEmp from "./EmployeePortal/AttendanceViewEmp";
// import HolidayViewEmp from "./EmployeePortal/HolidayViewEmp";
// import ProjectsViewEmp from "./EmployeePortal/ProjectsViewEmp";
// import TasksViewEmp from "./EmployeePortal/TasksViewEmp";
// import LeaveRequestViewEmp from "./EmployeePortal/LeaveRequestViewEmp";
// import LeaveTypeEmp from "./EmployeePortal/LeaveTypeEmp";
// import MonthlyReportEmp from "./EmployeePortal/MonthlyReportEmp";
// import PoliciesEmp from "./EmployeePortal/PoliciesEmp";
// import HelpdeskEmp from "./EmployeePortal/HelpDeskEmp";
// import AppsCompEmp from "./EmployeePortal/AppsCompEmp";
// import AssestEmp from "./EmployeePortal/AssestEmp";
// import AwardsEmp from "./EmployeePortal/AwardsEmp";
// import DocumentsEmp from "./EmployeePortal/DocumentsEmp";
// import ResignationManagementEmp from "./EmployeePortal/ResignationPageEmp";
// import PayRollEmp from "./EmployeePortal/PayRollEmp";
// import AssetsEmp from "./EmployeePortal/AssetsEmp";
// import CategoryEmp from "./EmployeePortal/CategoryEmp";
// import BrandEmp from "./EmployeePortal/BrandEmp";
// import ProjectDetail from "./EmployeePortal/ProjectDetail";
// import ExitProcessHr from "./HrPortal/ExitProcessHr";

// import HomeViewHead from "./HeadPortal/HomeViewHead";
// import EmployeeExitHead from "./HeadPortal/EmployeeExitHead";

// import AttendanceViewHead from "./HeadPortal/AttendanceViewHead";
// import HolidayViewHead from "./HeadPortal/HolidayViewHead";
// import ProjectsViewHead from "./HeadPortal/ProjectsViewHead";
// import TasksViewHead from "./HeadPortal/TasksViewHead";
// import LeaveRequestViewHead from "./HeadPortal/LeaveRequestViewHead";
// import LeaveTypeHead from "./HeadPortal/LeaveTypeHead";
// import MonthlyReportHead from "./HeadPortal/MonthlyReportHead";
// import PoliciesHead from "./HeadPortal/PoliciesHead";
// import HelpdeskHead from "./HeadPortal/HelpDeskHead";
// import AppsCompHead from "./HeadPortal/AppsCompHead";
// import AssestHead from "./HeadPortal/AssestHead";
// import AwardsHead from "./HeadPortal/AwardsHead";
// import DocumentsHead from "./HeadPortal/DocumentsHead";
// import ResignationManagementHead from "./HeadPortal/ResignationPageHead";
// import PayRollHead from "./HeadPortal/PayRollHead";
// import AssetsHead from "./HeadPortal/AssetsHead";
// import CategoryHead from "./HeadPortal/CategoryHead";
// import BrandHead from "./HeadPortal/BrandHead";
// import ProjectDetailHead from "./HeadPortal/ProjectDetailHead";
// // import PerformanceTableHead from "./HeadPortal/EmployeeConfirmation/PerformanceTableHead";
// // import MarksHead from "./HeadPortal/EmployeeConfirmation/MarksHead";
// import { PerformanceTableHead, MarksHead } from './HeadPortal/EmployeeConfirmation/PerformanceTableHead';

// import HomeViewLM from "./LineManagerPortal/HomeViewLM";
// import AttendanceViewLM from "./LineManagerPortal/AttendanceViewLM";
// import HolidayViewLM from "./LineManagerPortal/HolidayViewLM";
// import ProjectsViewLM from "./LineManagerPortal/ProjectsViewLM";
// import TasksViewLM from "./LineManagerPortal/TasksViewLM";
// import LeaveApprovalsLM from "./LineManagerPortal/LeaveApprovals";
// import LeaveRequestViewLM from "./LineManagerPortal/LeaveRequestViewLM";
// import LeaveTypeLM from "./LineManagerPortal/LeaveTypeLM";
// import MonthlyReportLM from "./LineManagerPortal/MonthlyReportLM";
// import PoliciesLM from "./LineManagerPortal/PoliciesLM";
// import HelpdeskLM from "./LineManagerPortal/HelpDeskLM";
// import AppsCompLM from "./LineManagerPortal/AppsCompLM";
// import AssestLM from "./LineManagerPortal/AssestLM";
// import AwardsLM from "./LineManagerPortal/AwardsLM";
// import DocumentsLM from "./LineManagerPortal/DocumentsLM";
// import ResignationManagementLM from "./LineManagerPortal/ResignationPageLM";
// import PayRollLM from "./LineManagerPortal/PayRollLM";
// import AssetsLM from "./LineManagerPortal/AssetsLM";
// import CategoryLM from "./LineManagerPortal/CategoryLM";
// import BrandLM from "./LineManagerPortal/BrandLM";
// import ProjectDetailLM from "./LineManagerPortal/ProjectDetailLM";
// // import PerformanceTableLM from "./LineManagerPortal/EmployeeConfirmation/PerformanceTableLM";
// // import MarksLM from "./LineManagerPortal/EmployeeConfirmation/MarksLM";
// import { PerformanceTableLM, MarksLM }  from "./LineManagerPortal/EmployeeConfirmation/PerformanceTableLM";
// import EmployeeExitLM from "./LineManagerPortal/EmployeeExitLM";


// import HomeViewHr from "./HrPortal/HomeViewHr";
// import ActiveEmpHr from "./HrPortal/ActiveEmpHr";
// import AttendanceViewHr from "./HrPortal/AttendanceViewHr";
// import MonthlyReportHr from "./HrPortal/MonthlyReportHr";
// import HolidayViewHr from "./HrPortal/HolidayViewHr";
// import ProjectsViewHr from "./HrPortal/ProjectViewHr";
// import TasksViewHr from "./HrPortal/TaskViewHr";
// import LeaveManagementHr from "./HrPortal/LeaveRequestViewHr";
// import LeaveTypeHr from "./HrPortal/LeaveTypeHr";
// import PoliciesHr from "./HrPortal/PoliciesHr";
// import EventsHr from "./HrPortal/EventsHr";
// import AssestHr from "./HrPortal/AssestHr";
// import AwardsHr from "./HrPortal/AwardsHr";
// import DocumentsHr from "./HrPortal/DocumentsHr";
// import ResignationHr from "./HrPortal/ResignationPageHr";
// import HelpdeskHr from "./HrPortal/HelpDeskHr";
// import PayRollHr from "./HrPortal/PayRollHr";
// // import ConfirmationEmployeeHr from './HrPortal/Confirmation';
// import { PerformanceTableHR, MarksHR }  from "./HrPortal/Confirmation";

// import AdminEmployeesViewHr from "./HrPortal/Employee/AdminEmployeesViewHr";
// import EmployeeExitHr from "./HrPortal/Employee/EmployeeExitHr";
// import EmployeeDetailHr from "./HrPortal/Employee/EmployeeDetailHr";

// import EmployeeExitMain from "./HrPortal/EmployeeExitMain";
// import ExitDashboardHr from "./HrPortal/ExitDashboardHr";
// // import YtdEmployeeSalaryReport from "./SuperAdmin/Payroll/YTDEmployeeSalaryReport";
// // import LeaveRequestViewHr from './HrPortal/LeaveRequestViewHr';
// import PolicyDashboard from "./SuperAdmin/CoreHR/PolicyDashboard";
// import HomeViewIntern from "./InternPortal/HomeViewIntern";
// import AttendanceViewIntern from "./InternPortal/AttendanceViewIntern";
// import MonthlyReportIntern from "./InternPortal/MonthlyReportIntern";
// import HolidayViewIntern from "./InternPortal/HolidayViewIntern";
// import ProjectsViewIntern from "./InternPortal/ProjectsViewIntern";
// import TasksViewIntern from "./InternPortal/TasksViewIntern";
// import HelpdeskIntern from "./InternPortal/HelpDeskIntern";
// import DisciplinaryIntern from "./InternPortal/DisciplinaryIntern";
// import EmployeeDetail from "./SuperAdmin/Employee/EmployeeDetail";
// import EmployeeHub from './SuperAdmin/CoreHR/EmployeeHub';
// import ProtectedRoute from "./Auth/ProtectedRoute";

// import { Outlet } from "react-router-dom";
// import ChatBot from "./ChatBot";




// // START: Added imports for new reports
// import HrMasterDataReport from "./SuperAdmin/AllReports/HrMasterDataReport";
// import EmployeeConfirmationReport from "./SuperAdmin/AllReports/EmployeeConfirmationReport";
// import EmployeeLeavePatternReport from "./SuperAdmin/AllReports/EmployeeLeavePatternReport";
// import EmployeePipReport from "./SuperAdmin/AllReports/EmployeePipReport";
// import EmployeeExitReport from "./SuperAdmin/AllReports/EmployeeExitReport";
// import AnnualManpowerReport from "./SuperAdmin/AllReports/AnnualManpowerReport";
// import EmployeeAttritionReport from "./SuperAdmin/AllReports/EmployeeAttritionReport";
// import PerformanceManagementReport from "./SuperAdmin/AllReports/PerformanceManagementReport";
// import AnnualAppraisalReport from "./SuperAdmin/AllReports/AnnualAppraisalReport";
// import PromotionReport from "./SuperAdmin/AllReports/PromotionReport";
// import GratuityEligibilityReport from "./SuperAdmin/AllReports/GratuityEligibilityReport";
// import EmpPFReport from "./SuperAdmin/AllReports/PFReport";
// import EmpPayrollSalaryReport from "./SuperAdmin/AllReports/PayrollSalaryReport";
// import SalaryReport from "./SuperAdmin/AllReports/SalaryReport";
// import PTReport from "./SuperAdmin/AllReports/PTReport";
// import EmpMasterDataReport from "./SuperAdmin/AllReports/EmpMasterDataReport";
// import Recruitmenttracker from "./SuperAdmin/AllReports/Recruitmenttracker"
// import MetricsForm from "./HrPortal/MetricsForm";
// import MetricsFromAdmin from "./SuperAdmin/MetricsFromAdmin";
// import ExitandTerminationAd from "./SuperAdmin/ExitandTermination/ExitandTerminationAd";





// const Layout = () => {
//   return (
//     <>
//       <Outlet />
//       {/* <ChatBot /> */}
//     </>
//   );
// };

// function App() {
//   const router = createBrowserRouter([
//     {
//       path: "/hrms",
//       element: <Login />,
//     },
//     {
//       path: "/hrms/forgot-password",
//       element: <ForgotPasswordPage />,
//     },
//     {
//       path: "/hrms/dashboard",
//       element: <ProtectedRoute requiredRole="staff" />,
//       children: [
//         {
//           element: <DashboardEmployee />,
//           children: [
//             {
//               element: <Layout />,
//               children: [
//                 {
//                   path: "home",
//                   element: <HomeViewEmp />,
//                 },
//                 {
//                   path: "attendance",
//                   element: <AttendanceViewEmp />,
//                 },
//                 {
//                   path: "monthly-report",
//                   element: <MonthlyReportEmp />,
//                 },
//                  {
//                   path: "employeeExitEmp",
//                   element: <EmployeeExitEmp />,
//                 },
                
//                 {
//                   path: "holiday",
//                   element: <HolidayViewEmp />,
//                 },
//                 {
//                   path: "projects",
//                   element: <ProjectsViewEmp />,
//                 },
//                 {
//                   path: "projectdetail",
//                   element: <ProjectDetail />,
//                 },
//                 {
//                   path: "tasks",
//                   element: <TasksViewEmp />,
//                 },
//                 {
//                   path: "leave-request",
//                   element: <LeaveRequestViewEmp />,
//                 },
//                 {
//                   path: "leavetype",
//                   element: <LeaveTypeEmp />,
//                 },
//                 {
//                   path: "policies",
//                   element: <PoliciesEmp />,
//                 },
//                 {
//                   path: "helpdesk",
//                   element: <HelpdeskEmp />,
//                 },
//                 {
//                   path: "appscomp",
//                   element: <AppsCompEmp />,
//                 },
//                 {
//                   path: "assest",
//                   element: <AssestEmp />,
//                 },
//                 {
//                   path: "assetsemp", // Overtime request inside the dashboard
//                   element: <AssetsEmp />,
//                 },
//                 {
//                   path: "categoryemp", // Overtime request inside the dashboard
//                   element: <CategoryEmp />,
//                 },
//                 {
//                   path: "brandemp", // Overtime request inside the dashboard
//                   element: <BrandEmp />,
//                 },
//                 {
//                   path: "award",
//                   element: <AwardsEmp />,
//                 },
//                 {
//                   path: "document",
//                   element: <DocumentsEmp />,
//                 },

//                 {
//                   path: "resignation",
//                   element: <ResignationManagementEmp />,
//                 },
//                 {
//                   path: "payroll",
//                   element: <PayRollEmp />,
//                 },
//               ],
//             },
//           ],
//         },
//       ],
//     },
//     {
//       path: "/hrms/dashboardHead",
//       element: <ProtectedRoute requiredRole="Head" />,
//       children: [
//         {
//           element: <DashboardHead />,
//           children: [
//             {
//               element: <Layout />,
//               children: [
//                 {
//                   path: "home",
//                   element: <HomeViewHead />,
//                 },
//                 {
//                   path: "attendance",
//                   element: <AttendanceViewHead />,
//                 },
//                 {
//                   path: "monthly-report",
//                   element: <MonthlyReportHead />,
//                 },
//                 {
//                   path: "holiday",
//                   element: <HolidayViewHead />,
//                 },
//                 {
//                   path: "projects",
//                   element: <ProjectsViewHead />,
//                 },
//                 {
//                   path: "projectdetail",
//                   element: <ProjectDetailHead />,
//                 },
//                 {
//                   path: "tasks",
//                   element: <TasksViewHead />,
//                 },
//                 {
//                   path: "leave-request",
//                   element: <LeaveRequestViewHead />,
//                 },
//                 {
//                   path: "leavetype",
//                   element: <LeaveTypeHead />,
//                 },
//                 {
//                   path: "policies",
//                   element: <PoliciesHead />,
//                 },
//                 {
//                   path: "helpdesk",
//                   element: <HelpdeskHead />,
//                 },
//                 {
//                   path: "employeeExitHead",
//                   element: <EmployeeExitHead />,
//                 },
//                 {
//                   path: "appscomp",
//                   element: <AppsCompHead />,
//                 },
//                 {
//                   path: "assest",
//                   element: <AssestHead />,
//                 },
//                 {
//                   path: "assetsemp", // Overtime request inside the dashboard
//                   element: <AssetsHead />,
//                 },
//                 {
//                   path: "categoryemp", // Overtime request inside the dashboard
//                   element: <CategoryHead />,
//                 },
//                 {
//                   path: "brandemp", // Overtime request inside the dashboard
//                   element: <BrandHead />,
//                 },
//                 {
//                   path: "award",
//                   element: <AwardsHead />,
//                 },
//                 {
//                   path: "document",
//                   element: <DocumentsHead />,
//                 },

//                 {
//                   path: "resignation",
//                   element: <ResignationManagementHead />,
//                 },
//                 {
//                   path: "payroll",
//                   element: <PayRollHead />,
//                 },
//                 {
//                   path: "performanceTable",
//                   element: <PerformanceTableHead />,
//                 },
//                 {
//                   path: "marks/:id",
//                   element: <MarksHead />,
//                 },
//               ],
//             },
//           ],
//         },
//       ],
//     },
//     {
//       path: "/hrms/dashboardLM",
//       element: <ProtectedRoute requiredRole="Line Manager" />,
//       children: [
//         {
//           element: <DashboardLineManager />,
//           children: [
//             {
//               element: <Layout />,
//               children: [
//                 {
//                   path: "home",
//                   element: <HomeViewLM />,
//                 },
//                 {
//                   path: "attendance",
//                   element: <AttendanceViewLM />,
//                 },
//                 {
//                   path: "monthly-report",
//                   element: <MonthlyReportLM />,
//                 },
//                 {
//                   path: "holiday",
//                   element: <HolidayViewLM />,
//                 },
//                 {
//                   path: "projects",
//                   element: <ProjectsViewLM />,
//                 },
//                 {
//                   path: "projectdetail",
//                   element: <ProjectDetailLM />,
//                 },
//                 {
//                   path: "tasks",
//                   element: <TasksViewLM />,
//                 },
//                 {
//                   path: "leave-request",
//                   element: <LeaveRequestViewLM />,
//                 },
//                 {
//                   path: "leavetype",
//                   element: <LeaveTypeLM />,
//                 },
//                 {
//                   path: "leaveapprovals",
//                   element: <LeaveApprovalsLM />,
//                 },
//                 {
//                   path: "policies",
//                   element: <PoliciesLM />,
//                 },
//                 {
//                   path: "helpdesk",
//                   element: <HelpdeskLM />,
//                 },
//                 {
//                   path: "appscomp",
//                   element: <AppsCompLM />,
//                 },
//                 {
//                   path: "assest",
//                   element: <AssestLM />,
//                 },
//                 {
//                   path: "assetsemp", // Overtime request inside the dashboard
//                   element: <AssetsLM />,
//                 },
//                 {
//                   path: "categoryemp", // Overtime request inside the dashboard
//                   element: <CategoryLM />,
//                 },
//                 {
//                   path: "brandemp", // Overtime request inside the dashboard
//                   element: <BrandLM />,
//                 },
//                 {
//                   path: "award",
//                   element: <AwardsLM />,
//                 },
//                 {
//                   path: "document",
//                   element: <DocumentsLM />,
//                 },

//                 {
//                   path: "resignation",
//                   element: <ResignationManagementLM />,
//                 },
//                 {
//                   path: "payroll",
//                   element: <PayRollLM />,
//                 },
//                 {
//                   path: "performanceTable",
//                   element: <PerformanceTableLM />,
//                 },
//                 {
//                   path: "marks/:id",
//                   element: <MarksLM />,
//                 },
//                 {
//                   path: "employeeExitLM",
//                   element: <EmployeeExitLM />,
//                 },

//               ],
//             },
//           ],
//         },
//       ],
//     },

//     {
//       path: "/hrms/admindashboard", // Dashboard Layout for all the child routes
//       element: <ProtectedRoute requiredRole="Admin" />,
//       children: [
//         {
//           element: <DashboardAdmin />,
//           children: [
//             {
//               element: <Layout />,
//               children: [
//                 {
//                   path: "home", // Home view inside the dashboard
//                   element: <HomeView />,
//                 },
//                 {
//                   path:"ExitandTerminationAd",
//                   element:<ExitandTerminationAd/>
//                 },
//                 {
//                   path:"MetricsFromAdmin",
//                   element:<MetricsFromAdmin/>,
//                 },
//                 {
//                   path: "mainemployeeexit", // Home view inside the dashboard
//                   element: <MainEmployeeExit />,
//                 },
//                 {
//                   path: "assetdashboard", // Home view inside the dashboard
//                   element: <AssetDashboard />,
//                 },
//                 {
//                   path: "employeeexitprocess", // Home view inside the dashboard
//                   element: <EmployeeExitProcess />,
//                 },
//                 {
//                   path: "termination", // Home view inside the dashboard
//                   element: <TerminationDashboard />,
//                 },
//                 {
//                   path: "exitdashboard", // Home view inside the dashboard
//                   element: <ExitDashboard />,
//                 },
//                 {
//                   path: "MainPayroll", // Home view inside the dashboard
//                   element: <MainPayroll />,
//                 },
//                 {
//                   path: "PaymentInfo", // Home view inside the dashboard
//                   element: <PaymentInfo />,
//                 },
//                 {
//                   path: "PayrollSetupManagement", // Home view inside the dashboard
//                   element: <PayrollSetupManagement />,
//                 },
//                 {
//                   path: "PayslipFinalization", // Home view inside the dashboard
//                   element: <PayslipFinalization />,
//                 },
//                 {
//                   path: "SalaryCalculation", // Home view inside the dashboard
//                   element: <SalaryCalculation />,
//                 },
//                 {
//                   path: "attendance", // Attendance view inside the dashboard
//                   element: <AdminAttendanceView />,
//                 },
//                 {
//                   path: "DailyAttendanceReport", // Home view inside the dashboard
//                   element: <DailyAttendanceReport />,
//                 },
//                 {
//                   path: "MonthlyAttendanceReprt", // Home view inside the dashboard
//                   element: <MonthlyAttendanceReprt />,
//                 },
//                 {
//                   path: "MonthlyPunchINOUT", // Home view inside the dashboard
//                   element: <MonthlyPunchINOUT />,
//                 },
//                 {
//                   path: "monthly-report", // Monthly Report view inside the dashboard
//                   element: <MonthlyReport />,
//                 },
//                 {
//                   path: "employees", // Employees view inside the dashboard
//                   element: <AdminEmployeesView />,
//                 },
//                 {
//                   path: "employeedetail/:id", // Employees view inside the dashboard
//                   element: <EmployeeIdProvider> <EmployeeDetail /></EmployeeIdProvider>,
//                 },
//                 {
//                   path: "annualManpowerReport", // Employees view inside the dashboard
//                   element: <AnnualManpowerReport />,
//                 },
//                 {
//                   path: "designationVSdepartmentReport", // Employees view inside the dashboard
//                   element: <DesignationDepartmentReport />,
//                 },
//                 {
//                   path: "employeeDetailReport", // Employees view inside the dashboard
//                   element: <EmployeeDetailReport />,
//                 },
//                 {
//                   path: "employeeMasterReport", // Employees view inside the dashboard
//                   element: <EmployeeMasterReport />,
//                 },
//                 {
//                   path: "NewJoinerReport", // Employees view inside the dashboard
//                   element: <NewJoinerReport />,
//                 },
//                 // START: Added new report routes
//                 {
//                   path: "hrMasterDataReport",
//                   element: <HrMasterDataReport />,
//                 },
//                 {
//                   path: "employeeConfirmationReport",
//                   element: <EmployeeConfirmationReport />,
//                 },
//                 {
//                   path: "employeeLeavePatternReport",
//                   element: <EmployeeLeavePatternReport />,
//                 },
//                 {
//                   path: "employeePipReport",
//                   element: <EmployeePipReport />,
//                 },
//                 {
//                   path: "employeeExitReport",
//                   element: <EmployeeExitReport />,
//                 },
//                 {
//                   path: "annualManpowerReport",
//                   element: <AnnualManpowerReport />,
//                 },
//                 {
//                   path: "employeeAttritionReport",
//                   element: <EmployeeAttritionReport />,
//                 },
//                 {
//                   path: "PerformanceManagementReport",
//                   element: <PerformanceManagementReport />,
//                 },
//                 {
//                   path: "AnnualAppraisalReport",
//                   element: <AnnualAppraisalReport />,
//                 },
//                 {
//                   path: "PromotionReport",
//                   element: <PromotionReport />,
//                 },
//                 {
//                   path: "PTReport",
//                   element: <PTReport />,
//                 },
//                 {
//                   path: "Recruitmenttracker",
//                   element: <Recruitmenttracker />,
//                 },
//                 {
//                   path: "EmpMasterDataReport",
//                   element: <EmpMasterDataReport />,
//                 },
//                 {
//                   path: "GratuityEligibilityReport",
//                   element: <GratuityEligibilityReport />,
//                 },
//                 {
//                   path: "PFReport",
//                   element: <EmpPFReport />,
//                 },
//                 {
//                   path: "SalaryReport",
//                   element: <SalaryReport />,
//                 },


//                 {
//                   path: "EmpPayrollSalaryReport",
//                   element: <EmpPayrollSalaryReport />,
//                 },


//                 // END: Added new report routes
//                 {
//                   path: "birthdayInMonth", // Employees view inside the dashboard
//                   element: <BirthdayInMonth />,
//                 },
//                 {
//                   path: "confirmationPending", // Employees view inside the dashboard
//                   element: <ConfirmationPending />,
//                 },
//                 {
//                   path: "employeesMain", // Employees view inside the dashboard
//                   element: <EmployeesMain />,
//                 },
//                 {
//                   path: "workAnniversary", // Employees view inside the dashboard
//                   element: <WorkAnniversary />,
//                 },

//                 {
//                   path: "roles", // Employees view inside the dashboard
//                   element: <RolesView />,
//                 },
//                 {
//                   path: "shifts", // Employees view inside the dashboard
//                   element: <ShiftsView />,
//                 },
//                 {
//                   path: "employeeexits", // Employees view inside the dashboard
//                   element: <EmployeeExit />,
//                 },
//                 {
//                   path: "manual-attendance", // Manual Attendance view inside the dashboard
//                   element: <ManualAttendance />,
//                 },
//                 {
//                   path: "overtime-request", // Overtime request inside the dashboard
//                   element: <OvertimeRequest />,
//                 },
//                 {
//                   path: "department", // Overtime request inside the dashboard
//                   element: <Department />,
//                 },
//                 {
//                   path: "designation", // Overtime request inside the dashboard
//                   element: <Designation />,
//                 },
//                 {
//                   path: "corehrdashboard",
//                   element: <CoreHrDashboard />,
//                 },
//                 {
//                   path: "division",
//                   element: <Division />,
//                 },
//                 {
//                   path: "grade",
//                   element: <Grade />,
//                 },
//                 {
//                   path: "employeehub",
//                   element: <EmployeeHub />,
//                 },
//                 {
//                   path: "companydetails",
//                   element: <CompanyDetails />,
//                 },
//                 {
//                   path: "role",
//                   element: <Role />,
//                 },
//                 {
//                   path: "headquaters", // Overtime request inside the dashboard
//                   element: <Headquarters />,
//                 },
//                 {
//                   path: "policies", // Overtime request inside the dashboard
//                   element: <Policies />,
//                 },
//                 {
//                   path: "policyDashboard", // Overtime request inside the dashboard
//                   element: <PolicyDashboard />,
//                 },
//                 {
//                   path: "payrollSetup", // Overtime request inside the dashboard
//                   element: <PayrollSetup />,
//                 },
//                 {
//                   path: "leaveSetup", // Overtime request inside the dashboard
//                   element: <LeaveSetup />,
//                 },
//                 {
//                   path: "makeannouncement", // Overtime request inside the dashboard
//                   element: <MakeAnnouncement />,
//                 },
//                 {
//                   path: "organizationchart", // Overtime request inside the dashboard
//                   element: <OrganizationChart />,
//                 },
//                 {
//                   path: "eventadmin", // Overtime request inside the dashboard
//                   element: <EventAdmin />,
//                 },
//                 {
//                   path: "assestadmin", // Overtime request inside the dashboard
//                   element: <AssestAdmin />,
//                 },
//                 {
//                   path: "assets", // Overtime request inside the dashboard
//                   element: <Assets />,
//                 },
//                 {
//                   path: "category", // Overtime request inside the dashboard
//                   element: <Category />,
//                 },
//                 {
//                   path: "brand", // Overtime request inside the dashboard
//                   element: <Brands />,
//                 },
//                 {
//                   path: "awardsadmin", // Overtime request inside the dashboard
//                   element: <AwardsAdmin />,
//                 },
//                 {
//                   path: "visitorbook", // Overtime request inside the dashboard
//                   element: <VisitorBook />,
//                 },
//                 {
//                   path: "holidaysadmin", // Overtime request inside the dashboard
//                   element: <HolidaysAdmin />,
//                 },
//                 {
//                   path: "travelshome", // Overtime request inside the dashboard
//                   element: <TravelsHome />,
//                 },
//                 {
//                   path: "travelsarrangment", // Overtime request inside the dashboard
//                   element: <TravelArrangemntAdmin />,
//                 },
//                 {
//                   path: "monitoring", // Overtime request inside the dashboard
//                   element: <Monitoring />,
//                 },
//                 {
//                   path: "parametercreation",
//                   element: <Parameter />,
//                 },
//                 {
//                   path: "employeeconfirmation",
//                   element: <EmployeeConfirmation />,
//                 },
//                 {
//                   path: "performanceTable",
//                   element: <PerformanceTable />,
//                 },

//                 {
//                   path: "marks/:id",
//                   element: <Marks/>,
//                 },
//                 {
//                   path: "employeeconfirmationMain",
//                   element: <ConfirmationMain />,
//                 },
//                 {
//                   path: "dailyMonitoringData", // Overtime request inside the dashboard
//                   element: <DailyMonitoringData />,
//                 },
//                 {
//                   path: "dashboardPMD", // Overtime request inside the dashboard
//                   element: <DashboardMonitoringPMD />,
//                 },
//                 {
//                   path: "employeelist", // Overtime request inside the dashboard
//                   element: <EmployeeListPMD />,
//                 },
//                 {
//                   path: "view-report/:employeeId", // Overtime request inside the dashboard
//                   element: <ViewReportPMD />,
//                 },
//                 {
//                   path: "taskData", // Overtime request inside the dashboard
//                   element: <Tasks />,
//                 },
//                 {
//                   path: "projects", // Overtime request inside the dashboard
//                   element: <Projects />,
//                 },
//                 {
//                   path: "manageclients", // Overtime request inside the dashboard
//                   element: <ManageClients />,
//                 },
//                 {
//                   path: "manageleads", // Overtime request inside the dashboard
//                   element: <ManageLeads />,
//                 },
//                 {
//                   path: "account", // Overtime request inside the dashboard
//                   element: <Account />,
//                 },
//                 {
//                   path: "deposit", // Overtime request inside the dashboard
//                   element: <Deposit />,
//                 },
//                 {
//                   path: "expense", // Overtime request inside the dashboard
//                   element: <Expense />,
//                 },
//                 {
//                   path: "transactions", // Overtime request inside the dashboard
//                   element: <Transactions />,
//                 },
//                 {
//                   path: "policyallocation",
//                   element: <PolicyAllocation />,
//                 },
//                 {
//                   path: "payroll", // Overtime request inside the dashboard
//                   element: <Payroll />,
//                 },
//                 {
//                   path: "payrollReport",
//                   element: <PayrollReport />,
//                 },
//                 {
//                   path: "bankStatement",
//                   element: <BankStatement />,
//                 },
//                 {
//                   path: "ConfirmationReport",
//                   element: <ConfirmationReport />,
//                 },
//                 {
//                   path: "dashboardConfirmation",
//                   element: <DashboardConfirmation />,
//                 },
//                 {
//                   path: "SalaryStructureReport",
//                   element: <SalaryStructureReport />,
//                 },
//                 {
//                   path: "PfReport",
//                   element: <PfReport />,
//                 },
//                 {
//                   path: "PtReport",
//                   element: <PtReport />,
//                 },
//                 {
//                   path: "YtdEmployeeSalaryReport",
//                   element: <YTDEmployeeSalaryReport />,
//                 },
//                 {
//                   path: "ConfirmationList",
//                   element: <ConfirmationList />,
//                 },
//                 {
//                   path: "DashboardPayroll",
//                   element: <DashboardPayroll />,
//                 },
//                 {
//                   path: "AttendanceReport",
//                   element: <AttendanceReport />,
//                 },
//                 {
//                   path: "attendancemain",
//                   element: <AdminAttendanceMain />,
//                 },
//                 {
//                   path: "attendance1",
//                   element: <Attendance1 />,
//                 },
//                 {
//                   path: "attendance2",
//                   element: <Attendance2 />,
//                 },

//                 {
//                   path: "PayrollSalaryReport",
//                   element: <PayrollSalaryReport />,
//                 },

//                 {
//                   path: "paysliphistory", // Overtime request inside the dashboard
//                   element: <PayslipHistory />,
//                 },
//                 {
//                   path: "advancesalary", // Overtime request inside the dashboard
//                   element: <AdvanceSalary />,
//                 },
//                 {
//                   path: "loan", // Overtime request inside the dashboard
//                   element: <Loan />,
//                 },
//                 //
//                 {
//                   path: "billinginvoices", // Overtime request inside the dashboard
//                   element: <BillingInvoices />,
//                 },

//                 {
//                   path: "calendar", // Overtime request inside the dashboard
//                   element: <CalendarPage />,
//                 },
//                 {
//                   path: "invoicepayments", // Overtime request inside the dashboard
//                   element: <InvoicePayments />,
//                 },
//                 {
//                   path: "taxtype", // Overtime request inside the dashboard
//                   element: <TaxType />,
//                 },
//                 {
//                   path: "estimates", // Overtime request inside the dashboard
//                   element: <Estimates />,
//                 },
//                 {
//                   path: "estimatescalendar", // Overtime request inside the dashboard
//                   element: <EstimateCalendar />,
//                 },
//                 {
//                   path: "leaverequest", // Overtime request inside the dashboard
//                   element: <LeaveRequest />,
//                 },
//                 {
//                   path: "leavedetails/:id", // Overtime request inside the dashboard
//                   element: <AdminLeaveDetails />,
//                 },
//                 {
//                   path: "holidayTBL", // Overtime request inside the dashboard
//                   element: <HolidayTBL />,
//                 },
//                 {
//                   path: "leaveManagementTable", // Overtime request inside the dashboard
//                   element: <LeaveManagementTable />,
//                 },
//                 {
//                   path: "leaveTypewiseTable", // Overtime request inside the dashboard
//                   element: <LeaveTypewiseTable />,
//                 },
//                 {
//                   path: "mainLeave", // Overtime request inside the dashboard
//                   element: <MainLeave />,
//                 },
//                 {
//                   path: "pendingApprovalsTable", // Overtime request inside the dashboard
//                   element: <PendingApprovalsTable />,
//                 },
//                 {
//                   path: "annualLeaveReport", // Overtime request inside the dashboard
//                   element: <AnnualLeaveReport />,
//                 },
//                 {
//                   path: "AllEmpLeaveReports", // Overtime request inside the dashboard
//                   element: <AllEmpLeaveReports />,
//                 },
//                 {
//                   path: "LeaveBalanceReport", // Overtime request inside the dashboard
//                   element: <LeaveBalanceReport />,
//                 },

//                 {
//                   path: "departmentWiseLeaveReport", // Overtime request inside the dashboard
//                   element: <DepartmentWiseLeaveReport />,
//                 },
//                 {
//                   path: "employeeAnnualLeaveReport", // Overtime request inside the dashboard
//                   element: <EmployeeAnnualLeaveReport />,
//                 },
//                 {
//                   path: "employeePendingLeaveReport", // Overtime request inside the dashboard
//                   element: <EmployeePendingLeaveReport />,
//                 },
//                 {
//                   path: "monthlyleaveReport", // Overtime request inside the dashboard
//                   element: <MonthlyleaveReport />,
//                 },


//                 {
//                   path: "trainingsessions", // Overtime request inside the dashboard
//                   element: <TrainingSession />,
//                 },
//                 {
//                   path: "trainers", // Overtime request inside the dashboard
//                   element: <Trainers />,
//                 },
//                 {
//                   path: "training-skills", // Overtime request inside the dashboard
//                   element: <TrainingSkills />,
//                 },
//                 {
//                   path: "training-calendar", // Overtime request inside the dashboard
//                   element: <TrainingCalendar />,
//                 },
//                 {
//                   path: "disciplinary-cases", // Overtime request inside the dashboard
//                   element: <DisciplinaryCases />,
//                 },
//                 {
//                   path: "case-type", // Overtime request inside the dashboard
//                   element: <CaseType />,
//                 },
//                 {
//                   path: "kpi-indicator", // Overtime request inside the dashboard
//                   element: <PerformanceIndicator />,
//                 },
//                 {
//                   path: "kpi-appraisal", // Overtime request inside the dashboard
//                   element: <PerformanceAppraisal />,
//                 },
//                 {
//                   path: "competencies", // Overtime request inside the dashboard
//                   element: <Competencies />,
//                 },
//                 {
//                   path: "goalscalendar", // Overtime request inside the dashboard
//                   element: <GoalsCalendar />,
//                 },
//                 {
//                   path: "goaltype", // Overtime request inside the dashboard
//                   element: <GoalType />,
//                 },
//                 {
//                   path: "trackgoals", // Overtime request inside the dashboard
//                   element: <TrackGoals />,
//                 },
//                 {
//                   path: "payroll", // Overtime request inside the dashboard
//                   element: <Payroll />,
//                 },
//                 {
//                   path: "paysliphistory", // Overtime request inside the dashboard
//                   element: <PayslipHistory />,
//                 },
//                 {
//                   path: "newopenings", // Overtime request inside the dashboard
//                   element: <NewOpenings />,
//                 },
//                 {
//                   path: "candidates", // Overtime request inside the dashboard
//                   element: <Candidates />,
//                 },
//                 {
//                   path: "interviews", // Overtime request inside the dashboard
//                   element: <Interviews />,
//                 },
//                 {
//                   path: "helpdesk", // helpdesk
//                   element: <Helpdesk />,
//                 },
//                 {
//                   path: "resignpaneladmin", // helpdesk
//                   element: <ResignPanel />,
//                 },
//                 {
//                   path: "promotions", // Overtime request inside the dashboard
//                   element: <Promotions />,
//                 },
//               ],
//             },
//           ],
//         },
//       ],
//     },


//     {
//       path: "/hrms/interndashboard",
//       element: <ProtectedRoute requiredRole="Intern" />,
//       children: [
//         {
//           element: <DashboardIntern />, // dashboard layout
//           children: [
//             {
//               element: <Layout />, // includes Chatbot + Outlet
//               children: [
//                 { path: "home", element: <HomeViewIntern /> },
//                 { path: "attendance", element: <AttendanceViewIntern /> },
//                 { path: "monthly-report", element: <MonthlyReportIntern /> },
//                 { path: "holiday", element: <HolidayViewIntern /> },
//                 { path: "projects", element: <ProjectsViewIntern /> },
//                 { path: "tasks", element: <TasksViewIntern /> },
//                 { path: "helpdesk", element: <HelpdeskIntern /> },
//                 { path: "disciplinary", element: <DisciplinaryIntern /> },
//               ],
//             },
//           ],
//         },
//       ],
//     },
//     {
//       path: "/hrms/dashboardhr",
//       element: <ProtectedRoute requiredRole="HR" />,
//       children: [
//         {
//           element: <DashboardHr />,
//           children: [
//             {
//               element: <Layout />,
//               children: [
//                 { path: "home", element: <HomeViewHr /> },
//                 {
//                   path: "add_employees", // Employees view inside the dashboard
//                   element: <AdminEmployeesViewHr />,
//                 },
//                 {
//                   path: "employeedetailHr/:id", // Employees view inside the dashboard
//                   element: <EmployeeIdProvider> <EmployeeDetailHr /></EmployeeIdProvider>,
//                 },
//                 { path: "EmployeeExitHr", element: <EmployeeExitHr /> },


//                    { path: "exitDashboardHr", element: <ExitDashboardHr /> },
//                  { path: "employeeExitMain", element: <EmployeeExitMain /> },
//                 { path: "exitProcessHr/:employeeId", element: <ExitProcessHr /> },




//                 { path: "employee", element: <ActiveEmpHr /> },
//                 { path: "attendance", element: <AttendanceViewHr /> },
//                 { path: "monthly-report", element: <MonthlyReportHr /> },
//                 { path: "holiday-view", element: <HolidayViewHr /> },
//                 { path: "projects", element: <ProjectsViewHr /> },
//                 { path: "tasks", element: <TasksViewHr /> },
//                 { path: "leave-request", element: <LeaveManagementHr /> },
//                 { path: "leavetype", element: <LeaveTypeHr /> },
//                 { path: "policies", element: <PoliciesHr /> },
//                 { path: "eventshr", element: <EventsHr /> },
//                 { path: "assesthr", element: <AssestHr /> },
//                 { path: "awardshr", element: <AwardsHr /> },
//                 { path: "documenthr", element: <DocumentsHr /> },
//                 { path: "resignationhr", element: <ResignationHr /> },
//                 { path: "helpdeskhr", element: <HelpdeskHr /> },
//                 { path: "payrollhr", element: <PayRollHr /> },
//                 { path: "confirmation", element: <PerformanceTableHR /> },
//                 {
//                   path: "marks/:id",
//                   element: <MarksHR/>,
//                 },
//                 {path:"MetricsForm",element:<MetricsForm/>}
//               ],
//             },
//           ],
//         },
//       ],
//     },
//   ]);

//   return <RouterProvider router={router} />;
// }

// export default App;











import React from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DashboardAdmin from "./DashboardSuperAdmin";
import DashboardEmployee from "./DashboardEmployee";
import DashboardHr from "./DashboardHr";
import DashboardIntern from "./DashboardIntern";
import DashboardHead from "./DashboardHead";
import DashboardLineManager from "./DashboardLineManager";

import Login from "./Auth/LoginPage";
import ForgotPasswordPage from "./Auth/ForgotPasswordPage.";
import HomeView from "./SuperAdmin/AdminHomeView";
import MonthlyReport from "./SuperAdmin/AdminMonthlyReport";
import AdminEmployeesView from "./SuperAdmin/Employee/AdminEmployeesView";
import RolesView from "./SuperAdmin/Employee/Roles";
import ShiftsView from "./SuperAdmin/Employee/Shifts";
import EmployeeExit from "./SuperAdmin/Employee/EmployeeExit";


// attendence 

import AdminAttendanceView from "./SuperAdmin/AdminAttendanceView";
import ManualAttendance from "./SuperAdmin/AdminManualAttendance";

import EmployeeExitEmp from "./EmployeePortal/EmployeeExitEmp";
import DailyAttendanceReport from "./SuperAdmin/AttendanceSection/AttendenceReports/DailyAttendanceReport";
import MonthlyAttendanceReprt from "./SuperAdmin/AttendanceSection/AttendenceReports/MonthlyAttendanceReprt";
import MonthlyPunchINOUT from "./SuperAdmin/AttendanceSection/AttendenceReports/MonthlyPunchINOUT";

// Allreport  
import NewJoinerReport from "./SuperAdmin/AllReports/NewjoinerReport";

import OvertimeRequest from "./SuperAdmin/AdminOvertimeRequest";
import Account from "./SuperAdmin/Finance/Accounts";
import Department from "./SuperAdmin/CoreHR/Department";
import Designation from "./SuperAdmin/CoreHR/Designation";
import Headquarters from "./SuperAdmin/CoreHR/HeadQuaters";
import Policies from "./SuperAdmin/CoreHR/Policies";
import MakeAnnouncement from "./SuperAdmin/CoreHR/MakeAnnouncement";
import OrganizationChart from "./SuperAdmin/CoreHR/OrganizationChart";
import Monitoring from "./SuperAdmin/AdminMonitoring";
import Tasks from "./SuperAdmin/AdminTasks";
import Projects from "./SuperAdmin/AdminProjects";
import ManageClients from "./SuperAdmin/AdminManageClients";
import ManageLeads from "./SuperAdmin/AdminLeads";
import Deposit from "./SuperAdmin/Finance/Deposit";
import Transactions from "./SuperAdmin/Finance/Transactions";
import Expense from "./SuperAdmin/Finance/Expense";
import Payroll from "./SuperAdmin/Payroll/Payroll";
import PayslipHistory from "./SuperAdmin/Payroll/PayslipHistory";
import AdvanceSalary from "./SuperAdmin/Payroll/AdvanceSalary";
import Loan from "./SuperAdmin/Payroll/Loan";
import PerformanceIndicator from "./SuperAdmin/Performances/PerformanceIndicator";
import PerformanceAppraisal from "./SuperAdmin/Performances/PerformanceAppraisal";
import Competencies from "./SuperAdmin/Performances/Competencies";
import BillingInvoices from "./SuperAdmin/Invoices/BillingInvoices";
import InvoicePayments from "./SuperAdmin/Invoices/InvoicePayment";
import TaxType from "./SuperAdmin/Invoices/TaxType";
import CalendarPage from "./SuperAdmin/Invoices/Calendar";
import GoalsCalendar from "./SuperAdmin/Performances/GoalsCalendar";
import EstimateCalendar from "./SuperAdmin/Estimates/EstimateCalendar";
import Estimates from "./SuperAdmin/Estimates/Estimates";
import LeaveRequest from "./SuperAdmin/AdminLeaveRequest";
import TrainingSession from "./SuperAdmin/TrainingSections/TrainingSession";
import TrainingCalendar from "./SuperAdmin/TrainingSections/TrainingCalendar";
import TrainingSkills from "./SuperAdmin/TrainingSections/TrainingSkills";
import Trainers from "./SuperAdmin/TrainingSections/Trainers";
import DisciplinaryCases from "./SuperAdmin/Disciplinary Cases/DisciplinaryCases";
import CaseType from "./SuperAdmin/Disciplinary Cases/CaseType";
import GoalType from "./SuperAdmin/Performances/GoalType";
import TrackGoals from "./SuperAdmin/Performances/TrackGoals";
import NewOpenings from "./SuperAdmin/Recruitement/NewOpenings";
import Candidates from "./SuperAdmin/Recruitement/Candidates";
import Interviews from "./SuperAdmin/Recruitement/Interviews";
import Promotions from "./SuperAdmin/Recruitement/Promotions";
import EventAdmin from "./SuperAdmin/Apps/EventsAdmin";
import AwardsAdmin from "./SuperAdmin/Apps/AwardsAdmin";
import AssestAdmin from "./SuperAdmin/Apps/AssestsAdmin";
import HolidaysAdmin from "./SuperAdmin/Apps/Holidays";
import TravelsHome from "./SuperAdmin/Travels/TravelsHome";
import TravelArrangemntAdmin from "./SuperAdmin/Travels/AdminArrangementTravels";
// payroll 
import PayrollReport from "./SuperAdmin/Payroll/PayrollReport";

import BankStatement from "./SuperAdmin/Payroll/BankStatement";
import VisitorBook from './SuperAdmin/Apps/VistorBook';
import CoreHrDashboard from './SuperAdmin/CoreHR/DashboardCoreHr';
import Division from "./SuperAdmin/CoreHR/Division";
import Grade from "./SuperAdmin/CoreHR/Grade";
import CompanyDetails from "./SuperAdmin/CoreHR/CompanyDetails";
import EmployeeConfirmation from './SuperAdmin/EmployeeConfirmation/Confirmation';
// import PerformanceTable from './SuperAdmin/EmployeeConfirmation/PerformanceTable';
// import Marks from './SuperAdmin/EmployeeConfirmation/Marks';
import { PerformanceTable, Marks } from './SuperAdmin/EmployeeConfirmation/PerformanceTable';
import MainEmployeeExit from './SuperAdmin/ExitEmployeeEmployee/main';
import AssetDashboard from "./SuperAdmin/ExitEmployeeEmployee/AssetDashboard";
import EmployeeExitProcess from "./SuperAdmin/ExitEmployeeEmployee/EmployeeExitProcess";
import ExitDashboard from "./SuperAdmin/ExitEmployeeEmployee/ExitDashboard";
import TerminationDashboard from "./SuperAdmin/ExitEmployeeEmployee/TerminationDashboard";

import ConfirmationReport from "./SuperAdmin/Payroll/ConfirmationReport";
import SalaryStructureReport from "./SuperAdmin/Payroll/SalaryStructureReport";
import PfReport from "./SuperAdmin/Payroll/PfReport";
import PtReport from "./SuperAdmin/Payroll/PtReport";
import YTDEmployeeSalaryReport from "./SuperAdmin/Payroll/YTDEmployeeSalaryReport";
import ConfirmationList from "./SuperAdmin/Payroll/ConfirmationList";
import DashboardPayroll from "./SuperAdmin/Payroll/DashboardPayroll";
import AttendanceReport from "./SuperAdmin/Payroll/AttendanceReport";
import PayrollSalaryReport from "./SuperAdmin/Payroll/PayrollSalaryReport";
import Assets from "./SuperAdmin/Apps/Assets";
import Category from "./SuperAdmin/Apps/Category";
import Brands from "./SuperAdmin/Apps/Brands";
import Helpdesk from "./SuperAdmin/Helpdesk";
import ResignPanel from "./SuperAdmin/ResignAdminPanel";
import DailyMonitoringData from "./SuperAdmin/MonitorningPMD/DailyMonitoringData";
import DashboardMonitoringPMD from "./SuperAdmin/MonitorningPMD/Dashboard";
import EmployeeListPMD from "./SuperAdmin/MonitorningPMD/EmployeeList";
import ViewReportPMD from "./SuperAdmin/MonitorningPMD/ViewReport";
import { EmployeeIdProvider } from './SuperAdmin/Employee/EmployeeContext';
import EmployeeDetailReport from "./SuperAdmin/Employee/EmployeeDetailReport";
import EmployeeMasterReport from "./SuperAdmin/Employee/EmployeeMasterReport";
// import AnnualManpowerReport from "./SuperAdmin/Employee/AnnualManpowerReport";
import DesignationDepartmentReport from "./SuperAdmin/Employee/DesignationDepartmantReport";
import LeaveSetup from "./SuperAdmin/CoreHR/LeaveSetup";
import PayrollSetup from "./SuperAdmin/CoreHR/PayrollSetup";
import HolidayTBL from './SuperAdmin/LeavePanelDashboard/HolidayTBL';
import LeaveManagementTable from './SuperAdmin/LeavePanelDashboard/LeaveManagementTable';
import LeaveTypewiseTable from './SuperAdmin/LeavePanelDashboard/LeaveTypewiseTable';
import MainLeave from './SuperAdmin/LeavePanelDashboard/Main';
import PendingApprovalsTable from "./SuperAdmin/LeavePanelDashboard/PendingApprovalsTable";
import AnnualLeaveReport from './SuperAdmin/Leave Reports/AnnualLeaveReport';
import DepartmentWiseLeaveReport from './SuperAdmin/Leave Reports/DepartmentWiseLeaveReport';
import EmployeeAnnualLeaveReport from './SuperAdmin/Leave Reports/EmployeeAnnualLeaveReport';
import AllEmpLeaveReports from "./SuperAdmin/Leave Reports/AllEmpLeaveReports";
import LeaveBalanceReport from "./SuperAdmin/Leave Reports/LeaveBalanceReport";



import EmployeePendingLeaveReport from './SuperAdmin/Leave Reports/EmployeePendingLeaveReport';
import MonthlyleaveReport from './SuperAdmin/Leave Reports/MonthlyLeaveReport';
import BirthdayInMonth from './SuperAdmin/Employee/EmployeeDashbord/BirthdaysInMonth';
import ConfirmationPending from './SuperAdmin/Employee/EmployeeDashbord/ConfirmationPending';
import EmployeesMain from './SuperAdmin/Employee/EmployeeDashbord/EmployeesMain';
import WorkAnniversary from "./SuperAdmin/Employee/EmployeeDashbord/WorkAnniversary";
import AdminLeaveDetails from './SuperAdmin/LeaveDetails';
import AdminAttendanceMain from './SuperAdmin/AttendanceSection/AttendanceMain';
import Attendance1 from "./SuperAdmin/AttendanceSection/AttendanceFirst";
import Attendance2 from "./SuperAdmin/AttendanceSection/AttendanceSecond";
import DashboardConfirmation from './SuperAdmin/EmployeeConfirmation/DashboardConfirmation';
import ConfirmationMain from "./SuperAdmin/EmployeeConfirmation/ConfirmationMain";
import Parameter from './SuperAdmin/EmployeeConfirmation/ParameterCreation';
import MainPayroll from './SuperAdmin/Pay Roll Managment/page';
import PaymentInfo from "./SuperAdmin/Pay Roll Managment/payment-info";
import PayrollSetupManagement from "./SuperAdmin/Pay Roll Managment/payroll-setup";
import PayslipFinalization from "./SuperAdmin/Pay Roll Managment/payslip-finalization";
import SalaryCalculation from "./SuperAdmin/Pay Roll Managment/salary-calculation";
import PolicyAllocation from "./SuperAdmin/Policy/PolicyAllocation";
import Role from './SuperAdmin/CoreHR/Roles'


import HomeViewEmp from "./EmployeePortal/HomeViewEmp";
import AttendanceViewEmp from "./EmployeePortal/AttendanceViewEmp";
import HolidayViewEmp from "./EmployeePortal/HolidayViewEmp";
import ProjectsViewEmp from "./EmployeePortal/ProjectsViewEmp";
import TasksViewEmp from "./EmployeePortal/TasksViewEmp";
import LeaveRequestViewEmp from "./EmployeePortal/LeaveRequestViewEmp";
import LeaveTypeEmp from "./EmployeePortal/LeaveTypeEmp";
import MonthlyReportEmp from "./EmployeePortal/MonthlyReportEmp";
import PoliciesEmp from "./EmployeePortal/PoliciesEmp";
import HelpdeskEmp from "./EmployeePortal/HelpDeskEmp";
import AppsCompEmp from "./EmployeePortal/AppsCompEmp";
import AssestEmp from "./EmployeePortal/AssestEmp";
import AwardsEmp from "./EmployeePortal/AwardsEmp";
import DocumentsEmp from "./EmployeePortal/DocumentsEmp";
import ResignationManagementEmp from "./EmployeePortal/ResignationPageEmp";
import PayRollEmp from "./EmployeePortal/PayRollEmp";
import AssetsEmp from "./EmployeePortal/AssetsEmp";
import CategoryEmp from "./EmployeePortal/CategoryEmp";
import BrandEmp from "./EmployeePortal/BrandEmp";
import ProjectDetail from "./EmployeePortal/ProjectDetail";
import ExitProcessHr from "./HrPortal/ExitProcessHr";

import HomeViewHead from "./HeadPortal/HomeViewHead";
import EmployeeExitHead from "./HeadPortal/EmployeeExitHead";

import AttendanceViewHead from "./HeadPortal/AttendanceViewHead";
import HolidayViewHead from "./HeadPortal/HolidayViewHead";
import ProjectsViewHead from "./HeadPortal/ProjectsViewHead";
import TasksViewHead from "./HeadPortal/TasksViewHead";
import LeaveRequestViewHead from "./HeadPortal/LeaveRequestViewHead";
import LeaveTypeHead from "./HeadPortal/LeaveTypeHead";
import MonthlyReportHead from "./HeadPortal/MonthlyReportHead";
import PoliciesHead from "./HeadPortal/PoliciesHead";
import HelpdeskHead from "./HeadPortal/HelpDeskHead";
import AppsCompHead from "./HeadPortal/AppsCompHead";
import AssestHead from "./HeadPortal/AssestHead";
import AwardsHead from "./HeadPortal/AwardsHead";
import DocumentsHead from "./HeadPortal/DocumentsHead";
import ResignationManagementHead from "./HeadPortal/ResignationPageHead";
import PayRollHead from "./HeadPortal/PayRollHead";
import AssetsHead from "./HeadPortal/AssetsHead";
import CategoryHead from "./HeadPortal/CategoryHead";
import BrandHead from "./HeadPortal/BrandHead";
import ProjectDetailHead from "./HeadPortal/ProjectDetailHead";
// import PerformanceTableHead from "./HeadPortal/EmployeeConfirmation/PerformanceTableHead";
// import MarksHead from "./HeadPortal/EmployeeConfirmation/MarksHead";
import { PerformanceTableHead, MarksHead } from './HeadPortal/EmployeeConfirmation/PerformanceTableHead';

import HomeViewLM from "./LineManagerPortal/HomeViewLM";
import AttendanceViewLM from "./LineManagerPortal/AttendanceViewLM";
import HolidayViewLM from "./LineManagerPortal/HolidayViewLM";
import ProjectsViewLM from "./LineManagerPortal/ProjectsViewLM";
import TasksViewLM from "./LineManagerPortal/TasksViewLM";
import LeaveApprovalsLM from "./LineManagerPortal/LeaveApprovals";
import LeaveRequestViewLM from "./LineManagerPortal/LeaveRequestViewLM";
import LeaveTypeLM from "./LineManagerPortal/LeaveTypeLM";
import MonthlyReportLM from "./LineManagerPortal/MonthlyReportLM";
import PoliciesLM from "./LineManagerPortal/PoliciesLM";
import HelpdeskLM from "./LineManagerPortal/HelpDeskLM";
import AppsCompLM from "./LineManagerPortal/AppsCompLM";
import AssestLM from "./LineManagerPortal/AssestLM";
import AwardsLM from "./LineManagerPortal/AwardsLM";
import DocumentsLM from "./LineManagerPortal/DocumentsLM";
import ResignationManagementLM from "./LineManagerPortal/ResignationPageLM";
import PayRollLM from "./LineManagerPortal/PayRollLM";
import AssetsLM from "./LineManagerPortal/AssetsLM";
import CategoryLM from "./LineManagerPortal/CategoryLM";
import BrandLM from "./LineManagerPortal/BrandLM";
import ProjectDetailLM from "./LineManagerPortal/ProjectDetailLM";
// import PerformanceTableLM from "./LineManagerPortal/EmployeeConfirmation/PerformanceTableLM";
// import MarksLM from "./LineManagerPortal/EmployeeConfirmation/MarksLM";
import { PerformanceTableLM, MarksLM }  from "./LineManagerPortal/EmployeeConfirmation/PerformanceTableLM";
import EmployeeExitLM from "./LineManagerPortal/EmployeeExitLM";


import HomeViewHr from "./HrPortal/HomeViewHr";
import ActiveEmpHr from "./HrPortal/ActiveEmpHr";
import AttendanceViewHr from "./HrPortal/AttendanceViewHr";
import MonthlyReportHr from "./HrPortal/MonthlyReportHr";
import HolidayViewHr from "./HrPortal/HolidayViewHr";
import ProjectsViewHr from "./HrPortal/ProjectViewHr";
import TasksViewHr from "./HrPortal/TaskViewHr";
import LeaveManagementHr from "./HrPortal/LeaveRequestViewHr";
import LeaveTypeHr from "./HrPortal/LeaveTypeHr";
import PoliciesHr from "./HrPortal/PoliciesHr";
import EventsHr from "./HrPortal/EventsHr";
import AssestHr from "./HrPortal/AssestHr";
import AwardsHr from "./HrPortal/AwardsHr";
import DocumentsHr from "./HrPortal/DocumentsHr";
import ResignationHr from "./HrPortal/ResignationPageHr";
import HelpdeskHr from "./HrPortal/HelpDeskHr";
import PayRollHr from "./HrPortal/PayRollHr";
// import ConfirmationEmployeeHr from './HrPortal/Confirmation';
import { PerformanceTableHR, MarksHR }  from "./HrPortal/Confirmation";
import RevenueExpenseManagement from "./HrPortal/RevenueExpenseManagement";

import AdminEmployeesViewHr from "./HrPortal/Employee/AdminEmployeesViewHr";
import EmployeeExitHr from "./HrPortal/Employee/EmployeeExitHr";
import EmployeeDetailHr from "./HrPortal/Employee/EmployeeDetailHr";

import EmployeeExitMain from "./HrPortal/EmployeeExitMain";
import ExitDashboardHr from "./HrPortal/ExitDashboardHr";
// import YtdEmployeeSalaryReport from "./SuperAdmin/Payroll/YTDEmployeeSalaryReport";
// import LeaveRequestViewHr from './HrPortal/LeaveRequestViewHr';
import PolicyDashboard from "./SuperAdmin/CoreHR/PolicyDashboard";
import HomeViewIntern from "./InternPortal/HomeViewIntern";
import AttendanceViewIntern from "./InternPortal/AttendanceViewIntern";
import MonthlyReportIntern from "./InternPortal/MonthlyReportIntern";
import HolidayViewIntern from "./InternPortal/HolidayViewIntern";
import ProjectsViewIntern from "./InternPortal/ProjectsViewIntern";
import TasksViewIntern from "./InternPortal/TasksViewIntern";
import HelpdeskIntern from "./InternPortal/HelpDeskIntern";
import DisciplinaryIntern from "./InternPortal/DisciplinaryIntern";
import EmployeeDetail from "./SuperAdmin/Employee/EmployeeDetail";
import EmployeeHub from './SuperAdmin/CoreHR/EmployeeHub';
import ProtectedRoute from "./Auth/ProtectedRoute";

import { Outlet } from "react-router-dom";
import ChatBot from "./ChatBot";




// START: Added imports for new reports
import HrMasterDataReport from "./SuperAdmin/AllReports/HrMasterDataReport";
import EmployeeConfirmationReport from "./SuperAdmin/AllReports/EmployeeConfirmationReport";
import EmployeeLeavePatternReport from "./SuperAdmin/AllReports/EmployeeLeavePatternReport";
import EmployeePipReport from "./SuperAdmin/AllReports/EmployeePipReport";
import EmployeeExitReport from "./SuperAdmin/AllReports/EmployeeExitReport";
import AnnualManpowerReport from "./SuperAdmin/AllReports/AnnualManpowerReport";
import EmployeeAttritionReport from "./SuperAdmin/AllReports/EmployeeAttritionReport";
import PerformanceManagementReport from "./SuperAdmin/AllReports/PerformanceManagementReport";
import AnnualAppraisalReport from "./SuperAdmin/AllReports/AnnualAppraisalReport";
import PromotionReport from "./SuperAdmin/AllReports/PromotionReport";
import GratuityEligibilityReport from "./SuperAdmin/AllReports/GratuityEligibilityReport";
import EmpPFReport from "./SuperAdmin/AllReports/PFReport";
import EmpPayrollSalaryReport from "./SuperAdmin/AllReports/PayrollSalaryReport";
import SalaryReport from "./SuperAdmin/AllReports/SalaryReport";
import PTReport from "./SuperAdmin/AllReports/PTReport";
import EmpMasterDataReport from "./SuperAdmin/AllReports/EmpMasterDataReport";
import Recruitmenttracker from "./SuperAdmin/AllReports/Recruitmenttracker"
import MetricsForm from "./HrPortal/MetricsForm";
import MetricsFromAdmin from "./SuperAdmin/MetricsFromAdmin";
import ExitandTerminationAd from "./SuperAdmin/ExitandTermination/ExitandTerminationAd";





const Layout = () => {
  return (
    <>
      <Outlet />
      {/* <ChatBot /> */}
    </>
  );
};

function App() {
  const router = createBrowserRouter([
    {
      path: "/hrms",
      element: <Login />,
    },
    {
      path: "/hrms/forgot-password",
      element: <ForgotPasswordPage />,
    },
    {
      path: "/hrms/dashboard",
      element: <ProtectedRoute requiredRole="staff" />,
      children: [
        {
          element: <DashboardEmployee />,
          children: [
            {
              element: <Layout />,
              children: [
                {
                  path: "home",
                  element: <HomeViewEmp />,
                },
                {
                  path: "attendance",
                  element: <AttendanceViewEmp />,
                },
                {
                  path: "monthly-report",
                  element: <MonthlyReportEmp />,
                },
                 {
                  path: "employeeExitEmp",
                  element: <EmployeeExitEmp />,
                },
                
                {
                  path: "holiday",
                  element: <HolidayViewEmp />,
                },
                {
                  path: "projects",
                  element: <ProjectsViewEmp />,
                },
                {
                  path: "projectdetail",
                  element: <ProjectDetail />,
                },
                {
                  path: "tasks",
                  element: <TasksViewEmp />,
                },
                {
                  path: "leave-request",
                  element: <LeaveRequestViewEmp />,
                },
                {
                  path: "leavetype",
                  element: <LeaveTypeEmp />,
                },
                {
                  path: "policies",
                  element: <PoliciesEmp />,
                },
                {
                  path: "helpdesk",
                  element: <HelpdeskEmp />,
                },
                {
                  path: "appscomp",
                  element: <AppsCompEmp />,
                },
                {
                  path: "assest",
                  element: <AssestEmp />,
                },
                {
                  path: "assetsemp", // Overtime request inside the dashboard
                  element: <AssetsEmp />,
                },
                {
                  path: "categoryemp", // Overtime request inside the dashboard
                  element: <CategoryEmp />,
                },
                {
                  path: "brandemp", // Overtime request inside the dashboard
                  element: <BrandEmp />,
                },
                {
                  path: "award",
                  element: <AwardsEmp />,
                },
                {
                  path: "document",
                  element: <DocumentsEmp />,
                },

                {
                  path: "resignation",
                  element: <ResignationManagementEmp />,
                },
                {
                  path: "payroll",
                  element: <PayRollEmp />,
                },
              ],
            },
          ],
        },
      ],
    },
    {
      path: "/hrms/dashboardHead",
      element: <ProtectedRoute requiredRole="Head" />,
      children: [
        {
          element: <DashboardHead />,
          children: [
            {
              element: <Layout />,
              children: [
                {
                  path: "home",
                  element: <HomeViewHead />,
                },
                {
                  path: "attendance",
                  element: <AttendanceViewHead />,
                },
                {
                  path: "monthly-report",
                  element: <MonthlyReportHead />,
                },
                {
                  path: "holiday",
                  element: <HolidayViewHead />,
                },
                {
                  path: "projects",
                  element: <ProjectsViewHead />,
                },
                {
                  path: "projectdetail",
                  element: <ProjectDetailHead />,
                },
                {
                  path: "tasks",
                  element: <TasksViewHead />,
                },
                {
                  path: "leave-request",
                  element: <LeaveRequestViewHead />,
                },
                {
                  path: "leavetype",
                  element: <LeaveTypeHead />,
                },
                {
                  path: "policies",
                  element: <PoliciesHead />,
                },
                {
                  path: "helpdesk",
                  element: <HelpdeskHead />,
                },
                {
                  path: "employeeExitHead",
                  element: <EmployeeExitHead />,
                },
                {
                  path: "appscomp",
                  element: <AppsCompHead />,
                },
                {
                  path: "assest",
                  element: <AssestHead />,
                },
                {
                  path: "assetsemp", // Overtime request inside the dashboard
                  element: <AssetsHead />,
                },
                {
                  path: "categoryemp", // Overtime request inside the dashboard
                  element: <CategoryHead />,
                },
                {
                  path: "brandemp", // Overtime request inside the dashboard
                  element: <BrandHead />,
                },
                {
                  path: "award",
                  element: <AwardsHead />,
                },
                {
                  path: "document",
                  element: <DocumentsHead />,
                },

                {
                  path: "resignation",
                  element: <ResignationManagementHead />,
                },
                {
                  path: "payroll",
                  element: <PayRollHead />,
                },
                {
                  path: "performanceTable",
                  element: <PerformanceTableHead />,
                },
                {
                  path: "marks/:id",
                  element: <MarksHead />,
                },
              ],
            },
          ],
        },
      ],
    },
    {
      path: "/hrms/dashboardLM",
      element: <ProtectedRoute requiredRole="Line Manager" />,
      children: [
        {
          element: <DashboardLineManager />,
          children: [
            {
              element: <Layout />,
              children: [
                {
                  path: "home",
                  element: <HomeViewLM />,
                },
                {
                  path: "attendance",
                  element: <AttendanceViewLM />,
                },
                {
                  path: "monthly-report",
                  element: <MonthlyReportLM />,
                },
                {
                  path: "holiday",
                  element: <HolidayViewLM />,
                },
                {
                  path: "projects",
                  element: <ProjectsViewLM />,
                },
                {
                  path: "projectdetail",
                  element: <ProjectDetailLM />,
                },
                {
                  path: "tasks",
                  element: <TasksViewLM />,
                },
                {
                  path: "leave-request",
                  element: <LeaveRequestViewLM />,
                },
                {
                  path: "leavetype",
                  element: <LeaveTypeLM />,
                },
                {
                  path: "leaveapprovals",
                  element: <LeaveApprovalsLM />,
                },
                {
                  path: "policies",
                  element: <PoliciesLM />,
                },
                {
                  path: "helpdesk",
                  element: <HelpdeskLM />,
                },
                {
                  path: "appscomp",
                  element: <AppsCompLM />,
                },
                {
                  path: "assest",
                  element: <AssestLM />,
                },
                {
                  path: "assetsemp", // Overtime request inside the dashboard
                  element: <AssetsLM />,
                },
                {
                  path: "categoryemp", // Overtime request inside the dashboard
                  element: <CategoryLM />,
                },
                {
                  path: "brandemp", // Overtime request inside the dashboard
                  element: <BrandLM />,
                },
                {
                  path: "award",
                  element: <AwardsLM />,
                },
                {
                  path: "document",
                  element: <DocumentsLM />,
                },

                {
                  path: "resignation",
                  element: <ResignationManagementLM />,
                },
                {
                  path: "payroll",
                  element: <PayRollLM />,
                },
                {
                  path: "performanceTable",
                  element: <PerformanceTableLM />,
                },
                {
                  path: "marks/:id",
                  element: <MarksLM />,
                },
                {
                  path: "employeeExitLM",
                  element: <EmployeeExitLM />,
                },

              ],
            },
          ],
        },
      ],
    },

    {
      path: "/hrms/admindashboard", // Dashboard Layout for all the child routes
      element: <ProtectedRoute requiredRole="Admin" />,
      children: [
        {
          element: <DashboardAdmin />,
          children: [
            {
              element: <Layout />,
              children: [
                {
                  path: "home", // Home view inside the dashboard
                  element: <HomeView />,
                },
                {
                  path:"ExitandTerminationAd",
                  element:<ExitandTerminationAd/>
                },
                {
                  path:"MetricsFromAdmin",
                  element:<MetricsFromAdmin/>,
                },
                {
                  path: "mainemployeeexit", // Home view inside the dashboard
                  element: <MainEmployeeExit />,
                },
                {
                  path: "assetdashboard", // Home view inside the dashboard
                  element: <AssetDashboard />,
                },
                {
                  path: "employeeexitprocess", // Home view inside the dashboard
                  element: <EmployeeExitProcess />,
                },
                {
                  path: "termination", // Home view inside the dashboard
                  element: <TerminationDashboard />,
                },
                {
                  path: "exitdashboard", // Home view inside the dashboard
                  element: <ExitDashboard />,
                },
                {
                  path: "MainPayroll", // Home view inside the dashboard
                  element: <MainPayroll />,
                },
                {
                  path: "PaymentInfo", // Home view inside the dashboard
                  element: <PaymentInfo />,
                },
                {
                  path: "PayrollSetupManagement", // Home view inside the dashboard
                  element: <PayrollSetupManagement />,
                },
                {
                  path: "PayslipFinalization", // Home view inside the dashboard
                  element: <PayslipFinalization />,
                },
                {
                  path: "SalaryCalculation", // Home view inside the dashboard
                  element: <SalaryCalculation />,
                },
                {
                  path: "attendance", // Attendance view inside the dashboard
                  element: <AdminAttendanceView />,
                },
                {
                  path: "DailyAttendanceReport", // Home view inside the dashboard
                  element: <DailyAttendanceReport />,
                },
                {
                  path: "MonthlyAttendanceReprt", // Home view inside the dashboard
                  element: <MonthlyAttendanceReprt />,
                },
                {
                  path: "MonthlyPunchINOUT", // Home view inside the dashboard
                  element: <MonthlyPunchINOUT />,
                },
                {
                  path: "monthly-report", // Monthly Report view inside the dashboard
                  element: <MonthlyReport />,
                },
                {
                  path: "employees", // Employees view inside the dashboard
                  element: <AdminEmployeesView />,
                },
                {
                  path: "employeedetail/:id", // Employees view inside the dashboard
                  element: <EmployeeIdProvider> <EmployeeDetail /></EmployeeIdProvider>,
                },
                {
                  path: "annualManpowerReport", // Employees view inside the dashboard
                  element: <AnnualManpowerReport />,
                },
                {
                  path: "designationVSdepartmentReport", // Employees view inside the dashboard
                  element: <DesignationDepartmentReport />,
                },
                {
                  path: "employeeDetailReport", // Employees view inside the dashboard
                  element: <EmployeeDetailReport />,
                },
                {
                  path: "employeeMasterReport", // Employees view inside the dashboard
                  element: <EmployeeMasterReport />,
                },
                {
                  path: "NewJoinerReport", // Employees view inside the dashboard
                  element: <NewJoinerReport />,
                },
                // START: Added new report routes
                {
                  path: "hrMasterDataReport",
                  element: <HrMasterDataReport />,
                },
                {
                  path: "employeeConfirmationReport",
                  element: <EmployeeConfirmationReport />,
                },
                {
                  path: "employeeLeavePatternReport",
                  element: <EmployeeLeavePatternReport />,
                },
                {
                  path: "employeePipReport",
                  element: <EmployeePipReport />,
                },
                {
                  path: "employeeExitReport",
                  element: <EmployeeExitReport />,
                },
                {
                  path: "annualManpowerReport",
                  element: <AnnualManpowerReport />,
                },
                {
                  path: "employeeAttritionReport",
                  element: <EmployeeAttritionReport />,
                },
                {
                  path: "PerformanceManagementReport",
                  element: <PerformanceManagementReport />,
                },
                {
                  path: "AnnualAppraisalReport",
                  element: <AnnualAppraisalReport />,
                },
                {
                  path: "PromotionReport",
                  element: <PromotionReport />,
                },
                {
                  path: "PTReport",
                  element: <PTReport />,
                },
                {
                  path: "Recruitmenttracker",
                  element: <Recruitmenttracker />,
                },
                {
                  path: "EmpMasterDataReport",
                  element: <EmpMasterDataReport />,
                },
                {
                  path: "GratuityEligibilityReport",
                  element: <GratuityEligibilityReport />,
                },
                {
                  path: "PFReport",
                  element: <EmpPFReport />,
                },
                {
                  path: "SalaryReport",
                  element: <SalaryReport />,
                },


                {
                  path: "EmpPayrollSalaryReport",
                  element: <EmpPayrollSalaryReport />,
                },


                // END: Added new report routes
                {
                  path: "birthdayInMonth", // Employees view inside the dashboard
                  element: <BirthdayInMonth />,
                },
                {
                  path: "confirmationPending", // Employees view inside the dashboard
                  element: <ConfirmationPending />,
                },
                {
                  path: "employeesMain", // Employees view inside the dashboard
                  element: <EmployeesMain />,
                },
                {
                  path: "workAnniversary", // Employees view inside the dashboard
                  element: <WorkAnniversary />,
                },

                {
                  path: "roles", // Employees view inside the dashboard
                  element: <RolesView />,
                },
                {
                  path: "shifts", // Employees view inside the dashboard
                  element: <ShiftsView />,
                },
                {
                  path: "employeeexits", // Employees view inside the dashboard
                  element: <EmployeeExit />,
                },
                {
                  path: "manual-attendance", // Manual Attendance view inside the dashboard
                  element: <ManualAttendance />,
                },
                {
                  path: "overtime-request", // Overtime request inside the dashboard
                  element: <OvertimeRequest />,
                },
                {
                  path: "department", // Overtime request inside the dashboard
                  element: <Department />,
                },
                {
                  path: "designation", // Overtime request inside the dashboard
                  element: <Designation />,
                },
                {
                  path: "corehrdashboard",
                  element: <CoreHrDashboard />,
                },
                {
                  path: "division",
                  element: <Division />,
                },
                {
                  path: "grade",
                  element: <Grade />,
                },
                {
                  path: "employeehub",
                  element: <EmployeeHub />,
                },
                {
                  path: "companydetails",
                  element: <CompanyDetails />,
                },
                {
                  path: "role",
                  element: <Role />,
                },
                {
                  path: "headquaters", // Overtime request inside the dashboard
                  element: <Headquarters />,
                },
                {
                  path: "policies", // Overtime request inside the dashboard
                  element: <Policies />,
                },
                {
                  path: "policyDashboard", // Overtime request inside the dashboard
                  element: <PolicyDashboard />,
                },
                {
                  path: "payrollSetup", // Overtime request inside the dashboard
                  element: <PayrollSetup />,
                },
                {
                  path: "leaveSetup", // Overtime request inside the dashboard
                  element: <LeaveSetup />,
                },
                {
                  path: "makeannouncement", // Overtime request inside the dashboard
                  element: <MakeAnnouncement />,
                },
                {
                  path: "organizationchart", // Overtime request inside the dashboard
                  element: <OrganizationChart />,
                },
                {
                  path: "eventadmin", // Overtime request inside the dashboard
                  element: <EventAdmin />,
                },
                {
                  path: "assestadmin", // Overtime request inside the dashboard
                  element: <AssestAdmin />,
                },
                {
                  path: "assets", // Overtime request inside the dashboard
                  element: <Assets />,
                },
                {
                  path: "category", // Overtime request inside the dashboard
                  element: <Category />,
                },
                {
                  path: "brand", // Overtime request inside the dashboard
                  element: <Brands />,
                },
                {
                  path: "awardsadmin", // Overtime request inside the dashboard
                  element: <AwardsAdmin />,
                },
                {
                  path: "visitorbook", // Overtime request inside the dashboard
                  element: <VisitorBook />,
                },
                {
                  path: "holidaysadmin", // Overtime request inside the dashboard
                  element: <HolidaysAdmin />,
                },
                {
                  path: "travelshome", // Overtime request inside the dashboard
                  element: <TravelsHome />,
                },
                {
                  path: "travelsarrangment", // Overtime request inside the dashboard
                  element: <TravelArrangemntAdmin />,
                },
                {
                  path: "monitoring", // Overtime request inside the dashboard
                  element: <Monitoring />,
                },
                {
                  path: "parametercreation",
                  element: <Parameter />,
                },
                {
                  path: "employeeconfirmation",
                  element: <EmployeeConfirmation />,
                },
                {
                  path: "performanceTable",
                  element: <PerformanceTable />,
                },

                {
                  path: "marks/:id",
                  element: <Marks/>,
                },
                {
                  path: "employeeconfirmationMain",
                  element: <ConfirmationMain />,
                },
                {
                  path: "dailyMonitoringData", // Overtime request inside the dashboard
                  element: <DailyMonitoringData />,
                },
                {
                  path: "dashboardPMD", // Overtime request inside the dashboard
                  element: <DashboardMonitoringPMD />,
                },
                {
                  path: "employeelist", // Overtime request inside the dashboard
                  element: <EmployeeListPMD />,
                },
                {
                  path: "view-report/:employeeId", // Overtime request inside the dashboard
                  element: <ViewReportPMD />,
                },
                {
                  path: "taskData", // Overtime request inside the dashboard
                  element: <Tasks />,
                },
                {
                  path: "projects", // Overtime request inside the dashboard
                  element: <Projects />,
                },
                {
                  path: "manageclients", // Overtime request inside the dashboard
                  element: <ManageClients />,
                },
                {
                  path: "manageleads", // Overtime request inside the dashboard
                  element: <ManageLeads />,
                },
                {
                  path: "account", // Overtime request inside the dashboard
                  element: <Account />,
                },
                {
                  path: "deposit", // Overtime request inside the dashboard
                  element: <Deposit />,
                },
                {
                  path: "expense", // Overtime request inside the dashboard
                  element: <Expense />,
                },
                {
                  path: "transactions", // Overtime request inside the dashboard
                  element: <Transactions />,
                },
                {
                  path: "policyallocation",
                  element: <PolicyAllocation />,
                },
                {
                  path: "payroll", // Overtime request inside the dashboard
                  element: <Payroll />,
                },
                {
                  path: "payrollReport",
                  element: <PayrollReport />,
                },
                {
                  path: "bankStatement",
                  element: <BankStatement />,
                },
                {
                  path: "ConfirmationReport",
                  element: <ConfirmationReport />,
                },
                {
                  path: "dashboardConfirmation",
                  element: <DashboardConfirmation />,
                },
                {
                  path: "SalaryStructureReport",
                  element: <SalaryStructureReport />,
                },
                {
                  path: "PfReport",
                  element: <PfReport />,
                },
                {
                  path: "PtReport",
                  element: <PtReport />,
                },
                {
                  path: "YtdEmployeeSalaryReport",
                  element: <YTDEmployeeSalaryReport />,
                },
                {
                  path: "ConfirmationList",
                  element: <ConfirmationList />,
                },
                {
                  path: "DashboardPayroll",
                  element: <DashboardPayroll />,
                },
                {
                  path: "AttendanceReport",
                  element: <AttendanceReport />,
                },
                {
                  path: "attendancemain",
                  element: <AdminAttendanceMain />,
                },
                {
                  path: "attendance1",
                  element: <Attendance1 />,
                },
                {
                  path: "attendance2",
                  element: <Attendance2 />,
                },

                {
                  path: "PayrollSalaryReport",
                  element: <PayrollSalaryReport />,
                },

                {
                  path: "paysliphistory", // Overtime request inside the dashboard
                  element: <PayslipHistory />,
                },
                {
                  path: "advancesalary", // Overtime request inside the dashboard
                  element: <AdvanceSalary />,
                },
                {
                  path: "loan", // Overtime request inside the dashboard
                  element: <Loan />,
                },
                //
                {
                  path: "billinginvoices", // Overtime request inside the dashboard
                  element: <BillingInvoices />,
                },

                {
                  path: "calendar", // Overtime request inside the dashboard
                  element: <CalendarPage />,
                },
                {
                  path: "invoicepayments", // Overtime request inside the dashboard
                  element: <InvoicePayments />,
                },
                {
                  path: "taxtype", // Overtime request inside the dashboard
                  element: <TaxType />,
                },
                {
                  path: "estimates", // Overtime request inside the dashboard
                  element: <Estimates />,
                },
                {
                  path: "estimatescalendar", // Overtime request inside the dashboard
                  element: <EstimateCalendar />,
                },
                {
                  path: "leaverequest", // Overtime request inside the dashboard
                  element: <LeaveRequest />,
                },
                {
                  path: "leavedetails/:id", // Overtime request inside the dashboard
                  element: <AdminLeaveDetails />,
                },
                {
                  path: "holidayTBL", // Overtime request inside the dashboard
                  element: <HolidayTBL />,
                },
                {
                  path: "leaveManagementTable", // Overtime request inside the dashboard
                  element: <LeaveManagementTable />,
                },
                {
                  path: "leaveTypewiseTable", // Overtime request inside the dashboard
                  element: <LeaveTypewiseTable />,
                },
                {
                  path: "mainLeave", // Overtime request inside the dashboard
                  element: <MainLeave />,
                },
                {
                  path: "pendingApprovalsTable", // Overtime request inside the dashboard
                  element: <PendingApprovalsTable />,
                },
                {
                  path: "annualLeaveReport", // Overtime request inside the dashboard
                  element: <AnnualLeaveReport />,
                },
                {
                  path: "AllEmpLeaveReports", // Overtime request inside the dashboard
                  element: <AllEmpLeaveReports />,
                },
                {
                  path: "LeaveBalanceReport", // Overtime request inside the dashboard
                  element: <LeaveBalanceReport />,
                },

                {
                  path: "departmentWiseLeaveReport", // Overtime request inside the dashboard
                  element: <DepartmentWiseLeaveReport />,
                },
                {
                  path: "employeeAnnualLeaveReport", // Overtime request inside the dashboard
                  element: <EmployeeAnnualLeaveReport />,
                },
                {
                  path: "employeePendingLeaveReport", // Overtime request inside the dashboard
                  element: <EmployeePendingLeaveReport />,
                },
                {
                  path: "monthlyleaveReport", // Overtime request inside the dashboard
                  element: <MonthlyleaveReport />,
                },


                {
                  path: "trainingsessions", // Overtime request inside the dashboard
                  element: <TrainingSession />,
                },
                {
                  path: "trainers", // Overtime request inside the dashboard
                  element: <Trainers />,
                },
                {
                  path: "training-skills", // Overtime request inside the dashboard
                  element: <TrainingSkills />,
                },
                {
                  path: "training-calendar", // Overtime request inside the dashboard
                  element: <TrainingCalendar />,
                },
                {
                  path: "disciplinary-cases", // Overtime request inside the dashboard
                  element: <DisciplinaryCases />,
                },
                {
                  path: "case-type", // Overtime request inside the dashboard
                  element: <CaseType />,
                },
                {
                  path: "kpi-indicator", // Overtime request inside the dashboard
                  element: <PerformanceIndicator />,
                },
                {
                  path: "kpi-appraisal", // Overtime request inside the dashboard
                  element: <PerformanceAppraisal />,
                },
                {
                  path: "competencies", // Overtime request inside the dashboard
                  element: <Competencies />,
                },
                {
                  path: "goalscalendar", // Overtime request inside the dashboard
                  element: <GoalsCalendar />,
                },
                {
                  path: "goaltype", // Overtime request inside the dashboard
                  element: <GoalType />,
                },
                {
                  path: "trackgoals", // Overtime request inside the dashboard
                  element: <TrackGoals />,
                },
                {
                  path: "payroll", // Overtime request inside the dashboard
                  element: <Payroll />,
                },
                {
                  path: "paysliphistory", // Overtime request inside the dashboard
                  element: <PayslipHistory />,
                },
                {
                  path: "newopenings", // Overtime request inside the dashboard
                  element: <NewOpenings />,
                },
                {
                  path: "candidates", // Overtime request inside the dashboard
                  element: <Candidates />,
                },
                {
                  path: "interviews", // Overtime request inside the dashboard
                  element: <Interviews />,
                },
                {
                  path: "helpdesk", // helpdesk
                  element: <Helpdesk />,
                },
                {
                  path: "resignpaneladmin", // helpdesk
                  element: <ResignPanel />,
                },
                {
                  path: "promotions", // Overtime request inside the dashboard
                  element: <Promotions />,
                },
              ],
            },
          ],
        },
      ],
    },


    {
      path: "/hrms/interndashboard",
      element: <ProtectedRoute requiredRole="Intern" />,
      children: [
        {
          element: <DashboardIntern />, // dashboard layout
          children: [
            {
              element: <Layout />, // includes Chatbot + Outlet
              children: [
                { path: "home", element: <HomeViewIntern /> },
                { path: "attendance", element: <AttendanceViewIntern /> },
                { path: "monthly-report", element: <MonthlyReportIntern /> },
                { path: "holiday", element: <HolidayViewIntern /> },
                { path: "projects", element: <ProjectsViewIntern /> },
                { path: "tasks", element: <TasksViewIntern /> },
                { path: "helpdesk", element: <HelpdeskIntern /> },
                { path: "disciplinary", element: <DisciplinaryIntern /> },
              ],
            },
          ],
        },
      ],
    },
    {
      path: "/hrms/dashboardhr",
      element: <ProtectedRoute requiredRole="HR" />,
      children: [
        {
          element: <DashboardHr />,
          children: [
            {
              element: <Layout />,
              children: [
                { path: "home", element: <HomeViewHr /> },
                {
                  path: "add_employees", // Employees view inside the dashboard
                  element: <AdminEmployeesViewHr />,
                },
                {
                  path: "employeedetailHr/:id", // Employees view inside the dashboard
                  element: <EmployeeIdProvider> <EmployeeDetailHr /></EmployeeIdProvider>,
                },
                { path: "EmployeeExitHr", element: <EmployeeExitHr /> },


                   { path: "exitDashboardHr", element: <ExitDashboardHr /> },
                 { path: "employeeExitMain", element: <EmployeeExitMain /> },
                { path: "exitProcessHr/:employeeId", element: <ExitProcessHr /> },




                { path: "employee", element: <ActiveEmpHr /> },
                { path: "attendance", element: <AttendanceViewHr /> },
                { path: "monthly-report", element: <MonthlyReportHr /> },
                { path: "holiday-view", element: <HolidayViewHr /> },
                { path: "projects", element: <ProjectsViewHr /> },
                { path: "tasks", element: <TasksViewHr /> },
                { path: "leave-request", element: <LeaveManagementHr /> },
                { path: "leavetype", element: <LeaveTypeHr /> },
                { path: "policies", element: <PoliciesHr /> },
                { path: "eventshr", element: <EventsHr /> },
                { path: "assesthr", element: <AssestHr /> },
                { path: "awardshr", element: <AwardsHr /> },
                { path: "documenthr", element: <DocumentsHr /> },
                { path: "resignationhr", element: <ResignationHr /> },
                { path: "helpdeskhr", element: <HelpdeskHr /> },
                { path: "payrollhr", element: <PayRollHr /> },
                { path: "confirmation", element: <PerformanceTableHR /> },
                {
                  path: "marks/:id",
                  element: <MarksHR/>,
                },
                {path:"MetricsForm",element:<MetricsForm/>},
                { path: "revenue-expense", element: <RevenueExpenseManagement /> },
                // Core HR Section Routes
                { path: "corehrdashboard", element: <CoreHrDashboard /> },
                { path: "companydetails", element: <CompanyDetails /> },
                { path: "employeehub", element: <EmployeeHub /> },
                { path: "department", element: <Department /> },
                { path: "designation", element: <Designation /> },
                { path: "division", element: <Division /> },
                { path: "grade", element: <Grade /> },
                { path: "payrollSetup", element: <PayrollSetup /> },
                { path: "headquaters", element: <Headquarters /> },
                { path: "makeannouncement", element: <MakeAnnouncement /> },
                // Additional HR Master routes
                { path: "role", element: <RolesView /> },
                { path: "holidaysadmin", element: <HolidaysAdmin /> },
                { path: "shifts", element: <ShiftsView /> },
                { path: "assestadmin", element: <AssestAdmin /> },
                { path: "employees", element: <AdminEmployeesView /> },
                { path: "awardsadmin", element: <AwardsAdmin /> },
                { path: "leaveSetup", element: <LeaveSetup /> },
                { path: "parametercreation", element: <Parameter /> },
                // Policy Management routes
                { path: "policies", element: <Policies /> },
                { path: "policyDashboard", element: <PolicyDashboard /> },
                { path: "policyallocation", element: <PolicyAllocation /> },
                // Employee Confirmation routes
                { path: "employeeconfirmationMain", element: <ConfirmationMain /> },
                { path: "performanceTable", element: <PerformanceTable /> },
                { path: "dashboardConfirmation", element: <DashboardConfirmation /> },
                { path: "confirmation", element: <PerformanceTableHR /> },
                // Leave Management routes
                { path: "mainLeave", element: <MainLeave /> },
                // Payroll routes
                { path: "DashboardPayroll", element: <DashboardPayroll /> },
                // Reports routes
                { path: "newJoinerReport", element: <NewJoinerReport /> },
                { path: "annualManpowerReport", element: <EmployeeMasterReport /> },
                { path: "employeeAttritionReport", element: <DesignationDepartmentReport /> }
              ],
            },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;


