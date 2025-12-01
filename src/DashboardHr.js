import React, { useState } from "react";
import { Box, CssBaseline } from "@mui/material";
import { styled } from "@mui/material/styles";
import SidebarHr from "./viewshr/SidebarHr";
import TopBarHr from "./viewshr/TopBarHr";
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
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
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
  const [open, setOpen] = useState(true);

  const toggleDrawer = () => setOpen(!open);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <TopBarHr open={open} toggleDrawer={toggleDrawer} />
      <SidebarHr
        open={open}
        toggleDrawer={toggleDrawer}
        drawerWidth={drawerWidth}
      />
      <Main open={open}>
        <DrawerHeader />
        <Box sx={{ mt: 3 }}>
          {/* The Outlet will render the currently matched child route */}
          <Outlet />
        </Box>
      </Main>
    </Box>
  );
}
