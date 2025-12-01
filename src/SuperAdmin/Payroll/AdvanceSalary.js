// import React, { useState } from "react";

// import {
//   Box,
//   Button,
//   Card,
//   CardContent,
//   Grid,
//   MenuItem,
//   Select,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TextField,
//   Typography,
//   TableSortLabel,
// } from "@mui/material";
// import { Add, Close } from "@mui/icons-material";
// import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import dayjs from "dayjs";

// const AdvanceSalary = () => {
//   const [showForm, setShowForm] = useState(false);
//   const [formData, setFormData] = useState({
//     employee: "",
//     monthYear: null,
//     amount: "",
//     oneTimeDeduct: "No",
//     monthlyInstallment: "",
//     reason: "",
//   });

//   const [salaryList, setSalaryList] = useState([
//     {
//       employee: "Kumar Patil",
//       email: "patilvetrina@gmail.com",
//       amount: 2000,
//       paid: 0,
//       monthYear: "February, 2024",
//       oneTimeDeduct: "Yes",
//       emi: 2000,
//       createdAt: "12-02-2024",
//     },
//     {
//       employee: "Kumar Patil",
//       email: "patilvetrina@gmail.com",
//       amount: 2000,
//       paid: 0,
//       monthYear: "February, 2024",
//       oneTimeDeduct: "No",
//       emi: 2000,
//       createdAt: "28-02-2024",
//     },
//   ]);

//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [orderBy, setOrderBy] = useState("employee"); // Default column to sort by
//   const [order, setOrder] = useState("asc"); // Default order is ascending
//   const [hoveredRow, setHoveredRow] = useState(null);
//   const handleAddNew = () => {
//     setShowForm(true);
//   };

//   const handleCloseForm = () => {
//     setShowForm(false);
//     handleReset();
//   };

//   const handleReset = () => {
//     setFormData({
//       employee: "",
//       monthYear: null,
//       amount: "",
//       oneTimeDeduct: "No",
//       monthlyInstallment: "",
//       reason: "",
//     });
//   };

//   const handleSave = () => {
//     const newRecord = {
//       employee: formData.employee,
//       email: "dummyemail@gmail.com",
//       amount: parseFloat(formData.amount),
//       paid: 0,
//       monthYear: formData.monthYear?.format("MMMM, YYYY"),
//       oneTimeDeduct: formData.oneTimeDeduct,
//       emi: parseFloat(formData.monthlyInstallment),
//       createdAt: dayjs().format("DD-MM-YYYY"),
//     };
//     setSalaryList([...salaryList, newRecord]);
//     setShowForm(false);
//     handleReset();
//   };

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const handleSearchChange = (event) => {
//     setSearchTerm(event.target.value);
//   };

//   const handleRequestSort = (event, property) => {
//     const isAsc = orderBy === property && order === "asc";
//     setOrder(isAsc ? "desc" : "asc");
//     setOrderBy(property);
//   };

//   const sortData = (array) => {
//     const sortedArray = array.sort((a, b) => {
//       if (a[orderBy] < b[orderBy]) {
//         return order === "asc" ? -1 : 1;
//       }
//       if (a[orderBy] > b[orderBy]) {
//         return order === "asc" ? 1 : -1;
//       }
//       return 0;
//     });
//     return sortedArray;
//   };

//   // Filter salaryList based on the search term
//   const filteredSalaryList = salaryList.filter((item) =>
//     item.employee.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <Box p={2}>
//       {/* Header */}
//       <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
//         <Typography variant="h6">Advance Salary</Typography>
//         {!showForm && (
//           <Button
//             onClick={handleAddNew}
//             variant="contained"
//             startIcon={<Add />}
//             sx={{
//               backgroundColor: "#7c3aed",
//               borderRadius: "8px",
//               textTransform: "none",
//               "&:hover": {
//                 backgroundColor: "#6b21a8",
//               },
//             }}
//           >
//             Add New
//           </Button>
//         )}
//       </Box>

//       {/* Form Container */}
//       {showForm && (
//         <Box mb={4}>
//           <Box display="flex" justifyContent="flex-end" mb={1}>
//             <Button
//               onClick={handleCloseForm}
//               startIcon={<Close />}
//               variant="outlined"
//               sx={{
//                 borderRadius: "8px",
//                 textTransform: "none",
//                 borderColor: "#f87171",
//                 color: "#f87171",
//                 "&:hover": {
//                   borderColor: "#dc2626",
//                   color: "#dc2626",
//                 },
//               }}
//             >
//               Close
//             </Button>
//           </Box>
//           <Card>
//             <CardContent>
//               <Typography variant="h6" gutterBottom>Add Advance Salary</Typography>
//               <Grid container spacing={2}>
//                 <Grid item xs={12} md={4}>
//                   <TextField
//                     label="Employee"
//                     fullWidth
//                     required
//                     value={formData.employee}
//                     onChange={(e) => setFormData({ ...formData, employee: e.target.value })}
//                   />
//                 </Grid>

//                 <Grid item xs={12} md={4}>
//                   <LocalizationProvider dateAdapter={AdapterDayjs}>
//                     <DatePicker
//                       views={["year", "month"]}
//                       label="Month & Year"
//                       value={formData.monthYear}
//                       onChange={(newValue) => setFormData({ ...formData, monthYear: newValue })}
//                       renderInput={(params) => <TextField fullWidth required {...params} />}
//                     />
//                   </LocalizationProvider>
//                 </Grid>

//                 <Grid item xs={12} md={4}>
//                   <TextField
//                     label="Amount"
//                     fullWidth
//                     required
//                     InputProps={{ startAdornment: <Box mr={1}>INR</Box> }}
//                     value={formData.amount}
//                     onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
//                   />
//                 </Grid>

//                 <Grid item xs={12} md={4}>
//                   <Select
//                     label="One Time Deduct"
//                     fullWidth
//                     value={formData.oneTimeDeduct}
//                     onChange={(e) => setFormData({ ...formData, oneTimeDeduct: e.target.value })}
//                   >
//                     <MenuItem value="Yes">Yes</MenuItem>
//                     <MenuItem value="No">No</MenuItem>
//                   </Select>
//                 </Grid>

//                 <Grid item xs={12} md={4}>
//                   <TextField
//                     label="Monthly Installment Amount"
//                     fullWidth
//                     required
//                     InputProps={{ startAdornment: <Box mr={1}>INR</Box> }}
//                     value={formData.monthlyInstallment}
//                     onChange={(e) => setFormData({ ...formData, monthlyInstallment: e.target.value })}
//                   />
//                 </Grid>

//                 <Grid item xs={12}>
//                   <TextField
//                     label="Reason"
//                     multiline
//                     minRows={1}
//                     fullWidth
//                     required
//                     value={formData.reason}
//                     onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
//                   />
//                 </Grid>
//               </Grid>

//               {/* Form Buttons */}
//               <Box mt={3} display="flex" justifyContent="space-between" alignItems="center">
//                 <Button
//                   onClick={handleReset}
//                   variant="outlined"
//                   sx={{
//                     color: "#7c3aed",
//                     borderColor: "#7c3aed",
//                     borderRadius: "8px",
//                     textTransform: "none",
//                     "&:hover": {
//                       borderColor: "#6b21a8",
//                     },
//                   }}
//                 >
//                   Reset
//                 </Button>

//                 <Button
//                   onClick={handleSave}
//                   variant="contained"
//                   sx={{
//                     backgroundColor: "#7c3aed",
//                     borderRadius: "8px",
//                     textTransform: "none",
//                     "&:hover": {
//                       backgroundColor: "#6b21a8",
//                     },
//                   }}
//                 >
//                   Save
//                 </Button>
//               </Box>
//             </CardContent>
//           </Card>
//         </Box>
//       )}

//       {/* Table Container */}
//       <Card>
//         <CardContent>
//           {/* Label above the Rows per Page dropdown */}
//           <Typography variant="h6" gutterBottom>List All Advance Salary</Typography>

//           <Box display="flex" justifyContent="space-between" mb={2}>
//             <Select
//               value={rowsPerPage}
//               onChange={handleChangeRowsPerPage}
//               sx={{
//                 width: "auto",
//                 fontSize: "0.875rem",
//                 borderRadius: "8px",
//               }}
//             >
//               <MenuItem value={5}>5 rows</MenuItem>
//               <MenuItem value={10}>10 rows</MenuItem>
//               <MenuItem value={20}>20 rows</MenuItem>
//               <MenuItem value={50}>50 rows</MenuItem>
//             </Select>
//             <TextField
//               label="Search Employee"
//               variant="outlined"
//               size="small"
//               value={searchTerm}
//               onChange={handleSearchChange}
//               sx={{ width: "250px" }}
//             />
//           </Box>

//           <TableContainer>
//             <Table>
//               <TableHead>
//                 <TableRow>
//                   <TableCell>
//                     <TableSortLabel
//                       active={orderBy === "employee"}
//                       direction={orderBy === "employee" ? order : "asc"}
//                       onClick={(event) => handleRequestSort(event, "employee")}
//                     >
//                       EMPLOYEE
//                     </TableSortLabel>
//                   </TableCell>
//                   <TableCell>
//                     <TableSortLabel
//                       active={orderBy === "amount"}
//                       direction={orderBy === "amount" ? order : "asc"}
//                       onClick={(event) => handleRequestSort(event, "amount")}
//                     >
//                       AMOUNT
//                     </TableSortLabel>
//                   </TableCell>
//                   <TableCell>
//                     <TableSortLabel
//                       active={orderBy === "monthYear"}
//                       direction={orderBy === "monthYear" ? order : "asc"}
//                       onClick={(event) => handleRequestSort(event, "monthYear")}
//                     >
//                       MONTH/YEAR
//                     </TableSortLabel>
//                   </TableCell>
//                   <TableCell>
//                     <TableSortLabel
//                       active={orderBy === "oneTimeDeduct"}
//                       direction={orderBy === "oneTimeDeduct" ? order : "asc"}
//                       onClick={(event) => handleRequestSort(event, "oneTimeDeduct")}
//                     >
//                       ONE TIME DEDUCT
//                     </TableSortLabel>
//                   </TableCell>
//                   <TableCell>
//                     <TableSortLabel
//                       active={orderBy === "emi"}
//                       direction={orderBy === "emi" ? order : "asc"}
//                       onClick={(event) => handleRequestSort(event, "emi")}
//                     >
//                       EMI
//                     </TableSortLabel>
//                   </TableCell>
//                   <TableCell>
//                     <TableSortLabel
//                       active={orderBy === "createdAt"}
//                       direction={orderBy === "createdAt" ? order : "asc"}
//                       onClick={(event) => handleRequestSort(event, "createdAt")}
//                     >
//                       CREATED AT
//                     </TableSortLabel>
//                   </TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//   {sortData(filteredSalaryList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)).map((item, index) => {
//     const rowIndex = page * rowsPerPage + index; // To keep track globally
//     const isHovered = rowIndex === hoveredRow;

//     return (
//       <TableRow
//         key={index}
//         onMouseEnter={() => setHoveredRow(rowIndex)}
//         onMouseLeave={() => setHoveredRow(null)}
//       >
//         <TableCell>
//           {isHovered ? (
//             <Box display="flex" gap={1}>
//               <Button
//                 variant="outlined"
//                 size="small"
//                 sx={{
//                   color: "#0ea5e9",
//                   borderColor: "#0ea5e9",
//                   textTransform: "none",
//                   borderRadius: "8px",
//                   "&:hover": {
//                     backgroundColor: "#0ea5e9",
//                     color: "white",
//                   },
//                 }}
//               >
//                 Edit
//               </Button>
//               <Button
//                 variant="outlined"
//                 size="small"
//                 sx={{
//                   color: "#ef4444",
//                   borderColor: "#ef4444",
//                   textTransform: "none",
//                   borderRadius: "8px",
//                   "&:hover": {
//                     backgroundColor: "#ef4444",
//                     color: "white",
//                   },
//                 }}
//               >
//                 Delete
//               </Button>
//             </Box>
//           ) : (
//             item.employee
//           )}
//         </TableCell>
//         <TableCell>{item.amount}</TableCell>
//         <TableCell>{item.monthYear}</TableCell>
//         <TableCell>{item.oneTimeDeduct}</TableCell>
//         <TableCell>{item.emi}</TableCell>
//         <TableCell>{item.createdAt}</TableCell>
//       </TableRow>
//     );
//   })}
// </TableBody>

//             </Table>
//           </TableContainer>

//           {/* Pagination */}
//        {/* Pagination */}
// <Box sx={{ mt: 2 }}>
//   <Grid container justifyContent="flex-end" alignItems="center" spacing={1}>
//     <Grid item>
//       <Button
//         variant="outlined"
//         size="small"
//         onClick={() => setPage(page - 1)}
//         disabled={page === 0}
//         sx={{
//           color: '#7C3AED',
//           borderColor: '#7C3AED',
//           '&:hover': {
//             backgroundColor: '#7C3AED',
//             borderColor: '#7C3AED',
//             color: 'white',
//           },
//         }}
//       >
//         Previous
//       </Button>
//     </Grid>

//     <Grid item>
//       <Typography variant="body2">
//         Page {page + 1} of {Math.max(1, Math.ceil(filteredSalaryList.length / rowsPerPage))}
//       </Typography>
//     </Grid>

//     <Grid item>
//       <Button
//         variant="outlined"
//         size="small"
//         onClick={() => setPage(page + 1)}
//         disabled={page >= Math.ceil(filteredSalaryList.length / rowsPerPage) - 1}
//         sx={{
//           color: '#7C3AED',
//           borderColor: '#7C3AED',
//           '&:hover': {
//             backgroundColor: '#7C3AED',
//             borderColor: '#7C3AED',
//             color: 'white',
//           },
//         }}
//       >
//         Next
//       </Button>
//     </Grid>
//   </Grid>
// </Box>

//         </CardContent>
//       </Card>
//     </Box>
//   );
// };

// export default AdvanceSalary;



"use client"

import { useState } from "react"
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  TableSortLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  IconButton,
  Alert,
  AlertTitle,
} from "@mui/material"
import { Add, Close } from "@mui/icons-material"
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import dayjs from "dayjs"

const AdvanceSalary = () => {
  const [showForm, setShowForm] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [editingIndex, setEditingIndex] = useState(null)
  const [deletingIndex, setDeletingIndex] = useState(null)

  const [formData, setFormData] = useState({
    employee: "",
    monthYear: null,
    amount: "",
    oneTimeDeduct: "No",
    monthlyInstallment: "",
    reason: "",
    status: "Pending",
  })

  const [editFormData, setEditFormData] = useState({
    employee: "",
    monthYear: null,
    amount: "",
    oneTimeDeduct: "No",
    monthlyInstallment: "",
    reason: "",
    status: "Pending",
  })

  const [salaryList, setSalaryList] = useState([
    {
      employee: "Kumar Patil",
      email: "patilvetrina@gmail.com",
      amount: 2000,
      paid: 0,
      monthYear: "February, 2024",
      oneTimeDeduct: "Yes",
      emi: 2000,
      createdAt: "12-02-2024",
      status: "Pending",
      reason: "Emergency medical expenses",
    },
    {
      employee: "Mangesh Chadigaonkar",
      email: "mangesh@gmail.com",
      amount: 2000,
      paid: 0,
      monthYear: "February, 2024",
      oneTimeDeduct: "No",
      emi: 2000,
      createdAt: "28-02-2024",
      status: "Pending",
      reason: "Home renovation",
    },
  ])

  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [searchTerm, setSearchTerm] = useState("")
  const [orderBy, setOrderBy] = useState("employee")
  const [order, setOrder] = useState("asc")
  const [hoveredRow, setHoveredRow] = useState(null)

  const handleAddNew = () => {
    setShowForm(true)
  }

  const handleCloseForm = () => {
    setShowForm(false)
    handleReset()
  }

  const handleReset = () => {
    setFormData({
      employee: "",
      monthYear: null,
      amount: "",
      oneTimeDeduct: "No",
      monthlyInstallment: "",
      reason: "",
      status: "Pending",
    })
  }

  const handleSave = () => {
    const newRecord = {
      employee: formData.employee,
      email: "dummyemail@gmail.com",
      amount: Number.parseFloat(formData.amount),
      paid: 0,
      monthYear: formData.monthYear?.format("MMMM, YYYY"),
      oneTimeDeduct: formData.oneTimeDeduct,
      emi: Number.parseFloat(formData.monthlyInstallment),
      createdAt: dayjs().format("DD-MM-YYYY"),
      status: formData.status,
      reason: formData.reason,
    }

    setSalaryList([...salaryList, newRecord])
    setShowForm(false)
    handleReset()
  }

  const handleEdit = (index) => {
    const actualIndex = page * rowsPerPage + index
    const record = salaryList[actualIndex]
    setEditingIndex(actualIndex)

    // Convert monthYear string back to dayjs object for DatePicker
    let monthYearObj = null
    if (record.monthYear) {
      const [month, year] = record.monthYear.split(", ")
      monthYearObj = dayjs(`${month} ${year}`, "MMMM YYYY")
    }

    setEditFormData({
      employee: record.employee,
      monthYear: monthYearObj,
      amount: record.amount.toString(),
      oneTimeDeduct: record.oneTimeDeduct,
      monthlyInstallment: record.emi.toString(),
      reason: record.reason,
      status: record.status,
    })
    setShowEditModal(true)
  }

  const handleUpdateSave = () => {
    const updatedList = [...salaryList]
    updatedList[editingIndex] = {
      ...updatedList[editingIndex],
      employee: editFormData.employee,
      monthYear: editFormData.monthYear?.format("MMMM, YYYY"),
      amount: Number.parseFloat(editFormData.amount),
      oneTimeDeduct: editFormData.oneTimeDeduct,
      emi: Number.parseFloat(editFormData.monthlyInstallment),
      reason: editFormData.reason,
      status: editFormData.status,
    }
    setSalaryList(updatedList)
    setShowEditModal(false)
    setEditingIndex(null)
  }

  const handleDelete = (index) => {
    const actualIndex = page * rowsPerPage + index
    setDeletingIndex(actualIndex)
    setShowDeleteDialog(true)
  }

  const confirmDelete = () => {
    const updatedList = salaryList.filter((_, index) => index !== deletingIndex)
    setSalaryList(updatedList)
    setShowDeleteDialog(false)
    setDeletingIndex(null)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(Number.parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
  }

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc"
    setOrder(isAsc ? "desc" : "asc")
    setOrderBy(property)
  }

  const sortData = (array) => {
    const sortedArray = array.sort((a, b) => {
      if (a[orderBy] < b[orderBy]) {
        return order === "asc" ? -1 : 1
      }
      if (a[orderBy] > b[orderBy]) {
        return order === "asc" ? 1 : -1
      }
      return 0
    })
    return sortedArray
  }

  const filteredSalaryList = salaryList.filter((item) => item.employee.toLowerCase().includes(searchTerm.toLowerCase()))

  const calculateRemaining = () => {
    if (editingIndex !== null && editFormData.amount) {
      return Number.parseFloat(editFormData.amount) - (salaryList[editingIndex]?.paid || 0)
    }
    return 0
  }

  return (
    <Box p={2}>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6">Advance Salary</Typography>
        {!showForm && (
          <Button
            onClick={handleAddNew}
            variant="contained"
            startIcon={<Add />}
            sx={{
              backgroundColor: "#7c3aed",
              borderRadius: "8px",
              textTransform: "none",
              "&:hover": {
                backgroundColor: "#6b21a8",
              },
            }}
          >
            Add New
          </Button>
        )}
      </Box>

      {/* Form Container */}
      {showForm && (
        <Box mb={4}>
          <Box display="flex" justifyContent="flex-end" mb={1}>
            <Button
              onClick={handleCloseForm}
              startIcon={<Close />}
              variant="outlined"
              sx={{
                borderRadius: "8px",
                textTransform: "none",
                borderColor: "#f87171",
                color: "#f87171",
                "&:hover": {
                  borderColor: "#dc2626",
                  color: "#dc2626",
                },
              }}
            >
              Close
            </Button>
          </Box>

          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Add Advance Salary
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <TextField
                    label="Employee"
                    fullWidth
                    required
                    value={formData.employee}
                    onChange={(e) => setFormData({ ...formData, employee: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      views={["year", "month"]}
                      label="Month & Year"
                      value={formData.monthYear}
                      onChange={(newValue) => setFormData({ ...formData, monthYear: newValue })}
                      renderInput={(params) => <TextField fullWidth required {...params} />}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    label="Amount"
                    fullWidth
                    required
                    InputProps={{ startAdornment: <Box mr={1}>INR</Box> }}
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormControl fullWidth>
                    <InputLabel>One Time Deduct</InputLabel>
                    <Select
                      label="One Time Deduct"
                      value={formData.oneTimeDeduct}
                      onChange={(e) => setFormData({ ...formData, oneTimeDeduct: e.target.value })}
                    >
                      <MenuItem value="Yes">Yes</MenuItem>
                      <MenuItem value="No">No</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    label="Monthly Installment Amount"
                    fullWidth
                    required
                    InputProps={{ startAdornment: <Box mr={1}>INR</Box> }}
                    value={formData.monthlyInstallment}
                    onChange={(e) => setFormData({ ...formData, monthlyInstallment: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormControl fullWidth>
                    <InputLabel>Status</InputLabel>
                    <Select
                      label="Status"
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    >
                      <MenuItem value="Pending">Pending</MenuItem>
                      <MenuItem value="Approved">Approved</MenuItem>
                      <MenuItem value="Partial">Partial</MenuItem>
                      <MenuItem value="Completed">Completed</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Reason"
                    multiline
                    minRows={1}
                    fullWidth
                    required
                    value={formData.reason}
                    onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                  />
                </Grid>
              </Grid>

              {/* Form Buttons */}
              <Box mt={3} display="flex" justifyContent="space-between" alignItems="center">
                <Button
                  onClick={handleReset}
                  variant="outlined"
                  sx={{
                    color: "#7c3aed",
                    borderColor: "#7c3aed",
                    borderRadius: "8px",
                    textTransform: "none",
                    "&:hover": {
                      borderColor: "#6b21a8",
                    },
                  }}
                >
                  Reset
                </Button>
                <Button
                  onClick={handleSave}
                  variant="contained"
                  sx={{
                    backgroundColor: "#7c3aed",
                    borderRadius: "8px",
                    textTransform: "none",
                    "&:hover": {
                      backgroundColor: "#6b21a8",
                    },
                  }}
                >
                  Save
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Box>
      )}

      {/* Table Container */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            List All Advance Salary
          </Typography>
          <Box display="flex" justifyContent="space-between" mb={2}>
            <Select
              value={rowsPerPage}
              onChange={handleChangeRowsPerPage}
              sx={{
                width: "auto",
                fontSize: "0.875rem",
                borderRadius: "8px",
              }}
            >
              <MenuItem value={5}>5 rows</MenuItem>
              <MenuItem value={10}>10 rows</MenuItem>
              <MenuItem value={20}>20 rows</MenuItem>
              <MenuItem value={50}>50 rows</MenuItem>
            </Select>

            <TextField
              label="Search Employee"
              variant="outlined"
              size="small"
              value={searchTerm}
              onChange={handleSearchChange}
              sx={{ width: "250px" }}
            />
          </Box>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <TableSortLabel
                      active={orderBy === "employee"}
                      direction={orderBy === "employee" ? order : "asc"}
                      onClick={(event) => handleRequestSort(event, "employee")}
                    >
                      EMPLOYEE
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={orderBy === "amount"}
                      direction={orderBy === "amount" ? order : "asc"}
                      onClick={(event) => handleRequestSort(event, "amount")}
                    >
                      AMOUNT
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={orderBy === "monthYear"}
                      direction={orderBy === "monthYear" ? order : "asc"}
                      onClick={(event) => handleRequestSort(event, "monthYear")}
                    >
                      MONTH/YEAR
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={orderBy === "oneTimeDeduct"}
                      direction={orderBy === "oneTimeDeduct" ? order : "asc"}
                      onClick={(event) => handleRequestSort(event, "oneTimeDeduct")}
                    >
                      ONE TIME DEDUCT
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={orderBy === "emi"}
                      direction={orderBy === "emi" ? order : "asc"}
                      onClick={(event) => handleRequestSort(event, "emi")}
                    >
                      EMI
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={orderBy === "createdAt"}
                      direction={orderBy === "createdAt" ? order : "asc"}
                      onClick={(event) => handleRequestSort(event, "createdAt")}
                    >
                      CREATED AT
                    </TableSortLabel>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sortData(filteredSalaryList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)).map(
                  (item, index) => {
                    const rowIndex = page * rowsPerPage + index
                    const isHovered = rowIndex === hoveredRow

                    return (
                      <TableRow
                        key={index}
                        onMouseEnter={() => setHoveredRow(rowIndex)}
                        onMouseLeave={() => setHoveredRow(null)}
                      >
                        <TableCell>
                          {isHovered ? (
                            <Box display="flex" gap={1}>
                              <Button
                                variant="outlined"
                                size="small"
                                onClick={() => handleEdit(index)}
                                sx={{
                                  color: "#0ea5e9",
                                  borderColor: "#0ea5e9",
                                  textTransform: "none",
                                  borderRadius: "8px",
                                  "&:hover": {
                                    backgroundColor: "#0ea5e9",
                                    color: "white",
                                  },
                                }}
                              >
                                Edit
                              </Button>
                              <Button
                                variant="outlined"
                                size="small"
                                onClick={() => handleDelete(index)}
                                sx={{
                                  color: "#ef4444",
                                  borderColor: "#ef4444",
                                  textTransform: "none",
                                  borderRadius: "8px",
                                  "&:hover": {
                                    backgroundColor: "#ef4444",
                                    color: "white",
                                  },
                                }}
                              >
                                Delete
                              </Button>
                            </Box>
                          ) : (
                            item.employee
                          )}
                        </TableCell>
                        <TableCell>{item.amount}</TableCell>
                        <TableCell>{item.monthYear}</TableCell>
                        <TableCell>{item.oneTimeDeduct}</TableCell>
                        <TableCell>{item.emi}</TableCell>
                        <TableCell>{item.createdAt}</TableCell>
                      </TableRow>
                    )
                  },
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Pagination */}
          <Box sx={{ mt: 2 }}>
            <Grid container justifyContent="flex-end" alignItems="center" spacing={1}>
              <Grid item>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => setPage(page - 1)}
                  disabled={page === 0}
                  sx={{
                    color: "#7C3AED",
                    borderColor: "#7C3AED",
                    "&:hover": {
                      backgroundColor: "#7C3AED",
                      borderColor: "#7C3AED",
                      color: "white",
                    },
                  }}
                >
                  Previous
                </Button>
              </Grid>
              <Grid item>
                <Typography variant="body2">
                  Page {page + 1} of {Math.max(1, Math.ceil(filteredSalaryList.length / rowsPerPage))}
                </Typography>
              </Grid>
              <Grid item>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => setPage(page + 1)}
                  disabled={page >= Math.ceil(filteredSalaryList.length / rowsPerPage) - 1}
                  sx={{
                    color: "#7C3AED",
                    borderColor: "#7C3AED",
                    "&:hover": {
                      backgroundColor: "#7C3AED",
                      borderColor: "#7C3AED",
                      color: "white",
                    },
                  }}
                >
                  Next
                </Button>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>

      {/* Edit Modal */}
      <Dialog
        open={showEditModal}
        onClose={() => setShowEditModal(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: "12px",
          },
        }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            pb: 1,
          }}
        >
          <Box>
            <Typography variant="h6" component="div">
              Edit Advance Salary request Information
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              We need below required information to update this record.
            </Typography>
          </Box>
          <IconButton onClick={() => setShowEditModal(false)} sx={{ color: "text.secondary" }}>
            <Close />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ pt: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Employee *</InputLabel>
                <Select
                  label="Employee *"
                  value={editFormData.employee}
                  onChange={(e) => setEditFormData({ ...editFormData, employee: e.target.value })}
                >
                  <MenuItem value="Kumar Patil">Kumar Patil</MenuItem>
                  <MenuItem value="Mangesh Chadigaonkar">Mangesh Chadigaonkar</MenuItem>
                  <MenuItem value="John Doe">John Doe</MenuItem>
                  <MenuItem value="Jane Smith">Jane Smith</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  views={["year", "month"]}
                  label="Month & Year *"
                  value={editFormData.monthYear}
                  onChange={(newValue) => setEditFormData({ ...editFormData, monthYear: newValue })}
                  renderInput={(params) => <TextField fullWidth margin="normal" required {...params} />}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Amount *"
                fullWidth
                margin="normal"
                required
                InputProps={{ startAdornment: <Box mr={1}>INR</Box> }}
                value={editFormData.amount}
                onChange={(e) => setEditFormData({ ...editFormData, amount: e.target.value })}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel>One Time Deduct *</InputLabel>
                <Select
                  label="One Time Deduct *"
                  value={editFormData.oneTimeDeduct}
                  onChange={(e) => setEditFormData({ ...editFormData, oneTimeDeduct: e.target.value })}
                >
                  <MenuItem value="Yes">Yes</MenuItem>
                  <MenuItem value="No">No</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Monthly Installment Amount *"
                fullWidth
                margin="normal"
                required
                InputProps={{ startAdornment: <Box mr={1}>INR</Box> }}
                value={editFormData.monthlyInstallment}
                onChange={(e) => setEditFormData({ ...editFormData, monthlyInstallment: e.target.value })}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Status *</InputLabel>
                <Select
                  label="Status *"
                  value={editFormData.status}
                  onChange={(e) => setEditFormData({ ...editFormData, status: e.target.value })}
                >
                  <MenuItem value="Pending">Pending</MenuItem>
                  <MenuItem value="Approved">Approved</MenuItem>
                  <MenuItem value="Partial">Partial</MenuItem>
                  <MenuItem value="Completed">Completed</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Reason *"
                multiline
                minRows={3}
                fullWidth
                margin="normal"
                required
                value={editFormData.reason}
                onChange={(e) => setEditFormData({ ...editFormData, reason: e.target.value })}
              />
            </Grid>
          </Grid>

          {/* Payment Status Display */}
          <Box sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Box
                  sx={{
                    backgroundColor: "#d1fae5",
                    color: "#065f46",
                    p: 2,
                    borderRadius: "8px",
                    textAlign: "center",
                  }}
                >
                  <Typography variant="body2" fontWeight="medium">
                    Paid: ₹{editingIndex !== null ? (salaryList[editingIndex]?.paid || 0).toFixed(2) : "0.00"}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box
                  sx={{
                    backgroundColor: "#fed7aa",
                    color: "#9a3412",
                    p: 2,
                    borderRadius: "8px",
                    textAlign: "center",
                  }}
                >
                  <Typography variant="body2" fontWeight="medium">
                    Remaining: ₹{calculateRemaining().toFixed(2)}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>

        <DialogActions sx={{ p: 3, pt: 2 }}>
          <Button
            onClick={() => setShowEditModal(false)}
            variant="outlined"
            sx={{
              borderRadius: "8px",
              textTransform: "none",
              borderColor: "#9ca3af",
              color: "#6b7280",
              "&:hover": {
                borderColor: "#6b7280",
                backgroundColor: "#f9fafb",
              },
            }}
          >
            Close
          </Button>
          <Button
            onClick={handleUpdateSave}
            variant="contained"
            sx={{
              backgroundColor: "#7c3aed",
              borderRadius: "8px",
              textTransform: "none",
              "&:hover": {
                backgroundColor: "#6b21a8",
              },
            }}
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onClose={() => setShowDeleteDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Typography variant="h6" component="div">
            Confirm Delete
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Alert severity="warning" sx={{ mb: 2 }}>
            <AlertTitle>Warning</AlertTitle>
            This action cannot be undone!
          </Alert>
          <Typography variant="body1">
            Are you sure you want to delete the advance salary record for{" "}
            <strong>{deletingIndex !== null ? salaryList[deletingIndex]?.employee : ""}</strong>?
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            This will permanently remove the record from the system.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button
            onClick={() => setShowDeleteDialog(false)}
            variant="outlined"
            sx={{
              borderRadius: "8px",
              textTransform: "none",
              borderColor: "#9ca3af",
              color: "#6b7280",
              "&:hover": {
                borderColor: "#6b7280",
                backgroundColor: "#f9fafb",
              },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={confirmDelete}
            variant="contained"
            sx={{
              backgroundColor: "#ef4444",
              borderRadius: "8px",
              textTransform: "none",
              "&:hover": {
                backgroundColor: "#dc2626",
              },
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default AdvanceSalary
