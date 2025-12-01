

// import { useState, useEffect } from "react"
// import {
//   Box,
//   Paper,
//   Typography,
//   Grid,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   TextField,
//   Button,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Chip,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Alert,
//   Snackbar,
//   CircularProgress,
//   Tabs,
//   Tab,
// } from "@mui/material"
// import { DatePicker } from "@mui/x-date-pickers/DatePicker"
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
// import Swal from "sweetalert2"

// const TerminationDashboardHr = () => {
//   const [selectedEmployee, setSelectedEmployee] = useState("")
//   const [terminationDate, setTerminationDate] = useState(null)
//   const [terminationReason, setTerminationReason] = useState("")
//   const [initiatePoint, setInitiatePoint] = useState("")
//   const [exitType, setExitType] = useState("")
//   const [employees, setEmployees] = useState([])
//   const [terminationRecords, setTerminationRecords] = useState([])
//   const [terminatedEmployees, setTerminatedEmployees] = useState([])
//   const [exitTypes, setExitTypes] = useState([])
//   const [openDialog, setOpenDialog] = useState(false)
//   const [loading, setLoading] = useState(true)
//   const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" })
//   const [tabIndex, setTabIndex] = useState(0)

//   const initiatePoints = [
//     "HR Review (confirmation)",
//     "PIP",
//     "Abscond Follow-up (15+ days incompleted)",
//   ]

//   const fetchTerminations = async () => {
//     setLoading(true)
//     try {
//       const response = await fetch("https://tdtlworld.com/hrms-backend/get-terminations/")
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`)
//       }
//       const data = await response.json()
//       const formattedData = data.map((record) => ({
//         id: record.termination_id,
//         employeeId: record.employee_id || "N/A",
//         employeeName: record.employee_name,
//         exitType: record.exit_type
//           ? record.exit_type.charAt(0).toUpperCase() + record.exit_type.slice(1)
//           : "N/A",
//         terminationDate: record.date_of_termination,
//         terminationReason: record.reason_of_termination,
//         mailStatus: record.mail_status === "Send" ? "Sent" : "Pending",
//         accountStatus: record.mail_status === "Send" ? "Inactive" : "Active",
//       }))
//       setTerminationRecords(formattedData)
//     } catch (error) {
//       console.error("Could not fetch terminations:", error)
//       setSnackbar({
//         open: true,
//         message: "Failed to fetch termination records.",
//         severity: "error",
//       })
//     } finally {
//       setLoading(false)
//     }
//   }

//   useEffect(() => {
//     fetchTerminations()
//   }, [])

//   useEffect(() => {
//     const sentRecords = terminationRecords.filter((record) => record.mailStatus === "Sent")
//     setTerminatedEmployees(sentRecords)
//   }, [terminationRecords])

//   useEffect(() => {
//     const fetchEmployees = async (url) => {
//       try {
//         const response = await fetch(url)
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`)
//         }
//         const data = await response.json()
//         const formattedData = data.map((emp) => ({
//           id: emp.id || emp.employee_id,
//           name: emp.employee_name,
//           status: emp.status || "Active",
//         }))
//         setEmployees(formattedData)
//       } catch (error) {
//         console.error("Could not fetch employees:", error)
//         setSnackbar({
//           open: true,
//           message: "Failed to fetch employee list.",
//           severity: "error",
//         })
//         setEmployees([])
//       }
//     }

//     setSelectedEmployee("")

//     if (initiatePoint === "HR Review (confirmation)") {
//       fetchEmployees("https://tdtlworld.com/hrms-backend/confirmation-employees-dropdown/")
//     } else if (initiatePoint === "Abscond Follow-up (15+ days incompleted)") {
//       fetchEmployees("https://tdtlworld.com/hrms-backend/resigned-employees-dropdown/")
//     } else {
//       setEmployees([])
//     }
//   }, [initiatePoint])

//   useEffect(() => {
//     const fetchExitTypes = async () => {
//       try {
//         const response = await fetch("https://tdtlworld.com/hrms-backend/api/exit-type/")
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`)
//         }
//         const data = await response.json()
//         setExitTypes(data)
//       } catch (error) {
//         console.error("Could not fetch exit types:", error)
//         setSnackbar({
//           open: true,
//           message: "Failed to fetch exit types.",
//           severity: "error",
//         })
//       }
//     }

//     if (openDialog) {
//       fetchExitTypes()
//     }
//   }, [openDialog])

//   const handleSubmitTermination = async () => {
//     if (!selectedEmployee || !exitType || !terminationDate || !terminationReason) {
//       Swal.fire({
//         icon: "error",
//         title: "Incomplete Form",
//         text: "Please fill all required fields before submitting.",
//       })
//       return
//     }

//     const payload = {
//       employee_id: selectedEmployee,
//       exit_type: Number(exitType),
//       date_of_termination: terminationDate.toISOString().split("T")[0],
//       reason_of_termination: terminationReason,
//     }

//     try {
//       const response = await fetch("https://tdtlworld.com/hrms-backend/post-terminations/", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(payload),
//       })

//       const data = await response.json()

//       if (!response.ok) {
//         throw new Error(data.message || "Something went wrong!")
//       }

//       Swal.fire({
//         icon: "success",
//         title: "Success!",
//         text: data.message,
//       })

//       fetchTerminations()
//       setOpenDialog(false)
//       setSelectedEmployee("")
//       setTerminationDate(null)
//       setTerminationReason("")
//       setInitiatePoint("")
//       setExitType("")
//     } catch (error) {
//       Swal.fire({
//         icon: "error",
//         title: "Oops...",
//         text: error.message,
//       })
//     }
//   }

//   const handleSendTerminationMail = async (recordId) => {
//     try {
//       const response = await fetch(
//         `https://tdtlworld.com/hrms-backend/update-terminations/${recordId}/`,
//         {
//           method: "PATCH",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ action: "send" }),
//         }
//       )

//       if (!response.ok) {
//         throw new Error(`API call failed with status: ${response.status}`)
//       }

//       const updatedRecords = terminationRecords.map((record) =>
//         record.id === recordId
//           ? { ...record, mailStatus: "Sent", accountStatus: "Inactive" }
//           : record
//       )
//       setTerminationRecords(updatedRecords)
//       setSnackbar({
//         open: true,
//         message: "Termination email sent successfully and status updated.",
//         severity: "success",
//       })
//     } catch (error) {
//       console.error("Failed to send termination mail:", error)
//       setSnackbar({
//         open: true,
//         message: "Failed to send termination email. Please try again.",
//         severity: "error",
//       })
//     }
//   }

//   const getStatusColor = (status) => {
//     switch (status) {
//       case "Sent":
//         return "success"
//       case "Pending":
//         return "warning"
//       case "Inactive":
//         return "error"
//       case "Active":
//         return "success"
//       default:
//         return "default"
//     }
//   }

//   const getExitTypeColor = (exitType) => {
//     switch (exitType) {
//       case "Termination":
//         return "error"
//       case "Resignation":
//         return "warning"
//       case "Retirement":
//         return "info"
//       default:
//         return "default"
//     }
//   }

//   const handleTabChange = (event, newValue) => {
//     setTabIndex(newValue)
//   }

//   const terminationInitiatedRecords = terminationRecords.filter(
//     (record) => record.mailStatus !== "Sent"
//   )

//   return (
//     <LocalizationProvider dateAdapter={AdapterDateFns}>
//       <Box>
//         <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
//           <Typography variant="h4" gutterBottom>
//             Termination Dashboard
//           </Typography>
//           <Button variant="contained" color="error" onClick={() => setOpenDialog(true)}>
//             Initiate Termination
//           </Button>
//         </Box>

//         <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
//           <Tabs value={tabIndex} onChange={handleTabChange} aria-label="termination tabs">
//             <Tab label="Termination Initiated" />
//             <Tab label="Terminated Employees" />
//           </Tabs>
//         </Box>

//         <Grid container spacing={3} sx={{ mt: 1 }}>
//           <Grid item xs={12}>
//             {tabIndex === 0 && (
//               <Paper sx={{ p: 3 }}>
//                 <Typography variant="h5" gutterBottom>
//                   Termination Initiated
//                 </Typography>
//                 {loading ? (
//                   <Box
//                     sx={{
//                       display: "flex",
//                       justifyContent: "center",
//                       alignItems: "center",
//                       minHeight: "300px",
//                     }}
//                   >
//                     <CircularProgress />
//                   </Box>
//                 ) : (
//                   <TableContainer>
//                     <Table>
//                       <TableHead>
//                         <TableRow>
//                           <TableCell>Sr No.</TableCell>
//                           <TableCell>Employee Name</TableCell>
//                           <TableCell>Exit Type</TableCell>
//                           <TableCell>Date of Termination</TableCell>
//                           <TableCell>Reason of Termination</TableCell>
//                           <TableCell>Account Status</TableCell>
//                           <TableCell>Mail Status</TableCell>
//                           <TableCell>Actions</TableCell>
//                         </TableRow>
//                       </TableHead>
//                       <TableBody>
//                         {terminationInitiatedRecords.map((record, index) => (
//                           <TableRow key={record.id}>
//                             <TableCell>{index + 1}</TableCell>
//                             <TableCell>{record.employeeName}</TableCell>
//                             <TableCell>
//                               <Chip
//                                 label={record.exitType}
//                                 color={getExitTypeColor(record.exitType)}
//                                 size="small"
//                               />
//                             </TableCell>
//                             <TableCell>{record.terminationDate}</TableCell>
//                             <TableCell>{record.terminationReason}</TableCell>
//                             <TableCell>
//                               <Chip
//                                 label={record.accountStatus}
//                                 color={getStatusColor(record.accountStatus)}
//                                 size="small"
//                               />
//                             </TableCell>
//                             <TableCell>
//                               <Chip
//                                 label={record.mailStatus}
//                                 color={getStatusColor(record.mailStatus)}
//                                 size="small"
//                               />
//                             </TableCell>
//                             <TableCell>
//                               {record.mailStatus === "Pending" && (
//                                 <Button
//                                   size="small"
//                                   variant="outlined"
//                                   onClick={() => handleSendTerminationMail(record.id)}
//                                 >
//                                   Send Termination Mail
//                                 </Button>
//                               )}
//                             </TableCell>
//                           </TableRow>
//                         ))}
//                       </TableBody>
//                     </Table>
//                   </TableContainer>
//                 )}
//               </Paper>
//             )}
//             {tabIndex === 1 && (
//               <Paper sx={{ p: 3 }}>
//                 <Typography variant="h5" gutterBottom>
//                   Terminated Employees
//                 </Typography>
//                 <TableContainer>
//                   <Table>
//                     <TableHead>
//                       <TableRow>
//                         <TableCell>Sr No.</TableCell>
//                         <TableCell>Employee Name</TableCell>
//                         <TableCell>Exit Type</TableCell>
//                         <TableCell>Date of Termination</TableCell>
//                         <TableCell>Reason of Termination</TableCell>
//                         <TableCell>Account Status</TableCell>
//                         <TableCell>Mail Status</TableCell>
//                       </TableRow>
//                     </TableHead>
//                     <TableBody>
//                       {terminatedEmployees.map((record, index) => (
//                         <TableRow key={record.id}>
//                           <TableCell>{index + 1}</TableCell>
//                           <TableCell>{record.employeeName}</TableCell>
//                           <TableCell>
//                             <Chip
//                               label={record.exitType}
//                               color={getExitTypeColor(record.exitType)}
//                               size="small"
//                             />
//                           </TableCell>
//                           <TableCell>{record.terminationDate}</TableCell>
//                           <TableCell>{record.terminationReason}</TableCell>
//                           <TableCell>
//                             <Chip
//                               label={record.accountStatus}
//                               color={getStatusColor(record.accountStatus)}
//                               size="small"
//                             />
//                           </TableCell>
//                           <TableCell>
//                             <Chip
//                               label={record.mailStatus}
//                               color={getStatusColor(record.mailStatus)}
//                               size="small"
//                             />
//                           </TableCell>
//                         </TableRow>
//                       ))}
//                     </TableBody>
//                   </Table>
//                 </TableContainer>
//               </Paper>
//             )}
//           </Grid>
//         </Grid>

//         <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
//           <DialogTitle>Initiate Employee Termination</DialogTitle>
//           <DialogContent>
//             <Grid container spacing={2} sx={{ mt: 1 }}>
//               <Grid item xs={12}>
//                 <FormControl fullWidth>
//                   <InputLabel>Initiate Point</InputLabel>
//                   <Select
//                     value={initiatePoint}
//                     onChange={(e) => setInitiatePoint(e.target.value)}
//                     label="Initiate Point"
//                   >
//                     {initiatePoints.map((point) => (
//                       <MenuItem key={point} value={point}>
//                         {point}
//                       </MenuItem>
//                     ))}
//                   </Select>
//                 </FormControl>
//               </Grid>
//               <Grid item xs={12} md={6}>
//                 <FormControl fullWidth>
//                   <InputLabel>Select Employee</InputLabel>
//                   <Select
//                     value={selectedEmployee}
//                     onChange={(e) => setSelectedEmployee(e.target.value)}
//                     label="Select Employee"
//                     disabled={!employees.length}
//                   >
//                     {employees.map((employee) => (
//                       <MenuItem key={employee.id} value={employee.id}>
//                         {employee.name} ({employee.status})
//                       </MenuItem>
//                     ))}
//                   </Select>
//                 </FormControl>
//               </Grid>
//               <Grid item xs={12} md={6}>
//                 <FormControl fullWidth>
//                   <InputLabel>Exit Type</InputLabel>
//                   <Select
//                     value={exitType}
//                     onChange={(e) => setExitType(e.target.value)}
//                     label="Exit Type"
//                     disabled={!exitTypes.length}
//                   >
//                     {exitTypes.map((type) => (
//                       <MenuItem key={type.value} value={String(type.value)}>
//                         {type.label}
//                       </MenuItem>
//                     ))}
//                   </Select>
//                 </FormControl>
//               </Grid>
//               <Grid item xs={12} md={6}>
//                 <DatePicker
//                   label="Date of Termination"
//                   value={terminationDate}
//                   onChange={(newValue) => setTerminationDate(newValue)}
//                   renderInput={(params) => <TextField {...params} fullWidth />}
//                 />
//               </Grid>
//               <Grid item xs={12} md={6}>
//                 <TextField
//                   label="Reason of Termination"
//                   fullWidth
//                   value={terminationReason}
//                   onChange={(e) => setTerminationReason(e.target.value)}
//                 />
//               </Grid>
//             </Grid>
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
//             <Button onClick={handleSubmitTermination} variant="contained" color="error">
//               Terminate Employee
//             </Button>
//           </DialogActions>
//         </Dialog>

//         <Snackbar
//           open={snackbar.open}
//           autoHideDuration={6000}
//           onClose={() => setSnackbar({ ...snackbar, open: false })}
//         >
//           <Alert severity={snackbar.severity} sx={{ width: "100%" }}>
//             {snackbar.message}
//           </Alert>
//         </Snackbar>
//       </Box>
//     </LocalizationProvider>
//   )
// }

// export default TerminationDashboardHr













// import { useState, useEffect } from "react"
// import {
//   Box,
//   Paper,
//   Typography,
//   Grid,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   TextField,
//   Button,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Chip,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Alert,
//   Snackbar,
//   CircularProgress,
//   Tabs,
//   Tab,
// } from "@mui/material"
// import { DatePicker } from "@mui/x-date-pickers/DatePicker"
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
// import Swal from "sweetalert2"

// const TerminationDashboardHr = () => {
//   const [selectedEmployee, setSelectedEmployee] = useState("")
//   const [terminationDate, setTerminationDate] = useState(null)
//   const [terminationReason, setTerminationReason] = useState("")
//   const [initiatePoint, setInitiatePoint] = useState("")
//   const [exitType, setExitType] = useState("")
//   const [employees, setEmployees] = useState([])
//   const [terminationRecords, setTerminationRecords] = useState([])
//   const [terminatedEmployees, setTerminatedEmployees] = useState([])
//   const [exitTypes, setExitTypes] = useState([])
//   const [openDialog, setOpenDialog] = useState(false)
//   const [loading, setLoading] = useState(true)
//   const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" })
//   const [tabIndex, setTabIndex] = useState(0)

//   const initiatePoints = [
//     "HR Review (confirmation)",
//     "PIP",
//     "Abscond Follow-up (15+ days incompleted)",
//   ]

//   const fetchTerminations = async () => {
//     setLoading(true)
//     try {
//       const response = await fetch("https://tdtlworld.com/hrms-backend/get-terminations/")
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`)
//       }
//       const data = await response.json()
//       const formattedData = data.map((record) => ({
//         id: record.termination_id,
//         employeeId: record.employee_id || "N/A",
//         employeeName: record.employee_name,
//         exitType: record.exit_type
//           ? record.exit_type.charAt(0).toUpperCase() + record.exit_type.slice(1)
//           : "N/A",
//         terminationDate: record.date_of_termination,
//         terminationReason: record.reason_of_termination,
//         mailStatus: record.mail_status === "Send" ? "Sent" : "Pending",
//         accountStatus: record.mail_status === "Send" ? "Inactive" : "Active",
//       }))
//       setTerminationRecords(formattedData)
//     } catch (error) {
//       console.error("Could not fetch terminations:", error)
//       setSnackbar({
//         open: true,
//         message: "Failed to fetch termination records.",
//         severity: "error",
//       })
//     } finally {
//       setLoading(false)
//     }
//   }

//   useEffect(() => {
//     fetchTerminations()
//   }, [])

//   useEffect(() => {
//     const sentRecords = terminationRecords.filter((record) => record.mailStatus === "Sent")
//     setTerminatedEmployees(sentRecords)
//   }, [terminationRecords])

//   useEffect(() => {
//     const fetchEmployees = async (url) => {
//       try {
//         const response = await fetch(url)
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`)
//         }
//         const data = await response.json()
//         const formattedData = data.map((emp) => ({
//           id: emp.id || emp.employee_id,
//           name: emp.employee_name,
//           status: emp.status || "Active",
//         }))
//         setEmployees(formattedData)
//       } catch (error) {
//         console.error("Could not fetch employees:", error)
//         setSnackbar({
//           open: true,
//           message: "Failed to fetch employee list.",
//           severity: "error",
//         })
//         setEmployees([])
//       }
//     }

//     setSelectedEmployee("")

//     if (initiatePoint === "HR Review (confirmation)") {
//       fetchEmployees("https://tdtlworld.com/hrms-backend/confirmation-employees-dropdown/")
//     } else if (initiatePoint === "Abscond Follow-up (15+ days incompleted)") {
//       fetchEmployees("https://tdtlworld.com/hrms-backend/resigned-employees-dropdown/")
//     } else {
//       setEmployees([])
//     }
//   }, [initiatePoint])

//   useEffect(() => {
//     const fetchExitTypes = async () => {
//       try {
//         const response = await fetch("https://tdtlworld.com/hrms-backend/api/exit-type/")
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`)
//         }
//         const data = await response.json()
//         setExitTypes(data)
//       } catch (error) {
//         console.error("Could not fetch exit types:", error)
//         setSnackbar({
//           open: true,
//           message: "Failed to fetch exit types.",
//           severity: "error",
//         })
//       }
//     }

//     if (openDialog) {
//       fetchExitTypes()
//     }
//   }, [openDialog])

//   const handleSubmitTermination = async () => {
//     if (!selectedEmployee || !exitType || !terminationDate || !terminationReason) {
//       Swal.fire({
//         icon: "error",
//         title: "Incomplete Form",
//         text: "Please fill all required fields before submitting.",
//       })
//       return
//     }

//     const payload = {
//       employee_id: selectedEmployee,
//       exit_type: Number(exitType),
//       date_of_termination: terminationDate.toISOString().split("T")[0],
//       reason_of_termination: terminationReason,
//     }

//     try {
//       const response = await fetch("https://tdtlworld.com/hrms-backend/post-terminations/", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(payload),
//       })

//       const data = await response.json()

//       if (!response.ok) {
//         throw new Error(data.message || "Something went wrong!")
//       }

//       Swal.fire({
//         icon: "success",
//         title: "Success!",
//         text: data.message,
//       })

//       fetchTerminations()
//       setOpenDialog(false)
//       setSelectedEmployee("")
//       setTerminationDate(null)
//       setTerminationReason("")
//       setInitiatePoint("")
//       setExitType("")
//     } catch (error) {
//       Swal.fire({
//         icon: "error",
//         title: "Oops...",
//         text: error.message,
//       })
//     }
//   }

//   const handleSendTerminationMail = async (recordId) => {
//     try {
//       const response = await fetch(
//         `https://tdtlworld.com/hrms-backend/update-terminations/${recordId}/`,
//         {
//           method: "PATCH",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ action: "send" }),
//         }
//       )

//       if (!response.ok) {
//         throw new Error(`API call failed with status: ${response.status}`)
//       }

//       const updatedRecords = terminationRecords.map((record) =>
//         record.id === recordId
//           ? { ...record, mailStatus: "Sent", accountStatus: "Inactive" }
//           : record
//       )
//       setTerminationRecords(updatedRecords)
//       setSnackbar({
//         open: true,
//         message: "Termination email sent successfully and status updated.",
//         severity: "success",
//       })
//     } catch (error) {
//       console.error("Failed to send termination mail:", error)
//       setSnackbar({
//         open: true,
//         message: "Failed to send termination email. Please try again.",
//         severity: "error",
//       })
//     }
//   }

//   const getStatusColor = (status) => {
//     switch (status) {
//       case "Sent":
//         return "success"
//       case "Pending":
//         return "warning"
//       case "Inactive":
//         return "error"
//       case "Active":
//         return "success"
//       default:
//         return "default"
//     }
//   }

//   const getExitTypeColor = (exitType) => {
//     switch (exitType) {
//       case "Termination":
//         return "error"
//       case "Resignation":
//         return "warning"
//       case "Retirement":
//         return "info"
//       default:
//         return "default"
//     }
//   }

//   const handleTabChange = (event, newValue) => {
//     setTabIndex(newValue)
//   }

//   const terminationInitiatedRecords = terminationRecords.filter(
//     (record) => record.mailStatus !== "Sent"
//   )

//   return (
//     <LocalizationProvider dateAdapter={AdapterDateFns}>
//       <Box>
//         <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
//           <Typography variant="h4" gutterBottom>
//             Termination Dashboard
//           </Typography>
//           <Button variant="contained" color="error" onClick={() => setOpenDialog(true)}>
//             Initiate Termination
//           </Button>
//         </Box>

//         <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
//           <Tabs value={tabIndex} onChange={handleTabChange} aria-label="termination tabs">
//             <Tab label="Termination Initiated" />
//             <Tab label="Terminated Employees" />
//           </Tabs>
//         </Box>

//         <Grid container spacing={3} sx={{ mt: 1 }}>
//           <Grid item xs={12}>
//             {tabIndex === 0 && (
//               <Paper sx={{ p: 3 }}>
//                 <Typography variant="h5" gutterBottom>
//                   Termination Initiated
//                 </Typography>
//                 {loading ? (
//                   <Box
//                     sx={{
//                       display: "flex",
//                       justifyContent: "center",
//                       alignItems: "center",
//                       minHeight: "300px",
//                     }}
//                   >
//                     <CircularProgress />
//                   </Box>
//                 ) : (
//                   <TableContainer>
//                     <Table>
//                       <TableHead>
//                         <TableRow>
//                           <TableCell>Sr No.</TableCell>
//                           <TableCell>Employee Name</TableCell>
//                           <TableCell>Exit Type</TableCell>
//                           <TableCell>Date of Termination</TableCell>
//                           <TableCell>Reason of Termination</TableCell>
//                           <TableCell>Account Status</TableCell>
//                           <TableCell>Mail Status</TableCell>
//                           <TableCell>Actions</TableCell>
//                         </TableRow>
//                       </TableHead>
//                       <TableBody>
//                         {terminationInitiatedRecords.map((record, index) => (
//                           <TableRow key={record.id}>
//                             <TableCell>{index + 1}</TableCell>
//                             <TableCell>{record.employeeName}</TableCell>
//                             <TableCell>
//                               <Chip
//                                 label={record.exitType}
//                                 color={getExitTypeColor(record.exitType)}
//                                 size="small"
//                               />
//                             </TableCell>
//                             <TableCell>{record.terminationDate}</TableCell>
//                             <TableCell>{record.terminationReason}</TableCell>
//                             <TableCell>
//                               <Chip
//                                 label={record.accountStatus}
//                                 color={getStatusColor(record.accountStatus)}
//                                 size="small"
//                               />
//                             </TableCell>
//                             <TableCell>
//                               <Chip
//                                 label={record.mailStatus}
//                                 color={getStatusColor(record.mailStatus)}
//                                 size="small"
//                               />
//                             </TableCell>
//                             <TableCell>
//                               {record.mailStatus === "Pending" && (
//                                 <Button
//                                   size="small"
//                                   variant="outlined"
//                                   onClick={() => handleSendTerminationMail(record.id)}
//                                 >
//                                   Send Termination Mail
//                                 </Button>
//                               )}
//                             </TableCell>
//                           </TableRow>
//                         ))}
//                       </TableBody>
//                     </Table>
//                   </TableContainer>
//                 )}
//               </Paper>
//             )}
//             {tabIndex === 1 && (
//               <Paper sx={{ p: 3 }}>
//                 <Typography variant="h5" gutterBottom>
//                   Terminated Employees
//                 </Typography>
//                 <TableContainer>
//                   <Table>
//                     <TableHead>
//                       <TableRow>
//                         <TableCell>Sr No.</TableCell>
//                         <TableCell>Employee Name</TableCell>
//                         <TableCell>Exit Type</TableCell>
//                         <TableCell>Date of Termination</TableCell>
//                         <TableCell>Reason of Termination</TableCell>
//                         <TableCell>Account Status</TableCell>
//                         <TableCell>Mail Status</TableCell>
//                       </TableRow>
//                     </TableHead>
//                     <TableBody>
//                       {terminatedEmployees.map((record, index) => (
//                         <TableRow key={record.id}>
//                           <TableCell>{index + 1}</TableCell>
//                           <TableCell>{record.employeeName}</TableCell>
//                           <TableCell>
//                             <Chip
//                               label={record.exitType}
//                               color={getExitTypeColor(record.exitType)}
//                               size="small"
//                             />
//                           </TableCell>
//                           <TableCell>{record.terminationDate}</TableCell>
//                           <TableCell>{record.terminationReason}</TableCell>
//                           <TableCell>
//                             <Chip
//                               label={record.accountStatus}
//                               color={getStatusColor(record.accountStatus)}
//                               size="small"
//                             />
//                           </TableCell>
//                           <TableCell>
//                             <Chip
//                               label={record.mailStatus}
//                               color={getStatusColor(record.mailStatus)}
//                               size="small"
//                             />
//                           </TableCell>
//                         </TableRow>
//                       ))}
//                     </TableBody>
//                   </Table>
//                 </TableContainer>
//               </Paper>
//             )}
//           </Grid>
//         </Grid>

//         <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
//           <DialogTitle>Initiate Employee Termination</DialogTitle>
//           <DialogContent>
//             <Grid container spacing={2} sx={{ mt: 1 }}>
//               <Grid item xs={12}>
//                 <FormControl fullWidth>
//                   <InputLabel>Initiate Point</InputLabel>
//                   <Select
//                     value={initiatePoint}
//                     onChange={(e) => setInitiatePoint(e.target.value)}
//                     label="Initiate Point"
//                   >
//                     {initiatePoints.map((point) => (
//                       <MenuItem key={point} value={point}>
//                         {point}
//                       </MenuItem>
//                     ))}
//                   </Select>
//                 </FormControl>
//               </Grid>
//               <Grid item xs={12} md={6}>
//                 <FormControl fullWidth>
//                   <InputLabel>Select Employee</InputLabel>
//                   <Select
//                     value={selectedEmployee}
//                     onChange={(e) => setSelectedEmployee(e.target.value)}
//                     label="Select Employee"
//                     disabled={!employees.length}
//                   >
//                     {employees.map((employee) => (
//                       <MenuItem key={employee.id} value={employee.id}>
//                         {employee.name} ({employee.status})
//                       </MenuItem>
//                     ))}
//                   </Select>
//                 </FormControl>
//               </Grid>
//               <Grid item xs={12} md={6}>
//                 <FormControl fullWidth>
//                   <InputLabel>Exit Type</InputLabel>
//                   <Select
//                     value={exitType}
//                     onChange={(e) => setExitType(e.target.value)}
//                     label="Exit Type"
//                     disabled={!exitTypes.length}
//                   >
//                     {exitTypes.map((type) => (
//                       <MenuItem key={type.value} value={String(type.value)}>
//                         {type.label}
//                       </MenuItem>
//                     ))}
//                   </Select>
//                 </FormControl>
//               </Grid>
//               <Grid item xs={12} md={6}>
//                 <DatePicker
//                   label="Date of Termination"
//                   value={terminationDate}
//                   onChange={(newValue) => setTerminationDate(newValue)}
//                   renderInput={(params) => <TextField {...params} fullWidth />}
//                 />
//               </Grid>
//               <Grid item xs={12} md={6}>
//                 <TextField
//                   label="Reason of Termination"
//                   fullWidth
//                   value={terminationReason}
//                   onChange={(e) => setTerminationReason(e.target.value)}
//                 />
//               </Grid>
//             </Grid>
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
//             <Button onClick={handleSubmitTermination} variant="contained" color="error">
//               Terminate Employee
//             </Button>
//           </DialogActions>
//         </Dialog>

//         <Snackbar
//           open={snackbar.open}
//           autoHideDuration={6000}
//           onClose={() => setSnackbar({ ...snackbar, open: false })}
//         >
//           <Alert severity={snackbar.severity} sx={{ width: "100%" }}>
//             {snackbar.message}
//           </Alert>
//         </Snackbar>
//       </Box>
//     </LocalizationProvider>
//   )
// }

// export default TerminationDashboardHr













// import { useState, useEffect } from "react";
// import {
//   Box,
//   Paper,
//   Typography,
//   Grid,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   TextField,
//   Button,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Chip,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Alert,
//   Snackbar,
//   CircularProgress,
//   Tabs,
//   Tab,
//   useTheme,
//   useMediaQuery,
//   InputAdornment,
//   Skeleton,
//   Pagination,
//   IconButton,
// } from "@mui/material";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
// import { Add as AddIcon, Close as CloseIcon, Search as SearchIcon } from '@mui/icons-material';
// import axiosInstance from "../utils/axiosInstance";
// import Swal from "sweetalert2";

// const TabPanel = (props) => {
//   const { children, value, index, ...other } = props;
//   return (
//     <div role="tabpanel" hidden={value !== index} {...other}>
//       {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
//     </div>
//   );
// };

// const TerminationDashboardHr = () => {
//   const muiTheme = useTheme();
//   const isMobile = useMediaQuery(muiTheme.breakpoints.down("sm"));

//   // --- THEME & STYLING ---
//   const themePurple = '#8C257C';
//   const themePurpleHover = '#6d1d60';
//   const themeOrange = '#F58E35';

//   const purpleButtonSx = {
//     backgroundColor: themePurple,
//     color: 'white',
//     '&:hover': {
//       backgroundColor: themePurpleHover,
//     },
//   };

//   const cancelButtonSx = {
//     color: '#757575',
//     '&:hover': {
//       backgroundColor: 'rgba(0, 0, 0, 0.04)'
//     }
//   };
  
//   const terminateButtonSx = {
//     backgroundColor: '#d32f2f',
//     color: 'white',
//     '&:hover': {
//         backgroundColor: '#b71c1c'
//     }
//   };

//   // --- STATE MANAGEMENT ---
//   const [selectedEmployee, setSelectedEmployee] = useState("");
//   const [terminationDate, setTerminationDate] = useState(null);
//   const [terminationReason, setTerminationReason] = useState("");
//   const [initiatePoint, setInitiatePoint] = useState("");
//   const [exitType, setExitType] = useState("");
//   const [employees, setEmployees] = useState([]);
//   const [terminationRecords, setTerminationRecords] = useState([]);
//   const [filteredRecords, setFilteredRecords] = useState([]);
//   const [exitTypes, setExitTypes] = useState([]);
//   const [openDialog, setOpenDialog] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
//   const [tabIndex, setTabIndex] = useState(0);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);

//   const initiatePoints = [
//     "HR Review (confirmation)",
//     "PIP",
//     "Abscond Follow-up (15+ days incompleted)",
//   ];

//   const fetchTerminations = async () => {
//     setLoading(true);
//     try {
//       const response = await axiosInstance.get("get-terminations/");
//       const formattedData = response.data.map((record) => ({
//         id: record.termination_id,
//         employeeId: record.employee_id || "N/A",
//         employeeName: record.employee_name,
//         exitType: record.exit_type
//           ? record.exit_type.charAt(0).toUpperCase() + record.exit_type.slice(1)
//           : "N/A",
//         terminationDate: record.date_of_termination,
//         terminationReason: record.reason_of_termination,
//         mailStatus: record.mail_status === "Send" ? "Sent" : "Pending",
//         accountStatus: record.mail_status === "Send" ? "Inactive" : "Active",
//       }));
//       setTerminationRecords(formattedData);
//     } catch (error) {
//       console.error("Could not fetch terminations:", error);
//       setSnackbar({ open: true, message: "Failed to fetch termination records.", severity: "error" });
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchTerminations();
//   }, []);

//   useEffect(() => {
//     const dataToFilter = tabIndex === 0
//       ? terminationRecords.filter(r => r.mailStatus !== "Sent")
//       : terminationRecords.filter(r => r.mailStatus === "Sent");

//     const lowercasedQuery = searchQuery.toLowerCase();
//     const filtered = dataToFilter.filter(record =>
//       record.employeeName?.toLowerCase().includes(lowercasedQuery) ||
//       record.exitType?.toLowerCase().includes(lowercasedQuery)
//     );
//     setFilteredRecords(filtered);
//     setPage(0);
//   }, [searchQuery, terminationRecords, tabIndex]);

//   useEffect(() => {
//     const fetchEmployees = async (endpoint) => {
//       try {
//         const response = await axiosInstance.get(endpoint);
//         const formattedData = response.data.map((emp) => ({
//           id: emp.id || emp.employee_id,
//           name: emp.employee_name,
//           status: emp.status || "Active",
//         }));
//         setEmployees(formattedData);
//       } catch (error) {
//         console.error("Could not fetch employees:", error);
//         setSnackbar({ open: true, message: "Failed to fetch employee list.", severity: "error" });
//         setEmployees([]);
//       }
//     };

//     setSelectedEmployee("");
//     if (initiatePoint === "HR Review (confirmation)") {
//       fetchEmployees("confirmation-employees-dropdown/");
//     } else if (initiatePoint === "Abscond Follow-up (15+ days incompleted)") {
//       fetchEmployees("resigned-employees-dropdown/");
//     } else {
//       setEmployees([]);
//     }
//   }, [initiatePoint]);

//   useEffect(() => {
//     const fetchExitTypes = async () => {
//       try {
//         const response = await axiosInstance.get("api/exit-type/");
//         setExitTypes(response.data);
//       } catch (error) {
//         console.error("Could not fetch exit types:", error);
//         setSnackbar({ open: true, message: "Failed to fetch exit types.", severity: "error" });
//       }
//     };
//     if (openDialog) {
//       fetchExitTypes();
//     }
//   }, [openDialog]);

//   const handleSubmitTermination = async () => {
//     if (!selectedEmployee || !exitType || !terminationDate || !terminationReason) {
//       Swal.fire({ icon: "error", title: "Incomplete Form", text: "Please fill all required fields." });
//       return;
//     }
//     setIsSubmitting(true);
//     const payload = {
//       employee_id: selectedEmployee,
//       exit_type: Number(exitType),
//       date_of_termination: terminationDate.toISOString().split("T")[0],
//       reason_of_termination: terminationReason,
//     };
//     try {
//       const response = await axiosInstance.post("post-terminations/", payload);
//       Swal.fire({ icon: "success", title: "Success!", text: response.data.message });
//       fetchTerminations();
//       setOpenDialog(false);
//       setSelectedEmployee("");
//       setTerminationDate(null);
//       setTerminationReason("");
//       setInitiatePoint("");
//       setExitType("");
//     } catch (error) {
//       Swal.fire({ icon: "error", title: "Oops...", text: error.response?.data?.message || "Something went wrong!" });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };
  
//   const handleSendTerminationMail = async (recordId) => {
//     try {
//       await axiosInstance.patch(`update-terminations/${recordId}/`, { action: "send" });
//       const updatedRecords = terminationRecords.map((record) =>
//         record.id === recordId ? { ...record, mailStatus: "Sent", accountStatus: "Inactive" } : record
//       );
//       setTerminationRecords(updatedRecords);
//       setSnackbar({ open: true, message: "Termination email sent successfully.", severity: "success" });
//     } catch (error) {
//       console.error("Failed to send termination mail:", error);
//       setSnackbar({ open: true, message: "Failed to send termination email.", severity: "error" });
//     }
//   };

//   const getStatusChip = (status) => {
//     let label = status;
//     let bgColor = '#9e9e9e'; // Default
//     if (status === "Sent" || status === "Active") bgColor = '#4caf50'; // Green
//     if (status === "Pending") bgColor = themeOrange; // Orange
//     if (status === "Inactive") bgColor = '#d32f2f'; // Red
//     return <Chip label={label} size="small" sx={{ bgcolor: bgColor, color: 'white', borderRadius: '16px', height: '24px' }} />;
//   };

//   const handleTabChange = (event, newValue) => { setTabIndex(newValue); };
//   const handlePaginationChange = (event, newPage) => { setPage(newPage - 1); };
//   const handleRowsPerPageChange = (event) => { setRowsPerPage(parseInt(event.target.value, 10)); setPage(0); };

//   return (
//     <LocalizationProvider dateAdapter={AdapterDateFns}>
//       <Box component={Paper} p={3}>
//         <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
//           <Typography variant="h4" sx={{ color: themePurple, fontWeight: "bold" }}>
//             Termination Dashboard
//           </Typography>
//           <Button variant="contained" sx={purpleButtonSx} startIcon={<AddIcon />} onClick={() => setOpenDialog(true)}>
//             Initiate Termination
//           </Button>
//         </Box>

//         <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
//           <Tabs value={tabIndex} onChange={handleTabChange} aria-label="termination tabs"
//             sx={{
//               '& .MuiTabs-indicator': { backgroundColor: themePurple },
//               '& .MuiTab-root': {
//                 textTransform: 'none', fontWeight: '600',
//                 '&.Mui-selected': { color: themePurple },
//               },
//             }}
//           >
//             <Tab label="Termination Initiated" />
//             <Tab label="Terminated Employees" />
//           </Tabs>
//         </Box>

//         <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", py: 2 }}>
//             <TextField
//                 size="small" placeholder="Search by Name, Exit Type..." value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 sx={{ width: isMobile ? "100%" : "auto" }}
//                 InputProps={{ startAdornment: (<InputAdornment position="start"><SearchIcon /></InputAdornment>)}}
//             />
//         </Box>

//         <TabPanel value={tabIndex} index={0}>
//           <TableContainer>
//             <Table>
//               <TableHead><TableRow sx={{ bgcolor: themePurple }}>
//                   <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Sr No.</TableCell>
//                   <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Employee Name</TableCell>
//                   <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Exit Type</TableCell>
//                   <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Date of Termination</TableCell>
//                   <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Reason</TableCell>
//                   <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Account Status</TableCell>
//                   <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Mail Status</TableCell>
//                   <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Actions</TableCell>
//               </TableRow></TableHead>
//               <TableBody>
//                 {loading ? Array.from(new Array(rowsPerPage)).map((_, i) => <TableRow key={i}>{Array(8).fill(0).map((_, j) => <TableCell key={j}><Skeleton /></TableCell>)}</TableRow>)
//                 : (rowsPerPage > 0 ? filteredRecords.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : filteredRecords)
//                 .map((record, index) => (
//                   <TableRow key={record.id} hover>
//                     <TableCell>{page * rowsPerPage + index + 1}</TableCell>
//                     <TableCell>{record.employeeName}</TableCell>
//                     <TableCell>{record.exitType}</TableCell>
//                     <TableCell>{record.terminationDate}</TableCell>
//                     <TableCell sx={{ maxWidth: 200, whiteSpace: 'normal' }}>{record.terminationReason}</TableCell>
//                     <TableCell>{getStatusChip(record.accountStatus)}</TableCell>
//                     <TableCell>{getStatusChip(record.mailStatus)}</TableCell>
//                     <TableCell>
//                       {record.mailStatus === "Pending" && (
//                         <Button size="small" variant="outlined" sx={{ color: themePurple, borderColor: themePurple }} onClick={() => handleSendTerminationMail(record.id)}>Send Mail</Button>
//                       )}
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         </TabPanel>

//         <TabPanel value={tabIndex} index={1}>
//           <TableContainer>
//             <Table>
//             <TableHead><TableRow sx={{ bgcolor: themePurple }}>
//                   <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Sr No.</TableCell>
//                   <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Employee Name</TableCell>
//                   <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Exit Type</TableCell>
//                   <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Date of Termination</TableCell>
//                   <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Reason</TableCell>
//                   <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Account Status</TableCell>
//                   <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Mail Status</TableCell>
//               </TableRow></TableHead>
//               <TableBody>
//               {loading ? Array.from(new Array(rowsPerPage)).map((_, i) => <TableRow key={i}>{Array(7).fill(0).map((_, j) => <TableCell key={j}><Skeleton /></TableCell>)}</TableRow>)
//                 : (rowsPerPage > 0 ? filteredRecords.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : filteredRecords)
//                 .map((record, index) => (
//                   <TableRow key={record.id} hover>
//                     <TableCell>{page * rowsPerPage + index + 1}</TableCell>
//                     <TableCell>{record.employeeName}</TableCell>
//                     <TableCell>{record.exitType}</TableCell>
//                     <TableCell>{record.terminationDate}</TableCell>
//                     <TableCell sx={{ maxWidth: 200, whiteSpace: 'normal' }}>{record.terminationReason}</TableCell>
//                     <TableCell>{getStatusChip(record.accountStatus)}</TableCell>
//                     <TableCell>{getStatusChip(record.mailStatus)}</TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         </TabPanel>

//         <Box sx={{ p: 2, borderTop: '1px solid rgba(224, 224, 224, 1)' }}>
//           <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
//               <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//                   <FormControl variant="outlined" size="small">
//                       <Select value={rowsPerPage} onChange={handleRowsPerPageChange} sx={{ backgroundColor: themePurple, color: 'white', borderRadius: '4px', '&:hover': { backgroundColor: themePurpleHover }, '& .MuiOutlinedInput-notchedOutline': { border: 'none' }, '& .MuiSvgIcon-root': { color: 'white' } }}>
//                           {[10, 25, 50].map((value) => (<MenuItem key={value} value={value}>{value}</MenuItem>))}
//                       </Select>
//                   </FormControl>
//                   <Typography variant="body2" color="text.secondary">
//                       {`Showing ${filteredRecords.length > 0 ? page * rowsPerPage + 1 : 0} to ${Math.min((page + 1) * rowsPerPage, filteredRecords.length)} of ${filteredRecords.length} entries`}
//                   </Typography>
//               </Box>
//               <Pagination
//                   count={Math.ceil(filteredRecords.length / rowsPerPage)} page={page + 1} onChange={handlePaginationChange} showFirstButton showLastButton
//                   sx={{ '& .MuiPaginationItem-root': { borderRadius: '4px', '&:hover': { backgroundColor: themeOrange, color: 'white' }}, '& .MuiPaginationItem-page': { color: themePurple, '&.Mui-selected': { backgroundColor: themePurple, color: 'white', '&:hover': { backgroundColor: themeOrange }}}, '& .MuiPaginationItem-icon': { color: themePurple }}}
//               />
//           </Box>
//         </Box>

//         <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
//           <DialogTitle sx={{ color: themePurple, fontWeight: "bold", fontSize: '2rem' }}>
//             Initiate Employee Termination
//             <IconButton onClick={() => setOpenDialog(false)} sx={{ position: "absolute", right: 8, top: 8, color: (theme) => theme.palette.grey[500] }}><CloseIcon /></IconButton>
//           </DialogTitle>
//           <DialogContent>
//             <Grid container spacing={2} sx={{ mt: 1 }}>
//               <Grid item xs={12}><FormControl fullWidth><InputLabel>Initiate Point</InputLabel><Select value={initiatePoint} onChange={(e) => setInitiatePoint(e.target.value)} label="Initiate Point">{initiatePoints.map((point) => (<MenuItem key={point} value={point}>{point}</MenuItem>))}</Select></FormControl></Grid>
//               <Grid item xs={12} md={6}><FormControl fullWidth><InputLabel>Select Employee</InputLabel><Select value={selectedEmployee} onChange={(e) => setSelectedEmployee(e.target.value)} label="Select Employee" disabled={!employees.length}>{employees.map((employee) => (<MenuItem key={employee.id} value={employee.id}>{employee.name} ({employee.status})</MenuItem>))}</Select></FormControl></Grid>
//               <Grid item xs={12} md={6}><FormControl fullWidth><InputLabel>Exit Type</InputLabel><Select value={exitType} onChange={(e) => setExitType(e.target.value)} label="Exit Type" disabled={!exitTypes.length}>{exitTypes.map((type) => (<MenuItem key={type.value} value={String(type.value)}>{type.label}</MenuItem>))}</Select></FormControl></Grid>
//               <Grid item xs={12} md={6}><DatePicker label="Date of Termination" value={terminationDate} onChange={(newValue) => setTerminationDate(newValue)} renderInput={(params) => <TextField {...params} fullWidth />} /></Grid>
//               <Grid item xs={12} md={6}><TextField label="Reason of Termination" fullWidth value={terminationReason} onChange={(e) => setTerminationReason(e.target.value)} multiline rows={3} /></Grid>
//             </Grid>
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={() => setOpenDialog(false)} sx={cancelButtonSx} disabled={isSubmitting}>Cancel</Button>
//             <Button onClick={handleSubmitTermination} variant="contained" sx={terminateButtonSx} disabled={isSubmitting}>
//               {isSubmitting ? <CircularProgress size={24} color="inherit" /> : "Terminate Employee"}
//             </Button>
//           </DialogActions>
//         </Dialog>

//         <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
//           <Alert severity={snackbar.severity} sx={{ width: "100%" }}>{snackbar.message}</Alert>
//         </Snackbar>
//       </Box>
//     </LocalizationProvider>
//   );
// };

// export default TerminationDashboardHr;





import { useState, useEffect } from "react";
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
  CircularProgress,
  Tabs,
  Tab,
  useTheme,
  useMediaQuery,
  InputAdornment,
  Skeleton,
  Pagination,
  IconButton,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { Add as AddIcon, Close as CloseIcon, Search as SearchIcon } from '@mui/icons-material';
import axiosInstance from "../utils/axiosInstance";
import Swal from "sweetalert2";

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
};

const TerminationDashboardHr = () => {
  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("sm"));

  // --- THEME & STYLING ---
  const themePurple = '#8C257C';
  const themePurpleHover = '#6d1d60';
  const themeOrange = '#F58E35';

  const purpleButtonSx = {
    backgroundColor: themePurple,
    color: 'white',
    '&:hover': {
      backgroundColor: themePurpleHover,
    },
  };

  const cancelButtonSx = {
    color: '#757575',
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.04)'
    }
  };
  
  const terminateButtonSx = {
    backgroundColor: '#d32f2f',
    color: 'white',
    '&:hover': {
        backgroundColor: '#b71c1c'
    }
  };

  // --- STATE MANAGEMENT ---
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [terminationDate, setTerminationDate] = useState(null);
  const [terminationReason, setTerminationReason] = useState("");
  const [initiatePoint, setInitiatePoint] = useState("");
  const [exitType, setExitType] = useState("");
  const [employees, setEmployees] = useState([]);
  const [terminationRecords, setTerminationRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [exitTypes, setExitTypes] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const initiatePoints = [
    "HR Review (confirmation)",
    "PIP",
    "Abscond Follow-up (15+ days incompleted)",
  ];

  const fetchTerminations = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("get-terminations/");
      const formattedData = response.data.map((record) => ({
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
      }));
      setTerminationRecords(formattedData);
    } catch (error) {
      console.error("Could not fetch terminations:", error);
      Swal.fire({ icon: "error", title: "Fetch Error", text: "Failed to fetch termination records." });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTerminations();
  }, []);

  useEffect(() => {
    const dataToFilter = tabIndex === 0
      ? terminationRecords.filter(r => r.mailStatus !== "Sent")
      : terminationRecords.filter(r => r.mailStatus === "Sent");

    const lowercasedQuery = searchQuery.toLowerCase();
    const filtered = dataToFilter.filter(record =>
      record.employeeName?.toLowerCase().includes(lowercasedQuery) ||
      record.exitType?.toLowerCase().includes(lowercasedQuery)
    );
    setFilteredRecords(filtered);
    setPage(0);
  }, [searchQuery, terminationRecords, tabIndex]);

  useEffect(() => {
    const fetchEmployees = async (endpoint) => {
      try {
        const response = await axiosInstance.get(endpoint);
        const formattedData = response.data.map((emp) => ({
          id: emp.id || emp.employee_id,
          name: emp.employee_name,
          status: emp.status || "Active",
        }));
        setEmployees(formattedData);
      } catch (error) {
        console.error("Could not fetch employees:", error);
        Swal.fire({ icon: "error", title: "Fetch Error", text: "Failed to fetch employee list." });
        setEmployees([]);
      }
    };

    setSelectedEmployee("");
    if (initiatePoint === "HR Review (confirmation)") {
      fetchEmployees("confirmation-employees-dropdown/");
    } else if (initiatePoint === "Abscond Follow-up (15+ days incompleted)") {
      fetchEmployees("resigned-employees-dropdown/");
    } else {
      setEmployees([]);
    }
  }, [initiatePoint]);

  useEffect(() => {
    const fetchExitTypes = async () => {
      try {
        const response = await axiosInstance.get("api/exit-type/");
        setExitTypes(response.data);
      } catch (error) {
        console.error("Could not fetch exit types:", error);
        Swal.fire({ icon: "error", title: "Fetch Error", text: "Failed to fetch exit types." });
      }
    };
    if (openDialog) {
      fetchExitTypes();
    }
  }, [openDialog]);

  const handleSubmitTermination = async () => {
    if (!selectedEmployee || !exitType || !terminationDate || !terminationReason) {
      Swal.fire({ icon: "error", title: "Incomplete Form", text: "Please fill all required fields." });
      return;
    }
    setIsSubmitting(true);
    const payload = {
      employee_id: selectedEmployee,
      exit_type: Number(exitType),
      date_of_termination: terminationDate.toISOString().split("T")[0],
      reason_of_termination: terminationReason,
    };
    try {
      const response = await axiosInstance.post("post-terminations/", payload);
      Swal.fire({ icon: "success", title: "Success!", text: response.data.message });
      fetchTerminations();
      setOpenDialog(false);
      setSelectedEmployee("");
      setTerminationDate(null);
      setTerminationReason("");
      setInitiatePoint("");
      setExitType("");
    } catch (error) {
      Swal.fire({ icon: "error", title: "Oops...", text: error.response?.data?.message || "Something went wrong!" });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleSendTerminationMail = async (recordId) => {
    try {
      await axiosInstance.patch(`update-terminations/${recordId}/`, { action: "send" });
      const updatedRecords = terminationRecords.map((record) =>
        record.id === recordId ? { ...record, mailStatus: "Sent", accountStatus: "Inactive" } : record
      );
      setTerminationRecords(updatedRecords);
      Swal.fire({ icon: "success", title: "Mail Sent!", text: "Termination email sent successfully." });
    } catch (error) {
      console.error("Failed to send termination mail:", error);
      Swal.fire({ icon: "error", title: "Mail Error", text: "Failed to send termination email." });
    }
  };

  const getStatusChip = (status) => {
    let label = status;
    let bgColor = '#9e9e9e'; // Default
    if (status === "Sent" || status === "Active") bgColor = '#4caf50'; // Green
    if (status === "Pending") bgColor = themeOrange; // Orange
    if (status === "Inactive") bgColor = '#d32f2f'; // Red
    return <Chip label={label} size="small" sx={{ bgcolor: bgColor, color: 'white', borderRadius: '16px', height: '24px' }} />;
  };

  const handleTabChange = (event, newValue) => { setTabIndex(newValue); };
  const handlePaginationChange = (event, newPage) => { setPage(newPage - 1); };
  const handleRowsPerPageChange = (event) => { setRowsPerPage(parseInt(event.target.value, 10)); setPage(0); };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box component={Paper} p={3}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
          <Typography variant="h4" sx={{ color: themePurple, fontWeight: "bold" }}>
            Termination Dashboard
          </Typography>
          <Button variant="contained" sx={purpleButtonSx} startIcon={<AddIcon />} onClick={() => setOpenDialog(true)}>
            Initiate Termination
          </Button>
        </Box>

        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={tabIndex} onChange={handleTabChange} aria-label="termination tabs"
            sx={{
              '& .MuiTabs-indicator': { backgroundColor: themePurple },
              '& .MuiTab-root': {
                textTransform: 'none', fontWeight: '600',
                '&.Mui-selected': { color: themePurple },
              },
            }}
          >
            <Tab label="Termination Initiated" />
            <Tab label="Terminated Employees" />
          </Tabs>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", py: 2 }}>
            <TextField
                size="small" placeholder="Search by Name, Exit Type..." value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                sx={{ width: isMobile ? "100%" : "auto" }}
                InputProps={{ startAdornment: (<InputAdornment position="start"><SearchIcon /></InputAdornment>)}}
            />
        </Box>

        <TabPanel value={tabIndex} index={0}>
          <TableContainer>
            <Table>
              <TableHead><TableRow sx={{ bgcolor: themePurple }}>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Sr No.</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Employee Name</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Exit Type</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Date of Termination</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Reason</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Account Status</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Mail Status</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Actions</TableCell>
              </TableRow></TableHead>
              <TableBody>
                {loading ? Array.from(new Array(rowsPerPage)).map((_, i) => <TableRow key={i}>{Array(8).fill(0).map((_, j) => <TableCell key={j}><Skeleton /></TableCell>)}</TableRow>)
                : (rowsPerPage > 0 ? filteredRecords.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : filteredRecords)
                .map((record, index) => (
                  <TableRow key={record.id} hover>
                    <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                    <TableCell>{record.employeeName}</TableCell>
                    <TableCell>{record.exitType}</TableCell>
                    <TableCell>{record.terminationDate}</TableCell>
                    <TableCell sx={{ maxWidth: 200, whiteSpace: 'normal' }}>{record.terminationReason}</TableCell>
                    <TableCell>{getStatusChip(record.accountStatus)}</TableCell>
                    <TableCell>{getStatusChip(record.mailStatus)}</TableCell>
                    <TableCell>
                      {record.mailStatus === "Pending" && (
                        <Button size="small" variant="outlined" sx={{ color: themePurple, borderColor: themePurple }} onClick={() => handleSendTerminationMail(record.id)}>Send Mail</Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>

        <TabPanel value={tabIndex} index={1}>
          <TableContainer>
            <Table>
            <TableHead><TableRow sx={{ bgcolor: themePurple }}>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Sr No.</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Employee Name</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Exit Type</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Date of Termination</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Reason</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Account Status</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Mail Status</TableCell>
              </TableRow></TableHead>
              <TableBody>
              {loading ? Array.from(new Array(rowsPerPage)).map((_, i) => <TableRow key={i}>{Array(7).fill(0).map((_, j) => <TableCell key={j}><Skeleton /></TableCell>)}</TableRow>)
                : (rowsPerPage > 0 ? filteredRecords.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : filteredRecords)
                .map((record, index) => (
                  <TableRow key={record.id} hover>
                    <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                    <TableCell>{record.employeeName}</TableCell>
                    <TableCell>{record.exitType}</TableCell>
                    <TableCell>{record.terminationDate}</TableCell>
                    <TableCell sx={{ maxWidth: 200, whiteSpace: 'normal' }}>{record.terminationReason}</TableCell>
                    <TableCell>{getStatusChip(record.accountStatus)}</TableCell>
                    <TableCell>{getStatusChip(record.mailStatus)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>

        <Box sx={{ p: 2, borderTop: '1px solid rgba(224, 224, 224, 1)' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <FormControl variant="outlined" size="small">
                      <Select value={rowsPerPage} onChange={handleRowsPerPageChange} sx={{ backgroundColor: themePurple, color: 'white', borderRadius: '4px', '&:hover': { backgroundColor: themePurpleHover }, '& .MuiOutlinedInput-notchedOutline': { border: 'none' }, '& .MuiSvgIcon-root': { color: 'white' } }}>
                          {[10, 25, 50].map((value) => (<MenuItem key={value} value={value}>{value}</MenuItem>))}
                      </Select>
                  </FormControl>
                  <Typography variant="body2" color="text.secondary">
                      {`Showing ${filteredRecords.length > 0 ? page * rowsPerPage + 1 : 0} to ${Math.min((page + 1) * rowsPerPage, filteredRecords.length)} of ${filteredRecords.length} entries`}
                  </Typography>
              </Box>
              <Pagination
                  count={Math.ceil(filteredRecords.length / rowsPerPage)} page={page + 1} onChange={handlePaginationChange} showFirstButton showLastButton
                  sx={{ '& .MuiPaginationItem-root': { borderRadius: '4px', '&:hover': { backgroundColor: themeOrange, color: 'white' }}, '& .MuiPaginationItem-page': { color: themePurple, '&.Mui-selected': { backgroundColor: themePurple, color: 'white', '&:hover': { backgroundColor: themeOrange }}}, '& .MuiPaginationItem-icon': { color: themePurple }}}
              />
          </Box>
        </Box>

        <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
          <DialogTitle sx={{ color: themePurple, fontWeight: "bold", fontSize: '2rem' }}>
            Initiate Employee Termination
            <IconButton onClick={() => setOpenDialog(false)} sx={{ position: "absolute", right: 8, top: 8, color: (theme) => theme.palette.grey[500] }}><CloseIcon /></IconButton>
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12}><FormControl fullWidth><InputLabel>Initiate Point</InputLabel><Select value={initiatePoint} onChange={(e) => setInitiatePoint(e.target.value)} label="Initiate Point">{initiatePoints.map((point) => (<MenuItem key={point} value={point}>{point}</MenuItem>))}</Select></FormControl></Grid>
              <Grid item xs={12} md={6}><FormControl fullWidth><InputLabel>Select Employee</InputLabel><Select value={selectedEmployee} onChange={(e) => setSelectedEmployee(e.target.value)} label="Select Employee" disabled={!employees.length}>{employees.map((employee) => (<MenuItem key={employee.id} value={employee.id}>{employee.name} ({employee.status})</MenuItem>))}</Select></FormControl></Grid>
              <Grid item xs={12} md={6}><FormControl fullWidth><InputLabel>Exit Type</InputLabel><Select value={exitType} onChange={(e) => setExitType(e.target.value)} label="Exit Type" disabled={!exitTypes.length}>{exitTypes.map((type) => (<MenuItem key={type.value} value={String(type.value)}>{type.label}</MenuItem>))}</Select></FormControl></Grid>
              <Grid item xs={12} md={6}><DatePicker label="Date of Termination" value={terminationDate} onChange={(newValue) => setTerminationDate(newValue)} renderInput={(params) => <TextField {...params} fullWidth />} /></Grid>
              <Grid item xs={12} md={6}><TextField label="Reason of Termination" fullWidth value={terminationReason} onChange={(e) => setTerminationReason(e.target.value)} multiline rows={3} /></Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)} sx={cancelButtonSx} disabled={isSubmitting}>Cancel</Button>
            <Button onClick={handleSubmitTermination} variant="contained" sx={terminateButtonSx} disabled={isSubmitting}>
              {isSubmitting ? <CircularProgress size={24} color="inherit" /> : "Terminate Employee"}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </LocalizationProvider>
  );
};

export default TerminationDashboardHr;