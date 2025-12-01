



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

// /**
//  * Formats a time string (e.g., "09:30:00" or "09:30") from the API into a localized time string for UI display in IST.
//  * @param {string} timeString - The time string from the API (HH:mm:ss or HH:mm).
//  * @returns {string} - Formatted time like "9:30 AM" for the Asia/Kolkata timezone.
//  */
// const formatApiTime = (timeString) => {
//   if (!timeString) return '';
//   const today = new Date();
//   const [hours, minutes, seconds] = timeString.split(':');

//   // Safely parse integers, providing 0 as a fallback for seconds if it's undefined.
//   today.setHours(
//     parseInt(hours, 10),
//     parseInt(minutes, 10),
//     parseInt(seconds, 10) || 0
//   );

//   // Return empty string if the date is invalid (e.g., from bad input)
//   if (isNaN(today.getTime())) {
//     console.error("Invalid timeString provided to formatApiTime:", timeString);
//     return '';
//   }

//   return today.toLocaleString('en-IN', {
//     timeZone: 'Asia/Kolkata',
//     hour: 'numeric',
//     minute: 'numeric',
//     hour12: true,
//   });
// };


// /**
//  * Gets the current date and time formatted for UI display in IST.
//  * @returns {string} - Formatted time like "3:45 PM".
//  */
// const getFormattedDateTimeForDisplay = () => {
//   return new Date().toLocaleString('en-IN', {
//     timeZone: 'Asia/Kolkata',
//     hour: 'numeric',
//     minute: 'numeric',
//     hour12: true
//   });
// };

// /**
//  * Gets the current date and time as a 'YYYY-MM-DD HH:MM:SS' string in IST for the backend API.
//  * @returns {string} - The formatted date-time string.
//  */
// const getISTDateTimeForAPI = () => {
//   // The 'sv-SE' locale conveniently produces the 'YYYY-MM-DD HH:MM:SS' format.
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

// // --- CONSTANTS (UNCHANGED) ---
// const TICKET_COLOR_MAP = {
//   "Low": "#FFA726", "Medium": "#FFB74D", "High": "#FF7043", "Critical": "#FFEE58", "No Tickets": "#E0E0E0",
// };
// const ticketLegendItems = [
//   { color: TICKET_COLOR_MAP.Low, label: "Low" }, { color: TICKET_COLOR_MAP.Medium, label: "Medium" },
//   { color: TICKET_COLOR_MAP.High, label: "High" }, { color: TICKET_COLOR_MAP.Critical, label: "Critical" },
// ];
// const payrollChartData = [
//   { name: "Jul 2024", value: null }, { name: "Aug 2024", value: null }, { name: "Sep 2024", value: null },
//   { name: "Oct 2024", value: null }, { name: "Nov 2024", value: null }, { name: "Dec 2024", value: null },
//   { name: "Jan 2025", value: null }, { name: "Feb 2025", value: null }, { name: "Mar 2025", value: null },
//   { name: "Apr 2025", value: null }, { name: "May 2025", value: null }, { name: "Jun 2025", value: null },
// ];

// export default function Dashboard() {
//   const blueColor = "#ff823aff"
//   const [userName, setUserName] = useState("")
//   const [loadingType, setLoadingType] = useState(null)
//   const navigate = useNavigate()
//   const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "info" })
//   const [dialog, setDialog] = useState({ open: false, type: null })

//   const [punchInTime, setPunchInTime] = useState(null)
//   const [punchOutTime, setPunchOutTime] = useState(null)
//   const [shiftInfo, setShiftInfo] = useState("My Shift: Loading...");
//   const [leaveCount, setLeaveCount] = useState(0)
//   const [lateMarkCount, setLateMarkCount] = useState(0)
//   const [awardCount, setAwardCount] = useState(0);
//   const [assetCount, setAssetCount] = useState(0);
//   const [ticketData, setTicketData] = useState([{ name: 'No Tickets', value: 100 }]);

//   useEffect(() => {
//     const accessToken = localStorage.getItem("accessToken");
//     const employeeId = localStorage.getItem("loggedInUser");
//     const loggedInEmpId = localStorage.getItem("loggedInEmpId");

//     if (!accessToken || !employeeId || !loggedInEmpId) {
//       setUserName("User");
//       setShiftInfo("My Shift: Not available")
//       return;
//     }

//     const headers = { Authorization: `Bearer ${accessToken}` };

//     // Fetch User Name
//     axios.get("https://tdtlworld.com/hrms-backend/api/dropdown/employee-role/", { headers })
//       .then(response => {
//         const currentUser = response.data.find((emp) => String(emp.id) === String(loggedInEmpId));
//         setUserName(currentUser?.employee_name || "User");
//       }).catch(error => console.error("Failed to fetch user name:", error));

//     // Fetch Dashboard Data (including Shift)
//     axios.get(`https://tdtlworld.com/hrms-backend/empdashboard/${employeeId}/`, { headers })
//       .then(response => {
//         const data = response.data;
//         setLeaveCount(data.leave_days_taken || 0);
//         setLateMarkCount(data.late_mark_count || 0);
//         setAwardCount(data.award_count || 0);
//         setAssetCount(data.asset_count || 0);

//         // --- SHIFT LOGIC (USES CORRECTED HELPER) ---
//         const inTime = data?.office_shift?.in_time;
//         const outTime = data?.office_shift?.out_time;
//         if (inTime && outTime) {
//           const inTimeFormatted = formatApiTime(inTime);
//           const outTimeFormatted = formatApiTime(outTime);
//           setShiftInfo(`My Shift: ${inTimeFormatted} To ${outTimeFormatted}`);
//         } else {
//           setShiftInfo("My Shift: Not Assigned");
//         }
//         // --- END OF UPDATE ---

//         if (data.support_tickets && data.support_tickets.count > 0) {
//           const tickets = data.support_tickets.data;
//           const totalTickets = data.support_tickets.count;
//           const priorityCounts = tickets.reduce((acc, ticket) => { acc[ticket.priority] = (acc[ticket.priority] || 0) + 1; return acc; }, {});
//           const pieData = Object.entries(priorityCounts).map(([name, count]) => ({ name: name, value: parseFloat(((count / totalTickets) * 100).toFixed(1)), }));
//           setTicketData(pieData);
//         }
//       }).catch(error => {
//         console.error("Failed to fetch dashboard data:", error);
//         setSnackbar({ open: true, message: "Could not load dashboard information.", severity: "error" });
//         setShiftInfo("My Shift: Error loading"); // Update UI on error
//       });

//     // Fetch Attendance
//     axios.get(`https://tdtlworld.com/hrms-backend/api/dashboard_attendance/${employeeId}/`, { headers })
//       .then(response => {
//         const attendanceData = response.data.data;
//         if (attendanceData && attendanceData.length > 0) {
//           const todayAttendance = attendanceData[0];
//           // Use the corrected helper function here as well
//           setPunchInTime(todayAttendance.clock_in ? formatApiTime(todayAttendance.clock_in) : null);
//           setPunchOutTime(todayAttendance.clock_out ? formatApiTime(todayAttendance.clock_out) : null);
//         } else {
//           setPunchInTime(null); setPunchOutTime(null);
//         }
//       }).catch(error => console.error("Failed to fetch attendance data:", error));
//   }, []);

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

//     const payload = {
//       emp_id: employeeId,
//       punch_time: getISTDateTimeForAPI(),
//       punch_type: punchType,
//       location: locationString
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
//   };

//   const isCurrentlyPunchedIn = !!punchInTime && !punchOutTime;

//   return (
//     <Box sx={{ p: { xs: 2, md: 3 } }}>
//       <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
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
//                   <Box sx={{ display: "flex", gap: 2 }}>
//                     <Button variant="contained" onClick={() => handlePunchClick("IN")} disabled={loadingType !== null || isCurrentlyPunchedIn} sx={{ backgroundColor: "#4CAF50", color: "white", textTransform: "none", "&:hover": { backgroundColor: "#43A047" } }}>
//                       {loadingType === 'IN' ? "..." : "Punch In"}
//                     </Button>
//                     <Button variant="contained" onClick={() => handlePunchClick("OUT")} disabled={loadingType !== null || !isCurrentlyPunchedIn} sx={{ backgroundColor: "#F44336", color: "white", textTransform: "none", "&:hover": { backgroundColor: "#E53935" } }}>
//                       {loadingType === 'OUT' ? "..." : "Punch Out"}
//                     </Button>
//                   </Box>
//                 </Box>
//                 <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2, px: 1, borderTop: '1px solid #eee', pt: 2, minHeight: '24px', flexWrap: 'wrap', gap: 1 }}>
//                   <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
//                     {punchInTime ? `Punched In: ${punchInTime}` : 'Not punched in today'}
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
//                     {punchOutTime ? `Punched Out: ${punchOutTime}` : ''}
//                   </Typography>
//                 </Box>
//               </Paper>
//             </Grid>

//             {/* Other Grid Items... */}
//             <Grid item xs={12}>
//               <Paper sx={{ p: 1.5, display: "flex", justifyContent: "space-between", alignItems: "center", bgcolor: blueColor, color: "white", borderRadius: "8px" }}>
//                 <Button sx={{ color: "white", textTransform: "none" }} endIcon={<ArrowForwardIcon />} onClick={() => navigate('/hrms/dashboard/attendance')}>
//                   My Attendance
//                 </Button>
//               </Paper>
//             </Grid>
//             <Grid item xs={12} sm={6}><InfoCard title="My Awards" value={awardCount} icon={<AttachMoneyIcon />} bgColor={blueColor} textColor="white" /></Grid>
//             <Grid item xs={12} sm={6}><InfoCard title="Total Assets" value={assetCount} icon={<SpeedIcon />} /></Grid>
//             <Grid item xs={12}>
//               <CardPaper>
//                 <Typography variant="h6" gutterBottom>Ticket Priority</Typography>
//                 <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
//                   <Box sx={{ width: 150, height: 150 }}>
//                     <ResponsiveContainer>
//                       <PieChart>
//                         <Pie data={ticketData} cx="50%" cy="50%" innerRadius={40} outerRadius={60} dataKey="value" label={({ value, name }) => name === 'No Tickets' ? 'N/A' : `${value}%`} labelLine={false}>
//                           {ticketData.map((entry, index) => (<Cell key={`cell-${index}`} fill={TICKET_COLOR_MAP[entry.name]} />))}
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

//         <Grid item xs={12} lg={5}>
//           <Grid container spacing={3}>
//             <Grid item xs={12} sm={6}><InfoCard title="My Leave" value={leaveCount} icon={<LabelIcon />} /></Grid>
//             <Grid item xs={12} sm={6}><InfoCard title="Late Mark" value={lateMarkCount} icon={<MoreTimeIcon />} bgColor={blueColor} textColor="white" /></Grid>
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
// } ///


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
// import HolidayVillageIcon from '@mui/icons-material/HolidayVillage'; // Icon for Holiday

// // --- HELPER FUNCTIONS (Unchanged) ---

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
//   today.setHours(
//     parseInt(hours, 10),
//     parseInt(minutes, 10),
//     parseInt(seconds, 10) || 0
//   );
//   if (isNaN(today.getTime())) {
//     console.error("Invalid timeString provided to formatApiTime:", timeString);
//     return '';
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

// // --- CONSTANTS (UNCHANGED) ---
// const TICKET_COLOR_MAP = {
//   "Low": "#FFA726", "Medium": "#FFB74D", "High": "#FF7043", "Critical": "#FFEE58", "No Tickets": "#E0E0E0",
// };
// const ticketLegendItems = [
//   { color: TICKET_COLOR_MAP.Low, label: "Low" }, { color: TICKET_COLOR_MAP.Medium, label: "Medium" },
//   { color: TICKET_COLOR_MAP.High, label: "High" }, { color: TICKET_COLOR_MAP.Critical, label: "Critical" },
// ];
// const payrollChartData = [
//   { name: "Jul 2024", value: null }, { name: "Aug 2024", value: null }, { name: "Sep 2024", value: null },
//   { name: "Oct 2024", value: null }, { name: "Nov 2024", value: null }, { name: "Dec 2024", value: null },
//   { name: "Jan 2025", value: null }, { name: "Feb 2025", value: null }, { name: "Mar 2025", value: null },
//   { name: "Apr 2025", value: null }, { name: "May 2025", value: null }, { name: "Jun 2025", value: null },
// ];

// export default function Dashboard() {
//   const blueColor = "#ff823aff"
//   const [userName, setUserName] = useState("")
//   const [loadingType, setLoadingType] = useState(null)
//   const navigate = useNavigate()
//   const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "info" })
//   const [dialog, setDialog] = useState({ open: false, type: null })

//   const [punchInTime, setPunchInTime] = useState(null)
//   const [punchOutTime, setPunchOutTime] = useState(null)
//   const [shiftInfo, setShiftInfo] = useState("My Shift: Loading...");
//   const [leaveCount, setLeaveCount] = useState(0)
//   const [lateMarkCount, setLateMarkCount] = useState(0)
//   const [awardCount, setAwardCount] = useState(0);
//   const [assetCount, setAssetCount] = useState(0);
//   const [ticketData, setTicketData] = useState([{ name: 'No Tickets', value: 100 }]);

//   // --- NEW STATE VARIABLES ---
//   const [showPunchUI, setShowPunchUI] = useState(false);
//   const [isConfirmationPending, setIsConfirmationPending] = useState(false); // Default to false
//   const [isHoliday, setIsHoliday] = useState(false);
//   // --- END OF NEW STATE ---

//   useEffect(() => {
//     const accessToken = localStorage.getItem("accessToken");
//     const employeeId = localStorage.getItem("loggedInUser");
//     const loggedInEmpId = localStorage.getItem("loggedInEmpId");

//     if (!accessToken || !employeeId || !loggedInEmpId) {
//       setUserName("User");
//       setShiftInfo("My Shift: Not available")
//       return;
//     }

//     const headers = { Authorization: `Bearer ${accessToken}` };

//     // Fetch User Name
//     axios.get("https://tdtlworld.com/hrms-backend/api/dropdown/employee-role/", { headers })
//       .then(response => {
//         const currentUser = response.data.find((emp) => String(emp.id) === String(loggedInEmpId));
//         setUserName(currentUser?.employee_name || "User");
//       }).catch(error => console.error("Failed to fetch user name:", error));

//     // --- NEW: Fetch Policy Acknowledgement Status ---
//     axios.get(`https://tdtlworld.com/hrms-backend/policy_ack/${employeeId}/`, { headers })
//       .then(response => {
//         if (response.data?.status === 'Y') {
//           setShowPunchUI(true);
//         } else {
//           setShowPunchUI(false); // Hide for 'N' or null
//         }
//       }).catch(error => {
//         console.error("Failed to fetch policy acknowledgement:", error);
//         setShowPunchUI(false); // Hide on error for safety
//       });
//     // --- END OF NEW FETCH ---

//     // --- NEW: Fetch Employee Confirmation Status ---
//     axios.get(`https://tdtlworld.com/hrms-backend/EmpConfirmation/${employeeId}/`, { headers })
//       .then(response => {
//         // Assuming a response like { status: "Confirmed" } or { status: "Pending" }
//         // Show banner if status is NOT 'Confirmed'
//         if (response.data?.status !== 'Confirmed') {
//           setIsConfirmationPending(true);
//         } else {
//           setIsConfirmationPending(false);
//         }
//       }).catch(error => {
//         console.error("Failed to fetch employee confirmation status:", error);
//         // Decide what to do on error, e.g., don't show the banner
//         setIsConfirmationPending(false);
//       });
//     // --- END OF NEW FETCH ---


//     // Fetch Dashboard Data (including Shift)
//     axios.get(`https://tdtlworld.com/hrms-backend/empdashboard/${employeeId}/`, { headers })
//       .then(response => {
//         const data = response.data;
//         setLeaveCount(data.leave_days_taken || 0);
//         setLateMarkCount(data.late_mark_count || 0);
//         setAwardCount(data.award_count || 0);
//         setAssetCount(data.asset_count || 0);

//         // --- MODIFIED: SHIFT AND HOLIDAY LOGIC ---
//         const inTime = data?.office_shift?.in_time;
//         const outTime = data?.office_shift?.out_time;

//         if (inTime === "Holiday" || outTime === "Holiday") {
//           setShiftInfo("My Shift: Holiday");
//           setIsHoliday(true);
//         } else if (inTime && outTime) {
//           const inTimeFormatted = formatApiTime(inTime);
//           const outTimeFormatted = formatApiTime(outTime);
//           setShiftInfo(`My Shift: ${inTimeFormatted} To ${outTimeFormatted}`);
//           setIsHoliday(false);
//         } else {
//           setShiftInfo("My Shift: Not Assigned");
//           setIsHoliday(false);
//         }
//         // --- END OF MODIFICATION ---

//         if (data.support_tickets && data.support_tickets.count > 0) {
//           const tickets = data.support_tickets.data;
//           const totalTickets = data.support_tickets.count;
//           const priorityCounts = tickets.reduce((acc, ticket) => { acc[ticket.priority] = (acc[ticket.priority] || 0) + 1; return acc; }, {});
//           const pieData = Object.entries(priorityCounts).map(([name, count]) => ({ name: name, value: parseFloat(((count / totalTickets) * 100).toFixed(1)), }));
//           setTicketData(pieData);
//         }
//       }).catch(error => {
//         console.error("Failed to fetch dashboard data:", error);
//         setSnackbar({ open: true, message: "Could not load dashboard information.", severity: "error" });
//         setShiftInfo("My Shift: Error loading");
//       });

//     // Fetch Attendance
//     axios.get(`https://tdtlworld.com/hrms-backend/api/dashboard_attendance/${employeeId}/`, { headers })
//       .then(response => {
//         const attendanceData = response.data.data;
//         if (attendanceData && attendanceData.length > 0) {
//           const todayAttendance = attendanceData[0];
//           setPunchInTime(todayAttendance.clock_in ? formatApiTime(todayAttendance.clock_in) : null);
//           setPunchOutTime(todayAttendance.clock_out ? formatApiTime(todayAttendance.clock_out) : null);
//         } else {
//           setPunchInTime(null); setPunchOutTime(null);
//         }
//       }).catch(error => console.error("Failed to fetch attendance data:", error));
//   }, []);

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

//     const payload = {
//       emp_id: employeeId,
//       punch_time: getISTDateTimeForAPI(),
//       punch_type: punchType,
//       location: locationString
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
//   };

//   const isCurrentlyPunchedIn = !!punchInTime && !punchOutTime;

//   return (
//     <Box sx={{ p: { xs: 2, md: 3 } }}>
//       <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
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
//         {/* --- NEW: Confirmation Pending Banner --- */}
//         {/* {isConfirmationPending && (
//           <Grid item xs={12}>
//             <Alert severity="warning" variant="filled">
//               Your employee confirmation is pending. Please complete the required steps in your profile.
//             </Alert>
//           </Grid>
//         )} */}
//         {/* --- END OF BANNER --- */}

//         <Grid item xs={12} lg={7}>
//           <Grid container spacing={3}>
//             <Grid item xs={12}>
//               <Paper sx={{ p: 2, borderRadius: "8px" }}>
//                 <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
//                   <Box>
//                     <Typography variant="h6">Welcome {userName}</Typography>
//                     <Typography variant="body2" color="text.secondary">{shiftInfo}</Typography>
//                   </Box>

//                   {/* --- MODIFIED: Conditional Punch UI Rendering --- */}
//                   {isHoliday ? (
//                     <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                       <HolidayVillageIcon color="primary" />
//                       <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>
//                         Holiday
//                       </Typography>
//                     </Box>
//                   ) : showPunchUI ? (
//                     <Box sx={{ display: "flex", gap: 2 }}>
//                       <Button variant="contained" onClick={() => handlePunchClick("IN")} disabled={loadingType !== null || isCurrentlyPunchedIn} sx={{ backgroundColor: "#4CAF50", color: "white", textTransform: "none", "&:hover": { backgroundColor: "#43A047" } }}>
//                         {loadingType === 'IN' ? "..." : "Punch In"}
//                       </Button>
//                       <Button variant="contained" onClick={() => handlePunchClick("OUT")} disabled={loadingType !== null || !isCurrentlyPunchedIn} sx={{ backgroundColor: "#F44336", color: "white", textTransform: "none", "&:hover": { backgroundColor: "#E53935" } }}>
//                         {loadingType === 'OUT' ? "..." : "Punch Out"}
//                       </Button>
//                     </Box>
//                   ) : null /* Don't show anything if policy is not 'Y' and it's not a holiday */}
//                   {/* --- END OF MODIFICATION --- */}

//                 </Box>
//                 <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2, px: 1, borderTop: '1px solid #eee', pt: 2, minHeight: '24px', flexWrap: 'wrap', gap: 1 }}>
//                   <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
//                     {punchInTime ? `Punched In: ${punchInTime}` : 'Not punched in today'}
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
//                     {punchOutTime ? `Punched Out: ${punchOutTime}` : ''}
//                   </Typography>
//                 </Box>
//               </Paper>
//             </Grid>

//             {/* Other Grid Items (Unchanged)... */}
//             <Grid item xs={12}>
//               <Paper sx={{ p: 1.5, display: "flex", justifyContent: "space-between", alignItems: "center", bgcolor: blueColor, color: "white", borderRadius: "8px" }}>
//                 <Button sx={{ color: "white", textTransform: "none" }} endIcon={<ArrowForwardIcon />} onClick={() => navigate('/hrms/dashboard/attendance')}>
//                   My Attendance
//                 </Button>
//               </Paper>
//             </Grid>
//             <Grid item xs={12} sm={6}><InfoCard title="My Awards" value={awardCount} icon={<AttachMoneyIcon />} bgColor={blueColor} textColor="white" /></Grid>
//             <Grid item xs={12} sm={6}><InfoCard title="Total Assets" value={assetCount} icon={<SpeedIcon />} /></Grid>
//             <Grid item xs={12}>
//               <CardPaper>
//                 <Typography variant="h6" gutterBottom>Ticket Priority</Typography>
//                 <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
//                   <Box sx={{ width: 150, height: 150 }}>
//                     <ResponsiveContainer>
//                       <PieChart>
//                         <Pie data={ticketData} cx="50%" cy="50%" innerRadius={40} outerRadius={60} dataKey="value" label={({ value, name }) => name === 'No Tickets' ? 'N/A' : `${value}%`} labelLine={false}>
//                           {ticketData.map((entry, index) => (<Cell key={`cell-${index}`} fill={TICKET_COLOR_MAP[entry.name]} />))}
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

//         <Grid item xs={12} lg={5}>
//           <Grid container spacing={3}>
//             <Grid item xs={12} sm={6}><InfoCard title="My Leave" value={leaveCount} icon={<LabelIcon />} /></Grid>
//             <Grid item xs={12} sm={6}><InfoCard title="Late Mark" value={lateMarkCount} icon={<MoreTimeIcon />} bgColor={blueColor} textColor="white" /></Grid>
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

// // --- HELPER FUNCTIONS (Unchanged) ---

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
//   today.setHours(
//     parseInt(hours, 10),
//     parseInt(minutes, 10),
//     parseInt(seconds, 10) || 0
//   );
//   if (isNaN(today.getTime())) {
//     console.error("Invalid timeString provided to formatApiTime:", timeString);
//     return '';
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

// // --- CONSTANTS (UNCHANGED) ---
// const TICKET_COLOR_MAP = {
//   "Low": "#FFA726", "Medium": "#FFB74D", "High": "#FF7043", "Critical": "#FFEE58", "No Tickets": "#E0E0E0",
// };
// const ticketLegendItems = [
//   { color: TICKET_COLOR_MAP.Low, label: "Low" }, { color: TICKET_COLOR_MAP.Medium, label: "Medium" },
//   { color: TICKET_COLOR_MAP.High, label: "High" }, { color: TICKET_COLOR_MAP.Critical, label: "Critical" },
// ];
// const payrollChartData = [
//   { name: "Jul 2024", value: null }, { name: "Aug 2024", value: null }, { name: "Sep 2024", value: null },
//   { name: "Oct 2024", value: null }, { name: "Nov 2024", value: null }, { name: "Dec 2024", value: null },
//   { name: "Jan 2025", value: null }, { name: "Feb 2025", value: null }, { name: "Mar 2025", value: null },
//   { name: "Apr 2025", value: null }, { name: "May 2025", value: null }, { name: "Jun 2025", value: null },
// ];

// export default function Dashboard() {
//   const blueColor = "#ff823aff"
//   const [userName, setUserName] = useState("")
//   const [loadingType, setLoadingType] = useState(null)
//   const navigate = useNavigate()
//   const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "info" })
//   const [dialog, setDialog] = useState({ open: false, type: null })

//   const [punchInTime, setPunchInTime] = useState(null)
//   const [punchOutTime, setPunchOutTime] = useState(null)
//   const [shiftInfo, setShiftInfo] = useState("My Shift: Loading...");
//   const [leaveCount, setLeaveCount] = useState(0)
//   const [lateMarkCount, setLateMarkCount] = useState(0)
//   const [awardCount, setAwardCount] = useState(0);
//   const [assetCount, setAssetCount] = useState(0);
//   const [ticketData, setTicketData] = useState([{ name: 'No Tickets', value: 100 }]);

//   // State variables for new logic
//   const [showPunchUI, setShowPunchUI] = useState(false); // Controls the entire punch section
//   const [isConfirmationPending, setIsConfirmationPending] = useState(false);
//   const [isHoliday, setIsHoliday] = useState(false);

//   useEffect(() => {
//     const accessToken = localStorage.getItem("accessToken");
//     const employeeId = localStorage.getItem("loggedInUser");
//     const loggedInEmpId = localStorage.getItem("loggedInEmpId");

//     if (!accessToken || !employeeId || !loggedInEmpId) {
//       setUserName("User");
//       setShiftInfo("My Shift: Not available")
//       return;
//     }

//     const headers = { Authorization: `Bearer ${accessToken}` };

//     // Fetch User Name
//     axios.get("https://tdtlworld.com/hrms-backend/api/dropdown/employee-role/", { headers })
//       .then(response => {
//         const currentUser = response.data.find((emp) => String(emp.id) === String(loggedInEmpId));
//         setUserName(currentUser?.employee_name || "User");
//       }).catch(error => console.error("Failed to fetch user name:", error));

//     // 1. Fetch Policy Acknowledgement Status to decide if punch UI is shown at all
//     // axios.get(`https://tdtlworld.com/hrms-backend/policy_ack/${employeeId}/`, { headers })
//     //   .then(response => {
//     //     // Show punch section ONLY if status is 'Y'
//     //     if (response.data?.status === 'Y') {
//     //       setShowPunchUI(true);
//     //       setIsConfirmationPending(false);
//     //     } else {
//     //       setShowPunchUI(false); // Hide for 'N', null, or any other value
//     //       setIsConfirmationPending(true);

//     //     }
//     //   }).catch(error => {
//     //     console.error("Failed to fetch policy acknowledgement:", error);
//     //     setShowPunchUI(false); // Hide on error for safety
//     //   });


// // This should be inside a useEffect hook in your component
// // useEffect(() => { ... }, [employeeId, headers]);

// const confirmationEndpoint = `https://tdtlworld.com/hrms-backend/EmpConfirmation/${employeeId}/`;
// const policyEndpoint = `https://tdtlworld.com/hrms-backend/policy_ack/${employeeId}/`;

// Promise.all([
//   axios.get(confirmationEndpoint, { headers }),
//   axios.get(policyEndpoint, { headers })
// ])
// .then(([confirmationResponse, policyResponse]) => {

//   // --- Step 1: Check Confirmation Status ---
//   const confirmStatus = confirmationResponse.data?.employee_confirm;

//   // This is NOT pending if status is 'Y' or null.
//   const isConfirmationOk = (confirmStatus === 'Y' || confirmStatus === null);

//   // Set the specific state for confirmation pending. This correctly handles your request.
//   // If confirmStatus is 'Y', !isConfirmationOk becomes !(true), which is false.
//   setIsConfirmationPending(!isConfirmationOk);


//   // --- Step 2: Check Policy Status ---
//   const policyStatus = policyResponse.data?.status;

//   // Policy is OK only if the status is 'Y'.
//   const isPolicyOk = (policyStatus === 'Y');

//   // You could have another state for this if needed, e.g., setIsPolicyPending(!isPolicyOk);


//   // --- Step 3: Make the Final Decision for the UI ---
//   // The Punch UI should be visible ONLY IF BOTH checks pass.
//   if (isConfirmationOk && isPolicyOk) {
//     setShowPunchUI(true);
//     setIsConfirmationPending(false); // Reset confirmation pending state
//   } else {
//     // If EITHER check fails, hide the UI.
//     setShowPunchUI(false);
//     setIsConfirmationPending(true); // Reset confirmation pending state

//   }

// })
// .catch(error => {
//   // If either API call fails, hide the UI for safety.
//   console.error("Failed to fetch employee status:", error);
//   setShowPunchUI(false);
//   setIsConfirmationPending(true); // Indicate a pending/error state
// });




//     // 2. Fetch Employee Confirmation Status for the banner
//     // axios.get(`https://tdtlworld.com/hrms-backend/EmpConfirmation/${employeeId}/`, { headers })
//     //   .then(response => {
//     //     if (response.data?.employee_confirm !== 'Y' ) {
//     //       setIsConfirmationPending(true);
//     //       setShowPunchUI(false);

//     //     } 
//     //       else if (response.data?.employee_confirm === null ) {
//     //       setIsConfirmationPending(false);

//     //     }  else {
//     //       setIsConfirmationPending(false);
//     //     }
//     //   }).catch(error => {
//     //     console.error("Failed to fetch employee confirmation status:", error);
//     //     setIsConfirmationPending(false);
//     //   });


//     // axios.get(`https://tdtlworld.com/hrms-backend/EmpConfirmation/${employeeId}/`, { headers })
//     //   .then(response => {
//     //     const confirmationStatus = response.data?.employee_confirm;

//     //     // A confirmation is PENDING only if the status exists and is not 'Y'.
//     //     // Statuses 'Y' (confirmed) and null (not yet started) are NOT pending.
//     //     if (confirmationStatus !== 'Y' && confirmationStatus !== null) {
//     //       // This will be true for statuses like 'N', 'P', etc.
//     //       setIsConfirmationPending(true);
//     //       setShowPunchUI(false);
//     //     } else {
//     //       // This will be true if status is 'Y' or null.
//     //       setIsConfirmationPending(false);
//     //       setShowPunchUI(true); // You likely want to show the UI if it's not pending
//     //     }
//     //   })
//     //   .catch(error => {
//     //     console.error("Failed to fetch employee confirmation status:", error);
//     //     // On error, a safe default is to not block the user.
//     //     setIsConfirmationPending(false);
//     //     setShowPunchUI(true);
//     //   });



//     // 3. Fetch Dashboard Data (including Shift & Holiday info)
//     axios.get(`https://tdtlworld.com/hrms-backend/empdashboard/${employeeId}/`, { headers })
//       .then(response => {
//         const data = response.data;
//         setLeaveCount(data.leave_days_taken || 0);
//         setLateMarkCount(data.late_mark_count || 0);
//         setAwardCount(data.award_count || 0);
//         setAssetCount(data.asset_count || 0);

//         const inTime = data?.office_shift?.in_time;
//         const outTime = data?.office_shift?.out_time;

//         if (inTime === "Holiday" || outTime === "Holiday") {
//           setShiftInfo("My Shift: Holiday");
//           setIsHoliday(true);
//         } else if (inTime && outTime) {
//           const inTimeFormatted = formatApiTime(inTime);
//           const outTimeFormatted = formatApiTime(outTime);
//           setShiftInfo(`My Shift: ${inTimeFormatted} To ${outTimeFormatted}`);
//           setIsHoliday(false);
//         } else {
//           setShiftInfo("My Shift: Not Assigned");
//           setIsHoliday(false);
//         }

//         if (data.support_tickets && data.support_tickets.count > 0) {
//           const tickets = data.support_tickets.data;
//           const totalTickets = data.support_tickets.count;
//           const priorityCounts = tickets.reduce((acc, ticket) => { acc[ticket.priority] = (acc[ticket.priority] || 0) + 1; return acc; }, {});
//           const pieData = Object.entries(priorityCounts).map(([name, count]) => ({ name: name, value: parseFloat(((count / totalTickets) * 100).toFixed(1)), }));
//           setTicketData(pieData);
//         }
//       }).catch(error => {
//         console.error("Failed to fetch dashboard data:", error);
//         setSnackbar({ open: true, message: "Could not load dashboard information.", severity: "error" });
//         setShiftInfo("My Shift: Error loading");
//       });

//     // 4. Fetch Attendance Data
//     axios.get(`https://tdtlworld.com/hrms-backend/api/dashboard_attendance/${employeeId}/`, { headers })
//       .then(response => {
//         const attendanceData = response.data.data;
//         if (attendanceData && attendanceData.length > 0) {
//           const todayAttendance = attendanceData[0];
//           setPunchInTime(todayAttendance.clock_in ? formatApiTime(todayAttendance.clock_in) : null);
//           setPunchOutTime(todayAttendance.clock_out ? formatApiTime(todayAttendance.clock_out) : null);
//         } else {
//           setPunchInTime(null); setPunchOutTime(null);
//         }
//       }).catch(error => console.error("Failed to fetch attendance data:", error));
//   }, []);

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

//     const payload = {
//       emp_id: employeeId,
//       punch_time: getISTDateTimeForAPI(),
//       punch_type: punchType,
//       location: locationString
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
//   };

//   const isCurrentlyPunchedIn = !!punchInTime && !punchOutTime;

//   return (
//     <Box sx={{ p: { xs: 2, md: 3 } }}>
//       <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
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
//         {!isConfirmationPending && (
//           <Grid item xs={12}>
//             <Alert severity="warning" variant="filled">
//               Your employee confirmation is pending. Please complete the required steps in your profile.
//             </Alert>
//           </Grid>
//         )}
//         {!showPunchUI && (
//           <Grid item xs={12}>
//             <Alert severity="warning" variant="filled">
//               "Please acknowledge your policy for Punch In/Out."
//             </Alert>
//           </Grid>
//         )}


//         <Grid item xs={12} lg={7}>
//           <Grid container spacing={3}>
//             <Grid item xs={12}>
//               <Paper sx={{ p: 2, borderRadius: "8px" }}>
//                 <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
//                   <Box>
//                     <Typography variant="h6">Welcome {userName}</Typography>
//                     <Typography variant="body2" color="text.secondary">{shiftInfo}</Typography>
//                   </Box>

//                   {/* --- MODIFIED: PUNCH UI LOGIC --- */}
//                   {/* First, check if policy status is 'Y'. If not, this whole block is hidden. */}
//                   {showPunchUI && (
//                     <Box>
//                       {/* If policy is OK, then check if it's a holiday */}
//                       {isHoliday ? (
//                         <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                           <HolidayVillageIcon color="primary" />
//                           <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>
//                             Holiday
//                           </Typography>
//                         </Box>
//                       ) : (
//                         // If it's a normal work day, show punch buttons
//                         <Box sx={{ display: "flex", gap: 2 }}>
//                           <Button variant="contained" onClick={() => handlePunchClick("IN")} disabled={loadingType !== null || isCurrentlyPunchedIn} sx={{ backgroundColor: "#4CAF50", color: "white", textTransform: "none", "&:hover": { backgroundColor: "#43A047" } }}>
//                             {loadingType === 'IN' ? "..." : "Punch In"}
//                           </Button>
//                           <Button variant="contained" onClick={() => handlePunchClick("OUT")} disabled={loadingType !== null || !isCurrentlyPunchedIn} sx={{ backgroundColor: "#F44336", color: "white", textTransform: "none", "&:hover": { backgroundColor: "#E53935" } }}>
//                             {loadingType === 'OUT' ? "..." : "Punch Out"}
//                           </Button>
//                         </Box>
//                       )}
//                     </Box>
//                   )}
//                   {/* --- END OF MODIFICATION --- */}

//                 </Box>
//                 <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2, px: 1, borderTop: '1px solid #eee', pt: 2, minHeight: '24px', flexWrap: 'wrap', gap: 1 }}>
//                   <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
//                     {punchInTime ? `Punched In: ${punchInTime}` : 'Not punched in today'}
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
//                     {punchOutTime ? `Punched Out: ${punchOutTime}` : ''}
//                   </Typography>
//                 </Box>
//               </Paper>
//             </Grid>

//             {/* Other Grid Items (Unchanged)... */}
//             <Grid item xs={12}>
//               <Paper sx={{ p: 1.5, display: "flex", justifyContent: "space-between", alignItems: "center", bgcolor: blueColor, color: "white", borderRadius: "8px" }}>
//                 <Button sx={{ color: "white", textTransform: "none" }} endIcon={<ArrowForwardIcon />} onClick={() => navigate('/hrms/dashboard/attendance')}>
//                   My Attendance
//                 </Button>
//               </Paper>
//             </Grid>
//             <Grid item xs={12} sm={6}><InfoCard title="My Awards" value={awardCount} icon={<AttachMoneyIcon />} bgColor={blueColor} textColor="white" /></Grid>
//             <Grid item xs={12} sm={6}><InfoCard title="Total Assets" value={assetCount} icon={<SpeedIcon />} /></Grid>
//             <Grid item xs={12}>
//               <CardPaper>
//                 <Typography variant="h6" gutterBottom>Ticket Priority</Typography>
//                 <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
//                   <Box sx={{ width: 150, height: 150 }}>
//                     <ResponsiveContainer>
//                       <PieChart>
//                         <Pie data={ticketData} cx="50%" cy="50%" innerRadius={40} outerRadius={60} dataKey="value" label={({ value, name }) => name === 'No Tickets' ? 'N/A' : `${value}%`} labelLine={false}>
//                           {ticketData.map((entry, index) => (<Cell key={`cell-${index}`} fill={TICKET_COLOR_MAP[entry.name]} />))}
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

//         <Grid item xs={12} lg={5}>
//           <Grid container spacing={3}>
//             <Grid item xs={12} sm={6}><InfoCard title="My Leave" value={leaveCount} icon={<LabelIcon />} /></Grid>
//             <Grid item xs={12} sm={6}><InfoCard title="Late Mark" value={lateMarkCount} icon={<MoreTimeIcon />} bgColor={blueColor} textColor="white" /></Grid>
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
// } ///






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

//   // ** NEW, CORRECTED STATE LOGIC **
//   const [isLoading, setIsLoading] = useState(true); // Controls overall page loading state
//   const [showPunchUI, setShowPunchUI] = useState(false); // Controls the punch section visibility
//   const [isConfirmationPending, setIsConfirmationPending] = useState(false); // For confirmation banner
//   const [isPolicyPending, setIsPolicyPending] = useState(false); // For policy banner
//   const [isHoliday, setIsHoliday] = useState(false);

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

//     // Fetch User Name (can run in parallel)
//     axios.get("https://tdtlworld.com/hrms-backend/api/dropdown/employee-role/", { headers })
//       .then(response => {
//         const currentUser = response.data.find((emp) => String(emp.id) === String(loggedInEmpId));
//         setUserName(currentUser?.employee_name || "User");
//       }).catch(error => console.error("Failed to fetch user name:", error));

//     // ** REFACTORED LOGIC: FETCH ALL CRITICAL DATA TOGETHER **
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
//       // --- Process Confirmation and Policy first to decide UI visibility ---
//       const confirmStatus = confirmationResponse.data?.employee_confirm;
//       const policyStatus = policyResponse.data?.status;

//       const isConfirmationOk = (confirmStatus === 'Y');
//       const isPolicyOk = (policyStatus === 'Y');
//       setShowPunchUI(isPolicyOk);


//       setIsConfirmationPending(!isConfirmationOk);
//       setIsPolicyPending(!isPolicyOk);

//       // Final Decision: Show Punch UI ONLY IF BOTH checks pass
//       // setShowPunchUI(isConfirmationOk && isPolicyOk);

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
//       setShowPunchUI(false); // Hide punch UI on error for safety
//     }).finally(() => {
//       setIsLoading(false); // Stop loading indicator
//     });

//   }, []);

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
//       <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
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
//         {/* --- CORRECTED UI ALERTS --- */}
//         {isConfirmationPending && (
//           <Grid item xs={12}>
//             <Alert severity="warning" variant="filled">
//               Your employee confirmation is pending. Please complete the required steps in your profile.
//             </Alert>
//           </Grid>
//         )}
//         {isPolicyPending && (
//           <Grid item xs={12}>
//             <Alert severity="warning" variant="filled">
//               Acknowledge your policies for Punch In/Out.
//             </Alert>
//           </Grid>
//         )}

//         <Grid item xs={12} lg={7}>
//           <Grid container spacing={3}>
//             <Grid item xs={12}>
//               <Paper sx={{ p: 2, borderRadius: "8px" }}>
//                 <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
//                   <Box>
//                     <Typography variant="h6">Welcome {userName}</Typography>
//                     <Typography variant="body2" color="text.secondary">{shiftInfo}</Typography>
//                   </Box>

//                   {/* This block now works correctly because `showPunchUI` is set reliably */}
//                   {showPunchUI && (
//                     <Box>
//                       {isHoliday ? (
//                         <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                           <HolidayVillageIcon color="#ff6f43cd" />
//                           <Typography variant="h6" color="#FF7043" sx={{ fontWeight: 'bold' }}>Holiday</Typography>
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
//                 <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2, px: 1, borderTop: '1px solid #eee', pt: 2, minHeight: '24px', flexWrap: 'wrap', gap: 1 }}>
//                   <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
//                     {punchInTime ? `Punched In: ${punchInTime}` : 'Not punched in today'}
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
//                     {punchOutTime ? `Punched Out: ${punchOutTime}` : ''}
//                   </Typography>
//                 </Box>
//               </Paper>
//             </Grid>

//             {/* Other Grid Items (Unchanged)... */}
//             <Grid item xs={12}><Paper sx={{ p: 1.5, display: "flex", justifyContent: "space-between", alignItems: "center", bgcolor: blueColor, color: "white", borderRadius: "8px" }}><Button sx={{ color: "white", textTransform: "none" }} endIcon={<ArrowForwardIcon />} onClick={() => navigate('/hrms/dashboard/attendance')}>My Attendance</Button></Paper></Grid>
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
// }   ////// 







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

//   // ** NEW STATE FOR LOADING AND STATUS CHECKS **
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

//       // ** SET STATE FOR NOTIFICATION LOGIC **
//       setHasAcknowledgedPolicies(isPolicyOk);
//       setIsEmployeeConfirmed(confirmStatus === 'Y');

//       // The punch UI should only be shown if policies are acknowledged
//       setShowPunchUI(isPolicyOk);

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

//   // ** NEW useEffect FOR HANDLING STATUS NOTIFICATIONS **
//   useEffect(() => {
//     if (isLoading) return; // Don't show messages while loading

//     // Priority 1: Policies
//     if (!hasAcknowledgedPolicies) {
//         setSnackbar({
//             open: true,
//             message: "Acknowledge your policies for Punch In/Out.",
//             severity: "warning"
//         });
//         return; // Stop here
//     }

//     // Priority 2: Confirmation (only if policies are ok)
//     if (isEmployeeConfirmed) {
//         setSnackbar({
//             open: true,
//             message: "Your employment is confirmed; punch functionality is disabled.",
//             severity: "error"
//         });
//     }

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
//         {/* The old Alert components have been removed from here. */}

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
//                           <HolidayVillageIcon color="#ff6f43cd" />
//                           <Typography variant="h6" color="#FF7043" sx={{ fontWeight: 'bold' }}>Holiday</Typography>
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
//                 <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2, px: 1, borderTop: '1px solid #eee', pt: 2, minHeight: '24px', flexWrap: 'wrap', gap: 1 }}>
//                   <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
//                     {punchInTime ? `Punched In: ${punchInTime}` : 'Not punched in today'}
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
//                     {punchOutTime ? `Punched Out: ${punchOutTime}` : ''}
//                   </Typography>
//                 </Box>
//               </Paper>
//             </Grid>
//             <Grid item xs={12}><Paper sx={{ p: 1.5, display: "flex", justifyContent: "space-between", alignItems: "center", bgcolor: blueColor, color: "white", borderRadius: "8px" }}><Button sx={{ color: "white", textTransform: "none" }} endIcon={<ArrowForwardIcon />} onClick={() => navigate('/hrms/dashboard/attendance')}>My Attendance</Button></Paper></Grid>
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
// }    /// 







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
// import { styled, createTheme, ThemeProvider } from "@mui/material/styles"
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

// // --- THEME DEFINITION ---
// const theme = createTheme({
//   palette: {
//     primary: {
//       main: '#8C257C',
//       dark: '#6d1d60',
//     },
//     secondary: {
//       main: '#F58E35',
//     },
//   },
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

// // --- STYLED COMPONENTS (UNCHANGED) ---
// const CardPaper = styled(Paper)(({ theme }) => ({
//   padding: theme.spacing(2), display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%", borderRadius: "8px", boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
// }));

// const InfoCard = ({ title, value, icon, bgColor, textColor }) => {
//   const currentTheme = useTheme();
//   return (<CardPaper sx={{ backgroundColor: bgColor || currentTheme.palette.background.paper }}><Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><Box><Typography variant="subtitle1" sx={{ color: textColor || currentTheme.palette.text.primary }}>{title}</Typography><Typography variant="h4" component="p" sx={{ fontWeight: "bold", color: textColor || currentTheme.palette.text.primary }}>{value}</Typography></Box><Icon sx={{ fontSize: 32, color: textColor || "primary" }}>{icon}</Icon></Box></CardPaper>);
// };

// const StatusLegend = ({ items }) => (<Box>{items.map((item, index) => (<Box key={index} sx={{ display: "flex", alignItems: "center", mb: 0.5 }}><Box sx={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: item.color, mr: 1 }} /><Typography variant="body2" color="text.secondary">{item.label}</Typography></Box>))}</Box>);

// // --- CONSTANTS (UNCHANGED) ---
// const TICKET_COLOR_MAP = { "Low": "#FFA726", "Medium": "#FFB74D", "High": "#FF7043", "Critical": "#FFEE58", "No Tickets": "#E0E0E0" };
// const ticketLegendItems = [{ color: TICKET_COLOR_MAP.Low, label: "Low" }, { color: TICKET_COLOR_MAP.Medium, label: "Medium" }, { color: TICKET_COLOR_MAP.High, label: "High" }, { color: TICKET_COLOR_MAP.Critical, label: "Critical" }];
// const payrollChartData = [{ name: "Jul 2024", value: null }, { name: "Aug 2024", value: null }, { name: "Sep 2024", value: null }, { name: "Oct 2024", value: null }, { name: "Nov 2024", value: null }, { name: "Dec 2024", value: null }, { name: "Jan 2025", value: null }, { name: "Feb 2025", value: null }, { name: "Mar 2025", value: null }, { name: "Apr 2025", value: null }, { name: "May 2025", value: null }, { name: "Jun 2025", value: null }];

// export default function Dashboard() {
//   const navigate = useNavigate()

//   // --- STATE MANAGEMENT (UNCHANGED) ---
//   const [userName, setUserName] = useState("")
//   const [loadingType, setLoadingType] = useState(null)
//   const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "info" })
//   const [dialog, setDialog] = useState({ open: false, type: null })
//   const [punchInTime, setPunchInTime] = useState(null)
//   const [punchOutTime, setPunchOutTime] = useState(null)
//   const [shiftInfo, setShiftInfo] = useState("My Shift: Loading...");
//   const [leaveCount, setLeaveCount] = useState(0)
//   const [lateMarkCount, setLateMarkCount] = useState(0)
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
//       setSnackbar({ open: true, message: "Could not load dashboard information.", severity: "error" });
//       setShowPunchUI(false);
//     }).finally(() => {
//       setIsLoading(false);
//     });
//   }, []);

//   useEffect(() => {
//     if (isLoading) return;

//     if (!hasAcknowledgedPolicies) {
//       setSnackbar({
//         open: true,
//         message: "Acknowledge your policies for Punch In/Out.",
//         severity: "warning"
//       });
//       return;
//     }

//     if (isEmployeeConfirmed) {
//       setSnackbar({
//         open: true,
//         message: "Your employee confirmation is pending.",
//         severity: "warning"
//       });
//     }
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
//     <ThemeProvider theme={theme}>
//       <Box component={Paper} p={3}>
//         <Typography variant="h4" sx={{ color: "primary.main", fontWeight: "bold", mb: 4 }}>
//           Dashboard
//         </Typography>

//         <Snackbar open={snackbar.open} autoHideDuration={5000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
//           <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }} variant="filled">{snackbar.message}</Alert>
//         </Snackbar>

//         <Dialog open={dialog.open} onClose={handleCloseDialog} fullWidth maxWidth="sm">
//           <DialogTitle sx={{ color: 'primary.main', fontWeight: 'bold' }}>{`Confirm Punch ${dialog.type === 'IN' ? 'In' : 'Out'}`}</DialogTitle>
//           <DialogContent><DialogContentText>Are you sure you want to punch {dialog.type === 'IN' ? 'in' : 'out'}?</DialogContentText></DialogContent>
//           <DialogActions>
//             <Button onClick={handleCloseDialog} sx={{ color: '#757575' }}>Cancel</Button>
//             <Button onClick={executePunch} variant="contained" color="primary" autoFocus sx={{ '&:hover': { backgroundColor: 'primary.dark' } }}>
//               {loadingType ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Confirm'}
//             </Button>
//           </DialogActions>
//         </Dialog>

//         <Grid container spacing={3}>
//           <Grid item xs={12} lg={7}>
//             <Grid container spacing={3}>
//               <Grid item xs={12}>
//                 <Paper sx={{ p: 2, borderRadius: "8px", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>
//                   <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
//                     <Box>
//                       <Typography variant="h6"  fontWeight= 'bold'  color="#8C257C" >Welcome {userName}</Typography>
//                       <Typography variant="body2" color="text.secondary">{shiftInfo}</Typography>
//                     </Box>

//                     {showPunchUI && (
//                       <Box>
//                         {isHoliday ? (
//                           <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                             <HolidayVillageIcon sx={{ color: "secondary.main" }} />
//                             <Typography variant="h6" sx={{ color: "secondary.main", fontWeight: 'bold' }}>Holiday</Typography>
//                           </Box>
//                         ) : (
//                           <Box sx={{ display: "flex", gap: 2 }}>
//                             <Button variant="contained" color="primary" onClick={() => handlePunchClick("IN")} disabled={loadingType !== null || isCurrentlyPunchedIn} sx={{ textTransform: "none", '&:hover': { backgroundColor: 'primary.dark' } }}>
//                               {loadingType === 'IN' ? <CircularProgress size={24} sx={{ color: 'white' }} /> : "Punch In"}
//                             </Button>
//                             <Button variant="contained" color="primary" onClick={() => handlePunchClick("OUT")} disabled={loadingType !== null || !isCurrentlyPunchedIn} sx={{ textTransform: "none", '&:hover': { backgroundColor: 'primary.dark' } }}>
//                               {loadingType === 'OUT' ? <CircularProgress size={24} sx={{ color: 'white' }} /> : "Punch Out"}
//                             </Button>
//                           </Box>
//                         )}
//                       </Box>
//                     )}
//                   </Box>
//                   {showPunchUI && (
//                     <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2, px: 1, borderTop: '1px solid #eee', pt: 2, minHeight: '24px', flexWrap: 'wrap', gap: 1 }}>
//                       <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
//                         {punchInTime ? `Punched In: ${punchInTime}` : 'Not punched in today'}
//                       </Typography>
//                       <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
//                         {punchOutTime ? `Punched Out: ${punchOutTime}` : ''}
//                       </Typography>
//                     </Box>
//                   )}
//                 </Paper>
//               </Grid>

//               {showPunchUI && (
//                 <Grid item xs={12}>
//                   <Paper sx={{ p: 1.5, display: "flex", justifyContent: "space-between", alignItems: "center", bgcolor: "primary.main", color: "white", borderRadius: "8px" }}>
//                     <Button sx={{ color: "white", textTransform: "none" }} endIcon={<ArrowForwardIcon />} onClick={() => navigate('/hrms/dashboard/attendance')}>
//                       My Attendance
//                     </Button>
//                   </Paper>
//                 </Grid>
//               )}

//               <Grid item xs={12} sm={6}><InfoCard title="My Awards" value={awardCount} icon={<AttachMoneyIcon />} bgColor={'#ef8222ff'} textColor="white" /></Grid>
//               <Grid item xs={12} sm={6}><InfoCard title="Total Assets" value={assetCount} icon={<SpeedIcon />}  bgColor={'#ef8222ff'} textColor="white"/></Grid>
//               <Grid item xs={12}><CardPaper><Typography variant="h6" fontWeight= 'bold'  color="#8C257C"  gutterBottom>Ticket Priority</Typography><Box sx={{ display: "flex", alignItems: "center", mt: 2 }}><Box sx={{ width: 150, height: 150 }}><ResponsiveContainer><PieChart><Pie data={ticketData} cx="50%" cy="50%" innerRadius={40} outerRadius={60} dataKey="value" label={({ value, name }) => name === 'No Tickets' ? 'N/A' : `${value}%`} labelLine={false}>{ticketData.map((entry, index) => (<Cell key={`cell-${index}`} fill={TICKET_COLOR_MAP[entry.name]} />))}</Pie></PieChart></ResponsiveContainer></Box><Box sx={{ ml: 4 }}><StatusLegend items={ticketLegendItems} /></Box></Box></CardPaper></Grid>
//             </Grid>
//           </Grid>

//           <Grid item xs={12} lg={5}>
//             <Grid container spacing={3}>
//               <Grid item xs={12} sm={6}><InfoCard title="My Leave" value={leaveCount} icon={<LabelIcon />} bgColor={'#ef8222ff'} textColor="white" /></Grid>
//               <Grid item xs={12} sm={6}><InfoCard title="Late Mark" value={lateMarkCount} icon={<MoreTimeIcon />} bgColor={'#ef8222ff'} textColor="white" /></Grid>
//               <Grid item xs={12}><CardPaper><Typography variant="h6" fontWeight= 'bold'  color="#8C257C">My Payroll monthly report</Typography><Box sx={{ display: "flex", gap: 4, my: 2 }}><Box><Typography variant="h5" sx={{ fontWeight: "bold" }}>₹0.00</Typography><Typography variant="body2" color="text.secondary">Total</Typography></Box><Box><Typography variant="h5" sx={{ fontWeight: "bold" }}>₹0.00</Typography><Typography variant="body2" color="text.secondary">This Month</Typography></Box></Box><Box sx={{ height: 250, width: "100%", mt: 2, ".recharts-wrapper": { ml: -1 } }}><ResponsiveContainer><LineChart data={payrollChartData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}><CartesianGrid stroke="#e0e0e0" strokeDasharray="5 5" vertical={false} /><XAxis dataKey="name" tick={{ fontSize: 12, fill: '#666' }} axisLine={false} tickLine={false} /><YAxis domain={[0, 5]} ticks={[0.0, 1.0, 2.0, 3.0, 4.0, 5.0]} tickFormatter={(tick) => tick.toFixed(1)} tick={{ fontSize: 12, fill: '#666' }} axisLine={false} tickLine={false} /></LineChart></ResponsiveContainer></Box></CardPaper></Grid>
//             </Grid>
//           </Grid>
//         </Grid>
//       </Box>
//     </ThemeProvider>
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
  Icon,
  Snackbar,
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  CircularProgress,
} from "@mui/material"
import { styled, createTheme, ThemeProvider } from "@mui/material/styles"
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import Swal from 'sweetalert2' // <-- 1. IMPORT SWEETALERT2

// Icons
import AttachMoneyIcon from "@mui/icons-material/AttachMoney"
import SpeedIcon from "@mui/icons-material/Speed"
import LabelIcon from "@mui/icons-material/Label"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"
import MoreTimeIcon from '@mui/icons-material/MoreTime';
import HolidayVillageIcon from '@mui/icons-material/HolidayVillage';

// --- THEME DEFINITION ---
const theme = createTheme({
  palette: {
    primary: {
      main: '#8C257C',
      dark: '#6d1d60',
    },
    secondary: {
      main: '#F58E35',
    },
  },
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

// --- STYLED COMPONENTS (UNCHANGED) ---
const CardPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2), display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%", borderRadius: "8px", boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
}));

const InfoCard = ({ title, value, icon, bgColor, textColor }) => {
  const currentTheme = useTheme();
  return (<CardPaper sx={{ backgroundColor: bgColor || currentTheme.palette.background.paper }}><Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><Box><Typography variant="subtitle1" sx={{ color: textColor || currentTheme.palette.text.primary }}>{title}</Typography><Typography variant="h4" component="p" sx={{ fontWeight: "bold", color: textColor || currentTheme.palette.text.primary }}>{value}</Typography></Box><Icon sx={{ fontSize: 32, color: textColor || "primary" }}>{icon}</Icon></Box></CardPaper>);
};

const StatusLegend = ({ items }) => (<Box>{items.map((item, index) => (<Box key={index} sx={{ display: "flex", alignItems: "center", mb: 0.5 }}><Box sx={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: item.color, mr: 1 }} /><Typography variant="body2" color="text.secondary">{item.label}</Typography></Box>))}</Box>);

// --- CONSTANTS (UNCHANGED) ---
const TICKET_COLOR_MAP = { "Low": "#FFA726", "Medium": "#FFB74D", "High": "#FF7043", "Critical": "#FFEE58", "No Tickets": "#E0E0E0" };
const ticketLegendItems = [{ color: TICKET_COLOR_MAP.Low, label: "Low" }, { color: TICKET_COLOR_MAP.Medium, label: "Medium" }, { color: TICKET_COLOR_MAP.High, label: "High" }, { color: TICKET_COLOR_MAP.Critical, label: "Critical" }];
const payrollChartData = [{ name: "Jul 2024", value: null }, { name: "Aug 2024", value: null }, { name: "Sep 2024", value: null }, { name: "Oct 2024", value: null }, { name: "Nov 2024", value: null }, { name: "Dec 2024", value: null }, { name: "Jan 2025", value: null }, { name: "Feb 2025", value: null }, { name: "Mar 2025", value: null }, { name: "Apr 2025", value: null }, { name: "May 2025", value: null }, { name: "Jun 2025", value: null }];

export default function Dashboard() {
  const navigate = useNavigate()

  // --- STATE MANAGEMENT (UNCHANGED) ---
  const [userName, setUserName] = useState("")
  const [loadingType, setLoadingType] = useState(null)
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "info" })
  const [dialog, setDialog] = useState({ open: false, type: null })
  const [punchInTime, setPunchInTime] = useState(null)
  const [punchOutTime, setPunchOutTime] = useState(null)
  const [shiftInfo, setShiftInfo] = useState("My Shift: Loading...");
  const [leaveCount, setLeaveCount] = useState(0)
  const [lateMarkCount, setLateMarkCount] = useState(0)
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
      setUserName("User");
      setShiftInfo("My Shift: Not available")
      setIsLoading(false);
      return;
    }

    const headers = { Authorization: `Bearer ${accessToken}` };

    axios.get("https://tdtlworld.com/hrms-backend/api/dropdown/employee-role/", { headers })
      .then(response => {
        const currentUser = response.data.find((emp) => String(emp.id) === String(loggedInEmpId));
        setUserName(currentUser?.employee_name || "User");
      }).catch(error => console.error("Failed to fetch user name:", error));

    const confirmationEndpoint = `https://tdtlworld.com/hrms-backend/EmpConfirmation/${employeeId}/`;
    const policyEndpoint = `https://tdtlworld.com/hrms-backend/policy_ack/${employeeId}/`;
    const dashboardEndpoint = `https://tdtlworld.com/hrms-backend/empdashboard/${employeeId}/`;
    const attendanceEndpoint = `https://tdtlworld.com/hrms-backend/api/dashboard_attendance/${employeeId}/`;

    Promise.all([
      axios.get(confirmationEndpoint, { headers }),
      axios.get(policyEndpoint, { headers }),
      axios.get(dashboardEndpoint, { headers }),
      axios.get(attendanceEndpoint, { headers }),
    ]).then(([confirmationResponse, policyResponse, dashboardResponse, attendanceResponse]) => {
      const confirmStatus = confirmationResponse.data?.employee_confirm;
      const policyStatus = policyResponse.data?.status;
      const isPolicyOk = (policyStatus === 'Y');

      setHasAcknowledgedPolicies(isPolicyOk);
      setIsEmployeeConfirmed(confirmStatus === 'Y');
      setShowPunchUI(isPolicyOk);

      const dashData = dashboardResponse.data;
      setLeaveCount(dashData.leave_days_taken || 0);
      setLateMarkCount(dashData.late_mark_count || 0);
      setAwardCount(dashData.award_count || 0);
      setAssetCount(dashData.asset_count || 0);

      const inTime = dashData?.office_shift?.in_time;
      const outTime = dashData?.office_shift?.out_time;

      if (inTime === "Holiday" || outTime === "Holiday") {
        setShiftInfo("My Shift: Holiday");
        setIsHoliday(true);
      } else if (inTime && outTime) {
        setShiftInfo(`My Shift: ${formatApiTime(inTime)} To ${formatApiTime(outTime)}`);
        setIsHoliday(false);
      } else {
        setShiftInfo("My Shift: Not Assigned");
        setIsHoliday(false);
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
      setSnackbar({ open: true, message: "Could not load dashboard information.", severity: "error" });
      setShowPunchUI(false);
    }).finally(() => {
      setIsLoading(false);
    });
  }, []);

  // --- MODIFIED useEffect FOR NOTIFICATIONS ---
  useEffect(() => {
    if (isLoading) return;

    // <-- 2. REPLACE SNACKBAR WITH SWAL.FIRE
    if (!hasAcknowledgedPolicies) {
      Swal.fire({
        title: 'Action Required',
        text: "Acknowledge your policies for Punch In/Out.",
        icon: 'warning',
        confirmButtonText: 'OK',
        // Optional: Apply theme colors to the button
        confirmButtonColor: theme.palette.primary.main, 
      });
      return;
    }

    if (isEmployeeConfirmed) {
      setSnackbar({
        open: true,
        message: "Your employee confirmation is pending.",
        severity: "warning"
      });
    }
  }, [isLoading, hasAcknowledgedPolicies, isEmployeeConfirmed]);

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') return;
    setSnackbar({ ...snackbar, open: false });
  };

  const handleCloseDialog = () => setDialog({ open: false, type: null });
  const handlePunchClick = (punchType) => { if (loadingType) return; setDialog({ open: true, type: punchType }); };

  const executePunch = async () => {
    const punchType = dialog.type;
    handleCloseDialog();
    setLoadingType(punchType);

    let locationString = "Location not available";
    try {
      const { latitude, longitude } = await getCurrentLocation();
      locationString = `Lat: ${latitude.toFixed(5)}, Lon: ${longitude.toFixed(5)}`;
    } catch (error) { setSnackbar({ open: true, message: error.message, severity: "warning" }); }

    const accessToken = localStorage.getItem("accessToken");
    const employeeId = localStorage.getItem("loggedInUser");
    if (!accessToken || !employeeId) {
      setSnackbar({ open: true, message: "Authentication details not found.", severity: "error" });
      setLoadingType(null);
      return;
    }

    const payload = { emp_id: employeeId, punch_time: getISTDateTimeForAPI(), punch_type: punchType, location: locationString };

    try {
      await axios.post("https://tdtlworld.com/hrms-backend/api/employee_attendance/", payload, { headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" } });
      const displayTime = getFormattedDateTimeForDisplay();
      if (punchType === "IN") {
        setPunchInTime(displayTime);
        setPunchOutTime(null);
      } else {
        setPunchOutTime(displayTime);
      }
      setSnackbar({ open: true, message: `Successfully Punched ${punchType === 'IN' ? 'In' : 'Out'}!`, severity: "success" });
    } catch (error) {
      console.error("Punch API Call Failed:", error.response || error);
      const errorMessage = error.response?.data?.error || "An unknown error occurred during punch.";
      setSnackbar({ open: true, message: errorMessage, severity: "error" });
    } finally {
      setLoadingType(null);
    }
  };

  const isCurrentlyPunchedIn = !!punchInTime && !punchOutTime;

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
        <Typography sx={{ ml: 2 }}>Loading Dashboard...</Typography>
      </Box>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Box component={Paper} p={3}>
        <Typography variant="h4" sx={{ color: "primary.main", fontWeight: "bold", mb: 4 }}>
          Dashboard
        </Typography>

        <Snackbar open={snackbar.open} autoHideDuration={5000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
          <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }} variant="filled">{snackbar.message}</Alert>
        </Snackbar>

        <Dialog open={dialog.open} onClose={handleCloseDialog} fullWidth maxWidth="sm">
          <DialogTitle sx={{ color: 'primary.main', fontWeight: 'bold' }}>{`Confirm Punch ${dialog.type === 'IN' ? 'In' : 'Out'}`}</DialogTitle>
          <DialogContent><DialogContentText>Are you sure you want to punch {dialog.type === 'IN' ? 'in' : 'out'}?</DialogContentText></DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} sx={{ color: '#757575' }}>Cancel</Button>
            <Button onClick={executePunch} variant="contained" color="primary" autoFocus sx={{ '&:hover': { backgroundColor: 'primary.dark' } }}>
              {loadingType ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Confirm'}
            </Button>
          </DialogActions>
        </Dialog>

        <Grid container spacing={3}>
          <Grid item xs={12} lg={7}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Paper sx={{ p: 2, borderRadius: "8px", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                    <Box>
                      <Typography variant="h6"  fontWeight= 'bold'  color="#8C257C" >Welcome {userName}</Typography>
                      <Typography variant="body2" color="text.secondary">{shiftInfo}</Typography>
                    </Box>

                    {showPunchUI && (
                      <Box>
                        {isHoliday ? (
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <HolidayVillageIcon sx={{ color: "secondary.main" }} />
                            <Typography variant="h6" sx={{ color: "secondary.main", fontWeight: 'bold' }}>Holiday</Typography>
                          </Box>
                        ) : (
                          <Box sx={{ display: "flex", gap: 2 }}>
                            <Button variant="contained" color="primary" onClick={() => handlePunchClick("IN")} disabled={loadingType !== null || isCurrentlyPunchedIn} sx={{ textTransform: "none", '&:hover': { backgroundColor: 'primary.dark' } }}>
                              {loadingType === 'IN' ? <CircularProgress size={24} sx={{ color: 'white' }} /> : "Punch In"}
                            </Button>
                            <Button variant="contained" color="primary" onClick={() => handlePunchClick("OUT")} disabled={loadingType !== null || !isCurrentlyPunchedIn} sx={{ textTransform: "none", '&:hover': { backgroundColor: 'primary.dark' } }}>
                              {loadingType === 'OUT' ? <CircularProgress size={24} sx={{ color: 'white' }} /> : "Punch Out"}
                            </Button>
                          </Box>
                        )}
                      </Box>
                    )}
                  </Box>
                  {showPunchUI && (
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2, px: 1, borderTop: '1px solid #eee', pt: 2, minHeight: '24px', flexWrap: 'wrap', gap: 1 }}>
                      <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                        {punchInTime ? `Punched In: ${punchInTime}` : 'Not punched in today'}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                        {punchOutTime ? `Punched Out: ${punchOutTime}` : ''}
                      </Typography>
                    </Box>
                  )}
                </Paper>
              </Grid>

              {showPunchUI && (
                <Grid item xs={12}>
                  <Paper sx={{ p: 1.5, display: "flex", justifyContent: "space-between", alignItems: "center", bgcolor: "primary.main", color: "white", borderRadius: "8px" }}>
                    <Button sx={{ color: "white", textTransform: "none" }} endIcon={<ArrowForwardIcon />} onClick={() => navigate('/hrms/dashboard/attendance')}>
                      My Attendance
                    </Button>
                  </Paper>
                </Grid>
              )}

              <Grid item xs={12} sm={6}><InfoCard title="My Awards" value={awardCount} icon={<AttachMoneyIcon />} bgColor={'#ef8222ff'} textColor="white" /></Grid>
              <Grid item xs={12} sm={6}><InfoCard title="Total Assets" value={assetCount} icon={<SpeedIcon />}  bgColor={'#ef8222ff'} textColor="white"/></Grid>
              <Grid item xs={12}><CardPaper><Typography variant="h6" fontWeight= 'bold'  color="#8C257C"  gutterBottom>Ticket Priority</Typography><Box sx={{ display: "flex", alignItems: "center", mt: 2 }}><Box sx={{ width: 150, height: 150 }}><ResponsiveContainer><PieChart><Pie data={ticketData} cx="50%" cy="50%" innerRadius={40} outerRadius={60} dataKey="value" label={({ value, name }) => name === 'No Tickets' ? 'N/A' : `${value}%`} labelLine={false}>{ticketData.map((entry, index) => (<Cell key={`cell-${index}`} fill={TICKET_COLOR_MAP[entry.name]} />))}</Pie></PieChart></ResponsiveContainer></Box><Box sx={{ ml: 4 }}><StatusLegend items={ticketLegendItems} /></Box></Box></CardPaper></Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} lg={5}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}><InfoCard title="My Leave" value={leaveCount} icon={<LabelIcon />} bgColor={'#ef8222ff'} textColor="white" /></Grid>
              <Grid item xs={12} sm={6}><InfoCard title="Late Mark" value={lateMarkCount} icon={<MoreTimeIcon />} bgColor={'#ef8222ff'} textColor="white" /></Grid>
              <Grid item xs={12}><CardPaper><Typography variant="h6" fontWeight= 'bold'  color="#8C257C">My Payroll monthly report</Typography><Box sx={{ display: "flex", gap: 4, my: 2 }}><Box><Typography variant="h5" sx={{ fontWeight: "bold" }}>₹0.00</Typography><Typography variant="body2" color="text.secondary">Total</Typography></Box><Box><Typography variant="h5" sx={{ fontWeight: "bold" }}>₹0.00</Typography><Typography variant="body2" color="text.secondary">This Month</Typography></Box></Box><Box sx={{ height: 250, width: "100%", mt: 2, ".recharts-wrapper": { ml: -1 } }}><ResponsiveContainer><LineChart data={payrollChartData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}><CartesianGrid stroke="#e0e0e0" strokeDasharray="5 5" vertical={false} /><XAxis dataKey="name" tick={{ fontSize: 12, fill: '#666' }} axisLine={false} tickLine={false} /><YAxis domain={[0, 5]} ticks={[0.0, 1.0, 2.0, 3.0, 4.0, 5.0]} tickFormatter={(tick) => tick.toFixed(1)} tick={{ fontSize: 12, fill: '#666' }} axisLine={false} tickLine={false} /></LineChart></ResponsiveContainer></Box></CardPaper></Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  )
}