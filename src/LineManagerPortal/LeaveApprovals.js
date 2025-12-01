import { useState, useEffect, useCallback, useMemo } from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Snackbar,
  Alert,
  Chip,
  Button, // CHANGE 1: Added 'Button' to the MUI imports
} from "@mui/material";
import { differenceInCalendarDays, format } from "date-fns"; // CHANGE 2: Changed import from 'date-fns-tz' to 'date-fns'
 
// ===================================================================================
//  CONSTANTS
// ===================================================================================
 
const API_ENDPOINTS = {
  LEAVE_APPROVALS:
    "https://tdtlworld.com/hrms-backend/api/line-manager-approval/",
  UPDATE_LEAVE_STATUS: (leaveId) =>
    `https://tdtlworld.com/hrms-backend/api/line-manager-approval/${leaveId}/`,
};
 
const STATUS_COLORS = {
  Pending: "warning",
  Approved: "success",
  Rejected: "error",
};
 
// ===================================================================================
//  UTILITY FUNCTIONS
// ===================================================================================
 
const getAuthHeaders = () => {
  const accessToken = localStorage.getItem("accessToken");
  return accessToken ? { Authorization: `Bearer ${accessToken}` } : {};
};
 
// ===================================================================================
//  MAIN COMPONENT: LeaveApprovals
// ===================================================================================
export default function LeaveApprovalsLM() {
  const [entries, setEntries] = useState("10");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [leaveData, setLeaveData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "info",
  });
 
  const showNotification = (message, severity = "info") => {
    setNotification({ open: true, message, severity });
  };
 
  const handleNotificationClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setNotification({ ...notification, open: false });
  };
 
  // 1. DATA FETCHING LOGIC
  const fetchLeaveApprovals = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) throw new Error("Authentication details not found.");
 
      const response = await fetch(API_ENDPOINTS.LEAVE_APPROVALS, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
 
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
 
      const data = await response.json();
      const applications = Array.isArray(data) ? data : [];
 
      setLeaveData(
        applications
          .map((item) => {
            const fromDate = new Date(item.from_date);
            const toDate = new Date(item.to_date);
            // Calculating days based on from/to date difference
            const days = differenceInCalendarDays(toDate, fromDate) + 1;
 
            return {
              id: item.leave_id,
              employeeId: item.employee_id,
              employeeName: item.employee_name,
              leaveType: item.leave_type || "N/A",
              leaveDuration: `${format(fromDate, "dd/MM/yyyy")} To ${format(
                toDate,
                "dd/MM/yyyy"
              )}`,
              days: `${days} Day(s)`,
              reason: item.reason,
              status: item.line_manager_status,
              appliedOn: fromDate,
            };
          })
          .sort((a, b) => b.appliedOn - a.appliedOn)
      );
    } catch (err) {
      setError(err.message);
      showNotification(`Failed to fetch leave data: ${err.message}`, "error");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);
 
  useEffect(() => {
    fetchLeaveApprovals();
  }, [fetchLeaveApprovals]);
 
  // 2. STATUS UPDATE LOGIC (PATCH REQUEST)
  const handleStatusChange = useCallback(
    async (leaveId, newStatus) => {
      const originalData = [...leaveData];
      const updatedLeaveData = leaveData.map((leave) =>
        leave.id === leaveId ? { ...leave, status: newStatus } : leave
      );
      setLeaveData(updatedLeaveData);
 
      try {
        const response = await fetch(
          API_ENDPOINTS.UPDATE_LEAVE_STATUS(leaveId),
          {
            method: "PATCH",
            headers: {
              ...getAuthHeaders(),
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ line_manager_status: newStatus }),
          }
        );
 
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            errorData.detail ||
              `Failed to update status. Server responded with ${response.status}`
          );
        }
 
        showNotification("Leave status updated successfully!", "success");
      } catch (err) {
        console.error("Failed to update leave status:", err);
        showNotification(`Error: ${err.message}`, "error");
        setLeaveData(originalData); // Revert UI on failure
      }
    },
    [leaveData]
  );
 
  // 3. FILTERING AND PAGINATION LOGIC
  const filteredData = useMemo(() => {
    return leaveData.filter(
      (leave) =>
        leave.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        leave.leaveType.toLowerCase().includes(searchTerm.toLowerCase()) ||
        leave.status.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [leaveData, searchTerm]);
 
  const paginationData = useMemo(() => {
    const entriesPerPage = Number.parseInt(entries, 10);
    const totalPages = Math.ceil(filteredData.length / entriesPerPage);
    const startIndex = (currentPage - 1) * entriesPerPage;
    const paginatedData = filteredData.slice(
      startIndex,
      startIndex + entriesPerPage
    );
 
    return { entriesPerPage, totalPages, startIndex, paginatedData };
  }, [filteredData, entries, currentPage]);
 
  return (
    <Box sx={{ p: 3, backgroundColor: "#f4f6f8", minHeight: "100vh" }}>
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleNotificationClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleNotificationClose}
          severity={notification.severity}
          sx={{ width: "100%" }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
 
      <Typography variant="h4" sx={{ mb: 2 }}>
        Leave Approvals
      </Typography>
 
      <Paper sx={{ mt: 2, p: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <FormControl variant="outlined" size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Show</InputLabel>
            <Select
              value={entries}
              label="Show"
              onChange={(e) => {
                setEntries(e.target.value);
                setCurrentPage(1);
              }}
            >
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={25}>25</MenuItem>
              <MenuItem value={50}>50</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Search by Employee, Leave Type, Status"
            variant="outlined"
            size="small"
            sx={{ width: 350 }}
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </Box>
 
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", p: 5 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography color="error" sx={{ textAlign: "center", p: 5 }}>
            {error}
          </Typography>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: "#f5f5f5" }}>
                  <TableCell sx={{ fontWeight: "bold" }}>S.NO.</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>EMPLOYEE</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>LEAVE TYPE</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    LEAVE DURATION
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>DAYS</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>REASON</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>STATUS</TableCell>
                  <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>
                    ACTIONS
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginationData.paginatedData.length > 0 ? (
                  paginationData.paginatedData.map((leave, index) => (
                    <TableRow key={leave.id}>
                      <TableCell>
                        {paginationData.startIndex + index + 1}
                      </TableCell>
                      <TableCell>
                        <Typography variant="body1">
                          {leave.employeeName}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {leave.employeeId}
                        </Typography>
                      </TableCell>
                      <TableCell>{leave.leaveType}</TableCell>
                      <TableCell>{leave.leaveDuration}</TableCell>
                      <TableCell>{leave.days}</TableCell>
                      <TableCell>{leave.reason}</TableCell>
                      <TableCell>
                        <Chip
                          label={leave.status}
                          color={STATUS_COLORS[leave.status] || "default"}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <FormControl fullWidth size="small">
                          <Select
                            value={leave.status}
                            onChange={(e) =>
                              handleStatusChange(leave.id, e.target.value)
                            }
                            disabled={leave.status !== "Pending"}
                          >
                            <MenuItem value="Pending">Pending</MenuItem>
                            <MenuItem value="Approved">Approve</MenuItem>
                            <MenuItem value="Rejected">Reject</MenuItem>
                          </Select>
                        </FormControl>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} align="center">
                      No leave approval requests found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
 
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 2,
          }}
        >
          <Typography variant="body2">
            Showing{" "}
            {filteredData.length > 0 ? paginationData.startIndex + 1 : 0} to{" "}
            {Math.min(
              paginationData.startIndex + paginationData.entriesPerPage,
              filteredData.length
            )}{" "}
            of {filteredData.length} entries
          </Typography>
          <Box>
            <Button
              variant="outlined"
              sx={{ mr: 1 }}
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
            >
              Previous
            </Button>
            <Button variant="contained" sx={{ mr: 1, cursor: "default" }}>
              {currentPage}
            </Button>
            <Button
              variant="outlined"
              disabled={currentPage >= paginationData.totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
            >
              Next
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}