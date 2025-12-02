// import React, { useState, useEffect, useMemo, useCallback, useRef } from "react";
// import axios from 'axios';
// import {
//   Box,
//   Typography,
//   Button,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TextField,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   Avatar,
//   Chip,
//   IconButton,
//   Tooltip,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Grid,
//   CircularProgress,
//   Autocomplete,
//   InputAdornment,
// } from "@mui/material";
// import {
//   Edit as EditIcon,
//   Delete as DeleteIcon,
//   Add as AddIcon,
//   Close as CloseIcon,
//   Download as DownloadIcon,
//   ArrowForward as ArrowForwardIcon,
//   SupervisorAccount as ChangeManagerIcon,
//   Link as LinkIcon,
//   Visibility,
//   VisibilityOff,
// } from "@mui/icons-material";
// import * as XLSX from "xlsx";
// import { useNavigate } from "react-router-dom";
// import axiosInstance from "../../utils/axiosInstance";
// import Swal from 'sweetalert2';

// const RESUME_BASE_URL = "https://raasbackend.vetrinahealthcare.com/";

// // --- Helper arrays for static Autocomplete options ---
// const statusOptions = [{ value: 1, label: 'Active' }, { value: 0, label: 'Inactive' }];
// const probationOptions = [{ value: 'Y', label: 'Yes' }, { value: 'N', label: 'No' }];
// const genderOptions = [{ value: 'Male', label: 'Male' }, { value: 'Female', label: 'Female' }, { value: 'Other', label: 'Other' }];
// const subDivisionOptions = [{ value: 'VetBiz', label: 'VetBiz' }, { value: 'TredBiz', label: 'TredBiz' }, { value: ' ', label: 'TredBiz Mix' }];


// export default function EmployeesView() {
//   const employeeDialogRef = useRef(null);
//   const changeManagerDialogRef = useRef(null);

//   const [departments, setDepartments] = useState([]);
//   const [designations, setDesignations] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [openChangeManagerForm, setOpenChangeManagerForm] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [rowsPerPage, setRowsPerPage] = useState(5);
//   const [newManager, setNewManager] = useState("");
//   const [selectedEmployeeForManagerChange, setSelectedEmployeeForManagerChange] = useState("");
//   const [employees, setEmployees] = useState([]);
//   const [hoveredRowId, setHoveredRowId] = useState(null);
//   const [officeShifts, setOfficeShifts] = useState([]);
//   const [isEditMode, setIsEditMode] = useState(false);
//   const [roles, setRoles] = useState([]);
//   const [countries, setCountries] = useState([]);
//   const [states, setStates] = useState([]);
//   const [employeeHubs, setEmployeeHubs] = useState([]);
//   const [headquarters, setHeadquarters] = useState([]);
//   const [divisions, setDivisions] = useState([]);
//   const [allEmployeesForDropdown, setAllEmployeesForDropdown] = useState([]);
 
//   const [talentPool, setTalentPool] = useState([]);
//   const [isFetchingDocs, setIsFetchingDocs] = useState(false);
//   const [employeeDocuments, setEmployeeDocuments] = useState(null);
//   const [showPassword, setShowPassword] = useState(false);

//   const [isSaving, setIsSaving] = useState(false);

//   const purpleButtonSx = {
//     backgroundColor: '#6A0DAD',
//     '&:hover': {
//       backgroundColor: '#5A009D',
//     },
//     padding: '4px 10px',
//     height: '32px',
//   };

//   const cancelRedTextSx = {
//     color: 'red',
//   };

//   const [currentEmployee, setCurrentEmployee] = useState({
//     id: null,
//     firstName: "",
//     middleName: "",
//     lastName: "",
//     email: "",
//     join_date: "",
//     status: 1,
//     phone: "",
//     avatar: null,
//     country_id: "",
//     state_id: "",
//     employee_hub_id: "",
//     headquarter_id: "",
//     division_id: "",
//     subDivision: "",
//     role: "",
//     is_probation: "n",
//     resumeUrl: "",
//     password: "",
//     gender: "",
//     username: "",
//     grossSalary: "",
//     department_id: "",
//     designation_id: "",
//     manager_id: "",
//     officeShift: "",
//   });

//   const [openEmployeeForm, setOpenEmployeeForm] = useState(false);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [
//           depts, empDropdown, shifts, countriesRes, hubs, divs, rolesRes, talent,headquartersRes
//         ] = await Promise.all([
//           axiosInstance.get('api/desig_dept_dropdown/'),
//           axiosInstance.get('employee-dropdown/'),
//           axiosInstance.get('api/office_shift_dropdown/'),
//           axiosInstance.get('api/countries/'),
//           axiosInstance.get('api/employee_hub/'),
//           axiosInstance.get('api/division/'),
//           axiosInstance.get('api/role_list/'),
//           axiosInstance.get('api/search_by_email_vet_talent/'),
//           axiosInstance.get('https://tdtlworld.com/hrms-backend/api/headquarters/')
//         ]);
//         setDepartments(depts.data.dept_data || []);
//         setAllEmployeesForDropdown(empDropdown.data || []);
//         setOfficeShifts(shifts.data.office_shift_data || []);
//         if (countriesRes.data.status === 'success') setCountries(countriesRes.data.data || []);
//         setDivisions(divs.data || []);
//         if (rolesRes.data?.status === "success") setRoles(rolesRes.data.data);
//       setHeadquarters(headquartersRes.data || []);
//         setTalentPool(talent.data.data || []);
//       } catch (error) {
//         console.error("Error fetching initial data:", error);
//         Swal.fire('Error', 'Failed to fetch initial data.', 'error');
//       }
//     };
//     fetchData();
//   }, []);

//   const fetchEmployees = useCallback(() => {
//     axiosInstance.get('api/employee_details/')
//       .then((response) => setEmployees(Array.isArray(response.data.data) ? response.data.data : []))
//       .catch((error) => {
//         console.error('Error fetching employees:', error);
//         setEmployees([]);
//         Swal.fire('Error', 'Failed to fetch employee list.', 'error');
//       });
//   }, []);

//   useEffect(() => { fetchEmployees(); }, [fetchEmployees]);

//   // --- UPDATED HANDLERS for Autocomplete ---

//   const handleCountryChange = (selectedCountry) => {
//     const countryId = selectedCountry ? selectedCountry.country_id : "";
//     const countryName = selectedCountry ? selectedCountry.country_name : null;

//     setCurrentEmployee(prev => ({ ...prev, country_id: countryId, state_id: "", employee_hub_id: "" }));
//     setStates([]);
//     setEmployeeHubs([]);
//     if (countryName) {
//       axiosInstance.get(`api/states/?country_name=${countryName}`)
//         .then(res => {
//           if (res.data.status === "success") setStates(res.data.data || []);
//         })
//         .catch(err => {
//           console.error("Error fetching states:", err);
//           Swal.fire('Error', 'Failed to fetch states for the selected country.', 'error');
//         });
//     }
//   };

//   const handleStateChange = (selectedState) => {
//     const stateId = selectedState ? selectedState.state_id : "";
//     setCurrentEmployee(prev => ({ ...prev, state_id: stateId, employee_hub_id: "" }));
//     setEmployeeHubs([]);
//     if (stateId) {
//       axiosInstance.get(`api/employee_hub_dropdown/${stateId}/`)
//         .then(res => {
//           if (res.data.status === "success") setEmployeeHubs(res.data.data || []);
//         })
//         .catch(err => {
//           console.error("Error fetching employee hubs:", err);
//           Swal.fire('Error', 'Failed to fetch employee hubs for the selected state.', 'error');
//         });
//     }
//   };

//   const handleDeptChange = (selectedDept) => {
//     const deptId = selectedDept ? selectedDept.dept_id : "";
//     setCurrentEmployee((prev) => ({ ...prev, department_id: deptId, designation_id: "" }));
//     if (deptId) {
//       axiosInstance.get(`api/desig_dept_dropdown/?dept_id=${deptId}/`)
//         .then((res) => setDesignations(res.data.desig_data || []))
//         .catch((err) => {
//           console.error("Error fetching designations:", err);
//           Swal.fire({ icon: 'error', title: 'Error', text: 'Failed to load designations.', target: employeeDialogRef.current });
//         });
//     } else {
//       setDesignations([]);
//     }
//   };

//   const handleDivisionChange = (selectedDivision) => {
//     const divisionId = selectedDivision ? selectedDivision.division_id : "";
//     if (selectedDivision && selectedDivision.division_name !== 'Livestock') {
//         setCurrentEmployee(prev => ({ ...prev, division_id: divisionId, subDivision: "" }));
//     } else {
//         setCurrentEmployee(prev => ({ ...prev, division_id: divisionId }));
//     }
//   };

//   // --- End of updated handlers ---

//   const handleChangeManager = async () => {
//     if (!selectedEmployeeForManagerChange || !newManager) {
//       Swal.fire({ icon: 'warning', title: 'Incomplete Selection', text: 'Please select an employee and a new manager.', target: changeManagerDialogRef.current });
//       return;
//     }
//     try {
//       await axiosInstance.put("api/change_manager/", { user_id: selectedEmployeeForManagerChange, manager_id: newManager });
//       await fetchEmployees();
//       Swal.fire('Success', 'Manager changed successfully!', 'success');
//       setOpenChangeManagerForm(false);
//       setSelectedEmployeeForManagerChange("");
//       setNewManager("");
//     } catch (error) {
//       console.error("Error changing manager:", error);
//       Swal.fire({ icon: 'error', title: 'Operation Failed', text: `Error changing manager: ${error.response?.data?.message || "An error occurred."}`, target: changeManagerDialogRef.current });
//     }
//   };

//   const handleRowHover = (id) => setHoveredRowId(id);
//   const handleRowLeave = () => setHoveredRowId(null);

//   const navigate = useNavigate();
//   const handleArrowClick = (id) => navigate(`/hrms/admindashboard/employeedetail/${id}`);

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setCurrentEmployee((prev) => ({ ...prev, [name]: value }));
//   };
 
//   const handleAddEmployee = async () => {
//     try {
//       const [maxIdResponse, headquartersResponse] = await Promise.all([
//         axios.get("https://tdtlworld.com/hrms-backend/api/get_max_employee_id/"),
//         axiosInstance.get('https://tdtlworld.com/hrms-backend/api/headquarters/')
//       ]);
//       const newEmpId = maxIdResponse.data.employee_id;
//       setHeadquarters(headquartersResponse.data || []);
//       setCurrentEmployee({
//         emp_id: newEmpId, firstName: "", middleName: "", lastName: "", email: "", phone: "",
//         avatar: null, officeShift: "", status: 1, join_date: "", gender: "", username: newEmpId, password: "",
//         role: "", grossSalary: "", department_id: "", designation_id: "", manager_id: "",
//         country_id: "", state_id: "", employee_hub_id: "", headquarter_id: "", division_id: "",
//         company_id: 2, is_probation: "n", resumeUrl: "", subDivision: "",
//       });
//       setDesignations([]); setStates([]); setEmployeeHubs([]); setEmployeeDocuments(null);
//       setIsEditMode(false); setShowPassword(false); setOpenEmployeeForm(true);
//     } catch (error) {
//       console.error("Error fetching max employee ID or headquarters:", error);
//       Swal.fire('Error', 'Failed to initialize employee form. Please try again.', 'error');
//     }
//   };

//   const handleTalentSelect = async (event, selectedOption) => {
//     setEmployeeDocuments(null);
//     setCurrentEmployee(prev => ({ ...prev, resumeUrl: "" }));

//     if (!selectedOption) {
//       setCurrentEmployee(prev => ({ ...prev, firstName: "", middleName: "", lastName: "", email: "", phone: "", gender: "", country_id: "", state_id: "" }));
//       return;
//     }
//     const talent = talentPool.find(p => p.email === selectedOption.email);
//     if (!talent) return;

//     const selectedCountry = countries.find(c => c.country_name === talent.country);
//     const resumeLink = talent.resume ? `${RESUME_BASE_URL}${talent.resume}` : "";

//     setCurrentEmployee(prev => ({
//       ...prev, firstName: talent.first_name || "", middleName: talent.middle_name || "",
//       lastName: talent.last_name || "", email: talent.email || "", phone: talent.phone || "",
//       gender: talent.gender || "", country_id: selectedCountry ? selectedCountry.country_id : "",
//       state_id: '', employee_hub_id: '', resumeUrl: resumeLink,
//     }));

//     if (selectedCountry) {
//       try {
//         const statesRes = await axiosInstance.get(`api/states/?country_name=${selectedCountry.country_name}`);
//         if (statesRes.data.status === "success") {
//           const fetchedStates = statesRes.data.data || [];
//           setStates(fetchedStates);
//           const selectedState = fetchedStates.find(s => s.state_name === talent.state);
//           if (selectedState) {
//             setCurrentEmployee(prev => ({ ...prev, state_id: selectedState.state_id }));
//             const hubsRes = await axiosInstance.get(`api/employee_hub_dropdown/${selectedState.state_id}/`);
//             if (hubsRes.data.status === "success") setEmployeeHubs(hubsRes.data.data || []);
//           }
//         }
//       } catch (err) { console.error("Error fetching dependent data for talent:", err); }
//     }

//     setIsFetchingDocs(true);
//     try {
//       const docResponse = await axios.post('https://raasbackend.vetrinahealthcare.com/fetch_documents/', { email_id: talent.email });
//       setEmployeeDocuments(docResponse.data.status === 'success' && docResponse.data.documents ? docResponse.data.documents : null);
//     } catch (error) {
//       console.error("Error fetching documents:", error);
//       Swal.fire({ icon: 'error', title: 'Document Fetch Failed', text: 'Failed to fetch documents for the selected talent.', target: employeeDialogRef.current });
//       setEmployeeDocuments(null);
//     } finally {
//       setIsFetchingDocs(false);
//     }
//   };

//  const handleEditEmployee = async (employee) => {
//   if (!employee || !employee.user_id) return;
//   try {
//     const response = await axiosInstance.get(`api/edit_employee/${employee.user_id}/`);
//     if (response.data.status !== "success" || response.data.data.length === 0) {
//       Swal.fire('Error', 'Failed to load employee details for editing.', 'error');
//       return;
//     }
//     const empData = response.data.data[0];

//     const [desigRes, statesRes, hubsRes, headquartersRes] = await Promise.all([
//       axiosInstance.get(`api/desig_dept_dropdown/?dept_id=${empData.department_id}/`),
//       axiosInstance.get(`api/states/?country_name=${empData.country_name}`),
//       axiosInstance.get(`api/employee_hub_dropdown/${empData.state}/`),
//       axiosInstance.get('https://tdtlworld.com/hrms-backend/api/headquarters/')
//     ]);

//     setDesignations(desigRes.data.desig_data || []);
//     setStates(statesRes.data.data || []);
//     setEmployeeHubs(hubsRes.data.data || []);
//     setHeadquarters(headquartersRes.data || []);

//     const officeShiftObj = officeShifts.find(s => s.office_shift_name === empData.office_shift);
//     const nameParts = (empData.emp_name || "").split(" ");
//     const selectedCountry = countries.find(c => c.country_name === empData.country_name);

//     setCurrentEmployee({
//       id: employee.user_id,
//       firstName: nameParts[0] || "", middleName: nameParts.length > 2 ? nameParts.slice(1, -1).join(" ") : "",
//       lastName: nameParts.length > 1 ? nameParts[nameParts.length - 1] : "", email: empData.email || "",
//       phone: empData.phone || "", manager_id: Number(empData.manager_id) || "",
//       designation_id: Number(empData.designation_id) || "", department_id: Number(empData.department_id) || "",
//       officeShift: officeShiftObj ? Number(officeShiftObj.office_shift_id) : "",
//       status: Number(empData.status), join_date: empData.join_date ? empData.join_date.split(" ")[0] : "",
//       country_id: selectedCountry ? Number(selectedCountry.country_id) : "", state_id: Number(empData.state) || "",
//       employee_hub_id: Number(empData.employee_hub_id) || "", headquarter_id: Number(empData.headquarter_id) || "",
//       division_id: Number(empData.division_id) || "", subDivision: empData.sub_division || "",
//       avatar: empData.profile_photo || "", role: Number(empData.role_id) || "",
//       is_probation: empData.probation?.toLowerCase() === 'y' ? 'y' : 'n', resumeUrl: "",
//     });

//     setIsEditMode(true); setOpenEmployeeForm(true); setShowPassword(false);
//   } catch (error) {
//     console.error("Error fetching employee details for edit:", error);
//     Swal.fire('Error', 'Failed to fetch complete employee details. Please try again.', 'error');
//   }
// };

//   const handleSaveEmployee = async () => {
//     if (!isEditMode) {
//       const requiredFields = {
//         firstName: 'First Name', lastName: 'Last Name', email: 'Email', phone: 'Phone', country_id: 'Country',
//         state_id: 'State', employee_hub_id: 'Employee Hub', headquarter_id: 'Headquarter', division_id: 'Division',
//         manager_id: 'Manager', department_id: 'Department', designation_id: 'Designation', officeShift: 'Office Shift',
//         join_date: 'Join Date', avatar: 'Photo', gender: 'Gender', username: 'Username', password: 'Password',
//         role: 'Role', grossSalary: 'Gross Salary'
//       };
//       const selectedDivision = divisions.find(d => d.division_id === currentEmployee.division_id);
//       if (selectedDivision && selectedDivision.division_name === 'Livestock' && !currentEmployee.subDivision) {
//           Swal.fire({ icon: 'error', title: 'Validation Error', text: 'Sub Division is required when Division is Livestock.', target: employeeDialogRef.current });
//           return;
//       }
//       for (const field in requiredFields) {
//         if (!currentEmployee[field]) {
//           Swal.fire({ icon: 'error', title: 'Validation Error', text: `The field "${requiredFields[field]}" is required.`, target: employeeDialogRef.current });
//           return;
//         }
//       }
//     }

//     const formData = new FormData();
//     const keyMap = { firstName: 'first_name', middleName: 'middle_name', lastName: 'last_name', officeShift: 'office_shift', join_date: 'join_date', grossSalary: 'gross_salary', headquarter_id: 'headquarter_id', };
//     Object.keys(currentEmployee).forEach(key => {
//       if (key === 'avatar' && currentEmployee.avatar instanceof File) {
//         formData.append("file", currentEmployee.avatar);
//       } else if (key !== 'resumeUrl' && currentEmployee[key] !== null && currentEmployee[key] !== undefined && currentEmployee[key] !== "") {
//         const backendKey = keyMap[key] || key;
//         formData.append(backendKey, currentEmployee[key]);
//       }
//     });

//     setIsSaving(true);
//     try {
//       const action = isEditMode ? 'updated' : 'added';
//       if (isEditMode) {
//         formData.append("user_id", currentEmployee.id);
//         await axiosInstance.put("api/edit_employee/", formData, { headers: { "Content-Type": "multipart/form-data" } });
//       } else {
//         await axiosInstance.post("api/add_employee/", formData, { headers: { "Content-Type": "multipart/form-data" } });
//       }
//       setOpenEmployeeForm(false);
//       await fetchEmployees();
//       Swal.fire('Success', `Employee ${action} successfully!`, 'success');

//     } catch (error) {
//       console.error("Error saving employee:", error);
//       const errorMessage = error.response?.data?.message || error.response?.data?.detail || "An unexpected error occurred.";
//       Swal.fire({ icon: 'error', title: `Operation failed`, text: `${errorMessage}`, target: employeeDialogRef.current });
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   const handleDeleteEmployee = (employeeId) => {
//     if (!employeeId) return;
//     Swal.fire({
//       title: 'Are you sure?', text: "You won't be able to revert this!", icon: 'warning',
//       showCancelButton: true, confirmButtonColor: '#3085d6', cancelButtonColor: '#d33',
//       confirmButtonText: 'Yes, delete it!'
//     }).then((result) => {
//       if (result.isConfirmed) {
//         axiosInstance.delete("api/edit_employee/", { data: { user_id: employeeId } })
//           .then(() => {
//             fetchEmployees();
//             Swal.fire('Deleted!', 'The employee has been deleted.', 'success');
//           })
//           .catch((error) => {
//             console.error("Error deleting employee: ", error);
//             const errorMessage = error.response?.data?.message || error.response?.data?.detail || "Failed to delete employee.";
//             Swal.fire('Error', errorMessage, 'error');
//           });
//       }
//     });
//   };

//   const handleExportEmployees = () => {
//     if (employees.length === 0) {
//       Swal.fire('Info', 'There is no employee data to export.', 'info');
//       return;
//     }
//     const worksheet = XLSX.utils.json_to_sheet(employees);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Employees");
//     XLSX.writeFile(workbook, "EmployeesData.xlsx");
//     Swal.fire('Success', 'Employee data has been exported successfully!', 'success');
//   };

//   const sortedEmployees = useMemo(() => {
//     if (!Array.isArray(employees)) return [];
//     return [...employees].sort((a, b) => b.user_id - a.user_id);
//   }, [employees]);

//   const filteredEmployees = sortedEmployees.filter(
//     (e) =>
//       (e.employee_name && e.employee_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
//       (e.department_name && e.department_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
//       (e.designation_name && e.designation_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
//       (e.join_date && e.join_date.toLowerCase().includes(searchTerm.toLowerCase())) ||
//       (e.manager && e.manager.toLowerCase().includes(searchTerm.toLowerCase()))
//   );

//   const indexOfLastEmployee = currentPage * rowsPerPage;
//   const indexOfFirstEmployee = indexOfLastEmployee - rowsPerPage;
//   const currentEmployees = filteredEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee);

//   const handleRowsPerPageChange = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setCurrentPage(1);
//   };

//   const handleFileUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) setCurrentEmployee((prev) => ({ ...prev, avatar: file }));
//   };
 
//   const isSubDivisionDisabled = useMemo(() => {
//     if (!currentEmployee.division_id) return true;
//     const selectedDivision = divisions.find(d => d.division_id === currentEmployee.division_id);
//     return !selectedDivision || selectedDivision.division_name !== 'Livestock';
//   }, [currentEmployee.division_id, divisions]);

//   return (
//     <>
//       <Box sx={{ mt: 2 }}>
//         <Box sx={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 2, mb: 3 }}>
//           <Typography sx={{ fontWeight: "bold", fontFamily: "Arial, sans-serif", fontSize: { xs: "1.75rem", sm: "1.75rem", md: "2rem", lg: "2.5rem" }}}>
//             Employees List
//           </Typography>
//           <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
//             <Button variant="contained" startIcon={<DownloadIcon />} onClick={handleExportEmployees} sx={purpleButtonSx}>Export</Button>
//             <Button variant="contained" startIcon={<ChangeManagerIcon />} onClick={() => setOpenChangeManagerForm(true)} sx={purpleButtonSx}>Change Manager</Button>
//             <Button variant="contained" startIcon={<AddIcon />} onClick={handleAddEmployee} sx={purpleButtonSx}>Add Employee</Button>
//           </Box>
//         </Box>

//         <Dialog open={openChangeManagerForm} onClose={() => setOpenChangeManagerForm(false)} maxWidth="sm" fullWidth ref={changeManagerDialogRef}>
//           <DialogTitle>Change Manager<IconButton onClick={() => setOpenChangeManagerForm(false)} sx={{ position: "absolute", right: 8, top: 8 }}><CloseIcon /></IconButton></DialogTitle>
//           <DialogContent><Grid container spacing={2} sx={{ mt: 1 }}><Grid item xs={12}><FormControl fullWidth><InputLabel>Select Employee</InputLabel><Select value={selectedEmployeeForManagerChange} onChange={(e) => setSelectedEmployeeForManagerChange(e.target.value)} label="Select Employee">{allEmployeesForDropdown.map((emp) => (<MenuItem key={emp.value} value={emp.value}>{emp.label}</MenuItem>))}</Select></FormControl></Grid><Grid item xs={12}><FormControl fullWidth><InputLabel>Select New Manager</InputLabel><Select value={newManager} onChange={(e) => setNewManager(e.target.value)} label="Select New Manager">{allEmployeesForDropdown.map((emp) => (<MenuItem key={emp.value} value={emp.value}>{emp.label}</MenuItem>))}</Select></FormControl></Grid></Grid></DialogContent>
//           <DialogActions>
//             <Button onClick={() => setOpenChangeManagerForm(false)} sx={cancelRedTextSx}>Cancel</Button>
//             <Button onClick={handleChangeManager} variant="contained" sx={purpleButtonSx}>Save</Button>
//           </DialogActions>
//         </Dialog>

//         <Dialog open={openEmployeeForm} onClose={() => setOpenEmployeeForm(false)} maxWidth="md" fullWidth ref={employeeDialogRef}>
//           <DialogTitle>{isEditMode ? "Edit Employee" : "Add Employee"}<IconButton onClick={() => setOpenEmployeeForm(false)} sx={{ position: "absolute", right: 8, top: 8 }}><CloseIcon /></IconButton></DialogTitle>
//           <DialogContent>
//             <Grid container spacing={2} sx={{ mt: 1 }}>
//               {!isEditMode && (<Grid item xs={12}><Autocomplete options={talentPool} getOptionLabel={(option) => option.email || ""} onChange={handleTalentSelect} onInputChange={(event, newInputValue) => { if (!talentPool.find(p => p.email === newInputValue)) { setCurrentEmployee(prev => ({ ...prev, email: newInputValue })); }}} renderInput={(params) => (<TextField {...params} label="Search Email to Auto-fill" />)} /></Grid>)}
//               <Grid item xs={12} sm={4}><TextField fullWidth label="First Name" name="firstName" value={currentEmployee.firstName || ""} onChange={handleInputChange} onKeyPress={(e) => { if (!/^[A-Za-z]$/.test(e.key)) e.preventDefault(); }} InputProps={{ readOnly: isEditMode }} /></Grid>
//               <Grid item xs={12} sm={4}><TextField fullWidth label="Middle Name" name="middleName" value={currentEmployee.middleName || ""} onChange={handleInputChange} onKeyPress={(e) => { if (!/^[A-Za-z]$/.test(e.key)) e.preventDefault(); }} InputProps={{ readOnly: isEditMode }} /></Grid>
//               <Grid item xs={12} sm={4}><TextField fullWidth label="Last Name" name="lastName" value={currentEmployee.lastName || ""} onChange={handleInputChange} onKeyPress={(e) => { if (!/^[A-Za-z]$/.test(e.key)) e.preventDefault(); }} InputProps={{ readOnly: isEditMode }} /></Grid>
//               <Grid item xs={12} sm={6}><TextField fullWidth label="Email" name="email" value={currentEmployee.email || ''} onChange={handleInputChange} InputProps={{ readOnly: isEditMode || !!talentPool.find(p => p.email === currentEmployee.email) }} /></Grid>
//               <Grid item xs={12} sm={6}><TextField fullWidth label="Phone" name="phone" value={currentEmployee.phone || ''} onChange={(e) => { const value = e.target.value; if (/^\d{0,10}$/.test(value)) handleInputChange(e); }} inputProps={{ maxLength: 10, inputMode: 'numeric', pattern: '[0-9]*' }} InputProps={{ readOnly: isEditMode }} /></Grid>
              
//               {/* --- All dropdowns are now Autocomplete --- */}
//               <Grid item xs={12} sm={6}><Autocomplete options={countries} getOptionLabel={(option) => option.country_name || ''} value={countries.find(c => c.country_id === currentEmployee.country_id) || null} onChange={(e, nv) => handleCountryChange(nv)} isOptionEqualToValue={(option, value) => option.country_id === value.country_id} renderInput={(params) => (<TextField {...params} label="Country" />)} /></Grid>
//               <Grid item xs={12} sm={6}><Autocomplete options={states} getOptionLabel={(option) => option.state_name || ''} value={states.find(s => s.state_id === currentEmployee.state_id) || null} onChange={(e, nv) => handleStateChange(nv)} isOptionEqualToValue={(option, value) => option.state_id === value.state_id} disabled={!currentEmployee.country_id} renderInput={(params) => (<TextField {...params} label="State" />)} /></Grid>
//               <Grid item xs={12} sm={6}><Autocomplete options={employeeHubs} getOptionLabel={(option) => option.employee_hub_name || ''} value={employeeHubs.find(h => h.employee_hub_id === currentEmployee.employee_hub_id) || null} onChange={(e, nv) => setCurrentEmployee(prev => ({ ...prev, employee_hub_id: nv ? nv.employee_hub_id : "" }))} isOptionEqualToValue={(option, value) => option.employee_hub_id === value.employee_hub_id} disabled={!currentEmployee.state_id} renderInput={(params) => (<TextField {...params} label="Employee Hub" />)} /></Grid>
//               <Grid item xs={12} sm={6}><Autocomplete options={headquarters} getOptionLabel={(option) => option.headquarter_name || ''} value={headquarters.find(h => h.headquarter_id === currentEmployee.headquarter_id) || null} onChange={(e, nv) => setCurrentEmployee(prev => ({ ...prev, headquarter_id: nv ? nv.headquarter_id : "" }))} isOptionEqualToValue={(option, value) => option.headquarter_id === value.headquarter_id} renderInput={(params) => (<TextField {...params} label="Headquarter" />)} /></Grid>
//               <Grid item xs={12} sm={6}><Autocomplete options={divisions} getOptionLabel={(option) => option.division_name || ''} value={divisions.find(d => d.division_id === currentEmployee.division_id) || null} onChange={(e, nv) => handleDivisionChange(nv)} isOptionEqualToValue={(option, value) => option.division_id === value.division_id} renderInput={(params) => (<TextField {...params} label="Division" />)} /></Grid>
//               <Grid item xs={12} sm={6}><Autocomplete options={subDivisionOptions} getOptionLabel={(option) => option.label || ''} value={subDivisionOptions.find(sd => sd.value === currentEmployee.subDivision) || null} onChange={(e, nv) => setCurrentEmployee(prev => ({ ...prev, subDivision: nv ? nv.value : "" }))} isOptionEqualToValue={(option, value) => option.value === value.value} disabled={isSubDivisionDisabled} renderInput={(params) => (<TextField {...params} label="Sub Division" />)} /></Grid>
//               <Grid item xs={12} sm={6}><Autocomplete options={allEmployeesForDropdown} getOptionLabel={(option) => option.label || ''} value={allEmployeesForDropdown.find(e => e.value === currentEmployee.manager_id) || null} onChange={(e, nv) => setCurrentEmployee(prev => ({ ...prev, manager_id: nv ? nv.value : "" }))} isOptionEqualToValue={(option, value) => option.value === value.value} renderInput={(params) => (<TextField {...params} label="Manager" />)} /></Grid>
//               <Grid item xs={12} sm={6}><Autocomplete options={departments} getOptionLabel={(option) => option.dept_name || ''} value={departments.find(d => d.dept_id === currentEmployee.department_id) || null} onChange={(e, nv) => handleDeptChange(nv)} isOptionEqualToValue={(option, value) => option.dept_id === value.dept_id} renderInput={(params) => (<TextField {...params} label="Department" />)} /></Grid>
//               <Grid item xs={12} sm={6}><Autocomplete options={designations} getOptionLabel={(option) => option.desig_name || ''} value={designations.find(d => d.desig_id === currentEmployee.designation_id) || null} onChange={(e, nv) => setCurrentEmployee(prev => ({ ...prev, designation_id: nv ? nv.desig_id : "" }))} isOptionEqualToValue={(option, value) => option.desig_id === value.desig_id} disabled={!currentEmployee.department_id} renderInput={(params) => (<TextField {...params} label="Designation" />)} /></Grid>
//               <Grid item xs={12} sm={6}><Autocomplete options={officeShifts} getOptionLabel={(option) => option.office_shift_name || ''} value={officeShifts.find(s => s.office_shift_id === currentEmployee.officeShift) || null} onChange={(e, nv) => setCurrentEmployee(prev => ({ ...prev, officeShift: nv ? nv.office_shift_id : "" }))} isOptionEqualToValue={(option, value) => option.office_shift_id === value.office_shift_id} renderInput={(params) => (<TextField {...params} label="Office Shift" />)} /></Grid>
//               <Grid item xs={12} sm={6}><Autocomplete options={statusOptions} getOptionLabel={(option) => option.label} value={statusOptions.find(s => s.value === currentEmployee.status) || null} onChange={(e, nv) => setCurrentEmployee(prev => ({ ...prev, status: nv ? nv.value : 1 }))} isOptionEqualToValue={(option, value) => option.value === value.value} renderInput={(params) => (<TextField {...params} label="Status" />)} /></Grid>
//               <Grid item xs={12} sm={6}><Autocomplete options={probationOptions} getOptionLabel={(option) => option.label} value={probationOptions.find(p => p.value === currentEmployee.is_probation) || null} onChange={(e, nv) => setCurrentEmployee(prev => ({ ...prev, is_probation: nv ? nv.value : "N" }))} isOptionEqualToValue={(option, value) => option.value === value.value} renderInput={(params) => (<TextField {...params} label="On Probation" />)} /></Grid>
              
//               <Grid item xs={12} sm={6}><TextField fullWidth label="Join Date" name="join_date" type="date" value={currentEmployee.join_date || ""} onChange={handleInputChange} InputLabelProps={{ shrink: true }} /></Grid>
//               <Grid item xs={12} sm={6}><Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}><Button variant="contained" component="label" disabled={isEditMode} sx={purpleButtonSx}>Upload Photo<input type="file" hidden accept="image/*" onChange={handleFileUpload} /></Button>{currentEmployee.avatar && <Avatar src={typeof currentEmployee.avatar === 'string' ? currentEmployee.avatar : URL.createObjectURL(currentEmployee.avatar)} sx={{ width: 56, height: 56 }} />}</Box></Grid>
//               <Grid item xs={12}>{isFetchingDocs && <CircularProgress />}{employeeDocuments && !isFetchingDocs && (<Box><Typography variant="subtitle1" gutterBottom>Fetched Documents</Typography><Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>{Object.entries(employeeDocuments).map(([name, url]) => (url ? (<Chip key={name} label={name.replace(/_/g, ' ')} component="a" href={url} target="_blank" clickable icon={<LinkIcon />} variant="outlined" color="secondary" size="small" />) : null))}</Box></Box>)}</Grid>
//               {!isEditMode && (<>
//                 <Grid item xs={12} sm={6}><Autocomplete options={genderOptions} getOptionLabel={(option) => option.label} value={genderOptions.find(g => g.value === currentEmployee.gender) || null} onChange={(e, nv) => setCurrentEmployee(prev => ({ ...prev, gender: nv ? nv.value : "" }))} isOptionEqualToValue={(option, value) => option.value === value.value} renderInput={(params) => (<TextField {...params} label="Gender" />)} /></Grid>
//                 <Grid item xs={12} sm={6}><TextField fullWidth label="Username" name="username" value={currentEmployee.username || ""} onChange={handleInputChange} InputProps={{ readOnly: true }} /></Grid>
//                 <Grid item xs={12} sm={6}><TextField fullWidth label="Password" name="password" value={currentEmployee.password || ""} onChange={handleInputChange} type={showPassword ? 'text' : 'password'} InputProps={{ endAdornment: (<InputAdornment position="end"> <IconButton aria-label="toggle password visibility" onClick={() => setShowPassword((prev) => !prev)} onMouseDown={(e) => e.preventDefault()} edge="end"> {showPassword ? <VisibilityOff /> : <Visibility />} </IconButton> </InputAdornment>) }} /></Grid>
//                 <Grid item xs={12} sm={6}><Autocomplete options={roles} getOptionLabel={(option) => option.role_name || ''} value={roles.find(r => r.index === currentEmployee.role) || null} onChange={(e, nv) => setCurrentEmployee(prev => ({ ...prev, role: nv ? nv.index : "" }))} isOptionEqualToValue={(option, value) => option.index === value.index} renderInput={(params) => (<TextField {...params} label="Role" />)} /></Grid>
//                 <Grid item xs={12} sm={6}><TextField fullWidth label="Gross Salary" name="grossSalary" type="number" value={currentEmployee.grossSalary || ""} onChange={(e) => { const value = e.target.value; if (/^\d*\.?\d*$/.test(value)) handleInputChange(e); }} /></Grid>
//               </>)}
//             </Grid>
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={() => setOpenEmployeeForm(false)} disabled={isSaving} sx={cancelRedTextSx}>Cancel</Button>
//             <Button onClick={handleSaveEmployee} variant="contained" disabled={isSaving} sx={purpleButtonSx}>{isSaving ? <CircularProgress size={24} color="inherit" /> : "Save"}</Button>
//           </DialogActions>
//         </Dialog>

//         <Paper sx={{ width: "100%", mb: 2 }}>
//           <Box sx={{ p: 2, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: 'wrap', gap: 2 }}>
//             <TextField label="Search" placeholder="Search by any value..." variant="outlined" size="small" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} sx={{ width: { xs: '100%', sm: 'auto' }, order: { xs: 1, sm: 2 }}} />
//             <FormControl sx={{ minWidth: 90, order: { xs: 2, sm: 1 }}} size="small">
//               <InputLabel>Rows</InputLabel>
//               <Select value={rowsPerPage} label="Rows" onChange={handleRowsPerPageChange}><MenuItem value={5}>5</MenuItem><MenuItem value={10}>10</MenuItem><MenuItem value={25}>25</MenuItem><MenuItem value={50}>50</MenuItem></Select>
//             </FormControl>
//           </Box>
//           <TableContainer>
//             <Table size="small" sx={{ minWidth: "100%", whiteSpace: "nowrap", "& .MuiTableCell-root": { padding: "4px 8px", fontSize: '0.8rem' }}}>
//               <TableHead><TableRow sx={{ bgcolor: '#f5f5f5' }}><TableCell sx={{ fontWeight: 'bold', width: '5%', fontSize: '0.9rem' }}>SR. NO.</TableCell><TableCell sx={{ fontWeight: 'bold', width: '25%', fontSize: '0.9rem' }}>EMPLOYEE</TableCell><TableCell sx={{ width: '5%' }}></TableCell><TableCell sx={{ fontWeight: 'bold', width: '15%', fontSize: '0.9rem' }}>DEPARTMENT</TableCell><TableCell sx={{ fontWeight: 'bold', width: '15%', fontSize: '0.9rem' }}>DESIGNATION</TableCell><TableCell sx={{ fontWeight: 'bold', width: '10%', fontSize: '0.9rem' }}>JOIN DATE</TableCell><TableCell sx={{ fontWeight: 'bold', width: '10%', fontSize: '0.9rem' }}>STATUS</TableCell><TableCell sx={{ fontWeight: 'bold', width: '15%', fontSize: '0.9rem' }}>MANAGER</TableCell><TableCell sx={{ fontWeight: 'bold', width: '10%', fontSize: '0.9rem', textAlign: 'center' }}>ACTIONS</TableCell></TableRow></TableHead>
//               <TableBody>
//                 {currentEmployees.map((employee, index) => (
//                   <TableRow key={employee.user_id} onMouseEnter={() => handleRowHover(employee.user_id)} onMouseLeave={handleRowLeave} sx={{ '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' } }}>
//                     <TableCell>{indexOfFirstEmployee + index + 1}</TableCell>
//                     <TableCell><Box sx={{ display: "flex", alignItems: "center", gap: 2 }}><Typography variant="body2">{employee.employee_name}</Typography></Box></TableCell>
//                     <TableCell sx={{ padding: '0 8px', textAlign: 'center' }}>{hoveredRowId === employee.user_id && (<IconButton onClick={() => handleArrowClick(employee.user_id)} size="small" sx={{ color: '#E55D87', transition: 'all 0.2s ease-in-out', '&:hover': { backgroundColor: 'rgba(229, 93, 135, 0.1)', transform: 'scale(1.1)' }, '&:active': { color: '#c2185b', boxShadow: '0 0 10px 2px rgba(194, 24, 91, 0.5)' }}}><ArrowForwardIcon fontSize="small" /></IconButton>)}</TableCell>
//                     <TableCell>{employee.department_name || 'N/A'}</TableCell>
//                     <TableCell>{employee.designation_name || 'N/A'}</TableCell>
//                     <TableCell>{employee.join_date}</TableCell>
//                     <TableCell><Chip label={employee.status === 1 ? "Active" : "Inactive"} color={employee.status === 1 ? "success" : "error"} size="small" /></TableCell>
//                     <TableCell>{employee.manager}</TableCell>
//                     <TableCell sx={{ textAlign: 'center' }}><Tooltip title="Edit"><IconButton onClick={() => handleEditEmployee(employee)} color="primary"><EditIcon /></IconButton></Tooltip><Tooltip title="Delete"><IconButton onClick={() => handleDeleteEmployee(employee.user_id)} color="error"><DeleteIcon /></IconButton></Tooltip></TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         </Paper>
//       </Box>
//       <Box sx={{ display: "flex", justifyContent: { xs: 'center', md: 'space-between' }, alignItems: "center", flexWrap: 'wrap', gap: 2, mt: 2 }}>
//         <Typography variant="body2">Showing <Box component="span" sx={{ fontWeight: "bold" }}>{filteredEmployees.length > 0 ? indexOfFirstEmployee + 1 : 0}</Box> - <Box component="span" sx={{ fontWeight: "bold" }}>{Math.min(indexOfLastEmployee, filteredEmployees.length)}</Box> of <Box component="span" sx={{ fontWeight: "bold" }}>{filteredEmployees.length}</Box> Employees</Typography>
//         <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}><Button variant="contained" disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)} sx={purpleButtonSx}>Previous</Button><Typography sx={{ mx: 1 }}>Page {currentPage}</Typography><Button variant="contained" disabled={indexOfLastEmployee >= filteredEmployees.length} onClick={() => setCurrentPage(currentPage + 1)} sx={purpleButtonSx}>Next</Button></Box>
//       </Box>
//     </>
//   );
// }















// import React, { useState, useEffect, useMemo, useCallback, useRef } from "react";
// import axios from 'axios';
// import {
//   Box,
//   Typography,
//   Button,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TextField,
//   FormControl,
//   Avatar,
//   Chip,
//   IconButton,
//   Tooltip,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Grid,
//   CircularProgress,
//   Autocomplete,
//   InputAdornment,
//   useTheme,
//   useMediaQuery,
//   Skeleton,
//   TablePagination,
// } from "@mui/material";
// import {
//   Edit as EditIcon,
//   Delete as DeleteIcon,
//   Add as AddIcon,
//   Close as CloseIcon,
//   Download as DownloadIcon,
//   ArrowForward as ArrowForwardIcon,
//   SupervisorAccount as ChangeManagerIcon,
//   Link as LinkIcon,
//   Visibility,
//   VisibilityOff,
//   Search as SearchIcon,
// } from "@mui/icons-material";
// import * as XLSX from "xlsx";
// import { useNavigate } from "react-router-dom";
// import axiosInstance from "../../utils/axiosInstance";
// import Swal from 'sweetalert2';

// const RESUME_BASE_URL = "https://raasbackend.vetrinahealthcare.com/";

// // --- Helper arrays for static Autocomplete options ---
// const statusOptions = [{ value: 1, label: 'Active' }, { value: 0, label: 'Inactive' }];
// const probationOptions = [{ value: 'Y', label: 'Yes' }, { value: 'N', label: 'No' }];
// const genderOptions = [{ value: 'Male', label: 'Male' }, { value: 'Female', label: 'Female' }, { value: 'Other', label: 'Other' }];
// const subDivisionOptions = [{ value: 'VetBiz', label: 'VetBiz' }, { value: 'TredBiz', label: 'TredBiz' }, { value: ' ', label: 'TredBiz Mix' }];


// export default function EmployeesView() {
//   const employeeDialogRef = useRef(null);
//   const changeManagerDialogRef = useRef(null);

//   // --- State Management ---
//   const [employees, setEmployees] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);

//   const [departments, setDepartments] = useState([]);
//   const [designations, setDesignations] = useState([]);
//   const [openChangeManagerForm, setOpenChangeManagerForm] = useState(false);
//   const [newManager, setNewManager] = useState("");
//   const [selectedEmployeeForManagerChange, setSelectedEmployeeForManagerChange] = useState("");
//   const [hoveredRowId, setHoveredRowId] = useState(null);
//   const [officeShifts, setOfficeShifts] = useState([]);
//   const [isEditMode, setIsEditMode] = useState(false);
//   const [roles, setRoles] = useState([]);
//   const [countries, setCountries] = useState([]);
//   const [states, setStates] = useState([]);
//   const [employeeHubs, setEmployeeHubs] = useState([]);
//   const [headquarters, setHeadquarters] = useState([]);
//   const [divisions, setDivisions] = useState([]);
//   const [allEmployeesForDropdown, setAllEmployeesForDropdown] = useState([]);
 
//   const [talentPool, setTalentPool] = useState([]);
//   const [isFetchingDocs, setIsFetchingDocs] = useState(false);
//   const [employeeDocuments, setEmployeeDocuments] = useState(null);
//   const [showPassword, setShowPassword] = useState(false);
//   const [isSaving, setIsSaving] = useState(false);
//   const [openEmployeeForm, setOpenEmployeeForm] = useState(false);

//   const [currentEmployee, setCurrentEmployee] = useState({
//     id: null, firstName: "", middleName: "", lastName: "", email: "", join_date: "",
//     status: 1, phone: "", avatar: null, country_id: "", state_id: "",
//     employee_hub_id: "", headquarter_id: "", division_id: "", subDivision: "",
//     role: "", is_probation: "n", resumeUrl: "", password: "", gender: "",
//     username: "", grossSalary: "", department_id: "", designation_id: "",
//     manager_id: "", officeShift: "",
//   });

//   // --- Theme and Responsive Design ---
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

//   const primaryColor = '#8C257C';
//   const primaryDarkColor = '#6d1d60';
//   const secondaryColor = '#F58E35';
//   const secondaryDarkColor = '#d97d2e';

//   const buttonSx = {
//     backgroundColor: primaryColor,
//     color: '#FFFFFF',
//     '&:hover': { backgroundColor: primaryDarkColor },
//   };
  
//   const secondaryButtonSx = {
//     backgroundColor: secondaryColor,
//     color: '#FFFFFF',
//     '&:hover': { backgroundColor: secondaryDarkColor },
//   };

//   const cancelSx = {
//     color: '#757575',
//     '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' },
//   };


//    const formatDate = (dateString) => {
//     if (!dateString) return 'N/A'; // Handle cases where date is not available
//     try {
//       const date = new Date(dateString);
//       const day = String(date.getDate()).padStart(2, '0');
//       const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
//       const year = date.getFullYear();
//       return `${day}/${month}/${year}`;
//     } catch (error) {
//       console.error("Failed to format date:", dateString);
//       return dateString; // Return original string if formatting fails
//     }
//   };

//   // --- Data Fetching ---
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [
//           depts, empDropdown, shifts, countriesRes, hubs, divs, rolesRes, talent,headquartersRes
//         ] = await Promise.all([
//           axiosInstance.get('api/desig_dept_dropdown/'),
//           axiosInstance.get('employee-dropdown/'),
//           axiosInstance.get('api/office_shift_dropdown/'),
//           axiosInstance.get('api/countries/'),
//           axiosInstance.get('api/employee_hub/'),
//           axiosInstance.get('api/division/'),
//           axiosInstance.get('api/role_list/'),
//           axiosInstance.get('api/search_by_email_vet_talent/'),
//           axiosInstance.get('https://tdtlworld.com/hrms-backend/api/headquarters/')
//         ]);
//         setDepartments(depts.data.dept_data || []);
//         setAllEmployeesForDropdown(empDropdown.data || []);
//         setOfficeShifts(shifts.data.office_shift_data || []);
//         if (countriesRes.data.status === 'success') setCountries(countriesRes.data.data || []);
//         setDivisions(divs.data || []);
//         if (rolesRes.data?.status === "success") setRoles(rolesRes.data.data);
//         setHeadquarters(headquartersRes.data || []);
//         setTalentPool(talent.data.data || []);
//       } catch (error) {
//         console.error("Error fetching initial data:", error);
//         Swal.fire({ icon: 'error', title: 'Error', text: 'Failed to fetch initial data.', timer: 3000, showConfirmButton: false });
//       }
//     };
//     fetchData();
//   }, []);

//   const fetchEmployees = useCallback(() => {
//     setLoading(true);
//     axiosInstance.get('api/employee_details/')
//       .then((response) => setEmployees(Array.isArray(response.data.data) ? response.data.data : []))
//       .catch((error) => {
//         console.error('Error fetching employees:', error);
//         setEmployees([]);
//         Swal.fire({ icon: 'error', title: 'Error', text: 'Failed to fetch employee list.', timer: 3000, showConfirmButton: false });
//       })
//       .finally(() => setLoading(false));
//   }, []);

//   useEffect(() => { fetchEmployees(); }, [fetchEmployees]);

//   // --- Handlers ---
//   const handleCountryChange = (selectedCountry) => {
//     const countryId = selectedCountry ? selectedCountry.country_id : "";
//     const countryName = selectedCountry ? selectedCountry.country_name : null;
//     setCurrentEmployee(prev => ({ ...prev, country_id: countryId, state_id: "", employee_hub_id: "" }));
//     setStates([]);
//     setEmployeeHubs([]);
//     if (countryName) {
//       axiosInstance.get(`api/states/?country_name=${countryName}`)
//         .then(res => { if (res.data.status === "success") setStates(res.data.data || []); })
//         .catch(err => {
//           console.error("Error fetching states:", err);
//           Swal.fire({ icon: 'error', title: 'Error', text: 'Failed to fetch states for the selected country.', timer: 3000, showConfirmButton: false });
//         });
//     }
//   };

//   const handleStateChange = (selectedState) => {
//     const stateId = selectedState ? selectedState.state_id : "";
//     setCurrentEmployee(prev => ({ ...prev, state_id: stateId, employee_hub_id: "" }));
//     setEmployeeHubs([]);
//     if (stateId) {
//       axiosInstance.get(`api/employee_hub_dropdown/${stateId}/`)
//         .then(res => { if (res.data.status === "success") setEmployeeHubs(res.data.data || []); })
//         .catch(err => {
//           console.error("Error fetching holiday hubs:", err);
//           Swal.fire({ icon: 'error', title: 'Error', text: 'Failed to fetch Holiday hubs.', timer: 3000, showConfirmButton: false });
//         });
//     }
//   };

//   const handleDeptChange = (selectedDept) => {
//     const deptId = selectedDept ? selectedDept.dept_id : "";
//     setCurrentEmployee((prev) => ({ ...prev, department_id: deptId, designation_id: "" }));
//     if (deptId) {
//       axiosInstance.get(`api/desig_dept_dropdown/?dept_id=${deptId}/`)
//         .then((res) => setDesignations(res.data.desig_data || []))
//         .catch((err) => {
//           console.error("Error fetching designations:", err);
//           Swal.fire({ icon: 'error', title: 'Error', text: 'Failed to load designations.', target: employeeDialogRef.current });
//         });
//     } else {
//       setDesignations([]);
//     }
//   };

//   const handleDivisionChange = (selectedDivision) => {
//     const divisionId = selectedDivision ? selectedDivision.division_id : "";
//     setCurrentEmployee(prev => ({
//         ...prev,
//         division_id: divisionId,
//         subDivision: selectedDivision?.division_name !== 'Livestock' ? "" : prev.subDivision
//     }));
//   };

//   const handleChangeManager = async () => {
//     if (!selectedEmployeeForManagerChange || !newManager) {
//       Swal.fire({ icon: 'warning', title: 'Incomplete Selection', text: 'Please select an employee and a new manager.', target: changeManagerDialogRef.current });
//       return;
//     }
//     try {
//       await axiosInstance.put("api/change_manager/", { user_id: selectedEmployeeForManagerChange, manager_id: newManager });
//       await fetchEmployees();
//       Swal.fire({ icon: 'success', title: 'Success', text: 'Manager changed successfully!', timer: 3000, showConfirmButton: false });
//       setOpenChangeManagerForm(false);
//       setSelectedEmployeeForManagerChange("");
//       setNewManager("");
//     } catch (error) {
//       console.error("Error changing manager:", error);
//       Swal.fire({ icon: 'error', title: 'Operation Failed', text: `Error changing manager: ${error.response?.data?.message || "An error occurred."}`, target: changeManagerDialogRef.current });
//     }
//   };

//   const navigate = useNavigate();
//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setCurrentEmployee((prev) => ({ ...prev, [name]: value }));
//   };
 
//   const handleAddEmployee = async () => {
//     try {
//       const [maxIdResponse, headquartersResponse] = await Promise.all([
//         axios.get("https://tdtlworld.com/hrms-backend/api/get_max_employee_id/"),
//         axiosInstance.get('https://tdtlworld.com/hrms-backend/api/headquarters/')
//       ]);
//       const newEmpId = maxIdResponse.data.employee_id;
//       setHeadquarters(headquartersResponse.data || []);
//       setCurrentEmployee({
//         emp_id: newEmpId, firstName: "", middleName: "", lastName: "", email: "", phone: "",
//         avatar: null, officeShift: "", status: 1, join_date: "", gender: "", username: newEmpId, password: "",
//         role: "", grossSalary: "", department_id: "", designation_id: "", manager_id: "",
//         country_id: "", state_id: "", employee_hub_id: "", headquarter_id: "", division_id: "",
//         company_id: 2, is_probation: "n", resumeUrl: "", subDivision: "",
//       });
//       setDesignations([]); setStates([]); setEmployeeHubs([]); setEmployeeDocuments(null);
//       setIsEditMode(false); setShowPassword(false); setOpenEmployeeForm(true);
//     } catch (error) {
//       console.error("Error fetching max employee ID or headquarters:", error);
//       Swal.fire({ icon: 'error', title: 'Error', text: 'Failed to initialize employee form.', timer: 3000, showConfirmButton: false });
//     }
//   };

//   const handleTalentSelect = async (event, selectedOption) => {
//     setEmployeeDocuments(null);
//     setCurrentEmployee(prev => ({ ...prev, resumeUrl: "" }));
//     if (!selectedOption) {
//       setCurrentEmployee(prev => ({ ...prev, firstName: "", middleName: "", lastName: "", email: "", phone: "", gender: "", country_id: "", state_id: "" }));
//       return;
//     }
//     const talent = talentPool.find(p => p.email === selectedOption.email);
//     if (!talent) return;

//     const selectedCountry = countries.find(c => c.country_name === talent.country);
//     const resumeLink = talent.resume ? `${RESUME_BASE_URL}${talent.resume}` : "";
//     setCurrentEmployee(prev => ({
//       ...prev, firstName: talent.first_name || "", middleName: talent.middle_name || "",
//       lastName: talent.last_name || "", email: talent.email || "", phone: talent.phone || "",
//       gender: talent.gender || "", country_id: selectedCountry ? selectedCountry.country_id : "",
//       state_id: '', employee_hub_id: '', resumeUrl: resumeLink,
//     }));
//     if (selectedCountry) {
//       try {
//         const statesRes = await axiosInstance.get(`api/states/?country_name=${selectedCountry.country_name}`);
//         if (statesRes.data.status === "success") {
//           const fetchedStates = statesRes.data.data || [];
//           setStates(fetchedStates);
//           const selectedState = fetchedStates.find(s => s.state_name === talent.state);
//           if (selectedState) {
//             setCurrentEmployee(prev => ({ ...prev, state_id: selectedState.state_id }));
//             const hubsRes = await axiosInstance.get(`api/employee_hub_dropdown/${selectedState.state_id}/`);
//             if (hubsRes.data.status === "success") setEmployeeHubs(hubsRes.data.data || []);
//           }
//         }
//       } catch (err) { console.error("Error fetching dependent data for talent:", err); }
//     }
//     setIsFetchingDocs(true);
//     try {
//       const docResponse = await axios.post('https://raasbackend.vetrinahealthcare.com/fetch_documents/', { email_id: talent.email });
//       setEmployeeDocuments(docResponse.data.status === 'success' && docResponse.data.documents ? docResponse.data.documents : null);
//     } catch (error) {
//       console.error("Error fetching documents:", error);
//       Swal.fire({ icon: 'error', title: 'Document Fetch Failed', text: 'Failed to fetch documents for the selected talent.', target: employeeDialogRef.current });
//       setEmployeeDocuments(null);
//     } finally {
//       setIsFetchingDocs(false);
//     }
//   };

//   const handleEditEmployee = async (employee) => {
//     if (!employee || !employee.user_id) return;
//     try {
//       const response = await axiosInstance.get(`api/edit_employee/${employee.user_id}/`);
//       if (response.data.status !== "success" || response.data.data.length === 0) {
//         Swal.fire({ icon: 'error', title: 'Error', text: 'Failed to load employee details.', timer: 3000, showConfirmButton: false });
//         return;
//       }
//       const empData = response.data.data[0];
//       const [desigRes, statesRes, hubsRes, headquartersRes] = await Promise.all([
//         axiosInstance.get(`api/desig_dept_dropdown/?dept_id=${empData.department_id}/`),
//         axiosInstance.get(`api/states/?country_name=${empData.country_name}`),
//         axiosInstance.get(`api/employee_hub_dropdown/${empData.state}/`),
//         axiosInstance.get('https://tdtlworld.com/hrms-backend/api/headquarters/')
//       ]);
//       setDesignations(desigRes.data.desig_data || []);
//       setStates(statesRes.data.data || []);
//       setEmployeeHubs(hubsRes.data.data || []);
//       setHeadquarters(headquartersRes.data || []);
//       const officeShiftObj = officeShifts.find(s => s.office_shift_name === empData.office_shift);
//       const nameParts = (empData.emp_name || "").split(" ");
//       const selectedCountry = countries.find(c => c.country_name === empData.country_name);
//       setCurrentEmployee({
//         id: employee.user_id,
//         firstName: nameParts[0] || "", middleName: nameParts.length > 2 ? nameParts.slice(1, -1).join(" ") : "",
//         lastName: nameParts.length > 1 ? nameParts[nameParts.length - 1] : "", email: empData.email || "",
//         phone: empData.phone || "", manager_id: Number(empData.manager_id) || "",
//         designation_id: Number(empData.designation_id) || "", department_id: Number(empData.department_id) || "",
//         officeShift: officeShiftObj ? Number(officeShiftObj.office_shift_id) : "",
//         status: Number(empData.status), join_date: empData.join_date ? empData.join_date.split(" ")[0] : "",
//         country_id: selectedCountry ? Number(selectedCountry.country_id) : "", state_id: Number(empData.state) || "",
//         employee_hub_id: Number(empData.employee_hub_id) || "", headquarter_id: Number(empData.headquarter_id) || "",
//         division_id: Number(empData.division_id) || "", subDivision: empData.sub_division || "",
//         avatar: empData.profile_photo || "", role: Number(empData.role_id) || "",
//         is_probation: empData.probation?.toLowerCase() === 'y' ? 'y' : 'n', resumeUrl: "",
//       });
//       setIsEditMode(true); setOpenEmployeeForm(true); setShowPassword(false);
//     } catch (error) {
//       console.error("Error fetching employee details for edit:", error);
//       Swal.fire({ icon: 'error', title: 'Error', text: 'Failed to fetch employee details.', timer: 3000, showConfirmButton: false });
//     }
//   };

//   const handleSaveEmployee = async () => {
//     if (!isEditMode) {
//       const requiredFields = { firstName: 'First Name', lastName: 'Last Name', email: 'Email', phone: 'Phone', country_id: 'Country', state_id: 'State', employee_hub_id: 'holiday Hub', headquarter_id: 'Headquarter', division_id: 'Division', manager_id: 'Manager', department_id: 'Department', designation_id: 'Designation', officeShift: 'Office Shift', join_date: 'Join Date', avatar: 'Photo', gender: 'Gender', username: 'Username', password: 'Password', role: 'Role', grossSalary: 'Gross Salary' };
//       const selectedDivision = divisions.find(d => d.division_id === currentEmployee.division_id);
//       if (selectedDivision && selectedDivision.division_name === 'Livestock' && !currentEmployee.subDivision) {
//           Swal.fire({ icon: 'error', title: 'Validation Error', text: 'Sub Division is required when Division is Livestock.', target: employeeDialogRef.current });
//           return;
//       }
//       for (const field in requiredFields) {
//         if (!currentEmployee[field]) {
//           Swal.fire({ icon: 'error', title: 'Validation Error', text: `The field "${requiredFields[field]}" is required.`, target: employeeDialogRef.current });
//           return;
//         }
//       }
//     }
//     const formData = new FormData();
//     const keyMap = { firstName: 'first_name', middleName: 'middle_name', lastName: 'last_name', officeShift: 'office_shift', join_date: 'join_date', grossSalary: 'gross_salary', headquarter_id: 'headquarter_id', };
//     Object.keys(currentEmployee).forEach(key => {
//       if (key === 'avatar' && currentEmployee.avatar instanceof File) {
//         formData.append("file", currentEmployee.avatar);
//       } else if (key !== 'resumeUrl' && currentEmployee[key] !== null && currentEmployee[key] !== undefined && currentEmployee[key] !== "") {
//         const backendKey = keyMap[key] || key;
//         formData.append(backendKey, currentEmployee[key]);
//       }
//     });
//     setIsSaving(true);
//     try {
//       const action = isEditMode ? 'updated' : 'added';
//       if (isEditMode) {
//         formData.append("user_id", currentEmployee.id);
//         await axiosInstance.put("api/edit_employee/", formData, { headers: { "Content-Type": "multipart/form-data" } });
//       } else {
//         await axiosInstance.post("api/add_employee/", formData, { headers: { "Content-Type": "multipart/form-data" } });
//       }
//       setOpenEmployeeForm(false);
//       await fetchEmployees();
//       Swal.fire({ icon: 'success', title: 'Success', text: `Employee ${action} successfully!`, timer: 3000, showConfirmButton: false });
//     } catch (error) {
//       console.error("Error saving employee:", error);
//       const errorMessage = error.response?.data?.message || error.response?.data?.detail || "An unexpected error occurred.";
//       Swal.fire({ icon: 'error', title: `Operation failed`, text: `${errorMessage}`, target: employeeDialogRef.current });
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   const handleDeleteEmployee = (employeeId) => {
//     if (!employeeId) return;
//     Swal.fire({
//       title: 'Are you sure?', text: "You won't be able to revert this!", icon: 'warning',
//       showCancelButton: true, confirmButtonColor: '#3085d6', cancelButtonColor: '#d33',
//       confirmButtonText: 'Yes, delete it!'
//     }).then((result) => {
//       if (result.isConfirmed) {
//         axiosInstance.delete("api/edit_employee/", { data: { user_id: employeeId } })
//           .then(() => {
//             fetchEmployees();
//             Swal.fire({ icon: 'success', title: 'Deleted!', text: 'The employee has been deleted.', timer: 3000, showConfirmButton: false });
//           })
//           .catch((error) => {
//             const errorMessage = error.response?.data?.message || error.response?.data?.detail || "Failed to delete employee.";
//             Swal.fire({ icon: 'error', title: 'Error', text: errorMessage, timer: 3000, showConfirmButton: false });
//           });
//       }
//     });
//   };

//   const handleExportEmployees = () => {
//     if (employees.length === 0) {
//       Swal.fire({ icon: 'info', title: 'Info', text: 'There is no employee data to export.', timer: 3000, showConfirmButton: false });
//       return;
//     }
//     const worksheet = XLSX.utils.json_to_sheet(employees);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Employees");
//     XLSX.writeFile(workbook, "EmployeesData.xlsx");
//     Swal.fire({ icon: 'success', title: 'Success', text: 'Employee data has been exported successfully!', timer: 3000, showConfirmButton: false });
//   };

//   const handleChangePage = (event, newPage) => setPage(newPage);
//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };
//   const handleFileUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) setCurrentEmployee((prev) => ({ ...prev, avatar: file }));
//   };

//   // --- Memos and Derived State ---
//   const sortedEmployees = useMemo(() => {
//     if (!Array.isArray(employees)) return [];
//     return [...employees].sort((a, b) => b.user_id - a.user_id);
//   }, [employees]);

//   const filteredEmployees = useMemo(() => sortedEmployees.filter(
//     (e) =>
//       (e.employee_name && e.employee_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
//       (e.department_name && e.department_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
//       (e.designation_name && e.designation_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
//       (e.join_date && e.join_date.toLowerCase().includes(searchTerm.toLowerCase())) ||
//       (e.manager && e.manager.toLowerCase().includes(searchTerm.toLowerCase()))
//   ), [sortedEmployees, searchTerm]);

//   const currentEmployees = useMemo(() => filteredEmployees.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage), [filteredEmployees, page, rowsPerPage]);

//   const isSubDivisionDisabled = useMemo(() => {
//     if (!currentEmployee.division_id) return true;
//     const selectedDivision = divisions.find(d => d.division_id === currentEmployee.division_id);
//     return !selectedDivision || selectedDivision.division_name !== 'Livestock';
//   }, [currentEmployee.division_id, divisions]);

//   return (
//     <Box component={Paper} p={3}>
//         <Typography variant="h5" sx={{ color: primaryColor, fontWeight: "bold", mb: 2 }}>
//           Employees List
//         </Typography>

//         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2, mb: 2 }}>
//             <Box sx={{ display: 'flex', gap: 1, flexDirection: isMobile ? 'column' : 'row', width: isMobile ? '100%' : 'auto' }}>
//                 <Button variant="contained" startIcon={<AddIcon />} onClick={handleAddEmployee} sx={buttonSx}>Add Employee</Button>
//                 <Button variant="contained" startIcon={<ChangeManagerIcon />} onClick={() => setOpenChangeManagerForm(true)} sx={secondaryButtonSx}>Change Manager</Button>
//                 <Button variant="contained" startIcon={<DownloadIcon />} onClick={handleExportEmployees} sx={secondaryButtonSx}>Export</Button>
//             </Box>
//             <TextField
//               size="small"
//               placeholder="Search..."
//               variant="outlined"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               sx={{ width: isMobile ? '100%' : 'auto' }}
//               InputProps={{
//                 startAdornment: (<InputAdornment position="start"><SearchIcon /></InputAdornment>),
//               }}
//             />
//         </Box>

//         <Dialog open={openChangeManagerForm} onClose={() => setOpenChangeManagerForm(false)} maxWidth="sm" fullWidth ref={changeManagerDialogRef}>
//             <DialogTitle sx={{ color: primaryColor, fontWeight: 'bold' }}>Change Manager<IconButton onClick={() => setOpenChangeManagerForm(false)} sx={{ position: "absolute", right: 8, top: 8 }}><CloseIcon /></IconButton></DialogTitle>
//             <DialogContent><Grid container spacing={2} sx={{ mt: 1 }}><Grid item xs={12}><Autocomplete options={allEmployeesForDropdown} getOptionLabel={(option) => option.label || ''} onChange={(e, nv) => setSelectedEmployeeForManagerChange(nv ? nv.value : "")} renderInput={(params) => <TextField {...params} label="Select Employee" />} /></Grid><Grid item xs={12}><Autocomplete options={allEmployeesForDropdown} getOptionLabel={(option) => option.label || ''} onChange={(e, nv) => setNewManager(nv ? nv.value : "")} renderInput={(params) => <TextField {...params} label="Select New Manager" />} /></Grid></Grid></DialogContent>
//             <DialogActions>
//                 <Button onClick={() => setOpenChangeManagerForm(false)} sx={cancelSx}>Cancel</Button>
//                 <Button onClick={handleChangeManager} variant="contained" sx={buttonSx}>Save</Button>
//             </DialogActions>
//         </Dialog>

//         <Dialog open={openEmployeeForm} onClose={() => setOpenEmployeeForm(false)} maxWidth="md" fullWidth ref={employeeDialogRef}>
//             <DialogTitle sx={{ color: primaryColor, fontWeight: 'bold' }}>{isEditMode ? "Edit Employee" : "Add Employee"}<IconButton onClick={() => setOpenEmployeeForm(false)} sx={{ position: "absolute", right: 8, top: 8 }}><CloseIcon /></IconButton></DialogTitle>
//             <DialogContent>
//               <Grid container spacing={2} sx={{ mt: 1 }}>
//                 {!isEditMode && (<Grid item xs={12}><Autocomplete options={talentPool} getOptionLabel={(option) => option.email || ""} onChange={handleTalentSelect} onInputChange={(event, newInputValue) => { if (!talentPool.find(p => p.email === newInputValue)) { setCurrentEmployee(prev => ({ ...prev, email: newInputValue })); }}} renderInput={(params) => (<TextField {...params} label="Search Email to Auto-fill" />)} /></Grid>)}
//                 <Grid item xs={12} sm={4}><TextField fullWidth label="First Name" name="firstName" value={currentEmployee.firstName || ""} onChange={handleInputChange} onKeyPress={(e) => { if (!/^[A-Za-z]$/.test(e.key)) e.preventDefault(); }} InputProps={{ readOnly: isEditMode }} /></Grid>
//                 <Grid item xs={12} sm={4}><TextField fullWidth label="Middle Name" name="middleName" value={currentEmployee.middleName || ""} onChange={handleInputChange} onKeyPress={(e) => { if (!/^[A-Za-z]$/.test(e.key)) e.preventDefault(); }} InputProps={{ readOnly: isEditMode }} /></Grid>
//                 <Grid item xs={12} sm={4}><TextField fullWidth label="Last Name" name="lastName" value={currentEmployee.lastName || ""} onChange={handleInputChange} onKeyPress={(e) => { if (!/^[A-Za-z]$/.test(e.key)) e.preventDefault(); }} InputProps={{ readOnly: isEditMode }} /></Grid>
//                 <Grid item xs={12} sm={6}><TextField fullWidth label="Email" name="email" value={currentEmployee.email || ''} onChange={handleInputChange} InputProps={{ readOnly: isEditMode || !!talentPool.find(p => p.email === currentEmployee.email) }} /></Grid>
//                 <Grid item xs={12} sm={6}><TextField fullWidth label="Phone" name="phone" value={currentEmployee.phone || ''} onChange={(e) => { const value = e.target.value; if (/^\d{0,10}$/.test(value)) handleInputChange(e); }} inputProps={{ maxLength: 10, inputMode: 'numeric', pattern: '[0-9]*' }} InputProps={{ readOnly: isEditMode }} /></Grid>
//                 <Grid item xs={12} sm={6}><Autocomplete options={countries} getOptionLabel={(option) => option.country_name || ''} value={countries.find(c => c.country_id === currentEmployee.country_id) || null} onChange={(e, nv) => handleCountryChange(nv)} isOptionEqualToValue={(option, value) => option.country_id === value.country_id} renderInput={(params) => (<TextField {...params} label="Country" />)} /></Grid>
//                 <Grid item xs={12} sm={6}><Autocomplete options={states} getOptionLabel={(option) => option.state_name || ''} value={states.find(s => s.state_id === currentEmployee.state_id) || null} onChange={(e, nv) => handleStateChange(nv)} isOptionEqualToValue={(option, value) => option.state_id === value.state_id} disabled={!currentEmployee.country_id} renderInput={(params) => (<TextField {...params} label="State" />)} /></Grid>
//                 <Grid item xs={12} sm={6}><Autocomplete options={employeeHubs} getOptionLabel={(option) => option.employee_hub_name || ''} value={employeeHubs.find(h => h.employee_hub_id === currentEmployee.employee_hub_id) || null} onChange={(e, nv) => setCurrentEmployee(prev => ({ ...prev, employee_hub_id: nv ? nv.employee_hub_id : "" }))} isOptionEqualToValue={(option, value) => option.employee_hub_id === value.employee_hub_id} disabled={!currentEmployee.state_id} renderInput={(params) => (<TextField {...params} label="Holiday Hub" />)} /></Grid>
//                 <Grid item xs={12} sm={6}><Autocomplete options={headquarters} getOptionLabel={(option) => option.headquarter_name || ''} value={headquarters.find(h => h.headquarter_id === currentEmployee.headquarter_id) || null} onChange={(e, nv) => setCurrentEmployee(prev => ({ ...prev, headquarter_id: nv ? nv.headquarter_id : "" }))} isOptionEqualToValue={(option, value) => option.headquarter_id === value.headquarter_id} renderInput={(params) => (<TextField {...params} label="Headquarter" />)} /></Grid>
//                 <Grid item xs={12} sm={6}><Autocomplete options={divisions} getOptionLabel={(option) => option.division_name || ''} value={divisions.find(d => d.division_id === currentEmployee.division_id) || null} onChange={(e, nv) => handleDivisionChange(nv)} isOptionEqualToValue={(option, value) => option.division_id === value.division_id} renderInput={(params) => (<TextField {...params} label="Division" />)} /></Grid>
//                 <Grid item xs={12} sm={6}><Autocomplete options={subDivisionOptions} getOptionLabel={(option) => option.label || ''} value={subDivisionOptions.find(sd => sd.value === currentEmployee.subDivision) || null} onChange={(e, nv) => setCurrentEmployee(prev => ({ ...prev, subDivision: nv ? nv.value : "" }))} isOptionEqualToValue={(option, value) => option.value === value.value} disabled={isSubDivisionDisabled} renderInput={(params) => (<TextField {...params} label="Sub Division" />)} /></Grid>
//                 <Grid item xs={12} sm={6}><Autocomplete options={allEmployeesForDropdown} getOptionLabel={(option) => option.label || ''} value={allEmployeesForDropdown.find(e => e.value === currentEmployee.manager_id) || null} onChange={(e, nv) => setCurrentEmployee(prev => ({ ...prev, manager_id: nv ? nv.value : "" }))} isOptionEqualToValue={(option, value) => option.value === value.value} renderInput={(params) => (<TextField {...params} label="Manager" />)} /></Grid>
//                 <Grid item xs={12} sm={6}><Autocomplete options={departments} getOptionLabel={(option) => option.dept_name || ''} value={departments.find(d => d.dept_id === currentEmployee.department_id) || null} onChange={(e, nv) => handleDeptChange(nv)} isOptionEqualToValue={(option, value) => option.dept_id === value.dept_id} renderInput={(params) => (<TextField {...params} label="Department" />)} /></Grid>
//                 <Grid item xs={12} sm={6}><Autocomplete options={designations} getOptionLabel={(option) => option.desig_name || ''} value={designations.find(d => d.desig_id === currentEmployee.designation_id) || null} onChange={(e, nv) => setCurrentEmployee(prev => ({ ...prev, designation_id: nv ? nv.desig_id : "" }))} isOptionEqualToValue={(option, value) => option.desig_id === value.desig_id} disabled={!currentEmployee.department_id} renderInput={(params) => (<TextField {...params} label="Designation" />)} /></Grid>
//                 <Grid item xs={12} sm={6}><Autocomplete options={officeShifts} getOptionLabel={(option) => option.office_shift_name || ''} value={officeShifts.find(s => s.office_shift_id === currentEmployee.officeShift) || null} onChange={(e, nv) => setCurrentEmployee(prev => ({ ...prev, officeShift: nv ? nv.office_shift_id : "" }))} isOptionEqualToValue={(option, value) => option.office_shift_id === value.office_shift_id} renderInput={(params) => (<TextField {...params} label="Office Shift" />)} /></Grid>
//                 <Grid item xs={12} sm={6}><Autocomplete options={statusOptions} getOptionLabel={(option) => option.label} value={statusOptions.find(s => s.value === currentEmployee.status) || null} onChange={(e, nv) => setCurrentEmployee(prev => ({ ...prev, status: nv ? nv.value : 1 }))} isOptionEqualToValue={(option, value) => option.value === value.value} renderInput={(params) => (<TextField {...params} label="Status" />)} /></Grid>
//                 <Grid item xs={12} sm={6}><Autocomplete options={probationOptions} getOptionLabel={(option) => option.label} value={probationOptions.find(p => p.value === currentEmployee.is_probation) || null} onChange={(e, nv) => setCurrentEmployee(prev => ({ ...prev, is_probation: nv ? nv.value : "N" }))} isOptionEqualToValue={(option, value) => option.value === value.value} renderInput={(params) => (<TextField {...params} label="On Probation" />)} /></Grid>
//                 <Grid item xs={12} sm={6}><TextField fullWidth label="Join Date" name="join_date" type="date" value={currentEmployee.join_date || ""} onChange={handleInputChange} InputLabelProps={{ shrink: true }} /></Grid>
//                 <Grid item xs={12} sm={6}><Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}><Button variant="contained" component="label" disabled={isEditMode} sx={buttonSx}>Upload Photo<input type="file" hidden accept="image/*" onChange={handleFileUpload} /></Button>{currentEmployee.avatar && <Avatar src={typeof currentEmployee.avatar === 'string' ? currentEmployee.avatar : URL.createObjectURL(currentEmployee.avatar)} sx={{ width: 56, height: 56 }} />}</Box></Grid>
//                 <Grid item xs={12}>{isFetchingDocs && <CircularProgress />}{employeeDocuments && !isFetchingDocs && (<Box><Typography variant="subtitle1" gutterBottom>Fetched Documents</Typography><Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>{Object.entries(employeeDocuments).map(([name, url]) => (url ? (<Chip key={name} label={name.replace(/_/g, ' ')} component="a" href={url} target="_blank" clickable icon={<LinkIcon />} variant="outlined" color="secondary" size="small" />) : null))}</Box></Box>)}</Grid>
//                 {!isEditMode && (<>
//                   <Grid item xs={12} sm={6}><Autocomplete options={genderOptions} getOptionLabel={(option) => option.label} value={genderOptions.find(g => g.value === currentEmployee.gender) || null} onChange={(e, nv) => setCurrentEmployee(prev => ({ ...prev, gender: nv ? nv.value : "" }))} isOptionEqualToValue={(option, value) => option.value === value.value} renderInput={(params) => (<TextField {...params} label="Gender" />)} /></Grid>
//                   <Grid item xs={12} sm={6}><TextField fullWidth label="Username" name="username" value={currentEmployee.username || ""} onChange={handleInputChange} InputProps={{ readOnly: true }} /></Grid>
//                   <Grid item xs={12} sm={6}><TextField fullWidth label="Password" name="password" value={currentEmployee.password || ""} onChange={handleInputChange} type={showPassword ? 'text' : 'password'} InputProps={{ endAdornment: (<InputAdornment position="end"> <IconButton aria-label="toggle password visibility" onClick={() => setShowPassword((prev) => !prev)} onMouseDown={(e) => e.preventDefault()} edge="end"> {showPassword ? <VisibilityOff /> : <Visibility />} </IconButton> </InputAdornment>) }} /></Grid>
//                   <Grid item xs={12} sm={6}><Autocomplete options={roles} getOptionLabel={(option) => option.role_name || ''} value={roles.find(r => r.index === currentEmployee.role) || null} onChange={(e, nv) => setCurrentEmployee(prev => ({ ...prev, role: nv ? nv.index : "" }))} isOptionEqualToValue={(option, value) => option.index === value.index} renderInput={(params) => (<TextField {...params} label="Role" />)} /></Grid>
//                   <Grid item xs={12} sm={6}><TextField fullWidth label="Gross Salary" name="grossSalary" type="number" value={currentEmployee.grossSalary || ""} onChange={(e) => { const value = e.target.value; if (/^\d*\.?\d*$/.test(value)) handleInputChange(e); }} /></Grid>
//                 </>)}
//               </Grid>
//             </DialogContent>
//             <DialogActions>
//               <Button onClick={() => setOpenEmployeeForm(false)} disabled={isSaving} sx={cancelSx}>Cancel</Button>
//               <Button onClick={handleSaveEmployee} variant="contained" disabled={isSaving} sx={buttonSx}>{isSaving ? <CircularProgress size={24} color="inherit" /> : "Save"}</Button>
//             </DialogActions>
//         </Dialog>
        
//         <TableContainer>
//             <Table size="small" sx={{ minWidth: "100%", whiteSpace: "nowrap" }}>
//                 <TableHead sx={{ bgcolor: primaryColor }}>
//                   <TableRow>
//                       <TableCell sx={{ fontWeight: 'bold', color: 'white', width: '5%', fontSize: '0.95rem' }}>SR. NO.</TableCell>
//                       <TableCell sx={{ fontWeight: 'bold', color: 'white', width: '25%', fontSize: '0.95rem' }}>EMPLOYEE</TableCell>
//                       <TableCell sx={{ width: '5%' }}></TableCell>
//                       <TableCell sx={{ fontWeight: 'bold', color: 'white', width: '15%', fontSize: '0.95rem' }}>DEPARTMENT</TableCell>
//                       <TableCell sx={{ fontWeight: 'bold', color: 'white', width: '15%', fontSize: '0.95rem' }}>DESIGNATION</TableCell>
//                       <TableCell sx={{ fontWeight: 'bold', color: 'white', width: '10%', fontSize: '0.95rem' }}>JOIN DATE</TableCell>
//                       <TableCell sx={{ fontWeight: 'bold', color: 'white', width: '10%', fontSize: '0.95rem' }}>STATUS</TableCell>
//                       <TableCell sx={{ fontWeight: 'bold', color: 'white', width: '15%', fontSize: '0.95rem' }}>MANAGER</TableCell>
//                       <TableCell sx={{ fontWeight: 'bold', color: 'white', width: '10%', fontSize: '0.95rem', textAlign: 'center' }}>ACTIONS</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {loading ? (
//                       Array.from(new Array(rowsPerPage)).map((_, index) => (
//                           <TableRow key={index}>
//                               <TableCell colSpan={9}><Skeleton animation="wave" /></TableCell>
//                           </TableRow>
//                       ))
//                   ) : (
//                     currentEmployees.map((employee, index) => (
//                       <TableRow key={employee.user_id} onMouseEnter={() => setHoveredRowId(employee.user_id)} onMouseLeave={() => setHoveredRowId(null)} hover>
//                           <TableCell sx={{ fontSize: '0.95rem' }}>{page * rowsPerPage + index + 1}</TableCell>
//                           <TableCell sx={{ fontSize: '0.95rem' }}><Typography variant="body2">{employee.employee_name}</Typography></TableCell>
//                           <TableCell sx={{ padding: '0 8px', textAlign: 'center' }}>{hoveredRowId === employee.user_id && (<IconButton onClick={() => navigate(`/hrms/admindashboard/employeedetail/${employee.user_id}`)} size="small" sx={{ color: primaryColor }}><ArrowForwardIcon fontSize="small" /></IconButton>)}</TableCell>
//                           <TableCell sx={{ fontSize: '0.95rem' }}>{employee.department_name || 'N/A'}</TableCell>
//                           <TableCell sx={{ fontSize: '0.95rem' }}>{employee.designation_name || 'N/A'}</TableCell>
//                           <TableCell sx={{ fontSize: '0.95rem' }}>{formatDate(employee.join_date)}</TableCell>
//                           <TableCell><Chip label={employee.status === 1 ? "Active" : "Inactive"} color={employee.status === 1 ? "success" : "error"} size="small" /></TableCell>
//                           <TableCell sx={{ fontSize: '0.95rem' }}>{employee.manager}</TableCell>
//                           <TableCell>
//                               <Box display="flex" justifyContent="center" gap={0.5}>
//                                 <Tooltip title="Edit"><IconButton onClick={() => handleEditEmployee(employee)} sx={{ color: primaryColor }}><EditIcon /></IconButton></Tooltip>
//                                 <Tooltip title="Delete"><IconButton onClick={() => handleDeleteEmployee(employee.user_id)} color="error"><DeleteIcon /></IconButton></Tooltip>
//                               </Box>
//                           </TableCell>
//                       </TableRow>
//                     ))
//                   )}
//                 </TableBody>
//             </Table>
//         </TableContainer>

//         <TablePagination
//             rowsPerPageOptions={[5, 10, 15, 25]}
//             component="div"
//             count={filteredEmployees.length}
//             rowsPerPage={rowsPerPage}
//             page={page}
//             onPageChange={handleChangePage}
//             onRowsPerPageChange={handleChangeRowsPerPage}
//             sx={{
//                 mt: 2,
//                 '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': { color: primaryColor },
//                 '& .MuiSvgIcon-root': { color: primaryColor }
//             }}
//         />
//     </Box>
//   );
// }



import React, { useState, useEffect, useMemo, useCallback, useRef } from "react";
import axios from 'axios';
import {
  Box,
  Typography,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Avatar,
  Chip,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  CircularProgress,
  Autocomplete,
  InputAdornment,
  useTheme,
  useMediaQuery,
  Skeleton,
  TablePagination,
} from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Close as CloseIcon,
  Download as DownloadIcon,
  ArrowForward as ArrowForwardIcon,
  SupervisorAccount as ChangeManagerIcon,
  Link as LinkIcon,
  Visibility,
  VisibilityOff,
  Search as SearchIcon,
} from "@mui/icons-material";
import * as XLSX from "xlsx";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import Swal from 'sweetalert2';

const RESUME_BASE_URL = "https://raasbackend.vetrinahealthcare.com/";

// --- Helper arrays for static Autocomplete options ---
const statusOptions = [{ value: 1, label: 'Active' }, { value: 0, label: 'Inactive' }];
const probationOptions = [{ value: 'Y', label: 'Yes' }, { value: 'N', label: 'No' }];
const genderOptions = [{ value: 'Male', label: 'Male' }, { value: 'Female', label: 'Female' }, { value: 'Other', label: 'Other' }];
const subDivisionOptions = [{ value: 'VetBiz', label: 'VetBiz' }, { value: 'TredBiz', label: 'TredBiz' }, { value: ' ', label: 'TredBiz Mix' }];


export default function EmployeesView() {
  const employeeDialogRef = useRef(null);
  const changeManagerDialogRef = useRef(null);

  // --- State Management ---
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [departments, setDepartments] = useState([]);
  const [designations, setDesignations] = useState([]);
  const [openChangeManagerForm, setOpenChangeManagerForm] = useState(false);
  const [newManager, setNewManager] = useState("");
  const [selectedEmployeeForManagerChange, setSelectedEmployeeForManagerChange] = useState("");
  const [hoveredRowId, setHoveredRowId] = useState(null);
  const [officeShifts, setOfficeShifts] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [roles, setRoles] = useState([]);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [employeeHubs, setEmployeeHubs] = useState([]);
  const [headquarters, setHeadquarters] = useState([]);
  const [divisions, setDivisions] = useState([]);
  const [allEmployeesForDropdown, setAllEmployeesForDropdown] = useState([]);

  const [talentPool, setTalentPool] = useState([]);
  const [isFetchingDocs, setIsFetchingDocs] = useState(false);
  const [employeeDocuments, setEmployeeDocuments] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [openEmployeeForm, setOpenEmployeeForm] = useState(false);
  const [salaryConfig, setSalaryConfig] = useState(null); // Added salaryConfig state

  const [currentEmployee, setCurrentEmployee] = useState({
    id: null, firstName: "", middleName: "", lastName: "", email: "", join_date: "",
    status: 1, phone: "", avatar: null, country_id: "", state_id: "",
    employee_hub_id: "", headquarter_id: "", division_id: "", subDivision: "",
    role: "", is_probation: "n", resumeUrl: "", password: "", gender: "",
    username: "",
    grossSalary: "", // This will now represent gross salary monthly
    department_id: "", designation_id: "",
    manager_id: "", officeShift: "",
    grossSalaryYearly: "", // New field for calculated yearly gross
    ctcMonthly: "",      // New field for calculated monthly CTC
    ctcYearly: "",       // New field for calculated yearly CTC
  });

  // --- Theme and Responsive Design ---
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const primaryColor = '#8C257C';
  const primaryDarkColor = '#6d1d60';
  const secondaryColor = '#F58E35';
  const secondaryDarkColor = '#d97d2e';

  const buttonSx = {
    backgroundColor: primaryColor,
    color: '#FFFFFF',
    '&:hover': { backgroundColor: primaryDarkColor },
  };

  const secondaryButtonSx = {
    backgroundColor: secondaryColor,
    color: '#FFFFFF',
    '&:hover': { backgroundColor: secondaryDarkColor },
  };

  const cancelSx = {
    color: '#757575',
    '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' },
  };


  const formatDate = (dateString) => {
    if (!dateString) return 'N/A'; // Handle cases where date is not available
    try {
      const date = new Date(dateString);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    } catch (error) {
      console.error("Failed to format date:", dateString);
      return dateString; // Return original string if formatting fails
    }
  };

  // --- Data Fetching ---
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          depts, empDropdown, shifts, countriesRes, divs, rolesRes, talent, headquartersRes, salaryConfRes
        ] = await Promise.all([
          axiosInstance.get('api/desig_dept_dropdown/'),
          axiosInstance.get('employee-dropdown/'),
          axiosInstance.get('api/office_shift_dropdown/'),
          axiosInstance.get('api/countries/'),
          axiosInstance.get('api/division/'),
          axiosInstance.get('api/role_list/'),
          axiosInstance.get('api/search_by_email_vet_talent/'),
          axios.get('https://tdtlworld.com/hrms-backend/api/headquarters/'),
          axios.get('https://tdtlworld.com/hrms-backend/api/payroll_setup_configuration/'), // Added salary config fetch
        ]);
        setDepartments(depts.data.dept_data || []);
        setAllEmployeesForDropdown(empDropdown.data || []);
        setOfficeShifts(shifts.data.office_shift_data || []);
        if (countriesRes.data.status === 'success') setCountries(countriesRes.data.data || []);
        setDivisions(divs.data || []);
        if (rolesRes.data?.status === "success") setRoles(rolesRes.data.data);
        setHeadquarters(headquartersRes.data || []);
        setTalentPool(talent.data.data || []);

        // Process salary configuration
        let configData = null;
        if (Array.isArray(salaryConfRes?.data)) {
          configData = salaryConfRes.data.reduce((acc, item) => {
            if (item?.particulars) acc[item.particulars] = parseFloat(item.value) || 0;
            return acc;
          }, {});
          setSalaryConfig(configData);
        } else {
          const fallback = {
            hra: 0.25,
            basic_plus_da: 0.6,
            pf_employer_contribution: 0.12,
            esic_employer_contribution: 0.0325,
          };
          setSalaryConfig(fallback);
          console.warn("Salary configuration fallback applied (salaryConf missing or invalid).");
        }

      } catch (error) {
        console.error("Error fetching initial data:", error);
        Swal.fire({ icon: 'error', title: 'Initialization Error', text: 'Failed to fetch initial application data. Some features may not work as expected.', timer: 4000, showConfirmButton: false });
      }
    };
    fetchData();
  }, []);

  const fetchEmployees = useCallback(() => {
    setLoading(true);
    axiosInstance.get('api/employee_details/')
      .then((response) => setEmployees(Array.isArray(response.data.data) ? response.data.data : []))
      .catch((error) => {
        console.error('Error fetching employees:', error);
        setEmployees([]);
        Swal.fire({ icon: 'error', title: 'Error', text: 'Failed to fetch employee list.', timer: 3000, showConfirmButton: false });
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { fetchEmployees(); }, [fetchEmployees]);

  // --- Salary Calculation Effect ---
  useEffect(() => {
    if (!salaryConfig || !currentEmployee.grossSalary) {
      setCurrentEmployee((prev) => ({ ...prev, grossSalaryYearly: "", ctcMonthly: "", ctcYearly: "" }));
      return;
    }

    const parseNumberOrPercent = (v, fallback = 0) => {
      if (v === null || v === undefined || v === "") return fallback;
      if (typeof v === "number") return v;
      const s = String(v).trim();
      if (s.endsWith("%")) {
        const num = parseFloat(s.slice(0, -1));
        return isNaN(num) ? fallback : num / 100;
      }
      const n = parseFloat(s);
      return isNaN(n) ? fallback : n;
    };

    const grossSalaryMonthly = parseFloat(currentEmployee.grossSalary);
    if (isNaN(grossSalaryMonthly) || grossSalaryMonthly <= 0) {
      setCurrentEmployee((prev) => ({ ...prev, grossSalaryYearly: "", ctcMonthly: "", ctcYearly: "" }));
      return;
    }

    const hraRate = parseNumberOrPercent(salaryConfig.hra, 0.25);
    const basicPlusDaRate = parseNumberOrPercent(salaryConfig.basic_plus_da, 0.6);
    let pfRate = parseNumberOrPercent(salaryConfig.pf_employer_contribution, 0.12);
    if (pfRate > 1) pfRate = pfRate / 100; // Assume if > 1, it's a percentage like 12 instead of 0.12
    let esicRate = parseNumberOrPercent(salaryConfig.esic_employer_contribution, 0.0325); // Corrected fallback
    if (esicRate > 1) esicRate = esicRate / 100; // Assume if > 1, it's a percentage

    const grossSalaryYearly = grossSalaryMonthly * 12;
    const hra = grossSalaryMonthly * hraRate;
    let baseForPf = grossSalaryMonthly - hra;
    if (baseForPf < 0) baseForPf = 0;

    let pf_employer = baseForPf * pfRate;
    const PF_CAP = 1800; // Hardcoded cap for PF employer contribution
    if (pf_employer > PF_CAP) pf_employer = PF_CAP;

    const ESIC_SALARY_THRESHOLD = 21000;
    const esic_applicable = grossSalaryMonthly <= ESIC_SALARY_THRESHOLD;
    const esic_employer = esic_applicable ? grossSalaryMonthly * esicRate : 0;

    let no_of_employment_year = 0;
    const joinDateStr = currentEmployee.join_date;
    if (joinDateStr) {
      try {
        const date_of_joining = new Date(joinDateStr);
        const now = new Date();
        if (!isNaN(date_of_joining.getTime()) && date_of_joining <= now) {
          no_of_employment_year = (now.getTime() - date_of_joining.getTime()) / (1000 * 60 * 60 * 24 * 365.25);
        }
      } catch (e) {
        no_of_employment_year = 0;
      }
    }
    no_of_employment_year = Math.max(0, no_of_employment_year);

    let gratuityMonthly = 0;
    try {
      const basic_plus_da_amount = grossSalaryMonthly * basicPlusDaRate;
      const completedYears = Math.floor(no_of_employment_year);
      if (completedYears >= 5 && basic_plus_da_amount > 0) { // Gratuity is usually applicable after 5 years of service
        const annualGratuity = (basic_plus_da_amount * 15) / 26 * completedYears;
        gratuityMonthly = annualGratuity / 12;
      }
    } catch (e) {
      gratuityMonthly = 0;
    }
    gratuityMonthly = Math.max(0, gratuityMonthly);

    const total_benefit = pf_employer + esic_employer + gratuityMonthly;
    const ctc_monthly = grossSalaryMonthly + total_benefit;
    const ctc_yearly = ctc_monthly * 12;

    const round2 = (n) => Math.round((n + Number.EPSILON) * 100) / 100;

    setCurrentEmployee((prev) => ({
      ...prev,
      grossSalaryYearly: round2(grossSalaryYearly).toFixed(2),
      ctcMonthly: round2(ctc_monthly).toFixed(2),
      ctcYearly: round2(ctc_yearly).toFixed(2),
    }));
  }, [currentEmployee.grossSalary, currentEmployee.join_date, salaryConfig]);


  // --- Handlers ---
  const handleCountryChange = (selectedCountry) => {
    const countryId = selectedCountry ? selectedCountry.country_id : "";
    const countryName = selectedCountry ? selectedCountry.country_name : null;
    setCurrentEmployee(prev => ({ ...prev, country_id: countryId, state_id: "", employee_hub_id: "" }));
    setStates([]);
    setEmployeeHubs([]);
    if (countryName) {
      axiosInstance.get(`api/states/?country_name=${countryName}`)
        .then(res => { if (res.data.status === "success") setStates(res.data.data || []); })
        .catch(err => {
          console.error("Error fetching states:", err);
          Swal.fire({ icon: 'error', title: 'Error', text: 'Failed to fetch states for the selected country.', timer: 3000, showConfirmButton: false, target: employeeDialogRef.current });
        });
    }
  };

  const handleStateChange = (selectedState) => {
    const stateId = selectedState ? selectedState.state_id : "";
    setCurrentEmployee(prev => ({ ...prev, state_id: stateId, employee_hub_id: "" }));
    setEmployeeHubs([]);
    if (stateId) {
      axiosInstance.get(`api/employee_hub_dropdown/${stateId}/`)
        .then(res => { if (res.data.status === "success") setEmployeeHubs(res.data.data || []); })
        .catch(err => {
          console.error("Error fetching holiday hubs:", err);
          Swal.fire({ icon: 'error', title: 'Error', text: 'Failed to fetch Holiday hubs.', timer: 3000, showConfirmButton: false, target: employeeDialogRef.current });
        });
    }
  };

  const handleDeptChange = (selectedDept) => {
    const deptId = selectedDept ? selectedDept.dept_id : "";
    setCurrentEmployee((prev) => ({ ...prev, department_id: deptId, designation_id: "" }));
    if (deptId) {
      axiosInstance.get(`api/desig_dept_dropdown/?dept_id=${deptId}/`)
        .then((res) => setDesignations(res.data.desig_data || []))
        .catch((err) => {
          console.error("Error fetching designations:", err);
          Swal.fire({ icon: 'error', title: 'Error', text: 'Failed to load designations.', target: employeeDialogRef.current });
        });
    } else {
      setDesignations([]);
    }
  };

  const handleDivisionChange = (selectedDivision) => {
    const divisionId = selectedDivision ? selectedDivision.division_id : "";
    setCurrentEmployee(prev => ({
      ...prev,
      division_id: divisionId,
      subDivision: selectedDivision?.division_name !== 'Livestock' ? "" : prev.subDivision
    }));
  };

  const handleChangeManager = async () => {
    if (!selectedEmployeeForManagerChange || !newManager) {
      Swal.fire({ icon: 'warning', title: 'Incomplete Selection', text: 'Please select an employee and a new manager.', target: changeManagerDialogRef.current });
      return;
    }
    try {
      await axiosInstance.put("api/change_manager/", { user_id: selectedEmployeeForManagerChange, manager_id: newManager });
      await fetchEmployees();
      Swal.fire({ icon: 'success', title: 'Success', text: 'Manager changed successfully!', timer: 3000, showConfirmButton: false });
      setOpenChangeManagerForm(false);
      setSelectedEmployeeForManagerChange("");
      setNewManager("");
    } catch (error) {
      console.error("Error changing manager:", error);
      Swal.fire({ icon: 'error', title: 'Operation Failed', text: `Error changing manager: ${error.response?.data?.message || "An error occurred."}`, target: changeManagerDialogRef.current });
    }
  };

  const navigate = useNavigate();
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentEmployee((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddEmployee = async () => {
    try {
      const [maxIdResponse, headquartersResponse] = await Promise.all([
        axios.get("https://tdtlworld.com/hrms-backend/api/get_max_employee_id/"),
        axios.get('https://tdtlworld.com/hrms-backend/api/headquarters/')
      ]);
      const newEmpId = maxIdResponse.data.employee_id;
      setHeadquarters(headquartersResponse.data || []);
      setCurrentEmployee({
        emp_id: newEmpId, firstName: "", middleName: "", lastName: "", email: "", phone: "",
        avatar: null, officeShift: "", status: 1, join_date: "", gender: "", username: newEmpId, password: "",
        role: "",
        grossSalary: "", // Reset monthly gross
        department_id: "", designation_id: "", manager_id: "",
        country_id: "", state_id: "", employee_hub_id: "", headquarter_id: "", division_id: "",
        company_id: 2, is_probation: "n", resumeUrl: "", subDivision: "",
        grossSalaryYearly: "", // Reset new salary fields
        ctcMonthly: "",
        ctcYearly: "",
      });
      setDesignations([]); setStates([]); setEmployeeHubs([]); setEmployeeDocuments(null);
      setIsEditMode(false); setShowPassword(false); setOpenEmployeeForm(true);
    } catch (error) {
      console.error("Error fetching max employee ID or headquarters:", error);
      Swal.fire({ icon: 'error', title: 'Error', text: 'Failed to initialize employee form.', timer: 3000, showConfirmButton: false });
    }
  };

  const handleTalentSelect = async (event, selectedOption) => {
    setEmployeeDocuments(null);
    setCurrentEmployee(prev => ({ ...prev, resumeUrl: "" }));
    if (!selectedOption) {
      setCurrentEmployee(prev => ({ ...prev, firstName: "", middleName: "", lastName: "", email: "", phone: "", gender: "", country_id: "", state_id: "" }));
      return;
    }
    const talent = talentPool.find(p => p.email === selectedOption.email);
    if (!talent) return;

    const selectedCountry = countries.find(c => c.country_name === talent.country);
    const resumeLink = talent.resume ? `${RESUME_BASE_URL}${talent.resume}` : "";
    setCurrentEmployee(prev => ({
      ...prev, firstName: talent.first_name || "", middleName: talent.middle_name || "",
      lastName: talent.last_name || "", email: talent.email || "", phone: talent.phone || "",
      gender: talent.gender || "", country_id: selectedCountry ? selectedCountry.country_id : "",
      state_id: '', employee_hub_id: '', resumeUrl: resumeLink,
    }));
    if (selectedCountry) {
      try {
        const statesRes = await axiosInstance.get(`api/states/?country_name=${selectedCountry.country_name}`);
        if (statesRes.data.status === "success") {
          const fetchedStates = statesRes.data.data || [];
          setStates(fetchedStates);
          const selectedState = fetchedStates.find(s => s.state_name === talent.state);
          if (selectedState) {
            setCurrentEmployee(prev => ({ ...prev, state_id: selectedState.state_id }));
            const hubsRes = await axiosInstance.get(`api/employee_hub_dropdown/${selectedState.state_id}/`);
            if (hubsRes.data.status === "success") setEmployeeHubs(hubsRes.data.data || []);
          }
        }
      } catch (err) { console.error("Error fetching dependent data for talent:", err); }
    }
    setIsFetchingDocs(true);
    try {
      const docResponse = await axios.post('https://raasbackend.vetrinahealthcare.com/fetch_documents/', { email_id: talent.email });
      setEmployeeDocuments(docResponse.data.status === 'success' && docResponse.data.documents ? docResponse.data.documents : null);
    } catch (error) {
      console.error("Error fetching documents:", error);
      Swal.fire({ icon: 'error', title: 'Document Fetch Failed', text: 'Failed to fetch documents for the selected talent.', target: employeeDialogRef.current });
      setEmployeeDocuments(null);
    } finally {
      setIsFetchingDocs(false);
    }
  };

  const handleEditEmployee = async (employee) => {
    if (!employee || !employee.user_id) return;
    try {
      const response = await axiosInstance.get(`api/edit_employee/${employee.user_id}/`);
      if (response.data.status !== "success" || response.data.data.length === 0) {
        Swal.fire({ icon: 'error', title: 'Error', text: 'Failed to load employee details.', timer: 3000, showConfirmButton: false });
        return;
      }
      const empData = response.data.data[0];
      const [desigRes, statesRes, hubsRes, headquartersRes] = await Promise.all([
        axiosInstance.get(`api/desig_dept_dropdown/?dept_id=${empData.department_id}/`),
        empData.country_name ? axiosInstance.get(`api/states/?country_name=${empData.country_name}`) : Promise.resolve({ data: { data: [] } }),
        empData.state ? axiosInstance.get(`api/employee_hub_dropdown/${empData.state}/`) : Promise.resolve({ data: { data: [] } }),
        axios.get('https://tdtlworld.com/hrms-backend/api/headquarters/')
      ]);
      setDesignations(desigRes.data.desig_data || []);
      setStates(statesRes.data.data || []);
      setEmployeeHubs(hubsRes.data.data || []);
      setHeadquarters(headquartersRes.data || []);
      const officeShiftObj = officeShifts.find(s => s.office_shift_name === empData.office_shift);
      const nameParts = (empData.emp_name || "").split(" ");
      const selectedCountry = countries.find(c => c.country_name === empData.country_name);
      let finalSubDivisionValue = empData.sub_division || "";
      if (finalSubDivisionValue === "Tred") { // Assuming 'Tred' might be stored and should map to 'TredBiz' label
        finalSubDivisionValue = "TredBiz";
      }
      setCurrentEmployee({
        id: employee.user_id,
        firstName: nameParts[0] || "", middleName: nameParts.length > 2 ? nameParts.slice(1, -1).join(" ") : "",
        lastName: nameParts.length > 1 ? nameParts[nameParts.length - 1] : "", email: empData.email || "",
        phone: empData.phone || "", manager_id: Number(empData.manager_id) || "",
        designation_id: Number(empData.designation_id) || "", department_id: Number(empData.department_id) || "",
        officeShift: officeShiftObj ? Number(officeShiftObj.office_shift_id) : "",
        status: Number(empData.status), join_date: empData.join_date ? empData.join_date.split(" ")[0] : "",
        country_id: selectedCountry ? Number(selectedCountry.country_id) : "", state_id: Number(empData.state) || "",
        employee_hub_id: Number(empData.employee_hub_id) || "", headquarter_id: Number(empData.headquarter_id) || "",
        division_id: Number(empData.division_id) || "", subDivision: finalSubDivisionValue,
        avatar: empData.profile_photo || "", role: Number(empData.role_id) || "",
        is_probation: empData.probation?.toLowerCase() === 'y' ? 'y' : 'n', resumeUrl: "",
        grossSalary: empData.gross_salary || "", // Populate gross salary monthly
        grossSalaryYearly: "", // Will be calculated by useEffect
        ctcMonthly: "",      // Will be calculated by useEffect
        ctcYearly: "",       // Will be calculated by useEffect
      });
      setIsEditMode(true); setOpenEmployeeForm(true); setShowPassword(false);
    } catch (error) {
      console.error("Error fetching employee details for edit:", error);
      Swal.fire({ icon: 'error', title: 'Error', text: 'Failed to fetch employee details.', timer: 3000, showConfirmButton: false });
    }
  };

  const handleSaveEmployee = async () => {
    if (!isEditMode) {
      const requiredFields = {
        firstName: 'First Name', lastName: 'Last Name', email: 'Email', phone: 'Phone', country_id: 'Country', state_id: 'State',
        employee_hub_id: 'Holiday Hub', headquarter_id: 'Headquarter', division_id: 'Division', manager_id: 'Manager',
        department_id: 'Department', designation_id: 'Designation', officeShift: 'Office Shift', join_date: 'Join Date',
        avatar: 'Photo', gender: 'Gender', username: 'Username', password: 'Password', role: 'Role', grossSalary: 'Gross Salary Monthly'
      };
      const selectedDivision = divisions.find(d => d.division_id === currentEmployee.division_id);
      if (selectedDivision && selectedDivision.division_name === 'Livestock' && !currentEmployee.subDivision) {
        Swal.fire({ icon: 'error', title: 'Validation Error', text: 'Sub Division is required when Division is Livestock.', target: employeeDialogRef.current });
        return;
      }
      for (const field in requiredFields) {
        if (!currentEmployee[field]) {
          Swal.fire({ icon: 'error', title: 'Validation Error', text: `The field "${requiredFields[field]}" is required.`, target: employeeDialogRef.current });
          return;
        }
      }
    }
    const formData = new FormData();
    const keyMap = {
      firstName: 'first_name', middleName: 'middle_name', lastName: 'last_name',
      officeShift: 'office_shift', join_date: 'join_date',
      grossSalary: 'gross_salary', // Maps to gross_salary (monthly)
      headquarter_id: 'headquarter_id',
      grossSalaryYearly: 'gross_salary_yearly', // Send calculated yearly gross
      ctcMonthly: 'ctc_monthly',           // Send calculated monthly CTC
      ctcYearly: 'ctc_yearly',             // Send calculated yearly CTC
    };
    Object.keys(currentEmployee).forEach(key => {
      if (key === 'avatar' && currentEmployee.avatar instanceof File) {
        formData.append("file", currentEmployee.avatar);
      } else if (key !== 'resumeUrl' && currentEmployee[key] !== null && currentEmployee[key] !== undefined && currentEmployee[key] !== "") {
        const backendKey = keyMap[key] || key;
        formData.append(backendKey, currentEmployee[key]);
      }
    });
    setIsSaving(true);
    try {
      const action = isEditMode ? 'updated' : 'added';
      if (isEditMode) {
        formData.append("user_id", currentEmployee.id);
        await axiosInstance.put("api/edit_employee/", formData, { headers: { "Content-Type": "multipart/form-data" } });
      } else {
        await axiosInstance.post("api/add_employee/", formData, { headers: { "Content-Type": "multipart/form-data" } });
      }
      setOpenEmployeeForm(false);
      await fetchEmployees();
      Swal.fire({ icon: 'success', title: 'Success', text: `Employee ${action} successfully!`, timer: 3000, showConfirmButton: false });
    } catch (error) {
      console.error("Error saving employee:", error);
      const errorMessage = error.response?.data?.message || error.response?.data?.detail || "An unexpected error occurred.";
      Swal.fire({ icon: 'error', title: `Operation failed`, text: `${errorMessage}`, target: employeeDialogRef.current });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteEmployee = (employeeId) => {
    if (!employeeId) return;
    Swal.fire({
      title: 'Are you sure?', text: "You won't be able to revert this!", icon: 'warning',
      showCancelButton: true, confirmButtonColor: '#3085d6', cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        axiosInstance.delete("api/edit_employee/", { data: { user_id: employeeId } })
          .then(() => {
            fetchEmployees();
            Swal.fire({ icon: 'success', title: 'Deleted!', text: 'The employee has been deleted.', timer: 3000, showConfirmButton: false });
          })
          .catch((error) => {
            const errorMessage = error.response?.data?.message || error.response?.data?.detail || "Failed to delete employee.";
            Swal.fire({ icon: 'error', title: 'Error', text: errorMessage, timer: 3000, showConfirmButton: false });
          });
      }
    });
  };

  const handleExportEmployees = () => {
    if (employees.length === 0) {
      Swal.fire({ icon: 'info', title: 'Info', text: 'There is no employee data to export.', timer: 3000, showConfirmButton: false });
      return;
    }
    const worksheet = XLSX.utils.json_to_sheet(employees);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Employees");
    XLSX.writeFile(workbook, "EmployeesData.xlsx");
    Swal.fire({ icon: 'success', title: 'Success', text: 'Employee data has been exported successfully!', timer: 3000, showConfirmButton: false });
  };

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) setCurrentEmployee((prev) => ({ ...prev, avatar: file }));
  };

  // --- Memos and Derived State ---
  const sortedEmployees = useMemo(() => {
    if (!Array.isArray(employees)) return [];
    return [...employees].sort((a, b) => b.user_id - a.user_id);
  }, [employees]);

  const filteredEmployees = useMemo(() => sortedEmployees.filter(
    (e) =>
      (e.employee_name && e.employee_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (e.department_name && e.department_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (e.designation_name && e.designation_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (e.join_date && e.join_date.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (e.manager && e.manager.toLowerCase().includes(searchTerm.toLowerCase()))
  ), [sortedEmployees, searchTerm]);

  const currentEmployees = useMemo(() => filteredEmployees.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage), [filteredEmployees, page, rowsPerPage]);

  const isSubDivisionDisabled = useMemo(() => {
    if (!currentEmployee.division_id) return true;
    const selectedDivision = divisions.find(d => d.division_id === currentEmployee.division_id);
    return !selectedDivision || selectedDivision.division_name !== 'Livestock';
  }, [currentEmployee.division_id, divisions]);

  return (
    <Box component={Paper} p={3}>
      <Typography variant="h5" sx={{ color: primaryColor, fontWeight: "bold", mb: 2 }}>
        Employees List
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2, mb: 2 }}>
        <Box sx={{ display: 'flex', gap: 1, flexDirection: isMobile ? 'column' : 'row', width: isMobile ? '100%' : 'auto' }}>
          <Button variant="contained" startIcon={<AddIcon />} onClick={handleAddEmployee} sx={buttonSx}>Add Employee</Button>
          <Button variant="contained" startIcon={<ChangeManagerIcon />} onClick={() => setOpenChangeManagerForm(true)} sx={secondaryButtonSx}>Change Manager</Button>
          <Button variant="contained" startIcon={<DownloadIcon />} onClick={handleExportEmployees} sx={secondaryButtonSx}>Export</Button>
        </Box>
        <TextField
          size="small"
          placeholder="Search..."
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ width: isMobile ? '100%' : 'auto' }}
          InputProps={{
            startAdornment: (<InputAdornment position="start"><SearchIcon /></InputAdornment>),
          }}
        />
      </Box>

      <Dialog open={openChangeManagerForm} onClose={() => setOpenChangeManagerForm(false)} maxWidth="sm" fullWidth ref={changeManagerDialogRef}>
        <DialogTitle sx={{ color: primaryColor, fontWeight: 'bold' }}>Change Manager<IconButton onClick={() => setOpenChangeManagerForm(false)} sx={{ position: "absolute", right: 8, top: 8 }}><CloseIcon /></IconButton></DialogTitle>
        <DialogContent><Grid container spacing={2} sx={{ mt: 1 }}><Grid item xs={12}><Autocomplete options={allEmployeesForDropdown} getOptionLabel={(option) => `${option.label} (${option.emp_id})` || ''} onChange={(e, nv) => setSelectedEmployeeForManagerChange(nv ? nv.value : "")} isOptionEqualToValue={(option, value) => option.value === value.value} renderInput={(params) => <TextField {...params} label="Select Employee" />} /></Grid><Grid item xs={12}><Autocomplete options={allEmployeesForDropdown} getOptionLabel={(option) => `${option.label} (${option.emp_id})` || ''} onChange={(e, nv) => setNewManager(nv ? nv.value : "")} isOptionEqualToValue={(option, value) => option.value === value.value} renderInput={(params) => <TextField {...params} label="Select New Manager" />} /></Grid></Grid></DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenChangeManagerForm(false)} sx={cancelSx}>Cancel</Button>
          <Button onClick={handleChangeManager} variant="contained" sx={buttonSx}>Save</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openEmployeeForm} onClose={() => setOpenEmployeeForm(false)} maxWidth="md" fullWidth ref={employeeDialogRef}>
        <DialogTitle sx={{ color: primaryColor, fontWeight: 'bold' }}>{isEditMode ? "Edit Employee" : "Add Employee"}<IconButton onClick={() => setOpenEmployeeForm(false)} sx={{ position: "absolute", right: 8, top: 8 }}><CloseIcon /></IconButton></DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            {!isEditMode && (<Grid item xs={12}><Autocomplete options={talentPool} getOptionLabel={(option) => option.email || ""} onChange={handleTalentSelect} onInputChange={(event, newInputValue) => { if (!talentPool.find(p => p.email === newInputValue)) { setCurrentEmployee(prev => ({ ...prev, email: newInputValue })); }}} renderInput={(params) => (<TextField {...params} label="Search Email to Auto-fill" />)} /></Grid>)}
            <Grid item xs={12} sm={4}><TextField fullWidth label="First Name" name="firstName" value={currentEmployee.firstName || ""} onChange={handleInputChange} onKeyPress={(e) => { if (!/^[A-Za-z\s-']$/.test(e.key)) e.preventDefault(); }} InputProps={{ readOnly: isEditMode }} /></Grid>
            <Grid item xs={12} sm={4}><TextField fullWidth label="Middle Name" name="middleName" value={currentEmployee.middleName || ""} onChange={handleInputChange} onKeyPress={(e) => { if (!/^[A-Za-z\s-']$/.test(e.key)) e.preventDefault(); }} InputProps={{ readOnly: isEditMode }} /></Grid>
            <Grid item xs={12} sm={4}><TextField fullWidth label="Last Name" name="lastName" value={currentEmployee.lastName || ""} onChange={handleInputChange} onKeyPress={(e) => { if (!/^[A-Za-z\s-']$/.test(e.key)) e.preventDefault(); }} InputProps={{ readOnly: isEditMode }} /></Grid>
            <Grid item xs={12} sm={6}><TextField fullWidth label="Email" name="email" value={currentEmployee.email || ''} onChange={handleInputChange} InputProps={{ readOnly: isEditMode || !!talentPool.find(p => p.email === currentEmployee.email) }} /></Grid>
            <Grid item xs={12} sm={6}><TextField fullWidth label="Phone" name="phone" value={currentEmployee.phone || ''} onChange={(e) => { const value = e.target.value; if (/^\d{0,10}$/.test(value)) handleInputChange(e); }} inputProps={{ maxLength: 10, inputMode: 'numeric', pattern: '[0-9]*' }} InputProps={{ readOnly: isEditMode }} /></Grid>
            <Grid item xs={12} sm={6}><Autocomplete options={countries} getOptionLabel={(option) => option.country_name || ''} value={countries.find(c => c.country_id === currentEmployee.country_id) || null} onChange={(e, nv) => handleCountryChange(nv)} isOptionEqualToValue={(option, value) => option.country_id === value.country_id} renderInput={(params) => (<TextField {...params} label="Country" />)} /></Grid>
            <Grid item xs={12} sm={6}><Autocomplete options={states} getOptionLabel={(option) => option.state_name || ''} value={states.find(s => s.state_id === currentEmployee.state_id) || null} onChange={(e, nv) => handleStateChange(nv)} isOptionEqualToValue={(option, value) => option.state_id === value.state_id} disabled={!currentEmployee.country_id} renderInput={(params) => (<TextField {...params} label="State" />)} /></Grid>
            <Grid item xs={12} sm={6}><Autocomplete options={employeeHubs} getOptionLabel={(option) => option.employee_hub_name || ''} value={employeeHubs.find(h => h.employee_hub_id === currentEmployee.employee_hub_id) || null} onChange={(e, nv) => setCurrentEmployee(prev => ({ ...prev, employee_hub_id: nv ? nv.employee_hub_id : "" }))} isOptionEqualToValue={(option, value) => option.employee_hub_id === value.employee_hub_id} disabled={!currentEmployee.state_id} renderInput={(params) => (<TextField {...params} label="Holiday Hub" />)} /></Grid>
            <Grid item xs={12} sm={6}><Autocomplete options={headquarters} getOptionLabel={(option) => option.headquarter_name || ''} value={headquarters.find(h => h.headquarter_id === currentEmployee.headquarter_id) || null} onChange={(e, nv) => setCurrentEmployee(prev => ({ ...prev, headquarter_id: nv ? nv.headquarter_id : "" }))} isOptionEqualToValue={(option, value) => option.headquarter_id === value.headquarter_id} renderInput={(params) => (<TextField {...params} label="Headquarter" />)} /></Grid>
            <Grid item xs={12} sm={6}><Autocomplete options={divisions} getOptionLabel={(option) => option.division_name || ''} value={divisions.find(d => d.division_id === currentEmployee.division_id) || null} onChange={(e, nv) => handleDivisionChange(nv)} isOptionEqualToValue={(option, value) => option.division_id === value.division_id} renderInput={(params) => (<TextField {...params} label="Division" />)} /></Grid>
            <Grid item xs={12} sm={6}><Autocomplete options={subDivisionOptions} getOptionLabel={(option) => option.label || ''} value={subDivisionOptions.find(sd => sd.value === currentEmployee.subDivision) || null} onChange={(e, nv) => setCurrentEmployee(prev => ({ ...prev, subDivision: nv ? nv.value : "" }))} isOptionEqualToValue={(option, value) => option.value === value.value} disabled={isSubDivisionDisabled} renderInput={(params) => (<TextField {...params} label="Sub Division" />)} /></Grid>
            <Grid item xs={12} sm={6}><Autocomplete options={allEmployeesForDropdown} getOptionLabel={(option) => `${option.label} (${option.emp_id})` || ''} value={allEmployeesForDropdown.find(e => e.value === currentEmployee.manager_id) || null} onChange={(e, nv) => setCurrentEmployee(prev => ({ ...prev, manager_id: nv ? nv.value : "" }))} isOptionEqualToValue={(option, value) => option.value === value.value} renderInput={(params) => (<TextField {...params} label="Manager" />)} /></Grid>
            <Grid item xs={12} sm={6}><Autocomplete options={departments} getOptionLabel={(option) => option.dept_name || ''} value={departments.find(d => d.dept_id === currentEmployee.department_id) || null} onChange={(e, nv) => handleDeptChange(nv)} isOptionEqualToValue={(option, value) => option.dept_id === value.dept_id} renderInput={(params) => (<TextField {...params} label="Department" />)} /></Grid>
            <Grid item xs={12} sm={6}><Autocomplete options={designations} getOptionLabel={(option) => option.desig_name || ''} value={designations.find(d => d.desig_id === currentEmployee.designation_id) || null} onChange={(e, nv) => setCurrentEmployee(prev => ({ ...prev, designation_id: nv ? nv.desig_id : "" }))} isOptionEqualToValue={(option, value) => option.desig_id === value.desig_id} disabled={!currentEmployee.department_id} renderInput={(params) => (<TextField {...params} label="Designation" />)} /></Grid>
            <Grid item xs={12} sm={6}><Autocomplete options={officeShifts} getOptionLabel={(option) => option.office_shift_name || ''} value={officeShifts.find(s => s.office_shift_id === currentEmployee.officeShift) || null} onChange={(e, nv) => setCurrentEmployee(prev => ({ ...prev, officeShift: nv ? nv.office_shift_id : "" }))} isOptionEqualToValue={(option, value) => option.office_shift_id === value.office_shift_id} renderInput={(params) => (<TextField {...params} label="Office Shift" />)} /></Grid>
            <Grid item xs={12} sm={6}><Autocomplete options={statusOptions} getOptionLabel={(option) => option.label} value={statusOptions.find(s => s.value === currentEmployee.status) || null} onChange={(e, nv) => setCurrentEmployee(prev => ({ ...prev, status: nv ? nv.value : 1 }))} isOptionEqualToValue={(option, value) => option.value === value.value} renderInput={(params) => (<TextField {...params} label="Status" />)} /></Grid>
            <Grid item xs={12} sm={6}><Autocomplete options={probationOptions} getOptionLabel={(option) => option.label} value={probationOptions.find(p => p.value === currentEmployee.is_probation) || null} onChange={(e, nv) => setCurrentEmployee(prev => ({ ...prev, is_probation: nv ? nv.value : "N" }))} isOptionEqualToValue={(option, value) => option.value === value.value} renderInput={(params) => (<TextField {...params} label="On Probation" />)} /></Grid>
            <Grid item xs={12} sm={6}><TextField fullWidth label="Join Date" name="join_date" type="date" value={currentEmployee.join_date || ""} onChange={handleInputChange} InputLabelProps={{ shrink: true }} /></Grid>
            <Grid item xs={12} sm={6}><Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}><Button variant="contained" component="label" disabled={isEditMode} sx={buttonSx}>Upload Photo<input type="file" hidden accept="image/*" onChange={handleFileUpload} /></Button>{currentEmployee.avatar && <Avatar src={typeof currentEmployee.avatar === 'string' ? currentEmployee.avatar : URL.createObjectURL(currentEmployee.avatar)} sx={{ width: 56, height: 56 }} />}</Box></Grid>
            <Grid item xs={12}>{isFetchingDocs && <CircularProgress />}{employeeDocuments && !isFetchingDocs && (<Box><Typography variant="subtitle1" gutterBottom>Fetched Documents</Typography><Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>{Object.entries(employeeDocuments).map(([name, url]) => (url ? (<Chip key={name} label={name.replace(/_/g, ' ')} component="a" href={url} target="_blank" clickable icon={<LinkIcon />} variant="outlined" color="secondary" size="small" />) : null))}</Box></Box>)}</Grid>
            {!isEditMode && (<>
              <Grid item xs={12} sm={6}><Autocomplete options={genderOptions} getOptionLabel={(option) => option.label} value={genderOptions.find(g => g.value === currentEmployee.gender) || null} onChange={(e, nv) => setCurrentEmployee(prev => ({ ...prev, gender: nv ? nv.value : "" }))} isOptionEqualToValue={(option, value) => option.value === value.value} renderInput={(params) => (<TextField {...params} label="Gender" />)} /></Grid>
              <Grid item xs={12} sm={6}><TextField fullWidth label="Username" name="username" value={currentEmployee.username || ""} onChange={handleInputChange} InputProps={{ readOnly: true }} /></Grid>
              <Grid item xs={12} sm={6}><TextField fullWidth label="Password" name="password" value={currentEmployee.password || ""} onChange={handleInputChange} type={showPassword ? 'text' : 'password'} InputProps={{ endAdornment: (<InputAdornment position="end"> <IconButton aria-label="toggle password visibility" onClick={() => setShowPassword((prev) => !prev)} onMouseDown={(e) => e.preventDefault()} edge="end"> {showPassword ? <VisibilityOff /> : <Visibility />} </IconButton> </InputAdornment>) }} /></Grid>
              <Grid item xs={12} sm={6}><Autocomplete options={roles} getOptionLabel={(option) => option.role_name || ''} value={roles.find(r => r.index === currentEmployee.role) || null} onChange={(e, nv) => setCurrentEmployee(prev => ({ ...prev, role: nv ? nv.index : "" }))} isOptionEqualToValue={(option, value) => option.index === value.index} renderInput={(params) => (<TextField {...params} label="Role" />)} /></Grid>
              {/* Gross Salary Monthly and Calculated Fields */}
              <Grid item xs={12} sm={6} md={3}>
                <TextField fullWidth label="Gross Salary Monthly" name="grossSalary" type="number" value={currentEmployee.grossSalary || ""} onChange={(e) => { const value = e.target.value; if (/^\d*\.?\d*$/.test(value)) handleInputChange(e); }} />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TextField fullWidth label="Gross Salary Yearly" name="grossSalaryYearly" type="text" value={currentEmployee.grossSalaryYearly || ""} InputProps={{ readOnly: true }} />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TextField fullWidth label="CTC Monthly" name="ctcMonthly" type="text" value={currentEmployee.ctcMonthly || ""} InputProps={{ readOnly: true }} />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TextField fullWidth label="CTC Yearly" name="ctcYearly" type="text" value={currentEmployee.ctcYearly || ""} InputProps={{ readOnly: true }} />
              </Grid>
            </>)}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEmployeeForm(false)} disabled={isSaving} sx={cancelSx}>Cancel</Button>
          <Button onClick={handleSaveEmployee} variant="contained" disabled={isSaving} sx={buttonSx}>{isSaving ? <CircularProgress size={24} color="inherit" /> : "Save"}</Button>
        </DialogActions>
      </Dialog>

      <TableContainer>
        <Table size="small" sx={{ minWidth: "100%", whiteSpace: "nowrap" }}>
          <TableHead sx={{ bgcolor: primaryColor }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', color: 'white', width: '5%', fontSize: '0.95rem' }}>SR. NO.</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'white', width: '25%', fontSize: '0.95rem' }}>EMPLOYEE</TableCell>
              <TableCell sx={{ width: '5%' }}></TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'white', width: '15%', fontSize: '0.95rem' }}>DEPARTMENT</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'white', width: '15%', fontSize: '0.95rem' }}>DESIGNATION</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'white', width: '10%', fontSize: '0.95rem' }}>JOIN DATE</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'white', width: '10%', fontSize: '0.95rem' }}>STATUS</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'white', width: '15%', fontSize: '0.95rem' }}>MANAGER</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'white', width: '10%', fontSize: '0.95rem', textAlign: 'center' }}>ACTIONS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              Array.from(new Array(rowsPerPage)).map((_, index) => (
                <TableRow key={index}>
                  <TableCell colSpan={9}><Skeleton animation="wave" /></TableCell>
                </TableRow>
              ))
            ) : (
              currentEmployees.map((employee, index) => (
                <TableRow key={employee.user_id} onMouseEnter={() => setHoveredRowId(employee.user_id)} onMouseLeave={() => setHoveredRowId(null)} hover>
                  <TableCell sx={{ fontSize: '0.95rem' }}>{page * rowsPerPage + index + 1}</TableCell>
                  <TableCell sx={{ fontSize: '0.95rem' }}><Typography variant="body2">{employee.employee_name}</Typography></TableCell>
                  <TableCell sx={{ padding: '0 8px', textAlign: 'center' }}>{hoveredRowId === employee.user_id && (<IconButton onClick={() => navigate(`/hrms/hrpanel/employeedetailHr/${employee.user_id}`)} size="small" sx={{ color: primaryColor }}><ArrowForwardIcon fontSize="small" /></IconButton>)}</TableCell>
                  <TableCell sx={{ fontSize: '0.95rem' }}>{employee.department_name || 'N/A'}</TableCell>
                  <TableCell sx={{ fontSize: '0.95rem' }}>{employee.designation_name || 'N/A'}</TableCell>
                  <TableCell sx={{ fontSize: '0.95rem' }}>{formatDate(employee.join_date)}</TableCell>
                  <TableCell><Chip label={employee.status === 1 ? "Active" : "Inactive"} color={employee.status === 1 ? "success" : "error"} size="small" /></TableCell>
                  <TableCell sx={{ fontSize: '0.95rem' }}>{employee.manager}</TableCell>
                  <TableCell>
                    <Box display="flex" justifyContent="center" gap={0.5}>
                      <Tooltip title="Edit"><IconButton onClick={() => handleEditEmployee(employee)} sx={{ color: primaryColor }}><EditIcon /></IconButton></Tooltip>
                      <Tooltip title="Delete"><IconButton onClick={() => handleDeleteEmployee(employee.user_id)} color="error"><DeleteIcon /></IconButton></Tooltip>
                    </Box>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 15, 25]}
        component="div"
        count={filteredEmployees.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{
          mt: 2,
          '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': { color: primaryColor },
          '& .MuiSvgIcon-root': { color: primaryColor }
        }}
      />
    </Box>
  );
}