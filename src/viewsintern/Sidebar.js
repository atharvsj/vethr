import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Divider,
  Collapse,
  Box,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import HomeIcon from "@mui/icons-material/Home";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import GroupIcon from "@mui/icons-material/Group";
import WorkIcon from "@mui/icons-material/Work";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { useNavigate, useLocation } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
import AssignmentIcon from "@mui/icons-material/Assignment";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import HelpIcon from "@mui/icons-material/Help";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import TopicIcon from "@mui/icons-material/Topic";
import PaymentIcon from "@mui/icons-material/Payment";
import AssignmentLateIcon from "@mui/icons-material/AssignmentLate";

export default function Sidebar({ open, toggleDrawer, drawerWidth }) {
  const [attendanceOpen, setAttendanceOpen] = useState(false);
  const [leaveOpen, setLeaveOpen] = useState(false);
  const [AppsOpen, setAppsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLeaveClick = () => {
    setLeaveOpen(!leaveOpen);
  };

  const handleAttendanceClick = () => {
    setAttendanceOpen(!attendanceOpen);
  };

  const handleAppsClick = () => {
    setAppsOpen(!AppsOpen);
  };

  const handleNavigation = (route) => {
    navigate(route);
  };

  // Function to check if the current route matches the section for active state
  const isActive = (route) => location.pathname === route;

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      variant="persistent"
      anchor="left"
      open={open}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          p: 1,
          minHeight: 64,
        }}
      >
        <IconButton onClick={toggleDrawer}>
          <ChevronLeftIcon />
        </IconButton>
      </Box>
      <Divider />
      <List>
        {/* Home Item */}
        <ListItem
          button
          onClick={() => handleNavigation("/interndashboard/home")}
          selected={isActive("/interndashboard/home")}
        >
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>

        {/* Attendance Dropdown */}

        <ListItem button onClick={handleAttendanceClick}>
          <ListItemIcon>
            <CalendarTodayIcon />
          </ListItemIcon>
          <ListItemText primary="Attendance" />
          {attendanceOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={attendanceOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem
              button
              sx={{ pl: 4 }}
              onClick={() => handleNavigation("/interndashboard/attendance")}
              selected={isActive("/interndashboard/attendance")}
            >
              <ListItemText primary="Attendance" />
            </ListItem>

            <ListItem
              button
              sx={{ pl: 4 }}
              onClick={() =>
                handleNavigation("/interndashboard/monthly-report")
              }
              selected={isActive("/interndashboard/monthly-report")}
            >
              <ListItemText primary="Monthly Report" />
            </ListItem>
          </List>
        </Collapse>

        {/* Holiday */}

        <ListItem
          button
          onClick={() => handleNavigation("/interndashboard/holiday")}
          selected={isActive("/interndashboard/holiday")}
        >
          <ListItemIcon>
            <StarIcon />
          </ListItemIcon>
          <ListItemText primary="Holiday" />
        </ListItem>

        {/* Project */}

        <ListItem
          button
          onClick={() => handleNavigation("/interndashboard/projects")}
          selected={isActive("/interndashboard/projects")}
        >
          <ListItemIcon>
            <AssignmentIcon />
          </ListItemIcon>
          <ListItemText primary="Project" />
        </ListItem>

        {/* Task */}

        <ListItem
          button1111
          onClick={() => handleNavigation("/interndashboard/tasks")}
          selected={isActive("/interndashboard/tasks")}
        >
          <ListItemIcon>
            <WorkIcon />
          </ListItemIcon>
          <ListItemText primary="Task" />
        </ListItem>


        {/* Disciplinary */}
        <ListItem
          button
          onClick={() => handleNavigation("/interndashboard/disciplinary")}
          selected={isActive("/interndashboard/disciplinary")}
        >
          <ListItemIcon>
            <AssignmentLateIcon />
          </ListItemIcon>
          <ListItemText primary="Disciplinary Cases" />
        </ListItem>


        {/* Helpdesk */}
        <ListItem
          button
          onClick={() => handleNavigation("/interndashboard/helpdesk")}
          selected={isActive("/interndashboard/helpdesk")}
        >
          <ListItemIcon>
            <HelpIcon />
          </ListItemIcon>
          <ListItemText primary="Helpdesk" />
        </ListItem>

      </List>
    </Drawer>
  );
}
