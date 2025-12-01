// // // import React, { useState, useEffect, useCallback, useMemo } from 'react';
// // // import {
// // //   ThemeProvider,
// // //   createTheme,
// // //   Box,
// // //   Paper,
// // //   Typography,
// // //   Button,
// // //   IconButton,
// // //   TextField,
// // //   Select,
// // //   MenuItem,
// // //   InputLabel,
// // //   FormControl,
// // //   Dialog,
// // //   DialogTitle,
// // //   DialogContent,
// // //   DialogActions,
// // //   Table,
// // //   TableBody,
// // //   TableCell,
// // //   TableContainer,
// // //   TableHead,
// // //   TableRow,
// // //   Grid,
// // //   Chip,
// // //   Avatar,
// // //   Divider,
// // //   // TextareaAutosize, // Not used
// // //   CssBaseline,
// // //   InputAdornment,
// // //   // FormHelperText, // Not used
// // //   CircularProgress,
// // //   TableSortLabel,
// // // } from '@mui/material';
// // // // import AddIcon from '@mui/icons-material/Add'; // Not used
// // // // import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'; // Not used
// // // // import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'; // Not used
// // // import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
// // // import PersonIcon from '@mui/icons-material/Person';
// // // import SortIcon from '@mui/icons-material/Sort'; // Kept as per original, though TableSortLabel is better
// // // // import CloseIcon from '@mui/icons-material/Close'; // Not used
// // // import FileDownloadIcon from '@mui/icons-material/FileDownload';

// // // // API Configuration
// // // const API_BASE_URL = 'https://tdtlworld.com/hrms-backend/api';
// // // const EXIT_TYPE_API_URL = `${API_BASE_URL}/exit-type/`;

// // // // Create theme
// // // const theme = createTheme({
// // //   palette: {
// // //     primary: {
// // //       main: '#7c4dff',
// // //     },
// // //     secondary: {
// // //       main: '#f50057',
// // //     },
// // //     background: {
// // //       default: '#f5f5f9',
// // //     },
// // //   },
// // //   components: {
// // //     MuiTableCell: {
// // //       styleOverrides: {
// // //         head: {
// // //           fontWeight: 'bold',
// // //           backgroundColor: '#f5f5f5',
// // //         },
// // //       },
// // //     },
// // //   },
// // // });

// // // const formatDate = (dateString) => {
// // //     if (!dateString) return 'N/A';
// // //     try {
// // //       const date = new Date(dateString);
// // //       if (isNaN(date.getTime())) {
// // //         // Try to parse if it's like "YYYY-MM-DD HH:MM:SS"
// // //         const parts = dateString.split(/[- :]/);
// // //         if (parts.length >= 3) {
// // //             const year = parseInt(parts[0], 10);
// // //             const month = parseInt(parts[1], 10) -1; // Month is 0-indexed
// // //             const day = parseInt(parts[2], 10);
// // //             const newDate = new Date(year, month, day);
// // //             if (!isNaN(newDate.getTime())) {
// // //                 const d = String(newDate.getDate()).padStart(2, '0');
// // //                 const m = String(newDate.getMonth() + 1).padStart(2, '0');
// // //                 const y = newDate.getFullYear();
// // //                 return `${d}/${m}/${y}`;
// // //             }
// // //         }
// // //         return dateString; // Return original if invalid or complex format
// // //       }
// // //       const day = String(date.getDate()).padStart(2, '0');
// // //       const month = String(date.getMonth() + 1).padStart(2, '0');
// // //       const year = date.getFullYear();
// // //       return `${day}/${month}/${year}`;
// // //     } catch (e) {
// // //       console.error("Error formatting date:", e, "Original date:", dateString);
// // //       return dateString;
// // //     }
// // //   };


// // // function EmployeeExitManagement() {
// // //   // State for employee exits (remains static as per prompt)
// // //   const [employeeExits, setEmployeeExits] = useState([
// // //     {
// // //       id: 1,
// // //       employee: {
// // //         name: 'Avinash Raut',
// // //         email: 'avinash.raut@tdtl.world',
// // //         avatar: '/user-image.png' // Ensure this path is correct or use a placeholder
// // //       },
// // //       exitType: 'Involuntary',
// // //       exitDate: '20/06/2023',
// // //       exitInterview: 'Yes',
// // //       disableAccount: 'No',
// // //       status: 'Approved',
// // //       description: ''
// // //     },
// // //     {
// // //       id: 2,
// // //       employee: {
// // //         name: 'Hitesh Zhambare',
// // //         email: 'hitesh.zhambare@tdtl.world',
// // //         avatar: '/user-image.png' // Ensure this path is correct or use a placeholder
// // //       },
// // //       exitType: 'Retirement',
// // //       exitDate: '29/06/2023',
// // //       exitInterview: 'Yes',
// // //       disableAccount: 'Yes',
// // //       status: 'Pending',
// // //       description: ''
// // //     }
// // //   ]);

// // //   // State for exit types (will be fetched from API)
// // //   const [exitTypes, setExitTypes] = useState([]);
// // //   const [loadingExitTypes, setLoadingExitTypes] = useState(true);
// // //   const [exitTypesError, setExitTypesError] = useState(null);
// // //   const [submittingExitType, setSubmittingExitType] = useState(false);
// // //   const [submitExitTypeError, setSubmitExitTypeError] = useState(null);
// // //   const [exitTypeSortConfig, setExitTypeSortConfig] = useState({ key: 'name', direction: 'asc' });


// // //   // State for dialogs
// // //   const [openAddExitDialog, setOpenAddExitDialog] = useState(false);
// // //   const [openAddExitTypeDialog, setOpenAddExitTypeDialog] = useState(false);

// // //   // State for pagination (Employee Exits)
// // //   const [page, setPage] = useState(0);
// // //   const [rowsPerPage, setRowsPerPage] = useState(10);

// // //   // State for pagination (Exit Types)
// // //   const [exitTypePage, setExitTypePage] = useState(0);
// // //   const [exitTypeRowsPerPage, setExitTypeRowsPerPage] = useState(10);

// // //   // State for search
// // //   const [searchTerm, setSearchTerm] = useState('');
// // //   const [exitTypeSearchTerm, setExitTypeSearchTerm] = useState('');

// // //   // State for new employee exit form
// // //   const [newEmployeeExit, setNewEmployeeExit] = useState({
// // //     employee: '',
// // //     exitDate: '',
// // //     exitType: '',
// // //     exitInterview: 'Yes',
// // //     disableAccount: 'Yes',
// // //     description: '',
// // //     file: null
// // //   });

// // //   // State for new exit type form
// // //   const [newExitType, setNewExitType] = useState('');

// // //   // Fetch Exit Types from API
// // //   const fetchExitTypes = useCallback(async () => {
// // //     setLoadingExitTypes(true);
// // //     setExitTypesError(null);
// // //     try {
// // //       const response = await fetch(EXIT_TYPE_API_URL);
// // //       if (!response.ok) {
// // //         throw new Error(`HTTP error! status: ${response.status}`);
// // //       }
// // //       const data = await response.json();
// // //       // Assuming API returns array of { value, label, created_at } or { id, name, created_at }
// // //       const transformedData = data.map(item => ({
// // //         id: item.id || item.value,
// // //         name: item.name || item.label,
// // //         createdAt: formatDate(item.created_at),
// // //       }));
// // //       setExitTypes(transformedData);
// // //     } catch (error) {
// // //       console.error("Failed to fetch exit types:", error);
// // //       setExitTypesError(error.message);
// // //     } finally {
// // //       setLoadingExitTypes(false);
// // //     }
// // //   }, []);

// // //   useEffect(() => {
// // //     fetchExitTypes();
// // //   }, [fetchExitTypes]);


// // //   // Handle pagination change
// // //   const handleChangePage = (event, newPage) => {
// // //     setPage(newPage);
// // //   };

// // //   const handleChangeRowsPerPage = (event) => {
// // //     setRowsPerPage(parseInt(event.target.value, 10));
// // //     setPage(0);
// // //   };

// // //   // Handle exit type pagination change
// // //   const handleExitTypeChangePage = (event, newPage) => {
// // //     setExitTypePage(newPage);
// // //   };

// // //   const handleExitTypeChangeRowsPerPage = (event) => {
// // //     setExitTypeRowsPerPage(parseInt(event.target.value, 10));
// // //     setExitTypePage(0);
// // //   };

// // //   // Handle search
// // //   const handleSearch = (e) => {
// // //     setSearchTerm(e.target.value);
// // //     setPage(0); // Reset page on search
// // //   };

// // //   const handleExitTypeSearch = (e) => {
// // //     setExitTypeSearchTerm(e.target.value);
// // //     setExitTypePage(0); // Reset page on search
// // //   };

// // //   // Handle form changes for employee exit
// // //   const handleEmployeeExitChange = (field, value) => {
// // //     setNewEmployeeExit({
// // //       ...newEmployeeExit,
// // //       [field]: value
// // //     });
// // //   };

// // //   // Handle file upload
// // //   const handleFileUpload = (e) => {
// // //     const file = e.target.files[0];
// // //     if (file) {
// // //       if (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif') {
// // //         setNewEmployeeExit({
// // //           ...newEmployeeExit,
// // //           file: file
// // //         });
// // //       } else {
// // //         alert('Please upload only .gif, .png, .jpg files');
// // //         e.target.value = null; // Reset file input
// // //       }
// // //     }
// // //   };

// // //   // Handle submit for new employee exit
// // //   const handleSubmitEmployeeExit = () => {
// // //     if (!newEmployeeExit.employee || !newEmployeeExit.exitDate || !newEmployeeExit.exitType) {
// // //       alert('Please fill all required fields: Employee, Exit Date, and Exit Type.');
// // //       return;
// // //     }

// // //     // const exitDate = new Date(); // This was creating current date, not using form date
// // //     // const formattedExitDate = `${exitDate.getDate().toString().padStart(2, '0')}/${(exitDate.getMonth() + 1).toString().padStart(2, '0')}/${exitDate.getFullYear()}`;

// // //     // Use the date from the form directly if it's already formatted or format it
// // //     // Assuming newEmployeeExit.exitDate is YYYY-MM-DD from date picker, convert to DD/MM/YYYY
// // //     let formattedExitDate;
// // //     try {
// // //         formattedExitDate = newEmployeeExit.exitDate ? formatDate(newEmployeeExit.exitDate) : formatDate(new Date().toISOString().split('T')[0]);
// // //     } catch (e) {
// // //         formattedExitDate = formatDate(new Date().toISOString().split('T')[0]); // Fallback
// // //     }


// // //     const newExit = {
// // //       id: employeeExits.length + 1,
// // //       employee: {
// // //         name: newEmployeeExit.employee,
// // //         // This email generation is simplistic, might need a proper source
// // //         email: `${newEmployeeExit.employee.toLowerCase().replace(/\s+/g, '.')}@tdtl.world`,
// // //         avatar: newEmployeeExit.file ? URL.createObjectURL(newEmployeeExit.file) : '/user-image.png'
// // //       },
// // //       exitType: newEmployeeExit.exitType,
// // //       exitDate: formattedExitDate, // Use date from form
// // //       exitInterview: newEmployeeExit.exitInterview,
// // //       disableAccount: newEmployeeExit.disableAccount,
// // //       status: 'Pending', // Default status
// // //       description: newEmployeeExit.description
// // //     };

// // //     setEmployeeExits([...employeeExits, newExit]);
// // //     alert('Employee Exit added successfully (locally).');
// // //     handleCloseEmployeeExitDialog();
// // //   };

// // //   // Handle submit for new exit type (API integration)
// // //   const handleSubmitExitType = async () => {
// // //     if (!newExitType.trim()) {
// // //       alert('Exit Type is required');
// // //       return;
// // //     }
// // //     setSubmittingExitType(true);
// // //     setSubmitExitTypeError(null);
// // //     try {
// // //       const response = await fetch(EXIT_TYPE_API_URL, {
// // //         method: 'POST',
// // //         headers: {
// // //           'Content-Type': 'application/json',
// // //           // Add Authorization headers if needed
// // //         },
// // //         body: JSON.stringify({ category_name: newExitType.trim() }),
// // //       });
// // //       if (!response.ok) {
// // //         const errorData = await response.json().catch(() => ({ message: 'Failed to add exit type.' }));
// // //         throw new Error(errorData.message || errorData.detail || `HTTP error! status: ${response.status}`);
// // //       }
// // //       // const addedType = await response.json(); // Contains the newly added type
// // //       alert('Exit type added successfully!');
// // //       handleCloseExitTypeDialog(); // Resets newExitType
// // //       fetchExitTypes(); // Refresh the list from API
// // //     } catch (error) {
// // //       console.error("Failed to submit exit type:", error);
// // //       setSubmitExitTypeError(error.message);
// // //       alert(`Error adding exit type: ${error.message}`);
// // //     } finally {
// // //       setSubmittingExitType(false);
// // //     }
// // //   };

// // //   // Close dialogs and reset forms
// // //   const handleCloseEmployeeExitDialog = () => {
// // //     setOpenAddExitDialog(false);
// // //     setNewEmployeeExit({
// // //       employee: '',
// // //       exitDate: '',
// // //       exitType: '',
// // //       exitInterview: 'Yes',
// // //       disableAccount: 'Yes',
// // //       description: '',
// // //       file: null
// // //     });
// // //   };

// // //   const handleCloseExitTypeDialog = () => {
// // //     setOpenAddExitTypeDialog(false);
// // //     setNewExitType('');
// // //     setSubmitExitTypeError(null); // Clear previous submission errors
// // //   };

// // //   // Reset forms
// // //   const handleResetEmployeeExitForm = () => {
// // //     setNewEmployeeExit({
// // //       employee: '',
// // //       exitDate: '',
// // //       exitType: '',
// // //       exitInterview: 'Yes',
// // //       disableAccount: 'Yes',
// // //       description: '',
// // //       file: null
// // //     });
// // //   };

// // //   // Export employees to Excel (CSV)
// // //   const handleExportEmployees = () => {
// // //     let csvContent = "data:text/csv;charset=utf-8,";
// // //     csvContent += "Employee Name,Employee Email,Exit Type,Exit Date,Exit Interview,Disable Account,Status\n";

// // //     employeeExits.forEach(exit => {
// // //       const row = [
// // //         `"${exit.employee.name.replace(/"/g, '""')}"`, // Handle quotes in names
// // //         `"${exit.employee.email.replace(/"/g, '""')}"`,
// // //         `"${exit.exitType.replace(/"/g, '""')}"`,
// // //         exit.exitDate,
// // //         exit.exitInterview,
// // //         exit.disableAccount,
// // //         exit.status
// // //       ].join(",");
// // //       csvContent += row + "\n";
// // //     });

// // //     const encodedUri = encodeURI(csvContent);
// // //     const link = document.createElement("a");
// // //     link.setAttribute("href", encodedUri);
// // //     link.setAttribute("download", "employee_exits.csv");
// // //     document.body.appendChild(link);
// // //     link.click();
// // //     document.body.removeChild(link);
// // //   };

// // //   const handleExitTypeSort = (key) => {
// // //     let direction = 'asc';
// // //     if (exitTypeSortConfig.key === key && exitTypeSortConfig.direction === 'asc') {
// // //       direction = 'desc';
// // //     }
// // //     setExitTypeSortConfig({ key, direction });
// // //   };

// // //   // Filter employee exits based on search term
// // //   const filteredEmployeeExits = employeeExits.filter(exit => 
// // //     (exit.employee.name && exit.employee.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
// // //     (exit.exitType && exit.exitType.toLowerCase().includes(searchTerm.toLowerCase())) ||
// // //     (exit.exitDate && exit.exitDate.includes(searchTerm))
// // //   );

// // //   // Filter and sort exit types based on search term and sort config
// // //   const sortedAndFilteredExitTypes = useMemo(() => {
// // //     let items = [...exitTypes];
// // //     if (exitTypeSearchTerm) {
// // //       items = items.filter(type => 
// // //         type.name && type.name.toLowerCase().includes(exitTypeSearchTerm.toLowerCase())
// // //       );
// // //     }
// // //     if (exitTypeSortConfig.key) {
// // //       items.sort((a, b) => {
// // //         if (a[exitTypeSortConfig.key] < b[exitTypeSortConfig.key]) {
// // //           return exitTypeSortConfig.direction === 'asc' ? -1 : 1;
// // //         }
// // //         if (a[exitTypeSortConfig.key] > b[exitTypeSortConfig.key]) {
// // //           return exitTypeSortConfig.direction === 'asc' ? 1 : -1;
// // //         }
// // //         return 0;
// // //       });
// // //     }
// // //     return items;
// // //   }, [exitTypes, exitTypeSearchTerm, exitTypeSortConfig]);


// // //   // Paginate employee exits
// // //   const paginatedEmployeeExits = filteredEmployeeExits.slice(
// // //     page * rowsPerPage,
// // //     page * rowsPerPage + rowsPerPage
// // //   );

// // //   // Paginate exit types
// // //   const paginatedExitTypes = sortedAndFilteredExitTypes.slice(
// // //     exitTypePage * exitTypeRowsPerPage,
// // //     exitTypePage * exitTypeRowsPerPage + exitTypeRowsPerPage
// // //   );

// // //   return (
// // //     <ThemeProvider theme={theme}>
// // //       <CssBaseline />
// // //       <Box sx={{ p: 3 }}>
// // //         {/* Employee Exit List */}
// // //         <Paper elevation={3} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
// // //           <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, flexWrap: 'wrap', gap: 1 }}>
// // //             <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
// // //               List All Employee Exit
// // //             </Typography>
// // //             <Box sx={{display: 'flex', gap: 1, flexWrap: 'wrap'}}>
// // //               <Button
// // //                 variant="contained"
// // //                 onClick={() => setOpenAddExitTypeDialog(true)}
// // //                 sx={{ bgcolor: '#7c4dff', '&:hover': { bgcolor: '#6039c8' } }}
// // //               >
// // //                 + Exit Type
// // //               </Button>
// // //               <Button
// // //                 variant="contained"
// // //                 startIcon={<FileDownloadIcon />}
// // //                 onClick={handleExportEmployees}
// // //                 sx={{ bgcolor: '#4caf50', '&:hover': { bgcolor: '#388e3c' } }}
// // //               >
// // //                 Export Employees
// // //               </Button>
// // //               <Button
// // //                 variant="contained"
// // //                 onClick={() => setOpenAddExitDialog(true)}
// // //                 sx={{ bgcolor: '#7c4dff', '&:hover': { bgcolor: '#6039c8' } }}
// // //               >
// // //                 + Add New Exit
// // //               </Button>
// // //             </Box>
// // //           </Box>

// // //           <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, flexWrap: 'wrap', gap: 1 }}>
// // //             <Box sx={{ display: 'flex', alignItems: 'center' }}>
// // //               <Typography variant="body2" sx={{ mr: 1 }}>Show</Typography>
// // //               <FormControl size="small" sx={{ width: 80, mr: 1 }}>
// // //                 <Select
// // //                   value={rowsPerPage}
// // //                   onChange={handleChangeRowsPerPage}
// // //                 >
// // //                   <MenuItem value={10}>10</MenuItem>
// // //                   <MenuItem value={25}>25</MenuItem>
// // //                   <MenuItem value={50}>50</MenuItem>
// // //                 </Select>
// // //               </FormControl>
// // //               <Typography variant="body2">entries</Typography>
// // //             </Box>
// // //             <Box sx={{ display: 'flex', alignItems: 'center' }}>
// // //               <Typography variant="body2" sx={{ mr: 1 }}>Search</Typography>
// // //               <TextField 
// // //                 size="small" 
// // //                 value={searchTerm}
// // //                 onChange={handleSearch}
// // //                 placeholder='Search exits...'
// // //               />
// // //             </Box>
// // //           </Box>

// // //           <TableContainer>
// // //             <Table>
// // //               <TableHead>
// // //                 <TableRow>
// // //                   <TableCell>
// // //                     <Box sx={{ display: 'flex', alignItems: 'center' }}>
// // //                       <PersonIcon fontSize="small" sx={{ mr: 0.5 }} />
// // //                       EMPLOYEE TO EXIT
// // //                       <IconButton size="small" title="Sort (not implemented)"> 
// // //                         <SortIcon fontSize="small" />
// // //                       </IconButton>
// // //                     </Box>
// // //                   </TableCell>
// // //                   <TableCell>
// // //                     <Box sx={{ display: 'flex', alignItems: 'center' }}>
// // //                       EXIT TYPE
// // //                       <IconButton size="small" title="Sort (not implemented)">
// // //                         <SortIcon fontSize="small" />
// // //                       </IconButton>
// // //                     </Box>
// // //                   </TableCell>
// // //                   <TableCell>
// // //                     <Box sx={{ display: 'flex', alignItems: 'center' }}>
// // //                       <CalendarTodayIcon fontSize="small" sx={{ mr: 0.5 }} />
// // //                       EXIT DATE
// // //                       <IconButton size="small" title="Sort (not implemented)">
// // //                         <SortIcon fontSize="small" />
// // //                       </IconButton>
// // //                     </Box>
// // //                   </TableCell>
// // //                   <TableCell>EXIT INTERVIEW</TableCell>
// // //                   <TableCell>DISABLE ACCOUNT</TableCell>
// // //                   <TableCell>STATUS</TableCell>
// // //                 </TableRow>
// // //               </TableHead>
// // //               <TableBody>
// // //                 {paginatedEmployeeExits.length > 0 ? paginatedEmployeeExits.map((exit) => (
// // //                   <TableRow key={exit.id} hover>
// // //                     <TableCell>
// // //                       <Box sx={{ display: 'flex', alignItems: 'center' }}>
// // //                         <Avatar src={exit.employee.avatar} alt={exit.employee.name} sx={{ mr: 1, width: 30, height: 30 }} />
// // //                         <Box>
// // //                           <Typography variant="body2" fontWeight="medium">{exit.employee.name}</Typography>
// // //                           <Typography variant="caption" color="textSecondary">{exit.employee.email}</Typography>
// // //                         </Box>
// // //                       </Box>
// // //                     </TableCell>
// // //                     <TableCell>{exit.exitType}</TableCell>
// // //                     <TableCell>{exit.exitDate}</TableCell>
// // //                     <TableCell>{exit.exitInterview}</TableCell>
// // //                     <TableCell>{exit.disableAccount}</TableCell>
// // //                     <TableCell>
// // //                       <Chip 
// // //                         label={exit.status} 
// // //                         color={exit.status === 'Approved' ? 'success' : (exit.status === 'Pending' ? 'warning' : 'default')}
// // //                         size="small" 
// // //                       />
// // //                     </TableCell>
// // //                   </TableRow>
// // //                 )) : (
// // //                     <TableRow>
// // //                         <TableCell colSpan={6} align="center">No employee exits found.</TableCell>
// // //                     </TableRow>
// // //                 )}
// // //               </TableBody>
// // //             </Table>
// // //           </TableContainer>

// // //             {filteredEmployeeExits.length > 0 && (
// // //               <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2, flexWrap: 'wrap', gap: 1 }}>
// // //                 <Typography variant="body2">
// // //                   Showing {Math.min(page * rowsPerPage + 1, filteredEmployeeExits.length)} to {Math.min((page + 1) * rowsPerPage, filteredEmployeeExits.length)} of {filteredEmployeeExits.length} records
// // //                 </Typography>
// // //                 <Box sx={{ display: 'flex', gap: 0.5 }}>
// // //                   <Button 
// // //                     size="small"
// // //                     disabled={page === 0} 
// // //                     onClick={() => handleChangePage(null, page - 1)}
// // //                     sx={{ border: '1px solid #ddd' }}
// // //                   >
// // //                     Previous
// // //                   </Button>
// // //                   {[...Array(Math.ceil(filteredEmployeeExits.length / rowsPerPage))].map((_, i) => (
// // //                     <Button
// // //                       key={i}
// // //                       size="small"
// // //                       variant={page === i ? 'contained' : 'outlined'}
// // //                       onClick={() => handleChangePage(null, i)}
// // //                       sx={{
// // //                         minWidth: '36px',
// // //                         bgcolor: page === i ? 'primary.main' : 'transparent',
// // //                         color: page === i ? 'primary.contrastText' : 'text.primary',
// // //                         '&:hover': { bgcolor: page === i ? 'primary.dark' : 'action.hover' }
// // //                       }}
// // //                     >
// // //                       {i + 1}
// // //                     </Button>
// // //                   ))}
// // //                   <Button 
// // //                     size="small"
// // //                     disabled={page >= Math.ceil(filteredEmployeeExits.length / rowsPerPage) - 1} 
// // //                     onClick={() => handleChangePage(null, page + 1)}
// // //                      sx={{ border: '1px solid #ddd' }}
// // //                   >
// // //                     Next
// // //                   </Button>
// // //                 </Box>
// // //               </Box>
// // //             )}
// // //         </Paper>

// // //         {/* Add New Employee Exit Dialog */}
// // //         <Dialog open={openAddExitDialog} onClose={handleCloseEmployeeExitDialog} maxWidth="md" fullWidth>
// // //           <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
// // //             <Typography variant="h6">Add New Employee Exit</Typography>
// // //             <Button 
// // //               variant="contained" 
// // //               onClick={handleCloseEmployeeExitDialog}
// // //             >
// // //               Hide
// // //             </Button>
// // //           </DialogTitle>
// // //           <Divider />
// // //           <DialogContent>
// // //             <Grid container spacing={3}>
// // //               <Grid item xs={12} md={8}>
// // //                 <Grid container spacing={2}>
// // //                   <Grid item xs={12} md={6}>
// // //                     <FormControl fullWidth required>
// // //                       <InputLabel id="employee-to-exit-label">Employee to Exit</InputLabel>
// // //                       <Select
// // //                         labelId="employee-to-exit-label"
// // //                         label="Employee to Exit"
// // //                         value={newEmployeeExit.employee}
// // //                         onChange={(e) => handleEmployeeExitChange('employee', e.target.value)}
// // //                       >
// // //                         <MenuItem value=""><em>Select Employee</em></MenuItem>
// // //                         {/* This should ideally be fetched from an API */}
// // //                         <MenuItem value="Hitesh Zhambare">Hitesh Zhambare</MenuItem>
// // //                         <MenuItem value="Avinash Raut">Avinash Raut</MenuItem>
// // //                         <MenuItem value="John Doe">John Doe</MenuItem>
// // //                         <MenuItem value="Jane Smith">Jane Smith</MenuItem>
// // //                       </Select>
// // //                     </FormControl>
// // //                   </Grid>
// // //                   <Grid item xs={12} md={6}>
// // //                     <TextField
// // //                       label="Exit Date"
// // //                       fullWidth
// // //                       required
// // //                       type="date"
// // //                       InputLabelProps={{ shrink: true }}
// // //                       value={newEmployeeExit.exitDate}
// // //                       onChange={(e) => handleEmployeeExitChange('exitDate', e.target.value)}
// // //                       InputProps={{
// // //                         endAdornment: (
// // //                           <InputAdornment position="end">
// // //                             <CalendarTodayIcon />
// // //                           </InputAdornment>
// // //                         )
// // //                       }}
// // //                     />
// // //                   </Grid>
// // //                   <Grid item xs={12} md={4}>
// // //                      <FormControl fullWidth required>
// // //                       <InputLabel id="exit-type-label">Exit Type</InputLabel>
// // //                       <Select
// // //                         labelId="exit-type-label"
// // //                         label="Exit Type"
// // //                         value={newEmployeeExit.exitType}
// // //                         onChange={(e) => handleEmployeeExitChange('exitType', e.target.value)}
// // //                       >
// // //                         <MenuItem value=""><em>Select Exit Type</em></MenuItem>
// // //                         {exitTypes.map((type) => (
// // //                           <MenuItem key={type.id} value={type.name}>{type.name}</MenuItem>
// // //                         ))}
// // //                       </Select>
// // //                     </FormControl>
// // //                   </Grid>
// // //                   <Grid item xs={12} md={4}>
// // //                     <FormControl fullWidth required>
// // //                       <InputLabel id="exit-interview-label">Exit Interview</InputLabel>
// // //                       <Select
// // //                         labelId="exit-interview-label"
// // //                         label="Exit Interview"
// // //                         value={newEmployeeExit.exitInterview}
// // //                         onChange={(e) => handleEmployeeExitChange('exitInterview', e.target.value)}
// // //                       >
// // //                         <MenuItem value="Yes">Yes</MenuItem>
// // //                         <MenuItem value="No">No</MenuItem>
// // //                       </Select>
// // //                     </FormControl>
// // //                   </Grid>
// // //                   <Grid item xs={12} md={4}>
// // //                     <FormControl fullWidth required>
// // //                       <InputLabel id="disable-account-label">Disable Account</InputLabel>
// // //                       <Select
// // //                         labelId="disable-account-label"
// // //                         label="Disable Account"
// // //                         value={newEmployeeExit.disableAccount}
// // //                         onChange={(e) => handleEmployeeExitChange('disableAccount', e.target.value)}
// // //                       >
// // //                         <MenuItem value="Yes">Yes</MenuItem>
// // //                         <MenuItem value="No">No</MenuItem>
// // //                       </Select>
// // //                     </FormControl>
// // //                   </Grid>
// // //                   <Grid item xs={12}>
// // //                     <TextField
// // //                       label="Description"
// // //                       fullWidth
// // //                       multiline
// // //                       rows={3}
// // //                       placeholder="Enter description..."
// // //                       value={newEmployeeExit.description}
// // //                       onChange={(e) => handleEmployeeExitChange('description', e.target.value)}
// // //                     />
// // //                   </Grid>
// // //                 </Grid>
// // //               </Grid>
// // //               <Grid item xs={12} md={4}>
// // //                 <Paper variant="outlined" sx={{ p: 2, height: '100%' }}>
// // //                   <Typography variant="subtitle1" gutterBottom>
// // //                     Exit Contract / Attachment
// // //                   </Typography>
// // //                     <TextField
// // //                       fullWidth
// // //                       disabled
// // //                       size="small"
// // //                       placeholder="No file chosen"
// // //                       value={newEmployeeExit.file ? newEmployeeExit.file.name : ''}
// // //                       sx={{ mb: 1 }}
// // //                       InputProps={{
// // //                         startAdornment: newEmployeeExit.file ? (
// // //                             <InputAdornment position="start">
// // //                                 <Chip 
// // //                                     size="small" 
// // //                                     label={newEmployeeExit.file.name} 
// // //                                     onDelete={() => handleEmployeeExitChange('file', null)}
// // //                                 />
// // //                             </InputAdornment>
// // //                         ) : null,
// // //                       }}
// // //                     />
// // //                     <Button
// // //                       variant="outlined"
// // //                       component="label"
// // //                       fullWidth
// // //                     >
// // //                       Browse File
// // //                       <input
// // //                         type="file"
// // //                         hidden
// // //                         onChange={handleFileUpload}
// // //                         accept=".jpg,.jpeg,.png,.gif"
// // //                       />
// // //                     </Button>
// // //                   <Typography variant="caption" color="textSecondary" display="block" mt={1}>
// // //                     Allowed: GIF, PNG, JPG, JPEG. Max 2MB.
// // //                   </Typography>
// // //                 </Paper>
// // //               </Grid>
// // //             </Grid>
// // //           </DialogContent>
// // //           <Divider />
// // //           <DialogActions sx={{ p: 2, justifyContent: 'flex-end' }}>
// // //             <Button 
// // //               onClick={handleResetEmployeeExitForm} 
// // //               sx={{ mr: 1, color: 'text.secondary', borderColor: 'divider' }}
// // //               variant="outlined"
// // //             >
// // //               Reset
// // //             </Button>
// // //             <Button 
// // //               variant="contained" 
// // //               onClick={handleSubmitEmployeeExit}
// // //             >
// // //               Save Employee Exit
// // //             </Button>
// // //           </DialogActions>
// // //         </Dialog>

// // //         {/* Add New Exit Type Dialog */}
// // //         <Dialog open={openAddExitTypeDialog} onClose={handleCloseExitTypeDialog} maxWidth="lg" fullWidth>
// // //             <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
// // //                 Manage Exit Types
// // //                 <Button onClick={handleCloseExitTypeDialog}>Close</Button>
// // //             </DialogTitle>
// // //             <DialogContent dividers sx={{ p: 0 }}>
// // //             <Grid container>
// // //               <Grid item xs={12} md={4} sx={{borderRight: {md: '1px solid #eee'} }}>
// // //                 <Box sx={{ p: 3}}>
// // //                   <Typography variant="h6" sx={{ mb: 2 }}>
// // //                     Add New Exit Type
// // //                   </Typography>
// // //                   <FormControl fullWidth sx={{ mb: 2 }}>
// // //                     <TextField
// // //                       required
// // //                       label="Exit Type Name"
// // //                       placeholder="Enter exit type name"
// // //                       value={newExitType}
// // //                       onChange={(e) => setNewExitType(e.target.value)}
// // //                       disabled={submittingExitType}
// // //                     />
// // //                   </FormControl>
// // //                   {submitExitTypeError && (
// // //                     <Typography color="error" variant="body2" sx={{mb:1}}>{submitExitTypeError}</Typography>
// // //                   )}
// // //                   <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
// // //                     <Button 
// // //                       variant="contained" 
// // //                       onClick={handleSubmitExitType}
// // //                       disabled={submittingExitType}
// // //                     >
// // //                       {submittingExitType ? <CircularProgress size={24} color="inherit" /> : 'Save Exit Type'}
// // //                     </Button>
// // //                   </Box>
// // //                 </Box>
// // //               </Grid>
// // //               <Grid item xs={12} md={8}>
// // //                 <Box sx={{ p: 3 }}>
// // //                   <Typography variant="h6" sx={{ mb: 2 }}>
// // //                     List All Exit Types
// // //                   </Typography>
// // //                   <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, flexWrap: 'wrap', gap:1 }}>
// // //                     <Box sx={{ display: 'flex', alignItems: 'center' }}>
// // //                       <Typography variant="body2" sx={{ mr: 1 }}>Show</Typography>
// // //                       <FormControl size="small" sx={{ width: 80, mr: 1 }}>
// // //                         <Select
// // //                           value={exitTypeRowsPerPage}
// // //                           onChange={handleExitTypeChangeRowsPerPage}
// // //                         >
// // //                           <MenuItem value={10}>10</MenuItem>
// // //                           <MenuItem value={25}>25</MenuItem>
// // //                           <MenuItem value={50}>50</MenuItem>
// // //                         </Select>
// // //                       </FormControl>
// // //                       <Typography variant="body2">entries</Typography>
// // //                     </Box>
// // //                     <Box sx={{ display: 'flex', alignItems: 'center' }}>
// // //                       <Typography variant="body2" sx={{ mr: 1 }}>Search</Typography>
// // //                       <TextField 
// // //                         size="small" 
// // //                         value={exitTypeSearchTerm}
// // //                         onChange={handleExitTypeSearch}
// // //                         placeholder='Search exit types...'
// // //                       />
// // //                     </Box>
// // //                   </Box>
// // //                   {loadingExitTypes ? (
// // //                     <Box sx={{display: 'flex', justifyContent: 'center', p: 3}}><CircularProgress /></Box>
// // //                   ) : exitTypesError ? (
// // //                     <Typography color="error" sx={{p:2}}>Error: {exitTypesError} <Button onClick={fetchExitTypes}>Retry</Button></Typography>
// // //                   ) : (
// // //                   <>
// // //                   <TableContainer component={Paper} variant="outlined">
// // //                     <Table size="small">
// // //                       <TableHead>
// // //                         <TableRow>
// // //                           <TableCell>
// // //                             <TableSortLabel
// // //                               active={exitTypeSortConfig.key === 'name'}
// // //                               direction={exitTypeSortConfig.key === 'name' ? exitTypeSortConfig.direction : 'asc'}
// // //                               onClick={() => handleExitTypeSort('name')}
// // //                             >
// // //                                 EXIT TYPE
// // //                             </TableSortLabel>
// // //                           </TableCell>
// // //                           <TableCell>
// // //                             <TableSortLabel
// // //                                 active={exitTypeSortConfig.key === 'createdAt'}
// // //                                 direction={exitTypeSortConfig.key === 'createdAt' ? exitTypeSortConfig.direction : 'asc'}
// // //                                 onClick={() => handleExitTypeSort('createdAt')}
// // //                             >
// // //                                 CREATED AT
// // //                             </TableSortLabel>
// // //                           </TableCell>
// // //                         </TableRow>
// // //                       </TableHead>
// // //                       <TableBody>
// // //                         {paginatedExitTypes.length > 0 ? paginatedExitTypes.map((type) => (
// // //                           <TableRow key={type.id} hover>
// // //                             <TableCell>{type.name}</TableCell>
// // //                             <TableCell>{type.createdAt}</TableCell>
// // //                           </TableRow>
// // //                         )) : (
// // //                             <TableRow>
// // //                                 <TableCell colSpan={2} align="center">No exit types found.</TableCell>
// // //                             </TableRow>
// // //                         )}
// // //                       </TableBody>
// // //                     </Table>
// // //                   </TableContainer>
// // //                     {sortedAndFilteredExitTypes.length > 0 && (
// // //                         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2, flexWrap:'wrap', gap:1 }}>
// // //                         <Typography variant="body2">
// // //                             Showing {Math.min(exitTypePage * exitTypeRowsPerPage + 1, sortedAndFilteredExitTypes.length)} to {Math.min((exitTypePage + 1) * exitTypeRowsPerPage, sortedAndFilteredExitTypes.length)} of {sortedAndFilteredExitTypes.length} records
// // //                         </Typography>
// // //                         <Box sx={{ display: 'flex', gap: 0.5 }}>
// // //                             <Button 
// // //                             size="small"
// // //                             disabled={exitTypePage === 0} 
// // //                             onClick={() => handleExitTypeChangePage(null, exitTypePage - 1)}
// // //                             sx={{ border: '1px solid #ddd' }}
// // //                             >
// // //                             Previous
// // //                             </Button>
// // //                             {[...Array(Math.ceil(sortedAndFilteredExitTypes.length / exitTypeRowsPerPage))].map((_, i) => (
// // //                             <Button
// // //                                 key={i}
// // //                                 size="small"
// // //                                 variant={exitTypePage === i ? 'contained' : 'outlined'}
// // //                                 onClick={() => handleExitTypeChangePage(null, i)}
// // //                                 sx={{
// // //                                 minWidth: '36px',
// // //                                 bgcolor: exitTypePage === i ? 'primary.main' : 'transparent',
// // //                                 color: exitTypePage === i ? 'primary.contrastText' : 'text.primary',
// // //                                 '&:hover': { bgcolor: exitTypePage === i ? 'primary.dark' : 'action.hover' }
// // //                                 }}
// // //                             >
// // //                                 {i + 1}
// // //                             </Button>
// // //                             ))}
// // //                             <Button 
// // //                             size="small"
// // //                             disabled={exitTypePage >= Math.ceil(sortedAndFilteredExitTypes.length / exitTypeRowsPerPage) - 1} 
// // //                             onClick={() => handleExitTypeChangePage(null, exitTypePage + 1)}
// // //                             sx={{ border: '1px solid #ddd' }}
// // //                             >
// // //                             Next
// // //                             </Button>
// // //                         </Box>
// // //                         </Box>
// // //                     )}
// // //                   </>
// // //                   )}
// // //                 </Box>
// // //               </Grid>
// // //             </Grid>
// // //           </DialogContent>
// // //         </Dialog>
// // //       </Box>
// // //     </ThemeProvider>
// // //   );
// // // }

// // // export default EmployeeExitManagement;


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
// //   CssBaseline,
// //   InputAdornment,
// //   CircularProgress,
// //   TableSortLabel,
// // } from '@mui/material';
// // import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
// // import PersonIcon from '@mui/icons-material/Person';
// // import SortIcon from '@mui/icons-material/Sort';
// // import FileDownloadIcon from '@mui/icons-material/FileDownload';
// // import EditIcon from '@mui/icons-material/Edit';
// // import DeleteIcon from '@mui/icons-material/Delete';

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
// //         // Try to parse if it's like "YYYY-MM-DD HH:MM:SS" or "YYYY-MM-DD"
// //         const parts = dateString.split(/[- :T]/); // Added 'T' for ISO strings like "YYYY-MM-DDTHH:MM:SS"
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
// // };

// // const convertToInputDate = (ddmmyyyy) => {
// //     if (!ddmmyyyy || !ddmmyyyy.includes('/')) return '';
// //     const parts = ddmmyyyy.split('/');
// //     if (parts.length === 3) {
// //         // Ensure month and day are two digits for input[type=date]
// //         const day = parts[0].padStart(2, '0');
// //         const month = parts[1].padStart(2, '0');
// //         const year = parts[2];
// //         return `${year}-${month}-${day}`; // YYYY-MM-DD
// //     }
// //     return '';
// // };


// // function EmployeeExitManagement() {
// //   const [employeeExits, setEmployeeExits] = useState([
// //     {
// //       id: 1,
// //       employee: {
// //         name: 'Avinash Raut',
// //         email: 'avinash.raut@tdtl.world',
// //         avatar: '/user-image.png' 
// //       },
// //       exitType: 'Involuntary',
// //       exitDate: '20/06/2023',
// //       exitInterview: 'Yes',
// //       disableAccount: 'No',
// //       description: 'Restructuring role.'
// //     },
// //     {
// //       id: 2,
// //       employee: {
// //         name: 'Hitesh Zhambare',
// //         email: 'hitesh.zhambare@tdtl.world',
// //         avatar: '/user-image.png' 
// //       },
// //       exitType: 'Retirement',
// //       exitDate: '29/06/2023',
// //       exitInterview: 'Yes',
// //       disableAccount: 'Yes',
// //       description: 'Reached retirement age.'
// //     }
// //   ]);

// //   const [exitTypes, setExitTypes] = useState([]);
// //   const [loadingExitTypes, setLoadingExitTypes] = useState(true);
// //   const [exitTypesError, setExitTypesError] = useState(null);
// //   const [submittingExitType, setSubmittingExitType] = useState(false);
// //   const [submitExitTypeError, setSubmitExitTypeError] = useState(null);
// //   const [exitTypeSortConfig, setExitTypeSortConfig] = useState({ key: 'name', direction: 'asc' });

// //   const [openAddExitDialog, setOpenAddExitDialog] = useState(false);
// //   const [openAddExitTypeDialog, setOpenAddExitTypeDialog] = useState(false);

// //   const [editingExit, setEditingExit] = useState(null); // For tracking the exit being edited

// //   const [page, setPage] = useState(0);
// //   const [rowsPerPage, setRowsPerPage] = useState(10);

// //   const [exitTypePage, setExitTypePage] = useState(0);
// //   const [exitTypeRowsPerPage, setExitTypeRowsPerPage] = useState(10);

// //   const [searchTerm, setSearchTerm] = useState('');
// //   const [exitTypeSearchTerm, setExitTypeSearchTerm] = useState('');

// //   const [newEmployeeExit, setNewEmployeeExit] = useState({
// //     employee: '',
// //     exitDate: '',
// //     exitType: '',
// //     exitInterview: 'Yes',
// //     disableAccount: 'Yes',
// //     description: '',
// //     file: null
// //   });

// //   const [newExitType, setNewExitType] = useState('');

// //   const fetchExitTypes = useCallback(async () => {
// //     setLoadingExitTypes(true);
// //     setExitTypesError(null);
// //     try {
// //       const response = await fetch(EXIT_TYPE_API_URL);
// //       if (!response.ok) {
// //         throw new Error(`HTTP error! status: ${response.status}`);
// //       }
// //       const data = await response.json();
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

// //   const handleChangePage = (event, newPage) => {
// //     setPage(newPage);
// //   };

// //   const handleChangeRowsPerPage = (event) => {
// //     setRowsPerPage(parseInt(event.target.value, 10));
// //     setPage(0);
// //   };

// //   const handleExitTypeChangePage = (event, newPage) => {
// //     setExitTypePage(newPage);
// //   };

// //   const handleExitTypeChangeRowsPerPage = (event) => {
// //     setExitTypeRowsPerPage(parseInt(event.target.value, 10));
// //     setExitTypePage(0);
// //   };

// //   const handleSearch = (e) => {
// //     setSearchTerm(e.target.value);
// //     setPage(0); 
// //   };

// //   const handleExitTypeSearch = (e) => {
// //     setExitTypeSearchTerm(e.target.value);
// //     setExitTypePage(0); 
// //   };

// //   const handleEmployeeExitChange = (field, value) => {
// //     setNewEmployeeExit({
// //       ...newEmployeeExit,
// //       [field]: value
// //     });
// //   };

// //   const handleFileUpload = (e) => {
// //     const file = e.target.files[0];
// //     if (file) {
// //       if (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif') {
// //         if (file.size <= 2 * 1024 * 1024) { // Max 2MB
// //             setNewEmployeeExit({
// //             ...newEmployeeExit,
// //             file: file
// //             });
// //         } else {
// //             alert('File is too large. Maximum size is 2MB.');
// //             e.target.value = null;
// //         }
// //       } else {
// //         alert('Please upload only .gif, .png, .jpg, .jpeg files');
// //         e.target.value = null; 
// //       }
// //     }
// //   };

// //   const handleOpenEditEmployeeExitDialog = (exit) => {
// //     setEditingExit(exit);
// //     setNewEmployeeExit({
// //       employee: exit.employee.name,
// //       exitDate: convertToInputDate(exit.exitDate), // Convert DD/MM/YYYY to YYYY-MM-DD
// //       exitType: exit.exitType,
// //       exitInterview: exit.exitInterview,
// //       disableAccount: exit.disableAccount,
// //       description: exit.description || '',
// //       file: null, // Reset file, user must re-select if changing avatar
// //     });
// //     setOpenAddExitDialog(true);
// //   };

// //   const handleDeleteEmployeeExit = (id) => {
// //     if (window.confirm('Are you sure you want to delete this employee exit record?')) {
// //       setEmployeeExits(employeeExits.filter(exit => exit.id !== id));
// //       alert('Employee Exit record deleted successfully (locally).');
// //     }
// //   };

// //   const handleSubmitEmployeeExit = () => {
// //     if (!newEmployeeExit.employee || !newEmployeeExit.exitDate || !newEmployeeExit.exitType) {
// //       alert('Please fill all required fields: Employee, Exit Date, and Exit Type.');
// //       return;
// //     }

// //     let formattedExitDate = newEmployeeExit.exitDate 
// //         ? formatDate(newEmployeeExit.exitDate) // Handles YYYY-MM-DD from input
// //         : formatDate(new Date().toISOString().split('T')[0]); // Fallback

// //     let avatarUrl;
// //     if (newEmployeeExit.file) {
// //       avatarUrl = URL.createObjectURL(newEmployeeExit.file);
// //     } else if (editingExit && editingExit.employee.avatar) {
// //       avatarUrl = editingExit.employee.avatar; // Keep existing avatar if no new file
// //     } else {
// //       avatarUrl = '/user-image.png'; // Default if new or no previous avatar
// //     }

// //     const exitData = {
// //       employee: {
// //         name: newEmployeeExit.employee,
// //         email: `${newEmployeeExit.employee.toLowerCase().replace(/\s+/g, '.')}@tdtl.world`,
// //         avatar: avatarUrl
// //       },
// //       exitType: newEmployeeExit.exitType,
// //       exitDate: formattedExitDate,
// //       exitInterview: newEmployeeExit.exitInterview,
// //       disableAccount: newEmployeeExit.disableAccount,
// //       description: newEmployeeExit.description,
// //     };

// //     if (editingExit) {
// //       const updatedExits = employeeExits.map(ex =>
// //         ex.id === editingExit.id ? { ...exitData, id: editingExit.id } : ex
// //       );
// //       setEmployeeExits(updatedExits);
// //       alert('Employee Exit updated successfully (locally).');
// //     } else {
// //       const newId = employeeExits.length > 0 ? Math.max(...employeeExits.map(e => e.id)) + 1 : 1;
// //       const newExitEntry = {
// //         ...exitData,
// //         id: newId,
// //       };
// //       setEmployeeExits([...employeeExits, newExitEntry]);
// //       alert('Employee Exit added successfully (locally).');
// //     }
// //     handleCloseEmployeeExitDialog();
// //   };

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
// //         },
// //         body: JSON.stringify({ category_name: newExitType.trim() }),
// //       });
// //       if (!response.ok) {
// //         const errorData = await response.json().catch(() => ({ message: 'Failed to add exit type.' }));
// //         throw new Error(errorData.message || errorData.detail || `HTTP error! status: ${response.status}`);
// //       }
// //       alert('Exit type added successfully!');
// //       handleCloseExitTypeDialog();
// //       fetchExitTypes(); 
// //     } catch (error) {
// //       console.error("Failed to submit exit type:", error);
// //       setSubmitExitTypeError(error.message);
// //       alert(`Error adding exit type: ${error.message}`);
// //     } finally {
// //       setSubmittingExitType(false);
// //     }
// //   };

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
// //     setEditingExit(null); // Clear editing state
// //   };

// //   const handleCloseExitTypeDialog = () => {
// //     setOpenAddExitTypeDialog(false);
// //     setNewExitType('');
// //     setSubmitExitTypeError(null);
// //   };

// //   const handleResetEmployeeExitForm = () => {
// //     setNewEmployeeExit({
// //       employee: editingExit ? editingExit.employee.name : '', // Keep current employee if editing
// //       exitDate: editingExit ? convertToInputDate(editingExit.exitDate) : '',
// //       exitType: editingExit ? editingExit.exitType : '',
// //       exitInterview: editingExit ? editingExit.exitInterview : 'Yes',
// //       disableAccount: editingExit ? editingExit.disableAccount : 'Yes',
// //       description: editingExit ? (editingExit.description || '') : '',
// //       file: null
// //     });
// //     // If an actual file input element exists and needs resetting visually:
// //     const fileInput = document.getElementById('employee-exit-file-input');
// //     if (fileInput) {
// //       fileInput.value = '';
// //     }
// //   };

// //   const handleExportEmployees = () => {
// //     let csvContent = "data:text/csv;charset=utf-8,";
// //     csvContent += "Employee Name,Employee Email,Exit Type,Exit Date,Exit Interview,Disable Account,Description\n";

// //     employeeExits.forEach(exit => {
// //       const row = [
// //         `"${exit.employee.name.replace(/"/g, '""')}"`,
// //         `"${exit.employee.email.replace(/"/g, '""')}"`,
// //         `"${exit.exitType.replace(/"/g, '""')}"`,
// //         exit.exitDate,
// //         exit.exitInterview,
// //         exit.disableAccount,
// //         `"${(exit.description || '').replace(/"/g, '""')}"`
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

// //   const filteredEmployeeExits = employeeExits.filter(exit => 
// //     (exit.employee.name && exit.employee.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
// //     (exit.exitType && exit.exitType.toLowerCase().includes(searchTerm.toLowerCase())) ||
// //     (exit.exitDate && exit.exitDate.includes(searchTerm))
// //   );

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

// //   const paginatedEmployeeExits = filteredEmployeeExits.slice(
// //     page * rowsPerPage,
// //     page * rowsPerPage + rowsPerPage
// //   );

// //   const paginatedExitTypes = sortedAndFilteredExitTypes.slice(
// //     exitTypePage * exitTypeRowsPerPage,
// //     exitTypePage * exitTypeRowsPerPage + exitTypeRowsPerPage
// //   );

// //   return (
// //     <ThemeProvider theme={theme}>
// //       <CssBaseline />
// //       <Box sx={{ p: 3 }}>
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
// //                 onClick={() => { setEditingExit(null); setOpenAddExitDialog(true);}} // Ensure editingExit is null for new entry
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
// //                       <IconButton size="small" title="Sort (not implemented for this column)"> 
// //                         <SortIcon fontSize="small" />
// //                       </IconButton>
// //                     </Box>
// //                   </TableCell>
// //                   <TableCell>
// //                     <Box sx={{ display: 'flex', alignItems: 'center' }}>
// //                       EXIT TYPE
// //                       <IconButton size="small" title="Sort (not implemented for this column)">
// //                         <SortIcon fontSize="small" />
// //                       </IconButton>
// //                     </Box>
// //                   </TableCell>
// //                   <TableCell>
// //                     <Box sx={{ display: 'flex', alignItems: 'center' }}>
// //                       <CalendarTodayIcon fontSize="small" sx={{ mr: 0.5 }} />
// //                       EXIT DATE
// //                       <IconButton size="small" title="Sort (not implemented for this column)">
// //                         <SortIcon fontSize="small" />
// //                       </IconButton>
// //                     </Box>
// //                   </TableCell>
// //                   <TableCell>EXIT INTERVIEW</TableCell>
// //                   <TableCell>DISABLE ACCOUNT</TableCell>
// //                   <TableCell>ACTIONS</TableCell>
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
// //                       <IconButton size="small" color="primary" onClick={() => handleOpenEditEmployeeExitDialog(exit)} title="Edit">
// //                         <EditIcon fontSize="small"/>
// //                       </IconButton>
// //                       <IconButton size="small" color="secondary" onClick={() => handleDeleteEmployeeExit(exit.id)} title="Delete">
// //                         <DeleteIcon fontSize="small"/>
// //                       </IconButton>
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

// //         <Dialog open={openAddExitDialog} onClose={handleCloseEmployeeExitDialog} maxWidth="md" fullWidth>
// //           <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
// //             <Typography variant="h6">{editingExit ? 'Edit Employee Exit' : 'Add New Employee Exit'}</Typography>
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
// //                       value={newEmployeeExit.exitDate} // Should be YYYY-MM-DD
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
// //                 <Paper variant="outlined" sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
// //                     <Typography variant="subtitle1" gutterBottom>
// //                         {editingExit ? 'Change' : 'Upload'} Employee Avatar / Attachment
// //                     </Typography>
// //                     {editingExit && editingExit.employee.avatar && editingExit.employee.avatar !== '/user-image.png' && !newEmployeeExit.file && (
// //                         <Box sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1}}>
// //                         <Typography variant="body2">Current:</Typography>
// //                         <Avatar src={editingExit.employee.avatar} alt="Current avatar" sx={{width: 40, height: 40}}/>
// //                         </Box>
// //                     )}
// //                      {newEmployeeExit.file && (
// //                         <Box sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1}}>
// //                             <Typography variant="body2">New:</Typography>
// //                             <Avatar src={URL.createObjectURL(newEmployeeExit.file)} alt="New avatar preview" sx={{width: 40, height: 40}}/>
// //                         </Box>
// //                     )}
// //                     <Button
// //                         variant="outlined"
// //                         component="label"
// //                         fullWidth
// //                         sx={{ mb: 1, mt: 'auto' }} // Push to bottom if content is sparse
// //                     >
// //                         {newEmployeeExit.file ? `File: ${newEmployeeExit.file.name}` : 'Browse File'}
// //                         <input
// //                         id="employee-exit-file-input" // Added ID for potential reset
// //                         type="file"
// //                         hidden
// //                         onChange={handleFileUpload}
// //                         accept=".jpg,.jpeg,.png,.gif"
// //                         />
// //                     </Button>
// //                     {newEmployeeExit.file && (
// //                         <Button 
// //                             size="small" 
// //                             onClick={() => {
// //                                 handleEmployeeExitChange('file', null);
// //                                 const fileInput = document.getElementById('employee-exit-file-input');
// //                                 if (fileInput) fileInput.value = ''; // Attempt to reset file input
// //                             }}
// //                             color="secondary"
// //                             sx={{alignSelf: 'flex-start'}}
// //                         >
// //                             Remove selected file
// //                         </Button>
// //                     )}
// //                     <Typography variant="caption" color="textSecondary" display="block" mt={1}>
// //                         Allowed: GIF, PNG, JPG, JPEG. Max 2MB.
// //                     </Typography>
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
// //               {editingExit ? 'Update Employee Exit' : 'Save Employee Exit'}
// //             </Button>
// //           </DialogActions>
// //         </Dialog>

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
// //                                 '&:hover': { bgcolor: page === i ? 'primary.dark' : 'action.hover' } // Corrected: exitTypePage === i
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
// import { Edit, Delete } from '@mui/icons-material';
// import axiosInstance from '../../utils/axiosInstance'; // Ensure this path is correct
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
//   Divider,
//   CssBaseline,
//   InputAdornment,
//   CircularProgress,
//   TableSortLabel,
// } from '@mui/material';
// import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
// import PersonIcon from '@mui/icons-material/Person';
// import FileDownloadIcon from '@mui/icons-material/FileDownload';

// // API Configuration
// const API_BASE_URL = 'https://tdtlworld.com/hrms-backend/api';
// const EXIT_TYPE_API_URL = `${API_BASE_URL}/exit-type/`;
// const EMPLOYEE_DROPDOWN_API_URL = 'https://tdtlworld.com/hrms-backend/employee-dropdown/';

// // Create theme
// const theme = createTheme({
//   palette: {
//     primary: {
//       main: '#7c4dff',
//     },
//     secondary: {
//       main: '#f50057',
//     },
//     success: { // Added for status chip
//       main: '#4caf50',
//     },
//     warning: { // Added for status chip
//       main: '#ff9800',
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

// // Utility function for formatting date
// const formatDate = (dateString) => {
//   if (!dateString) return 'N/A';
//   if (/^\d{2}\/\d{2}\/\d{4}$/.test(dateString)) {
//     return dateString;
//   }
//   try {
//     let date;
//     if (typeof dateString === 'string') {
//       if (dateString.includes(' ')) {
//         date = new Date(dateString.replace(' ', 'T'));
//         if (isNaN(date.getTime())) {
//           const parts = dateString.split(' ');
//           const dateParts = parts[0].split('-');
//           const timeParts = parts[1] ? parts[1].split(':') : [0, 0, 0];
//           date = new Date(Date.UTC(
//             parseInt(dateParts[0], 10),
//             parseInt(dateParts[1], 10) - 1,
//             parseInt(dateParts[2], 10),
//             parseInt(timeParts[0], 10),
//             parseInt(timeParts[1], 10),
//             parseInt(timeParts[2], 10)
//           ));
//         }
//       } else if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
//         const parts = dateString.split('-');
//         date = new Date(Date.UTC(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10)));
//       } else {
//         date = new Date(dateString);
//       }
//     } else {
//       date = new Date(dateString);
//     }
//     if (isNaN(date.getTime())) {
//       return dateString;
//     }
//     const day = date.getUTCDate().toString().padStart(2, '0');
//     const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
//     const year = date.getUTCFullYear();
//     return `${day}/${month}/${year}`;
//   } catch (error) {
//     return dateString;
//   }
// };

// // Helper function to capitalize strings like 'yes' to 'Yes'
// const capitalize = (s) => {
//   if (typeof s !== 'string' || !s) return '';
//   return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
// };

// // Helper function for Status Chip
// const getStatusChip = (statusValue) => {
//   // IMPORTANT: Adjust this logic based on your actual status values from API
//   // For demonstration, using a placeholder logic based on exit_id or a 'status' field if available.
//   // If your API returns 'approved', 'pending', etc., use that.

//   // Example: if statusValue is directly 'Approved' or 'Pending'
//   const statusText = capitalize(statusValue || 'Pending'); // Default to Pending if undefined

//   let color = 'default';
//   if (statusText === 'Approved') {
//     color = 'success';
//   } else if (statusText === 'Pending') {
//     color = 'warning';
//   } else if (statusText === 'Rejected') {
//     color = 'error';
//   }

//   return <Chip label={statusText} color={color} size="small" />;
// };


// function EmployeeExitManagement() {
//   const [hoveredRow, setHoveredRow] = useState(null);

//   const [exitTypes, setExitTypes] = useState([]);
//   const [loadingExitTypes, setLoadingExitTypes] = useState(true);
//   const [exitTypesError, setExitTypesError] = useState(null);
//   const [submittingExitType, setSubmittingExitType] = useState(false);
//   const [submitExitTypeError, setSubmitExitTypeError] = useState(null);
//   const [exitTypeSortConfig, setExitTypeSortConfig] = useState({ key: 'name', direction: 'asc' });

//   const [employeesDropdownData, setEmployeesDropdownData] = useState([]);
//   const [loadingEmployeesDropdown, setLoadingEmployeesDropdown] = useState(true);
//   const [employeesDropdownError, setEmployeesDropdownError] = useState(null);

//   const [employeeExits, setEmployeeExits] = useState([]);
//   const [loadingExits, setLoadingExits] = useState(true);
//   const [exitError, setExitError] = useState(null);

//   const [openAddExitDialog, setOpenAddExitDialog] = useState(false);
//   const [openAddExitTypeDialog, setOpenAddExitTypeDialog] = useState(false);

//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);

//   const [exitTypePage, setExitTypePage] = useState(0);
//   const [exitTypeRowsPerPage, setExitTypeRowsPerPage] = useState(10);

//   const [searchTerm, setSearchTerm] = useState('');
//   const [exitTypeSearchTerm, setExitTypeSearchTerm] = useState('');

//   const initialEmployeeExitState = {
//     employeeId: '', exitDate: '', exitTypeId: '',
//     exitInterview: 'Yes', disableAccount: 'Yes',
//     description: '', file: null, currentEditingId: null,
//   };

//   const [newEmployeeExit, setNewEmployeeExit] = useState(initialEmployeeExitState);
//   const [newExitType, setNewExitType] = useState('');

//   const fetchExitTypes = useCallback(async () => {
//     setLoadingExitTypes(true);
//     setExitTypesError(null);
//     try {
//       const response = await axiosInstance.get(EXIT_TYPE_API_URL);
//       const transformedData = response.data.map(item => ({
//         id: item.value, name: item.label, createdAt: formatDate(item.created_at),
//       }));
//       setExitTypes(transformedData);
//     } catch (error) {
//       console.error("Failed to fetch exit types:", error.response?.data || error.message);
//       setExitTypesError(error.response?.data?.detail || error.message || "Failed to load exit types.");
//     } finally {
//       setLoadingExitTypes(false);
//     }
//   }, []);

//   const fetchEmployeesDropdown = useCallback(async () => {
//     setLoadingEmployeesDropdown(true);
//     setEmployeesDropdownError(null);
//     try {
//       const response = await axiosInstance.get(EMPLOYEE_DROPDOWN_API_URL);
//       setEmployeesDropdownData(response.data || []);
//     } catch (error) {
//       console.error("Failed to fetch employees dropdown:", error.response?.data || error.message);
//       setEmployeesDropdownError(error.response?.data?.detail || error.message || "Failed to load employee list.");
//     } finally {
//       setLoadingEmployeesDropdown(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchExitTypes();
//     fetchEmployeesDropdown();
//   }, [fetchExitTypes, fetchEmployeesDropdown]);

//   const fetchEmployeeExits = async () => {
//     setLoadingExits(true);
//     try {
//       const response = await axiosInstance.get('/employee-exits/');
//       // Assuming 'status' might come from API, if not, placeholder logic in getStatusChip will apply
//       setEmployeeExits(response.data);
//       setExitError(null);
//     } catch (error) {
//       console.error('Error fetching employee exits:', error.response?.data || error.message);
//       setExitError(error.response?.data?.detail || error.message || 'Failed to load employee exits');
//     } finally {
//       setLoadingExits(false);
//     }
//   };

//   useEffect(() => {
//     fetchEmployeeExits();
//   }, []);

//   const handleOpenEditDialog = (exitToEdit) => {
//     setNewEmployeeExit({
//       employeeId: exitToEdit.employee_id?.toString() || '',
//       exitDate: exitToEdit.exit_date ? exitToEdit.exit_date.split('T')[0] : '',
//       exitTypeId: exitToEdit.exit_type_id?.toString() || '',
//       exitInterview: capitalize(exitToEdit.exit_interview) || 'Yes',
//       disableAccount: capitalize(exitToEdit.is_inactivate_account) || 'Yes',
//       description: exitToEdit.reason || '', // Keep reason for edit form, though not in table
//       file: null, currentEditingId: exitToEdit.exit_id,
//     });
//     setOpenAddExitDialog(true);
//   };

//   const handleSubmitEmployeeExit = async () => {
//     const isEditMode = !!newEmployeeExit.currentEditingId;
//     if (!isEditMode && !newEmployeeExit.employeeId) { alert('Please select an Employee.'); return; }
//     if (!newEmployeeExit.exitDate) { alert('Please select an Exit Date.'); return; }
//     if (!newEmployeeExit.exitTypeId) { alert('Please select an Exit Type.'); return; }

//     const selectedExitType = exitTypes.find(type => type.id.toString() === newEmployeeExit.exitTypeId.toString());
//     const exitTypeNameForPayload = selectedExitType ? selectedExitType.name : '';

//     if (isEditMode) {
//       const updatePayload = {
//         exit_date: newEmployeeExit.exitDate,
//         exit_type_id: parseInt(newEmployeeExit.exitTypeId),
//         exit_type_name: exitTypeNameForPayload,
//         reason: newEmployeeExit.description, // Keep reason for PATCH if backend expects it
//         accountability_to: "0",
//         // If exit_interview and is_inactivate_account are updatable via PATCH
//         exit_interview: newEmployeeExit.exitInterview.toLowerCase(),
//         is_inactivate_account: newEmployeeExit.disableAccount.toLowerCase(),
//       };
//       try {
//         await axiosInstance.patch(`/employee-exits/${newEmployeeExit.currentEditingId}/`, updatePayload);
//         alert('Employee Exit updated successfully.');
//         fetchEmployeeExits(); handleCloseEmployeeExitDialog();
//       } catch (error) {
//         console.error('Error updating employee exit:', error.response?.data || error.message);
//         alert(`Failed to update employee exit. ${error.response?.data?.detail || error.message || ''}`);
//       }
//     } else {
//       const createPayload = {
//         employee_id: parseInt(newEmployeeExit.employeeId), exit_date: newEmployeeExit.exitDate,
//         exit_type_id: parseInt(newEmployeeExit.exitTypeId), exit_type_name: exitTypeNameForPayload,
//         sub_exit_type_id: null, exit_interview: newEmployeeExit.exitInterview.toLowerCase(),
//         is_inactivate_account: newEmployeeExit.disableAccount.toLowerCase(),
//         reason: newEmployeeExit.description, accountability_to: "0", added_by: 2
//       };
//       try {
//         await axiosInstance.post('/employee-exits/', createPayload);
//         alert('Employee Exit added successfully.');
//         fetchEmployeeExits(); handleCloseEmployeeExitDialog();
//       } catch (error) {
//         console.error('Error adding employee exit:', error.response?.data || error.message);
//         alert(`Failed to add employee exit. ${error.response?.data?.detail || error.message || ''}`);
//       }
//     }
//   };

//   const handleDeleteExit = async (exitId) => {
//     if (!window.confirm('Are you sure you want to delete this employee exit?')) return;
//     try {
//       await axiosInstance.delete(`/employee-exits/${exitId}/`);
//       alert('Employee Exit deleted successfully.'); fetchEmployeeExits();
//     } catch (error) {
//       console.error('Error deleting employee exit:', error.response?.data || error.message);
//       alert(`Failed to delete employee exit. ${error.response?.data?.detail || error.message || ''}`);
//     }
//   };

//   const handleCloseEmployeeExitDialog = () => { setOpenAddExitDialog(false); setNewEmployeeExit(initialEmployeeExitState); };
//   const handleCloseExitTypeDialog = () => { setOpenAddExitTypeDialog(false); setNewExitType(''); setSubmitExitTypeError(null); };

//   const handleChangePage = (event, newPage) => setPage(newPage);
//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const handleExitTypeChangePage = (event, newPage) => setExitTypePage(newPage);
//   const handleExitTypeChangeRowsPerPage = (event) => {
//     setExitTypeRowsPerPage(parseInt(event.target.value, 10));
//     setExitTypePage(0);
//   };

//   const handleSearch = (e) => { setSearchTerm(e.target.value); setPage(0); };
//   const handleExitTypeSearch = (e) => { setExitTypeSearchTerm(e.target.value); setExitTypePage(0); };
//   const handleEmployeeExitChange = (field, value) => setNewEmployeeExit(prev => ({ ...prev, [field]: value }));

//   const handleFileUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       if (['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
//         if (file.size <= 2 * 1024 * 1024) { setNewEmployeeExit(prev => ({ ...prev, file: file })); }
//         else { alert('File size exceeds 2MB limit.'); e.target.value = null; }
//       } else { alert('Please upload only .gif, .png, .jpg, .jpeg files'); e.target.value = null; }
//     }
//   };

//   const handleSubmitExitType = async () => {
//     if (!newExitType.trim()) { setSubmitExitTypeError('Exit Type name is required.'); return; }
//     setSubmittingExitType(true); setSubmitExitTypeError(null);
//     try {
//       await axiosInstance.post(EXIT_TYPE_API_URL, { category_name: newExitType.trim() });
//       alert('Exit type added successfully!');
//       setNewExitType('');
//       fetchExitTypes();
//     } catch (error) {
//       console.error("Failed to submit exit type:", error.response?.data || error.message);
//       setSubmitExitTypeError(error.response?.data?.detail || error.response?.data?.category_name?.[0] || error.message || "Failed to add exit type.");
//     } finally { setSubmittingExitType(false); }
//   };

//   const handleResetEmployeeExitForm = () => setNewEmployeeExit(initialEmployeeExitState);

//   const handleExportEmployees = () => {
//     let csvContent = "data:text/csv;charset=utf-8,";
//     // Updated headers
//     csvContent += "Employee Name,Employee Email,Exit Type,Exit Date,Exit Interview,Disable Account,Status\n";
//     const exitsToExport = filteredEmployeeExits;
//     exitsToExport.forEach(exit => {
//       // Placeholder for actual status; adjust if API provides it
//       const status = exit.status || (exit.exit_id % 2 === 0 ? 'Approved' : 'Pending');
//       const row = [
//         `"${(exit.employee_name || '').replace(/"/g, '""')}"`,
//         `""`, // Employee Email placeholder
//         `"${(exit.exit_type_name || '').replace(/"/g, '""')}"`,
//         `"${formatDate(exit.exit_date || '')}"`,
//         `"${capitalize(exit.exit_interview || '')}"`,
//         `"${capitalize(exit.is_inactivate_account || '')}"`,
//         `"${status}"`, // Using the determined status
//         // `"${(exit.reason || '').replace(/"/g, '""')}"` // Reason removed
//       ].join(",");
//       csvContent += row + "\n";
//     });
//     const encodedUri = encodeURI(csvContent);
//     const link = document.createElement("a");
//     link.setAttribute("href", encodedUri); link.setAttribute("download", "employee_exits.csv");
//     document.body.appendChild(link); link.click(); document.body.removeChild(link);
//   };

//   const handleExitTypeSort = (key) => {
//     let direction = 'asc';
//     if (exitTypeSortConfig.key === key && exitTypeSortConfig.direction === 'asc') { direction = 'desc'; }
//     setExitTypeSortConfig({ key, direction });
//   };

//   const filteredEmployeeExits = useMemo(() => employeeExits.filter(exit =>
//     (exit.employee_name && exit.employee_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
//     (exit.exit_type_name && exit.exit_type_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
//     (exit.exit_date && formatDate(exit.exit_date).toLowerCase().includes(searchTerm.toLowerCase())) ||
//     (capitalize(exit.exit_interview || '').toLowerCase().includes(searchTerm.toLowerCase())) ||
//     (capitalize(exit.is_inactivate_account || '').toLowerCase().includes(searchTerm.toLowerCase())) ||
//     // Add search for status if needed, e.g., (exit.status && exit.status.toLowerCase().includes(searchTerm.toLowerCase()))
//     (exit.reason && exit.reason.toLowerCase().includes(searchTerm.toLowerCase())) // Kept reason in search if it's still a filterable field internally
//   ), [employeeExits, searchTerm]);

//   const sortedAndFilteredExitTypes = useMemo(() => {
//     let items = [...exitTypes];
//     if (exitTypeSearchTerm) {
//       items = items.filter(type => type.name && type.name.toLowerCase().includes(exitTypeSearchTerm.toLowerCase()));
//     }
//     if (exitTypeSortConfig.key) {
//       items.sort((a, b) => {
//         const valA = a[exitTypeSortConfig.key] || ''; const valB = b[exitTypeSortConfig.key] || '';
//         if (valA < valB) return exitTypeSortConfig.direction === 'asc' ? -1 : 1;
//         if (valA > valB) return exitTypeSortConfig.direction === 'asc' ? 1 : -1;
//         return 0;
//       });
//     }
//     return items;
//   }, [exitTypes, exitTypeSearchTerm, exitTypeSortConfig]);

//   const paginatedEmployeeExits = filteredEmployeeExits.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
//   const paginatedExitTypes = sortedAndFilteredExitTypes.slice(exitTypePage * exitTypeRowsPerPage, exitTypePage * exitTypeRowsPerPage + exitTypeRowsPerPage);

//   const totalPages = Math.ceil(filteredEmployeeExits.length / rowsPerPage);
//   const totalExitTypePages = Math.ceil(sortedAndFilteredExitTypes.length / exitTypeRowsPerPage);

//   return (
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
//       <Box sx={{ p: 3 }}>
//         <Paper elevation={3} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
//           <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, flexWrap: 'wrap', gap: 1 }}>
//             <Typography variant="h6" sx={{ fontWeight: 'bold' }}>List All Employee Exit</Typography>
//             <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
//               <Button variant="contained" onClick={() => setOpenAddExitTypeDialog(true)} sx={{ bgcolor: '#7c4dff', '&:hover': { bgcolor: '#6039c8' } }}>+ Exit Type</Button>
//               <Button variant="contained" startIcon={<FileDownloadIcon />} onClick={handleExportEmployees} sx={{ bgcolor: '#4caf50', '&:hover': { bgcolor: '#388e3c' } }}>Export Employees</Button>
//               <Button variant="contained" onClick={() => { setNewEmployeeExit(initialEmployeeExitState); setOpenAddExitDialog(true); }} sx={{ bgcolor: '#7c4dff', '&:hover': { bgcolor: '#6039c8' } }}>+ Add New Exit</Button>
//             </Box>
//           </Box>
//           <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, flexWrap: 'wrap', gap: 1 }}>
//             <Box sx={{ display: 'flex', alignItems: 'center' }}>
//               <Typography variant="body2" sx={{ mr: 1 }}>Show</Typography>
//               <FormControl size="small" sx={{ width: 80, mr: 1 }}>
//                 <Select value={rowsPerPage} onChange={handleChangeRowsPerPage}>
//                   <MenuItem value={5}>5</MenuItem>
//                   <MenuItem value={10}>10</MenuItem>
//                   <MenuItem value={25}>25</MenuItem>
//                   <MenuItem value={50}>50</MenuItem>
//                 </Select>
//               </FormControl>
//               <Typography variant="body2">entries</Typography>
//             </Box>
//             <Box sx={{ display: 'flex', alignItems: 'center' }}>
//               <Typography variant="body2" sx={{ mr: 1 }}>Search</Typography>
//               <TextField size="small" value={searchTerm} onChange={handleSearch} placeholder='Search exits...' />
//             </Box>
//           </Box>
//           <TableContainer>
//             <Table>
//               <TableHead>
//                 <TableRow>
//                   <TableCell><Box sx={{ display: 'flex', alignItems: 'center' }}><PersonIcon fontSize="small" sx={{ mr: 0.5 }} />EMPLOYEE</Box></TableCell>
//                   <TableCell><Box sx={{ display: 'flex', alignItems: 'center' }}>EXIT TYPE</Box></TableCell>
//                   <TableCell><Box sx={{ display: 'flex', alignItems: 'center' }}><CalendarTodayIcon fontSize="small" sx={{ mr: 0.5 }} />EXIT DATE</Box></TableCell>
//                   <TableCell>EXIT INTERVIEW</TableCell>
//                   <TableCell>DISABLE ACCOUNT</TableCell>
//                   <TableCell>STATUS</TableCell>
//                   <TableCell>ACTIONS</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {loadingExits ? (<TableRow><TableCell colSpan={7} align="center"><CircularProgress /></TableCell></TableRow>
//                 ) : exitError ? (<TableRow><TableCell colSpan={7} align="center" sx={{ color: 'error.main' }}>{exitError}. <Button onClick={fetchEmployeeExits} size="small">Retry</Button></TableCell></TableRow>
//                 ) : paginatedEmployeeExits.length > 0 ? (
//                   paginatedEmployeeExits.map((exit) => (
//                     <TableRow key={exit.exit_id} hover onMouseEnter={() => setHoveredRow(exit.exit_id)} onMouseLeave={() => setHoveredRow(null)} sx={{ '&:hover': { backgroundColor: 'action.hover' } }}>
//                       <TableCell>{exit.employee_name}</TableCell>
//                       <TableCell>{exit.exit_type_name}</TableCell>
//                       <TableCell>{formatDate(exit.exit_date)}</TableCell>
//                       <TableCell>{capitalize(exit.exit_interview)}</TableCell>
//                       <TableCell>{capitalize(exit.is_inactivate_account)}</TableCell>
//                       <TableCell>
//                         {/* 
//                           Placeholder for status. 
//                           Replace `exit.status || (exit.exit_id % 2 === 0 ? 'Approved' : 'Pending')` 
//                           with actual status logic from your API data, e.g., `exit.status_name` or similar.
//                         */}
//                         {getStatusChip(exit.status || (exit.exit_id % 2 === 0 ? 'Approved' : 'Pending'))}
//                       </TableCell>
//                       <TableCell>
//                         <IconButton size="small" onClick={() => handleOpenEditDialog(exit)} title="Edit"><Edit fontSize="small" /></IconButton>
//                         <IconButton size="small" onClick={() => handleDeleteExit(exit.exit_id)} title="Delete"><Delete fontSize="small" /></IconButton>
//                       </TableCell>
//                     </TableRow>
//                   ))
//                 ) : (<TableRow><TableCell colSpan={7} align="center">No employee exits found.</TableCell></TableRow>)}
//               </TableBody>
//             </Table>
//           </TableContainer>
//           {filteredEmployeeExits.length > 0 && (
//             <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', mt: 2, gap: 1 }}>
//               <Button size="small" disabled={page === 0} onClick={(e) => handleChangePage(e, page - 1)} sx={{ border: '1px solid #ddd' }}>Previous</Button>
//               <Typography variant="body2">Page {page + 1} of {totalPages}</Typography>
//               <Button size="small" disabled={page >= totalPages - 1} onClick={(e) => handleChangePage(e, page + 1)} sx={{ border: '1px solid #ddd' }}>Next</Button>
//             </Box>
//           )}
//         </Paper>

//         <Dialog open={openAddExitDialog} onClose={handleCloseEmployeeExitDialog} maxWidth="md" fullWidth>
//           <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//             <Typography variant="h6">{newEmployeeExit.currentEditingId ? 'Edit Employee Exit' : 'Add New Employee Exit'}</Typography>
//             <Button variant="outlined" onClick={handleCloseEmployeeExitDialog}>Close</Button>
//           </DialogTitle>
//           <Divider />
//           <DialogContent>
//             <Grid container spacing={3}>
//               <Grid item xs={12} md={8}>
//                 <Grid container spacing={2}>
//                   <Grid item xs={12} md={6}>
//                     <FormControl fullWidth required={!newEmployeeExit.currentEditingId} disabled={!!newEmployeeExit.currentEditingId || loadingEmployeesDropdown}>
//                       <InputLabel id="employee-label">Employee</InputLabel>
//                       <Select labelId="employee-label" label="Employee" value={newEmployeeExit.employeeId} onChange={(e) => handleEmployeeExitChange('employeeId', e.target.value)}>
//                         <MenuItem value=""><em>{loadingEmployeesDropdown ? "Loading employees..." : employeesDropdownError ? employeesDropdownError : "Select Employee"}</em></MenuItem>
//                         {!loadingEmployeesDropdown && !employeesDropdownError && employeesDropdownData.map((emp) => (<MenuItem key={emp.value} value={emp.value.toString()}>{emp.label}</MenuItem>))}
//                       </Select>
//                     </FormControl>
//                   </Grid>
//                   <Grid item xs={12} md={6}>
//                     <TextField label="Exit Date" fullWidth required type="date" InputLabelProps={{ shrink: true }} value={newEmployeeExit.exitDate} onChange={(e) => handleEmployeeExitChange('exitDate', e.target.value)} InputProps={{ endAdornment: (<InputAdornment position="end"><CalendarTodayIcon /></InputAdornment>) }} />
//                   </Grid>
//                   <Grid item xs={12} md={4}>
//                     <FormControl fullWidth required disabled={loadingExitTypes}>
//                       <InputLabel id="exit-type-label">Exit Type</InputLabel>
//                       <Select labelId="exit-type-label" label="Exit Type" value={newEmployeeExit.exitTypeId} onChange={(e) => handleEmployeeExitChange('exitTypeId', e.target.value)}>
//                         <MenuItem value=""><em>{loadingExitTypes ? "Loading types..." : exitTypesError ? "Error loading types" : "Select Exit Type"}</em></MenuItem>
//                         {!loadingExitTypes && !exitTypesError && exitTypes.map((type) => (<MenuItem key={type.id} value={type.id.toString()}>{type.name}</MenuItem>))}
//                       </Select>
//                     </FormControl>
//                   </Grid>
//                   <Grid item xs={12} md={4}>
//                     <FormControl fullWidth required>
//                       <InputLabel id="exit-interview-label">Exit Interview</InputLabel>
//                       <Select labelId="exit-interview-label" label="Exit Interview" value={newEmployeeExit.exitInterview} onChange={(e) => handleEmployeeExitChange('exitInterview', e.target.value)} >
//                         <MenuItem value="Yes">Yes</MenuItem><MenuItem value="No">No</MenuItem>
//                       </Select>
//                     </FormControl>
//                   </Grid>
//                   <Grid item xs={12} md={4}>
//                     <FormControl fullWidth required>
//                       <InputLabel id="disable-account-label">Disable Account</InputLabel>
//                       <Select labelId="disable-account-label" label="Disable Account" value={newEmployeeExit.disableAccount} onChange={(e) => handleEmployeeExitChange('disableAccount', e.target.value)}>
//                         <MenuItem value="Yes">Yes</MenuItem><MenuItem value="No">No</MenuItem>
//                       </Select>
//                     </FormControl>
//                   </Grid>
//                   <Grid item xs={12}>
//                     <TextField label="Description / Reason" fullWidth multiline rows={3} placeholder="Enter description or reason for exit..." value={newEmployeeExit.description} onChange={(e) => handleEmployeeExitChange('description', e.target.value)} />
//                   </Grid>
//                 </Grid>
//               </Grid>
//               <Grid item xs={12} md={4}>
//                 <Paper variant="outlined" sx={{ p: 2, height: '100%' }}>
//                   <Typography variant="subtitle1" gutterBottom>Exit Contract / Attachment</Typography>
//                   <TextField fullWidth disabled size="small" placeholder="No file chosen" value={newEmployeeExit.file ? newEmployeeExit.file.name : ''} sx={{ mb: 1 }} InputProps={{ startAdornment: newEmployeeExit.file ? (<InputAdornment position="start"><Chip size="small" label={newEmployeeExit.file.name} onDelete={() => handleEmployeeExitChange('file', null)} /></InputAdornment>) : null, }} />
//                   <Button variant="outlined" component="label" fullWidth>Browse File<input type="file" hidden onChange={handleFileUpload} accept=".jpg,.jpeg,.png,.gif" /></Button>
//                   <Typography variant="caption" color="textSecondary" display="block" mt={1}>Allowed: GIF, PNG, JPG, JPEG. Max 2MB.</Typography>
//                 </Paper>
//               </Grid>
//             </Grid>
//           </DialogContent>
//           <Divider />
//           <DialogActions sx={{ p: 2, justifyContent: 'flex-end' }}>
//             <Button onClick={handleResetEmployeeExitForm} sx={{ mr: 1, color: 'text.secondary', borderColor: 'divider' }} variant="outlined">Reset</Button>
//             <Button variant="contained" onClick={handleSubmitEmployeeExit}>{newEmployeeExit.currentEditingId ? 'Update Employee Exit' : 'Save Employee Exit'}</Button>
//           </DialogActions>
//         </Dialog>

//         <Dialog open={openAddExitTypeDialog} onClose={handleCloseExitTypeDialog} maxWidth="lg" fullWidth>
//           <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>Manage Exit Types<Button onClick={handleCloseExitTypeDialog} variant="outlined">Close</Button></DialogTitle>
//           <DialogContent dividers sx={{ p: 0 }}>
//             <Grid container>
//               <Grid item xs={12} md={4} sx={{ borderRight: { md: '1px solid #eee' } }}>
//                 <Box sx={{ p: 3 }}>
//                   <Typography variant="h6" sx={{ mb: 2 }}>Add New Exit Type</Typography>
//                   <FormControl fullWidth sx={{ mb: 2 }}>
//                     <TextField required label="Exit Type Name" placeholder="Enter exit type name" value={newExitType} onChange={(e) => setNewExitType(e.target.value)} disabled={submittingExitType} error={!!submitExitTypeError} helperText={submitExitTypeError} />
//                   </FormControl>
//                   <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
//                     <Button variant="contained" onClick={handleSubmitExitType} disabled={submittingExitType || !newExitType.trim()}>{submittingExitType ? <CircularProgress size={24} color="inherit" /> : 'Save Exit Type'}</Button>
//                   </Box>
//                 </Box>
//               </Grid>
//               <Grid item xs={12} md={8}>
//                 <Box sx={{ p: 3 }}>
//                   <Typography variant="h6" sx={{ mb: 2 }}>List All Exit Types</Typography>
//                   <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, flexWrap: 'wrap', gap: 1 }}>
//                     <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                       <Typography variant="body2" sx={{ mr: 1 }}>Show</Typography>
//                       <FormControl size="small" sx={{ width: 80, mr: 1 }}>
//                         <Select value={exitTypeRowsPerPage} onChange={handleExitTypeChangeRowsPerPage}>
//                           <MenuItem value={5}>5</MenuItem>
//                           <MenuItem value={10}>10</MenuItem>
//                           <MenuItem value={25}>25</MenuItem>
//                           <MenuItem value={50}>50</MenuItem>
//                         </Select>
//                       </FormControl>
//                       <Typography variant="body2">entries</Typography>
//                     </Box>
//                     <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                       <Typography variant="body2" sx={{ mr: 1 }}>Search</Typography>
//                       <TextField size="small" value={exitTypeSearchTerm} onChange={handleExitTypeSearch} placeholder='Search exit types...' />
//                     </Box>
//                   </Box>
//                   {loadingExitTypes ? (<Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}><CircularProgress /></Box>
//                   ) : exitTypesError ? (<Typography color="error" sx={{ p: 2 }}>Error: {exitTypesError} <Button onClick={fetchExitTypes} size="small">Retry</Button></Typography>
//                   ) : (
//                     <>
//                       <TableContainer component={Paper} variant="outlined">
//                         <Table size="small">
//                           <TableHead>
//                             <TableRow>
//                               <TableCell><TableSortLabel active={exitTypeSortConfig.key === 'name'} direction={exitTypeSortConfig.key === 'name' ? exitTypeSortConfig.direction : 'asc'} onClick={() => handleExitTypeSort('name')}>EXIT TYPE</TableSortLabel></TableCell>
//                               <TableCell><TableSortLabel active={exitTypeSortConfig.key === 'createdAt'} direction={exitTypeSortConfig.key === 'createdAt' ? exitTypeSortConfig.direction : 'asc'} onClick={() => handleExitTypeSort('createdAt')}>CREATED AT</TableSortLabel></TableCell>
//                             </TableRow>
//                           </TableHead>
//                           <TableBody>
//                             {paginatedExitTypes.length > 0 ? paginatedExitTypes.map((type) => (
//                               <TableRow key={type.id} hover><TableCell>{type.name}</TableCell><TableCell>{type.createdAt}</TableCell></TableRow>
//                             )) : (<TableRow><TableCell colSpan={2} align="center">No exit types found.</TableCell></TableRow>)}
//                           </TableBody>
//                         </Table>
//                       </TableContainer>
//                       {sortedAndFilteredExitTypes.length > 0 && (
//                         <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', mt: 2, gap: 1 }}>
//                           <Button size="small" disabled={exitTypePage === 0} onClick={(e) => handleExitTypeChangePage(e, exitTypePage - 1)} sx={{ border: '1px solid #ddd' }}>Previous</Button>
//                           <Typography variant="body2">Page {exitTypePage + 1} of {totalExitTypePages}</Typography>
//                           <Button size="small" disabled={exitTypePage >= totalExitTypePages - 1} onClick={(e) => handleExitTypeChangePage(e, exitTypePage + 1)} sx={{ border: '1px solid #ddd' }}>Next</Button>
//                         </Box>
//                       )}
//                     </>
//                   )}
//                 </Box>
//               </Grid>
//             </Grid>
//           </DialogContent>
//         </Dialog>
//       </Box>
//     </ThemeProvider>
//   );
// };

// export default EmployeeExitManagement;   ////










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

//   Divider,

//   CssBaseline,

//   InputAdornment,

//   CircularProgress,

//   TableSortLabel,

//   useMediaQuery,

//   Card,

//   CardContent,

//   CardActions,

//   Stack,

//   Tooltip,

// } from '@mui/material';

// import AddIcon from '@mui/icons-material/Add';

// import EditIcon from '@mui/icons-material/Edit';

// import DeleteIcon from '@mui/icons-material/Delete';

// import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

// import PersonIcon from '@mui/icons-material/Person';

// import FileDownloadIcon from '@mui/icons-material/FileDownload';

// import axiosInstance from '../../utils/axiosInstance'; // Ensure this path is correct



// // API Configuration

// const API_BASE_URL = 'https://tdtlworld.com/hrms-backend/api';

// const EXIT_TYPE_API_URL = `${API_BASE_URL}/exit-type/`;

// const EMPLOYEE_DROPDOWN_API_URL = 'https://tdtlworld.com/hrms-backend/employee-dropdown/';



// // Create theme based on the OfficeShifts component

// const theme = createTheme({

//   palette: {

//     primary: {

//       main: '#7c4dff', // Purple color

//     },

//     success: {

//       main: '#4caf50', // Green for export button

//     },

//     warning: {

//       main: '#ff9800',

//     },

//     error: {

//       main: '#f44336',

//     },

//     background: {

//       default: '#f5f5f9', // Light grey background

//       paper: '#ffffff',

//     },

//   },

//   breakpoints: {

//     values: {

//       xs: 0,

//       sm: 600,

//       md: 900, // Breakpoint for switching to card view

//       lg: 1200,

//       xl: 1536,

//     },

//   },

// });



// // Utility function for formatting date

// const formatDate = (dateString) => {

//   if (!dateString) return 'N/A';

//   try {

//     const date = new Date(dateString);

//     if (isNaN(date.getTime())) return dateString;

//     const day = String(date.getDate()).padStart(2, '0');

//     const month = String(date.getMonth() + 1).padStart(2, '0');

//     const year = date.getFullYear();

//     return `${day}/${month}/${year}`;

//   } catch (error) {

//     return dateString;

//   }

// };



// // Helper function to capitalize strings

// const capitalize = (s) => {

//   if (typeof s !== 'string' || !s) return '';

//   return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();

// };



// // Helper function for Status Chip

// const getStatusChip = (statusValue) => {

//   const statusText = capitalize(statusValue || 'Pending');

//   let color = 'default';

//   if (statusText === 'Approved') color = 'success';

//   else if (statusText === 'Pending') color = 'warning';

//   else if (statusText === 'Rejected') color = 'error';

//   return <Chip label={statusText} color={color} size="small" />;

// };



// function EmployeeExitManagement() {

//   const [exitTypes, setExitTypes] = useState([]);

//   const [loadingExitTypes, setLoadingExitTypes] = useState(true);

//   const [exitTypesError, setExitTypesError] = useState(null);

//   const [submittingExitType, setSubmittingExitType] = useState(false);

//   const [submitExitTypeError, setSubmitExitTypeError] = useState(null);

//   const [exitTypeSortConfig, setExitTypeSortConfig] = useState({ key: 'name', direction: 'asc' });



//   const [employeesDropdownData, setEmployeesDropdownData] = useState([]);

//   const [loadingEmployeesDropdown, setLoadingEmployeesDropdown] = useState(true);

//   const [employeesDropdownError, setEmployeesDropdownError] = useState(null);



//   const [employeeExits, setEmployeeExits] = useState([]);

//   const [loadingExits, setLoadingExits] = useState(true);

//   const [exitError, setExitError] = useState(null);



//   const [openAddExitDialog, setOpenAddExitDialog] = useState(false);

//   const [openAddExitTypeDialog, setOpenAddExitTypeDialog] = useState(false);



//   const [page, setPage] = useState(0);

//   const [rowsPerPage, setRowsPerPage] = useState(10);



//   const [exitTypePage, setExitTypePage] = useState(0);

//   const [exitTypeRowsPerPage, setExitTypeRowsPerPage] = useState(10);



//   const [searchTerm, setSearchTerm] = useState('');

//   const [exitTypeSearchTerm, setExitTypeSearchTerm] = useState('');



//   const initialEmployeeExitState = {

//     employeeId: '', exitDate: '', exitTypeId: '',

//     exitInterview: 'Yes', disableAccount: 'Yes',

//     description: '', file: null, currentEditingId: null,

//   };



//   const [newEmployeeExit, setNewEmployeeExit] = useState(initialEmployeeExitState);

//   const [newExitType, setNewExitType] = useState('');

//   const [editingExitType, setEditingExitType] = useState(null);

//   const isMobile = useMediaQuery(theme.breakpoints.down('md'));



//   const fetchExitTypes = useCallback(async () => {

//     setLoadingExitTypes(true);

//     setExitTypesError(null);

//     try {

//       const response = await axiosInstance.get(EXIT_TYPE_API_URL);

//       const transformedData = response.data.map(item => ({

//         id: item.value, name: item.label, createdAt: formatDate(item.created_at),

//       }));

//       setExitTypes(transformedData);

//     } catch (error) {

//       console.error("Failed to fetch exit types:", error);

//       setExitTypesError("Failed to load exit types.");

//     } finally {

//       setLoadingExitTypes(false);

//     }

//   }, []);



//   const fetchEmployeesDropdown = useCallback(async () => {

//     setLoadingEmployeesDropdown(true);

//     setEmployeesDropdownError(null);

//     try {

//       const response = await axiosInstance.get(EMPLOYEE_DROPDOWN_API_URL);

//       setEmployeesDropdownData(response.data || []);

//     } catch (error) {

//       console.error("Failed to fetch employees dropdown:", error);

//       setEmployeesDropdownError("Failed to load employee list.");

//     } finally {

//       setLoadingEmployeesDropdown(false);

//     }

//   }, []);



//   const fetchEmployeeExits = useCallback(async () => {

//     setLoadingExits(true);

//     try {

//       const response = await axiosInstance.get('/employee-exits/');

//       setEmployeeExits(response.data);

//       setExitError(null);

//     } catch (error) {

//       console.error("Error fetching employee exits:", error);

//       setExitError('Failed to load employee exits');

//     } finally {

//       setLoadingExits(false);

//     }

//   }, []);



//   useEffect(() => {

//     fetchExitTypes();

//     fetchEmployeesDropdown();

//     fetchEmployeeExits();

//   }, [fetchExitTypes, fetchEmployeesDropdown, fetchEmployeeExits]);



//   const handleOpenEditDialog = (exitToEdit) => {

//     setNewEmployeeExit({

//       employeeId: exitToEdit.employee_id?.toString() || '',

//       exitDate: exitToEdit.exit_date ? exitToEdit.exit_date.split('T')[0] : '',

//       exitTypeId: exitToEdit.exit_type_id?.toString() || '',

//       exitInterview: capitalize(exitToEdit.exit_interview) || 'Yes',

//       disableAccount: capitalize(exitToEdit.is_inactivate_account) || 'Yes',

//       description: exitToEdit.reason || '',

//       file: null, currentEditingId: exitToEdit.exit_id,

//     });

//     setOpenAddExitDialog(true);

//   };



//   const handleSubmitEmployeeExit = async () => {

//     const isEditMode = !!newEmployeeExit.currentEditingId;

//     if (!isEditMode && !newEmployeeExit.employeeId) { alert('Please select an Employee.'); return; }

//     if (!newEmployeeExit.exitDate) { alert('Please select an Exit Date.'); return; }

//     if (!newEmployeeExit.exitTypeId) { alert('Please select an Exit Type.'); return; }



//     const selectedExitType = exitTypes.find(type => type.id.toString() === newEmployeeExit.exitTypeId.toString());

//     const exitTypeNameForPayload = selectedExitType ? selectedExitType.name : '';



//     if (isEditMode) {

//       const updatePayload = {

//         exit_date: newEmployeeExit.exitDate,

//         exit_type_id: parseInt(newEmployeeExit.exitTypeId),

//         exit_type_name: exitTypeNameForPayload,

//         reason: newEmployeeExit.description,

//         accountability_to: "0",

//         exit_interview: newEmployeeExit.exitInterview.toLowerCase(),

//         is_inactivate_account: newEmployeeExit.disableAccount.toLowerCase(),

//       };

//       try {

//         await axiosInstance.patch(`/employee-exits/${newEmployeeExit.currentEditingId}/`, updatePayload);

//         alert('Employee Exit updated successfully.');

//         fetchEmployeeExits(); handleCloseEmployeeExitDialog();

//       } catch (error) {

//         console.error('Error updating employee exit:', error.response?.data || error.message);

//         alert(`Failed to update employee exit. ${error.response?.data?.detail || error.message || ''}`);

//       }

//     } else {

//       const createPayload = {

//         employee_id: parseInt(newEmployeeExit.employeeId), exit_date: newEmployeeExit.exitDate,

//         exit_type_id: parseInt(newEmployeeExit.exitTypeId), exit_type_name: exitTypeNameForPayload,

//         sub_exit_type_id: null, exit_interview: newEmployeeExit.exitInterview.toLowerCase(),

//         is_inactivate_account: newEmployeeExit.disableAccount.toLowerCase(),

//         reason: newEmployeeExit.description, accountability_to: "0", added_by: 2

//       };

//       try {

//         await axiosInstance.post('/employee-exits/', createPayload);

//         alert('Employee Exit added successfully.');

//         fetchEmployeeExits(); handleCloseEmployeeExitDialog();

//       } catch (error) {

//         console.error('Error adding employee exit:', error.response?.data || error.message);

//         alert(`Failed to add employee exit. ${error.response?.data?.detail || error.message || ''}`);

//       }

//     }

//   };



//   const handleDeleteExit = async (exitId) => {

//     if (window.confirm('Are you sure you want to delete this employee exit?')) {

//       try {

//         await axiosInstance.delete(`/employee-exits/${exitId}/`);

//         alert("Employee exit deleted successfully!");

//         fetchEmployeeExits(); // Refresh list

//       } catch (error) {

//         console.error("Failed to delete exit:", error);

//         alert("Failed to delete exit.");

//       }

//     }

//   };



//   const handleSubmitExitType = async () => {

//     if (!newExitType.trim()) { setSubmitExitTypeError('Exit Type name is required.'); return; }

//     setSubmittingExitType(true); setSubmitExitTypeError(null);

//     try {

//       await axiosInstance.post(EXIT_TYPE_API_URL, { category_name: newExitType.trim() });

//       alert('Exit type added successfully!');

//       setNewExitType('');

//       fetchExitTypes();

//     } catch (error) {

//       console.error("Failed to submit exit type:", error.response?.data || error.message);

//       setSubmitExitTypeError(error.response?.data?.detail || error.response?.data?.category_name?.[0] || error.message || "Failed to add exit type.");

//     } finally { setSubmittingExitType(false); }

//   };



//   const handleEditExitType = (type) => {

//     setNewExitType(type.name);

//     setEditingExitType(type);

//   };



//   const handleUpdateExitType = async () => {

//     if (!newExitType.trim()) { setSubmitExitTypeError("Exit Type name is required."); return; }

//     setSubmittingExitType(true); setSubmitExitTypeError(null);

//     try {

//       await axiosInstance.patch(`${EXIT_TYPE_API_URL}${editingExitType.id}/`, {

//         category_name: newExitType.trim(),

//       });

//       alert("Exit type updated successfully!");

//       setNewExitType("");

//       setEditingExitType(null);

//       fetchExitTypes();

//     } catch (error) {

//       console.error("Failed to update exit type:", error.response?.data || error.message);

//       setSubmitExitTypeError(error.response?.data?.detail || error.response?.data?.category_name?.[0] || error.message || "Failed to update exit type.");

//     } finally {

//       setSubmittingExitType(false);

//     }

//   };



//   const handleDeleteExitType = async (id) => {

//     if (window.confirm("Are you sure you want to delete this exit type?")) {

//       try {

//         await axiosInstance.delete(`${EXIT_TYPE_API_URL}${id}/`);

//         alert("Exit type deleted successfully!");

//         fetchExitTypes();

//       } catch (error) {

//         console.error("Failed to delete exit type:", error.response?.data || error.message);

//         alert("Failed to delete exit type.");

//       }

//     }

//   };



//   const handleCloseEmployeeExitDialog = () => { setOpenAddExitDialog(false); setNewEmployeeExit(initialEmployeeExitState); };

//   const handleCloseExitTypeDialog = () => { setOpenAddExitTypeDialog(false); setNewExitType(''); setEditingExitType(null); setSubmitExitTypeError(null); };

//   const handleResetEmployeeExitForm = () => setNewEmployeeExit(initialEmployeeExitState);

//   const handleFileUpload = (e) => {

//     const file = e.target.files[0];

//     if (file) {

//       if (['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {

//         if (file.size <= 2 * 1024 * 1024) { setNewEmployeeExit(prev => ({ ...prev, file: file })); }

//         else { alert('File size exceeds 2MB limit.'); e.target.value = null; }

//       } else { alert('Please upload only .gif, .png, .jpg, .jpeg files'); e.target.value = null; }

//     }

//   };



//   const filteredEmployeeExits = useMemo(() => employeeExits.filter(exit =>

//     (exit.employee_name && exit.employee_name.toLowerCase().includes(searchTerm.toLowerCase())) ||

//     (exit.exit_type_name && exit.exit_type_name.toLowerCase().includes(searchTerm.toLowerCase()))

//   ), [employeeExits, searchTerm]);



//   const sortedAndFilteredExitTypes = useMemo(() => {

//     let items = [...exitTypes];

//     if (exitTypeSearchTerm) {

//       items = items.filter(type => type.name && type.name.toLowerCase().includes(exitTypeSearchTerm.toLowerCase()));

//     }

//     if (exitTypeSortConfig.key) {

//       items.sort((a, b) => {

//         const valA = a[exitTypeSortConfig.key] || ''; const valB = b[exitTypeSortConfig.key] || '';

//         if (valA < valB) return exitTypeSortConfig.direction === 'asc' ? -1 : 1;

//         if (valA > valB) return exitTypeSortConfig.direction === 'asc' ? 1 : -1;

//         return 0;

//       });

//     }

//     return items;

//   }, [exitTypes, exitTypeSearchTerm, exitTypeSortConfig]);



//   const paginatedEmployeeExits = filteredEmployeeExits.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

//   const totalPages = Math.ceil(filteredEmployeeExits.length / rowsPerPage);

//   const paginatedExitTypes = sortedAndFilteredExitTypes.slice(exitTypePage * exitTypeRowsPerPage, exitTypePage * exitTypeRowsPerPage + exitTypeRowsPerPage);

//   const totalExitTypePages = Math.ceil(sortedAndFilteredExitTypes.length / exitTypeRowsPerPage);

//   const handleExitTypeSort = (key) => {

//     let direction = 'asc';

//     if (exitTypeSortConfig.key === key && exitTypeSortConfig.direction === 'asc') { direction = 'desc'; }

//     setExitTypeSortConfig({ key, direction });

//   };



//   // Card component for mobile view

//   const ExitCard = ({ exit, index }) => (

//     <Card sx={{ mb: 2 }} elevation={2}>

//       <Box sx={{ p: 2, bgcolor: 'action.hover', borderBottom: '1px solid', borderColor: 'divider' }}>

//         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

//           <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>

//             {exit.employee_name}

//           </Typography>

//           <Chip label={`Sr. No: ${page * rowsPerPage + index + 1}`} size="small" variant="outlined" />

//         </Box>

//       </Box>

//       <CardContent>

//         <Stack spacing={1.5}>

//           <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>

//             <Typography variant="body2" color="text.secondary">Exit Type</Typography>

//             <Typography variant="body2" sx={{ fontWeight: 500 }}>{exit.exit_type_name}</Typography>

//           </Box>

//           <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>

//             <Typography variant="body2" color="text.secondary">Exit Date</Typography>

//             <Typography variant="body2" sx={{ fontWeight: 500 }}>{formatDate(exit.exit_date)}</Typography>

//           </Box>

//           <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>

//             <Typography variant="body2" color="text.secondary">Exit Interview</Typography>

//             <Typography variant="body2" sx={{ fontWeight: 500 }}>{capitalize(exit.exit_interview)}</Typography>

//           </Box>

//           <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>

//             <Typography variant="body2" color="text.secondary">Disable Account</Typography>

//             <Typography variant="body2" sx={{ fontWeight: 500 }}>{capitalize(exit.is_inactivate_account)}</Typography>

//           </Box>

//           <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

//             <Typography variant="body2" color="text.secondary">Status</Typography>

//             {getStatusChip(exit.status || (exit.exit_id % 2 === 0 ? 'Approved' : 'Pending'))}

//           </Box>

//         </Stack>

//       </CardContent>

//       <CardActions sx={{ justifyContent: 'flex-end', p: 2, pt: 0 }}>

//         <Button startIcon={<EditIcon />} onClick={() => handleOpenEditDialog(exit)} color="primary" variant="text">

//           Edit

//         </Button>

//         <Button startIcon={<DeleteIcon />} onClick={() => handleDeleteExit(exit.exit_id)} color="error" variant="text">

//           Delete

//         </Button>

//       </CardActions>

//     </Card>

//   );



//   return (

//     <ThemeProvider theme={theme}>

//       <CssBaseline />

//       <Box sx={{ p: { xs: 1, sm: 2, md: 3 } }}>

//         <Paper elevation={3} sx={{ p: { xs: 1.5, sm: 2, md: 3 }, borderRadius: 2 }}>

//           {/* --- HORIZONTAL BUTTON HEADER --- */}

//           <Box sx={{

//             display: 'flex',

//             flexDirection: { xs: 'column', sm: 'row' },

//             justifyContent: 'space-between',

//             alignItems: { xs: 'flex-start', sm: 'center' },

//             mb: 3,

//             gap: 2,

//           }}>

//             <Typography variant="h6" sx={{ fontWeight: 'bold' }}>

//               List All Employee Exit

//             </Typography>

//             <Stack

//               direction={{ xs: 'column', sm: 'row' }}

//               spacing={1}

//               sx={{ width: { xs: '100%', sm: 'auto' } }}

//             >

//               <Button variant="contained" onClick={() => setOpenAddExitTypeDialog(true)}>

//                 + Exit Type

//               </Button>

//               <Button variant="contained" color="success" startIcon={<FileDownloadIcon />} onClick={() => { /* handleExport */ }}>

//                 Export Employees

//               </Button>

//               <Button variant="contained" startIcon={<AddIcon />} onClick={() => setOpenAddExitDialog(true)}>

//                 Add New Exit

//               </Button>

//             </Stack>

//           </Box>



//           <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: 'center', gap: 2, mb: 2 }}>



//             <TextField

//               size="small"

//               placeholder="Search exits..."

//               value={searchTerm}

//               onChange={(e) => setSearchTerm(e.target.value)}

//               sx={{ width: { xs: '100%', sm: 300 } }}

//             />





//             <FormControl size="small" sx={{ width: { xs: '100%', sm: 'auto' } }}>

//               <Stack direction="row" alignItems="center" spacing={1}>

//                 <Typography variant="body2" color="text.secondary">Show</Typography>

//                 <Select value={rowsPerPage} onChange={(e) => { setRowsPerPage(parseInt(e.target.value, 10)); setPage(0); }}>

//                   <MenuItem value={5}>5</MenuItem>

//                   <MenuItem value={10}>10</MenuItem>

//                   <MenuItem value={25}>25</MenuItem>

//                 </Select>

//                 <Typography variant="body2" color="text.secondary">entries</Typography>

//               </Stack>

//             </FormControl>



//           </Box>



//           {isMobile ? (

//             // MOBILE CARD VIEW

//             <Box sx={{ mt: 3 }}>

//               {loadingExits ? <Box sx={{ display: 'flex', justifyContent: 'center' }}><CircularProgress /></Box> : paginatedEmployeeExits.length > 0 ? (

//                 paginatedEmployeeExits.map((exit, index) => (

//                   <ExitCard key={exit.exit_id} exit={exit} index={index} />

//                 ))

//               ) : (

//                 <Typography align="center" sx={{ p: 4, color: 'text.secondary' }}>No employee exits found.</Typography>

//               )}

//             </Box>

//           ) : (

//             // DESKTOP TABLE VIEW

//             <TableContainer>

//               <Table>

//                 <TableHead>

//                   <TableRow sx={{ bgcolor: 'action.hover' }}>

//                     <TableCell sx={{ fontWeight: 'bold' }}>SR. NO.</TableCell>

//                     <TableCell sx={{ fontWeight: 'bold' }}><PersonIcon sx={{ verticalAlign: 'middle', mr: 0.5 }} fontSize="small" />EMPLOYEE</TableCell>

//                     <TableCell sx={{ fontWeight: 'bold' }}>EXIT TYPE</TableCell>

//                     <TableCell sx={{ fontWeight: 'bold' }}><CalendarTodayIcon sx={{ verticalAlign: 'middle', mr: 0.5 }} fontSize="small" />EXIT DATE</TableCell>

//                     <TableCell sx={{ fontWeight: 'bold' }}>EXIT INTERVIEW</TableCell>

//                     <TableCell sx={{ fontWeight: 'bold' }}>DISABLE ACCOUNT</TableCell>

//                     <TableCell sx={{ fontWeight: 'bold' }}>STATUS</TableCell>

//                     <TableCell sx={{ fontWeight: 'bold' }} align="right">ACTIONS</TableCell>

//                   </TableRow>

//                 </TableHead>

//                 <TableBody>

//                   {loadingExits ? (<TableRow><TableCell colSpan={8} align="center"><CircularProgress /></TableCell></TableRow>

//                   ) : exitError ? (<TableRow><TableCell colSpan={8} align="center" sx={{ color: 'error.main' }}>{exitError}</TableCell></TableRow>

//                   ) : paginatedEmployeeExits.length > 0 ? (

//                     paginatedEmployeeExits.map((exit, index) => (

//                       <TableRow key={exit.exit_id} hover>

//                         <TableCell>{page * rowsPerPage + index + 1}</TableCell>

//                         <TableCell>{exit.employee_name}</TableCell>

//                         <TableCell>{exit.exit_type_name}</TableCell>

//                         <TableCell>{formatDate(exit.exit_date)}</TableCell>

//                         <TableCell>{capitalize(exit.exit_interview)}</TableCell>

//                         <TableCell>{capitalize(exit.is_inactivate_account)}</TableCell>

//                         <TableCell>{getStatusChip(exit.status || (exit.exit_id % 2 === 0 ? 'Approved' : 'Pending'))}</TableCell>

//                         <TableCell align="right">

//                           <Tooltip title="Edit">

//                             <IconButton size="small" onClick={() => handleOpenEditDialog(exit)} color="primary"><EditIcon /></IconButton>

//                           </Tooltip>

//                           <Tooltip title="Delete">

//                             <IconButton size="small" onClick={() => handleDeleteExit(exit.exit_id)} color="error"><DeleteIcon /></IconButton>

//                           </Tooltip>

//                         </TableCell>

//                       </TableRow>

//                     ))

//                   ) : (<TableRow><TableCell colSpan={8} align="center">No employee exits found.</TableCell></TableRow>)}

//                 </TableBody>

//               </Table>

//             </TableContainer>

//           )}



//           {/* PAGINATION */}

//           <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: 'center', mt: 2, p: 1, gap: 2 }}>

//             <Typography variant="body2" color="text.secondary">

//               Showing {paginatedEmployeeExits.length > 0 ? page * rowsPerPage + 1 : 0} to {Math.min((page + 1) * rowsPerPage, filteredEmployeeExits.length)} of {filteredEmployeeExits.length} entries

//             </Typography>

//             <Box sx={{ display: 'flex', gap: 1 }}>

//               <Button variant="outlined" disabled={page === 0} onClick={() => setPage(page - 1)}>Previous</Button>

//               <Button variant="outlined" disabled={page + 1 >= totalPages} onClick={() => setPage(page + 1)}>Next</Button>

//             </Box>

//           </Box>

//         </Paper>



//         {/* DIALOG for Adding/Editing Employee Exit */}

//         <Dialog open={openAddExitDialog} onClose={handleCloseEmployeeExitDialog} maxWidth="md" fullWidth>

//           <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

//             <Typography variant="h6">{newEmployeeExit.currentEditingId ? 'Edit Employee Exit' : 'Add New Employee Exit'}</Typography>

//             <Button variant="outlined" onClick={handleCloseEmployeeExitDialog}>Close</Button>

//           </DialogTitle>

//           <Divider />

//           <DialogContent>

//             <Grid container spacing={3}>

//               <Grid item xs={12} md={8}>

//                 <Grid container spacing={2}>

//                   <Grid item xs={12} md={6}>

//                     <FormControl fullWidth required={!newEmployeeExit.currentEditingId} disabled={!!newEmployeeExit.currentEditingId || loadingEmployeesDropdown}>

//                       <InputLabel id="employee-label">Employee</InputLabel>

//                       <Select labelId="employee-label" label="Employee" value={newEmployeeExit.employeeId} onChange={(e) => setNewEmployeeExit(prev => ({ ...prev, employeeId: e.target.value }))}>

//                         <MenuItem value=""><em>{loadingEmployeesDropdown ? "Loading..." : employeesDropdownError || "Select Employee"}</em></MenuItem>

//                         {!loadingEmployeesDropdown && !employeesDropdownError && employeesDropdownData.map((emp) => (<MenuItem key={emp.value} value={emp.value.toString()}>{emp.label}</MenuItem>))}

//                       </Select>

//                     </FormControl>

//                   </Grid>

//                   <Grid item xs={12} md={6}>

//                     <TextField label="Exit Date" fullWidth required type="date" InputLabelProps={{ shrink: true }} value={newEmployeeExit.exitDate} onChange={(e) => setNewEmployeeExit(prev => ({ ...prev, exitDate: e.target.value }))} InputProps={{ endAdornment: (<InputAdornment position="end"><CalendarTodayIcon /></InputAdornment>) }} />

//                   </Grid>

//                   <Grid item xs={12} md={4}>

//                     <FormControl fullWidth required disabled={loadingExitTypes}>

//                       <InputLabel id="exit-type-label">Exit Type</InputLabel>

//                       <Select labelId="exit-type-label" label="Exit Type" value={newEmployeeExit.exitTypeId} onChange={(e) => setNewEmployeeExit(prev => ({ ...prev, exitTypeId: e.target.value }))}>

//                         <MenuItem value=""><em>{loadingExitTypes ? "Loading..." : exitTypesError || "Select Exit Type"}</em></MenuItem>

//                         {!loadingExitTypes && !exitTypesError && exitTypes.map((type) => (<MenuItem key={type.id} value={type.id.toString()}>{type.name}</MenuItem>))}

//                       </Select>

//                     </FormControl>

//                   </Grid>

//                   <Grid item xs={12} md={4}>

//                     <FormControl fullWidth required>

//                       <InputLabel id="exit-interview-label">Exit Interview</InputLabel>

//                       <Select labelId="exit-interview-label" label="Exit Interview" value={newEmployeeExit.exitInterview} onChange={(e) => setNewEmployeeExit(prev => ({ ...prev, exitInterview: e.target.value }))}>

//                         <MenuItem value="Yes">Yes</MenuItem><MenuItem value="No">No</MenuItem>

//                       </Select>

//                     </FormControl>

//                   </Grid>

//                   <Grid item xs={12} md={4}>

//                     <FormControl fullWidth required>

//                       <InputLabel id="disable-account-label">Disable Account</InputLabel>

//                       <Select labelId="disable-account-label" label="Disable Account" value={newEmployeeExit.disableAccount} onChange={(e) => setNewEmployeeExit(prev => ({ ...prev, disableAccount: e.target.value }))}>

//                         <MenuItem value="Yes">Yes</MenuItem><MenuItem value="No">No</MenuItem>

//                       </Select>

//                     </FormControl>

//                   </Grid>

//                   <Grid item xs={12}>

//                     <TextField label="Description / Reason" fullWidth multiline rows={3} placeholder="Enter description or reason for exit..." value={newEmployeeExit.description} onChange={(e) => setNewEmployeeExit(prev => ({ ...prev, description: e.target.value }))} />

//                   </Grid>

//                 </Grid>

//               </Grid>

//               <Grid item xs={12} md={4}>

//                 <Paper variant="outlined" sx={{ p: 2, height: '100%' }}>

//                   <Typography variant="subtitle1" gutterBottom>Exit Contract / Attachment</Typography>

//                   <TextField fullWidth disabled size="small" placeholder="No file chosen" value={newEmployeeExit.file ? newEmployeeExit.file.name : ''} sx={{ mb: 1 }} />

//                   <Button variant="outlined" component="label" fullWidth>Browse File<input type="file" hidden onChange={handleFileUpload} accept=".jpg,.jpeg,.png,.gif" /></Button>

//                   <Typography variant="caption" color="textSecondary" display="block" mt={1}>Allowed: GIF, PNG, JPG, JPEG. Max 2MB.</Typography>

//                 </Paper>

//               </Grid>

//             </Grid>

//           </DialogContent>

//           <Divider />

//           <DialogActions sx={{ p: 2, justifyContent: 'flex-end' }}>

//             <Button onClick={handleResetEmployeeExitForm} sx={{ mr: 1, color: 'text.secondary', borderColor: 'divider' }} variant="outlined">Reset</Button>

//             <Button variant="contained" onClick={handleSubmitEmployeeExit}>{newEmployeeExit.currentEditingId ? 'Update' : 'Save'}</Button>

//           </DialogActions>

//         </Dialog>



//         {/* DIALOG for Managing Exit Types */}

//         <Dialog open={openAddExitTypeDialog} onClose={handleCloseExitTypeDialog} maxWidth="lg" fullWidth>

//           <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>Manage Exit Types<Button onClick={handleCloseExitTypeDialog} variant="outlined">Close</Button></DialogTitle>

//           <DialogContent dividers sx={{ p: 0 }}>

//             <Grid container>

//               <Grid item xs={12} md={4} sx={{ borderRight: { md: '1px solid #eee' } }}>

//                 <Box sx={{ p: 3 }}>

//                   <Typography variant="h6" sx={{ mb: 2 }}>{editingExitType ? 'Edit Exit Type' : 'Add New Exit Type'}</Typography>

//                   <FormControl fullWidth sx={{ mb: 2 }}>

//                     <TextField required label="Exit Type Name" placeholder="Enter exit type name" value={newExitType} onChange={(e) => setNewExitType(e.target.value)} disabled={submittingExitType} error={!!submitExitTypeError} helperText={submitExitTypeError} />

//                   </FormControl>

//                   <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>

//                     <Button variant="contained" onClick={editingExitType ? handleUpdateExitType : handleSubmitExitType} disabled={submittingExitType || !newExitType.trim()}>

//                       {submittingExitType ? <CircularProgress size={24} color="inherit" /> : editingExitType ? "Update" : "Save"}

//                     </Button>

//                   </Box>

//                 </Box>

//               </Grid>

//               <Grid item xs={12} md={8}>

//                 <Box sx={{ p: 3 }}>

//                   <Typography variant="h6" sx={{ mb: 2 }}>List All Exit Types</Typography>

//                   {loadingExitTypes ? (<Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}><CircularProgress /></Box>

//                   ) : exitTypesError ? (<Typography color="error" sx={{ p: 2 }}>Error: {exitTypesError} <Button onClick={fetchExitTypes} size="small">Retry</Button></Typography>

//                   ) : (

//                     <>

//                       <TableContainer component={Paper} variant="outlined">

//                         <Table size="small">

//                           <TableHead>

//                             <TableRow>

//                               <TableCell>

//                                 <TableSortLabel active={exitTypeSortConfig.key === 'name'} direction={exitTypeSortConfig.key === 'name' ? exitTypeSortConfig.direction : 'asc'} onClick={() => handleExitTypeSort('name')}>EXIT TYPE</TableSortLabel>

//                               </TableCell>

//                               <TableCell>

//                                 <TableSortLabel active={exitTypeSortConfig.key === 'createdAt'} direction={exitTypeSortConfig.key === 'createdAt' ? exitTypeSortConfig.direction : 'asc'} onClick={() => handleExitTypeSort('createdAt')}>CREATED AT</TableSortLabel>

//                               </TableCell>

//                               <TableCell>Actions</TableCell>

//                             </TableRow>

//                           </TableHead>

//                           <TableBody>

//                             {paginatedExitTypes.length > 0 ? (

//                               paginatedExitTypes.map((type) => (

//                                 <TableRow key={type.id} hover>

//                                   <TableCell>{type.name}</TableCell>

//                                   <TableCell>{type.createdAt}</TableCell>

//                                   <TableCell>

//                                     <IconButton size="small" onClick={() => handleEditExitType(type)} color="primary"><EditIcon fontSize="small" /></IconButton>

//                                     <IconButton size="small" color="error" onClick={() => handleDeleteExitType(type.id)}><DeleteIcon fontSize="small" /></IconButton>

//                                   </TableCell>

//                                 </TableRow>

//                               ))

//                             ) : (

//                               <TableRow><TableCell colSpan={3} align="center">No exit types found.</TableCell></TableRow>

//                             )}

//                           </TableBody>

//                         </Table>

//                       </TableContainer>

//                       {sortedAndFilteredExitTypes.length > 0 && (

//                         <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', mt: 2, gap: 1 }}>

//                           <Button size="small" disabled={exitTypePage === 0} onClick={() => setExitTypePage(p => p - 1)} sx={{ border: '1px solid #ddd' }}>Previous</Button>

//                           <Typography variant="body2">Page {exitTypePage + 1} of {totalExitTypePages}</Typography>

//                           <Button size="small" disabled={exitTypePage >= totalExitTypePages - 1} onClick={() => setExitTypePage(p => p + 1)} sx={{ border: '1px solid #ddd' }}>Next</Button>

//                         </Box>

//                       )}

//                     </>

//                   )}

//                 </Box>

//               </Grid>

//             </Grid>

//           </DialogContent>

//         </Dialog>

//       </Box>

//     </ThemeProvider>

//   );

// };



// export default EmployeeExitManagement;





















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
//   Divider,
//   CssBaseline,
//   InputAdornment,
//   CircularProgress,
//   TableSortLabel,
//   useMediaQuery,
//   Card,
//   CardContent,
//   CardActions,
//   Stack,
//   Tooltip,
// } from '@mui/material';
// import AddIcon from '@mui/icons-material/Add';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
// import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
// import PersonIcon from '@mui/icons-material/Person';
// import FileDownloadIcon from '@mui/icons-material/FileDownload';
// import Swal from 'sweetalert2'; // Import SweetAlert2
// import axiosInstance from '../../utils/axiosInstance'; // Ensure this path is correct

// // API Configuration
// const API_BASE_URL = 'https://tdtlworld.com/hrms-backend/api';
// const EXIT_TYPE_API_URL = `${API_BASE_URL}/exit-type/`;
// const EMPLOYEE_DROPDOWN_API_URL = 'https://tdtlworld.com/hrms-backend/employee-dropdown/';

// // Create theme based on the OfficeShifts component
// const theme = createTheme({
//   palette: {
//     primary: { main: '#7c4dff' },
//     success: { main: '#4caf50' },
//     warning: { main: '#ff9800' },
//     error: { main: '#f44336' },
//     background: { default: '#f5f5f9', paper: '#ffffff' },
//   },
//   breakpoints: {
//     values: { xs: 0, sm: 600, md: 900, lg: 1200, xl: 1536 },
//   },
// });

// // Utility function for formatting date
// const formatDate = (dateString) => {
//   if (!dateString) return 'N/A';
//   try {
//     const date = new Date(dateString);
//     if (isNaN(date.getTime())) return 'N/A';
//     const day = String(date.getDate()).padStart(2, '0');
//     const month = String(date.getMonth() + 1).padStart(2, '0');
//     const year = date.getFullYear();
//     return `${day}/${month}/${year}`;
//   } catch (error) {
//     return 'N/A';
//   }
// };

// // Helper function to capitalize strings, returning 'N/A' for empty values
// const capitalize = (s) => {
//   if (typeof s !== 'string' || !s) return 'N/A';
//   return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
// };

// // Helper function for Status Chip
// const getStatusChip = (statusValue) => {
//   const statusText = capitalize(statusValue || 'Pending');
//   if (statusText === 'N/A') return <Chip label="Pending" color="warning" size="small" />;

//   let color = 'default';
//   if (statusText === 'Approved') color = 'success';
//   else if (statusText === 'Pending') color = 'warning';
//   else if (statusText === 'Rejected') color = 'error';
//   return <Chip label={statusText} color={color} size="small" />;
// };

// function EmployeeExitManagement() {
//   const [exitTypes, setExitTypes] = useState([]);
//   const [loadingExitTypes, setLoadingExitTypes] = useState(true);
//   const [exitTypesError, setExitTypesError] = useState(null);
//   const [submittingExitType, setSubmittingExitType] = useState(false);
//   const [submitExitTypeError, setSubmitExitTypeError] = useState(null);
//   const [exitTypeSortConfig, setExitTypeSortConfig] = useState({ key: 'name', direction: 'asc' });

//   const [employeesDropdownData, setEmployeesDropdownData] = useState([]);
//   const [loadingEmployeesDropdown, setLoadingEmployeesDropdown] = useState(true);
//   const [employeesDropdownError, setEmployeesDropdownError] = useState(null);

//   const [employeeExits, setEmployeeExits] = useState([]);
//   const [loadingExits, setLoadingExits] = useState(true);
//   const [exitError, setExitError] = useState(null);

//   const [openAddExitDialog, setOpenAddExitDialog] = useState(false);
//   const [openAddExitTypeDialog, setOpenAddExitTypeDialog] = useState(false);

//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);

//   const [exitTypePage, setExitTypePage] = useState(0);
//   const [exitTypeRowsPerPage, setExitTypeRowsPerPage] = useState(10);

//   const [searchTerm, setSearchTerm] = useState('');
//   const [exitTypeSearchTerm, setExitTypeSearchTerm] = useState('');

//   // State for main table sorting
//   const [exitSortConfig, setExitSortConfig] = useState({ key: 'exit_date', direction: 'desc' });

//   const initialEmployeeExitState = {
//     employeeId: '', exitDate: '', exitTypeId: '',
//     exitInterview: 'Yes', disableAccount: 'Yes',
//     description: '', file: null, currentEditingId: null,
//   };

//   const [newEmployeeExit, setNewEmployeeExit] = useState(initialEmployeeExitState);
//   const [newExitType, setNewExitType] = useState('');
//   const [editingExitType, setEditingExitType] = useState(null);
//   const isMobile = useMediaQuery(theme.breakpoints.down('md'));

//   const fetchExitTypes = useCallback(async () => {
//     setLoadingExitTypes(true);
//     setExitTypesError(null);
//     try {
//       const response = await axiosInstance.get(EXIT_TYPE_API_URL);
//       const transformedData = response.data.map(item => ({
//         id: item.value, name: item.label, createdAt: formatDate(item.created_at),
//       }));
//       setExitTypes(transformedData);
//     } catch (error) {
//       console.error("Failed to fetch exit types:", error);
//       setExitTypesError("Failed to load exit types.");
//     } finally {
//       setLoadingExitTypes(false);
//     }
//   }, []);

//   const fetchEmployeesDropdown = useCallback(async () => {
//     setLoadingEmployeesDropdown(true);
//     setEmployeesDropdownError(null);
//     try {
//       const response = await axiosInstance.get(EMPLOYEE_DROPDOWN_API_URL);
//       setEmployeesDropdownData(response.data || []);
//     } catch (error) {
//       console.error("Failed to fetch employees dropdown:", error);
//       setEmployeesDropdownError("Failed to load employee list.");
//     } finally {
//       setLoadingEmployeesDropdown(false);
//     }
//   }, []);

//   const fetchEmployeeExits = useCallback(async () => {
//     setLoadingExits(true);
//     try {
//       const response = await axiosInstance.get('/employee-exits/');
//       setEmployeeExits(response.data);
//       setExitError(null);
//     } catch (error) {
//       console.error("Error fetching employee exits:", error);
//       setExitError('Failed to load employee exits');
//     } finally {
//       setLoadingExits(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchExitTypes();
//     fetchEmployeesDropdown();
//     fetchEmployeeExits();
//   }, [fetchExitTypes, fetchEmployeesDropdown, fetchEmployeeExits]);

//   const handleOpenEditDialog = (exitToEdit) => {
//     setNewEmployeeExit({
//       employeeId: exitToEdit.employee_id?.toString() || '',
//       exitDate: exitToEdit.exit_date ? exitToEdit.exit_date.split('T')[0] : '',
//       exitTypeId: exitToEdit.exit_type_id?.toString() || '',
//       exitInterview: capitalize(exitToEdit.exit_interview) === 'N/A' ? 'Yes' : capitalize(exitToEdit.exit_interview),
//       disableAccount: capitalize(exitToEdit.is_inactivate_account) === 'N/A' ? 'Yes' : capitalize(exitToEdit.is_inactivate_account),
//       description: exitToEdit.reason || '',
//       file: null, currentEditingId: exitToEdit.exit_id,
//     });
//     setOpenAddExitDialog(true);
//   };

//   const handleSubmitEmployeeExit = async () => {
//     const isEditMode = !!newEmployeeExit.currentEditingId;
//     if (!isEditMode && !newEmployeeExit.employeeId) { Swal.fire('Validation Error', 'Please select an Employee.', 'warning'); return; }
//     if (!newEmployeeExit.exitDate) { Swal.fire('Validation Error', 'Please select an Exit Date.', 'warning'); return; }
//     if (!newEmployeeExit.exitTypeId) { Swal.fire('Validation Error', 'Please select an Exit Type.', 'warning'); return; }

//     const selectedExitType = exitTypes.find(type => type.id.toString() === newEmployeeExit.exitTypeId.toString());
//     const exitTypeNameForPayload = selectedExitType ? selectedExitType.name : '';

//     if (isEditMode) {
//       const updatePayload = {
//         exit_date: newEmployeeExit.exitDate,
//         exit_type_id: parseInt(newEmployeeExit.exitTypeId),
//         exit_type_name: exitTypeNameForPayload,
//         reason: newEmployeeExit.description,
//         accountability_to: "0",
//         exit_interview: newEmployeeExit.exitInterview.toLowerCase(),
//         is_inactivate_account: newEmployeeExit.disableAccount.toLowerCase(),
//       };
//       try {
//         await axiosInstance.patch(`/employee-exits/${newEmployeeExit.currentEditingId}/`, updatePayload);
//         Swal.fire('Updated!', 'Employee Exit updated successfully.', 'success');
//         fetchEmployeeExits(); handleCloseEmployeeExitDialog();
//       } catch (error) {
//         console.error('Error updating employee exit:', error.response?.data || error.message);
//         Swal.fire('Error!', `Failed to update employee exit. ${error.response?.data?.detail || error.message || ''}`, 'error');
//       }
//     } else {
//       const createPayload = {
//         employee_id: parseInt(newEmployeeExit.employeeId), exit_date: newEmployeeExit.exitDate,
//         exit_type_id: parseInt(newEmployeeExit.exitTypeId), exit_type_name: exitTypeNameForPayload,
//         sub_exit_type_id: null, exit_interview: newEmployeeExit.exitInterview.toLowerCase(),
//         is_inactivate_account: newEmployeeExit.disableAccount.toLowerCase(),
//         reason: newEmployeeExit.description, accountability_to: "0", added_by: 2
//       };
//       try {
//         await axiosInstance.post('/employee-exits/', createPayload);
//         Swal.fire('Added!', 'Employee Exit added successfully.', 'success');
//         fetchEmployeeExits(); handleCloseEmployeeExitDialog();
//       } catch (error) {
//         console.error('Error adding employee exit:', error.response?.data || error.message);
//         Swal.fire('Error!', `Failed to add employee exit. ${error.response?.data?.detail || error.message || ''}`, 'error');
//       }
//     }
//   };

//   const handleDeleteExit = (exitId) => {
//     Swal.fire({
//       title: 'Are you sure?',
//       text: "You won't be able to revert this!",
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#d33',
//       cancelButtonColor: '#3085d6',
//       confirmButtonText: 'Yes, delete it!'
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         try {
//           await axiosInstance.delete(`/employee-exits/${exitId}/`);
//           Swal.fire('Deleted!', 'Employee exit has been deleted.', 'success');
//           fetchEmployeeExits();
//         } catch (error) {
//           console.error("Failed to delete exit:", error);
//           Swal.fire('Error!', 'Failed to delete employee exit.', 'error');
//         }
//       }
//     });
//   };

//   const handleSubmitExitType = async () => {
//     if (!newExitType.trim()) { setSubmitExitTypeError('Exit Type name is required.'); return; }
//     setSubmittingExitType(true); setSubmitExitTypeError(null);
//     try {
//       await axiosInstance.post(EXIT_TYPE_API_URL, { category_name: newExitType.trim() });
//       Swal.fire('Success!', 'Exit type added successfully!', 'success');
//       setNewExitType('');
//       fetchExitTypes();
//     } catch (error) {
//       console.error("Failed to submit exit type:", error.response?.data || error.message);
//       setSubmitExitTypeError(error.response?.data?.detail || error.response?.data?.category_name?.[0] || error.message || "Failed to add exit type.");
//     } finally { setSubmittingExitType(false); }
//   };

//   const handleEditExitType = (type) => { setNewExitType(type.name); setEditingExitType(type); };

//   const handleUpdateExitType = async () => {
//     if (!newExitType.trim()) { setSubmitExitTypeError("Exit Type name is required."); return; }
//     setSubmittingExitType(true); setSubmitExitTypeError(null);
//     try {
//       await axiosInstance.patch(`${EXIT_TYPE_API_URL}${editingExitType.id}/`, { category_name: newExitType.trim() });
//       Swal.fire('Updated!', 'Exit type updated successfully!', 'success');
//       setNewExitType(""); setEditingExitType(null); fetchExitTypes();
//     } catch (error) {
//       console.error("Failed to update exit type:", error.response?.data || error.message);
//       setSubmitExitTypeError(error.response?.data?.detail || error.response?.data?.category_name?.[0] || error.message || "Failed to update exit type.");
//     } finally { setSubmittingExitType(false); }
//   };

//   const handleDeleteExitType = (id) => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "This action cannot be undone.",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: '#d33',
//       cancelButtonColor: '#3085d6',
//       confirmButtonText: 'Yes, delete it!'
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         try {
//           await axiosInstance.delete(`${EXIT_TYPE_API_URL}${id}/`);
//           Swal.fire("Deleted!", "Exit type has been deleted.", "success");
//           fetchExitTypes();
//         } catch (error) {
//           console.error("Failed to delete exit type:", error.response?.data || error.message);
//           Swal.fire("Error!", "Failed to delete exit type.", "error");
//         }
//       }
//     });
//   };

//   const handleCloseEmployeeExitDialog = () => { setOpenAddExitDialog(false); setNewEmployeeExit(initialEmployeeExitState); };
//   const handleCloseExitTypeDialog = () => { setOpenAddExitTypeDialog(false); setNewExitType(''); setEditingExitType(null); setSubmitExitTypeError(null); };
//   const handleResetEmployeeExitForm = () => setNewEmployeeExit(initialEmployeeExitState);

//   const handleFileUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       if (['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
//         if (file.size <= 2 * 1024 * 1024) { setNewEmployeeExit(prev => ({ ...prev, file: file })); }
//         else { Swal.fire('File Too Large', 'File size exceeds 2MB limit.', 'warning'); e.target.value = null; }
//       } else { Swal.fire('Invalid File Type', 'Please upload only .gif, .png, .jpg, or .jpeg files', 'warning'); e.target.value = null; }
//     }
//   };

//   const sortedAndFilteredEmployeeExits = useMemo(() => {
//     let items = employeeExits.filter(exit =>
//       (exit.employee_name && exit.employee_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
//       (exit.exit_type_name && exit.exit_type_name.toLowerCase().includes(searchTerm.toLowerCase()))
//     );

//     if (exitSortConfig.key) {
//       items.sort((a, b) => {
//         const key = exitSortConfig.key;
//         const order = exitSortConfig.direction === 'asc' ? 1 : -1;
//         const valA = a[key];
//         const valB = b[key];

//         if (valA == null) return 1; if (valB == null) return -1;

//         if (key === 'exit_date') {
//           const dateA = new Date(valA).getTime(); const dateB = new Date(valB).getTime();
//           if (isNaN(dateA)) return 1; if (isNaN(dateB)) return -1;
//           return (dateA - dateB) * order;
//         }

//         return String(valA).localeCompare(String(valB)) * order;
//       });
//     }
//     return items;
//   }, [employeeExits, searchTerm, exitSortConfig]);

//   const handleExitSort = (key) => {
//     let direction = 'asc';
//     if (exitSortConfig.key === key && exitSortConfig.direction === 'asc') { direction = 'desc'; }
//     setExitSortConfig({ key, direction });
//   };

//   const sortedAndFilteredExitTypes = useMemo(() => {
//     let items = [...exitTypes];
//     if (exitTypeSearchTerm) {
//       items = items.filter(type => type.name && type.name.toLowerCase().includes(exitTypeSearchTerm.toLowerCase()));
//     }
//     if (exitTypeSortConfig.key) {
//       items.sort((a, b) => {
//         const valA = a[exitTypeSortConfig.key] || ''; const valB = b[exitTypeSortConfig.key] || '';
//         if (valA < valB) return exitTypeSortConfig.direction === 'asc' ? -1 : 1;
//         if (valA > valB) return exitTypeSortConfig.direction === 'asc' ? 1 : -1;
//         return 0;
//       });
//     }
//     return items;
//   }, [exitTypes, exitTypeSearchTerm, exitTypeSortConfig]);

//   const paginatedEmployeeExits = sortedAndFilteredEmployeeExits.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
//   const totalPages = Math.ceil(sortedAndFilteredEmployeeExits.length / rowsPerPage);
//   const paginatedExitTypes = sortedAndFilteredExitTypes.slice(exitTypePage * exitTypeRowsPerPage, exitTypePage * exitTypeRowsPerPage + exitTypeRowsPerPage);
//   const totalExitTypePages = Math.ceil(sortedAndFilteredExitTypes.length / exitTypeRowsPerPage);

//   const handleExitTypeSort = (key) => {
//     let direction = 'asc';
//     if (exitTypeSortConfig.key === key && exitTypeSortConfig.direction === 'asc') { direction = 'desc'; }
//     setExitTypeSortConfig({ key, direction });
//   };

//   const ExitCard = ({ exit, index }) => (
//     <Card sx={{ mb: 2 }} elevation={2}>
//       <Box sx={{ p: 2, bgcolor: 'action.hover', borderBottom: '1px solid', borderColor: 'divider' }}>
//         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//           <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
//             {exit.employee_name || 'N/A'}
//           </Typography>
//           <Chip label={`Sr. No: ${page * rowsPerPage + index + 1}`} size="small" variant="outlined" />
//         </Box>
//       </Box>
//       <CardContent>
//         <Stack spacing={1.5}>
//           <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
//             <Typography variant="body2" color="text.secondary">Exit Type</Typography>
//             <Typography variant="body2" sx={{ fontWeight: 500 }}>{exit.exit_type_name || 'N/A'}</Typography>
//           </Box>
//           <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
//             <Typography variant="body2" color="text.secondary">Exit Date</Typography>
//             <Typography variant="body2" sx={{ fontWeight: 500 }}>{formatDate(exit.exit_date)}</Typography>
//           </Box>
//           <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
//             <Typography variant="body2" color="text.secondary">Exit Interview</Typography>
//             <Typography variant="body2" sx={{ fontWeight: 500 }}>{capitalize(exit.exit_interview)}</Typography>
//           </Box>
//           <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
//             <Typography variant="body2" color="text.secondary">Disable Account</Typography>
//             <Typography variant="body2" sx={{ fontWeight: 500 }}>{capitalize(exit.is_inactivate_account)}</Typography>
//           </Box>
//           <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//             <Typography variant="body2" color="text.secondary">Status</Typography>
//             {getStatusChip(exit.status)}
//           </Box>
//         </Stack>
//       </CardContent>
//       <CardActions sx={{ justifyContent: 'flex-end', p: 2, pt: 0 }}>
//         <Button startIcon={<EditIcon />} onClick={() => handleOpenEditDialog(exit)} color="primary" variant="text">Edit</Button>
//         <Button startIcon={<DeleteIcon />} onClick={() => handleDeleteExit(exit.exit_id)} color="error" variant="text">Delete</Button>
//       </CardActions>
//     </Card>
//   );

//   return (
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
//       <Box sx={{ p: { xs: 1, sm: 2, md: 3 } }}>
//         <Paper elevation={3} sx={{ p: { xs: 1.5, sm: 2, md: 3 }, borderRadius: 2 }}>
//           {/* ... Header and search section ... */}
//           <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', sm: 'center' }, mb: 3, gap: 2, }}>
//             <Typography variant="h6" sx={{ fontWeight: 'bold' }}>List All  Employee Exit</Typography>
//             <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} sx={{ width: { xs: '100%', sm: 'auto' } }}>
//               <Button variant="contained" onClick={() => setOpenAddExitTypeDialog(true)}>+ Exit Type</Button>
//               <Button variant="contained" color="success" startIcon={<FileDownloadIcon />} onClick={() => { /* handleExport */ }}>Export Employees</Button>
//               <Button variant="contained" startIcon={<AddIcon />} onClick={() => setOpenAddExitDialog(true)}>Add New Exit</Button>
//             </Stack>
//           </Box>
//           <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: 'center', gap: 2, mb: 2 }}>
//             <TextField size="small" placeholder="Search exits..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} sx={{ width: { xs: '100%', sm: 300 } }} />
//             <FormControl size="small" sx={{ width: { xs: '100%', sm: 'auto' } }}>
//               <Stack direction="row" alignItems="center" spacing={1}>
//                 <Typography variant="body2" color="text.secondary">Show</Typography>
//                 <Select value={rowsPerPage} onChange={(e) => { setRowsPerPage(parseInt(e.target.value, 10)); setPage(0); }}>
//                   <MenuItem value={5}>5</MenuItem> <MenuItem value={10}>10</MenuItem> <MenuItem value={25}>25</MenuItem>
//                 </Select>
//                 <Typography variant="body2" color="text.secondary">entries</Typography>
//               </Stack>
//             </FormControl>
//           </Box>

//           {isMobile ? (
//             <Box sx={{ mt: 3 }}>
//               {loadingExits ? <Box sx={{ display: 'flex', justifyContent: 'center' }}><CircularProgress /></Box> : paginatedEmployeeExits.length > 0 ? (
//                 paginatedEmployeeExits.map((exit, index) => <ExitCard key={exit.exit_id} exit={exit} index={index} />)
//               ) : (<Typography align="center" sx={{ p: 4, color: 'text.secondary' }}>No employee exits found.</Typography>)}
//             </Box>
//           ) : (
//             <TableContainer>
//               <Table>
//                 <TableHead>
//                   <TableRow sx={{ bgcolor: 'action.hover' }}>
//                     <TableCell sx={{ fontWeight: 'bold' }}>SR. NO.</TableCell>
//                     <TableCell>
//                       <TableSortLabel sx={{ fontWeight: 'bold' }} active={exitSortConfig.key === 'employee_name'} direction={exitSortConfig.key === 'employee_name' ? exitSortConfig.direction : 'asc'} onClick={() => handleExitSort('employee_name')}>
//                         EMPLOYEE
//                       </TableSortLabel>
//                     </TableCell>
//                     <TableCell>
//                       <TableSortLabel sx={{ fontWeight: 'bold' }} active={exitSortConfig.key === 'exit_type_name'} direction={exitSortConfig.key === 'exit_type_name' ? exitSortConfig.direction : 'asc'} onClick={() => handleExitSort('exit_type_name')}>EXIT TYPE</TableSortLabel>
//                     </TableCell>
//                     <TableCell>
//                       <TableSortLabel sx={{ fontWeight: 'bold' }} active={exitSortConfig.key === 'exit_date'} direction={exitSortConfig.key === 'exit_date' ? exitSortConfig.direction : 'asc'} onClick={() => handleExitSort('exit_date')}>
//                         EXIT DATE
//                       </TableSortLabel>
//                     </TableCell>
//                     <TableCell sx={{ fontWeight: 'bold' }}>EXIT INTERVIEW</TableCell>
//                     <TableCell sx={{ fontWeight: 'bold' }}>DISABLE ACCOUNT</TableCell>
//                     <TableCell sx={{ fontWeight: 'bold' }}>STATUS</TableCell>
//                     <TableCell sx={{ fontWeight: 'bold' }} align="right">ACTIONS</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {loadingExits ? (<TableRow><TableCell colSpan={8} align="center"><CircularProgress /></TableCell></TableRow>
//                   ) : exitError ? (<TableRow><TableCell colSpan={8} align="center" sx={{ color: 'error.main' }}>{exitError}</TableCell></TableRow>
//                   ) : paginatedEmployeeExits.length > 0 ? (
//                     paginatedEmployeeExits.map((exit, index) => (
//                       <TableRow key={exit.exit_id} hover>
//                         <TableCell>{page * rowsPerPage + index + 1}</TableCell>
//                         <TableCell>{exit.employee_name || 'N/A'}</TableCell>
//                         <TableCell>{exit.exit_type_name || 'N/A'}</TableCell>
//                         <TableCell>{formatDate(exit.exit_date)}</TableCell>
//                         <TableCell>{capitalize(exit.exit_interview)}</TableCell>
//                         <TableCell>{capitalize(exit.is_inactivate_account)}</TableCell>
//                         <TableCell>{getStatusChip(exit.status)}</TableCell>
//                         <TableCell align="right">
//                           <Tooltip title="Edit"><IconButton size="small" onClick={() => handleOpenEditDialog(exit)} color="primary"><EditIcon /></IconButton></Tooltip>
//                           <Tooltip title="Delete"><IconButton size="small" onClick={() => handleDeleteExit(exit.exit_id)} color="error"><DeleteIcon /></IconButton></Tooltip>
//                         </TableCell>
//                       </TableRow>
//                     ))
//                   ) : (<TableRow><TableCell colSpan={8} align="center">No employee exits found.</TableCell></TableRow>)}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           )}

//           {/* PAGINATION */}
//           <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: 'center', mt: 2, p: 1, gap: 2 }}>
//             <Typography variant="body2" color="text.secondary">
//               Showing {paginatedEmployeeExits.length > 0 ? page * rowsPerPage + 1 : 0} to {Math.min((page + 1) * rowsPerPage, sortedAndFilteredEmployeeExits.length)} of {sortedAndFilteredEmployeeExits.length} entries
//             </Typography>
//             <Box sx={{ display: 'flex', gap: 1 }}>
//               <Button variant="outlined" disabled={page === 0} onClick={() => setPage(page - 1)}>Previous</Button>
//               <Button variant="outlined" disabled={page + 1 >= totalPages} onClick={() => setPage(page + 1)}>Next</Button>
//             </Box>
//           </Box>
//         </Paper>

//         {/* DIALOG for Adding/Editing Employee Exit */}
//         <Dialog open={openAddExitDialog} onClose={handleCloseEmployeeExitDialog} maxWidth="md" fullWidth>
//           <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//             <Typography variant="h6">{newEmployeeExit.currentEditingId ? 'Edit Employee Exit' : 'Add New Employee Exit'}</Typography>
//             <Button variant="outlined" onClick={handleCloseEmployeeExitDialog}>Close</Button>
//           </DialogTitle>
//           <Divider />
//           <DialogContent>
//             {/* ... Dialog content remains the same ... */}
//             <Grid container spacing={3}>
//               <Grid item xs={12} md={8}>
//                 <Grid container spacing={2}>
//                   <Grid item xs={12} md={6}>
//                     <FormControl fullWidth required={!newEmployeeExit.currentEditingId} disabled={!!newEmployeeExit.currentEditingId || loadingEmployeesDropdown}>
//                       <InputLabel id="employee-label">Employee</InputLabel>
//                       <Select labelId="employee-label" label="Employee" value={newEmployeeExit.employeeId} onChange={(e) => setNewEmployeeExit(prev => ({ ...prev, employeeId: e.target.value }))}>
//                         <MenuItem value=""><em>{loadingEmployeesDropdown ? "Loading..." : employeesDropdownError || "Select Employee"}</em></MenuItem>
//                         {!loadingEmployeesDropdown && !employeesDropdownError && employeesDropdownData.map((emp) => (<MenuItem key={emp.value} value={emp.value.toString()}>{emp.label}</MenuItem>))}
//                       </Select>
//                     </FormControl>
//                   </Grid>
//                   <Grid item xs={12} md={6}>
//                     <TextField label="Exit Date" fullWidth required type="date" InputLabelProps={{ shrink: true }} value={newEmployeeExit.exitDate} onChange={(e) => setNewEmployeeExit(prev => ({ ...prev, exitDate: e.target.value }))} InputProps={{ endAdornment: (<InputAdornment position="end"> </InputAdornment>) }} />
//                   </Grid>
//                   <Grid item xs={12} md={4}>
//                     <FormControl fullWidth required disabled={loadingExitTypes}>
//                       <InputLabel id="exit-type-label">Exit Type</InputLabel>
//                       <Select labelId="exit-type-label" label="Exit Type" value={newEmployeeExit.exitTypeId} onChange={(e) => setNewEmployeeExit(prev => ({ ...prev, exitTypeId: e.target.value }))}>
//                         <MenuItem value=""><em>{loadingExitTypes ? "Loading..." : exitTypesError || "Select Exit Type"}</em></MenuItem>
//                         {!loadingExitTypes && !exitTypesError && exitTypes.map((type) => (<MenuItem key={type.id} value={type.id.toString()}>{type.name}</MenuItem>))}
//                       </Select>
//                     </FormControl>
//                   </Grid>
//                   <Grid item xs={12} md={4}>
//                     <FormControl fullWidth required>
//                       <InputLabel id="exit-interview-label">Exit Interview</InputLabel>
//                       <Select labelId="exit-interview-label" label="Exit Interview" value={newEmployeeExit.exitInterview} onChange={(e) => setNewEmployeeExit(prev => ({ ...prev, exitInterview: e.target.value }))}>
//                         <MenuItem value="Yes">Yes</MenuItem><MenuItem value="No">No</MenuItem>
//                       </Select>
//                     </FormControl>
//                   </Grid>
//                   <Grid item xs={12} md={4}>
//                     <FormControl fullWidth required>
//                       <InputLabel id="disable-account-label">Disable Account</InputLabel>
//                       <Select labelId="disable-account-label" label="Disable Account" value={newEmployeeExit.disableAccount} onChange={(e) => setNewEmployeeExit(prev => ({ ...prev, disableAccount: e.target.value }))}>
//                         <MenuItem value="Yes">Yes</MenuItem><MenuItem value="No">No</MenuItem>
//                       </Select>
//                     </FormControl>
//                   </Grid>
//                   <Grid item xs={12}>
//                     <TextField label="Description / Reason" fullWidth multiline rows={3} placeholder="Enter description or reason for exit..." value={newEmployeeExit.description} onChange={(e) => setNewEmployeeExit(prev => ({ ...prev, description: e.target.value }))} />
//                   </Grid>
//                 </Grid>
//               </Grid>
//               <Grid item xs={12} md={4}>
//                 <Paper variant="outlined" sx={{ p: 2, height: '100%' }}>
//                   <Typography variant="subtitle1" gutterBottom>Exit Contract / Attachment</Typography>
//                   <TextField fullWidth disabled size="small" placeholder="No file chosen" value={newEmployeeExit.file ? newEmployeeExit.file.name : ''} sx={{ mb: 1 }} />
//                   <Button variant="outlined" component="label" fullWidth>Browse File<input type="file" hidden onChange={handleFileUpload} accept=".jpg,.jpeg,.png,.gif" /></Button>
//                   <Typography variant="caption" color="textSecondary" display="block" mt={1}>Allowed: GIF, PNG, JPG, JPEG. Max 2MB.</Typography>
//                 </Paper>
//               </Grid>
//             </Grid>
//           </DialogContent>
//           <Divider />
//           <DialogActions sx={{ p: 2, justifyContent: 'flex-end' }}>
//             <Button onClick={handleResetEmployeeExitForm} sx={{ mr: 1, color: 'text.secondary', borderColor: 'divider' }} variant="outlined">Reset</Button>
//             <Button variant="contained" onClick={handleSubmitEmployeeExit}>{newEmployeeExit.currentEditingId ? 'Update' : 'Save'}</Button>
//           </DialogActions>
//         </Dialog>

//         {/* DIALOG for Managing Exit Types (with no functional changes, as they were not requested) */}
//         <Dialog open={openAddExitTypeDialog} onClose={handleCloseExitTypeDialog} maxWidth="lg" fullWidth>
//           {/* ... This dialog remains largely the same but with Swal alerts implemented ... */}
//           <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>Manage Exit Types<Button onClick={handleCloseExitTypeDialog} variant="outlined">Close</Button></DialogTitle>
//           <DialogContent dividers sx={{ p: 0 }}>
//             <Grid container>
//               <Grid item xs={12} md={4} sx={{ borderRight: { md: '1px solid #eee' } }}>
//                 <Box sx={{ p: 3 }}>
//                   <Typography variant="h6" sx={{ mb: 2 }}>{editingExitType ? 'Edit Exit Type' : 'Add New Exit Type'}</Typography>
//                   <FormControl fullWidth sx={{ mb: 2 }}>
//                     <TextField required label="Exit Type Name" placeholder="Enter exit type name" value={newExitType} onChange={(e) => setNewExitType(e.target.value)} disabled={submittingExitType} error={!!submitExitTypeError} helperText={submitExitTypeError} />
//                   </FormControl>
//                   <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
//                     <Button variant="contained" onClick={editingExitType ? handleUpdateExitType : handleSubmitExitType} disabled={submittingExitType || !newExitType.trim()}>
//                       {submittingExitType ? <CircularProgress size={24} color="inherit" /> : editingExitType ? "Update" : "Save"}
//                     </Button>
//                   </Box>
//                 </Box>
//               </Grid>
//               <Grid item xs={12} md={8}>
//                 <Box sx={{ p: 3 }}>
//                   <Typography variant="h6" sx={{ mb: 2 }}>List All Exit Types</Typography>
//                   {loadingExitTypes ? (<Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}><CircularProgress /></Box>
//                   ) : exitTypesError ? (<Typography color="error" sx={{ p: 2 }}>Error: {exitTypesError} <Button onClick={fetchExitTypes} size="small">Retry</Button></Typography>
//                   ) : (
//                     <>
//                       <TableContainer component={Paper} variant="outlined">
//                         <Table size="small">
//                           <TableHead>
//                             <TableRow>
//                               <TableCell>
//                                 <TableSortLabel active={exitTypeSortConfig.key === 'name'} direction={exitTypeSortConfig.key === 'name' ? exitTypeSortConfig.direction : 'asc'} onClick={() => handleExitTypeSort('name')}>EXIT TYPE</TableSortLabel>
//                               </TableCell>
//                               <TableCell>
//                                 <TableSortLabel active={exitTypeSortConfig.key === 'createdAt'} direction={exitTypeSortConfig.key === 'createdAt' ? exitTypeSortConfig.direction : 'asc'} onClick={() => handleExitTypeSort('createdAt')}>CREATED AT</TableSortLabel>
//                               </TableCell>
//                               <TableCell>Actions</TableCell>
//                             </TableRow>
//                           </TableHead>
//                           <TableBody>
//                             {paginatedExitTypes.length > 0 ? (
//                               paginatedExitTypes.map((type) => (
//                                 <TableRow key={type.id} hover>
//                                   <TableCell>{type.name || 'N/A'}</TableCell>
//                                   <TableCell>{type.createdAt || 'N/A'}</TableCell>
//                                   <TableCell>
//                                     <IconButton size="small" onClick={() => handleEditExitType(type)} color="primary"><EditIcon fontSize="small" /></IconButton>
//                                     <IconButton size="small" color="error" onClick={() => handleDeleteExitType(type.id)}><DeleteIcon fontSize="small" /></IconButton>
//                                   </TableCell>
//                                 </TableRow>
//                               ))
//                             ) : (<TableRow><TableCell colSpan={3} align="center">No exit types found.</TableCell></TableRow>)}
//                           </TableBody>
//                         </Table>
//                       </TableContainer>
//                       {sortedAndFilteredExitTypes.length > 0 && (
//                         <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', mt: 2, gap: 1 }}>
//                           <Button size="small" disabled={exitTypePage === 0} onClick={() => setExitTypePage(p => p - 1)} sx={{ border: '1px solid #ddd' }}>Previous</Button>
//                           <Typography variant="body2">Page {exitTypePage + 1} of {totalExitTypePages}</Typography>
//                           <Button size="small" disabled={exitTypePage >= totalExitTypePages - 1} onClick={() => setExitTypePage(p => p + 1)} sx={{ border: '1px solid #ddd' }}>Next</Button>
//                         </Box>
//                       )}
//                     </>
//                   )}
//                 </Box>
//               </Grid>
//             </Grid>
//           </DialogContent>
//         </Dialog>
//       </Box>
//     </ThemeProvider>
//   );
// };

// export default EmployeeExitManagement;






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
//   Divider,
//   CssBaseline,
//   InputAdornment,
//   CircularProgress,
//   TableSortLabel,
//   useMediaQuery,
//   Card,
//   CardContent,
//   CardActions,
//   Stack,
//   Tooltip,
// } from '@mui/material';
// import AddIcon from '@mui/icons-material/Add';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
// import SearchIcon from '@mui/icons-material/Search';
// import FileDownloadIcon from '@mui/icons-material/FileDownload';
// import Swal from 'sweetalert2';
// import axiosInstance from '../../utils/axiosInstance';

// // API Configuration
// const API_BASE_URL = 'https://tdtlworld.com/hrms-backend/api';
// const EXIT_TYPE_API_URL = `${API_BASE_URL}/exit-type/`;
// const EMPLOYEE_DROPDOWN_API_URL = 'https://tdtlworld.com/hrms-backend/employee-dropdown/';

// // Updated theme with Purple and Orange color palette
// const theme = createTheme({
//   palette: {
//     primary: {
//       main: '#8C257C', // Purple
//     },
//     secondary: {
//       main: '#F58E35', // Orange
//     },
//     success: { main: '#4caf50' },
//     warning: { main: '#ff9800' },
//     error: { main: '#f44336' },
//     background: { default: '#f5f5f9', paper: '#ffffff' },
//   },
//   breakpoints: {
//     values: { xs: 0, sm: 600, md: 900, lg: 1200, xl: 1536 },
//   },
// });

// // Utility function for formatting date
// const formatDate = (dateString) => {
//   if (!dateString) return 'N/A';
//   try {
//     const date = new Date(dateString);
//     if (isNaN(date.getTime())) return 'N/A';
//     const day = String(date.getDate()).padStart(2, '0');
//     const month = String(date.getMonth() + 1).padStart(2, '0');
//     const year = date.getFullYear();
//     return `${day}/${month}/${year}`;
//   } catch (error) {
//     return 'N/A';
//   }
// };

// // Helper function to capitalize strings, returning 'N/A' for empty values
// const capitalize = (s) => {
//   if (typeof s !== 'string' || !s) return 'N/A';
//   return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
// };

// // Helper function for Status Chip
// const getStatusChip = (statusValue) => {
//   const statusText = capitalize(statusValue || 'Pending');
//   if (statusText === 'N/A') return <Chip label="Pending" color="warning" size="small" />;

//   let color = 'default';
//   if (statusText === 'Approved') color = 'success';
//   else if (statusText === 'Pending') color = 'warning';
//   else if (statusText === 'Rejected') color = 'error';
//   return <Chip label={statusText} color={color} size="small" />;
// };

// function EmployeeExitManagement() {
//   const [exitTypes, setExitTypes] = useState([]);
//   const [loadingExitTypes, setLoadingExitTypes] = useState(true);
//   const [exitTypesError, setExitTypesError] = useState(null);
//   const [submittingExitType, setSubmittingExitType] = useState(false);
//   const [submitExitTypeError, setSubmitExitTypeError] = useState(null);
//   const [exitTypeSortConfig, setExitTypeSortConfig] = useState({ key: 'name', direction: 'asc' });

//   const [employeesDropdownData, setEmployeesDropdownData] = useState([]);
//   const [loadingEmployeesDropdown, setLoadingEmployeesDropdown] = useState(true);
//   const [employeesDropdownError, setEmployeesDropdownError] = useState(null);

//   const [employeeExits, setEmployeeExits] = useState([]);
//   const [loadingExits, setLoadingExits] = useState(true);
//   const [exitError, setExitError] = useState(null);

//   const [openAddExitDialog, setOpenAddExitDialog] = useState(false);
//   const [openAddExitTypeDialog, setOpenAddExitTypeDialog] = useState(false);

//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);

//   const [exitTypePage, setExitTypePage] = useState(0);
//   const [exitTypeRowsPerPage, setExitTypeRowsPerPage] = useState(10);

//   const [searchTerm, setSearchTerm] = useState('');
//   const [exitTypeSearchTerm, setExitTypeSearchTerm] = useState('');

//   const [exitSortConfig, setExitSortConfig] = useState({ key: 'exit_date', direction: 'desc' });

//   const initialEmployeeExitState = {
//     employeeId: '', exitDate: '', exitTypeId: '',
//     exitInterview: 'Yes', disableAccount: 'Yes',
//     description: '', file: null, currentEditingId: null,
//   };

//   const [newEmployeeExit, setNewEmployeeExit] = useState(initialEmployeeExitState);
//   const [newExitType, setNewExitType] = useState('');
//   const [editingExitType, setEditingExitType] = useState(null);
//   const isMobile = useMediaQuery(theme.breakpoints.down('md'));

//   const fetchExitTypes = useCallback(async () => {
//     setLoadingExitTypes(true);
//     setExitTypesError(null);
//     try {
//       const response = await axiosInstance.get(EXIT_TYPE_API_URL);
//       const transformedData = response.data.map(item => ({
//         id: item.value, name: item.label, createdAt: formatDate(item.created_at),
//       }));
//       setExitTypes(transformedData);
//     } catch (error) {
//       console.error("Failed to fetch exit types:", error);
//       setExitTypesError("Failed to load exit types.");
//     } finally {
//       setLoadingExitTypes(false);
//     }
//   }, []);

//   const fetchEmployeesDropdown = useCallback(async () => {
//     setLoadingEmployeesDropdown(true);
//     setEmployeesDropdownError(null);
//     try {
//       const response = await axiosInstance.get(EMPLOYEE_DROPDOWN_API_URL);
//       setEmployeesDropdownData(response.data || []);
//     } catch (error) {
//       console.error("Failed to fetch employees dropdown:", error);
//       setEmployeesDropdownError("Failed to load employee list.");
//     } finally {
//       setLoadingEmployeesDropdown(false);
//     }
//   }, []);

//   const fetchEmployeeExits = useCallback(async () => {
//     setLoadingExits(true);
//     try {
//       const response = await axiosInstance.get('/employee-exits/');
//       setEmployeeExits(response.data);
//       setExitError(null);
//     } catch (error) {
//       console.error("Error fetching employee exits:", error);
//       setExitError('Failed to load employee exits');
//     } finally {
//       setLoadingExits(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchExitTypes();
//     fetchEmployeesDropdown();
//     fetchEmployeeExits();
//   }, [fetchExitTypes, fetchEmployeesDropdown, fetchEmployeeExits]);

//   const handleOpenEditDialog = (exitToEdit) => {
//     setNewEmployeeExit({
//       employeeId: exitToEdit.employee_id?.toString() || '',
//       exitDate: exitToEdit.exit_date ? exitToEdit.exit_date.split('T')[0] : '',
//       exitTypeId: exitToEdit.exit_type_id?.toString() || '',
//       exitInterview: capitalize(exitToEdit.exit_interview) === 'N/A' ? 'Yes' : capitalize(exitToEdit.exit_interview),
//       disableAccount: capitalize(exitToEdit.is_inactivate_account) === 'N/A' ? 'Yes' : capitalize(exitToEdit.is_inactivate_account),
//       description: exitToEdit.reason || '',
//       file: null, currentEditingId: exitToEdit.exit_id,
//     });
//     setOpenAddExitDialog(true);
//   };

//   const handleSubmitEmployeeExit = async () => {
//     const isEditMode = !!newEmployeeExit.currentEditingId;
//     if (!isEditMode && !newEmployeeExit.employeeId) { Swal.fire('Validation Error', 'Please select an Employee.', 'warning'); return; }
//     if (!newEmployeeExit.exitDate) { Swal.fire('Validation Error', 'Please select an Exit Date.', 'warning'); return; }
//     if (!newEmployeeExit.exitTypeId) { Swal.fire('Validation Error', 'Please select an Exit Type.', 'warning'); return; }

//     const selectedExitType = exitTypes.find(type => type.id.toString() === newEmployeeExit.exitTypeId.toString());
//     const exitTypeNameForPayload = selectedExitType ? selectedExitType.name : '';

//     if (isEditMode) {
//       const updatePayload = {
//         exit_date: newEmployeeExit.exitDate,
//         exit_type_id: parseInt(newEmployeeExit.exitTypeId),
//         exit_type_name: exitTypeNameForPayload,
//         reason: newEmployeeExit.description,
//         accountability_to: "0",
//         exit_interview: newEmployeeExit.exitInterview.toLowerCase(),
//         is_inactivate_account: newEmployeeExit.disableAccount.toLowerCase(),
//       };
//       try {
//         await axiosInstance.patch(`/employee-exits/${newEmployeeExit.currentEditingId}/`, updatePayload);
//         Swal.fire('Updated!', 'Employee Exit updated successfully.', 'success');
//         fetchEmployeeExits(); handleCloseEmployeeExitDialog();
//       } catch (error) {
//         console.error('Error updating employee exit:', error.response?.data || error.message);
//         Swal.fire('Error!', `Failed to update employee exit. ${error.response?.data?.detail || error.message || ''}`, 'error');
//       }
//     } else {
//       const createPayload = {
//         employee_id: parseInt(newEmployeeExit.employeeId), exit_date: newEmployeeExit.exitDate,
//         exit_type_id: parseInt(newEmployeeExit.exitTypeId), exit_type_name: exitTypeNameForPayload,
//         sub_exit_type_id: null, exit_interview: newEmployeeExit.exitInterview.toLowerCase(),
//         is_inactivate_account: newEmployeeExit.disableAccount.toLowerCase(),
//         reason: newEmployeeExit.description, accountability_to: "0", added_by: 2
//       };
//       try {
//         await axiosInstance.post('/employee-exits/', createPayload);
//         Swal.fire('Added!', 'Employee Exit added successfully.', 'success');
//         fetchEmployeeExits(); handleCloseEmployeeExitDialog();
//       } catch (error) {
//         console.error('Error adding employee exit:', error.response?.data || error.message);
//         Swal.fire('Error!', `Failed to add employee exit. ${error.response?.data?.detail || error.message || ''}`, 'error');
//       }
//     }
//   };

//   const handleDeleteExit = (exitId) => {
//     Swal.fire({
//       title: 'Are you sure?',
//       text: "You won't be able to revert this!",
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#8C257C',
//       cancelButtonColor: '#F58E35',
//       confirmButtonText: 'Yes, delete it!'
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         try {
//           await axiosInstance.delete(`/employee-exits/${exitId}/`);
//           Swal.fire('Deleted!', 'Employee exit has been deleted.', 'success');
//           fetchEmployeeExits();
//         } catch (error) {
//           console.error("Failed to delete exit:", error);
//           Swal.fire('Error!', 'Failed to delete employee exit.', 'error');
//         }
//       }
//     });
//   };

//   const handleSubmitExitType = async () => {
//     if (!newExitType.trim()) { setSubmitExitTypeError('Exit Type name is required.'); return; }
//     setSubmittingExitType(true); setSubmitExitTypeError(null);
//     try {
//       await axiosInstance.post(EXIT_TYPE_API_URL, { category_name: newExitType.trim() });
//       Swal.fire('Success!', 'Exit type added successfully!', 'success');
//       setNewExitType('');
//       fetchExitTypes();
//     } catch (error) {
//       console.error("Failed to submit exit type:", error.response?.data || error.message);
//       setSubmitExitTypeError(error.response?.data?.detail || error.response?.data?.category_name?.[0] || error.message || "Failed to add exit type.");
//     } finally { setSubmittingExitType(false); }
//   };

//   const handleEditExitType = (type) => { setNewExitType(type.name); setEditingExitType(type); };

//   const handleUpdateExitType = async () => {
//     if (!newExitType.trim()) { setSubmitExitTypeError("Exit Type name is required."); return; }
//     setSubmittingExitType(true); setSubmitExitTypeError(null);
//     try {
//       await axiosInstance.patch(`${EXIT_TYPE_API_URL}${editingExitType.id}/`, { category_name: newExitType.trim() });
//       Swal.fire('Updated!', 'Exit type updated successfully!', 'success');
//       setNewExitType(""); setEditingExitType(null); fetchExitTypes();
//     } catch (error) {
//       console.error("Failed to update exit type:", error.response?.data || error.message);
//       setSubmitExitTypeError(error.response?.data?.detail || error.response?.data?.category_name?.[0] || error.message || "Failed to update exit type.");
//     } finally { setSubmittingExitType(false); }
//   };

//   const handleDeleteExitType = (id) => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "This action cannot be undone.",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: '#8C257C',
//       cancelButtonColor: '#F58E35',
//       confirmButtonText: 'Yes, delete it!'
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         try {
//           await axiosInstance.delete(`${EXIT_TYPE_API_URL}${id}/`);
//           Swal.fire("Deleted!", "Exit type has been deleted.", "success");
//           fetchExitTypes();
//         } catch (error) {
//           console.error("Failed to delete exit type:", error.response?.data || error.message);
//           Swal.fire("Error!", "Failed to delete exit type.", "error");
//         }
//       }
//     });
//   };

//   const handleCloseEmployeeExitDialog = () => { setOpenAddExitDialog(false); setNewEmployeeExit(initialEmployeeExitState); };
//   const handleCloseExitTypeDialog = () => { setOpenAddExitTypeDialog(false); setNewExitType(''); setEditingExitType(null); setSubmitExitTypeError(null); };
//   const handleResetEmployeeExitForm = () => setNewEmployeeExit(initialEmployeeExitState);

//   const handleFileUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       if (['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
//         if (file.size <= 2 * 1024 * 1024) { setNewEmployeeExit(prev => ({ ...prev, file: file })); }
//         else { Swal.fire('File Too Large', 'File size exceeds 2MB limit.', 'warning'); e.target.value = null; }
//       } else { Swal.fire('Invalid File Type', 'Please upload only .gif, .png, .jpg, or .jpeg files', 'warning'); e.target.value = null; }
//     }
//   };

//   const sortedAndFilteredEmployeeExits = useMemo(() => {
//     let items = employeeExits.filter(exit =>
//       (exit.employee_name && exit.employee_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
//       (exit.exit_type_name && exit.exit_type_name.toLowerCase().includes(searchTerm.toLowerCase()))
//     );

//     if (exitSortConfig.key) {
//       items.sort((a, b) => {
//         const key = exitSortConfig.key;
//         const order = exitSortConfig.direction === 'asc' ? 1 : -1;
//         const valA = a[key];
//         const valB = b[key];

//         if (valA == null) return 1; if (valB == null) return -1;

//         if (key === 'exit_date') {
//           const dateA = new Date(valA).getTime(); const dateB = new Date(valB).getTime();
//           if (isNaN(dateA)) return 1; if (isNaN(dateB)) return -1;
//           return (dateA - dateB) * order;
//         }

//         return String(valA).localeCompare(String(valB)) * order;
//       });
//     }
//     return items;
//   }, [employeeExits, searchTerm, exitSortConfig]);

//   const handleExitSort = (key) => {
//     let direction = 'asc';
//     if (exitSortConfig.key === key && exitSortConfig.direction === 'asc') { direction = 'desc'; }
//     setExitSortConfig({ key, direction });
//   };

//   const sortedAndFilteredExitTypes = useMemo(() => {
//     let items = [...exitTypes];
//     if (exitTypeSearchTerm) {
//       items = items.filter(type => type.name && type.name.toLowerCase().includes(exitTypeSearchTerm.toLowerCase()));
//     }
//     if (exitTypeSortConfig.key) {
//       items.sort((a, b) => {
//         const valA = a[exitTypeSortConfig.key] || ''; const valB = b[exitTypeSortConfig.key] || '';
//         if (valA < valB) return exitTypeSortConfig.direction === 'asc' ? -1 : 1;
//         if (valA > valB) return exitTypeSortConfig.direction === 'asc' ? 1 : -1;
//         return 0;
//       });
//     }
//     return items;
//   }, [exitTypes, exitTypeSearchTerm, exitTypeSortConfig]);

//   const paginatedEmployeeExits = sortedAndFilteredEmployeeExits.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
//   const totalPages = Math.ceil(sortedAndFilteredEmployeeExits.length / rowsPerPage);
//   const paginatedExitTypes = sortedAndFilteredExitTypes.slice(exitTypePage * exitTypeRowsPerPage, exitTypePage * exitTypeRowsPerPage + exitTypeRowsPerPage);
//   const totalExitTypePages = Math.ceil(sortedAndFilteredExitTypes.length / exitTypeRowsPerPage);

//   const handleExitTypeSort = (key) => {
//     let direction = 'asc';
//     if (exitTypeSortConfig.key === key && exitTypeSortConfig.direction === 'asc') { direction = 'desc'; }
//     setExitTypeSortConfig({ key, direction });
//   };
  
//   const headerCellStyle = {
//     bgcolor: 'primary.main',
//     color: 'common.white',
//     fontWeight: 'bold',
//   };
  
//   const sortLabelStyle = {
//     color: 'inherit !important',
//     '& .MuiTableSortLabel-icon': {
//       color: 'inherit !important',
//     },
//     '&.Mui-active': {
//       color: 'inherit !important',
//     },
//   };

//   const ExitCard = ({ exit, index }) => (
//     <Card sx={{ mb: 2 }} elevation={2}>
//       <Box sx={{ p: 2, bgcolor: 'primary.main', color: 'common.white' }}>
//         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//           <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
//             {exit.employee_name || 'N/A'}
//           </Typography>
//           <Chip label={`Sr. No: ${page * rowsPerPage + index + 1}`} size="small" sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'common.white' }} />
//         </Box>
//       </Box>
//       <CardContent>
//         <Stack spacing={1.5}>
//           <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
//             <Typography variant="body2" color="text.secondary">Exit Type</Typography>
//             <Typography variant="body2" sx={{ fontWeight: 500 }}>{exit.exit_type_name || 'N/A'}</Typography>
//           </Box>
//           <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
//             <Typography variant="body2" color="text.secondary">Exit Date</Typography>
//             <Typography variant="body2" sx={{ fontWeight: 500 }}>{formatDate(exit.exit_date)}</Typography>
//           </Box>
//           <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
//             <Typography variant="body2" color="text.secondary">Exit Interview</Typography>
//             <Typography variant="body2" sx={{ fontWeight: 500 }}>{capitalize(exit.exit_interview)}</Typography>
//           </Box>
//           <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
//             <Typography variant="body2" color="text.secondary">Disable Account</Typography>
//             <Typography variant="body2" sx={{ fontWeight: 500 }}>{capitalize(exit.is_inactivate_account)}</Typography>
//           </Box>
//           <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//             <Typography variant="body2" color="text.secondary">Status</Typography>
//             {getStatusChip(exit.status)}
//           </Box>
//         </Stack>
//       </CardContent>
//       <CardActions sx={{ justifyContent: 'flex-end', p: 2, pt: 0 }}>
//         <Button startIcon={<EditIcon />} onClick={() => handleOpenEditDialog(exit)} color="primary" variant="text">Edit</Button>
//         <Button startIcon={<DeleteIcon />} onClick={() => handleDeleteExit(exit.exit_id)} color="secondary" variant="text">Delete</Button>
//       </CardActions>
//     </Card>
//   );

//   return (
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
//       <Box sx={{ p: { xs: 1, sm: 2, md: 3 } }}>
//         <Paper elevation={3} sx={{ p: { xs: 1.5, sm: 2, md: 3 }, borderRadius: 2 }}>
//           <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', sm: 'center' }, mb: 3, gap: 2, }}>
//             <Typography variant="h6" sx={{ fontWeight: 'bold' }}>List All Employee Exit</Typography>
//             <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} sx={{ width: { xs: '100%', sm: 'auto' } }}>
//               <Button variant="outlined" color="secondary" onClick={() => setOpenAddExitTypeDialog(true)}>+ Exit Type</Button>
//               <Button variant="outlined" startIcon={<FileDownloadIcon />} onClick={() => { /* handleExport */ }}>Export</Button>
//               <Button variant="contained" startIcon={<AddIcon />} onClick={() => setOpenAddExitDialog(true)}>Add New Exit</Button>
//             </Stack>
//           </Box>
          
//           <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
//             <TextField
//               size="small"
//               placeholder="Search exits..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               sx={{ width: { xs: '100%', sm: 300 } }}
//               InputProps={{
//                 startAdornment: (
//                   <InputAdornment position="start">
//                     <SearchIcon />
//                   </InputAdornment>
//                 ),
//               }}
//             />
//           </Box>

//           {isMobile ? (
//             <Box sx={{ mt: 3 }}>
//               {loadingExits ? <Box sx={{ display: 'flex', justifyContent: 'center' }}><CircularProgress /></Box> : paginatedEmployeeExits.length > 0 ? (
//                 paginatedEmployeeExits.map((exit, index) => <ExitCard key={exit.exit_id} exit={exit} index={index} />)
//               ) : (<Typography align="center" sx={{ p: 4, color: 'text.secondary' }}>No employee exits found.</Typography>)}
//             </Box>
//           ) : (
//             <TableContainer>
//               <Table>
//                 <TableHead>
//                   <TableRow>
//                     <TableCell sx={headerCellStyle}>SR. NO.</TableCell>
//                     <TableCell sx={headerCellStyle}>
//                       <TableSortLabel sx={sortLabelStyle} active={exitSortConfig.key === 'employee_name'} direction={exitSortConfig.key === 'employee_name' ? exitSortConfig.direction : 'asc'} onClick={() => handleExitSort('employee_name')}>
//                         EMPLOYEE
//                       </TableSortLabel>
//                     </TableCell>
//                     <TableCell sx={headerCellStyle}>
//                       <TableSortLabel sx={sortLabelStyle} active={exitSortConfig.key === 'exit_type_name'} direction={exitSortConfig.key === 'exit_type_name' ? exitSortConfig.direction : 'asc'} onClick={() => handleExitSort('exit_type_name')}>EXIT TYPE</TableSortLabel>
//                     </TableCell>
//                     <TableCell sx={headerCellStyle}>
//                       <TableSortLabel sx={sortLabelStyle} active={exitSortConfig.key === 'exit_date'} direction={exitSortConfig.key === 'exit_date' ? exitSortConfig.direction : 'asc'} onClick={() => handleExitSort('exit_date')}>
//                         EXIT DATE
//                       </TableSortLabel>
//                     </TableCell>
//                     <TableCell sx={headerCellStyle}>EXIT INTERVIEW</TableCell>
//                     <TableCell sx={headerCellStyle}>DISABLE ACCOUNT</TableCell>
//                     <TableCell sx={headerCellStyle}>STATUS</TableCell>
//                     <TableCell sx={headerCellStyle} align="right">ACTIONS</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {loadingExits ? (<TableRow><TableCell colSpan={8} align="center"><CircularProgress /></TableCell></TableRow>
//                   ) : exitError ? (<TableRow><TableCell colSpan={8} align="center" sx={{ color: 'error.main' }}>{exitError}</TableCell></TableRow>
//                   ) : paginatedEmployeeExits.length > 0 ? (
//                     paginatedEmployeeExits.map((exit, index) => (
//                       <TableRow key={exit.exit_id} hover>
//                         <TableCell>{page * rowsPerPage + index + 1}</TableCell>
//                         <TableCell>{exit.employee_name || 'N/A'}</TableCell>
//                         <TableCell>{exit.exit_type_name || 'N/A'}</TableCell>
//                         <TableCell>{formatDate(exit.exit_date)}</TableCell>
//                         <TableCell>{capitalize(exit.exit_interview)}</TableCell>
//                         <TableCell>{capitalize(exit.is_inactivate_account)}</TableCell>
//                         <TableCell>{getStatusChip(exit.status)}</TableCell>
//                         <TableCell align="right">
//                           <Tooltip title="Edit"><IconButton size="small" onClick={() => handleOpenEditDialog(exit)} color="primary"><EditIcon /></IconButton></Tooltip>
//                           <Tooltip title="Delete"><IconButton size="small" onClick={() => handleDeleteExit(exit.exit_id)} color="secondary"><DeleteIcon /></IconButton></Tooltip>
//                         </TableCell>
//                       </TableRow>
//                     ))
//                   ) : (<TableRow><TableCell colSpan={8} align="center">No employee exits found.</TableCell></TableRow>)}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           )}

//           {/* Bottom Section: Total Rows on Left, Pagination on Right */}
//           <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: 'center', mt: 2, p: 1, gap: 2 }}>
//             <Stack direction="row" spacing={2} alignItems="center">
//               <FormControl size="small" sx={{ minWidth: 70 }}>
//                 <InputLabel id="rows-per-page-label">Rows</InputLabel>
//                 <Select
//                   labelId="rows-per-page-label"
//                   label="Rows"
//                   value={rowsPerPage}
//                   onChange={(e) => { setRowsPerPage(parseInt(e.target.value, 10)); setPage(0); }}
//                 >
//                   <MenuItem value={5}>5</MenuItem>
//                   <MenuItem value={10}>10</MenuItem>
//                   <MenuItem value={25}>25</MenuItem>
//                 </Select>
//               </FormControl>
//               <Typography variant="body2" color="text.secondary">
//                 Showing {paginatedEmployeeExits.length > 0 ? page * rowsPerPage + 1 : 0} to {Math.min((page + 1) * rowsPerPage, sortedAndFilteredEmployeeExits.length)} of {sortedAndFilteredEmployeeExits.length} entries
//               </Typography>
//             </Stack>
//             <Box sx={{ display: 'flex', gap: 1 }}>
//               <Button variant="outlined" disabled={page === 0} onClick={() => setPage(page - 1)}>Previous</Button>
//               <Button variant="outlined" disabled={page + 1 >= totalPages} onClick={() => setPage(page + 1)}>Next</Button>
//             </Box>
//           </Box>
//         </Paper>

//         {/* DIALOG for Adding/Editing Employee Exit */}
//         <Dialog open={openAddExitDialog} onClose={handleCloseEmployeeExitDialog} maxWidth="md" fullWidth>
//           <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//             <Typography variant="h6">{newEmployeeExit.currentEditingId ? 'Edit Employee Exit' : 'Add New Employee Exit'}</Typography>
//             <Button onClick={handleCloseEmployeeExitDialog}>Close</Button>
//           </DialogTitle>
//           <Divider />
//           <DialogContent>
//             <Grid container spacing={3}>
//               <Grid item xs={12} md={8}>
//                 <Grid container spacing={2}>
//                   <Grid item xs={12} md={6}>
//                     <FormControl fullWidth required={!newEmployeeExit.currentEditingId} disabled={!!newEmployeeExit.currentEditingId || loadingEmployeesDropdown}>
//                       <InputLabel id="employee-label">Employee</InputLabel>
//                       <Select labelId="employee-label" label="Employee" value={newEmployeeExit.employeeId} onChange={(e) => setNewEmployeeExit(prev => ({ ...prev, employeeId: e.target.value }))}>
//                         <MenuItem value=""><em>{loadingEmployeesDropdown ? "Loading..." : employeesDropdownError || "Select Employee"}</em></MenuItem>
//                         {!loadingEmployeesDropdown && !employeesDropdownError && employeesDropdownData.map((emp) => (<MenuItem key={emp.value} value={emp.value.toString()}>{emp.label}</MenuItem>))}
//                       </Select>
//                     </FormControl>
//                   </Grid>
//                   <Grid item xs={12} md={6}>
//                     <TextField label="Exit Date" fullWidth required type="date" InputLabelProps={{ shrink: true }} value={newEmployeeExit.exitDate} onChange={(e) => setNewEmployeeExit(prev => ({ ...prev, exitDate: e.target.value }))} />
//                   </Grid>
//                   <Grid item xs={12} md={4}>
//                     <FormControl fullWidth required disabled={loadingExitTypes}>
//                       <InputLabel id="exit-type-label">Exit Type</InputLabel>
//                       <Select labelId="exit-type-label" label="Exit Type" value={newEmployeeExit.exitTypeId} onChange={(e) => setNewEmployeeExit(prev => ({ ...prev, exitTypeId: e.target.value }))}>
//                         <MenuItem value=""><em>{loadingExitTypes ? "Loading..." : exitTypesError || "Select Exit Type"}</em></MenuItem>
//                         {!loadingExitTypes && !exitTypesError && exitTypes.map((type) => (<MenuItem key={type.id} value={type.id.toString()}>{type.name}</MenuItem>))}
//                       </Select>
//                     </FormControl>
//                   </Grid>
//                   <Grid item xs={12} md={4}>
//                     <FormControl fullWidth required>
//                       <InputLabel id="exit-interview-label">Exit Interview</InputLabel>
//                       <Select labelId="exit-interview-label" label="Exit Interview" value={newEmployeeExit.exitInterview} onChange={(e) => setNewEmployeeExit(prev => ({ ...prev, exitInterview: e.target.value }))}>
//                         <MenuItem value="Yes">Yes</MenuItem><MenuItem value="No">No</MenuItem>
//                       </Select>
//                     </FormControl>
//                   </Grid>
//                   <Grid item xs={12} md={4}>
//                     <FormControl fullWidth required>
//                       <InputLabel id="disable-account-label">Disable Account</InputLabel>
//                       <Select labelId="disable-account-label" label="Disable Account" value={newEmployeeExit.disableAccount} onChange={(e) => setNewEmployeeExit(prev => ({ ...prev, disableAccount: e.target.value }))}>
//                         <MenuItem value="Yes">Yes</MenuItem><MenuItem value="No">No</MenuItem>
//                       </Select>
//                     </FormControl>
//                   </Grid>
//                   <Grid item xs={12}>
//                     <TextField label="Description / Reason" fullWidth multiline rows={3} placeholder="Enter description or reason for exit..." value={newEmployeeExit.description} onChange={(e) => setNewEmployeeExit(prev => ({ ...prev, description: e.target.value }))} />
//                   </Grid>
//                 </Grid>
//               </Grid>
//               <Grid item xs={12} md={4}>
//                 <Paper variant="outlined" sx={{ p: 2, height: '100%' }}>
//                   <Typography variant="subtitle1" gutterBottom>Exit Contract / Attachment</Typography>
//                   <TextField fullWidth disabled size="small" placeholder="No file chosen" value={newEmployeeExit.file ? newEmployeeExit.file.name : ''} sx={{ mb: 1 }} />
//                   <Button variant="outlined" component="label" fullWidth>Browse File<input type="file" hidden onChange={handleFileUpload} accept=".jpg,.jpeg,.png,.gif" /></Button>
//                   <Typography variant="caption" color="textSecondary" display="block" mt={1}>Allowed: GIF, PNG, JPG, JPEG. Max 2MB.</Typography>
//                 </Paper>
//               </Grid>
//             </Grid>
//           </DialogContent>
//           <Divider />
//           <DialogActions sx={{ p: 2, justifyContent: 'flex-end' }}>
//             <Button onClick={handleResetEmployeeExitForm} color="secondary" variant="outlined">Reset</Button>
//             <Button variant="contained" onClick={handleSubmitEmployeeExit}>{newEmployeeExit.currentEditingId ? 'Update' : 'Save'}</Button>
//           </DialogActions>
//         </Dialog>

//         {/* DIALOG for Managing Exit Types */}
//         <Dialog open={openAddExitTypeDialog} onClose={handleCloseExitTypeDialog} maxWidth="lg" fullWidth>
//           <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>Manage Exit Types<Button onClick={handleCloseExitTypeDialog}>Close</Button></DialogTitle>
//           <DialogContent dividers sx={{ p: 0 }}>
//             <Grid container>
//               <Grid item xs={12} md={4} sx={{ borderRight: { md: '1px solid #eee' } }}>
//                 <Box sx={{ p: 3 }}>
//                   <Typography variant="h6" sx={{ mb: 2 }}>{editingExitType ? 'Edit Exit Type' : 'Add New Exit Type'}</Typography>
//                   <FormControl fullWidth sx={{ mb: 2 }}>
//                     <TextField required label="Exit Type Name" placeholder="Enter exit type name" value={newExitType} onChange={(e) => setNewExitType(e.target.value)} disabled={submittingExitType} error={!!submitExitTypeError} helperText={submitExitTypeError} />
//                   </FormControl>
//                   <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
//                     <Button variant="contained" onClick={editingExitType ? handleUpdateExitType : handleSubmitExitType} disabled={submittingExitType || !newExitType.trim()}>
//                       {submittingExitType ? <CircularProgress size={24} color="inherit" /> : editingExitType ? "Update" : "Save"}
//                     </Button>
//                   </Box>
//                 </Box>
//               </Grid>
//               <Grid item xs={12} md={8}>
//                 <Box sx={{ p: 3 }}>
//                   <Typography variant="h6" sx={{ mb: 2 }}>List All Exit Types</Typography>
//                   {loadingExitTypes ? (<Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}><CircularProgress /></Box>
//                   ) : exitTypesError ? (<Typography color="error" sx={{ p: 2 }}>Error: {exitTypesError} <Button onClick={fetchExitTypes} size="small">Retry</Button></Typography>
//                   ) : (
//                     <>
//                       <TableContainer component={Paper} variant="outlined">
//                         <Table size="small">
//                           <TableHead>
//                             <TableRow sx={{ bgcolor: 'primary.light' }}>
//                               <TableCell sx={{ color: 'primary.contrastText' }}>
//                                 <TableSortLabel active={exitTypeSortConfig.key === 'name'} direction={exitTypeSortConfig.key === 'name' ? exitTypeSortConfig.direction : 'asc'} onClick={() => handleExitTypeSort('name')}>EXIT TYPE</TableSortLabel>
//                               </TableCell>
//                               <TableCell sx={{ color: 'primary.contrastText' }}>
//                                 <TableSortLabel active={exitTypeSortConfig.key === 'createdAt'} direction={exitTypeSortConfig.key === 'createdAt' ? exitTypeSortConfig.direction : 'asc'} onClick={() => handleExitTypeSort('createdAt')}>CREATED AT</TableSortLabel>
//                               </TableCell>
//                               <TableCell sx={{ color: 'primary.contrastText' }}>Actions</TableCell>
//                             </TableRow>
//                           </TableHead>
//                           <TableBody>
//                             {paginatedExitTypes.length > 0 ? (
//                               paginatedExitTypes.map((type) => (
//                                 <TableRow key={type.id} hover>
//                                   <TableCell>{type.name || 'N/A'}</TableCell>
//                                   <TableCell>{type.createdAt || 'N/A'}</TableCell>
//                                   <TableCell>
//                                     <IconButton size="small" onClick={() => handleEditExitType(type)} color="primary"><EditIcon fontSize="small" /></IconButton>
//                                     <IconButton size="small" color="secondary" onClick={() => handleDeleteExitType(type.id)}><DeleteIcon fontSize="small" /></IconButton>
//                                   </TableCell>
//                                 </TableRow>
//                               ))
//                             ) : (<TableRow><TableCell colSpan={3} align="center">No exit types found.</TableCell></TableRow>)}
//                           </TableBody>
//                         </Table>
//                       </TableContainer>
//                       {sortedAndFilteredExitTypes.length > 0 && (
//                         <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', mt: 2, gap: 1 }}>
//                           <Button size="small" disabled={exitTypePage === 0} onClick={() => setExitTypePage(p => p - 1)}>Previous</Button>
//                           <Typography variant="body2">Page {exitTypePage + 1} of {totalExitTypePages}</Typography>
//                           <Button size="small" disabled={exitTypePage >= totalExitTypePages - 1} onClick={() => setExitTypePage(p => p + 1)}>Next</Button>
//                         </Box>
//                       )}
//                     </>
//                   )}
//                 </Box>
//               </Grid>
//             </Grid>
//           </DialogContent>
//         </Dialog>
//       </Box>
//     </ThemeProvider>
//   );
// };

// export default EmployeeExitManagement;
















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
//   Divider,
//   CssBaseline,
//   InputAdornment,
//   CircularProgress,
//   TableSortLabel,
//   useMediaQuery,
//   Card,
//   CardContent,
//   CardActions,
//   Stack,
//   Tooltip,
// } from '@mui/material';
// import AddIcon from '@mui/icons-material/Add';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
// import SearchIcon from '@mui/icons-material/Search';
// import FileDownloadIcon from '@mui/icons-material/FileDownload';
// import Swal from 'sweetalert2';
// import axiosInstance from '../../utils/axiosInstance';

// // API Configuration
// const API_BASE_URL = 'https://tdtlworld.com/hrms-backend/api';
// const EXIT_TYPE_API_URL = `${API_BASE_URL}/exit-type/`;
// const EMPLOYEE_DROPDOWN_API_URL = 'https://tdtlworld.com/hrms-backend/employee-dropdown/';

// // Updated theme with Purple and Orange color palette
// const theme = createTheme({
//   palette: {
//     primary: {
//       main: '#8C257C', // Purple
//     },
//     secondary: {
//       main: '#F58E35', // Orange
//     },
//     success: { main: '#4caf50' },
//     warning: { main: '#ff9800' },
//     error: { main: '#f44336' },
//     background: { default: '#f5f5f9', paper: '#ffffff' },
//   },
//   breakpoints: {
//     values: { xs: 0, sm: 600, md: 900, lg: 1200, xl: 1536 },
//   },
// });

// // Utility function for formatting date
// const formatDate = (dateString) => {
//   if (!dateString) return 'N/A';
//   try {
//     const date = new Date(dateString);
//     if (isNaN(date.getTime())) return 'N/A';
//     const day = String(date.getDate()).padStart(2, '0');
//     const month = String(date.getMonth() + 1).padStart(2, '0');
//     const year = date.getFullYear();
//     return `${day}/${month}/${year}`;
//   } catch (error) {
//     return 'N/A';
//   }
// };

// // Helper function to capitalize strings, returning 'N/A' for empty values
// const capitalize = (s) => {
//   if (typeof s !== 'string' || !s) return 'N/A';
//   return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
// };

// // Helper function for Status Chip
// const getStatusChip = (statusValue) => {
//   const statusText = capitalize(statusValue || 'Pending');
//   if (statusText === 'N/A') return <Chip label="Pending" color="warning" size="small" />;

//   let color = 'default';
//   if (statusText === 'Approved') color = 'success';
//   else if (statusText === 'Pending') color = 'warning';
//   else if (statusText === 'Rejected') color = 'error';
//   return <Chip label={statusText} color={color} size="small" />;
// };

// function EmployeeExitManagement() {
//   const [exitTypes, setExitTypes] = useState([]);
//   const [loadingExitTypes, setLoadingExitTypes] = useState(true);
//   const [exitTypesError, setExitTypesError] = useState(null);
//   const [submittingExitType, setSubmittingExitType] = useState(false);
//   const [submitExitTypeError, setSubmitExitTypeError] = useState(null);
//   const [exitTypeSortConfig, setExitTypeSortConfig] = useState({ key: 'name', direction: 'asc' });

//   const [employeesDropdownData, setEmployeesDropdownData] = useState([]);
//   const [loadingEmployeesDropdown, setLoadingEmployeesDropdown] = useState(true);
//   const [employeesDropdownError, setEmployeesDropdownError] = useState(null);

//   const [employeeExits, setEmployeeExits] = useState([]);
//   const [loadingExits, setLoadingExits] = useState(true);
//   const [exitError, setExitError] = useState(null);

//   const [openAddExitDialog, setOpenAddExitDialog] = useState(false);
//   const [openAddExitTypeDialog, setOpenAddExitTypeDialog] = useState(false);

//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);

//   const [exitTypePage, setExitTypePage] = useState(0);
//   const [exitTypeRowsPerPage, setExitTypeRowsPerPage] = useState(10);

//   const [searchTerm, setSearchTerm] = useState('');
//   const [exitTypeSearchTerm, setExitTypeSearchTerm] = useState('');

//   const [exitSortConfig, setExitSortConfig] = useState({ key: 'exit_date', direction: 'desc' });

//   const initialEmployeeExitState = {
//     employeeId: '', exitDate: '', exitTypeId: '',
//     exitInterview: 'Yes', disableAccount: 'Yes',
//     description: '', file: null, currentEditingId: null,
//   };

//   const [newEmployeeExit, setNewEmployeeExit] = useState(initialEmployeeExitState);
//   const [newExitType, setNewExitType] = useState('');
//   const [editingExitType, setEditingExitType] = useState(null);
//   const isMobile = useMediaQuery(theme.breakpoints.down('md'));

//   const fetchExitTypes = useCallback(async () => {
//     setLoadingExitTypes(true);
//     setExitTypesError(null);
//     try {
//       const response = await axiosInstance.get(EXIT_TYPE_API_URL);
//       const transformedData = response.data.map(item => ({
//         id: item.value, name: item.label, createdAt: formatDate(item.created_at),
//       }));
//       setExitTypes(transformedData);
//     } catch (error) {
//       console.error("Failed to fetch exit types:", error);
//       setExitTypesError("Failed to load exit types.");
//     } finally {
//       setLoadingExitTypes(false);
//     }
//   }, []);

//   const fetchEmployeesDropdown = useCallback(async () => {
//     setLoadingEmployeesDropdown(true);
//     setEmployeesDropdownError(null);
//     try {
//       const response = await axiosInstance.get(EMPLOYEE_DROPDOWN_API_URL);
//       setEmployeesDropdownData(response.data || []);
//     } catch (error) {
//       console.error("Failed to fetch employees dropdown:", error);
//       setEmployeesDropdownError("Failed to load employee list.");
//     } finally {
//       setLoadingEmployeesDropdown(false);
//     }
//   }, []);

//   const fetchEmployeeExits = useCallback(async () => {
//     setLoadingExits(true);
//     try {
//       const response = await axiosInstance.get('/employee-exits/');
//       setEmployeeExits(response.data);
//       setExitError(null);
//     } catch (error) {
//       console.error("Error fetching employee exits:", error);
//       setExitError('Failed to load employee exits');
//     } finally {
//       setLoadingExits(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchExitTypes();
//     fetchEmployeesDropdown();
//     fetchEmployeeExits();
//   }, [fetchExitTypes, fetchEmployeesDropdown, fetchEmployeeExits]);

//   const handleOpenEditDialog = (exitToEdit) => {
//     setNewEmployeeExit({
//       employeeId: exitToEdit.employee_id?.toString() || '',
//       exitDate: exitToEdit.exit_date ? exitToEdit.exit_date.split('T')[0] : '',
//       exitTypeId: exitToEdit.exit_type_id?.toString() || '',
//       exitInterview: capitalize(exitToEdit.exit_interview) === 'N/A' ? 'Yes' : capitalize(exitToEdit.exit_interview),
//       disableAccount: capitalize(exitToEdit.is_inactivate_account) === 'N/A' ? 'Yes' : capitalize(exitToEdit.is_inactivate_account),
//       description: exitToEdit.reason || '',
//       file: null, currentEditingId: exitToEdit.exit_id,
//     });
//     setOpenAddExitDialog(true);
//   };

//   const handleSubmitEmployeeExit = async () => {
//     const isEditMode = !!newEmployeeExit.currentEditingId;
//     if (!isEditMode && !newEmployeeExit.employeeId) { Swal.fire('Validation Error', 'Please select an Employee.', 'warning'); return; }
//     if (!newEmployeeExit.exitDate) { Swal.fire('Validation Error', 'Please select an Exit Date.', 'warning'); return; }
//     if (!newEmployeeExit.exitTypeId) { Swal.fire('Validation Error', 'Please select an Exit Type.', 'warning'); return; }

//     const selectedExitType = exitTypes.find(type => type.id.toString() === newEmployeeExit.exitTypeId.toString());
//     const exitTypeNameForPayload = selectedExitType ? selectedExitType.name : '';

//     if (isEditMode) {
//       const updatePayload = {
//         exit_date: newEmployeeExit.exitDate,
//         exit_type_id: parseInt(newEmployeeExit.exitTypeId),
//         exit_type_name: exitTypeNameForPayload,
//         reason: newEmployeeExit.description,
//         accountability_to: "0",
//         exit_interview: newEmployeeExit.exitInterview.toLowerCase(),
//         is_inactivate_account: newEmployeeExit.disableAccount.toLowerCase(),
//       };
//       try {
//         await axiosInstance.patch(`/employee-exits/${newEmployeeExit.currentEditingId}/`, updatePayload);
//         Swal.fire('Updated!', 'Employee Exit updated successfully.', 'success');
//         fetchEmployeeExits(); handleCloseEmployeeExitDialog();
//       } catch (error) {
//         console.error('Error updating employee exit:', error.response?.data || error.message);
//         Swal.fire('Error!', `Failed to update employee exit. ${error.response?.data?.detail || error.message || ''}`, 'error');
//       }
//     } else {
//       const createPayload = {
//         employee_id: parseInt(newEmployeeExit.employeeId), exit_date: newEmployeeExit.exitDate,
//         exit_type_id: parseInt(newEmployeeExit.exitTypeId), exit_type_name: exitTypeNameForPayload,
//         sub_exit_type_id: null, exit_interview: newEmployeeExit.exitInterview.toLowerCase(),
//         is_inactivate_account: newEmployeeExit.disableAccount.toLowerCase(),
//         reason: newEmployeeExit.description, accountability_to: "0", added_by: 2
//       };
//       try {
//         await axiosInstance.post('/employee-exits/', createPayload);
//         Swal.fire('Added!', 'Employee Exit added successfully.', 'success');
//         fetchEmployeeExits(); handleCloseEmployeeExitDialog();
//       } catch (error) {
//         console.error('Error adding employee exit:', error.response?.data || error.message);
//         Swal.fire('Error!', `Failed to add employee exit. ${error.response?.data?.detail || error.message || ''}`, 'error');
//       }
//     }
//   };

//   const handleDeleteExit = (exitId) => {
//     Swal.fire({
//       title: 'Are you sure?',
//       text: "You won't be able to revert this!",
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#8C257C',
//       cancelButtonColor: '#F58E35',
//       confirmButtonText: 'Yes, delete it!'
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         try {
//           await axiosInstance.delete(`/employee-exits/${exitId}/`);
//           Swal.fire('Deleted!', 'Employee exit has been deleted.', 'success');
//           fetchEmployeeExits();
//         } catch (error) {
//           console.error("Failed to delete exit:", error);
//           Swal.fire('Error!', 'Failed to delete employee exit.', 'error');
//         }
//       }
//     });
//   };

//   const handleSubmitExitType = async () => {
//     if (!newExitType.trim()) { setSubmitExitTypeError('Exit Type name is required.'); return; }
//     setSubmittingExitType(true); setSubmitExitTypeError(null);
//     try {
//       await axiosInstance.post(EXIT_TYPE_API_URL, { category_name: newExitType.trim() });
//       Swal.fire('Success!', 'Exit type added successfully!', 'success');
//       setNewExitType('');
//       fetchExitTypes();
//     } catch (error) {
//       console.error("Failed to submit exit type:", error.response?.data || error.message);
//       setSubmitExitTypeError(error.response?.data?.detail || error.response?.data?.category_name?.[0] || error.message || "Failed to add exit type.");
//     } finally { setSubmittingExitType(false); }
//   };

//   const handleEditExitType = (type) => { setNewExitType(type.name); setEditingExitType(type); };

//   const handleUpdateExitType = async () => {
//     if (!newExitType.trim()) { setSubmitExitTypeError("Exit Type name is required."); return; }
//     setSubmittingExitType(true); setSubmitExitTypeError(null);
//     try {
//       await axiosInstance.patch(`${EXIT_TYPE_API_URL}${editingExitType.id}/`, { category_name: newExitType.trim() });
//       Swal.fire('Updated!', 'Exit type updated successfully!', 'success');
//       setNewExitType(""); setEditingExitType(null); fetchExitTypes();
//     } catch (error) {
//       console.error("Failed to update exit type:", error.response?.data || error.message);
//       setSubmitExitTypeError(error.response?.data?.detail || error.response?.data?.category_name?.[0] || error.message || "Failed to update exit type.");
//     } finally { setSubmittingExitType(false); }
//   };

//   const handleDeleteExitType = (id) => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "This action cannot be undone.",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: '#8C257C',
//       cancelButtonColor: '#F58E35',
//       confirmButtonText: 'Yes, delete it!'
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         try {
//           await axiosInstance.delete(`${EXIT_TYPE_API_URL}${id}/`);
//           Swal.fire("Deleted!", "Exit type has been deleted.", "success");
//           fetchExitTypes();
//         } catch (error) {
//           console.error("Failed to delete exit type:", error.response?.data || error.message);
//           Swal.fire("Error!", "Failed to delete exit type.", "error");
//         }
//       }
//     });
//   };

//   const handleCloseEmployeeExitDialog = () => { setOpenAddExitDialog(false); setNewEmployeeExit(initialEmployeeExitState); };
//   const handleCloseExitTypeDialog = () => { setOpenAddExitTypeDialog(false); setNewExitType(''); setEditingExitType(null); setSubmitExitTypeError(null); };
//   const handleResetEmployeeExitForm = () => setNewEmployeeExit(initialEmployeeExitState);

//   const handleFileUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       if (['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
//         if (file.size <= 2 * 1024 * 1024) { setNewEmployeeExit(prev => ({ ...prev, file: file })); }
//         else { Swal.fire('File Too Large', 'File size exceeds 2MB limit.', 'warning'); e.target.value = null; }
//       } else { Swal.fire('Invalid File Type', 'Please upload only .gif, .png, .jpg, or .jpeg files', 'warning'); e.target.value = null; }
//     }
//   };

//   const sortedAndFilteredEmployeeExits = useMemo(() => {
//     let items = employeeExits.filter(exit =>
//       (exit.employee_name && exit.employee_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
//       (exit.exit_type_name && exit.exit_type_name.toLowerCase().includes(searchTerm.toLowerCase()))
//     );

//     if (exitSortConfig.key) {
//       items.sort((a, b) => {
//         const key = exitSortConfig.key;
//         const order = exitSortConfig.direction === 'asc' ? 1 : -1;
//         const valA = a[key];
//         const valB = b[key];

//         if (valA == null) return 1; if (valB == null) return -1;

//         if (key === 'exit_date') {
//           const dateA = new Date(valA).getTime(); const dateB = new Date(valB).getTime();
//           if (isNaN(dateA)) return 1; if (isNaN(dateB)) return -1;
//           return (dateA - dateB) * order;
//         }

//         return String(valA).localeCompare(String(valB)) * order;
//       });
//     }
//     return items;
//   }, [employeeExits, searchTerm, exitSortConfig]);

//   const handleExitSort = (key) => {
//     let direction = 'asc';
//     if (exitSortConfig.key === key && exitSortConfig.direction === 'asc') { direction = 'desc'; }
//     setExitSortConfig({ key, direction });
//   };

//   const sortedAndFilteredExitTypes = useMemo(() => {
//     let items = [...exitTypes];
//     if (exitTypeSearchTerm) {
//       items = items.filter(type => type.name && type.name.toLowerCase().includes(exitTypeSearchTerm.toLowerCase()));
//     }
//     if (exitTypeSortConfig.key) {
//       items.sort((a, b) => {
//         const valA = a[exitTypeSortConfig.key] || ''; const valB = b[exitTypeSortConfig.key] || '';
//         if (valA < valB) return exitTypeSortConfig.direction === 'asc' ? -1 : 1;
//         if (valA > valB) return exitTypeSortConfig.direction === 'asc' ? 1 : -1;
//         return 0;
//       });
//     }
//     return items;
//   }, [exitTypes, exitTypeSearchTerm, exitTypeSortConfig]);

//   const paginatedEmployeeExits = sortedAndFilteredEmployeeExits.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
//   const totalPages = Math.ceil(sortedAndFilteredEmployeeExits.length / rowsPerPage);
//   const paginatedExitTypes = sortedAndFilteredExitTypes.slice(exitTypePage * exitTypeRowsPerPage, exitTypePage * exitTypeRowsPerPage + exitTypeRowsPerPage);
//   const totalExitTypePages = Math.ceil(sortedAndFilteredExitTypes.length / exitTypeRowsPerPage);

//   const handleExitTypeSort = (key) => {
//     let direction = 'asc';
//     if (exitTypeSortConfig.key === key && exitTypeSortConfig.direction === 'asc') { direction = 'desc'; }
//     setExitTypeSortConfig({ key, direction });
//   };
  
//   const headerCellStyle = {
//     bgcolor: 'primary.main',
//     color: 'common.white',
//     fontWeight: 'bold',
//   };
  
//   const sortLabelStyle = {
//     color: 'inherit !important',
//     '& .MuiTableSortLabel-icon': {
//       color: 'inherit !important',
//     },
//     '&.Mui-active': {
//       color: 'inherit !important',
//     },
//   };

//   const ExitCard = ({ exit, index }) => (
//     <Card sx={{ mb: 2 }} elevation={2}>
//       <Box sx={{ p: 2, bgcolor: 'primary.main', color: 'common.white' }}>
//         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//           <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
//             {exit.employee_name || 'N/A'}
//           </Typography>
//           <Chip label={`Sr. No: ${page * rowsPerPage + index + 1}`} size="small" sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'common.white' }} />
//         </Box>
//       </Box>
//       <CardContent>
//         <Stack spacing={1.5}>
//           <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
//             <Typography variant="body2" color="text.secondary">Exit Type</Typography>
//             <Typography variant="body2" sx={{ fontWeight: 500 }}>{exit.exit_type_name || 'N/A'}</Typography>
//           </Box>
//           <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
//             <Typography variant="body2" color="text.secondary">Exit Date</Typography>
//             <Typography variant="body2" sx={{ fontWeight: 500 }}>{formatDate(exit.exit_date)}</Typography>
//           </Box>
//           <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
//             <Typography variant="body2" color="text.secondary">Exit Interview</Typography>
//             <Typography variant="body2" sx={{ fontWeight: 500 }}>{capitalize(exit.exit_interview)}</Typography>
//           </Box>
//           <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
//             <Typography variant="body2" color="text.secondary">Disable Account</Typography>
//             <Typography variant="body2" sx={{ fontWeight: 500 }}>{capitalize(exit.is_inactivate_account)}</Typography>
//           </Box>
//           <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//             <Typography variant="body2" color="text.secondary">Status</Typography>
//             {getStatusChip(exit.status)}
//           </Box>
//         </Stack>
//       </CardContent>
//       <CardActions sx={{ justifyContent: 'flex-end', p: 2, pt: 0 }}>
//         <Button startIcon={<EditIcon />} onClick={() => handleOpenEditDialog(exit)} color="primary" variant="text">Edit</Button>
//         <Button startIcon={<DeleteIcon />} onClick={() => handleDeleteExit(exit.exit_id)} color="secondary" variant="text">Delete</Button>
//       </CardActions>
//     </Card>
//   );

//   return (
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
//       <Box sx={{ p: { xs: 1, sm: 2, md: 3 } }}>
//         <Paper elevation={3} sx={{ p: { xs: 1.5, sm: 2, md: 3 }, borderRadius: 2 }}>
//           <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', sm: 'center' }, mb: 3, gap: 2, }}>
//             <Typography variant="h6" sx={{ fontWeight: 'bold' }}>List All Employee Exit</Typography>
//             <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} sx={{ width: { xs: '100%', sm: 'auto' } }}>
//               <Button variant="outlined" color="secondary" onClick={() => setOpenAddExitTypeDialog(true)}>+ Exit Type</Button>
//               <Button variant="outlined" startIcon={<FileDownloadIcon />} onClick={() => { /* handleExport */ }}>Export</Button>
//               <Button variant="contained" startIcon={<AddIcon />} onClick={() => setOpenAddExitDialog(true)}>Add New Exit</Button>
//             </Stack>
//           </Box>
          
//           <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
//             <TextField
//               size="small"
//               placeholder="Search exits..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               sx={{ width: { xs: '100%', sm: 300 } }}
//               InputProps={{
//                 startAdornment: (
//                   <InputAdornment position="start">
//                     <SearchIcon />
//                   </InputAdornment>
//                 ),
//               }}
//             />
//           </Box>

//           {isMobile ? (
//             <Box sx={{ mt: 3 }}>
//               {loadingExits ? <Box sx={{ display: 'flex', justifyContent: 'center' }}><CircularProgress /></Box> : paginatedEmployeeExits.length > 0 ? (
//                 paginatedEmployeeExits.map((exit, index) => <ExitCard key={exit.exit_id} exit={exit} index={index} />)
//               ) : (<Typography align="center" sx={{ p: 4, color: 'text.secondary' }}>No employee exits found.</Typography>)}
//             </Box>
//           ) : (
//             <TableContainer>
//               <Table>
//                 <TableHead>
//                   <TableRow>
//                     <TableCell sx={headerCellStyle}>SR. NO.</TableCell>
//                     <TableCell sx={headerCellStyle}>
//                       <TableSortLabel sx={sortLabelStyle} active={exitSortConfig.key === 'employee_name'} direction={exitSortConfig.key === 'employee_name' ? exitSortConfig.direction : 'asc'} onClick={() => handleExitSort('employee_name')}>
//                         EMPLOYEE
//                       </TableSortLabel>
//                     </TableCell>
//                     <TableCell sx={headerCellStyle}>
//                       <TableSortLabel sx={sortLabelStyle} active={exitSortConfig.key === 'exit_type_name'} direction={exitSortConfig.key === 'exit_type_name' ? exitSortConfig.direction : 'asc'} onClick={() => handleExitSort('exit_type_name')}>EXIT TYPE</TableSortLabel>
//                     </TableCell>
//                     <TableCell sx={headerCellStyle}>
//                       <TableSortLabel sx={sortLabelStyle} active={exitSortConfig.key === 'exit_date'} direction={exitSortConfig.key === 'exit_date' ? exitSortConfig.direction : 'asc'} onClick={() => handleExitSort('exit_date')}>
//                         EXIT DATE
//                       </TableSortLabel>
//                     </TableCell>
//                     <TableCell sx={headerCellStyle}>EXIT INTERVIEW</TableCell>
//                     <TableCell sx={headerCellStyle}>DISABLE ACCOUNT</TableCell>
//                     <TableCell sx={headerCellStyle}>STATUS</TableCell>
//                     <TableCell sx={headerCellStyle} align="right">ACTIONS</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {loadingExits ? (<TableRow><TableCell colSpan={8} align="center"><CircularProgress /></TableCell></TableRow>
//                   ) : exitError ? (<TableRow><TableCell colSpan={8} align="center" sx={{ color: 'error.main' }}>{exitError}</TableCell></TableRow>
//                   ) : paginatedEmployeeExits.length > 0 ? (
//                     paginatedEmployeeExits.map((exit, index) => (
//                       <TableRow key={exit.exit_id} hover>
//                         <TableCell>{page * rowsPerPage + index + 1}</TableCell>
//                         <TableCell>{exit.employee_name || 'N/A'}</TableCell>
//                         <TableCell>{exit.exit_type_name || 'N/A'}</TableCell>
//                         <TableCell>{formatDate(exit.exit_date)}</TableCell>
//                         <TableCell>{capitalize(exit.exit_interview)}</TableCell>
//                         <TableCell>{capitalize(exit.is_inactivate_account)}</TableCell>
//                         <TableCell>{getStatusChip(exit.status)}</TableCell>
//                         <TableCell align="right">
//                           <Tooltip title="Edit"><IconButton size="small" onClick={() => handleOpenEditDialog(exit)} color="primary"><EditIcon /></IconButton></Tooltip>
//                           <Tooltip title="Delete"><IconButton size="small" onClick={() => handleDeleteExit(exit.exit_id)} color="secondary"><DeleteIcon /></IconButton></Tooltip>
//                         </TableCell>
//                       </TableRow>
//                     ))
//                   ) : (<TableRow><TableCell colSpan={8} align="center">No employee exits found.</TableCell></TableRow>)}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           )}

//           {/* Bottom Section: Total Rows on Left, Pagination on Right */}
//           <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: 'center', mt: 2, p: 1, gap: 2 }}>
//             <Stack direction="row" spacing={2} alignItems="center">
//               <FormControl size="small" sx={{ minWidth: 70 }}>
//                 <InputLabel id="rows-per-page-label">Rows</InputLabel>
//                 <Select
//                   labelId="rows-per-page-label"
//                   label="Rows"
//                   value={rowsPerPage}
//                   onChange={(e) => { setRowsPerPage(parseInt(e.target.value, 10)); setPage(0); }}
//                 >
//                   <MenuItem value={5}>5</MenuItem>
//                   <MenuItem value={10}>10</MenuItem>
//                   <MenuItem value={25}>25</MenuItem>
//                 </Select>
//               </FormControl>
//               <Typography variant="body2" color="text.secondary">
//                 Showing {paginatedEmployeeExits.length > 0 ? page * rowsPerPage + 1 : 0} to {Math.min((page + 1) * rowsPerPage, sortedAndFilteredEmployeeExits.length)} of {sortedAndFilteredEmployeeExits.length} entries
//               </Typography>
//             </Stack>
//             <Box sx={{ display: 'flex', gap: 1 }}>
//               <Button variant="outlined" disabled={page === 0} onClick={() => setPage(page - 1)}>Previous</Button>
//               <Button variant="outlined" disabled={page + 1 >= totalPages} onClick={() => setPage(page + 1)}>Next</Button>
//             </Box>
//           </Box>
//         </Paper>

//         {/* DIALOG for Adding/Editing Employee Exit */}
//         <Dialog open={openAddExitDialog} onClose={handleCloseEmployeeExitDialog} maxWidth="md" fullWidth>
//           <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//             <Typography variant="h6">{newEmployeeExit.currentEditingId ? 'Edit Employee Exit' : 'Add New Employee Exit'}</Typography>
//             <Button onClick={handleCloseEmployeeExitDialog}>Close</Button>
//           </DialogTitle>
//           <Divider />
//           <DialogContent>
//             <Grid container spacing={3}>
//               <Grid item xs={12} md={8}>
//                 <Grid container spacing={2}>
//                   <Grid item xs={12} md={6}>
//                     <FormControl fullWidth required={!newEmployeeExit.currentEditingId} disabled={!!newEmployeeExit.currentEditingId || loadingEmployeesDropdown}>
//                       <InputLabel id="employee-label">Employee</InputLabel>
//                     <Select labelId="employee-label" label="Employee" value={newEmployeeExit.employeeId} onChange={(e) => setNewEmployeeExit(prev => ({ ...prev, employeeId: e.target.value }))}>
//   <MenuItem value=""><em>{loadingEmployeesDropdown ? "Loading..." : employeesDropdownError || "Select Employee"}</em></MenuItem>
//   {!loadingEmployeesDropdown && !employeesDropdownError && employeesDropdownData.map((emp) => (
//     emp.value != null && <MenuItem key={emp.value} value={emp.value.toString()}>{emp.label}</MenuItem>
//   ))}
// </Select>
//                     </FormControl>
//                   </Grid>
//                   <Grid item xs={12} md={6}>
//                     <TextField label="Exit Date" fullWidth required type="date" InputLabelProps={{ shrink: true }} value={newEmployeeExit.exitDate} onChange={(e) => setNewEmployeeExit(prev => ({ ...prev, exitDate: e.target.value }))} />
//                   </Grid>
//                   <Grid item xs={12} md={4}>
//                     <FormControl fullWidth required disabled={loadingExitTypes}>
//                       <InputLabel id="exit-type-label">Exit Type</InputLabel>
//                      <Select labelId="exit-type-label" label="Exit Type" value={newEmployeeExit.exitTypeId} onChange={(e) => setNewEmployeeExit(prev => ({ ...prev, exitTypeId: e.target.value }))}>
//                         <MenuItem value=""><em>{loadingExitTypes ? "Loading..." : exitTypesError || "Select Exit Type"}</em></MenuItem>
//                         {!loadingExitTypes && !exitTypesError && exitTypes.map((type) => (
//                           type.id != null && <MenuItem key={type.id} value={type.id.toString()}>{type.name}</MenuItem>
//                         ))}
//                       </Select>
//                     </FormControl>
//                   </Grid>
//                   <Grid item xs={12} md={4}>
//                     <FormControl fullWidth required>
//                       <InputLabel id="exit-interview-label">Exit Interview</InputLabel>
//                       <Select labelId="exit-interview-label" label="Exit Interview" value={newEmployeeExit.exitInterview} onChange={(e) => setNewEmployeeExit(prev => ({ ...prev, exitInterview: e.target.value }))}>
//                         <MenuItem value="Yes">Yes</MenuItem><MenuItem value="No">No</MenuItem>
//                       </Select>
//                     </FormControl>
//                   </Grid>
//                   <Grid item xs={12} md={4}>
//                     <FormControl fullWidth required>
//                       <InputLabel id="disable-account-label">Disable Account</InputLabel>
//                       <Select labelId="disable-account-label" label="Disable Account" value={newEmployeeExit.disableAccount} onChange={(e) => setNewEmployeeExit(prev => ({ ...prev, disableAccount: e.target.value }))}>
//                         <MenuItem value="Yes">Yes</MenuItem><MenuItem value="No">No</MenuItem>
//                       </Select>
//                     </FormControl>
//                   </Grid>
//                   <Grid item xs={12}>
//                     <TextField label="Description / Reason" fullWidth multiline rows={3} placeholder="Enter description or reason for exit..." value={newEmployeeExit.description} onChange={(e) => setNewEmployeeExit(prev => ({ ...prev, description: e.target.value }))} />
//                   </Grid>
//                 </Grid>
//               </Grid>
//               <Grid item xs={12} md={4}>
//                 <Paper variant="outlined" sx={{ p: 2, height: '100%' }}>
//                   <Typography variant="subtitle1" gutterBottom>Exit Contract / Attachment</Typography>
//                   <TextField fullWidth disabled size="small" placeholder="No file chosen" value={newEmployeeExit.file ? newEmployeeExit.file.name : ''} sx={{ mb: 1 }} />
//                   <Button variant="outlined" component="label" fullWidth>Browse File<input type="file" hidden onChange={handleFileUpload} accept=".jpg,.jpeg,.png,.gif" /></Button>
//                   <Typography variant="caption" color="textSecondary" display="block" mt={1}>Allowed: GIF, PNG, JPG, JPEG. Max 2MB.</Typography>
//                 </Paper>
//               </Grid>
//             </Grid>
//           </DialogContent>
//           <Divider />
//           <DialogActions sx={{ p: 2, justifyContent: 'flex-end' }}>
//             <Button onClick={handleResetEmployeeExitForm} color="secondary" variant="outlined">Reset</Button>
//             <Button variant="contained" onClick={handleSubmitEmployeeExit}>{newEmployeeExit.currentEditingId ? 'Update' : 'Save'}</Button>
//           </DialogActions>
//         </Dialog>

//         {/* DIALOG for Managing Exit Types */}
//         <Dialog open={openAddExitTypeDialog} onClose={handleCloseExitTypeDialog} maxWidth="lg" fullWidth>
//           <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>Manage Exit Types<Button onClick={handleCloseExitTypeDialog}>Close</Button></DialogTitle>
//           <DialogContent dividers sx={{ p: 0 }}>
//             <Grid container>
//               <Grid item xs={12} md={4} sx={{ borderRight: { md: '1px solid #eee' } }}>
//                 <Box sx={{ p: 3 }}>
//                   <Typography variant="h6" sx={{ mb: 2 }}>{editingExitType ? 'Edit Exit Type' : 'Add New Exit Type'}</Typography>
//                   <FormControl fullWidth sx={{ mb: 2 }}>
//                     <TextField required label="Exit Type Name" placeholder="Enter exit type name" value={newExitType} onChange={(e) => setNewExitType(e.target.value)} disabled={submittingExitType} error={!!submitExitTypeError} helperText={submitExitTypeError} />
//                   </FormControl>
//                   <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
//                     <Button variant="contained" onClick={editingExitType ? handleUpdateExitType : handleSubmitExitType} disabled={submittingExitType || !newExitType.trim()}>
//                       {submittingExitType ? <CircularProgress size={24} color="inherit" /> : editingExitType ? "Update" : "Save"}
//                     </Button>
//                   </Box>
//                 </Box>
//               </Grid>
//               <Grid item xs={12} md={8}>
//                 <Box sx={{ p: 3 }}>
//                   <Typography variant="h6" sx={{ mb: 2 }}>List All Exit Types</Typography>
//                   {loadingExitTypes ? (<Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}><CircularProgress /></Box>
//                   ) : exitTypesError ? (<Typography color="error" sx={{ p: 2 }}>Error: {exitTypesError} <Button onClick={fetchExitTypes} size="small">Retry</Button></Typography>
//                   ) : (
//                     <>
//                       <TableContainer component={Paper} variant="outlined">
//                         <Table size="small">
//                           <TableHead>
//                             <TableRow sx={{ bgcolor: 'primary.light' }}>
//                               <TableCell sx={{ color: 'primary.contrastText' }}>
//                                 <TableSortLabel active={exitTypeSortConfig.key === 'name'} direction={exitTypeSortConfig.key === 'name' ? exitTypeSortConfig.direction : 'asc'} onClick={() => handleExitTypeSort('name')}>EXIT TYPE</TableSortLabel>
//                               </TableCell>
//                               <TableCell sx={{ color: 'primary.contrastText' }}>
//                                 <TableSortLabel active={exitTypeSortConfig.key === 'createdAt'} direction={exitTypeSortConfig.key === 'createdAt' ? exitTypeSortConfig.direction : 'asc'} onClick={() => handleExitTypeSort('createdAt')}>CREATED AT</TableSortLabel>
//                               </TableCell>
//                               <TableCell sx={{ color: 'primary.contrastText' }}>Actions</TableCell>
//                             </TableRow>
//                           </TableHead>
//                           <TableBody>
//                             {paginatedExitTypes.length > 0 ? (
//                               paginatedExitTypes.map((type) => (
//                                 <TableRow key={type.id} hover>
//                                   <TableCell>{type.name || 'N/A'}</TableCell>
//                                   <TableCell>{type.createdAt || 'N/A'}</TableCell>
//                                   <TableCell>
//                                     <IconButton size="small" onClick={() => handleEditExitType(type)} color="primary"><EditIcon fontSize="small" /></IconButton>
//                                     <IconButton size="small" color="secondary" onClick={() => handleDeleteExitType(type.id)}><DeleteIcon fontSize="small" /></IconButton>
//                                   </TableCell>
//                                 </TableRow>
//                               ))
//                             ) : (<TableRow><TableCell colSpan={3} align="center">No exit types found.</TableCell></TableRow>)}
//                           </TableBody>
//                         </Table>
//                       </TableContainer>
//                       {sortedAndFilteredExitTypes.length > 0 && (
//                         <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', mt: 2, gap: 1 }}>
//                           <Button size="small" disabled={exitTypePage === 0} onClick={() => setExitTypePage(p => p - 1)}>Previous</Button>
//                           <Typography variant="body2">Page {exitTypePage + 1} of {totalExitTypePages}</Typography>
//                           <Button size="small" disabled={exitTypePage >= totalExitTypePages - 1} onClick={() => setExitTypePage(p => p + 1)}>Next</Button>
//                         </Box>
//                       )}
//                     </>
//                   )}
//                 </Box>
//               </Grid>
//             </Grid>
//           </DialogContent>
//         </Dialog>
//       </Box>
//     </ThemeProvider>
//   );
// };

// export default EmployeeExitManagement;






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
//   CssBaseline,
//   InputAdornment,
//   CircularProgress,
//   TableSortLabel,
//   useMediaQuery,
//   Tooltip,
//   Skeleton,
//   TablePagination,
// } from '@mui/material';
// import AddIcon from '@mui/icons-material/Add';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
// import SearchIcon from '@mui/icons-material/Search';
// import Swal from 'sweetalert2';
// import axiosInstance from '../../utils/axiosInstance';

// // API Configuration
// const API_BASE_URL = 'https://tdtlworld.com/hrms-backend';
// const EXIT_API_URL = `${API_BASE_URL}/employee-exits/`;
// const EXIT_TYPE_API_URL = `${API_BASE_URL}/api/exit-type/`;
// const EMPLOYEE_DROPDOWN_API_URL = 'https://tdtlworld.com/hrms-backend/employee-dropdown/';

// // 🎨 Color & Theme
// const theme = createTheme({
//   palette: {
//     primary: {
//       main: '#8C257C',
//       dark: '#6d1d60',
//     },
//     secondary: {
//       main: '#F58E35',
//     },
//     background: {
//       default: '#f5f5f9',
//     },
//     grey: {
//       500: '#757575',
//     }
//   },
//   typography: {
//     h5: {
//       fontWeight: 'bold',
//       color: '#8C257C',
//     },
//     body2: {
//       fontSize: '0.95rem',
//     },
//   },
//   components: {
//     MuiButton: {
//       styleOverrides: {
//         containedPrimary: {
//           color: '#FFFFFF',
//           '&:hover': {
//             backgroundColor: '#6d1d60',
//           },
//         },
//       },
//     },
//     MuiTableHead: {
//       styleOverrides: {
//         root: {
//           backgroundColor: '#8C257C',
//         },
//       },
//     },
//     MuiTableCell: {
//       styleOverrides: {
//         head: {
//           color: '#FFFFFF',
//           fontWeight: 'bold',
//         },
//       },
//     },
//   },
// });

// // Utility function for formatting date
// const formatDate = (dateString) => {
//   if (!dateString) return 'N/A';
//   try {
//     const date = new Date(dateString);
//     const day = String(date.getDate()).padStart(2, '0');
//     const month = String(date.getMonth() + 1).padStart(2, '0');
//     const year = date.getFullYear();
//     return `${day}/${month}/${year}`;
//   } catch (error) {
//     return 'N/A';
//   }
// };

// function EmployeeExitManagement() {
//   const [employeeExits, setEmployeeExits] = useState([]);
//   const [exitTypes, setExitTypes] = useState([]);
//   const [employeesDropdownData, setEmployeesDropdownData] = useState([]);
  
//   const [loading, setLoading] = useState(true);
//   const [isSubmitting, setIsSubmitting] = useState(false);
  
//   const [searchTerm, setSearchTerm] = useState('');
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
  
//   const [openDialog, setOpenDialog] = useState(false);
//   const [editingExit, setEditingExit] = useState(null);

//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

//   const initialFormState = {
//     employeeId: '',
//     exitDate: '',
//     exitTypeId: '',
//     description: '',
//     file: null,
//   };
//   const [formState, setFormState] = useState(initialFormState);

//   // Data Fetching
//   const fetchAllData = useCallback(async () => {
//     setLoading(true);
//     try {
//       const [exitsRes, typesRes, employeesRes] = await Promise.all([
//         axiosInstance.get(EXIT_API_URL),
//         axiosInstance.get(EXIT_TYPE_API_URL),
//         axiosInstance.get(EMPLOYEE_DROPDOWN_API_URL),
//       ]);
//       setEmployeeExits(exitsRes.data);
//       setExitTypes(typesRes.data.map(item => ({ id: item.value, name: item.label })));
//       setEmployeesDropdownData(employeesRes.data);
//     } catch (error) {
//       console.error("Failed to fetch data:", error);
//       Swal.fire({
//         icon: 'error',
//         title: 'Failed to Load Data',
//         text: 'Could not fetch necessary data from the server.',
//         timer: 3000,
//         showConfirmButton: false,
//       });
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchAllData();
//   }, [fetchAllData]);

//   const handleOpenDialog = (exit = null) => {
//     setEditingExit(exit);
//     if (exit) {
//       setFormState({
//         employeeId: exit.employee_id?.toString() || '',
//         exitDate: exit.exit_date ? exit.exit_date.split('T')[0] : '',
//         exitTypeId: exit.exit_type_id?.toString() || '',
//         description: exit.reason || '',
//         file: null,
//       });
//     } else {
//       setFormState(initialFormState);
//     }
//     setOpenDialog(true);
//   };

//   const handleCloseDialog = () => {
//     setOpenDialog(false);
//     setEditingExit(null);
//     setFormState(initialFormState);
//   };

//   const handleFormChange = (event) => {
//     const { name, value } = event.target;
//     setFormState(prev => ({ ...prev, [name]: value }));
//   };

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     if (file && file.type === "application/pdf") {
//       setFormState(prev => ({ ...prev, file }));
//     } else if (file) {
//       Swal.fire({
//         icon: 'warning',
//         title: 'Invalid File Type',
//         text: 'Please upload only PDF files.',
//         timer: 3000,
//         showConfirmButton: false,
//       });
//     }
//   };

//   const handleSubmit = async () => {
//     if (!formState.employeeId || !formState.exitDate || !formState.exitTypeId) {
//       Swal.fire({
//         icon: 'warning',
//         title: 'Missing Fields',
//         text: 'Please fill in all required fields.',
//         timer: 3000,
//         showConfirmButton: false,
//       });
//       return;
//     }
//     setIsSubmitting(true);

//     const payload = {
//       employee_id: parseInt(formState.employeeId),
//       exit_date: formState.exitDate,
//       exit_type_id: parseInt(formState.exitTypeId),
//       reason: formState.description,
//       // Default values from original code
//       exit_interview: 'yes',
//       is_inactivate_account: 'yes',
//       accountability_to: "0",
//       added_by: 2,
//     };

//     try {
//       if (editingExit) {
//         await axiosInstance.patch(`${EXIT_API_URL}${editingExit.exit_id}/`, payload);
//       } else {
//         await axiosInstance.post(EXIT_API_URL, payload);
//       }
//       Swal.fire({
//         icon: 'success',
//         title: `Employee Exit ${editingExit ? 'Updated' : 'Added'}!`,
//         text: `The record has been saved successfully.`,
//         timer: 3000,
//         showConfirmButton: false,
//       });
//       handleCloseDialog();
//       fetchAllData();
//     } catch (error) {
//       console.error("Failed to submit form:", error);
//       Swal.fire({
//         icon: 'error',
//         title: 'Submission Failed',
//         text: error.response?.data?.detail || 'An unexpected error occurred.',
//         timer: 3000,
//         showConfirmButton: false,
//       });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleDelete = (exitId) => {
//     Swal.fire({
//       title: 'Are you sure?',
//       text: "You won't be able to revert this!",
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#8C257C',
//       cancelButtonColor: '#757575',
//       confirmButtonText: 'Yes, delete it!'
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         try {
//           await axiosInstance.delete(`${EXIT_API_URL}${exitId}/`);
//           Swal.fire({
//             icon: 'success',
//             title: 'Deleted!',
//             text: 'The employee exit record has been deleted.',
//             timer: 3000,
//             showConfirmButton: false,
//           });
//           fetchAllData();
//         } catch (error) {
//           console.error("Failed to delete exit:", error);
//           Swal.fire({
//             icon: 'error',
//             title: 'Deletion Failed',
//             text: 'Could not delete the record.',
//             timer: 3000,
//             showConfirmButton: false,
//           });
//         }
//       }
//     });
//   };

//   const filteredExits = useMemo(() =>
//     employeeExits.filter(exit =>
//       (exit.employee_name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
//       (exit.exit_type_name?.toLowerCase() || '').includes(searchTerm.toLowerCase())
//     ),
//     [employeeExits, searchTerm]
//   );
  
//   const paginatedExits = filteredExits.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

//   const renderSkeleton = () => {
//     return Array.from(new Array(rowsPerPage)).map((_, index) => (
//       <TableRow key={index}>
//         <TableCell><Skeleton variant="text" /></TableCell>
//         <TableCell><Skeleton variant="text" /></TableCell>
//         <TableCell><Skeleton variant="text" /></TableCell>
//         <TableCell><Skeleton variant="text" /></TableCell>
//         <TableCell align="center"><Skeleton variant="rectangular" width={100} height={30} /></TableCell>
//       </TableRow>
//     ));
//   };

//   return (
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
//       <Box component={Paper} p={3}>
//         <Typography variant="h4" sx={{ color: "#8C257C ", fontWeight: "bold", mb: 5 }}>
//           Employee Exit 
//         </Typography>

//         <Box
//           sx={{
//             display: 'flex',
//             flexDirection: isMobile ? 'column' : 'row',
//             justifyContent: 'space-between',
//             alignItems: 'center',
//             gap: 2,
//             mb: 2,
//           }}
//         >
//           <Button
//             variant="contained"
//             startIcon={<AddIcon />}
//             onClick={() => handleOpenDialog()}
//             sx={{ width: isMobile ? '100%' : 'auto' }}
//           >
//             Add New
//           </Button>
//           <TextField
//             size="small"
//             placeholder="Search..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             sx={{ width: isMobile ? '100%' : 'auto' }}
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <SearchIcon />
//                 </InputAdornment>
//               ),
//             }}
//           />
//         </Box>

//         <TableContainer>
//           <Table sx={{ minWidth: '100%', whiteSpace: 'nowrap' }}>
//             <TableHead>
//               <TableRow>
//                 <TableCell>EMPLOYEE</TableCell>
//                 <TableCell>EXIT TYPE</TableCell>
//                 <TableCell>EXIT DATE</TableCell>
//                 <TableCell>REASON</TableCell>
//                 <TableCell align="center">ACTIONS</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {loading ? (
//                 renderSkeleton()
//               ) : paginatedExits.length > 0 ? (
//                 paginatedExits.map((exit) => (
//                   <TableRow key={exit.exit_id} hover>
//                     <TableCell sx={{ fontSize: '0.95rem' }}>{exit.employee_name || 'N/A'}</TableCell>
//                     <TableCell sx={{ fontSize: '0.95rem' }}>{exit.exit_type_name || 'N/A'}</TableCell>
//                     <TableCell sx={{ fontSize: '0.95rem' }}>{formatDate(exit.exit_date)}</TableCell>
//                     <TableCell sx={{ fontSize: '0.95rem' }}>{exit.reason || 'N/A'}</TableCell>
//                     <TableCell align="center">
//                       <Box display="flex" justifyContent="center" gap={0.5}>
//                         <Tooltip title="Edit">
//                           <IconButton size="small" onClick={() => handleOpenDialog(exit)}>
//                             <EditIcon color="primary" />
//                           </IconButton>
//                         </Tooltip>
//                         <Tooltip title="Delete">
//                           <IconButton size="small" onClick={() => handleDelete(exit.exit_id)}>
//                             <DeleteIcon sx={{ color: 'secondary.main' }} />
//                           </IconButton>
//                         </Tooltip>
//                       </Box>
//                     </TableCell>
//                   </TableRow>
//                 ))
//               ) : (
//                 <TableRow>
//                   <TableCell colSpan={5} align="center">
//                     No employee exits found.
//                   </TableCell>
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>

//         <Box
//             sx={{
//                 display: 'flex',
//                 flexDirection: isMobile ? 'column' : 'row',
//                 justifyContent: 'space-between',
//                 alignItems: 'center',
//                 mt: 2,
//             }}
//         >
//             <Typography variant="body2" color="text.secondary" sx={{ mb: isMobile ? 2 : 0 }}>
//                 Showing {paginatedExits.length > 0 ? page * rowsPerPage + 1 : 0} to {Math.min((page + 1) * rowsPerPage, filteredExits.length)} of {filteredExits.length} results
//             </Typography>
//             <TablePagination
//                 component="div"
//                 count={filteredExits.length}
//                 page={page}
//                 onPageChange={(e, newPage) => setPage(newPage)}
//                 rowsPerPage={rowsPerPage}
//                 onRowsPerPageChange={(e) => {
//                     setRowsPerPage(parseInt(e.target.value, 10));
//                     setPage(0);
//                 }}
//                 rowsPerPageOptions={[5, 10, 15, 25]}
//                 sx={{
//                   '& .MuiIconButton-root': { color: 'primary.main' },
//                   '& .Mui-selected': { color: 'primary.main' },
//                 }}
//             />
//         </Box>
//       </Box>

//       {/* DIALOG for Adding/Editing Employee Exit */}
//       <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="sm">
//         <DialogTitle sx={{ color: 'primary.main', fontWeight: 'bold' }}>
//           {editingExit ? 'Edit Employee Exit' : 'Add New Employee Exit'}
//         </DialogTitle>
//         <DialogContent>
//           <Grid container spacing={2} sx={{ pt: 1 }}>
//             <Grid item xs={12}>
//               <FormControl fullWidth required disabled={!!editingExit}>
//                 <InputLabel id="employee-label">Employee</InputLabel>
//                 <Select
//                   labelId="employee-label"
//                   label="Employee"
//                   name="employeeId"
//                   value={formState.employeeId}
//                   onChange={handleFormChange}
//                 >
//                   {employeesDropdownData.map((emp) => (
//                     <MenuItem key={emp.value} value={emp.value.toString()}>{emp.label}</MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 required
//                 fullWidth
//                 label="Exit Date"
//                 type="date"
//                 name="exitDate"
//                 value={formState.exitDate}
//                 onChange={handleFormChange}
//                 InputLabelProps={{ shrink: true }}
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <FormControl fullWidth required>
//                 <InputLabel id="exit-type-label">Exit Type</InputLabel>
//                 <Select
//                   labelId="exit-type-label"
//                   label="Exit Type"
//                   name="exitTypeId"
//                   value={formState.exitTypeId}
//                   onChange={handleFormChange}
//                 >
//                   {exitTypes.map((type) => (
//                     <MenuItem key={type.id} value={type.id.toString()}>{type.name}</MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 fullWidth
//                 multiline
//                 rows={4}
//                 label="Description / Reason"
//                 name="description"
//                 value={formState.description}
//                 onChange={handleFormChange}
//               />
//             </Grid>
//              <Grid item xs={12}>
//                 <Typography variant="body2" color="text.secondary" gutterBottom>Attachment</Typography>
//                 <Button variant="outlined" component="label" fullWidth>
//                     Upload File
//                     <input type="file" hidden onChange={handleFileChange} accept=".pdf" />
//                 </Button>
//                 {formState.file && <Typography variant="caption" display="block" mt={1}>{formState.file.name}</Typography>}
//              </Grid>
//           </Grid>
//         </DialogContent>
//         <DialogActions sx={{ p: 2 }}>
//           <Button onClick={handleCloseDialog} sx={{ color: 'grey.500' }}>
//             Cancel
//           </Button>
//           <Button
//             variant="contained"
//             onClick={handleSubmit}
//             disabled={isSubmitting}
//           >
//             {isSubmitting ? <CircularProgress size={24} color="inherit" /> : 'Save'}
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </ThemeProvider>
//   );
// }

// export default EmployeeExitManagement;


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
//   CssBaseline,
//   InputAdornment,
//   CircularProgress,
//   TableSortLabel,
//   useMediaQuery,
//   Tooltip,
//   Skeleton,
//   TablePagination,
// } from '@mui/material';
// import AddIcon from '@mui/icons-material/Add';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
// import SearchIcon from '@mui/icons-material/Search';
// import Swal from 'sweetalert2';
// import axiosInstance from '../../utils/axiosInstance';

// // API Configuration
// const API_BASE_URL = 'https://tdtlworld.com/hrms-backend';
// const EXIT_API_URL = `${API_BASE_URL}/employee-exits/`;
// const EXIT_TYPE_API_URL = `${API_BASE_URL}/api/exit-type/`;
// const EMPLOYEE_DROPDOWN_API_URL = 'https://tdtlworld.com/hrms-backend/employee-dropdown/';

// // 🎨 Color & Theme
// const theme = createTheme({
//   palette: {
//     primary: {
//       main: '#8C257C',
//       dark: '#6d1d60',
//     },
//     secondary: {
//       main: '#F58E35',
//     },
//     background: {
//       default: '#f5f5f9',
//     },
//     grey: {
//       500: '#757575',
//     }
//   },
//   typography: {
//     h5: {
//       fontWeight: 'bold',
//       color: '#8C257C',
//     },
//     body2: {
//       fontSize: '0.95rem',
//     },
//   },
//   components: {
//     MuiButton: {
//       styleOverrides: {
//         containedPrimary: {
//           color: '#FFFFFF',
//           '&:hover': {
//             backgroundColor: '#6d1d60',
//           },
//         },
//       },
//     },
//     MuiTableHead: {
//       styleOverrides: {
//         root: {
//           backgroundColor: '#8C257C',
//         },
//       },
//     },
//     MuiTableCell: {
//       styleOverrides: {
//         head: {
//           color: '#FFFFFF',
//           fontWeight: 'bold',
//         },
//       },
//     },
//   },
// });

// // Utility function for formatting date
// const formatDate = (dateString) => {
//   if (!dateString) return 'N/A';
//   try {
//     const date = new Date(dateString);
//     const day = String(date.getDate()).padStart(2, '0');
//     const month = String(date.getMonth() + 1).padStart(2, '0');
//     const year = date.getFullYear();
//     return `${day}/${month}/${year}`;
//   } catch (error) {
//     return 'N/A';
//   }
// };

// function EmployeeExitManagement() {
//   const [employeeExits, setEmployeeExits] = useState([]);
//   const [exitTypes, setExitTypes] = useState([]);
//   const [employeesDropdownData, setEmployeesDropdownData] = useState([]);
  
//   const [loading, setLoading] = useState(true);
//   const [isSubmitting, setIsSubmitting] = useState(false);
  
//   const [searchTerm, setSearchTerm] = useState('');
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
  
//   const [openDialog, setOpenDialog] = useState(false);
//   const [editingExit, setEditingExit] = useState(null);

//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

//   const initialFormState = {
//     employeeId: '',
//     exitDate: '',
//     exitTypeId: '',
//     description: '',
//     file: null,
//   };
//   const [formState, setFormState] = useState(initialFormState);

//   // Data Fetching
//   const fetchAllData = useCallback(async () => {
//     setLoading(true);
//     try {
//       const [exitsRes, typesRes, employeesRes] = await Promise.all([
//         axiosInstance.get(EXIT_API_URL),
//         axiosInstance.get(EXIT_TYPE_API_URL),
//         axiosInstance.get(EMPLOYEE_DROPDOWN_API_URL),
//       ]);
//       setEmployeeExits(exitsRes.data);
//       setExitTypes(typesRes.data.map(item => ({ id: item.value, name: item.label })));
//       setEmployeesDropdownData(employeesRes.data);
//     } catch (error) {
//       console.error("Failed to fetch data:", error);
//       Swal.fire({
//         icon: 'error',
//         title: 'Failed to Load Data',
//         text: 'Could not fetch necessary data from the server.',
//         timer: 3000,
//         showConfirmButton: false,
//       });
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchAllData();
//   }, [fetchAllData]);

//   const handleOpenDialog = (exit = null) => {
//     setEditingExit(exit);
//     if (exit) {
//       setFormState({
//         employeeId: exit.employee_id?.toString() || '',
//         exitDate: exit.exit_date ? exit.exit_date.split('T')[0] : '',
//         exitTypeId: exit.exit_type_id?.toString() || '',
//         description: exit.reason || '',
//         file: null,
//       });
//     } else {
//       setFormState(initialFormState);
//     }
//     setOpenDialog(true);
//   };

//   const handleCloseDialog = () => {
//     setOpenDialog(false);
//     setEditingExit(null);
//     setFormState(initialFormState);
//   };

//   const handleFormChange = (event) => {
//     const { name, value } = event.target;
//     setFormState(prev => ({ ...prev, [name]: value }));
//   };

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     if (file && file.type === "application/pdf") {
//       setFormState(prev => ({ ...prev, file }));
//     } else if (file) {
//       Swal.fire({
//         icon: 'warning',
//         title: 'Invalid File Type',
//         text: 'Please upload only PDF files.',
//         timer: 3000,
//         showConfirmButton: false,
//       });
//     }
//   };

//   const handleSubmit = async () => {
//     if (!formState.employeeId || !formState.exitDate || !formState.exitTypeId) {
//       Swal.fire({
//         icon: 'warning',
//         title: 'Missing Fields',
//         text: 'Please fill in all required fields.',
//         timer: 3000,
//         showConfirmButton: false,
//       });
//       return;
//     }
//     setIsSubmitting(true);

//     const payload = {
//       employee_id: parseInt(formState.employeeId),
//       exit_date: formState.exitDate,
//       exit_type_id: parseInt(formState.exitTypeId),
//       reason: formState.description,
//       // Default values from original code
//       exit_interview: 'yes',
//       is_inactivate_account: 'yes',
//       accountability_to: "0",
//       added_by: 2,
//     };

//     try {
//       if (editingExit) {
//         await axiosInstance.patch(`${EXIT_API_URL}${editingExit.exit_id}/`, payload);
//       } else {
//         await axiosInstance.post(EXIT_API_URL, payload);
//       }
//       Swal.fire({
//         icon: 'success',
//         title: `Employee Exit ${editingExit ? 'Updated' : 'Added'}!`,
//         text: `The record has been saved successfully.`,
//         timer: 3000,
//         showConfirmButton: false,
//       });
//       handleCloseDialog();
//       fetchAllData();
//     } catch (error) {
//       console.error("Failed to submit form:", error);
//       Swal.fire({
//         icon: 'error',
//         title: 'Submission Failed',
//         text: error.response?.data?.detail || 'An unexpected error occurred.',
//         timer: 3000,
//         showConfirmButton: false,
//       });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleDelete = (exitId) => {
//     Swal.fire({
//       title: 'Are you sure?',
//       text: "You won't be able to revert this!",
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#8C257C',
//       cancelButtonColor: '#757575',
//       confirmButtonText: 'Yes, delete it!'
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         try {
//           await axiosInstance.delete(`${EXIT_API_URL}${exitId}/`);
//           Swal.fire({
//             icon: 'success',
//             title: 'Deleted!',
//             text: 'The employee exit record has been deleted.',
//             timer: 3000,
//             showConfirmButton: false,
//           });
//           fetchAllData();
//         } catch (error) {
//           console.error("Failed to delete exit:", error);
//           Swal.fire({
//             icon: 'error',
//             title: 'Deletion Failed',
//             text: 'Could not delete the record.',
//             timer: 3000,
//             showConfirmButton: false,
//           });
//         }
//       }
//     });
//   };

//   const filteredExits = useMemo(() =>
//     employeeExits.filter(exit =>
//       (exit.employee_name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
//       (exit.exit_type_name?.toLowerCase() || '').includes(searchTerm.toLowerCase())
//     ),
//     [employeeExits, searchTerm]
//   );
  
//   const paginatedExits = filteredExits.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

//   const renderSkeleton = () => {
//     return Array.from(new Array(rowsPerPage)).map((_, index) => (
//       <TableRow key={index}>
//         <TableCell><Skeleton variant="text" /></TableCell>
//         <TableCell><Skeleton variant="text" /></TableCell>
//         <TableCell><Skeleton variant="text" /></TableCell>
//         <TableCell><Skeleton variant="text" /></TableCell>
//         <TableCell><Skeleton variant="text" /></TableCell>
//         <TableCell align="center"><Skeleton variant="rectangular" width={100} height={30} /></TableCell>
//       </TableRow>
//     ));
//   };

//   return (
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
//       <Box component={Paper} p={3}>
//         <Typography variant="h4" sx={{ color: "#8C257C ", fontWeight: "bold", mb: 5 }}>
//           Employee Exit 
//         </Typography>

//         <Box
//           sx={{
//             display: 'flex',
//             flexDirection: isMobile ? 'column' : 'row',
//             justifyContent: 'space-between',
//             alignItems: 'center',
//             gap: 2,
//             mb: 2,
//           }}
//         >
//           <Button
//             variant="contained"
//             startIcon={<AddIcon />}
//             onClick={() => handleOpenDialog()}
//             sx={{ width: isMobile ? '100%' : 'auto' }}
//           >
//             Add New
//           </Button>
//           <TextField
//             size="small"
//             placeholder="Search..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             sx={{ width: isMobile ? '100%' : 'auto' }}
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <SearchIcon />
//                 </InputAdornment>
//               ),
//             }}
//           />
//         </Box>

//         <TableContainer>
//           <Table sx={{ minWidth: '100%', whiteSpace: 'nowrap' }}>
//             <TableHead>
//               <TableRow>
//                 <TableCell>SR. NO.</TableCell> {/* <-- ADDED COLUMN HEADER */}
//                 <TableCell>EMPLOYEE</TableCell>
//                 <TableCell>EXIT TYPE</TableCell>
//                 <TableCell>EXIT DATE</TableCell>
//                 <TableCell>REASON</TableCell>
//                 <TableCell align="center">ACTIONS</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {loading ? (
//                 renderSkeleton()
//               ) : paginatedExits.length > 0 ? (
//                 paginatedExits.map((exit, index) => ( // <-- ADDED INDEX
//                   <TableRow key={exit.exit_id} hover>
//                     <TableCell sx={{ fontSize: '0.95rem' }}>
//                       {page * rowsPerPage + index + 1} {/* <-- SERIAL NUMBER CALCULATION */}
//                     </TableCell>
//                     <TableCell sx={{ fontSize: '0.95rem' }}>{exit.employee_name || 'N/A'}</TableCell>
//                     <TableCell sx={{ fontSize: '0.95rem' }}>{exit.exit_type_name || 'N/A'}</TableCell>
//                     <TableCell sx={{ fontSize: '0.95rem' }}>{formatDate(exit.exit_date)}</TableCell>
//                     <TableCell sx={{ fontSize: '0.95rem' }}>{exit.reason || 'N/A'}</TableCell>
//                     <TableCell align="center">
//                       <Box display="flex" justifyContent="center" gap={0.5}>
//                         <Tooltip title="Edit">
//                           <IconButton size="small" onClick={() => handleOpenDialog(exit)}>
//                             <EditIcon color="primary" />
//                           </IconButton>
//                         </Tooltip>
//                         <Tooltip title="Delete">
//                           <IconButton size="small" onClick={() => handleDelete(exit.exit_id)}>
//                             {/* <-- MODIFIED ICON COLOR */}
//                             <DeleteIcon sx={{ color: '#f44336' }} /> 
//                           </IconButton>
//                         </Tooltip>
//                       </Box>
//                     </TableCell>
//                   </TableRow>
//                 ))
//               ) : (
//                 <TableRow>
//                   <TableCell colSpan={6} align="center"> {/* <-- INCREASED COLSPAN */}
//                     No employee exits found.
//                   </TableCell>
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>

//         <Box
//             sx={{
//                 display: 'flex',
//                 flexDirection: isMobile ? 'column' : 'row',
//                 justifyContent: 'space-between',
//                 alignItems: 'center',
//                 mt: 2,
//             }}
//         >
//             <Typography variant="body2" color="text.secondary" sx={{ mb: isMobile ? 2 : 0 }}>
//                 Showing {paginatedExits.length > 0 ? page * rowsPerPage + 1 : 0} to {Math.min((page + 1) * rowsPerPage, filteredExits.length)} of {filteredExits.length} results
//             </Typography>
//             <TablePagination
//                 component="div"
//                 count={filteredExits.length}
//                 page={page}
//                 onPageChange={(e, newPage) => setPage(newPage)}
//                 rowsPerPage={rowsPerPage}
//                 onRowsPerPageChange={(e) => {
//                     setRowsPerPage(parseInt(e.target.value, 10));
//                     setPage(0);
//                 }}
//                 rowsPerPageOptions={[5, 10, 15, 25]}
//                 sx={{
//                   '& .MuiIconButton-root': { color: 'primary.main' },
//                   '& .Mui-selected': { color: 'primary.main' },
//                 }}
//             />
//         </Box>
//       </Box>

//       {/* DIALOG for Adding/Editing Employee Exit */}
//       <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="sm">
//         <DialogTitle sx={{ color: 'primary.main', fontWeight: 'bold' }}>
//           {editingExit ? 'Edit Employee Exit' : 'Add New Employee Exit'}
//         </DialogTitle>
//         <DialogContent>
//           <Grid container spacing={2} sx={{ pt: 1 }}>
//             <Grid item xs={12}>
//               <FormControl fullWidth required disabled={!!editingExit}>
//                 <InputLabel id="employee-label">Employee</InputLabel>
//                 <Select
//                   labelId="employee-label"
//                   label="Employee"
//                   name="employeeId"
//                   value={formState.employeeId}
//                   onChange={handleFormChange}
//                 >
//                   {employeesDropdownData.map((emp) => (
//                     <MenuItem key={emp.value} value={emp.value.toString()}>{emp.label}</MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 required
//                 fullWidth
//                 label="Exit Date"
//                 type="date"
//                 name="exitDate"
//                 value={formState.exitDate}
//                 onChange={handleFormChange}
//                 InputLabelProps={{ shrink: true }}
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <FormControl fullWidth required>
//                 <InputLabel id="exit-type-label">Exit Type</InputLabel>
//                 <Select
//                   labelId="exit-type-label"
//                   label="Exit Type"
//                   name="exitTypeId"
//                   value={formState.exitTypeId}
//                   onChange={handleFormChange}
//                 >
//                   {exitTypes.map((type) => (
//                     <MenuItem key={type.id} value={type.id.toString()}>{type.name}</MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 fullWidth
//                 multiline
//                 rows={4}
//                 label="Description / Reason"
//                 name="description"
//                 value={formState.description}
//                 onChange={handleFormChange}
//               />
//             </Grid>
//              <Grid item xs={12}>
//                 <Typography variant="body2" color="text.secondary" gutterBottom>Attachment</Typography>
//                 <Button variant="outlined" component="label" fullWidth>
//                     Upload File
//                     <input type="file" hidden onChange={handleFileChange} accept=".pdf" />
//                 </Button>
//                 {formState.file && <Typography variant="caption" display="block" mt={1}>{formState.file.name}</Typography>}
//              </Grid>
//           </Grid>
//         </DialogContent>
//         <DialogActions sx={{ p: 2 }}>
//           <Button onClick={handleCloseDialog} sx={{ color: 'grey.500' }}>
//             Cancel
//           </Button>
//           <Button
//             variant="contained"
//             onClick={handleSubmit}
//             disabled={isSubmitting}
//           >
//             {isSubmitting ? <CircularProgress size={24} color="inherit" /> : 'Save'}
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </ThemeProvider>
//   );
// }

// export default EmployeeExitManagement;













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
//   CssBaseline,
//   InputAdornment,
//   CircularProgress,
//   TableSortLabel,
//   useMediaQuery,
//   Tooltip,
//   Skeleton,
//   TablePagination,
// } from '@mui/material';
// import AddIcon from '@mui/icons-material/Add';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
// import SearchIcon from '@mui/icons-material/Search';
// import Swal from 'sweetalert2';
// import axiosInstance from '../../utils/axiosInstance';

// // API Configuration
// const API_BASE_URL = 'https://tdtlworld.com/hrms-backend';
// const EXIT_API_URL = `${API_BASE_URL}/employee-exits/`;
// const EXIT_TYPE_API_URL = `${API_BASE_URL}/api/exit-type/`;
// const EMPLOYEE_DROPDOWN_API_URL = 'https://tdtlworld.com/hrms-backend/employee-dropdown/';

// // 🎨 Color & Theme
// const theme = createTheme({
//   palette: {
//     primary: {
//       main: '#8C257C',
//       dark: '#6d1d60',
//     },
//     secondary: {
//       main: '#F58E35',
//     },
//     background: {
//       default: '#f5f5f9',
//     },
//     grey: {
//       500: '#757575',
//     }
//   },
//   typography: {
//     h5: {
//       fontWeight: 'bold',
//       color: '#8C257C',
//     },
//     body2: {
//       fontSize: '0.95rem',
//     },
//   },
//   components: {
//     MuiButton: {
//       styleOverrides: {
//         containedPrimary: {
//           color: '#FFFFFF',
//           '&:hover': {
//             backgroundColor: '#6d1d60',
//           },
//         },
//       },
//     },
//     MuiTableHead: {
//       styleOverrides: {
//         root: {
//           backgroundColor: '#8C257C',
//         },
//       },
//     },
//     MuiTableCell: {
//       styleOverrides: {
//         head: {
//           color: '#FFFFFF',
//           fontWeight: 'bold',
//         },
//       },
//     },
//   },
// });

// // Utility function for formatting date
// const formatDate = (dateString) => {
//   if (!dateString) return 'N/A';
//   try {
//     const date = new Date(dateString);
//     const day = String(date.getDate()).padStart(2, '0');
//     const month = String(date.getMonth() + 1).padStart(2, '0');
//     const year = date.getFullYear();
//     return `${day}/${month}/${year}`;
//   } catch (error) {
//     return 'N/A';
//   }
// };

// function EmployeeExitManagement() {
//   const [employeeExits, setEmployeeExits] = useState([]);
//   const [exitTypes, setExitTypes] = useState([]);
//   const [employeesDropdownData, setEmployeesDropdownData] = useState([]);
  
//   const [loading, setLoading] = useState(true);
//   const [isSubmitting, setIsSubmitting] = useState(false);
  
//   const [searchTerm, setSearchTerm] = useState('');
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
  
//   const [openDialog, setOpenDialog] = useState(false);
//   const [editingExit, setEditingExit] = useState(null);

//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

//   const initialFormState = {
//     employeeId: '',
//     exitDate: '',
//     exitTypeId: '',
//     description: '',
//     file: null,
//   };
//   const [formState, setFormState] = useState(initialFormState);

//   // Data Fetching
//   const fetchAllData = useCallback(async () => {
//     setLoading(true);
//     try {
//       const [exitsRes, typesRes, employeesRes] = await Promise.all([
//         axiosInstance.get(EXIT_API_URL),
//         axiosInstance.get(EXIT_TYPE_API_URL),
//         axiosInstance.get(EMPLOYEE_DROPDOWN_API_URL),
//       ]);
//       setEmployeeExits(exitsRes.data);
//       setExitTypes(typesRes.data.map(item => ({ id: item.value, name: item.label })));
//       setEmployeesDropdownData(employeesRes.data);
//     } catch (error) {
//       console.error("Failed to fetch data:", error);
//       Swal.fire({
//         icon: 'error',
//         title: 'Failed to Load Data',
//         text: 'Could not fetch necessary data from the server.',
//         timer: 3000,
//         showConfirmButton: false,
//       });
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchAllData();
//   }, [fetchAllData]);

//   const handleOpenDialog = (exit = null) => {
//     setEditingExit(exit);
//     if (exit) {
//       setFormState({
//         employeeId: exit.employee_id?.toString() || '',
//         exitDate: exit.exit_date ? exit.exit_date.split('T')[0] : '',
//         exitTypeId: exit.exit_type_id?.toString() || '',
//         description: exit.reason || '',
//         file: null,
//       });
//     } else {
//       setFormState(initialFormState);
//     }
//     setOpenDialog(true);
//   };

//   const handleCloseDialog = () => {
//     setOpenDialog(false);
//     setEditingExit(null);
//     setFormState(initialFormState);
//   };

//   const handleFormChange = (event) => {
//     const { name, value } = event.target;
//     setFormState(prev => ({ ...prev, [name]: value }));
//   };

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     if (file && file.type === "application/pdf") {
//       setFormState(prev => ({ ...prev, file }));
//     } else if (file) {
//       Swal.fire({
//         icon: 'warning',
//         title: 'Invalid File Type',
//         text: 'Please upload only PDF files.',
//         timer: 3000,
//         showConfirmButton: false,
//       });
//     }
//   };

//   const handleSubmit = async () => {
//     if (!formState.employeeId || !formState.exitDate || !formState.exitTypeId) {
//       Swal.fire({
//         icon: 'warning',
//         title: 'Missing Fields',
//         text: 'Please fill in all required fields.',
//         timer: 3000,
//         showConfirmButton: false,
//       });
//       return;
//     }
//     setIsSubmitting(true);

//     const selectedEmployee = employeesDropdownData.find(
//       (emp) => emp.value.toString() === formState.employeeId
//     );

//     if (!selectedEmployee) {
//       Swal.fire({
//         icon: 'error',
//         title: 'Invalid Employee',
//         text: 'Could not find employee data for submission.',
//         timer: 3000,
//         showConfirmButton: false,
//       });
//       setIsSubmitting(false);
//       return;
//     }

//     const payload = {
//       employee_id: selectedEmployee.emp_id,
//       exit_date: formState.exitDate,
//       exit_type_id: parseInt(formState.exitTypeId),
//       reason: formState.description,
//       exit_interview: 'yes',
//       is_inactivate_account: 'yes',
//       accountability_to: "0",
//       added_by: 2,
//     };

//     try {
//       if (editingExit) {
//         await axiosInstance.patch(`${EXIT_API_URL}${editingExit.exit_id}/`, payload);
//       } else {
//         await axiosInstance.post(EXIT_API_URL, payload);
//       }
//       Swal.fire({
//         icon: 'success',
//         title: `Employee Exit ${editingExit ? 'Updated' : 'Added'}!`,
//         text: `The record has been saved successfully.`,
//         timer: 3000,
//         showConfirmButton: false,
//       });
//       handleCloseDialog();
//       fetchAllData();
//     } catch (error) {
//       console.error("Failed to submit form:", error);
//       Swal.fire({
//         icon: 'error',
//         title: 'Submission Failed',
//         text: error.response?.data?.detail || 'An unexpected error occurred.',
//         timer: 3000,
//         showConfirmButton: false,
//       });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleDelete = (exitId) => {
//     Swal.fire({
//       title: 'Are you sure?',
//       text: "You won't be able to revert this!",
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#8C257C',
//       cancelButtonColor: '#757575',
//       confirmButtonText: 'Yes, delete it!'
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         try {
//           await axiosInstance.delete(`${EXIT_API_URL}${exitId}/`);
//           Swal.fire({
//             icon: 'success',
//             title: 'Deleted!',
//             text: 'The employee exit record has been deleted.',
//             timer: 3000,
//             showConfirmButton: false,
//           });
//           fetchAllData();
//         } catch (error) {
//           console.error("Failed to delete exit:", error);
//           Swal.fire({
//             icon: 'error',
//             title: 'Deletion Failed',
//             text: 'Could not delete the record.',
//             timer: 3000,
//             showConfirmButton: false,
//           });
//         }
//       }
//     });
//   };

//   const filteredExits = useMemo(() =>
//     employeeExits.filter(exit =>
//       (exit.employee_name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
//       (exit.exit_type_name?.toLowerCase() || '').includes(searchTerm.toLowerCase())
//     ),
//     [employeeExits, searchTerm]
//   );
  
//   const paginatedExits = filteredExits.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

//   const renderSkeleton = () => {
//     return Array.from(new Array(rowsPerPage)).map((_, index) => (
//       <TableRow key={index}>
//         <TableCell><Skeleton variant="text" /></TableCell>
//         <TableCell><Skeleton variant="text" /></TableCell>
//         <TableCell><Skeleton variant="text" /></TableCell>
//         <TableCell><Skeleton variant="text" /></TableCell>
//         <TableCell><Skeleton variant="text" /></TableCell>
//         <TableCell align="center"><Skeleton variant="rectangular" width={100} height={30} /></TableCell>
//       </TableRow>
//     ));
//   };

//   return (
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
//       <Box component={Paper} p={3}>
//         <Typography variant="h4" sx={{ color: "#8C257C ", fontWeight: "bold", mb: 5 }}>
//           Employee Exit 
//         </Typography>

//         <Box
//           sx={{
//             display: 'flex',
//             flexDirection: isMobile ? 'column' : 'row',
//             justifyContent: 'space-between',
//             alignItems: 'center',
//             gap: 2,
//             mb: 2,
//           }}
//         >
//           <Button
//             variant="contained"
//             startIcon={<AddIcon />}
//             onClick={() => handleOpenDialog()}
//             sx={{ width: isMobile ? '100%' : 'auto' }}
//           >
//             Add New
//           </Button>
//           <TextField
//             size="small"
//             placeholder="Search..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             sx={{ width: isMobile ? '100%' : 'auto' }}
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <SearchIcon />
//                 </InputAdornment>
//               ),
//             }}
//           />
//         </Box>

//         <TableContainer>
//           <Table sx={{ minWidth: '100%', whiteSpace: 'nowrap' }}>
//             <TableHead>
//               <TableRow>
//                 <TableCell>SR. NO.</TableCell>
//                 <TableCell>EMPLOYEE</TableCell>
//                 <TableCell>EXIT TYPE</TableCell>
//                 <TableCell>EXIT DATE</TableCell>
//                 <TableCell>REASON</TableCell>
//                 <TableCell align="center">ACTIONS</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {loading ? (
//                 renderSkeleton()
//               ) : paginatedExits.length > 0 ? (
//                 paginatedExits.map((exit, index) => (
//                   <TableRow key={exit.exit_id} hover>
//                     <TableCell sx={{ fontSize: '0.95rem' }}>
//                       {page * rowsPerPage + index + 1}
//                     </TableCell>
//                     <TableCell sx={{ fontSize: '0.95rem' }}>{exit.employee_name || 'N/A'}</TableCell>
//                     <TableCell sx={{ fontSize: '0.95rem' }}>{exit.exit_type_name || 'N/A'}</TableCell>
//                     <TableCell sx={{ fontSize: '0.95rem' }}>{formatDate(exit.exit_date)}</TableCell>
//                     <TableCell sx={{ fontSize: '0.95rem' }}>{exit.reason || 'N/A'}</TableCell>
//                     <TableCell align="center">
//                       <Box display="flex" justifyContent="center" gap={0.5}>
//                         <Tooltip title="Edit">
//                           <IconButton size="small" onClick={() => handleOpenDialog(exit)}>
//                             <EditIcon color="primary" />
//                           </IconButton>
//                         </Tooltip>
//                         <Tooltip title="Delete">
//                           <IconButton size="small" onClick={() => handleDelete(exit.exit_id)}>
//                             <DeleteIcon sx={{ color: '#f44336' }} /> 
//                           </IconButton>
//                         </Tooltip>
//                       </Box>
//                     </TableCell>
//                   </TableRow>
//                 ))
//               ) : (
//                 <TableRow>
//                   <TableCell colSpan={6} align="center">
//                     No employee exits found.
//                   </TableCell>
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>

//         <Box
//             sx={{
//                 display: 'flex',
//                 flexDirection: isMobile ? 'column' : 'row',
//                 justifyContent: 'space-between',
//                 alignItems: 'center',
//                 mt: 2,
//             }}
//         >
//             <Typography variant="body2" color="text.secondary" sx={{ mb: isMobile ? 2 : 0 }}>
//                 Showing {paginatedExits.length > 0 ? page * rowsPerPage + 1 : 0} to {Math.min((page + 1) * rowsPerPage, filteredExits.length)} of {filteredExits.length} results
//             </Typography>
//             <TablePagination
//                 component="div"
//                 count={filteredExits.length}
//                 page={page}
//                 onPageChange={(e, newPage) => setPage(newPage)}
//                 rowsPerPage={rowsPerPage}
//                 onRowsPerPageChange={(e) => {
//                     setRowsPerPage(parseInt(e.target.value, 10));
//                     setPage(0);
//                 }}
//                 rowsPerPageOptions={[5, 10, 15, 25]}
//                 sx={{
//                   '& .MuiIconButton-root': { color: 'primary.main' },
//                   '& .Mui-selected': { color: 'primary.main' },
//                 }}
//             />
//         </Box>
//       </Box>

//       <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="sm">
//         <DialogTitle sx={{ color: 'primary.main', fontWeight: 'bold' }}>
//           {editingExit ? 'Edit Employee Exit' : 'Add New Employee Exit'}
//         </DialogTitle>
//         <DialogContent>
//           <Grid container spacing={2} sx={{ pt: 1 }}>
//             <Grid item xs={12}>
//               <FormControl fullWidth required disabled={!!editingExit}>
//                 <InputLabel id="employee-label">Employee</InputLabel>
//                 <Select
//                   labelId="employee-label"
//                   label="Employee"
//                   name="employeeId"
//                   value={formState.employeeId}
//                   onChange={handleFormChange}
//                 >
//                   {employeesDropdownData.map((emp) => (
//                     <MenuItem key={emp.value} value={emp.value.toString()}>{emp.label}</MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 required
//                 fullWidth
//                 label="Exit Date"
//                 type="date"
//                 name="exitDate"
//                 value={formState.exitDate}
//                 onChange={handleFormChange}
//                 InputLabelProps={{ shrink: true }}
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <FormControl fullWidth required>
//                 <InputLabel id="exit-type-label">Exit Type</InputLabel>
//                 <Select
//                   labelId="exit-type-label"
//                   label="Exit Type"
//                   name="exitTypeId"
//                   value={formState.exitTypeId}
//                   onChange={handleFormChange}
//                 >
//                   {exitTypes.map((type) => (
//                     <MenuItem key={type.id} value={type.id.toString()}>{type.name}</MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 fullWidth
//                 multiline
//                 rows={4}
//                 label="Description / Reason"
//                 name="description"
//                 value={formState.description}
//                 onChange={handleFormChange}
//               />
//             </Grid>
//              <Grid item xs={12}>
//                 <Typography variant="body2" color="text.secondary" gutterBottom>Attachment</Typography>
//                 <Button variant="outlined" component="label" fullWidth>
//                     Upload File
//                     <input type="file" hidden onChange={handleFileChange} accept=".pdf" />
//                 </Button>
//                 {formState.file && <Typography variant="caption" display="block" mt={1}>{formState.file.name}</Typography>}
//              </Grid>
//           </Grid>
//         </DialogContent>
//         <DialogActions sx={{ p: 2 }}>
//           <Button onClick={handleCloseDialog} sx={{ color: 'grey.500' }}>
//             Cancel
//           </Button>
//           <Button
//             variant="contained"
//             onClick={handleSubmit}
//             disabled={isSubmitting}
//           >
//             {isSubmitting ? <CircularProgress size={24} color="inherit" /> : 'Save'}
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </ThemeProvider>
//   );
// }

// export default EmployeeExitManagement;




import React, { useState, useEffect, useCallback, useMemo } from 'react';
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
  CssBaseline,
  InputAdornment,
  CircularProgress,
  TableSortLabel,
  useMediaQuery,
  Tooltip,
  Skeleton,
  Pagination, // Added import
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import Swal from 'sweetalert2';
import axiosInstance from '../../utils/axiosInstance';

// API Configuration
const API_BASE_URL = 'https://tdtlworld.com/hrms-backend';
const EXIT_API_URL = `${API_BASE_URL}/employee-exits/`;
const EXIT_TYPE_API_URL = `${API_BASE_URL}/api/exit-type/`;
const EMPLOYEE_DROPDOWN_API_URL = 'https://tdtlworld.com/hrms-backend/employee-dropdown/';

// 🎨 Color & Theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#8C257C',
      dark: '#6d1d60',
    },
    secondary: {
      main: '#F58E35',
    },
    background: {
      default: '#f5f5f9',
    },
    grey: {
      500: '#757575',
    }
  },
  typography: {
    h5: {
      fontWeight: 'bold',
      color: '#8C257C',
    },
    body2: {
      fontSize: '0.95rem',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          color: '#FFFFFF',
          '&:hover': {
            backgroundColor: '#6d1d60',
          },
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: '#8C257C',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          color: '#FFFFFF',
          fontWeight: 'bold',
        },
      },
    },
  },
});

// Utility function for formatting date
const formatDate = (dateString) => {
  // ... (function remains the same)
  if (!dateString) return 'N/A';
  try {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  } catch (error) {
    return 'N/A';
  }
};

function EmployeeExitManagement() {
  const [employeeExits, setEmployeeExits] = useState([]);
  const [exitTypes, setExitTypes] = useState([]);
  const [employeesDropdownData, setEmployeesDropdownData] = useState([]);
  
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  
  const [openDialog, setOpenDialog] = useState(false);
  const [editingExit, setEditingExit] = useState(null);

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const initialFormState = {
    // ... (object remains the same)
    employeeId: '',
    exitDate: '',
    exitTypeId: '',
    description: '',
    file: null,
  };
  const [formState, setFormState] = useState(initialFormState);

  // Data Fetching
  const fetchAllData = useCallback(async () => {
    // ... (function remains the same)
    setLoading(true);
    try {
      const [exitsRes, typesRes, employeesRes] = await Promise.all([
        axiosInstance.get(EXIT_API_URL),
        axiosInstance.get(EXIT_TYPE_API_URL),
        axiosInstance.get(EMPLOYEE_DROPDOWN_API_URL),
      ]);
      setEmployeeExits(exitsRes.data);
      setExitTypes(typesRes.data.map(item => ({ id: item.value, name: item.label })));
      setEmployeesDropdownData(employeesRes.data);
    } catch (error) {
      console.error("Failed to fetch data:", error);
      Swal.fire({
        icon: 'error',
        title: 'Failed to Load Data',
        text: 'Could not fetch necessary data from the server.',
        timer: 3000,
        showConfirmButton: false,
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  const handleOpenDialog = (exit = null) => {
    // ... (function remains the same)
    setEditingExit(exit);
    if (exit) {
      setFormState({
        employeeId: exit.employee_id?.toString() || '',
        exitDate: exit.exit_date ? exit.exit_date.split('T')[0] : '',
        exitTypeId: exit.exit_type_id?.toString() || '',
        description: exit.reason || '',
        file: null,
      });
    } else {
      setFormState(initialFormState);
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    // ... (function remains the same)
    setOpenDialog(false);
    setEditingExit(null);
    setFormState(initialFormState);
  };

  const handleFormChange = (event) => {
    // ... (function remains the same)
    const { name, value } = event.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (event) => {
    // ... (function remains the same)
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
      setFormState(prev => ({ ...prev, file }));
    } else if (file) {
      Swal.fire({
        icon: 'warning',
        title: 'Invalid File Type',
        text: 'Please upload only PDF files.',
        timer: 3000,
        showConfirmButton: false,
      });
    }
  };

  const handleSubmit = async () => {
    // ... (function remains the same)
    if (!formState.employeeId || !formState.exitDate || !formState.exitTypeId) {
      Swal.fire({
        icon: 'warning',
        title: 'Missing Fields',
        text: 'Please fill in all required fields.',
        timer: 3000,
        showConfirmButton: false,
      });
      return;
    }
    setIsSubmitting(true);

    const selectedEmployee = employeesDropdownData.find(
      (emp) => emp.value.toString() === formState.employeeId
    );

    if (!selectedEmployee) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Employee',
        text: 'Could not find employee data for submission.',
        timer: 3000,
        showConfirmButton: false,
      });
      setIsSubmitting(false);
      return;
    }

    const payload = {
      employee_id: selectedEmployee.emp_id,
      exit_date: formState.exitDate,
      exit_type_id: parseInt(formState.exitTypeId),
      reason: formState.description,
      exit_interview: 'yes',
      is_inactivate_account: 'yes',
      accountability_to: "0",
      added_by: 2,
    };

    try {
      if (editingExit) {
        await axiosInstance.patch(`${EXIT_API_URL}${editingExit.exit_id}/`, payload);
      } else {
        await axiosInstance.post(EXIT_API_URL, payload);
      }
      Swal.fire({
        icon: 'success',
        title: `Employee Exit ${editingExit ? 'Updated' : 'Added'}!`,
        text: `The record has been saved successfully.`,
        timer: 3000,
        showConfirmButton: false,
      });
      handleCloseDialog();
      fetchAllData();
    } catch (error) {
      console.error("Failed to submit form:", error);
      Swal.fire({
        icon: 'error',
        title: 'Submission Failed',
        text: error.response?.data?.detail || 'An unexpected error occurred.',
        timer: 3000,
        showConfirmButton: false,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = (exitId) => {
    // ... (function remains the same)
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#8C257C',
      cancelButtonColor: '#757575',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosInstance.delete(`${EXIT_API_URL}${exitId}/`);
          Swal.fire({
            icon: 'success',
            title: 'Deleted!',
            text: 'The employee exit record has been deleted.',
            timer: 3000,
            showConfirmButton: false,
          });
          fetchAllData();
        } catch (error) {
          console.error("Failed to delete exit:", error);
          Swal.fire({
            icon: 'error',
            title: 'Deletion Failed',
            text: 'Could not delete the record.',
            timer: 3000,
            showConfirmButton: false,
          });
        }
      }
    });
  };
  
  const handlePaginationChange = (event, newPage) => {
    setPage(newPage - 1);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredExits = useMemo(() =>
    employeeExits.filter(exit =>
      (exit.employee_name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (exit.exit_type_name?.toLowerCase() || '').includes(searchTerm.toLowerCase())
    ),
    [employeeExits, searchTerm]
  );
  
  const paginatedExits = filteredExits.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  
  const startEntry = filteredExits.length > 0 ? page * rowsPerPage + 1 : 0;
  const endEntry = Math.min((page + 1) * rowsPerPage, filteredExits.length);

  const renderSkeleton = () => {
    // ... (function remains the same)
    return Array.from(new Array(rowsPerPage)).map((_, index) => (
      <TableRow key={index}>
        <TableCell><Skeleton variant="text" /></TableCell>
        <TableCell><Skeleton variant="text" /></TableCell>
        <TableCell><Skeleton variant="text" /></TableCell>
        <TableCell><Skeleton variant="text" /></TableCell>
        <TableCell><Skeleton variant="text" /></TableCell>
        <TableCell align="center"><Skeleton variant="rectangular" width={100} height={30} /></TableCell>
      </TableRow>
    ));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box component={Paper} p={3}>
        <Typography variant="h4" sx={{ color: "#8C257C ", fontWeight: "bold", mb: 5 }}>
          Employee Exit 
        </Typography>
        
        {/* ... (Search and Add button remain the same) */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
            mb: 2,
          }}
        >
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleOpenDialog()}
            sx={{ width: isMobile ? '100%' : 'auto' }}
          >
            Add New
          </Button>
          <TextField
            size="small"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ width: isMobile ? '100%' : 'auto' }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <TableContainer>
          <Table sx={{ minWidth: '100%', whiteSpace: 'nowrap' }}>
            <TableHead>
              {/* ... (TableHead remains the same) */}
              <TableRow>
                <TableCell>SR. NO.</TableCell>
                <TableCell>EMPLOYEE</TableCell>
                <TableCell>EXIT TYPE</TableCell>
                <TableCell>EXIT DATE</TableCell>
                <TableCell>REASON</TableCell>
                <TableCell align="center">ACTIONS</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                renderSkeleton()
              ) : paginatedExits.length > 0 ? (
                paginatedExits.map((exit, index) => (
                  <TableRow key={exit.exit_id} hover>
                    <TableCell sx={{ fontSize: '0.95rem' }}>
                      {page * rowsPerPage + index + 1}
                    </TableCell>
                    <TableCell sx={{ fontSize: '0.95rem' }}>{exit.employee_name || 'N/A'}</TableCell>
                    <TableCell sx={{ fontSize: '0.95rem' }}>{exit.exit_type_name || 'N/A'}</TableCell>
                    <TableCell sx={{ fontSize: '0.95rem' }}>{formatDate(exit.exit_date)}</TableCell>
                    <TableCell sx={{ fontSize: '0.95rem' }}>{exit.reason || 'N/A'}</TableCell>
                    <TableCell align="center">
                      <Box display="flex" justifyContent="center" gap={0.5}>
                        <Tooltip title="Edit">
                          <IconButton size="small" onClick={() => handleOpenDialog(exit)}>
                            <EditIcon color="primary" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <IconButton size="small" onClick={() => handleDelete(exit.exit_id)}>
                            <DeleteIcon sx={{ color: '#f44336' }} /> 
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    No employee exits found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* --- START: New Styled Pagination --- */}
        <Box sx={{ p: 2, borderTop: '1px solid rgba(224, 224, 224, 1)' }}>
            {loading ? (
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
                                    backgroundColor: 'primary.main',
                                    color: 'white',
                                    borderRadius: '4px',
                                    transition: 'background-color 0.3s',
                                    '&:hover': {
                                        backgroundColor: 'primary.dark',
                                    },
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        border: 'none',
                                    },
                                    '& .MuiSvgIcon-root': {
                                        color: 'white',
                                    },
                                }}
                            >
                                {[5, 10, 15, 25].map((value) => (
                                    <MenuItem key={value} value={value}>{value}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <Typography variant="body2" color="text.secondary">
                           {`Showing ${startEntry} to ${endEntry} of ${filteredExits.length} results`}
                        </Typography>
                    </Box>
                    <Pagination
                        count={Math.ceil(filteredExits.length / rowsPerPage)}
                        page={page + 1}
                        onChange={handlePaginationChange}
                        showFirstButton
                        showLastButton
                        sx={{
                            '& .MuiPaginationItem-root': {
                                borderRadius: '4px',
                                transition: 'background-color 0.3s, color 0.3s',
                                '&:hover': {
                                    backgroundColor: 'secondary.main',
                                    color: 'white',
                                }
                            },
                            '& .MuiPaginationItem-page': {
                                color: 'primary.main',
                                '&.Mui-selected': {
                                    backgroundColor: 'primary.main',
                                    color: 'white',
                                    '&:hover': {
                                        backgroundColor: 'secondary.main',
                                    }
                                },
                            },
                             '& .MuiPaginationItem-icon': {
                                color: 'primary.main',
                            }
                        }}
                    />
                </Box>
            )}
        </Box>
        {/* --- END: New Styled Pagination --- */}
      </Box>

      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="sm">
        {/* ... (Dialog content remains the same) */}
        <DialogTitle sx={{ color: 'primary.main', fontWeight: 'bold' }}>
          {editingExit ? 'Edit Employee Exit' : 'Add New Employee Exit'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ pt: 1 }}>
            <Grid item xs={12}>
              <FormControl fullWidth required disabled={!!editingExit}>
                <InputLabel id="employee-label">Employee</InputLabel>
                <Select
                  labelId="employee-label"
                  label="Employee"
                  name="employeeId"
                  value={formState.employeeId}
                  onChange={handleFormChange}
                >
                  {employeesDropdownData.map((emp) => (
                    <MenuItem key={emp.value} value={emp.value.toString()}>{emp.label}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Exit Date"
                type="date"
                name="exitDate"
                value={formState.exitDate}
                onChange={handleFormChange}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel id="exit-type-label">Exit Type</InputLabel>
                <Select
                  labelId="exit-type-label"
                  label="Exit Type"
                  name="exitTypeId"
                  value={formState.exitTypeId}
                  onChange={handleFormChange}
                >
                  {exitTypes.map((type) => (
                    <MenuItem key={type.id} value={type.id.toString()}>{type.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Description / Reason"
                name="description"
                value={formState.description}
                onChange={handleFormChange}
              />
            </Grid>
             <Grid item xs={12}>
                <Typography variant="body2" color="text.secondary" gutterBottom>Attachment</Typography>
                <Button variant="outlined" component="label" fullWidth>
                    Upload File
                    <input type="file" hidden onChange={handleFileChange} accept=".pdf" />
                </Button>
                {formState.file && <Typography variant="caption" display="block" mt={1}>{formState.file.name}</Typography>}
             </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleCloseDialog} sx={{ color: 'grey.500' }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? <CircularProgress size={24} color="inherit" /> : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
}

export default EmployeeExitManagement;