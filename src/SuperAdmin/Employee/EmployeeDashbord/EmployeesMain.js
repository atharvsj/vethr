// import React, { useState, useEffect, useMemo } from 'react';
// import axios from 'axios';
// import {
//     Table,
//     TableBody,
//     TableCell,
//     TableContainer,
//     TableHead,
//     TableRow,
//     Paper,
//     Typography,
//     Box,
//     Container,
//     Grid,
//     CircularProgress,
//     Alert,
//     CssBaseline,
//     TextField,
//     TablePagination,
//     Toolbar,
// } from '@mui/material';

// // --- Utility function to format dates ---
// const formatDate = (dateString) => {
//     if (!dateString || typeof dateString !== 'string') return 'N/A';

//     let day, month, year;
//     // Handles both 'yyyy-mm-dd' and 'dd-mm-yyyy'
//     if (dateString.includes('-')) {
//         const parts = dateString.split('-');
//         if (parts[0].length === 4) { // Format: yyyy-mm-dd
//             [year, month, day] = parts;
//         } else { // Format: dd-mm-yyyy
//             [day, month, year] = parts;
//         }
//     } else {
//         return dateString; // Fallback for unexpected formats
//     }

//     if (!day || !month || !year) return dateString;

//     return `${day}/${month}/${year}`;
// };


// // --- Reusable Component for Rendering a Searchable and Paginated Table ---
// const EmployeeDataTable = ({ title, data, columns }) => {
//     const [page, setPage] = useState(0);
//     const [rowsPerPage, setRowsPerPage] = useState(5);
//     const [searchTerm, setSearchTerm] = useState('');

//     const handleSearchChange = (event) => {
//         setSearchTerm(event.target.value);
//         setPage(0); // Reset to the first page on a new search
//     };

//     const handleChangePage = (event, newPage) => {
//         setPage(newPage);
//     };

//     const handleChangeRowsPerPage = (event) => {
//         setRowsPerPage(parseInt(event.target.value, 10));
//         setPage(0);
//     };

//     // Memoize the filtering logic to avoid re-calculating on every render
//     const filteredData = useMemo(() => {
//         if (!searchTerm) return data;
//         return data.filter((row) =>
//             columns.some((column) => {
//                 const value = row[column.id];
//                 return value && value.toString().toLowerCase().includes(searchTerm.toLowerCase());
//             })
//         );
//     }, [data, searchTerm, columns]);

//     // Data for the current page
//     const paginatedData = filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

//     return (
//         <Paper elevation={3} sx={{ mb: 4, width: '100%' }}>
//             <Toolbar sx={{
//                 flexDirection: { xs: 'column', sm: 'row' },
//                 justifyContent: 'space-between',
//                 alignItems: { xs: 'flex-start', sm: 'center' },
//                 p: { xs: 2, sm: '0 16px' }
//             }}>
//                 <Typography variant="h6" component="div" sx={{ mb: { xs: 2, sm: 0 } }}>
//                     {title}
//                 </Typography>
//                 <TextField
//                     variant="outlined"
//                     size="small"
//                     placeholder="Search..."
//                     value={searchTerm}
//                     onChange={handleSearchChange}
//                     sx={{ width: { xs: '100%', sm: 'auto' } }}
//                 />
//             </Toolbar>
//             <TableContainer>
//                 <Table stickyHeader aria-label={`${title} table`}>
//                     <TableHead>
//                         <TableRow>
//                             <TableCell sx={{ width: '60px', fontWeight: 'bold' }}>Sr. No.</TableCell>
//                             {columns.map((column) => (
//                                 <TableCell key={column.id} sx={{ fontWeight: 'bold' }}>{column.label}</TableCell>
//                             ))}
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {paginatedData.length > 0 ? (
//                             paginatedData.map((row, index) => (
//                                 <TableRow hover key={index}>
//                                     <TableCell component="th" scope="row">{page * rowsPerPage + index + 1}</TableCell>
//                                     {columns.map((column) => {
//                                         const isDateColumn = column.id.includes('date_of');
//                                         return (
//                                             <TableCell key={column.id}>
//                                                 {isDateColumn ? formatDate(row[column.id]) : row[column.id]}
//                                             </TableCell>
//                                         );
//                                     })}
//                                 </TableRow>
//                             ))
//                         ) : (
//                             <TableRow>
//                                 <TableCell colSpan={columns.length + 1} align="center">
//                                     No results found.
//                                 </TableCell>
//                             </TableRow>
//                         )}
//                     </TableBody>
//                 </Table>
//             </TableContainer>
//             <TablePagination
//                 rowsPerPageOptions={[5, 10, 25]}
//                 component="div"
//                 count={filteredData.length}
//                 rowsPerPage={rowsPerPage}
//                 page={page}
//                 onPageChange={handleChangePage}
//                 onRowsPerPageChange={handleChangeRowsPerPage}
//             />
//         </Paper>
//     );
// };


// // --- Column Definitions for Each Table ---
// const birthdayColumns = [
//     { id: 'employee_name', label: 'Employee Name' },
//     { id: 'date_of_birth', label: 'Date of Birth' },
//     { id: 'department_name', label: 'Department' },
//     { id: 'designation', label: 'Designation' },
// ];

// const anniversaryColumns = [
//     { id: 'employee_name', label: 'Employee Name' },
//     { id: 'date_of_joining', label: 'Date of Joining' },
//     { id: 'department_name', label: 'Department' },
//     { id: 'designation', label: 'Designation' },
// ];

// const probationColumns = [
//     { id: 'employee_name', label: 'Employee Name' },
//     { id: 'date_of_joining', label: 'Date of Joining' },
//     { id: 'department_name', label: 'Department' },
//     { id: 'status', label: 'Status' },
// ];

// // --- Main EmployeeDashbord Component ---
// function EmployeeDashbord() {
//     const [dashboardData, setDashboardData] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const apiUrl = 'https://tdtlworld.com/hrms-backend/api/employee-dashboard/';
//                 const response = await axios.get(apiUrl);
//                 setDashboardData(response.data);
//             } catch (err) {
//                 setError('Failed to load dashboard data. Please check the network or API endpoint.');
//                 console.error("API Fetch Error:", err);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchData();
//     }, []);

//     const renderContent = () => {
//         if (loading) {
//             return (
//                 <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
//                     <CircularProgress />
//                     <Typography sx={{ ml: 2 }}>Loading Dashboard...</Typography>
//                 </Box>
//             );
//         }

//         if (error) {
//             return <Alert severity="error" sx={{ mt: 4 }}>{error}</Alert>;
//         }

//         return (
//             <Grid container spacing={3}>
//                 <Grid item xs={12}>
//                     <EmployeeDataTable
//                         title="Today's Birthdays"
//                         data={dashboardData?.birthday_employees || []}
//                         columns={birthdayColumns}
//                     />
//                 </Grid>
//                 <Grid item xs={12}>
//                     <EmployeeDataTable
//                         title="Work Anniversaries"
//                         data={dashboardData?.work_anniversary_employees || []}
//                         columns={anniversaryColumns}
//                     />
//                 </Grid>
//                 <Grid item xs={12}>
//                     <EmployeeDataTable
//                         title="Employees on Probation"
//                         data={dashboardData?.probation_employees || []}
//                         columns={probationColumns}
//                     />
//                 </Grid>
//             </Grid>
//         );
//     };

//     return (
//         <>
//             <CssBaseline />
//             <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
//                 <Typography variant="h4" gutterBottom align="center" sx={{ mb: 4, fontWeight: 'bold' }}>
//                     Employee Dashboard
//                 </Typography>
//                 {renderContent()}
//             </Container>
//         </>
//     );
// }

// export default EmployeeDashbord;











// import React, { useState, useEffect, useMemo } from 'react';
// import axios from 'axios';
// import {
//     Table,
//     TableBody,
//     TableCell,
//     TableContainer,
//     TableHead,
//     TableRow,
//     Paper,
//     Typography,
//     Box,
//     Container,
//     Grid,
//     CircularProgress,
//     Alert,
//     CssBaseline,
//     TextField,
//     TablePagination,
//     Toolbar,
//     createTheme,
//     ThemeProvider,
// } from '@mui/material';

// // --- Vetrina Theme Definition ---
// const vetrinaTheme = createTheme({
//     palette: {
//         primary: {
//             main: '#8C257C', // Purple
//         },
//         secondary: {
//             main: '#F58E35', // Orange
//         },
//         background: {
//             default: '#f4f6f8', // A light grey background
//         },
//     },
//     typography: {
//         fontFamily: 'Roboto, Arial, sans-serif',
//         h4: {
//             fontWeight: 700,
//         },
//         h6: {
//             fontWeight: 600,
//         },
//     },
// });

// // --- Utility function to format all dates as dd/mm/yyyy ---
// const formatDate = (dateString) => {
//     if (!dateString) return 'N/A';
//     try {
//         const date = new Date(dateString);
//         if (isNaN(date.getTime())) return 'N/A';
//         const day = String(date.getDate()).padStart(2, '0');
//         const month = String(date.getMonth() + 1).padStart(2, '0');
//         const year = date.getFullYear();
//         return `${day}/${month}/${year}`;
//     } catch {
//         return 'N/A';
//     }
// };



// // --- Reusable Component for Rendering a Searchable and Paginated Table ---
// const EmployeeDataTable = ({ title, data, columns }) => {
//     const [page, setPage] = useState(0);
//     const [rowsPerPage, setRowsPerPage] = useState(5);
//     const [searchTerm, setSearchTerm] = useState('');

//     const handleSearchChange = (event) => {
//         setSearchTerm(event.target.value);
//         setPage(0); // Reset to the first page on a new search
//     };

//     const handleChangePage = (event, newPage) => {
//         setPage(newPage);
//     };

//     const handleChangeRowsPerPage = (event) => {
//         setRowsPerPage(parseInt(event.target.value, 10));
//         setPage(0);
//     };

//     const filteredData = useMemo(() => {
//         if (!searchTerm) return data;
//         return data.filter((row) =>
//             columns.some((column) => {
//                 const value = row[column.id];
//                 return value && value.toString().toLowerCase().includes(searchTerm.toLowerCase());
//             })
//         );
//     }, [data, searchTerm, columns]);

//     const paginatedData = filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

//     return (
//         <Paper elevation={4} sx={{ mb: 4, width: '100%', borderRadius: 2, overflow: 'hidden' }}>
//             <Toolbar sx={{
//                 bgcolor: 'primary.main',
//                 color: 'white',
//                 flexDirection: { xs: 'column', sm: 'row' },
//                 justifyContent: 'space-between',
//                 alignItems: { xs: 'stretch', sm: 'center' },
//                 py: 2,
//                 px: 2
//             }}>
//                 <Typography variant="h6" component="div" sx={{ mb: { xs: 2, sm: 0 }, flexGrow: 1 }}>
//                     {title}
//                 </Typography>
//                 <TextField
//                     variant="outlined"
//                     size="small"
//                     placeholder="Search..."
//                     value={searchTerm}
//                     onChange={handleSearchChange}
//                     sx={{
//                         width: { xs: '100%', sm: 'auto' },
//                         '& .MuiInputBase-root': {
//                             color: 'white',
//                             '& .MuiOutlinedInput-notchedOutline': {
//                                 borderColor: 'rgba(255, 255, 255, 0.5)',
//                             },
//                             '&:hover .MuiOutlinedInput-notchedOutline': {
//                                 borderColor: 'white',
//                             },
//                             '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
//                                 borderColor: 'white',
//                             },
//                             '& input::placeholder': {
//                                 color: 'rgba(255, 255, 255, 0.7)',
//                             },
//                         },
//                     }}
//                 />
//             </Toolbar>
//             <TableContainer>
//                 <Table stickyHeader aria-label={`${title} table`}>
//                     <TableHead>
//                         <TableRow>
//                             {/* Styling header cells directly for better control */}
//                             <TableCell sx={{ width: '60px', bgcolor: '#f2e4ef', fontWeight: 'bold' }}>SR. NO.</TableCell>
//                             {columns.map((column) => (
//                                 <TableCell key={column.id} sx={{ bgcolor: '#f2e4ef', fontWeight: 'bold' }}>
//                                     {column.label}
//                                 </TableCell>
//                             ))}
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {paginatedData.length > 0 ? (
//                             paginatedData.map((row, index) => (
//                                 <TableRow
//                                     hover
//                                     key={index}
//                                     sx={{ '&:hover': { backgroundColor: 'secondary.light' } }}
//                                 >
//                                     <TableCell component="th" scope="row">{page * rowsPerPage + index + 1}</TableCell>
//                                     {columns.map((column) => {
//                                         const isDateColumn = column.id.includes('date_of');
//                                         return (
//                                             <TableCell key={column.id}>
//                                                 {isDateColumn ? formatDate(row[column.id]) : row[column.id]}
//                                             </TableCell>
//                                         );
//                                     })}
//                                 </TableRow>
//                             ))
//                         ) : (
//                             <TableRow>
//                                 <TableCell colSpan={columns.length + 1} align="center" sx={{ py: 5 }}>
//                                     <Typography>No results found.</Typography>
//                                 </TableCell>
//                             </TableRow>
//                         )}
//                     </TableBody>
//                 </Table>
//             </TableContainer>
//             <TablePagination
//                 rowsPerPageOptions={[5, 10, 25]}
//                 component="div"
//                 count={filteredData.length}
//                 rowsPerPage={rowsPerPage}
//                 page={page}
//                 onPageChange={handleChangePage}
//                 onRowsPerPageChange={handleChangeRowsPerPage}
//                 sx={{ borderTop: '1px solid #e0e0e0' }}
//             />
//         </Paper>
//     );
// };


// // --- Column Definitions for Each Table ---
// const birthdayColumns = [
//     { id: 'employee_name', label: 'EMPLOYEE NAME' },
//     { id: 'date_of_birth', label: 'DATE OF BIRTH' },
//     { id: 'department_name', label: 'DEPARTMENT' },
//     { id: 'designation', label: 'DESIGNATION' },
// ];

// const anniversaryColumns = [
//     { id: 'employee_name', label: 'EMPLOYEE NAME' },
//     { id: 'date_of_joining', label: 'DATE OF JOINING' },
//     { id: 'department_name', label: 'DEPARTMENT' },
//     { id: 'designation', label: 'DESIGNATION' },
// ];

// const probationColumns = [
//     { id: 'employee_name', label: 'EMPLOYEE NAME' },
//     { id: 'date_of_joining', label: 'DATE OF JOINING' },
//     { id: 'department_name', label: 'DEPARTMENT' },
//     { id: 'status', label: 'Status' },
// ];

// // --- Main EmployeeDashbord Component ---
// function EmployeeDashbordContent() {
//     const [dashboardData, setDashboardData] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const apiUrl = 'https://tdtlworld.com/hrms-backend/api/employee-dashboard/';
//                 const response = await axios.get(apiUrl);
//                 setDashboardData(response.data);
//             } catch (err) {
//                 setError('Failed to load dashboard data. Please check the network or API endpoint.');
//                 console.error("API Fetch Error:", err);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchData();
//     }, []);

//     if (loading) {
//         return (
//             <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 10, color: 'primary.main' }}>
//                 <CircularProgress color="inherit" />
//                 <Typography sx={{ ml: 2, fontSize: '1.2rem' }}>Loading Dashboard...</Typography>
//             </Box>
//         );
//     }

//     if (error) {
//         return <Alert severity="error" sx={{ mt: 4, mx: 'auto', maxWidth: 'md' }}>{error}</Alert>;
//     }

//     return (
//         <Grid container spacing={4}>
//             <Grid item xs={12}>
//                 <EmployeeDataTable
//                     title="Today's Birthdays"
//                     data={dashboardData?.birthday_employees || []}
//                     columns={birthdayColumns}
//                 />
//             </Grid>
//             <Grid item xs={12}>
//                 <EmployeeDataTable
//                     title="Work Anniversaries"
//                     data={dashboardData?.work_anniversary_employees || []}
//                     columns={anniversaryColumns}
//                 />
//             </Grid>
//             <Grid item xs={12}>
//                 <EmployeeDataTable
//                     title="Employees on Probation"
//                     data={dashboardData?.probation_employees || []}
//                     columns={probationColumns}
//                 />
//             </Grid>
//         </Grid>
//     );
// }

// // --- App Wrapper with Theme Provider ---
// function EmployeeDashbord() {
//     return (
//         <ThemeProvider theme={vetrinaTheme}>
//             <CssBaseline />
//             <Box component="main" sx={{ flexGrow: 1, py: 4, px: { xs: 2, md: 3 } }}>
//                 <Container maxWidth="xl">
//                     <Typography variant="h4" gutterBottom align="center" sx={{ mb: 5, color: 'primary.main' }}>
//                          Dashboard
//                     </Typography>
//                     <EmployeeDashbordContent />
//                 </Container>
//             </Box>
//         </ThemeProvider>
//     );
// }


// export default EmployeeDashbord;











// import React, { useState, useEffect, useMemo } from 'react';
// import axios from 'axios';
// import {
//     Table,
//     TableBody,
//     TableCell,
//     TableContainer,
//     TableHead,
//     TableRow,
//     Paper,
//     Typography,
//     Box,
//     Container,
//     Grid,
//     CircularProgress,
//     Alert,
//     CssBaseline,
//     TextField,
//     TablePagination,
//     Toolbar,
//     createTheme,
//     ThemeProvider,
//     Chip, // <-- IMPORT ADDED HERE
// } from '@mui/material';

// // --- Vetrina Theme Definition ---
// const vetrinaTheme = createTheme({
//     palette: {
//         primary: {
//             main: '#8C257C', // Purple
//         },
//         secondary: {
//             main: '#F58E35', // Orange
//         },
//         background: {
//             default: '#f4f6f8', // A light grey background
//         },
//         warning: { // Added for better chip color control if needed
//             main: '#FFA726', 
//         }
//     },
//     typography: {
//         fontFamily: 'Roboto, Arial, sans-serif',
//         h4: {
//             fontWeight: 700,
//         },
//         h6: {
//             fontWeight: 600,
//         },
//     },
// });

// // --- Utility function to format all dates as dd/mm/yyyy ---
// const formatDate = (dateString) => {
//     if (!dateString) return 'N/A';
//     try {
//         const date = new Date(dateString);
//         if (isNaN(date.getTime())) return 'N/A';
//         const day = String(date.getDate()).padStart(2, '0');
//         const month = String(date.getMonth() + 1).padStart(2, '0');
//         const year = date.getFullYear();
//         return `${day}/${month}/${year}`;
//     } catch {
//         return 'N/A';
//     }
// };

// // --- Reusable Component for Rendering a Searchable and Paginated Table ---
// const EmployeeDataTable = ({ title, data, columns }) => {
//     const [page, setPage] = useState(0);
//     const [rowsPerPage, setRowsPerPage] = useState(5);
//     const [searchTerm, setSearchTerm] = useState('');

//     const handleSearchChange = (event) => {
//         setSearchTerm(event.target.value);
//         setPage(0); // Reset to the first page on a new search
//     };

//     const handleChangePage = (event, newPage) => {
//         setPage(newPage);
//     };

//     const handleChangeRowsPerPage = (event) => {
//         setRowsPerPage(parseInt(event.target.value, 10));
//         setPage(0);
//     };

//     const filteredData = useMemo(() => {
//         if (!searchTerm) return data;
//         return data.filter((row) =>
//             columns.some((column) => {
//                 const value = row[column.id];
//                 return value && value.toString().toLowerCase().includes(searchTerm.toLowerCase());
//             })
//         );
//     }, [data, searchTerm, columns]);

//     const paginatedData = filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

//     return (
//         <Paper elevation={4} sx={{ mb: 4, width: '100%', borderRadius: 2, overflow: 'hidden' }}>
//             <Toolbar sx={{
//                 bgcolor: 'primary.main',
//                 color: 'white',
//                 flexDirection: { xs: 'column', sm: 'row' },
//                 justifyContent: 'space-between',
//                 alignItems: { xs: 'stretch', sm: 'center' },
//                 py: 2,
//                 px: 2
//             }}>
//                 <Typography variant="h6" component="div" sx={{ mb: { xs: 2, sm: 0 }, flexGrow: 1 }}>
//                     {title}
//                 </Typography>
//                 <TextField
//                     variant="outlined"
//                     size="small"
//                     placeholder="Search..."
//                     value={searchTerm}
//                     onChange={handleSearchChange}
//                     sx={{
//                         width: { xs: '100%', sm: 'auto' },
//                         '& .MuiInputBase-root': {
//                             color: 'white',
//                             '& .MuiOutlinedInput-notchedOutline': {
//                                 borderColor: 'rgba(255, 255, 255, 0.5)',
//                             },
//                             '&:hover .MuiOutlinedInput-notchedOutline': {
//                                 borderColor: 'white',
//                             },
//                             '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
//                                 borderColor: 'white',
//                             },
//                             '& input::placeholder': {
//                                 color: 'rgba(255, 255, 255, 0.7)',
//                             },
//                         },
//                     }}
//                 />
//             </Toolbar>
//             <TableContainer>
//                 <Table stickyHeader aria-label={`${title} table`}>
//                     <TableHead>
//                         <TableRow>
//                             <TableCell sx={{ width: '60px', bgcolor: '#f2e4ef', fontWeight: 'bold' }}>SR. NO.</TableCell>
//                             {columns.map((column) => (
//                                 <TableCell key={column.id} sx={{ bgcolor: '#f2e4ef', fontWeight: 'bold' }}>
//                                     {column.label}
//                                 </TableCell>
//                             ))}
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {paginatedData.length > 0 ? (
//                             paginatedData.map((row, index) => (
//                                 <TableRow
//                                     hover
//                                     key={index}
//                                     sx={{ '&:hover': { backgroundColor: 'secondary.light' } }}
//                                 >
//                                     <TableCell component="th" scope="row">{page * rowsPerPage + index + 1}</TableCell>
//                                     {columns.map((column) => {
//                                         const value = row[column.id];

//                                         // --- UPDATED LOGIC HERE ---
//                                         // Special rendering for the 'status' column to display a Chip
//                                         if (column.id === 'status' && typeof value === 'string' && value.toLowerCase() === 'pending') {
//                                             const capitalizedStatus = value.charAt(0).toUpperCase() + value.slice(1);
//                                             return (
//                                                 <TableCell key={column.id}>
//                                                     <Chip label={capitalizedStatus} color="warning" size="small" />
//                                                 </TableCell>
//                                             );
//                                         }
//                                         // --- END OF UPDATED LOGIC ---
                                        
//                                         const isDateColumn = column.id.includes('date_of');
//                                         return (
//                                             <TableCell key={column.id}>
//                                                 {isDateColumn ? formatDate(value) : value}
//                                             </TableCell>
//                                         );
//                                     })}
//                                 </TableRow>
//                             ))
//                         ) : (
//                             <TableRow>
//                                 <TableCell colSpan={columns.length + 1} align="center" sx={{ py: 5 }}>
//                                     <Typography>No results found.</Typography>
//                                 </TableCell>
//                             </TableRow>
//                         )}
//                     </TableBody>
//                 </Table>
//             </TableContainer>
//             <TablePagination
//                 rowsPerPageOptions={[5, 10, 25]}
//                 component="div"
//                 count={filteredData.length}
//                 rowsPerPage={rowsPerPage}
//                 page={page}
//                 onPageChange={handleChangePage}
//                 onRowsPerPageChange={handleChangeRowsPerPage}
//                 sx={{ borderTop: '1px solid #e0e0e0' }}
//             />
//         </Paper>
//     );
// };


// // --- Column Definitions for Each Table ---
// const birthdayColumns = [
//     { id: 'employee_name', label: 'EMPLOYEE NAME' },
//     { id: 'date_of_birth', label: 'DATE OF BIRTH' },
//     { id: 'department_name', label: 'DEPARTMENT' },
//     { id: 'designation', label: 'DESIGNATION' },
// ];

// const anniversaryColumns = [
//     { id: 'employee_name', label: 'EMPLOYEE NAME' },
//     { id: 'date_of_joining', label: 'DATE OF JOINING' },
//     { id: 'department_name', label: 'DEPARTMENT' },
//     { id: 'designation', label: 'DESIGNATION' },
// ];

// const probationColumns = [
//     { id: 'employee_name', label: 'EMPLOYEE NAME' },
//     { id: 'date_of_joining', label: 'DATE OF JOINING' },
//     { id: 'department_name', label: 'DEPARTMENT' },
//     { id: 'status', label: 'Status' },
// ];

// // --- Main EmployeeDashbord Component ---
// function EmployeeDashbordContent() {
//     const [dashboardData, setDashboardData] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const apiUrl = 'https://tdtlworld.com/hrms-backend/api/employee-dashboard/';
//                 const response = await axios.get(apiUrl);
//                 setDashboardData(response.data);
//             } catch (err) {
//                 setError('Failed to load dashboard data. Please check the network or API endpoint.');
//                 console.error("API Fetch Error:", err);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchData();
//     }, []);

//     if (loading) {
//         return (
//             <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 10, color: 'primary.main' }}>
//                 <CircularProgress color="inherit" />
//                 <Typography sx={{ ml: 2, fontSize: '1.2rem' }}>Loading Dashboard...</Typography>
//             </Box>
//         );
//     }

//     if (error) {
//         return <Alert severity="error" sx={{ mt: 4, mx: 'auto', maxWidth: 'md' }}>{error}</Alert>;
//     }

//     return (
//         <Grid container spacing={4}>
//             <Grid item xs={12}>
//                 <EmployeeDataTable
//                     title="Today's Birthdays"
//                     data={dashboardData?.birthday_employees || []}
//                     columns={birthdayColumns}
//                 />
//             </Grid>
//             <Grid item xs={12}>
//                 <EmployeeDataTable
//                     title="Work Anniversaries"
//                     data={dashboardData?.work_anniversary_employees || []}
//                     columns={anniversaryColumns}
//                 />
//             </Grid>
//             <Grid item xs={12}>
//                 <EmployeeDataTable
//                     title="Employees on Probation"
//                     data={dashboardData?.probation_employees || []}
//                     columns={probationColumns}
//                 />
//             </Grid>
//         </Grid>
//     );
// }

// // --- App Wrapper with Theme Provider ---
// function EmployeeDashbord() {
//     return (
//         <ThemeProvider theme={vetrinaTheme}>
//             <CssBaseline />
//             <Box component="main" sx={{ flexGrow: 1, py: 4, px: { xs: 2, md: 3 } }}>
//                 <Container maxWidth="xl">
//                     <Typography variant="h4" gutterBottom align="center" sx={{ mb: 5, color: 'primary.main' }}>
//                          Dashboard
//                     </Typography>
//                     <EmployeeDashbordContent />
//                 </Container>
//             </Box>
//         </ThemeProvider>
//     );
// }


// export default EmployeeDashbord;





import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
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
    Container,
    Grid,
    CircularProgress,
    Alert,
    CssBaseline,
    TextField,
    Toolbar,
    createTheme,
    ThemeProvider,
    Chip,
    FormControl,
    Select,
    MenuItem,
    Pagination,
    Skeleton,
} from '@mui/material';

// --- Vetrina Theme Definition ---
const vetrinaTheme = createTheme({
    palette: {
        primary: {
            main: '#8C257C', // Purple
            dark: '#6d1d60',  // Darker purple for hover effects
        },
        secondary: {
            main: '#F58E35', // Orange
        },
        background: {
            default: '#f4f6f8', // A light grey background
        },
        warning: {
            main: '#FFA726',
        }
    },
    typography: {
        fontFamily: 'Roboto, Arial, sans-serif',
        h4: {
            fontWeight: 700,
        },
        h6: {
            fontWeight: 600,
        },
    },
});

// --- Utility function to format all dates as dd/mm/yyyy ---
const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return 'N/A';
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    } catch {
        return 'N/A';
    }
};

// --- Reusable Component for Rendering a Searchable and Paginated Table ---
const EmployeeDataTable = ({ title, data, columns, loading }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        setPage(0);
    };

    const handlePaginationChange = (event, newPage) => {
        setPage(newPage - 1); // Pagination is 1-based, our state is 0-based
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const filteredData = useMemo(() => {
        if (!searchTerm) return data;
        return data.filter((row) =>
            columns.some((column) => {
                const value = row[column.id];
                return value && value.toString().toLowerCase().includes(searchTerm.toLowerCase());
            })
        );
    }, [data, searchTerm, columns]);

    const paginatedData = filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    const startEntry = filteredData.length > 0 ? page * rowsPerPage + 1 : 0;
    const endEntry = Math.min((page + 1) * rowsPerPage, filteredData.length);

    return (
        <Paper elevation={4} sx={{ mb: 4, width: '100%', borderRadius: 2, overflow: 'hidden' }}>
            <Toolbar sx={{
                bgcolor: 'primary.main',
                color: 'white',
                flexDirection: { xs: 'column', sm: 'row' },
                justifyContent: 'space-between',
                alignItems: { xs: 'stretch', sm: 'center' },
                py: 2,
                px: 2
            }}>
                <Typography variant="h6" component="div" sx={{ mb: { xs: 2, sm: 0 }, flexGrow: 1 }}>
                    {title}
                </Typography>
                <TextField
                    variant="outlined"
                    size="small"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    sx={{
                        width: { xs: '100%', sm: 'auto' },
                        '& .MuiInputBase-root': {
                            color: 'white',
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'rgba(255, 255, 255, 0.5)',
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'white',
                            },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'white',
                            },
                            '& input::placeholder': {
                                color: 'rgba(255, 255, 255, 0.7)',
                            },
                        },
                    }}
                />
            </Toolbar>
            <TableContainer>
                <Table stickyHeader aria-label={`${title} table`}>
                    <TableHead>
                         <TableRow>
                            <TableCell sx={{ width: '60px', bgcolor: '#f2e4ef', fontWeight: 'bold' }}>SR. NO.</TableCell>
                            {columns.map((column) => (
                                <TableCell key={column.id} sx={{ bgcolor: '#f2e4ef', fontWeight: 'bold' }}>
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedData.length > 0 ? (
                            paginatedData.map((row, index) => (
                                <TableRow
                                    hover
                                    key={index}
                                    sx={{ '&:hover': { backgroundColor: 'secondary.light' } }}
                                >
                                    <TableCell component="th" scope="row">{page * rowsPerPage + index + 1}</TableCell>
                                    {columns.map((column) => {
                                        const value = row[column.id];
                                        if (column.id === 'status' && typeof value === 'string' && value.toLowerCase() === 'pending') {
                                            const capitalizedStatus = value.charAt(0).toUpperCase() + value.slice(1);
                                            return (
                                                <TableCell key={column.id}>
                                                    <Chip label={capitalizedStatus} color="warning" size="small" />
                                                </TableCell>
                                            );
                                        }
                                        const isDateColumn = column.id.includes('date_of');
                                        return (
                                            <TableCell key={column.id}>
                                                {isDateColumn ? formatDate(value) : value}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length + 1} align="center" sx={{ py: 5 }}>
                                    <Typography>No results found.</Typography>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            
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
                               {`Showing ${startEntry} to ${endEntry} of ${filteredData.length} results`}
                            </Typography>
                        </Box>
                        <Pagination
                            count={Math.ceil(filteredData.length / rowsPerPage)}
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
        </Paper>
    );
};

// --- Column Definitions for Each Table ---
const birthdayColumns = [
    { id: 'employee_name', label: 'EMPLOYEE NAME' },
    { id: 'date_of_birth', label: 'DATE OF BIRTH' },
    { id: 'department_name', label: 'DEPARTMENT' },
    { id: 'designation', label: 'DESIGNATION' },
];

const anniversaryColumns = [
    { id: 'employee_name', label: 'EMPLOYEE NAME' },
    { id: 'date_of_joining', label: 'DATE OF JOINING' },
    { id: 'department_name', label: 'DEPARTMENT' },
    { id: 'designation', label: 'DESIGNATION' },
];

const probationColumns = [
     { id: 'employee_name', label: 'EMPLOYEE NAME' },
    { id: 'date_of_joining', label: 'DATE OF JOINING' },
    { id: 'department_name', label: 'DEPARTMENT' },
    { id: 'status', label: 'Status' },
];

// --- Main EmployeeDashbord Component ---
function EmployeeDashbordContent() {
    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const apiUrl = 'https://tdtlworld.com/hrms-backend/api/employee-dashboard/';
                const response = await axios.get(apiUrl);
                setDashboardData(response.data);
            } catch (err) {
                setError('Failed to load dashboard data. Please check the network or API endpoint.');
                console.error("API Fetch Error:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
         return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 10, color: 'primary.main' }}>
                <CircularProgress color="inherit" />
                <Typography sx={{ ml: 2, fontSize: '1.2rem' }}>Loading Dashboard...</Typography>
            </Box>
        );
    }

    if (error) {
        return <Alert severity="error" sx={{ mt: 4, mx: 'auto', maxWidth: 'md' }}>{error}</Alert>;
    }

    return (
        <Grid container spacing={4}>
            <Grid item xs={12}>
                <EmployeeDataTable
                    title="Today's Birthdays"
                    data={dashboardData?.birthday_employees || []}
                    columns={birthdayColumns}
                    loading={loading}
                />
            </Grid>
            <Grid item xs={12}>
                <EmployeeDataTable
                    title="Work Anniversaries"
                    data={dashboardData?.work_anniversary_employees || []}
                    columns={anniversaryColumns}
                    loading={loading}
                />
            </Grid>
            <Grid item xs={12}>
                <EmployeeDataTable
                    title="Employees on Probation"
                    data={dashboardData?.probation_employees || []}
                    columns={probationColumns}
                    loading={loading}
                />
            </Grid>
        </Grid>
    );
}

// --- App Wrapper with Theme Provider ---
function EmployeeDashbord() {
    return (
        <ThemeProvider theme={vetrinaTheme}>
            <CssBaseline />
            <Box component="main" sx={{ flexGrow: 1, py: 4, px: { xs: 2, md: 3 } }}>
                <Container maxWidth="xl">
                    <Typography variant="h4" gutterBottom align="center" sx={{ mb: 5, color: 'primary.main' }}>
                         Dashboard
                    </Typography>
                    <EmployeeDashbordContent />
                </Container>
            </Box>
        </ThemeProvider>
    );
}


export default EmployeeDashbord;