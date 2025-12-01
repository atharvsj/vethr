
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
  CircularProgress,
  Tabs,
  Tab,
} from "@mui/material"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import Swal from "sweetalert2"

const TerminationDashboardAdmin = () => {
  const [selectedEmployee, setSelectedEmployee] = useState("")
  const [terminationDate, setTerminationDate] = useState(null)
  const [terminationReason, setTerminationReason] = useState("")
  const [initiatePoint, setInitiatePoint] = useState("")
  const [exitType, setExitType] = useState("")
  const [employees, setEmployees] = useState([])
  const [terminationRecords, setTerminationRecords] = useState([])
  const [terminatedEmployees, setTerminatedEmployees] = useState([])
  const [exitTypes, setExitTypes] = useState([])
  const [openDialog, setOpenDialog] = useState(false)
  const [loading, setLoading] = useState(true)
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" })
  const [tabIndex, setTabIndex] = useState(0)

  const initiatePoints = [
    "HR Review (confirmation)",
    "PIP",
    "Abscond Follow-up (15+ days incompleted)",
  ]

  const fetchTerminations = async () => {
    setLoading(true)
    try {
      const response = await fetch("https://tdtlworld.com/hrms-backend/get-terminations/")
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      const formattedData = data.map((record) => ({
        id: record.termination_id,
        employeeId: record.employee_id || "N/A",
        employeeName: record.employee_name,
        exitType: record.exit_type
          ? record.exit_type.charAt(0).toUpperCase() + record.exit_type.slice(1)
          : "N/A",
        terminationDate: record.date_of_termination,
        terminationReason: record.reason_of_termination,
        mailStatus: record.mail_status === "Send" ? "Sent" : "Pending",
        accountStatus: record.mail_status === "Send" ? "Inactive" : "Active",
      }))
      setTerminationRecords(formattedData)
    } catch (error) {
      console.error("Could not fetch terminations:", error)
      setSnackbar({
        open: true,
        message: "Failed to fetch termination records.",
        severity: "error",
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTerminations()
  }, [])

  useEffect(() => {
    const sentRecords = terminationRecords.filter((record) => record.mailStatus === "Sent")
    setTerminatedEmployees(sentRecords)
  }, [terminationRecords])

  useEffect(() => {
    const fetchEmployees = async (url) => {
      try {
        const response = await fetch(url)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        const formattedData = data.map((emp) => ({
          id: emp.id || emp.employee_id,
          name: emp.employee_name,
          status: emp.status || "Active",
        }))
        setEmployees(formattedData)
      } catch (error) {
        console.error("Could not fetch employees:", error)
        setSnackbar({
          open: true,
          message: "Failed to fetch employee list.",
          severity: "error",
        })
        setEmployees([])
      }
    }

    setSelectedEmployee("")

    if (initiatePoint === "HR Review (confirmation)") {
      fetchEmployees("https://tdtlworld.com/hrms-backend/confirmation-employees-dropdown/")
    } else if (initiatePoint === "Abscond Follow-up (15+ days incompleted)") {
      fetchEmployees("https://tdtlworld.com/hrms-backend/resigned-employees-dropdown/")
    } else {
      setEmployees([])
    }
  }, [initiatePoint])

  useEffect(() => {
    const fetchExitTypes = async () => {
      try {
        const response = await fetch("https://tdtlworld.com/hrms-backend/api/exit-type/")
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        setExitTypes(data)
      } catch (error) {
        console.error("Could not fetch exit types:", error)
        setSnackbar({
          open: true,
          message: "Failed to fetch exit types.",
          severity: "error",
        })
      }
    }

    if (openDialog) {
      fetchExitTypes()
    }
  }, [openDialog])

  const handleSubmitTermination = async () => {
    if (!selectedEmployee || !exitType || !terminationDate || !terminationReason) {
      Swal.fire({
        icon: "error",
        title: "Incomplete Form",
        text: "Please fill all required fields before submitting.",
      })
      return
    }

    const payload = {
      employee_id: selectedEmployee,
      exit_type: Number(exitType),
      date_of_termination: terminationDate.toISOString().split("T")[0],
      reason_of_termination: terminationReason,
    }

    try {
      const response = await fetch("https://tdtlworld.com/hrms-backend/post-terminations/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong!")
      }

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: data.message,
      })

      fetchTerminations()
      setOpenDialog(false)
      setSelectedEmployee("")
      setTerminationDate(null)
      setTerminationReason("")
      setInitiatePoint("")
      setExitType("")
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
      })
    }
  }

  const handleSendTerminationMail = async (recordId) => {
    try {
      const response = await fetch(
        `https://tdtlworld.com/hrms-backend/update-terminations/${recordId}/`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ action: "send" }),
        }
      )

      if (!response.ok) {
        throw new Error(`API call failed with status: ${response.status}`)
      }

      const updatedRecords = terminationRecords.map((record) =>
        record.id === recordId
          ? { ...record, mailStatus: "Sent", accountStatus: "Inactive" }
          : record
      )
      setTerminationRecords(updatedRecords)
      setSnackbar({
        open: true,
        message: "Termination email sent successfully and status updated.",
        severity: "success",
      })
    } catch (error) {
      console.error("Failed to send termination mail:", error)
      setSnackbar({
        open: true,
        message: "Failed to send termination email. Please try again.",
        severity: "error",
      })
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Sent":
        return "success"
      case "Pending":
        return "warning"
      case "Inactive":
        return "error"
      case "Active":
        return "success"
      default:
        return "default"
    }
  }

  const getExitTypeColor = (exitType) => {
    switch (exitType) {
      case "Termination":
        return "error"
      case "Resignation":
        return "warning"
      case "Retirement":
        return "info"
      default:
        return "default"
    }
  }

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue)
  }

  const terminationInitiatedRecords = terminationRecords.filter(
    (record) => record.mailStatus !== "Sent"
  )

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
          <Typography variant="h4" gutterBottom>
            Termination Dashboard
          </Typography>
          <Button variant="contained" color="error" onClick={() => setOpenDialog(true)}>
            Initiate Termination
          </Button>
        </Box>

        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={tabIndex} onChange={handleTabChange} aria-label="termination tabs">
            <Tab label="Termination Initiated" />
            <Tab label="Terminated Employees" />
          </Tabs>
        </Box>

        <Grid container spacing={3} sx={{ mt: 1 }}>
          <Grid item xs={12}>
            {tabIndex === 0 && (
              <Paper sx={{ p: 3 }}>
                <Typography variant="h5" gutterBottom>
                  Termination Initiated
                </Typography>
                {loading ? (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      minHeight: "300px",
                    }}
                  >
                    <CircularProgress />
                  </Box>
                ) : (
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Sr No.</TableCell>
                          <TableCell>Employee Name</TableCell>
                          <TableCell>Exit Type</TableCell>
                          <TableCell>Date of Termination</TableCell>
                          <TableCell>Reason of Termination</TableCell>
                          <TableCell>Account Status</TableCell>
                          <TableCell>Mail Status</TableCell>
                          <TableCell>Actions</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {terminationInitiatedRecords.map((record, index) => (
                          <TableRow key={record.id}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{record.employeeName}</TableCell>
                            <TableCell>
                              <Chip
                                label={record.exitType}
                                color={getExitTypeColor(record.exitType)}
                                size="small"
                              />
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
                              <Chip
                                label={record.mailStatus}
                                color={getStatusColor(record.mailStatus)}
                                size="small"
                              />
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
                )}
              </Paper>
            )}
            {tabIndex === 1 && (
              <Paper sx={{ p: 3 }}>
                <Typography variant="h5" gutterBottom>
                  Terminated Employees
                </Typography>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Sr No.</TableCell>
                        <TableCell>Employee Name</TableCell>
                        <TableCell>Exit Type</TableCell>
                        <TableCell>Date of Termination</TableCell>
                        <TableCell>Reason of Termination</TableCell>
                        <TableCell>Account Status</TableCell>
                        <TableCell>Mail Status</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {terminatedEmployees.map((record, index) => (
                        <TableRow key={record.id}>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>{record.employeeName}</TableCell>
                          <TableCell>
                            <Chip
                              label={record.exitType}
                              color={getExitTypeColor(record.exitType)}
                              size="small"
                            />
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
                            <Chip
                              label={record.mailStatus}
                              color={getStatusColor(record.mailStatus)}
                              size="small"
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            )}
          </Grid>
        </Grid>

        <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
          <DialogTitle>Initiate Employee Termination</DialogTitle>
          <DialogContent>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Initiate Point</InputLabel>
                  <Select
                    value={initiatePoint}
                    onChange={(e) => setInitiatePoint(e.target.value)}
                    label="Initiate Point"
                  >
                    {initiatePoints.map((point) => (
                      <MenuItem key={point} value={point}>
                        {point}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Select Employee</InputLabel>
                  <Select
                    value={selectedEmployee}
                    onChange={(e) => setSelectedEmployee(e.target.value)}
                    label="Select Employee"
                    disabled={!employees.length}
                  >
                    {employees.map((employee) => (
                      <MenuItem key={employee.id} value={employee.id}>
                        {employee.name} ({employee.status})
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Exit Type</InputLabel>
                  <Select
                    value={exitType}
                    onChange={(e) => setExitType(e.target.value)}
                    label="Exit Type"
                    disabled={!exitTypes.length}
                  >
                    {exitTypes.map((type) => (
                      <MenuItem key={type.value} value={String(type.value)}>
                        {type.label}
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
              <Grid item xs={12} md={6}>
                <TextField
                  label="Reason of Termination"
                  fullWidth
                  value={terminationReason}
                  onChange={(e) => setTerminationReason(e.target.value)}
                />
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

export default TerminationDashboardAdmin