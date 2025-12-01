// // import React, { useEffect, useMemo, useState } from "react";
// // import {
// //   Box,
// //   Typography,
// //   Grid,
// //   Button,
// //   Paper,
// //   Autocomplete,
// //   CircularProgress,
// //   Alert,
// //   TextField,
// // } from "@mui/material";
// // import axiosInstance from "../../utils/axiosInstance";
// // import * as XLSX from "xlsx";

// // /** ---- Helpers ---- */

// // const emptyFormState = {
// //   employee_id: "",
// //   employee_name: "",
// //   department_name: "",
// //   designation_name: "",
// //   manager_name: "",
// //   date_of_joining: "",
// //   headquarter: "",
// //   sub_division: "",
// //   level: "",
// //   promotion_one: "",
// //   promotion_one_date: "",
// //   promotion_second: "",
// //   promotion_second_date: "",
// // };

// // const formatDateForDisplay = (dateString) => {
// //   if (!dateString) return "";
// //   const d = new Date(dateString);
// //   if (isNaN(d.getTime())) return "";
// //   return d.toLocaleDateString("en-GB");
// // };

// // const mapDepartment = (item) => ({
// //   value: item?.department_id,
// //   label: item?.department_name ?? "",
// //   code: item?.department_code ?? "",
// // });

// // const mapDesignation = (item) => ({
// //   value: item?.designation_id,
// //   label: item?.designation_name ?? "",
// //   code: item?.designation_code ?? "",
// // });

// // const mapEmployeeOption = (item) => {
// //   // Try common keys safely
// //   const id =
// //     item?.emp_id ??
// //     item?.employee_id ??
// //     item?.id ??
// //     item?.employeeid ??
// //     null;

// //   const name =
// //     item?.label ??
// //     item?.employee_name ??
// //     item?.name ??
// //     item?.full_name ??
// //     item?.employee ??
// //     "";

// //   const label = name
// //     ? `${name}${id ? ` (${id})` : ""}`
// //     : id
// //       ? String(id)
// //       : "Unknown";

// //   return { raw: item, emp_id: id, label };
// // };

// // const EmployeePromotionForm = () => {
// //   /** ---- State ---- */
// //   const [departments, setDepartments] = useState([]);
// //   const [designations, setDesignations] = useState([]);
// //   const [employees, setEmployees] = useState([]);

// //   const [selectedDepartment, setSelectedDepartment] = useState(null);
// //   const [selectedDesignation, setSelectedDesignation] = useState(null);
// //   const [selectedEmployee, setSelectedEmployee] = useState(null);

// //   const [searchTerm, setSearchTerm] = useState("");
// //   const [formData, setFormData] = useState(emptyFormState);

// //   const [loadingDropdowns, setLoadingDropdowns] = useState(false);
// //   const [loadingEmployees, setLoadingEmployees] = useState(false);
// //   const [isLoadingReport, setIsLoadingReport] = useState(false);
// //   const [error, setError] = useState("");

// //   /** ---- Load Departments & Designations (your provided APIs) ---- */
// //   useEffect(() => {
// //     const loadDropdowns = async () => {
// //       setLoadingDropdowns(true);
// //       setError("");
// //       try {
// //         const [depRes, desRes] = await Promise.all([
// //           axiosInstance.get(
// //             "https://tdtlworld.com/hrms-backend/api/departments/dropdown/"
// //           ),
// //           axiosInstance.get(
// //             "https://tdtlworld.com/hrms-backend/api/designations/dropdown/"
// //           ),
// //         ]);

// //         const depArr = Array.isArray(depRes?.data?.data)
// //           ? depRes.data.data
// //           : [];
// //         const desArr = Array.isArray(desRes?.data?.data)
// //           ? desRes.data.data
// //           : [];

// //         setDepartments(depArr.map(mapDepartment));
// //         setDesignations(desArr.map(mapDesignation));
// //       } catch (e) {
// //         console.error(e);
// //         setError("Failed to load departments/designations.");
// //       } finally {
// //         setLoadingDropdowns(false);
// //       }
// //     };

// //     loadDropdowns();
// //   }, []);

// //   /** ---- Load Employees (depends on selected dept & desig IDs) ---- */
// //   useEffect(() => {
// //     const canFetch =
// //       selectedDepartment?.value != null && selectedDesignation?.value != null;

// //     if (!canFetch) {
// //       setEmployees([]);
// //       setSelectedEmployee(null);
// //       setFormData(emptyFormState);
// //       return;
// //     }

// //     const loadEmployees = async () => {
// //       setLoadingEmployees(true);
// //       setError("");
// //       try {
// //         // Example you gave:
// //         // http://127.0.0.1:8000/apis/get_promotion_report_employee_drop/?dept=5&desig=12
// //         const url = `https://tdtlworld.com/hrms-backend/apis/get_promotion_report_employee_drop/?dept=${selectedDepartment.value}&desig=${selectedDesignation.value}`;
// //         const res = await axiosInstance.get(url);

// //         const raw = Array.isArray(res?.data?.data)
// //           ? res.data.data
// //           : Array.isArray(res?.data)
// //             ? res.data
// //             : [];

// //         const mapped = raw.map(mapEmployeeOption).filter((e) => e.emp_id);
// //         setEmployees(mapped);
// //         setSelectedEmployee(null);
// //         setFormData(emptyFormState);
// //       } catch (e) {
// //         console.error(e);
// //         setError("Failed to load employees for selected filters.");
// //         setEmployees([]);
// //         setSelectedEmployee(null);
// //         setFormData(emptyFormState);
// //       } finally {
// //         setLoadingEmployees(false);
// //       }
// //     };

// //     loadEmployees();
// //   }, [selectedDepartment, selectedDesignation]);

// //   /** ---- Filter employees client-side by search term ---- */
// //   const filteredEmployees = useMemo(() => {
// //     if (!searchTerm.trim()) return employees;
// //     const q = searchTerm.toLowerCase();
// //     return employees.filter((e) => e.label?.toLowerCase().includes(q));
// //   }, [employees, searchTerm]);

// //   /** ---- Fetch Promotion Report by Employee ---- */
// //   useEffect(() => {
// //     if (!selectedEmployee?.emp_id) {
// //       setFormData(emptyFormState);
// //       return;
// //     }

// //     const fetchReport = async () => {
// //       setIsLoadingReport(true);
// //       setError("");
// //       try {
// //         const res = await axiosInstance.get(
// //           `/apis/get_employee_promotion_get_report/?employee_id=${selectedEmployee.emp_id}`
// //         );
// //         const arr = Array.isArray(res?.data) ? res.data : [];
// //         if (arr.length > 0) {
// //           // Ensure we keep all keys from emptyFormState to avoid undefined
// //           const d = arr[0];
// //           setFormData({
// //             ...emptyFormState,
// //             ...d,
// //           });
// //         } else {
// //           setError("No promotion record found for this employee.");
// //           setFormData(emptyFormState);
// //         }
// //       } catch (e) {
// //         console.error(e);
// //         setError("Failed to fetch promotion data.");
// //         setFormData(emptyFormState);
// //       } finally {
// //         setIsLoadingReport(false);
// //       }
// //     };

// //     fetchReport();
// //   }, [selectedEmployee]);

// //   /** ---- Actions ---- */
// //   const handleGenerateReport = () => {
// //     if (!selectedEmployee?.emp_id) {
// //       setError("Please select an employee before generating report.");
// //       return;
// //     }
// //     // Already fetched in effect; just a friendly confirmation.
// //     // You can replace alert with a toast/snackbar if you use one.
// //     alert(`Report generated for ${formData.employee_name || "Employee"}`);
// //   };

// //   const handleExportExcel = () => {
// //     if (!selectedEmployee?.emp_id || !formData.employee_id) {
// //       setError("Please select an employee with data to export.");
// //       return;
// //     }

// //     const reportData = [
// //       ["Field", "Details"],
// //       ["Employee ID", formData.employee_id || "N/A"],
// //       ["Employee Name", formData.employee_name || "N/A"],
// //       ["Department", formData.department_name || "N/A"],
// //       ["Designation", formData.designation_name || "N/A"],
// //       ["Manager", formData.manager_name || "N/A"],
// //       ["Headquarter", formData.headquarter || "N/A"],
// //       ["Sub-Division", formData.sub_division || "N/A"],
// //       ["Level", formData.level || "N/A"],
// //       ["Date of Joining", formatDateForDisplay(formData.date_of_joining) || "N/A"],
// //       ["First Promotion Title", formData.promotion_one || "N/A"],
// //       ["First Promotion Date", formatDateForDisplay(formData.promotion_one_date) || "N/A"],
// //       ["Second Promotion Title", formData.promotion_second || "N/A"],
// //       ["Second Promotion Date", formatDateForDisplay(formData.promotion_second_date) || "N/A"],
// //     ];

// //     const ws = XLSX.utils.aoa_to_sheet(reportData);
// //     const wb = XLSX.utils.book_new();
// //     XLSX.utils.book_append_sheet(wb, ws, "Promotion Report");
// //     const employeeName = (formData.employee_name || "Employee").replace(/\s+/g, "_");
// //     XLSX.writeFile(wb, `Promotion_Report_${employeeName}.xlsx`);
// //   };

// //   /** ---- UI ---- */
// //   return (
// //     <Box p={2} sx={{ maxWidth: "900px", mx: "auto" }}>
// //       <Paper elevation={3} sx={{ p: 3, borderRadius: 2, border: "1px solid #e0e0e0" }}>
// //         <Typography variant="h5" fontWeight="bold" mb={3} sx={{ color: "#3f51b5" }}>
// //           Employee Promotion Report
// //         </Typography>

// //         {/* Search bar */}
// //         <Box mb={2}>
// //           <TextField
// //             label="Search Employee (by name/ID)"
// //             size="small"
// //             fullWidth
// //             value={searchTerm}
// //             onChange={(e) => setSearchTerm(e.target.value)}
// //             disabled={loadingEmployees || employees.length === 0}
// //           />
// //         </Box>

// //         <Grid container spacing={2} alignItems="center" mb={3}>
// //           {/* Department */}
// //           <Grid item xs={12} sm={4}>
// //             <Autocomplete
// //               loading={loadingDropdowns}
// //               options={departments}
// //               value={selectedDepartment}
// //               onChange={(_, v) => {
// //                 setSelectedDepartment(v);
// //               }}
// //               getOptionLabel={(o) => (o?.label ? o.label : "")}
// //               isOptionEqualToValue={(o, v) => o?.value === v?.value}
// //               renderInput={(params) => (
// //                 <TextField
// //                   {...params}
// //                   label="Select Department"
// //                   size="small"
// //                   InputProps={{
// //                     ...params.InputProps,
// //                     endAdornment: (
// //                       <>
// //                         {loadingDropdowns ? <CircularProgress size={18} /> : null}
// //                         {params.InputProps.endAdornment}
// //                       </>
// //                     ),
// //                   }}
// //                 />
// //               )}
// //             />
// //           </Grid>

// //           {/* Designation */}
// //           <Grid item xs={12} sm={4}>
// //             <Autocomplete
// //               loading={loadingDropdowns}
// //               options={designations}
// //               value={selectedDesignation}
// //               onChange={(_, v) => {
// //                 setSelectedDesignation(v);
// //               }}
// //               getOptionLabel={(o) => (o?.label ? o.label : "")}
// //               isOptionEqualToValue={(o, v) => o?.value === v?.value}
// //               renderInput={(params) => (
// //                 <TextField
// //                   {...params}
// //                   label="Select Designation"
// //                   size="small"
// //                   InputProps={{
// //                     ...params.InputProps,
// //                     endAdornment: (
// //                       <>
// //                         {loadingDropdowns ? <CircularProgress size={18} /> : null}
// //                         {params.InputProps.endAdornment}
// //                       </>
// //                     ),
// //                   }}
// //                 />
// //               )}
// //             />
// //           </Grid>

// //           {/* Employee */}
// //           <Grid item xs={12} sm={4}>
// //             <Autocomplete
// //               loading={loadingEmployees}
// //               options={filteredEmployees}
// //               value={selectedEmployee}
// //               onChange={(_, v) => setSelectedEmployee(v)}
// //               getOptionLabel={(o) => (o?.label ? o.label : "")}
// //               isOptionEqualToValue={(o, v) => o?.emp_id === v?.emp_id}
// //               disabled={
// //                 !selectedDepartment?.value ||
// //                 !selectedDesignation?.value ||
// //                 loadingEmployees
// //               }
// //               renderInput={(params) => (
// //                 <TextField
// //                   {...params}
// //                   label="Select Employee"
// //                   size="small"
// //                   helperText={
// //                     !selectedDepartment?.value || !selectedDesignation?.value
// //                       ? "Select Department & Designation first"
// //                       : ""
// //                   }
// //                   InputProps={{
// //                     ...params.InputProps,
// //                     endAdornment: (
// //                       <>
// //                         {loadingEmployees ? <CircularProgress size={18} /> : null}
// //                         {params.InputProps.endAdornment}
// //                       </>
// //                     ),
// //                   }}
// //                 />
// //               )}
// //             />
// //           </Grid>
// //         </Grid>

// //         {/* Actions */}
// //         <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mb: 3 }}>
// //           <Button
// //             variant="outlined"
// //             onClick={handleGenerateReport}
// //             disabled={!selectedEmployee?.emp_id || isLoadingReport}
// //           >
// //             Generate Report
// //           </Button>
// //           <Button
// //             sx={{ backgroundColor: "#5e35b1", "&:hover": { backgroundColor: "#482880" } }}
// //             variant="contained"
// //             onClick={handleExportExcel}
// //             disabled={!selectedEmployee?.emp_id || isLoadingReport || !!error || !formData.employee_id}
// //           >
// //             Export Excel
// //           </Button>
// //         </Box>

// //         {/* Loading & Errors */}
// //         {(isLoadingReport) && (
// //           <Grid item xs={12} sx={{ display: "flex", justifyContent: "center", my: 2 }}>
// //             <CircularProgress />
// //           </Grid>
// //         )}

// //         {error && (
// //           <Grid item xs={12} sx={{ mt: 2 }}>
// //             <Alert severity="error">{error}</Alert>
// //           </Grid>
// //         )}

// //         {/* Report */}
// //         {selectedEmployee?.emp_id && !isLoadingReport && !error && (
// //           <Grid container spacing={2}>
// //             {/* Employee Details */}
// //             <Grid item xs={12}>
// //               <Typography variant="h6" fontWeight="bold" sx={{ color: "#3f51b5", mt: 2, mb: 1 }}>
// //                 Employee Details
// //               </Typography>
// //               <Grid container spacing={2}>
// //                 <Grid item xs={12} md={4}>
// //                   <Cell label="Employee ID" value={formData.employee_id} />
// //                 </Grid>
// //                 <Grid item xs={12} md={4}>
// //                   <Cell label="Employee Name" value={formData.employee_name} />
// //                 </Grid>
// //                 <Grid item xs={12} md={4}>
// //                   <Cell
// //                     label="Date of Joining"
// //                     value={formatDateForDisplay(formData.date_of_joining)}
// //                   />
// //                 </Grid>
// //                 <Grid item xs={12} md={4}>
// //                   <Cell label="Department" value={formData.department_name} />
// //                 </Grid>
// //                 <Grid item xs={12} md={4}>
// //                   <Cell label="Designation" value={formData.designation_name} />
// //                 </Grid>
// //                 <Grid item xs={12} md={4}>
// //                   <Cell label="Manager" value={formData.manager_name} />
// //                 </Grid>
// //                 <Grid item xs={12} md={4}>
// //                   <Cell label="Headquarter" value={formData.headquarter} />
// //                 </Grid>
// //                 <Grid item xs={12} md={4}>
// //                   <Cell label="Sub-Division" value={formData.sub_division} />
// //                 </Grid>
// //                 <Grid item xs={12} md={4}>
// //                   <Cell label="Level" value={formData.level} />
// //                 </Grid>
// //               </Grid>
// //             </Grid>

// //             {/* Promotion History */}
// //             <Grid item xs={12}>
// //               <Typography variant="h6" fontWeight="bold" sx={{ color: "#3f51b5", mt: 3, mb: 1 }}>
// //                 Promotion History
// //               </Typography>
// //               <Grid container spacing={2}>
// //                 <Grid item xs={12} md={6}>
// //                   <Cell label="First Promotion Title" value={formData.promotion_one} />
// //                 </Grid>
// //                 <Grid item xs={12} md={6}>
// //                   <Cell
// //                     label="First Promotion Date"
// //                     value={formatDateForDisplay(formData.promotion_one_date)}
// //                   />
// //                 </Grid>
// //                 <Grid item xs={12} md={6}>
// //                   <Cell label="Second Promotion Title" value={formData.promotion_second} />
// //                 </Grid>
// //                 <Grid item xs={12} md={6}>
// //                   <Cell
// //                     label="Second Promotion Date"
// //                     value={formatDateForDisplay(formData.promotion_second_date)}
// //                   />
// //                 </Grid>
// //               </Grid>
// //             </Grid>
// //           </Grid>
// //         )}
// //       </Paper>
// //     </Box>
// //   );
// // };

// // /** Reusable display cell */
// // const Cell = ({ label, value }) => (
// //   <Paper variant="outlined" sx={{ p: 1.5, height: "100%", borderColor: "#e0e0e0" }}>
// //     <Typography variant="caption" color="text.secondary" component="div" sx={{ fontSize: "0.7rem" }}>
// //       {label}
// //     </Typography>
// //     <Typography variant="body2" fontWeight="500">
// //       {value || "N/A"}
// //     </Typography>
// //   </Paper>
// // );

// // export default EmployeePromotionForm;    ///



// // import React, { useEffect, useMemo, useState } from "react";
// // import {
// //   Box,
// //   Typography,
// //   Grid,
// //   Button,
// //   Paper,
// //   Autocomplete,
// //   CircularProgress,
// //   Alert,
// //   TextField,
// //   Table,
// //   TableBody,
// //   TableCell,
// //   TableContainer,
// //   TableHead,
// //   TableRow,
// //   TablePagination,
// //   FormControl,
// //   InputLabel,
// //   Select,
// //   MenuItem,
// //   Container,
// // } from "@mui/material";
// // import axiosInstance from "../../utils/axiosInstance";
// // import * as XLSX from "xlsx";

// // const EmployeePromotionTable = () => {
// //   const [departments, setDepartments] = useState([]);
// //   const [designations, setDesignations] = useState([]);
// //   const [employees, setEmployees] = useState([]);
// //   const [rows, setRows] = useState([]); // This will hold the raw fetched data

// //   const [selectedDepartment, setSelectedDepartment] = useState(null);
// //   const [selectedDesignation, setSelectedDesignation] = useState(null);
// //   const [searchTerm, setSearchTerm] = useState("");
// //   const [error, setError] = useState("");
// //   const [loading, setLoading] = useState(false);
// //   const [hasSearched, setHasSearched] = useState(false); // New state to track if search has been initiated

// //   const [page, setPage] = useState(0);
// //   const [rowsPerPage, setRowsPerPage] = useState(10);

// //   useEffect(() => {
// //     const loadDropdowns = async () => {
// //       try {
// //         const [depRes, desRes] = await Promise.all([
// //           axiosInstance.get("https://tdtlworld.com/hrms-backend/api/departments/dropdown/"),
// //           axiosInstance.get("https://tdtlworld.com/hrms-backend/api/designations/dropdown/"),
// //         ]);
// //         setDepartments(depRes?.data?.data || []);
// //         setDesignations(desRes?.data?.data || []);
// //       } catch (e) {
// //         setError("Failed to load dropdowns");
// //       }
// //     };
// //     loadDropdowns();
// //   }, []);

// //   const fetchEmployees = async () => {
// //     setError(""); // Clear previous errors
// //     setEmployees([]); // Clear previous employee data
// //     setRows([]); // Clear previous rows
// //     setLoading(true);
// //     setHasSearched(true);
// //     setPage(0); // Reset page to 0 on new search

// //     const canFetch = selectedDepartment?.department_id && selectedDesignation?.designation_id;
// //     if (!canFetch) {
// //       setError("Please select both Department and Designation.");
// //       setLoading(false);
// //       return;
// //     }

// //     try {
// //       const url = `https://tdtlworld.com/hrms-backend/apis/get_promotion_report_employee_drop/?dept=${selectedDepartment.department_id}&desig=${selectedDesignation.designation_id}`;
// //       const res = await axiosInstance.get(url);
// //       const data = res?.data?.data || res?.data || [];
// //       setEmployees(data);
// //       setRows(data); // Store raw data for filtering
// //     } catch (e) {
// //       setError("Failed to load employees for the selected criteria.");
// //       console.error("Error fetching employees:", e);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const filteredRows = useMemo(() => {
// //     if (!searchTerm.trim()) return rows;
// //     const q = searchTerm.toLowerCase();
// //     return rows.filter((r) =>
// //       (r.employee_name || "").toLowerCase().includes(q) || String(r.employee_id).includes(q)
// //     );
// //   }, [rows, searchTerm]);

// //   const handleExportExcel = () => {
// //     if (!filteredRows.length) {
// //       setError("No data to export");
// //       return;
// //     }
// //     const ws = XLSX.utils.json_to_sheet(filteredRows);
// //     const wb = XLSX.utils.book_new();
// //     XLSX.utils.book_append_sheet(wb, ws, "Promotion Report");
// //     XLSX.writeFile(wb, "Promotion_Report.xlsx");
// //   };

// //   const handleRowsPerPageChange = (event) => {
// //     setRowsPerPage(parseInt(event.target.value, 10));
// //     setPage(0);
// //   };

// //   const purpleButtonStyle = {
// //     backgroundColor: '#673ab7', color: '#fff', transition: 'all 0.3s ease-in-out',
// //     '&:hover': { backgroundColor: '#5e35b1', boxShadow: '0 0 15px rgba(103, 58, 183, 0.7)' },
// //     '&:active': { backgroundColor: '#512da8', boxShadow: '0 0 20px rgba(103, 58, 183, 0.9)' },
// //     '&.Mui-disabled': { backgroundColor: 'rgba(0, 0, 0, 0.12)' }
// //   };

// //   const pageCount = Math.ceil(filteredRows.length / rowsPerPage);

// //   const columns = [
// //     "Sr No", "Employee ID", "Name", "Department", "Designation",
// //     "Division", "Sub-Division", "Level", "Headquarter", "Line Manager",
// //     "DOJ", "Promotion 1", "Date of Promotion", "Promotion 2", "Date of Promotion"
// //   ];

// //   return (
// //     <Container disableGutters>
// //       <Typography variant="h6" fontWeight="bold" mb={2}>
// //         Employee Promotion Report
// //       </Typography>

// //       {/* Dropdowns for selection */}
// //       <Grid container spacing={2} mb={2}>
// //         <Grid item xs={12} sm={6}>
// //           <Autocomplete
// //             options={departments}
// //             value={selectedDepartment}
// //             onChange={(_, v) => setSelectedDepartment(v)}
// //             getOptionLabel={(o) => `${o.department_name} (${o.department_id})`}
// //             renderInput={(params) => <TextField {...params} label="Select Department" size="small" />}
// //           />
// //         </Grid>
// //         <Grid item xs={12} sm={6}>
// //           <Autocomplete
// //             options={designations}
// //             value={selectedDesignation}
// //             onChange={(_, v) => setSelectedDesignation(v)}
// //             getOptionLabel={(o) => `${o.designation_name} (${o.designation_id})`}
// //             renderInput={(params) => <TextField {...params} label="Select Designation" size="small" />}
// //           />
// //         </Grid>
// //       </Grid>

// //       {/* --- RESTRUCTURED CONTROLS BAR --- */}
// //       <Grid container spacing={2} mb={2} alignItems="center">
// //         {/* Left: Rows Dropdown */}
// //         <Grid item xs={12} sm={4} md={2}>
// //           <FormControl fullWidth variant="outlined" size="small">
// //             <InputLabel>Rows</InputLabel>
// //             <Select value={rowsPerPage} label="Rows" onChange={handleRowsPerPageChange}>
// //               <MenuItem value={5}>5</MenuItem>
// //               <MenuItem value={10}>10</MenuItem>
// //               <MenuItem value={25}>25</MenuItem>
// //             </Select>
// //           </FormControl>
// //         </Grid>

// //         {/* Center: Action Buttons */}
// //         <Grid item xs={12} sm={4} md={8}>
// //           <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
// //             <Button variant="contained" onClick={fetchEmployees} sx={{ ...purpleButtonStyle, height: 40 }}>
// //               Generate Report
// //             </Button>
// //             {filteredRows.length > 0 && (
// //               <Button variant="contained" onClick={handleExportExcel} sx={{ ...purpleButtonStyle, height: 40 }}>
// //                 Export Excel
// //               </Button>
// //             )}
// //           </Box>
// //         </Grid>

// //         {/* Right: Search Field */}
// //         <Grid item xs={12} sm={4} md={2}>
// //           <TextField
// //             fullWidth
// //             variant="outlined"
// //             size="small"
// //             placeholder="Search Employee..."
// //             value={searchTerm}
// //             onChange={(e) => setSearchTerm(e.target.value)}
// //           />
// //         </Grid>
// //       </Grid>

// //       {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

// //       <TableContainer sx={{ width: "100%", overflowX: "auto", borderRadius: 2, boxShadow: 2 }}>
// //         <Table stickyHeader size="small" sx={{ minWidth: "100%", whiteSpace: "nowrap" }}>
// //           <TableHead>
// //             <TableRow>
// //               {columns.map((colName) => (
// //                 <TableCell key={colName} sx={{ textTransform: 'uppercase', backgroundColor: "#e3f2fd", fontWeight: 600 }}>
// //                   {colName}
// //                 </TableCell>
// //               ))}
// //             </TableRow>
// //           </TableHead>
// //           <TableBody>
// //             {loading ? (
// //               <TableRow><TableCell colSpan={columns.length} align="center"><CircularProgress /></TableCell></TableRow>
// //             ) : error ? (
// //               // Error message is already displayed above the table
// //               <TableRow><TableCell colSpan={columns.length} align="center"></TableCell></TableRow>
// //             ) : !hasSearched ? (
// //               <TableRow><TableCell colSpan={columns.length} align="center">Select Department and Designation, then click "Generate Report".</TableCell></TableRow>
// //             ) : filteredRows.length > 0 ? (
// //               filteredRows
// //                 .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
// //                 .map((row, index) => (
// //                   <TableRow key={row.employee_id} sx={{ "&:nth-of-type(odd)": { backgroundColor: "#f9f9f9" } }}>
// //                     <TableCell>{page * rowsPerPage + index + 1}</TableCell>
// //                     <TableCell>{row.employee_id}</TableCell>
// //                     <TableCell>{row.employee_name}</TableCell>
// //                     <TableCell>{row.department_name}</TableCell>
// //                     <TableCell>{row.designation_name}</TableCell>
// //                     <TableCell>{row.division}</TableCell>
// //                     <TableCell>{row.sub_division}</TableCell>
// //                     <TableCell>{row.level}</TableCell>
// //                     <TableCell>{row.headquarter}</TableCell>
// //                     <TableCell>{row.manager_name}</TableCell>
// //                     <TableCell>{row.date_of_joining}</TableCell>
// //                     <TableCell>{row.promotion_one}</TableCell>
// //                     <TableCell>{row.promotion_one_date}</TableCell>
// //                     <TableCell>{row.promotion_second}</TableCell>
// //                     <TableCell>{row.promotion_second_date}</TableCell>
// //                   </TableRow>
// //                 ))
// //             ) : (
// //               <TableRow><TableCell colSpan={columns.length} align="center">No data available for the selected criteria.</TableCell></TableRow>
// //             )}
// //           </TableBody>
// //         </Table>
// //       </TableContainer>

// //       <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', p: 2 }}>
// //         <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
// //           <Button variant="contained" onClick={() => setPage(p => p - 1)} disabled={page === 0} sx={purpleButtonStyle}>Previous</Button>
// //           <Typography>Page {page + 1} of {pageCount > 0 ? pageCount : 1}</Typography>
// //           <Button variant="contained" onClick={() => setPage(p => p + 1)} disabled={page >= pageCount - 1} sx={purpleButtonStyle}>Next</Button>
// //         </Box>
// //       </Box>
// //     </Container>
// //   );
// // };

// // export default EmployeePromotionTable;   /////





// import React, { useEffect, useMemo, useState } from "react";
// import {
//   Box,
//   Typography,
//   Grid,
//   Button,
//   Paper,
//   Autocomplete,
//   CircularProgress,
//   Alert,
//   TextField,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TablePagination,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   Container,
// } from "@mui/material";
// import axiosInstance from "../../utils/axiosInstance";
// import * as XLSX from "xlsx";

// const EmployeePromotionTable = () => {
//   const [departments, setDepartments] = useState([]);
//   const [designations, setDesignations] = useState([]);
//   const [employees, setEmployees] = useState([]);
//   const [rows, setRows] = useState([]); // This will hold the raw fetched data

//   const [selectedDepartment, setSelectedDepartment] = useState(null);
//   const [selectedDesignation, setSelectedDesignation] = useState(null);
//   const [selectedEmployee, setSelectedEmployee] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [hasSearched, setHasSearched] = useState(false); // New state to track if search has been initiated

//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);

//   useEffect(() => {
//     const loadDropdowns = async () => {
//       try {
//         const [depRes, desRes] = await Promise.all([
//           axiosInstance.get("https://tdtlworld.com/hrms-backend/api/departments/dropdown/"),
//           axiosInstance.get("https://tdtlworld.com/hrms-backend/api/designations/dropdown/"),
//         ]);
//         setDepartments(depRes?.data?.data || []);
//         setDesignations(desRes?.data?.data || []);
//       } catch (e) {
//         setError("Failed to load dropdowns");
//       }
//     };
//     loadDropdowns();
//   }, []);

//   // Fetch employees when department and designation are selected
//   useEffect(() => {
//     const fetchEmployees = async () => {
//       if (selectedDepartment?.department_id && selectedDesignation?.designation_id) {
//         try {
//           const url = `https://tdtlworld.com/hrms-backend/apis/get_promotion_report_employee_drop/?dept=${selectedDepartment.department_id}&desig=${selectedDesignation.designation_id}`;
//           const res = await axiosInstance.get(url);
//           const data = res?.data?.data || res?.data || [];
//           setEmployees(data);
//         } catch (e) {
//           setError("Failed to load employees for the selected criteria.");
//           console.error("Error fetching employees:", e);
//         }
//       }
//     };

//     fetchEmployees();
//   }, [selectedDepartment, selectedDesignation]);

//   const fetchPromotionData = async () => {
//     setError(""); // Clear previous errors
//     setRows([]); // Clear previous rows
//     setLoading(true);
//     setHasSearched(true);
//     setPage(0); // Reset page to 0 on new search

//     try {
//       // If a specific employee is selected, fetch only their data
//       if (selectedEmployee) {
//         const url = `https://tdtlworld.com/hrms-backend/apis/get_employee_promotion_get_report/?employee_id=${selectedEmployee.employee_id}`;
//         const res = await axiosInstance.get(url);
//         const data = res?.data?.data || res?.data || [];
//         setRows(Array.isArray(data) ? data : [data]);
//       }
//       // Otherwise, fetch all employees' data for the selected department and designation
//       else if (selectedDepartment?.department_id && selectedDesignation?.designation_id) {
//         const promotionPromises = employees.map(async (employee) => {
//           try {
//             const res = await axiosInstance.get(
//               `https://tdtlworld.com/hrms-backend/apis/get_employee_promotion_get_report/?employee_id=${employee.employee_id}`
//             );
//             const promotionData = res?.data?.data || res?.data || {};

//             // Merge employee data with promotion data
//             return {
//               ...employee,
//               ...promotionData
//             };
//           } catch (error) {
//             console.error(`Error fetching promotion data for employee ${employee.employee_id}:`, error);
//             return employee; // Return the base employee data if promotion fetch fails
//           }
//         });

//         const employeesWithPromotions = await Promise.all(promotionPromises);
//         setRows(employeesWithPromotions);
//       } else {
//         setError("Please select both Department and Designation, or a specific Employee.");
//         setLoading(false);
//         return;
//       }
//     } catch (e) {
//       setError("Failed to load promotion data.");
//       console.error("Error fetching promotion data:", e);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const filteredRows = useMemo(() => {
//     if (!searchTerm.trim()) return rows;
//     const q = searchTerm.toLowerCase();
//     return rows.filter((r) =>
//       (r.employee_name || "").toLowerCase().includes(q) || String(r.employee_id).includes(q)
//     );
//   }, [rows, searchTerm]);

//   const handleExportExcel = () => {
//     if (!filteredRows.length) {
//       setError("No data to export");
//       return;
//     }
//     const ws = XLSX.utils.json_to_sheet(filteredRows);
//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, "Promotion Report");
//     XLSX.writeFile(wb, "Promotion_Report.xlsx");
//   };

//   const handleRowsPerPageChange = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const purpleButtonStyle = {
//     backgroundColor: '#673ab7', color: '#fff', transition: 'all 0.3s ease-in-out',
//     '&:hover': { backgroundColor: '#5e35b1', boxShadow: '0 0 15px rgba(103, 58, 183, 0.7)' },
//     '&:active': { backgroundColor: '#512da8', boxShadow: '0 0 20px rgba(103, 58, 183, 0.9)' },
//     '&.Mui-disabled': { backgroundColor: 'rgba(0, 0, 0, 0.12)' }
//   };

//   const pageCount = Math.ceil(filteredRows.length / rowsPerPage);

//   const columns = [
//     "Sr No", "Employee ID", "Name", "Department", "Designation",
//     "Division", "Sub-Division", "Level", "Headquarter", "Line Manager",
//     "DOJ", "Promotion 1", "Date of Promotion", "Promotion 2", "Date of Promotion"
//   ];

//   return (
//     <Container disableGutters>
//       <Typography variant="h6" fontWeight="bold" mb={2}>
//         Employee Promotion Report
//       </Typography>

//       {/* Dropdowns for selection */}
//       <Grid container spacing={2} mb={2}>
//         <Grid item xs={12} sm={4}>
//           <Autocomplete
//             options={departments}
//             value={selectedDepartment}
//             onChange={(_, v) => {
//               setSelectedDepartment(v);
//               setSelectedEmployee(null); // Reset employee when department changes
//             }}
//             getOptionLabel={(o) => `${o.department_name}`}
//             renderInput={(params) => <TextField {...params} label="Select Department" size="small" />}
//           />
//         </Grid>
//         <Grid item xs={12} sm={4}>
//           <Autocomplete
//             options={designations}
//             value={selectedDesignation}
//             onChange={(_, v) => {
//               setSelectedDesignation(v);
//               setSelectedEmployee(null); // Reset employee when designation changes
//             }}
//             getOptionLabel={(o) => `${o.designation_name}`}
//             renderInput={(params) => <TextField {...params} label="Select Designation" size="small" />}
//           />
//         </Grid>
//         <Grid item xs={12} sm={4}>
//           <Autocomplete
//             options={employees}
//             value={selectedEmployee}
//             onChange={(_, v) => setSelectedEmployee(v)}
//             getOptionLabel={(o) => `${o.employee_name}`}
//             disabled={!selectedDepartment || !selectedDesignation}
//             renderInput={(params) => <TextField {...params} label="Select Employee" size="small" />}
//           />
//         </Grid>
//       </Grid>

//       {/* --- RESTRUCTURED CONTROLS BAR --- */}
//       <Grid container spacing={2} mb={2} alignItems="center">
//         {/* Left: Rows Dropdown */}
//         <Grid item xs={12} sm={4} md={2}>
//           <FormControl fullWidth variant="outlined" size="small">
//             <InputLabel>Rows</InputLabel>
//             <Select value={rowsPerPage} label="Rows" onChange={handleRowsPerPageChange}>
//               <MenuItem value={5}>5</MenuItem>
//               <MenuItem value={10}>10</MenuItem>
//               <MenuItem value={25}>25</MenuItem>
//             </Select>
//           </FormControl>
//         </Grid>

//         {/* Center: Action Buttons */}
//         <Grid item xs={12} sm={4} md={8}>
//           <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
//             <Button variant="contained" onClick={fetchPromotionData} sx={{ ...purpleButtonStyle, height: 40 }}>
//               Generate Report
//             </Button>
//             {filteredRows.length > 0 && (
//               <Button variant="contained" onClick={handleExportExcel} sx={{ ...purpleButtonStyle, height: 40 }}>
//                 Export Excel
//               </Button>
//             )}
//           </Box>
//         </Grid>

//         {/* Right: Search Field */}
//         <Grid item xs={12} sm={4} md={2}>
//           <TextField
//             fullWidth
//             variant="outlined"
//             size="small"
//             placeholder="Search Employee..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </Grid>
//       </Grid>

//       {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

//       <TableContainer sx={{ width: "100%", overflowX: "auto", borderRadius: 2, boxShadow: 2 }}>
//         <Table stickyHeader size="small" sx={{ minWidth: "100%", whiteSpace: "nowrap" }}>
//           <TableHead>
//             <TableRow>
//               {columns.map((colName) => (
//                 <TableCell key={colName} sx={{ textTransform: 'uppercase', backgroundColor: "#e3f2fd", fontWeight: 600 }}>
//                   {colName}
//                 </TableCell>
//               ))}
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {loading ? (
//               <TableRow><TableCell colSpan={columns.length} align="center"><CircularProgress /></TableCell></TableRow>
//             ) : error ? (
//               // Error message is already displayed above the table
//               <TableRow><TableCell colSpan={columns.length} align="center"></TableCell></TableRow>
//             ) : !hasSearched ? (
//               <TableRow><TableCell colSpan={columns.length} align="center">Select Department and Designation, then click "Generate Report".</TableCell></TableRow>
//             ) : filteredRows.length > 0 ? (
//               filteredRows
//                 .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                 .map((row, index) => (
//                   <TableRow key={row.employee_id || index} sx={{ "&:nth-of-type(odd)": { backgroundColor: "#f9f9f9" } }}>

//                     <TableCell>{page * rowsPerPage + index + 1}</TableCell>
//                     <TableCell>{(row.employee_id && row.employee_id.trim() !== '') ? row.employee_id : 'N/A'}</TableCell>
//                     <TableCell>{(row.employee_name && row.employee_name.trim() !== '') ? row.employee_name : 'N/A'}</TableCell>
//                     <TableCell>{(row.department_name && row.department_name.trim() !== '') ? row.department_name : 'N/A'}</TableCell>
//                     <TableCell>{(row.designation_name && row.designation_name.trim() !== '') ? row.designation_name : 'N/A'}</TableCell>
//                     <TableCell>{(row.division && row.division.trim() !== '') ? row.division : 'N/A'}</TableCell>
//                     <TableCell>{(row.sub_division && row.sub_division.trim() !== '') ? row.sub_division : 'N/A'}</TableCell>
//                     <TableCell>{(row.level && row.level.trim() !== '') ? row.level : 'N/A'}</TableCell>
//                     <TableCell>{(row.headquarter && row.headquarter.trim() !== '') ? row.headquarter : 'N/A'}</TableCell>
//                     <TableCell>{(row.manager_name && row.manager_name.trim() !== '') ? row.manager_name : 'N/A'}</TableCell>
//                     <TableCell>{(row.date_of_joining && row.date_of_joining.trim() !== '') ? row.date_of_joining : 'N/A'}</TableCell>
//                     <TableCell>{(row.promotion_one && row.promotion_one.trim() !== '') ? row.promotion_one : 'N/A'}</TableCell>
//                     <TableCell>{(row.promotion_one_date && row.promotion_one_date.trim() !== '') ? row.promotion_one_date : 'N/A'}</TableCell>
//                     <TableCell>{(row.promotion_second && row.promotion_second.trim() !== '') ? row.promotion_second : 'N/A'}</TableCell>
//                     <TableCell>{(row.promotion_second_date && row.promotion_second_date.trim() !== '') ? row.promotion_second_date : 'N/A'}</TableCell>
//                   </TableRow>
//                 ))
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

// export default EmployeePromotionTable;














// import React, { useEffect, useMemo, useState } from "react";

// import {

//   Box,

//   Typography,

//   Grid,

//   Button,

//   Paper,

//   Autocomplete,

//   CircularProgress,

//   Alert,

//   TextField,

//   Table,

//   TableBody,

//   TableCell,

//   TableContainer,

//   TableHead,

//   TableRow,

//   TablePagination,

//   FormControl,

//   InputLabel,

//   Select,

//   MenuItem,

//   Container,

// } from "@mui/material";

// import axiosInstance from "../../utils/axiosInstance";

// import * as XLSX from "xlsx";

 

// const EmployeePromotionTable = () => {

//   const [departments, setDepartments] = useState([]);

//   const [designations, setDesignations] = useState([]);

//   const [employees, setEmployees] = useState([]);

//   const [rows, setRows] = useState([]); // This will hold the raw fetched data

 

//   const [selectedDepartment, setSelectedDepartment] = useState(null);

//   const [selectedDesignation, setSelectedDesignation] = useState(null);

//   const [selectedEmployee, setSelectedEmployee] = useState(null);

//   const [searchTerm, setSearchTerm] = useState("");

//   const [error, setError] = useState("");

//   const [loading, setLoading] = useState(false);

//   const [hasSearched, setHasSearched] = useState(false); // New state to track if search has been initiated

 

//   const [page, setPage] = useState(0);

//   const [rowsPerPage, setRowsPerPage] = useState(10);

 

//   useEffect(() => {

//     const loadDropdowns = async () => {

//       try {

//         const [depRes, desRes] = await Promise.all([

//           axiosInstance.get("https://tdtlworld.com/hrms-backend/api/departments/dropdown/"),

//           axiosInstance.get("https://tdtlworld.com/hrms-backend/api/designations/dropdown/"),

//         ]);

//         setDepartments(depRes?.data?.data || []);

//         setDesignations(desRes?.data?.data || []);

//       } catch (e) {

//         setError("Failed to load dropdowns");

//       }

//     };

//     loadDropdowns();

//   }, []);

 

//   // Fetch employees when department and designation are selected

//   useEffect(() => {

//     const fetchEmployees = async () => {

//       if (selectedDepartment?.department_id && selectedDesignation?.designation_id) {

//         try {

//           const url = `https://tdtlworld.com/hrms-backend/apis/get_promotion_report_employee_drop/?dept=${selectedDepartment.department_id}&desig=${selectedDesignation.designation_id}`;

//           const res = await axiosInstance.get(url);

//           const data = res?.data?.data || res?.data || [];

//           setEmployees(data);

//         } catch (e) {

//           setError("Failed to load employees for the selected criteria.");

//           console.error("Error fetching employees:", e);

//         }

//       }

//     };

 

//     fetchEmployees();

//   }, [selectedDepartment, selectedDesignation]);

 

//   const fetchPromotionData = async () => {

//     setError(""); // Clear previous errors

//     setRows([]); // Clear previous rows

//     setLoading(true);

//     setHasSearched(true);

//     setPage(0); // Reset page to 0 on new search

 

//     try {

//       // If a specific employee is selected, fetch only their data

//       if (selectedEmployee) {

//         const url = `https://tdtlworld.com/hrms-backend/apis/get_employee_promotion_get_report/?employee_id=${selectedEmployee.employee_id}`;

//         const res = await axiosInstance.get(url);

//         const data = res?.data?.data || res?.data || [];

//         setRows(Array.isArray(data) ? data : [data]);

//       }

//       // Otherwise, fetch all employees' data for the selected department and designation

//       else if (selectedDepartment?.department_id && selectedDesignation?.designation_id) {

//         const promotionPromises = employees.map(async (employee) => {

//           try {

//             const res = await axiosInstance.get(

//               `https://tdtlworld.com/hrms-backend/apis/get_employee_promotion_get_report/?employee_id=${employee.employee_id}`

//             );

//             const promotionData = res?.data?.data || res?.data || {};

 

//             // Merge employee data with promotion data

//             return {

//               ...employee,

//               ...promotionData

//             };

//           } catch (error) {

//             console.error(`Error fetching promotion data for employee ${employee.employee_id}:`, error);

//             return employee; // Return the base employee data if promotion fetch fails

//           }

//         });

 

//         const employeesWithPromotions = await Promise.all(promotionPromises);

//         setRows(employeesWithPromotions);

//       } else {

//         setError("Please select both Department and Designation, or a specific Employee.");

//         setLoading(false);

//         return;

//       }

//     } catch (e) {

//       setError("Failed to load promotion data.");

//       console.error("Error fetching promotion data:", e);

//     } finally {

//       setLoading(false);

//     }

//   };

 

//   const filteredRows = useMemo(() => {

//     if (!searchTerm.trim()) return rows;

//     const q = searchTerm.toLowerCase();

//     return rows.filter((r) =>

//       (r.employee_name || "").toLowerCase().includes(q) || String(r.employee_id).includes(q)

//     );

//   }, [rows, searchTerm]);

 

//   const handleExportExcel = () => {

//     if (!filteredRows.length) {

//       setError("No data to export");

//       return;

//     }

//     const ws = XLSX.utils.json_to_sheet(filteredRows);

//     const wb = XLSX.utils.book_new();

//     XLSX.utils.book_append_sheet(wb, ws, "Promotion Report");

//     XLSX.writeFile(wb, "Promotion_Report.xlsx");

//   };

 

//   const handleRowsPerPageChange = (event) => {

//     setRowsPerPage(parseInt(event.target.value, 10));

//     setPage(0);

//   };

 

//   const purpleButtonStyle = {

//     backgroundColor: '#673ab7', color: '#fff', transition: 'all 0.3s ease-in-out',

//     '&:hover': { backgroundColor: '#5e35b1', boxShadow: '0 0 15px rgba(103, 58, 183, 0.7)' },

//     '&:active': { backgroundColor: '#512da8', boxShadow: '0 0 20px rgba(103, 58, 183, 0.9)' },

//     '&.Mui-disabled': { backgroundColor: 'rgba(0, 0, 0, 0.12)' }

//   };

 

//   const pageCount = Math.ceil(filteredRows.length / rowsPerPage);

 

//   const columns = [

//     "Sr No", "Employee ID", "Name", "Department", "Designation",

//     "Division", "Sub-Division", "Level", "Headquarter", "Line Manager",

//     "DOJ", "Promotion 1", "Date of Promotion", "Promotion 2", "Date of Promotion"

//   ];

 

//   return (

//     <Container disableGutters>

//       <Typography variant="h6" fontWeight="bold" mb={2}>

//         Employee Promotion Report

//       </Typography>

 

//       {/* Dropdowns for selection */}

//       <Grid container spacing={2} mb={2}>

//         <Grid item xs={12} sm={4}>

//           <Autocomplete

//             options={departments}

//             value={selectedDepartment}

//             onChange={(_, v) => {

//               setSelectedDepartment(v);

//               setSelectedEmployee(null); // Reset employee when department changes

//             }}

//             getOptionLabel={(o) => `${o.department_name}`}

//             renderInput={(params) => <TextField {...params} label="Select Department" size="small" />}

//           />

//         </Grid>

//         <Grid item xs={12} sm={4}>

//           <Autocomplete

//             options={designations}

//             value={selectedDesignation}

//             onChange={(_, v) => {

//               setSelectedDesignation(v);

//               setSelectedEmployee(null); // Reset employee when designation changes

//             }}

//             getOptionLabel={(o) => `${o.designation_name}`}

//             renderInput={(params) => <TextField {...params} label="Select Designation" size="small" />}

//           />

//         </Grid>

//         <Grid item xs={12} sm={4}>

//           <Autocomplete

//             options={employees}

//             value={selectedEmployee}

//             onChange={(_, v) => setSelectedEmployee(v)}

//             getOptionLabel={(o) => `${o.employee_name}`}

//             disabled={!selectedDepartment || !selectedDesignation}

//             renderInput={(params) => <TextField {...params} label="Select Employee" size="small" />}

//           />

//         </Grid>

//       </Grid>

 

//       {/* --- RESTRUCTURED CONTROLS BAR --- */}

//       <Grid container spacing={2} mb={2} alignItems="center">

//         {/* Left: Rows Dropdown */}

//         <Grid item xs={12} sm={4} md={2}>

//           <FormControl fullWidth variant="outlined" size="small">

//             <InputLabel>Rows</InputLabel>

//             <Select value={rowsPerPage} label="Rows" onChange={handleRowsPerPageChange}>

//               <MenuItem value={5}>5</MenuItem>

//               <MenuItem value={10}>10</MenuItem>

//               <MenuItem value={25}>25</MenuItem>

//             </Select>

//           </FormControl>

//         </Grid>

 

//         {/* Center: Action Buttons */}

//         <Grid item xs={12} sm={4} md={8}>

//           <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>

//             <Button variant="contained" onClick={fetchPromotionData} sx={{ ...purpleButtonStyle, height: 40 }}>

//               Generate Report

//             </Button>

//             {filteredRows.length > 0 && (

//               <Button variant="contained" onClick={handleExportExcel} sx={{ ...purpleButtonStyle, height: 40 }}>

//                 Export Excel

//               </Button>

//             )}

//           </Box>

//         </Grid>

 

//         {/* Right: Search Field */}

//         <Grid item xs={12} sm={4} md={2}>

//           <TextField

//             fullWidth

//             variant="outlined"

//             size="small"

//             placeholder="Search Employee..."

//             value={searchTerm}

//             onChange={(e) => setSearchTerm(e.target.value)}

//           />

//         </Grid>

//       </Grid>

 

//       {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

 

//       <TableContainer sx={{ width: "100%", overflowX: "auto", borderRadius: 2, boxShadow: 2 }}>

//         <Table stickyHeader size="small" sx={{ minWidth: "100%", whiteSpace: "nowrap" }}>

//           <TableHead>

//             <TableRow>

//               {columns.map((colName) => (

//                 <TableCell key={colName} sx={{ textTransform: 'uppercase', backgroundColor: "#e3f2fd", fontWeight: 600 }}>

//                   {colName}

//                 </TableCell>

//               ))}

//             </TableRow>

//           </TableHead>

//           <TableBody>

//             {loading ? (

//               <TableRow><TableCell colSpan={columns.length} align="center"><CircularProgress /></TableCell></TableRow>

//             ) : error ? (

//               // Error message is already displayed above the table

//               <TableRow><TableCell colSpan={columns.length} align="center"></TableCell></TableRow>

//             ) : !hasSearched ? (

//               <TableRow><TableCell colSpan={columns.length} align="center">Select Department and Designation, then click "Generate Report".</TableCell></TableRow>

//             ) : filteredRows.length > 0 ? (

//               filteredRows

//                 .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

//                 .map((row, index) => (

//                   <TableRow key={row.employee_id || index} sx={{ "&:nth-of-type(odd)": { backgroundColor: "#f9f9f9" } }}>

 

//                     <TableCell>{page * rowsPerPage + index + 1}</TableCell>

//                     <TableCell>{(row.employee_id && row.employee_id.trim() !== '') ? row.employee_id : 'N/A'}</TableCell>

//                     <TableCell>{(row.employee_name && row.employee_name.trim() !== '') ? row.employee_name : 'N/A'}</TableCell>

//                     <TableCell>{(row.department_name && row.department_name.trim() !== '') ? row.department_name : 'N/A'}</TableCell>

//                     <TableCell>{(row.designation_name && row.designation_name.trim() !== '') ? row.designation_name : 'N/A'}</TableCell>

//                     <TableCell>{(row.division && row.division.trim() !== '') ? row.division : 'N/A'}</TableCell>

//                     <TableCell>{(row.sub_division && row.sub_division.trim() !== '') ? row.sub_division : 'N/A'}</TableCell>

//                     <TableCell>{(row.level && row.level.trim() !== '') ? row.level : 'N/A'}</TableCell>

//                     <TableCell>{(row.headquarter && row.headquarter.trim() !== '') ? row.headquarter : 'N/A'}</TableCell>

//                     <TableCell>{(row.manager_name && row.manager_name.trim() !== '') ? row.manager_name : 'N/A'}</TableCell>

//                     <TableCell>{(row.date_of_joining && row.date_of_joining.trim() !== '') ? row.date_of_joining : 'N/A'}</TableCell>

//                     <TableCell>{(row.promotion_one && row.promotion_one.trim() !== '') ? row.promotion_one : 'N/A'}</TableCell>

//                     <TableCell>{(row.promotion_one_date && row.promotion_one_date.trim() !== '') ? row.promotion_one_date : 'N/A'}</TableCell>

//                     <TableCell>{(row.promotion_second && row.promotion_second.trim() !== '') ? row.promotion_second : 'N/A'}</TableCell>

//                     <TableCell>{(row.promotion_second_date && row.promotion_second_date.trim() !== '') ? row.promotion_second_date : 'N/A'}</TableCell>

//                   </TableRow>

//                 ))

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

 

// export default EmployeePromotionTable;
















import React, { useEffect, useMemo, useState } from "react";
import {
    Box, Typography, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Alert, Stack,
    FormControl, InputLabel, Select, MenuItem, TextField, Button, Paper,
    Autocomplete, Skeleton, useTheme, useMediaQuery, Pagination
} from "@mui/material";
import GridOnIcon from '@mui/icons-material/GridOn';
import axiosInstance from "../../utils/axiosInstance";
// CORRECTED LINE: Changed *s to * as
import * as XLSX from "xlsx"; 

const EmployeePromotionTable = () => {
    // --- Hooks for State, Theme, and Responsiveness ---
    const [departments, setDepartments] = useState([]);
    const [designations, setDesignations] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [rows, setRows] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState(null);
    const [selectedDesignation, setSelectedDesignation] = useState(null);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const primaryColor = "#8C257C";
    const primaryButtonHover = "#6d1d60";
    const secondaryColor = "#F58E35";

    // --- Data Fetching and Effects ---
    useEffect(() => {
        const loadDropdowns = async () => {
            try {
                const [depRes, desRes] = await Promise.all([
                    axiosInstance.get("https://tdtlworld.com/hrms-backend/api/departments/dropdown/"),
                    axiosInstance.get("https://tdtlworld.com/hrms-backend/api/designations/dropdown/"),
                ]);
                setDepartments(depRes?.data?.data || []);
                setDesignations(desRes?.data?.data || []);
            } catch (e) { setError("Failed to load dropdowns"); }
        };
        loadDropdowns();
    }, []);

    useEffect(() => {
        const fetchEmployees = async () => {
            if (selectedDepartment?.department_id && selectedDesignation?.designation_id) {
                try {
                    const url = `https://tdtlworld.com/hrms-backend/apis/get_promotion_report_employee_drop/?dept=${selectedDepartment.department_id}&desig=${selectedDesignation.designation_id}`;
                    const res = await axiosInstance.get(url);
                    setEmployees(res?.data?.data || res?.data || []);
                } catch (e) {
                    setError("Failed to load employees for the selected criteria.");
                    console.error("Error fetching employees:", e);
                }
            } else {
                setEmployees([]); // Clear employees if filters are incomplete
            }
        };
        fetchEmployees();
    }, [selectedDepartment, selectedDesignation]);

    const fetchPromotionData = async () => {
        setError(""); setLoading(true); setHasSearched(true); setRows([]); setPage(0);
        try {
            if (selectedEmployee) {
                const url = `https://tdtlworld.com/hrms-backend/apis/get_employee_promotion_get_report/?employee_id=${selectedEmployee.employee_id}`;
                const res = await axiosInstance.get(url);
                const data = res?.data?.data || res?.data || [];
                setRows(Array.isArray(data) ? data : [data]);
            } else if (selectedDepartment?.department_id && selectedDesignation?.designation_id) {
                const promotionPromises = employees.map(async (employee) => {
                    const res = await axiosInstance.get(`https://tdtlworld.com/hrms-backend/apis/get_employee_promotion_get_report/?employee_id=${employee.employee_id}`);
                    return { ...employee, ...(res?.data?.data || res?.data || {}) };
                });
                setRows(await Promise.all(promotionPromises));
            } else {
                setError("Please select Department and Designation, or a specific Employee.");
            }
        } catch (e) {
            setError("Failed to load promotion data.");
            console.error("Error fetching promotion data:", e);
        } finally {
            setLoading(false);
        }
    };

    // --- Memoized Calculations for Performance ---
    const filteredRows = useMemo(() => {
        if (!searchTerm.trim()) return rows;
        const q = searchTerm.toLowerCase();
        return rows.filter((r) => Object.values(r).some(val => String(val).toLowerCase().includes(q)));
    }, [rows, searchTerm]);
    
    const paginatedData = useMemo(() => {
        return filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    }, [filteredRows, page, rowsPerPage]);

    // --- Event Handlers ---
    const handleSearchChange = (event) => { setSearchTerm(event.target.value); setPage(0); };
    const handleRowsPerPageChange = (event) => { setRowsPerPage(parseInt(event.target.value, 10)); setPage(0); };
    const handlePaginationChange = (event, newPage) => { setPage(newPage - 1); };

    // --- EXPORT FUNCTIONALITY ---
    const handleExportExcel = () => {
        const ws = XLSX.utils.json_to_sheet(filteredRows);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Promotion Report");
        XLSX.writeFile(wb, "Promotion_Report.xlsx");
    };

    const columns = [ "Sr No", "Employee ID", "Name", "Department", "Designation", "Division", "Sub-Division", "Level", "Headquarter", "Line Manager", "DOJ", "Promotion 1", "Date of Promotion", "Promotion 2", "Date of Promotion" ];
    const headerCellStyle = { fontWeight: 'bold', backgroundColor: primaryColor, color: '#fff', textAlign: 'center' };
    const startEntry = filteredRows.length > 0 ? page * rowsPerPage + 1 : 0;
    const endEntry = Math.min((page + 1) * rowsPerPage, filteredRows.length);

    return (
        <Box p={2}>
            <Typography variant="h4" fontWeight="bold" color={primaryColor} mb={5}>
                Employee Promotion Report
            </Typography>

            <Paper sx={{ p: 2, mb: 2 }}>
                <Stack direction={isMobile ? 'column' : 'row'} spacing={2} mb={2} flexWrap="wrap">
                    <Autocomplete options={departments} value={selectedDepartment} onChange={(_, v) => { setSelectedDepartment(v); setSelectedEmployee(null); }} getOptionLabel={(o) => o.department_name} renderInput={(params) => <TextField {...params} label="Select Department" size="small" />} sx={{ minWidth: 200, flexGrow: 1 }} />
                    <Autocomplete options={designations} value={selectedDesignation} onChange={(_, v) => { setSelectedDesignation(v); setSelectedEmployee(null); }} getOptionLabel={(o) => o.designation_name} renderInput={(params) => <TextField {...params} label="Select Designation" size="small" />} sx={{ minWidth: 200, flexGrow: 1 }} />
                    <Autocomplete options={employees} value={selectedEmployee} onChange={(_, v) => setSelectedEmployee(v)} getOptionLabel={(o) => o.employee_name} disabled={!selectedDepartment || !selectedDesignation} renderInput={(params) => <TextField {...params} label="Select Employee (Optional)" size="small" />} sx={{ minWidth: 200, flexGrow: 1 }} />
                </Stack>
                <Stack direction={isMobile ? 'column' : 'row'} justifyContent="space-between" alignItems="center" spacing={2}>
                    <Button variant="contained" onClick={fetchPromotionData} disabled={loading || (!selectedEmployee && (!selectedDepartment || !selectedDesignation))} sx={{ backgroundColor: primaryColor, '&:hover': { backgroundColor: primaryButtonHover } }}>
                        Generate Report
                    </Button>
                    <Button variant="outlined" onClick={handleExportExcel} startIcon={<GridOnIcon />} disabled={filteredRows.length === 0} sx={{ borderColor: secondaryColor, color: secondaryColor, '&:hover': { borderColor: '#e07e2a', backgroundColor: '#fff8f2' } }}>
                        Export
                    </Button>
                </Stack>
            </Paper>
            
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

            <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
                <Table stickyHeader size="small">
                    <TableHead>
                        <TableRow>{columns.map((label) => <TableCell key={label} sx={headerCellStyle}>{label}</TableCell>)}</TableRow>
                    </TableHead>
                    <TableBody>
                        {loading ? (
                            [...Array(rowsPerPage)].map((_, rowIndex) => (
                                <TableRow key={rowIndex}>
                                    {[...Array(columns.length)].map((_, cellIndex) => <TableCell key={cellIndex}><Skeleton variant="text" /></TableCell>)}
                                </TableRow>
                            ))
                        ) : !hasSearched ? (
                            <TableRow><TableCell colSpan={columns.length} align="center">Select filters and click "Generate Report".</TableCell></TableRow>
                        ) : paginatedData.length > 0 ? (
                            paginatedData.map((row, index) => (
                                <TableRow key={row.employee_id || index} hover>
                                    <TableCell align="center">{page * rowsPerPage + index + 1}</TableCell>
                                    <TableCell>{row.employee_id || 'N/A'}</TableCell>
                                    <TableCell>{row.employee_name || 'N/A'}</TableCell>
                                    <TableCell>{row.department_name || 'N/A'}</TableCell>
                                    <TableCell>{row.designation_name || 'N/A'}</TableCell>
                                    <TableCell>{row.division || 'N/A'}</TableCell>
                                    <TableCell>{row.sub_division || 'N/A'}</TableCell>
                                    <TableCell>{row.level || 'N/A'}</TableCell>
                                    <TableCell>{row.headquarter || 'N/A'}</TableCell>
                                    <TableCell>{row.manager_name || 'N/A'}</TableCell>
                                    <TableCell>{row.date_of_joining || 'N/A'}</TableCell>
                                    <TableCell>{row.promotion_one || 'N/A'}</TableCell>
                                    <TableCell>{row.promotion_one_date || 'N/A'}</TableCell>
                                    <TableCell>{row.promotion_second || 'N/A'}</TableCell>
                                    <TableCell>{row.promotion_second_date || 'N/A'}</TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow><TableCell colSpan={columns.length} align="center">No data available for the selected criteria.</TableCell></TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            
            {filteredRows.length > 0 && (
                <Box sx={{ p: 2, borderTop: '1px solid rgba(224, 224, 224, 1)' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <FormControl variant="outlined" size="small">
                                <Select value={rowsPerPage} onChange={handleRowsPerPageChange} sx={{ backgroundColor: '#8C257C', color: 'white', borderRadius: '4px', '&:hover': { backgroundColor: '#8C257C' }, '& .MuiOutlinedInput-notchedOutline': { border: 'none' }, '& .MuiSvgIcon-root': { color: 'white' } }}>
                                    {[10, 25, 50, 100].map(value => <MenuItem key={value} value={value}>{value}</MenuItem>)}
                                </Select>
                            </FormControl>
                            <Typography variant="body2" color="text.secondary">{`Showing ${startEntry} to ${endEntry} of ${filteredRows.length} results`}</Typography>
                        </Box>
                        <TextField size="small" variant="outlined" placeholder="Search in results..." value={searchTerm} onChange={handleSearchChange} sx={{ width: isMobile ? '100%' : 'auto' }} />
                        <Pagination count={Math.ceil(filteredRows.length / rowsPerPage)} page={page + 1} onChange={handlePaginationChange} showFirstButton showLastButton sx={{ '& .MuiPaginationItem-root': { borderRadius: '4px', '&:hover': { backgroundColor: secondaryColor, color: 'white' } }, '& .MuiPaginationItem-page': { color: primaryColor, '&.Mui-selected': { backgroundColor: primaryColor, color: 'white', '&:hover': { backgroundColor: secondaryColor } } }, '& .MuiPaginationItem-icon': { color: primaryColor } }} />
                    </Box>
                </Box>
            )}
        </Box>
    );
};

export default EmployeePromotionTable;