// import React, { useState, useMemo } from 'react';
// import {
//     Box,
//     Typography,
//     Paper,
//     Table,
//     TableBody,
//     TableCell,
//     TableContainer,
//     TableHead,
//     TableRow,
//     CircularProgress,
//     Select,
//     MenuItem,
//     FormControl,
//     InputLabel,
//     Button,
//     TextField,
//     Grid,
//     Container,
//     Alert,
//     // TableFooter is no longer needed
// } from '@mui/material';
// import * as XLSX from 'xlsx';

// // Helper function to generate financial year options dynamically
// const generateFinancialYearOptions = () => {
//     const years = [];
//     const now = new Date();
//     const currentYear = now.getFullYear();
//     const currentMonth = now.getMonth(); // 0 = January, 3 = April

//     let latestFinancialYearStart = currentMonth >= 3 ? currentYear : currentYear - 1;

//     // Generate last 10 financial years in descending order
//     // Generate last 10 financial years
//   for (let i = 0; i < 6; i++) {
//     years.push(String(latestFinancialYearStart - i));
//   }
// };

// const PTReport = () => {
//     const [reportData, setReportData] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);
//     const [hasSearched, setHasSearched] = useState(false);

//     // State for filters and pagination
//     const [selectedFinancialYear, setSelectedFinancialYear] = useState('');
//     const [selectedMonth, setSelectedMonth] = useState('');
//     const [searchTerm, setSearchTerm] = useState('');
//     const [page, setPage] = useState(0);
//     const [rowsPerPage, setRowsPerPage] = useState(10);

//     const handleFetchReport = async () => {
//         if (!selectedFinancialYear || !selectedMonth) {
//             setError('Please select both a Financial Year and a Month.');
//             setHasSearched(true);
//             return;
//         }
//         setLoading(true);
//         setError(null);
//         setHasSearched(true);
//         setReportData([]);

//         try {
//             // Logic to determine the correct calendar year for the API call
//             const startYear = Number(selectedFinancialYear);
//             const endYear = startYear + 1;
//             const yearForApi = selectedMonth >= 4 ? startYear : endYear;

//             const url = `https://tdtlworld.com/hrms-backend/api/pt-report/?month=${selectedMonth}&year=${yearForApi}`;
//             const res = await fetch(url);

//             if (!res.ok) {
//                 throw new Error(`HTTP error! Status: ${res.status}`);
//             }

//             const data = await res.json();
//             setReportData(Array.isArray(data) ? data : []);
//         } catch (err) {
//             console.error("Error fetching PT report:", err);
//             setError("Failed to load data. Please try again.");
//             setReportData([]);
//         } finally {
//             setLoading(false);
//             setPage(0);
//         }
//     };

//     const financialYearOptions = useMemo(() => generateFinancialYearOptions(), []);
//     const monthOptions = Array.from({ length: 12 }, (_, i) => ({
//         value: i + 1,
//         label: new Date(0, i).toLocaleString('en-US', { month: 'long' }),
//     }));

//     const filteredData = useMemo(() =>
//         reportData.filter(row =>
//             (row.employee_name?.toLowerCase().includes(searchTerm.toLowerCase())) ||
//             (row.employee_id?.toLowerCase().includes(searchTerm.toLowerCase()))
//         ),
//         [reportData, searchTerm]
//     );

//     const paginatedData = filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
//     const pageCount = Math.ceil(filteredData.length / rowsPerPage);

//     const handleExportExcel = () => {
//         if (filteredData.length === 0) return;
//         const dataForExport = filteredData.map((row) => ({
//             'Sr No': row.sr_no,
//             'Employee ID': row.employee_id,
//             'Employee Name': row.employee_name,
//             'Number Of Days': row.days,
//             'Salary Per Month': row.salary_per_month,
//             'Total Earning': row.total_earnings,
//             'PT': row.pt,
//         }));

//         const worksheet = XLSX.utils.json_to_sheet(dataForExport);
//         const workbook = XLSX.utils.book_new();
//         XLSX.utils.book_append_sheet(workbook, worksheet, "PT_Report");
//         const monthName = monthOptions.find(m => m.value === selectedMonth)?.label || 'Month';
//         const fileName = `PT_Report_${monthName}_${selectedFinancialYear}.xlsx`;
//         XLSX.writeFile(workbook, fileName);
//     };

//     const handleRowsPerPageChange = (event) => {
//         setRowsPerPage(parseInt(event.target.value, 10));
//         setPage(0);
//     };
//     const handleSearchChange = (event) => {
//         setSearchTerm(event.target.value);
//         setPage(0);
//     };

//     const columns = [
//         { id: 'sr_no', label: 'Sr No' },
//         { id: 'employee_id', label: 'Employee ID' },
//         { id: 'employee_name', label: 'Employee Name' },
//         { id: 'days', label: 'Number Of Days' },
//         { id: 'salary_per_month', label: 'Salary Per Month' },
//         { id: 'total_earnings', label: 'Total Earning' },
//         { id: 'pt', label: 'PT' },
//     ];

//     // REMOVED: The logic for calculating totals is no longer needed.

//     const purpleButtonStyle = {
//         backgroundColor: "#673ab7", color: "#fff", height: 40,
//         "&:hover": { backgroundColor: "#5e35b1" },
//         "&.Mui-disabled": { backgroundColor: "#b39ddb", color: "#f5f5f5" },
//     };

//     return (
//         <Container disableGutters>
//             <Typography variant="h6" fontWeight="bold" mb={2}>
//                 PT (Professional Tax) Report
//             </Typography>
//             <Grid container spacing={2} mb={2} alignItems="center">
//                 <Grid item xs={12} sm={4} md={2}>
//                     <FormControl fullWidth size="small">
//                         <InputLabel>Rows</InputLabel>
//                         <Select value={rowsPerPage} label="Rows" onChange={handleRowsPerPageChange}>
//                             <MenuItem value={10}>10</MenuItem><MenuItem value={25}>25</MenuItem><MenuItem value={50}>50</MenuItem>
//                         </Select>
//                     </FormControl>
//                 </Grid>
//                 <Grid item xs={12} sm={8} md={8} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
//                     <FormControl sx={{ minWidth: 150 }} size="small">
//                         <InputLabel>Financial Year</InputLabel>
//                         <Select value={selectedFinancialYear} label="Financial Year" onChange={(e) => setSelectedFinancialYear(e.target.value)}>
//                             {financialYearOptions.map((year) => <MenuItem key={year} value={year}>{`${year}-${parseInt(year) + 1}`}</MenuItem>)}
//                         </Select>
//                     </FormControl>
//                     <FormControl sx={{ minWidth: 150 }} size="small">
//                         <InputLabel>Month</InputLabel>
//                         <Select value={selectedMonth} label="Month" onChange={(e) => setSelectedMonth(e.target.value)}>
//                             {monthOptions.map((month) => <MenuItem key={month.value} value={month.value}>{month.label}</MenuItem>)}
//                         </Select>
//                     </FormControl>
//                     <Button
//                         variant="contained"
//                         onClick={handleFetchReport}
//                         sx={purpleButtonStyle}
//                         disabled={!selectedFinancialYear || !selectedMonth || loading}
//                     >
//                         Generate Report
//                     </Button>
//                     {reportData.length > 0 && (
//                         <Button variant="contained" onClick={handleExportExcel} sx={purpleButtonStyle}>
//                             Export to Excel
//                         </Button>
//                     )}
//                 </Grid>
//                 <Grid item xs={12} sm={12} md={2}>
//                     <TextField
//                         fullWidth size="small" variant="outlined" placeholder="Search..."
//                         value={searchTerm} onChange={handleSearchChange}
//                     />
//                 </Grid>
//             </Grid>
//             <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 2 }}>
//                 <Table stickyHeader>
//                     <TableHead>
//                         <TableRow>
//                             {columns.map((col) => (
//                                 <TableCell key={col.id} sx={{ fontWeight: 'bold', backgroundColor: '#e3f2fd' }}>{col.label}</TableCell>
//                             ))}
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {loading ? (
//                             <TableRow><TableCell colSpan={columns.length} align="center"><CircularProgress /></TableCell></TableRow>
//                         ) : error ? (
//                             <TableRow><TableCell colSpan={columns.length} align="center"><Alert severity="error">{error}</Alert></TableCell></TableRow>
//                         ) : !hasSearched ? (
//                             <TableRow><TableCell colSpan={columns.length} align="center">Please select a year and month, then click "Generate Report".</TableCell></TableRow>
//                         ) : paginatedData.length > 0 ? (
//                             paginatedData.map((row) => (
//                                 <TableRow key={row.employee_id + row.sr_no} hover>
//                                     {columns.map(col => (
//                                         <TableCell key={col.id}>{row[col.id] ?? 'N/A'}</TableCell>
//                                     ))}
//                                 </TableRow>
//                             ))
//                         ) : (
//                             <TableRow><TableCell colSpan={columns.length} align="center">No data available for the selected criteria.</TableCell></TableRow>
//                         )}
//                     </TableBody>
//                     {/* REMOVED: The TableFooter component and its logic are gone. */}
//                 </Table>
//             </TableContainer>
//             {filteredData.length > 0 && (
//                 <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', p: 2, gap: 2 }}>
//                     <Button variant="contained" onClick={() => setPage(page - 1)} disabled={page === 0} sx={purpleButtonStyle}>
//                         Previous
//                     </Button>
//                     <Typography variant="body1">
//                         Page {page + 1} of {pageCount > 0 ? pageCount : 1}
//                     </Typography>
//                     <Button variant="contained" onClick={() => setPage(page + 1)} disabled={page >= pageCount - 1} sx={purpleButtonStyle}>
//                         Next
//                     </Button>
//                 </Box>
//             )}
//         </Container>
//     );
// };

// export default PTReport;     ////






// import React, { useState, useMemo } from 'react';
// import {
//     Box,
//     Typography,
//     Paper,
//     Table,
//     TableBody,
//     TableCell,
//     TableContainer,
//     TableHead,
//     TableRow,
//     CircularProgress,
//     Select,
//     MenuItem,
//     FormControl,
//     InputLabel,
//     Button,
//     TextField,
//     Grid,
//     Container,
//     Alert,
// } from '@mui/material';
// import * as XLSX from 'xlsx';

// // Helper function to generate financial year options dynamically
// const generateFinancialYearOptions = () => {
//     const years = [];
//     const now = new Date();
//     const currentYear = now.getFullYear();
//     const currentMonth = now.getMonth(); // 0 = January, 3 = April

//     let latestFinancialYearStart = currentMonth >= 3 ? currentYear : currentYear - 1;

//     // Generate last 6 financial years
//     for (let i = 0; i < 6; i++) {
//         years.push(String(latestFinancialYearStart - i));
//     }
//     // FIXED: Added the missing return statement
//     return years;
// };

// const PTReport = () => {
//     const [reportData, setReportData] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);
//     const [hasSearched, setHasSearched] = useState(false);

//     // State for filters and pagination
//     const [selectedFinancialYear, setSelectedFinancialYear] = useState('');
//     const [selectedMonth, setSelectedMonth] = useState('');
//     const [searchTerm, setSearchTerm] = useState('');
//     const [page, setPage] = useState(0);
//     const [rowsPerPage, setRowsPerPage] = useState(10);

//     const handleFetchReport = async () => {
//         if (!selectedFinancialYear || !selectedMonth) {
//             setError('Please select both a Financial Year and a Month.');
//             setHasSearched(true);
//             return;
//         }
//         setLoading(true);
//         setError(null);
//         setHasSearched(true);
//         setReportData([]);

//         try {
//             // Logic to determine the correct calendar year for the API call
//             // Months are 1-12 from state. API likely needs calendar year.
//             // Jan(1), Feb(2), Mar(3) belong to the previous financial year's end.
//             const startYear = Number(selectedFinancialYear);
//             const endYear = startYear + 1;
//             const yearForApi = selectedMonth >= 4 ? startYear : endYear;

//             const url = `https://tdtlworld.com/hrms-backend/api/pt-report/?month=${selectedMonth}&year=${yearForApi}`;
//             const res = await fetch(url);

//             if (!res.ok) {
//                 throw new Error(`HTTP error! Status: ${res.status}`);
//             }

//             const data = await res.json();
//             setReportData(Array.isArray(data) ? data : []);
//         } catch (err) {
//             console.error("Error fetching PT report:", err);
//             setError("Failed to load data. Please try again.");
//             setReportData([]);
//         } finally {
//             setLoading(false);
//             setPage(0);
//         }
//     };

//     const financialYearOptions = useMemo(() => generateFinancialYearOptions(), []);
//     const monthOptions = Array.from({ length: 12 }, (_, i) => ({
//         value: i + 1,
//         label: new Date(0, i).toLocaleString('en-US', { month: 'long' }),
//     }));

//     const filteredData = useMemo(() =>
//         reportData.filter(row =>
//             (row.employee_name?.toLowerCase().includes(searchTerm.toLowerCase())) ||
//             (row.employee_id?.toLowerCase().includes(searchTerm.toLowerCase()))
//         ),
//         [reportData, searchTerm]
//     );

//     const paginatedData = filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
//     const pageCount = Math.ceil(filteredData.length / rowsPerPage);

//     const handleExportExcel = () => {
//         if (filteredData.length === 0) return;
//         const dataForExport = filteredData.map((row) => ({
//             'Sr No': row.sr_no,
//             'Employee ID': row.employee_id,
//             'Employee Name': row.employee_name,
//             'Number Of Days': row.days,
//             'Salary Per Month': row.salary_per_month,
//             'Total Earning': row.total_earnings,
//             'PT': row.pt,
//         }));

//         const worksheet = XLSX.utils.json_to_sheet(dataForExport);
//         const workbook = XLSX.utils.book_new();
//         XLSX.utils.book_append_sheet(workbook, worksheet, "PT_Report");
//         const monthName = monthOptions.find(m => m.value === selectedMonth)?.label || 'Month';
//         const fileName = `PT_Report_${monthName}_${selectedFinancialYear}-${Number(selectedFinancialYear) + 1}.xlsx`;
//         XLSX.writeFile(workbook, fileName);
//     };

//     const handleRowsPerPageChange = (event) => {
//         setRowsPerPage(parseInt(event.target.value, 10));
//         setPage(0);
//     };
//     const handleSearchChange = (event) => {
//         setSearchTerm(event.target.value);
//         setPage(0);
//     };

//     const columns = [
//         { id: 'sr_no', label: 'Sr No' },
//         { id: 'employee_id', label: 'Employee ID' },
//         { id: 'employee_name', label: 'Employee Name' },
//         { id: 'days', label: 'Number Of Days' },
//         { id: 'salary_per_month', label: 'Salary Per Month' },
//         { id: 'total_earnings', label: 'Total Earning' },
//         { id: 'pt', label: 'PT' },
//     ];

//     const purpleButtonStyle = {
//         backgroundColor: "#673ab7", color: "#fff", height: 40,
//         "&:hover": { backgroundColor: "#5e35b1" },
//         "&.Mui-disabled": { backgroundColor: "#b39ddb", color: "#f5f5f5" },
//     };

//     return (
//         <Container disableGutters>
//             <Typography variant="h6" fontWeight="bold" mb={2}>
//                 PT (Professional Tax) Report
//             </Typography>
//             <Grid container spacing={2} mb={2} alignItems="center">
//                 <Grid item xs={12} sm={4} md={2}>
//                     <FormControl fullWidth size="small">
//                         <InputLabel>Rows</InputLabel>
//                         <Select value={rowsPerPage} label="Rows" onChange={handleRowsPerPageChange}>
//                             <MenuItem value={10}>10</MenuItem><MenuItem value={25}>25</MenuItem><MenuItem value={50}>50</MenuItem>
//                         </Select>
//                     </FormControl>
//                 </Grid>
//                 <Grid item xs={12} sm={8} md={8} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
//                     <FormControl sx={{ minWidth: 150 }} size="small">
//                         <InputLabel>Financial Year</InputLabel>
//                         <Select value={selectedFinancialYear} label="Financial Year" onChange={(e) => setSelectedFinancialYear(e.target.value)}>
//                             {financialYearOptions.map((year) => <MenuItem key={year} value={year}>{`${year}-${parseInt(year) + 1}`}</MenuItem>)}
//                         </Select>
//                     </FormControl>
//                     <FormControl sx={{ minWidth: 150 }} size="small">
//                         <InputLabel>Month</InputLabel>
//                         <Select value={selectedMonth} label="Month" onChange={(e) => setSelectedMonth(e.target.value)}>
//                             {monthOptions.map((month) => <MenuItem key={month.value} value={month.value}>{month.label}</MenuItem>)}
//                         </Select>
//                     </FormControl>
//                     <Button
//                         variant="contained"
//                         onClick={handleFetchReport}
//                         sx={purpleButtonStyle}
//                         disabled={!selectedFinancialYear || !selectedMonth || loading}
//                     >
//                         Generate Report
//                     </Button>
//                     {reportData.length > 0 && (
//                         <Button variant="contained" onClick={handleExportExcel} sx={purpleButtonStyle}>
//                             Export to Excel
//                         </Button>
//                     )}
//                 </Grid>
//                 <Grid item xs={12} sm={12} md={2}>
//                     <TextField
//                         fullWidth size="small" variant="outlined" placeholder="Search..."
//                         value={searchTerm} onChange={handleSearchChange}
//                     />
//                 </Grid>
//             </Grid>
//             <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 2 }}>
//                 <Table stickyHeader>
//                     <TableHead>
//                         <TableRow>
//                             {columns.map((col) => (
//                                 <TableCell key={col.id} sx={{ fontWeight: 'bold', backgroundColor: '#e3f2fd' }}>{col.label}</TableCell>
//                             ))}
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {loading ? (
//                             <TableRow><TableCell colSpan={columns.length} align="center"><CircularProgress /></TableCell></TableRow>
//                         ) : error ? (
//                             <TableRow><TableCell colSpan={columns.length} align="center"><Alert severity="error">{error}</Alert></TableCell></TableRow>
//                         ) : !hasSearched ? (
//                             <TableRow><TableCell colSpan={columns.length} align="center">Please select a year and month, then click "Generate Report".</TableCell></TableRow>
//                         ) : paginatedData.length > 0 ? (
//                             paginatedData.map((row, index) => (
//                                 <TableRow key={`${row.employee_id}-${index}`} hover>
//                                     {columns.map(col => (
//                                         <TableCell key={col.id}>{row[col.id] ?? 'N/A'}</TableCell>
//                                     ))}
//                                 </TableRow>
//                             ))
//                         ) : (
//                             <TableRow><TableCell colSpan={columns.length} align="center">No data available for the selected criteria.</TableCell></TableRow>
//                         )}
//                     </TableBody>
//                 </Table>
//             </TableContainer>
//             {filteredData.length > 0 && (
//                 <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', p: 2, gap: 2 }}>
//                     <Button variant="contained" onClick={() => setPage(page - 1)} disabled={page === 0} sx={purpleButtonStyle}>
//                         Previous
//                     </Button>
//                     <Typography variant="body1">
//                         Page {page + 1} of {pageCount > 0 ? pageCount : 1}
//                     </Typography>
//                     <Button variant="contained" onClick={() => setPage(page + 1)} disabled={page >= pageCount - 1} sx={purpleButtonStyle}>
//                         Next
//                     </Button>
//                 </Box>
//             )}
//         </Container>
//     );
// };

// export default PTReport;







import React, { useState, useMemo, useEffect } from 'react';
import {
    Box,
    Typography,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    CircularProgress,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Button,
    TextField,
    Grid,
    Alert,
    InputAdornment,
    useMediaQuery,
    useTheme,
    Pagination
} from '@mui/material';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
// CHANGE 1: Import autoTable as a default export
import autoTable from 'jspdf-autotable';
import { Search as SearchIcon } from '@mui/icons-material';
 
// Helper function to generate financial year options dynamically
const generateFinancialYearOptions = () => {
    const years = [];
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth(); // 0 = January, 3 = April
 
    let latestFinancialYearStart = currentMonth >= 3 ? currentYear : currentYear - 1;
 
    // Generate last 6 financial years
    for (let i = 0; i < 6; i++) {
        years.push(String(latestFinancialYearStart - i));
    }
    return years;
};
 
const PTReport = () => {
    const [reportData, setReportData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [hasSearched, setHasSearched] = useState(false);
 
    // State for filters and pagination
    const [selectedFinancialYear, setSelectedFinancialYear] = useState('');
    const [selectedMonth, setSelectedMonth] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
 
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
 
    const financialYearOptions = useMemo(() => generateFinancialYearOptions(), []);
    const monthOptions = Array.from({ length: 12 }, (_, i) => ({
        value: i + 1,
        label: new Date(0, i).toLocaleString('en-US', { month: 'long' }),
    }));
 
    // Function to fetch report data
    const handleFetchReport = async (financialYear, month) => {
        const yearToFetch = financialYear || selectedFinancialYear;
        const monthToFetch = month || selectedMonth;
 
        if (!yearToFetch || !monthToFetch) {
            setError('Financial Year and Month are required.');
            setHasSearched(true);
            setLoading(false);
            return;
        }
 
        setLoading(true);
        setError(null);
        setHasSearched(true);
        setReportData([]);
 
        try {
            const startYear = Number(yearToFetch);
            const endYear = startYear + 1;
            const yearForApi = monthToFetch >= 4 ? startYear : endYear;
 
            const url = `https://tdtlworld.com/hrms-backend/api/pt-report/?month=${monthToFetch}&year=${yearForApi}`;
            const res = await fetch(url);
 
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
 
            const data = await res.json();
            setReportData(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error("Error fetching PT report:", err);
            setError("Failed to load data. Please try again.");
            setReportData([]);
        } finally {
            setLoading(false);
            setPage(0);
        }
    };
 
    // useEffect to set defaults and fetch data on initial component mount
    useEffect(() => {
        const now = new Date();
        const currentMonth = now.getMonth() + 1;
        const currentCalenderYear = now.getFullYear();
        const currentFinancialYearStart = currentMonth >= 4 ? currentCalenderYear : currentCalenderYear - 1;
 
        const initialYear = String(currentFinancialYearStart);
        const initialMonth = currentMonth;
 
        setSelectedFinancialYear(initialYear);
        setSelectedMonth(initialMonth);
 
        handleFetchReport(initialYear, initialMonth);
    }, []);
 
    const filteredData = useMemo(() =>
        reportData.filter(row =>
            (row.employee_name?.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (row.employee_id?.toLowerCase().includes(searchTerm.toLowerCase()))
        ),
        [reportData, searchTerm]
    );
 
    const paginatedData = filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
 
    const columns = [
        { id: 'sr_no', label: 'Sr No' },
        { id: 'employee_id', label: 'Employee ID' },
        { id: 'employee_name', label: 'Employee Name' },
        { id: 'days', label: 'Number Of Days' },
        { id: 'salary_per_month', label: 'Salary Per Month' },
        { id: 'total_earnings', label: 'Total Earning' },
        { id: 'pt', label: 'PT' },
    ];
 
    const handleExportExcel = () => {
        if (filteredData.length === 0) return;
        const dataForExport = filteredData.map((row) => ({
            'Sr No': row.sr_no,
            'Employee ID': row.employee_id,
            'Employee Name': row.employee_name,
            'Number Of Days': row.days,
            'Salary Per Month': row.salary_per_month,
            'Total Earning': row.total_earnings,
            'PT': row.pt,
        }));
 
        const worksheet = XLSX.utils.json_to_sheet(dataForExport);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "PT_Report");
        const monthName = monthOptions.find(m => m.value === selectedMonth)?.label || 'Month';
        const fileName = `PT_Report_${monthName}_${selectedFinancialYear}-${Number(selectedFinancialYear) + 1}.xlsx`;
        XLSX.writeFile(workbook, fileName);
    };
    
    const handleExportPdf = () => {
        if (filteredData.length === 0) return;
        
        const doc = new jsPDF();
        const monthName = monthOptions.find(m => m.value === selectedMonth)?.label || 'Month';
        const fileName = `PT_Report_${monthName}_${selectedFinancialYear}-${Number(selectedFinancialYear) + 1}.pdf`;
 
        doc.text(`PT Report - ${monthName} ${selectedFinancialYear}-${Number(selectedFinancialYear) + 1}`, 14, 20);
 
        const tableColumns = columns.map(col => col.label);
        const tableRows = filteredData.map(row => columns.map(col => row[col.id] ?? 'N/A'));
        
        // CHANGE 2: Call autoTable as a function, passing the doc object
        autoTable(doc, {
            head: [tableColumns],
            body: tableRows,
            startY: 25,
        });
        
        doc.save(fileName);
    };
 
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        setPage(0);
    };
 
    const handlePageChange = (event, newPage) => {
        setPage(newPage - 1);
    };
 
    const handleRowsPerPageChange = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
 
    const primaryButtonStyle = {
        backgroundColor: "#8C257C",
        color: "#FFFFFF",
        "&:hover": { backgroundColor: "#6d1d60" },
        "&.Mui-disabled": { backgroundColor: "#c8a6c3", color: "#f5f5f5" },
    };
 
    const secondaryButtonStyle = {
        backgroundColor: '#8C257C',
        color: '#FFFFFF',
        '&:hover': { backgroundColor: '#8C257C' },
    };
 
    const startEntry = filteredData.length > 0 ? page * rowsPerPage + 1 : 0;
    const endEntry = Math.min((page + 1) * rowsPerPage, filteredData.length);
 
    return (
        <Box component={Paper} p={3}>
            <Typography variant="h4" color="#8C257C" fontWeight="bold" mb={5}>
                PT (Professional Tax) Report
            </Typography>
 
            <Paper sx={{ p: 2, mb: 2 }}>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                        <FormControl sx={{ minWidth: 150 }} size="small">
                            <InputLabel>Financial Year</InputLabel>
                            <Select value={selectedFinancialYear} label="Financial Year" onChange={(e) => setSelectedFinancialYear(e.target.value)}>
                                {financialYearOptions.map((year) => <MenuItem key={year} value={year}>{`${year}-${parseInt(year) + 1}`}</MenuItem>)}
                            </Select>
                        </FormControl>
                        <FormControl sx={{ minWidth: 150 }} size="small">
                            <InputLabel>Month</InputLabel>
                            <Select value={selectedMonth} label="Month" onChange={(e) => setSelectedMonth(e.target.value)}>
                                {monthOptions.map((month) => <MenuItem key={month.value} value={month.value}>{month.label}</MenuItem>)}
                            </Select>
                        </FormControl>
                        <Button
                            variant="contained"
                            onClick={() => handleFetchReport()}
                            sx={primaryButtonStyle}
                            disabled={!selectedFinancialYear || !selectedMonth || loading}
                        >
                            Generate Report
                        </Button>
                    </Grid>
 
                    <Grid item xs={12}>
                        <Box
                            display="flex"
                            flexDirection={isMobile ? 'column' : 'row'}
                            justifyContent="space-between"
                            alignItems={isMobile ? 'stretch' : 'center'}
                            gap={2}
                            mt={1}
                        >
                            <Box>
                                {reportData.length > 0 && (
                                    <Box display="flex" gap={2}>
                                        <Button variant="contained" onClick={handleExportPdf} sx={secondaryButtonStyle}>
                                            PDF
                                        </Button>
                                        <Button variant="contained" onClick={handleExportExcel} sx={secondaryButtonStyle}>
                                            Excel
                                        </Button>
                                    </Box>
                                )}
                            </Box>
                            
                            <TextField
                                size="small"
                                placeholder="Search..."
                                value={searchTerm}
                                onChange={handleSearchChange}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchIcon />
                                        </InputAdornment>
                                    ),
                                }}
                                sx={{ width: isMobile ? '100%' : 'auto' }}
                            />
                        </Box>
                    </Grid>
                </Grid>
            </Paper>
 
            <TableContainer sx={{ minWidth: '100%', whiteSpace: 'nowrap' }}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            {columns.map((col) => (
                                <TableCell key={col.id} sx={{ fontWeight: 'bold', backgroundColor: '#8C257C', color: '#FFFFFF' }}>{col.label}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loading ? (
                            <TableRow><TableCell colSpan={columns.length} align="center"><CircularProgress sx={{ color: '#8C257C' }} /></TableCell></TableRow>
                        ) : error ? (
                            <TableRow><TableCell colSpan={columns.length} align="center"><Alert severity="error">{error}</Alert></TableCell></TableRow>
                        ) : !hasSearched ? (
                            <TableRow><TableCell colSpan={columns.length} align="center">Please select a year and month, then click "Generate Report".</TableCell></TableRow>
                        ) : paginatedData.length > 0 ? (
                            paginatedData.map((row, index) => (
                                <TableRow key={`${row.employee_id}-${index}`} hover>
                                    {columns.map(col => (
                                        <TableCell key={col.id} sx={{ fontSize: '0.95rem' }}>{row[col.id] ?? 'N/A'}</TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow><TableCell colSpan={columns.length} align="center">No data available for the selected criteria.</TableCell></TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            
            <Box sx={{ p: 2, borderTop: '1px solid rgba(224, 224, 224, 1)' }}>
                {
                    !loading && filteredData.length > 0 && (
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <FormControl variant="outlined" size="small">
                                    <Select
                                        value={rowsPerPage}
                                        onChange={handleRowsPerPageChange}
                                        sx={{
                                            backgroundColor: '#8C257C',
                                            color: 'white',
                                            borderRadius: '4px',
                                            transition: 'background-color 0.3s',
                                            '&:hover': {
                                                backgroundColor: '#6d1d60',
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
                                onChange={handlePageChange}
                                showFirstButton
                                showLastButton
                                sx={{
                                    '& .MuiPaginationItem-root': {
                                        borderRadius: '4px',
                                        transition: 'background-color 0.3s, color 0.3s',
                                        '&:hover': {
                                            backgroundColor: '#F58E35',
                                            color: 'white',
                                        }
                                    },
                                    '& .MuiPaginationItem-page': {
                                        color: '#8C257C',
                                        '&.Mui-selected': {
                                            backgroundColor: '#8C257C',
                                            color: 'white',
                                            '&:hover': {
                                                backgroundColor: '#F58E35',
                                            }
                                        },
                                    },
                                    '& .MuiPaginationItem-icon': {
                                        color: '#8C257C',
                                    }
                                }}
                            />
                        </Box>
                    )
                }
            </Box>
        </Box>
    );
};
 
export default PTReport;