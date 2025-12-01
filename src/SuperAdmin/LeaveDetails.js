// // // LeaveDetails.jsx
// // import React from "react";
// // import {
// //   Box,
// //   Typography,
// //   Grid,
// //   Paper,
// //   TextField,
// //   Button,
// //   LinearProgress,
// //   IconButton, // Import IconButton for the back button
// //   Tooltip,    // Import Tooltip for better UX
// // } from "@mui/material";
// // import {
// //   Person,
// //   Event,
// //   InsertDriveFile,
// //   CalendarToday,
// //   CalendarMonth,
// //   BarChart,
// //   ArrowBack as ArrowBackIcon, // Import the back arrow icon
// // } from "@mui/icons-material";
// // // Import useLocation to receive data and useNavigate to go back
// // import { useLocation, useNavigate } from "react-router-dom";

// // const LeaveDetails = () => {
// //   const location = useLocation();
// //   const navigate = useNavigate(); // Initialize useNavigate
// //   const leave = location.state?.leaveRecord;

// //   // If user navigates directly to this URL or data is missing, show an error.
// //   if (!leave) {
// //     return (
// //       <Box p={3}>
// //         <Paper elevation={2} sx={{ p: 3 }}>
// //           <Typography variant="h6" color="error">Leave record not found.</Typography>
// //           <Typography>Please go back to the leave list and select a record to view.</Typography>
// //           <Button
// //             variant="outlined"
// //             startIcon={<ArrowBackIcon />}
// //             onClick={() => navigate(-1)}
// //             sx={{ mt: 2 }}
// //           >
// //             Go Back
// //           </Button>
// //         </Paper>
// //       </Box>
// //     );
// //   }

// //   return (
// //     <Box p={2}>
// //       <Grid container spacing={2}>
// //         <Grid item xs={12} md={8}>
// //           <Paper elevation={1} sx={{ p: 2 }}>
// //             {/* === CHANGE: ADDED A HEADER WITH A BACK BUTTON === */}
// //             <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
// //               <Typography variant="h6" fontWeight="bold">
// //                 Leave Details
// //               </Typography>
// //               <Tooltip title="Back to Leave List">
// //                 <Button
// //                   variant="outlined"
// //                   startIcon={<ArrowBackIcon />}
// //                   onClick={() => navigate(-1)}
// //                 >
// //                   Back
// //                 </Button>
// //               </Tooltip>
// //             </Box>
// //             {/* ============================================== */}

// //             <Box display="flex" alignItems="center" mb={1}><Person sx={{ mr: 1, color: 'text.secondary' }} /><Typography>Employee: <strong>{leave.name}</strong></Typography></Box>
// //             <Box display="flex" alignItems="center" mb={1}><Event sx={{ mr: 1, color: 'text.secondary' }} /><Typography>Leave Type: <strong>{leave.leaveType}</strong></Typography></Box>
// //             <Box display="flex" alignItems="center" mb={1}><CalendarToday sx={{ mr: 1, color: 'text.secondary' }} /><Typography>Applied On: <strong>{leave.appliedOn}</strong></Typography></Box>
// //             <Box display="flex" alignItems="center" mb={1}><CalendarToday sx={{ mr: 1, color: 'text.secondary' }} /><Typography>Start Date: <strong>{leave.duration.split(' To ')[0]}</strong></Typography></Box>
// //             <Box display="flex" alignItems="center" mb={1}><CalendarMonth sx={{ mr: 1, color: 'text.secondary' }} /><Typography>End Date: <strong>{leave.duration.split(' To ')[1]}</strong></Typography></Box>
// //             <Box display="flex" alignItems="center" mb={1}><InsertDriveFile sx={{ mr: 1, color: 'text.secondary' }} /><Typography>Attachment: <strong>—</strong></Typography></Box>
// //             <Box display="flex" alignItems="center" mb={2}><BarChart sx={{ mr: 1, color: 'text.secondary' }} /><Typography>Total Days: <strong>{leave.days}</strong></Typography></Box>
// //             <Typography variant="subtitle2" gutterBottom>Status</Typography>
// //             <Box display="flex" alignItems="center" mb={1}>
// //               <Typography color="primary" sx={{ width: '80px' }}>{leave.status}</Typography>
// //               <Box width="100%" mr={1}>
// //                 <LinearProgress
// //                   variant="determinate"
// //                   color={leave.status === "Pending" ? "warning" : leave.status === "Approved" ? "success" : "error"}
// //                   value={100}
// //                   sx={{ height: 10, borderRadius: 5 }}
// //                 />
// //               </Box>
// //             </Box>
// //             <TextField fullWidth label="Remarks" variant="outlined" size="small" multiline rows={2} placeholder="Add remarks..." sx={{ my: 2 }} />
// //             <Button variant="contained" color="primary">
// //               Update Status
// //             </Button>
// //           </Paper>
// //         </Grid>

// //         <Grid item xs={12} md={4}>
// //           <Grid container spacing={2}>
// //             <Grid item xs={12}>
// //               <Paper elevation={1} sx={{ p: 2 }}>
// //                 <Typography variant="h6" fontWeight="bold" gutterBottom>
// //                   Leave Reason
// //                 </Typography>
// //                 <Typography>{leave.reason || "No reason provided."}</Typography>
// //               </Paper>
// //             </Grid>
// //             <Grid item xs={12}>
// //               <Paper elevation={1} sx={{ p: 2 }}>
// //                 <Typography variant="h6" fontWeight="bold" gutterBottom>
// //                   Leave Statistics
// //                 </Typography>
// //                 {["CL (0/7)", "PL (0/21)", "SL (0/5)"].map((stat, index) => (
// //                   <Box key={index} mb={1}>
// //                     <Typography variant="body2" gutterBottom>{stat}</Typography>
// //                     <LinearProgress variant="determinate" value={0} sx={{ height: 6, borderRadius: 3 }} />
// //                   </Box>
// //                 ))}
// //               </Paper>
// //             </Grid>
// //           </Grid>
// //         </Grid>
// //       </Grid>
// //     </Box>
// //   );
// // };

// // export default LeaveDetails;


// import React, { useState } from "react";
// import {
//   Box,
//   Typography,
//   Grid,
//   Paper,
//   TextField,
//   Button,
//   LinearProgress,
//   Tooltip,
// } from "@mui/material";
// import {
//   Person,
//   Event,
//   InsertDriveFile,
//   CalendarToday,
//   CalendarMonth,
//   BarChart,
//   ArrowBack as ArrowBackIcon,
// } from "@mui/icons-material";
// import { useLocation, useNavigate } from "react-router-dom";

// const LeaveDetails = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   // Get just the leave record from state. We no longer need the onUpdate function.
//   const leave = location.state?.leaveRecord;

//   const [status, setStatus] = useState(leave?.status || "Pending");
//   const [remarks, setRemarks] = useState(leave?.remarks || ""); // You can also pass remarks

//   if (!leave) {
//     return (
//       <Box p={3}>
//         <Paper elevation={2} sx={{ p: 3 }}>
//           <Typography variant="h6" color="error">Leave record not found.</Typography>
//           <Typography>Please go back to the leave list and select a record to view.</Typography>
//           <Button
//             variant="outlined"
//             startIcon={<ArrowBackIcon />}
//             onClick={() => navigate(-1)}
//             sx={{ mt: 2 }}
//           >
//             Go Back
//           </Button>
//         </Paper>
//       </Box>
//     );
//   }

//   const getStatusColor = (value) => {
//     switch (value) {
//       case "Pending": return "orange";
//       case "Approved": return "green";
//       case "Rejected": return "red";
//       default: return "gray";
//     }
//   };

//   // ==================== THE FIX: NAVIGATE BACK WITH DATA ====================

//   const handleUpdateStatus = () => {
//     // 1. Create the updated record object with the new status
//     const updatedRecord = {
//       ...leave,
//       status: status,
//       // Optional: you can add the admin remarks to the record
//       // reason: `${leave.reason}\n\nAdmin Remarks: ${remarks}`
//     };

//     // 2. Navigate back to the previous page (the list) and pass
//     // the updatedRecord in the state. This is allowed because it's a plain object.
//     navigate(-1, {
//       state: {
//         updatedRecord: updatedRecord,
//       },
//     });
//   };
//   // =========================================================================

//   const handleClickStatus = (newStatus) => {
//     setStatus(newStatus);
//   };

//   return (
//     <Box p={2}>
//       <Grid container spacing={2}>
//         <Grid item xs={12} md={8}>
//           <Paper elevation={1} sx={{ p: 2 }}>
//             <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
//               <Typography variant="h6" fontWeight="bold">Leave Details</Typography>
//               <Tooltip title="Back to Leave List">
//                 <Button variant="outlined" startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)}>
//                   Back
//                 </Button>
//               </Tooltip>
//             </Box>
//             {/* ... rest of the JSX is unchanged ... */}
//             <Box display="flex" alignItems="center" mb={1}><Person sx={{ mr: 1, color: 'text.secondary' }} /><Typography>Employee: <strong>{leave.name}</strong></Typography></Box>
//             <Box display="flex" alignItems="center" mb={1}><Event sx={{ mr: 1, color: 'text.secondary' }} /><Typography>Leave Type: <strong>{leave.leaveType}</strong></Typography></Box>
//             <Box display="flex" alignItems="center" mb={1}><CalendarToday sx={{ mr: 1, color: 'text.secondary' }} /><Typography>Applied On: <strong>{leave.appliedOn}</strong></Typography></Box>
//             <Box display="flex" alignItems="center" mb={1}><CalendarToday sx={{ mr: 1, color: 'text.secondary' }} /><Typography>Start Date: <strong>{leave.duration.split(' To ')[0]}</strong></Typography></Box>
//             <Box display="flex" alignItems="center" mb={1}><CalendarMonth sx={{ mr: 1, color: 'text.secondary' }} /><Typography>End Date: <strong>{leave.duration.split(' To ')[1]}</strong></Typography></Box>
//             <Box display="flex" alignItems="center" mb={1}><InsertDriveFile sx={{ mr: 1, color: 'text.secondary' }} /><Typography>Attachment: <strong>—</strong></Typography></Box>
//             <Box display="flex" alignItems="center" mb={2}><BarChart sx={{ mr: 1, color: 'text.secondary' }} /><Typography>Total Days: <strong>{leave.days}</strong></Typography></Box>
//             <Typography variant="subtitle2" gutterBottom>Status</Typography>
//             <Box display="flex" alignItems="center" gap={1} mb={2}>
//               <Box sx={{ display: 'flex', gap: 0.5 }}>
//                 <Tooltip title="Pending"><Box onClick={() => handleClickStatus("Pending")} sx={{ width: 30, height: 10, bgcolor: 'orange', borderRadius: 1, cursor: 'pointer' }} /></Tooltip>
//                 <Tooltip title="Approved"><Box onClick={() => handleClickStatus("Approved")} sx={{ width: 30, height: 10, bgcolor: 'green', borderRadius: 1, cursor: 'pointer' }} /></Tooltip>
//                 <Tooltip title="Rejected"><Box onClick={() => handleClickStatus("Rejected")} sx={{ width: 30, height: 10, bgcolor: 'red', borderRadius: 1, cursor: 'pointer' }} /></Tooltip>
//               </Box>
//               <Typography variant="body2" sx={{ color: getStatusColor(status), fontWeight: 500, ml: 1 }}>{status}</Typography>
//             </Box>
//             <TextField fullWidth label="Remarks" variant="outlined" size="small" multiline rows={2} placeholder="Add remarks..." value={remarks} onChange={(e) => setRemarks(e.target.value)} sx={{ my: 2 }} />
//             <Button variant="contained" color="success" onClick={handleUpdateStatus} fullWidth>Update Status</Button>
//           </Paper>
//         </Grid>
//         <Grid item xs={12} md={4}>
//           <Grid container spacing={2}>
//             <Grid item xs={12}><Paper elevation={1} sx={{ p: 2 }}><Typography variant="h6" fontWeight="bold" gutterBottom>Leave Reason</Typography><Typography>{leave.reason || "No reason provided."}</Typography></Paper></Grid>
//             <Grid item xs={12}><Paper elevation={1} sx={{ p: 2 }}><Typography variant="h6" fontWeight="bold" gutterBottom>Leave Statistics</Typography>{["CL (0/7)", "PL (0/21)", "SL (0/5)"].map((stat, index) => (<Box key={index} mb={1}><Typography variant="body2" gutterBottom>{stat}</Typography><LinearProgress variant="determinate" value={0} sx={{ height: 6, borderRadius: 3 }} /></Box>))}</Paper></Grid>
//           </Grid>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// export default LeaveDetails;


import React from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Button,
  Tooltip,
} from "@mui/material";
import {
  Person,
  Event,
  InsertDriveFile,
  CalendarToday,
  CalendarMonth,
  BarChart,
  ArrowBack as ArrowBackIcon,
} from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";

const LeaveDetails = () => {
  const { state } = useLocation();
  const leave = state?.leaveRecord;
  const navigate = useNavigate();

  // Format date safely
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      return isNaN(date.getTime()) ? dateString : date.toLocaleDateString();
    } catch {
      return dateString;
    }
  };

  if (!leave) {
    return (
      <Box p={3}>
        <Paper elevation={2} sx={{ p: 3 }}>
          <Typography variant="h6" color="error">
            Leave record not found.
          </Typography>
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate(-1)}
            sx={{ mt: 2 }}
          >
            Go Back
          </Button>
        </Paper>
      </Box>
    );
  }

  return (
    <Box p={2}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Paper elevation={1} sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" fontWeight="bold">Leave Details</Typography>
              <Tooltip title="Back to Leave List">
                <Button variant="outlined" startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)}>
                  Back
                </Button>
              </Tooltip>
            </Box>

            <Box display="flex" alignItems="center" mb={1}>
              <Person sx={{ mr: 1 }} />
              <Typography>Employee: <strong>{leave.employee_name || 'N/A'}</strong></Typography>
            </Box>

            <Box display="flex" alignItems="center" mb={1}>
              <Event sx={{ mr: 1 }} />
              <Typography>Leave Type: <strong>{leave.leave_type || 'N/A'}</strong></Typography>
            </Box>

            <Box display="flex" alignItems="center" mb={1}>
              <CalendarToday sx={{ mr: 1 }} />
              <Typography>Start Date: <strong>{formatDate(leave.from_date)}</strong></Typography>
            </Box>

            <Box display="flex" alignItems="center" mb={1}>
              <CalendarMonth sx={{ mr: 1 }} />
              <Typography>End Date: <strong>{formatDate(leave.to_date)}</strong></Typography>
            </Box>

            <Box display="flex" alignItems="center" mb={1}>
              <InsertDriveFile sx={{ mr: 1 }} />
              <Typography>Attachment: <strong>—</strong></Typography>
            </Box>

            <Box display="flex" alignItems="center" mb={2}>
              <BarChart sx={{ mr: 1 }} />
              <Typography>Total Days: <strong>{leave.leave_days || 'N/A'}</strong></Typography>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper elevation={1} sx={{ p: 2 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Leave Reason
            </Typography>
            <Typography>
              {leave.reason || 'No reason provided'}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LeaveDetails;