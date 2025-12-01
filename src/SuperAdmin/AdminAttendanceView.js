import React, { useState } from "react";
import * as material from "@mui/material";
 
export default function AdminAttendanceView() {
  const [entries, setEntries] = useState("10");
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
 
  const attendanceData = [
    {
      id: 1,
      name: "Abhishek Belekar",
      email: "abhishek.belekar@tdtl.world",
      date: "2024-10-08",
      status: "Absent",
      clockIn: "00:00",
      clockOut: "00:00",
      late: "00:00",
      earlyLeaving: "00:00",
      totalWork: "00:00",
    },
    {
      id: 2,
      name: "Priya Sharma",
      email: "priya.sharma@tdtl.world",
      date: "2024-10-08",
      status: "Absent",
      clockIn: "09:05",
      clockOut: "17:00",
      late: "00:05",
      earlyLeaving: "00:00",
      totalWork: "07:55",
    },
    {
      id: 3,
      name: "Rajesh Patil",
      email: "rajesh.patil@tdtl.world",
      date: "2024-10-08",
      status: "Present",
      clockIn: "09:00",
      clockOut: "16:45",
      late: "00:00",
      earlyLeaving: "00:15",
      totalWork: "07:45",
    },
    {
      id: 4,
      name: "Sakshi Desai",
      email: "sakshi.desai@tdtl.world",
      date: "2024-10-08",
      status: "Absent",
      clockIn: "00:00",
      clockOut: "00:00",
      late: "00:00",
      earlyLeaving: "00:00",
      totalWork: "00:00",
    },
    {
      id: 5,
      name: "Vikram Mehta",
      email: "vikram.mehta@tdtl.world",
      date: "2024-10-08",
      status: "Late",
      clockIn: "09:20",
      clockOut: "17:10",
      late: "00:20",
      earlyLeaving: "00:00",
      totalWork: "07:50",
    },
    {
      id: 6,
      name: "Anjali Nair",
      email: "anjali.nair@tdtl.world",
      date: "2024-10-08",
      status: "Present",
      clockIn: "09:00",
      clockOut: "17:00",
      late: "00:00",
      earlyLeaving: "00:00",
      totalWork: "08:00",
    },
    {
      id: 7,
      name: "Amit Kumar",
      email: "amit.kumar@tdtl.world",
      date: "2024-10-08",
      status: "Late",
      clockIn: "09:10",
      clockOut: "16:50",
      late: "00:10",
      earlyLeaving: "00:10",
      totalWork: "07:30",
    },
    {
      id: 8,
      name: "Neha Bhosale",
      email: "neha.bhosale@tdtl.world",
      date: "2024-10-08",
      status: "Absent",
      clockIn: "00:00",
      clockOut: "00:00",
      late: "00:00",
      earlyLeaving: "00:00",
      totalWork: "00:00",
    },
    {
      id: 9,
      name: "Rohit Yadav",
      email: "rohit.yadav@tdtl.world",
      date: "2024-10-08",
      status: "Present",
      clockIn: "08:55",
      clockOut: "17:05",
      late: "00:00",
      earlyLeaving: "00:00",
      totalWork: "08:10",
    },
    {
      id: 10,
      name: "Divya Khatri",
      email: "divya.khatri@tdtl.world",
      date: "2024-10-08",
      status: "Present",
      clockIn: "09:15",
      clockOut: "16:30",
      late: "00:15",
      earlyLeaving: "00:30",
      totalWork: "07:00",
    },
  ];
 
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "present":
        return "success.main";
      case "absent":
        return "error.main";
      case "late":
        return "warning.main";
      default:
        return "grey.500";
    }
  };
 
  const filteredData = attendanceData.filter(
    (row) =>
      row.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (dateFilter ? row.date === dateFilter : true) &&
      (statusFilter
        ? row.status.toLowerCase() === statusFilter.toLowerCase()
        : true)
  );
 
  return (
    <material.Box sx={{ mt: 2 }}>
      <material.Typography variant="h4" gutterBottom>
        Attendance Overview
      </material.Typography>
 
      <material.Grid container spacing={2} sx={{ mb: 2 }}>
        <material.Grid item xs={12} sm={4}>
          <material.TextField
            fullWidth
            label="Search Employee"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            size="small"
          />
        </material.Grid>
        <material.Grid item xs={12} sm={4}>
          <material.TextField
            fullWidth
            label="Date"
            type="date"
            variant="outlined"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            InputLabelProps={{ shrink: true }}
            size="small"
          />
        </material.Grid>
        <material.Grid item xs={12} sm={4}>
          <material.FormControl fullWidth size="small">
            <material.InputLabel>Status</material.InputLabel>
            <material.Select
              value={statusFilter}
              label="Status"
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <material.MenuItem value="">All</material.MenuItem>
              <material.MenuItem value="present">Present</material.MenuItem>
              <material.MenuItem value="absent">Absent</material.MenuItem>
              <material.MenuItem value="late">Late</material.MenuItem>
            </material.Select>
          </material.FormControl>
        </material.Grid>
      </material.Grid>
 
      <material.Paper sx={{ width: "100%", mb: 2 }}>
        <material.TableContainer>
          <material.Table>
            <material.TableHead>
              <material.TableRow>
                <material.TableCell>Employee</material.TableCell>
                <material.TableCell>Date</material.TableCell>
                <material.TableCell>Status</material.TableCell>
                <material.TableCell>Clock In</material.TableCell>
                <material.TableCell>Clock Out</material.TableCell>
                <material.TableCell>Late</material.TableCell>
                <material.TableCell>Early Leaving</material.TableCell>
                <material.TableCell>Total Work</material.TableCell>
              </material.TableRow>
            </material.TableHead>
            <material.TableBody>
              {filteredData.length === 0 ? (
                <material.TableRow>
                  <material.TableCell colSpan={8} align="center">
                    No records found
                  </material.TableCell>
                </material.TableRow>
              ) : (
                filteredData.map((row) => (
                  <material.TableRow key={row.id}>
                    <material.TableCell>
                      <material.Typography variant="body1">
                        {row.name}
                      </material.Typography>
                      <material.Typography
                        variant="body2"
                        color="textSecondary"
                      >
                        {row.email}
                      </material.Typography>
                    </material.TableCell>
                    <material.TableCell>{row.date}</material.TableCell>
                    <material.TableCell>
                      <material.Box
                        sx={{
                          bgcolor: getStatusColor(row.status),
                          color: "white",
                          px: 1,
                          py: 0.5,
                          borderRadius: "16px",
                          display: "inline-block",
                        }}
                      >
                        {row.status}
                      </material.Box>
                    </material.TableCell>
                    <material.TableCell>{row.clockIn}</material.TableCell>
                    <material.TableCell>{row.clockOut}</material.TableCell>
                    <material.TableCell>{row.late}</material.TableCell>
                    <material.TableCell>{row.earlyLeaving}</material.TableCell>
                    <material.TableCell>{row.totalWork}</material.TableCell>
                  </material.TableRow>
                ))
              )}
            </material.TableBody>
          </material.Table>
        </material.TableContainer>
      </material.Paper>
 
      <material.Box
        sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}
      >
        <material.FormControl size="small" sx={{ minWidth: 120 }}>
          <material.InputLabel>Show Entries</material.InputLabel>
          <material.Select
            value={entries}
            label="Show Entries"
            onChange={(e) => setEntries(e.target.value)}
          >
            <material.MenuItem value={10}>10</material.MenuItem>
            <material.MenuItem value={25}>25</material.MenuItem>
            <material.MenuItem value={50}>50</material.MenuItem>
          </material.Select>
        </material.FormControl>
        <material.Box>
          <material.Button variant="outlined" sx={{ mr: 1 }}>
            Previous
          </material.Button>
          <material.Button variant="contained">1</material.Button>
          <material.Button variant="outlined" sx={{ ml: 1 }}>
            Next
          </material.Button>
        </material.Box>
      </material.Box>
    </material.Box>
  );
}
 