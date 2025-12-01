// import { useState, useMemo } from "react"
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Typography,
//   Container,
//   Box,
//   Chip,
//   Avatar,
//   TablePagination,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   Grid,
// } from "@mui/material"
// import { ThemeProvider, createTheme } from "@mui/material/styles"
// import CssBaseline from "@mui/material/CssBaseline"

// // Create a professional theme
// const theme = createTheme({
//   palette: {
//     primary: {
//       main: "#1976d2",
//     },
//     secondary: {
//       main: "#dc004e",
//     },
//     background: {
//       default: "#f5f5f5",
//     },
//   },
//   typography: {
//     h4: {
//       fontWeight: 600,
//       color: "#333",
//     },
//   },
// })

// // **MODIFIED**: Expanded employee data for better pagination/filtering demonstration
// const employeeData = [
//   { id: 1, name: "John Smith", designation: "Software Engineer", department: "Engineering", confirmation: "Confirmed", probationStart: "2024-01-15", probationEnd: "2024-07-15", probationExtendedDate: null, terminationDate: null, confirmationDate: "2024-07-15", avatar: "JS" },
//   { id: 2, name: "Michael Brown", designation: "UI/UX Designer", department: "Design", confirmation: "Confirmed", probationStart: "2023-11-20", probationEnd: "2024-05-20", probationExtendedDate: null, terminationDate: null, confirmationDate: "2024-05-20", avatar: "MB" },
//   { id: 3, name: "Emily Davis", designation: "Data Analyst", department: "Analytics", confirmation: "Extended", probationStart: "2024-02-10", probationEnd: "2024-08-10", probationExtendedDate: "2024-09-10", terminationDate: null, confirmationDate: null, avatar: "ED" },
//   { id: 4, name: "David Wilson", designation: "DevOps Engineer", department: "Engineering", confirmation: "Confirmed", probationStart: "2023-12-05", probationEnd: "2024-06-05", probationExtendedDate: null, terminationDate: null, confirmationDate: "2024-06-05", avatar: "DW" },
//   { id: 5, name: "Jennifer Martinez", designation: "Marketing Specialist", department: "Marketing", confirmation: "Extended", probationStart: "2024-01-20", probationEnd: "2024-07-20", probationExtendedDate: null, terminationDate: null, confirmationDate: null, avatar: "JM" },
//   { id: 6, name: "Chris Lee", designation: "QA Tester", department: "Engineering", confirmation: "Terminated", probationStart: "2024-01-02", probationEnd: "2024-07-02", probationExtendedDate: null, terminationDate: "2024-04-10", confirmationDate: null, avatar: "CL" },
//   { id: 7, name: "Jessica Garcia", designation: "HR Coordinator", department: "Human Resources", confirmation: "Confirmed", probationStart: "2023-09-01", probationEnd: "2024-03-01", probationExtendedDate: null, terminationDate: null, confirmationDate: "2024-03-01", avatar: "JG" },
//   { id: 8, name: "Daniel Rodriguez", designation: "Sales Associate", department: "Sales", confirmation: "Terminated", probationStart: "2023-10-10", probationEnd: "2024-04-10", probationExtendedDate: null, terminationDate: "2024-02-15", confirmationDate: null, avatar: "DR" },
//   { id: 9, name: "Brian Harris", designation: "Systems Administrator", department: "IT", confirmation: "Extended", probationStart: "2024-03-15", probationEnd: "2024-09-15", probationExtendedDate: "2024-10-15", terminationDate: null, confirmationDate: null, avatar: "BH" },
// ];


// // Function to get confirmation status color
// const getConfirmationColor = (status) => {
//   switch (status) {
//     case "Confirmed": return "success"
//     case "Extended": return "info"
//     case "Terminated": return "error"
//     default: return "default"
//   }
// }

// // Function to format date, handles null/undefined values
// const formatDate = (dateString) => {
//   if (!dateString) return "—"
//   const date = new Date(dateString)
//   return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
// }

// export default function EmployeeDashboard() {
//   // **NEW**: State for pagination and filtering
//   const [page, setPage] = useState(0)
//   const [rowsPerPage, setRowsPerPage] = useState(5)
//   const [statusFilter, setStatusFilter] = useState("All")

//   // **NEW**: Memoized filtering logic
//   const filteredData = useMemo(() => {
//     if (statusFilter === "All") {
//       return employeeData
//     }
//     return employeeData.filter((employee) => {
//       if (statusFilter === "Extended") {
//         return !!employee.probationExtendedDate // Check for non-null extended date
//       }
//       return employee.confirmation === statusFilter
//     })
//   }, [statusFilter])

//   // **NEW**: Handlers for pagination
//   const handleChangePage = (event, newPage) => {
//     setPage(newPage)
//   }

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10))
//     setPage(0) // Reset to the first page
//   }

//   // **NEW**: Handler for filter change
//   const handleFilterChange = (event) => {
//     setStatusFilter(event.target.value)
//     setPage(0) // Reset to the first page when filter changes
//   }

//   const filterOptions = ["All", "Confirmed", "Extended", "Terminated"]

//   return (
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
//       <Container maxWidth="xl" sx={{ py: 4 }}>
//         {/* **MODIFIED**: Header with filter control */}
//         <Grid container justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
//           <Grid item>
//             <Typography variant="h4" component="h1">
//               Employee Dashboard
//             </Typography>
//             <Typography variant="subtitle1" color="text.secondary">
//               Manage employee probation and confirmation status
//             </Typography>
//           </Grid>
//           <Grid item>
//             <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
//               <InputLabel>Status</InputLabel>
//               <Select value={statusFilter} label="Status" onChange={handleFilterChange}>
//                 {filterOptions.map((option) => (
//                   <MenuItem key={option} value={option}>
//                     {option}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//           </Grid>
//         </Grid>

//         <Paper elevation={3} sx={{ borderRadius: 2, overflow: "hidden" }}>
//           <TableContainer sx={{ overflow: "auto" }}>
//             <Table sx={{ minWidth: 900 }} aria-label="employee table">
//               <TableHead>
//                 <TableRow sx={{ backgroundColor: "#f8f9fa" }}>
//                   <TableCell sx={{ fontWeight: 600, fontSize: "0.95rem" }}>Employee Name</TableCell>
//                   <TableCell sx={{ fontWeight: 600, fontSize: "0.95rem" }}>Designation</TableCell>
//                   <TableCell sx={{ fontWeight: 600, fontSize: "0.95rem" }}>Department</TableCell>
//                   <TableCell sx={{ fontWeight: 600, fontSize: "0.95rem" }}>Confirmation</TableCell>
//                   <TableCell sx={{ fontWeight: 600, fontSize: "0.95rem" }}>Probation Start</TableCell>
//                   <TableCell sx={{ fontWeight: 600, fontSize: "0.95rem" }}>Probation End</TableCell>
//                   <TableCell sx={{ fontWeight: 600, fontSize: "0.95rem" }}>Extended Date</TableCell>
//                   <TableCell sx={{ fontWeight: 600, fontSize: "0.95rem" }}>Termination Date</TableCell>
//                   <TableCell sx={{ fontWeight: 600, fontSize: "0.95rem" }}>Confirmation Date</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {/* **MODIFIED**: Slicing the filtered data for pagination */}
//                 {filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((employee) => (
//                   <TableRow
//                     key={employee.id}
//                     sx={{ "&:hover": { backgroundColor: "#f0f8ff" }, transition: "background-color 0.2s ease" }}
//                   >
//                     <TableCell>
//                       <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
//                         <Avatar sx={{ bgcolor: "primary.main" }}>{employee.avatar}</Avatar>
//                         <Typography variant="body2" fontWeight={500}>{employee.name}</Typography>
//                       </Box>
//                     </TableCell>
//                     <TableCell><Typography variant="body2">{employee.designation}</Typography></TableCell>
//                     <TableCell><Typography variant="body2" color="text.secondary">{employee.department}</Typography></TableCell>
//                     <TableCell>
//                       <Chip label={employee.confirmation} color={getConfirmationColor(employee.confirmation)} size="small" sx={{ fontWeight: 500 }} />
//                     </TableCell>
//                     <TableCell><Typography variant="body2">{formatDate(employee.probationStart)}</Typography></TableCell>
//                     <TableCell><Typography variant="body2">{formatDate(employee.probationEnd)}</Typography></TableCell>
//                     <TableCell>
//                         <Typography variant="body2" color={employee.probationExtendedDate ? "warning.dark" : "text.primary"}>
//                             {formatDate(employee.probationExtendedDate)}
//                         </Typography>
//                     </TableCell>
//                     <TableCell>
//                       <Typography variant="body2" color="error.main" fontWeight={500}>{formatDate(employee.terminationDate)}</Typography>
//                     </TableCell>
//                     <TableCell>
//                       <Typography variant="body2" color="success.main" fontWeight={500}>{formatDate(employee.confirmationDate)}</Typography>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//           {/* **NEW**: Pagination Component */}
//           <TablePagination
//             rowsPerPageOptions={[5, 10, 25]}
//             component="div"
//             count={filteredData.length}
//             rowsPerPage={rowsPerPage}
//             page={page}
//             onPageChange={handleChangePage}
//             onRowsPerPageChange={handleChangeRowsPerPage}
//           />
//         </Paper>
//       </Container>
//     </ThemeProvider>
//   )
// }




















  // import { useState, useMemo, useEffect } from "react"
  // import {
  //   Table,
  //   TableBody,
  //   TableCell,
  //   TableContainer,
  //   TableHead,
  //   TableRow,
  //   Paper,
  //   Typography,
  //   Container,
  //   Box,
  //   Chip,
  //   Avatar,
  //   TablePagination,
  //   FormControl,
  //   InputLabel,
  //   Select,
  //   MenuItem,
  //   Grid,
  //   CircularProgress,
  // } from "@mui/material"
  // import { ThemeProvider, createTheme } from "@mui/material/styles"
  // import CssBaseline from "@mui/material/CssBaseline"

  // // Create a professional theme
  // const theme = createTheme({
  //   palette: {
  //     primary: {
  //       main: "#1976d2",
  //     },
  //     secondary: {
  //       main: "#dc004e",
  //     },
  //     background: {
  //       default: "#f5f5f5",
  //     },
  //   },
  //   typography: {
  //     h4: {
  //       fontWeight: 600,
  //       color: "#333",
  //     },
  //   },
  // })

  // // **NEW**: Function to determine status string from API data
  // const getConfirmationStatus = (employee) => {
  //   if (employee.terminated_date) return "Terminated"
  //   if (employee.confirmation_date) return "Confirmed"
  //   if (employee.probation_extended_date) return "Extended"
  //   // As per requirement, if employee_confirm is null (and other dates are null), it's "Pending"
  //   if (employee.employee_confirm === null) return "Pending"
  //   return "Pending" // Default fallback
  // }

  // // **MODIFIED**: Function to get confirmation status color, now includes "Pending"
  // const getConfirmationColor = (status) => {
  //   switch (status) {
  //     case "Confirmed":
  //       return "success"
  //     case "Extended":
  //       return "info"
  //     case "Terminated":
  //       return "error"
  //     case "Pending":
  //       return "warning"
  //     default:
  //       return "default"
  //   }
  // }

  // // Function to format date, handles null/undefined values
  // const formatDate = (dateString) => {
  //   if (!dateString) return "—"
  //   const date = new Date(dateString)
  //   return date.toLocaleDateString("en-US", {
  //     year: "numeric",
  //     month: "short",
  //     day: "numeric",
  //   })
  // }

  // // **NEW**: Function to create avatar initials from a full name
  // const getInitials = (name) => {
  //     if (!name) return "?";
  //     const nameParts = name.split(" ");
  //     if (nameParts.length > 1) {
  //         return `${nameParts[0][0]}${nameParts[nameParts.length - 1][0]}`.toUpperCase();
  //     }
  //     return name.substring(0, 2).toUpperCase();
  // }


  // export default function EmployeeDashboard() {
  //   // **NEW**: State for API data, loading, and errors
  //   const [employees, setEmployees] = useState([])
  //   const [loading, setLoading] = useState(true)
  //   const [error, setError] = useState(null)

  //   // State for pagination and filtering
  //   const [page, setPage] = useState(0)
  //   const [rowsPerPage, setRowsPerPage] = useState(5)
  //   const [statusFilter, setStatusFilter] = useState("All")

  //   // **NEW**: useEffect to fetch data from the API on component mount
  //   useEffect(() => {
  //     const fetchEmployeeData = async () => {
  //       try {
  //         setLoading(true)
  //         const response = await fetch(
  //           "https://tdtlworld.com/hrms-backend/apis/employee_confirmation_dashboard/"
  //         )
  //         if (!response.ok) {
  //           throw new Error(`HTTP error! status: ${response.status}`)
  //         }
  //         const result = await response.json()
          
  //         // **NEW**: Transform API data to match the component's expected structure
  //         const transformedData = result.data.map((apiEmployee, index) => ({
  //           id: index + 1, // API doesn't provide a unique ID, so we generate one
  //           name: apiEmployee.full_name,
  //           designation: apiEmployee.designation_name,
  //           department: apiEmployee.department_name,
  //           confirmation: getConfirmationStatus(apiEmployee), // Determine status string
  //           probationStart: apiEmployee.probation_start_date,
  //           probationExtendedDate: apiEmployee.probation_extended_date,
  //           terminationDate: apiEmployee.terminated_date,
  //           confirmationDate: apiEmployee.confirmation_date,
  //           avatar: getInitials(apiEmployee.full_name),
  //         }))

  //         setEmployees(transformedData)
  //         setError(null)
  //       } catch (e) {
  //         setError(e.message)
  //         console.error("Failed to fetch employee data:", e)
  //       } finally {
  //         setLoading(false)
  //       }
  //     }

  //     fetchEmployeeData()
  //   }, []) // Empty dependency array means this runs once on mount

  //   // Memoized filtering logic, now works on the 'employees' state
  //   const filteredData = useMemo(() => {
  //     if (statusFilter === "All") {
  //       return employees
  //     }
  //     return employees.filter(
  //       (employee) => employee.confirmation === statusFilter
  //     )
  //   }, [statusFilter, employees])

  //   // Handlers for pagination
  //   const handleChangePage = (event, newPage) => {
  //     setPage(newPage)
  //   }

  //   const handleChangeRowsPerPage = (event) => {
  //     setRowsPerPage(parseInt(event.target.value, 10))
  //     setPage(0)
  //   }

  //   // Handler for filter change
  //   const handleFilterChange = (event) => {
  //     setStatusFilter(event.target.value)
  //     setPage(0)
  //   }
    
  //   // **MODIFIED**: Filter options now include "Pending"
  //   const filterOptions = ["All", "Pending", "Confirmed", "Extended", "Terminated"]

  //   return (
  //     <ThemeProvider theme={theme}>
  //       <CssBaseline />
  //       <Container maxWidth="xl" sx={{ py: 4 }}>
  //         <Grid container justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
  //           <Grid item>
  //             <Typography variant="h4" component="h1">
  //               Employee Dashboard
  //             </Typography>
  //             <Typography variant="subtitle1" color="text.secondary">
  //               Manage employee probation and confirmation status
  //             </Typography>
  //           </Grid>
  //           <Grid item>
  //             <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
  //               <InputLabel>Status</InputLabel>
  //               <Select value={statusFilter} label="Status" onChange={handleFilterChange}>
  //                 {filterOptions.map((option) => (
  //                   <MenuItem key={option} value={option}>
  //                     {option}
  //                   </MenuItem>
  //                 ))}
  //               </Select>
  //             </FormControl>
  //           </Grid>
  //         </Grid>

  //         <Paper elevation={3} sx={{ borderRadius: 2, overflow: "hidden" }}>
  //           {/* **NEW**: Conditional rendering for loading and error states */}
  //           {loading ? (
  //             <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: 300 }}>
  //               <CircularProgress />
  //               <Typography sx={{ ml: 2 }}>Loading Employees...</Typography>
  //             </Box>
  //           ) : error ? (
  //             <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: 300 }}>
  //               <Typography color="error">Error: {error}</Typography>
  //             </Box>
  //           ) : (
  //             <>
  //               <TableContainer sx={{ overflow: "auto" }}>
  //                 <Table sx={{ minWidth: 900 }} aria-label="employee table">
  //                   <TableHead>
  //                     <TableRow sx={{ backgroundColor: "#f8f9fa" }}>
  //                       <TableCell sx={{ fontWeight: 600, fontSize: "0.95rem" }}>Employee Name</TableCell>
  //                       <TableCell sx={{ fontWeight: 600, fontSize: "0.95rem" }}>Designation</TableCell>
  //                       <TableCell sx={{ fontWeight: 600, fontSize: "0.95rem" }}>Department</TableCell>
  //                       <TableCell sx={{ fontWeight: 600, fontSize: "0.95rem" }}>Status</TableCell>
  //                       <TableCell sx={{ fontWeight: 600, fontSize: "0.95rem" }}>Probation Start</TableCell>
  //                       <TableCell sx={{ fontWeight: 600, fontSize: "0.95rem" }}>Extended Date</TableCell>
  //                       <TableCell sx={{ fontWeight: 600, fontSize: "0.95rem" }}>Termination Date</TableCell>
  //                       <TableCell sx={{ fontWeight: 600, fontSize: "0.95rem" }}>Confirmation Date</TableCell>
  //                     </TableRow>
  //                   </TableHead>
  //                   <TableBody>
  //                     {filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((employee) => (
  //                       <TableRow
  //                         key={employee.id}
  //                         sx={{ "&:hover": { backgroundColor: "#f0f8ff" }, transition: "background-color 0.2s ease" }}
  //                       >
  //                         <TableCell>
  //                           <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
  //                             <Avatar sx={{ bgcolor: "primary.main" }}>{employee.avatar}</Avatar>
  //                             <Typography variant="body2" fontWeight={500}>{employee.name}</Typography>
  //                           </Box>
  //                         </TableCell>
  //                         <TableCell><Typography variant="body2">{employee.designation}</Typography></TableCell>
  //                         <TableCell><Typography variant="body2" color="text.secondary">{employee.department}</Typography></TableCell>
  //                         <TableCell>
  //                           <Chip label={employee.confirmation} color={getConfirmationColor(employee.confirmation)} size="small" sx={{ fontWeight: 500 }}/>
  //                         </TableCell>
  //                         <TableCell><Typography variant="body2">{formatDate(employee.probationStart)}</Typography></TableCell>
  //                         <TableCell>
  //                           <Typography variant="body2" color={employee.probationExtendedDate ? "info.dark" : "text.primary"}>
  //                             {formatDate(employee.probationExtendedDate)}
  //                           </Typography>
  //                         </TableCell>
  //                         <TableCell>
  //                           <Typography variant="body2" color="error.main" fontWeight={500}>{formatDate(employee.terminationDate)}</Typography>
  //                         </TableCell>
  //                         <TableCell>
  //                           <Typography variant="body2" color="success.main" fontWeight={500}>{formatDate(employee.confirmationDate)}</Typography>
  //                         </TableCell>
  //                       </TableRow>
  //                     ))}
  //                   </TableBody>
  //                 </Table>
  //               </TableContainer>
  //               <TablePagination
  //                 rowsPerPageOptions={[5, 10, 25]}
  //                 component="div"
  //                 count={filteredData.length}
  //                 rowsPerPage={rowsPerPage}
  //                 page={page}
  //                 onPageChange={handleChangePage}
  //                 onRowsPerPageChange={handleChangeRowsPerPage}
  //               />
  //             </>
  //           )}
  //         </Paper>
  //       </Container>
  //     </ThemeProvider>
  //   )
  // }











  import { useState, useMemo, useEffect } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Chip,
  Avatar,
  TablePagination,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Button,
  TextField,
  InputAdornment,
  IconButton,
  Skeleton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  useMediaQuery,
  Grid,
} from "@mui/material"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import { Add, Search, Edit, Delete } from "@mui/icons-material"
// Note: In a real project, you would install SweetAlert2: npm install sweetalert2
// import Swal from 'sweetalert2';

// Create the specified professional theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#8C257C", // Purple
      dark: "#6d1d60", // Darker Purple for Hover
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#F58E35", // Orange
    },
    background: {
      default: "#f5f5f5",
    },
    grey: {
      700: '#757575',
    }
  },
  typography: {
    h5: {
      fontWeight: 'bold',
      color: "#8C257C",
    },
    body2: {
        fontSize: '0.95rem',
    }
  },
  components: {
    MuiTablePagination: {
      styleOverrides: {
        root: {
          color: '#8C257C',
        },
        selectIcon: {
          color: '#8C257C',
        },
        actions: {
          '& .MuiIconButton-root': {
            color: '#8C257C',
          },
          '& .Mui-disabled': {
            color: 'rgba(140, 37, 124, 0.5)',
          },
        },
      },
    },
  },
})

// --- Helper Functions (from original code, unchanged) ---

const getConfirmationStatus = (employee) => {
  if (employee.terminated_date) return "Terminated"
  if (employee.confirmation_date) return "Confirmed"
  if (employee.probation_extended_date) return "Extended"
  if (employee.employee_confirm === null) return "Pending"
  return "Pending"
}

const getConfirmationColor = (status) => {
  switch (status) {
    case "Confirmed": return "success"
    case "Extended": return "info"
    case "Terminated": return "error"
    case "Pending": return "warning"
    default: return "default"
  }
}

const formatDate = (dateString) => {
  if (!dateString) return "—"
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
}

const getInitials = (name) => {
  if (!name) return "?"
  const nameParts = name.split(" ")
  if (nameParts.length > 1) {
    return `${nameParts[0][0]}${nameParts[nameParts.length - 1][0]}`.toUpperCase()
  }
  return name.substring(0, 2).toUpperCase()
}


export default function EmployeeDashboard() {
  // --- State Management ---
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [statusFilter, setStatusFilter] = useState("All")
  const [searchTerm, setSearchTerm] = useState("")
  const [openDialog, setOpenDialog] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // --- Responsive Design Hook ---
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

  // --- Data Fetching ---
  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        setLoading(true)
        const response = await fetch("https://tdtlworld.com/hrms-backend/apis/employee_confirmation_dashboard/")
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
        
        const result = await response.json()
        const transformedData = result.data.map((apiEmployee, index) => ({
          id: index + 1,
          name: apiEmployee.full_name,
          designation: apiEmployee.designation_name,
          department: apiEmployee.department_name,
          confirmation: getConfirmationStatus(apiEmployee),
          probationStart: apiEmployee.probation_start_date,
          probationExtendedDate: apiEmployee.probation_extended_date,
          terminationDate: apiEmployee.terminated_date,
          confirmationDate: apiEmployee.confirmation_date,
          avatar: getInitials(apiEmployee.full_name),
        }))
        setEmployees(transformedData)
        setError(null)
      } catch (e) {
        setError(e.message)
        console.error("Failed to fetch employee data:", e)
      } finally {
        setLoading(false)
      }
    }
    fetchEmployeeData()
  }, [])

  // --- Memoized Filtering and Searching Logic ---
  const filteredData = useMemo(() => {
    let filtered = employees
    if (statusFilter !== "All") {
      filtered = filtered.filter((emp) => emp.confirmation === statusFilter)
    }
    if (searchTerm) {
      filtered = filtered.filter((emp) =>
        emp.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
    return filtered
  }, [statusFilter, employees, searchTerm])

  // --- Event Handlers ---
  const handleChangePage = (_, newPage) => setPage(newPage)
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }
  const handleFilterChange = (event) => {
    setStatusFilter(event.target.value)
    setPage(0)
  }
  const handleCloseDialog = () => setOpenDialog(false)
  
  const handleSave = () => {
    setIsSubmitting(true)
    setTimeout(() => {
        setIsSubmitting(false)
        setOpenDialog(false)
        // Example of using SweetAlert2
        // Swal.fire({ icon: 'success', title: 'Success!', text: 'Employee added successfully.', timer: 3000, showConfirmButton: false });
    }, 2000)
  }

  const filterOptions = ["All", "Pending", "Confirmed", "Extended", "Terminated"]

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box component={Paper} p={3} m={isMobile ? 1 : 2} elevation={3}>
        <Typography variant="h4" fontWeight="bold" sx={{ color: '#8C257C', mb: 5 }}>
          Employee Dashboard
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
            gap: 2,
            flexDirection: isMobile ? "column" : "row",
          }}
        >
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => setOpenDialog(true)}
            sx={{
              bgcolor: 'primary.main',
              color: 'primary.contrastText',
              '&:hover': { bgcolor: 'primary.dark' },
              alignSelf: isMobile ? 'stretch' : 'auto',
            }}
          >
            Add New
          </Button>

          <Box sx={{ display: 'flex', gap: 2, width: isMobile ? '100%' : 'auto', flexDirection: isMobile ? "column" : "row" }}>
             <FormControl size="small" sx={{ minWidth: 200, width: isMobile ? '100%' : 'auto' }}>
              <InputLabel>Status</InputLabel>
              <Select value={statusFilter} label="Status" onChange={handleFilterChange}>
                {filterOptions.map((option) => (
                  <MenuItem key={option} value={option}>{option}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              size="small"
              placeholder="Search ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{ width: isMobile ? '100%' : 'auto' }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start"><Search /></InputAdornment>
                ),
              }}
            />
          </Box>
        </Box>

        {error ? (
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: 300 }}>
            <Typography color="error">Error: {error}</Typography>
          </Box>
        ) : (
          <>
            <TableContainer sx={{ minWidth: '100%', whiteSpace: 'nowrap' }}>
              <Table aria-label="employee table">
                <TableHead sx={{ bgcolor: "primary.main" }}>
  <TableRow>
    <TableCell sx={{ fontWeight: "bold", color: "primary.contrastText", width: '60px' }}>Sr No.</TableCell>
    <TableCell sx={{ fontWeight: "bold", color: "primary.contrastText" }}>Employee</TableCell>
    <TableCell sx={{ fontWeight: "bold", color: "primary.contrastText" }}>Designation</TableCell>
    <TableCell sx={{ fontWeight: "bold", color: "primary.contrastText" }}>Status</TableCell>
    <TableCell sx={{ fontWeight: "bold", color: "primary.contrastText" }}>Probation Start</TableCell>
    <TableCell sx={{ fontWeight: "bold", color: "primary.contrastText" }}>Confirmation Date</TableCell>
    <TableCell sx={{ fontWeight: "bold", color: "primary.contrastText", textAlign: "center" }}>Actions</TableCell>
  </TableRow>
</TableHead>
                <TableBody>
                  {loading ? (
                    Array.from(new Array(rowsPerPage)).map((_, index) => (
  <TableRow key={index}>
    <TableCell><Skeleton variant="text" width="50%" /></TableCell>
    <TableCell><Skeleton variant="text" width="80%" /></TableCell>
    <TableCell><Skeleton variant="text" /></TableCell>
    <TableCell><Skeleton variant="text" /></TableCell>
    <TableCell><Skeleton variant="text" /></TableCell>
    <TableCell><Skeleton variant="text" /></TableCell>
    <TableCell align="center">
      <Skeleton variant="rectangular" width={70} height={30} />
    </TableCell>
  </TableRow>
))
                  ) : filteredData.length > 0 ? (
                  filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((employee, index) => (
  <TableRow key={employee.id} hover>
    <TableCell>
      <Typography variant="body2">{page * rowsPerPage + index + 1}</Typography>
    </TableCell>
    <TableCell>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Avatar sx={{ bgcolor: "secondary.main" }}>{employee.avatar}</Avatar>
        <Box>
          <Typography variant="body2" fontWeight={500}>{employee.name}</Typography>
          <Typography variant="caption" color="text.secondary">{employee.department}</Typography>
        </Box>
      </Box>
    </TableCell>
    <TableCell><Typography variant="body2">{employee.designation}</Typography></TableCell>
    <TableCell>
      <Chip label={employee.confirmation} color={getConfirmationColor(employee.confirmation)} size="small" sx={{ fontWeight: 500 }}/>
    </TableCell>
    <TableCell><Typography variant="body2">{formatDate(employee.probationStart)}</Typography></TableCell>
    <TableCell>
      <Typography variant="body2" color={employee.confirmationDate ? "success.dark" : "text.primary"}>
        {formatDate(employee.confirmationDate)}
      </Typography>
    </TableCell>
    <TableCell>
      <Box display="flex" justifyContent="center" gap={0.5}>
        <IconButton size="small" color="primary"><Edit /></IconButton>
        <IconButton size="small" sx={{color: '#dc004e'}}><Delete /></IconButton>
      </Box>
    </TableCell>
  </TableRow>
))
                  ) : (
<TableRow>
  <TableCell colSpan={7} align="center">
    <Typography variant="body1" color="text.secondary" sx={{ p: 4 }}>
      No employees found.
    </Typography>
  </TableCell>
</TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                p: 2,
                flexDirection: isMobile ? "column" : "row",
                gap: 2,
              }}
            >
              <Typography variant="body2" color="text.secondary">
                Showing {filteredData.length === 0 ? 0 : page * rowsPerPage + 1} to {Math.min((page + 1) * rowsPerPage, filteredData.length)} of {filteredData.length} results
              </Typography>
              <TablePagination
                rowsPerPageOptions={[5, 10, 15, 25]}
                component="div"
                count={filteredData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Box>
          </>
        )}
      </Box>

      {/* --- Add/Edit Dialog --- */}
      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="sm">
        <DialogTitle sx={{ color: 'primary.main', fontWeight: 'bold' }}>
          Add New Employee
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}><TextField label="Full Name" fullWidth /></Grid>
            <Grid item xs={12}><TextField label="Designation" fullWidth /></Grid>
            <Grid item xs={12}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Attachment (PDF only)
              </Typography>
              <Button variant="outlined" component="label">
                Upload File
                <input type="file" hidden accept=".pdf" />
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleCloseDialog} sx={{ color: 'grey.700' }}>Cancel</Button>
          <Button
            onClick={handleSave}
            variant="contained"
            disabled={isSubmitting}
            sx={{ '&:hover': { bgcolor: 'primary.dark' } }}
          >
            {isSubmitting ? <CircularProgress size={24} color="inherit" /> : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  )
}