"use client"

import { useState } from "react"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import { Container, AppBar, Toolbar, Typography, Tabs, Tab, Box } from "@mui/material"
import PayrollSetup from "./payroll-setup"
import SalaryCalculation from "./salary-calculation"
import PayslipFinalization from "./payslip-finalization"
import PaymentInfo from "./payment-info"

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
  },
})

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div role="tabpanel" hidden={value !== index} id={`tabpanel-${index}`} aria-labelledby={`tab-${index}`} {...other}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  )
}

export default function PayrollSystem() {
  const [tabValue, setTabValue] = useState(0)

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Payroll Management System
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ mt: 2 }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={tabValue} onChange={handleTabChange} aria-label="payroll tabs">
            <Tab label="Payroll Setup" />
            <Tab label="Salary Calculation" />
            <Tab label="Payslip Finalization" />
            <Tab label="Payment Info" />
          </Tabs>
        </Box>

        <TabPanel value={tabValue} index={0}>
          <PayrollSetup />
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <SalaryCalculation />
        </TabPanel>
        <TabPanel value={tabValue} index={2}>
          <PayslipFinalization />
        </TabPanel>
        <TabPanel value={tabValue} index={3}>
          <PaymentInfo />
        </TabPanel>
      </Container>
    </ThemeProvider>
  )
}
