// import React, { useState, useEffect, useCallback } from "react";

// import {

//   Box,

//   Button,

//   Dialog,

//   DialogTitle,

//   DialogContent,

//   DialogActions,

//   FormControl,

//   InputLabel,

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

//   Paper,

//   IconButton,

//   Alert,

//   CircularProgress,

//   useMediaQuery,

//   useTheme,

//   Stack,

//   Divider,

//   createTheme,

//   ThemeProvider,

//   TablePagination

// } from "@mui/material";

// import { Delete, Add as AddIcon, Search as SearchIcon } from "@mui/icons-material";

// import Swal from 'sweetalert2';

 

// // --- THEME DEFINITION ---

// const theme = createTheme({

//   palette: {

//     primary: {

//       main: '#7C3AED',

//       dark: '#6D28D9',

//     },

//     warning: {

//       main: '#f59e0b',

//     },

//     error: {

//       main: '#ef4444',

//     },

//     background: {

//       default: '#f4f6f8',

//     },

//   },

//   components: {

//     MuiButton: {

//       styleOverrides: {

//         containedPrimary: {

//           color: 'white',

//         }

//       }

//     },

//     MuiTableCell: {

//       styleOverrides: {

//         head: {

//           fontWeight: '600',

//           backgroundColor: '#f9fafb',

//           color: '#374151',

//           textTransform: 'uppercase',

//           fontSize: '0.75rem',

//         },

//       },

//     },

//     MuiPaper: {

//       styleOverrides: {

//         root: {

//           borderRadius: '8px',

//         }

//       }

//     },

//     MuiTablePagination: {

//       styleOverrides: {

//         toolbar: {

//           paddingLeft: '16px',

//           paddingRight: '16px',

//           '@media (max-width:600px)': {

//             flexDirection: 'column',

//             alignItems: 'center',

//             '& > *': {

//               marginBottom: '8px',

//             },

//           },

//         },

//         selectLabel: {

//           display: 'none',

//         },

//         select: {

//           display: 'none',

//         },

//         actions: {

//           '@media (max-width:600px)': {

//             marginLeft: 'auto',

//             marginRight: 'auto',

//           },

//         },

//       },

//     },

//   }

// });

 

// // --- API & Data Transformation Helpers ---

// const API_BASE_URL = "https://tdtlworld.com/hrms-backend/api/leave-setup/";

// const SAVE_AND_FREEZE_API_URL = "https://tdtlworld.com/hrms-backend/apis/save_and_freeze_leave_setup/";

 

// const mapApiToState = (apiData) => ({

//   id: apiData.constants_id,

//   type: apiData.leave_type || "",

//   days: apiData.days_per_year || 0,

// });

 

// const mapStateToApi = (stateData) => ({

//   category_name: stateData.type,

//   field_one: String(stateData.days),

// });

 

// // --- Component ---

// const LeaveSetup = () => {

//   const muiTheme = useTheme();

//   const isSmallScreen = useMediaQuery(muiTheme.breakpoints.down("sm"));

 

//   // Data state

//   const [leaveTypes, setLeaveTypes] = useState([]);

//   const [loading, setLoading] = useState(true);

//   const [error, setError] = useState(null);

//   const [successMessage, setSuccessMessage] = useState(null);

//   const [readOnlyLeaveIds, setReadOnlyLeaveIds] = useState([]);

 

//   // UI state

//   const [searchTerm, setSearchTerm] = useState("");

//   const [openForm, setOpenForm] = useState(false);

//   const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

 

//   // Form state for adding new leave type

//   const [newLeave, setNewLeave] = useState({

//     type: "",

//     days: "",

//   });

 

//   // State for inline editing: This will now hold ALL current table data for visible rows

//   const [currentTableData, setCurrentTableData] = useState({});

 

//   // Pagination State

//   const [page, setPage] = useState(0);

//   const [rowsPerPage, setRowsPerPage] = useState(10); // Default to 10 entries per page

 

//   // Get auth token from local storage

//   const accessToken = localStorage.getItem("accessToken");

 

//   // Helper to compare if there are any changes between original and current table data

//   const hasChanges = useCallback(() => {

//     // If the number of items or IDs don't match, it means something was added/deleted/ID changed, so there are changes.

//     if (Object.keys(currentTableData).length !== leaveTypes.length) {

//       return true;

//     }

 

//     for (const originalLeave of leaveTypes) {

//       const currentLeave = currentTableData[originalLeave.id];

//       if (!currentLeave) return true; // An original item is missing in currentTableData

//       // Compare type and days. Convert to string for consistent comparison.

//       if (String(currentLeave.type) !== String(originalLeave.type) || String(currentLeave.days) !== String(originalLeave.days)) {

//         return true;

//       }

//     }

//     return false;

//   }, [currentTableData, leaveTypes]);

 

//   // --- API Operations ---

//   const fetchLeaveTypes = useCallback(async () => {

//     setLoading(true);

//     setError(null);

//     setSuccessMessage(null);

//     setReadOnlyLeaveIds([]);

 

//     if (!accessToken) {

//       setError("Authentication token not found. Please log in again.");

//       setLoading(false);

//       return;

//     }

 

//     try {

//       const response = await fetch(API_BASE_URL, {

//         headers: {

//           Authorization: `Bearer ${accessToken}`,

//         },

//       });

 

//       if (!response.ok) {

//         throw new Error(`Failed to fetch data. Status: ${response.status}`);

//       }

//       const data = await response.json();

 

//       if (Array.isArray(data)) {

//         const mappedData = data.map(mapApiToState);

//         setLeaveTypes(mappedData);

//         const initialTableState = mappedData.reduce((acc, item) => {

//           acc[item.id] = { ...item };

//           return acc;

//         }, {});

//         setCurrentTableData(initialTableState);

//       } else {

//         throw new Error("Received invalid data format from server.");

//       }

//     } catch (e) {

//       console.error("Failed to fetch leave types:", e);

//       setError(e.message || "An unexpected error occurred.");

//     } finally {

//       setLoading(false);

//     }

//   }, [accessToken]);

 

//   useEffect(() => {

//     fetchLeaveTypes();

//   }, [fetchLeaveTypes]);

 

//   // --- Inline Edit Handlers ---

//   const handleInlineChange = (id, field, value) => {

//     setCurrentTableData((prev) => ({

//       ...prev,

//       [id]: {

//         ...prev[id],

//         [field]: value,

//       },

//     }));

//   };

 

//   const handleSaveAndFreeze = async () => {

//     setLoading(true);

//     setError(null);

//     setSuccessMessage(null);

//     setReadOnlyLeaveIds([]);

 

//     if (!accessToken) {

//       setError("Authentication token not found. Please log in again.");

//       setLoading(false);

//       return;

//     }

 

//     try {

//       // Filter out only the items that have actually changed

//       const changedLeaveTypes = leaveTypes.filter(originalLeave => {

//         const currentLeave = currentTableData[originalLeave.id];

//         return currentLeave && (

//           String(currentLeave.type) !== String(originalLeave.type) ||

//           String(currentLeave.days) !== String(originalLeave.days)

//         );

//       });

 

//       if (changedLeaveTypes.length === 0 && leaveTypes.length > 0) {

//         // If no changes were made to existing items but we still want to "freeze" them

//         // This scenario implies we need to send all current data for the selected year.

//         // Or, more accurately, send the 'original' state for all as 'current_leave_name' etc. if they haven't changed.

//         // The backend logic for 'save_and_freeze' will likely determine if it's a new entry for the year or an update.

//       }

 

//       const saveAndFreezePayloads = leaveTypes.map(originalLeave => {

//         const currentLeave = currentTableData[originalLeave.id];

//         return {

//           constants_id: originalLeave.id,

//           leave_type: originalLeave.type, // Original type

//           days_per_year: String(originalLeave.days), // Original days

//           current_leave_name: currentLeave?.type || originalLeave.type, // Current (possibly modified) type

//           current_leave_days: String(currentLeave?.days || originalLeave.days), // Current (possibly modified) days

//           year: String(selectedYear),

//         };

//       });

 

//       console.log("Save and Freeze Payload:", saveAndFreezePayloads);

 

//       const saveAndFreezeResponse = await fetch(SAVE_AND_FREEZE_API_URL, {

//         method: "POST",

//         headers: {

//           "Content-Type": "application/json",

//           Authorization: `Bearer ${accessToken}`,

//         },

//         body: JSON.stringify(saveAndFreezePayloads),

//       });

 

//       if (!saveAndFreezeResponse.ok) {

//         const errorData = await saveAndFreezeResponse.json().catch(() => ({}));

//         throw new Error(

//           errorData.error || errorData.detail || `Failed to save and freeze leave setup.`

//         );

//       }

 

//       const saveAndFreezeSuccess = await saveAndFreezeResponse.json();

//       setSuccessMessage(saveAndFreezeSuccess.message || "All changes saved and frozen successfully!");

//       fetchLeaveTypes(); // Re-fetch to update the table with new frozen states if any

//       // window.location.reload(); // Refresh on successful save and freeze - Consider if this is truly needed or if fetchLeaveTypes is enough

//       Swal.fire({

//         icon: 'success',

//         title: 'Saved & Frozen!',

//         text: saveAndFreezeSuccess.message || "All changes saved and frozen successfully!",

//       });

 

//     } catch (e) {

//       console.error("Save and Freeze operation failed:", e);

//       let errorMessage = e.message;

//       let existingConstantsId = null;

 

//       const regex = /constants_id (\d+) in year (\d{4})/;

//       const match = errorMessage.match(regex);

 

//       if (match) {

//         existingConstantsId = parseInt(match[1], 10);

//         Swal.fire({

//           icon: 'error',

//           title: 'Save Failed',

//           text: `Leave setup for this type already exists for the year ${match[2]}. The affected row will be made read-only.`,

//         }).then((result) => {

//           if (result.isConfirmed) {

//             // Reload the page only if user confirms and an existing constant ID was found

//             // This prevents an unnecessary reload for generic errors

//             if (existingConstantsId) {

//               window.location.reload();

//             }

//           }

//         });

//         if (existingConstantsId) {

//           setReadOnlyLeaveIds(prev => [...prev, existingConstantsId]);

//         }

//       } else {

//         Swal.fire({

//           icon: 'error',

//           title: 'Save Failed',

//           text: errorMessage,

//         });

//       }

//       setError(`Error during Save and Freeze: ${errorMessage}`);

//     } finally {

//       setLoading(false);

//     }

//   };

 

//   // --- Event Handlers for Adding New ---

//   const handleAddNew = () => {

//     setNewLeave({ type: "", days: "" });

//     setOpenForm(true);

//   };

 

//   const handleSaveNew = async () => {

//     if (!newLeave.type.trim() || newLeave.days === "") {

//       Swal.fire({

//         icon: 'warning',

//         title: 'Missing Information',

//         text: 'Leave Type and Days per year are required.',

//       });

//       return;

//     }

 

//     const payload = mapStateToApi(newLeave);

 

//     try {

//       const response = await fetch(API_BASE_URL, {

//         method: "POST",

//         headers: {

//           "Content-Type": "application/json",

//           Authorization: `Bearer ${accessToken}`,

//         },

//         body: JSON.stringify(payload),

//       });

 

//       if (!response.ok) {

//         const errorData = await response.json().catch(() => ({}));

//         throw new Error(

//           errorData.detail || `Failed to create new leave type.`

//         );

//       }

 

//       setOpenForm(false);

//       fetchLeaveTypes();

//       Swal.fire({

//         icon: 'success',

//         title: 'Leave Type Added!',

//         text: 'New leave type has been successfully added.',

//       });

//     } catch (e) {

//       console.error("Save new operation failed:", e);

//       Swal.fire({

//         icon: 'error',

//         title: 'Error',

//         text: `Error adding new leave type: ${e.message}`,

//       });

//     }

//   };

 

//   const handleDelete = async (leaveToDelete) => {

//     Swal.fire({

//       title: 'Are you sure?',

//       text: `You are about to delete "${leaveToDelete.type}". This action cannot be undone.`,

//       icon: 'warning',

//       showCancelButton: true,

//       confirmButtonColor: '#d33',

//       cancelButtonColor: '#3085d6',

//       confirmButtonText: 'Yes, delete it!'

//     }).then(async (result) => {

//       if (result.isConfirmed) {

//         try {

//           const response = await fetch(`${API_BASE_URL}${leaveToDelete.id}/`, {

//             method: "DELETE",

//             headers: {

//               Authorization: `Bearer ${accessToken}`,

//             },

//           });

 

//           if (!response.ok) {

//             throw new Error("Failed to delete leave type.");

//           }

 

//           Swal.fire(

//             'Deleted!',

//             'The leave type has been deleted.',

//             'success'

//           );

//           fetchLeaveTypes();

//         } catch (e) {

//           console.error("Delete operation failed:", e);

//           Swal.fire({

//             icon: 'error',

//             title: 'Error',

//             text: `Error deleting leave type: ${e.message}`,

//           });

//         }

//       }

//     });

//   };

 

//   // --- Filtering and Pagination ---

//   const filteredLeaveTypes = leaveTypes

//     .filter((item) =>

//       item.type.toLowerCase().includes(searchTerm.toLowerCase())

//     );

 

//   const paginatedLeaveTypes = filteredLeaveTypes.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

 

//   const handleChangePage = (event, newPage) => {

//     setPage(newPage);

//   };

 

//   const handleChangeRowsPerPage = (event) => {

//     setRowsPerPage(parseInt(event.target.value, 10));

//     setPage(0); // Reset to the first page when rows per page changes

//   };

 

//   // --- Render ---

//   return (

//     <ThemeProvider theme={theme}>

//       <Box sx={{ p: { xs: 2, sm: 3 }, bgcolor: 'background.default', minHeight: '100vh' }}>

//         <Paper elevation={3} sx={{ p: { xs: 2, sm: 3 } }}>

//           {/* Header with Add Button */}

//           <Box sx={{

//             display: 'flex',

//             flexDirection: { xs: 'column', sm: 'row' },

//             justifyContent: 'space-between',

//             alignItems: { xs: 'flex-start', sm: 'center' },

//             mb: 3,

//             gap: { xs: 2, sm: 0 }

//           }}>

//             <Typography variant="h5" fontWeight="bold">Leave Type Setup</Typography>

//             <Button

//               variant="contained"

//               color="primary"

//               startIcon={<AddIcon />}

//               onClick={handleAddNew}

//               sx={{ width: { xs: '100%', sm: 'auto' } }}

//             >

//               Add New Leave Type

//             </Button>

//           </Box>

 

//           {successMessage && (

//             <Alert severity="success" sx={{ mb: 2 }}>

//               {successMessage}

//             </Alert>

//           )}

//           {error && (

//             <Alert severity="error" sx={{ mb: 2 }}>

//               {error}

//             </Alert>

//           )}

 

//           {/* Top Bar for Search and Show Entries */}

//           <Box sx={{

//             display: 'flex',

//             flexDirection: { xs: 'column', sm: 'row' },

//             justifyContent: 'space-between',

//             alignItems: { xs: 'flex-start', sm: 'center' },

//             mb: 2,

//             gap: { xs: 2, sm: 0 }

//           }}>

//             {/* Show Entries Dropdown */}

//             <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>

//               <Typography variant="body2" color="textSecondary">Show</Typography>

//               <FormControl size="small" sx={{ minWidth: 70 }}>

//                 <Select

//                   value={rowsPerPage}

//                   onChange={handleChangeRowsPerPage}

//                   displayEmpty

//                   inputProps={{ 'aria-label': 'rows per page' }}

//                 >

//                   <MenuItem value={5}>5</MenuItem>

//                   <MenuItem value={10}>10</MenuItem>

//                   <MenuItem value={25}>25</MenuItem>

//                   <MenuItem value={50}>50</MenuItem>

//                 </Select>

//               </FormControl>

//               <Typography variant="body2" color="textSecondary">entries</Typography>

//             </Box>

//             {/* Search Input */}

//             <TextField

//               size="small"

//               placeholder="Search leave types..."

//               value={searchTerm}

//               onChange={(e) => {

//                 setSearchTerm(e.target.value);

//                 setPage(0); // Reset page to 0 on search

//               }}

//               InputProps={{

//                 startAdornment: (

//                   <SearchIcon color="action" sx={{ mr: 1 }} />

//                 ),

//               }}

//               sx={{ width: { xs: '100%', sm: '200px' } }}

//             />

//           </Box>

 

//           <TableContainer component={Paper} elevation={1}>

//             <Table aria-label="leave types table" size={isSmallScreen ? "small" : "medium"}>

//               <TableHead>

//                 <TableRow>

//                   <TableCell>LEAVE TYPE</TableCell>

//                   <TableCell>DAYS PER YEAR</TableCell>

//                   <TableCell align="center">ACTIONS</TableCell>

//                 </TableRow>

//               </TableHead>

//               <TableBody>

//                 {loading ? (

//                   <TableRow>

//                     <TableCell colSpan={3} sx={{ textAlign: "center", py: 4 }}>

//                       <CircularProgress size={24} />

//                       <Typography variant="body2">Loading...</Typography>

//                     </TableCell>

//                   </TableRow>

//                 ) : paginatedLeaveTypes.length === 0 && filteredLeaveTypes.length === 0 ? (

//                   <TableRow><TableCell colSpan={3} align="center" sx={{ py: 4 }}>No leave types found.</TableCell></TableRow>

//                 ) : paginatedLeaveTypes.length === 0 ? (

//                   <TableRow><TableCell colSpan={3} align="center" sx={{ py: 4 }}>No matching leave types found for your search.</TableCell></TableRow>

//                 ) : (

//                   paginatedLeaveTypes.map((row) => {

//                     const isReadOnly = readOnlyLeaveIds.includes(row.id);

//                     return (

//                       <TableRow key={row.id} hover>

//                         <TableCell>

//                           <TextField

//                             variant="outlined"

//                             size="small"

//                             fullWidth

//                             value={currentTableData[row.id]?.type || ""}

//                             onChange={(e) =>

//                               handleInlineChange(row.id, "type", e.target.value)

//                             }

//                             InputProps={{

//                               readOnly: isReadOnly,

//                             }}

//                             sx={{

//                               '& .MuiInputBase-input.Mui-disabled': {

//                                 WebkitTextFillColor: 'rgba(0, 0, 0, 0.87)',

//                               },

//                             }}

//                           />

//                         </TableCell>

//                         <TableCell>

//                           <TextField

//                             variant="outlined"

//                             size="small"

//                             fullWidth

//                             type="number"

//                             value={currentTableData[row.id]?.days || ""}

//                             onChange={(e) =>

//                               handleInlineChange(

//                                 row.id,

//                                 "days",

//                                 Math.max(0, parseInt(e.target.value, 10) || 0)

//                               )

//                             }

//                             InputProps={{

//                               inputProps: { min: 0 },

//                               readOnly: isReadOnly,

//                             }}

//                             sx={{

//                               '& .MuiInputBase-input.Mui-disabled': {

//                                 WebkitTextFillColor: 'rgba(0, 0, 0, 0.87)',

//                               },

//                               '& input[type=number]::-webkit-inner-spin-button, & input[type=number]::-webkit-outer-spin-button': {

//                                 '-webkit-appearance': 'none',

//                                 margin: 0,

//                               },

//                               '& input[type=number]': {

//                                 '-moz-appearance': 'textfield',

//                               },

//                             }}

//                           />

//                         </TableCell>

//                         <TableCell align="center">

//                           <IconButton

//                             onClick={() => handleDelete(row)}

//                             color="error"

//                             disabled={isReadOnly}

//                             size="small"

//                           >

//                             <Delete />

//                           </IconButton>

//                         </TableCell>

//                       </TableRow>

//                     );

//                   })

//                 )}

//               </TableBody>

//             </Table>

//           </TableContainer>

 

//           {/* Custom Pagination Display at the bottom */}

//           <Box sx={{

//             display: 'flex',

//             flexDirection: { xs: 'column', sm: 'row' },

//             justifyContent: 'space-between',

//             alignItems: { xs: 'flex-start', sm: 'center' },

//             mt: 2,

//             gap: { xs: 2, sm: 0 }

//           }}>

//             <Typography variant="body2" color="textSecondary" sx={{ ml: { xs: 0, sm: 2 } }}>

//               Showing {page * rowsPerPage + (paginatedLeaveTypes.length > 0 ? 1 : 0)} to {page * rowsPerPage + paginatedLeaveTypes.length} of {filteredLeaveTypes.length} records

//             </Typography>

//             <TablePagination

//               rowsPerPageOptions={[]}

//               component="div"

//               count={filteredLeaveTypes.length}

//               rowsPerPage={rowsPerPage}

//               page={page}

//               onPageChange={handleChangePage}

//               labelDisplayedRows={() => ''}

//               sx={{

//                 '& .MuiTablePagination-toolbar': {

//                   paddingLeft: { xs: 0, sm: 2 },

//                   paddingRight: { xs: 0, sm: 2 },

//                   justifyContent: { xs: 'center', sm: 'flex-end' },

//                 },

//                 '& .MuiTablePagination-selectLabel, & .MuiTablePagination-select': {

//                   display: 'none',

//                 },

//                 flexShrink: 0,

//               }}

//             />

//           </Box>

 

//           {/* Save and Freeze section */}

//           <Stack

//             direction={isSmallScreen ? "column" : "row"}

//             justifyContent="flex-end"

//             alignItems={isSmallScreen ? "flex-start" : "center"}

//             spacing={2}

//             mt={3}

//           >

//             <FormControl size="small" sx={{ minWidth: 120, width: isSmallScreen ? '100%' : 'auto' }}>

//               <InputLabel id="select-year-label">Select Year</InputLabel>

//               <Select

//                 labelId="select-year-label"

//                 value={selectedYear}

//                 label="Select Year"

//                 onChange={(e) => setSelectedYear(e.target.value)}

//               >

//                 {[...Array(11)].map((_, i) => {

//                   const year = new Date().getFullYear() - 5 + i;

//                   return <MenuItem key={year} value={year}>{year}</MenuItem>;

//                 })}

//               </Select>

//             </FormControl>

//             <Button

//               variant="contained"

//               onClick={handleSaveAndFreeze}

//               disabled={!hasChanges() || loading}

//               sx={{ bgcolor: "#4CAF50", color: "white", width: { xs: '100%', sm: 'auto' } }}

//               size="medium"

//             >

//               {loading ? <CircularProgress size={24} color="inherit" /> : "Save And Freeze"}

//             </Button>

//           </Stack>

 

//           {/* Add New Leave Type Dialog */}

//           <Dialog

//             open={openForm}

//             onClose={() => setOpenForm(false)}

//             fullWidth

//             maxWidth="sm"

//           >

//             <DialogTitle fontWeight="bold">Add </DialogTitle>

//             <Divider />

//             <DialogContent dividers>

//               <Box display="flex" flexDirection="column" gap={3}>

//                 <Alert severity="info" sx={{ fontSize: isSmallScreen ? "0.875rem" : "1rem" }}>

//                   Whatever changes you will make will be effective from 1st Jan.

//                 </Alert>

 

//                 <TextField

//                   label="Leave Type *"

//                   fullWidth

//                   value={newLeave.type}

//                   onChange={(e) =>

//                     setNewLeave({ ...newLeave, type: e.target.value })

//                   }

//                   size="medium"

//                 />

//                 <TextField

//                   label="Days per year *"

//                   type="number"

//                   fullWidth

//                   value={newLeave.days}

//                   onChange={(e) =>

//                     setNewLeave({ ...newLeave, days: Math.max(0, parseInt(e.target.value, 10) || 0) })

//                   }

//                   InputProps={{ inputProps: { min: 0 } }}

//                   sx={{

//                     '& input[type=number]::-webkit-inner-spin-button, & input[type=number]::-webkit-outer-spin-button': {

//                       '-webkit-appearance': 'none',

//                       margin: 0,

//                     },

//                     '& input[type=number]': {

//                       '-moz-appearance': 'textfield',

//                     },

//                   }}

//                   size="medium"

//                 />

//               </Box>

//             </DialogContent>

//             <DialogActions sx={{ p: 2 }}>

//               <Button onClick={() => setOpenForm(false)} color="inherit" size="medium">Cancel</Button>

//               <Button

//                 onClick={handleSaveNew}

//                 variant="contained"

//                 color="primary"

//                 size="medium"

//               >

//                 Save

//               </Button>

//             </DialogActions>

//           </Dialog>

//         </Paper>

//       </Box>

//     </ThemeProvider>

//   );

// };

 

// export default LeaveSetup;










// import React, { useState, useEffect, useCallback } from "react";
// import {
//     Box,
//     Button,
//     Dialog,
//     DialogTitle,
//     DialogContent,
//     DialogActions,
//     FormControl,
//     InputLabel,
//     MenuItem,
//     Select,
//     Table,
//     TableBody,
//     TableCell,
//     TableContainer,
//     TableHead,
//     TableRow,
//     TextField,
//     Typography,
//     Paper,
//     IconButton,
//     Alert,
//     CircularProgress,
//     useMediaQuery,
//     useTheme,
//     Stack,
//     Divider,
//     createTheme,
//     ThemeProvider,
//     TablePagination
// } from "@mui/material";
// import { Delete, Add as AddIcon, Search as SearchIcon } from "@mui/icons-material";
// import Swal from 'sweetalert2';

// const theme = createTheme({
//     palette: {
//         primary: {
//             main: '#7C3AED',
//             dark: '#6D28D9',
//         },
//         warning: {
//             main: '#f59e0b',
//         },
//         error: {
//             main: '#ef4444',
//         },
//         background: {
//             default: '#f4f6f8',
//         },
//     },
//     components: {
//         MuiButton: {
//             styleOverrides: {
//                 containedPrimary: {
//                     color: 'white',
//                 }
//             }
//         },
//         MuiTableCell: {
//             styleOverrides: {
//                 head: {
//                     fontWeight: '600',
//                     backgroundColor: '#f9fafb',
//                     color: '#374151',
//                     textTransform: 'uppercase',
//                     fontSize: '0.75rem',
//                 },
//             },
//         },
//         MuiPaper: {
//             styleOverrides: {
//                 root: {
//                     borderRadius: '8px',
//                 }
//             }
//         },
//         MuiTablePagination: {
//             styleOverrides: {
//                 toolbar: {
//                     paddingLeft: '16px',
//                     paddingRight: '16px',
//                     '@media (max-width:600px)': {
//                         flexDirection: 'column',
//                         alignItems: 'center',
//                         '& > *': {
//                             marginBottom: '8px',
//                         },
//                     },
//                 },
//                 selectLabel: {
//                     display: 'none',
//                 },
//                 select: {
//                     display: 'none',
//                 },
//                 actions: {
//                     '@media (max-width:600px)': {
//                         marginLeft: 'auto',
//                         marginRight: 'auto',
//                     },
//                 },
//             },
//         },
//     }
// });

// const API_BASE_URL = "https://tdtlworld.com/hrms-backend/api/leave-setup/";
// const SAVE_AND_FREEZE_API_URL = "https://tdtlworld.com/hrms-backend/apis/save_and_freeze_leave_setup/";

// const mapApiToState = (apiData) => ({
//     id: apiData.constants_id,
//     type: apiData.leave_type || "",
//     days: apiData.days_per_year || 0,
// });

// const mapStateToApi = (stateData) => ({
//     category_name: stateData.type,
//     field_one: String(stateData.days),
// });

// const LeaveSetup = () => {
//     const muiTheme = useTheme();
//     const isSmallScreen = useMediaQuery(muiTheme.breakpoints.down("sm"));

//     const [leaveTypes, setLeaveTypes] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [successMessage, setSuccessMessage] = useState(null);
//     const [readOnlyLeaveIds, setReadOnlyLeaveIds] = useState([]);

//     const [searchTerm, setSearchTerm] = useState("");
//     const [openForm, setOpenForm] = useState(false);
//     const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

//     const [newLeave, setNewLeave] = useState({
//         type: "",
//         days: "",
//     });

//     const [currentTableData, setCurrentTableData] = useState({});

//     const [page, setPage] = useState(0);
//     const [rowsPerPage, setRowsPerPage] = useState(10);

//     const accessToken = localStorage.getItem("accessToken");

//     const hasChanges = useCallback(() => {
//         if (Object.keys(currentTableData).length !== leaveTypes.length) {
//             return true;
//         }

//         for (const originalLeave of leaveTypes) {
//             const currentLeave = currentTableData[originalLeave.id];
//             if (!currentLeave) return true;
//             if (String(currentLeave.type) !== String(originalLeave.type) || String(currentLeave.days) !== String(originalLeave.days)) {
//                 return true;
//             }
//         }
//         return false;
//     }, [currentTableData, leaveTypes]);

//     const fetchLeaveTypes = useCallback(async () => {
//         setLoading(true);
//         setError(null);
//         setSuccessMessage(null);
//         setReadOnlyLeaveIds([]);

//         if (!accessToken) {
//             setError("Authentication token not found. Please log in again.");
//             setLoading(false);
//             return;
//         }

//         try {
//             const response = await fetch(`${API_BASE_URL}?year=${selectedYear}`, {
//                 headers: {
//                     Authorization: `Bearer ${accessToken}`,
//                 },
//             });

//             if (!response.ok) {
//                 if (response.status === 404) {
//                     setLeaveTypes([]);
//                     setCurrentTableData({});
//                     return;
//                 }
//                 throw new Error(`Failed to fetch data. Status: ${response.status}`);
//             }
//             const data = await response.json();

//             if (Array.isArray(data)) {
//                 const mappedData = data.map(mapApiToState);
//                 setLeaveTypes(mappedData);
//                 const initialTableState = mappedData.reduce((acc, item) => {
//                     acc[item.id] = { ...item };
//                     return acc;
//                 }, {});
//                 setCurrentTableData(initialTableState);
//             } else {
//                 throw new Error("Received invalid data format from server.");
//             }
//         } catch (e) {
//             console.error("Failed to fetch leave types:", e);
//             setError(e.message || "An unexpected error occurred.");
//         } finally {
//             setLoading(false);
//         }
//     }, [accessToken, selectedYear]);

//     useEffect(() => {
//         fetchLeaveTypes();
//     }, [fetchLeaveTypes]);

//     const handleInlineChange = (id, field, value) => {
//         setCurrentTableData((prev) => ({
//             ...prev,
//             [id]: {
//                 ...prev[id],
//                 [field]: value,
//             },
//         }));
//     };

//     const handleSaveAndFreeze = async () => {
//         setLoading(true);
//         setError(null);
//         setSuccessMessage(null);
//         setReadOnlyLeaveIds([]);

//         if (!accessToken) {
//             setError("Authentication token not found. Please log in again.");
//             setLoading(false);
//             return;
//         }

//         try {
//             const changedLeaveTypes = leaveTypes.filter(originalLeave => {
//                 const currentLeave = currentTableData[originalLeave.id];
//                 return currentLeave && (
//                     String(currentLeave.type) !== String(originalLeave.type) ||
//                     String(currentLeave.days) !== String(originalLeave.days)
//                 );
//             });

//             if (changedLeaveTypes.length === 0 && leaveTypes.length > 0) {
//             }

//             const saveAndFreezePayloads = leaveTypes.map(originalLeave => {
//                 const currentLeave = currentTableData[originalLeave.id];
//                 return {
//                     constants_id: originalLeave.id,
//                     leave_type: originalLeave.type,
//                     days_per_year: String(originalLeave.days),
//                     current_leave_name: currentLeave?.type || originalLeave.type,
//                     current_leave_days: String(currentLeave?.days || originalLeave.days),
//                     year: String(selectedYear),
//                 };
//             });

//             console.log("Save and Freeze Payload:", saveAndFreezePayloads);

//             const saveAndFreezeResponse = await fetch(SAVE_AND_FREEZE_API_URL, {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                     Authorization: `Bearer ${accessToken}`,
//                 },
//                 body: JSON.stringify(saveAndFreezePayloads),
//             });

//             if (!saveAndFreezeResponse.ok) {
//                 const errorData = await saveAndFreezeResponse.json().catch(() => ({}));
//                 throw new Error(
//                     errorData.error || errorData.detail || `Failed to save and freeze leave setup.`
//                 );
//             }

//             const saveAndFreezeSuccess = await saveAndFreezeResponse.json();
//             setSuccessMessage(saveAndFreezeSuccess.message || "All changes saved and frozen successfully!");
//             fetchLeaveTypes();
//             Swal.fire({
//                 icon: 'success',
//                 title: 'Saved & Frozen!',
//                 text: saveAndFreezeSuccess.message || "All changes saved and frozen successfully!",
//             });

//         } catch (e) {
//             console.error("Save and Freeze operation failed:", e);
//             let errorMessage = e.message;
//             let existingConstantsId = null;

//             const regex = /constants_id (\d+) in year (\d{4})/;
//             const match = errorMessage.match(regex);

//             if (match) {
//                 existingConstantsId = parseInt(match[1], 10);
//                 Swal.fire({
//                     icon: 'error',
//                     title: 'Save Failed',
//                     text: `Leave setup for this type already exists for the year ${match[2]}. The affected row will be made read-only.`,
//                 }).then((result) => {
//                     if (result.isConfirmed) {
//                         if (existingConstantsId) {
//                             window.location.reload();
//                         }
//                     }
//                 });
//                 if (existingConstantsId) {
//                     setReadOnlyLeaveIds(prev => [...prev, existingConstantsId]);
//                 }
//             } else {
//                 Swal.fire({
//                     icon: 'error',
//                     title: 'Save Failed',
//                     text: errorMessage,
//                 });
//             }
//             setError(`Error during Save and Freeze: ${errorMessage}`);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleAddNew = () => {
//         setNewLeave({ type: "", days: "" });
//         setOpenForm(true);
//     };

//     const handleSaveNew = async () => {
//         if (!newLeave.type.trim() || newLeave.days === "") {
//             Swal.fire({
//                 icon: 'warning',
//                 title: 'Missing Information',
//                 text: 'Leave Type and Days per year are required.',
//             });
//             return;
//         }

//         const payload = mapStateToApi(newLeave);

//         try {
//             const response = await fetch(API_BASE_URL, {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                     Authorization: `Bearer ${accessToken}`,
//                 },
//                 body: JSON.stringify(payload),
//             });

//             if (!response.ok) {
//                 const errorData = await response.json().catch(() => ({}));
//                 throw new Error(
//                     errorData.detail || `Failed to create new leave type.`
//                 );
//             }

//             setOpenForm(false);
//             fetchLeaveTypes();
//             Swal.fire({
//                 icon: 'success',
//                 title: 'Leave Type Added!',
//                 text: 'New leave type has been successfully added.',
//             });
//         } catch (e) {
//             console.error("Save new operation failed:", e);
//             Swal.fire({
//                 icon: 'error',
//                 title: 'Error',
//                 text: `Error adding new leave type: ${e.message}`,
//             });
//         }
//     };

//     const handleDelete = async (leaveToDelete) => {
//         Swal.fire({
//             title: 'Are you sure?',
//             text: `You are about to delete "${leaveToDelete.type}". This action cannot be undone.`,
//             icon: 'warning',
//             showCancelButton: true,
//             confirmButtonColor: '#d33',
//             cancelButtonColor: '#3085d6',
//             confirmButtonText: 'Yes, delete it!'
//         }).then(async (result) => {
//             if (result.isConfirmed) {
//                 try {
//                     const response = await fetch(`${API_BASE_URL}${leaveToDelete.id}/`, {
//                         method: "DELETE",
//                         headers: {
//                             Authorization: `Bearer ${accessToken}`,
//                         },
//                     });

//                     if (!response.ok) {
//                         throw new Error("Failed to delete leave type.");
//                     }

//                     Swal.fire(
//                         'Deleted!',
//                         'The leave type has been deleted.',
//                         'success'
//                     );
//                     fetchLeaveTypes();
//                 } catch (e) {
//                     console.error("Delete operation failed:", e);
//                     Swal.fire({
//                         icon: 'error',
//                         title: 'Error',
//                         text: `Error deleting leave type: ${e.message}`,
//                     });
//                 }
//             }
//         });
//     };

//     const filteredLeaveTypes = leaveTypes
//         .filter((item) =>
//             item.type.toLowerCase().includes(searchTerm.toLowerCase())
//         );

//     const paginatedLeaveTypes = filteredLeaveTypes.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

//     const handleChangePage = (event, newPage) => {
//         setPage(newPage);
//     };

//     const handleChangeRowsPerPage = (event) => {
//         setRowsPerPage(parseInt(event.target.value, 10));
//         setPage(0);
//     };

//     return (
//         <ThemeProvider theme={theme}>
//             <Box sx={{ p: { xs: 2, sm: 3 }, bgcolor: 'background.default', minHeight: '100vh' }}>
//                 <Paper elevation={3} sx={{ p: { xs: 2, sm: 3 } }}>
//                     <Box sx={{
//                         display: 'flex',
//                         flexDirection: { xs: 'column', sm: 'row' },
//                         justifyContent: 'space-between',
//                         alignItems: { xs: 'flex-start', sm: 'center' },
//                         mb: 3,
//                         gap: { xs: 2, sm: 0 }
//                     }}>
//                         <Typography variant="h5" fontWeight="bold">Leave Type Setup</Typography>
//                         <Button
//                             variant="contained"
//                             color="primary"
//                             startIcon={<AddIcon />}
//                             onClick={handleAddNew}
//                             sx={{ width: { xs: '100%', sm: 'auto' } }}
//                         >
//                             Add New Leave Type
//                         </Button>
//                     </Box>

//                     {successMessage && (
//                         <Alert severity="success" sx={{ mb: 2 }}>
//                             {successMessage}
//                         </Alert>
//                     )}
//                     {error && (
//                         <Alert severity="error" sx={{ mb: 2 }}>
//                             {error}
//                         </Alert>
//                     )}

//                     <Box sx={{
//                         display: 'flex',
//                         flexDirection: { xs: 'column', sm: 'row' },
//                         justifyContent: 'space-between',
//                         alignItems: { xs: 'flex-start', sm: 'center' },
//                         mb: 2,
//                         gap: { xs: 2, sm: 0 }
//                     }}>
//                         <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                             <Typography variant="body2" color="textSecondary">Show</Typography>
//                             <FormControl size="small" sx={{ minWidth: 70 }}>
//                                 <Select
//                                     value={rowsPerPage}
//                                     onChange={handleChangeRowsPerPage}
//                                     displayEmpty
//                                     inputProps={{ 'aria-label': 'rows per page' }}
//                                 >
//                                     <MenuItem value={5}>5</MenuItem>
//                                     <MenuItem value={10}>10</MenuItem>
//                                     <MenuItem value={25}>25</MenuItem>
//                                     <MenuItem value={50}>50</MenuItem>
//                                 </Select>
//                             </FormControl>
//                             <Typography variant="body2" color="textSecondary">entries</Typography>
//                         </Box>
//                         <TextField
//                             size="small"
//                             placeholder="Search leave types..."
//                             value={searchTerm}
//                             onChange={(e) => {
//                                 setSearchTerm(e.target.value);
//                                 setPage(0);
//                             }}
//                             InputProps={{
//                                 startAdornment: (
//                                     <SearchIcon color="action" sx={{ mr: 1 }} />
//                                 ),
//                             }}
//                             sx={{ width: { xs: '100%', sm: '200px' } }}
//                         />
//                     </Box>

//                     <TableContainer component={Paper} elevation={1}>
//                         <Table aria-label="leave types table" size={isSmallScreen ? "small" : "medium"}>
//                             <TableHead>
//                                 <TableRow>
//                                     <TableCell>LEAVE TYPE</TableCell>
//                                     <TableCell>DAYS PER YEAR</TableCell>
//                                     <TableCell align="center">ACTIONS</TableCell>
//                                 </TableRow>
//                             </TableHead>
//                             <TableBody>
//                                 {loading ? (
//                                     <TableRow>
//                                         <TableCell colSpan={3} sx={{ textAlign: "center", py: 4 }}>
//                                             <CircularProgress size={24} />
//                                             <Typography variant="body2">Loading...</Typography>
//                                         </TableCell>
//                                     </TableRow>
//                                 ) : paginatedLeaveTypes.length === 0 && filteredLeaveTypes.length === 0 ? (
//                                     <TableRow><TableCell colSpan={3} align="center" sx={{ py: 4 }}>No leave types found for the selected year.</TableCell></TableRow>
//                                 ) : paginatedLeaveTypes.length === 0 ? (
//                                     <TableRow><TableCell colSpan={3} align="center" sx={{ py: 4 }}>No matching leave types found for your search.</TableCell></TableRow>
//                                 ) : (
//                                     paginatedLeaveTypes.map((row) => {
//                                         const isReadOnly = readOnlyLeaveIds.includes(row.id);
//                                         return (
//                                             <TableRow key={row.id} hover>
//                                                 <TableCell>
//                                                     <TextField
//                                                         variant="outlined"
//                                                         size="small"
//                                                         fullWidth
//                                                         value={currentTableData[row.id]?.type || ""}
//                                                         onChange={(e) =>
//                                                             handleInlineChange(row.id, "type", e.target.value)
//                                                         }
//                                                         InputProps={{
//                                                             readOnly: isReadOnly,
//                                                         }}
//                                                         sx={{
//                                                             '& .MuiInputBase-input.Mui-disabled': {
//                                                                 WebkitTextFillColor: 'rgba(0, 0, 0, 0.87)',
//                                                             },
//                                                         }}
//                                                     />
//                                                 </TableCell>
//                                                 <TableCell>
//                                                     <TextField
//                                                         variant="outlined"
//                                                         size="small"
//                                                         fullWidth
//                                                         type="number"
//                                                         value={currentTableData[row.id]?.days || ""}
//                                                         onChange={(e) =>
//                                                             handleInlineChange(
//                                                                 row.id,
//                                                                 "days",
//                                                                 Math.max(0, parseInt(e.target.value, 10) || 0)
//                                                             )
//                                                         }
//                                                         InputProps={{
//                                                             inputProps: { min: 0 },
//                                                             readOnly: isReadOnly,
//                                                         }}
//                                                         sx={{
//                                                             '& .MuiInputBase-input.Mui-disabled': {
//                                                                 WebkitTextFillColor: 'rgba(0, 0, 0, 0.87)',
//                                                             },
//                                                             '& input[type=number]::-webkit-inner-spin-button, & input[type=number]::-webkit-outer-spin-button': {
//                                                                 '-webkit-appearance': 'none',
//                                                                 margin: 0,
//                                                             },
//                                                             '& input[type=number]': {
//                                                                 '-moz-appearance': 'textfield',
//                                                             },
//                                                         }}
//                                                     />
//                                                 </TableCell>
//                                                 <TableCell align="center">
//                                                     <IconButton
//                                                         onClick={() => handleDelete(row)}
//                                                         color="error"
//                                                         disabled={isReadOnly}
//                                                         size="small"
//                                                     >
//                                                         <Delete />
//                                                     </IconButton>
//                                                 </TableCell>
//                                             </TableRow>
//                                         );
//                                     })
//                                 )}
//                             </TableBody>
//                         </Table>
//                     </TableContainer>

//                     <Box sx={{
//                         display: 'flex',
//                         flexDirection: { xs: 'column', sm: 'row' },
//                         justifyContent: 'space-between',
//                         alignItems: { xs: 'flex-start', sm: 'center' },
//                         mt: 2,
//                         gap: { xs: 2, sm: 0 }
//                     }}>
//                         <Typography variant="body2" color="textSecondary" sx={{ ml: { xs: 0, sm: 2 } }}>
//                             Showing {page * rowsPerPage + (paginatedLeaveTypes.length > 0 ? 1 : 0)} to {page * rowsPerPage + paginatedLeaveTypes.length} of {filteredLeaveTypes.length} records
//                         </Typography>
//                         <TablePagination
//                             rowsPerPageOptions={[]}
//                             component="div"
//                             count={filteredLeaveTypes.length}
//                             rowsPerPage={rowsPerPage}
//                             page={page}
//                             onPageChange={handleChangePage}
//                             labelDisplayedRows={() => ''}
//                             sx={{
//                                 '& .MuiTablePagination-toolbar': {
//                                     paddingLeft: { xs: 0, sm: 2 },
//                                     paddingRight: { xs: 0, sm: 2 },
//                                     justifyContent: { xs: 'center', sm: 'flex-end' },
//                                 },
//                                 '& .MuiTablePagination-selectLabel, & .MuiTablePagination-select': {
//                                     display: 'none',
//                                 },
//                                 flexShrink: 0,
//                             }}
//                         />
//                     </Box>

//                     <Stack
//                         direction={isSmallScreen ? "column" : "row"}
//                         justifyContent="flex-end"
//                         alignItems={isSmallScreen ? "flex-start" : "center"}
//                         spacing={2}
//                         mt={3}
//                     >
//                         <FormControl size="small" sx={{ minWidth: 120, width: isSmallScreen ? '100%' : 'auto' }}>
//                             <InputLabel id="select-year-label">Select Year</InputLabel>
//                             <Select
//                                 labelId="select-year-label"
//                                 value={selectedYear}
//                                 label="Select Year"
//                                 onChange={(e) => setSelectedYear(e.target.value)}
//                             >
//                                 {[...Array(11)].map((_, i) => {
//                                     const year = new Date().getFullYear() - 5 + i;
//                                     return <MenuItem key={year} value={year}>{year}</MenuItem>;
//                                 })}
//                             </Select>
//                         </FormControl>
//                         <Button
//                             variant="contained"
//                             onClick={handleSaveAndFreeze}
//                             disabled={!hasChanges() || loading}
//                             sx={{ bgcolor: "#4CAF50", color: "white", width: { xs: '100%', sm: 'auto' } }}
//                             size="medium"
//                         >
//                             {loading ? <CircularProgress size={24} color="inherit" /> : "Save And Freeze"}
//                         </Button>
//                     </Stack>

//                     <Dialog
//                         open={openForm}
//                         onClose={() => setOpenForm(false)}
//                         fullWidth
//                         maxWidth="sm"
//                     >
//                         <DialogTitle fontWeight="bold">Add </DialogTitle>
//                         <Divider />
//                         <DialogContent dividers>
//                             <Box display="flex" flexDirection="column" gap={3}>
//                                 <Alert severity="info" sx={{ fontSize: isSmallScreen ? "0.875rem" : "1rem" }}>
//                                     Whatever changes you will make will be effective from 1st Jan.
//                                 </Alert>

//                                 <TextField
//                                     label="Leave Type *"
//                                     fullWidth
//                                     value={newLeave.type}
//                                     onChange={(e) =>
//                                         setNewLeave({ ...newLeave, type: e.target.value })
//                                     }
//                                     size="medium"
//                                 />
//                                 <TextField
//                                     label="Days per year *"
//                                     type="number"
//                                     fullWidth
//                                     value={newLeave.days}
//                                     onChange={(e) =>
//                                         setNewLeave({ ...newLeave, days: Math.max(0, parseInt(e.target.value, 10) || 0) })
//                                     }
//                                     InputProps={{ inputProps: { min: 0 } }}
//                                     sx={{
//                                         '& input[type=number]::-webkit-inner-spin-button, & input[type=number]::-webkit-outer-spin-button': {
//                                             '-webkit-appearance': 'none',
//                                             margin: 0,
//                                         },
//                                         '& input[type=number]': {
//                                             '-moz-appearance': 'textfield',
//                                         },
//                                     }}
//                                     size="medium"
//                                 />
//                             </Box>
//                         </DialogContent>
//                         <DialogActions sx={{ p: 2 }}>
//                             <Button onClick={() => setOpenForm(false)} color="inherit" size="medium">Cancel</Button>
//                             <Button
//                                 onClick={handleSaveNew}
//                                 variant="contained"
//                                 color="primary"
//                                 size="medium"
//                             >
//                                 Save
//                             </Button>
//                         </DialogActions>
//                     </Dialog>
//                 </Paper>
//             </Box>
//         </ThemeProvider>
//     );
// };

// export default LeaveSetup;









// import React, { useState, useEffect, useCallback } from "react";
// import {
//     Box,
//     Button,
//     Dialog,
//     DialogTitle,
//     DialogContent,
//     DialogActions,
//     FormControl,
//     InputLabel,
//     MenuItem,
//     Select,
//     Table,
//     TableBody,
//     TableCell,
//     TableContainer,
//     TableHead,
//     TableRow,
//     TextField,
//     Typography,
//     Paper,
//     IconButton,
//     Alert,
//     CircularProgress,
//     useMediaQuery,
//     useTheme,
//     Stack,
//     Divider,
//     createTheme,
//     ThemeProvider,
//     TablePagination
// } from "@mui/material";
// import { Delete, Add as AddIcon, Search as SearchIcon } from "@mui/icons-material";
// import Swal from 'sweetalert2';

// // Updated theme with the new color scheme
// const theme = createTheme({
//     palette: {
//         primary: {
//             main: '#8C257C', // Purple
//             dark: '#631b57',
//         },
//         secondary: {
//             main: '#F58E35', // Orange
//         },
//         warning: {
//             main: '#f59e0b',
//         },
//         error: {
//             main: '#ef4444',
//         },
//         background: {
//             default: '#f4f6f8',
//         },
//     },
//     components: {
//         MuiButton: {
//             styleOverrides: {
//                 containedPrimary: {
//                     color: 'white',
//                 },
//                 containedSecondary: {
//                     color: 'white',
//                 }
//             }
//         },
//         MuiTableCell: {
//             styleOverrides: {
//                 head: {
//                     backgroundColor: '#8C257C', // Table header purple
//                     color: 'white',
//                     fontWeight: '600',
//                     textTransform: 'uppercase',
//                     fontSize: '0.75rem',
//                 },
//             },
//         },
//         MuiPaper: {
//             styleOverrides: {
//                 root: {
//                     borderRadius: '8px',
//                 }
//             }
//         },
//         MuiTablePagination: {
//             styleOverrides: {
//                 // Hides the built-in "Rows per page" control since we have a custom one
//                 selectLabel: {
//                     display: 'none',
//                 },
//                 select: {
//                     display: 'none',
//                 },
//                 // Adjustments for cleaner alignment
//                 toolbar: {
//                     padding: '0 !important',
//                 },
//             },
//         },
//     }
// });

// const API_BASE_URL = "https://tdtlworld.com/hrms-backend/api/leave-setup/";
// const SAVE_AND_FREEZE_API_URL = "https://tdtlworld.com/hrms-backend/apis/save_and_freeze_leave_setup/";

// const mapApiToState = (apiData) => ({
//     id: apiData.constants_id,
//     type: apiData.leave_type || "",
//     days: apiData.days_per_year || 0,
// });

// const mapStateToApi = (stateData) => ({
//     category_name: stateData.type,
//     field_one: String(stateData.days),
// });

// const LeaveSetup = () => {
//     const muiTheme = useTheme();
//     const isSmallScreen = useMediaQuery(muiTheme.breakpoints.down("sm"));

//     const [leaveTypes, setLeaveTypes] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [successMessage, setSuccessMessage] = useState(null);
//     const [readOnlyLeaveIds, setReadOnlyLeaveIds] = useState([]);

//     const [searchTerm, setSearchTerm] = useState("");
//     const [openForm, setOpenForm] = useState(false);
//     const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

//     const [newLeave, setNewLeave] = useState({
//         type: "",
//         days: "",
//     });

//     const [currentTableData, setCurrentTableData] = useState({});

//     const [page, setPage] = useState(0);
//     const [rowsPerPage, setRowsPerPage] = useState(10); // Standardized to 10

//     const accessToken = localStorage.getItem("accessToken");

//     const hasChanges = useCallback(() => {
//         if (Object.keys(currentTableData).length !== leaveTypes.length) {
//             return true;
//         }

//         for (const originalLeave of leaveTypes) {
//             const currentLeave = currentTableData[originalLeave.id];
//             if (!currentLeave) return true;
//             if (String(currentLeave.type) !== String(originalLeave.type) || String(currentLeave.days) !== String(originalLeave.days)) {
//                 return true;
//             }
//         }
//         return false;
//     }, [currentTableData, leaveTypes]);

//     const fetchLeaveTypes = useCallback(async () => {
//         setLoading(true);
//         setError(null);
//         setSuccessMessage(null);
//         setReadOnlyLeaveIds([]);

//         if (!accessToken) {
//             setError("Authentication token not found. Please log in again.");
//             setLoading(false);
//             return;
//         }

//         try {
//             const response = await fetch(`${API_BASE_URL}?year=${selectedYear}`, {
//                 headers: {
//                     Authorization: `Bearer ${accessToken}`,
//                 },
//             });

//             if (!response.ok) {
//                 if (response.status === 404) {
//                     setLeaveTypes([]);
//                     setCurrentTableData({});
//                     return;
//                 }
//                 throw new Error(`Failed to fetch data. Status: ${response.status}`);
//             }
//             const data = await response.json();

//             if (Array.isArray(data)) {
//                 const mappedData = data.map(mapApiToState);
//                 setLeaveTypes(mappedData);
//                 const initialTableState = mappedData.reduce((acc, item) => {
//                     acc[item.id] = { ...item };
//                     return acc;
//                 }, {});
//                 setCurrentTableData(initialTableState);
//             } else {
//                 throw new Error("Received invalid data format from server.");
//             }
//         } catch (e) {
//             console.error("Failed to fetch leave types:", e);
//             setError(e.message || "An unexpected error occurred.");
//         } finally {
//             setLoading(false);
//         }
//     }, [accessToken, selectedYear]);

//     useEffect(() => {
//         fetchLeaveTypes();
//     }, [fetchLeaveTypes]);

//     const handleInlineChange = (id, field, value) => {
//         setCurrentTableData((prev) => ({
//             ...prev,
//             [id]: {
//                 ...prev[id],
//                 [field]: value,
//             },
//         }));
//     };

//     const handleSaveAndFreeze = async () => {
//         setLoading(true);
//         setError(null);
//         setSuccessMessage(null);
//         setReadOnlyLeaveIds([]);

//         if (!accessToken) {
//             setError("Authentication token not found. Please log in again.");
//             setLoading(false);
//             return;
//         }

//         try {
//             const saveAndFreezePayloads = leaveTypes.map(originalLeave => {
//                 const currentLeave = currentTableData[originalLeave.id];
//                 return {
//                     constants_id: originalLeave.id,
//                     leave_type: originalLeave.type,
//                     days_per_year: String(originalLeave.days),
//                     current_leave_name: currentLeave?.type || originalLeave.type,
//                     current_leave_days: String(currentLeave?.days || originalLeave.days),
//                     year: String(selectedYear),
//                 };
//             });

//             const saveAndFreezeResponse = await fetch(SAVE_AND_FREEZE_API_URL, {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                     Authorization: `Bearer ${accessToken}`,
//                 },
//                 body: JSON.stringify(saveAndFreezePayloads),
//             });

//             if (!saveAndFreezeResponse.ok) {
//                 const errorData = await saveAndFreezeResponse.json().catch(() => ({}));
//                 throw new Error(
//                     errorData.error || errorData.detail || `Failed to save and freeze leave setup.`
//                 );
//             }

//             const saveAndFreezeSuccess = await saveAndFreezeResponse.json();
//             setSuccessMessage(saveAndFreezeSuccess.message || "All changes saved and frozen successfully!");
//             fetchLeaveTypes();
//             Swal.fire({
//                 icon: 'success',
//                 title: 'Saved & Frozen!',
//                 text: saveAndFreezeSuccess.message || "All changes saved and frozen successfully!",
//             });

//         } catch (e) {
//             console.error("Save and Freeze operation failed:", e);
//             let errorMessage = e.message;
//             const regex = /constants_id (\d+) in year (\d{4})/;
//             const match = errorMessage.match(regex);

//             if (match) {
//                 const existingConstantsId = parseInt(match[1], 10);
//                 Swal.fire({
//                     icon: 'error',
//                     title: 'Save Failed',
//                     text: `Leave setup for this type already exists for the year ${match[2]}. The affected row will be made read-only.`,
//                 }).then(() => {
//                     if (existingConstantsId) {
//                         window.location.reload();
//                     }
//                 });
//                 if (existingConstantsId) {
//                     setReadOnlyLeaveIds(prev => [...prev, existingConstantsId]);
//                 }
//             } else {
//                 Swal.fire({
//                     icon: 'error',
//                     title: 'Save Failed',
//                     text: errorMessage,
//                 });
//             }
//             setError(`Error during Save and Freeze: ${errorMessage}`);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleAddNew = () => {
//         setNewLeave({ type: "", days: "" });
//         setOpenForm(true);
//     };

//     const handleSaveNew = async () => {
//         if (!newLeave.type.trim() || newLeave.days === "") {
//             Swal.fire({
//                 icon: 'warning',
//                 title: 'Missing Information',
//                 text: 'Leave Type and Days per year are required.',
//             });
//             return;
//         }

//         const payload = mapStateToApi(newLeave);

//         try {
//             const response = await fetch(API_BASE_URL, {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                     Authorization: `Bearer ${accessToken}`,
//                 },
//                 body: JSON.stringify(payload),
//             });

//             if (!response.ok) {
//                 const errorData = await response.json().catch(() => ({}));
//                 throw new Error(
//                     errorData.detail || `Failed to create new leave type.`
//                 );
//             }

//             setOpenForm(false);
//             fetchLeaveTypes();
//             Swal.fire({
//                 icon: 'success',
//                 title: 'Leave Type Added!',
//                 text: 'New leave type has been successfully added.',
//             });
//         } catch (e) {
//             console.error("Save new operation failed:", e);
//             Swal.fire({
//                 icon: 'error',
//                 title: 'Error',
//                 text: `Error adding new leave type: ${e.message}`,
//             });
//         }
//     };

//     const handleDelete = async (leaveToDelete) => {
//         Swal.fire({
//             title: 'Are you sure?',
//             text: `You are about to delete "${leaveToDelete.type}". This action cannot be undone.`,
//             icon: 'warning',
//             showCancelButton: true,
//             confirmButtonColor: '#d33',
//             cancelButtonColor: '#3085d6',
//             confirmButtonText: 'Yes, delete it!'
//         }).then(async (result) => {
//             if (result.isConfirmed) {
//                 try {
//                     const response = await fetch(`${API_BASE_URL}${leaveToDelete.id}/`, {
//                         method: "DELETE",
//                         headers: {
//                             Authorization: `Bearer ${accessToken}`,
//                         },
//                     });

//                     if (!response.ok) {
//                         throw new Error("Failed to delete leave type.");
//                     }

//                     Swal.fire(
//                         'Deleted!',
//                         'The leave type has been deleted.',
//                         'success'
//                     );
//                     fetchLeaveTypes();
//                 } catch (e) {
//                     console.error("Delete operation failed:", e);
//                     Swal.fire({
//                         icon: 'error',
//                         title: 'Error',
//                         text: `Error deleting leave type: ${e.message}`,
//                     });
//                 }
//             }
//         });
//     };

//     const filteredLeaveTypes = leaveTypes
//         .filter((item) =>
//             item.type.toLowerCase().includes(searchTerm.toLowerCase())
//         );

//     const paginatedLeaveTypes = filteredLeaveTypes.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

//     const handleChangePage = (event, newPage) => {
//         setPage(newPage);
//     };

//     const handleChangeRowsPerPage = (event) => {
//         setRowsPerPage(parseInt(event.target.value, 10));
//         setPage(0);
//     };

//     return (
//         <ThemeProvider theme={theme}>
//             <Box sx={{ p: { xs: 2, sm: 3 }, bgcolor: 'background.default', minHeight: '100vh' }}>
//                 <Paper elevation={3} sx={{ p: { xs: 2, sm: 3 } }}>
//                     <Box sx={{
//                         display: 'flex',
//                         flexDirection: { xs: 'column', sm: 'row' },
//                         justifyContent: 'space-between',
//                         alignItems: { xs: 'flex-start', sm: 'center' },
//                         mb: 3,
//                         gap: 2
//                     }}>
//                         <Typography variant="h5" fontWeight="bold">Leave Type Setup</Typography>
//                         <Button
//                             variant="contained"
//                             color="primary"
//                             startIcon={<AddIcon />}
//                             onClick={handleAddNew}
//                             sx={{ width: { xs: '100%', sm: 'auto' } }}
//                         >
//                             Add New Leave Type
//                         </Button>
//                     </Box>

//                     {successMessage && <Alert severity="success" sx={{ mb: 2 }}>{successMessage}</Alert>}
//                     {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

//                     {/* Standardized Top Controls: Rows per page (Left) and Search (Right) */}
//                     <Box sx={{
//                         display: 'flex',
//                         flexDirection: { xs: 'column', sm: 'row' },
//                         justifyContent: 'space-between',
//                         alignItems: { sm: 'center' },
//                         mb: 2,
//                         gap: 2
//                     }}>
//                         <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                             <Typography variant="body2" color="textSecondary">Show</Typography>
//                             <FormControl size="small" sx={{ minWidth: 70 }}>
//                                 <Select
//                                     value={rowsPerPage}
//                                     onChange={handleChangeRowsPerPage}
//                                 >
//                                     <MenuItem value={5}>5</MenuItem>
//                                     <MenuItem value={10}>10</MenuItem>
//                                     <MenuItem value={25}>25</MenuItem>
//                                     <MenuItem value={50}>50</MenuItem>
//                                 </Select>
//                             </FormControl>
//                             <Typography variant="body2" color="textSecondary">entries</Typography>
//                         </Box>

//                         <TextField
//                             size="small"
//                             placeholder="Search..."
//                             value={searchTerm}
//                             onChange={(e) => {
//                                 setSearchTerm(e.target.value);
//                                 setPage(0);
//                             }}
//                             InputProps={{
//                                 startAdornment: (<SearchIcon color="action" sx={{ mr: 1 }} />),
//                             }}
//                             sx={{ width: { xs: '100%', sm: '250px' } }}
//                         />
//                     </Box>

//                     <TableContainer component={Paper} elevation={1}>
//                         <Table aria-label="leave types table" size={isSmallScreen ? "small" : "medium"}>
//                             <TableHead>
//                                 <TableRow>
//                                     <TableCell>LEAVE TYPE</TableCell>
//                                     <TableCell>DAYS PER YEAR</TableCell>
//                                     <TableCell align="center">ACTIONS</TableCell>
//                                 </TableRow>
//                             </TableHead>
//                             <TableBody>
//                                 {loading ? (
//                                     <TableRow>
//                                         <TableCell colSpan={3} align="center" sx={{ py: 5 }}>
//                                             <CircularProgress />
//                                             <Typography>Loading...</Typography>
//                                         </TableCell>
//                                     </TableRow>
//                                 ) : paginatedLeaveTypes.length === 0 ? (
//                                     <TableRow>
//                                         <TableCell colSpan={3} align="center" sx={{ py: 5 }}>
//                                             {filteredLeaveTypes.length === 0 ? 'No leave types found.' : 'No results found for your search.'}
//                                         </TableCell>
//                                     </TableRow>
//                                 ) : (
//                                     paginatedLeaveTypes.map((row) => {
//                                         const isReadOnly = readOnlyLeaveIds.includes(row.id);
//                                         return (
//                                             <TableRow key={row.id} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
//                                                 <TableCell component="th" scope="row">
//                                                     <TextField
//                                                         fullWidth variant="outlined" size="small"
//                                                         value={currentTableData[row.id]?.type || ""}
//                                                         onChange={(e) => handleInlineChange(row.id, "type", e.target.value)}
//                                                         InputProps={{ readOnly: isReadOnly }}
//                                                         disabled={isReadOnly}
//                                                     />
//                                                 </TableCell>
//                                                 <TableCell>
//                                                     <TextField
//                                                         fullWidth variant="outlined" size="small" type="number"
//                                                         value={currentTableData[row.id]?.days || ""}
//                                                         onChange={(e) => handleInlineChange(row.id, "days", Math.max(0, parseInt(e.target.value, 10) || 0))}
//                                                         InputProps={{ inputProps: { min: 0 }, readOnly: isReadOnly }}
//                                                         disabled={isReadOnly}
//                                                         sx={{ '& input[type=number]::-webkit-inner-spin-button, & input[type=number]::-webkit-outer-spin-button': { '-webkit-appearance': 'none', margin: 0 }, '& input[type=number]': { '-moz-appearance': 'textfield' } }}
//                                                     />
//                                                 </TableCell>
//                                                 <TableCell align="center">
//                                                     <IconButton onClick={() => handleDelete(row)} color="error" disabled={isReadOnly} size="small">
//                                                         <Delete />
//                                                     </IconButton>
//                                                 </TableCell>
//                                             </TableRow>
//                                         );
//                                     })
//                                 )}
//                             </TableBody>
//                         </Table>
//                     </TableContainer>

//                     {/* Standardized Bottom Controls: Record count (Left) and Pagination (Right) */}
//                     <Box sx={{
//                         display: 'flex',
//                         flexDirection: { xs: 'column', sm: 'row' },
//                         justifyContent: 'space-between',
//                         alignItems: { sm: 'center' },
//                         mt: 2,
//                         gap: 2
//                     }}>
//                         <Typography variant="body2" color="textSecondary">
//                             Showing {filteredLeaveTypes.length > 0 ? page * rowsPerPage + 1 : 0} to {Math.min((page + 1) * rowsPerPage, filteredLeaveTypes.length)} of {filteredLeaveTypes.length} records
//                         </Typography>
//                         <TablePagination
//                             component="div"
//                             count={filteredLeaveTypes.length}
//                             rowsPerPage={rowsPerPage}
//                             page={page}
//                             onPageChange={handleChangePage}
//                             rowsPerPageOptions={[]} // Hide rows per page selector here as it's at the top
//                             labelDisplayedRows={() => ''} // Hide the "x-y of z" label as we have a custom one
//                         />
//                     </Box>

//                     <Stack
//                         direction={isSmallScreen ? "column" : "row"}
//                         justifyContent="flex-end"
//                         alignItems={isSmallScreen ? "stretch" : "center"}
//                         spacing={2}
//                         mt={3}
//                     >
//                         <FormControl size="small" sx={{ minWidth: 120, width: isSmallScreen ? '100%' : 'auto' }}>
//                             <InputLabel id="select-year-label">Select Year</InputLabel>
//                             <Select
//                                 labelId="select-year-label"
//                                 value={selectedYear}
//                                 label="Select Year"
//                                 onChange={(e) => setSelectedYear(e.target.value)}
//                             >
//                                 {[...Array(11)].map((_, i) => {
//                                     const year = new Date().getFullYear() - 5 + i;
//                                     return <MenuItem key={year} value={year}>{year}</MenuItem>;
//                                 })}
//                             </Select>
//                         </FormControl>
//                         <Button
//                             variant="contained"
//                             color="secondary" // Use Orange from theme
//                             onClick={handleSaveAndFreeze}
//                             disabled={!hasChanges() || loading}
//                             sx={{ width: { xs: '100%', sm: 'auto' } }}
//                             size="medium"
//                         >
//                             {loading ? <CircularProgress size={24} color="inherit" /> : "Save And Freeze"}
//                         </Button>
//                     </Stack>

//                     <Dialog open={openForm} onClose={() => setOpenForm(false)} fullWidth maxWidth="sm">
//                         <DialogTitle fontWeight="bold">Add New Leave Type</DialogTitle>
//                         <Divider />
//                         <DialogContent dividers>
//                             <Stack spacing={3}>
//                                 <Alert severity="info">
//                                     Changes made here will be effective from 1st January of the selected year.
//                                 </Alert>
//                                 <TextField
//                                     label="Leave Type *"
//                                     fullWidth
//                                     value={newLeave.type}
//                                     onChange={(e) => setNewLeave({ ...newLeave, type: e.target.value })}
//                                 />
//                                 <TextField
//                                     label="Days per year *"
//                                     type="number"
//                                     fullWidth
//                                     value={newLeave.days}
//                                     onChange={(e) => setNewLeave({ ...newLeave, days: Math.max(0, parseInt(e.target.value, 10) || '') })}
//                                     InputProps={{ inputProps: { min: 0 } }}
//                                     sx={{ '& input[type=number]::-webkit-inner-spin-button, & input[type=number]::-webkit-outer-spin-button': { '-webkit-appearance': 'none', margin: 0 }, '& input[type=number]': { '-moz-appearance': 'textfield' } }}
//                                 />
//                             </Stack>
//                         </DialogContent>
//                         <DialogActions sx={{ p: 2 }}>
//                             <Button onClick={() => setOpenForm(false)} color="inherit">Cancel</Button>
//                             <Button onClick={handleSaveNew} variant="contained" color="primary">Save</Button>
//                         </DialogActions>
//                     </Dialog>
//                 </Paper>
//             </Box>
//         </ThemeProvider>
//     );
// };

// export default LeaveSetup;

















// import React, { useState, useEffect, useCallback } from "react";
// import {
//     Box,
//     Button,
//     Dialog,
//     DialogTitle,
//     DialogContent,
//     DialogActions,
//     Table,
//     TableBody,
//     TableCell,
//     TableContainer,
//     TableHead,
//     TableRow,
//     TextField,
//     Typography,
//     Paper,
//     IconButton,
//     CircularProgress,
//     useMediaQuery,
//     useTheme as useMuiTheme,
//     Stack,
//     createTheme,
//     ThemeProvider,
//     TablePagination,
//     Skeleton
// } from "@mui/material";
// import { Delete, Add as AddIcon, Search as SearchIcon } from "@mui/icons-material";
// import Swal from 'sweetalert2';

// const theme = createTheme({
//     palette: {
//         primary: {
//             main: '#8C257C',
//             dark: '#6d1d60',
//         },
//         secondary: {
//             main: '#F58E35',
//         },
//         text: {
//             primary: '#374151',
//             secondary: '#6b7280',
//         },
//         background: {
//             default: '#f4f6f8',
//         },
//     },
//     typography: {
//         fontFamily: 'inherit',
//         h5: {
//             fontWeight: 'bold',
//         },
//         body2: {
//             fontSize: '0.95rem',
//         }
//     },
//     components: {
//         MuiButton: {
//             styleOverrides: {
//                 containedPrimary: {
//                     color: '#FFFFFF',
//                     '&:hover': {
//                         backgroundColor: '#6d1d60',
//                     }
//                 },
//             },
//         },
//         MuiTableCell: {
//             styleOverrides: {
//                 head: {
//                     backgroundColor: '#8C257C',
//                     color: '#FFFFFF',
//                     fontWeight: 'bold',
//                     textTransform: 'uppercase',
//                 },
//             },
//         },
//         MuiTablePagination: {
//             styleOverrides: {
//                 root: {
//                     color: '#8C257C',
//                 },
//                 selectIcon: {
//                     color: '#8C257C',
//                 },
//                 actions: {
//                     color: '#8C257C',
//                 }
//             }
//         },
//     },
// });

// const API_BASE_URL = "https://tdtlworld.com/hrms-backend/api/leave-setup/";
// const SAVE_AND_FREEZE_API_URL = "https://tdtlworld.com/hrms-backend/apis/save_and_freeze_leave_setup/";

// const mapApiToState = (apiData) => ({
//     id: apiData.constants_id,
//     type: apiData.leave_type || "",
//     days: apiData.days_per_year || 0,
// });

// const mapStateToApi = (stateData) => ({
//     category_name: stateData.type,
//     field_one: String(stateData.days),
// });

// const LeaveSetup = () => {
//     const muiTheme = useMuiTheme();
//     const isSmallScreen = useMediaQuery(muiTheme.breakpoints.down("sm"));

//     const [leaveTypes, setLeaveTypes] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [saving, setSaving] = useState(false);
//     const [searchTerm, setSearchTerm] = useState("");
//     const [openForm, setOpenForm] = useState(false);
//     const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

//     const [newLeave, setNewLeave] = useState({
//         type: "",
//         days: "",
//     });

//     const [currentTableData, setCurrentTableData] = useState({});
//     const [page, setPage] = useState(0);
//     const [rowsPerPage, setRowsPerPage] = useState(10);

//     const accessToken = localStorage.getItem("accessToken");

//     const hasChanges = useCallback(() => {
//         if (Object.keys(currentTableData).length !== leaveTypes.length) return true;
//         for (const originalLeave of leaveTypes) {
//             const currentLeave = currentTableData[originalLeave.id];
//             if (!currentLeave) return true;
//             if (String(currentLeave.type) !== String(originalLeave.type) || String(currentLeave.days) !== String(originalLeave.days)) {
//                 return true;
//             }
//         }
//         return false;
//     }, [currentTableData, leaveTypes]);

//     const fetchLeaveTypes = useCallback(async () => {
//         setLoading(true);
//         if (!accessToken) {
//             Swal.fire({
//                 icon: 'error',
//                 title: 'Authentication Error',
//                 text: 'Authentication token not found. Please log in again.',
//                 timer: 3000,
//                 showConfirmButton: false
//             });
//             setLoading(false);
//             return;
//         }

//         try {
//             const response = await fetch(`${API_BASE_URL}?year=${selectedYear}`, {
//                 headers: { Authorization: `Bearer ${accessToken}` },
//             });

//             if (!response.ok) {
//                 if (response.status === 404) {
//                     setLeaveTypes([]);
//                     setCurrentTableData({});
//                     return;
//                 }
//                 throw new Error(`Failed to fetch data. Status: ${response.status}`);
//             }
//             const data = await response.json();

//             if (Array.isArray(data)) {
//                 const mappedData = data.map(mapApiToState);
//                 setLeaveTypes(mappedData);
//                 const initialTableState = mappedData.reduce((acc, item) => {
//                     acc[item.id] = { ...item };
//                     return acc;
//                 }, {});
//                 setCurrentTableData(initialTableState);
//             } else {
//                 throw new Error("Invalid data format from server.");
//             }
//         } catch (e) {
//             Swal.fire({
//                 icon: 'error',
//                 title: 'Fetch Error',
//                 text: e.message || "An unexpected error occurred.",
//                 timer: 3000,
//                 showConfirmButton: false
//             });
//         } finally {
//             setLoading(false);
//         }
//     }, [accessToken, selectedYear]);

//     useEffect(() => {
//         fetchLeaveTypes();
//     }, [fetchLeaveTypes]);

//     const handleInlineChange = (id, field, value) => {
//         setCurrentTableData((prev) => ({
//             ...prev,
//             [id]: {
//                 ...prev[id],
//                 [field]: value,
//             },
//         }));
//     };

//     const handleSaveAndFreeze = async () => {
//         setSaving(true);
//         if (!accessToken) {
//             Swal.fire({
//                 icon: 'error',
//                 title: 'Authentication Error',
//                 text: 'Authentication token not found.',
//                 timer: 3000,
//                 showConfirmButton: false
//             });
//             setSaving(false);
//             return;
//         }

//         try {
//             const saveAndFreezePayloads = leaveTypes.map(originalLeave => {
//                 const currentLeave = currentTableData[originalLeave.id];
//                 return {
//                     constants_id: originalLeave.id,
//                     leave_type: originalLeave.type,
//                     days_per_year: String(originalLeave.days),
//                     current_leave_name: currentLeave?.type || originalLeave.type,
//                     current_leave_days: String(currentLeave?.days || originalLeave.days),
//                     year: String(selectedYear),
//                 };
//             });

//             const response = await fetch(SAVE_AND_FREEZE_API_URL, {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json", Authorization: `Bearer ${accessToken}` },
//                 body: JSON.stringify(saveAndFreezePayloads),
//             });

//             const result = await response.json();
//             if (!response.ok) throw new Error(result.error || result.detail || 'Failed to save and freeze.');

//             Swal.fire({
//                 icon: 'success',
//                 title: 'Saved & Frozen!',
//                 text: result.message || "All changes saved and frozen successfully!",
//                 timer: 3000,
//                 showConfirmButton: false
//             });
//             fetchLeaveTypes();
//         } catch (e) {
//             Swal.fire({
//                 icon: 'error',
//                 title: 'Save Failed',
//                 text: e.message,
//             });
//         } finally {
//             setSaving(false);
//         }
//     };

//     const handleAddNew = () => {
//         setNewLeave({ type: "", days: "" });
//         setOpenForm(true);
//     };

//     const handleSaveNew = async () => {
//         if (!newLeave.type.trim() || newLeave.days === "") {
//             Swal.fire({
//                 icon: 'warning',
//                 title: 'Missing Information',
//                 text: 'Leave Type and Days per year are required.',
//                 timer: 3000,
//                 showConfirmButton: false
//             });
//             return;
//         }

//         setSaving(true);
//         const payload = mapStateToApi(newLeave);

//         try {
//             const response = await fetch(API_BASE_URL, {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json", Authorization: `Bearer ${accessToken}` },
//                 body: JSON.stringify(payload),
//             });

//             if (!response.ok) {
//                 const errorData = await response.json();
//                 throw new Error(errorData.detail || `Failed to create new leave type.`);
//             }

//             setOpenForm(false);
//             Swal.fire({
//                 icon: 'success',
//                 title: 'Leave Type Added!',
//                 text: 'New leave type has been successfully added.',
//                 timer: 3000,
//                 showConfirmButton: false
//             });
//             fetchLeaveTypes();
//         } catch (e) {
//             Swal.fire({
//                 icon: 'error',
//                 title: 'Error',
//                 text: `Error adding new leave type: ${e.message}`,
//             });
//         } finally {
//             setSaving(false);
//         }
//     };

//     const handleDelete = (leaveToDelete) => {
//         Swal.fire({
//             title: 'Are you sure?',
//             text: `You are about to delete "${leaveToDelete.type}". This action cannot be undone.`,
//             icon: 'warning',
//             showCancelButton: true,
//             confirmButtonColor: '#d33',
//             cancelButtonColor: '#3085d6',
//             confirmButtonText: 'Yes, delete it!'
//         }).then(async (result) => {
//             if (result.isConfirmed) {
//                 try {
//                     const response = await fetch(`${API_BASE_URL}${leaveToDelete.id}/`, {
//                         method: "DELETE",
//                         headers: { Authorization: `Bearer ${accessToken}` },
//                     });

//                     if (!response.ok) throw new Error("Failed to delete leave type.");

//                     Swal.fire({
//                         icon: 'success',
//                         title: 'Deleted!',
//                         text: 'The leave type has been deleted.',
//                         timer: 3000,
//                         showConfirmButton: false
//                     });
//                     fetchLeaveTypes();
//                 } catch (e) {
//                     Swal.fire({
//                         icon: 'error',
//                         title: 'Error',
//                         text: `Error deleting leave type: ${e.message}`,
//                     });
//                 }
//             }
//         });
//     };

//     const filteredLeaveTypes = leaveTypes.filter((item) =>
//         item.type.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     const paginatedLeaveTypes = filteredLeaveTypes.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

//     const handleChangePage = (event, newPage) => setPage(newPage);

//     const handleChangeRowsPerPage = (event) => {
//         setRowsPerPage(parseInt(event.target.value, 10));
//         setPage(0);
//     };

//     const skeletonRows = Array.from(new Array(rowsPerPage));

//     return (
//         <ThemeProvider theme={theme}>
//                 <Box component={Paper} p={3}>
//                     <Typography variant="h4" color="primary" fontWeight="bold" mb={5}>
//                         Leave Type Setup
//                     </Typography>

//                     <Stack
//                         direction={isSmallScreen ? "column" : "row"}
//                         justifyContent="space-between"
//                         alignItems="center"
//                         spacing={2}
//                         mb={2}
//                     >
//                         <Button
//                             variant="contained"
//                             color="primary"
//                             startIcon={<AddIcon />}
//                             onClick={handleAddNew}
//                         >
//                             Add New Leave Type
//                         </Button>
//                         <TextField
//                             size="small"
//                             placeholder="Search ..."
//                             value={searchTerm}
//                             onChange={(e) => {
//                                 setSearchTerm(e.target.value);
//                                 setPage(0);
//                             }}
//                             InputProps={{
//                                 startAdornment: (
//                                     <SearchIcon color="action" sx={{ mr: 1 }} />
//                                 ),
//                             }}
//                             sx={{ width: isSmallScreen ? '100%' : 'auto' }}
//                         />
//                     </Stack>

//                     <TableContainer sx={{ minWidth: '100%', whiteSpace: 'nowrap' }}>
//                         <Table aria-label="leave types table">
//                             <TableHead>
//                                 <TableRow>
//                                     <TableCell>SR. NO</TableCell>
//                                     <TableCell>LEAVE TYPE</TableCell>
//                                     <TableCell>DAYS PER YEAR</TableCell>
//                                     <TableCell align="center">ACTIONS</TableCell>
//                                 </TableRow>
//                             </TableHead>
//                             <TableBody>
//                                 {loading ? (
//                                     skeletonRows.map((_, index) => (
//                                         <TableRow key={index}>
//                                             <TableCell><Skeleton variant="text" /></TableCell>
//                                             <TableCell><Skeleton variant="text" /></TableCell>
//                                             <TableCell><Skeleton variant="text" /></TableCell>
//                                             <TableCell align="center">
//                                                 <Skeleton variant="rectangular" width={40} height={30} />
//                                             </TableCell>
//                                         </TableRow>
//                                     ))
//                                 ) : paginatedLeaveTypes.length === 0 ? (
//                                     <TableRow>
//                                         <TableCell colSpan={4} align="center" sx={{ py: 4 }}>
//                                             No leave types found.
//                                         </TableCell>
//                                     </TableRow>
//                                 ) : (
//                                     paginatedLeaveTypes.map((row, index) => (
//                                         <TableRow key={row.id} hover>
//                                             <TableCell>{page * rowsPerPage + index + 1}</TableCell>
//                                             <TableCell>
//                                                 <TextField
//                                                     variant="outlined"
//                                                     size="small"
//                                                     fullWidth
//                                                     value={currentTableData[row.id]?.type || ""}
//                                                     onChange={(e) =>
//                                                         handleInlineChange(row.id, "type", e.target.value)
//                                                     }
//                                                 />
//                                             </TableCell>
//                                             <TableCell>
//                                                 <TextField
//                                                     variant="outlined"
//                                                     size="small"
//                                                     fullWidth
//                                                     type="number"
//                                                     value={currentTableData[row.id]?.days || ""}
//                                                     onChange={(e) =>
//                                                         handleInlineChange(
//                                                             row.id,
//                                                             "days",
//                                                             Math.max(0, parseInt(e.target.value, 10) || 0)
//                                                         )
//                                                     }
//                                                     InputProps={{ inputProps: { min: 0 } }}
//                                                 />
//                                             </TableCell>
//                                             <TableCell align="center">
//                                                 <Box display="flex" justifyContent="center" gap={0.5}>
//                                                     <IconButton onClick={() => handleDelete(row)} color="error" size="small">
//                                                         <Delete />
//                                                     </IconButton>
//                                                 </Box>
//                                             </TableCell>
//                                         </TableRow>
//                                     ))
//                                 )}
//                             </TableBody>
//                         </Table>
//                     </TableContainer>

//                     <Box
//                         sx={{
//                             display: 'flex',
//                             flexDirection: isSmallScreen ? 'column' : 'row',
//                             justifyContent: 'space-between',
//                             alignItems: 'center',
//                             mt: 2,
//                             gap: 2,
//                         }}
//                     >
//                         <Typography variant="body2" color="text.secondary">
//                             Showing {page * rowsPerPage + (paginatedLeaveTypes.length > 0 ? 1 : 0)} to {page * rowsPerPage + paginatedLeaveTypes.length} of {filteredLeaveTypes.length} results
//                         </Typography>
//                         <TablePagination
//                             rowsPerPageOptions={[5, 10, 15, 25]}
//                             component="div"
//                             count={filteredLeaveTypes.length}
//                             rowsPerPage={rowsPerPage}
//                             page={page}
//                             onPageChange={handleChangePage}
//                             onRowsPerPageChange={handleChangeRowsPerPage}
//                         />
//                     </Box>

//                     <Stack
//                         direction="row"
//                         justifyContent="flex-end"
//                         alignItems="center"
//                         spacing={2}
//                         mt={3}
//                     >
//                         <Button
//                             variant="contained"
//                             onClick={handleSaveAndFreeze}
//                             disabled={!hasChanges() || saving || loading}
//                             sx={{
//                                 bgcolor: "#4CAF50",
//                                 color: "white",
//                                 '&:hover': { bgcolor: '#45a049' },
//                             }}
//                         >
//                             {saving ? <CircularProgress size={24} color="inherit" /> : "Save And Freeze"}
//                         </Button>
//                     </Stack>

//                     <Dialog open={openForm} onClose={() => setOpenForm(false)} fullWidth maxWidth="sm">
//                         <DialogTitle fontWeight="bold" color="primary">Add New Leave Type</DialogTitle>
//                         <DialogContent dividers>
//                             <Stack spacing={3} py={2}>
//                                 <TextField
//                                     label="Leave Type"
//                                     fullWidth
//                                     value={newLeave.type}
//                                     onChange={(e) => setNewLeave({ ...newLeave, type: e.target.value })}
//                                 />
//                                 <TextField
//                                     label="Days per year"
//                                     type="number"
//                                     fullWidth
//                                     value={newLeave.days}
//                                     onChange={(e) =>
//                                         setNewLeave({ ...newLeave, days: Math.max(0, parseInt(e.target.value, 10) || 0) })
//                                     }
//                                     InputProps={{ inputProps: { min: 0 } }}
//                                 />
//                             </Stack>
//                         </DialogContent>
//                         <DialogActions sx={{ p: 2 }}>
//                             <Button onClick={() => setOpenForm(false)} sx={{ color: '#757575' }}>Cancel</Button>
//                             <Button
//                                 onClick={handleSaveNew}
//                                 variant="contained"
//                                 color="primary"
//                                 disabled={saving}
//                             >
//                                 {saving ? <CircularProgress size={24} color="inherit" /> : "Save"}
//                             </Button>
//                         </DialogActions>
//                     </Dialog>
//                 </Box>
//         </ThemeProvider>
//     );
// };

// export default LeaveSetup;















import React, { useState, useEffect, useCallback } from "react";
import {
    Box,
    Button,
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
    TextField,
    Typography,
    Paper,
    IconButton,
    CircularProgress,
    useMediaQuery,
    useTheme as useMuiTheme,
    Stack,
    createTheme,
    ThemeProvider,
    TablePagination,
    Skeleton
} from "@mui/material";
import { Delete, Add as AddIcon, Search as SearchIcon } from "@mui/icons-material";
import Swal from 'sweetalert2';

const theme = createTheme({
    palette: {
        primary: {
            main: '#8C257C',
            dark: '#6d1d60',
        },
        secondary: {
            main: '#F58E35',
        },
        text: {
            primary: '#374151',
            secondary: '#6b7280',
        },
        background: {
            default: '#f4f6f8',
        },
    },
    typography: {
        fontFamily: 'inherit',
        h5: {
            fontWeight: 'bold',
        },
        body2: {
            fontSize: '0.95rem',
        }
    },
    components: {
        MuiButton: {
            styleOverrides: {
                containedPrimary: {
                    color: '#FFFFFF',
                    '&:hover': {
                        backgroundColor: '#6d1d60',
                    }
                },
            },
        },
        MuiTableCell: {
            styleOverrides: {
                head: {
                    backgroundColor: '#8C257C',
                    color: '#FFFFFF',
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                },
            },
        },
        MuiTablePagination: {
            styleOverrides: {
                root: {
                    color: '#8C257C',
                },
                selectIcon: {
                    color: '#8C257C',
                },
                actions: {
                    color: '#8C257C',
                }
            }
        },
    },
});

const API_BASE_URL = "https://tdtlworld.com/hrms-backend/api/leave-setup/";
const SAVE_AND_FREEZE_API_URL = "https://tdtlworld.com/hrms-backend/apis/save_and_freeze_leave_setup/";

const mapApiToState = (apiData) => ({
    id: apiData.constants_id,
    type: apiData.leave_type || "",
    days: apiData.days_per_year || 0,
});

const mapStateToApi = (stateData) => ({
    category_name: stateData.type,
    field_one: String(stateData.days),
});

const LeaveSetup = () => {
    const muiTheme = useMuiTheme();
    const isSmallScreen = useMediaQuery(muiTheme.breakpoints.down("sm"));

    const [leaveTypes, setLeaveTypes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [openForm, setOpenForm] = useState(false);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

    const [newLeave, setNewLeave] = useState({
        type: "",
        days: "",
    });

    const [currentTableData, setCurrentTableData] = useState({});
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const accessToken = localStorage.getItem("accessToken");

    const hasChanges = useCallback(() => {
        if (Object.keys(currentTableData).length !== leaveTypes.length) return true;
        for (const originalLeave of leaveTypes) {
            const currentLeave = currentTableData[originalLeave.id];
            if (!currentLeave) return true;
            if (String(currentLeave.type) !== String(originalLeave.type) || String(currentLeave.days) !== String(originalLeave.days)) {
                return true;
            }
        }
        return false;
    }, [currentTableData, leaveTypes]);

    const fetchLeaveTypes = useCallback(async () => {
        setLoading(true);
        if (!accessToken) {
            Swal.fire({
                icon: 'error',
                title: 'Authentication Error',
                text: 'Authentication token not found. Please log in again.',
                timer: 3000,
                showConfirmButton: false
            });
            setLoading(false);
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}?year=${selectedYear}`, {
                headers: { Authorization: `Bearer ${accessToken}` },
            });

            if (!response.ok) {
                if (response.status === 404) {
                    setLeaveTypes([]);
                    setCurrentTableData({});
                    return;
                }
                throw new Error(`Failed to fetch data. Status: ${response.status}`);
            }
            const data = await response.json();

            if (Array.isArray(data)) {
                const mappedData = data.map(mapApiToState);
                setLeaveTypes(mappedData);
                const initialTableState = mappedData.reduce((acc, item) => {
                    acc[item.id] = { ...item };
                    return acc;
                }, {});
                setCurrentTableData(initialTableState);
            } else {
                throw new Error("Invalid data format from server.");
            }
        } catch (e) {
            Swal.fire({
                icon: 'error',
                title: 'Fetch Error',
                text: e.message || "An unexpected error occurred.",
                timer: 3000,
                showConfirmButton: false
            });
        } finally {
            setLoading(false);
        }
    }, [accessToken, selectedYear]);

    useEffect(() => {
        fetchLeaveTypes();
    }, [fetchLeaveTypes]);

    const handleInlineChange = (id, field, value) => {
        setCurrentTableData((prev) => ({
            ...prev,
            [id]: {
                ...prev[id],
                [field]: value,
            },
        }));
    };

    const handleSaveAndFreeze = async () => {
        setSaving(true);
        if (!accessToken) {
            Swal.fire({
                icon: 'error',
                title: 'Authentication Error',
                text: 'Authentication token not found.',
                timer: 3000,
                showConfirmButton: false
            });
            setSaving(false);
            return;
        }

        try {
            const saveAndFreezePayloads = leaveTypes.map(originalLeave => {
                const currentLeave = currentTableData[originalLeave.id];
                return {
                    constants_id: originalLeave.id,
                    leave_type: originalLeave.type,
                    days_per_year: String(originalLeave.days),
                    current_leave_name: currentLeave?.type || originalLeave.type,
                    current_leave_days: String(currentLeave?.days || originalLeave.days),
                    year: String(selectedYear),
                };
            });

            const response = await fetch(SAVE_AND_FREEZE_API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${accessToken}` },
                body: JSON.stringify(saveAndFreezePayloads),
            });

            const result = await response.json();
            if (!response.ok) throw new Error(result.error || result.detail || 'Failed to save and freeze.');

            Swal.fire({
                icon: 'success',
                title: 'Saved & Frozen!',
                text: result.message || "All changes saved and frozen successfully!",
                timer: 3000,
                showConfirmButton: false
            });
            fetchLeaveTypes();
        } catch (e) {
            Swal.fire({
                icon: 'error',
                title: 'Save Failed',
                text: e.message,
            });
        } finally {
            setSaving(false);
        }
    };

    const handleAddNew = () => {
        setNewLeave({ type: "", days: "" });
        setOpenForm(true);
    };

    const handleSaveNew = async () => {
        if (!newLeave.type.trim() || newLeave.days === "") {
            Swal.fire({
                icon: 'warning',
                title: 'Missing Information',
                text: 'Leave Type and Days per year are required.',
                timer: 3000,
                showConfirmButton: false
            });
            return;
        }

        setSaving(true);
        const payload = mapStateToApi(newLeave);

        try {
            const response = await fetch(API_BASE_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${accessToken}` },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || `Failed to create new leave type.`);
            }

            setOpenForm(false);
            Swal.fire({
                icon: 'success',
                title: 'Leave Type Added!',
                text: 'New leave type has been successfully added.',
                timer: 3000,
                showConfirmButton: false
            });
            fetchLeaveTypes();
        } catch (e) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: `Error adding new leave type: ${e.message}`,
            });
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = (leaveToDelete) => {
        Swal.fire({
            title: 'Are you sure?',
            text: `You are about to delete "${leaveToDelete.type}". This action cannot be undone.`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await fetch(`${API_BASE_URL}${leaveToDelete.id}/`, {
                        method: "DELETE",
                        headers: { Authorization: `Bearer ${accessToken}` },
                    });

                    if (!response.ok) throw new Error("Failed to delete leave type.");

                    Swal.fire({
                        icon: 'success',
                        title: 'Deleted!',
                        text: 'The leave type has been deleted.',
                        timer: 3000,
                        showConfirmButton: false
                    });
                    fetchLeaveTypes();
                } catch (e) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: `Error deleting leave type: ${e.message}`,
                    });
                }
            }
        });
    };

    const filteredLeaveTypes = leaveTypes.filter((item) =>
        item.type.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const paginatedLeaveTypes = filteredLeaveTypes.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    const handleChangePage = (event, newPage) => setPage(newPage);

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const skeletonRows = Array.from(new Array(rowsPerPage));

    return (
        <ThemeProvider theme={theme}>
                <Box component={Paper} p={3}>
                    <Typography variant="h4" color="primary" fontWeight="bold" mb={5}>
                        Leave Type Setup
                    </Typography>

                    <Stack
                        direction={isSmallScreen ? "column" : "row"}
                        justifyContent="space-between"
                        alignItems="center"
                        spacing={2}
                        mb={2}
                    >
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<AddIcon />}
                            onClick={handleAddNew}
                        >
                            Add New Leave Type
                        </Button>
                        <TextField
                            size="small"
                            placeholder="Search ..."
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setPage(0);
                            }}
                            InputProps={{
                                startAdornment: (
                                    <SearchIcon color="action" sx={{ mr: 1 }} />
                                ),
                            }}
                            sx={{ width: isSmallScreen ? '100%' : 'auto' }}
                        />
                    </Stack>

                    <TableContainer sx={{ minWidth: '100%', whiteSpace: 'nowrap' }}>
                        <Table aria-label="leave types table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>SR. NO</TableCell>
                                    <TableCell>LEAVE TYPE</TableCell>
                                    <TableCell>DAYS PER YEAR</TableCell>
                                    <TableCell align="center">ACTIONS</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {loading ? (
                                    skeletonRows.map((_, index) => (
                                        <TableRow key={index}>
                                            <TableCell><Skeleton variant="text" /></TableCell>
                                            <TableCell><Skeleton variant="text" /></TableCell>
                                            <TableCell><Skeleton variant="text" /></TableCell>
                                            <TableCell align="center">
                                                <Skeleton variant="rectangular" width={40} height={30} />
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : paginatedLeaveTypes.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={4} align="center" sx={{ py: 4 }}>
                                            No leave types found.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    paginatedLeaveTypes.map((row, index) => (
                                        <TableRow key={row.id} hover>
                                            <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                                            <TableCell>
                                                <TextField
                                                    variant="outlined"
                                                    size="small"
                                                    fullWidth
                                                    value={currentTableData[row.id]?.type || ""}
                                                    onChange={(e) =>
                                                        handleInlineChange(row.id, "type", e.target.value)
                                                    }
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <TextField
                                                    variant="outlined"
                                                    size="small"
                                                    fullWidth
                                                    type="number"
                                                    value={currentTableData[row.id]?.days || ""}
                                                    onChange={(e) =>
                                                        handleInlineChange(
                                                            row.id,
                                                            "days",
                                                            Math.max(0, parseInt(e.target.value, 10) || 0)
                                                        )
                                                    }
                                                    InputProps={{ inputProps: { min: 0 } }}
                                                />
                                            </TableCell>
                                            <TableCell align="center">
                                                <Box display="flex" justifyContent="center" gap={0.5}>
                                                    <IconButton onClick={() => handleDelete(row)} color="error" size="small">
                                                        <Delete />
                                                    </IconButton>
                                                </Box>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: isSmallScreen ? 'column' : 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            mt: 2,
                            gap: 2,
                        }}
                    >
                        <Typography variant="body2" color="text.secondary">
                            Showing {page * rowsPerPage + (paginatedLeaveTypes.length > 0 ? 1 : 0)} to {page * rowsPerPage + paginatedLeaveTypes.length} of {filteredLeaveTypes.length} results
                        </Typography>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 15, 25]}
                            component="div"
                            count={filteredLeaveTypes.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </Box>

                    <Stack
                        direction="row"
                        justifyContent="flex-end"
                        alignItems="center"
                        spacing={2}
                        mt={3}
                    >
                        <Button
                            variant="contained"
                            onClick={handleSaveAndFreeze}
                            disabled={!hasChanges() || saving || loading}
                            sx={{
                                bgcolor: "#4CAF50",
                                color: "white",
                                '&:hover': { bgcolor: '#45a049' },
                            }}
                        >
                            {saving ? <CircularProgress size={24} color="inherit" /> : "Save And Freeze"}
                        </Button>
                    </Stack>

                    <Dialog open={openForm} onClose={() => setOpenForm(false)} fullWidth maxWidth="sm">
                        <DialogTitle fontWeight="bold" color="primary">Add New Leave Type</DialogTitle>
                        <DialogContent dividers>
                            <Stack spacing={3} py={2}>
                                <TextField
                                    label="Leave Type"
                                    fullWidth
                                    value={newLeave.type}
                                    onChange={(e) => setNewLeave({ ...newLeave, type: e.target.value })}
                                />
                                <TextField
                                    label="Days per year"
                                    type="number"
                                    fullWidth
                                    value={newLeave.days}
                                    onChange={(e) =>
                                        setNewLeave({ ...newLeave, days: Math.max(0, parseInt(e.target.value, 10) || 0) })
                                    }
                                    InputProps={{ inputProps: { min: 0 } }}
                                />
                            </Stack>
                        </DialogContent>
                        <DialogActions sx={{ p: 2 }}>
                            <Button onClick={() => setOpenForm(false)} sx={{ color: '#757575' }}>Cancel</Button>
                            <Button
                                onClick={handleSaveNew}
                                variant="contained"
                                color="primary"
                                disabled={saving}
                            >
                                {saving ? <CircularProgress size={24} color="inherit" /> : "Save"}
                            </Button>
                        </DialogActions>
                    </Dialog>
                </Box>
        </ThemeProvider>
    );
};

export default LeaveSetup;