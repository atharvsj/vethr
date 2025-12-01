// import React, { useState } from "react";
// import {
//   Box,
//   Typography,
//   Button,
//   TextField,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Grid,
// } from "@mui/material";

// export default function OvertimeRequest() {
//   const [date, setDate] = useState("");
//   const [hours, setHours] = useState("");
//   const [reason, setReason] = useState("");
//   const [requests, setRequests] = useState([]);

//   const handleSubmit = () => {
//     const newRequest = {
//       id: requests.length + 1,
//       date,
//       hours,
//       reason,
//       status: "Pending",
//     };
//     setRequests([...requests, newRequest]);
//     setDate("");
//     setHours("");
//     setReason("");
//   };

//   return (
//     <Box sx={{ p: 3 }}>
//       <Typography variant="h5" sx={{ mb: 3 }}>
//         Overtime Request
//       </Typography>

//       <Grid container spacing={2} sx={{ mb: 3 }}>
//         <Grid item xs={12} sm={6}>
//           <TextField
//             fullWidth
//             label="Date"
//             type="date"
//             variant="outlined"
//             value={date}
//             onChange={(e) => setDate(e.target.value)}
//             InputLabelProps={{ shrink: true }}
//             size="small"
//           />
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <TextField
//             fullWidth
//             label="Hours"
//             type="number"
//             variant="outlined"
//             value={hours}
//             onChange={(e) => setHours(e.target.value)}
//             size="small"
//           />
//         </Grid>
//         <Grid item xs={12}>
//           <TextField
//             fullWidth
//             label="Reason"
//             variant="outlined"
//             value={reason}
//             onChange={(e) => setReason(e.target.value)}
//             multiline
//             rows={2}
//             size="small"
//           />
//         </Grid>
//         <Grid item xs={12}>
//           <Button variant="contained" onClick={handleSubmit}>
//             Submit Request
//           </Button>
//         </Grid>
//       </Grid>

//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Date</TableCell>
//               <TableCell>Hours</TableCell>
//               <TableCell>Reason</TableCell>
//               <TableCell>Status</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {requests.map((request) => (
//               <TableRow key={request.id}>
//                 <TableCell>{request.date}</TableCell>
//                 <TableCell>{request.hours}</TableCell>
//                 <TableCell>{request.reason}</TableCell>
//                 <TableCell>{request.status}</TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </Box>
//   );
// }


"use client"

import { useState } from "react"
import {
  Box,
  Typography,
  Button,
  TextField,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Grid,
  Select,
  MenuItem,
  IconButton,
  Collapse,
} from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from "@mui/icons-material/Edit"
import AddIcon from "@mui/icons-material/Add"

export default function OvertimeRequest() {
  // Sample employee data
  const employees = ["John Doe", "Jane Smith", "Robert Johnson", "Emily Davis", "Michael Wilson"]

  // State for form fields
  const [date, setDate] = useState("")
  const [inTime, setInTime] = useState("")
  const [outTime, setOutTime] = useState("")
  const [reason, setReason] = useState("")
  const [selectedEmployee, setSelectedEmployee] = useState("")
  const [requests, setRequests] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)

  // Calculate total hours from in time and out time
  const calculateTotalHours = (inTime, outTime) => {
    if (!inTime || !outTime) return 0

    const inTimeParts = inTime.split(":")
    const outTimeParts = outTime.split(":")

    const inMinutes = Number.parseInt(inTimeParts[0]) * 60 + Number.parseInt(inTimeParts[1])
    const outMinutes = Number.parseInt(outTimeParts[0]) * 60 + Number.parseInt(outTimeParts[1])

    // Calculate difference in minutes
    let diffMinutes = outMinutes - inMinutes
    if (diffMinutes < 0) {
      // If out time is on the next day
      diffMinutes += 24 * 60
    }

    // Convert to hours with 2 decimal places
    return (diffMinutes / 60).toFixed(2)
  }

  // Reset form fields
  const resetForm = () => {
    setDate("")
    setInTime("")
    setOutTime("")
    setReason("")
    setSelectedEmployee("")
    setEditingId(null)
  }

  // Handle form submission
  const handleSubmit = () => {
    const totalHours = calculateTotalHours(inTime, outTime)

    if (editingId !== null) {
      // Update existing request
      setRequests(
        requests.map((req) =>
          req.id === editingId
            ? {
                ...req,
                date,
                inTime,
                outTime,
                totalHours,
                reason,
                employee: selectedEmployee,
              }
            : req,
        ),
      )
    } else {
      // Add new request
      const newRequest = {
        id: Date.now(),
        date,
        inTime,
        outTime,
        totalHours,
        reason,
        employee: selectedEmployee,
      }
      setRequests([...requests, newRequest])
    }

    resetForm()
    setShowForm(false)
  }

  // Handle edit request
  const handleEdit = (request) => {
    setDate(request.date)
    setInTime(request.inTime)
    setOutTime(request.outTime)
    setReason(request.reason)
    setSelectedEmployee(request.employee)
    setEditingId(request.id)
    setShowForm(true)
  }

  // Handle delete request
  const handleDelete = (id) => {
    setRequests(requests.filter((request) => request.id !== id))
  }

  // Toggle form visibility
  const toggleForm = () => {
    if (showForm) {
      resetForm()
    }
    setShowForm(!showForm)
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h5">Overtime Requests</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={toggleForm}>
          ADD NEW
        </Button>
      </Box>

      <Collapse in={showForm} sx={{ mb: 3 }}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            {editingId !== null ? "Edit Overtime Request" : "New Overtime Request"}
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Typography sx={{ color: "#666", minWidth: 80 }}>Employee</Typography>
                <Select
                  value={selectedEmployee}
                  onChange={(e) => setSelectedEmployee(e.target.value)}
                  sx={{
                    flex: 1,
                    bgcolor: "white",
                    "& .MuiSelect-select": { py: 1 },
                  }}
                  displayEmpty
                >
                  <MenuItem value="" disabled>
                    Select Employee
                  </MenuItem>
                  {employees.map((emp) => (
                    <MenuItem key={emp} value={emp}>
                      {emp}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Typography sx={{ color: "#666", minWidth: 80 }}>Date</Typography>
                <TextField
                  fullWidth
                  type="date"
                  variant="outlined"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                  size="small"
                />
              </Box>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Typography sx={{ color: "#666", minWidth: 80 }}>In Time</Typography>
                <TextField
                  fullWidth
                  type="time"
                  variant="outlined"
                  value={inTime}
                  onChange={(e) => setInTime(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                  size="small"
                />
              </Box>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Typography sx={{ color: "#666", minWidth: 80 }}>Out Time</Typography>
                <TextField
                  fullWidth
                  type="time"
                  variant="outlined"
                  value={outTime}
                  onChange={(e) => setOutTime(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                  size="small"
                />
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Typography sx={{ color: "#666", minWidth: 80 }}>Reason</Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  multiline
                  rows={2}
                  size="small"
                />
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
                <Button
                  variant="outlined"
                  onClick={() => {
                    resetForm()
                    setShowForm(false)
                  }}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  onClick={handleSubmit}
                  disabled={!date || !inTime || !outTime || !reason || !selectedEmployee}
                >
                  {editingId !== null ? "Update" : "Submit"} Request
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Collapse>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
              <TableCell>Employee</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>In Time</TableCell>
              <TableCell>Out Time</TableCell>
              <TableCell>Total Hours</TableCell>
              <TableCell>Reason</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {requests.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  No overtime requests found. Click "ADD NEW" to create one.
                </TableCell>
              </TableRow>
            ) : (
              requests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell>{request.employee}</TableCell>
                  <TableCell>{request.date}</TableCell>
                  <TableCell>{request.inTime}</TableCell>
                  <TableCell>{request.outTime}</TableCell>
                  <TableCell>{request.totalHours}</TableCell>
                  <TableCell>{request.reason}</TableCell>
                  <TableCell>
                    <IconButton size="small" color="primary" onClick={() => handleEdit(request)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton size="small" color="error" onClick={() => handleDelete(request.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}
