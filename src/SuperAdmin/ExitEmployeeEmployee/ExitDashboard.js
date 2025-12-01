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

const ExitDashboard = () => {
  const [selectedEmployee, setSelectedEmployee] = useState("")
  const [exitType, setExitType] = useState("")
  const [lastWorkingDate, setLastWorkingDate] = useState(null)
  const [employees, setEmployees] = useState([])
  const [exitRecords, setExitRecords] = useState([])
  const [openDialog, setOpenDialog] = useState(false)
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" })

  const exitTypes = [
    { value: "notice_period", label: "Exit with serving Notice period" },
    { value: "immediate", label: "Immediate Exit" },
    { value: "abscond", label: "Abscond" },
    { value: "retirement", label: "Retirement" },
    { value: "permanent_disability", label: "Permanent Disability" },
  ]

  const mockEmployees = [
    { id: "EMP001", name: "John Doe", department: "IT" },
    { id: "EMP002", name: "Jane Smith", department: "HR" },
    { id: "EMP003", name: "Mike Johnson", department: "Finance" },
    { id: "EMP004", name: "Sarah Wilson", department: "Marketing" },
  ]

  const mockExitRecords = [
    {
      id: 1,
      employeeId: "EMP001",
      employeeName: "John Doe",
      exitType: "notice_period",
      lastWorkingDate: "2024-01-15",
      returnAsset: "Yes",
      exitInterview: "Yes",
      clearanceForm: "Yes",
      fullFinalSettlement: "Yes",
      relievingLetter: "Yes",
      experienceLetter: "Yes",
      status: "Completed",
    },
    {
      id: 2,
      employeeId: "EMP002",
      employeeName: "Jane Smith",
      exitType: "immediate",
      lastWorkingDate: "2024-01-10",
      returnAsset: "No",
      exitInterview: "No",
      clearanceForm: "No",
      fullFinalSettlement: "No",
      relievingLetter: "No",
      experienceLetter: "No",
      status: "Pending",
    },
  ]

  useEffect(() => {
    setEmployees(mockEmployees)
    setExitRecords(mockExitRecords)
  }, [])

  const handleSubmitExit = () => {
    if (!selectedEmployee || !exitType || !lastWorkingDate) {
      setSnackbar({
        open: true,
        message: "Please fill all required fields",
        severity: "error",
      })
      return
    }

    const employee = employees.find((emp) => emp.id === selectedEmployee)
    const newExitRecord = {
      id: exitRecords.length + 1,
      employeeId: selectedEmployee,
      employeeName: employee.name,
      exitType: exitType,
      lastWorkingDate: lastWorkingDate.toISOString().split("T")[0],
      returnAsset: "No",
      exitInterview: "No",
      clearanceForm: "No",
      fullFinalSettlement: "No",
      relievingLetter: "No",
      experienceLetter: "No",
      status: "Initiated",
    }

    setExitRecords([...exitRecords, newExitRecord])
    setSnackbar({
      open: true,
      message: "Exit process initiated successfully",
      severity: "success",
    })

    // Reset form
    setSelectedEmployee("")
    setExitType("")
    setLastWorkingDate(null)
    setOpenDialog(false)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "success"
      case "Pending":
        return "warning"
      case "Initiated":
        return "info"
      default:
        return "default"
    }
  }

  const getYesNoColor = (value) => {
    return value === "Yes" ? "success" : "error"
  }

  const handleGenerateDocument = (type, employeeId) => {
    setSnackbar({
      open: true,
      message: `${type} generated and sent via email`,
      severity: "success",
    })
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box>
        <Typography variant="h4" gutterBottom>
          Exit Dashboard 
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Initiate Employee Exit
              </Typography>
              <Button variant="contained" onClick={() => setOpenDialog(true)} sx={{ mb: 2 }}>
                Add New Exit
              </Button>
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Exit Records
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Sr No.</TableCell>
                      <TableCell>Employee ID</TableCell>
                      <TableCell>Employee Name</TableCell>
                      <TableCell>Exit Type</TableCell>
                      <TableCell>Return Asset</TableCell>
                      <TableCell>Exit Interview</TableCell>
                      <TableCell>Clearance Form</TableCell>
                      <TableCell>Full & Final</TableCell>
                      <TableCell>Relieving Letter</TableCell>
                      <TableCell>Experience Letter</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {exitRecords.map((record, index) => (
                      <TableRow key={record.id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{record.employeeId}</TableCell>
                        <TableCell>{record.employeeName}</TableCell>
                        <TableCell>{record.exitType}</TableCell>
                        <TableCell>
                          <Chip label={record.returnAsset} color={getYesNoColor(record.returnAsset)} size="small" />
                        </TableCell>
                        <TableCell>
                          <Chip label={record.exitInterview} color={getYesNoColor(record.exitInterview)} size="small" />
                        </TableCell>
                        <TableCell>
                          <Chip label={record.clearanceForm} color={getYesNoColor(record.clearanceForm)} size="small" />
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={record.fullFinalSettlement}
                            color={getYesNoColor(record.fullFinalSettlement)}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={record.relievingLetter}
                            color={getYesNoColor(record.relievingLetter)}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={record.experienceLetter}
                            color={getYesNoColor(record.experienceLetter)}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          <Chip label={record.status} color={getStatusColor(record.status)} size="small" />
                        </TableCell>
                        <TableCell>
                          {record.fullFinalSettlement === "Yes" && (
                            <Box>
                              <Button
                                size="small"
                                onClick={() => handleGenerateDocument("Relieving Letter", record.employeeId)}
                                sx={{ mr: 1, mb: 1 }}
                              >
                                Generate Relieving Letter
                              </Button>
                              <Button
                                size="small"
                                onClick={() => handleGenerateDocument("Experience Letter", record.employeeId)}
                              >
                                Generate Experience Letter
                              </Button>
                            </Box>
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

        {/* Add Exit Dialog */}
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
          <DialogTitle>Initiate Employee Exit</DialogTitle>
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
                        {employee.id} - {employee.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Exit Type</InputLabel>
                  <Select value={exitType} onChange={(e) => setExitType(e.target.value)} label="Exit Type">
                    {exitTypes.map((type) => (
                      <MenuItem key={type.value} value={type.value}>
                        {type.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <DatePicker
                  label="Last Working Date"
                  value={lastWorkingDate}
                  onChange={(newValue) => setLastWorkingDate(newValue)}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
            <Button onClick={handleSubmitExit} variant="contained">
              Initiate Exit Process
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

export default ExitDashboard
