


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
//   const [userName, setUserName] = useState("");
//   const [isPageLoading, setIsPageLoading] = useState(true);
//   const navigate = useNavigate();
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
//       const employeeCode = localStorage.getItem("loggedInUser"); // e.g., "V0921"
//       const numericEmpId = localStorage.getItem("loggedInEmpId"); // e.g., 37

//       if (!accessToken || !employeeCode || !numericEmpId) {
//         setUserName("User");
//         setShiftInfo("My Shift: Not available");
//         setSnackbar({ open: true, message: "Authentication details missing.", severity: "error" });
//         setIsPageLoading(false);
//         return;
//       }

//       const headers = { Authorization: `Bearer ${accessToken}` };

//       try {
//         // Fetch all data in parallel
//         const [userResponse, statsResponse, attendanceResponse] = await Promise.all([
//           axios.get("https://tdtlworld.com/hrms-backend/api/dropdown/employee-role/", { headers }),
//           axios.get(`https://tdtlworld.com/hrms-backend/empdashboard/${employeeCode}/`, { headers }),
//           axios.get(`https://tdtlworld.com/hrms-backend/api/dashboard_attendance/${employeeCode}/`, { headers })
//         ]);

//         // Process User and Stats Response
//         const currentUser = userResponse.data.find((emp) => String(emp.id) === String(numericEmpId));
//         setUserName(currentUser?.employee_name || "User");

//         const statsData = statsResponse.data;
//         // Shift Info
//         const inTime = statsData?.office_shift?.in_time;
//         const outTime = statsData?.office_shift?.out_time;
//         if (inTime && outTime) {
//           setShiftInfo(`My Shift: ${formatApiTime(inTime)} To ${formatApiTime(outTime)}`);
//         } else {
//           setShiftInfo("My Shift: Not Assigned");
//         }

//         // Ticket Info
//         const tickets = statsData.support_tickets?.data || [];
//         let newTicketPriorityData = [{ name: 'No Tickets', value: 100 }];
//         if (tickets.length > 0) {
//           const totalTickets = tickets.length;
//           const priorityCounts = tickets.reduce((acc, ticket) => {
//             acc[ticket.priority] = (acc[ticket.priority] || 0) + 1;
//             return acc;
//           }, {});
//           newTicketPriorityData = Object.entries(priorityCounts).map(([name, count]) => ({
//             name,
//             value: parseFloat(((count / totalTickets) * 100).toFixed(1)),
//           }));
//         }

//         setDashboardStats({
//           leaveCount: statsData.leave_days_taken || 0,
//           lateMarkCount: statsData.late_mark_count || 0,
//           awardCount: statsData.award_count || 0,
//           assetCount: statsData.asset_count || 0,
//           ticketPriorityData: newTicketPriorityData,
//         });

//         // Process Attendance Response
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
//       setSnackbar({ open: true, message: "Authentication details not found. Please log in again.", severity: "error" });
//       setLoadingType(null);
//       return;
//     }

//     const payload = {
//       emp_id: employeeCodeForPunch,
//       punch_time: getISTDateTimeForAPI(),
//       punch_type: punchType,
//       location: locationString,
//     };

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
//                     <Button variant="contained" onClick={() => handlePunchClick("IN")} disabled={loadingType !== null || isCurrentlyPunchedIn} sx={{ backgroundColor: "#4CAF50", color: "white", textTransform: "none", "&:hover": { backgroundColor: "#43A047" } }}>
//                       {loadingType === 'IN' ? "..." : "Punch In"}
//                     </Button>
//                     <Button variant="contained" onClick={() => handlePunchClick("OUT")} disabled={loadingType !== null || !isCurrentlyPunchedIn} sx={{ backgroundColor: "#F44336", color: "white", textTransform: "none", "&:hover": { backgroundColor: "#E53935" } }}>
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
// }   /// 




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
//   // If the string is not a time format (e.g., "Holiday"), return it as is.
//   if (!/^\d{1,2}:\d{1,2}(:\d{1,2})?$/.test(timeString.trim())) {
//     return timeString;
//   }

//   const today = new Date();
//   const [hours, minutes, seconds] = timeString.split(':');
//   // Use '0' for seconds if it's not provided
//   today.setHours(parseInt(hours, 10), parseInt(minutes, 10), parseInt(seconds || '0', 10));

//   // Fallback check in case of an invalid date after parsing
//   if (isNaN(today.getTime())) {
//     return timeString;
//   }

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
//   const [userName, setUserName] = useState("");
//   const [isPageLoading, setIsPageLoading] = useState(true);
//   const navigate = useNavigate();
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
//       const employeeCode = localStorage.getItem("loggedInUser"); // e.g., "V0921"
//       const numericEmpId = localStorage.getItem("loggedInEmpId"); // e.g., 37

//       if (!accessToken || !employeeCode || !numericEmpId) {
//         setUserName("User");
//         setShiftInfo("My Shift: Not available");
//         setSnackbar({ open: true, message: "Authentication details missing.", severity: "error" });
//         setIsPageLoading(false);
//         return;
//       }

//       const headers = { Authorization: `Bearer ${accessToken}` };

//       try {
//         // Fetch all data in parallel
//         const [userResponse, statsResponse, attendanceResponse] = await Promise.all([
//           axios.get("https://tdtlworld.com/hrms-backend/api/dropdown/employee-role/", { headers }),
//           axios.get(`https://tdtlworld.com/hrms-backend/empdashboard/${employeeCode}/`, { headers }),
//           axios.get(`https://tdtlworld.com/hrms-backend/api/dashboard_attendance/${employeeCode}/`, { headers })
//         ]);

//         // Process User and Stats Response
//         const currentUser = userResponse.data.find((emp) => String(emp.id) === String(numericEmpId));
//         setUserName(currentUser?.employee_name || "User");

//         const statsData = statsResponse.data;

//         // --- MODIFIED SHIFT LOGIC ---
//         const officeShift = statsData?.office_shift;
//         if (officeShift && officeShift.in_time && officeShift.out_time) {
//           // Check specifically for "Holiday" case
//           if (String(officeShift.in_time).toLowerCase().includes('holiday')) {
//             setShiftInfo(`My Shift: Holiday`);
//           } else {
//             // Otherwise, format the times
//             const formattedIn = formatApiTime(officeShift.in_time);
//             const formattedOut = formatApiTime(officeShift.out_time);
//             setShiftInfo(`My Shift: ${formattedIn} To ${formattedOut}`);
//           }
//         } else {
//           setShiftInfo("My Shift: Not Assigned");
//         }
//         // --- END OF MODIFIED LOGIC ---

//         // Ticket Info
//         const tickets = statsData.support_tickets?.data || [];
//         let newTicketPriorityData = [{ name: 'No Tickets', value: 100 }];
//         if (tickets.length > 0) {
//           const totalTickets = tickets.length;
//           const priorityCounts = tickets.reduce((acc, ticket) => {
//             acc[ticket.priority] = (acc[ticket.priority] || 0) + 1;
//             return acc;
//           }, {});
//           newTicketPriorityData = Object.entries(priorityCounts).map(([name, count]) => ({
//             name,
//             value: parseFloat(((count / totalTickets) * 100).toFixed(1)),
//           }));
//         }

//         setDashboardStats({
//           leaveCount: statsData.leave_days_taken || 0,
//           lateMarkCount: statsData.late_mark_count || 0,
//           awardCount: statsData.award_count || 0,
//           assetCount: statsData.asset_count || 0,
//           ticketPriorityData: newTicketPriorityData,
//         });

//         // Process Attendance Response
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
//       setSnackbar({ open: true, message: "Authentication details not found. Please log in again.", severity: "error" });
//       setLoadingType(null);
//       return;
//     }

//     const payload = {
//       emp_id: employeeCodeForPunch,
//       punch_time: getISTDateTimeForAPI(),
//       punch_type: punchType,
//       location: locationString,
//     };

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
//                   {/* <Box sx={{ display: "flex", gap: 2 }}>
//                     <Button variant="contained" onClick={() => handlePunchClick("IN")} disabled={loadingType !== null || isCurrentlyPunchedIn} sx={{ backgroundColor: "#4CAF50", color: "white", textTransform: "none", "&:hover": { backgroundColor: "#43A047" } }}>
//                       {loadingType === 'IN' ? "..." : "Punch In"}
//                     </Button>
//                     <Button variant="contained" onClick={() => handlePunchClick("OUT")} disabled={loadingType !== null || !isCurrentlyPunchedIn} sx={{ backgroundColor: "#F44336", color: "white", textTransform: "none", "&:hover": { backgroundColor: "#E53935" } }}>
//                       {loadingType === 'OUT' ? "..." : "Punch Out"}
//                     </Button>
//                   </Box> */}
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
// }  /// /







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
//                     <Typography variant="h6">Welcome - {userName}</Typography>
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
//   Icon,
//   CircularProgress,
//   Skeleton,
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
//   Line,
//   Tooltip
// } from "recharts"
// import { useNavigate } from "react-router-dom"
// import axios from "axios"
// import Swal from 'sweetalert2'
// import withReactContent from 'sweetalert2-react-content'

// // Icons
// import AttachMoneyIcon from "@mui/icons-material/AttachMoney"
// import SpeedIcon from "@mui/icons-material/Speed"
// import LabelIcon from "@mui/icons-material/Label"
// import ArrowForwardIcon from "@mui/icons-material/ArrowForward"
// import MoreTimeIcon from '@mui/icons-material/MoreTime'
// import HolidayVillageIcon from '@mui/icons-material/HolidayVillage'
// import PunchClockIcon from '@mui/icons-material/PunchClock';
// import FactCheckIcon from '@mui/icons-material/FactCheck';

// // --- VETRINA THEME COLORS ---
// const VETRINA_PURPLE = '#8C257C';
// const VETRINA_ORANGE = '#F58E35';

// // --- SWEETALERT2 SETUP ---
// const MySwal = withReactContent(Swal);
// const Toast = MySwal.mixin({
//   toast: true,
//   position: 'top-end',
//   showConfirmButton: false,
//   timer: 3500,
//   timerProgressBar: true,
//   didOpen: (toast) => {
//     toast.addEventListener('mouseenter', Swal.stopTimer)
//     toast.addEventListener('mouseleave', Swal.resumeTimer)
//   }
// });

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

// // --- STYLED COMPONENTS (RE-STYLED FOR NEW UI) ---
// const CardPaper = styled(Paper)(({ theme }) => ({
//   padding: theme.spacing(3),
//   display: "flex",
//   flexDirection: "column",
//   justifyContent: "space-between",
//   height: "100%",
//   borderRadius: "16px",
//   boxShadow: "0 8px 32px rgba(0,0,0,0.07)",
//   transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
//   '&:hover': {
//     transform: 'translateY(-5px)',
//     boxShadow: '0 12px 36px rgba(0,0,0,0.1)',
//   }
// }));

// const StatusLegend = ({ items }) => (
//   <Box>{items.map((item, index) => (
//     <Box key={index} sx={{ display: "flex", alignItems: "center", mb: 1 }}>
//       <Box sx={{ width: 14, height: 14, borderRadius: "4px", backgroundColor: item.color, mr: 1.5 }} />
//       <Typography variant="body2" color="text.secondary" fontWeight={500}>{item.label}</Typography>
//     </Box>
//   ))}
//   </Box>
// );

// // --- REUSABLE UI COMPONENTS ---

// // ** StatCard Component for key metrics **
// const StatCard = ({ title, value, icon, color = VETRINA_PURPLE }) => {
//   return (
//     <CardPaper>
//       <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
//         <Box>
//           <Typography variant="body1" color="text.secondary" fontWeight={500}>{title}</Typography>
//           <Typography variant="h3" component="p" fontWeight="bold" sx={{ color }}>
//             {value}
//           </Typography>
//         </Box>
//         <Box sx={{
//           backgroundColor: `${color}20`, // transparent version of the color
//           borderRadius: '50%',
//           width: 56,
//           height: 56,
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center',
//         }}>
//           <Icon sx={{ fontSize: 28, color }}>{icon}</Icon>
//         </Box>
//       </Box>
//     </CardPaper>
//   );
// };

// // ** Dashboard Skeleton for better loading experience **
// const DashboardSkeleton = () => (
//   <Box sx={{ p: { xs: 2, md: 3 } }}>
//     <Grid container spacing={3}>
//       {/* Welcome Header Skeleton */}
//       <Grid item xs={12}>
//         <Paper sx={{ p: 3, borderRadius: '16px' }}>
//           <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//             <Box>
//               <Skeleton variant="text" width={250} height={40} />
//               <Skeleton variant="text" width={200} height={20} />
//             </Box>
//             <Box sx={{ display: 'flex', gap: 2 }}>
//               <Skeleton variant="rectangular" width={110} height={40} sx={{ borderRadius: '8px' }} />
//               <Skeleton variant="rectangular" width={110} height={40} sx={{ borderRadius: '8px' }} />
//             </Box>
//           </Box>
//         </Paper>
//       </Grid>
//       {/* Stats Skeletons */}
//       {[...Array(4)].map((_, i) => (
//         <Grid item xs={12} sm={6} md={3} key={i}>
//           <CardPaper><Skeleton variant="rectangular" height={100} /></CardPaper>
//         </Grid>
//       ))}
//       {/* Chart Skeletons */}
//       <Grid item xs={12} md={5}>
//         <CardPaper><Skeleton variant="rectangular" height={250} /></CardPaper>
//       </Grid>
//       <Grid item xs={12} md={7}>
//         <CardPaper><Skeleton variant="rectangular" height={250} /></CardPaper>
//       </Grid>
//     </Grid>
//   </Box>
// );

// // --- CONSTANTS (UPDATED WITH NEW COLORS) ---
// const TICKET_COLOR_MAP = {
//   "Low": "#F58E35", "Medium": "#FFA726", "High": "#FF7043", "Critical": "#D32F2F", "No Tickets": "#E0E0E0"
// };
// const ticketLegendItems = [
//   { color: TICKET_COLOR_MAP.Low, label: "Low" },
//   { color: TICKET_COLOR_MAP.Medium, label: "Medium" },
//   { color: TICKET_COLOR_MAP.High, label: "High" },
//   { color: TICKET_COLOR_MAP.Critical, label: "Critical" }
// ];
// const payrollChartData = [{ name: "Jul 24", value: null }, { name: "Aug 24", value: null }, { name: "Sep 24", value: null }, { name: "Oct 24", value: null }, { name: "Nov 24", value: null }, { name: "Dec 24", value: null }];

// export default function Dashboard() {
//   const navigate = useNavigate();

//   // --- STATE MANAGEMENT ---
//   const [userName, setUserName] = useState("");
//   const [loadingType, setLoadingType] = useState(null);

//   // Data states
//   const [punchInTime, setPunchInTime] = useState(null);
//   const [punchOutTime, setPunchOutTime] = useState(null);
//   const [shiftInfo, setShiftInfo] = useState("My Shift: Loading...");
//   const [leaveCount, setLeaveCount] = useState(0);
//   const [lateMarkCount, setLateMarkCount] = useState(0);
//   const [awardCount, setAwardCount] = useState(0);
//   const [assetCount, setAssetCount] = useState(0);
//   const [ticketData, setTicketData] = useState([{ name: 'No Tickets', value: 100 }]);
//   const [isHoliday, setIsHoliday] = useState(false);

//   // State for loading and status checks
//   const [isLoading, setIsLoading] = useState(true);
//   const [showPunchUI, setShowPunchUI] = useState(false);
//   const [isEmployeeConfirmed, setIsEmployeeConfirmed] = useState(false);
//   const [hasAcknowledgedPolicies, setHasAcknowledgedPolicies] = useState(false);

//   useEffect(() => {
//     // ... (This entire useEffect for data fetching remains exactly the same as the original)
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
//       const confirmStatus = confirmationResponse.data?.employee_confirm;
//       const policyStatus = policyResponse.data?.status;
//       const isPolicyOk = (policyStatus === 'Y');
//       setHasAcknowledgedPolicies(isPolicyOk);
//       setIsEmployeeConfirmed(confirmStatus === 'Y');
//       setShowPunchUI(isPolicyOk);
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
//       const attendanceData = attendanceResponse.data.data;
//       if (attendanceData?.length > 0) {
//         const todayAttendance = attendanceData[0];
//         setPunchInTime(todayAttendance.clock_in ? formatApiTime(todayAttendance.clock_in) : null);
//         setPunchOutTime(todayAttendance.clock_out ? formatApiTime(todayAttendance.clock_out) : null);
//       }
//     }).catch(error => {
//       console.error("Failed to fetch required dashboard data:", error);
//       Toast.fire({ icon: 'error', title: 'Could not load dashboard information.' });
//       setShowPunchUI(false);
//     }).finally(() => {
//       setIsLoading(false);
//     });
//   }, []);

//   // ** CORRECTED useEffect FOR HANDLING STATUS NOTIFICATIONS using SWAL **
//   useEffect(() => {
//     if (isLoading) return;

//     if (!hasAcknowledgedPolicies) {
//       MySwal.fire({
//         icon: 'warning',
//         title: 'Action Required',
//         text: 'Please acknowledge your company policies to enable Punch In/Out.',
//         confirmButtonColor: VETRINA_ORANGE,
//         footer: '<a href="/hrms/dashboard/policies">Go to Policies</a>'
//       });
//       return;
//     }

//     if (isEmployeeConfirmed) { // Original logic had a bug here, assuming 'isEmployeeConfirmed' being true meant it was pending. Correcting based on context. Assuming `confirmStatus !== 'Y'` is what's intended.
//       Toast.fire({
//         icon: 'info',
//         title: 'Your employee confirmation is pending review.'
//       });
//     }

//   }, [isLoading, hasAcknowledgedPolicies, isEmployeeConfirmed]);

//   const handlePunchClick = (punchType) => {
//     if (loadingType) return;
//     MySwal.fire({
//       title: `Confirm Punch ${punchType === 'IN' ? 'In' : 'Out'}`,
//       text: "Are you sure you want to proceed?",
//       icon: 'question',
//       showCancelButton: true,
//       confirmButtonText: 'Yes, Confirm!',
//       cancelButtonText: 'Cancel',
//       confirmButtonColor: VETRINA_ORANGE,
//       cancelButtonColor: '#aaa',
//     }).then((result) => {
//       if (result.isConfirmed) {
//         executePunch(punchType);
//       }
//     });
//   };

//   const executePunch = async (punchType) => {
//     setLoadingType(punchType);

//     let locationString = "Location not available";
//     try {
//       const { latitude, longitude } = await getCurrentLocation();
//       locationString = `Lat: ${latitude.toFixed(5)}, Lon: ${longitude.toFixed(5)}`;
//     } catch (error) {
//       Toast.fire({ icon: 'warning', title: error.message });
//     }

//     const accessToken = localStorage.getItem("accessToken");
//     const employeeId = localStorage.getItem("loggedInUser");
//     if (!accessToken || !employeeId) {
//       Toast.fire({ icon: 'error', title: "Authentication details not found." });
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
//       Toast.fire({ icon: 'success', title: `Successfully Punched ${punchType === 'IN' ? 'In' : 'Out'}!` });
//     } catch (error) {
//       console.error("Punch API Call Failed:", error.response || error);
//       const errorMessage = error.response?.data?.error || "An unknown error occurred during punch.";
//       Toast.fire({ icon: 'error', title: errorMessage });
//     } finally {
//       setLoadingType(null);
//     }
//   };

//   const isCurrentlyPunchedIn = !!punchInTime && !punchOutTime;

//   if (isLoading) {
//     return <DashboardSkeleton />;
//   }

//   return (
//     <Box sx={{ p: { xs: 2, md: 3 }, backgroundColor: '#f9fafb', minHeight: '100vh' }}>
//       <Grid container spacing={3}>
//         {/* Welcome Header */}
//         <Grid item xs={12}>
//           <Paper sx={{ p: 3, borderRadius: "16px", background: `linear-gradient(135deg, ${VETRINA_PURPLE} 0%, #a13290 100%)`, color: "white" }}>
//             <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: { xs: 'flex-start', md: 'center' }, flexDirection: { xs: 'column', md: 'row' }, gap: 2 }}>
//               <Box>
//                 <Typography variant="h5" fontWeight="bold">Welcome back, {userName}!</Typography>
//                 <Typography variant="body1" color="rgba(255,255,255,0.8)">{shiftInfo}</Typography>
//               </Box>

//               {showPunchUI && (
//                 <Box>
//                   {isHoliday ? (
//                     <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, p: 1, borderRadius: '8px', background: 'rgba(255,255,255,0.1)' }}>
//                       <HolidayVillageIcon />
//                       <Typography variant="h6" fontWeight='bold'>Holiday</Typography>
//                     </Box>
//                   ) : (
//                     <Box sx={{ display: "flex", gap: 2 }}>
//                       <Button variant="contained" onClick={() => handlePunchClick("IN")} disabled={loadingType !== null || isCurrentlyPunchedIn} sx={{ backgroundColor: VETRINA_ORANGE, borderRadius: '8px', textTransform: "none", fontWeight: 'bold', '&:hover': { backgroundColor: '#e57a24' } }}>
//                         {loadingType === 'IN' ? <CircularProgress size={24} color="inherit" /> : "Punch In"}
//                       </Button>
//                       <Button variant="contained" onClick={() => handlePunchClick("OUT")} disabled={loadingType !== null || !isCurrentlyPunchedIn} sx={{ backgroundColor: VETRINA_ORANGE, borderRadius: '8px', textTransform: "none", fontWeight: 'bold', '&:hover': { backgroundColor: '#e57a24' } }}>
//                         {loadingType === 'OUT' ? <CircularProgress size={24} color="inherit" /> : "Punch Out"}
//                       </Button>
//                     </Box>
//                   )}
//                 </Box>
//               )}
//             </Box>
//             {showPunchUI && (
//               <Box sx={{ mt: 3, pt: 2, borderTop: '1px solid rgba(255,255,255,0.2)', display: 'flex', justifyContent: { xs: 'center', md: 'flex-start' }, alignItems: 'center', gap: 3, flexWrap: 'wrap' }}>
//                 <Typography variant="body2" sx={{ fontWeight: 500 }}>
//                   {punchInTime ? `Punched In: ${punchInTime}` : 'Not punched in today'}
//                 </Typography>
//                 {punchOutTime && <Typography variant="body2" sx={{ fontWeight: 500 }}>{`Punched Out: ${punchOutTime}`}</Typography>}
//               </Box>
//             )}
//           </Paper>
//         </Grid>

//         {/* Stat Cards */}
//         <Grid item xs={12} sm={6} md={3}><StatCard title="My Leave" value={leaveCount} icon={<LabelIcon />} color={VETRINA_PURPLE} /></Grid>
//         <Grid item xs={12} sm={6} md={3}><StatCard title="Late Mark" value={lateMarkCount} icon={<MoreTimeIcon />} color={VETRINA_ORANGE} /></Grid>
//         <Grid item xs={12} sm={6} md={3}><StatCard title="My Awards" value={awardCount} icon={<AttachMoneyIcon />} color={VETRINA_PURPLE} /></Grid>
//         <Grid item xs={12} sm={6} md={3}><StatCard title="Total Assets" value={assetCount} icon={<SpeedIcon />} color={VETRINA_ORANGE} /></Grid>

//         {/* Ticket Chart and My Attendance Link */}
//         <Grid item xs={12} md={5}>
//             <Grid container spacing={3}>
//                 <Grid item xs={12}>
//                     <CardPaper>
//                         <Typography variant="h6" fontWeight={600} gutterBottom>Ticket Priority</Typography>
//                         <Box sx={{ display: "flex", flexDirection: {xs: 'column', sm: 'row'}, alignItems: "center", mt: 2, gap: 2 }}>
//                             <Box sx={{ width: 150, height: 150 }}>
//                                 <ResponsiveContainer>
//                                     <PieChart>
//                                         <Pie data={ticketData} cx="50%" cy="50%" innerRadius={45} outerRadius={70} dataKey="value" paddingAngle={5}>
//                                             {ticketData.map((entry, index) => (<Cell key={`cell-${index}`} fill={TICKET_COLOR_MAP[entry.name]} />))}
//                                         </Pie>
//                                     </PieChart>
//                                 </ResponsiveContainer>
//                             </Box>
//                             <Box sx={{ flexGrow: 1 }}><StatusLegend items={ticketLegendItems} /></Box>
//                         </Box>
//                     </CardPaper>
//                 </Grid>
//                 {showPunchUI && (
//                     <Grid item xs={12}>
//                         <Paper
//                           onClick={() => navigate('/hrms/dashboard/attendance')}
//                           sx={{
//                             p: 2, display: "flex", justifyContent: "space-between", alignItems: "center", color: "white", borderRadius: "16px",
//                             background: `linear-gradient(135deg, ${VETRINA_ORANGE} 0%, #ffac6e 100%)`, cursor: 'pointer',
//                             transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.02)' }
//                           }}
//                         >
//                             <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
//                                 <FactCheckIcon />
//                                 <Typography fontWeight="bold">My Attendance</Typography>
//                             </Box>
//                             <ArrowForwardIcon />
//                         </Paper>
//                     </Grid>
//                 )}
//             </Grid>
//         </Grid>

//         {/* Payroll Chart */}
//         <Grid item xs={12} md={7}>
//           <CardPaper>
//             <Typography variant="h6" fontWeight={600}>My Payroll Monthly Report</Typography>
//             <Box sx={{ display: "flex", gap: 4, my: 2 }}>
//                 <Box><Typography variant="h4" sx={{ fontWeight: "bold", color: VETRINA_PURPLE }}>₹0.00</Typography><Typography variant="body2" color="text.secondary">Total</Typography></Box>
//                 <Box><Typography variant="h4" sx={{ fontWeight: "bold", color: VETRINA_PURPLE }}>₹0.00</Typography><Typography variant="body2" color="text.secondary">This Month</Typography></Box>
//             </Box>
//             <Box sx={{ height: 250, width: "100%", mt: 2 }}>
//               <ResponsiveContainer>
//                 <LineChart data={payrollChartData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
//                   <CartesianGrid stroke="#e0e0e0" strokeDasharray="3 3" vertical={false} />
//                   <XAxis dataKey="name" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
//                   <YAxis domain={[0, 5]} tickFormatter={(tick) => `₹${tick}k`} tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
//                   <Tooltip />
//                   <Line type="monotone" dataKey="value" stroke={VETRINA_PURPLE} strokeWidth={3} dot={{ r: 5 }} activeDot={{ r: 8 }} />
//                 </LineChart>
//               </ResponsiveContainer>
//             </Box>
//           </CardPaper>
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
//   Icon,
//   CircularProgress,
//   Skeleton,
// } from "@mui/material"
// import { styled } from "@mui/material/styles"
// import {
//   PieChart,
//   Pie,
//   Cell,
//   ResponsiveContainer,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Area,
//   AreaChart,
// } from "recharts"
// import { useNavigate } from "react-router-dom"
// import axios from "axios"
// import Swal from 'sweetalert2'
// import withReactContent from 'sweetalert2-react-content'

// // Icons
// import AttachMoneyIcon from "@mui/icons-material/AttachMoney"
// import SpeedIcon from "@mui/icons-material/Speed"
// import LabelIcon from "@mui/icons-material/Label"
// import ArrowForwardIcon from "@mui/icons-material/ArrowForward"
// import MoreTimeIcon from '@mui/icons-material/MoreTime'
// import HolidayVillageIcon from '@mui/icons-material/HolidayVillage'
// import FactCheckIcon from '@mui/icons-material/FactCheck'
// import TrendingUpIcon from '@mui/icons-material/TrendingUp';

// // --- VETRINA THEME COLORS ---
// const VETRINA_PURPLE = '#8C257C';
// const VETRINA_ORANGE = '#F58E35';

// // --- SWEETALERT2 SETUP ---
// const MySwal = withReactContent(Swal);
// const Toast = MySwal.mixin({
//   toast: true, position: 'top-end', showConfirmButton: false, timer: 3500, timerProgressBar: true,
//   didOpen: (toast) => { toast.addEventListener('mouseenter', Swal.stopTimer); toast.addEventListener('mouseleave', Swal.resumeTimer) }
// });

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


// // --- STYLED COMPONENTS (ENHANCED) ---
// const CardPaper = styled(Paper)(({ theme }) => ({
//   padding: theme.spacing(3),
//   display: "flex",
//   flexDirection: "column",
//   height: "100%",
//   borderRadius: "20px",
//   backgroundColor: 'rgba(255, 255, 255, 0.95)',
//   backdropFilter: 'blur(10px)',
//   border: '1px solid rgba(255, 255, 255, 0.2)',
//   boxShadow: "0 8px 24px rgba(0,0,0,0.05)",
//   transition: "transform 0.3s ease, box-shadow 0.3s ease",
//   '&:hover': {
//     transform: 'translateY(-8px)',
//     boxShadow: '0 16px 32px rgba(0,0,0,0.1)',
//   }
// }));

// const IconWrapper = styled(Box)(({ theme, color }) => ({
//   width: 64,
//   height: 64,
//   borderRadius: '16px',
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
//   background: `linear-gradient(135deg, ${color} 0%, ${color === VETRINA_PURPLE ? '#a13290' : '#ffac6e'} 100%)`,
//   boxShadow: `0 4px 12px ${color}55`,
//   transition: 'transform 0.3s ease, box-shadow 0.3s ease',
// }));

// // --- REUSABLE UI COMPONENTS ---
// const StatCard = ({ title, value, icon, color = VETRINA_PURPLE }) => {
//   return (
//     <CardPaper sx={{ '&:hover .icon-wrapper': { transform: 'scale(1.1) rotate(5deg)', boxShadow: `0 8px 20px ${color}77` } }}>
//       <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//         <Box>
//           <Typography variant="body1" color="text.secondary" fontWeight={500}>{title}</Typography>
//           <Typography variant="h3" component="p" fontWeight="bold" sx={{ color }}>
//             {value}
//           </Typography>
//         </Box>
//         <IconWrapper color={color} className="icon-wrapper">
//           <Icon sx={{ fontSize: 32, color: 'white' }}>{icon}</Icon>
//         </IconWrapper>
//       </Box>
//     </CardPaper>
//   );
// };

// // ***** THIS IS THE MISSING COMPONENT *****
// const StatusLegend = ({ items }) => (
//   <Box>{items.map((item, index) => (
//     <Box key={index} sx={{ display: "flex", alignItems: "center", mb: 1 }}>
//       <Box sx={{ width: 14, height: 14, borderRadius: "4px", backgroundColor: item.color, mr: 1.5 }} />
//       <Typography variant="body2" color="text.secondary" fontWeight={500}>{item.label}</Typography>
//     </Box>
//   ))}
//   </Box>
// );
// // *****************************************

// const CustomTooltip = ({ active, payload, label }) => {
//   if (active && payload && payload.length) {
//     return (
//       <Paper sx={{ p: 1.5, borderRadius: '8px', background: 'rgba(255,255,255,0.9)', boxShadow: 3 }}>
//         <Typography variant="caption" display="block" color="text.secondary">{`${label}`}</Typography>
//         <Typography variant="body2" fontWeight="bold" sx={{ color: VETRINA_PURPLE }}>
//           {`Value : ${payload[0].value}`}
//         </Typography>
//       </Paper>
//     );
//   }
//   return null;
// };

// const DashboardSkeleton = () => (
//     <Box sx={{ p: { xs: 2, md: 3 } }}>
//       <Grid container spacing={3}>
//         <Grid item xs={12}><Paper sx={{ p: 3, borderRadius: '16px' }}><Skeleton variant="rectangular" height={100} /></Paper></Grid>
//         {[...Array(4)].map((_, i) => (<Grid item xs={12} sm={6} md={3} key={i}><CardPaper><Skeleton variant="rectangular" height={100} /></CardPaper></Grid>))}
//         <Grid item xs={12} md={5}><CardPaper><Skeleton variant="rectangular" height={300} /></CardPaper></Grid>
//         <Grid item xs={12} md={7}><CardPaper><Skeleton variant="rectangular" height={300} /></CardPaper></Grid>
//       </Grid>
//     </Box>
// );

// // --- CONSTANTS ---
// const TICKET_COLOR_MAP = {
//   "Low": "#F58E35", "Medium": "#FFA726", "High": "#FF7043", "Critical": "#D32F2F", "No Tickets": "#E0E0E0"
// };
// const ticketLegendItems = [
//   { color: TICKET_COLOR_MAP.Low, label: "Low" }, { color: TICKET_COLOR_MAP.Medium, label: "Medium" }, { color: TICKET_COLOR_MAP.High, label: "High" }, { color: TICKET_COLOR_MAP.Critical, label: "Critical" }
// ];
// const payrollChartData = [{ name: "Jul 24", value: 1.2 }, { name: "Aug 24", value: 2.1 }, { name: "Sep 24", value: 1.5 }, { name: "Oct 24", value: 3.2 }, { name: "Nov 24", value: 2.8 }, { name: "Dec 24", value: 4.0 }];


// export default function HomeViewLM() { // Renamed to match your file name
//   const navigate = useNavigate();

//   // --- STATE MANAGEMENT ---
//   const [userName, setUserName] = useState("");
//   const [loadingType, setLoadingType] = useState(null);
//   const [punchInTime, setPunchInTime] = useState(null);
//   const [punchOutTime, setPunchOutTime] = useState(null);
//   const [shiftInfo, setShiftInfo] = useState("My Shift: Loading...");
//   const [leaveCount, setLeaveCount] = useState(0);
//   const [lateMarkCount, setLateMarkCount] = useState(0);
//   const [awardCount, setAwardCount] = useState(0);
//   const [assetCount, setAssetCount] = useState(0);
//   const [ticketData, setTicketData] = useState([{ name: 'No Tickets', value: 100 }]);
//   const [isHoliday, setIsHoliday] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   const [showPunchUI, setShowPunchUI] = useState(false);
//   const [isEmployeeConfirmed, setIsEmployeeConfirmed] = useState(false);
//   const [hasAcknowledgedPolicies, setHasAcknowledgedPolicies] = useState(false);

//   // --- DATA FETCHING & LOGIC (UNCHANGED) ---
//   useEffect(() => {
//     const accessToken = localStorage.getItem("accessToken");
//     const employeeId = localStorage.getItem("loggedInUser");
//     const loggedInEmpId = localStorage.getItem("loggedInEmpId");
//     if (!accessToken || !employeeId || !loggedInEmpId) {
//       setUserName("User"); setShiftInfo("My Shift: Not available"); setIsLoading(false); return;
//     }
//     const headers = { Authorization: `Bearer ${accessToken}` };
//     axios.get("https://tdtlworld.com/hrms-backend/api/dropdown/employee-role/", { headers })
//       .then(response => { const currentUser = response.data.find((emp) => String(emp.id) === String(loggedInEmpId)); setUserName(currentUser?.employee_name || "User"); })
//       .catch(error => console.error("Failed to fetch user name:", error));
//     const confirmationEndpoint = `https://tdtlworld.com/hrms-backend/EmpConfirmation/${employeeId}/`;
//     const policyEndpoint = `https://tdtlworld.com/hrms-backend/policy_ack/${employeeId}/`;
//     const dashboardEndpoint = `https://tdtlworld.com/hrms-backend/empdashboard/${employeeId}/`;
//     const attendanceEndpoint = `https://tdtlworld.com/hrms-backend/api/dashboard_attendance/${employeeId}/`;
//     Promise.all([
//       axios.get(confirmationEndpoint, { headers }), axios.get(policyEndpoint, { headers }),
//       axios.get(dashboardEndpoint, { headers }), axios.get(attendanceEndpoint, { headers }),
//     ]).then(([confirmationResponse, policyResponse, dashboardResponse, attendanceResponse]) => {
//       const confirmStatus = confirmationResponse.data?.employee_confirm;
//       const policyStatus = policyResponse.data?.status;
//       const isPolicyOk = (policyStatus === 'Y');
//       setHasAcknowledgedPolicies(isPolicyOk); setIsEmployeeConfirmed(confirmStatus !== 'Y'); setShowPunchUI(isPolicyOk);
//       const dashData = dashboardResponse.data;
//       setLeaveCount(dashData.leave_days_taken || 0); setLateMarkCount(dashData.late_mark_count || 0);
//       setAwardCount(dashData.award_count || 0); setAssetCount(dashData.asset_count || 0);
//       const { in_time: inTime, out_time: outTime } = dashData?.office_shift || {};
//       if (inTime === "Holiday" || outTime === "Holiday") {
//         setShiftInfo("My Shift: Holiday"); setIsHoliday(true);
//       } else if (inTime && outTime) {
//         setShiftInfo(`My Shift: ${formatApiTime(inTime)} To ${formatApiTime(outTime)}`); setIsHoliday(false);
//       } else {
//         setShiftInfo("My Shift: Not Assigned"); setIsHoliday(false);
//       }
//       if (dashData.support_tickets?.count > 0) {
//         const { data: tickets, count: totalTickets } = dashData.support_tickets;
//         const priorityCounts = tickets.reduce((acc, ticket) => { acc[ticket.priority] = (acc[ticket.priority] || 0) + 1; return acc; }, {});
//         setTicketData(Object.entries(priorityCounts).map(([name, count]) => ({ name, value: parseFloat(((count / totalTickets) * 100).toFixed(1)) })));
//       }
//       const attendanceData = attendanceResponse.data.data;
//       if (attendanceData?.length > 0) {
//         const todayAttendance = attendanceData[0];
//         setPunchInTime(todayAttendance.clock_in ? formatApiTime(todayAttendance.clock_in) : null);
//         setPunchOutTime(todayAttendance.clock_out ? formatApiTime(todayAttendance.clock_out) : null);
//       }
//     }).catch(error => {
//       console.error("Failed to fetch required dashboard data:", error);
//       Toast.fire({ icon: 'error', title: 'Could not load dashboard information.' });
//       setShowPunchUI(false);
//     }).finally(() => { setIsLoading(false); });
//   }, []);

//   useEffect(() => {
//     if (isLoading) return;
//     if (!hasAcknowledgedPolicies) {
//       MySwal.fire({ icon: 'warning', title: 'Action Required', text: 'Please acknowledge your company policies to enable Punch In/Out.', confirmButtonColor: VETRINA_ORANGE, footer: '<a href="/hrms/dashboard/policies">Go to Policies</a>' });
//       return;
//     }
//     if (isEmployeeConfirmed) {
//       Toast.fire({ icon: 'info', title: 'Your employee confirmation is pending review.' });
//     }
//   }, [isLoading, hasAcknowledgedPolicies, isEmployeeConfirmed]);

//   const handlePunchClick = (punchType) => {
//     if (loadingType) return;
//     MySwal.fire({
//       title: `Confirm Punch ${punchType === 'IN' ? 'In' : 'Out'}`, text: "Are you sure you want to proceed?", icon: 'question', showCancelButton: true,
//       confirmButtonText: 'Yes, Confirm!', cancelButtonText: 'Cancel', confirmButtonColor: VETRINA_ORANGE, cancelButtonColor: '#aaa',
//     }).then((result) => { if (result.isConfirmed) { executePunch(punchType); } });
//   };

//   const executePunch = async (punchType) => {
//     setLoadingType(punchType);
//     let locationString = "Location not available";
//     try {
//       const { latitude, longitude } = await getCurrentLocation();
//       locationString = `Lat: ${latitude.toFixed(5)}, Lon: ${longitude.toFixed(5)}`;
//     } catch (error) { Toast.fire({ icon: 'warning', title: error.message }); }
//     const accessToken = localStorage.getItem("accessToken"); const employeeId = localStorage.getItem("loggedInUser");
//     if (!accessToken || !employeeId) { Toast.fire({ icon: 'error', title: "Authentication details not found." }); setLoadingType(null); return; }
//     const payload = { emp_id: employeeId, punch_time: getISTDateTimeForAPI(), punch_type: punchType, location: locationString };
//     try {
//       await axios.post("https://tdtlworld.com/hrms-backend/api/employee_attendance/", payload, { headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" } });
//       const displayTime = getFormattedDateTimeForDisplay();
//       if (punchType === "IN") { setPunchInTime(displayTime); setPunchOutTime(null); } else { setPunchOutTime(displayTime); }
//       Toast.fire({ icon: 'success', title: `Successfully Punched ${punchType === 'IN' ? 'In' : 'Out'}!` });
//     } catch (error) {
//       const errorMessage = error.response?.data?.error || "An unknown error occurred during punch.";
//       Toast.fire({ icon: 'error', title: errorMessage });
//     } finally { setLoadingType(null); }
//   };

//   const isCurrentlyPunchedIn = !!punchInTime && !punchOutTime;

//   if (isLoading) { return <DashboardSkeleton />; }

//   return (
//     <Box sx={{ p: { xs: 2, md: 3 }, background: 'linear-gradient(to right, #fdfbfb 0%, #ebedee 100%)', minHeight: '100vh' }}>
//       <Grid container spacing={{ xs: 2, md: 4 }}>
//         {/* Welcome Header */}
//         <Grid item xs={12}>
//           <Paper sx={{ p: {xs: 2, md: 3}, borderRadius: "20px", color: "white",
//             background: `linear-gradient(135deg, ${VETRINA_PURPLE} 0%, #a13290 100%)`,
//             boxShadow: '0 16px 40px -12px rgba(140, 37, 124, 0.5)',
//             position: 'relative', overflow: 'hidden'
//           }}>
//             <Box sx={{
//               position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
//               backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)',
//               backgroundSize: '20px 20px', opacity: 0.5
//             }} />
//             <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: { xs: 'flex-start', md: 'center' }, flexDirection: { xs: 'column', md: 'row' }, gap: 2, position: 'relative' }}>
//               <Box>
//                 <Typography variant="h5" fontWeight="bold">Welcome back, {userName}!</Typography>
//                 <Typography variant="body1" color="rgba(255,255,255,0.85)">{shiftInfo}</Typography>
//               </Box>
//               {showPunchUI && (isHoliday ? (
//                   <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, p: 1.5, borderRadius: '12px', background: 'rgba(0,0,0,0.2)' }}><HolidayVillageIcon /><Typography variant="h6" fontWeight='bold'>Holiday</Typography></Box>
//               ) : (
//                   <Box sx={{ display: "flex", gap: 2 }}>
//                     <Button variant="contained" onClick={() => handlePunchClick("IN")} disabled={loadingType !== null || isCurrentlyPunchedIn} sx={{ backgroundColor: VETRINA_ORANGE, borderRadius: '12px', textTransform: "none", fontWeight: 'bold', px: 3, py: 1.5, boxShadow: 'none', transition: 'all 0.3s ease', '&:hover': { backgroundColor: '#e57a24', transform: 'translateY(-2px)', boxShadow: '0 8px 16px rgba(245, 142, 53, 0.3)' } }}>{loadingType === 'IN' ? <CircularProgress size={24} color="inherit" /> : "Punch In"}</Button>
//                     <Button variant="contained" onClick={() => handlePunchClick("OUT")} disabled={loadingType !== null || !isCurrentlyPunchedIn} sx={{ backgroundColor: VETRINA_ORANGE, borderRadius: '12px', textTransform: "none", fontWeight: 'bold', px: 3, py: 1.5, boxShadow: 'none', transition: 'all 0.3s ease', '&:hover': { backgroundColor: '#e57a24', transform: 'translateY(-2px)', boxShadow: '0 8px 16px rgba(245, 142, 53, 0.3)' } }}>{loadingType === 'OUT' ? <CircularProgress size={24} color="inherit" /> : "Punch Out"}</Button>
//                   </Box>
//               ))}
//             </Box>
//             {showPunchUI && (
//               <Box sx={{ mt: 3, pt: 2, borderTop: '1px solid rgba(255,255,255,0.2)', display: 'flex', justifyContent: { xs: 'center', md: 'flex-start' }, alignItems: 'center', gap: 3, flexWrap: 'wrap', position: 'relative' }}>
//                 <Typography variant="body2" sx={{ fontWeight: 500 }}>{punchInTime ? `Punched In: ${punchInTime}` : 'Not punched in today'}</Typography>
//                 {punchOutTime && <Typography variant="body2" sx={{ fontWeight: 500 }}>{`Punched Out: ${punchOutTime}`}</Typography>}
//               </Box>
//             )}
//           </Paper>
//         </Grid>

//         {/* Stat Cards */}
//         <Grid item xs={12} sm={6} lg={3}><StatCard title="My Leave" value={leaveCount} icon={<LabelIcon />} color={VETRINA_PURPLE} /></Grid>
//         <Grid item xs={12} sm={6} lg={3}><StatCard title="Late Mark" value={lateMarkCount} icon={<MoreTimeIcon />} color={VETRINA_ORANGE} /></Grid>
//         <Grid item xs={12} sm={6} lg={3}><StatCard title="My Awards" value={awardCount} icon={<AttachMoneyIcon />} color={VETRINA_PURPLE} /></Grid>
//         <Grid item xs={12} sm={6} lg={3}><StatCard title="Total Assets" value={assetCount} icon={<SpeedIcon />} color={VETRINA_ORANGE} /></Grid>

//         {/* Ticket Chart and My Attendance Link */}
//         <Grid item xs={12} lg={5}>
//             <Grid container spacing={{ xs: 2, md: 4 }}>
//                 <Grid item xs={12}>
//                     <CardPaper>
//                         <Typography variant="h6" fontWeight={700} gutterBottom>Ticket Priority</Typography>
//                         <Box sx={{ display: "flex", flexDirection: {xs: 'column', sm: 'row'}, alignItems: "center", mt: 2, gap: 2 }}>
//                             <Box sx={{ width: 180, height: 180 }}>
//                                 <ResponsiveContainer>
//                                     <PieChart>
//                                         <Tooltip />
//                                         <Pie data={ticketData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" paddingAngle={5} labelLine={false} label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}>
//                                             {ticketData.map((entry, index) => (<Cell key={`cell-${index}`} fill={TICKET_COLOR_MAP[entry.name]} />))}
//                                         </Pie>
//                                     </PieChart>
//                                 </ResponsiveContainer>
//                             </Box>
//                             <Box sx={{ flexGrow: 1 }}><StatusLegend items={ticketLegendItems} /></Box>
//                         </Box>
//                     </CardPaper>
//                 </Grid>
//                 {showPunchUI && (
//                     <Grid item xs={12}>
//                         <Paper onClick={() => navigate('/hrms/dashboard/attendance')} sx={{
//                             p: 2, display: "flex", justifyContent: "space-between", alignItems: "center", color: "white", borderRadius: "20px", cursor: 'pointer',
//                             background: `linear-gradient(135deg, ${VETRINA_ORANGE} 0%, #ffac6e 100%)`, transition: 'all 0.3s ease',
//                             '&:hover': { transform: 'translateY(-5px) scale(1.03)', boxShadow: '0 12px 24px rgba(245, 142, 53, 0.3)' }
//                           }} >
//                             <Box sx={{display: 'flex', alignItems: 'center', gap: 1.5}}><FactCheckIcon /><Typography fontWeight="bold">My Attendance</Typography></Box>
//                             <ArrowForwardIcon />
//                         </Paper>
//                     </Grid>
//                 )}
//             </Grid>
//         </Grid>

//         {/* Payroll Chart */}
//         <Grid item xs={12} lg={7}>
//           <CardPaper>
//             <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
//                 <Typography variant="h6" fontWeight={700}>Payroll Report</Typography>
//                 <TrendingUpIcon sx={{color: VETRINA_PURPLE}} />
//             </Box>
//             <Box sx={{ display: "flex", gap: 4, my: 2 }}>
//                 <Box><Typography variant="h4" sx={{ fontWeight: "bold", color: VETRINA_PURPLE }}>₹0.00</Typography><Typography variant="body2" color="text.secondary">Total Paid</Typography></Box>
//                 <Box><Typography variant="h4" sx={{ fontWeight: "bold", color: VETRINA_PURPLE }}>₹0.00</Typography><Typography variant="body2" color="text.secondary">This Month</Typography></Box>
//             </Box>
//             <Box sx={{ height: 280, width: "100%", mt: 2 }}>
//               <ResponsiveContainer>
//                 <AreaChart data={payrollChartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
//                   <defs>
//                     <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
//                       <stop offset="5%" stopColor={VETRINA_PURPLE} stopOpacity={0.8}/>
//                       <stop offset="95%" stopColor={VETRINA_PURPLE} stopOpacity={0}/>
//                     </linearGradient>
//                   </defs>
//                   <CartesianGrid stroke="#e0e0e0" strokeDasharray="5 5" vertical={false} />
//                   <XAxis dataKey="name" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
//                   <YAxis tickFormatter={(tick) => `₹${tick}k`} tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
//                   <Tooltip content={<CustomTooltip />} />
//                   <Area type="monotone" dataKey="value" stroke={VETRINA_PURPLE} strokeWidth={3} fillOpacity={1} fill="url(#colorUv)" />
//                 </AreaChart>
//               </ResponsiveContainer>
//             </Box>
//           </CardPaper>
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
  Icon,
  CircularProgress,
  Skeleton,
} from "@mui/material"
import { styled } from "@mui/material/styles"
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area,
  AreaChart,
} from "recharts"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

// Icons
import AttachMoneyIcon from "@mui/icons-material/AttachMoney"
import SpeedIcon from "@mui/icons-material/Speed"
import LabelIcon from "@mui/icons-material/Label"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"
import MoreTimeIcon from '@mui/icons-material/MoreTime'
import HolidayVillageIcon from '@mui/icons-material/HolidayVillage'
import FactCheckIcon from '@mui/icons-material/FactCheck'
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

// --- VETRINA THEME COLORS ---
const VETRINA_PURPLE = '#8C257C';
const VETRINA_ORANGE = '#F58E35';

// --- SWEETALERT2 SETUP ---
const MySwal = withReactContent(Swal);
const Toast = MySwal.mixin({
  toast: true, position: 'top-end', showConfirmButton: false, timer: 3500, timerProgressBar: true,
  didOpen: (toast) => { toast.addEventListener('mouseenter', Swal.stopTimer); toast.addEventListener('mouseleave', Swal.resumeTimer) }
});

// --- HELPER FUNCTIONS (UNCHANGED) ---
const getCurrentLocation = () => new Promise((resolve, reject) => {
  if (!navigator.geolocation) return reject(new Error("Geolocation is not supported."));
  navigator.geolocation.getCurrentPosition(
    (position) => resolve({ latitude: position.coords.latitude, longitude: position.coords.longitude }),
    () => reject(new Error("Unable to retrieve location. Please grant permission."))
  );
});
const formatApiTime = (timeString) => {
  if (!timeString) return '';
  const today = new Date();
  const [hours, minutes, seconds] = timeString.split(':');
  today.setHours(parseInt(hours, 10), parseInt(minutes, 10), parseInt(seconds, 10) || 0);
  if (isNaN(today.getTime())) return '';
  return today.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', hour: 'numeric', minute: 'numeric', hour12: true });
};
const getFormattedDateTimeForDisplay = () => new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', hour: 'numeric', minute: 'numeric', hour12: true });
const getISTDateTimeForAPI = () => new Date().toLocaleString('sv-SE', { timeZone: 'Asia/Kolkata' });


// --- STYLED COMPONENTS (ENHANCED) ---
const CardPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  display: "flex",
  flexDirection: "column",
  height: "100%",
  borderRadius: "20px",
  backgroundColor: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  boxShadow: "0 8px 24px rgba(0,0,0,0.05)",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 16px 32px rgba(0,0,0,0.1)',
  }
}));

const IconWrapper = styled(Box)(({ theme, color }) => ({
  width: 64,
  height: 64,
  borderRadius: '16px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: `linear-gradient(135deg, ${color} 0%, ${color === VETRINA_PURPLE ? '#a13290' : '#ffac6e'} 100%)`,
  boxShadow: `0 4px 12px ${color}55`,
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
}));

// --- REUSABLE UI COMPONENTS ---
const StatCard = ({ title, value, icon, color = VETRINA_PURPLE }) => {
  return (
    <CardPaper sx={{ '&:hover .icon-wrapper': { transform: 'scale(1.1) rotate(5deg)', boxShadow: `0 8px 20px ${color}77` } }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="body1" color="text.secondary" fontWeight={500}>{title}</Typography>
          <Typography variant="h3" component="p" fontWeight="bold" sx={{ color }}>
            {value}
          </Typography>
        </Box>
        <IconWrapper color={color} className="icon-wrapper">
          <Icon sx={{ fontSize: 32, color: 'white' }}>{icon}</Icon>
        </IconWrapper>
      </Box>
    </CardPaper>
  );
};

const StatusLegend = ({ items }) => (
  <Box>{items.map((item, index) => (
    <Box key={index} sx={{ display: "flex", alignItems: "center", mb: 1 }}>
      <Box sx={{ width: 14, height: 14, borderRadius: "4px", backgroundColor: item.color, mr: 1.5 }} />
      <Typography variant="body2" color="text.secondary" fontWeight={500}>{item.label}</Typography>
    </Box>
  ))}
  </Box>
);

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <Paper sx={{ p: 1.5, borderRadius: '8px', background: 'rgba(255,255,255,0.9)', boxShadow: 3 }}>
        <Typography variant="caption" display="block" color="text.secondary">{`${label}`}</Typography>
        <Typography variant="body2" fontWeight="bold" sx={{ color: VETRINA_PURPLE }}>
          {`Value : ${payload[0].value}`}
        </Typography>
      </Paper>
    );
  }
  return null;
};

const DashboardSkeleton = () => (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <Grid container spacing={3}>
        <Grid item xs={12}><Paper sx={{ p: 3, borderRadius: '16px' }}><Skeleton variant="rectangular" height={100} /></Paper></Grid>
        {[...Array(4)].map((_, i) => (<Grid item xs={12} sm={6} md={3} key={i}><CardPaper><Skeleton variant="rectangular" height={100} /></CardPaper></Grid>))}
        <Grid item xs={12} md={5}><CardPaper><Skeleton variant="rectangular" height={300} /></CardPaper></Grid>
        <Grid item xs={12} md={7}><CardPaper><Skeleton variant="rectangular" height={300} /></CardPaper></Grid>
      </Grid>
    </Box>
);

// --- CONSTANTS ---
const TICKET_COLOR_MAP = {
  "Low": "#F58E35", "Medium": "#FFA726", "High": "#FF7043", "Critical": "#D32F2F", "No Tickets": "#E0E0E0"
};
const ticketLegendItems = [
  { color: TICKET_COLOR_MAP.Low, label: "Low" }, { color: TICKET_COLOR_MAP.Medium, label: "Medium" }, { color: TICKET_COLOR_MAP.High, label: "High" }, { color: TICKET_COLOR_MAP.Critical, label: "Critical" }
];
const payrollChartData = [{ name: "Jul 24", value: 1.2 }, { name: "Aug 24", value: 2.1 }, { name: "Sep 24", value: 1.5 }, { name: "Oct 24", value: 3.2 }, { name: "Nov 24", value: 2.8 }, { name: "Dec 24", value: 4.0 }];


export default function HomeViewLM() {
  const navigate = useNavigate();

  // --- STATE MANAGEMENT ---
  const [userName, setUserName] = useState("");
  const [loadingType, setLoadingType] = useState(null);
  const [punchInTime, setPunchInTime] = useState(null);
  const [punchOutTime, setPunchOutTime] = useState(null);
  const [shiftInfo, setShiftInfo] = useState("My Shift: Loading...");
  const [leaveCount, setLeaveCount] = useState(0);
  const [lateMarkCount, setLateMarkCount] = useState(0);
  const [awardCount, setAwardCount] = useState(0);
  const [assetCount, setAssetCount] = useState(0);
  const [ticketData, setTicketData] = useState([{ name: 'No Tickets', value: 100 }]);
  const [isHoliday, setIsHoliday] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showPunchUI, setShowPunchUI] = useState(false);
  const [isEmployeeConfirmed, setIsEmployeeConfirmed] = useState(false);
  const [hasAcknowledgedPolicies, setHasAcknowledgedPolicies] = useState(false);

  // --- DATA FETCHING & LOGIC (UNCHANGED) ---
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const employeeId = localStorage.getItem("loggedInUser");
    const loggedInEmpId = localStorage.getItem("loggedInEmpId");
    if (!accessToken || !employeeId || !loggedInEmpId) {
      setUserName("User"); setShiftInfo("My Shift: Not available"); setIsLoading(false); return;
    }
    const headers = { Authorization: `Bearer ${accessToken}` };
    axios.get("https://tdtlworld.com/hrms-backend/api/dropdown/employee-role/", { headers })
      .then(response => { const currentUser = response.data.find((emp) => String(emp.id) === String(loggedInEmpId)); setUserName(currentUser?.employee_name || "User"); })
      .catch(error => console.error("Failed to fetch user name:", error));
    const confirmationEndpoint = `https://tdtlworld.com/hrms-backend/EmpConfirmation/${employeeId}/`;
    const policyEndpoint = `https://tdtlworld.com/hrms-backend/policy_ack/${employeeId}/`;
    const dashboardEndpoint = `https://tdtlworld.com/hrms-backend/empdashboard/${employeeId}/`;
    const attendanceEndpoint = `https://tdtlworld.com/hrms-backend/api/dashboard_attendance/${employeeId}/`;
    Promise.all([
      axios.get(confirmationEndpoint, { headers }), axios.get(policyEndpoint, { headers }),
      axios.get(dashboardEndpoint, { headers }), axios.get(attendanceEndpoint, { headers }),
    ]).then(([confirmationResponse, policyResponse, dashboardResponse, attendanceResponse]) => {
      const confirmStatus = confirmationResponse.data?.employee_confirm;
      const policyStatus = policyResponse.data?.status;
      const isPolicyOk = (policyStatus === 'Y');
      setHasAcknowledgedPolicies(isPolicyOk); setIsEmployeeConfirmed(confirmStatus !== 'Y'); setShowPunchUI(isPolicyOk);
      const dashData = dashboardResponse.data;
      setLeaveCount(dashData.leave_days_taken || 0); setLateMarkCount(dashData.late_mark_count || 0);
      setAwardCount(dashData.award_count || 0); setAssetCount(dashData.asset_count || 0);
      const { in_time: inTime, out_time: outTime } = dashData?.office_shift || {};
      if (inTime === "Holiday" || outTime === "Holiday") {
        setShiftInfo("My Shift: Holiday"); setIsHoliday(true);
      } else if (inTime && outTime) {
        setShiftInfo(`My Shift: ${formatApiTime(inTime)} To ${formatApiTime(outTime)}`); setIsHoliday(false);
      } else {
        setShiftInfo("My Shift: Not Assigned"); setIsHoliday(false);
      }
      if (dashData.support_tickets?.count > 0) {
        const { data: tickets, count: totalTickets } = dashData.support_tickets;
        const priorityCounts = tickets.reduce((acc, ticket) => { acc[ticket.priority] = (acc[ticket.priority] || 0) + 1; return acc; }, {});
        setTicketData(Object.entries(priorityCounts).map(([name, count]) => ({ name, value: parseFloat(((count / totalTickets) * 100).toFixed(1)) })));
      }
      const attendanceData = attendanceResponse.data.data;
      if (attendanceData?.length > 0) {
        const todayAttendance = attendanceData[0];
        setPunchInTime(todayAttendance.clock_in ? formatApiTime(todayAttendance.clock_in) : null);
        setPunchOutTime(todayAttendance.clock_out ? formatApiTime(todayAttendance.clock_out) : null);
      }
    }).catch(error => {
      console.error("Failed to fetch required dashboard data:", error);
      Toast.fire({ icon: 'error', title: 'Could not load dashboard information.' });
      setShowPunchUI(false);
    }).finally(() => { setIsLoading(false); });
  }, []);

  // --- MODIFIED useEffect FOR NOTIFICATIONS ---
  useEffect(() => {
    if (isLoading) return;
    if (!hasAcknowledgedPolicies) {
      MySwal.fire({
        title: 'Action Required',
        text: "Acknowledge your policies for Punch In/Out.",
        icon: 'warning',
        confirmButtonText: 'OK',
        confirmButtonColor: VETRINA_ORANGE,
      });
      return;
    }

    if (isEmployeeConfirmed) {
      // THIS IS THE MODIFIED ALERT
      MySwal.fire({
          title: 'Confirmation Pending',
          text: 'Your employee confirmation is pending review.',
          icon: 'info',
          confirmButtonText: 'OK',
          confirmButtonColor: VETRINA_PURPLE,
      });
    }
  }, [isLoading, hasAcknowledgedPolicies, isEmployeeConfirmed]);

  const handlePunchClick = (punchType) => {
    if (loadingType) return;
    MySwal.fire({
      title: `Confirm Punch ${punchType === 'IN' ? 'In' : 'Out'}`, text: "Are you sure you want to proceed?", icon: 'question', showCancelButton: true,
      confirmButtonText: 'Yes, Confirm!', cancelButtonText: 'Cancel', confirmButtonColor: VETRINA_ORANGE, cancelButtonColor: '#aaa',
    }).then((result) => { if (result.isConfirmed) { executePunch(punchType); } });
  };

  const executePunch = async (punchType) => {
    setLoadingType(punchType);
    let locationString = "Location not available";
    try {
      const { latitude, longitude } = await getCurrentLocation();
      locationString = `Lat: ${latitude.toFixed(5)}, Lon: ${longitude.toFixed(5)}`;
    } catch (error) { Toast.fire({ icon: 'warning', title: error.message }); }
    const accessToken = localStorage.getItem("accessToken"); const employeeId = localStorage.getItem("loggedInUser");
    if (!accessToken || !employeeId) { Toast.fire({ icon: 'error', title: "Authentication details not found." }); setLoadingType(null); return; }
    const payload = { emp_id: employeeId, punch_time: getISTDateTimeForAPI(), punch_type: punchType, location: locationString };
    try {
      await axios.post("https://tdtlworld.com/hrms-backend/api/employee_attendance/", payload, { headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" } });
      const displayTime = getFormattedDateTimeForDisplay();
      if (punchType === "IN") { setPunchInTime(displayTime); setPunchOutTime(null); } else { setPunchOutTime(displayTime); }
      Toast.fire({ icon: 'success', title: `Successfully Punched ${punchType === 'IN' ? 'In' : 'Out'}!` });
    } catch (error) {
      const errorMessage = error.response?.data?.error || "An unknown error occurred during punch.";
      Toast.fire({ icon: 'error', title: errorMessage });
    } finally { setLoadingType(null); }
  };

  const isCurrentlyPunchedIn = !!punchInTime && !punchOutTime;

  if (isLoading) { return <DashboardSkeleton />; }

  return (
    <Box sx={{ p: { xs: 2, md: 3 }, background: 'linear-gradient(to right, #fdfbfb 0%, #ebedee 100%)', minHeight: '100vh' }}>
      <Grid container spacing={{ xs: 2, md: 4 }}>
        {/* Welcome Header */}
        <Grid item xs={12}>
          <Paper sx={{ p: {xs: 2, md: 3}, borderRadius: "20px", color: "white",
            background: `linear-gradient(135deg, ${VETRINA_PURPLE} 0%, #a13290 100%)`,
            boxShadow: '0 16px 40px -12px rgba(140, 37, 124, 0.5)',
            position: 'relative', overflow: 'hidden'
          }}>
            <Box sx={{
              position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
              backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)',
              backgroundSize: '20px 20px', opacity: 0.5
            }} />
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: { xs: 'flex-start', md: 'center' }, flexDirection: { xs: 'column', md: 'row' }, gap: 2, position: 'relative' }}>
              <Box>
                <Typography variant="h5" fontWeight="bold">Welcome back, {userName}!</Typography>
                <Typography variant="body1" color="rgba(255,255,255,0.85)">{shiftInfo}</Typography>
              </Box>
              {showPunchUI && (isHoliday ? (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, p: 1.5, borderRadius: '12px', background: 'rgba(0,0,0,0.2)' }}><HolidayVillageIcon /><Typography variant="h6" fontWeight='bold'>Holiday</Typography></Box>
              ) : (
                  <Box sx={{ display: "flex", gap: 2 }}>
                    <Button variant="contained" onClick={() => handlePunchClick("IN")} disabled={loadingType !== null || isCurrentlyPunchedIn} sx={{ backgroundColor: VETRINA_ORANGE, borderRadius: '12px', textTransform: "none", fontWeight: 'bold', px: 3, py: 1.5, boxShadow: 'none', transition: 'all 0.3s ease', '&:hover': { backgroundColor: '#e57a24', transform: 'translateY(-2px)', boxShadow: '0 8px 16px rgba(245, 142, 53, 0.3)' } }}>{loadingType === 'IN' ? <CircularProgress size={24} color="inherit" /> : "Punch In"}</Button>
                    <Button variant="contained" onClick={() => handlePunchClick("OUT")} disabled={loadingType !== null || !isCurrentlyPunchedIn} sx={{ backgroundColor: VETRINA_ORANGE, borderRadius: '12px', textTransform: "none", fontWeight: 'bold', px: 3, py: 1.5, boxShadow: 'none', transition: 'all 0.3s ease', '&:hover': { backgroundColor: '#e57a24', transform: 'translateY(-2px)', boxShadow: '0 8px 16px rgba(245, 142, 53, 0.3)' } }}>{loadingType === 'OUT' ? <CircularProgress size={24} color="inherit" /> : "Punch Out"}</Button>
                  </Box>
              ))}
            </Box>
            {showPunchUI && (
              <Box sx={{ mt: 3, pt: 2, borderTop: '1px solid rgba(255,255,255,0.2)', display: 'flex', justifyContent: { xs: 'center', md: 'flex-start' }, alignItems: 'center', gap: 3, flexWrap: 'wrap', position: 'relative' }}>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>{punchInTime ? `Punched In: ${punchInTime}` : 'Not punched in today'}</Typography>
                {punchOutTime && <Typography variant="body2" sx={{ fontWeight: 500 }}>{`Punched Out: ${punchOutTime}`}</Typography>}
              </Box>
            )}
          </Paper>
        </Grid>

        {/* Stat Cards */}
        <Grid item xs={12} sm={6} lg={3}><StatCard title="My Leave" value={leaveCount} icon={<LabelIcon />} color={VETRINA_PURPLE} /></Grid>
        <Grid item xs={12} sm={6} lg={3}><StatCard title="Late Mark" value={lateMarkCount} icon={<MoreTimeIcon />} color={VETRINA_ORANGE} /></Grid>
        <Grid item xs={12} sm={6} lg={3}><StatCard title="My Awards" value={awardCount} icon={<AttachMoneyIcon />} color={VETRINA_PURPLE} /></Grid>
        <Grid item xs={12} sm={6} lg={3}><StatCard title="Total Assets" value={assetCount} icon={<SpeedIcon />} color={VETRINA_ORANGE} /></Grid>

        {/* Ticket Chart and My Attendance Link */}
        <Grid item xs={12} lg={5}>
            <Grid container spacing={{ xs: 2, md: 4 }}>
                <Grid item xs={12}>
                    <CardPaper>
                        <Typography variant="h6" fontWeight={700} gutterBottom>Ticket Priority</Typography>
                        <Box sx={{ display: "flex", flexDirection: {xs: 'column', sm: 'row'}, alignItems: "center", mt: 2, gap: 2 }}>
                            <Box sx={{ width: 180, height: 180 }}>
                                <ResponsiveContainer>
                                    <PieChart>
                                        <Tooltip />
                                        <Pie data={ticketData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" paddingAngle={5} labelLine={false} label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}>
                                            {ticketData.map((entry, index) => (<Cell key={`cell-${index}`} fill={TICKET_COLOR_MAP[entry.name]} />))}
                                        </Pie>
                                    </PieChart>
                                </ResponsiveContainer>
                            </Box>
                            <Box sx={{ flexGrow: 1 }}><StatusLegend items={ticketLegendItems} /></Box>
                        </Box>
                    </CardPaper>
                </Grid>
                {showPunchUI && (
                    <Grid item xs={12}>
                        <Paper onClick={() => navigate('/hrms/dashboard/attendance')} sx={{
                            p: 2, display: "flex", justifyContent: "space-between", alignItems: "center", color: "white", borderRadius: "20px", cursor: 'pointer',
                            background: `linear-gradient(135deg, ${VETRINA_ORANGE} 0%, #ffac6e 100%)`, transition: 'all 0.3s ease',
                            '&:hover': { transform: 'translateY(-5px) scale(1.03)', boxShadow: '0 12px 24px rgba(245, 142, 53, 0.3)' }
                          }} >
                            <Box sx={{display: 'flex', alignItems: 'center', gap: 1.5}}><FactCheckIcon /><Typography fontWeight="bold">My Attendance</Typography></Box>
                            <ArrowForwardIcon />
                        </Paper>
                    </Grid>
                )}
            </Grid>
        </Grid>

        {/* Payroll Chart */}
        <Grid item xs={12} lg={7}>
          <CardPaper>
            <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <Typography variant="h6" fontWeight={700}>Payroll Report</Typography>
                <TrendingUpIcon sx={{color: VETRINA_PURPLE}} />
            </Box>
            <Box sx={{ display: "flex", gap: 4, my: 2 }}>
                <Box><Typography variant="h4" sx={{ fontWeight: "bold", color: VETRINA_PURPLE }}>₹0.00</Typography><Typography variant="body2" color="text.secondary">Total Paid</Typography></Box>
                <Box><Typography variant="h4" sx={{ fontWeight: "bold", color: VETRINA_PURPLE }}>₹0.00</Typography><Typography variant="body2" color="text.secondary">This Month</Typography></Box>
            </Box>
            <Box sx={{ height: 280, width: "100%", mt: 2 }}>
              <ResponsiveContainer>
                <AreaChart data={payrollChartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={VETRINA_PURPLE} stopOpacity={0.8}/>
                      <stop offset="95%" stopColor={VETRINA_PURPLE} stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="#e0e0e0" strokeDasharray="5 5" vertical={false} />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis tickFormatter={(tick) => `₹${tick}k`} tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="value" stroke={VETRINA_PURPLE} strokeWidth={3} fillOpacity={1} fill="url(#colorUv)" />
                </AreaChart>
              </ResponsiveContainer>
            </Box>
          </CardPaper>
        </Grid>
      </Grid>
    </Box>
  )
}