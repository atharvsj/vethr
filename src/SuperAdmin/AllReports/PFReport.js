// import React, { useState } from "react";
// import {
//   Box,
//   Typography,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   CircularProgress,
//   Alert,
//   Grid,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   TextField,
//   Button,
//   Paper,
//   Container,
// } from "@mui/material";
// import axiosInstance from "../../utils/axiosInstance";
// import * as XLSX from "xlsx";

// const EmployeePfReport = () => {
//   const [reportData, setReportData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [hasSearched, setHasSearched] = useState(false);

//   // State for filters and pagination
//   const [fromDate, setFromDate] = useState(null);
//   const [toDate, setToDate] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);

//   const handleFetchReport = async () => {
//     if (!fromDate || !toDate) {
//       setError("Please select both a 'From' and 'To' date.");
//       return;
//     }
//     setLoading(true);
//     setError(null);
//     setHasSearched(true);
//     setReportData([]);
//     try {
//       const payload = { from_date: fromDate, to_date: toDate };
//       const response = await axiosInstance.post("/apis/get_employee_pf_get_report/", payload);
//       const rawData = Array.isArray(response.data) ? response.data : [];
//       setReportData(rawData);
//     } catch (err) {
//       setError("Failed to fetch PF report. Please try again later.");
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleExport = () => {
//     if (reportData.length === 0) return;
//     const dataToExport = reportData.map((row, index) => ({ "SR. NO.": index + 1, ...row }));
//     const worksheet = XLSX.utils.json_to_sheet(dataToExport);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "PF_Report");
//     XLSX.writeFile(workbook, `PF_Report_${fromDate}_to_${toDate}.xlsx`);
//   };

//   const handleSearchChange = (event) => {
//     setSearchTerm(event.target.value);
//     setPage(0);
//   };
//   const handleRowsPerPageChange = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const filteredData = reportData.filter((row) =>
//     Object.values(row).some(value =>
//       String(value).toLowerCase().includes(searchTerm.toLowerCase())
//     )
//   );

//   const paginatedData = filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
//   const pageCount = Math.ceil(filteredData.length / rowsPerPage);

//   const columns = [
//     "Sr No.", "employee_id", "employee_name", "pf_number", "no_of_days", "basic_plus_da",
//     "gross_salary", "basic_salary", "salary_per_month", "employee_contribution",
//     "employer_pf", "employer_pension", "employer_edli", "employer_admin", "total"
//   ];

//   const purpleButtonStyle = {
//     backgroundColor: '#673ab7', color: '#fff', transition: 'all 0.3s ease-in-out',
//     '&:hover': { backgroundColor: '#5e35b1', boxShadow: '0 0 15px rgba(103, 58, 183, 0.7)' },
//     '&:active': { backgroundColor: '#512da8', boxShadow: '0 0 20px rgba(103, 58, 183, 0.9)' },
//     '&.Mui-disabled': { backgroundColor: 'rgba(0, 0, 0, 0.12)', color: 'rgba(0, 0, 0, 0.26)' } // Explicitly style disabled state
//   };

//   return (
//     <Container disableGutters>
//       <Typography variant="h6" fontWeight="bold" mb={2}>
//         PF (Provident Fund) Report
//       </Typography>

//       {/* --- NEW SINGLE-LINE CONTROLS BAR --- */}
//       <Grid container spacing={2} mb={2} alignItems="center" justifyContent="space-between">
//         {/* Left-aligned controls */}
//         <Grid item>
//           <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//             <FormControl variant="outlined" size="small" sx={{ minWidth: 120 }}>
//               <InputLabel>Rows</InputLabel>
//               <Select value={rowsPerPage} label="Rows" onChange={handleRowsPerPageChange}>
//                 <MenuItem value={10}>10</MenuItem>
//                 <MenuItem value={25}>25</MenuItem>
//                 <MenuItem value={50}>50</MenuItem>
//               </Select>
//             </FormControl>
//             <TextField
//               label="From Date" type="date" size="small"
//               value={fromDate || ''}
//               onChange={(e) => {
//                 const newFromDate = e.target.value;
//                 setFromDate(newFromDate);
//                 if (toDate && newFromDate > toDate) setToDate(null);
//               }}
//               InputLabelProps={{ shrink: true }}
//             />
//             <TextField
//               label="To Date" type="date" size="small"
//               value={toDate || ''}
//               onChange={(e) => setToDate(e.target.value)}
//               InputLabelProps={{ shrink: true }}
//               inputProps={{ min: fromDate || undefined }}
//               disabled={!fromDate}
//             />
//           </Box>
//         </Grid>

//         {/* Right-aligned controls */}
//         <Grid item>
//           <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//             <Button variant="contained" onClick={handleFetchReport} sx={{ ...purpleButtonStyle, height: 40 }} disabled={!fromDate || !toDate || loading}>
//               Generate Report
//             </Button>
//             {reportData.length > 0 && (
//               <Button variant="contained" onClick={handleExport} sx={{ ...purpleButtonStyle, height: 40 }}>
//                 Export Report
//               </Button>
//             )}
//             <TextField
//               variant="outlined" size="small" placeholder="Search..."
//               value={searchTerm} onChange={handleSearchChange} sx={{ width: 250 }} // Reduced width
//             />
//           </Box>
//         </Grid>
//       </Grid>

//       <TableContainer sx={{ width: "100%", overflowX: "auto", borderRadius: 2, boxShadow: 2 }}>
//         <Table stickyHeader size="small" sx={{ minWidth: "100%", whiteSpace: "nowrap" }}>
//           <TableHead>
//             <TableRow>
//               {columns.map((colName) => <TableCell key={colName} sx={{ textTransform: 'uppercase', backgroundColor: "#e3f2fd", fontWeight: 600 }}>{colName.replace(/_/g, ' ')}</TableCell>)}
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {loading ? (
//               <TableRow><TableCell colSpan={columns.length} align="center"><CircularProgress /></TableCell></TableRow>
//             ) : error ? (
//               <TableRow><TableCell colSpan={columns.length} align="center"><Alert severity="error">{error}</Alert></TableCell></TableRow>
//             ) : !hasSearched ? (
//               <TableRow><TableCell colSpan={columns.length} align="center">Please select a date range and click Generate Report.</TableCell></TableRow>
//             ) : filteredData.length > 0 ? (
//               paginatedData.map((row, index) => (
//                 <TableRow key={index} sx={{ "&:nth-of-type(odd)": { backgroundColor: "#f9f9f9" } }}>
//                   <TableCell>{page * rowsPerPage + index + 1}</TableCell>
//                   {columns.slice(1).map(colName => (
//                     <TableCell key={colName}>{row[colName] ?? 'N/A'}</TableCell>
//                   ))}
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow><TableCell colSpan={columns.length} align="center">No data available for the selected criteria.</TableCell></TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', p: 2 }}>
//         <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//           <Button variant="contained" onClick={() => setPage(p => p - 1)} disabled={page === 0} sx={purpleButtonStyle}>Previous</Button>
//           <Typography>Page {page + 1} of {pageCount > 0 ? pageCount : 1}</Typography>
//           <Button variant="contained" onClick={() => setPage(p => p + 1)} disabled={page >= pageCount - 1} sx={purpleButtonStyle}>Next</Button>
//         </Box>
//       </Box>
//     </Container>
//   );
// };

// export default EmployeePfReport;   /////// 





// import React, { useState } from "react";
// import {
//   Box,
//   Typography,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   CircularProgress,
//   Alert,
//   Grid,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   TextField,
//   Button,
//   Paper,
//   Container,
// } from "@mui/material";
// import axiosInstance from "../../utils/axiosInstance";
// import * as XLSX from "xlsx";

// const EmployeePfReport = () => {
//   const [reportData, setReportData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [hasSearched, setHasSearched] = useState(false);

//   // State for filters and pagination
//   const [fromDate, setFromDate] = useState(null);
//   const [toDate, setToDate] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);

//   const handleFetchReport = async () => {
//     if (!fromDate || !toDate) {
//       setError("Please select both a 'From' and 'To' date.");
//       return;
//     }
//     setLoading(true);
//     setError(null);
//     setHasSearched(true);
//     setReportData([]);
//     try {
//       const payload = { from_date: fromDate, to_date: toDate };
//       const response = await axiosInstance.post("/apis/get_employee_pf_get_report/", payload);
//       const rawData = Array.isArray(response.data) ? response.data : [];
//       setReportData(rawData);
//     } catch (err) {
//       setError("Failed to fetch PF report. Please try again later.");
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleExport = () => {
//     if (reportData.length === 0) return;
//     const dataToExport = reportData.map((row, index) => ({ "SR. NO.": index + 1, ...row }));
//     const worksheet = XLSX.utils.json_to_sheet(dataToExport);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "PF_Report");
//     XLSX.writeFile(workbook, `PF_Report_${fromDate}_to_${toDate}.xlsx`);
//   };

//   const handleSearchChange = (event) => {
//     setSearchTerm(event.target.value);
//     setPage(0);
//   };

//   const handleRowsPerPageChange = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const filteredData = reportData.filter((row) =>
//     Object.values(row).some((value) =>
//       String(value).toLowerCase().includes(searchTerm.toLowerCase())
//     )
//   );

//   const paginatedData = filteredData.slice(
//     page * rowsPerPage,
//     page * rowsPerPage + rowsPerPage
//   );
//   const pageCount = Math.ceil(filteredData.length / rowsPerPage);

//   // Columns mapping (label : fieldName)
//   const columns = [
//     { label: "Sr No", field: null },
//     { label: "Employee ID", field: "employee_id" },
//     { label: "Name", field: "employee_name" },
//     { label: "PF Number", field: "pf_number" },
//     { label: "Number Of Days", field: "no_of_days" },
//     { label: "Salary Per Month", field: "salary_per_month" },
//     { label: "Basic + DA", field: "basic_plus_da" },
//     { label: "Basic", field: "basic_salary" },
//     { label: "Gross Salary", field: "gross_salary" },
//     { label: "Employee Contribution 12%", field: "employee_contribution" },
//     { label: "Employer PF 3.67%", field: "employer_pf" },
//     { label: "Employer PF (Pension) 8.33%", field: "employer_pension" },
//     { label: "Employer PF (EDLI) 0.50%", field: "employer_edli" },
//     { label: "Employer PF (Admin) 0.50%", field: "employer_admin" },
//     { label: "Total", field: "total" },
//   ];

//   const purpleButtonStyle = {
//     backgroundColor: "#673ab7",
//     color: "#fff",
//     transition: "all 0.3s ease-in-out",
//     "&:hover": { backgroundColor: "#5e35b1", boxShadow: "0 0 15px rgba(103, 58, 183, 0.7)" },
//     "&:active": { backgroundColor: "#512da8", boxShadow: "0 0 20px rgba(103, 58, 183, 0.9)" },
//     "&.Mui-disabled": {
//       backgroundColor: "rgba(0, 0, 0, 0.12)",
//       color: "rgba(0, 0, 0, 0.26)",
//     },
//   };

//   return (
//     <Container disableGutters>
//       <Typography variant="h6" fontWeight="bold" mb={2}>
//         PF (Provident Fund) Report
//       </Typography>

//       {/* --- Controls Bar --- */}
//       <Grid container spacing={2} mb={2} alignItems="center" justifyContent="space-between">
//         {/* Left controls */}
//         <Grid item>
//           <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
//             <FormControl variant="outlined" size="small" sx={{ minWidth: 120 }}>
//               <InputLabel>Rows</InputLabel>
//               <Select value={rowsPerPage} label="Rows" onChange={handleRowsPerPageChange}>
//                 <MenuItem value={10}>10</MenuItem>
//                 <MenuItem value={25}>25</MenuItem>
//                 <MenuItem value={50}>50</MenuItem>
//               </Select>
//             </FormControl>
//             <TextField
//               label="From Date"
//               type="date"
//               size="small"
//               value={fromDate || ""}
//               onChange={(e) => {
//                 const newFromDate = e.target.value;
//                 setFromDate(newFromDate);
//                 if (toDate && newFromDate > toDate) setToDate(null);
//               }}
//               InputLabelProps={{ shrink: true }}
//             />
//             <TextField
//               label="To Date"
//               type="date"
//               size="small"
//               value={toDate || ""}
//               onChange={(e) => setToDate(e.target.value)}
//               InputLabelProps={{ shrink: true }}
//               inputProps={{ min: fromDate || undefined }}
//               disabled={!fromDate}
//             />
//           </Box>
//         </Grid>

//         {/* Right controls */}
//         <Grid item>
//           <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
//             <Button
//               variant="contained"
//               onClick={handleFetchReport}
//               sx={{ ...purpleButtonStyle, height: 40 }}
//               disabled={!fromDate || !toDate || loading}
//             >
//               Generate Report
//             </Button>
//             {reportData.length > 0 && (
//               <Button
//                 variant="contained"
//                 onClick={handleExport}
//                 sx={{ ...purpleButtonStyle, height: 40 }}
//               >
//                 Export Report
//               </Button>
//             )}
//             <TextField
//               variant="outlined"
//               size="small"
//               placeholder="Search..."
//               value={searchTerm}
//               onChange={handleSearchChange}
//               sx={{ width: 250 }}
//             />
//           </Box>
//         </Grid>
//       </Grid>

//       {/* --- Table --- */}
//       <TableContainer
//         sx={{ width: "100%", overflowX: "auto", borderRadius: 2, boxShadow: 2 }}
//       >
//         <Table stickyHeader size="small" sx={{ minWidth: "100%", whiteSpace: "nowrap" }}>
//           <TableHead>
//             <TableRow>
//               {columns.map((col) => (
//                 <TableCell
//                   key={col.label}
//                   sx={{
//                     textTransform: "uppercase",
//                     backgroundColor: "#e3f2fd",
//                     fontWeight: 600,
//                   }}
//                 >
//                   {col.label}
//                 </TableCell>
//               ))}
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {loading ? (
//               <TableRow>
//                 <TableCell colSpan={columns.length} align="center">
//                   <CircularProgress />
//                 </TableCell>
//               </TableRow>
//             ) : error ? (
//               <TableRow>
//                 <TableCell colSpan={columns.length} align="center">
//                   <Alert severity="error">{error}</Alert>
//                 </TableCell>
//               </TableRow>
//             ) : !hasSearched ? (
//               <TableRow>
//                 <TableCell colSpan={columns.length} align="center">
//                   Please select a date range and click Generate Report.
//                 </TableCell>
//               </TableRow>
//             ) : filteredData.length > 0 ? (
//               paginatedData.map((row, index) => (
//                 <TableRow
//                   key={index}
//                   sx={{ "&:nth-of-type(odd)": { backgroundColor: "#f9f9f9" } }}
//                 >
//                   <TableCell>{page * rowsPerPage + index + 1}</TableCell>
//                   {columns.slice(1).map((col) => (
//                     <TableCell key={col.field}>{row[col.field] ?? "N/A"}</TableCell>
//                   ))}
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell colSpan={columns.length} align="center">
//                   No data available for the selected criteria.
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       {/* --- Pagination --- */}
//       <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", p: 2 }}>
//         <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
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
//       </Box>
//     </Container>
//   );
// };

// export default EmployeePfReport;



import React, { useState, useEffect } from "react";
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
    Paper,
    Grid,
    TextField,
    Button,
    InputAdornment,
    useTheme,
    useMediaQuery,
    Pagination,
    FormControl,
    Select,
    MenuItem
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import axiosInstance from "../../utils/axiosInstance";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
 
const EmployeePfReport = () => {
    const [reportData, setReportData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [hasSearched, setHasSearched] = useState(false);
 
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
 
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
 
    const toYYYYMMDD = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };
 
    const handleFetchReport = async (startDate, endDate) => {
        if (!startDate || !endDate) {
            setError("Please select both a 'From' and 'To' date.");
            setLoading(false);
            return;
        }
        setLoading(true);
        setError(null);
        setHasSearched(true);
        setReportData([]);
        try {
            const payload = { from_date: startDate, to_date: endDate };
            const response = await axiosInstance.post("/apis/get_employee_pf_get_report/", payload);
            const rawData = Array.isArray(response.data) ? response.data : [];
            setReportData(rawData);
            setPage(0);
        } catch (err) {
            setError("Failed to fetch PF report. Please try again later.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };
 
    useEffect(() => {
        const today = new Date();
        const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        const initialFromDate = toYYYYMMDD(firstDayOfMonth);
        const initialToDate = toYYYYMMDD(today);
        setFromDate(initialFromDate);
        setToDate(initialToDate);
        handleFetchReport(initialFromDate, initialToDate);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
 
    const handleGenerateReportClick = () => {
        handleFetchReport(fromDate, toDate);
    };
 
    const handleExportExcel = () => {
        if (filteredData.length === 0) return;
        const dataToExport = filteredData.map((row, index) => ({
            "SR. NO.": index + 1,
            "Employee ID": row.employee_id,
            "Name": row.employee_name,
            "PF Number": row.pf_number,
            "Number Of Days": row.no_of_days,
            "Salary Per Month": row.salary_per_month,
            "Basic + DA": row.basic_plus_da,
            "Basic": row.basic_salary,
            "Gross Salary": row.gross_salary,
            "Employee Contribution 12%": row.employee_contribution,
            "Employer PF 3.67%": row.employer_pf,
            "Employer PF (Pension) 8.33%": row.employer_pension,
            "Employer PF (EDLI) 0.50%": row.employer_edli,
            "Employer PF (Admin) 0.50%": row.employer_admin,
            "Total": row.total,
        }));
        const worksheet = XLSX.utils.json_to_sheet(dataToExport);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "PF_Report");
        XLSX.writeFile(workbook, `PF_Report_${fromDate}_to_${toDate}.xlsx`);
    };
 
    const handleExportPdf = () => {
        if (filteredData.length === 0) return;
        const doc = new jsPDF({ orientation: "landscape" });
        const tableColumns = columns.map(col => col.label);
        const tableRows = filteredData.map((row, index) =>
            columns.map(col => {
                if (col.label === "Sr No") return index + 1;
                return row[col.field] ?? "N/A";
            })
        );
 
        autoTable(doc, {
            head: [tableColumns],
            body: tableRows,
            startY: 20,
            styles: { fontSize: 8 },
            headStyles: { fillColor: "#8C257C" },
        });
 
        doc.text("Employee PF Report", 14, 15);
        doc.save(`PF_Report_${fromDate}_to_${toDate}.pdf`);
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
 
    const filteredData = reportData.filter((row) =>
        Object.values(row).some((value) =>
            String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
    );
 
    const paginatedData = filteredData.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    );
 
    const startEntry = filteredData.length > 0 ? page * rowsPerPage + 1 : 0;
    const endEntry = Math.min((page + 1) * rowsPerPage, filteredData.length);
 
    const columns = [
        { label: "Sr No", field: null },
        { label: "Employee ID", field: "employee_id" },
        { label: "Name", field: "employee_name" },
        { label: "PF Number", field: "pf_number" },
        { label: "Number Of Days", field: "no_of_days" },
        { label: "Salary Per Month", field: "salary_per_month" },
        { label: "Basic + DA", field: "basic_plus_da" },
        { label: "Basic", field: "basic_salary" },
        { label: "Gross Salary", field: "gross_salary" },
        { label: "Employee Contribution 12%", field: "employee_contribution" },
        { label: "Employer PF 3.67%", field: "employer_pf" },
        { label: "Employer PF (Pension) 8.33%", field: "employer_pension" },
        { label: "Employer PF (EDLI) 0.50%", field: "employer_edli" },
        { label: "Employer PF (Admin) 0.50%", field: "employer_admin" },
        { label: "Total", field: "total" },
    ];
 
    const buttonStyles = {
        backgroundColor: '#8C257C',
        color: '#FFFFFF',
        textTransform: 'none',
        '&:hover': {
            backgroundColor: '#6d1d60',
        },
    };
 
    return (
        <Box p={3}>
            <Typography variant="h4" sx={{ color: '#8C257C', fontWeight: 'bold', mb: 3 }}>
                PF (Provident Fund) Report
            </Typography>
 
            <Paper sx={{ p: 2, mb: 2 }}>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} md="auto">
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                            <TextField
                                label="From Date"
                                type="date"
                                size="small"
                                value={fromDate}
                                onChange={(e) => {
                                    const newFromDate = e.target.value;
                                    setFromDate(newFromDate);
                                    if (toDate && newFromDate > toDate) setToDate("");
                                }}
                                InputLabelProps={{ shrink: true }}
                            />
                            <TextField
                                label="To Date"
                                type="date"
                                size="small"
                                value={toDate}
                                onChange={(e) => setToDate(e.target.value)}
                                InputLabelProps={{ shrink: true }}
                                inputProps={{ min: fromDate || undefined }}
                                disabled={!fromDate}
                            />
                            <Button
                                variant="contained"
                                onClick={handleGenerateReportClick}
                                sx={buttonStyles}
                                disabled={!fromDate || !toDate || loading}
                            >
                                {loading ? <CircularProgress size={24} color="inherit" /> : 'Generate Report'}
                            </Button>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md>
                        <Box sx={{ display: 'flex', gap: 2, justifyContent: { xs: 'flex-start', md: 'flex-end' }, flexWrap: 'wrap' }}>
                            <Button variant="contained" onClick={handleExportPdf} sx={buttonStyles} disabled={filteredData.length === 0}>
                                PDF
                            </Button>
                            <Button variant="contained" onClick={handleExportExcel} sx={buttonStyles} disabled={filteredData.length === 0}>
                                Excel
                            </Button>
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
                                sx={{ width: isMobile ? '100%' : 250 }}
                            />
                        </Box>
                    </Grid>
                </Grid>
            </Paper>
 
            <Paper elevation={2}>
                <TableContainer>
                    <Table sx={{ minWidth: '100%', whiteSpace: 'nowrap' }}>
                        <TableHead>
                            <TableRow sx={{ '& .MuiTableCell-root': { backgroundColor: '#8C257C', color: 'white', fontWeight: 'bold' } }}>
                                {columns.map((col) => (
                                    <TableCell key={col.label}>
                                        {col.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={columns.length} align="center">
                                        <CircularProgress />
                                    </TableCell>
                                </TableRow>
                            ) : error ? (
                                <TableRow>
                                    <TableCell colSpan={columns.length} align="center">
                                        <Alert severity="error">{error}</Alert>
                                    </TableCell>
                                </TableRow>
                            ) : filteredData.length > 0 ? (
                                paginatedData.map((row, index) => (
                                    <TableRow key={index} hover>
                                        <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                                        {columns.slice(1).map((col) => (
                                            <TableCell key={col.field}>{row[col.field] ?? "N/A"}</TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={columns.length} align="center">
                                        {hasSearched ? "No data available for the selected criteria." : "Please generate a report."}
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
 
                <Box sx={{ p: 2, borderTop: '1px solid rgba(224, 224, 224, 1)' }}>
                    {filteredData.length > 0 && (
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <FormControl variant="outlined" size="small">
                                    <Select
                                        value={rowsPerPage}
                                        onChange={handleRowsPerPageChange}
                                        sx={{
                                            backgroundColor: '#8C257C',
                                            color: 'white',
                                            '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                                            '& .MuiSvgIcon-root': { color: 'white' },
                                            '&:hover': { backgroundColor: '#6d1d60' },
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
                    )}
                </Box>
            </Paper>
        </Box>
    );
};
 
export default EmployeePfReport;