// // import React, { useState, useEffect, useCallback, useMemo } from 'react';
// // import {
// //   ThemeProvider,
// //   createTheme,
// //   Box,
// //   Paper,
// //   Typography,
// //   Button,
// //   IconButton,
// //   TextField,
// //   Select,
// //   MenuItem,
// //   InputLabel,
// //   FormControl,
// //   Dialog,
// //   DialogTitle,
// //   DialogContent,
// //   DialogActions,
// //   Table,
// //   TableBody,
// //   TableCell,
// //   TableContainer,
// //   TableHead,
// //   TableRow,
// //   Grid,
// //   Chip,
// //   Avatar,
// //   Divider,
// //   // TextareaAutosize, // Not used
// //   CssBaseline,
// //   InputAdornment,
// //   // FormHelperText, // Not used
// //   CircularProgress,
// //   TableSortLabel,
// // } from '@mui/material';
// // // import AddIcon from '@mui/icons-material/Add'; // Not used
// // // import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'; // Not used
// // // import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'; // Not used
// // import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
// // import PersonIcon from '@mui/icons-material/Person';
// // import SortIcon from '@mui/icons-material/Sort'; // Kept as per original, though TableSortLabel is better
// // // import CloseIcon from '@mui/icons-material/Close'; // Not used
// // import FileDownloadIcon from '@mui/icons-material/FileDownload';

// // // API Configuration
// // const API_BASE_URL = 'https://tdtlworld.com/hrms-backend/api';
// // const EXIT_TYPE_API_URL = `${API_BASE_URL}/exit-type/`;

// // // Create theme
// // const theme = createTheme({
// //   palette: {
// //     primary: {
// //       main: '#7c4dff',
// //     },
// //     secondary: {
// //       main: '#f50057',
// //     },
// //     background: {
// //       default: '#f5f5f9',
// //     },
// //   },
// //   components: {
// //     MuiTableCell: {
// //       styleOverrides: {
// //         head: {
// //           fontWeight: 'bold',
// //           backgroundColor: '#f5f5f5',
// //         },
// //       },
// //     },
// //   },
// // });

// // const formatDate = (dateString) => {
// //     if (!dateString) return 'N/A';
// //     try {
// //       const date = new Date(dateString);
// //       if (isNaN(date.getTime())) {
// //         // Try to parse if it's like "YYYY-MM-DD HH:MM:SS"
// //         const parts = dateString.split(/[- :]/);
// //         if (parts.length >= 3) {
// //             const year = parseInt(parts[0], 10);
// //             const month = parseInt(parts[1], 10) -1; // Month is 0-indexed
// //             const day = parseInt(parts[2], 10);
// //             const newDate = new Date(year, month, day);
// //             if (!isNaN(newDate.getTime())) {
// //                 const d = String(newDate.getDate()).padStart(2, '0');
// //                 const m = String(newDate.getMonth() + 1).padStart(2, '0');
// //                 const y = newDate.getFullYear();
// //                 return `${d}/${m}/${y}`;
// //             }
// //         }
// //         return dateString; // Return original if invalid or complex format
// //       }
// //       const day = String(date.getDate()).padStart(2, '0');
// //       const month = String(date.getMonth() + 1).padStart(2, '0');
// //       const year = date.getFullYear();
// //       return `${day}/${month}/${year}`;
// //     } catch (e) {
// //       console.error("Error formatting date:", e, "Original date:", dateString);
// //       return dateString;
// //     }
// //   };


// // function EmployeeExitManagement() {
// //   // State for employee exits (remains static as per prompt)
// //   const [employeeExits, setEmployeeExits] = useState([
// //     {
// //       id: 1,
// //       employee: {
// //         name: 'Avinash Raut',
// //         email: 'avinash.raut@tdtl.world',
// //         avatar: '/user-image.png' // Ensure this path is correct or use a placeholder
// //       },
// //       exitType: 'Involuntary',
// //       exitDate: '20/06/2023',
// //       exitInterview: 'Yes',
// //       disableAccount: 'No',
// //       status: 'Approved',
// //       description: ''
// //     },
// //     {
// //       id: 2,
// //       employee: {
// //         name: 'Hitesh Zhambare',
// //         email: 'hitesh.zhambare@tdtl.world',
// //         avatar: '/user-image.png' // Ensure this path is correct or use a placeholder
// //       },
// //       exitType: 'Retirement',
// //       exitDate: '29/06/2023',
// //       exitInterview: 'Yes',
// //       disableAccount: 'Yes',
// //       status: 'Pending',
// //       description: ''
// //     }
// //   ]);

// //   // State for exit types (will be fetched from API)
// //   const [exitTypes, setExitTypes] = useState([]);
// //   const [loadingExitTypes, setLoadingExitTypes] = useState(true);
// //   const [exitTypesError, setExitTypesError] = useState(null);
// //   const [submittingExitType, setSubmittingExitType] = useState(false);
// //   const [submitExitTypeError, setSubmitExitTypeError] = useState(null);
// //   const [exitTypeSortConfig, setExitTypeSortConfig] = useState({ key: 'name', direction: 'asc' });


// //   // State for dialogs
// //   const [openAddExitDialog, setOpenAddExitDialog] = useState(false);
// //   const [openAddExitTypeDialog, setOpenAddExitTypeDialog] = useState(false);

// //   // State for pagination (Employee Exits)
// //   const [page, setPage] = useState(0);
// //   const [rowsPerPage, setRowsPerPage] = useState(10);
  
// //   // State for pagination (Exit Types)
// //   const [exitTypePage, setExitTypePage] = useState(0);
// //   const [exitTypeRowsPerPage, setExitTypeRowsPerPage] = useState(10);

// //   // State for search
// //   const [searchTerm, setSearchTerm] = useState('');
// //   const [exitTypeSearchTerm, setExitTypeSearchTerm] = useState('');

// //   // State for new employee exit form
// //   const [newEmployeeExit, setNewEmployeeExit] = useState({
// //     employee: '',
// //     exitDate: '',
// //     exitType: '',
// //     exitInterview: 'Yes',
// //     disableAccount: 'Yes',
// //     description: '',
// //     file: null
// //   });

// //   // State for new exit type form
// //   const [newExitType, setNewExitType] = useState('');

// //   // Fetch Exit Types from API
// //   const fetchExitTypes = useCallback(async () => {
// //     setLoadingExitTypes(true);
// //     setExitTypesError(null);
// //     try {
// //       const response = await fetch(EXIT_TYPE_API_URL);
// //       if (!response.ok) {
// //         throw new Error(`HTTP error! status: ${response.status}`);
// //       }
// //       const data = await response.json();
// //       // Assuming API returns array of { value, label, created_at } or { id, name, created_at }
// //       const transformedData = data.map(item => ({
// //         id: item.id || item.value,
// //         name: item.name || item.label,
// //         createdAt: formatDate(item.created_at),
// //       }));
// //       setExitTypes(transformedData);
// //     } catch (error) {
// //       console.error("Failed to fetch exit types:", error);
// //       setExitTypesError(error.message);
// //     } finally {
// //       setLoadingExitTypes(false);
// //     }
// //   }, []);

// //   useEffect(() => {
// //     fetchExitTypes();
// //   }, [fetchExitTypes]);


// //   // Handle pagination change
// //   const handleChangePage = (event, newPage) => {
// //     setPage(newPage);
// //   };

// //   const handleChangeRowsPerPage = (event) => {
// //     setRowsPerPage(parseInt(event.target.value, 10));
// //     setPage(0);
// //   };

// //   // Handle exit type pagination change
// //   const handleExitTypeChangePage = (event, newPage) => {
// //     setExitTypePage(newPage);
// //   };

// //   const handleExitTypeChangeRowsPerPage = (event) => {
// //     setExitTypeRowsPerPage(parseInt(event.target.value, 10));
// //     setExitTypePage(0);
// //   };

// //   // Handle search
// //   const handleSearch = (e) => {
// //     setSearchTerm(e.target.value);
// //     setPage(0); // Reset page on search
// //   };

// //   const handleExitTypeSearch = (e) => {
// //     setExitTypeSearchTerm(e.target.value);
// //     setExitTypePage(0); // Reset page on search
// //   };

// //   // Handle form changes for employee exit
// //   const handleEmployeeExitChange = (field, value) => {
// //     setNewEmployeeExit({
// //       ...newEmployeeExit,
// //       [field]: value
// //     });
// //   };

// //   // Handle file upload
// //   const handleFileUpload = (e) => {
// //     const file = e.target.files[0];
// //     if (file) {
// //       if (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif') {
// //         setNewEmployeeExit({
// //           ...newEmployeeExit,
// //           file: file
// //         });
// //       } else {
// //         alert('Please upload only .gif, .png, .jpg files');
// //         e.target.value = null; // Reset file input
// //       }
// //     }
// //   };

// //   // Handle submit for new employee exit
// //   const handleSubmitEmployeeExit = () => {
// //     if (!newEmployeeExit.employee || !newEmployeeExit.exitDate || !newEmployeeExit.exitType) {
// //       alert('Please fill all required fields: Employee, Exit Date, and Exit Type.');
// //       return;
// //     }

// //     // const exitDate = new Date(); // This was creating current date, not using form date
// //     // const formattedExitDate = `${exitDate.getDate().toString().padStart(2, '0')}/${(exitDate.getMonth() + 1).toString().padStart(2, '0')}/${exitDate.getFullYear()}`;
    
// //     // Use the date from the form directly if it's already formatted or format it
// //     // Assuming newEmployeeExit.exitDate is YYYY-MM-DD from date picker, convert to DD/MM/YYYY
// //     let formattedExitDate;
// //     try {
// //         formattedExitDate = newEmployeeExit.exitDate ? formatDate(newEmployeeExit.exitDate) : formatDate(new Date().toISOString().split('T')[0]);
// //     } catch (e) {
// //         formattedExitDate = formatDate(new Date().toISOString().split('T')[0]); // Fallback
// //     }


// //     const newExit = {
// //       id: employeeExits.length + 1,
// //       employee: {
// //         name: newEmployeeExit.employee,
// //         // This email generation is simplistic, might need a proper source
// //         email: `${newEmployeeExit.employee.toLowerCase().replace(/\s+/g, '.')}@tdtl.world`,
// //         avatar: newEmployeeExit.file ? URL.createObjectURL(newEmployeeExit.file) : '/user-image.png'
// //       },
// //       exitType: newEmployeeExit.exitType,
// //       exitDate: formattedExitDate, // Use date from form
// //       exitInterview: newEmployeeExit.exitInterview,
// //       disableAccount: newEmployeeExit.disableAccount,
// //       status: 'Pending', // Default status
// //       description: newEmployeeExit.description
// //     };

// //     setEmployeeExits([...employeeExits, newExit]);
// //     alert('Employee Exit added successfully (locally).');
// //     handleCloseEmployeeExitDialog();
// //   };

// //   // Handle submit for new exit type (API integration)
// //   const handleSubmitExitType = async () => {
// //     if (!newExitType.trim()) {
// //       alert('Exit Type is required');
// //       return;
// //     }
// //     setSubmittingExitType(true);
// //     setSubmitExitTypeError(null);
// //     try {
// //       const response = await fetch(EXIT_TYPE_API_URL, {
// //         method: 'POST',
// //         headers: {
// //           'Content-Type': 'application/json',
// //           // Add Authorization headers if needed
// //         },
// //         body: JSON.stringify({ category_name: newExitType.trim() }),
// //       });
// //       if (!response.ok) {
// //         const errorData = await response.json().catch(() => ({ message: 'Failed to add exit type.' }));
// //         throw new Error(errorData.message || errorData.detail || `HTTP error! status: ${response.status}`);
// //       }
// //       // const addedType = await response.json(); // Contains the newly added type
// //       alert('Exit type added successfully!');
// //       handleCloseExitTypeDialog(); // Resets newExitType
// //       fetchExitTypes(); // Refresh the list from API
// //     } catch (error) {
// //       console.error("Failed to submit exit type:", error);
// //       setSubmitExitTypeError(error.message);
// //       alert(`Error adding exit type: ${error.message}`);
// //     } finally {
// //       setSubmittingExitType(false);
// //     }
// //   };

// //   // Close dialogs and reset forms
// //   const handleCloseEmployeeExitDialog = () => {
// //     setOpenAddExitDialog(false);
// //     setNewEmployeeExit({
// //       employee: '',
// //       exitDate: '',
// //       exitType: '',
// //       exitInterview: 'Yes',
// //       disableAccount: 'Yes',
// //       description: '',
// //       file: null
// //     });
// //   };

// //   const handleCloseExitTypeDialog = () => {
// //     setOpenAddExitTypeDialog(false);
// //     setNewExitType('');
// //     setSubmitExitTypeError(null); // Clear previous submission errors
// //   };

// //   // Reset forms
// //   const handleResetEmployeeExitForm = () => {
// //     setNewEmployeeExit({
// //       employee: '',
// //       exitDate: '',
// //       exitType: '',
// //       exitInterview: 'Yes',
// //       disableAccount: 'Yes',
// //       description: '',
// //       file: null
// //     });
// //   };

// //   // Export employees to Excel (CSV)
// //   const handleExportEmployees = () => {
// //     let csvContent = "data:text/csv;charset=utf-8,";
// //     csvContent += "Employee Name,Employee Email,Exit Type,Exit Date,Exit Interview,Disable Account,Status\n";
    
// //     employeeExits.forEach(exit => {
// //       const row = [
// //         `"${exit.employee.name.replace(/"/g, '""')}"`, // Handle quotes in names
// //         `"${exit.employee.email.replace(/"/g, '""')}"`,
// //         `"${exit.exitType.replace(/"/g, '""')}"`,
// //         exit.exitDate,
// //         exit.exitInterview,
// //         exit.disableAccount,
// //         exit.status
// //       ].join(",");
// //       csvContent += row + "\n";
// //     });
    
// //     const encodedUri = encodeURI(csvContent);
// //     const link = document.createElement("a");
// //     link.setAttribute("href", encodedUri);
// //     link.setAttribute("download", "employee_exits.csv");
// //     document.body.appendChild(link);
// //     link.click();
// //     document.body.removeChild(link);
// //   };
  
// //   const handleExitTypeSort = (key) => {
// //     let direction = 'asc';
// //     if (exitTypeSortConfig.key === key && exitTypeSortConfig.direction === 'asc') {
// //       direction = 'desc';
// //     }
// //     setExitTypeSortConfig({ key, direction });
// //   };

// //   // Filter employee exits based on search term
// //   const filteredEmployeeExits = employeeExits.filter(exit => 
// //     (exit.employee.name && exit.employee.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
// //     (exit.exitType && exit.exitType.toLowerCase().includes(searchTerm.toLowerCase())) ||
// //     (exit.exitDate && exit.exitDate.includes(searchTerm))
// //   );

// //   // Filter and sort exit types based on search term and sort config
// //   const sortedAndFilteredExitTypes = useMemo(() => {
// //     let items = [...exitTypes];
// //     if (exitTypeSearchTerm) {
// //       items = items.filter(type => 
// //         type.name && type.name.toLowerCase().includes(exitTypeSearchTerm.toLowerCase())
// //       );
// //     }
// //     if (exitTypeSortConfig.key) {
// //       items.sort((a, b) => {
// //         if (a[exitTypeSortConfig.key] < b[exitTypeSortConfig.key]) {
// //           return exitTypeSortConfig.direction === 'asc' ? -1 : 1;
// //         }
// //         if (a[exitTypeSortConfig.key] > b[exitTypeSortConfig.key]) {
// //           return exitTypeSortConfig.direction === 'asc' ? 1 : -1;
// //         }
// //         return 0;
// //       });
// //     }
// //     return items;
// //   }, [exitTypes, exitTypeSearchTerm, exitTypeSortConfig]);


// //   // Paginate employee exits
// //   const paginatedEmployeeExits = filteredEmployeeExits.slice(
// //     page * rowsPerPage,
// //     page * rowsPerPage + rowsPerPage
// //   );

// //   // Paginate exit types
// //   const paginatedExitTypes = sortedAndFilteredExitTypes.slice(
// //     exitTypePage * exitTypeRowsPerPage,
// //     exitTypePage * exitTypeRowsPerPage + exitTypeRowsPerPage
// //   );

// //   return (
// //     <ThemeProvider theme={theme}>
// //       <CssBaseline />
// //       <Box sx={{ p: 3 }}>
// //         {/* Employee Exit List */}
// //         <Paper elevation={3} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
// //           <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, flexWrap: 'wrap', gap: 1 }}>
// //             <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
// //               List All Employee Exit
// //             </Typography>
// //             <Box sx={{display: 'flex', gap: 1, flexWrap: 'wrap'}}>
// //               <Button
// //                 variant="contained"
// //                 onClick={() => setOpenAddExitTypeDialog(true)}
// //                 sx={{ bgcolor: '#7c4dff', '&:hover': { bgcolor: '#6039c8' } }}
// //               >
// //                 + Exit Type
// //               </Button>
// //               <Button
// //                 variant="contained"
// //                 startIcon={<FileDownloadIcon />}
// //                 onClick={handleExportEmployees}
// //                 sx={{ bgcolor: '#4caf50', '&:hover': { bgcolor: '#388e3c' } }}
// //               >
// //                 Export Employees
// //               </Button>
// //               <Button
// //                 variant="contained"
// //                 onClick={() => setOpenAddExitDialog(true)}
// //                 sx={{ bgcolor: '#7c4dff', '&:hover': { bgcolor: '#6039c8' } }}
// //               >
// //                 + Add New Exit
// //               </Button>
// //             </Box>
// //           </Box>

// //           <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, flexWrap: 'wrap', gap: 1 }}>
// //             <Box sx={{ display: 'flex', alignItems: 'center' }}>
// //               <Typography variant="body2" sx={{ mr: 1 }}>Show</Typography>
// //               <FormControl size="small" sx={{ width: 80, mr: 1 }}>
// //                 <Select
// //                   value={rowsPerPage}
// //                   onChange={handleChangeRowsPerPage}
// //                 >
// //                   <MenuItem value={10}>10</MenuItem>
// //                   <MenuItem value={25}>25</MenuItem>
// //                   <MenuItem value={50}>50</MenuItem>
// //                 </Select>
// //               </FormControl>
// //               <Typography variant="body2">entries</Typography>
// //             </Box>
// //             <Box sx={{ display: 'flex', alignItems: 'center' }}>
// //               <Typography variant="body2" sx={{ mr: 1 }}>Search</Typography>
// //               <TextField 
// //                 size="small" 
// //                 value={searchTerm}
// //                 onChange={handleSearch}
// //                 placeholder='Search exits...'
// //               />
// //             </Box>
// //           </Box>

// //           <TableContainer>
// //             <Table>
// //               <TableHead>
// //                 <TableRow>
// //                   <TableCell>
// //                     <Box sx={{ display: 'flex', alignItems: 'center' }}>
// //                       <PersonIcon fontSize="small" sx={{ mr: 0.5 }} />
// //                       EMPLOYEE TO EXIT
// //                       <IconButton size="small" title="Sort (not implemented)"> 
// //                         <SortIcon fontSize="small" />
// //                       </IconButton>
// //                     </Box>
// //                   </TableCell>
// //                   <TableCell>
// //                     <Box sx={{ display: 'flex', alignItems: 'center' }}>
// //                       EXIT TYPE
// //                       <IconButton size="small" title="Sort (not implemented)">
// //                         <SortIcon fontSize="small" />
// //                       </IconButton>
// //                     </Box>
// //                   </TableCell>
// //                   <TableCell>
// //                     <Box sx={{ display: 'flex', alignItems: 'center' }}>
// //                       <CalendarTodayIcon fontSize="small" sx={{ mr: 0.5 }} />
// //                       EXIT DATE
// //                       <IconButton size="small" title="Sort (not implemented)">
// //                         <SortIcon fontSize="small" />
// //                       </IconButton>
// //                     </Box>
// //                   </TableCell>
// //                   <TableCell>EXIT INTERVIEW</TableCell>
// //                   <TableCell>DISABLE ACCOUNT</TableCell>
// //                   <TableCell>STATUS</TableCell>
// //                 </TableRow>
// //               </TableHead>
// //               <TableBody>
// //                 {paginatedEmployeeExits.length > 0 ? paginatedEmployeeExits.map((exit) => (
// //                   <TableRow key={exit.id} hover>
// //                     <TableCell>
// //                       <Box sx={{ display: 'flex', alignItems: 'center' }}>
// //                         <Avatar src={exit.employee.avatar} alt={exit.employee.name} sx={{ mr: 1, width: 30, height: 30 }} />
// //                         <Box>
// //                           <Typography variant="body2" fontWeight="medium">{exit.employee.name}</Typography>
// //                           <Typography variant="caption" color="textSecondary">{exit.employee.email}</Typography>
// //                         </Box>
// //                       </Box>
// //                     </TableCell>
// //                     <TableCell>{exit.exitType}</TableCell>
// //                     <TableCell>{exit.exitDate}</TableCell>
// //                     <TableCell>{exit.exitInterview}</TableCell>
// //                     <TableCell>{exit.disableAccount}</TableCell>
// //                     <TableCell>
// //                       <Chip 
// //                         label={exit.status} 
// //                         color={exit.status === 'Approved' ? 'success' : (exit.status === 'Pending' ? 'warning' : 'default')}
// //                         size="small" 
// //                       />
// //                     </TableCell>
// //                   </TableRow>
// //                 )) : (
// //                     <TableRow>
// //                         <TableCell colSpan={6} align="center">No employee exits found.</TableCell>
// //                     </TableRow>
// //                 )}
// //               </TableBody>
// //             </Table>
// //           </TableContainer>

// //             {filteredEmployeeExits.length > 0 && (
// //               <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2, flexWrap: 'wrap', gap: 1 }}>
// //                 <Typography variant="body2">
// //                   Showing {Math.min(page * rowsPerPage + 1, filteredEmployeeExits.length)} to {Math.min((page + 1) * rowsPerPage, filteredEmployeeExits.length)} of {filteredEmployeeExits.length} records
// //                 </Typography>
// //                 <Box sx={{ display: 'flex', gap: 0.5 }}>
// //                   <Button 
// //                     size="small"
// //                     disabled={page === 0} 
// //                     onClick={() => handleChangePage(null, page - 1)}
// //                     sx={{ border: '1px solid #ddd' }}
// //                   >
// //                     Previous
// //                   </Button>
// //                   {[...Array(Math.ceil(filteredEmployeeExits.length / rowsPerPage))].map((_, i) => (
// //                     <Button
// //                       key={i}
// //                       size="small"
// //                       variant={page === i ? 'contained' : 'outlined'}
// //                       onClick={() => handleChangePage(null, i)}
// //                       sx={{
// //                         minWidth: '36px',
// //                         bgcolor: page === i ? 'primary.main' : 'transparent',
// //                         color: page === i ? 'primary.contrastText' : 'text.primary',
// //                         '&:hover': { bgcolor: page === i ? 'primary.dark' : 'action.hover' }
// //                       }}
// //                     >
// //                       {i + 1}
// //                     </Button>
// //                   ))}
// //                   <Button 
// //                     size="small"
// //                     disabled={page >= Math.ceil(filteredEmployeeExits.length / rowsPerPage) - 1} 
// //                     onClick={() => handleChangePage(null, page + 1)}
// //                      sx={{ border: '1px solid #ddd' }}
// //                   >
// //                     Next
// //                   </Button>
// //                 </Box>
// //               </Box>
// //             )}
// //         </Paper>

// //         {/* Add New Employee Exit Dialog */}
// //         <Dialog open={openAddExitDialog} onClose={handleCloseEmployeeExitDialog} maxWidth="md" fullWidth>
// //           <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
// //             <Typography variant="h6">Add New Employee Exit</Typography>
// //             <Button 
// //               variant="contained" 
// //               onClick={handleCloseEmployeeExitDialog}
// //             >
// //               Hide
// //             </Button>
// //           </DialogTitle>
// //           <Divider />
// //           <DialogContent>
// //             <Grid container spacing={3}>
// //               <Grid item xs={12} md={8}>
// //                 <Grid container spacing={2}>
// //                   <Grid item xs={12} md={6}>
// //                     <FormControl fullWidth required>
// //                       <InputLabel id="employee-to-exit-label">Employee to Exit</InputLabel>
// //                       <Select
// //                         labelId="employee-to-exit-label"
// //                         label="Employee to Exit"
// //                         value={newEmployeeExit.employee}
// //                         onChange={(e) => handleEmployeeExitChange('employee', e.target.value)}
// //                       >
// //                         <MenuItem value=""><em>Select Employee</em></MenuItem>
// //                         {/* This should ideally be fetched from an API */}
// //                         <MenuItem value="Hitesh Zhambare">Hitesh Zhambare</MenuItem>
// //                         <MenuItem value="Avinash Raut">Avinash Raut</MenuItem>
// //                         <MenuItem value="John Doe">John Doe</MenuItem>
// //                         <MenuItem value="Jane Smith">Jane Smith</MenuItem>
// //                       </Select>
// //                     </FormControl>
// //                   </Grid>
// //                   <Grid item xs={12} md={6}>
// //                     <TextField
// //                       label="Exit Date"
// //                       fullWidth
// //                       required
// //                       type="date"
// //                       InputLabelProps={{ shrink: true }}
// //                       value={newEmployeeExit.exitDate}
// //                       onChange={(e) => handleEmployeeExitChange('exitDate', e.target.value)}
// //                       InputProps={{
// //                         endAdornment: (
// //                           <InputAdornment position="end">
// //                             <CalendarTodayIcon />
// //                           </InputAdornment>
// //                         )
// //                       }}
// //                     />
// //                   </Grid>
// //                   <Grid item xs={12} md={4}>
// //                      <FormControl fullWidth required>
// //                       <InputLabel id="exit-type-label">Exit Type</InputLabel>
// //                       <Select
// //                         labelId="exit-type-label"
// //                         label="Exit Type"
// //                         value={newEmployeeExit.exitType}
// //                         onChange={(e) => handleEmployeeExitChange('exitType', e.target.value)}
// //                       >
// //                         <MenuItem value=""><em>Select Exit Type</em></MenuItem>
// //                         {exitTypes.map((type) => (
// //                           <MenuItem key={type.id} value={type.name}>{type.name}</MenuItem>
// //                         ))}
// //                       </Select>
// //                     </FormControl>
// //                   </Grid>
// //                   <Grid item xs={12} md={4}>
// //                     <FormControl fullWidth required>
// //                       <InputLabel id="exit-interview-label">Exit Interview</InputLabel>
// //                       <Select
// //                         labelId="exit-interview-label"
// //                         label="Exit Interview"
// //                         value={newEmployeeExit.exitInterview}
// //                         onChange={(e) => handleEmployeeExitChange('exitInterview', e.target.value)}
// //                       >
// //                         <MenuItem value="Yes">Yes</MenuItem>
// //                         <MenuItem value="No">No</MenuItem>
// //                       </Select>
// //                     </FormControl>
// //                   </Grid>
// //                   <Grid item xs={12} md={4}>
// //                     <FormControl fullWidth required>
// //                       <InputLabel id="disable-account-label">Disable Account</InputLabel>
// //                       <Select
// //                         labelId="disable-account-label"
// //                         label="Disable Account"
// //                         value={newEmployeeExit.disableAccount}
// //                         onChange={(e) => handleEmployeeExitChange('disableAccount', e.target.value)}
// //                       >
// //                         <MenuItem value="Yes">Yes</MenuItem>
// //                         <MenuItem value="No">No</MenuItem>
// //                       </Select>
// //                     </FormControl>
// //                   </Grid>
// //                   <Grid item xs={12}>
// //                     <TextField
// //                       label="Description"
// //                       fullWidth
// //                       multiline
// //                       rows={3}
// //                       placeholder="Enter description..."
// //                       value={newEmployeeExit.description}
// //                       onChange={(e) => handleEmployeeExitChange('description', e.target.value)}
// //                     />
// //                   </Grid>
// //                 </Grid>
// //               </Grid>
// //               <Grid item xs={12} md={4}>
// //                 <Paper variant="outlined" sx={{ p: 2, height: '100%' }}>
// //                   <Typography variant="subtitle1" gutterBottom>
// //                     Exit Contract / Attachment
// //                   </Typography>
// //                     <TextField
// //                       fullWidth
// //                       disabled
// //                       size="small"
// //                       placeholder="No file chosen"
// //                       value={newEmployeeExit.file ? newEmployeeExit.file.name : ''}
// //                       sx={{ mb: 1 }}
// //                       InputProps={{
// //                         startAdornment: newEmployeeExit.file ? (
// //                             <InputAdornment position="start">
// //                                 <Chip 
// //                                     size="small" 
// //                                     label={newEmployeeExit.file.name} 
// //                                     onDelete={() => handleEmployeeExitChange('file', null)}
// //                                 />
// //                             </InputAdornment>
// //                         ) : null,
// //                       }}
// //                     />
// //                     <Button
// //                       variant="outlined"
// //                       component="label"
// //                       fullWidth
// //                     >
// //                       Browse File
// //                       <input
// //                         type="file"
// //                         hidden
// //                         onChange={handleFileUpload}
// //                         accept=".jpg,.jpeg,.png,.gif"
// //                       />
// //                     </Button>
// //                   <Typography variant="caption" color="textSecondary" display="block" mt={1}>
// //                     Allowed: GIF, PNG, JPG, JPEG. Max 2MB.
// //                   </Typography>
// //                 </Paper>
// //               </Grid>
// //             </Grid>
// //           </DialogContent>
// //           <Divider />
// //           <DialogActions sx={{ p: 2, justifyContent: 'flex-end' }}>
// //             <Button 
// //               onClick={handleResetEmployeeExitForm} 
// //               sx={{ mr: 1, color: 'text.secondary', borderColor: 'divider' }}
// //               variant="outlined"
// //             >
// //               Reset
// //             </Button>
// //             <Button 
// //               variant="contained" 
// //               onClick={handleSubmitEmployeeExit}
// //             >
// //               Save Employee Exit
// //             </Button>
// //           </DialogActions>
// //         </Dialog>

// //         {/* Add New Exit Type Dialog */}
// //         <Dialog open={openAddExitTypeDialog} onClose={handleCloseExitTypeDialog} maxWidth="lg" fullWidth>
// //             <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
// //                 Manage Exit Types
// //                 <Button onClick={handleCloseExitTypeDialog}>Close</Button>
// //             </DialogTitle>
// //             <DialogContent dividers sx={{ p: 0 }}>
// //             <Grid container>
// //               <Grid item xs={12} md={4} sx={{borderRight: {md: '1px solid #eee'} }}>
// //                 <Box sx={{ p: 3}}>
// //                   <Typography variant="h6" sx={{ mb: 2 }}>
// //                     Add New Exit Type
// //                   </Typography>
// //                   <FormControl fullWidth sx={{ mb: 2 }}>
// //                     <TextField
// //                       required
// //                       label="Exit Type Name"
// //                       placeholder="Enter exit type name"
// //                       value={newExitType}
// //                       onChange={(e) => setNewExitType(e.target.value)}
// //                       disabled={submittingExitType}
// //                     />
// //                   </FormControl>
// //                   {submitExitTypeError && (
// //                     <Typography color="error" variant="body2" sx={{mb:1}}>{submitExitTypeError}</Typography>
// //                   )}
// //                   <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
// //                     <Button 
// //                       variant="contained" 
// //                       onClick={handleSubmitExitType}
// //                       disabled={submittingExitType}
// //                     >
// //                       {submittingExitType ? <CircularProgress size={24} color="inherit" /> : 'Save Exit Type'}
// //                     </Button>
// //                   </Box>
// //                 </Box>
// //               </Grid>
// //               <Grid item xs={12} md={8}>
// //                 <Box sx={{ p: 3 }}>
// //                   <Typography variant="h6" sx={{ mb: 2 }}>
// //                     List All Exit Types
// //                   </Typography>
// //                   <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, flexWrap: 'wrap', gap:1 }}>
// //                     <Box sx={{ display: 'flex', alignItems: 'center' }}>
// //                       <Typography variant="body2" sx={{ mr: 1 }}>Show</Typography>
// //                       <FormControl size="small" sx={{ width: 80, mr: 1 }}>
// //                         <Select
// //                           value={exitTypeRowsPerPage}
// //                           onChange={handleExitTypeChangeRowsPerPage}
// //                         >
// //                           <MenuItem value={10}>10</MenuItem>
// //                           <MenuItem value={25}>25</MenuItem>
// //                           <MenuItem value={50}>50</MenuItem>
// //                         </Select>
// //                       </FormControl>
// //                       <Typography variant="body2">entries</Typography>
// //                     </Box>
// //                     <Box sx={{ display: 'flex', alignItems: 'center' }}>
// //                       <Typography variant="body2" sx={{ mr: 1 }}>Search</Typography>
// //                       <TextField 
// //                         size="small" 
// //                         value={exitTypeSearchTerm}
// //                         onChange={handleExitTypeSearch}
// //                         placeholder='Search exit types...'
// //                       />
// //                     </Box>
// //                   </Box>
// //                   {loadingExitTypes ? (
// //                     <Box sx={{display: 'flex', justifyContent: 'center', p: 3}}><CircularProgress /></Box>
// //                   ) : exitTypesError ? (
// //                     <Typography color="error" sx={{p:2}}>Error: {exitTypesError} <Button onClick={fetchExitTypes}>Retry</Button></Typography>
// //                   ) : (
// //                   <>
// //                   <TableContainer component={Paper} variant="outlined">
// //                     <Table size="small">
// //                       <TableHead>
// //                         <TableRow>
// //                           <TableCell>
// //                             <TableSortLabel
// //                               active={exitTypeSortConfig.key === 'name'}
// //                               direction={exitTypeSortConfig.key === 'name' ? exitTypeSortConfig.direction : 'asc'}
// //                               onClick={() => handleExitTypeSort('name')}
// //                             >
// //                                 EXIT TYPE
// //                             </TableSortLabel>
// //                           </TableCell>
// //                           <TableCell>
// //                             <TableSortLabel
// //                                 active={exitTypeSortConfig.key === 'createdAt'}
// //                                 direction={exitTypeSortConfig.key === 'createdAt' ? exitTypeSortConfig.direction : 'asc'}
// //                                 onClick={() => handleExitTypeSort('createdAt')}
// //                             >
// //                                 CREATED AT
// //                             </TableSortLabel>
// //                           </TableCell>
// //                         </TableRow>
// //                       </TableHead>
// //                       <TableBody>
// //                         {paginatedExitTypes.length > 0 ? paginatedExitTypes.map((type) => (
// //                           <TableRow key={type.id} hover>
// //                             <TableCell>{type.name}</TableCell>
// //                             <TableCell>{type.createdAt}</TableCell>
// //                           </TableRow>
// //                         )) : (
// //                             <TableRow>
// //                                 <TableCell colSpan={2} align="center">No exit types found.</TableCell>
// //                             </TableRow>
// //                         )}
// //                       </TableBody>
// //                     </Table>
// //                   </TableContainer>
// //                     {sortedAndFilteredExitTypes.length > 0 && (
// //                         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2, flexWrap:'wrap', gap:1 }}>
// //                         <Typography variant="body2">
// //                             Showing {Math.min(exitTypePage * exitTypeRowsPerPage + 1, sortedAndFilteredExitTypes.length)} to {Math.min((exitTypePage + 1) * exitTypeRowsPerPage, sortedAndFilteredExitTypes.length)} of {sortedAndFilteredExitTypes.length} records
// //                         </Typography>
// //                         <Box sx={{ display: 'flex', gap: 0.5 }}>
// //                             <Button 
// //                             size="small"
// //                             disabled={exitTypePage === 0} 
// //                             onClick={() => handleExitTypeChangePage(null, exitTypePage - 1)}
// //                             sx={{ border: '1px solid #ddd' }}
// //                             >
// //                             Previous
// //                             </Button>
// //                             {[...Array(Math.ceil(sortedAndFilteredExitTypes.length / exitTypeRowsPerPage))].map((_, i) => (
// //                             <Button
// //                                 key={i}
// //                                 size="small"
// //                                 variant={exitTypePage === i ? 'contained' : 'outlined'}
// //                                 onClick={() => handleExitTypeChangePage(null, i)}
// //                                 sx={{
// //                                 minWidth: '36px',
// //                                 bgcolor: exitTypePage === i ? 'primary.main' : 'transparent',
// //                                 color: exitTypePage === i ? 'primary.contrastText' : 'text.primary',
// //                                 '&:hover': { bgcolor: exitTypePage === i ? 'primary.dark' : 'action.hover' }
// //                                 }}
// //                             >
// //                                 {i + 1}
// //                             </Button>
// //                             ))}
// //                             <Button 
// //                             size="small"
// //                             disabled={exitTypePage >= Math.ceil(sortedAndFilteredExitTypes.length / exitTypeRowsPerPage) - 1} 
// //                             onClick={() => handleExitTypeChangePage(null, exitTypePage + 1)}
// //                             sx={{ border: '1px solid #ddd' }}
// //                             >
// //                             Next
// //                             </Button>
// //                         </Box>
// //                         </Box>
// //                     )}
// //                   </>
// //                   )}
// //                 </Box>
// //               </Grid>
// //             </Grid>
// //           </DialogContent>
// //         </Dialog>
// //       </Box>
// //     </ThemeProvider>
// //   );
// // }

// // export default EmployeeExitManagement;


// import React, { useState, useEffect, useCallback, useMemo } from 'react';
// import {
//   ThemeProvider,
//   createTheme,
//   Box,
//   Paper,
//   Typography,
//   Button,
//   IconButton,
//   TextField,
//   Select,
//   MenuItem,
//   InputLabel,
//   FormControl,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Grid,
//   Chip,
//   Avatar,
//   Divider,
//   CssBaseline,
//   InputAdornment,
//   CircularProgress,
//   TableSortLabel,
// } from '@mui/material';
// import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
// import PersonIcon from '@mui/icons-material/Person';
// import SortIcon from '@mui/icons-material/Sort';
// import FileDownloadIcon from '@mui/icons-material/FileDownload';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';

// // API Configuration
// const API_BASE_URL = 'https://tdtlworld.com/hrms-backend/api';
// const EXIT_TYPE_API_URL = `${API_BASE_URL}/exit-type/`;

// // Create theme
// const theme = createTheme({
//   palette: {
//     primary: {
//       main: '#7c4dff',
//     },
//     secondary: {
//       main: '#f50057',
//     },
//     background: {
//       default: '#f5f5f9',
//     },
//   },
//   components: {
//     MuiTableCell: {
//       styleOverrides: {
//         head: {
//           fontWeight: 'bold',
//           backgroundColor: '#f5f5f5',
//         },
//       },
//     },
//   },
// });

// const formatDate = (dateString) => {
//     if (!dateString) return 'N/A';
//     try {
//       const date = new Date(dateString);
//       if (isNaN(date.getTime())) {
//         // Try to parse if it's like "YYYY-MM-DD HH:MM:SS" or "YYYY-MM-DD"
//         const parts = dateString.split(/[- :T]/); // Added 'T' for ISO strings like "YYYY-MM-DDTHH:MM:SS"
//         if (parts.length >= 3) {
//             const year = parseInt(parts[0], 10);
//             const month = parseInt(parts[1], 10) -1; // Month is 0-indexed
//             const day = parseInt(parts[2], 10);
//             const newDate = new Date(year, month, day);
//             if (!isNaN(newDate.getTime())) {
//                 const d = String(newDate.getDate()).padStart(2, '0');
//                 const m = String(newDate.getMonth() + 1).padStart(2, '0');
//                 const y = newDate.getFullYear();
//                 return `${d}/${m}/${y}`;
//             }
//         }
//         return dateString; // Return original if invalid or complex format
//       }
//       const day = String(date.getDate()).padStart(2, '0');
//       const month = String(date.getMonth() + 1).padStart(2, '0');
//       const year = date.getFullYear();
//       return `${day}/${month}/${year}`;
//     } catch (e) {
//       console.error("Error formatting date:", e, "Original date:", dateString);
//       return dateString;
//     }
// };

// const convertToInputDate = (ddmmyyyy) => {
//     if (!ddmmyyyy || !ddmmyyyy.includes('/')) return '';
//     const parts = ddmmyyyy.split('/');
//     if (parts.length === 3) {
//         // Ensure month and day are two digits for input[type=date]
//         const day = parts[0].padStart(2, '0');
//         const month = parts[1].padStart(2, '0');
//         const year = parts[2];
//         return `${year}-${month}-${day}`; // YYYY-MM-DD
//     }
//     return '';
// };


// function EmployeeExitManagement() {
//   const [employeeExits, setEmployeeExits] = useState([
//     {
//       id: 1,
//       employee: {
//         name: 'Avinash Raut',
//         email: 'avinash.raut@tdtl.world',
//         avatar: '/user-image.png' 
//       },
//       exitType: 'Involuntary',
//       exitDate: '20/06/2023',
//       exitInterview: 'Yes',
//       disableAccount: 'No',
//       description: 'Restructuring role.'
//     },
//     {
//       id: 2,
//       employee: {
//         name: 'Hitesh Zhambare',
//         email: 'hitesh.zhambare@tdtl.world',
//         avatar: '/user-image.png' 
//       },
//       exitType: 'Retirement',
//       exitDate: '29/06/2023',
//       exitInterview: 'Yes',
//       disableAccount: 'Yes',
//       description: 'Reached retirement age.'
//     }
//   ]);

//   const [exitTypes, setExitTypes] = useState([]);
//   const [loadingExitTypes, setLoadingExitTypes] = useState(true);
//   const [exitTypesError, setExitTypesError] = useState(null);
//   const [submittingExitType, setSubmittingExitType] = useState(false);
//   const [submitExitTypeError, setSubmitExitTypeError] = useState(null);
//   const [exitTypeSortConfig, setExitTypeSortConfig] = useState({ key: 'name', direction: 'asc' });

//   const [openAddExitDialog, setOpenAddExitDialog] = useState(false);
//   const [openAddExitTypeDialog, setOpenAddExitTypeDialog] = useState(false);
  
//   const [editingExit, setEditingExit] = useState(null); // For tracking the exit being edited

//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
  
//   const [exitTypePage, setExitTypePage] = useState(0);
//   const [exitTypeRowsPerPage, setExitTypeRowsPerPage] = useState(10);

//   const [searchTerm, setSearchTerm] = useState('');
//   const [exitTypeSearchTerm, setExitTypeSearchTerm] = useState('');

//   const [newEmployeeExit, setNewEmployeeExit] = useState({
//     employee: '',
//     exitDate: '',
//     exitType: '',
//     exitInterview: 'Yes',
//     disableAccount: 'Yes',
//     description: '',
//     file: null
//   });

//   const [newExitType, setNewExitType] = useState('');

//   const fetchExitTypes = useCallback(async () => {
//     setLoadingExitTypes(true);
//     setExitTypesError(null);
//     try {
//       const response = await fetch(EXIT_TYPE_API_URL);
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
//       const data = await response.json();
//       const transformedData = data.map(item => ({
//         id: item.id || item.value,
//         name: item.name || item.label,
//         createdAt: formatDate(item.created_at),
//       }));
//       setExitTypes(transformedData);
//     } catch (error) {
//       console.error("Failed to fetch exit types:", error);
//       setExitTypesError(error.message);
//     } finally {
//       setLoadingExitTypes(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchExitTypes();
//   }, [fetchExitTypes]);

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const handleExitTypeChangePage = (event, newPage) => {
//     setExitTypePage(newPage);
//   };

//   const handleExitTypeChangeRowsPerPage = (event) => {
//     setExitTypeRowsPerPage(parseInt(event.target.value, 10));
//     setExitTypePage(0);
//   };

//   const handleSearch = (e) => {
//     setSearchTerm(e.target.value);
//     setPage(0); 
//   };

//   const handleExitTypeSearch = (e) => {
//     setExitTypeSearchTerm(e.target.value);
//     setExitTypePage(0); 
//   };

//   const handleEmployeeExitChange = (field, value) => {
//     setNewEmployeeExit({
//       ...newEmployeeExit,
//       [field]: value
//     });
//   };

//   const handleFileUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       if (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif') {
//         if (file.size <= 2 * 1024 * 1024) { // Max 2MB
//             setNewEmployeeExit({
//             ...newEmployeeExit,
//             file: file
//             });
//         } else {
//             alert('File is too large. Maximum size is 2MB.');
//             e.target.value = null;
//         }
//       } else {
//         alert('Please upload only .gif, .png, .jpg, .jpeg files');
//         e.target.value = null; 
//       }
//     }
//   };

//   const handleOpenEditEmployeeExitDialog = (exit) => {
//     setEditingExit(exit);
//     setNewEmployeeExit({
//       employee: exit.employee.name,
//       exitDate: convertToInputDate(exit.exitDate), // Convert DD/MM/YYYY to YYYY-MM-DD
//       exitType: exit.exitType,
//       exitInterview: exit.exitInterview,
//       disableAccount: exit.disableAccount,
//       description: exit.description || '',
//       file: null, // Reset file, user must re-select if changing avatar
//     });
//     setOpenAddExitDialog(true);
//   };

//   const handleDeleteEmployeeExit = (id) => {
//     if (window.confirm('Are you sure you want to delete this employee exit record?')) {
//       setEmployeeExits(employeeExits.filter(exit => exit.id !== id));
//       alert('Employee Exit record deleted successfully (locally).');
//     }
//   };

//   const handleSubmitEmployeeExit = () => {
//     if (!newEmployeeExit.employee || !newEmployeeExit.exitDate || !newEmployeeExit.exitType) {
//       alert('Please fill all required fields: Employee, Exit Date, and Exit Type.');
//       return;
//     }

//     let formattedExitDate = newEmployeeExit.exitDate 
//         ? formatDate(newEmployeeExit.exitDate) // Handles YYYY-MM-DD from input
//         : formatDate(new Date().toISOString().split('T')[0]); // Fallback

//     let avatarUrl;
//     if (newEmployeeExit.file) {
//       avatarUrl = URL.createObjectURL(newEmployeeExit.file);
//     } else if (editingExit && editingExit.employee.avatar) {
//       avatarUrl = editingExit.employee.avatar; // Keep existing avatar if no new file
//     } else {
//       avatarUrl = '/user-image.png'; // Default if new or no previous avatar
//     }

//     const exitData = {
//       employee: {
//         name: newEmployeeExit.employee,
//         email: `${newEmployeeExit.employee.toLowerCase().replace(/\s+/g, '.')}@tdtl.world`,
//         avatar: avatarUrl
//       },
//       exitType: newEmployeeExit.exitType,
//       exitDate: formattedExitDate,
//       exitInterview: newEmployeeExit.exitInterview,
//       disableAccount: newEmployeeExit.disableAccount,
//       description: newEmployeeExit.description,
//     };

//     if (editingExit) {
//       const updatedExits = employeeExits.map(ex =>
//         ex.id === editingExit.id ? { ...exitData, id: editingExit.id } : ex
//       );
//       setEmployeeExits(updatedExits);
//       alert('Employee Exit updated successfully (locally).');
//     } else {
//       const newId = employeeExits.length > 0 ? Math.max(...employeeExits.map(e => e.id)) + 1 : 1;
//       const newExitEntry = {
//         ...exitData,
//         id: newId,
//       };
//       setEmployeeExits([...employeeExits, newExitEntry]);
//       alert('Employee Exit added successfully (locally).');
//     }
//     handleCloseEmployeeExitDialog();
//   };

//   const handleSubmitExitType = async () => {
//     if (!newExitType.trim()) {
//       alert('Exit Type is required');
//       return;
//     }
//     setSubmittingExitType(true);
//     setSubmitExitTypeError(null);
//     try {
//       const response = await fetch(EXIT_TYPE_API_URL, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ category_name: newExitType.trim() }),
//       });
//       if (!response.ok) {
//         const errorData = await response.json().catch(() => ({ message: 'Failed to add exit type.' }));
//         throw new Error(errorData.message || errorData.detail || `HTTP error! status: ${response.status}`);
//       }
//       alert('Exit type added successfully!');
//       handleCloseExitTypeDialog();
//       fetchExitTypes(); 
//     } catch (error) {
//       console.error("Failed to submit exit type:", error);
//       setSubmitExitTypeError(error.message);
//       alert(`Error adding exit type: ${error.message}`);
//     } finally {
//       setSubmittingExitType(false);
//     }
//   };

//   const handleCloseEmployeeExitDialog = () => {
//     setOpenAddExitDialog(false);
//     setNewEmployeeExit({
//       employee: '',
//       exitDate: '',
//       exitType: '',
//       exitInterview: 'Yes',
//       disableAccount: 'Yes',
//       description: '',
//       file: null
//     });
//     setEditingExit(null); // Clear editing state
//   };

//   const handleCloseExitTypeDialog = () => {
//     setOpenAddExitTypeDialog(false);
//     setNewExitType('');
//     setSubmitExitTypeError(null);
//   };

//   const handleResetEmployeeExitForm = () => {
//     setNewEmployeeExit({
//       employee: editingExit ? editingExit.employee.name : '', // Keep current employee if editing
//       exitDate: editingExit ? convertToInputDate(editingExit.exitDate) : '',
//       exitType: editingExit ? editingExit.exitType : '',
//       exitInterview: editingExit ? editingExit.exitInterview : 'Yes',
//       disableAccount: editingExit ? editingExit.disableAccount : 'Yes',
//       description: editingExit ? (editingExit.description || '') : '',
//       file: null
//     });
//     // If an actual file input element exists and needs resetting visually:
//     const fileInput = document.getElementById('employee-exit-file-input');
//     if (fileInput) {
//       fileInput.value = '';
//     }
//   };

//   const handleExportEmployees = () => {
//     let csvContent = "data:text/csv;charset=utf-8,";
//     csvContent += "Employee Name,Employee Email,Exit Type,Exit Date,Exit Interview,Disable Account,Description\n";
    
//     employeeExits.forEach(exit => {
//       const row = [
//         `"${exit.employee.name.replace(/"/g, '""')}"`,
//         `"${exit.employee.email.replace(/"/g, '""')}"`,
//         `"${exit.exitType.replace(/"/g, '""')}"`,
//         exit.exitDate,
//         exit.exitInterview,
//         exit.disableAccount,
//         `"${(exit.description || '').replace(/"/g, '""')}"`
//       ].join(",");
//       csvContent += row + "\n";
//     });
    
//     const encodedUri = encodeURI(csvContent);
//     const link = document.createElement("a");
//     link.setAttribute("href", encodedUri);
//     link.setAttribute("download", "employee_exits.csv");
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };
  
//   const handleExitTypeSort = (key) => {
//     let direction = 'asc';
//     if (exitTypeSortConfig.key === key && exitTypeSortConfig.direction === 'asc') {
//       direction = 'desc';
//     }
//     setExitTypeSortConfig({ key, direction });
//   };

//   const filteredEmployeeExits = employeeExits.filter(exit => 
//     (exit.employee.name && exit.employee.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
//     (exit.exitType && exit.exitType.toLowerCase().includes(searchTerm.toLowerCase())) ||
//     (exit.exitDate && exit.exitDate.includes(searchTerm))
//   );

//   const sortedAndFilteredExitTypes = useMemo(() => {
//     let items = [...exitTypes];
//     if (exitTypeSearchTerm) {
//       items = items.filter(type => 
//         type.name && type.name.toLowerCase().includes(exitTypeSearchTerm.toLowerCase())
//       );
//     }
//     if (exitTypeSortConfig.key) {
//       items.sort((a, b) => {
//         if (a[exitTypeSortConfig.key] < b[exitTypeSortConfig.key]) {
//           return exitTypeSortConfig.direction === 'asc' ? -1 : 1;
//         }
//         if (a[exitTypeSortConfig.key] > b[exitTypeSortConfig.key]) {
//           return exitTypeSortConfig.direction === 'asc' ? 1 : -1;
//         }
//         return 0;
//       });
//     }
//     return items;
//   }, [exitTypes, exitTypeSearchTerm, exitTypeSortConfig]);

//   const paginatedEmployeeExits = filteredEmployeeExits.slice(
//     page * rowsPerPage,
//     page * rowsPerPage + rowsPerPage
//   );

//   const paginatedExitTypes = sortedAndFilteredExitTypes.slice(
//     exitTypePage * exitTypeRowsPerPage,
//     exitTypePage * exitTypeRowsPerPage + exitTypeRowsPerPage
//   );

//   return (
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
//       <Box sx={{ p: 3 }}>
//         <Paper elevation={3} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
//           <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, flexWrap: 'wrap', gap: 1 }}>
//             <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
//               List All Employee Exit
//             </Typography>
//             <Box sx={{display: 'flex', gap: 1, flexWrap: 'wrap'}}>
//               <Button
//                 variant="contained"
//                 onClick={() => setOpenAddExitTypeDialog(true)}
//                 sx={{ bgcolor: '#7c4dff', '&:hover': { bgcolor: '#6039c8' } }}
//               >
//                 + Exit Type
//               </Button>
//               <Button
//                 variant="contained"
//                 startIcon={<FileDownloadIcon />}
//                 onClick={handleExportEmployees}
//                 sx={{ bgcolor: '#4caf50', '&:hover': { bgcolor: '#388e3c' } }}
//               >
//                 Export Employees
//               </Button>
//               <Button
//                 variant="contained"
//                 onClick={() => { setEditingExit(null); setOpenAddExitDialog(true);}} // Ensure editingExit is null for new entry
//                 sx={{ bgcolor: '#7c4dff', '&:hover': { bgcolor: '#6039c8' } }}
//               >
//                 + Add New Exit
//               </Button>
//             </Box>
//           </Box>

//           <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, flexWrap: 'wrap', gap: 1 }}>
//             <Box sx={{ display: 'flex', alignItems: 'center' }}>
//               <Typography variant="body2" sx={{ mr: 1 }}>Show</Typography>
//               <FormControl size="small" sx={{ width: 80, mr: 1 }}>
//                 <Select
//                   value={rowsPerPage}
//                   onChange={handleChangeRowsPerPage}
//                 >
//                   <MenuItem value={10}>10</MenuItem>
//                   <MenuItem value={25}>25</MenuItem>
//                   <MenuItem value={50}>50</MenuItem>
//                 </Select>
//               </FormControl>
//               <Typography variant="body2">entries</Typography>
//             </Box>
//             <Box sx={{ display: 'flex', alignItems: 'center' }}>
//               <Typography variant="body2" sx={{ mr: 1 }}>Search</Typography>
//               <TextField 
//                 size="small" 
//                 value={searchTerm}
//                 onChange={handleSearch}
//                 placeholder='Search exits...'
//               />
//             </Box>
//           </Box>

//           <TableContainer>
//             <Table>
//               <TableHead>
//                 <TableRow>
//                   <TableCell>
//                     <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                       <PersonIcon fontSize="small" sx={{ mr: 0.5 }} />
//                       EMPLOYEE TO EXIT
//                       <IconButton size="small" title="Sort (not implemented for this column)"> 
//                         <SortIcon fontSize="small" />
//                       </IconButton>
//                     </Box>
//                   </TableCell>
//                   <TableCell>
//                     <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                       EXIT TYPE
//                       <IconButton size="small" title="Sort (not implemented for this column)">
//                         <SortIcon fontSize="small" />
//                       </IconButton>
//                     </Box>
//                   </TableCell>
//                   <TableCell>
//                     <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                       <CalendarTodayIcon fontSize="small" sx={{ mr: 0.5 }} />
//                       EXIT DATE
//                       <IconButton size="small" title="Sort (not implemented for this column)">
//                         <SortIcon fontSize="small" />
//                       </IconButton>
//                     </Box>
//                   </TableCell>
//                   <TableCell>EXIT INTERVIEW</TableCell>
//                   <TableCell>DISABLE ACCOUNT</TableCell>
//                   <TableCell>ACTIONS</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {paginatedEmployeeExits.length > 0 ? paginatedEmployeeExits.map((exit) => (
//                   <TableRow key={exit.id} hover>
//                     <TableCell>
//                       <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                         <Avatar src={exit.employee.avatar} alt={exit.employee.name} sx={{ mr: 1, width: 30, height: 30 }} />
//                         <Box>
//                           <Typography variant="body2" fontWeight="medium">{exit.employee.name}</Typography>
//                           <Typography variant="caption" color="textSecondary">{exit.employee.email}</Typography>
//                         </Box>
//                       </Box>
//                     </TableCell>
//                     <TableCell>{exit.exitType}</TableCell>
//                     <TableCell>{exit.exitDate}</TableCell>
//                     <TableCell>{exit.exitInterview}</TableCell>
//                     <TableCell>{exit.disableAccount}</TableCell>
//                     <TableCell>
//                       <IconButton size="small" color="primary" onClick={() => handleOpenEditEmployeeExitDialog(exit)} title="Edit">
//                         <EditIcon fontSize="small"/>
//                       </IconButton>
//                       <IconButton size="small" color="secondary" onClick={() => handleDeleteEmployeeExit(exit.id)} title="Delete">
//                         <DeleteIcon fontSize="small"/>
//                       </IconButton>
//                     </TableCell>
//                   </TableRow>
//                 )) : (
//                     <TableRow>
//                         <TableCell colSpan={6} align="center">No employee exits found.</TableCell>
//                     </TableRow>
//                 )}
//               </TableBody>
//             </Table>
//           </TableContainer>

//             {filteredEmployeeExits.length > 0 && (
//               <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2, flexWrap: 'wrap', gap: 1 }}>
//                 <Typography variant="body2">
//                   Showing {Math.min(page * rowsPerPage + 1, filteredEmployeeExits.length)} to {Math.min((page + 1) * rowsPerPage, filteredEmployeeExits.length)} of {filteredEmployeeExits.length} records
//                 </Typography>
//                 <Box sx={{ display: 'flex', gap: 0.5 }}>
//                   <Button 
//                     size="small"
//                     disabled={page === 0} 
//                     onClick={() => handleChangePage(null, page - 1)}
//                     sx={{ border: '1px solid #ddd' }}
//                   >
//                     Previous
//                   </Button>
//                   {[...Array(Math.ceil(filteredEmployeeExits.length / rowsPerPage))].map((_, i) => (
//                     <Button
//                       key={i}
//                       size="small"
//                       variant={page === i ? 'contained' : 'outlined'}
//                       onClick={() => handleChangePage(null, i)}
//                       sx={{
//                         minWidth: '36px',
//                         bgcolor: page === i ? 'primary.main' : 'transparent',
//                         color: page === i ? 'primary.contrastText' : 'text.primary',
//                         '&:hover': { bgcolor: page === i ? 'primary.dark' : 'action.hover' }
//                       }}
//                     >
//                       {i + 1}
//                     </Button>
//                   ))}
//                   <Button 
//                     size="small"
//                     disabled={page >= Math.ceil(filteredEmployeeExits.length / rowsPerPage) - 1} 
//                     onClick={() => handleChangePage(null, page + 1)}
//                      sx={{ border: '1px solid #ddd' }}
//                   >
//                     Next
//                   </Button>
//                 </Box>
//               </Box>
//             )}
//         </Paper>

//         <Dialog open={openAddExitDialog} onClose={handleCloseEmployeeExitDialog} maxWidth="md" fullWidth>
//           <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//             <Typography variant="h6">{editingExit ? 'Edit Employee Exit' : 'Add New Employee Exit'}</Typography>
//             <Button 
//               variant="contained" 
//               onClick={handleCloseEmployeeExitDialog}
//             >
//               Hide
//             </Button>
//           </DialogTitle>
//           <Divider />
//           <DialogContent>
//             <Grid container spacing={3}>
//               <Grid item xs={12} md={8}>
//                 <Grid container spacing={2}>
//                   <Grid item xs={12} md={6}>
//                     <FormControl fullWidth required>
//                       <InputLabel id="employee-to-exit-label">Employee to Exit</InputLabel>
//                       <Select
//                         labelId="employee-to-exit-label"
//                         label="Employee to Exit"
//                         value={newEmployeeExit.employee}
//                         onChange={(e) => handleEmployeeExitChange('employee', e.target.value)}
//                       >
//                         <MenuItem value=""><em>Select Employee</em></MenuItem>
//                         <MenuItem value="Hitesh Zhambare">Hitesh Zhambare</MenuItem>
//                         <MenuItem value="Avinash Raut">Avinash Raut</MenuItem>
//                         <MenuItem value="John Doe">John Doe</MenuItem>
//                         <MenuItem value="Jane Smith">Jane Smith</MenuItem>
//                       </Select>
//                     </FormControl>
//                   </Grid>
//                   <Grid item xs={12} md={6}>
//                     <TextField
//                       label="Exit Date"
//                       fullWidth
//                       required
//                       type="date"
//                       InputLabelProps={{ shrink: true }}
//                       value={newEmployeeExit.exitDate} // Should be YYYY-MM-DD
//                       onChange={(e) => handleEmployeeExitChange('exitDate', e.target.value)}
//                       InputProps={{
//                         endAdornment: (
//                           <InputAdornment position="end">
//                             <CalendarTodayIcon />
//                           </InputAdornment>
//                         )
//                       }}
//                     />
//                   </Grid>
//                   <Grid item xs={12} md={4}>
//                      <FormControl fullWidth required>
//                       <InputLabel id="exit-type-label">Exit Type</InputLabel>
//                       <Select
//                         labelId="exit-type-label"
//                         label="Exit Type"
//                         value={newEmployeeExit.exitType}
//                         onChange={(e) => handleEmployeeExitChange('exitType', e.target.value)}
//                       >
//                         <MenuItem value=""><em>Select Exit Type</em></MenuItem>
//                         {exitTypes.map((type) => (
//                           <MenuItem key={type.id} value={type.name}>{type.name}</MenuItem>
//                         ))}
//                       </Select>
//                     </FormControl>
//                   </Grid>
//                   <Grid item xs={12} md={4}>
//                     <FormControl fullWidth required>
//                       <InputLabel id="exit-interview-label">Exit Interview</InputLabel>
//                       <Select
//                         labelId="exit-interview-label"
//                         label="Exit Interview"
//                         value={newEmployeeExit.exitInterview}
//                         onChange={(e) => handleEmployeeExitChange('exitInterview', e.target.value)}
//                       >
//                         <MenuItem value="Yes">Yes</MenuItem>
//                         <MenuItem value="No">No</MenuItem>
//                       </Select>
//                     </FormControl>
//                   </Grid>
//                   <Grid item xs={12} md={4}>
//                     <FormControl fullWidth required>
//                       <InputLabel id="disable-account-label">Disable Account</InputLabel>
//                       <Select
//                         labelId="disable-account-label"
//                         label="Disable Account"
//                         value={newEmployeeExit.disableAccount}
//                         onChange={(e) => handleEmployeeExitChange('disableAccount', e.target.value)}
//                       >
//                         <MenuItem value="Yes">Yes</MenuItem>
//                         <MenuItem value="No">No</MenuItem>
//                       </Select>
//                     </FormControl>
//                   </Grid>
//                   <Grid item xs={12}>
//                     <TextField
//                       label="Description"
//                       fullWidth
//                       multiline
//                       rows={3}
//                       placeholder="Enter description..."
//                       value={newEmployeeExit.description}
//                       onChange={(e) => handleEmployeeExitChange('description', e.target.value)}
//                     />
//                   </Grid>
//                 </Grid>
//               </Grid>
//               <Grid item xs={12} md={4}>
//                 <Paper variant="outlined" sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
//                     <Typography variant="subtitle1" gutterBottom>
//                         {editingExit ? 'Change' : 'Upload'} Employee Avatar / Attachment
//                     </Typography>
//                     {editingExit && editingExit.employee.avatar && editingExit.employee.avatar !== '/user-image.png' && !newEmployeeExit.file && (
//                         <Box sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1}}>
//                         <Typography variant="body2">Current:</Typography>
//                         <Avatar src={editingExit.employee.avatar} alt="Current avatar" sx={{width: 40, height: 40}}/>
//                         </Box>
//                     )}
//                      {newEmployeeExit.file && (
//                         <Box sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1}}>
//                             <Typography variant="body2">New:</Typography>
//                             <Avatar src={URL.createObjectURL(newEmployeeExit.file)} alt="New avatar preview" sx={{width: 40, height: 40}}/>
//                         </Box>
//                     )}
//                     <Button
//                         variant="outlined"
//                         component="label"
//                         fullWidth
//                         sx={{ mb: 1, mt: 'auto' }} // Push to bottom if content is sparse
//                     >
//                         {newEmployeeExit.file ? `File: ${newEmployeeExit.file.name}` : 'Browse File'}
//                         <input
//                         id="employee-exit-file-input" // Added ID for potential reset
//                         type="file"
//                         hidden
//                         onChange={handleFileUpload}
//                         accept=".jpg,.jpeg,.png,.gif"
//                         />
//                     </Button>
//                     {newEmployeeExit.file && (
//                         <Button 
//                             size="small" 
//                             onClick={() => {
//                                 handleEmployeeExitChange('file', null);
//                                 const fileInput = document.getElementById('employee-exit-file-input');
//                                 if (fileInput) fileInput.value = ''; // Attempt to reset file input
//                             }}
//                             color="secondary"
//                             sx={{alignSelf: 'flex-start'}}
//                         >
//                             Remove selected file
//                         </Button>
//                     )}
//                     <Typography variant="caption" color="textSecondary" display="block" mt={1}>
//                         Allowed: GIF, PNG, JPG, JPEG. Max 2MB.
//                     </Typography>
//                 </Paper>
//               </Grid>
//             </Grid>
//           </DialogContent>
//           <Divider />
//           <DialogActions sx={{ p: 2, justifyContent: 'flex-end' }}>
//             <Button 
//               onClick={handleResetEmployeeExitForm} 
//               sx={{ mr: 1, color: 'text.secondary', borderColor: 'divider' }}
//               variant="outlined"
//             >
//               Reset
//             </Button>
//             <Button 
//               variant="contained" 
//               onClick={handleSubmitEmployeeExit}
//             >
//               {editingExit ? 'Update Employee Exit' : 'Save Employee Exit'}
//             </Button>
//           </DialogActions>
//         </Dialog>

//         <Dialog open={openAddExitTypeDialog} onClose={handleCloseExitTypeDialog} maxWidth="lg" fullWidth>
//             <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                 Manage Exit Types
//                 <Button onClick={handleCloseExitTypeDialog}>Close</Button>
//             </DialogTitle>
//             <DialogContent dividers sx={{ p: 0 }}>
//             <Grid container>
//               <Grid item xs={12} md={4} sx={{borderRight: {md: '1px solid #eee'} }}>
//                 <Box sx={{ p: 3}}>
//                   <Typography variant="h6" sx={{ mb: 2 }}>
//                     Add New Exit Type
//                   </Typography>
//                   <FormControl fullWidth sx={{ mb: 2 }}>
//                     <TextField
//                       required
//                       label="Exit Type Name"
//                       placeholder="Enter exit type name"
//                       value={newExitType}
//                       onChange={(e) => setNewExitType(e.target.value)}
//                       disabled={submittingExitType}
//                     />
//                   </FormControl>
//                   {submitExitTypeError && (
//                     <Typography color="error" variant="body2" sx={{mb:1}}>{submitExitTypeError}</Typography>
//                   )}
//                   <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
//                     <Button 
//                       variant="contained" 
//                       onClick={handleSubmitExitType}
//                       disabled={submittingExitType}
//                     >
//                       {submittingExitType ? <CircularProgress size={24} color="inherit" /> : 'Save Exit Type'}
//                     </Button>
//                   </Box>
//                 </Box>
//               </Grid>
//               <Grid item xs={12} md={8}>
//                 <Box sx={{ p: 3 }}>
//                   <Typography variant="h6" sx={{ mb: 2 }}>
//                     List All Exit Types
//                   </Typography>
//                   <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, flexWrap: 'wrap', gap:1 }}>
//                     <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                       <Typography variant="body2" sx={{ mr: 1 }}>Show</Typography>
//                       <FormControl size="small" sx={{ width: 80, mr: 1 }}>
//                         <Select
//                           value={exitTypeRowsPerPage}
//                           onChange={handleExitTypeChangeRowsPerPage}
//                         >
//                           <MenuItem value={10}>10</MenuItem>
//                           <MenuItem value={25}>25</MenuItem>
//                           <MenuItem value={50}>50</MenuItem>
//                         </Select>
//                       </FormControl>
//                       <Typography variant="body2">entries</Typography>
//                     </Box>
//                     <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                       <Typography variant="body2" sx={{ mr: 1 }}>Search</Typography>
//                       <TextField 
//                         size="small" 
//                         value={exitTypeSearchTerm}
//                         onChange={handleExitTypeSearch}
//                         placeholder='Search exit types...'
//                       />
//                     </Box>
//                   </Box>
//                   {loadingExitTypes ? (
//                     <Box sx={{display: 'flex', justifyContent: 'center', p: 3}}><CircularProgress /></Box>
//                   ) : exitTypesError ? (
//                     <Typography color="error" sx={{p:2}}>Error: {exitTypesError} <Button onClick={fetchExitTypes}>Retry</Button></Typography>
//                   ) : (
//                   <>
//                   <TableContainer component={Paper} variant="outlined">
//                     <Table size="small">
//                       <TableHead>
//                         <TableRow>
//                           <TableCell>
//                             <TableSortLabel
//                               active={exitTypeSortConfig.key === 'name'}
//                               direction={exitTypeSortConfig.key === 'name' ? exitTypeSortConfig.direction : 'asc'}
//                               onClick={() => handleExitTypeSort('name')}
//                             >
//                                 EXIT TYPE
//                             </TableSortLabel>
//                           </TableCell>
//                           <TableCell>
//                             <TableSortLabel
//                                 active={exitTypeSortConfig.key === 'createdAt'}
//                                 direction={exitTypeSortConfig.key === 'createdAt' ? exitTypeSortConfig.direction : 'asc'}
//                                 onClick={() => handleExitTypeSort('createdAt')}
//                             >
//                                 CREATED AT
//                             </TableSortLabel>
//                           </TableCell>
//                         </TableRow>
//                       </TableHead>
//                       <TableBody>
//                         {paginatedExitTypes.length > 0 ? paginatedExitTypes.map((type) => (
//                           <TableRow key={type.id} hover>
//                             <TableCell>{type.name}</TableCell>
//                             <TableCell>{type.createdAt}</TableCell>
//                           </TableRow>
//                         )) : (
//                             <TableRow>
//                                 <TableCell colSpan={2} align="center">No exit types found.</TableCell>
//                             </TableRow>
//                         )}
//                       </TableBody>
//                     </Table>
//                   </TableContainer>
//                     {sortedAndFilteredExitTypes.length > 0 && (
//                         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2, flexWrap:'wrap', gap:1 }}>
//                         <Typography variant="body2">
//                             Showing {Math.min(exitTypePage * exitTypeRowsPerPage + 1, sortedAndFilteredExitTypes.length)} to {Math.min((exitTypePage + 1) * exitTypeRowsPerPage, sortedAndFilteredExitTypes.length)} of {sortedAndFilteredExitTypes.length} records
//                         </Typography>
//                         <Box sx={{ display: 'flex', gap: 0.5 }}>
//                             <Button 
//                             size="small"
//                             disabled={exitTypePage === 0} 
//                             onClick={() => handleExitTypeChangePage(null, exitTypePage - 1)}
//                             sx={{ border: '1px solid #ddd' }}
//                             >
//                             Previous
//                             </Button>
//                             {[...Array(Math.ceil(sortedAndFilteredExitTypes.length / exitTypeRowsPerPage))].map((_, i) => (
//                             <Button
//                                 key={i}
//                                 size="small"
//                                 variant={exitTypePage === i ? 'contained' : 'outlined'}
//                                 onClick={() => handleExitTypeChangePage(null, i)}
//                                 sx={{
//                                 minWidth: '36px',
//                                 bgcolor: exitTypePage === i ? 'primary.main' : 'transparent',
//                                 color: exitTypePage === i ? 'primary.contrastText' : 'text.primary',
//                                 '&:hover': { bgcolor: page === i ? 'primary.dark' : 'action.hover' } // Corrected: exitTypePage === i
//                                 }}
//                             >
//                                 {i + 1}
//                             </Button>
//                             ))}
//                             <Button 
//                             size="small"
//                             disabled={exitTypePage >= Math.ceil(sortedAndFilteredExitTypes.length / exitTypeRowsPerPage) - 1} 
//                             onClick={() => handleExitTypeChangePage(null, exitTypePage + 1)}
//                             sx={{ border: '1px solid #ddd' }}
//                             >
//                             Next
//                             </Button>
//                         </Box>
//                         </Box>
//                     )}
//                   </>
//                   )}
//                 </Box>
//               </Grid>
//             </Grid>
//           </DialogContent>
//         </Dialog>
//       </Box>
//     </ThemeProvider>
//   );
// }

// export default EmployeeExitManagement;



import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Edit, Delete } from '@mui/icons-material';
import axiosInstance from '../../utils/axiosInstance'; // Ensure this path is correct
import {
  ThemeProvider,
  createTheme,
  Box,
  Paper,
  Typography,
  Button,
  IconButton,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Grid,
  Chip,
  Divider,
  CssBaseline,
  InputAdornment,
  CircularProgress,
  TableSortLabel,
} from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PersonIcon from '@mui/icons-material/Person';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

// API Configuration
const API_BASE_URL = 'https://tdtlworld.com/hrms-backend/api';
const EXIT_TYPE_API_URL = `${API_BASE_URL}/exit-type/`;
const EMPLOYEE_DROPDOWN_API_URL = 'https://tdtlworld.com/hrms-backend/employee-dropdown/';

// Create theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#7c4dff',
    },
    secondary: {
      main: '#f50057',
    },
    success: { // Added for status chip
        main: '#4caf50', 
    },
    warning: { // Added for status chip
        main: '#ff9800',
    },
    background: {
      default: '#f5f5f9',
    },
  },
  components: {
    MuiTableCell: {
      styleOverrides: {
        head: {
          fontWeight: 'bold',
          backgroundColor: '#f5f5f5',
        },
      },
    },
  },
});

// Utility function for formatting date
const formatDate = (dateString) => {
  if (!dateString) return 'N/A'; 
  if (/^\d{2}\/\d{2}\/\d{4}$/.test(dateString)) {
    return dateString;
  }
  try {
    let date;
    if (typeof dateString === 'string') {
        if (dateString.includes(' ')) { 
            date = new Date(dateString.replace(' ', 'T')); 
             if (isNaN(date.getTime())) { 
                const parts = dateString.split(' ');
                const dateParts = parts[0].split('-');
                const timeParts = parts[1] ? parts[1].split(':') : [0,0,0];
                date = new Date(Date.UTC(
                    parseInt(dateParts[0], 10), 
                    parseInt(dateParts[1], 10) - 1, 
                    parseInt(dateParts[2], 10),
                    parseInt(timeParts[0], 10),
                    parseInt(timeParts[1], 10),
                    parseInt(timeParts[2], 10)
                ));
            }
        } else if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) { 
            const parts = dateString.split('-');
            date = new Date(Date.UTC(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10)));
        } else {
            date = new Date(dateString); 
        }
    } else {
        date = new Date(dateString); 
    }
    if (isNaN(date.getTime())) {
        return dateString; 
    }
    const day = date.getUTCDate().toString().padStart(2, '0');
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
    const year = date.getUTCFullYear();
    return `${day}/${month}/${year}`;
  } catch (error) {
    return dateString;
  }
};

// Helper function to capitalize strings like 'yes' to 'Yes'
const capitalize = (s) => {
    if (typeof s !== 'string' || !s) return '';
    return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
};

// Helper function for Status Chip
const getStatusChip = (statusValue) => {
    // IMPORTANT: Adjust this logic based on your actual status values from API
    // For demonstration, using a placeholder logic based on exit_id or a 'status' field if available.
    // If your API returns 'approved', 'pending', etc., use that.
    
    // Example: if statusValue is directly 'Approved' or 'Pending'
    const statusText = capitalize(statusValue || 'Pending'); // Default to Pending if undefined

    let color = 'default';
    if (statusText === 'Approved') {
        color = 'success';
    } else if (statusText === 'Pending') {
        color = 'warning';
    } else if (statusText === 'Rejected') {
        color = 'error';
    }

    return <Chip label={statusText} color={color} size="small" />;
};


function EmployeeExitManagementHr() {
  const [hoveredRow, setHoveredRow] = useState(null);

  const [exitTypes, setExitTypes] = useState([]);
  const [loadingExitTypes, setLoadingExitTypes] = useState(true);
  const [exitTypesError, setExitTypesError] = useState(null);
  const [submittingExitType, setSubmittingExitType] = useState(false);
  const [submitExitTypeError, setSubmitExitTypeError] = useState(null);
  const [exitTypeSortConfig, setExitTypeSortConfig] = useState({ key: 'name', direction: 'asc' });

  const [employeesDropdownData, setEmployeesDropdownData] = useState([]);
  const [loadingEmployeesDropdown, setLoadingEmployeesDropdown] = useState(true);
  const [employeesDropdownError, setEmployeesDropdownError] = useState(null);

  const [employeeExits, setEmployeeExits] = useState([]);
  const [loadingExits, setLoadingExits] = useState(true);
  const [exitError, setExitError] = useState(null);

  const [openAddExitDialog, setOpenAddExitDialog] = useState(false);
  const [openAddExitTypeDialog, setOpenAddExitTypeDialog] = useState(false);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10); 
  
  const [exitTypePage, setExitTypePage] = useState(0);
  const [exitTypeRowsPerPage, setExitTypeRowsPerPage] = useState(10); 

  const [searchTerm, setSearchTerm] = useState('');
  const [exitTypeSearchTerm, setExitTypeSearchTerm] = useState('');

  const initialEmployeeExitState = {
    employeeId: '', exitDate: '', exitTypeId: '',
    exitInterview: 'Yes', disableAccount: 'Yes',
    description: '', file: null, currentEditingId: null, 
  };

  const [newEmployeeExit, setNewEmployeeExit] = useState(initialEmployeeExitState);
  const [newExitType, setNewExitType] = useState('');

  const fetchExitTypes = useCallback(async () => {
    setLoadingExitTypes(true);
    setExitTypesError(null);
    try {
      const response = await axiosInstance.get(EXIT_TYPE_API_URL);
      const transformedData = response.data.map(item => ({
        id: item.value, name: item.label, createdAt: formatDate(item.created_at),
      }));
      setExitTypes(transformedData);
    } catch (error) {
      console.error("Failed to fetch exit types:", error.response?.data || error.message);
      setExitTypesError(error.response?.data?.detail || error.message || "Failed to load exit types.");
    } finally {
      setLoadingExitTypes(false);
    }
  }, []); 

  const fetchEmployeesDropdown = useCallback(async () => {
    setLoadingEmployeesDropdown(true);
    setEmployeesDropdownError(null);
    try {
        const response = await axiosInstance.get(EMPLOYEE_DROPDOWN_API_URL);
        setEmployeesDropdownData(response.data || []);
    } catch (error) {
        console.error("Failed to fetch employees dropdown:", error.response?.data || error.message);
        setEmployeesDropdownError(error.response?.data?.detail || error.message || "Failed to load employee list.");
    } finally {
        setLoadingEmployeesDropdown(false);
    }
  }, []);

  useEffect(() => {
    fetchExitTypes();
    fetchEmployeesDropdown();
  }, [fetchExitTypes, fetchEmployeesDropdown]);

  const fetchEmployeeExits = async () => {
    setLoadingExits(true);
    try {
      const response = await axiosInstance.get('/employee-exits/');
      // Assuming 'status' might come from API, if not, placeholder logic in getStatusChip will apply
      setEmployeeExits(response.data);
      setExitError(null);
    } catch (error) {
      console.error('Error fetching employee exits:', error.response?.data || error.message);
      setExitError(error.response?.data?.detail || error.message || 'Failed to load employee exits');
    } finally {
      setLoadingExits(false);
    }
  };

  useEffect(() => {
    fetchEmployeeExits();
  }, []);

  const handleOpenEditDialog = (exitToEdit) => {
    setNewEmployeeExit({
      employeeId: exitToEdit.employee_id?.toString() || '',
      exitDate: exitToEdit.exit_date ? exitToEdit.exit_date.split('T')[0] : '', 
      exitTypeId: exitToEdit.exit_type_id?.toString() || '',
      exitInterview: capitalize(exitToEdit.exit_interview) || 'Yes', 
      disableAccount: capitalize(exitToEdit.is_inactivate_account) || 'Yes',
      description: exitToEdit.reason || '', // Keep reason for edit form, though not in table
      file: null, currentEditingId: exitToEdit.exit_id,
    });
    setOpenAddExitDialog(true);
  };
  
  const handleSubmitEmployeeExit = async () => {
    const isEditMode = !!newEmployeeExit.currentEditingId;
    if (!isEditMode && !newEmployeeExit.employeeId) { alert('Please select an Employee.'); return; }
    if (!newEmployeeExit.exitDate) { alert('Please select an Exit Date.'); return; }
    if (!newEmployeeExit.exitTypeId) { alert('Please select an Exit Type.'); return; }

    const selectedExitType = exitTypes.find(type => type.id.toString() === newEmployeeExit.exitTypeId.toString());
    const exitTypeNameForPayload = selectedExitType ? selectedExitType.name : '';

    if (isEditMode) {
      const updatePayload = {
          exit_date: newEmployeeExit.exitDate, 
          exit_type_id: parseInt(newEmployeeExit.exitTypeId),
          exit_type_name: exitTypeNameForPayload, 
          reason: newEmployeeExit.description, // Keep reason for PATCH if backend expects it
          accountability_to: "0", 
          // If exit_interview and is_inactivate_account are updatable via PATCH
          exit_interview: newEmployeeExit.exitInterview.toLowerCase(),
          is_inactivate_account: newEmployeeExit.disableAccount.toLowerCase(),
      };
      try {
        await axiosInstance.patch(`/employee-exits/${newEmployeeExit.currentEditingId}/`, updatePayload);
        alert('Employee Exit updated successfully.');
        fetchEmployeeExits(); handleCloseEmployeeExitDialog();
      } catch (error) {
        console.error('Error updating employee exit:', error.response?.data || error.message);
        alert(`Failed to update employee exit. ${error.response?.data?.detail || error.message || ''}`);
      }
    } else {
      const createPayload = {
        employee_id: parseInt(newEmployeeExit.employeeId), exit_date: newEmployeeExit.exitDate, 
        exit_type_id: parseInt(newEmployeeExit.exitTypeId), exit_type_name: exitTypeNameForPayload,
        sub_exit_type_id: null, exit_interview: newEmployeeExit.exitInterview.toLowerCase(), 
        is_inactivate_account: newEmployeeExit.disableAccount.toLowerCase(), 
        reason: newEmployeeExit.description, accountability_to: "0", added_by: 2 
      };
      try {
        await axiosInstance.post('/employee-exits/', createPayload);
        alert('Employee Exit added successfully.');
        fetchEmployeeExits(); handleCloseEmployeeExitDialog(); 
      } catch (error) {
        console.error('Error adding employee exit:', error.response?.data || error.message);
        alert(`Failed to add employee exit. ${error.response?.data?.detail || error.message || ''}`);
      }
    }
  };
  
  const handleDeleteExit = async (exitId) => {
    if (!window.confirm('Are you sure you want to delete this employee exit?')) return;
    try {
      await axiosInstance.delete(`/employee-exits/${exitId}/`);
      alert('Employee Exit deleted successfully.'); fetchEmployeeExits(); 
    } catch (error) {
      console.error('Error deleting employee exit:', error.response?.data || error.message);
      alert(`Failed to delete employee exit. ${error.response?.data?.detail || error.message || ''}`);
    }
  };

  const handleCloseEmployeeExitDialog = () => { setOpenAddExitDialog(false); setNewEmployeeExit(initialEmployeeExitState); };
  const handleCloseExitTypeDialog = () => { setOpenAddExitTypeDialog(false); setNewExitType(''); setSubmitExitTypeError(null); };
  
  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => { 
    setRowsPerPage(parseInt(event.target.value, 10)); 
    setPage(0); 
  };
  
  const handleExitTypeChangePage = (event, newPage) => setExitTypePage(newPage);
  const handleExitTypeChangeRowsPerPage = (event) => { 
    setExitTypeRowsPerPage(parseInt(event.target.value, 10)); 
    setExitTypePage(0);
  };

  const handleSearch = (e) => { setSearchTerm(e.target.value); setPage(0); };
  const handleExitTypeSearch = (e) => { setExitTypeSearchTerm(e.target.value); setExitTypePage(0); };
  const handleEmployeeExitChange = (field, value) => setNewEmployeeExit(prev => ({ ...prev, [field]: value }));

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
        if (file.size <= 2 * 1024 * 1024) { setNewEmployeeExit(prev => ({ ...prev, file: file })); }
        else { alert('File size exceeds 2MB limit.'); e.target.value = null; }
      } else { alert('Please upload only .gif, .png, .jpg, .jpeg files'); e.target.value = null; }
    }
  };
 
  const handleSubmitExitType = async () => {
    if (!newExitType.trim()) { setSubmitExitTypeError('Exit Type name is required.'); return; }
    setSubmittingExitType(true); setSubmitExitTypeError(null);
    try {
      await axiosInstance.post(EXIT_TYPE_API_URL, { category_name: newExitType.trim() });
      alert('Exit type added successfully!'); 
      setNewExitType(''); 
      fetchExitTypes(); 
    } catch (error) {
      console.error("Failed to submit exit type:", error.response?.data || error.message);
      setSubmitExitTypeError(error.response?.data?.detail || error.response?.data?.category_name?.[0] || error.message || "Failed to add exit type.");
    } finally { setSubmittingExitType(false); }
  };
 
  const handleResetEmployeeExitForm = () => setNewEmployeeExit(initialEmployeeExitState);

  const handleExportEmployees = () => {
    let csvContent = "data:text/csv;charset=utf-8,";
    // Updated headers
    csvContent += "Employee Name,Employee Email,Exit Type,Exit Date,Exit Interview,Disable Account,Status\n"; 
    const exitsToExport = filteredEmployeeExits; 
    exitsToExport.forEach(exit => {
      // Placeholder for actual status; adjust if API provides it
      const status = exit.status || (exit.exit_id % 2 === 0 ? 'Approved' : 'Pending'); 
      const row = [
        `"${(exit.employee_name || '').replace(/"/g, '""')}"`, 
        `""`, // Employee Email placeholder
        `"${(exit.exit_type_name || '').replace(/"/g, '""')}"`,
        `"${formatDate(exit.exit_date || '')}"`, 
        `"${capitalize(exit.exit_interview || '')}"`, 
        `"${capitalize(exit.is_inactivate_account || '')}"`,
        `"${status}"`, // Using the determined status
        // `"${(exit.reason || '').replace(/"/g, '""')}"` // Reason removed
      ].join(",");
      csvContent += row + "\n";
    });
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri); link.setAttribute("download", "employee_exits.csv");
    document.body.appendChild(link); link.click(); document.body.removeChild(link);
  };
  
  const handleExitTypeSort = (key) => {
    let direction = 'asc';
    if (exitTypeSortConfig.key === key && exitTypeSortConfig.direction === 'asc') { direction = 'desc'; }
    setExitTypeSortConfig({ key, direction });
  };

  const filteredEmployeeExits = useMemo(() => employeeExits.filter(exit => 
    (exit.employee_name && exit.employee_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (exit.exit_type_name && exit.exit_type_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (exit.exit_date && formatDate(exit.exit_date).toLowerCase().includes(searchTerm.toLowerCase())) || 
    (capitalize(exit.exit_interview || '').toLowerCase().includes(searchTerm.toLowerCase())) ||
    (capitalize(exit.is_inactivate_account || '').toLowerCase().includes(searchTerm.toLowerCase())) ||
    // Add search for status if needed, e.g., (exit.status && exit.status.toLowerCase().includes(searchTerm.toLowerCase()))
    (exit.reason && exit.reason.toLowerCase().includes(searchTerm.toLowerCase())) // Kept reason in search if it's still a filterable field internally
  ), [employeeExits, searchTerm]);

  const sortedAndFilteredExitTypes = useMemo(() => {
    let items = [...exitTypes];
    if (exitTypeSearchTerm) {
      items = items.filter(type => type.name && type.name.toLowerCase().includes(exitTypeSearchTerm.toLowerCase()));
    }
    if (exitTypeSortConfig.key) {
      items.sort((a, b) => {
        const valA = a[exitTypeSortConfig.key] || ''; const valB = b[exitTypeSortConfig.key] || '';
        if (valA < valB) return exitTypeSortConfig.direction === 'asc' ? -1 : 1;
        if (valA > valB) return exitTypeSortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return items;
  }, [exitTypes, exitTypeSearchTerm, exitTypeSortConfig]);

  const paginatedEmployeeExits = filteredEmployeeExits.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  const paginatedExitTypes = sortedAndFilteredExitTypes.slice(exitTypePage * exitTypeRowsPerPage, exitTypePage * exitTypeRowsPerPage + exitTypeRowsPerPage);

  const totalPages = Math.ceil(filteredEmployeeExits.length / rowsPerPage);
  const totalExitTypePages = Math.ceil(sortedAndFilteredExitTypes.length / exitTypeRowsPerPage);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ p: 3 }}>
        <Paper elevation={3} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, flexWrap: 'wrap', gap: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>List All Employee Exit</Typography>
            <Box sx={{display: 'flex', gap: 1, flexWrap: 'wrap'}}>
              <Button variant="contained" onClick={() => setOpenAddExitTypeDialog(true)} sx={{ bgcolor: '#7c4dff', '&:hover': { bgcolor: '#6039c8' } }}>+ Exit Type</Button>
              <Button variant="contained" startIcon={<FileDownloadIcon />} onClick={handleExportEmployees} sx={{ bgcolor: '#4caf50', '&:hover': { bgcolor: '#388e3c' } }}>Export Employees</Button>
              <Button variant="contained" onClick={() => { setNewEmployeeExit(initialEmployeeExitState); setOpenAddExitDialog(true);}} sx={{ bgcolor: '#7c4dff', '&:hover': { bgcolor: '#6039c8' } }}>+ Add New Exit</Button>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, flexWrap: 'wrap', gap: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="body2" sx={{ mr: 1 }}>Show</Typography>
              <FormControl size="small" sx={{ width: 80, mr: 1 }}>
                <Select value={rowsPerPage} onChange={handleChangeRowsPerPage}>
                  <MenuItem value={5}>5</MenuItem>
                  <MenuItem value={10}>10</MenuItem>
                  <MenuItem value={25}>25</MenuItem>
                  <MenuItem value={50}>50</MenuItem>
                </Select>
              </FormControl>
              <Typography variant="body2">entries</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="body2" sx={{ mr: 1 }}>Search</Typography>
              <TextField size="small" value={searchTerm} onChange={handleSearch} placeholder='Search exits...'/>
            </Box>
          </Box>
          <TableContainer>
            <Table>
              <TableHead>
                 <TableRow>
                    <TableCell><Box sx={{ display: 'flex', alignItems: 'center' }}><PersonIcon fontSize="small" sx={{ mr: 0.5 }} />EMPLOYEE</Box></TableCell>
                    <TableCell><Box sx={{ display: 'flex', alignItems: 'center' }}>EXIT TYPE</Box></TableCell>
                    <TableCell><Box sx={{ display: 'flex', alignItems: 'center' }}><CalendarTodayIcon fontSize="small" sx={{ mr: 0.5 }} />EXIT DATE</Box></TableCell>
                    <TableCell>EXIT INTERVIEW</TableCell>
                    <TableCell>DISABLE ACCOUNT</TableCell>
                    <TableCell>STATUS</TableCell>
                    <TableCell>ACTIONS</TableCell>
                  </TableRow>
              </TableHead>
              <TableBody>
                {loadingExits ? (<TableRow><TableCell colSpan={7} align="center"><CircularProgress /></TableCell></TableRow>
                ) : exitError ? (<TableRow><TableCell colSpan={7} align="center" sx={{color: 'error.main'}}>{exitError}. <Button onClick={fetchEmployeeExits} size="small">Retry</Button></TableCell></TableRow>
                ) : paginatedEmployeeExits.length > 0 ? (
                  paginatedEmployeeExits.map((exit) => (
                    <TableRow key={exit.exit_id} hover onMouseEnter={() => setHoveredRow(exit.exit_id)} onMouseLeave={() => setHoveredRow(null)} sx={{ '&:hover': { backgroundColor: 'action.hover' } }}>
                      <TableCell>{exit.employee_name}</TableCell>
                      <TableCell>{exit.exit_type_name}</TableCell>
                      <TableCell>{formatDate(exit.exit_date)}</TableCell>
                      <TableCell>{capitalize(exit.exit_interview)}</TableCell>
                      <TableCell>{capitalize(exit.is_inactivate_account)}</TableCell>
                      <TableCell>
                        {/* 
                          Placeholder for status. 
                          Replace `exit.status || (exit.exit_id % 2 === 0 ? 'Approved' : 'Pending')` 
                          with actual status logic from your API data, e.g., `exit.status_name` or similar.
                        */}
                        {getStatusChip(exit.status || (exit.exit_id % 2 === 0 ? 'Approved' : 'Pending'))}
                      </TableCell>
                      <TableCell>
                        <IconButton size="small" onClick={() => handleOpenEditDialog(exit)} title="Edit"><Edit fontSize="small" /></IconButton>
                        <IconButton size="small" onClick={() => handleDeleteExit(exit.exit_id)} title="Delete"><Delete fontSize="small" /></IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (<TableRow><TableCell colSpan={7} align="center">No employee exits found.</TableCell></TableRow>)}
              </TableBody>
            </Table>
          </TableContainer>
            {filteredEmployeeExits.length > 0 && (
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', mt: 2, gap: 1 }}>
                <Button size="small" disabled={page === 0} onClick={(e) => handleChangePage(e, page - 1)} sx={{ border: '1px solid #ddd' }}>Previous</Button>
                <Typography variant="body2">Page {page + 1} of {totalPages}</Typography>
                <Button size="small" disabled={page >= totalPages - 1} onClick={(e) => handleChangePage(e, page + 1)} sx={{ border: '1px solid #ddd' }}>Next</Button>
              </Box>
            )}
        </Paper>

        <Dialog open={openAddExitDialog} onClose={handleCloseEmployeeExitDialog} maxWidth="md" fullWidth>
          <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6">{newEmployeeExit.currentEditingId ? 'Edit Employee Exit' : 'Add New Employee Exit'}</Typography>
            <Button variant="outlined" onClick={handleCloseEmployeeExitDialog}>Close</Button>
          </DialogTitle>
          <Divider />
          <DialogContent>
            <Grid container spacing={3}>
              <Grid item xs={12} md={8}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                  <FormControl fullWidth required={!newEmployeeExit.currentEditingId} disabled={!!newEmployeeExit.currentEditingId || loadingEmployeesDropdown}>
                    <InputLabel id="employee-label">Employee</InputLabel>
                    <Select labelId="employee-label" label="Employee" value={newEmployeeExit.employeeId} onChange={(e) => handleEmployeeExitChange('employeeId', e.target.value)}>
                        <MenuItem value=""><em>{loadingEmployeesDropdown ? "Loading employees..." : employeesDropdownError ? employeesDropdownError : "Select Employee"}</em></MenuItem>
                        {!loadingEmployeesDropdown && !employeesDropdownError && employeesDropdownData.map((emp) => (<MenuItem key={emp.value} value={emp.value.toString()}>{emp.label}</MenuItem>))}
                    </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField label="Exit Date" fullWidth required type="date" InputLabelProps={{ shrink: true }} value={newEmployeeExit.exitDate} onChange={(e) => handleEmployeeExitChange('exitDate', e.target.value)} InputProps={{endAdornment: (<InputAdornment position="end"><CalendarTodayIcon /></InputAdornment>)}}/>
                  </Grid>
                  <Grid item xs={12} md={4}>
                  <FormControl fullWidth required disabled={loadingExitTypes}>
                    <InputLabel id="exit-type-label">Exit Type</InputLabel>
                    <Select labelId="exit-type-label" label="Exit Type" value={newEmployeeExit.exitTypeId} onChange={(e) => handleEmployeeExitChange('exitTypeId', e.target.value)}>
                        <MenuItem value=""><em>{loadingExitTypes ? "Loading types..." : exitTypesError ? "Error loading types" : "Select Exit Type"}</em></MenuItem>
                        {!loadingExitTypes && !exitTypesError && exitTypes.map((type) => (<MenuItem key={type.id} value={type.id.toString()}>{type.name}</MenuItem>))}
                    </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <FormControl fullWidth required>
                      <InputLabel id="exit-interview-label">Exit Interview</InputLabel>
                      <Select labelId="exit-interview-label" label="Exit Interview" value={newEmployeeExit.exitInterview} onChange={(e) => handleEmployeeExitChange('exitInterview', e.target.value)} >
                        <MenuItem value="Yes">Yes</MenuItem><MenuItem value="No">No</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <FormControl fullWidth required>
                      <InputLabel id="disable-account-label">Disable Account</InputLabel>
                      <Select labelId="disable-account-label" label="Disable Account" value={newEmployeeExit.disableAccount} onChange={(e) => handleEmployeeExitChange('disableAccount', e.target.value)}>
                        <MenuItem value="Yes">Yes</MenuItem><MenuItem value="No">No</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField label="Description / Reason" fullWidth multiline rows={3} placeholder="Enter description or reason for exit..." value={newEmployeeExit.description} onChange={(e) => handleEmployeeExitChange('description', e.target.value)}/>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} md={4}>
                <Paper variant="outlined" sx={{ p: 2, height: '100%' }}>
                  <Typography variant="subtitle1" gutterBottom>Exit Contract / Attachment</Typography>
                    <TextField fullWidth disabled size="small" placeholder="No file chosen" value={newEmployeeExit.file ? newEmployeeExit.file.name : ''} sx={{ mb: 1 }} InputProps={{startAdornment: newEmployeeExit.file ? (<InputAdornment position="start"><Chip size="small" label={newEmployeeExit.file.name} onDelete={() => handleEmployeeExitChange('file', null)}/></InputAdornment>) : null,}}/>
                    <Button variant="outlined" component="label" fullWidth>Browse File<input type="file" hidden onChange={handleFileUpload} accept=".jpg,.jpeg,.png,.gif"/></Button>
                  <Typography variant="caption" color="textSecondary" display="block" mt={1}>Allowed: GIF, PNG, JPG, JPEG. Max 2MB.</Typography>
                </Paper>
              </Grid>
            </Grid>
          </DialogContent>
          <Divider />
          <DialogActions sx={{ p: 2, justifyContent: 'flex-end' }}>
            <Button onClick={handleResetEmployeeExitForm} sx={{ mr: 1, color: 'text.secondary', borderColor: 'divider' }} variant="outlined">Reset</Button>
            <Button variant="contained" onClick={handleSubmitEmployeeExit}>{newEmployeeExit.currentEditingId ? 'Update Employee Exit' : 'Save Employee Exit'}</Button>
          </DialogActions>
        </Dialog>

        <Dialog open={openAddExitTypeDialog} onClose={handleCloseExitTypeDialog} maxWidth="lg" fullWidth>
            <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>Manage Exit Types<Button onClick={handleCloseExitTypeDialog} variant="outlined">Close</Button></DialogTitle>
            <DialogContent dividers sx={{ p: 0 }}>
            <Grid container>
              <Grid item xs={12} md={4} sx={{borderRight: {md: '1px solid #eee'} }}>
                <Box sx={{ p: 3}}>
                  <Typography variant="h6" sx={{ mb: 2 }}>Add New Exit Type</Typography>
                  <FormControl fullWidth sx={{ mb: 2 }}>
                    <TextField required label="Exit Type Name" placeholder="Enter exit type name" value={newExitType} onChange={(e) => setNewExitType(e.target.value)} disabled={submittingExitType} error={!!submitExitTypeError} helperText={submitExitTypeError}/>
                  </FormControl>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button variant="contained" onClick={handleSubmitExitType} disabled={submittingExitType || !newExitType.trim()}>{submittingExitType ? <CircularProgress size={24} color="inherit" /> : 'Save Exit Type'}</Button>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} md={8}>    
                <Box sx={{ p: 3 }}>
                  <Typography variant="h6" sx={{ mb: 2 }}>List All Exit Types</Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, flexWrap: 'wrap', gap:1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography variant="body2" sx={{ mr: 1 }}>Show</Typography>
                      <FormControl size="small" sx={{ width: 80, mr: 1 }}>
                        <Select value={exitTypeRowsPerPage} onChange={handleExitTypeChangeRowsPerPage}>
                            <MenuItem value={5}>5</MenuItem>
                            <MenuItem value={10}>10</MenuItem>
                            <MenuItem value={25}>25</MenuItem>
                            <MenuItem value={50}>50</MenuItem>
                        </Select>
                      </FormControl>
                      <Typography variant="body2">entries</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography variant="body2" sx={{ mr: 1 }}>Search</Typography>
                      <TextField size="small" value={exitTypeSearchTerm} onChange={handleExitTypeSearch} placeholder='Search exit types...'/>
                    </Box>
                  </Box>
                  {loadingExitTypes ? (<Box sx={{display: 'flex', justifyContent: 'center', p: 3}}><CircularProgress /></Box>
                  ) : exitTypesError ? (<Typography color="error" sx={{p:2}}>Error: {exitTypesError} <Button onClick={fetchExitTypes} size="small">Retry</Button></Typography>
                  ) : (
                  <>
                  <TableContainer component={Paper} variant="outlined">
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell><TableSortLabel active={exitTypeSortConfig.key === 'name'} direction={exitTypeSortConfig.key === 'name' ? exitTypeSortConfig.direction : 'asc'} onClick={() => handleExitTypeSort('name')}>EXIT TYPE</TableSortLabel></TableCell>
                          <TableCell><TableSortLabel active={exitTypeSortConfig.key === 'createdAt'} direction={exitTypeSortConfig.key === 'createdAt' ? exitTypeSortConfig.direction : 'asc'} onClick={() => handleExitTypeSort('createdAt')}>CREATED AT</TableSortLabel></TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {paginatedExitTypes.length > 0 ? paginatedExitTypes.map((type) => (
                          <TableRow key={type.id} hover><TableCell>{type.name}</TableCell><TableCell>{type.createdAt}</TableCell></TableRow>
                        )) : (<TableRow><TableCell colSpan={2} align="center">No exit types found.</TableCell></TableRow>)}
                      </TableBody>
                    </Table>
                  </TableContainer>
                    {sortedAndFilteredExitTypes.length > 0 && (
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', mt: 2, gap:1 }}>
                            <Button size="small" disabled={exitTypePage === 0} onClick={(e) => handleExitTypeChangePage(e, exitTypePage - 1)} sx={{ border: '1px solid #ddd' }}>Previous</Button>
                            <Typography variant="body2">Page {exitTypePage + 1} of {totalExitTypePages}</Typography>
                            <Button size="small" disabled={exitTypePage >= totalExitTypePages - 1} onClick={(e) => handleExitTypeChangePage(e, exitTypePage + 1)} sx={{ border: '1px solid #ddd' }}>Next</Button>
                        </Box>
                    )}
                  </>
                  )}
                </Box>
              </Grid>
            </Grid>
          </DialogContent>
        </Dialog>
      </Box>
    </ThemeProvider>
  );
 };
 
export default EmployeeExitManagementHr;

