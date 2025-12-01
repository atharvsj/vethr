import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  TextField,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
  Card,
  CardHeader,
  CardContent,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  Close as CloseIcon,
  Add as AddIcon,
  Remove as RemoveIcon,
} from "@mui/icons-material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import {
  LocalizationProvider,
  DatePicker,
  TimePicker,
} from "@mui/x-date-pickers";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Styled components for enhanced UI
const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3],
  transition: "box-shadow 0.3s ease-in-out",
  "&:hover": {
    boxShadow: theme.shadows[6],
  },
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
}));

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  textTransform: "none",
  fontWeight: "bold",
  transition: "all 0.3s ease-in-out",
  "&:hover": {
    transform: "translateY(-2px)",
  },
}));

// Sample data for charts
const attendanceData = [
  { name: "Present", value: 85 },
  { name: "Absent", value: 10 },
  { name: "Late", value: 5 },
];

const taskCompletionData = [
  { name: "Completed", Tasks: 30 },
  { name: "In Progress", Tasks: 15 },
  { name: "Pending", Tasks: 5 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

// Sample data for detailed employee report
const detailedEmployeeData = [
  {
    id: "1470",
    name: "Gayatri Kashid",
    workingTime: "08:00",
    breakTime: "01:00",
    totalTime: "09:00",
  },
  
];

function OnDutyRequestDialog({ open, onClose }) {
  const [formData, setFormData] = useState({
    employeeName: "Gayatri Kashid",
    date: new Date(),
    outTime: new Date(),
    odFrom: "",
    reason: "",
  });

  const [tasks, setTasks] = useState([
    {
      task: "",
      approvedBy: "Amit Andre",
      startTime: "09:00",
      endTime: "10:00",
    },
  ]);

  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleTaskChange = (index, field, value) => {
    const newTasks = [...tasks];
    newTasks[index] = { ...newTasks[index], [field]: value };
    setTasks(newTasks);
  };

  const handleAddMore = () => {
    setTasks([
      ...tasks,
      { task: "", approvedBy: "", startTime: "", endTime: "" },
    ]);
  };

  const handleRemove = (index) => {
    if (tasks.length > 1) {
      const newTasks = tasks.filter((_, i) => i !== index);
      setTasks(newTasks);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.odFrom) newErrors.odFrom = "OD From is required";
    if (!formData.reason) newErrors.reason = "Reason is required";
    const hasEmptyTask = tasks.some(
      (task) =>
        !task.task || !task.approvedBy || !task.startTime || !task.endTime
    );
    if (hasEmptyTask) {
      newErrors.tasks = "All task fields are required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      console.log("Saving form data:", { ...formData, tasks });
      onClose();
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
        <DialogTitle>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6">Add On Duty Attendance</Typography>
            <IconButton onClick={onClose} size="small">
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Employee Name"
                value={formData.employeeName}
                disabled
                margin="normal"
              />
            </Grid>
            <Grid item xs={6}>
              <DatePicker
                label="Date"
                value={formData.date}
                onChange={(newDate) => handleInputChange("date", newDate)}
                renderInput={(params) => (
                  <TextField {...params} fullWidth margin="normal" />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <TimePicker
                label="Out Time"
                value={formData.outTime}
                onChange={(newTime) => handleInputChange("outTime", newTime)}
                renderInput={(params) => (
                  <TextField {...params} fullWidth margin="normal" />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth error={!!errors.odFrom}>
                <InputLabel>OD From</InputLabel>
                <Select
                  value={formData.odFrom}
                  onChange={(e) => handleInputChange("odFrom", e.target.value)}
                  label="OD From"
                >
                  <MenuItem value="office">Office</MenuItem>
                  <MenuItem value="client">Client Location</MenuItem>
                  <MenuItem value="WOF">Work From Office</MenuItem>
                  <MenuItem value="WOH">Work From Home</MenuItem>
                </Select>
                {errors.odFrom && (
                  <FormHelperText>{errors.odFrom}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Reason"
                value={formData.reason}
                onChange={(e) => handleInputChange("reason", e.target.value)}
                error={!!errors.reason}
                helperText={errors.reason}
                multiline
                rows={2}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant="subtitle2"
                color="textSecondary"
                sx={{ mb: 2 }}
              >
                Note: This should match with microsoft planner task.
              </Typography>
            </Grid>
            {tasks.map((task, index) => (
              <Grid item xs={12} key={index} container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Task"
                    value={task.task}
                    onChange={(e) =>
                      handleTaskChange(index, "task", e.target.value)
                    }
                    multiline
                    rows={2}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    label="Task to be Approved By"
                    value={task.approvedBy}
                    onChange={(e) =>
                      handleTaskChange(index, "approvedBy", e.target.value)
                    }
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    label="Start Time"
                    value={task.startTime}
                    onChange={(e) =>
                      handleTaskChange(index, "startTime", e.target.value)
                    }
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    label="End Time"
                    value={task.endTime}
                    onChange={(e) =>
                      handleTaskChange(index, "endTime", e.target.value)
                    }
                  />
                </Grid>
                {index > 0 && (
                  <Grid item xs={12}>
                    <Button
                      variant="outlined"
                      color="error"
                      startIcon={<RemoveIcon />}
                      onClick={() => handleRemove(index)}
                    >
                      Remove
                    </Button>
                  </Grid>
                )}
              </Grid>
            ))}
            {errors.tasks && (
              <Grid item xs={12}>
                <Typography color="error" variant="caption">
                  {errors.tasks}
                </Typography>
              </Grid>
            )}
            <Grid item xs={12}>
              <Box display="flex" gap={2}>
                <Button
                  variant="contained"
                  color="secondary"
                  startIcon={<AddIcon />}
                  onClick={handleAddMore}
                >
                  Add More
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSave}
                >
                  Save
                </Button>
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </LocalizationProvider>
  );
}

function OnsiteMeetingDialog({ open, onClose }) {
  const [formData, setFormData] = useState({
    employeeName: "Gayatri Kashid",
    date: new Date(),
    fromTime: new Date(),
    toTime: new Date(),
    reason: "",
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.reason) newErrors.reason = "Reason is required";
    if (!formData.fromTime) newErrors.fromTime = "From Time is required";
    if (!formData.toTime) newErrors.toTime = "To Time is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      console.log("Saving onsite meeting data:", formData);
      onClose();
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6">Add Outdoor Duty Attendance</Typography>
            <IconButton onClick={onClose} size="small">
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Employee Name"
                value={formData.employeeName}
                disabled
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <DatePicker
                label="Date"
                value={formData.date}
                onChange={(newDate) => handleInputChange("date", newDate)}
                renderInput={(params) => (
                  <TextField {...params} fullWidth margin="normal" />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <TimePicker
                label="From Time"
                value={formData.fromTime}
                onChange={(newTime) => handleInputChange("fromTime", newTime)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    margin="normal"
                    error={!!errors.fromTime}
                    helperText={errors.fromTime}
                  />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <TimePicker
                label="To Time"
                value={formData.toTime}
                onChange={(newTime) => handleInputChange("toTime", newTime)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    margin="normal"
                    error={!!errors.toTime}
                    helperText={errors.toTime}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Reason"
                value={formData.reason}
                onChange={(e) => handleInputChange("reason", e.target.value)}
                error={!!errors.reason}
                helperText={errors.reason}
                multiline
                rows={3}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <Box display="flex" justifyContent="flex-end" gap={2} mt={2}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSave}
                >
                  Save
                </Button>
                <Button variant="outlined" onClick={onClose}>
                  Close
                </Button>
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </LocalizationProvider>
  );
}

function DetailedReportDialog({ open, onClose }) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Detailed Employee Report</Typography>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Employee ID</TableCell>
                <TableCell>Employee Name</TableCell>
                <TableCell>Working Time</TableCell>
                <TableCell>Break Time</TableCell>
                <TableCell>Total Time</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {detailedEmployeeData.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell>{employee.id}</TableCell>
                  <TableCell>{employee.name}</TableCell>
                  <TableCell>{employee.workingTime}</TableCell>
                  <TableCell>{employee.breakTime}</TableCell>
                  <TableCell>{employee.totalTime}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
    </Dialog>
  );
}

function EnhancedAttendanceView() {
  const navigate = useNavigate();
  const [openODDialog, setOpenODDialog] = useState(false);
  const [openOnsiteDialog, setOpenOnsiteDialog] = useState(false);
  const [openDetailedReportDialog, setOpenDetailedReportDialog] =
    useState(false);

  const handleOpenODDialog = () => setOpenODDialog(true);
  const handleCloseODDialog = () => setOpenODDialog(false);
  const handleOpenOnsiteDialog = () => setOpenOnsiteDialog(true);
  const handleCloseOnsiteDialog = () => setOpenOnsiteDialog(false);
  const handleOpenDetailedReportDialog = () =>
    setOpenDetailedReportDialog(true);
  const handleCloseDetailedReportDialog = () =>
    setOpenDetailedReportDialog(false);

  return (
    <Box sx={{ p: 3, bgcolor: "#f5f5f5", minHeight: "100vh" }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <StyledPaper elevation={3}>
            <Box>
              <Typography variant="h5" gutterBottom color="primary">
                Welcome, Gayatri !
              </Typography>
              <Typography variant="body1" gutterBottom>
                {format(new Date(), "MMMM dd, EEEE, yyyy")}
              </Typography>
              <Box sx={{ my: 4 }}>
                <Typography variant="body2">Punch in: 09:00 AM</Typography>
                <Typography variant="body2">Punch out: Not yet</Typography>
              </Box>
            </Box>

            <Box sx={{ my: 4 }}>
              <Typography variant="h6" gutterBottom color="primary">
                Quick Actions
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <StyledButton
                    variant="contained"
                    color="primary"
                    onClick={handleOpenODDialog}
                    fullWidth
                  >
                    On Duty Request
                  </StyledButton>
                </Grid>
                <Grid item xs={12}>
                  <StyledButton
                    variant="contained"
                    color="secondary"
                    onClick={handleOpenOnsiteDialog}
                    fullWidth
                  >
                    Onsite Meeting
                  </StyledButton>
                </Grid>
              </Grid>
            </Box>

            <Box>
              <Typography variant="h6" gutterBottom color="primary">
                My Achievements
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: 150,
                  border: "4px solid gold",
                  borderRadius: "50%",
                  width: 150,
                  margin: "auto",
                  backgroundColor: "rgba(255, 215, 0, 0.1)",
                }}
              >
                <Typography variant="body2" align="center">
                  5 Star
                  <br />
                  Performance
                </Typography>
              </Box>
            </Box>

            <Box sx={{ mt: 4 }}>
              <Typography variant="h6" gutterBottom color="primary">
                Recent Activity
              </Typography>
              <Typography variant="body2">
                • Completed project milestone
              </Typography>
              <Typography variant="body2">• Attended team meeting</Typography>
              <Typography variant="body2">• Submitted weekly report</Typography>
            </Box>
          </StyledPaper>
        </Grid>

        <Grid item xs={12} md={8}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <StyledPaper>
                <Typography variant="h6" gutterBottom color="primary">
                  Attendance Overview
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={attendanceData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) =>
                        `${name} ${(percent * 100).toFixed(0)}%`
                      }
                    >
                      {attendanceData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </StyledPaper>
            </Grid>
            <Grid item xs={12}>
              <StyledPaper>
                <Typography variant="h6" gutterBottom color="primary">
                  Task Completion Status
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={taskCompletionData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Tasks" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </StyledPaper>
            </Grid>
            <Grid item xs={12}>
              <StyledPaper>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 2,
                  }}
                >
                  <Typography variant="h6" color="primary">
                    Today's Employee Status
                  </Typography>
                  <StyledButton
                    variant="contained"
                    color="primary"
                    onClick={handleOpenDetailedReportDialog}
                  >
                    Show Detailed Report
                  </StyledButton>
                </Box>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>EMPLOYEE NAME</TableCell>
                        <TableCell>STATUS</TableCell>
                        <TableCell>TIME</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell>1470 / Gayatri Kashid</TableCell>
                        <TableCell>
                          <Box
                            sx={{
                              bgcolor: "success.main",
                              color: "white",
                              px: 1,
                              py: 0.5,
                              borderRadius: "16px",
                              display: "inline-block",
                            }}
                          >
                            Present
                          </Box>
                        </TableCell>
                        <TableCell>09:00 AM</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </StyledPaper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <OnDutyRequestDialog open={openODDialog} onClose={handleCloseODDialog} />
      <OnsiteMeetingDialog
        open={openOnsiteDialog}
        onClose={handleCloseOnsiteDialog}
      />
      <DetailedReportDialog
        open={openDetailedReportDialog}
        onClose={handleCloseDetailedReportDialog}
      />
    </Box>
  );
}

export default EnhancedAttendanceView;
