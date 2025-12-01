import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  Box,
  IconButton,
  Button,
  Typography,
  TextField,
  Card,
  CardContent,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Container,
  Slide,
  Alert,
  TablePagination,
  LinearProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  CircularProgress,
} from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";

import RefreshIcon from "@mui/icons-material/Refresh";
import { ArrowBack } from "@mui/icons-material";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const DailyMonitoringData = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const { state } = useLocation();
  const { id: employeeId, name: employeeName } = state || {};
  const navigate = useNavigate();
  const [isDrawerOpen, setDrawerOpen] = useState(
    JSON.parse(localStorage.getItem("isDrawerOpen")) ?? true
  );

  const [selectedDate, setSelectedDate] = useState(""); // Initialize as empty string
  const currentDate = new Date().toISOString().split("T")[0]; // Current date in YYYY-MM-DD format
  const [apiData, setApiData] = useState(null); // State to hold API data
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  // State for handling the refresh message
  const [showRefreshMessage, setShowRefreshMessage] = useState(false);
  const [page, setPage] = useState(0);
  const rowsPerPage = 20;
  const [selectedFormat, setSelectedFormat] = useState("");

  const handleExportClick = () => {
    setOpenDialog(true); // Open the dialog to choose export format
  };
  const handleCloseDialog = () => {
    setOpenDialog(false); // Close the dialog without exporting
  };

  const handleExport = () => {
    if (selectedFormat) {
      // Filter out invalid activities
      const validActivities = apiData.activities.filter(
        (activity) =>
          !activity.title.includes("Invalid") &&
          !activity.start_time.includes("Invalid") &&
          !activity.end_time.includes("Invalid") &&
          !activity.screen_time.includes("Invalid") &&
          !activity.screenshot_path.includes("Invalid")
      );

      if (selectedFormat === "excel") {
        // Excel Export Logic
        const ws = XLSX.utils.json_to_sheet(validActivities); // Use filtered data
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Activities");
        XLSX.writeFile(wb, "activities.xlsx");
      } else if (selectedFormat === "pdf") {
        // PDF Export Logic
        const doc = new jsPDF();
        // Add content to PDF (title, table, etc.)
        doc.text("Activities Report", 20, 20);
        const tableData = validActivities.map((activity) => [
          activity.title,
          formatTime(activity.start_time),
          formatTime(activity.end_time),
          formatTime(activity.screen_time),
        ]);
        doc.autoTable({
          head: [["Title", "Start Time", "End Time", "Total Time"]],
          body: tableData,
          startY: 30,
        });
        // Save PDF
        doc.save("activities_report.pdf");
      } else if (selectedFormat === "png") {
        // PNG Export Logic
        const table = document.getElementById("activitiesTable"); // Table to capture as PNG
        html2canvas(table).then((canvas) => {
          const imgData = canvas.toDataURL("image/png");
          const link = document.createElement("a");
          link.href = imgData;
          link.download = "activities.png";
          link.click();
        });
      } else {
        console.log("Invalid format selected");
      }
      setOpenDialog(false); // Close the dialog after export
    }
  };
  const handleFormatChange = (event) => {
    setSelectedFormat(event.target.value); // Set the selected format
  };

  useEffect(() => {
    setSelectedDate(currentDate); //  Set current date by default
  }, [currentDate]);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://pmdbackend.tdtlworld.com/api/employee-work-summary/?employee_id=${employeeId}&date=${selectedDate}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const result = await response.json();

      // Filter out invalid activities
      const validActivities = result.employees[0]?.activities?.filter(
        (activity) =>
          !activity.title.includes("Invalid") &&
          !activity.screenshot_path.includes("Invalid")
      );

      setApiData({
        ...result.employees[0],
        activities: validActivities,
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedDate && employeeId) {
      fetchData();
    }
  }, [selectedDate, employeeId]);

  const handleBack = () => {
    navigate("/employeelist"); // Go back to Employee List
  };

  const handleViewReport = () => {
    navigate(`/view-report/${employeeId}`, {
      state: {
        id: employeeId,
        name: employeeName,
      },
    });
  };

  const handleRefresh = () => {
    fetchData();
    setShowRefreshMessage(true); // Show refresh message

    // Hide the message after 1.5 seconds
    setTimeout(() => {
      setShowRefreshMessage(false);
    }, 1000);
  };

  const toggleDrawer = () => {
    const newState = !isDrawerOpen;
    setDrawerOpen(newState);
    localStorage.setItem("isDrawerOpen", JSON.stringify(newState));
  };

  const formatTime = (time) => {
    if (!time) return "";
    const [hours, minutes, seconds] = time.split(":");
    const formattedSeconds = seconds?.split(".")[0]; // Remove milliseconds if present
    return `${hours}:${minutes}:${formattedSeconds}`;
  };

  const formatDuration = (duration) => {
    if (!duration) return "";
    const [hours, minutes] = duration.split(":");
    return `${hours}h ${minutes}m`; // Show only hours and minutes
  };

  // Handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Box display="flex" flexDirection="column">
      
      <Box
        flex={2}
        sx={{
          mt: 8,
          ml: isDrawerOpen ? 30 : 0,
          transition: "0.3s",
        }}
      >
        <Outlet />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Typography
            variant="h4"
            sx={{ textAlign: "center", fontWeight: "bold", color: "#1976d2" }}
          >
            Employee Monitoring Dashboard
          </Typography>
          {/* Action Buttons */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: "space-between",
              mt: 3,
            }}
          >
            <Button
              variant="outlined"
              onClick={handleBack}
              startIcon={<ArrowBack />}
              sx={{
                textTransform: "none",
                fontWeight: "bold",
                mb: { xs: 2, sm: 0 },
              }}
            >
              Back
            </Button>
            <Box sx={{ display: "flex", gap: 2 }}>
              {/* Export Button */}
              <Button
                variant="contained"
                onClick={handleExportClick}
                sx={{ backgroundColor: "#1976d2" }}
              >
                Export Data
              </Button>
              <Button
                variant="contained"
                onClick={handleViewReport}
                sx={{ backgroundColor: "#1976d2" }}
              >
                View Report
              </Button>
              <IconButton
                onClick={handleRefresh}
                sx={{ padding: "8px", color: "blue" }}
              >
                <RefreshIcon />
              </IconButton>
            </Box>
          </Box>
          {/* Refresh Message Banner */}
          <Slide
            direction="right"
            in={showRefreshMessage}
            mountOnEnter
            unmountOnExit
          >
            <Box
              sx={{
                position: "fixed",
                top: "32%",
                right: "85%",
                zIndex: 1300,
              }}
            >
              <Alert severity="info">
                <Typography>Page has been refreshed!</Typography>
              </Alert>
            </Box>
          </Slide>
          {/* Employee Info */}
          <Box sx={{ mt: 3 }}>
            <Card sx={{ boxShadow: 3 }}>
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: "bold", color: "#1976d2" }}
                    >
                      Employee Name:
                    </Typography>
                    <Typography variant="body1" sx={{ color: "#115293" }}>
                      {employeeName}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: "bold", color: "#1976d2" }}
                    >
                      Employee ID:
                    </Typography>
                    <Typography variant="body1" sx={{ color: "#115293" }}>
                      {employeeId}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Box>
          {/* Date Picker */}
          <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Select Date"
                value={dayjs(selectedDate)} // Ensure selectedDate is a dayjs object
                onChange={(newDate) => {
                  if (newDate) setSelectedDate(newDate.format("YYYY-MM-DD")); // Format date as string
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Box>
          {/* Time Stats */}
          {apiData && (
            <Grid container spacing={3} sx={{ mt: 3 }}>
              <Grid item xs={12} sm={4}>
                <Card sx={{ textAlign: "center", boxShadow: 3 }}>
                  <CardContent>
                    <Typography variant="h6" sx={{ color: "#1976d2" }}>
                      Total Time
                    </Typography>
                    <Typography>
                      {formatDuration(apiData.total_screen_time)}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Card sx={{ textAlign: "center", boxShadow: 3 }}>
                  <CardContent>
                    <Typography variant="h6" sx={{ color: "#1976d2" }}>
                      Work Time
                    </Typography>
                    <Typography>{formatDuration(apiData.work_time)}</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Card sx={{ textAlign: "center", boxShadow: 3 }}>
                  <CardContent>
                    <Typography variant="h6" sx={{ color: "#1976d2" }}>
                      Gap Time
                    </Typography>
                    <Typography>{formatDuration(apiData.gap_time)}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          )}
          {/* Table of Activities or No Data Message */}
          {loading ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "300px",
              }}
            >
              <CircularProgress />
              <Typography variant="h6" color="textSecondary" sx={{ mt: 2 }}>
                Fetching Data
              </Typography>
            </Box>
          ) : (
            <>
              {apiData &&
              apiData.activities &&
              apiData.activities.length > 0 ? (
                <TableContainer component={Paper} sx={{ mt: 4 }}>
                  <Table
                    id="activitiesTable"
                    sx={{ minWidth: 650 }}
                    size="small"
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell>Title</TableCell>
                        <TableCell>Start Time</TableCell>
                        <TableCell>End Time</TableCell>
                        <TableCell>Total Time</TableCell>
                        <TableCell>Screenshot</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {apiData.activities
                        .filter(
                          (activity) => activity.screen_time !== "Invalid"
                        )
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((activity, index) => (
                          <TableRow key={index}>
                            <TableCell
                              sx={{
                                maxWidth: 200,
                                whiteSpace: "normal",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                wordWrap: "break-word",
                              }}
                            >
                              {activity.title}
                            </TableCell>
                            <TableCell>
                              {formatTime(activity.start_time)}
                            </TableCell>
                            <TableCell>
                              {formatTime(activity.end_time)}
                            </TableCell>
                            <TableCell>
                              {formatTime(activity.screen_time)}
                            </TableCell>
                            <TableCell>
                              {activity.screenshot_path !== "No Screenshot" ? (
                                <img
                                  src={activity.screenshot_path}
                                  alt="Screenshot"
                                  style={{ width: "80px", height: "80px" }}
                                />
                              ) : (
                                "No Screenshot"
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                  <TablePagination
                    rowsPerPageOptions={[20]}
                    component="div"
                    count={apiData ? apiData.activities.length : 0}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                  />
                </TableContainer>
              ) : (
                <Typography
                  variant="h6"
                  sx={{
                    mt: 4,
                    textAlign: "center",
                    color: "gray",
                  }}
                >
                  No data for selected date.
                </Typography>
              )}
            </>
          )}
        </Container>
      </Box>
      {/* Export Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Select Export Format</DialogTitle>
        <DialogContent>
          <FormControl fullWidth>
            <InputLabel>Format</InputLabel>
            <Select
              value={selectedFormat}
              onChange={handleFormatChange}
              label="Format"
            >
              <MenuItem value="excel">Excel</MenuItem>
              <MenuItem value="pdf">PDF</MenuItem>
              {/* <MenuItem value="png">PNG</MenuItem> */}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleExport} color="primary">
            Export
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DailyMonitoringData;
