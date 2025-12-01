import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Container,
  Button,
  Grid,
  CircularProgress,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Table,
  FormControl,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { jsPDF } from "jspdf";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "jspdf-autotable";

import dayjs from "dayjs";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const Dashboard = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(
    JSON.parse(localStorage.getItem("isDrawerOpen")) ?? true
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [employeesData, setEmployeesData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [noData, setNoData] = useState(false);
  const [chartView, setChartView] = useState("workHours");
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  // selectedChartEmployeeId can now be "all" or a specific employee id
  const [selectedChartEmployeeId, setSelectedChartEmployeeId] = useState("all");
  const [chartEmployeeData, setChartEmployeeData] = useState(null);
  const [searchQueryDropdown, setSearchQueryDropdown] = useState("");

  const colors = [
    "#3f51b5",
    "#f44336",
    "#4caf50",
    "#ff9800",
    "#9c27b0",
    "#00bcd4",
    "#8bc34a",
    "#c2185b",
    "#1976d2",
  ];
  const employeesUnder =
    JSON.parse(localStorage.getItem("employeesUnder")) || [];
  const employeeIds = employeesUnder
    .map((employee) => String(employee.employee_id).trim())
    .filter((id) => id !== "");

  // API call for the table (aggregated view for all employees)
  const fetchEmployeeData = async (date) => {
    setIsLoading(true);
    setNoData(false);
    const formattedDate = dayjs(date).format("YYYY-MM-DD");
    try {
      const response = await fetch(
        `https://pmdbackend.tdtlworld.com/api/employee-work-summary/?employee_id=${employeeIds.join(
          ","
        )}&date=${formattedDate}`
      );
      const data = await response.json();
      if (data.employees.length === 0) {
        setNoData(true);
      }
      setEmployeesData(data.employees || []);
    } catch (error) {
      console.error("Error fetching employee data:", error);
      setNoData(true);
    } finally {
      setIsLoading(false);
    }
  };

  // API call for a single employee from dropdown
  const fetchEmployeeChartData = async (employeeId) => {
    // when "all" is selected, we won't fetch individual employee data
    if (employeeId === "all") {
      setChartEmployeeData(null);
      return;
    }
    setIsLoading(true);
    setNoData(false);
    const formattedDate = dayjs(selectedDate).format("YYYY-MM-DD");
    try {
      const response = await fetch(
        `https://pmdbackend.tdtlworld.com/api/employee-work-summary/?employee_id=${employeeId}&date=${formattedDate}`
      );
      const data = await response.json();
      if (data.employees && data.employees.length > 0) {
        setChartEmployeeData(data.employees);
      } else {
        setNoData(true);
        setChartEmployeeData([]);
      }
    } catch (error) {
      console.error("Error fetching employee chart data:", error);
      setNoData(true);
      setChartEmployeeData([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch all employees data for table and default charts on date change
  useEffect(() => {
    fetchEmployeeData(selectedDate);
  }, [selectedDate]);

  // When a new employee is selected from the dropdown, fetch its data (unless "all" is selected)
  useEffect(() => {
    if (selectedChartEmployeeId && selectedChartEmployeeId !== "all") {
      fetchEmployeeChartData(selectedChartEmployeeId);
    } else {
      setChartEmployeeData(null);
    }
  }, [selectedChartEmployeeId, selectedDate]);

  // Determine data to use for aggregated charts
  const dataForCharts =
    selectedChartEmployeeId &&
    selectedChartEmployeeId !== "all" &&
    chartEmployeeData
      ? chartEmployeeData
      : employeesData;

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  // Update table filtering:
  // - Only the selected employee if a specific employee is chosen
  // - All present employees if "all" is selected (absent ones appended)
  const filteredEmployees =
    selectedChartEmployeeId && selectedChartEmployeeId !== "all"
      ? employeesData.filter(
          (employee) =>
            employee.employee_id.toString() ===
            selectedChartEmployeeId.toString()
        )
      : employeesData
          .filter((employee) => employee.attendance_status === "Present")
          .concat(
            employeesData.filter(
              (employee) => employee.attendance_status !== "Present"
            )
          );

  const convertTimeToHours = (timeString) => {
    if (!timeString) return 0;
    const timeParts = timeString.split(":").map((part) => parseFloat(part));
    let hours = 0;
    if (timeParts.length === 3) {
      hours = timeParts[0] + timeParts[1] / 60 + timeParts[2] / 3600;
    } else if (timeParts.length === 2) {
      hours = timeParts[0] / 60 + timeParts[1] / 3600;
    } else if (timeParts.length === 1) {
      hours = timeParts[0] / 3600;
    }
    return parseFloat(hours.toFixed(2));
  };

  // Aggregated chart data for the first chart (Employees Count by Total Work Hours)
  const categorizedData = [
    {
      name: "0-2 hours",
      count: dataForCharts.filter((e) => {
        const totalHours =
          parseFloat(e.work_time.split(":")[0]) +
          parseFloat(e.work_time.split(":")[1]) / 60;
        return totalHours > 0 && totalHours <= 2;
      }).length,
      employees: dataForCharts.filter((e) => {
        const totalHours =
          parseFloat(e.work_time.split(":")[0]) +
          parseFloat(e.work_time.split(":")[1]) / 60;
        return totalHours > 0 && totalHours <= 2;
      }),
    },
    {
      name: "2-4 hours",
      count: dataForCharts.filter((e) => {
        const totalHours =
          parseFloat(e.work_time.split(":")[0]) +
          parseFloat(e.work_time.split(":")[1]) / 60;
        return totalHours > 2 && totalHours <= 4;
      }).length,
      employees: dataForCharts.filter((e) => {
        const totalHours =
          parseFloat(e.work_time.split(":")[0]) +
          parseFloat(e.work_time.split(":")[1]) / 60;
        return totalHours > 2 && totalHours <= 4;
      }),
    },
    {
      name: "4-6 hours",
      count: dataForCharts.filter((e) => {
        const totalHours =
          parseFloat(e.work_time.split(":")[0]) +
          parseFloat(e.work_time.split(":")[1]) / 60;
        return totalHours > 4 && totalHours <= 6;
      }).length,
      employees: dataForCharts.filter((e) => {
        const totalHours =
          parseFloat(e.work_time.split(":")[0]) +
          parseFloat(e.work_time.split(":")[1]) / 60;
        return totalHours > 4 && totalHours <= 6;
      }),
    },
    {
      name: "6-8 hours",
      count: dataForCharts.filter((e) => {
        const totalHours =
          parseFloat(e.work_time.split(":")[0]) +
          parseFloat(e.work_time.split(":")[1]) / 60;
        return totalHours > 6 && totalHours <= 8;
      }).length,
      employees: dataForCharts.filter((e) => {
        const totalHours =
          parseFloat(e.work_time.split(":")[0]) +
          parseFloat(e.work_time.split(":")[1]) / 60;
        return totalHours > 6 && totalHours <= 8;
      }),
    },
    {
      name: "8+ hours",
      count: dataForCharts.filter((e) => {
        const totalHours =
          parseFloat(e.work_time.split(":")[0]) +
          parseFloat(e.work_time.split(":")[1]) / 60;
        return totalHours > 8;
      }).length,
      employees: dataForCharts.filter((e) => {
        const totalHours =
          parseFloat(e.work_time.split(":")[0]) +
          parseFloat(e.work_time.split(":")[1]) / 60;
        return totalHours > 8;
      }),
    },
  ];

  // Data for the second chart (Employee Time Distribution)
  const timeDistributionData = (
    selectedEmployees.length > 0 ? selectedEmployees : dataForCharts
  ).map((employee) => ({
    name: `${employee.first_name} ${employee.last_name}`,
    work_time: convertTimeToHours(employee.work_time),
    gap_time: convertTimeToHours(employee.gap_time),
    ...employee,
  }));

  // Handler for drilling down into the third chart ("Employee App Usage")
  const handleBarClick = (employee) => {
    if (employee && employee.activities && employee.activities.length > 0) {
      setSelectedEmployee(employee);
      setChartView("appUsage");
    } else {
      console.warn("Employee or activities data is missing.");
    }
  };

  const calculateTotalUsage = (activities) => {
    if (!activities || activities.length === 0) return [];
    const usageMap = {};
    activities.forEach((activity) => {
      const time =
        activity.screen_time !== "Invalid" ? activity.screen_time : "0:00:00";
      const hours = convertTimeToHours(time);
      if (hours > 1 / 60) {
        const title = activity.title.split(" ").slice(0, 3).join(" ");
        usageMap[title] = (usageMap[title] || 0) + hours;
      }
    });
    return Object.entries(usageMap).map(([appName, usageTime]) => ({
      appName,
      usageTime: parseFloat(usageTime.toFixed(2)),
    }));
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    const tableData = employeesData.map((employee) => [
      `${employee.first_name} ${employee.last_name}`,
      employee.attendance_status,
      employee.time,
    ]);
    doc.autoTable({
      head: [["Employee Name", "Status", "Time"]],
      body: tableData,
      startY: 20,
    });
    doc.save("Employee_Report.pdf");
  };

  return (
    <Box display="flex" flexDirection="column">

      <Box>
        <Container maxWidth="lg" sx={{ mt: -2, mb: 4 }}>
          <Typography variant="h4" gutterBottom>
            Employee Daily Monitoring Stats
          </Typography>

          <Box
            sx={{
              mb: 3,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {/* Dropdown for chart employee selection */}
            <FormControl
              variant="outlined"
              sx={{
                width: "100%",
                maxWidth: 250,
                border: "1px solid #ccc",
                borderRadius: "5px",
              }}
            >
              <Select
                labelId="employee-select-label"
                id="employee-select"
                value={selectedChartEmployeeId}
                onChange={(e) => setSelectedChartEmployeeId(e.target.value)}
                displayEmpty
                renderValue={(selected) =>
                  selected === "all"
                    ? "All Employees"
                    : `${
                        employeesData.find(
                          (emp) =>
                            emp.employee_id.toString() === selected.toString()
                        )?.employee_id
                      } - ${
                        employeesData.find(
                          (emp) =>
                            emp.employee_id.toString() === selected.toString()
                        )?.first_name
                      }`
                }
                sx={{ height: 40 }}
              >
                {/* "All Employees" option */}
                <MenuItem value="all">All Employees</MenuItem>
                <MenuItem disableRipple>
                  <TextField
                    placeholder="Search Employee..."
                    variant="standard"
                    fullWidth
                    value={searchQueryDropdown}
                    onChange={(e) =>
                      setSearchQueryDropdown(e.target.value.toLowerCase())
                    }
                    onClick={(e) => e.stopPropagation()}
                  />
                </MenuItem>
                {employeesData
                  .filter((emp) => emp.attendance_status === "Present")
                  .filter((emp) =>
                    `${emp.employee_id} ${emp.first_name} ${emp.last_name}`
                      .toLowerCase()
                      .includes(searchQueryDropdown)
                  )
                  .map((emp) => (
                    <MenuItem key={emp.employee_id} value={emp.employee_id}>
                      {emp.employee_id} - {emp.first_name} {emp.last_name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>

            {/* Date picker and Export PDF */}
            <Box sx={{ display: "flex", gap: 2 }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Select Date"
                  value={selectedDate}
                  onChange={(newDate) => handleDateChange(newDate)}
                  renderInput={(params) => <Paper {...params} />}
                />
              </LocalizationProvider>
              <Button variant="contained" color="primary" onClick={generatePDF}>
                Export PDF
              </Button>
            </Box>
          </Box>

          {isLoading ? (
            <Box display="flex" justifyContent="center" mt={4}>
              <CircularProgress />
            </Box>
          ) : noData ? (
            <Typography
              variant="h6"
              color="textSecondary"
              align="center"
              mt={4}
            >
              No data for the selected date.
            </Typography>
          ) : (
            <>
              <Grid container spacing={4}>
                {chartView === "workHours" && (
                  <Grid item xs={12}>
                    <Typography variant="subtitle1" gutterBottom>
                      Employees Count by Total Work Hours
                    </Typography>
                    <ResponsiveContainer width="100%" height={400}>
                      <BarChart data={categorizedData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip
                          content={({ payload }) => {
                            const employeeNames = payload[0]?.payload?.employees
                              ? payload[0]?.payload?.employees
                                  .map(
                                    (employee) =>
                                      `${employee.first_name} ${employee.last_name}`
                                  )
                                  .join(", ")
                              : "No employees";
                            return (
                              <div>
                                <strong>Employee Count: </strong>
                                {payload[0]?.value}
                                <br />
                                <strong>Employees: </strong>
                                {employeeNames}
                              </div>
                            );
                          }}
                        />
                        <Bar
                          dataKey="count"
                          fill="#3f51b5"
                          onClick={({ payload }) => {
                            setSelectedEmployees(payload?.employees);
                            setChartView("timeDistribution");
                          }}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </Grid>
                )}

                {chartView === "timeDistribution" && (
                  <>
                    <Grid
                      item
                      xs={12}
                      sx={{ display: "flex", alignItems: "center" }}
                    >
                      <ArrowBackIcon
                        sx={{ cursor: "pointer", mr: 2 }}
                        onClick={() => setChartView("workHours")}
                      />
                      <Typography variant="subtitle1" gutterBottom>
                        Employee Time Distribution
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <ResponsiveContainer width="100%" height={400}>
                        <BarChart
                          data={selectedEmployees.map((employee) => ({
                            name: `${employee.first_name} ${employee.last_name}`,
                            work_time:
                              convertTimeToHours(employee.work_time) || 0,
                            gap_time:
                              convertTimeToHours(employee.gap_time) || 0,
                            activities: employee.activities,
                          }))}
                          onClick={(e) => {
                            const employee = e.activePayload?.[0]?.payload;
                            if (employee) {
                              handleBarClick(employee);
                            }
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Bar
                            dataKey="work_time"
                            fill="#3f51b5"
                            barSize={80}
                          />
                          <Bar dataKey="gap_time" fill="#f44336" barSize={80} />
                        </BarChart>
                      </ResponsiveContainer>
                    </Grid>
                  </>
                )}

                {chartView === "appUsage" && selectedEmployee && (
                  <>
                    <Grid
                      item
                      xs={12}
                      sx={{ display: "flex", alignItems: "center" }}
                    >
                      <ArrowBackIcon
                        sx={{ cursor: "pointer", mr: 2 }}
                        onClick={() => setChartView("timeDistribution")}
                      />
                      <Typography variant="subtitle1" gutterBottom>
                        Employee App Usage
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <ResponsiveContainer width="100%" height={500}>
                        <BarChart
                          data={calculateTotalUsage(
                            selectedEmployee.activities || []
                          )}
                          layout="vertical"
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis type="number" />
                          <YAxis
                            dataKey="appName"
                            type="category"
                            interval={0}
                            width={200}
                            tickFormatter={(appName) =>
                              appName.length > 15
                                ? `${appName.slice(0, 12)}...`
                                : appName
                            }
                          />
                          <Tooltip
                            formatter={(value, name, props) => [
                              `${value.toFixed(2)} hours`,
                              props.payload.appName,
                            ]}
                          />
                          <Bar dataKey="usageTime" fill="#4caf50">
                            {calculateTotalUsage(
                              selectedEmployee.activities || []
                            ).map((entry, index) => (
                              <Cell
                                key={`cell-${index}`}
                                fill={colors[index % colors.length]}
                              />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </Grid>
                  </>
                )}
              </Grid>
              <Box mt={4}>
                <Typography variant="subtitle1" gutterBottom>
                  Employee Attendance Status
                </Typography>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Employee Name</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Time</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredEmployees.map((employee) => (
                        <TableRow key={employee.employee_id}>
                          <TableCell>
                            {employee.first_name} {employee.last_name}
                          </TableCell>
                          <TableCell>{employee.attendance_status}</TableCell>
                          <TableCell>{employee.time}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </>
          )}
        </Container>
      </Box>
    </Box>
  );
};
//a
export default Dashboard;
