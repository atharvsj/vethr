import React, { useState } from 'react';
import { Box, Card, CardActionArea, CardContent, Grid, Typography, Container } from '@mui/material';
import { Calculate, ReceiptLong, Paid, AccountBalance } from '@mui/icons-material';

// Assuming you already have the actual components imported here
import Payroll from './Payroll';  // Make sure you import the actual Payroll component here
import PayslipHistory from './PayslipHistory';  // Import corresponding components
import AdvanceSalary from './AdvanceSalary';  // Import corresponding components
import Loan from './Loan';  // Import corresponding components

const DashboardPayroll = () => {
  const [selectedOption, setSelectedOption] = useState('Payroll');

  const renderComponent = () => {
    switch (selectedOption) {
      case 'Payroll':
        return <Payroll />;
      case 'Payslip History':
        return <PayslipHistory />;
      // case 'Advance Salary':
      //   return <AdvanceSalary />;
      // case 'Loan':
      //   return <Loan />;
      default:
        return null;
    }
  };

  const options = [
    { label: 'Payroll', sublabel: 'Set up Payroll' },
    { label: 'Payslip History', sublabel: 'View Payslip History' },
    // { label: 'Advance Salary', sublabel: 'Request Advance Salary' },
    // { label: 'Loan', sublabel: 'Request Loan' },
  ];

  return (
    <Box p={0}>
      {/* Top Section */}
      <Grid container spacing={3} justifyContent="center">
        {options.map((option) => (
          <Grid item xs={6} sm={4} md={2.5} key={option.label}>
           <Card
  variant="outlined"
  sx={{
    textAlign: 'center',
    backgroundColor: selectedOption === option.label ? '#ede9fe' : '#f9fafb',
    borderColor: selectedOption === option.label ? '#7c3aed' : '#e0e0e0',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#ede9fe',
      borderColor: '#7c3aed',
      transform: 'scale(1.05)',
      transition: '0.2s ease-in-out',
    },
    borderRadius: 2,
    minHeight: 50, // reduced height
    width: '100%',
    maxWidth: 180,
    mx: 'auto',
  }}
>
  <CardActionArea onClick={() => setSelectedOption(option.label)}>
    <CardContent sx={{ p: 1 }}>
      <Typography variant="subtitle2" fontWeight="bold" color={selectedOption === option.label ? '#7c3aed' : 'inherit'}>
        {option.label}
      </Typography>
      <Typography variant="caption" color="text.secondary" noWrap>
        {option.sublabel}
      </Typography>
    </CardContent>
  </CardActionArea>
</Card>

          </Grid>
        ))}
      </Grid>

      {/* Bottom Section */}
      <Container sx={{ mt: 4, p: 3, backgroundColor: '#f5f5f5', borderRadius: 3 }}>
        {renderComponent()}
      </Container>
    </Box>
  );
};

export default DashboardPayroll;
