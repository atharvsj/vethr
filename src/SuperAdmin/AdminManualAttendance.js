
// import { useState } from "react"
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
//   Select,
//   MenuItem,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   IconButton,
// } from "@mui/material"
// import AddIcon from "@mui/icons-material/Add"
// import CloseIcon from "@mui/icons-material/Close"
// import DeleteIcon from "@mui/icons-material/Delete"

// export default function ManualAttendance() {
//   // Sample employee data - replace with your actual data source
//   const employees = ["John Doe", "Jane Smith", "Robert Johnson", "Emily Davis", "Michael Wilson"]

//   // State for form fields
//   const [fromDate, setFromDate] = useState("")
//   const [toDate, setToDate] = useState("")
//   const [timeIn, setTimeIn] = useState("")
//   const [timeOut, setTimeOut] = useState("")
//   const [reason, setReason] = useState("")
//   const [selectedEmployee, setSelectedEmployee] = useState("")
//   const [requests, setRequests] = useState([])

//   // State for dialog open/close
//   const [open, setOpen] = useState(false)

//   // Handle dialog open
//   const handleClickOpen = () => {
//     setOpen(true)
//   }

//   // Handle dialog close
//   const handleClose = () => {
//     setOpen(false)
//     resetForm()
//   }

//   // Reset form fields
//   const resetForm = () => {
//     setFromDate("")
//     setToDate("")
//     setTimeIn("")
//     setTimeOut("")
//     setReason("")
//     setSelectedEmployee("")
//   }

//   // Handle form submission
//   const handleSubmit = () => {
//     if (!fromDate || !toDate || !timeIn || !timeOut || !reason || !selectedEmployee) {
//       alert("Please fill in all fields")
//       return
//     }

//     const newRequest = {
//       id: requests.length + 1,
//       employee: selectedEmployee,
//       fromDate,
//       toDate,
//       timeIn,
//       timeOut,
//       reason,
//     }

//     setRequests([...requests, newRequest])
//     handleClose()
//   }

//   // Handle deletion of request
//   const handleDelete = (id) => {
//     const updatedRequests = requests.filter((req) => req.id !== id)
//     setRequests(updatedRequests)
//   }

//   return (
//     <Box sx={{ p: 3 }}>
//       <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
//         <Typography variant="h5">Manual Attendance Requests</Typography>
//         <Button variant="contained" startIcon={<AddIcon />} onClick={handleClickOpen}>
//           ADD NEW
//         </Button>
//       </Box>

//       {/* Requests Table */}
//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Employee</TableCell>
//               <TableCell>From Date</TableCell>
//               <TableCell>To Date</TableCell>
//               <TableCell>Time In</TableCell>
//               <TableCell>Time Out</TableCell>
//               <TableCell>Reason</TableCell>
//               <TableCell>Action</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {requests.length > 0 ? (
//               requests.map((request) => (
//                 <TableRow key={request.id}>
//                   <TableCell>{request.employee}</TableCell>
//                   <TableCell>{request.fromDate}</TableCell>
//                   <TableCell>{request.toDate}</TableCell>
//                   <TableCell>{request.timeIn}</TableCell>
//                   <TableCell>{request.timeOut}</TableCell>
//                   <TableCell>{request.reason}</TableCell>
//                   <TableCell>
//                     <IconButton
//                       color="error"
//                       onClick={() => handleDelete(request.id)}
//                       aria-label="delete"
//                     >
//                       <DeleteIcon />
//                     </IconButton>
//                   </TableCell>
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell colSpan={7} align="center">
//                   No requests found
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       {/* Manual Attendance Request Dialog */}
//       <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
//         <DialogTitle>
//           Manual Attendance Request
//           <IconButton
//             aria-label="close"
//             onClick={handleClose}
//             sx={{
//               position: "absolute",
//               right: 8,
//               top: 8,
//             }}
//           >
//             <CloseIcon />
//           </IconButton>
//         </DialogTitle>
//         <DialogContent>
//           <Grid container spacing={2} sx={{ mt: 1 }}>
//             <Grid item xs={12}>
//               <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
//                 <Typography sx={{ color: "#666", minWidth: 80 }}>Employee</Typography>
//                 <Select
//                   value={selectedEmployee}
//                   onChange={(e) => setSelectedEmployee(e.target.value)}
//                   sx={{
//                     flex: 1,
//                     bgcolor: "white",
//                     "& .MuiSelect-select": { py: 1 },
//                   }}
//                   displayEmpty
//                 >
//                   <MenuItem value="" disabled>
//                     Select Employee
//                   </MenuItem>
//                   {employees.map((emp) => (
//                     <MenuItem key={emp} value={emp}>
//                       {emp}
//                     </MenuItem>
//                   ))}
//                 </Select>
//               </Box>
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 fullWidth
//                 label="From Date"
//                 type="date"
//                 variant="outlined"
//                 value={fromDate}
//                 onChange={(e) => setFromDate(e.target.value)}
//                 InputLabelProps={{ shrink: true }}
//                 size="small"
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 fullWidth
//                 label="To Date"
//                 type="date"
//                 variant="outlined"
//                 value={toDate}
//                 onChange={(e) => setToDate(e.target.value)}
//                 InputLabelProps={{ shrink: true }}
//                 size="small"
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 fullWidth
//                 label="Time In"
//                 type="time"
//                 variant="outlined"
//                 value={timeIn}
//                 onChange={(e) => setTimeIn(e.target.value)}
//                 InputLabelProps={{ shrink: true }}
//                 size="small"
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 fullWidth
//                 label="Time Out"
//                 type="time"
//                 variant="outlined"
//                 value={timeOut}
//                 onChange={(e) => setTimeOut(e.target.value)}
//                 InputLabelProps={{ shrink: true }}
//                 size="small"
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 fullWidth
//                 label="Reason"
//                 variant="outlined"
//                 value={reason}
//                 onChange={(e) => setReason(e.target.value)}
//                 multiline
//                 rows={2}
//                 size="small"
//               />
//             </Grid>
//           </Grid>
//         </DialogContent>
//         <DialogActions sx={{ px: 3, pb: 3 }}>
//           <Button variant="outlined" onClick={handleClose}>
//             Cancel
//           </Button>
//           <Button variant="contained" onClick={handleSubmit}>
//             Submit Request
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   )
// }


// import { useState } from "react"
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
//   Select,
//   MenuItem,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   IconButton,
// } from "@mui/material"
// import AddIcon from "@mui/icons-material/Add"
// import CloseIcon from "@mui/icons-material/Close"
// import DeleteIcon from "@mui/icons-material/Delete"
// import EditIcon from "@mui/icons-material/Edit" // Import EditIcon

// export default function ManualAttendance() {
//   // Sample employee data - replace with your actual data source
//   const employees = ["John Doe", "Jane Smith", "Robert Johnson", "Emily Davis", "Michael Wilson"]

//   // State for requests
//   const [requests, setRequests] = useState([
//     {
//       id: 1,
//       employee: "Emily Davis",
//       fromDate: "2024-05-20",
//       toDate: "2024-05-20",
//       timeIn: "09:15",
//       timeOut: "17:45",
//       reason: "Forgot to punch in.",
//     },
//   ])

//   // State for dialog form fields
//   const [fromDate, setFromDate] = useState("")
//   const [toDate, setToDate] = useState("")
//   const [timeIn, setTimeIn] = useState("")
//   const [timeOut, setTimeOut] = useState("")
//   const [reason, setReason] = useState("")
//   const [selectedEmployee, setSelectedEmployee] = useState("")

//   // State for dialog open/close and editing mode
//   const [open, setOpen] = useState(false)
//   const [editingId, setEditingId] = useState(null)

//   // Reset form fields to their initial state
//   const resetForm = () => {
//     setFromDate("")
//     setToDate("")
//     setTimeIn("")
//     setTimeOut("")
//     setReason("")
//     setSelectedEmployee("")
//   }

//   // Handle opening the dialog for a new request
//   const handleClickOpen = () => {
//     setEditingId(null) // Ensure we are in "add" mode
//     resetForm()
//     setOpen(true)
//   }

//   // Handle opening the dialog to edit an existing request
//   const handleEdit = (id) => {
//     const requestToEdit = requests.find((req) => req.id === id)
//     if (requestToEdit) {
//       setEditingId(id)
//       setFromDate(requestToEdit.fromDate)
//       setToDate(requestToEdit.toDate)
//       setTimeIn(requestToEdit.timeIn)
//       setTimeOut(requestToEdit.timeOut)
//       setReason(requestToEdit.reason)
//       setSelectedEmployee(requestToEdit.employee)
//       setOpen(true)
//     }
//   }

//   // Handle closing the dialog
//   const handleClose = () => {
//     setOpen(false)
//     setEditingId(null)
//     resetForm()
//   }

//   // Handle form submission for both creating and updating
//   const handleSubmit = () => {
//     if (!fromDate || !toDate || !timeIn || !timeOut || !reason || !selectedEmployee) {
//       alert("Please fill in all fields")
//       return
//     }

//     if (editingId !== null) {
//       // Update existing request
//       const updatedRequests = requests.map((req) =>
//         req.id === editingId
//           ? {
//               ...req,
//               fromDate,
//               toDate,
//               timeIn,
//               timeOut,
//               reason,
//               employee: selectedEmployee,
//             }
//           : req
//       )
//       setRequests(updatedRequests)
//     } else {
//       // Add a new request
//       const newRequest = {
//         id: requests.length > 0 ? Math.max(...requests.map(r => r.id)) + 1 : 1,
//         employee: selectedEmployee,
//         fromDate,
//         toDate,
//         timeIn,
//         timeOut,
//         reason,
//       }
//       setRequests([...requests, newRequest])
//     }

//     handleClose()
//   }

//   // Handle deletion of a request
//   const handleDelete = (id) => {
//     if (window.confirm("Are you sure you want to delete this request?")) {
//       const updatedRequests = requests.filter((req) => req.id !== id)
//       setRequests(updatedRequests)
//     }
//   }

//   return (
//     <Box sx={{ p: 3 }}>
//       <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
//         <Typography variant="h5">Manual Attendance Requests</Typography>
//         <Button variant="contained" startIcon={<AddIcon />} onClick={handleClickOpen}>
//           ADD NEW
//         </Button>
//       </Box>

//       {/* Requests Table */}
//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
//             <TableRow>
//               <TableCell><strong>Employee</strong></TableCell>
//               <TableCell><strong>From Date</strong></TableCell>
//               <TableCell><strong>To Date</strong></TableCell>
//               <TableCell><strong>Time In</strong></TableCell>
//               <TableCell><strong>Time Out</strong></TableCell>
//               <TableCell><strong>Reason</strong></TableCell>
//               <TableCell align="center"><strong>Action</strong></TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {requests.length > 0 ? (
//               requests.map((request) => (
//                 <TableRow key={request.id}>
//                   <TableCell>{request.employee}</TableCell>
//                   <TableCell>{request.fromDate}</TableCell>
//                   <TableCell>{request.toDate}</TableCell>
//                   <TableCell>{request.timeIn}</TableCell>
//                   <TableCell>{request.timeOut}</TableCell>
//                   <TableCell>{request.reason}</TableCell>
//                   <TableCell align="center">
//                     <IconButton
//                       color="primary"
//                       onClick={() => handleEdit(request.id)}
//                       aria-label="edit"
//                     >
//                       <EditIcon />
//                     </IconButton>
//                     <IconButton
//                       color="error"
//                       onClick={() => handleDelete(request.id)}
//                       aria-label="delete"
//                     >
//                       <DeleteIcon />
//                     </IconButton>
//                   </TableCell>
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell colSpan={7} align="center">
//                   No requests found
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       {/* Manual Attendance Request Dialog */}
//       <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
//         <DialogTitle>
//           {editingId ? "Edit Attendance Request" : "Manual Attendance Request"}
//           <IconButton
//             aria-label="close"
//             onClick={handleClose}
//             sx={{ position: "absolute", right: 8, top: 8 }}
//           >
//             <CloseIcon />
//           </IconButton>
//         </DialogTitle>
//         <DialogContent>
//           <Grid container spacing={2} sx={{ mt: 1 }}>
//             <Grid item xs={12}>
//                 <Typography sx={{ color: "#666", mb: 1 }}>Employee</Typography>
//                 <Select
//                   value={selectedEmployee}
//                   onChange={(e) => setSelectedEmployee(e.target.value)}
//                   fullWidth
//                   displayEmpty
//                   size="small"
//                 >
//                   <MenuItem value="" disabled>
//                     Select Employee
//                   </MenuItem>
//                   {employees.map((emp) => (
//                     <MenuItem key={emp} value={emp}>
//                       {emp}
//                     </MenuItem>
//                   ))}
//                 </Select>
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 fullWidth
//                 label="From Date"
//                 type="date"
//                 variant="outlined"
//                 value={fromDate}
//                 onChange={(e) => setFromDate(e.target.value)}
//                 InputLabelProps={{ shrink: true }}
//                 size="small"
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 fullWidth
//                 label="To Date"
//                 type="date"
//                 variant="outlined"
//                 value={toDate}
//                 onChange={(e) => setToDate(e.target.value)}
//                 InputLabelProps={{ shrink: true }}
//                 size="small"
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 fullWidth
//                 label="Time In"
//                 type="time"
//                 variant="outlined"
//                 value={timeIn}
//                 onChange={(e) => setTimeIn(e.target.value)}
//                 InputLabelProps={{ shrink: true }}
//                 size="small"
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 fullWidth
//                 label="Time Out"
//                 type="time"
//                 variant="outlined"
//                 value={timeOut}
//                 onChange={(e) => setTimeOut(e.target.value)}
//                 InputLabelProps={{ shrink: true }}
//                 size="small"
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 fullWidth
//                 label="Reason"
//                 variant="outlined"
//                 value={reason}
//                 onChange={(e) => setReason(e.target.value)}
//                 multiline
//                 rows={2}
//                 size="small"
//               />
//             </Grid>
//           </Grid>
//         </DialogContent>
//         <DialogActions sx={{ p: 2 }}>
//           <Button variant="outlined" onClick={handleClose}>
//             Cancel
//           </Button>
//           <Button variant="contained" onClick={handleSubmit}>
//             {editingId ? "Update Request" : "Submit Request"}
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   )
// }


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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from "@mui/material"
import AddIcon from "@mui/icons-material/Add"
import CloseIcon from "@mui/icons-material/Close"
import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from "@mui/icons-material/Edit"

export default function ManualAttendance() {
  // Sample employee data - replace with your actual data source
  const employees = ["John Doe", "Jane Smith", "Robert Johnson", "Emily Davis", "Michael Wilson"]

  // State for requests
  const [requests, setRequests] = useState([
    {
      id: 1,
      employee: "Emily Davis",
      attendanceDate: "2024-05-20",
      timeIn: "09:15",
      timeOut: "17:45",
      reason: "Forgot to punch in.",
    },
  ])

  // State for dialog form fields
  const [attendanceDate, setAttendanceDate] = useState("")
  const [timeIn, setTimeIn] = useState("")
  const [timeOut, setTimeOut] = useState("")
  const [reason, setReason] = useState("")
  const [selectedEmployee, setSelectedEmployee] = useState("")

  // State for dialog open/close and editing mode
  const [open, setOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)

  // Reset form fields to their initial state
  const resetForm = () => {
    setAttendanceDate("")
    setTimeIn("")
    setTimeOut("")
    setReason("")
    setSelectedEmployee("")
  }

  // Handle opening the dialog for a new request
  const handleClickOpen = () => {
    setEditingId(null) // Ensure we are in "add" mode
    resetForm()
    setOpen(true)
  }

  // Handle opening the dialog to edit an existing request
  const handleEdit = (id) => {
    const requestToEdit = requests.find((req) => req.id === id)
    if (requestToEdit) {
      setEditingId(id)
      setAttendanceDate(requestToEdit.attendanceDate)
      setTimeIn(requestToEdit.timeIn)
      setTimeOut(requestToEdit.timeOut)
      setReason(requestToEdit.reason)
      setSelectedEmployee(requestToEdit.employee)
      setOpen(true)
    }
  }

  // Handle closing the dialog
  const handleClose = () => {
    setOpen(false)
    setEditingId(null)
    resetForm()
  }

  // Handle form submission for both creating and updating
  const handleSubmit = () => {
    if (!attendanceDate || !timeIn || !timeOut || !reason || !selectedEmployee) {
      alert("Please fill in all fields")
      return
    }

    if (editingId !== null) {
      // Update existing request
      const updatedRequests = requests.map((req) =>
        req.id === editingId
          ? {
              ...req,
              attendanceDate,
              timeIn,
              timeOut,
              reason,
              employee: selectedEmployee,
            }
          : req
      )
      setRequests(updatedRequests)
    } else {
      // Add a new request
      const newRequest = {
        id: requests.length > 0 ? Math.max(...requests.map((r) => r.id)) + 1 : 1,
        employee: selectedEmployee,
        attendanceDate,
        timeIn,
        timeOut,
        reason,
      }
      setRequests([...requests, newRequest])
    }

    handleClose()
  }

  // Handle deletion of a request
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this request?")) {
      const updatedRequests = requests.filter((req) => req.id !== id)
      setRequests(updatedRequests)
    }
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h5">Manual Attendance Requests</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleClickOpen}>
          ADD NEW
        </Button>
      </Box>

      {/* Requests Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
            <TableRow>
              <TableCell>
                <strong>Employee</strong>
              </TableCell>
              <TableCell>
                <strong>Attendance Date</strong>
              </TableCell>
              <TableCell>
                <strong>Time In</strong>
              </TableCell>
              <TableCell>
                <strong>Time Out</strong>
              </TableCell>
              <TableCell>
                <strong>Reason</strong>
              </TableCell>
              <TableCell align="center">
                <strong>Action</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {requests.length > 0 ? (
              requests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell>{request.employee}</TableCell>
                  <TableCell>{request.attendanceDate}</TableCell>
                  <TableCell>{request.timeIn}</TableCell>
                  <TableCell>{request.timeOut}</TableCell>
                  <TableCell>{request.reason}</TableCell>
                  <TableCell align="center">
                    <IconButton
                      color="primary"
                      onClick={() => handleEdit(request.id)}
                      aria-label="edit"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(request.id)}
                      aria-label="delete"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No requests found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Manual Attendance Request Dialog */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle>
          {editingId ? "Edit Attendance Request" : "Manual Attendance Request"}
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <Typography sx={{ color: "#666", mb: 1 }}>Employee *</Typography>
              <Select
                value={selectedEmployee}
                onChange={(e) => setSelectedEmployee(e.target.value)}
                fullWidth
                displayEmpty
                size="small"
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
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Attendance Date *"
                type="date"
                variant="outlined"
                value={attendanceDate}
                onChange={(e) => setAttendanceDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Time In *"
                type="time"
                variant="outlined"
                value={timeIn}
                onChange={(e) => setTimeIn(e.target.value)}
                InputLabelProps={{ shrink: true }}
                size="small"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Time Out *"
                type="time"
                variant="outlined"
                value={timeOut}
                onChange={(e) => setTimeOut(e.target.value)}
                InputLabelProps={{ shrink: true }}
                size="small"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Reason *"
                variant="outlined"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                multiline
                rows={3}
                size="small"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSubmit}>
            {editingId ? "Update Request" : "Submit Request"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}