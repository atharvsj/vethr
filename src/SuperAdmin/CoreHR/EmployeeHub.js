// // // // "use client"

// // // // import { useState } from "react"
// // // // import {
// // // //   Box,
// // // //   Button,
// // // //   Table,
// // // //   TableBody,
// // // //   TableCell,
// // // //   TableContainer,
// // // //   TableHead,
// // // //   TableRow,
// // // //   Paper,
// // // //   Typography,
// // // //   Dialog,
// // // //   DialogTitle,
// // // //   DialogContent,
// // // //   DialogActions,
// // // //   TextField,
// // // //   IconButton,
// // // //   Chip,
// // // //   Container,
// // // //   Grid,
// // // //   useTheme,
// // // //   useMediaQuery,
// // // // } from "@mui/material"
// // // // import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon, Close as CloseIcon } from "@mui/icons-material"

// // // // export default function EmployeeHubPanel() {
// // // //   const theme = useTheme()
// // // //   const isMobile = useMediaQuery(theme.breakpoints.down("md"))

// // // //   // Sample initial data
// // // //   const [employeeHubs, setEmployeeHubs] = useState([
// // // //     {
// // // //       id: 1,
// // // //       name: "Development Team Hub",
// // // //       code: "DEV001",
// // // //       createdAt: "2024-01-15",
// // // //     },
// // // //     {
// // // //       id: 2,
// // // //       name: "Marketing Hub",
// // // //       code: "MKT001",
// // // //       createdAt: "2024-01-20",
// // // //     },
// // // //     {
// // // //       id: 3,
// // // //       name: "Sales Hub",
// // // //       code: "SAL001",
// // // //       createdAt: "2024-02-01",
// // // //     },
// // // //   ])

// // // //   const [open, setOpen] = useState(false)
// // // //   const [editMode, setEditMode] = useState(false)
// // // //   const [currentHub, setCurrentHub] = useState({ id: null, name: "", code: "" })
// // // //   const [errors, setErrors] = useState({})

// // // //   // Open dialog for adding new hub
// // // //   const handleAddClick = () => {
// // // //     setCurrentHub({ id: null, name: "", code: "" })
// // // //     setEditMode(false)
// // // //     setErrors({})
// // // //     setOpen(true)
// // // //   }

// // // //   // Open dialog for editing existing hub
// // // //   const handleEditClick = (hub) => {
// // // //     setCurrentHub(hub)
// // // //     setEditMode(true)
// // // //     setErrors({})
// // // //     setOpen(true)
// // // //   }

// // // //   // Close dialog
// // // //   const handleClose = () => {
// // // //     setOpen(false)
// // // //     setCurrentHub({ id: null, name: "", code: "" })
// // // //     setErrors({})
// // // //   }

// // // //   // Validate form
// // // //   const validateForm = () => {
// // // //     const newErrors = {}

// // // //     if (!currentHub.name.trim()) {
// // // //       newErrors.name = "Employee Hub Name is required"
// // // //     }

// // // //     if (!currentHub.code.trim()) {
// // // //       newErrors.code = "Code is required"
// // // //     } else {
// // // //       // Check if code already exists (excluding current hub in edit mode)
// // // //       const codeExists = employeeHubs.some(
// // // //         (hub) => hub.code.toLowerCase() === currentHub.code.toLowerCase() && hub.id !== currentHub.id,
// // // //       )
// // // //       if (codeExists) {
// // // //         newErrors.code = "Code already exists"
// // // //       }
// // // //     }

// // // //     setErrors(newErrors)
// // // //     return Object.keys(newErrors).length === 0
// // // //   }

// // // //   // Handle form submission
// // // //   const handleSubmit = () => {
// // // //     if (!validateForm()) return

// // // //     if (editMode) {
// // // //       // Update existing hub
// // // //       setEmployeeHubs((prev) => prev.map((hub) => (hub.id === currentHub.id ? { ...currentHub } : hub)))
// // // //     } else {
// // // //       // Add new hub
// // // //       const newHub = {
// // // //         ...currentHub,
// // // //         id: Date.now(), // Simple ID generation
// // // //         createdAt: new Date().toISOString().split("T")[0],
// // // //       }
// // // //       setEmployeeHubs((prev) => [...prev, newHub])
// // // //     }

// // // //     handleClose()
// // // //   }

// // // //   // Delete hub
// // // //   const handleDelete = (id) => {
// // // //     if (window.confirm("Are you sure you want to delete this Employee Hub?")) {
// // // //       setEmployeeHubs((prev) => prev.filter((hub) => hub.id !== id))
// // // //     }
// // // //   }

// // // //   // Handle input changes
// // // //   const handleInputChange = (field, value) => {
// // // //     setCurrentHub((prev) => ({ ...prev, [field]: value }))
// // // //     // Clear error when user starts typing
// // // //     if (errors[field]) {
// // // //       setErrors((prev) => ({ ...prev, [field]: "" }))
// // // //     }
// // // //   }

// // // //   return (
// // // //     <Container maxWidth="lg" sx={{ py: 4 }}>
// // // //       {/* Header */}
// // // //       <Box sx={{ mb: 4 }}>
// // // //         <Grid container justifyContent="space-between" alignItems="center" spacing={2}>
// // // //           <Grid item xs={12} sm={6}>
// // // //             <Typography variant="h4" component="h1" fontWeight="bold" color="primary">
// // // //               Employee Hub Panel
// // // //             </Typography>
// // // //             <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
// // // //               Manage your employee hubs and their configurations
// // // //             </Typography>
// // // //           </Grid>
// // // //           <Grid item xs={12} sm={6} sx={{ textAlign: { xs: "left", sm: "right" } }}>
// // // //             <Button
// // // //               variant="contained"
// // // //               startIcon={<AddIcon />}
// // // //               onClick={handleAddClick}
// // // //               size="large"
// // // //               sx={{
// // // //                 borderRadius: 2,
// // // //                 textTransform: "none",
// // // //                 fontWeight: 600,
// // // //               }}
// // // //             >
// // // //               Add Employee Hub
// // // //             </Button>
// // // //           </Grid>
// // // //         </Grid>
// // // //       </Box>

// // // //       {/* Table */}
// // // //       <Paper elevation={2} sx={{ borderRadius: 2, overflow: "hidden" }}>
// // // //         <TableContainer>
// // // //           <Table>
// // // //             <TableHead>
// // // //               <TableRow sx={{ backgroundColor: "grey.50" }}>
// // // //                 <TableCell sx={{ fontWeight: 600, fontSize: "0.95rem" }}>Employee Hub Name</TableCell>
// // // //                 {!isMobile && <TableCell sx={{ fontWeight: 600, fontSize: "0.95rem" }}>Code</TableCell>}
// // // //                 {!isMobile && <TableCell sx={{ fontWeight: 600, fontSize: "0.95rem" }}>Created At</TableCell>}
// // // //                 <TableCell align="center" sx={{ fontWeight: 600, fontSize: "0.95rem" }}>
// // // //                   Actions
// // // //                 </TableCell>
// // // //               </TableRow>
// // // //             </TableHead>
// // // //             <TableBody>
// // // //               {employeeHubs.map((hub) => (
// // // //                 <TableRow key={hub.id} hover sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
// // // //                   <TableCell>
// // // //                     <Box>
// // // //                       <Typography variant="body1" fontWeight={500}>
// // // //                         {hub.name}
// // // //                       </Typography>
// // // //                       {isMobile && (
// // // //                         <Box sx={{ mt: 0.5 }}>
// // // //                           <Chip label={hub.code} size="small" variant="outlined" sx={{ mr: 1, mb: 0.5 }} />
// // // //                           <Typography variant="caption" color="text.secondary">
// // // //                             Created: {new Date(hub.createdAt).toLocaleDateString()}
// // // //                           </Typography>
// // // //                         </Box>
// // // //                       )}
// // // //                     </Box>
// // // //                   </TableCell>
// // // //                   {!isMobile && (
// // // //                     <TableCell>
// // // //                       <Chip label={hub.code} variant="outlined" size="small" color="primary" />
// // // //                     </TableCell>
// // // //                   )}
// // // //                   {!isMobile && (
// // // //                     <TableCell>
// // // //                       <Typography variant="body2" color="text.secondary">
// // // //                         {new Date(hub.createdAt).toLocaleDateString()}
// // // //                       </Typography>
// // // //                     </TableCell>
// // // //                   )}
// // // //                   <TableCell align="center">
// // // //                     <Box sx={{ display: "flex", gap: 1, justifyContent: "center" }}>
// // // //                       <IconButton
// // // //                         onClick={() => handleEditClick(hub)}
// // // //                         color="primary"
// // // //                         size="small"
// // // //                         sx={{
// // // //                           "&:hover": { backgroundColor: "primary.50" },
// // // //                         }}
// // // //                       >
// // // //                         <EditIcon fontSize="small" />
// // // //                       </IconButton>
// // // //                       <IconButton
// // // //                         onClick={() => handleDelete(hub.id)}
// // // //                         color="error"
// // // //                         size="small"
// // // //                         sx={{
// // // //                           "&:hover": { backgroundColor: "error.50" },
// // // //                         }}
// // // //                       >
// // // //                         <DeleteIcon fontSize="small" />
// // // //                       </IconButton>
// // // //                     </Box>
// // // //                   </TableCell>
// // // //                 </TableRow>
// // // //               ))}
// // // //             </TableBody>
// // // //           </Table>
// // // //         </TableContainer>
// // // //       </Paper>

// // // //       {/* Add/Edit Dialog */}
// // // //       <Dialog
// // // //         open={open}
// // // //         onClose={handleClose}
// // // //         maxWidth="sm"
// // // //         fullWidth
// // // //         PaperProps={{
// // // //           sx: { borderRadius: 2 },
// // // //         }}
// // // //       >
// // // //         <DialogTitle sx={{ pb: 1 }}>
// // // //           <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
// // // //             <Typography variant="h6" fontWeight={600}>
// // // //               {editMode ? "Edit Employee Hub" : "Add Employee Hub"}
// // // //             </Typography>
// // // //             <IconButton onClick={handleClose} size="small">
// // // //               <CloseIcon />
// // // //             </IconButton>
// // // //           </Box>
// // // //         </DialogTitle>

// // // //         <DialogContent sx={{ pt: 2 }}>
// // // //           <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
// // // //             <TextField
// // // //               label="Employee Hub Name"
// // // //               value={currentHub.name}
// // // //               onChange={(e) => handleInputChange("name", e.target.value)}
// // // //               error={!!errors.name}
// // // //               helperText={errors.name}
// // // //               fullWidth
// // // //               variant="outlined"
// // // //               sx={{
// // // //                 "& .MuiOutlinedInput-root": {
// // // //                   borderRadius: 2,
// // // //                 },
// // // //               }}
// // // //             />

// // // //             <TextField
// // // //               label="Code"
// // // //               value={currentHub.code}
// // // //               onChange={(e) => handleInputChange("code", e.target.value.toUpperCase())}
// // // //               error={!!errors.code}
// // // //               helperText={errors.code}
// // // //               fullWidth
// // // //               variant="outlined"
// // // //               sx={{
// // // //                 "& .MuiOutlinedInput-root": {
// // // //                   borderRadius: 2,
// // // //                 },
// // // //               }}
// // // //             />
// // // //           </Box>
// // // //         </DialogContent>

// // // //         <DialogActions sx={{ p: 3, pt: 2 }}>
// // // //           <Button
// // // //             onClick={handleClose}
// // // //             variant="outlined"
// // // //             sx={{
// // // //               borderRadius: 2,
// // // //               textTransform: "none",
// // // //               fontWeight: 500,
// // // //             }}
// // // //           >
// // // //             Cancel
// // // //           </Button>
// // // //           <Button
// // // //             onClick={handleSubmit}
// // // //             variant="contained"
// // // //             sx={{
// // // //               borderRadius: 2,
// // // //               textTransform: "none",
// // // //               fontWeight: 600,
// // // //             }}
// // // //           >
// // // //             {editMode ? "Update" : "Add"} Hub
// // // //           </Button>
// // // //         </DialogActions>
// // // //       </Dialog>
// // // //     </Container>
// // // //   )
// // // // }



// // // "use client"

// // // import { useState } from "react"
// // // import {
// // //   Box,
// // //   Button,
// // //   Table,
// // //   TableBody,
// // //   TableCell,
// // //   TableContainer,
// // //   TableHead,
// // //   TableRow,
// // //   Paper,
// // //   Typography,
// // //   Dialog,
// // //   DialogTitle,
// // //   DialogContent,
// // //   DialogActions,
// // //   TextField,
// // //   IconButton,
// // //   Chip,
// // //   Container,
// // //   Grid,
// // //   useTheme,
// // //   useMediaQuery,
// // //   FormControl,
// // //   InputLabel,
// // //   Select,
// // //   MenuItem,
// // //   FormHelperText,
// // // } from "@mui/material"
// // // import {
// // //   Add as AddIcon,
// // //   Edit as EditIcon,
// // //   Delete as DeleteIcon,
// // //   Close as CloseIcon,
// // //   BusinessCenter as BusinessCenterIcon, // Icon for Designation
// // // } from "@mui/icons-material"

// // // // Sample list of designations
// // // const designations = ["Manager", "Developer", "Designer", "QA Engineer", "HR Specialist", "Sales Representative"]

// // // export default function EmployeeHubPanel() {
// // //   const theme = useTheme()
// // //   const isMobile = useMediaQuery(theme.breakpoints.down("md"))

// // //   // Sample initial data with 'designation' field
// // //   const [employeeHubs, setEmployeeHubs] = useState([
// // //     {
// // //       id: 1,
// // //       name: "Development Team Hub",
// // //       code: "DEV001",
// // //       createdAt: "2024-01-15",
// // //       designation: "Developer",
// // //     },
// // //     {
// // //       id: 2,
// // //       name: "Marketing Hub",
// // //       code: "MKT001",
// // //       createdAt: "2024-01-20",
// // //       designation: "Manager",
// // //     },
// // //     {
// // //       id: 3,
// // //       name: "Sales Hub",
// // //       code: "SAL001",
// // //       createdAt: "2024-02-01",
// // //       designation: "Sales Representative",
// // //     },
// // //   ])

// // //   // Initial state for the form, including designation
// // //   const initialHubState = { id: null, name: "", code: "", designation: "" }

// // //   const [open, setOpen] = useState(false)
// // //   const [editMode, setEditMode] = useState(false)
// // //   const [currentHub, setCurrentHub] = useState(initialHubState)
// // //   const [errors, setErrors] = useState({})

// // //   // Open dialog for adding new hub
// // //   const handleAddClick = () => {
// // //     setCurrentHub(initialHubState)
// // //     setEditMode(false)
// // //     setErrors({})
// // //     setOpen(true)
// // //   }

// // //   // Open dialog for editing existing hub
// // //   const handleEditClick = (hub) => {
// // //     setCurrentHub(hub)
// // //     setEditMode(true)
// // //     setErrors({})
// // //     setOpen(true)
// // //   }

// // //   // Close dialog and reset state
// // //   const handleClose = () => {
// // //     setOpen(false)
// // //     setCurrentHub(initialHubState)
// // //     setErrors({})
// // //   }

// // //   // Validate form including the new designation field
// // //   const validateForm = () => {
// // //     const newErrors = {}

// // //     if (!currentHub.designation) {
// // //       newErrors.designation = "Designation is required"
// // //     }

// // //     if (!currentHub.name.trim()) {
// // //       newErrors.name = "Employee Hub Name is required"
// // //     }

// // //     if (!currentHub.code.trim()) {
// // //       newErrors.code = "Code is required"
// // //     } else {
// // //       const codeExists = employeeHubs.some(
// // //         (hub) => hub.code.toLowerCase() === currentHub.code.toLowerCase() && hub.id !== currentHub.id,
// // //       )
// // //       if (codeExists) {
// // //         newErrors.code = "This code already exists"
// // //       }
// // //     }

// // //     setErrors(newErrors)
// // //     return Object.keys(newErrors).length === 0
// // //   }

// // //   // Handle form submission
// // //   const handleSubmit = () => {
// // //     if (!validateForm()) return

// // //     if (editMode) {
// // //       // Update existing hub
// // //       setEmployeeHubs((prev) => prev.map((hub) => (hub.id === currentHub.id ? { ...currentHub } : hub)))
// // //     } else {
// // //       // Add new hub
// // //       const newHub = {
// // //         ...currentHub,
// // //         id: Date.now(),
// // //         createdAt: new Date().toISOString().split("T")[0],
// // //       }
// // //       setEmployeeHubs((prev) => [...prev, newHub])
// // //     }

// // //     handleClose()
// // //   }

// // //   // Delete hub with a confirmation dialog
// // //   const handleDelete = (id) => {
// // //     if (window.confirm("Are you sure you want to delete this Employee Hub?")) {
// // //       setEmployeeHubs((prev) => prev.filter((hub) => hub.id !== id))
// // //     }
// // //   }

// // //   // Handle input changes for all form fields
// // //   const handleInputChange = (field, value) => {
// // //     setCurrentHub((prev) => ({ ...prev, [field]: value }))
// // //     if (errors[field]) {
// // //       setErrors((prev) => ({ ...prev, [field]: "" }))
// // //     }
// // //   }

// // //   return (
// // //     <Container maxWidth="lg" sx={{ py: 4 }}>
// // //       {/* Header */}
// // //       <Box sx={{ mb: 4 }}>
// // //         <Grid container justifyContent="space-between" alignItems="center" spacing={2}>
// // //           <Grid item xs={12} sm={6}>
// // //             <Typography variant="h4" component="h1" fontWeight="bold" color="primary.dark">
// // //               Employee Hub Panel
// // //             </Typography>
// // //             <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
// // //               Manage your employee hubs, designations, and their configurations.
// // //             </Typography>
// // //           </Grid>
// // //           <Grid item xs={12} sm={6} sx={{ textAlign: { xs: "left", sm: "right" } }}>
// // //             <Button variant="contained" startIcon={<AddIcon />} onClick={handleAddClick} size="large" sx={{ borderRadius: 2, textTransform: "none", fontWeight: 600 }}>
// // //               Add Employee Hub
// // //             </Button>
// // //           </Grid>
// // //         </Grid>
// // //       </Box>

// // //       {/* Table */}
// // //       <Paper elevation={2} sx={{ borderRadius: 2, overflow: "hidden" }}>
// // //         <TableContainer>
// // //           <Table>
// // //             <TableHead>
// // //               <TableRow sx={{ backgroundColor: "grey.100" }}>
// // //                 <TableCell sx={{ fontWeight: 600, fontSize: "0.95rem", width: { xs: 'auto', md: '35%' } }}>Employee Hub Name</TableCell>
// // //                 {!isMobile && <TableCell sx={{ fontWeight: 600, fontSize: "0.95rem" }}>Designation</TableCell>}
// // //                 {!isMobile && <TableCell sx={{ fontWeight: 600, fontSize: "0.95rem" }}>Code</TableCell>}
// // //                 {!isMobile && <TableCell sx={{ fontWeight: 600, fontSize: "0.95rem" }}>Created At</TableCell>}
// // //                 <TableCell align="center" sx={{ fontWeight: 600, fontSize: "0.95rem" }}>
// // //                   Actions
// // //                 </TableCell>
// // //               </TableRow>
// // //             </TableHead>
// // //             <TableBody>
// // //               {employeeHubs.map((hub) => (
// // //                 <TableRow key={hub.id} hover sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
// // //                   <TableCell>
// // //                     <Typography variant="body1" fontWeight={500} color="text.primary">
// // //                       {hub.name}
// // //                     </Typography>
// // //                     {isMobile && (
// // //                       <Box sx={{ mt: 1, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
// // //                         <Chip icon={<BusinessCenterIcon />} label={hub.designation} size="small" variant="outlined" color="secondary"/>
// // //                         <Chip label={hub.code} size="small" variant="outlined" />
// // //                         <Typography variant="caption" color="text.secondary" sx={{ alignSelf: 'center' }}>
// // //                           {new Date(hub.createdAt).toLocaleDateString()}
// // //                         </Typography>
// // //                       </Box>
// // //                     )}
// // //                   </TableCell>
// // //                   {!isMobile && (
// // //                     <TableCell>
// // //                        <Chip icon={<BusinessCenterIcon fontSize="small"/>} label={hub.designation} size="small" variant="filled" color="secondary" sx={{ fontWeight: 500 }}/>
// // //                     </TableCell>
// // //                   )}
// // //                   {!isMobile && (
// // //                     <TableCell>
// // //                       <Chip label={hub.code} variant="outlined" size="small" color="primary" />
// // //                     </TableCell>
// // //                   )}
// // //                   {!isMobile && (
// // //                     <TableCell>
// // //                       <Typography variant="body2" color="text.secondary">
// // //                         {new Date(hub.createdAt).toLocaleDateString()}
// // //                       </Typography>
// // //                     </TableCell>
// // //                   )}
// // //                   <TableCell align="center">
// // //                     <Box sx={{ display: "flex", gap: 1, justifyContent: "center" }}>
// // //                       <IconButton onClick={() => handleEditClick(hub)} color="primary" size="small" sx={{ "&:hover": { backgroundColor: "primary.50" } }}>
// // //                         <EditIcon fontSize="small" />
// // //                       </IconButton>
// // //                       <IconButton onClick={() => handleDelete(hub.id)} color="error" size="small" sx={{ "&:hover": { backgroundColor: "error.50" } }}>
// // //                         <DeleteIcon fontSize="small" />
// // //                       </IconButton>
// // //                     </Box>
// // //                   </TableCell>
// // //                 </TableRow>
// // //               ))}
// // //             </TableBody>
// // //           </Table>
// // //         </TableContainer>
// // //       </Paper>

// // //       {/* Add/Edit Dialog */}
// // //       <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: 3 } }}>
// // //         <DialogTitle sx={{ pb: 1 }}>
// // //           <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
// // //             <Typography variant="h6" fontWeight={600}>
// // //               {editMode ? "Edit Employee Hub" : "Add New Employee Hub"}
// // //             </Typography>
// // //             <IconButton onClick={handleClose} size="small"><CloseIcon /></IconButton>
// // //           </Box>
// // //         </DialogTitle>

// // //         <DialogContent sx={{ pt: 2 }}>
// // //           <Box component="form" sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
// // //             {/* --- NEW: Designation Dropdown --- */}
// // //             <FormControl fullWidth error={!!errors.designation}>
// // //               <InputLabel id="designation-label">Designation</InputLabel>
// // //               <Select
// // //                 labelId="designation-label"
// // //                 label="Designation"
// // //                 value={currentHub.designation}
// // //                 onChange={(e) => handleInputChange("designation", e.target.value)}
// // //                 sx={{ borderRadius: 2 }}
// // //               >
// // //                 {designations.map((des) => (
// // //                   <MenuItem key={des} value={des}>
// // //                     {des}
// // //                   </MenuItem>
// // //                 ))}
// // //               </Select>
// // //               {errors.designation && <FormHelperText>{errors.designation}</FormHelperText>}
// // //             </FormControl>

// // //             <TextField
// // //               label="Employee Hub Name"
// // //               value={currentHub.name}
// // //               onChange={(e) => handleInputChange("name", e.target.value)}
// // //               error={!!errors.name}
// // //               helperText={errors.name}
// // //               fullWidth
// // //               variant="outlined"
// // //               sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
// // //             />

// // //             <TextField
// // //               label="Code"
// // //               value={currentHub.code}
// // //               onChange={(e) => handleInputChange("code", e.target.value.toUpperCase())}
// // //               error={!!errors.code}
// // //               helperText={errors.code}
// // //               fullWidth
// // //               variant="outlined"
// // //               sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
// // //             />
// // //           </Box>
// // //         </DialogContent>

// // //         <DialogActions sx={{ p: 3, pt: 2 }}>
// // //           <Button onClick={handleClose} variant="outlined" sx={{ borderRadius: 2, textTransform: "none", fontWeight: 500 }}>
// // //             Cancel
// // //           </Button>
// // //           <Button onClick={handleSubmit} variant="contained" sx={{ borderRadius: 2, textTransform: "none", fontWeight: 600 }}>
// // //             {editMode ? "Update Hub" : "Add Hub"}
// // //           </Button>
// // //         </DialogActions>
// // //       </Dialog>
// // //     </Container>
// // //   )
// // // }


// // import { useState, useEffect } from "react"
// // import {
// //   Box,
// //   Button,
// //   Table,
// //   TableBody,
// //   TableCell,
// //   TableContainer,
// //   TableHead,
// //   TableRow,
// //   Paper,
// //   Typography,
// //   Dialog,
// //   DialogTitle,
// //   DialogContent,
// //   DialogActions,
// //   TextField,
// //   IconButton,
// //   Chip,
// //   Container,
// //   Grid,
// //   useTheme,
// //   useMediaQuery,
// //   FormControl,
// //   InputLabel,
// //   Select,
// //   MenuItem,
// //   FormHelperText,
// //   CircularProgress,
// // } from "@mui/material"
// // import {
// //   Add as AddIcon,
// //   Edit as EditIcon,
// //   Delete as DeleteIcon,
// //   Close as CloseIcon,
// //   LocationOn as LocationOnIcon, // Icon for State
// // } from "@mui/icons-material"
// // import axiosInstance from "../../utils/axiosInstance"; // Make sure this path is correct

// // export default function EmployeeHubPanel() {
// //   const theme = useTheme()
// //   const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

// //   const [employeeHubs, setEmployeeHubs] = useState([])
// //   const [allStates, setAllStates] = useState([]) // To store states from API
// //   const [loading, setLoading] = useState(false)

// //   // Initial state for the form, matching API fields
// //   const initialHubState = { employee_hub_id: null, employee_hub_name: "", state_id: "" }

// //   const [open, setOpen] = useState(false)
// //   const [editMode, setEditMode] = useState(false)
// //   const [currentHub, setCurrentHub] = useState(initialHubState)
// //   const [errors, setErrors] = useState({})

// //   // --- API Functions ---

// //   // Fetch all employee hubs
// //   const fetchHubs = async () => {
// //     try {
// //       setLoading(true);
// //       const response = await axiosInstance.get("api/employee_hub/")
// //       setEmployeeHubs(response.data.data || [])
// //     } catch (error) {
// //       console.error("Failed to fetch employee hubs:", error)
// //       // Here you might want to set an error state to show a message to the user
// //     } finally {
// //       setLoading(false);
// //     }
// //   }

// //   // Fetch all states for the dropdown
// //   const fetchStates = async () => {
// //     try {
// //       const response = await axiosInstance.get("api/state_dropdown/")
// //       setAllStates(response.data.data || [])
// //     } catch (error) {
// //       console.error("Failed to fetch states:", error)
// //     }
// //   }

// //   // Fetch initial data on component mount
// //   useEffect(() => {
// //     fetchHubs()
// //     fetchStates()
// //   }, [])

// //   // Open dialog for adding new hub
// //   const handleAddClick = () => {
// //     setCurrentHub(initialHubState)
// //     setEditMode(false)
// //     setErrors({})
// //     setOpen(true)
// //   }

// //   // Open dialog for editing existing hub
// //   const handleEditClick = (hub) => {
// //     // Set the form state with the data from the selected hub
// //     setCurrentHub({
// //       employee_hub_id: hub.employee_hub_id,
// //       employee_hub_name: hub.employee_hub_name,
// //       state_id: hub.state_id,
// //     })
// //     setEditMode(true)
// //     setErrors({})
// //     setOpen(true)
// //   }

// //   // Close dialog and reset state
// //   const handleClose = () => {
// //     setOpen(false)
// //     setCurrentHub(initialHubState)
// //     setErrors({})
// //   }

// //   // Validate form
// //   const validateForm = () => {
// //     const newErrors = {}
// //     if (!currentHub.state_id) {
// //       newErrors.state_id = "State is required"
// //     }
// //     if (!currentHub.employee_hub_name.trim()) {
// //       newErrors.employee_hub_name = "Employee Hub Name is required"
// //     }
// //     setErrors(newErrors)
// //     return Object.keys(newErrors).length === 0
// //   }

// //   // Handle form submission (Create or Update)
// //   const handleSubmit = async () => {
// //     if (!validateForm()) return

// //     setLoading(true)
// //     try {
// //       if (editMode) {
// //         // Update existing hub
// //         const payload = {
// //           employee_hub_id: currentHub.employee_hub_id,
// //           state_id: currentHub.state_id,
// //           employee_hub_name: currentHub.employee_hub_name,
// //         }
// //         await axiosInstance.put("api/employee_hub/", payload)
// //       } else {
// //         // Add new hub
// //         const payload = {
// //           state_id: currentHub.state_id,
// //           employee_hub_name: currentHub.employee_hub_name,
// //         }
// //         await axiosInstance.post("api/employee_hub/", payload)
// //       }
// //       await fetchHubs() // Refresh data from server
// //       handleClose()
// //     } catch (error) {
// //       console.error("Failed to save employee hub:", error)
// //       // You could set an API error message here
// //     } finally {
// //       setLoading(false)
// //     }
// //   }

// //   // Delete hub
// //   const handleDelete = async (hubId) => {
// //     if (window.confirm("Are you sure you want to delete this Employee Hub?")) {
// //       setLoading(true)
// //       try {
// //         const payload = { employee_hub_id: hubId }
// //         // For axios delete with body, the payload must be in the `data` property of the config object
// //         await axiosInstance.delete("api/employee_hub/", { data: payload })
// //         await fetchHubs() // Refresh data
// //       } catch (error) {
// //         console.error("Failed to delete employee hub:", error)
// //       } finally {
// //         setLoading(false)
// //       }
// //     }
// //   }

// //   // Handle input changes for all form fields
// //   const handleInputChange = (field, value) => {
// //     setCurrentHub((prev) => ({ ...prev, [field]: value }))
// //     if (errors[field]) {
// //       setErrors((prev) => ({ ...prev, [field]: "" }))
// //     }
// //   }

// //   return (
// //     <Container maxWidth="lg" sx={{ py: 4 }}>
// //       {/* Header */}
// //       <Box sx={{ mb: 4 }}>
// //         <Grid container justifyContent="space-between" alignItems="center" spacing={2}>
// //           <Grid item xs={12} sm={6}>
// //             <Typography variant="h4" component="h1" fontWeight="bold" color="primary.dark">
// //               Employee Hub Panel
// //             </Typography>
// //             <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
// //               Manage your employee hubs and their locations.
// //             </Typography>
// //           </Grid>
// //           <Grid item xs={12} sm={6} sx={{ textAlign: { xs: "left", sm: "right" } }}>
// //             <Button variant="contained" startIcon={<AddIcon />} onClick={handleAddClick} size="large" sx={{ borderRadius: 2, textTransform: "none", fontWeight: 600 }}>
// //               Add Employee Hub
// //             </Button>
// //           </Grid>
// //         </Grid>
// //       </Box>

// //       {/* Table */}
// //       <Paper elevation={2} sx={{ borderRadius: 2, overflow: "hidden" }}>
// //         <TableContainer>
// //           <Table>
// //             <TableHead>
// //               <TableRow sx={{ backgroundColor: "grey.100" }}>
// //                 <TableCell sx={{ fontWeight: 600, fontSize: "0.95rem", width: { xs: "auto", md: "50%" } }}>
// //                   Employee Hub Name
// //                 </TableCell>
// //                 {!isMobile && <TableCell sx={{ fontWeight: 600, fontSize: "0.95rem" }}>State</TableCell>}
// //                 {!isMobile && <TableCell sx={{ fontWeight: 600, fontSize: "0.95rem" }}>Created At</TableCell>}
// //                 <TableCell align="center" sx={{ fontWeight: 600, fontSize: "0.95rem" }}>
// //                   Actions
// //                 </TableCell>
// //               </TableRow>
// //             </TableHead>
// //             <TableBody>
// //               {employeeHubs.map((hub) => (
// //                 <TableRow key={hub.employee_hub_id} hover sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
// //                   <TableCell>
// //                     <Typography variant="body1" fontWeight={500} color="text.primary">
// //                       {hub.employee_hub_name}
// //                     </Typography>
// //                     {isMobile && (
// //                       <Box sx={{ mt: 1, display: "flex", flexWrap: "wrap", gap: 1 }}>
// //                         <Chip icon={<LocationOnIcon />} label={hub.state_name} size="small" variant="outlined" color="secondary" />
// //                         <Typography variant="caption" color="text.secondary" sx={{ alignSelf: "center" }}>
// //                           {new Date(hub.created_at).toLocaleDateString()}
// //                         </Typography>
// //                       </Box>
// //                     )}
// //                   </TableCell>
// //                   {!isMobile && (
// //                     <TableCell>
// //                       <span style={{ fontWeight: 500 }}>{hub.state_name}</span>
// //                     </TableCell>
// //                   )}
// //                   {!isMobile && (
// //                     <TableCell>
// //                       <Typography variant="body2" color="text.secondary">
// //                         {new Date(hub.created_at).toLocaleDateString()}
// //                       </Typography>
// //                     </TableCell>
// //                   )}
// //                   <TableCell align="center">
// //                     <Box sx={{ display: "flex", gap: 1, justifyContent: "center" }}>
// //                       <IconButton onClick={() => handleEditClick(hub)} color="primary" size="small" sx={{ "&:hover": { backgroundColor: "primary.50" } }}>
// //                         <EditIcon fontSize="small" />
// //                       </IconButton>
// //                       <IconButton onClick={() => handleDelete(hub.employee_hub_id)} color="error" size="small" sx={{ "&:hover": { backgroundColor: "error.50" } }}>
// //                         <DeleteIcon fontSize="small" />
// //                       </IconButton>
// //                     </Box>
// //                   </TableCell>
// //                 </TableRow>
// //               ))}
// //             </TableBody>
// //           </Table>
// //         </TableContainer>
// //       </Paper>

// //       {/* Add/Edit Dialog */}
// //       <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: 3 } }}>
// //         <DialogTitle sx={{ pb: 1 }}>
// //           <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
// //             <Typography variant="h6" fontWeight={600}>
// //               {editMode ? "Edit Employee Hub" : "Add New Employee Hub"}
// //             </Typography>
// //             <IconButton onClick={handleClose} size="small">
// //               <CloseIcon />
// //             </IconButton>
// //           </Box>
// //         </DialogTitle>

// //         <DialogContent sx={{ pt: 2 }}>
// //           <Box component="form" sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
// //             <TextField
// //               label="Employee Hub Name"
// //               value={currentHub.employee_hub_name}
// //               onChange={(e) => handleInputChange("employee_hub_name", e.target.value)}
// //               error={!!errors.employee_hub_name}
// //               helperText={errors.employee_hub_name}
// //               fullWidth
// //               variant="outlined"
// //               sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
// //             />

// //             <FormControl fullWidth error={!!errors.state_id}>
// //               <InputLabel id="state-label">State</InputLabel>
// //               <Select
// //                 labelId="state-label"
// //                 label="State"
// //                 value={currentHub.state_id}
// //                 onChange={(e) => handleInputChange("state_id", e.target.value)}
// //                 sx={{ borderRadius: 2 }}
// //               >
// //                 {allStates.map((state) => (
// //                   <MenuItem key={state.state_id} value={state.state_id}>
// //                     {state.state_name}
// //                   </MenuItem>
// //                 ))}
// //               </Select>
// //               {errors.state_id && <FormHelperText>{errors.state_id}</FormHelperText>}
// //             </FormControl>
// //           </Box>
// //         </DialogContent>

// //         <DialogActions sx={{ p: 3, pt: 2 }}>
// //           <Button onClick={handleClose} variant="outlined" sx={{ borderRadius: 2, textTransform: "none", fontWeight: 500 }}>
// //             Cancel
// //           </Button>
// //           <Button onClick={handleSubmit} variant="contained" sx={{ borderRadius: 2, textTransform: "none", fontWeight: 600 }} disabled={loading}>
// //             {loading ? <CircularProgress size={24} /> : (editMode ? "Update Hub" : "Add Hub")}
// //           </Button>
// //         </DialogActions>
// //       </Dialog>
// //     </Container>
// //   )
// // }





// // import { useState, useEffect, useCallback } from "react";
// // import {
// //   Box,
// //   Button,
// //   Table,
// //   TableBody,
// //   TableCell,
// //   TableContainer,
// //   TableHead,
// //   TableRow,
// //   Paper,
// //   Typography,
// //   Dialog,
// //   DialogTitle,
// //   DialogContent,
// //   DialogActions,
// //   TextField,
// //   IconButton,
// //   Chip,
// //   Container,
// //   Grid,
// //   useTheme,
// //   useMediaQuery,
// //   FormControl,
// //   InputLabel,
// //   Select,
// //   MenuItem,
// //   FormHelperText,
// //   CircularProgress,
// //   Alert,
// //   Snackbar,
// // } from "@mui/material";
// // import {
// //   Add as AddIcon,
// //   Edit as EditIcon,
// //   Delete as DeleteIcon,
// //   Close as CloseIcon,
// //   LocationOn as LocationOnIcon,
// //   Work as WorkIcon,
// // } from "@mui/icons-material";
// // import axiosInstance from "../../utils/axiosInstance";

// // const initialHubState = {
// //   employee_hub_id: null,
// //   employee_hub_name: "",
// //   state_id: "",
// //   designation_id: "",
// // };

// // export default function EmployeeHubPanel() {
// //   const theme = useTheme();
// //   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

// //   const [employeeHubs, setEmployeeHubs] = useState([]);
// //   const [allStates, setAllStates] = useState([]);
// //   const [allDesignations, setAllDesignations] = useState([]);
// //   const [loading, setLoading] = useState({
// //     table: false,
// //     form: false,
// //     delete: false,
// //   });
// //   const [notification, setNotification] = useState({
// //     open: false,
// //     message: "",
// //     severity: "success",
// //   });
// //   const [dialogState, setDialogState] = useState({
// //     open: false,
// //     editMode: false,
// //     currentHub: initialHubState,
// //   });
// //   const [errors, setErrors] = useState({});

// //   const fetchData = useCallback(async () => {
// //     try {
// //       setLoading((prev) => ({ ...prev, table: true }));

// //       const [hubsResponse, statesResponse, designationsResponse] = await Promise.all([
// //         axiosInstance.get("api/employee_hub/"),
// //         axiosInstance.get("api/state_dropdown/"),
// //         axiosInstance.get("ci_designations/"),
// //       ]);

// //       // Handle hubs data
// //       const hubData = Array.isArray(hubsResponse.data)
// //         ? hubsResponse.data
// //         : hubsResponse.data.data || [];
// //       setEmployeeHubs(hubData);

// //       // Handle states data
// //       const statesData = Array.isArray(statesResponse.data)
// //         ? statesResponse.data
// //         : statesResponse.data.data || [];
// //       setAllStates(statesData);

// //       // Handle designations data
// //       const designationsData = Array.isArray(designationsResponse.data)
// //         ? designationsResponse.data
// //         : designationsResponse.data?.data || [];

// //       const mappedDesignations = designationsData.map((item) => ({
// //         designation_id: item.designation_id || item.id,
// //         designation_name: item.designation_name || item.designation,
// //         department_id: item.department_id || item.departmentId,
// //       }));

// //       setAllDesignations(mappedDesignations);
// //     } catch (err) {
// //       console.error("Failed to fetch data:", err);
// //       showNotification("Failed to load data. Please try again.", "error");
// //     } finally {
// //       setLoading((prev) => ({ ...prev, table: false }));
// //     }
// //   }, []);

// //   useEffect(() => {
// //     fetchData();
// //   }, [fetchData]);

// //   const showNotification = (message, severity = "success") => {
// //     setNotification({ open: true, message, severity });
// //   };

// //   const handleAddClick = () => {
// //     setDialogState({ open: true, editMode: false, currentHub: initialHubState });
// //     setErrors({});
// //   };

// //   const handleEditClick = (hub) => {
// //     setDialogState({
// //       open: true,
// //       editMode: true,
// //       currentHub: {
// //         employee_hub_id: hub.employee_hub_id,
// //         employee_hub_name: hub.employee_hub_name,
// //         state_id: hub.state_id,
// //         designation_id: hub.designation_id || "",
// //       },
// //     });
// //     setErrors({});
// //   };

// //   const handleCloseDialog = () => {
// //     setDialogState((prev) => ({ ...prev, open: false }));
// //     setErrors({});
// //   };

// //   const validateForm = () => {
// //     const newErrors = {};
// //     if (!dialogState.currentHub.state_id) newErrors.state_id = "State is required";
// //     if (!dialogState.currentHub.employee_hub_name.trim()) newErrors.employee_hub_name = "Employee Hub Name is required";
// //     if (!dialogState.currentHub.designation_id) newErrors.designation_id = "Designation is required";
// //     setErrors(newErrors);
// //     return Object.keys(newErrors).length === 0;
// //   };

// //   const handleSubmit = async () => {
// //     if (!validateForm()) return;
// //     try {
// //       setLoading((prev) => ({ ...prev, form: true }));

// //       const payload = {
// //         employee_hub_id: dialogState.currentHub.employee_hub_id,
// //         state_id: dialogState.currentHub.state_id,
// //         employee_hub_name: dialogState.currentHub.employee_hub_name,
// //         designation_id: dialogState.currentHub.designation_id,
// //       };

// //       if (dialogState.editMode) {
// //         await axiosInstance.put("api/employee_hub/", payload);
// //         showNotification("Employee hub updated successfully!");
// //       } else {
// //         await axiosInstance.post("api/employee_hub/", payload);
// //         showNotification("Employee hub created successfully!");
// //       }

// //       await fetchData();
// //       setTimeout(handleCloseDialog, 1000);
// //     } catch (err) {
// //       console.error("Save error:", err);
// //       showNotification(err.response?.data?.message || "Failed to save. Please try again.", "error");
// //     } finally {
// //       setLoading((prev) => ({ ...prev, form: false }));
// //     }
// //   };

// //   const handleDelete = async (hubId) => {
// //     if (!window.confirm("Are you sure you want to delete this Employee Hub?")) return;
// //     try {
// //       setLoading((prev) => ({ ...prev, delete: true }));
// //       await axiosInstance.delete("api/employee_hub/", { data: { employee_hub_id: hubId } });
// //       showNotification("Employee hub deleted successfully!");
// //       await fetchData();
// //     } catch (err) {
// //       console.error("Delete error:", err);
// //       showNotification(err.response?.data?.message || "Failed to delete. Please try again.", "error");
// //     } finally {
// //       setLoading((prev) => ({ ...prev, delete: false }));
// //     }
// //   };

// //   const handleInputChange = (field, value) => {
// //     setDialogState((prev) => ({
// //       ...prev,
// //       currentHub: { ...prev.currentHub, [field]: value },
// //     }));
// //     if (errors[field]) {
// //       setErrors((prev) => ({ ...prev, [field]: "" }));
// //     }
// //   };

// //   return (
// //     <Container maxWidth="lg" sx={{ py: 4 }}>
// //       <Snackbar
// //         open={notification.open}
// //         autoHideDuration={6000}
// //         onClose={() => setNotification((prev) => ({ ...prev, open: false }))}
// //         anchorOrigin={{ vertical: "top", horizontal: "right" }}
// //       >
// //         <Alert
// //           severity={notification.severity}
// //           onClose={() => setNotification((prev) => ({ ...prev, open: false }))}
// //           sx={{ width: "100%" }}
// //         >
// //           {notification.message}
// //         </Alert>
// //       </Snackbar>

// //       {/* Header */}
// //       <Box sx={{ mb: 4 }}>
// //         <Grid container justifyContent="space-between" alignItems="center" spacing={2}>
// //           <Grid item xs={12} sm={6}>
// //             <Typography variant="h4" fontWeight="bold" >
// //               Employee Hub Panel
// //             </Typography>
// //             <Typography color="text.secondary" sx={{ mt: 1 }}>
// //               Manage your employee hubs and their locations.
// //             </Typography>
// //           </Grid>
// //           <Grid item xs={12} sm={6} textAlign={{ xs: "left", sm: "right" }}>
// //             <Button
// //               variant="contained"
// //               startIcon={<AddIcon />}
// //               onClick={handleAddClick}
// //               size="large"
// //               sx={{ borderRadius: 2, textTransform: "none", fontWeight: 600 }}
// //               disabled={loading.table || loading.delete}
// //             >
// //               Add Employee Hub
// //             </Button>
// //           </Grid>
// //         </Grid>
// //       </Box>

// //       {/* Table */}
// //       {loading.table && !employeeHubs.length ? (
// //         <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
// //           <CircularProgress />
// //         </Box>
// //       ) : (
// //         <Paper elevation={2} sx={{ borderRadius: 2 }}>
// //           <TableContainer>
// //             <Table>
// //               <TableHead>
// //                 <TableRow sx={{ backgroundColor: "grey.100" }}>
// //                   <TableCell sx={{ fontWeight: 600 }}>Employee Hub Name</TableCell>
// //                   {!isMobile && <TableCell sx={{ fontWeight: 600 }}>State</TableCell>}
// //                   {!isMobile && <TableCell sx={{ fontWeight: 600 }}>Designation</TableCell>}
// //                   {!isMobile && <TableCell sx={{ fontWeight: 600 }}>Created At</TableCell>}
// //                   <TableCell align="center" sx={{ fontWeight: 600 }}>Actions</TableCell>
// //                 </TableRow>
// //               </TableHead>
// //               <TableBody>
// //                 {employeeHubs.length > 0 ? (
// //                   employeeHubs.map((hub) => (
// //                     <TableRow key={hub.employee_hub_id} hover>
// //                       <TableCell>
// //                         <Typography fontWeight={500}>{hub.employee_hub_name}</Typography>
// //                         {isMobile && (
// //                           <Box sx={{ mt: 1, display: "flex", flexWrap: "wrap", gap: 1 }}>
// //                             <Chip icon={<LocationOnIcon />} label={hub.state_name} size="small" />
// //                             {hub.designation_name && (
// //                               <Chip icon={<WorkIcon />} label={hub.designation_name} size="small" color="primary" />
// //                             )}
// //                             <Typography variant="caption" color="text.secondary">
// //                               {new Date(hub.created_at).toLocaleDateString()}
// //                             </Typography>
// //                           </Box>
// //                         )}
// //                       </TableCell>
// //                       {!isMobile && <TableCell>{hub.state_name}</TableCell>}
// //                       {!isMobile && <TableCell>{hub.designation_name || "N/A"}</TableCell>}
// //                       {!isMobile && <TableCell>{new Date(hub.created_at).toLocaleDateString()}</TableCell>}
// //                       <TableCell align="center">
// //                         <Box sx={{ display: "flex", gap: 1, justifyContent: "center" }}>
// //                           <IconButton onClick={() => handleEditClick(hub)} color="primary" size="small">
// //                             <EditIcon />
// //                           </IconButton>
// //                           <IconButton onClick={() => handleDelete(hub.employee_hub_id)} color="error" size="small">
// //                             {loading.delete ? <CircularProgress size={20} /> : <DeleteIcon />}
// //                           </IconButton>
// //                         </Box>
// //                       </TableCell>
// //                     </TableRow>
// //                   ))
// //                 ) : (
// //                   <TableRow>
// //                     <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
// //                       No employee hubs found.
// //                     </TableCell>
// //                   </TableRow>
// //                 )}
// //               </TableBody>
// //             </Table>
// //           </TableContainer>
// //         </Paper>
// //       )}

// //       {/* Dialog */}
// //       <Dialog open={dialogState.open} onClose={handleCloseDialog} fullWidth maxWidth="sm">
// //         <DialogTitle>
// //           <Box sx={{ display: "flex", justifyContent: "space-between" }}>
// //             <Typography fontWeight={600}>{dialogState.editMode ? "Edit" : "Add"} Employee Hub</Typography>
// //             <IconButton onClick={handleCloseDialog} size="small" disabled={loading.form}>
// //               <CloseIcon />
// //             </IconButton>
// //           </Box>
// //         </DialogTitle>
// //         <DialogContent>
// //           <Box sx={{ display: "flex", flexDirection: "column", gap: 3, pt: 2 }}>
// //             <TextField
// //               label="Employee Hub Name"
// //               fullWidth
// //               value={dialogState.currentHub.employee_hub_name}
// //               onChange={(e) => handleInputChange("employee_hub_name", e.target.value)}
// //               error={!!errors.employee_hub_name}
// //               helperText={errors.employee_hub_name}
// //               disabled={loading.form}
// //             />

// //             <FormControl fullWidth error={!!errors.state_id} disabled={loading.form}>
// //               <InputLabel id="state-select-label">State</InputLabel>
// //               <Select
// //                 labelId="state-select-label"
// //                 label="State"
// //                 value={dialogState.currentHub.state_id}
// //                 onChange={(e) => handleInputChange("state_id", e.target.value)}
// //               >
// //                 {allStates.map((state) => (
// //                   <MenuItem key={state.state_id} value={state.state_id}>
// //                     {state.state_name}
// //                   </MenuItem>
// //                 ))}
// //               </Select>
// //               {errors.state_id && <FormHelperText>{errors.state_id}</FormHelperText>}
// //             </FormControl>

// //             <FormControl fullWidth error={!!errors.designation_id} disabled={loading.form}>
// //               <InputLabel id="designation-select-label">Designation</InputLabel>
// //               <Select
// //                 labelId="designation-select-label"
// //                 label="Designation"
// //                 value={dialogState.currentHub.designation_id}
// //                 onChange={(e) => handleInputChange("designation_id", e.target.value)}
// //               >
// //                 {allDesignations.map((designation) => (
// //                   <MenuItem key={designation.designation_id} value={designation.designation_id}>
// //                     {designation.designation_name}
// //                   </MenuItem>
// //                 ))}
// //               </Select>
// //               {errors.designation_id && <FormHelperText>{errors.designation_id}</FormHelperText>}
// //             </FormControl>
// //           </Box>
// //         </DialogContent>
// //         <DialogActions sx={{ p: 3 }}>
// //           <Button variant="outlined" onClick={handleCloseDialog} disabled={loading.form}>
// //             Cancel
// //           </Button>
// //           <Button variant="contained" onClick={handleSubmit} disabled={loading.form}>
// //             {loading.form ? <CircularProgress size={24} /> : dialogState.editMode ? "Update Hub" : "Add Hub"}
// //           </Button>
// //         </DialogActions>
// //       </Dialog>
// //     </Container>
// //   );
// // }    /////// 







// // import { useState, useEffect, useCallback } from "react";
// // import {
// //   Box,
// //   Button,
// //   Table,
// //   TableBody,
// //   TableCell,
// //   TableContainer,
// //   TableHead,
// //   TableRow,
// //   Paper,
// //   Typography,
// //   Dialog,
// //   DialogTitle,
// //   DialogContent,
// //   DialogActions,
// //   TextField,
// //   IconButton,
// //   Chip,
// //   Container,
// //   Grid,
// //   useTheme,
// //   useMediaQuery,
// //   FormControl,
// //   InputLabel,
// //   Select,
// //   MenuItem,
// //   FormHelperText,
// //   CircularProgress,
// //   Alert,
// //   Snackbar,
// // } from "@mui/material";
// // import {
// //   Add as AddIcon,
// //   Edit as EditIcon,
// //   Delete as DeleteIcon,
// //   Close as CloseIcon,
// //   LocationOn as LocationOnIcon,
// // } from "@mui/icons-material";
// // import axiosInstance from "../../utils/axiosInstance";

// // const initialHubState = {
// //   employee_hub_id: null,
// //   employee_hub_name: "",
// //   state_id: "",
// // };

// // export default function EmployeeHubPanel() {
// //   const theme = useTheme();
// //   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

// //   const [employeeHubs, setEmployeeHubs] = useState([]);
// //   const [allStates, setAllStates] = useState([]);
// //   const [loading, setLoading] = useState({
// //     table: false,
// //     form: false,
// //     delete: false,
// //   });
// //   const [notification, setNotification] = useState({
// //     open: false,
// //     message: "",
// //     severity: "success",
// //   });
// //   const [dialogState, setDialogState] = useState({
// //     open: false,
// //     editMode: false,
// //     currentHub: initialHubState,
// //   });
// //   const [errors, setErrors] = useState({});

// //   const fetchData = useCallback(async () => {
// //     try {
// //       setLoading((prev) => ({ ...prev, table: true }));

// //       const [hubsResponse, statesResponse] = await Promise.all([
// //         axiosInstance.get("api/employee_hub/"),
// //         axiosInstance.get("api/state_dropdown/"),
// //       ]);

// //       // Handle hubs data
// //       const hubData = Array.isArray(hubsResponse.data)
// //         ? hubsResponse.data
// //         : hubsResponse.data.data || [];
// //       setEmployeeHubs(hubData);

// //       // Handle states data
// //       const statesData = Array.isArray(statesResponse.data)
// //         ? statesResponse.data
// //         : statesResponse.data.data || [];
// //       setAllStates(statesData);
// //     } catch (err) {
// //       console.error("Failed to fetch data:", err);
// //       showNotification("Failed to load data. Please try again.", "error");
// //     } finally {
// //       setLoading((prev) => ({ ...prev, table: false }));
// //     }
// //   }, []);

// //   useEffect(() => {
// //     fetchData();
// //   }, [fetchData]);

// //   const showNotification = (message, severity = "success") => {
// //     setNotification({ open: true, message, severity });
// //   };

// //   const handleAddClick = () => {
// //     setDialogState({ open: true, editMode: false, currentHub: initialHubState });
// //     setErrors({});
// //   };

// //   const handleEditClick = (hub) => {
// //     setDialogState({
// //       open: true,
// //       editMode: true,
// //       currentHub: {
// //         employee_hub_id: hub.employee_hub_id,
// //         employee_hub_name: hub.employee_hub_name,
// //         state_id: hub.state_id,
// //       },
// //     });
// //     setErrors({});
// //   };

// //   const handleCloseDialog = () => {
// //     setDialogState((prev) => ({ ...prev, open: false }));
// //     setErrors({});
// //   };

// //   const validateForm = () => {
// //     const newErrors = {};
// //     if (!dialogState.currentHub.state_id) newErrors.state_id = "State is required";
// //     if (!dialogState.currentHub.employee_hub_name.trim())
// //       newErrors.employee_hub_name = "Employee Hub Name is required";
// //     setErrors(newErrors);
// //     return Object.keys(newErrors).length === 0;
// //   };

// //   const handleSubmit = async () => {
// //     if (!validateForm()) return;
// //     try {
// //       setLoading((prev) => ({ ...prev, form: true }));

// //       const payload = {
// //         employee_hub_id: dialogState.currentHub.employee_hub_id,
// //         state_id: dialogState.currentHub.state_id,
// //         employee_hub_name: dialogState.currentHub.employee_hub_name,
// //       };

// //       if (dialogState.editMode) {
// //         await axiosInstance.put("api/employee_hub/", payload);
// //         showNotification("Employee hub updated successfully!");
// //       } else {
// //         await axiosInstance.post("api/employee_hub/", payload);
// //         showNotification("Employee hub created successfully!");
// //       }

// //       await fetchData();
// //       setTimeout(handleCloseDialog, 1000);
// //     } catch (err) {
// //       console.error("Save error:", err);
// //       showNotification(
// //         err.response?.data?.message || "Failed to save. Please try again.",
// //         "error"
// //       );
// //     } finally {
// //       setLoading((prev) => ({ ...prev, form: false }));
// //     }
// //   };

// //   const handleDelete = async (hubId) => {
// //     if (!window.confirm("Are you sure you want to delete this Employee Hub?")) return;
// //     try {
// //       setLoading((prev) => ({ ...prev, delete: true }));
// //       await axiosInstance.delete("api/employee_hub/", { data: { employee_hub_id: hubId } });
// //       showNotification("Employee hub deleted successfully!");
// //       await fetchData();
// //     } catch (err) {
// //       console.error("Delete error:", err);
// //       showNotification(
// //         err.response?.data?.message || "Failed to delete. Please try again.",
// //         "error"
// //       );
// //     } finally {
// //       setLoading((prev) => ({ ...prev, delete: false }));
// //     }
// //   };

// //   const handleInputChange = (field, value) => {
// //     setDialogState((prev) => ({
// //       ...prev,
// //       currentHub: { ...prev.currentHub, [field]: value },
// //     }));
// //     if (errors[field]) {
// //       setErrors((prev) => ({ ...prev, [field]: "" }));
// //     }
// //   };

// //   return (
// //     <Container maxWidth="lg" sx={{ py: 4 }}>
// //       <Snackbar
// //         open={notification.open}
// //         autoHideDuration={6000}
// //         onClose={() => setNotification((prev) => ({ ...prev, open: false }))}
// //         anchorOrigin={{ vertical: "top", horizontal: "right" }}
// //       >
// //         <Alert
// //           severity={notification.severity}
// //           onClose={() => setNotification((prev) => ({ ...prev, open: false }))}
// //           sx={{ width: "100%" }}
// //         >
// //           {notification.message}
// //         </Alert>
// //       </Snackbar>

// //       {/* Header */}
// //       <Box sx={{ mb: 4 }}>
// //         <Grid container justifyContent="space-between" alignItems="center" spacing={2}>
// //           <Grid item xs={12} sm={6}>
// //             <Typography variant="h4" fontWeight="bold">
// //               Employee Hub Panel
// //             </Typography>
// //             <Typography color="text.secondary" sx={{ mt: 1 }}>
// //               Manage your employee hubs and their locations.
// //             </Typography>
// //           </Grid>
// //           <Grid item xs={12} sm={6} textAlign={{ xs: "left", sm: "right" }}>
// //             <Button
// //               variant="contained"
// //               startIcon={<AddIcon />}
// //               onClick={handleAddClick}
// //               size="large"
// //               sx={{ borderRadius: 2, textTransform: "none", fontWeight: 600 }}
// //               disabled={loading.table || loading.delete}
// //             >
// //               Add Employee Hub
// //             </Button>
// //           </Grid>
// //         </Grid>
// //       </Box>

// //       {/* Table */}
// //       {loading.table && !employeeHubs.length ? (
// //         <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
// //           <CircularProgress />
// //         </Box>
// //       ) : (
// //         <Paper elevation={2} sx={{ borderRadius: 2 }}>
// //           <TableContainer>
// //             <Table>
// //               <TableHead>
// //                 <TableRow sx={{ backgroundColor: "grey.100" }}>
// //                   <TableCell sx={{ fontWeight: 600 }}>Employee Hub Name</TableCell>
// //                   {!isMobile && <TableCell sx={{ fontWeight: 600 }}>State</TableCell>}
// //                   {!isMobile && <TableCell sx={{ fontWeight: 600 }}>Created At</TableCell>}
// //                   <TableCell align="center" sx={{ fontWeight: 600 }}>
// //                     Actions
// //                   </TableCell>
// //                 </TableRow>
// //               </TableHead>
// //               <TableBody>
// //                 {employeeHubs.length > 0 ? (
// //                   employeeHubs.map((hub) => (
// //                     <TableRow key={hub.employee_hub_id} hover>
// //                       <TableCell>
// //                         <Typography fontWeight={500}>{hub.employee_hub_name}</Typography>
// //                         {isMobile && (
// //                           <Box sx={{ mt: 1, display: "flex", flexWrap: "wrap", gap: 1 }}>
// //                             <Chip icon={<LocationOnIcon />} label={hub.state_name} size="small" />
// //                             <Typography variant="caption" color="text.secondary">
// //                               {new Date(hub.created_at).toLocaleDateString()}
// //                             </Typography>
// //                           </Box>
// //                         )}
// //                       </TableCell>
// //                       {!isMobile && <TableCell>{hub.state_name}</TableCell>}
// //                       {!isMobile && (
// //                         <TableCell>{new Date(hub.created_at).toLocaleDateString()}</TableCell>
// //                       )}
// //                       <TableCell align="center">
// //                         <Box sx={{ display: "flex", gap: 1, justifyContent: "center" }}>
// //                           <IconButton
// //                             onClick={() => handleEditClick(hub)}
// //                             color="primary"
// //                             size="small"
// //                           >
// //                             <EditIcon />
// //                           </IconButton>
// //                           <IconButton
// //                             onClick={() => handleDelete(hub.employee_hub_id)}
// //                             color="error"
// //                             size="small"
// //                           >
// //                             {loading.delete ? <CircularProgress size={20} /> : <DeleteIcon />}
// //                           </IconButton>
// //                         </Box>
// //                       </TableCell>
// //                     </TableRow>
// //                   ))
// //                 ) : (
// //                   <TableRow>
// //                     <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
// //                       No employee hubs found.
// //                     </TableCell>
// //                   </TableRow>
// //                 )}
// //               </TableBody>
// //             </Table>
// //           </TableContainer>
// //         </Paper>
// //       )}

// //       {/* Dialog */}
// //       <Dialog open={dialogState.open} onClose={handleCloseDialog} fullWidth maxWidth="sm">
// //         <DialogTitle>
// //           <Box sx={{ display: "flex", justifyContent: "space-between" }}>
// //             <Typography fontWeight={600}>
// //               {dialogState.editMode ? "Edit" : "Add"} Employee Hub
// //             </Typography>
// //             <IconButton onClick={handleCloseDialog} size="small" disabled={loading.form}>
// //               <CloseIcon />
// //             </IconButton>
// //           </Box>
// //         </DialogTitle>
// //         <DialogContent>
// //           <Box sx={{ display: "flex", flexDirection: "column", gap: 3, pt: 2 }}>
// //             <TextField
// //               label="Employee Hub Name"
// //               fullWidth
// //               value={dialogState.currentHub.employee_hub_name}
// //               onChange={(e) => handleInputChange("employee_hub_name", e.target.value)}
// //               error={!!errors.employee_hub_name}
// //               helperText={errors.employee_hub_name}
// //               disabled={loading.form}
// //             />

// //             <FormControl fullWidth error={!!errors.state_id} disabled={loading.form}>
// //               <InputLabel id="state-select-label">State</InputLabel>
// //               <Select
// //                 labelId="state-select-label"
// //                 label="State"
// //                 value={dialogState.currentHub.state_id}
// //                 onChange={(e) => handleInputChange("state_id", e.target.value)}
// //               >
// //                 {allStates.map((state) => (
// //                   <MenuItem key={state.state_id} value={state.state_id}>
// //                     {state.state_name}
// //                   </MenuItem>
// //                 ))}
// //               </Select>
// //               {errors.state_id && <FormHelperText>{errors.state_id}</FormHelperText>}
// //             </FormControl>
// //           </Box>
// //         </DialogContent>
// //         <DialogActions sx={{ p: 3 }}>
// //           <Button variant="outlined" onClick={handleCloseDialog} disabled={loading.form}>
// //             Cancel
// //           </Button>
// //           <Button variant="contained" onClick={handleSubmit} disabled={loading.form}>
// //             {loading.form ? (
// //               <CircularProgress size={24} />
// //             ) : dialogState.editMode ? (
// //               "Update Hub"
// //             ) : (
// //               "Add Hub"
// //             )}
// //           </Button>
// //         </DialogActions>
// //       </Dialog>
// //     </Container>
// //   );
// // }

// import { useState, useEffect, useCallback, useMemo } from "react"; // Added useMemo
// import {
//   Box,
//   Button,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Typography,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   TextField,
//   IconButton,
//   Chip,
//   Container,
//   Grid,
//   useTheme,
//   useMediaQuery,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   FormHelperText,
//   CircularProgress,
//   Alert,
//   Snackbar,
// } from "@mui/material";
// import {
//   Add as AddIcon,
//   Edit as EditIcon,
//   Delete as DeleteIcon,
//   Close as CloseIcon,
//   LocationOn as LocationOnIcon,
// } from "@mui/icons-material";
// import axiosInstance from "../../utils/axiosInstance";

// const initialHubState = {
//   employee_hub_id: null,
//   employee_hub_name: "",
//   state_id: "",
// };

// export default function EmployeeHubPanel() {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

//   const [employeeHubs, setEmployeeHubs] = useState([]);
//   const [allStates, setAllStates] = useState([]);
//   const [loading, setLoading] = useState({
//     table: false,
//     form: false,
//     delete: false,
//   });
//   const [notification, setNotification] = useState({
//     open: false,
//     message: "",
//     severity: "success",
//   });
//   const [dialogState, setDialogState] = useState({
//     open: false,
//     editMode: false,
//     currentHub: initialHubState,
//   });
//   const [errors, setErrors] = useState({});

//   // --- NEW: State for pagination and search ---
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [searchTerm, setSearchTerm] = useState("");

//   const fetchData = useCallback(async () => {
//     try {
//       setLoading((prev) => ({ ...prev, table: true }));

//       const [hubsResponse, statesResponse] = await Promise.all([
//         axiosInstance.get("api/employee_hub/"),
//         axiosInstance.get("api/state_dropdown/"),
//       ]);

//       const hubData = Array.isArray(hubsResponse.data)
//         ? hubsResponse.data
//         : hubsResponse.data.data || [];

//       // --- NEW: Sort data to show latest on top ---
//       const sortedHubs = hubData.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
//       setEmployeeHubs(sortedHubs);

//       const statesData = Array.isArray(statesResponse.data)
//         ? statesResponse.data
//         : statesResponse.data.data || [];
//       setAllStates(statesData);
//     } catch (err) {
//       console.error("Failed to fetch data:", err);
//       showNotification("Failed to load data. Please try again.", "error");
//     } finally {
//       setLoading((prev) => ({ ...prev, table: false }));
//     }
//   }, []);

//   useEffect(() => {
//     fetchData();
//   }, [fetchData]);

//   // --- NEW: Handlers for pagination and search ---
//   const handleRowsPerPageChange = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const handleSearchChange = (event) => {
//     setSearchTerm(event.target.value);
//     setPage(0); // Reset to first page on new search
//   };

//   // ... other handlers (showNotification, handleAddClick, etc.) remain the same ...
//   const showNotification = (message, severity = "success") => {
//     setNotification({ open: true, message, severity });
//   };

//   const handleAddClick = () => {
//     setDialogState({ open: true, editMode: false, currentHub: initialHubState });
//     setErrors({});
//   };

//   const handleEditClick = (hub) => {
//     setDialogState({
//       open: true,
//       editMode: true,
//       currentHub: {
//         employee_hub_id: hub.employee_hub_id,
//         employee_hub_name: hub.employee_hub_name,
//         state_id: hub.state_id,
//       },
//     });
//     setErrors({});
//   };

//   const handleCloseDialog = () => {
//     setDialogState((prev) => ({ ...prev, open: false }));
//     setErrors({});
//   };

//   const validateForm = () => {
//     const newErrors = {};
//     if (!dialogState.currentHub.state_id) newErrors.state_id = "State is required";
//     if (!dialogState.currentHub.employee_hub_name.trim())
//       newErrors.employee_hub_name = "Employee Hub Name is required";
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async () => {
//     if (!validateForm()) return;
//     try {
//       setLoading((prev) => ({ ...prev, form: true }));

//       const payload = {
//         employee_hub_id: dialogState.currentHub.employee_hub_id,
//         state_id: dialogState.currentHub.state_id,
//         employee_hub_name: dialogState.currentHub.employee_hub_name,
//       };

//       if (dialogState.editMode) {
//         await axiosInstance.put("api/employee_hub/", payload);
//         showNotification("Employee hub updated successfully!");
//       } else {
//         await axiosInstance.post("api/employee_hub/", payload);
//         showNotification("Employee hub created successfully!");
//       }

//       await fetchData();
//       setTimeout(handleCloseDialog, 1000);
//     } catch (err) {
//       console.error("Save error:", err);
//       showNotification(
//         err.response?.data?.message || "Failed to save. Please try again.",
//         "error"
//       );
//     } finally {
//       setLoading((prev) => ({ ...prev, form: false }));
//     }
//   };

//   const handleDelete = async (hubId) => {
//     if (!window.confirm("Are you sure you want to delete this Employee Hub?")) return;
//     try {
//       setLoading((prev) => ({ ...prev, delete: true }));
//       await axiosInstance.delete("api/employee_hub/", { data: { employee_hub_id: hubId } });
//       showNotification("Employee hub deleted successfully!");
//       await fetchData();
//     } catch (err) {
//       console.error("Delete error:", err);
//       showNotification(
//         err.response?.data?.message || "Failed to delete. Please try again.",
//         "error"
//       );
//     } finally {
//       setLoading((prev) => ({ ...prev, delete: false }));
//     }
//   };

//   const handleInputChange = (field, value) => {
//     setDialogState((prev) => ({
//       ...prev,
//       currentHub: { ...prev.currentHub, [field]: value },
//     }));
//     if (errors[field]) {
//       setErrors((prev) => ({ ...prev, [field]: "" }));
//     }
//   };


//   const purpleButtonStyle = {
//     backgroundColor: "#673ab7",
//     color: "#fff",
//     "&:hover": { backgroundColor: "#5e35b1" },
//     "&.Mui-disabled": {
//       backgroundColor: "#b39ddb",
//       color: "#f5f5f5",
//     },
//   };

//   // --- NEW: Memoized filtered data for performance ---
//   const filteredData = useMemo(() => {
//     if (!searchTerm) {
//       return employeeHubs; // Already sorted
//     }
//     const lowercasedFilter = searchTerm.toLowerCase();
//     return employeeHubs.filter(hub =>
//       hub.employee_hub_name.toLowerCase().includes(lowercasedFilter) ||
//       hub.state_name.toLowerCase().includes(lowercasedFilter)
//     );
//   }, [employeeHubs, searchTerm]);

//   // --- UPDATED: Calculations now use filteredData ---
//   const paginatedData = filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
//   const pageCount = Math.ceil(filteredData.length / rowsPerPage);

//   return (
//     <Container maxWidth="lg" sx={{ py: 4 }}>
//       <Snackbar
//         open={notification.open}
//         autoHideDuration={6000}
//         onClose={() => setNotification((prev) => ({ ...prev, open: false }))}
//         anchorOrigin={{ vertical: "top", horizontal: "right" }}
//       >
//         <Alert
//           severity={notification.severity}
//           onClose={() => setNotification((prev) => ({ ...prev, open: false }))}
//           sx={{ width: "100%" }}
//         >
//           {notification.message}
//         </Alert>
//       </Snackbar>

//       <Box sx={{ mb: 4 }}>
//         <Grid container justifyContent="space-between" alignItems="center" spacing={2}>
//           <Grid item xs={12} md={6}>
//             <Typography variant="h4" fontWeight="bold">
//               Employee Hub Panel
//             </Typography>
//           </Grid>
//           <Grid item xs={12} md={6} sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap', justifyContent: { xs: 'flex-start', md: 'flex-end' } }}>
//             {/* --- NEW: Search Bar --- */}
//             <TextField
//               size="small"
//               variant="outlined"
//               placeholder="Search..."
//               value={searchTerm}
//               onChange={handleSearchChange}
//               sx={{ width: { xs: '100%', sm: 'auto' } }}
//             />
//             <Button
//               variant="contained"
//               startIcon={<AddIcon />}
//               onClick={handleAddClick}
//               sx={{
//                 ...purpleButtonStyle,
//                 borderRadius: 2,
//                 textTransform: "none",
//                 fontWeight: 600,
//                 height: '40px'
//               }}
//               disabled={loading.table || loading.delete}
//             >
//               Add Hub
//             </Button>
//           </Grid>
//         </Grid>
//       </Box>

//       {/* --- NEW: Rows per page moved here --- */}
//       <Box sx={{ display: 'flex', mb: 2 }}>
//         <FormControl variant="outlined" size="small" sx={{ minWidth: 100 }}>
//           <InputLabel>Rows</InputLabel>
//           <Select value={rowsPerPage} label="Rows" onChange={handleRowsPerPageChange}>
//             <MenuItem value={10}>10</MenuItem>
//             <MenuItem value={25}>25</MenuItem>
//             <MenuItem value={50}>50</MenuItem>
//           </Select>
//         </FormControl>
//       </Box>

//       {loading.table && !paginatedData.length ? (
//         <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
//           <CircularProgress />
//         </Box>
//       ) : (
//         <Paper elevation={2} sx={{ borderRadius: 2 }}>
//           <TableContainer>
//             <Table>
//               <TableHead>
//                 <TableRow sx={{ backgroundColor: "grey.100" }}>
//                   <TableCell sx={{ fontWeight: 600, width: '80px' }}>SR. NO.</TableCell>
//                   <TableCell sx={{ fontWeight: 600 }}>Employee Hub Name</TableCell>
//                   {!isMobile && <TableCell sx={{ fontWeight: 600 }}>State</TableCell>}
//                   {!isMobile && <TableCell sx={{ fontWeight: 600 }}>Created At</TableCell>}
//                   <TableCell align="center" sx={{ fontWeight: 600 }}>
//                     Actions
//                   </TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {paginatedData.length > 0 ? (
//                   paginatedData.map((hub, index) => (
//                     <TableRow key={hub.employee_hub_id} hover>
//                       <TableCell>{page * rowsPerPage + index + 1}</TableCell>
//                       <TableCell>
//                         <Typography fontWeight={500}>{hub.employee_hub_name}</Typography>
//                         {isMobile && (
//                           <Box sx={{ mt: 1, display: "flex", flexWrap: "wrap", gap: 1 }}>
//                             <Chip icon={<LocationOnIcon />} label={hub.state_name} size="small" />
//                             <Typography variant="caption" color="text.secondary">
//                               {new Date(hub.created_at).toLocaleDateString()}
//                             </Typography>
//                           </Box>
//                         )}
//                       </TableCell>
//                       {!isMobile && <TableCell>{hub.state_name}</TableCell>}
//                       {!isMobile && (
//                         <TableCell>{new Date(hub.created_at).toLocaleDateString()}</TableCell>
//                       )}
//                       <TableCell align="center">
//                         <Box sx={{ display: "flex", gap: 1, justifyContent: "center" }}>
//                           <IconButton
//                             onClick={() => handleEditClick(hub)}
//                             size="small"
//                             sx={{ color: '#673ab7' }}
//                           >
//                             <EditIcon />
//                           </IconButton>
//                           <IconButton
//                             onClick={() => handleDelete(hub.employee_hub_id)}
//                             color="error"
//                             size="small"
//                             disabled={loading.delete}
//                           >
//                             {loading.delete ? <CircularProgress size={20} /> : <DeleteIcon />}
//                           </IconButton>
//                         </Box>
//                       </TableCell>
//                     </TableRow>
//                   ))
//                 ) : (
//                   <TableRow>
//                     <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
//                       {searchTerm ? "No results found for your search." : "No employee hubs found."}
//                     </TableCell>
//                   </TableRow>
//                 )}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         </Paper>
//       )}

//       {/* --- UPDATED: Use filteredData.length for condition --- */}
//       {filteredData.length > 0 && (
//         <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', p: 2, gap: 2 }}>
//           <Button
//             variant="contained"
//             onClick={() => setPage(p => p - 1)}
//             disabled={page === 0}
//             sx={purpleButtonStyle}
//           >
//             Previous
//           </Button>
//           <Typography>
//             Page {page + 1} of {pageCount > 0 ? pageCount : 1}
//           </Typography>
//           <Button
//             variant="contained"
//             onClick={() => setPage(p => p + 1)}
//             disabled={page >= pageCount - 1}
//             sx={purpleButtonStyle}
//           >
//             Next
//           </Button>
//         </Box>
//       )}

//       {/* Dialog remains unchanged */}
//       <Dialog open={dialogState.open} onClose={handleCloseDialog} fullWidth maxWidth="sm">
//         <DialogTitle>
//           <Box sx={{ display: "flex", justifyContent: "space-between" }}>
//             <Typography variant="h6" fontWeight={600}>
//               {dialogState.editMode ? "Edit" : "Add"} Employee Hub
//             </Typography>
//             <IconButton onClick={handleCloseDialog} size="small" disabled={loading.form}>
//               <CloseIcon />
//             </IconButton>
//           </Box>
//         </DialogTitle>
//         <DialogContent>
//           <Box sx={{ display: "flex", flexDirection: "column", gap: 3, pt: 2 }}>
//             <TextField
//               label="Employee Hub Name"
//               fullWidth
//               value={dialogState.currentHub.employee_hub_name}
//               onChange={(e) => handleInputChange("employee_hub_name", e.target.value)}
//               error={!!errors.employee_hub_name}
//               helperText={errors.employee_hub_name}
//               disabled={loading.form}
//             />
//             <FormControl fullWidth error={!!errors.state_id} disabled={loading.form}>
//               <InputLabel id="state-select-label">State</InputLabel>
//               <Select
//                 labelId="state-select-label"
//                 label="State"
//                 value={dialogState.currentHub.state_id}
//                 onChange={(e) => handleInputChange("state_id", e.target.value)}
//               >
//                 {allStates.map((state) => (
//                   <MenuItem key={state.state_id} value={state.state_id}>
//                     {state.state_name}
//                   </MenuItem>
//                 ))}
//               </Select>
//               {errors.state_id && <FormHelperText>{errors.state_id}</FormHelperText>}
//             </FormControl>
//           </Box>
//         </DialogContent>
//         <DialogActions sx={{ p: 3 }}>
//           <Button variant="outlined" onClick={handleCloseDialog} disabled={loading.form}>
//             Cancel
//           </Button>
//           <Button
//             variant="contained"
//             onClick={handleSubmit}
//             sx={purpleButtonStyle}
//             disabled={loading.form}
//           >
//             {loading.form ? (
//               <CircularProgress size={24} color="inherit" />
//             ) : dialogState.editMode ? (
//               "Update Hub"
//             ) : (
//               "Add Hub"
//             )}
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Container>
//   );
// }


















// import { useState, useEffect, useCallback, useMemo } from "react"; // Added useMemo
// import {
//   Box,
//   Button,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Typography,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   TextField,
//   IconButton,
//   Chip,
//   Container,
//   Grid,
//   useTheme,
//   useMediaQuery,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   FormHelperText,
//   CircularProgress,
//   Alert,
//   Snackbar,
// } from "@mui/material";
// import {
//   Add as AddIcon,
//   Edit as EditIcon,
//   Delete as DeleteIcon,
//   Close as CloseIcon,
//   LocationOn as LocationOnIcon,
// } from "@mui/icons-material";
// import axiosInstance from "../../utils/axiosInstance";

// const initialHubState = {
//   employee_hub_id: null,
//   employee_hub_name: "",
//   state_id: "",
// };

// export default function EmployeeHubPanel() {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

//   const [employeeHubs, setEmployeeHubs] = useState([]);
//   const [allStates, setAllStates] = useState([]);
//   const [loading, setLoading] = useState({
//     table: false,
//     form: false,
//     delete: false,
//   });
//   const [notification, setNotification] = useState({
//     open: false,
//     message: "",
//     severity: "success",
//   });
//   const [dialogState, setDialogState] = useState({
//     open: false,
//     editMode: false,
//     currentHub: initialHubState,
//   });
//   const [errors, setErrors] = useState({});

//   // --- NEW: State for pagination and search ---
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [searchTerm, setSearchTerm] = useState("");

//   const fetchData = useCallback(async () => {
//     try {
//       setLoading((prev) => ({ ...prev, table: true }));

//       const [hubsResponse, statesResponse] = await Promise.all([
//         axiosInstance.get("api/employee_hub/"),
//         axiosInstance.get("api/state_dropdown/"),
//       ]);

//       const hubData = Array.isArray(hubsResponse.data)
//         ? hubsResponse.data
//         : hubsResponse.data.data || [];

//       // --- NEW: Sort data to show latest on top ---
//       const sortedHubs = hubData.sort(
//         (a, b) => new Date(b.created_at) - new Date(a.created_at)
//       );
//       setEmployeeHubs(sortedHubs);

//       const statesData = Array.isArray(statesResponse.data)
//         ? statesResponse.data
//         : statesResponse.data.data || [];
//       setAllStates(statesData);
//     } catch (err) {
//       console.error("Failed to fetch data:", err);
//       showNotification("Failed to load data. Please try again.", "error");
//     } finally {
//       setLoading((prev) => ({ ...prev, table: false }));
//     }
//   }, []);

//   useEffect(() => {
//     fetchData();
//   }, [fetchData]);

//   // --- NEW: Handlers for pagination and search ---
//   const handleRowsPerPageChange = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const handleSearchChange = (event) => {
//     setSearchTerm(event.target.value);
//     setPage(0); // Reset to first page on new search
//   };

//   // ... other handlers (showNotification, handleAddClick, etc.) remain the same ...
//   const showNotification = (message, severity = "success") => {
//     setNotification({ open: true, message, severity });
//   };

//   const handleAddClick = () => {
//     setDialogState({
//       open: true,
//       editMode: false,
//       currentHub: initialHubState,
//     });
//     setErrors({});
//   };

//   const handleEditClick = (hub) => {
//     setDialogState({
//       open: true,
//       editMode: true,
//       currentHub: {
//         employee_hub_id: hub.employee_hub_id,
//         employee_hub_name: hub.employee_hub_name,
//         state_id: hub.state_id,
//       },
//     });
//     setErrors({});
//   };

//   const handleCloseDialog = () => {
//     setDialogState((prev) => ({ ...prev, open: false }));
//     setErrors({});
//   };

//   const validateForm = () => {
//     const newErrors = {};
//     if (!dialogState.currentHub.state_id)
//       newErrors.state_id = "State is required";
//     if (!dialogState.currentHub.employee_hub_name.trim())
//       newErrors.employee_hub_name = "Employee Hub Name is required";
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async () => {
//     if (!validateForm()) return;
//     try {
//       setLoading((prev) => ({ ...prev, form: true }));

//       const payload = {
//         employee_hub_id: dialogState.currentHub.employee_hub_id,
//         state_id: dialogState.currentHub.state_id,
//         employee_hub_name: dialogState.currentHub.employee_hub_name,
//       };

//       if (dialogState.editMode) {
//         await axiosInstance.put("api/employee_hub/", payload);
//         showNotification("Employee hub updated successfully!");
//       } else {
//         await axiosInstance.post("api/employee_hub/", payload);
//         showNotification("Employee hub created successfully!");
//       }

//       await fetchData();
//       setTimeout(handleCloseDialog, 1000);
//     } catch (err) {
//       console.error("Save error:", err);
//       showNotification(
//         err.response?.data?.message || "Failed to save. Please try again.",
//         "error"
//       );
//     } finally {
//       setLoading((prev) => ({ ...prev, form: false }));
//     }
//   };

//   const handleDelete = async (hubId) => {
//     if (!window.confirm("Are you sure you want to delete this Employee Hub?"))
//       return;
//     try {
//       setLoading((prev) => ({ ...prev, delete: true }));
//       await axiosInstance.delete("api/employee_hub/", {
//         data: { employee_hub_id: hubId },
//       });
//       showNotification("Employee hub deleted successfully!");
//       await fetchData();
//     } catch (err) {
//       console.error("Delete error:", err);
//       showNotification(
//         err.response?.data?.message || "Failed to delete. Please try again.",
//         "error"
//       );
//     } finally {
//       setLoading((prev) => ({ ...prev, delete: false }));
//     }
//   };

//   const handleInputChange = (field, value) => {
//     setDialogState((prev) => ({
//       ...prev,
//       currentHub: { ...prev.currentHub, [field]: value },
//     }));
//     if (errors[field]) {
//       setErrors((prev) => ({ ...prev, [field]: "" }));
//     }
//   };

//   const purpleButtonStyle = {
//     backgroundColor: "#673ab7",
//     color: "#fff",
//     "&:hover": { backgroundColor: "#5e35b1" },
//     "&.Mui-disabled": {
//       backgroundColor: "#b39ddb",
//       color: "#f5f5f5",
//     },
//   };

//   // --- NEW: Memoized filtered data for performance ---
//   const filteredData = useMemo(() => {
//     if (!searchTerm) {
//       return employeeHubs; // Already sorted
//     }
//     const lowercasedFilter = searchTerm.toLowerCase();
//     return employeeHubs.filter(
//       (hub) =>
//         hub.employee_hub_name.toLowerCase().includes(lowercasedFilter) ||
//         hub.state_name.toLowerCase().includes(lowercasedFilter)
//     );
//   }, [employeeHubs, searchTerm]);

//   // --- UPDATED: Calculations now use filteredData ---
//   const paginatedData = filteredData.slice(
//     page * rowsPerPage,
//     page * rowsPerPage + rowsPerPage
//   );
//   const pageCount = Math.ceil(filteredData.length / rowsPerPage);

//   return (
//     <Container maxWidth="lg" sx={{ py: 4 }}>
//       <Snackbar
//         open={notification.open}
//         autoHideDuration={6000}
//         onClose={() => setNotification((prev) => ({ ...prev, open: false }))}
//         anchorOrigin={{ vertical: "top", horizontal: "right" }}
//       >
//         <Alert
//           severity={notification.severity}
//           onClose={() => setNotification((prev) => ({ ...prev, open: false }))}
//           sx={{ width: "100%" }}
//         >
//           {notification.message}
//         </Alert>
//       </Snackbar>

//       <Box sx={{ mb: 4 }}>
//         <Grid
//           container
//           justifyContent="space-between"
//           alignItems="center"
//           spacing={2}
//         >
//           <Grid item xs={12} md={6}>
//             <Typography variant="h4" fontWeight="bold">
//               Holiday Hub Panel
//             </Typography>
//           </Grid>
//           <Grid
//             item
//             xs={12}
//             md={6}
//             sx={{
//               display: "flex",
//               gap: 2,
//               alignItems: "center",
//               flexWrap: "wrap",
//               justifyContent: { xs: "flex-start", md: "flex-end" },
//             }}
//           >
//             {/* --- NEW: Search Bar --- */}
//             <TextField
//               size="small"
//               variant="outlined"
//               placeholder="Search..."
//               value={searchTerm}
//               onChange={handleSearchChange}
//               sx={{ width: { xs: "100%", sm: "auto" } }}
//             />
//             <Button
//               variant="contained"
//               startIcon={<AddIcon />}
//               onClick={handleAddClick}
//               sx={{
//                 ...purpleButtonStyle,
//                 borderRadius: 2,
//                 textTransform: "none",
//                 fontWeight: 600,
//                 height: "40px",
//               }}
//               disabled={loading.table || loading.delete}
//             >
//               Add Hub
//             </Button>
//           </Grid>
//         </Grid>
//       </Box>

//       {/* --- NEW: Rows per page moved here --- */}
//       <Box sx={{ display: "flex", mb: 2 }}>
//         <FormControl variant="outlined" size="small" sx={{ minWidth: 100 }}>
//           <InputLabel>Rows</InputLabel>
//           <Select
//             value={rowsPerPage}
//             label="Rows"
//             onChange={handleRowsPerPageChange}
//           >
//             <MenuItem value={10}>10</MenuItem>
//             <MenuItem value={25}>25</MenuItem>
//             <MenuItem value={50}>50</MenuItem>
//           </Select>
//         </FormControl>
//       </Box>

//       {loading.table && !paginatedData.length ? (
//         <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
//           <CircularProgress />
//         </Box>
//       ) : (
//         <Paper elevation={2} sx={{ borderRadius: 2 }}>
//           <TableContainer>
//             <Table>
//               <TableHead>
//                 <TableRow sx={{ backgroundColor: "grey.100" }}>
//                   <TableCell sx={{ fontWeight: 600, width: "80px" }}>
//                     SR. NO.
//                   </TableCell>
//                   <TableCell sx={{ fontWeight: 600 }}>
//                     Holiday Hub Name
//                   </TableCell>
//                   {!isMobile && (
//                     <TableCell sx={{ fontWeight: 600 }}>State</TableCell>
//                   )}
//                   {!isMobile && (
//                     <TableCell sx={{ fontWeight: 600 }}>Created At</TableCell>
//                   )}
//                   <TableCell align="center" sx={{ fontWeight: 600 }}>
//                     Actions
//                   </TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {paginatedData.length > 0 ? (
//                   paginatedData.map((hub, index) => (
//                     <TableRow key={hub.employee_hub_id} hover>
//                       <TableCell>{page * rowsPerPage + index + 1}</TableCell>
//                       <TableCell>
//                         <Typography fontWeight={500}>
//                           {hub.employee_hub_name}
//                         </Typography>
//                         {isMobile && (
//                           <Box
//                             sx={{
//                               mt: 1,
//                               display: "flex",
//                               flexWrap: "wrap",
//                               gap: 1,
//                             }}
//                           >
//                             <Chip
//                               icon={<LocationOnIcon />}
//                               label={hub.state_name}
//                               size="small"
//                             />
//                             <Typography
//                               variant="caption"
//                               color="text.secondary"
//                             >
//                               {new Date(hub.created_at).toLocaleDateString()}
//                             </Typography>
//                           </Box>
//                         )}
//                       </TableCell>
//                       {!isMobile && <TableCell>{hub.state_name}</TableCell>}
//                       {!isMobile && (
//                         <TableCell>
//                           {new Date(hub.created_at).toLocaleDateString()}
//                         </TableCell>
//                       )}
//                       <TableCell align="center">
//                         <Box
//                           sx={{
//                             display: "flex",
//                             gap: 1,
//                             justifyContent: "center",
//                           }}
//                         >
//                           <IconButton
//                             onClick={() => handleEditClick(hub)}
//                             size="small"
//                             sx={{ color: "#673ab7" }}
//                           >
//                             <EditIcon />
//                           </IconButton>
//                           <IconButton
//                             onClick={() => handleDelete(hub.employee_hub_id)}
//                             color="error"
//                             size="small"
//                             disabled={loading.delete}
//                           >
//                             {loading.delete ? (
//                               <CircularProgress size={20} />
//                             ) : (
//                               <DeleteIcon />
//                             )}
//                           </IconButton>
//                         </Box>
//                       </TableCell>
//                     </TableRow>
//                   ))
//                 ) : (
//                   <TableRow>
//                     <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
//                       {searchTerm
//                         ? "No results found for your search."
//                         : "No employee hubs found."}
//                     </TableCell>
//                   </TableRow>
//                 )}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         </Paper>
//       )}

//       {/* --- UPDATED: Use filteredData.length for condition --- */}
//       {filteredData.length > 0 && (
//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "flex-end",
//             alignItems: "center",
//             p: 2,
//             gap: 2,
//           }}
//         >
//           <Button
//             variant="contained"
//             onClick={() => setPage((p) => p - 1)}
//             disabled={page === 0}
//             sx={purpleButtonStyle}
//           >
//             Previous
//           </Button>
//           <Typography>
//             Page {page + 1} of {pageCount > 0 ? pageCount : 1}
//           </Typography>
//           <Button
//             variant="contained"
//             onClick={() => setPage((p) => p + 1)}
//             disabled={page >= pageCount - 1}
//             sx={purpleButtonStyle}
//           >
//             Next
//           </Button>
//         </Box>
//       )}

//       {/* Dialog remains unchanged */}
//       <Dialog
//         open={dialogState.open}
//         onClose={handleCloseDialog}
//         fullWidth
//         maxWidth="sm"
//       >
//         <DialogTitle>
//           <Box sx={{ display: "flex", justifyContent: "space-between" }}>
//             <Typography variant="h6" fontWeight={600}>
//               {dialogState.editMode ? "Edit" : "Add"} Employee Hub
//             </Typography>
//             <IconButton
//               onClick={handleCloseDialog}
//               size="small"
//               disabled={loading.form}
//             >
//               <CloseIcon />
//             </IconButton>
//           </Box>
//         </DialogTitle>
//         <DialogContent>
//           <Box sx={{ display: "flex", flexDirection: "column", gap: 3, pt: 2 }}>
//             <TextField
//               label="Employee Hub Name"
//               fullWidth
//               value={dialogState.currentHub.employee_hub_name}
//               onChange={(e) =>
//                 handleInputChange("employee_hub_name", e.target.value)
//               }
//               error={!!errors.employee_hub_name}
//               helperText={errors.employee_hub_name}
//               disabled={loading.form}
//             />
//             <FormControl
//               fullWidth
//               error={!!errors.state_id}
//               disabled={loading.form}
//             >
//               <InputLabel id="state-select-label">State</InputLabel>
//               <Select
//                 labelId="state-select-label"
//                 label="State"
//                 value={dialogState.currentHub.state_id}
//                 onChange={(e) => handleInputChange("state_id", e.target.value)}
//               >
//                 {allStates.map((state) => (
//                   <MenuItem key={state.state_id} value={state.state_id}>
//                     {state.state_name}
//                   </MenuItem>
//                 ))}
//               </Select>
//               {errors.state_id && (
//                 <FormHelperText>{errors.state_id}</FormHelperText>
//               )}
//             </FormControl>
//           </Box>
//         </DialogContent>
//         <DialogActions sx={{ p: 3 }}>
//           <Button
//             variant="outlined"
//             onClick={handleCloseDialog}
//             disabled={loading.form}
//           >
//             Cancel
//           </Button>
//           <Button
//             variant="contained"
//             onClick={handleSubmit}
//             sx={purpleButtonStyle}
//             disabled={loading.form}
//           >
//             {loading.form ? (
//               <CircularProgress size={24} color="inherit" />
//             ) : dialogState.editMode ? (
//               "Update Hub"
//             ) : (
//               "Add Hub"
//             )}
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Container>
//   );
// }









// import { useState, useEffect, useCallback, useMemo } from "react";
// import {
//   Box,
//   Button,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Typography,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   TextField,
//   IconButton,
//   Chip,
//   Container,
//   Grid,
//   useTheme,
//   useMediaQuery,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   FormHelperText,
//   CircularProgress,
//   Alert,
//   Snackbar,
//   TablePagination, // <-- Import TablePagination
// } from "@mui/material";
// import {
//   Add as AddIcon,
//   Edit as EditIcon,
//   Delete as DeleteIcon,
//   Close as CloseIcon,
//   LocationOn as LocationOnIcon,
// } from "@mui/icons-material";
// import axiosInstance from "../../utils/axiosInstance";

// const initialHubState = {
//   employee_hub_id: null,
//   employee_hub_name: "",
//   state_id: "",
// };

// // Define the color theme for consistency
// const THEME_COLORS = {
//   primary: "#8C257C", // Purple
//   primaryDark: "#7a216d", // Darker purple for hover
//   secondary: "#F58E35", // Orange
// };

// export default function EmployeeHubPanel() {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

//   const [employeeHubs, setEmployeeHubs] = useState([]);
//   const [allStates, setAllStates] = useState([]);
//   const [loading, setLoading] = useState({
//     table: false,
//     form: false,
//     delete: false,
//   });
//   const [notification, setNotification] = useState({
//     open: false,
//     message: "",
//     severity: "success",
//   });
//   const [dialogState, setDialogState] = useState({
//     open: false,
//     editMode: false,
//     currentHub: initialHubState,
//   });
//   const [errors, setErrors] = useState({});

//   // --- State for pagination and search ---
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10); // Standardized to 10
//   const [searchTerm, setSearchTerm] = useState("");

//   const fetchData = useCallback(async () => {
//     try {
//       setLoading((prev) => ({ ...prev, table: true }));

//       const [hubsResponse, statesResponse] = await Promise.all([
//         axiosInstance.get("api/employee_hub/"),
//         axiosInstance.get("api/state_dropdown/"),
//       ]);

//       const hubData = Array.isArray(hubsResponse.data)
//         ? hubsResponse.data
//         : hubsResponse.data.data || [];

//       // Sort data to show latest on top
//       const sortedHubs = hubData.sort(
//         (a, b) => new Date(b.created_at) - new Date(a.created_at)
//       );
//       setEmployeeHubs(sortedHubs);

//       const statesData = Array.isArray(statesResponse.data)
//         ? statesResponse.data
//         : statesResponse.data.data || [];
//       setAllStates(statesData);
//     } catch (err) {
//       console.error("Failed to fetch data:", err);
//       showNotification("Failed to load data. Please try again.", "error");
//     } finally {
//       setLoading((prev) => ({ ...prev, table: false }));
//     }
//   }, []);

//   useEffect(() => {
//     fetchData();
//   }, [fetchData]);

//   // --- Handlers for pagination and search ---
//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleRowsPerPageChange = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const handleSearchChange = (event) => {
//     setSearchTerm(event.target.value);
//     setPage(0); // Reset to first page on new search
//   };

//   const showNotification = (message, severity = "success") => {
//     setNotification({ open: true, message, severity });
//   };

//   const handleAddClick = () => {
//     setDialogState({
//       open: true,
//       editMode: false,
//       currentHub: initialHubState,
//     });
//     setErrors({});
//   };

//   const handleEditClick = (hub) => {
//     setDialogState({
//       open: true,
//       editMode: true,
//       currentHub: {
//         employee_hub_id: hub.employee_hub_id,
//         employee_hub_name: hub.employee_hub_name,
//         state_id: hub.state_id,
//       },
//     });
//     setErrors({});
//   };

//   const handleCloseDialog = () => {
//     setDialogState((prev) => ({ ...prev, open: false }));
//     setErrors({});
//   };

//   const validateForm = () => {
//     const newErrors = {};
//     if (!dialogState.currentHub.state_id)
//       newErrors.state_id = "State is required";
//     if (!dialogState.currentHub.employee_hub_name.trim())
//       newErrors.employee_hub_name = "Employee Hub Name is required";
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async () => {
//     if (!validateForm()) return;
//     try {
//       setLoading((prev) => ({ ...prev, form: true }));

//       const payload = {
//         employee_hub_id: dialogState.currentHub.employee_hub_id,
//         state_id: dialogState.currentHub.state_id,
//         employee_hub_name: dialogState.currentHub.employee_hub_name,
//       };

//       if (dialogState.editMode) {
//         await axiosInstance.put("api/employee_hub/", payload);
//         showNotification("Employee hub updated successfully!");
//       } else {
//         await axiosInstance.post("api/employee_hub/", payload);
//         showNotification("Employee hub created successfully!");
//       }

//       await fetchData();
//       setTimeout(handleCloseDialog, 1000);
//     } catch (err) {
//       console.error("Save error:", err);
//       showNotification(
//         err.response?.data?.message || "Failed to save. Please try again.",
//         "error"
//       );
//     } finally {
//       setLoading((prev) => ({ ...prev, form: false }));
//     }
//   };

//   const handleDelete = async (hubId) => {
//     if (!window.confirm("Are you sure you want to delete this Employee Hub?"))
//       return;
//     try {
//       setLoading((prev) => ({ ...prev, delete: true }));
//       await axiosInstance.delete("api/employee_hub/", {
//         data: { employee_hub_id: hubId },
//       });
//       showNotification("Employee hub deleted successfully!");
//       await fetchData();
//     } catch (err) {
//       console.error("Delete error:", err);
//       showNotification(
//         err.response?.data?.message || "Failed to delete. Please try again.",
//         "error"
//       );
//     } finally {
//       setLoading((prev) => ({ ...prev, delete: false }));
//     }
//   };

//   const handleInputChange = (field, value) => {
//     setDialogState((prev) => ({
//       ...prev,
//       currentHub: { ...prev.currentHub, [field]: value },
//     }));
//     if (errors[field]) {
//       setErrors((prev) => ({ ...prev, [field]: "" }));
//     }
//   };

//   // --- UPDATED: New color scheme for buttons ---
//   const primaryButtonStyle = {
//     backgroundColor: THEME_COLORS.primary,
//     color: "#fff",
//     "&:hover": { backgroundColor: THEME_COLORS.primaryDark },
//     "&.Mui-disabled": {
//       backgroundColor: "#d1a8c9",
//       color: "#f5f5f5",
//     },
//   };

//   // Memoized filtered data for performance
//   const filteredData = useMemo(() => {
//     if (!searchTerm) {
//       return employeeHubs;
//     }
//     const lowercasedFilter = searchTerm.toLowerCase();
//     return employeeHubs.filter(
//       (hub) =>
//         hub.employee_hub_name.toLowerCase().includes(lowercasedFilter) ||
//         hub.state_name.toLowerCase().includes(lowercasedFilter)
//     );
//   }, [employeeHubs, searchTerm]);

//   // Data to be rendered on the current page
//   const paginatedData = filteredData.slice(
//     page * rowsPerPage,
//     page * rowsPerPage + rowsPerPage
//   );

//   return (
//     <Container maxWidth="lg" sx={{ py: 4 }}>
//       <Snackbar
//         open={notification.open}
//         autoHideDuration={6000}
//         onClose={() => setNotification((prev) => ({ ...prev, open: false }))}
//         anchorOrigin={{ vertical: "top", horizontal: "right" }}
//       >
//         <Alert
//           severity={notification.severity}
//           onClose={() => setNotification((prev) => ({ ...prev, open: false }))}
//           sx={{ width: "100%" }}
//         >
//           {notification.message}
//         </Alert>
//       </Snackbar>

//       <Box sx={{ mb: 4 }}>
//         <Grid
//           container
//           justifyContent="space-between"
//           alignItems="center"
//           spacing={2}
//         >
//           <Grid item xs={12} sm={6}>
//             <Typography variant="h4" fontWeight="bold">
//               Holiday Hub Panel
//             </Typography>
//           </Grid>
//           <Grid
//             item
//             xs={12}
//             sm={6}
//             sx={{ display: "flex", justifyContent: "flex-end" }}
//           >
//             <Button
//               variant="contained"
//               startIcon={<AddIcon />}
//               onClick={handleAddClick}
//               sx={{
//                 ...primaryButtonStyle,
//                 borderRadius: 2,
//                 textTransform: "none",
//                 fontWeight: 600,
//                 height: "40px",
//               }}
//               disabled={loading.table || loading.delete}
//             >
//               Add Hub
//             </Button>
//           </Grid>
//         </Grid>
//       </Box>

//       <Paper elevation={2} sx={{ borderRadius: 2, overflow: "hidden" }}>
//         {/* --- NEW: Search Bar on top right of table --- */}
//         <Box sx={{ p: 2, display: "flex", justifyContent: "flex-end" }}>
//           <TextField
//             size="small"
//             variant="outlined"
//             placeholder="Search Hub or State..."
//             value={searchTerm}
//             onChange={handleSearchChange}
//             sx={{ width: { xs: "100%", sm: "300px" } }}
//           />
//         </Box>

//         {loading.table && !paginatedData.length ? (
//           <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
//             <CircularProgress sx={{color: THEME_COLORS.primary}} />
//           </Box>
//         ) : (
//           <TableContainer>
//             <Table>
//               <TableHead>
//                 {/* --- UPDATED: Table header with new color --- */}
//                 <TableRow sx={{ backgroundColor: THEME_COLORS.primary }}>
//                   <TableCell sx={{ fontWeight: 600, color: "#fff" }}>
//                     SR. NO.
//                   </TableCell>
//                   <TableCell sx={{ fontWeight: 600, color: "#fff" }}>
//                     Holiday Hub Name
//                   </TableCell>
//                   {!isMobile && (
//                     <TableCell sx={{ fontWeight: 600, color: "#fff" }}>
//                       State
//                     </TableCell>
//                   )}
//                   {!isMobile && (
//                     <TableCell sx={{ fontWeight: 600, color: "#fff" }}>
//                       Created At
//                     </TableCell>
//                   )}
//                   <TableCell
//                     align="center"
//                     sx={{ fontWeight: 600, color: "#fff" }}
//                   >
//                     Actions
//                   </TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {paginatedData.length > 0 ? (
//                   paginatedData.map((hub, index) => (
//                     <TableRow key={hub.employee_hub_id} hover>
//                       <TableCell>{page * rowsPerPage + index + 1}</TableCell>
//                       <TableCell>
//                         <Typography fontWeight={500}>
//                           {hub.employee_hub_name}
//                         </Typography>
//                         {isMobile && (
//                           <Box
//                             sx={{
//                               mt: 1,
//                               display: "flex",
//                               flexWrap: "wrap",
//                               gap: 1,
//                             }}
//                           >
//                             <Chip
//                               icon={<LocationOnIcon />}
//                               label={hub.state_name}
//                               size="small"
//                             />
//                             <Typography
//                               variant="caption"
//                               color="text.secondary"
//                             >
//                               {new Date(hub.created_at).toLocaleDateString()}
//                             </Typography>
//                           </Box>
//                         )}
//                       </TableCell>
//                       {!isMobile && <TableCell>{hub.state_name}</TableCell>}
//                       {!isMobile && (
//                         <TableCell>
//                           {new Date(hub.created_at).toLocaleDateString()}
//                         </TableCell>
//                       )}
//                       <TableCell align="center">
//                         <Box
//                           sx={{
//                             display: "flex",
//                             gap: 1,
//                             justifyContent: "center",
//                           }}
//                         >
//                           <IconButton
//                             onClick={() => handleEditClick(hub)}
//                             size="small"
//                             sx={{ color: THEME_COLORS.primary }}
//                           >
//                             <EditIcon />
//                           </IconButton>
//                           <IconButton
//                             onClick={() => handleDelete(hub.employee_hub_id)}
//                             color="error"
//                             size="small"
//                             disabled={loading.delete}
//                           >
//                             {loading.delete ? (
//                               <CircularProgress size={20} />
//                             ) : (
//                               <DeleteIcon />
//                             )}
//                           </IconButton>
//                         </Box>
//                       </TableCell>
//                     </TableRow>
//                   ))
//                 ) : (
//                   <TableRow>
//                     <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
//                       {searchTerm
//                         ? "No results found for your search."
//                         : "No employee hubs found."}
//                     </TableCell>
//                   </TableRow>
//                 )}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         )}

//         {/* --- NEW: Standardized Pagination Component --- */}
//         <TablePagination
//           rowsPerPageOptions={[10, 25, 50]}
//           component="div"
//           count={filteredData.length}
//           rowsPerPage={rowsPerPage}
//           page={page}
//           onPageChange={handleChangePage}
//           onRowsPerPageChange={handleRowsPerPageChange}
//         />
//       </Paper>

//       {/* Dialog remains mostly unchanged, but uses new button style */}
//       <Dialog
//         open={dialogState.open}
//         onClose={handleCloseDialog}
//         fullWidth
//         maxWidth="sm"
//       >
//         <DialogTitle>
//           <Box sx={{ display: "flex", justifyContent: "space-between" }}>
//             <Typography variant="h6" fontWeight={600}>
//               {dialogState.editMode ? "Edit" : "Add"} Employee Hub
//             </Typography>
//             <IconButton
//               onClick={handleCloseDialog}
//               size="small"
//               disabled={loading.form}
//             >
//               <CloseIcon />
//             </IconButton>
//           </Box>
//         </DialogTitle>
//         <DialogContent>
//           <Box sx={{ display: "flex", flexDirection: "column", gap: 3, pt: 2 }}>
//             <TextField
//               label="Employee Hub Name"
//               fullWidth
//               value={dialogState.currentHub.employee_hub_name}
//               onChange={(e) =>
//                 handleInputChange("employee_hub_name", e.target.value)
//               }
//               error={!!errors.employee_hub_name}
//               helperText={errors.employee_hub_name}
//               disabled={loading.form}
//             />
//             <FormControl
//               fullWidth
//               error={!!errors.state_id}
//               disabled={loading.form}
//             >
//               <InputLabel id="state-select-label">State</InputLabel>
//               <Select
//                 labelId="state-select-label"
//                 label="State"
//                 value={dialogState.currentHub.state_id}
//                 onChange={(e) => handleInputChange("state_id", e.target.value)}
//               >
//                 {allStates.map((state) => (
//                   <MenuItem key={state.state_id} value={state.state_id}>
//                     {state.state_name}
//                   </MenuItem>
//                 ))}
//               </Select>
//               {errors.state_id && (
//                 <FormHelperText>{errors.state_id}</FormHelperText>
//               )}
//             </FormControl>
//           </Box>
//         </DialogContent>
//         <DialogActions sx={{ p: 3 }}>
//           <Button
//             variant="outlined"
//             onClick={handleCloseDialog}
//             disabled={loading.form}
//           >
//             Cancel
//           </Button>
//           <Button
//             variant="contained"
//             onClick={handleSubmit}
//             sx={primaryButtonStyle}
//             disabled={loading.form}
//           >
//             {loading.form ? (
//               <CircularProgress size={24} color="inherit" />
//             ) : dialogState.editMode ? (
//               "Update Hub"
//             ) : (
//               "Add Hub"
//             )}
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Container>
//   );
// }




// import { useState, useEffect, useCallback, useMemo } from "react";
// import {
//   Box,
//   Button,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Typography,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   TextField,
//   IconButton,
//   Container,
//   Grid,
//   useTheme,
//   useMediaQuery,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   FormHelperText,
//   CircularProgress,
//   TablePagination,
//   InputAdornment,
//   Skeleton, // Import Skeleton for loading states
// } from "@mui/material";
// import {
//   Add as AddIcon,
//   Edit as EditIcon,
//   Delete as DeleteIcon,
//   Close as CloseIcon,
//   Search as SearchIcon, // Import SearchIcon
// } from "@mui/icons-material";
// import axiosInstance from "../../utils/axiosInstance";
// import Swal from "sweetalert2"; // Import SweetAlert2

// const initialHubState = {
//   employee_hub_id: null,
//   employee_hub_name: "",
//   state_id: "",
// };

// // Define the color theme for consistency
// const THEME_COLORS = {
//   primary: "#8C257C",
//   primaryDark: "#6d1d60",
//   secondary: "#F58E35",
//   textOnPrimary: "#FFFFFF",
//   cancel: "#757575",
// };

// export default function EmployeeHubPanel() {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

//   const [employeeHubs, setEmployeeHubs] = useState([]);
//   const [allStates, setAllStates] = useState([]);
//   const [loading, setLoading] = useState({
//     table: false,
//     form: false,
//     delete: false,
//   });
//   const [dialogState, setDialogState] = useState({
//     open: false,
//     editMode: false,
//     currentHub: initialHubState,
//   });
//   const [errors, setErrors] = useState({});

//   // --- State for pagination and search ---
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5); // Default to 5
//   const [searchTerm, setSearchTerm] = useState("");

//   const showNotification = (title, text, icon) => {
//     Swal.fire({
//       title,
//       text,
//       icon,
//       timer: 3000,
//       showConfirmButton: false,
//     });
//   };

//   const fetchData = useCallback(async () => {
//     setLoading((prev) => ({ ...prev, table: true }));
//     try {
//       const [hubsResponse, statesResponse] = await Promise.all([
//         axiosInstance.get("api/employee_hub/"),
//         axiosInstance.get("api/state_dropdown/"),
//       ]);

//       const hubData = Array.isArray(hubsResponse.data)
//         ? hubsResponse.data
//         : hubsResponse.data.data || [];

//       const sortedHubs = hubData.sort(
//         (a, b) => new Date(b.created_at) - new Date(a.created_at)
//       );
//       setEmployeeHubs(sortedHubs);

//       const statesData = Array.isArray(statesResponse.data)
//         ? statesResponse.data
//         : statesResponse.data.data || [];
//       setAllStates(statesData);
//     } catch (err) {
//       console.error("Failed to fetch data:", err);
//       showNotification("Error", "Failed to load data. Please try again.", "error");
//     } finally {
//       setLoading((prev) => ({ ...prev, table: false }));
//     }
//   }, []);

//   useEffect(() => {
//     fetchData();
//   }, [fetchData]);

//   // --- Handlers for pagination and search ---
//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleRowsPerPageChange = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const handleSearchChange = (event) => {
//     setSearchTerm(event.target.value);
//     setPage(0);
//   };

//   const handleAddClick = () => {
//     setDialogState({
//       open: true,
//       editMode: false,
//       currentHub: initialHubState,
//     });
//     setErrors({});
//   };

//   const handleEditClick = (hub) => {
//     setDialogState({
//       open: true,
//       editMode: true,
//       currentHub: {
//         employee_hub_id: hub.employee_hub_id,
//         employee_hub_name: hub.employee_hub_name,
//         state_id: hub.state_id,
//       },
//     });
//     setErrors({});
//   };

//   const handleCloseDialog = () => {
//     if (loading.form) return;
//     setDialogState((prev) => ({ ...prev, open: false }));
//     setErrors({});
//   };

//   const validateForm = () => {
//     const newErrors = {};
//     if (!dialogState.currentHub.state_id)
//       newErrors.state_id = "State is required";
//     if (!dialogState.currentHub.employee_hub_name.trim())
//       newErrors.employee_hub_name = "Employee Hub Name is required";
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async () => {
//     if (!validateForm()) return;
//     setLoading((prev) => ({ ...prev, form: true }));
//     try {
//       const payload = {
//         employee_hub_id: dialogState.currentHub.employee_hub_id,
//         state_id: dialogState.currentHub.state_id,
//         employee_hub_name: dialogState.currentHub.employee_hub_name,
//       };

//       if (dialogState.editMode) {
//         await axiosInstance.put("api/employee_hub/", payload);
//         showNotification("Success", "Employee hub updated successfully!", "success");
//       } else {
//         await axiosInstance.post("api/employee_hub/", payload);
//         showNotification("Success", "Employee hub created successfully!", "success");
//       }

//       await fetchData();
//       handleCloseDialog();
//     } catch (err) {
//       console.error("Save error:", err);
//       showNotification(
//         "Error",
//         err.response?.data?.message || "Failed to save. Please try again.",
//         "error"
//       );
//     } finally {
//       setLoading((prev) => ({ ...prev, form: false }));
//     }
//   };

//   const handleDelete = async (hubId) => {
//     const result = await Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: THEME_COLORS.primary,
//       cancelButtonColor: THEME_COLORS.cancel,
//       confirmButtonText: "Yes, delete it!",
//     });

//     if (result.isConfirmed) {
//       setLoading((prev) => ({ ...prev, delete: true }));
//       try {
//         await axiosInstance.delete("api/employee_hub/", {
//           data: { employee_hub_id: hubId },
//         });
//         showNotification("Deleted!", "Employee hub has been deleted.", "success");
//         await fetchData();
//       } catch (err) {
//         console.error("Delete error:", err);
//         showNotification(
//           "Error",
//           err.response?.data?.message || "Failed to delete. Please try again.",
//           "error"
//         );
//       } finally {
//         setLoading((prev) => ({ ...prev, delete: false }));
//       }
//     }
//   };

//   const handleInputChange = (field, value) => {
//     setDialogState((prev) => ({
//       ...prev,
//       currentHub: { ...prev.currentHub, [field]: value },
//     }));
//     if (errors[field]) {
//       setErrors((prev) => ({ ...prev, [field]: "" }));
//     }
//   };

//   const filteredData = useMemo(() => {
//     if (!searchTerm) {
//       return employeeHubs;
//     }
//     const lowercasedFilter = searchTerm.toLowerCase();
//     return employeeHubs.filter(
//       (hub) =>
//         hub.employee_hub_name.toLowerCase().includes(lowercasedFilter) ||
//         (hub.state_name && hub.state_name.toLowerCase().includes(lowercasedFilter))
//     );
//   }, [employeeHubs, searchTerm]);

//   const paginatedData = filteredData.slice(
//     page * rowsPerPage,
//     page * rowsPerPage + rowsPerPage
//   );

//   const primaryButtonStyle = {
//     backgroundColor: THEME_COLORS.primary,
//     color: THEME_COLORS.textOnPrimary,
//     "&:hover": { backgroundColor: THEME_COLORS.primaryDark },
//   };

//   return (
//     <Container maxWidth="lg" sx={{ py: 4 }}>
//       <Box component={Paper} p={3}>
//         <Typography
//           variant="h4"
//           color={THEME_COLORS.primary}
//           fontWeight="bold"
//           mb={5 }
//         >
//           Employee Hub 
//         </Typography>

//         <Grid container spacing={2} sx={{ mb: 2 }}>
//           <Grid item xs={12} sm="auto">
//             <Button
//               variant="contained"
//               startIcon={<AddIcon />}
//               onClick={handleAddClick}
//               sx={primaryButtonStyle}
//             >
//               Add New
//             </Button>
//           </Grid>
//           <Grid item xs={12} sm>
//             <TextField
//               size="small"
//               placeholder="Search..."
//               value={searchTerm}
//               onChange={handleSearchChange}
//               fullWidth={isMobile}
//               InputProps={{
//                 startAdornment: (
//                   <InputAdornment position="start">
//                     <SearchIcon />
//                   </InputAdornment>
//                 ),
//               }}
//               sx={{
//                 width: isMobile ? "100%" : "auto",
//                 float: isMobile ? "none" : "right",
//               }}
//             />
//           </Grid>
//         </Grid>

//         <TableContainer sx={{ minWidth: '100%', whiteSpace: 'nowrap' }}>
//           <Table>
//             <TableHead sx={{ backgroundColor: THEME_COLORS.primary }}>
//               <TableRow>
//                 <TableCell sx={{ fontWeight: 'bold', color: THEME_COLORS.textOnPrimary }}>
//                   SR. NO.
//                 </TableCell>
//                 <TableCell sx={{ fontWeight: 'bold', color: THEME_COLORS.textOnPrimary }}>
//                   HOLIDAY HUB NAME
//                 </TableCell>
//                 <TableCell sx={{ fontWeight: 'bold', color: THEME_COLORS.textOnPrimary }}>
//                   STATE
//                 </TableCell>
//                 <TableCell sx={{ fontWeight: 'bold', color: THEME_COLORS.textOnPrimary }}>
//                   CREATED AT
//                 </TableCell>
//                 <TableCell align="center" sx={{ fontWeight: 'bold', color: THEME_COLORS.textOnPrimary }}>
//                   ACTIONS
//                 </TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {loading.table ? (
//                 Array.from(new Array(rowsPerPage)).map((_, index) => (
//                   <TableRow key={index}>
//                     <TableCell><Skeleton variant="text" /></TableCell>
//                     <TableCell><Skeleton variant="text" /></TableCell>
//                     <TableCell><Skeleton variant="text" /></TableCell>
//                     <TableCell><Skeleton variant="text" /></TableCell>
//                     <TableCell align="center">
//                       <Skeleton variant="rectangular" width={120} height={30} />
//                     </TableCell>
//                   </TableRow>
//                 ))
//               ) : paginatedData.length > 0 ? (
//                 paginatedData.map((hub, index) => (
//                   <TableRow key={hub.employee_hub_id} hover>
//                     <TableCell sx={{fontSize: '0.95rem'}}>{page * rowsPerPage + index + 1}</TableCell>
//                     <TableCell sx={{fontSize: '0.95rem'}}>{hub.employee_hub_name}</TableCell>
//                     <TableCell sx={{fontSize: '0.95rem'}}>{hub.state_name}</TableCell>
//                     <TableCell sx={{fontSize: '0.95rem'}}>
//                       {new Date(hub.created_at).toLocaleDateString()}
//                     </TableCell>
//                     <TableCell align="center">
//                       <Box display="flex" justifyContent="center" gap={0.5}>
//                         <IconButton
//                           onClick={() => handleEditClick(hub)}
//                           size="small"
//                           sx={{ color: THEME_COLORS.primary }}
//                         >
//                           <EditIcon />
//                         </IconButton>
//                         <IconButton
//                           onClick={() => handleDelete(hub.employee_hub_id)}
//                           color="error"
//                           size="small"
//                           disabled={loading.delete}
//                         >
//                           <DeleteIcon />
//                         </IconButton>
//                       </Box>
//                     </TableCell>
//                   </TableRow>
//                 ))
//               ) : (
//                 <TableRow>
//                   <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
//                     {searchTerm ? "No results found." : "No employee hubs found."}
//                   </TableCell>
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>

//         <Box
//           sx={{
//             display: 'flex',
//             flexDirection: isMobile ? 'column' : 'row',
//             justifyContent: 'space-between',
//             alignItems: 'center',
//             pt: 2,
//           }}
//         >
//           <Typography variant="body2" color="text.secondary" sx={{ mb: isMobile ? 2 : 0 }}>
//              Showing {paginatedData.length > 0 ? page * rowsPerPage + 1 : 0} to {page * rowsPerPage + paginatedData.length} of {filteredData.length} results
//           </Typography>
//           <TablePagination
//             rowsPerPageOptions={[5, 10, 15, 25]}
//             component="div"
//             count={filteredData.length}
//             rowsPerPage={rowsPerPage}
//             page={page}
//             onPageChange={handleChangePage}
//             onRowsPerPageChange={handleRowsPerPageChange}
//             sx={{
//               '& .MuiSvgIcon-root': {
//                 color: THEME_COLORS.primary,
//               },
//             }}
//           />
//         </Box>
//       </Box>

//       <Dialog open={dialogState.open} onClose={handleCloseDialog} fullWidth maxWidth="sm">
//         <DialogTitle sx={{ color: '#8C257C' , fontWeight: "bold", fontSize: '2rem' }}>
//           {dialogState.editMode ? "Edit" : "Add"} Employee Hub
//         </DialogTitle>
//         <DialogContent>
//           <Box component="form" sx={{ display: "flex", flexDirection: "column", gap: 3, pt: 1 }}>
//             <TextField
//               label="Employee Hub Name"
//               fullWidth
//               value={dialogState.currentHub.employee_hub_name}
//               onChange={(e) => handleInputChange("employee_hub_name", e.target.value)}
//               error={!!errors.employee_hub_name}
//               helperText={errors.employee_hub_name}
//               disabled={loading.form}
//             />
//             <FormControl fullWidth error={!!errors.state_id} disabled={loading.form}>
//               <InputLabel id="state-select-label">State</InputLabel>
//               <Select
//                 labelId="state-select-label"
//                 label="State"
//                 value={dialogState.currentHub.state_id}
//                 onChange={(e) => handleInputChange("state_id", e.target.value)}
//               >
//                 {allStates.map((state) => (
//                   <MenuItem key={state.state_id} value={state.state_id}>
//                     {state.state_name}
//                   </MenuItem>
//                 ))}
//               </Select>
//               {errors.state_id && <FormHelperText>{errors.state_id}</FormHelperText>}
//             </FormControl>
//           </Box>
//         </DialogContent>
//         <DialogActions sx={{ p: 3 }}>
//           <Button
//             onClick={handleCloseDialog}
//             disabled={loading.form}
//             sx={{ color: THEME_COLORS.cancel, '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)'} }}
//           >
//             Cancel
//           </Button>
//           <Button
//             variant="contained"
//             onClick={handleSubmit}
//             sx={primaryButtonStyle}
//             disabled={loading.form}
//           >
//             {loading.form ? (
//               <CircularProgress size={24} sx={{ color: THEME_COLORS.textOnPrimary }} />
//             ) : dialogState.editMode ? (
//               "Save"
//             ) : (
//               "Save"
//             )}
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Container>
//   );
// }








// import { useState, useEffect, useCallback, useMemo } from "react";
// import {
//   Box,
//   Button,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Typography,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   TextField,
//   IconButton,
//   Container,
//   Grid,
//   useTheme,
//   useMediaQuery,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   FormHelperText,
//   CircularProgress,
//   TablePagination,
//   InputAdornment,
//   Skeleton, // Import Skeleton for loading states
// } from "@mui/material";
// import {
//   Add as AddIcon,
//   Edit as EditIcon,
//   Delete as DeleteIcon,
//   Close as CloseIcon,
//   Search as SearchIcon, // Import SearchIcon
// } from "@mui/icons-material";
// import axiosInstance from "../../utils/axiosInstance";
// import Swal from "sweetalert2"; // SweetAlert2 is already imported

// const initialHubState = {
//   employee_hub_id: null,
//   employee_hub_name: "",
//   state_id: "",
// };

// // Define the color theme for consistency
// const THEME_COLORS = {
//   primary: "#8C257C",
//   primaryDark: "#6d1d60",
//   secondary: "#F58E35",
//   textOnPrimary: "#FFFFFF",
//   cancel: "#757575",
// };

// export default function EmployeeHubPanel() {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

//   const [employeeHubs, setEmployeeHubs] = useState([]);
//   const [allStates, setAllStates] = useState([]);
//   const [loading, setLoading] = useState({
//     table: false,
//     form: false,
//     delete: false,
//   });
//   const [dialogState, setDialogState] = useState({
//     open: false,
//     editMode: false,
//     currentHub: initialHubState,
//   });
//   const [errors, setErrors] = useState({});

//   // --- State for pagination and search ---
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5); // Default to 5
//   const [searchTerm, setSearchTerm] = useState("");

//   // --- MODIFIED Swal.fire Alert Function ---
//   // This function now creates an alert that the user must dismiss.
//   const showNotification = (title, text, icon) => {
//     Swal.fire({
//       title,
//       text,
//       icon,
//       confirmButtonColor: THEME_COLORS.primary, // Use theme color for the button
//     });
//   };

//   const fetchData = useCallback(async () => {
//     setLoading((prev) => ({ ...prev, table: true }));
//     try {
//       const [hubsResponse, statesResponse] = await Promise.all([
//         axiosInstance.get("api/employee_hub/"),
//         axiosInstance.get("api/state_dropdown/"),
//       ]);

//       const hubData = Array.isArray(hubsResponse.data)
//         ? hubsResponse.data
//         : hubsResponse.data.data || [];

//       const sortedHubs = hubData.sort(
//         (a, b) => new Date(b.created_at) - new Date(a.created_at)
//       );
//       setEmployeeHubs(sortedHubs);

//       const statesData = Array.isArray(statesResponse.data)
//         ? statesResponse.data
//         : statesResponse.data.data || [];
//       setAllStates(statesData);
//     } catch (err)
//      {
//       console.error("Failed to fetch data:", err);
//       // This will now trigger a persistent Swal alert on data fetch error
//       showNotification("Error", "Failed to load data. Please try again.", "error");
//     } finally {
//       setLoading((prev) => ({ ...prev, table: false }));
//     }
//   }, []);

//   useEffect(() => {
//     fetchData();
//   }, [fetchData]);

//   // --- Handlers for pagination and search ---
//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleRowsPerPageChange = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const handleSearchChange = (event) => {
//     setSearchTerm(event.target.value);
//     setPage(0);
//   };

//   const handleAddClick = () => {
//     setDialogState({
//       open: true,
//       editMode: false,
//       currentHub: initialHubState,
//     });
//     setErrors({});
//   };

//   const handleEditClick = (hub) => {
//     setDialogState({
//       open: true,
//       editMode: true,
//       currentHub: {
//         employee_hub_id: hub.employee_hub_id,
//         employee_hub_name: hub.employee_hub_name,
//         state_id: hub.state_id,
//       },
//     });
//     setErrors({});
//   };

//   const handleCloseDialog = () => {
//     if (loading.form) return;
//     setDialogState((prev) => ({ ...prev, open: false }));
//     setErrors({});
//   };

//   const validateForm = () => {
//     const newErrors = {};
//     if (!dialogState.currentHub.state_id)
//       newErrors.state_id = "State is required";
//     if (!dialogState.currentHub.employee_hub_name.trim())
//       newErrors.employee_hub_name = "Employee Hub Name is required";
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   // --- handleSubmit already uses Swal.fire for ADD and EDIT ---
//   const handleSubmit = async () => {
//     if (!validateForm()) return;
//     setLoading((prev) => ({ ...prev, form: true }));
//     try {
//       const payload = {
//         employee_hub_id: dialogState.currentHub.employee_hub_id,
//         state_id: dialogState.currentHub.state_id,
//         employee_hub_name: dialogState.currentHub.employee_hub_name,
//       };

//       if (dialogState.editMode) {
//         await axiosInstance.put("api/employee_hub/", payload);
//         showNotification("Success", "Employee hub updated successfully!", "success");
//       } else {
//         await axiosInstance.post("api/employee_hub/", payload);
//         showNotification("Success", "Employee hub created successfully!", "success");
//       }

//       await fetchData();
//       handleCloseDialog();
//     } catch (err) {
//       console.error("Save error:", err);
//       showNotification(
//         "Error",
//         err.response?.data?.message || "Failed to save. Please try again.",
//         "error"
//       );
//     } finally {
//       setLoading((prev) => ({ ...prev, form: false }));
//     }
//   };

//   // --- handleDelete already uses Swal.fire for DELETE confirmation and result ---
//   const handleDelete = async (hubId) => {
//     const result = await Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: THEME_COLORS.primary,
//       cancelButtonColor: THEME_COLORS.cancel,
//       confirmButtonText: "Yes, delete it!",
//     });

//     if (result.isConfirmed) {
//       setLoading((prev) => ({ ...prev, delete: true }));
//       try {
//         await axiosInstance.delete("api/employee_hub/", {
//           data: { employee_hub_id: hubId },
//         });
//         showNotification("Deleted!", "Employee hub has been deleted.", "success");
//         await fetchData();
//       } catch (err) {
//         console.error("Delete error:", err);
//         showNotification(
//           "Error",
//           err.response?.data?.message || "Failed to delete. Please try again.",
//           "error"
//         );
//       } finally {
//         setLoading((prev) => ({ ...prev, delete: false }));
//       }
//     }
//   };

//   const handleInputChange = (field, value) => {
//     setDialogState((prev) => ({
//       ...prev,
//       currentHub: { ...prev.currentHub, [field]: value },
//     }));
//     if (errors[field]) {
//       setErrors((prev) => ({ ...prev, [field]: "" }));
//     }
//   };

//   const filteredData = useMemo(() => {
//     if (!searchTerm) {
//       return employeeHubs;
//     }
//     const lowercasedFilter = searchTerm.toLowerCase();
//     return employeeHubs.filter(
//       (hub) =>
//         hub.employee_hub_name.toLowerCase().includes(lowercasedFilter) ||
//         (hub.state_name && hub.state_name.toLowerCase().includes(lowercasedFilter))
//     );
//   }, [employeeHubs, searchTerm]);

//   const paginatedData = filteredData.slice(
//     page * rowsPerPage,
//     page * rowsPerPage + rowsPerPage
//   );

//   const primaryButtonStyle = {
//     backgroundColor: THEME_COLORS.primary,
//     color: THEME_COLORS.textOnPrimary,
//     "&:hover": { backgroundColor: THEME_COLORS.primaryDark },
//   };

//   return (
//     <Container maxWidth="lg" sx={{ py: 4 }}>
//       <Box component={Paper} p={3}>
//         <Typography
//           variant="h4"
//           color={THEME_COLORS.primary}
//           fontWeight="bold"
//           mb={5}
//         >
//           Employee Hub
//         </Typography>

//         <Grid container spacing={2} sx={{ mb: 2 }}>
//           <Grid item xs={12} sm="auto">
//             <Button
//               variant="contained"
//               startIcon={<AddIcon />}
//               onClick={handleAddClick}
//               sx={primaryButtonStyle}
//             >
//               Add New
//             </Button>
//           </Grid>
//           <Grid item xs={12} sm>
//             <TextField
//               size="small"
//               placeholder="Search..."
//               value={searchTerm}
//               onChange={handleSearchChange}
//               fullWidth={isMobile}
//               InputProps={{
//                 startAdornment: (
//                   <InputAdornment position="start">
//                     <SearchIcon />
//                   </InputAdornment>
//                 ),
//               }}
//               sx={{
//                 width: isMobile ? "100%" : "auto",
//                 float: isMobile ? "none" : "right",
//               }}
//             />
//           </Grid>
//         </Grid>

//         <TableContainer sx={{ minWidth: '100%', whiteSpace: 'nowrap' }}>
//           <Table>
//             <TableHead sx={{ backgroundColor: THEME_COLORS.primary }}>
//               <TableRow>
//                 <TableCell sx={{ fontWeight: 'bold', color: THEME_COLORS.textOnPrimary }}>
//                   SR. NO.
//                 </TableCell>
//                 <TableCell sx={{ fontWeight: 'bold', color: THEME_COLORS.textOnPrimary }}>
//                   HOLIDAY HUB NAME
//                 </TableCell>
//                 <TableCell sx={{ fontWeight: 'bold', color: THEME_COLORS.textOnPrimary }}>
//                   STATE
//                 </TableCell>
//                 <TableCell sx={{ fontWeight: 'bold', color: THEME_COLORS.textOnPrimary }}>
//                   CREATED AT
//                 </TableCell>
//                 <TableCell align="center" sx={{ fontWeight: 'bold', color: THEME_COLORS.textOnPrimary }}>
//                   ACTIONS
//                 </TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {loading.table ? (
//                 Array.from(new Array(rowsPerPage)).map((_, index) => (
//                   <TableRow key={index}>
//                     <TableCell><Skeleton variant="text" /></TableCell>
//                     <TableCell><Skeleton variant="text" /></TableCell>
//                     <TableCell><Skeleton variant="text" /></TableCell>
//                     <TableCell><Skeleton variant="text" /></TableCell>
//                     <TableCell align="center">
//                       <Skeleton variant="rectangular" width={120} height={30} />
//                     </TableCell>
//                   </TableRow>
//                 ))
//               ) : paginatedData.length > 0 ? (
//                 paginatedData.map((hub, index) => (
//                   <TableRow key={hub.employee_hub_id} hover>
//                     <TableCell sx={{ fontSize: '0.95rem' }}>{page * rowsPerPage + index + 1}</TableCell>
//                     <TableCell sx={{ fontSize: '0.95rem' }}>{hub.employee_hub_name}</TableCell>
//                     <TableCell sx={{ fontSize: '0.95rem' }}>{hub.state_name}</TableCell>
//                     <TableCell sx={{ fontSize: '0.95rem' }}>
//                       {new Date(hub.created_at).toLocaleDateString()}
//                     </TableCell>
//                     <TableCell align="center">
//                       <Box display="flex" justifyContent="center" gap={0.5}>
//                         <IconButton
//                           onClick={() => handleEditClick(hub)}
//                           size="small"
//                           sx={{ color: THEME_COLORS.primary }}
//                         >
//                           <EditIcon />
//                         </IconButton>
//                         <IconButton
//                           onClick={() => handleDelete(hub.employee_hub_id)}
//                           color="error"
//                           size="small"
//                           disabled={loading.delete}
//                         >
//                           <DeleteIcon />
//                         </IconButton>
//                       </Box>
//                     </TableCell>
//                   </TableRow>
//                 ))
//               ) : (
//                 <TableRow>
//                   <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
//                     {searchTerm ? "No results found." : "No employee hubs found."}
//                   </TableCell>
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>

//         <Box
//           sx={{
//             display: 'flex',
//             flexDirection: isMobile ? 'column' : 'row',
//             justifyContent: 'space-between',
//             alignItems: 'center',
//             pt: 2,
//           }}
//         >
//           <Typography variant="body2" color="text.secondary" sx={{ mb: isMobile ? 2 : 0 }}>
//             Showing {paginatedData.length > 0 ? page * rowsPerPage + 1 : 0} to {page * rowsPerPage + paginatedData.length} of {filteredData.length} results
//           </Typography>
//           <TablePagination
//             rowsPerPageOptions={[5, 10, 15, 25]}
//             component="div"
//             count={filteredData.length}
//             rowsPerPage={rowsPerPage}
//             page={page}
//             onPageChange={handleChangePage}
//             onRowsPerPageChange={handleRowsPerPageChange}
//             sx={{
//               '& .MuiSvgIcon-root': {
//                 color: THEME_COLORS.primary,
//               },
//             }}
//           />
//         </Box>
//       </Box>

//       <Dialog open={dialogState.open} onClose={handleCloseDialog} fullWidth maxWidth="sm">
//         <DialogTitle sx={{ color: '#8C257C', fontWeight: "bold", fontSize: '2rem' }}>
//           {dialogState.editMode ? "Edit" : "Add"} Employee Hub
//         </DialogTitle>
//         <DialogContent>
//           <Box component="form" sx={{ display: "flex", flexDirection: "column", gap: 3, pt: 1 }}>
//             <TextField
//               label="Employee Hub Name"
//               fullWidth
//               value={dialogState.currentHub.employee_hub_name}
//               onChange={(e) => handleInputChange("employee_hub_name", e.target.value)}
//               error={!!errors.employee_hub_name}
//               helperText={errors.employee_hub_name}
//               disabled={loading.form}
//             />
//             <FormControl fullWidth error={!!errors.state_id} disabled={loading.form}>
//               <InputLabel id="state-select-label">State</InputLabel>
//               <Select
//                 labelId="state-select-label"
//                 label="State"
//                 value={dialogState.currentHub.state_id}
//                 onChange={(e) => handleInputChange("state_id", e.target.value)}
//               >
//                 {allStates.map((state) => (
//                   <MenuItem key={state.state_id} value={state.state_id}>
//                     {state.state_name}
//                   </MenuItem>
//                 ))}
//               </Select>
//               {errors.state_id && <FormHelperText>{errors.state_id}</FormHelperText>}
//             </FormControl>
//           </Box>
//         </DialogContent>
//         <DialogActions sx={{ p: 3 }}>
//           <Button
//             onClick={handleCloseDialog}
//             disabled={loading.form}
//             sx={{ color: THEME_COLORS.cancel, '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' } }}
//           >
//             Cancel
//           </Button>
//           <Button
//             variant="contained"
//             onClick={handleSubmit}
//             sx={primaryButtonStyle}
//             disabled={loading.form}
//           >
//             {loading.form ? (
//               <CircularProgress size={24} sx={{ color: THEME_COLORS.textOnPrimary }} />
//             ) : (
//               "Save"
//             )}
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Container>
//   );
// } 





import { useState, useEffect, useCallback, useMemo } from "react";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Container,
  Grid,
  useTheme,
  useMediaQuery,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  CircularProgress,
  InputAdornment,
  Skeleton,
  Pagination, // Added import
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Close as CloseIcon,
  Search as SearchIcon,
} from "@mui/icons-material";
import axiosInstance from "../../utils/axiosInstance";
import Swal from "sweetalert2";

const initialHubState = {
  employee_hub_id: null,
  employee_hub_name: "",
  state_id: "",
};

// Define the color theme for consistency
const THEME_COLORS = {
  primary: "#8C257C",
  primaryDark: "#6d1d60",
  secondary: "#F58E35",
  textOnPrimary: "#FFFFFF",
  cancel: "#757575",
};

export default function EmployeeHubPanel() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [employeeHubs, setEmployeeHubs] = useState([]);
  const [allStates, setAllStates] = useState([]);
  const [loading, setLoading] = useState({
    table: false,
    form: false,
    delete: false,
  });
  const [dialogState, setDialogState] = useState({
    open: false,
    editMode: false,
    currentHub: initialHubState,
  });
  const [errors, setErrors] = useState({});

  // --- State for pagination and search ---
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");

  const showNotification = (title, text, icon) => {
    // ... (function remains the same)
    Swal.fire({
      title,
      text,
      icon,
      confirmButtonColor: THEME_COLORS.primary,
    });
  };

  const fetchData = useCallback(async () => {
    // ... (function remains the same)
     setLoading((prev) => ({ ...prev, table: true }));
    try {
      const [hubsResponse, statesResponse] = await Promise.all([
        axiosInstance.get("api/employee_hub/"),
        axiosInstance.get("api/state_dropdown/"),
      ]);

      const hubData = Array.isArray(hubsResponse.data)
        ? hubsResponse.data
        : hubsResponse.data.data || [];

      const sortedHubs = hubData.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
      setEmployeeHubs(sortedHubs);

      const statesData = Array.isArray(statesResponse.data)
        ? statesResponse.data
        : statesResponse.data.data || [];
      setAllStates(statesData);
    } catch (err)
     {
      console.error("Failed to fetch data:", err);
      showNotification("Error", "Failed to load data. Please try again.", "error");
    } finally {
      setLoading((prev) => ({ ...prev, table: false }));
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // --- Handlers for pagination and search ---
  const handlePaginationChange = (event, newPage) => {
    setPage(newPage - 1);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(0);
  };

  const handleAddClick = () => {
    // ... (function remains the same)
     setDialogState({
      open: true,
      editMode: false,
      currentHub: initialHubState,
    });
    setErrors({});
  };

  const handleEditClick = (hub) => {
    // ... (function remains the same)
    setDialogState({
      open: true,
      editMode: true,
      currentHub: {
        employee_hub_id: hub.employee_hub_id,
        employee_hub_name: hub.employee_hub_name,
        state_id: hub.state_id,
      },
    });
    setErrors({});
  };

  const handleCloseDialog = () => {
    // ... (function remains the same)
    if (loading.form) return;
    setDialogState((prev) => ({ ...prev, open: false }));
    setErrors({});
  };

  const validateForm = () => {
    // ... (function remains the same)
    const newErrors = {};
    if (!dialogState.currentHub.state_id)
      newErrors.state_id = "State is required";
    if (!dialogState.currentHub.employee_hub_name.trim())
      newErrors.employee_hub_name = "holiday Hub Name is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    // ... (function remains the same)
    if (!validateForm()) return;
    setLoading((prev) => ({ ...prev, form: true }));
    try {
      const payload = {
        employee_hub_id: dialogState.currentHub.employee_hub_id,
        state_id: dialogState.currentHub.state_id,
        employee_hub_name: dialogState.currentHub.employee_hub_name,
      };

      if (dialogState.editMode) {
        await axiosInstance.put("api/employee_hub/", payload);
        showNotification("Success", "holiday hub updated successfully!", "success");
      } else {
        await axiosInstance.post("api/employee_hub/", payload);
        showNotification("Success", "holiday hub created successfully!", "success");
      }

      await fetchData();
      handleCloseDialog();
    } catch (err) {
      console.error("Save error:", err);
      showNotification(
        "Error",
        err.response?.data?.message || "Failed to save. Please try again.",
        "error"
      );
    } finally {
      setLoading((prev) => ({ ...prev, form: false }));
    }
  };

  const handleDelete = async (hubId) => {
    // ... (function remains the same)
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: THEME_COLORS.primary,
      cancelButtonColor: THEME_COLORS.cancel,
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      setLoading((prev) => ({ ...prev, delete: true }));
      try {
        await axiosInstance.delete("api/employee_hub/", {
          data: { employee_hub_id: hubId },
        });
        showNotification("Deleted!", "holiday hub has been deleted.", "success");
        await fetchData();
      } catch (err) {
        console.error("Delete error:", err);
        showNotification(
          "Error",
          err.response?.data?.message || "Failed to delete. Please try again.",
          "error"
        );
      } finally {
        setLoading((prev) => ({ ...prev, delete: false }));
      }
    }
  };

  const handleInputChange = (field, value) => {
    // ... (function remains the same)
    setDialogState((prev) => ({
      ...prev,
      currentHub: { ...prev.currentHub, [field]: value },
    }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const filteredData = useMemo(() => {
    if (!searchTerm) {
      return employeeHubs;
    }
    const lowercasedFilter = searchTerm.toLowerCase();
    return employeeHubs.filter(
      (hub) =>
        hub.employee_hub_name.toLowerCase().includes(lowercasedFilter) ||
        (hub.state_name && hub.state_name.toLowerCase().includes(lowercasedFilter))
    );
  }, [employeeHubs, searchTerm]);

  const paginatedData = filteredData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const startEntry = filteredData.length > 0 ? page * rowsPerPage + 1 : 0;
  const endEntry = Math.min((page + 1) * rowsPerPage, filteredData.length);

  const primaryButtonStyle = {
    backgroundColor: THEME_COLORS.primary,
    color: THEME_COLORS.textOnPrimary,
    "&:hover": { backgroundColor: THEME_COLORS.primaryDark },
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box component={Paper} p={3}>
        <Typography
          variant="h4"
          color={THEME_COLORS.primary}
          fontWeight="bold"
          mb={5}
        >
          Holiday Hub
        </Typography>
        
        {/* ... (Header and search bar remain the same) */}
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} sm="auto">
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleAddClick}
              sx={primaryButtonStyle}
            >
              Add New
            </Button>
          </Grid>
          <Grid item xs={12} sm>
            <TextField
              size="small"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearchChange}
              fullWidth={isMobile}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              sx={{
                width: isMobile ? "100%" : "auto",
                float: isMobile ? "none" : "right",
              }}
            />
          </Grid>
        </Grid>

        <TableContainer sx={{ minWidth: '100%', whiteSpace: 'nowrap' }}>
          <Table>
            <TableHead sx={{ backgroundColor: THEME_COLORS.primary }}>
               {/* ... (Table head remains the same) */}
               <TableRow>
                <TableCell sx={{ fontWeight: 'bold', color: THEME_COLORS.textOnPrimary }}>
                  SR. NO.
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: THEME_COLORS.textOnPrimary }}>
                  HOLIDAY HUB 
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: THEME_COLORS.textOnPrimary }}>
                  STATE
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: THEME_COLORS.textOnPrimary }}>
                  CREATED AT
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold', color: THEME_COLORS.textOnPrimary }}>
                  ACTIONS
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading.table ? (
                Array.from(new Array(rowsPerPage)).map((_, index) => (
                  <TableRow key={index}>
                    <TableCell><Skeleton variant="text" /></TableCell>
                    <TableCell><Skeleton variant="text" /></TableCell>
                    <TableCell><Skeleton variant="text" /></TableCell>
                    <TableCell><Skeleton variant="text" /></TableCell>
                    <TableCell align="center">
                      <Skeleton variant="rectangular" width={120} height={30} />
                    </TableCell>
                  </TableRow>
                ))
              ) : paginatedData.length > 0 ? (
                paginatedData.map((hub, index) => (
                  <TableRow key={hub.employee_hub_id} hover>
                    <TableCell sx={{ fontSize: '0.95rem' }}>{page * rowsPerPage + index + 1}</TableCell>
                    <TableCell sx={{ fontSize: '0.95rem' }}>{hub.employee_hub_name}</TableCell>
                    <TableCell sx={{ fontSize: '0.95rem' }}>{hub.state_name}</TableCell>
                    <TableCell sx={{ fontSize: '0.95rem' }}>
                      {new Date(hub.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell align="center">
                      <Box display="flex" justifyContent="center" gap={0.5}>
                        <IconButton
                          onClick={() => handleEditClick(hub)}
                          size="small"
                          sx={{ color: THEME_COLORS.primary }}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          onClick={() => handleDelete(hub.employee_hub_id)}
                          color="error"
                          size="small"
                          disabled={loading.delete}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
                    {searchTerm ? "No results found." : "No holiday hubs found."}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* START: New Styled Pagination */}
        <Box sx={{ p: 2, borderTop: '1px solid rgba(224, 224, 224, 1)' }}>
          {loading.table ? (
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Skeleton variant="text" width={200} />
                  <Skeleton variant="rectangular" width={300} height={40} />
              </Box>
          ) : (
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <FormControl variant="outlined" size="small">
                          <Select
                              value={rowsPerPage}
                              onChange={handleChangeRowsPerPage}
                              sx={{
                                  backgroundColor: THEME_COLORS.primary,
                                  color: 'white',
                                  borderRadius: '4px',
                                  '&:hover': { backgroundColor: THEME_COLORS.primaryDark },
                                  '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                                  '& .MuiSvgIcon-root': { color: 'white' },
                              }}
                          >
                              {[5, 10, 15, 25].map((value) => ( <MenuItem key={value} value={value}>{value}</MenuItem> ))}
                          </Select>
                      </FormControl>
                      <Typography variant="body2" color="text.secondary">
                         {`Showing ${startEntry} to ${endEntry} of ${filteredData.length} results`}
                      </Typography>
                  </Box>
                  <Pagination
                      count={Math.ceil(filteredData.length / rowsPerPage)}
                      page={page + 1}
                      onChange={handlePaginationChange}
                      showFirstButton showLastButton
                      sx={{
                          '& .MuiPaginationItem-root:hover': { backgroundColor: THEME_COLORS.secondary, color: 'white' },
                          '& .MuiPaginationItem-page': {
                              color: THEME_COLORS.primary,
                              '&.Mui-selected': {
                                  backgroundColor: THEME_COLORS.primary,
                                  color: 'white',
                                  '&:hover': { backgroundColor: THEME_COLORS.secondary }
                              },
                          },
                           '& .MuiPaginationItem-icon': { color: THEME_COLORS.primary }
                      }}
                  />
              </Box>
          )}
        </Box>
        {/* END: New Styled Pagination */}
      </Box>

      <Dialog open={dialogState.open} onClose={handleCloseDialog} fullWidth maxWidth="sm">
        {/* ... (Dialog content remains the same) */}
        <DialogTitle sx={{ color: '#8C257C', fontWeight: "bold", fontSize: '2rem' }}>
          {dialogState.editMode ? "Edit" : "Add"} Holiday Hub
        </DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ display: "flex", flexDirection: "column", gap: 3, pt: 1 }}>
            <TextField
              label="Holiday Hub Name"
              fullWidth
              value={dialogState.currentHub.employee_hub_name}
              onChange={(e) => handleInputChange("employee_hub_name", e.target.value)}
              error={!!errors.employee_hub_name}
              helperText={errors.employee_hub_name}
              disabled={loading.form}
            />
            <FormControl fullWidth error={!!errors.state_id} disabled={loading.form}>
              <InputLabel id="state-select-label">State</InputLabel>
              <Select
                labelId="state-select-label"
                label="State"
                value={dialogState.currentHub.state_id}
                onChange={(e) => handleInputChange("state_id", e.target.value)}
              >
                {allStates.map((state) => (
                  <MenuItem key={state.state_id} value={state.state_id}>
                    {state.state_name}
                  </MenuItem>
                ))}
              </Select>
              {errors.state_id && <FormHelperText>{errors.state_id}</FormHelperText>}
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button
            onClick={handleCloseDialog}
            disabled={loading.form}
            sx={{ color: THEME_COLORS.cancel, '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' } }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            sx={primaryButtonStyle}
            disabled={loading.form}
          >
            {loading.form ? (
              <CircularProgress size={24} sx={{ color: THEME_COLORS.textOnPrimary }} />
            ) : (
              "Save"
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}