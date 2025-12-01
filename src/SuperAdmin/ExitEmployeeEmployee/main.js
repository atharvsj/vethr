
// import { useState } from "react"
// import { ThemeProvider, createTheme } from "@mui/material/styles"
// import CssBaseline from "@mui/material/CssBaseline"
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
// import {
//   Box,
//   AppBar,
//   Toolbar,
//   Typography,
//   Drawer,
//   List,
//   ListItem,
//   ListItemIcon,
//   ListItemText,
//   ListItemButton,
// } from "@mui/material"
// import { Dashboard, ExitToApp, Delete, Inventory } from "@mui/icons-material"

// // Import components
// import ExitDashboard from "./ExitDashboard"
// import TerminationDashboard from "./TerminationDashboard"
// import AssetDashboard from "./AssetDashboard"  
// import EmployeeExitProcess from "./EmployeeExitProcess"

// const theme = createTheme({
//   palette: {
//     primary: {
//       main: "#1976d2",
//     },
//     secondary: {
//       main: "#dc004e",
//     },
//   },
// })

// const drawerWidth = 240

// const menuItems = [
//   { text: "Exit Dashboard", icon: <ExitToApp />, path: "/exitdashboard" },
//   { text: "Termination Dashboard", icon: <Delete />, path: "/termination" },
//   { text: "Asset Dashboard", icon: <Inventory />, path: "/assetdashboard" },
//   { text: "Employee Exit Process", icon: <Dashboard />, path: "/employeeexitprocess" },
// ]

// function Main() {
//   const [selectedMenu, setSelectedMenu] = useState("/exitdashboard")

//   return (
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
//       <Router>
//         <Box sx={{ display: "flex" }}>
//           <AppBar position="fixed" sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}>
//             <Toolbar>
//               <Typography variant="h6" noWrap component="div">
//                 HR Exit Management System
//               </Typography>
//             </Toolbar>
//           </AppBar>

//           <Drawer
//             sx={{
//               width: drawerWidth,
//               flexShrink: 0,
//               "& .MuiDrawer-paper": {
//                 width: drawerWidth,
//                 boxSizing: "border-box",
//               },
//             }}
//             variant="permanent"
//             anchor="left"
//           >
//             <Toolbar />
//             <Box sx={{ overflow: "auto" }}>
//               <List>
//                 {menuItems.map((item) => (
//                   <ListItem key={item.text} disablePadding>
//                     <ListItemButton
//                       selected={selectedMenu === item.path}
//                       onClick={() => setSelectedMenu(item.path)}
//                       component="a"
//                       href={item.path}
//                     >
//                       <ListItemIcon>{item.icon}</ListItemIcon>
//                       <ListItemText primary={item.text} />
//                     </ListItemButton>
//                   </ListItem>
//                 ))}
//               </List>
//             </Box>
//           </Drawer>

//           <Box component="main" sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}>
//             <Toolbar />
//             <Routes>
//               <Route path="/mainemployeeexit" element={<Navigate to="/exitdashboard" replace />} />
//               <Route path="/exitdashboard" element={<ExitDashboard />} />
//               <Route path="/termination" element={<TerminationDashboard />} />
//               <Route path="/assetdashboard" element={<AssetDashboard />} />
//               <Route path="/employeeexitprocess" element={<EmployeeExitProcess />} />
//             </Routes>
//           </Box>
//         </Box>
//       </Router>
//     </ThemeProvider>
//   )
// }

// export default Main




import React, { useState } from "react";
import {
  Box,
  Card,
  CardActionArea,
  Typography,
  Grid,
  Fade,
  useTheme,
  alpha,
  ThemeProvider,
  createTheme,
  CssBaseline,
} from "@mui/material";

// Import Icons
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';
import DoNotDisturbAltOutlinedIcon from '@mui/icons-material/DoNotDisturbAltOutlined';

// --- Placeholder Components ---
// In a real application, these would be imported from separate files.

const EmployeeExit = () => (
  <Typography variant="h5" component="div">
    Employee Exit Process Component
  </Typography>
);
const ExitDashboard = () => (
  <Typography variant="h5" component="div">
    Exit Dashboard Component
  </Typography>
);
const AssetDashboard = () => (
  <Typography variant="h5" component="div">
    Asset Dashboard Component
  </Typography>
);
const Termination = () => (
  <Typography variant="h5" component="div">
    Termination Management Component
  </Typography>
);


// --- Main Dashboard Options ---

const options = [
  {
    label: "Employee Exit",
    sublabel: "Start the exit process",
    icon: <ExitToAppOutlinedIcon fontSize="large" />,
  },
  {
    label: "Exit Dashboard",
    sublabel: "View exit statuses",
    icon: <DashboardOutlinedIcon fontSize="large" />,
  },
  {
    label: "Asset Dashboard",
    sublabel: "Track returned assets",
    icon: <InventoryOutlinedIcon fontSize="large" />,
  },
  {
    label: "Termination",
    sublabel: "Manage terminations",
    icon: <DoNotDisturbAltOutlinedIcon fontSize="large" />,
  },
];


const HRDashboard = () => {
  const [selectedOption, setSelectedOption] = useState("Employee Exit");
  const theme = useTheme();
  const customPrimaryColor = theme.palette.primary.main;

  const renderComponent = () => {
    switch (selectedOption) {
      case "Employee Exit":
        return <EmployeeExit />;
      case "Exit Dashboard":
        return <ExitDashboard />;
      case "Asset Dashboard":
        return <AssetDashboard />;
      case "Termination":
        return <Termination />;
      default:
        return <Typography>Please select an option.</Typography>;
    }
  };

  return (
    <Box p={{ xs: 2, sm: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 4, fontWeight: '600' }}>
        HR Exit Management System
      </Typography>
      <Grid
        container
        spacing={2}
        sx={{
          mb: 4,
          flexWrap: { xs: "nowrap", sm: "wrap" },
          overflowX: { xs: "auto", sm: "hidden" },
          pb: { xs: 2, sm: 0 },
          '&::-webkit-scrollbar': { display: 'none' },
          msOverflowStyle: 'none',
          scrollbarWidth: 'none',
        }}
      >
        {options.map((option) => {
          const isSelected = selectedOption === option.label;
          return (
            <Grid item xs={8} sm={6} md={4} lg={3} key={option.label}>
              <Card
                variant="outlined"
                sx={{
                  height: '100%',
                  textAlign: "center",
                  transition: "all 0.3s ease-in-out",
                  backgroundColor: isSelected ? alpha(customPrimaryColor, 0.08) : 'background.paper',
                  borderColor: isSelected ? customPrimaryColor : theme.palette.divider,
                  boxShadow: isSelected
                    ? `0 4px 12px ${alpha(customPrimaryColor, 0.2)}`
                    : "0 1px 3px rgba(0,0,0,0.05)",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: `0 6px 16px ${alpha(customPrimaryColor, 0.25)}`,
                    borderColor: customPrimaryColor,
                  },
                }}
              >
                <CardActionArea
                  onClick={() => setSelectedOption(option.label)}
                  sx={{
                    height: "100%",
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                  }}
                >
                  <Box color={isSelected ? customPrimaryColor : 'text.secondary'} mb={1.5}>
                    {option.icon}
                  </Box>
                  <Typography
                    variant="subtitle1"
                    fontWeight="600"
                    color={isSelected ? customPrimaryColor : 'text.primary'}
                  >
                    {option.label}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {option.sublabel}
                  </Typography>
                </CardActionArea>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      <Box
        sx={{
          p: { xs: 2, sm: 3 },
          backgroundColor: "background.paper",
          borderRadius: 3,
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        }}
      >
        <Fade in timeout={400} key={selectedOption}>
          <div>{renderComponent()}</div>
        </Fade>
      </Box>
    </Box>
  );
};


const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
    background: {
      default: '#f4f6f8',
    },
  },
});

function Main() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <HRDashboard />
    </ThemeProvider>
  );
}

export default Main;