import React, { useState } from "react";
import {
    Box,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    CircularProgress,
    Alert,
    Grid,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TextField,
    Button,
    Container,
} from "@mui/material";
import axiosInstance from "../../utils/axiosInstance";
import * as XLSX from "xlsx"; // Import the xlsx library for Excel export

const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB"); // Format: dd/mm/yyyy
};

const EmployeeAnnualLeaveReport = () => {
    const [reportData, setReportData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [hasSearched, setHasSearched] = useState(false);

    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
    const [searchTerm, setSearchTerm] = useState("");

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleFetchReport = async () => {
        setLoading(true);
        setError(null);
        setHasSearched(true);
        setReportData([]); // Clear previous results
        try {
            const response = await axiosInstance.get(
                `/apis/get_employee_leave_request_report/?year=${selectedYear}&month=${selectedMonth}`
            );
            const rawData = Array.isArray(response.data) ? response.data : [];

            // Sort the fetched data by start_date in ascending order
            const sortedData = rawData.sort(
                (a, b) => new Date(a.start_date) - new Date(b.start_date)
            );

            setReportData(sortedData);
        } catch (err) {
            setError("Failed to fetch leave report data. Please try again later.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Function to handle exporting the report to an Excel file
    const handleExport = () => {
        if (reportData.length === 0) return;

        // Prepare the data for export, adding SR. NO. and formatting dates
        const dataToExport = reportData.map((row, index) => ({
            "SR. NO.": index + 1,
            "EMPLOYEE ID": row.employee_id || "N/A",
            "DEPARTMENT": row.department_name || "N/A",
            "DESIGNATION": row.designation_name || "N/A",
            "MANAGER": row.manager_name?.trim() || "N/A",
            "JOINING DATE": formatDate(row.date_of_joining),
            "LEAVE TYPE": row.leave_type || "N/A",
            "START DATE": formatDate(row.start_date),
            "END DATE": formatDate(row.end_date),
            "NO. OF DAYS": row.no_of_days ?? "N/A",
            "REASON": row.reason || "N/A",
            "REMARKS": row.remarks || "N/A",
        }));

        const worksheet = XLSX.utils.json_to_sheet(dataToExport);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "AnnualLeaveReport");

        // Generate the file and trigger download
        XLSX.writeFile(workbook, `AnnualLeaveReport_${selectedYear}_${selectedMonth}.xlsx`);
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        setPage(0);
    };

    const handleRowsPerPageChange = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const filteredData = reportData.filter((row) => {
        const s = searchTerm.toLowerCase();
        return (
            row.employee_id?.toLowerCase().includes(s) ||
            row.department_name?.toLowerCase().includes(s) ||
            row.designation_name?.toLowerCase().includes(s) ||
            row.manager_name?.toLowerCase().includes(s) ||
            row.leave_type?.toLowerCase().includes(s) ||
            row.reason?.toLowerCase().includes(s) ||
            row.remarks?.toLowerCase().includes(s)
        );
    });

    const paginatedData = filteredData.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    );
    const pageCount = Math.ceil(filteredData.length / rowsPerPage);

    const currentYear = new Date().getFullYear();
    const yearOptions = Array.from({ length: 6 }, (_, i) => currentYear - 5 + i);

    const monthOptions = [
        { value: 1, label: "January" }, { value: 2, label: "February" },
        { value: 3, label: "March" }, { value: 4, label: "April" },
        { value: 5, label: "May" }, { value: 6, label: "June" },
        { value: 7, label: "July" }, { value: 8, label: "August" },
        { value: 9, label: "September" }, { value: 10, label: "October" },
        { value: 11, label: "November" }, { value: 12, label: "December" },
    ];

    const purpleButtonStyle = {
        backgroundColor: "#673ab7",
        color: "#fff",
        height: 40,
        "&:hover": { backgroundColor: "#5e35b1" },
    };

    const columns = [
        { id: "sr_no", label: "SR. NO." },
        { id: "employee_id", label: "EMPLOYEE ID" },
        { id: "department_name", label: "DEPARTMENT" },
        { id: "designation_name", label: "DESIGNATION" },
        { id: "manager_name", label: "MANAGER" },
        { id: "date_of_joining", label: "JOINING DATE" },
        { id: "leave_type", label: "LEAVE TYPE" },
        { id: "start_date", label: "START DATE" },
        { id: "end_date", label: "END DATE" },
        { id: "no_of_days", label: "NO. OF DAYS" },
        { id: "reason", label: "REASON" },
        { id: "remarks", label: "REMARKS" },
    ];

    return (
        <Container disableGutters>
            <Box>
                <Typography variant="h6" fontWeight="bold" mb={2}>
                    Employee Annual Leave Report
                </Typography>

                <Grid container spacing={2} mb={2} alignItems="center">
                    <Grid item xs={12} sm={3} md={2}>
                        <FormControl fullWidth size="small">
                            <InputLabel>Rows</InputLabel>
                            <Select value={rowsPerPage} label="Rows" onChange={handleRowsPerPageChange}>
                                <MenuItem value={5}>5</MenuItem>
                                <MenuItem value={10}>10</MenuItem>
                                <MenuItem value={25}>25</MenuItem>
                                <MenuItem value={50}>50</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6} md={8}>
                        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 2 }}>
                            <FormControl sx={{ minWidth: 120 }} size="small">
                                <InputLabel>Year</InputLabel>
                                <Select
                                    value={selectedYear}
                                    label="Year"
                                    onChange={(e) => setSelectedYear(e.target.value)}
                                >
                                    {yearOptions.map((year) => (
                                        <MenuItem key={year} value={year}>{year}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl sx={{ minWidth: 120 }} size="small">
                                <InputLabel>Month</InputLabel>
                                <Select
                                    value={selectedMonth}
                                    label="Month"
                                    onChange={(e) => setSelectedMonth(e.target.value)}
                                >
                                    {monthOptions.map((m) => (
                                        <MenuItem key={m.value} value={m.value}>{m.label}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <Button
                                variant="contained"
                                onClick={handleFetchReport}
                                sx={purpleButtonStyle}
                            >
                                Generate Report
                            </Button>

                            {reportData.length > 0 && (
                                <Button
                                    variant="contained"
                                    onClick={handleExport}
                                    sx={purpleButtonStyle}
                                >
                                    Export Report
                                </Button>
                            )}
                        </Box>
                    </Grid>

                    <Grid item xs={12} sm={3} md={2}>
                        <TextField
                            fullWidth
                            size="small"
                            variant="outlined"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                    </Grid>
                </Grid>

                <TableContainer sx={{ width: "100%", overflowX: "auto", borderRadius: 2, boxShadow: 2 }}>
                    <Table stickyHeader size="small" sx={{ minWidth: "100%", whiteSpace: "nowrap" }}>
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        sx={{
                                            border: "1px solid #ccc",
                                            backgroundColor: "#e3f2fd",
                                            fontWeight: 600,
                                        }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {loading ? (
                                <TableRow><TableCell colSpan={columns.length} align="center"><CircularProgress /></TableCell></TableRow>
                            ) : error ? (
                                <TableRow><TableCell colSpan={columns.length} align="center"><Alert severity="error">{error}</Alert></TableCell></TableRow>
                            ) : !hasSearched ? (
                                <TableRow><TableCell colSpan={columns.length} align="center">Please select a year and month, then click Generate Report.</TableCell></TableRow>
                            ) : paginatedData.length > 0 ? (
                                paginatedData.map((row, index) => (
                                    <TableRow
                                        key={row.user_id + "-" + index}
                                        sx={{ "&:nth-of-type(odd)": { backgroundColor: "#f9f9f9" } }}
                                    >
                                        <TableCell sx={{ border: "1px solid #ddd" }}>{page * rowsPerPage + index + 1}</TableCell>
                                        <TableCell sx={{ border: "1px solid #ddd" }}>{row.employee_id || "N/A"}</TableCell>
                                        <TableCell sx={{ border: "1px solid #ddd" }}>{row.department_name || "N/A"}</TableCell>
                                        <TableCell sx={{ border: "1px solid #ddd" }}>{row.designation_name || "N/A"}</TableCell>
                                        <TableCell sx={{ border: "1px solid #ddd" }}>{row.manager_name?.trim() || "N/A"}</TableCell>
                                        <TableCell sx={{ border: "1px solid #ddd" }}>{formatDate(row.date_of_joining)}</TableCell>
                                        <TableCell sx={{ border: "1px solid #ddd" }}>{row.leave_type || "N/A"}</TableCell>
                                        <TableCell sx={{ border: "1px solid #ddd" }}>{formatDate(row.start_date)}</TableCell>
                                        <TableCell sx={{ border: "1px solid #ddd" }}>{formatDate(row.end_date)}</TableCell>
                                        <TableCell sx={{ border: "1px solid #ddd" }}>{row.no_of_days ?? "N/A"}</TableCell>
                                        <TableCell sx={{ border: "1px solid #ddd" }}>{row.reason || "N/A"}</TableCell>
                                        <TableCell sx={{ border: "1px solid #ddd" }}>{row.remarks || "N/A"}</TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow><TableCell colSpan={columns.length} align="center">No data available for the selected criteria.</TableCell></TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>

                <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", p: 2 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <Button
                            variant="contained"
                            onClick={() => setPage(page - 1)}
                            disabled={page === 0}
                            sx={{ ...purpleButtonStyle, height: 'auto' }}
                        >
                            Previous
                        </Button>
                        <Typography>Page {page + 1} of {pageCount > 0 ? pageCount : 1}</Typography>
                        <Button
                            variant="contained"
                            onClick={() => setPage(page + 1)}
                            disabled={page >= pageCount - 1}
                            sx={{ ...purpleButtonStyle, height: 'auto' }}
                        >
                            Next
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Container>
    );
};

export default EmployeeAnnualLeaveReport;