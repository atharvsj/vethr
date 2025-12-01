

// import { useState, useEffect } from "react"
// import {
//   Box,
//   Typography,
//   Button,
//   Paper,
//   Grid,
//   useTheme,
//   Icon,
//   Snackbar,
//   Alert,
// } from "@mui/material"
// import { styled } from "@mui/material/styles"
// import {
//   PieChart,
//   Pie,
//   Cell,
//   ResponsiveContainer,
//   LineChart,
//   XAxis,
//   YAxis,
//   CartesianGrid,
// } from "recharts"
// import { useNavigate } from "react-router-dom"
// import axios from "axios"

// // Icons
// import AttachMoneyIcon from "@mui/icons-material/AttachMoney"
// import SpeedIcon from "@mui/icons-material/Speed"
// import LabelIcon from "@mui/icons-material/Label"
// import ArrowForwardIcon from "@mui/icons-material/ArrowForward"
// import MoreTimeIcon from '@mui/icons-material/MoreTime';

// // --- HELPER FUNCTIONS ---
// const getCurrentLocation = () => {
//   return new Promise((resolve, reject) => {
//     if (!navigator.geolocation) {
//       return reject(new Error("Geolocation is not supported by your browser."));
//     }
//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         resolve({
//           latitude: position.coords.latitude,
//           longitude: position.coords.longitude,
//         });
//       },
//       () => {
//         reject(new Error("Unable to retrieve your location. Please grant permission and try again."));
//       }
//     );
//   });
// };

// // --- STYLED COMPONENTS (UNCHANGED) ---
// const CardPaper = styled(Paper)(({ theme }) => ({
//   padding: theme.spacing(2),
//   display: "flex",
//   flexDirection: "column",
//   justifyContent: "space-between",
//   height: "100%",
//   borderRadius: "8px",
//   boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
// }));

// const InfoCard = ({ title, value, icon, bgColor, textColor }) => {
//   const theme = useTheme();
//   const defaultBgColor = theme.palette.background.paper;
//   const defaultTextColor = theme.palette.text.primary;

//   return (
//     <CardPaper sx={{ backgroundColor: bgColor || defaultBgColor }}>
//       <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//         <Box>
//           <Typography variant="subtitle1" sx={{ color: textColor || defaultTextColor }}>
//             {title}
//           </Typography>
//           <Typography variant="h4" component="p" sx={{ fontWeight: "bold", color: textColor || defaultTextColor }}>
//             {value}
//           </Typography>
//         </Box>
//         <Icon sx={{ fontSize: 32, color: textColor || "primary" }}>{icon}</Icon>
//       </Box>
//     </CardPaper>
//   );
// };

// const StatusLegend = ({ items }) => (
//   <Box>
//     {items.map((item, index) => (
//       <Box key={index} sx={{ display: "flex", alignItems: "center", mb: 0.5 }}>
//         <Box
//           sx={{
//             width: 12,
//             height: 12,
//             borderRadius: "50%",
//             backgroundColor: item.color,
//             mr: 1,
//           }}
//         />
//         <Typography variant="body2" color="text.secondary">
//           {item.label}
//         </Typography>
//       </Box>
//     ))}
//   </Box>
// );

// // --- CONSTANTS ---
// const ticketLegendItems = [
//   { color: "#FFA726", label: "Low" },
//   { color: "#FFB74D", label: "Medium" },
//   { color: "#FF7043", label: "High" },
//   { color: "#FFEE58", label: "Critical" },
// ];

// const priorityColorMap = ticketLegendItems.reduce((acc, item) => {
//   acc[item.label] = item.color;
//   return acc;
// }, {});

// const payrollChartData = [
//   { name: "Jul 2024", value: null }, { name: "Aug 2024", value: null },
//   { name: "Sep 2024", value: null }, { name: "Oct 2024", value: null },
//   { name: "Nov 2024", value: null }, { name: "Dec 2024", value: null },
//   { name: "Jan 2025", value: null }, { name: "Feb 2025", value: null },
//   { name: "Mar 2025", value: null }, { name: "Apr 2025", value: null },
//   { name: "May 2025", value: null }, { name: "Jun 2025", value: null },
// ];

// // --- MAIN COMPONENT ---
// export default function Dashboard() {
//   const blueColor = "#ff823aff";
//   const [userName, setUserName] = useState("");
//   const [isLoading, setIsLoading] = useState(false); // For punch actions
//   const [isPageLoading, setIsPageLoading] = useState(true); // For initial data load
//   const navigate = useNavigate();
//   const [punchedIn, setPunchedIn] = useState(false);
//   const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "info" });

//   const [punchInTime, setPunchInTime] = useState(null);
//   const [punchOutTime, setPunchOutTime] = useState(null);

//   const [dashboardStats, setDashboardStats] = useState({
//     leaveCount: 0,
//     lateMarkCount: 0,
//     awardCount: 0,
//     assetCount: 0,
//     ticketPriorityData: [],
//   });

//   useEffect(() => {
//     const fetchDashboardData = async () => {
//       setIsPageLoading(true);
//       const accessToken = localStorage.getItem("accessToken");
//       // *** CRITICAL: Get BOTH employee identifiers from localStorage ***
//       const employeeCode = localStorage.getItem("loggedInUser"); // e.g., "V0921"
//       const numericEmpId = localStorage.getItem("loggedInEmpId"); // e.g., 37

//       if (!accessToken || !employeeCode || !numericEmpId) {
//         setUserName("User");
//         setSnackbar({ open: true, message: "Authentication details missing. Please log in again.", severity: "error" });
//         setIsPageLoading(false);
//         return;
//       }

//       try {
//         const [userResponse, statsResponse] = await Promise.all([
//           axios.get("https://tdtlworld.com/hrms-backend/api/dropdown/employee-role/", {
//             headers: { Authorization: `Bearer ${accessToken}` },
//           }),
//           // *** FIX: Use the alphanumeric employeeCode for the dashboard API ***
//           axios.get(`https://tdtlworld.com/hrms-backend/empdashboard/${employeeCode}/`, {
//             headers: { Authorization: `Bearer ${accessToken}` },
//           })
//         ]);

//         // Use the numeric ID to find the user's name from the list
//         const currentUser = userResponse.data.find((emp) => String(emp.id) === String(numericEmpId));
//         setUserName(currentUser?.employee_name || "User");

//         const statsData = statsResponse.data;
//         const tickets = statsData.support_tickets?.data || [];
//         const totalTickets = tickets.length;
//         const priorityCounts = tickets.reduce((acc, ticket) => {
//             acc[ticket.priority] = (acc[ticket.priority] || 0) + 1;
//             return acc;
//         }, {});

//         const newTicketPriorityData = Object.entries(priorityCounts).map(([name, count]) => ({
//             name,
//             value: totalTickets > 0 ? parseFloat(((count / totalTickets) * 100).toFixed(1)) : 0,
//         }));

//         setDashboardStats({
//           leaveCount: statsData.leave_days_taken || 0,
//           lateMarkCount: statsData.late_mark_count || 0,
//           awardCount: statsData.award_count || 0,
//           assetCount: statsData.asset_count || 0,
//           ticketPriorityData: newTicketPriorityData,
//         });

//       } catch (error) {
//         console.error("Failed to fetch dashboard data:", error);
//         setSnackbar({ open: true, message: "Failed to load dashboard data.", severity: "error" });
//         setUserName("User");
//       } finally {
//         setIsPageLoading(false);
//       }
//     };
//     fetchDashboardData();
//   }, []);

//   useEffect(() => {
//     const loadInitialPunchState = () => {
//       const savedPunchStatus = localStorage.getItem("punchedInStatus");
//       const isPunchedIn = savedPunchStatus ? JSON.parse(savedPunchStatus) : false;
//       setPunchedIn(isPunchedIn);
//       if (isPunchedIn) {
//         setPunchInTime(localStorage.getItem("punchInTime"));
//       } else {
//         setPunchOutTime(localStorage.getItem("punchOutTime"));
//       }
//     };
//     loadInitialPunchState();
//   }, []);

//   const getFormattedDateTimeForAPI = () => {
//     return new Date().toLocaleString('en-US', { 
//         year: 'numeric', month: 'short', day: 'numeric', 
//         hour: '2-digit', minute: '2-digit', second: '2-digit' 
//     });
//   };

//   const getISODateTimeForAPI = () => {
//     return new Date().toISOString().slice(0, 19).replace('T', ' ');
//   };

//   const handleCloseSnackbar = (event, reason) => {
//     if (reason === 'clickaway') return;
//     setSnackbar({ ...snackbar, open: false });
//   };

//   const handlePunch = async (punchType) => {
//     if ((punchType === "IN" && punchedIn) || (punchType === "OUT" && !punchedIn)) {
//         setSnackbar({ open: true, message: punchType === "IN" ? "You are already punched in." : "You must punch in first.", severity: "warning" });
//         return;
//     }

//     setIsLoading(true);
//     let locationString = "Location not available";
//     try {
//         const { latitude, longitude } = await getCurrentLocation();
//         locationString = `Lat: ${latitude.toFixed(5)}, Lon: ${longitude.toFixed(5)}`;
//     } catch (error) {
//         setSnackbar({ open: true, message: error.message, severity: "warning" });
//     }

//     const accessToken = localStorage.getItem("accessToken");
//     // *** CRITICAL FIX: Use the correct employee ID for the punch-in API ***
//     // The API expects the alphanumeric code (e.g., "V0921"), not the numeric ID.
//     const employeeCodeForPunch = localStorage.getItem("loggedInUser");

//     if (!accessToken || !employeeCodeForPunch) {
//         setSnackbar({ open: true, message: "Authentication details not found. Please log in again.", severity: "error" });
//         setIsLoading(false);
//         return;
//     }

//     const payload = {
//         emp_id: employeeCodeForPunch, // Use the correct ID here
//         punch_time: getISODateTimeForAPI(),
//         punch_type: punchType,
//         location: locationString,
//     };

//     try {
//         await axios.post(
//             "https://tdtlworld.com/hrms-backend/api/employee_attendance/",
//             payload,
//             { headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" } }
//         );

//         const newPunchedInStatus = punchType === "IN";
//         setPunchedIn(newPunchedInStatus);
//         localStorage.setItem("punchedInStatus", JSON.stringify(newPunchedInStatus));

//         const displayTime = getFormattedDateTimeForAPI();
//         if (punchType === "IN") {
//             setPunchInTime(displayTime);
//             localStorage.setItem("punchInTime", displayTime);
//             setPunchOutTime(null);
//             localStorage.removeItem("punchOutTime");
//         } else {
//             setPunchOutTime(displayTime);
//             localStorage.setItem("punchOutTime", displayTime);
//         }

//         setSnackbar({ open: true, message: `Successfully Punched ${punchType === 'IN' ? 'In' : 'Out'}!`, severity: "success" });

//     } catch (error) {
//         console.error("Punch API Call Failed:", error.response || error);
//         let errorMessage = error.response?.data?.error || "An unknown error occurred during punch.";
//         if (error.response?.status === 404) {
//             errorMessage = "Employee not found. Please check your login details."
//         }
//         setSnackbar({ open: true, message: errorMessage, severity: "error" });
//     } finally {
//         setIsLoading(false);
//     }
//   }

//   return (
//     <Box sx={{ p: { xs: 2, md: 3 } }}>
//       <Snackbar
//         open={snackbar.open}
//         autoHideDuration={6000}
//         onClose={handleCloseSnackbar}
//         anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
//       >
//         <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }} variant="filled">
//           {snackbar.message}
//         </Alert>
//       </Snackbar>

//       <Grid container spacing={3}>
//         <Grid item xs={12} lg={7}>
//           <Grid container spacing={3}>
//             {/* Welcome Header */}
//             <Grid item xs={12}>
//               <Paper sx={{ p: 2, borderRadius: "8px" }}>
//                 <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
//                   <Box>
//                     <Typography variant="h6">Welcome {userName}</Typography>
//                     <Typography variant="body2" color="text.secondary">
//                       My Shift: 09:00 am To 06:00 pm
//                     </Typography>
//                   </Box>
//                   <Box sx={{ display: "flex", gap: 2 }}>
//                     <Button
//                       variant="contained"
//                       onClick={() => handlePunch("IN")}
//                       disabled={isLoading || punchedIn}
//                       sx={{
//                         backgroundColor: "#4CAF50", color: "white", textTransform: "none",
//                         "&:hover": { backgroundColor: "#43A047" },
//                         "&.Mui-disabled": { backgroundColor: "#A5D6A7", color: "rgba(0, 0, 0, 0.26)" }
//                       }}
//                     >
//                       {isLoading && !punchedIn ? "..." : "Punch In"}
//                     </Button>
//                     <Button
//                       variant="contained"
//                       onClick={() => handlePunch("OUT")}
//                       disabled={isLoading || !punchedIn}
//                       sx={{
//                         backgroundColor: "#F44336", color: "white", textTransform: "none",
//                         "&:hover": { backgroundColor: "#E53935" },
//                         "&.Mui-disabled": { backgroundColor: "#EF9A9A", color: "rgba(0, 0, 0, 0.26)" }
//                       }}
//                     >
//                       {isLoading && punchedIn ? "..." : "Punch Out"}
//                     </Button>
//                   </Box>
//                 </Box>
//                 <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2, px: 1, borderTop: '1px solid #eee', pt: 2, minHeight: '24px' }}>
//                   <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
//                     {punchInTime ? `Punched In: ${punchInTime}` : 'Not punched in today'}
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
//                     {punchOutTime ? `Punched Out: ${punchOutTime}` : ''}
//                   </Typography>
//                 </Box>
//               </Paper>
//             </Grid>

//             {/* My Attendance Link */}
//             <Grid item xs={12}>
//               <Paper sx={{ p: 1.5, display: "flex", justifyContent: "space-between", alignItems: "center", bgcolor: blueColor, color: "white", borderRadius: "8px" }}>
//                 <Button sx={{ color: "white", textTransform: "none" }} endIcon={<ArrowForwardIcon />} onClick={() => navigate('/hrms/dashboard/attendance')}>
//                   My Attendance
//                 </Button>
//               </Paper>
//             </Grid>

//             <Grid item xs={12} sm={6}>
//               <InfoCard title="My Awards" value={isPageLoading ? '...' : dashboardStats.awardCount} icon={<AttachMoneyIcon />} bgColor={blueColor} textColor="white" />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <InfoCard title="Total Assets" value={isPageLoading ? '...' : dashboardStats.assetCount} icon={<SpeedIcon />} />
//             </Grid>

//             <Grid item xs={12}>
//               <CardPaper>
//                 <Typography variant="h6" gutterBottom>Ticket Priority</Typography>
//                 <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
//                   <Box sx={{ width: 150, height: 150 }}>
//                     <ResponsiveContainer>
//                       <PieChart>
//                         <Pie
//                           data={dashboardStats.ticketPriorityData} cx="50%" cy="50%" innerRadius={40}
//                           outerRadius={60} dataKey="value" label={({ value }) => `${value}%`}
//                           labelLine={false}
//                           isAnimationActive={!isPageLoading}
//                         >
//                           {dashboardStats.ticketPriorityData.map((entry) => (
//                             <Cell key={`cell-${entry.name}`} fill={priorityColorMap[entry.name] || '#CCCCCC'} />
//                           ))}
//                         </Pie>
//                       </PieChart>
//                     </ResponsiveContainer>
//                   </Box>
//                   <Box sx={{ ml: 4 }}>
//                     <StatusLegend items={ticketLegendItems} />
//                   </Box>
//                 </Box>
//               </CardPaper>
//             </Grid>
//           </Grid>
//         </Grid>

//         {/* Right Column */}
//         <Grid item xs={12} lg={5}>
//           <Grid container spacing={3}>
//             <Grid item xs={12} sm={6}>
//               <InfoCard title="My Leave" value={isPageLoading ? '...' : dashboardStats.leaveCount} icon={<LabelIcon />} />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <InfoCard title="Late Mark" value={isPageLoading ? '...' : dashboardStats.lateMarkCount} icon={<MoreTimeIcon />} bgColor={blueColor} textColor="white" />
//             </Grid>

//             <Grid item xs={12}>
//               <CardPaper>
//                 <Typography variant="h6">My Payroll monthly report</Typography>
//                 <Box sx={{ display: "flex", gap: 4, my: 2 }}>
//                   <Box>
//                     <Typography variant="h5" sx={{ fontWeight: "bold" }}>₹0.00</Typography>
//                     <Typography variant="body2" color="text.secondary">Total</Typography>
//                   </Box>
//                   <Box>
//                     <Typography variant="h5" sx={{ fontWeight: "bold" }}>₹0.00</Typography>
//                     <Typography variant="body2" color="text.secondary">This Month</Typography>
//                   </Box>
//                 </Box>
//                 <Box sx={{ height: 250, width: "100%", mt: 2, ".recharts-wrapper": { ml: -1 } }}>
//                   <ResponsiveContainer>
//                     <LineChart data={payrollChartData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
//                       <CartesianGrid stroke="#e0e0e0" strokeDasharray="5 5" vertical={false} />
//                       <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#666' }} axisLine={false} tickLine={false} />
//                       <YAxis
//                         domain={[0, 5]} ticks={[0.0, 1.0, 2.0, 3.0, 4.0, 5.0]}
//                         tickFormatter={(tick) => tick.toFixed(1)} tick={{ fontSize: 12, fill: '#666' }}
//                         axisLine={false} tickLine={false}
//                       />
//                     </LineChart>
//                   </ResponsiveContainer>
//                 </Box>
//               </CardPaper>
//             </Grid>
//           </Grid>
//         </Grid>
//       </Grid>
//     </Box>
//   )
// }

////



// import { useState, useEffect } from "react"
// import {
//   Box,
//   Typography,
//   Button,
//   Paper,
//   Grid,
//   useTheme,
//   Icon,
//   Snackbar,
//   Alert,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogContentText,
//   DialogTitle,
// } from "@mui/material"
// import { styled } from "@mui/material/styles"
// import {
//   PieChart,
//   Pie,
//   Cell,
//   ResponsiveContainer,
//   LineChart,
//   XAxis,
//   YAxis,
//   CartesianGrid,
// } from "recharts"
// import { useNavigate } from "react-router-dom"
// import axios from "axios"

// // Icons
// import AttachMoneyIcon from "@mui/icons-material/AttachMoney"
// import SpeedIcon from "@mui/icons-material/Speed"
// import LabelIcon from "@mui/icons-material/Label"
// import ArrowForwardIcon from "@mui/icons-material/ArrowForward"
// import MoreTimeIcon from '@mui/icons-material/MoreTime';

// // --- HELPER FUNCTIONS ---
// const getCurrentLocation = () => {
//   return new Promise((resolve, reject) => {
//     if (!navigator.geolocation) {
//       return reject(new Error("Geolocation is not supported by your browser."));
//     }
//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         resolve({
//           latitude: position.coords.latitude,
//           longitude: position.coords.longitude,
//         });
//       },
//       () => {
//         reject(new Error("Unable to retrieve your location. Please grant permission and try again."));
//       }
//     );
//   });
// };

// const formatApiTime = (timeString) => {
//   if (!timeString) return '';
//   const today = new Date();
//   const [hours, minutes, seconds] = timeString.split(':');
//   today.setHours(parseInt(hours, 10), parseInt(minutes, 10), parseInt(seconds, 10));

//   return today.toLocaleString('en-IN', {
//     timeZone: 'Asia/Kolkata',
//     hour: 'numeric',
//     minute: 'numeric',
//     hour12: true,
//   });
// };

// const getFormattedDateTimeForDisplay = () => {
//   return new Date().toLocaleString('en-IN', {
//     timeZone: 'Asia/Kolkata',
//     hour: 'numeric',
//     minute: 'numeric',
//     hour12: true
//   });
// };

// const getISTDateTimeForAPI = () => {
//   // This format 'YYYY-MM-DD HH:MM:SS' is often required by backends
//   return new Date().toLocaleString('sv-SE', { timeZone: 'Asia/Kolkata' });
// };


// // --- STYLED COMPONENTS (UNCHANGED) ---
// const CardPaper = styled(Paper)(({ theme }) => ({
//   padding: theme.spacing(2),
//   display: "flex",
//   flexDirection: "column",
//   justifyContent: "space-between",
//   height: "100%",
//   borderRadius: "8px",
//   boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
// }));

// const InfoCard = ({ title, value, icon, bgColor, textColor }) => {
//   const theme = useTheme();
//   const defaultBgColor = theme.palette.background.paper;
//   const defaultTextColor = theme.palette.text.primary;
//   return (
//     <CardPaper sx={{ backgroundColor: bgColor || defaultBgColor }}>
//       <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//         <Box>
//           <Typography variant="subtitle1" sx={{ color: textColor || defaultTextColor }}>{title}</Typography>
//           <Typography variant="h4" component="p" sx={{ fontWeight: "bold", color: textColor || defaultTextColor }}>{value}</Typography>
//         </Box>
//         <Icon sx={{ fontSize: 32, color: textColor || "primary" }}>{icon}</Icon>
//       </Box>
//     </CardPaper>
//   );
// };

// const StatusLegend = ({ items }) => (
//   <Box>
//     {items.map((item, index) => (
//       <Box key={index} sx={{ display: "flex", alignItems: "center", mb: 0.5 }}>
//         <Box sx={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: item.color, mr: 1, }} />
//         <Typography variant="body2" color="text.secondary">{item.label}</Typography>
//       </Box>
//     ))}
//   </Box>
// );

// // --- CONSTANTS ---
// const ticketLegendItems = [
//   { color: "#FFA726", label: "Low" }, { color: "#FFB74D", label: "Medium" },
//   { color: "#FF7043", label: "High" }, { color: "#FFEE58", label: "Critical" },
// ];
// const priorityColorMap = { "Low": "#FFA726", "Medium": "#FFB74D", "High": "#FF7043", "Critical": "#FFEE58", "No Tickets": "#E0E0E0" };
// const payrollChartData = [
//   { name: "Jul 2024", value: null }, { name: "Aug 2024", value: null }, { name: "Sep 2024", value: null },
//   { name: "Oct 2024", value: null }, { name: "Nov 2024", value: null }, { name: "Dec 2024", value: null },
//   { name: "Jan 2025", value: null }, { name: "Feb 2025", value: null }, { name: "Mar 2025", value: null },
//   { name: "Apr 2025", value: null }, { name: "May 2025", value: null }, { name: "Jun 2025", value: null },
// ];

// // --- MAIN COMPONENT ---
// export default function Dashboard() {
//   const blueColor = "#ff823aff";
//   const navigate = useNavigate();
//   const [isPageLoading, setIsPageLoading] = useState(true);
//   const [userName, setUserName] = useState("");
//   const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "info" });

//   // State for punch-in/out and shift
//   const [loadingType, setLoadingType] = useState(null); // 'IN' or 'OUT'
//   const [punchDialog, setPunchDialog] = useState({ open: false, type: null });
//   const [punchInTime, setPunchInTime] = useState(null);
//   const [punchOutTime, setPunchOutTime] = useState(null);
//   const [shiftInfo, setShiftInfo] = useState("My Shift: Loading...");

//   const [dashboardStats, setDashboardStats] = useState({
//     leaveCount: 0,
//     lateMarkCount: 0,
//     awardCount: 0,
//     assetCount: 0,
//     ticketPriorityData: [{ name: 'No Tickets', value: 100 }],
//   });

//   useEffect(() => {
//     const fetchAllData = async () => {
//       setIsPageLoading(true);
//       const accessToken = localStorage.getItem("accessToken");
//       const employeeCode = localStorage.getItem("loggedInUser");
//       const numericEmpId = localStorage.getItem("loggedInEmpId");

//       if (!accessToken || !employeeCode || !numericEmpId) {
//         setUserName("User");
//         setShiftInfo("My Shift: Not available");
//         setSnackbar({ open: true, message: "Authentication details missing.", severity: "error" });
//         setIsPageLoading(false);
//         return;
//       }

//       const headers = { Authorization: `Bearer ${accessToken}` };

//       try {
//         const [userResponse, statsResponse, attendanceResponse] = await Promise.all([
//           axios.get("https://tdtlworld.com/hrms-backend/api/dropdown/employee-role/", { headers }),
//           axios.get(`https://tdtlworld.com/hrms-backend/empdashboard/${employeeCode}/`, { headers }),
//           axios.get(`https://tdtlworld.com/hrms-backend/api/dashboard_attendance/${employeeCode}/`, { headers })
//         ]);

//         const currentUser = userResponse.data.find((emp) => String(emp.id) === String(numericEmpId));
//         setUserName(currentUser?.employee_name || "User");

//         const statsData = statsResponse.data;
//         const inTime = statsData?.office_shift?.in_time;
//         const outTime = statsData?.office_shift?.out_time;
//         if (inTime && outTime) {
//           setShiftInfo(`My Shift: ${formatApiTime(inTime)} To ${formatApiTime(outTime)}`);
//         } else {
//           setShiftInfo("My Shift: Not Assigned");
//         }

//         const tickets = statsData.support_tickets?.data || [];
//         let newTicketPriorityData = [{ name: 'No Tickets', value: 100 }];
//         if (tickets.length > 0) {
//           const totalTickets = tickets.length;
//           const priorityCounts = tickets.reduce((acc, ticket) => { acc[ticket.priority] = (acc[ticket.priority] || 0) + 1; return acc; }, {});
//           newTicketPriorityData = Object.entries(priorityCounts).map(([name, count]) => ({ name, value: parseFloat(((count / totalTickets) * 100).toFixed(1)), }));
//         }

//         setDashboardStats({
//           leaveCount: statsData.leave_days_taken || 0,
//           lateMarkCount: statsData.late_mark_count || 0,
//           awardCount: statsData.award_count || 0,
//           assetCount: statsData.asset_count || 0,
//           ticketPriorityData: newTicketPriorityData,
//         });

//         const attendanceData = attendanceResponse.data.data;
//         if (attendanceData && attendanceData.length > 0) {
//           const todayAttendance = attendanceData[0];
//           setPunchInTime(todayAttendance.clock_in ? formatApiTime(todayAttendance.clock_in) : null);
//           setPunchOutTime(todayAttendance.clock_out ? formatApiTime(todayAttendance.clock_out) : null);
//         }

//       } catch (error) {
//         console.error("Failed to fetch dashboard data:", error);
//         setSnackbar({ open: true, message: "Failed to load dashboard data.", severity: "error" });
//         setUserName("User");
//         setShiftInfo("My Shift: Error loading");
//       } finally {
//         setIsPageLoading(false);
//       }
//     };
//     fetchAllData();
//   }, []);

//   const handleCloseSnackbar = (event, reason) => {
//     if (reason === 'clickaway') return;
//     setSnackbar({ ...snackbar, open: false });
//   };

//   const handleCloseDialog = () => setPunchDialog({ open: false, type: null });
//   const handlePunchClick = (punchType) => { if (loadingType) return; setPunchDialog({ open: true, type: punchType }); };

//   const executePunch = async () => {
//     const punchType = punchDialog.type;
//     handleCloseDialog();
//     setLoadingType(punchType);

//     let locationString = "Location not available";
//     try {
//       const { latitude, longitude } = await getCurrentLocation();
//       locationString = `Lat: ${latitude.toFixed(5)}, Lon: ${longitude.toFixed(5)}`;
//     } catch (error) {
//       setSnackbar({ open: true, message: error.message, severity: "warning" });
//     }

//     const accessToken = localStorage.getItem("accessToken");
//     const employeeCodeForPunch = localStorage.getItem("loggedInUser");

//     if (!accessToken || !employeeCodeForPunch) {
//       setSnackbar({ open: true, message: "Authentication details not found.", severity: "error" });
//       setLoadingType(null);
//       return;
//     }

//     const payload = { emp_id: employeeCodeForPunch, punch_time: getISTDateTimeForAPI(), punch_type: punchType, location: locationString };

//     try {
//       await axios.post("https://tdtlworld.com/hrms-backend/api/employee_attendance/", payload, { headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" } });
//       const displayTime = getFormattedDateTimeForDisplay();
//       if (punchType === "IN") {
//         setPunchInTime(displayTime);
//         setPunchOutTime(null);
//       } else {
//         setPunchOutTime(displayTime);
//       }
//       setSnackbar({ open: true, message: `Successfully Punched ${punchType === 'IN' ? 'In' : 'Out'}!`, severity: "success" });
//     } catch (error) {
//       console.error("Punch API Call Failed:", error.response || error);
//       const errorMessage = error.response?.data?.error || "An unknown error occurred during punch.";
//       setSnackbar({ open: true, message: errorMessage, severity: "error" });
//     } finally {
//       setLoadingType(null);
//     }
//   }

//   const isCurrentlyPunchedIn = !!punchInTime && !punchOutTime;

//   return (
//     <Box sx={{ p: { xs: 2, md: 3 } }}>
//       <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
//         <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }} variant="filled">{snackbar.message}</Alert>
//       </Snackbar>

//       <Dialog open={punchDialog.open} onClose={handleCloseDialog}>
//         <DialogTitle>{`Confirm Punch ${punchDialog.type === 'IN' ? 'In' : 'Out'}`}</DialogTitle>
//         <DialogContent><DialogContentText>Are you sure you want to punch {punchDialog.type === 'IN' ? 'in' : 'out'}?</DialogContentText></DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseDialog} color="primary">Cancel</Button>
//           <Button onClick={executePunch} color="primary" autoFocus>Confirm</Button>
//         </DialogActions>
//       </Dialog>

//       <Grid container spacing={3}>
//         <Grid item xs={12} lg={7}>
//           <Grid container spacing={3}>
//             {/* Welcome Header */}
//             <Grid item xs={12}>
//               <Paper sx={{ p: 2, borderRadius: "8px" }}>
//                 <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
//                   <Box>
//                     <Typography variant="h6">Welcome {userName}</Typography>
//                     <Typography variant="body2" color="text.secondary">{shiftInfo}</Typography>
//                   </Box>
//                   <Box sx={{ display: "flex", gap: 2 }}>
//                     <Button variant="contained" onClick={() => handlePunchClick("IN")} disabled={loadingType !== null || isCurrentlyPunchedIn} sx={{ backgroundColor: "#9C27B0", color: "white", textTransform: "none", "&:hover": { backgroundColor: "#9C27B0" } }}>
//                       {loadingType === 'IN' ? "..." : "Punch In"}
//                     </Button>
//                     <Button variant="contained" onClick={() => handlePunchClick("OUT")} disabled={loadingType !== null || !isCurrentlyPunchedIn} sx={{ backgroundColor: "#FF7043", color: "white", textTransform: "none", "&:hover": { backgroundColor: "#ff6f43ec" } }}>
//                       {loadingType === 'OUT' ? "..." : "Punch Out"}
//                     </Button>
//                   </Box>
//                 </Box>
//                 <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2, px: 1, borderTop: '1px solid #eee', pt: 2, minHeight: '24px' }}>
//                   <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
//                     {punchInTime ? `Punched In: ${punchInTime}` : 'Not punched in today'}
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
//                     {punchOutTime ? `Punched Out: ${punchOutTime}` : ''}
//                   </Typography>
//                 </Box>
//               </Paper>
//             </Grid>

//             {/* My Attendance Link */}
//             <Grid item xs={12}>
//               <Paper sx={{ p: 1.5, display: "flex", justifyContent: "space-between", alignItems: "center", bgcolor: blueColor, color: "white", borderRadius: "8px" }}>
//                 <Button sx={{ color: "white", textTransform: "none" }} endIcon={<ArrowForwardIcon />} onClick={() => navigate('/hrms/dashboard/attendance')}>My Attendance</Button>
//               </Paper>
//             </Grid>

//             <Grid item xs={12} sm={6}>
//               <InfoCard title="My Awards" value={isPageLoading ? '...' : dashboardStats.awardCount} icon={<AttachMoneyIcon />} bgColor={blueColor} textColor="white" />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <InfoCard title="Total Assets" value={isPageLoading ? '...' : dashboardStats.assetCount} icon={<SpeedIcon />} />
//             </Grid>

//             <Grid item xs={12}>
//               <CardPaper>
//                 <Typography variant="h6" gutterBottom>Ticket Priority</Typography>
//                 <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
//                   <Box sx={{ width: 150, height: 150 }}>
//                     <ResponsiveContainer>
//                       <PieChart>
//                         <Pie data={dashboardStats.ticketPriorityData} cx="50%" cy="50%" innerRadius={40} outerRadius={60} dataKey="value" label={({ value, name }) => name === 'No Tickets' ? 'N/A' : `${value}%`} labelLine={false} isAnimationActive={!isPageLoading}>
//                           {dashboardStats.ticketPriorityData.map((entry) => (<Cell key={`cell-${entry.name}`} fill={priorityColorMap[entry.name]} />))}
//                         </Pie>
//                       </PieChart>
//                     </ResponsiveContainer>
//                   </Box>
//                   <Box sx={{ ml: 4 }}><StatusLegend items={ticketLegendItems} /></Box>
//                 </Box>
//               </CardPaper>
//             </Grid>
//           </Grid>
//         </Grid>

//         {/* Right Column */}
//         <Grid item xs={12} lg={5}>
//           <Grid container spacing={3}>
//             <Grid item xs={12} sm={6}>
//               <InfoCard title="My Leave" value={isPageLoading ? '...' : dashboardStats.leaveCount} icon={<LabelIcon />} />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <InfoCard title="Late Mark" value={isPageLoading ? '...' : dashboardStats.lateMarkCount} icon={<MoreTimeIcon />} bgColor={blueColor} textColor="white" />
//             </Grid>
//             <Grid item xs={12}>
//               <CardPaper>
//                 <Typography variant="h6">My Payroll monthly report</Typography>
//                 <Box sx={{ display: "flex", gap: 4, my: 2 }}>
//                   <Box><Typography variant="h5" sx={{ fontWeight: "bold" }}>₹0.00</Typography><Typography variant="body2" color="text.secondary">Total</Typography></Box>
//                   <Box><Typography variant="h5" sx={{ fontWeight: "bold" }}>₹0.00</Typography><Typography variant="body2" color="text.secondary">This Month</Typography></Box>
//                 </Box>
//                 <Box sx={{ height: 250, width: "100%", mt: 2, ".recharts-wrapper": { ml: -1 } }}>
//                   <ResponsiveContainer>
//                     <LineChart data={payrollChartData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
//                       <CartesianGrid stroke="#e0e0e0" strokeDasharray="5 5" vertical={false} />
//                       <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#666' }} axisLine={false} tickLine={false} />
//                       <YAxis domain={[0, 5]} ticks={[0.0, 1.0, 2.0, 3.0, 4.0, 5.0]} tickFormatter={(tick) => tick.toFixed(1)} tick={{ fontSize: 12, fill: '#666' }} axisLine={false} tickLine={false} />
//                     </LineChart>
//                   </ResponsiveContainer>
//                 </Box>
//               </CardPaper>
//             </Grid>
//           </Grid>
//         </Grid>
//       </Grid>
//     </Box>
//   )
// }  ///////







// import { useState, useEffect } from "react"
// import {
//   Box,
//   Typography,
//   Button,
//   Paper,
//   Grid,
//   useTheme,
//   Icon,
//   Snackbar,
//   Alert,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogContentText,
//   DialogTitle,
//   CircularProgress,
// } from "@mui/material"
// import { styled } from "@mui/material/styles"
// import {
//   PieChart,
//   Pie,
//   Cell,
//   ResponsiveContainer,
//   LineChart,
//   XAxis,
//   YAxis,
//   CartesianGrid,
// } from "recharts"
// import { useNavigate } from "react-router-dom"
// import axios from "axios"

// // Icons
// import AttachMoneyIcon from "@mui/icons-material/AttachMoney"
// import SpeedIcon from "@mui/icons-material/Speed"
// import LabelIcon from "@mui/icons-material/Label"
// import ArrowForwardIcon from "@mui/icons-material/ArrowForward"
// import MoreTimeIcon from '@mui/icons-material/MoreTime';
// import HolidayVillageIcon from '@mui/icons-material/HolidayVillage';

// // --- HELPER FUNCTIONS (UNCHANGED) ---
// const getCurrentLocation = () => new Promise((resolve, reject) => {
//   if (!navigator.geolocation) return reject(new Error("Geolocation is not supported."));
//   navigator.geolocation.getCurrentPosition(
//     (position) => resolve({ latitude: position.coords.latitude, longitude: position.coords.longitude }),
//     () => reject(new Error("Unable to retrieve location. Please grant permission."))
//   );
// });

// const formatApiTime = (timeString) => {
//   if (!timeString) return '';
//   const today = new Date();
//   const [hours, minutes, seconds] = timeString.split(':');
//   today.setHours(parseInt(hours, 10), parseInt(minutes, 10), parseInt(seconds, 10) || 0);
//   if (isNaN(today.getTime())) return '';
//   return today.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', hour: 'numeric', minute: 'numeric', hour12: true });
// };

// const getFormattedDateTimeForDisplay = () => new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', hour: 'numeric', minute: 'numeric', hour12: true });
// const getISTDateTimeForAPI = () => new Date().toLocaleString('sv-SE', { timeZone: 'Asia/Kolkata' });

// // --- STYLED COMPONENTS (UNCHANGED) ---
// const CardPaper = styled(Paper)(({ theme }) => ({
//   padding: theme.spacing(2), display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%", borderRadius: "8px", boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
// }));

// const InfoCard = ({ title, value, icon, bgColor, textColor }) => {
//   const theme = useTheme();
//   return (<CardPaper sx={{ backgroundColor: bgColor || theme.palette.background.paper }}><Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><Box><Typography variant="subtitle1" sx={{ color: textColor || theme.palette.text.primary }}>{title}</Typography><Typography variant="h4" component="p" sx={{ fontWeight: "bold", color: textColor || theme.palette.text.primary }}>{value}</Typography></Box><Icon sx={{ fontSize: 32, color: textColor || "primary" }}>{icon}</Icon></Box></CardPaper>);
// };

// const StatusLegend = ({ items }) => (<Box>{items.map((item, index) => (<Box key={index} sx={{ display: "flex", alignItems: "center", mb: 0.5 }}><Box sx={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: item.color, mr: 1 }} /><Typography variant="body2" color="text.secondary">{item.label}</Typography></Box>))}</Box>);

// // --- CONSTANTS (UNCHANGED) ---
// const TICKET_COLOR_MAP = { "Low": "#FFA726", "Medium": "#FFB74D", "High": "#FF7043", "Critical": "#FFEE58", "No Tickets": "#E0E0E0" };
// const ticketLegendItems = [{ color: TICKET_COLOR_MAP.Low, label: "Low" }, { color: TICKET_COLOR_MAP.Medium, label: "Medium" }, { color: TICKET_COLOR_MAP.High, label: "High" }, { color: TICKET_COLOR_MAP.Critical, label: "Critical" }];
// const payrollChartData = [{ name: "Jul 2024", value: null }, { name: "Aug 2024", value: null }, { name: "Sep 2024", value: null }, { name: "Oct 2024", value: null }, { name: "Nov 2024", value: null }, { name: "Dec 2024", value: null }, { name: "Jan 2025", value: null }, { name: "Feb 2025", value: null }, { name: "Mar 2025", value: null }, { name: "Apr 2025", value: null }, { name: "May 2025", value: null }, { name: "Jun 2025", value: null }];

// export default function Dashboard() {
//   const blueColor = "#ff823aff"
//   const navigate = useNavigate()

//   // --- STATE MANAGEMENT ---
//   const [userName, setUserName] = useState("")
//   const [loadingType, setLoadingType] = useState(null)
//   const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "info" })
//   const [dialog, setDialog] = useState({ open: false, type: null })

//   // Data states
//   const [punchInTime, setPunchInTime] = useState(null)
//   const [punchOutTime, setPunchOutTime] = useState(null)
//   const [shiftInfo, setShiftInfo] = useState("My Shift: Loading...");
//   const [leaveCount, setLeaveCount] = useState(0)
//   const [lateMarkCount, setLateMarkCount] = useState(0)
//   const [awardCount, setAwardCount] = useState(0);
//   const [assetCount, setAssetCount] = useState(0);
//   const [ticketData, setTicketData] = useState([{ name: 'No Tickets', value: 100 }]);
//   const [isHoliday, setIsHoliday] = useState(false);

//   // ** State for loading and status checks **
//   const [isLoading, setIsLoading] = useState(true);
//   const [showPunchUI, setShowPunchUI] = useState(false);
//   const [isEmployeeConfirmed, setIsEmployeeConfirmed] = useState(false);
//   const [hasAcknowledgedPolicies, setHasAcknowledgedPolicies] = useState(false);

//   useEffect(() => {
//     const accessToken = localStorage.getItem("accessToken");
//     const employeeId = localStorage.getItem("loggedInUser");
//     const loggedInEmpId = localStorage.getItem("loggedInEmpId");

//     if (!accessToken || !employeeId || !loggedInEmpId) {
//       setUserName("User");
//       setShiftInfo("My Shift: Not available")
//       setIsLoading(false);
//       return;
//     }

//     const headers = { Authorization: `Bearer ${accessToken}` };

//     axios.get("https://tdtlworld.com/hrms-backend/api/dropdown/employee-role/", { headers })
//       .then(response => {
//         const currentUser = response.data.find((emp) => String(emp.id) === String(loggedInEmpId));
//         setUserName(currentUser?.employee_name || "User");
//       }).catch(error => console.error("Failed to fetch user name:", error));

//     const confirmationEndpoint = `https://tdtlworld.com/hrms-backend/EmpConfirmation/${employeeId}/`;
//     const policyEndpoint = `https://tdtlworld.com/hrms-backend/policy_ack/${employeeId}/`;
//     const dashboardEndpoint = `https://tdtlworld.com/hrms-backend/empdashboard/${employeeId}/`;
//     const attendanceEndpoint = `https://tdtlworld.com/hrms-backend/api/dashboard_attendance/${employeeId}/`;

//     Promise.all([
//       axios.get(confirmationEndpoint, { headers }),
//       axios.get(policyEndpoint, { headers }),
//       axios.get(dashboardEndpoint, { headers }),
//       axios.get(attendanceEndpoint, { headers }),
//     ]).then(([confirmationResponse, policyResponse, dashboardResponse, attendanceResponse]) => {
//       // --- Process Confirmation and Policy first ---
//       const confirmStatus = confirmationResponse.data?.employee_confirm;
//       const policyStatus = policyResponse.data?.status;

//       const isPolicyOk = (policyStatus === 'Y');

//       // ** Set state for notification logic and UI visibility **
//       setHasAcknowledgedPolicies(isPolicyOk);
//       setIsEmployeeConfirmed(confirmStatus === 'Y');
//       setShowPunchUI(isPolicyOk); // Punch UI is only shown if policies are acknowledged

//       // --- Process Dashboard Data ---
//       const dashData = dashboardResponse.data;
//       setLeaveCount(dashData.leave_days_taken || 0);
//       setLateMarkCount(dashData.late_mark_count || 0);
//       setAwardCount(dashData.award_count || 0);
//       setAssetCount(dashData.asset_count || 0);

//       const inTime = dashData?.office_shift?.in_time;
//       const outTime = dashData?.office_shift?.out_time;

//       if (inTime === "Holiday" || outTime === "Holiday") {
//         setShiftInfo("My Shift: Holiday");
//         setIsHoliday(true);
//       } else if (inTime && outTime) {
//         setShiftInfo(`My Shift: ${formatApiTime(inTime)} To ${formatApiTime(outTime)}`);
//         setIsHoliday(false);
//       } else {
//         setShiftInfo("My Shift: Not Assigned");
//         setIsHoliday(false);
//       }

//       if (dashData.support_tickets?.count > 0) {
//         const { data: tickets, count: totalTickets } = dashData.support_tickets;
//         const priorityCounts = tickets.reduce((acc, ticket) => { acc[ticket.priority] = (acc[ticket.priority] || 0) + 1; return acc; }, {});
//         setTicketData(Object.entries(priorityCounts).map(([name, count]) => ({ name, value: parseFloat(((count / totalTickets) * 100).toFixed(1)) })));
//       }

//       // --- Process Attendance Data ---
//       const attendanceData = attendanceResponse.data.data;
//       if (attendanceData?.length > 0) {
//         const todayAttendance = attendanceData[0];
//         setPunchInTime(todayAttendance.clock_in ? formatApiTime(todayAttendance.clock_in) : null);
//         setPunchOutTime(todayAttendance.clock_out ? formatApiTime(todayAttendance.clock_out) : null);
//       }

//     }).catch(error => {
//       console.error("Failed to fetch required dashboard data:", error);
//       setSnackbar({ open: true, message: "Could not load dashboard information.", severity: "error" });
//       setShowPunchUI(false);
//     }).finally(() => {
//       setIsLoading(false);
//     });

//   }, []);

//   // ** CORRECTED useEffect FOR HANDLING STATUS NOTIFICATIONS **
//   useEffect(() => {
//     if (isLoading) return; // Don't show messages while loading

//     // Priority 1: Check for unacknowledged policies. This is the most important message.
//     if (!hasAcknowledgedPolicies) {
//       setSnackbar({
//         open: true,
//         message: "Acknowledge your policies for Punch In/Out.",
//         severity: "warning"
//       });
//       return; // Return to ensure no other message is shown.
//     }

//     // Priority 2: Check for confirmed employee status. This only runs if policies are acknowledged.
//     if (isEmployeeConfirmed) {
//       setSnackbar({
//         open: true,
//         message: "Your employee confirmation is pending.",
//         severity: "warning"
//       });
//     }

//     // No 'else' is needed. If policies are acknowledged and confirmation is pending ('N' or null), no message appears.

//   }, [isLoading, hasAcknowledgedPolicies, isEmployeeConfirmed]);

//   const handleCloseSnackbar = (event, reason) => {
//     if (reason === 'clickaway') return;
//     setSnackbar({ ...snackbar, open: false });
//   };

//   const handleCloseDialog = () => setDialog({ open: false, type: null });
//   const handlePunchClick = (punchType) => { if (loadingType) return; setDialog({ open: true, type: punchType }); };

//   const executePunch = async () => {
//     const punchType = dialog.type;
//     handleCloseDialog();
//     setLoadingType(punchType);

//     let locationString = "Location not available";
//     try {
//       const { latitude, longitude } = await getCurrentLocation();
//       locationString = `Lat: ${latitude.toFixed(5)}, Lon: ${longitude.toFixed(5)}`;
//     } catch (error) { setSnackbar({ open: true, message: error.message, severity: "warning" }); }

//     const accessToken = localStorage.getItem("accessToken");
//     const employeeId = localStorage.getItem("loggedInUser");
//     if (!accessToken || !employeeId) {
//       setSnackbar({ open: true, message: "Authentication details not found.", severity: "error" });
//       setLoadingType(null);
//       return;
//     }

//     const payload = { emp_id: employeeId, punch_time: getISTDateTimeForAPI(), punch_type: punchType, location: locationString };

//     try {
//       await axios.post("https://tdtlworld.com/hrms-backend/api/employee_attendance/", payload, { headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" } });
//       const displayTime = getFormattedDateTimeForDisplay();
//       if (punchType === "IN") {
//         setPunchInTime(displayTime);
//         setPunchOutTime(null);
//       } else {
//         setPunchOutTime(displayTime);
//       }
//       setSnackbar({ open: true, message: `Successfully Punched ${punchType === 'IN' ? 'In' : 'Out'}!`, severity: "success" });
//     } catch (error) {
//       console.error("Punch API Call Failed:", error.response || error);
//       const errorMessage = error.response?.data?.error || "An unknown error occurred during punch.";
//       setSnackbar({ open: true, message: errorMessage, severity: "error" });
//     } finally {
//       setLoadingType(null);
//     }
//   };

//   const isCurrentlyPunchedIn = !!punchInTime && !punchOutTime;

//   if (isLoading) {
//     return (
//       <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
//         <CircularProgress />
//         <Typography sx={{ ml: 2 }}>Loading Dashboard...</Typography>
//       </Box>
//     );
//   }

//   return (
//     <Box sx={{ p: { xs: 2, md: 3 } }}>
//       <Snackbar open={snackbar.open} autoHideDuration={5000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
//         <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }} variant="filled">{snackbar.message}</Alert>
//       </Snackbar>

//       <Dialog open={dialog.open} onClose={handleCloseDialog}>
//         <DialogTitle>{`Confirm Punch ${dialog.type === 'IN' ? 'In' : 'Out'}`}</DialogTitle>
//         <DialogContent><DialogContentText>Are you sure you want to punch {dialog.type === 'IN' ? 'in' : 'out'}?</DialogContentText></DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseDialog} color="primary">Cancel</Button>
//           <Button onClick={executePunch} color="primary" autoFocus>Confirm</Button>
//         </DialogActions>
//       </Dialog>

//       <Grid container spacing={3}>
//         <Grid item xs={12} lg={7}>
//           <Grid container spacing={3}>
//             <Grid item xs={12}>
//               <Paper sx={{ p: 2, borderRadius: "8px" }}>
//                 <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
//                   <Box>
//                     <Typography variant="h6">Welcome {userName}</Typography>
//                     <Typography variant="body2" color="text.secondary">{shiftInfo}</Typography>
//                   </Box>

//                   {showPunchUI && (
//                     <Box>
//                       {isHoliday ? (
//                         <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                           <HolidayVillageIcon sx={{ color: "#FF7043" }} />
//                           <Typography variant="h6" sx={{ color: "#FF7043", fontWeight: 'bold' }}>Holiday</Typography>
//                         </Box>
//                       ) : (
//                         <Box sx={{ display: "flex", gap: 2 }}>
//                           <Button variant="contained" onClick={() => handlePunchClick("IN")} disabled={loadingType !== null || isCurrentlyPunchedIn} sx={{ backgroundColor: "#FF7043", color: "white", textTransform: "none", "&:hover": { backgroundColor: "#ff6f43e2" } }}>
//                             {loadingType === 'IN' ? "..." : "Punch In"}
//                           </Button>
//                           <Button variant="contained" onClick={() => handlePunchClick("OUT")} disabled={loadingType !== null || !isCurrentlyPunchedIn} sx={{ backgroundColor: "#FF7043", color: "white", textTransform: "none", "&:hover": { backgroundColor: "#ff6f43e2" } }}>
//                             {loadingType === 'OUT' ? "..." : "Punch Out"}
//                           </Button>
//                         </Box>
//                       )}
//                     </Box>
//                   )}
//                 </Box>
//                 {showPunchUI && (
//                   <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2, px: 1, borderTop: '1px solid #eee', pt: 2, minHeight: '24px', flexWrap: 'wrap', gap: 1 }}>
//                     <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
//                       {punchInTime ? `Punched In: ${punchInTime}` : 'Not punched in today'}
//                     </Typography>
//                     <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
//                       {punchOutTime ? `Punched Out: ${punchOutTime}` : ''}
//                     </Typography>
//                   </Box>
//                 )}
//               </Paper>
//             </Grid>

//             {/* MODIFIED: "My Attendance" button is now conditionally rendered */}
//             {showPunchUI && (
//               <Grid item xs={12}>
//                 <Paper sx={{ p: 1.5, display: "flex", justifyContent: "space-between", alignItems: "center", bgcolor: blueColor, color: "white", borderRadius: "8px" }}>
//                   <Button sx={{ color: "white", textTransform: "none" }} endIcon={<ArrowForwardIcon />} onClick={() => navigate('/hrms/dashboard/attendance')}>
//                     My Attendance
//                   </Button>
//                 </Paper>
//               </Grid>
//             )}

//             <Grid item xs={12} sm={6}><InfoCard title="My Awards" value={awardCount} icon={<AttachMoneyIcon />} bgColor={blueColor} textColor="white" /></Grid>
//             <Grid item xs={12} sm={6}><InfoCard title="Total Assets" value={assetCount} icon={<SpeedIcon />} /></Grid>
//             <Grid item xs={12}><CardPaper><Typography variant="h6" gutterBottom>Ticket Priority</Typography><Box sx={{ display: "flex", alignItems: "center", mt: 2 }}><Box sx={{ width: 150, height: 150 }}><ResponsiveContainer><PieChart><Pie data={ticketData} cx="50%" cy="50%" innerRadius={40} outerRadius={60} dataKey="value" label={({ value, name }) => name === 'No Tickets' ? 'N/A' : `${value}%`} labelLine={false}>{ticketData.map((entry, index) => (<Cell key={`cell-${index}`} fill={TICKET_COLOR_MAP[entry.name]} />))}</Pie></PieChart></ResponsiveContainer></Box><Box sx={{ ml: 4 }}><StatusLegend items={ticketLegendItems} /></Box></Box></CardPaper></Grid>
//           </Grid>
//         </Grid>

//         <Grid item xs={12} lg={5}>
//           <Grid container spacing={3}>
//             <Grid item xs={12} sm={6}><InfoCard title="My Leave" value={leaveCount} icon={<LabelIcon />} /></Grid>
//             <Grid item xs={12} sm={6}><InfoCard title="Late Mark" value={lateMarkCount} icon={<MoreTimeIcon />} bgColor={blueColor} textColor="white" /></Grid>
//             <Grid item xs={12}><CardPaper><Typography variant="h6">My Payroll monthly report</Typography><Box sx={{ display: "flex", gap: 4, my: 2 }}><Box><Typography variant="h5" sx={{ fontWeight: "bold" }}>₹0.00</Typography><Typography variant="body2" color="text.secondary">Total</Typography></Box><Box><Typography variant="h5" sx={{ fontWeight: "bold" }}>₹0.00</Typography><Typography variant="body2" color="text.secondary">This Month</Typography></Box></Box><Box sx={{ height: 250, width: "100%", mt: 2, ".recharts-wrapper": { ml: -1 } }}><ResponsiveContainer><LineChart data={payrollChartData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}><CartesianGrid stroke="#e0e0e0" strokeDasharray="5 5" vertical={false} /><XAxis dataKey="name" tick={{ fontSize: 12, fill: '#666' }} axisLine={false} tickLine={false} /><YAxis domain={[0, 5]} ticks={[0.0, 1.0, 2.0, 3.0, 4.0, 5.0]} tickFormatter={(tick) => tick.toFixed(1)} tick={{ fontSize: 12, fill: '#666' }} axisLine={false} tickLine={false} /></LineChart></ResponsiveContainer></Box></CardPaper></Grid>
//           </Grid>
//         </Grid>
//       </Grid>
//     </Box>
//   )
// }











// import { useState, useEffect } from "react"
// import {
//   Box,
//   Typography,
//   Button,
//   Paper,
//   Grid,
//   useTheme,
//   Icon,
//   Snackbar,
//   Alert,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogContentText,
//   DialogTitle,
//   CircularProgress,
// } from "@mui/material"
// import { styled } from "@mui/material/styles"
// import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, XAxis, YAxis, CartesianGrid } from "recharts"
// import { useNavigate } from "react-router-dom"
// import axios from "axios"

// // Icons
// import AttachMoneyIcon from "@mui/icons-material/AttachMoney"
// import SpeedIcon from "@mui/icons-material/Speed"
// import LabelIcon from "@mui/icons-material/Label"
// import ArrowForwardIcon from "@mui/icons-material/ArrowForward"
// import MoreTimeIcon from "@mui/icons-material/MoreTime"
// import HolidayVillageIcon from "@mui/icons-material/HolidayVillage"

// // --- HELPER FUNCTIONS (UNCHANGED) ---
// const getCurrentLocation = () =>
//   new Promise((resolve, reject) => {
//     if (!navigator.geolocation) {
//       reject(new Error("Geolocation is not supported."))
//       return
//     }
//     navigator.geolocation.getCurrentPosition(
//       (position) =>
//         resolve({
//           latitude: position.coords.latitude,
//           longitude: position.coords.longitude,
//         }),
//       () => reject(new Error("Unable to retrieve location. Please grant permission.")),
//     )
//   })

// const formatApiTime = (timeString) => {
//   if (!timeString) return ""
//   const today = new Date()
//   const [hours, minutes, seconds] = timeString.split(":")
//   today.setHours(Number.parseInt(hours, 10), Number.parseInt(minutes, 10), Number.parseInt(seconds, 10) || 0)
//   if (isNaN(today.getTime())) return ""
//   return today.toLocaleString("en-IN", { timeZone: "Asia/Kolkata", hour: "numeric", minute: "numeric", hour12: true })
// }

// const getFormattedDateTimeForDisplay = () =>
//   new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata", hour: "numeric", minute: "numeric", hour12: true })
// const getISTDateTimeForAPI = () => new Date().toLocaleString("sv-SE", { timeZone: "Asia/Kolkata" })

// // --- STYLED COMPONENTS (UPDATED) ---
// const CardPaper = styled(Paper)(({ theme }) => ({
//   padding: theme.spacing(3),
//   display: "flex",
//   flexDirection: "column",
//   justifyContent: "space-between",
//   height: "100%",
//   borderRadius: "12px",
//   boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
//   transition: "transform 200ms ease, box-shadow 200ms ease",
//   willChange: "transform",
//   "&:hover": {
//     transform: "translateY(-4px)",
//     boxShadow: "0 14px 32px rgba(0,0,0,0.12)",
//   },
// }))

// const InfoCard = ({ title, value, icon, bgColor, textColor }) => {
//   const theme = useTheme()
//   return (
//     <CardPaper
//       sx={{
//         backgroundColor: bgColor || theme.palette.background.paper,
//         minHeight: 150,
//       }}
//     >
//       <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//         <Box>
//           <Typography variant="subtitle1" sx={{ color: textColor || theme.palette.text.primary }}>
//             {title}
//           </Typography>
//           <Typography
//             variant="h4"
//             component="p"
//             sx={{ fontWeight: "bold", color: textColor || theme.palette.text.primary }}
//           >
//             {value}
//           </Typography>
//         </Box>

//         <Box
//           sx={{
//             width: 48,
//             height: 48,
//             borderRadius: "12px",
//             display: "grid",
//             placeItems: "center",
//             color: textColor || "#8C257C",
//             backgroundColor: textColor ? "rgba(255,255,255,0.18)" : "rgba(140,37,124,0.08)",
//             transition: "transform 200ms ease",
//             "&:hover": { transform: "scale(1.03)" },
//           }}
//         >
//           <Icon sx={{ fontSize: 28, color: "currentColor" }}>{icon}</Icon>
//         </Box>
//       </Box>
//     </CardPaper>
//   )
// }

// const StatusLegend = ({ items }) => (
//   <Box>
//     {items.map((item, index) => (
//       <Box key={index} sx={{ display: "flex", alignItems: "center", mb: 0.5 }}>
//         <Box sx={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: item.color, mr: 1 }} />
//         <Typography variant="body2" color="text.secondary">
//           {item.label}
//         </Typography>
//       </Box>
//     ))}
//   </Box>
// )

// // --- CONSTANTS (UPDATED) ---
// const PURPLE = "#8C257C"
// const ORANGE = "#F58E35"

// const TICKET_COLOR_MAP = {
//   Low: "rgba(245, 142, 53, 0.6)", // ORANGE 60%
//   Medium: ORANGE, // ORANGE 100%
//   High: "rgba(140, 37, 124, 0.6)", // PURPLE 60%
//   Critical: PURPLE, // PURPLE 100%
//   "No Tickets": "#E0E0E0",
// }
// const ticketLegendItems = [
//   { color: TICKET_COLOR_MAP.Low, label: "Low" },
//   { color: TICKET_COLOR_MAP.Medium, label: "Medium" },
//   { color: TICKET_COLOR_MAP.High, label: "High" },
//   { color: TICKET_COLOR_MAP.Critical, label: "Critical" },
// ]
// const payrollChartData = [
//   { name: "Jul 2024", value: null },
//   { name: "Aug 2024", value: null },
//   { name: "Sep 2024", value: null },
//   { name: "Oct 2024", value: null },
//   { name: "Nov 2024", value: null },
//   { name: "Dec 2024", value: null },
//   { name: "Jan 2025", value: null },
//   { name: "Feb 2025", value: null },
//   { name: "Mar 2025", value: null },
//   { name: "Apr 2025", value: null },
//   { name: "May 2025", value: null },
//   { name: "Jun 2025", value: null },
// ]

// export default function Dashboard() {
//   const blueColor = PURPLE
//   const navigate = useNavigate()

//   // --- STATE MANAGEMENT ---
//   const [userName, setUserName] = useState("")
//   const [loadingType, setLoadingType] = useState(null)
//   const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "info" })
//   const [dialog, setDialog] = useState({ open: false, type: null })

//   // Data states
//   const [punchInTime, setPunchInTime] = useState(null)
//   const [punchOutTime, setPunchOutTime] = useState(null)
//   const [shiftInfo, setShiftInfo] = useState("My Shift: Loading...")
//   const [leaveCount, setLeaveCount] = useState(0)
//   const [lateMarkCount, setLateMarkCount] = useState(0)
//   const [awardCount, setAwardCount] = useState(0)
//   const [assetCount, setAssetCount] = useState(0)
//   const [ticketData, setTicketData] = useState([{ name: "No Tickets", value: 100 }])
//   const [isHoliday, setIsHoliday] = useState(false)

//   // ** State for loading and status checks **
//   const [isLoading, setIsLoading] = useState(true)
//   const [showPunchUI, setShowPunchUI] = useState(false)
//   const [isEmployeeConfirmed, setIsEmployeeConfirmed] = useState(false)
//   const [hasAcknowledgedPolicies, setHasAcknowledgedPolicies] = useState(false)

//   useEffect(() => {
//     const accessToken = localStorage.getItem("accessToken")
//     const employeeId = localStorage.getItem("loggedInUser")
//     const loggedInEmpId = localStorage.getItem("loggedInEmpId")

//     if (!accessToken || !employeeId || !loggedInEmpId) {
//       setUserName("User")
//       setShiftInfo("My Shift: Not available")
//       setIsLoading(false)
//       return
//     }

//     const headers = { Authorization: `Bearer ${accessToken}` }

//     axios
//       .get("https://tdtlworld.com/hrms-backend/api/dropdown/employee-role/", { headers })
//       .then((response) => {
//         const currentUser = response.data.find((emp) => String(emp.id) === String(loggedInEmpId))
//         setUserName(currentUser?.employee_name || "User")
//       })
//       .catch((error) => console.error("Failed to fetch user name:", error))

//     const confirmationEndpoint = `https://tdtlworld.com/hrms-backend/EmpConfirmation/${employeeId}/`
//     const policyEndpoint = `https://tdtlworld.com/hrms-backend/policy_ack/${employeeId}/`
//     const dashboardEndpoint = `https://tdtlworld.com/hrms-backend/empdashboard/${employeeId}/`
//     const attendanceEndpoint = `https://tdtlworld.com/hrms-backend/api/dashboard_attendance/${employeeId}/`

//     Promise.all([
//       axios.get(confirmationEndpoint, { headers }),
//       axios.get(policyEndpoint, { headers }),
//       axios.get(dashboardEndpoint, { headers }),
//       axios.get(attendanceEndpoint, { headers }),
//     ])
//       .then(([confirmationResponse, policyResponse, dashboardResponse, attendanceResponse]) => {
//         // --- Process Confirmation and Policy first ---
//         const confirmStatus = confirmationResponse.data?.employee_confirm
//         const policyStatus = policyResponse.data?.status

//         const isPolicyOk = policyStatus === "Y"

//         // ** Set state for notification logic and UI visibility **
//         setHasAcknowledgedPolicies(isPolicyOk)
//         setIsEmployeeConfirmed(confirmStatus === "Y")
//         setShowPunchUI(isPolicyOk) // Punch UI is only shown if policies are acknowledged

//         // --- Process Dashboard Data ---
//         const dashData = dashboardResponse.data
//         setLeaveCount(dashData.leave_days_taken || 0)
//         setLateMarkCount(dashData.late_mark_count || 0)
//         setAwardCount(dashData.award_count || 0)
//         setAssetCount(dashData.asset_count || 0)

//         const inTime = dashData?.office_shift?.in_time
//         const outTime = dashData?.office_shift?.out_time

//         if (inTime === "Holiday" || outTime === "Holiday") {
//           setShiftInfo("My Shift: Holiday")
//           setIsHoliday(true)
//         } else if (inTime && outTime) {
//           setShiftInfo(`My Shift: ${formatApiTime(inTime)} To ${formatApiTime(outTime)}`)
//           setIsHoliday(false)
//         } else {
//           setShiftInfo("My Shift: Not Assigned")
//           setIsHoliday(false)
//         }

//         if (dashData.support_tickets?.count > 0) {
//           const { data: tickets, count: totalTickets } = dashData.support_tickets
//           const priorityCounts = tickets.reduce((acc, ticket) => {
//             acc[ticket.priority] = (acc[ticket.priority] || 0) + 1
//             return acc
//           }, {})
//           setTicketData(
//             Object.entries(priorityCounts).map(([name, count]) => ({
//               name,
//               value: Number.parseFloat(((count / totalTickets) * 100).toFixed(1)),
//             })),
//           )
//         }

//         // --- Process Attendance Data ---
//         const attendanceData = attendanceResponse.data.data
//         if (attendanceData?.length > 0) {
//           const todayAttendance = attendanceData[0]
//           setPunchInTime(todayAttendance.clock_in ? formatApiTime(todayAttendance.clock_in) : null)
//           setPunchOutTime(todayAttendance.clock_out ? formatApiTime(todayAttendance.clock_out) : null)
//         }
//       })
//       .catch((error) => {
//         console.error("Failed to fetch required dashboard data:", error)
//         setSnackbar({ open: true, message: "Could not load dashboard information.", severity: "error" })
//         setShowPunchUI(false)
//       })
//       .finally(() => {
//         setIsLoading(false)
//       })
//   }, [])

//   // ** CORRECTED useEffect FOR HANDLING STATUS NOTIFICATIONS **
//   useEffect(() => {
//     if (isLoading) return // Don't show messages while loading

//     // Priority 1: Check for unacknowledged policies. This is the most important message.
//     if (!hasAcknowledgedPolicies) {
//       setSnackbar({
//         open: true,
//         message: "Acknowledge your policies for Punch In/Out.",
//         severity: "warning",
//       })
//       return // Return to ensure no other message is shown.
//     }

//     // Priority 2: Check for confirmed employee status. This only runs if policies are acknowledged.
//     if (isEmployeeConfirmed) {
//       setSnackbar({
//         open: true,
//         message: "Your employee confirmation is pending.",
//         severity: "warning",
//       })
//     }

//     // No 'else' is needed. If policies are acknowledged and confirmation is pending ('N' or null), no message appears.
//   }, [isLoading, hasAcknowledgedPolicies, isEmployeeConfirmed])

//   const handleCloseSnackbar = (event, reason) => {
//     if (reason === "clickaway") return
//     setSnackbar({ ...snackbar, open: false })
//   }

//   const handleCloseDialog = () => setDialog({ open: false, type: null })
//   const handlePunchClick = (punchType) => {
//     if (loadingType) return
//     setDialog({ open: true, type: punchType })
//   }

//   const executePunch = async () => {
//     const punchType = dialog.type
//     handleCloseDialog()
//     setLoadingType(punchType)

//     let locationString = "Location not available"
//     try {
//       const { latitude, longitude } = await getCurrentLocation()
//       locationString = `Lat: ${latitude.toFixed(5)}, Lon: ${longitude.toFixed(5)}`
//     } catch (error) {
//       setSnackbar({ open: true, message: error.message, severity: "warning" })
//     }

//     const accessToken = localStorage.getItem("accessToken")
//     const employeeId = localStorage.getItem("loggedInUser")
//     if (!accessToken || !employeeId) {
//       setSnackbar({ open: true, message: "Authentication details not found.", severity: "error" })
//       setLoadingType(null)
//       return
//     }

//     const payload = {
//       emp_id: employeeId,
//       punch_time: getISTDateTimeForAPI(),
//       punch_type: punchType,
//       location: locationString,
//     }

//     try {
//       await axios.post("https://tdtlworld.com/hrms-backend/api/employee_attendance/", payload, {
//         headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
//       })
//       const displayTime = getFormattedDateTimeForDisplay()
//       if (punchType === "IN") {
//         setPunchInTime(displayTime)
//         setPunchOutTime(null)
//       } else {
//         setPunchOutTime(displayTime)
//       }
//       setSnackbar({
//         open: true,
//         message: `Successfully Punched ${punchType === "IN" ? "In" : "Out"}!`,
//         severity: "success",
//       })
//     } catch (error) {
//       console.error("Punch API Call Failed:", error.response || error)
//       const errorMessage = error.response?.data?.error || "An unknown error occurred during punch."
//       setSnackbar({ open: true, message: errorMessage, severity: "error" })
//     } finally {
//       setLoadingType(null)
//     }
//   }

//   const isCurrentlyPunchedIn = !!punchInTime && !punchOutTime

//   if (isLoading) {
//     return (
//       <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80vh" }}>
//         <CircularProgress />
//         <Typography sx={{ ml: 2 }}>Loading Dashboard...</Typography>
//       </Box>
//     )
//   }

//   return (
//     <Box sx={{ p: { xs: 2, md: 3 } }}>
//       <Snackbar
//         open={snackbar.open}
//         autoHideDuration={5000}
//         onClose={handleCloseSnackbar}
//         anchorOrigin={{ vertical: "top", horizontal: "center" }}
//       >
//         <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: "100%" }} variant="filled">
//           {snackbar.message}
//         </Alert>
//       </Snackbar>

//       <Dialog open={dialog.open} onClose={handleCloseDialog}>
//         <DialogTitle>{`Confirm Punch ${dialog.type === "IN" ? "In" : "Out"}`}</DialogTitle>
//         <DialogContent>
//           <DialogContentText>Are you sure you want to punch {dialog.type === "IN" ? "in" : "out"}?</DialogContentText>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseDialog} color="primary">
//             Cancel
//           </Button>
//           <Button onClick={executePunch} color="primary" autoFocus>
//             Confirm
//           </Button>
//         </DialogActions>
//       </Dialog>

//       <Grid container spacing={3}>
//         <Grid item xs={12} lg={7}>
//           <Grid container spacing={3}>
//             <Grid item xs={12}>
//               <Paper
//                 sx={{
//                   p: 3,
//                   borderRadius: "12px",
//                   boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
//                   transition: "transform 200ms ease, box-shadow 200ms ease",
//                   "&:hover": {
//                     transform: "translateY(-2px)",
//                     boxShadow: "0 14px 30px rgba(0,0,0,0.12)",
//                   },
//                 }}
//               >
//                 <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
//                   <Box>
//                     <Typography variant="h6">Welcome {userName}</Typography>
//                     <Typography variant="body2" color="text.secondary">
//                       {shiftInfo}
//                     </Typography>
//                   </Box>

//                   {showPunchUI && (
//                     <Box>
//                       {isHoliday ? (
//                         <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//                           <HolidayVillageIcon sx={{ color: "#FF7043" }} />
//                           <Typography variant="h6" sx={{ color: "#FF7043", fontWeight: "bold" }}>
//                             Holiday
//                           </Typography>
//                         </Box>
//                       ) : (
//                         <Box sx={{ display: "flex", gap: 2 }}>
//                           <Button
//                             variant="contained"
//                             onClick={() => handlePunchClick("IN")}
//                             disabled={loadingType !== null || isCurrentlyPunchedIn}
//                             sx={{
//                               backgroundColor: ORANGE,
//                               color: "white",
//                               textTransform: "none",
//                               transition: "background-color 180ms ease, transform 180ms ease",
//                               "&:hover": { backgroundColor: "#e57f2f", transform: "translateY(-1px)" },
//                               "&:active": { transform: "translateY(0)" },
//                             }}
//                           >
//                             {loadingType === "IN" ? "..." : "Punch In"}
//                           </Button>
//                           <Button
//                             variant="contained"
//                             onClick={() => handlePunchClick("OUT")}
//                             disabled={loadingType !== null || !isCurrentlyPunchedIn}
//                             sx={{
//                               backgroundColor: PURPLE,
//                               color: "white",
//                               textTransform: "none",
//                               transition: "background-color 180ms ease, transform 180ms ease",
//                               "&:hover": { backgroundColor: "#7b206e", transform: "translateY(-1px)" },
//                               "&:active": { transform: "translateY(0)" },
//                             }}
//                           >
//                             {loadingType === "OUT" ? "..." : "Punch Out"}
//                           </Button>
//                         </Box>
//                       )}
//                     </Box>
//                   )}
//                 </Box>
//                 {showPunchUI && (
//                   <Box
//                     sx={{
//                       display: "flex",
//                       justifyContent: "space-between",
//                       alignItems: "center",
//                       mt: 2,
//                       px: 1,
//                       borderTop: "1px solid #eee",
//                       pt: 2,
//                       minHeight: "24px",
//                       flexWrap: "wrap",
//                       gap: 1,
//                     }}
//                   >
//                     <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
//                       {punchInTime ? `Punched In: ${punchInTime}` : "Not punched in today"}
//                     </Typography>
//                     <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
//                       {punchOutTime ? `Punched Out: ${punchOutTime}` : ""}
//                     </Typography>
//                   </Box>
//                 )}
//               </Paper>
//             </Grid>

//             {/* MODIFIED: "My Attendance" button is now conditionally rendered */}
//             {showPunchUI && (
//               <Grid item xs={12}>
//                 <Paper
//                   sx={{
//                     p: 2.25,
//                     display: "flex",
//                     justifyContent: "space-between",
//                     alignItems: "center",
//                     bgcolor: PURPLE,
//                     color: "white",
//                     borderRadius: "12px",
//                     boxShadow: "0 8px 22px rgba(140,37,124,0.25)",
//                     transition: "transform 200ms ease, box-shadow 200ms ease, background-color 200ms ease",
//                     "&:hover": {
//                       transform: "translateY(-3px)",
//                       boxShadow: "0 16px 36px rgba(140,37,124,0.28)",
//                       bgcolor: "#7b206e",
//                     },
//                   }}
//                 >
//                   <Button
//                     sx={{
//                       color: "white",
//                       textTransform: "none",
//                       fontWeight: 600,
//                       transition: "opacity 180ms ease",
//                       "&:hover": { opacity: 0.95, background: "transparent" },
//                     }}
//                     endIcon={<ArrowForwardIcon />}
//                     onClick={() => navigate("/hrms/dashboard/attendance")}
//                   >
//                     My Attendance
//                   </Button>
//                 </Paper>
//               </Grid>
//             )}

//             <Grid item xs={12} sm={6}>
//               <InfoCard
//                 title="My Awards"
//                 value={awardCount}
//                 icon={<AttachMoneyIcon />}
//                 bgColor={blueColor}
//                 textColor="white"
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <InfoCard title="Total Assets" value={assetCount} icon={<SpeedIcon />} />
//             </Grid>
//             <Grid item xs={12}>
//               <CardPaper>
//                 <Typography variant="h6" gutterBottom>
//                   Ticket Priority
//                 </Typography>
//                 <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
//                   <Box sx={{ width: 180, height: 180 }}>
//                     <ResponsiveContainer>
//                       <PieChart>
//                         <Pie
//                           data={ticketData}
//                           cx="50%"
//                           cy="50%"
//                           innerRadius={52}
//                           outerRadius={72}
//                           dataKey="value"
//                           label={({ value, name }) => (name === "No Tickets" ? "N/A" : `${value}%`)}
//                           labelLine={false}
//                         >
//                           {ticketData.map((entry, index) => (
//                             <Cell key={`cell-${index}`} fill={TICKET_COLOR_MAP[entry.name]} />
//                           ))}
//                         </Pie>
//                       </PieChart>
//                     </ResponsiveContainer>
//                   </Box>
//                   <Box sx={{ ml: 4 }}>
//                     <StatusLegend items={ticketLegendItems} />
//                   </Box>
//                 </Box>
//               </CardPaper>
//             </Grid>
//           </Grid>
//         </Grid>

//         <Grid item xs={12} lg={5}>
//           <Grid container spacing={3}>
//             <Grid item xs={12} sm={6}>
//               <InfoCard title="My Leave" value={leaveCount} icon={<LabelIcon />} />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <InfoCard
//                 title="Late Mark"
//                 value={lateMarkCount}
//                 icon={<MoreTimeIcon />}
//                 bgColor={blueColor}
//                 textColor="white"
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <CardPaper>
//                 <Typography variant="h6">My Payroll monthly report</Typography>
//                 <Box sx={{ display: "flex", gap: 4, my: 2 }}>
//                   <Box>
//                     <Typography variant="h5" sx={{ fontWeight: "bold" }}>
//                       ₹0.00
//                     </Typography>
//                     <Typography variant="body2" color="text.secondary">
//                       Total
//                     </Typography>
//                   </Box>
//                   <Box>
//                     <Typography variant="h5" sx={{ fontWeight: "bold" }}>
//                       ₹0.00
//                     </Typography>
//                     <Typography variant="body2" color="text.secondary">
//                       This Month
//                     </Typography>
//                   </Box>
//                 </Box>
//                 <Box sx={{ height: 260, width: "100%", mt: 2, ".recharts-wrapper": { ml: -1 } }}>
//                   <ResponsiveContainer>
//                     <LineChart data={payrollChartData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
//                       <CartesianGrid stroke="#e0e0e0" strokeDasharray="5 5" vertical={false} />
//                       <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#666" }} axisLine={false} tickLine={false} />
//                       <YAxis
//                         domain={[0, 5]}
//                         ticks={[0.0, 1.0, 2.0, 3.0, 4.0, 5.0]}
//                         tickFormatter={(tick) => tick.toFixed(1)}
//                         tick={{ fontSize: 12, fill: "#666" }}
//                         axisLine={false}
//                         tickLine={false}
//                       />
//                     </LineChart>
//                   </ResponsiveContainer>
//                 </Box>
//               </CardPaper>
//             </Grid>
//           </Grid>
//         </Grid>
//       </Grid>
//     </Box>
//   )
// }













  import { useState, useEffect } from "react"
  import {
    Box,
    Typography,
    Button,
    Paper,
    Grid,
    useTheme,
    CircularProgress,
  } from "@mui/material"
  import { styled } from "@mui/material/styles"
  import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, XAxis, YAxis, CartesianGrid } from "recharts"
  import { useNavigate } from "react-router-dom"
  import axios from "axios"
  import Swal from "sweetalert2"

  // Icons
  import AttachMoneyIcon from "@mui/icons-material/AttachMoney"
  import SpeedIcon from "@mui/icons-material/Speed"
  import LabelIcon from "@mui/icons-material/Label"
  import ArrowForwardIcon from "@mui/icons-material/ArrowForward"
  import MoreTimeIcon from "@mui/icons-material/MoreTime"
  import HolidayVillageIcon from "@mui/icons-material/HolidayVillage"

  // --- HELPER FUNCTIONS (UNCHANGED LOGIC) ---
  const getCurrentLocation = () =>
    new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Geolocation is not supported."))
        return
      }
      navigator.geolocation.getCurrentPosition(
        (position) =>
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          }),
        () => reject(new Error("Unable to retrieve location. Please grant permission.")),
      )
    })

  const formatApiTime = (timeString) => {
    if (!timeString) return ""
    const today = new Date()
    const [hours, minutes, seconds] = timeString.split(":")
    today.setHours(Number.parseInt(hours, 10), Number.parseInt(minutes, 10), Number.parseInt(seconds, 10) || 0)
    if (isNaN(today.getTime())) return ""
    return today.toLocaleString("en-IN", { timeZone: "Asia/Kolkata", hour: "numeric", minute: "numeric", hour12: true })
  }

  const getFormattedDateTimeForDisplay = () =>
    new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata", hour: "numeric", minute: "numeric", hour12: true })
  const getISTDateTimeForAPI = () => new Date().toLocaleString("sv-SE", { timeZone: "Asia/Kolkata" })

  // --- STYLED COMPONENTS (UPDATED UI) ---
  const CardPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%",
    borderRadius: "12px",
    boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
    transition: "transform 200ms ease, box-shadow 200ms ease",
    willChange: "transform",
    // subtle default tint using purple -> orange translucent gradient (not pure white)
    background: "linear-gradient(135deg, rgba(140,37,124,0.06), rgba(245,142,53,0.04))",
    "&:hover": {
      transform: "translateY(-4px)",
      boxShadow: "0 14px 32px rgba(0,0,0,0.12)",
    },
  }))

  // InfoCard: accepts `icon` as a JSX element (component) and `bgColor` & `textColor`
  const InfoCard = ({ title, value, icon, bgColor, textColor }) => {
    const theme = useTheme()
    const cardBg = bgColor || "linear-gradient(135deg, rgba(140,37,124,0.08), rgba(245,142,53,0.06))"
    const txtColor = textColor || theme.palette.text.primary

    return (
      <CardPaper
        sx={{
          background: cardBg,
          minHeight: 150,
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Box>
            <Typography variant="subtitle1" sx={{ color: txtColor }}>
              {title}
            </Typography>
            <Typography variant="h4" component="p" sx={{ fontWeight: "bold", color: txtColor }}>
              {value}
            </Typography>
          </Box>

          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: "12px",
              display: "grid",
              placeItems: "center",
              color: txtColor,
              backgroundColor: txtColor ? "rgba(255,255,255,0.12)" : "rgba(140,37,124,0.08)",
              transition: "transform 200ms ease",
              "&:hover": { transform: "scale(1.03)" },
            }}
          >
            {/* Render the icon JSX passed in (so callers should pass <AttachMoneyIcon /> etc.) */}
            {icon ? (
              <Box sx={{ fontSize: 28, display: "grid", placeItems: "center", color: "currentColor" }}>{icon}</Box>
            ) : null}
          </Box>
        </Box>
      </CardPaper>
    )
  }

  const StatusLegend = ({ items }) => (
    <Box>
      {items.map((item, index) => (
        <Box key={index} sx={{ display: "flex", alignItems: "center", mb: 0.5 }}>
          <Box sx={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: item.color, mr: 1 }} />
          <Typography variant="body2" color="text.secondary">
            {item.label}
          </Typography>
        </Box>
      ))}
    </Box>
  )

  // --- CONSTANTS ---
  const PURPLE = "#8C257C"
  const ORANGE = "#F58E35"

  const TICKET_COLOR_MAP = {
    Low: "rgba(245, 142, 53, 0.7)", // ORANGE
    Medium: ORANGE,
    High: "rgba(140, 37, 124, 0.7)", // PURPLE
    Critical: PURPLE,
    "No Tickets": "#E0E0E0",
  }
  const ticketLegendItems = [
    { color: TICKET_COLOR_MAP.Low, label: "Low" },
    { color: TICKET_COLOR_MAP.Medium, label: "Medium" },
    { color: TICKET_COLOR_MAP.High, label: "High" },
    { color: TICKET_COLOR_MAP.Critical, label: "Critical" },
  ]
  const payrollChartData = [
    { name: "Jul 2024", value: null },
    { name: "Aug 2024", value: null },
    { name: "Sep 2024", value: null },
    { name: "Oct 2024", value: null },
    { name: "Nov 2024", value: null },
    { name: "Dec 2024", value: null },
    { name: "Jan 2025", value: null },
    { name: "Feb 2025", value: null },
    { name: "Mar 2025", value: null },
    { name: "Apr 2025", value: null },
    { name: "May 2025", value: null },
    { name: "Jun 2025", value: null },
  ]

  export default function Dashboard() {
    const navigate = useNavigate()

    // --- STATE MANAGEMENT ---
    const [userName, setUserName] = useState("")
    const [loadingType, setLoadingType] = useState(null)
    // Data states
    const [punchInTime, setPunchInTime] = useState(null)
    const [punchOutTime, setPunchOutTime] = useState(null)
    const [shiftInfo, setShiftInfo] = useState("My Shift: Loading...")
    const [leaveCount, setLeaveCount] = useState(0)
    const [lateMarkCount, setLateMarkCount] = useState(0)
    const [awardCount, setAwardCount] = useState(0)
    const [assetCount, setAssetCount] = useState(0)
    const [ticketData, setTicketData] = useState([{ name: "No Tickets", value: 100 }])
    const [isHoliday, setIsHoliday] = useState(false)

    // ** State for loading and status checks **
    const [isLoading, setIsLoading] = useState(true)
    const [showPunchUI, setShowPunchUI] = useState(false)
    const [isEmployeeConfirmed, setIsEmployeeConfirmed] = useState(false)
    const [hasAcknowledgedPolicies, setHasAcknowledgedPolicies] = useState(false)

    useEffect(() => {
      const accessToken = localStorage.getItem("accessToken")
      const employeeId = localStorage.getItem("loggedInUser")
      const loggedInEmpId = localStorage.getItem("loggedInEmpId")

      if (!accessToken || !employeeId || !loggedInEmpId) {
        setUserName("User")
        setShiftInfo("My Shift: Not available")
        setIsLoading(false)
        return
      }

      const headers = { Authorization: `Bearer ${accessToken}` }

      axios
        .get("https://tdtlworld.com/hrms-backend/api/dropdown/employee-role/", { headers })
        .then((response) => {
          const currentUser = response.data.find((emp) => String(emp.id) === String(loggedInEmpId))
          setUserName(currentUser?.employee_name || "User")
        })
        .catch((error) => {
          console.error("Failed to fetch user name:", error)
          // show mild alert
          Swal.fire({ icon: "warning", title: "Could not fetch user", text: "User name couldn't be loaded." })
        })

      const confirmationEndpoint = `https://tdtlworld.com/hrms-backend/EmpConfirmation/${employeeId}/`
      const policyEndpoint = `https://tdtlworld.com/hrms-backend/policy_ack/${employeeId}/`
      const dashboardEndpoint = `https://tdtlworld.com/hrms-backend/empdashboard/${employeeId}/`
      const attendanceEndpoint = `https://tdtlworld.com/hrms-backend/api/dashboard_attendance/${employeeId}/`

      Promise.all([
        axios.get(confirmationEndpoint, { headers }),
        axios.get(policyEndpoint, { headers }),
        axios.get(dashboardEndpoint, { headers }),
        axios.get(attendanceEndpoint, { headers }),
      ])
        .then(([confirmationResponse, policyResponse, dashboardResponse, attendanceResponse]) => {
          // --- Process Confirmation and Policy first ---
          const confirmStatus = confirmationResponse.data?.employee_confirm
          const policyStatus = policyResponse.data?.status

          const isPolicyOk = policyStatus === "Y"

          // ** Set state for notification logic and UI visibility **
          setHasAcknowledgedPolicies(isPolicyOk)
          setIsEmployeeConfirmed(confirmStatus === "Y")
          setShowPunchUI(isPolicyOk) // Punch UI is only shown if policies are acknowledged

          // --- Process Dashboard Data ---
          const dashData = dashboardResponse.data
          setLeaveCount(dashData.leave_days_taken || 0)
          setLateMarkCount(dashData.late_mark_count || 0)
          setAwardCount(dashData.award_count || 0)
          setAssetCount(dashData.asset_count || 0)

          const inTime = dashData?.office_shift?.in_time
          const outTime = dashData?.office_shift?.out_time

          if (inTime === "Holiday" || outTime === "Holiday") {
            setShiftInfo("My Shift: Holiday")
            setIsHoliday(true)
          } else if (inTime && outTime) {
            setShiftInfo(`My Shift: ${formatApiTime(inTime)} To ${formatApiTime(outTime)}`)
            setIsHoliday(false)
          } else {
            setShiftInfo("My Shift: Not Assigned")
            setIsHoliday(false)
          }

          if (dashData.support_tickets?.count > 0) {
            const { data: tickets, count: totalTickets } = dashData.support_tickets
            const priorityCounts = tickets.reduce((acc, ticket) => {
              acc[ticket.priority] = (acc[ticket.priority] || 0) + 1
              return acc
            }, {})
            setTicketData(
              Object.entries(priorityCounts).map(([name, count]) => ({
                name,
                value: Number.parseFloat(((count / totalTickets) * 100).toFixed(1)),
              })),
            )
          }

          // --- Process Attendance Data ---
          const attendanceData = attendanceResponse.data.data
          if (attendanceData?.length > 0) {
            const todayAttendance = attendanceData[0]
            setPunchInTime(todayAttendance.clock_in ? formatApiTime(todayAttendance.clock_in) : null)
            setPunchOutTime(todayAttendance.clock_out ? formatApiTime(todayAttendance.clock_out) : null)
          }
        })
        .catch((error) => {
          console.error("Failed to fetch required dashboard data:", error)
          Swal.fire({ icon: "error", title: "Dashboard Load Failed", text: "Could not load dashboard information." })
          setShowPunchUI(false)
        })
        .finally(() => {
          setIsLoading(false)
        })
    }, [])

    // ** CORRECTED useEffect FOR HANDLING STATUS NOTIFICATIONS **
    useEffect(() => {
      if (isLoading) return // Don't show messages while loading

      // Priority 1: Check for unacknowledged policies. This is the most important message.
      if (!hasAcknowledgedPolicies) {
        Swal.fire({
          icon: "warning",
          title: "Policies Not Acknowledged",
          text: "Acknowledge your policies for Punch In/Out.",
        })
        return // Return to ensure no other message is shown.
      }

      // Priority 2: Check for confirmed employee status. This only runs if policies are acknowledged.
      if (isEmployeeConfirmed) {
        Swal.fire({
          icon: "warning",
          title: "Confirmation Pending",
          text: "Your employee confirmation is pending.",
        })
      }

      // No 'else' is needed. If policies are acknowledged and confirmation is pending ('N' or null), no message appears.
    }, [isLoading, hasAcknowledgedPolicies, isEmployeeConfirmed])

    const handlePunchClick = (punchType) => {
      if (loadingType) return

      Swal.fire({
        title: `Confirm Punch ${punchType === "IN" ? "In" : "Out"}`,
        text: `Are you sure you want to punch ${punchType === "IN" ? "in" : "out"}?`,
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Confirm",
        focusCancel: true,
      }).then((result) => {
        if (result.isConfirmed) {
          executePunch(punchType)
        }
      })
    }

    const executePunch = async (punchType) => {
      setLoadingType(punchType)

      let locationString = "Location not available"
      try {
        const { latitude, longitude } = await getCurrentLocation()
        locationString = `Lat: ${latitude.toFixed(5)}, Lon: ${longitude.toFixed(5)}`
      } catch (error) {
        // show warning via Swal
        Swal.fire({ icon: "warning", title: "Location", text: error.message })
      }

      const accessToken = localStorage.getItem("accessToken")
      const employeeId = localStorage.getItem("loggedInUser")
      if (!accessToken || !employeeId) {
        Swal.fire({ icon: "error", title: "Authentication", text: "Authentication details not found." })
        setLoadingType(null)
        return
      }

      const payload = {
        emp_id: employeeId,
        punch_time: getISTDateTimeForAPI(),
        punch_type: punchType,
        location: locationString,
      }

      try {
        await axios.post("https://tdtlworld.com/hrms-backend/api/employee_attendance/", payload, {
          headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
        })
        const displayTime = getFormattedDateTimeForDisplay()
        if (punchType === "IN") {
          setPunchInTime(displayTime)
          setPunchOutTime(null)
        } else {
          setPunchOutTime(displayTime)
        }
        Swal.fire({
          icon: "success",
          title: `Punched ${punchType === "IN" ? "In" : "Out"}`,
          text: `Successfully Punched ${punchType === "IN" ? "In" : "Out"}!`,
          timer: 2200,
        })
      } catch (error) {
        console.error("Punch API Call Failed:", error.response || error)
        const errorMessage = error.response?.data?.error || "An unknown error occurred during punch."
        Swal.fire({ icon: "error", title: "Punch Failed", text: errorMessage })
      } finally {
        setLoadingType(null)
      }
    }

    const isCurrentlyPunchedIn = !!punchInTime && !punchOutTime

    if (isLoading) {
      return (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80vh" }}>
          <CircularProgress />
          <Typography sx={{ ml: 2 }}>Loading Dashboard...</Typography>
        </Box>
      )
    }

    return (
      <Box sx={{ p: { xs: 2, md: 3 } }}>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={7}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Paper
                  sx={{
                    p: 3,
                    borderRadius: "12px",
                    boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
                    transition: "transform 200ms ease, box-shadow 200ms ease",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: "0 14px 30px rgba(0,0,0,0.12)",
                    },
                  }}
                >
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                    <Box>
                      <Typography variant="h6">Welcome {userName}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {shiftInfo}
                      </Typography>
                    </Box>

                    {showPunchUI && (
                      <Box>
                        {isHoliday ? (
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <HolidayVillageIcon sx={{ color: "#FF7043" }} />
                            <Typography variant="h6" sx={{ color: "#FF7043", fontWeight: "bold" }}>
                              Holiday
                            </Typography>
                          </Box>
                        ) : (
                          <Box sx={{ display: "flex", gap: 2 }}>
                            <Button
                              variant="contained"
                              onClick={() => handlePunchClick("IN")}
                              disabled={loadingType !== null || isCurrentlyPunchedIn}
                              sx={{
                                backgroundColor: ORANGE,
                                color: "white",
                                textTransform: "none",
                                fontWeight: 700,
                                boxShadow: "0 8px 18px rgba(245,142,53,0.18)",
                                "&:hover": { backgroundColor: "#e57f2f", transform: "translateY(-1px)" },
                                "&:active": { transform: "translateY(0)" },
                                px: 2.5,
                              }}
                            >
                              {loadingType === "IN" ? "..." : "Punch In"}
                            </Button>
                            <Button
                              variant="contained"
                              onClick={() => handlePunchClick("OUT")}
                              disabled={loadingType !== null || !isCurrentlyPunchedIn}
                              sx={{
                                backgroundColor: PURPLE,
                                color: "white",
                                textTransform: "none",
                                fontWeight: 700,
                                boxShadow: "0 8px 18px rgba(140,37,124,0.18)",
                                "&:hover": { backgroundColor: "#7b206e", transform: "translateY(-1px)" },
                                "&:active": { transform: "translateY(0)" },
                                px: 2.5,
                              }}
                            >
                              {loadingType === "OUT" ? "..." : "Punch Out"}
                            </Button>
                          </Box>
                        )}
                      </Box>
                    )}
                  </Box>
                  {showPunchUI && (
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mt: 2,
                        px: 1,
                        borderTop: "1px solid #eee",
                        pt: 2,
                        minHeight: "24px",
                        flexWrap: "wrap",
                        gap: 1,
                      }}
                    >
                      <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                        {punchInTime ? `Punched In: ${punchInTime}` : "Not punched in today"}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                        {punchOutTime ? `Punched Out: ${punchOutTime}` : ""}
                      </Typography>
                    </Box>
                  )}
                </Paper>
              </Grid>

              {/* "My Attendance" button is conditionally rendered */}
              {showPunchUI && (
                <Grid item xs={12}>
                  <CardPaper
                    sx={{
                      p: 2.25,
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      background: `linear-gradient(135deg, ${PURPLE}22, ${PURPLE}11)`,
                      color: "white",
                      borderRadius: "12px",
                      boxShadow: `0 8px 22px rgba(140,37,124,0.18)`,
                      "&:hover": {
                        transform: "translateY(-3px)",
                        boxShadow: "0 16px 36px rgba(140,37,124,0.28)",
                        background: `linear-gradient(135deg, ${PURPLE}33, ${PURPLE}22)`,
                      },
                    }}
                  >
                    <Button
                      sx={{
                        color: "white",
                        textTransform: "none",
                        fontWeight: 600,
                        transition: "opacity 180ms ease",
                        "&:hover": { opacity: 0.95, background: "transparent" },
                      }}
                      endIcon={<ArrowForwardIcon />}
                      onClick={() => navigate("/hrms/dashboard/attendance")}
                    >
                      My Attendance
                    </Button>
                  </CardPaper>
                </Grid>
              )}

              <Grid item xs={12} sm={6}>
                <InfoCard
                  title="My Awards"
                  value={awardCount}
                  icon={<AttachMoneyIcon sx={{ fontSize: 26 }} />}
                  bgColor={`linear-gradient(135deg, ${PURPLE}, rgba(140,37,124,0.85))`}
                  textColor="white"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <InfoCard
                  title="Total Assets"
                  value={assetCount}
                  icon={<SpeedIcon sx={{ fontSize: 26 }} />}
                  // orange-themed card
                  bgColor={`linear-gradient(135deg, ${ORANGE}, rgba(245,142,53,0.85))`}
                  textColor="white"
                />
              </Grid>
              <Grid item xs={12}>
                <CardPaper sx={{ background: "linear-gradient(135deg, rgba(140,37,124,0.04), rgba(245,142,53,0.03))" }}>
                  <Typography variant="h6" gutterBottom>
                    Ticket Priority
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                    <Box sx={{ width: 180, height: 180 }}>
                      <ResponsiveContainer>
                        <PieChart>
                          <Pie
                            data={ticketData}
                            cx="50%"
                            cy="50%"
                            innerRadius={52}
                            outerRadius={72}
                            dataKey="value"
                            label={({ value, name }) => (name === "No Tickets" ? "N/A" : `${value}%`)}
                            labelLine={false}
                          >
                            {ticketData.map((entry, index) => (
                              <Cell
                                key={`cell-${index}`}
                                fill={TICKET_COLOR_MAP[entry.name] ?? "rgba(0,0,0,0.12)"}
                              />
                            ))}
                          </Pie>
                        </PieChart>
                      </ResponsiveContainer>
                    </Box>
                    <Box sx={{ ml: 4 }}>
                      <StatusLegend items={ticketLegendItems} />
                    </Box>
                  </Box>
                </CardPaper>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} lg={5}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <InfoCard
                  title="My Leave"
                  value={leaveCount}
                  icon={<LabelIcon sx={{ fontSize: 26 }} />}
                  // subtle purple/orange mix so not white
                  bgColor={`linear-gradient(135deg, rgba(140,37,124,0.07), rgba(245,142,53,0.03))`}
                  textColor="#222"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <InfoCard
                  title="Late Mark"
                  value={lateMarkCount}
                  icon={<MoreTimeIcon sx={{ fontSize: 26 }} />}
                  bgColor={`linear-gradient(135deg, ${PURPLE}, rgba(140,37,124,0.85))`}
                  textColor="white"
                />
              </Grid>
              <Grid item xs={12}>
                <CardPaper sx={{ background: "linear-gradient(135deg, rgba(140,37,124,0.04), rgba(245,142,53,0.03))" }}>
                  <Typography variant="h6">My Payroll monthly reports</Typography>
                  <Box sx={{ display: "flex", gap: 4, my: 2 }}>
                    <Box>
                      <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                        ₹0.00
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Total
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                        ₹0.00
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        This Month
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ height: 260, width: "100%", mt: 2, ".recharts-wrapper": { ml: -1 } }}>
                    <ResponsiveContainer>
                      <LineChart data={payrollChartData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                        <CartesianGrid stroke="#e0e0e0" strokeDasharray="5 5" vertical={false} />
                        <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#666" }} axisLine={false} tickLine={false} />
                        <YAxis
                          domain={[0, 5]}
                          ticks={[0.0, 1.0, 2.0, 3.0, 4.0, 5.0]}
                          tickFormatter={(tick) => (typeof tick === "number" ? tick.toFixed(1) : tick)}
                          tick={{ fontSize: 12, fill: "#666" }}
                          axisLine={false}
                          tickLine={false}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </Box>
                </CardPaper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    )
  }
