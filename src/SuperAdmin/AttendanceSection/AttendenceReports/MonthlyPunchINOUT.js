





// import React, { useEffect, useState, useMemo } from 'react';
// import {
//   Box,
//   Typography,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   CircularProgress,
//   Select,
//   MenuItem,
//   FormControl,
//   InputLabel,
//   Grid, // Grid can be removed, but keeping it in case you use it elsewhere.
//   Button,
//   Stack,
// } from '@mui/material';
// import * as XLSX from 'xlsx';

// const MonthlyCheckInOutReport = () => {
//   const [reportData, setReportData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
//   const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const url = `https://tdtlworld.com/hrms-backend/apis/get_employee_monthly_check_in_check_out_get_report/?month=${selectedMonth}&year=${selectedYear}`;
//         const res = await fetch(url);

//         if (!res.ok) {
//           throw new Error(`HTTP error! Status: ${res.status}`);
//         }

//         const data = await res.json();
//         setReportData(Array.isArray(data) ? data : []);
//       } catch (err) {
//         console.error("Error fetching attendance report:", err);
//         setError("Failed to load data. Please try again.");
//         setReportData([]);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, [selectedMonth, selectedYear]);

//   const daysInMonth = useMemo(() => {
//     if (reportData.length === 0) return [];
//     return Object.keys(reportData[0])
//       .filter((key) => !isNaN(key))
//       .sort((a, b) => Number(a) - Number(b));
//   }, [reportData]);

//   const monthOptions = [
//     { value: 1, label: 'January' }, { value: 2, label: 'February' },
//     { value: 3, label: 'March' }, { value: 4, label: 'April' },
//     { value: 5, label: 'May' }, { value: 6, label: 'June' },
//     { value: 7, label: 'July' }, { value: 8, label: 'August' },
//     { value: 9, label: 'September' }, { value: 10, label: 'October' },
//     { value: 11, label: 'November' }, { value: 12, label: 'December' },
//   ];

//   const handleExport = () => {
//     const dataForExport = reportData.map(employee => {
//       const flatEmployee = { 'Employee Name': employee.name };
//       daysInMonth.forEach(day => {
//         const dayData = employee[day] || {};
//         flatEmployee[`${day}-In`] = dayData.in || '';
//         flatEmployee[`${day}-Out`] = dayData.out || '';
//       });
//       return flatEmployee;
//     });

//     const worksheet = XLSX.utils.json_to_sheet(dataForExport);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "MonthlyReport");

//     const monthName = monthOptions.find(m => m.value === selectedMonth)?.label || 'Month';
//     const fileName = `Monthly_Report_${monthName}_${selectedYear}.xlsx`;
//     XLSX.writeFile(workbook, fileName);
//   };

//   const yearOptions = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - 5 + i);

//   return (
//     <Box sx={{ p: 3 }}>
//       <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#111827', mb: 2 }}>
//         Monthly Punch-in/Punch-out Report
//       </Typography>
//       {/* --- MODIFIED: Single header row for alignment --- */}
//       <Stack
//         direction="row"
//         justifyContent="space-between"
//         alignItems="center"
//         sx={{ mb: 3 }} // Margin below the entire header row
//       >
//         {/* --- Left Side: Group for Filters and Button --- */}
//         <Stack direction="row" spacing={2} alignItems="center">
//           <FormControl sx={{ minWidth: 120 }}>
//             <InputLabel>Month</InputLabel>
//             <Select
//               value={selectedMonth}
//               label="Month"
//               onChange={(e) => setSelectedMonth(e.target.value)}
//             >
//               {monthOptions.map((month) => (
//                 <MenuItem key={month.value} value={month.value}>
//                   {month.label}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>

//           <FormControl sx={{ minWidth: 120 }}>
//             <InputLabel>Year</InputLabel>
//             <Select
//               value={selectedYear}
//               label="Year"
//               onChange={(e) => setSelectedYear(e.target.value)}
//             >
//               {yearOptions.map((year) => (
//                 <MenuItem key={year} value={year}>
//                   {year}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>

//           <Button
//             variant="contained"
//             onClick={handleExport}
//             disabled={reportData.length === 0}
//             sx={{
//               backgroundColor: '#673ab7', // Purple button color
//               '&:hover': { backgroundColor: '#512da8' }, // Typo fixed here
//             }}
//           >
//             Export Report
//           </Button>
//         </Stack>



//       </Stack>

//       {/* The separate containers for controls have been removed and combined above */}

//       {loading ? (
//         <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
//           <CircularProgress sx={{ color: '#673ab7' }} />
//         </Box>
//       ) : error ? (
//         <Typography color="error" align="center">{error}</Typography>
//       ) : reportData.length === 0 ? (
//         <Typography align="center">No data available for the selected period.</Typography>
//       ) : (
//         <TableContainer component={Paper} sx={{ maxHeight: 700 }}>
//           <Table stickyHeader sx={{ minWidth: 3000 }}>
//             <TableHead>
//               <TableRow>
//                 <TableCell
//                   rowSpan={2}
//                   sx={{
//                     fontWeight: 'bold', position: 'sticky', left: 0, zIndex: 3,
//                     backgroundColor: '#e3f2fd',
//                     borderRight: '1px solid #ccc',
//                   }}
//                 >
//                   Employee Name
//                 </TableCell>
//                 {daysInMonth.map((day) => (
//                   <TableCell
//                     key={`date-${day}`}
//                     align="center"
//                     sx={{ fontWeight: 'bold', backgroundColor: '#e3f2fd' }}
//                   >
//                     {day}
//                   </TableCell>
//                 ))}
//               </TableRow>
//               <TableRow>
//                 {daysInMonth.map((day) => (
//                   <TableCell
//                     key={`day-${day}`}
//                     align="center"
//                     sx={{
//                       fontWeight: 'bold',
//                       backgroundColor: '#e3f2fd',
//                       color: reportData[0]?.[day]?.day === 'Sunday' ? 'red' : 'inherit'
//                     }}
//                   >
//                     {reportData[0]?.[day]?.day.substring(0, 2) || ''}
//                   </TableCell>
//                 ))}
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {reportData.map((employee) => (
//                 <TableRow key={employee.name} hover>
//                   <TableCell sx={{ fontWeight: 'bold', position: 'sticky', left: 0, backgroundColor: 'white', borderRight: '1px solid #ccc' }}>
//                     {employee.name}
//                   </TableCell>
//                   {daysInMonth.map((day) => {
//                     const dayData = employee[day] || { in: '', out: '', day: '' };
//                     const isSunday = dayData.day === 'Sunday';
//                     return (
//                       <TableCell key={`${employee.name}-${day}`} align="center" sx={{ backgroundColor: isSunday ? '#d1e7dd' : 'inherit', border: '1px solid #e0e0e0', padding: '6px' }}>
//                         <Box>{dayData.in || '--'}</Box>
//                         <Box sx={{ borderTop: '1px solid #ccc', mt: 0.5, pt: 0.5 }}>{dayData.out || '--'}</Box>
//                       </TableCell>
//                     );
//                   })}
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       )}
//     </Box>
//   );
// };

// export default MonthlyCheckInOutReport;   ///// 






// import React, { useEffect, useState, useMemo } from 'react';
// import {
//   Box,
//   Typography,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   CircularProgress,
//   Select,
//   MenuItem,
//   FormControl,
//   InputLabel,
//   Button,
//   Stack,
//   TextField,
//   TablePagination,
// } from '@mui/material';
// import * as XLSX from 'xlsx';

// const MonthlyCheckInOutReport = () => {
//   const [reportData, setReportData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
//   const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
//   const [searchTerm, setSearchTerm] = useState('');

//   const [fetchTrigger, setFetchTrigger] = useState(false);

//   // Pagination states
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);

//   useEffect(() => {
//     if (!fetchTrigger) return;

//     const fetchData = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const url = `https://tdtlworld.com/hrms-backend/apis/get_employee_monthly_check_in_check_out_get_report/?month=${selectedMonth}&year=${selectedYear}`;
//         const res = await fetch(url);

//         if (!res.ok) {
//           throw new Error(`HTTP error! Status: ${res.status}`);
//         }

//         const data = await res.json();
//         setReportData(Array.isArray(data) ? data : []);
//       } catch (err) {
//         console.error("Error fetching attendance report:", err);
//         setError("Failed to load data. Please try again.");
//         setReportData([]);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, [fetchTrigger, selectedMonth, selectedYear]);

//   const daysInMonth = useMemo(() => {
//     if (reportData.length === 0) return [];
//     return Object.keys(reportData[0])
//       .filter((key) => !isNaN(key))
//       .sort((a, b) => Number(a) - Number(b));
//   }, [reportData]);

//   const monthOptions = [
//     { value: 1, label: 'January' }, { value: 2, label: 'February' },
//     { value: 3, label: 'March' }, { value: 4, label: 'April' },
//     { value: 5, label: 'May' }, { value: 6, label: 'June' },
//     { value: 7, label: 'July' }, { value: 8, label: 'August' },
//     { value: 9, label: 'September' }, { value: 10, label: 'October' },
//     { value: 11, label: 'November' }, { value: 12, label: 'December' },
//   ];

//   const handleExportExcel = () => {
//     const dataForExport = reportData.map(employee => {
//       const flatEmployee = { 'Employee Name': employee.name };
//       daysInMonth.forEach(day => {
//         const dayData = employee[day] || {};
//         flatEmployee[`${day}-In`] = dayData.in || '';
//         flatEmployee[`${day}-Out`] = dayData.out || '';
//       });
//       return flatEmployee;
//     });

//     const worksheet = XLSX.utils.json_to_sheet(dataForExport);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "MonthlyReport");

//     const monthName = monthOptions.find(m => m.value === selectedMonth)?.label || 'Month';
//     const fileName = `Monthly_Report_${monthName}_${selectedYear}.xlsx`;
//     XLSX.writeFile(workbook, fileName);
//   };

//   const yearOptions = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - 5 + i);

//   const filteredData = reportData.filter(emp =>
//     emp.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   // Pagination handlers
//   const handleChangePage = (event, newPage) => setPage(newPage);
//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   return (
//     <Box sx={{ p: 3 }}>
//       <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#111827', mb: 2 }}>
//         Monthly Punch-in/Punch-out Report
//       </Typography>

//       {/* Controls Row */}
//       <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
//         <FormControl sx={{ minWidth: 120 }}>
//           <InputLabel>Month</InputLabel>
//           <Select
//             value={selectedMonth}
//             label="Month"
//             onChange={(e) => setSelectedMonth(e.target.value)}
//           >
//             {monthOptions.map((month) => (
//               <MenuItem key={month.value} value={month.value}>
//                 {month.label}
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>

//         <FormControl sx={{ minWidth: 120 }}>
//           <InputLabel>Year</InputLabel>
//           <Select
//             value={selectedYear}
//             label="Year"
//             onChange={(e) => setSelectedYear(e.target.value)}
//           >
//             {yearOptions.map((year) => (
//               <MenuItem key={year} value={year}>
//                 {year}
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>

//         {/* Generate + Export Buttons in one row */}
//         <Stack direction="row" spacing={2}>
//           <Button
//             variant="contained"
//             onClick={() => setFetchTrigger(prev => !prev)}
//             sx={{
//               backgroundColor: '#673ab7',
//               '&:hover': { backgroundColor: '#512da8' },
//             }}
//           >
//             Generate Report
//           </Button>
//           <Button
//             variant="contained"
//             onClick={handleExportExcel}
//             disabled={reportData.length === 0}
//             sx={{
//               backgroundColor: '#673ab7',
//               '&:hover': { backgroundColor: '#512da8' },
//             }}
//           >
//             Export Excel
//           </Button>
//         </Stack>
//       </Stack>

//       {/* Search below filters */}
//       <Box sx={{ mb: 3 }}>
//         <TextField
//           label="Search Employee"
//           variant="outlined"
//           size="small"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           sx={{
//             width: 300,
//             '& .MuiOutlinedInput-root': {
//               '& fieldset': {
//                 borderColor: '#673ab7',
//               },
//               '&:hover fieldset': {
//                 borderColor: '#512da8',
//               },
//               '&.Mui-focused fieldset': {
//                 borderColor: '#673ab7',
//               },
//             },
//             '& label.Mui-focused': {
//               color: '#673ab7',
//             },
//           }}
//         />
//       </Box>

//       {/* Content */}
//       {loading ? (
//         <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
//           <CircularProgress sx={{ color: '#673ab7' }} />
//         </Box>
//       ) : error ? (
//         <Typography color="error" align="center">{error}</Typography>
//       ) : filteredData.length === 0 ? (
//         <Typography align="center">No data available for the selected period.</Typography>
//       ) : (
//         <>
//           <TableContainer component={Paper} sx={{ maxHeight: 700 }}>
//             <Table stickyHeader sx={{ minWidth: 3000 }}>
//               <TableHead>
//                 <TableRow>
//                   <TableCell
//                     rowSpan={2}
//                     sx={{
//                       fontWeight: 'bold', position: 'sticky', left: 0, zIndex: 3,
//                       backgroundColor: '#e3f2fd',
//                       borderRight: '1px solid #ccc',
//                     }}
//                   >
//                     Employee Name
//                   </TableCell>
//                   {daysInMonth.map((day) => (
//                     <TableCell
//                       key={`date-${day}`}
//                       align="center"
//                       sx={{ fontWeight: 'bold', backgroundColor: '#e3f2fd' }}
//                     >
//                       {day}
//                     </TableCell>
//                   ))}
//                 </TableRow>
//                 <TableRow>
//                   {daysInMonth.map((day) => (
//                     <TableCell
//                       key={`day-${day}`}
//                       align="center"
//                       sx={{
//                         fontWeight: 'bold',
//                         backgroundColor: '#e3f2fd',
//                         color: reportData[0]?.[day]?.day === 'Sunday' ? 'red' : 'inherit'
//                       }}
//                     >
//                       {reportData[0]?.[day]?.day.substring(0, 2) || ''}
//                     </TableCell>
//                   ))}
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {filteredData
//                   .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                   .map((employee) => (
//                     <TableRow key={employee.name} hover>
//                       <TableCell
//                         sx={{
//                           fontWeight: 'bold',
//                           position: 'sticky',
//                           left: 0,
//                           backgroundColor: 'white',
//                           borderRight: '1px solid #ccc',
//                         }}
//                       >
//                         {employee.name}
//                       </TableCell>
//                       {daysInMonth.map((day) => {
//                         const dayData = employee[day] || { in: '', out: '', day: '' };
//                         const isSunday = dayData.day === 'Sunday';
//                         return (
//                           <TableCell
//                             key={`${employee.name}-${day}`}
//                             align="center"
//                             sx={{
//                               backgroundColor: isSunday ? '#d1e7dd' : 'inherit',
//                               border: '1px solid #e0e0e0',
//                               padding: '6px',
//                             }}
//                           >
//                             <Box>{dayData.in || '--'}</Box>
//                             <Box sx={{ borderTop: '1px solid #ccc', mt: 0.5, pt: 0.5 }}>
//                               {dayData.out || '--'}
//                             </Box>
//                           </TableCell>
//                         );
//                       })}
//                     </TableRow>
//                   ))}
//               </TableBody>
//             </Table>
//           </TableContainer>

//           {/* Pagination */}
//           <TablePagination
//             rowsPerPageOptions={[5, 10, 20, 50]}
//             component="div"
//             count={filteredData.length}
//             rowsPerPage={rowsPerPage}
//             page={page}
//             onPageChange={handleChangePage}
//             onRowsPerPageChange={handleChangeRowsPerPage}
//           />
//         </>
//       )}
//     </Box>
//   );
// };

// export default MonthlyCheckInOutReport;    ////






// import React, { useEffect, useState, useMemo } from 'react';
// import {
//   Box,
//   Typography,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   CircularProgress,
//   Select,
//   MenuItem,
//   FormControl,
//   InputLabel,
//   Button,
//   Stack,
//   TextField,
//   TablePagination,
// } from '@mui/material';
// import * as XLSX from 'xlsx';

// const MonthlyCheckInOutReport = () => {
//   const [reportData, setReportData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // --- MODIFICATION: Changed to From/To state ---
//   const [fromMonth, setFromMonth] = useState(new Date().getMonth() + 1);
//   const [fromYear, setFromYear] = useState(new Date().getFullYear());
//   const [toMonth, setToMonth] = useState(new Date().getMonth() + 1);
//   const [toYear, setToYear] = useState(new Date().getFullYear());

//   const [searchTerm, setSearchTerm] = useState('');
//   const [fetchTrigger, setFetchTrigger] = useState(false);

//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);

//   useEffect(() => {
//     if (!fetchTrigger) return;

//     const fetchData = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         // NOTE: The API endpoint supports only a single month. Using the 'from' values for the request.
//         // To implement a full date range, the backend API needs to be updated.
//         const url = `https://tdtlworld.com/hrms-backend/apis/get_employee_monthly_check_in_check_out_get_report/?month=${fromMonth}&year=${fromYear}`;
//         const res = await fetch(url);

//         if (!res.ok) {
//           throw new Error(`HTTP error! Status: ${res.status}`);
//         }

//         const data = await res.json();
//         setReportData(Array.isArray(data) ? data : []);
//       } catch (err) {
//         console.error("Error fetching attendance report:", err);
//         setError("Failed to load data. Please try again.");
//         setReportData([]);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, [fetchTrigger, fromMonth, fromYear]); // Note: Only depends on 'from' values due to API limitation

//   const daysInMonth = useMemo(() => {
//     if (reportData.length === 0) return [];
//     return Object.keys(reportData[0])
//       .filter((key) => !isNaN(key))
//       .sort((a, b) => Number(a) - Number(b));
//   }, [reportData]);

//   const monthOptions = [
//     { value: 1, label: 'January' }, { value: 2, label: 'February' },
//     { value: 3, label: 'March' }, { value: 4, label: 'April' },
//     { value: 5, label: 'May' }, { value: 6, label: 'June' },
//     { value: 7, label: 'July' }, { value: 8, label: 'August' },
//     { value: 9, label: 'September' }, { value: 10, label: 'October' },
//     { value: 11, label: 'November' }, { value: 12, label: 'December' },
//   ];

//   const yearOptions = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - 5 + i);

//   const handleExportExcel = () => {
//     const dataForExport = reportData.map((employee, index) => {
//       const flatEmployee = {
//         'Sr. No.': page * rowsPerPage + index + 1,
//         'Employee Name': employee.name
//       };
//       daysInMonth.forEach(day => {
//         const dayData = employee[day] || {};
//         flatEmployee[`${day}-In`] = dayData.in || '';
//         flatEmployee[`${day}-Out`] = dayData.out || '';
//       });
//       return flatEmployee;
//     });

//     const worksheet = XLSX.utils.json_to_sheet(dataForExport);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "MonthlyReport");

//     const monthName = monthOptions.find(m => m.value === fromMonth)?.label || 'Month';
//     const fileName = `Monthly_Report_${monthName}_${fromYear}.xlsx`;
//     XLSX.writeFile(workbook, fileName);
//   };


//   const filteredData = reportData.filter(emp =>
//     emp.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const handleChangePage = (event, newPage) => setPage(newPage);
//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const headerCellStyle = {
//     fontWeight: 'bold',
//     backgroundColor: '#e3f2fd',
//     zIndex: 3
//   };
//   const firstColWidth = 60;
//   const secondColWidth = 250;


//   return (
//     <Box sx={{ p: 3 }}>
//       <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#111827', mb: 2 }}>
//         Monthly Punch-in/Punch-out Report
//       </Typography>

//       {/* --- MODIFICATION: Controls Row with From/To filters --- */}
//       <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2, flexWrap: 'wrap' }}>
//         <Typography sx={{ fontWeight: 'bold' }}>From:</Typography>
//         <FormControl sx={{ minWidth: 120 }} size="small">
//           <InputLabel>Month</InputLabel>
//           <Select value={fromMonth} label="Month" onChange={(e) => setFromMonth(e.target.value)}>
//             {monthOptions.map((month) => <MenuItem key={month.value} value={month.value}>{month.label}</MenuItem>)}
//           </Select>
//         </FormControl>
//         <FormControl sx={{ minWidth: 100 }} size="small">
//           <InputLabel>Year</InputLabel>
//           <Select value={fromYear} label="Year" onChange={(e) => setFromYear(e.target.value)}>
//             {yearOptions.map((year) => <MenuItem key={year} value={year}>{year}</MenuItem>)}
//           </Select>
//         </FormControl>

//         <Typography sx={{ fontWeight: 'bold', ml: 2 }}>To:</Typography>
//         <FormControl sx={{ minWidth: 120 }} size="small">
//           <InputLabel>Month</InputLabel>
//           <Select value={toMonth} label="Month" onChange={(e) => setToMonth(e.target.value)}>
//             {monthOptions.map((month) => <MenuItem key={month.value} value={month.value}>{month.label}</MenuItem>)}
//           </Select>
//         </FormControl>
//         <FormControl sx={{ minWidth: 100 }} size="small">
//           <InputLabel>Year</InputLabel>
//           <Select value={toYear} label="Year" onChange={(e) => setToYear(e.target.value)}>
//             {yearOptions.map((year) => <MenuItem key={year} value={year}>{year}</MenuItem>)}
//           </Select>
//         </FormControl>

//         <Stack direction="row" spacing={2} sx={{ ml: 'auto' }}>
//           <Button variant="contained" onClick={() => setFetchTrigger(prev => !prev)} sx={{ backgroundColor: '#673ab7', '&:hover': { backgroundColor: '#512da8' } }}>
//             Generate Report
//           </Button>

//         </Stack>
//       </Stack>

//       <Box sx={{ mb: 3 }}>
//         <TextField label="Search Employee" variant="outlined" size="small" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} sx={{ width: 300, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#673ab7' }, '&:hover fieldset': { borderColor: '#512da8' }, '&.Mui-focused fieldset': { borderColor: '#673ab7' } }, '& label.Mui-focused': { color: '#673ab7' } }} />
//       </Box>

//       {loading ? (
//         <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}><CircularProgress sx={{ color: '#673ab7' }} /></Box>
//       ) : error ? (
//         <Typography color="error" align="center">{error}</Typography>
//       ) : filteredData.length === 0 ? (
//         <Typography align="center">No data available. Please generate a report.</Typography>
//       ) : (
//         <>
//           <TableContainer component={Paper} sx={{ maxHeight: 700 }}>
//             <Table stickyHeader sx={{ minWidth: 3000 }}>
//               <TableHead>
//                 <TableRow>
//                   {/* --- MODIFICATION: Added Sr. No. Header --- */}
//                   <TableCell rowSpan={2} sx={{ ...headerCellStyle, position: 'sticky', left: 0, minWidth: firstColWidth, borderRight: '1px solid #ccc' }}>
//                     Sr. No.
//                   </TableCell>
//                   <TableCell rowSpan={2} sx={{ ...headerCellStyle, position: 'sticky', left: firstColWidth, minWidth: secondColWidth, borderRight: '1px solid #ccc' }}>
//                     Employee Name
//                   </TableCell>
//                   {daysInMonth.map((day) => (
//                     <TableCell key={`date-${day}`} align="center" sx={{ ...headerCellStyle, position: 'sticky', top: 0 }}>
//                       {day}
//                     </TableCell>
//                   ))}
//                 </TableRow>
//                 <TableRow>
//                   {daysInMonth.map((day) => (
//                     <TableCell
//                       key={`day-${day}`}
//                       align="center"
//                       sx={{
//                         ...headerCellStyle,
//                         position: 'sticky',
//                         top: 57, // Adjust this value based on your first header row's height
//                         color: reportData[0]?.[day]?.day === 'Sunday' ? 'red' : 'inherit'
//                       }}
//                     >
//                       {reportData[0]?.[day]?.day.substring(0, 2) || ''}
//                     </TableCell>
//                   ))}
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {filteredData
//                   .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                   .map((employee, index) => (
//                     <TableRow key={employee.name} hover>
//                       {/* --- MODIFICATION: Added Sr. No. Cell --- */}
//                       <TableCell sx={{ position: 'sticky', left: 0, backgroundColor: 'white', borderRight: '1px solid #ccc' }}>
//                         {page * rowsPerPage + index + 1}
//                       </TableCell>
//                       <TableCell sx={{ fontWeight: 'bold', position: 'sticky', left: firstColWidth, backgroundColor: 'white', borderRight: '1px solid #ccc' }}>
//                         {employee.name}
//                       </TableCell>
//                       {daysInMonth.map((day) => {
//                         const dayData = employee[day] || { in: '', out: '', day: '' };
//                         const isSunday = dayData.day === 'Sunday';
//                         return (
//                           <TableCell
//                             key={`${employee.name}-${day}`}
//                             align="center"
//                             sx={{ backgroundColor: isSunday ? '#ffebee' : 'inherit', border: '1px solid #e0e0e0', padding: '6px' }}
//                           >
//                             <Box>{dayData.in || '--'}</Box>
//                             <Box sx={{ borderTop: '1px solid #ccc', mt: 0.5, pt: 0.5 }}>{dayData.out || '--'}</Box>
//                           </TableCell>
//                         );
//                       })}
//                     </TableRow>
//                   ))}
//               </TableBody>
//             </Table>
//           </TableContainer>

//           <TablePagination
//             rowsPerPageOptions={[5, 10, 20, 50]}
//             component="div"
//             count={filteredData.length}
//             rowsPerPage={rowsPerPage}
//             page={page}
//             onPageChange={handleChangePage}
//             onRowsPerPageChange={handleChangeRowsPerPage}
//           />
//         </>
//       )}
//     </Box>
//   );
// };

// export default MonthlyCheckInOutReport;








// import React, { useEffect, useState, useMemo } from 'react';
// import {
//   Box,
//   Typography,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   CircularProgress,
//   Select,
//   MenuItem,
//   FormControl,
//   InputLabel,
//   Button,
//   Stack,
//   TextField,
//   TablePagination,
// } from '@mui/material';
// import * as XLSX from 'xlsx';

// // Helper to generate a list of financial year strings (e.g., "2023-2024")
// const generateFinancialYears = () => {
//   const currentYear = new Date().getFullYear();
//   const years = [];
//   // Generate a range of years, e.g., 5 years past and 2 years future
//   for (let i = -5; i < 2; i++) {
//     const startYear = currentYear + i;
//     const endYear = startYear + 1;
//     years.push(`${startYear}-${endYear}`);
//   }
//   return years.reverse(); // Show most recent first
// };

// // Helper to get the current financial year string
// const getCurrentFinancialYear = () => {
//   const today = new Date();
//   const currentMonth = today.getMonth() + 1; // 1-12
//   const currentYear = today.getFullYear();
//   // Financial year starts in April (month 4)
//   if (currentMonth >= 4) {
//     return `${currentYear}-${currentYear + 1}`;
//   }
//   return `${currentYear - 1}-${currentYear}`;
// };


// const MonthlyCheckInOutReport = () => {
//   const [reportData, setReportData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // State for single month and financial year selection
//   const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
//   const [selectedFinancialYear, setSelectedFinancialYear] = useState(getCurrentFinancialYear());

//   const [searchTerm, setSearchTerm] = useState('');
//   const [fetchTrigger, setFetchTrigger] = useState(0); // Use a counter to trigger fetch on button click

//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);

//   useEffect(() => {
//     // Return early if the fetch is not triggered by the button
//     if (fetchTrigger === 0) return;

//     const fetchData = async () => {
//       setLoading(true);
//       setError(null);
//       setReportData([]); // Clear previous data on new fetch

//       try {
//         // Calculate correct calendar year for API based on the selected financial year and month
//         // e.g., For FY '2023-2024', Jan-Mar are in 2024, while Apr-Dec are in 2023.
//         const [startYear, endYear] = selectedFinancialYear.split('-').map(Number);
//         const yearForApi = selectedMonth >= 4 ? startYear : endYear;

//         const url = `https://tdtlworld.com/hrms-backend/apis/get_employee_monthly_check_in_check_out_get_report/?month=${selectedMonth}&year=${yearForApi}`;
//         const res = await fetch(url);

//         if (!res.ok) {
//           throw new Error(`HTTP error! Status: ${res.status}`);
//         }

//         const data = await res.json();
//         setReportData(Array.isArray(data) ? data : []);
//         setPage(0); // Reset to first page on new data
//       } catch (err) {
//         console.error("Error fetching attendance report:", err);
//         setError("Failed to load data. Please try again.");
//         setReportData([]);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, [fetchTrigger, selectedMonth, selectedFinancialYear]); // Dependency array

//   const daysInMonth = useMemo(() => {
//     if (reportData.length === 0) return [];
//     return Object.keys(reportData[0])
//       .filter((key) => !isNaN(key))
//       .sort((a, b) => Number(a) - Number(b));
//   }, [reportData]);

//   const monthOptions = [
//     { value: 1, label: 'January' }, { value: 2, label: 'February' },
//     { value: 3, label: 'March' }, { value: 4, label: 'April' },
//     { value: 5, label: 'May' }, { value: 6, label: 'June' },
//     { value: 7, label: 'July' }, { value: 8, label: 'August' },
//     { value: 9, label: 'September' }, { value: 10, label: 'October' },
//     { value: 11, label: 'November' }, { value: 12, label: 'December' },
//   ];

//   const financialYearOptions = useMemo(() => generateFinancialYears(), []);

//   const filteredData = useMemo(() => reportData.filter(emp =>
//     emp.name.toLowerCase().includes(searchTerm.toLowerCase())
//   ), [reportData, searchTerm]);

//   const handleExportExcel = () => {
//     const dataForExport = filteredData.map((employee, index) => {
//       const flatEmployee = {
//         'Sr. No.': index + 1,
//         'Employee Name': employee.name
//       };
//       daysInMonth.forEach(day => {
//         const dayData = employee[day] || {};
//         flatEmployee[`${day}-In`] = dayData.in || '';
//         flatEmployee[`${day}-Out`] = dayData.out || '';
//       });
//       return flatEmployee;
//     });

//     const worksheet = XLSX.utils.json_to_sheet(dataForExport);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "MonthlyReport");

//     const monthName = monthOptions.find(m => m.value === selectedMonth)?.label || 'Month';
//     const fileName = `Monthly_Report_${monthName}_${selectedFinancialYear}.xlsx`;
//     XLSX.writeFile(workbook, fileName);
//   };

//   const handleChangePage = (event, newPage) => setPage(newPage);
//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const headerCellStyle = {
//     fontWeight: 'bold',
//     backgroundColor: '#e3f2fd',
//     zIndex: 3,
//     border: '1px solid #ddd'
//   };

//   const firstColWidth = 60;
//   const secondColWidth = 250;

//   return (
//     <Box sx={{ p: 3 }}>
//       <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#111827', mb: 2 }}>
//         Monthly Punch-in/Punch-out Report
//       </Typography>

//       {/* --- Controls are now in a separate Paper component (div) --- */}
//       <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
//         <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems="center" sx={{ mb: 2 }}>
//             <FormControl sx={{ minWidth: 150 }} size="small">
//                 <InputLabel>Month</InputLabel>
//                 <Select value={selectedMonth} label="Month" onChange={(e) => setSelectedMonth(e.target.value)}>
//                     {monthOptions.map((month) => <MenuItem key={month.value} value={month.value}>{month.label}</MenuItem>)}
//                 </Select>
//             </FormControl>
//             <FormControl sx={{ minWidth: 150 }} size="small">
//                 <InputLabel>Financial Year</InputLabel>
//                 <Select value={selectedFinancialYear} label="Financial Year" onChange={(e) => setSelectedFinancialYear(e.target.value)}>
//                     {financialYearOptions.map((year) => <MenuItem key={year} value={year}>{year}</MenuItem>)}
//                 </Select>
//             </FormControl>
//             <Button
//                 variant="contained"
//                 onClick={() => setFetchTrigger(prev => prev + 1)} // Increment to trigger effect
//                 sx={{ backgroundColor: '#673ab7', '&:hover': { backgroundColor: '#512da8' } }}
//             >
//                 Generate Report
//             </Button>
//         </Stack>
//         <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems="center" justifyContent="space-between">
//             <TextField
//                 label="Search Employee"
//                 variant="outlined"
//                 size="small"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 sx={{ width: { xs: '100%', md: 300 } }}
//             />
//              <Button
//                 variant="outlined"
//                 onClick={handleExportExcel}
//                 disabled={filteredData.length === 0 || loading}
//                 sx={{ borderColor: '#673ab7', color: '#673ab7', '&:hover': { borderColor: '#512da8', backgroundColor: 'rgba(103, 58, 183, 0.04)' } }}
//             >
//                 Export to Excel
//             </Button>
//         </Stack>
//       </Paper>


//       {/* --- Table and its related components are in this section (another logical div) --- */}
//       {loading ? (
//         <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}><CircularProgress sx={{ color: '#673ab7' }} /></Box>
//       ) : error ? (
//         <Typography color="error" align="center">{error}</Typography>
//       ) : fetchTrigger === 0 ? (
//           <Paper sx={{p: 3, textAlign: 'center'}}>
//             <Typography>Please select a month and year, then click "Generate Report" to view data.</Typography>
//           </Paper>
//       ) : reportData.length === 0 && !loading ? (
//         <Paper sx={{p: 3, textAlign: 'center'}}>
//             <Typography>No data available for the selected period.</Typography>
//         </Paper>
//       ) : (
//         <Paper>
//           {/* TableContainer provides the horizontal scroll (overflow) */}
//           <TableContainer sx={{ maxHeight: 700 }}>
//             <Table stickyHeader sx={{ minWidth: 3000 }}>
//               <TableHead>
//                 <TableRow>
//                   <TableCell rowSpan={2} sx={{ ...headerCellStyle, position: 'sticky', left: 0, minWidth: firstColWidth }}>
//                     Sr. No.
//                   </TableCell>
//                   <TableCell rowSpan={2} sx={{ ...headerCellStyle, position: 'sticky', left: firstColWidth, minWidth: secondColWidth }}>
//                     Employee Name
//                   </TableCell>
//                   {daysInMonth.map((day) => (
//                     <TableCell key={`date-${day}`} colSpan={2} align="center" sx={{ ...headerCellStyle, position: 'sticky', top: 0, color: reportData[0]?.[day]?.day === 'Sunday' ? 'red' : 'inherit' }}>
//                       {day} - {reportData[0]?.[day]?.day.substring(0, 3) || ''}
//                     </TableCell>
//                   ))}
//                 </TableRow>
//                 <TableRow>
//                   {daysInMonth.map((day) => (
//                     <React.Fragment key={`in-out-${day}`}>
//                         <TableCell align="center" sx={{...headerCellStyle, position: 'sticky', top: 57 }}>In</TableCell>
//                         <TableCell align="center" sx={{...headerCellStyle, position: 'sticky', top: 57 }}>Out</TableCell>
//                     </React.Fragment>
//                   ))}
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {filteredData
//                   .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                   .map((employee, index) => (
//                     <TableRow key={employee.emp_id || index} hover>
//                       <TableCell sx={{ position: 'sticky', left: 0, backgroundColor: 'white', borderRight: '1px solid #ddd' }}>
//                         {page * rowsPerPage + index + 1}
//                       </TableCell>
//                       <TableCell sx={{ fontWeight: 'bold', position: 'sticky', left: firstColWidth, backgroundColor: 'white', borderRight: '1px solid #ddd' }}>
//                         {employee.name}
//                       </TableCell>
//                       {daysInMonth.map((day) => {
//                         const dayData = employee[day] || {};
//                         const isSunday = dayData.day === 'Sunday';
//                         return (
//                            <React.Fragment key={`${employee.emp_id}-${day}`}>
//                                 <TableCell align="center" sx={{ backgroundColor: isSunday ? '#ffebee' : 'inherit', border: '1px solid #e0e0e0', padding: '8px' }}>
//                                     {dayData.in || '--'}
//                                 </TableCell>
//                                 <TableCell align="center" sx={{ backgroundColor: isSunday ? '#ffebee' : 'inherit', border: '1px solid #e0e0e0', padding: '8px' }}>
//                                     {dayData.out || '--'}
//                                 </TableCell>
//                            </React.Fragment>
//                         );
//                       })}
//                     </TableRow>
//                   ))}
//               </TableBody>
//             </Table>
//           </TableContainer>

//           <TablePagination
//             rowsPerPageOptions={[5, 10, 20, 50]}
//             component="div"
//             count={filteredData.length}
//             rowsPerPage={rowsPerPage}
//             page={page}
//             onPageChange={handleChangePage}
//             onRowsPerPageChange={handleChangeRowsPerPage}
//           />
//         </Paper>
//       )}
//     </Box>
//   );
// };

// export default MonthlyCheckInOutReport;


// import React, { useState, useMemo } from 'react';
// import {
//   Box,
//   Typography,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   CircularProgress,
//   Select,
//   MenuItem,
//   FormControl,
//   InputLabel,
//   Button,
//   TextField,
//   Grid,
//   Container,
//   Alert,
//   FormHelperText,
// } from '@mui/material';
// import * as XLSX from 'xlsx';

// // Generates single years (e.g., 2025) for the dropdown
// const generateFinancialYears = () => {
//   const currentYear = new Date().getFullYear();
//   const years = [];
//   for (let i = -5; i < 0; i++) {
//     const startYear = currentYear + i;
//     const endYear = startYear + 1;
//     years.push(endYear); // Only push the end year
//   }
//   return years.reverse();
// };

// const MonthlyCheckInOutReport = () => {
//   const [reportData, setReportData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [hasSearched, setHasSearched] = useState(false);

//   const [selectedMonth, setSelectedMonth] = useState('');
//   const [selectedFinancialYear, setSelectedFinancialYear] = useState('');
//   const [searchTerm, setSearchTerm] = useState('');

//   const [validationError, setValidationError] = useState('');

//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);

//   const handleFetchReport = () => {
//     if (!selectedMonth || !selectedFinancialYear) {
//       setValidationError('Please select both a month and a financial year.');
//       return;
//     }
//     setValidationError('');

//     setPage(0);
//     setHasSearched(true);
//     fetchData();
//   };

//   const fetchData = async () => {
//     setLoading(true);
//     setError(null);
//     setReportData([]);

//     try {
//       const endYear = Number(selectedFinancialYear);
//       const startYear = endYear - 1;
//       const yearForApi = selectedMonth >= 4 ? startYear : endYear;

//       const url = `https://tdtlworld.com/hrms-backend/apis/get_employee_monthly_check_in_check_out_get_report/?month=${selectedMonth}&year=${yearForApi}`;
//       const res = await fetch(url);

//       if (!res.ok) {
//         throw new Error(`HTTP error! Status: ${res.status}`);
//       }

//       const data = await res.json();
//       setReportData(Array.isArray(data) ? data : []);
//     } catch (err) {
//       console.error("Error fetching attendance report:", err);
//       setError("Failed to load data. Please try again.");
//       setReportData([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const daysInMonth = useMemo(() => {
//     if (reportData.length === 0) return [];
//     return Object.keys(reportData[0])
//       .filter((key) => !isNaN(key))
//       .sort((a, b) => Number(a) - Number(b));
//   }, [reportData]);

//   const monthOptions = [
//     { value: 1, label: 'January' }, { value: 2, label: 'February' },
//     { value: 3, label: 'March' }, { value: 4, label: 'April' },
//     { value: 5, label: 'May' }, { value: 6, label: 'June' },
//     { value: 7, label: 'July' }, { value: 8, label: 'August' },
//     { value: 9, label: 'September' }, { value: 10, label: 'October' },
//     { value: 11, label: 'November' }, { value: 12, 'label': 'December' },
//   ];

//   const financialYearOptions = useMemo(() => generateFinancialYears(), []);

//   const filteredData = useMemo(() =>
//     reportData.filter(emp =>
//       emp.name.toLowerCase().includes(searchTerm.toLowerCase())
//     ),
//     [reportData, searchTerm]
//   );

//   const paginatedData = filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
//   const pageCount = Math.ceil(filteredData.length / rowsPerPage);

//   const handleExportExcel = () => {
//     const dataForExport = filteredData.map((employee, index) => {
//       const flatEmployee = { 'Sr. No.': page * rowsPerPage + index + 1, 'Employee Name': employee.name };
//       daysInMonth.forEach(day => {
//         const dayData = employee[day] || {};
//         flatEmployee[`${day}-In`] = dayData.in || '';
//         flatEmployee[`${day}-Out`] = dayData.out || '';
//       });
//       return flatEmployee;
//     });

//     const worksheet = XLSX.utils.json_to_sheet(dataForExport);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "MonthlyReport");
//     const monthName = monthOptions.find(m => m.value === selectedMonth)?.label || 'Month';
//     const fileName = `Monthly_Report_${monthName}_${selectedFinancialYear}.xlsx`;
//     XLSX.writeFile(workbook, fileName);
//   };

//   const handleRowsPerPageChange = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const handleSearchChange = (event) => {
//     setSearchTerm(event.target.value);
//     setPage(0);
//   };

//   const headerCellStyle = { fontWeight: 'bold', backgroundColor: '#e3f2fd', border: '1px solid #ddd' };
//   const firstColWidth = 60;
//   const secondColWidth = 250;
//   const totalColumns = 2 + (daysInMonth.length * 2);

//   const purpleButtonStyle = {
//     backgroundColor: "#673ab7",
//     color: "#fff",
//     height: 40,
//     "&:hover": { backgroundColor: "#5e35b1" },
//   };

//   return (
//     <Container sx={{ p: 2 }}>
//       <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#111827', mb: 2 }}>
//         Monthly Punch-in/out Report
//       </Typography>

//       <Grid container spacing={2} mb={1} alignItems="center">
//         <Grid item xs={12} sm={4} md={2}>
//           <FormControl fullWidth size="small">
//             <InputLabel>Rows</InputLabel>
//             <Select value={rowsPerPage} label="Rows" onChange={handleRowsPerPageChange}>
//               <MenuItem value={10}>10</MenuItem>
//               <MenuItem value={20}>20</MenuItem>
//               <MenuItem value={50}>50</MenuItem>
//             </Select>
//           </FormControl>
//         </Grid>

//         <Grid item xs={12} sm={8} md={8} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
//           <FormControl sx={{ minWidth: 150 }} size="small" error={!!validationError && !selectedMonth}>
//             <InputLabel>Month</InputLabel>
//             <Select value={selectedMonth} label="Month" onChange={(e) => setSelectedMonth(e.target.value)}>
//               {monthOptions.map((month) => <MenuItem key={month.value} value={month.value}>{month.label}</MenuItem>)}
//             </Select>
//           </FormControl>
//           <FormControl sx={{ minWidth: 150 }} size="small" error={!!validationError && !selectedFinancialYear}>
//             <InputLabel>Year</InputLabel>
//             <Select value={selectedFinancialYear} label="Year" onChange={(e) => setSelectedFinancialYear(e.target.value)}>
//               {financialYearOptions.map((year) => <MenuItem key={year} value={year}>{year}</MenuItem>)}
//             </Select>
//           </FormControl>
//           <Button variant="contained" onClick={handleFetchReport} sx={purpleButtonStyle}>
//             Generate Report
//           </Button>
//           {reportData.length > 0 && (
//             <Button variant="contained" onClick={handleExportExcel} sx={purpleButtonStyle}>
//               Export to Excel
//             </Button>
//           )}
//         </Grid>

//         <Grid item xs={12} sm={12} md={2}>
//           <TextField
//             fullWidth
//             size="small"
//             variant="outlined"
//             placeholder="Search Employee..."
//             value={searchTerm}
//             onChange={handleSearchChange}
//           />
//         </Grid>
//       </Grid>

//       {validationError && (
//         <Grid container justifyContent="center" sx={{ mb: 2 }}>
//           <FormControl error>
//             <FormHelperText>{validationError}</FormHelperText>
//           </FormControl>
//         </Grid>
//       )}

//       <Paper sx={{ borderRadius: 2, boxShadow: 3, overflow: 'hidden', mt: 2 }}>
//         <TableContainer>
//           <Table stickyHeader sx={{ minWidth: 3000, whiteSpace: 'nowrap' }}>
//             <TableHead>
//               <TableRow>
//                 <TableCell rowSpan={2} sx={{ ...headerCellStyle, position: 'sticky', left: 0, minWidth: firstColWidth, zIndex: 4 }}>Sr. No.</TableCell>
//                 <TableCell rowSpan={2} sx={{ ...headerCellStyle, position: 'sticky', left: firstColWidth, minWidth: secondColWidth, zIndex: 4 }}>Employee Name</TableCell>
//                 {daysInMonth.map((day) => (
//                   <TableCell key={`date-${day}`} colSpan={2} align="center" sx={{ ...headerCellStyle, color: reportData[0]?.[day]?.day === 'Sunday' ? 'red' : 'inherit' }}>
//                     {day} - {reportData[0]?.[day]?.day.substring(0, 3) || ''}
//                   </TableCell>
//                 ))}
//               </TableRow>
//               <TableRow>
//                 {daysInMonth.map((day) => (
//                   <React.Fragment key={`in-out-${day}`}>
//                     <TableCell align="center" sx={{ ...headerCellStyle, position: 'sticky', top: 57 }}>In</TableCell>
//                     <TableCell align="center" sx={{ ...headerCellStyle, position: 'sticky', top: 57 }}>Out</TableCell>
//                   </React.Fragment>
//                 ))}
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {loading ? (
//                 <TableRow><TableCell colSpan={totalColumns} align="center"><CircularProgress /></TableCell></TableRow>
//               ) : error ? (
//                 <TableRow><TableCell colSpan={totalColumns} align="center"><Alert severity="error">{error}</Alert></TableCell></TableRow>
//               ) : !hasSearched ? (
//                 <TableRow><TableCell colSpan={totalColumns} align="center">Please select a month and year, then click "Generate Report".</TableCell></TableRow>
//               ) : paginatedData.length > 0 ? (
//                 paginatedData.map((employee, index) => (
//                   <TableRow key={employee.emp_id || index} hover>
//                     <TableCell sx={{ position: 'sticky', left: 0, backgroundColor: 'white', borderRight: '1px solid #ddd', borderBottom: '1px solid #ddd' }}>
//                       {page * rowsPerPage + index + 1}
//                     </TableCell>
//                     <TableCell sx={{ fontWeight: 'bold', position: 'sticky', left: firstColWidth, backgroundColor: 'white', borderRight: '1px solid #ddd', borderBottom: '1px solid #ddd' }}>
//                       {employee.name}
//                     </TableCell>
//                     {daysInMonth.map((day) => {
//                       const dayData = employee[day] || {};
//                       const isSunday = dayData.day === 'Sunday';
//                       return (
//                         <React.Fragment key={`${employee.emp_id}-${day}`}>
//                           {/* --- MODIFIED: Added border to cells --- */}
//                           <TableCell align="center" sx={{ backgroundColor: isSunday ? '#ffebee' : 'inherit', border: '1px solid #e0e0e0' }}>{dayData.in || '--'}</TableCell>
//                           <TableCell align="center" sx={{ backgroundColor: isSunday ? '#ffebee' : 'inherit', border: '1px solid #e0e0e0' }}>{dayData.out || '--'}</TableCell>
//                         </React.Fragment>
//                       );
//                     })}
//                   </TableRow>
//                 ))
//               ) : (
//                 <TableRow><TableCell colSpan={totalColumns} align="center">No data available for the selected criteria.</TableCell></TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </Paper>

//       {filteredData.length > 0 && (
//         <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', p: 2, gap: 2 }}>
//           <Button variant="contained" onClick={() => setPage(page - 1)} disabled={page === 0} sx={purpleButtonStyle}>
//             Previous
//           </Button>
//           <Typography variant="body1">
//             Page {page + 1} of {pageCount > 0 ? pageCount : 1}
//           </Typography>
//           <Button variant="contained" onClick={() => setPage(page + 1)} disabled={page >= pageCount - 1} sx={purpleButtonStyle}>
//             Next
//           </Button>
//         </Box>
//       )}
//     </Container>
//   );
// };

// export default MonthlyCheckInOutReport;    /////
 




// import React, { useState, useMemo } from 'react';
// import {
//   Box,
//   Typography,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   CircularProgress,
//   Select,
//   MenuItem,
//   FormControl,
//   InputLabel,
//   Button,
//   TextField,
//   Grid,
//   Container,
//   Alert,
//   FormHelperText,
// } from '@mui/material';
// import * as XLSX from 'xlsx';

// // NEW: Generates the START year of financial periods in descending order
// const generateFinancialYearOptions = () => {
//   const years = [];
//   const now = new Date();
//   const currentYear = now.getFullYear();
//   const currentMonth = now.getMonth(); // 0 = January, 3 = April

//   let latestFinancialYearStart = currentMonth >= 3 ? currentYear : currentYear - 1;

//   for (let i = 0; i < 10; i++) {
//     years.push(String(latestFinancialYearStart - i));
//   }
//   return years;
// };

// const MonthlyCheckInOutReport = () => {
//   const [reportData, setReportData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [hasSearched, setHasSearched] = useState(false);

//   // CHANGED: Year and month are now empty by default
//   const [selectedMonth, setSelectedMonth] = useState('');
//   const [selectedFinancialYear, setSelectedFinancialYear] = useState('');
//   const [searchTerm, setSearchTerm] = useState('');

//   const [validationError, setValidationError] = useState('');

//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);

//   const handleFetchReport = () => {
//     // CHANGED: Updated validation message
//     if (!selectedMonth || !selectedFinancialYear) {
//       setValidationError('Please select both a month and a financial year.');
//       return;
//     }
//     setValidationError('');

//     setPage(0);
//     setHasSearched(true);
//     fetchData();
//   };

//   const fetchData = async () => {
//     setLoading(true);
//     setError(null);
//     setReportData([]);

//     try {
//       // CHANGED: Correctly calculate the calendar year from the financial year's start date
//       const startYear = Number(selectedFinancialYear);
//       const endYear = startYear + 1;
//       // If month is Apr-Dec, use the start year. If Jan-Mar, use the end year.
//       const yearForApi = selectedMonth >= 4 ? startYear : endYear;

//       const url = `https://tdtlworld.com/hrms-backend/apis/get_employee_monthly_check_in_check_out_get_report/?month=${selectedMonth}&year=${yearForApi}`;
//       const res = await fetch(url);

//       if (!res.ok) {
//         throw new Error(`HTTP error! Status: ${res.status}`);
//       }

//       const data = await res.json();
//       setReportData(Array.isArray(data) ? data : []);
//     } catch (err) {
//       console.error("Error fetching attendance report:", err);
//       setError("Failed to load data. Please try again.");
//       setReportData([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const daysInMonth = useMemo(() => {
//     if (reportData.length === 0) return [];
//     return Object.keys(reportData[0])
//       .filter((key) => !isNaN(key))
//       .sort((a, b) => Number(a) - Number(b));
//   }, [reportData]);

//   const monthOptions = [
//     { value: 1, label: 'January' }, { value: 2, label: 'February' },
//     { value: 3, label: 'March' }, { value: 4, label: 'April' },
//     { value: 5, label: 'May' }, { value: 6, label: 'June' },
//     { value: 7, label: 'July' }, { value: 8, label: 'August' },
//     { value: 9, label: 'September' }, { value: 10, label: 'October' },
//     { value: 11, label: 'November' }, { value: 12, 'label': 'December' },
//   ];

//   const financialYearOptions = useMemo(() => generateFinancialYearOptions(), []);

//   const filteredData = useMemo(() =>
//     reportData.filter(emp =>
//       emp.name.toLowerCase().includes(searchTerm.toLowerCase())
//     ),
//     [reportData, searchTerm]
//   );

//   const paginatedData = filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
//   const pageCount = Math.ceil(filteredData.length / rowsPerPage);

//   const handleExportExcel = () => {
//     const dataForExport = filteredData.map((employee, index) => {
//       const flatEmployee = { 'Sr. No.': page * rowsPerPage + index + 1, 'Employee Name': employee.name };
//       daysInMonth.forEach(day => {
//         const dayData = employee[day] || {};
//         flatEmployee[`${day}-In`] = dayData.in || '';
//         flatEmployee[`${day}-Out`] = dayData.out || '';
//       });
//       return flatEmployee;
//     });

//     const worksheet = XLSX.utils.json_to_sheet(dataForExport);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "MonthlyReport");
//     const monthName = monthOptions.find(m => m.value === selectedMonth)?.label || 'Month';
//     const fileName = `Monthly_Report_${monthName}_${selectedFinancialYear}.xlsx`;
//     XLSX.writeFile(workbook, fileName);
//   };

//   const handleRowsPerPageChange = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const handleSearchChange = (event) => {
//     setSearchTerm(event.target.value);
//     setPage(0);
//   };

//   const headerCellStyle = { fontWeight: 'bold', backgroundColor: '#e3f2fd', border: '1px solid #ddd' };
//   const firstColWidth = 60;
//   const secondColWidth = 250;
//   const totalColumns = 2 + (daysInMonth.length * 2);

//   const purpleButtonStyle = {
//     backgroundColor: "#673ab7",
//     color: "#fff",
//     height: 40,
//     "&:hover": { backgroundColor: "#5e35b1" },
//     "&.Mui-disabled": { backgroundColor: "#b39ddb", color: "#f5f5f5" }
//   };

//   return (
//     <Container sx={{ p: 2 }}>
//       <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#111827', mb: 2 }}>
//         Monthly Punch-in/out Report
//       </Typography>

//       <Grid container spacing={2} mb={1} alignItems="center">
//         <Grid item xs={12} sm={4} md={2}>
//           <FormControl fullWidth size="small">
//             <InputLabel>Rows</InputLabel>
//             <Select value={rowsPerPage} label="Rows" onChange={handleRowsPerPageChange}>
//               <MenuItem value={10}>10</MenuItem>
//               <MenuItem value={20}>20</MenuItem>
//               <MenuItem value={50}>50</MenuItem>
//             </Select>
//           </FormControl>
//         </Grid>

//         <Grid item xs={12} sm={8} md={8} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
//           <FormControl sx={{ minWidth: 150 }} size="small" error={!!validationError && !selectedMonth}>
//             <InputLabel>Month</InputLabel>
//             <Select value={selectedMonth} label="Month" onChange={(e) => setSelectedMonth(e.target.value)}>
//               {monthOptions.map((month) => <MenuItem key={month.value} value={month.value}>{month.label}</MenuItem>)}
//             </Select>
//           </FormControl>
//           {/* CHANGED: This is now the Financial Year dropdown */}
//           <FormControl sx={{ minWidth: 150 }} size="small" error={!!validationError && !selectedFinancialYear}>
//             <InputLabel>Financial Year</InputLabel>
//             <Select value={selectedFinancialYear} label="Financial Year" onChange={(e) => setSelectedFinancialYear(e.target.value)}>
//               {financialYearOptions.map((year) => <MenuItem key={year} value={year}>{`${year}-${parseInt(year) + 1}`}</MenuItem>)}
//             </Select>
//           </FormControl>
//           <Button
//             variant="contained"
//             onClick={handleFetchReport}
//             sx={purpleButtonStyle}
//             // CHANGED: Disabled until both fields are selected
//             disabled={!selectedMonth || !selectedFinancialYear || loading}
//           >
//             Generate Report
//           </Button>
//           {reportData.length > 0 && (
//             <Button variant="contained" onClick={handleExportExcel} sx={purpleButtonStyle}>
//               Export to Excel
//             </Button>
//           )}
//         </Grid>

//         <Grid item xs={12} sm={12} md={2}>
//           <TextField
//             fullWidth
//             size="small"
//             variant="outlined"
//             placeholder="Search Employee..."
//             value={searchTerm}
//             onChange={handleSearchChange}
//           />
//         </Grid>
//       </Grid>

//       {validationError && (
//         <Grid container justifyContent="center" sx={{ mb: 2 }}>
//           <FormControl error>
//             <FormHelperText>{validationError}</FormHelperText>
//           </FormControl>
//         </Grid>
//       )}

//       <Paper sx={{ borderRadius: 2, boxShadow: 3, overflow: 'hidden', mt: 2 }}>
//         <TableContainer>
//           <Table stickyHeader sx={{ minWidth: 3000, whiteSpace: 'nowrap' }}>
//             <TableHead>
//               <TableRow>
//                 <TableCell rowSpan={2} sx={{ ...headerCellStyle, position: 'sticky', left: 0, minWidth: firstColWidth, zIndex: 4 }}>Sr. No.</TableCell>
//                 <TableCell rowSpan={2} sx={{ ...headerCellStyle, position: 'sticky', left: firstColWidth, minWidth: secondColWidth, zIndex: 4 }}>Employee Name</TableCell>
//                 {daysInMonth.map((day) => (
//                   <TableCell key={`date-${day}`} colSpan={2} align="center" sx={{ ...headerCellStyle, color: reportData[0]?.[day]?.day === 'Sunday' ? 'red' : 'inherit' }}>
//                     {day} - {reportData[0]?.[day]?.day.substring(0, 3) || ''}
//                   </TableCell>
//                 ))}
//               </TableRow>
//               <TableRow>
//                 {daysInMonth.map((day) => (
//                   <React.Fragment key={`in-out-${day}`}>
//                     <TableCell align="center" sx={{ ...headerCellStyle, position: 'sticky', top: 57 }}>In</TableCell>
//                     <TableCell align="center" sx={{ ...headerCellStyle, position: 'sticky', top: 57 }}>Out</TableCell>
//                   </React.Fragment>
//                 ))}
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {loading ? (
//                 <TableRow><TableCell colSpan={totalColumns} align="center"><CircularProgress /></TableCell></TableRow>
//               ) : error ? (
//                 <TableRow><TableCell colSpan={totalColumns} align="center"><Alert severity="error">{error}</Alert></TableCell></TableRow>
//               ) : !hasSearched ? (
//                 <TableRow><TableCell colSpan={totalColumns} align="center">Please select a month and financial year, then click "Generate Report".</TableCell></TableRow>
//               ) : paginatedData.length > 0 ? (
//                 paginatedData.map((employee, index) => (
//                   <TableRow key={employee.emp_id || index} hover>
//                     <TableCell sx={{ position: 'sticky', left: 0, backgroundColor: 'white', borderRight: '1px solid #ddd', borderBottom: '1px solid #ddd' }}>
//                       {page * rowsPerPage + index + 1}
//                     </TableCell>
//                     <TableCell sx={{ fontWeight: 'bold', position: 'sticky', left: firstColWidth, backgroundColor: 'white', borderRight: '1px solid #ddd', borderBottom: '1px solid #ddd' }}>
//                       {employee.name}
//                     </TableCell>
//                     {daysInMonth.map((day) => {
//                       const dayData = employee[day] || {};
//                       const isSunday = dayData.day === 'Sunday';
//                       return (
//                         <React.Fragment key={`${employee.emp_id}-${day}`}>
//                           <TableCell align="center" sx={{ backgroundColor: isSunday ? '#ffebee' : 'inherit', border: '1px solid #e0e0e0' }}>{dayData.in || '--'}</TableCell>
//                           <TableCell align="center" sx={{ backgroundColor: isSunday ? '#ffebee' : 'inherit', border: '1px solid #e0e0e0' }}>{dayData.out || '--'}</TableCell>
//                         </React.Fragment>
//                       );
//                     })}
//                   </TableRow>
//                 ))
//               ) : (
//                 <TableRow><TableCell colSpan={totalColumns} align="center">No data available for the selected criteria.</TableCell></TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </Paper>

//       {filteredData.length > 0 && (
//         <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', p: 2, gap: 2 }}>
//           <Button variant="contained" onClick={() => setPage(page - 1)} disabled={page === 0} sx={purpleButtonStyle}>
//             Previous
//           </Button>
//           <Typography variant="body1">
//             Page {page + 1} of {pageCount > 0 ? pageCount : 1}
//           </Typography>
//           <Button variant="contained" onClick={() => setPage(page + 1)} disabled={page >= pageCount - 1} sx={purpleButtonStyle}>
//             Next
//           </Button>
//         </Box>
//       )}
//     </Container>
//   );
// };

// export default MonthlyCheckInOutReport;











import React, { useState, useMemo } from 'react';
import {
    Box, Typography, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Alert, Stack,
    FormControl, InputLabel, Select, MenuItem, TextField, Button, Paper,
    Skeleton, useTheme, useMediaQuery, Pagination
} from '@mui/material';
import GridOnIcon from '@mui/icons-material/GridOn';
import * as XLSX from 'xlsx';

// HELPER: Generates the START year of financial periods in descending order
const generateFinancialYearOptions = () => {
    const years = [];
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth(); // 0 = January, 3 = April
    let latestFinancialYearStart = currentMonth >= 3 ? currentYear : currentYear - 1;
    for (let i = 0; i < 10; i++) {
        years.push(String(latestFinancialYearStart - i));
    }
    return years;
};

const MonthlyCheckInOutReport = () => {
    // --- Hooks for State, Theme, and Responsiveness ---
    const [reportData, setReportData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [hasSearched, setHasSearched] = useState(false);
    const [selectedMonth, setSelectedMonth] = useState('');
    const [selectedFinancialYear, setSelectedFinancialYear] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [validationError, setValidationError] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const primaryColor = "#8C257C";
    const primaryButtonHover = "#6d1d60";
    const secondaryColor = "#F58E35";

    // --- Data Fetching ---
    const handleFetchReport = () => {
        if (!selectedMonth || !selectedFinancialYear) {
            setValidationError('Please select both a month and a financial year.');
            return;
        }
        setValidationError('');
        setPage(0); // Reset page on new search
        setHasSearched(true);
        fetchData();
    };

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        setReportData([]);

        try {
            const startYear = Number(selectedFinancialYear);
            const endYear = startYear + 1;
            const yearForApi = selectedMonth >= 4 ? startYear : endYear;
            const url = `https://tdtlworld.com/hrms-backend/apis/get_employee_monthly_check_in_check_out_get_report/?month=${selectedMonth}&year=${yearForApi}`;
            
            // Using axiosInstance pattern if available, otherwise fetch
            const res = await fetch(url);
            if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
            
            const data = await res.json();
            setReportData(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error("Error fetching attendance report:", err);
            setError("Failed to load data. Please try again.");
            setReportData([]);
        } finally {
            setLoading(false);
        }
    };

    // --- Memoized Calculations & Event Handlers ---
    const daysInMonth = useMemo(() => {
        if (reportData.length === 0) return [];
        return Object.keys(reportData[0])
            .filter((key) => !isNaN(key))
            .sort((a, b) => Number(a) - Number(b));
    }, [reportData]);

    const monthOptions = [
        { value: 1, label: 'January' }, { value: 2, label: 'February' },
        { value: 3, label: 'March' }, { value: 4, label: 'April' },
        { value: 5, label: 'May' }, { value: 6, label: 'June' },
        { value: 7, label: 'July' }, { value: 8, label: 'August' },
        { value: 9, label: 'September' }, { value: 10, label: 'October' },
        { value: 11, label: 'November' }, { value: 12, 'label': 'December' },
    ];
    const financialYearOptions = useMemo(() => generateFinancialYearOptions(), []);

    const filteredData = useMemo(() => reportData.filter(emp => emp.name.toLowerCase().includes(searchTerm.toLowerCase())), [reportData, searchTerm]);
    const paginatedData = useMemo(() => filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage), [filteredData, page, rowsPerPage]);

    const handleSearchChange = (event) => { setSearchTerm(event.target.value); setPage(0); };
    const handleRowsPerPageChange = (event) => { setRowsPerPage(parseInt(event.target.value, 10)); setPage(0); };
    const handlePaginationChange = (event, newPage) => { setPage(newPage - 1); };

    // --- EXPORT FUNCTIONALITY ---
    const handleExportExcel = () => {
        const dataForExport = filteredData.map((employee, index) => {
            const flatEmployee = { 'Sr. No.': page * rowsPerPage + index + 1, 'Employee Name': employee.name };
            daysInMonth.forEach(day => {
                const dayData = employee[day] || {};
                flatEmployee[`${day}-In`] = dayData.in || '';
                flatEmployee[`${day}-Out`] = dayData.out || '';
            });
            return flatEmployee;
        });

        const worksheet = XLSX.utils.json_to_sheet(dataForExport);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "MonthlyReport");
        const monthName = monthOptions.find(m => m.value === selectedMonth)?.label || 'Month';
        const fileName = `Monthly_Report_${monthName}_${selectedFinancialYear}.xlsx`;
        XLSX.writeFile(workbook, fileName);
    };

    // --- STYLING & CONSTANTS ---
    const headerCellStyle = { fontWeight: 'bold', backgroundColor: primaryColor, color: '#fff', textAlign: 'center', border: '1px solid #ddd', whiteSpace: 'nowrap' };
    const firstColWidth = 60;
    const secondColWidth = 250;
    const totalColumns = 2 + (daysInMonth.length * 2);
    const startEntry = filteredData.length > 0 ? page * rowsPerPage + 1 : 0;
    const endEntry = Math.min((page + 1) * rowsPerPage, filteredData.length);

    return (
        <Box p={2}>
            <Typography variant="h4" fontWeight="bold" color={primaryColor} mb={5}>
                Monthly Punch-in/out Report
            </Typography>

            <Paper sx={{ p: 2, mb: 2 }}>
                <Stack direction={isMobile ? 'column' : 'row'} spacing={2} mb={2} flexWrap="wrap">
                    <FormControl size="small" error={!!validationError && !selectedMonth} sx={{ minWidth: 200, flexGrow: 1 }}>
                        <InputLabel>Month</InputLabel>
                        <Select value={selectedMonth} label="Month" onChange={(e) => setSelectedMonth(e.target.value)}>
                            {monthOptions.map((month) => <MenuItem key={month.value} value={month.value}>{month.label}</MenuItem>)}
                        </Select>
                    </FormControl>
                    <FormControl size="small" error={!!validationError && !selectedFinancialYear} sx={{ minWidth: 200, flexGrow: 1 }}>
                        <InputLabel>Financial Year</InputLabel>
                        <Select value={selectedFinancialYear} label="Financial Year" onChange={(e) => setSelectedFinancialYear(e.target.value)}>
                            {financialYearOptions.map((year) => <MenuItem key={year} value={year}>{`${year}-${parseInt(year) + 1}`}</MenuItem>)}
                        </Select>
                    </FormControl>
                </Stack>
                {validationError && <Alert severity="warning" sx={{ mb: 2 }}>{validationError}</Alert>}
                <Stack direction={isMobile ? 'column' : 'row'} justifyContent="space-between" alignItems="center" spacing={2}>
                    <Button variant="contained" onClick={handleFetchReport} disabled={!selectedMonth || !selectedFinancialYear || loading} sx={{ backgroundColor: primaryColor, '&:hover': { backgroundColor: primaryButtonHover } }}>
                        Generate Report
                    </Button>
                    <Button variant="outlined" onClick={handleExportExcel} startIcon={<GridOnIcon />} disabled={filteredData.length === 0} sx={{ borderColor: secondaryColor, color: secondaryColor, '&:hover': { borderColor: '#e07e2a', backgroundColor: '#fff8f2' } }}>
                        Export
                    </Button>
                </Stack>
            </Paper>

            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

            {hasSearched && (
                <>
                    <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
                        <Table stickyHeader sx={{ minWidth: 3000, whiteSpace: 'nowrap' }}>
                            <TableHead>
                                <TableRow>
                                    <TableCell rowSpan={2} sx={{ ...headerCellStyle, position: 'sticky', left: 0, minWidth: firstColWidth, zIndex: 4 }}>Sr. No.</TableCell>
                                    <TableCell rowSpan={2} sx={{ ...headerCellStyle, position: 'sticky', left: firstColWidth, minWidth: secondColWidth, zIndex: 4 }}>Employee Name</TableCell>
                                    {daysInMonth.map((day) => (
                                        <TableCell key={`date-${day}`} colSpan={2} align="center" sx={{ ...headerCellStyle, color: reportData[0]?.[day]?.day === 'Sunday' ? '#ffcdd2' : 'inherit' }}>
                                            {day} - {reportData[0]?.[day]?.day.substring(0, 3) || ''}
                                        </TableCell>
                                    ))}
                                </TableRow>
                                <TableRow>
                                    {daysInMonth.map((day) => (
                                        <React.Fragment key={`in-out-${day}`}>
                                            <TableCell align="center" sx={{ ...headerCellStyle, position: 'sticky', top: 57 }}>In</TableCell>
                                            <TableCell align="center" sx={{ ...headerCellStyle, position: 'sticky', top: 57 }}>Out</TableCell>
                                        </React.Fragment>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {loading ? (
                                    [...Array(rowsPerPage)].map((_, rowIndex) => (
                                        <TableRow key={rowIndex}>
                                            {[...Array(totalColumns)].map((_, cellIndex) => <TableCell key={cellIndex}><Skeleton variant="text" /></TableCell>)}
                                        </TableRow>
                                    ))
                                ) : paginatedData.length > 0 ? (
                                    paginatedData.map((employee, index) => (
                                        <TableRow key={employee.emp_id || index} hover>
                                            <TableCell sx={{ position: 'sticky', left: 0, backgroundColor: 'white', borderRight: '1px solid #ddd', borderBottom: '1px solid #ddd' }}>{page * rowsPerPage + index + 1}</TableCell>
                                            <TableCell sx={{ fontWeight: 'bold', position: 'sticky', left: firstColWidth, backgroundColor: 'white', borderRight: '1px solid #ddd', borderBottom: '1px solid #ddd' }}>{employee.name}</TableCell>
                                            {daysInMonth.map((day) => {
                                                const dayData = employee[day] || {};
                                                const isSunday = dayData.day === 'Sunday';
                                                return (
                                                    <React.Fragment key={`${employee.emp_id}-${day}`}>
                                                        <TableCell align="center" sx={{ backgroundColor: isSunday ? '#ffebee' : 'inherit', border: '1px solid #e0e0e0' }}>{dayData.in || '--'}</TableCell>
                                                        <TableCell align="center" sx={{ backgroundColor: isSunday ? '#ffebee' : 'inherit', border: '1px solid #e0e0e0' }}>{dayData.out || '--'}</TableCell>
                                                    </React.Fragment>
                                                );
                                            })}
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow><TableCell colSpan={totalColumns} align="center">No data available for the selected criteria.</TableCell></TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    {filteredData.length > 0 && (
                        <Box sx={{ p: 2, borderTop: '1px solid rgba(224, 224, 224, 1)' }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <FormControl variant="outlined" size="small">
                                        <Select value={rowsPerPage} onChange={handleRowsPerPageChange} sx={{ backgroundColor: '#8C257C', color: 'white', borderRadius: '4px', '&:hover': { backgroundColor: '#8C257C' }, '& .MuiOutlinedInput-notchedOutline': { border: 'none' }, '& .MuiSvgIcon-root': { color: 'white' } }}>
                                            {[10, 25, 50, 100].map(value => <MenuItem key={value} value={value}>{value}</MenuItem>)}
                                        </Select>
                                    </FormControl>
                                    <Typography variant="body2" color="text.secondary">{`Showing ${startEntry} to ${endEntry} of ${filteredData.length} results`}</Typography>
                                </Box>
                                <TextField size="small" variant="outlined" placeholder="Search Employee..." value={searchTerm} onChange={handleSearchChange} sx={{ width: isMobile ? '100%' : 'auto' }} />
                                <Pagination count={Math.ceil(filteredData.length / rowsPerPage)} page={page + 1} onChange={handlePaginationChange} showFirstButton showLastButton sx={{ '& .MuiPaginationItem-root': { borderRadius: '4px', '&:hover': { backgroundColor: secondaryColor, color: 'white' } }, '& .MuiPaginationItem-page': { color: primaryColor, '&.Mui-selected': { backgroundColor: primaryColor, color: 'white', '&:hover': { backgroundColor: secondaryColor } } }, '& .MuiPaginationItem-icon': { color: primaryColor } }} />
                            </Box>
                        </Box>
                    )}
                </>
            )}
        </Box>
    );
};

export default MonthlyCheckInOutReport;