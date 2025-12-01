import React, { useState } from 'react';
import { useEffect } from 'react';
import  Delete  from "@mui/icons-material";
import DeleteIcon from '@mui/icons-material/Delete';
import  axiosInstance from  "../../utils/axiosInstance";
import {

  ThemeProvider,

  createTheme,

  Paper,

  Typography,

  Button,

  Table,

  TableBody,

  TableCell,

  TableContainer,

  TableHead,

  TableRow,

  TextField,

  Box,

  Select,

  MenuItem,

  FormControl,

  Dialog,

  DialogTitle,

  DialogContent,

  DialogActions,

  Grid,

  Checkbox,

  FormControlLabel,

  Divider,

  CssBaseline,

  IconButton,

  Collapse,

  List,

  ListItem,

  ListItemText

} from '@mui/material';

import AddIcon from '@mui/icons-material/Add';

import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import CloseIcon from '@mui/icons-material/Close';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

 

// Create theme

const theme = createTheme({

  palette: {

    primary: {

      main: '#7c4dff',

    },

    background: {

      default: '#f5f5f9',

    },

  },

});

 

function RoleAndPrivileges() {

  // State for roles data

  const [roles, setRoles] = useState([

   

  ]);

 

  // State for dialog

  const [openAddDialog, setOpenAddDialog] = useState(false);

 

  // State for roles list

  const [page, setPage] = useState(0);

  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [searchTerm, setSearchTerm] = useState('');

  const [sortDirection, setSortDirection] = useState({

    roleName: 'asc',

    menuPermission: 'asc',

    addedDate: 'asc'

  });

 

  // State for add role form

  const [roleName, setRoleName] = useState('');

  const [accessType, setAccessType] = useState('Custom Menu Access');

  const [showDropdown, setShowDropdown] = useState(false);

 

  // State for expanded dropdowns

  const [expandedItems, setExpandedItems] = useState({

    attendance: false,

    projects: false,

    projectsProjects: false,

    tasks: false,

    payroll: false

  });

 

  const [permissions, setPermissions] = useState({

    // Staff Apps

    attendance: false,

    projects: false,

    projectsProjects: false,

    projectsProjectsEnableModule: false,

    projectsProjectsAdd: false,

    projectsProjectsEdit: false,

    projectsProjectsDelete: false,

    projectsProjectsUpdateStatus: false,

    projectsProjectsDiscussion: false,

    projectsProjectsBugs: false,

    projectsProjectsTasks: false,

    projectsProjectsAttachFiles: false,

    projectsProjectsNote: false,

    projectsProjectsTimeLogs: false,

    projectsCalendar: false,

    projectsKanbanBoard: false,

    tasks: false,

    tasksTask: false,

    tasksTaskEnableModule: false,

    tasksTaskAdd: false,

    tasksTaskEdit: false,

    tasksTaskDelete: false,

    tasksTaskUpdateStatus:false,

    tasksTaskDiscussion:false,

    tasksTaskAttachFiles:false,

    tasksTaskNote:false,

    tasksCalendar: false,

    tasksKanbanBoard: false,

    payroll: false,

    payrollSetup: false,

    payrollSetupCompanyPayrollList:false,

    payrollSetupGeneratePayslip: false,

    payrollSetupDelete: false,

    payrollPayslipHistory: false,

    payrollAdvanceSalary: false,

    payrollAdvanceSalaryEnableModule: false,

    payrollAdvanceSalaryRequestAdvanceSalary: false,

    payrollAdvanceSalaryEdit: false,

    payrollAdvanceSalaryDelete: false,

    payrollLoan: false,

    payrollLoanEnableModule: false,

    payrollLoanRequestAdvanceSalary: false,

    payrollLoanEdit: false,

    payrollLoanDelete: false,

    helpdesk: false,

    helpdeskEnableModule: false,

    helpdeskCreateTicket: false,

    helpdeskEdit: false,

    helpdeskViewTicket: false,

    helpdeskDelete: false,

    helpdeskUpdateStatus: false,

    helpdeskAttachfiles: false,

    helpdeskNote: false,

    trainingSessions: false,

    trainingSessionsTrainingSessions: false,

    trainingSessionsTrainingSessionsEnableModule: false,

    trainingSessionsTrainingSessionsAdd: false,

    trainingSessionsTrainingSessionsEdit: false,

    trainingSessionsTrainingSessionsDelet: false,

    trainingSessionsTrainingSessionsNote: false,

    trainingSessionsTrainingSessionsUpdateStatus: false,

    trainingSessionsTrainers: false,

    trainingSessionsTrainersEnableModule: false,

    trainingSessionsTrainersAdd: false,

    trainingSessionsTrainersEdit: false,

    trainingSessionsTrainersDelet: false,

    trainingSessionsTrainingSkills: false,

    trainingSessionsTrainingSkillsEnableModule: false,

    trainingSessionsTrainingSkillsAdd: false,

    trainingSessionsTrainingSkillsEdit: false,

    trainingSessionsTrainingSkillsDelet: false,

    trainingSessionsTrainingCalendar: false,

    assets: false,

    assetsAssetsEnableModule: false,

    assetsAssetsAdd: false,

    assetsAssetsEdit: false,

    assetsAssetsDelet: false,

    assetsCategory: false,

    assetsCategoryEnableModule: false,

    assetsCategoryAdd: false,

    assetsCategoryEdit: false,

    assetsCategoryDelet: false,

    assetsEdit: false,

    assetsBrands: false,

    assetsBrandsEnableModule: false,

    assetsBrandsAdd: false,

    assetsBrandsEdit: false,

    assetsBrandsDelet: false,

    awards: false,

    awardsAwards: false,

    awardsAwardsEnableModule: false,

    awardsAwardsAdd: false,

    awardsAwardsEdit: false,

    awardsAwardsDelet: false,

    awardsAwardType: false,

    awardsAwardTypeEnableModule: false,

    awardsAwardTypeAdd: false,

    awardsAwardTypeEdit: false,

    awardsAwardTypeDelet: false,

    travels: false,

    travelsTravels: false,

    travelsTravelsEnableModule: false,

    travelsTravelsAdd: false,

    travelsTravelsEdit: false,

    travelsTravelsDelet: false,

    travelsTravelsUpdateStatus: false,

    travelsArrangementType: false,

    travelsArrangementTypeDelet: false,

    travelsArrangementTypeEdit: false,

    travelsArrangementTypeAdd: false,

    travelsArrangementTypeEnableModule: false,

    travelsTravelCalendar: false,

    leaveRequest: false,

    leaveRequestManageLeaves: false,

    leaveRequestManageLeavesEnableModule: false,

    leaveRequestManageLeavesAdd: false,

    leaveRequestManageLeavesEdit: false,

    leaveRequestManageLeavesDelet: false,

    leaveRequestManageLeavesUpdateStatus: false,

    leaveRequestLeaveType: false,

    leaveRequestLeaveTypeEnableModule: false,

    leaveRequestLeaveTypeAdd: false,

    leaveRequestLeaveTypeEdit: false,

    leaveRequestLeaveTypeDelet: false,

    overtimeRequest: false,

    overtimeRequestEnableModule: false,

    overtimeRequestAdd: false,

    overtimeRequestEdit: false,

    overtimeRequestDelet: false,

    complaints: false,

    complaintsEnableModule: false,

    complaintsAdd: false,

    complaintsEdit: false,

    complaintsDelet: false,

    resignations: false,

    resignationsEnableModule: false,

    resignationsAdd: false,

    resignationsEdit: false,

    resignationsDelet: false,

    disciplinaryCases: false,

    disciplinaryCasesDisciplinaryCases: false,

    disciplinaryCasesDisciplinaryCasesEnableModule: false,

    disciplinaryCasesDisciplinaryCasesAdd: false,

    disciplinaryCasesDisciplinaryCasesEdit: false,

    disciplinaryCasesDisciplinaryCasesDelet: false,

    disciplinaryCasesCaseType: false,

    disciplinaryCasesCaseTypeEnableModule: false,

    disciplinaryCasesCaseTypeAdd: false,

    disciplinaryCasesCaseTypeEdit: false,

    disciplinaryCasesCaseTypeDelet: false,

    transfers: false,

    transfersEnableModule: false,

    transfersAdd: false,

    transfersEdit: false,

    transfersDelet: false,

    settings: false,

    setExpandedItemsettingsModuleTypes: false,

    SettingsEmailTemplates: false,

    settingsMultiLanguage: false,

    settingsDatabaseLog: false,

    settingsCurrencyConverter: false,

 

    // Company Apps

    employees: false,

    employeesEmployees: false,

    employeesEmployeesEnableModule: false,

    employeesEmployeesAdd: false,

    employeesEmployeesEdit: false,

    employeesEmployeesDelet: false,

    employeesShift: false,

    employeesShiftEnableModule: false,

    employeesShiftAdd: false,

    employeesShiftEdit: false,

    employeesShiftDelet: false,

    employeesEmployeesExit: false,

    employeesEmployeesExitEnableModule: false,

    employeesEmployeesExitAdd: false,

    employeesEmployeesExitEdit: false,

    employeesEmployeesExitDelet: false,

    employeesExitType: false,

    employeesExitTypeEnableModule: false,

    employeesExitTypeAdd: false,

    employeesExitTypeEdit: false,

    employeesExitTypeDelet: false,

    employeesEmployeeProfile: false,

    employeesEmployeeProfileEditBasicInformation: false,

    employeesEmployeeProfileEditPersonalInformation: false,

    employeesEmployeeProfileEditProfilePicture: false,

    employeesEmployeeProfileEditAccountInformation: false,

    employeesEmployeeProfileViewDocuments: false,

    employeesEmployeeProfileChangePassword: false,

    recruitment: false,

    recruitmentNewOpening: false,

    recruitmentNewOpeningJobsList: false,

    recruitmentNewOpeningAdd: false,

    recruitmentNewOpeningEdit: false,

    recruitmentNewOpeningDelete: false,

    recruitmentCandidates: false,

    recruitmentInterviews: false,

    recruitmentPromotions: false,

    coreHR: false,

    coreHRAnnouncements: false,

    coreHRAnnouncementsEnableModule: false,

    coreHRAnnouncementsAdd: false,

    coreHRAnnouncementsEdit: false,

    coreHRAnnouncementsDelet: false,

    coreHRDepartment: false,

    coreHRDepartmentEnableModule: false,

    coreHRDepartmentAdd: false,

    coreHRDepartmentEdit: false,

    coreHRDepartmentDelet: false,

    coreHRDesignation: false,

    coreHRDesignationEnableModule: false,

    coreHRDesignationAdd: false,

    coreHRDesignationEdit: false,

    coreHRDesignationDelet: false,

    coreHRPolicies: false,

    coreHRPoliciesEnableModule: false,

    coreHRPoliciesAdd: false,

    coreHRPoliciesEdit: false,

    coreHRPoliciesDelet: false,

    coreHRPoliciesViewPolicies: false,

    coreHROrganizationChart: false,

    companyAttendance: false,

    companyAttendanceMonthlyReport: false,

    companyAttendanceManualAttendance: false,

    companyAttendanceManualAttendanceEnableModule: false,

    companyAttendanceManualAttendanceAdd: false,

    companyAttendanceManualAttendanceEdit: false,

    companyAttendanceManualAttendanceDelet: false,

    finance: false,

    financeAccounts: false,

    financeAccountsEnableModule: false,

    financeAccountsAdd: false,

    financeAccountsEdit: false,

    financeAccountsDelet: false,

    financeExpenseCategories: false,

    financeExpenseCategoriesEnableModule: false,

    financeExpenseCategoriesAdd: false,

    financeExpenseCategoriesEdit: false,

    financeExpenseCategoriesDelet: false,

    financeDepositCategories: false,

    financeDepositCategoriesEnableModule: false,

    financeDepositCategoriesExpenseAdd: false,

    financeDepositCategoriesEdit: false,

    financeDepositCategoriesDelet: false,

    financeeTransactions: false,

    financeeTransactionsEnableModule: false,

    financeeTransactionsAdd: false,

    financeeTransactionsEdit: false,

    financeeTransactionsDelet: false,

    financeExpense: false,

    financeExpenseEnableModule: false,

    financeExpenseAdd: false,

    financeExpenseEdit: false,

    financeExpenseDelet: false,

    financeeDeposit: false,

    financeeDepositEnableModule: false,

    financeeDepositAdd: false,

    financeeDepositEdit: false,

    financeeDepositDelet: false,

    performance: false,

    performanceKpi: false,

    performanceKpiEnableModule: false,

    performanceKpiAdd: false,

    performanceKpiEdit: false,

    performanceKpiDelet: false,

    performanceKpa: false,

    performanceKpaEnableModule: false,

    performanceKpaAdd: false,

    performanceKpaEdit: false,

    performanceKpaDelet: false,

    performanceCompetencies: false,

    performanceCompetenciesEnableModule: false,

    performanceCompetenciesAdd: false,

    performanceCompetenciesEdit: false,

    performanceCompetenciesDelet: false,

    performanceTrackGoals: false,

    performanceTrackGoalsEnableModule: false,

    performanceTrackGoalsAdd: false,

    performanceTrackGoalsEdit: false,

    performanceTrackGoalsDelet: false,

    performanceTrackGoalsUpdateRating: false,

    performanceGoalType: false,

    performanceGoalTypeEnableModule: false,

    performanceGoalTypeAdd: false,

    performanceGoalTypeEdit: false,

    performanceGoalTypeDelet: false,

    performanceGoalsCalendar: false,

    manageClients: false,

    manageClientsEnableModule: false,

    manageClientsAdd: false,

    manageClientsEdit: false,

    manageClientsDelet: false,

    leads: false,

    leadsEnableModule: false,

    leadsAdd: false,

    leadsEdit: false,

    leadsDelet: false,

    leadsChangetoClient: false,

    invoices: false,

    invoicesBillingInvoices: false,

    invoicesBillingInvoicesEnableModule: false,

    invoicesBillingInvoicesCreateNewInvoice: false,

    invoicesBillingInvoicesEditInvoice: false,

    invoicesBillingInvoicesDelete: false,

    invoicesInvoicePayments: false,

    invoicesCalendar: false,

    invoicesTaxType: false,

    estimates: false,

    estimatesEnableModule: false,

    estimatesCreateNewEstimate: false,

    estimatesEditEstimate: false,

    estimatesDelet: false,

    estimatesConverttoInvoice: false,

    estimatesCancelEstimate: false,

    estimatesEstimateCalendar: false,

    events: false,

    eventsEvents: false,

    eventsEventsEnableModule: false,

    eventsEventsAdd: false,

    eventsEventsEdit: false,

    eventsEventsDelet: false,

    eventsEventsCalendar: false,

    conferenceBooking: false,

    conferenceBookingConferenceBooking: false,

    conferenceBookingConferenceBookingEnableModule: false,

    conferenceBookingConferenceBookingAdd: false,

    conferenceBookingConferenceBookingEdit: false,

    conferenceBookingConferenceBookingDelet: false,

    conferenceBookingConferenceCalendar: false,

    holidays: false,

    holidaysHolidaysCalendar: false,

    holidaysHolidays: false,

    holidaysHolidaysEnableModule: false,

    holidaysHolidaysAdd: false,

    holidaysHolidaysEdit: false,

    holidaysHolidaysDelet: false,

    visitorBook: false,

    visitorBookEnableModule: false,

    visitorBookAdd: false,

    visitorBookEdit: false,

    visitorBookDelet: false,

    documentsManager: false,

    documentsManagerOfficialDocuments: false,

    documentsManagerOfficialDocumentsEnableModule: false,

    documentsManagerOfficialDocumentsAdd: false,

    documentsManagerOfficialDocumentsEdit: false,

    documentsManagerOfficialDocumentsDelet: false,

    documentsManagerGeneralDocuments: false,

    documentsManagerGeneralDocumentsEnableModule: false,

    documentsManagerGeneralDocumentsAdd: false,

    documentsManagerGeneralDocumentsEdit: false,

    documentsManagerGeneralDocumentsDelet: false,

    todoList: false,

    systemCalendar: false,

    systemReports: false

  });

 

  // Handlers for roles list

const handleChangePage = (event, newPage) => {

    setPage(newPage);

  };

 

  const handleChangeRowsPerPage = (event) => {

    setRowsPerPage(parseInt(event.target.value, 10));

    setPage(0);

  };

 

  const handleSort = (column) => {

    setSortDirection(prev => ({

      ...prev,

      [column]: prev[column] === 'asc' ? 'desc' : 'asc'

    }));

  };

 

  // Handlers for add role dialog

  const handlePermissionChange = (permission) => {

    setPermissions({

      ...permissions,

      [permission]: !permissions[permission]

    });

  };


  const fetchRoles = async () => {
    try {
      const response = await axiosInstance.get("roles/");
    
  
      const data = response.data;
  
      if (!Array.isArray(data)) {
        console.error("❌ API returned non-array data:", data);
        setRoles([]); 
        return []; // <-- fallback return
      }
  
      const formattedRoles = data.map((role) => ({
        id: role.role_id,
        name: role.role_name,
        permission: role.role_access,
        addedDate: role.created_at,
      }));
  
      console.log("✅ Formatted Roles:", formattedRoles);
      setRoles(formattedRoles);
      return formattedRoles; // <-- ✅ THIS IS THE FIX
    } catch (error) {
      console.error("Error fetching roles:", error);
      setRoles([]);
      return []; // <-- fallback return
    }
  };
  
  
  const handleAddRole = async () => {
    if (!roleName.trim()) {
      alert('Role Name is required');
      return;
    }
  
    const today = new Date();
    const formattedDate = `${today.getDate().toString().padStart(2, '0')}/${
      (today.getMonth() + 1).toString().padStart(2, '0')
    }/${today.getFullYear()} ${today.getHours().toString().padStart(2, '0')}:${
      today.getMinutes().toString().padStart(2, '0')
    }:${today.getSeconds().toString().padStart(2, '0')}`;

    const payload = {
      company_id: 2,
      role_name: roleName,
      role_access: accessType,
      role_resources: Object.entries(permissions)
        .filter(([_, checked]) => checked)
        .map(([key]) => key)
        .join(','),
      created_at: formattedDate,
    };
  
    try {
      await createRole(payload);
  
      // ✅ Now this returns the array directly
      const updatedRoles = await fetchRoles();
  
      setRoles(updatedRoles);
      setOpenAddDialog(false);
  
      // Reset form
      setRoleName('');
      setAccessType('Custom Menu Access');
      setPermissions({});
    } catch (error) {
      console.error('Error creating role:', error);
      alert('Failed to create role');
    }
  };
  
  useEffect(() => {
   
  
    fetchRoles();
  }, []);
  
  
  const handleDeleteRole = async (roleId) => {
    try {
      if (!roleId) {
        console.error("No role ID provided for deletion");
        return;
      }
  
      await axiosInstance.delete(`roles/${roleId}/`);
  
      // ✅ Refresh the list after deletion
      const updatedRoles = await fetchRoles();
      setRoles(updatedRoles);
  
    } catch (error) {
      console.error("Failed to delete role:", error);
    }
  };
  
  
  
  const handleCloseDialog = () => {

    setOpenAddDialog(false);

    // Reset form

    setRoleName('');

    setAccessType('Custom Menu Access');

    setPermissions({});

  };


  const handleResetForm = () => {

    setRoleName('');

    setAccessType('Custom Menu Access');

    setPermissions({});

  };

 

  // Toggle dropdown expansion

  const toggleDropdown = (item) => {

    setExpandedItems(prev => ({

      ...prev,

      [item]: !prev[item]

    }));

  };

 
// Axios method 

const createRole = (data) => axiosInstance.post('roles/', data);
//const deleteRole = (id) => axiosInstance.delete(`roles/${id}/`);

// useEffect(() => {
//   fetchRoles()
//     .then((res) => setRoles(res.data))
//     .catch((err) => console.error("Failed to fetch roles", err));
// }, []);

const getSelectedResources = () => {
  return Object.entries(permissions)
    .filter(([_, checked]) => checked)
    .map(([key]) => key)
    .join(',');
};
























  // Filter and sort roles

  const filteredRoles = (roles ?? []).filter(role =>
    role?.name?.toLowerCase?.().includes(searchTerm?.toLowerCase?.() ?? '') ||
    role?.permission?.toLowerCase?.().includes(searchTerm?.toLowerCase?.() ?? '')
  );
  

 

  const sortedRoles = [...filteredRoles].sort((a, b) => {

    if (sortDirection.roleName !== 'asc') {

      return a.name.localeCompare(b.name);

    } else {

      return b.name.localeCompare(a.name);

    }

  });

 

  const paginatedRoles = sortedRoles.slice(

    page * rowsPerPage,

    page * rowsPerPage + rowsPerPage

  );

 

  // Permission groups with dropdowns

  const staffApps = [

    {

      key: 'attendance',

      label: 'Attendance',

    },

    {

      key: 'projects',

      label: 'Projects',

      hasDropdown: true,

      subItems: [

        {

          key: 'projectsProjects',

          label: 'Projects',

          hasDropdown: true,

          subItems: [

            { key: 'projectsProjectsEnableModule', label: 'Enable Module' },

            { key: 'projectsProjectsAdd', label: 'Add' },

            { key: 'projectsProjectsEdit', label: 'Edit' },

            { key: 'projectsProjectsDelete', label: 'Delete' },

            { key: 'projectsProjectsUpdateStatus', label: 'Update Status' },

            { key: 'projectsProjectsDiscussion', label: 'Discussion' },

            { key: 'projectsProjectsBugs', label: 'Bugs' },

            { key: 'projectsProjectsTasks', label: 'Tasks' },

            { key: 'projectsProjectsAttachFiles', label: 'Attach files' },

            { key: 'projectsProjectsNote', label: 'Note' },

            { key: 'projectsProjectsTimeLogs', label: 'Time Logs' }

          ]

        },

        { key: 'projectsCalendar', label: 'Projects Calendar' },

        { key: 'projectsKanbanBoard', label: 'Projects Kanban Board' }

      ]

    },

    {

      key: 'tasks',

      label: 'Tasks',

      hasDropdown: true,

      subItems: [

        { key: 'tasksTask',

          label: 'Tasks',

          hasDropdown: true,

          subItems:[

            { key: 'tasksTaskEnableModule', label: 'Enable Module' },

            { key: 'tasksTaskAdd', label: 'Add' },

            { key: 'tasksTaskEdit', label: 'Edit' },

            { key: 'tasksTaskDelete', label: 'Delet' },

            { key: 'tasksTaskUpdateStatus', label: 'Update Status' },

            { key: 'tasksTaskDiscussion', label: 'Discussion' },

            { key: 'tasksTaskAttachFiles', label: 'Attach files' },

            { key: 'tasksTaskNote', label: 'Note' },

          ]

         },

        { key: 'tasksCalendar', label: 'Tasks Calendar' },

        { key: 'tasksKanbanBoard', label: 'Tasks Kanban Board' }

      ]

    },

    {

      key: 'payroll',

      label: 'Payroll',

      hasDropdown: true,

      subItems: [

        { key: 'payrollSetup',

          label: 'Set up Payroll',

          hasDropdown: true,

          subItems:[

            { key: 'payrollSetupCompanyPayrollList', label: 'Company Payroll List' },

            { key: 'payrollSetupGeneratePayslip', label: 'Generate Payslip' },

            { key: 'payrollSetupDelete', label: 'Delete' },

          ]

         },

        { key: 'payrollPayslipHistory', label: 'Payslip History' },

        { key: 'payrollAdvanceSalary',

          label: 'Advance Salary',

          hasDropdown: true,

          subItems:[

            { key: 'payrollAdvanceSalaryEnableModule', label: 'Enable Module' },

            { key: 'payrollAdvanceSalaryRequestAdvanceSalary', label: 'Request Advance Salary' },

            { key: 'payrollAdvanceSalaryEdit', label: 'Edit' },

            { key: 'payrollAdvanceSalaryDelete', label: 'Delete' },

          ]

        },

        { key: 'payrollLoan',

          label: 'Loan',

          hasDropdown: true,

          subItems:[

            { key: 'payrollLoanEnableModule', label: 'Enable Module' },

            { key: 'payrollLoanRequestAdvanceSalary', label: 'Request Advance Salary' },

            { key: 'payrollLoanEdit', label: 'Edit' },

            { key: 'payrollLoanDelete', label: 'Delete' },

          ]

        }

      ]

    },

    { key: 'helpdesk',

      label: 'Helpdesk',

      hasDropdown: true,

      subItems:[

        { key: 'helpdeskEnableModule', label: 'Enable Module' },

        { key: 'helpdeskCreateTicket', label: 'Create Ticket' },

        { key: 'helpdeskEdit', label: 'Edit' },

        { key: 'helpdeskViewTicket', label: 'View Ticket' },

        { key: 'helpdeskDelete', label: 'Delete' },

        { key: 'helpdeskUpdateStatus', label: 'Update Status' },

        { key: 'helpdeskAttachfiles', label: 'Attach files' },

        { key: 'helpdeskNote', label: 'Note' },

      ]

     },

    { key: 'trainingSessions',

      label: 'Training Sessions',

      hasDropdown: true,

      subItems: [

        { key: 'trainingSessionsTrainingSessions',

          label: 'Training Sessions',

          hasDropdown: true,

          subItems:[

            { key: 'trainingSessionsTrainingSessionsEnableModule', label: 'Enable Module' },

            { key: 'trainingSessionsTrainingSessionsAdd', label: 'Add' },

            { key: 'trainingSessionsTrainingSessionsEdit', label: 'Edit' },

            { key: 'trainingSessionsTrainingSessionsDelet', label: 'Delet' },

            { key: 'trainingSessionsTrainingSessionsNote', label: 'Note' },

            { key: 'trainingSessionsTrainingSessionsUpdateStatus', label: 'Update Status' },

          ]

         },

        { key: 'trainingSessionsTrainers',

          label: 'Trainers',

          hasDropdown: true,

          subItems:[

            { key: 'trainingSessionsTrainersEnableModule', label: 'Enable Module' },

            { key: 'trainingSessionsTrainersAdd', label: 'Add' },

            { key: 'trainingSessionsTrainersEdit', label: 'Edit' },

            { key: 'trainingSessionsTrainersDelet', label: 'Delet' },

          ]

         },

        { key: 'trainingSessionsTrainingSkills',

          label: 'Training Skillss',

          hasDropdown: true,

          subItems:[

            { key: 'trainingSessionsTrainingSkillsEnableModule', label: 'Enable Module' },

            { key: 'trainingSessionsTrainingSkillsAdd', label: 'Add' },

            { key: 'trainingSessionsTrainingSkillsEdit', label: 'Edit' },

            { key: 'trainingSessionsTrainingSkillsDelet', label: 'Delet' },

          ]

         },

        { key: 'trainingSessionsTrainingCalendar', label: 'Training Calendar' },

 

      ]

     },

    { key: 'assets',

      label: 'Assets',

      hasDropdown: true,

          subItems:[

            { key: 'assetsAssets',

              label: 'Assets',

              hasDropdown: true,

              subItems:[

                { key: 'assetsAssetsEnableModule', label: 'Enable Module' },

                { key: 'assetsAssetsAdd', label: 'Add' },

                { key: 'assetsAssetsEdit', label: 'Edit' },

                { key: 'assetsAssetsDelet', label: 'Delet' },

              ]

            },

            { key: 'assetsCategory',

              label: 'Category',

              hasDropdown: true,

              subItems:[

                { key: 'assetsCategoryEnableModule', label: 'Enable Module' },

                { key: 'assetsCategoryAdd', label: 'Add' },

                { key: 'assetsCategoryEdit', label: 'Edit' },

                { key: 'assetsCategoryDelet', label: 'Delet' },

              ]

             },

            { key: 'assetsBrands',

              label: 'Brands',

              hasDropdown: true,

              subItems:[

                { key: 'assetsBrandsEnableModule', label: 'Enable Module' },

                { key: 'assetsBrandsAdd', label: 'Add' },

                { key: 'assetsBrandsEdit', label: 'Edit' },

                { key: 'assetsBrandsDelet', label: 'Delet' },

              ]

             },

          ]

    },

    { key: 'awards',

      label: 'Awards',

      hasDropdown: true,

      subItems:[

        { key: 'awardsAwards',

          label: 'Awards',

          hasDropdown: true,

          subItems:[

            { key: 'awardsAwardsEnableModule', label: 'Enable Module' },

            { key: 'awardsAwardsAdd', label: 'Add' },

            { key: 'awardsAwardsEdit', label: 'Edit' },

            { key: 'awardsAwardsDelet', label: 'Delet' },

          ]

         },

        { key: 'awardsAwardType',

          label: 'Award Type',

          hasDropdown: true,

          subItems:[

            { key: 'awardsAwardTypeEnableModule', label: 'Enable Module' },

            { key: 'awardsAwardTypeAdd', label: 'Add' },

            { key: 'awardsAwardTypeEdit', label: 'Edit' },

            { key: 'awardsAwardTypeDelet', label: 'Delet' },

          ]

        },

      ] },

    { key: 'travels',

      label: 'Travels',

      hasDropdown: true,

      subItems:[

        { key: 'travelsTravels',

          label: 'Travels',

          hasDropdown: true,

          subItems:[

            { key: 'travelsTravelsEnableModule', label: 'Enable Module' },

            { key: 'travelsTravelsAdd', label: 'Add' },

            { key: 'travelsTravelsEdit', label: 'Edit' },

            { key: 'travelsTravelsDelet', label: 'Delet' },

            { key: 'travelsTravelsUpdateStatus', label: 'Update Status' },

          ]

         },

        { key: 'travelsArrangementType',

          label: 'Arrangement Type',

          hasDropdown: true,

          subItems:[

            { key: 'travelsArrangementTypeEnableModule', label: 'Enable Module' },

            { key: 'travelsArrangementTypeAdd', label: 'Add' },

            { key: 'travelsArrangementTypeEdit', label: 'Edit' },

            { key: 'travelsArrangementTypeDelet', label: 'Delet' },

          ]

        },

        { key: 'travelsTravelCalendar', label: 'Travel Calendar' },

      ]

    },

    { key: 'leaveRequest',

      label: 'Leave Request',

      hasDropdown: true,

      subItems:[

        { key: 'leaveRequestManageLeaves',

          label: 'Manage Leaves',

          hasDropdown: true,

          subItems:[

            { key: 'leaveRequestManageLeavesEnableModule', label: 'Enable Module' },

            { key: 'leaveRequestManageLeavesAdd', label: 'Add' },

            { key: 'leaveRequestManageLeavesEdit', label: 'Edit' },

            { key: 'leaveRequestManageLeavesDelet', label: 'Delet' },

            { key: 'leaveRequestManageLeavesUpdateStatus', label: 'Update Status' },

          ]

         },

        { key: 'leaveRequestLeaveCalendar', label: 'Leave Calendar' },

        { key: 'leaveRequestLeaveType',

          label: 'Leave Type' ,

          hasDropdown: true,

          subItems:[

            { key: 'leaveRequestLeaveTypeEnableModule', label: 'Enable Module' },

            { key: 'leaveRequestLeaveTypeAdd', label: 'Add' },

            { key: 'leaveRequestLeaveTypeEdit', label: 'Edit' },

            { key: 'leaveRequestLeaveTypeDelet', label: 'Delet' },

          ]

        },

      ]  },

    { key: 'overtimeRequest',

      label: 'Overtime Request',

      hasDropdown: true,

      subItems:[

        { key: 'overtimeRequestEnableModule', label: 'Enable Module' },

        { key: 'overtimeRequestAdd', label: 'Add' },

        { key: 'overtimeRequestEdit', label: 'Edit' },

        { key: 'overtimeRequestDelet', label: 'Delet' },

      ]

     },

    { key: 'complaints',

      label: 'Complaints',

      hasDropdown: true,

      subItems:[

        { key: 'complaintsEnableModule', label: 'Enable Module' },

        { key: 'complaintsAdd', label: 'Add' },

        { key: 'complaintsEdit', label: 'Edit' },

        { key: 'complaintsDelet', label: 'Delet' },

      ]

     },

    { key: 'resignations',

      label: 'Resignations',

      hasDropdown: true,

      subItems:[

        { key: 'resignationsEnableModule', label: 'Enable Module' },

        { key: 'resignationsAdd', label: 'Add' },

        { key: 'resignationsEdit', label: 'Edit' },

        { key: 'resignationsDelet', label: 'Delet' },

      ] },

    { key: 'disciplinaryCases',

      label: 'Disciplinary Cases',

      hasDropdown: true,

      subItems:[

        { key: 'disciplinaryCasesDisciplinaryCases',

          label: 'Disciplinary Cases',

          hasDropdown: true,

      subItems:[

        { key: 'disciplinaryCasesDisciplinaryCasesEnableModule', label: 'Enable Module' },

        { key: 'disciplinaryCasesDisciplinaryCasesAdd', label: 'Add' },

        { key: 'disciplinaryCasesDisciplinaryCasesEdit', label: 'Edit' },

        { key: 'disciplinaryCasesDisciplinaryCasesDelet', label: 'Delet' },

      ]

         },

        { key: 'disciplinaryCasesCaseType',

          label: 'Case Type' ,

          hasDropdown: true,

          subItems:[

            { key: 'disciplinaryCasesCaseTypeEnableModule', label: 'Enable Module' },

            { key: 'disciplinaryCasesCaseTypeAdd', label: 'Add' },

            { key: 'disciplinaryCasesCaseTypeEdit', label: 'Edit' },

            { key: 'disciplinaryCasesCaseTypeDelet', label: 'Delet' },

          ]

        },

 

      ]

    },

    { key: 'transfers',

      label: 'Transfers',

      hasDropdown: true,

      subItems:[

        { key: 'transfersEnableModule', label: 'Enable Module' },

        { key: 'transfersAdd', label: 'Add' },

        { key: 'transfersEdit', label: 'Edit' },

        { key: 'transfersDelet', label: 'Delet' },

      ]

    },

    { key: 'settings',

      label: 'Settings',

      hasDropdown: true,

      subItems:[

        { key: 'settingsSettings', label: 'Settings' },

        { key: 'settingsModuleTypes', label: 'Module Types' },

        { key: 'settingsEmailTemplates', label: 'Email Templates' },

        { key: 'settingsMultiLanguage', label: 'Multi Language' },

        { key: 'settingsDatabaseLog', label: 'Database Log' },

        { key: 'settingsCurrencyConverter', label: 'Currency Converter' },

      ]

    }

  ];

 

  const companyApps = [

    { key: 'employees',

      label: 'Employees',

      hasDropdown: true,

      subItems:[

        { key: 'employeesEmployees',

          label: 'Employees',

          hasDropdown: true,

          subItems:[

            { key: 'employeesEmployeesEnableModule', label: 'Enable Module' },

            { key: 'employeesEmployeesAdd', label: 'Add' },

            { key: 'employeesEmployeesEdit', label: 'Edit' },

            { key: 'employeesEmployeesDelet', label: 'Delet' },

          ]

        },

        { key: 'employeesShift',

          label: 'Shift & Scheduling',

          hasDropdown: true,

          subItems:[

            { key: 'employeesShiftEnableModule', label: 'Enable Module' },

            { key: 'employeesShiftAdd', label: 'Add' },

            { key: 'employeesShiftEdit', label: 'Edit' },

            { key: 'employeesShiftDelet', label: 'Delet' },

          ]

        },

        { key: 'employeesEmployeesExit',

          label: 'Employees Exit' ,

          hasDropdown: true,

          subItems:[

            { key: 'employeesEmployeesExitEnableModule', label: 'Enable Module' },

            { key: 'employeesEmployeesExitAdd', label: 'Add' },

            { key: 'employeesEmployeesExitEdit', label: 'Edit' },

            { key: 'employeesEmployeesExitDelet', label: 'Delet' },

          ]

        },

        { key: 'employeesExitType',

          label: 'Exit Type',

          hasDropdown:true ,

          subItems:[

            { key: 'employeesExitTypeEnableModule', label: 'Enable Module' },

            { key: 'employeesExitTypeAdd', label: 'Add' },

            { key: 'employeesExitTypeEdit', label: 'Edit' },

            { key: 'employeesExitTypeDelet', label: 'Delet' },

          ]

      },

        { key: 'employeesEmployeeProfile',

          label: 'Employee Profile' ,

          hasDropdown:true ,

          subItems:[

            { key: 'employeesEmployeeProfileEditBasicInformation', label: 'Edit Basic Information' },

            { key: 'employeesEmployeeProfileEditPersonalInformation', label: 'Edit Personal Information' },

            { key: 'employeesEmployeeProfileEditProfilePicture', label: 'Edit Profile Picture' },

            { key: 'employeesEmployeeProfileEditAccountInformation', label: 'Edit Account Information' },

            { key: 'employeesEmployeeProfileViewDocuments', label: 'View Documents' },

            { key: 'employeesEmployeeProfileChangePassword', label: 'Change Password' },

          ]

        },

      ]

     },

    { key: 'recruitment',

      label: 'Recruitment (ATS)',

      hasDropdown:true ,

      subItems:[

        { key: 'recruitmentNewOpening',

          label: 'New Opening',

          hasDropdown:true ,

          subItems:[

            { key: 'recruitmentNewOpeningJobsList', label: 'Jobs List' },

            { key: 'recruitmentNewOpeningAdd', label: 'Add' },

            { key: 'recruitmentNewOpeningEdit', label: 'Edit' },

            { key: 'recruitmentNewOpeningDelete', label: 'Delete' },

          ]  

        },

        { key: 'recruitmentCandidates', label: 'Candidates' },

        { key: 'recruitmentInterviews', label: 'Interviews' },

        { key: 'recruitmentPromotions', label: 'Promotions' },

      ]

     },

    { key: 'coreHR',

      label: 'Core HR',

    hasDropdown :true,

    subItems :[

      { key: 'coreHRAnnouncements',

        label: 'Announcements',

        hasDropdown:true ,

        subItems:[

          { key: 'coreHRAnnouncementsEnableModule', label: 'Enable Module' },

          { key: 'coreHRAnnouncementsAdd', label: 'Add' },

          { key: 'coreHRAnnouncementsEdit', label: 'Edit' },

          { key: 'coreHRAnnouncementsDelet', label: 'Delet' },

        ]

       },

      { key: 'coreHRDepartment',

        label: 'Department',

        hasDropdown:true ,

        subItems:[

          { key: 'coreHRDepartmentEnableModule', label: 'Enable Module' },

          { key: 'coreHRDepartmentAdd', label: 'Add' },

          { key: 'coreHRDepartmentEdit', label: 'Edit' },

          { key: 'coreHRDepartmentDelet', label: 'Delet' },

        ]

      },

      { key: 'coreHRDesignation',

        label: 'Designation',

        hasDropdown:true ,

        subItems:[

          { key: 'coreHRDesignationEnableModule', label: 'Enable Module' },

          { key: 'coreHRDesignationAdd', label: 'Add' },

          { key: 'coreHRDesignationEdit', label: 'Edit' },

          { key: 'coreHRDesignationDelet', label: 'Delet' },

        ]

      },

      { key: 'coreHRPolicies',

        label: 'Policies' ,

        hasDropdown:true ,

        subItems:[

          { key: 'coreHRPoliciesEnableModule', label: 'Enable Module' },

          { key: 'coreHRPoliciesAdd', label: 'Add' },

          { key: 'coreHRPoliciesEdit', label: 'Edit' },

          { key: 'coreHRPoliciesDelet', label: 'Delet' },

          { key: 'coreHRPoliciesViewPolicies', label: 'View Policies' },

        ]

      },

      { key: 'coreHROrganizationChart', label: 'Organization Chart' },

    ]

    },

    { key: 'companyAttendance',

      label: 'Attendance',

      hasDropdown:true ,

      subItems:[

        { key: 'companyAttendanceManualAttendance',

          label: 'Manual Attendance',

          hasDropdown:true ,

          subItems:[

            { key: 'companyAttendanceManualAttendanceEnableModule', label: 'Enable Module' },

            { key: 'companyAttendanceManualAttendanceAdd', label: 'Add' },

            { key: 'companyAttendanceManualAttendanceEdit', label: 'Edit' },

            { key: 'companyAttendanceManualAttendanceDelet', label: 'Delet' },

          ]

        },

        { key: 'companyAttendanceMonthlyReport', label: 'Monthly Report' },

      ]

    },

    { key: 'finance',

      label: 'Finance' ,

      hasDropdown:true ,

      subItems:[

        { key: 'financeAccounts',

          label: 'Accounts',

          hasDropdown:true ,

          subItems:[

            { key: 'financeAccountsEnableModule', label: 'Enable Module' },

            { key: 'financeAccountsAdd', label: 'Add' },

            { key: 'financeAccountsEdit', label: 'Edit' },

            { key: 'financeAccountsDelet', label: 'Delet' },

          ]

        },

        { key: 'financeeDeposit',

          label: 'Deposit',

          hasDropdown:true ,

          subItems:[

            { key: 'financeeDepositEnableModule', label: 'Enable Module' },

            { key: 'financeeDepositAdd', label: 'Add' },

            { key: 'financeeDepositEdit', label: 'Edit' },

            { key: 'financeeDepositDelet', label: 'Delet' },

          ]

        },

        { key: 'financeExpense',

          label: 'Expense',

          hasDropdown:true ,

          subItems:[

            { key: 'financeExpenseEnableModule', label: 'Enable Module' },

            { key: 'financeExpenseAdd', label: 'Add' },

            { key: 'financeExpenseEdit', label: 'Edit' },

            { key: 'financeExpenseDelet', label: 'Delet' },

          ]      

        },

        { key: 'financeeTransactions', label: 'Transactions'},

        {

          key: 'financeDepositCategories',

          label: 'Deposit Categories',

          hasDropdown:true ,

          subItems:[

            { key: 'financeDepositCategoriesEnableModule', label: 'Enable Module' },

            { key: 'financeDepositCategoriesExpenseAdd', label: 'Add' },

            { key: 'financeDepositCategoriesEdit', label: 'Edit' },

            { key: 'financeDepositCategoriesDelet', label: 'Delet' },

          ]  

        },

        { key: 'financeExpenseCategories',

          label: 'Expense Categories',

          hasDropdown:true ,

          subItems:[

            { key: 'financeExpenseCategoriesEnableModule', label: 'Enable Module' },

            { key: 'financeExpenseCategoriesAdd', label: 'Add' },

            { key: 'financeExpenseCategoriesEdit', label: 'Edit' },

            { key: 'financeExpenseCategoriesDelet', label: 'Delet' },

          ]  

        },

      ]

    },

    { key: 'performance',

      label: 'Performance (PMS)',

      hasDropdown:true ,

      subItems:[

        { key: 'performanceKpi',

          label: 'KPI (Indicator)',

          hasDropdown:true ,

          subItems:[

            { key: 'performanceKpiEnableModule', label: 'Enable Module' },

            { key: 'performanceKpiAdd', label: 'Add' },

            { key: 'performanceKpiEdit', label: 'Edit' },

            { key: 'performanceKpiDelet', label: 'Delet' },

          ]  

        },

        { key: 'performanceKpa',

          label: 'KPA (Appraisal)',

          hasDropdown:true ,

          subItems:[

            { key: 'performanceKpaEnableModule', label: 'Enable Module' },

            { key: 'performanceKpaAdd', label: 'Add' },

            { key: 'performanceKpaEdit', label: 'Edit' },

            { key: 'performanceKpaDelet', label: 'Delet' },

          ]

        },

        { key: 'performanceCompetencies',

           label: 'Competencies' ,

           hasDropdown:true ,

          subItems:[

            { key: 'performanceCompetenciesEnableModule', label: 'Enable Module' },

            { key: 'performanceCompetenciesAdd', label: 'Add' },

            { key: 'performanceCompetenciesEdit', label: 'Edit' },

            { key: 'performanceCompetenciesDelet', label: 'Delet' },

          ]

          },

        { key: 'performanceTrackGoals',

          label: 'Track Goals (OKRs)',

          hasDropdown:true ,

          subItems:[

            { key: 'performanceTrackGoalsEnableModule', label: 'Enable Module' },

            { key: 'performanceTrackGoalsAdd', label: 'Add' },

            { key: 'performanceTrackGoalsEdit', label: 'Edit' },

            { key: 'performanceTrackGoalsDelet', label: 'Delet' },

            { key: 'performanceTrackGoalsUpdateRating', label: 'Update Rating' },

          ]

        },

        { key: 'performanceGoalType',

          label: 'Goal Type' ,

          hasDropdown:true ,

          subItems:[

            { key: 'performanceGoalTypeEnableModule', label: 'Enable Module' },

            { key: 'performanceGoalTypeAdd', label: 'Add' },

            { key: 'performanceGoalTypeEdit', label: 'Edit' },

            { key: 'performanceGoalTypeDelet', label: 'Delet' },

          ]

        },

        { key: 'performanceGoalsCalendar', label: 'Goals Calendar' },

      ]  

    },

    { key: 'manageClients',

      label: 'Manage Clients' ,

      hasDropdown:true ,

          subItems:[

            { key: 'manageClientsEnableModule', label: 'Enable Module' },

            { key: 'manageClientsAdd', label: 'Add' },

            { key: 'manageClientsEdit', label: 'Edit' },

            { key: 'manageClientsDelet', label: 'Delet' },

          ]

    },

    { key: 'leads',

      label: 'Leads',

      hasDropdown:true ,

      subItems:[

        { key: 'leadsEnableModule', label: 'Enable Module' },

        { key: 'leadsAdd', label: 'Add' },

        { key: 'leadsEdit', label: 'Edit' },

        { key: 'leadsDelet', label: 'Delet' },

        { key: 'leadsChangetoClient', label: 'Change to Client' },

      ]

    },

    { key: 'invoices',

      label: 'Invoices',

      hasDropdown:true ,

      subItems:[

        { key: 'invoicesBillingInvoices',

          label: 'Billing Invoices',

          hasDropdown:true ,

          subItems:[

            { key: 'invoicesBillingInvoicesEnableModule', label: 'Enable Module' },

            { key: 'invoicesBillingInvoicesCreateNewInvoice', label: 'Create New Invoice' },

            { key: 'invoicesBillingInvoicesEditInvoice', label: 'Edit Invoice' },

            { key: 'invoicesBillingInvoicesDelete', label: 'Delete' },

          ]

        },

        { key: 'invoicesInvoicePayments', label: 'Invoice Payments' },

        { key: 'invoicesCalendar', label: 'Calendar' },

        { key: 'invoicesTaxType',

          label: 'Tax Type',

          hasDropdown:true ,

          subItems:[

            { key: 'invoicesTaxTypeEnableModule', label: 'Enable Module' },

            { key: 'invoicesTaxTypeAdd', label: 'Add' },

            { key: 'invoicesTaxTypeEdit', label: 'Edit' },

            { key: 'invoicesTaxTypeDelet', label: 'Delet' },

          ]

        },

      ]

    },

    { key: 'estimates',

      label: 'Estimates',

      hasDropdown:true ,

      subItems:[

        { key: 'estimatesEnableModule', label: 'Enable Module' },

        { key: 'estimatesCreateNewEstimate', label: 'Create New Estimate' },

        { key: 'estimatesEditEstimate', label: 'Edit Estimate' },

        { key: 'estimatesDelet', label: 'Delet' },

        { key: 'estimatesConverttoInvoice', label: 'Convert to Invoice' },

        { key: 'estimatesCancelEstimate', label: 'Cancel Estimate' },

        { key: 'estimatesEstimateCalendar', label: 'Estimate Calendar' },

      ]

    },

    { key: 'events',

      label: 'Events',

      hasDropdown:true ,

      subItems:[

        { key: 'eventsEvents',

          label: 'Events',

          hasDropdown:true ,

          subItems:[

            { key: 'eventsEventsEnableModule', label: 'Enable Module' },

            { key: 'eventsEventsAdd', label: 'Add' },

            { key: 'eventsEventsEdit', label: 'Edit' },

            { key: 'eventsEventsDelet', label: 'Delet' },

          ]

        },

        { key: 'eventsEventsCalendar', label: 'Events Calendar'},

      ]

    },

    { key: 'conferenceBooking',

      label: 'Conference Booking',

      hasDropdown:true ,

      subItems:[

        { key: 'conferenceBookingConferenceBooking',

          label: 'Conference Booking',

          hasDropdown:true ,

          subItems:[

            { key: 'conferenceBookingConferenceBookingEnableModule', label: 'Enable Module' },

            { key: 'conferenceBookingConferenceBookingAdd', label: 'Add' },

            { key: 'conferenceBookingConferenceBookingEdit', label: 'Edit' },

            { key: 'conferenceBookingConferenceBookingDelet', label: 'Delet' },

          ]

         },

        { key: 'conferenceBookingConferenceCalendar', label: 'Conference Calendar' },

      ]

    },

    { key: 'holidays',

      label: 'Holidays' ,

      hasDropdown:true ,

      subItems:[

        { key: 'holidaysHolidays',

          label: 'Holidays',

          hasDropdown:true ,

          subItems:[

            { key: 'holidaysHolidaysEnableModule', label: 'Enable Module' },

            { key: 'holidaysHolidaysAdd', label: 'Add' },

            { key: 'holidaysHolidaysEdit', label: 'Edit' },

            { key: 'holidaysHolidaysDelet', label: 'Delet' },

          ]

        },

        { key: 'holidaysHolidaysCalendar', label: 'Holidays Calendar' },

 

      ]

    },

    { key: 'visitorBook',

      label: 'Visitor Book',

      hasDropdown:true ,

      subItems:[

        { key: 'visitorBookEnableModule', label: 'Enable Module' },

        { key: 'visitorBookAdd', label: 'Add' },

        { key: 'visitorBookEdit', label: 'Edit' },

        { key: 'visitorBookDelet', label: 'Delet' },

      ]

    },

    { key: 'documentsManager',

      label: 'Documents Manager',

      hasDropdown:true ,

      subItems:[

        { key: 'documentsManagerGeneralDocuments',

          label: 'General Documents',

          hasDropdown:true ,

          subItems:[

            { key: 'documentsManagerGeneralDocumentsEnableModule', label: 'Enable Module' },

            { key: 'documentsManagerGeneralDocumentsAdd', label: 'Add' },

            { key: 'documentsManagerGeneralDocumentsEdit', label: 'Edit' },

            { key: 'documentsManagerGeneralDocumentsDelet', label: 'Delet' },

          ]

        },

        { key: 'documentsManagerOfficialDocuments',

          label: 'Official Documents',

          hasDropdown:true ,

          subItems:[

            { key: 'documentsManagerOfficialDocumentsEnableModule', label: 'Enable Module' },

            { key: 'documentsManagerOfficialDocumentsAdd', label: 'Add' },

            { key: 'documentsManagerOfficialDocumentsEdit', label: 'Edit' },

            { key: 'documentsManagerOfficialDocumentsDelet', label: 'Delet' },

          ]

        },

      ]

    },

    { key: 'todoList', label: 'Todo List' },

    { key: 'systemCalendar', label: 'System Calendar' },

    { key: 'systemReports', label: 'System Reports' }

  ];

 

  // Helper function to render checkbox groups with nested dropdowns

  const renderCheckboxGroup = (title, items, level = 0) => (

    <Box sx={{ mb: level === 0 ? 3 : 0 }}>

      {level === 0 && (

        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>

          {title}

        </Typography>

      )}

      <Grid container spacing={1}>

        {items.map((item) => (

          <Grid item xs={12} key={item.key}>

            <Box sx={{ display: 'flex', flexDirection: 'column' }}>

              <Box sx={{

                display: 'flex',

                alignItems: 'center',

                pl: level * 2 // Indent based on nesting level

              }}>

                {item.hasDropdown ? (

                  <IconButton

                    size="small"

                    onClick={() => toggleDropdown(item.key)}

                    sx={{ color: '#666', p: 0, mr: 1 }}

                  >

                    {expandedItems[item.key] ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />}

                  </IconButton>

                ) : (

                  <Box sx={{ width: 24, mr: 1 }} /> // Spacer for alignment

                )}

                <FormControlLabel

                  control={

                    <Checkbox
                    checked={!!permissions[item.key]} // this ensures it’s always true or false
                    onChange={() => handlePermissionChange(item.key)}
                    size={level > 0 ? "small" : "medium"}
                  />

                  }

                  label={

                    <Typography variant={level > 0 ? "body2" : "body1"}>

                      {item.label}

                    </Typography>

                  }

                />

              </Box>

             

              {item.hasDropdown && item.subItems && item.subItems.length > 0 && (

                <Collapse in={expandedItems[item.key]} timeout="auto" unmountOnExit>

                  {renderCheckboxGroup('', item.subItems, level + 1)}

                </Collapse>

              )}

            </Box>

          </Grid>

        ))}

      </Grid>

    </Box>

  );

 

  return (
    <ThemeProvider theme={theme}>
    <CssBaseline />
    <div style={{ padding: '20px' }}>
      <Paper elevation={3} style={{ padding: 24, borderRadius: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <Typography variant="h6" style={{ fontWeight: 'bold', color: '#333' }}>
            List All Roles
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpenAddDialog(true)}
            style={{ backgroundColor: '#7c4dff' }}
          >
            Add New
          </Button>
        </div>
  
        {/* Pagination & Search */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="body2" style={{ marginRight: 8 }}>Show</Typography>
            <FormControl size="small" style={{ width: 80, marginRight: 8 }}>
              <Select value={rowsPerPage} onChange={handleChangeRowsPerPage}>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={25}>25</MenuItem>
                <MenuItem value={50}>50</MenuItem>
                <MenuItem value={100}>100</MenuItem>
              </Select>
            </FormControl>
            <Typography variant="body2">entries</Typography>
          </div>
  
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="body2" style={{ marginRight: 8 }}>Search</Typography>
            <TextField
              size="small"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
  
        {/* Table */}
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow style={{ backgroundColor: '#f5f5f5' }}>
                <TableCell style={{ fontWeight: 'bold', cursor: 'pointer' }} onClick={() => handleSort('roleName')}>
                  ROLE NAME
                  {sortDirection.roleName === 'asc' ? <ArrowUpwardIcon fontSize="small" /> : <ArrowDownwardIcon fontSize="small" />}
                </TableCell>
                <TableCell style={{ fontWeight: 'bold', cursor: 'pointer' }} onClick={() => handleSort('menuPermission')}>
                  MENU PERMISSION
                  {sortDirection.menuPermission === 'asc' ? <ArrowUpwardIcon fontSize="small" /> : <ArrowDownwardIcon fontSize="small" />}
                </TableCell>
                <TableCell style={{ fontWeight: 'bold', cursor: 'pointer' }} onClick={() => handleSort('addedDate')}>
                  ADDED DATE
                  {sortDirection.addedDate === 'asc' ? <ArrowUpwardIcon fontSize="small" /> : <ArrowDownwardIcon fontSize="small" />}
                </TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>ACTIONS</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedRoles?.length > 0 ? (
                paginatedRoles.map((role) => (
                  <TableRow key={role.role_id}>
                    <TableCell>{role.name}</TableCell>
                    <TableCell>{role.permission}</TableCell>
                    <TableCell>{role.addedDate}</TableCell>
                    <TableCell>
                    <Button
  variant="contained" // <-- changes from outlined to filled
  color="error"
  size="medium" // <-- makes it bigger
  startIcon={<DeleteIcon />}
  onClick={() => handleDeleteRole(role.id)}
>

</Button>
                   
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    No roles found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
  
        {/* Footer */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 16 }}>
          <Typography variant="body2">
            Showing {page * rowsPerPage + 1} to {Math.min((page + 1) * rowsPerPage, filteredRoles.length)} of {filteredRoles.length} records
          </Typography>
          <div style={{ display: 'flex' }}>
            <Button
              disabled={page === 0}
              onClick={() => handleChangePage(null, page - 1)}
              style={{ marginRight: 8 }}
            >
              Previous
            </Button>
            <Button
    variant="contained"
    style={{ marginRight: 8, backgroundColor: '#7c4dff', cursor: 'default' }}
    disabled
  >
    Page {page + 1}
  </Button>

            <Button
              disabled={page >= Math.ceil(filteredRoles.length / rowsPerPage) - 1}
              onClick={() => handleChangePage(null, page + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      </Paper>
  
      {/* Add Role Dialog */}
      <Dialog open={openAddDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#f9f9f9' }}>
          <Typography variant="h6">Add New Role</Typography>
          <Button
            variant="contained"
            onClick={handleCloseDialog}
            style={{ backgroundColor: '#7c4dff' }}
          >
            Hide
          </Button>
        </DialogTitle>
        <Divider />
        <DialogContent>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <div style={{ marginBottom: 16 }}>
                <Typography variant="subtitle1" style={{ marginBottom: 8, color: '#333' }}>
                  Role Name <span style={{ color: 'red' }}>*</span>
                </Typography>
                <TextField
                  fullWidth
                  placeholder="Role Name"
                  value={roleName}
                  onChange={(e) => setRoleName(e.target.value)}
                  required
                />
              </div>
  
              <div>
                <Typography variant="subtitle1" style={{ marginBottom: 8, color: '#333' }}>
                  Select Access <span style={{ color: 'red' }}>*</span>
                </Typography>
                <FormControl fullWidth>
                  <TextField
                    value={accessType}
                    onClick={() => setShowDropdown(!showDropdown)}
                    InputProps={{
                      readOnly: true,
                      endAdornment: <ExpandMoreIcon />
                    }}
                  />
                  {showDropdown && (
                    <div style={{
                      position: 'absolute',
                      top: '100%',
                      left: 0,
                      width: '100%',
                      zIndex: 1,
                      backgroundColor: '#fff',
                      border: '1px solid #ddd',
                      borderRadius: 8,
                      marginTop: 4,
                      maxHeight: 200,
                      overflowY: 'auto'
                    }}>
                      <MenuItem onClick={() => { setAccessType('All Menu Access'); setShowDropdown(false); }}>
                        All Menu Access
                      </MenuItem>
                      <MenuItem
                        onClick={() => { setAccessType('Custom Menu Access'); setShowDropdown(false); }}
                        style={{ backgroundColor: accessType === 'Custom Menu Access' ? '#e3f2fd' : 'transparent' }}
                      >
                        Custom Menu Access
                      </MenuItem>
                    </div>
                  )}
                </FormControl>
              </div>
            </Grid>
  
            <Grid item xs={12} md={4}>
              {renderCheckboxGroup('Staff Apps', staffApps)}
            </Grid>
            <Grid item xs={12} md={4}>
              {renderCheckboxGroup('Company Apps', companyApps)}
            </Grid>
          </Grid>
        </DialogContent>
        <Divider />
        <DialogActions style={{ padding: 16, justifyContent: 'flex-end' }}>
          <Button
            onClick={handleResetForm}
            style={{ marginRight: 8, color: '#666', border: '1px solid #ddd' }}
          >
            Reset
          </Button>
          <Button
            variant="contained"
            onClick={handleAddRole}
            style={{ backgroundColor: '#7c4dff' }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  </ThemeProvider>
  
   
  );
}
export default RoleAndPrivileges;

 



