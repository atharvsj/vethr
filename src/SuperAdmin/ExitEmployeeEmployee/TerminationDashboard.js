"use client"

import { useState, useEffect } from "react"
import {
  Box,
  Paper,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Snackbar,
} from "@mui/material"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"

const TerminationDashboard = () => {
  const [selectedEmployee, setSelectedEmployee] = useState("")
  const [terminationDate, setTerminationDate] = useState(null)
  const [terminationReason, setTerminationReason] = useState("")
  const [employees, setEmployees] = useState([])
  const [terminationRecords, setTerminationRecords] = useState([])
  const [openDialog, setOpenDialog] = useState(false)
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" })

  const terminationReasons = [
    "Performance Issues",
    "Misconduct",
    "Policy Violation",
    "Attendance Issues",
    "Failed PIP",
    "Abscond - No Response",
    "Other",
  ]

  const mockEmployees = [
    { id: "EMP001", name: "John Doe", department: "IT", status: "Active" },
    { id: "EMP002", name: "Jane Smith", department: "HR", status: "PIP" },
    { id: "EMP003", name: "Mike Johnson", department: "Finance", status: "Abscond" },
    { id: "EMP004", name: "Sarah Wilson", department: "Marketing", status: "Active" },
  ]

  const mockTerminationRecords = [
    {
      id: 1,
      employeeId: "EMP005",
      employeeName: "Robert Brown",
      exitType: "Termination",
      terminationDate: "2024-01-10",
      terminationReason: "Performance Issues",
      accountStatus: "Inactive",
      mailStatus: "Sent",
    },
    {
      id: 2,
      employeeId: "EMP006",
      employeeName: "Lisa Davis",
      exitType: "Termination",
      terminationDate: "2024-01-08",
      terminationReason: "Policy Violation",
      accountStatus: "Inactive",
      mailStatus: "Pending",
    },
  ]

  useEffect(() => {
    setEmployees(mockEmployees)
    setTerminationRecords(mockTerminationRecords)
  }, [])

  const handleSubmitTermination = () => {
    if (!selectedEmployee || !terminationDate || !terminationReason) {
      setSnackbar({
        open: true,
        message: "Please fill all required fields",
        severity: "error",
      })
      return
    }

    const employee = employees.find((emp) => emp.id === selectedEmployee)
    const newTerminationRecord = {
      id: terminationRecords.length + 1,
      employeeId: selectedEmployee,
      employeeName: employee.name,
      exitType: "Termination",
      terminationDate: terminationDate.toISOString().split("T")[0],
      terminationReason: terminationReason,
      accountStatus: "Inactive",
      mailStatus: "Pending",
    }

    setTerminationRecords([...terminationRecords, newTerminationRecord])
    setSnackbar({
      open: true,
      message: "Employee termination processed successfully",
      severity: "success",
    })

    // Reset form
    setSelectedEmployee("")
    setTerminationDate(null)
    setTerminationReason("")
    setOpenDialog(false)
  }

  const handleSendTerminationMail = (recordId) => {
    const updatedRecords = terminationRecords.map((record) =>
      record.id === recordId ? { ...record, mailStatus: "Sent" } : record,
    )
    setTerminationRecords(updatedRecords)
    setSnackbar({
      open: true,
      message: "Termination email sent successfully",
      severity: "success",
    })
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Sent":
        return "success"
      case "Pending":
        return "warning"
      case "Inactive":
        return "error"
      default:
        return "default"
    }
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box>
        <Typography variant="h4" gutterBottom>
          Termination Dashboard
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Employee Termination Process
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                This process can be initiated from HR review confirmation, PIP failure, or abscond status.
              </Typography>
              <Button variant="contained" color="error" onClick={() => setOpenDialog(true)} sx={{ mb: 2 }}>
                Initiate Termination
              </Button>
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Terminated Employees
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Sr No.</TableCell>
                      <TableCell>Employee ID</TableCell>
                      <TableCell>Name of Employee</TableCell>
                      <TableCell>Exit Type</TableCell>
                      <TableCell>Date of Termination</TableCell>
                      <TableCell>Reason of Termination</TableCell>
                      <TableCell>Account Status</TableCell>
                      <TableCell>Mail Status</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {terminationRecords.map((record, index) => (
                      <TableRow key={record.id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{record.employeeId}</TableCell>
                        <TableCell>{record.employeeName}</TableCell>
                        <TableCell>
                          <Chip label={record.exitType} color="error" size="small" />
                        </TableCell>
                        <TableCell>{record.terminationDate}</TableCell>
                        <TableCell>{record.terminationReason}</TableCell>
                        <TableCell>
                          <Chip
                            label={record.accountStatus}
                            color={getStatusColor(record.accountStatus)}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          <Chip label={record.mailStatus} color={getStatusColor(record.mailStatus)} size="small" />
                        </TableCell>
                        <TableCell>
                          {record.mailStatus === "Pending" && (
                            <Button
                              size="small"
                              variant="outlined"
                              onClick={() => handleSendTerminationMail(record.id)}
                            >
                              Send Termination Mail
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>
        </Grid>

        {/* Termination Dialog */}
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
          <DialogTitle>Initiate Employee Termination</DialogTitle>
          <DialogContent>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Select Employee</InputLabel>
                  <Select
                    value={selectedEmployee}
                    onChange={(e) => setSelectedEmployee(e.target.value)}
                    label="Select Employee"
                  >
                    {employees.map((employee) => (
                      <MenuItem key={employee.id} value={employee.id}>
                        {employee.id} - {employee.name} ({employee.status})
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <DatePicker
                  label="Date of Termination"
                  value={terminationDate}
                  onChange={(newValue) => setTerminationDate(newValue)}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Reason of Termination</InputLabel>
                  <Select
                    value={terminationReason}
                    onChange={(e) => setTerminationReason(e.target.value)}
                    label="Reason of Termination"
                  >
                    {terminationReasons.map((reason) => (
                      <MenuItem key={reason} value={reason}>
                        {reason}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
            <Button onClick={handleSubmitTermination} variant="contained" color="error">
              Terminate Employee
            </Button>
          </DialogActions>
        </Dialog>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          <Alert severity={snackbar.severity} sx={{ width: "100%" }}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </LocalizationProvider>
  )
}

export default TerminationDashboard
