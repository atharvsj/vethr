// // import React, { useState } from "react";
// // import { Box, CssBaseline } from "@mui/material";
// // import { styled } from "@mui/material/styles";
// // import Sidebar from "./viewsSuperAdmin/Sidebar";
// // import TopBar from "./viewsSuperAdmin/TopBar";
// // import { Outlet } from "react-router-dom"; // Outlet for rendering child routes

// // const drawerWidth = 240;

// // const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
// //   ({ theme, open }) => ({
// //     flexGrow: 1,
// //     padding: theme.spacing(3),
// //     transition: theme.transitions.create("margin", {
// //       easing: theme.transitions.easing.sharp,
// //       duration: theme.transitions.duration.leavingScreen,
// //     }),
// //     marginLeft: `-${drawerWidth}px`,
// //     ...(open && {
// //       transition: theme.transitions.create("margin", {
// //         easing: theme.transitions.easing.easeOut,
// //         duration: theme.transitions.duration.enteringScreen,
// //       }),
// //       marginLeft: 0,
// //     }),
// //   })
// // );

// // const DrawerHeader = styled("div")(({ theme }) => ({
// //   display: "flex",
// //   alignItems: "center",
// //   padding: theme.spacing(0, 1),
// //   ...theme.mixins.toolbar,
// //   justifyContent: "flex-end",
// // }));

// // export default function Dashboard() {
// //   // Change the initial state of 'open' to true
// //   const [open, setOpen] = useState(true);
// //   const toggleDrawer = () => setOpen(!open);

// //   return (
// //     <Box sx={{ display: "flex" }}>
// //       <CssBaseline />
// //       <TopBar open={open} toggleDrawer={toggleDrawer} />
// //       <Sidebar
// //         open={open}
// //         toggleDrawer={toggleDrawer}
// //         drawerWidth={drawerWidth}
// //       />
// //       <Main open={open}>
// //         <DrawerHeader />
// //         <Box sx={{ mt: 3 }}>
// //           {/* The Outlet will render the currently matched child route */}
// //           <Outlet />
// //         </Box>
// //       </Main>
// //     </Box>
// //   );
// // }




// import React, { useState, useEffect } from "react";
// import { Box, CssBaseline, useMediaQuery } from "@mui/material";
// import { styled, useTheme } from "@mui/material/styles";
// import Sidebar from "./viewsSuperAdmin/Sidebar";
// import TopBar from "./viewsSuperAdmin/TopBar";
// import { Outlet } from "react-router-dom"; // Outlet for rendering child routes

// const drawerWidth = 240;

// const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
//   ({ theme, open }) => ({
//     flexGrow: 1,
//     padding: theme.spacing(3),
//     transition: theme.transitions.create("margin", {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.leavingScreen,
//     }),
//     marginLeft: `-${drawerWidth}px`, // Default for desktop
    
//     ...(open && {
//       transition: theme.transitions.create("margin", {
//         easing: theme.transitions.easing.easeOut,
//         duration: theme.transitions.duration.enteringScreen,
//       }),
//       marginLeft: 0,
//     }),

//     // Add this media query to handle mobile view
//     [theme.breakpoints.down("md")]: {
//       marginLeft: 0, // Reset margin for mobile
//       padding: theme.spacing(2), // Optionally reduce padding on smaller screens
//     },
//   })
// );

// const DrawerHeader = styled("div")(({ theme }) => ({
//   display: "flex",
//   alignItems: "center",
//   padding: theme.spacing(0, 1),
//   ...theme.mixins.toolbar,
//   justifyContent: "flex-end",
// }));

// export default function Dashboard() {
//   const theme = useTheme();
//   // Detect if screen is tablet or smaller
//   const isTabletOrSmaller = useMediaQuery(theme.breakpoints.down("md"));

//   // Sidebar open state based on screen size
//   const [open, setOpen] = useState(!isTabletOrSmaller);

//   // Update sidebar state when screen size changes
//   useEffect(() => {
//     setOpen(!isTabletOrSmaller);
//   }, [isTabletOrSmaller]);

//   const toggleDrawer = () => setOpen((prev) => !prev);

//   return (
//     <Box >
//       <CssBaseline />
//       <TopBar open={open} toggleDrawer={toggleDrawer} />
//       <Sidebar open={open} toggleDrawer={toggleDrawer} drawerWidth={drawerWidth} />
//       <Main open={open} sx={{overflow:'hidden'}}>
//         <DrawerHeader />
//         <Box sx={{ mt: 3 }}>
//           {/* The Outlet will render the currently matched child route */}
//           <Outlet />
//         </Box>
//       </Main>
//     </Box>
//   );
// }


// import React, { useState, useEffect } from "react";
// import { Box, CssBaseline, useMediaQuery } from "@mui/material";
// import { styled, useTheme } from "@mui/material/styles";
// import Sidebar from "./viewsSuperAdmin/Sidebar";
// import TopBar from "./viewsSuperAdmin/TopBar";
// import { Outlet } from "react-router-dom";

// const drawerWidth = 240;

// const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
//   ({ theme, open }) => ({
//     flexGrow: 1,
//     padding: theme.spacing(3),
//     transition: theme.transitions.create("margin", {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.leavingScreen,
//     }),
//     marginLeft: `-${drawerWidth}px`,
//     minWidth: 0, // CRITICAL: Allows the flex container to shrink

//     ...(open && {
//       transition: theme.transitions.create("margin", {
//         easing: theme.transitions.easing.easeOut,
//         duration: theme.transitions.duration.enteringScreen,
//       }),
//       marginLeft: 0,
//     }),

//     [theme.breakpoints.down('md')]: {
//       marginLeft: 0,
//       padding: theme.spacing(2),
//     }
//   })
// );

// const DrawerHeader = styled("div")(({ theme }) => ({
//   display: "flex",
//   alignItems: "center",
//   padding: theme.spacing(0, 1),
//   ...theme.mixins.toolbar,
//   justifyContent: "flex-end",
// }));

// export default function Dashboard() {
//   const theme = useTheme();
//   const isTabletOrSmaller = useMediaQuery(theme.breakpoints.down("md"));
//   const [open, setOpen] = useState(!isTabletOrSmaller);

//   useEffect(() => {
//     setOpen(!isTabletOrSmaller);
//   }, [isTabletOrSmaller]);

//   const toggleDrawer = () => setOpen((prev) => !prev);

//   return (
//     <Box sx={{ display: "flex" }}>
//       <CssBaseline />
//       <TopBar open={open} toggleDrawer={toggleDrawer} />
//       <Sidebar open={open} toggleDrawer={toggleDrawer} drawerWidth={drawerWidth} />
//       <Main open={open}>
//         <DrawerHeader />
//         {/* This Box is now just a simple container */}
//         <Box sx={{ mt: 3, width: '100%' }}>
//           <Outlet />
//         </Box>
//       </Main>
//     </Box>
//   );
// }






import React, { useState, useEffect } from "react";
import { Box, CssBaseline, useMediaQuery } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import Sidebar from "./viewsSuperAdmin/Sidebar";
import TopBar from "./viewsSuperAdmin/TopBar";
import { Outlet } from "react-router-dom";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    minWidth: 0,

    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),

    [theme.breakpoints.down("sm")]: {
      marginLeft: 0,
      padding: theme.spacing(2),
    },
  })
);

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function Dashboard() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // 🔥 only close on mobile
  const [open, setOpen] = useState(!isMobile);

  useEffect(() => {
    setOpen(!isMobile);
  }, [isMobile]);

  const toggleDrawer = () => setOpen((prev) => !prev);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <TopBar open={open} toggleDrawer={toggleDrawer} />
      <Sidebar open={open} toggleDrawer={toggleDrawer} drawerWidth={drawerWidth} />
      <Main open={open}>
        <DrawerHeader />
        <Box sx={{ mt: 3, width: "100%" }}>
          <Outlet />
        </Box>
      </Main>
    </Box>
  );
}
