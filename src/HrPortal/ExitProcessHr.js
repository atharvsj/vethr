// import { useState, useEffect, useCallback } from "react"
// import {
//   Box,
//   Paper,
//   Typography,
//   Grid,
//   Button,
//   Card,
//   CardContent,
//   Chip,
//   Alert,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Snackbar,
//   Stepper,
//   Step,
//   StepLabel,
//   Divider,
//   CircularProgress,
// } from "@mui/material"
// import { Assignment, Description, Inventory, CheckCircle, UploadFile } from "@mui/icons-material"
// import { useNavigate } from "react-router-dom"
// import { useParams } from "react-router-dom";
// import axiosInstance from "../utils/axiosInstance" // Assuming your axios instance is correctly set up
 
// const ExitProcessHr = () => {
//   // --- STATE MANAGEMENT ---
//   const [currentEmployee, setCurrentEmployee] = useState(null)
//   const [exitData, setExitData] = useState(null)
//   const [liveAssetStatus, setLiveAssetStatus] = useState(null)
//   const [openExitInterview, setOpenExitInterview] = useState(false)
//   const [selectedClearanceFile, setSelectedClearanceFile] = useState(null)
//   const [isUploading, setIsUploading] = useState(false)
//   const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" })
//   const [employeeDetails, setEmployeeDetails] = useState(null)
//   const [interviewData, setInterviewData] = useState([])
//   const [isLoading, setIsLoading] = useState(false)
 
//   const navigate = useNavigate()
//   const { employeeId } = useParams();
 
//   // --- STATIC DATA AND CONFIG ---
//   const mockEmployeeData = {
//     id: employeeId,
//     name: "Prasad Ravindra Shinde",
//     department: "Marketing",
//     lastWorkingDate: "2025-08-28",
//     daysRemaining: 5,
//   }
 
//   const getStatusColor = (isCompleted) => (isCompleted ? "success" : "warning")
//   const electricPurple = "#8A2BE2"
 
//   // --- API INTERACTIONS ---
 
//   const fetchInitialData = useCallback(async () => {
//     setIsLoading(true)
//     try {
//       setCurrentEmployee(mockEmployeeData)
 
//       const [table1Response, assetStatusResponse] = await Promise.all([
//         axiosInstance.get("exit-employee-table1/"),
//         axiosInstance.get(`check-asset-status/${employeeId}/`),
//       ])
 
//       setLiveAssetStatus(assetStatusResponse.data.status)
//       const employeeStatus = table1Response.data.find((emp) => emp.employee_id === employeeId)
 
//       if (employeeStatus) {
//         const isCompleted = (value) => value?.trim().toUpperCase() === 'Y';
//         setExitData({
//           exitInterview: { status: isCompleted(employeeStatus.exit_interview_questionnaire) ? "completed" : "pending", completed: isCompleted(employeeStatus.exit_interview_questionnaire) },
//           assetReturn: { status: isCompleted(employeeStatus.return_asset) ? "completed" : "pending", completed: isCompleted(employeeStatus.return_asset) },
//           clearanceForm: { status: isCompleted(employeeStatus.employee_clearance_form) ? "completed" : "pending", completed: isCompleted(employeeStatus.employee_clearance_form) },
//           fullFinalSettlement: { status: isCompleted(employeeStatus["f&f"]) ? "completed" : "pending", completed: isCompleted(employeeStatus["f&f"]) },
//         })
//       } else {
//         setExitData({
//             exitInterview: { status: "pending", completed: false },
//             assetReturn: { status: "pending", completed: false },
//             clearanceForm: { status: "pending", completed: false },
//             fullFinalSettlement: { status: "pending", completed: false },
//         })
//       }
//     } catch (error) {
//       console.error("Error fetching initial data:", error)
//       setSnackbar({ open: true, message: "Failed to load initial exit data.", severity: "error" })
//     } finally {
//       setIsLoading(false)
//     }
//   }, [employeeId]) // Added dependency
 
//   useEffect(() => {
//     fetchInitialData()
//   }, [fetchInitialData])
 
//   useEffect(() => {
//     if (openExitInterview && currentEmployee?.id) {
//       const fetchInterviewData = async () => {
//         setIsLoading(true)
//         try {
//           const response = await axiosInstance.get(`view_employeewise_feedback_form/?employee_id=${currentEmployee.id}`)
//           if (response.data.status) {
//             setEmployeeDetails(response.data.emp_data[0] || null)
//             setInterviewData(response.data.data || [])
//           } else { throw new Error("API returned false status.") }
//         } catch (error) {
//           console.error("Failed to fetch interview data:", error)
//           setSnackbar({ open: true, message: "Failed to load interview data.", severity: "error" })
//         } finally { setIsLoading(false) }
//       }
//       fetchInterviewData()
//     }
//   }, [openExitInterview, currentEmployee])
 
//   // --- UI EVENT HANDLERS ---
 
//   const handleConfirmAssetReturn = async () => {
//      setIsLoading(true);
//      try {
//        await axiosInstance.patch(`update-exit-employee-table1/${currentEmployee.id}/`, { return_asset: "Y" });
//        setExitData((prev) => ({ ...prev, assetReturn: { status: "completed", completed: true } }));
//        setSnackbar({ open: true, message: "Asset return has been confirmed.", severity: "success" });
//      } catch (error) {
//        console.error("Error confirming asset return:", error);
//        setSnackbar({ open: true, message: "Failed to confirm asset return.", severity: "error" });
//      } finally {
//        setIsLoading(false);
//      }
//   }
 
//   const handleClearanceFormUploadAndSubmit = async () => {
//     if (!selectedClearanceFile) {
//       setSnackbar({ open: true, message: "Please select a file to upload.", severity: "warning" });
//       return;
//     }
//     setIsUploading(true);
//     const formData = new FormData();
//     formData.append("clearance_form", selectedClearanceFile);
 
//     try {
//       await axiosInstance.patch(`Upload-Clearance-Form/${currentEmployee.id}/`, formData, { headers: { "Content-Type": "multipart/form-data" } });
//       await axiosInstance.patch(`update-exit-employee-table1/${currentEmployee.id}/`, { employee_clearance_form: "Y" });
//       setExitData((prev) => ({ ...prev, clearanceForm: { status: "completed", completed: true } }));
//       setSnackbar({ open: true, message: "Clearance Form submitted successfully!", severity: "success" });
//       setSelectedClearanceFile(null);
//     } catch (error) {
//       console.error("Error submitting clearance form:", error);
//       setSnackbar({ open: true, message: "Failed to submit clearance form.", severity: "error" });
//     } finally {
//       setIsUploading(false);
//     }
//   }
 
//   const handleProcessSettlement = async () => {
//     setIsLoading(true);
//     try {
//       await axiosInstance.patch(`update-exit-employee-table1/${currentEmployee.id}/`, {
//         employee_clearance_form: "Y",
//         f_and_f: "Y",
//       });
//       setExitData((prev) => ({ ...prev, fullFinalSettlement: { status: "completed", completed: true } }));
//       setSnackbar({ open: true, message: "Full and Final Settlement has been approved!", severity: "success" });
//     } catch (error) {
//       console.error("Error approving settlement:", error);
//       setSnackbar({ open: true, message: "Failed to approve settlement.", severity: "error" });
//     } finally {
//       setIsLoading(false);
//     }
//   }
 
//   const handleGoToDashboard = () => navigate("/hrms/dashboardhr/EmployeeExitMain");
 
//   // --- RENDER LOGIC ---
 
//   const allPrerequisitesMet = exitData?.exitInterview?.completed && exitData?.assetReturn?.completed && exitData?.clearanceForm?.completed;
 
//   if (!currentEmployee || !exitData) {
//     return <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px"><CircularProgress /></Box>;
//   }
 
//   return (
//     <Box>
//       <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
//         <Typography variant="h4">Employee Exit Process</Typography>
//         <Button
//           variant="contained"
//           onClick={handleGoToDashboard}
//           sx={{ backgroundColor: electricPurple, "&:hover": { backgroundColor: "#7B1FA2" } }}
//         >
//           Go Back to Dashboard
//         </Button>
//       </Box>
 
//       <Paper sx={{ p: 3, mb: 3 }}>
//         <Grid container spacing={2}>
//           <Grid item xs={12} md={6}>
//             <Typography>ID: {currentEmployee.id}</Typography>
//           </Grid>
//           <Grid item xs={12} md={6}>
//             <Alert severity={currentEmployee.daysRemaining <= 5 ? "error" : "info"}>
//               {currentEmployee.daysRemaining} days remaining to complete exit process
//             </Alert>
//           </Grid>
//         </Grid>
//       </Paper>
 
//       <Paper sx={{ p: 3, mb: 3 }}>
//         <Box display="flex" justifyContent="space-between" alignItems="flex-start" flexWrap="wrap">
//           <Box flexGrow={1} sx={{ pr: 2 }}>
//             <Typography variant="h6" gutterBottom>Exit Process Steps</Typography>
//             <Stepper activeStep={-1} alternativeLabel>
//               <Step completed={exitData.exitInterview.completed}><StepLabel>Exit Interview</StepLabel></Step>
//               <Step completed={exitData.assetReturn.completed}><StepLabel>Asset Return</StepLabel></Step>
//               <Step completed={exitData.clearanceForm.completed}><StepLabel>Clearance Form</StepLabel></Step>
//               <Step completed={exitData.fullFinalSettlement.completed}><StepLabel>Full & Final Settlement</StepLabel></Step>
//             </Stepper>
//           </Box>
         
//           <Box mt={{ xs: 2, md: 0 }}>
//             {allPrerequisitesMet && !exitData.fullFinalSettlement.completed && (
//               <Button size="small" variant="contained" onClick={handleProcessSettlement} disabled={isLoading}>
//                 Approve Full and Final Settlement
//               </Button>
//             )}
//           </Box>
//         </Box>
//       </Paper>
 
//       <Grid container spacing={3}>
//         {/* Card 1: Exit Interview */}
//         <Grid item xs={12} md={6} lg={4} sx={{ display: 'flex' }}>
//           <Card sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
//             <CardContent sx={{ flexGrow: 1 }}>
//               <Box display="flex" alignItems="center" mb={2}><Assignment sx={{ mr: 1 }} /><Typography variant="h6">Exit Interview</Typography></Box>
//               <Typography variant="body2" color="text.secondary" mb={2}>View the employee's exit interview answers.</Typography>
//               <Chip label={exitData.exitInterview.completed ? "Completed" : "Pending"} color={getStatusColor(exitData.exitInterview.completed)} sx={{ mb: 2 }} />
//             </CardContent>
//             <Box sx={{ p: 2, pt: 0 }}>
//               <Button variant="contained" fullWidth onClick={() => setOpenExitInterview(true)} sx={{ backgroundColor: electricPurple, "&:hover": { backgroundColor: "#7B1FA2" } }}>View Answers</Button>
//             </Box>
//           </Card>
//         </Grid>
 
//         {/* Card 2: Asset Return --- MODIFIED SECTION START --- */}
//      <Grid item xs={12} md={6} lg={4} sx={{ display: 'flex' }}>
//   <Card sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
//     <CardContent sx={{ flexGrow: 1 }}>
//       <Box display="flex" alignItems="center" mb={2}>
//         <Inventory sx={{ mr: 1 }} />
//         <Typography variant="h6">Asset Return</Typography>
//       </Box>
//       <Typography variant="body2" color="text.secondary" mb={2}>
//         Confirm that all company assets are returned.
//       </Typography>
 
//       <Chip
//         label={
//           exitData.assetReturn.completed
//             ? "Confirmed"
//             : liveAssetStatus === "Y"
//             ? "Completed"
//             : "Pending"
//         }
//         color={
//           exitData.assetReturn.completed
//             ? "success"
//             : liveAssetStatus === "Y"
//             ? "success"
//             : "warning"
//         }
//         sx={{ mb: 2 }}
//       />
//     </CardContent>
 
//     <Box sx={{ p: 2, pt: 0 }}>
//       {/* ✅ Case 1: Pending → show nothing */}
//       {liveAssetStatus === "P" && !exitData.assetReturn.completed && null}
 
//       {/* ✅ Case 2: Completed but not yet confirmed → show Confirm button */}
//       {liveAssetStatus === "Y" && !exitData.assetReturn.completed && (
//         <Button
//           variant="contained"
//           fullWidth
//           onClick={handleConfirmAssetReturn}
//           disabled={isLoading}
//           sx={{
//             backgroundColor: electricPurple,
//             "&:hover": { backgroundColor: "#7B1FA2" },
//           }}
//         >
//           Confirm
//         </Button>
//       )}
 
//       {/* ✅ Case 3: After confirmation → show disabled Confirmed button */}
//       {exitData.assetReturn.completed && (
//         <Button
//           variant="contained"
//           fullWidth
//           disabled
//           startIcon={<CheckCircle sx={{ color: electricPurple }} />}
//         >
//           Confirmed
//         </Button>
//       )}
//     </Box>
//   </Card>
// </Grid>
 
//         {/* --- MODIFIED SECTION END --- */}
 
//         {/* Card 3: Clearance Form */}
//         <Grid item xs={12} md={6} lg={4} sx={{ display: 'flex' }}>
//           <Card sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
//             <CardContent sx={{ flexGrow: 1 }}>
//               <Box display="flex" alignItems="center" mb={2}><Description sx={{ mr: 1 }} /><Typography variant="h6">Clearance Form</Typography></Box>
//               <Typography variant="body2" color="text.secondary" mb={2}>Upload the final signed clearance form.</Typography>
//               <Chip label={exitData.clearanceForm.completed ? "Completed" : "Pending"} color={getStatusColor(exitData.clearanceForm.completed)} sx={{ mb: 2 }} />
//             </CardContent>
//             <Box sx={{ p: 2, pt: 0 }}>
//               {exitData.clearanceForm.completed ? (
//                 <Button variant="contained" fullWidth disabled startIcon={<CheckCircle />}>Submitted</Button>
//               ) : (
//                 <Box>
//                   <Button variant="outlined" component="label" fullWidth disabled={!exitData.assetReturn.completed}>
//                     Choose File
//                     <input type="file" hidden onChange={(e) => setSelectedClearanceFile(e.target.files[0])} />
//                   </Button>
//                   {selectedClearanceFile && <Typography variant="caption" display="block" mt={1}>Selected: {selectedClearanceFile.name}</Typography>}
//                   <Button variant="contained" fullWidth startIcon={<UploadFile />} onClick={handleClearanceFormUploadAndSubmit} disabled={!selectedClearanceFile || isUploading || !exitData.assetReturn.completed} sx={{ mt: 1, backgroundColor: electricPurple, "&:hover": { backgroundColor: "#7B1FA2" } }}>
//                     {isUploading ? <CircularProgress size={24} color="inherit" /> : "Upload & Submit"}
//                   </Button>
//                 </Box>
//               )}
//             </Box>
//           </Card>
//         </Grid>
//       </Grid>
 
//       {/* Dialog for Exit Interview Answers */}
//       <Dialog open={openExitInterview} onClose={() => setOpenExitInterview(false)} maxWidth="md" fullWidth>
//         <DialogTitle>Exit Interview Questionnaire</DialogTitle>
//         <DialogContent>
//           {isLoading ? <Box display="flex" justifyContent="center" my={5}><CircularProgress /></Box>
//             : employeeDetails ? (
//               <Box mt={2}>
//                  <Grid container spacing={2} mb={3}>
//                   <Grid item xs={6}><Typography><strong>Employee ID:</strong> {employeeDetails.employee_id}</Typography></Grid>
//                   <Grid item xs={6}><Typography><strong>Employee Name:</strong> {employeeDetails.full_name}</Typography></Grid>
//                   <Grid item xs={6}><Typography><strong>Department:</strong> {employeeDetails.department}</Typography></Grid>
//                   <Grid item xs={6}><Typography><strong>Designation:</strong> {employeeDetails.designation}</Typography></Grid>
//                   <Grid item xs={6}><Typography><strong>Division:</strong> {employeeDetails.division || "N/A"}</Typography></Grid>
//                   <Grid item xs={6}><Typography><strong>Headquarter:</strong> {employeeDetails.headquarter}</Typography></Grid>
//                   <Grid item xs={6}><Typography><strong>Line Manager:</strong> {employeeDetails.manager_full_name}</Typography></Grid>
//                   <Grid item xs={6}><Typography><strong>Manager Designation:</strong> N/A</Typography></Grid>
//                   <Grid item xs={6}><Typography><strong>Initial employment date:</strong> {employeeDetails.date_of_joining}</Typography></Grid>
//                   <Grid item xs={6}><Typography><strong>Last date of employment:</strong> {employeeDetails.last_working_day}</Typography></Grid>
//                 </Grid>
//                 <Divider sx={{ mb: 3 }} />
//                 {interviewData.length > 0 ? interviewData.map(item => (
//                   <Box key={item.ques_id} mb={3}>
//                     <Typography variant="subtitle1" component="p" fontWeight="bold">{item.question}</Typography>
//                     <Typography variant="body1" color="text.secondary" pl={2}>- {item.answer}</Typography>
//                     {item.brief_answer && <Typography variant="body2" pl={2} mt={1}><strong>Reason:</strong> {item.brief_answer}</Typography>}
//                   </Box>
//                 )) : <Typography>No answers found.</Typography>}
//               </Box>
//             ) : <Typography my={3}>No interview data found.</Typography>}
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setOpenExitInterview(false)}>Close</Button>
//         </DialogActions>
//       </Dialog>
 
//       <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
//         <Alert severity={snackbar.severity} sx={{ width: "100%" }} onClose={() => setSnackbar({ ...snackbar, open: false })}>{snackbar.message}</Alert>
//       </Snackbar>
//     </Box>
//   )
// }
 
// export default ExitProcessHr




import { useState, useEffect, useCallback } from "react"
import {
  Box,
  Paper,
  Typography,
  Grid,
  Button,
  Card,
  CardContent,
  Chip,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Stepper,
  Step,
  StepLabel,
  Divider,
  CircularProgress,
  useMediaQuery,
  useTheme,
} from "@mui/material"
import { Assignment, Description, Inventory, CheckCircle, UploadFile, Add } from "@mui/icons-material"
import { useNavigate } from "react-router-dom"
import { useParams } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance" // Assuming your axios instance is correctly set up

const ExitProcessHr = () => {
  // --- STATE MANAGEMENT ---
  const [currentEmployee, setCurrentEmployee] = useState(null)
  const [exitData, setExitData] = useState(null)
  const [liveAssetStatus, setLiveAssetStatus] = useState(null)
  const [openExitInterview, setOpenExitInterview] = useState(false)
  const [selectedClearanceFile, setSelectedClearanceFile] = useState(null)
  const [isUploading, setIsUploading] = useState(false)
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" })
  const [employeeDetails, setEmployeeDetails] = useState(null)
  const [interviewData, setInterviewData] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()
  const { employeeId } = useParams();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));


  // --- STATIC DATA AND CONFIG ---
  const mockEmployeeData = {
    id: employeeId,
    name: "Prasad Ravindra Shinde",
    department: "Marketing",
    lastWorkingDate: "2025-08-28",
    daysRemaining: 5,
  }

  // --- THEME COLORS ---
  const primaryColor = "#8C257C";
  const primaryDarkColor = "#6d1d60";
  const secondaryColor = "#F58E35"; // Orange - not used in this component but defined as per instructions
  const textColorOnPrimary = "#FFFFFF";
  const cancelButtonColor = "#757575";

  const getStatusColor = (isCompleted) => (isCompleted ? "success" : "warning")

  // --- API INTERACTIONS ---

  const fetchInitialData = useCallback(async () => {
    setIsLoading(true)
    try {
      setCurrentEmployee(mockEmployeeData)

      const [table1Response, assetStatusResponse] = await Promise.all([
        axiosInstance.get("exit-employee-table1/"),
        axiosInstance.get(`check-asset-status/${employeeId}/`),
      ])

      setLiveAssetStatus(assetStatusResponse.data.status)
      const employeeStatus = table1Response.data.find((emp) => emp.employee_id === employeeId)

      if (employeeStatus) {
        const isCompleted = (value) => value?.trim().toUpperCase() === 'Y';
        setExitData({
          exitInterview: { status: isCompleted(employeeStatus.exit_interview_questionnaire) ? "completed" : "pending", completed: isCompleted(employeeStatus.exit_interview_questionnaire) },
          assetReturn: { status: isCompleted(employeeStatus.return_asset) ? "completed" : "pending", completed: isCompleted(employeeStatus.return_asset) },
          clearanceForm: { status: isCompleted(employeeStatus.employee_clearance_form) ? "completed" : "pending", completed: isCompleted(employeeStatus.employee_clearance_form) },
          fullFinalSettlement: { status: isCompleted(employeeStatus["f&f"]) ? "completed" : "pending", completed: isCompleted(employeeStatus["f&f"]) },
        })
      } else {
        setExitData({
            exitInterview: { status: "pending", completed: false },
            assetReturn: { status: "pending", completed: false },
            clearanceForm: { status: "pending", completed: false },
            fullFinalSettlement: { status: "pending", completed: false },
        })
      }
    } catch (error) {
      console.error("Error fetching initial data:", error)
      setSnackbar({ open: true, message: "Failed to load initial exit data.", severity: "error" })
    } finally {
      setIsLoading(false)
    }
  }, [employeeId])

  useEffect(() => {
    fetchInitialData()
  }, [fetchInitialData])

  useEffect(() => {
    if (openExitInterview && currentEmployee?.id) {
      const fetchInterviewData = async () => {
        setIsLoading(true)
        try {
          const response = await axiosInstance.get(`view_employeewise_feedback_form/?employee_id=${currentEmployee.id}`)
          if (response.data.status) {
            setEmployeeDetails(response.data.emp_data[0] || null)
            setInterviewData(response.data.data || [])
          } else { throw new Error("API returned false status.") }
        } catch (error) {
          console.error("Failed to fetch interview data:", error)
          setSnackbar({ open: true, message: "Failed to load interview data.", severity: "error" })
        } finally { setIsLoading(false) }
      }
      fetchInterviewData()
    }
  }, [openExitInterview, currentEmployee])

  // --- UI EVENT HANDLERS ---

  const handleConfirmAssetReturn = async () => {
     setIsLoading(true);
     try {
       await axiosInstance.patch(`update-exit-employee-table1/${currentEmployee.id}/`, { return_asset: "Y" });
       setExitData((prev) => ({ ...prev, assetReturn: { status: "completed", completed: true } }));
       setSnackbar({ open: true, message: "Asset return has been confirmed.", severity: "success" });
     } catch (error) {
       console.error("Error confirming asset return:", error);
       setSnackbar({ open: true, message: "Failed to confirm asset return.", severity: "error" });
     } finally {
       setIsLoading(false);
     }
  }

  const handleClearanceFormUploadAndSubmit = async () => {
    if (!selectedClearanceFile) {
      setSnackbar({ open: true, message: "Please select a file to upload.", severity: "warning" });
      return;
    }
    setIsUploading(true);
    const formData = new FormData();
    formData.append("clearance_form", selectedClearanceFile);

    try {
      await axiosInstance.patch(`Upload-Clearance-Form/${currentEmployee.id}/`, formData, { headers: { "Content-Type": "multipart/form-data" } });
      await axiosInstance.patch(`update-exit-employee-table1/${currentEmployee.id}/`, { employee_clearance_form: "Y" });
      setExitData((prev) => ({ ...prev, clearanceForm: { status: "completed", completed: true } }));
      setSnackbar({ open: true, message: "Clearance Form submitted successfully!", severity: "success" });
      setSelectedClearanceFile(null);
    } catch (error) {
      console.error("Error submitting clearance form:", error);
      setSnackbar({ open: true, message: "Failed to submit clearance form.", severity: "error" });
    } finally {
      setIsUploading(false);
    }
  }

  const handleProcessSettlement = async () => {
    setIsLoading(true);
    try {
      await axiosInstance.patch(`update-exit-employee-table1/${currentEmployee.id}/`, {
        f_and_f: "Y", // Assuming clearance form is already marked 'Y' before this is enabled
      });
      setExitData((prev) => ({ ...prev, fullFinalSettlement: { status: "completed", completed: true } }));
      setSnackbar({ open: true, message: "Full and Final Settlement has been approved!", severity: "success" });
    } catch (error) {
      console.error("Error approving settlement:", error);
      setSnackbar({ open: true, message: "Failed to approve settlement.", severity: "error" });
    } finally {
      setIsLoading(false);
    }
  }

  const handleGoToDashboard = () => navigate("/hrms/dashboardhr/EmployeeExitMain");

  // --- RENDER LOGIC ---

  const allPrerequisitesMet = exitData?.exitInterview?.completed && exitData?.assetReturn?.completed && exitData?.clearanceForm?.completed;

  if (!currentEmployee || !exitData) {
    return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
            <CircularProgress />
        </Box>
    );
  }

  return (
    <Box component={Paper} p={3}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5" sx={{ color: primaryColor, fontWeight: "bold" }}>
          Employee Exit Process
        </Typography>
        <Button
          variant="contained"
          onClick={handleGoToDashboard}
          sx={{
            backgroundColor: primaryColor,
            color: textColorOnPrimary,
            "&:hover": { backgroundColor: primaryDarkColor },
          }}
          startIcon={<Add />}
        >
         Go Back to Dashboard
        </Button>
      </Box>

      <Paper sx={{ p: 2, mb: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography><strong>ID:</strong> {currentEmployee.id}</Typography>
            <Typography><strong>Name:</strong> {currentEmployee.name}</Typography>
          </Grid>
          <Grid item xs={12} md={6} container justifyContent={isMobile ? "flex-start" : "flex-end"} alignItems="center">
            <Alert severity={currentEmployee.daysRemaining <= 5 ? "error" : "info"}>
              {currentEmployee.daysRemaining} days remaining to complete exit process
            </Alert>
          </Grid>
        </Grid>
      </Paper>

      <Paper sx={{ p: 2, mb: 2 }}>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start" flexWrap="wrap" gap={2}>
          <Box flexGrow={1}>
            <Typography variant="h6"  gutterBottom 
            sx={{ 
            color: primaryColor,
           }}>Exit Process Steps</Typography>
            <Stepper activeStep={-1} alternativeLabel={!isMobile}>
              <Step completed={exitData.exitInterview.completed}><StepLabel>Exit Interview</StepLabel></Step>
              <Step completed={exitData.assetReturn.completed}><StepLabel>Asset Return</StepLabel></Step>
              <Step completed={exitData.clearanceForm.completed}><StepLabel>Clearance Form</StepLabel></Step>
              <Step completed={exitData.fullFinalSettlement.completed}><StepLabel>Full & Final Settlement</StepLabel></Step>
            </Stepper>
          </Box>
          <Box mt={{ xs: 2, md: 0 }}>
            {allPrerequisitesMet && !exitData.fullFinalSettlement.completed && (
              <Button
                variant="contained"
                onClick={handleProcessSettlement}
                disabled={isLoading}
                sx={{
                  backgroundColor: primaryColor,
                  color: textColorOnPrimary,
                  "&:hover": { backgroundColor: primaryDarkColor },
                }}
              >
                 {isLoading ? <CircularProgress size={24} sx={{color: textColorOnPrimary}} /> : "Approve Full and Final Settlement"}
              </Button>
            )}
          </Box>
        </Box>
      </Paper>

      <Grid container spacing={2}>
        {/* Card 1: Exit Interview */}
        <Grid item xs={12} md={6} lg={4} sx={{ display: 'flex' }}>
          <Card sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flexGrow: 1 }}>
              <Box display="flex" alignItems="center" mb={2}><Assignment sx={{ mr: 1, color: primaryColor }} /><Typography variant="h6">Exit Interview</Typography></Box>
              <Typography variant="body2" color="text.secondary" mb={2}>View the employee's exit interview answers.</Typography>
              <Chip label={exitData.exitInterview.completed ? "Completed" : "Pending"} color={getStatusColor(exitData.exitInterview.completed)} sx={{ mb: 2 }} />
            </CardContent>
            <Box sx={{ p: 2, pt: 0 }}>
              <Button variant="contained" fullWidth onClick={() => setOpenExitInterview(true)} sx={{ backgroundColor: primaryColor, "&:hover": { backgroundColor: primaryDarkColor }, color: textColorOnPrimary }}>View Answers</Button>
            </Box>
          </Card>
        </Grid>

        {/* Card 2: Asset Return */}
     <Grid item xs={12} md={6} lg={4} sx={{ display: 'flex' }}>
          <Card sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flexGrow: 1 }}>
              <Box display="flex" alignItems="center" mb={2}><Inventory sx={{ mr: 1, color: primaryColor }} /><Typography variant="h6">Asset Return</Typography></Box>
              <Typography variant="body2" color="text.secondary" mb={2}>Confirm that all company assets are returned.</Typography>
              <Chip label={exitData.assetReturn.completed ? "Confirmed" : liveAssetStatus === "Y" ? "Completed" : "Pending"} color={exitData.assetReturn.completed || liveAssetStatus === 'Y' ? "success" : "warning"} sx={{ mb: 2 }} />
            </CardContent>
            <Box sx={{ p: 2, pt: 0 }}>
              {liveAssetStatus === "P" && !exitData.assetReturn.completed && <Typography variant="body2" color="text.secondary" align="center">Awaiting employee action.</Typography>}
              {liveAssetStatus === "Y" && !exitData.assetReturn.completed && (
                <Button variant="contained" fullWidth onClick={handleConfirmAssetReturn} disabled={isLoading} sx={{ backgroundColor: primaryColor, "&:hover": { backgroundColor: primaryDarkColor }, color: textColorOnPrimary, }}>
                  {isLoading ? <CircularProgress size={24} sx={{color: textColorOnPrimary}} /> : "Confirm"}
                </Button>
              )}
              {exitData.assetReturn.completed && (
                <Button variant="contained" fullWidth disabled startIcon={<CheckCircle />}>Confirmed</Button>
              )}
            </Box>
          </Card>
        </Grid>

        {/* Card 3: Clearance Form */}
        <Grid item xs={12} md={6} lg={4} sx={{ display: 'flex' }}>
          <Card sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flexGrow: 1 }}>
              <Box display="flex" alignItems="center" mb={2}><Description sx={{ mr: 1, color: primaryColor }} /><Typography variant="h6">Clearance Form</Typography></Box>
              <Typography variant="body2" color="text.secondary" mb={2}>Upload the final signed clearance form.</Typography>
              <Chip label={exitData.clearanceForm.completed ? "Completed" : "Pending"} color={getStatusColor(exitData.clearanceForm.completed)} sx={{ mb: 2 }} />
            </CardContent>
            <Box sx={{ p: 2, pt: 0 }}>
              {exitData.clearanceForm.completed ? (
                <Button variant="contained" fullWidth disabled startIcon={<CheckCircle />}>Submitted</Button>
              ) : (
                <Box>
                  <Button variant="outlined" component="label" fullWidth disabled={!exitData.assetReturn.completed}>
                    Choose File
                    <input type="file" hidden onChange={(e) => setSelectedClearanceFile(e.target.files[0])} accept=".pdf"/>
                  </Button>
                  {selectedClearanceFile && <Typography variant="caption" display="block" mt={1}>Selected: {selectedClearanceFile.name}</Typography>}
                  <Button variant="contained" fullWidth startIcon={<UploadFile />} onClick={handleClearanceFormUploadAndSubmit} disabled={!selectedClearanceFile || isUploading || !exitData.assetReturn.completed} sx={{ mt: 1, backgroundColor: primaryColor, "&:hover": { backgroundColor: primaryDarkColor }, color: textColorOnPrimary }}>
                    {isUploading ? <CircularProgress size={24} sx={{color: textColorOnPrimary}} /> : "Upload & Submit"}
                  </Button>
                </Box>
              )}
            </Box>
          </Card>
        </Grid>
      </Grid>

      {/* Dialog for Exit Interview Answers */}
      <Dialog open={openExitInterview} onClose={() => setOpenExitInterview(false)} fullWidth maxWidth="sm">
        <DialogTitle sx={{ color: primaryColor, fontWeight: 'bold' }}>Exit Interview Questionnaire</DialogTitle>
        <DialogContent>
          {isLoading ? <Box display="flex" justifyContent="center" my={5}><CircularProgress /></Box>
            : employeeDetails ? (
              <Box mt={2}>
                 <Grid container spacing={2} mb={3}>
                  <Grid item xs={12} sm={6}><Typography><strong>Employee ID:</strong> {employeeDetails.employee_id}</Typography></Grid>
                  <Grid item xs={12} sm={6}><Typography><strong>Employee Name:</strong> {employeeDetails.full_name}</Typography></Grid>
                  <Grid item xs={12} sm={6}><Typography><strong>Department:</strong> {employeeDetails.department}</Typography></Grid>
                  <Grid item xs={12} sm={6}><Typography><strong>Designation:</strong> {employeeDetails.designation}</Typography></Grid>
                  <Grid item xs={12} sm={6}><Typography><strong>Division:</strong> {employeeDetails.division || "N/A"}</Typography></Grid>
                  <Grid item xs={12} sm={6}><Typography><strong>Headquarter:</strong> {employeeDetails.headquarter}</Typography></Grid>
                  <Grid item xs={12} sm={6}><Typography><strong>Line Manager:</strong> {employeeDetails.manager_full_name}</Typography></Grid>
                  <Grid item xs={12} sm={6}><Typography><strong>Initial employment date:</strong> {employeeDetails.date_of_joining}</Typography></Grid>
                  <Grid item xs={12} sm={6}><Typography><strong>Last date of employment:</strong> {employeeDetails.last_working_day}</Typography></Grid>
                </Grid>
                <Divider sx={{ mb: 3 }} />
                {interviewData.length > 0 ? interviewData.map(item => (
                  <Box key={item.ques_id} mb={3}>
                    <Typography variant="subtitle1" component="p" fontWeight="bold">{item.question}</Typography>
                    <Typography variant="body1" color="text.secondary" pl={2}>- {item.answer}</Typography>
                    {item.brief_answer && <Typography variant="body2" pl={2} mt={1}><strong>Reason:</strong> {item.brief_answer}</Typography>}
                  </Box>
                )) : <Typography>No answers found.</Typography>}
              </Box>
            ) : <Typography my={3}>No interview data found for this employee.</Typography>}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenExitInterview(false)} sx={{ color: cancelButtonColor, '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' } }}>Close</Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
        <Alert severity={snackbar.severity} sx={{ width: "100%" }} onClose={() => setSnackbar({ ...snackbar, open: false })}>{snackbar.message}</Alert>
      </Snackbar>
    </Box>
  )
}

export default ExitProcessHr;