

import { useState, useEffect } from "react"
import {
  Box,
  Paper,
  Typography,
  Grid,
  Button,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Snackbar,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material"
import { Assignment, Description, Inventory, CheckCircle, Download, Send } from "@mui/icons-material"

const EmployeeExitProcess = () => {
  const [currentEmployee, setCurrentEmployee] = useState(null)
  const [exitData, setExitData] = useState(null)
  const [openExitInterview, setOpenExitInterview] = useState(false)
  const [openAssetReturn, setOpenAssetReturn] = useState(false)
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" })
  const [exitInterviewAnswers, setExitInterviewAnswers] = useState({})
  const [assetReturnList, setAssetReturnList] = useState([])

  // Mock current employee data (in real app, this would come from authentication)
  const mockCurrentEmployee = {
    id: "EMP001",
    name: "John Doe",
    department: "IT",
    lastWorkingDate: "2024-01-15",
    exitType: "notice_period",
    daysRemaining: 5,
  }

  const mockExitData = {
    exitInterview: { status: "pending", completed: false },
    assetReturn: { status: "pending", completed: false },
    clearanceForm: { status: "pending", completed: false },
    fullFinalSettlement: { status: "pending", completed: false },
  }

  const mockAssets = [
    { id: "AST001", name: "Dell Laptop", type: "Laptop", returned: false },
    { id: "AST002", name: "iPhone 13", type: "Mobile Phone", returned: false },
    { id: "AST003", name: "ID Card", type: "Access Card", returned: false },
  ]

  const exitInterviewQuestions = [
    {
      id: "reason",
      question: "What is the primary reason for leaving the company?",
      type: "radio",
      options: ["Better Opportunity", "Career Growth", "Work-Life Balance", "Compensation", "Other"],
    },
    {
      id: "satisfaction",
      question: "How satisfied were you with your role and responsibilities?",
      type: "radio",
      options: ["Very Satisfied", "Satisfied", "Neutral", "Dissatisfied", "Very Dissatisfied"],
    },
    {
      id: "management",
      question: "How would you rate the support from your immediate supervisor?",
      type: "radio",
      options: ["Excellent", "Good", "Average", "Poor", "Very Poor"],
    },
    {
      id: "recommendation",
      question: "Would you recommend this company as a good place to work?",
      type: "radio",
      options: ["Definitely", "Probably", "Maybe", "Probably Not", "Definitely Not"],
    },
    {
      id: "feedback",
      question: "Any additional feedback or suggestions for improvement?",
      type: "text",
    },
  ]

  useEffect(() => {
    setCurrentEmployee(mockCurrentEmployee)
    setExitData(mockExitData)
    setAssetReturnList(mockAssets)
  }, [])

  const handleExitInterviewSubmit = () => {
    // Validate that all questions are answered
    const unansweredQuestions = exitInterviewQuestions.filter((q) => !exitInterviewAnswers[q.id])
    if (unansweredQuestions.length > 0) {
      setSnackbar({
        open: true,
        message: "Please answer all questions before submitting",
        severity: "error",
      })
      return
    }

    setExitData((prev) => ({
      ...prev,
      exitInterview: { status: "completed", completed: true },
    }))

    setSnackbar({
      open: true,
      message: "Exit interview questionnaire submitted successfully",
      severity: "success",
    })

    setOpenExitInterview(false)
  }

  const handleAssetReturn = (assetId) => {
    const updatedAssets = assetReturnList.map((asset) => (asset.id === assetId ? { ...asset, returned: true } : asset))
    setAssetReturnList(updatedAssets)

    // Check if all assets are returned
    const allReturned = updatedAssets.every((asset) => asset.returned)
    if (allReturned) {
      setExitData((prev) => ({
        ...prev,
        assetReturn: { status: "completed", completed: true },
      }))
    }

    setSnackbar({
      open: true,
      message: "Asset return status updated",
      severity: "success",
    })
  }

  const handleDownloadClearanceForm = () => {
    setSnackbar({
      open: true,
      message: "Employee Clearance Form downloaded successfully",
      severity: "success",
    })
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "success"
      case "pending":
        return "warning"
      case "overdue":
        return "error"
      default:
        return "default"
    }
  }

  const getStepStatus = (step) => {
    switch (step) {
      case "exitInterview":
        return exitData?.exitInterview?.completed ? 1 : 0
      case "assetReturn":
        return exitData?.assetReturn?.completed ? 1 : 0
      case "clearanceForm":
        return exitData?.clearanceForm?.completed ? 1 : 0
      case "fullFinal":
        return exitData?.fullFinalSettlement?.completed ? 1 : 0
      default:
        return 0
    }
  }

  if (!currentEmployee) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <Typography>Loading employee data...</Typography>
      </Box>
    )
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Employee Exit Process
      </Typography>

      {/* Employee Info Card */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6">Employee Information</Typography>
            <Typography>ID: {currentEmployee.id}</Typography>
            <Typography>Name: {currentEmployee.name}</Typography>
            <Typography>Department: {currentEmployee.department}</Typography>
            <Typography>Last Working Date: {currentEmployee.lastWorkingDate}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Alert severity={currentEmployee.daysRemaining <= 5 ? "warning" : "info"}>
              {currentEmployee.daysRemaining} days remaining to complete exit process
            </Alert>
          </Grid>
        </Grid>
      </Paper>

      {/* Process Steps */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Exit Process Steps
        </Typography>
        <Stepper activeStep={-1} alternativeLabel>
          <Step completed={exitData?.exitInterview?.completed}>
            <StepLabel>Exit Interview</StepLabel>
          </Step>
          <Step completed={exitData?.assetReturn?.completed}>
            <StepLabel>Asset Return</StepLabel>
          </Step>
          <Step completed={exitData?.clearanceForm?.completed}>
            <StepLabel>Clearance Form</StepLabel>
          </Step>
          <Step completed={exitData?.fullFinalSettlement?.completed}>
            <StepLabel>Full & Final Settlement</StepLabel>
          </Step>
        </Stepper>
      </Paper>

      {/* Action Cards */}
      <Grid container spacing={3}>
        {/* Exit Interview Card */}
        <Grid item xs={12} md={6} lg={4}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <Assignment sx={{ mr: 1 }} />
                <Typography variant="h6">Exit Interview</Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" mb={2}>
                Complete the exit interview questionnaire
              </Typography>
              <Chip
                label={exitData?.exitInterview?.completed ? "Completed" : "Pending"}
                color={getStatusColor(exitData?.exitInterview?.status)}
                sx={{ mb: 2 }}
              />
              <Box>
                <Button
                  variant="contained"
                  fullWidth
                  disabled={exitData?.exitInterview?.completed}
                  onClick={() => setOpenExitInterview(true)}
                >
                  {exitData?.exitInterview?.completed ? "Completed" : "Start Interview"}
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Asset Return Card */}
        <Grid item xs={12} md={6} lg={4}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <Inventory sx={{ mr: 1 }} />
                <Typography variant="h6">Asset Return</Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" mb={2}>
                Return all company assets
              </Typography>
              <Chip
                label={exitData?.assetReturn?.completed ? "Completed" : "Pending"}
                color={getStatusColor(exitData?.assetReturn?.status)}
                sx={{ mb: 2 }}
              />
              <Box>
                <Button variant="contained" fullWidth onClick={() => setOpenAssetReturn(true)}>
                  View Assets
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Clearance Form Card */}
        <Grid item xs={12} md={6} lg={4}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <Description sx={{ mr: 1 }} />
                <Typography variant="h6">Clearance Form</Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" mb={2}>
                Download and submit clearance form
              </Typography>
              <Chip
                label={exitData?.clearanceForm?.completed ? "Completed" : "Pending"}
                color={getStatusColor(exitData?.clearanceForm?.status)}
                sx={{ mb: 2 }}
              />
              <Box>
                <Button variant="contained" fullWidth startIcon={<Download />} onClick={handleDownloadClearanceForm}>
                  Download Form
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Exit Interview Dialog */}
      <Dialog open={openExitInterview} onClose={() => setOpenExitInterview(false)} maxWidth="md" fullWidth>
        <DialogTitle>Exit Interview Questionnaire</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            {exitInterviewQuestions.map((question) => (
              <Box key={question.id} sx={{ mb: 3 }}>
                <FormControl component="fieldset" fullWidth>
                  <FormLabel component="legend" sx={{ mb: 1 }}>
                    {question.question}
                  </FormLabel>
                  {question.type === "radio" ? (
                    <RadioGroup
                      value={exitInterviewAnswers[question.id] || ""}
                      onChange={(e) =>
                        setExitInterviewAnswers((prev) => ({
                          ...prev,
                          [question.id]: e.target.value,
                        }))
                      }
                    >
                      {question.options.map((option) => (
                        <FormControlLabel key={option} value={option} control={<Radio />} label={option} />
                      ))}
                    </RadioGroup>
                  ) : (
                    <TextField
                      multiline
                      rows={3}
                      fullWidth
                      value={exitInterviewAnswers[question.id] || ""}
                      onChange={(e) =>
                        setExitInterviewAnswers((prev) => ({
                          ...prev,
                          [question.id]: e.target.value,
                        }))
                      }
                    />
                  )}
                </FormControl>
              </Box>
            ))}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenExitInterview(false)}>Cancel</Button>
          <Button onClick={handleExitInterviewSubmit} variant="contained">
            Submit Interview
          </Button>
        </DialogActions>
      </Dialog>

      {/* Asset Return Dialog */}
      <Dialog open={openAssetReturn} onClose={() => setOpenAssetReturn(false)} maxWidth="md" fullWidth>
        <DialogTitle>Return Company Assets</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Please confirm the return of each asset by clicking the return button.
          </Typography>
          <List>
            {assetReturnList.map((asset) => (
              <ListItem key={asset.id}>
                <ListItemIcon>
                  <Inventory />
                </ListItemIcon>
                <ListItemText primary={asset.name} secondary={`Type: ${asset.type} | ID: ${asset.id}`} />
                <Button
                  variant={asset.returned ? "outlined" : "contained"}
                  color={asset.returned ? "success" : "primary"}
                  startIcon={asset.returned ? <CheckCircle /> : <Send />}
                  onClick={() => handleAssetReturn(asset.id)}
                  disabled={asset.returned}
                >
                  {asset.returned ? "Returned" : "Return Asset"}
                </Button>
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAssetReturn(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
        <Alert severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default EmployeeExitProcess
