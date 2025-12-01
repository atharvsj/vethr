// import React, { useState } from "react";
// import { useParams, useNavigate } from "react-router-dom"; // ✅ include useNavigate
// import {
//   Box,
//   Tabs,
//   Tab,
//   Typography,
//   Toolbar,
//   AppBar,
//   Paper,
//   IconButton,
// } from "@mui/material";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack"; // ✅ import back arrow
// import Phase1 from "./Phase1";
// import Phase2 from "./Phase2";
// import Phase3 from "./Phase3";
// import Phase4 from "./Phase4";
// import OverallAnalysis from "./OverallAnalysis";

// const MarksHead = () => {
//   const { id } = useParams();
//   const navigate = useNavigate(); // ✅ navigation hook
//   const [activeTab, setActiveTab] = useState(0);

//   const handleTabChange = (event, newValue) => {
//     setActiveTab(newValue);
//   };

//   const renderTabContent = () => {
//     switch (activeTab) {
//       case 0: return <Phase1 employeeId={id} />;
//       case 1: return <Phase2 employeeId={id} />;
//       case 2: return <Phase3 employeeId={id} />;
//       case 3: return <Phase4 employeeId={id} />;
//       case 4: return <OverallAnalysis employeeId={id} />;
//       default: return null;
//     }
//   };

//   return (
//     <Box sx={{ backgroundColor: "#fafafa", minHeight: "100vh" }}>
//       {/* Top Bar with Back Button and Title */}
//       <Box sx={{ mb: 3 }}>
//         <AppBar
//           position="static"
//           sx={{ backgroundColor: "#ffffff", color: "#0d47a1", boxShadow: 2 }}
//         >
//           <Toolbar>
//             {/* 🔙 Back Button */}
//             <IconButton
//               edge="start"
//               color="inherit"
//               onClick={() => navigate("/hrms/admindashboard/performanceTable")}
//               sx={{ mr: 2 }}
//             >
//               <ArrowBackIcon />
//             </IconButton>

//             <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 600 }}>
//               Employee Performance - ID: {id}
//             </Typography>
//           </Toolbar>
//         </AppBar>

//         <Box
//           sx={{
//             borderBottom: 1,
//             borderColor: "divider",
//             bgcolor: "#f5f5f5",
//             px: 2,
//             pt: 2,
//           }}
//         >
//           <Paper elevation={2} sx={{ borderRadius: 2, p: 1 }}>
//             <Tabs
//               value={activeTab}
//               onChange={handleTabChange}
//               textColor="primary"
//               indicatorColor="primary"
//               centered
//             >
//               <Tab label="Phase 1" sx={{ fontWeight: 600 }} />
//               <Tab label="Phase 2" sx={{ fontWeight: 600 }} />
//               <Tab label="Phase 3" sx={{ fontWeight: 600 }} />
//               <Tab label="Phase 4" sx={{ fontWeight: 600 }} />
//               <Tab label="Overall Analysis" sx={{ fontWeight: 600 }} />
//             </Tabs>
//           </Paper>
//         </Box>
//       </Box>

//       {/* Tab Content */}
//       <Box px={3} pb={4}>
//         {renderTabContent()}
//       </Box>
//     </Box>
//   );
// };

// export default MarksHead;
 