// PunchInOutReport.jsx
import React, { useState, useMemo } from 'react';
import {
    Box,
    Typography,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Button,
    TextField,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Grid,
    TablePagination
} from '@mui/material';

// --- MOCK DATA (In a real app, this would come from an API) ---
// This data is structured to match the visual layout in your image.
const getMockData = () => [
    { employeeName: "Ganesh Bhausaheb Shirsat", attendance: { 23: { in: "18:40", out: null }, 24: { in: "18:40", out: null } } },
    { employeeName: "Prem Mander ram Kumar", attendance: { 8: { in: "13:26", out: "15:17" } } },
    { employeeName: "Prasad Ravindra Shinde", attendance: { 1: { in: "13:24", out: "13:24" }, 2: { in: "16:00", out: null }, 3: { in: "05:35", out: null }, 4: { in: "13:52", out: "13:52" }, 5: { in: "10:52", out: "11:16" }, 6: { in: "14:49", out: "15:48" }, 7: { in: "03:24", out: "23:19" }, 8: { in: "10:31", out: "21:54" }, 9: { in: "13:02", out: null }, 11: { in: "13:02", out: "16:46" }, 12: { in: "18:15", out: null } } },
    { employeeName: "Ambika Test. Mitkari", attendance: { 1: { in: "04:31", out: null }, 4: { in: "10:36", out: "10:37" }, 8: { in: "21:48", out: "21:50" }, 9: { in: "12:52", out: "13:17" }, 12: { in: "13:02", out: "18:13" }, 20: { in: "11:58", out: "15:34" } } },
    { employeeName: "Sakshi Phadatare", attendance: { 7: { in: "19:17", out: "19:19" } } },
    { employeeName: "Nikhil Jayanand pawar", attendance: { 6: { in: "06:44", out: "19:35" }, 8: { in: "09:52", out: "19:27" }, 10: { in: "21:53", out: "22:27" }, 11: { in: "12:15", out: "17:20" }, 12: { in: "15:09", out: null } } },
    { employeeName: "Atharv Sanjay Jadhav", attendance: { 1: { in: "12:58", out: "12:58" }, 3: { in: "06:18", out: "06:20" }, 4: { in: "12:52", out: "12:52" }, 5: { in: "09:37", out: "13:17" }, 6: { in: "04:15", out: "05:28" }, 7: { in: "19:27", out: "21:37" } } },
    { employeeName: "Rajeshwari Demapure", attendance: { 2: { in: "09:00", out: "17:30" }, 7: { in: "14:00", out: null } } },
    { employeeName: "Krishna Ramesh Bidkar", attendance: { 11: { in: "21:07", out: null }, 12: { in: "12:00", out: null } } },
    ...Array.from({ length: 6 }, (_, i) => ({ employeeName: `Sample Employee ${i + 10}`, attendance: {} })), // Adding more employees to show pagination
];


// --- Helper Function to generate calendar days for the header ---
const getMonthDetails = (year, month) => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const days = [];
    const dayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    for (let i = 1; i <= daysInMonth; i++) {
        const date = new Date(year, month, i);
        days.push({
            date: i,
            dayName: dayNames[date.getDay()],
        });
    }
    return days;
};

// --- Main Component ---
const EmpConfirmationReport = () => {
    // State Management
    const [month, setMonth] = useState(7); // 0-indexed: 7 is August
    const [year, setYear] = useState(2025);
    const [searchText, setSearchText] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    // In a real app, you would fetch this data
    const allData = useMemo(() => getMockData(), []);

    // Memoized calculations for performance
    const monthDetails = useMemo(() => getMonthDetails(year, month), [year, month]);

    const filteredData = useMemo(() => {
        if (!searchText) return allData;
        return allData.filter(emp =>
            emp.employeeName.toLowerCase().includes(searchText.toLowerCase())
        );
    }, [searchText, allData]);

    // Handlers for user interactions
    const handleGenerateReport = () => {
        // In a real app, this would trigger an API call
        console.log(`Generating report for ${month + 1}/${year}`);
        setPage(0); // Reset to first page
    };

    const handleExportExcel = () => {
        console.log("Exporting to Excel...");
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // Constants for dropdowns
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const years = [2025, 2024, 2023, 2022];

    const paginatedData = filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    const purpleColor = '#5e35b1';

    return (
        <Paper sx={{ p: 3, margin: { xs: 1, md: 2 } }}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
                Monthly Punch-in/Punch-out Report
            </Typography>

            {/* Top Control Bar: Filters and Buttons */}
            <Grid container spacing={2} alignItems="center" sx={{ mb: 2 }}>
                <Grid item>
                    <FormControl size="small" sx={{ minWidth: 120 }}>
                        <InputLabel>Month</InputLabel>
                        <Select value={month} label="Month" onChange={(e) => setMonth(e.target.value)}>
                            {months.map((m, index) => <MenuItem key={m} value={index}>{m}</MenuItem>)}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item>
                    <FormControl size="small" sx={{ minWidth: 100 }}>
                        <InputLabel>Year</InputLabel>
                        <Select value={year} label="Year" onChange={(e) => setYear(e.target.value)}>
                            {years.map(y => <MenuItem key={y} value={y}>{y}</MenuItem>)}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item>
                    <Button variant="contained" onClick={handleGenerateReport} sx={{ backgroundColor: purpleColor, '&:hover': { backgroundColor: '#4527a0' } }}>
                        GENERATE REPORT
                    </Button>
                </Grid>
                <Grid item>
                    <Button variant="contained" onClick={handleExportExcel} sx={{ backgroundColor: purpleColor, '&:hover': { backgroundColor: '#4527a0' } }}>
                        EXPORT EXCEL
                    </Button>
                </Grid>
            </Grid>

            {/* Search and Rows Per Page Bar */}
            <Grid container spacing={2} alignItems="center" sx={{ mb: 2 }}>
                <Grid item xs={12} sm={6} md={4}>
                    <TextField
                        fullWidth
                        size="small"
                        variant="outlined"
                        placeholder="Search Employee"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                </Grid>
                <Grid item>
                    <FormControl sx={{ minWidth: 120, flexDirection: 'row', alignItems: 'center', gap: 1 }}>
                        <Typography variant="body2" color="text.secondary">Rows per page:</Typography>
                        <Select
                            size="small"
                            value={rowsPerPage}
                            onChange={handleChangeRowsPerPage}
                        >
                            <MenuItem value={10}>10</MenuItem>
                            <MenuItem value={15}>15</MenuItem>
                            <MenuItem value={25}>25</MenuItem>
                            <MenuItem value={50}>50</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>

            {/* Main Data Table */}
            <TableContainer>
                <Table stickyHeader sx={{ borderCollapse: 'collapse' }}>
                    <TableHead>
                        <TableRow>
                            <TableCell rowSpan={2} sx={{ border: '1px solid #ddd', minWidth: 200, fontWeight: 'bold', zIndex: 3 }}>
                                Employee Name
                            </TableCell>
                            {monthDetails.map(day => (
                                <TableCell key={day.date} align="center" sx={{ border: '1px solid #ddd', fontWeight: 'bold', backgroundColor: day.dayName === 'Su' ? '#e8f5e9' : 'inherit' }}>
                                    {day.date}
                                </TableCell>
                            ))}
                        </TableRow>
                        <TableRow>
                            {monthDetails.map(day => (
                                <TableCell key={`day-${day.date}`} align="center" sx={{ border: '1px solid #ddd', fontWeight: 'bold', backgroundColor: day.dayName === 'Su' ? '#e8f5e9' : 'inherit', color: day.dayName === 'Su' ? 'red' : 'inherit' }}>
                                    {day.dayName}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedData.map(employee => (
                            <TableRow key={employee.employeeName} hover>
                                <TableCell sx={{ border: '1px solid #ddd', fontWeight: 500 }}>
                                    {employee.employeeName}
                                </TableCell>
                                {monthDetails.map(day => {
                                    const attendance = employee.attendance[day.date];
                                    return (
                                        <TableCell key={`${employee.employeeName}-${day.date}`} align="center" sx={{ border: '1px solid #ddd', padding: 0, backgroundColor: day.dayName === 'Su' ? '#e8f5e9' : 'inherit' }}>
                                            <Box sx={{ p: 1, borderBottom: '1px solid #eee' }}>{attendance?.in || '-'}</Box>
                                            <Box sx={{ p: 1 }}>{attendance?.out || '-'}</Box>
                                        </TableCell>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Bottom Pagination Controls */}
            <TablePagination
                component="div"
                count={filteredData.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                rowsPerPageOptions={[]} // Hiding the selector here as it's moved to the top
            />
        </Paper>
    );
};

export default EmpConfirmationReport;