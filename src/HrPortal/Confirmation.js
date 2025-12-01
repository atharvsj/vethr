// import { useState } from "react"
// // ... (other imports remain the same)
// import {
//   Container,
//   Paper,
//   Typography,
//   Box,
//   Tabs,
//   Tab,
//   Button,
//   TextField,
//   Select,
//   MenuItem,
//   FormControl,
//   InputLabel,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Grid,
//   Card,
//   CardContent,
//   IconButton,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Alert,
//   Checkbox,
//   FormControlLabel,
// } from "@mui/material"
// import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon, Save as SaveIcon } from "@mui/icons-material"
 
// // ... (constants like designations, employeesData, etc. remain the same)
// const designations = ["VSO", "Manager", "Senior Manager", "Director"]
 
// const employeesData = [
//   { id: 1, name: "Alice Johnson", designation: "VSO" },
//   { id: 2, name: "Bob Williams", designation: "VSO" },
//   { id: 3, name: "Charlie Brown", designation: "Manager" },
//   { id: 4, "name": "Diana Miller", designation: "Senior Manager" },
//   { id: 5, name: "Ethan Davis", designation: "Director" },
//   { id: 6, name: "Fiona Garcia", designation: "Manager" },
// ]
 
// const defaultParameters = {
//   phase1: ["Onboarding documentation completed within 5 days", "Attendance/punctuality in reporting & compliance"],
//   phase2: ["Understanding customer coverage plan", "Participation in team meetings", "Customer complaint handling"],
//   phase3: ["Call average", "Quality of work", "Competencies"],
//   phase4: ["Business head feedback score", "Final performance review rating as per VetHR"],
// }
 
// const defaultParameterLibrary = [
//   "Onboarding documentation completed within 5 days",
//   "Attendance/punctuality in reporting & compliance",
//   "Understanding customer coverage plan",
//   "Participation in team meetings",
//   "Customer complaint handling",
//   "Call average",
//   "Quality of work",
//   "Competencies",
//   "Business head feedback score",
//   "Final performance review rating as per VetHR",
//   "Teamwork and Collaboration",
//   "Communication Skills",
//   "Problem-Solving Abilities",
//   "Adaptability and Flexibility",
//   "Time Management",
// ]
 
 
// function TabPanel({ children, value, index, ...other }) {
//   return (
//     <div role="tabpanel" hidden={value !== index} id={`tabpanel-${index}`} aria-labelledby={`tab-${index}`} {...other}>
//       {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
//     </div>
//   )
// }
 
// export default function PerformanceManagement() {
//   const [activeTab, setActiveTab] = useState(0)
//   const [selectedDesignation, setSelectedDesignation] = useState("")
//   const [selectedEmployee, setSelectedEmployee] = useState("")
//   const [filteredEmployees, setFilteredEmployees] = useState([])
//   const [parameters, setParameters] = useState(defaultParameters)
//   const [ratings, setRatings] = useState({ phase1: {}, phase2: {}, phase3: {}, phase4: {} })
//   const [comments, setComments] = useState({
//     phase1: { lineManager: "", head: "", hr: "" },
//     phase2: { lineManager: "", head: "", hr: "" },
//     phase3: { lineManager: "", head: "", hr: "" },
//     phase4: { lineManager: "", head: "", hr: "" },
//   })
  
//   const [editingParameter, setEditingParameter] = useState(null)
//   const [currentPhase, setCurrentPhase] = useState("phase1")
  
//   const [parameterLibrary, setParameterLibrary] = useState(defaultParameterLibrary)
//   const [openAddLibraryDialog, setOpenAddLibraryDialog] = useState(false)
//   const [newLibraryParameter, setNewLibraryParameter] = useState("")
 
//   const [openSelectParameterDialog, setOpenSelectParameterDialog] = useState(false)
//   const [selectedLibraryParameters, setSelectedLibraryParameters] = useState([])
 
//   const [openExtendDialog, setOpenExtendDialog] = useState(false);
//   const [probationExtended, setProbationExtended] = useState(false);
 
 
//   const resetFormState = () => {
//     setRatings({ phase1: {}, phase2: {}, phase3: {}, phase4: {} })
//     setComments({
//       phase1: { lineManager: "", head: "", hr: "" },
//       phase2: { lineManager: "", head: "", hr: "" },
//       phase3: { lineManager: "", head: "", hr: "" },
//       phase4: { lineManager: "", head: "", hr: "" },
//     })
//     setParameters(defaultParameters)
//     setActiveTab(0)
//     setProbationExtended(false);
//   }
 
//   const handleDesignationChange = (event) => {
//     const designation = event.target.value
//     setSelectedDesignation(designation)
//     const relevantEmployees = employeesData.filter((emp) => emp.designation === designation)
//     setFilteredEmployees(relevantEmployees)
//     setSelectedEmployee("")
//     resetFormState()
//   }
 
//   const handleEmployeeChange = (event) => {
//     const employeeId = event.target.value
//     setSelectedEmployee(employeeId)
//     resetFormState()
//   }
 
 
//   const handleTabChange = (event, newValue) => {
//     setActiveTab(newValue)
//   }
 
//   const handleFinalAction = (action) => {
//     const employee = employeesData.find((e) => e.id === selectedEmployee)
//     const message = `Action: ${action.toUpperCase()} for employee ${employee?.name}.`
//     console.log(message)
//     alert(message)
//   }
 
//   const handleConfirmExtend = () => {
//     const message = `The probation has been extended by 3 months.`;
//     console.log(message);
//     alert(message);
//     setProbationExtended(true);
//     setOpenExtendDialog(false);
//   }
 
//   const calculateAverage = (lineManager, head, hr) => {
//     const values = [lineManager, head, hr].filter((val) => val && !isNaN(val))
//     if (values.length === 0) return 0
//     const sum = values.reduce((sum, val) => sum + Number.parseFloat(val), 0)
//     const average = sum / values.length
//     return average.toFixed(1)
//   }
 
//   const calculatePhaseTotal = (phase) => {
//     const phaseParams = parameters[phase] || []
//     let lineManagerTotal = 0,
//       headTotal = 0,
//       hrTotal = 0
//     let lmCount = 0,
//       headCount = 0,
//       hrCount = 0
 
//     phaseParams.forEach((param, index) => {
//       const rating = ratings[phase][index] || {}
//       if (rating.lineManager && !isNaN(rating.lineManager)) {
//         lineManagerTotal += Number.parseFloat(rating.lineManager)
//         lmCount++
//       }
//       if (rating.head && !isNaN(rating.head)) {
//         headTotal += Number.parseFloat(rating.head)
//         headCount++
//       }
//       if (rating.hr && !isNaN(rating.hr)) {
//         hrTotal += Number.parseFloat(rating.hr)
//         hrCount++
//       }
//     })
 
//     return {
//       lineManager: lmCount > 0 ? (lineManagerTotal / lmCount).toFixed(1) : 0,
//       head: headCount > 0 ? (headTotal / headCount).toFixed(1) : 0,
//       hr: hrCount > 0 ? (hrTotal / hrCount).toFixed(1) : 0,
//     }
//   }
 
//   const updateRating = (phase, paramIndex, rater, value) => {
//     const numericValue = value.replace(/[^0-9.]/g, "")
//     if (numericValue === "" || (Number(numericValue) >= 1 && Number(numericValue) <= 10)) {
//       setRatings((prev) => ({
//         ...prev,
//         [phase]: {
//           ...prev[phase],
//           [paramIndex]: {
//             ...prev[phase][paramIndex],
//             [rater]: numericValue,
//           },
//         },
//       }))
//     }
//   }
 
//   const updateComment = (phase, rater, value) => {
//     setComments((prev) => ({
//       ...prev,
//       [phase]: {
//         ...prev[phase],
//         [rater]: value,
//       },
//     }))
//   }
 
//   const handleAddParameterToLibrary = () => {
//     const trimmedParam = newLibraryParameter.trim()
//     if (trimmedParam && !parameterLibrary.includes(trimmedParam)) {
//       setParameterLibrary((prev) => [...prev, trimmedParam])
//       setNewLibraryParameter("")
//       setOpenAddLibraryDialog(false)
//     } else {
//         alert("Parameter cannot be empty or a duplicate.")
//     }
//   }
  
//   const editParameter = (phase, index, newValue) => {
//     setParameters((prev) => ({
//       ...prev,
//       [phase]: prev[phase].map((param, i) => (i === index ? newValue : param)),
//     }))
//   }
 
//   const deleteParameter = (phase, index) => {
//     setParameters((prev) => ({
//       ...prev,
//       [phase]: prev[phase].filter((_, i) => i !== index),
//     }))
//     setRatings((prev) => {
//       const newPhaseRatings = { ...prev[phase] }
//       delete newPhaseRatings[index]
//       return { ...prev, [phase]: newPhaseRatings }
//     })
//   }
  
//   const handleLibraryParameterSelect = (event) => {
//     const { value, checked } = event.target
//     if (checked) {
//       setSelectedLibraryParameters((prev) => [...prev, value])
//     } else {
//       setSelectedLibraryParameters((prev) => prev.filter((param) => param !== value))
//     }
//   }
  
//   const handleAddSelectedParameters = () => {
//     if (selectedLibraryParameters.length > 0) {
//       setParameters((prev) => ({
//         ...prev,
//         [currentPhase]: [...prev[currentPhase], ...selectedLibraryParameters],
//       }))
//     }
//     setOpenSelectParameterDialog(false)
//     setSelectedLibraryParameters([]) 
//   }
 
//   const getOverallPerformance = () => {
//     const phases = ["phase1", "phase2", "phase3", "phase4"]
//     let totalLineManager = 0,
//       totalHead = 0,
//       totalHr = 0,
//       phaseCount = 0
 
//     phases.forEach((phase) => {
//       const phaseTotal = calculatePhaseTotal(phase)
//       const hasRatings =
//         Number.parseFloat(phaseTotal.lineManager) > 0 ||
//         Number.parseFloat(phaseTotal.head) > 0 ||
//         Number.parseFloat(phaseTotal.hr) > 0
 
//       if (hasRatings) {
//         totalLineManager += Number.parseFloat(phaseTotal.lineManager) || 0
//         totalHead += Number.parseFloat(phaseTotal.head) || 0
//         totalHr += Number.parseFloat(phaseTotal.hr) || 0
//         phaseCount++
//       }
//     })
 
//     if (phaseCount === 0) {
//       return { lineManager: "0.0", head: "0.0", hr: "0.0", average: "0.0" }
//     }
 
//     const overallAverage = calculateAverage(
//       (totalLineManager / phaseCount).toFixed(1),
//       (totalHead / phaseCount).toFixed(1),
//       (totalHr / phaseCount).toFixed(1)
//     )
 
//     return {
//       lineManager: (totalLineManager / phaseCount).toFixed(1),
//       head: (totalHead / phaseCount).toFixed(1),
//       hr: (totalHr / phaseCount).toFixed(1),
//       average: overallAverage,
//     }
//   }
 
//   const getRecommendation = () => {
//     const overall = getOverallPerformance()
//     const avgScore = Number.parseFloat(overall.average)
 
//     if (avgScore >= 8) return { type: "Confirm", color: "success" }
//     if (avgScore >= 6) return { type: "Extend", color: "warning" }
//     return { type: "Terminate", color: "error" }
//   }
 
 
//   const renderPhaseTable = (phase, phaseTitle, dayRange) => {
//     const phaseParams = parameters[phase] || []
//     const phaseTotal = calculatePhaseTotal(phase)
 
//     return (
//       <Card style={{ marginBottom: "20px" }}>
//         <CardContent>
//           <Box style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
//             <Typography variant="h6" style={{ color: "#1976d2", fontWeight: "bold" }}>
//               {phaseTitle} ({dayRange})
//             </Typography>
//             <Button
//               variant="outlined"
//               startIcon={<AddIcon />}
//               onClick={() => {
//                 setCurrentPhase(phase)
//                 setOpenSelectParameterDialog(true)
//               }}
//               style={{ borderColor: "#1976d2", color: "#1976d2" }}
//             >
//               Select Parameter
//             </Button>
//           </Box>
 
//           <TableContainer component={Paper} style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
//             <Table>
//               <TableHead style={{ backgroundColor: "#f5f5f5" }}>
//                 <TableRow>
//                   <TableCell style={{ fontWeight: "bold", width: "5%" }}>Sr. No.</TableCell>
//                   <TableCell style={{ fontWeight: "bold", width: "35%" }}>Parameters</TableCell>
//                   <TableCell style={{ fontWeight: "bold", textAlign: "center", width: "15%" }}>Line Manager</TableCell>
//                   <TableCell style={{ fontWeight: "bold", textAlign: "center", width: "15%" }}>Head</TableCell>
//                   <TableCell style={{ fontWeight: "bold", textAlign: "center", width: "15%" }}>HR</TableCell>
//                   <TableCell style={{ fontWeight: "bold", textAlign: "center", width: "10%" }}>Average</TableCell>
//                   <TableCell style={{ fontWeight: "bold", textAlign: "center", width: "5%" }}>Actions</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {phaseParams.map((param, index) => {
//                   const rating = ratings[phase][index] || {}
//                   const average = calculateAverage(rating.lineManager, rating.head, rating.hr)
 
//                   return (
//                     <TableRow key={index} style={{ backgroundColor: index % 2 === 0 ? "#fafafa" : "white" }}>
//                       <TableCell>{index + 1}</TableCell>
//                       <TableCell>
//                         {editingParameter === `${phase}-${index}` ? (
//                           <TextField
//                             defaultValue={param}
//                             onBlur={(e) => {
//                               editParameter(phase, index, e.target.value)
//                               setEditingParameter(null)
//                             }}
//                             onKeyPress={(e) => {
//                               if (e.key === "Enter") {
//                                 editParameter(phase, index, e.target.value)
//                                 setEditingParameter(null)
//                               }
//                             }}
//                             fullWidth
//                             size="small"
//                             autoFocus
//                           />
//                         ) : (
//                           param
//                         )}
//                       </TableCell>
//                       <TableCell style={{ textAlign: "center" }}>
//                         <TextField
//                           disabled // MODIFIED
//                           type="number"
//                           inputProps={{ min: 1, max: 10, step: "0.1" }}
//                           value={rating.lineManager || ""}
//                           onChange={(e) => updateRating(phase, index, "lineManager", e.target.value)}
//                           size="small"
//                           style={{ width: "60px" }}
//                         />
//                       </TableCell>
//                       <TableCell style={{ textAlign: "center" }}>
//                         <TextField
//                           disabled // MODIFIED
//                           type="number"
//                           inputProps={{ min: 1, max: 10, step: "0.1" }}
//                           value={rating.head || ""}
//                           onChange={(e) => updateRating(phase, index, "head", e.target.value)}
//                           size="small"
//                           style={{ width: "60px" }}
//                         />
//                       </TableCell>
//                       <TableCell style={{ textAlign: "center" }}>
//                         <TextField
//                           type="number"
//                           inputProps={{ min: 1, max: 10, step: "0.1" }}
//                           value={rating.hr || ""}
//                           onChange={(e) => updateRating(phase, index, "hr", e.target.value)}
//                           size="small"
//                           style={{ width: "60px" }}
//                         />
//                       </TableCell>
//                       <TableCell style={{ textAlign: "center", fontWeight: "bold", color: "#1976d2" }}>
//                         {average}
//                       </TableCell>
//                       <TableCell style={{ textAlign: "center" }}>
//                         <IconButton
//                           size="small"
//                           onClick={() => setEditingParameter(`${phase}-${index}`)}
//                           style={{ color: "#1976d2" }}
//                         >
//                           <EditIcon />
//                         </IconButton>
//                         <IconButton
//                           size="small"
//                           onClick={() => deleteParameter(phase, index)}
//                           style={{ color: "#d32f2f" }}
//                         >
//                           <DeleteIcon />
//                         </IconButton>
//                       </TableCell>
//                     </TableRow>
//                   )
//                 })}
//                 <TableRow style={{ backgroundColor: "#e3f2fd" }}>
//                   <TableCell colSpan={2} style={{ fontWeight: "bold" }}>
//                     Total
//                   </TableCell>
//                   <TableCell style={{ textAlign: "center", fontWeight: "bold" }}>{phaseTotal.lineManager}</TableCell>
//                   <TableCell style={{ textAlign: "center", fontWeight: "bold" }}>{phaseTotal.head}</TableCell>
//                   <TableCell style={{ textAlign: "center", fontWeight: "bold" }}>{phaseTotal.hr}</TableCell>
//                   <TableCell style={{ textAlign: "center", fontWeight: "bold", color: "#1976d2" }}>
//                     {calculateAverage(phaseTotal.lineManager, phaseTotal.head, phaseTotal.hr)}
//                   </TableCell>
//                   <TableCell></TableCell>
//                 </TableRow>
//               </TableBody>
//             </Table>
//           </TableContainer>
 
//           <Grid container spacing={2} style={{ marginTop: "20px" }}>
//             <Grid item xs={12} md={4}>
//               <TextField
//                 disabled // MODIFIED
//                 label="Line Manager Comments"
//                 multiline
//                 rows={3}
//                 fullWidth
//                 value={comments[phase].lineManager}
//                 onChange={(e) => updateComment(phase, "lineManager", e.target.value)}
//                 variant="outlined"
//               />
//             </Grid>
//             <Grid item xs={12} md={4}>
//               <TextField
//                 disabled // MODIFIED
//                 label="Head Comments"
//                 multiline
//                 rows={3}
//                 fullWidth
//                 value={comments[phase].head}
//                 onChange={(e) => updateComment(phase, "head", e.target.value)}
//                 variant="outlined"
//               />
//             </Grid>
//             <Grid item xs={12} md={4}>
//               <TextField
//                 label="HR Comments"
//                 multiline
//                 rows={3}
//                 fullWidth
//                 value={comments[phase].hr}
//                 onChange={(e) => updateComment(phase, "hr", e.target.value)}
//                 variant="outlined"
//               />
//             </Grid>
//           </Grid>
 
//           <Box style={{ textAlign: "center", marginTop: "20px" }}>
//             <Button variant="contained" startIcon={<SaveIcon />} style={{ backgroundColor: "#1976d2", color: "white" }}>
//               Save {phaseTitle}
//             </Button>
//           </Box>
//         </CardContent>
//       </Card>
//     )
//   }
 
//   const renderOverallAnalysis = () => {
//     const overall = getOverallPerformance()
//     const recommendation = getRecommendation()
//     const achievementPercentage = (Number.parseFloat(overall.average) * 10).toFixed(0)
    
//     return (
//       <Card>
//          <CardContent>
//           <Typography variant="h5" style={{ marginBottom: "20px", color: "#1976d2", fontWeight: "bold" }}>
//             Performance Analysis Summary
//           </Typography>
 
//           <Grid container spacing={3}>
//             <Grid item xs={12} md={6}>
//               <Card style={{ backgroundColor: "#f8f9fa", border: "1px solid #dee2e6", height: "100%" }}>
//                 <CardContent>
//                   <Typography variant="h6" style={{ marginBottom: "15px", color: "#495057" }}>
//                     Phase-wise Performance
//                   </Typography>
//                   <TableContainer>
//                     <Table size="small">
//                       <TableHead>
//                         <TableRow>
//                           <TableCell style={{ fontWeight: "bold" }}>Phase</TableCell>
//                           <TableCell style={{ fontWeight: "bold", textAlign: "center" }}>Line Manager</TableCell>
//                           <TableCell style={{ fontWeight: "bold", textAlign: "center" }}>Head</TableCell>
//                           <TableCell style={{ fontWeight: "bold", textAlign: "center" }}>HR</TableCell>
//                           <TableCell style={{ fontWeight: "bold", textAlign: "center" }}>Total</TableCell>
//                         </TableRow>
//                       </TableHead>
//                       <TableBody>
//                         {["phase1", "phase2", "phase3", "phase4"].map((phase, index) => {
//                           const phaseTotal = calculatePhaseTotal(phase)
//                           const phaseNames = ["Align", "Accelerate", "Achieve", "Aspire"]
//                           return (
//                             <TableRow key={phase}>
//                               <TableCell>{phaseNames[index]}</TableCell>
//                               <TableCell style={{ textAlign: "center" }}>{phaseTotal.lineManager}</TableCell>
//                               <TableCell style={{ textAlign: "center" }}>{phaseTotal.head}</TableCell>
//                               <TableCell style={{ textAlign: "center" }}>{phaseTotal.hr}</TableCell>
//                               <TableCell style={{ textAlign: "center", fontWeight: "bold" }}>
//                                 {calculateAverage(phaseTotal.lineManager, phaseTotal.head, phaseTotal.hr)}
//                               </TableCell>
//                             </TableRow>
//                           )
//                         })}
//                         <TableRow style={{ backgroundColor: "#e3f2fd" }}>
//                           <TableCell style={{ fontWeight: "bold" }}>Overall</TableCell>
//                           <TableCell style={{ textAlign: "center", fontWeight: "bold" }}>
//                             {overall.lineManager}
//                           </TableCell>
//                           <TableCell style={{ textAlign: "center", fontWeight: "bold" }}>{overall.head}</TableCell>
//                           <TableCell style={{ textAlign: "center", fontWeight: "bold" }}>{overall.hr}</TableCell>
//                           <TableCell style={{ textAlign: "center", fontWeight: "bold", color: "#1976d2" }}>
//                             {overall.average}
//                           </TableCell>
//                         </TableRow>
//                       </TableBody>
//                     </Table>
//                   </TableContainer>
//                 </CardContent>
//               </Card>
//             </Grid>
 
//             <Grid item xs={12} md={6}>
//               <Card style={{ backgroundColor: "#f8f9fa", border: "1px solid #dee2e6", height: "100%" }}>
//                 <CardContent>
//                   <Typography variant="h6" style={{ marginBottom: "15px", color: "#495057" }}>
//                     Final Recommendation
//                   </Typography>
//                   <Box style={{ marginBottom: "15px" }}>
//                     <Typography variant="body2" style={{ marginBottom: "5px" }}>
//                       Performance Analysis (Phase 1-4): <strong>{overall.average}</strong>
//                     </Typography>
//                     <Typography variant="body2" style={{ marginBottom: "5px" }}>
//                       KPI + KRA Average: <strong>N/A</strong>
//                     </Typography>
//                     <Typography variant="body2" style={{ marginBottom: "15px" }}>
//                       Achievement Percentage: <strong>{achievementPercentage}%</strong>
//                     </Typography>
//                   </Box>
 
//                   <Alert severity={recommendation.color} style={{ marginBottom: "15px" }}>
//                     <Typography variant="h6">HR Recommendation: {recommendation.type}</Typography>
//                   </Alert>
 
//                   <Box
//                     style={{ padding: "10px", backgroundColor: "#fff", borderRadius: "4px", border: "1px solid #ddd" }}
//                   >
//                     <Typography variant="body2" style={{ fontSize: "12px", color: "#666" }}>
//                       <strong>Note:</strong> Automatic applicable from date of joining to 6 months after date of
//                       joining. If line manager is not available, average of head and HR is considered.
//                     </Typography>
//                   </Box>
//                 </CardContent>
//               </Card>
//             </Grid>
//           </Grid>
 
//           <Grid container spacing={2} style={{ marginTop: "20px" }}>
//             <Grid item xs={12} md={4}>
//               <TextField
//                 disabled // MODIFIED
//                 label="Line Manager Final Comments"
//                 multiline
//                 rows={4}
//                 fullWidth
//                 variant="outlined"
//               />
//             </Grid>
//             <Grid item xs={12} md={4}>
//               <TextField
//                 disabled // MODIFIED
//                 label="Head Final Comments"
//                 multiline
//                 rows={4}
//                 fullWidth
//                 variant="outlined"
//               />
//             </Grid>
//             <Grid item xs={12} md={4}>
//               <TextField label="HR Final Comments" multiline rows={4} fullWidth variant="outlined" />
//             </Grid>
//           </Grid>
//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "center",
//             gap: 2,
//             flexWrap: "wrap",
//             marginTop: "30px",
//             paddingTop: "20px",
//             borderTop: "1px solid #e0e0e0",
//           }}
//         >
//           <Button
//             variant={recommendation.type === "Confirm" ? "contained" : "outlined"}
//             color="success"
//             size="large"
//             onClick={() => handleFinalAction("Confirm")}
//           >
//             CONFIRM EMPLOYEE
//           </Button>
 
//           {!probationExtended && (
//             <Button
//               variant={recommendation.type === "Extend" ? "contained" : "outlined"}
//               color="warning"
//               size="large"
//               onClick={() => setOpenExtendDialog(true)} 
//             >
//               EXTEND PROBATION
//             </Button>
//           )}
 
//           <Button
//             variant={recommendation.type === "Terminate" ? "contained" : "outlined"}
//             color="error"
//             size="large"
//             onClick={() => handleFinalAction("Terminate")}
//           >
//             TERMINATE EMPLOYEE
//           </Button>
//         </Box>
//         </CardContent>
//       </Card>
//     )
//   }
 
//   const availableParamsForSelection = parameterLibrary.filter(p => !parameters[currentPhase]?.includes(p));
//   const employeeName = employeesData.find(e => e.id === selectedEmployee)?.name || 'the employee';
 
 
//   return (
//     <Container maxWidth="xl" style={{ padding: "20px" }}>
//       <Paper style={{ padding: "20px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
//          <Typography
//           variant="h4"
//           style={{
//             textAlign: "center",
//             marginBottom: "30px",
//             color: "#1976d2",
//             fontWeight: "bold",
//             borderBottom: "2px solid #1976d2",
//             paddingBottom: "10px",
//           }}
//         >
//           4A - Align, Accelerate, Achieve & Aspire Program
//         </Typography>
 
//         <Grid container spacing={2} alignItems="center" style={{ marginBottom: "30px" }}>
//           <Grid item xs={12} sm={4} md={3}>
//             <FormControl fullWidth>
//               <InputLabel id="designation-select-label">Select Designation</InputLabel>
//               <Select
//                 labelId="designation-select-label"
//                 value={selectedDesignation}
//                 onChange={handleDesignationChange}
//                 label="Select Designation"
//               >
//                 {designations.map((designation) => (
//                   <MenuItem key={designation} value={designation}>
//                     {designation}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//           </Grid>
//           <Grid item xs={12} sm={4} md={3}>
//             <FormControl fullWidth disabled={!selectedDesignation}>
//               <InputLabel id="employee-select-label">Select Employee</InputLabel>
//               <Select
//                 labelId="employee-select-label"
//                 value={selectedEmployee}
//                 onChange={handleEmployeeChange}
//                 label="Select Employee"
//               >
//                 {filteredEmployees.map((employee) => (
//                   <MenuItem key={employee.id} value={employee.id}>
//                     {employee.name}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//           </Grid>
//           <Grid item xs={12} sm={4} md={3}>
//             <Button
//               fullWidth
//               variant="contained"
//               onClick={() => setOpenAddLibraryDialog(true)}
//               disabled={!selectedEmployee}
//               startIcon={<AddIcon />}
//             >
//               Add Parameter to Library
//             </Button>
//           </Grid>
//         </Grid>
 
//         {selectedEmployee && (
//           <>
//             <Tabs
//               value={activeTab}
//               onChange={handleTabChange}
//               variant="scrollable"
//               scrollButtons="auto"
//               aria-label="performance-review-tabs"
//               style={{ borderBottom: "1px solid #ddd", marginBottom: "20px" }}
//             >
//               <Tab label="Phase 1: Align" id="tab-0" aria-controls="tabpanel-0" />
//               <Tab label="Phase 2: Accelerate" id="tab-1" aria-controls="tabpanel-1" />
//               <Tab label="Phase 3: Achieve" id="tab-2" aria-controls="tabpanel-2" />
//               <Tab label="Phase 4: Aspire" id="tab-3" aria-controls="tabpanel-3" />
//               <Tab label="Overall Analysis" id="tab-4" aria-controls="tabpanel-4" />
//             </Tabs>
 
//             <TabPanel value={activeTab} index={0}>
//               {renderPhaseTable("phase1", "Phase 1: Align", "Day 1 to 30")}
//             </TabPanel>
 
//             <TabPanel value={activeTab} index={1}>
//               {renderPhaseTable("phase2", "Phase 2: Accelerate", "Day 30 to 60")}
//             </TabPanel>
 
//             <TabPanel value={activeTab} index={2}>
//               {renderPhaseTable("phase3", "Phase 3: Achieve", "Day 60 to 90")}
//             </TabPanel>
 
//             <TabPanel value={activeTab} index={3}>
//               {renderPhaseTable("phase4", "Phase 4: Aspire", "Day 90 to 180")}
//             </TabPanel>
 
//             <TabPanel value={activeTab} index={4}>
//               {renderOverallAnalysis()}
//             </TabPanel>
//           </>
//         )}
 
//         <Dialog open={openAddLibraryDialog} onClose={() => setOpenAddLibraryDialog(false)}>
//           <DialogTitle>Add New Parameter to Library</DialogTitle>
//           <DialogContent>
//             <TextField
//               autoFocus
//               margin="dense"
//               label="Parameter Description"
//               fullWidth
//               variant="outlined"
//               value={newLibraryParameter}
//               onChange={(e) => setNewLibraryParameter(e.target.value)}
//               onKeyPress={(e) => e.key === "Enter" && handleAddParameterToLibrary()}
//             />
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={() => setOpenAddLibraryDialog(false)}>Cancel</Button>
//             <Button onClick={handleAddParameterToLibrary} variant="contained">
//               Add to Library
//             </Button>
//           </DialogActions>
//         </Dialog>
        
//         <Dialog open={openSelectParameterDialog} onClose={() => setOpenSelectParameterDialog(false)} fullWidth maxWidth="sm">
//           <DialogTitle>Select Parameters from Library</DialogTitle>
//           <DialogContent>
//             {availableParamsForSelection.length > 0 ? (
//                 <FormControl component="fieldset" variant="standard">
//                   {availableParamsForSelection.map((param) => (
//                     <FormControlLabel
//                       key={param}
//                       control={
//                         <Checkbox
//                           checked={selectedLibraryParameters.includes(param)}
//                           onChange={handleLibraryParameterSelect}
//                           value={param}
//                         />
//                       }
//                       label={param}
//                     />
//                   ))}
//                 </FormControl>
//               ) : (
//                 <Typography>All available parameters have been added to this phase.</Typography>
//               )
//             }
//           </DialogContent>
//           <DialogActions>
//             <Button
//               onClick={() => {
//                 setOpenSelectParameterDialog(false)
//                 setSelectedLibraryParameters([])
//               }}
//             >
//               Cancel
//             </Button>
//             <Button onClick={handleAddSelectedParameters} variant="contained" disabled={selectedLibraryParameters.length === 0}>
//               Add Selected
//             </Button>
//           </DialogActions>
//         </Dialog>
 
//         <Dialog
//           open={openExtendDialog}
//           onClose={() => setOpenExtendDialog(false)}
//         >
//           <DialogTitle>Confirm Probation Extension</DialogTitle>
//           <DialogContent>
//             <Typography>
//               Are you sure you want to extend the probation for 3 months for <strong>{employeeName}</strong>?
//             </Typography>
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={() => setOpenExtendDialog(false)} color="primary">
//               No
//             </Button>
//             <Button onClick={handleConfirmExtend} color="primary" variant="contained">
//               Yes
//             </Button>
//           </DialogActions>
//         </Dialog>
//       </Paper>
//     </Container>
//   )
// }




// import { useState, useEffect } from "react"
// // ... (other imports remain the same)
// import {
//   Container,
//   Paper,
//   Typography,
//   Box,
//   Tabs,
//   Tab,
//   Button,
//   TextField,
//   Select,
//   MenuItem,
//   FormControl,
//   InputLabel,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Grid,
//   Card,
//   CardContent,
//   IconButton,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Alert,
//   Checkbox,
//   FormControlLabel,
// } from "@mui/material"
// import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon, Save as SaveIcon } from "@mui/icons-material"

// // ... (constants like designations, employeesData, etc. remain the same)
// const designations = ["VSO", "Manager", "Senior Manager", "Director", "Customer Experience Executive"]

// const employeesData = [
//   { id: 1, name: "Alice Johnson", designation: "VSO" },
//   { id: 2, name: "Bob Williams", designation: "VSO" },
//   { id: 3, name: "Charlie Brown", designation: "Manager" },
//   { id: 4, name: "Diana Miller", designation: "Senior Manager" },
//   { id: 5, name: "Ethan Davis", designation: "Director" },
//   { id: 6, name: "Fiona Garcia", designation: "Manager" },
//   { id: 494, name: "Ambika Test. Mitkari", designation: "Customer Experience Executive" },
// ]

// const defaultParameters = {
//   phase1: ["Onboarding documentation completed within 5 days", "Attendance/punctuality in reporting & compliance"],
//   phase2: ["Understanding customer coverage plan", "Participation in team meetings", "Customer complaint handling"],
//   phase3: ["Call average", "Quality of work", "Competencies"],
//   phase4: ["Business head feedback score", "Final performance review rating as per VetHR"],
// }

// const defaultParameterLibrary = [
//   "Onboarding documentation completed within 5 days",
//   "Attendance/punctuality in reporting & compliance",
//   "Understanding customer coverage plan",
//   "Participation in team meetings",
//   "Customer complaint handling",
//   "Call average",
//   "Quality of work",
//   "Competencies",
//   "Business head feedback score",
//   "Final performance review rating as per VetHR",
//   "Teamwork and Collaboration",
//   "Communication Skills",
//   "Problem-Solving Abilities",
//   "Adaptability and Flexibility",
//   "Time Management",
// ]

// function TabPanel({ children, value, index, ...other }) {
//   return (
//     <div role="tabpanel" hidden={value !== index} id={`tabpanel-${index}`} aria-labelledby={`tab-${index}`} {...other}>
//       {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
//     </div>
//   )
// }

// export default function PerformanceManagement() {
//   const [activeTab, setActiveTab] = useState(0)
//   const [selectedDesignation, setSelectedDesignation] = useState("")
//   const [selectedEmployee, setSelectedEmployee] = useState("")
//   const [filteredEmployees, setFilteredEmployees] = useState([])
//   const [parameters, setParameters] = useState(defaultParameters)
//   const [ratings, setRatings] = useState({ phase1: {}, phase2: {}, phase3: {}, phase4: {} })
//   const [comments, setComments] = useState({
//     phase1: { lineManager: "", head: "", hr: "" },
//     phase2: { lineManager: "", head: "", hr: "" },
//     phase3: { lineManager: "", head: "", hr: "" },
//     phase4: { lineManager: "", head: "", hr: "" },
//   })

//   const [editingParameter, setEditingParameter] = useState(null)
//   const [currentPhase, setCurrentPhase] = useState("phase1")

//   const [parameterLibrary, setParameterLibrary] = useState(defaultParameterLibrary)
//   const [openAddLibraryDialog, setOpenAddLibraryDialog] = useState(false)
//   const [newLibraryParameter, setNewLibraryParameter] = useState("")

//   const [openSelectParameterDialog, setOpenSelectParameterDialog] = useState(false)
//   const [selectedLibraryParameters, setSelectedLibraryParameters] = useState([])

//   const [openExtendDialog, setOpenExtendDialog] = useState(false)
//   const [probationExtended, setProbationExtended] = useState(false)

//   const [apiPerformanceData, setApiPerformanceData] = useState(null)

//   useEffect(() => {
//     const fetchPerformanceData = async () => {
//       if (selectedEmployee) {
//         try {
//           const response = await fetch(
//             `https://tdtlworld.com/hrms-backend/apis/get_employee_overall_phasewise/?user_id=${selectedEmployee}`
//           )
//           const result = await response.json()
//           if (result.status === "success") {
//             setApiPerformanceData(result.data)
//           } else {
//             console.error("Failed to fetch performance data:", result)
//             setApiPerformanceData(null)
//           }
//         } catch (error) {
//           console.error("Error fetching performance data:", error)
//           setApiPerformanceData(null)
//         }
//       } else {
//         setApiPerformanceData(null)
//       }
//     }

//     fetchPerformanceData()
//   }, [selectedEmployee])

//   const resetFormState = () => {
//     setRatings({ phase1: {}, phase2: {}, phase3: {}, phase4: {} })
//     setComments({
//       phase1: { lineManager: "", head: "", hr: "" },
//       phase2: { lineManager: "", head: "", hr: "" },
//       phase3: { lineManager: "", head: "", hr: "" },
//       phase4: { lineManager: "", head: "", hr: "" },
//     })
//     setParameters(defaultParameters)
//     setActiveTab(0)
//     setProbationExtended(false)
//   }

//   const handleDesignationChange = (event) => {
//     const designation = event.target.value
//     setSelectedDesignation(designation)
//     const relevantEmployees = employeesData.filter((emp) => emp.designation === designation)
//     setFilteredEmployees(relevantEmployees)
//     setSelectedEmployee("")
//     resetFormState()
//   }

//   const handleEmployeeChange = (event) => {
//     const employeeId = event.target.value
//     setSelectedEmployee(employeeId)
//     resetFormState()
//   }

//   const handleTabChange = (event, newValue) => {
//     setActiveTab(newValue)
//   }

//   const handleFinalAction = (action) => {
//     const employee = employeesData.find((e) => e.id === selectedEmployee)
//     const message = `Action: ${action.toUpperCase()} for employee ${employee?.name}.`
//     console.log(message)
//     alert(message)
//   }

//   const handleConfirmExtend = () => {
//     const message = `The probation has been extended by 3 months.`
//     console.log(message)
//     alert(message)
//     setProbationExtended(true)
//     setOpenExtendDialog(false)
//   }

//   const calculateAverage = (lineManager, head, hr) => {
//     const values = [lineManager, head, hr].filter((val) => val && !isNaN(val))
//     if (values.length === 0) return 0
//     const sum = values.reduce((sum, val) => sum + Number.parseFloat(val), 0)
//     const average = sum / values.length
//     return average.toFixed(1)
//   }

//   const calculatePhaseTotal = (phase) => {
//     const phaseParams = parameters[phase] || []
//     let lineManagerTotal = 0,
//       headTotal = 0,
//       hrTotal = 0
//     let lmCount = 0,
//       headCount = 0,
//       hrCount = 0

//     phaseParams.forEach((param, index) => {
//       const rating = ratings[phase][index] || {}
//       if (rating.lineManager && !isNaN(rating.lineManager)) {
//         lineManagerTotal += Number.parseFloat(rating.lineManager)
//         lmCount++
//       }
//       if (rating.head && !isNaN(rating.head)) {
//         headTotal += Number.parseFloat(rating.head)
//         headCount++
//       }
//       if (rating.hr && !isNaN(rating.hr)) {
//         hrTotal += Number.parseFloat(rating.hr)
//         hrCount++
//       }
//     })

//     return {
//       lineManager: lmCount > 0 ? (lineManagerTotal / lmCount).toFixed(1) : 0,
//       head: headCount > 0 ? (headTotal / headCount).toFixed(1) : 0,
//       hr: hrCount > 0 ? (hrTotal / hrCount).toFixed(1) : 0,
//     }
//   }

//   const updateRating = (phase, paramIndex, rater, value) => {
//     const numericValue = value.replace(/[^0-9.]/g, "")
//     if (numericValue === "" || (Number(numericValue) >= 1 && Number(numericValue) <= 10)) {
//       setRatings((prev) => ({
//         ...prev,
//         [phase]: {
//           ...prev[phase],
//           [paramIndex]: {
//             ...prev[phase][paramIndex],
//             [rater]: numericValue,
//           },
//         },
//       }))
//     }
//   }

//   const updateComment = (phase, rater, value) => {
//     setComments((prev) => ({
//       ...prev,
//       [phase]: {
//         ...prev[phase],
//         [rater]: value,
//       },
//     }))
//   }

//   const handleAddParameterToLibrary = () => {
//     const trimmedParam = newLibraryParameter.trim()
//     if (trimmedParam && !parameterLibrary.includes(trimmedParam)) {
//       setParameterLibrary((prev) => [...prev, trimmedParam])
//       setNewLibraryParameter("")
//       setOpenAddLibraryDialog(false)
//     } else {
//       alert("Parameter cannot be empty or a duplicate.")
//     }
//   }

//   const editParameter = (phase, index, newValue) => {
//     setParameters((prev) => ({
//       ...prev,
//       [phase]: prev[phase].map((param, i) => (i === index ? newValue : param)),
//     }))
//   }

//   const deleteParameter = (phase, index) => {
//     setParameters((prev) => ({
//       ...prev,
//       [phase]: prev[phase].filter((_, i) => i !== index),
//     }))
//     setRatings((prev) => {
//       const newPhaseRatings = { ...prev[phase] }
//       delete newPhaseRatings[index]
//       return { ...prev, [phase]: newPhaseRatings }
//     })
//   }

//   const handleLibraryParameterSelect = (event) => {
//     const { value, checked } = event.target
//     if (checked) {
//       setSelectedLibraryParameters((prev) => [...prev, value])
//     } else {
//       setSelectedLibraryParameters((prev) => prev.filter((param) => param !== value))
//     }
//   }

//   const handleAddSelectedParameters = () => {
//     if (selectedLibraryParameters.length > 0) {
//       setParameters((prev) => ({
//         ...prev,
//         [currentPhase]: [...prev[currentPhase], ...selectedLibraryParameters],
//       }))
//     }
//     setOpenSelectParameterDialog(false)
//     setSelectedLibraryParameters([])
//   }

//   const getOverallPerformance = () => {
//     const phases = ["phase1", "phase2", "phase3", "phase4"]
//     let totalLineManager = 0,
//       totalHead = 0,
//       totalHr = 0,
//       phaseCount = 0

//     phases.forEach((phase) => {
//       const phaseTotal = calculatePhaseTotal(phase)
//       const hasRatings =
//         Number.parseFloat(phaseTotal.lineManager) > 0 ||
//         Number.parseFloat(phaseTotal.head) > 0 ||
//         Number.parseFloat(phaseTotal.hr) > 0

//       if (hasRatings) {
//         totalLineManager += Number.parseFloat(phaseTotal.lineManager) || 0
//         totalHead += Number.parseFloat(phaseTotal.head) || 0
//         totalHr += Number.parseFloat(phaseTotal.hr) || 0
//         phaseCount++
//       }
//     })

//     if (phaseCount === 0) {
//       return { lineManager: "0.0", head: "0.0", hr: "0.0", average: "0.0" }
//     }

//     const overallAverage = calculateAverage(
//       (totalLineManager / phaseCount).toFixed(1),
//       (totalHead / phaseCount).toFixed(1),
//       (totalHr / phaseCount).toFixed(1)
//     )

//     return {
//       lineManager: (totalLineManager / phaseCount).toFixed(1),
//       head: (totalHead / phaseCount).toFixed(1),
//       hr: (totalHr / phaseCount).toFixed(1),
//       average: overallAverage,
//     }
//   }

//   const getRecommendation = () => {
//     const overall = getOverallPerformance()
//     const avgScore = Number.parseFloat(overall.average)

//     if (avgScore >= 8) return { type: "Confirm", color: "success" }
//     if (avgScore >= 6) return { type: "Extend", color: "warning" }
//     return { type: "Terminate", color: "error" }
//   }

//   const renderPhaseTable = (phase, phaseTitle, dayRange) => {
//     const phaseParams = parameters[phase] || []
//     const phaseTotal = calculatePhaseTotal(phase)

//     return (
//       <Card style={{ marginBottom: "20px" }}>
//         <CardContent>
//           <Box style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
//             <Typography variant="h6" style={{ color: "#1976d2", fontWeight: "bold" }}>
//               {phaseTitle} ({dayRange})
//             </Typography>
//             <Button
//               variant="outlined"
//               startIcon={<AddIcon />}
//               onClick={() => {
//                 setCurrentPhase(phase)
//                 setOpenSelectParameterDialog(true)
//               }}
//               style={{ borderColor: "#1976d2", color: "#1976d2" }}
//             >
//               Select Parameter
//             </Button>
//           </Box>

//           <TableContainer component={Paper} style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
//             <Table>
//               <TableHead style={{ backgroundColor: "#f5f5f5" }}>
//                 <TableRow>
//                   <TableCell style={{ fontWeight: "bold", width: "5%" }}>Sr. No.</TableCell>
//                   <TableCell style={{ fontWeight: "bold", width: "35%" }}>Parameters</TableCell>
//                   <TableCell style={{ fontWeight: "bold", textAlign: "center", width: "15%" }}>Line Manager</TableCell>
//                   <TableCell style={{ fontWeight: "bold", textAlign: "center", width: "15%" }}>Head</TableCell>
//                   <TableCell style={{ fontWeight: "bold", textAlign: "center", width: "15%" }}>HR</TableCell>
//                   <TableCell style={{ fontWeight: "bold", textAlign: "center", width: "10%" }}>Average</TableCell>
//                   <TableCell style={{ fontWeight: "bold", textAlign: "center", width: "5%" }}>Actions</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {phaseParams.map((param, index) => {
//                   const rating = ratings[phase][index] || {}
//                   const average = calculateAverage(rating.lineManager, rating.head, rating.hr)

//                   return (
//                     <TableRow key={index} style={{ backgroundColor: index % 2 === 0 ? "#fafafa" : "white" }}>
//                       <TableCell>{index + 1}</TableCell>
//                       <TableCell>
//                         {editingParameter === `${phase}-${index}` ? (
//                           <TextField
//                             defaultValue={param}
//                             onBlur={(e) => {
//                               editParameter(phase, index, e.target.value)
//                               setEditingParameter(null)
//                             }}
//                             onKeyPress={(e) => {
//                               if (e.key === "Enter") {
//                                 editParameter(phase, index, e.target.value)
//                                 setEditingParameter(null)
//                               }
//                             }}
//                             fullWidth
//                             size="small"
//                             autoFocus
//                           />
//                         ) : (
//                           param
//                         )}
//                       </TableCell>
//                       <TableCell style={{ textAlign: "center" }}>
//                         <TextField
//                           disabled
//                           type="number"
//                           inputProps={{ min: 1, max: 10, step: "0.1" }}
//                           value={rating.lineManager || ""}
//                           onChange={(e) => updateRating(phase, index, "lineManager", e.target.value)}
//                           size="small"
//                           style={{ width: "60px" }}
//                         />
//                       </TableCell>
//                       <TableCell style={{ textAlign: "center" }}>
//                         <TextField
//                           disabled
//                           type="number"
//                           inputProps={{ min: 1, max: 10, step: "0.1" }}
//                           value={rating.head || ""}
//                           onChange={(e) => updateRating(phase, index, "head", e.target.value)}
//                           size="small"
//                           style={{ width: "60px" }}
//                         />
//                       </TableCell>
//                       <TableCell style={{ textAlign: "center" }}>
//                         <TextField
//                           type="number"
//                           inputProps={{ min: 1, max: 10, step: "0.1" }}
//                           value={rating.hr || ""}
//                           onChange={(e) => updateRating(phase, index, "hr", e.target.value)}
//                           size="small"
//                           style={{ width: "60px" }}
//                         />
//                       </TableCell>
//                       <TableCell style={{ textAlign: "center", fontWeight: "bold", color: "#1976d2" }}>
//                         {average}
//                       </TableCell>
//                       <TableCell style={{ textAlign: "center" }}>
//                         <IconButton
//                           size="small"
//                           onClick={() => setEditingParameter(`${phase}-${index}`)}
//                           style={{ color: "#1976d2" }}
//                         >
//                           <EditIcon />
//                         </IconButton>
//                         <IconButton
//                           size="small"
//                           onClick={() => deleteParameter(phase, index)}
//                           style={{ color: "#d32f2f" }}
//                         >
//                           <DeleteIcon />
//                         </IconButton>
//                       </TableCell>
//                     </TableRow>
//                   )
//                 })}
//                 <TableRow style={{ backgroundColor: "#e3f2fd" }}>
//                   <TableCell colSpan={2} style={{ fontWeight: "bold" }}>
//                     Total
//                   </TableCell>
//                   <TableCell style={{ textAlign: "center", fontWeight: "bold" }}>{phaseTotal.lineManager}</TableCell>
//                   <TableCell style={{ textAlign: "center", fontWeight: "bold" }}>{phaseTotal.head}</TableCell>
//                   <TableCell style={{ textAlign: "center", fontWeight: "bold" }}>{phaseTotal.hr}</TableCell>
//                   <TableCell style={{ textAlign: "center", fontWeight: "bold", color: "#1976d2" }}>
//                     {calculateAverage(phaseTotal.lineManager, phaseTotal.head, phaseTotal.hr)}
//                   </TableCell>
//                   <TableCell></TableCell>
//                 </TableRow>
//               </TableBody>
//             </Table>
//           </TableContainer>

//           <Grid container spacing={2} style={{ marginTop: "20px" }}>
//             <Grid item xs={12} md={4}>
//               <TextField
//                 disabled
//                 label="Line Manager Comments"
//                 multiline
//                 rows={3}
//                 fullWidth
//                 value={comments[phase].lineManager}
//                 onChange={(e) => updateComment(phase, "lineManager", e.target.value)}
//                 variant="outlined"
//               />
//             </Grid>
//             <Grid item xs={12} md={4}>
//               <TextField
//                 disabled
//                 label="Head Comments"
//                 multiline
//                 rows={3}
//                 fullWidth
//                 value={comments[phase].head}
//                 onChange={(e) => updateComment(phase, "head", e.target.value)}
//                 variant="outlined"
//               />
//             </Grid>
//             <Grid item xs={12} md={4}>
//               <TextField
//                 label="HR Comments"
//                 multiline
//                 rows={3}
//                 fullWidth
//                 value={comments[phase].hr}
//                 onChange={(e) => updateComment(phase, "hr", e.target.value)}
//                 variant="outlined"
//               />
//             </Grid>
//           </Grid>

//           <Box style={{ textAlign: "center", marginTop: "20px" }}>
//             <Button variant="contained" startIcon={<SaveIcon />} style={{ backgroundColor: "#1976d2", color: "white" }}>
//               Save {phaseTitle}
//             </Button>
//           </Box>
//         </CardContent>
//       </Card>
//     )
//   }

//   const renderOverallAnalysis = () => {
//     const overall = getOverallPerformance()
//     const recommendation = getRecommendation()
//     const achievementPercentage = (Number.parseFloat(overall.average) * 10).toFixed(0)

//     const overallApiLm =
//       (apiPerformanceData?.phase1_lm || 0) +
//       (apiPerformanceData?.phase2_lm || 0) +
//       (apiPerformanceData?.phase3_lm || 0) +
//       (apiPerformanceData?.phase4_lm || 0)
//     const overallApiHead =
//       (apiPerformanceData?.phase1_head || 0) +
//       (apiPerformanceData?.phase2_head || 0) +
//       (apiPerformanceData?.phase3_head || 0) +
//       (apiPerformanceData?.phase4_head || 0)
//     const overallApiHr =
//       (apiPerformanceData?.phase1_hr || 0) +
//       (apiPerformanceData?.phase2_hr || 0) +
//       (apiPerformanceData?.phase3_hr || 0) +
//       (apiPerformanceData?.phase4_hr || 0)

//     const phaseApiData = [
//       {
//         name: "Align",
//         lm: apiPerformanceData?.phase1_lm,
//         head: apiPerformanceData?.phase1_head,
//         hr: apiPerformanceData?.phase1_hr,
//       },
//       {
//         name: "Accelerate",
//         lm: apiPerformanceData?.phase2_lm,
//         head: apiPerformanceData?.phase2_head,
//         hr: apiPerformanceData?.phase2_hr,
//       },
//       {
//         name: "Achieve",
//         lm: apiPerformanceData?.phase3_lm,
//         head: apiPerformanceData?.phase3_head,
//         hr: apiPerformanceData?.phase3_hr,
//       },
//       {
//         name: "Aspire",
//         lm: apiPerformanceData?.phase4_lm,
//         head: apiPerformanceData?.phase4_head,
//         hr: apiPerformanceData?.phase4_hr,
//       },
//     ]

//     return (
//       <Card>
//         <CardContent>
//           <Typography variant="h5" style={{ marginBottom: "20px", color: "#1976d2", fontWeight: "bold" }}>
//             Performance Analysis Summary
//           </Typography>

//           <Grid container spacing={3}>
//             <Grid item xs={12} md={6}>
//               <Card style={{ backgroundColor: "#f8f9fa", border: "1px solid #dee2e6", height: "100%" }}>
//                 <CardContent>
//                   <Typography variant="h6" style={{ marginBottom: "15px", color: "#495057" }}>
//                     Phase-wise Performance
//                   </Typography>
//                   <TableContainer>
//                     <Table size="small">
//                       <TableHead>
//                         <TableRow>
//                           <TableCell style={{ fontWeight: "bold" }}>Phase</TableCell>
//                           <TableCell style={{ fontWeight: "bold", textAlign: "center" }}>Line Manager</TableCell>
//                           <TableCell style={{ fontWeight: "bold", textAlign: "center" }}>Head</TableCell>
//                           <TableCell style={{ fontWeight: "bold", textAlign: "center" }}>HR</TableCell>
//                           <TableCell style={{ fontWeight: "bold", textAlign: "center" }}>Total</TableCell>
//                         </TableRow>
//                       </TableHead>
//                       <TableBody>
//                         {apiPerformanceData ? (
//                           <>
//                             {phaseApiData.map((phase) => (
//                               <TableRow key={phase.name}>
//                                 <TableCell>{phase.name}</TableCell>
//                                 <TableCell style={{ textAlign: "center" }}>{phase.lm?.toFixed(1) || "0.0"}</TableCell>
//                                 <TableCell style={{ textAlign: "center" }}>{phase.head?.toFixed(1) || "0.0"}</TableCell>
//                                 <TableCell style={{ textAlign: "center" }}>{phase.hr?.toFixed(1) || "0.0"}</TableCell>
//                                 <TableCell style={{ textAlign: "center", fontWeight: "bold" }}>
//                                   {calculateAverage(phase.lm, phase.head, phase.hr)}
//                                 </TableCell>
//                               </TableRow>
//                             ))}
//                             <TableRow style={{ backgroundColor: "#e3f2fd" }}>
//                               <TableCell style={{ fontWeight: "bold" }}>Overall</TableCell>
//                               <TableCell style={{ textAlign: "center", fontWeight: "bold" }}>
//                                 {overallApiLm.toFixed(1)}
//                               </TableCell>
//                               <TableCell style={{ textAlign: "center", fontWeight: "bold" }}>
//                                 {overallApiHead.toFixed(1)}
//                               </TableCell>
//                               <TableCell style={{ textAlign: "center", fontWeight: "bold" }}>
//                                 {overallApiHr.toFixed(1)}
//                               </TableCell>
//                               <TableCell style={{ textAlign: "center", fontWeight: "bold", color: "#1976d2" }}>
//                                 {calculateAverage(overallApiLm, overallApiHead, overallApiHr)}
//                               </TableCell>
//                             </TableRow>
//                           </>
//                         ) : (
//                           <TableRow>
//                             <TableCell colSpan={5} style={{ textAlign: "center" }}>
//                               {selectedEmployee ? "Loading performance data..." : "No data to display."}
//                             </TableCell>
//                           </TableRow>
//                         )}
//                       </TableBody>
//                     </Table>
//                   </TableContainer>
//                 </CardContent>
//               </Card>
//             </Grid>

//             <Grid item xs={12} md={6}>
//               <Card style={{ backgroundColor: "#f8f9fa", border: "1px solid #dee2e6", height: "100%" }}>
//                 <CardContent>
//                   <Typography variant="h6" style={{ marginBottom: "15px", color: "#495057" }}>
//                     Final Recommendation
//                   </Typography>
//                   <Box style={{ marginBottom: "15px" }}>
//                     <Typography variant="body2" style={{ marginBottom: "5px" }}>
//                       Performance Analysis (Live Form): <strong>{overall.average}</strong>
//                     </Typography>
//                     <Typography variant="body2" style={{ marginBottom: "5px" }}>
//                       KPI + KRA Average: <strong>N/A</strong>
//                     </Typography>
//                     <Typography variant="body2" style={{ marginBottom: "15px" }}>
//                       Achievement Percentage: <strong>{achievementPercentage}%</strong>
//                     </Typography>
//                   </Box>

//                   <Alert severity={recommendation.color} style={{ marginBottom: "15px" }}>
//                     <Typography variant="h6">HR Recommendation: {recommendation.type}</Typography>
//                   </Alert>

//                   <Box
//                     style={{ padding: "10px", backgroundColor: "#fff", borderRadius: "4px", border: "1px solid #ddd" }}
//                   >
//                     <Typography variant="body2" style={{ fontSize: "12px", color: "#666" }}>
//                       <strong>Note:</strong> Automatic applicable from date of joining to 6 months after date of
//                       joining. If line manager is not available, average of head and HR is considered.
//                     </Typography>
//                   </Box>
//                 </CardContent>
//               </Card>
//             </Grid>
//           </Grid>

//           <Grid container spacing={2} style={{ marginTop: "20px" }}>
//             <Grid item xs={12} md={4}>
//               <TextField
//                 disabled
//                 label="Line Manager Final Comments"
//                 multiline
//                 rows={4}
//                 fullWidth
//                 variant="outlined"
//               />
//             </Grid>
//             <Grid item xs={12} md={4}>
//               <TextField
//                 disabled
//                 label="Head Final Comments"
//                 multiline
//                 rows={4}
//                 fullWidth
//                 variant="outlined"
//               />
//             </Grid>
//             <Grid item xs={12} md={4}>
//               <TextField label="HR Final Comments" multiline rows={4} fullWidth variant="outlined" />
//             </Grid>
//           </Grid>
//           <Box
//             sx={{
//               display: "flex",
//               justifyContent: "center",
//               gap: 2,
//               flexWrap: "wrap",
//               marginTop: "30px",
//               paddingTop: "20px",
//               borderTop: "1px solid #e0e0e0",
//             }}
//           >
//             <Button
//               variant={recommendation.type === "Confirm" ? "contained" : "outlined"}
//               color="success"
//               size="large"
//               onClick={() => handleFinalAction("Confirm")}
//             >
//               CONFIRM EMPLOYEE
//             </Button>

//             {!probationExtended && (
//               <Button
//                 variant={recommendation.type === "Extend" ? "contained" : "outlined"}
//                 color="warning"
//                 size="large"
//                 onClick={() => setOpenExtendDialog(true)}
//               >
//                 EXTEND PROBATION
//               </Button>
//             )}

//             <Button
//               variant={recommendation.type === "Terminate" ? "contained" : "outlined"}
//               color="error"
//               size="large"
//               onClick={() => handleFinalAction("Terminate")}
//             >
//               TERMINATE EMPLOYEE
//             </Button>
//           </Box>
//         </CardContent>
//       </Card>
//     )
//   }

//   const availableParamsForSelection = parameterLibrary.filter((p) => !parameters[currentPhase]?.includes(p))
//   const employeeName = employeesData.find((e) => e.id === selectedEmployee)?.name || "the employee"

//   return (
//     <Container maxWidth="xl" style={{ padding: "20px" }}>
//       <Paper style={{ padding: "20px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
//         <Typography
//           variant="h4"
//           style={{
//             textAlign: "center",
//             marginBottom: "30px",
//             color: "#1976d2",
//             fontWeight: "bold",
//             borderBottom: "2px solid #1976d2",
//             paddingBottom: "10px",
//           }}
//         >
//           4A - Align, Accelerate, Achieve & Aspire Program
//         </Typography>

//         <Grid container spacing={2} alignItems="center" style={{ marginBottom: "30px" }}>
//           <Grid item xs={12} sm={4} md={3}>
//             <FormControl fullWidth>
//               <InputLabel id="designation-select-label">Select Designation</InputLabel>
//               <Select
//                 labelId="designation-select-label"
//                 value={selectedDesignation}
//                 onChange={handleDesignationChange}
//                 label="Select Designation"
//               >
//                 {designations.map((designation) => (
//                   <MenuItem key={designation} value={designation}>
//                     {designation}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//           </Grid>
//           <Grid item xs={12} sm={4} md={3}>
//             <FormControl fullWidth disabled={!selectedDesignation}>
//               <InputLabel id="employee-select-label">Select Employee</InputLabel>
//               <Select
//                 labelId="employee-select-label"
//                 value={selectedEmployee}
//                 onChange={handleEmployeeChange}
//                 label="Select Employee"
//               >
//                 {filteredEmployees.map((employee) => (
//                   <MenuItem key={employee.id} value={employee.id}>
//                     {employee.name}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//           </Grid>
//           <Grid item xs={12} sm={4} md={3}>
//             <Button
//               fullWidth
//               variant="contained"
//               onClick={() => setOpenAddLibraryDialog(true)}
//               disabled={!selectedEmployee}
//               startIcon={<AddIcon />}
//             >
//               Add Parameter to Library
//             </Button>
//           </Grid>
//         </Grid>

//         {selectedEmployee && (
//           <>
//             <Tabs
//               value={activeTab}
//               onChange={handleTabChange}
//               variant="scrollable"
//               scrollButtons="auto"
//               aria-label="performance-review-tabs"
//               style={{ borderBottom: "1px solid #ddd", marginBottom: "20px" }}
//             >
//               <Tab label="Phase 1: Align" id="tab-0" aria-controls="tabpanel-0" />
//               <Tab label="Phase 2: Accelerate" id="tab-1" aria-controls="tabpanel-1" />
//               <Tab label="Phase 3: Achieve" id="tab-2" aria-controls="tabpanel-2" />
//               <Tab label="Phase 4: Aspire" id="tab-3" aria-controls="tabpanel-3" />
//               <Tab label="Overall Analysis" id="tab-4" aria-controls="tabpanel-4" />
//             </Tabs>

//             <TabPanel value={activeTab} index={0}>
//               {renderPhaseTable("phase1", "Phase 1: Align", "Day 1 to 30")}
//             </TabPanel>

//             <TabPanel value={activeTab} index={1}>
//               {renderPhaseTable("phase2", "Phase 2: Accelerate", "Day 30 to 60")}
//             </TabPanel>

//             <TabPanel value={activeTab} index={2}>
//               {renderPhaseTable("phase3", "Phase 3: Achieve", "Day 60 to 90")}
//             </TabPanel>

//             <TabPanel value={activeTab} index={3}>
//               {renderPhaseTable("phase4", "Phase 4: Aspire", "Day 90 to 180")}
//             </TabPanel>

//             <TabPanel value={activeTab} index={4}>
//               {renderOverallAnalysis()}
//             </TabPanel>
//           </>
//         )}

//         <Dialog open={openAddLibraryDialog} onClose={() => setOpenAddLibraryDialog(false)}>
//           <DialogTitle>Add New Parameter to Library</DialogTitle>
//           <DialogContent>
//             <TextField
//               autoFocus
//               margin="dense"
//               label="Parameter Description"
//               fullWidth
//               variant="outlined"
//               value={newLibraryParameter}
//               onChange={(e) => setNewLibraryParameter(e.target.value)}
//               onKeyPress={(e) => e.key === "Enter" && handleAddParameterToLibrary()}
//             />
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={() => setOpenAddLibraryDialog(false)}>Cancel</Button>
//             <Button onClick={handleAddParameterToLibrary} variant="contained">
//               Add to Library
//             </Button>
//           </DialogActions>
//         </Dialog>

//         <Dialog
//           open={openSelectParameterDialog}
//           onClose={() => setOpenSelectParameterDialog(false)}
//           fullWidth
//           maxWidth="sm"
//         >
//           <DialogTitle>Select Parameters from Library</DialogTitle>
//           <DialogContent>
//             {availableParamsForSelection.length > 0 ? (
//               <FormControl component="fieldset" variant="standard">
//                 {availableParamsForSelection.map((param) => (
//                   <FormControlLabel
//                     key={param}
//                     control={
//                       <Checkbox
//                         checked={selectedLibraryParameters.includes(param)}
//                         onChange={handleLibraryParameterSelect}
//                         value={param}
//                       />
//                     }
//                     label={param}
//                   />
//                 ))}
//               </FormControl>
//             ) : (
//               <Typography>All available parameters have been added to this phase.</Typography>
//             )}
//           </DialogContent>
//           <DialogActions>
//             <Button
//               onClick={() => {
//                 setOpenSelectParameterDialog(false)
//                 setSelectedLibraryParameters([])
//               }}
//             >
//               Cancel
//             </Button>
//             <Button
//               onClick={handleAddSelectedParameters}
//               variant="contained"
//               disabled={selectedLibraryParameters.length === 0}
//             >
//               Add Selected
//             </Button>
//           </DialogActions>
//         </Dialog>

//         <Dialog open={openExtendDialog} onClose={() => setOpenExtendDialog(false)}>
//           <DialogTitle>Confirm Probation Extension</DialogTitle>
//           <DialogContent>
//             <Typography>
//               Are you sure you want to extend the probation for 3 months for <strong>{employeeName}</strong>?
//             </Typography>
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={() => setOpenExtendDialog(false)} color="primary">
//               No
//             </Button>
//             <Button onClick={handleConfirmExtend} color="primary" variant="contained">
//               Yes
//             </Button>
//           </DialogActions>
//         </Dialog>
//       </Paper>
//     </Container>
//   )
// }









// import { useState, useEffect } from "react"
// import {
//   Container,
//   Paper,
//   Typography,
//   Box,
//   Tabs,
//   Tab,
//   Button,
//   TextField,
//   Select,
//   MenuItem,
//   FormControl,
//   InputLabel,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Grid,
//   Card,
//   CardContent,
//   IconButton,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Alert,
//   Checkbox,
//   FormControlLabel,
//   Skeleton, // Added for loading state
// } from "@mui/material"
// import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon, Save as SaveIcon } from "@mui/icons-material"

// // ... (constants like designations, employeesData, etc. remain the same)
// const designations = ["VSO", "Manager", "Senior Manager", "Director", "Customer Experience Executive"]

// const employeesData = [
//   { id: 1, name: "Alice Johnson", designation: "VSO" },
//   { id: 2, name: "Bob Williams", designation: "VSO" },
//   { id: 3, name: "Charlie Brown", designation: "Manager" },
//   { id: 4, name: "Diana Miller", designation: "Senior Manager" },
//   { id: 5, name: "Ethan Davis", designation: "Director" },
//   { id: 6, name: "Fiona Garcia", designation: "Manager" },
//   { id: 494, name: "Ambika Test. Mitkari", designation: "Customer Experience Executive" },
// ]

// const defaultParameters = {
//   phase1: ["Onboarding documentation completed within 5 days", "Attendance/punctuality in reporting & compliance"],
//   phase2: ["Understanding customer coverage plan", "Participation in team meetings", "Customer complaint handling"],
//   phase3: ["Call average", "Quality of work", "Competencies"],
//   phase4: ["Business head feedback score", "Final performance review rating as per VetHR"],
// }

// const defaultParameterLibrary = [
//   "Onboarding documentation completed within 5 days",
//   "Attendance/punctuality in reporting & compliance",
//   "Understanding customer coverage plan",
//   "Participation in team meetings",
//   "Customer complaint handling",
//   "Call average",
//   "Quality of work",
//   "Competencies",
//   "Business head feedback score",
//   "Final performance review rating as per VetHR",
//   "Teamwork and Collaboration",
//   "Communication Skills",
//   "Problem-Solving Abilities",
//   "Adaptability and Flexibility",
//   "Time Management",
// ]

// // Define theme colors for consistent use
// const themeColors = {
//   primary: "#8C257C",
//   primaryDark: "#6d1d60",
//   secondary: "#F58E35",
//   textOnPrimary: "#FFFFFF",
// }

// function TabPanel({ children, value, index, ...other }) {
//   return (
//     <div role="tabpanel" hidden={value !== index} id={`tabpanel-${index}`} aria-labelledby={`tab-${index}`} {...other}>
//       {value === index && <Box sx={{ p: { xs: 1, sm: 3 } }}>{children}</Box>}
//     </div>
//   )
// }

// export default function PerformanceManagement() {
//   const [activeTab, setActiveTab] = useState(0)
//   const [selectedDesignation, setSelectedDesignation] = useState("")
//   const [selectedEmployee, setSelectedEmployee] = useState("")
//   const [filteredEmployees, setFilteredEmployees] = useState([])
//   const [parameters, setParameters] = useState(defaultParameters)
//   const [ratings, setRatings] = useState({ phase1: {}, phase2: {}, phase3: {}, phase4: {} })
//   const [comments, setComments] = useState({
//     phase1: { lineManager: "", head: "", hr: "" },
//     phase2: { lineManager: "", head: "", hr: "" },
//     phase3: { lineManager: "", head: "", hr: "" },
//     phase4: { lineManager: "", head: "", hr: "" },
//   })

//   const [editingParameter, setEditingParameter] = useState(null)
//   const [currentPhase, setCurrentPhase] = useState("phase1")

//   const [parameterLibrary, setParameterLibrary] = useState(defaultParameterLibrary)
//   const [openAddLibraryDialog, setOpenAddLibraryDialog] = useState(false)
//   const [newLibraryParameter, setNewLibraryParameter] = useState("")

//   const [openSelectParameterDialog, setOpenSelectParameterDialog] = useState(false)
//   const [selectedLibraryParameters, setSelectedLibraryParameters] = useState([])

//   const [openExtendDialog, setOpenExtendDialog] = useState(false)
//   const [probationExtended, setProbationExtended] = useState(false)

//   const [apiPerformanceData, setApiPerformanceData] = useState(null)
//   const [isLoadingApiData, setIsLoadingApiData] = useState(false)

//   useEffect(() => {
//     const fetchPerformanceData = async () => {
//       if (selectedEmployee) {
//         setIsLoadingApiData(true)
//         setApiPerformanceData(null) // Clear previous data
//         try {
//           const response = await fetch(
//             `https://tdtlworld.com/hrms-backend/apis/get_employee_overall_phasewise/?user_id=${selectedEmployee}`
//           )
//           const result = await response.json()
//           if (result.status === "success") {
//             setApiPerformanceData(result.data)
//           } else {
//             console.error("Failed to fetch performance data:", result)
//             setApiPerformanceData(null)
//           }
//         } catch (error) {
//           console.error("Error fetching performance data:", error)
//           setApiPerformanceData(null)
//         } finally {
//           setIsLoadingApiData(false)
//         }
//       } else {
//         setApiPerformanceData(null)
//         setIsLoadingApiData(false)
//       }
//     }

//     fetchPerformanceData()
//   }, [selectedEmployee])

//   const resetFormState = () => {
//     setRatings({ phase1: {}, phase2: {}, phase3: {}, phase4: {} })
//     setComments({
//       phase1: { lineManager: "", head: "", hr: "" },
//       phase2: { lineManager: "", head: "", hr: "" },
//       phase3: { lineManager: "", head: "", hr: "" },
//       phase4: { lineManager: "", head: "", hr: "" },
//     })
//     setParameters(defaultParameters)
//     setActiveTab(0)
//     setProbationExtended(false)
//   }

//   const handleDesignationChange = (event) => {
//     const designation = event.target.value
//     setSelectedDesignation(designation)
//     const relevantEmployees = employeesData.filter((emp) => emp.designation === designation)
//     setFilteredEmployees(relevantEmployees)
//     setSelectedEmployee("")
//     resetFormState()
//   }

//   const handleEmployeeChange = (event) => {
//     const employeeId = event.target.value
//     setSelectedEmployee(employeeId)
//     resetFormState()
//   }

//   const handleTabChange = (event, newValue) => {
//     setActiveTab(newValue)
//   }

//   const handleFinalAction = (action) => {
//     const employee = employeesData.find((e) => e.id === selectedEmployee)
//     const message = `Action: ${action.toUpperCase()} for employee ${employee?.name}.`
//     console.log(message)
//     alert(message)
//   }

//   const handleConfirmExtend = () => {
//     const message = `The probation has been extended by 3 months.`
//     console.log(message)
//     alert(message)
//     setProbationExtended(true)
//     setOpenExtendDialog(false)
//   }

//   const calculateAverage = (lineManager, head, hr) => {
//     const values = [lineManager, head, hr].filter((val) => val && !isNaN(val))
//     if (values.length === 0) return 0
//     const sum = values.reduce((sum, val) => sum + Number.parseFloat(val), 0)
//     const average = sum / values.length
//     return average.toFixed(1)
//   }

//   const calculatePhaseTotal = (phase) => {
//     const phaseParams = parameters[phase] || []
//     let lineManagerTotal = 0,
//       headTotal = 0,
//       hrTotal = 0
//     let lmCount = 0,
//       headCount = 0,
//       hrCount = 0

//     phaseParams.forEach((param, index) => {
//       const rating = ratings[phase][index] || {}
//       if (rating.lineManager && !isNaN(rating.lineManager)) {
//         lineManagerTotal += Number.parseFloat(rating.lineManager)
//         lmCount++
//       }
//       if (rating.head && !isNaN(rating.head)) {
//         headTotal += Number.parseFloat(rating.head)
//         headCount++
//       }
//       if (rating.hr && !isNaN(rating.hr)) {
//         hrTotal += Number.parseFloat(rating.hr)
//         hrCount++
//       }
//     })

//     return {
//       lineManager: lmCount > 0 ? (lineManagerTotal / lmCount).toFixed(1) : 0,
//       head: headCount > 0 ? (headTotal / headCount).toFixed(1) : 0,
//       hr: hrCount > 0 ? (hrTotal / hrCount).toFixed(1) : 0,
//     }
//   }

//   const updateRating = (phase, paramIndex, rater, value) => {
//     const numericValue = value.replace(/[^0-9.]/g, "")
//     if (numericValue === "" || (Number(numericValue) >= 1 && Number(numericValue) <= 10)) {
//       setRatings((prev) => ({
//         ...prev,
//         [phase]: {
//           ...prev[phase],
//           [paramIndex]: {
//             ...prev[phase][paramIndex],
//             [rater]: numericValue,
//           },
//         },
//       }))
//     }
//   }

//   const updateComment = (phase, rater, value) => {
//     setComments((prev) => ({
//       ...prev,
//       [phase]: {
//         ...prev[phase],
//         [rater]: value,
//       },
//     }))
//   }

//   const handleAddParameterToLibrary = () => {
//     const trimmedParam = newLibraryParameter.trim()
//     if (trimmedParam && !parameterLibrary.includes(trimmedParam)) {
//       setParameterLibrary((prev) => [...prev, trimmedParam])
//       setNewLibraryParameter("")
//       setOpenAddLibraryDialog(false)
//     } else {
//       alert("Parameter cannot be empty or a duplicate.")
//     }
//   }

//   const editParameter = (phase, index, newValue) => {
//     setParameters((prev) => ({
//       ...prev,
//       [phase]: prev[phase].map((param, i) => (i === index ? newValue : param)),
//     }))
//   }

//   const deleteParameter = (phase, index) => {
//     setParameters((prev) => ({
//       ...prev,
//       [phase]: prev[phase].filter((_, i) => i !== index),
//     }))
//     setRatings((prev) => {
//       const newPhaseRatings = { ...prev[phase] }
//       delete newPhaseRatings[index]
//       return { ...prev, [phase]: newPhaseRatings }
//     })
//   }

//   const handleLibraryParameterSelect = (event) => {
//     const { value, checked } = event.target
//     if (checked) {
//       setSelectedLibraryParameters((prev) => [...prev, value])
//     } else {
//       setSelectedLibraryParameters((prev) => prev.filter((param) => param !== value))
//     }
//   }

//   const handleAddSelectedParameters = () => {
//     if (selectedLibraryParameters.length > 0) {
//       setParameters((prev) => ({
//         ...prev,
//         [currentPhase]: [...prev[currentPhase], ...selectedLibraryParameters],
//       }))
//     }
//     setOpenSelectParameterDialog(false)
//     setSelectedLibraryParameters([])
//   }

//   const getOverallPerformance = () => {
//     const phases = ["phase1", "phase2", "phase3", "phase4"]
//     let totalLineManager = 0,
//       totalHead = 0,
//       totalHr = 0,
//       phaseCount = 0

//     phases.forEach((phase) => {
//       const phaseTotal = calculatePhaseTotal(phase)
//       const hasRatings =
//         Number.parseFloat(phaseTotal.lineManager) > 0 ||
//         Number.parseFloat(phaseTotal.head) > 0 ||
//         Number.parseFloat(phaseTotal.hr) > 0

//       if (hasRatings) {
//         totalLineManager += Number.parseFloat(phaseTotal.lineManager) || 0
//         totalHead += Number.parseFloat(phaseTotal.head) || 0
//         totalHr += Number.parseFloat(phaseTotal.hr) || 0
//         phaseCount++
//       }
//     })

//     if (phaseCount === 0) {
//       return { lineManager: "0.0", head: "0.0", hr: "0.0", average: "0.0" }
//     }

//     const overallAverage = calculateAverage(
//       (totalLineManager / phaseCount).toFixed(1),
//       (totalHead / phaseCount).toFixed(1),
//       (totalHr / phaseCount).toFixed(1)
//     )

//     return {
//       lineManager: (totalLineManager / phaseCount).toFixed(1),
//       head: (totalHead / phaseCount).toFixed(1),
//       hr: (totalHr / phaseCount).toFixed(1),
//       average: overallAverage,
//     }
//   }

//   const getRecommendation = () => {
//     const overall = getOverallPerformance()
//     const avgScore = Number.parseFloat(overall.average)

//     if (avgScore >= 8) return { type: "Confirm", color: "success" }
//     if (avgScore >= 6) return { type: "Extend", color: "warning" }
//     return { type: "Terminate", color: "error" }
//   }

//   const renderPhaseTable = (phase, phaseTitle, dayRange) => {
//     const phaseParams = parameters[phase] || []
//     const phaseTotal = calculatePhaseTotal(phase)

//     return (
//       <Card sx={{ mb: 3 }}>
//         <CardContent>
//           <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
//             <Typography variant="h6" sx={{ color: themeColors.primary, fontWeight: "bold" }}>
//               {phaseTitle} ({dayRange})
//             </Typography>
//             <Button
//               variant="outlined"
//               startIcon={<AddIcon />}
//               onClick={() => {
//                 setCurrentPhase(phase)
//                 setOpenSelectParameterDialog(true)
//               }}
//               sx={{
//                 borderColor: themeColors.primary,
//                 color: themeColors.primary,
//                 "&:hover": { borderColor: themeColors.primaryDark, backgroundColor: "rgba(140, 37, 124, 0.04)" },
//               }}
//             >
//               Select Parameter
//             </Button>
//           </Box>

//           <TableContainer component={Paper}>
//             <Table sx={{ minWidth: "100%", whiteSpace: "nowrap" }}>
//               <TableHead sx={{ backgroundColor: themeColors.primary }}>
//                 <TableRow>
//                   <TableCell sx={{ color: themeColors.textOnPrimary, fontWeight: "bold", width: "5%" }}>
//                     Sr. No.
//                   </TableCell>
//                   <TableCell sx={{ color: themeColors.textOnPrimary, fontWeight: "bold", width: "35%" }}>
//                     Parameters
//                   </TableCell>
//                   <TableCell sx={{ color: themeColors.textOnPrimary, fontWeight: "bold", textAlign: "center", width: "15%" }}>
//                     Line Manager
//                   </TableCell>
//                   <TableCell sx={{ color: themeColors.textOnPrimary, fontWeight: "bold", textAlign: "center", width: "15%" }}>
//                     Head
//                   </TableCell>
//                   <TableCell sx={{ color: themeColors.textOnPrimary, fontWeight: "bold", textAlign: "center", width: "15%" }}>
//                     HR
//                   </TableCell>
//                   <TableCell sx={{ color: themeColors.textOnPrimary, fontWeight: "bold", textAlign: "center", width: "10%" }}>
//                     Average
//                   </TableCell>
//                   <TableCell sx={{ color: themeColors.textOnPrimary, fontWeight: "bold", textAlign: "center", width: "5%" }}>
//                     Actions
//                   </TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {phaseParams.map((param, index) => {
//                   const rating = ratings[phase][index] || {}
//                   const average = calculateAverage(rating.lineManager, rating.head, rating.hr)

//                   return (
//                     <TableRow key={index} sx={{ "&:hover": { backgroundColor: "action.hover" } }}>
//                       <TableCell>{index + 1}</TableCell>
//                       <TableCell>
//                         {editingParameter === `${phase}-${index}` ? (
//                           <TextField
//                             defaultValue={param}
//                             onBlur={(e) => {
//                               editParameter(phase, index, e.target.value)
//                               setEditingParameter(null)
//                             }}
//                             onKeyPress={(e) => {
//                               if (e.key === "Enter") {
//                                 editParameter(phase, index, e.target.value)
//                                 setEditingParameter(null)
//                               }
//                             }}
//                             fullWidth
//                             size="small"
//                             autoFocus
//                           />
//                         ) : (
//                           param
//                         )}
//                       </TableCell>
//                       <TableCell align="center">
//                         <TextField
//                           disabled
//                           type="number"
//                           inputProps={{ min: 1, max: 10, step: "0.1" }}
//                           value={rating.lineManager || ""}
//                           onChange={(e) => updateRating(phase, index, "lineManager", e.target.value)}
//                           size="small"
//                           sx={{ width: "60px" }}
//                         />
//                       </TableCell>
//                       <TableCell align="center">
//                         <TextField
//                           disabled
//                           type="number"
//                           inputProps={{ min: 1, max: 10, step: "0.1" }}
//                           value={rating.head || ""}
//                           onChange={(e) => updateRating(phase, index, "head", e.target.value)}
//                           size="small"
//                           sx={{ width: "60px" }}
//                         />
//                       </TableCell>
//                       <TableCell align="center">
//                         <TextField
//                           type="number"
//                           inputProps={{ min: 1, max: 10, step: "0.1" }}
//                           value={rating.hr || ""}
//                           onChange={(e) => updateRating(phase, index, "hr", e.target.value)}
//                           size="small"
//                           sx={{ width: "60px" }}
//                         />
//                       </TableCell>
//                       <TableCell align="center" sx={{ fontWeight: "bold", color: themeColors.primary }}>
//                         {average}
//                       </TableCell>
//                       <TableCell align="center">
//                         <IconButton size="small" onClick={() => setEditingParameter(`${phase}-${index}`)} sx={{ color: themeColors.primary }}>
//                           <EditIcon />
//                         </IconButton>
//                         <IconButton size="small" onClick={() => deleteParameter(phase, index)} color="error">
//                           <DeleteIcon />
//                         </IconButton>
//                       </TableCell>
//                     </TableRow>
//                   )
//                 })}
//                 <TableRow sx={{ backgroundColor: "action.selected" }}>
//                   <TableCell colSpan={2} sx={{ fontWeight: "bold" }}>
//                     Total
//                   </TableCell>
//                   <TableCell align="center" sx={{ fontWeight: "bold" }}>
//                     {phaseTotal.lineManager}
//                   </TableCell>
//                   <TableCell align="center" sx={{ fontWeight: "bold" }}>
//                     {phaseTotal.head}
//                   </TableCell>
//                   <TableCell align="center" sx={{ fontWeight: "bold" }}>
//                     {phaseTotal.hr}
//                   </TableCell>
//                   <TableCell align="center" sx={{ fontWeight: "bold", color: themeColors.primary }}>
//                     {calculateAverage(phaseTotal.lineManager, phaseTotal.head, phaseTotal.hr)}
//                   </TableCell>
//                   <TableCell></TableCell>
//                 </TableRow>
//               </TableBody>
//             </Table>
//           </TableContainer>

//           <Grid container spacing={2} sx={{ mt: 2 }}>
//             <Grid item xs={12} md={4}>
//               <TextField disabled label="Line Manager Comments" multiline rows={3} fullWidth variant="outlined" />
//             </Grid>
//             <Grid item xs={12} md={4}>
//               <TextField disabled label="Head Comments" multiline rows={3} fullWidth variant="outlined" />
//             </Grid>
//             <Grid item xs={12} md={4}>
//               <TextField label="HR Comments" multiline rows={3} fullWidth variant="outlined" />
//             </Grid>
//           </Grid>

//           <Box sx={{ textAlign: "center", mt: 2 }}>
//             <Button
//               variant="contained"
//               startIcon={<SaveIcon />}
//               sx={{ backgroundColor: themeColors.primary, "&:hover": { backgroundColor: themeColors.primaryDark } }}
//             >
//               Save {phaseTitle}
//             </Button>
//           </Box>
//         </CardContent>
//       </Card>
//     )
//   }

//   const renderOverallAnalysis = () => {
//     const overall = getOverallPerformance()
//     const recommendation = getRecommendation()
//     const achievementPercentage = (Number.parseFloat(overall.average) * 10).toFixed(0)

//     const overallApiLm =
//       (apiPerformanceData?.phase1_lm || 0) +
//       (apiPerformanceData?.phase2_lm || 0) +
//       (apiPerformanceData?.phase3_lm || 0) +
//       (apiPerformanceData?.phase4_lm || 0)
//     const overallApiHead =
//       (apiPerformanceData?.phase1_head || 0) +
//       (apiPerformanceData?.phase2_head || 0) +
//       (apiPerformanceData?.phase3_head || 0) +
//       (apiPerformanceData?.phase4_head || 0)
//     const overallApiHr =
//       (apiPerformanceData?.phase1_hr || 0) +
//       (apiPerformanceData?.phase2_hr || 0) +
//       (apiPerformanceData?.phase3_hr || 0) +
//       (apiPerformanceData?.phase4_hr || 0)

//     const phaseApiData = [
//       {
//         name: "Align",
//         lm: apiPerformanceData?.phase1_lm,
//         head: apiPerformanceData?.phase1_head,
//         hr: apiPerformanceData?.phase1_hr,
//       },
//       {
//         name: "Accelerate",
//         lm: apiPerformanceData?.phase2_lm,
//         head: apiPerformanceData?.phase2_head,
//         hr: apiPerformanceData?.phase2_hr,
//       },
//       {
//         name: "Achieve",
//         lm: apiPerformanceData?.phase3_lm,
//         head: apiPerformanceData?.phase3_head,
//         hr: apiPerformanceData?.phase3_hr,
//       },
//       {
//         name: "Aspire",
//         lm: apiPerformanceData?.phase4_lm,
//         head: apiPerformanceData?.phase4_head,
//         hr: apiPerformanceData?.phase4_hr,
//       },
//     ]

//     return (
//       <Card>
//         <CardContent>
//           <Typography variant="h5" sx={{ mb: 2, color: themeColors.primary, fontWeight: "bold" }}>
//             Performance Analysis Summary
//           </Typography>

//           <Grid container spacing={3}>
//             <Grid item xs={12} md={6}>
//               <Card sx={{ height: "100%" }}>
//                 <CardContent>
//                   <Typography variant="h6" sx={{ mb: 2 }}>
//                     Phase-wise Performance
//                   </Typography>
//                   <TableContainer>
//                     <Table size="small">
//                       <TableHead sx={{ backgroundColor: themeColors.primary }}>
//                         <TableRow>
//                           <TableCell sx={{ color: themeColors.textOnPrimary, fontWeight: "bold" }}>Phase</TableCell>
//                           <TableCell sx={{ color: themeColors.textOnPrimary, fontWeight: "bold", textAlign: "center" }}>Line Manager</TableCell>
//                           <TableCell sx={{ color: themeColors.textOnPrimary, fontWeight: "bold", textAlign: "center" }}>Head</TableCell>
//                           <TableCell sx={{ color: themeColors.textOnPrimary, fontWeight: "bold", textAlign: "center" }}>HR</TableCell>
//                           <TableCell sx={{ color: themeColors.textOnPrimary, fontWeight: "bold", textAlign: "center" }}>Total</TableCell>
//                         </TableRow>
//                       </TableHead>
//                       <TableBody>
//                         {isLoadingApiData ? (
//                           [...Array(5)].map((_, i) => (
//                             <TableRow key={i}>
//                               <TableCell colSpan={5}>
//                                 <Skeleton variant="text" />
//                               </TableCell>
//                             </TableRow>
//                           ))
//                         ) : apiPerformanceData ? (
//                           <>
//                             {phaseApiData.map((phase) => (
//                               <TableRow key={phase.name} sx={{ "&:hover": { backgroundColor: "action.hover" } }}>
//                                 <TableCell>{phase.name}</TableCell>
//                                 <TableCell align="center">{phase.lm?.toFixed(1) || "0.0"}</TableCell>
//                                 <TableCell align="center">{phase.head?.toFixed(1) || "0.0"}</TableCell>
//                                 <TableCell align="center">{phase.hr?.toFixed(1) || "0.0"}</TableCell>
//                                 <TableCell align="center" sx={{ fontWeight: "bold" }}>
//                                   {calculateAverage(phase.lm, phase.head, phase.hr)}
//                                 </TableCell>
//                               </TableRow>
//                             ))}
//                             <TableRow sx={{ backgroundColor: "action.selected" }}>
//                               <TableCell sx={{ fontWeight: "bold" }}>Overall</TableCell>
//                               <TableCell align="center" sx={{ fontWeight: "bold" }}>{overallApiLm.toFixed(1)}</TableCell>
//                               <TableCell align="center" sx={{ fontWeight: "bold" }}>{overallApiHead.toFixed(1)}</TableCell>
//                               <TableCell align="center" sx={{ fontWeight: "bold" }}>{overallApiHr.toFixed(1)}</TableCell>
//                               <TableCell align="center" sx={{ fontWeight: "bold", color: themeColors.primary }}>
//                                 {calculateAverage(overallApiLm, overallApiHead, overallApiHr)}
//                               </TableCell>
//                             </TableRow>
//                           </>
//                         ) : (
//                           <TableRow>
//                             <TableCell colSpan={5} align="center">
//                               {selectedEmployee ? "No data available for this employee." : "Select an employee to see data."}
//                             </TableCell>
//                           </TableRow>
//                         )}
//                       </TableBody>
//                     </Table>
//                   </TableContainer>
//                 </CardContent>
//               </Card>
//             </Grid>

//             <Grid item xs={12} md={6}>
//               <Card sx={{ height: "100%" }}>
//                 <CardContent>
//                   <Typography variant="h6" sx={{ mb: 2 }}>
//                     Final Recommendation
//                   </Typography>
//                   <Box sx={{ mb: 2 }}>
//                     <Typography>Performance Analysis (Live Form): <strong>{overall.average}</strong></Typography>
//                     <Typography>KPI + KRA Average: <strong>N/A</strong></Typography>
//                     <Typography sx={{ mb: 2 }}>Achievement Percentage: <strong>{achievementPercentage}%</strong></Typography>
//                   </Box>

//                   <Alert severity={recommendation.color} sx={{ mb: 2 }}>
//                     <Typography variant="h6">HR Recommendation: {recommendation.type}</Typography>
//                   </Alert>

//                   <Box sx={{ p: 1, backgroundColor: "background.default", borderRadius: 1 }}>
//                     <Typography variant="body2" sx={{ fontSize: "12px", color: "text.secondary" }}>
//                       <strong>Note:</strong> Automatic applicable from date of joining to 6 months after date of joining.
//                       If line manager is not available, average of head and HR is considered.
//                     </Typography>
//                   </Box>
//                 </CardContent>
//               </Card>
//             </Grid>
//           </Grid>

//           <Grid container spacing={2} sx={{ mt: 2 }}>
//             <Grid item xs={12} md={4}><TextField disabled label="Line Manager Final Comments" multiline rows={4} fullWidth variant="outlined"/></Grid>
//             <Grid item xs={12} md={4}><TextField disabled label="Head Final Comments" multiline rows={4} fullWidth variant="outlined" /></Grid>
//             <Grid item xs={12} md={4}><TextField label="HR Final Comments" multiline rows={4} fullWidth variant="outlined" /></Grid>
//           </Grid>
          
//           <Box sx={{ display: "flex", justifyContent: "center", gap: 2, flexWrap: "wrap", mt: 3, pt: 2, borderTop: 1, borderColor: "divider"}}>
//             <Button variant={recommendation.type === "Confirm" ? "contained" : "outlined"} color="success" size="large" onClick={() => handleFinalAction("Confirm")}>CONFIRM EMPLOYEE</Button>
//             {!probationExtended && (
//               <Button variant={recommendation.type === "Extend" ? "contained" : "outlined"} color="warning" size="large" onClick={() => setOpenExtendDialog(true)}>EXTEND PROBATION</Button>
//             )}
//             <Button variant={recommendation.type === "Terminate" ? "contained" : "outlined"} color="error" size="large" onClick={() => handleFinalAction("Terminate")}>TERMINATE EMPLOYEE</Button>
//           </Box>
//         </CardContent>
//       </Card>
//     )
//   }

//   const availableParamsForSelection = parameterLibrary.filter((p) => !parameters[currentPhase]?.includes(p))
//   const employeeName = employeesData.find((e) => e.id === selectedEmployee)?.name || "the employee"

//   return (
//     <Box component={Paper} p={3}>
//       <Typography variant="h4" sx={{ color: themeColors.primary, fontWeight: "bold", mb: 5 }}>
//         Employee Confirmation
//       </Typography>

//       <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, justifyContent: "space-between", alignItems: { md: "center" }, gap: 2, mb: 3, }}>
//         <Box sx={{ display: "flex", gap: 2, flexDirection: { xs: "column", sm: "row" }, width: { xs: "100%", md: "350px" } }}>
//           <FormControl fullWidth>
//             <InputLabel id="designation-select-label">Select Designation</InputLabel>
//             <Select labelId="designation-select-label" value={selectedDesignation} onChange={handleDesignationChange} label="Select Designation">
//               {designations.map((d) => (<MenuItem key={d} value={d}>{d}</MenuItem>))}
//             </Select>
//           </FormControl>
//           <FormControl fullWidth disabled={!selectedDesignation}>
//             <InputLabel id="employee-select-label">Select Employee</InputLabel>
//             <Select labelId="employee-select-label" value={selectedEmployee} onChange={handleEmployeeChange} label="Select Employee">
//               {filteredEmployees.map((e) => (<MenuItem key={e.id} value={e.id}>{e.name}</MenuItem>))}
//             </Select>
//           </FormControl>
//         </Box>
//         <Button
//           variant="contained"
//           onClick={() => setOpenAddLibraryDialog(true)}
//           disabled={!selectedEmployee}
//           startIcon={<AddIcon />}
//           sx={{ backgroundColor: themeColors.primary, color: themeColors.textOnPrimary, "&:hover": { backgroundColor: themeColors.primaryDark }, width: { xs: "100%", md: "auto" } }}
//         >
//           Add Parameter to Library
//         </Button>
//       </Box>

//       {selectedEmployee && (
//         <>
//           <Tabs
//             value={activeTab}
//             onChange={handleTabChange}
//             variant="scrollable"
//             scrollButtons="auto"
//             aria-label="performance-review-tabs"
//             sx={{
//               borderBottom: 1,
//               borderColor: "divider",
//               mb: 2,
//               "& .Mui-selected": { color: `${themeColors.primary} !important`, fontWeight: "bold" },
//               "& .MuiTabs-indicator": { backgroundColor: themeColors.primary },
//             }}
//           >
//             <Tab label="Phase 1: Align" id="tab-0" aria-controls="tabpanel-0" />
//             <Tab label="Phase 2: Accelerate" id="tab-1" aria-controls="tabpanel-1" />
//             <Tab label="Phase 3: Achieve" id="tab-2" aria-controls="tabpanel-2" />
//             <Tab label="Phase 4: Aspire" id="tab-3" aria-controls="tabpanel-3" />
//             <Tab label="Overall Analysis" id="tab-4" aria-controls="tabpanel-4" />
//           </Tabs>

//           <TabPanel value={activeTab} index={0}>{renderPhaseTable("phase1", "Phase 1: Align", "Day 1 to 30")}</TabPanel>
//           <TabPanel value={activeTab} index={1}>{renderPhaseTable("phase2", "Phase 2: Accelerate", "Day 30 to 60")}</TabPanel>
//           <TabPanel value={activeTab} index={2}>{renderPhaseTable("phase3", "Phase 3: Achieve", "Day 60 to 90")}</TabPanel>
//           <TabPanel value={activeTab} index={3}>{renderPhaseTable("phase4", "Phase 4: Aspire", "Day 90 to 180")}</TabPanel>
//           <TabPanel value={activeTab} index={4}>{renderOverallAnalysis()}</TabPanel>
//         </>
//       )}

//       <Dialog open={openAddLibraryDialog} onClose={() => setOpenAddLibraryDialog(false)} fullWidth maxWidth="sm">
//         <DialogTitle sx={{ color: themeColors.primary, fontWeight: "bold" }}>Add New Parameter to Library</DialogTitle>
//         <DialogContent>
//           <TextField autoFocus margin="dense" label="Parameter Description" fullWidth variant="outlined" value={newLibraryParameter} onChange={(e) => setNewLibraryParameter(e.target.value)} onKeyPress={(e) => e.key === "Enter" && handleAddParameterToLibrary()}/>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setOpenAddLibraryDialog(false)}>Cancel</Button>
//           <Button onClick={handleAddParameterToLibrary} variant="contained" sx={{ backgroundColor: themeColors.primary, "&:hover": { backgroundColor: themeColors.primaryDark } }}>Add to Library</Button>
//         </DialogActions>
//       </Dialog>

//       <Dialog open={openSelectParameterDialog} onClose={() => setOpenSelectParameterDialog(false)} fullWidth maxWidth="sm">
//         <DialogTitle sx={{ color: themeColors.primary, fontWeight: "bold" }}>Select Parameters from Library</DialogTitle>
//         <DialogContent>
//           {availableParamsForSelection.length > 0 ? (
//             <FormControl component="fieldset" variant="standard">
//               {availableParamsForSelection.map((param) => (<FormControlLabel key={param} control={<Checkbox checked={selectedLibraryParameters.includes(param)} onChange={handleLibraryParameterSelect} value={param}/>} label={param}/>))}
//             </FormControl>
//           ) : (<Typography>All available parameters have been added to this phase.</Typography>)}
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => {setOpenSelectParameterDialog(false); setSelectedLibraryParameters([]);}}>Cancel</Button>
//           <Button onClick={handleAddSelectedParameters} variant="contained" disabled={selectedLibraryParameters.length === 0} sx={{ backgroundColor: themeColors.primary, "&:hover": { backgroundColor: themeColors.primaryDark } }}>Add Selected</Button>
//         </DialogActions>
//       </Dialog>

//       <Dialog open={openExtendDialog} onClose={() => setOpenExtendDialog(false)} fullWidth maxWidth="sm">
//         <DialogTitle sx={{ color: themeColors.primary, fontWeight: "bold" }}>Confirm Probation Extension</DialogTitle>
//         <DialogContent>
//           <Typography>Are you sure you want to extend the probation for 3 months for <strong>{employeeName}</strong>?</Typography>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setOpenExtendDialog(false)}>No</Button>
//           <Button onClick={handleConfirmExtend} variant="contained" sx={{ backgroundColor: themeColors.primary, "&:hover": { backgroundColor: themeColors.primaryDark } }}>Yes</Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   )
// }





// import { useState, useEffect } from "react"
// import {
//   Container,
//   Paper,
//   Typography,
//   Box,
//   Tabs,
//   Tab,
//   Button,
//   TextField,
//   Select,
//   MenuItem,
//   FormControl,
//   InputLabel,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Grid,
//   Card,
//   CardContent,
//   IconButton,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Alert,
//   Checkbox,
//   FormControlLabel,
//   Skeleton,
//   CardHeader,
//   CircularProgress,
// } from "@mui/material"
// import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon, Save as SaveIcon } from "@mui/icons-material"

// // ... (constants like designations, employeesData, etc. remain the same)
// const designations = ["VSO", "Manager", "Senior Manager", "Director", "Customer Experience Executive"]

// const employeesData = [
//   { id: 1, name: "Alice Johnson", designation: "VSO" },
//   { id: 2, name: "Bob Williams", designation: "VSO" },
//   { id: 3, name: "Charlie Brown", designation: "Manager" },
//   { id: 4, name: "Diana Miller", designation: "Senior Manager" },
//   { id: 5, name: "Ethan Davis", designation: "Director" },
//   { id: 6, name: "Fiona Garcia", designation: "Manager" },
//   { id: 494, name: "Ambika Test. Mitkari", designation: "Customer Experience Executive" },
// ]

// const defaultParameters = {
//   phase1: ["Onboarding documentation completed within 5 days", "Attendance/punctuality in reporting & compliance"],
//   phase2: ["Understanding customer coverage plan", "Participation in team meetings", "Customer complaint handling"],
//   phase3: ["Call average", "Quality of work", "Competencies"],
//   phase4: ["Business head feedback score", "Final performance review rating as per VetHR"],
// }

// // Define theme colors for consistent use
// const themeColors = {
//   primary: "#8C257C",
//   primaryDark: "#6d1d60",
//   secondary: "#F58E35",
//   textOnPrimary: "#FFFFFF",
// }

// function TabPanel({ children, value, index, ...other }) {
//   return (
//     <div role="tabpanel" hidden={value !== index} id={`tabpanel-${index}`} aria-labelledby={`tab-${index}`} {...other}>
//       {value === index && <Box sx={{ p: { xs: 1, sm: 3 } }}>{children}</Box>}
//     </div>
//   )
// }

// // ++ OVERALL ANALYSIS COMPONENT START ++
// const OverallAnalysis = ({ userId }) => {
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [allPhaseComments, setAllPhaseComments] = useState([]);
//     const [overallComments, setOverallComments] = useState({ hr: "" });
//     const [phaseWiseData, setPhaseWiseData] = useState(null);

//     // State for action buttons and dialog
//     const [openExtendDialog, setOpenExtendDialog] = useState(false);
//     const [probationExtended, setProbationExtended] = useState(false);

//     const [kpiData, setKpiData] = useState([
//         { kpi: "A", target: 1, ach: 1, rating: 5 },
//         { kpi: "B", target: 2, ach: 5, rating: 7 },
//         { kpi: "C", target: 3, ach: 6, rating: 9 },
//     ]);

//     const [kraData, setKraData] = useState([
//         { parameter: "HADC", totalRating: 10 },
//         { parameter: "QCP", totalRating: 10 },
//     ]);
    
//     // Moved from parent to make component self-contained
//     const handleFinalAction = (action) => {
//         const employee = employeesData.find((e) => e.id === userId)
//         const message = `Action: ${action.toUpperCase()} for employee ${employee?.name}.`
//         console.log(message)
//         alert(message)
//     }

//     const handleConfirmExtend = () => {
//         const message = `The probation has been extended by 3 months.`
//         console.log(message)
//         alert(message)
//         setProbationExtended(true)
//         setOpenExtendDialog(false)
//     }

//     useEffect(() => {
//         const fetchPhaseWiseData = async () => {
//             if (!userId) {
//                 setError("User ID not found.");
//                 setLoading(false);
//                 return;
//             }
//             try {
//                 setLoading(true);
//                 const response = await fetch(`https://tdtlworld.com/hrms-backend/apis/get_employee_overall_phasewise/?user_id=${userId}`);
//                 const result = await response.json();

//                 if (result.status === "success") {
//                     const data = result.data;
//                     setPhaseWiseData(data);
//                     setOverallComments({ hr: data.final_hr_comment || "" });
//                 } else {
//                     throw new Error("Failed to fetch phase data.");
//                 }
//             } catch (error) {
//                 console.error("Failed to fetch phase-wise data:", error);
//                 setError("Could not load phase-wise performance data.");
//             } finally {
//                 setLoading(false);
//             }
//         };

//         const fetchAllPhaseComments = async () => {
//             if (!userId) return;
//             try {
//                 const response = await fetch(`https://tdtlworld.com/hrms-backend/apis/get_phasewise_data/${userId}/`);
//                 const result = await response.json();

//                 if (result.status === "success" && Array.isArray(result.data)) {
//                     const comments = [1, 2, 3, 4].map(phaseNum => {
//                         const phaseData = result.data.find(item => item.phase === phaseNum);
//                         return {
//                             phase: `Phase ${phaseNum}`,
//                             lm: phaseData?.comment_by_lm || "N/A",
//                             head: phaseData?.comment_by_head || "N/A",
//                             hr: phaseData?.comment_by_hr || "N/A",
//                         };
//                     });
//                     setAllPhaseComments(comments);
//                 }
//             } catch (error) {
//                 console.error("Failed to fetch all phase comments:", error);
//             }
//         };

//         fetchPhaseWiseData();
//         fetchAllPhaseComments();
//     }, [userId]);
    
//     // Handlers for KPI/KRA changes
//     const handleKpiChange = (index, field, value) => {
//         const newData = [...kpiData];
//         const isNumeric = ["target", "ach", "rating"].includes(field);
//         newData[index][field] = isNumeric ? Number(value) : value;
//         setKpiData(newData);
//     };

//     const handleKraChange = (index, field, value) => {
//         const newData = [...kraData];
//         newData[index][field] = field === "totalRating" ? Number(value) : value;
//         setKraData(newData);
//     };
    
//     const handleOverallCommentChange = (rater, value) => {
//         setOverallComments(prev => ({ ...prev, [rater]: value }));
//     };

//     if (loading) {
//         return <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress /></Box>;
//     }
//     if (error) {
//         return <Alert severity="error" sx={{ m: 2 }}>{error}</Alert>;
//     }

//     // Calculations
//     const phaseKeys = ["phase1", "phase2", "phase3", "phase4"];
//     const kpiRatings = kpiData.map((item) => Number(item.rating) || 0);
//     const kraRatings = kraData.map((item) => Number(item.totalRating) || 0);
//     const allKpiKraRatings = [...kpiRatings, ...kraRatings].filter((r) => r > 0);
//     const kpiKraAverage = allKpiKraRatings.length > 0 ? (allKpiKraRatings.reduce((sum, r) => sum + r, 0) / allKpiKraRatings.length).toFixed(1) : "0.0";
//     const textFieldStyles = { padding: '2px 4px', '& .MuiInput-underline:before': { borderBottom: 'none' }, '& .MuiInput-underline:hover:not(.Mui-disabled):before': { borderBottom: 'none' }, '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)', borderRadius: '4px' }, };

//     let value4AEE = 0;
//     let percent4AEE = 0;
//     if (phaseWiseData) {
//         const scoreKeys = [
//             'phase1_lm', 'phase2_lm', 'phase3_lm', 'phase4_lm',
//             'phase1_head', 'phase2_head', 'phase3_head', 'phase4_head',
//             'phase1_hr', 'phase2_hr', 'phase3_hr', 'phase4_hr'
//         ];
//         const totalApiScore = scoreKeys.reduce((sum, key) => sum + (phaseWiseData[key] || 0), 0);
//         const maxPhaseScorePerSlot = 40;
//         const totalMaxScore = 12 * maxPhaseScorePerSlot;

//         if (totalMaxScore > 0) {
//             value4AEE = (totalApiScore / totalMaxScore) * 10;
//             percent4AEE = (totalApiScore / totalMaxScore) * 100;
//         }
//     }

//     const valueKpiKra = parseFloat(kpiKraAverage);
//     const percentKpiKra = valueKpiKra * 10;
//     const totalValue = (value4AEE + valueKpiKra) / 2;

//     // Recommendation Logic
//     const getRecommendation = () => {
//         const avgScore = totalValue;
//         if (avgScore >= 8) return { type: "Confirm", color: "success" };
//         if (avgScore >= 6) return { type: "Extend", color: "warning" };
//         return { type: "Terminate", color: "error" };
//     }
//     const recommendation = getRecommendation();
//     const employeeName = employeesData.find((e) => e.id === userId)?.name || "the employee";


//     const lmTotal = phaseWiseData ?
//         (phaseWiseData.phase1_lm || 0) + (phaseWiseData.phase2_lm || 0) + (phaseWiseData.phase3_lm || 0) + (phaseWiseData.phase4_lm || 0) : 0;
//     const headTotal = phaseWiseData ?
//         (phaseWiseData.phase1_head || 0) + (phaseWiseData.phase2_head || 0) + (phaseWiseData.phase3_head || 0) + (phaseWiseData.phase4_head || 0) : 0;
//     const hrTotal = phaseWiseData ?
//         (phaseWiseData.phase1_hr || 0) + (phaseWiseData.phase2_hr || 0) + (phaseWiseData.phase3_hr || 0) + (phaseWiseData.phase4_hr || 0) : 0;
//     const grandTotal = lmTotal + headTotal + hrTotal;

//     return (
//         <Box>
//             <Typography variant="h5" sx={{ mb: 3, color: "primary.main", fontWeight: "bold" }}>
//                 Performance Analysis Summary
//             </Typography>
//             <Grid container spacing={3}>
//                 <Grid item xs={12}>
//                     <Card sx={{ height: "100%" }}>
//                         <CardHeader title="Phase-wise Performance" titleTypographyProps={{ variant: 'h6' }} />
//                         <CardContent>
//                             <TableContainer>
//                                 <Table size="small">
//                                     <TableHead>
//                                         <TableRow>
//                                             <TableCell sx={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}>Phase</TableCell>
//                                             <TableCell sx={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }} align="right">Line Manager</TableCell>
//                                             <TableCell sx={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }} align="right">Head</TableCell>
//                                             <TableCell sx={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }} align="right">HR</TableCell>
//                                             <TableCell sx={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }} align="right">Total</TableCell>
//                                         </TableRow>
//                                     </TableHead>
//                                     <TableBody>
//                                         {phaseWiseData && phaseKeys.map((phase, index) => {
//                                             const lm = phaseWiseData[`phase${index + 1}_lm`] || 0;
//                                             const head = phaseWiseData[`phase${index + 1}_head`] || 0;
//                                             const hr = phaseWiseData[`phase${index + 1}_hr`] || 0;
//                                             const rowTotal = lm + head + hr;
//                                             return (
//                                                 <TableRow key={phase} >
//                                                     <TableCell>{["Align (P1)", "Accelerate (P2)", "Achieve (P3)", "Aspire (P4)"][index]}</TableCell>
//                                                     <TableCell align="right">{lm.toFixed(1)}</TableCell>
//                                                     <TableCell align="right">{head.toFixed(1)}</TableCell>
//                                                     <TableCell align="right">{hr.toFixed(1)}</TableCell>
//                                                     <TableCell align="right">{rowTotal.toFixed(1)}</TableCell>
//                                                 </TableRow>
//                                             );
//                                         })}
//                                         <TableRow sx={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}>
//                                             <TableCell sx={{ fontWeight: "bold" }}>Total</TableCell>
//                                             <TableCell sx={{ fontWeight: "bold" }} align="right">{lmTotal.toFixed(1)}</TableCell>
//                                             <TableCell sx={{ fontWeight: "bold" }} align="right">{headTotal.toFixed(1)}</TableCell>
//                                             <TableCell sx={{ fontWeight: "bold" }} align="right">{hrTotal.toFixed(1)}</TableCell>
//                                             <TableCell sx={{ fontWeight: "bold" }} align="right">{grandTotal.toFixed(1)}</TableCell>
//                                         </TableRow>
//                                     </TableBody>
//                                 </Table>
//                             </TableContainer>
//                         </CardContent>
//                     </Card>
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                     <Card sx={{ height: "100%" }}>
//                         <CardHeader title="KPI" titleTypographyProps={{ variant: 'h6' }} />
//                         <CardContent>
//                             <TableContainer>
//                                 <Table size="small" sx={{ tableLayout: 'fixed' }}>
//                                     <TableHead>
//                                         <TableRow>
//                                             <TableCell sx={{ fontWeight: "bold", width: '15%', backgroundColor: "#f5f5f5" }}>KPI</TableCell>
//                                             <TableCell sx={{ fontWeight: "bold", textAlign: 'center', width: '20%', backgroundColor: "#f5f5f5" }}>Target</TableCell>
//                                             <TableCell sx={{ fontWeight: "bold", textAlign: 'center', width: '20%', backgroundColor: "#f5f5f5" }}>Ach</TableCell>
//                                             <TableCell sx={{ fontWeight: "bold", textAlign: 'center', width: '20%', backgroundColor: "#f5f5f5" }}>Rating</TableCell>
//                                         </TableRow>
//                                     </TableHead>
//                                     <TableBody>
//                                         {kpiData.map((row, index) => (
//                                             <TableRow key={index}>
//                                                 <TableCell sx={{ p: 0.5, wordBreak: 'break-word' }}>
//                                                     <TextField fullWidth size="small" variant="standard" value={row.kpi} onChange={(e) => handleKpiChange(index, "kpi", e.target.value)} sx={textFieldStyles} />
//                                                 </TableCell>
//                                                 <TableCell sx={{ p: 0.5 }}>
//                                                     <TextField fullWidth size="small" variant="standard" type="number" value={row.target} onChange={(e) => handleKpiChange(index, "target", e.target.value)} sx={textFieldStyles} InputProps={{ sx: { textAlign: "center" } }} />
//                                                 </TableCell>
//                                                 <TableCell sx={{ p: 0.5 }}>
//                                                     <TextField fullWidth size="small" variant="standard" type="number" value={row.ach} onChange={(e) => handleKpiChange(index, "ach", e.target.value)} sx={textFieldStyles} InputProps={{ sx: { textAlign: "center" } }} />
//                                                 </TableCell>
//                                                 <TableCell sx={{ p: 0.5 }}>
//                                                     <TextField fullWidth size="small" variant="standard" type="number" value={row.rating} onChange={(e) => handleKpiChange(index, "rating", e.target.value)} sx={textFieldStyles} InputProps={{ sx: { textAlign: "center" } }} />
//                                                 </TableCell>
//                                             </TableRow>
//                                         ))}
//                                     </TableBody>
//                                 </Table>
//                             </TableContainer>
//                         </CardContent>
//                     </Card>
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                     <Card sx={{ height: "100%" }}>
//                         <CardHeader title="KRA" titleTypographyProps={{ variant: 'h6' }} />
//                         <CardContent>
//                             <TableContainer>
//                                 <Table size="small" sx={{ tableLayout: 'fixed' }}>
//                                     <TableHead>
//                                         <TableRow>
//                                             <TableCell sx={{ fontWeight: "bold", width: '60%', backgroundColor: "#f5f5f5" }}>KRA Parameter</TableCell>
//                                             <TableCell sx={{ fontWeight: "bold", textAlign: 'center', width: '40%', backgroundColor: "#f5f5f5" }}>Total Rating</TableCell>
//                                         </TableRow>
//                                     </TableHead>
//                                     <TableBody>
//                                         {kraData.map((row, index) => (
//                                             <TableRow key={index}>
//                                                 <TableCell sx={{ p: 0.5, wordBreak: 'break-word' }}>
//                                                     <TextField fullWidth size="small" variant="standard" value={row.parameter} onChange={(e) => handleKraChange(index, "parameter", e.target.value)} sx={textFieldStyles} />
//                                                 </TableCell>
//                                                 <TableCell sx={{ p: 0.5 }}>
//                                                     <TextField fullWidth size="small" variant="standard" type="number" value={row.totalRating} onChange={(e) => handleKraChange(index, "totalRating", e.target.value)} sx={textFieldStyles} InputProps={{ sx: { textAlign: "center" } }} />
//                                                 </TableCell>
//                                             </TableRow>
//                                         ))}
//                                     </TableBody>
//                                 </Table>
//                             </TableContainer>
//                         </CardContent>
//                     </Card>
//                 </Grid>
//                 <Grid item xs={12} sx={{ mt: 2 }}>
//                     <Card>
//                         <CardHeader title="All Total" />
//                         <CardContent>
//                             <TableContainer>
//                                 <Table>
//                                     <TableHead>
//                                         <TableRow>
//                                             <TableCell sx={{ backgroundColor: "#f5f5f5", fontWeight: "bold" }}>4AEE Program</TableCell>
//                                             <TableCell sx={{ backgroundColor: "#f5f5f5", fontWeight: "bold" }}>Ach % </TableCell>
//                                             <TableCell sx={{ backgroundColor: "#f5f5f5", fontWeight: "bold" }}>KRA/KPI</TableCell>
//                                             <TableCell sx={{ backgroundColor: "#f5f5f5", fontWeight: "bold" }}>Ach % </TableCell>
//                                             <TableCell sx={{ backgroundColor: "#f5f5f5", fontWeight: "bold" }}>Total</TableCell>
//                                             <TableCell sx={{ backgroundColor: "#f5f5f5", fontWeight: "bold" }}>Ach % </TableCell>
//                                         </TableRow>
//                                     </TableHead>
//                                     <TableBody>
//                                         <TableRow sx={{ fontWeight: "bold" }}>
//                                             <TableCell>{value4AEE.toFixed(1)}</TableCell>
//                                             <TableCell>{percent4AEE.toFixed(0)}%</TableCell>
//                                             <TableCell>{valueKpiKra.toFixed(1)}</TableCell>
//                                             <TableCell>{percentKpiKra.toFixed(0)}%</TableCell>
//                                             <TableCell sx={{ fontWeight: "bold" }}>{totalValue.toFixed(1)}</TableCell>
//                                             <TableCell sx={{ fontWeight: "bold" }}>{(totalValue * 10).toFixed(0)}%</TableCell>
//                                         </TableRow>
//                                     </TableBody>
//                                 </Table>
//                             </TableContainer>
//                         </CardContent>
//                     </Card>
//                 </Grid>
//                 <Grid item xs={12} sx={{ mt: 2 }}>
//                     <Card variant="outlined">
//                         <CardHeader title="All Phases Comments" />
//                         <CardContent>
//                             <TableContainer>
//                                 <Table>
//                                     <TableHead>
//                                         <TableRow>
//                                             <TableCell sx={{ backgroundColor: "#f5f5f5", fontWeight: "bold" }}>Phases</TableCell>
//                                             <TableCell sx={{ backgroundColor: "#f5f5f5", fontWeight: "bold" }}>Line Manager</TableCell>
//                                             <TableCell sx={{ backgroundColor: "#f5f5f5", fontWeight: "bold" }}>Head</TableCell>
//                                             <TableCell sx={{ backgroundColor: "#f5f5f5", fontWeight: "bold" }}>HR</TableCell>
//                                         </TableRow>
//                                     </TableHead>
//                                     <TableBody>
//                                         {allPhaseComments.map((row, index) => (
//                                             <TableRow key={index}>
//                                                 <TableCell>{row.phase}</TableCell>
//                                                 <TableCell>{row.lm}</TableCell>
//                                                 <TableCell>{row.head}</TableCell>
//                                                 <TableCell>{row.hr}</TableCell>
//                                             </TableRow>
//                                         ))}
//                                     </TableBody>
//                                 </Table>
//                             </TableContainer>
//                         </CardContent>
//                     </Card>
//                 </Grid>
//                 <Grid item xs={12} sx={{ mt: 2 }}>
//                     <Card variant="outlined">
//                         <CardHeader title="Overall Comments" />
//                         <CardContent>
//                             <Grid container spacing={2}>
//                                 <Grid item xs={12}>
//                                     <TextField
//                                         label="HR final comment"
//                                         multiline
//                                         rows={3}
//                                         fullWidth
//                                         value={overallComments.hr}
//                                         onChange={(e) => handleOverallCommentChange("hr", e.target.value)}
//                                     />
//                                 </Grid>
//                             </Grid>
//                         </CardContent>
//                     </Card>
//                 </Grid>
//             </Grid>
            
//             <Box sx={{ display: "flex", justifyContent: "center", gap: 2, flexWrap: "wrap", mt: 3, pt: 2, borderTop: 1, borderColor: "divider"}}>
//                 <Button variant={recommendation.type === "Confirm" ? "contained" : "outlined"} color="success" size="large" onClick={() => handleFinalAction("Confirm")}>CONFIRM EMPLOYEE</Button>
//                 {!probationExtended && (
//                 <Button variant={recommendation.type === "Extend" ? "contained" : "outlined"} color="warning" size="large" onClick={() => setOpenExtendDialog(true)}>EXTEND PROBATION</Button>
//                 )}
//                 <Button variant={recommendation.type === "Terminate" ? "contained" : "outlined"} color="error" size="large" onClick={() => handleFinalAction("Terminate")}>TERMINATE EMPLOYEE</Button>
//             </Box>

//             <Dialog open={openExtendDialog} onClose={() => setOpenExtendDialog(false)} fullWidth maxWidth="sm">
//                 <DialogTitle sx={{ color: themeColors.primary, fontWeight: "bold" }}>Confirm Probation Extension</DialogTitle>
//                 <DialogContent>
//                     <Typography>Are you sure you want to extend the probation for 3 months for <strong>{employeeName}</strong>?</Typography>
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={() => setOpenExtendDialog(false)}>No</Button>
//                     <Button onClick={handleConfirmExtend} variant="contained" sx={{ backgroundColor: themeColors.primary, "&:hover": { backgroundColor: themeColors.primaryDark } }}>Yes</Button>
//                 </DialogActions>
//             </Dialog>

//         </Box>
//     );
// };
// // ++ OVERALL ANALYSIS COMPONENT END ++


// export default function PerformanceManagement() {
//   const [activeTab, setActiveTab] = useState(0)
//   const [selectedDesignation, setSelectedDesignation] = useState("")
//   const [selectedEmployee, setSelectedEmployee] = useState("")
//   const [filteredEmployees, setFilteredEmployees] = useState([])
//   const [parameters, setParameters] = useState(defaultParameters)
//   const [ratings, setRatings] = useState({ phase1: {}, phase2: {}, phase3: {}, phase4: {} })

//   const resetFormState = () => {
//     setRatings({ phase1: {}, phase2: {}, phase3: {}, phase4: {} })
//     setParameters(defaultParameters)
//     setActiveTab(0)
//   }

//   const handleDesignationChange = (event) => {
//     const designation = event.target.value
//     setSelectedDesignation(designation)
//     const relevantEmployees = employeesData.filter((emp) => emp.designation === designation)
//     setFilteredEmployees(relevantEmployees)
//     setSelectedEmployee("")
//     resetFormState()
//   }

//   const handleEmployeeChange = (event) => {
//     const employeeId = event.target.value
//     setSelectedEmployee(employeeId)
//     resetFormState()
//   }

//   const handleTabChange = (event, newValue) => {
//     setActiveTab(newValue)
//   }

//   const calculateAverage = (lineManager, head, hr) => {
//     const values = [lineManager, head, hr].filter((val) => val && !isNaN(val))
//     if (values.length === 0) return 0
//     const sum = values.reduce((sum, val) => sum + Number.parseFloat(val), 0)
//     const average = sum / values.length
//     return average.toFixed(1)
//   }

//   const calculatePhaseTotal = (phase) => {
//     const phaseParams = parameters[phase] || []
//     let lineManagerTotal = 0,
//       headTotal = 0,
//       hrTotal = 0
//     let lmCount = 0,
//       headCount = 0,
//       hrCount = 0

//     phaseParams.forEach((param, index) => {
//       const rating = ratings[phase][index] || {}
//       if (rating.lineManager && !isNaN(rating.lineManager)) {
//         lineManagerTotal += Number.parseFloat(rating.lineManager)
//         lmCount++
//       }
//       if (rating.head && !isNaN(rating.head)) {
//         headTotal += Number.parseFloat(rating.head)
//         headCount++
//       }
//       if (rating.hr && !isNaN(rating.hr)) {
//         hrTotal += Number.parseFloat(rating.hr)
//         hrCount++
//       }
//     })

//     return {
//       lineManager: lmCount > 0 ? (lineManagerTotal / lmCount).toFixed(1) : 0,
//       head: headCount > 0 ? (headTotal / headCount).toFixed(1) : 0,
//       hr: hrCount > 0 ? (hrTotal / hrCount).toFixed(1) : 0,
//     }
//   }

//   const updateRating = (phase, paramIndex, rater, value) => {
//     const numericValue = value.replace(/[^0-9.]/g, "")
//     if (numericValue === "" || (Number(numericValue) >= 1 && Number(numericValue) <= 10)) {
//       setRatings((prev) => ({
//         ...prev,
//         [phase]: {
//           ...prev[phase],
//           [paramIndex]: {
//             ...prev[phase][paramIndex],
//             [rater]: numericValue,
//           },
//         },
//       }))
//     }
//   }

//   const renderPhaseTable = (phase, phaseTitle, dayRange) => {
//     const phaseParams = parameters[phase] || []
//     const phaseTotal = calculatePhaseTotal(phase)

//     return (
//       <Card sx={{ mb: 3 }}>
//         <CardContent>
//           <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
//             <Typography variant="h6" sx={{ color: themeColors.primary, fontWeight: "bold" }}>
//               {phaseTitle} ({dayRange})
//             </Typography>
//           </Box>

//           <TableContainer component={Paper}>
//             <Table sx={{ minWidth: "100%", whiteSpace: "nowrap" }}>
//               <TableHead sx={{ backgroundColor: themeColors.primary }}>
//                 <TableRow>
//                   <TableCell sx={{ color: themeColors.textOnPrimary, fontWeight: "bold", width: "5%" }}>
//                     Sr. No.
//                   </TableCell>
//                   <TableCell sx={{ color: themeColors.textOnPrimary, fontWeight: "bold", width: "35%" }}>
//                     Parameters
//                   </TableCell>
//                   <TableCell sx={{ color: themeColors.textOnPrimary, fontWeight: "bold", textAlign: "center", width: "15%" }}>
//                     Line Manager
//                   </TableCell>
//                   <TableCell sx={{ color: themeColors.textOnPrimary, fontWeight: "bold", textAlign: "center", width: "15%" }}>
//                     Head
//                   </TableCell>
//                   <TableCell sx={{ color: themeColors.textOnPrimary, fontWeight: "bold", textAlign: "center", width: "15%" }}>
//                     HR
//                   </TableCell>
//                   <TableCell sx={{ color: themeColors.textOnPrimary, fontWeight: "bold", textAlign: "center", width: "10%" }}>
//                     Average
//                   </TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {phaseParams.map((param, index) => {
//                   const rating = ratings[phase][index] || {}
//                   const average = calculateAverage(rating.lineManager, rating.head, rating.hr)

//                   return (
//                     <TableRow key={index} sx={{ "&:hover": { backgroundColor: "action.hover" } }}>
//                       <TableCell>{index + 1}</TableCell>
//                       <TableCell>{param}</TableCell>
//                       <TableCell align="center">
//                         <TextField
//                           disabled
//                           type="number"
//                           inputProps={{ min: 1, max: 10, step: "0.1" }}
//                           value={rating.lineManager || ""}
//                           onChange={(e) => updateRating(phase, index, "lineManager", e.target.value)}
//                           size="small"
//                           sx={{ width: "60px" }}
//                         />
//                       </TableCell>
//                       <TableCell align="center">
//                         <TextField
//                           disabled
//                           type="number"
//                           inputProps={{ min: 1, max: 10, step: "0.1" }}
//                           value={rating.head || ""}
//                           onChange={(e) => updateRating(phase, index, "head", e.target.value)}
//                           size="small"
//                           sx={{ width: "60px" }}
//                         />
//                       </TableCell>
//                       <TableCell align="center">
//                         <TextField
//                           type="number"
//                           inputProps={{ min: 1, max: 10, step: "0.1" }}
//                           value={rating.hr || ""}
//                           onChange={(e) => updateRating(phase, index, "hr", e.target.value)}
//                           size="small"
//                           sx={{ width: "60px" }}
//                         />
//                       </TableCell>
//                       <TableCell align="center" sx={{ fontWeight: "bold", color: themeColors.primary }}>
//                         {average}
//                       </TableCell>
//                     </TableRow>
//                   )
//                 })}
//                 <TableRow sx={{ backgroundColor: "action.selected" }}>
//                   <TableCell colSpan={2} sx={{ fontWeight: "bold" }}>
//                     Total
//                   </TableCell>
//                   <TableCell align="center" sx={{ fontWeight: "bold" }}>
//                     {phaseTotal.lineManager}
//                   </TableCell>
//                   <TableCell align="center" sx={{ fontWeight: "bold" }}>
//                     {phaseTotal.head}
//                   </TableCell>
//                   <TableCell align="center" sx={{ fontWeight: "bold" }}>
//                     {phaseTotal.hr}
//                   </TableCell>
//                   <TableCell align="center" sx={{ fontWeight: "bold", color: themeColors.primary }}>
//                     {calculateAverage(phaseTotal.lineManager, phaseTotal.head, phaseTotal.hr)}
//                   </TableCell>
//                 </TableRow>
//               </TableBody>
//             </Table>
//           </TableContainer>

//           <Grid container spacing={2} sx={{ mt: 2 }}>
//             <Grid item xs={12} md={4}>
//               <TextField disabled label="Line Manager Comments" multiline rows={3} fullWidth variant="outlined" />
//             </Grid>
//             <Grid item xs={12} md={4}>
//               <TextField disabled label="Head Comments" multiline rows={3} fullWidth variant="outlined" />
//             </Grid>
//             <Grid item xs={12} md={4}>
//               <TextField label="HR Comments" multiline rows={3} fullWidth variant="outlined" />
//             </Grid>
//           </Grid>

//           <Box sx={{ textAlign: "center", mt: 2 }}>
//             <Button
//               variant="contained"
//               startIcon={<SaveIcon />}
//               sx={{ backgroundColor: themeColors.primary, "&:hover": { backgroundColor: themeColors.primaryDark } }}
//             >
//               Save {phaseTitle}
//             </Button>
//           </Box>
//         </CardContent>
//       </Card>
//     )
//   }

//   return (
//     <Box component={Paper} p={3}>
//       <Typography variant="h4" sx={{ color: themeColors.primary, fontWeight: "bold", mb: 5 }}>
//         Employee Confirmation
//       </Typography>

//       <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, justifyContent: "space-between", alignItems: { md: "center" }, gap: 2, mb: 3, }}>
//         <Box sx={{ display: "flex", gap: 2, flexDirection: { xs: "column", sm: "row" }, width: { xs: "100%", md: "350px" } }}>
//           <FormControl fullWidth>
//             <InputLabel id="designation-select-label">Select Designation</InputLabel>
//             <Select labelId="designation-select-label" value={selectedDesignation} onChange={handleDesignationChange} label="Select Designation">
//               {designations.map((d) => (<MenuItem key={d} value={d}>{d}</MenuItem>))}
//             </Select>
//           </FormControl>
//           <FormControl fullWidth disabled={!selectedDesignation}>
//             <InputLabel id="employee-select-label">Select Employee</InputLabel>
//             <Select labelId="employee-select-label" value={selectedEmployee} onChange={handleEmployeeChange} label="Select Employee">
//               {filteredEmployees.map((e) => (<MenuItem key={e.id} value={e.id}>{e.name}</MenuItem>))}
//             </Select>
//           </FormControl>
//         </Box>
//       </Box>

//       {selectedEmployee && (
//         <>
//           <Tabs
//             value={activeTab}
//             onChange={handleTabChange}
//             variant="scrollable"
//             scrollButtons="auto"
//             aria-label="performance-review-tabs"
//             sx={{
//               borderBottom: 1,
//               borderColor: "divider",
//               mb: 2,
//               "& .Mui-selected": { color: `${themeColors.primary} !important`, fontWeight: "bold" },
//               "& .MuiTabs-indicator": { backgroundColor: themeColors.primary },
//             }}
//           >
//             <Tab label="Phase 1: Align" id="tab-0" aria-controls="tabpanel-0" />
//             <Tab label="Phase 2: Accelerate" id="tab-1" aria-controls="tabpanel-1" />
//             <Tab label="Phase 3: Achieve" id="tab-2" aria-controls="tabpanel-2" />
//             <Tab label="Phase 4: Aspire" id="tab-3" aria-controls="tabpanel-3" />
//             <Tab label="Overall Analysis" id="tab-4" aria-controls="tabpanel-4" />
//           </Tabs>

//           <TabPanel value={activeTab} index={0}>{renderPhaseTable("phase1", "Phase 1: Align", "Day 1 to 30")}</TabPanel>
//           <TabPanel value={activeTab} index={1}>{renderPhaseTable("phase2", "Phase 2: Accelerate", "Day 30 to 60")}</TabPanel>
//           <TabPanel value={activeTab} index={2}>{renderPhaseTable("phase3", "Phase 3: Achieve", "Day 60 to 90")}</TabPanel>
//           <TabPanel value={activeTab} index={3}>{renderPhaseTable("phase4", "Phase 4: Aspire", "Day 90 to 180")}</TabPanel>
//           <TabPanel value={activeTab} index={4}>
//             <OverallAnalysis userId={selectedEmployee} />
//           </TabPanel>
//         </>
//       )}
//     </Box>
//   )
// }











// import { useState, useEffect } from "react"
// import {
//   Container,
//   Paper,
//   Typography,
//   Box,
//   Tabs,
//   Tab,
//   Button,
//   TextField,
//   Select,
//   MenuItem,
//   FormControl,
//   InputLabel,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Grid,
//   Card,
//   CardContent,
//   IconButton,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Alert,
//   Checkbox,
//   FormControlLabel,
//   Skeleton,
//   CardHeader,
//   CircularProgress,
// } from "@mui/material"
// import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon, Save as SaveIcon } from "@mui/icons-material"

// const initialParameters = { phase1: [], phase2: [], phase3: [], phase4: [] };

// const themeColors = {
//   primary: "#8C257C",
//   primaryDark: "#6d1d60",
//   secondary: "#F58E35",
//   textOnPrimary: "#FFFFFF",
// }

// function TabPanel({ children, value, index, ...other }) {
//   return (
//     <div role="tabpanel" hidden={value !== index} id={`tabpanel-${index}`} aria-labelledby={`tab-${index}`} {...other}>
//       {value === index && <Box sx={{ p: { xs: 1, sm: 3 } }}>{children}</Box>}
//     </div>
//   )
// }

// const OverallAnalysis = ({ userId, employeesData }) => {
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [allPhaseComments, setAllPhaseComments] = useState([]);
//     const [overallComments, setOverallComments] = useState({ hr: "" });
//     const [phaseWiseData, setPhaseWiseData] = useState(null);
//     const [openExtendDialog, setOpenExtendDialog] = useState(false);
//     const [probationExtended, setProbationExtended] = useState(false);

//     const [kpiData, setKpiData] = useState([
//         { kpi: "A", target: 1, ach: 1, rating: 5 },
//         { kpi: "B", target: 2, ach: 5, rating: 7 },
//         { kpi: "C", target: 3, ach: 6, rating: 9 },
//     ]);

//     const [kraData, setKraData] = useState([
//         { parameter: "HADC", totalRating: 10 },
//         { parameter: "QCP", totalRating: 10 },
//     ]);

//     const handleFinalAction = (action) => {
//         const employee = employeesData.find((e) => e.id === userId)
//         const message = `Action: ${action.toUpperCase()} for employee ${employee?.employee_name}.`
//         console.log(message)
//         alert(message)
//     }

//     const handleConfirmExtend = () => {
//         const message = `The probation has been extended by 3 months.`
//         console.log(message)
//         alert(message)
//         setProbationExtended(true)
//         setOpenExtendDialog(false)
//     }

//     useEffect(() => {
//         const fetchPhaseWiseData = async () => {
//             if (!userId) {
//                 setError("User ID not found.");
//                 setLoading(false);
//                 return;
//             }
//             try {
//                 setLoading(true);
//                 const response = await fetch(`https://tdtlworld.com/hrms-backend/apis/get_employee_overall_phasewise/?user_id=${userId}`);
//                 const result = await response.json();

//                 if (result.status === "success") {
//                     setPhaseWiseData(result.data);
//                     setOverallComments({ hr: result.data.final_hr_comment || "" });
//                 } else {
//                     throw new Error("Failed to fetch phase data.");
//                 }
//             } catch (error) {
//                 console.error("Failed to fetch phase-wise data:", error);
//                 setError("Could not load phase-wise performance data.");
//             } finally {
//                 setLoading(false);
//             }
//         };

//         const fetchAllPhaseComments = async () => {
//             if (!userId) return;
//             try {
//                 const response = await fetch(`https://tdtlworld.com/hrms-backend/apis/get_phasewise_data/${userId}/`);
//                 const result = await response.json();

//                 if (result.status === "success" && Array.isArray(result.data)) {
//                     const comments = [1, 2, 3, 4].map(phaseNum => {
//                         const phaseData = result.data.find(item => item.phase === phaseNum);
//                         return {
//                             phase: `Phase ${phaseNum}`,
//                             lm: phaseData?.comment_by_lm || "N/A",
//                             head: phaseData?.comment_by_head || "N/A",
//                             hr: phaseData?.comment_by_hr || "N/A",
//                         };
//                     });
//                     setAllPhaseComments(comments);
//                 }
//             } catch (error) {
//                 console.error("Failed to fetch all phase comments:", error);
//             }
//         };

//         fetchPhaseWiseData();
//         fetchAllPhaseComments();
//     }, [userId]);

//     const handleKpiChange = (index, field, value) => {
//         const newData = [...kpiData];
//         const isNumeric = ["target", "ach", "rating"].includes(field);
//         newData[index][field] = isNumeric ? Number(value) : value;
//         setKpiData(newData);
//     };

//     const handleKraChange = (index, field, value) => {
//         const newData = [...kraData];
//         newData[index][field] = field === "totalRating" ? Number(value) : value;
//         setKraData(newData);
//     };

//     const handleOverallCommentChange = (rater, value) => {
//         setOverallComments(prev => ({ ...prev, [rater]: value }));
//     };

//     if (loading) {
//         return <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress /></Box>;
//     }
//     if (error) {
//         return <Alert severity="error" sx={{ m: 2 }}>{error}</Alert>;
//     }

//     const phaseKeys = ["phase1", "phase2", "phase3", "phase4"];
//     const kpiRatings = kpiData.map((item) => Number(item.rating) || 0);
//     const kraRatings = kraData.map((item) => Number(item.totalRating) || 0);
//     const allKpiKraRatings = [...kpiRatings, ...kraRatings].filter((r) => r > 0);
//     const kpiKraAverage = allKpiKraRatings.length > 0 ? (allKpiKraRatings.reduce((sum, r) => sum + r, 0) / allKpiKraRatings.length).toFixed(1) : "0.0";
//     const textFieldStyles = { padding: '2px 4px', '& .MuiInput-underline:before': { borderBottom: 'none' }, '& .MuiInput-underline:hover:not(.Mui-disabled):before': { borderBottom: 'none' }, '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)', borderRadius: '4px' }, };

//     let value4AEE = 0;
//     let percent4AEE = 0;
//     if (phaseWiseData) {
//         const scoreKeys = [
//             'phase1_lm', 'phase2_lm', 'phase3_lm', 'phase4_lm',
//             'phase1_head', 'phase2_head', 'phase3_head', 'phase4_head',
//             'phase1_hr', 'phase2_hr', 'phase3_hr', 'phase4_hr'
//         ];
//         const totalApiScore = scoreKeys.reduce((sum, key) => sum + (phaseWiseData[key] || 0), 0);
//         const maxPhaseScorePerSlot = 40;
//         const totalMaxScore = 12 * maxPhaseScorePerSlot;

//         if (totalMaxScore > 0) {
//             value4AEE = (totalApiScore / totalMaxScore) * 10;
//             percent4AEE = (totalApiScore / totalMaxScore) * 100;
//         }
//     }

//     const valueKpiKra = parseFloat(kpiKraAverage);
//     const percentKpiKra = valueKpiKra * 10;
//     const totalValue = (value4AEE + valueKpiKra) / 2;

//     const getRecommendation = () => {
//         const avgScore = totalValue;
//         if (avgScore >= 8) return { type: "Confirm", color: "success" };
//         if (avgScore >= 6) return { type: "Extend", color: "warning" };
//         return { type: "Terminate", color: "error" };
//     }
//     const recommendation = getRecommendation();
//     const employeeName = employeesData.find((e) => e.id === userId)?.employee_name || "the employee";

//     const lmTotal = phaseWiseData ?
//         (phaseWiseData.phase1_lm || 0) + (phaseWiseData.phase2_lm || 0) + (phaseWiseData.phase3_lm || 0) + (phaseWiseData.phase4_lm || 0) : 0;
//     const headTotal = phaseWiseData ?
//         (phaseWiseData.phase1_head || 0) + (phaseWiseData.phase2_head || 0) + (phaseWiseData.phase3_head || 0) + (phaseWiseData.phase4_head || 0) : 0;
//     const hrTotal = phaseWiseData ?
//         (phaseWiseData.phase1_hr || 0) + (phaseWiseData.phase2_hr || 0) + (phaseWiseData.phase3_hr || 0) + (phaseWiseData.phase4_hr || 0) : 0;
//     const grandTotal = lmTotal + headTotal + hrTotal;

//     return (
//         <Box>
//             <Typography variant="h5" sx={{ mb: 3, color: "primary.main", fontWeight: "bold" }}>
//                 Performance Analysis Summary
//             </Typography>
//             <Grid container spacing={3}>
//                 <Grid item xs={12}><Card sx={{ height: "100%" }}><CardHeader title="Phase-wise Performance" titleTypographyProps={{ variant: 'h6' }} /><CardContent><TableContainer><Table size="small"><TableHead><TableRow><TableCell sx={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}>Phase</TableCell><TableCell sx={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }} align="right">Line Manager</TableCell><TableCell sx={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }} align="right">Head</TableCell><TableCell sx={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }} align="right">HR</TableCell><TableCell sx={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }} align="right">Total</TableCell></TableRow></TableHead><TableBody>{phaseWiseData && phaseKeys.map((phase, index) => {const lm = phaseWiseData[`phase${index + 1}_lm`] || 0; const head = phaseWiseData[`phase${index + 1}_head`] || 0; const hr = phaseWiseData[`phase${index + 1}_hr`] || 0; const rowTotal = lm + head + hr; return (<TableRow key={phase} ><TableCell>{["Align (P1)", "Accelerate (P2)", "Achieve (P3)", "Aspire (P4)"][index]}</TableCell><TableCell align="right">{lm.toFixed(1)}</TableCell><TableCell align="right">{head.toFixed(1)}</TableCell><TableCell align="right">{hr.toFixed(1)}</TableCell><TableCell align="right">{rowTotal.toFixed(1)}</TableCell></TableRow>);})}{<TableRow sx={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}><TableCell sx={{ fontWeight: "bold" }}>Total</TableCell><TableCell sx={{ fontWeight: "bold" }} align="right">{lmTotal.toFixed(1)}</TableCell><TableCell sx={{ fontWeight: "bold" }} align="right">{headTotal.toFixed(1)}</TableCell><TableCell sx={{ fontWeight: "bold" }} align="right">{hrTotal.toFixed(1)}</TableCell><TableCell sx={{ fontWeight: "bold" }} align="right">{grandTotal.toFixed(1)}</TableCell></TableRow>}</TableBody></Table></TableContainer></CardContent></Card></Grid>
//                 <Grid item xs={12} sm={6}><Card sx={{ height: "100%" }}><CardHeader title="KPI" titleTypographyProps={{ variant: 'h6' }} /><CardContent><TableContainer><Table size="small" sx={{ tableLayout: 'fixed' }}><TableHead><TableRow><TableCell sx={{ fontWeight: "bold", width: '15%', backgroundColor: "#f5f5f5" }}>KPI</TableCell><TableCell sx={{ fontWeight: "bold", textAlign: 'center', width: '20%', backgroundColor: "#f5f5f5" }}>Target</TableCell><TableCell sx={{ fontWeight: "bold", textAlign: 'center', width: '20%', backgroundColor: "#f5f5f5" }}>Ach</TableCell><TableCell sx={{ fontWeight: "bold", textAlign: 'center', width: '20%', backgroundColor: "#f5f5f5" }}>Rating</TableCell></TableRow></TableHead><TableBody>{kpiData.map((row, index) => (<TableRow key={index}><TableCell sx={{ p: 0.5, wordBreak: 'break-word' }}><TextField fullWidth size="small" variant="standard" value={row.kpi} onChange={(e) => handleKpiChange(index, "kpi", e.target.value)} sx={textFieldStyles} /></TableCell><TableCell sx={{ p: 0.5 }}><TextField fullWidth size="small" variant="standard" type="number" value={row.target} onChange={(e) => handleKpiChange(index, "target", e.target.value)} sx={textFieldStyles} InputProps={{ sx: { textAlign: "center" } }} /></TableCell><TableCell sx={{ p: 0.5 }}><TextField fullWidth size="small" variant="standard" type="number" value={row.ach} onChange={(e) => handleKpiChange(index, "ach", e.target.value)} sx={textFieldStyles} InputProps={{ sx: { textAlign: "center" } }} /></TableCell><TableCell sx={{ p: 0.5 }}><TextField fullWidth size="small" variant="standard" type="number" value={row.rating} onChange={(e) => handleKpiChange(index, "rating", e.target.value)} sx={textFieldStyles} InputProps={{ sx: { textAlign: "center" } }} /></TableCell></TableRow>))}</TableBody></Table></TableContainer></CardContent></Card></Grid>
//                 <Grid item xs={12} sm={6}><Card sx={{ height: "100%" }}><CardHeader title="KRA" titleTypographyProps={{ variant: 'h6' }} /><CardContent><TableContainer><Table size="small" sx={{ tableLayout: 'fixed' }}><TableHead><TableRow><TableCell sx={{ fontWeight: "bold", width: '60%', backgroundColor: "#f5f5f5" }}>KRA Parameter</TableCell><TableCell sx={{ fontWeight: "bold", textAlign: 'center', width: '40%', backgroundColor: "#f5f5f5" }}>Total Rating</TableCell></TableRow></TableHead><TableBody>{kraData.map((row, index) => (<TableRow key={index}><TableCell sx={{ p: 0.5, wordBreak: 'break-word' }}><TextField fullWidth size="small" variant="standard" value={row.parameter} onChange={(e) => handleKraChange(index, "parameter", e.target.value)} sx={textFieldStyles} /></TableCell><TableCell sx={{ p: 0.5 }}><TextField fullWidth size="small" variant="standard" type="number" value={row.totalRating} onChange={(e) => handleKraChange(index, "totalRating", e.target.value)} sx={textFieldStyles} InputProps={{ sx: { textAlign: "center" } }} /></TableCell></TableRow>))}</TableBody></Table></TableContainer></CardContent></Card></Grid>
//                 <Grid item xs={12} sx={{ mt: 2 }}><Card><CardHeader title="All Total" /><CardContent><TableContainer><Table><TableHead><TableRow><TableCell sx={{ backgroundColor: "#f5f5f5", fontWeight: "bold" }}>4AEE Program</TableCell><TableCell sx={{ backgroundColor: "#f5f5f5", fontWeight: "bold" }}>Ach % </TableCell><TableCell sx={{ backgroundColor: "#f5f5f5", fontWeight: "bold" }}>KRA/KPI</TableCell><TableCell sx={{ backgroundColor: "#f5f5f5", fontWeight: "bold" }}>Ach % </TableCell><TableCell sx={{ backgroundColor: "#f5f5f5", fontWeight: "bold" }}>Total</TableCell><TableCell sx={{ backgroundColor: "#f5f5f5", fontWeight: "bold" }}>Ach % </TableCell></TableRow></TableHead><TableBody><TableRow sx={{ fontWeight: "bold" }}><TableCell>{value4AEE.toFixed(1)}</TableCell><TableCell>{percent4AEE.toFixed(0)}%</TableCell><TableCell>{valueKpiKra.toFixed(1)}</TableCell><TableCell>{percentKpiKra.toFixed(0)}%</TableCell><TableCell sx={{ fontWeight: "bold" }}>{totalValue.toFixed(1)}</TableCell><TableCell sx={{ fontWeight: "bold" }}>{(totalValue * 10).toFixed(0)}%</TableCell></TableRow></TableBody></Table></TableContainer></CardContent></Card></Grid>
//                 <Grid item xs={12} sx={{ mt: 2 }}><Card variant="outlined"><CardHeader title="All Phases Comments" /><CardContent><TableContainer><Table><TableHead><TableRow><TableCell sx={{ backgroundColor: "#f5f5f5", fontWeight: "bold" }}>Phases</TableCell><TableCell sx={{ backgroundColor: "#f5f5f5", fontWeight: "bold" }}>Line Manager</TableCell><TableCell sx={{ backgroundColor: "#f5f5f5", fontWeight: "bold" }}>Head</TableCell><TableCell sx={{ backgroundColor: "#f5f5f5", fontWeight: "bold" }}>HR</TableCell></TableRow></TableHead><TableBody>{allPhaseComments.map((row, index) => (<TableRow key={index}><TableCell>{row.phase}</TableCell><TableCell>{row.lm}</TableCell><TableCell>{row.head}</TableCell><TableCell>{row.hr}</TableCell></TableRow>))}</TableBody></Table></TableContainer></CardContent></Card></Grid>
//                 <Grid item xs={12} sx={{ mt: 2 }}><Card variant="outlined"><CardHeader title="Overall Comments" /><CardContent><Grid container spacing={2}><Grid item xs={12}><TextField label="HR final comment" multiline rows={3} fullWidth value={overallComments.hr} onChange={(e) => handleOverallCommentChange("hr", e.target.value)} /></Grid></Grid></CardContent></Card></Grid>
//             </Grid>
//             <Box sx={{ display: "flex", justifyContent: "center", gap: 2, flexWrap: "wrap", mt: 3, pt: 2, borderTop: 1, borderColor: "divider"}}><Button variant={recommendation.type === "Confirm" ? "contained" : "outlined"} color="success" size="large" onClick={() => handleFinalAction("Confirm")}>CONFIRM EMPLOYEE</Button>{!probationExtended && (<Button variant={recommendation.type === "Extend" ? "contained" : "outlined"} color="warning" size="large" onClick={() => setOpenExtendDialog(true)}>EXTEND PROBATION</Button>)}<Button variant={recommendation.type === "Terminate" ? "contained" : "outlined"} color="error" size="large" onClick={() => handleFinalAction("Terminate")}>TERMINATE EMPLOYEE</Button></Box>
//             <Dialog open={openExtendDialog} onClose={() => setOpenExtendDialog(false)} fullWidth maxWidth="sm"><DialogTitle sx={{ color: themeColors.primary, fontWeight: "bold" }}>Confirm Probation Extension</DialogTitle><DialogContent><Typography>Are you sure you want to extend the probation for 3 months for <strong>{employeeName}</strong>?</Typography></DialogContent><DialogActions><Button onClick={() => setOpenExtendDialog(false)}>No</Button><Button onClick={handleConfirmExtend} variant="contained" sx={{ backgroundColor: themeColors.primary, "&:hover": { backgroundColor: themeColors.primaryDark } }}>Yes</Button></DialogActions></Dialog>
//         </Box>
//     );
// };

// export default function PerformanceManagement() {
//   const [activeTab, setActiveTab] = useState(0);
//   const [designations, setDesignations] = useState([]);
//   const [selectedDesignation, setSelectedDesignation] = useState("");
//   const [selectedEmployee, setSelectedEmployee] = useState("");
//   const [filteredEmployees, setFilteredEmployees] = useState([]);
//   const [parameters, setParameters] = useState(initialParameters);
//   const [ratings, setRatings] = useState({ phase1: {}, phase2: {}, phase3: {}, phase4: {} });
//   const [parametersLoading, setParametersLoading] = useState(false);
//   const [employeesLoading, setEmployeesLoading] = useState(false);

//   useEffect(() => {
//     const fetchDesignations = async () => {
//       try {
//         const response = await fetch("https://tdtlworld.com/hrms-backend/api/designations/dropdown/");
//         if (!response.ok) throw new Error('Network response was not ok');
//         const result = await response.json();
//         if (result && Array.isArray(result.data)) {
//             setDesignations(result.data);
//         } else {
//             console.error("Fetched data for designations is not in the expected format:", result);
//             setDesignations([]);
//         }
//       } catch (error) {
//         console.error("Error fetching designations:", error);
//         setDesignations([]);
//       }
//     };
//     fetchDesignations();
//   }, []);

//   useEffect(() => {
//     const fetchEmployeesByDesignation = async () => {
//         if (!selectedDesignation) {
//             setFilteredEmployees([]);
//             return;
//         }
//         const designation = designations.find(d => d.designation_name === selectedDesignation);
//         if (!designation) return;

//         setEmployeesLoading(true);
//         try {
//             const response = await fetch(`https://tdtlworld.com/hrms-backend/api/employees_by_designation/?designation_id=${designation.designation_id}`);
//             if (!response.ok) throw new Error('Failed to fetch employees');
//             const result = await response.json();
//             if (result && Array.isArray(result.data)) {
//                 setFilteredEmployees(result.data);
//             } else {
//                 console.error("Fetched employee data is not in the expected format:", result);
//                 setFilteredEmployees([]);
//             }
//         } catch (error) {
//             console.error("Error fetching employees:", error);
//             setFilteredEmployees([]);
//         } finally {
//             setEmployeesLoading(false);
//         }
//     };
//     fetchEmployeesByDesignation();
//   }, [selectedDesignation, designations]);

//   useEffect(() => {
//     const fetchPhaseParameters = async () => {
//         if (!selectedEmployee) return;

//         const employee = filteredEmployees.find(e => e.id === selectedEmployee);
//         if (!employee?.designation_id) return;

//         setParametersLoading(true);
//         try {
//             const phases = [1, 2, 3, 4];
//             const requests = phases.map(phase =>
//                 fetch(`https://tdtlworld.com/hrms-backend/apis/get_desigwise_tabledata/?phase=${phase}&designation_id=${employee.designation_id}`)
//             );
//             const responses = await Promise.all(requests);
//             const dataPromises = responses.map(res => {
//                 if (!res.ok) throw new Error(`Failed to fetch data for a phase`);
//                 return res.json();
//             });
//             const results = await Promise.all(dataPromises);

//             const newParameters = {
//                 phase1: results[0]?.data?.map(p => p.para_name) || [],
//                 phase2: results[1]?.data?.map(p => p.para_name) || [],
//                 phase3: results[2]?.data?.map(p => p.para_name) || [],
//                 phase4: results[3]?.data?.map(p => p.para_name) || [],
//             };
//             setParameters(newParameters);
//         } catch (error) {
//             console.error("Failed to fetch phase parameters:", error);
//             setParameters(initialParameters);
//         } finally {
//             setParametersLoading(false);
//         }
//     };
//     fetchPhaseParameters();
//   }, [selectedEmployee, filteredEmployees]);

//   const resetFormState = () => {
//     setRatings({ phase1: {}, phase2: {}, phase3: {}, phase4: {} });
//     setParameters(initialParameters);
//     setActiveTab(0);
//   };

//   const handleDesignationChange = (event) => {
//     const designationName = event.target.value;
//     setSelectedDesignation(designationName);
//     setSelectedEmployee("");
//     setFilteredEmployees([]);
//     resetFormState();
//   };

//   const handleEmployeeChange = (event) => {
//     const employeeId = event.target.value;
//     setSelectedEmployee(employeeId);
//     setRatings({ phase1: {}, phase2: {}, phase3: {}, phase4: {} });
//     setActiveTab(0);
//   };

//   const handleTabChange = (event, newValue) => {
//     setActiveTab(newValue);
//   };

//   const calculateAverage = (lineManager, head, hr) => {
//     const values = [lineManager, head, hr].filter((val) => val && !isNaN(val));
//     if (values.length === 0) return 0;
//     const sum = values.reduce((sum, val) => sum + Number.parseFloat(val), 0);
//     return (sum / values.length).toFixed(1);
//   };

//   const calculatePhaseTotal = (phase) => {
//     const phaseParams = parameters[phase] || [];
//     let lineManagerTotal = 0, headTotal = 0, hrTotal = 0;
//     let lmCount = 0, headCount = 0, hrCount = 0;
//     phaseParams.forEach((param, index) => {
//       const rating = ratings[phase][index] || {};
//       if (rating.lineManager && !isNaN(rating.lineManager)) {
//         lineManagerTotal += Number.parseFloat(rating.lineManager);
//         lmCount++;
//       }
//       if (rating.head && !isNaN(rating.head)) {
//         headTotal += Number.parseFloat(rating.head);
//         headCount++;
//       }
//       if (rating.hr && !isNaN(rating.hr)) {
//         hrTotal += Number.parseFloat(rating.hr);
//         hrCount++;
//       }
//     });
//     return {
//       lineManager: lmCount > 0 ? (lineManagerTotal / lmCount).toFixed(1) : 0,
//       head: headCount > 0 ? (headTotal / headCount).toFixed(1) : 0,
//       hr: hrCount > 0 ? (hrTotal / hrCount).toFixed(1) : 0,
//     };
//   };

//   const updateRating = (phase, paramIndex, rater, value) => {
//     const numericValue = value.replace(/[^0-9.]/g, "");
//     if (numericValue === "" || (Number(numericValue) >= 1 && Number(numericValue) <= 10)) {
//       setRatings((prev) => ({...prev, [phase]: {...prev[phase], [paramIndex]: {...prev[phase][paramIndex], [rater]: numericValue}}}));
//     }
//   };

//   const renderPhaseTable = (phase, phaseTitle, dayRange) => {
//     if (parametersLoading) {
//         return <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress /></Box>;
//     }
//     const phaseParams = parameters[phase] || [];
//     const phaseTotal = calculatePhaseTotal(phase);
//     return (
//       <Card sx={{ mb: 3 }}>
//         <CardContent>
//           <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
//             <Typography variant="h6" sx={{ color: themeColors.primary, fontWeight: "bold" }}>
//               {phaseTitle} ({dayRange})
//             </Typography>
//           </Box>
//           <TableContainer component={Paper}>
//             <Table sx={{ minWidth: "100%", whiteSpace: "nowrap" }}>
//               <TableHead sx={{ backgroundColor: themeColors.primary }}>
//                 <TableRow>
//                   <TableCell sx={{ color: themeColors.textOnPrimary, fontWeight: "bold", width: "5%" }}>Sr. No.</TableCell>
//                   <TableCell sx={{ color: themeColors.textOnPrimary, fontWeight: "bold", width: "35%" }}>Parameters</TableCell>
//                   <TableCell sx={{ color: themeColors.textOnPrimary, fontWeight: "bold", textAlign: "center", width: "15%" }}>Line Manager</TableCell>
//                   <TableCell sx={{ color: themeColors.textOnPrimary, fontWeight: "bold", textAlign: "center", width: "15%" }}>Head</TableCell>
//                   <TableCell sx={{ color: themeColors.textOnPrimary, fontWeight: "bold", textAlign: "center", width: "15%" }}>HR</TableCell>
//                   <TableCell sx={{ color: themeColors.textOnPrimary, fontWeight: "bold", textAlign: "center", width: "10%" }}>Average</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {phaseParams.map((param, index) => {
//                   const rating = ratings[phase][index] || {};
//                   const average = calculateAverage(rating.lineManager, rating.head, rating.hr);
//                   return (
//                     <TableRow key={index} sx={{ "&:hover": { backgroundColor: "action.hover" } }}>
//                       <TableCell>{index + 1}</TableCell>
//                       <TableCell>{param}</TableCell>
//                       <TableCell align="center"><TextField disabled type="number" inputProps={{ min: 1, max: 10, step: "0.1" }} value={rating.lineManager || ""} onChange={(e) => updateRating(phase, index, "lineManager", e.target.value)} size="small" sx={{ width: "60px" }} /></TableCell>
//                       <TableCell align="center"><TextField disabled type="number" inputProps={{ min: 1, max: 10, step: "0.1" }} value={rating.head || ""} onChange={(e) => updateRating(phase, index, "head", e.target.value)} size="small" sx={{ width: "60px" }} /></TableCell>
//                       <TableCell align="center"><TextField type="number" inputProps={{ min: 1, max: 10, step: "0.1" }} value={rating.hr || ""} onChange={(e) => updateRating(phase, index, "hr", e.target.value)} size="small" sx={{ width: "60px" }} /></TableCell>
//                       <TableCell align="center" sx={{ fontWeight: "bold", color: themeColors.primary }}>{average}</TableCell>
//                     </TableRow>
//                   );
//                 })}
//                 <TableRow sx={{ backgroundColor: "action.selected" }}>
//                   <TableCell colSpan={2} sx={{ fontWeight: "bold" }}>Total</TableCell>
//                   <TableCell align="center" sx={{ fontWeight: "bold" }}>{phaseTotal.lineManager}</TableCell>
//                   <TableCell align="center" sx={{ fontWeight: "bold" }}>{phaseTotal.head}</TableCell>
//                   <TableCell align="center" sx={{ fontWeight: "bold" }}>{phaseTotal.hr}</TableCell>
//                   <TableCell align="center" sx={{ fontWeight: "bold", color: themeColors.primary }}>{calculateAverage(phaseTotal.lineManager, phaseTotal.head, phaseTotal.hr)}</TableCell>
//                 </TableRow>
//               </TableBody>
//             </Table>
//           </TableContainer>
//           <Grid container spacing={2} sx={{ mt: 2 }}><Grid item xs={12} md={4}><TextField disabled label="Line Manager Comments" multiline rows={3} fullWidth variant="outlined" /></Grid><Grid item xs={12} md={4}><TextField disabled label="Head Comments" multiline rows={3} fullWidth variant="outlined" /></Grid><Grid item xs={12} md={4}><TextField label="HR Comments" multiline rows={3} fullWidth variant="outlined" /></Grid></Grid>
//           <Box sx={{ textAlign: "center", mt: 2 }}><Button variant="contained" startIcon={<SaveIcon />} sx={{ backgroundColor: themeColors.primary, "&:hover": { backgroundColor: themeColors.primaryDark } }}>Save {phaseTitle}</Button></Box>
//         </CardContent>
//       </Card>
//     );
//   };

//   return (
//     <Box component={Paper} p={3}>
//       <Typography variant="h4" sx={{ color: themeColors.primary, fontWeight: "bold", mb: 5 }}>
//         Employee Confirmation
//       </Typography>
//       <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, justifyContent: "space-between", alignItems: { md: "center" }, gap: 2, mb: 3, }}>
//         <Box sx={{ display: "flex", gap: 2, flexDirection: { xs: "column", sm: "row" }, width: { xs: "100%", md: "350px" } }}>
//           <FormControl fullWidth>
//             <InputLabel id="designation-select-label">Select Designation</InputLabel>
//             <Select labelId="designation-select-label" value={selectedDesignation} onChange={handleDesignationChange} label="Select Designation">
//               {designations.map((d) => (<MenuItem key={d.designation_id} value={d.designation_name}>{d.designation_name}</MenuItem>))}
//             </Select>
//           </FormControl>
//           <FormControl fullWidth disabled={!selectedDesignation}>
//             <InputLabel id="employee-select-label">Select Employee</InputLabel>
//             <Select labelId="employee-select-label" value={selectedEmployee} onChange={handleEmployeeChange} label="Select Employee" MenuProps={{ PaperProps: { sx: { maxHeight: 200 } } }}>
//               {employeesLoading ? (
//                   <MenuItem disabled><CircularProgress size={20} /></MenuItem>
//               ) : (
//                 filteredEmployees.map((e) => (<MenuItem key={e.id} value={e.id}>{`${e.employee_name} (${e.employee_id})`}</MenuItem>))
//               )}
//             </Select>
//           </FormControl>
//         </Box>
//       </Box>
//       {selectedEmployee && (
//         <>
//           <Tabs value={activeTab} onChange={handleTabChange} variant="scrollable" scrollButtons="auto" aria-label="performance-review-tabs" sx={{ borderBottom: 1, borderColor: "divider", mb: 2, "& .Mui-selected": { color: `${themeColors.primary} !important`, fontWeight: "bold" }, "& .MuiTabs-indicator": { backgroundColor: themeColors.primary }, }}>
//             <Tab label="Phase 1: Align" id="tab-0" aria-controls="tabpanel-0" />
//             <Tab label="Phase 2: Accelerate" id="tab-1" aria-controls="tabpanel-1" />
//             <Tab label="Phase 3: Achieve" id="tab-2" aria-controls="tabpanel-2" />
//             <Tab label="Phase 4: Aspire" id="tab-3" aria-controls="tabpanel-3" />
//             <Tab label="Overall Analysis" id="tab-4" aria-controls="tabpanel-4" />
//           </Tabs>
//           <TabPanel value={activeTab} index={0}>{renderPhaseTable("phase1", "Phase 1: Align", "Day 1 to 30")}</TabPanel>
//           <TabPanel value={activeTab} index={1}>{renderPhaseTable("phase2", "Phase 2: Accelerate", "Day 30 to 60")}</TabPanel>
//           <TabPanel value={activeTab} index={2}>{renderPhaseTable("phase3", "Phase 3: Achieve", "Day 60 to 90")}</TabPanel>
//           <TabPanel value={activeTab} index={3}>{renderPhaseTable("phase4", "Phase 4: Aspire", "Day 90 to 180")}</TabPanel>
//           <TabPanel value={activeTab} index={4}>
//             <OverallAnalysis userId={selectedEmployee} employeesData={filteredEmployees}/>
//           </TabPanel>
//         </>
//       )}
//     </Box>
//   );
// }






// import { useState, useEffect } from "react"
// import {
//   Container,
//   Paper,
//   Typography,
//   Box,
//   Tabs,
//   Tab,
//   Button,
//   TextField,
//   Select,
//   MenuItem,
//   FormControl,
//   InputLabel,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Grid,
//   Card,
//   CardContent,
//   IconButton,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Alert,
//   Checkbox,
//   FormControlLabel,
//   Skeleton,
//   CardHeader,
//   CircularProgress,
// } from "@mui/material"
// import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon, Save as SaveIcon } from "@mui/icons-material"

// const initialParameters = { phase1: [], phase2: [], phase3: [], phase4: [] };

// const themeColors = {
//   primary: "#8C257C",
//   primaryDark: "#6d1d60",
//   secondary: "#F58E35",
//   textOnPrimary: "#FFFFFF",
// }

// function TabPanel({ children, value, index, ...other }) {
//   return (
//     <div role="tabpanel" hidden={value !== index} id={`tabpanel-${index}`} aria-labelledby={`tab-${index}`} {...other}>
//       {value === index && <Box sx={{ p: { xs: 1, sm: 3 } }}>{children}</Box>}
//     </div>
//   )
// }

// const OverallAnalysis = ({ userId, employeesData }) => {
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [allPhaseComments, setAllPhaseComments] = useState([]);
//     const [overallComments, setOverallComments] = useState({ hr: "" });
//     const [phaseWiseData, setPhaseWiseData] = useState(null);
//     const [openExtendDialog, setOpenExtendDialog] = useState(false);
//     const [probationExtended, setProbationExtended] = useState(false);

//     const [kpiData, setKpiData] = useState([
//         { kpi: "A", target: 1, ach: 1, rating: 5 },
//         { kpi: "B", target: 2, ach: 5, rating: 7 },
//         { kpi: "C", target: 3, ach: 6, rating: 9 },
//     ]);

//     const [kraData, setKraData] = useState([
//         { parameter: "HADC", totalRating: 10 },
//         { parameter: "QCP", totalRating: 10 },
//     ]);

//     const handleFinalAction = (action) => {
//         const employee = employeesData.find((e) => e.id === userId)
//         const message = `Action: ${action.toUpperCase()} for employee ${employee?.employee_name}.`
//         console.log(message)
//         alert(message)
//     }

//     const handleConfirmExtend = () => {
//         const message = `The probation has been extended by 3 months.`
//         console.log(message)
//         alert(message)
//         setProbationExtended(true)
//         setOpenExtendDialog(false)
//     }

//     useEffect(() => {
//         const fetchPhaseWiseData = async () => {
//             if (!userId) {
//                 setError("User ID not found.");
//                 setLoading(false);
//                 return;
//             }
//             try {
//                 setLoading(true);
//                 const response = await fetch(`https://tdtlworld.com/hrms-backend/apis/get_employee_overall_phasewise/?user_id=${userId}`);
//                 const result = await response.json();

//                 if (result.status === "success") {
//                     setPhaseWiseData(result.data);
//                     setOverallComments({ hr: result.data.final_hr_comment || "" });
//                 } else {
//                     throw new Error("Failed to fetch phase data.");
//                 }
//             } catch (error) {
//                 console.error("Failed to fetch phase-wise data:", error);
//                 setError("Could not load phase-wise performance data.");
//             } finally {
//                 setLoading(false);
//             }
//         };

//         const fetchAllPhaseComments = async () => {
//             if (!userId) return;
//             try {
//                 const response = await fetch(`https://tdtlworld.com/hrms-backend/apis/get_phasewise_data/${userId}/`);
//                 const result = await response.json();

//                 if (result.status === "success" && Array.isArray(result.data)) {
//                     const comments = [1, 2, 3, 4].map(phaseNum => {
//                         const phaseData = result.data.find(item => item.phase === phaseNum);
//                         return {
//                             phase: `Phase ${phaseNum}`,
//                             lm: phaseData?.comment_by_lm || "N/A",
//                             head: phaseData?.comment_by_head || "N/A",
//                             hr: phaseData?.comment_by_hr || "N/A",
//                         };
//                     });
//                     setAllPhaseComments(comments);
//                 }
//             } catch (error) {
//                 console.error("Failed to fetch all phase comments:", error);
//             }
//         };

//         fetchPhaseWiseData();
//         fetchAllPhaseComments();
//     }, [userId]);

//     const handleKpiChange = (index, field, value) => {
//         const newData = [...kpiData];
//         const isNumeric = ["target", "ach", "rating"].includes(field);
//         newData[index][field] = isNumeric ? Number(value) : value;
//         setKpiData(newData);
//     };

//     const handleKraChange = (index, field, value) => {
//         const newData = [...kraData];
//         newData[index][field] = field === "totalRating" ? Number(value) : value;
//         setKraData(newData);
//     };

//     const handleOverallCommentChange = (rater, value) => {
//         setOverallComments(prev => ({ ...prev, [rater]: value }));
//     };

//     if (loading) {
//         return <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress /></Box>;
//     }
//     if (error) {
//         return <Alert severity="error" sx={{ m: 2 }}>{error}</Alert>;
//     }

//     const phaseKeys = ["phase1", "phase2", "phase3", "phase4"];
//     const kpiRatings = kpiData.map((item) => Number(item.rating) || 0);
//     const kraRatings = kraData.map((item) => Number(item.totalRating) || 0);
//     const allKpiKraRatings = [...kpiRatings, ...kraRatings].filter((r) => r > 0);
//     const kpiKraAverage = allKpiKraRatings.length > 0 ? (allKpiKraRatings.reduce((sum, r) => sum + r, 0) / allKpiKraRatings.length).toFixed(1) : "0.0";
//     const textFieldStyles = { padding: '2px 4px', '& .MuiInput-underline:before': { borderBottom: 'none' }, '& .MuiInput-underline:hover:not(.Mui-disabled):before': { borderBottom: 'none' }, '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)', borderRadius: '4px' }, };

//     let value4AEE = 0;
//     let percent4AEE = 0;
//     if (phaseWiseData) {
//         const scoreKeys = [
//             'phase1_lm', 'phase2_lm', 'phase3_lm', 'phase4_lm',
//             'phase1_head', 'phase2_head', 'phase3_head', 'phase4_head',
//             'phase1_hr', 'phase2_hr', 'phase3_hr', 'phase4_hr'
//         ];
//         const totalApiScore = scoreKeys.reduce((sum, key) => sum + (phaseWiseData[key] || 0), 0);
//         const maxPhaseScorePerSlot = 40;
//         const totalMaxScore = 12 * maxPhaseScorePerSlot;

//         if (totalMaxScore > 0) {
//             value4AEE = (totalApiScore / totalMaxScore) * 10;
//             percent4AEE = (totalApiScore / totalMaxScore) * 100;
//         }
//     }

//     const valueKpiKra = parseFloat(kpiKraAverage);
//     const percentKpiKra = valueKpiKra * 10;
//     const totalValue = (value4AEE + valueKpiKra) / 2;

//     const getRecommendation = () => {
//         const avgScore = totalValue;
//         if (avgScore >= 8) return { type: "Confirm", color: "success" };
//         if (avgScore >= 6) return { type: "Extend", color: "warning" };
//         return { type: "Terminate", color: "error" };
//     }
//     const recommendation = getRecommendation();
//     const employeeName = employeesData.find((e) => e.id === userId)?.employee_name || "the employee";

//     const lmTotal = phaseWiseData ?
//         (phaseWiseData.phase1_lm || 0) + (phaseWiseData.phase2_lm || 0) + (phaseWiseData.phase3_lm || 0) + (phaseWiseData.phase4_lm || 0) : 0;
//     const headTotal = phaseWiseData ?
//         (phaseWiseData.phase1_head || 0) + (phaseWiseData.phase2_head || 0) + (phaseWiseData.phase3_head || 0) + (phaseWiseData.phase4_head || 0) : 0;
//     const hrTotal = phaseWiseData ?
//         (phaseWiseData.phase1_hr || 0) + (phaseWiseData.phase2_hr || 0) + (phaseWiseData.phase3_hr || 0) + (phaseWiseData.phase4_hr || 0) : 0;
//     const grandTotal = lmTotal + headTotal + hrTotal;

//     return (
//         <Box>
//             <Typography variant="h5" sx={{ mb: 3, color: "primary.main", fontWeight: "bold" }}>
//                 Performance Analysis Summary
//             </Typography>
//             <Grid container spacing={3}>
//                 <Grid item xs={12}><Card sx={{ height: "100%" }}><CardHeader title="Phase-wise Performance" titleTypographyProps={{ variant: 'h6' }} /><CardContent><TableContainer><Table size="small"><TableHead><TableRow><TableCell sx={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}>Phase</TableCell><TableCell sx={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }} align="right">Line Manager</TableCell><TableCell sx={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }} align="right">Head</TableCell><TableCell sx={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }} align="right">HR</TableCell><TableCell sx={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }} align="right">Total</TableCell></TableRow></TableHead><TableBody>{phaseWiseData && phaseKeys.map((phase, index) => {const lm = phaseWiseData[`phase${index + 1}_lm`] || 0; const head = phaseWiseData[`phase${index + 1}_head`] || 0; const hr = phaseWiseData[`phase${index + 1}_hr`] || 0; const rowTotal = lm + head + hr; return (<TableRow key={phase} ><TableCell>{["Align (P1)", "Accelerate (P2)", "Achieve (P3)", "Aspire (P4)"][index]}</TableCell><TableCell align="right">{lm.toFixed(1)}</TableCell><TableCell align="right">{head.toFixed(1)}</TableCell><TableCell align="right">{hr.toFixed(1)}</TableCell><TableCell align="right">{rowTotal.toFixed(1)}</TableCell></TableRow>);})}{<TableRow sx={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}><TableCell sx={{ fontWeight: "bold" }}>Total</TableCell><TableCell sx={{ fontWeight: "bold" }} align="right">{lmTotal.toFixed(1)}</TableCell><TableCell sx={{ fontWeight: "bold" }} align="right">{headTotal.toFixed(1)}</TableCell><TableCell sx={{ fontWeight: "bold" }} align="right">{hrTotal.toFixed(1)}</TableCell><TableCell sx={{ fontWeight: "bold" }} align="right">{grandTotal.toFixed(1)}</TableCell></TableRow>}</TableBody></Table></TableContainer></CardContent></Card></Grid>
//                 <Grid item xs={12} sm={6}><Card sx={{ height: "100%" }}><CardHeader title="KPI" titleTypographyProps={{ variant: 'h6' }} /><CardContent><TableContainer><Table size="small" sx={{ tableLayout: 'fixed' }}><TableHead><TableRow><TableCell sx={{ fontWeight: "bold", width: '15%', backgroundColor: "#f5f5f5" }}>KPI</TableCell><TableCell sx={{ fontWeight: "bold", textAlign: 'center', width: '20%', backgroundColor: "#f5f5f5" }}>Target</TableCell><TableCell sx={{ fontWeight: "bold", textAlign: 'center', width: '20%', backgroundColor: "#f5f5f5" }}>Ach</TableCell><TableCell sx={{ fontWeight: "bold", textAlign: 'center', width: '20%', backgroundColor: "#f5f5f5" }}>Rating</TableCell></TableRow></TableHead><TableBody>{kpiData.map((row, index) => (<TableRow key={index}><TableCell sx={{ p: 0.5, wordBreak: 'break-word' }}><TextField fullWidth size="small" variant="standard" value={row.kpi} onChange={(e) => handleKpiChange(index, "kpi", e.target.value)} sx={textFieldStyles} /></TableCell><TableCell sx={{ p: 0.5 }}><TextField fullWidth size="small" variant="standard" type="number" value={row.target} onChange={(e) => handleKpiChange(index, "target", e.target.value)} sx={textFieldStyles} InputProps={{ sx: { textAlign: "center" } }} /></TableCell><TableCell sx={{ p: 0.5 }}><TextField fullWidth size="small" variant="standard" type="number" value={row.ach} onChange={(e) => handleKpiChange(index, "ach", e.target.value)} sx={textFieldStyles} InputProps={{ sx: { textAlign: "center" } }} /></TableCell><TableCell sx={{ p: 0.5 }}><TextField fullWidth size="small" variant="standard" type="number" value={row.rating} onChange={(e) => handleKpiChange(index, "rating", e.target.value)} sx={textFieldStyles} InputProps={{ sx: { textAlign: "center" } }} /></TableCell></TableRow>))}</TableBody></Table></TableContainer></CardContent></Card></Grid>
//                 <Grid item xs={12} sm={6}><Card sx={{ height: "100%" }}><CardHeader title="KRA" titleTypographyProps={{ variant: 'h6' }} /><CardContent><TableContainer><Table size="small" sx={{ tableLayout: 'fixed' }}><TableHead><TableRow><TableCell sx={{ fontWeight: "bold", width: '60%', backgroundColor: "#f5f5f5" }}>KRA Parameter</TableCell><TableCell sx={{ fontWeight: "bold", textAlign: 'center', width: '40%', backgroundColor: "#f5f5f5" }}>Total Rating</TableCell></TableRow></TableHead><TableBody>{kraData.map((row, index) => (<TableRow key={index}><TableCell sx={{ p: 0.5, wordBreak: 'break-word' }}><TextField fullWidth size="small" variant="standard" value={row.parameter} onChange={(e) => handleKraChange(index, "parameter", e.target.value)} sx={textFieldStyles} /></TableCell><TableCell sx={{ p: 0.5 }}><TextField fullWidth size="small" variant="standard" type="number" value={row.totalRating} onChange={(e) => handleKraChange(index, "totalRating", e.target.value)} sx={textFieldStyles} InputProps={{ sx: { textAlign: "center" } }} /></TableCell></TableRow>))}</TableBody></Table></TableContainer></CardContent></Card></Grid>
//                 <Grid item xs={12} sx={{ mt: 2 }}><Card><CardHeader title="All Total" /><CardContent><TableContainer><Table><TableHead><TableRow><TableCell sx={{ backgroundColor: "#f5f5f5", fontWeight: "bold" }}>4AEE Program</TableCell><TableCell sx={{ backgroundColor: "#f5f5f5", fontWeight: "bold" }}>Ach % </TableCell><TableCell sx={{ backgroundColor: "#f5f5f5", fontWeight: "bold" }}>KRA/KPI</TableCell><TableCell sx={{ backgroundColor: "#f5f5f5", fontWeight: "bold" }}>Ach % </TableCell><TableCell sx={{ backgroundColor: "#f5f5f5", fontWeight: "bold" }}>Total</TableCell><TableCell sx={{ backgroundColor: "#f5f5f5", fontWeight: "bold" }}>Ach % </TableCell></TableRow></TableHead><TableBody><TableRow sx={{ fontWeight: "bold" }}><TableCell>{value4AEE.toFixed(1)}</TableCell><TableCell>{percent4AEE.toFixed(0)}%</TableCell><TableCell>{valueKpiKra.toFixed(1)}</TableCell><TableCell>{percentKpiKra.toFixed(0)}%</TableCell><TableCell sx={{ fontWeight: "bold" }}>{totalValue.toFixed(1)}</TableCell><TableCell sx={{ fontWeight: "bold" }}>{(totalValue * 10).toFixed(0)}%</TableCell></TableRow></TableBody></Table></TableContainer></CardContent></Card></Grid>
//                 <Grid item xs={12} sx={{ mt: 2 }}><Card variant="outlined"><CardHeader title="All Phases Comments" /><CardContent><TableContainer><Table><TableHead><TableRow><TableCell sx={{ backgroundColor: "#f5f5f5", fontWeight: "bold" }}>Phases</TableCell><TableCell sx={{ backgroundColor: "#f5f5f5", fontWeight: "bold" }}>Line Manager</TableCell><TableCell sx={{ backgroundColor: "#f5f5f5", fontWeight: "bold" }}>Head</TableCell><TableCell sx={{ backgroundColor: "#f5f5f5", fontWeight: "bold" }}>HR</TableCell></TableRow></TableHead><TableBody>{allPhaseComments.map((row, index) => (<TableRow key={index}><TableCell>{row.phase}</TableCell><TableCell>{row.lm}</TableCell><TableCell>{row.head}</TableCell><TableCell>{row.hr}</TableCell></TableRow>))}</TableBody></Table></TableContainer></CardContent></Card></Grid>
//                 <Grid item xs={12} sx={{ mt: 2 }}><Card variant="outlined"><CardHeader title="Overall Comments" /><CardContent><Grid container spacing={2}><Grid item xs={12}><TextField label="HR final comment" multiline rows={3} fullWidth value={overallComments.hr} onChange={(e) => handleOverallCommentChange("hr", e.target.value)} /></Grid></Grid></CardContent></Card></Grid>
//             </Grid>
//             <Box sx={{ display: "flex", justifyContent: "center", gap: 2, flexWrap: "wrap", mt: 3, pt: 2, borderTop: 1, borderColor: "divider"}}><Button variant={recommendation.type === "Confirm" ? "contained" : "outlined"} color="success" size="large" onClick={() => handleFinalAction("Confirm")}>CONFIRM EMPLOYEE</Button>{!probationExtended && (<Button variant={recommendation.type === "Extend" ? "contained" : "outlined"} color="warning" size="large" onClick={() => setOpenExtendDialog(true)}>EXTEND PROBATION</Button>)}<Button variant={recommendation.type === "Terminate" ? "contained" : "outlined"} color="error" size="large" onClick={() => handleFinalAction("Terminate")}>TERMINATE EMPLOYEE</Button></Box>
//             <Dialog open={openExtendDialog} onClose={() => setOpenExtendDialog(false)} fullWidth maxWidth="sm"><DialogTitle sx={{ color: themeColors.primary, fontWeight: "bold" }}>Confirm Probation Extension</DialogTitle><DialogContent><Typography>Are you sure you want to extend the probation for 3 months for <strong>{employeeName}</strong>?</Typography></DialogContent><DialogActions><Button onClick={() => setOpenExtendDialog(false)}>No</Button><Button onClick={handleConfirmExtend} variant="contained" sx={{ backgroundColor: themeColors.primary, "&:hover": { backgroundColor: themeColors.primaryDark } }}>Yes</Button></DialogActions></Dialog>
//         </Box>
//     );
// };

// export default function PerformanceManagement() {
//   const [activeTab, setActiveTab] = useState(0);
//   const [allEmployees, setAllEmployees] = useState([]);
//   const [designations, setDesignations] = useState([]);
//   const [selectedDesignation, setSelectedDesignation] = useState("");
//   const [selectedEmployee, setSelectedEmployee] = useState("");
//   const [filteredEmployees, setFilteredEmployees] = useState([]);
//   const [parameters, setParameters] = useState(initialParameters);
//   const [ratings, setRatings] = useState({ phase1: {}, phase2: {}, phase3: {}, phase4: {} });
//   const [parametersLoading, setParametersLoading] = useState(false);
//   const [employeesLoading, setEmployeesLoading] = useState(false);

//   useEffect(() => {
//     const fetchAllEmployees = async () => {
//       setEmployeesLoading(true);
//       try {
//         const response = await fetch("https://tdtlworld.com/hrms-backend/api/employees_by_designation/");
//         if (!response.ok) throw new Error('Network response was not ok');
//         const result = await response.json();
//         if (result && Array.isArray(result.data)) {
//           setAllEmployees(result.data);
//           const uniqueDesignations = [...new Set(result.data.map(emp => emp.designation_name))];
//           setDesignations(uniqueDesignations.map(d => ({ designation_name: d })));
//         } else {
//           console.error("Fetched data is not in the expected format:", result);
//           setAllEmployees([]);
//           setDesignations([]);
//         }
//       } catch (error) {
//         console.error("Error fetching employees:", error);
//         setAllEmployees([]);
//         setDesignations([]);
//       } finally {
//         setEmployeesLoading(false);
//       }
//     };
//     fetchAllEmployees();
//   }, []);


//   useEffect(() => {
//     const fetchPhaseParameters = async () => {
//         if (!selectedEmployee) return;

//         const employee = filteredEmployees.find(e => e.id === selectedEmployee);
//         if (!employee?.designation_id) return;

//         setParametersLoading(true);
//         try {
//             const phases = [1, 2, 3, 4];
//             const requests = phases.map(phase =>
//                 fetch(`https://tdtlworld.com/hrms-backend/apis/get_desigwise_tabledata/?phase=${phase}&designation_id=${employee.designation_id}`)
//             );
//             const responses = await Promise.all(requests);
//             const dataPromises = responses.map(res => {
//                 if (!res.ok) throw new Error(`Failed to fetch data for a phase`);
//                 return res.json();
//             });
//             const results = await Promise.all(dataPromises);

//             const newParameters = {
//                 phase1: results[0]?.data?.map(p => p.para_name) || [],
//                 phase2: results[1]?.data?.map(p => p.para_name) || [],
//                 phase3: results[2]?.data?.map(p => p.para_name) || [],
//                 phase4: results[3]?.data?.map(p => p.para_name) || [],
//             };
//             setParameters(newParameters);
//         } catch (error) {
//             console.error("Failed to fetch phase parameters:", error);
//             setParameters(initialParameters);
//         } finally {
//             setParametersLoading(false);
//         }
//     };
//     fetchPhaseParameters();
//   }, [selectedEmployee, filteredEmployees]);

//   const resetFormState = () => {
//     setRatings({ phase1: {}, phase2: {}, phase3: {}, phase4: {} });
//     setParameters(initialParameters);
//     setActiveTab(0);
//   };

//   const handleDesignationChange = (event) => {
//     const designationName = event.target.value;
//     setSelectedDesignation(designationName);
//     setSelectedEmployee("");
//     if (designationName) {
//       const filtered = allEmployees.filter(emp => emp.designation_name === designationName);
//       setFilteredEmployees(filtered);
//     } else {
//       setFilteredEmployees([]);
//     }
//     resetFormState();
//   };

//   const handleEmployeeChange = (event) => {
//     const employeeId = event.target.value;
//     setSelectedEmployee(employeeId);
//     setRatings({ phase1: {}, phase2: {}, phase3: {}, phase4: {} });
//     setActiveTab(0);
//   };

//   const handleTabChange = (event, newValue) => {
//     setActiveTab(newValue);
//   };

//   const calculateAverage = (lineManager, head, hr) => {
//     const values = [lineManager, head, hr].filter((val) => val && !isNaN(val));
//     if (values.length === 0) return 0;
//     const sum = values.reduce((sum, val) => sum + Number.parseFloat(val), 0);
//     return (sum / values.length).toFixed(1);
//   };

//   const calculatePhaseTotal = (phase) => {
//     const phaseParams = parameters[phase] || [];
//     let lineManagerTotal = 0, headTotal = 0, hrTotal = 0;
//     let lmCount = 0, headCount = 0, hrCount = 0;
//     phaseParams.forEach((param, index) => {
//       const rating = ratings[phase][index] || {};
//       if (rating.lineManager && !isNaN(rating.lineManager)) {
//         lineManagerTotal += Number.parseFloat(rating.lineManager);
//         lmCount++;
//       }
//       if (rating.head && !isNaN(rating.head)) {
//         headTotal += Number.parseFloat(rating.head);
//         headCount++;
//       }
//       if (rating.hr && !isNaN(rating.hr)) {
//         hrTotal += Number.parseFloat(rating.hr);
//         hrCount++;
//       }
//     });
//     return {
//       lineManager: lmCount > 0 ? (lineManagerTotal / lmCount).toFixed(1) : 0,
//       head: headCount > 0 ? (headTotal / headCount).toFixed(1) : 0,
//       hr: hrCount > 0 ? (hrTotal / hrCount).toFixed(1) : 0,
//     };
//   };

//   const updateRating = (phase, paramIndex, rater, value) => {
//     const numericValue = value.replace(/[^0-9.]/g, "");
//     if (numericValue === "" || (Number(numericValue) >= 1 && Number(numericValue) <= 10)) {
//       setRatings((prev) => ({...prev, [phase]: {...prev[phase], [paramIndex]: {...prev[phase][paramIndex], [rater]: numericValue}}}));
//     }
//   };

//   const renderPhaseTable = (phase, phaseTitle, dayRange) => {
//     if (parametersLoading) {
//         return <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress /></Box>;
//     }
//     const phaseParams = parameters[phase] || [];
//     const phaseTotal = calculatePhaseTotal(phase);
//     return (
//       <Card sx={{ mb: 3 }}>
//         <CardContent>
//           <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
//             <Typography variant="h6" sx={{ color: themeColors.primary, fontWeight: "bold" }}>
//               {phaseTitle} ({dayRange})
//             </Typography>
//           </Box>
//           <TableContainer component={Paper}>
//             <Table sx={{ minWidth: "100%", whiteSpace: "nowrap" }}>
//               <TableHead sx={{ backgroundColor: themeColors.primary }}>
//                 <TableRow>
//                   <TableCell sx={{ color: themeColors.textOnPrimary, fontWeight: "bold", width: "5%" }}>Sr. No.</TableCell>
//                   <TableCell sx={{ color: themeColors.textOnPrimary, fontWeight: "bold", width: "35%" }}>Parameters</TableCell>
//                   <TableCell sx={{ color: themeColors.textOnPrimary, fontWeight: "bold", textAlign: "center", width: "15%" }}>Line Manager</TableCell>
//                   <TableCell sx={{ color: themeColors.textOnPrimary, fontWeight: "bold", textAlign: "center", width: "15%" }}>Head</TableCell>
//                   <TableCell sx={{ color: themeColors.textOnPrimary, fontWeight: "bold", textAlign: "center", width: "15%" }}>HR</TableCell>
//                   <TableCell sx={{ color: themeColors.textOnPrimary, fontWeight: "bold", textAlign: "center", width: "10%" }}>Average</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {phaseParams.map((param, index) => {
//                   const rating = ratings[phase][index] || {};
//                   const average = calculateAverage(rating.lineManager, rating.head, rating.hr);
//                   return (
//                     <TableRow key={index} sx={{ "&:hover": { backgroundColor: "action.hover" } }}>
//                       <TableCell>{index + 1}</TableCell>
//                       <TableCell>{param}</TableCell>
//                       <TableCell align="center"><TextField disabled type="number" inputProps={{ min: 1, max: 10, step: "0.1" }} value={rating.lineManager || ""} onChange={(e) => updateRating(phase, index, "lineManager", e.target.value)} size="small" sx={{ width: "60px" }} /></TableCell>
//                       <TableCell align="center"><TextField disabled type="number" inputProps={{ min: 1, max: 10, step: "0.1" }} value={rating.head || ""} onChange={(e) => updateRating(phase, index, "head", e.target.value)} size="small" sx={{ width: "60px" }} /></TableCell>
//                       <TableCell align="center"><TextField type="number" inputProps={{ min: 1, max: 10, step: "0.1" }} value={rating.hr || ""} onChange={(e) => updateRating(phase, index, "hr", e.target.value)} size="small" sx={{ width: "60px" }} /></TableCell>
//                       <TableCell align="center" sx={{ fontWeight: "bold", color: themeColors.primary }}>{average}</TableCell>
//                     </TableRow>
//                   );
//                 })}
//                 <TableRow sx={{ backgroundColor: "action.selected" }}>
//                   <TableCell colSpan={2} sx={{ fontWeight: "bold" }}>Total</TableCell>
//                   <TableCell align="center" sx={{ fontWeight: "bold" }}>{phaseTotal.lineManager}</TableCell>
//                   <TableCell align="center" sx={{ fontWeight: "bold" }}>{phaseTotal.head}</TableCell>
//                   <TableCell align="center" sx={{ fontWeight: "bold" }}>{phaseTotal.hr}</TableCell>
//                   <TableCell align="center" sx={{ fontWeight: "bold", color: themeColors.primary }}>{calculateAverage(phaseTotal.lineManager, phaseTotal.head, phaseTotal.hr)}</TableCell>
//                 </TableRow>
//               </TableBody>
//             </Table>
//           </TableContainer>
//           <Grid container spacing={2} sx={{ mt: 2 }}><Grid item xs={12} md={4}><TextField disabled label="Line Manager Comments" multiline rows={3} fullWidth variant="outlined" /></Grid><Grid item xs={12} md={4}><TextField disabled label="Head Comments" multiline rows={3} fullWidth variant="outlined" /></Grid><Grid item xs={12} md={4}><TextField label="HR Comments" multiline rows={3} fullWidth variant="outlined" /></Grid></Grid>
//           <Box sx={{ textAlign: "center", mt: 2 }}><Button variant="contained" startIcon={<SaveIcon />} sx={{ backgroundColor: themeColors.primary, "&:hover": { backgroundColor: themeColors.primaryDark } }}>Save {phaseTitle}</Button></Box>
//         </CardContent>
//       </Card>
//     );
//   };

//   return (
//     <Box component={Paper} p={3}>
//       <Typography variant="h4" sx={{ color: themeColors.primary, fontWeight: "bold", mb: 5 }}>
//         Employee Confirmation
//       </Typography>
//       <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, justifyContent: "space-between", alignItems: { md: "center" }, gap: 2, mb: 3, }}>
//         <Box sx={{ display: "flex", gap: 2, flexDirection: { xs: "column", sm: "row" }, width: { xs: "100%", md: "350px" } }}>
//           <FormControl fullWidth>
//             <InputLabel id="designation-select-label">Select Designation</InputLabel>
//             <Select labelId="designation-select-label" value={selectedDesignation} onChange={handleDesignationChange} label="Select Designation">
//               {designations.map((d, index) => (<MenuItem key={index} value={d.designation_name}>{d.designation_name}</MenuItem>))}
//             </Select>
//           </FormControl>
//           <FormControl fullWidth disabled={!selectedDesignation}>
//             <InputLabel id="employee-select-label">Select Employee</InputLabel>
//             <Select labelId="employee-select-label" value={selectedEmployee} onChange={handleEmployeeChange} label="Select Employee" MenuProps={{ PaperProps: { sx: { maxHeight: 200 } } }}>
//               {employeesLoading ? (
//                   <MenuItem disabled><CircularProgress size={20} /></MenuItem>
//               ) : (
//                 filteredEmployees.map((e) => (<MenuItem key={e.id} value={e.id}>{`${e.employee_name} (${e.employee_id})`}</MenuItem>))
//               )}
//             </Select>
//           </FormControl>
//         </Box>
//       </Box>
//       {selectedEmployee && (
//         <>
//           <Tabs value={activeTab} onChange={handleTabChange} variant="scrollable" scrollButtons="auto" aria-label="performance-review-tabs" sx={{ borderBottom: 1, borderColor: "divider", mb: 2, "& .Mui-selected": { color: `${themeColors.primary} !important`, fontWeight: "bold" }, "& .MuiTabs-indicator": { backgroundColor: themeColors.primary }, }}>
//             <Tab label="Phase 1: Align" id="tab-0" aria-controls="tabpanel-0" />
//             <Tab label="Phase 2: Accelerate" id="tab-1" aria-controls="tabpanel-1" />
//             <Tab label="Phase 3: Achieve" id="tab-2" aria-controls="tabpanel-2" />
//             <Tab label="Phase 4: Aspire" id="tab-3" aria-controls="tabpanel-3" />
//             <Tab label="Overall Analysis" id="tab-4" aria-controls="tabpanel-4" />
//           </Tabs>
//           <TabPanel value={activeTab} index={0}>{renderPhaseTable("phase1", "Phase 1: Align", "Day 1 to 30")}</TabPanel>
//           <TabPanel value={activeTab} index={1}>{renderPhaseTable("phase2", "Phase 2: Accelerate", "Day 30 to 60")}</TabPanel>
//           <TabPanel value={activeTab} index={2}>{renderPhaseTable("phase3", "Phase 3: Achieve", "Day 60 to 90")}</TabPanel>
//           <TabPanel value={activeTab} index={3}>{renderPhaseTable("phase4", "Phase 4: Aspire", "Day 90 to 180")}</TabPanel>
//           <TabPanel value={activeTab} index={4}>
//             <OverallAnalysis userId={selectedEmployee} employeesData={filteredEmployees}/>
//           </TabPanel>
//         </>
//       )}
//     </Box>
//   );
// }






// import React, { useState, useEffect, useCallback } from "react";
// import {
//     Table, TableBody, TableCell, TableContainer,
//     TableHead, TableRow, Paper, Select,
//     MenuItem, Button, IconButton, Typography,
//     Box, TextField, FormControl, InputLabel, CircularProgress,
//     Tabs, Tab, Toolbar, AppBar, Snackbar, Alert, Card,
//     CardContent, CardHeader, Grid, TableFooter,
// } from "@mui/material";
// import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import { useNavigate, useParams, useLocation } from "react-router-dom";
// import { styled, useTheme } from "@mui/material/styles";
// import axios from "axios";

// const axiosInstance = axios.create({
//     baseURL: "https://tdtlworld.com/hrms-backend/",
// });

// const Phase1 = ({ user_id, designation_id }) => {
//     const [parameters, setParameters] = useState([]);
//     const [comments, setComments] = useState({
//         lineManager: "",
//         head: "",
//         hr: "",
//     });
//     const [isSaving, setIsSaving] = useState(false);
//     const [isSaved, setIsSaved] = useState(false);
//     const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchPhaseData = async () => {
//             if (!user_id || !designation_id) {
//                 setError("User ID or Designation ID is not provided.");
//                 setLoading(false);
//                 return;
//             }
//             try {
//                 setLoading(true);
//                 const phaseNumber = 1;

//                 const paramsResponse = await axiosInstance.get(`apis/get_desigwise_tabledata/?phase=${phaseNumber}&designation_id=${designation_id}`);
//                 const designationParameters = paramsResponse.data.data;

//                 if (!Array.isArray(designationParameters)) {
//                     setError("Failed to fetch parameters for this designation.");
//                     setLoading(false);
//                     return;
//                 }

//                 const employeeDataResponse = await axiosInstance.get(`apis/get_phasewise_data/${user_id}/`);
//                 const allEmployeeData = employeeDataResponse.data.data;

//                 const employeePhaseDataMap = new Map();
//                 if (employeeDataResponse.data.status === "success" && Array.isArray(allEmployeeData)) {
//                     allEmployeeData
//                         .filter(item => item.phase === phaseNumber)
//                         .forEach(item => {
//                             employeePhaseDataMap.set(item.parameter_id, item);
//                         });
//                 }

//                 const loadedParameters = designationParameters.map(param => {
//                     const savedData = employeePhaseDataMap.get(param.parameter_id);
//                     const lmScore = savedData ? savedData.points_by_lm : "";
//                     const headScore = savedData ? savedData.points_by_head : "";
//                     const hrScore = savedData ? savedData.points_by_hr : "";

//                     const scores = [lmScore, headScore, hrScore].filter(score => score !== null && score !== undefined && score !== "").map(score => parseFloat(score));
//                     const sum = scores.reduce((a, b) => a + b, 0);
//                     const average = scores.length > 0 ? (sum / scores.length).toFixed(1) : "0.0";

//                     return {
//                         id: param.parameter_id,
//                         name: param.para_name,
//                         lm: lmScore || "",
//                         head: headScore || "",
//                         hr: hrScore || "",
//                         average: average,
//                     };
//                 });

//                 setParameters(loadedParameters);

//                 const firstRecord = employeePhaseDataMap.values().next().value;
//                 setComments({
//                     lineManager: firstRecord ? firstRecord.comment_by_lm || "" : "",
//                     head: firstRecord ? firstRecord.comment_by_head || "" : "",
//                     hr: firstRecord ? firstRecord.comment_by_hr || "" : "",
//                 });

//                 if (firstRecord && firstRecord.points_by_hr != null && firstRecord.comment_by_hr) {
//                     setIsSaved(true);
//                 }

//             } catch (e) {
//                 setError("An error occurred while fetching performance data.");
//                 console.error("Failed to fetch phase data:", e);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchPhaseData();
//     }, [user_id, designation_id]);


//     const handleChange = (id, field, value) => {
//         const updated = parameters.map((param) => {
//             if (param.id === id) {
//                 const newParam = { ...param, [field]: value };
//                 const scores = [newParam.lm, newParam.head, newParam.hr]
//                     .map(score => parseFloat(score))
//                     .filter(score => !isNaN(score));
//                 const sum = scores.reduce((a, b) => a + b, 0);
//                 const average = scores.length > 0 ? (sum / scores.length).toFixed(1) : "0.0";
//                 return { ...newParam, average: average };
//             }
//             return param;
//         });
//         setParameters(updated);
//     };

//     const handleCommentChange = (rater, value) => {
//         setComments((prev) => ({ ...prev, [rater]: value }));
//     };

//     const handleSave = async () => {
//         setIsSaving(true);
//         const role_id = localStorage.getItem('userRoleId');
//         const payload = {
//             role_id: parseInt(role_id, 10),
//             entries: parameters.map(param => ({
//                 emp_id: user_id,
//                 parameter_id: param.id,
//                 phase: 1,
//                 points_by_lm: param.lm ? parseInt(param.lm, 10) : null,
//                 comment_by_lm: comments.lineManager,
//                 points_by_head: param.head ? parseInt(param.head, 10) : null,
//                 comment_by_head: comments.head,
//                 points_by_hr: param.hr ? parseInt(param.hr, 10) : null,
//                 comment_by_hr: comments.hr,
//             }))
//         };

//         try {
//             await axiosInstance.post('apis/save_phasewise_data/', payload);
//             setSnackbar({ open: true, message: "Phase 1 saved successfully!", severity: "success" });
//             setIsSaved(true);
//         } catch (error) {
//             console.error("Failed to save Phase 1 data:", error);
//             setSnackbar({ open: true, message: "Error saving Phase 1 data. Please try again.", severity: "error" });
//         } finally {
//             setIsSaving(false);
//         }
//     };

//     const handleCloseSnackbar = (event, reason) => {
//         if (reason === "clickaway") return;
//         setSnackbar(prev => ({ ...prev, open: false }));
//     };

//     if (loading) {
//         return <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress /></Box>;
//     }
//     if (error) {
//         return <Alert severity="error" sx={{ m: 2 }}>{error}</Alert>;
//     }

//     return (
//         <Box>
//             <Typography variant="h6" gutterBottom align="center">
//                 Phase 1 Content for Employee ID: {user_id}
//             </Typography>

//             <Paper elevation={2} sx={{ mt: 2 }}>
//                 <Table>
//                     <TableHead>
//                         <TableRow sx={{ backgroundColor: "#BDBDBD" }}>
//                             <TableCell align="center"><strong>Sr No</strong></TableCell>
//                             <TableCell align="center"><strong>Parameter</strong></TableCell>
//                             <TableCell align="center"><strong>LM</strong></TableCell>
//                             <TableCell align="center"><strong>Head</strong></TableCell>
//                             <TableCell align="center"><strong>HR</strong></TableCell>
//                             <TableCell align="center"><strong>Average</strong></TableCell>
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {parameters.map((row, index) => (
//                             <TableRow key={row.id}>
//                                 <TableCell align="center">{index + 1}</TableCell>
//                                 <TableCell align="center">{row.name}</TableCell>
//                                 <TableCell align="center">
//                                     <TextField
//                                         type="number"
//                                         value={row.lm}
//                                         onChange={(e) => handleChange(row.id, "lm", e.target.value)}
//                                         inputProps={{ min: 0, max: 10 }}
//                                         size="small"
//                                         disabled
//                                     />
//                                 </TableCell>
//                                 <TableCell align="center">
//                                     <TextField
//                                         type="number"
//                                         value={row.head}
//                                         onChange={(e) => handleChange(row.id, "head", e.target.value)}
//                                         inputProps={{ min: 0, max: 10 }}
//                                         size="small"
//                                         disabled
//                                     />
//                                 </TableCell>
//                                 <TableCell align="center">
//                                     <TextField
//                                         type="number"
//                                         value={row.hr}
//                                         onChange={(e) => handleChange(row.id, "hr", e.target.value)}
//                                         inputProps={{ min: 0, max: 10 }}
//                                         size="small"
//                                         disabled={isSaved}
//                                     />
//                                 </TableCell>
//                                 <TableCell align="center">{row.average}</TableCell>
//                             </TableRow>
//                         ))}
//                     </TableBody>
//                 </Table>
//             </Paper>

//             <Card variant="outlined" sx={{ mt: 3 }}>
//                 <CardHeader title="Phase Comments" />
//                 <CardContent>
//                     <Grid container spacing={2}>
//                         <Grid item xs={12} md={4}>
//                             <TextField
//                                 label="Line Manager Comments"
//                                 multiline
//                                 rows={3}
//                                 fullWidth
//                                 value={comments.lineManager}
//                                 onChange={(e) => handleCommentChange("lineManager", e.target.value)}
//                                 disabled
//                             />
//                         </Grid>
//                         <Grid item xs={12} md={4}>
//                             <TextField
//                                 label="Head Comments"
//                                 multiline
//                                 rows={3}
//                                 fullWidth
//                                 value={comments.head}
//                                 onChange={(e) => handleCommentChange("head", e.target.value)}
//                                 disabled
//                             />
//                         </Grid>
//                         <Grid item xs={12} md={4}>
//                             <TextField
//                                 label="HR Comments"
//                                 multiline
//                                 rows={3}
//                                 fullWidth
//                                 value={comments.hr}
//                                 onChange={(e) => handleCommentChange("hr", e.target.value)}
//                                 disabled={isSaved}
//                             />
//                         </Grid>
//                     </Grid>
//                 </CardContent>
//             </Card>

//             <Box display="flex" justifyContent="center" mt={3}>
//                 <Button variant="contained" color="primary" onClick={handleSave} disabled={isSaving || isSaved}>
//                     {isSaving ? <CircularProgress size={24} /> : (isSaved ? "Saved" : "Save Phase 1")}
//                 </Button>
//             </Box>

//             <Snackbar
//                 open={snackbar.open}
//                 autoHideDuration={3000}
//                 onClose={handleCloseSnackbar}
//                 anchorOrigin={{ vertical: "top", horizontal: "center" }}
//             >
//                 <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} variant="filled" sx={{ width: "100%" }}>
//                     {snackbar.message}
//                 </Alert>
//             </Snackbar>
//         </Box>
//     );
// };

// const Phase2 = ({ user_id, designation_id }) => {
//     const [parameters, setParameters] = useState([]);
//     const [comments, setComments] = useState({
//         lineManager: "",
//         head: "",
//         hr: "",
//     });
//     const [isSaving, setIsSaving] = useState(false);
//     const [isSaved, setIsSaved] = useState(false);
//     const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchPhaseData = async () => {
//             if (!user_id || !designation_id) {
//                 setError("User ID or Designation ID is not provided.");
//                 setLoading(false);
//                 return;
//             }
//             try {
//                 setLoading(true);
//                 const phaseNumber = 2;

//                 const paramsResponse = await axiosInstance.get(`apis/get_desigwise_tabledata/?phase=${phaseNumber}&designation_id=${designation_id}`);
//                 const designationParameters = paramsResponse.data.data;

//                 if (!Array.isArray(designationParameters)) {
//                     setError("Failed to fetch parameters for this designation.");
//                     setLoading(false);
//                     return;
//                 }

//                 const employeeDataResponse = await axiosInstance.get(`apis/get_phasewise_data/${user_id}/`);
//                 const allEmployeeData = employeeDataResponse.data.data;

//                 const employeePhaseDataMap = new Map();
//                 if (employeeDataResponse.data.status === "success" && Array.isArray(allEmployeeData)) {
//                     allEmployeeData
//                         .filter(item => item.phase === phaseNumber)
//                         .forEach(item => {
//                             employeePhaseDataMap.set(item.parameter_id, item);
//                         });
//                 }

//                 const loadedParameters = designationParameters.map(param => {
//                     const savedData = employeePhaseDataMap.get(param.parameter_id);
//                     const lmScore = savedData ? savedData.points_by_lm : "";
//                     const headScore = savedData ? savedData.points_by_head : "";
//                     const hrScore = savedData ? savedData.points_by_hr : "";

//                     const scores = [lmScore, headScore, hrScore].filter(score => score !== null && score !== undefined && score !== "").map(score => parseFloat(score));
//                     const sum = scores.reduce((a, b) => a + b, 0);
//                     const average = scores.length > 0 ? (sum / scores.length).toFixed(1) : "0.0";

//                     return {
//                         id: param.parameter_id,
//                         name: param.para_name,
//                         lm: lmScore || "",
//                         head: headScore || "",
//                         hr: hrScore || "",
//                         average: average,
//                     };
//                 });

//                 setParameters(loadedParameters);

//                 const firstRecord = employeePhaseDataMap.values().next().value;
//                 setComments({
//                     lineManager: firstRecord ? firstRecord.comment_by_lm || "" : "",
//                     head: firstRecord ? firstRecord.comment_by_head || "" : "",
//                     hr: firstRecord ? firstRecord.comment_by_hr || "" : "",
//                 });

//                 if (firstRecord && firstRecord.points_by_hr != null && firstRecord.comment_by_hr) {
//                     setIsSaved(true);
//                 }

//             } catch (e) {
//                 setError("An error occurred while fetching performance data.");
//                 console.error("Failed to fetch phase data:", e);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchPhaseData();
//     }, [user_id, designation_id]);

//     const handleChange = (id, field, value) => {
//         const updated = parameters.map((param) => {
//             if (param.id === id) {
//                 const newParam = { ...param, [field]: value };
//                 const scores = [newParam.lm, newParam.head, newParam.hr]
//                     .map(score => parseFloat(score))
//                     .filter(score => !isNaN(score));
//                 const sum = scores.reduce((a, b) => a + b, 0);
//                 const average = scores.length > 0 ? (sum / scores.length).toFixed(1) : "0.0";
//                 return { ...newParam, average: average };
//             }
//             return param;
//         });
//         setParameters(updated);
//     };

//     const handleCommentChange = (rater, value) => {
//         setComments((prev) => ({ ...prev, [rater]: value }));
//     };

//     const handleSave = async () => {
//         setIsSaving(true);
//         const role_id = localStorage.getItem('userRoleId');
//         const payload = {
//             role_id: parseInt(role_id, 10),
//             entries: parameters.map(param => ({
//                 emp_id: user_id,
//                 parameter_id: param.id,
//                 phase: 2,
//                 points_by_lm: param.lm ? parseInt(param.lm, 10) : null,
//                 comment_by_lm: comments.lineManager,
//                 points_by_head: param.head ? parseInt(param.head, 10) : null,
//                 comment_by_head: comments.head,
//                 points_by_hr: param.hr ? parseInt(param.hr, 10) : null,
//                 comment_by_hr: comments.hr,
//             }))
//         };

//         try {
//             await axiosInstance.post('apis/save_phasewise_data/', payload);
//             setSnackbar({ open: true, message: "Phase 2 saved successfully!", severity: "success" });
//             setIsSaved(true);
//         } catch (error) {
//             console.error("Failed to save Phase 2 data:", error);
//             setSnackbar({ open: true, message: "Error saving Phase 2 data. Please try again.", severity: "error" });
//         } finally {
//             setIsSaving(false);
//         }
//     };

//     const handleCloseSnackbar = (event, reason) => {
//         if (reason === "clickaway") return;
//         setSnackbar(prev => ({ ...prev, open: false }));
//     };

//     if (loading) {
//         return <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress /></Box>;
//     }
//     if (error) {
//         return <Alert severity="error" sx={{ m: 2 }}>{error}</Alert>;
//     }

//     return (
//         <Box>
//             <Typography variant="h6" gutterBottom align="center">
//                 Phase 2 Content for Employee ID: {user_id}
//             </Typography>

//             <Paper elevation={2} sx={{ mt: 2 }}>
//                 <Table>
//                     <TableHead>
//                         <TableRow sx={{ backgroundColor: "#BDBDBD" }}>
//                             <TableCell align="center"><strong>Sr No</strong></TableCell>
//                             <TableCell align="center"><strong>Parameter</strong></TableCell>
//                             <TableCell align="center"><strong>LM</strong></TableCell>
//                             <TableCell align="center"><strong>Head</strong></TableCell>
//                             <TableCell align="center"><strong>HR</strong></TableCell>
//                             <TableCell align="center"><strong>Average</strong></TableCell>
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {parameters.map((row, index) => (
//                             <TableRow key={row.id}>
//                                 <TableCell align="center">{index + 1}</TableCell>
//                                 <TableCell align="center">{row.name}</TableCell>
//                                 <TableCell align="center">
//                                     <TextField
//                                         type="number"
//                                         value={row.lm}
//                                         onChange={(e) => handleChange(row.id, "lm", e.target.value)}
//                                         inputProps={{ min: 0, max: 10 }}
//                                         size="small"
//                                         disabled
//                                     />
//                                 </TableCell>
//                                 <TableCell align="center">
//                                     <TextField
//                                         type="number"
//                                         value={row.head}
//                                         onChange={(e) => handleChange(row.id, "head", e.target.value)}
//                                         inputProps={{ min: 0, max: 10 }}
//                                         size="small"
//                                         disabled
//                                     />
//                                 </TableCell>
//                                 <TableCell align="center">
//                                     <TextField
//                                         type="number"
//                                         value={row.hr}
//                                         onChange={(e) => handleChange(row.id, "hr", e.target.value)}
//                                         inputProps={{ min: 0, max: 10 }}
//                                         size="small"
//                                         disabled={isSaved}
//                                     />
//                                 </TableCell>
//                                 <TableCell align="center">{row.average}</TableCell>
//                             </TableRow>
//                         ))}
//                     </TableBody>
//                 </Table>
//             </Paper>

//             <Card variant="outlined" sx={{ mt: 3 }}>
//                 <CardHeader title="Phase Comments" />
//                 <CardContent>
//                     <Grid container spacing={2}>
//                         <Grid item xs={12} md={4}>
//                             <TextField
//                                 label="Line Manager Comments"
//                                 multiline
//                                 rows={3}
//                                 fullWidth
//                                 value={comments.lineManager}
//                                 onChange={(e) => handleCommentChange("lineManager", e.target.value)}
//                                 disabled
//                             />
//                         </Grid>
//                         <Grid item xs={12} md={4}>
//                             <TextField
//                                 label="Head Comments"
//                                 multiline
//                                 rows={3}
//                                 fullWidth
//                                 value={comments.head}
//                                 onChange={(e) => handleCommentChange("head", e.target.value)}
//                                 disabled
//                             />
//                         </Grid>
//                         <Grid item xs={12} md={4}>
//                             <TextField
//                                 label="HR Comments"
//                                 multiline
//                                 rows={3}
//                                 fullWidth
//                                 value={comments.hr}
//                                 onChange={(e) => handleCommentChange("hr", e.target.value)}
//                                 disabled={isSaved}
//                             />
//                         </Grid>
//                     </Grid>
//                 </CardContent>
//             </Card>

//             <Box display="flex" justifyContent="center" mt={3}>
//                 <Button variant="contained" color="primary" onClick={handleSave} disabled={isSaving || isSaved}>
//                     {isSaving ? <CircularProgress size={24} /> : (isSaved ? "Saved" : "Save Phase 2")}
//                 </Button>
//             </Box>

//             <Snackbar
//                 open={snackbar.open}
//                 autoHideDuration={3000}
//                 onClose={handleCloseSnackbar}
//                 anchorOrigin={{ vertical: "top", horizontal: "center" }}
//             >
//                 <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} variant="filled" sx={{ width: "100%" }}>
//                     {snackbar.message}
//                 </Alert>
//             </Snackbar>
//         </Box>
//     );
// };

// const Phase3 = ({ user_id, designation_id }) => {
//     const [parameters, setParameters] = useState([]);
//     const [comments, setComments] = useState({
//         lineManager: "",
//         head: "",
//         hr: "",
//     });
//     const [isSaving, setIsSaving] = useState(false);
//     const [isSaved, setIsSaved] = useState(false);
//     const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchPhaseData = async () => {
//             if (!user_id || !designation_id) {
//                 setError("User ID or Designation ID is not provided.");
//                 setLoading(false);
//                 return;
//             }
//             try {
//                 setLoading(true);
//                 const phaseNumber = 3;

//                 const paramsResponse = await axiosInstance.get(`apis/get_desigwise_tabledata/?phase=${phaseNumber}&designation_id=${designation_id}`);
//                 const designationParameters = paramsResponse.data.data;

//                 if (!Array.isArray(designationParameters)) {
//                     setError("Failed to fetch parameters for this designation.");
//                     setLoading(false);
//                     return;
//                 }

//                 const employeeDataResponse = await axiosInstance.get(`apis/get_phasewise_data/${user_id}/`);
//                 const allEmployeeData = employeeDataResponse.data.data;

//                 const employeePhaseDataMap = new Map();
//                 if (employeeDataResponse.data.status === "success" && Array.isArray(allEmployeeData)) {
//                     allEmployeeData
//                         .filter(item => item.phase === phaseNumber)
//                         .forEach(item => {
//                             employeePhaseDataMap.set(item.parameter_id, item);
//                         });
//                 }

//                 const loadedParameters = designationParameters.map(param => {
//                     const savedData = employeePhaseDataMap.get(param.parameter_id);
//                     const lmScore = savedData ? savedData.points_by_lm : "";
//                     const headScore = savedData ? savedData.points_by_head : "";
//                     const hrScore = savedData ? savedData.points_by_hr : "";

//                     const scores = [lmScore, headScore, hrScore].filter(score => score !== null && score !== undefined && score !== "").map(score => parseFloat(score));
//                     const sum = scores.reduce((a, b) => a + b, 0);
//                     const average = scores.length > 0 ? (sum / scores.length).toFixed(1) : "0.0";

//                     return {
//                         id: param.parameter_id,
//                         name: param.para_name,
//                         lm: lmScore || "",
//                         head: headScore || "",
//                         hr: hrScore || "",
//                         average: average,
//                     };
//                 });

//                 setParameters(loadedParameters);

//                 const firstRecord = employeePhaseDataMap.values().next().value;
//                 setComments({
//                     lineManager: firstRecord ? firstRecord.comment_by_lm || "" : "",
//                     head: firstRecord ? firstRecord.comment_by_head || "" : "",
//                     hr: firstRecord ? firstRecord.comment_by_hr || "" : "",
//                 });

//                 if (firstRecord && firstRecord.points_by_hr != null && firstRecord.comment_by_hr) {
//                     setIsSaved(true);
//                 }

//             } catch (e) {
//                 setError("An error occurred while fetching performance data.");
//                 console.error("Failed to fetch phase data:", e);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchPhaseData();
//     }, [user_id, designation_id]);

//     const handleChange = (id, field, value) => {
//         const updated = parameters.map((param) => {
//             if (param.id === id) {
//                 const newParam = { ...param, [field]: value };
//                 const scores = [newParam.lm, newParam.head, newParam.hr]
//                     .map(score => parseFloat(score))
//                     .filter(score => !isNaN(score));
//                 const sum = scores.reduce((a, b) => a + b, 0);
//                 const average = scores.length > 0 ? (sum / scores.length).toFixed(1) : "0.0";
//                 return { ...newParam, average: average };
//             }
//             return param;
//         });
//         setParameters(updated);
//     };

//     const handleCommentChange = (rater, value) => {
//         setComments((prev) => ({ ...prev, [rater]: value }));
//     };

//     const handleSave = async () => {
//         setIsSaving(true);
//         const role_id = localStorage.getItem('userRoleId');
//         const payload = {
//             role_id: parseInt(role_id, 10),
//             entries: parameters.map(param => ({
//                 emp_id: user_id,
//                 parameter_id: param.id,
//                 phase: 3,
//                 points_by_lm: param.lm ? parseInt(param.lm, 10) : null,
//                 comment_by_lm: comments.lineManager,
//                 points_by_head: param.head ? parseInt(param.head, 10) : null,
//                 comment_by_head: comments.head,
//                 points_by_hr: param.hr ? parseInt(param.hr, 10) : null,
//                 comment_by_hr: comments.hr,
//             }))
//         };

//         try {
//             await axiosInstance.post('apis/save_phasewise_data/', payload);
//             setSnackbar({ open: true, message: "Phase 3 saved successfully!", severity: "success" });
//             setIsSaved(true);
//         } catch (error) {
//             console.error("Failed to save Phase 3 data:", error);
//             setSnackbar({ open: true, message: "Error saving Phase 3 data. Please try again.", severity: "error" });
//         } finally {
//             setIsSaving(false);
//         }
//     };

//     const handleCloseSnackbar = (event, reason) => {
//         if (reason === "clickaway") return;
//         setSnackbar(prev => ({ ...prev, open: false }));
//     };

//     if (loading) {
//         return <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress /></Box>;
//     }
//     if (error) {
//         return <Alert severity="error" sx={{ m: 2 }}>{error}</Alert>;
//     }

//     return (
//         <Box>
//             <Typography variant="h6" gutterBottom align="center">
//                 Phase 3 Content for Employee ID: {user_id}
//             </Typography>

//             <Paper elevation={2} sx={{ mt: 2 }}>
//                 <Table>
//                     <TableHead>
//                         <TableRow sx={{ backgroundColor: "#BDBDBD" }}>
//                             <TableCell align="center"><strong>Sr No</strong></TableCell>
//                             <TableCell align="center"><strong>Parameter</strong></TableCell>
//                             <TableCell align="center"><strong>LM</strong></TableCell>
//                             <TableCell align="center"><strong>Head</strong></TableCell>
//                             <TableCell align="center"><strong>HR</strong></TableCell>
//                             <TableCell align="center"><strong>Average</strong></TableCell>
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {parameters.map((row, index) => (
//                             <TableRow key={row.id}>
//                                 <TableCell align="center">{index + 1}</TableCell>
//                                 <TableCell align="center">{row.name}</TableCell>
//                                 <TableCell align="center">
//                                     <TextField
//                                         type="number"
//                                         value={row.lm}
//                                         onChange={(e) => handleChange(row.id, "lm", e.target.value)}
//                                         inputProps={{ min: 0, max: 10 }}
//                                         size="small"
//                                         disabled
//                                     />
//                                 </TableCell>
//                                 <TableCell align="center">
//                                     <TextField
//                                         type="number"
//                                         value={row.head}
//                                         onChange={(e) => handleChange(row.id, "head", e.target.value)}
//                                         inputProps={{ min: 0, max: 10 }}
//                                         size="small"
//                                         disabled
//                                     />
//                                 </TableCell>
//                                 <TableCell align="center">
//                                     <TextField
//                                         type="number"
//                                         value={row.hr}
//                                         onChange={(e) => handleChange(row.id, "hr", e.target.value)}
//                                         inputProps={{ min: 0, max: 10 }}
//                                         size="small"
//                                         disabled={isSaved}
//                                     />
//                                 </TableCell>
//                                 <TableCell align="center">{row.average}</TableCell>
//                             </TableRow>
//                         ))}
//                     </TableBody>
//                 </Table>
//             </Paper>

//             <Card variant="outlined" sx={{ mt: 3 }}>
//                 <CardHeader title="Phase Comments" />
//                 <CardContent>
//                     <Grid container spacing={2}>
//                         <Grid item xs={12} md={4}>
//                             <TextField
//                                 label="Line Manager Comments"
//                                 multiline
//                                 rows={3}
//                                 fullWidth
//                                 value={comments.lineManager}
//                                 onChange={(e) => handleCommentChange("lineManager", e.target.value)}
//                                 disabled
//                             />
//                         </Grid>
//                         <Grid item xs={12} md={4}>
//                             <TextField
//                                 label="Head Comments"
//                                 multiline
//                                 rows={3}
//                                 fullWidth
//                                 value={comments.head}
//                                 onChange={(e) => handleCommentChange("head", e.target.value)}
//                                 disabled
//                             />
//                         </Grid>
//                         <Grid item xs={12} md={4}>
//                             <TextField
//                                 label="HR Comments"
//                                 multiline
//                                 rows={3}
//                                 fullWidth
//                                 value={comments.hr}
//                                 onChange={(e) => handleCommentChange("hr", e.target.value)}
//                                 disabled={isSaved}
//                             />
//                         </Grid>
//                     </Grid>
//                 </CardContent>
//             </Card>

//             <Box display="flex" justifyContent="center" mt={3}>
//                 <Button variant="contained" color="primary" onClick={handleSave} disabled={isSaving || isSaved}>
//                     {isSaving ? <CircularProgress size={24} /> : (isSaved ? "Saved" : "Save Phase 3")}
//                 </Button>
//             </Box>

//             <Snackbar
//                 open={snackbar.open}
//                 autoHideDuration={3000}
//                 onClose={handleCloseSnackbar}
//                 anchorOrigin={{ vertical: "top", horizontal: "center" }}
//             >
//                 <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} variant="filled" sx={{ width: "100%" }}>
//                     {snackbar.message}
//                 </Alert>
//             </Snackbar>
//         </Box>
//     );
// };

// const Phase4 = ({ user_id, designation_id }) => {
//     const [parameters, setParameters] = useState([]);
//     const [comments, setComments] = useState({
//         lineManager: "",
//         head: "",
//         hr: "",
//     });
//     const [isSaving, setIsSaving] = useState(false);
//     const [isSaved, setIsSaved] = useState(false);
//     const [snackbar, setSnackbar] = useState({
//         open: false,
//         message: "",
//         severity: "success",
//     });
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchPhaseData = async () => {
//             if (!user_id || !designation_id) {
//                 setError("User ID or Designation ID is not provided.");
//                 setLoading(false);
//                 return;
//             }
//             try {
//                 setLoading(true);
//                 const phaseNumber = 4;

//                 const paramsResponse = await axiosInstance.get(`apis/get_desigwise_tabledata/?phase=${phaseNumber}&designation_id=${designation_id}`);
//                 const designationParameters = paramsResponse.data.data;

//                 if (!Array.isArray(designationParameters)) {
//                     setError("Failed to fetch parameters for this designation.");
//                     setLoading(false);
//                     return;
//                 }

//                 const employeeDataResponse = await axiosInstance.get(`apis/get_phasewise_data/${user_id}/`);
//                 const allEmployeeData = employeeDataResponse.data.data;

//                 const employeePhaseDataMap = new Map();
//                 if (employeeDataResponse.data.status === "success" && Array.isArray(allEmployeeData)) {
//                     allEmployeeData
//                         .filter(item => item.phase === phaseNumber)
//                         .forEach(item => {
//                             employeePhaseDataMap.set(item.parameter_id, item);
//                         });
//                 }

//                 const loadedParameters = designationParameters.map(param => {
//                     const savedData = employeePhaseDataMap.get(param.parameter_id);
//                     const lmScore = savedData ? savedData.points_by_lm : "";
//                     const headScore = savedData ? savedData.points_by_head : "";
//                     const hrScore = savedData ? savedData.points_by_hr : "";

//                     const scores = [lmScore, headScore, hrScore].filter(score => score !== null && score !== undefined && score !== "").map(score => parseFloat(score));
//                     const sum = scores.reduce((a, b) => a + b, 0);
//                     const average = scores.length > 0 ? (sum / scores.length).toFixed(1) : "0.0";

//                     return {
//                         id: param.parameter_id,
//                         name: param.para_name,
//                         lm: lmScore || "",
//                         head: headScore || "",
//                         hr: hrScore || "",
//                         average: average,
//                     };
//                 });

//                 setParameters(loadedParameters);

//                 const firstRecord = employeePhaseDataMap.values().next().value;
//                 setComments({
//                     lineManager: firstRecord ? firstRecord.comment_by_lm || "" : "",
//                     head: firstRecord ? firstRecord.comment_by_head || "" : "",
//                     hr: firstRecord ? firstRecord.comment_by_hr || "" : "",
//                 });

//                 if (firstRecord && firstRecord.points_by_hr != null && firstRecord.comment_by_hr) {
//                     setIsSaved(true);
//                 }

//             } catch (e) {
//                 setError("An error occurred while fetching performance data.");
//                 console.error("Failed to fetch phase data:", e);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchPhaseData();
//     }, [user_id, designation_id]);

//     const handleChange = (id, field, value) => {
//         const updated = parameters.map((param) => {
//             if (param.id === id) {
//                 const newParam = { ...param, [field]: value };
//                 const scores = [newParam.lm, newParam.head, newParam.hr]
//                     .map(score => parseFloat(score))
//                     .filter(score => !isNaN(score));
//                 const sum = scores.reduce((a, b) => a + b, 0);
//                 const average = scores.length > 0 ? (sum / scores.length).toFixed(1) : "0.0";
//                 return { ...newParam, average: average };
//             }
//             return param;
//         });
//         setParameters(updated);
//     };

//     const handleCommentChange = (rater, value) => {
//         setComments((prev) => ({ ...prev, [rater]: value }));
//     };

//     const handleSave = async () => {
//         setIsSaving(true);
//         const role_id = localStorage.getItem('userRoleId');
//         const payload = {
//             role_id: parseInt(role_id, 10),
//             entries: parameters.map(param => ({
//                 emp_id: user_id,
//                 parameter_id: param.id,
//                 phase: 4,
//                 points_by_lm: param.lm ? parseInt(param.lm, 10) : null,
//                 comment_by_lm: comments.lineManager,
//                 points_by_head: param.head ? parseInt(param.head, 10) : null,
//                 comment_by_head: comments.head,
//                 points_by_hr: param.hr ? parseInt(param.hr, 10) : null,
//                 comment_by_hr: comments.hr,
//             }))
//         };

//         try {
//             await axiosInstance.post('apis/save_phasewise_data/', payload);
//             setSnackbar({
//                 open: true,
//                 message: "Phase 4 parameters saved successfully!",
//                 severity: "success",
//             });
//             setIsSaved(true);
//         } catch (error) {
//             console.error("Failed to save Phase 4 parameters:", error);
//             setSnackbar({
//                 open: true,
//                 message: "Error saving parameters. Please try again.",
//                 severity: "error",
//             });
//         } finally {
//             setIsSaving(false);
//         }
//     };

//     const handleCloseSnackbar = (event, reason) => {
//         if (reason === "clickaway") return;
//         setSnackbar(prev => ({ ...prev, open: false }));
//     };

//     if (loading) {
//         return <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress /></Box>;
//     }
//     if (error) {
//         return <Alert severity="error" sx={{ m: 2 }}>{error}</Alert>;
//     }

//     return (
//         <Box>
//             <Typography variant="h6" gutterBottom align="center">
//                 Phase 4 Content for Employee ID: {user_id}
//             </Typography>

//             <Paper elevation={2} sx={{ mt: 2 }}>
//                 <Table>
//                     <TableHead>
//                         <TableRow sx={{ backgroundColor: "#BDBDBD" }}>
//                             <TableCell align="center"><strong>Sr No</strong></TableCell>
//                             <TableCell align="center"><strong>Parameter</strong></TableCell>
//                             <TableCell align="center"><strong>LM</strong></TableCell>
//                             <TableCell align="center"><strong>Head</strong></TableCell>
//                             <TableCell align="center"><strong>HR</strong></TableCell>
//                             <TableCell align="center"><strong>Average</strong></TableCell>
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {parameters.map((row, index) => (
//                             <TableRow key={row.id}>
//                                 <TableCell align="center">{index + 1}</TableCell>
//                                 <TableCell align="center">{row.name}</TableCell>
//                                 <TableCell align="center">
//                                     <TextField
//                                         type="number"
//                                         value={row.lm}
//                                         onChange={(e) => handleChange(row.id, "lm", e.target.value)}
//                                         inputProps={{ min: 0, max: 10 }}
//                                         size="small"
//                                         disabled
//                                     />
//                                 </TableCell>
//                                 <TableCell align="center">
//                                     <TextField
//                                         type="number"
//                                         value={row.head}
//                                         onChange={(e) => handleChange(row.id, "head", e.target.value)}
//                                         inputProps={{ min: 0, max: 10 }}
//                                         size="small"
//                                         disabled
//                                     />
//                                 </TableCell>
//                                 <TableCell align="center">
//                                     <TextField
//                                         type="number"
//                                         value={row.hr}
//                                         onChange={(e) => handleChange(row.id, "hr", e.target.value)}
//                                         inputProps={{ min: 0, max: 10 }}
//                                         size="small"
//                                         disabled={isSaved}
//                                     />
//                                 </TableCell>
//                                 <TableCell align="center">{row.average}</TableCell>
//                             </TableRow>
//                         ))}
//                     </TableBody>
//                 </Table>
//             </Paper>

//             <Card variant="outlined" sx={{ mt: 3 }}>
//                 <CardHeader title="Phase Comments" />
//                 <CardContent>
//                     <Grid container spacing={2}>
//                         <Grid item xs={12} md={4}>
//                             <TextField
//                                 label="Line Manager Comments"
//                                 multiline
//                                 rows={3}
//                                 fullWidth
//                                 value={comments.lineManager}
//                                 onChange={(e) => handleCommentChange("lineManager", e.target.value)}
//                                 disabled
//                             />
//                         </Grid>
//                         <Grid item xs={12} md={4}>
//                             <TextField
//                                 label="Head Comments"
//                                 multiline
//                                 rows={3}
//                                 fullWidth
//                                 value={comments.head}
//                                 onChange={(e) => handleCommentChange("head", e.target.value)}
//                                 disabled
//                             />
//                         </Grid>
//                         <Grid item xs={12} md={4}>
//                             <TextField
//                                 label="HR Comments"
//                                 multiline
//                                 rows={3}
//                                 fullWidth
//                                 value={comments.hr}
//                                 onChange={(e) => handleCommentChange("hr", e.target.value)}
//                                 disabled={isSaved}
//                             />
//                         </Grid>
//                     </Grid>
//                 </CardContent>
//             </Card>

//             <Box display="flex" justifyContent="center" mt={3}>
//                 <Button
//                     variant="contained"
//                     color="primary"
//                     onClick={handleSave}
//                     disabled={isSaving || isSaved}
//                 >
//                     {isSaving ? <CircularProgress size={24} /> : (isSaved ? "Saved" : "Save Phase 4")}
//                 </Button>
//             </Box>

//             <Snackbar
//                 open={snackbar.open}
//                 autoHideDuration={4000}
//                 onClose={handleCloseSnackbar}
//                 anchorOrigin={{ vertical: "top", horizontal: "center" }}
//             >
//                 <Alert
//                     onClose={handleCloseSnackbar}
//                     severity={snackbar.severity}
//                     variant="filled"
//                     sx={{ width: "100%" }}
//                 >
//                     {snackbar.message}
//                 </Alert>
//             </Snackbar>
//         </Box>
//     );
// };

// const OverallAnalysis = ({ userId, employeeVId }) => {
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [isSaving, setIsSaving] = useState(false);
//     const [isOverallSaved, setIsOverallSaved] = useState(false);
//     const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
//     const [allPhaseComments, setAllPhaseComments] = useState([]);
//     const [overallComments, setOverallComments] = useState({
//         hr: ""
//     });

//     const [kpiData, setKpiData] = useState([
//         { kpi: "A", target: 1, ach: 1, rating: 5 },
//         { kpi: "B", target: 2, ach: 5, rating: 7 },
//         { kpi: "C", target: 3, ach: 6, rating: 9 },
//     ]);

//     const [kraData, setKraData] = useState([
//         { parameter: "HADC", totalRating: 10 },
//         { parameter: "QCP", totalRating: 10 },
//     ]);

//     const [phaseWiseData, setPhaseWiseData] = useState(null);

//     useEffect(() => {
//         const fetchPhaseWiseData = async () => {
//             if (!userId) {
//                 setError("User ID not found.");
//                 setLoading(false);
//                 return;
//             }
//             try {
//                 setLoading(true);
//                 const response = await axiosInstance.get(`apis/get_employee_overall_phasewise/?user_id=${userId}`);
//                 if (response.data.status === "success") {
//                     const data = response.data.data;
//                     setPhaseWiseData(data);
//                     setOverallComments({ hr: data.final_hr_comment || "" });
//                     if (data.final_hr_comment && data.final_hr_comment !== "No comment.") {
//                         setIsOverallSaved(true);
//                     }
//                 } else {
//                     throw new Error("Failed to fetch phase data.");
//                 }
//             } catch (error) {
//                 console.error("Failed to fetch phase-wise data:", error);
//                 setError("Could not load phase-wise performance data.");
//             } finally {
//                 setLoading(false);
//             }
//         };

//         const fetchAllPhaseComments = async () => {
//             if (!userId) return;
//             try {
//                 const response = await axiosInstance.get(`apis/get_phasewise_data/${userId}/`);
//                 if (response.data.status === "success" && Array.isArray(response.data.data)) {
//                     const comments = [1, 2, 3, 4].map(phaseNum => {
//                         const phaseData = response.data.data.find(item => item.phase === phaseNum);
//                         return {
//                             phase: `Phase ${phaseNum}`,
//                             lm: phaseData?.comment_by_lm || "N/A",
//                             head: phaseData?.comment_by_head || "N/A",
//                             hr: phaseData?.comment_by_hr || "N/A",
//                         };
//                     });
//                     setAllPhaseComments(comments);
//                 }
//             } catch (error) {
//                 console.error("Failed to fetch all phase comments:", error);
//             }
//         };

//         fetchPhaseWiseData();
//         fetchAllPhaseComments();
//     }, [userId]);

//     const handleKpiChange = (index, field, value) => {
//         const newData = [...kpiData];
//         const isNumeric = ["target", "ach", "rating"].includes(field);
//         newData[index][field] = isNumeric ? Number(value) : value;
//         setKpiData(newData);
//     };

//     const handleKraChange = (index, field, value) => {
//         const newData = [...kraData];
//         newData[index][field] = field === "totalRating" ? Number(value) : value;
//         setKraData(newData);
//     };

//     const handleOverallCommentChange = (rater, value) => {
//         setOverallComments(prev => ({ ...prev, [rater]: value }));
//     };

//     const handleSave = async () => {
//         setIsSaving(true);
//         try {
//             const kpiRatings = kpiData.map((item) => Number(item.rating) || 0);
//             const kraRatings = kraData.map((item) => Number(item.totalRating) || 0);
//             const allKpiKraRatings = [...kpiRatings, ...kraRatings].filter((r) => r > 0);
//             const kpiKraAverage = allKpiKraRatings.length > 0 ? (allKpiKraRatings.reduce((sum, r) => sum + r, 0) / allKpiKraRatings.length).toFixed(1) : "0.0";

//             let value4AEE = 0;
//             if (phaseWiseData) {
//                 const scoreKeys = [
//                     'phase1_lm', 'phase2_lm', 'phase3_lm', 'phase4_lm',
//                     'phase1_head', 'phase2_head', 'phase3_head', 'phase4_head',
//                     'phase1_hr', 'phase2_hr', 'phase3_hr', 'phase4_hr'
//                 ];
//                 const totalApiScore = scoreKeys.reduce((sum, key) => sum + (phaseWiseData[key] || 0), 0);
//                 const maxPhaseScorePerSlot = 40;
//                 const totalMaxScore = 12 * maxPhaseScorePerSlot;
//                 if (totalMaxScore > 0) {
//                     value4AEE = (totalApiScore / totalMaxScore) * 10;
//                 }
//             }

//             const finalAverage = ((value4AEE + parseFloat(kpiKraAverage)) / 2).toFixed(1);
//             const achievementPercentage = (parseFloat(finalAverage) * 10).toFixed(0);

//             const payload = {
//                 user_id: userId,
//                 emp_id: employeeVId,
//                 performance_analysis: overallComments.hr || "No detailed comments provided.",
//                 kra_kpi_total: kpiKraAverage,
//                 average: finalAverage,
//                 percent_achievement: achievementPercentage,
//                 comment_by_lm: "No comment.",
//                 comment_by_hr: overallComments.hr || "No comment.",
//                 comment_by_head: "No comment."
//             };

//             await axiosInstance.post("apis/save_employee_overall_analysis/", payload);
//             setSnackbar({ open: true, message: "Overall analysis saved successfully!", severity: "success" });
//             setIsOverallSaved(true);

//         } catch (error) {
//             console.error("Failed to save overall analysis:", error);
//             const errorMessage = error.response?.data?.message || "An error occurred while saving the analysis.";
//             setSnackbar({ open: true, message: errorMessage, severity: "error" });
//         } finally {
//             setIsSaving(false);
//         }
//     };

//     if (loading) {
//         return <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress /></Box>;
//     }
//     if (error) {
//         return <Alert severity="error" sx={{ m: 2 }}>{error}</Alert>;
//     }

//     const phaseKeys = ["phase1", "phase2", "phase3", "phase4"];
//     const kpiRatings = kpiData.map((item) => Number(item.rating) || 0);
//     const kraRatings = kraData.map((item) => Number(item.totalRating) || 0);
//     const allKpiKraRatings = [...kpiRatings, ...kraRatings].filter((r) => r > 0);
//     const kpiKraAverage = allKpiKraRatings.length > 0 ? (allKpiKraRatings.reduce((sum, r) => sum + r, 0) / allKpiKraRatings.length).toFixed(1) : "0.0";
//     const textFieldStyles = { padding: '2px 4px', '& .MuiInput-underline:before': { borderBottom: 'none' }, '& .MuiInput-underline:hover:not(.Mui-disabled):before': { borderBottom: 'none' }, '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)', borderRadius: '4px' }, };

//     let value4AEE = 0;
//     let percent4AEE = 0;
//     if (phaseWiseData) {
//         const scoreKeys = [
//             'phase1_lm', 'phase2_lm', 'phase3_lm', 'phase4_lm',
//             'phase1_head', 'phase2_head', 'phase3_head', 'phase4_head',
//             'phase1_hr', 'phase2_hr', 'phase3_hr', 'phase4_hr'
//         ];
//         const totalApiScore = scoreKeys.reduce((sum, key) => sum + (phaseWiseData[key] || 0), 0);
//         const maxPhaseScorePerSlot = 40;
//         const totalMaxScore = 12 * maxPhaseScorePerSlot;

//         if (totalMaxScore > 0) {
//             value4AEE = (totalApiScore / totalMaxScore) * 10;
//             percent4AEE = (totalApiScore / totalMaxScore) * 100;
//         }
//     }

//     const valueKpiKra = parseFloat(kpiKraAverage);
//     const percentKpiKra = valueKpiKra * 10;
//     const totalValue = (value4AEE + valueKpiKra) / 2;
//     const percentTotal = totalValue * 10;

//     const lmTotal = phaseWiseData ?
//         (phaseWiseData.phase1_lm || 0) +
//         (phaseWiseData.phase2_lm || 0) +
//         (phaseWiseData.phase3_lm || 0) +
//         (phaseWiseData.phase4_lm || 0) : 0;

//     const headTotal = phaseWiseData ?
//         (phaseWiseData.phase1_head || 0) +
//         (phaseWiseData.phase2_head || 0) +
//         (phaseWiseData.phase3_head || 0) +
//         (phaseWiseData.phase4_head || 0) : 0;

//     const hrTotal = phaseWiseData ?
//         (phaseWiseData.phase1_hr || 0) +
//         (phaseWiseData.phase2_hr || 0) +
//         (phaseWiseData.phase3_hr || 0) +
//         (phaseWiseData.phase4_hr || 0) : 0;

//     const grandTotal = lmTotal + headTotal + hrTotal;

//     return (
//         <Box>
//             <Typography variant="h5" sx={{ mb: 3, color: "primary.main", fontWeight: "bold" }}>
//                 Performance Analysis Summary
//             </Typography>
//             <Grid container spacing={3}>
//                 <Grid item xs={12}>
//                     <Card sx={{ height: "100%" }}>
//                         <CardHeader title="Phase-wise Performance" titleTypographyProps={{ variant: 'h6' }} />
//                         <CardContent>
//                             <TableContainer>
//                                 <Table size="small">
//                                     <TableHead>
//                                         <TableRow>
//                                             <TableCell sx={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}>Phase</TableCell>
//                                             <TableCell sx={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }} align="right">Line Manager</TableCell>
//                                             <TableCell sx={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }} align="right">Head</TableCell>
//                                             <TableCell sx={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }} align="right">HR</TableCell>
//                                             <TableCell sx={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }} align="right">Total</TableCell>
//                                         </TableRow>
//                                     </TableHead>
//                                     <TableBody>
//                                         {phaseWiseData && phaseKeys.map((phase, index) => {
//                                             const lm = phaseWiseData[`phase${index + 1}_lm`] || 0;
//                                             const head = phaseWiseData[`phase${index + 1}_head`] || 0;
//                                             const hr = phaseWiseData[`phase${index + 1}_hr`] || 0;
//                                             const rowTotal = lm + head + hr;
//                                             return (
//                                                 <TableRow key={phase} >
//                                                     <TableCell>{["Align (P1)", "Accelerate (P2)", "Achieve (P3)", "Aspire (P4)"][index]}</TableCell>
//                                                     <TableCell align="right">{lm.toFixed(1)}</TableCell>
//                                                     <TableCell align="right">{head.toFixed(1)}</TableCell>
//                                                     <TableCell align="right">{hr.toFixed(1)}</TableCell>
//                                                     <TableCell align="right">{rowTotal.toFixed(1)}</TableCell>
//                                                 </TableRow>
//                                             );
//                                         })}

//                                         <TableRow sx={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}>
//                                             <TableCell sx={{ fontWeight: "bold" }}>Total</TableCell>
//                                             <TableCell sx={{ fontWeight: "bold" }} align="right">{lmTotal.toFixed(1)}</TableCell>
//                                             <TableCell sx={{ fontWeight: "bold" }} align="right">{headTotal.toFixed(1)}</TableCell>
//                                             <TableCell sx={{ fontWeight: "bold" }} align="right">{hrTotal.toFixed(1)}</TableCell>
//                                             <TableCell sx={{ fontWeight: "bold" }} align="right">{grandTotal.toFixed(1)}</TableCell>
//                                         </TableRow>
//                                     </TableBody>

//                                 </Table>
//                             </TableContainer>
//                         </CardContent>
//                     </Card>
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                     <Card sx={{ height: "100%" }}>
//                         <CardHeader title="KPI" titleTypographyProps={{ variant: 'h6' }} />
//                         <CardContent>
//                             <TableContainer>
//                                 <Table size="small" sx={{ tableLayout: 'fixed' }}>
//                                     <TableHead>
//                                         <TableRow>
//                                             <TableCell sx={{ fontWeight: "bold", width: '15%', backgroundColor: "#f5f5f5" }}>KPI</TableCell>
//                                             <TableCell sx={{ fontWeight: "bold", textAlign: 'center', width: '20%', backgroundColor: "#f5f5f5" }}>Target</TableCell>
//                                             <TableCell sx={{ fontWeight: "bold", textAlign: 'center', width: '20%', backgroundColor: "#f5f5f5" }}>Ach</TableCell>
//                                             <TableCell sx={{ fontWeight: "bold", textAlign: 'center', width: '20%', backgroundColor: "#f5f5f5" }}>Rating</TableCell>
//                                         </TableRow>
//                                     </TableHead>
//                                     <TableBody>
//                                         {kpiData.map((row, index) => (
//                                             <TableRow key={index}>
//                                                 <TableCell sx={{ p: 0.5, wordBreak: 'break-word' }}>
//                                                     <TextField fullWidth size="small" variant="standard" value={row.kpi} onChange={(e) => handleKpiChange(index, "kpi", e.target.value)} sx={textFieldStyles} disabled={isOverallSaved} />
//                                                 </TableCell>
//                                                 <TableCell sx={{ p: 0.5 }}>
//                                                     <TextField fullWidth size="small" variant="standard" type="number" value={row.target} onChange={(e) => handleKpiChange(index, "target", e.target.value)} sx={textFieldStyles} InputProps={{ sx: { textAlign: "center" } }} disabled={isOverallSaved} />
//                                                 </TableCell>
//                                                 <TableCell sx={{ p: 0.5 }}>
//                                                     <TextField fullWidth size="small" variant="standard" type="number" value={row.ach} onChange={(e) => handleKpiChange(index, "ach", e.target.value)} sx={textFieldStyles} InputProps={{ sx: { textAlign: "center" } }} disabled={isOverallSaved} />
//                                                 </TableCell>
//                                                 <TableCell sx={{ p: 0.5 }}>
//                                                     <TextField fullWidth size="small" variant="standard" type="number" value={row.rating} onChange={(e) => handleKpiChange(index, "rating", e.target.value)} sx={textFieldStyles} InputProps={{ sx: { textAlign: "center" } }} disabled={isOverallSaved} />
//                                                 </TableCell>
//                                             </TableRow>
//                                         ))}
//                                     </TableBody>
//                                 </Table>
//                             </TableContainer>
//                         </CardContent>
//                     </Card>
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                     <Card sx={{ height: "100%" }}>
//                         <CardHeader title="KRA" titleTypographyProps={{ variant: 'h6' }} />
//                         <CardContent>
//                             <TableContainer>
//                                 <Table size="small" sx={{ tableLayout: 'fixed' }}>
//                                     <TableHead>
//                                         <TableRow>
//                                             <TableCell sx={{ fontWeight: "bold", width: '60%', backgroundColor: "#f5f5f5" }}>KRA Parameter</TableCell>
//                                             <TableCell sx={{ fontWeight: "bold", textAlign: 'center', width: '40%', backgroundColor: "#f5f5f5" }}>Total Rating</TableCell>
//                                         </TableRow>
//                                     </TableHead>
//                                     <TableBody>
//                                         {kraData.map((row, index) => (
//                                             <TableRow key={index}>
//                                                 <TableCell sx={{ p: 0.5, wordBreak: 'break-word' }}>
//                                                     <TextField fullWidth size="small" variant="standard" value={row.parameter} onChange={(e) => handleKraChange(index, "parameter", e.target.value)} sx={textFieldStyles} disabled={isOverallSaved} />
//                                                 </TableCell>
//                                                 <TableCell sx={{ p: 0.5 }}>
//                                                     <TextField fullWidth size="small" variant="standard" type="number" value={row.totalRating} onChange={(e) => handleKraChange(index, "totalRating", e.target.value)} sx={textFieldStyles} InputProps={{ sx: { textAlign: "center" } }} disabled={isOverallSaved} />
//                                                 </TableCell>
//                                             </TableRow>
//                                         ))}
//                                     </TableBody>
//                                 </Table>
//                             </TableContainer>
//                         </CardContent>
//                     </Card>
//                 </Grid>
//                 <Grid item xs={12} sx={{ mt: 2 }}>
//                     <Card>
//                         <CardHeader title="All Total" />
//                         <CardContent>
//                             <TableContainer>
//                                 <Table>
//                                     <TableHead>
//                                         <TableRow>
//                                             <TableCell sx={{ backgroundColor: "#f5f5f5", fontWeight: "bold" }}>4AEE Program</TableCell>
//                                             <TableCell sx={{ backgroundColor: "#f5f5f5", fontWeight: "bold" }}>Ach % </TableCell>
//                                             <TableCell sx={{ backgroundColor: "#f5f5f5", fontWeight: "bold" }}>KRA/KPI</TableCell>
//                                             <TableCell sx={{ backgroundColor: "#f5f5f5", fontWeight: "bold" }}>Ach % </TableCell>
//                                             <TableCell sx={{ backgroundColor: "#f5f5f5", fontWeight: "bold" }}>Total</TableCell>
//                                             <TableCell sx={{ backgroundColor: "#f5f5f5", fontWeight: "bold" }}>Ach % </TableCell>
//                                         </TableRow>
//                                     </TableHead>
//                                     <TableBody>
//                                         <TableRow sx={{ fontWeight: "bold" }}>
//                                             <TableCell>{value4AEE.toFixed(1)}</TableCell>
//                                             <TableCell>{percent4AEE.toFixed(0)}%</TableCell>
//                                             <TableCell>{valueKpiKra.toFixed(1)}</TableCell>
//                                             <TableCell>{percentKpiKra.toFixed(0)}%</TableCell>
//                                             <TableCell sx={{ fontWeight: "bold" }}>{totalValue.toFixed(1)}</TableCell>
//                                             <TableCell sx={{ fontWeight: "bold" }}>{percentTotal.toFixed(0)}%</TableCell>
//                                         </TableRow>
//                                     </TableBody>
//                                 </Table>
//                             </TableContainer>
//                         </CardContent>
//                     </Card>
//                 </Grid>
//                 <Grid item xs={12} sx={{ mt: 2 }}>
//                     <Card variant="outlined">
//                         <CardHeader title="All Phases Comments" />
//                         <CardContent>
//                             <TableContainer>
//                                 <Table>
//                                     <TableHead>
//                                         <TableRow>
//                                             <TableCell sx={{ backgroundColor: "#f5f5f5", fontWeight: "bold" }}>Phases</TableCell>
//                                             <TableCell sx={{ backgroundColor: "#f5f5f5", fontWeight: "bold" }}>Line Manager</TableCell>
//                                             <TableCell sx={{ backgroundColor: "#f5f5f5", fontWeight: "bold" }}>Head</TableCell>
//                                             <TableCell sx={{ backgroundColor: "#f5f5f5", fontWeight: "bold" }}>HR</TableCell>
//                                         </TableRow>
//                                     </TableHead>
//                                     <TableBody>
//                                         {allPhaseComments.map((row, index) => (
//                                             <TableRow key={index}>
//                                                 <TableCell>{row.phase}</TableCell>
//                                                 <TableCell>{row.lm}</TableCell>
//                                                 <TableCell>{row.head}</TableCell>
//                                                 <TableCell>{row.hr}</TableCell>
//                                             </TableRow>
//                                         ))}
//                                     </TableBody>
//                                 </Table>
//                             </TableContainer>
//                         </CardContent>
//                     </Card>
//                 </Grid>
//                 {/* <Grid item xs={12} sx={{ mt: 2 }}>
//                     <Card variant="outlined">
//                         <CardHeader title="Overall Comments" />
//                         <CardContent>
//                             <Grid container spacing={2}>
//                                 <Grid item xs={12}>
//                                     <TextField
//                                         label="HR final comment"
//                                         multiline
//                                         rows={3}
//                                         fullWidth
//                                         value={overallComments.hr}
//                                         onChange={(e) => handleOverallCommentChange("hr", e.target.value)}
//                                         disabled={isOverallSaved}
//                                     />
//                                 </Grid>
//                             </Grid>
//                         </CardContent>
//                     </Card>
//                 </Grid> */}
//             </Grid>

//             <Box display="flex" justifyContent="center" mt={3}>
//                 <Button variant="contained" color="primary" onClick={handleSave} disabled={isSaving || isOverallSaved}>
//                     {isSaving ? <CircularProgress size={24} color="inherit" /> : (isOverallSaved ? "Saved" : "Save Overall Analysis")}
//                 </Button>
//             </Box>

//             <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar({ ...snackbar, open: false })} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
//                 <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} variant="filled" sx={{ width: '100%' }}>
//                     {snackbar.message}
//                 </Alert>
//             </Snackbar>
//         </Box>
//     );
// };

// export const MarksHR = () => {
//     const { id } = useParams();
//     const navigate = useNavigate();
//     const [activeTab, setActiveTab] = useState(0);
//     const location = useLocation();
//     const { user_id, emp_id, designation_id } = location.state || {};

//     const handleTabChange = (event, newValue) => {
//         setActiveTab(newValue);
//     };

//     const renderTabContent = () => {
//         const props = { user_id: user_id, userId: user_id, employeeVId: emp_id, designation_id: designation_id };

//         switch (activeTab) {
//             case 0: return <Phase1 {...props} />;
//             case 1: return <Phase2 {...props} />;
//             case 2: return <Phase3 {...props} />;
//             case 3: return <Phase4 {...props} />;
//             case 4: return <OverallAnalysis {...props} />;
//             default: return null;
//         }
//     };

//     return (
//         <Box sx={{ backgroundColor: "#fafafa", minHeight: "100vh" }}>
//             <Box sx={{ mb: 3 }}>
//                 <AppBar
//                     position="static"
//                     sx={{ backgroundColor: "#ffffff", color: "#0d47a1", boxShadow: 2 }}
//                 >
//                     <Toolbar>
//                         <IconButton
//                             edge="start"
//                             color="inherit"
//                             onClick={() => navigate("/hrms/dashboardhr/confirmation")}
//                             sx={{ mr: 2 }}
//                         >
//                             <ArrowBackIcon />
//                         </IconButton>

//                         <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 600 }}>
//                             Employee Performance - ID: {id}
//                         </Typography>
//                     </Toolbar>
//                 </AppBar>

//                 <Box
//                     sx={{
//                         borderBottom: 1,
//                         borderColor: "divider",
//                         bgcolor: "#f5f5f5",
//                         px: 2,
//                         pt: 2,
//                     }}
//                 >
//                     <Paper elevation={2} sx={{ borderRadius: 2, p: 1 }}>
//                         <Tabs
//                             value={activeTab}
//                             onChange={handleTabChange}
//                             textColor="primary"
//                             indicatorColor="primary"
//                             centered
//                         >
//                             <Tab label="Phase 1" sx={{ fontWeight: 600 }} />
//                             <Tab label="Phase 2" sx={{ fontWeight: 600 }} />
//                             <Tab label="Phase 3" sx={{ fontWeight: 600 }} />
//                             <Tab label="Phase 4" sx={{ fontWeight: 600 }} />
//                             <Tab label="Overall Analysis" sx={{ fontWeight: 600 }} />
//                         </Tabs>
//                     </Paper>
//                 </Box>
//             </Box>

//             <Box px={3} pb={4}>
//                 {renderTabContent()}
//             </Box>
//         </Box>
//     );
// };

// const StyledArrowButton = styled(IconButton)(({ theme }) => ({
//     color: "#616161",
//     transition: "color 0.3s",
//     "&:hover": {
//         color: "#ec466f",
//     },
// }));

// export const PerformanceTableHR = () => {
//     const navigate = useNavigate();
//     const [data, setData] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     const [hoveredRowId, setHoveredRowId] = useState(null);
//     const [statusSelection, setStatusSelection] = useState({});
//     const [rowsPerPage, setRowsPerPage] = useState(5);
//     const [searchQuery, setSearchQuery] = useState("");
//     const [currentPage, setCurrentPage] = useState(1);

//     useEffect(() => {
//         const fetchPerformanceData = async () => {
//             const role_id = localStorage.getItem('userRoleId');
//             const user_id = localStorage.getItem('loggedInEmpId');

//             if (!role_id || !user_id) {
//                 setError("User role or ID not found in session. Please log in again.");
//                 setLoading(false);
//                 return;
//             }

//             try {
//                 setLoading(true);
//                 const response = await fetch(`https://tdtlworld.com/hrms-backend/apis/get_employee_performance/${role_id}/${user_id}/`);
//                 if (!response.ok) {
//                     throw new Error(`HTTP error! status: ${response.status}`);
//                 }
//                 const apiData = await response.json();

//                 const transformedData = apiData.map((item, index) => ({
//                     id: item.user_id,
//                     empId: item.emp_id,
//                     employee: item.full_name,
//                     designation: item.designation_name,
//                     designation_id: item.designation_id,
//                     doj: item.date_of_joining,
//                     lm: item.manager_name,
//                     phase1: item.phase_one_points,
//                     phase2: item.phase_two_points,
//                     phase3: item.phase_three_points,
//                     phase4: item.phase_four_points,
//                     overall: item.performance_analysis,
//                     score: item.avg_score,
//                     apiStatus: item.employee_status,
//                 }));

//                 setData(transformedData);
//                 setError(null);
//             } catch (e) {
//                 setError(e.message);
//                 console.error("Failed to fetch performance data:", e);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchPerformanceData();
//     }, []);

//     const handleStatusChange = (id, value) => {
//         setStatusSelection((prev) => ({ ...prev, [id]: value }));
//     };

//     const handleConfirmStatus = (id) => {
//         const employee = data.find(emp => emp.id === id);
//         const selectedAction = statusSelection[id];
//         console.log(`Confirming action for ${employee.employee} (ID: ${id}) with status: ${selectedAction}`);
//     };

//     const handleNavigate = (id) => {
//         const selectedRow = data.find((emp) => emp.id === id);
//         if (!selectedRow) return;

//         navigate(`/hrms/dashboardhr/marks/${selectedRow.id}`, {
//             state: {
//                 user_id: selectedRow.id,
//                 emp_id: selectedRow.empId,
//                 designation_id: selectedRow.designation_id,
//             },
//         });
//     };

//     const getStatusColor = (status) => {
//         switch (status) {
//             case "Extend": return "#FFA726";
//             case "Confirm": return "#66BB6A";
//             case "Terminate": return "#EF5350";
//             default: return "";
//         }
//     };

//     const renderStatusBox = (status) => {
//         const style = {
//             backgroundColor: "#ECEFF1", color: "#607D8B", fontWeight: 600,
//         };
//         if (status === "Confirmed") {
//             style.backgroundColor = "#E8F5E9"; style.color = "#388E3C";
//         } else if (status === "Terminated") {
//             style.backgroundColor = "#FFEBEE"; style.color = "#D32F2F";
//         }
//         return (
//             <Box sx={{ px: 2, py: 0.5, borderRadius: 1, display: "inline-block", ...style }}>
//                 {status}
//             </Box>
//         );
//     }

//     const renderBoxedCell = (value, isPercentage = false) => (
//         <Box sx={{
//             px: 1, py: 0.5, border: "1px solid #ccc",
//             borderRadius: 1, minWidth: 40, textAlign: "center",
//         }}>
//             {value != null ? `${value}${isPercentage ? '%' : ''}` : "-"}
//         </Box>
//     );

//     const filteredData = data.filter(item =>
//         item.employee.toLowerCase().includes(searchQuery.toLowerCase())
//     );
//     const totalPages = Math.ceil(filteredData.length / rowsPerPage);
//     const paginatedData = filteredData.slice(
//         (currentPage - 1) * rowsPerPage,
//         currentPage * rowsPerPage
//     );

//     if (loading) {
//         return (
//             <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
//                 <CircularProgress />
//                 <Typography sx={{ ml: 2 }}>Loading Performance Data...</Typography>
//             </Box>
//         );
//     }

//     if (error) {
//         return (
//             <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
//                 <Typography color="error">Error: {error}</Typography>
//             </Box>
//         );
//     }

//     return (
//         <Box>
//             <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
//                 <Typography variant="h5" fontWeight="bold">
//                     Performance Table
//                 </Typography>
//             </Box>

//             <Box display="flex" justifyContent="space-between" mb={2} px={1}>
//                 <FormControl size="small">
//                     <InputLabel>Rows</InputLabel>
//                     <Select
//                         value={rowsPerPage}
//                         onChange={(e) => { setRowsPerPage(e.target.value); setCurrentPage(1); }}
//                         label="Rows"
//                         sx={{ width: 100 }}
//                     >
//                         {[5, 10, 15, 25].map((opt) => (
//                             <MenuItem key={opt} value={opt}>{opt}</MenuItem>
//                         ))}
//                     </Select>
//                 </FormControl>

//                 <TextField
//                     size="small"
//                     label="Search Employee"
//                     variant="outlined"
//                     value={searchQuery}
//                     onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
//                 />
//             </Box>

//             <TableContainer component={Paper}>
//                 <Table>
//                     <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
//                         <TableRow>
//                             {[
//                                 "Sr No", "Employee", "Designation", "DOJ", "LM",
//                                 "Phase1", "Phase2", "Phase3", "Phase4",
//                                 "Overall", "Score",
//                             ].map((heading) => (
//                                 <TableCell key={heading} align="center" sx={{ fontWeight: 'bold' }}>
//                                     {heading}
//                                 </TableCell>
//                             ))}
//                         </TableRow>
//                     </TableHead>

//                     <TableBody>
//                         {paginatedData.map((row, index) => {
//                             const selectedStatus = statusSelection[row.id] || "";
//                             return (
//                                 <TableRow
//                                     key={row.id}
//                                     onMouseEnter={() => setHoveredRowId(row.id)}
//                                     onMouseLeave={() => setHoveredRowId(null)}
//                                     sx={{ '&:hover': { backgroundColor: '#f9f9f9' } }}
//                                 >
//                                     <TableCell align="center">
//                                         {(currentPage - 1) * rowsPerPage + index + 1}
//                                     </TableCell>

//                                     <TableCell align="center">
//                                         {hoveredRowId === row.id ? (
//                                             <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//                                                 <Typography variant="body2" component="span" sx={{ mr: 1 }}>{row.employee}</Typography>
//                                                 <StyledArrowButton onClick={() => handleNavigate(row.id)} size="small">
//                                                     <ArrowForwardIcon fontSize="small" />
//                                                 </StyledArrowButton>
//                                             </Box>
//                                         ) : (
//                                             row.employee
//                                         )}
//                                     </TableCell>

//                                     <TableCell align="center">{row.designation}</TableCell>
//                                     <TableCell align="center">{row.doj}</TableCell>
//                                     <TableCell align="center">{row.lm}</TableCell>
//                                     <TableCell align="center">{renderBoxedCell(row.phase1)}</TableCell>
//                                     <TableCell align="center">{renderBoxedCell(row.phase2)}</TableCell>
//                                     <TableCell align="center">{renderBoxedCell(row.phase3)}</TableCell>
//                                     <TableCell align="center">{renderBoxedCell(row.phase4)}</TableCell>
//                                     <TableCell align="center">{renderBoxedCell(row.overall, true)}</TableCell>
//                                     <TableCell align="center">{renderBoxedCell(row.score)}</TableCell>

//                                     {/* <TableCell align="center">
//                                         {row.apiStatus === "Pending" ? (
//                                             <Box display="flex" alignItems="center" gap={1} justifyContent="center">
//                                                 <Select
//                                                     value={selectedStatus}
//                                                     onChange={(e) => handleStatusChange(row.id, e.target.value)}
//                                                     displayEmpty
//                                                     size="small"
//                                                     sx={{
//                                                         minWidth: 100,
//                                                         backgroundColor: getStatusColor(selectedStatus),
//                                                         color: selectedStatus ? "#fff" : "#000",
//                                                         fontWeight: 600,
//                                                         borderRadius: 1,
//                                                         "& .MuiSelect-icon": { color: selectedStatus ? "#fff" : "inherit" },
//                                                     }}
//                                                     renderValue={(value) => value || "Action"}
//                                                 >
//                                                     <MenuItem value="Confirm">Confirm</MenuItem>
//                                                     <MenuItem value="Extend">Extend</MenuItem>
//                                                     <MenuItem value="Terminate">Terminate</MenuItem>
//                                                 </Select>

//                                                 {selectedStatus && (
//                                                     <Button
//                                                         variant="contained"
//                                                         color="primary"
//                                                         size="small"
//                                                         onClick={() => handleConfirmStatus(row.id)}
//                                                     >
//                                                         Save
//                                                     </Button>
//                                                 )}
//                                             </Box>
//                                         ) : (
//                                             renderStatusBox(row.apiStatus)
//                                         )}
//                                     </TableCell> */}
//                                 </TableRow>
//                             );
//                         })}
//                     </TableBody>
//                 </Table>
//             </TableContainer>

//             <Box mt={2} display="flex" justifyContent="flex-end" alignItems="center" gap={2}>
//                 <Button
//                     variant="outlined"
//                     size="small"
//                     onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
//                     disabled={currentPage === 1}
//                 >
//                     Previous
//                 </Button>
//                 <Typography>Page {currentPage} of {totalPages}</Typography>
//                 <Button
//                     variant="outlined"
//                     size="small"
//                     onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
//                     disabled={currentPage === totalPages || totalPages === 0}
//                 >
//                     Next
//                 </Button>
//             </Box>
//         </Box>
//     );
// };

// // FIX: Add a default export to match the import statement in App.js
// export default PerformanceTableHR;




// import React, { useState, useEffect } from "react";
// import {
//     Table, TableBody, TableCell, TableContainer,
//     TableHead, TableRow, Paper, Select,
//     MenuItem, Button, IconButton, Typography,
//     Box, TextField, FormControl, InputLabel, CircularProgress,
//     Tabs, Tab, Toolbar, AppBar, Alert, Card,
//     CardContent, CardHeader, Grid, TablePagination,
//     Skeleton, InputAdornment, useTheme, useMediaQuery,
// } from "@mui/material";
// import Add from "@mui/icons-material/Add";
// import SearchIcon from "@mui/icons-material/Search"; // CORRECTED IMPORT SYNTAX
// import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import { useNavigate, useParams, useLocation } from "react-router-dom";
// import { styled } from "@mui/material/styles";
// import axios from "axios";
// import Swal from "sweetalert2";

// // Axios instance remains unchanged
// const axiosInstance = axios.create({
//     baseURL: "https://tdtlworld.com/hrms-backend/",
// });

// // Helper function to show alerts using SweetAlert2 as requested
// const showAlert = (icon, title, text) => {
//     Swal.fire({
//         icon,
//         title,
//         text,
//         timer: 3000,
//         showConfirmButton: false,
//     });
// };

// const Phase1 = ({ user_id, designation_id }) => {
//     const [parameters, setParameters] = useState([]);
//     const [comments, setComments] = useState({ lineManager: "", head: "", hr: "" });
//     const [isSaving, setIsSaving] = useState(false);
//     const [isSaved, setIsSaved] = useState(false);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchPhaseData = async () => {
//             if (!user_id || !designation_id) {
//                 setError("User ID or Designation ID is not provided.");
//                 setLoading(false);
//                 return;
//             }
//             try {
//                 setLoading(true);
//                 const phaseNumber = 1;
//                 const paramsResponse = await axiosInstance.get(`apis/get_desigwise_tabledata/?phase=${phaseNumber}&designation_id=${designation_id}`);
//                 const designationParameters = paramsResponse.data.data;

//                 if (!Array.isArray(designationParameters)) {
//                     setError("Failed to fetch parameters for this designation.");
//                     setLoading(false);
//                     return;
//                 }

//                 const employeeDataResponse = await axiosInstance.get(`apis/get_phasewise_data/${user_id}/`);
//                 const allEmployeeData = employeeDataResponse.data.data;
//                 const employeePhaseDataMap = new Map();

//                 if (employeeDataResponse.data.status === "success" && Array.isArray(allEmployeeData)) {
//                     allEmployeeData.filter(item => item.phase === phaseNumber).forEach(item => {
//                         employeePhaseDataMap.set(item.parameter_id, item);
//                     });
//                 }

//                 const loadedParameters = designationParameters.map(param => {
//                     const savedData = employeePhaseDataMap.get(param.parameter_id);
//                     const lmScore = savedData ? savedData.points_by_lm : "";
//                     const headScore = savedData ? savedData.points_by_head : "";
//                     const hrScore = savedData ? savedData.points_by_hr : "";
//                     const scores = [lmScore, headScore, hrScore].filter(s => s != null && s !== "").map(s => parseFloat(s));
//                     const average = scores.length > 0 ? (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1) : "0.0";
//                     return { id: param.parameter_id, name: param.para_name, lm: lmScore || "", head: headScore || "", hr: hrScore || "", average };
//                 });
//                 setParameters(loadedParameters);

//                 const firstRecord = employeePhaseDataMap.values().next().value;
//                 setComments({
//                     lineManager: firstRecord?.comment_by_lm || "",
//                     head: firstRecord?.comment_by_head || "",
//                     hr: firstRecord?.comment_by_hr || "",
//                 });

//                 if (firstRecord && firstRecord.points_by_hr != null && firstRecord.comment_by_hr) {
//                     setIsSaved(true);
//                 }
//             } catch (e) {
//                 setError("An error occurred while fetching performance data.");
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchPhaseData();
//     }, [user_id, designation_id]);

//     const handleChange = (id, field, value) => {
//         const updated = parameters.map((param) => {
//             if (param.id === id) {
//                 const newParam = { ...param, [field]: value };
//                 const scores = [newParam.lm, newParam.head, newParam.hr].map(s => parseFloat(s)).filter(s => !isNaN(s));
//                 const average = scores.length > 0 ? (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1) : "0.0";
//                 return { ...newParam, average };
//             }
//             return param;
//         });
//         setParameters(updated);
//     };

//     const handleCommentChange = (rater, value) => {
//         setComments((prev) => ({ ...prev, [rater]: value }));
//     };

//     const handleSave = async () => {
//         setIsSaving(true);
//         const role_id = localStorage.getItem('userRoleId');
//         const payload = {
//             role_id: parseInt(role_id, 10),
//             entries: parameters.map(param => ({
//                 emp_id: user_id,
//                 parameter_id: param.id,
//                 phase: 1,
//                 points_by_lm: param.lm ? parseInt(param.lm, 10) : null,
//                 comment_by_lm: comments.lineManager,
//                 points_by_head: param.head ? parseInt(param.head, 10) : null,
//                 comment_by_head: comments.head,
//                 points_by_hr: param.hr ? parseInt(param.hr, 10) : null,
//                 comment_by_hr: comments.hr,
//             }))
//         };
//         try {
//             await axiosInstance.post('apis/save_phasewise_data/', payload);
//             showAlert("success", "Success", "Phase 1 saved successfully!");
//             setIsSaved(true);
//         } catch (error) {
//             showAlert("error", "Error", "Error saving Phase 1 data. Please try again.");
//         } finally {
//             setIsSaving(false);
//         }
//     };

//     if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress /></Box>;
//     if (error) return <Alert severity="error" sx={{ m: 2 }}>{error}</Alert>;

//     return (
//         <Box>
//             <Typography variant="h6" gutterBottom align="center">Phase 1: Align</Typography>
//             <Paper elevation={2} sx={{ mt: 2 }}>
//                 <Table>
//                     <TableHead>
//                         <TableRow sx={{ backgroundColor: "#BDBDBD" }}>
//                             <TableCell align="center"><strong>Sr No</strong></TableCell>
//                             <TableCell align="center"><strong>Parameter</strong></TableCell>
//                             <TableCell align="center"><strong>LM</strong></TableCell>
//                             <TableCell align="center"><strong>Head</strong></TableCell>
//                             <TableCell align="center"><strong>HR</strong></TableCell>
//                             <TableCell align="center"><strong>Average</strong></TableCell>
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {parameters.map((row, index) => (
//                             <TableRow key={row.id}>
//                                 <TableCell align="center">{index + 1}</TableCell>
//                                 <TableCell align="center">{row.name}</TableCell>
//                                 <TableCell align="center"><TextField type="number" value={row.lm} onChange={(e) => handleChange(row.id, "lm", e.target.value)} inputProps={{ min: 0, max: 10 }} size="small" disabled /></TableCell>
//                                 <TableCell align="center"><TextField type="number" value={row.head} onChange={(e) => handleChange(row.id, "head", e.target.value)} inputProps={{ min: 0, max: 10 }} size="small" disabled /></TableCell>
//                                 <TableCell align="center"><TextField type="number" value={row.hr} onChange={(e) => handleChange(row.id, "hr", e.target.value)} inputProps={{ min: 0, max: 10 }} size="small" disabled={isSaved} /></TableCell>
//                                 <TableCell align="center">{row.average}</TableCell>
//                             </TableRow>
//                         ))}
//                     </TableBody>
//                 </Table>
//             </Paper>
//             <Card variant="outlined" sx={{ mt: 3 }}><CardHeader title="Phase Comments" /><CardContent><Grid container spacing={2}>
//                 <Grid item xs={12} md={4}><TextField label="Line Manager Comments" multiline rows={3} fullWidth value={comments.lineManager} onChange={(e) => handleCommentChange("lineManager", e.target.value)} disabled /></Grid>
//                 <Grid item xs={12} md={4}><TextField label="Head Comments" multiline rows={3} fullWidth value={comments.head} onChange={(e) => handleCommentChange("head", e.target.value)} disabled /></Grid>
//                 <Grid item xs={12} md={4}><TextField label="HR Comments" multiline rows={3} fullWidth value={comments.hr} onChange={(e) => handleCommentChange("hr", e.target.value)} disabled={isSaved} /></Grid>
//             </Grid></CardContent></Card>
//             <Box display="flex" justifyContent="center" mt={3}>
//                 <Button variant="contained" sx={{ backgroundColor: '#8C257C', '&:hover': { backgroundColor: '#6d1d60' } }} onClick={handleSave} disabled={isSaving || isSaved}>
//                     {isSaving ? <CircularProgress size={24} sx={{ color: 'white' }} /> : (isSaved ? "Saved" : "Save Phase 1")}
//                 </Button>
//             </Box>
//         </Box>
//     );
// };

// const Phase2 = ({ user_id, designation_id }) => {
//     const [parameters, setParameters] = useState([]);
//     const [comments, setComments] = useState({ lineManager: "", head: "", hr: "" });
//     const [isSaving, setIsSaving] = useState(false);
//     const [isSaved, setIsSaved] = useState(false);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchPhaseData = async () => {
//             if (!user_id || !designation_id) {
//                 setError("User ID or Designation ID is not provided.");
//                 setLoading(false);
//                 return;
//             }
//             try {
//                 setLoading(true);
//                 const phaseNumber = 2;
//                 const paramsResponse = await axiosInstance.get(`apis/get_desigwise_tabledata/?phase=${phaseNumber}&designation_id=${designation_id}`);
//                 const designationParameters = paramsResponse.data.data;

//                 if (!Array.isArray(designationParameters)) {
//                     setError("Failed to fetch parameters for this designation.");
//                     setLoading(false);
//                     return;
//                 }

//                 const employeeDataResponse = await axiosInstance.get(`apis/get_phasewise_data/${user_id}/`);
//                 const allEmployeeData = employeeDataResponse.data.data;
//                 const employeePhaseDataMap = new Map();

//                 if (employeeDataResponse.data.status === "success" && Array.isArray(allEmployeeData)) {
//                     allEmployeeData.filter(item => item.phase === phaseNumber).forEach(item => {
//                         employeePhaseDataMap.set(item.parameter_id, item);
//                     });
//                 }

//                 const loadedParameters = designationParameters.map(param => {
//                     const savedData = employeePhaseDataMap.get(param.parameter_id);
//                     const lmScore = savedData ? savedData.points_by_lm : "";
//                     const headScore = savedData ? savedData.points_by_head : "";
//                     const hrScore = savedData ? savedData.points_by_hr : "";
//                     const scores = [lmScore, headScore, hrScore].filter(s => s != null && s !== "").map(s => parseFloat(s));
//                     const average = scores.length > 0 ? (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1) : "0.0";
//                     return { id: param.parameter_id, name: param.para_name, lm: lmScore || "", head: headScore || "", hr: hrScore || "", average };
//                 });
//                 setParameters(loadedParameters);

//                 const firstRecord = employeePhaseDataMap.values().next().value;
//                 setComments({
//                     lineManager: firstRecord?.comment_by_lm || "",
//                     head: firstRecord?.comment_by_head || "",
//                     hr: firstRecord?.comment_by_hr || "",
//                 });

//                 if (firstRecord && firstRecord.points_by_hr != null && firstRecord.comment_by_hr) {
//                     setIsSaved(true);
//                 }
//             } catch (e) {
//                 setError("An error occurred while fetching performance data.");
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchPhaseData();
//     }, [user_id, designation_id]);
    
//     const handleChange = (id, field, value) => {
//         const updated = parameters.map((param) => {
//             if (param.id === id) {
//                 const newParam = { ...param, [field]: value };
//                 const scores = [newParam.lm, newParam.head, newParam.hr].map(s => parseFloat(s)).filter(s => !isNaN(s));
//                 const average = scores.length > 0 ? (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1) : "0.0";
//                 return { ...newParam, average };
//             }
//             return param;
//         });
//         setParameters(updated);
//     };

//     const handleCommentChange = (rater, value) => {
//         setComments((prev) => ({ ...prev, [rater]: value }));
//     };

//     const handleSave = async () => {
//         setIsSaving(true);
//         const role_id = localStorage.getItem('userRoleId');
//         const payload = {
//             role_id: parseInt(role_id, 10),
//             entries: parameters.map(param => ({
//                 emp_id: user_id,
//                 parameter_id: param.id,
//                 phase: 2,
//                 points_by_lm: param.lm ? parseInt(param.lm, 10) : null,
//                 comment_by_lm: comments.lineManager,
//                 points_by_head: param.head ? parseInt(param.head, 10) : null,
//                 comment_by_head: comments.head,
//                 points_by_hr: param.hr ? parseInt(param.hr, 10) : null,
//                 comment_by_hr: comments.hr,
//             }))
//         };
//         try {
//             await axiosInstance.post('apis/save_phasewise_data/', payload);
//             showAlert("success", "Success", "Phase 2 saved successfully!");
//             setIsSaved(true);
//         } catch (error) {
//             showAlert("error", "Error", "Error saving Phase 2 data. Please try again.");
//         } finally {
//             setIsSaving(false);
//         }
//     };

//     if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress /></Box>;
//     if (error) return <Alert severity="error" sx={{ m: 2 }}>{error}</Alert>;

//     return (
//         <Box>
//             <Typography variant="h6" gutterBottom align="center">Phase 2: Accelerate</Typography>
//             <Paper elevation={2} sx={{ mt: 2 }}>
//                 <Table>
//                     <TableHead><TableRow sx={{ backgroundColor: "#BDBDBD" }}><TableCell align="center"><strong>Sr No</strong></TableCell><TableCell align="center"><strong>Parameter</strong></TableCell><TableCell align="center"><strong>LM</strong></TableCell><TableCell align="center"><strong>Head</strong></TableCell><TableCell align="center"><strong>HR</strong></TableCell><TableCell align="center"><strong>Average</strong></TableCell></TableRow></TableHead>
//                     <TableBody>
//                         {parameters.map((row, index) => (
//                             <TableRow key={row.id}>
//                                 <TableCell align="center">{index + 1}</TableCell>
//                                 <TableCell align="center">{row.name}</TableCell>
//                                 <TableCell align="center"><TextField type="number" value={row.lm} onChange={(e) => handleChange(row.id, "lm", e.target.value)} inputProps={{ min: 0, max: 10 }} size="small" disabled /></TableCell>
//                                 <TableCell align="center"><TextField type="number" value={row.head} onChange={(e) => handleChange(row.id, "head", e.target.value)} inputProps={{ min: 0, max: 10 }} size="small" disabled /></TableCell>
//                                 <TableCell align="center"><TextField type="number" value={row.hr} onChange={(e) => handleChange(row.id, "hr", e.target.value)} inputProps={{ min: 0, max: 10 }} size="small" disabled={isSaved} /></TableCell>
//                                 <TableCell align="center">{row.average}</TableCell>
//                             </TableRow>
//                         ))}
//                     </TableBody>
//                 </Table>
//             </Paper>
//             <Card variant="outlined" sx={{ mt: 3 }}><CardHeader title="Phase Comments" /><CardContent><Grid container spacing={2}>
//                 <Grid item xs={12} md={4}><TextField label="Line Manager Comments" multiline rows={3} fullWidth value={comments.lineManager} onChange={(e) => handleCommentChange("lineManager", e.target.value)} disabled /></Grid>
//                 <Grid item xs={12} md={4}><TextField label="Head Comments" multiline rows={3} fullWidth value={comments.head} onChange={(e) => handleCommentChange("head", e.target.value)} disabled /></Grid>
//                 <Grid item xs={12} md={4}><TextField label="HR Comments" multiline rows={3} fullWidth value={comments.hr} onChange={(e) => handleCommentChange("hr", e.target.value)} disabled={isSaved} /></Grid>
//             </Grid></CardContent></Card>
//             <Box display="flex" justifyContent="center" mt={3}>
//                 <Button variant="contained" sx={{ backgroundColor: '#8C257C', '&:hover': { backgroundColor: '#6d1d60' } }} onClick={handleSave} disabled={isSaving || isSaved}>
//                     {isSaving ? <CircularProgress size={24} sx={{ color: 'white' }} /> : (isSaved ? "Saved" : "Save Phase 2")}
//                 </Button>
//             </Box>
//         </Box>
//     );
// };

// const Phase3 = ({ user_id, designation_id }) => {
//     const [parameters, setParameters] = useState([]);
//     const [comments, setComments] = useState({ lineManager: "", head: "", hr: "" });
//     const [isSaving, setIsSaving] = useState(false);
//     const [isSaved, setIsSaved] = useState(false);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchPhaseData = async () => {
//             if (!user_id || !designation_id) {
//                 setError("User ID or Designation ID is not provided.");
//                 setLoading(false);
//                 return;
//             }
//             try {
//                 setLoading(true);
//                 const phaseNumber = 3;
//                 const paramsResponse = await axiosInstance.get(`apis/get_desigwise_tabledata/?phase=${phaseNumber}&designation_id=${designation_id}`);
//                 const designationParameters = paramsResponse.data.data;

//                 if (!Array.isArray(designationParameters)) {
//                     setError("Failed to fetch parameters for this designation.");
//                     setLoading(false);
//                     return;
//                 }

//                 const employeeDataResponse = await axiosInstance.get(`apis/get_phasewise_data/${user_id}/`);
//                 const allEmployeeData = employeeDataResponse.data.data;
//                 const employeePhaseDataMap = new Map();

//                 if (employeeDataResponse.data.status === "success" && Array.isArray(allEmployeeData)) {
//                     allEmployeeData.filter(item => item.phase === phaseNumber).forEach(item => {
//                         employeePhaseDataMap.set(item.parameter_id, item);
//                     });
//                 }

//                 const loadedParameters = designationParameters.map(param => {
//                     const savedData = employeePhaseDataMap.get(param.parameter_id);
//                     const lmScore = savedData ? savedData.points_by_lm : "";
//                     const headScore = savedData ? savedData.points_by_head : "";
//                     const hrScore = savedData ? savedData.points_by_hr : "";
//                     const scores = [lmScore, headScore, hrScore].filter(s => s != null && s !== "").map(s => parseFloat(s));
//                     const average = scores.length > 0 ? (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1) : "0.0";
//                     return { id: param.parameter_id, name: param.para_name, lm: lmScore || "", head: headScore || "", hr: hrScore || "", average };
//                 });
//                 setParameters(loadedParameters);

//                 const firstRecord = employeePhaseDataMap.values().next().value;
//                 setComments({
//                     lineManager: firstRecord?.comment_by_lm || "",
//                     head: firstRecord?.comment_by_head || "",
//                     hr: firstRecord?.comment_by_hr || "",
//                 });

//                 if (firstRecord && firstRecord.points_by_hr != null && firstRecord.comment_by_hr) {
//                     setIsSaved(true);
//                 }
//             } catch (e) {
//                 setError("An error occurred while fetching performance data.");
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchPhaseData();
//     }, [user_id, designation_id]);
    
//     const handleChange = (id, field, value) => {
//         const updated = parameters.map((param) => {
//             if (param.id === id) {
//                 const newParam = { ...param, [field]: value };
//                 const scores = [newParam.lm, newParam.head, newParam.hr].map(s => parseFloat(s)).filter(s => !isNaN(s));
//                 const average = scores.length > 0 ? (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1) : "0.0";
//                 return { ...newParam, average };
//             }
//             return param;
//         });
//         setParameters(updated);
//     };

//     const handleCommentChange = (rater, value) => {
//         setComments((prev) => ({ ...prev, [rater]: value }));
//     };

//     const handleSave = async () => {
//         setIsSaving(true);
//         const role_id = localStorage.getItem('userRoleId');
//         const payload = {
//             role_id: parseInt(role_id, 10),
//             entries: parameters.map(param => ({
//                 emp_id: user_id,
//                 parameter_id: param.id,
//                 phase: 3,
//                 points_by_lm: param.lm ? parseInt(param.lm, 10) : null,
//                 comment_by_lm: comments.lineManager,
//                 points_by_head: param.head ? parseInt(param.head, 10) : null,
//                 comment_by_head: comments.head,
//                 points_by_hr: param.hr ? parseInt(param.hr, 10) : null,
//                 comment_by_hr: comments.hr,
//             }))
//         };
//         try {
//             await axiosInstance.post('apis/save_phasewise_data/', payload);
//             showAlert("success", "Success", "Phase 3 saved successfully!");
//             setIsSaved(true);
//         } catch (error) {
//             showAlert("error", "Error", "Error saving Phase 3 data. Please try again.");
//         } finally {
//             setIsSaving(false);
//         }
//     };

//     if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress /></Box>;
//     if (error) return <Alert severity="error" sx={{ m: 2 }}>{error}</Alert>;

//     return (
//         <Box>
//             <Typography variant="h6" gutterBottom align="center">Phase 3: Achieve</Typography>
//             <Paper elevation={2} sx={{ mt: 2 }}>
//                 <Table>
//                     <TableHead><TableRow sx={{ backgroundColor: "#BDBDBD" }}><TableCell align="center"><strong>Sr No</strong></TableCell><TableCell align="center"><strong>Parameter</strong></TableCell><TableCell align="center"><strong>LM</strong></TableCell><TableCell align="center"><strong>Head</strong></TableCell><TableCell align="center"><strong>HR</strong></TableCell><TableCell align="center"><strong>Average</strong></TableCell></TableRow></TableHead>
//                     <TableBody>
//                         {parameters.map((row, index) => (
//                             <TableRow key={row.id}>
//                                 <TableCell align="center">{index + 1}</TableCell>
//                                 <TableCell align="center">{row.name}</TableCell>
//                                 <TableCell align="center"><TextField type="number" value={row.lm} onChange={(e) => handleChange(row.id, "lm", e.target.value)} inputProps={{ min: 0, max: 10 }} size="small" disabled /></TableCell>
//                                 <TableCell align="center"><TextField type="number" value={row.head} onChange={(e) => handleChange(row.id, "head", e.target.value)} inputProps={{ min: 0, max: 10 }} size="small" disabled /></TableCell>
//                                 <TableCell align="center"><TextField type="number" value={row.hr} onChange={(e) => handleChange(row.id, "hr", e.target.value)} inputProps={{ min: 0, max: 10 }} size="small" disabled={isSaved} /></TableCell>
//                                 <TableCell align="center">{row.average}</TableCell>
//                             </TableRow>
//                         ))}
//                     </TableBody>
//                 </Table>
//             </Paper>
//             <Card variant="outlined" sx={{ mt: 3 }}><CardHeader title="Phase Comments" /><CardContent><Grid container spacing={2}>
//                 <Grid item xs={12} md={4}><TextField label="Line Manager Comments" multiline rows={3} fullWidth value={comments.lineManager} onChange={(e) => handleCommentChange("lineManager", e.target.value)} disabled /></Grid>
//                 <Grid item xs={12} md={4}><TextField label="Head Comments" multiline rows={3} fullWidth value={comments.head} onChange={(e) => handleCommentChange("head", e.target.value)} disabled /></Grid>
//                 <Grid item xs={12} md={4}><TextField label="HR Comments" multiline rows={3} fullWidth value={comments.hr} onChange={(e) => handleCommentChange("hr", e.target.value)} disabled={isSaved} /></Grid>
//             </Grid></CardContent></Card>
//             <Box display="flex" justifyContent="center" mt={3}>
//                 <Button variant="contained" sx={{ backgroundColor: '#8C257C', '&:hover': { backgroundColor: '#6d1d60' } }} onClick={handleSave} disabled={isSaving || isSaved}>
//                     {isSaving ? <CircularProgress size={24} sx={{ color: 'white' }} /> : (isSaved ? "Saved" : "Save Phase 3")}
//                 </Button>
//             </Box>
//         </Box>
//     );
// };

// const Phase4 = ({ user_id, designation_id }) => {
//     const [parameters, setParameters] = useState([]);
//     const [comments, setComments] = useState({ lineManager: "", head: "", hr: "" });
//     const [isSaving, setIsSaving] = useState(false);
//     const [isSaved, setIsSaved] = useState(false);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchPhaseData = async () => {
//             if (!user_id || !designation_id) {
//                 setError("User ID or Designation ID is not provided.");
//                 setLoading(false);
//                 return;
//             }
//             try {
//                 setLoading(true);
//                 const phaseNumber = 4;
//                 const paramsResponse = await axiosInstance.get(`apis/get_desigwise_tabledata/?phase=${phaseNumber}&designation_id=${designation_id}`);
//                 const designationParameters = paramsResponse.data.data;

//                 if (!Array.isArray(designationParameters)) {
//                     setError("Failed to fetch parameters for this designation.");
//                     setLoading(false);
//                     return;
//                 }

//                 const employeeDataResponse = await axiosInstance.get(`apis/get_phasewise_data/${user_id}/`);
//                 const allEmployeeData = employeeDataResponse.data.data;
//                 const employeePhaseDataMap = new Map();

//                 if (employeeDataResponse.data.status === "success" && Array.isArray(allEmployeeData)) {
//                     allEmployeeData.filter(item => item.phase === phaseNumber).forEach(item => {
//                         employeePhaseDataMap.set(item.parameter_id, item);
//                     });
//                 }

//                 const loadedParameters = designationParameters.map(param => {
//                     const savedData = employeePhaseDataMap.get(param.parameter_id);
//                     const lmScore = savedData ? savedData.points_by_lm : "";
//                     const headScore = savedData ? savedData.points_by_head : "";
//                     const hrScore = savedData ? savedData.points_by_hr : "";
//                     const scores = [lmScore, headScore, hrScore].filter(s => s != null && s !== "").map(s => parseFloat(s));
//                     const average = scores.length > 0 ? (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1) : "0.0";
//                     return { id: param.parameter_id, name: param.para_name, lm: lmScore || "", head: headScore || "", hr: hrScore || "", average };
//                 });
//                 setParameters(loadedParameters);

//                 const firstRecord = employeePhaseDataMap.values().next().value;
//                 setComments({
//                     lineManager: firstRecord?.comment_by_lm || "",
//                     head: firstRecord?.comment_by_head || "",
//                     hr: firstRecord?.comment_by_hr || "",
//                 });

//                 if (firstRecord && firstRecord.points_by_hr != null && firstRecord.comment_by_hr) {
//                     setIsSaved(true);
//                 }
//             } catch (e) {
//                 setError("An error occurred while fetching performance data.");
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchPhaseData();
//     }, [user_id, designation_id]);
    
//     const handleChange = (id, field, value) => {
//         const updated = parameters.map((param) => {
//             if (param.id === id) {
//                 const newParam = { ...param, [field]: value };
//                 const scores = [newParam.lm, newParam.head, newParam.hr].map(s => parseFloat(s)).filter(s => !isNaN(s));
//                 const average = scores.length > 0 ? (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1) : "0.0";
//                 return { ...newParam, average };
//             }
//             return param;
//         });
//         setParameters(updated);
//     };

//     const handleCommentChange = (rater, value) => {
//         setComments((prev) => ({ ...prev, [rater]: value }));
//     };

//     const handleSave = async () => {
//         setIsSaving(true);
//         const role_id = localStorage.getItem('userRoleId');
//         const payload = {
//             role_id: parseInt(role_id, 10),
//             entries: parameters.map(param => ({
//                 emp_id: user_id,
//                 parameter_id: param.id,
//                 phase: 4,
//                 points_by_lm: param.lm ? parseInt(param.lm, 10) : null,
//                 comment_by_lm: comments.lineManager,
//                 points_by_head: param.head ? parseInt(param.head, 10) : null,
//                 comment_by_head: comments.head,
//                 points_by_hr: param.hr ? parseInt(param.hr, 10) : null,
//                 comment_by_hr: comments.hr,
//             }))
//         };
//         try {
//             await axiosInstance.post('apis/save_phasewise_data/', payload);
//             showAlert("success", "Success", "Phase 4 saved successfully!");
//             setIsSaved(true);
//         } catch (error) {
//             showAlert("error", "Error", "Error saving Phase 4 data. Please try again.");
//         } finally {
//             setIsSaving(false);
//         }
//     };

//     if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress /></Box>;
//     if (error) return <Alert severity="error" sx={{ m: 2 }}>{error}</Alert>;

//     return (
//         <Box>
//             <Typography variant="h6" gutterBottom align="center">Phase 4: Aspire</Typography>
//             <Paper elevation={2} sx={{ mt: 2 }}>
//                 <Table>
//                     <TableHead><TableRow sx={{ backgroundColor: "#BDBDBD" }}><TableCell align="center"><strong>Sr No</strong></TableCell><TableCell align="center"><strong>Parameter</strong></TableCell><TableCell align="center"><strong>LM</strong></TableCell><TableCell align="center"><strong>Head</strong></TableCell><TableCell align="center"><strong>HR</strong></TableCell><TableCell align="center"><strong>Average</strong></TableCell></TableRow></TableHead>
//                     <TableBody>
//                         {parameters.map((row, index) => (
//                             <TableRow key={row.id}>
//                                 <TableCell align="center">{index + 1}</TableCell>
//                                 <TableCell align="center">{row.name}</TableCell>
//                                 <TableCell align="center"><TextField type="number" value={row.lm} onChange={(e) => handleChange(row.id, "lm", e.target.value)} inputProps={{ min: 0, max: 10 }} size="small" disabled /></TableCell>
//                                 <TableCell align="center"><TextField type="number" value={row.head} onChange={(e) => handleChange(row.id, "head", e.target.value)} inputProps={{ min: 0, max: 10 }} size="small" disabled /></TableCell>
//                                 <TableCell align="center"><TextField type="number" value={row.hr} onChange={(e) => handleChange(row.id, "hr", e.target.value)} inputProps={{ min: 0, max: 10 }} size="small" disabled={isSaved} /></TableCell>
//                                 <TableCell align="center">{row.average}</TableCell>
//                             </TableRow>
//                         ))}
//                     </TableBody>
//                 </Table>
//             </Paper>
//             <Card variant="outlined" sx={{ mt: 3 }}><CardHeader title="Phase Comments" /><CardContent><Grid container spacing={2}>
//                 <Grid item xs={12} md={4}><TextField label="Line Manager Comments" multiline rows={3} fullWidth value={comments.lineManager} onChange={(e) => handleCommentChange("lineManager", e.target.value)} disabled /></Grid>
//                 <Grid item xs={12} md={4}><TextField label="Head Comments" multiline rows={3} fullWidth value={comments.head} onChange={(e) => handleCommentChange("head", e.target.value)} disabled /></Grid>
//                 <Grid item xs={12} md={4}><TextField label="HR Comments" multiline rows={3} fullWidth value={comments.hr} onChange={(e) => handleCommentChange("hr", e.target.value)} disabled={isSaved} /></Grid>
//             </Grid></CardContent></Card>
//             <Box display="flex" justifyContent="center" mt={3}>
//                 <Button variant="contained" sx={{ backgroundColor: '#8C257C', '&:hover': { backgroundColor: '#6d1d60' } }} onClick={handleSave} disabled={isSaving || isSaved}>
//                     {isSaving ? <CircularProgress size={24} sx={{ color: 'white' }} /> : (isSaved ? "Saved" : "Save Phase 4")}
//                 </Button>
//             </Box>
//         </Box>
//     );
// };

// const OverallAnalysis = ({ userId, employeeVId }) => {
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [isSaving, setIsSaving] = useState(false);
//     const [isOverallSaved, setIsOverallSaved] = useState(false);
//     const [allPhaseComments, setAllPhaseComments] = useState([]);
//     const [overallComments, setOverallComments] = useState({ hr: "" });
//     const [kpiData, setKpiData] = useState([
//         { kpi: "A", target: 1, ach: 1, rating: 5 }, { kpi: "B", target: 2, ach: 5, rating: 7 }, { kpi: "C", target: 3, ach: 6, rating: 9 },
//     ]);
//     const [kraData, setKraData] = useState([
//         { parameter: "HADC", totalRating: 10 }, { parameter: "QCP", totalRating: 10 },
//     ]);
//     const [phaseWiseData, setPhaseWiseData] = useState(null);

//     useEffect(() => {
//         const fetchAllData = async () => {
//             if (!userId) {
//                 setError("User ID not found.");
//                 setLoading(false);
//                 return;
//             }
//             setLoading(true);
//             try {
//                 const [phaseWiseResponse, allCommentsResponse] = await Promise.all([
//                     axiosInstance.get(`apis/get_employee_overall_phasewise/?user_id=${userId}`),
//                     axiosInstance.get(`apis/get_phasewise_data/${userId}/`)
//                 ]);

//                 if (phaseWiseResponse.data.status === "success") {
//                     const data = phaseWiseResponse.data.data;
//                     setPhaseWiseData(data);
//                     setOverallComments({ hr: data.final_hr_comment || "" });
//                     if (data.final_hr_comment && data.final_hr_comment !== "No comment.") {
//                         setIsOverallSaved(true);
//                     }
//                 } else {
//                     throw new Error("Failed to fetch phase data.");
//                 }

//                 if (allCommentsResponse.data.status === "success" && Array.isArray(allCommentsResponse.data.data)) {
//                     const comments = [1, 2, 3, 4].map(phaseNum => {
//                         const phaseData = allCommentsResponse.data.data.find(item => item.phase === phaseNum);
//                         return { phase: `Phase ${phaseNum}`, lm: phaseData?.comment_by_lm || "N/A", head: phaseData?.comment_by_head || "N/A", hr: phaseData?.comment_by_hr || "N/A" };
//                     });
//                     setAllPhaseComments(comments);
//                 }
//             } catch (error) {
//                 setError("Could not load performance data.");
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchAllData();
//     }, [userId]);
    
//     const handleKpiChange = (index, field, value) => {
//         const newData = [...kpiData];
//         newData[index][field] = ["target", "ach", "rating"].includes(field) ? Number(value) : value;
//         setKpiData(newData);
//     };

//     const handleKraChange = (index, field, value) => {
//         const newData = [...kraData];
//         newData[index][field] = field === "totalRating" ? Number(value) : value;
//         setKraData(newData);
//     };

//     const handleOverallCommentChange = (rater, value) => {
//         setOverallComments(prev => ({ ...prev, [rater]: value }));
//     };

//     const handleSave = async () => {
//         setIsSaving(true);
//         try {
//             const kpiRatings = kpiData.map((item) => Number(item.rating) || 0);
//             const kraRatings = kraData.map((item) => Number(item.totalRating) || 0);
//             const allKpiKraRatings = [...kpiRatings, ...kraRatings].filter((r) => r > 0);
//             const kpiKraAverage = allKpiKraRatings.length > 0 ? (allKpiKraRatings.reduce((sum, r) => sum + r, 0) / allKpiKraRatings.length).toFixed(1) : "0.0";

//             let value4AEE = 0;
//             if (phaseWiseData) {
//                 const scoreKeys = ['phase1_lm', 'phase2_lm', 'phase3_lm', 'phase4_lm', 'phase1_head', 'phase2_head', 'phase3_head', 'phase4_head', 'phase1_hr', 'phase2_hr', 'phase3_hr', 'phase4_hr'];
//                 const totalApiScore = scoreKeys.reduce((sum, key) => sum + (phaseWiseData[key] || 0), 0);
//                 value4AEE = (totalApiScore / (12 * 40)) * 10;
//             }

//             const finalAverage = ((value4AEE + parseFloat(kpiKraAverage)) / 2).toFixed(1);
//             const achievementPercentage = (parseFloat(finalAverage) * 10).toFixed(0);

//             const payload = {
//                 user_id: userId,
//                 emp_id: employeeVId,
//                 performance_analysis: overallComments.hr || "No detailed comments provided.",
//                 kra_kpi_total: kpiKraAverage,
//                 average: finalAverage,
//                 percent_achievement: achievementPercentage,
//                 comment_by_lm: "No comment.",
//                 comment_by_hr: overallComments.hr || "No comment.",
//                 comment_by_head: "No comment."
//             };

//             await axiosInstance.post("apis/save_employee_overall_analysis/", payload);
//             showAlert("success", "Success!", "Overall analysis saved successfully!");
//             setIsOverallSaved(true);
//         } catch (error) {
//             const errorMessage = error.response?.data?.message || "An error occurred while saving.";
//             showAlert("error", "Error!", errorMessage);
//         } finally {
//             setIsSaving(false);
//         }
//     };
    
//     if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress /></Box>;
//     if (error) return <Alert severity="error" sx={{ m: 2 }}>{error}</Alert>;

//     const phaseKeys = ["phase1", "phase2", "phase3", "phase4"];
//     const kpiRatings = kpiData.map((item) => Number(item.rating) || 0);
//     const kraRatings = kraData.map((item) => Number(item.totalRating) || 0);
//     const allKpiKraRatings = [...kpiRatings, ...kraRatings].filter((r) => r > 0);
//     const kpiKraAverage = allKpiKraRatings.length > 0 ? (allKpiKraRatings.reduce((sum, r) => sum + r, 0) / allKpiKraRatings.length).toFixed(1) : "0.0";
//     const textFieldStyles = { padding: '2px 4px', '& .MuiInput-underline:before': { borderBottom: 'none' }, '& .MuiInput-underline:hover:not(.Mui-disabled):before': { borderBottom: 'none' }, '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)', borderRadius: '4px' }, };
//     let value4AEE = 0, percent4AEE = 0;
//     if (phaseWiseData) {
//         const scoreKeys = ['phase1_lm', 'phase2_lm', 'phase3_lm', 'phase4_lm', 'phase1_head', 'phase2_head', 'phase3_head', 'phase4_head', 'phase1_hr', 'phase2_hr', 'phase3_hr', 'phase4_hr'];
//         const totalApiScore = scoreKeys.reduce((sum, key) => sum + (phaseWiseData[key] || 0), 0);
//         value4AEE = (totalApiScore / 480) * 10;
//         percent4AEE = (totalApiScore / 480) * 100;
//     }
//     const valueKpiKra = parseFloat(kpiKraAverage);
//     const percentKpiKra = valueKpiKra * 10;
//     const totalValue = (value4AEE + valueKpiKra) / 2;
//     const percentTotal = totalValue * 10;
//     const lmTotal = phaseWiseData ? (phaseWiseData.phase1_lm || 0) + (phaseWiseData.phase2_lm || 0) + (phaseWiseData.phase3_lm || 0) + (phaseWiseData.phase4_lm || 0) : 0;
//     const headTotal = phaseWiseData ? (phaseWiseData.phase1_head || 0) + (phaseWiseData.phase2_head || 0) + (phaseWiseData.phase3_head || 0) + (phaseWiseData.phase4_head || 0) : 0;
//     const hrTotal = phaseWiseData ? (phaseWiseData.phase1_hr || 0) + (phaseWiseData.phase2_hr || 0) + (phaseWiseData.phase3_hr || 0) + (phaseWiseData.phase4_hr || 0) : 0;
//     const grandTotal = lmTotal + headTotal + hrTotal;

//     return (
//         <Box>
//             <Typography variant="h5" sx={{ mb: 3, color: "primary.main", fontWeight: "bold" }}>Performance Analysis Summary</Typography>
//             <Grid container spacing={3}>
//                 <Grid item xs={12}><Card><CardHeader title="Phase-wise Performance" /><CardContent><TableContainer><Table size="small">
//                     <TableHead><TableRow><TableCell sx={{ fontWeight: "bold" }}>Phase</TableCell><TableCell sx={{ fontWeight: "bold" }} align="right">Line Manager</TableCell><TableCell sx={{ fontWeight: "bold" }} align="right">Head</TableCell><TableCell sx={{ fontWeight: "bold" }} align="right">HR</TableCell><TableCell sx={{ fontWeight: "bold" }} align="right">Total</TableCell></TableRow></TableHead>
//                     <TableBody>
//                         {phaseWiseData && phaseKeys.map((p, i) => (<TableRow key={p}><TableCell>{["Align (P1)", "Accelerate (P2)", "Achieve (P3)", "Aspire (P4)"][i]}</TableCell><TableCell align="right">{(phaseWiseData[`phase${i + 1}_lm`] || 0).toFixed(1)}</TableCell><TableCell align="right">{(phaseWiseData[`phase${i + 1}_head`] || 0).toFixed(1)}</TableCell><TableCell align="right">{(phaseWiseData[`phase${i + 1}_hr`] || 0).toFixed(1)}</TableCell><TableCell align="right">{((phaseWiseData[`phase${i + 1}_lm`] || 0) + (phaseWiseData[`phase${i + 1}_head`] || 0) + (phaseWiseData[`phase${i + 1}_hr`] || 0)).toFixed(1)}</TableCell></TableRow>))}
//                         <TableRow sx={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}><TableCell sx={{ fontWeight: "bold" }}>Total</TableCell><TableCell sx={{ fontWeight: "bold" }} align="right">{lmTotal.toFixed(1)}</TableCell><TableCell sx={{ fontWeight: "bold" }} align="right">{headTotal.toFixed(1)}</TableCell><TableCell sx={{ fontWeight: "bold" }} align="right">{hrTotal.toFixed(1)}</TableCell><TableCell sx={{ fontWeight: "bold" }} align="right">{grandTotal.toFixed(1)}</TableCell></TableRow>
//                     </TableBody>
//                 </Table></TableContainer></CardContent></Card></Grid>
//                 <Grid item xs={12} sm={6}><Card><CardHeader title="KPI" /><CardContent><TableContainer><Table size="small">
//                     <TableHead><TableRow><TableCell sx={{ fontWeight: "bold" }}>KPI</TableCell><TableCell sx={{ fontWeight: "bold", textAlign: 'center' }}>Target</TableCell><TableCell sx={{ fontWeight: "bold", textAlign: 'center' }}>Ach</TableCell><TableCell sx={{ fontWeight: "bold", textAlign: 'center' }}>Rating</TableCell></TableRow></TableHead>
//                     <TableBody>{kpiData.map((row, i) => (<TableRow key={i}><TableCell sx={{ p: 0.5 }}><TextField fullWidth size="small" variant="standard" value={row.kpi} onChange={(e) => handleKpiChange(i, "kpi", e.target.value)} sx={textFieldStyles} disabled={isOverallSaved} /></TableCell><TableCell sx={{ p: 0.5 }}><TextField fullWidth size="small" variant="standard" type="number" value={row.target} onChange={(e) => handleKpiChange(i, "target", e.target.value)} sx={textFieldStyles} disabled={isOverallSaved} /></TableCell><TableCell sx={{ p: 0.5 }}><TextField fullWidth size="small" variant="standard" type="number" value={row.ach} onChange={(e) => handleKpiChange(i, "ach", e.target.value)} sx={textFieldStyles} disabled={isOverallSaved} /></TableCell><TableCell sx={{ p: 0.5 }}><TextField fullWidth size="small" variant="standard" type="number" value={row.rating} onChange={(e) => handleKpiChange(i, "rating", e.target.value)} sx={textFieldStyles} disabled={isOverallSaved} /></TableCell></TableRow>))}</TableBody>
//                 </Table></TableContainer></CardContent></Card></Grid>
//                 <Grid item xs={12} sm={6}><Card><CardHeader title="KRA" /><CardContent><TableContainer><Table size="small">
//                     <TableHead><TableRow><TableCell sx={{ fontWeight: "bold" }}>KRA Parameter</TableCell><TableCell sx={{ fontWeight: "bold", textAlign: 'center' }}>Total Rating</TableCell></TableRow></TableHead>
//                     <TableBody>{kraData.map((row, i) => (<TableRow key={i}><TableCell sx={{ p: 0.5 }}><TextField fullWidth size="small" variant="standard" value={row.parameter} onChange={(e) => handleKraChange(i, "parameter", e.target.value)} sx={textFieldStyles} disabled={isOverallSaved} /></TableCell><TableCell sx={{ p: 0.5 }}><TextField fullWidth size="small" variant="standard" type="number" value={row.totalRating} onChange={(e) => handleKraChange(i, "totalRating", e.target.value)} sx={textFieldStyles} disabled={isOverallSaved} /></TableCell></TableRow>))}</TableBody>
//                 </Table></TableContainer></CardContent></Card></Grid>
//                 <Grid item xs={12} sx={{ mt: 2 }}><Card><CardHeader title="All Total" /><CardContent><TableContainer><Table>
//                     <TableHead><TableRow><TableCell sx={{ fontWeight: "bold" }}>4AEE Program</TableCell><TableCell sx={{ fontWeight: "bold" }}>Ach %</TableCell><TableCell sx={{ fontWeight: "bold" }}>KRA/KPI</TableCell><TableCell sx={{ fontWeight: "bold" }}>Ach %</TableCell><TableCell sx={{ fontWeight: "bold" }}>Total</TableCell><TableCell sx={{ fontWeight: "bold" }}>Ach %</TableCell></TableRow></TableHead>
//                     <TableBody><TableRow sx={{ fontWeight: "bold" }}><TableCell>{value4AEE.toFixed(1)}</TableCell><TableCell>{percent4AEE.toFixed(0)}%</TableCell><TableCell>{valueKpiKra.toFixed(1)}</TableCell><TableCell>{percentKpiKra.toFixed(0)}%</TableCell><TableCell sx={{ fontWeight: "bold" }}>{totalValue.toFixed(1)}</TableCell><TableCell sx={{ fontWeight: "bold" }}>{percentTotal.toFixed(0)}%</TableCell></TableRow></TableBody>
//                 </Table></TableContainer></CardContent></Card></Grid>
//                 <Grid item xs={12} sx={{ mt: 2 }}><Card><CardHeader title="All Phases Comments" /><CardContent><TableContainer><Table>
//                     <TableHead><TableRow><TableCell sx={{ fontWeight: "bold" }}>Phases</TableCell><TableCell sx={{ fontWeight: "bold" }}>Line Manager</TableCell><TableCell sx={{ fontWeight: "bold" }}>Head</TableCell><TableCell sx={{ fontWeight: "bold" }}>HR</TableCell></TableRow></TableHead>
//                     <TableBody>{allPhaseComments.map((row, i) => (<TableRow key={i}><TableCell>{row.phase}</TableCell><TableCell>{row.lm}</TableCell><TableCell>{row.head}</TableCell><TableCell>{row.hr}</TableCell></TableRow>))}</TableBody>
//                 </Table></TableContainer></CardContent></Card></Grid>
//             </Grid>
//             <Box display="flex" justifyContent="center" mt={3}>
//                 <Button variant="contained" sx={{ backgroundColor: '#8C257C', '&:hover': { backgroundColor: '#6d1d60' } }} onClick={handleSave} disabled={isSaving || isOverallSaved}>
//                     {isSaving ? <CircularProgress size={24} sx={{color: 'white'}} /> : (isOverallSaved ? "Saved" : "Save Overall Analysis")}
//                 </Button>
//             </Box>
//         </Box>
//     );
// };

// export const MarksHR = () => {
//     const { id } = useParams();
//     const navigate = useNavigate();
//     const [activeTab, setActiveTab] = useState(0);
//     const location = useLocation();
//     const { user_id, emp_id, designation_id } = location.state || {};

//     const handleTabChange = (event, newValue) => {
//         setActiveTab(newValue);
//     };

//     const renderTabContent = () => {
//         const props = { user_id: user_id, userId: user_id, employeeVId: emp_id, designation_id: designation_id };
//         switch (activeTab) {
//             case 0: return <Phase1 {...props} />;
//             case 1: return <Phase2 {...props} />;
//             case 2: return <Phase3 {...props} />;
//             case 3: return <Phase4 {...props} />;
//             case 4: return <OverallAnalysis {...props} />;
//             default: return null;
//         }
//     };

//     return (
//         <Box sx={{ backgroundColor: "#fafafa", minHeight: "100vh" }}>
//             <AppBar position="static" sx={{ backgroundColor: "#8C257C", color: "#FFFFFF" }}>
//                 <Toolbar>
//                     <IconButton edge="start" color="inherit" onClick={() => navigate("/hrms/dashboardhr/confirmation")} sx={{ mr: 2 }} >
//                         <ArrowBackIcon />
//                     </IconButton>
//                     <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 600 }}>
//                         Employee Performance - ID: {id}
//                     </Typography>
//                 </Toolbar>
//             </AppBar>
//             <Box sx={{ borderBottom: 1, borderColor: "divider", bgcolor: "#f5f5f5", p: 2 }}>
//                 <Paper elevation={2} sx={{ borderRadius: 2 }}>
//                     <Tabs value={activeTab} onChange={handleTabChange} textColor="primary" indicatorColor="primary" centered>
//                         <Tab label="Phase 1" sx={{ fontWeight: 600 }} />
//                         <Tab label="Phase 2" sx={{ fontWeight: 600 }} />
//                         <Tab label="Phase 3" sx={{ fontWeight: 600 }} />
//                         <Tab label="Phase 4" sx={{ fontWeight: 600 }} />
//                         <Tab label="Overall Analysis" sx={{ fontWeight: 600 }} />
//                     </Tabs>
//                 </Paper>
//             </Box>
//             <Box px={3} pb={4} pt={2}>
//                 {renderTabContent()}
//             </Box>
//         </Box>
//     );
// };

// const StyledArrowButton = styled(IconButton)(({ theme }) => ({
//     color: "#616161",
//     transition: "color 0.3s",
//     "&:hover": { color: "#8C257C" },
// }));

// export const PerformanceTableHR = () => {
//     const navigate = useNavigate();
//     const theme = useTheme();
//     const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

//     const [data, setData] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [hoveredRowId, setHoveredRowId] = useState(null);
//     const [searchTerm, setSearchTerm] = useState("");
//     const [page, setPage] = useState(0);
//     const [rowsPerPage, setRowsPerPage] = useState(5);

//     useEffect(() => {
//         const fetchPerformanceData = async () => {
//             setLoading(true);
//             const role_id = localStorage.getItem('userRoleId');
//             const user_id = localStorage.getItem('loggedInEmpId');
//             if (!role_id || !user_id) {
//                 setError("User role or ID not found. Please log in again.");
//                 setLoading(false);
//                 return;
//             }
//             try {
//                 const response = await axiosInstance.get(`apis/get_employee_performance/${role_id}/${user_id}/`);
//                 const transformedData = response.data.map(item => ({
//                     id: item.user_id, empId: item.emp_id, employee: item.full_name, designation: item.designation_name, designation_id: item.designation_id,
//                     doj: item.date_of_joining, lm: item.manager_name, phase1: item.phase_one_points, phase2: item.phase_two_points, phase3: item.phase_three_points,
//                     phase4: item.phase_four_points, overall: item.performance_analysis, score: item.avg_score, apiStatus: item.employee_status,
//                 }));
//                 setData(transformedData);
//                 setError(null);
//             } catch (e) {
//                 setError(e.message);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchPerformanceData();
//     }, []);

//     const handleNavigate = (row) => {
//         navigate(`/hrms/dashboardhr/marks/${row.id}`, {
//             state: { user_id: row.id, emp_id: row.empId, designation_id: row.designation_id },
//         });
//     };

//     const renderBoxedCell = (value, isPercentage = false) => (
//         <Box sx={{ px: 1, py: 0.5, border: "1px solid #ccc", borderRadius: 1, minWidth: 40, textAlign: "center" }}>
//             {value != null ? `${value}${isPercentage ? '%' : ''}` : "-"}
//         </Box>
//     );

//     const filteredData = data.filter(item =>
//         item.employee.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         item.designation.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         item.lm.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     const paginatedData = filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

//     if (error) {
//         return <Box component={Paper} p={3}><Alert severity="error">Error: {error}</Alert></Box>;
//     }
    
//     return (
//         <Box component={Paper} p={3}>
//             <Typography variant="h4" sx={{ color: "#8C257C", fontWeight: "bold", mb: 5 }}>
//                 Performance Table
//             </Typography>

//             <Box sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', alignItems: 'center', mb: 2, gap: 2 }}>
//                 <Box></Box> 
//                 <TextField
//                     size="small"
//                     placeholder="Search ..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment> }}
//                     sx={{ width: isMobile ? '100%' : 'auto' }}
//                 />
//             </Box>

//             <TableContainer sx={{ minWidth: '100%', whiteSpace: 'nowrap' }}>
//                 <Table>
//                     <TableHead sx={{ backgroundColor: "#8C257C" }}>
//                         <TableRow>
//                             {["Sr No", "Employee", "Designation", "DOJ", "LM", "P1", "P2", "P3", "P4", "Overall", "Score"].map(h => (
//                                 <TableCell key={h} align="center" sx={{ fontWeight: 'bold', color: 'white' }}>{h}</TableCell>
//                             ))}
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {loading ? (
//                             Array.from(new Array(rowsPerPage)).map((_, index) => (
//                                 <TableRow key={index}>
//                                     <TableCell align="center"><Skeleton variant="text" /></TableCell>
//                                     <TableCell align="center"><Skeleton variant="text" /></TableCell>
//                                     <TableCell align="center"><Skeleton variant="text" /></TableCell>
//                                     <TableCell align="center"><Skeleton variant="text" /></TableCell>
//                                     <TableCell align="center"><Skeleton variant="text" /></TableCell>
//                                     <TableCell align="center"><Skeleton variant="rectangular" width={40} height={20} /></TableCell>
//                                     <TableCell align="center"><Skeleton variant="rectangular" width={40} height={20} /></TableCell>
//                                     <TableCell align="center"><Skeleton variant="rectangular" width={40} height={20} /></TableCell>
//                                     <TableCell align="center"><Skeleton variant="rectangular" width={40} height={20} /></TableCell>
//                                     <TableCell align="center"><Skeleton variant="rectangular" width={40} height={20} /></TableCell>
//                                     <TableCell align="center"><Skeleton variant="rectangular" width={40} height={20} /></TableCell>
//                                 </TableRow>
//                             ))
//                         ) : (
//                             paginatedData.map((row, index) => (
//                                 <TableRow key={row.id} hover onMouseEnter={() => setHoveredRowId(row.id)} onMouseLeave={() => setHoveredRowId(null)}>
//                                     <TableCell align="center">{page * rowsPerPage + index + 1}</TableCell>
//                                     <TableCell align="center">
//                                         <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//                                             <Typography variant="body2" component="span" sx={{ mr: 1 }}>{row.employee}</Typography>
//                                             <StyledArrowButton onClick={() => handleNavigate(row)} size="small" sx={{ visibility: hoveredRowId === row.id ? 'visible' : 'hidden' }}>
//                                                 <ArrowForwardIcon fontSize="small" />
//                                             </StyledArrowButton>
//                                         </Box>
//                                     </TableCell>
//                                     <TableCell align="center" sx={{fontSize: '0.95rem'}}>{row.designation}</TableCell>
//                                     <TableCell align="center" sx={{fontSize: '0.95rem'}}>{row.doj}</TableCell>
//                                     <TableCell align="center" sx={{fontSize: '0.95rem'}}>{row.lm}</TableCell>
//                                     <TableCell align="center">{renderBoxedCell(row.phase1)}</TableCell>
//                                     <TableCell align="center">{renderBoxedCell(row.phase2)}</TableCell>
//                                     <TableCell align="center">{renderBoxedCell(row.phase3)}</TableCell>
//                                     <TableCell align="center">{renderBoxedCell(row.phase4)}</TableCell>
//                                     <TableCell align="center">{renderBoxedCell(row.overall, true)}</TableCell>
//                                     <TableCell align="center">{renderBoxedCell(row.score)}</TableCell>
//                                 </TableRow>
//                             ))
//                         )}
//                     </TableBody>
//                 </Table>
//             </TableContainer>

//             <TablePagination
//                 rowsPerPageOptions={[5, 10, 15, 25]}
//                 component="div"
//                 count={filteredData.length}
//                 rowsPerPage={rowsPerPage}
//                 page={page}
//                 onPageChange={(event, newPage) => setPage(newPage)}
//                 onRowsPerPageChange={(event) => { setRowsPerPage(parseInt(event.target.value, 10)); setPage(0); }}
//                 sx={{
//                     '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': {
//                         color: 'text.secondary',
//                         fontSize: '0.875rem'
//                     },
//                     '& .MuiSvgIcon-root': {
//                         color: '#8C257C'
//                     }
//                 }}
//             />
//         </Box>
//     );
// };

// export default PerformanceTableHR;





import React, { useState, useEffect } from "react";
import {
    Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper,
    Button, IconButton, Typography,
    Box, TextField, CircularProgress,
    Tabs, Tab, Toolbar, AppBar, Alert, Card,
    CardContent, CardHeader, Grid, TablePagination,
    Skeleton, InputAdornment, useTheme, useMediaQuery, Chip,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { styled } from "@mui/material/styles";
import axios from "axios";
import Swal from "sweetalert2";

// Axios instance remains unchanged
const axiosInstance = axios.create({
    baseURL: "https://tdtlworld.com/hrms-backend/",
});

// Helper function to show alerts using SweetAlert2 as requested
const showAlert = (icon, title, text) => {
    Swal.fire({
        icon,
        title,
        text,
        timer: 3000,
        showConfirmButton: false,
    });
};

const Phase1 = ({ user_id, designation_id }) => {
    const [parameters, setParameters] = useState([]);
    const [comments, setComments] = useState({ lineManager: "", head: "", hr: "" });
    const [isSaving, setIsSaving] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPhaseData = async () => {
            if (!user_id || !designation_id) {
                setError("User ID or Designation ID is not provided.");
                setLoading(false);
                return;
            }
            try {
                setLoading(true);
                const phaseNumber = 1;
                const paramsResponse = await axiosInstance.get(`apis/get_desigwise_tabledata/?phase=${phaseNumber}&designation_id=${designation_id}`);
                const designationParameters = paramsResponse.data.data;

                if (!Array.isArray(designationParameters)) {
                    setError("Failed to fetch parameters for this designation.");
                    setLoading(false);
                    return;
                }

                const employeeDataResponse = await axiosInstance.get(`apis/get_phasewise_data/${user_id}/`);
                const allEmployeeData = employeeDataResponse.data.data;
                const employeePhaseDataMap = new Map();

                if (employeeDataResponse.data.status === "success" && Array.isArray(allEmployeeData)) {
                    allEmployeeData.filter(item => item.phase === phaseNumber).forEach(item => {
                        employeePhaseDataMap.set(item.parameter_id, item);
                    });
                }

                const loadedParameters = designationParameters.map(param => {
                    const savedData = employeePhaseDataMap.get(param.parameter_id);
                    const lmScore = savedData ? savedData.points_by_lm : "";
                    const headScore = savedData ? savedData.points_by_head : "";
                    const hrScore = savedData ? savedData.points_by_hr : "";
                    const scores = [lmScore, headScore, hrScore].filter(s => s != null && s !== "").map(s => parseFloat(s));
                    const average = scores.length > 0 ? (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1) : "0.0";
                    return { id: param.parameter_id, name: param.para_name, lm: lmScore || "", head: headScore || "", hr: hrScore || "", average };
                });
                setParameters(loadedParameters);

                const firstRecord = employeePhaseDataMap.values().next().value;
                setComments({
                    lineManager: firstRecord?.comment_by_lm || "",
                    head: firstRecord?.comment_by_head || "",
                    hr: firstRecord?.comment_by_hr || "",
                });

                if (firstRecord && firstRecord.points_by_hr != null && firstRecord.comment_by_hr) {
                    setIsSaved(true);
                }
            } catch (e) {
                setError("An error occurred while fetching performance data.");
            } finally {
                setLoading(false);
            }
        };
        fetchPhaseData();
    }, [user_id, designation_id]);

    const handleChange = (id, field, value) => {
        const updated = parameters.map((param) => {
            if (param.id === id) {
                const newParam = { ...param, [field]: value };
                const scores = [newParam.lm, newParam.head, newParam.hr].map(s => parseFloat(s)).filter(s => !isNaN(s));
                const average = scores.length > 0 ? (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1) : "0.0";
                return { ...newParam, average };
            }
            return param;
        });
        setParameters(updated);
    };

    const handleCommentChange = (rater, value) => {
        setComments((prev) => ({ ...prev, [rater]: value }));
    };

    const handleSave = async () => {
        setIsSaving(true);
        const role_id = localStorage.getItem('userRoleId');
        const payload = {
            role_id: parseInt(role_id, 10),
            entries: parameters.map(param => ({
                emp_id: user_id,
                parameter_id: param.id,
                phase: 1,
                points_by_lm: param.lm ? parseInt(param.lm, 10) : null,
                comment_by_lm: comments.lineManager,
                points_by_head: param.head ? parseInt(param.head, 10) : null,
                comment_by_head: comments.head,
                points_by_hr: param.hr ? parseInt(param.hr, 10) : null,
                comment_by_hr: comments.hr,
            }))
        };
        try {
            await axiosInstance.post('apis/save_phasewise_data/', payload);
            showAlert("success", "Success", "Phase 1 saved successfully!");
            setIsSaved(true);
        } catch (error) {
            showAlert("error", "Error", "Error saving Phase 1 data. Please try again.");
        } finally {
            setIsSaving(false);
        }
    };

    if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress /></Box>;
    if (error) return <Alert severity="error" sx={{ m: 2 }}>{error}</Alert>;

    return (
        <Box>
            <Typography variant="h6" gutterBottom align="center">Phase 1: Align</Typography>
            <Paper elevation={2} sx={{ mt: 2 }}>
                <Table>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: "#BDBDBD" }}>
                            <TableCell align="center"><strong>Sr No</strong></TableCell>
                            <TableCell align="center"><strong>Parameter</strong></TableCell>
                            <TableCell align="center"><strong>LM</strong></TableCell>
                            <TableCell align="center"><strong>Head</strong></TableCell>
                            <TableCell align="center"><strong>HR</strong></TableCell>
                            <TableCell align="center"><strong>Average</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {parameters.map((row, index) => (
                            <TableRow key={row.id}>
                                <TableCell align="center">{index + 1}</TableCell>
                                <TableCell align="center">{row.name}</TableCell>
                                <TableCell align="center"><TextField type="number" value={row.lm} onChange={(e) => handleChange(row.id, "lm", e.target.value)} inputProps={{ min: 0, max: 10 }} size="small" disabled /></TableCell>
                                <TableCell align="center"><TextField type="number" value={row.head} onChange={(e) => handleChange(row.id, "head", e.target.value)} inputProps={{ min: 0, max: 10 }} size="small" disabled /></TableCell>
                                <TableCell align="center"><TextField type="number" value={row.hr} onChange={(e) => handleChange(row.id, "hr", e.target.value)} inputProps={{ min: 0, max: 10 }} size="small" disabled={isSaved} /></TableCell>
                                <TableCell align="center">{row.average}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
            <Card variant="outlined" sx={{ mt: 3 }}><CardHeader title="Phase Comments" /><CardContent><Grid container spacing={2}>
                <Grid item xs={12} md={4}><TextField label="Line Manager Comments" multiline rows={3} fullWidth value={comments.lineManager} onChange={(e) => handleCommentChange("lineManager", e.target.value)} disabled /></Grid>
                <Grid item xs={12} md={4}><TextField label="Head Comments" multiline rows={3} fullWidth value={comments.head} onChange={(e) => handleCommentChange("head", e.target.value)} disabled /></Grid>
                <Grid item xs={12} md={4}><TextField label="HR Comments" multiline rows={3} fullWidth value={comments.hr} onChange={(e) => handleCommentChange("hr", e.target.value)} disabled={isSaved} /></Grid>
            </Grid></CardContent></Card>
            <Box display="flex" justifyContent="center" mt={3}>
                <Button variant="contained" sx={{ backgroundColor: '#8C257C', '&:hover': { backgroundColor: '#6d1d60' } }} onClick={handleSave} disabled={isSaving || isSaved}>
                    {isSaving ? <CircularProgress size={24} sx={{ color: 'white' }} /> : (isSaved ? "Saved" : "Save Phase 1")}
                </Button>
            </Box>
        </Box>
    );
};

const Phase2 = ({ user_id, designation_id }) => {
    const [parameters, setParameters] = useState([]);
    const [comments, setComments] = useState({ lineManager: "", head: "", hr: "" });
    const [isSaving, setIsSaving] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPhaseData = async () => {
            if (!user_id || !designation_id) {
                setError("User ID or Designation ID is not provided.");
                setLoading(false);
                return;
            }
            try {
                setLoading(true);
                const phaseNumber = 2;
                const paramsResponse = await axiosInstance.get(`apis/get_desigwise_tabledata/?phase=${phaseNumber}&designation_id=${designation_id}`);
                const designationParameters = paramsResponse.data.data;

                if (!Array.isArray(designationParameters)) {
                    setError("Failed to fetch parameters for this designation.");
                    setLoading(false);
                    return;
                }

                const employeeDataResponse = await axiosInstance.get(`apis/get_phasewise_data/${user_id}/`);
                const allEmployeeData = employeeDataResponse.data.data;
                const employeePhaseDataMap = new Map();

                if (employeeDataResponse.data.status === "success" && Array.isArray(allEmployeeData)) {
                    allEmployeeData.filter(item => item.phase === phaseNumber).forEach(item => {
                        employeePhaseDataMap.set(item.parameter_id, item);
                    });
                }

                const loadedParameters = designationParameters.map(param => {
                    const savedData = employeePhaseDataMap.get(param.parameter_id);
                    const lmScore = savedData ? savedData.points_by_lm : "";
                    const headScore = savedData ? savedData.points_by_head : "";
                    const hrScore = savedData ? savedData.points_by_hr : "";
                    const scores = [lmScore, headScore, hrScore].filter(s => s != null && s !== "").map(s => parseFloat(s));
                    const average = scores.length > 0 ? (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1) : "0.0";
                    return { id: param.parameter_id, name: param.para_name, lm: lmScore || "", head: headScore || "", hr: hrScore || "", average };
                });
                setParameters(loadedParameters);

                const firstRecord = employeePhaseDataMap.values().next().value;
                setComments({
                    lineManager: firstRecord?.comment_by_lm || "",
                    head: firstRecord?.comment_by_head || "",
                    hr: firstRecord?.comment_by_hr || "",
                });

                if (firstRecord && firstRecord.points_by_hr != null && firstRecord.comment_by_hr) {
                    setIsSaved(true);
                }
            } catch (e) {
                setError("An error occurred while fetching performance data.");
            } finally {
                setLoading(false);
            }
        };
        fetchPhaseData();
    }, [user_id, designation_id]);
    
    const handleChange = (id, field, value) => {
        const updated = parameters.map((param) => {
            if (param.id === id) {
                const newParam = { ...param, [field]: value };
                const scores = [newParam.lm, newParam.head, newParam.hr].map(s => parseFloat(s)).filter(s => !isNaN(s));
                const average = scores.length > 0 ? (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1) : "0.0";
                return { ...newParam, average };
            }
            return param;
        });
        setParameters(updated);
    };

    const handleCommentChange = (rater, value) => {
        setComments((prev) => ({ ...prev, [rater]: value }));
    };

    const handleSave = async () => {
        setIsSaving(true);
        const role_id = localStorage.getItem('userRoleId');
        const payload = {
            role_id: parseInt(role_id, 10),
            entries: parameters.map(param => ({
                emp_id: user_id,
                parameter_id: param.id,
                phase: 2,
                points_by_lm: param.lm ? parseInt(param.lm, 10) : null,
                comment_by_lm: comments.lineManager,
                points_by_head: param.head ? parseInt(param.head, 10) : null,
                comment_by_head: comments.head,
                points_by_hr: param.hr ? parseInt(param.hr, 10) : null,
                comment_by_hr: comments.hr,
            }))
        };
        try {
            await axiosInstance.post('apis/save_phasewise_data/', payload);
            showAlert("success", "Success", "Phase 2 saved successfully!");
            setIsSaved(true);
        } catch (error) {
            showAlert("error", "Error", "Error saving Phase 2 data. Please try again.");
        } finally {
            setIsSaving(false);
        }
    };

    if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress /></Box>;
    if (error) return <Alert severity="error" sx={{ m: 2 }}>{error}</Alert>;

    return (
        <Box>
            <Typography variant="h6" gutterBottom align="center">Phase 2: Accelerate</Typography>
            <Paper elevation={2} sx={{ mt: 2 }}>
                <Table>
                    <TableHead><TableRow sx={{ backgroundColor: "#BDBDBD" }}><TableCell align="center"><strong>Sr No</strong></TableCell><TableCell align="center"><strong>Parameter</strong></TableCell><TableCell align="center"><strong>LM</strong></TableCell><TableCell align="center"><strong>Head</strong></TableCell><TableCell align="center"><strong>HR</strong></TableCell><TableCell align="center"><strong>Average</strong></TableCell></TableRow></TableHead>
                    <TableBody>
                        {parameters.map((row, index) => (
                            <TableRow key={row.id}>
                                <TableCell align="center">{index + 1}</TableCell>
                                <TableCell align="center">{row.name}</TableCell>
                                <TableCell align="center"><TextField type="number" value={row.lm} onChange={(e) => handleChange(row.id, "lm", e.target.value)} inputProps={{ min: 0, max: 10 }} size="small" disabled /></TableCell>
                                <TableCell align="center"><TextField type="number" value={row.head} onChange={(e) => handleChange(row.id, "head", e.target.value)} inputProps={{ min: 0, max: 10 }} size="small" disabled /></TableCell>
                                <TableCell align="center"><TextField type="number" value={row.hr} onChange={(e) => handleChange(row.id, "hr", e.target.value)} inputProps={{ min: 0, max: 10 }} size="small" disabled={isSaved} /></TableCell>
                                <TableCell align="center">{row.average}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
            <Card variant="outlined" sx={{ mt: 3 }}><CardHeader title="Phase Comments" /><CardContent><Grid container spacing={2}>
                <Grid item xs={12} md={4}><TextField label="Line Manager Comments" multiline rows={3} fullWidth value={comments.lineManager} onChange={(e) => handleCommentChange("lineManager", e.target.value)} disabled /></Grid>
                <Grid item xs={12} md={4}><TextField label="Head Comments" multiline rows={3} fullWidth value={comments.head} onChange={(e) => handleCommentChange("head", e.target.value)} disabled /></Grid>
                <Grid item xs={12} md={4}><TextField label="HR Comments" multiline rows={3} fullWidth value={comments.hr} onChange={(e) => handleCommentChange("hr", e.target.value)} disabled={isSaved} /></Grid>
            </Grid></CardContent></Card>
            <Box display="flex" justifyContent="center" mt={3}>
                <Button variant="contained" sx={{ backgroundColor: '#8C257C', '&:hover': { backgroundColor: '#6d1d60' } }} onClick={handleSave} disabled={isSaving || isSaved}>
                    {isSaving ? <CircularProgress size={24} sx={{ color: 'white' }} /> : (isSaved ? "Saved" : "Save Phase 2")}
                </Button>
            </Box>
        </Box>
    );
};

const Phase3 = ({ user_id, designation_id }) => {
    const [parameters, setParameters] = useState([]);
    const [comments, setComments] = useState({ lineManager: "", head: "", hr: "" });
    const [isSaving, setIsSaving] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPhaseData = async () => {
            if (!user_id || !designation_id) {
                setError("User ID or Designation ID is not provided.");
                setLoading(false);
                return;
            }
            try {
                setLoading(true);
                const phaseNumber = 3;
                const paramsResponse = await axiosInstance.get(`apis/get_desigwise_tabledata/?phase=${phaseNumber}&designation_id=${designation_id}`);
                const designationParameters = paramsResponse.data.data;

                if (!Array.isArray(designationParameters)) {
                    setError("Failed to fetch parameters for this designation.");
                    setLoading(false);
                    return;
                }

                const employeeDataResponse = await axiosInstance.get(`apis/get_phasewise_data/${user_id}/`);
                const allEmployeeData = employeeDataResponse.data.data;
                const employeePhaseDataMap = new Map();

                if (employeeDataResponse.data.status === "success" && Array.isArray(allEmployeeData)) {
                    allEmployeeData.filter(item => item.phase === phaseNumber).forEach(item => {
                        employeePhaseDataMap.set(item.parameter_id, item);
                    });
                }

                const loadedParameters = designationParameters.map(param => {
                    const savedData = employeePhaseDataMap.get(param.parameter_id);
                    const lmScore = savedData ? savedData.points_by_lm : "";
                    const headScore = savedData ? savedData.points_by_head : "";
                    const hrScore = savedData ? savedData.points_by_hr : "";
                    const scores = [lmScore, headScore, hrScore].filter(s => s != null && s !== "").map(s => parseFloat(s));
                    const average = scores.length > 0 ? (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1) : "0.0";
                    return { id: param.parameter_id, name: param.para_name, lm: lmScore || "", head: headScore || "", hr: hrScore || "", average };
                });
                setParameters(loadedParameters);

                const firstRecord = employeePhaseDataMap.values().next().value;
                setComments({
                    lineManager: firstRecord?.comment_by_lm || "",
                    head: firstRecord?.comment_by_head || "",
                    hr: firstRecord?.comment_by_hr || "",
                });

                if (firstRecord && firstRecord.points_by_hr != null && firstRecord.comment_by_hr) {
                    setIsSaved(true);
                }
            } catch (e) {
                setError("An error occurred while fetching performance data.");
            } finally {
                setLoading(false);
            }
        };
        fetchPhaseData();
    }, [user_id, designation_id]);
    
    const handleChange = (id, field, value) => {
        const updated = parameters.map((param) => {
            if (param.id === id) {
                const newParam = { ...param, [field]: value };
                const scores = [newParam.lm, newParam.head, newParam.hr].map(s => parseFloat(s)).filter(s => !isNaN(s));
                const average = scores.length > 0 ? (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1) : "0.0";
                return { ...newParam, average };
            }
            return param;
        });
        setParameters(updated);
    };

    const handleCommentChange = (rater, value) => {
        setComments((prev) => ({ ...prev, [rater]: value }));
    };

    const handleSave = async () => {
        setIsSaving(true);
        const role_id = localStorage.getItem('userRoleId');
        const payload = {
            role_id: parseInt(role_id, 10),
            entries: parameters.map(param => ({
                emp_id: user_id,
                parameter_id: param.id,
                phase: 3,
                points_by_lm: param.lm ? parseInt(param.lm, 10) : null,
                comment_by_lm: comments.lineManager,
                points_by_head: param.head ? parseInt(param.head, 10) : null,
                comment_by_head: comments.head,
                points_by_hr: param.hr ? parseInt(param.hr, 10) : null,
                comment_by_hr: comments.hr,
            }))
        };
        try {
            await axiosInstance.post('apis/save_phasewise_data/', payload);
            showAlert("success", "Success", "Phase 3 saved successfully!");
            setIsSaved(true);
        } catch (error) {
            showAlert("error", "Error", "Error saving Phase 3 data. Please try again.");
        } finally {
            setIsSaving(false);
        }
    };

    if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress /></Box>;
    if (error) return <Alert severity="error" sx={{ m: 2 }}>{error}</Alert>;

    return (
        <Box>
            <Typography variant="h6" gutterBottom align="center">Phase 3: Achieve</Typography>
            <Paper elevation={2} sx={{ mt: 2 }}>
                <Table>
                    <TableHead><TableRow sx={{ backgroundColor: "#BDBDBD" }}><TableCell align="center"><strong>Sr No</strong></TableCell><TableCell align="center"><strong>Parameter</strong></TableCell><TableCell align="center"><strong>LM</strong></TableCell><TableCell align="center"><strong>Head</strong></TableCell><TableCell align="center"><strong>HR</strong></TableCell><TableCell align="center"><strong>Average</strong></TableCell></TableRow></TableHead>
                    <TableBody>
                        {parameters.map((row, index) => (
                            <TableRow key={row.id}>
                                <TableCell align="center">{index + 1}</TableCell>
                                <TableCell align="center">{row.name}</TableCell>
                                <TableCell align="center"><TextField type="number" value={row.lm} onChange={(e) => handleChange(row.id, "lm", e.target.value)} inputProps={{ min: 0, max: 10 }} size="small" disabled /></TableCell>
                                <TableCell align="center"><TextField type="number" value={row.head} onChange={(e) => handleChange(row.id, "head", e.target.value)} inputProps={{ min: 0, max: 10 }} size="small" disabled /></TableCell>
                                <TableCell align="center"><TextField type="number" value={row.hr} onChange={(e) => handleChange(row.id, "hr", e.target.value)} inputProps={{ min: 0, max: 10 }} size="small" disabled={isSaved} /></TableCell>
                                <TableCell align="center">{row.average}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
            <Card variant="outlined" sx={{ mt: 3 }}><CardHeader title="Phase Comments" /><CardContent><Grid container spacing={2}>
                <Grid item xs={12} md={4}><TextField label="Line Manager Comments" multiline rows={3} fullWidth value={comments.lineManager} onChange={(e) => handleCommentChange("lineManager", e.target.value)} disabled /></Grid>
                <Grid item xs={12} md={4}><TextField label="Head Comments" multiline rows={3} fullWidth value={comments.head} onChange={(e) => handleCommentChange("head", e.target.value)} disabled /></Grid>
                <Grid item xs={12} md={4}><TextField label="HR Comments" multiline rows={3} fullWidth value={comments.hr} onChange={(e) => handleCommentChange("hr", e.target.value)} disabled={isSaved} /></Grid>
            </Grid></CardContent></Card>
            <Box display="flex" justifyContent="center" mt={3}>
                <Button variant="contained" sx={{ backgroundColor: '#8C257C', '&:hover': { backgroundColor: '#6d1d60' } }} onClick={handleSave} disabled={isSaving || isSaved}>
                    {isSaving ? <CircularProgress size={24} sx={{ color: 'white' }} /> : (isSaved ? "Saved" : "Save Phase 3")}
                </Button>
            </Box>
        </Box>
    );
};

const Phase4 = ({ user_id, designation_id }) => {
    const [parameters, setParameters] = useState([]);
    const [comments, setComments] = useState({ lineManager: "", head: "", hr: "" });
    const [isSaving, setIsSaving] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPhaseData = async () => {
            if (!user_id || !designation_id) {
                setError("User ID or Designation ID is not provided.");
                setLoading(false);
                return;
            }
            try {
                setLoading(true);
                const phaseNumber = 4;
                const paramsResponse = await axiosInstance.get(`apis/get_desigwise_tabledata/?phase=${phaseNumber}&designation_id=${designation_id}`);
                const designationParameters = paramsResponse.data.data;

                if (!Array.isArray(designationParameters)) {
                    setError("Failed to fetch parameters for this designation.");
                    setLoading(false);
                    return;
                }

                const employeeDataResponse = await axiosInstance.get(`apis/get_phasewise_data/${user_id}/`);
                const allEmployeeData = employeeDataResponse.data.data;
                const employeePhaseDataMap = new Map();

                if (employeeDataResponse.data.status === "success" && Array.isArray(allEmployeeData)) {
                    allEmployeeData.filter(item => item.phase === phaseNumber).forEach(item => {
                        employeePhaseDataMap.set(item.parameter_id, item);
                    });
                }

                const loadedParameters = designationParameters.map(param => {
                    const savedData = employeePhaseDataMap.get(param.parameter_id);
                    const lmScore = savedData ? savedData.points_by_lm : "";
                    const headScore = savedData ? savedData.points_by_head : "";
                    const hrScore = savedData ? savedData.points_by_hr : "";
                    const scores = [lmScore, headScore, hrScore].filter(s => s != null && s !== "").map(s => parseFloat(s));
                    const average = scores.length > 0 ? (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1) : "0.0";
                    return { id: param.parameter_id, name: param.para_name, lm: lmScore || "", head: headScore || "", hr: hrScore || "", average };
                });
                setParameters(loadedParameters);

                const firstRecord = employeePhaseDataMap.values().next().value;
                setComments({
                    lineManager: firstRecord?.comment_by_lm || "",
                    head: firstRecord?.comment_by_head || "",
                    hr: firstRecord?.comment_by_hr || "",
                });

                if (firstRecord && firstRecord.points_by_hr != null && firstRecord.comment_by_hr) {
                    setIsSaved(true);
                }
            } catch (e) {
                setError("An error occurred while fetching performance data.");
            } finally {
                setLoading(false);
            }
        };
        fetchPhaseData();
    }, [user_id, designation_id]);
    
    const handleChange = (id, field, value) => {
        const updated = parameters.map((param) => {
            if (param.id === id) {
                const newParam = { ...param, [field]: value };
                const scores = [newParam.lm, newParam.head, newParam.hr].map(s => parseFloat(s)).filter(s => !isNaN(s));
                const average = scores.length > 0 ? (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1) : "0.0";
                return { ...newParam, average };
            }
            return param;
        });
        setParameters(updated);
    };

    const handleCommentChange = (rater, value) => {
        setComments((prev) => ({ ...prev, [rater]: value }));
    };

    const handleSave = async () => {
        setIsSaving(true);
        const role_id = localStorage.getItem('userRoleId');
        const payload = {
            role_id: parseInt(role_id, 10),
            entries: parameters.map(param => ({
                emp_id: user_id,
                parameter_id: param.id,
                phase: 4,
                points_by_lm: param.lm ? parseInt(param.lm, 10) : null,
                comment_by_lm: comments.lineManager,
                points_by_head: param.head ? parseInt(param.head, 10) : null,
                comment_by_head: comments.head,
                points_by_hr: param.hr ? parseInt(param.hr, 10) : null,
                comment_by_hr: comments.hr,
            }))
        };
        try {
            await axiosInstance.post('apis/save_phasewise_data/', payload);
            showAlert("success", "Success", "Phase 4 saved successfully!");
            setIsSaved(true);
        } catch (error) {
            showAlert("error", "Error", "Error saving Phase 4 data. Please try again.");
        } finally {
            setIsSaving(false);
        }
    };

    if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress /></Box>;
    if (error) return <Alert severity="error" sx={{ m: 2 }}>{error}</Alert>;

    return (
        <Box>
            <Typography variant="h6" gutterBottom align="center">Phase 4: Aspire</Typography>
            <Paper elevation={2} sx={{ mt: 2 }}>
                <Table>
                    <TableHead><TableRow sx={{ backgroundColor: "#BDBDBD" }}><TableCell align="center"><strong>Sr No</strong></TableCell><TableCell align="center"><strong>Parameter</strong></TableCell><TableCell align="center"><strong>LM</strong></TableCell><TableCell align="center"><strong>Head</strong></TableCell><TableCell align="center"><strong>HR</strong></TableCell><TableCell align="center"><strong>Average</strong></TableCell></TableRow></TableHead>
                    <TableBody>
                        {parameters.map((row, index) => (
                            <TableRow key={row.id}>
                                <TableCell align="center">{index + 1}</TableCell>
                                <TableCell align="center">{row.name}</TableCell>
                                <TableCell align="center"><TextField type="number" value={row.lm} onChange={(e) => handleChange(row.id, "lm", e.target.value)} inputProps={{ min: 0, max: 10 }} size="small" disabled /></TableCell>
                                <TableCell align="center"><TextField type="number" value={row.head} onChange={(e) => handleChange(row.id, "head", e.target.value)} inputProps={{ min: 0, max: 10 }} size="small" disabled /></TableCell>
                                <TableCell align="center"><TextField type="number" value={row.hr} onChange={(e) => handleChange(row.id, "hr", e.target.value)} inputProps={{ min: 0, max: 10 }} size="small" disabled={isSaved} /></TableCell>
                                <TableCell align="center">{row.average}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
            <Card variant="outlined" sx={{ mt: 3 }}><CardHeader title="Phase Comments" /><CardContent><Grid container spacing={2}>
                <Grid item xs={12} md={4}><TextField label="Line Manager Comments" multiline rows={3} fullWidth value={comments.lineManager} onChange={(e) => handleCommentChange("lineManager", e.target.value)} disabled /></Grid>
                <Grid item xs={12} md={4}><TextField label="Head Comments" multiline rows={3} fullWidth value={comments.head} onChange={(e) => handleCommentChange("head", e.target.value)} disabled /></Grid>
                <Grid item xs={12} md={4}><TextField label="HR Comments" multiline rows={3} fullWidth value={comments.hr} onChange={(e) => handleCommentChange("hr", e.target.value)} disabled={isSaved} /></Grid>
            </Grid></CardContent></Card>
            <Box display="flex" justifyContent="center" mt={3}>
                <Button variant="contained" sx={{ backgroundColor: '#8C257C', '&:hover': { backgroundColor: '#6d1d60' } }} onClick={handleSave} disabled={isSaving || isSaved}>
                    {isSaving ? <CircularProgress size={24} sx={{ color: 'white' }} /> : (isSaved ? "Saved" : "Save Phase 4")}
                </Button>
            </Box>
        </Box>
    );
};

const OverallAnalysis = ({ userId, employeeVId }) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isSaving, setIsSaving] = useState(false);
    const [isOverallSaved, setIsOverallSaved] = useState(false);
    const [allPhaseComments, setAllPhaseComments] = useState([]);
    const [overallComments, setOverallComments] = useState({ hr: "" });
    const [kpiData, setKpiData] = useState([
        { kpi: "A", target: 1, ach: 1, rating: 5 }, { kpi: "B", target: 2, ach: 5, rating: 7 }, { kpi: "C", target: 3, ach: 6, rating: 9 },
    ]);
    const [kraData, setKraData] = useState([
        { parameter: "HADC", totalRating: 10 }, { parameter: "QCP", totalRating: 10 },
    ]);
    const [phaseWiseData, setPhaseWiseData] = useState(null);
    const [savingAction, setSavingAction] = useState(null);
    const [actionTaken, setActionTaken] = useState(false);
    const [employeeStatus, setEmployeeStatus] = useState(null);

    useEffect(() => {
        const fetchAllData = async () => {
            if (!userId) {
                setError("User ID not found.");
                setLoading(false);
                return;
            }
            setLoading(true);
            try {
                const role_id = localStorage.getItem('userRoleId');
                const loggedInEmpId = localStorage.getItem('loggedInEmpId');

                const [phaseWiseResponse, allCommentsResponse, performanceResponse] = await Promise.all([
                    axiosInstance.get(`apis/get_employee_overall_phasewise/?user_id=${userId}`),
                    axiosInstance.get(`apis/get_phasewise_data/${userId}/`),
                    axiosInstance.get(`apis/get_employee_performance/${role_id}/${loggedInEmpId}/`)
                ]);

                if (phaseWiseResponse.data.status === "success") {
                    const data = phaseWiseResponse.data.data;
                    setPhaseWiseData(data);
                    setOverallComments({ hr: data.final_hr_comment || "" });
                    if (data.final_hr_comment && data.final_hr_comment !== "No comment.") {
                        setIsOverallSaved(true);
                    }
                } else {
                    throw new Error("Failed to fetch phase data.");
                }

                if (allCommentsResponse.data.status === "success" && Array.isArray(allCommentsResponse.data.data)) {
                    const comments = [1, 2, 3, 4].map(phaseNum => {
                        const phaseData = allCommentsResponse.data.data.find(item => item.phase === phaseNum);
                        return { phase: `Phase ${phaseNum}`, lm: phaseData?.comment_by_lm || "N/A", head: phaseData?.comment_by_head || "N/A", hr: phaseData?.comment_by_hr || "N/A" };
                    });
                    setAllPhaseComments(comments);
                }

                const employeeList = performanceResponse.data;
                const currentUserPerformance = Array.isArray(employeeList) ? employeeList.find(emp => emp.user_id === userId) : null;

                if (currentUserPerformance && currentUserPerformance.employee_status) {
                    const status = currentUserPerformance.employee_status.toLowerCase();
                    if (['confirm', 'extend', 'terminate', 'terminated', 'confirmed', 'extended'].includes(status)) {
                        setEmployeeStatus(currentUserPerformance.employee_status);
                        setActionTaken(true);
                    }
                } else {
                    setActionTaken(false);
                }

            } catch (error) {
                setError("Could not load performance data.");
            } finally {
                setLoading(false);
            }
        };
        fetchAllData();
    }, [userId]);
    
    const handleKpiChange = (index, field, value) => {
        const newData = [...kpiData];
        newData[index][field] = ["target", "ach", "rating"].includes(field) ? Number(value) : value;
        setKpiData(newData);
    };

    const handleKraChange = (index, field, value) => {
        const newData = [...kraData];
        newData[index][field] = field === "totalRating" ? Number(value) : value;
        setKraData(newData);
    };

    const handleOverallCommentChange = (rater, value) => {
        setOverallComments(prev => ({ ...prev, [rater]: value }));
    };

    const handleSave = async () => {
        setIsSaving(true);
        try {
            const kpiRatings = kpiData.map((item) => Number(item.rating) || 0);
            const kraRatings = kraData.map((item) => Number(item.totalRating) || 0);
            const allKpiKraRatings = [...kpiRatings, ...kraRatings].filter((r) => r > 0);
            const kpiKraAverage = allKpiKraRatings.length > 0 ? (allKpiKraRatings.reduce((sum, r) => sum + r, 0) / allKpiKraRatings.length).toFixed(1) : "0.0";

            let value4AEE = 0;
            if (phaseWiseData) {
                const scoreKeys = ['phase1_lm', 'phase2_lm', 'phase3_lm', 'phase4_lm', 'phase1_head', 'phase2_head', 'phase3_head', 'phase4_head', 'phase1_hr', 'phase2_hr', 'phase3_hr', 'phase4_hr'];
                const totalApiScore = scoreKeys.reduce((sum, key) => sum + (phaseWiseData[key] || 0), 0);
                value4AEE = (totalApiScore / (12 * 40)) * 10;
            }

            const finalAverage = ((value4AEE + parseFloat(kpiKraAverage)) / 2).toFixed(1);
            const achievementPercentage = (parseFloat(finalAverage) * 10).toFixed(0);

            const payload = {
                user_id: userId,
                emp_id: employeeVId,
                performance_analysis: overallComments.hr || "No detailed comments provided.",
                kra_kpi_total: kpiKraAverage,
                average: finalAverage,
                percent_achievement: achievementPercentage,
                comment_by_lm: "No comment.",
                comment_by_hr: overallComments.hr || "No comment.",
                comment_by_head: "No comment."
            };

            await axiosInstance.post("apis/save_employee_overall_analysis/", payload);
            showAlert("success", "Success!", "Overall analysis saved successfully!");
            setIsOverallSaved(true);
        } catch (error) {
            const errorMessage = error.response?.data?.message || "An error occurred while saving.";
            showAlert("error", "Error!", errorMessage);
        } finally {
            setIsSaving(false);
        }
    };
    
    const handleFinalAction = async (action) => {
        const actionText = {
            confirm: 'Do you want to confirm this employee?',
            extend: 'Do you want to extend probation for this employee?',
            terminate: 'This action is final and cannot be undone.'
        };
    
        const result = await Swal.fire({
            title: `Are you sure?`,
            text: actionText[action],
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: action === 'terminate' ? '#d33' : '#3085d6',
            cancelButtonColor: '#6c757d',
            confirmButtonText: `Yes, ${action}!`
        });
    
        if (result.isConfirmed) {
            setSavingAction(action);
            try {
                const payload = {
                    user_id: userId,
                    action: action
                };
                await axiosInstance.patch("apis/final_confirmation_action/", payload);
                showAlert("success", "Success!", `Employee status updated to ${action}.`);
                setActionTaken(true);
                setEmployeeStatus(action);
            } catch (error) {
                const errorMessage = error.response?.data?.message || `An error occurred while updating status.`;
                showAlert("error", "Error!", errorMessage);
            } finally {
                setSavingAction(null);
            }
        }
    };

    if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress /></Box>;
    if (error) return <Alert severity="error" sx={{ m: 2 }}>{error}</Alert>;

    const phaseKeys = ["phase1", "phase2", "phase3", "phase4"];
    const kpiRatings = kpiData.map((item) => Number(item.rating) || 0);
    const kraRatings = kraData.map((item) => Number(item.totalRating) || 0);
    const allKpiKraRatings = [...kpiRatings, ...kraRatings].filter((r) => r > 0);
    const kpiKraAverage = allKpiKraRatings.length > 0 ? (allKpiKraRatings.reduce((sum, r) => sum + r, 0) / allKpiKraRatings.length).toFixed(1) : "0.0";
    const textFieldStyles = { padding: '2px 4px', '& .MuiInput-underline:before': { borderBottom: 'none' }, '& .MuiInput-underline:hover:not(.Mui-disabled):before': { borderBottom: 'none' }, '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)', borderRadius: '4px' }, };
    let value4AEE = 0, percent4AEE = 0;
    if (phaseWiseData) {
        const scoreKeys = ['phase1_lm', 'phase2_lm', 'phase3_lm', 'phase4_lm', 'phase1_head', 'phase2_head', 'phase3_head', 'phase4_head', 'phase1_hr', 'phase2_hr', 'phase3_hr', 'phase4_hr'];
        const totalApiScore = scoreKeys.reduce((sum, key) => sum + (phaseWiseData[key] || 0), 0);
        value4AEE = (totalApiScore / 480) * 10;
        percent4AEE = (totalApiScore / 480) * 100;
    }
    const valueKpiKra = parseFloat(kpiKraAverage);
    const percentKpiKra = valueKpiKra * 10;
    const totalValue = (value4AEE + valueKpiKra) / 2;
    const percentTotal = totalValue * 10;
    const lmTotal = phaseWiseData ? (phaseWiseData.phase1_lm || 0) + (phaseWiseData.phase2_lm || 0) + (phaseWiseData.phase3_lm || 0) + (phaseWiseData.phase4_lm || 0) : 0;
    const headTotal = phaseWiseData ? (phaseWiseData.phase1_head || 0) + (phaseWiseData.phase2_head || 0) + (phaseWiseData.phase3_head || 0) + (phaseWiseData.phase4_head || 0) : 0;
    const hrTotal = phaseWiseData ? (phaseWiseData.phase1_hr || 0) + (phaseWiseData.phase2_hr || 0) + (phaseWiseData.phase3_hr || 0) + (phaseWiseData.phase4_hr || 0) : 0;
    const grandTotal = lmTotal + headTotal + hrTotal;

    return (
        <Box>
            <Typography variant="h5" sx={{ mb: 3, color: "primary.main", fontWeight: "bold" }}>Performance Analysis Summary</Typography>
            <Grid container spacing={3}>
                <Grid item xs={12}><Card><CardHeader title="Phase-wise Performance" /><CardContent><TableContainer><Table size="small">
                    <TableHead><TableRow><TableCell sx={{ fontWeight: "bold" }}>Phase</TableCell><TableCell sx={{ fontWeight: "bold" }} align="right">Line Manager</TableCell><TableCell sx={{ fontWeight: "bold" }} align="right">Head</TableCell><TableCell sx={{ fontWeight: "bold" }} align="right">HR</TableCell><TableCell sx={{ fontWeight: "bold" }} align="right">Total</TableCell></TableRow></TableHead>
                    <TableBody>
                        {phaseWiseData && phaseKeys.map((p, i) => (<TableRow key={p}><TableCell>{["Align (P1)", "Accelerate (P2)", "Achieve (P3)", "Aspire (P4)"][i]}</TableCell><TableCell align="right">{(phaseWiseData[`phase${i + 1}_lm`] || 0).toFixed(1)}</TableCell><TableCell align="right">{(phaseWiseData[`phase${i + 1}_head`] || 0).toFixed(1)}</TableCell><TableCell align="right">{(phaseWiseData[`phase${i + 1}_hr`] || 0).toFixed(1)}</TableCell><TableCell align="right">{((phaseWiseData[`phase${i + 1}_lm`] || 0) + (phaseWiseData[`phase${i + 1}_head`] || 0) + (phaseWiseData[`phase${i + 1}_hr`] || 0)).toFixed(1)}</TableCell></TableRow>))}
                        <TableRow sx={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}><TableCell sx={{ fontWeight: "bold" }}>Total</TableCell><TableCell sx={{ fontWeight: "bold" }} align="right">{lmTotal.toFixed(1)}</TableCell><TableCell sx={{ fontWeight: "bold" }} align="right">{headTotal.toFixed(1)}</TableCell><TableCell sx={{ fontWeight: "bold" }} align="right">{hrTotal.toFixed(1)}</TableCell><TableCell sx={{ fontWeight: "bold" }} align="right">{grandTotal.toFixed(1)}</TableCell></TableRow>
                    </TableBody>
                </Table></TableContainer></CardContent></Card></Grid>
                <Grid item xs={12} sm={6}><Card><CardHeader title="KPI" /><CardContent><TableContainer><Table size="small">
                    <TableHead><TableRow><TableCell sx={{ fontWeight: "bold" }}>KPI</TableCell><TableCell sx={{ fontWeight: "bold", textAlign: 'center' }}>Target</TableCell><TableCell sx={{ fontWeight: "bold", textAlign: 'center' }}>Ach</TableCell><TableCell sx={{ fontWeight: "bold", textAlign: 'center' }}>Rating</TableCell></TableRow></TableHead>
                    <TableBody>{kpiData.map((row, i) => (<TableRow key={i}><TableCell sx={{ p: 0.5 }}><TextField fullWidth size="small" variant="standard" value={row.kpi} onChange={(e) => handleKpiChange(i, "kpi", e.target.value)} sx={textFieldStyles} disabled={isOverallSaved} /></TableCell><TableCell sx={{ p: 0.5 }}><TextField fullWidth size="small" variant="standard" type="number" value={row.target} onChange={(e) => handleKpiChange(i, "target", e.target.value)} sx={textFieldStyles} disabled={isOverallSaved} /></TableCell><TableCell sx={{ p: 0.5 }}><TextField fullWidth size="small" variant="standard" type="number" value={row.ach} onChange={(e) => handleKpiChange(i, "ach", e.target.value)} sx={textFieldStyles} disabled={isOverallSaved} /></TableCell><TableCell sx={{ p: 0.5 }}><TextField fullWidth size="small" variant="standard" type="number" value={row.rating} onChange={(e) => handleKpiChange(i, "rating", e.target.value)} sx={textFieldStyles} disabled={isOverallSaved} /></TableCell></TableRow>))}</TableBody>
                </Table></TableContainer></CardContent></Card></Grid>
                <Grid item xs={12} sm={6}><Card><CardHeader title="KRA" /><CardContent><TableContainer><Table size="small">
                    <TableHead><TableRow><TableCell sx={{ fontWeight: "bold" }}>KRA Parameter</TableCell><TableCell sx={{ fontWeight: "bold", textAlign: 'center' }}>Total Rating</TableCell></TableRow></TableHead>
                    <TableBody>{kraData.map((row, i) => (<TableRow key={i}><TableCell sx={{ p: 0.5 }}><TextField fullWidth size="small" variant="standard" value={row.parameter} onChange={(e) => handleKraChange(i, "parameter", e.target.value)} sx={textFieldStyles} disabled={isOverallSaved} /></TableCell><TableCell sx={{ p: 0.5 }}><TextField fullWidth size="small" variant="standard" type="number" value={row.totalRating} onChange={(e) => handleKraChange(i, "totalRating", e.target.value)} sx={textFieldStyles} disabled={isOverallSaved} /></TableCell></TableRow>))}</TableBody>
                </Table></TableContainer></CardContent></Card></Grid>
                <Grid item xs={12} sx={{ mt: 2 }}><Card><CardHeader title="All Total" /><CardContent><TableContainer><Table>
                    <TableHead><TableRow><TableCell sx={{ fontWeight: "bold" }}>4AEE Program</TableCell><TableCell sx={{ fontWeight: "bold" }}>Ach %</TableCell><TableCell sx={{ fontWeight: "bold" }}>KRA/KPI</TableCell><TableCell sx={{ fontWeight: "bold" }}>Ach %</TableCell><TableCell sx={{ fontWeight: "bold" }}>Total</TableCell><TableCell sx={{ fontWeight: "bold" }}>Ach %</TableCell></TableRow></TableHead>
                    <TableBody><TableRow sx={{ fontWeight: "bold" }}><TableCell>{value4AEE.toFixed(1)}</TableCell><TableCell>{percent4AEE.toFixed(0)}%</TableCell><TableCell>{valueKpiKra.toFixed(1)}</TableCell><TableCell>{percentKpiKra.toFixed(0)}%</TableCell><TableCell sx={{ fontWeight: "bold" }}>{totalValue.toFixed(1)}</TableCell><TableCell sx={{ fontWeight: "bold" }}>{percentTotal.toFixed(0)}%</TableCell></TableRow></TableBody>
                </Table></TableContainer></CardContent></Card></Grid>
                <Grid item xs={12} sx={{ mt: 2 }}><Card><CardHeader title="All Phases Comments" /><CardContent><TableContainer><Table>
                    <TableHead><TableRow><TableCell sx={{ fontWeight: "bold" }}>Phases</TableCell><TableCell sx={{ fontWeight: "bold" }}>Line Manager</TableCell><TableCell sx={{ fontWeight: "bold" }}>Head</TableCell><TableCell sx={{ fontWeight: "bold" }}>HR</TableCell></TableRow></TableHead>
                    <TableBody>{allPhaseComments.map((row, i) => (<TableRow key={i}><TableCell>{row.phase}</TableCell><TableCell>{row.lm}</TableCell><TableCell>{row.head}</TableCell><TableCell>{row.hr}</TableCell></TableRow>))}</TableBody>
                </Table></TableContainer></CardContent></Card></Grid>
            </Grid>
            <Box display="flex" justifyContent="center" mt={3}>
                <Button variant="contained" sx={{ backgroundColor: '#8C257C', '&:hover': { backgroundColor: '#6d1d60' } }} onClick={handleSave} disabled={isSaving || isOverallSaved}>
                    {isSaving ? <CircularProgress size={24} sx={{color: 'white'}} /> : (isOverallSaved ? "Saved" : "Save Overall Analysis")}
                </Button>
            </Box>
            
            {actionTaken ? (
                <Box display="flex" justifyContent="center" mt={3}>
                    <Alert severity="info" sx={{width: 'fit-content'}}>
                        Final Status: <strong>{employeeStatus ? employeeStatus.toUpperCase() : 'N/A'}</strong>
                    </Alert>
                </Box>
            ) : (
                <Box display="flex" justifyContent="center" gap={2} mt={3}>
                    <Button variant="contained" color="success" onClick={() => handleFinalAction('confirm')} disabled={!isOverallSaved || savingAction}>
                        {savingAction === 'confirm' ? <CircularProgress size={24} color="inherit" /> : "Confirm Employee"}
                    </Button>
                    <Button variant="contained" color="warning" onClick={() => handleFinalAction('extend')} disabled={!isOverallSaved || savingAction}>
                        {savingAction === 'extend' ? <CircularProgress size={24} color="inherit" /> : "Extend Probation"}
                    </Button>
                    <Button variant="contained" color="error" onClick={() => handleFinalAction('terminate')} disabled={!isOverallSaved || savingAction}>
                        {savingAction === 'terminate' ? <CircularProgress size={24} color="inherit" /> : "Terminate Employee"}
                    </Button>
                </Box>
            )}
        </Box>
    );
};

export const MarksHR = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState(0);
    const location = useLocation();
    const { user_id, emp_id, designation_id } = location.state || {};

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    const renderTabContent = () => {
        const props = { user_id: user_id, userId: user_id, employeeVId: emp_id, designation_id: designation_id };
        switch (activeTab) {
            case 0: return <Phase1 {...props} />;
            case 1: return <Phase2 {...props} />;
            case 2: return <Phase3 {...props} />;
            case 3: return <Phase4 {...props} />;
            case 4: return <OverallAnalysis {...props} />;
            default: return null;
        }
    };

    return (
        <Box sx={{ backgroundColor: "#fafafa", minHeight: "100vh" }}>
            <AppBar position="static" sx={{ backgroundColor: "#8C257C", color: "#FFFFFF" }}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={() => navigate("/hrms/dashboardhr/confirmation")} sx={{ mr: 2 }} >
                        <ArrowBackIcon />
                    </IconButton>
                    <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 600 }}>
                        Employee Performance - ID: {id}
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box sx={{ borderBottom: 1, borderColor: "divider", bgcolor: "#f5f5f5", p: 2 }}>
                <Paper elevation={2} sx={{ borderRadius: 2 }}>
                    <Tabs value={activeTab} onChange={handleTabChange} textColor="primary" indicatorColor="primary" centered>
                        <Tab label="Phase 1" sx={{ fontWeight: 600 }} />
                        <Tab label="Phase 2" sx={{ fontWeight: 600 }} />
                        <Tab label="Phase 3" sx={{ fontWeight: 600 }} />
                        <Tab label="Phase 4" sx={{ fontWeight: 600 }} />
                        <Tab label="Overall Analysis" sx={{ fontWeight: 600 }} />
                    </Tabs>
                </Paper>
            </Box>
            <Box px={3} pb={4} pt={2}>
                {renderTabContent()}
            </Box>
        </Box>
    );
};

const StyledArrowButton = styled(IconButton)(({ theme }) => ({
    color: "#616161",
    transition: "color 0.3s",
    "&:hover": { color: "#8C257C" },
}));

export const PerformanceTableHR = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [hoveredRowId, setHoveredRowId] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    useEffect(() => {
        const fetchPerformanceData = async () => {
            setLoading(true);
            const role_id = localStorage.getItem('userRoleId');
            const user_id = localStorage.getItem('loggedInEmpId');
            if (!role_id || !user_id) {
                setError("User role or ID not found. Please log in again.");
                setLoading(false);
                return;
            }
            try {
                const response = await axiosInstance.get(`apis/get_employee_performance/${role_id}/${user_id}/`);
                const transformedData = response.data.map(item => ({
                    id: item.user_id, empId: item.emp_id, employee: item.full_name, designation: item.designation_name, designation_id: item.designation_id,
                    doj: item.date_of_joining, lm: item.manager_name, phase1: item.phase_one_points, phase2: item.phase_two_points, phase3: item.phase_three_points,
                    phase4: item.phase_four_points, overall: item.performance_analysis, score: item.avg_score, apiStatus: item.employee_status,
                }));
                setData(transformedData);
                setError(null);
            } catch (e) {
                setError(e.message);
            } finally {
                setLoading(false);
            }
        };
        fetchPerformanceData();
    }, []);

    const handleNavigate = (row) => {
        navigate(`/hrms/dashboardhr/marks/${row.id}`, {
            state: { user_id: row.id, emp_id: row.empId, designation_id: row.designation_id },
        });
    };

    const renderBoxedCell = (value, isPercentage = false) => (
        <Box sx={{ px: 1, py: 0.5, border: "1px solid #ccc", borderRadius: 1, minWidth: 40, textAlign: "center" }}>
            {value != null ? `${value}${isPercentage ? '%' : ''}` : "-"}
        </Box>
    );

    const renderStatusCell = (status) => {
        let color = "info";
        let label = "In Progress";
    
        if (status) {
            const lowerCaseStatus = status.toLowerCase();
    
            switch (lowerCaseStatus) {
                case 'confirm':
                case 'confirmed':
                    color = "success";
                    label = "Confirmed";
                    break;
                case 'extend':
                case 'extended':
                    color = "warning";
                    label = "Extended";
                    break;
                case 'terminate':
                case 'terminated':
                    color = "error";
                    label = "Terminated";
                    break;
                default:
                    label = status.charAt(0).toUpperCase() + status.slice(1);
                    color = "info";
                    break;
            }
        }
        
        return <Chip label={label} color={color} size="small" />;
    };

    const filteredData = data.filter(item =>
        item.employee.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.designation && item.designation.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.lm && item.lm.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const paginatedData = filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    if (error) {
        return <Box component={Paper} p={3}><Alert severity="error">Error: {error}</Alert></Box>;
    }
    
    return (
        <Box component={Paper} p={3}>
            <Typography variant="h4" sx={{ color: "#8C257C", fontWeight: "bold", mb: 5 }}>
                Performance Table
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', alignItems: 'center', mb: 2, gap: 2 }}>
                <Box></Box> 
                <TextField
                    size="small"
                    placeholder="Search ..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment> }}
                    sx={{ width: isMobile ? '100%' : 'auto' }}
                />
            </Box>

            <TableContainer sx={{ minWidth: '100%', whiteSpace: 'nowrap' }}>
                <Table>
                    <TableHead sx={{ backgroundColor: "#8C257C" }}>
                        <TableRow>
                            {["Sr No", "Employee", "Designation", "DOJ", "LM", "P1", "P2", "P3", "P4", "Overall", "Score", "Status"].map(h => (
                                <TableCell key={h} align="center" sx={{ fontWeight: 'bold', color: 'white' }}>{h}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loading ? (
                            Array.from(new Array(rowsPerPage)).map((_, index) => (
                                <TableRow key={index}>
                                    <TableCell align="center"><Skeleton variant="text" /></TableCell>
                                    <TableCell align="center"><Skeleton variant="text" /></TableCell>
                                    <TableCell align="center"><Skeleton variant="text" /></TableCell>
                                    <TableCell align="center"><Skeleton variant="text" /></TableCell>
                                    <TableCell align="center"><Skeleton variant="text" /></TableCell>
                                    <TableCell align="center"><Skeleton variant="rectangular" width={40} height={20} /></TableCell>
                                    <TableCell align="center"><Skeleton variant="rectangular" width={40} height={20} /></TableCell>
                                    <TableCell align="center"><Skeleton variant="rectangular" width={40} height={20} /></TableCell>
                                    <TableCell align="center"><Skeleton variant="rectangular" width={40} height={20} /></TableCell>
                                    <TableCell align="center"><Skeleton variant="rectangular" width={40} height={20} /></TableCell>
                                    <TableCell align="center"><Skeleton variant="rectangular" width={40} height={20} /></TableCell>
                                    <TableCell align="center"><Skeleton variant="text" /></TableCell>
                                </TableRow>
                            ))
                        ) : (
                            paginatedData.map((row, index) => (
                                <TableRow key={row.id} hover onMouseEnter={() => setHoveredRowId(row.id)} onMouseLeave={() => setHoveredRowId(null)}>
                                    <TableCell align="center">{page * rowsPerPage + index + 1}</TableCell>
                                    <TableCell align="center">
                                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <Typography variant="body2" component="span" sx={{ mr: 1 }}>{row.employee}</Typography>
                                            <StyledArrowButton onClick={() => handleNavigate(row)} size="small" sx={{ visibility: hoveredRowId === row.id ? 'visible' : 'hidden' }}>
                                                <ArrowForwardIcon fontSize="small" />
                                            </StyledArrowButton>
                                        </Box>
                                    </TableCell>
                                    <TableCell align="center" sx={{fontSize: '0.95rem'}}>{row.designation}</TableCell>
                                    <TableCell align="center" sx={{fontSize: '0.95rem'}}>{row.doj}</TableCell>
                                    <TableCell align="center" sx={{fontSize: '0.95rem'}}>{row.lm}</TableCell>
                                    <TableCell align="center">{renderBoxedCell(row.phase1)}</TableCell>
                                    <TableCell align="center">{renderBoxedCell(row.phase2)}</TableCell>
                                    <TableCell align="center">{renderBoxedCell(row.phase3)}</TableCell>
                                    <TableCell align="center">{renderBoxedCell(row.phase4)}</TableCell>
                                    <TableCell align="center">{renderBoxedCell(row.overall, true)}</TableCell>
                                    <TableCell align="center">{renderBoxedCell(row.score)}</TableCell>
                                    <TableCell align="center">{renderStatusCell(row.apiStatus)}</TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            <TablePagination
                rowsPerPageOptions={[5, 10, 15, 25]}
                component="div"
                count={filteredData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={(event, newPage) => setPage(newPage)}
                onRowsPerPageChange={(event) => { setRowsPerPage(parseInt(event.target.value, 10)); setPage(0); }}
                sx={{
                    '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': {
                        color: 'text.secondary',
                        fontSize: '0.875rem'
                    },
                    '& .MuiSvgIcon-root': {
                        color: '#8C257C'
                    }
                }}
            />
        </Box>
    );
};

export default PerformanceTableHR;