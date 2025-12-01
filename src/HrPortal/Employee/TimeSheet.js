import React, { useState } from 'react';
import {
  Box,
  Tabs,
  Tab,
  Typography,
  Paper,
} from '@mui/material';
import  LeaveRequestComponent from './LeaveRequestComponent';
import  ExpenseClaimComponent from './ExpenseClaimComponent';
import  RequestLoanComponent from './RequestLoanComponent';
import  TravelRequestComponent from './TravelRequestComponent';
import  AdvanceSalaryComponent from './AdvanceSalaryComponent';
import  OvertimeRequestComponent from './OvertimeRequestComponent';
import  AwardsComponent from './AwardsComponent';
import  ProjectComponent from './ProjectComponent';
import  TaskComponent from './TaskComponent';
import  PayslipHistoryComponent from './PayslipHistoryComponent';




const tabLabels = [
  'Leave Request',
  'Expense Claim',
  'Request Loan',
  'Travel Request',
  'Advance Salary',
  'Overtime Request',
  'Awards',
  'Project',
  'Task',
  'Pay Slip History',
];

// Placeholder child components (replace with your own)
const Placeholder = ({ title }) => (
  <Box p={2}>
    <Typography variant="body1">{title} content goes here...</Typography>
  </Box>
);

const TimeSheet = () => {
  const [activeTab, setActiveTab] = useState(0);

  const renderTabContent = () => {
    // Import and render your own component based on tabLabels[activeTab]
    switch (tabLabels[activeTab]) {
      case 'Leave Request':
        return <LeaveRequestComponent />;
      case 'Expense Claim':
        return <ExpenseClaimComponent />;
        case 'Request Loan':
            return <RequestLoanComponent />;
            case 'Travel Request':
                return <TravelRequestComponent />;
                case 'Advance Salary':
                    return <AdvanceSalaryComponent />;
                    case 'Overtime Request':
                        return <OvertimeRequestComponent />;
                        case 'Awards':
                            return <AwardsComponent />;
                            case 'Project':
                                return <ProjectComponent />;
                                case 'Task':
                                    return <TaskComponent />;
                                    case 'Pay Slip History':
                                        return <PayslipHistoryComponent />;
      // Add other cases as needed
      default:
        return <Placeholder title={tabLabels[activeTab]} />;
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h6" gutterBottom>🗓️ Timesheet Agenda</Typography>
      <Tabs
        value={activeTab}
        onChange={(e, newVal) => setActiveTab(newVal)}
        variant="scrollable"
        scrollButtons="auto"
        textColor="primary"
        indicatorColor="primary"
      >
        {tabLabels.map((label, index) => (
          <Tab key={index} label={label} />
        ))}
      </Tabs>

      <Paper elevation={1} sx={{ mt: 2, p: 2 }}>
        {renderTabContent()}
      </Paper>
    </Box>
  );
};

export default TimeSheet;
