// import { useState, useEffect } from "react";
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
// } from "@mui/material";
// import { styled } from "@mui/material/styles";
// import {
//   PieChart,
//   Pie,
//   Cell,
//   ResponsiveContainer,
//   LineChart,
//   XAxis,
//   YAxis,
//   CartesianGrid,
// } from "recharts";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// // Icons
// import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
// import SpeedIcon from "@mui/icons-material/Speed";
// import LabelIcon from "@mui/icons-material/Label";
// import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
// import MoreTimeIcon from "@mui/icons-material/MoreTime";
// // --- NEW ICONS FOR STATIC CARDS ---
// import AccountTreeIcon from "@mui/icons-material/AccountTree";
// import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
// import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
// import TaskAltIcon from "@mui/icons-material/TaskAlt";

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
//         reject(
//           new Error(
//             "Unable to retrieve your location. Please grant permission and try again."
//           )
//         );
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
//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//         }}
//       >
//         <Box>
//           <Typography
//             variant="subtitle1"
//             sx={{ color: textColor || defaultTextColor }}
//           >
//             {title}
//           </Typography>
//           <Typography
//             variant="h4"
//             component="p"
//             sx={{ fontWeight: "bold", color: textColor || defaultTextColor }}
//           >
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
// ];

// // --- MAIN COMPONENT ---
// export default function Dashboard() {
//   const blueColor = "#ff823aff";
//   const [userName, setUserName] = useState("");
//   const [isLoading, setIsLoading] = useState(false); // For punch actions
//   const [isPageLoading, setIsPageLoading] = useState(true); // For initial data load
//   const navigate = useNavigate();
//   const [punchedIn, setPunchedIn] = useState(false);
//   const [snackbar, setSnackbar] = useState({
//     open: false,
//     message: "",
//     severity: "info",
//   });

//   const [punchInTime, setPunchInTime] = useState(null);
//   const [punchOutTime, setPunchOutTime] = useState(null);

//   const [dashboardStats, setDashboardStats] = useState({
//     leaveCount: 0,
//     lateMarkCount: 0,
//     awardCount: 0,
//     assetCount: 0,
//     ticketPriorityData: [],
//   });

//   // --- STATE FOR STATIC CARDS ---
//   const [staticCardData, setStaticCardData] = useState([]);

//   useEffect(() => {
//     // Generate random numbers and card data once on component mount
//     const generateRandomNumber = () => Math.floor(Math.random() * 20) + 1;
//     setStaticCardData([
//       {
//         title: "Employee Count",
//         value: generateRandomNumber(),
//         icon: <AccountTreeIcon />,
//         color: "#1976D2",
//       },
//       {
//         title: "Confirmation Pending",
//         value: generateRandomNumber(),
//         icon: <ConfirmationNumberIcon />,
//         color: "#388E3C",
//       },
//       {
//         title: "Full and Final Pending",
//         value: generateRandomNumber(),
//         icon: <PlaylistAddCheckIcon />,
//         color: "#F57C00",
//       },
//       {
//         title: "Last Month new joinee",
//         value: generateRandomNumber(),
//         icon: <TaskAltIcon />,
//         color: "#D32F2F",
//       },
//       {
//         title: "Last Month Exits",
//         value: generateRandomNumber(),
//         icon: <AccountTreeIcon />,
//         color: "#1976D2",
//       },
//       {
//         title: "Employee Issues",
//         value: generateRandomNumber(),
//         icon: <ConfirmationNumberIcon />,
//         color: "#388E3C",
//       },
//     ]);

//     const fetchDashboardData = async () => {
//       setIsPageLoading(true);
//       const accessToken = localStorage.getItem("accessToken");
//       const employeeCode = localStorage.getItem("loggedInUser");
//       const numericEmpId = localStorage.getItem("loggedInEmpId");

//       if (!accessToken || !employeeCode || !numericEmpId) {
//         setUserName("User");
//         setSnackbar({
//           open: true,
//           message: "Authentication details missing. Please log in again.",
//           severity: "error",
//         });
//         setIsPageLoading(false);
//         return;
//       }

//       try {
//         const [userResponse, statsResponse] = await Promise.all([
//           axios.get(
//             "https://tdtlworld.com/hrms-backend/api/dropdown/employee-role/",
//             {
//               headers: { Authorization: `Bearer ${accessToken}` },
//             }
//           ),
//           axios.get(
//             `https://tdtlworld.com/hrms-backend/empdashboard/${employeeCode}/`,
//             {
//               headers: { Authorization: `Bearer ${accessToken}` },
//             }
//           ),
//         ]);

//         const currentUser = userResponse.data.find(
//           (emp) => String(emp.id) === String(numericEmpId)
//         );
//         setUserName(currentUser?.employee_name || "User");

//         const statsData = statsResponse.data;
//         const tickets = statsData.support_tickets?.data || [];
//         const totalTickets = tickets.length;
//         const priorityCounts = tickets.reduce((acc, ticket) => {
//           acc[ticket.priority] = (acc[ticket.priority] || 0) + 1;
//           return acc;
//         }, {});

//         const newTicketPriorityData = Object.entries(priorityCounts).map(
//           ([name, count]) => ({
//             name,
//             value:
//               totalTickets > 0
//                 ? parseFloat(((count / totalTickets) * 100).toFixed(1))
//                 : 0,
//           })
//         );

//         setDashboardStats({
//           leaveCount: statsData.leave_days_taken || 0,
//           lateMarkCount: statsData.late_mark_count || 0,
//           awardCount: statsData.award_count || 0,
//           assetCount: statsData.asset_count || 0,
//           ticketPriorityData: newTicketPriorityData,
//         });
//       } catch (error) {
//         console.error("Failed to fetch dashboard data:", error);
//         setSnackbar({
//           open: true,
//           message: "Failed to load dashboard data.",
//           severity: "error",
//         });
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
//       const isPunchedIn = savedPunchStatus
//         ? JSON.parse(savedPunchStatus)
//         : false;
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
//     return new Date().toLocaleString("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//       second: "2-digit",
//     });
//   };

//   const getISODateTimeForAPI = () => {
//     return new Date().toISOString().slice(0, 19).replace("T", " ");
//   };

//   const handleCloseSnackbar = (event, reason) => {
//     if (reason === "clickaway") return;
//     setSnackbar({ ...snackbar, open: false });
//   };

//   const handlePunch = async (punchType) => {
//     if (
//       (punchType === "IN" && punchedIn) ||
//       (punchType === "OUT" && !punchedIn)
//     ) {
//       setSnackbar({
//         open: true,
//         message:
//           punchType === "IN"
//             ? "You are already punched in."
//             : "You must punch in first.",
//         severity: "warning",
//       });
//       return;
//     }

//     setIsLoading(true);
//     let locationString = "Location not available";
//     try {
//       const { latitude, longitude } = await getCurrentLocation();
//       locationString = `Lat: ${latitude.toFixed(5)}, Lon: ${longitude.toFixed(
//         5
//       )}`;
//     } catch (error) {
//       setSnackbar({ open: true, message: error.message, severity: "warning" });
//     }

//     const accessToken = localStorage.getItem("accessToken");
//     const employeeCodeForPunch = localStorage.getItem("loggedInUser");

//     if (!accessToken || !employeeCodeForPunch) {
//       setSnackbar({
//         open: true,
//         message: "Authentication details not found. Please log in again.",
//         severity: "error",
//       });
//       setIsLoading(false);
//       return;
//     }

//     const payload = {
//       emp_id: employeeCodeForPunch,
//       punch_time: getISODateTimeForAPI(),
//       punch_type: punchType,
//       location: locationString,
//     };

//     try {
//       await axios.post(
//         "https://tdtlworld.com/hrms-backend/api/employee_attendance/",
//         payload,
//         {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       const newPunchedInStatus = punchType === "IN";
//       setPunchedIn(newPunchedInStatus);
//       localStorage.setItem(
//         "punchedInStatus",
//         JSON.stringify(newPunchedInStatus)
//       );

//       const displayTime = getFormattedDateTimeForAPI();
//       if (punchType === "IN") {
//         setPunchInTime(displayTime);
//         localStorage.setItem("punchInTime", displayTime);
//         setPunchOutTime(null);
//         localStorage.removeItem("punchOutTime");
//       } else {
//         setPunchOutTime(displayTime);
//         localStorage.setItem("punchOutTime", displayTime);
//       }

//       setSnackbar({
//         open: true,
//         message: `Successfully Punched ${punchType === "IN" ? "In" : "Out"}!`,
//         severity: "success",
//       });
//     } catch (error) {
//       console.error("Punch API Call Failed:", error.response || error);
//       let errorMessage =
//         error.response?.data?.error ||
//         "An unknown error occurred during punch.";
//       if (error.response?.status === 404) {
//         errorMessage = "Employee not found. Please check your login details.";
//       }
//       setSnackbar({ open: true, message: errorMessage, severity: "error" });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <Box sx={{ p: { xs: 2, md: 3 } }}>
//       <Snackbar
//         open={snackbar.open}
//         autoHideDuration={6000}
//         onClose={handleCloseSnackbar}
//         anchorOrigin={{ vertical: "top", horizontal: "center" }}
//       >
//         <Alert
//           onClose={handleCloseSnackbar}
//           severity={snackbar.severity}
//           sx={{ width: "100%" }}
//           variant="filled"
//         >
//           {snackbar.message}
//         </Alert>
//       </Snackbar>

//       <Grid container spacing={3}>
//         {/* --- NEW ROW OF 4 STATIC CARDS --- */}
//         {staticCardData.map((card, index) => (
//           <Grid item xs={12} sm={6} md={3} key={index}>
//             <InfoCard
//               title={card.title}
//               value={isPageLoading ? "..." : card.value}
//               icon={card.icon}
//               bgColor={card.color}
//               textColor="white"
//             />
//           </Grid>
//         ))}

//         {/* --- EXISTING CONTENT --- */}
//         <Grid item xs={12} lg={7}>
//           <Grid container spacing={3}>
//             {/* Welcome Header */}
//             <Grid item xs={12}>
//               <Paper sx={{ p: 2, borderRadius: "8px" }}>
//                 <Box
//                   sx={{
//                     display: "flex",
//                     justifyContent: "space-between",
//                     alignItems: "center",
//                     mb: 2,
//                   }}
//                 >
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
//                         backgroundColor: "#4CAF50",
//                         color: "white",
//                         textTransform: "none",
//                         "&:hover": { backgroundColor: "#43A047" },
//                         "&.Mui-disabled": {
//                           backgroundColor: "#A5D6A7",
//                           color: "rgba(0, 0, 0, 0.26)",
//                         },
//                       }}
//                     >
//                       {isLoading && !punchedIn ? "..." : "Punch In"}
//                     </Button>
//                     <Button
//                       variant="contained"
//                       onClick={() => handlePunch("OUT")}
//                       disabled={isLoading || !punchedIn}
//                       sx={{
//                         backgroundColor: "#F44336",
//                         color: "white",
//                         textTransform: "none",
//                         "&:hover": { backgroundColor: "#E53935" },
//                         "&.Mui-disabled": {
//                           backgroundColor: "#EF9A9A",
//                           color: "rgba(0, 0, 0, 0.26)",
//                         },
//                       }}
//                     >
//                       {isLoading && punchedIn ? "..." : "Punch Out"}
//                     </Button>
//                   </Box>
//                 </Box>
//                 <Box
//                   sx={{
//                     display: "flex",
//                     justifyContent: "space-between",
//                     alignItems: "center",
//                     mt: 2,
//                     px: 1,
//                     borderTop: "1px solid #eee",
//                     pt: 2,
//                     minHeight: "24px",
//                   }}
//                 >
//                   <Typography
//                     variant="body2"
//                     color="text.secondary"
//                     sx={{ fontWeight: 500 }}
//                   >
//                     {punchInTime
//                       ? `Punched In: ${punchInTime}`
//                       : "Not punched in today"}
//                   </Typography>
//                   <Typography
//                     variant="body2"
//                     color="text.secondary"
//                     sx={{ fontWeight: 500 }}
//                   >
//                     {punchOutTime ? `Punched Out: ${punchOutTime}` : ""}
//                   </Typography>
//                 </Box>
//               </Paper>
//             </Grid>

//             {/* My Attendance Link */}
//             <Grid item xs={12}>
//               <Paper
//                 sx={{
//                   p: 1.5,
//                   display: "flex",
//                   justifyContent: "space-between",
//                   alignItems: "center",
//                   bgcolor: blueColor,
//                   color: "white",
//                   borderRadius: "8px",
//                 }}
//               >
//                 <Button
//                   sx={{ color: "white", textTransform: "none" }}
//                   endIcon={<ArrowForwardIcon />}
//                   onClick={() =>
//                     navigate("/hrms/dashboardhr/attendance")
//                   }
//                 >
//                   My Attendance
//                 </Button>
//               </Paper>
//             </Grid>

//             <Grid item xs={12} sm={6}>
//               <InfoCard
//                 title="My Awards"
//                 value={isPageLoading ? "..." : dashboardStats.awardCount}
//                 icon={<AttachMoneyIcon />}
//                 bgColor={blueColor}
//                 textColor="white"
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <InfoCard
//                 title="Total Assets"
//                 value={isPageLoading ? "..." : dashboardStats.assetCount}
//                 icon={<SpeedIcon />}
//               />
//             </Grid>

//             <Grid item xs={12}>
//               <CardPaper>
//                 <Typography variant="h6" gutterBottom>
//                   Ticket Priority
//                 </Typography>
//                 <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
//                   <Box sx={{ width: 150, height: 150 }}>
//                     <ResponsiveContainer>
//                       <PieChart>
//                         <Pie
//                           data={dashboardStats.ticketPriorityData}
//                           cx="50%"
//                           cy="50%"
//                           innerRadius={40}
//                           outerRadius={60}
//                           dataKey="value"
//                           label={({ value }) => `${value}%`}
//                           labelLine={false}
//                           isAnimationActive={!isPageLoading}
//                         >
//                           {dashboardStats.ticketPriorityData.map((entry) => (
//                             <Cell
//                               key={`cell-${entry.name}`}
//                               fill={priorityColorMap[entry.name] || "#CCCCCC"}
//                             />
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
//               <InfoCard
//                 title="My Leave"
//                 value={isPageLoading ? "..." : dashboardStats.leaveCount}
//                 icon={<LabelIcon />}
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <InfoCard
//                 title="Late Mark"
//                 value={isPageLoading ? "..." : dashboardStats.lateMarkCount}
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
//                 <Box
//                   sx={{
//                     height: 250,
//                     width: "100%",
//                     mt: 2,
//                     ".recharts-wrapper": { ml: -1 },
//                   }}
//                 >
//                   <ResponsiveContainer>
//                     <LineChart
//                       data={payrollChartData}
//                       margin={{ top: 5, right: 20, left: -20, bottom: 5 }}
//                     >
//                       <CartesianGrid
//                         stroke="#e0e0e0"
//                         strokeDasharray="5 5"
//                         vertical={false}
//                       />
//                       <XAxis
//                         dataKey="name"
//                         tick={{ fontSize: 12, fill: "#666" }}
//                         axisLine={false}
//                         tickLine={false}
//                       />
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
//   );
// }

///



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
//   const [loadingType, setLoadingType] = useState(null);
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
//                 <Button sx={{ color: "white", textTransform: "none" }} endIcon={<ArrowForwardIcon />} onClick={() => navigate('/hrms/dashboardhr/attendance')}>My Attendance</Button>
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
//     </Box >
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
// import Swal from 'sweetalert2' // Import SweetAlert2

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
//         Swal.fire({
//             title: 'Action Required',
//             text: "Acknowledge your policies for Punch In/Out.",
//             icon: 'warning',
//         });
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
//             <Grid item xs={12}><CardPaper><Typography variant="h6">My Payroll = monthly report</Typography><Box sx={{ display: "flex", gap: 4, my: 2 }}><Box><Typography variant="h5" sx={{ fontWeight: "bold" }}>₹0.00</Typography><Typography variant="body2" color="text.secondary">Total</Typography></Box><Box><Typography variant="h5" sx={{ fontWeight: "bold" }}>₹0.00</Typography><Typography variant="body2" color="text.secondary">This Month</Typography></Box></Box><Box sx={{ height: 250, width: "100%", mt: 2, ".recharts-wrapper": { ml: -1 } }}><ResponsiveContainer><LineChart data={payrollChartData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}><CartesianGrid stroke="#e0e0e0" strokeDasharray="5 5" vertical={false} /><XAxis dataKey="name" tick={{ fontSize: 12, fill: '#666' }} axisLine={false} tickLine={false} /><YAxis domain={[0, 5]} ticks={[0.0, 1.0, 2.0, 3.0, 4.0, 5.0]} tickFormatter={(tick) => tick.toFixed(1)} tick={{ fontSize: 12, fill: '#666' }} axisLine={false} tickLine={false} /></LineChart></ResponsiveContainer></Box></CardPaper></Grid>
//           </Grid>
//         </Grid>
//       </Grid>
//     </Box>
//   )
// }








// import { useState, useEffect } from "react";
// import {
//     Box, Typography, Button, Paper, Grid, useTheme, Icon,
//     Snackbar, Alert, Dialog, DialogActions, DialogContent,
//     DialogContentText, DialogTitle, CircularProgress,
// } from "@mui/material";
// import { styled } from "@mui/material/styles";
// import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, XAxis, YAxis, CartesianGrid } from "recharts";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import Swal from 'sweetalert2';

// // Icons
// import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
// import SpeedIcon from "@mui/icons-material/Speed";
// import LabelIcon from "@mui/icons-material/Label";
// import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
// import MoreTimeIcon from '@mui/icons-material/MoreTime';
// import HolidayVillageIcon from '@mui/icons-material/HolidayVillage';
// // Icons for New Cards
// import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
// import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
// import PersonAddIcon from '@mui/icons-material/PersonAdd';
// import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
// import ReportProblemIcon from '@mui/icons-material/ReportProblem';

// // --- HELPER FUNCTIONS (UNCHANGED) ---
// const getCurrentLocation = () => new Promise((resolve, reject) => { if (!navigator.geolocation) return reject(new Error("Geolocation is not supported.")); navigator.geolocation.getCurrentPosition((position) => resolve({ latitude: position.coords.latitude, longitude: position.coords.longitude }), () => reject(new Error("Unable to retrieve location. Please grant permission."))); });
// const formatApiTime = (timeString) => { if (!timeString) return ''; const today = new Date(); const [hours, minutes, seconds] = timeString.split(':'); today.setHours(parseInt(hours, 10), parseInt(minutes, 10), parseInt(seconds, 10) || 0); if (isNaN(today.getTime())) return ''; return today.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', hour: 'numeric', minute: 'numeric', hour12: true }); };
// const getFormattedDateTimeForDisplay = () => new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', hour: 'numeric', minute: 'numeric', hour12: true });
// const getISTDateTimeForAPI = () => new Date().toLocaleString('sv-SE', { timeZone: 'Asia/Kolkata' });

// // --- STYLED COMPONENTS (UNCHANGED) ---
// const CardPaper = styled(Paper)(({ theme }) => ({ padding: theme.spacing(2), display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%", borderRadius: "8px", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }));
// const InfoCard = ({ title, value, icon, bgColor, textColor }) => { const theme = useTheme(); return (<CardPaper sx={{ backgroundColor: bgColor || theme.palette.background.paper }}><Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><Box><Typography variant="subtitle1" sx={{ color: textColor || theme.palette.text.primary }}>{title}</Typography><Typography variant="h4" component="p" sx={{ fontWeight: "bold", color: textColor || theme.palette.text.primary }}>{value}</Typography></Box><Icon sx={{ fontSize: 32, color: textColor || "primary" }}>{icon}</Icon></Box></CardPaper>); };
// const StatusLegend = ({ items }) => (<Box>{items.map((item, index) => (<Box key={index} sx={{ display: "flex", alignItems: "center", mb: 0.5 }}><Box sx={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: item.color, mr: 1 }} /><Typography variant="body2" color="text.secondary">{item.label}</Typography></Box>))}</Box>);

// // --- CONSTANTS (UNCHANGED) ---
// const TICKET_COLOR_MAP = { "Low": "#FFA726", "Medium": "#FFB74D", "High": "#FF7043", "Critical": "#FFEE58", "No Tickets": "#E0E0E0" };
// const ticketLegendItems = [{ color: TICKET_COLOR_MAP.Low, label: "Low" }, { color: TICKET_COLOR_MAP.Medium, label: "Medium" }, { color: TICKET_COLOR_MAP.High, label: "High" }, { color: TICKET_COLOR_MAP.Critical, label: "Critical" }];
// const payrollChartData = [{ name: "Jul 24", v: null }, { name: "Aug 24", v: null }, { name: "Sep 24", v: null }, { name: "Oct 24", v: null }, { name: "Nov 24", v: null }, { name: "Dec 24", v: null }, { name: "Jan 25", v: null }, { name: "Feb 25", v: null }, { name: "Mar 25", v: null }, { name: "Apr 25", v: null }, { name: "May 25", v: null }, { name: "Jun 25", v: null }];

// export default function Dashboard() {
//     // --- THEME AND NAVIGATION HOOKS ---
//     const navigate = useNavigate();
//     const theme = useTheme();
//     const primaryColor = "#8C257C";
//     const primaryButtonHover = "#6d1d60";

//     // --- STATE MANAGEMENT (No logical change) ---
//     const [userName, setUserName] = useState("");
//     const [loadingType, setLoadingType] = useState(null);
//     const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "info" });
//     const [dialog, setDialog] = useState({ open: false, type: null });
//     const [punchInTime, setPunchInTime] = useState(null);
//     const [punchOutTime, setPunchOutTime] = useState(null);
//     const [shiftInfo, setShiftInfo] = useState("My Shift: Loading...");
//     const [leaveCount, setLeaveCount] = useState(0);
//     const [lateMarkCount, setLateMarkCount] = useState(0);
//     const [awardCount, setAwardCount] = useState(0);
//     const [assetCount, setAssetCount] = useState(0);
//     const [ticketData, setTicketData] = useState([{ name: 'No Tickets', value: 100 }]);
//     const [isHoliday, setIsHoliday] = useState(false);
//     const [isLoading, setIsLoading] = useState(true);
//     const [showPunchUI, setShowPunchUI] = useState(false);
//     const [isEmployeeConfirmed, setIsEmployeeConfirmed] = useState(false);
//     const [hasAcknowledgedPolicies, setHasAcknowledgedPolicies] = useState(false);

//     // --- DATA FETCHING AND LOGIC (No change in logic) ---
//     useEffect(() => {
//         const accessToken = localStorage.getItem("accessToken");
//         const employeeId = localStorage.getItem("loggedInUser");
//         const loggedInEmpId = localStorage.getItem("loggedInEmpId");
//         if (!accessToken || !employeeId || !loggedInEmpId) { setIsLoading(false); return; }

//         const headers = { Authorization: `Bearer ${accessToken}` };
//         axios.get("https://tdtlworld.com/hrms-backend/api/dropdown/employee-role/", { headers })
//             .then(res => setUserName(res.data.find(e => String(e.id) === String(loggedInEmpId))?.employee_name || "User"))
//             .catch(err => console.error("Failed to fetch user name:", err));

//         Promise.all([
//             axios.get(`https://tdtlworld.com/hrms-backend/EmpConfirmation/${employeeId}/`, { headers }),
//             axios.get(`https://tdtlworld.com/hrms-backend/policy_ack/${employeeId}/`, { headers }),
//             axios.get(`https://tdtlworld.com/hrms-backend/empdashboard/${employeeId}/`, { headers }),
//             axios.get(`https://tdtlworld.com/hrms-backend/api/dashboard_attendance/${employeeId}/`, { headers }),
//         ]).then(([confRes, policyRes, dashRes, attendRes]) => {
//             const isPolicyOk = policyRes.data?.status === 'Y';
//             setHasAcknowledgedPolicies(isPolicyOk);
//             setIsEmployeeConfirmed(confRes.data?.employee_confirm === 'Y');
//             setShowPunchUI(isPolicyOk);

//             const dashData = dashRes.data;
//             setLeaveCount(dashData.leave_days_taken || 0);
//             setLateMarkCount(dashData.late_mark_count || 0);
//             setAwardCount(dashData.award_count || 0);
//             setAssetCount(dashData.asset_count || 0);

//             const { in_time, out_time } = dashData?.office_shift || {};
//             if (in_time === "Holiday") {
//                 setShiftInfo("My Shift: Holiday"); setIsHoliday(true);
//             } else if (in_time && out_time) {
//                 setShiftInfo(`My Shift: ${formatApiTime(in_time)} To ${formatApiTime(out_time)}`); setIsHoliday(false);
//             } else {
//                 setShiftInfo("My Shift: Not Assigned"); setIsHoliday(false);
//             }

//             if (dashData.support_tickets?.count > 0) {
//                 const { data: tickets, count: total } = dashData.support_tickets;
//                 const counts = tickets.reduce((acc, t) => ({ ...acc, [t.priority]: (acc[t.priority] || 0) + 1 }), {});
//                 setTicketData(Object.entries(counts).map(([name, value]) => ({ name, value: parseFloat(((value / total) * 100).toFixed(1)) })));
//             }

//             const todayAttendance = attendRes.data.data?.[0];
//             if (todayAttendance) {
//                 setPunchInTime(todayAttendance.clock_in ? formatApiTime(todayAttendance.clock_in) : null);
//                 setPunchOutTime(todayAttendance.clock_out ? formatApiTime(todayAttendance.clock_out) : null);
//             }
//         }).catch(err => {
//             console.error("Dashboard data fetch failed:", err);
//             setSnackbar({ open: true, message: "Could not load dashboard information.", severity: "error" });
//             setShowPunchUI(false);
//         }).finally(() => setIsLoading(false));
//     }, []);

//     useEffect(() => {
//         if (isLoading) return;
//         if (!hasAcknowledgedPolicies) { Swal.fire({ title: 'Action Required', text: "Acknowledge your policies to enable Punch In/Out.", icon: 'warning' }); return; }
//         if (!isEmployeeConfirmed) { setSnackbar({ open: true, message: "Your employee confirmation is pending.", severity: "warning" }); }
//     }, [isLoading, hasAcknowledgedPolicies, isEmployeeConfirmed]);

//     const handleCloseSnackbar = (event, reason) => { if (reason === 'clickaway') return; setSnackbar({ ...snackbar, open: false }); };
//     const handleCloseDialog = () => setDialog({ open: false, type: null });
//     const handlePunchClick = (punchType) => { if (loadingType) return; setDialog({ open: true, type: punchType }); };

//     const executePunch = async () => {
//         const punchType = dialog.type;
//         handleCloseDialog(); setLoadingType(punchType);
//         let locationString = "Location not available";
//         try { const { latitude, longitude } = await getCurrentLocation(); locationString = `Lat: ${latitude.toFixed(5)}, Lon: ${longitude.toFixed(5)}`; } catch (error) { setSnackbar({ open: true, message: error.message, severity: "warning" }); }
        
//         const accessToken = localStorage.getItem("accessToken");
//         const employeeId = localStorage.getItem("loggedInUser");
//         if (!accessToken || !employeeId) { setSnackbar({ open: true, message: "Authentication failed.", severity: "error" }); setLoadingType(null); return; }
        
//         const payload = { emp_id: employeeId, punch_time: getISTDateTimeForAPI(), punch_type: punchType, location: locationString };
//         try {
//             await axios.post("https://tdtlworld.com/hrms-backend/api/employee_attendance/", payload, { headers: { Authorization: `Bearer ${accessToken}` } });
//             const displayTime = getFormattedDateTimeForDisplay();
//             punchType === "IN" ? setPunchInTime(displayTime) : setPunchOutTime(displayTime);
//             if(punchType === "IN") setPunchOutTime(null);
//             setSnackbar({ open: true, message: `Successfully Punched ${punchType === 'IN' ? 'In' : 'Out'}!`, severity: "success" });
//         } catch (error) {
//             setSnackbar({ open: true, message: error.response?.data?.error || "Punch failed.", severity: "error" });
//         } finally {
//             setLoadingType(null);
//         }
//     };

//     const isCurrentlyPunchedIn = !!punchInTime && !punchOutTime;

//     if (isLoading) {
//         return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}><CircularProgress /><Typography sx={{ ml: 2 }}>Loading Dashboard...</Typography></Box>;
//     }

//     return (
//         <Box p={2}>
//             <Typography variant="h4" fontWeight="bold" color={primaryColor} mb={5}>
//                 Employee Dashboard
//             </Typography>

//             <Snackbar open={snackbar.open} autoHideDuration={5000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}><Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }} variant="filled">{snackbar.message}</Alert></Snackbar>
//             <Dialog open={dialog.open} onClose={handleCloseDialog}><DialogTitle>{`Confirm Punch ${dialog.type === 'IN' ? 'In' : 'Out'}`}</DialogTitle><DialogContent><DialogContentText>Are you sure you want to punch {dialog.type === 'IN' ? 'in' : 'out'}?</DialogContentText></DialogContent><DialogActions><Button onClick={handleCloseDialog}>Cancel</Button><Button onClick={executePunch} variant="contained" autoFocus sx={{ backgroundColor: primaryColor, '&:hover': { backgroundColor: primaryButtonHover } }}>Confirm</Button></DialogActions></Dialog>

//             <Grid container spacing={3}>
//                 <Grid item xs={12}>
//                     <Paper sx={{ p: 2, borderRadius: "8px" }}>
//                         <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2, flexWrap: 'wrap', gap: 2 }}>
//                             <Box><Typography variant="h5">Welcome {userName}</Typography><Typography variant="body2" color="text.secondary">{shiftInfo}</Typography></Box>
//                             {showPunchUI && (isHoliday ? <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><HolidayVillageIcon sx={{ color: primaryColor }} /><Typography variant="h6" sx={{ color: primaryColor, fontWeight: 'bold' }}>Holiday</Typography></Box> : <Box sx={{ display: "flex", gap: 2 }}><Button variant="contained" onClick={() => handlePunchClick("IN")} disabled={loadingType !== null || isCurrentlyPunchedIn} sx={{ backgroundColor: primaryColor, '&:hover': { backgroundColor: primaryButtonHover } }}>{loadingType === 'IN' ? <CircularProgress size={24} color="inherit" /> : "Punch In"}</Button><Button variant="contained" onClick={() => handlePunchClick("OUT")} disabled={loadingType !== null || !isCurrentlyPunchedIn} sx={{ backgroundColor: primaryColor, '&:hover': { backgroundColor: primaryButtonHover } }}>{loadingType === 'OUT' ? <CircularProgress size={24} color="inherit" /> : "Punch Out"}</Button></Box>)}
//                         </Box>
//                         {showPunchUI && <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2, px: 1, borderTop: '1px solid #eee', pt: 2, minHeight: '24px', flexWrap: 'wrap', gap: 1 }}><Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>{punchInTime ? `Punched In: ${punchInTime}` : 'Not punched in today'}</Typography><Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>{punchOutTime ? `Punched Out: ${punchOutTime}` : ''}</Typography></Box>}
//                     </Paper>
//                 </Grid>

//                 {/* --- NEW CARDS SECTION --- */}
//                 <Grid item xs={12}>
//                     <Grid container spacing={3}>
//                         <Grid item xs={12} sm={6} md={2.4}><InfoCard title="Confirmation Pending" value={"5"} icon={<HourglassEmptyIcon />} /></Grid>
//                         <Grid item xs={12} sm={6} md={2.4}><InfoCard title="Full & Final Pending" value={"2"} icon={<ReceiptLongIcon />} bgColor={primaryColor} textColor="white" /></Grid>
//                         <Grid item xs={12} sm={6} md={2.4}><InfoCard title="Last Month New Joinee" value={"12"} icon={<PersonAddIcon />} /></Grid>
//                         <Grid item xs={12} sm={6} md={2.4}><InfoCard title="Last Month Exits" value={"3"} icon={<PersonRemoveIcon />} bgColor={primaryColor} textColor="white" /></Grid>
//                         <Grid item xs={12} sm={12} md={2.4}><InfoCard title="Employee Issues" value={"8"} icon={<ReportProblemIcon />} /></Grid>
//                     </Grid>
//                 </Grid>

//                 <Grid item xs={12} lg={7}>
//                     <Grid container spacing={3}>
//                         {showPunchUI && <Grid item xs={12}><Paper sx={{ p: 1.5, display: "flex", justifyContent: "space-between", alignItems: "center", bgcolor: primaryColor, color: "white", borderRadius: "8px" }}><Button sx={{ color: "white" }} endIcon={<ArrowForwardIcon />} onClick={() => navigate('/hrms/dashboard/attendance')}>My Attendance</Button></Paper></Grid>}
//                         <Grid item xs={12} sm={6}><InfoCard title="My Awards" value={awardCount} icon={<AttachMoneyIcon />} bgColor={primaryColor} textColor="white" /></Grid>
//                         <Grid item xs={12} sm={6}><InfoCard title="Total Assets" value={assetCount} icon={<SpeedIcon />} /></Grid>
//                         <Grid item xs={12}><CardPaper><Typography variant="h6" gutterBottom>Ticket Priority</Typography><Box sx={{ display: "flex", alignItems: "center", mt: 2 }}><Box sx={{ width: 150, height: 150 }}><ResponsiveContainer><PieChart><Pie data={ticketData} cx="50%" cy="50%" innerRadius={40} outerRadius={60} dataKey="value" label={({ value, name }) => name === 'No Tickets' ? 'N/A' : `${value}%`} labelLine={false}>{ticketData.map((entry, index) => (<Cell key={`cell-${index}`} fill={TICKET_COLOR_MAP[entry.name]} />))}</Pie></PieChart></ResponsiveContainer></Box><Box sx={{ ml: 4 }}><StatusLegend items={ticketLegendItems} /></Box></Box></CardPaper></Grid>
//                     </Grid>
//                 </Grid>

//                 <Grid item xs={12} lg={5}>
//                     <Grid container spacing={3}>
//                         <Grid item xs={12} sm={6}><InfoCard title="My Leave" value={leaveCount} icon={<LabelIcon />} /></Grid>
//                         <Grid item xs={12} sm={6}><InfoCard title="Late Mark" value={lateMarkCount} icon={<MoreTimeIcon />} bgColor={primaryColor} textColor="white" /></Grid>
//                         <Grid item xs={12}><CardPaper><Typography variant="h6">My Payroll - Monthly Report</Typography><Box sx={{ display: "flex", gap: 4, my: 2 }}><Box><Typography variant="h5" sx={{ fontWeight: "bold" }}>₹0.00</Typography><Typography variant="body2" color="text.secondary">Total</Typography></Box><Box><Typography variant="h5" sx={{ fontWeight: "bold" }}>₹0.00</Typography><Typography variant="body2" color="text.secondary">This Month</Typography></Box></Box><Box sx={{ height: 250, width: "100%", mt: 2 }}><ResponsiveContainer><LineChart data={payrollChartData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}><CartesianGrid stroke="#e0e0e0" strokeDasharray="5 5" vertical={false} /><XAxis dataKey="name" tick={{ fontSize: 12, fill: '#666' }} axisLine={false} tickLine={false} /><YAxis domain={[0, 5]} ticks={[0.0, 1.0, 2.0, 3.0, 4.0, 5.0]} tickFormatter={(tick) => tick.toFixed(1)} tick={{ fontSize: 12, fill: '#666' }} axisLine={false} tickLine={false} /></LineChart></ResponsiveContainer></Box></CardPaper></Grid>
//                     </Grid>
//                 </Grid>
//             </Grid>
//         </Box>
//     )
// }









// import { useState, useEffect } from "react";
// import {
//     Box, Typography, Button, Paper, Grid, useTheme, Icon,
//     Snackbar, Alert, Dialog, DialogActions, DialogContent,
//     DialogContentText, DialogTitle, CircularProgress,
// } from "@mui/material";
// import { styled } from "@mui/material/styles";
// import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, XAxis, YAxis, CartesianGrid } from "recharts";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import Swal from 'sweetalert2';

// // Icons
// import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
// import SpeedIcon from "@mui/icons-material/Speed";
// import LabelIcon from "@mui/icons-material/Label";
// import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
// import MoreTimeIcon from '@mui/icons-material/MoreTime';
// import HolidayVillageIcon from '@mui/icons-material/HolidayVillage';
// // Icons for New Cards
// import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
// import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
// import PersonAddIcon from '@mui/icons-material/PersonAdd';
// import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
// import ReportProblemIcon from '@mui/icons-material/ReportProblem';
// import GroupsIcon from '@mui/icons-material/Groups'; // Added Icon

// // --- HELPER FUNCTIONS (UNCHANGED) ---
// const getCurrentLocation = () => new Promise((resolve, reject) => { if (!navigator.geolocation) return reject(new Error("Geolocation is not supported.")); navigator.geolocation.getCurrentPosition((position) => resolve({ latitude: position.coords.latitude, longitude: position.coords.longitude }), () => reject(new Error("Unable to retrieve location. Please grant permission."))); });
// const formatApiTime = (timeString) => { if (!timeString) return ''; const today = new Date(); const [hours, minutes, seconds] = timeString.split(':'); today.setHours(parseInt(hours, 10), parseInt(minutes, 10), parseInt(seconds, 10) || 0); if (isNaN(today.getTime())) return ''; return today.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', hour: 'numeric', minute: 'numeric', hour12: true }); };
// const getFormattedDateTimeForDisplay = () => new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', hour: 'numeric', minute: 'numeric', hour12: true });
// const getISTDateTimeForAPI = () => new Date().toLocaleString('sv-SE', { timeZone: 'Asia/Kolkata' });

// // --- STYLED COMPONENTS (UPDATED) ---
// const CardPaper = styled(Paper)(({ theme }) => ({
//     padding: theme.spacing(2),
//     display: "flex",
//     flexDirection: "column",
//     justifyContent: "space-between",
//     height: "100%",
//     borderRadius: "8px",
//     boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
//     border: '1px solid #e0e0e0', // Added border
// }));
// const InfoCard = ({ title, value, icon, bgColor, textColor }) => { const theme = useTheme(); return (<CardPaper sx={{ backgroundColor: bgColor || theme.palette.background.paper }}><Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><Box><Typography variant="subtitle1" sx={{ color: textColor || theme.palette.text.primary }}>{title}</Typography><Typography variant="h4" component="p" sx={{ fontWeight: "bold", color: textColor || theme.palette.text.primary }}>{value}</Typography></Box><Icon sx={{ fontSize: 32, color: textColor || "primary" }}>{icon}</Icon></Box></CardPaper>); };
// const StatusLegend = ({ items }) => (<Box>{items.map((item, index) => (<Box key={index} sx={{ display: "flex", alignItems: "center", mb: 0.5 }}><Box sx={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: item.color, mr: 1 }} /><Typography variant="body2" color="text.secondary">{item.label}</Typography></Box>))}</Box>);

// // --- CONSTANTS (UNCHANGED) ---
// const TICKET_COLOR_MAP = { "Low": "#FFA726", "Medium": "#FFB74D", "High": "#FF7043", "Critical": "#FFEE58", "No Tickets": "#E0E0E0" };
// const ticketLegendItems = [{ color: TICKET_COLOR_MAP.Low, label: "Low" }, { color: TICKET_COLOR_MAP.Medium, label: "Medium" }, { color: TICKET_COLOR_MAP.High, label: "High" }, { color: TICKET_COLOR_MAP.Critical, label: "Critical" }];
// const payrollChartData = [{ name: "Jul 24", v: null }, { name: "Aug 24", v: null }, { name: "Sep 24", v: null }, { name: "Oct 24", v: null }, { name: "Nov 24", v: null }, { name: "Dec 24", v: null }, { name: "Jan 25", v: null }, { name: "Feb 25", v: null }, { name: "Mar 25", v: null }, { name: "Apr 25", v: null }, { name: "May 25", v: null }, { name: "Jun 25", v: null }];

// export default function Dashboard() {
//     // --- THEME AND NAVIGATION HOOKS ---
//     const navigate = useNavigate();
//     const theme = useTheme();
//     const primaryColor = "#8C257C";
//     const secondaryColor = "#F58E35";
//     const primaryButtonHover = "#6d1d60";

//     // --- STATE MANAGEMENT (No logical change) ---
//     const [userName, setUserName] = useState("");
//     const [loadingType, setLoadingType] = useState(null);
//     const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "info" });
//     const [dialog, setDialog] = useState({ open: false, type: null });
//     const [punchInTime, setPunchInTime] = useState(null);
//     const [punchOutTime, setPunchOutTime] = useState(null);
//     const [shiftInfo, setShiftInfo] = useState("My Shift: Loading...");
//     const [leaveCount, setLeaveCount] = useState(0);
//     const [lateMarkCount, setLateMarkCount] = useState(0);
//     const [awardCount, setAwardCount] = useState(0);
//     const [assetCount, setAssetCount] = useState(0);
//     const [ticketData, setTicketData] = useState([{ name: 'No Tickets', value: 100 }]);
//     const [isHoliday, setIsHoliday] = useState(false);
//     const [isLoading, setIsLoading] = useState(true);
//     const [showPunchUI, setShowPunchUI] = useState(false);
//     const [isEmployeeConfirmed, setIsEmployeeConfirmed] = useState(false);
//     const [hasAcknowledgedPolicies, setHasAcknowledgedPolicies] = useState(false);

//     // --- DATA FETCHING AND LOGIC (No change in logic) ---
//     useEffect(() => {
//         const accessToken = localStorage.getItem("accessToken");
//         const employeeId = localStorage.getItem("loggedInUser");
//         const loggedInEmpId = localStorage.getItem("loggedInEmpId");
//         if (!accessToken || !employeeId || !loggedInEmpId) { setIsLoading(false); return; }

//         const headers = { Authorization: `Bearer ${accessToken}` };
//         axios.get("https://tdtlworld.com/hrms-backend/api/dropdown/employee-role/", { headers })
//             .then(res => setUserName(res.data.find(e => String(e.id) === String(loggedInEmpId))?.employee_name || "User"))
//             .catch(err => console.error("Failed to fetch user name:", err));

//         Promise.all([
//             axios.get(`https://tdtlworld.com/hrms-backend/EmpConfirmation/${employeeId}/`, { headers }),
//             axios.get(`https://tdtlworld.com/hrms-backend/policy_ack/${employeeId}/`, { headers }),
//             axios.get(`https://tdtlworld.com/hrms-backend/empdashboard/${employeeId}/`, { headers }),
//             axios.get(`https://tdtlworld.com/hrms-backend/api/dashboard_attendance/${employeeId}/`, { headers }),
//         ]).then(([confRes, policyRes, dashRes, attendRes]) => {
//             const isPolicyOk = policyRes.data?.status === 'Y';
//             setHasAcknowledgedPolicies(isPolicyOk);
//             setIsEmployeeConfirmed(confRes.data?.employee_confirm === 'Y');
//             setShowPunchUI(isPolicyOk);

//             const dashData = dashRes.data;
//             setLeaveCount(dashData.leave_days_taken || 0);
//             setLateMarkCount(dashData.late_mark_count || 0);
//             setAwardCount(dashData.award_count || 0);
//             setAssetCount(dashData.asset_count || 0);

//             const { in_time, out_time } = dashData?.office_shift || {};
//             if (in_time === "Holiday") {
//                 setShiftInfo("My Shift: Holiday"); setIsHoliday(true);
//             } else if (in_time && out_time) {
//                 setShiftInfo(`My Shift: ${formatApiTime(in_time)} To ${formatApiTime(out_time)}`); setIsHoliday(false);
//             } else {
//                 setShiftInfo("My Shift: Not Assigned"); setIsHoliday(false);
//             }

//             if (dashData.support_tickets?.count > 0) {
//                 const { data: tickets, count: total } = dashData.support_tickets;
//                 const counts = tickets.reduce((acc, t) => ({ ...acc, [t.priority]: (acc[t.priority] || 0) + 1 }), {});
//                 setTicketData(Object.entries(counts).map(([name, value]) => ({ name, value: parseFloat(((value / total) * 100).toFixed(1)) })));
//             }

//             const todayAttendance = attendRes.data.data?.[0];
//             if (todayAttendance) {
//                 setPunchInTime(todayAttendance.clock_in ? formatApiTime(todayAttendance.clock_in) : null);
//                 setPunchOutTime(todayAttendance.clock_out ? formatApiTime(todayAttendance.clock_out) : null);
//             }
//         }).catch(err => {
//             console.error("Dashboard data fetch failed:", err);
//             setSnackbar({ open: true, message: "Could not load dashboard information.", severity: "error" });
//             setShowPunchUI(false);
//         }).finally(() => setIsLoading(false));
//     }, []);

//     useEffect(() => {
//         if (isLoading) return;
//         if (!hasAcknowledgedPolicies) { Swal.fire({ title: 'Action Required', text: "Acknowledge your policies to enable Punch In/Out.", icon: 'warning' }); return; }
//         if (!isEmployeeConfirmed) { setSnackbar({ open: true, message: "Your employee confirmation is pending.", severity: "warning" }); }
//     }, [isLoading, hasAcknowledgedPolicies, isEmployeeConfirmed]);

//     const handleCloseSnackbar = (event, reason) => { if (reason === 'clickaway') return; setSnackbar({ ...snackbar, open: false }); };
//     const handleCloseDialog = () => setDialog({ open: false, type: null });
//     const handlePunchClick = (punchType) => { if (loadingType) return; setDialog({ open: true, type: punchType }); };

//     const executePunch = async () => {
//         const punchType = dialog.type;
//         handleCloseDialog(); setLoadingType(punchType);
//         let locationString = "Location not available";
//         try { const { latitude, longitude } = await getCurrentLocation(); locationString = `Lat: ${latitude.toFixed(5)}, Lon: ${longitude.toFixed(5)}`; } catch (error) { setSnackbar({ open: true, message: error.message, severity: "warning" }); }
        
//         const accessToken = localStorage.getItem("accessToken");
//         const employeeId = localStorage.getItem("loggedInUser");
//         if (!accessToken || !employeeId) { setSnackbar({ open: true, message: "Authentication failed.", severity: "error" }); setLoadingType(null); return; }
        
//         const payload = { emp_id: employeeId, punch_time: getISTDateTimeForAPI(), punch_type: punchType, location: locationString };
//         try {
//             await axios.post("https://tdtlworld.com/hrms-backend/api/employee_attendance/", payload, { headers: { Authorization: `Bearer ${accessToken}` } });
//             const displayTime = getFormattedDateTimeForDisplay();
//             punchType === "IN" ? setPunchInTime(displayTime) : setPunchOutTime(displayTime);
//             if(punchType === "IN") setPunchOutTime(null);
//             setSnackbar({ open: true, message: `Successfully Punched ${punchType === 'IN' ? 'In' : 'Out'}!`, severity: "success" });
//         } catch (error) {
//             setSnackbar({ open: true, message: error.response?.data?.error || "Punch failed.", severity: "error" });
//         } finally {
//             setLoadingType(null);
//         }
//     };

//     const isCurrentlyPunchedIn = !!punchInTime && !punchOutTime;

//     if (isLoading) {
//         return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}><CircularProgress /><Typography sx={{ ml: 2 }}>Loading Dashboard...</Typography></Box>;
//     }

//     return (
//         <Box p={2}>
//             <Typography variant="h4" fontWeight="bold" color={primaryColor} mb={5}>
//                 HR Dashboard
//             </Typography>

//             <Snackbar open={snackbar.open} autoHideDuration={5000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}><Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }} variant="filled">{snackbar.message}</Alert></Snackbar>
//             <Dialog open={dialog.open} onClose={handleCloseDialog}><DialogTitle>{`Confirm Punch ${dialog.type === 'IN' ? 'In' : 'Out'}`}</DialogTitle><DialogContent><DialogContentText>Are you sure you want to punch {dialog.type === 'IN' ? 'in' : 'out'}?</DialogContentText></DialogContent><DialogActions><Button onClick={handleCloseDialog}>Cancel</Button><Button onClick={executePunch} variant="contained" autoFocus sx={{ backgroundColor: primaryColor, '&:hover': { backgroundColor: primaryButtonHover } }}>Confirm</Button></DialogActions></Dialog>

//             <Grid container spacing={3}>
//                 <Grid item xs={12}>
//                     <Paper sx={{ p: 2, borderRadius: "8px", border: '1px solid #e0e0e0', background: `linear-gradient(to right, ${primaryColor}, ${secondaryColor})`, color: 'white' }}>
//                         <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2, flexWrap: 'wrap', gap: 2 }}>
//                             <Box><Typography variant="h5" sx={{color: 'white', fontWeight: 'bold'}}>Welcome {userName}</Typography><Typography variant="body2" sx={{color: 'rgba(255,255,255,0.85)'}}>{shiftInfo}</Typography></Box>
//                             {showPunchUI && (isHoliday ? <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><HolidayVillageIcon sx={{ color: 'white' }} /><Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold' }}>Holiday</Typography></Box> : <Box sx={{ display: "flex", gap: 2 }}><Button variant="contained" onClick={() => handlePunchClick("IN")} disabled={loadingType !== null || isCurrentlyPunchedIn} sx={{ backgroundColor: 'rgba(255,255,255,0.9)', color: primaryColor, '&:hover': { backgroundColor: 'white' } }}>{loadingType === 'IN' ? <CircularProgress size={24} color="inherit" /> : "Punch In"}</Button><Button variant="contained" onClick={() => handlePunchClick("OUT")} disabled={loadingType !== null || !isCurrentlyPunchedIn} sx={{ backgroundColor: 'rgba(255,255,255,0.9)', color: primaryColor, '&:hover': { backgroundColor: 'white' } }}>{loadingType === 'OUT' ? <CircularProgress size={24} color="inherit" /> : "Punch Out"}</Button></Box>)}
//                         </Box>
//                         {showPunchUI && <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2, px: 1, borderTop: '1px solid rgba(255,255,255,0.3)', pt: 2, minHeight: '24px', flexWrap: 'wrap', gap: 1 }}><Typography variant="body2" sx={{ fontWeight: 500, color: 'rgba(255,255,255,0.85)' }}>{punchInTime ? `Punched In: ${punchInTime}` : 'Not punched in today'}</Typography><Typography variant="body2" sx={{ fontWeight: 500, color: 'rgba(255,255,255,0.85)' }}>{punchOutTime ? `Punched Out: ${punchOutTime}` : ''}</Typography></Box>}
//                     </Paper>
//                 </Grid>

//                 {/* --- NEW CARDS SECTION --- */}
//                 <Grid item xs={12}>
//                     <Grid container spacing={3}>
//                         <Grid item xs={12} sm={4} md={2}><InfoCard title="Total Employee" value={"150"} icon={<GroupsIcon />} bgColor={secondaryColor} textColor="white" /></Grid>
//                         <Grid item xs={12} sm={4} md={2}><InfoCard title="Confirmation Pending" value={"5"} icon={<HourglassEmptyIcon />} bgColor={primaryColor} textColor="white" /></Grid>
//                         <Grid item xs={12} sm={4} md={2}><InfoCard title="Full & Final Pending" value={"2"} icon={<ReceiptLongIcon />} bgColor={secondaryColor} textColor="white" /></Grid>
//                         <Grid item xs={12} sm={4} md={2}><InfoCard title="Last Month New Joinee" value={"12"} icon={<PersonAddIcon />} bgColor={primaryColor} textColor="white" /></Grid>
//                         <Grid item xs={12} sm={4} md={2}><InfoCard title="Last Month Exits" value={"3"} icon={<PersonRemoveIcon />} bgColor={secondaryColor} textColor="white" /></Grid>
//                         <Grid item xs={12} sm={4} md={2}><InfoCard title="Employee Issues" value={"8"} icon={<ReportProblemIcon />} bgColor={primaryColor} textColor="white" /></Grid>
//                     </Grid>
//                 </Grid>

//                 <Grid item xs={12} lg={7}>
//                     <Grid container spacing={3}>
//                         {showPunchUI && <Grid item xs={12}><Paper sx={{ p: 1.5, display: "flex", justifyContent: "space-between", alignItems: "center", bgcolor: primaryColor, color: "white", borderRadius: "8px", border: '1px solid #6d1d60' }}><Button sx={{ color: "white" }} endIcon={<ArrowForwardIcon />} onClick={() => navigate('/hrms/dashboard/attendance')}>My Attendance</Button></Paper></Grid>}
//                         <Grid item xs={12} sm={6}><InfoCard title="My Awards" value={awardCount} icon={<AttachMoneyIcon />} bgColor={primaryColor} textColor="white" /></Grid>
//                         <Grid item xs={12} sm={6}><InfoCard title="Total Assets" value={assetCount} icon={<SpeedIcon />} bgColor={secondaryColor} textColor="white" /></Grid>
//                         <Grid item xs={12}><CardPaper><Typography variant="h6" gutterBottom>Ticket Priority</Typography><Box sx={{ display: "flex", alignItems: "center", mt: 2 }}><Box sx={{ width: 150, height: 150 }}><ResponsiveContainer><PieChart><Pie data={ticketData} cx="50%" cy="50%" innerRadius={40} outerRadius={60} dataKey="value" label={({ value, name }) => name === 'No Tickets' ? 'N/A' : `${value}%`} labelLine={false}>{ticketData.map((entry, index) => (<Cell key={`cell-${index}`} fill={TICKET_COLOR_MAP[entry.name]} />))}</Pie></PieChart></ResponsiveContainer></Box><Box sx={{ ml: 4 }}><StatusLegend items={ticketLegendItems} /></Box></Box></CardPaper></Grid>
//                     </Grid>
//                 </Grid>

//                 <Grid item xs={12} lg={5}>
//                     <Grid container spacing={3}>
//                         <Grid item xs={12} sm={6}><InfoCard title="My Leave" value={leaveCount} icon={<LabelIcon />} bgColor={secondaryColor} textColor="white" /></Grid>
//                         <Grid item xs={12} sm={6}><InfoCard title="Late Mark" value={lateMarkCount} icon={<MoreTimeIcon />} bgColor={primaryColor} textColor="white" /></Grid>
//                         <Grid item xs={12}><CardPaper><Typography variant="h6">My Payroll - Monthly Report</Typography><Box sx={{ display: "flex", gap: 4, my: 2 }}><Box><Typography variant="h5" sx={{ fontWeight: "bold" }}>₹0.00</Typography><Typography variant="body2" color="text.secondary">Total</Typography></Box><Box><Typography variant="h5" sx={{ fontWeight: "bold" }}>₹0.00</Typography><Typography variant="body2" color="text.secondary">This Month</Typography></Box></Box><Box sx={{ height: 250, width: "100%", mt: 2 }}><ResponsiveContainer><LineChart data={payrollChartData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}><CartesianGrid stroke="#e0e0e0" strokeDasharray="5 5" vertical={false} /><XAxis dataKey="name" tick={{ fontSize: 12, fill: '#666' }} axisLine={false} tickLine={false} /><YAxis domain={[0, 5]} ticks={[0.0, 1.0, 2.0, 3.0, 4.0, 5.0]} tickFormatter={(tick) => tick.toFixed(1)} tick={{ fontSize: 12, fill: '#666' }} axisLine={false} tickLine={false} /></LineChart></ResponsiveContainer></Box></CardPaper></Grid>
//                     </Grid>
//                 </Grid>
//             </Grid>
//         </Box>
//     )
// }











// import { useState, useEffect } from "react";
// import {
//   Box,
//   Typography,
//   Button,
//   Paper,
//   Grid,
//   useTheme,
//   Snackbar,
//   Alert,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogContentText,
//   DialogTitle,
//   CircularProgress,
//   IconButton,
// } from "@mui/material";
// import { styled } from "@mui/material/styles";
// import {
//   PieChart,
//   Pie,
//   Cell,
//   ResponsiveContainer,
//   LineChart,
//   XAxis,
//   YAxis,
//   CartesianGrid,
// } from "recharts";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import Swal from "sweetalert2";
// import { motion } from "framer-motion";

// // Icons
// import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
// import SpeedIcon from "@mui/icons-material/Speed";
// import LabelIcon from "@mui/icons-material/Label";
// import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
// import MoreTimeIcon from "@mui/icons-material/MoreTime";
// import HolidayVillageIcon from "@mui/icons-material/HolidayVillage";
// import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
// import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
// import PersonAddIcon from "@mui/icons-material/PersonAdd";
// import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
// import ReportProblemIcon from "@mui/icons-material/ReportProblem";
// import GroupsIcon from "@mui/icons-material/Groups";

// // --- HELPERS (unchanged logic, small cleanups) ---
// const getCurrentLocation = () =>
//   new Promise((resolve, reject) => {
//     if (!navigator.geolocation)
//       return reject(new Error("Geolocation is not supported."));
//     navigator.geolocation.getCurrentPosition(
//       (position) =>
//         resolve({
//           latitude: position.coords.latitude,
//           longitude: position.coords.longitude,
//         }),
//       () => reject(new Error("Unable to retrieve location. Please grant permission."))
//     );
//   });

// const formatApiTime = (timeString) => {
//   if (!timeString) return "";
//   const today = new Date();
//   const [hours, minutes, seconds] = timeString.split(":");
//   today.setHours(parseInt(hours || 0, 10), parseInt(minutes || 0, 10), parseInt(seconds || 0, 10) || 0);
//   if (isNaN(today.getTime())) return "";
//   return today.toLocaleString("en-IN", { timeZone: "Asia/Kolkata", hour: "numeric", minute: "numeric", hour12: true });
// };

// const getFormattedDateTimeForDisplay = () =>
//   new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata", hour: "numeric", minute: "numeric", hour12: true });

// const getISTDateTimeForAPI = () =>
//   new Date().toLocaleString("sv-SE", { timeZone: "Asia/Kolkata" });

// // --- Styling / small visual utilities ---
// const CardPaper = styled(Paper)(({ theme }) => ({
//   padding: theme.spacing(2),
//   display: "flex",
//   flexDirection: "column",
//   justifyContent: "space-between",
//   height: "100%",
//   borderRadius: 12,
//   boxShadow: "0 6px 18px rgba(12,20,30,0.06)",
//   border: "1px solid rgba(16,24,40,0.04)",
//   transition: "transform 200ms ease, box-shadow 200ms ease",
// }));

// // InfoCard accepts an icon node (React element) now
// const InfoCard = ({ title, value, icon, bgColor, textColor }) => {
//   const theme = useTheme();
//   return (
//     <motion.div whileHover={{ scale: 1.02 }} style={{ height: "100%" }}>
//       <CardPaper sx={{ backgroundColor: bgColor || theme.palette.background.paper }}>
//         <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 2 }}>
//           <Box sx={{ minWidth: 0 }}>
//             <Typography variant="subtitle2" sx={{ color: textColor || theme.palette.text.primary, opacity: 0.9 }}>
//               {title}
//             </Typography>
//             <Typography variant="h5" component="p" sx={{ fontWeight: 700, color: textColor || theme.palette.text.primary }}>
//               {value}
//             </Typography>
//           </Box>
//           <Box
//             sx={{
//               display: "grid",
//               placeItems: "center",
//               width: 48,
//               height: 48,
//               borderRadius: 2,
//               background: "rgba(255,255,255,0.08)",
//             }}
//           >
//             {icon}
//           </Box>
//         </Box>
//       </CardPaper>
//     </motion.div>
//   );
// };

// const StatusLegend = ({ items }) => (
//   <Box>
//     {items.map((item, index) => (
//       <Box key={index} sx={{ display: "flex", alignItems: "center", mb: 0.75 }}>
//         <Box sx={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: item.color, mr: 1.25 }} />
//         <Typography variant="body2" color="text.secondary">
//           {item.label}
//         </Typography>
//       </Box>
//     ))}
//   </Box>
// );

// // --- CONSTANTS ---
// const TICKET_COLOR_MAP = { Low: "#FFA726", Medium: "#FFB74D", High: "#FF7043", Critical: "#F44336", "No Tickets": "#E0E0E0" };
// const ticketLegendItems = [
//   { color: TICKET_COLOR_MAP.Low, label: "Low" },
//   { color: TICKET_COLOR_MAP.Medium, label: "Medium" },
//   { color: TICKET_COLOR_MAP.High, label: "High" },
//   { color: TICKET_COLOR_MAP.Critical, label: "Critical" },
// ];

// const payrollChartData = [
//   { name: "Jul 24", v: null },
//   { name: "Aug 24", v: null },
//   { name: "Sep 24", v: null },
//   { name: "Oct 24", v: null },
//   { name: "Nov 24", v: null },
//   { name: "Dec 24", v: null },
//   { name: "Jan 25", v: null },
//   { name: "Feb 25", v: null },
//   { name: "Mar 25", v: null },
//   { name: "Apr 25", v: null },
//   { name: "May 25", v: null },
//   { name: "Jun 25", v: null },
// ];

// // --- Animations (Framer Motion variants) ---
// const containerVariants = {
//   hidden: { opacity: 0, y: 6 },
//   show: { opacity: 1, y: 0, transition: { staggerChildren: 0.06 } },
// };
// const itemVariants = {
//   hidden: { opacity: 0, y: 8 },
//   show: { opacity: 1, y: 0, transition: { ease: "easeOut", duration: 0.34 } },
// };

// export default function Dashboard() {
//   const navigate = useNavigate();
//   const theme = useTheme();

//   // Colors (kept similar to your original choices, but exposed for easy change)
//   const primaryColor = "#8C257C";
//   const secondaryColor = "#F58E35";
//   const primaryButtonHover = "#6d1d60";

//   // State
//   const [userName, setUserName] = useState("");
//   const [loadingType, setLoadingType] = useState(null);
//   const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "info" });
//   const [dialog, setDialog] = useState({ open: false, type: null });
//   const [punchInTime, setPunchInTime] = useState(null);
//   const [punchOutTime, setPunchOutTime] = useState(null);
//   const [shiftInfo, setShiftInfo] = useState("My Shift: Loading...");
//   const [leaveCount, setLeaveCount] = useState(0);
//   const [lateMarkCount, setLateMarkCount] = useState(0);
//   const [awardCount, setAwardCount] = useState(0);
//   const [assetCount, setAssetCount] = useState(0);
//   const [ticketData, setTicketData] = useState([{ name: "No Tickets", value: 100 }]);
//   const [isHoliday, setIsHoliday] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   const [showPunchUI, setShowPunchUI] = useState(false);
//   const [isEmployeeConfirmed, setIsEmployeeConfirmed] = useState(false);
//   const [hasAcknowledgedPolicies, setHasAcknowledgedPolicies] = useState(false);

//   // Data fetching
//   useEffect(() => {
//     const accessToken = localStorage.getItem("accessToken");
//     const employeeId = localStorage.getItem("loggedInUser");
//     const loggedInEmpId = localStorage.getItem("loggedInEmpId");
//     if (!accessToken || !employeeId || !loggedInEmpId) {
//       setIsLoading(false);
//       return;
//     }

//     const headers = { Authorization: `Bearer ${accessToken}` };

//     axios
//       .get("https://tdtlworld.com/hrms-backend/api/dropdown/employee-role/", { headers })
//       .then((res) => setUserName(res.data.find((e) => String(e.id) === String(loggedInEmpId))?.employee_name || "User"))
//       .catch((err) => console.error("Failed to fetch user name:", err));

//     Promise.all([
//       axios.get(`https://tdtlworld.com/hrms-backend/EmpConfirmation/${employeeId}/`, { headers }),
//       axios.get(`https://tdtlworld.com/hrms-backend/policy_ack/${employeeId}/`, { headers }),
//       axios.get(`https://tdtlworld.com/hrms-backend/empdashboard/${employeeId}/`, { headers }),
//       axios.get(`https://tdtlworld.com/hrms-backend/api/dashboard_attendance/${employeeId}/`, { headers }),
//     ])
//       .then(([confRes, policyRes, dashRes, attendRes]) => {
//         const isPolicyOk = policyRes.data?.status === "Y";
//         setHasAcknowledgedPolicies(isPolicyOk);
//         setIsEmployeeConfirmed(confRes.data?.employee_confirm === "Y");
//         setShowPunchUI(isPolicyOk);

//         const dashData = dashRes.data || {};
//         setLeaveCount(dashData.leave_days_taken || 0);
//         setLateMarkCount(dashData.late_mark_count || 0);
//         setAwardCount(dashData.award_count || 0);
//         setAssetCount(dashData.asset_count || 0);

//         const { in_time, out_time } = dashData?.office_shift || {};
//         if (in_time === "Holiday") {
//           setShiftInfo("My Shift: Holiday");
//           setIsHoliday(true);
//         } else if (in_time && out_time) {
//           setShiftInfo(`My Shift: ${formatApiTime(in_time)} To ${formatApiTime(out_time)}`);
//           setIsHoliday(false);
//         } else {
//           setShiftInfo("My Shift: Not Assigned");
//           setIsHoliday(false);
//         }

//         if (dashData.support_tickets?.count > 0) {
//           const { data: tickets, count: total } = dashData.support_tickets;
//           const counts = tickets.reduce((acc, t) => ({ ...acc, [t.priority]: (acc[t.priority] || 0) + 1 }), {});
//           setTicketData(Object.entries(counts).map(([name, value]) => ({ name, value: parseFloat(((value / total) * 100).toFixed(1)) })));
//         }

//         const todayAttendance = attendRes.data.data?.[0];
//         if (todayAttendance) {
//           setPunchInTime(todayAttendance.clock_in ? formatApiTime(todayAttendance.clock_in) : null);
//           setPunchOutTime(todayAttendance.clock_out ? formatApiTime(todayAttendance.clock_out) : null);
//         }
//       })
//       .catch((err) => {
//         console.error("Dashboard data fetch failed:", err);
//         setSnackbar({ open: true, message: "Could not load dashboard information.", severity: "error" });
//         setShowPunchUI(false);
//       })
//       .finally(() => setIsLoading(false));
//   }, []);

//   useEffect(() => {
//     if (isLoading) return;
//     if (!hasAcknowledgedPolicies) {
//       Swal.fire({ title: "Action Required", text: "Acknowledge your policies to enable Punch In/Out.", icon: "warning" });
//       return;
//     }
//     if (!isEmployeeConfirmed) {
//       setSnackbar({ open: true, message: "Your employee confirmation is pending.", severity: "warning" });
//     }
//   }, [isLoading, hasAcknowledgedPolicies, isEmployeeConfirmed]);

//   const handleCloseSnackbar = (event, reason) => {
//     if (reason === "clickaway") return;
//     setSnackbar({ ...snackbar, open: false });
//   };
//   const handleCloseDialog = () => setDialog({ open: false, type: null });
//   const handlePunchClick = (punchType) => {
//     if (loadingType) return;
//     setDialog({ open: true, type: punchType });
//   };

//   const executePunch = async () => {
//     const punchType = dialog.type;
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
//     const employeeId = localStorage.getItem("loggedInUser");
//     if (!accessToken || !employeeId) {
//       setSnackbar({ open: true, message: "Authentication failed.", severity: "error" });
//       setLoadingType(null);
//       return;
//     }

//     const payload = { emp_id: employeeId, punch_time: getISTDateTimeForAPI(), punch_type: punchType, location: locationString };
//     try {
//       await axios.post("https://tdtlworld.com/hrms-backend/api/employee_attendance/", payload, {
//         headers: { Authorization: `Bearer ${accessToken}` },
//       });
//       const displayTime = getFormattedDateTimeForDisplay();
//       punchType === "IN" ? setPunchInTime(displayTime) : setPunchOutTime(displayTime);
//       if (punchType === "IN") setPunchOutTime(null);
//       setSnackbar({ open: true, message: `Successfully Punched ${punchType === "IN" ? "In" : "Out"}!`, severity: "success" });
//     } catch (error) {
//       setSnackbar({ open: true, message: error.response?.data?.error || "Punch failed.", severity: "error" });
//     } finally {
//       setLoadingType(null);
//     }
//   };

//   const isCurrentlyPunchedIn = !!punchInTime && !punchOutTime;

//   if (isLoading) {
//     return (
//       <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80vh", flexDirection: "column", gap: 2 }}>
//         <CircularProgress />
//         <Typography>Loading Dashboard...</Typography>
//       </Box>
//     );
//   }

//   // Cards config mapped for brevity
//   const cards = [
//     { title: "Total Employee", value: "150", icon: <GroupsIcon sx={{ color: "white" }} />, bgColor: secondaryColor, textColor: "white" },
//     { title: "Confirmation Pending", value: "5", icon: <HourglassEmptyIcon sx={{ color: "white" }} />, bgColor: primaryColor, textColor: "white" },
//     { title: "Full & Final Pending", value: "2", icon: <ReceiptLongIcon sx={{ color: "white" }} />, bgColor: secondaryColor, textColor: "white" },
//     { title: "Last Month New Joinee", value: "12", icon: <PersonAddIcon sx={{ color: "white" }} />, bgColor: primaryColor, textColor: "white" },
//     { title: "Last Month Exits", value: "3", icon: <PersonRemoveIcon sx={{ color: "white" }} />, bgColor: secondaryColor, textColor: "white" },
//     { title: "Employee Issues", value: "8", icon: <ReportProblemIcon sx={{ color: "white" }} />, bgColor: primaryColor, textColor: "white" },
//   ];

//   return (
//     <Box p={3}>
//       <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4, gap: 2, flexWrap: "wrap" }}>
//         <Box>
//           <Typography variant="h4" sx={{ fontWeight: 800, color: primaryColor }}>
//             HR Dashboard
//           </Typography>
          
//         </Box>

//         <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
//           <IconButton
//             onClick={() => navigate("/hrms/dashboard/attendance")}
//             sx={{
//               background: `linear-gradient(90deg, ${primaryColor}, ${secondaryColor})`,
//               color: "white",
//               "&:hover": { background: `linear-gradient(90deg, ${primaryButtonHover}, ${secondaryColor})`, transform: "translateY(-2px)" },
//               boxShadow: "0 6px 18px rgba(140,37,124,0.12)",
//             }}
//           >
//             <ArrowForwardIcon />
//           </IconButton>
//         </Box>
//       </Box>

//       <Snackbar open={snackbar.open} autoHideDuration={5000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
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
//           <Button onClick={handleCloseDialog}>Cancel</Button>
//           <Button onClick={executePunch} variant="contained" autoFocus sx={{ backgroundColor: primaryColor, "&:hover": { backgroundColor: primaryButtonHover } }}>
//             {loadingType ? <CircularProgress size={20} color="inherit" /> : "Confirm"}
//           </Button>
//         </DialogActions>
//       </Dialog>

//       <Grid container spacing={3} component={motion.div} variants={containerVariants} initial="hidden" animate="show">
//         <Grid item xs={12}>
//           <Paper
//             component={motion.div}
//             variants={itemVariants}
//             sx={{
//               p: 2,
//               borderRadius: 3,
//               border: "1px solid rgba(16,24,40,0.04)",
//               background: `linear-gradient(90deg, ${primaryColor}, ${secondaryColor})`,
//               color: "white",
//             }}
//           >
//             <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 2 }}>
//               <Box>
//                 <Typography variant="h6" sx={{ fontWeight: 800 }}>
//                   Welcome {userName}
//                 </Typography>
//                 <Typography variant="body2" sx={{ opacity: 0.95 }}>
//                   {shiftInfo}
//                 </Typography>
//               </Box>

//               {showPunchUI && (isHoliday ? (
//                 <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//                   <HolidayVillageIcon sx={{ color: "white" }} />
//                   <Typography variant="h6" sx={{ color: "white", fontWeight: 700 }}>
//                     Holiday
//                   </Typography>
//                 </Box>
//               ) : (
//                 <Box sx={{ display: "flex", gap: 1 }}>
//                   <Button
//                     variant="contained"
//                     onClick={() => handlePunchClick("IN")}
//                     disabled={loadingType !== null || isCurrentlyPunchedIn}
//                     sx={{
//                       backgroundColor: "rgba(255,255,255,0.95)",
//                       color: primaryColor,
//                       px: 2,
//                       "&:hover": { backgroundColor: "white", transform: "translateY(-2px)" },
//                     }}
//                   >
//                     {loadingType === "IN" ? <CircularProgress size={20} color="inherit" /> : "Punch In"}
//                   </Button>

//                   <Button
//                     variant="contained"
//                     onClick={() => handlePunchClick("OUT")}
//                     disabled={loadingType !== null || !isCurrentlyPunchedIn}
//                     sx={{
//                       backgroundColor: "rgba(255,255,255,0.95)",
//                       color: primaryColor,
//                       px: 2,
//                       "&:hover": { backgroundColor: "white", transform: "translateY(-2px)" },
//                     }}
//                   >
//                     {loadingType === "OUT" ? <CircularProgress size={20} color="inherit" /> : "Punch Out"}
//                   </Button>
//                 </Box>
//               ))}
//             </Box>

//             {showPunchUI && (
//               <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 2, borderTop: "1px solid rgba(255,255,255,0.14)", pt: 2 }}>
//                 <Typography variant="body2" sx={{ fontWeight: 600 }}>
//                   {punchInTime ? `Punched In: ${punchInTime}` : "Not punched in today"}
//                 </Typography>
//                 <Typography variant="body2" sx={{ fontWeight: 600 }}>
//                   {punchOutTime ? `Punched Out: ${punchOutTime}` : ""}
//                 </Typography>
//               </Box>
//             )}
//           </Paper>
//         </Grid>

//         {/* NEW CARDS */}
//         <Grid item xs={12}>
//           <Grid container spacing={2}>
//             {cards.map((c, i) => (
//               <Grid item xs={12} sm={6} md={4} lg={2} key={i}>
//                 <motion.div variants={itemVariants}>
//                   <InfoCard title={c.title} value={c.value} icon={c.icon} bgColor={c.bgColor} textColor={c.textColor} />
//                 </motion.div>
//               </Grid>
//             ))}
//           </Grid>
//         </Grid>

//         <Grid item xs={12} lg={7}>
//           <Grid container spacing={2}>
//             {showPunchUI && (
//               <Grid item xs={12}>
//                 <motion.div variants={itemVariants}>
//                   <Paper sx={{ p: 1.25, display: "flex", justifyContent: "space-between", alignItems: "center", bgcolor: primaryColor, color: "white", borderRadius: 2 }}>
//                     <Button sx={{ color: "white" }} endIcon={<ArrowForwardIcon />} onClick={() => navigate("/hrms/dashboard/attendance")}>
//                       My Attendance
//                     </Button>
//                   </Paper>
//                 </motion.div>
//               </Grid>
//             )}

//             <Grid item xs={12} sm={6}>
//               <motion.div variants={itemVariants}>
//                 <InfoCard title="My Awards" value={awardCount} icon={<AttachMoneyIcon sx={{ color: "white" }} />} bgColor={primaryColor} textColor="white" />
//               </motion.div>
//             </Grid>

//             <Grid item xs={12} sm={6}>
//               <motion.div variants={itemVariants}>
//                 <InfoCard title="Total Assets" value={assetCount} icon={<SpeedIcon sx={{ color: "white" }} />} bgColor={secondaryColor} textColor="white" />
//               </motion.div>
//             </Grid>

//             <Grid item xs={12}>
//               <motion.div variants={itemVariants}>
//                 <CardPaper>
//                   <Typography variant="h6" gutterBottom>
//                     Ticket Priority
//                   </Typography>
//                   <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
//                     <Box sx={{ width: 150, height: 150 }}>
//                       <ResponsiveContainer>
//                         <PieChart>
//                           <Pie data={ticketData} cx="50%" cy="50%" innerRadius={38} outerRadius={60} dataKey="value" labelLine={false}>
//                             {ticketData.map((entry, index) => (
//                               <Cell key={`cell-${index}`} fill={TICKET_COLOR_MAP[entry.name] || "#BDBDBD"} />
//                             ))}
//                           </Pie>
//                         </PieChart>
//                       </ResponsiveContainer>
//                     </Box>

//                     <Box sx={{ ml: 1 }}>
//                       <StatusLegend items={ticketLegendItems} />
//                     </Box>
//                   </Box>
//                 </CardPaper>
//               </motion.div>
//             </Grid>
//           </Grid>
//         </Grid>

//         <Grid item xs={12} lg={5}>
//           <Grid container spacing={2}>
//             <Grid item xs={12} sm={6}>
//               <motion.div variants={itemVariants}>
//                 <InfoCard title="My Leave" value={leaveCount} icon={<LabelIcon sx={{ color: "white" }} />} bgColor={secondaryColor} textColor="white" />
//               </motion.div>
//             </Grid>

//             <Grid item xs={12} sm={6}>
//               <motion.div variants={itemVariants}>
//                 <InfoCard title="Late Mark" value={lateMarkCount} icon={<MoreTimeIcon sx={{ color: "white" }} />} bgColor={primaryColor} textColor="white" />
//               </motion.div>
//             </Grid>

//             <Grid item xs={12}>
//               <motion.div variants={itemVariants}>
//                 <CardPaper>
//                   <Typography variant="h6">My Payroll - Monthly Report</Typography>

//                   <Box sx={{ display: "flex", gap: 4, my: 2 }}>
//                     <Box>
//                       <Typography variant="h6" sx={{ fontWeight: 700 }}>
//                         ₹0.00
//                       </Typography>
//                       <Typography variant="body2" color="text.secondary">
//                         Total
//                       </Typography>
//                     </Box>

//                     <Box>
//                       <Typography variant="h6" sx={{ fontWeight: 700 }}>
//                         ₹0.00
//                       </Typography>
//                       <Typography variant="body2" color="text.secondary">
//                         This Month
//                       </Typography>
//                     </Box>
//                   </Box>

//                   <Box sx={{ height: 240, width: "100%", mt: 2 }}>
//                     <ResponsiveContainer>
//                       <LineChart data={payrollChartData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
//                         <CartesianGrid stroke="#f0f0f0" strokeDasharray="5 5" vertical={false} />
//                         <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#666" }} axisLine={false} tickLine={false} />
//                         <YAxis domain={[0, 5]} ticks={[0.0, 1.0, 2.0, 3.0, 4.0, 5.0]} tickFormatter={(tick) => tick.toFixed(1)} tick={{ fontSize: 12, fill: "#666" }} axisLine={false} tickLine={false} />
//                         {/* No explicit <Line /> to keep it lightweight as original had nulls */}
//                       </LineChart>
//                     </ResponsiveContainer>
//                   </Box>
//                 </CardPaper>
//               </motion.div>
//             </Grid>
//           </Grid>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// }







// import { useState, useEffect } from "react";
// import {
//     Box, Typography, Button, Paper, Grid, useTheme, Icon,
//     Snackbar, Alert, Dialog, DialogActions, DialogContent,
//     DialogContentText, DialogTitle, CircularProgress,
// } from "@mui/material";
// import { styled } from "@mui/material/styles";
// import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, XAxis, YAxis, CartesianGrid } from "recharts";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import Swal from 'sweetalert2';
 
// // Icons
// import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
// import SpeedIcon from "@mui/icons-material/Speed";
// import LabelIcon from "@mui/icons-material/Label";
// import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
// import MoreTimeIcon from '@mui/icons-material/MoreTime';
// import HolidayVillageIcon from '@mui/icons-material/HolidayVillage';
// // Icons for New Cards
// import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
// import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
// import PersonAddIcon from '@mui/icons-material/PersonAdd';
// import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
// import ReportProblemIcon from '@mui/icons-material/ReportProblem';
// import GroupsIcon from '@mui/icons-material/Groups';
 
// // --- HELPER FUNCTIONS (UNCHANGED) ---
// const getCurrentLocation = () => new Promise((resolve, reject) => { if (!navigator.geolocation) return reject(new Error("Geolocation is not supported.")); navigator.geolocation.getCurrentPosition((position) => resolve({ latitude: position.coords.latitude, longitude: position.coords.longitude }), () => reject(new Error("Unable to retrieve location. Please grant permission."))); });
// const formatApiTime = (timeString) => { if (!timeString) return ''; const today = new Date(); const [hours, minutes, seconds] = timeString.split(':'); today.setHours(parseInt(hours, 10), parseInt(minutes, 10), parseInt(seconds, 10) || 0); if (isNaN(today.getTime())) return ''; return today.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', hour: 'numeric', minute: 'numeric', hour12: true }); };
// const getFormattedDateTimeForDisplay = () => new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', hour: 'numeric', minute: 'numeric', hour12: true });
// const getISTDateTimeForAPI = () => new Date().toLocaleString('sv-SE', { timeZone: 'Asia/Kolkata' });
 
// // --- STYLED COMPONENTS (UNCHANGED) ---
// const CardPaper = styled(Paper)(({ theme }) => ({
//     padding: theme.spacing(2),
//     display: "flex",
//     flexDirection: "column",
//     justifyContent: "space-between",
//     height: "100%",
//     borderRadius: "8px",
//     boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
//     border: '1px solid #e0e0e0',
// }));
// const InfoCard = ({ title, value, icon, bgColor, textColor }) => { const theme = useTheme(); return (<CardPaper sx={{ backgroundColor: bgColor || theme.palette.background.paper }}><Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><Box><Typography variant="subtitle1" sx={{ color: textColor || theme.palette.text.primary }}>{title}</Typography><Typography variant="h4" component="p" sx={{ fontWeight: "bold", color: textColor || theme.palette.text.primary }}>{value}</Typography></Box><Icon sx={{ fontSize: 32, color: textColor || "primary" }}>{icon}</Icon></Box></CardPaper>); };
// const StatusLegend = ({ items }) => (<Box>{items.map((item, index) => (<Box key={index} sx={{ display: "flex", alignItems: "center", mb: 0.5 }}><Box sx={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: item.color, mr: 1 }} /><Typography variant="body2" color="text.secondary">{item.label}</Typography></Box>))}</Box>);
 
// // --- CONSTANTS (UNCHANGED) ---
// const TICKET_COLOR_MAP = { "Low": "#FFA726", "Medium": "#FFB74D", "High": "#FF7043", "Critical": "#FFEE58", "No Tickets": "#E0E0E0" };
// const ticketLegendItems = [{ color: TICKET_COLOR_MAP.Low, label: "Low" }, { color: TICKET_COLOR_MAP.Medium, label: "Medium" }, { color: TICKET_COLOR_MAP.High, label: "High" }, { color: TICKET_COLOR_MAP.Critical, label: "Critical" }];
// const payrollChartData = [{ name: "Jul 24", v: null }, { name: "Aug 24", v: null }, { name: "Sep 24", v: null }, { name: "Oct 24", v: null }, { name: "Nov 24", v: null }, { name: "Dec 24", v: null }, { name: "Jan 25", v: null }, { name: "Feb 25", v: null }, { name: "Mar 25", v: null }, { name: "Apr 25", v: null }, { name: "May 25", v: null }, { name: "Jun 25", v: null }];
 
// // --- NEW: THEME CONSTANTS FOR ANIMATION AND GRADIENT ---
// const modernTheme = {
//   primary: "#8C257C",
//   secondary: "#F58E35",
//   gradient: "linear-gradient(135deg, #F58E35 0%, #8C257C 100%)",
//   cardShadow: "0 10px 30px rgba(0,0,0,0.07)",
// };
 
// export default function Dashboard() {
//     // --- THEME AND NAVIGATION HOOKS (UPDATED) ---
//     const navigate = useNavigate();
//     const primaryButtonHover = "#6d1d60";
 
//     // --- STATE MANAGEMENT (UNCHANGED) ---
//     const [userName, setUserName] = useState("");
//     const [loadingType, setLoadingType] = useState(null);
//     const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "info" });
//     const [dialog, setDialog] = useState({ open: false, type: null });
//     const [punchInTime, setPunchInTime] = useState(null);
//     const [punchOutTime, setPunchOutTime] = useState(null);
//     const [shiftInfo, setShiftInfo] = useState("My Shift: Loading...");
//     const [leaveCount, setLeaveCount] = useState(0);
//     const [lateMarkCount, setLateMarkCount] = useState(0);
//     const [awardCount, setAwardCount] = useState(0);
//     const [assetCount, setAssetCount] = useState(0);
//     const [ticketData, setTicketData] = useState([{ name: 'No Tickets', value: 100 }]);
//     const [isHoliday, setIsHoliday] = useState(false);
//     const [isLoading, setIsLoading] = useState(true);
//     const [showPunchUI, setShowPunchUI] = useState(false);
//     const [isEmployeeConfirmed, setIsEmployeeConfirmed] = useState(false);
//     const [hasAcknowledgedPolicies, setHasAcknowledgedPolicies] = useState(false);
 
//     // --- DATA FETCHING AND LOGIC (UNCHANGED) ---
//     useEffect(() => {
//         const accessToken = localStorage.getItem("accessToken");
//         const employeeId = localStorage.getItem("loggedInUser");
//         const loggedInEmpId = localStorage.getItem("loggedInEmpId");
//         if (!accessToken || !employeeId || !loggedInEmpId) { setIsLoading(false); return; }
 
//         const headers = { Authorization: `Bearer ${accessToken}` };
//         axios.get("https://tdtlworld.com/hrms-backend/api/dropdown/employee-role/", { headers })
//             .then(res => setUserName(res.data.find(e => String(e.id) === String(loggedInEmpId))?.employee_name || "User"))
//             .catch(err => console.error("Failed to fetch user name:", err));
 
//         Promise.all([
//             axios.get(`https://tdtlworld.com/hrms-backend/EmpConfirmation/${employeeId}/`, { headers }),
//             axios.get(`https://tdtlworld.com/hrms-backend/policy_ack/${employeeId}/`, { headers }),
//             axios.get(`https://tdtlworld.com/hrms-backend/empdashboard/${employeeId}/`, { headers }),
//             axios.get(`https://tdtlworld.com/hrms-backend/api/dashboard_attendance/${employeeId}/`, { headers }),
//         ]).then(([confRes, policyRes, dashRes, attendRes]) => {
//             const isPolicyOk = policyRes.data?.status === 'Y';
//             setHasAcknowledgedPolicies(isPolicyOk);
//             setIsEmployeeConfirmed(confRes.data?.employee_confirm === 'Y');
//             setShowPunchUI(isPolicyOk);
 
//             const dashData = dashRes.data;
//             setLeaveCount(dashData.leave_days_taken || 0);
//             setLateMarkCount(dashData.late_mark_count || 0);
//             setAwardCount(dashData.award_count || 0);
//             setAssetCount(dashData.asset_count || 0);
 
//             const { in_time, out_time } = dashData?.office_shift || {};
//             if (in_time === "Holiday") {
//                 setShiftInfo("My Shift: Holiday"); setIsHoliday(true);
//             } else if (in_time && out_time) {
//                 setShiftInfo(`My Shift: ${formatApiTime(in_time)} To ${formatApiTime(out_time)}`); setIsHoliday(false);
//             } else {
//                 setShiftInfo("My Shift: Not Assigned"); setIsHoliday(false);
//             }
 
//             if (dashData.support_tickets?.count > 0) {
//                 const { data: tickets, count: total } = dashData.support_tickets;
//                 const counts = tickets.reduce((acc, t) => ({ ...acc, [t.priority]: (acc[t.priority] || 0) + 1 }), {});
//                 setTicketData(Object.entries(counts).map(([name, value]) => ({ name, value: parseFloat(((value / total) * 100).toFixed(1)) })));
//             }
 
//             const todayAttendance = attendRes.data.data?.[0];
//             if (todayAttendance) {
//                 setPunchInTime(todayAttendance.clock_in ? formatApiTime(todayAttendance.clock_in) : null);
//                 setPunchOutTime(todayAttendance.clock_out ? formatApiTime(todayAttendance.clock_out) : null);
//             }
//         }).catch(err => {
//             console.error("Dashboard data fetch failed:", err);
//             setSnackbar({ open: true, message: "Could not load dashboard information.", severity: "error" });
//             setShowPunchUI(false);
//         }).finally(() => setIsLoading(false));
//     }, []);
 
//     useEffect(() => {
//         if (isLoading) return;
//         if (!hasAcknowledgedPolicies) { Swal.fire({ title: 'Action Required', text: "Acknowledge your policies to enable Punch In/Out.", icon: 'warning' }); return; }
//         if (!isEmployeeConfirmed) { setSnackbar({ open: true, message: "Your employee confirmation is pending.", severity: "warning" }); }
//     }, [isLoading, hasAcknowledgedPolicies, isEmployeeConfirmed]);
 
//     const handleCloseSnackbar = (event, reason) => { if (reason === 'clickaway') return; setSnackbar({ ...snackbar, open: false }); };
//     const handleCloseDialog = () => setDialog({ open: false, type: null });
//     const handlePunchClick = (punchType) => { if (loadingType) return; setDialog({ open: true, type: punchType }); };
 
//     const executePunch = async () => {
//         const punchType = dialog.type;
//         handleCloseDialog(); setLoadingType(punchType);
//         let locationString = "Location not available";
//         try { const { latitude, longitude } = await getCurrentLocation(); locationString = `Lat: ${latitude.toFixed(5)}, Lon: ${longitude.toFixed(5)}`; } catch (error) { setSnackbar({ open: true, message: error.message, severity: "warning" }); }
 
//         const accessToken = localStorage.getItem("accessToken");
//         const employeeId = localStorage.getItem("loggedInUser");
//         if (!accessToken || !employeeId) { setSnackbar({ open: true, message: "Authentication failed.", severity: "error" }); setLoadingType(null); return; }
 
//         const payload = { emp_id: employeeId, punch_time: getISTDateTimeForAPI(), punch_type: punchType, location: locationString };
//         try {
//             await axios.post("https://tdtlworld.com/hrms-backend/api/employee_attendance/", payload, { headers: { Authorization: `Bearer ${accessToken}` } });
//             const displayTime = getFormattedDateTimeForDisplay();
//             punchType === "IN" ? setPunchInTime(displayTime) : setPunchOutTime(displayTime);
//             if(punchType === "IN") setPunchOutTime(null);
//             setSnackbar({ open: true, message: `Successfully Punched ${punchType === 'IN' ? 'In' : 'Out'}!`, severity: "success" });
//         } catch (error) {
//             setSnackbar({ open: true, message: error.response?.data?.error || "Punch failed.", severity: "error" });
//         } finally {
//             setLoadingType(null);
//         }
//     };
 
//     const isCurrentlyPunchedIn = !!punchInTime && !punchOutTime;
 
//     if (isLoading) {
//         return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}><CircularProgress /><Typography sx={{ ml: 2 }}>Loading Dashboard...</Typography></Box>;
//     }
 
//     return (
//         <Box p={2}>
           
 
//             <Snackbar open={snackbar.open} autoHideDuration={5000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}><Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }} variant="filled">{snackbar.message}</Alert></Snackbar>
//             <Dialog open={dialog.open} onClose={handleCloseDialog}><DialogTitle>{`Confirm Punch ${dialog.type === 'IN' ? 'In' : 'Out'}`}</DialogTitle><DialogContent><DialogContentText>Are you sure you want to punch {dialog.type === 'IN' ? 'in' : 'out'}?</DialogContentText></DialogContent><DialogActions><Button onClick={handleCloseDialog}>Cancel</Button><Button onClick={executePunch} variant="contained" autoFocus sx={{ backgroundColor: modernTheme.primary, '&:hover': { backgroundColor: primaryButtonHover } }}>Confirm</Button></DialogActions></Dialog>
 
//             <Grid container spacing={3}>
//                 {/* --- UPDATED WELCOME CARD WITH SPACING --- */}
//                 <Grid item xs={12}>
//                     <Paper
//                         elevation={0}
//                         sx={{
//                             background: modernTheme.gradient,
//                             borderRadius: '16px',
//                             p: 1,
//                             paddingLeft:1,
//                             color: 'white',
//                             boxShadow: modernTheme.cardShadow,
//                         }}
//                     >
//                          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2, flexWrap: 'wrap', gap: 2, padding:1 }}>
                         
//                             <Box>
//                               <Typography variant="h4" fontWeight="bold" mb={1}>
//                                 HR Dashboard
//                               </Typography>
//                               <Typography variant="h7" sx={{color: 'white'}} mb={1}>
//                                 Welcome, {userName}
//                               </Typography>
//                               <Typography variant="body2" sx={{color: 'rgba(255,255,255,0.85)', mt: 0.5}}>
//                                 {shiftInfo}
//                               </Typography>
//                             </Box>
//                             {showPunchUI && (isHoliday ?
//                                 <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                                     <HolidayVillageIcon sx={{ color: 'white' }} />
//                                     <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold' }}>Holiday</Typography>
//                                 </Box> :
//                                 <Box sx={{ display: "flex", gap: 2 }}>
//                                     <Button variant="contained" onClick={() => handlePunchClick("IN")} disabled={loadingType !== null || isCurrentlyPunchedIn} sx={{ backgroundColor: 'rgba(255,255,255,0.9)', color: modernTheme.primary, '&:hover': { backgroundColor: 'white' } }}>
//                                         {loadingType === 'IN' ? <CircularProgress size={24} color="inherit" /> : "Punch In"}
//                                     </Button>
//                                     <Button variant="contained" onClick={() => handlePunchClick("OUT")} disabled={loadingType !== null || !isCurrentlyPunchedIn} sx={{ backgroundColor: 'rgba(255,255,255,0.9)', color: modernTheme.primary, '&:hover': { backgroundColor: 'white' } }}>
//                                         {loadingType === 'OUT' ? <CircularProgress size={24} color="inherit" /> : "Punch Out"}
//                                     </Button>
//                                 </Box>
//                             )}
//                         </Box>
//                         {showPunchUI && <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2, px: 1, borderTop: '1px solid rgba(255,255,255,0.3)', pt: 2, minHeight: '24px', flexWrap: 'wrap', gap: 1 }}>
//                             <Typography variant="body2" sx={{ fontWeight: 500, color: 'rgba(255,255,255,0.85)' }}>
//                                 {punchInTime ? `Punched In: ${punchInTime}` : 'Not punched in today'}
//                             </Typography>
//                             <Typography variant="body2" sx={{ fontWeight: 500, color: 'rgba(255,255,255,0.85)' }}>
//                                 {punchOutTime ? `Punched Out: ${punchOutTime}` : ''}
//                             </Typography>
//                         </Box>}
//                     </Paper>
//                 </Grid>
 
//                 {/* --- NEW CARDS SECTION (UNCHANGED) --- */}
//                 <Grid item xs={12}>
//                     <Grid container spacing={3}>
//                         <Grid item xs={12} sm={4} md={2}><InfoCard title="Total Employee" value={"150"} icon={<GroupsIcon />} bgColor={modernTheme.secondary} textColor="white" /></Grid>
//                         <Grid item xs={12} sm={4} md={2}><InfoCard title="Confirmation Pending" value={"5"} icon={<HourglassEmptyIcon />} bgColor={modernTheme.primary} textColor="white" /></Grid>
//                         <Grid item xs={12} sm={4} md={2}><InfoCard title="Full & Final Pending" value={"2"} icon={<ReceiptLongIcon />} bgColor={modernTheme.secondary} textColor="white" /></Grid>
//                         <Grid item xs={12} sm={4} md={2}><InfoCard title="Last Month New Joinee" value={"12"} icon={<PersonAddIcon />} bgColor={modernTheme.primary} textColor="white" /></Grid>
//                         <Grid item xs={12} sm={4} md={2}><InfoCard title="Last Month Exits" value={"3"} icon={<PersonRemoveIcon />} bgColor={modernTheme.secondary} textColor="white" /></Grid>
//                         <Grid item xs={12} sm={4} md={2}><InfoCard title="Employee Issues" value={"8"} icon={<ReportProblemIcon />} bgColor={modernTheme.primary} textColor="white" /></Grid>
//                     </Grid>
//                 </Grid>
 
//                 <Grid item xs={12} lg={7}>
//                     <Grid container spacing={3}>
//                         {showPunchUI && <Grid item xs={12}><Paper sx={{ p: 1.5, display: "flex", justifyContent: "space-between", alignItems: "center", bgcolor: modernTheme.primary, color: "white", borderRadius: "8px", border: '1px solid #6d1d60' }}><Button sx={{ color: "white" }} endIcon={<ArrowForwardIcon />} onClick={() => navigate('/hrms/dashboard/attendance')}>My Attendance</Button></Paper></Grid>}
//                         <Grid item xs={12} sm={6}><InfoCard title="My Awards" value={awardCount} icon={<AttachMoneyIcon />} bgColor={modernTheme.primary} textColor="white" /></Grid>
//                         <Grid item xs={12} sm={6}><InfoCard title="Total Assets" value={assetCount} icon={<SpeedIcon />} bgColor={modernTheme.secondary} textColor="white" /></Grid>
//                         <Grid item xs={12}><CardPaper><Typography variant="h6" gutterBottom>Ticket Priority</Typography><Box sx={{ display: "flex", alignItems: "center", mt: 2 }}><Box sx={{ width: 150, height: 150 }}><ResponsiveContainer><PieChart><Pie data={ticketData} cx="50%" cy="50%" innerRadius={40} outerRadius={60} dataKey="value" label={({ value, name }) => name === 'No Tickets' ? 'N/A' : `${value}%`} labelLine={false}>{ticketData.map((entry, index) => (<Cell key={`cell-${index}`} fill={TICKET_COLOR_MAP[entry.name]} />))}</Pie></PieChart></ResponsiveContainer></Box><Box sx={{ ml: 4 }}><StatusLegend items={ticketLegendItems} /></Box></Box></CardPaper></Grid>
//                     </Grid>
//                 </Grid>
 
//                 <Grid item xs={12} lg={5}>
//                     <Grid container spacing={3}>
//                         <Grid item xs={12} sm={6}><InfoCard title="My Leave" value={leaveCount} icon={<LabelIcon />} bgColor={modernTheme.secondary} textColor="white" /></Grid>
//                         <Grid item xs={12} sm={6}><InfoCard title="Late Mark" value={lateMarkCount} icon={<MoreTimeIcon />} bgColor={modernTheme.primary} textColor="white" /></Grid>
//                         <Grid item xs={12}><CardPaper><Typography variant="h6">My Payroll - Monthly Report</Typography><Box sx={{ display: "flex", gap: 4, my: 2 }}><Box><Typography variant="h5" sx={{ fontWeight: "bold" }}>₹0.00</Typography><Typography variant="body2" color="text.secondary">Total</Typography></Box><Box><Typography variant="h5" sx={{ fontWeight: "bold" }}>₹0.00</Typography><Typography variant="body2" color="text.secondary">This Month</Typography></Box></Box><Box sx={{ height: 250, width: "100%", mt: 2 }}><ResponsiveContainer><LineChart data={payrollChartData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}><CartesianGrid stroke="#e0e0e0" strokeDasharray="5 5" vertical={false} /><XAxis dataKey="name" tick={{ fontSize: 12, fill: '#666' }} axisLine={false} tickLine={false} /><YAxis domain={[0, 5]} ticks={[0.0, 1.0, 2.0, 3.0, 4.0, 5.0]} tickFormatter={(tick) => tick.toFixed(1)} tick={{ fontSize: 12, fill: '#666' }} axisLine={false} tickLine={false} /></LineChart></ResponsiveContainer></Box></CardPaper></Grid>
//                     </Grid>
//                 </Grid>
//             </Grid>
//         </Box>
//     )
// }










// import React, { useState, useEffect } from "react";
// import {
//     Box, Typography, Button, Paper, Grid, useTheme, Icon,
//     Snackbar, Alert, Dialog, DialogActions, DialogContent,
//     DialogContentText, DialogTitle, CircularProgress, Card, CardContent, Avatar, Zoom, Divider
// } from "@mui/material";
// import { styled } from "@mui/material/styles";
// import {
//     PieChart, Pie, Cell, ResponsiveContainer, CartesianGrid, Legend, Sector,
//     AreaChart, Area, XAxis, YAxis, Tooltip
// } from "recharts";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import Swal from 'sweetalert2';
 
// import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
// import SpeedIcon from "@mui/icons-material/Speed";
// import LabelIcon from "@mui/icons-material/Label";
// import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
// import MoreTimeIcon from '@mui/icons-material/MoreTime';
// import HolidayVillageIcon from '@mui/icons-material/HolidayVillage';
// import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
// import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
// import PersonAddIcon from '@mui/icons-material/PersonAdd';
// import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
// import ReportProblemIcon from '@mui/icons-material/ReportProblem';
// import GroupsIcon from '@mui/icons-material/Groups';
// import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
// import DevicesIcon from '@mui/icons-material/Devices';
 
// const getCurrentLocation = () => new Promise((resolve, reject) => { if (!navigator.geolocation) return reject(new Error("Geolocation is not supported.")); navigator.geolocation.getCurrentPosition((position) => resolve({ latitude: position.coords.latitude, longitude: position.coords.longitude }), () => reject(new Error("Unable to retrieve location. Please grant permission."))); });
// const formatApiTime = (timeString) => { if (!timeString) return ''; const today = new Date(); const [hours, minutes, seconds] = timeString.split(':'); today.setHours(parseInt(hours, 10), parseInt(minutes, 10), parseInt(seconds, 10) || 0); if (isNaN(today.getTime())) return ''; return today.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', hour: 'numeric', minute: 'numeric', hour12: true }); };
// const getFormattedDateTimeForDisplay = () => new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', hour: 'numeric', minute: 'numeric', hour12: true });
// const getISTDateTimeForAPI = () => new Date().toLocaleString('sv-SE', { timeZone: 'Asia/Kolkata' });
 
// const CardPaper = styled(Paper)(({ theme }) => ({
//     padding: theme.spacing(2),
//     display: "flex",
//     flexDirection: "column",
//     justifyContent: "space-between",
//     height: "100%",
//     borderRadius: "8px",
//     boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
//     border: '1px solid #e0e0e0',
// }));
 
// const modernTheme = {
//   primary: "#8C257C",
//   secondary: "#F58E35",
//   originalPurple: "#8C257C",
//   originalOrange: "#F58E35",
//   gradient: "linear-gradient(135deg, #F58E35 0%, #8C257C 100%)",
//   cardShadow: "0 10px 30px rgba(0,0,0,0.07)",
// };
 
// const TICKET_PRIORITY_COLORS = {
//     "Critical": "#8C257C",
//     "High": "#B74E9A",
//     "Medium": "#F58E35",
//     "Low": "#F8B26A",
//     "No Tickets": "#E0E0E0"
// };
 
// const payrollChartData = [{ name: "Jul", value: 2400 }, { name: "Aug", value: 2210 }, { name: "Sep", value: 2290 }, { name: "Oct", value: 2000 }, { name: "Nov", value: 2181 }, { name: "Dec", value: 2500 }, { name: "Jan", value: 2100 }];
 
// const InfoCard = React.forwardRef(({ title, value, icon }, ref) => {
//     const theme = useTheme();
//     return (
//         <Card ref={ref} elevation={0} sx={{ position: 'relative', p: '2px', height: '100%', borderRadius: '16px', background: 'transparent', overflow: 'hidden', transition: 'transform 0.3s ease-in-out', boxShadow: 'none', '&:hover': { transform: 'translateY(-8px)' }, '@keyframes shimmer-spin': { '0%': { transform: 'translate(-50%, -50%) rotate(0deg)' }, '100%': { transform: 'translate(-50%, -50%) rotate(360deg)' } }, '&::before': { content: '""', position: 'absolute', top: '50%', left: '50%', width: '200%', height: '200%', zIndex: 1, background: `conic-gradient(from 180deg at 50% 50%, ${modernTheme.originalOrange} 0%, ${modernTheme.originalPurple} 50%, ${modernTheme.originalOrange} 100%)`, transform: 'translate(-50%, -50%)', animation: 'shimmer-spin 4s linear infinite' } }}>
//             <Box sx={{ bgcolor: theme.palette.background.paper, height: '100%', borderRadius: 'calc(1rem - 2px)', position: 'relative', zIndex: 2 }}>
//                 <CardContent sx={{ p: { xs: 2, sm: 3 }, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
//                     <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
//                         <Box>
//                             <Typography variant="body1" sx={{ opacity: 0.9, mb: 1, color: 'text.secondary', fontWeight: "bold" }}>{title}</Typography>
//                             <Typography variant="h4" component="div" sx={{ fontWeight: "bold", mb: 1, color: 'text.primary' }}>{value}</Typography>
//                         </Box>
//                         <Avatar sx={{ bgcolor: 'rgba(140, 37, 124, 0.1)', color: modernTheme.originalPurple, width: 48, height: 48 }}>{icon}</Avatar>
//                     </Box>
//                 </CardContent>
//             </Box>
//         </Card>
//     );
// });
 
// const renderActiveShape = (props) => {
//     const RADIAN = Math.PI / 180;
//     const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
//     const sin = Math.sin(-RADIAN * midAngle);
//     const cos = Math.cos(-RADIAN * midAngle);
//     const sx = cx + (outerRadius + 10) * cos;
//     const sy = cy + (outerRadius + 10) * sin;
//     const mx = cx + (outerRadius + 30) * cos;
//     const my = cy + (outerRadius + 30) * sin;
//     const ex = mx + (cos >= 0 ? 1 : -1) * 22;
//     const ey = my;
//     const textAnchor = cos >= 0 ? 'start' : 'end';
 
//     return (
//         <g>
//             <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill} fontWeight="bold">{payload.name}</text>
//             <Sector cx={cx} cy={cy} innerRadius={innerRadius} outerRadius={outerRadius} startAngle={startAngle} endAngle={endAngle} fill={fill} />
//             <Sector cx={cx} cy={cy} startAngle={startAngle} endAngle={endAngle} innerRadius={outerRadius + 6} outerRadius={outerRadius + 10} fill={fill} />
//             <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
//             <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
//             <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`${value} tickets`}</text>
//             <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">{`(Rate ${(percent * 100).toFixed(2)}%)`}</text>
//         </g>
//     );
// };
 
// const CustomTooltip = ({ active, payload, label }) => {
//     if (active && payload && payload.length) {
//         return (
//             <Paper elevation={3} sx={{ padding: '12px', borderRadius: '8px', background: 'rgba(255, 255, 255, 0.9)' }}>
//                 <Typography variant="body2" sx={{ fontWeight: 'bold', color: modernTheme.primary }}>{`Month: ${label}`}</Typography>
//                 <Typography variant="body2" sx={{ color: '#333' }}>{`Payroll: ₹${payload[0].value.toLocaleString('en-IN')}`}</Typography>
//             </Paper>
//         );
//     }
//     return null;
// };
 
// export default function Dashboard() {
//     const navigate = useNavigate();
//     const primaryButtonHover = "#6d1d60";
 
//     const [userName, setUserName] = useState("");
//     const [loadingType, setLoadingType] = useState(null);
//     const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "info" });
//     const [dialog, setDialog] = useState({ open: false, type: null });
//     const [punchInTime, setPunchInTime] = useState(null);
//     const [punchOutTime, setPunchOutTime] = useState(null);
//     const [shiftInfo, setShiftInfo] = useState("My Shift: Loading...");
//     const [leaveCount, setLeaveCount] = useState(0);
//     const [lateMarkCount, setLateMarkCount] = useState(0);
//     const [awardCount, setAwardCount] = useState(0);
//     const [assetCount, setAssetCount] = useState(0);
//     const [ticketData, setTicketData] = useState([{ name: 'No Tickets', value: 1 }]);
//     const [isHoliday, setIsHoliday] = useState(false);
//     const [isLoading, setIsLoading] = useState(true);
//     const [showPunchUI, setShowPunchUI] = useState(false);
//     const [isEmployeeConfirmed, setIsEmployeeConfirmed] = useState(false);
//     const [hasAcknowledgedPolicies, setHasAcknowledgedPolicies] = useState(false);
//     const [activeTicketIndex, setActiveTicketIndex] = useState(0);
 
//     const onPieEnter = (_, index) => setActiveTicketIndex(index);
    
//     useEffect(() => {
//         const accessToken = localStorage.getItem("accessToken");
//         const employeeId = localStorage.getItem("loggedInUser");
//         const loggedInEmpId = localStorage.getItem("loggedInEmpId");
//         if (!accessToken || !employeeId || !loggedInEmpId) { setIsLoading(false); return; }
 
//         const headers = { Authorization: `Bearer ${accessToken}` };
//         axios.get("https://tdtlworld.com/hrms-backend/api/dropdown/employee-role/", { headers })
//             .then(res => setUserName(res.data.find(e => String(e.id) === String(loggedInEmpId))?.employee_name || "User"))
//             .catch(err => console.error("Failed to fetch user name:", err));
 
//         Promise.all([
//             axios.get(`https://tdtlworld.com/hrms-backend/EmpConfirmation/${employeeId}/`, { headers }),
//             axios.get(`https://tdtlworld.com/hrms-backend/policy_ack/${employeeId}/`, { headers }),
//             axios.get(`https://tdtlworld.com/hrms-backend/empdashboard/${employeeId}/`, { headers }),
//             axios.get(`https://tdtlworld.com/hrms-backend/api/dashboard_attendance/${employeeId}/`, { headers }),
//         ]).then(([confRes, policyRes, dashRes, attendRes]) => {
//             const isPolicyOk = policyRes.data?.status === 'Y';
//             setHasAcknowledgedPolicies(isPolicyOk);
//             setIsEmployeeConfirmed(confRes.data?.employee_confirm === 'Y');
//             setShowPunchUI(isPolicyOk);
 
//             const dashData = dashRes.data;
//             setLeaveCount(dashData.leave_days_taken || 0);
//             setLateMarkCount(dashData.late_mark_count || 0);
//             setAwardCount(dashData.award_count || 0);
//             setAssetCount(dashData.asset_count || 0);
 
//             const { in_time, out_time } = dashData?.office_shift || {};
//             if (in_time === "Holiday") {
//                 setShiftInfo("My Shift: Holiday"); setIsHoliday(true);
//             } else if (in_time && out_time) {
//                 setShiftInfo(`My Shift: ${formatApiTime(in_time)} To ${formatApiTime(out_time)}`); setIsHoliday(false);
//             } else {
//                 setShiftInfo("My Shift: Not Assigned"); setIsHoliday(false);
//             }
 
//             if (dashData.support_tickets?.count > 0) {
//                 const { data: tickets } = dashData.support_tickets;
//                 const counts = tickets.reduce((acc, t) => ({ ...acc, [t.priority]: (acc[t.priority] || 0) + 1 }), {});
//                 setTicketData(Object.entries(counts).map(([name, value]) => ({ name, value })));
//             }
 
//             const todayAttendance = attendRes.data.data?.[0];
//             if (todayAttendance) {
//                 setPunchInTime(todayAttendance.clock_in ? formatApiTime(todayAttendance.clock_in) : null);
//                 setPunchOutTime(todayAttendance.clock_out ? formatApiTime(todayAttendance.clock_out) : null);
//             }
//         }).catch(err => {
//             console.error("Dashboard data fetch failed:", err);
//             setSnackbar({ open: true, message: "Could not load dashboard information.", severity: "error" });
//             setShowPunchUI(false);
//         }).finally(() => setIsLoading(false));
//     }, []);
 
//     useEffect(() => {
//         if (isLoading) return;
//         if (!hasAcknowledgedPolicies) { Swal.fire({ title: 'Action Required', text: "Acknowledge your policies to enable Punch In/Out.", icon: 'warning' }); return; }
//         if (!isEmployeeConfirmed) { setSnackbar({ open: true, message: "Your employee confirmation is pending.", severity: "warning" }); }
//     }, [isLoading, hasAcknowledgedPolicies, isEmployeeConfirmed]);
 
//     const handleCloseSnackbar = (event, reason) => { if (reason === 'clickaway') return; setSnackbar({ ...snackbar, open: false }); };
//     const handleCloseDialog = () => setDialog({ open: false, type: null });
//     const handlePunchClick = (punchType) => { if (loadingType) return; setDialog({ open: true, type: punchType }); };
 
//     const executePunch = async () => {
//         const punchType = dialog.type;
//         handleCloseDialog(); setLoadingType(punchType);
//         let locationString = "Location not available";
//         try { const { latitude, longitude } = await getCurrentLocation(); locationString = `Lat: ${latitude.toFixed(5)}, Lon: ${longitude.toFixed(5)}`; } catch (error) { setSnackbar({ open: true, message: error.message, severity: "warning" }); }
 
//         const accessToken = localStorage.getItem("accessToken");
//         const employeeId = localStorage.getItem("loggedInUser");
//         if (!accessToken || !employeeId) { setSnackbar({ open: true, message: "Authentication failed.", severity: "error" }); setLoadingType(null); return; }
 
//         const payload = { emp_id: employeeId, punch_time: getISTDateTimeForAPI(), punch_type: punchType, location: locationString };
//         try {
//             await axios.post("https://tdtlworld.com/hrms-backend/api/employee_attendance/", payload, { headers: { Authorization: `Bearer ${accessToken}` } });
//             const displayTime = getFormattedDateTimeForDisplay();
//             punchType === "IN" ? setPunchInTime(displayTime) : setPunchOutTime(displayTime);
//             if(punchType === "IN") setPunchOutTime(null);
//             setSnackbar({ open: true, message: `Successfully Punched ${punchType === 'IN' ? 'In' : 'Out'}!`, severity: "success" });
//         } catch (error) {
//             setSnackbar({ open: true, message: error.response?.data?.error || "Punch failed.", severity: "error" });
//         } finally {
//             setLoadingType(null);
//         }
//     };
 
//     const isCurrentlyPunchedIn = !!punchInTime && !punchOutTime;
 
//     if (isLoading) {
//         return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}><CircularProgress /><Typography sx={{ ml: 2 }}>Loading Dashboard...</Typography></Box>;
//     }
 
//     return (
//         <Box p={2}>
//             <Snackbar open={snackbar.open} autoHideDuration={5000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}><Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }} variant="filled">{snackbar.message}</Alert></Snackbar>
//             <Dialog open={dialog.open} onClose={handleCloseDialog}><DialogTitle>{`Confirm Punch ${dialog.type === 'IN' ? 'In' : 'Out'}`}</DialogTitle><DialogContent><DialogContentText>Are you sure you want to punch {dialog.type === 'IN' ? 'in' : 'out'}?</DialogContentText></DialogContent><DialogActions><Button onClick={handleCloseDialog}>Cancel</Button><Button onClick={executePunch} variant="contained" autoFocus sx={{ backgroundColor: modernTheme.primary, '&:hover': { backgroundColor: primaryButtonHover } }}>Confirm</Button></DialogActions></Dialog>
 
//             <Grid container spacing={3}>
//                 <Grid item xs={12}>
//                     <Paper elevation={0} sx={{ background: modernTheme.gradient, borderRadius: '16px', p: 1, paddingLeft:1, color: 'white', boxShadow: modernTheme.cardShadow }}>
//                          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2, flexWrap: 'wrap', gap: 2, padding:1 }}>
//                             <Box>
//                               <Typography variant="h4" fontWeight="bold" mb={1}>HR Dashboard</Typography>
//                               <Typography variant="h7" sx={{color: 'white'}} mb={1}>Welcome, {userName}</Typography>
//                               <Typography variant="body2" sx={{color: 'rgba(255,255,255,0.85)', mt: 0.5}}>{shiftInfo}</Typography>
//                             </Box>
//                             {showPunchUI && (isHoliday ?
//                                 <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><HolidayVillageIcon sx={{ color: 'white' }} /><Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold' }}>Holiday</Typography></Box> :
//                                 <Box sx={{ display: "flex", gap: 2 }}>
//                                     <Button variant="contained" onClick={() => handlePunchClick("IN")} disabled={loadingType !== null || isCurrentlyPunchedIn} sx={{ backgroundColor: 'rgba(255,255,255,0.9)', color: modernTheme.primary, '&:hover': { backgroundColor: 'white' } }}>{loadingType === 'IN' ? <CircularProgress size={24} color="inherit" /> : "Punch In"}</Button>
//                                     <Button variant="contained" onClick={() => handlePunchClick("OUT")} disabled={loadingType !== null || !isCurrentlyPunchedIn} sx={{ backgroundColor: 'rgba(255,255,255,0.9)', color: modernTheme.primary, '&:hover': { backgroundColor: 'white' } }}>{loadingType === 'OUT' ? <CircularProgress size={24} color="inherit" /> : "Punch Out"}</Button>
//                                 </Box>
//                             )}
//                         </Box>
//                         {showPunchUI && <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2, px: 1, borderTop: '1px solid rgba(255,255,255,0.3)', pt: 2, minHeight: '24px', flexWrap: 'wrap', gap: 1 }}>
//                             <Typography variant="body2" sx={{ fontWeight: 500, color: 'rgba(255,255,255,0.85)' }}>{punchInTime ? `Punched In: ${punchInTime}` : 'Not punched in today'}</Typography>
//                             <Typography variant="body2" sx={{ fontWeight: 500, color: 'rgba(255,255,255,0.85)' }}>{punchOutTime ? `Punched Out: ${punchOutTime}` : ''}</Typography>
//                         </Box>}
//                     </Paper>
//                 </Grid>
 
//                 <Grid item xs={12}>
//                     <Grid container spacing={3}>
//                         <Grid item xs={12} sm={4} md={2}><Zoom in={!isLoading} style={{ transitionDelay: '100ms' }}><InfoCard title="Total Employee" value={"150"} icon={<GroupsIcon />} /></Zoom></Grid>
//                         <Grid item xs={12} sm={4} md={2}><Zoom in={!isLoading} style={{ transitionDelay: '200ms' }}><InfoCard title="Confirmation Pending" value={"5"} icon={<HourglassEmptyIcon />} /></Zoom></Grid>
//                         <Grid item xs={12} sm={4} md={2}><Zoom in={!isLoading} style={{ transitionDelay: '300ms' }}><InfoCard title="Full & Final Pending" value={"2"} icon={<ReceiptLongIcon />} /></Zoom></Grid>
//                         <Grid item xs={12} sm={4} md={2}><Zoom in={!isLoading} style={{ transitionDelay: '400ms' }}><InfoCard title="Last Month New Joinee" value={"12"} icon={<PersonAddIcon />} /></Zoom></Grid>
//                         <Grid item xs={12} sm={4} md={2}><Zoom in={!isLoading} style={{ transitionDelay: '500ms' }}><InfoCard title="Last Month Exits" value={"3"} icon={<PersonRemoveIcon />} /></Zoom></Grid>
//                         <Grid item xs={12} sm={4} md={2}><Zoom in={!isLoading} style={{ transitionDelay: '600ms' }}><InfoCard title="Employee Issues" value={"8"} icon={<ReportProblemIcon />} /></Zoom></Grid>
//                     </Grid>
//                 </Grid>
 
//                 <Grid item xs={12} lg={7}>
//                     <Grid container spacing={3}>
//                         {showPunchUI && <Grid item xs={12}><Paper sx={{ p: 1.5, display: "flex", justifyContent: "space-between", alignItems: "center", bgcolor: modernTheme.primary, color: "white", borderRadius: "8px", border: '1px solid #6d1d60' }}><Button sx={{ color: "white" }} endIcon={<ArrowForwardIcon />} onClick={() => navigate('/hrms/dashboardhr/attendance')}>My Attendance</Button></Paper></Grid>}
//                         <Grid item xs={12} sm={6}><Zoom in={!isLoading} style={{ transitionDelay: '700ms' }}><InfoCard title="My Awards" value={awardCount} icon={<EmojiEventsIcon />} /></Zoom></Grid>
//                         <Grid item xs={12} sm={6}><Zoom in={!isLoading} style={{ transitionDelay: '800ms' }}><InfoCard title="Total Assets" value={assetCount} icon={<DevicesIcon />} /></Zoom></Grid>
//                         <Grid item xs={12}>
//                              <Card sx={{ borderRadius: 4, p: 2, height: '100%', boxShadow: modernTheme.cardShadow, transition: 'transform 0.3s', '&:hover': { transform: 'translateY(-5px)' } }}>
//                                 <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'text.primary' }}>Ticket Priority</Typography>
//                                 <Divider sx={{ my: 1 }} />
//                                 <ResponsiveContainer width="100%" height={300}>
//                                     <PieChart>
//                                         <Pie activeIndex={activeTicketIndex} activeShape={renderActiveShape} data={ticketData} cx="50%" cy="50%" innerRadius={70} outerRadius={90} dataKey="value" onMouseEnter={onPieEnter} paddingAngle={5}>
//                                             {ticketData.map((entry, index) => (<Cell key={`cell-${index}`} fill={TICKET_PRIORITY_COLORS[entry.name]} />))}
//                                         </Pie>
//                                         <Legend iconSize={10} layout="horizontal" verticalAlign="bottom" align="center" />
//                                     </PieChart>
//                                 </ResponsiveContainer>
//                             </Card>
//                         </Grid>
//                     </Grid>
//                 </Grid>
 
//                 <Grid item xs={12} lg={5}>
//                     <Grid container spacing={3}>
//                         <Grid item xs={12} sm={6}><Zoom in={!isLoading} style={{ transitionDelay: '900ms' }}><InfoCard title="My Leave" value={leaveCount} icon={<LabelIcon />} /></Zoom></Grid>
//                         <Grid item xs={12} sm={6}><Zoom in={!isLoading} style={{ transitionDelay: '1000ms' }}><InfoCard title="Late Mark" value={lateMarkCount} icon={<MoreTimeIcon />} /></Zoom></Grid>
//                         <Grid item xs={12}>
//                             <Card sx={{ borderRadius: 4, p: 2, height: '100%', boxShadow: modernTheme.cardShadow, transition: 'transform 0.3s', '&:hover': { transform: 'translateY(-5px)' } }}>
//                                 <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'text.primary' }}>My Payroll - Monthly Report</Typography>
//                                 <Box sx={{ display: 'flex', gap: 4, my: 2 }}>
//                                     <Box>
//                                         <Typography variant="body2" color="text.secondary">Total</Typography>
//                                         <Typography variant="h5" sx={{ fontWeight: "bold", color: modernTheme.primary }}>₹0.00</Typography>
//                                     </Box>
//                                     <Box>
//                                         <Typography variant="body2" color="text.secondary">This Month</Typography>
//                                         <Typography variant="h5" sx={{ fontWeight: "bold", color: modernTheme.secondary }}>₹0.00</Typography>
//                                     </Box>
//                                 </Box>
//                                 <Divider sx={{ mb: 2 }} />
//                                 <ResponsiveContainer width="100%" height={250}>
//                                     <AreaChart data={payrollChartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
//                                         <defs>
//                                             <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
//                                                 <stop offset="5%" stopColor={modernTheme.primary} stopOpacity={0.8}/>
//                                                 <stop offset="95%" stopColor={modernTheme.primary} stopOpacity={0}/>
//                                             </linearGradient>
//                                         </defs>
//                                         <XAxis dataKey="name" stroke="#999" />
//                                         <YAxis stroke="#999" />
//                                         <CartesianGrid strokeDasharray="3 3" vertical={false} />
//                                         <Tooltip content={<CustomTooltip />} />
//                                         <Area type="monotone" dataKey="value" stroke={modernTheme.primary} fillOpacity={1} fill="url(#colorUv)" strokeWidth={2} />
//                                     </AreaChart>
//                                 </ResponsiveContainer>
//                             </Card>
//                         </Grid>
//                     </Grid>
//                 </Grid>
//             </Grid>
//         </Box>
//     )
// }




import React, { useState, useEffect } from "react";
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
  Card,
  CardContent,
  Avatar,
  Zoom,
  Divider,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
  Sector,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  ComposedChart,
  Line,
  LineChart,
} from "recharts";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import SpeedIcon from "@mui/icons-material/Speed";
import LabelIcon from "@mui/icons-material/Label";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import MoreTimeIcon from "@mui/icons-material/MoreTime";
import HolidayVillageIcon from "@mui/icons-material/HolidayVillage";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import GroupsIcon from "@mui/icons-material/Groups";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import DevicesIcon from "@mui/icons-material/Devices";
// New icons for HR cards
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PaidIcon from "@mui/icons-material/Paid";
import FactoryIcon from "@mui/icons-material/Factory";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import PersonIcon from "@mui/icons-material/Person";

const getCurrentLocation = () =>
  new Promise((resolve, reject) => {
    if (!navigator.geolocation)
      return reject(new Error("Geolocation is not supported."));
    navigator.geolocation.getCurrentPosition(
      (position) =>
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        }),
      () =>
        reject(
          new Error("Unable to retrieve location. Please grant permission.")
        )
    );
  });
const formatApiTime = (timeString) => {
  if (!timeString) return "";
  const today = new Date();
  const [hours, minutes, seconds] = timeString.split(":");
  today.setHours(
    parseInt(hours, 10),
    parseInt(minutes, 10),
    parseInt(seconds, 10) || 0
  );
  if (isNaN(today.getTime())) return "";
  return today.toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
};
const getFormattedDateTimeForDisplay = () =>
  new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
const getISTDateTimeForAPI = () =>
  new Date().toLocaleString("sv-SE", { timeZone: "Asia/Kolkata" });

const CardPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  height: "100%",
  borderRadius: "8px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
  border: "1px solid #e0e0e0",
}));

const modernTheme = {
  primary: "#8C257C",
  secondary: "#F58E35",
  originalPurple: "#8C257C",
  originalOrange: "#F58E35",
  gradient: "linear-gradient(135deg, #F58E35 0%, #8C257C 100%)",
  cardShadow: "0 10px 30px rgba(0,0,0,0.07)",
};

const TICKET_PRIORITY_COLORS = {
  Critical: "#8C257C",
  High: "#B74E9A",
  Medium: "#F58E35",
  Low: "#F8B26A",
  "No Tickets": "#E0E0E0",
};

const payrollChartData = [
  { name: "Jul", value: 2400 },
  { name: "Aug", value: 2210 },
  { name: "Sep", value: 2290 },
  { name: "Oct", value: 2000 },
  { name: "Nov", value: 2181 },
  { name: "Dec", value: 2500 },
  { name: "Jan", value: 2100 },
];

// --- NEW HR ANALYTICS DATA ---
const performanceMatrixData = [
  { name: "Exceptional", percentage: 12 },
  { name: "Exceeds Exp.", percentage: 28 },
  { name: "Meet Exp.", percentage: 45 },
  { name: "Below Exp.", percentage: 12 },
  { name: "Unsatisfactory", percentage: 3 },
];

const employeeAttributionData = [
  { name: "Q1", division: 8.5, department: 9.2 },
  { name: "Q2", division: 7.8, department: 8.1 },
  { name: "Q3", division: 9.3, department: 10.5 },
  { name: "Q4", division: 6.2, department: 7.8 },
];

const recruitmentTrackerData = [
  { name: "Opened", value: 28 },
  { name: "Filed", value: 15 },
  { name: "In Process", value: 42 },
];

const recruitmentColors = ["#8C257C", "#F58E35", "#FF7043"];

const totalResignationData = [
  { name: "January", accepted: 2, exitProceed: 1, ffProceed: 0 },
  { name: "February", accepted: 1, exitProceed: 2, ffProceed: 1 },
  { name: "March", accepted: 3, exitProceed: 1, ffProceed: 2 },
  { name: "April", accepted: 2, exitProceed: 3, ffProceed: 1 },
];

const employeeLevelData = [
  { name: "L1", value: 35 },
  { name: "L2", value: 28 },
  { name: "L3", value: 22 },
  { name: "L4", value: 15 },
];

const employeeLevelColors = ["#8C257C", "#F58E35", "#FF7043", "#B74E9A"];

const employeeVsDepartmentData = [
  { name: "Sales", percentage: 22, count: 45 },
  { name: "Marketing", percentage: 18, count: 37 },
  { name: "Engineering", percentage: 28, count: 58 },
  { name: "HR", percentage: 12, count: 25 },
  { name: "Operations", percentage: 20, count: 41 },
];

// --- TICKET PRIORITY GRAPH DATA WITH GRADIENT COLORS ---
const ticketPriorityGraphData = [
  { name: "Critical", value: 25 },
  { name: "High", value: 35 },
  { name: "Medium", value: 28 },
  { name: "Low", value: 12 },
];

const ticketPriorityGraphColors = ["#8C257C", "#B74E9A", "#F58E35", "#F8B26A"];

const InfoCard = React.forwardRef(({ title, value, icon }, ref) => {
  const theme = useTheme();
  return (
    <Card
      ref={ref}
      elevation={0}
      sx={{
        position: "relative",
        p: "2px",
        height: "100%",
        borderRadius: "16px",
        background: "transparent",
        overflow: "hidden",
        transition: "transform 0.3s ease-in-out",
        boxShadow: "none",
        "&:hover": { transform: "translateY(-8px)" },
        // "@keyframes shimmer-spin": {
        //   "0%": { transform: "translate(-50%, -50%) rotate(0deg)" },
        //   "100%": { transform: "translate(-50%, -50%) rotate(360deg)" },
        // },
        "&::before": {
          content: '""',
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "200%",
          height: "200%",
          zIndex: 1,
          background: `conic-gradient(from 180deg at 50% 50%, ${modernTheme.originalOrange} 0%, ${modernTheme.originalPurple} 50%, ${modernTheme.originalOrange} 100%)`,
          transform: "translate(-50%, -50%)",
          // animation: "shimmer-spin 4s linear infinite",
        },
      }}
    >
      <Box
        sx={{
          bgcolor: theme.palette.background.paper,
          height: "100%",
          borderRadius: "calc(1rem - 2px)",
          position: "relative",
          zIndex: 2,
        }}
      >
        <CardContent
          sx={{
            p: { xs: 2, sm: 3 },
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <Box>
              <Typography
                variant="body1"
                sx={{
                  opacity: 0.9,
                  mb: 1,
                  color: "text.secondary",
                  fontWeight: "bold",
                }}
              >
                {title}
              </Typography>
              <Typography
                variant="h4"
                component="div"
                sx={{ fontWeight: "bold", mb: 1, color: "text.primary" }}
              >
                {value}
              </Typography>
            </Box>
            <Avatar
              sx={{
                bgcolor: "rgba(140, 37, 124, 0.1)",
                color: modernTheme.originalPurple,
                width: 48,
                height: 48,
              }}
            >
              {icon}
            </Avatar>
          </Box>
        </CardContent>
      </Box>
    </Card>
  );
});

const renderActiveShape = (props) => {
  // Commented out - Ticket Priority chart is no longer in use
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text
        x={cx}
        y={cy}
        dy={8}
        textAnchor="middle"
        fill={fill}
        fontWeight="bold"
      >
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >{`${value} tickets`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >{`(Rate ${(percent * 100).toFixed(2)}%)`}</text>
    </g>
  );
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <Paper
        elevation={3}
        sx={{
          padding: "12px",
          borderRadius: "8px",
          background: "rgba(255, 255, 255, 0.9)",
        }}
      >
        <Typography
          variant="body2"
          sx={{ fontWeight: "bold", color: modernTheme.primary }}
        >{`Month: ${label}`}</Typography>
        <Typography
          variant="body2"
          sx={{ color: "#333" }}
        >{`Payroll: ₹${payload[0].value.toLocaleString("en-IN")}`}</Typography>
      </Paper>
    );
  }
  return null;
};

export default function Dashboard() {
  const navigate = useNavigate();
  const primaryButtonHover = "#6d1d60";

  const [userName, setUserName] = useState("");
  const [loadingType, setLoadingType] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });
  const [dialog, setDialog] = useState({ open: false, type: null });
  const [punchInTime, setPunchInTime] = useState(null);
  const [punchOutTime, setPunchOutTime] = useState(null);
  const [shiftInfo, setShiftInfo] = useState("My Shift: Loading...");
  const [leaveCount, setLeaveCount] = useState(0);
  const [lateMarkCount, setLateMarkCount] = useState(0);
  const [awardCount, setAwardCount] = useState(0);
  const [assetCount, setAssetCount] = useState(0);
  const [ticketData, setTicketData] = useState([
    { name: "No Tickets", value: 1 },
  ]);
  const [isHoliday, setIsHoliday] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showPunchUI, setShowPunchUI] = useState(false);
  const [isEmployeeConfirmed, setIsEmployeeConfirmed] = useState(false);
  const [hasAcknowledgedPolicies, setHasAcknowledgedPolicies] = useState(false);
  const [activeTicketIndex, setActiveTicketIndex] = useState(0);

  const onPieEnter = (_, index) => setActiveTicketIndex(index);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const employeeId = localStorage.getItem("loggedInUser");
    const loggedInEmpId = localStorage.getItem("loggedInEmpId");
    if (!accessToken || !employeeId || !loggedInEmpId) {
      setIsLoading(false);
      return;
    }

    const headers = { Authorization: `Bearer ${accessToken}` };
    axios
      .get("https://tdtlworld.com/hrms-backend/api/dropdown/employee-role/", {
        headers,
      })
      .then((res) =>
        setUserName(
          res.data.find((e) => String(e.id) === String(loggedInEmpId))
            ?.employee_name || "User"
        )
      )
      .catch((err) => console.error("Failed to fetch user name:", err));

    Promise.all([
      axios.get(
        `https://tdtlworld.com/hrms-backend/EmpConfirmation/${employeeId}/`,
        { headers }
      ),
      axios.get(
        `https://tdtlworld.com/hrms-backend/policy_ack/${employeeId}/`,
        { headers }
      ),
      axios.get(
        `https://tdtlworld.com/hrms-backend/empdashboard/${employeeId}/`,
        { headers }
      ),
      axios.get(
        `https://tdtlworld.com/hrms-backend/api/dashboard_attendance/${employeeId}/`,
        { headers }
      ),
    ])
      .then(([confRes, policyRes, dashRes, attendRes]) => {
        const isPolicyOk = policyRes.data?.status === "Y";
        setHasAcknowledgedPolicies(isPolicyOk);
        setIsEmployeeConfirmed(confRes.data?.employee_confirm === "Y");
        setShowPunchUI(isPolicyOk);

        const dashData = dashRes.data;
        setLeaveCount(dashData.leave_days_taken || 0);
        setLateMarkCount(dashData.late_mark_count || 0);
        setAwardCount(dashData.award_count || 0);
        setAssetCount(dashData.asset_count || 0);

        const { in_time, out_time } = dashData?.office_shift || {};
        if (in_time === "Holiday") {
          setShiftInfo("My Shift: Holiday");
          setIsHoliday(true);
        } else if (in_time && out_time) {
          setShiftInfo(
            `My Shift: ${formatApiTime(in_time)} To ${formatApiTime(out_time)}`
          );
          setIsHoliday(false);
        } else {
          setShiftInfo("My Shift: Not Assigned");
          setIsHoliday(false);
        }

        if (dashData.support_tickets?.count > 0) {
          const { data: tickets } = dashData.support_tickets;
          const counts = tickets.reduce(
            (acc, t) => ({ ...acc, [t.priority]: (acc[t.priority] || 0) + 1 }),
            {}
          );
          setTicketData(
            Object.entries(counts).map(([name, value]) => ({ name, value }))
          );
        }

        const todayAttendance = attendRes.data.data?.[0];
        if (todayAttendance) {
          setPunchInTime(
            todayAttendance.clock_in
              ? formatApiTime(todayAttendance.clock_in)
              : null
          );
          setPunchOutTime(
            todayAttendance.clock_out
              ? formatApiTime(todayAttendance.clock_out)
              : null
          );
        }
      })
      .catch((err) => {
        console.error("Dashboard data fetch failed:", err);
        setSnackbar({
          open: true,
          message: "Could not load dashboard information.",
          severity: "error",
        });
        setShowPunchUI(false);
      })
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    if (isLoading) return;
    if (!hasAcknowledgedPolicies) {
      Swal.fire({
        title: "Action Required",
        text: "Acknowledge your policies to enable Punch In/Out.",
        icon: "warning",
      });
      return;
    }
    if (!isEmployeeConfirmed) {
      setSnackbar({
        open: true,
        message: "Your employee confirmation is pending.",
        severity: "warning",
      });
    }
  }, [isLoading, hasAcknowledgedPolicies, isEmployeeConfirmed]);

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") return;
    setSnackbar({ ...snackbar, open: false });
  };
  const handleCloseDialog = () => setDialog({ open: false, type: null });
  const handlePunchClick = (punchType) => {
    if (loadingType) return;
    setDialog({ open: true, type: punchType });
  };

  const executePunch = async () => {
    const punchType = dialog.type;
    handleCloseDialog();
    setLoadingType(punchType);
    let locationString = "Location not available";
    try {
      const { latitude, longitude } = await getCurrentLocation();
      locationString = `Lat: ${latitude.toFixed(5)}, Lon: ${longitude.toFixed(
        5
      )}`;
    } catch (error) {
      setSnackbar({ open: true, message: error.message, severity: "warning" });
    }

    const accessToken = localStorage.getItem("accessToken");
    const employeeId = localStorage.getItem("loggedInUser");
    if (!accessToken || !employeeId) {
      setSnackbar({
        open: true,
        message: "Authentication failed.",
        severity: "error",
      });
      setLoadingType(null);
      return;
    }

    const payload = {
      emp_id: employeeId,
      punch_time: getISTDateTimeForAPI(),
      punch_type: punchType,
      location: locationString,
    };
    try {
      await axios.post(
        "https://tdtlworld.com/hrms-backend/api/employee_attendance/",
        payload,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      const displayTime = getFormattedDateTimeForDisplay();
      punchType === "IN"
        ? setPunchInTime(displayTime)
        : setPunchOutTime(displayTime);
      if (punchType === "IN") setPunchOutTime(null);
      setSnackbar({
        open: true,
        message: `Successfully Punched ${punchType === "IN" ? "In" : "Out"}!`,
        severity: "success",
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.response?.data?.error || "Punch failed.",
        severity: "error",
      });
    } finally {
      setLoadingType(null);
    }
  };

  const isCurrentlyPunchedIn = !!punchInTime && !punchOutTime;

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <CircularProgress />
        <Typography sx={{ ml: 2 }}>Loading Dashboard...</Typography>
      </Box>
    );
  }

  return (
    <Box p={2}>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={5000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
      <Dialog open={dialog.open} onClose={handleCloseDialog}>
        <DialogTitle>{`Confirm Punch ${
          dialog.type === "IN" ? "In" : "Out"
        }`}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to punch {dialog.type === "IN" ? "in" : "out"}
            ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            onClick={executePunch}
            variant="contained"
            autoFocus
            sx={{
              backgroundColor: modernTheme.primary,
              "&:hover": { backgroundColor: primaryButtonHover },
            }}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper
            elevation={0}
            sx={{
              background: modernTheme.gradient,
              borderRadius: "16px",
              p: 1,
              paddingLeft: 1,
              color: "white",
              boxShadow: modernTheme.cardShadow,
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
                flexWrap: "wrap",
                gap: 2,
                padding: 1,
              }}
            >
              <Box>
                <Typography variant="h4" fontWeight="bold" mb={1}>
                  HR Dashboard
                </Typography>
                <Typography variant="h7" sx={{ color: "white" }} mb={1}>
                  Welcome, {userName}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "rgba(255,255,255,0.85)", mt: 0.5 }}
                >
                  {shiftInfo}
                </Typography>
              </Box>
              {showPunchUI &&
                (isHoliday ? (
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <HolidayVillageIcon sx={{ color: "white" }} />
                    <Typography
                      variant="h6"
                      sx={{ color: "white", fontWeight: "bold" }}
                    >
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
                        backgroundColor: "rgba(255,255,255,0.9)",
                        color: modernTheme.primary,
                        "&:hover": { backgroundColor: "white" },
                      }}
                    >
                      {loadingType === "IN" ? (
                        <CircularProgress size={24} color="inherit" />
                      ) : (
                        "Punch In"
                      )}
                    </Button>
                    <Button
                      variant="contained"
                      onClick={() => handlePunchClick("OUT")}
                      disabled={loadingType !== null || !isCurrentlyPunchedIn}
                      sx={{
                        backgroundColor: "rgba(255,255,255,0.9)",
                        color: modernTheme.primary,
                        "&:hover": { backgroundColor: "white" },
                      }}
                    >
                      {loadingType === "OUT" ? (
                        <CircularProgress size={24} color="inherit" />
                      ) : (
                        "Punch Out"
                      )}
                    </Button>
                  </Box>
                ))}
            </Box>
            {showPunchUI && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mt: 2,
                  px: 1,
                  borderTop: "1px solid rgba(255,255,255,0.3)",
                  pt: 2,
                  minHeight: "24px",
                  flexWrap: "wrap",
                  gap: 1,
                }}
              >
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 500, color: "rgba(255,255,255,0.85)" }}
                >
                  {punchInTime
                    ? `Punched In: ${punchInTime}`
                    : "Not punched in today"}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 500, color: "rgba(255,255,255,0.85)" }}
                >
                  {punchOutTime ? `Punched Out: ${punchOutTime}` : ""}
                </Typography>
              </Box>
            )}
          </Paper>
        </Grid>

        {/* --- HR ANALYTICS CARDS (8 CARDS) --- */}
        <Grid item xs={12}>
          <Grid container spacing={3}>
            {/* First Row - 3 Cards */}
            <Grid item xs={12} sm={6} md={4}>
              <Zoom in={!isLoading} style={{ transitionDelay: "100ms" }}>
                <InfoCard
                  title="Total Number of Employees"
                  value={"0"}
                  icon={<GroupsIcon />}
                />
              </Zoom>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Zoom in={!isLoading} style={{ transitionDelay: "150ms" }}>
                <InfoCard
                  title="Last Month Total Revenue"
                  value={"₹0.00"}
                  icon={<TrendingUpIcon />}
                />
              </Zoom>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Zoom in={!isLoading} style={{ transitionDelay: "200ms" }}>
                <InfoCard
                  title="Per Employee Contribution"
                  value={"₹0.00"}
                  icon={<PersonIcon />}
                />
              </Zoom>
            </Grid>

            {/* Second Row - 3 Cards */}
            <Grid item xs={12} sm={6} md={4}>
              <Zoom in={!isLoading} style={{ transitionDelay: "250ms" }}>
                <InfoCard
                  title="Monthly Total Salary"
                  value={"₹0.00"}
                  icon={<PaidIcon />}
                />
              </Zoom>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Zoom in={!isLoading} style={{ transitionDelay: "300ms" }}>
                <InfoCard
                  title="Monthly Expenses"
                  value={"₹0.00"}
                  icon={<FactoryIcon />}
                />
              </Zoom>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Zoom in={!isLoading} style={{ transitionDelay: "350ms" }}>
                <InfoCard
                  title="Total Employee Cost"
                  value={"₹0.00"}
                  icon={<AssignmentIcon />}
                />
              </Zoom>
            </Grid>

            {/* Third Row - 2 Cards */}
            <Grid item xs={12} sm={6} md={6}>
              <Zoom in={!isLoading} style={{ transitionDelay: "400ms" }}>
                <InfoCard
                  title="Per Employee Cost"
                  value={"₹0.00"}
                  icon={<ShowChartIcon />}
                />
              </Zoom>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <Zoom in={!isLoading} style={{ transitionDelay: "450ms" }}>
                <InfoCard
                  title="Per Employee Revenue"
                  value={"₹0.00"}
                  icon={<ShowChartIcon />}
                />
              </Zoom>
            </Grid>
          </Grid>
        </Grid>

        {/* --- COMMENTED OUT OLD CARDS SECTION ---
        <Grid item xs={12}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4} md={2}>
              <Zoom in={!isLoading} style={{ transitionDelay: "100ms" }}>
                <InfoCard
                  title="Total Employee"
                  value={"150"}
                  icon={<GroupsIcon />}
                />
              </Zoom>
            </Grid>
            <Grid item xs={12} sm={4} md={2}>
              <Zoom in={!isLoading} style={{ transitionDelay: "200ms" }}>
                <InfoCard
                  title="Confirmation Pending"
                  value={"5"}
                  icon={<HourglassEmptyIcon />}
                />
              </Zoom>
            </Grid>
            <Grid item xs={12} sm={4} md={2}>
              <Zoom in={!isLoading} style={{ transitionDelay: "300ms" }}>
                <InfoCard
                  title="Full & Final Pending"
                  value={"2"}
                  icon={<ReceiptLongIcon />}
                />
              </Zoom>
            </Grid>
            <Grid item xs={12} sm={4} md={2}>
              <Zoom in={!isLoading} style={{ transitionDelay: "400ms" }}>
                <InfoCard
                  title="Last Month New Joinee"
                  value={"12"}
                  icon={<PersonAddIcon />}
                />
              </Zoom>
            </Grid>
            <Grid item xs={12} sm={4} md={2}>
              <Zoom in={!isLoading} style={{ transitionDelay: "500ms" }}>
                <InfoCard
                  title="Last Month Exits"
                  value={"3"}
                  icon={<PersonRemoveIcon />}
                />
              </Zoom>
            </Grid>
            <Grid item xs={12} sm={4} md={2}>
              <Zoom in={!isLoading} style={{ transitionDelay: "600ms" }}>
                <InfoCard
                  title="Employee Issues"
                  value={"8"}
                  icon={<ReportProblemIcon />}
                />
              </Zoom>
            </Grid>
          </Grid>
        </Grid>
        */}

        <Grid item xs={12} lg={7}>
          <Grid container spacing={3}>
            {showPunchUI && (
              <Grid item xs={12}>
                <Paper
                  sx={{
                    p: 1.5,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    bgcolor: modernTheme.primary,
                    color: "white",
                    borderRadius: "8px",
                    border: "1px solid #6d1d60",
                  }}
                >
                  <Button
                    sx={{ color: "white" }}
                    endIcon={<ArrowForwardIcon />}
                    onClick={() => navigate("/hrms/dashboardhr/attendance")}
                  >
                    My Attendance
                  </Button>
                </Paper>
              </Grid>
            )}
            <Grid item xs={12} sm={6}>
              <Zoom in={!isLoading} style={{ transitionDelay: "700ms" }}>
                <InfoCard
                  title="My Awards"
                  value={awardCount}
                  icon={<EmojiEventsIcon />}
                />
              </Zoom>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Zoom in={!isLoading} style={{ transitionDelay: "800ms" }}>
                <InfoCard
                  title="Total Assets"
                  value={assetCount}
                  icon={<DevicesIcon />}
                />
              </Zoom>
            </Grid>
            {/* TICKET PRIORITY PIE CHART WITH GRADIENT COLORS */}
            <Grid item xs={12}>
              <Card
                sx={{
                  borderRadius: 3,
                  p: 3,
                  height: "100%",
                  boxShadow: modernTheme.cardShadow,
                  transition: "transform 0.3s",
                  "&:hover": { transform: "translateY(-5px)" },
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", mb: 2, color: "text.primary" }}
                >
                  Ticket Priority Distribution
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={ticketPriorityGraphData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {ticketPriorityGraphData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={ticketPriorityGraphColors[index]}
                        />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${value}%`} />
                    <Legend layout="vertical" align="right" verticalAlign="middle" />
                  </PieChart>
                </ResponsiveContainer>
              </Card>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} lg={5}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Zoom in={!isLoading} style={{ transitionDelay: "900ms" }}>
                <InfoCard
                  title="My Leave"
                  value={leaveCount}
                  icon={<LabelIcon />}
                />
              </Zoom>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Zoom in={!isLoading} style={{ transitionDelay: "1000ms" }}>
                <InfoCard
                  title="Late Mark"
                  value={lateMarkCount}
                  icon={<MoreTimeIcon />}
                />
              </Zoom>
            </Grid>
            <Grid item xs={12}>
              <Card
                sx={{
                  borderRadius: 4,
                  p: 2,
                  height: "100%",
                  boxShadow: modernTheme.cardShadow,
                  transition: "transform 0.3s",
                  "&:hover": { transform: "translateY(-5px)" },
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", color: "text.primary" }}
                >
                  My Payroll - Monthly Report
                </Typography>
                <Box sx={{ display: "flex", gap: 4, my: 2 }}>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Total
                    </Typography>
                    <Typography
                      variant="h5"
                      sx={{ fontWeight: "bold", color: modernTheme.primary }}
                    >
                      ₹0.00
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      This Month
                    </Typography>
                    <Typography
                      variant="h5"
                      sx={{ fontWeight: "bold", color: modernTheme.secondary }}
                    >
                      ₹0.00
                    </Typography>
                  </Box>
                </Box>
                <Divider sx={{ mb: 2 }} />
                <ResponsiveContainer width="100%" height={250}>
                  <AreaChart
                    data={payrollChartData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                        <stop
                          offset="5%"
                          stopColor={modernTheme.primary}
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor={modernTheme.primary}
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="name" stroke="#999" />
                    <YAxis stroke="#999" />
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <Tooltip content={<CustomTooltip />} />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke={modernTheme.primary}
                      fillOpacity={1}
                      fill="url(#colorUv)"
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* --- NEW HR ANALYTICS GRAPHS SECTION --- */}
      <Grid container spacing={3} sx={{ mt: 1 }}>
        {/* Graph 1: Performance Management Matrix - Bar Chart */}
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              borderRadius: 3,
              p: 3,
              height: "100%",
              boxShadow: modernTheme.cardShadow,
              transition: "transform 0.3s",
              "&:hover": { transform: "translateY(-5px)" },
            }}
          >
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", mb: 2, color: "text.primary" }}
            >
              Performance Management Matrix
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={performanceMatrixData}>
                <defs>
                  <linearGradient id="performanceGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={modernTheme.secondary} stopOpacity={1} />
                    <stop offset="100%" stopColor={modernTheme.primary} stopOpacity={0.8} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e0e0e0" />
                <XAxis dataKey="name" stroke="#999" />
                <YAxis stroke="#999" />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="percentage" fill="url(#performanceGrad)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Grid>

        {/* Graph 2: Employee Attribution Rate - Area Chart */}
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              borderRadius: 3,
              p: 3,
              height: "100%",
              boxShadow: modernTheme.cardShadow,
              transition: "transform 0.3s",
              "&:hover": { transform: "translateY(-5px)" },
            }}
          >
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", mb: 2, color: "text.primary" }}
            >
              Employee Attribution Rate
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={employeeAttributionData}>
                <defs>
                  <linearGradient id="attributionGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#FF7043" stopOpacity={0.8} />
                    <stop offset="100%" stopColor="#FF7043" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="attributionGrad2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#8C257C" stopOpacity={0.8} />
                    <stop offset="100%" stopColor="#8C257C" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e0e0e0" />
                <XAxis dataKey="name" stroke="#999" />
                <YAxis stroke="#999" />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="division"
                  stroke="#FF7043"
                  fill="url(#attributionGrad)"
                  strokeWidth={2}
                />
                <Area
                  type="monotone"
                  dataKey="department"
                  stroke="#8C257C"
                  fill="url(#attributionGrad2)"
                  strokeWidth={2}
                />
                <Legend />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </Grid>

        {/* Graph 3: Recruitment Tracker Metrics - Pie Chart */}
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              borderRadius: 3,
              p: 3,
              height: "100%",
              boxShadow: modernTheme.cardShadow,
              transition: "transform 0.3s",
              "&:hover": { transform: "translateY(-5px)" },
            }}
          >
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", mb: 2, color: "text.primary" }}
            >
              Recruitment Tracker Metrics
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={recruitmentTrackerData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {recruitmentTrackerData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={recruitmentColors[index]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend layout="vertical" align="right" verticalAlign="middle" />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Grid>

        {/* Graph 4: Total Resignation - Stacked Bar Chart */}
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              borderRadius: 3,
              p: 3,
              height: "100%",
              boxShadow: modernTheme.cardShadow,
              transition: "transform 0.3s",
              "&:hover": { transform: "translateY(-5px)" },
            }}
          >
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", mb: 2, color: "text.primary" }}
            >
              Total Resignation
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={totalResignationData}>
                <defs>
                  <linearGradient id="resignGrad1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#8C257C" stopOpacity={1} />
                    <stop offset="100%" stopColor="#8C257C" stopOpacity={0.7} />
                  </linearGradient>
                  <linearGradient id="resignGrad2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#F58E35" stopOpacity={1} />
                    <stop offset="100%" stopColor="#F58E35" stopOpacity={0.7} />
                  </linearGradient>
                  <linearGradient id="resignGrad3" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#FF7043" stopOpacity={1} />
                    <stop offset="100%" stopColor="#FF7043" stopOpacity={0.7} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e0e0e0" />
                <XAxis dataKey="name" stroke="#999" />
                <YAxis stroke="#999" />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="accepted" stackId="resignation" fill="url(#resignGrad1)" name="Accepted" />
                <Bar dataKey="exitProceed" stackId="resignation" fill="url(#resignGrad2)" name="Exit Proceed" />
                <Bar dataKey="ffProceed" stackId="resignation" fill="url(#resignGrad3)" name="F&F Proceed" />
                <Legend />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Grid>

        {/* Graph 5: Employee Level Distribution - Donut Chart */}
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              borderRadius: 3,
              p: 3,
              height: "100%",
              boxShadow: modernTheme.cardShadow,
              transition: "transform 0.3s",
              "&:hover": { transform: "translateY(-5px)" },
            }}
          >
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", mb: 2, color: "text.primary" }}
            >
              Employee Level Distribution
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={employeeLevelData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={3}
                  dataKey="value"
                  label={({ name, value }) => `${name} ${value}%`}
                >
                  {employeeLevelData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={employeeLevelColors[index]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value}%`} />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Grid>

        {/* Graph 6: Employees vs Department - Composite Line & Bar Chart */}
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              borderRadius: 3,
              p: 3,
              height: "100%",
              boxShadow: modernTheme.cardShadow,
              transition: "transform 0.3s",
              "&:hover": { transform: "translateY(-5px)" },
            }}
          >
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", mb: 2, color: "text.primary" }}
            >
              Employees vs Department Wise %
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <ResponsiveContainer width="100%" height={300}>
              <ComposedChart data={employeeVsDepartmentData}>
                <defs>
                  <linearGradient id="deptGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={modernTheme.primary} stopOpacity={1} />
                    <stop offset="100%" stopColor={modernTheme.secondary} stopOpacity={0.8} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e0e0e0" />
                <XAxis dataKey="name" stroke="#999" />
                <YAxis stroke="#999" />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="percentage" fill="url(#deptGrad)" radius={[8, 8, 0, 0]} name="% of Employees" />
                <LineChart data={employeeVsDepartmentData}>
                  <Line
                    type="monotone"
                    dataKey="count"
                    stroke={modernTheme.primary}
                    strokeWidth={2}
                    name="Employee Count"
                  />
                </LineChart>
                <Legend />
              </ComposedChart>
            </ResponsiveContainer>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
