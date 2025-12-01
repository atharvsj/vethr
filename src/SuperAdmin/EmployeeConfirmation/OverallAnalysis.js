// import React, { useState, useEffect } from "react";
// import {
//   Typography,
//   Grid,
//   Table,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableBody,
//   Paper,
//   Box,
//   TextField,
//   Button,
//   Snackbar,
//   Alert,
//   CircularProgress, // Added for loading state
// } from "@mui/material";
// import axiosInstance from "../../utils/axiosInstance"; // Assuming your primary axios instance
// import axios from "axios"; // Using a separate axios for the external KPI backend

// const OverallAnalysis = ({ userId, employeeVId }) => { // Expecting both IDs as props
//   const [openSnackbar, setOpenSnackbar] = useState(false);
  
//   // --- New State for API Data ---
//   const [phaseData, setPhaseData] = useState(null);
//   const [kpiData, setKpiData] = useState(null);
//   const [kraData, setKraData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchAllData = async () => {
//       if (!userId || !employeeVId) {
//         setError("Employee IDs are missing.");
//         setLoading(false);
//         return;
//       }

//       setLoading(true);
//       setError(null);
      
//       try {
//         const [phaseRes, kpiRes, kraRes] = await Promise.all([
//           // 1. Fetch PhaseWise Performance
//           axiosInstance.get(`apis/get_employee_overall_phasewise/?user_id=${userId}`),
          
//           // 2. Fetch KPI Data
//           axios.post('https://kpibackend.vetrinahealthcare.com/api/employee/kpiform/', {
//             employee_id: employeeVId
//           }),

//           // 3. Fetch KRA Data
//           axios.get(`https://kpibackend.vetrinahealthcare.com/api/employee-kra/${userId}/`)
//         ]);
        
//         // Set state from responses
//         if (phaseRes.data.status === 'success') {
//           setPhaseData(phaseRes.data.data);
//         }
//         if (kpiRes.data.kpis) {
//           setKpiData(kpiRes.data.kpis);
//         }
//         if (kraRes.data.status === true) {
//           setKraData(kraRes.data.data);
//         }

//       } catch (err) {
//         console.error("Failed to fetch overall analysis data:", err);
//         setError("Could not load all performance data. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAllData();
//   }, [userId, employeeVId]);

//   const handleSave = () => {
//     console.log("Overall analysis saved.");
//     setOpenSnackbar(true);
//   };

//   const handleCloseSnackbar = () => {
//     setOpenSnackbar(false);
//   };

//   if (loading) {
//     return <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress /></Box>;
//   }

//   if (error) {
//     return <Alert severity="error" sx={{ m: 2 }}>{error}</Alert>;
//   }
  
//   // Helper to safely format numbers
//   const formatScore = (score) => score ? parseFloat(score).toFixed(2) : 'N/A';

//   return (
//     <Box>
//       <Typography variant="h6" align="center" gutterBottom>
//         Overall Analysis for {phaseData?.full_name || `Employee ID: ${userId}`}
//       </Typography>

//       <Grid container spacing={2}>
//         {/* PhaseWise Performance Table */}
//         <Grid item xs={12} md={4}>
//           <Paper elevation={2}>
//             <Typography variant="subtitle1" align="center" sx={{ fontWeight: 600, bgcolor: "#eeeeee", py: 1 }}>
//               PhaseWise Performance
//             </Typography>
//             <Table size="small">
//               <TableHead>
//                 <TableRow sx={{ backgroundColor: "#9E9E9E" }}>
//                   {["Phase", "LM", "H", "HR", "Total"].map((col) => (
//                     <TableCell key={col} align="center" sx={{ color: "#fff", fontWeight: 600 }}>{col}</TableCell>
//                   ))}
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {phaseData && [1, 2, 3, 4].map(phaseNum => {
//                   const lm = phaseData[`phase${phaseNum}_lm`] || 0;
//                   const head = phaseData[`phase${phaseNum}_head`] || 0;
//                   const hr = phaseData[`phase${phaseNum}_hr`] || 0;
//                   const total = lm + head + hr;
//                   return (
//                     <TableRow key={`phase-${phaseNum}`}>
//                       <TableCell align="center">Phase {phaseNum}</TableCell>
//                       <TableCell align="center">{formatScore(lm)}</TableCell>
//                       <TableCell align="center">{formatScore(head)}</TableCell>
//                       <TableCell align="center">{formatScore(hr)}</TableCell>
//                       <TableCell align="center" sx={{ fontWeight: 'bold' }}>{formatScore(total)}</TableCell>
//                     </TableRow>
//                   );
//                 })}
//               </TableBody>
//             </Table>
//           </Paper>
//         </Grid>

//         {/* KPI Table */}
//         <Grid item xs={12} md={4}>
//           <Paper elevation={2}>
//             <Typography variant="subtitle1" align="center" sx={{ fontWeight: 600, bgcolor: "#eeeeee", py: 1 }}>
//               KPI Table
//             </Typography>
//             <Table size="small">
//               <TableHead>
//                 <TableRow sx={{ backgroundColor: "#9E9E9E" }}>
//                   {["KPI", "Target", "Achieve", "Rating"].map((col) => (
//                     <TableCell key={col} align="center" sx={{ color: "#fff", fontWeight: 600 }}>{col}</TableCell>
//                   ))}
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {kpiData && kpiData.length > 0 ? (
//                   kpiData.map((kpi, index) => (
//                     <TableRow key={`kpi-${index}`}>
//                       <TableCell align="center">{kpi.key}</TableCell>
//                       <TableCell align="center">{formatScore(kpi.yearly_target)}</TableCell>
//                       <TableCell align="center">{formatScore(kpi.yearly_achievements)}</TableCell>
//                       <TableCell align="center">{formatScore(kpi.finalscore)}</TableCell>
//                     </TableRow>
//                   ))
//                 ) : (
//                   <TableRow><TableCell colSpan={4} align="center">No KPI data found.</TableCell></TableRow>
//                 )}
//               </TableBody>
//             </Table>
//           </Paper>
//         </Grid>

//         {/* KRA Table */}
//         <Grid item xs={12} md={4}>
//           <Paper elevation={2}>
//             <Typography variant="subtitle1" align="center" sx={{ fontWeight: 600, bgcolor: "#eeeeee", py: 1 }}>
//               KRA Table
//             </Typography>
//             <Table size="small">
//               <TableHead>
//                 <TableRow sx={{ backgroundColor: "#9E9E9E" }}>
//                   {["KRA Parameter", "Total Rating"].map((col) => (
//                     <TableCell key={col} align="center" sx={{ color: "#fff", fontWeight: 600 }}>{col}</TableCell>
//                   ))}
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {kraData && kraData.length > 0 ? (
//                   kraData.map((kra, index) => (
//                     <TableRow key={`kra-${index}`}>
//                       <TableCell align="center">{kra.performance_driver}</TableCell>
//                       <TableCell align="center">{formatScore(kra.total_score)}</TableCell>
//                     </TableRow>
//                   ))
//                 ) : (
//                   <TableRow><TableCell colSpan={2} align="center">No KRA data found.</TableCell></TableRow>
//                 )}
//               </TableBody>
//             </Table>
//           </Paper>
//         </Grid>
//       </Grid>

//       {/* Fourth Table (Currently static, can be made dynamic) */}
//       <Box mt={3}>
//         <Paper elevation={2}>
//           <Typography variant="subtitle1" align="center" sx={{ fontWeight: 600, bgcolor: "#eeeeee", py: 1 }}>
//             Total
//           </Typography>
//           <Table size="small">
//             <TableHead>
//               <TableRow sx={{ backgroundColor: "#9E9E9E" }}>
//                 {["Performance analysis of P1 to P4", "KPI+KRA", "Average", "%Achievement"].map((col) => (
//                   <TableCell key={col} align="center" sx={{ color: "#fff", fontWeight: 600 }}>{col}</TableCell>
//                 ))}
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               <TableRow>
//                 <TableCell align="center">30</TableCell>
//                 <TableCell align="center">17.5</TableCell>
//                 <TableCell align="center">7.3</TableCell>
//                 <TableCell align="center">86%</TableCell>
//               </TableRow>
//             </TableBody>
//           </Table>
//         </Paper>
//       </Box>

//       {/* Comments Section (Read-Only) */}
//       <Box mt={3} px={2}>
//         <Grid container spacing={2}>
//           <Grid item xs={12} md={4}><TextField fullWidth label="Comment by LM" multiline rows={3} variant="outlined" value="Shows good leadership and team engagement." InputProps={{ readOnly: true }} /></Grid>
//           <Grid item xs={12} md={4}><TextField fullWidth label="Comment by Head" multiline rows={3} variant="outlined" value="Delivers consistent results under pressure." InputProps={{ readOnly: true }} /></Grid>
//           <Grid item xs={12} md={4}><TextField fullWidth label="Comment by HR" multiline rows={3} variant="outlined" value="Eligible for confirmation based on feedback." InputProps={{ readOnly: true }} /></Grid>
//         </Grid>
//         <Box display="flex" justifyContent="center" mt={3}>
//           <Button variant="contained" color="primary" onClick={handleSave}>Save Overall Analysis</Button>
//         </Box>
//       </Box>
//       <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
//         <Alert onClose={handleCloseSnackbar} severity="success" variant="filled" sx={{ width: "100%" }}>Progress Saved</Alert>
//       </Snackbar>
//     </Box>
//   );
// };

// export default OverallAnalysis;
// import React, { useState, useEffect, useMemo } from "react";
// import {
//   Typography,
//   Grid,
//   Table,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableBody,
//   Paper,
//   Box,
//   TextField,
//   Button,
//   Snackbar,
//   Alert,
//   CircularProgress,
// } from "@mui/material";
// import axiosInstance from "../../utils/axiosInstance";
// import axios from "axios";

// const OverallAnalysis = ({ userId, employeeVId }) => {
//   const [openSnackbar, setOpenSnackbar] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState("");
//   const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  
//   const [phaseData, setPhaseData] = useState(null);
//   const [kpiData, setKpiData] = useState(null);
//   const [kraData, setKraData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [isSaving, setIsSaving] = useState(false); // State for save button loading

//   // --- New State for Editable Comments ---
//   const [comments, setComments] = useState({
//     lm: "Shows good leadership and team engagement.",
//     head: "Delivers consistent results under pressure.",
//     hr: "Eligible for confirmation based on feedback.",
//   });

//   const [summaryData, setSummaryData] = useState({
//     performanceAnalysis: 0,
//     kpiKraTotal: 0,
//     average: 0,
//     achievementPercentage: 0,
//   });

//   useEffect(() => {
//     const fetchAllData = async () => {
//       if (!userId || !employeeVId) {
//         setError("Employee IDs are missing.");
//         setLoading(false);
//         return;
//       }
//       setLoading(true);
//       setError(null);
//       try {
//         const [phaseRes, kpiRes, kraRes] = await Promise.all([
//           axiosInstance.get(`apis/get_employee_overall_phasewise/?user_id=${userId}`),
//           axios.post('https://kpibackend.vetrinahealthcare.com/api/employee/kpiform/', { employee_id: employeeVId }),
//           axios.get(`https://kpibackend.vetrinahealthcare.com/api/employee-kra/${userId}/`)
//         ]);
        
//         if (phaseRes.data.status === 'success') setPhaseData(phaseRes.data.data);
//         if (kpiRes.data.kpis) setKpiData(kpiRes.data);
//         if (kraRes.data.status === true) setKraData(kraRes.data);
//       } catch (err) {
//         console.error("Failed to fetch overall analysis data:", err);
//         setError("Could not load all performance data. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchAllData();
//   }, [userId, employeeVId]);

//   useEffect(() => {
//     if (phaseData && kpiData && kraData) {
//       const phaseTotal = [1, 2, 3, 4].reduce((sum, phaseNum) => {
//         return sum + (phaseData[`phase${phaseNum}_lm`] || 0) + (phaseData[`phase${phaseNum}_head`] || 0) + (phaseData[`phase${phaseNum}_hr`] || 0);
//       }, 0);
//       const performanceAnalysis = phaseTotal / 4;

//       const kpiTotal = kpiData.kpis.reduce((sum, kpi) => sum + parseFloat(kpi.finalscore || 0), 0);
//       const kraTotal = kraData.data.reduce((sum, kra) => sum + parseFloat(kra.total_score || 0), 0);
//       const kpiKraTotal = kpiTotal + kraTotal;

//       const totalEntries = kpiData.kpis.length + kraData.data.length;
//       const average = totalEntries > 0 ? kpiKraTotal / totalEntries : 0;

//       const totalKpiAchieve = kpiData.kpis.reduce((sum, kpi) => sum + parseFloat(kpi.yearly_achievements || 0), 0);
//       const totalKpiTarget = kpiData.kpis.reduce((sum, kpi) => sum + parseFloat(kpi.yearly_target || 0), 0);
//       const achievementPercentage = totalKpiTarget > 0 ? (totalKpiAchieve / totalKpiTarget) * 100 : 0;
      
//       setSummaryData({ performanceAnalysis, kpiKraTotal, average, achievementPercentage });
//     }
//   }, [phaseData, kpiData, kraData]);

//   // --- NEW: Handler for comment text fields ---
//   const handleCommentChange = (commenter, value) => {
//     setComments(prev => ({
//       ...prev,
//       [commenter]: value,
//     }));
//   };
  
//   // --- MODIFIED: Implemented API call ---
//   const handleSave = async () => {
//     setIsSaving(true);
//     const payload = {
//       user_id: userId,
//       emp_id: employeeVId, // Assuming emp_id is the same as user_id for this payload
//       performance_analysis: summaryData.performanceAnalysis,
//       kra_kpi_total: summaryData.kpiKraTotal,
//       average: summaryData.average,
//       percent_achievement: summaryData.achievementPercentage,
//       comment_by_lm: comments.lm,
//       comment_by_head: comments.head,
//       comment_by_hr: comments.hr,
//     };

//     try {
//       await axiosInstance.post('https://tdtlworld.com/hrms-backend/apis/save_employee_overall_analysis/', payload);
//       setSnackbarMessage("Overall analysis saved successfully!");
//       setSnackbarSeverity("success");
//       setOpenSnackbar(true);
//     } catch (error) {
//       console.error("Error saving overall analysis:", error);
//       setSnackbarMessage("Failed to save analysis. Please try again.");
//       setSnackbarSeverity("error");
//       setOpenSnackbar(true);
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   const handleCloseSnackbar = () => { setOpenSnackbar(false); };

//   if (loading) {
//     return <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress /></Box>;
//   }
//   if (error) {
//     return <Alert severity="error" sx={{ m: 2 }}>{error}</Alert>;
//   }
  
//   const formatScore = (score) => score ? parseFloat(score).toFixed(2) : 'N/A';

//   return (
//     <Box>
//       <Typography variant="h6" align="center" gutterBottom>
//         Overall Analysis for {phaseData?.full_name || `Employee ID: ${userId}`}
//       </Typography>

//       <Grid container spacing={2}>
//         <Grid item xs={12} md={4}>
//           <Paper elevation={2}>
//             <Typography variant="subtitle1" align="center" sx={{ fontWeight: 600, bgcolor: "#eeeeee", py: 1 }}>PhaseWise Performance</Typography>
//             <Table size="small">
//               <TableHead>
//                 <TableRow sx={{ backgroundColor: "#9E9E9E" }}>{["Phase", "LM", "H", "HR", "Total"].map((col) => (<TableCell key={col} align="center" sx={{ color: "#fff", fontWeight: 600 }}>{col}</TableCell>))}</TableRow>
//               </TableHead>
//               <TableBody>
//                 {phaseData && [1, 2, 3, 4].map(phaseNum => {
//                   const lm = phaseData[`phase${phaseNum}_lm`] || 0;
//                   const head = phaseData[`phase${phaseNum}_head`] || 0;
//                   const hr = phaseData[`phase${phaseNum}_hr`] || 0;
//                   const total = lm + head + hr;
//                   return (
//                     <TableRow key={`phase-${phaseNum}`}>
//                       <TableCell align="center">Phase {phaseNum}</TableCell>
//                       <TableCell align="center">{formatScore(lm)}</TableCell>
//                       <TableCell align="center">{formatScore(head)}</TableCell>
//                       <TableCell align="center">{formatScore(hr)}</TableCell>
//                       <TableCell align="center" sx={{ fontWeight: 'bold' }}>{formatScore(total)}</TableCell>
//                     </TableRow>
//                   );
//                 })}
//               </TableBody>
//             </Table>
//           </Paper>
//         </Grid>
//         <Grid item xs={12} md={4}>
//           <Paper elevation={2}>
//             <Typography variant="subtitle1" align="center" sx={{ fontWeight: 600, bgcolor: "#eeeeee", py: 1 }}>KPI Table</Typography>
//             <Table size="small">
//               <TableHead>
//                 <TableRow sx={{ backgroundColor: "#9E9E9E" }}>{["KPI", "Target", "Achieve", "Rating"].map((col) => (<TableCell key={col} align="center" sx={{ color: "#fff", fontWeight: 600 }}>{col}</TableCell>))}</TableRow>
//               </TableHead>
//               <TableBody>
//                 {kpiData?.kpis?.length > 0 ? (
//                   kpiData.kpis.map((kpi, index) => (
//                     <TableRow key={`kpi-${index}`}>
//                       <TableCell align="center">{kpi.key}</TableCell>
//                       <TableCell align="center">{formatScore(kpi.yearly_target)}</TableCell>
//                       <TableCell align="center">{formatScore(kpi.yearly_achievements)}</TableCell>
//                       <TableCell align="center">{formatScore(kpi.finalscore)}</TableCell>
//                     </TableRow>
//                   ))
//                 ) : (<TableRow><TableCell colSpan={4} align="center">No KPI data found.</TableCell></TableRow>)}
//               </TableBody>
//             </Table>
//           </Paper>
//         </Grid>
//         <Grid item xs={12} md={4}>
//           <Paper elevation={2}>
//             <Typography variant="subtitle1" align="center" sx={{ fontWeight: 600, bgcolor: "#eeeeee", py: 1 }}>KRA Table</Typography>
//             <Table size="small">
//               <TableHead>
//                 <TableRow sx={{ backgroundColor: "#9E9E9E" }}>{["KRA Parameter", "Total Rating"].map((col) => (<TableCell key={col} align="center" sx={{ color: "#fff", fontWeight: 600 }}>{col}</TableCell>))}</TableRow>
//               </TableHead>
//               <TableBody>
//                 {kraData?.data?.length > 0 ? (
//                   kraData.data.map((kra, index) => (
//                     <TableRow key={`kra-${index}`}>
//                       <TableCell align="center">{kra.performance_driver}</TableCell>
//                       <TableCell align="center">{formatScore(kra.total_score)}</TableCell>
//                     </TableRow>
//                   ))
//                 ) : (<TableRow><TableCell colSpan={2} align="center">No KRA data found.</TableCell></TableRow>)}
//               </TableBody>
//             </Table>
//           </Paper>
//         </Grid>
//       </Grid>
//       <Box mt={3}>
//         <Paper elevation={2}>
//           <Typography variant="subtitle1" align="center" sx={{ fontWeight: 600, bgcolor: "#eeeeee", py: 1 }}>Total</Typography>
//           <Table size="small">
//             <TableHead>
//               <TableRow sx={{ backgroundColor: "#9E9E9E" }}>{["Performance analysis of P1 to P4", "KPI+KRA", "Average", "%Achievement"].map((col) => (<TableCell key={col} align="center" sx={{ color: "#fff", fontWeight: 600 }}>{col}</TableCell>))}</TableRow>
//             </TableHead>
//             <TableBody>
//               <TableRow>
//                 <TableCell align="center">{formatScore(summaryData.performanceAnalysis)}</TableCell>
//                 <TableCell align="center">{formatScore(summaryData.kpiKraTotal)}</TableCell>
//                 <TableCell align="center">{formatScore(summaryData.average)}</TableCell>
//                 <TableCell align="center">{formatScore(summaryData.achievementPercentage)}%</TableCell>
//               </TableRow>
//             </TableBody>
//           </Table>
//         </Paper>
//       </Box>
//       <Box mt={3} px={2}>
//         <Grid container spacing={2}>
//           <Grid item xs={12} md={4}>
//             <TextField fullWidth label="Comment by LM" multiline rows={3} variant="outlined" 
//               value={comments.lm} onChange={(e) => handleCommentChange('lm', e.target.value)} />
//           </Grid>
//           <Grid item xs={12} md={4}>
//             <TextField fullWidth label="Comment by Head" multiline rows={3} variant="outlined" 
//               value={comments.head} onChange={(e) => handleCommentChange('head', e.target.value)} />
//           </Grid>
//           <Grid item xs={12} md={4}>
//             <TextField fullWidth label="Comment by HR" multiline rows={3} variant="outlined" 
//               value={comments.hr} onChange={(e) => handleCommentChange('hr', e.target.value)} />
//           </Grid>
//         </Grid>
//         <Box display="flex" justifyContent="center" mt={3}>
//           <Button variant="contained" color="primary" onClick={handleSave} disabled={isSaving}>
//             {isSaving ? <CircularProgress size={24} color="inherit" /> : 'Save Overall Analysis'}
//           </Button>
//         </Box>
//       </Box>
//       <Snackbar open={openSnackbar} autoHideDuration={4000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
//         <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} variant="filled" sx={{ width: "100%" }}>
//           {snackbarMessage}
//         </Alert>
//       </Snackbar>
//     </Box>
//   );
// };

// export default OverallAnalysis;






import React, { useState, useEffect, useMemo } from "react";
import {
  Typography,
  Grid,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Box,
  TextField,
  Button,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";
import axiosInstance from "../../utils/axiosInstance";
import axios from "axios";

const OverallAnalysis = ({ userId, employeeVId }) => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const [phaseData, setPhaseData] = useState(null);
  const [kpiData, setKpiData] = useState(null);
  const [kraData, setKraData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSaving, setIsSaving] = useState(false); // State for save button loading

  // --- New State for Editable Comments ---
  const [comments, setComments] = useState({
    lm: "Shows good leadership and team engagement.",
    head: "Delivers consistent results under pressure.",
    hr: "Eligible for confirmation based on feedback.",
  });

  const [summaryData, setSummaryData] = useState({
    performanceAnalysis: 0,
    kpiKraTotal: 0,
    average: 0,
    achievementPercentage: 0,
  });

  // --- New state for the "All Total" table ---
  const [allTotalData, setAllTotalData] = useState({
    fourAeeProgram: 0,
    fourAeeProgramAchieve: 0,
    kraKpi: 0,
    kraKpiAchieve: 0,
    total: 0,
    totalAchieve: 0,
  });

  useEffect(() => {
    const fetchAllData = async () => {
      if (!userId || !employeeVId) {
        setError("Employee IDs are missing.");
        setLoading(false);
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const [phaseRes, kpiRes, kraRes] = await Promise.all([
          axiosInstance.get(`apis/get_employee_overall_phasewise/?user_id=${userId}`),
          axios.post('https://kpibackend.vetrinahealthcare.com/api/employee/kpiform/', { employee_id: employeeVId }),
          axios.get(`https://kpibackend.vetrinahealthcare.com/api/employee-kra/${userId}/`)
        ]);

        if (phaseRes.data.status === 'success') setPhaseData(phaseRes.data.data);
        if (kpiRes.data.kpis) setKpiData(kpiRes.data);
        if (kraRes.data.status === true) setKraData(kraRes.data);
      } catch (err) {
        console.error("Failed to fetch overall analysis data:", err);
        setError("Could not load all performance data. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchAllData();
  }, [userId, employeeVId]);

  useEffect(() => {
    if (phaseData && kpiData && kraData) {
      const phaseTotal = [1, 2, 3, 4].reduce((sum, phaseNum) => {
        return sum + (phaseData[`phase${phaseNum}_lm`] || 0) + (phaseData[`phase${phaseNum}_head`] || 0) + (phaseData[`phase${phaseNum}_hr`] || 0);
      }, 0);
      const performanceAnalysis = phaseTotal / 4;

      const kpiTotal = kpiData.kpis.reduce((sum, kpi) => sum + parseFloat(kpi.finalscore || 0), 0);
      const kraTotal = kraData.data.reduce((sum, kra) => sum + parseFloat(kra.total_score || 0), 0);
      const kpiKraTotal = kpiTotal + kraTotal;

      const totalEntries = kpiData.kpis.length + kraData.data.length;
      const average = totalEntries > 0 ? kpiKraTotal / totalEntries : 0;

      const totalKpiAchieve = kpiData.kpis.reduce((sum, kpi) => sum + parseFloat(kpi.yearly_achievements || 0), 0);
      const totalKpiTarget = kpiData.kpis.reduce((sum, kpi) => sum + parseFloat(kpi.yearly_target || 0), 0);
      const achievementPercentage = totalKpiTarget > 0 ? (totalKpiAchieve / totalKpiTarget) * 100 : 0;

      setSummaryData({ performanceAnalysis, kpiKraTotal, average, achievementPercentage });

      // --- Calculations for the new "All Total" table ---
      const fourAeeProgram = performanceAnalysis; // Or any other logic for "4AEE Program"
      const kraKpi = kpiKraTotal;
      const total = fourAeeProgram + kraKpi;

      // Assuming achievement for 4AEE is also based on the overall achievement percentage for now
      const fourAeeProgramAchieve = achievementPercentage;
      const kraKpiAchieve = achievementPercentage;
      const totalAchieve = (fourAeeProgramAchieve + kraKpiAchieve) / 2; // Example: average of the two

      setAllTotalData({
        fourAeeProgram,
        fourAeeProgramAchieve,
        kraKpi,
        kraKpiAchieve,
        total,
        totalAchieve
      });
    }
  }, [phaseData, kpiData, kraData]);

  // --- NEW: Handler for comment text fields ---
  const handleCommentChange = (commenter, value) => {
    setComments(prev => ({
      ...prev,
      [commenter]: value,
    }));
  };

  // --- MODIFIED: Implemented API call ---
  const handleSave = async () => {
    setIsSaving(true);
    const payload = {
      user_id: userId,
      emp_id: employeeVId, // Assuming emp_id is the same as user_id for this payload
      performance_analysis: summaryData.performanceAnalysis,
      kra_kpi_total: summaryData.kpiKraTotal,
      average: summaryData.average,
      percent_achievement: summaryData.achievementPercentage,
      comment_by_lm: comments.lm,
      comment_by_head: comments.head,
      comment_by_hr: comments.hr,
    };

    try {
      await axiosInstance.post('https://tdtlworld.com/hrms-backend/apis/save_employee_overall_analysis/', payload);
      setSnackbarMessage("Overall analysis saved successfully!");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
    } catch (error) {
      console.error("Error saving overall analysis:", error);
      setSnackbarMessage("Failed to save analysis. Please try again.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCloseSnackbar = () => { setOpenSnackbar(false); };

  if (loading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress /></Box>;
  }
  if (error) {
    return <Alert severity="error" sx={{ m: 2 }}>{error}</Alert>;
  }

  const formatScore = (score) => score ? parseFloat(score).toFixed(2) : 'N/A';

  return (
    <Box>
      <Typography variant="h6" align="center" gutterBottom>
        Overall Analysis for {phaseData?.full_name || `Employee ID: ${userId}`}
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Paper elevation={2}>
            <Typography variant="subtitle1" align="center" sx={{ fontWeight: 600, bgcolor: "#eeeeee", py: 1 }}>PhaseWise Performance</Typography>
            <Table size="small">
              <TableHead>
                <TableRow sx={{ backgroundColor: "#9E9E9E" }}>{["Phase", "LM", "H", "HR", "Total"].map((col) => (<TableCell key={col} align="center" sx={{ color: "#fff", fontWeight: 600 }}>{col}</TableCell>))}</TableRow>
              </TableHead>
              <TableBody>
                {phaseData && [1, 2, 3, 4].map(phaseNum => {
                  const lm = phaseData[`phase${phaseNum}_lm`] || 0;
                  const head = phaseData[`phase${phaseNum}_head`] || 0;
                  const hr = phaseData[`phase${phaseNum}_hr`] || 0;
                  const total = lm + head + hr;
                  return (
                    <TableRow key={`phase-${phaseNum}`}>
                      <TableCell align="center">Phase {phaseNum}</TableCell>
                      <TableCell align="center">{formatScore(lm)}</TableCell>
                      <TableCell align="center">{formatScore(head)}</TableCell>
                      <TableCell align="center">{formatScore(hr)}</TableCell>
                      <TableCell align="center" sx={{ fontWeight: 'bold' }}>{formatScore(total)}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper elevation={2}>
            <Typography variant="subtitle1" align="center" sx={{ fontWeight: 600, bgcolor: "#eeeeee", py: 1 }}>KPI Table</Typography>
            <Table size="small">
              <TableHead>
                <TableRow sx={{ backgroundColor: "#9E9E9E" }}>{["KPI", "Target", "Achieve", "Rating"].map((col) => (<TableCell key={col} align="center" sx={{ color: "#fff", fontWeight: 600 }}>{col}</TableCell>))}</TableRow>
              </TableHead>
              <TableBody>
                {kpiData?.kpis?.length > 0 ? (
                  kpiData.kpis.map((kpi, index) => (
                    <TableRow key={`kpi-${index}`}>
                      <TableCell align="center">{kpi.key}</TableCell>
                      <TableCell align="center">{formatScore(kpi.yearly_target)}</TableCell>
                      <TableCell align="center">{formatScore(kpi.yearly_achievements)}</TableCell>
                      <TableCell align="center">{formatScore(kpi.finalscore)}</TableCell>
                    </TableRow>
                  ))
                ) : (<TableRow><TableCell colSpan={4} align="center">No KPI data found.</TableCell></TableRow>)}
              </TableBody>
            </Table>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper elevation={2}>
            <Typography variant="subtitle1" align="center" sx={{ fontWeight: 600, bgcolor: "#eeeeee", py: 1 }}>KRA Table</Typography>
            <Table size="small">
              <TableHead>
                <TableRow sx={{ backgroundColor: "#9E9E9E" }}>{["KRA Parameter", "Total Rating"].map((col) => (<TableCell key={col} align="center" sx={{ color: "#fff", fontWeight: 600 }}>{col}</TableCell>))}</TableRow>
              </TableHead>
              <TableBody>
                {kraData?.data?.length > 0 ? (
                  kraData.data.map((kra, index) => (
                    <TableRow key={`kra-${index}`}>
                      <TableCell align="center">{kra.performance_driver}</TableCell>
                      <TableCell align="center">{formatScore(kra.total_score)}</TableCell>
                    </TableRow>
                  ))
                ) : (<TableRow><TableCell colSpan={2} align="center">No KRA data found.</TableCell></TableRow>)}
              </TableBody>
            </Table>
          </Paper>
        </Grid>
      </Grid>
      <Box mt={3}>
        <Paper elevation={2}>
          <Typography variant="subtitle1" align="center" sx={{ fontWeight: 600, bgcolor: "#eeeeee", py: 1 }}>Total</Typography>
          <Table size="small">
            <TableHead>
              <TableRow sx={{ backgroundColor: "#9E9E9E" }}>{["Performance analysis of P1 to P4", "KPI+KRA", "Average", "%Achievement"].map((col) => (<TableCell key={col} align="center" sx={{ color: "#fff", fontWeight: 600 }}>{col}</TableCell>))}</TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell align="center">{formatScore(summaryData.performanceAnalysis)}</TableCell>
                <TableCell align="center">{formatScore(summaryData.kpiKraTotal)}</TableCell>
                <TableCell align="center">{formatScore(summaryData.average)}</TableCell>
                <TableCell align="center">{formatScore(summaryData.achievementPercentage)}%</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Paper>
      </Box>

      {/* --- NEW All Total Table --- */}
      <Box mt={3}>
        <Paper elevation={2}>
          <Typography variant="subtitle1" align="center" sx={{ fontWeight: 600, bgcolor: "#eeeeee", py: 1 }}>All Total</Typography>
          <Table size="small">
            <TableHead>
              <TableRow sx={{ backgroundColor: "#9E9E9E" }}>
                <TableCell align="center" sx={{ color: "#fff", fontWeight: 600 }}>4AEE Program</TableCell>
                <TableCell align="center" sx={{ color: "#fff", fontWeight: 600 }}>% achieve</TableCell>
                <TableCell align="center" sx={{ color: "#fff", fontWeight: 600 }}>KRA/KPI</TableCell>
                <TableCell align="center" sx={{ color: "#fff", fontWeight: 600 }}>% achieve</TableCell>
                <TableCell align="center" sx={{ color: "#fff", fontWeight: 600 }}>Total</TableCell>
                <TableCell align="center" sx={{ color: "#fff", fontWeight: 600 }}>% achieve</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell align="center">{formatScore(allTotalData.fourAeeProgram)}</TableCell>
                <TableCell align="center">{formatScore(allTotalData.fourAeeProgramAchieve)}%</TableCell>
                <TableCell align="center">{formatScore(allTotalData.kraKpi)}</TableCell>
                <TableCell align="center">{formatScore(allTotalData.kraKpiAchieve)}%</TableCell>
                <TableCell align="center">{formatScore(allTotalData.total)}</TableCell>
                <TableCell align="center">{formatScore(allTotalData.totalAchieve)}%</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Paper>
      </Box>

      <Box mt={3} px={2}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <TextField fullWidth label="Comment by LM" multiline rows={3} variant="outlined"
              value={comments.lm} onChange={(e) => handleCommentChange('lm', e.target.value)} />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField fullWidth label="Comment by Head" multiline rows={3} variant="outlined"
              value={comments.head} onChange={(e) => handleCommentChange('head', e.target.value)} />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField fullWidth label="Comment by HR" multiline rows={3} variant="outlined"
              value={comments.hr} onChange={(e) => handleCommentChange('hr', e.target.value)} />
          </Grid>
        </Grid>
        <Box display="flex" justifyContent="center" mt={3}>
          <Button variant="contained" color="primary" onClick={handleSave} disabled={isSaving}>
            {isSaving ? <CircularProgress size={24} color="inherit" /> : 'Save Overall Analysis'}
          </Button>
        </Box>
      </Box>
      <Snackbar open={openSnackbar} autoHideDuration={4000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} variant="filled" sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default OverallAnalysis;