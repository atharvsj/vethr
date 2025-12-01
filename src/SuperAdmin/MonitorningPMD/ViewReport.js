import React, { useState, useEffect, useRef } from "react";
import { useLocation, Outlet, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  CircularProgress,
  Container,
  TablePagination,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  LinearProgress,
  Alert,
  IconButton,
  Slide,
  TextField,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ArrowBack } from "@mui/icons-material";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import dayjs from "dayjs";
import { Bar } from "react-chartjs-2";
import { styled } from "@mui/material/styles";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  ArcElement,
  Legend,
} from "chart.js";

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: "bold",
  backgroundColor: theme.palette.primary.light,
  color: theme.palette.common.white,
  textAlign: "center",
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const ViewReport = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { id: employeeId, name: employeeName } = state || {};
  const [isDrawerOpen, setDrawerOpen] = useState(
    JSON.parse(localStorage.getItem("isDrawerOpen")) ?? true
  );
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [appUsageData, setAppUsageData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState("");

  // Ref to cache last fetch  parameters
  const lastFetchRef = useRef({ employeeId: null, date: null });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const displayData = appUsageData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const processAndSortData = (data) => {
    const filteredData = data.filter(
      (activity) => parseFloat(activity.total_time) >= 1
    );
    return filteredData.sort(
      (a, b) => parseFloat(b.total_time) - parseFloat(a.total_time)
    );
  };

  const truncateTitle = (title) => {
    const words = title.split(" ");
    return words.length > 4 ? words.slice(0, 4).join(" ") + "..." : title;
  };

  const fetchEmployeeActivityData = async (employeeId, date) => {
    setLoading(true);
    try {
      const url = `https://pmdbackend.tdtlworld.com/api/employee-activity/?employee_id=${employeeId}&date=${date}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data.activities) {
        const formattedData = data.activities.map((activity) => {
          const totalTimeArray = activity.total_time.split(":");
          const minutes =
            parseInt(totalTimeArray[0]) * 60 + parseFloat(totalTimeArray[1]);
          return {
            title: truncateTitle(activity.title),
            total_time: minutes.toFixed(2),
            date: activity.date,
            start_time: activity.start_time,
            end_time: activity.end_time,
          };
        });
        const sortedData = processAndSortData(formattedData);
        setAppUsageData(sortedData);
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const date = selectedDate.format("YYYY-MM-DD");
    // Only fetch if employeeId and date have changed
    if (employeeId && date) {
      if (
        lastFetchRef.current.employeeId === employeeId &&
        lastFetchRef.current.date === date
      ) {
        // Data already fetched for these parameters; do nothing.
        return;
      }
      // Cache current  parameters and fetch data
      lastFetchRef.current = { employeeId, date };
      fetchEmployeeActivityData(employeeId, date);
    }
  }, [employeeId, selectedDate]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("App Usage Report", 10, 10);
    doc.setFontSize(12);
    doc.text(`Employee ID: ${employeeId}`, 10, 20);
    doc.text(`Employee Name: ${employeeName}`, 10, 30);
    const tableData = appUsageData.map((row) => [row.title, row.total_time]);
    doc.autoTable({
      head: [["Window Title", "Total Time"]],
      body: tableData,
      startY: 40,
    });
    doc.save("App_Usage_Report.pdf");
  };

  const handleExportClick = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleFormatChange = (event) => {
    setSelectedFormat(event.target.value);
  };

  const handleExport = () => {
    if (selectedFormat) {
      if (selectedFormat === "excel") {
        const ws = XLSX.utils.json_to_sheet(appUsageData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "AppUsage");
        XLSX.writeFile(wb, "App_Usage_Report.xlsx");
      } else if (selectedFormat === "pdf") {
        generatePDF();
      } else {
        console.log("Invalid format selected");
      }
      setOpenDialog(false);
    }
  };

  const barChartData = {
    labels: appUsageData.map((data) => data.title),
    datasets: [
      {
        label: "App Usage (Minutes)",
        data: appUsageData.map((data) => parseFloat(data.total_time)),
        backgroundColor: ["#3f51b5", "#4caf50", "#ff9800", "#f44336"],
      },
    ],
  };

  const pieChartData = {
    labels: appUsageData.map((data) => data.title),
    datasets: [
      {
        data: appUsageData.map((data) => parseFloat(data.total_time)),
        backgroundColor: ["#3f51b5", "#4caf50", "#ff9800", "#f44336"],
      },
    ],
  };

  const pieChartOptions = {
    plugins: {
      legend: {
        display: false,
      },
    },
    responsive: true,
    cutout: "40%",
  };

  return (
    <Box sx={{ padding: 4 }}>
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
          <Typography variant="h5" gutterBottom>
            Employee App Usage Report
          </Typography>
          {/* Employee Details */}
          <Box
            mb={4}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6">
              Employee Name: <strong>{employeeName || "N/A"}</strong>
            </Typography>
            <Typography variant="h6">
              Employee ID: <strong>{employeeId || "N/A"}</strong>
            </Typography>
          </Box>
          <Box
            display="flex"
            justifyContent="space-between"
            mb={2}
            alignItems="center"
          >
            <Button
              variant="outlined"
              color="primary"
              startIcon={<ArrowBack />}
              onClick={() => navigate("/employeelist")}
              sx={{
                textTransform: "none",
                fontWeight: "bold",
                mb: { xs: 2, sm: 0 },
              }}
            >
              Back
            </Button>
            <Typography variant="h6">App-wise Usage</Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Select Date"
                value={selectedDate}
                onChange={(newDate) => handleDateChange(newDate)}
                renderInput={(params) => <Paper {...params} />}
              />
            </LocalizationProvider>
            <Button
              variant="contained"
              color="primary"
              onClick={() =>
                navigate(`/daily-monitoring/${employeeId}/${employeeName}`, {
                  state: { id: employeeId, name: employeeName },
                })
              }
            >
              View Details
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleExportClick}
            >
              Export Data
            </Button>
          </Box>
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
          ) : appUsageData.length === 0 ? (
            <Typography
              variant="h6"
              color="textSecondary"
              align="center"
              sx={{ mt: 4 }}
            >
              No data for selected date
            </Typography>
          ) : (
            <>
              <Box
                display="flex"
                flexDirection={{ xs: "column", md: "row" }}
                gap={4}
              >
                {/* Horizontal Bar Chart */}
                <Box flex={1}>
                  <Typography variant="subtitle1" gutterBottom>
                    Horizontal Bar Chart
                  </Typography>
                  <Bar
                    data={barChartData}
                    options={{ indexAxis: "y", responsive: true }}
                  />
                </Box>
                {/* Pie Chart */}
                <Box flex={0.5}>
                  <Typography variant="subtitle1" gutterBottom>
                    App Usage Percentage
                  </Typography>
                  <Pie data={pieChartData} options={pieChartOptions} />
                </Box>
              </Box>
              <Box mt={4}>
                <Typography variant="subtitle1" gutterBottom>
                  App Usage Details
                </Typography>
                <TableContainer
                  component={Paper}
                  sx={{ borderRadius: 2, boxShadow: 3 }}
                >
                  <Table sx={{ minWidth: 650 }} aria-label="App Usage Table">
                    <TableHead>
                      <StyledTableRow>
                        <StyledTableCell sx={{ width: "70%" }}>
                          Window Title
                        </StyledTableCell>
                        <StyledTableCell sx={{ width: "30%" }}>
                          Total Time
                        </StyledTableCell>
                      </StyledTableRow>
                    </TableHead>
                    <TableBody>
                      {displayData.map((row, index) => {
                        const minutes = parseFloat(row.total_time);
                        const hours = Math.floor(minutes / 60);
                        const remainingMinutes = Math.floor(minutes % 60);
                        const formattedTime = `${hours}:${
                          remainingMinutes < 10 ? "0" : ""
                        }${remainingMinutes}`;
                        return (
                          <StyledTableRow key={index}>
                            <TableCell sx={{ textAlign: "left" }}>
                              {row.title}
                            </TableCell>
                            <TableCell sx={{ textAlign: "center" }}>
                              {formattedTime}
                            </TableCell>
                          </StyledTableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={appUsageData.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </TableContainer>
              </Box>
            </>
          )}
        </Container>
      </Box>
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

export default ViewReport;
