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

// const getInitials = (name = "") => {
//   const nameParts = name.split(' ').filter(Boolean);
//   if (nameParts.length === 0) return '';
//   if (nameParts.length === 1) return nameParts[0][0].toUpperCase();
//   return (nameParts[0][0] + nameParts[nameParts.length - 1][0]).toUpperCase();
// };

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

//   // Changed button color to a vibrant purple and reduced height
//   const purpleButtonSx = {
//     backgroundColor: '#6A0DAD', // Vibrant Purple
//     '&:hover': {
//       backgroundColor: '#5A009D', // A slightly darker purple for hover
//     },
//     padding: '4px 10px', // Reduced button height
//     height: '32px', // Explicitly set height
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

//   const handleCountryChange = (event) => {
//     const countryId = event.target.value;
//     const countryName = countries.find(c => c.country_id === countryId)?.country_name;
//     setCurrentEmployee(prev => ({ ...prev, country_id: countryId, state_id: "", employee_hub_id: "" }));
//     setStates([]);
//     setEmployeeHubs([]);
//     if (countryName) {
//       axiosInstance.get(`api/states/?country_name=${countryName}`)
//         .then(res => {
//           if (res.data.status === "success") {
//             setStates(res.data.data || []);
//           }
//         })
//         .catch(err => {
//           console.error("Error fetching states:", err);
//           Swal.fire('Error', 'Failed to fetch states for the selected country.', 'error');
//         });
//     }
//   };

//   const handleStateChange = (event) => {
//     const stateId = event.target.value;
//     setCurrentEmployee(prev => ({ ...prev, state_id: stateId, employee_hub_id: "" }));
//     setEmployeeHubs([]);
//     if (stateId) {
//       axiosInstance.get(`api/employee_hub_dropdown/${stateId}/`)
//         .then(res => {
//           if (res.data.status === "success") {
//             setEmployeeHubs(res.data.data || []);
//           }
//         })
//         .catch(err => {
//           console.error("Error fetching employee hubs:", err);
//           Swal.fire('Error', 'Failed to fetch employee hubs for the selected state.', 'error');
//         });
//     }
//   };

//   const handleDeptChange = (event) => {
//     const deptId = Number(event.target.value);
//     setCurrentEmployee((prev) => ({ ...prev, department_id: deptId, designation_id: "" }));
//     if (deptId) {
//       axiosInstance.get(`api/desig_dept_dropdown/?dept_id=${deptId}/`)
//         .then((res) => setDesignations(res.data.desig_data || []))
//         .catch((err) => {
//           console.error("Error fetching designations:", err);
//           Swal.fire({
//             icon: 'error',
//             title: 'Error',
//             text: 'Failed to load designations for the selected department.',
//             target: employeeDialogRef.current
//           });
//         });
//     } else {
//       setDesignations([]);
//     }
//   };

//   const handleChangeManager = async () => {
//     if (!selectedEmployeeForManagerChange || !newManager) {
//       Swal.fire({
//         icon: 'warning',
//         title: 'Incomplete Selection',
//         text: 'Please select both an employee and a new manager.',
//         target: changeManagerDialogRef.current
//       });
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
//       Swal.fire({
//         icon: 'error',
//         title: 'Operation Failed',
//         text: `Error changing manager: ${error.response?.data?.message || "An error occurred."}`,
//         target: changeManagerDialogRef.current
//       });
//     }
//   };

//   const handleRowHover = (id) => setHoveredRowId(id);
//   const handleRowLeave = () => setHoveredRowId(null);

//   const navigate = useNavigate();
//   const handleArrowClick = (id) => navigate(`/hrms/admindashboard/employeedetail/${id}`);

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     const numericFields = ['role', 'status', 'department_id', 'designation_id', 'manager_id', 'country_id', 'state_id','employee_hub_id', 'employee_hub_id', 'division_id', 'officeShift'];
//     const finalValue = numericFields.includes(name) ? Number(value) : value;
//     setCurrentEmployee((prev) => ({ ...prev, [name]: finalValue }));
//   };

//  const handleAddEmployee = async () => {
//   try {
//     const [maxIdResponse, headquartersResponse] = await Promise.all([ // Use Promise.all here for efficiency
//       axiosInstance.get("api/get_max_employee_id/"),
//       axiosInstance.get('https://tdtlworld.com/hrms-backend/api/headquarters/') // ADD THIS LINE
//     ]);

//     const maxEmpId = maxIdResponse.data.employee_id[0];
//     const numericPart = parseInt(maxEmpId.substring(1), 10);
//     const nextEmpId = "V" + (numericPart + 1);

//     setHeadquarters(headquartersResponse.data || []); 

//     setCurrentEmployee({
//       emp_id: nextEmpId, firstName: "", middleName: "", lastName: "", email: "", phone: "",
//       avatar: null, officeShift: "", status: 1, join_date: "", gender: "", username: nextEmpId,
//       password: "", role: "", grossSalary: "", department_id: "", designation_id: "",
//       manager_id: "", country_id: "", state_id: "", employee_hub_id: "", headquarter_id: "", division_id: "", company_id: 2,
//       is_probation: "n", resumeUrl: "", subDivision: "",
//     });
//     setDesignations([]);
//     setStates([]);
//     setEmployeeHubs([]);
//     setEmployeeDocuments(null);
//     setIsEditMode(false);
//     setShowPassword(false);
//     setOpenEmployeeForm(true);
//   } catch (error) {
//     console.error("Error fetching max employee ID or headquarters:", error); // Update error message
//     Swal.fire('Error', 'Failed to initialize employee form. Please try again.', 'error');
//   }
// };

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
//       ...prev,
//       firstName: talent.first_name || "", middleName: talent.middle_name || "",
//       lastName: talent.last_name || "", email: talent.email || "",
//       phone: talent.phone || "", gender: talent.gender || "",
//       country_id: selectedCountry ? selectedCountry.country_id : "",
//       state_id: '',
//       employee_hub_id: '',
//       resumeUrl: resumeLink,
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
//             if (hubsRes.data.status === "success") {
//               setEmployeeHubs(hubsRes.data.data || []);
//             }
//           }
//         }
//       } catch (err) {
//         console.error("Error fetching dependent data for talent:", err);
//       }
//     }

//     setIsFetchingDocs(true);
//     try {
//       const docResponse = await axios.post('https://raasbackend.vetrinahealthcare.com/fetch_documents/', { email_id: talent.email });
//       if (docResponse.data.status === 'success' && docResponse.data.documents) {
//         setEmployeeDocuments(docResponse.data.documents);
//       } else {
//         setEmployeeDocuments(null);
//       }
//     } catch (error) {
//       console.error("Error fetching documents:", error);
//       Swal.fire({
//         icon: 'error',
//         title: 'Document Fetch Failed',
//         text: 'Failed to fetch documents for the selected talent.',
//         target: employeeDialogRef.current
//       });
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

//     const [desigRes, statesRes, hubsRes, headquartersRes] = await Promise.all([ // ADD headquartersRes here
//       axiosInstance.get(`api/desig_dept_dropdown/?dept_id=${empData.department_id}/`),
//       axiosInstance.get(`api/states/?country_name=${empData.country_name}`),
//       axiosInstance.get(`api/employee_hub_dropdown/${empData.state}/`),
//       axiosInstance.get('https://tdtlworld.com/hrms-backend/api/headquarters/') // ADD THIS LINE
//     ]);

//     setDesignations(desigRes.data.desig_data || []);
//     setStates(statesRes.data.data || []);
//     setEmployeeHubs(hubsRes.data.data || []);

//     // if (headquartersRes.data?.status === "success") { // ADD THIS BLOCK
//     //     setHeadquarters(headquartersRes.data.data || []);
//     // } else {
//     //     console.error("Failed to fetch headquarters data during edit:", headquartersRes.data);
//     //     Swal.fire('Error', 'Failed to load headquarters for editing.', 'error');
//     // }

//      // Corrected logic for headquarters: API returns a direct array
//     setHeadquarters(headquartersRes.data || []); 

//     const officeShiftObj = officeShifts.find(s => s.office_shift_name === empData.office_shift);
//     const nameParts = (empData.emp_name || "").split(" ");
//     const selectedCountry = countries.find(c => c.country_name === empData.country_name);

//     setCurrentEmployee({
//       id: employee.user_id,
//       firstName: nameParts[0] || "",
//       middleName: nameParts.length > 2 ? nameParts.slice(1, -1).join(" ") : "",
//       lastName: nameParts.length > 1 ? nameParts[nameParts.length - 1] : "",
//       email: empData.email || "",
//       phone: empData.phone || "",
//       manager_id: Number(empData.manager_id) || "",
//       designation_id: Number(empData.designation_id) || "",
//       department_id: Number(empData.department_id) || "",
//       officeShift: officeShiftObj ? Number(officeShiftObj.office_shift_id) : "",
//       status: Number(empData.status),
//       join_date: empData.join_date ? empData.join_date.split(" ")[0] : "",
//       country_id: selectedCountry ? Number(selectedCountry.country_id) : "",
//       state_id: Number(empData.state) || "",
//       employee_hub_id: Number(empData.employee_hub_id) || "",
//       headquarter_id: Number(empData.headquarter_id) || "",
//       division_id: Number(empData.division_id) || "",
//       subDivision: empData.sub_division || "",
//       avatar: empData.profile_photo || "",
//       role: Number(empData.role_id) || "",
//       is_probation: empData.probation?.toLowerCase() === 'y' ? 'y' : 'n',
//       resumeUrl: "",
//     });

//     setIsEditMode(true);
//     setOpenEmployeeForm(true);
//     setShowPassword(false);

//   } catch (error) {
//     console.error("Error fetching employee details for edit:", error);
//     Swal.fire('Error', 'Failed to fetch complete employee details. Please try again.', 'error');
//   }
// };

//   const handleSaveEmployee = async () => {
//     if (!isEditMode) {
//       const requiredFields = {
//         firstName: 'First Name', lastName: 'Last Name', email: 'Email', phone: 'Phone',
//         country_id: 'Country', state_id: 'State', employee_hub_id: 'Employee Hub',headquarter_id: 'Headquarter', division_id: 'Division',
//         subDivision: 'Sub Division',
//         manager_id: 'Manager', department_id: 'Department', designation_id: 'Designation',
//         officeShift: 'Office Shift', join_date: 'Join Date', avatar: 'Photo',
//         gender: 'Gender', username: 'Username', password: 'Password',
//         role: 'Role', grossSalary: 'Gross Salary'
//       };

//       for (const field in requiredFields) {
//         if (!currentEmployee[field]) {
//           Swal.fire({
//             icon: 'error',
//             title: 'Validation Error',
//             text: `The field "${requiredFields[field]}" is required.`,
//             target: employeeDialogRef.current
//           });
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
//       Swal.fire({
//         icon: 'error',
//         title: `Operation failed`,
//         text: `${errorMessage}`,
//         target: employeeDialogRef.current
//       });
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   const handleDeleteEmployee = (employeeId) => {
//     if (!employeeId) return;
//     Swal.fire({
//       title: 'Are you sure?',
//       text: "You won't be able to revert this!",
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#3085d6',
//       cancelButtonColor: '#d33',
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

//   return (
//     <>

//       <Box sx={{ mt: 2 }}>
//         <Box sx={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 2, mb: 3 }}>
//           <Typography
//             sx={{
//               fontWeight: "bold", // makes it bold
//               fontFamily: "Arial, sans-serif",
//               fontSize: {
//                 xs: "1.75rem", // ~20px for extra small screens
//                 sm: "1.75rem", // ~28px for small screens
//                 md: "2rem",    // ~32px for medium screens
//                 lg: "2.5rem",  // ~40px for large screens
//               },
//             }}
//           >
//             Employees List
//           </Typography>

//           <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
//             <Button variant="contained" startIcon={<DownloadIcon />} onClick={handleExportEmployees} sx={purpleButtonSx}>Export</Button>
//             <Button variant="contained" startIcon={<ChangeManagerIcon />} onClick={() => setOpenChangeManagerForm(true)} sx={purpleButtonSx}>Change Manager</Button>
//             <Button variant="contained" startIcon={<AddIcon />} onClick={handleAddEmployee} sx={purpleButtonSx}>Add Employee</Button>
//           </Box>
//         </Box>

//         <Dialog
//           open={openChangeManagerForm}
//           onClose={() => setOpenChangeManagerForm(false)}
//           maxWidth="sm"
//           fullWidth
//           ref={changeManagerDialogRef}
//         >
//           <DialogTitle>Change Manager<IconButton onClick={() => setOpenChangeManagerForm(false)} sx={{ position: "absolute", right: 8, top: 8 }}><CloseIcon /></IconButton></DialogTitle>
//           <DialogContent><Grid container spacing={2} sx={{ mt: 1 }}><Grid item xs={12}><FormControl fullWidth><InputLabel>Select Employee</InputLabel><Select value={selectedEmployeeForManagerChange} onChange={(e) => setSelectedEmployeeForManagerChange(e.target.value)} label="Select Employee">{allEmployeesForDropdown.map((emp) => (<MenuItem key={emp.value} value={emp.value}>{emp.label}</MenuItem>))}</Select></FormControl></Grid><Grid item xs={12}><FormControl fullWidth><InputLabel>Select New Manager</InputLabel><Select value={newManager} onChange={(e) => setNewManager(e.target.value)} label="Select New Manager">{allEmployeesForDropdown.map((emp) => (<MenuItem key={emp.value} value={emp.value}>{emp.label}</MenuItem>))}</Select></FormControl></Grid></Grid></DialogContent>
//           <DialogActions>
//             <Button onClick={() => setOpenChangeManagerForm(false)} sx={cancelRedTextSx}>Cancel</Button>
//             <Button onClick={handleChangeManager} variant="contained" sx={purpleButtonSx}>Save</Button>
//           </DialogActions>
//         </Dialog>

//         <Dialog
//           open={openEmployeeForm}
//           onClose={() => setOpenEmployeeForm(false)}
//           maxWidth="md"
//           fullWidth
//           ref={employeeDialogRef}
//         >
//           <DialogTitle>{isEditMode ? "Edit Employee" : "Add Employee"}<IconButton onClick={() => setOpenEmployeeForm(false)} sx={{ position: "absolute", right: 8, top: 8 }}><CloseIcon /></IconButton></DialogTitle>
//           <DialogContent>
//             <Grid container spacing={2} sx={{ mt: 1 }}>
//               {!isEditMode && (<Grid item xs={12}><Autocomplete
//                 options={talentPool}
//                 getOptionLabel={(option) => option.email || ""}
//                 onChange={handleTalentSelect}
//                 onInputChange={(event, newInputValue) => {
//                   if (!talentPool.find(p => p.email === newInputValue)) {
//                     setCurrentEmployee(prev => ({ ...prev, email: newInputValue }));
//                   }
//                 }}
//                 renderInput={(params) => (<TextField {...params} label="Search Email to Auto-fill" />)} />
//               </Grid>)}
//             <Grid item xs={12} sm={4}>
//   <TextField
//     fullWidth
//     label="First Name"
//     name="firstName"
//     value={currentEmployee.firstName || ""}
//     onChange={handleInputChange}
//     onKeyPress={(e) => {
//       if (!/^[A-Za-z]$/.test(e.key)) {
//         e.preventDefault();
//       }
//     }}
//     InputProps={{ readOnly: isEditMode }}
//   />
// </Grid>

// <Grid item xs={12} sm={4}>
//   <TextField
//     fullWidth
//     label="Middle Name"
//     name="middleName"
//     value={currentEmployee.middleName || ""}
//     onChange={handleInputChange}
//     onKeyPress={(e) => {
//       if (!/^[A-Za-z]$/.test(e.key)) {
//         e.preventDefault();
//       }
//     }}
//     InputProps={{ readOnly: isEditMode }}
//   />
// </Grid>

// <Grid item xs={12} sm={4}>
//   <TextField
//     fullWidth
//     label="Last Name"
//     name="lastName"
//     value={currentEmployee.lastName || ""}
//     onChange={handleInputChange}
//     onKeyPress={(e) => {
//       if (!/^[A-Za-z]$/.test(e.key)) {
//         e.preventDefault();
//       }
//     }}
//     InputProps={{ readOnly: isEditMode }}
//   />
// </Grid>

//               <Grid item xs={12} sm={6}><TextField fullWidth label="Email" name="email" value={currentEmployee.email || ''} onChange={handleInputChange} InputProps={{ readOnly: isEditMode || !!talentPool.find(p => p.email === currentEmployee.email) }} /></Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   fullWidth
//                   label="Phone"
//                   name="phone"
//                   value={currentEmployee.phone || ''}
//                   onChange={(e) => {
//                     const value = e.target.value;
//                     // Allow only digits and max 10 length
//                     if (/^\d{0,10}$/.test(value)) {
//                       handleInputChange(e);
//                     }
//                   }}
//                   inputProps={{ maxLength: 10, inputMode: 'numeric', pattern: '[0-9]*' }}
//                   InputProps={{ readOnly: isEditMode }}
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <FormControl fullWidth>
//                   <InputLabel>Country</InputLabel>
//                   <Select name="country_id" value={currentEmployee.country_id || ""} onChange={handleCountryChange} label="Country">
//                     {countries.map((c) => (<MenuItem key={c.country_id} value={c.country_id}>{c.country_name}</MenuItem>))}
//                   </Select>
//                 </FormControl>
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <FormControl fullWidth disabled={!currentEmployee.country_id}>
//                   <InputLabel>State</InputLabel>
//                   <Select name="state_id" value={currentEmployee.state_id || ""} onChange={handleStateChange} label="State">
//                     {states.map((s) => (<MenuItem key={s.state_id} value={s.state_id}>{s.state_name}</MenuItem>))}
//                   </Select>
//                 </FormControl>
//               </Grid>
//               <Grid item xs={12} sm={6}><FormControl fullWidth disabled={!currentEmployee.state_id}><InputLabel>Employee Hub</InputLabel><Select name="employee_hub_id" value={currentEmployee.employee_hub_id || ""} onChange={handleInputChange} label="Employee Hub">{employeeHubs.map((h) => (<MenuItem key={h.employee_hub_id} value={h.employee_hub_id}>{h.employee_hub_name}</MenuItem>))}</Select></FormControl></Grid>
// <Grid item xs={12} sm={6}>
//   <FormControl fullWidth>
//     <InputLabel>Headquarter</InputLabel>
//     <Select
//       name="headquarter_id"
//       value={currentEmployee.headquarter_id || ""}
//       onChange={handleInputChange}
//       label="Headquarter"
//     >
//        {headquarters.map((hq) => (
//         <MenuItem key={hq.headquarter_id} value={hq.headquarter_id}>
//           {hq.headquarter_name}
//         </MenuItem>
//       ))}
//     </Select>
//   </FormControl>
// </Grid>        

//   <Grid item xs={12} sm={6}><FormControl fullWidth><InputLabel>Division</InputLabel><Select name="division_id" value={currentEmployee.division_id || ""} onChange={handleInputChange} label="Division">{divisions.map((d) => (<MenuItem key={d.division_id} value={d.division_id}>{d.division_name}</MenuItem>))}</Select></FormControl></Grid>
//               {/* NEW SUB DIVISION DROPDOWN */}
//               <Grid item xs={12} sm={6}>
//                 <FormControl fullWidth>
//                   <InputLabel>Sub Division</InputLabel>
//                   <Select
//                     name="subDivision" // Match the state field name
//                     value={currentEmployee.subDivision || ""}
//                     onChange={handleInputChange}
//                     label="Sub Division"
//                   >
//                     <MenuItem value="VetBiz">VetBiz</MenuItem>
//                     <MenuItem value="TredBiz">TredBiz</MenuItem>
//                     <MenuItem value=" ">TredBiz Mix</MenuItem>
//                   </Select>
//                 </FormControl>
//               </Grid>
//               {/* END NEW SUB DIVISION DROPDOWN */}
//               <Grid item xs={12} sm={6}><FormControl fullWidth><InputLabel>Manager</InputLabel><Select name="manager_id" value={currentEmployee.manager_id || ""} onChange={handleInputChange} label="Manager">{allEmployeesForDropdown.map((e) => (<MenuItem key={e.value} value={e.value}>{e.label}</MenuItem>))}</Select></FormControl></Grid>
//               <Grid item xs={12} sm={6}><FormControl fullWidth><InputLabel>Manager</InputLabel><Select name="manager_id" value={currentEmployee.manager_id || ""} onChange={handleInputChange} label="Manager">{allEmployeesForDropdown.map((e) => (<MenuItem key={e.value} value={e.value}>{e.label}</MenuItem>))}</Select></FormControl></Grid>
//               <Grid item xs={12} sm={6}><FormControl fullWidth><InputLabel>Department</InputLabel><Select name="department_id" value={currentEmployee.department_id || ""} onChange={handleDeptChange} label="Department">{departments.map((d) => (<MenuItem key={d.dept_id} value={d.dept_id}>{d.dept_name}</MenuItem>))}</Select></FormControl></Grid>
//               <Grid item xs={12} sm={6}><FormControl fullWidth disabled={!currentEmployee.department_id}><InputLabel>Designation</InputLabel><Select name="designation_id" value={currentEmployee.designation_id || ""} onChange={handleInputChange} label="Designation">{designations.map((d) => (<MenuItem key={d.desig_id} value={d.desig_id}>{d.desig_name}</MenuItem>))}</Select></FormControl></Grid>
//               <Grid item xs={12} sm={6}><FormControl fullWidth><InputLabel>Office Shift</InputLabel><Select name="officeShift" value={currentEmployee.officeShift || ""} onChange={handleInputChange} label="Office Shift">{officeShifts.map((s) => (<MenuItem key={s.office_shift_id} value={s.office_shift_id}>{s.office_shift_name}</MenuItem>))}</Select></FormControl></Grid>
//               <Grid item xs={12} sm={6}><FormControl fullWidth><InputLabel>Status</InputLabel><Select name="status" value={currentEmployee.status} onChange={handleInputChange} label="Status"><MenuItem value={1}>Active</MenuItem><MenuItem value={0}>Inactive</MenuItem></Select></FormControl></Grid>
//               <Grid item xs={12} sm={6}><FormControl fullWidth><InputLabel>On Probation</InputLabel><Select name="is_probation" value={currentEmployee.is_probation} onChange={handleInputChange} label="On Probation"><MenuItem value={"y"}>Yes</MenuItem><MenuItem value={"n"}>No</MenuItem></Select></FormControl></Grid>
//               <Grid item xs={12} sm={6}><TextField fullWidth label="Join Date" name="join_date" type="date" value={currentEmployee.join_date || ""} onChange={handleInputChange} InputLabelProps={{ shrink: true }} /></Grid>
//               <Grid item xs={12} sm={6}><Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}><Button variant="contained" component="label" disabled={isEditMode} sx={purpleButtonSx}>Upload Photo<input type="file" hidden accept="image/*" onChange={handleFileUpload} /></Button>{currentEmployee.avatar && <Avatar src={typeof currentEmployee.avatar === 'string' ? currentEmployee.avatar : URL.createObjectURL(currentEmployee.avatar)} sx={{ width: 56, height: 56 }} />}</Box></Grid>
//               <Grid item xs={12}>{isFetchingDocs && <CircularProgress />}{employeeDocuments && !isFetchingDocs && (<Box><Typography variant="subtitle1" gutterBottom>Fetched Documents</Typography><Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>{Object.entries(employeeDocuments).map(([name, url]) => (url ? (<Chip key={name} label={name.replace(/_/g, ' ')} component="a" href={url} target="_blank" clickable icon={<LinkIcon />} variant="outlined" color="secondary" size="small" />) : null))}</Box></Box>)}</Grid>
//               {!isEditMode && (<>
//                 <Grid item xs={12} sm={6}><FormControl fullWidth><InputLabel>Gender</InputLabel><Select name="gender" value={currentEmployee.gender || ""} onChange={handleInputChange} label="Gender"><MenuItem value="Male">Male</MenuItem><MenuItem value="Female">Female</MenuItem><MenuItem value="Other">Other</MenuItem></Select></FormControl></Grid>
//                 <Grid item xs={12} sm={6}>
//                   <TextField
//                     fullWidth
//                     label="Username"
//                     name="username"
//                     value={currentEmployee.username || ""}
//                     InputProps={{
//                       readOnly: true,
//                     }}
//                   />
//                 </Grid>
//                 <Grid item xs={12} sm={6}><TextField fullWidth label="Password" name="password" value={currentEmployee.password || ""} onChange={handleInputChange} type={showPassword ? 'text' : 'password'} InputProps={{ endAdornment: (<InputAdornment position="end"> <IconButton aria-label="toggle password visibility" onClick={() => setShowPassword((prev) => !prev)} onMouseDown={(e) => e.preventDefault()} edge="end"> {showPassword ? <VisibilityOff /> : <Visibility />} </IconButton> </InputAdornment>) }} /></Grid>
//                 <Grid item xs={12} sm={6}><FormControl fullWidth><InputLabel>Role</InputLabel><Select name="role" value={currentEmployee.role || ""} onChange={handleInputChange} label="Role">{roles.map((role) => (<MenuItem key={role.index} value={role.index}>{role.role_name}</MenuItem>))}</Select></FormControl></Grid>
//                 <Grid item xs={12} sm={6}>
//                   <TextField
//                     fullWidth
//                     label="Gross Salary"
//                     name="grossSalary"
//                     type="number"
//                     value={currentEmployee.grossSalary || ""}
//                     onChange={(e) => {
//                       const value = e.target.value;
//                       if (/^\d*\.?\d*$/.test(value)) {
//                         handleInputChange(e);
//                       }
//                     }}
//                   />
//                 </Grid>
//               </>)}
//             </Grid>
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={() => setOpenEmployeeForm(false)} disabled={isSaving} sx={cancelRedTextSx}>Cancel</Button>
//             <Button onClick={handleSaveEmployee} variant="contained" disabled={isSaving} sx={purpleButtonSx}>
//               {isSaving ? <CircularProgress size={24} color="inherit" /> : "Save"}
//             </Button>
//           </DialogActions>
//         </Dialog>

//         <Paper sx={{ width: "100%", mb: 2 }}>
//           <Box sx={{ p: 2, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: 'wrap', gap: 2 }}>
//             <TextField
//               label="Search"
//               placeholder="Search by any value..."
//               variant="outlined"
//               size="small"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               sx={{
//                 width: { xs: '100%', sm: 'auto' },
//                 order: { xs: 1, sm: 2 } // On mobile, it's the first item. On larger screens, it's the second.
//               }}
//             />
//             <FormControl
//               sx={{
//                 minWidth: 90,
//                 order: { xs: 2, sm: 1 } // On mobile, it's the second item. On larger screens, it's the first.
//               }}
//               size="small"
//             >
//               <InputLabel>Rows</InputLabel>
//               <Select value={rowsPerPage} label="Rows" onChange={handleRowsPerPageChange}>
//                 <MenuItem value={5}>5</MenuItem>
//                 <MenuItem value={10}>10</MenuItem>
//                 <MenuItem value={25}>25</MenuItem>
//                 <MenuItem value={50}>50</MenuItem>
//               </Select>
//             </FormControl>
//           </Box>

//           <TableContainer>
//             <Table size="small" sx={{
//               minWidth: "100%",
//               whiteSpace: "nowrap",
//               "& .MuiTableCell-root": {
//                 padding: "4px 8px",
//                 fontSize: '0.8rem',
//               },
//             }}>
//               <TableHead>
//                 <TableRow sx={{ bgcolor: '#f5f5f5' }}>
//                   <TableCell sx={{ fontWeight: 'bold', width: '5%', fontSize: '0.9rem' }}>SR. NO.</TableCell>
//                   <TableCell sx={{ fontWeight: 'bold', width: '25%', fontSize: '0.9rem' }}>EMPLOYEE</TableCell>
//                   <TableCell sx={{ width: '5%' }}></TableCell>
//                   <TableCell sx={{ fontWeight: 'bold', width: '15%', fontSize: '0.9rem' }}>DEPARTMENT</TableCell>
//                   <TableCell sx={{ fontWeight: 'bold', width: '15%', fontSize: '0.9rem' }}>DESIGNATION</TableCell>
//                   <TableCell sx={{ fontWeight: 'bold', width: '10%', fontSize: '0.9rem' }}>JOIN DATE</TableCell>
//                   <TableCell sx={{ fontWeight: 'bold', width: '10%', fontSize: '0.9rem' }}>STATUS</TableCell>
//                   <TableCell sx={{ fontWeight: 'bold', width: '15%', fontSize: '0.9rem' }}>MANAGER</TableCell>
//                   <TableCell sx={{ fontWeight: 'bold', width: '10%', fontSize: '0.9rem', textAlign: 'center' }}>ACTIONS</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {currentEmployees.map((employee, index) => (
//                   <TableRow
//                     key={employee.user_id}
//                     onMouseEnter={() => handleRowHover(employee.user_id)}
//                     onMouseLeave={handleRowLeave}
//                     sx={{ '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' } }}
//                   >
//                     <TableCell>{indexOfFirstEmployee + index + 1}</TableCell>
//                     <TableCell>
//                       <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
//                         <Typography variant="body2">{employee.employee_name}</Typography>
//                       </Box>
//                     </TableCell>
//                     <TableCell sx={{ padding: '0 8px', textAlign: 'center' }}>
//                       {hoveredRowId === employee.user_id && (
//                         <IconButton
//                           onClick={() => handleArrowClick(employee.user_id)}
//                           size="small"
//                           sx={{
//                             color: '#E55D87',
//                             transition: 'all 0.2s ease-in-out',
//                             '&:hover': {
//                               backgroundColor: 'rgba(229, 93, 135, 0.1)',
//                               transform: 'scale(1.1)',
//                             },
//                             '&:active': {
//                               color: '#c2185b',
//                               boxShadow: '0 0 10px 2px rgba(194, 24, 91, 0.5)',
//                             }
//                           }}
//                         >
//                           <ArrowForwardIcon fontSize="small" />
//                         </IconButton>
//                       )}
//                     </TableCell>
//                     <TableCell>{employee.department_name || 'N/A'}</TableCell>
//                     <TableCell>{employee.designation_name || 'N/A'}</TableCell>
//                     <TableCell>{employee.join_date}</TableCell>
//                     <TableCell>
//                       <Chip label={employee.status === 1 ? "Active" : "Inactive"} color={employee.status === 1 ? "success" : "error"} size="small" />
//                     </TableCell>
//                     <TableCell>{employee.manager}</TableCell>
//                     <TableCell sx={{ textAlign: 'center' }}>
//                       <Tooltip title="Edit"><IconButton onClick={() => handleEditEmployee(employee)} color="primary"><EditIcon /></IconButton></Tooltip>
//                       <Tooltip title="Delete"><IconButton onClick={() => handleDeleteEmployee(employee.user_id)} color="error"><DeleteIcon /></IconButton></Tooltip>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         </Paper>
//       </Box>
//       <Box sx={{ display: "flex", justifyContent: { xs: 'center', md: 'space-between' }, alignItems: "center", flexWrap: 'wrap', gap: 2, mt: 2 }}>
//         <Typography variant="body2">
//           Showing{" "}
//           <Box component="span" sx={{ fontWeight: "bold" }}>
//             {filteredEmployees.length > 0 ? indexOfFirstEmployee + 1 : 0}
//           </Box>{" "}
//           -{" "}
//           <Box component="span" sx={{ fontWeight: "bold" }}>
//             {Math.min(indexOfLastEmployee, filteredEmployees.length)}
//           </Box>{" "}
//           of{" "}
//           <Box component="span" sx={{ fontWeight: "bold" }}>
//             {filteredEmployees.length}
//           </Box>{" "}
//           Employees
//         </Typography>
//         <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//           <Button variant="contained" disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)} sx={purpleButtonSx}>Previous</Button>
//           <Typography sx={{ mx: 1 }}>Page {currentPage}</Typography>
//           <Button variant="contained" disabled={indexOfLastEmployee >= filteredEmployees.length} onClick={() => setCurrentPage(currentPage + 1)} sx={purpleButtonSx}>Next</Button>
//         </Box>
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

// const getInitials = (name = "") => {
//   const nameParts = name.split(' ').filter(Boolean);
//   if (nameParts.length === 0) return '';
//   if (nameParts.length === 1) return nameParts[0][0].toUpperCase();
//   return (nameParts[0][0] + nameParts[nameParts.length - 1][0]).toUpperCase();
// };

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

//   const handleCountryChange = (event) => {
//     const countryId = event.target.value;
//     const countryName = countries.find(c => c.country_id === countryId)?.country_name;
//     setCurrentEmployee(prev => ({ ...prev, country_id: countryId, state_id: "", employee_hub_id: "" }));
//     setStates([]);
//     setEmployeeHubs([]);
//     if (countryName) {
//       axiosInstance.get(`api/states/?country_name=${countryName}`)
//         .then(res => {
//           if (res.data.status === "success") {
//             setStates(res.data.data || []);
//           }
//         })
//         .catch(err => {
//           console.error("Error fetching states:", err);
//           Swal.fire('Error', 'Failed to fetch states for the selected country.', 'error');
//         });
//     }
//   };

//   const handleStateChange = (event) => {
//     const stateId = event.target.value;
//     setCurrentEmployee(prev => ({ ...prev, state_id: stateId, employee_hub_id: "" }));
//     setEmployeeHubs([]);
//     if (stateId) {
//       axiosInstance.get(`api/employee_hub_dropdown/${stateId}/`)
//         .then(res => {
//           if (res.data.status === "success") {
//             setEmployeeHubs(res.data.data || []);
//           }
//         })
//         .catch(err => {
//           console.error("Error fetching employee hubs:", err);
//           Swal.fire('Error', 'Failed to fetch employee hubs for the selected state.', 'error');
//         });
//     }
//   };

//   const handleDeptChange = (event) => {
//     const deptId = Number(event.target.value);
//     setCurrentEmployee((prev) => ({ ...prev, department_id: deptId, designation_id: "" }));
//     if (deptId) {
//       axiosInstance.get(`api/desig_dept_dropdown/?dept_id=${deptId}/`)
//         .then((res) => setDesignations(res.data.desig_data || []))
//         .catch((err) => {
//           console.error("Error fetching designations:", err);
//           Swal.fire({
//             icon: 'error',
//             title: 'Error',
//             text: 'Failed to load designations for the selected department.',
//             target: employeeDialogRef.current
//           });
//         });
//     } else {
//       setDesignations([]);
//     }
//   };

//   const handleChangeManager = async () => {
//     if (!selectedEmployeeForManagerChange || !newManager) {
//       Swal.fire({
//         icon: 'warning',
//         title: 'Incomplete Selection',
//         text: 'Please select both an employee and a new manager.',
//         target: changeManagerDialogRef.current
//       });
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
//       Swal.fire({
//         icon: 'error',
//         title: 'Operation Failed',
//         text: `Error changing manager: ${error.response?.data?.message || "An error occurred."}`,
//         target: changeManagerDialogRef.current
//       });
//     }
//   };

//   const handleRowHover = (id) => setHoveredRowId(id);
//   const handleRowLeave = () => setHoveredRowId(null);

//   const navigate = useNavigate();
//   const handleArrowClick = (id) => navigate(`/hrms/admindashboard/employeedetail/${id}`);

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     const numericFields = ['role', 'status', 'department_id', 'designation_id', 'manager_id', 'country_id', 'state_id','employee_hub_id', 'division_id', 'officeShift', 'headquarter_id'];
//     const finalValue = numericFields.includes(name) ? Number(value) : value;
//     setCurrentEmployee((prev) => ({ ...prev, [name]: finalValue }));
//   };
 
//   const handleDivisionChange = (event) => {
//     const divisionId = Number(event.target.value);
//     const selectedDivision = divisions.find(d => d.division_id === divisionId);

//     if (selectedDivision && selectedDivision.division_name !== 'Livestock') {
//         setCurrentEmployee(prev => ({ ...prev, division_id: divisionId, subDivision: "" }));
//     } else {
//         setCurrentEmployee(prev => ({ ...prev, division_id: divisionId }));
//     }
// };

//  const handleAddEmployee = async () => {
//   try {
//     const [maxIdResponse, headquartersResponse] = await Promise.all([
//       axiosInstance.get("api/get_max_employee_id/"),
//       axiosInstance.get('https://tdtlworld.com/hrms-backend/api/headquarters/')
//     ]);

//     const maxEmpId = maxIdResponse.data.employee_id[0];
//     const numericPart = parseInt(maxEmpId.substring(1), 10);
//     const nextEmpId = "V" + (numericPart + 1);

//     setHeadquarters(headquartersResponse.data || []);

//     setCurrentEmployee({
//       emp_id: nextEmpId, firstName: "", middleName: "", lastName: "", email: "", phone: "",
//       avatar: null, officeShift: "", status: 1, join_date: "", gender: "", username: nextEmpId,
//       password: "", role: "", grossSalary: "", department_id: "", designation_id: "",
//       manager_id: "", country_id: "", state_id: "", employee_hub_id: "", headquarter_id: "", division_id: "", company_id: 2,
//       is_probation: "n", resumeUrl: "", subDivision: "",
//     });
//     setDesignations([]);
//     setStates([]);
//     setEmployeeHubs([]);
//     setEmployeeDocuments(null);
//     setIsEditMode(false);
//     setShowPassword(false);
//     setOpenEmployeeForm(true);
//   } catch (error) {
//     console.error("Error fetching max employee ID or headquarters:", error);
//     Swal.fire('Error', 'Failed to initialize employee form. Please try again.', 'error');
//   }
// };

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
//       ...prev,
//       firstName: talent.first_name || "", middleName: talent.middle_name || "",
//       lastName: talent.last_name || "", email: talent.email || "",
//       phone: talent.phone || "", gender: talent.gender || "",
//       country_id: selectedCountry ? selectedCountry.country_id : "",
//       state_id: '',
//       employee_hub_id: '',
//       resumeUrl: resumeLink,
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
//             if (hubsRes.data.status === "success") {
//               setEmployeeHubs(hubsRes.data.data || []);
//             }
//           }
//         }
//       } catch (err) {
//         console.error("Error fetching dependent data for talent:", err);
//       }
//     }

//     setIsFetchingDocs(true);
//     try {
//       const docResponse = await axios.post('https://raasbackend.vetrinahealthcare.com/fetch_documents/', { email_id: talent.email });
//       if (docResponse.data.status === 'success' && docResponse.data.documents) {
//         setEmployeeDocuments(docResponse.data.documents);
//       } else {
//         setEmployeeDocuments(null);
//       }
//     } catch (error) {
//       console.error("Error fetching documents:", error);
//       Swal.fire({
//         icon: 'error',
//         title: 'Document Fetch Failed',
//         text: 'Failed to fetch documents for the selected talent.',
//         target: employeeDialogRef.current
//       });
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
//       firstName: nameParts[0] || "",
//       middleName: nameParts.length > 2 ? nameParts.slice(1, -1).join(" ") : "",
//       lastName: nameParts.length > 1 ? nameParts[nameParts.length - 1] : "",
//       email: empData.email || "",
//       phone: empData.phone || "",
//       manager_id: Number(empData.manager_id) || "",
//       designation_id: Number(empData.designation_id) || "",
//       department_id: Number(empData.department_id) || "",
//       officeShift: officeShiftObj ? Number(officeShiftObj.office_shift_id) : "",
//       status: Number(empData.status),
//       join_date: empData.join_date ? empData.join_date.split(" ")[0] : "",
//       country_id: selectedCountry ? Number(selectedCountry.country_id) : "",
//       state_id: Number(empData.state) || "",
//       employee_hub_id: Number(empData.employee_hub_id) || "",
//       headquarter_id: Number(empData.headquarter_id) || "",
//       division_id: Number(empData.division_id) || "",
//       subDivision: empData.sub_division || "",
//       avatar: empData.profile_photo || "",
//       role: Number(empData.role_id) || "",
//       is_probation: empData.probation?.toLowerCase() === 'y' ? 'y' : 'n',
//       resumeUrl: "",
//     });

//     setIsEditMode(true);
//     setOpenEmployeeForm(true);
//     setShowPassword(false);

//   } catch (error) {
//     console.error("Error fetching employee details for edit:", error);
//     Swal.fire('Error', 'Failed to fetch complete employee details. Please try again.', 'error');
//   }
// };

//   const handleSaveEmployee = async () => {
//     if (!isEditMode) {
//       const requiredFields = {
//         firstName: 'First Name', lastName: 'Last Name', email: 'Email', phone: 'Phone',
//         country_id: 'Country', state_id: 'State', employee_hub_id: 'Employee Hub',headquarter_id: 'Headquarter', division_id: 'Division',
//         manager_id: 'Manager', department_id: 'Department', designation_id: 'Designation',
//         officeShift: 'Office Shift', join_date: 'Join Date', avatar: 'Photo',
//         gender: 'Gender', username: 'Username', password: 'Password',
//         role: 'Role', grossSalary: 'Gross Salary'
//       };
     
//       const selectedDivision = divisions.find(d => d.division_id === currentEmployee.division_id);
//       if (selectedDivision && selectedDivision.division_name === 'Livestock' && !currentEmployee.subDivision) {
//           Swal.fire({
//               icon: 'error',
//               title: 'Validation Error',
//               text: 'The field "Sub Division" is required when Division is Livestock.',
//               target: employeeDialogRef.current
//           });
//           return;
//       }


//       for (const field in requiredFields) {
//         if (!currentEmployee[field]) {
//           Swal.fire({
//             icon: 'error',
//             title: 'Validation Error',
//             text: `The field "${requiredFields[field]}" is required.`,
//             target: employeeDialogRef.current
//           });
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
//       Swal.fire({
//         icon: 'error',
//         title: `Operation failed`,
//         text: `${errorMessage}`,
//         target: employeeDialogRef.current
//       });
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   const handleDeleteEmployee = (employeeId) => {
//     if (!employeeId) return;
//     Swal.fire({
//       title: 'Are you sure?',
//       text: "You won't be able to revert this!",
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#3085d6',
//       cancelButtonColor: '#d33',
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
//           <Typography
//             sx={{
//               fontWeight: "bold",
//               fontFamily: "Arial, sans-serif",
//               fontSize: {
//                 xs: "1.75rem",
//                 sm: "1.75rem",
//                 md: "2rem",  
//                 lg: "2.5rem",  
//               },
//             }}
//           >
//             Employees List
//           </Typography>

//           <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
//             <Button variant="contained" startIcon={<DownloadIcon />} onClick={handleExportEmployees} sx={purpleButtonSx}>Export</Button>
//             <Button variant="contained" startIcon={<ChangeManagerIcon />} onClick={() => setOpenChangeManagerForm(true)} sx={purpleButtonSx}>Change Manager</Button>
//             <Button variant="contained" startIcon={<AddIcon />} onClick={handleAddEmployee} sx={purpleButtonSx}>Add Employee</Button>
//           </Box>
//         </Box>

//         <Dialog
//           open={openChangeManagerForm}
//           onClose={() => setOpenChangeManagerForm(false)}
//           maxWidth="sm"
//           fullWidth
//           ref={changeManagerDialogRef}
//         >
//           <DialogTitle>Change Manager<IconButton onClick={() => setOpenChangeManagerForm(false)} sx={{ position: "absolute", right: 8, top: 8 }}><CloseIcon /></IconButton></DialogTitle>
//           <DialogContent><Grid container spacing={2} sx={{ mt: 1 }}><Grid item xs={12}><FormControl fullWidth><InputLabel>Select Employee</InputLabel><Select value={selectedEmployeeForManagerChange} onChange={(e) => setSelectedEmployeeForManagerChange(e.target.value)} label="Select Employee">{allEmployeesForDropdown.map((emp) => (<MenuItem key={emp.value} value={emp.value}>{emp.label}</MenuItem>))}</Select></FormControl></Grid><Grid item xs={12}><FormControl fullWidth><InputLabel>Select New Manager</InputLabel><Select value={newManager} onChange={(e) => setNewManager(e.target.value)} label="Select New Manager">{allEmployeesForDropdown.map((emp) => (<MenuItem key={emp.value} value={emp.value}>{emp.label}</MenuItem>))}</Select></FormControl></Grid></Grid></DialogContent>
//           <DialogActions>
//             <Button onClick={() => setOpenChangeManagerForm(false)} sx={cancelRedTextSx}>Cancel</Button>
//             <Button onClick={handleChangeManager} variant="contained" sx={purpleButtonSx}>Save</Button>
//           </DialogActions>
//         </Dialog>

//         <Dialog
//           open={openEmployeeForm}
//           onClose={() => setOpenEmployeeForm(false)}
//           maxWidth="md"
//           fullWidth
//           ref={employeeDialogRef}
//         >
//           <DialogTitle>{isEditMode ? "Edit Employee" : "Add Employee"}<IconButton onClick={() => setOpenEmployeeForm(false)} sx={{ position: "absolute", right: 8, top: 8 }}><CloseIcon /></IconButton></DialogTitle>
//           <DialogContent>
//             <Grid container spacing={2} sx={{ mt: 1 }}>
//               {!isEditMode && (<Grid item xs={12}><Autocomplete
//                 options={talentPool}
//                 getOptionLabel={(option) => option.email || ""}
//                 onChange={handleTalentSelect}
//                 onInputChange={(event, newInputValue) => {
//                   if (!talentPool.find(p => p.email === newInputValue)) {
//                     setCurrentEmployee(prev => ({ ...prev, email: newInputValue }));
//                   }
//                 }}
//                 renderInput={(params) => (<TextField {...params} label="Search Email to Auto-fill" />)} />
//               </Grid>)}
//             <Grid item xs={12} sm={4}>
//   <TextField
//     fullWidth
//     label="First Name"
//     name="firstName"
//     value={currentEmployee.firstName || ""}
//     onChange={handleInputChange}
//     onKeyPress={(e) => {
//       if (!/^[A-Za-z]$/.test(e.key)) {
//         e.preventDefault();
//       }
//     }}
//     InputProps={{ readOnly: isEditMode }}
//   />
// </Grid>

// <Grid item xs={12} sm={4}>
//   <TextField
//     fullWidth
//     label="Middle Name"
//     name="middleName"
//     value={currentEmployee.middleName || ""}
//     onChange={handleInputChange}
//     onKeyPress={(e) => {
//       if (!/^[A-Za-z]$/.test(e.key)) {
//         e.preventDefault();
//       }
//     }}
//     InputProps={{ readOnly: isEditMode }}
//   />
// </Grid>

// <Grid item xs={12} sm={4}>
//   <TextField
//     fullWidth
//     label="Last Name"
//     name="lastName"
//     value={currentEmployee.lastName || ""}
//     onChange={handleInputChange}
//     onKeyPress={(e) => {
//       if (!/^[A-Za-z]$/.test(e.key)) {
//         e.preventDefault();
//       }
//     }}
//     InputProps={{ readOnly: isEditMode }}
//   />
// </Grid>

//               <Grid item xs={12} sm={6}><TextField fullWidth label="Email" name="email" value={currentEmployee.email || ''} onChange={handleInputChange} InputProps={{ readOnly: isEditMode || !!talentPool.find(p => p.email === currentEmployee.email) }} /></Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   fullWidth
//                   label="Phone"
//                   name="phone"
//                   value={currentEmployee.phone || ''}
//                   onChange={(e) => {
//                     const value = e.target.value;
//                     if (/^\d{0,10}$/.test(value)) {
//                       handleInputChange(e);
//                     }
//                   }}
//                   inputProps={{ maxLength: 10, inputMode: 'numeric', pattern: '[0-9]*' }}
//                   InputProps={{ readOnly: isEditMode }}
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <FormControl fullWidth>
//                   <InputLabel>Country</InputLabel>
//                   <Select name="country_id" value={currentEmployee.country_id || ""} onChange={handleCountryChange} label="Country">
//                     {countries.map((c) => (<MenuItem key={c.country_id} value={c.country_id}>{c.country_name}</MenuItem>))}
//                   </Select>
//                 </FormControl>
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <FormControl fullWidth disabled={!currentEmployee.country_id}>
//                   <InputLabel>State</InputLabel>
//                   <Select name="state_id" value={currentEmployee.state_id || ""} onChange={handleStateChange} label="State">
//                     {states.map((s) => (<MenuItem key={s.state_id} value={s.state_id}>{s.state_name}</MenuItem>))}
//                   </Select>
//                 </FormControl>
//               </Grid>
//               <Grid item xs={12} sm={6}><FormControl fullWidth disabled={!currentEmployee.state_id}><InputLabel>Employee Hub</InputLabel><Select name="employee_hub_id" value={currentEmployee.employee_hub_id || ""} onChange={handleInputChange} label="Employee Hub">{employeeHubs.map((h) => (<MenuItem key={h.employee_hub_id} value={h.employee_hub_id}>{h.employee_hub_name}</MenuItem>))}</Select></FormControl></Grid>
// <Grid item xs={12} sm={6}>
//   <FormControl fullWidth>
//     <InputLabel>Headquarter</InputLabel>
//     <Select
//       name="headquarter_id"
//       value={currentEmployee.headquarter_id || ""}
//       onChange={handleInputChange}
//       label="Headquarter"
//     >
//        {headquarters.map((hq) => (
//         <MenuItem key={hq.headquarter_id} value={hq.headquarter_id}>
//           {hq.headquarter_name}
//         </MenuItem>
//       ))}
//     </Select>
//   </FormControl>
// </Grid>        

//   <Grid item xs={12} sm={6}><FormControl fullWidth><InputLabel>Division</InputLabel><Select name="division_id" value={currentEmployee.division_id || ""} onChange={handleDivisionChange} label="Division">{divisions.map((d) => (<MenuItem key={d.division_id} value={d.division_id}>{d.division_name}</MenuItem>))}</Select></FormControl></Grid>
             
//               <Grid item xs={12} sm={6}>
//                 <FormControl fullWidth disabled={isSubDivisionDisabled}>
//                   <InputLabel>Sub Division</InputLabel>
//                   <Select
//                     name="subDivision"
//                     value={currentEmployee.subDivision || ""}
//                     onChange={handleInputChange}
//                     label="Sub Division"
//                   >
//                     <MenuItem value="VetBiz">VetBiz</MenuItem>
//                     <MenuItem value="TredBiz">TredBiz</MenuItem>
//                     <MenuItem value=" ">TredBiz Mix</MenuItem>
//                   </Select>
//                 </FormControl>
//               </Grid>
             
//               <Grid item xs={12} sm={6}><FormControl fullWidth><InputLabel>Manager</InputLabel><Select name="manager_id" value={currentEmployee.manager_id || ""} onChange={handleInputChange} label="Manager">{allEmployeesForDropdown.map((e) => (<MenuItem key={e.value} value={e.value}>{e.label}</MenuItem>))}</Select></FormControl></Grid>
//               <Grid item xs={12} sm={6}><FormControl fullWidth><InputLabel>Department</InputLabel><Select name="department_id" value={currentEmployee.department_id || ""} onChange={handleDeptChange} label="Department">{departments.map((d) => (<MenuItem key={d.dept_id} value={d.dept_id}>{d.dept_name}</MenuItem>))}</Select></FormControl></Grid>
//               <Grid item xs={12} sm={6}><FormControl fullWidth disabled={!currentEmployee.department_id}><InputLabel>Designation</InputLabel><Select name="designation_id" value={currentEmployee.designation_id || ""} onChange={handleInputChange} label="Designation">{designations.map((d) => (<MenuItem key={d.desig_id} value={d.desig_id}>{d.desig_name}</MenuItem>))}</Select></FormControl></Grid>
//               <Grid item xs={12} sm={6}><FormControl fullWidth><InputLabel>Office Shift</InputLabel><Select name="officeShift" value={currentEmployee.officeShift || ""} onChange={handleInputChange} label="Office Shift">{officeShifts.map((s) => (<MenuItem key={s.office_shift_id} value={s.office_shift_id}>{s.office_shift_name}</MenuItem>))}</Select></FormControl></Grid>
//               <Grid item xs={12} sm={6}><FormControl fullWidth><InputLabel>Status</InputLabel><Select name="status" value={currentEmployee.status} onChange={handleInputChange} label="Status"><MenuItem value={1}>Active</MenuItem><MenuItem value={0}>Inactive</MenuItem></Select></FormControl></Grid>
//               <Grid item xs={12} sm={6}><FormControl fullWidth><InputLabel>On Probation</InputLabel><Select name="is_probation" value={currentEmployee.is_probation} onChange={handleInputChange} label="On Probation"><MenuItem value={"y"}>Yes</MenuItem><MenuItem value={"n"}>No</MenuItem></Select></FormControl></Grid>
//               <Grid item xs={12} sm={6}><TextField fullWidth label="Join Date" name="join_date" type="date" value={currentEmployee.join_date || ""} onChange={handleInputChange} InputLabelProps={{ shrink: true }} /></Grid>
//               <Grid item xs={12} sm={6}><Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}><Button variant="contained" component="label" disabled={isEditMode} sx={purpleButtonSx}>Upload Photo<input type="file" hidden accept="image/*" onChange={handleFileUpload} /></Button>{currentEmployee.avatar && <Avatar src={typeof currentEmployee.avatar === 'string' ? currentEmployee.avatar : URL.createObjectURL(currentEmployee.avatar)} sx={{ width: 56, height: 56 }} />}</Box></Grid>
//               <Grid item xs={12}>{isFetchingDocs && <CircularProgress />}{employeeDocuments && !isFetchingDocs && (<Box><Typography variant="subtitle1" gutterBottom>Fetched Documents</Typography><Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>{Object.entries(employeeDocuments).map(([name, url]) => (url ? (<Chip key={name} label={name.replace(/_/g, ' ')} component="a" href={url} target="_blank" clickable icon={<LinkIcon />} variant="outlined" color="secondary" size="small" />) : null))}</Box></Box>)}</Grid>
//               {!isEditMode && (<>
//                 <Grid item xs={12} sm={6}><FormControl fullWidth><InputLabel>Gender</InputLabel><Select name="gender" value={currentEmployee.gender || ""} onChange={handleInputChange} label="Gender"><MenuItem value="Male">Male</MenuItem><MenuItem value="Female">Female</MenuItem><MenuItem value="Other">Other</MenuItem></Select></FormControl></Grid>
//                 <Grid item xs={12} sm={6}>
//                   <TextField
//                     fullWidth
//                     label="Username"
//                     name="username"
//                     value={currentEmployee.username || ""}
//                     onChange={handleInputChange}
//                   />
//                 </Grid>
//                 <Grid item xs={12} sm={6}><TextField fullWidth label="Password" name="password" value={currentEmployee.password || ""} onChange={handleInputChange} type={showPassword ? 'text' : 'password'} InputProps={{ endAdornment: (<InputAdornment position="end"> <IconButton aria-label="toggle password visibility" onClick={() => setShowPassword((prev) => !prev)} onMouseDown={(e) => e.preventDefault()} edge="end"> {showPassword ? <VisibilityOff /> : <Visibility />} </IconButton> </InputAdornment>) }} /></Grid>
//                 <Grid item xs={12} sm={6}><FormControl fullWidth><InputLabel>Role</InputLabel><Select name="role" value={currentEmployee.role || ""} onChange={handleInputChange} label="Role">{roles.map((role) => (<MenuItem key={role.index} value={role.index}>{role.role_name}</MenuItem>))}</Select></FormControl></Grid>
//                 <Grid item xs={12} sm={6}>
//                   <TextField
//                     fullWidth
//                     label="Gross Salary"
//                     name="grossSalary"
//                     type="number"
//                     value={currentEmployee.grossSalary || ""}
//                     onChange={(e) => {
//                       const value = e.target.value;
//                       if (/^\d*\.?\d*$/.test(value)) {
//                         handleInputChange(e);
//                       }
//                     }}
//                   />
//                 </Grid>
//               </>)}
//             </Grid>
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={() => setOpenEmployeeForm(false)} disabled={isSaving} sx={cancelRedTextSx}>Cancel</Button>
//             <Button onClick={handleSaveEmployee} variant="contained" disabled={isSaving} sx={purpleButtonSx}>
//               {isSaving ? <CircularProgress size={24} color="inherit" /> : "Save"}
//             </Button>
//           </DialogActions>
//         </Dialog>

//         <Paper sx={{ width: "100%", mb: 2 }}>
//           <Box sx={{ p: 2, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: 'wrap', gap: 2 }}>
//             <TextField
//               label="Search"
//               placeholder="Search by any value..."
//               variant="outlined"
//               size="small"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               sx={{
//                 width: { xs: '100%', sm: 'auto' },
//                 order: { xs: 1, sm: 2 }
//               }}
//             />
//             <FormControl
//               sx={{
//                 minWidth: 90,
//                 order: { xs: 2, sm: 1 }
//               }}
//               size="small"
//             >
//               <InputLabel>Rows</InputLabel>
//               <Select value={rowsPerPage} label="Rows" onChange={handleRowsPerPageChange}>
//                 <MenuItem value={5}>5</MenuItem>
//                 <MenuItem value={10}>10</MenuItem>
//                 <MenuItem value={25}>25</MenuItem>
//                 <MenuItem value={50}>50</MenuItem>
//               </Select>
//             </FormControl>
//           </Box>

//           <TableContainer>
//             <Table size="small" sx={{
//               minWidth: "100%",
//               whiteSpace: "nowrap",
//               "& .MuiTableCell-root": {
//                 padding: "4px 8px",
//                 fontSize: '0.8rem',
//               },
//             }}>
//               <TableHead>
//                 <TableRow sx={{ bgcolor: '#f5f5f5' }}>
//                   <TableCell sx={{ fontWeight: 'bold', width: '5%', fontSize: '0.9rem' }}>SR. NO.</TableCell>
//                   <TableCell sx={{ fontWeight: 'bold', width: '25%', fontSize: '0.9rem' }}>EMPLOYEE</TableCell>
//                   <TableCell sx={{ width: '5%' }}></TableCell>
//                   <TableCell sx={{ fontWeight: 'bold', width: '15%', fontSize: '0.9rem' }}>DEPARTMENT</TableCell>
//                   <TableCell sx={{ fontWeight: 'bold', width: '15%', fontSize: '0.9rem' }}>DESIGNATION</TableCell>
//                   <TableCell sx={{ fontWeight: 'bold', width: '10%', fontSize: '0.9rem' }}>JOIN DATE</TableCell>
//                   <TableCell sx={{ fontWeight: 'bold', width: '10%', fontSize: '0.9rem' }}>STATUS</TableCell>
//                   <TableCell sx={{ fontWeight: 'bold', width: '15%', fontSize: '0.9rem' }}>MANAGER</TableCell>
//                   <TableCell sx={{ fontWeight: 'bold', width: '10%', fontSize: '0.9rem', textAlign: 'center' }}>ACTIONS</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {currentEmployees.map((employee, index) => (
//                   <TableRow
//                     key={employee.user_id}
//                     onMouseEnter={() => handleRowHover(employee.user_id)}
//                     onMouseLeave={handleRowLeave}
//                     sx={{ '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' } }}
//                   >
//                     <TableCell>{indexOfFirstEmployee + index + 1}</TableCell>
//                     <TableCell>
//                       <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
//                         <Typography variant="body2">{employee.employee_name}</Typography>
//                       </Box>
//                     </TableCell>
//                     <TableCell sx={{ padding: '0 8px', textAlign: 'center' }}>
//                       {hoveredRowId === employee.user_id && (
//                         <IconButton
//                           onClick={() => handleArrowClick(employee.user_id)}
//                           size="small"
//                           sx={{
//                             color: '#E55D87',
//                             transition: 'all 0.2s ease-in-out',
//                             '&:hover': {
//                               backgroundColor: 'rgba(229, 93, 135, 0.1)',
//                               transform: 'scale(1.1)',
//                             },
//                             '&:active': {
//                               color: '#c2185b',
//                               boxShadow: '0 0 10px 2px rgba(194, 24, 91, 0.5)',
//                             }
//                           }}
//                         >
//                           <ArrowForwardIcon fontSize="small" />
//                         </IconButton>
//                       )}
//                     </TableCell>
//                     <TableCell>{employee.department_name || 'N/A'}</TableCell>
//                     <TableCell>{employee.designation_name || 'N/A'}</TableCell>
//                     <TableCell>{employee.join_date}</TableCell>
//                     <TableCell>
//                       <Chip label={employee.status === 1 ? "Active" : "Inactive"} color={employee.status === 1 ? "success" : "error"} size="small" />
//                     </TableCell>
//                     <TableCell>{employee.manager}</TableCell>
//                     <TableCell sx={{ textAlign: 'center' }}>
//                       <Tooltip title="Edit"><IconButton onClick={() => handleEditEmployee(employee)} color="primary"><EditIcon /></IconButton></Tooltip>
//                       <Tooltip title="Delete"><IconButton onClick={() => handleDeleteEmployee(employee.user_id)} color="error"><DeleteIcon /></IconButton></Tooltip>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         </Paper>
//       </Box>
//       <Box sx={{ display: "flex", justifyContent: { xs: 'center', md: 'space-between' }, alignItems: "center", flexWrap: 'wrap', gap: 2, mt: 2 }}>
//         <Typography variant="body2">
//           Showing{" "}
//           <Box component="span" sx={{ fontWeight: "bold" }}>
//             {filteredEmployees.length > 0 ? indexOfFirstEmployee + 1 : 0}
//           </Box>{" "}
//           -{" "}
//           <Box component="span" sx={{ fontWeight: "bold" }}>
//             {Math.min(indexOfLastEmployee, filteredEmployees.length)}
//           </Box>{" "}
//           of{" "}
//           <Box component="span" sx={{ fontWeight: "bold" }}>
//             {filteredEmployees.length}
//           </Box>{" "}
//           Employees
//         </Typography>
//         <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//           <Button variant="contained" disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)} sx={purpleButtonSx}>Previous</Button>
//           <Typography sx={{ mx: 1 }}>Page {currentPage}</Typography>
//           <Button variant="contained" disabled={indexOfLastEmployee >= filteredEmployees.length} onClick={() => setCurrentPage(currentPage + 1)} sx={purpleButtonSx}>Next</Button>
//         </Box>
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
// const probationOptions = [{ value: 'y', label: 'Yes' }, { value: 'n', label: 'No' }];
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
//             Employees ---List
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
//               <Grid item xs={12} sm={6}><Autocomplete options={probationOptions} getOptionLabel={(option) => option.label} value={probationOptions.find(p => p.value === currentEmployee.is_probation) || null} onChange={(e, nv) => setCurrentEmployee(prev => ({ ...prev, is_probation: nv ? nv.value : "n" }))} isOptionEqualToValue={(option, value) => option.value === value.value} renderInput={(params) => (<TextField {...params} label="On Probation" />)} /></Grid>
              
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
// const probationOptions = [{ value: 'y', label: 'Yes' }, { value: 'n', label: 'No' }];
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
//   const [rowsPerPage, setRowsPerPage] = useState(10);
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

//   // --- THEME COLORS ---
//   const themePurple = '#8C257C';
//   const themeOrange = '#F58E35';
  
//   const purpleButtonSx = {
//     backgroundColor: themePurple,
//     '&:hover': {
//       backgroundColor: '#731f65', // Darker purple
//     },
//     padding: '4px 10px',
//     height: '32px',
//   };

//   const cancelOrangeTextSx = {
//     color: themeOrange,
//     '&:hover': {
//         backgroundColor: 'rgba(245, 142, 53, 0.1)'
//     }
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
//           axios.get("https://tdtlworld.com/hrms-backend/api/headquarters/")
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

// setCurrentEmployee({
//     id: employee.user_id,
//     firstName: nameParts[0] || "",
//     middleName: nameParts.length > 2 ? nameParts.slice(1, -1).join(" ") : "",
//     lastName: nameParts.length > 1 ? nameParts[nameParts.length - 1] : "",
//     email: empData.email || "",
//     phone: empData.phone || "",
//     // Correctly handle number conversion and null/undefined values
//     manager_id: empData.manager_id ? Number(empData.manager_id) : "",
//     designation_id: empData.designation_id ? Number(empData.designation_id) : "",
//     department_id: empData.department_id ? Number(empData.department_id) : "",
    
//     // --- THIS IS THE KEY FIX for HEADQUARTER ---
//     // Your API response is missing "headquarter_id". This code will now correctly handle that.
//     headquarter_id: empData.headquarter_id ? Number(empData.headquarter_id) : "", 

//     division_id: empData.division_id ? Number(empData.division_id) : "",
//     state_id: empData.state ? Number(empData.state) : "",
//     employee_hub_id: empData.employee_hub_id ? Number(empData.employee_hub_id) : "",
//     role: empData.role_id ? Number(empData.role_id) : "",
    
//     // Sub-division is correct because the API value is null, so it should be empty
//     subDivision: empData.sub_division || "",

//     officeShift: officeShiftObj ? Number(officeShiftObj.office_shift_id) : "",
//     status: Number(empData.status),
//     join_date: empData.join_date ? empData.join_date.split(" ")[0] : "",
//     country_id: selectedCountry ? Number(selectedCountry.country_id) : "",
//     avatar: empData.profile_photo || "",
//     is_probation: empData.probation?.toLowerCase() === 'y' ? 'y' : 'n',
//     resumeUrl: "",
// });

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
//       showCancelButton: true, confirmButtonColor: themePurple, cancelButtonColor: themeOrange,
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
//   const totalPages = Math.ceil(filteredEmployees.length / rowsPerPage) || 1;

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


//   const formatDate = (dateString) => {
//     if (!dateString) return '';
//     try {
//       const date = new Date(dateString);
//       const day = String(date.getDate()).padStart(2, '0');
//       const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
//       const year = date.getFullYear();
//       return `${day}/${month}/${year}`;
//     } catch (error) {
//       // If the date format is unexpected, return the original string
//       console.error("Could not format date:", dateString);
//       return dateString;
//     }
//   };


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
//           <DialogTitle sx={{ bgcolor: themePurple, color: 'white' }}>
//             Change Manager
//             <IconButton onClick={() => setOpenChangeManagerForm(false)} sx={{ position: "absolute", right: 8, top: 8, color: 'white' }}><CloseIcon /></IconButton>
//           </DialogTitle>
//           <DialogContent><Grid container spacing={2} sx={{ mt: 1 }}><Grid item xs={12}><FormControl fullWidth><InputLabel>Select Employee</InputLabel><Select value={selectedEmployeeForManagerChange} onChange={(e) => setSelectedEmployeeForManagerChange(e.target.value)} label="Select Employee">{allEmployeesForDropdown.map((emp) => (<MenuItem key={emp.value} value={emp.value}>{emp.label}</MenuItem>))}</Select></FormControl></Grid><Grid item xs={12}><FormControl fullWidth><InputLabel>Select New Manager</InputLabel><Select value={newManager} onChange={(e) => setNewManager(e.target.value)} label="Select New Manager">{allEmployeesForDropdown.map((emp) => (<MenuItem key={emp.value} value={emp.value}>{emp.label}</MenuItem>))}</Select></FormControl></Grid></Grid></DialogContent>
//           <DialogActions>
//             <Button onClick={() => setOpenChangeManagerForm(false)} sx={cancelOrangeTextSx}>Cancel</Button>
//             <Button onClick={handleChangeManager} variant="contained" sx={purpleButtonSx}>Save</Button>
//           </DialogActions>
//         </Dialog>

//         <Dialog open={openEmployeeForm} onClose={() => setOpenEmployeeForm(false)} maxWidth="md" fullWidth ref={employeeDialogRef}>
//           <DialogTitle sx={{ bgcolor: themePurple, color: 'white' }}>
//             {isEditMode ? "Edit Employee" : "Add Employee"}
//             <IconButton onClick={() => setOpenEmployeeForm(false)} sx={{ position: "absolute", right: 8, top: 8, color: 'white' }}><CloseIcon /></IconButton>
//           </DialogTitle>
//           <DialogContent>
//             <Grid container spacing={2} sx={{ mt: 1 }}>
//               {!isEditMode && (<Grid item xs={12}><Autocomplete options={talentPool} getOptionLabel={(option) => option.email || ""} onChange={handleTalentSelect} onInputChange={(event, newInputValue) => { if (!talentPool.find(p => p.email === newInputValue)) { setCurrentEmployee(prev => ({ ...prev, email: newInputValue })); }}} renderInput={(params) => (<TextField {...params} label="Search Email to Auto-fill" />)} /></Grid>)}
//               <Grid item xs={12} sm={4}><TextField fullWidth label="First Name" name="firstName" value={currentEmployee.firstName || ""} onChange={handleInputChange} onKeyPress={(e) => { if (!/^[A-Za-z]$/.test(e.key)) e.preventDefault(); }} InputProps={{ readOnly: isEditMode }} /></Grid>
//               <Grid item xs={12} sm={4}><TextField fullWidth label="Middle Name" name="middleName" value={currentEmployee.middleName || ""} onChange={handleInputChange} onKeyPress={(e) => { if (!/^[A-Za-z]$/.test(e.key)) e.preventDefault(); }} InputProps={{ readOnly: isEditMode }} /></Grid>
//               <Grid item xs={12} sm={4}><TextField fullWidth label="Last Name" name="lastName" value={currentEmployee.lastName || ""} onChange={handleInputChange} onKeyPress={(e) => { if (!/^[A-Za-z]$/.test(e.key)) e.preventDefault(); }} InputProps={{ readOnly: isEditMode }} /></Grid>
//               <Grid item xs={12} sm={6}><TextField fullWidth label="Email" name="email" value={currentEmployee.email || ''} onChange={handleInputChange} InputProps={{ readOnly: isEditMode || !!talentPool.find(p => p.email === currentEmployee.email) }} /></Grid>
//               <Grid item xs={12} sm={6}><TextField fullWidth label="Phone" name="phone" value={currentEmployee.phone || ''} onChange={(e) => { const value = e.target.value; if (/^\d{0,10}$/.test(value)) handleInputChange(e); }} inputProps={{ maxLength: 10, inputMode: 'numeric', pattern: '[0-9]*' }} InputProps={{ readOnly: isEditMode }} /></Grid>
//               <Grid item xs={12} sm={6}><Autocomplete options={countries} getOptionLabel={(option) => option.country_name || ''} value={countries.find(c => c.country_id === currentEmployee.country_id) || null} onChange={(e, nv) => handleCountryChange(nv)} isOptionEqualToValue={(option, value) => option.country_id === value.country_id} renderInput={(params) => (<TextField {...params} label="Country" />)} /></Grid>
//               <Grid item xs={12} sm={6}><Autocomplete options={states} getOptionLabel={(option) => option.state_name || ''} value={states.find(s => s.state_id === currentEmployee.state_id) || null} onChange={(e, nv) => handleStateChange(nv)} isOptionEqualToValue={(option, value) => option.state_id === value.state_id} disabled={!currentEmployee.country_id} renderInput={(params) => (<TextField {...params} label="State" />)} /></Grid>
//               <Grid item xs={12} sm={6}><Autocomplete options={employeeHubs} getOptionLabel={(option) => option.employee_hub_name || ''} value={employeeHubs.find(h => h.employee_hub_id === currentEmployee.employee_hub_id) || null} onChange={(e, nv) => setCurrentEmployee(prev => ({ ...prev, employee_hub_id: nv ? nv.employee_hub_id : "" }))} isOptionEqualToValue={(option, value) => option.employee_hub_id === value.employee_hub_id} disabled={!currentEmployee.state_id} renderInput={(params) => (<TextField {...params} label="Employee Hub" />)} /></Grid>
//               <Grid item xs={12} sm={6}>
//                   <Autocomplete options={headquarters} getOptionLabel={(option) => option.headquarter_name || ''} value={headquarters.find(h => h.headquarter_id == currentEmployee.headquarter_id) || null} onChange={(e, nv) => setCurrentEmployee(prev => ({ ...prev, headquarter_id: nv ? nv.headquarter_id : "" }))} isOptionEqualToValue={(option, value) => option.headquarter_id == value.headquarter_id} renderInput={(params) => (<TextField {...params} label="Headquarter" />)} />
//               </Grid>
//               <Grid item xs={12} sm={6}><Autocomplete options={divisions} getOptionLabel={(option) => option.division_name || ''} value={divisions.find(d => d.division_id === currentEmployee.division_id) || null} onChange={(e, nv) => handleDivisionChange(nv)} isOptionEqualToValue={(option, value) => option.division_id === value.division_id} renderInput={(params) => (<TextField {...params} label="Division" />)} /></Grid>
//               <Grid item xs={12} sm={6}><Autocomplete options={subDivisionOptions} getOptionLabel={(option) => option.label || ''} value={subDivisionOptions.find(sd => sd.value === currentEmployee.subDivision) || null} onChange={(e, nv) => setCurrentEmployee(prev => ({ ...prev, subDivision: nv ? nv.value : "" }))} isOptionEqualToValue={(option, value) => option.value === value.value} disabled={isSubDivisionDisabled} renderInput={(params) => (<TextField {...params} label="Sub Division" />)} /></Grid>
//              <Grid item xs={12} sm={6}>
//                 <Autocomplete options={allEmployeesForDropdown} getOptionLabel={(option) => option.label || ''} value={allEmployeesForDropdown.find(e => e.value == currentEmployee.manager_id) || null} onChange={(e, nv) => setCurrentEmployee(prev => ({ ...prev, manager_id: nv ? nv.value : "" }))} isOptionEqualToValue={(option, value) => option.value == value.value} renderInput={(params) => (<TextField {...params} label="Manager" />)} />
//             </Grid>
//               <Grid item xs={12} sm={6}><Autocomplete options={departments} getOptionLabel={(option) => option.dept_name || ''} value={departments.find(d => d.dept_id === currentEmployee.department_id) || null} onChange={(e, nv) => handleDeptChange(nv)} isOptionEqualToValue={(option, value) => option.dept_id === value.dept_id} renderInput={(params) => (<TextField {...params} label="Department" />)} /></Grid>
//               <Grid item xs={12} sm={6}><Autocomplete options={designations} getOptionLabel={(option) => option.desig_name || ''} value={designations.find(d => d.desig_id === currentEmployee.designation_id) || null} onChange={(e, nv) => setCurrentEmployee(prev => ({ ...prev, designation_id: nv ? nv.desig_id : "" }))} isOptionEqualToValue={(option, value) => option.desig_id === value.desig_id} disabled={!currentEmployee.department_id} renderInput={(params) => (<TextField {...params} label="Designation" />)} /></Grid>
//               <Grid item xs={12} sm={6}><Autocomplete options={officeShifts} getOptionLabel={(option) => option.office_shift_name || ''} value={officeShifts.find(s => s.office_shift_id === currentEmployee.officeShift) || null} onChange={(e, nv) => setCurrentEmployee(prev => ({ ...prev, officeShift: nv ? nv.office_shift_id : "" }))} isOptionEqualToValue={(option, value) => option.office_shift_id === value.office_shift_id} renderInput={(params) => (<TextField {...params} label="Office Shift" />)} /></Grid>
//               <Grid item xs={12} sm={6}><Autocomplete options={statusOptions} getOptionLabel={(option) => option.label} value={statusOptions.find(s => s.value === currentEmployee.status) || null} onChange={(e, nv) => setCurrentEmployee(prev => ({ ...prev, status: nv ? nv.value : 1 }))} isOptionEqualToValue={(option, value) => option.value === value.value} renderInput={(params) => (<TextField {...params} label="Status" />)} /></Grid>
//               <Grid item xs={12} sm={6}><Autocomplete options={probationOptions} getOptionLabel={(option) => option.label} value={probationOptions.find(p => p.value === currentEmployee.is_probation) || null} onChange={(e, nv) => setCurrentEmployee(prev => ({ ...prev, is_probation: nv ? nv.value : "n" }))} isOptionEqualToValue={(option, value) => option.value === value.value} renderInput={(params) => (<TextField {...params} label="On Probation" />)} /></Grid>
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
//             <Button onClick={() => setOpenEmployeeForm(false)} disabled={isSaving} sx={cancelOrangeTextSx}>Cancel</Button>
//             <Button onClick={handleSaveEmployee} variant="contained" disabled={isSaving} sx={purpleButtonSx}>{isSaving ? <CircularProgress size={24} color="inherit" /> : "Save"}</Button>
//           </DialogActions>
//         </Dialog>

//         <Paper sx={{ width: "100%", mb: 2 }}>
//           <Box sx={{ p: 2, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: 'wrap', gap: 2 }}>
//             <FormControl sx={{ minWidth: 120 }} size="small">
//               <InputLabel>Rows per page</InputLabel>
//               <Select value={rowsPerPage} label="Rows per page" onChange={handleRowsPerPageChange}>
//                 <MenuItem value={5}>5</MenuItem>
//                 <MenuItem value={10}>10</MenuItem>
//                 <MenuItem value={25}>25</MenuItem>
//                 <MenuItem value={50}>50</MenuItem>
//               </Select>
//             </FormControl>
//             <TextField label="Search" placeholder="Search..." variant="outlined" size="small" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} sx={{ width: { xs: '100%', sm: 300 } }} />
//           </Box>
//           <TableContainer>
//             <Table size="small" sx={{ minWidth: "100%", whiteSpace: "nowrap", "& .MuiTableCell-root": { padding: "4px 8px", fontSize: '0.8rem' }}}>
//               <TableHead>
//                 <TableRow sx={{ bgcolor: themePurple }}>
//                   <TableCell sx={{ fontWeight: 'bold', width: '5%', fontSize: '0.9rem', color: 'white' }}>SR. NO.</TableCell>
//                   <TableCell sx={{ fontWeight: 'bold', width: '25%', fontSize: '0.9rem', color: 'white' }}>EMPLOYEE</TableCell>
//                   <TableCell sx={{ width: '5%', color: 'white' }}></TableCell>
//                   <TableCell sx={{ fontWeight: 'bold', width: '15%', fontSize: '0.9rem', color: 'white' }}>DEPARTMENT</TableCell>
//                   <TableCell sx={{ fontWeight: 'bold', width: '15%', fontSize: '0.9rem', color: 'white' }}>DESIGNATION</TableCell>
//                   <TableCell sx={{ fontWeight: 'bold', width: '10%', fontSize: '0.9rem', color: 'white' }}>JOIN DATE</TableCell>
//                   <TableCell sx={{ fontWeight: 'bold', width: '10%', fontSize: '0.9rem', color: 'white' }}>STATUS</TableCell>
//                   <TableCell sx={{ fontWeight: 'bold', width: '15%', fontSize: '0.9rem', color: 'white' }}>MANAGER</TableCell>
//                   <TableCell sx={{ fontWeight: 'bold', width: '10%', fontSize: '0.9rem', textAlign: 'center', color: 'white' }}>ACTIONS</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {currentEmployees.map((employee, index) => (
//                   <TableRow key={employee.user_id} onMouseEnter={() => handleRowHover(employee.user_id)} onMouseLeave={handleRowLeave} sx={{ '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' } }}>
//                     <TableCell>{indexOfFirstEmployee + index + 1}</TableCell>
//                     <TableCell><Box sx={{ display: "flex", alignItems: "center", gap: 2 }}><Typography variant="body2">{employee.employee_name}</Typography></Box></TableCell>
//                     <TableCell sx={{ padding: '0 8px', textAlign: 'center' }}>{hoveredRowId === employee.user_id && (<IconButton onClick={() => handleArrowClick(employee.user_id)} size="small" sx={{ color: themeOrange, transition: 'all 0.2s ease-in-out', '&:hover': { backgroundColor: 'rgba(245, 142, 53, 0.1)', transform: 'scale(1.1)' }}}><ArrowForwardIcon fontSize="small" /></IconButton>)}</TableCell>
//                     <TableCell>{employee.department_name || 'N/A'}</TableCell>
//                     <TableCell>{employee.designation_name || 'N/A'}</TableCell>
//                     <TableCell>{formatDate(employee.join_date)}</TableCell>
//                     <TableCell>
//                         <Chip 
//                             label={employee.status === 1 ? "Active" : "Inactive"} 
//                             size="small"
//                             sx={{
//                                 bgcolor: employee.status === 1 ? themePurple : themeOrange,
//                                 color: 'white'
//                             }} 
//                         />
//                     </TableCell>
//                     <TableCell>{employee.manager}</TableCell>
//                     <TableCell sx={{ textAlign: 'center' }}>
//                         <Tooltip title="Edit"><IconButton onClick={() => handleEditEmployee(employee)} sx={{ color: themePurple }}><EditIcon /></IconButton></Tooltip>
//                         <Tooltip title="Delete"><IconButton onClick={() => handleDeleteEmployee(employee.user_id)} sx={{ color: themeOrange }}><DeleteIcon /></IconButton></Tooltip>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>

//           <Box sx={{ p: 2, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: 'wrap', gap: 2, borderTop: '1px solid rgba(224, 224, 224, 1)' }}>
//             <Typography variant="body2">
//               Showing <Box component="span" sx={{ fontWeight: "bold" }}>{filteredEmployees.length > 0 ? indexOfFirstEmployee + 1 : 0}</Box> - <Box component="span" sx={{ fontWeight: "bold" }}>{Math.min(indexOfLastEmployee, filteredEmployees.length)}</Box> of <Box component="span" sx={{ fontWeight: "bold" }}>{filteredEmployees.length}</Box> Employees
//             </Typography>
//             <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//                 <Button variant="contained" disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)} sx={purpleButtonSx}>Previous</Button>
//                 <Typography sx={{ mx: 1 }}>Page {currentPage} of {totalPages}</Typography>
//                 <Button variant="contained" disabled={indexOfLastEmployee >= filteredEmployees.length} onClick={() => setCurrentPage(currentPage + 1)} sx={purpleButtonSx}>Next</Button>
//             </Box>
//           </Box>
//         </Paper>
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
// const probationOptions = [{ value: 'y', label: 'Yes' }, { value: 'n', label: 'No' }];
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
//   const [rowsPerPage, setRowsPerPage] = useState(10);
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

//   // --- THEME COLORS ---
//   const themePurple = '#8C257C';
//   const themeOrange = '#F58E35';
  
//   const purpleButtonSx = {
//     backgroundColor: themePurple,
//     '&:hover': {
//       backgroundColor: '#731f65', // Darker purple
//     },
//     padding: '4px 10px',
//     height: '32px',
//   };

//   const cancelOrangeTextSx = {
//     color: themeOrange,
//     '&:hover': {
//         backgroundColor: 'rgba(245, 142, 53, 0.1)'
//     }
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
//           axios.get("https://tdtlworld.com/hrms-backend/api/headquarters/")
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

//   // --- FULLY UPDATED FUNCTION ---
//   const handleEditEmployee = async (employee) => {
//     if (!employee || !employee.user_id) return;
//     try {
//         const response = await axiosInstance.get(`api/edit_employee/${employee.user_id}/`);
//         if (response.data.status !== "success" || response.data.data.length === 0) {
//             Swal.fire('Error', 'Failed to load employee details for editing.', 'error');
//             return;
//         }
//         const empData = response.data.data[0];

//         // Fetch all dependent data in parallel, including the full headquarters list
//         const [desigRes, statesRes, hubsRes, headquartersRes] = await Promise.all([
//             axiosInstance.get(`api/desig_dept_dropdown/?dept_id=${empData.department_id}/`),
//             axiosInstance.get(`api/states/?country_name=${empData.country_name}`),
//             axiosInstance.get(`api/employee_hub_dropdown/${empData.state}/`),
//             axiosInstance.get('https://tdtlworld.com/hrms-backend/api/headquarters/')
//         ]);

//         // Set the fetched data into state
//         const fetchedHeadquarters = headquartersRes.data || [];
//         setDesignations(desigRes.data.desig_data || []);
//         setStates(statesRes.data.data || []);
//         setEmployeeHubs(hubsRes.data.data || []);
//         setHeadquarters(fetchedHeadquarters);

//         const officeShiftObj = officeShifts.find(s => s.office_shift_name === empData.office_shift);
//         const nameParts = (empData.emp_name || "").split(" ");
//         const selectedCountry = countries.find(c => c.country_name === empData.country_name);

//         // --- FIX FOR HEADQUARTER ---
//         // Find the full headquarter object using the name provided by the employee API
//         const selectedHeadquarter = fetchedHeadquarters.find(
//             hq => hq.headquarter_name === empData.headquarter
//         );

//         setCurrentEmployee({
//             id: employee.user_id,
//             firstName: nameParts[0] || "",
//             middleName: nameParts.length > 2 ? nameParts.slice(1, -1).join(" ") : "",
//             lastName: nameParts.length > 1 ? nameParts[nameParts.length - 1] : "",
//             email: empData.email || "",
//             phone: empData.phone || "",
//             manager_id: empData.manager_id ? Number(empData.manager_id) : "",
//             designation_id: empData.designation_id ? Number(empData.designation_id) : "",
//             department_id: empData.department_id ? Number(empData.department_id) : "",
            
//             // Use the ID from the object we found. If not found, it's set to empty string.
//             headquarter_id: selectedHeadquarter ? selectedHeadquarter.headquarter_id : "",

//             // --- FIX FOR SUB DIVISION ---
//             // This binds the value from the API. The API must send the exact value 
//             // from your subDivisionOptions (e.g., "TredBiz", not "Tred").
//             subDivision: empData.sub_division || "",

//             division_id: empData.division_id ? Number(empData.division_id) : "",
//             state_id: empData.state ? Number(empData.state) : "",
//             employee_hub_id: empData.employee_hub_id ? Number(empData.employee_hub_id) : "",
//             role: empData.role_id ? Number(empData.role_id) : "",
//             officeShift: officeShiftObj ? Number(officeShiftObj.office_shift_id) : "",
//             status: Number(empData.status),
//             join_date: empData.join_date ? empData.join_date.split(" ")[0] : "",
//             country_id: selectedCountry ? Number(selectedCountry.country_id) : "",
//             avatar: empData.profile_photo || "",
//             is_probation: empData.probation?.toLowerCase() === 'y' ? 'y' : 'n',
//             resumeUrl: "",
//         });

//         setIsEditMode(true);
//         setOpenEmployeeForm(true);
//         setShowPassword(false);
//     } catch (error) {
//         console.error("Error fetching employee details for edit:", error);
//         Swal.fire('Error', 'Failed to fetch complete employee details. Please try again.', 'error');
//     }
//   };

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
//       showCancelButton: true, confirmButtonColor: themePurple, cancelButtonColor: themeOrange,
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
//   const totalPages = Math.ceil(filteredEmployees.length / rowsPerPage) || 1;

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
//     const selectedDivision = divisions.find(d => d.division_id == currentEmployee.division_id);
//     return !selectedDivision || selectedDivision.division_name !== 'Livestock';
//   }, [currentEmployee.division_id, divisions]);


//   const formatDate = (dateString) => {
//     if (!dateString) return '';
//     try {
//       const date = new Date(dateString);
//       const day = String(date.getDate()).padStart(2, '0');
//       const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
//       const year = date.getFullYear();
//       return `${day}/${month}/${year}`;
//     } catch (error) {
//       // If the date format is unexpected, return the original string
//       console.error("Could not format date:", dateString);
//       return dateString;
//     }
//   };


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
//           <DialogTitle sx={{ bgcolor: themePurple, color: 'white' }}>
//             Change Manager
//             <IconButton onClick={() => setOpenChangeManagerForm(false)} sx={{ position: "absolute", right: 8, top: 8, color: 'white' }}><CloseIcon /></IconButton>
//           </DialogTitle>
//           <DialogContent><Grid container spacing={2} sx={{ mt: 1 }}><Grid item xs={12}><FormControl fullWidth><InputLabel>Select Employee</InputLabel><Select value={selectedEmployeeForManagerChange} onChange={(e) => setSelectedEmployeeForManagerChange(e.target.value)} label="Select Employee">{allEmployeesForDropdown.map((emp) => (<MenuItem key={emp.value} value={emp.value}>{emp.label}</MenuItem>))}</Select></FormControl></Grid><Grid item xs={12}><FormControl fullWidth><InputLabel>Select New Manager</InputLabel><Select value={newManager} onChange={(e) => setNewManager(e.target.value)} label="Select New Manager">{allEmployeesForDropdown.map((emp) => (<MenuItem key={emp.value} value={emp.value}>{emp.label}</MenuItem>))}</Select></FormControl></Grid></Grid></DialogContent>
//           <DialogActions>
//             <Button onClick={() => setOpenChangeManagerForm(false)} sx={cancelOrangeTextSx}>Cancel</Button>
//             <Button onClick={handleChangeManager} variant="contained" sx={purpleButtonSx}>Save</Button>
//           </DialogActions>
//         </Dialog>

//         <Dialog open={openEmployeeForm} onClose={() => setOpenEmployeeForm(false)} maxWidth="md" fullWidth ref={employeeDialogRef}>
//           <DialogTitle sx={{ bgcolor: themePurple, color: 'white' }}>
//             {isEditMode ? "Edit Employee" : "Add Employee"}
//             <IconButton onClick={() => setOpenEmployeeForm(false)} sx={{ position: "absolute", right: 8, top: 8, color: 'white' }}><CloseIcon /></IconButton>
//           </DialogTitle>
//           <DialogContent>
//             <Grid container spacing={2} sx={{ mt: 1 }}>
//               {!isEditMode && (<Grid item xs={12}><Autocomplete options={talentPool} getOptionLabel={(option) => option.email || ""} onChange={handleTalentSelect} onInputChange={(event, newInputValue) => { if (!talentPool.find(p => p.email === newInputValue)) { setCurrentEmployee(prev => ({ ...prev, email: newInputValue })); }}} renderInput={(params) => (<TextField {...params} label="Search Email to Auto-fill" />)} /></Grid>)}
//               <Grid item xs={12} sm={4}><TextField fullWidth label="First Name" name="firstName" value={currentEmployee.firstName || ""} onChange={handleInputChange} onKeyPress={(e) => { if (!/^[A-Za-z]$/.test(e.key)) e.preventDefault(); }} InputProps={{ readOnly: isEditMode }} /></Grid>
//               <Grid item xs={12} sm={4}><TextField fullWidth label="Middle Name" name="middleName" value={currentEmployee.middleName || ""} onChange={handleInputChange} onKeyPress={(e) => { if (!/^[A-Za-z]$/.test(e.key)) e.preventDefault(); }} InputProps={{ readOnly: isEditMode }} /></Grid>
//               <Grid item xs={12} sm={4}><TextField fullWidth label="Last Name" name="lastName" value={currentEmployee.lastName || ""} onChange={handleInputChange} onKeyPress={(e) => { if (!/^[A-Za-z]$/.test(e.key)) e.preventDefault(); }} InputProps={{ readOnly: isEditMode }} /></Grid>
//               <Grid item xs={12} sm={6}><TextField fullWidth label="Email" name="email" value={currentEmployee.email || ''} onChange={handleInputChange} InputProps={{ readOnly: isEditMode || !!talentPool.find(p => p.email === currentEmployee.email) }} /></Grid>
//               <Grid item xs={12} sm={6}><TextField fullWidth label="Phone" name="phone" value={currentEmployee.phone || ''} onChange={(e) => { const value = e.target.value; if (/^\d{0,10}$/.test(value)) handleInputChange(e); }} inputProps={{ maxLength: 10, inputMode: 'numeric', pattern: '[0-9]*' }} InputProps={{ readOnly: isEditMode }} /></Grid>
//               <Grid item xs={12} sm={6}><Autocomplete options={countries} getOptionLabel={(option) => option.country_name || ''} value={countries.find(c => c.country_id == currentEmployee.country_id) || null} onChange={(e, nv) => handleCountryChange(nv)} isOptionEqualToValue={(option, value) => option.country_id == value.country_id} renderInput={(params) => (<TextField {...params} label="Country" />)} /></Grid>
//               <Grid item xs={12} sm={6}><Autocomplete options={states} getOptionLabel={(option) => option.state_name || ''} value={states.find(s => s.state_id == currentEmployee.state_id) || null} onChange={(e, nv) => handleStateChange(nv)} isOptionEqualToValue={(option, value) => option.state_id == value.state_id} disabled={!currentEmployee.country_id} renderInput={(params) => (<TextField {...params} label="State" />)} /></Grid>
//               <Grid item xs={12} sm={6}><Autocomplete options={employeeHubs} getOptionLabel={(option) => option.employee_hub_name || ''} value={employeeHubs.find(h => h.employee_hub_id == currentEmployee.employee_hub_id) || null} onChange={(e, nv) => setCurrentEmployee(prev => ({ ...prev, employee_hub_id: nv ? nv.employee_hub_id : "" }))} isOptionEqualToValue={(option, value) => option.employee_hub_id == value.employee_hub_id} disabled={!currentEmployee.state_id} renderInput={(params) => (<TextField {...params} label="Employee Hub" />)} /></Grid>
//               <Grid item xs={12} sm={6}>
//                   <Autocomplete options={headquarters} getOptionLabel={(option) => option.headquarter_name || ''} value={headquarters.find(h => h.headquarter_id == currentEmployee.headquarter_id) || null} onChange={(e, nv) => setCurrentEmployee(prev => ({ ...prev, headquarter_id: nv ? nv.headquarter_id : "" }))} isOptionEqualToValue={(option, value) => option.headquarter_id == value.headquarter_id} renderInput={(params) => (<TextField {...params} label="Headquarter" />)} />
//               </Grid>
//               <Grid item xs={12} sm={6}><Autocomplete options={divisions} getOptionLabel={(option) => option.division_name || ''} value={divisions.find(d => d.division_id == currentEmployee.division_id) || null} onChange={(e, nv) => handleDivisionChange(nv)} isOptionEqualToValue={(option, value) => option.division_id == value.division_id} renderInput={(params) => (<TextField {...params} label="Division" />)} /></Grid>
//               <Grid item xs={12} sm={6}><Autocomplete options={subDivisionOptions} getOptionLabel={(option) => option.label || ''} value={subDivisionOptions.find(sd => sd.value === currentEmployee.subDivision) || null} onChange={(e, nv) => setCurrentEmployee(prev => ({ ...prev, subDivision: nv ? nv.value : "" }))} isOptionEqualToValue={(option, value) => option.value === value.value} disabled={isSubDivisionDisabled} renderInput={(params) => (<TextField {...params} label="Sub Division" />)} /></Grid>
//              <Grid item xs={12} sm={6}>
//                 <Autocomplete options={allEmployeesForDropdown} getOptionLabel={(option) => option.label || ''} value={allEmployeesForDropdown.find(e => e.value == currentEmployee.manager_id) || null} onChange={(e, nv) => setCurrentEmployee(prev => ({ ...prev, manager_id: nv ? nv.value : "" }))} isOptionEqualToValue={(option, value) => option.value == value.value} renderInput={(params) => (<TextField {...params} label="Manager" />)} />
//             </Grid>
//               <Grid item xs={12} sm={6}><Autocomplete options={departments} getOptionLabel={(option) => option.dept_name || ''} value={departments.find(d => d.dept_id == currentEmployee.department_id) || null} onChange={(e, nv) => handleDeptChange(nv)} isOptionEqualToValue={(option, value) => option.dept_id == value.dept_id} renderInput={(params) => (<TextField {...params} label="Department" />)} /></Grid>
//               <Grid item xs={12} sm={6}><Autocomplete options={designations} getOptionLabel={(option) => option.desig_name || ''} value={designations.find(d => d.desig_id == currentEmployee.designation_id) || null} onChange={(e, nv) => setCurrentEmployee(prev => ({ ...prev, designation_id: nv ? nv.desig_id : "" }))} isOptionEqualToValue={(option, value) => option.desig_id == value.desig_id} disabled={!currentEmployee.department_id} renderInput={(params) => (<TextField {...params} label="Designation" />)} /></Grid>
//               <Grid item xs={12} sm={6}><Autocomplete options={officeShifts} getOptionLabel={(option) => option.office_shift_name || ''} value={officeShifts.find(s => s.office_shift_id == currentEmployee.officeShift) || null} onChange={(e, nv) => setCurrentEmployee(prev => ({ ...prev, officeShift: nv ? nv.office_shift_id : "" }))} isOptionEqualToValue={(option, value) => option.office_shift_id == value.office_shift_id} renderInput={(params) => (<TextField {...params} label="Office Shift" />)} /></Grid>
//               <Grid item xs={12} sm={6}><Autocomplete options={statusOptions} getOptionLabel={(option) => option.label} value={statusOptions.find(s => s.value === currentEmployee.status) || null} onChange={(e, nv) => setCurrentEmployee(prev => ({ ...prev, status: nv ? nv.value : 1 }))} isOptionEqualToValue={(option, value) => option.value === value.value} renderInput={(params) => (<TextField {...params} label="Status" />)} /></Grid>
//               <Grid item xs={12} sm={6}><Autocomplete options={probationOptions} getOptionLabel={(option) => option.label} value={probationOptions.find(p => p.value === currentEmployee.is_probation) || null} onChange={(e, nv) => setCurrentEmployee(prev => ({ ...prev, is_probation: nv ? nv.value : "n" }))} isOptionEqualToValue={(option, value) => option.value === value.value} renderInput={(params) => (<TextField {...params} label="On Probation" />)} /></Grid>
//               <Grid item xs={12} sm={6}><TextField fullWidth label="Join Date" name="join_date" type="date" value={currentEmployee.join_date || ""} onChange={handleInputChange} InputLabelProps={{ shrink: true }} /></Grid>
//               <Grid item xs={12} sm={6}><Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}><Button variant="contained" component="label" disabled={isEditMode} sx={purpleButtonSx}>Upload Photo<input type="file" hidden accept="image/*" onChange={handleFileUpload} /></Button>{currentEmployee.avatar && <Avatar src={typeof currentEmployee.avatar === 'string' ? currentEmployee.avatar : URL.createObjectURL(currentEmployee.avatar)} sx={{ width: 56, height: 56 }} />}</Box></Grid>
//               <Grid item xs={12}>{isFetchingDocs && <CircularProgress />}{employeeDocuments && !isFetchingDocs && (<Box><Typography variant="subtitle1" gutterBottom>Fetched Documents</Typography><Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>{Object.entries(employeeDocuments).map(([name, url]) => (url ? (<Chip key={name} label={name.replace(/_/g, ' ')} component="a" href={url} target="_blank" clickable icon={<LinkIcon />} variant="outlined" color="secondary" size="small" />) : null))}</Box></Box>)}</Grid>
//               {!isEditMode && (<>
//                 <Grid item xs={12} sm={6}><Autocomplete options={genderOptions} getOptionLabel={(option) => option.label} value={genderOptions.find(g => g.value === currentEmployee.gender) || null} onChange={(e, nv) => setCurrentEmployee(prev => ({ ...prev, gender: nv ? nv.value : "" }))} isOptionEqualToValue={(option, value) => option.value === value.value} renderInput={(params) => (<TextField {...params} label="Gender" />)} /></Grid>
//                 <Grid item xs={12} sm={6}><TextField fullWidth label="Username" name="username" value={currentEmployee.username || ""} onChange={handleInputChange} InputProps={{ readOnly: true }} /></Grid>
//                 <Grid item xs={12} sm={6}><TextField fullWidth label="Password" name="password" value={currentEmployee.password || ""} onChange={handleInputChange} type={showPassword ? 'text' : 'password'} InputProps={{ endAdornment: (<InputAdornment position="end"> <IconButton aria-label="toggle password visibility" onClick={() => setShowPassword((prev) => !prev)} onMouseDown={(e) => e.preventDefault()} edge="end"> {showPassword ? <VisibilityOff /> : <Visibility />} </IconButton> </InputAdornment>) }} /></Grid>
//                 <Grid item xs={12} sm={6}><Autocomplete options={roles} getOptionLabel={(option) => option.role_name || ''} value={roles.find(r => r.index == currentEmployee.role) || null} onChange={(e, nv) => setCurrentEmployee(prev => ({ ...prev, role: nv ? nv.index : "" }))} isOptionEqualToValue={(option, value) => option.index == value.index} renderInput={(params) => (<TextField {...params} label="Role" />)} /></Grid>
//                 <Grid item xs={12} sm={6}><TextField fullWidth label="Gross Salary" name="grossSalary" type="number" value={currentEmployee.grossSalary || ""} onChange={(e) => { const value = e.target.value; if (/^\d*\.?\d*$/.test(value)) handleInputChange(e); }} /></Grid>
//               </>)}
//             </Grid>
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={() => setOpenEmployeeForm(false)} disabled={isSaving} sx={cancelOrangeTextSx}>Cancel</Button>
//             <Button onClick={handleSaveEmployee} variant="contained" disabled={isSaving} sx={purpleButtonSx}>{isSaving ? <CircularProgress size={24} color="inherit" /> : "Save"}</Button>
//           </DialogActions>
//         </Dialog>

//         <Paper sx={{ width: "100%", mb: 2 }}>
//           <Box sx={{ p: 2, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: 'wrap', gap: 2 }}>
//             <FormControl sx={{ minWidth: 120 }} size="small">
//               <InputLabel>Rows per page</InputLabel>
//               <Select value={rowsPerPage} label="Rows per page" onChange={handleRowsPerPageChange}>
//                 <MenuItem value={5}>5</MenuItem>
//                 <MenuItem value={10}>10</MenuItem>
//                 <MenuItem value={25}>25</MenuItem>
//                 <MenuItem value={50}>50</MenuItem>
//               </Select>
//             </FormControl>
//             <TextField label="Search" placeholder="Search..." variant="outlined" size="small" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} sx={{ width: { xs: '100%', sm: 300 } }} />
//           </Box>
//           <TableContainer>
//             <Table size="small" sx={{ minWidth: "100%", whiteSpace: "nowrap", "& .MuiTableCell-root": { padding: "4px 8px", fontSize: '0.8rem' }}}>
//               <TableHead>
//                 <TableRow sx={{ bgcolor: themePurple }}>
//                   <TableCell sx={{ fontWeight: 'bold', width: '5%', fontSize: '0.9rem', color: 'white' }}>SR. NO.</TableCell>
//                   <TableCell sx={{ fontWeight: 'bold', width: '25%', fontSize: '0.9rem', color: 'white' }}>EMPLOYEE</TableCell>
//                   <TableCell sx={{ width: '5%', color: 'white' }}></TableCell>
//                   <TableCell sx={{ fontWeight: 'bold', width: '15%', fontSize: '0.9rem', color: 'white' }}>DEPARTMENT</TableCell>
//                   <TableCell sx={{ fontWeight: 'bold', width: '15%', fontSize: '0.9rem', color: 'white' }}>DESIGNATION</TableCell>
//                   <TableCell sx={{ fontWeight: 'bold', width: '10%', fontSize: '0.9rem', color: 'white' }}>JOIN DATE</TableCell>
//                   <TableCell sx={{ fontWeight: 'bold', width: '10%', fontSize: '0.9rem', color: 'white' }}>STATUS</TableCell>
//                   <TableCell sx={{ fontWeight: 'bold', width: '15%', fontSize: '0.9rem', color: 'white' }}>MANAGER</TableCell>
//                   <TableCell sx={{ fontWeight: 'bold', width: '10%', fontSize: '0.9rem', textAlign: 'center', color: 'white' }}>ACTIONS</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {currentEmployees.map((employee, index) => (
//                   <TableRow key={employee.user_id} onMouseEnter={() => handleRowHover(employee.user_id)} onMouseLeave={handleRowLeave} sx={{ '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' } }}>
//                     <TableCell>{indexOfFirstEmployee + index + 1}</TableCell>
//                     <TableCell><Box sx={{ display: "flex", alignItems: "center", gap: 2 }}><Typography variant="body2">{employee.employee_name}</Typography></Box></TableCell>
//                     <TableCell sx={{ padding: '0 8px', textAlign: 'center' }}>{hoveredRowId === employee.user_id && (<IconButton onClick={() => handleArrowClick(employee.user_id)} size="small" sx={{ color: themeOrange, transition: 'all 0.2s ease-in-out', '&:hover': { backgroundColor: 'rgba(245, 142, 53, 0.1)', transform: 'scale(1.1)' }}}><ArrowForwardIcon fontSize="small" /></IconButton>)}</TableCell>
//                     <TableCell>{employee.department_name || 'N/A'}</TableCell>
//                     <TableCell>{employee.designation_name || 'N/A'}</TableCell>
//                     <TableCell>{formatDate(employee.join_date)}</TableCell>
//                     <TableCell>
//                         <Chip 
//                             label={employee.status === 1 ? "Active" : "Inactive"} 
//                             size="small"
//                             sx={{
//                                 bgcolor: employee.status === 1 ? themePurple : themeOrange,
//                                 color: 'white'
//                             }} 
//                         />
//                     </TableCell>
//                     <TableCell>{employee.manager}</TableCell>
//                     <TableCell sx={{ textAlign: 'center' }}>
//                         <Tooltip title="Edit"><IconButton onClick={() => handleEditEmployee(employee)} sx={{ color: themePurple }}><EditIcon /></IconButton></Tooltip>
//                         <Tooltip title="Delete"><IconButton onClick={() => handleDeleteEmployee(employee.user_id)} sx={{ color: themeOrange }}><DeleteIcon /></IconButton></Tooltip>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>

//           <Box sx={{ p: 2, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: 'wrap', gap: 2, borderTop: '1px solid rgba(224, 224, 224, 1)' }}>
//             <Typography variant="body2">
//               Showing <Box component="span" sx={{ fontWeight: "bold" }}>{filteredEmployees.length > 0 ? indexOfFirstEmployee + 1 : 0}</Box> - <Box component="span" sx={{ fontWeight: "bold" }}>{Math.min(indexOfLastEmployee, filteredEmployees.length)}</Box> of <Box component="span" sx={{ fontWeight: "bold" }}>{filteredEmployees.length}</Box> Employees
//             </Typography>
//             <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//                 <Button variant="contained" disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)} sx={purpleButtonSx}>Previous</Button>
//                 <Typography sx={{ mx: 1 }}>Page {currentPage} of {totalPages}</Typography>
//                 <Button variant="contained" disabled={indexOfLastEmployee >= filteredEmployees.length} onClick={() => setCurrentPage(currentPage + 1)} sx={purpleButtonSx}>Next</Button>
//             </Box>
//           </Box>
//         </Paper>
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
// const probationOptions = [{ value: 'y', label: 'Yes' }, { value: 'n', label: 'No' }];
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
//   const [rowsPerPage, setRowsPerPage] = useState(10);
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

//   // --- THEME COLORS ---
//   const themePurple = '#8C257C';
//   const themeOrange = '#F58E35';
  
//   const purpleButtonSx = {
//     backgroundColor: themePurple,
//     '&:hover': {
//       backgroundColor: '#731f65', // Darker purple
//     },
//     padding: '4px 10px',
//     height: '32px',
//   };

//   const cancelOrangeTextSx = {
//     color: themeOrange,
//     '&:hover': {
//         backgroundColor: 'rgba(245, 142, 53, 0.1)'
//     }
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
//           axios.get("https://tdtlworld.com/hrms-backend/api/headquarters/")
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

//   // --- FULLY UPDATED FUNCTION ---
//   const handleEditEmployee = async (employee) => {
//     if (!employee || !employee.user_id) return;
//     try {
//         const response = await axiosInstance.get(`api/edit_employee/${employee.user_id}/`);
//         if (response.data.status !== "success" || response.data.data.length === 0) {
//             Swal.fire('Error', 'Failed to load employee details for editing.', 'error');
//             return;
//         }
//         const empData = response.data.data[0];

//         // Fetch all dependent data in parallel
//         const [desigRes, statesRes, hubsRes, headquartersRes] = await Promise.all([
//             axiosInstance.get(`api/desig_dept_dropdown/?dept_id=${empData.department_id}/`),
//             axiosInstance.get(`api/states/?country_name=${empData.country_name}`),
//             axiosInstance.get(`api/employee_hub_dropdown/${empData.state}/`),
//             axiosInstance.get('https://tdtlworld.com/hrms-backend/api/headquarters/')
//         ]);

//         // Set the fetched data into state
//         const fetchedHeadquarters = headquartersRes.data || [];
//         setDesignations(desigRes.data.desig_data || []);
//         setStates(statesRes.data.data || []);
//         setEmployeeHubs(hubsRes.data.data || []);
//         setHeadquarters(fetchedHeadquarters);

//         const officeShiftObj = officeShifts.find(s => s.office_shift_name === empData.office_shift);
//         const nameParts = (empData.emp_name || "").split(" ");
//         const selectedCountry = countries.find(c => c.country_name === empData.country_name);

//         // Find the full headquarter object using the name provided by the employee API
//         const selectedHeadquarter = fetchedHeadquarters.find(
//             hq => hq.headquarter_name === empData.headquarter
//         );

//         // Map the partial API value ("Tred") to the full value required by the dropdown ("TredBiz")
//         let finalSubDivisionValue = empData.sub_division || "";
//         if (finalSubDivisionValue === "Tred") {
//             finalSubDivisionValue = "TredBiz";
//         }
//         // You can add more 'else if' conditions here if other partial values exist.

//         setCurrentEmployee({
//             id: employee.user_id,
//             firstName: nameParts[0] || "",
//             middleName: nameParts.length > 2 ? nameParts.slice(1, -1).join(" ") : "",
//             lastName: nameParts.length > 1 ? nameParts[nameParts.length - 1] : "",
//             email: empData.email || "",
//             phone: empData.phone || "",
//             manager_id: empData.manager_id ? Number(empData.manager_id) : "",
//             designation_id: empData.designation_id ? Number(empData.designation_id) : "",
//             department_id: empData.department_id ? Number(empData.department_id) : "",
//             headquarter_id: selectedHeadquarter ? selectedHeadquarter.headquarter_id : "",
            
//             // Use the corrected, mapped value
//             subDivision: finalSubDivisionValue,

//             division_id: empData.division_id ? Number(empData.division_id) : "",
//             state_id: empData.state ? Number(empData.state) : "",
//             employee_hub_id: empData.employee_hub_id ? Number(empData.employee_hub_id) : "",
//             role: empData.role_id ? Number(empData.role_id) : "",
//             officeShift: officeShiftObj ? Number(officeShiftObj.office_shift_id) : "",
//             status: Number(empData.status),
//             join_date: empData.join_date ? empData.join_date.split(" ")[0] : "",
//             country_id: selectedCountry ? Number(selectedCountry.country_id) : "",
//             avatar: empData.profile_photo || "",
//             is_probation: empData.probation?.toLowerCase() === 'y' ? 'y' : 'n',
//             resumeUrl: "",
//         });

//         setIsEditMode(true);
//         setOpenEmployeeForm(true);
//         setShowPassword(false);
//     } catch (error) {
//         console.error("Error fetching employee details for edit:", error);
//         Swal.fire('Error', 'Failed to fetch complete employee details. Please try again.', 'error');
//     }
//   };


//   const handleSaveEmployee = async () => {
//     if (!isEditMode) {
//       const requiredFields = {
//         firstName: 'First Name', lastName: 'Last Name', email: 'Email', phone: 'Phone', country_id: 'Country',
//         state_id: 'State', employee_hub_id: 'Employee Hub', headquarter_id: 'Headquarter', division_id: 'Division',
//         manager_id: 'Manager', department_id: 'Department', designation_id: 'Designation', officeShift: 'Office Shift',
//         join_date: 'Join Date', avatar: 'Photo', gender: 'Gender', username: 'Username', password: 'Password',
//         role: 'Role', grossSalary: 'Gross Salary'
//       };
//       const selectedDivision = divisions.find(d => d.division_id == currentEmployee.division_id);
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
//       showCancelButton: true, confirmButtonColor: themePurple, cancelButtonColor: themeOrange,
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
//   const totalPages = Math.ceil(filteredEmployees.length / rowsPerPage) || 1;

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
//     const selectedDivision = divisions.find(d => d.division_id == currentEmployee.division_id);
//     return !selectedDivision || selectedDivision.division_name !== 'Livestock';
//   }, [currentEmployee.division_id, divisions]);


//   const formatDate = (dateString) => {
//     if (!dateString) return '';
//     try {
//       const date = new Date(dateString);
//       const day = String(date.getDate()).padStart(2, '0');
//       const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
//       const year = date.getFullYear();
//       return `${day}/${month}/${year}`;
//     } catch (error) {
//       // If the date format is unexpected, return the original string
//       console.error("Could not format date:", dateString);
//       return dateString;
//     }
//   };


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
//           <DialogTitle sx={{ bgcolor: themePurple, color: 'white' }}>
//             Change Manager
//             <IconButton onClick={() => setOpenChangeManagerForm(false)} sx={{ position: "absolute", right: 8, top: 8, color: 'white' }}><CloseIcon /></IconButton>
//           </DialogTitle>
//           <DialogContent><Grid container spacing={2} sx={{ mt: 1 }}><Grid item xs={12}><FormControl fullWidth><InputLabel>Select Employee</InputLabel><Select value={selectedEmployeeForManagerChange} onChange={(e) => setSelectedEmployeeForManagerChange(e.target.value)} label="Select Employee">{allEmployeesForDropdown.map((emp) => (<MenuItem key={emp.value} value={emp.value}>{emp.label}</MenuItem>))}</Select></FormControl></Grid><Grid item xs={12}><FormControl fullWidth><InputLabel>Select New Manager</InputLabel><Select value={newManager} onChange={(e) => setNewManager(e.target.value)} label="Select New Manager">{allEmployeesForDropdown.map((emp) => (<MenuItem key={emp.value} value={emp.value}>{emp.label}</MenuItem>))}</Select></FormControl></Grid></Grid></DialogContent>
//           <DialogActions>
//             <Button onClick={() => setOpenChangeManagerForm(false)} sx={cancelOrangeTextSx}>Cancel</Button>
//             <Button onClick={handleChangeManager} variant="contained" sx={purpleButtonSx}>Save</Button>
//           </DialogActions>
//         </Dialog>

//         <Dialog open={openEmployeeForm} onClose={() => setOpenEmployeeForm(false)} maxWidth="md" fullWidth ref={employeeDialogRef}>
//           <DialogTitle sx={{ bgcolor: themePurple, color: 'white' }}>
//             {isEditMode ? "Edit Employee" : "Add Employee"}
//             <IconButton onClick={() => setOpenEmployeeForm(false)} sx={{ position: "absolute", right: 8, top: 8, color: 'white' }}><CloseIcon /></IconButton>
//           </DialogTitle>
//           <DialogContent>
//             <Grid container spacing={2} sx={{ mt: 1 }}>
//               {!isEditMode && (<Grid item xs={12}><Autocomplete options={talentPool} getOptionLabel={(option) => option.email || ""} onChange={handleTalentSelect} onInputChange={(event, newInputValue) => { if (!talentPool.find(p => p.email === newInputValue)) { setCurrentEmployee(prev => ({ ...prev, email: newInputValue })); }}} renderInput={(params) => (<TextField {...params} label="Search Email to Auto-fill" />)} /></Grid>)}
//               <Grid item xs={12} sm={4}><TextField fullWidth label="First Name" name="firstName" value={currentEmployee.firstName || ""} onChange={handleInputChange} onKeyPress={(e) => { if (!/^[A-Za-z]$/.test(e.key)) e.preventDefault(); }} InputProps={{ readOnly: isEditMode }} /></Grid>
//               <Grid item xs={12} sm={4}><TextField fullWidth label="Middle Name" name="middleName" value={currentEmployee.middleName || ""} onChange={handleInputChange} onKeyPress={(e) => { if (!/^[A-Za-z]$/.test(e.key)) e.preventDefault(); }} InputProps={{ readOnly: isEditMode }} /></Grid>
//               <Grid item xs={12} sm={4}><TextField fullWidth label="Last Name" name="lastName" value={currentEmployee.lastName || ""} onChange={handleInputChange} onKeyPress={(e) => { if (!/^[A-Za-z]$/.test(e.key)) e.preventDefault(); }} InputProps={{ readOnly: isEditMode }} /></Grid>
//               <Grid item xs={12} sm={6}><TextField fullWidth label="Email" name="email" value={currentEmployee.email || ''} onChange={handleInputChange} InputProps={{ readOnly: isEditMode || !!talentPool.find(p => p.email === currentEmployee.email) }} /></Grid>
//               <Grid item xs={12} sm={6}><TextField fullWidth label="Phone" name="phone" value={currentEmployee.phone || ''} onChange={(e) => { const value = e.target.value; if (/^\d{0,10}$/.test(value)) handleInputChange(e); }} inputProps={{ maxLength: 10, inputMode: 'numeric', pattern: '[0-9]*' }} InputProps={{ readOnly: isEditMode }} /></Grid>
//               <Grid item xs={12} sm={6}><Autocomplete options={countries} getOptionLabel={(option) => option.country_name || ''} value={countries.find(c => c.country_id == currentEmployee.country_id) || null} onChange={(e, nv) => handleCountryChange(nv)} isOptionEqualToValue={(option, value) => option.country_id == value.country_id} renderInput={(params) => (<TextField {...params} label="Country" />)} /></Grid>
//               <Grid item xs={12} sm={6}><Autocomplete options={states} getOptionLabel={(option) => option.state_name || ''} value={states.find(s => s.state_id == currentEmployee.state_id) || null} onChange={(e, nv) => handleStateChange(nv)} isOptionEqualToValue={(option, value) => option.state_id == value.state_id} disabled={!currentEmployee.country_id} renderInput={(params) => (<TextField {...params} label="State" />)} /></Grid>
//               <Grid item xs={12} sm={6}><Autocomplete options={employeeHubs} getOptionLabel={(option) => option.employee_hub_name || ''} value={employeeHubs.find(h => h.employee_hub_id == currentEmployee.employee_hub_id) || null} onChange={(e, nv) => setCurrentEmployee(prev => ({ ...prev, employee_hub_id: nv ? nv.employee_hub_id : "" }))} isOptionEqualToValue={(option, value) => option.employee_hub_id == value.employee_hub_id} disabled={!currentEmployee.state_id} renderInput={(params) => (<TextField {...params} label="Employee Hub" />)} /></Grid>
//               <Grid item xs={12} sm={6}>
//                   <Autocomplete options={headquarters} getOptionLabel={(option) => option.headquarter_name || ''} value={headquarters.find(h => h.headquarter_id == currentEmployee.headquarter_id) || null} onChange={(e, nv) => setCurrentEmployee(prev => ({ ...prev, headquarter_id: nv ? nv.headquarter_id : "" }))} isOptionEqualToValue={(option, value) => option.headquarter_id == value.headquarter_id} renderInput={(params) => (<TextField {...params} label="Headquarter" />)} />
//               </Grid>
//               <Grid item xs={12} sm={6}><Autocomplete options={divisions} getOptionLabel={(option) => option.division_name || ''} value={divisions.find(d => d.division_id == currentEmployee.division_id) || null} onChange={(e, nv) => handleDivisionChange(nv)} isOptionEqualToValue={(option, value) => option.division_id == value.division_id} renderInput={(params) => (<TextField {...params} label="Division" />)} /></Grid>
//               <Grid item xs={12} sm={6}><Autocomplete options={subDivisionOptions} getOptionLabel={(option) => option.label || ''} value={subDivisionOptions.find(sd => sd.value === currentEmployee.subDivision) || null} onChange={(e, nv) => setCurrentEmployee(prev => ({ ...prev, subDivision: nv ? nv.value : "" }))} isOptionEqualToValue={(option, value) => option.value === value.value} disabled={isSubDivisionDisabled} renderInput={(params) => (<TextField {...params} label="Sub Division" />)} /></Grid>
//              <Grid item xs={12} sm={6}>
//                 <Autocomplete options={allEmployeesForDropdown} getOptionLabel={(option) => option.label || ''} value={allEmployeesForDropdown.find(e => e.value == currentEmployee.manager_id) || null} onChange={(e, nv) => setCurrentEmployee(prev => ({ ...prev, manager_id: nv ? nv.value : "" }))} isOptionEqualToValue={(option, value) => option.value == value.value} renderInput={(params) => (<TextField {...params} label="Manager" />)} />
//             </Grid>
//               <Grid item xs={12} sm={6}><Autocomplete options={departments} getOptionLabel={(option) => option.dept_name || ''} value={departments.find(d => d.dept_id == currentEmployee.department_id) || null} onChange={(e, nv) => handleDeptChange(nv)} isOptionEqualToValue={(option, value) => option.dept_id == value.dept_id} renderInput={(params) => (<TextField {...params} label="Department" />)} /></Grid>
//               <Grid item xs={12} sm={6}><Autocomplete options={designations} getOptionLabel={(option) => option.desig_name || ''} value={designations.find(d => d.desig_id == currentEmployee.designation_id) || null} onChange={(e, nv) => setCurrentEmployee(prev => ({ ...prev, designation_id: nv ? nv.desig_id : "" }))} isOptionEqualToValue={(option, value) => option.desig_id == value.desig_id} disabled={!currentEmployee.department_id} renderInput={(params) => (<TextField {...params} label="Designation" />)} /></Grid>
//               <Grid item xs={12} sm={6}><Autocomplete options={officeShifts} getOptionLabel={(option) => option.office_shift_name || ''} value={officeShifts.find(s => s.office_shift_id == currentEmployee.officeShift) || null} onChange={(e, nv) => setCurrentEmployee(prev => ({ ...prev, officeShift: nv ? nv.office_shift_id : "" }))} isOptionEqualToValue={(option, value) => option.office_shift_id == value.office_shift_id} renderInput={(params) => (<TextField {...params} label="Office Shift" />)} /></Grid>
//               <Grid item xs={12} sm={6}><Autocomplete options={statusOptions} getOptionLabel={(option) => option.label} value={statusOptions.find(s => s.value === currentEmployee.status) || null} onChange={(e, nv) => setCurrentEmployee(prev => ({ ...prev, status: nv ? nv.value : 1 }))} isOptionEqualToValue={(option, value) => option.value === value.value} renderInput={(params) => (<TextField {...params} label="Status" />)} /></Grid>
//               <Grid item xs={12} sm={6}><Autocomplete options={probationOptions} getOptionLabel={(option) => option.label} value={probationOptions.find(p => p.value === currentEmployee.is_probation) || null} onChange={(e, nv) => setCurrentEmployee(prev => ({ ...prev, is_probation: nv ? nv.value : "n" }))} isOptionEqualToValue={(option, value) => option.value === value.value} renderInput={(params) => (<TextField {...params} label="On Probation" />)} /></Grid>
//               <Grid item xs={12} sm={6}><TextField fullWidth label="Join Date" name="join_date" type="date" value={currentEmployee.join_date || ""} onChange={handleInputChange} InputLabelProps={{ shrink: true }} /></Grid>
//               <Grid item xs={12} sm={6}><Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}><Button variant="contained" component="label" disabled={isEditMode} sx={purpleButtonSx}>Upload Photo<input type="file" hidden accept="image/*" onChange={handleFileUpload} /></Button>{currentEmployee.avatar && <Avatar src={typeof currentEmployee.avatar === 'string' ? currentEmployee.avatar : URL.createObjectURL(currentEmployee.avatar)} sx={{ width: 56, height: 56 }} />}</Box></Grid>
//               <Grid item xs={12}>{isFetchingDocs && <CircularProgress />}{employeeDocuments && !isFetchingDocs && (<Box><Typography variant="subtitle1" gutterBottom>Fetched Documents</Typography><Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>{Object.entries(employeeDocuments).map(([name, url]) => (url ? (<Chip key={name} label={name.replace(/_/g, ' ')} component="a" href={url} target="_blank" clickable icon={<LinkIcon />} variant="outlined" color="secondary" size="small" />) : null))}</Box></Box>)}</Grid>
//               {!isEditMode && (<>
//                 <Grid item xs={12} sm={6}><Autocomplete options={genderOptions} getOptionLabel={(option) => option.label} value={genderOptions.find(g => g.value === currentEmployee.gender) || null} onChange={(e, nv) => setCurrentEmployee(prev => ({ ...prev, gender: nv ? nv.value : "" }))} isOptionEqualToValue={(option, value) => option.value === value.value} renderInput={(params) => (<TextField {...params} label="Gender" />)} /></Grid>
//                 <Grid item xs={12} sm={6}><TextField fullWidth label="Username" name="username" value={currentEmployee.username || ""} onChange={handleInputChange} InputProps={{ readOnly: true }} /></Grid>
//                 <Grid item xs={12} sm={6}><TextField fullWidth label="Password" name="password" value={currentEmployee.password || ""} onChange={handleInputChange} type={showPassword ? 'text' : 'password'} InputProps={{ endAdornment: (<InputAdornment position="end"> <IconButton aria-label="toggle password visibility" onClick={() => setShowPassword((prev) => !prev)} onMouseDown={(e) => e.preventDefault()} edge="end"> {showPassword ? <VisibilityOff /> : <Visibility />} </IconButton> </InputAdornment>) }} /></Grid>
//                 <Grid item xs={12} sm={6}><Autocomplete options={roles} getOptionLabel={(option) => option.role_name || ''} value={roles.find(r => r.index == currentEmployee.role) || null} onChange={(e, nv) => setCurrentEmployee(prev => ({ ...prev, role: nv ? nv.index : "" }))} isOptionEqualToValue={(option, value) => option.index == value.index} renderInput={(params) => (<TextField {...params} label="Role" />)} /></Grid>
//                 <Grid item xs={12} sm={6}><TextField fullWidth label="Gross Salary" name="grossSalary" type="number" value={currentEmployee.grossSalary || ""} onChange={(e) => { const value = e.target.value; if (/^\d*\.?\d*$/.test(value)) handleInputChange(e); }} /></Grid>
//               </>)}
//             </Grid>
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={() => setOpenEmployeeForm(false)} disabled={isSaving} sx={cancelOrangeTextSx}>Cancel</Button>
//             <Button onClick={handleSaveEmployee} variant="contained" disabled={isSaving} sx={purpleButtonSx}>{isSaving ? <CircularProgress size={24} color="inherit" /> : "Save"}</Button>
//           </DialogActions>
//         </Dialog>

//         <Paper sx={{ width: "100%", mb: 2 }}>
//           <Box sx={{ p: 2, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: 'wrap', gap: 2 }}>
//             <FormControl sx={{ minWidth: 120 }} size="small">
//               <InputLabel>Rows per page</InputLabel>
//               <Select value={rowsPerPage} label="Rows per page" onChange={handleRowsPerPageChange}>
//                 <MenuItem value={5}>5</MenuItem>
//                 <MenuItem value={10}>10</MenuItem>
//                 <MenuItem value={25}>25</MenuItem>
//                 <MenuItem value={50}>50</MenuItem>
//               </Select>
//             </FormControl>
//             <TextField label="Search" placeholder="Search..." variant="outlined" size="small" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} sx={{ width: { xs: '100%', sm: 300 } }} />
//           </Box>
//           <TableContainer>
//             <Table size="small" sx={{ minWidth: "100%", whiteSpace: "nowrap", "& .MuiTableCell-root": { padding: "4px 8px", fontSize: '0.8rem' }}}>
//               <TableHead>
//                 <TableRow sx={{ bgcolor: themePurple }}>
//                   <TableCell sx={{ fontWeight: 'bold', width: '5%', fontSize: '0.9rem', color: 'white' }}>SR. NO.</TableCell>
//                   <TableCell sx={{ fontWeight: 'bold', width: '25%', fontSize: '0.9rem', color: 'white' }}>EMPLOYEE</TableCell>
//                   <TableCell sx={{ width: '5%', color: 'white' }}></TableCell>
//                   <TableCell sx={{ fontWeight: 'bold', width: '15%', fontSize: '0.9rem', color: 'white' }}>DEPARTMENT</TableCell>
//                   <TableCell sx={{ fontWeight: 'bold', width: '15%', fontSize: '0.9rem', color: 'white' }}>DESIGNATION</TableCell>
//                   <TableCell sx={{ fontWeight: 'bold', width: '10%', fontSize: '0.9rem', color: 'white' }}>JOIN DATE</TableCell>
//                   <TableCell sx={{ fontWeight: 'bold', width: '10%', fontSize: '0.9rem', color: 'white' }}>STATUS</TableCell>
//                   <TableCell sx={{ fontWeight: 'bold', width: '15%', fontSize: '0.9rem', color: 'white' }}>MANAGER</TableCell>
//                   <TableCell sx={{ fontWeight: 'bold', width: '10%', fontSize: '0.9rem', textAlign: 'center', color: 'white' }}>ACTIONS</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {currentEmployees.map((employee, index) => (
//                   <TableRow key={employee.user_id} onMouseEnter={() => handleRowHover(employee.user_id)} onMouseLeave={handleRowLeave} sx={{ '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' } }}>
//                     <TableCell>{indexOfFirstEmployee + index + 1}</TableCell>
//                     <TableCell><Box sx={{ display: "flex", alignItems: "center", gap: 2 }}><Typography variant="body2">{employee.employee_name}</Typography></Box></TableCell>
//                     <TableCell sx={{ padding: '0 8px', textAlign: 'center' }}>{hoveredRowId === employee.user_id && (<IconButton onClick={() => handleArrowClick(employee.user_id)} size="small" sx={{ color: themeOrange, transition: 'all 0.2s ease-in-out', '&:hover': { backgroundColor: 'rgba(245, 142, 53, 0.1)', transform: 'scale(1.1)' }}}><ArrowForwardIcon fontSize="small" /></IconButton>)}</TableCell>
//                     <TableCell>{employee.department_name || 'N/A'}</TableCell>
//                     <TableCell>{employee.designation_name || 'N/A'}</TableCell>
//                     <TableCell>{formatDate(employee.join_date)}</TableCell>
//                     <TableCell>
//                         <Chip 
//                             label={employee.status === 1 ? "Active" : "Inactive"} 
//                             size="small"
//                             sx={{
//                                 bgcolor: employee.status === 1 ? themePurple : themeOrange,
//                                 color: 'white'
//                             }} 
//                         />
//                     </TableCell>
//                     <TableCell>{employee.manager}</TableCell>
//                     <TableCell sx={{ textAlign: 'center' }}>
//                         <Tooltip title="Edit"><IconButton onClick={() => handleEditEmployee(employee)} sx={{ color: themePurple }}><EditIcon /></IconButton></Tooltip>
//                         <Tooltip title="Delete"><IconButton onClick={() => handleDeleteEmployee(employee.user_id)} sx={{ color: themeOrange }}><DeleteIcon /></IconButton></Tooltip>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>

//           <Box sx={{ p: 2, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: 'wrap', gap: 2, borderTop: '1px solid rgba(224, 224, 224, 1)' }}>
//             <Typography variant="body2">
//               Showing <Box component="span" sx={{ fontWeight: "bold" }}>{filteredEmployees.length > 0 ? indexOfFirstEmployee + 1 : 0}</Box> - <Box component="span" sx={{ fontWeight: "bold" }}>{Math.min(indexOfLastEmployee, filteredEmployees.length)}</Box> of <Box component="span" sx={{ fontWeight: "bold" }}>{filteredEmployees.length}</Box> Employees
//             </Typography>
//             <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//                 <Button variant="contained" disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)} sx={purpleButtonSx}>Previous</Button>
//                 <Typography sx={{ mx: 1 }}>Page {currentPage} of {totalPages}</Typography>
//                 <Button variant="contained" disabled={indexOfLastEmployee >= filteredEmployees.length} onClick={() => setCurrentPage(currentPage + 1)} sx={purpleButtonSx}>Next</Button>
//             </Box>
//           </Box>
//         </Paper>
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
// const probationOptions = [{ value: 'y', label: 'Yes' }, { value: 'n', label: 'No' }];
// const genderOptions = [{ value: 'Male', label: 'Male' }, { value: 'Female', label: 'Female' }, { value: 'Other', label: 'Other' }];
// const subDivisionOptions = [{ value: 'VetBiz', label: 'VetBiz' }, { value: 'TredBiz', label: 'TredBiz' }, { value: ' ', label: 'TredBiz Mix' }];

// export default function EmployeesView() {
//   const employeeDialogRef = useRef(null);
//   const changeManagerDialogRef = useRef(null);

//   // --- THEME & RESPONSIVENESS ---
//   const muiTheme = useTheme();
//   const isMobile = useMediaQuery(muiTheme.breakpoints.down("sm"));

//   // --- THEME COLORS ---
//   const themePurple = '#8C257C';
//   const themePurpleHover = '#6d1d60';
//   const themeOrange = '#F58E35';

//   const purpleButtonSx = {
//     backgroundColor: themePurple,
//     color: 'white',
//     '&:hover': {
//       backgroundColor: themePurpleHover,
//     },
//   };

//   const cancelButtonSx = {
//     color: '#757575',
//     '&:hover': {
//         backgroundColor: 'rgba(0, 0, 0, 0.04)'
//     }
//   };

//   const [loading, setLoading] = useState(true);
//   const [departments, setDepartments] = useState([]);
//   const [designations, setDesignations] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [openChangeManagerForm, setOpenChangeManagerForm] = useState(false);
//   const [currentPage, setCurrentPage] = useState(0); // For TablePagination (0-based)
//   const [rowsPerPage, setRowsPerPage] = useState(10);
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

//   const [currentEmployee, setCurrentEmployee] = useState({
//     id: null, firstName: "", middleName: "", lastName: "", email: "", join_date: "",
//     status: 1, phone: "", avatar: null, country_id: "", state_id: "", employee_hub_id: "",
//     headquarter_id: "", division_id: "", subDivision: "", role: "", is_probation: "n",
//     resumeUrl: "", password: "", gender: "", username: "", grossSalary: "", department_id: "",
//     designation_id: "", manager_id: "", officeShift: "",
//   });

//   const [openEmployeeForm, setOpenEmployeeForm] = useState(false);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [ depts, empDropdown, shifts, countriesRes, hubs, divs, rolesRes, talent,headquartersRes ] = await Promise.all([
//           axiosInstance.get('api/desig_dept_dropdown/'),
//           axiosInstance.get('employee-dropdown/'),
//           axiosInstance.get('api/office_shift_dropdown/'),
//           axiosInstance.get('api/countries/'),
//           axiosInstance.get('api/employee_hub/'),
//           axiosInstance.get('api/division/'),
//           axiosInstance.get('api/role_list/'),
//           axiosInstance.get('api/search_by_email_vet_talent/'),
//           axios.get("https://tdtlworld.com/hrms-backend/api/headquarters/")
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
//           Swal.fire({ icon: 'error', title: 'Error', text: 'Failed to fetch states.', target: employeeDialogRef.current, timer: 3000, showConfirmButton: false });
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
//           console.error("Error fetching employee hubs:", err);
//           Swal.fire({ icon: 'error', title: 'Error', text: 'Failed to fetch employee hubs.', target: employeeDialogRef.current, timer: 3000, showConfirmButton: false });
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
//           Swal.fire({ icon: 'error', title: 'Error', text: 'Failed to load designations.', target: employeeDialogRef.current, timer: 3000, showConfirmButton: false });
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
//   const handleArrowClick = (id) => navigate(`/hrms/admindashboard/employeedetail/${id}`);

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setCurrentEmployee((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleAddEmployee = async () => {
//     try {
//       const maxIdResponse = await axios.get("https://tdtlworld.com/hrms-backend/api/get_max_employee_id/");
//       const newEmpId = maxIdResponse.data.employee_id;
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
//       console.error("Error fetching max employee ID:", error);
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
//       setEmployeeDocuments(null);
//     } finally {
//       setIsFetchingDocs(false);
//     }
//   };

//   const handleEditEmployee = async (employee) => {
//     if (!employee || !employee.user_id) return;
//     try {
//         const response = await axiosInstance.get(`api/edit_employee/${employee.user_id}/`);
//         if (response.data.status !== "success" || response.data.data.length === 0) {
//             Swal.fire({ icon: 'error', title: 'Error', text: 'Failed to load employee details.', timer: 3000, showConfirmButton: false });
//             return;
//         }
//         const empData = response.data.data[0];

//         const [desigRes, statesRes, hubsRes] = await Promise.all([
//             axiosInstance.get(`api/desig_dept_dropdown/?dept_id=${empData.department_id}/`),
//             empData.country_name ? axiosInstance.get(`api/states/?country_name=${empData.country_name}`) : Promise.resolve({ data: { data: [] } }),
//             empData.state ? axiosInstance.get(`api/employee_hub_dropdown/${empData.state}/`) : Promise.resolve({ data: { data: [] } })
//         ]);

//         setDesignations(desigRes.data.desig_data || []);
//         setStates(statesRes.data.data || []);
//         setEmployeeHubs(hubsRes.data.data || []);
        
//         const officeShiftObj = officeShifts.find(s => s.office_shift_name === empData.office_shift);
//         const nameParts = (empData.emp_name || "").split(" ");
//         const selectedCountry = countries.find(c => c.country_name === empData.country_name);
//         const selectedHeadquarter = headquarters.find(hq => hq.headquarter_name === empData.headquarter);

//         let finalSubDivisionValue = empData.sub_division || "";
//         if (finalSubDivisionValue === "Tred") {
//             finalSubDivisionValue = "TredBiz";
//         }

//         setCurrentEmployee({
//             id: employee.user_id,
//             firstName: nameParts[0] || "",
//             middleName: nameParts.length > 2 ? nameParts.slice(1, -1).join(" ") : "",
//             lastName: nameParts.length > 1 ? nameParts[nameParts.length - 1] : "",
//             email: empData.email || "", phone: empData.phone || "",
//             manager_id: empData.manager_id ? Number(empData.manager_id) : "",
//             designation_id: empData.designation_id ? Number(empData.designation_id) : "",
//             department_id: empData.department_id ? Number(empData.department_id) : "",
//             headquarter_id: selectedHeadquarter ? selectedHeadquarter.headquarter_id : "",
//             subDivision: finalSubDivisionValue,
//             division_id: empData.division_id ? Number(empData.division_id) : "",
//             state_id: empData.state ? Number(empData.state) : "",
//             employee_hub_id: empData.employee_hub_id ? Number(empData.employee_hub_id) : "",
//             role: empData.role_id ? Number(empData.role_id) : "",
//             officeShift: officeShiftObj ? Number(officeShiftObj.office_shift_id) : "",
//             status: Number(empData.status),
//             join_date: empData.join_date ? empData.join_date.split(" ")[0] : "",
//             country_id: selectedCountry ? Number(selectedCountry.country_id) : "",
//             avatar: empData.profile_photo || "",
//             is_probation: empData.probation?.toLowerCase() === 'y' ? 'y' : 'n',
//             resumeUrl: "",
//         });

//         setIsEditMode(true);
//         setOpenEmployeeForm(true);
//         setShowPassword(false);
//     } catch (error) {
//         console.error("Error fetching employee details for edit:", error);
//         Swal.fire({ icon: 'error', title: 'Error', text: 'Failed to fetch complete employee details.', timer: 3000, showConfirmButton: false });
//     }
//   };


//   const handleSaveEmployee = async () => {
//     if (!isEditMode) {
//       const requiredFields = {
//         firstName: 'First Name', lastName: 'Last Name', email: 'Email', phone: 'Phone', country_id: 'Country',
//         state_id: 'State', employee_hub_id: 'Employee Hub', headquarter_id: 'Headquarter', division_id: 'Division',
//         manager_id: 'Manager', department_id: 'Department', designation_id: 'Designation', officeShift: 'Office Shift',
//         join_date: 'Join Date', avatar: 'Photo', gender: 'Gender', username: 'Username', password: 'Password',
//         role: 'Role', grossSalary: 'Gross Salary'
//       };
//       const selectedDivision = divisions.find(d => d.division_id == currentEmployee.division_id);
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
//       showCancelButton: true, confirmButtonColor: themePurple, cancelButtonColor: themeOrange,
//       confirmButtonText: 'Yes, delete it!'
//     }).then((result) => {
//       if (result.isConfirmed) {
//         axiosInstance.delete("api/edit_employee/", { data: { user_id: employeeId } })
//           .then(() => {
//             fetchEmployees();
//             Swal.fire({ icon: 'success', title: 'Deleted!', text: 'The employee has been deleted.', timer: 3000, showConfirmButton: false });
//           })
//           .catch((error) => {
//             console.error("Error deleting employee: ", error);
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
//   };

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

//   const handleChangePage = (event, newPage) => {
//     setCurrentPage(newPage);
//   };

//   const handleRowsPerPageChange = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setCurrentPage(0);
//   };

//   const handleFileUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) setCurrentEmployee((prev) => ({ ...prev, avatar: file }));
//   };

//   const isSubDivisionDisabled = useMemo(() => {
//     if (!currentEmployee.division_id) return true;
//     const selectedDivision = divisions.find(d => d.division_id == currentEmployee.division_id);
//     return !selectedDivision || selectedDivision.division_name !== 'Livestock';
//   }, [currentEmployee.division_id, divisions]);


//   const formatDate = (dateString) => {
//     if (!dateString) return '';
//     try {
//       const date = new Date(dateString);
//       const day = String(date.getDate()).padStart(2, '0');
//       const month = String(date.getMonth() + 1).padStart(2, '0');
//       const year = date.getFullYear();
//       return `${day}/${month}/${year}`;
//     } catch (error) {
//       console.error("Could not format date:", dateString);
//       return dateString.split(" ")[0];
//     }
//   };

//   return (
//     <Box component={Paper} p={3}>
//       <Typography variant="h4" sx={{ color: themePurple, fontWeight: "bold", mb: 5 }}>
//         Employees List
//       </Typography>


//       <Box sx={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           flexDirection: isMobile ? "column" : "row",
//           gap: 2,
//           mb: 2
//       }}>
//           <Box sx={{ display: 'flex', gap: 1, width: isMobile ? '100%' : 'auto', flexDirection: isMobile ? 'column' : 'row' }}>
//               <Button variant="contained" startIcon={<AddIcon />} onClick={handleAddEmployee} sx={{...purpleButtonSx, width: '100%' }}>Add Employee</Button>
//               <Button variant="contained" startIcon={<DownloadIcon />} onClick={handleExportEmployees} sx={{...purpleButtonSx, width: '100%' }}>Export</Button>
//               <Button variant="contained" startIcon={<ChangeManagerIcon />} onClick={() => setOpenChangeManagerForm(true)} sx={{...purpleButtonSx, width: '100%' }}>Change Manager</Button>
//           </Box>
//           <TextField
//               size="small"
//               placeholder="Search..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               sx={{ width: isMobile ? "100%" : "auto" }}
//               InputProps={{
//                   startAdornment: (
//                       <InputAdornment position="start">
//                           <SearchIcon />
//                       </InputAdornment>
//                   ),
//               }}
//           />
//       </Box>

//         <Dialog open={openChangeManagerForm} onClose={() => setOpenChangeManagerForm(false)} maxWidth="sm" fullWidth ref={changeManagerDialogRef}>
//           <DialogTitle sx={{ color: themePurple, fontWeight: 'bold' }}>
//             Change Manager
//             <IconButton onClick={() => setOpenChangeManagerForm(false)} sx={{ position: "absolute", right: 8, top: 8, color: (theme) => theme.palette.grey[500] }}><CloseIcon /></IconButton>
//           </DialogTitle>
//           <DialogContent><Grid container spacing={2} sx={{ mt: 1 }}><Grid item xs={12}><FormControl fullWidth><InputLabel>Select Employee</InputLabel><Select value={selectedEmployeeForManagerChange} onChange={(e) => setSelectedEmployeeForManagerChange(e.target.value)} label="Select Employee">{allEmployeesForDropdown.map((emp) => (<MenuItem key={emp.value} value={emp.value}>{emp.label}</MenuItem>))}</Select></FormControl></Grid><Grid item xs={12}><FormControl fullWidth><InputLabel>Select New Manager</InputLabel><Select value={newManager} onChange={(e) => setNewManager(e.target.value)} label="Select New Manager">{allEmployeesForDropdown.map((emp) => (<MenuItem key={emp.value} value={emp.value}>{emp.label}</MenuItem>))}</Select></FormControl></Grid></Grid></DialogContent>
//           <DialogActions>
//             <Button onClick={() => setOpenChangeManagerForm(false)} sx={cancelButtonSx}>Cancel</Button>
//             <Button onClick={handleChangeManager} variant="contained" sx={purpleButtonSx}>Save</Button>
//           </DialogActions>
//         </Dialog>

//         <Dialog open={openEmployeeForm} onClose={() => setOpenEmployeeForm(false)} maxWidth="md" fullWidth ref={employeeDialogRef}>
//             <DialogTitle sx={{ color: themePurple, fontWeight: 'bold' }}>
//             {isEditMode ? "Edit Employee" : "Add Employee"}
//             <IconButton onClick={() => setOpenEmployeeForm(false)} sx={{ position: "absolute", right: 8, top: 8, color: (theme) => theme.palette.grey[500] }}><CloseIcon /></IconButton>
//           </DialogTitle>
//           <DialogContent>
//             <Grid container spacing={2} sx={{ mt: 1 }}>
//               {!isEditMode && (<Grid item xs={12}><Autocomplete options={talentPool} getOptionLabel={(option) => option.email || ""} onChange={handleTalentSelect} onInputChange={(event, newInputValue) => { if (!talentPool.find(p => p.email === newInputValue)) { setCurrentEmployee(prev => ({ ...prev, email: newInputValue })); }}} renderInput={(params) => (<TextField {...params} label="Search Email to Auto-fill" />)} /></Grid>)}
//               <Grid item xs={12} sm={4}><TextField fullWidth label="First Name" name="firstName" value={currentEmployee.firstName || ""} onChange={handleInputChange} onKeyPress={(e) => { if (!/^[A-Za-z]$/.test(e.key)) e.preventDefault(); }} InputProps={{ readOnly: isEditMode }} /></Grid>
//               <Grid item xs={12} sm={4}><TextField fullWidth label="Middle Name" name="middleName" value={currentEmployee.middleName || ""} onChange={handleInputChange} onKeyPress={(e) => { if (!/^[A-Za-z]$/.test(e.key)) e.preventDefault(); }} InputProps={{ readOnly: isEditMode }} /></Grid>
//               <Grid item xs={12} sm={4}><TextField fullWidth label="Last Name" name="lastName" value={currentEmployee.lastName || ""} onChange={handleInputChange} onKeyPress={(e) => { if (!/^[A-Za-z]$/.test(e.key)) e.preventDefault(); }} InputProps={{ readOnly: isEditMode }} /></Grid>
//               <Grid item xs={12} sm={6}><TextField fullWidth label="Email" name="email" value={currentEmployee.email || ''} onChange={handleInputChange} InputProps={{ readOnly: isEditMode || !!talentPool.find(p => p.email === currentEmployee.email) }} /></Grid>
//               <Grid item xs={12} sm={6}><TextField fullWidth label="Phone" name="phone" value={currentEmployee.phone || ''} onChange={(e) => { const value = e.target.value; if (/^\d{0,10}$/.test(value)) handleInputChange(e); }} inputProps={{ maxLength: 10, inputMode: 'numeric', pattern: '[0-9]*' }} InputProps={{ readOnly: isEditMode }} /></Grid>
//               <Grid item xs={12} sm={6}><Autocomplete options={countries} getOptionLabel={(option) => option.country_name || ''} value={countries.find(c => c.country_id == currentEmployee.country_id) || null} onChange={(e, nv) => handleCountryChange(nv)} isOptionEqualToValue={(option, value) => option.country_id == value.country_id} renderInput={(params) => (<TextField {...params} label="Country" />)} /></Grid>
//               <Grid item xs={12} sm={6}><Autocomplete options={states} getOptionLabel={(option) => option.state_name || ''} value={states.find(s => s.state_id == currentEmployee.state_id) || null} onChange={(e, nv) => handleStateChange(nv)} isOptionEqualToValue={(option, value) => option.state_id == value.state_id} disabled={!currentEmployee.country_id} renderInput={(params) => (<TextField {...params} label="State" />)} /></Grid>
//               <Grid item xs={12} sm={6}><Autocomplete options={employeeHubs} getOptionLabel={(option) => option.employee_hub_name || ''} value={employeeHubs.find(h => h.employee_hub_id == currentEmployee.employee_hub_id) || null} onChange={(e, nv) => setCurrentEmployee(prev => ({ ...prev, employee_hub_id: nv ? nv.employee_hub_id : "" }))} isOptionEqualToValue={(option, value) => option.employee_hub_id == value.employee_hub_id} disabled={!currentEmployee.state_id} renderInput={(params) => (<TextField {...params} label="Employee Hub" />)} /></Grid>
//               <Grid item xs={12} sm={6}><Autocomplete options={headquarters} getOptionLabel={(option) => option.headquarter_name || ''} value={headquarters.find(h => h.headquarter_id == currentEmployee.headquarter_id) || null} onChange={(e, nv) => setCurrentEmployee(prev => ({ ...prev, headquarter_id: nv ? nv.headquarter_id : "" }))} isOptionEqualToValue={(option, value) => option.headquarter_id == value.headquarter_id} renderInput={(params) => (<TextField {...params} label="Headquarter" />)} /></Grid>
//               <Grid item xs={12} sm={6}><Autocomplete options={divisions} getOptionLabel={(option) => option.division_name || ''} value={divisions.find(d => d.division_id == currentEmployee.division_id) || null} onChange={(e, nv) => handleDivisionChange(nv)} isOptionEqualToValue={(option, value) => option.division_id == value.division_id} renderInput={(params) => (<TextField {...params} label="Division" />)} /></Grid>
//               <Grid item xs={12} sm={6}><Autocomplete options={subDivisionOptions} getOptionLabel={(option) => option.label || ''} value={subDivisionOptions.find(sd => sd.value === currentEmployee.subDivision) || null} onChange={(e, nv) => setCurrentEmployee(prev => ({ ...prev, subDivision: nv ? nv.value : "" }))} isOptionEqualToValue={(option, value) => option.value === value.value} disabled={isSubDivisionDisabled} renderInput={(params) => (<TextField {...params} label="Sub Division" />)} /></Grid>
//              <Grid item xs={12} sm={6}><Autocomplete options={allEmployeesForDropdown} getOptionLabel={(option) => option.label || ''} value={allEmployeesForDropdown.find(e => e.value == currentEmployee.manager_id) || null} onChange={(e, nv) => setCurrentEmployee(prev => ({ ...prev, manager_id: nv ? nv.value : "" }))} isOptionEqualToValue={(option, value) => option.value == value.value} renderInput={(params) => (<TextField {...params} label="Manager" />)} /></Grid>
//               <Grid item xs={12} sm={6}><Autocomplete options={departments} getOptionLabel={(option) => option.dept_name || ''} value={departments.find(d => d.dept_id == currentEmployee.department_id) || null} onChange={(e, nv) => handleDeptChange(nv)} isOptionEqualToValue={(option, value) => option.dept_id == value.dept_id} renderInput={(params) => (<TextField {...params} label="Department" />)} /></Grid>
//               <Grid item xs={12} sm={6}><Autocomplete options={designations} getOptionLabel={(option) => option.desig_name || ''} value={designations.find(d => d.desig_id == currentEmployee.designation_id) || null} onChange={(e, nv) => setCurrentEmployee(prev => ({ ...prev, designation_id: nv ? nv.desig_id : "" }))} isOptionEqualToValue={(option, value) => option.desig_id == value.desig_id} disabled={!currentEmployee.department_id} renderInput={(params) => (<TextField {...params} label="Designation" />)} /></Grid>
//               <Grid item xs={12} sm={6}><Autocomplete options={officeShifts} getOptionLabel={(option) => option.office_shift_name || ''} value={officeShifts.find(s => s.office_shift_id == currentEmployee.officeShift) || null} onChange={(e, nv) => setCurrentEmployee(prev => ({ ...prev, officeShift: nv ? nv.office_shift_id : "" }))} isOptionEqualToValue={(option, value) => option.office_shift_id == value.office_shift_id} renderInput={(params) => (<TextField {...params} label="Office Shift" />)} /></Grid>
//               <Grid item xs={12} sm={6}><Autocomplete options={statusOptions} getOptionLabel={(option) => option.label} value={statusOptions.find(s => s.value === currentEmployee.status) || null} onChange={(e, nv) => setCurrentEmployee(prev => ({ ...prev, status: nv ? nv.value : 1 }))} isOptionEqualToValue={(option, value) => option.value === value.value} renderInput={(params) => (<TextField {...params} label="Status" />)} /></Grid>
//               <Grid item xs={12} sm={6}><Autocomplete options={probationOptions} getOptionLabel={(option) => option.label} value={probationOptions.find(p => p.value === currentEmployee.is_probation) || null} onChange={(e, nv) => setCurrentEmployee(prev => ({ ...prev, is_probation: nv ? nv.value : "n" }))} isOptionEqualToValue={(option, value) => option.value === value.value} renderInput={(params) => (<TextField {...params} label="On Probation" />)} /></Grid>
//               <Grid item xs={12} sm={6}><TextField fullWidth label="Join Date" name="join_date" type="date" value={currentEmployee.join_date || ""} onChange={handleInputChange} InputLabelProps={{ shrink: true }} /></Grid>
//               <Grid item xs={12} sm={6}><Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}><Button variant="contained" component="label" disabled={isEditMode} sx={purpleButtonSx}>Upload Photo<input type="file" hidden accept="image/*" onChange={handleFileUpload} /></Button>{currentEmployee.avatar && <Avatar src={typeof currentEmployee.avatar === 'string' ? currentEmployee.avatar : URL.createObjectURL(currentEmployee.avatar)} sx={{ width: 56, height: 56 }} />}</Box></Grid>
//               <Grid item xs={12}>{isFetchingDocs && <CircularProgress />}{employeeDocuments && !isFetchingDocs && (<Box><Typography variant="subtitle1" gutterBottom>Fetched Documents</Typography><Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>{Object.entries(employeeDocuments).map(([name, url]) => (url ? (<Chip key={name} label={name.replace(/_/g, ' ')} component="a" href={url} target="_blank" clickable icon={<LinkIcon />} variant="outlined" color="secondary" size="small" />) : null))}</Box></Box>)}</Grid>
//               {!isEditMode && (<>
//                 <Grid item xs={12} sm={6}><Autocomplete options={genderOptions} getOptionLabel={(option) => option.label} value={genderOptions.find(g => g.value === currentEmployee.gender) || null} onChange={(e, nv) => setCurrentEmployee(prev => ({ ...prev, gender: nv ? nv.value : "" }))} isOptionEqualToValue={(option, value) => option.value === value.value} renderInput={(params) => (<TextField {...params} label="Gender" />)} /></Grid>
//                 <Grid item xs={12} sm={6}><TextField fullWidth label="Username" name="username" value={currentEmployee.username || ""} onChange={handleInputChange} InputProps={{ readOnly: true }} /></Grid>
//                 <Grid item xs={12} sm={6}><TextField fullWidth label="Password" name="password" value={currentEmployee.password || ""} onChange={handleInputChange} type={showPassword ? 'text' : 'password'} InputProps={{ endAdornment: (<InputAdornment position="end"> <IconButton aria-label="toggle password visibility" onClick={() => setShowPassword((prev) => !prev)} onMouseDown={(e) => e.preventDefault()} edge="end"> {showPassword ? <VisibilityOff /> : <Visibility />} </IconButton> </InputAdornment>) }} /></Grid>
//                 <Grid item xs={12} sm={6}><Autocomplete options={roles} getOptionLabel={(option) => option.role_name || ''} value={roles.find(r => r.index == currentEmployee.role) || null} onChange={(e, nv) => setCurrentEmployee(prev => ({ ...prev, role: nv ? nv.index : "" }))} isOptionEqualToValue={(option, value) => option.index == value.index} renderInput={(params) => (<TextField {...params} label="Role" />)} /></Grid>
//                 <Grid item xs={12} sm={6}><TextField fullWidth label="Gross Salary" name="grossSalary" type="number" value={currentEmployee.grossSalary || ""} onChange={(e) => { const value = e.target.value; if (/^\d*\.?\d*$/.test(value)) handleInputChange(e); }} /></Grid>
//               </>)}
//             </Grid>
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={() => setOpenEmployeeForm(false)} disabled={isSaving} sx={cancelButtonSx}>Cancel</Button>
//             <Button onClick={handleSaveEmployee} variant="contained" disabled={isSaving} sx={purpleButtonSx}>{isSaving ? <CircularProgress size={24} color="inherit" /> : "Save"}</Button>
//           </DialogActions>
//         </Dialog>
        
//         <TableContainer>
//             <Table sx={{ minWidth: "100%", whiteSpace: "nowrap" }}>
//               <TableHead>
//                 <TableRow sx={{ bgcolor: themePurple }}>
//                   <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>SR. NO.</TableCell>
//                   <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>EMPLOYEE</TableCell>
//                   <TableCell sx={{ color: 'white' }}></TableCell>
//                   <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>DEPARTMENT</TableCell>
//                   <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>DESIGNATION</TableCell>
//                   <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>JOIN DATE</TableCell>
//                   <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>STATUS</TableCell>
//                   <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>MANAGER</TableCell>
//                   <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', color: 'white' }}>ACTIONS</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {loading ? (
//                     Array.from(new Array(rowsPerPage)).map((_, index) => (
//                         <TableRow key={index}>
//                             <TableCell><Skeleton variant="text" /></TableCell>
//                             <TableCell><Skeleton variant="text" /></TableCell>
//                             <TableCell><Skeleton variant="text" /></TableCell>
//                             <TableCell><Skeleton variant="text" /></TableCell>
//                             <TableCell><Skeleton variant="text" /></TableCell>
//                             <TableCell><Skeleton variant="text" /></TableCell>
//                             <TableCell><Skeleton variant="text" /></TableCell>
//                             <TableCell><Skeleton variant="text" /></TableCell>
//                             <TableCell align="center"><Skeleton variant="rectangular" width={80} height={30} /></TableCell>
//                         </TableRow>
//                     ))
//                 ) : (
//                     (rowsPerPage > 0
//                         ? filteredEmployees.slice(currentPage * rowsPerPage, currentPage * rowsPerPage + rowsPerPage)
//                         : filteredEmployees
//                     ).map((employee, index) => (
//                         <TableRow key={employee.user_id} sx={{ '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' } }} onMouseEnter={() => setHoveredRowId(employee.user_id)} onMouseLeave={() => setHoveredRowId(null)}>
//                             <TableCell sx={{ fontSize: '0.95rem' }}>{currentPage * rowsPerPage + index + 1}</TableCell>
//                             <TableCell sx={{ fontSize: '0.95rem' }}>{employee.employee_name}</TableCell>
//                             <TableCell sx={{ padding: '0 8px', textAlign: 'center' }}>
//                                {hoveredRowId === employee.user_id && <IconButton onClick={() => handleArrowClick(employee.user_id)} size="small" sx={{ color: themeOrange }}><ArrowForwardIcon fontSize="small" /></IconButton>}
//                             </TableCell>
//                             <TableCell sx={{ fontSize: '0.95rem' }}>{employee.department_name || 'N/A'}</TableCell>
//                             <TableCell sx={{ fontSize: '0.95rem' }}>{employee.designation_name || 'N/A'}</TableCell>
//                             <TableCell sx={{ fontSize: '0.95rem' }}>{formatDate(employee.join_date)}</TableCell>
//                             <TableCell sx={{ fontSize: '0.95rem' }}>
//                                 <Chip label={employee.status === 1 ? "Active" : "Inactive"} size="small" sx={{ bgcolor: employee.status === 1 ? themePurple : themeOrange, color: 'white' }} />
//                             </TableCell>
//                             <TableCell sx={{ fontSize: '0.95rem' }}>{employee.manager}</TableCell>
//                             <TableCell>
//                                 <Box display="flex" justifyContent="center" gap={0.5}>
//                                     <Tooltip title="Edit"><IconButton onClick={() => handleEditEmployee(employee)} sx={{ color: themePurple }}><EditIcon /></IconButton></Tooltip>
//                                     <Tooltip title="Delete"><IconButton onClick={() => handleDeleteEmployee(employee.user_id)} sx={{ color: themeOrange }}><DeleteIcon /></IconButton></Tooltip>
//                                 </Box>
//                             </TableCell>
//                         </TableRow>
//                     ))
//                 )}
//               </TableBody>
//             </Table>
//         </TableContainer>

//         <Box sx={{ 
//             display: 'flex', 
//             justifyContent: 'space-between', 
//             alignItems: 'center', 
//             flexDirection: isMobile ? 'column' : 'row', 
//             p: 2,
//             borderTop: '1px solid rgba(224, 224, 224, 1)'
//         }}>
//             <Typography variant="body2" color="text.secondary">
//                 Showing {filteredEmployees.length > 0 ? currentPage * rowsPerPage + 1 : 0} to {Math.min((currentPage + 1) * rowsPerPage, filteredEmployees.length)} of {filteredEmployees.length} results
//             </Typography>
//             <TablePagination
//                 rowsPerPageOptions={[5, 10, 15, 25]}
//                 component="div"
//                 count={filteredEmployees.length}
//                 rowsPerPage={rowsPerPage}
//                 page={currentPage}
//                 onPageChange={handleChangePage}
//                 onRowsPerPageChange={handleRowsPerPageChange}
//                 labelDisplayedRows={() => ''} // Hide the default "1-5 of 10"
//                 sx={{
//                     '& .MuiToolbar-root': {
//                         p: 0 // Remove padding from the toolbar to make it more compact
//                     },
//                     '& .MuiSvgIcon-root': {
//                         color: themePurple,
//                     },
//                 }}
//             />
//         </Box>
//     </Box>
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

// const statusOptions = [{ value: 1, label: 'Active' }, { value: 0, label: 'Inactive' }];
// const probationOptions = [{ value: 'y', label: 'Yes' }, { value: 'n', label: 'No' }];
// const genderOptions = [{ value: 'Male', label: 'Male' }, { value: 'Female', label: 'Female' }, { value: 'Other', label: 'Other' }];
// const subDivisionOptions = [{ value: 'VetBiz', label: 'VetBiz' }, { value: 'TredBiz', label: 'TredBiz' }, { value: ' ', label: 'TredBiz Mix' }];

// export default function EmployeesView() {
//   const employeeDialogRef = useRef(null);
//   const changeManagerDialogRef = useRef(null);

//   const muiTheme = useTheme();
//   const isMobile = useMediaQuery(muiTheme.breakpoints.down("sm"));

//   const themePurple = '#8C257C';
//   const themePurpleHover = '#6d1d60';
//   const themeOrange = '#F58E35';

//   const purpleButtonSx = {
//     backgroundColor: themePurple,
//     color: 'white',
//     '&:hover': {
//       backgroundColor: themePurpleHover,
//     },
//   };

//   const cancelButtonSx = {
//     color: '#757575',
//     '&:hover': {
//         backgroundColor: 'rgba(0, 0, 0, 0.04)'
//     }
//   };

//   const [loading, setLoading] = useState(true);
//   const [departments, setDepartments] = useState([]);
//   const [designations, setDesignations] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [openChangeManagerForm, setOpenChangeManagerForm] = useState(false);
//   const [currentPage, setCurrentPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
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

//   const [currentEmployee, setCurrentEmployee] = useState({
//     id: null, firstName: "", middleName: "", lastName: "", email: "", join_date: "",
//     status: 1, phone: "", avatar: null, country_id: "", state_id: "", employee_hub_id: "",
//     headquarter_id: "", division_id: "", subDivision: "", role: "", is_probation: "n",
//     resumeUrl: "", password: "", gender: "", username: "", grossSalary: "", department_id: "",
//     designation_id: "", manager_id: "", officeShift: "",
//   });

//   const [openEmployeeForm, setOpenEmployeeForm] = useState(false);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [ depts, empDropdown, shifts, countriesRes, hubs, divs, rolesRes, talent,headquartersRes ] = await Promise.all([
//           axiosInstance.get('api/desig_dept_dropdown/'),
//           axiosInstance.get('employee-dropdown/'),
//           axiosInstance.get('api/office_shift_dropdown/'),
//           axiosInstance.get('api/countries/'),
//           axiosInstance.get('api/employee_hub/'),
//           axiosInstance.get('api/division/'),
//           axiosInstance.get('api/role_list/'),
//           axiosInstance.get('api/search_by_email_vet_talent/'),
//           axios.get("https://tdtlworld.com/hrms-backend/api/headquarters/")
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
//           Swal.fire({ icon: 'error', title: 'Error', text: 'Failed to fetch states.', target: employeeDialogRef.current, timer: 3000, showConfirmButton: false });
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
//           console.error("Error fetching employee hubs:", err);
//           Swal.fire({ icon: 'error', title: 'Error', text: 'Failed to fetch employee hubs.', target: employeeDialogRef.current, timer: 3000, showConfirmButton: false });
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
//           Swal.fire({ icon: 'error', title: 'Error', text: 'Failed to load designations.', target: employeeDialogRef.current, timer: 3000, showConfirmButton: false });
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
//   const handleArrowClick = (id) => navigate(`/hrms/admindashboard/employeedetail/${id}`);

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setCurrentEmployee((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleAddEmployee = async () => {
//     try {
//       const maxIdResponse = await axios.get("https://tdtlworld.com/hrms-backend/api/get_max_employee_id/");
//       const newEmpId = maxIdResponse.data.employee_id;
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
//       console.error("Error fetching max employee ID:", error);
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
//       setEmployeeDocuments(null);
//     } finally {
//       setIsFetchingDocs(false);
//     }
//   };

//   const handleEditEmployee = async (employee) => {
//     if (!employee || !employee.user_id) return;
//     try {
//         const response = await axiosInstance.get(`api/edit_employee/${employee.user_id}/`);
//         if (response.data.status !== "success" || response.data.data.length === 0) {
//             Swal.fire({ icon: 'error', title: 'Error', text: 'Failed to load employee details.', timer: 3000, showConfirmButton: false });
//             return;
//         }
//         const empData = response.data.data[0];

//         const [desigRes, statesRes, hubsRes] = await Promise.all([
//             axiosInstance.get(`api/desig_dept_dropdown/?dept_id=${empData.department_id}/`),
//             empData.country_name ? axiosInstance.get(`api/states/?country_name=${empData.country_name}`) : Promise.resolve({ data: { data: [] } }),
//             empData.state ? axiosInstance.get(`api/employee_hub_dropdown/${empData.state}/`) : Promise.resolve({ data: { data: [] } })
//         ]);

//         setDesignations(desigRes.data.desig_data || []);
//         setStates(statesRes.data.data || []);
//         setEmployeeHubs(hubsRes.data.data || []);
        
//         const officeShiftObj = officeShifts.find(s => s.office_shift_name === empData.office_shift);
//         const nameParts = (empData.emp_name || "").split(" ");
//         const selectedCountry = countries.find(c => c.country_name === empData.country_name);
//         const selectedHeadquarter = headquarters.find(hq => hq.headquarter_name === empData.headquarter);

//         let finalSubDivisionValue = empData.sub_division || "";
//         if (finalSubDivisionValue === "Tred") {
//             finalSubDivisionValue = "TredBiz";
//         }

//         setCurrentEmployee({
//             id: employee.user_id,
//             firstName: nameParts[0] || "",
//             middleName: nameParts.length > 2 ? nameParts.slice(1, -1).join(" ") : "",
//             lastName: nameParts.length > 1 ? nameParts[nameParts.length - 1] : "",
//             email: empData.email || "", phone: empData.phone || "",
//             manager_id: empData.manager_id ? Number(empData.manager_id) : "",
//             designation_id: empData.designation_id ? Number(empData.designation_id) : "",
//             department_id: empData.department_id ? Number(empData.department_id) : "",
//             headquarter_id: selectedHeadquarter ? selectedHeadquarter.headquarter_id : "",
//             subDivision: finalSubDivisionValue,
//             division_id: empData.division_id ? Number(empData.division_id) : "",
//             state_id: empData.state ? Number(empData.state) : "",
//             employee_hub_id: empData.employee_hub_id ? Number(empData.employee_hub_id) : "",
//             role: empData.role_id ? Number(empData.role_id) : "",
//             officeShift: officeShiftObj ? Number(officeShiftObj.office_shift_id) : "",
//             status: Number(empData.status),
//             join_date: empData.join_date ? empData.join_date.split(" ")[0] : "",
//             country_id: selectedCountry ? Number(selectedCountry.country_id) : "",
//             avatar: empData.profile_photo || "",
//             is_probation: empData.probation?.toLowerCase() === 'y' ? 'y' : 'n',
//             resumeUrl: "",
//         });

//         setIsEditMode(true);
//         setOpenEmployeeForm(true);
//         setShowPassword(false);
//     } catch (error) {
//         console.error("Error fetching employee details for edit:", error);
//         Swal.fire({ icon: 'error', title: 'Error', text: 'Failed to fetch complete employee details.', timer: 3000, showConfirmButton: false });
//     }
//   };


//   const handleSaveEmployee = async () => {
//     if (!isEditMode) {
//       const requiredFields = {
//         firstName: 'First Name', lastName: 'Last Name', email: 'Email', phone: 'Phone', country_id: 'Country',
//         state_id: 'State', employee_hub_id: 'Employee Hub', headquarter_id: 'Headquarter', division_id: 'Division',
//         manager_id: 'Manager', department_id: 'Department', designation_id: 'Designation', officeShift: 'Office Shift',
//         join_date: 'Join Date', avatar: 'Photo', gender: 'Gender', username: 'Username', password: 'Password',
//         role: 'Role', grossSalary: 'Gross Salary'
//       };
//       const selectedDivision = divisions.find(d => d.division_id == currentEmployee.division_id);
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
//       showCancelButton: true, confirmButtonColor: themePurple, cancelButtonColor: themeOrange,
//       confirmButtonText: 'Yes, delete it!'
//     }).then((result) => {
//       if (result.isConfirmed) {
//         axiosInstance.delete("api/edit_employee/", { data: { user_id: employeeId } })
//           .then(() => {
//             fetchEmployees();
//             Swal.fire({ icon: 'success', title: 'Deleted!', text: 'The employee has been deleted.', timer: 3000, showConfirmButton: false });
//           })
//           .catch((error) => {
//             console.error("Error deleting employee: ", error);
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
//   };

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

//   const handleChangePage = (event, newPage) => {
//     setCurrentPage(newPage);
//   };

//   const handleRowsPerPageChange = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setCurrentPage(0);
//   };

//   const handleFileUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) setCurrentEmployee((prev) => ({ ...prev, avatar: file }));
//   };

//   const isSubDivisionDisabled = useMemo(() => {
//     if (!currentEmployee.division_id) return true;
//     const selectedDivision = divisions.find(d => d.division_id == currentEmployee.division_id);
//     return !selectedDivision || selectedDivision.division_name !== 'Livestock';
//   }, [currentEmployee.division_id, divisions]);


//   const formatDate = (dateString) => {
//     if (!dateString) return '';
//     try {
//       const date = new Date(dateString);
//       const day = String(date.getDate()).padStart(2, '0');
//       const month = String(date.getMonth() + 1).padStart(2, '0');
//       const year = date.getFullYear();
//       return `${day}/${month}/${year}`;
//     } catch (error) {
//       console.error("Could not format date:", dateString);
//       return dateString.split(" ")[0];
//     }
//   };

//   return (
//     <Box component={Paper} p={3}>
//       <Typography variant="h4" sx={{ color: themePurple, fontWeight: "bold", mb: 5 }}>
//         Employees List
//       </Typography>

//       <Box sx={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           flexDirection: isMobile ? "column" : "row",
//           gap: 2,
//           mb: 2
//       }}>
//           <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
//               <Button variant="contained" startIcon={<AddIcon />} onClick={handleAddEmployee} sx={purpleButtonSx}>Add Employee</Button>
//               <Button variant="contained" startIcon={<DownloadIcon />} onClick={handleExportEmployees} sx={purpleButtonSx}>Export</Button>
//               <Button variant="contained" startIcon={<ChangeManagerIcon />} onClick={() => setOpenChangeManagerForm(true)} sx={purpleButtonSx}>Change Manager</Button>
//           </Box>
//           <TextField
//               size="small"
//               placeholder="Search..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               sx={{ width: isMobile ? "100%" : "auto" }}
//               InputProps={{
//                   startAdornment: (
//                       <InputAdornment position="start">
//                           <SearchIcon />
//                       </InputAdornment>
//                   ),
//               }}
//           />
//       </Box>

//         <Dialog open={openChangeManagerForm} onClose={() => setOpenChangeManagerForm(false)} maxWidth="sm" fullWidth ref={changeManagerDialogRef}>
//           <DialogTitle sx={{ color: themePurple, fontWeight: 'bold' }}>
//             Change Manager
//             <IconButton onClick={() => setOpenChangeManagerForm(false)} sx={{ position: "absolute", right: 8, top: 8, color: (theme) => theme.palette.grey[500] }}><CloseIcon /></IconButton>
//           </DialogTitle>
//           <DialogContent><Grid container spacing={2} sx={{ mt: 1 }}><Grid item xs={12}><FormControl fullWidth><InputLabel>Select Employee</InputLabel><Select value={selectedEmployeeForManagerChange} onChange={(e) => setSelectedEmployeeForManagerChange(e.target.value)} label="Select Employee">{allEmployeesForDropdown.map((emp) => (<MenuItem key={emp.value} value={emp.value}>{emp.label}</MenuItem>))}</Select></FormControl></Grid><Grid item xs={12}><FormControl fullWidth><InputLabel>Select New Manager</InputLabel><Select value={newManager} onChange={(e) => setNewManager(e.target.value)} label="Select New Manager">{allEmployeesForDropdown.map((emp) => (<MenuItem key={emp.value} value={emp.value}>{emp.label}</MenuItem>))}</Select></FormControl></Grid></Grid></DialogContent>
//           <DialogActions>
//             <Button onClick={() => setOpenChangeManagerForm(false)} sx={cancelButtonSx}>Cancel</Button>
//             <Button onClick={handleChangeManager} variant="contained" sx={purpleButtonSx}>Save</Button>
//           </DialogActions>
//         </Dialog>

//         <Dialog open={openEmployeeForm} onClose={() => setOpenEmployeeForm(false)} maxWidth="md" fullWidth ref={employeeDialogRef}>
//             <DialogTitle sx={{ color: themePurple, fontWeight: 'bold' }}>
//             {isEditMode ? "Edit Employee" : "Add Employee"}
//             <IconButton onClick={() => setOpenEmployeeForm(false)} sx={{ position: "absolute", right: 8, top: 8, color: (theme) => theme.palette.grey[500] }}><CloseIcon /></IconButton>
//           </DialogTitle>
//           <DialogContent>
//             <Grid container spacing={2} sx={{ mt: 1 }}>
//               {!isEditMode && (<Grid item xs={12}><Autocomplete options={talentPool} getOptionLabel={(option) => option.email || ""} onChange={handleTalentSelect} onInputChange={(event, newInputValue) => { if (!talentPool.find(p => p.email === newInputValue)) { setCurrentEmployee(prev => ({ ...prev, email: newInputValue })); }}} renderInput={(params) => (<TextField {...params} label="Search Email to Auto-fill" />)} /></Grid>)}
//               <Grid item xs={12} sm={4}><TextField fullWidth label="First Name" name="firstName" value={currentEmployee.firstName || ""} onChange={handleInputChange} onKeyPress={(e) => { if (!/^[A-Za-z]$/.test(e.key)) e.preventDefault(); }} InputProps={{ readOnly: isEditMode }} /></Grid>
//               <Grid item xs={12} sm={4}><TextField fullWidth label="Middle Name" name="middleName" value={currentEmployee.middleName || ""} onChange={handleInputChange} onKeyPress={(e) => { if (!/^[A-Za-z]$/.test(e.key)) e.preventDefault(); }} InputProps={{ readOnly: isEditMode }} /></Grid>
//               <Grid item xs={12} sm={4}><TextField fullWidth label="Last Name" name="lastName" value={currentEmployee.lastName || ""} onChange={handleInputChange} onKeyPress={(e) => { if (!/^[A-Za-z]$/.test(e.key)) e.preventDefault(); }} InputProps={{ readOnly: isEditMode }} /></Grid>
//               <Grid item xs={12} sm={6}><TextField fullWidth label="Email" name="email" value={currentEmployee.email || ''} onChange={handleInputChange} InputProps={{ readOnly: isEditMode || !!talentPool.find(p => p.email === currentEmployee.email) }} /></Grid>
//               <Grid item xs={12} sm={6}><TextField fullWidth label="Phone" name="phone" value={currentEmployee.phone || ''} onChange={(e) => { const value = e.target.value; if (/^\d{0,10}$/.test(value)) handleInputChange(e); }} inputProps={{ maxLength: 10, inputMode: 'numeric', pattern: '[0-9]*' }} InputProps={{ readOnly: isEditMode }} /></Grid>
//               <Grid item xs={12} sm={6}><Autocomplete options={countries} getOptionLabel={(option) => option.country_name || ''} value={countries.find(c => c.country_id == currentEmployee.country_id) || null} onChange={(e, nv) => handleCountryChange(nv)} isOptionEqualToValue={(option, value) => option.country_id == value.country_id} renderInput={(params) => (<TextField {...params} label="Country" />)} /></Grid>
//               <Grid item xs={12} sm={6}><Autocomplete options={states} getOptionLabel={(option) => option.state_name || ''} value={states.find(s => s.state_id == currentEmployee.state_id) || null} onChange={(e, nv) => handleStateChange(nv)} isOptionEqualToValue={(option, value) => option.state_id == value.state_id} disabled={!currentEmployee.country_id} renderInput={(params) => (<TextField {...params} label="State" />)} /></Grid>
//               <Grid item xs={12} sm={6}><Autocomplete options={employeeHubs} getOptionLabel={(option) => option.employee_hub_name || ''} value={employeeHubs.find(h => h.employee_hub_id == currentEmployee.employee_hub_id) || null} onChange={(e, nv) => setCurrentEmployee(prev => ({ ...prev, employee_hub_id: nv ? nv.employee_hub_id : "" }))} isOptionEqualToValue={(option, value) => option.employee_hub_id == value.employee_hub_id} disabled={!currentEmployee.state_id} renderInput={(params) => (<TextField {...params} label="Employee Hub" />)} /></Grid>
//               <Grid item xs={12} sm={6}><Autocomplete options={headquarters} getOptionLabel={(option) => option.headquarter_name || ''} value={headquarters.find(h => h.headquarter_id == currentEmployee.headquarter_id) || null} onChange={(e, nv) => setCurrentEmployee(prev => ({ ...prev, headquarter_id: nv ? nv.headquarter_id : "" }))} isOptionEqualToValue={(option, value) => option.headquarter_id == value.headquarter_id} renderInput={(params) => (<TextField {...params} label="Headquarter" />)} /></Grid>
//               <Grid item xs={12} sm={6}><Autocomplete options={divisions} getOptionLabel={(option) => option.division_name || ''} value={divisions.find(d => d.division_id == currentEmployee.division_id) || null} onChange={(e, nv) => handleDivisionChange(nv)} isOptionEqualToValue={(option, value) => option.division_id == value.division_id} renderInput={(params) => (<TextField {...params} label="Division" />)} /></Grid>
//               <Grid item xs={12} sm={6}><Autocomplete options={subDivisionOptions} getOptionLabel={(option) => option.label || ''} value={subDivisionOptions.find(sd => sd.value === currentEmployee.subDivision) || null} onChange={(e, nv) => setCurrentEmployee(prev => ({ ...prev, subDivision: nv ? nv.value : "" }))} isOptionEqualToValue={(option, value) => option.value === value.value} disabled={isSubDivisionDisabled} renderInput={(params) => (<TextField {...params} label="Sub Division" />)} /></Grid>
//              <Grid item xs={12} sm={6}><Autocomplete options={allEmployeesForDropdown} getOptionLabel={(option) => option.label || ''} value={allEmployeesForDropdown.find(e => e.value == currentEmployee.manager_id) || null} onChange={(e, nv) => setCurrentEmployee(prev => ({ ...prev, manager_id: nv ? nv.value : "" }))} isOptionEqualToValue={(option, value) => option.value == value.value} renderInput={(params) => (<TextField {...params} label="Manager" />)} /></Grid>
//               <Grid item xs={12} sm={6}><Autocomplete options={departments} getOptionLabel={(option) => option.dept_name || ''} value={departments.find(d => d.dept_id == currentEmployee.department_id) || null} onChange={(e, nv) => handleDeptChange(nv)} isOptionEqualToValue={(option, value) => option.dept_id == value.dept_id} renderInput={(params) => (<TextField {...params} label="Department" />)} /></Grid>
//               <Grid item xs={12} sm={6}><Autocomplete options={designations} getOptionLabel={(option) => option.desig_name || ''} value={designations.find(d => d.desig_id == currentEmployee.designation_id) || null} onChange={(e, nv) => setCurrentEmployee(prev => ({ ...prev, designation_id: nv ? nv.desig_id : "" }))} isOptionEqualToValue={(option, value) => option.desig_id == value.desig_id} disabled={!currentEmployee.department_id} renderInput={(params) => (<TextField {...params} label="Designation" />)} /></Grid>
//               <Grid item xs={12} sm={6}><Autocomplete options={officeShifts} getOptionLabel={(option) => option.office_shift_name || ''} value={officeShifts.find(s => s.office_shift_id == currentEmployee.officeShift) || null} onChange={(e, nv) => setCurrentEmployee(prev => ({ ...prev, officeShift: nv ? nv.office_shift_id : "" }))} isOptionEqualToValue={(option, value) => option.office_shift_id == value.office_shift_id} renderInput={(params) => (<TextField {...params} label="Office Shift" />)} /></Grid>
//               <Grid item xs={12} sm={6}><Autocomplete options={statusOptions} getOptionLabel={(option) => option.label} value={statusOptions.find(s => s.value === currentEmployee.status) || null} onChange={(e, nv) => setCurrentEmployee(prev => ({ ...prev, status: nv ? nv.value : 1 }))} isOptionEqualToValue={(option, value) => option.value === value.value} renderInput={(params) => (<TextField {...params} label="Status" />)} /></Grid>
//               <Grid item xs={12} sm={6}><Autocomplete options={probationOptions} getOptionLabel={(option) => option.label} value={probationOptions.find(p => p.value === currentEmployee.is_probation) || null} onChange={(e, nv) => setCurrentEmployee(prev => ({ ...prev, is_probation: nv ? nv.value : "n" }))} isOptionEqualToValue={(option, value) => option.value === value.value} renderInput={(params) => (<TextField {...params} label="On Probation" />)} /></Grid>
//               <Grid item xs={12} sm={6}><TextField fullWidth label="Join Date" name="join_date" type="date" value={currentEmployee.join_date || ""} onChange={handleInputChange} InputLabelProps={{ shrink: true }} /></Grid>
//               <Grid item xs={12} sm={6}><Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}><Button variant="contained" component="label" disabled={isEditMode} sx={purpleButtonSx}>Upload Photo<input type="file" hidden accept="image/*" onChange={handleFileUpload} /></Button>{currentEmployee.avatar && <Avatar src={typeof currentEmployee.avatar === 'string' ? currentEmployee.avatar : URL.createObjectURL(currentEmployee.avatar)} sx={{ width: 56, height: 56 }} />}</Box></Grid>
//               <Grid item xs={12}>{isFetchingDocs && <CircularProgress />}{employeeDocuments && !isFetchingDocs && (<Box><Typography variant="subtitle1" gutterBottom>Fetched Documents</Typography><Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>{Object.entries(employeeDocuments).map(([name, url]) => (url ? (<Chip key={name} label={name.replace(/_/g, ' ')} component="a" href={url} target="_blank" clickable icon={<LinkIcon />} variant="outlined" color="secondary" size="small" />) : null))}</Box></Box>)}</Grid>
//               {!isEditMode && (<>
//                 <Grid item xs={12} sm={6}><Autocomplete options={genderOptions} getOptionLabel={(option) => option.label} value={genderOptions.find(g => g.value === currentEmployee.gender) || null} onChange={(e, nv) => setCurrentEmployee(prev => ({ ...prev, gender: nv ? nv.value : "" }))} isOptionEqualToValue={(option, value) => option.value === value.value} renderInput={(params) => (<TextField {...params} label="Gender" />)} /></Grid>
//                 <Grid item xs={12} sm={6}><TextField fullWidth label="Username" name="username" value={currentEmployee.username || ""} onChange={handleInputChange} InputProps={{ readOnly: true }} /></Grid>
//                 <Grid item xs={12} sm={6}><TextField fullWidth label="Password" name="password" value={currentEmployee.password || ""} onChange={handleInputChange} type={showPassword ? 'text' : 'password'} InputProps={{ endAdornment: (<InputAdornment position="end"> <IconButton aria-label="toggle password visibility" onClick={() => setShowPassword((prev) => !prev)} onMouseDown={(e) => e.preventDefault()} edge="end"> {showPassword ? <VisibilityOff /> : <Visibility />} </IconButton> </InputAdornment>) }} /></Grid>
//                 <Grid item xs={12} sm={6}><Autocomplete options={roles} getOptionLabel={(option) => option.role_name || ''} value={roles.find(r => r.index == currentEmployee.role) || null} onChange={(e, nv) => setCurrentEmployee(prev => ({ ...prev, role: nv ? nv.index : "" }))} isOptionEqualToValue={(option, value) => option.index == value.index} renderInput={(params) => (<TextField {...params} label="Role" />)} /></Grid>
//                 <Grid item xs={12} sm={6}><TextField fullWidth label="Gross Salary" name="grossSalary" type="number" value={currentEmployee.grossSalary || ""} onChange={(e) => { const value = e.target.value; if (/^\d*\.?\d*$/.test(value)) handleInputChange(e); }} /></Grid>
//               </>)}
//             </Grid>
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={() => setOpenEmployeeForm(false)} disabled={isSaving} sx={cancelButtonSx}>Cancel</Button>
//             <Button onClick={handleSaveEmployee} variant="contained" disabled={isSaving} sx={purpleButtonSx}>{isSaving ? <CircularProgress size={24} color="inherit" /> : "Save"}</Button>
//           </DialogActions>
//         </Dialog>
        
//         <TableContainer>
//             <Table sx={{ minWidth: "100%", whiteSpace: "nowrap" }}>
//               <TableHead>
//                 <TableRow sx={{ bgcolor: themePurple }}>
//                   <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>SR. NO.</TableCell>
//                   <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>EMPLOYEE</TableCell>
//                   <TableCell sx={{ color: 'white' }}></TableCell>
//                   <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>DEPARTMENT</TableCell>
//                   <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>DESIGNATION</TableCell>
//                   <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>JOIN DATE</TableCell>
//                   <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>STATUS</TableCell>
//                   <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>MANAGER</TableCell>
//                   <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', color: 'white' }}>ACTIONS</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {loading ? (
//                     Array.from(new Array(rowsPerPage)).map((_, index) => (
//                         <TableRow key={index}>
//                             <TableCell><Skeleton variant="text" /></TableCell>
//                             <TableCell><Skeleton variant="text" /></TableCell>
//                             <TableCell><Skeleton variant="text" /></TableCell>
//                             <TableCell><Skeleton variant="text" /></TableCell>
//                             <TableCell><Skeleton variant="text" /></TableCell>
//                             <TableCell><Skeleton variant="text" /></TableCell>
//                             <TableCell><Skeleton variant="text" /></TableCell>
//                             <TableCell><Skeleton variant="text" /></TableCell>
//                             <TableCell align="center"><Skeleton variant="rectangular" width={80} height={30} /></TableCell>
//                         </TableRow>
//                     ))
//                 ) : (
//                     (rowsPerPage > 0
//                         ? filteredEmployees.slice(currentPage * rowsPerPage, currentPage * rowsPerPage + rowsPerPage)
//                         : filteredEmployees
//                     ).map((employee, index) => (
//                         <TableRow key={employee.user_id} sx={{ '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' } }} onMouseEnter={() => setHoveredRowId(employee.user_id)} onMouseLeave={() => setHoveredRowId(null)}>
//                             <TableCell sx={{ fontSize: '0.95rem' }}>{currentPage * rowsPerPage + index + 1}</TableCell>
//                             <TableCell sx={{ fontSize: '0.95rem' }}>{employee.employee_name}</TableCell>
//                             <TableCell sx={{ padding: '0 8px', textAlign: 'center' }}>
//                                {hoveredRowId === employee.user_id && <IconButton onClick={() => handleArrowClick(employee.user_id)} size="small" sx={{ color: themeOrange }}><ArrowForwardIcon fontSize="small" /></IconButton>}
//                             </TableCell>
//                             <TableCell sx={{ fontSize: '0.95rem' }}>{employee.department_name || 'N/A'}</TableCell>
//                             <TableCell sx={{ fontSize: '0.95rem' }}>{employee.designation_name || 'N/A'}</TableCell>
//                             <TableCell sx={{ fontSize: '0.95rem' }}>{formatDate(employee.join_date)}</TableCell>
//                             <TableCell sx={{ fontSize: '0.95rem' }}>
//                                 <Chip label={employee.status === 1 ? "Active" : "Inactive"} size="small" sx={{ bgcolor: employee.status === 1 ? themePurple : themeOrange, color: 'white' }} />
//                             </TableCell>
//                             <TableCell sx={{ fontSize: '0.95rem' }}>{employee.manager}</TableCell>
//                             <TableCell>
//                                 <Box display="flex" justifyContent="center" gap={0.5}>
//                                     <Tooltip title="Edit"><IconButton onClick={() => handleEditEmployee(employee)} sx={{ color: themePurple }}><EditIcon /></IconButton></Tooltip>
//                                     <Tooltip title="Delete"><IconButton onClick={() => handleDeleteEmployee(employee.user_id)} sx={{ color: themeOrange }}><DeleteIcon /></IconButton></Tooltip>
//                                 </Box>
//                             </TableCell>
//                         </TableRow>
//                     ))
//                 )}
//               </TableBody>
//             </Table>
//         </TableContainer>

//         <Box sx={{ 
//             display: 'flex', 
//             justifyContent: 'space-between', 
//             alignItems: 'center', 
//             flexDirection: isMobile ? 'column' : 'row', 
//             p: 2,
//             borderTop: '1px solid rgba(224, 224, 224, 1)'
//         }}>
//             <Typography variant="body2" color="text.secondary">
//                 Showing {filteredEmployees.length > 0 ? currentPage * rowsPerPage + 1 : 0} to {Math.min((currentPage + 1) * rowsPerPage, filteredEmployees.length)} of {filteredEmployees.length} results
//             </Typography>
//             <TablePagination
//                 rowsPerPageOptions={[5, 10, 15, 25]}
//                 component="div"
//                 count={filteredEmployees.length}
//                 rowsPerPage={rowsPerPage}
//                 page={currentPage}
//                 onPageChange={handleChangePage}
//                 onRowsPerPageChange={handleRowsPerPageChange}
//                 labelDisplayedRows={() => ''} 
//                 sx={{
//                     '& .MuiToolbar-root': {
//                         p: 0 
//                     },
//                     '& .MuiSvgIcon-root': {
//                         color: themePurple,
//                     },
//                 }}
//             />
//         </Box>
//     </Box>
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

// const statusOptions = [{ value: 1, label: 'Active' }, { value: 0, label: 'Inactive' }];
// const probationOptions = [{ value: 'y', label: 'Yes' }, { value: 'n', label: 'No' }];
// const genderOptions = [{ value: 'Male', label: 'Male' }, { value: 'Female', label: 'Female' }, { value: 'Other', label: 'Other' }];
// const subDivisionOptions = [{ value: 'VetBiz', label: 'VetBiz' }, { value: 'TredBiz', label: 'TredBiz' }, { value: ' ', label: 'TredBiz Mix' }];

// export default function EmployeesView() {
//   const employeeDialogRef = useRef(null);
//   const changeManagerDialogRef = useRef(null);

//   const muiTheme = useTheme();
//   const isMobile = useMediaQuery(muiTheme.breakpoints.down("sm"));

//   const themePurple = '#8C257C';
//   const themePurpleHover = '#6d1d60';
//   const themeOrange = '#F58E35';

//   const purpleButtonSx = {
//     backgroundColor: themePurple,
//     color: 'white',
//     '&:hover': {
//       backgroundColor: themePurpleHover,
//     },
//   };

//   const cancelButtonSx = {
//     color: '#757575',
//     '&:hover': {
//         backgroundColor: 'rgba(0, 0, 0, 0.04)'
//     }
//   };

//   const [loading, setLoading] = useState(true);
//   const [departments, setDepartments] = useState([]);
//   const [designations, setDesignations] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [openChangeManagerForm, setOpenChangeManagerForm] = useState(false);
//   const [currentPage, setCurrentPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
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

//   const [currentEmployee, setCurrentEmployee] = useState({
//     id: null, firstName: "", middleName: "", lastName: "", email: "", join_date: "",
//     status: 1, phone: "", avatar: null, country_id: "", state_id: "", employee_hub_id: "",
//     headquarter_id: "", division_id: "", subDivision: "", role: "", is_probation: "n",
//     resumeUrl: "", password: "", gender: "", username: "", grossSalary: "", department_id: "",
//     designation_id: "", manager_id: "", officeShift: "",
//   });

//   const [openEmployeeForm, setOpenEmployeeForm] = useState(false);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [ depts, empDropdown, shifts, countriesRes, hubs, divs, rolesRes, talent,headquartersRes ] = await Promise.all([
//           axiosInstance.get('api/desig_dept_dropdown/'),
//           axiosInstance.get('employee-dropdown/'),
//           axiosInstance.get('api/office_shift_dropdown/'),
//           axiosInstance.get('api/countries/'),
//           axiosInstance.get('api/employee_hub/'),
//           axiosInstance.get('api/division/'),
//           axiosInstance.get('api/role_list/'),
//           axiosInstance.get('api/search_by_email_vet_talent/'),
//           axios.get("https://tdtlworld.com/hrms-backend/api/headquarters/")
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
//           Swal.fire({ icon: 'error', title: 'Error', text: 'Failed to fetch states.', target: employeeDialogRef.current, timer: 3000, showConfirmButton: false });
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
//           console.error("Error fetching employee hubs:", err);
//           Swal.fire({ icon: 'error', title: 'Error', text: 'Failed to fetch employee hubs.', target: employeeDialogRef.current, timer: 3000, showConfirmButton: false });
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
//           Swal.fire({ icon: 'error', title: 'Error', text: 'Failed to load designations.', target: employeeDialogRef.current, timer: 3000, showConfirmButton: false });
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
//   const handleArrowClick = (id) => navigate(`/hrms/admindashboard/employeedetail/${id}`);

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setCurrentEmployee((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleAddEmployee = async () => {
//     try {
//       const maxIdResponse = await axios.get("https://tdtlworld.com/hrms-backend/api/get_max_employee_id/");
//       const newEmpId = maxIdResponse.data.employee_id;
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
//       console.error("Error fetching max employee ID:", error);
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
//       setEmployeeDocuments(null);
//     } finally {
//       setIsFetchingDocs(false);
//     }
//   };

//   const handleEditEmployee = async (employee) => {
//     if (!employee || !employee.user_id) return;
//     try {
//         const response = await axiosInstance.get(`api/edit_employee/${employee.user_id}/`);
//         if (response.data.status !== "success" || response.data.data.length === 0) {
//             Swal.fire({ icon: 'error', title: 'Error', text: 'Failed to load employee details.', timer: 3000, showConfirmButton: false });
//             return;
//         }
//         const empData = response.data.data[0];

//         const [desigRes, statesRes, hubsRes] = await Promise.all([
//             axiosInstance.get(`api/desig_dept_dropdown/?dept_id=${empData.department_id}/`),
//             empData.country_name ? axiosInstance.get(`api/states/?country_name=${empData.country_name}`) : Promise.resolve({ data: { data: [] } }),
//             empData.state ? axiosInstance.get(`api/employee_hub_dropdown/${empData.state}/`) : Promise.resolve({ data: { data: [] } })
//         ]);

//         setDesignations(desigRes.data.desig_data || []);
//         setStates(statesRes.data.data || []);
//         setEmployeeHubs(hubsRes.data.data || []);
        
//         const officeShiftObj = officeShifts.find(s => s.office_shift_name === empData.office_shift);
//         const nameParts = (empData.emp_name || "").split(" ");
//         const selectedCountry = countries.find(c => c.country_name === empData.country_name);
//         const selectedHeadquarter = headquarters.find(hq => hq.headquarter_name === empData.headquarter);

//         let finalSubDivisionValue = empData.sub_division || "";
//         if (finalSubDivisionValue === "Tred") {
//             finalSubDivisionValue = "TredBiz";
//         }

//         setCurrentEmployee({
//             id: employee.user_id,
//             firstName: nameParts[0] || "",
//             middleName: nameParts.length > 2 ? nameParts.slice(1, -1).join(" ") : "",
//             lastName: nameParts.length > 1 ? nameParts[nameParts.length - 1] : "",
//             email: empData.email || "", phone: empData.phone || "",
//             manager_id: empData.manager_id ? Number(empData.manager_id) : "",
//             designation_id: empData.designation_id ? Number(empData.designation_id) : "",
//             department_id: empData.department_id ? Number(empData.department_id) : "",
//             headquarter_id: selectedHeadquarter ? selectedHeadquarter.headquarter_id : "",
//             subDivision: finalSubDivisionValue,
//             division_id: empData.division_id ? Number(empData.division_id) : "",
//             state_id: empData.state ? Number(empData.state) : "",
//             employee_hub_id: empData.employee_hub_id ? Number(empData.employee_hub_id) : "",
//             role: empData.role_id ? Number(empData.role_id) : "",
//             officeShift: officeShiftObj ? Number(officeShiftObj.office_shift_id) : "",
//             status: Number(empData.status),
//             join_date: empData.join_date ? empData.join_date.split(" ")[0] : "",
//             country_id: selectedCountry ? Number(selectedCountry.country_id) : "",
//             avatar: empData.profile_photo || "",
//             is_probation: empData.probation?.toLowerCase() === 'y' ? 'y' : 'n',
//             resumeUrl: "",
//         });

//         setIsEditMode(true);
//         setOpenEmployeeForm(true);
//         setShowPassword(false);
//     } catch (error) {
//         console.error("Error fetching employee details for edit:", error);
//         Swal.fire({ icon: 'error', title: 'Error', text: 'Failed to fetch complete employee details.', timer: 3000, showConfirmButton: false });
//     }
//   };


//   const handleSaveEmployee = async () => {
//     if (!isEditMode) {
//       const requiredFields = {
//         firstName: 'First Name', lastName: 'Last Name', email: 'Email', phone: 'Phone', country_id: 'Country',
//         state_id: 'State', employee_hub_id: 'Employee Hub', headquarter_id: 'Headquarter', division_id: 'Division',
//         manager_id: 'Manager', department_id: 'Department', designation_id: 'Designation', officeShift: 'Office Shift',
//         join_date: 'Join Date', avatar: 'Photo', gender: 'Gender', username: 'Username', password: 'Password',
//         role: 'Role', grossSalary: 'Gross Salary'
//       };
//       const selectedDivision = divisions.find(d => d.division_id == currentEmployee.division_id);
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
//       showCancelButton: true, confirmButtonColor: themePurple, cancelButtonColor: themeOrange,
//       confirmButtonText: 'Yes, delete it!'
//     }).then((result) => {
//       if (result.isConfirmed) {
//         axiosInstance.delete("api/edit_employee/", { data: { user_id: employeeId } })
//           .then(() => {
//             fetchEmployees();
//             Swal.fire({ icon: 'success', title: 'Deleted!', text: 'The employee has been deleted.', timer: 3000, showConfirmButton: false });
//           })
//           .catch((error) => {
//             console.error("Error deleting employee: ", error);
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
//   };

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

//   const handleChangePage = (event, newPage) => {
//     setCurrentPage(newPage);
//   };

//   const handleRowsPerPageChange = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setCurrentPage(0);
//   };

//   const handleFileUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) setCurrentEmployee((prev) => ({ ...prev, avatar: file }));
//   };

//   const isSubDivisionDisabled = useMemo(() => {
//     if (!currentEmployee.division_id) return true;
//     const selectedDivision = divisions.find(d => d.division_id == currentEmployee.division_id);
//     return !selectedDivision || selectedDivision.division_name !== 'Livestock';
//   }, [currentEmployee.division_id, divisions]);


//   const formatDate = (dateString) => {
//     if (!dateString) return '';
//     try {
//       const date = new Date(dateString);
//       const day = String(date.getDate()).padStart(2, '0');
//       const month = String(date.getMonth() + 1).padStart(2, '0');
//       const year = date.getFullYear();
//       return `${day}/${month}/${year}`;
//     } catch (error) {
//       console.error("Could not format date:", dateString);
//       return dateString.split(" ")[0];
//     }
//   };

//   return (
//     <Box component={Paper} p={3}>
//       <Typography variant="h4" sx={{ color: themePurple, fontWeight: "bold", mb: 5 }}>
//         Employees List
//       </Typography>

//       <Box sx={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           flexDirection: isMobile ? "column" : "row",
//           gap: 2,
//           mb: 2
//       }}>
//           <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
//               <Button variant="contained" startIcon={<AddIcon />} onClick={handleAddEmployee} sx={purpleButtonSx}>Add Employee</Button>
//               <Button variant="contained" startIcon={<DownloadIcon />} onClick={handleExportEmployees} sx={purpleButtonSx}>Export</Button>
//               <Button variant="contained" startIcon={<ChangeManagerIcon />} onClick={() => setOpenChangeManagerForm(true)} sx={purpleButtonSx}>Change Manager</Button>
//           </Box>
//           <TextField
//               size="small"
//               placeholder="Search..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               sx={{ width: isMobile ? "100%" : "auto" }}
//               InputProps={{
//                   startAdornment: (
//                       <InputAdornment position="start">
//                           <SearchIcon />
//                       </InputAdornment>
//                   ),
//               }}
//           />
//       </Box>

//         <Dialog open={openChangeManagerForm} onClose={() => setOpenChangeManagerForm(false)} maxWidth="sm" fullWidth ref={changeManagerDialogRef}>
//           <DialogTitle sx={{ color: themePurple, fontWeight: 'bold' }}>
//             Change Manager
//             <IconButton onClick={() => setOpenChangeManagerForm(false)} sx={{ position: "absolute", right: 8, top: 8, color: (theme) => theme.palette.grey[500] }}><CloseIcon /></IconButton>
//           </DialogTitle>
//           <DialogContent><Grid container spacing={2} sx={{ mt: 1 }}><Grid item xs={12}><FormControl fullWidth><InputLabel>Select Employee</InputLabel><Select value={selectedEmployeeForManagerChange} onChange={(e) => setSelectedEmployeeForManagerChange(e.target.value)} label="Select Employee">{allEmployeesForDropdown.map((emp) => (<MenuItem key={emp.value} value={emp.value}>{emp.label}</MenuItem>))}</Select></FormControl></Grid><Grid item xs={12}><FormControl fullWidth><InputLabel>Select New Manager</InputLabel><Select value={newManager} onChange={(e) => setNewManager(e.target.value)} label="Select New Manager">{allEmployeesForDropdown.map((emp) => (<MenuItem key={emp.value} value={emp.value}>{emp.label}</MenuItem>))}</Select></FormControl></Grid></Grid></DialogContent>
//           <DialogActions>
//             <Button onClick={() => setOpenChangeManagerForm(false)} sx={cancelButtonSx}>Cancel</Button>
//             <Button onClick={handleChangeManager} variant="contained" sx={purpleButtonSx}>Save</Button>
//           </DialogActions>
//         </Dialog>

//         <Dialog open={openEmployeeForm} onClose={() => setOpenEmployeeForm(false)} maxWidth="md" fullWidth ref={employeeDialogRef}>
//             <DialogTitle sx={{ color: themePurple, fontWeight: 'bold' }}>
//             {isEditMode ? "Edit Employee" : "Add Employee"}
//             <IconButton onClick={() => setOpenEmployeeForm(false)} sx={{ position: "absolute", right: 8, top: 8, color: (theme) => theme.palette.grey[500] }}><CloseIcon /></IconButton>
//           </DialogTitle>
//           <DialogContent>
//             <Grid container spacing={2} sx={{ mt: 1 }}>
//               {!isEditMode && (<Grid item xs={12}><Autocomplete options={talentPool} getOptionLabel={(option) => option.email || ""} onChange={handleTalentSelect} onInputChange={(event, newInputValue) => { if (!talentPool.find(p => p.email === newInputValue)) { setCurrentEmployee(prev => ({ ...prev, email: newInputValue })); }}} renderInput={(params) => (<TextField {...params} label="Search Email to Auto-fill" />)} /></Grid>)}
//               <Grid item xs={12} sm={4}><TextField fullWidth label="First Name" name="firstName" value={currentEmployee.firstName || ""} onChange={handleInputChange} onKeyPress={(e) => { if (!/^[A-Za-z]$/.test(e.key)) e.preventDefault(); }} InputProps={{ readOnly: isEditMode }} /></Grid>
//               <Grid item xs={12} sm={4}><TextField fullWidth label="Middle Name" name="middleName" value={currentEmployee.middleName || ""} onChange={handleInputChange} onKeyPress={(e) => { if (!/^[A-Za-z]$/.test(e.key)) e.preventDefault(); }} InputProps={{ readOnly: isEditMode }} /></Grid>
//               <Grid item xs={12} sm={4}><TextField fullWidth label="Last Name" name="lastName" value={currentEmployee.lastName || ""} onChange={handleInputChange} onKeyPress={(e) => { if (!/^[A-Za-z]$/.test(e.key)) e.preventDefault(); }} InputProps={{ readOnly: isEditMode }} /></Grid>
//               <Grid item xs={12} sm={6}><TextField fullWidth label="Email" name="email" value={currentEmployee.email || ''} onChange={handleInputChange} InputProps={{ readOnly: isEditMode || !!talentPool.find(p => p.email === currentEmployee.email) }} /></Grid>
//               <Grid item xs={12} sm={6}><TextField fullWidth label="Phone" name="phone" value={currentEmployee.phone || ''} onChange={(e) => { const value = e.target.value; if (/^\d{0,10}$/.test(value)) handleInputChange(e); }} inputProps={{ maxLength: 10, inputMode: 'numeric', pattern: '[0-9]*' }} InputProps={{ readOnly: isEditMode }} /></Grid>
//               <Grid item xs={12} sm={6}><Autocomplete options={countries} getOptionLabel={(option) => option.country_name || ''} value={countries.find(c => c.country_id == currentEmployee.country_id) || null} onChange={(e, nv) => handleCountryChange(nv)} isOptionEqualToValue={(option, value) => option.country_id == value.country_id} renderInput={(params) => (<TextField {...params} label="Country" />)} /></Grid>
//               <Grid item xs={12} sm={6}><Autocomplete options={states} getOptionLabel={(option) => option.state_name || ''} value={states.find(s => s.state_id == currentEmployee.state_id) || null} onChange={(e, nv) => handleStateChange(nv)} isOptionEqualToValue={(option, value) => option.state_id == value.state_id} disabled={!currentEmployee.country_id} renderInput={(params) => (<TextField {...params} label="State" />)} /></Grid>
//               <Grid item xs={12} sm={6}><Autocomplete options={employeeHubs} getOptionLabel={(option) => option.employee_hub_name || ''} value={employeeHubs.find(h => h.employee_hub_id == currentEmployee.employee_hub_id) || null} onChange={(e, nv) => setCurrentEmployee(prev => ({ ...prev, employee_hub_id: nv ? nv.employee_hub_id : "" }))} isOptionEqualToValue={(option, value) => option.employee_hub_id == value.employee_hub_id} disabled={!currentEmployee.state_id} renderInput={(params) => (<TextField {...params} label="Employee Hub" />)} /></Grid>
//               <Grid item xs={12} sm={6}><Autocomplete options={headquarters} getOptionLabel={(option) => option.headquarter_name || ''} value={headquarters.find(h => h.headquarter_id == currentEmployee.headquarter_id) || null} onChange={(e, nv) => setCurrentEmployee(prev => ({ ...prev, headquarter_id: nv ? nv.headquarter_id : "" }))} isOptionEqualToValue={(option, value) => option.headquarter_id == value.headquarter_id} renderInput={(params) => (<TextField {...params} label="Headquarter" />)} /></Grid>
//               <Grid item xs={12} sm={6}><Autocomplete options={divisions} getOptionLabel={(option) => option.division_name || ''} value={divisions.find(d => d.division_id == currentEmployee.division_id) || null} onChange={(e, nv) => handleDivisionChange(nv)} isOptionEqualToValue={(option, value) => option.division_id == value.division_id} renderInput={(params) => (<TextField {...params} label="Division" />)} /></Grid>
//               <Grid item xs={12} sm={6}><Autocomplete options={subDivisionOptions} getOptionLabel={(option) => option.label || ''} value={subDivisionOptions.find(sd => sd.value === currentEmployee.subDivision) || null} onChange={(e, nv) => setCurrentEmployee(prev => ({ ...prev, subDivision: nv ? nv.value : "" }))} isOptionEqualToValue={(option, value) => option.value === value.value} disabled={isSubDivisionDisabled} renderInput={(params) => (<TextField {...params} label="Sub Division" />)} /></Grid>
//              <Grid item xs={12} sm={6}><Autocomplete options={allEmployeesForDropdown} getOptionLabel={(option) => option.label || ''} value={allEmployeesForDropdown.find(e => e.value == currentEmployee.manager_id) || null} onChange={(e, nv) => setCurrentEmployee(prev => ({ ...prev, manager_id: nv ? nv.value : "" }))} isOptionEqualToValue={(option, value) => option.value == value.value} renderInput={(params) => (<TextField {...params} label="Manager" />)} /></Grid>
//               <Grid item xs={12} sm={6}><Autocomplete options={departments} getOptionLabel={(option) => option.dept_name || ''} value={departments.find(d => d.dept_id == currentEmployee.department_id) || null} onChange={(e, nv) => handleDeptChange(nv)} isOptionEqualToValue={(option, value) => option.dept_id == value.dept_id} renderInput={(params) => (<TextField {...params} label="Department" />)} /></Grid>
//               <Grid item xs={12} sm={6}><Autocomplete options={designations} getOptionLabel={(option) => option.desig_name || ''} value={designations.find(d => d.desig_id == currentEmployee.designation_id) || null} onChange={(e, nv) => setCurrentEmployee(prev => ({ ...prev, designation_id: nv ? nv.desig_id : "" }))} isOptionEqualToValue={(option, value) => option.desig_id == value.desig_id} disabled={!currentEmployee.department_id} renderInput={(params) => (<TextField {...params} label="Designation" />)} /></Grid>
//               <Grid item xs={12} sm={6}><Autocomplete options={officeShifts} getOptionLabel={(option) => option.office_shift_name || ''} value={officeShifts.find(s => s.office_shift_id == currentEmployee.officeShift) || null} onChange={(e, nv) => setCurrentEmployee(prev => ({ ...prev, officeShift: nv ? nv.office_shift_id : "" }))} isOptionEqualToValue={(option, value) => option.office_shift_id == value.office_shift_id} renderInput={(params) => (<TextField {...params} label="Office Shift" />)} /></Grid>
//               <Grid item xs={12} sm={6}><Autocomplete options={statusOptions} getOptionLabel={(option) => option.label} value={statusOptions.find(s => s.value === currentEmployee.status) || null} onChange={(e, nv) => setCurrentEmployee(prev => ({ ...prev, status: nv ? nv.value : 1 }))} isOptionEqualToValue={(option, value) => option.value === value.value} renderInput={(params) => (<TextField {...params} label="Status" />)} /></Grid>
//               <Grid item xs={12} sm={6}><Autocomplete options={probationOptions} getOptionLabel={(option) => option.label} value={probationOptions.find(p => p.value === currentEmployee.is_probation) || null} onChange={(e, nv) => setCurrentEmployee(prev => ({ ...prev, is_probation: nv ? nv.value : "n" }))} isOptionEqualToValue={(option, value) => option.value === value.value} renderInput={(params) => (<TextField {...params} label="On Probation" />)} /></Grid>
//               <Grid item xs={12} sm={6}><TextField fullWidth label="Join Date" name="join_date" type="date" value={currentEmployee.join_date || ""} onChange={handleInputChange} InputLabelProps={{ shrink: true }} /></Grid>
//               <Grid item xs={12} sm={6}><Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}><Button variant="contained" component="label" disabled={isEditMode} sx={purpleButtonSx}>Upload Photo<input type="file" hidden accept="image/*" onChange={handleFileUpload} /></Button>{currentEmployee.avatar && <Avatar src={typeof currentEmployee.avatar === 'string' ? currentEmployee.avatar : URL.createObjectURL(currentEmployee.avatar)} sx={{ width: 56, height: 56 }} />}</Box></Grid>
//               <Grid item xs={12}>{isFetchingDocs && <CircularProgress />}{employeeDocuments && !isFetchingDocs && (<Box><Typography variant="subtitle1" gutterBottom>Fetched Documents</Typography><Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>{Object.entries(employeeDocuments).map(([name, url]) => (url ? (<Chip key={name} label={name.replace(/_/g, ' ')} component="a" href={url} target="_blank" clickable icon={<LinkIcon />} variant="outlined" color="secondary" size="small" />) : null))}</Box></Box>)}</Grid>
//               {!isEditMode && (<>
//                 <Grid item xs={12} sm={6}><Autocomplete options={genderOptions} getOptionLabel={(option) => option.label} value={genderOptions.find(g => g.value === currentEmployee.gender) || null} onChange={(e, nv) => setCurrentEmployee(prev => ({ ...prev, gender: nv ? nv.value : "" }))} isOptionEqualToValue={(option, value) => option.value === value.value} renderInput={(params) => (<TextField {...params} label="Gender" />)} /></Grid>
//                 <Grid item xs={12} sm={6}><TextField fullWidth label="Username" name="username" value={currentEmployee.username || ""} onChange={handleInputChange} InputProps={{ readOnly: true }} /></Grid>
//                 <Grid item xs={12} sm={6}><TextField fullWidth label="Password" name="password" value={currentEmployee.password || ""} onChange={handleInputChange} type={showPassword ? 'text' : 'password'} InputProps={{ endAdornment: (<InputAdornment position="end"> <IconButton aria-label="toggle password visibility" onClick={() => setShowPassword((prev) => !prev)} onMouseDown={(e) => e.preventDefault()} edge="end"> {showPassword ? <VisibilityOff /> : <Visibility />} </IconButton> </InputAdornment>) }} /></Grid>
//                 <Grid item xs={12} sm={6}><Autocomplete options={roles} getOptionLabel={(option) => option.role_name || ''} value={roles.find(r => r.index == currentEmployee.role) || null} onChange={(e, nv) => setCurrentEmployee(prev => ({ ...prev, role: nv ? nv.index : "" }))} isOptionEqualToValue={(option, value) => option.index == value.index} renderInput={(params) => (<TextField {...params} label="Role" />)} /></Grid>
//                 <Grid item xs={12} sm={6}><TextField fullWidth label="Gross Salary" name="grossSalary" type="number" value={currentEmployee.grossSalary || ""} onChange={(e) => { const value = e.target.value; if (/^\d*\.?\d*$/.test(value)) handleInputChange(e); }} /></Grid>
//               </>)}
//             </Grid>
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={() => setOpenEmployeeForm(false)} disabled={isSaving} sx={cancelButtonSx}>Cancel</Button>
//             <Button onClick={handleSaveEmployee} variant="contained" disabled={isSaving} sx={purpleButtonSx}>{isSaving ? <CircularProgress size={24} color="inherit" /> : "Save"}</Button>
//           </DialogActions>
//         </Dialog>
        
//         <TableContainer>
//             <Table sx={{ minWidth: "100%", whiteSpace: "nowrap" }}>
//               <TableHead>
//                 <TableRow sx={{ bgcolor: themePurple }}>
//                   <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>SR. NO.</TableCell>
//                   <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>EMPLOYEE</TableCell>
//                   <TableCell sx={{ color: 'white' }}></TableCell>
//                   <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>DEPARTMENT</TableCell>
//                   <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>DESIGNATION</TableCell>
//                   <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>JOIN DATE</TableCell>
//                   <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>STATUS</TableCell>
//                   <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>MANAGER</TableCell>
//                   <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', color: 'white' }}>ACTIONS</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {loading ? (
//                     Array.from(new Array(rowsPerPage)).map((_, index) => (
//                         <TableRow key={index}>
//                             <TableCell><Skeleton variant="text" /></TableCell>
//                             <TableCell><Skeleton variant="text" /></TableCell>
//                             <TableCell><Skeleton variant="text" /></TableCell>
//                             <TableCell><Skeleton variant="text" /></TableCell>
//                             <TableCell><Skeleton variant="text" /></TableCell>
//                             <TableCell><Skeleton variant="text" /></TableCell>
//                             <TableCell><Skeleton variant="text" /></TableCell>
//                             <TableCell><Skeleton variant="text" /></TableCell>
//                             <TableCell align="center"><Skeleton variant="rectangular" width={80} height={30} /></TableCell>
//                         </TableRow>
//                     ))
//                 ) : (
//                     (rowsPerPage > 0
//                         ? filteredEmployees.slice(currentPage * rowsPerPage, currentPage * rowsPerPage + rowsPerPage)
//                         : filteredEmployees
//                     ).map((employee, index) => (
//                         <TableRow key={employee.user_id} sx={{ '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' } }} onMouseEnter={() => setHoveredRowId(employee.user_id)} onMouseLeave={() => setHoveredRowId(null)}>
//                             <TableCell sx={{ fontSize: '0.95rem' }}>{currentPage * rowsPerPage + index + 1}</TableCell>
//                             <TableCell sx={{ fontSize: '0.95rem' }}>{employee.employee_name}</TableCell>
//                             <TableCell sx={{ padding: '0 8px', textAlign: 'center' }}>
//                                {hoveredRowId === employee.user_id && <IconButton onClick={() => handleArrowClick(employee.user_id)} size="small" sx={{ color: themeOrange }}><ArrowForwardIcon fontSize="small" /></IconButton>}
//                             </TableCell>
//                             <TableCell sx={{ fontSize: '0.95rem' }}>{employee.department_name || 'N/A'}</TableCell>
//                             <TableCell sx={{ fontSize: '0.95rem' }}>{employee.designation_name || 'N/A'}</TableCell>
//                             <TableCell sx={{ fontSize: '0.95rem' }}>{formatDate(employee.join_date)}</TableCell>
//                             <TableCell sx={{ fontSize: '0.95rem' }}>
//                                 <Chip label={employee.status === 1 ? "Active" : "Inactive"} size="small" sx={{ bgcolor: employee.status === 1 ? '#4caf50' : themeOrange, color: 'white' }} />
//                             </TableCell>
//                             <TableCell sx={{ fontSize: '0.95rem' }}>{employee.manager}</TableCell>
//                             <TableCell>
//                                 <Box display="flex" justifyContent="center" gap={0.5}>
//                                     <Tooltip title="Edit"><IconButton onClick={() => handleEditEmployee(employee)} sx={{ color: themePurple }}><EditIcon /></IconButton></Tooltip>
//                                     <Tooltip title="Delete"><IconButton onClick={() => handleDeleteEmployee(employee.user_id)} sx={{ color: themeOrange }}><DeleteIcon /></IconButton></Tooltip>
//                                 </Box>
//                             </TableCell>
//                         </TableRow>
//                     ))
//                 )}
//               </TableBody>
//             </Table>
//         </TableContainer>

//         <Box sx={{ 
//             display: 'flex', 
//             justifyContent: 'space-between', 
//             alignItems: 'center', 
//             flexDirection: isMobile ? 'column' : 'row', 
//             p: 2,
//             borderTop: '1px solid rgba(224, 224, 224, 1)'
//         }}>
//             <Typography variant="body2" color="text.secondary">
//                 Showing {filteredEmployees.length > 0 ? currentPage * rowsPerPage + 1 : 0} to {Math.min((currentPage + 1) * rowsPerPage, filteredEmployees.length)} of {filteredEmployees.length} results
//             </Typography>
//             <TablePagination
//                 rowsPerPageOptions={[5, 10, 15, 25]}
//                 component="div"
//                 count={filteredEmployees.length}
//                 rowsPerPage={rowsPerPage}
//                 page={currentPage}
//                 onPageChange={handleChangePage}
//                 onRowsPerPageChange={handleRowsPerPageChange}
//                 labelDisplayedRows={() => ''} 
//                 sx={{
//                     '& .MuiToolbar-root': {
//                         p: 0 
//                     },
//                     '& .MuiSvgIcon-root': {
//                         color: themePurple,
//                     },
//                 }}
//             />
//         </Box>
//     </Box>
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
//   useTheme,
//   useMediaQuery,
//   Skeleton,
//   Pagination,
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
 
// const statusOptions = [{ value: 1, label: 'Active' }, { value: 0, label: 'Inactive' }];
// const probationOptions = [{ value: 'y', label: 'Yes' }, { value: 'n', label: 'No' }];
// const genderOptions = [{ value: 'Male', label: 'Male' }, { value: 'Female', 'label': 'Female' }, { value: 'Other', label: 'Other' }];
// const subDivisionOptions = [{ value: 'VetBiz', label: 'VetBiz' }, { value: 'TredBiz', label: 'TredBiz' }, { value: ' ', label: 'TredBiz Mix' }];
 
// export default function EmployeesView() {
//   const employeeDialogRef = useRef(null);
//   const changeManagerDialogRef = useRef(null);
 
//   const muiTheme = useTheme();
//   const isMobile = useMediaQuery(muiTheme.breakpoints.down("sm"));
 
//   const themePurple = '#8C257C';
//   const themePurpleHover = '#6d1d60';
//   const themeOrange = '#F58E35';
 
//   const purpleButtonSx = {
//     backgroundColor: themePurple,
//     color: 'white',
//     '&:hover': {
//       backgroundColor: themePurpleHover,
//     },
//   };
 
//   const cancelButtonSx = {
//     color: '#757575',
//     '&:hover': {
//         backgroundColor: 'rgba(0, 0, 0, 0.04)'
//     }
//   };
 
//   const [loading, setLoading] = useState(true);
//   const [departments, setDepartments] = useState([]);
//   const [designations, setDesignations] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [openChangeManagerForm, setOpenChangeManagerForm] = useState(false);
//   const [currentPage, setCurrentPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
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
 
//   const [currentEmployee, setCurrentEmployee] = useState({
//     id: null, firstName: "", middleName: "", lastName: "", email: "", join_date: "",
//     status: 1, phone: "", avatar: null, country_id: "", state_id: "", employee_hub_id: "",
//     headquarter_id: "", division_id: "", subDivision: "", role: "", is_probation: "n",
//     resumeUrl: "", password: "", gender: "", username: "", grossSalary: "", department_id: "",
//     designation_id: "", manager_id: "", officeShift: "",
//   });
 
//   const [openEmployeeForm, setOpenEmployeeForm] = useState(false);
 
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [ depts, empDropdown, shifts, countriesRes, hubs, divs, rolesRes, talent,headquartersRes ] = await Promise.all([
//           axiosInstance.get('api/desig_dept_dropdown/'),
//           axiosInstance.get('employee-dropdown/'),
//           axiosInstance.get('api/office_shift_dropdown/'),
//           axiosInstance.get('api/countries/'),
//           axiosInstance.get('api/employee_hub/'),
//           axiosInstance.get('api/division/'),
//           axiosInstance.get('api/role_list/'),
//           axiosInstance.get('api/search_by_email_vet_talent/'),
//           axios.get("https://tdtlworld.com/hrms-backend/api/headquarters/")
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
//           Swal.fire({ icon: 'error', title: 'Error', text: 'Failed to fetch states.', target: employeeDialogRef.current, timer: 3000, showConfirmButton: false });
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
//           console.error("Error fetching employee hubs:", err);
//           Swal.fire({ icon: 'error', title: 'Error', text: 'Failed to fetch holiday hubs.', target: employeeDialogRef.current, timer: 3000, showConfirmButton: false });
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
//           Swal.fire({ icon: 'error', title: 'Error', text: 'Failed to load designations.', target: employeeDialogRef.current, timer: 3000, showConfirmButton: false });
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
//   const handleArrowClick = (id) => navigate(`/hrms/admindashboard/employeedetail/${id}`);
 
//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setCurrentEmployee((prev) => ({ ...prev, [name]: value }));
//   };
 
//   const handleAddEmployee = async () => {
//     try {
//       const maxIdResponse = await axios.get("https://tdtlworld.com/hrms-backend/api/get_max_employee_id/");
//       const newEmpId = maxIdResponse.data.employee_id;
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
//       console.error("Error fetching max employee ID:", error);
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
//       setEmployeeDocuments(null);
//     } finally {
//       setIsFetchingDocs(false);
//     }
//   };
 
//   const handleEditEmployee = async (employee) => {
//     if (!employee || !employee.user_id) return;
//     try {
//         const response = await axiosInstance.get(`api/edit_employee/${employee.user_id}/`);
//         if (response.data.status !== "success" || response.data.data.length === 0) {
//             Swal.fire({ icon: 'error', title: 'Error', text: 'Failed to load employee details.', timer: 3000, showConfirmButton: false });
//             return;
//         }
//         const empData = response.data.data[0];
 
//         const [desigRes, statesRes, hubsRes] = await Promise.all([
//             axiosInstance.get(`api/desig_dept_dropdown/?dept_id=${empData.department_id}/`),
//             empData.country_name ? axiosInstance.get(`api/states/?country_name=${empData.country_name}`) : Promise.resolve({ data: { data: [] } }),
//             empData.state ? axiosInstance.get(`api/employee_hub_dropdown/${empData.state}/`) : Promise.resolve({ data: { data: [] } })
//         ]);
 
//         setDesignations(desigRes.data.desig_data || []);
//         setStates(statesRes.data.data || []);
//         setEmployeeHubs(hubsRes.data.data || []);
        
//         const officeShiftObj = officeShifts.find(s => s.office_shift_name === empData.office_shift);
//         const nameParts = (empData.emp_name || "").split(" ");
//         const selectedCountry = countries.find(c => c.country_name === empData.country_name);
//         const selectedHeadquarter = headquarters.find(hq => hq.headquarter_name === empData.headquarter);
 
//         let finalSubDivisionValue = empData.sub_division || "";
//         if (finalSubDivisionValue === "Tred") {
//             finalSubDivisionValue = "TredBiz";
//         }
 
//         setCurrentEmployee({
//             id: employee.user_id,
//             firstName: nameParts[0] || "",
//             middleName: nameParts.length > 2 ? nameParts.slice(1, -1).join(" ") : "",
//             lastName: nameParts.length > 1 ? nameParts[nameParts.length - 1] : "",
//             email: empData.email || "", phone: empData.phone || "",
//             manager_id: empData.manager_id ? Number(empData.manager_id) : "",
//             designation_id: empData.designation_id ? Number(empData.designation_id) : "",
//             department_id: empData.department_id ? Number(empData.department_id) : "",
//             headquarter_id: selectedHeadquarter ? selectedHeadquarter.headquarter_id : "",
//             subDivision: finalSubDivisionValue,
//             division_id: empData.division_id ? Number(empData.division_id) : "",
//             state_id: empData.state ? Number(empData.state) : "",
//             employee_hub_id: empData.employee_hub_id ? Number(empData.employee_hub_id) : "",
//             role: empData.role_id ? Number(empData.role_id) : "",
//             officeShift: officeShiftObj ? Number(officeShiftObj.office_shift_id) : "",
//             status: Number(empData.status),
//             join_date: empData.join_date ? empData.join_date.split(" ")[0] : "",
//             country_id: selectedCountry ? Number(selectedCountry.country_id) : "",
//             avatar: empData.profile_photo || "",
//             is_probation: empData.probation?.toLowerCase() === 'y' ? 'y' : 'n',
//             resumeUrl: "",
//         });
 
//         setIsEditMode(true);
//         setOpenEmployeeForm(true);
//         setShowPassword(false);
//     } catch (error) {
//         console.error("Error fetching employee details for edit:", error);
//         Swal.fire({ icon: 'error', title: 'Error', text: 'Failed to fetch complete employee details.', timer: 3000, showConfirmButton: false });
//     }
//   };
 
 
//   const handleSaveEmployee = async () => {
//     if (!isEditMode) {
//       const requiredFields = {
//         firstName: 'First Name', lastName: 'Last Name', email: 'Email', phone: 'Phone', country_id: 'Country',
//         state_id: 'State', employee_hub_id: 'holiday Hub', headquarter_id: 'Headquarter', division_id: 'Division',
//         manager_id: 'Manager', department_id: 'Department', designation_id: 'Designation', officeShift: 'Office Shift',
//         join_date: 'Join Date', avatar: 'Photo', gender: 'Gender', username: 'Username', password: 'Password',
//         role: 'Role', grossSalary: 'Gross Salary'
//       };
//       const selectedDivision = divisions.find(d => d.division_id == currentEmployee.division_id);
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
//       showCancelButton: true, confirmButtonColor: themePurple, cancelButtonColor: themeOrange,
//       confirmButtonText: 'Yes, delete it!'
//     }).then((result) => {
//       if (result.isConfirmed) {
//         axiosInstance.delete("api/edit_employee/", { data: { user_id: employeeId } })
//           .then(() => {
//             fetchEmployees();
//             Swal.fire({ icon: 'success', title: 'Deleted!', text: 'The employee has been deleted.', timer: 3000, showConfirmButton: false });
//           })
//           .catch((error) => {
//             console.error("Error deleting employee: ", error);
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
//   };
 
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
 
//   const handlePaginationChange = (event, newPage) => {
//     setCurrentPage(newPage - 1);
//   };
 
//   const handleRowsPerPageChange = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setCurrentPage(0);
//   };
 
//   const handleFileUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) setCurrentEmployee((prev) => ({ ...prev, avatar: file }));
//   };
 
//   const isSubDivisionDisabled = useMemo(() => {
//     if (!currentEmployee.division_id) return true;
//     const selectedDivision = divisions.find(d => d.division_id == currentEmployee.division_id);
//     return !selectedDivision || selectedDivision.division_name !== 'Livestock';
//   }, [currentEmployee.division_id, divisions]);
 
 
//   const formatDate = (dateString) => {
//     if (!dateString) return '';
//     try {
//       const date = new Date(dateString);
//       const day = String(date.getDate()).padStart(2, '0');
//       const month = String(date.getMonth() + 1).padStart(2, '0');
//       const year = date.getFullYear();
//       return `${day}/${month}/${year}`;
//     } catch (error) {
//       console.error("Could not format date:", dateString);
//       return dateString.split(" ")[0];
//     }
//   };
 
//   return (
//     <Box component={Paper} p={3}>
//       <Typography variant="h4" sx={{ color: themePurple, fontWeight: "bold", mb: 5 }}>
//         Employees List
//       </Typography>
 
//       <Box sx={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           flexDirection: isMobile ? "column" : "row",
//           gap: 2,
//           mb: 2
//       }}>
//           <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
//               <Button variant="contained" startIcon={<AddIcon />} onClick={handleAddEmployee} sx={purpleButtonSx}>Add Employee</Button>
//               <Button variant="contained" startIcon={<DownloadIcon />} onClick={handleExportEmployees} sx={purpleButtonSx}>Export</Button>
//               <Button variant="contained" startIcon={<ChangeManagerIcon />} onClick={() => setOpenChangeManagerForm(true)} sx={purpleButtonSx}>Change Manager</Button>
//           </Box>
//           <TextField
//               size="small"
//               placeholder="Search..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               sx={{ width: isMobile ? "100%" : "auto" }}
//               InputProps={{
//                   startAdornment: (
//                       <InputAdornment position="start">
//                           <SearchIcon />
//                       </InputAdornment>
//                   ),
//               }}
//           />
//       </Box>
 
//         <Dialog open={openChangeManagerForm} onClose={() => setOpenChangeManagerForm(false)} maxWidth="sm" fullWidth ref={changeManagerDialogRef}>
//           <DialogTitle sx={{ color: themePurple, fontWeight: 'bold' }}>
//             Change Manager
//             <IconButton onClick={() => setOpenChangeManagerForm(false)} sx={{ position: "absolute", right: 8, top: 8, color: (theme) => theme.palette.grey[500] }}><CloseIcon /></IconButton>
//           </DialogTitle>
//           <DialogContent><Grid container spacing={2} sx={{ mt: 1 }}><Grid item xs={12}><FormControl fullWidth><InputLabel>Select Employee</InputLabel><Select value={selectedEmployeeForManagerChange} onChange={(e) => setSelectedEmployeeForManagerChange(e.target.value)} label="Select Employee">{allEmployeesForDropdown.map((emp) => (<MenuItem key={emp.value} value={emp.value}>{emp.label}</MenuItem>))}</Select></FormControl></Grid><Grid item xs={12}><FormControl fullWidth><InputLabel>Select New Manager</InputLabel><Select value={newManager} onChange={(e) => setNewManager(e.target.value)} label="Select New Manager">{allEmployeesForDropdown.map((emp) => (<MenuItem key={emp.value} value={emp.value}>{emp.label}</MenuItem>))}</Select></FormControl></Grid></Grid></DialogContent>
//           <DialogActions>
//             <Button onClick={() => setOpenChangeManagerForm(false)} sx={cancelButtonSx}>Cancel</Button>
//             <Button onClick={handleChangeManager} variant="contained" sx={purpleButtonSx}>Save</Button>
//           </DialogActions>
//         </Dialog>
 
//         <Dialog open={openEmployeeForm} onClose={() => setOpenEmployeeForm(false)} maxWidth="md" fullWidth ref={employeeDialogRef}>
//             <DialogTitle sx={{ color: '#8C257C ', fontWeight: "bold", fontSize: '2rem' }}>
//             {isEditMode ? "Edit Employee" : "Add Employee"}
//             <IconButton onClick={() => setOpenEmployeeForm(false)} sx={{ position: "absolute", right: 8, top: 8, color: (theme) => theme.palette.grey[500] }}><CloseIcon /></IconButton>
//           </DialogTitle>
//           <DialogContent>
//             <Grid container spacing={2} sx={{ mt: 1 }}>
//               {!isEditMode && (<Grid item xs={12}><Autocomplete options={talentPool} getOptionLabel={(option) => option.email || ""} onChange={handleTalentSelect} onInputChange={(event, newInputValue) => { if (!talentPool.find(p => p.email === newInputValue)) { setCurrentEmployee(prev => ({ ...prev, email: newInputValue })); }}} renderInput={(params) => (<TextField {...params} label="Search Email to Auto-fill" />)} /></Grid>)}
//               <Grid item xs={12} sm={4}><TextField fullWidth label="First Name" name="firstName" value={currentEmployee.firstName || ""} onChange={handleInputChange} onKeyPress={(e) => { if (!/^[A-Za-z]$/.test(e.key)) e.preventDefault(); }} InputProps={{ readOnly: isEditMode }} /></Grid>
//               <Grid item xs={12} sm={4}><TextField fullWidth label="Middle Name" name="middleName" value={currentEmployee.middleName || ""} onChange={handleInputChange} onKeyPress={(e) => { if (!/^[A-Za-z]$/.test(e.key)) e.preventDefault(); }} InputProps={{ readOnly: isEditMode }} /></Grid>
//               <Grid item xs={12} sm={4}><TextField fullWidth label="Last Name" name="lastName" value={currentEmployee.lastName || ""} onChange={handleInputChange} onKeyPress={(e) => { if (!/^[A-Za-z]$/.test(e.key)) e.preventDefault(); }} InputProps={{ readOnly: isEditMode }} /></Grid>
//               <Grid item xs={12} sm={6}><TextField fullWidth label="Email" name="email" value={currentEmployee.email || ''} onChange={handleInputChange} InputProps={{ readOnly: isEditMode || !!talentPool.find(p => p.email === currentEmployee.email) }} /></Grid>
//               <Grid item xs={12} sm={6}><TextField fullWidth label="Phone" name="phone" value={currentEmployee.phone || ''} onChange={(e) => { const value = e.target.value; if (/^\d{0,10}$/.test(value)) handleInputChange(e); }} inputProps={{ maxLength: 10, inputMode: 'numeric', pattern: '[0-9]*' }} InputProps={{ readOnly: isEditMode }} /></Grid>
//               <Grid item xs={12} sm={6}><Autocomplete options={countries} getOptionLabel={(option) => option.country_name || ''} value={countries.find(c => c.country_id == currentEmployee.country_id) || null} onChange={(e, nv) => handleCountryChange(nv)} isOptionEqualToValue={(option, value) => option.country_id == value.country_id} renderInput={(params) => (<TextField {...params} label="Country" />)} /></Grid>
//               <Grid item xs={12} sm={6}><Autocomplete options={states} getOptionLabel={(option) => option.state_name || ''} value={states.find(s => s.state_id == currentEmployee.state_id) || null} onChange={(e, nv) => handleStateChange(nv)} isOptionEqualToValue={(option, value) => option.state_id == value.state_id} disabled={!currentEmployee.country_id} renderInput={(params) => (<TextField {...params} label="State" />)} /></Grid>
//               <Grid item xs={12} sm={6}><Autocomplete options={employeeHubs} getOptionLabel={(option) => option.employee_hub_name || ''} value={employeeHubs.find(h => h.employee_hub_id == currentEmployee.employee_hub_id) || null} onChange={(e, nv) => setCurrentEmployee(prev => ({ ...prev, employee_hub_id: nv ? nv.employee_hub_id : "" }))} isOptionEqualToValue={(option, value) => option.employee_hub_id == value.employee_hub_id} disabled={!currentEmployee.state_id} renderInput={(params) => (<TextField {...params} label="holiday Hub" />)} /></Grid>
//               <Grid item xs={12} sm={6}><Autocomplete options={headquarters} getOptionLabel={(option) => option.headquarter_name || ''} value={headquarters.find(h => h.headquarter_id == currentEmployee.headquarter_id) || null} onChange={(e, nv) => setCurrentEmployee(prev => ({ ...prev, headquarter_id: nv ? nv.headquarter_id : "" }))} isOptionEqualToValue={(option, value) => option.headquarter_id == value.headquarter_id} renderInput={(params) => (<TextField {...params} label="Headquarter" />)} /></Grid>
//               <Grid item xs={12} sm={6}><Autocomplete options={divisions} getOptionLabel={(option) => option.division_name || ''} value={divisions.find(d => d.division_id == currentEmployee.division_id) || null} onChange={(e, nv) => handleDivisionChange(nv)} isOptionEqualToValue={(option, value) => option.division_id == value.division_id} renderInput={(params) => (<TextField {...params} label="Division" />)} /></Grid>
//               <Grid item xs={12} sm={6}><Autocomplete options={subDivisionOptions} getOptionLabel={(option) => option.label || ''} value={subDivisionOptions.find(sd => sd.value === currentEmployee.subDivision) || null} onChange={(e, nv) => setCurrentEmployee(prev => ({ ...prev, subDivision: nv ? nv.value : "" }))} isOptionEqualToValue={(option, value) => option.value === value.value} disabled={isSubDivisionDisabled} renderInput={(params) => (<TextField {...params} label="Sub Division" />)} /></Grid>
//              <Grid item xs={12} sm={6}><Autocomplete options={allEmployeesForDropdown} getOptionLabel={(option) => option.label || ''} value={allEmployeesForDropdown.find(e => e.value == currentEmployee.manager_id) || null} onChange={(e, nv) => setCurrentEmployee(prev => ({ ...prev, manager_id: nv ? nv.value : "" }))} isOptionEqualToValue={(option, value) => option.value == value.value} renderInput={(params) => (<TextField {...params} label="Manager" />)} /></Grid>
//               <Grid item xs={12} sm={6}><Autocomplete options={departments} getOptionLabel={(option) => option.dept_name || ''} value={departments.find(d => d.dept_id == currentEmployee.department_id) || null} onChange={(e, nv) => handleDeptChange(nv)} isOptionEqualToValue={(option, value) => option.dept_id == value.dept_id} renderInput={(params) => (<TextField {...params} label="Department" />)} /></Grid>
//               <Grid item xs={12} sm={6}><Autocomplete options={designations} getOptionLabel={(option) => option.desig_name || ''} value={designations.find(d => d.desig_id == currentEmployee.designation_id) || null} onChange={(e, nv) => setCurrentEmployee(prev => ({ ...prev, designation_id: nv ? nv.desig_id : "" }))} isOptionEqualToValue={(option, value) => option.desig_id == value.desig_id} disabled={!currentEmployee.department_id} renderInput={(params) => (<TextField {...params} label="Designation" />)} /></Grid>
//               <Grid item xs={12} sm={6}><Autocomplete options={officeShifts} getOptionLabel={(option) => option.office_shift_name || ''} value={officeShifts.find(s => s.office_shift_id == currentEmployee.officeShift) || null} onChange={(e, nv) => setCurrentEmployee(prev => ({ ...prev, officeShift: nv ? nv.office_shift_id : "" }))} isOptionEqualToValue={(option, value) => option.office_shift_id == value.office_shift_id} renderInput={(params) => (<TextField {...params} label="Office Shift" />)} /></Grid>
//               <Grid item xs={12} sm={6}><Autocomplete options={statusOptions} getOptionLabel={(option) => option.label} value={statusOptions.find(s => s.value === currentEmployee.status) || null} onChange={(e, nv) => setCurrentEmployee(prev => ({ ...prev, status: nv ? nv.value : 1 }))} isOptionEqualToValue={(option, value) => option.value === value.value} renderInput={(params) => (<TextField {...params} label="Status" />)} /></Grid>
//               <Grid item xs={12} sm={6}><Autocomplete options={probationOptions} getOptionLabel={(option) => option.label} value={probationOptions.find(p => p.value === currentEmployee.is_probation) || null} onChange={(e, nv) => setCurrentEmployee(prev => ({ ...prev, is_probation: nv ? nv.value : "n" }))} isOptionEqualToValue={(option, value) => option.value === value.value} renderInput={(params) => (<TextField {...params} label="On Probation" />)} /></Grid>
//               <Grid item xs={12} sm={6}><TextField fullWidth label="Join Date" name="join_date" type="date" value={currentEmployee.join_date || ""} onChange={handleInputChange} InputLabelProps={{ shrink: true }} /></Grid>
//               <Grid item xs={12} sm={6}><Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}><Button variant="contained" component="label" disabled={isEditMode} sx={purpleButtonSx}>Upload Photo<input type="file" hidden accept="image/*" onChange={handleFileUpload} /></Button>{currentEmployee.avatar && <Avatar src={typeof currentEmployee.avatar === 'string' ? currentEmployee.avatar : URL.createObjectURL(currentEmployee.avatar)} sx={{ width: 56, height: 56 }} />}</Box></Grid>
//               <Grid item xs={12}>{isFetchingDocs && <CircularProgress />}{employeeDocuments && !isFetchingDocs && (<Box><Typography variant="subtitle1" gutterBottom>Fetched Documents</Typography><Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>{Object.entries(employeeDocuments).map(([name, url]) => (url ? (<Chip key={name} label={name.replace(/_/g, ' ')} component="a" href={url} target="_blank" clickable icon={<LinkIcon />} variant="outlined" color="secondary" size="small" />) : null))}</Box></Box>)}</Grid>
//               {!isEditMode && (<>
//                 <Grid item xs={12} sm={6}><Autocomplete options={genderOptions} getOptionLabel={(option) => option.label} value={genderOptions.find(g => g.value === currentEmployee.gender) || null} onChange={(e, nv) => setCurrentEmployee(prev => ({ ...prev, gender: nv ? nv.value : "" }))} isOptionEqualToValue={(option, value) => option.value === value.value} renderInput={(params) => (<TextField {...params} label="Gender" />)} /></Grid>
//                 <Grid item xs={12} sm={6}><TextField fullWidth label="Username" name="username" value={currentEmployee.username || ""} onChange={handleInputChange} InputProps={{ readOnly: true }} /></Grid>
//                 <Grid item xs={12} sm={6}><TextField fullWidth label="Password" name="password" value={currentEmployee.password || ""} onChange={handleInputChange} type={showPassword ? 'text' : 'password'} InputProps={{ endAdornment: (<InputAdornment position="end"> <IconButton aria-label="toggle password visibility" onClick={() => setShowPassword((prev) => !prev)} onMouseDown={(e) => e.preventDefault()} edge="end"> {showPassword ? <VisibilityOff /> : <Visibility />} </IconButton> </InputAdornment>) }} /></Grid>
//                 <Grid item xs={12} sm={6}><Autocomplete options={roles} getOptionLabel={(option) => option.role_name || ''} value={roles.find(r => r.index == currentEmployee.role) || null} onChange={(e, nv) => setCurrentEmployee(prev => ({ ...prev, role: nv ? nv.index : "" }))} isOptionEqualToValue={(option, value) => option.index == value.index} renderInput={(params) => (<TextField {...params} label="Role" />)} /></Grid>
//                 <Grid item xs={12} sm={6}><TextField fullWidth label="Gross Salary" name="grossSalary" type="number" value={currentEmployee.grossSalary || ""} onChange={(e) => { const value = e.target.value; if (/^\d*\.?\d*$/.test(value)) handleInputChange(e); }} /></Grid>
//               </>)}
//             </Grid>
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={() => setOpenEmployeeForm(false)} disabled={isSaving} sx={cancelButtonSx}>Cancel</Button>
//             <Button onClick={handleSaveEmployee} variant="contained" disabled={isSaving} sx={purpleButtonSx}>{isSaving ? <CircularProgress size={24} color="inherit" /> : "Save"}</Button>
//           </DialogActions>
//         </Dialog>
        
//         <TableContainer>
//             <Table sx={{ minWidth: "100%", whiteSpace: "nowrap" }}>
//               <TableHead>
//                 <TableRow sx={{ bgcolor: themePurple }}>
//                   <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>SR. NO.</TableCell>
//                   <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>EMPLOYEE</TableCell>
//                   <TableCell sx={{ color: 'white' }}></TableCell>
//                   <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>DEPARTMENT</TableCell>
//                   <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>DESIGNATION</TableCell>
//                   <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>JOIN DATE</TableCell>
//                   <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>STATUS</TableCell>
//                   <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>MANAGER</TableCell>
//                   <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', color: 'white' }}>ACTIONS</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {loading ? (
//                     Array.from(new Array(rowsPerPage)).map((_, index) => (
//                         <TableRow key={index}>
//                             <TableCell><Skeleton variant="text" /></TableCell>
//                             <TableCell><Skeleton variant="text" /></TableCell>
//                             <TableCell><Skeleton variant="text" /></TableCell>
//                             <TableCell><Skeleton variant="text" /></TableCell>
//                             <TableCell><Skeleton variant="text" /></TableCell>
//                             <TableCell><Skeleton variant="text" /></TableCell>
//                             <TableCell><Skeleton variant="text" /></TableCell>
//                             <TableCell><Skeleton variant="text" /></TableCell>
//                             <TableCell align="center"><Skeleton variant="rectangular" width={80} height={30} /></TableCell>
//                         </TableRow>
//                     ))
//                 ) : (
//                     (rowsPerPage > 0
//                         ? filteredEmployees.slice(currentPage * rowsPerPage, currentPage * rowsPerPage + rowsPerPage)
//                         : filteredEmployees
//                     ).map((employee, index) => (
//                         <TableRow key={employee.user_id} sx={{ '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' } }} onMouseEnter={() => setHoveredRowId(employee.user_id)} onMouseLeave={() => setHoveredRowId(null)}>
//                             <TableCell sx={{ fontSize: '0.95rem' }}>{currentPage * rowsPerPage + index + 1}</TableCell>
//                             <TableCell sx={{ fontSize: '0.95rem' }}>{employee.employee_name}</TableCell>
//                             <TableCell sx={{ padding: '0 8px', textAlign: 'center' }}>
//                                {hoveredRowId === employee.user_id && <IconButton onClick={() => handleArrowClick(employee.user_id)} size="small" sx={{ color: themeOrange }}><ArrowForwardIcon fontSize="small" /></IconButton>}
//                             </TableCell>
//                             <TableCell sx={{ fontSize: '0.95rem' }}>{employee.department_name || 'N/A'}</TableCell>
//                             <TableCell sx={{ fontSize: '0.95rem' }}>{employee.designation_name || 'N/A'}</TableCell>
//                             <TableCell sx={{ fontSize: '0.95rem' }}>{formatDate(employee.join_date)}</TableCell>
//                             <TableCell sx={{ fontSize: '0.95rem' }}>
//                                 <Chip label={employee.status === 1 ? "Active" : "Inactive"} size="small" sx={{ 
//                                     bgcolor: employee.status === 1 ? '#4caf50' : themeOrange, 
//                                     color: 'white',
//                                     borderRadius: '16px',
//                                     height: '24px',
//                                 }} />
//                             </TableCell>
//                             <TableCell sx={{ fontSize: '0.95rem' }}>{employee.manager}</TableCell>
//                             <TableCell>
//                                 <Box display="flex" justifyContent="center" gap={0.5}>
//                                     <Tooltip title="Edit"><IconButton onClick={() => handleEditEmployee(employee)} sx={{ color: themePurple }}><EditIcon /></IconButton></Tooltip>
//                                     <Tooltip title="Delete"><IconButton onClick={() => handleDeleteEmployee(employee.user_id)} sx={{ color: themeOrange }}><DeleteIcon /></IconButton></Tooltip>
//                                 </Box>
//                             </TableCell>
//                         </TableRow>
//                     ))
//                 )}
//               </TableBody>
//             </Table>
//         </TableContainer>
 
//         <Box sx={{ p: 2, borderTop: '1px solid rgba(224, 224, 224, 1)' }}>
//             {loading ? (
//                 <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                     <Skeleton variant="text" width={150} />
//                     <Skeleton variant="rectangular" width={400} height={40} />
//                 </Box>
//             ) : (
//                 <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
//                     <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//                         <FormControl variant="outlined" size="small">
//                             <Select
//                                 value={rowsPerPage}
//                                 onChange={handleRowsPerPageChange}
//                                 sx={{
//                                     backgroundColor: themePurple,
//                                     color: 'white',
//                                     borderRadius: '4px',
//                                     transition: 'background-color 0.3s',
//                                     '&:hover': {
//                                         backgroundColor: themePurpleHover,
//                                     },
//                                     '& .MuiOutlinedInput-notchedOutline': {
//                                         border: 'none',
//                                     },
//                                     '& .MuiSvgIcon-root': {
//                                         color: 'white',
//                                     },
//                                 }}
//                             >
//                                 {[10, 25, 50, 100].map((value) => (
//                                     <MenuItem key={value} value={value}>{value}</MenuItem>
//                                 ))}
//                             </Select>
//                         </FormControl>
//                         <Typography variant="body2" color="text.secondary">
//                            {`1 to ${Math.min(rowsPerPage, filteredEmployees.length)} of ${filteredEmployees.length}`}
//                         </Typography>
//                     </Box>
 
//                     <Pagination
//                         count={Math.ceil(filteredEmployees.length / rowsPerPage)}
//                         page={currentPage + 1}
//                         onChange={handlePaginationChange}
//                         showFirstButton
//                         showLastButton
//                         sx={{
//                             '& .MuiPaginationItem-root': {
//                                 borderRadius: '4px',
//                                 transition: 'background-color 0.3s, color 0.3s',
//                                 '&:hover': {
//                                     backgroundColor: themeOrange,
//                                     color: 'white',
//                                 }
//                             },
//                             '& .MuiPaginationItem-page':{
//                                 color: themePurple,
//                                 '&.Mui-selected': {
//                                     backgroundColor: themePurple,
//                                     color: 'white',
//                                     '&:hover': {
//                                         backgroundColor: themeOrange,
//                                     }
//                                 },
//                             },
//                              '& .MuiPaginationItem-icon': {
//                                 color: themePurple,
//                             }
//                         }}
//                     />
//                 </Box>
//             )}
//         </Box>
//     </Box>
//   );
// }






// import React, { useState, useEffect, useMemo, useCallback, useRef } from "react";
// import axios from 'axios';
// import {
// Box,
// Typography,
// Button,
// Paper,
// Table,
// TableBody,
// TableCell,
// TableContainer,
// TableHead,
// TableRow,
// TextField,
// FormControl,
// InputLabel,
// Select,
// MenuItem,
// Avatar,
// Chip,
// IconButton,
// Tooltip,
// Dialog,
// DialogTitle,
// DialogContent,
// DialogActions,
// Grid,
// CircularProgress,
// Autocomplete,
// InputAdornment,
// useTheme,
// useMediaQuery,
// Skeleton,
// Pagination,
// } from "@mui/material";
// import {
// Edit as EditIcon,
// Delete as DeleteIcon,
// Add as AddIcon,
// Close as CloseIcon,
// Download as DownloadIcon,
// ArrowForward as ArrowForwardIcon,
// SupervisorAccount as ChangeManagerIcon,
// Link as LinkIcon,
// Visibility,
// VisibilityOff,
// Search as SearchIcon,
// } from "@mui/icons-material";
// import * as XLSX from "xlsx";
// import { useNavigate } from "react-router-dom";
// import axiosInstance from "../../utils/axiosInstance";
// import Swal from 'sweetalert2';

// const RESUME_BASE_URL = "https://raasbackend.vetrinahealthcare.com/";
// const statusOptions = [{ value: 1, label: 'Active' }, { value: 0, label: 'Inactive' }];
// const probationOptions = [{ value: 'y', label: 'Yes' }, { value: 'n', label: 'No' }];
// const genderOptions = [{ value: 'Male', label: 'Male' }, { value: 'Female', 'label': 'Female' }, { value: 'Other', label: 'Other' }];
// const subDivisionOptions = [{ value: 'VetBiz', label: 'VetBiz' }, { value: 'TredBiz', label: 'TredBiz' }, { value: ' ', label: 'TredBiz Mix' }];

// export default function EmployeesView() {
// const employeeDialogRef = useRef(null);
// const changeManagerDialogRef = useRef(null);
// const muiTheme = useTheme();
// const isMobile = useMediaQuery(muiTheme.breakpoints.down("sm"));
// const themePurple = '#8C257C';
// const themePurpleHover = '#6d1d60';
// const themeOrange = '#F58E35';

// const purpleButtonSx = {
// backgroundColor: themePurple,
// color: 'white',
// '&:hover': {
// backgroundColor: themePurpleHover,
// },
// };
// const cancelButtonSx = {
// color: '#757575',
// '&:hover': {
// backgroundColor: 'rgba(0, 0, 0, 0.04)'
// }
// };

// const [loading, setLoading] = useState(true);
// const [departments, setDepartments] = useState([]);
// const [designations, setDesignations] = useState([]);
// const [searchTerm, setSearchTerm] = useState("");
// const [openChangeManagerForm, setOpenChangeManagerForm] = useState(false);
// const [currentPage, setCurrentPage] = useState(0);
// const [rowsPerPage, setRowsPerPage] = useState(10);
// const [newManager, setNewManager] = useState("");
// const [selectedEmployeeForManagerChange, setSelectedEmployeeForManagerChange] = useState("");
// const [employees, setEmployees] = useState([]);
// const [hoveredRowId, setHoveredRowId] = useState(null);
// const [officeShifts, setOfficeShifts] = useState([]);
// const [isEditMode, setIsEditMode] = useState(false);
// const [roles, setRoles] = useState([]);
// const [countries, setCountries] = useState([]);
// const [states, setStates] = useState([]);
// const [employeeHubs, setEmployeeHubs] = useState([]);
// const [headquarters, setHeadquarters] = useState([]);
// const [divisions, setDivisions] = useState([]);
// const [allEmployeesForDropdown, setAllEmployeesForDropdown] = useState([]);
// const [talentPool, setTalentPool] = useState([]);
// const [isFetchingDocs, setIsFetchingDocs] = useState(false);
// const [employeeDocuments, setEmployeeDocuments] = useState(null);
// const [showPassword, setShowPassword] = useState(false);
// const [isSaving, setIsSaving] = useState(false);

// const [currentEmployee, setCurrentEmployee] = useState({
// id: null, firstName: "", middleName: "", lastName: "", email: "", join_date: "",
// status: 1, phone: "", avatar: null, country_id: "", state_id: "", employee_hub_id: "",
// headquarter_id: "", division_id: "", subDivision: "", role: "", is_probation: "n",
// resumeUrl: "", password: "", gender: "", username: "", grossSalary: "", department_id: "",
// designation_id: "", manager_id: "", officeShift: "",
// });

// const [openEmployeeForm, setOpenEmployeeForm] = useState(false);

// useEffect(() => {
// const fetchData = async () => {
// try {
// const [ depts, empDropdown, shifts, countriesRes, hubs, divs, rolesRes, talent,headquartersRes ] = await Promise.all([
// axiosInstance.get('api/desig_dept_dropdown/'),
// axiosInstance.get('employee-dropdown/'),
// axiosInstance.get('api/office_shift_dropdown/'),
// axiosInstance.get('api/countries/'),
// axiosInstance.get('api/employee_hub/'),
// axiosInstance.get('api/division/'),
// axiosInstance.get('api/role_list/'),
// axiosInstance.get('api/search_by_email_vet_talent/'),
// axios.get("https://tdtlworld.com/hrms-backend/api/headquarters/")
// ]);
// setDepartments(depts.data.dept_data || []);
// setAllEmployeesForDropdown(empDropdown.data || []);
// setOfficeShifts(shifts.data.office_shift_data || []);
// if (countriesRes.data.status === 'success') setCountries(countriesRes.data.data || []);
// setDivisions(divs.data || []);
// if (rolesRes.data?.status === "success") setRoles(rolesRes.data.data);
// setHeadquarters(headquartersRes.data || []);
// setTalentPool(talent.data.data || []);
// } catch (error) {
// console.error("Error fetching initial data:", error);
// Swal.fire({ icon: 'error', title: 'Error', text: 'Failed to fetch initial data.', timer: 3000, showConfirmButton: false });
// }
// };
// fetchData();
// }, []);

// const fetchEmployees = useCallback(() => {
// setLoading(true);
// axiosInstance.get('api/employee_details/')
// .then((response) => setEmployees(Array.isArray(response.data.data) ? response.data.data : []))
// .catch((error) => {
// console.error('Error fetching employees:', error);
// setEmployees([]);
// Swal.fire({ icon: 'error', title: 'Error', text: 'Failed to fetch employee list.', timer: 3000, showConfirmButton: false });
// })
// .finally(() => setLoading(false));
// }, []);

// useEffect(() => { fetchEmployees(); }, [fetchEmployees]);

// const handleCountryChange = (selectedCountry) => {
// const countryId = selectedCountry ? selectedCountry.country_id : "";
// const countryName = selectedCountry ? selectedCountry.country_name : null;
// setCurrentEmployee(prev => ({ ...prev, country_id: countryId, state_id: "", employee_hub_id: "" }));
// setStates([]);
// setEmployeeHubs([]);
// if (countryName) {
//   axiosInstance.get(`api/states/?country_name=${countryName}`)
//     .then(res => { if (res.data.status === "success") setStates(res.data.data || []); })
//     .catch(err => {
//       console.error("Error fetching states:", err);
//       Swal.fire({ icon: 'error', title: 'Error', text: 'Failed to fetch states.', target: employeeDialogRef.current, timer: 3000, showConfirmButton: false });
//     });
// }
// };

// const handleStateChange = (selectedState) => {
// const stateId = selectedState ? selectedState.state_id : "";
// setCurrentEmployee(prev => ({ ...prev, state_id: stateId, employee_hub_id: "" }));
// setEmployeeHubs([]);
// if (stateId) {
// axiosInstance.get(`api/employee_hub_dropdown/${stateId}/`)
// .then(res => { if (res.data.status === "success") setEmployeeHubs(res.data.data || []); })
// .catch(err => {
// console.error("Error fetching employee hubs:", err);
// Swal.fire({ icon: 'error', title: 'Error', text: 'Failed to fetch holiday hubs.', target: employeeDialogRef.current, timer: 3000, showConfirmButton: false });
// });
// }
// };

// const handleDeptChange = (selectedDept) => {
// const deptId = selectedDept ? selectedDept.dept_id : "";
// setCurrentEmployee((prev) => ({ ...prev, department_id: deptId, designation_id: "" }));
// if (deptId) {
// axiosInstance.get(`api/desig_dept_dropdown/?dept_id=${deptId}/`)
// .then((res) => setDesignations(res.data.desig_data || []))
// .catch((err) => {
// console.error("Error fetching designations:", err);
// Swal.fire({ icon: 'error', title: 'Error', text: 'Failed to load designations.', target: employeeDialogRef.current, timer: 3000, showConfirmButton: false });
// });
// } else {
// setDesignations([]);
// }
// };

// const handleDivisionChange = (selectedDivision) => {
// const divisionId = selectedDivision ? selectedDivision.division_id : "";
// if (selectedDivision && selectedDivision.division_name !== 'Livestock') {
// setCurrentEmployee(prev => ({ ...prev, division_id: divisionId, subDivision: "" }));
// } else {
// setCurrentEmployee(prev => ({ ...prev, division_id: divisionId }));
// }
// };

// const handleChangeManager = async () => {
// if (!selectedEmployeeForManagerChange || !newManager) {
// Swal.fire({ icon: 'warning', title: 'Incomplete Selection', text: 'Please select an employee and a new manager.', target: changeManagerDialogRef.current });
// return;
// }
// try {
// await axiosInstance.put("api/change_manager/", { user_id: selectedEmployeeForManagerChange, manager_id: newManager });
// await fetchEmployees();
// Swal.fire({ icon: 'success', title: 'Success', text: 'Manager changed successfully!', timer: 3000, showConfirmButton: false });
// setOpenChangeManagerForm(false);
// setSelectedEmployeeForManagerChange("");
// setNewManager("");
// } catch (error) {
// console.error("Error changing manager:", error);
// Swal.fire({ icon: 'error', title: 'Operation Failed', text: `Error changing manager: ${error.response?.data?.message || "An error occurred."}`, target: changeManagerDialogRef.current });
// }
// };

// const navigate = useNavigate();
// const handleArrowClick = (id) => navigate(`/hrms/admindashboard/employeedetail/${id}`);

// const handleInputChange = (event) => {
// const { name, value } = event.target;
// setCurrentEmployee((prev) => ({ ...prev, [name]: value }));
// };

// const handleAddEmployee = async () => {
// try {
// const maxIdResponse = await axios.get("https://tdtlworld.com/hrms-backend/api/get_max_employee_id/");
// const newEmpId = maxIdResponse.data.employee_id;
// setCurrentEmployee({
// emp_id: newEmpId, firstName: "", middleName: "", lastName: "", email: "", phone: "",
// avatar: null, officeShift: "", status: 1, join_date: "", gender: "", username: newEmpId, password: "",
// role: "", grossSalary: "", department_id: "", designation_id: "", manager_id: "",
// country_id: "", state_id: "", employee_hub_id: "", headquarter_id: "", division_id: "",
// company_id: 2, is_probation: "n", resumeUrl: "", subDivision: "",
// });
// setDesignations([]); setStates([]); setEmployeeHubs([]); setEmployeeDocuments(null);
// setIsEditMode(false); setShowPassword(false); setOpenEmployeeForm(true);
// } catch (error) {
// console.error("Error fetching max employee ID:", error);
// Swal.fire({ icon: 'error', title: 'Error', text: 'Failed to initialize employee form.', timer: 3000, showConfirmButton: false });
// }
// };

// const handleTalentSelect = async (event, selectedOption) => {
// setEmployeeDocuments(null);
// setCurrentEmployee(prev => ({ ...prev, resumeUrl: "" }));
// if (!selectedOption) {
//   setCurrentEmployee(prev => ({ ...prev, firstName: "", middleName: "", lastName: "", email: "", phone: "", gender: "", country_id: "", state_id: "" }));
//   return;
// }
// const talent = talentPool.find(p => p.email === selectedOption.email);
// if (!talent) return;

// const selectedCountry = countries.find(c => c.country_name === talent.country);
// const resumeLink = talent.resume ? `${RESUME_BASE_URL}${talent.resume}` : "";

// setCurrentEmployee(prev => ({
//   ...prev, firstName: talent.first_name || "", middleName: talent.middle_name || "",
//   lastName: talent.last_name || "", email: talent.email || "", phone: talent.phone || "",
//   gender: talent.gender || "", country_id: selectedCountry ? selectedCountry.country_id : "",
//   state_id: '', employee_hub_id: '', resumeUrl: resumeLink,
// }));

// if (selectedCountry) {
//   try {
//     const statesRes = await axiosInstance.get(`api/states/?country_name=${selectedCountry.country_name}`);
//     if (statesRes.data.status === "success") {
//       const fetchedStates = statesRes.data.data || [];
//       setStates(fetchedStates);
//       const selectedState = fetchedStates.find(s => s.state_name === talent.state);
//       if (selectedState) {
//         setCurrentEmployee(prev => ({ ...prev, state_id: selectedState.state_id }));
//         const hubsRes = await axiosInstance.get(`api/employee_hub_dropdown/${selectedState.state_id}/`);
//         if (hubsRes.data.status === "success") setEmployeeHubs(hubsRes.data.data || []);
//       }
//     }
//   } catch (err) { console.error("Error fetching dependent data for talent:", err); }
// }

// setIsFetchingDocs(true);
// try {
//   const docResponse = await axios.post('https://raasbackend.vetrinahealthcare.com/fetch_documents/', { email_id: talent.email });
//   setEmployeeDocuments(docResponse.data.status === 'success' && docResponse.data.documents ? docResponse.data.documents : null);
// } catch (error) {
//   console.error("Error fetching documents:", error);
//   setEmployeeDocuments(null);
// } finally {
//   setIsFetchingDocs(false);
// }
// };

// const handleEditEmployee = async (employee) => {
// if (!employee || !employee.user_id) return;
// try {
// const response = await axiosInstance.get(`api/edit_employee/${employee.user_id}/`);
// if (response.data.status !== "success" || response.data.data.length === 0) {
// Swal.fire({ icon: 'error', title: 'Error', text: 'Failed to load employee details.', timer: 3000, showConfirmButton: false });
// return;
// }
// const empData = response.data.data[0];
//     const [desigRes, statesRes, hubsRes] = await Promise.all([
//         axiosInstance.get(`api/desig_dept_dropdown/?dept_id=${empData.department_id}/`),
//         empData.country_name ? axiosInstance.get(`api/states/?country_name=${empData.country_name}`) : Promise.resolve({ data: { data: [] } }),
//         empData.state ? axiosInstance.get(`api/employee_hub_dropdown/${empData.state}/`) : Promise.resolve({ data: { data: [] } })
//     ]);

//     setDesignations(desigRes.data.desig_data || []);
//     setStates(statesRes.data.data || []);
//     setEmployeeHubs(hubsRes.data.data || []);
    
//     const officeShiftObj = officeShifts.find(s => s.office_shift_name === empData.office_shift);
//     const nameParts = (empData.emp_name || "").split(" ");
//     const selectedCountry = countries.find(c => c.country_name === empData.country_name);
//     const selectedHeadquarter = headquarters.find(hq => hq.headquarter_name === empData.headquarter);

//     let finalSubDivisionValue = empData.sub_division || "";
//     if (finalSubDivisionValue === "Tred") {
//         finalSubDivisionValue = "TredBiz";
//     }

//     setCurrentEmployee({
//         id: employee.user_id,
//         firstName: nameParts[0] || "",
//         middleName: nameParts.length > 2 ? nameParts.slice(1, -1).join(" ") : "",
//         lastName: nameParts.length > 1 ? nameParts[nameParts.length - 1] : "",
//         email: empData.email || "", phone: empData.phone || "",
//         manager_id: empData.manager_id ? Number(empData.manager_id) : "",
//         designation_id: empData.designation_id ? Number(empData.designation_id) : "",
//         department_id: empData.department_id ? Number(empData.department_id) : "",
//         headquarter_id: selectedHeadquarter ? selectedHeadquarter.headquarter_id : "",
//         subDivision: finalSubDivisionValue,
//         division_id: empData.division_id ? Number(empData.division_id) : "",
//         state_id: empData.state ? Number(empData.state) : "",
//         employee_hub_id: empData.employee_hub_id ? Number(empData.employee_hub_id) : "",
//         role: empData.role_id ? Number(empData.role_id) : "",
//         officeShift: officeShiftObj ? Number(officeShiftObj.office_shift_id) : "",
//         status: Number(empData.status),
//         join_date: empData.join_date ? empData.join_date.split(" ")[0] : "",
//         country_id: selectedCountry ? Number(selectedCountry.country_id) : "",
//         avatar: empData.profile_photo || "",
//         is_probation: empData.probation?.toLowerCase() === 'y' ? 'y' : 'n',
//         resumeUrl: "",
//     });

//     setIsEditMode(true);
//     setOpenEmployeeForm(true);
//     setShowPassword(false);
// } catch (error) {
//     console.error("Error fetching employee details for edit:", error);
//     Swal.fire({ icon: 'error', title: 'Error', text: 'Failed to fetch complete employee details.', timer: 3000, showConfirmButton: false });
// }
// };

// const handleSaveEmployee = async () => {
// if (!isEditMode) {
// const requiredFields = {
// firstName: 'First Name', lastName: 'Last Name', email: 'Email', phone: 'Phone', country_id: 'Country',
// state_id: 'State', employee_hub_id: 'holiday Hub', headquarter_id: 'Headquarter', division_id: 'Division',
// manager_id: 'Manager', department_id: 'Department', designation_id: 'Designation', officeShift: 'Office Shift',
// join_date: 'Join Date', avatar: 'Photo', gender: 'Gender', username: 'Username', password: 'Password',
// role: 'Role', grossSalary: 'Gross Salary'
// };
// const selectedDivision = divisions.find(d => d.division_id == currentEmployee.division_id);
// if (selectedDivision && selectedDivision.division_name === 'Livestock' && !currentEmployee.subDivision) {
// Swal.fire({ icon: 'error', title: 'Validation Error', text: 'Sub Division is required when Division is Livestock.', target: employeeDialogRef.current });
// return;
// }
// for (const field in requiredFields) {
// if (!currentEmployee[field]) {
// Swal.fire({ icon: 'error', title: 'Validation Error', text: `The field "${requiredFields[field]}" is required.`, target: employeeDialogRef.current });
// return;
// }
// }
// }
// const formData = new FormData();
// const keyMap = { firstName: 'first_name', middleName: 'middle_name', lastName: 'last_name', officeShift: 'office_shift', join_date: 'join_date', grossSalary: 'gross_salary', headquarter_id: 'headquarter_id', };
// Object.keys(currentEmployee).forEach(key => {
//   if (key === 'avatar' && currentEmployee.avatar instanceof File) {
//     formData.append("file", currentEmployee.avatar);
//   } else if (key !== 'resumeUrl' && currentEmployee[key] !== null && currentEmployee[key] !== undefined && currentEmployee[key] !== "") {
//     const backendKey = keyMap[key] || key;
//     formData.append(backendKey, currentEmployee[key]);
//   }
// });

// setIsSaving(true);
// try {
//   const action = isEditMode ? 'updated' : 'added';
//   if (isEditMode) {
//     formData.append("user_id", currentEmployee.id);
//     await axiosInstance.put("api/edit_employee/", formData, { headers: { "Content-Type": "multipart/form-data" } });
//   } else {
//     await axiosInstance.post("api/add_employee/", formData, { headers: { "Content-Type": "multipart/form-data" } });
//   }
//   setOpenEmployeeForm(false);
//   await fetchEmployees();
//   Swal.fire({ icon: 'success', title: 'Success', text: `Employee ${action} successfully!`, timer: 3000, showConfirmButton: false });

// } catch (error) {
//   console.error("Error saving employee:", error);
//   const errorMessage = error.response?.data?.message || error.response?.data?.detail || "An unexpected error occurred.";
//   Swal.fire({ icon: 'error', title: `Operation failed`, text: `${errorMessage}`, target: employeeDialogRef.current });
// } finally {
//   setIsSaving(false);
// }
// };

// const handleDeleteEmployee = (employeeId) => {
// if (!employeeId) return;
// Swal.fire({
// title: 'Are you sure?', text: "You won't be able to revert this!", icon: 'warning',
// showCancelButton: true, confirmButtonColor: themePurple, cancelButtonColor: themeOrange,
// confirmButtonText: 'Yes, delete it!'
// }).then((result) => {
// if (result.isConfirmed) {
// axiosInstance.delete("api/edit_employee/", { data: { user_id: employeeId } })
// .then(() => {
// fetchEmployees();
// Swal.fire({ icon: 'success', title: 'Deleted!', text: 'The employee has been deleted.', timer: 3000, showConfirmButton: false });
// })
// .catch((error) => {
// console.error("Error deleting employee: ", error);
// const errorMessage = error.response?.data?.message || error.response?.data?.detail || "Failed to delete employee.";
// Swal.fire({ icon: 'error', title: 'Error', text: errorMessage, timer: 3000, showConfirmButton: false });
// });
// }
// });
// };

// const handleExportEmployees = () => {
// if (employees.length === 0) {
// Swal.fire({ icon: 'info', title: 'Info', text: 'There is no employee data to export.', timer: 3000, showConfirmButton: false });
// return;
// }
// const worksheet = XLSX.utils.json_to_sheet(employees);
// const workbook = XLSX.utils.book_new();
// XLSX.utils.book_append_sheet(workbook, worksheet, "Employees");
// XLSX.writeFile(workbook, "EmployeesData.xlsx");
// };

// const sortedEmployees = useMemo(() => {
// if (!Array.isArray(employees)) return [];
// return [...employees].sort((a, b) => b.user_id - a.user_id);
// }, [employees]);

// const filteredEmployees = useMemo(() => sortedEmployees.filter(
// (e) =>
// (e.employee_name && e.employee_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
// (e.department_name && e.department_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
// (e.designation_name && e.designation_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
// (e.join_date && e.join_date.toLowerCase().includes(searchTerm.toLowerCase())) ||
// (e.manager && e.manager.toLowerCase().includes(searchTerm.toLowerCase()))
// ), [sortedEmployees, searchTerm]);

// const handlePaginationChange = (event, newPage) => {
// setCurrentPage(newPage - 1);
// };

// const handleRowsPerPageChange = (event) => {
// setRowsPerPage(parseInt(event.target.value, 10));
// setCurrentPage(0);
// };

// const handleFileUpload = (e) => {
// const file = e.target.files[0];
// if (file) setCurrentEmployee((prev) => ({ ...prev, avatar: file }));
// };

// const isSubDivisionDisabled = useMemo(() => {
// if (!currentEmployee.division_id) return true;
// const selectedDivision = divisions.find(d => d.division_id == currentEmployee.division_id);
// return !selectedDivision || selectedDivision.division_name !== 'Livestock';
// }, [currentEmployee.division_id, divisions]);

// const formatDate = (dateString) => {
// if (!dateString) return '';
// try {
// const date = new Date(dateString);
// const day = String(date.getDate()).padStart(2, '0');
// const month = String(date.getMonth() + 1).padStart(2, '0');
// const year = date.getFullYear();
// return `${day}/${month}/${year}`;
// } catch (error) {
// console.error("Could not format date:", dateString);
// return dateString.split(" ")[0];
// }
// };

// return (
// <Box component={Paper} p={3}>
// <Typography variant="h4" sx={{ color: themePurple, fontWeight: "bold", mb: 5 }}>
// Employees List
// </Typography>
//   <Box sx={{
//       display: "flex",
//       justifyContent: "space-between",
//       alignItems: "center",
//       flexDirection: isMobile ? "column" : "row",
//       gap: 2,
//       mb: 2
//   }}>
//       <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
//           <Button variant="contained" startIcon={<AddIcon />} onClick={handleAddEmployee} sx={purpleButtonSx}>Add Employee</Button>
//           <Button variant="contained" startIcon={<DownloadIcon />} onClick={handleExportEmployees} sx={purpleButtonSx}>Export</Button>
//           <Button variant="contained" startIcon={<ChangeManagerIcon />} onClick={() => setOpenChangeManagerForm(true)} sx={purpleButtonSx}>Change Manager</Button>
//       </Box>
//       <TextField
//           size="small"
//           placeholder="Search..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           sx={{ width: isMobile ? "100%" : "auto" }}
//           InputProps={{
//               startAdornment: (
//                   <InputAdornment position="start">
//                       <SearchIcon />
//                   </InputAdornment>
//               ),
//           }}
//       />
//   </Box>

//     <Dialog open={openChangeManagerForm} onClose={() => setOpenChangeManagerForm(false)} maxWidth="sm" fullWidth ref={changeManagerDialogRef}>
//       <DialogTitle sx={{ color: themePurple, fontWeight: 'bold' }}>
//         Change Manager
//         <IconButton onClick={() => setOpenChangeManagerForm(false)} sx={{ position: "absolute", right: 8, top: 8, color: (theme) => theme.palette.grey[500] }}><CloseIcon /></IconButton>
//       </DialogTitle>
//       <DialogContent><Grid container spacing={2} sx={{ mt: 1 }}><Grid item xs={12}><FormControl fullWidth><InputLabel>Select Employee</InputLabel><Select value={selectedEmployeeForManagerChange} onChange={(e) => setSelectedEmployeeForManagerChange(e.target.value)} label="Select Employee">{allEmployeesForDropdown.map((emp) => (<MenuItem key={emp.value} value={emp.value}>{`${emp.label} (${emp.emp_id})`}</MenuItem>))}</Select></FormControl></Grid><Grid item xs={12}><FormControl fullWidth><InputLabel>Select New Manager</InputLabel><Select value={newManager} onChange={(e) => setNewManager(e.target.value)} label="Select New Manager">{allEmployeesForDropdown.map((emp) => (<MenuItem key={emp.value} value={emp.value}>{`${emp.label} (${emp.emp_id})`}</MenuItem>))}</Select></FormControl></Grid></Grid></DialogContent>
//       <DialogActions>
//         <Button onClick={() => setOpenChangeManagerForm(false)} sx={cancelButtonSx}>Cancel</Button>
//         <Button onClick={handleChangeManager} variant="contained" sx={purpleButtonSx}>Save</Button>
//       </DialogActions>
//     </Dialog>

//     <Dialog open={openEmployeeForm} onClose={() => setOpenEmployeeForm(false)} maxWidth="md" fullWidth ref={employeeDialogRef}>
//         <DialogTitle sx={{ color: '#8C257C ', fontWeight: "bold", fontSize: '2rem' }}>
//         {isEditMode ? "Edit Employee" : "Add Employee"}
//         <IconButton onClick={() => setOpenEmployeeForm(false)} sx={{ position: "absolute", right: 8, top: 8, color: (theme) => theme.palette.grey[500] }}><CloseIcon /></IconButton>
//       </DialogTitle>
//       <DialogContent>
//         <Grid container spacing={2} sx={{ mt: 1 }}>
//           {!isEditMode && (<Grid item xs={12}><Autocomplete options={talentPool} getOptionLabel={(option) => option.email || ""} onChange={handleTalentSelect} onInputChange={(event, newInputValue) => { if (!talentPool.find(p => p.email === newInputValue)) { setCurrentEmployee(prev => ({ ...prev, email: newInputValue })); }}} renderInput={(params) => (<TextField {...params} label="Search Email to Auto-fill" />)} /></Grid>)}
//           <Grid item xs={12} sm={4}><TextField fullWidth label="First Name" name="firstName" value={currentEmployee.firstName || ""} onChange={handleInputChange} onKeyPress={(e) => { if (!/^[A-Za-z]$/.test(e.key)) e.preventDefault(); }} InputProps={{ readOnly: isEditMode }} /></Grid>
//           <Grid item xs={12} sm={4}><TextField fullWidth label="Middle Name" name="middleName" value={currentEmployee.middleName || ""} onChange={handleInputChange} onKeyPress={(e) => { if (!/^[A-Za-z]$/.test(e.key)) e.preventDefault(); }} InputProps={{ readOnly: isEditMode }} /></Grid>
//           <Grid item xs={12} sm={4}><TextField fullWidth label="Last Name" name="lastName" value={currentEmployee.lastName || ""} onChange={handleInputChange} onKeyPress={(e) => { if (!/^[A-Za-z]$/.test(e.key)) e.preventDefault(); }} InputProps={{ readOnly: isEditMode }} /></Grid>
//           <Grid item xs={12} sm={6}><TextField fullWidth label="Email" name="email" value={currentEmployee.email || ''} onChange={handleInputChange} InputProps={{ readOnly: isEditMode || !!talentPool.find(p => p.email === currentEmployee.email) }} /></Grid>
//           <Grid item xs={12} sm={6}><TextField fullWidth label="Phone" name="phone" value={currentEmployee.phone || ''} onChange={(e) => { const value = e.target.value; if (/^\d{0,10}$/.test(value)) handleInputChange(e); }} inputProps={{ maxLength: 10, inputMode: 'numeric', pattern: '[0-9]*' }} InputProps={{ readOnly: isEditMode }} /></Grid>
//           <Grid item xs={12} sm={6}><Autocomplete options={countries} getOptionLabel={(option) => option.country_name || ''} value={countries.find(c => c.country_id == currentEmployee.country_id) || null} onChange={(e, nv) => handleCountryChange(nv)} isOptionEqualToValue={(option, value) => option.country_id == value.country_id} renderInput={(params) => (<TextField {...params} label="Country" />)} /></Grid>
//           <Grid item xs={12} sm={6}><Autocomplete options={states} getOptionLabel={(option) => option.state_name || ''} value={states.find(s => s.state_id == currentEmployee.state_id) || null} onChange={(e, nv) => handleStateChange(nv)} isOptionEqualToValue={(option, value) => option.state_id == value.state_id} disabled={!currentEmployee.country_id} renderInput={(params) => (<TextField {...params} label="State" />)} /></Grid>
//           <Grid item xs={12} sm={6}><Autocomplete options={employeeHubs} getOptionLabel={(option) => option.employee_hub_name || ''} value={employeeHubs.find(h => h.employee_hub_id == currentEmployee.employee_hub_id) || null} onChange={(e, nv) => setCurrentEmployee(prev => ({ ...prev, employee_hub_id: nv ? nv.employee_hub_id : "" }))} isOptionEqualToValue={(option, value) => option.employee_hub_id == value.employee_hub_id} disabled={!currentEmployee.state_id} renderInput={(params) => (<TextField {...params} label="holiday Hub" />)} /></Grid>
//           <Grid item xs={12} sm={6}><Autocomplete options={headquarters} getOptionLabel={(option) => option.headquarter_name || ''} value={headquarters.find(h => h.headquarter_id == currentEmployee.headquarter_id) || null} onChange={(e, nv) => setCurrentEmployee(prev => ({ ...prev, headquarter_id: nv ? nv.headquarter_id : "" }))} isOptionEqualToValue={(option, value) => option.headquarter_id == value.headquarter_id} renderInput={(params) => (<TextField {...params} label="Headquarter" />)} /></Grid>
//           <Grid item xs={12} sm={6}><Autocomplete options={divisions} getOptionLabel={(option) => option.division_name || ''} value={divisions.find(d => d.division_id == currentEmployee.division_id) || null} onChange={(e, nv) => handleDivisionChange(nv)} isOptionEqualToValue={(option, value) => option.division_id == value.division_id} renderInput={(params) => (<TextField {...params} label="Division" />)} /></Grid>
//           <Grid item xs={12} sm={6}><Autocomplete options={subDivisionOptions} getOptionLabel={(option) => option.label || ''} value={subDivisionOptions.find(sd => sd.value === currentEmployee.subDivision) || null} onChange={(e, nv) => setCurrentEmployee(prev => ({ ...prev, subDivision: nv ? nv.value : "" }))} isOptionEqualToValue={(option, value) => option.value === value.value} disabled={isSubDivisionDisabled} renderInput={(params) => (<TextField {...params} label="Sub Division" />)} /></Grid>
//           <Grid item xs={12} sm={6}><Autocomplete options={allEmployeesForDropdown} getOptionLabel={(option) => option.label ? `${option.label} (${option.emp_id})` : ''} value={allEmployeesForDropdown.find(e => e.value == currentEmployee.manager_id) || null} onChange={(e, nv) => setCurrentEmployee(prev => ({ ...prev, manager_id: nv ? nv.value : "" }))} isOptionEqualToValue={(option, value) => option.value == value.value} renderInput={(params) => (<TextField {...params} label="Manager" />)} /></Grid>
//           <Grid item xs={12} sm={6}><Autocomplete options={departments} getOptionLabel={(option) => option.dept_name || ''} value={departments.find(d => d.dept_id == currentEmployee.department_id) || null} onChange={(e, nv) => handleDeptChange(nv)} isOptionEqualToValue={(option, value) => option.dept_id == value.dept_id} renderInput={(params) => (<TextField {...params} label="Department" />)} /></Grid>
//           <Grid item xs={12} sm={6}><Autocomplete options={designations} getOptionLabel={(option) => option.desig_name || ''} value={designations.find(d => d.desig_id == currentEmployee.designation_id) || null} onChange={(e, nv) => setCurrentEmployee(prev => ({ ...prev, designation_id: nv ? nv.desig_id : "" }))} isOptionEqualToValue={(option, value) => option.desig_id == value.desig_id} disabled={!currentEmployee.department_id} renderInput={(params) => (<TextField {...params} label="Designation" />)} /></Grid>
//           <Grid item xs={12} sm={6}><Autocomplete options={officeShifts} getOptionLabel={(option) => option.office_shift_name || ''} value={officeShifts.find(s => s.office_shift_id == currentEmployee.officeShift) || null} onChange={(e, nv) => setCurrentEmployee(prev => ({ ...prev, officeShift: nv ? nv.office_shift_id : "" }))} isOptionEqualToValue={(option, value) => option.office_shift_id == value.office_shift_id} renderInput={(params) => (<TextField {...params} label="Office Shift" />)} /></Grid>
//           <Grid item xs={12} sm={6}><Autocomplete options={statusOptions} getOptionLabel={(option) => option.label} value={statusOptions.find(s => s.value === currentEmployee.status) || null} onChange={(e, nv) => setCurrentEmployee(prev => ({ ...prev, status: nv ? nv.value : 1 }))} isOptionEqualToValue={(option, value) => option.value === value.value} renderInput={(params) => (<TextField {...params} label="Status" />)} /></Grid>
//           <Grid item xs={12} sm={6}><Autocomplete options={probationOptions} getOptionLabel={(option) => option.label} value={probationOptions.find(p => p.value === currentEmployee.is_probation) || null} onChange={(e, nv) => setCurrentEmployee(prev => ({ ...prev, is_probation: nv ? nv.value : "n" }))} isOptionEqualToValue={(option, value) => option.value === value.value} renderInput={(params) => (<TextField {...params} label="On Probation" />)} /></Grid>
//           <Grid item xs={12} sm={6}><TextField fullWidth label="Join Date" name="join_date" type="date" value={currentEmployee.join_date || ""} onChange={handleInputChange} InputLabelProps={{ shrink: true }} /></Grid>
//           <Grid item xs={12} sm={6}><Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}><Button variant="contained" component="label" disabled={isEditMode} sx={purpleButtonSx}>Upload Photo<input type="file" hidden accept="image/*" onChange={handleFileUpload} /></Button>{currentEmployee.avatar && <Avatar src={typeof currentEmployee.avatar === 'string' ? currentEmployee.avatar : URL.createObjectURL(currentEmployee.avatar)} sx={{ width: 56, height: 56 }} />}</Box></Grid>
//           <Grid item xs={12}>{isFetchingDocs && <CircularProgress />}{employeeDocuments && !isFetchingDocs && (<Box><Typography variant="subtitle1" gutterBottom>Fetched Documents</Typography><Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>{Object.entries(employeeDocuments).map(([name, url]) => (url ? (<Chip key={name} label={name.replace(/_/g, ' ')} component="a" href={url} target="_blank" clickable icon={<LinkIcon />} variant="outlined" color="secondary" size="small" />) : null))}</Box></Box>)}</Grid>
//           {!isEditMode && (<>
//             <Grid item xs={12} sm={6}><Autocomplete options={genderOptions} getOptionLabel={(option) => option.label} value={genderOptions.find(g => g.value === currentEmployee.gender) || null} onChange={(e, nv) => setCurrentEmployee(prev => ({ ...prev, gender: nv ? nv.value : "" }))} isOptionEqualToValue={(option, value) => option.value === value.value} renderInput={(params) => (<TextField {...params} label="Gender" />)} /></Grid>
//             <Grid item xs={12} sm={6}><TextField fullWidth label="Username" name="username" value={currentEmployee.username || ""} onChange={handleInputChange} InputProps={{ readOnly: true }} /></Grid>
//             <Grid item xs={12} sm={6}><TextField fullWidth label="Password" name="password" value={currentEmployee.password || ""} onChange={handleInputChange} type={showPassword ? 'text' : 'password'} InputProps={{ endAdornment: (<InputAdornment position="end"> <IconButton aria-label="toggle password visibility" onClick={() => setShowPassword((prev) => !prev)} onMouseDown={(e) => e.preventDefault()} edge="end"> {showPassword ? <VisibilityOff /> : <Visibility />} </IconButton> </InputAdornment>) }} /></Grid>
//             <Grid item xs={12} sm={6}><Autocomplete options={roles} getOptionLabel={(option) => option.role_name || ''} value={roles.find(r => r.index == currentEmployee.role) || null} onChange={(e, nv) => setCurrentEmployee(prev => ({ ...prev, role: nv ? nv.index : "" }))} isOptionEqualToValue={(option, value) => option.index == value.index} renderInput={(params) => (<TextField {...params} label="Role" />)} /></Grid>
//             <Grid item xs={12} sm={6}><TextField fullWidth label="Gross Salary monthly" name="grossSalary" type="number" value={currentEmployee.grossSalary || ""} onChange={(e) => { const value = e.target.value; if (/^\d*\.?\d*$/.test(value)) handleInputChange(e); }} /></Grid>
//           </>)}
//         </Grid>
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={() => setOpenEmployeeForm(false)} disabled={isSaving} sx={cancelButtonSx}>Cancel</Button>
//         <Button onClick={handleSaveEmployee} variant="contained" disabled={isSaving} sx={purpleButtonSx}>{isSaving ? <CircularProgress size={24} color="inherit" /> : "Save"}</Button>
//       </DialogActions>
//     </Dialog>
    
//     <TableContainer>
//         <Table sx={{ minWidth: "100%", whiteSpace: "nowrap" }}>
//           <TableHead>
//             <TableRow sx={{ bgcolor: themePurple }}>
//               <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>SR. NO.</TableCell>
//               <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>EMPLOYEE</TableCell>
//               <TableCell sx={{ color: 'white' }}></TableCell>
//               <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>DEPARTMENT</TableCell>
//               <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>DESIGNATION</TableCell>
//               <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>JOIN DATE</TableCell>
//               <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>STATUS</TableCell>
//               <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>MANAGER</TableCell>
//               <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', color: 'white' }}>ACTIONS</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {loading ? (
//                 Array.from(new Array(rowsPerPage)).map((_, index) => (
//                     <TableRow key={index}>
//                         <TableCell><Skeleton variant="text" /></TableCell>
//                         <TableCell><Skeleton variant="text" /></TableCell>
//                         <TableCell><Skeleton variant="text" /></TableCell>
//                         <TableCell><Skeleton variant="text" /></TableCell>
//                         <TableCell><Skeleton variant="text" /></TableCell>
//                         <TableCell><Skeleton variant="text" /></TableCell>
//                         <TableCell><Skeleton variant="text" /></TableCell>
//                         <TableCell><Skeleton variant="text" /></TableCell>
//                         <TableCell align="center"><Skeleton variant="rectangular" width={80} height={30} /></TableCell>
//                     </TableRow>
//                 ))
//             ) : (
//                 (rowsPerPage > 0
//                     ? filteredEmployees.slice(currentPage * rowsPerPage, currentPage * rowsPerPage + rowsPerPage)
//                     : filteredEmployees
//                 ).map((employee, index) => (
//                     <TableRow key={employee.user_id} sx={{ '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' } }} onMouseEnter={() => setHoveredRowId(employee.user_id)} onMouseLeave={() => setHoveredRowId(null)}>
//                         <TableCell sx={{ fontSize: '0.95rem' }}>{currentPage * rowsPerPage + index + 1}</TableCell>
//                         <TableCell sx={{ fontSize: '0.95rem' }}>{employee.employee_name}</TableCell>
//                         <TableCell sx={{ padding: '0 8px', textAlign: 'center' }}>
//                            {hoveredRowId === employee.user_id && <IconButton onClick={() => handleArrowClick(employee.user_id)} size="small" sx={{ color: themeOrange }}><ArrowForwardIcon fontSize="small" /></IconButton>}
//                         </TableCell>
//                         <TableCell sx={{ fontSize: '0.95rem' }}>{employee.department_name || 'N/A'}</TableCell>
//                         <TableCell sx={{ fontSize: '0.95rem' }}>{employee.designation_name || 'N/A'}</TableCell>
//                         <TableCell sx={{ fontSize: '0.95rem' }}>{formatDate(employee.join_date)}</TableCell>
//                         <TableCell sx={{ fontSize: '0.95rem' }}>
//                             <Chip label={employee.status === 1 ? "Active" : "Inactive"} size="small" sx={{ 
//                                 bgcolor: employee.status === 1 ? '#4caf50' : themeOrange, 
//                                 color: 'white',
//                                 borderRadius: '16px',
//                                 height: '24px',
//                             }} />
//                         </TableCell>
//                         <TableCell sx={{ fontSize: '0.95rem' }}>{employee.manager}</TableCell>
//                         <TableCell>
//                             <Box display="flex" justifyContent="center" gap={0.5}>
//                                 <Tooltip title="Edit"><IconButton onClick={() => handleEditEmployee(employee)} sx={{ color: themePurple }}><EditIcon /></IconButton></Tooltip>
//                                 <Tooltip title="Delete"><IconButton onClick={() => handleDeleteEmployee(employee.user_id)} sx={{ color: themeOrange }}><DeleteIcon /></IconButton></Tooltip>
//                             </Box>
//                         </TableCell>
//                     </TableRow>
//                 ))
//             )}
//           </TableBody>
//         </Table>
//     </TableContainer>

//     <Box sx={{ p: 2, borderTop: '1px solid rgba(224, 224, 224, 1)' }}>
//         {loading ? (
//             <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                 <Skeleton variant="text" width={150} />
//                 <Skeleton variant="rectangular" width={400} height={40} />
//             </Box>
//         ) : (
//             <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
//                 <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//                     <FormControl variant="outlined" size="small">
//                         <Select
//                             value={rowsPerPage}
//                             onChange={handleRowsPerPageChange}
//                             sx={{
//                                 backgroundColor: themePurple,
//                                 color: 'white',
//                                 borderRadius: '4px',
//                                 transition: 'background-color 0.3s',
//                                 '&:hover': {
//                                     backgroundColor: themePurpleHover,
//                                 },
//                                 '& .MuiOutlinedInput-notchedOutline': {
//                                     border: 'none',
//                                 },
//                                 '& .MuiSvgIcon-root': {
//                                     color: 'white',
//                                 },
//                             }}
//                         >
//                             {[10, 25, 50, 100].map((value) => (
//                                 <MenuItem key={value} value={value}>{value}</MenuItem>
//                             ))}
//                         </Select>
//                     </FormControl>
//                     <Typography variant="body2" color="text.secondary">
//                        {`1 to ${Math.min(rowsPerPage, filteredEmployees.length)} of ${filteredEmployees.length}`}
//                     </Typography>
//                 </Box>

//                 <Pagination
//                     count={Math.ceil(filteredEmployees.length / rowsPerPage)}
//                     page={currentPage + 1}
//                     onChange={handlePaginationChange}
//                     showFirstButton
//                     showLastButton
//                     sx={{
//                         '& .MuiPaginationItem-root': {
//                             borderRadius: '4px',
//                             transition: 'background-color 0.3s, color 0.3s',
//                             '&:hover': {
//                                 backgroundColor: themeOrange,
//                                 color: 'white',
//                             }
//                         },
//                         '& .MuiPaginationItem-page':{
//                             color: themePurple,
//                             '&.Mui-selected': {
//                                 backgroundColor: themePurple,
//                                 color: 'white',
//                                 '&:hover': {
//                                     backgroundColor: themeOrange,
//                                 }
//                             },
//                         },
//                          '& .MuiPaginationItem-icon': {
//                             color: themePurple,
//                         }
//                     }}
//                 />
//             </Box>
//         )}
//     </Box>
// </Box>
// );
// }







// import React, { useState, useEffect, useMemo, useCallback, useRef } from "react";
// import axios from 'axios';
// import {
//     Box,
//     Typography,
//     Button,
//     Paper,
//     Table,
//     TableBody,
//     TableCell,
//     TableContainer,
//     TableHead,
//     TableRow,
//     TextField,
//     FormControl,
//     InputLabel,
//     Select,
//     MenuItem,
//     Avatar,
//     Chip,
//     IconButton,
//     Tooltip,
//     Dialog,
//     DialogTitle,
//     DialogContent,
//     DialogActions,
//     Grid,
//     CircularProgress,
//     Autocomplete,
//     InputAdornment,
//     useTheme,
//     useMediaQuery,
//     Skeleton,
//     Pagination,
// } from "@mui/material";
// import {
//     Edit as EditIcon,
//     Delete as DeleteIcon,
//     Add as AddIcon,
//     Close as CloseIcon,
//     Download as DownloadIcon,
//     ArrowForward as ArrowForwardIcon,
//     SupervisorAccount as ChangeManagerIcon,
//     Link as LinkIcon,
//     Visibility,
//     VisibilityOff,
//     Search as SearchIcon,
// } from "@mui/icons-material";
// import * as XLSX from "xlsx";
// import { useNavigate } from "react-router-dom";
// import axiosInstance from "../../utils/axiosInstance";
// import Swal from 'sweetalert2';

// const RESUME_BASE_URL = "https://raasbackend.vetrinahealthcare.com/";
// const statusOptions = [{ value: 1, label: 'Active' }, { value: 0, label: 'Inactive' }];
// const probationOptions = [{ value: 'y', label: 'Yes' }, { value: 'n', label: 'No' }];
// const genderOptions = [{ value: 'Male', label: 'Male' }, { value: 'Female', 'label': 'Female' }, { value: 'Other', label: 'Other' }];
// const subDivisionOptions = [{ value: 'VetBiz', label: 'VetBiz' }, { value: 'TredBiz', label: 'TredBiz' }, { value: ' ', label: 'TredBiz Mix' }];

// export default function EmployeesView() {
//     const employeeDialogRef = useRef(null);
//     const changeManagerDialogRef = useRef(null);
//     const muiTheme = useTheme();
//     const isMobile = useMediaQuery(muiTheme.breakpoints.down("sm"));
//     const themePurple = '#8C257C';
//     const themePurpleHover = '#6d1d60';
//     const themeOrange = '#F58E35';

//     const purpleButtonSx = {
//         backgroundColor: themePurple,
//         color: 'white',
//         '&:hover': {
//             backgroundColor: themePurpleHover,
//         },
//     };
//     const cancelButtonSx = {
//         color: '#757575',
//         '&:hover': {
//             backgroundColor: 'rgba(0, 0, 0, 0.04)'
//         }
//     };

//     const [loading, setLoading] = useState(true);
//     const [departments, setDepartments] = useState([]);
//     const [designations, setDesignations] = useState([]);
//     const [searchTerm, setSearchTerm] = useState("");
//     const [openChangeManagerForm, setOpenChangeManagerForm] = useState(false);
//     const [currentPage, setCurrentPage] = useState(0);
//     const [rowsPerPage, setRowsPerPage] = useState(10);
//     const [newManager, setNewManager] = useState("");
//     const [selectedEmployeeForManagerChange, setSelectedEmployeeForManagerChange] = useState("");
//     const [employees, setEmployees] = useState([]);
//     const [hoveredRowId, setHoveredRowId] = useState(null);
//     const [officeShifts, setOfficeShifts] = useState([]);
//     const [isEditMode, setIsEditMode] = useState(false);
//     const [roles, setRoles] = useState([]);
//     const [countries, setCountries] = useState([]);
//     const [states, setStates] = useState([]);
//     const [employeeHubs, setEmployeeHubs] = useState([]);
//     const [headquarters, setHeadquarters] = useState([]);
//     const [divisions, setDivisions] = useState([]);
//     const [allEmployeesForDropdown, setAllEmployeesForDropdown] = useState([]);
//     const [talentPool, setTalentPool] = useState([]);
//     const [isFetchingDocs, setIsFetchingDocs] = useState(false);
//     const [employeeDocuments, setEmployeeDocuments] = useState(null);
//     const [showPassword, setShowPassword] = useState(false);
//     const [isSaving, setIsSaving] = useState(false);

//     const [currentEmployee, setCurrentEmployee] = useState({
//         id: null, firstName: "", middleName: "", lastName: "", email: "", join_date: "",
//         status: 1, phone: "", avatar: null, country_id: "", state_id: "", employee_hub_id: "",
//         headquarter_id: "", division_id: "", subDivision: "", role: "", is_probation: "n",
//         resumeUrl: "", password: "", gender: "", username: "", grossSalary: "", department_id: "",
//         designation_id: "", manager_id: "", officeShift: "", grossSalaryYearly: "", ctcMonthly: "", ctcYearly: "",
//     });

//     const [openEmployeeForm, setOpenEmployeeForm] = useState(false);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const [ depts, empDropdown, shifts, countriesRes, hubs, divs, rolesRes, talent,headquartersRes ] = await Promise.all([
//                     axiosInstance.get('api/desig_dept_dropdown/'),
//                     axiosInstance.get('employee-dropdown/'),
//                     axiosInstance.get('api/office_shift_dropdown/'),
//                     axiosInstance.get('api/countries/'),
//                     axiosInstance.get('api/employee_hub/'),
//                     axiosInstance.get('api/division/'),
//                     axiosInstance.get('api/role_list/'),
//                     axiosInstance.get('api/search_by_email_vet_talent/'),
//                     axios.get("https://tdtlworld.com/hrms-backend/api/headquarters/")
//                 ]);
//                 setDepartments(depts.data.dept_data || []);
//                 setAllEmployeesForDropdown(empDropdown.data || []);
//                 setOfficeShifts(shifts.data.office_shift_data || []);
//                 if (countriesRes.data.status === 'success') setCountries(countriesRes.data.data || []);
//                 setDivisions(divs.data || []);
//                 if (rolesRes.data?.status === "success") setRoles(rolesRes.data.data);
//                 setHeadquarters(headquartersRes.data || []);
//                 setTalentPool(talent.data.data || []);
//             } catch (error) {
//                 console.error("Error fetching initial data:", error);
//                 Swal.fire({ icon: 'error', title: 'Error', text: 'Failed to fetch initial data.', timer: 3000, showConfirmButton: false });
//             }
//         };
//         fetchData();
//     }, []);

//     const fetchEmployees = useCallback(() => {
//         setLoading(true);
//         axiosInstance.get('api/employee_details/')
//             .then((response) => setEmployees(Array.isArray(response.data.data) ? response.data.data : []))
//             .catch((error) => {
//                 console.error('Error fetching employees:', error);
//                 setEmployees([]);
//                 Swal.fire({ icon: 'error', title: 'Error', text: 'Failed to fetch employee list.', timer: 3000, showConfirmButton: false });
//             })
//             .finally(() => setLoading(false));
//     }, []);

//     useEffect(() => { fetchEmployees(); }, [fetchEmployees]);
    
//     useEffect(() => {
//         const grossSalaryMonthly = parseFloat(currentEmployee.grossSalary);
//         if (!isNaN(grossSalaryMonthly) && grossSalaryMonthly > 0) {
//             const yearlyGross = grossSalaryMonthly * 12;
    
//             // Assuming Basic Salary is 50% of Gross Salary
//             const basicSalary = grossSalaryMonthly * 0.5;
    
//             // Employer PF contribution is 12% of Basic Salary
//             const employerPF = basicSalary * 0.12;
    
//             // Employer ESI contribution is 3.25% of Gross Salary if gross is <= 21000
//             const employerESI = grossSalaryMonthly <= 21000 ? grossSalaryMonthly * 0.0325 : 0;
    
//             const monthlyCTC = grossSalaryMonthly + employerPF + employerESI;
//             const yearlyCTC = monthlyCTC * 12;
    
//             setCurrentEmployee(prev => ({
//                 ...prev,
//                 grossSalaryYearly: yearlyGross.toFixed(2),
//                 ctcMonthly: monthlyCTC.toFixed(2),
//                 ctcYearly: yearlyCTC.toFixed(2),
//             }));
//         } else {
//             setCurrentEmployee(prev => ({
//                 ...prev,
//                 grossSalaryYearly: "",
//                 ctcMonthly: "",
//                 ctcYearly: "",
//             }));
//         }
//     }, [currentEmployee.grossSalary]);

//     const handleCountryChange = (selectedCountry) => {
//         const countryId = selectedCountry ? selectedCountry.country_id : "";
//         const countryName = selectedCountry ? selectedCountry.country_name : null;
//         setCurrentEmployee(prev => ({ ...prev, country_id: countryId, state_id: "", employee_hub_id: "" }));
//         setStates([]);
//         setEmployeeHubs([]);
//         if (countryName) {
//             axiosInstance.get(`api/states/?country_name=${countryName}`)
//                 .then(res => { if (res.data.status === "success") setStates(res.data.data || []); })
//                 .catch(err => {
//                     console.error("Error fetching states:", err);
//                     Swal.fire({ icon: 'error', title: 'Error', text: 'Failed to fetch states.', target: employeeDialogRef.current, timer: 3000, showConfirmButton: false });
//                 });
//         }
//     };

//     const handleStateChange = (selectedState) => {
//         const stateId = selectedState ? selectedState.state_id : "";
//         setCurrentEmployee(prev => ({ ...prev, state_id: stateId, employee_hub_id: "" }));
//         setEmployeeHubs([]);
//         if (stateId) {
//             axiosInstance.get(`api/employee_hub_dropdown/${stateId}/`)
//                 .then(res => { if (res.data.status === "success") setEmployeeHubs(res.data.data || []); })
//                 .catch(err => {
//                     console.error("Error fetching employee hubs:", err);
//                     Swal.fire({ icon: 'error', title: 'Error', text: 'Failed to fetch holiday hubs.', target: employeeDialogRef.current, timer: 3000, showConfirmButton: false });
//                 });
//         }
//     };

//     const handleDeptChange = (selectedDept) => {
//         const deptId = selectedDept ? selectedDept.dept_id : "";
//         setCurrentEmployee((prev) => ({ ...prev, department_id: deptId, designation_id: "" }));
//         if (deptId) {
//             axiosInstance.get(`api/desig_dept_dropdown/?dept_id=${deptId}/`)
//                 .then((res) => setDesignations(res.data.desig_data || []))
//                 .catch((err) => {
//                     console.error("Error fetching designations:", err);
//                     Swal.fire({ icon: 'error', title: 'Error', text: 'Failed to load designations.', target: employeeDialogRef.current, timer: 3000, showConfirmButton: false });
//                 });
//         } else {
//             setDesignations([]);
//         }
//     };

//     const handleDivisionChange = (selectedDivision) => {
//         const divisionId = selectedDivision ? selectedDivision.division_id : "";
//         if (selectedDivision && selectedDivision.division_name !== 'Livestock') {
//             setCurrentEmployee(prev => ({ ...prev, division_id: divisionId, subDivision: "" }));
//         } else {
//             setCurrentEmployee(prev => ({ ...prev, division_id: divisionId }));
//         }
//     };

//     const handleChangeManager = async () => {
//         if (!selectedEmployeeForManagerChange || !newManager) {
//             Swal.fire({ icon: 'warning', title: 'Incomplete Selection', text: 'Please select an employee and a new manager.', target: changeManagerDialogRef.current });
//             return;
//         }
//         try {
//             await axiosInstance.put("api/change_manager/", { user_id: selectedEmployeeForManagerChange, manager_id: newManager });
//             await fetchEmployees();
//             Swal.fire({ icon: 'success', title: 'Success', text: 'Manager changed successfully!', timer: 3000, showConfirmButton: false });
//             setOpenChangeManagerForm(false);
//             setSelectedEmployeeForManagerChange("");
//             setNewManager("");
//         } catch (error) {
//             console.error("Error changing manager:", error);
//             Swal.fire({ icon: 'error', title: 'Operation Failed', text: `Error changing manager: ${error.response?.data?.message || "An error occurred."}`, target: changeManagerDialogRef.current });
//         }
//     };

//     const navigate = useNavigate();
//     const handleArrowClick = (id) => navigate(`/hrms/admindashboard/employeedetail/${id}`);

//     const handleInputChange = (event) => {
//         const { name, value } = event.target;
//         setCurrentEmployee((prev) => ({ ...prev, [name]: value }));
//     };

//     const handleAddEmployee = async () => {
//         try {
//             const maxIdResponse = await axios.get("https://tdtlworld.com/hrms-backend/api/get_max_employee_id/");
//             const newEmpId = maxIdResponse.data.employee_id;
//             setCurrentEmployee({
//                 emp_id: newEmpId, firstName: "", middleName: "", lastName: "", email: "", phone: "",
//                 avatar: null, officeShift: "", status: 1, join_date: "", gender: "", username: newEmpId, password: "",
//                 role: "", grossSalary: "", department_id: "", designation_id: "", manager_id: "",
//                 country_id: "", state_id: "", employee_hub_id: "", headquarter_id: "", division_id: "",
//                 company_id: 2, is_probation: "n", resumeUrl: "", subDivision: "", grossSalaryYearly: "", ctcMonthly: "", ctcYearly: "",
//             });
//             setDesignations([]); setStates([]); setEmployeeHubs([]); setEmployeeDocuments(null);
//             setIsEditMode(false); setShowPassword(false); setOpenEmployeeForm(true);
//         } catch (error) {
//             console.error("Error fetching max employee ID:", error);
//             Swal.fire({ icon: 'error', title: 'Error', text: 'Failed to initialize employee form.', timer: 3000, showConfirmButton: false });
//         }
//     };

//     const handleTalentSelect = async (event, selectedOption) => {
//         setEmployeeDocuments(null);
//         setCurrentEmployee(prev => ({ ...prev, resumeUrl: "" }));
//         if (!selectedOption) {
//             setCurrentEmployee(prev => ({ ...prev, firstName: "", middleName: "", lastName: "", email: "", phone: "", gender: "", country_id: "", state_id: "" }));
//             return;
//         }
//         const talent = talentPool.find(p => p.email === selectedOption.email);
//         if (!talent) return;

//         const selectedCountry = countries.find(c => c.country_name === talent.country);
//         const resumeLink = talent.resume ? `${RESUME_BASE_URL}${talent.resume}` : "";

//         setCurrentEmployee(prev => ({
//             ...prev, firstName: talent.first_name || "", middleName: talent.middle_name || "",
//             lastName: talent.last_name || "", email: talent.email || "", phone: talent.phone || "",
//             gender: talent.gender || "", country_id: selectedCountry ? selectedCountry.country_id : "",
//             state_id: '', employee_hub_id: '', resumeUrl: resumeLink,
//         }));

//         if (selectedCountry) {
//             try {
//                 const statesRes = await axiosInstance.get(`api/states/?country_name=${selectedCountry.country_name}`);
//                 if (statesRes.data.status === "success") {
//                     const fetchedStates = statesRes.data.data || [];
//                     setStates(fetchedStates);
//                     const selectedState = fetchedStates.find(s => s.state_name === talent.state);
//                     if (selectedState) {
//                         setCurrentEmployee(prev => ({ ...prev, state_id: selectedState.state_id }));
//                         const hubsRes = await axiosInstance.get(`api/employee_hub_dropdown/${selectedState.state_id}/`);
//                         if (hubsRes.data.status === "success") setEmployeeHubs(hubsRes.data.data || []);
//                     }
//                 }
//             } catch (err) { console.error("Error fetching dependent data for talent:", err); }
//         }

//         setIsFetchingDocs(true);
//         try {
//             const docResponse = await axios.post('https://raasbackend.vetrinahealthcare.com/fetch_documents/', { email_id: talent.email });
//             setEmployeeDocuments(docResponse.data.status === 'success' && docResponse.data.documents ? docResponse.data.documents : null);
//         } catch (error) {
//             console.error("Error fetching documents:", error);
//             setEmployeeDocuments(null);
//         } finally {
//             setIsFetchingDocs(false);
//         }
//     };

//     const handleEditEmployee = async (employee) => {
//         if (!employee || !employee.user_id) return;
//         try {
//             const response = await axiosInstance.get(`api/edit_employee/${employee.user_id}/`);
//             if (response.data.status !== "success" || response.data.data.length === 0) {
//                 Swal.fire({ icon: 'error', title: 'Error', text: 'Failed to load employee details.', timer: 3000, showConfirmButton: false });
//                 return;
//             }
//             const empData = response.data.data[0];
//             const [desigRes, statesRes, hubsRes] = await Promise.all([
//                 axiosInstance.get(`api/desig_dept_dropdown/?dept_id=${empData.department_id}/`),
//                 empData.country_name ? axiosInstance.get(`api/states/?country_name=${empData.country_name}`) : Promise.resolve({ data: { data: [] } }),
//                 empData.state ? axiosInstance.get(`api/employee_hub_dropdown/${empData.state}/`) : Promise.resolve({ data: { data: [] } })
//             ]);

//             setDesignations(desigRes.data.desig_data || []);
//             setStates(statesRes.data.data || []);
//             setEmployeeHubs(hubsRes.data.data || []);
            
//             const officeShiftObj = officeShifts.find(s => s.office_shift_name === empData.office_shift);
//             const nameParts = (empData.emp_name || "").split(" ");
//             const selectedCountry = countries.find(c => c.country_name === empData.country_name);
//             const selectedHeadquarter = headquarters.find(hq => hq.headquarter_name === empData.headquarter);

//             let finalSubDivisionValue = empData.sub_division || "";
//             if (finalSubDivisionValue === "Tred") {
//                 finalSubDivisionValue = "TredBiz";
//             }

//             setCurrentEmployee({
//                 id: employee.user_id,
//                 firstName: nameParts[0] || "",
//                 middleName: nameParts.length > 2 ? nameParts.slice(1, -1).join(" ") : "",
//                 lastName: nameParts.length > 1 ? nameParts[nameParts.length - 1] : "",
//                 email: empData.email || "", phone: empData.phone || "",
//                 manager_id: empData.manager_id ? Number(empData.manager_id) : "",
//                 designation_id: empData.designation_id ? Number(empData.designation_id) : "",
//                 department_id: empData.department_id ? Number(empData.department_id) : "",
//                 headquarter_id: selectedHeadquarter ? selectedHeadquarter.headquarter_id : "",
//                 subDivision: finalSubDivisionValue,
//                 division_id: empData.division_id ? Number(empData.division_id) : "",
//                 state_id: empData.state ? Number(empData.state) : "",
//                 employee_hub_id: empData.employee_hub_id ? Number(empData.employee_hub_id) : "",
//                 role: empData.role_id ? Number(empData.role_id) : "",
//                 officeShift: officeShiftObj ? Number(officeShiftObj.office_shift_id) : "",
//                 status: Number(empData.status),
//                 join_date: empData.join_date ? empData.join_date.split(" ")[0] : "",
//                 country_id: selectedCountry ? Number(selectedCountry.country_id) : "",
//                 avatar: empData.profile_photo || "",
//                 is_probation: empData.probation?.toLowerCase() === 'y' ? 'y' : 'n',
//                 resumeUrl: "",
//             });

//             setIsEditMode(true);
//             setOpenEmployeeForm(true);
//             setShowPassword(false);
//         } catch (error) {
//             console.error("Error fetching employee details for edit:", error);
//             Swal.fire({ icon: 'error', title: 'Error', text: 'Failed to fetch complete employee details.', timer: 3000, showConfirmButton: false });
//         }
//     };

//     const handleSaveEmployee = async () => {
//         if (!isEditMode) {
//             const requiredFields = {
//                 firstName: 'First Name', lastName: 'Last Name', email: 'Email', phone: 'Phone', country_id: 'Country',
//                 state_id: 'State', employee_hub_id: 'holiday Hub', headquarter_id: 'Headquarter', division_id: 'Division',
//                 manager_id: 'Manager', department_id: 'Department', designation_id: 'Designation', officeShift: 'Office Shift',
//                 join_date: 'Join Date', avatar: 'Photo', gender: 'Gender', username: 'Username', password: 'Password',
//                 role: 'Role', grossSalary: 'Gross Salary'
//             };
//             const selectedDivision = divisions.find(d => d.division_id == currentEmployee.division_id);
//             if (selectedDivision && selectedDivision.division_name === 'Livestock' && !currentEmployee.subDivision) {
//                 Swal.fire({ icon: 'error', title: 'Validation Error', text: 'Sub Division is required when Division is Livestock.', target: employeeDialogRef.current });
//                 return;
//             }
//             for (const field in requiredFields) {
//                 if (!currentEmployee[field]) {
//                     Swal.fire({ icon: 'error', title: 'Validation Error', text: `The field "${requiredFields[field]}" is required.`, target: employeeDialogRef.current });
//                     return;
//                 }
//             }
//         }
//         const formData = new FormData();
//         const keyMap = { firstName: 'first_name', middleName: 'middle_name', lastName: 'last_name', officeShift: 'office_shift', join_date: 'join_date', grossSalary: 'gross_salary', headquarter_id: 'headquarter_id', };
//         Object.keys(currentEmployee).forEach(key => {
//             if (key === 'avatar' && currentEmployee.avatar instanceof File) {
//                 formData.append("file", currentEmployee.avatar);
//             } else if (key !== 'resumeUrl' && currentEmployee[key] !== null && currentEmployee[key] !== undefined && currentEmployee[key] !== "") {
//                 const backendKey = keyMap[key] || key;
//                 formData.append(backendKey, currentEmployee[key]);
//             }
//         });

//         setIsSaving(true);
//         try {
//             const action = isEditMode ? 'updated' : 'added';
//             if (isEditMode) {
//                 formData.append("user_id", currentEmployee.id);
//                 await axiosInstance.put("api/edit_employee/", formData, { headers: { "Content-Type": "multipart/form-data" } });
//             } else {
//                 await axiosInstance.post("api/add_employee/", formData, { headers: { "Content-Type": "multipart/form-data" } });
//             }
//             setOpenEmployeeForm(false);
//             await fetchEmployees();
//             Swal.fire({ icon: 'success', title: 'Success', text: `Employee ${action} successfully!`, timer: 3000, showConfirmButton: false });

//         } catch (error) {
//             console.error("Error saving employee:", error);
//             const errorMessage = error.response?.data?.message || error.response?.data?.detail || "An unexpected error occurred.";
//             Swal.fire({ icon: 'error', title: `Operation failed`, text: `${errorMessage}`, target: employeeDialogRef.current });
//         } finally {
//             setIsSaving(false);
//         }
//     };

//     const handleDeleteEmployee = (employeeId) => {
//         if (!employeeId) return;
//         Swal.fire({
//             title: 'Are you sure?', text: "You won't be able to revert this!", icon: 'warning',
//             showCancelButton: true, confirmButtonColor: themePurple, cancelButtonColor: themeOrange,
//             confirmButtonText: 'Yes, delete it!'
//         }).then((result) => {
//             if (result.isConfirmed) {
//                 axiosInstance.delete("api/edit_employee/", { data: { user_id: employeeId } })
//                     .then(() => {
//                         fetchEmployees();
//                         Swal.fire({ icon: 'success', title: 'Deleted!', text: 'The employee has been deleted.', timer: 3000, showConfirmButton: false });
//                     })
//                     .catch((error) => {
//                         console.error("Error deleting employee: ", error);
//                         const errorMessage = error.response?.data?.message || error.response?.data?.detail || "Failed to delete employee.";
//                         Swal.fire({ icon: 'error', title: 'Error', text: errorMessage, timer: 3000, showConfirmButton: false });
//                     });
//             }
//         });
//     };

//     const handleExportEmployees = () => {
//         if (employees.length === 0) {
//             Swal.fire({ icon: 'info', title: 'Info', text: 'There is no employee data to export.', timer: 3000, showConfirmButton: false });
//             return;
//         }
//         const worksheet = XLSX.utils.json_to_sheet(employees);
//         const workbook = XLSX.utils.book_new();
//         XLSX.utils.book_append_sheet(workbook, worksheet, "Employees");
//         XLSX.writeFile(workbook, "EmployeesData.xlsx");
//     };

//     const sortedEmployees = useMemo(() => {
//         if (!Array.isArray(employees)) return [];
//         return [...employees].sort((a, b) => b.user_id - a.user_id);
//     }, [employees]);

//     const filteredEmployees = useMemo(() => sortedEmployees.filter(
//         (e) =>
//             (e.employee_name && e.employee_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
//             (e.department_name && e.department_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
//             (e.designation_name && e.designation_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
//             (e.join_date && e.join_date.toLowerCase().includes(searchTerm.toLowerCase())) ||
//             (e.manager && e.manager.toLowerCase().includes(searchTerm.toLowerCase()))
//     ), [sortedEmployees, searchTerm]);

//     const handlePaginationChange = (event, newPage) => {
//         setCurrentPage(newPage - 1);
//     };

//     const handleRowsPerPageChange = (event) => {
//         setRowsPerPage(parseInt(event.target.value, 10));
//         setCurrentPage(0);
//     };

//     const handleFileUpload = (e) => {
//         const file = e.target.files[0];
//         if (file) setCurrentEmployee((prev) => ({ ...prev, avatar: file }));
//     };

//     const isSubDivisionDisabled = useMemo(() => {
//         if (!currentEmployee.division_id) return true;
//         const selectedDivision = divisions.find(d => d.division_id == currentEmployee.division_id);
//         return !selectedDivision || selectedDivision.division_name !== 'Livestock';
//     }, [currentEmployee.division_id, divisions]);

//     const formatDate = (dateString) => {
//         if (!dateString) return '';
//         try {
//             const date = new Date(dateString);
//             const day = String(date.getDate()).padStart(2, '0');
//             const month = String(date.getMonth() + 1).padStart(2, '0');
//             const year = date.getFullYear();
//             return `${day}/${month}/${year}`;
//         } catch (error) {
//             console.error("Could not format date:", dateString);
//             return dateString.split(" ")[0];
//         }
//     };

//     return (
//         <Box component={Paper} p={3}>
//             <Typography variant="h4" sx={{ color: themePurple, fontWeight: "bold", mb: 5 }}>
//                 Employees List
//             </Typography>
//             <Box sx={{
//                 display: "flex",
//                 justifyContent: "space-between",
//                 alignItems: "center",
//                 flexDirection: isMobile ? "column" : "row",
//                 gap: 2,
//                 mb: 2
//             }}>
//                 <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
//                     <Button variant="contained" startIcon={<AddIcon />} onClick={handleAddEmployee} sx={purpleButtonSx}>Add Employee</Button>
//                     <Button variant="contained" startIcon={<DownloadIcon />} onClick={handleExportEmployees} sx={purpleButtonSx}>Export</Button>
//                     <Button variant="contained" startIcon={<ChangeManagerIcon />} onClick={() => setOpenChangeManagerForm(true)} sx={purpleButtonSx}>Change Manager</Button>
//                 </Box>
//                 <TextField
//                     size="small"
//                     placeholder="Search..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     sx={{ width: isMobile ? "100%" : "auto" }}
//                     InputProps={{
//                         startAdornment: (
//                             <InputAdornment position="start">
//                                 <SearchIcon />
//                             </InputAdornment>
//                         ),
//                     }}
//                 />
//             </Box>

//             <Dialog open={openChangeManagerForm} onClose={() => setOpenChangeManagerForm(false)} maxWidth="sm" fullWidth ref={changeManagerDialogRef}>
//                 <DialogTitle sx={{ color: themePurple, fontWeight: 'bold' }}>
//                     Change Manager
//                     <IconButton onClick={() => setOpenChangeManagerForm(false)} sx={{ position: "absolute", right: 8, top: 8, color: (theme) => theme.palette.grey[500] }}><CloseIcon /></IconButton>
//                 </DialogTitle>
//                 <DialogContent><Grid container spacing={2} sx={{ mt: 1 }}><Grid item xs={12}><FormControl fullWidth><InputLabel>Select Employee</InputLabel><Select value={selectedEmployeeForManagerChange} onChange={(e) => setSelectedEmployeeForManagerChange(e.target.value)} label="Select Employee">{allEmployeesForDropdown.map((emp) => (<MenuItem key={emp.value} value={emp.value}>{`${emp.label} (${emp.emp_id})`}</MenuItem>))}</Select></FormControl></Grid><Grid item xs={12}><FormControl fullWidth><InputLabel>Select New Manager</InputLabel><Select value={newManager} onChange={(e) => setNewManager(e.target.value)} label="Select New Manager">{allEmployeesForDropdown.map((emp) => (<MenuItem key={emp.value} value={emp.value}>{`${emp.label} (${emp.emp_id})`}</MenuItem>))}</Select></FormControl></Grid></Grid></DialogContent>
//                 <DialogActions>
//                     <Button onClick={() => setOpenChangeManagerForm(false)} sx={cancelButtonSx}>Cancel</Button>
//                     <Button onClick={handleChangeManager} variant="contained" sx={purpleButtonSx}>Save</Button>
//                 </DialogActions>
//             </Dialog>

//             <Dialog open={openEmployeeForm} onClose={() => setOpenEmployeeForm(false)} maxWidth="md" fullWidth ref={employeeDialogRef}>
//                 <DialogTitle sx={{ color: '#8C257C ', fontWeight: "bold", fontSize: '2rem' }}>
//                     {isEditMode ? "Edit Employee" : "Add Employee"}
//                     <IconButton onClick={() => setOpenEmployeeForm(false)} sx={{ position: "absolute", right: 8, top: 8, color: (theme) => theme.palette.grey[500] }}><CloseIcon /></IconButton>
//                 </DialogTitle>
//                 <DialogContent>
//                     <Grid container spacing={2} sx={{ mt: 1 }}>
//                         {!isEditMode && (<Grid item xs={12}><Autocomplete options={talentPool} getOptionLabel={(option) => option.email || ""} onChange={handleTalentSelect} onInputChange={(event, newInputValue) => { if (!talentPool.find(p => p.email === newInputValue)) { setCurrentEmployee(prev => ({ ...prev, email: newInputValue })); } }} renderInput={(params) => (<TextField {...params} label="Search Email to Auto-fill" />)} /></Grid>)}
//                         <Grid item xs={12} sm={4}><TextField fullWidth label="First Name" name="firstName" value={currentEmployee.firstName || ""} onChange={handleInputChange} onKeyPress={(e) => { if (!/^[A-Za-z]$/.test(e.key)) e.preventDefault(); }} InputProps={{ readOnly: isEditMode }} /></Grid>
//                         <Grid item xs={12} sm={4}><TextField fullWidth label="Middle Name" name="middleName" value={currentEmployee.middleName || ""} onChange={handleInputChange} onKeyPress={(e) => { if (!/^[A-Za-z]$/.test(e.key)) e.preventDefault(); }} InputProps={{ readOnly: isEditMode }} /></Grid>
//                         <Grid item xs={12} sm={4}><TextField fullWidth label="Last Name" name="lastName" value={currentEmployee.lastName || ""} onChange={handleInputChange} onKeyPress={(e) => { if (!/^[A-Za-z]$/.test(e.key)) e.preventDefault(); }} InputProps={{ readOnly: isEditMode }} /></Grid>
//                         <Grid item xs={12} sm={6}><TextField fullWidth label="Email" name="email" value={currentEmployee.email || ''} onChange={handleInputChange} InputProps={{ readOnly: isEditMode || !!talentPool.find(p => p.email === currentEmployee.email) }} /></Grid>
//                         <Grid item xs={12} sm={6}><TextField fullWidth label="Phone" name="phone" value={currentEmployee.phone || ''} onChange={(e) => { const value = e.target.value; if (/^\d{0,10}$/.test(value)) handleInputChange(e); }} inputProps={{ maxLength: 10, inputMode: 'numeric', pattern: '[0-9]*' }} InputProps={{ readOnly: isEditMode }} /></Grid>
//                         <Grid item xs={12} sm={6}><Autocomplete options={countries} getOptionLabel={(option) => option.country_name || ''} value={countries.find(c => c.country_id == currentEmployee.country_id) || null} onChange={(e, nv) => handleCountryChange(nv)} isOptionEqualToValue={(option, value) => option.country_id == value.country_id} renderInput={(params) => (<TextField {...params} label="Country" />)} /></Grid>
//                         <Grid item xs={12} sm={6}><Autocomplete options={states} getOptionLabel={(option) => option.state_name || ''} value={states.find(s => s.state_id == currentEmployee.state_id) || null} onChange={(e, nv) => handleStateChange(nv)} isOptionEqualToValue={(option, value) => option.state_id == value.state_id} disabled={!currentEmployee.country_id} renderInput={(params) => (<TextField {...params} label="State" />)} /></Grid>
//                         <Grid item xs={12} sm={6}><Autocomplete options={employeeHubs} getOptionLabel={(option) => option.employee_hub_name || ''} value={employeeHubs.find(h => h.employee_hub_id == currentEmployee.employee_hub_id) || null} onChange={(e, nv) => setCurrentEmployee(prev => ({ ...prev, employee_hub_id: nv ? nv.employee_hub_id : "" }))} isOptionEqualToValue={(option, value) => option.employee_hub_id == value.employee_hub_id} disabled={!currentEmployee.state_id} renderInput={(params) => (<TextField {...params} label="holiday Hub" />)} /></Grid>
//                         <Grid item xs={12} sm={6}><Autocomplete options={headquarters} getOptionLabel={(option) => option.headquarter_name || ''} value={headquarters.find(h => h.headquarter_id == currentEmployee.headquarter_id) || null} onChange={(e, nv) => setCurrentEmployee(prev => ({ ...prev, headquarter_id: nv ? nv.headquarter_id : "" }))} isOptionEqualToValue={(option, value) => option.headquarter_id == value.headquarter_id} renderInput={(params) => (<TextField {...params} label="Headquarter" />)} /></Grid>
//                         <Grid item xs={12} sm={6}><Autocomplete options={divisions} getOptionLabel={(option) => option.division_name || ''} value={divisions.find(d => d.division_id == currentEmployee.division_id) || null} onChange={(e, nv) => handleDivisionChange(nv)} isOptionEqualToValue={(option, value) => option.division_id == value.division_id} renderInput={(params) => (<TextField {...params} label="Division" />)} /></Grid>
//                         <Grid item xs={12} sm={6}><Autocomplete options={subDivisionOptions} getOptionLabel={(option) => option.label || ''} value={subDivisionOptions.find(sd => sd.value === currentEmployee.subDivision) || null} onChange={(e, nv) => setCurrentEmployee(prev => ({ ...prev, subDivision: nv ? nv.value : "" }))} isOptionEqualToValue={(option, value) => option.value === value.value} disabled={isSubDivisionDisabled} renderInput={(params) => (<TextField {...params} label="Sub Division" />)} /></Grid>
//                         <Grid item xs={12} sm={6}><Autocomplete options={allEmployeesForDropdown} getOptionLabel={(option) => option.label ? `${option.label} (${option.emp_id})` : ''} value={allEmployeesForDropdown.find(e => e.value == currentEmployee.manager_id) || null} onChange={(e, nv) => setCurrentEmployee(prev => ({ ...prev, manager_id: nv ? nv.value : "" }))} isOptionEqualToValue={(option, value) => option.value == value.value} renderInput={(params) => (<TextField {...params} label="Manager" />)} /></Grid>
//                         <Grid item xs={12} sm={6}><Autocomplete options={departments} getOptionLabel={(option) => option.dept_name || ''} value={departments.find(d => d.dept_id == currentEmployee.department_id) || null} onChange={(e, nv) => handleDeptChange(nv)} isOptionEqualToValue={(option, value) => option.dept_id == value.dept_id} renderInput={(params) => (<TextField {...params} label="Department" />)} /></Grid>
//                         <Grid item xs={12} sm={6}><Autocomplete options={designations} getOptionLabel={(option) => option.desig_name || ''} value={designations.find(d => d.desig_id == currentEmployee.designation_id) || null} onChange={(e, nv) => setCurrentEmployee(prev => ({ ...prev, designation_id: nv ? nv.desig_id : "" }))} isOptionEqualToValue={(option, value) => option.desig_id == value.desig_id} disabled={!currentEmployee.department_id} renderInput={(params) => (<TextField {...params} label="Designation" />)} /></Grid>
//                         <Grid item xs={12} sm={6}><Autocomplete options={officeShifts} getOptionLabel={(option) => option.office_shift_name || ''} value={officeShifts.find(s => s.office_shift_id == currentEmployee.officeShift) || null} onChange={(e, nv) => setCurrentEmployee(prev => ({ ...prev, officeShift: nv ? nv.office_shift_id : "" }))} isOptionEqualToValue={(option, value) => option.office_shift_id == value.office_shift_id} renderInput={(params) => (<TextField {...params} label="Office Shift" />)} /></Grid>
//                         <Grid item xs={12} sm={6}><Autocomplete options={statusOptions} getOptionLabel={(option) => option.label} value={statusOptions.find(s => s.value === currentEmployee.status) || null} onChange={(e, nv) => setCurrentEmployee(prev => ({ ...prev, status: nv ? nv.value : 1 }))} isOptionEqualToValue={(option, value) => option.value === value.value} renderInput={(params) => (<TextField {...params} label="Status" />)} /></Grid>
//                         <Grid item xs={12} sm={6}><Autocomplete options={probationOptions} getOptionLabel={(option) => option.label} value={probationOptions.find(p => p.value === currentEmployee.is_probation) || null} onChange={(e, nv) => setCurrentEmployee(prev => ({ ...prev, is_probation: nv ? nv.value : "n" }))} isOptionEqualToValue={(option, value) => option.value === value.value} renderInput={(params) => (<TextField {...params} label="On Probation" />)} /></Grid>
//                         <Grid item xs={12} sm={6}><TextField fullWidth label="Join Date" name="join_date" type="date" value={currentEmployee.join_date || ""} onChange={handleInputChange} InputLabelProps={{ shrink: true }} /></Grid>
//                         <Grid item xs={12} sm={6}><Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}><Button variant="contained" component="label" disabled={isEditMode} sx={purpleButtonSx}>Upload Photo<input type="file" hidden accept="image/*" onChange={handleFileUpload} /></Button>{currentEmployee.avatar && <Avatar src={typeof currentEmployee.avatar === 'string' ? currentEmployee.avatar : URL.createObjectURL(currentEmployee.avatar)} sx={{ width: 56, height: 56 }} />}</Box></Grid>
//                         <Grid item xs={12}>{isFetchingDocs && <CircularProgress />}{employeeDocuments && !isFetchingDocs && (<Box><Typography variant="subtitle1" gutterBottom>Fetched Documents</Typography><Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>{Object.entries(employeeDocuments).map(([name, url]) => (url ? (<Chip key={name} label={name.replace(/_/g, ' ')} component="a" href={url} target="_blank" clickable icon={<LinkIcon />} variant="outlined" color="secondary" size="small" />) : null))}</Box></Box>)}</Grid>
//                         {!isEditMode && (<>
//                             <Grid item xs={12} sm={6}><Autocomplete options={genderOptions} getOptionLabel={(option) => option.label} value={genderOptions.find(g => g.value === currentEmployee.gender) || null} onChange={(e, nv) => setCurrentEmployee(prev => ({ ...prev, gender: nv ? nv.value : "" }))} isOptionEqualToValue={(option, value) => option.value === value.value} renderInput={(params) => (<TextField {...params} label="Gender" />)} /></Grid>
//                             <Grid item xs={12} sm={6}><TextField fullWidth label="Username" name="username" value={currentEmployee.username || ""} onChange={handleInputChange} InputProps={{ readOnly: true }} /></Grid>
//                             <Grid item xs={12} sm={6}><TextField fullWidth label="Password" name="password" value={currentEmployee.password || ""} onChange={handleInputChange} type={showPassword ? 'text' : 'password'} InputProps={{ endAdornment: (<InputAdornment position="end"> <IconButton aria-label="toggle password visibility" onClick={() => setShowPassword((prev) => !prev)} onMouseDown={(e) => e.preventDefault()} edge="end"> {showPassword ? <VisibilityOff /> : <Visibility />} </IconButton> </InputAdornment>) }} /></Grid>
//                             <Grid item xs={12} sm={6}><Autocomplete options={roles} getOptionLabel={(option) => option.role_name || ''} value={roles.find(r => r.index == currentEmployee.role) || null} onChange={(e, nv) => setCurrentEmployee(prev => ({ ...prev, role: nv ? nv.index : "" }))} isOptionEqualToValue={(option, value) => option.index == value.index} renderInput={(params) => (<TextField {...params} label="Role" />)} /></Grid>
//                             <Grid item xs={12} sm={6} md={3}><TextField fullWidth label="Gross Salary monthly" name="grossSalary" type="number" value={currentEmployee.grossSalary || ""} onChange={(e) => { const value = e.target.value; if (/^\d*\.?\d*$/.test(value)) handleInputChange(e); }} /></Grid>
//                             <Grid item xs={12} sm={6} md={3}><TextField fullWidth label="Gross Salary Yearly" name="grossSalaryYearly" type="number" value={currentEmployee.grossSalaryYearly || ""} InputProps={{ readOnly: true }} /></Grid>
//                             <Grid item xs={12} sm={6} md={3}><TextField fullWidth label="CTC Monthly" name="ctcMonthly" type="number" value={currentEmployee.ctcMonthly || ""} InputProps={{ readOnly: true }} /></Grid>
//                             <Grid item xs={12} sm={6} md={3}><TextField fullWidth label="CTC Yearly" name="ctcYearly" type="number" value={currentEmployee.ctcYearly || ""} InputProps={{ readOnly: true }} /></Grid>
//                         </>)}
//                     </Grid>
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={() => setOpenEmployeeForm(false)} disabled={isSaving} sx={cancelButtonSx}>Cancel</Button>
//                     <Button onClick={handleSaveEmployee} variant="contained" disabled={isSaving} sx={purpleButtonSx}>{isSaving ? <CircularProgress size={24} color="inherit" /> : "Save"}</Button>
//                 </DialogActions>
//             </Dialog>
            
//             <TableContainer>
//                 <Table sx={{ minWidth: "100%", whiteSpace: "nowrap" }}>
//                     <TableHead>
//                         <TableRow sx={{ bgcolor: themePurple }}>
//                             <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>SR. NO.</TableCell>
//                             <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>EMPLOYEE</TableCell>
//                             <TableCell sx={{ color: 'white' }}></TableCell>
//                             <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>DEPARTMENT</TableCell>
//                             <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>DESIGNATION</TableCell>
//                             <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>JOIN DATE</TableCell>
//                             <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>STATUS</TableCell>
//                             <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>MANAGER</TableCell>
//                             <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', color: 'white' }}>ACTIONS</TableCell>
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {loading ? (
//                             Array.from(new Array(rowsPerPage)).map((_, index) => (
//                                 <TableRow key={index}>
//                                     <TableCell><Skeleton variant="text" /></TableCell>
//                                     <TableCell><Skeleton variant="text" /></TableCell>
//                                     <TableCell><Skeleton variant="text" /></TableCell>
//                                     <TableCell><Skeleton variant="text" /></TableCell>
//                                     <TableCell><Skeleton variant="text" /></TableCell>
//                                     <TableCell><Skeleton variant="text" /></TableCell>
//                                     <TableCell><Skeleton variant="text" /></TableCell>
//                                     <TableCell><Skeleton variant="text" /></TableCell>
//                                     <TableCell align="center"><Skeleton variant="rectangular" width={80} height={30} /></TableCell>
//                                 </TableRow>
//                             ))
//                         ) : (
//                             (rowsPerPage > 0
//                                 ? filteredEmployees.slice(currentPage * rowsPerPage, currentPage * rowsPerPage + rowsPerPage)
//                                 : filteredEmployees
//                             ).map((employee, index) => (
//                                 <TableRow key={employee.user_id} sx={{ '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' } }} onMouseEnter={() => setHoveredRowId(employee.user_id)} onMouseLeave={() => setHoveredRowId(null)}>
//                                     <TableCell sx={{ fontSize: '0.95rem' }}>{currentPage * rowsPerPage + index + 1}</TableCell>
//                                     <TableCell sx={{ fontSize: '0.95rem' }}>{employee.employee_name}</TableCell>
//                                     <TableCell sx={{ padding: '0 8px', textAlign: 'center' }}>
//                                         {hoveredRowId === employee.user_id && <IconButton onClick={() => handleArrowClick(employee.user_id)} size="small" sx={{ color: themeOrange }}><ArrowForwardIcon fontSize="small" /></IconButton>}
//                                     </TableCell>
//                                     <TableCell sx={{ fontSize: '0.95rem' }}>{employee.department_name || 'N/A'}</TableCell>
//                                     <TableCell sx={{ fontSize: '0.95rem' }}>{employee.designation_name || 'N/A'}</TableCell>
//                                     <TableCell sx={{ fontSize: '0.95rem' }}>{formatDate(employee.join_date)}</TableCell>
//                                     <TableCell sx={{ fontSize: '0.95rem' }}>
//                                         <Chip label={employee.status === 1 ? "Active" : "Inactive"} size="small" sx={{
//                                             bgcolor: employee.status === 1 ? '#4caf50' : themeOrange,
//                                             color: 'white',
//                                             borderRadius: '16px',
//                                             height: '24px',
//                                         }} />
//                                     </TableCell>
//                                     <TableCell sx={{ fontSize: '0.95rem' }}>{employee.manager}</TableCell>
//                                     <TableCell>
//                                         <Box display="flex" justifyContent="center" gap={0.5}>
//                                             <Tooltip title="Edit"><IconButton onClick={() => handleEditEmployee(employee)} sx={{ color: themePurple }}><EditIcon /></IconButton></Tooltip>
//                                             <Tooltip title="Delete"><IconButton onClick={() => handleDeleteEmployee(employee.user_id)} sx={{ color: themeOrange }}><DeleteIcon /></IconButton></Tooltip>
//                                         </Box>
//                                     </TableCell>
//                                 </TableRow>
//                             ))
//                         )}
//                     </TableBody>
//                 </Table>
//             </TableContainer>

//             <Box sx={{ p: 2, borderTop: '1px solid rgba(224, 224, 224, 1)' }}>
//                 {loading ? (
//                     <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                         <Skeleton variant="text" width={150} />
//                         <Skeleton variant="rectangular" width={400} height={40} />
//                     </Box>
//                 ) : (
//                     <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
//                         <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//                             <FormControl variant="outlined" size="small">
//                                 <Select
//                                     value={rowsPerPage}
//                                     onChange={handleRowsPerPageChange}
//                                     sx={{
//                                         backgroundColor: themePurple,
//                                         color: 'white',
//                                         borderRadius: '4px',
//                                         transition: 'background-color 0.3s',
//                                         '&:hover': {
//                                             backgroundColor: themePurpleHover,
//                                         },
//                                         '& .MuiOutlinedInput-notchedOutline': {
//                                             border: 'none',
//                                         },
//                                         '& .MuiSvgIcon-root': {
//                                             color: 'white',
//                                         },
//                                     }}
//                                 >
//                                     {[10, 25, 50, 100].map((value) => (
//                                         <MenuItem key={value} value={value}>{value}</MenuItem>
//                                     ))}
//                                 </Select>
//                             </FormControl>
//                             <Typography variant="body2" color="text.secondary">
//                                 {`1 to ${Math.min(rowsPerPage, filteredEmployees.length)} of ${filteredEmployees.length}`}
//                             </Typography>
//                         </Box>

//                         <Pagination
//                             count={Math.ceil(filteredEmployees.length / rowsPerPage)}
//                             page={currentPage + 1}
//                             onChange={handlePaginationChange}
//                             showFirstButton
//                             showLastButton
//                             sx={{
//                                 '& .MuiPaginationItem-root': {
//                                     borderRadius: '4px',
//                                     transition: 'background-color 0.3s, color 0.3s',
//                                     '&:hover': {
//                                         backgroundColor: themeOrange,
//                                         color: 'white',
//                                     }
//                                 },
//                                 '& .MuiPaginationItem-page': {
//                                     color: themePurple,
//                                     '&.Mui-selected': {
//                                         backgroundColor: themePurple,
//                                         color: 'white',
//                                         '&:hover': {
//                                             backgroundColor: themeOrange,
//                                         }
//                                     },
//                                 },
//                                 '& .MuiPaginationItem-icon': {
//                                     color: themePurple,
//                                 }
//                             }}
//                         />
//                     </Box>
//                 )}
//             </Box>
//         </Box>
//     );
// }








// import React, { useState, useEffect, useMemo, useCallback, useRef } from "react";
// import axios from 'axios';
// import {
//     Box,
//     Typography,
//     Button,
//     Paper,
//     Table,
//     TableBody,
//     TableCell,
//     TableContainer,
//     TableHead,
//     TableRow,
//     TextField,
//     FormControl,
//     InputLabel,
//     Select,
//     MenuItem,
//     Avatar,
//     Chip,
//     IconButton,
//     Tooltip,
//     Dialog,
//     DialogTitle,
//     DialogContent,
//     DialogActions,
//     Grid,
//     CircularProgress,
//     Autocomplete,
//     InputAdornment,
//     useTheme,
//     useMediaQuery,
//     Skeleton,
//     Pagination,
// } from "@mui/material";
// import {
//     Edit as EditIcon,
//     Delete as DeleteIcon,
//     Add as AddIcon,
//     Close as CloseIcon,
//     Download as DownloadIcon,
//     ArrowForward as ArrowForwardIcon,
//     SupervisorAccount as ChangeManagerIcon,
//     Link as LinkIcon,
//     Visibility,
//     VisibilityOff,
//     Search as SearchIcon,
// } from "@mui/icons-material";
// import * as XLSX from "xlsx";
// import { useNavigate } from "react-router-dom";
// import axiosInstance from "../../utils/axiosInstance";
// import Swal from 'sweetalert2';

// const RESUME_BASE_URL = "https://raasbackend.vetrinahealthcare.com/";
// const statusOptions = [{ value: 1, label: 'Active' }, { value: 0, label: 'Inactive' }];
// const probationOptions = [{ value: 'y', label: 'Yes' }, { value: 'n', label: 'No' }];
// const genderOptions = [{ value: 'Male', label: 'Male' }, { value: 'Female', 'label': 'Female' }, { value: 'Other', label: 'Other' }];
// const subDivisionOptions = [{ value: 'VetBiz', label: 'VetBiz' }, { value: 'TredBiz', label: 'TredBiz' }, { value: ' ', label: 'TredBiz Mix' }];

// export default function EmployeesView() {
//     const employeeDialogRef = useRef(null);
//     const changeManagerDialogRef = useRef(null);
//     const muiTheme = useTheme();
//     const isMobile = useMediaQuery(muiTheme.breakpoints.down("sm"));
//     const themePurple = '#8C257C';
//     const themePurpleHover = '#6d1d60';
//     const themeOrange = '#F58E35';

//     const purpleButtonSx = {
//         backgroundColor: themePurple,
//         color: 'white',
//         '&:hover': {
//             backgroundColor: themePurpleHover,
//         },
//     };
//     const cancelButtonSx = {
//         color: '#757575',
//         '&:hover': {
//             backgroundColor: 'rgba(0, 0, 0, 0.04)'
//         }
//     };

//     const [loading, setLoading] = useState(true);
//     const [departments, setDepartments] = useState([]);
//     const [designations, setDesignations] = useState([]);
//     const [searchTerm, setSearchTerm] = useState("");
//     const [openChangeManagerForm, setOpenChangeManagerForm] = useState(false);
//     const [currentPage, setCurrentPage] = useState(0);
//     const [rowsPerPage, setRowsPerPage] = useState(10);
//     const [newManager, setNewManager] = useState("");
//     const [selectedEmployeeForManagerChange, setSelectedEmployeeForManagerChange] = useState("");
//     const [employees, setEmployees] = useState([]);
//     const [hoveredRowId, setHoveredRowId] = useState(null);
//     const [officeShifts, setOfficeShifts] = useState([]);
//     const [isEditMode, setIsEditMode] = useState(false);
//     const [roles, setRoles] = useState([]);
//     const [countries, setCountries] = useState([]);
//     const [states, setStates] = useState([]);
//     const [employeeHubs, setEmployeeHubs] = useState([]);
//     const [headquarters, setHeadquarters] = useState([]);
//     const [divisions, setDivisions] = useState([]);
//     const [allEmployeesForDropdown, setAllEmployeesForDropdown] = useState([]);
//     const [talentPool, setTalentPool] = useState([]);
//     const [isFetchingDocs, setIsFetchingDocs] = useState(false);
//     const [employeeDocuments, setEmployeeDocuments] = useState(null);
//     const [showPassword, setShowPassword] = useState(false);
//     const [isSaving, setIsSaving] = useState(false);

//     const [currentEmployee, setCurrentEmployee] = useState({
//         id: null, firstName: "", middleName: "", lastName: "", email: "", join_date: "",
//         status: 1, phone: "", avatar: null, country_id: "", state_id: "", employee_hub_id: "",
//         headquarter_id: "", division_id: "", subDivision: "", role: "", is_probation: "n",
//         resumeUrl: "", password: "", gender: "", username: "", grossSalary: "", department_id: "",
//         designation_id: "", manager_id: "", officeShift: "", grossSalaryYearly: "", ctcMonthly: "", ctcYearly: "",
//     });

//     const [openEmployeeForm, setOpenEmployeeForm] = useState(false);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const [ depts, empDropdown, shifts, countriesRes, hubs, divs, rolesRes, talent,headquartersRes ] = await Promise.all([
//                     axiosInstance.get('api/desig_dept_dropdown/'),
//                     axiosInstance.get('employee-dropdown/'),
//                     axiosInstance.get('api/office_shift_dropdown/'),
//                     axiosInstance.get('api/countries/'),
//                     axiosInstance.get('api/employee_hub/'),
//                     axiosInstance.get('api/division/'),
//                     axiosInstance.get('api/role_list/'),
//                     axiosInstance.get('api/search_by_email_vet_talent/'),
//                     axios.get("https://tdtlworld.com/hrms-backend/api/headquarters/")
//                 ]);
//                 setDepartments(depts.data.dept_data || []);
//                 setAllEmployeesForDropdown(empDropdown.data || []);
//                 setOfficeShifts(shifts.data.office_shift_data || []);
//                 if (countriesRes.data.status === 'success') setCountries(countriesRes.data.data || []);
//                 setDivisions(divs.data || []);
//                 if (rolesRes.data?.status === "success") setRoles(rolesRes.data.data);
//                 setHeadquarters(headquartersRes.data || []);
//                 setTalentPool(talent.data.data || []);
//             } catch (error) {
//                 console.error("Error fetching initial data:", error);
//                 Swal.fire({ icon: 'error', title: 'Error', text: 'Failed to fetch initial data.', timer: 3000, showConfirmButton: false });
//             }
//         };
//         fetchData();
//     }, []);

//     const fetchEmployees = useCallback(() => {
//         setLoading(true);
//         axiosInstance.get('api/employee_details/')
//             .then((response) => setEmployees(Array.isArray(response.data.data) ? response.data.data : []))
//             .catch((error) => {
//                 console.error('Error fetching employees:', error);
//                 setEmployees([]);
//                 Swal.fire({ icon: 'error', title: 'Error', text: 'Failed to fetch employee list.', timer: 3000, showConfirmButton: false });
//             })
//             .finally(() => setLoading(false));
//     }, []);

//     useEffect(() => { fetchEmployees(); }, [fetchEmployees]);
    
//     useEffect(() => {
//         const grossSalaryMonthly = parseFloat(currentEmployee.grossSalary);
//         if (!isNaN(grossSalaryMonthly) && grossSalaryMonthly > 0) {
//             const yearlyGross = grossSalaryMonthly * 12;
//             const basicSalary = grossSalaryMonthly * 0.5;
//             const employerPF = basicSalary * 0.12;
//             const employerESI = grossSalaryMonthly <= 21000 ? grossSalaryMonthly * 0.0325 : 0;
//             const monthlyCTC = grossSalaryMonthly + employerPF + employerESI;
//             const yearlyCTC = monthlyCTC * 12;
    
//             setCurrentEmployee(prev => ({
//                 ...prev,
//                 grossSalaryYearly: yearlyGross.toFixed(2),
//                 ctcMonthly: monthlyCTC.toFixed(2),
//                 ctcYearly: yearlyCTC.toFixed(2),
//             }));
//         } else {
//             setCurrentEmployee(prev => ({
//                 ...prev,
//                 grossSalaryYearly: "",
//                 ctcMonthly: "",
//                 ctcYearly: "",
//             }));
//         }
//     }, [currentEmployee.grossSalary]);

//     const handleCountryChange = (selectedCountry) => {
//         const countryId = selectedCountry ? selectedCountry.country_id : "";
//         const countryName = selectedCountry ? selectedCountry.country_name : null;
//         setCurrentEmployee(prev => ({ ...prev, country_id: countryId, state_id: "", employee_hub_id: "" }));
//         setStates([]);
//         setEmployeeHubs([]);
//         if (countryName) {
//             axiosInstance.get(`api/states/?country_name=${countryName}`)
//                 .then(res => { if (res.data.status === "success") setStates(res.data.data || []); })
//                 .catch(err => {
//                     console.error("Error fetching states:", err);
//                     Swal.fire({ icon: 'error', title: 'Error', text: 'Failed to fetch states.', target: employeeDialogRef.current, timer: 3000, showConfirmButton: false });
//                 });
//         }
//     };

//     const handleStateChange = (selectedState) => {
//         const stateId = selectedState ? selectedState.state_id : "";
//         setCurrentEmployee(prev => ({ ...prev, state_id: stateId, employee_hub_id: "" }));
//         setEmployeeHubs([]);
//         if (stateId) {
//             axiosInstance.get(`api/employee_hub_dropdown/${stateId}/`)
//                 .then(res => { if (res.data.status === "success") setEmployeeHubs(res.data.data || []); })
//                 .catch(err => {
//                     console.error("Error fetching employee hubs:", err);
//                     Swal.fire({ icon: 'error', title: 'Error', text: 'Failed to fetch holiday hubs.', target: employeeDialogRef.current, timer: 3000, showConfirmButton: false });
//                 });
//         }
//     };

//     const handleDeptChange = (selectedDept) => {
//         const deptId = selectedDept ? selectedDept.dept_id : "";
//         setCurrentEmployee((prev) => ({ ...prev, department_id: deptId, designation_id: "" }));
//         if (deptId) {
//             axiosInstance.get(`api/desig_dept_dropdown/?dept_id=${deptId}/`)
//                 .then((res) => setDesignations(res.data.desig_data || []))
//                 .catch((err) => {
//                     console.error("Error fetching designations:", err);
//                     Swal.fire({ icon: 'error', title: 'Error', text: 'Failed to load designations.', target: employeeDialogRef.current, timer: 3000, showConfirmButton: false });
//                 });
//         } else {
//             setDesignations([]);
//         }
//     };

//     const handleDivisionChange = (selectedDivision) => {
//         const divisionId = selectedDivision ? selectedDivision.division_id : "";
//         if (selectedDivision && selectedDivision.division_name !== 'Livestock') {
//             setCurrentEmployee(prev => ({ ...prev, division_id: divisionId, subDivision: "" }));
//         } else {
//             setCurrentEmployee(prev => ({ ...prev, division_id: divisionId }));
//         }
//     };

//     const handleChangeManager = async () => {
//         if (!selectedEmployeeForManagerChange || !newManager) {
//             Swal.fire({ icon: 'warning', title: 'Incomplete Selection', text: 'Please select an employee and a new manager.', target: changeManagerDialogRef.current });
//             return;
//         }
//         try {
//             await axiosInstance.put("api/change_manager/", { user_id: selectedEmployeeForManagerChange, manager_id: newManager });
//             await fetchEmployees();
//             Swal.fire({ icon: 'success', title: 'Success', text: 'Manager changed successfully!', timer: 3000, showConfirmButton: false });
//             setOpenChangeManagerForm(false);
//             setSelectedEmployeeForManagerChange("");
//             setNewManager("");
//         } catch (error) {
//             console.error("Error changing manager:", error);
//             Swal.fire({ icon: 'error', title: 'Operation Failed', text: `Error changing manager: ${error.response?.data?.message || "An error occurred."}`, target: changeManagerDialogRef.current });
//         }
//     };

//     const navigate = useNavigate();
//     const handleArrowClick = (id) => navigate(`/hrms/admindashboard/employeedetail/${id}`);

//     const handleInputChange = (event) => {
//         const { name, value } = event.target;
//         setCurrentEmployee((prev) => ({ ...prev, [name]: value }));
//     };

//     const handleAddEmployee = async () => {
//         try {
//             const maxIdResponse = await axios.get("https://tdtlworld.com/hrms-backend/api/get_max_employee_id/");
//             const newEmpId = maxIdResponse.data.employee_id;
//             setCurrentEmployee({
//                 emp_id: newEmpId, firstName: "", middleName: "", lastName: "", email: "", phone: "",
//                 avatar: null, officeShift: "", status: 1, join_date: "", gender: "", username: newEmpId, password: "",
//                 role: "", grossSalary: "", department_id: "", designation_id: "", manager_id: "",
//                 country_id: "", state_id: "", employee_hub_id: "", headquarter_id: "", division_id: "",
//                 company_id: 2, is_probation: "n", resumeUrl: "", subDivision: "", grossSalaryYearly: "", ctcMonthly: "", ctcYearly: "",
//             });
//             setDesignations([]); setStates([]); setEmployeeHubs([]); setEmployeeDocuments(null);
//             setIsEditMode(false); setShowPassword(false); setOpenEmployeeForm(true);
//         } catch (error) {
//             console.error("Error fetching max employee ID:", error);
//             Swal.fire({ icon: 'error', title: 'Error', text: 'Failed to initialize employee form.', timer: 3000, showConfirmButton: false });
//         }
//     };

//     const handleTalentSelect = async (event, selectedOption) => {
//         setEmployeeDocuments(null);
//         setCurrentEmployee(prev => ({ ...prev, resumeUrl: "" }));
//         if (!selectedOption) {
//             setCurrentEmployee(prev => ({ ...prev, firstName: "", middleName: "", lastName: "", email: "", phone: "", gender: "", country_id: "", state_id: "" }));
//             return;
//         }
//         const talent = talentPool.find(p => p.email === selectedOption.email);
//         if (!talent) return;

//         const selectedCountry = countries.find(c => c.country_name === talent.country);
//         const resumeLink = talent.resume ? `${RESUME_BASE_URL}${talent.resume}` : "";

//         setCurrentEmployee(prev => ({
//             ...prev, firstName: talent.first_name || "", middleName: talent.middle_name || "",
//             lastName: talent.last_name || "", email: talent.email || "", phone: talent.phone || "",
//             gender: talent.gender || "", country_id: selectedCountry ? selectedCountry.country_id : "",
//             state_id: '', employee_hub_id: '', resumeUrl: resumeLink,
//         }));

//         if (selectedCountry) {
//             try {
//                 const statesRes = await axiosInstance.get(`api/states/?country_name=${selectedCountry.country_name}`);
//                 if (statesRes.data.status === "success") {
//                     const fetchedStates = statesRes.data.data || [];
//                     setStates(fetchedStates);
//                     const selectedState = fetchedStates.find(s => s.state_name === talent.state);
//                     if (selectedState) {
//                         setCurrentEmployee(prev => ({ ...prev, state_id: selectedState.state_id }));
//                         const hubsRes = await axiosInstance.get(`api/employee_hub_dropdown/${selectedState.state_id}/`);
//                         if (hubsRes.data.status === "success") setEmployeeHubs(hubsRes.data.data || []);
//                     }
//                 }
//             } catch (err) { console.error("Error fetching dependent data for talent:", err); }
//         }

//         setIsFetchingDocs(true);
//         try {
//             const docResponse = await axios.post('https://raasbackend.vetrinahealthcare.com/fetch_documents/', { email_id: talent.email });
//             setEmployeeDocuments(docResponse.data.status === 'success' && docResponse.data.documents ? docResponse.data.documents : null);
//         } catch (error) {
//             console.error("Error fetching documents:", error);
//             setEmployeeDocuments(null);
//         } finally {
//             setIsFetchingDocs(false);
//         }
//     };

//     const handleEditEmployee = async (employee) => {
//         if (!employee || !employee.user_id) return;
//         try {
//             const response = await axiosInstance.get(`api/edit_employee/${employee.user_id}/`);
//             if (response.data.status !== "success" || response.data.data.length === 0) {
//                 Swal.fire({ icon: 'error', title: 'Error', text: 'Failed to load employee details.', timer: 3000, showConfirmButton: false });
//                 return;
//             }
//             const empData = response.data.data[0];
//             const [desigRes, statesRes, hubsRes] = await Promise.all([
//                 axiosInstance.get(`api/desig_dept_dropdown/?dept_id=${empData.department_id}/`),
//                 empData.country_name ? axiosInstance.get(`api/states/?country_name=${empData.country_name}`) : Promise.resolve({ data: { data: [] } }),
//                 empData.state ? axiosInstance.get(`api/employee_hub_dropdown/${empData.state}/`) : Promise.resolve({ data: { data: [] } })
//             ]);

//             setDesignations(desigRes.data.desig_data || []);
//             setStates(statesRes.data.data || []);
//             setEmployeeHubs(hubsRes.data.data || []);
            
//             const officeShiftObj = officeShifts.find(s => s.office_shift_name === empData.office_shift);
//             const nameParts = (empData.emp_name || "").split(" ");
//             const selectedCountry = countries.find(c => c.country_name === empData.country_name);
//             const selectedHeadquarter = headquarters.find(hq => hq.headquarter_name === empData.headquarter);

//             let finalSubDivisionValue = empData.sub_division || "";
//             if (finalSubDivisionValue === "Tred") {
//                 finalSubDivisionValue = "TredBiz";
//             }

//             setCurrentEmployee({
//                 id: employee.user_id,
//                 firstName: nameParts[0] || "",
//                 middleName: nameParts.length > 2 ? nameParts.slice(1, -1).join(" ") : "",
//                 lastName: nameParts.length > 1 ? nameParts[nameParts.length - 1] : "",
//                 email: empData.email || "", phone: empData.phone || "",
//                 manager_id: empData.manager_id ? Number(empData.manager_id) : "",
//                 designation_id: empData.designation_id ? Number(empData.designation_id) : "",
//                 department_id: empData.department_id ? Number(empData.department_id) : "",
//                 headquarter_id: selectedHeadquarter ? selectedHeadquarter.headquarter_id : "",
//                 subDivision: finalSubDivisionValue,
//                 division_id: empData.division_id ? Number(empData.division_id) : "",
//                 state_id: empData.state ? Number(empData.state) : "",
//                 employee_hub_id: empData.employee_hub_id ? Number(empData.employee_hub_id) : "",
//                 role: empData.role_id ? Number(empData.role_id) : "",
//                 officeShift: officeShiftObj ? Number(officeShiftObj.office_shift_id) : "",
//                 status: Number(empData.status),
//                 join_date: empData.join_date ? empData.join_date.split(" ")[0] : "",
//                 country_id: selectedCountry ? Number(selectedCountry.country_id) : "",
//                 avatar: empData.profile_photo || "",
//                 is_probation: empData.probation?.toLowerCase() === 'y' ? 'y' : 'n',
//                 resumeUrl: "",
//             });

//             setIsEditMode(true);
//             setOpenEmployeeForm(true);
//             setShowPassword(false);
//         } catch (error) {
//             console.error("Error fetching employee details for edit:", error);
//             Swal.fire({ icon: 'error', title: 'Error', text: 'Failed to fetch complete employee details.', timer: 3000, showConfirmButton: false });
//         }
//     };

//     const handleSaveEmployee = async () => {
//         if (!isEditMode) {
//             const requiredFields = {
//                 firstName: 'First Name', lastName: 'Last Name', email: 'Email', phone: 'Phone', country_id: 'Country',
//                 state_id: 'State', employee_hub_id: 'holiday Hub', headquarter_id: 'Headquarter', division_id: 'Division',
//                 manager_id: 'Manager', department_id: 'Department', designation_id: 'Designation', officeShift: 'Office Shift',
//                 join_date: 'Join Date', avatar: 'Photo', gender: 'Gender', username: 'Username', password: 'Password',
//                 role: 'Role', grossSalary: 'Gross Salary'
//             };
//             const selectedDivision = divisions.find(d => d.division_id == currentEmployee.division_id);
//             if (selectedDivision && selectedDivision.division_name === 'Livestock' && !currentEmployee.subDivision) {
//                 Swal.fire({ icon: 'error', title: 'Validation Error', text: 'Sub Division is required when Division is Livestock.', target: employeeDialogRef.current });
//                 return;
//             }
//             for (const field in requiredFields) {
//                 if (!currentEmployee[field]) {
//                     Swal.fire({ icon: 'error', title: 'Validation Error', text: `The field "${requiredFields[field]}" is required.`, target: employeeDialogRef.current });
//                     return;
//                 }
//             }
//         }
//         const formData = new FormData();
//         const keyMap = {
//             firstName: 'first_name',
//             middleName: 'middle_name',
//             lastName: 'last_name',
//             officeShift: 'office_shift',
//             join_date: 'join_date',
//             grossSalary: 'gross_salary',
//             headquarter_id: 'headquarter_id',
//             grossSalaryYearly: 'gross_salary_yearly',
//             ctcMonthly: 'ctc_monthly',
//             ctcYearly: 'ctc_yearly',
//         };
//         Object.keys(currentEmployee).forEach(key => {
//             if (key === 'avatar' && currentEmployee.avatar instanceof File) {
//                 formData.append("file", currentEmployee.avatar);
//             } else if (key !== 'resumeUrl' && currentEmployee[key] !== null && currentEmployee[key] !== undefined && currentEmployee[key] !== "") {
//                 const backendKey = keyMap[key] || key;
//                 formData.append(backendKey, currentEmployee[key]);
//             }
//         });

//         setIsSaving(true);
//         try {
//             const action = isEditMode ? 'updated' : 'added';
//             if (isEditMode) {
//                 formData.append("user_id", currentEmployee.id);
//                 await axiosInstance.put("api/edit_employee/", formData, { headers: { "Content-Type": "multipart/form-data" } });
//             } else {
//                 await axiosInstance.post("api/add_employee/", formData, { headers: { "Content-Type": "multipart/form-data" } });
//             }
//             setOpenEmployeeForm(false);
//             await fetchEmployees();
//             Swal.fire({ icon: 'success', title: 'Success', text: `Employee ${action} successfully!`, timer: 3000, showConfirmButton: false });

//         } catch (error) {
//             console.error("Error saving employee:", error);
//             const errorMessage = error.response?.data?.message || error.response?.data?.detail || "An unexpected error occurred.";
//             Swal.fire({ icon: 'error', title: `Operation failed`, text: `${errorMessage}`, target: employeeDialogRef.current });
//         } finally {
//             setIsSaving(false);
//         }
//     };

//     const handleDeleteEmployee = (employeeId) => {
//         if (!employeeId) return;
//         Swal.fire({
//             title: 'Are you sure?', text: "You won't be able to revert this!", icon: 'warning',
//             showCancelButton: true, confirmButtonColor: themePurple, cancelButtonColor: themeOrange,
//             confirmButtonText: 'Yes, delete it!'
//         }).then((result) => {
//             if (result.isConfirmed) {
//                 axiosInstance.delete("api/edit_employee/", { data: { user_id: employeeId } })
//                     .then(() => {
//                         fetchEmployees();
//                         Swal.fire({ icon: 'success', title: 'Deleted!', text: 'The employee has been deleted.', timer: 3000, showConfirmButton: false });
//                     })
//                     .catch((error) => {
//                         console.error("Error deleting employee: ", error);
//                         const errorMessage = error.response?.data?.message || error.response?.data?.detail || "Failed to delete employee.";
//                         Swal.fire({ icon: 'error', title: 'Error', text: errorMessage, timer: 3000, showConfirmButton: false });
//                     });
//             }
//         });
//     };

//     const handleExportEmployees = () => {
//         if (employees.length === 0) {
//             Swal.fire({ icon: 'info', title: 'Info', text: 'There is no employee data to export.', timer: 3000, showConfirmButton: false });
//             return;
//         }
//         const worksheet = XLSX.utils.json_to_sheet(employees);
//         const workbook = XLSX.utils.book_new();
//         XLSX.utils.book_append_sheet(workbook, worksheet, "Employees");
//         XLSX.writeFile(workbook, "EmployeesData.xlsx");
//     };

//     const sortedEmployees = useMemo(() => {
//         if (!Array.isArray(employees)) return [];
//         return [...employees].sort((a, b) => b.user_id - a.user_id);
//     }, [employees]);

//     const filteredEmployees = useMemo(() => sortedEmployees.filter(
//         (e) =>
//             (e.employee_name && e.employee_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
//             (e.department_name && e.department_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
//             (e.designation_name && e.designation_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
//             (e.join_date && e.join_date.toLowerCase().includes(searchTerm.toLowerCase())) ||
//             (e.manager && e.manager.toLowerCase().includes(searchTerm.toLowerCase()))
//     ), [sortedEmployees, searchTerm]);

//     const handlePaginationChange = (event, newPage) => {
//         setCurrentPage(newPage - 1);
//     };

//     const handleRowsPerPageChange = (event) => {
//         setRowsPerPage(parseInt(event.target.value, 10));
//         setCurrentPage(0);
//     };

//     const handleFileUpload = (e) => {
//         const file = e.target.files[0];
//         if (file) setCurrentEmployee((prev) => ({ ...prev, avatar: file }));
//     };

//     const isSubDivisionDisabled = useMemo(() => {
//         if (!currentEmployee.division_id) return true;
//         const selectedDivision = divisions.find(d => d.division_id == currentEmployee.division_id);
//         return !selectedDivision || selectedDivision.division_name !== 'Livestock';
//     }, [currentEmployee.division_id, divisions]);

//     const formatDate = (dateString) => {
//         if (!dateString) return '';
//         try {
//             const date = new Date(dateString);
//             const day = String(date.getDate()).padStart(2, '0');
//             const month = String(date.getMonth() + 1).padStart(2, '0');
//             const year = date.getFullYear();
//             return `${day}/${month}/${year}`;
//         } catch (error) {
//             console.error("Could not format date:", dateString);
//             return dateString.split(" ")[0];
//         }
//     };

//     return (
//         <Box component={Paper} p={3}>
//             <Typography variant="h4" sx={{ color: themePurple, fontWeight: "bold", mb: 5 }}>
//                 Employees List
//             </Typography>
//             <Box sx={{
//                 display: "flex",
//                 justifyContent: "space-between",
//                 alignItems: "center",
//                 flexDirection: isMobile ? "column" : "row",
//                 gap: 2,
//                 mb: 2
//             }}>
//                 <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
//                     <Button variant="contained" startIcon={<AddIcon />} onClick={handleAddEmployee} sx={purpleButtonSx}>Add Employee</Button>
//                     <Button variant="contained" startIcon={<DownloadIcon />} onClick={handleExportEmployees} sx={purpleButtonSx}>Export</Button>
//                     <Button variant="contained" startIcon={<ChangeManagerIcon />} onClick={() => setOpenChangeManagerForm(true)} sx={purpleButtonSx}>Change Manager</Button>
//                 </Box>
//                 <TextField
//                     size="small"
//                     placeholder="Search..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     sx={{ width: isMobile ? "100%" : "auto" }}
//                     InputProps={{
//                         startAdornment: (
//                             <InputAdornment position="start">
//                                 <SearchIcon />
//                             </InputAdornment>
//                         ),
//                     }}
//                 />
//             </Box>

//             <Dialog open={openChangeManagerForm} onClose={() => setOpenChangeManagerForm(false)} maxWidth="sm" fullWidth ref={changeManagerDialogRef}>
//                 <DialogTitle sx={{ color: themePurple, fontWeight: 'bold' }}>
//                     Change Manager
//                     <IconButton onClick={() => setOpenChangeManagerForm(false)} sx={{ position: "absolute", right: 8, top: 8, color: (theme) => theme.palette.grey[500] }}><CloseIcon /></IconButton>
//                 </DialogTitle>
//                 <DialogContent><Grid container spacing={2} sx={{ mt: 1 }}><Grid item xs={12}><FormControl fullWidth><InputLabel>Select Employee</InputLabel><Select value={selectedEmployeeForManagerChange} onChange={(e) => setSelectedEmployeeForManagerChange(e.target.value)} label="Select Employee">{allEmployeesForDropdown.map((emp) => (<MenuItem key={emp.value} value={emp.value}>{`${emp.label} (${emp.emp_id})`}</MenuItem>))}</Select></FormControl></Grid><Grid item xs={12}><FormControl fullWidth><InputLabel>Select New Manager</InputLabel><Select value={newManager} onChange={(e) => setNewManager(e.target.value)} label="Select New Manager">{allEmployeesForDropdown.map((emp) => (<MenuItem key={emp.value} value={emp.value}>{`${emp.label} (${emp.emp_id})`}</MenuItem>))}</Select></FormControl></Grid></Grid></DialogContent>
//                 <DialogActions>
//                     <Button onClick={() => setOpenChangeManagerForm(false)} sx={cancelButtonSx}>Cancel</Button>
//                     <Button onClick={handleChangeManager} variant="contained" sx={purpleButtonSx}>Save</Button>
//                 </DialogActions>
//             </Dialog>

//             <Dialog open={openEmployeeForm} onClose={() => setOpenEmployeeForm(false)} maxWidth="md" fullWidth ref={employeeDialogRef}>
//                 <DialogTitle sx={{ color: '#8C257C ', fontWeight: "bold", fontSize: '2rem' }}>
//                     {isEditMode ? "Edit Employee" : "Add Employee"}
//                     <IconButton onClick={() => setOpenEmployeeForm(false)} sx={{ position: "absolute", right: 8, top: 8, color: (theme) => theme.palette.grey[500] }}><CloseIcon /></IconButton>
//                 </DialogTitle>
//                 <DialogContent>
//                     <Grid container spacing={2} sx={{ mt: 1 }}>
//                         {!isEditMode && (<Grid item xs={12}><Autocomplete options={talentPool} getOptionLabel={(option) => option.email || ""} onChange={handleTalentSelect} onInputChange={(event, newInputValue) => { if (!talentPool.find(p => p.email === newInputValue)) { setCurrentEmployee(prev => ({ ...prev, email: newInputValue })); } }} renderInput={(params) => (<TextField {...params} label="Search Email to Auto-fill" />)} /></Grid>)}
//                         <Grid item xs={12} sm={4}><TextField fullWidth label="First Name" name="firstName" value={currentEmployee.firstName || ""} onChange={handleInputChange} onKeyPress={(e) => { if (!/^[A-Za-z]$/.test(e.key)) e.preventDefault(); }} InputProps={{ readOnly: isEditMode }} /></Grid>
//                         <Grid item xs={12} sm={4}><TextField fullWidth label="Middle Name" name="middleName" value={currentEmployee.middleName || ""} onChange={handleInputChange} onKeyPress={(e) => { if (!/^[A-Za-z]$/.test(e.key)) e.preventDefault(); }} InputProps={{ readOnly: isEditMode }} /></Grid>
//                         <Grid item xs={12} sm={4}><TextField fullWidth label="Last Name" name="lastName" value={currentEmployee.lastName || ""} onChange={handleInputChange} onKeyPress={(e) => { if (!/^[A-Za-z]$/.test(e.key)) e.preventDefault(); }} InputProps={{ readOnly: isEditMode }} /></Grid>
//                         <Grid item xs={12} sm={6}><TextField fullWidth label="Email" name="email" value={currentEmployee.email || ''} onChange={handleInputChange} InputProps={{ readOnly: isEditMode || !!talentPool.find(p => p.email === currentEmployee.email) }} /></Grid>
//                         <Grid item xs={12} sm={6}><TextField fullWidth label="Phone" name="phone" value={currentEmployee.phone || ''} onChange={(e) => { const value = e.target.value; if (/^\d{0,10}$/.test(value)) handleInputChange(e); }} inputProps={{ maxLength: 10, inputMode: 'numeric', pattern: '[0-9]*' }} InputProps={{ readOnly: isEditMode }} /></Grid>
//                         <Grid item xs={12} sm={6}><Autocomplete options={countries} getOptionLabel={(option) => option.country_name || ''} value={countries.find(c => c.country_id == currentEmployee.country_id) || null} onChange={(e, nv) => handleCountryChange(nv)} isOptionEqualToValue={(option, value) => option.country_id == value.country_id} renderInput={(params) => (<TextField {...params} label="Country" />)} /></Grid>
//                         <Grid item xs={12} sm={6}><Autocomplete options={states} getOptionLabel={(option) => option.state_name || ''} value={states.find(s => s.state_id == currentEmployee.state_id) || null} onChange={(e, nv) => handleStateChange(nv)} isOptionEqualToValue={(option, value) => option.state_id == value.state_id} disabled={!currentEmployee.country_id} renderInput={(params) => (<TextField {...params} label="State" />)} /></Grid>
//                         <Grid item xs={12} sm={6}><Autocomplete options={employeeHubs} getOptionLabel={(option) => option.employee_hub_name || ''} value={employeeHubs.find(h => h.employee_hub_id == currentEmployee.employee_hub_id) || null} onChange={(e, nv) => setCurrentEmployee(prev => ({ ...prev, employee_hub_id: nv ? nv.employee_hub_id : "" }))} isOptionEqualToValue={(option, value) => option.employee_hub_id == value.employee_hub_id} disabled={!currentEmployee.state_id} renderInput={(params) => (<TextField {...params} label="holiday Hub" />)} /></Grid>
//                         <Grid item xs={12} sm={6}><Autocomplete options={headquarters} getOptionLabel={(option) => option.headquarter_name || ''} value={headquarters.find(h => h.headquarter_id == currentEmployee.headquarter_id) || null} onChange={(e, nv) => setCurrentEmployee(prev => ({ ...prev, headquarter_id: nv ? nv.headquarter_id : "" }))} isOptionEqualToValue={(option, value) => option.headquarter_id == value.headquarter_id} renderInput={(params) => (<TextField {...params} label="Headquarter" />)} /></Grid>
//                         <Grid item xs={12} sm={6}><Autocomplete options={divisions} getOptionLabel={(option) => option.division_name || ''} value={divisions.find(d => d.division_id == currentEmployee.division_id) || null} onChange={(e, nv) => handleDivisionChange(nv)} isOptionEqualToValue={(option, value) => option.division_id == value.division_id} renderInput={(params) => (<TextField {...params} label="Division" />)} /></Grid>
//                         <Grid item xs={12} sm={6}><Autocomplete options={subDivisionOptions} getOptionLabel={(option) => option.label || ''} value={subDivisionOptions.find(sd => sd.value === currentEmployee.subDivision) || null} onChange={(e, nv) => setCurrentEmployee(prev => ({ ...prev, subDivision: nv ? nv.value : "" }))} isOptionEqualToValue={(option, value) => option.value === value.value} disabled={isSubDivisionDisabled} renderInput={(params) => (<TextField {...params} label="Sub Division" />)} /></Grid>
//                         <Grid item xs={12} sm={6}><Autocomplete options={allEmployeesForDropdown} getOptionLabel={(option) => option.label ? `${option.label} (${option.emp_id})` : ''} value={allEmployeesForDropdown.find(e => e.value == currentEmployee.manager_id) || null} onChange={(e, nv) => setCurrentEmployee(prev => ({ ...prev, manager_id: nv ? nv.value : "" }))} isOptionEqualToValue={(option, value) => option.value == value.value} renderInput={(params) => (<TextField {...params} label="Manager" />)} /></Grid>
//                         <Grid item xs={12} sm={6}><Autocomplete options={departments} getOptionLabel={(option) => option.dept_name || ''} value={departments.find(d => d.dept_id == currentEmployee.department_id) || null} onChange={(e, nv) => handleDeptChange(nv)} isOptionEqualToValue={(option, value) => option.dept_id == value.dept_id} renderInput={(params) => (<TextField {...params} label="Department" />)} /></Grid>
//                         <Grid item xs={12} sm={6}><Autocomplete options={designations} getOptionLabel={(option) => option.desig_name || ''} value={designations.find(d => d.desig_id == currentEmployee.designation_id) || null} onChange={(e, nv) => setCurrentEmployee(prev => ({ ...prev, designation_id: nv ? nv.desig_id : "" }))} isOptionEqualToValue={(option, value) => option.desig_id == value.desig_id} disabled={!currentEmployee.department_id} renderInput={(params) => (<TextField {...params} label="Designation" />)} /></Grid>
//                         <Grid item xs={12} sm={6}><Autocomplete options={officeShifts} getOptionLabel={(option) => option.office_shift_name || ''} value={officeShifts.find(s => s.office_shift_id == currentEmployee.officeShift) || null} onChange={(e, nv) => setCurrentEmployee(prev => ({ ...prev, officeShift: nv ? nv.office_shift_id : "" }))} isOptionEqualToValue={(option, value) => option.office_shift_id == value.office_shift_id} renderInput={(params) => (<TextField {...params} label="Office Shift" />)} /></Grid>
//                         <Grid item xs={12} sm={6}><Autocomplete options={statusOptions} getOptionLabel={(option) => option.label} value={statusOptions.find(s => s.value === currentEmployee.status) || null} onChange={(e, nv) => setCurrentEmployee(prev => ({ ...prev, status: nv ? nv.value : 1 }))} isOptionEqualToValue={(option, value) => option.value === value.value} renderInput={(params) => (<TextField {...params} label="Status" />)} /></Grid>
//                         <Grid item xs={12} sm={6}><Autocomplete options={probationOptions} getOptionLabel={(option) => option.label} value={probationOptions.find(p => p.value === currentEmployee.is_probation) || null} onChange={(e, nv) => setCurrentEmployee(prev => ({ ...prev, is_probation: nv ? nv.value : "n" }))} isOptionEqualToValue={(option, value) => option.value === value.value} renderInput={(params) => (<TextField {...params} label="On Probation" />)} /></Grid>
//                         <Grid item xs={12} sm={6}><TextField fullWidth label="Join Date" name="join_date" type="date" value={currentEmployee.join_date || ""} onChange={handleInputChange} InputLabelProps={{ shrink: true }} /></Grid>
//                         <Grid item xs={12} sm={6}><Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}><Button variant="contained" component="label" disabled={isEditMode} sx={purpleButtonSx}>Upload Photo<input type="file" hidden accept="image/*" onChange={handleFileUpload} /></Button>{currentEmployee.avatar && <Avatar src={typeof currentEmployee.avatar === 'string' ? currentEmployee.avatar : URL.createObjectURL(currentEmployee.avatar)} sx={{ width: 56, height: 56 }} />}</Box></Grid>
//                         <Grid item xs={12}>{isFetchingDocs && <CircularProgress />}{employeeDocuments && !isFetchingDocs && (<Box><Typography variant="subtitle1" gutterBottom>Fetched Documents</Typography><Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>{Object.entries(employeeDocuments).map(([name, url]) => (url ? (<Chip key={name} label={name.replace(/_/g, ' ')} component="a" href={url} target="_blank" clickable icon={<LinkIcon />} variant="outlined" color="secondary" size="small" />) : null))}</Box></Box>)}</Grid>
//                         {!isEditMode && (<>
//                             <Grid item xs={12} sm={6}><Autocomplete options={genderOptions} getOptionLabel={(option) => option.label} value={genderOptions.find(g => g.value === currentEmployee.gender) || null} onChange={(e, nv) => setCurrentEmployee(prev => ({ ...prev, gender: nv ? nv.value : "" }))} isOptionEqualToValue={(option, value) => option.value === value.value} renderInput={(params) => (<TextField {...params} label="Gender" />)} /></Grid>
//                             <Grid item xs={12} sm={6}><TextField fullWidth label="Username" name="username" value={currentEmployee.username || ""} onChange={handleInputChange} InputProps={{ readOnly: true }} /></Grid>
//                             <Grid item xs={12} sm={6}><TextField fullWidth label="Password" name="password" value={currentEmployee.password || ""} onChange={handleInputChange} type={showPassword ? 'text' : 'password'} InputProps={{ endAdornment: (<InputAdornment position="end"> <IconButton aria-label="toggle password visibility" onClick={() => setShowPassword((prev) => !prev)} onMouseDown={(e) => e.preventDefault()} edge="end"> {showPassword ? <VisibilityOff /> : <Visibility />} </IconButton> </InputAdornment>) }} /></Grid>
//                             <Grid item xs={12} sm={6}><Autocomplete options={roles} getOptionLabel={(option) => option.role_name || ''} value={roles.find(r => r.index == currentEmployee.role) || null} onChange={(e, nv) => setCurrentEmployee(prev => ({ ...prev, role: nv ? nv.index : "" }))} isOptionEqualToValue={(option, value) => option.index == value.index} renderInput={(params) => (<TextField {...params} label="Role" />)} /></Grid>
//                             <Grid item xs={12} sm={6} md={3}><TextField fullWidth label="Gross Salary monthly" name="grossSalary" type="number" value={currentEmployee.grossSalary || ""} onChange={(e) => { const value = e.target.value; if (/^\d*\.?\d*$/.test(value)) handleInputChange(e); }} /></Grid>
//                             <Grid item xs={12} sm={6} md={3}><TextField fullWidth label="Gross Salary Yearly" name="grossSalaryYearly" type="number" value={currentEmployee.grossSalaryYearly || ""} InputProps={{ readOnly: true }} /></Grid>
//                             <Grid item xs={12} sm={6} md={3}><TextField fullWidth label="CTC Monthly" name="ctcMonthly" type="number" value={currentEmployee.ctcMonthly || ""} InputProps={{ readOnly: true }} /></Grid>
//                             <Grid item xs={12} sm={6} md={3}><TextField fullWidth label="CTC Yearly" name="ctcYearly" type="number" value={currentEmployee.ctcYearly || ""} InputProps={{ readOnly: true }} /></Grid>
//                         </>)}
//                     </Grid>
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={() => setOpenEmployeeForm(false)} disabled={isSaving} sx={cancelButtonSx}>Cancel</Button>
//                     <Button onClick={handleSaveEmployee} variant="contained" disabled={isSaving} sx={purpleButtonSx}>{isSaving ? <CircularProgress size={24} color="inherit" /> : "Save"}</Button>
//                 </DialogActions>
//             </Dialog>
            
//             <TableContainer>
//                 <Table sx={{ minWidth: "100%", whiteSpace: "nowrap" }}>
//                     <TableHead>
//                         <TableRow sx={{ bgcolor: themePurple }}>
//                             <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>SR. NO.</TableCell>
//                             <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>EMPLOYEE</TableCell>
//                             <TableCell sx={{ color: 'white' }}></TableCell>
//                             <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>DEPARTMENT</TableCell>
//                             <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>DESIGNATION</TableCell>
//                             <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>JOIN DATE</TableCell>
//                             <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>STATUS</TableCell>
//                             <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>MANAGER</TableCell>
//                             <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', color: 'white' }}>ACTIONS</TableCell>
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {loading ? (
//                             Array.from(new Array(rowsPerPage)).map((_, index) => (
//                                 <TableRow key={index}>
//                                     <TableCell><Skeleton variant="text" /></TableCell>
//                                     <TableCell><Skeleton variant="text" /></TableCell>
//                                     <TableCell><Skeleton variant="text" /></TableCell>
//                                     <TableCell><Skeleton variant="text" /></TableCell>
//                                     <TableCell><Skeleton variant="text" /></TableCell>
//                                     <TableCell><Skeleton variant="text" /></TableCell>
//                                     <TableCell><Skeleton variant="text" /></TableCell>
//                                     <TableCell><Skeleton variant="text" /></TableCell>
//                                     <TableCell align="center"><Skeleton variant="rectangular" width={80} height={30} /></TableCell>
//                                 </TableRow>
//                             ))
//                         ) : (
//                             (rowsPerPage > 0
//                                 ? filteredEmployees.slice(currentPage * rowsPerPage, currentPage * rowsPerPage + rowsPerPage)
//                                 : filteredEmployees
//                             ).map((employee, index) => (
//                                 <TableRow key={employee.user_id} sx={{ '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' } }} onMouseEnter={() => setHoveredRowId(employee.user_id)} onMouseLeave={() => setHoveredRowId(null)}>
//                                     <TableCell sx={{ fontSize: '0.95rem' }}>{currentPage * rowsPerPage + index + 1}</TableCell>
//                                     <TableCell sx={{ fontSize: '0.95rem' }}>{employee.employee_name}</TableCell>
//                                     <TableCell sx={{ padding: '0 8px', textAlign: 'center' }}>
//                                         {hoveredRowId === employee.user_id && <IconButton onClick={() => handleArrowClick(employee.user_id)} size="small" sx={{ color: themeOrange }}><ArrowForwardIcon fontSize="small" /></IconButton>}
//                                     </TableCell>
//                                     <TableCell sx={{ fontSize: '0.95rem' }}>{employee.department_name || 'N/A'}</TableCell>
//                                     <TableCell sx={{ fontSize: '0.95rem' }}>{employee.designation_name || 'N/A'}</TableCell>
//                                     <TableCell sx={{ fontSize: '0.95rem' }}>{formatDate(employee.join_date)}</TableCell>
//                                     <TableCell sx={{ fontSize: '0.95rem' }}>
//                                         <Chip label={employee.status === 1 ? "Active" : "Inactive"} size="small" sx={{
//                                             bgcolor: employee.status === 1 ? '#4caf50' : themeOrange,
//                                             color: 'white',
//                                             borderRadius: '16px',
//                                             height: '24px',
//                                         }} />
//                                     </TableCell>
//                                     <TableCell sx={{ fontSize: '0.95rem' }}>{employee.manager}</TableCell>
//                                     <TableCell>
//                                         <Box display="flex" justifyContent="center" gap={0.5}>
//                                             <Tooltip title="Edit"><IconButton onClick={() => handleEditEmployee(employee)} sx={{ color: themePurple }}><EditIcon /></IconButton></Tooltip>
//                                             <Tooltip title="Delete"><IconButton onClick={() => handleDeleteEmployee(employee.user_id)} sx={{ color: themeOrange }}><DeleteIcon /></IconButton></Tooltip>
//                                         </Box>
//                                     </TableCell>
//                                 </TableRow>
//                             ))
//                         )}
//                     </TableBody>
//                 </Table>
//             </TableContainer>

//             <Box sx={{ p: 2, borderTop: '1px solid rgba(224, 224, 224, 1)' }}>
//                 {loading ? (
//                     <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                         <Skeleton variant="text" width={150} />
//                         <Skeleton variant="rectangular" width={400} height={40} />
//                     </Box>
//                 ) : (
//                     <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
//                         <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//                             <FormControl variant="outlined" size="small">
//                                 <Select
//                                     value={rowsPerPage}
//                                     onChange={handleRowsPerPageChange}
//                                     sx={{
//                                         backgroundColor: themePurple,
//                                         color: 'white',
//                                         borderRadius: '4px',
//                                         transition: 'background-color 0.3s',
//                                         '&:hover': {
//                                             backgroundColor: themePurpleHover,
//                                         },
//                                         '& .MuiOutlinedInput-notchedOutline': {
//                                             border: 'none',
//                                         },
//                                         '& .MuiSvgIcon-root': {
//                                             color: 'white',
//                                         },
//                                     }}
//                                 >
//                                     {[10, 25, 50, 100].map((value) => (
//                                         <MenuItem key={value} value={value}>{value}</MenuItem>
//                                     ))}
//                                 </Select>
//                             </FormControl>
//                             <Typography variant="body2" color="text.secondary">
//                                 {`1 to ${Math.min(rowsPerPage, filteredEmployees.length)} of ${filteredEmployees.length}`}
//                             </Typography>
//                         </Box>

//                         <Pagination
//                             count={Math.ceil(filteredEmployees.length / rowsPerPage)}
//                             page={currentPage + 1}
//                             onChange={handlePaginationChange}
//                             showFirstButton
//                             showLastButton
//                             sx={{
//                                 '& .MuiPaginationItem-root': {
//                                     borderRadius: '4px',
//                                     transition: 'background-color 0.3s, color 0.3s',
//                                     '&:hover': {
//                                         backgroundColor: themeOrange,
//                                         color: 'white',
//                                     }
//                                 },
//                                 '& .MuiPaginationItem-page': {
//                                     color: themePurple,
//                                     '&.Mui-selected': {
//                                         backgroundColor: themePurple,
//                                         color: 'white',
//                                         '&:hover': {
//                                             backgroundColor: themeOrange,
//                                         }
//                                     },
//                                 },
//                                 '& .MuiPaginationItem-icon': {
//                                     color: themePurple,
//                                 }
//                             }}
//                         />
//                     </Box>
//                 )}
//             </Box>
//         </Box>
//     );
// }



// import React, { useState, useEffect, useMemo, useCallback, useRef } from "react";
// import axios from 'axios';
// import {
//     Box,
//     Typography,
//     Button,
//     Paper,
//     Table,
//     TableBody,
//     TableCell,
//     TableContainer,
//     TableHead,
//     TableRow,
//     TextField,
//     FormControl,
//     InputLabel,
//     Select,
//     MenuItem,
//     Avatar,
//     Chip,
//     IconButton,
//     Tooltip,
//     Dialog,
//     DialogTitle,
//     DialogContent,
//     DialogActions,
//     Grid,
//     CircularProgress,
//     Autocomplete,
//     InputAdornment,
//     useTheme,
//     useMediaQuery,
//     Skeleton,
//     Pagination,
// } from "@mui/material";
// import {
//     Edit as EditIcon,
//     Delete as DeleteIcon,
//     Add as AddIcon,
//     Close as CloseIcon,
//     Download as DownloadIcon,
//     ArrowForward as ArrowForwardIcon,
//     SupervisorAccount as ChangeManagerIcon,
//     Link as LinkIcon,
//     Visibility,
//     VisibilityOff,
//     Search as SearchIcon,
// } from "@mui/icons-material";
// import * as XLSX from "xlsx";
// import { useNavigate } from "react-router-dom";
// import axiosInstance from "../../utils/axiosInstance";
// import Swal from 'sweetalert2';

// const RESUME_BASE_URL = "https://raasbackend.vetrinahealthcare.com/";
// const statusOptions = [{ value: 1, label: 'Active' }, { value: 0, label: 'Inactive' }];
// const probationOptions = [{ value: 'y', label: 'Yes' }, { value: 'n', label: 'No' }];
// const genderOptions = [{ value: 'Male', label: 'Male' }, { value: 'Female', 'label': 'Female' }, { value: 'Other', label: 'Other' }];
// const subDivisionOptions = [{ value: 'VetBiz', label: 'VetBiz' }, { value: 'TredBiz', label: 'TredBiz' }, { value: ' ', label: 'TredBiz Mix' }];

// export default function EmployeesView() {
//     const employeeDialogRef = useRef(null);
//     const changeManagerDialogRef = useRef(null);
//     const muiTheme = useTheme();
//     const isMobile = useMediaQuery(muiTheme.breakpoints.down("sm"));
//     const themePurple = '#8C257C';
//     const themePurpleHover = '#6d1d60';
//     const themeOrange = '#F58E35';

//     const purpleButtonSx = {
//         backgroundColor: themePurple,
//         color: 'white',
//         '&:hover': {
//             backgroundColor: themePurpleHover,
//         },
//     };
//     const cancelButtonSx = {
//         color: '#757575',
//         '&:hover': {
//             backgroundColor: 'rgba(0, 0, 0, 0.04)'
//         }
//     };

//     const [loading, setLoading] = useState(true);
//     const [departments, setDepartments] = useState([]);
//     const [designations, setDesignations] = useState([]);
//     const [searchTerm, setSearchTerm] = useState("");
//     const [openChangeManagerForm, setOpenChangeManagerForm] = useState(false);
//     const [currentPage, setCurrentPage] = useState(0);
//     const [rowsPerPage, setRowsPerPage] = useState(10);
//     const [newManager, setNewManager] = useState("");
//     const [selectedEmployeeForManagerChange, setSelectedEmployeeForManagerChange] = useState("");
//     const [employees, setEmployees] = useState([]);
//     const [hoveredRowId, setHoveredRowId] = useState(null);
//     const [officeShifts, setOfficeShifts] = useState([]);
//     const [isEditMode, setIsEditMode] = useState(false);
//     const [roles, setRoles] = useState([]);
//     const [countries, setCountries] = useState([]);
//     const [states, setStates] = useState([]);
//     const [employeeHubs, setEmployeeHubs] = useState([]);
//     const [headquarters, setHeadquarters] = useState([]);
//     const [divisions, setDivisions] = useState([]);
//     const [allEmployeesForDropdown, setAllEmployeesForDropdown] = useState([]);
//     const [talentPool, setTalentPool] = useState([]);
//     const [isFetchingDocs, setIsFetchingDocs] = useState(false);
//     const [employeeDocuments, setEmployeeDocuments] = useState(null);
//     const [showPassword, setShowPassword] = useState(false);
//     const [isSaving, setIsSaving] = useState(false);

//     const [currentEmployee, setCurrentEmployee] = useState({
//         id: null, firstName: "", middleName: "", lastName: "", email: "", employee_id: "", join_date: "",
//         status: 1, phone: "", avatar: null, country_id: "", state_id: "", employee_hub_id: "",
//         headquarter_id: "", division_id: "", subDivision: "", role: "", is_probation: "n",
//         resumeUrl: "", password: "", gender: "", username: "", grossSalary: "", department_id: "",
//         designation_id: "", manager_id: "", officeShift: "", grossSalaryYearly: "", ctcMonthly: "", ctcYearly: "",
//     });

//     const [openEmployeeForm, setOpenEmployeeForm] = useState(false);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const [ depts, empDropdown, shifts, countriesRes, hubs, divs, rolesRes, talent,headquartersRes ] = await Promise.all([
//                     axiosInstance.get('api/desig_dept_dropdown/'),
//                     axiosInstance.get('employee-dropdown/'),
//                     axiosInstance.get('api/office_shift_dropdown/'),
//                     axiosInstance.get('api/countries/'),
//                     axiosInstance.get('api/employee_hub/'),
//                     axiosInstance.get('api/division/'),
//                     axiosInstance.get('api/role_list/'),
//                     axiosInstance.get('api/search_by_email_vet_talent/'),
//                     axios.get("https://tdtlworld.com/hrms-backend/api/headquarters/")
//                 ]);
//                 setDepartments(depts.data.dept_data || []);
//                 setAllEmployeesForDropdown(empDropdown.data || []);
//                 setOfficeShifts(shifts.data.office_shift_data || []);
//                 if (countriesRes.data.status === 'success') setCountries(countriesRes.data.data || []);
//                 setDivisions(divs.data || []);
//                 if (rolesRes.data?.status === "success") setRoles(rolesRes.data.data);
//                 setHeadquarters(headquartersRes.data || []);
//                 setTalentPool(talent.data.data || []);
//             } catch (error) {
//                 console.error("Error fetching initial data:", error);
//                 Swal.fire({ icon: 'error', title: 'Error', text: 'Failed to fetch initial data.', timer: 3000, showConfirmButton: false });
//             }
//         };
//         fetchData();
//     }, []);

//     const fetchEmployees = useCallback(() => {
//         setLoading(true);
//         axiosInstance.get('api/employee_details/')
//             .then((response) => setEmployees(Array.isArray(response.data.data) ? response.data.data : []))
//             .catch((error) => {
//                 console.error('Error fetching employees:', error);
//                 setEmployees([]);
//                 Swal.fire({ icon: 'error', title: 'Error', text: 'Failed to fetch employee list.', timer: 3000, showConfirmButton: false });
//             })
//             .finally(() => setLoading(false));
//     }, []);

//     useEffect(() => { fetchEmployees(); }, [fetchEmployees]);
    
//     useEffect(() => {
//         const grossSalaryMonthly = parseFloat(currentEmployee.grossSalary);
//         if (!isNaN(grossSalaryMonthly) && grossSalaryMonthly > 0) {
//             const yearlyGross = grossSalaryMonthly * 12;
//             const basicSalary = grossSalaryMonthly * 0.5;
//             const employerPF = basicSalary * 0.12;
//             const employerESI = grossSalaryMonthly <= 21000 ? grossSalaryMonthly * 0.0325 : 0;
//             const monthlyCTC = grossSalaryMonthly + employerPF + employerESI;
//             const yearlyCTC = monthlyCTC * 12;
    
//             setCurrentEmployee(prev => ({
//                 ...prev,
//                 grossSalaryYearly: yearlyGross.toFixed(2),
//                 ctcMonthly: monthlyCTC.toFixed(2),
//                 ctcYearly: yearlyCTC.toFixed(2),
//             }));
//         } else {
//             setCurrentEmployee(prev => ({
//                 ...prev,
//                 grossSalaryYearly: "",
//                 ctcMonthly: "",
//                 ctcYearly: "",
//             }));
//         }
//     }, [currentEmployee.grossSalary]);

//     const handleCountryChange = (selectedCountry) => {
//         const countryId = selectedCountry ? selectedCountry.country_id : "";
//         const countryName = selectedCountry ? selectedCountry.country_name : null;
//         setCurrentEmployee(prev => ({ ...prev, country_id: countryId, state_id: "", employee_hub_id: "" }));
//         setStates([]);
//         setEmployeeHubs([]);
//         if (countryName) {
//             axiosInstance.get(`api/states/?country_name=${countryName}`)
//                 .then(res => { if (res.data.status === "success") setStates(res.data.data || []); })
//                 .catch(err => {
//                     console.error("Error fetching states:", err);
//                     Swal.fire({ icon: 'error', title: 'Error', text: 'Failed to fetch states.', target: employeeDialogRef.current, timer: 3000, showConfirmButton: false });
//                 });
//         }
//     };

//     const handleStateChange = (selectedState) => {
//         const stateId = selectedState ? selectedState.state_id : "";
//         setCurrentEmployee(prev => ({ ...prev, state_id: stateId, employee_hub_id: "" }));
//         setEmployeeHubs([]);
//         if (stateId) {
//             axiosInstance.get(`api/employee_hub_dropdown/${stateId}/`)
//                 .then(res => { if (res.data.status === "success") setEmployeeHubs(res.data.data || []); })
//                 .catch(err => {
//                     console.error("Error fetching employee hubs:", err);
//                     Swal.fire({ icon: 'error', title: 'Error', text: 'Failed to fetch holiday hubs.', target: employeeDialogRef.current, timer: 3000, showConfirmButton: false });
//                 });
//         }
//     };

//     const handleDeptChange = (selectedDept) => {
//         const deptId = selectedDept ? selectedDept.dept_id : "";
//         setCurrentEmployee((prev) => ({ ...prev, department_id: deptId, designation_id: "" }));
//         if (deptId) {
//             axiosInstance.get(`api/desig_dept_dropdown/?dept_id=${deptId}/`)
//                 .then((res) => setDesignations(res.data.desig_data || []))
//                 .catch((err) => {
//                     console.error("Error fetching designations:", err);
//                     Swal.fire({ icon: 'error', title: 'Error', text: 'Failed to load designations.', target: employeeDialogRef.current, timer: 3000, showConfirmButton: false });
//                 });
//         } else {
//             setDesignations([]);
//         }
//     };

//     const handleDivisionChange = (selectedDivision) => {
//         const divisionId = selectedDivision ? selectedDivision.division_id : "";
//         if (selectedDivision && selectedDivision.division_name !== 'Livestock') {
//             setCurrentEmployee(prev => ({ ...prev, division_id: divisionId, subDivision: "" }));
//         } else {
//             setCurrentEmployee(prev => ({ ...prev, division_id: divisionId }));
//         }
//     };

//     const handleChangeManager = async () => {
//         if (!selectedEmployeeForManagerChange || !newManager) {
//             Swal.fire({ icon: 'warning', title: 'Incomplete Selection', text: 'Please select an employee and a new manager.', target: changeManagerDialogRef.current });
//             return;
//         }
//         try {
//             await axiosInstance.put("api/change_manager/", { user_id: selectedEmployeeForManagerChange, manager_id: newManager });
//             await fetchEmployees();
//             Swal.fire({ icon: 'success', title: 'Success', text: 'Manager changed successfully!', timer: 3000, showConfirmButton: false });
//             setOpenChangeManagerForm(false);
//             setSelectedEmployeeForManagerChange("");
//             setNewManager("");
//         } catch (error) {
//             console.error("Error changing manager:", error);
//             Swal.fire({ icon: 'error', title: 'Operation Failed', text: `Error changing manager: ${error.response?.data?.message || "An error occurred."}`, target: changeManagerDialogRef.current });
//         }
//     };

//     const navigate = useNavigate();
//     const handleArrowClick = (id) => navigate(`/hrms/admindashboard/employeedetail/${id}`);

//     const handleInputChange = (event) => {
//         const { name, value } = event.target;
//         setCurrentEmployee((prev) => ({ ...prev, [name]: value }));
//     };

//     const handleAddEmployee = async () => {
//         try {
//             const maxIdResponse = await axios.get("https://tdtlworld.com/hrms-backend/api/get_max_employee_id/");
//             const newEmpId = maxIdResponse.data.employee_id;
//             setCurrentEmployee({
//                 emp_id: newEmpId, firstName: "", middleName: "", lastName: "", email: "", phone: "",
//                 avatar: null, officeShift: "", status: 1, join_date: "", gender: "", username: newEmpId, password: "",
//                 role: "", grossSalary: "", department_id: "", designation_id: "", manager_id: "",
//                 country_id: "", state_id: "", employee_hub_id: "", headquarter_id: "", division_id: "",
//                 company_id: 2, is_probation: "n", resumeUrl: "", subDivision: "", grossSalaryYearly: "", ctcMonthly: "", ctcYearly: "",
//                 employee_id: "",
//             });
//             setDesignations([]); setStates([]); setEmployeeHubs([]); setEmployeeDocuments(null);
//             setIsEditMode(false); setShowPassword(false); setOpenEmployeeForm(true);
//         } catch (error) {
//             console.error("Error fetching max employee ID:", error);
//             Swal.fire({ icon: 'error', title: 'Error', text: 'Failed to initialize employee form.', timer: 3000, showConfirmButton: false });
//         }
//     };

//     const handleTalentSelect = async (event, selectedOption) => {
//         setEmployeeDocuments(null);
//         setCurrentEmployee(prev => ({ ...prev, resumeUrl: "" }));
//         if (!selectedOption) {
//             setCurrentEmployee(prev => ({ ...prev, firstName: "", middleName: "", lastName: "", email: "", phone: "", gender: "", country_id: "", state_id: "" }));
//             return;
//         }
//         const talent = talentPool.find(p => p.email === selectedOption.email);
//         if (!talent) return;

//         const selectedCountry = countries.find(c => c.country_name === talent.country);
//         const resumeLink = talent.resume ? `${RESUME_BASE_URL}${talent.resume}` : "";

//         setCurrentEmployee(prev => ({
//             ...prev, firstName: talent.first_name || "", middleName: talent.middle_name || "",
//             lastName: talent.last_name || "", email: talent.email || "", phone: talent.phone || "",
//             gender: talent.gender || "", country_id: selectedCountry ? selectedCountry.country_id : "",
//             state_id: '', employee_hub_id: '', resumeUrl: resumeLink,
//         }));

//         if (selectedCountry) {
//             try {
//                 const statesRes = await axiosInstance.get(`api/states/?country_name=${selectedCountry.country_name}`);
//                 if (statesRes.data.status === "success") {
//                     const fetchedStates = statesRes.data.data || [];
//                     setStates(fetchedStates);
//                     const selectedState = fetchedStates.find(s => s.state_name === talent.state);
//                     if (selectedState) {
//                         setCurrentEmployee(prev => ({ ...prev, state_id: selectedState.state_id }));
//                         const hubsRes = await axiosInstance.get(`api/employee_hub_dropdown/${selectedState.state_id}/`);
//                         if (hubsRes.data.status === "success") setEmployeeHubs(hubsRes.data.data || []);
//                     }
//                 }
//             } catch (err) { console.error("Error fetching dependent data for talent:", err); }
//         }

//         setIsFetchingDocs(true);
//         try {
//             const docResponse = await axios.post('https://raasbackend.vetrinahealthcare.com/fetch_documents/', { email_id: talent.email });
//             setEmployeeDocuments(docResponse.data.status === 'success' && docResponse.data.documents ? docResponse.data.documents : null);
//         } catch (error) {
//             console.error("Error fetching documents:", error);
//             setEmployeeDocuments(null);
//         } finally {
//             setIsFetchingDocs(false);
//         }
//     };

//     const handleEditEmployee = async (employee) => {
//         if (!employee || !employee.user_id) return;
//         try {
//             const response = await axiosInstance.get(`api/edit_employee/${employee.user_id}/`);
//             if (response.data.status !== "success" || response.data.data.length === 0) {
//                 Swal.fire({ icon: 'error', title: 'Error', text: 'Failed to load employee details.', timer: 3000, showConfirmButton: false });
//                 return;
//             }
//             const empData = response.data.data[0];
//             const [desigRes, statesRes, hubsRes] = await Promise.all([
//                 axiosInstance.get(`api/desig_dept_dropdown/?dept_id=${empData.department_id}/`),
//                 empData.country_name ? axiosInstance.get(`api/states/?country_name=${empData.country_name}`) : Promise.resolve({ data: { data: [] } }),
//                 empData.state ? axiosInstance.get(`api/employee_hub_dropdown/${empData.state}/`) : Promise.resolve({ data: { data: [] } })
//             ]);

//             setDesignations(desigRes.data.desig_data || []);
//             setStates(statesRes.data.data || []);
//             setEmployeeHubs(hubsRes.data.data || []);
            
//             const officeShiftObj = officeShifts.find(s => s.office_shift_name === empData.office_shift);
//             const nameParts = (empData.emp_name || "").split(" ");
//             const selectedCountry = countries.find(c => c.country_name === empData.country_name);
//             const selectedHeadquarter = headquarters.find(hq => hq.headquarter_name === empData.headquarter);

//             let finalSubDivisionValue = empData.sub_division || "";
//             if (finalSubDivisionValue === "Tred") {
//                 finalSubDivisionValue = "TredBiz";
//             }

//             setCurrentEmployee({
//                 id: employee.user_id,
//                 firstName: nameParts[0] || "",
//                 middleName: nameParts.length > 2 ? nameParts.slice(1, -1).join(" ") : "",
//                 lastName: nameParts.length > 1 ? nameParts[nameParts.length - 1] : "",
//                 email: empData.email || "",
//                 employee_id: empData.employee_id || "",
//                 phone: empData.phone || "",
//                 manager_id: empData.manager_id ? Number(empData.manager_id) : "",
//                 designation_id: empData.designation_id ? Number(empData.designation_id) : "",
//                 department_id: empData.department_id ? Number(empData.department_id) : "",
//                 headquarter_id: selectedHeadquarter ? selectedHeadquarter.headquarter_id : "",
//                 subDivision: finalSubDivisionValue,
//                 division_id: empData.division_id ? Number(empData.division_id) : "",
//                 state_id: empData.state ? Number(empData.state) : "",
//                 employee_hub_id: empData.employee_hub_id ? Number(empData.employee_hub_id) : "",
//                 role: empData.role_id ? Number(empData.role_id) : "",
//                 officeShift: officeShiftObj ? Number(officeShiftObj.office_shift_id) : "",
//                 status: Number(empData.status),
//                 join_date: empData.join_date ? empData.join_date.split(" ")[0] : "",
//                 country_id: selectedCountry ? Number(selectedCountry.country_id) : "",
//                 avatar: empData.profile_photo || "",
//                 is_probation: empData.probation?.toLowerCase() === 'y' ? 'y' : 'n',
//                 resumeUrl: "",
//             });

//             setIsEditMode(true);
//             setOpenEmployeeForm(true);
//             setShowPassword(false);
//         } catch (error) {
//             console.error("Error fetching employee details for edit:", error);
//             Swal.fire({ icon: 'error', title: 'Error', text: 'Failed to fetch complete employee details.', timer: 3000, showConfirmButton: false });
//         }
//     };

//     const handleSaveEmployee = async () => {
//         if (!isEditMode) {
//             const requiredFields = {
//                 firstName: 'First Name', lastName: 'Last Name', email: 'Email', phone: 'Phone', country_id: 'Country',
//                 state_id: 'State', employee_hub_id: 'holiday Hub', headquarter_id: 'Headquarter', division_id: 'Division',
//                 manager_id: 'Manager', department_id: 'Department', designation_id: 'Designation', officeShift: 'Office Shift',
//                 join_date: 'Join Date', avatar: 'Photo', gender: 'Gender', username: 'Username', password: 'Password',
//                 role: 'Role', grossSalary: 'Gross Salary'
//             };
//             const selectedDivision = divisions.find(d => d.division_id == currentEmployee.division_id);
//             if (selectedDivision && selectedDivision.division_name === 'Livestock' && !currentEmployee.subDivision) {
//                 Swal.fire({ icon: 'error', title: 'Validation Error', text: 'Sub Division is required when Division is Livestock.', target: employeeDialogRef.current });
//                 return;
//             }
//             for (const field in requiredFields) {
//                 if (!currentEmployee[field]) {
//                     Swal.fire({ icon: 'error', title: 'Validation Error', text: `The field "${requiredFields[field]}" is required.`, target: employeeDialogRef.current });
//                     return;
//                 }
//             }
//         }
//         const formData = new FormData();
//         const keyMap = {
//             firstName: 'first_name',
//             middleName: 'middle_name',
//             lastName: 'last_name',
//             officeShift: 'office_shift',
//             join_date: 'join_date',
//             grossSalary: 'gross_salary',
//             headquarter_id: 'headquarter_id',
//             grossSalaryYearly: 'gross_salary_yearly',
//             ctcMonthly: 'ctc_monthly',
//             ctcYearly: 'ctc_yearly',
//         };
//         Object.keys(currentEmployee).forEach(key => {
//             if (key === 'avatar' && currentEmployee.avatar instanceof File) {
//                 formData.append("file", currentEmployee.avatar);
//             } else if (key !== 'resumeUrl' && currentEmployee[key] !== null && currentEmployee[key] !== undefined && currentEmployee[key] !== "") {
//                 const backendKey = keyMap[key] || key;
//                 formData.append(backendKey, currentEmployee[key]);
//             }
//         });

//         setIsSaving(true);
//         try {
//             const action = isEditMode ? 'updated' : 'added';
//             if (isEditMode) {
//                 formData.append("user_id", currentEmployee.id);
//                 await axiosInstance.put("api/edit_employee/", formData, { headers: { "Content-Type": "multipart/form-data" } });
//             } else {
//                 await axiosInstance.post("api/add_employee/", formData, { headers: { "Content-Type": "multipart/form-data" } });
//             }
//             setOpenEmployeeForm(false);
//             await fetchEmployees();
//             Swal.fire({ icon: 'success', title: 'Success', text: `Employee ${action} successfully!`, timer: 3000, showConfirmButton: false });

//         } catch (error) {
//             console.error("Error saving employee:", error);
//             const errorMessage = error.response?.data?.message || error.response?.data?.detail || "An unexpected error occurred.";
//             Swal.fire({ icon: 'error', title: `Operation failed`, text: `${errorMessage}`, target: employeeDialogRef.current });
//         } finally {
//             setIsSaving(false);
//         }
//     };

//     const handleDeleteEmployee = (employeeId) => {
//         if (!employeeId) return;
//         Swal.fire({
//             title: 'Are you sure?', text: "You won't be able to revert this!", icon: 'warning',
//             showCancelButton: true, confirmButtonColor: themePurple, cancelButtonColor: themeOrange,
//             confirmButtonText: 'Yes, delete it!'
//         }).then((result) => {
//             if (result.isConfirmed) {
//                 axiosInstance.delete("api/edit_employee/", { data: { user_id: employeeId } })
//                     .then(() => {
//                         fetchEmployees();
//                         Swal.fire({ icon: 'success', title: 'Deleted!', text: 'The employee has been deleted.', timer: 3000, showConfirmButton: false });
//                     })
//                     .catch((error) => {
//                         console.error("Error deleting employee: ", error);
//                         const errorMessage = error.response?.data?.message || error.response?.data?.detail || "Failed to delete employee.";
//                         Swal.fire({ icon: 'error', title: 'Error', text: errorMessage, timer: 3000, showConfirmButton: false });
//                     });
//             }
//         });
//     };

//     const handleExportEmployees = () => {
//         if (employees.length === 0) {
//             Swal.fire({ icon: 'info', title: 'Info', text: 'There is no employee data to export.', timer: 3000, showConfirmButton: false });
//             return;
//         }
//         const worksheet = XLSX.utils.json_to_sheet(employees);
//         const workbook = XLSX.utils.book_new();
//         XLSX.utils.book_append_sheet(workbook, worksheet, "Employees");
//         XLSX.writeFile(workbook, "EmployeesData.xlsx");
//     };

//     const sortedEmployees = useMemo(() => {
//         if (!Array.isArray(employees)) return [];
//         return [...employees].sort((a, b) => b.user_id - a.user_id);
//     }, [employees]);

//     const filteredEmployees = useMemo(() => sortedEmployees.filter(
//         (e) =>
//             (e.employee_name && e.employee_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
//             (e.department_name && e.department_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
//             (e.designation_name && e.designation_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
//             (e.join_date && e.join_date.toLowerCase().includes(searchTerm.toLowerCase())) ||
//             (e.manager && e.manager.toLowerCase().includes(searchTerm.toLowerCase()))
//     ), [sortedEmployees, searchTerm]);

//     const handlePaginationChange = (event, newPage) => {
//         setCurrentPage(newPage - 1);
//     };

//     const handleRowsPerPageChange = (event) => {
//         setRowsPerPage(parseInt(event.target.value, 10));
//         setCurrentPage(0);
//     };

//     const handleFileUpload = (e) => {
//         const file = e.target.files[0];
//         if (file) setCurrentEmployee((prev) => ({ ...prev, avatar: file }));
//     };

//     const isSubDivisionDisabled = useMemo(() => {
//         if (!currentEmployee.division_id) return true;
//         const selectedDivision = divisions.find(d => d.division_id == currentEmployee.division_id);
//         return !selectedDivision || selectedDivision.division_name !== 'Livestock';
//     }, [currentEmployee.division_id, divisions]);

//     const formatDate = (dateString) => {
//         if (!dateString) return '';
//         try {
//             const date = new Date(dateString);
//             const day = String(date.getDate()).padStart(2, '0');
//             const month = String(date.getMonth() + 1).padStart(2, '0');
//             const year = date.getFullYear();
//             return `${day}/${month}/${year}`;
//         } catch (error) {
//             console.error("Could not format date:", dateString);
//             return dateString.split(" ")[0];
//         }
//     };

//     return (
//         <Box component={Paper} p={3}>
//             <Typography variant="h4" sx={{ color: themePurple, fontWeight: "bold", mb: 5 }}>
//                 Employees List
//             </Typography>
//             <Box sx={{
//                 display: "flex",
//                 justifyContent: "space-between",
//                 alignItems: "center",
//                 flexDirection: isMobile ? "column" : "row",
//                 gap: 2,
//                 mb: 2
//             }}>
//                 <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
//                     <Button variant="contained" startIcon={<AddIcon />} onClick={handleAddEmployee} sx={purpleButtonSx}>Add Employee</Button>
//                     <Button variant="contained" startIcon={<DownloadIcon />} onClick={handleExportEmployees} sx={purpleButtonSx}>Export</Button>
//                     <Button variant="contained" startIcon={<ChangeManagerIcon />} onClick={() => setOpenChangeManagerForm(true)} sx={purpleButtonSx}>Change Manager</Button>
//                 </Box>
//                 <TextField
//                     size="small"
//                     placeholder="Search..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     sx={{ width: isMobile ? "100%" : "auto" }}
//                     InputProps={{
//                         startAdornment: (
//                             <InputAdornment position="start">
//                                 <SearchIcon />
//                             </InputAdornment>
//                         ),
//                     }}
//                 />
//             </Box>

//             <Dialog open={openChangeManagerForm} onClose={() => setOpenChangeManagerForm(false)} maxWidth="sm" fullWidth ref={changeManagerDialogRef}>
//                 <DialogTitle sx={{ color: themePurple, fontWeight: 'bold' }}>
//                     Change Manager
//                     <IconButton onClick={() => setOpenChangeManagerForm(false)} sx={{ position: "absolute", right: 8, top: 8, color: (theme) => theme.palette.grey[500] }}><CloseIcon /></IconButton>
//                 </DialogTitle>
//                 <DialogContent><Grid container spacing={2} sx={{ mt: 1 }}><Grid item xs={12}><FormControl fullWidth><InputLabel>Select Employee</InputLabel><Select value={selectedEmployeeForManagerChange} onChange={(e) => setSelectedEmployeeForManagerChange(e.target.value)} label="Select Employee">{allEmployeesForDropdown.map((emp) => (<MenuItem key={emp.value} value={emp.value}>{`${emp.label} (${emp.emp_id})`}</MenuItem>))}</Select></FormControl></Grid><Grid item xs={12}><FormControl fullWidth><InputLabel>Select New Manager</InputLabel><Select value={newManager} onChange={(e) => setNewManager(e.target.value)} label="Select New Manager">{allEmployeesForDropdown.map((emp) => (<MenuItem key={emp.value} value={emp.value}>{`${emp.label} (${emp.emp_id})`}</MenuItem>))}</Select></FormControl></Grid></Grid></DialogContent>
//                 <DialogActions>
//                     <Button onClick={() => setOpenChangeManagerForm(false)} sx={cancelButtonSx}>Cancel</Button>
//                     <Button onClick={handleChangeManager} variant="contained" sx={purpleButtonSx}>Save</Button>
//                 </DialogActions>
//             </Dialog>

//             <Dialog open={openEmployeeForm} onClose={() => setOpenEmployeeForm(false)} maxWidth="md" fullWidth ref={employeeDialogRef}>
//                 <DialogTitle sx={{ color: '#8C257C ', fontWeight: "bold", fontSize: '2rem' }}>
//                     {isEditMode ? "Edit Employee" : "Add Employee"}
//                     <IconButton onClick={() => setOpenEmployeeForm(false)} sx={{ position: "absolute", right: 8, top: 8, color: (theme) => theme.palette.grey[500] }}><CloseIcon /></IconButton>
//                 </DialogTitle>
//                 <DialogContent>
//                     <Grid container spacing={2} sx={{ mt: 1 }}>
//                         {!isEditMode && (<Grid item xs={12}><Autocomplete options={talentPool} getOptionLabel={(option) => option.email || ""} onChange={handleTalentSelect} onInputChange={(event, newInputValue) => { if (!talentPool.find(p => p.email === newInputValue)) { setCurrentEmployee(prev => ({ ...prev, email: newInputValue })); } }} renderInput={(params) => (<TextField {...params} label="Search Email to Auto-fill" />)} /></Grid>)}
//                         <Grid item xs={12} sm={4}><TextField fullWidth label="First Name" name="firstName" value={currentEmployee.firstName || ""} onChange={handleInputChange} onKeyPress={(e) => { if (!/^[A-Za-z]$/.test(e.key)) e.preventDefault(); }} InputProps={{ readOnly: isEditMode }} /></Grid>
//                         <Grid item xs={12} sm={4}><TextField fullWidth label="Middle Name" name="middleName" value={currentEmployee.middleName || ""} onChange={handleInputChange} onKeyPress={(e) => { if (!/^[A-Za-z]$/.test(e.key)) e.preventDefault(); }} InputProps={{ readOnly: isEditMode }} /></Grid>
//                         <Grid item xs={12} sm={4}><TextField fullWidth label="Last Name" name="lastName" value={currentEmployee.lastName || ""} onChange={handleInputChange} onKeyPress={(e) => { if (!/^[A-Za-z]$/.test(e.key)) e.preventDefault(); }} InputProps={{ readOnly: isEditMode }} /></Grid>
//                         <Grid item xs={12} sm={6}><TextField fullWidth label="Email" name="email" value={currentEmployee.email || ''} onChange={handleInputChange} InputProps={{ readOnly: isEditMode || !!talentPool.find(p => p.email === currentEmployee.email) }} /></Grid>
//                         {isEditMode && (<Grid item xs={12} sm={6}><TextField fullWidth label="Employee ID" name="employee_id" value={currentEmployee.employee_id || ""} InputProps={{ readOnly: true }} /></Grid>)}
//                         <Grid item xs={12} sm={6}><TextField fullWidth label="Phone" name="phone" value={currentEmployee.phone || ''} onChange={(e) => { const value = e.target.value; if (/^\d{0,10}$/.test(value)) handleInputChange(e); }} inputProps={{ maxLength: 10, inputMode: 'numeric', pattern: '[0-9]*' }} InputProps={{ readOnly: isEditMode }} /></Grid>
//                         <Grid item xs={12} sm={6}><Autocomplete options={countries} getOptionLabel={(option) => option.country_name || ''} value={countries.find(c => c.country_id == currentEmployee.country_id) || null} onChange={(e, nv) => handleCountryChange(nv)} isOptionEqualToValue={(option, value) => option.country_id == value.country_id} renderInput={(params) => (<TextField {...params} label="Country" />)} /></Grid>
//                         <Grid item xs={12} sm={6}><Autocomplete options={states} getOptionLabel={(option) => option.state_name || ''} value={states.find(s => s.state_id == currentEmployee.state_id) || null} onChange={(e, nv) => handleStateChange(nv)} isOptionEqualToValue={(option, value) => option.state_id == value.state_id} disabled={!currentEmployee.country_id} renderInput={(params) => (<TextField {...params} label="State" />)} /></Grid>
//                         <Grid item xs={12} sm={6}><Autocomplete options={employeeHubs} getOptionLabel={(option) => option.employee_hub_name || ''} value={employeeHubs.find(h => h.employee_hub_id == currentEmployee.employee_hub_id) || null} onChange={(e, nv) => setCurrentEmployee(prev => ({ ...prev, employee_hub_id: nv ? nv.employee_hub_id : "" }))} isOptionEqualToValue={(option, value) => option.employee_hub_id == value.employee_hub_id} disabled={!currentEmployee.state_id} renderInput={(params) => (<TextField {...params} label="holiday Hub" />)} /></Grid>
//                         <Grid item xs={12} sm={6}><Autocomplete options={headquarters} getOptionLabel={(option) => option.headquarter_name || ''} value={headquarters.find(h => h.headquarter_id == currentEmployee.headquarter_id) || null} onChange={(e, nv) => setCurrentEmployee(prev => ({ ...prev, headquarter_id: nv ? nv.headquarter_id : "" }))} isOptionEqualToValue={(option, value) => option.headquarter_id == value.headquarter_id} renderInput={(params) => (<TextField {...params} label="Headquarter" />)} /></Grid>
//                         <Grid item xs={12} sm={6}><Autocomplete options={divisions} getOptionLabel={(option) => option.division_name || ''} value={divisions.find(d => d.division_id == currentEmployee.division_id) || null} onChange={(e, nv) => handleDivisionChange(nv)} isOptionEqualToValue={(option, value) => option.division_id == value.division_id} renderInput={(params) => (<TextField {...params} label="Division" />)} /></Grid>
//                         <Grid item xs={12} sm={6}><Autocomplete options={subDivisionOptions} getOptionLabel={(option) => option.label || ''} value={subDivisionOptions.find(sd => sd.value === currentEmployee.subDivision) || null} onChange={(e, nv) => setCurrentEmployee(prev => ({ ...prev, subDivision: nv ? nv.value : "" }))} isOptionEqualToValue={(option, value) => option.value === value.value} disabled={isSubDivisionDisabled} renderInput={(params) => (<TextField {...params} label="Sub Division" />)} /></Grid>
//                         <Grid item xs={12} sm={6}><Autocomplete options={allEmployeesForDropdown} getOptionLabel={(option) => option.label ? `${option.label} (${option.emp_id})` : ''} value={allEmployeesForDropdown.find(e => e.value == currentEmployee.manager_id) || null} onChange={(e, nv) => setCurrentEmployee(prev => ({ ...prev, manager_id: nv ? nv.value : "" }))} isOptionEqualToValue={(option, value) => option.value == value.value} renderInput={(params) => (<TextField {...params} label="Manager" />)} /></Grid>
//                         <Grid item xs={12} sm={6}><Autocomplete options={departments} getOptionLabel={(option) => option.dept_name || ''} value={departments.find(d => d.dept_id == currentEmployee.department_id) || null} onChange={(e, nv) => handleDeptChange(nv)} isOptionEqualToValue={(option, value) => option.dept_id == value.dept_id} renderInput={(params) => (<TextField {...params} label="Department" />)} /></Grid>
//                         <Grid item xs={12} sm={6}><Autocomplete options={designations} getOptionLabel={(option) => option.desig_name || ''} value={designations.find(d => d.desig_id == currentEmployee.designation_id) || null} onChange={(e, nv) => setCurrentEmployee(prev => ({ ...prev, designation_id: nv ? nv.desig_id : "" }))} isOptionEqualToValue={(option, value) => option.desig_id == value.desig_id} disabled={!currentEmployee.department_id} renderInput={(params) => (<TextField {...params} label="Designation" />)} /></Grid>
//                         <Grid item xs={12} sm={6}><Autocomplete options={officeShifts} getOptionLabel={(option) => option.office_shift_name || ''} value={officeShifts.find(s => s.office_shift_id == currentEmployee.officeShift) || null} onChange={(e, nv) => setCurrentEmployee(prev => ({ ...prev, officeShift: nv ? nv.office_shift_id : "" }))} isOptionEqualToValue={(option, value) => option.office_shift_id == value.office_shift_id} renderInput={(params) => (<TextField {...params} label="Office Shift" />)} /></Grid>
//                         <Grid item xs={12} sm={6}><Autocomplete options={statusOptions} getOptionLabel={(option) => option.label} value={statusOptions.find(s => s.value === currentEmployee.status) || null} onChange={(e, nv) => setCurrentEmployee(prev => ({ ...prev, status: nv ? nv.value : 1 }))} isOptionEqualToValue={(option, value) => option.value === value.value} renderInput={(params) => (<TextField {...params} label="Status" />)} /></Grid>
//                         <Grid item xs={12} sm={6}><Autocomplete options={probationOptions} getOptionLabel={(option) => option.label} value={probationOptions.find(p => p.value === currentEmployee.is_probation) || null} onChange={(e, nv) => setCurrentEmployee(prev => ({ ...prev, is_probation: nv ? nv.value : "n" }))} isOptionEqualToValue={(option, value) => option.value === value.value} renderInput={(params) => (<TextField {...params} label="On Probation" />)} /></Grid>
//                         <Grid item xs={12} sm={6}><TextField fullWidth label="Join Date" name="join_date" type="date" value={currentEmployee.join_date || ""} onChange={handleInputChange} InputLabelProps={{ shrink: true }} /></Grid>
//                         <Grid item xs={12} sm={6}><Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}><Button variant="contained" component="label" disabled={isEditMode} sx={purpleButtonSx}>Upload Photo<input type="file" hidden accept="image/*" onChange={handleFileUpload} /></Button>{currentEmployee.avatar && <Avatar src={typeof currentEmployee.avatar === 'string' ? currentEmployee.avatar : URL.createObjectURL(currentEmployee.avatar)} sx={{ width: 56, height: 56 }} />}</Box></Grid>
//                         <Grid item xs={12}>{isFetchingDocs && <CircularProgress />}{employeeDocuments && !isFetchingDocs && (<Box><Typography variant="subtitle1" gutterBottom>Fetched Documents</Typography><Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>{Object.entries(employeeDocuments).map(([name, url]) => (url ? (<Chip key={name} label={name.replace(/_/g, ' ')} component="a" href={url} target="_blank" clickable icon={<LinkIcon />} variant="outlined" color="secondary" size="small" />) : null))}</Box></Box>)}</Grid>
//                         {!isEditMode && (<>
//                             <Grid item xs={12} sm={6}><Autocomplete options={genderOptions} getOptionLabel={(option) => option.label} value={genderOptions.find(g => g.value === currentEmployee.gender) || null} onChange={(e, nv) => setCurrentEmployee(prev => ({ ...prev, gender: nv ? nv.value : "" }))} isOptionEqualToValue={(option, value) => option.value === value.value} renderInput={(params) => (<TextField {...params} label="Gender" />)} /></Grid>
//                             <Grid item xs={12} sm={6}><TextField fullWidth label="Username" name="username" value={currentEmployee.username || ""} onChange={handleInputChange} InputProps={{ readOnly: true }} /></Grid>
//                             <Grid item xs={12} sm={6}><TextField fullWidth label="Password" name="password" value={currentEmployee.password || ""} onChange={handleInputChange} type={showPassword ? 'text' : 'password'} InputProps={{ endAdornment: (<InputAdornment position="end"> <IconButton aria-label="toggle password visibility" onClick={() => setShowPassword((prev) => !prev)} onMouseDown={(e) => e.preventDefault()} edge="end"> {showPassword ? <VisibilityOff /> : <Visibility />} </IconButton> </InputAdornment>) }} /></Grid>
//                             <Grid item xs={12} sm={6}><Autocomplete options={roles} getOptionLabel={(option) => option.role_name || ''} value={roles.find(r => r.index == currentEmployee.role) || null} onChange={(e, nv) => setCurrentEmployee(prev => ({ ...prev, role: nv ? nv.index : "" }))} isOptionEqualToValue={(option, value) => option.index == value.index} renderInput={(params) => (<TextField {...params} label="Role" />)} /></Grid>
//                             <Grid item xs={12} sm={6} md={3}><TextField fullWidth label="Gross Salary monthly" name="grossSalary" type="number" value={currentEmployee.grossSalary || ""} onChange={(e) => { const value = e.target.value; if (/^\d*\.?\d*$/.test(value)) handleInputChange(e); }} /></Grid>
//                             <Grid item xs={12} sm={6} md={3}><TextField fullWidth label="Gross Salary Yearly" name="grossSalaryYearly" type="number" value={currentEmployee.grossSalaryYearly || ""} InputProps={{ readOnly: true }} /></Grid>
//                             <Grid item xs={12} sm={6} md={3}><TextField fullWidth label="CTC Monthly" name="ctcMonthly" type="number" value={currentEmployee.ctcMonthly || ""} InputProps={{ readOnly: true }} /></Grid>
//                             <Grid item xs={12} sm={6} md={3}><TextField fullWidth label="CTC Yearly" name="ctcYearly" type="number" value={currentEmployee.ctcYearly || ""} InputProps={{ readOnly: true }} /></Grid>
//                         </>)}
//                     </Grid>
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={() => setOpenEmployeeForm(false)} disabled={isSaving} sx={cancelButtonSx}>Cancel</Button>
//                     <Button onClick={handleSaveEmployee} variant="contained" disabled={isSaving} sx={purpleButtonSx}>{isSaving ? <CircularProgress size={24} color="inherit" /> : "Save"}</Button>
//                 </DialogActions>
//             </Dialog>
            
//             <TableContainer>
//                 <Table sx={{ minWidth: "100%", whiteSpace: "nowrap" }}>
//                     <TableHead>
//                         <TableRow sx={{ bgcolor: themePurple }}>
//                             <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>SR. NO.</TableCell>
//                             <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>EMPLOYEE</TableCell>
//                             <TableCell sx={{ color: 'white' }}></TableCell>
//                             <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>DEPARTMENT</TableCell>
//                             <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>DESIGNATION</TableCell>
//                             <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>JOIN DATE</TableCell>
//                             <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>STATUS</TableCell>
//                             <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>MANAGER</TableCell>
//                             <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', color: 'white' }}>ACTIONS</TableCell>
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {loading ? (
//                             Array.from(new Array(rowsPerPage)).map((_, index) => (
//                                 <TableRow key={index}>
//                                     <TableCell><Skeleton variant="text" /></TableCell>
//                                     <TableCell><Skeleton variant="text" /></TableCell>
//                                     <TableCell><Skeleton variant="text" /></TableCell>
//                                     <TableCell><Skeleton variant="text" /></TableCell>
//                                     <TableCell><Skeleton variant="text" /></TableCell>
//                                     <TableCell><Skeleton variant="text" /></TableCell>
//                                     <TableCell><Skeleton variant="text" /></TableCell>
//                                     <TableCell><Skeleton variant="text" /></TableCell>
//                                     <TableCell align="center"><Skeleton variant="rectangular" width={80} height={30} /></TableCell>
//                                 </TableRow>
//                             ))
//                         ) : (
//                             (rowsPerPage > 0
//                                 ? filteredEmployees.slice(currentPage * rowsPerPage, currentPage * rowsPerPage + rowsPerPage)
//                                 : filteredEmployees
//                             ).map((employee, index) => (
//                                 <TableRow key={employee.user_id} sx={{ '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' } }} onMouseEnter={() => setHoveredRowId(employee.user_id)} onMouseLeave={() => setHoveredRowId(null)}>
//                                     <TableCell sx={{ fontSize: '0.95rem' }}>{currentPage * rowsPerPage + index + 1}</TableCell>
//                                     <TableCell sx={{ fontSize: '0.95rem' }}>{employee.employee_name}</TableCell>
//                                     <TableCell sx={{ padding: '0 8px', textAlign: 'center' }}>
//                                         {hoveredRowId === employee.user_id && <IconButton onClick={() => handleArrowClick(employee.user_id)} size="small" sx={{ color: themeOrange }}><ArrowForwardIcon fontSize="small" /></IconButton>}
//                                     </TableCell>
//                                     <TableCell sx={{ fontSize: '0.95rem' }}>{employee.department_name || 'N/A'}</TableCell>
//                                     <TableCell sx={{ fontSize: '0.95rem' }}>{employee.designation_name || 'N/A'}</TableCell>
//                                     <TableCell sx={{ fontSize: '0.95rem' }}>{formatDate(employee.join_date)}</TableCell>
//                                     <TableCell sx={{ fontSize: '0.95rem' }}>
//                                         <Chip label={employee.status === 1 ? "Active" : "Inactive"} size="small" sx={{
//                                             bgcolor: employee.status === 1 ? '#4caf50' : themeOrange,
//                                             color: 'white',
//                                             borderRadius: '16px',
//                                             height: '24px',
//                                         }} />
//                                     </TableCell>
//                                     <TableCell sx={{ fontSize: '0.95rem' }}>{employee.manager}</TableCell>
//                                     <TableCell>
//                                         <Box display="flex" justifyContent="center" gap={0.5}>
//                                             <Tooltip title="Edit"><IconButton onClick={() => handleEditEmployee(employee)} sx={{ color: themePurple }}><EditIcon /></IconButton></Tooltip>
//                                             <Tooltip title="Delete"><IconButton onClick={() => handleDeleteEmployee(employee.user_id)} sx={{ color: themeOrange }}><DeleteIcon /></IconButton></Tooltip>
//                                         </Box>
//                                     </TableCell>
//                                 </TableRow>
//                             ))
//                         )}
//                     </TableBody>
//                 </Table>
//             </TableContainer>

//             <Box sx={{ p: 2, borderTop: '1px solid rgba(224, 224, 224, 1)' }}>
//                 {loading ? (
//                     <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                         <Skeleton variant="text" width={150} />
//                         <Skeleton variant="rectangular" width={400} height={40} />
//                     </Box>
//                 ) : (
//                     <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
//                         <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//                             <FormControl variant="outlined" size="small">
//                                 <Select
//                                     value={rowsPerPage}
//                                     onChange={handleRowsPerPageChange}
//                                     sx={{
//                                         backgroundColor: themePurple,
//                                         color: 'white',
//                                         borderRadius: '4px',
//                                         transition: 'background-color 0.3s',
//                                         '&:hover': {
//                                             backgroundColor: themePurpleHover,
//                                         },
//                                         '& .MuiOutlinedInput-notchedOutline': {
//                                             border: 'none',
//                                         },
//                                         '& .MuiSvgIcon-root': {
//                                             color: 'white',
//                                         },
//                                     }}
//                                 >
//                                     {[10, 25, 50, 100].map((value) => (
//                                         <MenuItem key={value} value={value}>{value}</MenuItem>
//                                     ))}
//                                 </Select>
//                             </FormControl>
//                             <Typography variant="body2" color="text.secondary">
//                                 {`1 to ${Math.min(rowsPerPage, filteredEmployees.length)} of ${filteredEmployees.length}`}
//                             </Typography>
//                         </Box>

//                         <Pagination
//                             count={Math.ceil(filteredEmployees.length / rowsPerPage)}
//                             page={currentPage + 1}
//                             onChange={handlePaginationChange}
//                             showFirstButton
//                             showLastButton
//                             sx={{
//                                 '& .MuiPaginationItem-root': {
//                                     borderRadius: '4px',
//                                     transition: 'background-color 0.3s, color 0.3s',
//                                     '&:hover': {
//                                         backgroundColor: themeOrange,
//                                         color: 'white',
//                                     }
//                                 },
//                                 '& .MuiPaginationItem-page': {
//                                     color: themePurple,
//                                     '&.Mui-selected': {
//                                         backgroundColor: themePurple,
//                                         color: 'white',
//                                         '&:hover': {
//                                             backgroundColor: themeOrange,
//                                         }
//                                     },
//                                 },
//                                 '& .MuiPaginationItem-icon': {
//                                     color: themePurple,
//                                 }
//                             }}
//                         />
//                     </Box>
//                 )}
//             </Box>
//         </Box>
//     );
// }



// import React, { useState, useEffect, useMemo, useCallback, useRef } from "react";
// import axios from 'axios';
// import {
//     Box,
//     Typography,
//     Button,
//     Paper,
//     Table,
//     TableBody,
//     TableCell,
//     TableContainer,
//     TableHead,
//     TableRow,
//     TextField,
//     FormControl,
//     InputLabel,
//     Select,
//     MenuItem,
//     Avatar,
//     Chip,
//     IconButton,
//     Tooltip,
//     Dialog,
//     DialogTitle,
//     DialogContent,
//     DialogActions,
//     Grid,
//     CircularProgress,
//     Autocomplete,
//     InputAdornment,
//     useTheme,
//     useMediaQuery,
//     Skeleton,
//     Pagination,
// } from "@mui/material";
// import {
//     Edit as EditIcon,
//     Delete as DeleteIcon,
//     Add as AddIcon,
//     Close as CloseIcon,
//     Download as DownloadIcon,
//     ArrowForward as ArrowForwardIcon,
//     SupervisorAccount as ChangeManagerIcon,
//     Link as LinkIcon,
//     Visibility,
//     VisibilityOff,
//     Search as SearchIcon,
// } from "@mui/icons-material";
// import * as XLSX from "xlsx";
// import { useNavigate } from "react-router-dom";
// import axiosInstance from "../../utils/axiosInstance";
// import Swal from 'sweetalert2';

// const RESUME_BASE_URL = "https://raasbackend.vetrinahealthcare.com/";
// const statusOptions = [{ value: 1, label: 'Active' }, { value: 0, label: 'Inactive' }];
// const probationOptions = [{ value: 'y', label: 'Yes' }, { value: 'n', label: 'No' }];
// const genderOptions = [{ value: 'Male', label: 'Male' }, { value: 'Female', 'label': 'Female' }, { value: 'Other', label: 'Other' }];
// const subDivisionOptions = [{ value: 'VetBiz', label: 'VetBiz' }, { value: 'TredBiz', label: 'TredBiz' }, { value: ' ', label: 'TredBiz Mix' }];

// export default function EmployeesView() {
//     const employeeDialogRef = useRef(null);
//     const changeManagerDialogRef = useRef(null);
//     const muiTheme = useTheme();
//     const isMobile = useMediaQuery(muiTheme.breakpoints.down("sm"));
//     const themePurple = '#8C257C';
//     const themePurpleHover = '#6d1d60';
//     const themeOrange = '#F58E35';

//     const purpleButtonSx = {
//         backgroundColor: themePurple,
//         color: 'white',
//         '&:hover': {
//             backgroundColor: themePurpleHover,
//         },
//     };
//     const cancelButtonSx = {
//         color: '#757575',
//         '&:hover': {
//             backgroundColor: 'rgba(0, 0, 0, 0.04)'
//         }
//     };

//     const [loading, setLoading] = useState(true);
//     const [departments, setDepartments] = useState([]);
//     const [designations, setDesignations] = useState([]);
//     const [searchTerm, setSearchTerm] = useState("");
//     const [openChangeManagerForm, setOpenChangeManagerForm] = useState(false);
//     const [currentPage, setCurrentPage] = useState(0);
//     const [rowsPerPage, setRowsPerPage] = useState(10);
//     const [newManager, setNewManager] = useState("");
//     const [selectedEmployeeForManagerChange, setSelectedEmployeeForManagerChange] = useState("");
//     const [employees, setEmployees] = useState([]);
//     const [hoveredRowId, setHoveredRowId] = useState(null);
//     const [officeShifts, setOfficeShifts] = useState([]);
//     const [isEditMode, setIsEditMode] = useState(false);
//     const [roles, setRoles] = useState([]);
//     const [countries, setCountries] = useState([]);
//     const [states, setStates] = useState([]);
//     const [employeeHubs, setEmployeeHubs] = useState([]);
//     const [headquarters, setHeadquarters] = useState([]);
//     const [divisions, setDivisions] = useState([]);
//     const [allEmployeesForDropdown, setAllEmployeesForDropdown] = useState([]);
//     const [talentPool, setTalentPool] = useState([]);
//     const [isFetchingDocs, setIsFetchingDocs] = useState(false);
//     const [employeeDocuments, setEmployeeDocuments] = useState(null);
//     const [showPassword, setShowPassword] = useState(false);
//     const [isSaving, setIsSaving] = useState(false);
//     const [salaryConfig, setSalaryConfig] = useState(null);

//     const [currentEmployee, setCurrentEmployee] = useState({
//         id: null, firstName: "", middleName: "", lastName: "", email: "", employee_id: "", join_date: "",
//         status: 1, phone: "", avatar: null, country_id: "", state_id: "", employee_hub_id: "",
//         headquarter_id: "", division_id: "", subDivision: "", role: "", is_probation: "n",
//         resumeUrl: "", password: "", gender: "", username: "", grossSalary: "", department_id: "",
//         designation_id: "", manager_id: "", officeShift: "", grossSalaryYearly: "", ctcMonthly: "", ctcYearly: "",
//     });

//     const [openEmployeeForm, setOpenEmployeeForm] = useState(false);

//     // useEffect(() => {
//     //     const fetchInitialData = async () => {
//     //         try {
//     //             const [ depts, empDropdown, shifts, countriesRes, hubs, divs, rolesRes, talent,headquartersRes, salaryConf ] = await Promise.all([
//     //                 axiosInstance.get('api/desig_dept_dropdown/'),
//     //                 axiosInstance.get('employee-dropdown/'),
//     //                 axiosInstance.get('api/office_shift_dropdown/'),
//     //                 axiosInstance.get('api/countries/'),
//     //                 axiosInstance.get('api/employee_hub/'),
//     //                 axiosInstance.get('api/division/'),
//     //                 axiosInstance.get('api/role_list/'),
//     //                 axiosInstance.get('api/search_by_email_vet_talent/'),
//     //                 axios.get("https://tdtlworld.com/hrms-backend/api/headquarters/"),
//     //                 axios.get("https://tdtlworld.com/hrms-backend/api/payroll_setup_configuration/")
//     //             ]);
//     //             setDepartments(depts.data.dept_data || []);
//     //             setAllEmployeesForDropdown(empDropdown.data || []);
//     //             setOfficeShifts(shifts.data.office_shift_data || []);
//     //             if (countriesRes.data.status === 'success') setCountries(countriesRes.data.data || []);
//     //             setDivisions(divs.data || []);
//     //             if (rolesRes.data?.status === "success") setRoles(rolesRes.data.data);
//     //             setHeadquarters(headquartersRes.data || []);
//     //             setTalentPool(talent.data.data || []);

//     //             const configData = salaryConf.data.reduce((acc, item) => {
//     //                 acc[item.particulars] = parseFloat(item.value);
//     //                 return acc;
//     //             }, {});
//     //             setSalaryConfig(configData);

//     //         } catch (error) {
//     //             // *** ERROR HANDLING FIX ***
//     //             // This block is now safer and handles any error during initial data fetch.
//     //             console.error("Error fetching initial data:", error);
//     //             Swal.fire({
//     //                 icon: 'error',
//     //                 title: 'Initialization Error',
//     //                 text: 'Failed to fetch initial application data. Some features may not work as expected.',
//     //                 timer: 4000,
//     //                 showConfirmButton: false
//     //             });

//     //             // Fallback for salary config if it wasn't set due to ANY error in Promise.all
//     //             if (!salaryConfig) {
//     //                  setSalaryConfig({
//     //                     hra: 0.25,
//     //                     basic_plus_da: 0.6,
//     //                     pf_employer_contribution: 0.12,
//     //                     esic_employer_contribution: 0.0325,
//     //                 });
//     //                 console.warn('Salary configuration fallback applied due to an error during initial data fetch.');
//     //             }
//     //         }
//     //     };
//     //     fetchInitialData();
//     // }, []); // salaryConfig is intentionally not in the dependency array to avoid re-running this on fallback set.
// useEffect(() => {
//   const fetchInitialData = async () => {
//     const requests = [
//       axiosInstance.get('api/desig_dept_dropdown/'),
//       axiosInstance.get('employee-dropdown/'),
//       axiosInstance.get('api/office_shift_dropdown/'),
//       axiosInstance.get('api/countries/'),
//       axiosInstance.get('api/employee_hub/'),
//       axiosInstance.get('api/division/'),
//       axiosInstance.get('api/role_list/'),
//       axiosInstance.get('api/search_by_email_vet_talent/'),
//       axios.get("https://tdtlworld.com/hrms-backend/api/headquarters/"),
//       axios.get("https://tdtlworld.com/hrms-backend/api/payroll_setup_configuration/")
//     ];

//     try {
//       const results = await Promise.allSettled(requests);

//       // Helper to get value or undefined
//       const valueAt = (index) => results[index].status === 'fulfilled' ? results[index].value : undefined;

//       const depts = valueAt(0);
//       const empDropdown = valueAt(1);
//       const shifts = valueAt(2);
//       const countriesRes = valueAt(3);
//       const hubs = valueAt(4);
//       const divs = valueAt(5);
//       const rolesRes = valueAt(6);
//       const talent = valueAt(7);
//       const headquartersRes = valueAt(8);
//       const salaryConf = valueAt(9);

//       // Optionally log any rejections for debugging
//       results.forEach((r, i) => {
//         if (r.status === 'rejected') {
//           console.warn(`Request ${i} rejected:`, r.reason?.response?.status || r.reason?.message, r.reason);
//         }
//       });

//       if (depts?.data) setDepartments(depts.data.dept_data ?? []);
//       if (empDropdown?.data) setAllEmployeesForDropdown(empDropdown.data ?? []);
//       if (shifts?.data) setOfficeShifts(shifts.data.office_shift_data ?? []);
//       if (countriesRes?.data && countriesRes.data.status === 'success') setCountries(countriesRes.data.data ?? []);
//       if (divs?.data) setDivisions(divs.data ?? []);
//       if (rolesRes?.data?.status === 'success') setRoles(rolesRes.data.data ?? []);
//       if (headquartersRes?.data) setHeadquarters(headquartersRes.data ?? []);
//       if (talent?.data?.data) setTalentPool(talent.data.data ?? []);

//       // Salary config: only compute if salaryConf exists and is array
//       let configData = null;
//       if (Array.isArray(salaryConf?.data)) {
//         configData = salaryConf.data.reduce((acc, item) => {
//           // guard against missing fields
//           if (item?.particulars) acc[item.particulars] = parseFloat(item.value) || 0;
//           return acc;
//         }, {});
//         setSalaryConfig(configData);
//       } else {
//         // fallback default
//         const fallback = {
//           hra: 0.25,
//           basic_plus_da: 0.6,
//           pf_employer_contribution: 0.12,
//           esic_employer_contribution: 0.0325,
//         };
//         setSalaryConfig(fallback);
//         console.warn('Salary configuration fallback applied (salaryConf missing or invalid).');
//       }

//       // If you still want to show an alert when *all* requests failed, you can detect that:
//       const allRejected = results.every(r => r.status === 'rejected');
//       if (allRejected) {
//         Swal.fire({
//           icon: 'error',
//           title: 'Initialization Error',
//           text: 'Failed to fetch initial application data. Some features may not work as expected.',
//           timer: 4000,
//           showConfirmButton: false
//         });
//       }

//     } catch (outerError) {
//       // This catch is unexpected now (allSettled should avoid it) but keep it defensive
//       console.error("Unexpected error in fetchInitialData:", outerError);
//       Swal.fire({
//         icon: 'error',
//         title: 'Initialization Error',
//         text: 'Failed to fetch initial application data. Some features may not work as expected.',
//         timer: 4000,
//         showConfirmButton: false
//       });
//     }
//   };

//   fetchInitialData();
// }, []); // intentionally empty deps

//     const fetchEmployees = useCallback(() => {
//         setLoading(true);
//         axiosInstance.get('api/employee_details/')
//             .then((response) => setEmployees(Array.isArray(response.data.data) ? response.data.data : []))
//             .catch((error) => {
//                 console.error('Error fetching employees:', error);
//                 setEmployees([]);
//                 Swal.fire({ icon: 'error', title: 'Error', text: 'Failed to fetch employee list.', timer: 3000, showConfirmButton: false });
//             })
//             .finally(() => setLoading(false));
//     }, []);

//     useEffect(() => { fetchEmployees(); }, [fetchEmployees]);
    
//     useEffect(() => {
//         if (!salaryConfig || !currentEmployee.grossSalary) {
//             setCurrentEmployee(prev => ({ ...prev, grossSalaryYearly: "", ctcMonthly: "", ctcYearly: "" }));
//             return;
//         }

//         const grossSalaryMonthly = parseFloat(currentEmployee.grossSalary);
//         const joinDateStr = currentEmployee.join_date;

//         if (isNaN(grossSalaryMonthly) || grossSalaryMonthly <= 0) {
//             setCurrentEmployee(prev => ({ ...prev, grossSalaryYearly: "", ctcMonthly: "", ctcYearly: "" }));
//             return;
//         }

//         const grossSalaryYearly = grossSalaryMonthly * 12;
//         const hra = grossSalaryMonthly * salaryConfig.hra;
//         const pf_employer = Math.min(
//             (grossSalaryMonthly - hra) * salaryConfig.pf_employer_contribution,
//             1800
//         );

//         const esic_applicable = grossSalaryMonthly <= 21000;
//         const esic_employer = esic_applicable
//             ? grossSalaryMonthly * salaryConfig.esic_employer_contribution
//             : 0;

//         let no_of_employment_year = 0;
//         if (joinDateStr) {
//             try {
//                 const date_of_joining = new Date(joinDateStr);
//                 const now = new Date();
//                 if (date_of_joining <= now) {
//                     no_of_employment_year = (now.getTime() - date_of_joining.getTime()) / (1000 * 60 * 60 * 24 * 365.25);
//                 }
//             } catch (e) {
//                 no_of_employment_year = 0;
//             }
//         }
//         no_of_employment_year = Math.max(0, no_of_employment_year);

//         let gratuity = 0;
//         try {
//             if (no_of_employment_year > 5) {
//                 const basic_plus_da = grossSalaryMonthly * salaryConfig.basic_plus_da;
//                 // Gratuity is calculated on completion of service years, not pro-rata for the current year in this context.
//                 // The formula gives an annualized potential amount, which can be interpreted in different ways.
//                 // Sticking to a common interpretation: (15/26 * last_drawn_salary) * completed_years_of_service
//                 // For CTC projection, we will consider the annualized gratuity accrual.
//                 const annualGratuityAccrual = (basic_plus_da * 15 / 26);
//                 gratuity = annualGratuityAccrual / 12; // Monthly accrual
//             }
//         } catch (e) {
//             gratuity = 0;
//         }
//         gratuity = Math.max(0, gratuity);

//         // total_benefit is monthly here
//         const total_benefit = pf_employer + esic_employer + gratuity;
//         const ctc_monthly = grossSalaryMonthly + total_benefit;
//         const ctc_yearly = ctc_monthly * 12;

//         setCurrentEmployee(prev => ({
//             ...prev,
//             grossSalaryYearly: grossSalaryYearly.toFixed(2),
//             ctcMonthly: ctc_monthly.toFixed(2),
//             ctcYearly: ctc_yearly.toFixed(2),
//         }));

//     }, [currentEmployee.grossSalary, currentEmployee.join_date, salaryConfig]);

//     const handleCountryChange = (selectedCountry) => {
//         const countryId = selectedCountry ? selectedCountry.country_id : "";
//         const countryName = selectedCountry ? selectedCountry.country_name : null;
//         setCurrentEmployee(prev => ({ ...prev, country_id: countryId, state_id: "", employee_hub_id: "" }));
//         setStates([]);
//         setEmployeeHubs([]);
//         if (countryName) {
//             axiosInstance.get(`api/states/?country_name=${countryName}`)
//                 .then(res => { if (res.data.status === "success") setStates(res.data.data || []); })
//                 .catch(err => {
//                     console.error("Error fetching states:", err);
//                     Swal.fire({ icon: 'error', title: 'Error', text: 'Failed to fetch states.', target: employeeDialogRef.current, timer: 3000, showConfirmButton: false });
//                 });
//         }
//     };

//     const handleStateChange = (selectedState) => {
//         const stateId = selectedState ? selectedState.state_id : "";
//         setCurrentEmployee(prev => ({ ...prev, state_id: stateId, employee_hub_id: "" }));
//         setEmployeeHubs([]);
//         if (stateId) {
//             axiosInstance.get(`api/employee_hub_dropdown/${stateId}/`)
//                 .then(res => { if (res.data.status === "success") setEmployeeHubs(res.data.data || []); })
//                 .catch(err => {
//                     console.error("Error fetching employee hubs:", err);
//                     Swal.fire({ icon: 'error', title: 'Error', text: 'Failed to fetch holiday hubs.', target: employeeDialogRef.current, timer: 3000, showConfirmButton: false });
//                 });
//         }
//     };

//     const handleDeptChange = (selectedDept) => {
//         const deptId = selectedDept ? selectedDept.dept_id : "";
//         setCurrentEmployee((prev) => ({ ...prev, department_id: deptId, designation_id: "" }));
//         if (deptId) {
//             axiosInstance.get(`api/desig_dept_dropdown/?dept_id=${deptId}/`)
//                 .then((res) => setDesignations(res.data.desig_data || []))
//                 .catch((err) => {
//                     console.error("Error fetching designations:", err);
//                     Swal.fire({ icon: 'error', title: 'Error', text: 'Failed to load designations.', target: employeeDialogRef.current, timer: 3000, showConfirmButton: false });
//                 });
//         } else {
//             setDesignations([]);
//         }
//     };

//     const handleDivisionChange = (selectedDivision) => {
//         const divisionId = selectedDivision ? selectedDivision.division_id : "";
//         if (selectedDivision && selectedDivision.division_name !== 'Livestock') {
//             setCurrentEmployee(prev => ({ ...prev, division_id: divisionId, subDivision: "" }));
//         } else {
//             setCurrentEmployee(prev => ({ ...prev, division_id: divisionId }));
//         }
//     };

//     const handleChangeManager = async () => {
//         if (!selectedEmployeeForManagerChange || !newManager) {
//             Swal.fire({ icon: 'warning', title: 'Incomplete Selection', text: 'Please select an employee and a new manager.', target: changeManagerDialogRef.current });
//             return;
//         }
//         try {
//             await axiosInstance.put("api/change_manager/", { user_id: selectedEmployeeForManagerChange, manager_id: newManager });
//             await fetchEmployees();
//             Swal.fire({ icon: 'success', title: 'Success', text: 'Manager changed successfully!', timer: 3000, showConfirmButton: false });
//             setOpenChangeManagerForm(false);
//             setSelectedEmployeeForManagerChange("");
//             setNewManager("");
//         } catch (error) {
//             console.error("Error changing manager:", error);
//             Swal.fire({ icon: 'error', title: 'Operation Failed', text: `Error changing manager: ${error.response?.data?.message || "An error occurred."}`, target: changeManagerDialogRef.current });
//         }
//     };

//     const navigate = useNavigate();
//     const handleArrowClick = (id) => navigate(`/hrms/admindashboard/employeedetail/${id}`);

//     const handleInputChange = (event) => {
//         const { name, value } = event.target;
//         setCurrentEmployee((prev) => ({ ...prev, [name]: value }));
//     };

//     const handleAddEmployee = async () => {
//         try {
//             const maxIdResponse = await axios.get("https://tdtlworld.com/hrms-backend/api/get_max_employee_id/");
//             const newEmpId = maxIdResponse.data.employee_id;
//             setCurrentEmployee({
//                 emp_id: newEmpId, firstName: "", middleName: "", lastName: "", email: "", phone: "",
//                 avatar: null, officeShift: "", status: 1, join_date: "", gender: "", username: newEmpId, password: "",
//                 role: "", grossSalary: "", department_id: "", designation_id: "", manager_id: "",
//                 country_id: "", state_id: "", employee_hub_id: "", headquarter_id: "", division_id: "",
//                 company_id: 2, is_probation: "n", resumeUrl: "", subDivision: "", grossSalaryYearly: "", ctcMonthly: "", ctcYearly: "",
//                 employee_id: "",
//             });
//             setDesignations([]); setStates([]); setEmployeeHubs([]); setEmployeeDocuments(null);
//             setIsEditMode(false); setShowPassword(false); setOpenEmployeeForm(true);
//         } catch (error) {
//             console.error("Error fetching max employee ID:", error);
//             Swal.fire({ icon: 'error', title: 'Error', text: 'Failed to initialize employee form.', timer: 3000, showConfirmButton: false });
//         }
//     };

//     const handleTalentSelect = async (event, selectedOption) => {
//         setEmployeeDocuments(null);
//         setCurrentEmployee(prev => ({ ...prev, resumeUrl: "" }));
//         if (!selectedOption) {
//             setCurrentEmployee(prev => ({ ...prev, firstName: "", middleName: "", lastName: "", email: "", phone: "", gender: "", country_id: "", state_id: "" }));
//             return;
//         }
//         const talent = talentPool.find(p => p.email === selectedOption.email);
//         if (!talent) return;

//         const selectedCountry = countries.find(c => c.country_name === talent.country);
//         const resumeLink = talent.resume ? `${RESUME_BASE_URL}${talent.resume}` : "";

//         setCurrentEmployee(prev => ({
//             ...prev, firstName: talent.first_name || "", middleName: talent.middle_name || "",
//             lastName: talent.last_name || "", email: talent.email || "", phone: talent.phone || "",
//             gender: talent.gender || "", country_id: selectedCountry ? selectedCountry.country_id : "",
//             state_id: '', employee_hub_id: '', resumeUrl: resumeLink,
//         }));

//         if (selectedCountry) {
//             try {
//                 const statesRes = await axiosInstance.get(`api/states/?country_name=${selectedCountry.country_name}`);
//                 if (statesRes.data.status === "success") {
//                     const fetchedStates = statesRes.data.data || [];
//                     setStates(fetchedStates);
//                     const selectedState = fetchedStates.find(s => s.state_name === talent.state);
//                     if (selectedState) {
//                         setCurrentEmployee(prev => ({ ...prev, state_id: selectedState.state_id }));
//                         const hubsRes = await axiosInstance.get(`api/employee_hub_dropdown/${selectedState.state_id}/`);
//                         if (hubsRes.data.status === "success") setEmployeeHubs(hubsRes.data.data || []);
//                     }
//                 }
//             } catch (err) { console.error("Error fetching dependent data for talent:", err); }
//         }

//         setIsFetchingDocs(true);
//         try {
//             const docResponse = await axios.post('https://raasbackend.vetrinahealthcare.com/fetch_documents/', { email_id: talent.email });
//             setEmployeeDocuments(docResponse.data.status === 'success' && docResponse.data.documents ? docResponse.data.documents : null);
//         } catch (error) {
//             console.error("Error fetching documents:", error);
//             setEmployeeDocuments(null);
//         } finally {
//             setIsFetchingDocs(false);
//         }
//     };

//     const handleEditEmployee = async (employee) => {
//         if (!employee || !employee.user_id) return;
//         try {
//             const response = await axiosInstance.get(`api/edit_employee/${employee.user_id}/`);
//             if (response.data.status !== "success" || response.data.data.length === 0) {
//                 Swal.fire({ icon: 'error', title: 'Error', text: 'Failed to load employee details.', timer: 3000, showConfirmButton: false });
//                 return;
//             }
//             const empData = response.data.data[0];
//             const [desigRes, statesRes, hubsRes] = await Promise.all([
//                 axiosInstance.get(`api/desig_dept_dropdown/?dept_id=${empData.department_id}/`),
//                 empData.country_name ? axiosInstance.get(`api/states/?country_name=${empData.country_name}`) : Promise.resolve({ data: { data: [] } }),
//                 empData.state ? axiosInstance.get(`api/employee_hub_dropdown/${empData.state}/`) : Promise.resolve({ data: { data: [] } })
//             ]);

//             setDesignations(desigRes.data.desig_data || []);
//             setStates(statesRes.data.data || []);
//             setEmployeeHubs(hubsRes.data.data || []);
            
//             const officeShiftObj = officeShifts.find(s => s.office_shift_name === empData.office_shift);
//             const nameParts = (empData.emp_name || "").split(" ");
//             const selectedCountry = countries.find(c => c.country_name === empData.country_name);
//             const selectedHeadquarter = headquarters.find(hq => hq.headquarter_name === empData.headquarter);

//             let finalSubDivisionValue = empData.sub_division || "";
//             if (finalSubDivisionValue === "Tred") {
//                 finalSubDivisionValue = "TredBiz";
//             }

//             setCurrentEmployee({
//                 id: employee.user_id,
//                 firstName: nameParts[0] || "",
//                 middleName: nameParts.length > 2 ? nameParts.slice(1, -1).join(" ") : "",
//                 lastName: nameParts.length > 1 ? nameParts[nameParts.length - 1] : "",
//                 email: empData.email || "",
//                 employee_id: empData.employee_id || "",
//                 phone: empData.phone || "",
//                 manager_id: empData.manager_id ? Number(empData.manager_id) : "",
//                 designation_id: empData.designation_id ? Number(empData.designation_id) : "",
//                 department_id: empData.department_id ? Number(empData.department_id) : "",
//                 headquarter_id: selectedHeadquarter ? selectedHeadquarter.headquarter_id : "",
//                 subDivision: finalSubDivisionValue,
//                 division_id: empData.division_id ? Number(empData.division_id) : "",
//                 state_id: empData.state ? Number(empData.state) : "",
//                 employee_hub_id: empData.employee_hub_id ? Number(empData.employee_hub_id) : "",
//                 role: empData.role_id ? Number(empData.role_id) : "",
//                 officeShift: officeShiftObj ? Number(officeShiftObj.office_shift_id) : "",
//                 status: Number(empData.status),
//                 join_date: empData.join_date ? empData.join_date.split(" ")[0] : "",
//                 country_id: selectedCountry ? Number(selectedCountry.country_id) : "",
//                 avatar: empData.profile_photo || "",
//                 is_probation: empData.probation?.toLowerCase() === 'y' ? 'y' : 'n',
//                 resumeUrl: "",
//             });

//             setIsEditMode(true);
//             setOpenEmployeeForm(true);
//             setShowPassword(false);
//         } catch (error) {
//             console.error("Error fetching employee details for edit:", error);
//             Swal.fire({ icon: 'error', title: 'Error', text: 'Failed to fetch complete employee details.', timer: 3000, showConfirmButton: false });
//         }
//     };

//     const handleSaveEmployee = async () => {
//         if (!isEditMode) {
//             const requiredFields = {
//                 firstName: 'First Name', lastName: 'Last Name', email: 'Email', phone: 'Phone', country_id: 'Country',
//                 state_id: 'State', employee_hub_id: 'holiday Hub', headquarter_id: 'Headquarter', division_id: 'Division',
//                 manager_id: 'Manager', department_id: 'Department', designation_id: 'Designation', officeShift: 'Office Shift',
//                 join_date: 'Join Date', avatar: 'Photo', gender: 'Gender', username: 'Username', password: 'Password',
//                 role: 'Role', grossSalary: 'Gross Salary'
//             };
//             const selectedDivision = divisions.find(d => d.division_id == currentEmployee.division_id);
//             if (selectedDivision && selectedDivision.division_name === 'Livestock' && !currentEmployee.subDivision) {
//                 Swal.fire({ icon: 'error', title: 'Validation Error', text: 'Sub Division is required when Division is Livestock.', target: employeeDialogRef.current });
//                 return;
//             }
//             for (const field in requiredFields) {
//                 if (!currentEmployee[field]) {
//                     Swal.fire({ icon: 'error', title: 'Validation Error', text: `The field "${requiredFields[field]}" is required.`, target: employeeDialogRef.current });
//                     return;
//                 }
//             }
//         }
//         const formData = new FormData();
//         const keyMap = {
//             firstName: 'first_name',
//             middleName: 'middle_name',
//             lastName: 'last_name',
//             officeShift: 'office_shift',
//             join_date: 'join_date',
//             grossSalary: 'gross_salary',
//             headquarter_id: 'headquarter_id',
//             grossSalaryYearly: 'gross_salary_yearly',
//             ctcMonthly: 'ctc_monthly',
//             ctcYearly: 'ctc_yearly',
//         };
//         Object.keys(currentEmployee).forEach(key => {
//             if (key === 'avatar' && currentEmployee.avatar instanceof File) {
//                 formData.append("file", currentEmployee.avatar);
//             } else if (key !== 'resumeUrl' && currentEmployee[key] !== null && currentEmployee[key] !== undefined && currentEmployee[key] !== "") {
//                 const backendKey = keyMap[key] || key;
//                 formData.append(backendKey, currentEmployee[key]);
//             }
//         });

//         setIsSaving(true);
//         try {
//             const action = isEditMode ? 'updated' : 'added';
//             if (isEditMode) {
//                 formData.append("user_id", currentEmployee.id);
//                 await axiosInstance.put("api/edit_employee/", formData, { headers: { "Content-Type": "multipart/form-data" } });
//             } else {
//                 await axiosInstance.post("api/add_employee/", formData, { headers: { "Content-Type": "multipart/form-data" } });
//             }
//             setOpenEmployeeForm(false);
//             await fetchEmployees();
//             Swal.fire({ icon: 'success', title: 'Success', text: `Employee ${action} successfully!`, timer: 3000, showConfirmButton: false });

//         } catch (error) {
//             console.error("Error saving employee:", error);
//             const errorMessage = error.response?.data?.message || error.response?.data?.detail || "An unexpected error occurred.";
//             Swal.fire({ icon: 'error', title: `Operation failed`, text: `${errorMessage}`, target: employeeDialogRef.current });
//         } finally {
//             setIsSaving(false);
//         }
//     };

//     const handleDeleteEmployee = (employeeId) => {
//         if (!employeeId) return;
//         Swal.fire({
//             title: 'Are you sure?', text: "You won't be able to revert this!", icon: 'warning',
//             showCancelButton: true, confirmButtonColor: themePurple, cancelButtonColor: themeOrange,
//             confirmButtonText: 'Yes, delete it!'
//         }).then((result) => {
//             if (result.isConfirmed) {
//                 axiosInstance.delete("api/edit_employee/", { data: { user_id: employeeId } })
//                     .then(() => {
//                         fetchEmployees();
//                         Swal.fire({ icon: 'success', title: 'Deleted!', text: 'The employee has been deleted.', timer: 3000, showConfirmButton: false });
//                     })
//                     .catch((error) => {
//                         console.error("Error deleting employee: ", error);
//                         const errorMessage = error.response?.data?.message || error.response?.data?.detail || "Failed to delete employee.";
//                         Swal.fire({ icon: 'error', title: 'Error', text: errorMessage, timer: 3000, showConfirmButton: false });
//                     });
//             }
//         });
//     };

//     const handleExportEmployees = () => {
//         if (employees.length === 0) {
//             Swal.fire({ icon: 'info', title: 'Info', text: 'There is no employee data to export.', timer: 3000, showConfirmButton: false });
//             return;
//         }
//         const worksheet = XLSX.utils.json_to_sheet(employees);
//         const workbook = XLSX.utils.book_new();
//         XLSX.utils.book_append_sheet(workbook, worksheet, "Employees");
//         XLSX.writeFile(workbook, "EmployeesData.xlsx");
//     };

//     const sortedEmployees = useMemo(() => {
//         if (!Array.isArray(employees)) return [];
//         return [...employees].sort((a, b) => b.user_id - a.user_id);
//     }, [employees]);

//     const filteredEmployees = useMemo(() => sortedEmployees.filter(
//         (e) =>
//             (e.employee_name && e.employee_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
//             (e.department_name && e.department_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
//             (e.designation_name && e.designation_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
//             (e.join_date && e.join_date.toLowerCase().includes(searchTerm.toLowerCase())) ||
//             (e.manager && e.manager.toLowerCase().includes(searchTerm.toLowerCase()))
//     ), [sortedEmployees, searchTerm]);

//     const handlePaginationChange = (event, newPage) => {
//         setCurrentPage(newPage - 1);
//     };

//     const handleRowsPerPageChange = (event) => {
//         setRowsPerPage(parseInt(event.target.value, 10));
//         setCurrentPage(0);
//     };

//     const handleFileUpload = (e) => {
//         const file = e.target.files[0];
//         if (file) setCurrentEmployee((prev) => ({ ...prev, avatar: file }));
//     };

//     const isSubDivisionDisabled = useMemo(() => {
//         if (!currentEmployee.division_id) return true;
//         const selectedDivision = divisions.find(d => d.division_id == currentEmployee.division_id);
//         return !selectedDivision || selectedDivision.division_name !== 'Livestock';
//     }, [currentEmployee.division_id, divisions]);

//     const formatDate = (dateString) => {
//         if (!dateString) return '';
//         try {
//             const date = new Date(dateString);
//             const day = String(date.getDate()).padStart(2, '0');
//             const month = String(date.getMonth() + 1).padStart(2, '0');
//             const year = date.getFullYear();
//             return `${day}/${month}/${year}`;
//         } catch (error) {
//             console.error("Could not format date:", dateString);
//             return dateString.split(" ")[0];
//         }
//     };

//     return (
//         <Box component={Paper} p={3}>
//             <Typography variant="h4" sx={{ color: themePurple, fontWeight: "bold", mb: 5 }}>
//                 Employees List
//             </Typography>
//             <Box sx={{
//                 display: "flex",
//                 justifyContent: "space-between",
//                 alignItems: "center",
//                 flexDirection: isMobile ? "column" : "row",
//                 gap: 2,
//                 mb: 2
//             }}>
//                 <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
//                     <Button variant="contained" startIcon={<AddIcon />} onClick={handleAddEmployee} sx={purpleButtonSx}>Add Employee</Button>
//                     <Button variant="contained" startIcon={<DownloadIcon />} onClick={handleExportEmployees} sx={purpleButtonSx}>Export</Button>
//                     <Button variant="contained" startIcon={<ChangeManagerIcon />} onClick={() => setOpenChangeManagerForm(true)} sx={purpleButtonSx}>Change Manager</Button>
//                 </Box>
//                 <TextField
//                     size="small"
//                     placeholder="Search..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     sx={{ width: isMobile ? "100%" : "auto" }}
//                     InputProps={{
//                         startAdornment: (
//                             <InputAdornment position="start">
//                                 <SearchIcon />
//                             </InputAdornment>
//                         ),
//                     }}
//                 />
//             </Box>

//             <Dialog open={openChangeManagerForm} onClose={() => setOpenChangeManagerForm(false)} maxWidth="sm" fullWidth ref={changeManagerDialogRef}>
//                 <DialogTitle sx={{ color: themePurple, fontWeight: 'bold' }}>
//                     Change Manager
//                     <IconButton onClick={() => setOpenChangeManagerForm(false)} sx={{ position: "absolute", right: 8, top: 8, color: (theme) => theme.palette.grey[500] }}><CloseIcon /></IconButton>
//                 </DialogTitle>
//                 <DialogContent><Grid container spacing={2} sx={{ mt: 1 }}><Grid item xs={12}><FormControl fullWidth><InputLabel>Select Employee</InputLabel><Select value={selectedEmployeeForManagerChange} onChange={(e) => setSelectedEmployeeForManagerChange(e.target.value)} label="Select Employee">{allEmployeesForDropdown.map((emp) => (<MenuItem key={emp.value} value={emp.value}>{`${emp.label} (${emp.emp_id})`}</MenuItem>))}</Select></FormControl></Grid><Grid item xs={12}><FormControl fullWidth><InputLabel>Select New Manager</InputLabel><Select value={newManager} onChange={(e) => setNewManager(e.target.value)} label="Select New Manager">{allEmployeesForDropdown.map((emp) => (<MenuItem key={emp.value} value={emp.value}>{`${emp.label} (${emp.emp_id})`}</MenuItem>))}</Select></FormControl></Grid></Grid></DialogContent>
//                 <DialogActions>
//                     <Button onClick={() => setOpenChangeManagerForm(false)} sx={cancelButtonSx}>Cancel</Button>
//                     <Button onClick={handleChangeManager} variant="contained" sx={purpleButtonSx}>Save</Button>
//                 </DialogActions>
//             </Dialog>

//             <Dialog open={openEmployeeForm} onClose={() => setOpenEmployeeForm(false)} maxWidth="md" fullWidth ref={employeeDialogRef}>
//                 <DialogTitle sx={{ color: '#8C257C ', fontWeight: "bold", fontSize: '2rem' }}>
//                     {isEditMode ? "Edit Employee" : "Add Employee"}
//                     <IconButton onClick={() => setOpenEmployeeForm(false)} sx={{ position: "absolute", right: 8, top: 8, color: (theme) => theme.palette.grey[500] }}><CloseIcon /></IconButton>
//                 </DialogTitle>
//                 <DialogContent>
//                     <Grid container spacing={2} sx={{ mt: 1 }}>
//                         {!isEditMode && (<Grid item xs={12}><Autocomplete options={talentPool} getOptionLabel={(option) => option.email || ""} onChange={handleTalentSelect} onInputChange={(event, newInputValue) => { if (!talentPool.find(p => p.email === newInputValue)) { setCurrentEmployee(prev => ({ ...prev, email: newInputValue })); } }} renderInput={(params) => (<TextField {...params} label="Search Email to Auto-fill" />)} /></Grid>)}
//                         <Grid item xs={12} sm={4}><TextField fullWidth label="First Name" name="firstName" value={currentEmployee.firstName || ""} onChange={handleInputChange} onKeyPress={(e) => { if (!/^[A-Za-z]$/.test(e.key)) e.preventDefault(); }} InputProps={{ readOnly: isEditMode }} /></Grid>
//                         <Grid item xs={12} sm={4}><TextField fullWidth label="Middle Name" name="middleName" value={currentEmployee.middleName || ""} onChange={handleInputChange} onKeyPress={(e) => { if (!/^[A-Za-z]$/.test(e.key)) e.preventDefault(); }} InputProps={{ readOnly: isEditMode }} /></Grid>
//                         <Grid item xs={12} sm={4}><TextField fullWidth label="Last Name" name="lastName" value={currentEmployee.lastName || ""} onChange={handleInputChange} onKeyPress={(e) => { if (!/^[A-Za-z]$/.test(e.key)) e.preventDefault(); }} InputProps={{ readOnly: isEditMode }} /></Grid>
//                         <Grid item xs={12} sm={6}><TextField fullWidth label="Email" name="email" value={currentEmployee.email || ''} onChange={handleInputChange} InputProps={{ readOnly: isEditMode || !!talentPool.find(p => p.email === currentEmployee.email) }} /></Grid>
//                         {isEditMode && (<Grid item xs={12} sm={6}><TextField fullWidth label="Employee ID" name="employee_id" value={currentEmployee.employee_id || ""} InputProps={{ readOnly: true }} /></Grid>)}
//                         <Grid item xs={12} sm={6}><TextField fullWidth label="Phone" name="phone" value={currentEmployee.phone || ''} onChange={(e) => { const value = e.target.value; if (/^\d{0,10}$/.test(value)) handleInputChange(e); }} inputProps={{ maxLength: 10, inputMode: 'numeric', pattern: '[0-9]*' }} InputProps={{ readOnly: isEditMode }} /></Grid>
//                         <Grid item xs={12} sm={6}><Autocomplete options={countries} getOptionLabel={(option) => option.country_name || ''} value={countries.find(c => c.country_id == currentEmployee.country_id) || null} onChange={(e, nv) => handleCountryChange(nv)} isOptionEqualToValue={(option, value) => option.country_id == value.country_id} renderInput={(params) => (<TextField {...params} label="Country" />)} /></Grid>
//                         <Grid item xs={12} sm={6}><Autocomplete options={states} getOptionLabel={(option) => option.state_name || ''} value={states.find(s => s.state_id == currentEmployee.state_id) || null} onChange={(e, nv) => handleStateChange(nv)} isOptionEqualToValue={(option, value) => option.state_id == value.state_id} disabled={!currentEmployee.country_id} renderInput={(params) => (<TextField {...params} label="State" />)} /></Grid>
//                         <Grid item xs={12} sm={6}><Autocomplete options={employeeHubs} getOptionLabel={(option) => option.employee_hub_name || ''} value={employeeHubs.find(h => h.employee_hub_id == currentEmployee.employee_hub_id) || null} onChange={(e, nv) => setCurrentEmployee(prev => ({ ...prev, employee_hub_id: nv ? nv.employee_hub_id : "" }))} isOptionEqualToValue={(option, value) => option.employee_hub_id == value.employee_hub_id} disabled={!currentEmployee.state_id} renderInput={(params) => (<TextField {...params} label="holiday Hub" />)} /></Grid>
//                         <Grid item xs={12} sm={6}><Autocomplete options={headquarters} getOptionLabel={(option) => option.headquarter_name || ''} value={headquarters.find(h => h.headquarter_id == currentEmployee.headquarter_id) || null} onChange={(e, nv) => setCurrentEmployee(prev => ({ ...prev, headquarter_id: nv ? nv.headquarter_id : "" }))} isOptionEqualToValue={(option, value) => option.headquarter_id == value.headquarter_id} renderInput={(params) => (<TextField {...params} label="Headquarter" />)} /></Grid>
//                         <Grid item xs={12} sm={6}><Autocomplete options={divisions} getOptionLabel={(option) => option.division_name || ''} value={divisions.find(d => d.division_id == currentEmployee.division_id) || null} onChange={(e, nv) => handleDivisionChange(nv)} isOptionEqualToValue={(option, value) => option.division_id == value.division_id} renderInput={(params) => (<TextField {...params} label="Division" />)} /></Grid>
//                         <Grid item xs={12} sm={6}><Autocomplete options={subDivisionOptions} getOptionLabel={(option) => option.label || ''} value={subDivisionOptions.find(sd => sd.value === currentEmployee.subDivision) || null} onChange={(e, nv) => setCurrentEmployee(prev => ({ ...prev, subDivision: nv ? nv.value : "" }))} isOptionEqualToValue={(option, value) => option.value === value.value} disabled={isSubDivisionDisabled} renderInput={(params) => (<TextField {...params} label="Sub Division" />)} /></Grid>
//                         <Grid item xs={12} sm={6}><Autocomplete options={allEmployeesForDropdown} getOptionLabel={(option) => option.label ? `${option.label} (${option.emp_id})` : ''} value={allEmployeesForDropdown.find(e => e.value == currentEmployee.manager_id) || null} onChange={(e, nv) => setCurrentEmployee(prev => ({ ...prev, manager_id: nv ? nv.value : "" }))} isOptionEqualToValue={(option, value) => option.value == value.value} renderInput={(params) => (<TextField {...params} label="Manager" />)} /></Grid>
//                         <Grid item xs={12} sm={6}><Autocomplete options={departments} getOptionLabel={(option) => option.dept_name || ''} value={departments.find(d => d.dept_id == currentEmployee.department_id) || null} onChange={(e, nv) => handleDeptChange(nv)} isOptionEqualToValue={(option, value) => option.dept_id == value.dept_id} renderInput={(params) => (<TextField {...params} label="Department" />)} /></Grid>
//                         <Grid item xs={12} sm={6}><Autocomplete options={designations} getOptionLabel={(option) => option.desig_name || ''} value={designations.find(d => d.desig_id == currentEmployee.designation_id) || null} onChange={(e, nv) => setCurrentEmployee(prev => ({ ...prev, designation_id: nv ? nv.desig_id : "" }))} isOptionEqualToValue={(option, value) => option.desig_id == value.desig_id} disabled={!currentEmployee.department_id} renderInput={(params) => (<TextField {...params} label="Designation" />)} /></Grid>
//                         <Grid item xs={12} sm={6}><Autocomplete options={officeShifts} getOptionLabel={(option) => option.office_shift_name || ''} value={officeShifts.find(s => s.office_shift_id == currentEmployee.officeShift) || null} onChange={(e, nv) => setCurrentEmployee(prev => ({ ...prev, officeShift: nv ? nv.office_shift_id : "" }))} isOptionEqualToValue={(option, value) => option.office_shift_id == value.office_shift_id} renderInput={(params) => (<TextField {...params} label="Office Shift" />)} /></Grid>
//                         <Grid item xs={12} sm={6}><Autocomplete options={statusOptions} getOptionLabel={(option) => option.label} value={statusOptions.find(s => s.value === currentEmployee.status) || null} onChange={(e, nv) => setCurrentEmployee(prev => ({ ...prev, status: nv ? nv.value : 1 }))} isOptionEqualToValue={(option, value) => option.value === value.value} renderInput={(params) => (<TextField {...params} label="Status" />)} /></Grid>
//                         <Grid item xs={12} sm={6}><Autocomplete options={probationOptions} getOptionLabel={(option) => option.label} value={probationOptions.find(p => p.value === currentEmployee.is_probation) || null} onChange={(e, nv) => setCurrentEmployee(prev => ({ ...prev, is_probation: nv ? nv.value : "n" }))} isOptionEqualToValue={(option, value) => option.value === value.value} renderInput={(params) => (<TextField {...params} label="On Probation" />)} /></Grid>
//                         <Grid item xs={12} sm={6}><TextField fullWidth label="Join Date" name="join_date" type="date" value={currentEmployee.join_date || ""} onChange={handleInputChange} InputLabelProps={{ shrink: true }} /></Grid>
//                         <Grid item xs={12} sm={6}><Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}><Button variant="contained" component="label" disabled={isEditMode} sx={purpleButtonSx}>Upload Photo<input type="file" hidden accept="image/*" onChange={handleFileUpload} /></Button>{currentEmployee.avatar && <Avatar src={typeof currentEmployee.avatar === 'string' ? currentEmployee.avatar : URL.createObjectURL(currentEmployee.avatar)} sx={{ width: 56, height: 56 }} />}</Box></Grid>
//                         <Grid item xs={12}>{isFetchingDocs && <CircularProgress />}{employeeDocuments && !isFetchingDocs && (<Box><Typography variant="subtitle1" gutterBottom>Fetched Documents</Typography><Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>{Object.entries(employeeDocuments).map(([name, url]) => (url ? (<Chip key={name} label={name.replace(/_/g, ' ')} component="a" href={url} target="_blank" clickable icon={<LinkIcon />} variant="outlined" color="secondary" size="small" />) : null))}</Box></Box>)}</Grid>
//                         {!isEditMode && (<>
//                             <Grid item xs={12} sm={6}><Autocomplete options={genderOptions} getOptionLabel={(option) => option.label} value={genderOptions.find(g => g.value === currentEmployee.gender) || null} onChange={(e, nv) => setCurrentEmployee(prev => ({ ...prev, gender: nv ? nv.value : "" }))} isOptionEqualToValue={(option, value) => option.value === value.value} renderInput={(params) => (<TextField {...params} label="Gender" />)} /></Grid>
//                             <Grid item xs={12} sm={6}><TextField fullWidth label="Username" name="username" value={currentEmployee.username || ""} onChange={handleInputChange} InputProps={{ readOnly: true }} /></Grid>
//                             <Grid item xs={12} sm={6}><TextField fullWidth label="Password" name="password" value={currentEmployee.password || ""} onChange={handleInputChange} type={showPassword ? 'text' : 'password'} InputProps={{ endAdornment: (<InputAdornment position="end"> <IconButton aria-label="toggle password visibility" onClick={() => setShowPassword((prev) => !prev)} onMouseDown={(e) => e.preventDefault()} edge="end"> {showPassword ? <VisibilityOff /> : <Visibility />} </IconButton> </InputAdornment>) }} /></Grid>
//                             <Grid item xs={12} sm={6}><Autocomplete options={roles} getOptionLabel={(option) => option.role_name || ''} value={roles.find(r => r.index == currentEmployee.role) || null} onChange={(e, nv) => setCurrentEmployee(prev => ({ ...prev, role: nv ? nv.index : "" }))} isOptionEqualToValue={(option, value) => option.index == value.index} renderInput={(params) => (<TextField {...params} label="Role" />)} /></Grid>
//                             <Grid item xs={12} sm={6} md={3}><TextField fullWidth label="Gross Salary monthly" name="grossSalary" type="number" value={currentEmployee.grossSalary || ""} onChange={(e) => { const value = e.target.value; if (/^\d*\.?\d*$/.test(value)) handleInputChange(e); }} /></Grid>
//                             <Grid item xs={12} sm={6} md={3}><TextField fullWidth label="Gross Salary Yearly" name="grossSalaryYearly" type="number" value={currentEmployee.grossSalaryYearly || ""} InputProps={{ readOnly: true }} /></Grid>
//                             <Grid item xs={12} sm={6} md={3}><TextField fullWidth label="CTC Monthly" name="ctcMonthly" type="number" value={currentEmployee.ctcMonthly || ""} InputProps={{ readOnly: true }} /></Grid>
//                             <Grid item xs={12} sm={6} md={3}><TextField fullWidth label="CTC Yearly" name="ctcYearly" type="number" value={currentEmployee.ctcYearly || ""} InputProps={{ readOnly: true }} /></Grid>
//                         </>)}
//                     </Grid>
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={() => setOpenEmployeeForm(false)} disabled={isSaving} sx={cancelButtonSx}>Cancel</Button>
//                     <Button onClick={handleSaveEmployee} variant="contained" disabled={isSaving} sx={purpleButtonSx}>{isSaving ? <CircularProgress size={24} color="inherit" /> : "Save"}</Button>
//                 </DialogActions>
//             </Dialog>
            
//             <TableContainer>
//                 <Table sx={{ minWidth: "100%", whiteSpace: "nowrap" }}>
//                     <TableHead>
//                         <TableRow sx={{ bgcolor: themePurple }}>
//                             <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>SR. NO.</TableCell>
//                             <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>EMPLOYEE</TableCell>
//                             <TableCell sx={{ color: 'white' }}></TableCell>
//                             <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>DEPARTMENT</TableCell>
//                             <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>DESIGNATION</TableCell>
//                             <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>JOIN DATE</TableCell>
//                             <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>STATUS</TableCell>
//                             <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>MANAGER</TableCell>
//                             <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', color: 'white' }}>ACTIONS</TableCell>
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {loading ? (
//                             Array.from(new Array(rowsPerPage)).map((_, index) => (
//                                 <TableRow key={index}>
//                                     <TableCell><Skeleton variant="text" /></TableCell>
//                                     <TableCell><Skeleton variant="text" /></TableCell>
//                                     <TableCell><Skeleton variant="text" /></TableCell>
//                                     <TableCell><Skeleton variant="text" /></TableCell>
//                                     <TableCell><Skeleton variant="text" /></TableCell>
//                                     <TableCell><Skeleton variant="text" /></TableCell>
//                                     <TableCell><Skeleton variant="text" /></TableCell>
//                                     <TableCell><Skeleton variant="text" /></TableCell>
//                                     <TableCell align="center"><Skeleton variant="rectangular" width={80} height={30} /></TableCell>
//                                 </TableRow>
//                             ))
//                         ) : (
//                             (rowsPerPage > 0
//                                 ? filteredEmployees.slice(currentPage * rowsPerPage, currentPage * rowsPerPage + rowsPerPage)
//                                 : filteredEmployees
//                             ).map((employee, index) => (
//                                 <TableRow key={employee.user_id} sx={{ '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' } }} onMouseEnter={() => setHoveredRowId(employee.user_id)} onMouseLeave={() => setHoveredRowId(null)}>
//                                     <TableCell sx={{ fontSize: '0.95rem' }}>{currentPage * rowsPerPage + index + 1}</TableCell>
//                                     <TableCell sx={{ fontSize: '0.95rem' }}>{employee.employee_name}</TableCell>
//                                     <TableCell sx={{ padding: '0 8px', textAlign: 'center' }}>
//                                         {hoveredRowId === employee.user_id && <IconButton onClick={() => handleArrowClick(employee.user_id)} size="small" sx={{ color: themeOrange }}><ArrowForwardIcon fontSize="small" /></IconButton>}
//                                     </TableCell>
//                                     <TableCell sx={{ fontSize: '0.95rem' }}>{employee.department_name || 'N/A'}</TableCell>
//                                     <TableCell sx={{ fontSize: '0.95rem' }}>{employee.designation_name || 'N/A'}</TableCell>
//                                     <TableCell sx={{ fontSize: '0.95rem' }}>{formatDate(employee.join_date)}</TableCell>
//                                     <TableCell sx={{ fontSize: '0.95rem' }}>
//                                         <Chip label={employee.status === 1 ? "Active" : "Inactive"} size="small" sx={{
//                                             bgcolor: employee.status === 1 ? '#4caf50' : themeOrange,
//                                             color: 'white',
//                                             borderRadius: '16px',
//                                             height: '24px',
//                                         }} />
//                                     </TableCell>
//                                     <TableCell sx={{ fontSize: '0.95rem' }}>{employee.manager}</TableCell>
//                                     <TableCell>
//                                         <Box display="flex" justifyContent="center" gap={0.5}>
//                                             <Tooltip title="Edit"><IconButton onClick={() => handleEditEmployee(employee)} sx={{ color: themePurple }}><EditIcon /></IconButton></Tooltip>
//                                             <Tooltip title="Delete"><IconButton onClick={() => handleDeleteEmployee(employee.user_id)} sx={{ color: themeOrange }}><DeleteIcon /></IconButton></Tooltip>
//                                         </Box>
//                                     </TableCell>
//                                 </TableRow>
//                             ))
//                         )}
//                     </TableBody>
//                 </Table>
//             </TableContainer>

//             <Box sx={{ p: 2, borderTop: '1px solid rgba(224, 224, 224, 1)' }}>
//                 {loading ? (
//                     <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                         <Skeleton variant="text" width={150} />
//                         <Skeleton variant="rectangular" width={400} height={40} />
//                     </Box>
//                 ) : (
//                     <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
//                         <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//                             <FormControl variant="outlined" size="small">
//                                 <Select
//                                     value={rowsPerPage}
//                                     onChange={handleRowsPerPageChange}
//                                     sx={{
//                                         backgroundColor: themePurple,
//                                         color: 'white',
//                                         borderRadius: '4px',
//                                         transition: 'background-color 0.3s',
//                                         '&:hover': {
//                                             backgroundColor: themePurpleHover,
//                                         },
//                                         '& .MuiOutlinedInput-notchedOutline': {
//                                             border: 'none',
//                                         },
//                                         '& .MuiSvgIcon-root': {
//                                             color: 'white',
//                                         },
//                                     }}
//                                 >
//                                     {[10, 25, 50, 100].map((value) => (
//                                         <MenuItem key={value} value={value}>{value}</MenuItem>
//                                     ))}
//                                 </Select>
//                             </FormControl>
//                             <Typography variant="body2" color="text.secondary">
//                                 {`1 to ${Math.min(rowsPerPage, filteredEmployees.length)} of ${filteredEmployees.length}`}
//                             </Typography>
//                         </Box>

//                         <Pagination
//                             count={Math.ceil(filteredEmployees.length / rowsPerPage)}
//                             page={currentPage + 1}
//                             onChange={handlePaginationChange}
//                             showFirstButton
//                             showLastButton
//                             sx={{
//                                 '& .MuiPaginationItem-root': {
//                                     borderRadius: '4px',
//                                     transition: 'background-color 0.3s, color 0.3s',
//                                     '&:hover': {
//                                         backgroundColor: themeOrange,
//                                         color: 'white',
//                                     }
//                                 },
//                                 '& .MuiPaginationItem-page': {
//                                     color: themePurple,
//                                     '&.Mui-selected': {
//                                         backgroundColor: themePurple,
//                                         color: 'white',
//                                         '&:hover': {
//                                             backgroundColor: themeOrange,
//                                         }
//                                     },
//                                 },
//                                 '& .MuiPaginationItem-icon': {
//                                     color: themePurple,
//                                 }
//                             }}
//                         />
//                     </Box>
//                 )}
//             </Box>
//         </Box>
//     );
// }




// import React, { useState, useEffect, useMemo, useCallback, useRef } from "react";
// import axios from "axios";
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
//   Pagination,
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
// import Swal from "sweetalert2";

// const RESUME_BASE_URL = "https://raasbackend.vetrinahealthcare.com/";
// const ANNEXURE_FILE_PATH = "/mnt/data/Annexure of Salary and Payslip.xlsx";
// const statusOptions = [{ value: 1, label: "Active" }, { value: 0, label: "Inactive" }];
// const probationOptions = [{ value: "y", label: "Yes" }, { value: "n", label: "No" }];
// const genderOptions = [{ value: "Male", label: "Male" }, { value: "Female", label: "Female" }, { value: "Other", label: "Other" }];
// const subDivisionOptions = [{ value: "VetBiz", label: "VetBiz" }, { value: "TredBiz", label: "TredBiz" }, { value: " ", label: "TredBiz Mix" }];

// export default function EmployeesView() {
//   const employeeDialogRef = useRef(null);
//   const changeManagerDialogRef = useRef(null);
//   const muiTheme = useTheme();
//   const isMobile = useMediaQuery(muiTheme.breakpoints.down("sm"));
//   const themePurple = "#8C257C";
//   const themePurpleHover = "#6d1d60";
//   const themeOrange = "#F58E35";

//   const purpleButtonSx = {
//     backgroundColor: themePurple,
//     color: "white",
//     "&:hover": {
//       backgroundColor: themePurpleHover,
//     },
//   };
//   const cancelButtonSx = {
//     color: "#757575",
//     "&:hover": {
//       backgroundColor: "rgba(0, 0, 0, 0.04)",
//     },
//   };

//   const [loading, setLoading] = useState(true);
//   const [departments, setDepartments] = useState([]);
//   const [designations, setDesignations] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [openChangeManagerForm, setOpenChangeManagerForm] = useState(false);
//   const [currentPage, setCurrentPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
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
//   const [salaryConfig, setSalaryConfig] = useState(null);

//   const [currentEmployee, setCurrentEmployee] = useState({
//     id: null,
//     firstName: "",
//     middleName: "",
//     lastName: "",
//     email: "",
//     employee_id: "",
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
//     grossSalaryYearly: "",
//     ctcMonthly: "",
//     ctcYearly: "",
//   });

//   const [openEmployeeForm, setOpenEmployeeForm] = useState(false);

//   useEffect(() => {
//     const requests = [
//       axiosInstance.get("api/desig_dept_dropdown/"),
//       axiosInstance.get("employee-dropdown/"),
//       axiosInstance.get("api/office_shift_dropdown/"),
//       axiosInstance.get("api/countries/"),
//       axiosInstance.get("api/employee_hub/"),
//       axiosInstance.get("api/division/"),
//       axiosInstance.get("api/role_list/"),
//       axiosInstance.get("api/search_by_email_vet_talent/"),
//       axios.get("https://tdtlworld.com/hrms-backend/api/headquarters/"),
//       axios.get("https://tdtlworld.com/hrms-backend/api/payroll_setup_configuration/"),
//     ];

//     (async () => {
//       try {
//         const results = await Promise.allSettled(requests);
//         const valueAt = (index) => (results[index]?.status === "fulfilled" ? results[index].value : undefined);

//         const depts = valueAt(0);
//         const empDropdown = valueAt(1);
//         const shifts = valueAt(2);
//         const countriesRes = valueAt(3);
//         const hubs = valueAt(4);
//         const divs = valueAt(5);
//         const rolesRes = valueAt(6);
//         const talent = valueAt(7);
//         const headquartersRes = valueAt(8);
//         const salaryConf = valueAt(9);

//         results.forEach((r, i) => {
//           if (r.status === "rejected") {
//             console.warn(`Request ${i} rejected:`, r.reason?.response?.status || r.reason?.message);
//           }
//         });

//         if (depts?.data) setDepartments(depts.data.dept_data ?? []);
//         if (empDropdown?.data) setAllEmployeesForDropdown(empDropdown.data ?? []);
//         if (shifts?.data) setOfficeShifts(shifts.data.office_shift_data ?? []);
//         if (countriesRes?.data && countriesRes.data.status === "success") setCountries(countriesRes.data.data ?? []);
//         if (divs?.data) setDivisions(divs.data ?? []);
//         if (rolesRes?.data?.status === "success") setRoles(rolesRes.data.data ?? []);
//         if (headquartersRes?.data) setHeadquarters(headquartersRes.data ?? []);
//         if (talent?.data?.data) setTalentPool(talent.data.data ?? []);

//         let configData = null;
//         if (Array.isArray(salaryConf?.data)) {
//           configData = salaryConf.data.reduce((acc, item) => {
//             if (item?.particulars) acc[item.particulars] = parseFloat(item.value) || 0;
//             return acc;
//           }, {});
//           setSalaryConfig(configData);
//         } else {
//           const fallback = {
//             hra: 0.25,
//             basic_plus_da: 0.6,
//             pf_employer_contribution: 0.12,
//             esic_employer_contribution: 0.0325,
//           };
//           setSalaryConfig(fallback);
//           console.warn("Salary configuration fallback applied (salaryConf missing or invalid).");
//         }

//         const allRejected = results.every((r) => r.status === "rejected");
//         if (allRejected) {
//           Swal.fire({
//             icon: "error",
//             title: "Initialization Error",
//             text: "Failed to fetch initial application data. Some features may not work as expected.",
//             timer: 4000,
//             showConfirmButton: false,
//           });
//         }
//       } catch (outerError) {
//         console.error("Unexpected error in fetchInitialData:", outerError);
//         Swal.fire({
//           icon: "error",
//           title: "Initialization Error",
//           text: "Failed to fetch initial application data. Some features may not work as expected.",
//           timer: 4000,
//           showConfirmButton: false,
//         });
//       }
//     })();
//   }, []);

//   const fetchEmployees = useCallback(() => {
//     setLoading(true);
//     axiosInstance
//       .get("api/employee_details/")
//       .then((response) => setEmployees(Array.isArray(response.data.data) ? response.data.data : []))
//       .catch((error) => {
//         console.error("Error fetching employees:", error);
//         setEmployees([]);
//         Swal.fire({ icon: "error", title: "Error", text: "Failed to fetch employee list.", timer: 3000, showConfirmButton: false });
//       })
//       .finally(() => setLoading(false));
//   }, []);

//   useEffect(() => {
//     fetchEmployees();
//   }, [fetchEmployees]);

//   useEffect(() => {
//     if (!salaryConfig || !currentEmployee.grossSalary) {
//       setCurrentEmployee((prev) => ({ ...prev, grossSalaryYearly: "", ctcMonthly: "", ctcYearly: "" }));
//       return;
//     }

//     const parseNumberOrPercent = (v, fallback = 0) => {
//       if (v === null || v === undefined || v === "") return fallback;
//       if (typeof v === "number") return v;
//       const s = String(v).trim();
//       if (s.endsWith("%")) {
//         const num = parseFloat(s.slice(0, -1));
//         return isNaN(num) ? fallback : num / 100;
//       }
//       const n = parseFloat(s);
//       return isNaN(n) ? fallback : n;
//     };

//     const grossSalaryMonthly = parseFloat(currentEmployee.grossSalary);
//     if (isNaN(grossSalaryMonthly) || grossSalaryMonthly <= 0) {
//       setCurrentEmployee((prev) => ({ ...prev, grossSalaryYearly: "", ctcMonthly: "", ctcYearly: "" }));
//       return;
//     }

//     const hraRate = parseNumberOrPercent(salaryConfig.hra, 0.25);
//     const basicPlusDaRate = parseNumberOrPercent(salaryConfig.basic_plus_da, 0.6);
//     let pfRate = parseNumberOrPercent(salaryConfig.pf_employer_contribution, 0.12);
//     if (pfRate > 1) pfRate = pfRate / 100;
//     let esicRate = parseNumberOrPercent(salaryConfig.esic_employer_contribution, 0.0);
//     if (esicRate > 1) esicRate = esicRate / 100;

//     const grossSalaryYearly = grossSalaryMonthly * 12;
//     const hra = grossSalaryMonthly * hraRate;
//     let baseForPf = grossSalaryMonthly - hra;
//     if (baseForPf < 0) baseForPf = 0;
//     let pf_employer = baseForPf * pfRate;
//     const PF_CAP = 1800;
//     if (pf_employer > PF_CAP) pf_employer = PF_CAP;
//     const esic_applicable = grossSalaryMonthly <= 21000;
//     const esic_employer = esic_applicable ? grossSalaryMonthly * esicRate : 0;

//     let no_of_employment_year = 0;
//     const joinDateStr = currentEmployee.join_date;
//     if (joinDateStr) {
//       try {
//         const date_of_joining = new Date(joinDateStr);
//         const now = new Date();
//         if (!isNaN(date_of_joining.getTime()) && date_of_joining <= now) {
//           no_of_employment_year = (now.getTime() - date_of_joining.getTime()) / (1000 * 60 * 60 * 24 * 365.25);
//         }
//       } catch (e) {
//         no_of_employment_year = 0;
//       }
//     }
//     no_of_employment_year = Math.max(0, no_of_employment_year);

//     let gratuityMonthly = 0;
//     try {
//       const basic_plus_da_amount = grossSalaryMonthly * basicPlusDaRate;
//       const completedYears = Math.floor(no_of_employment_year);
//       if (completedYears > 5 && basic_plus_da_amount > 0) {
//         const annualGratuity = (basic_plus_da_amount * 15) / 26 * completedYears;
//         gratuityMonthly = annualGratuity / 12;
//       }
//     } catch (e) {
//       gratuityMonthly = 0;
//     }
//     gratuityMonthly = Math.max(0, gratuityMonthly);

//     const total_benefit = pf_employer + esic_employer + gratuityMonthly;
//     const ctc_monthly = grossSalaryMonthly + total_benefit;
//     const ctc_yearly = ctc_monthly * 12;

//     const round2 = (n) => Math.round((n + Number.EPSILON) * 100) / 100;

//     setCurrentEmployee((prev) => ({
//       ...prev,
//       grossSalaryYearly: round2(grossSalaryYearly).toFixed(2),
//       ctcMonthly: round2(ctc_monthly).toFixed(2),
//       ctcYearly: round2(ctc_yearly).toFixed(2),
//     }));
//   }, [currentEmployee.grossSalary, currentEmployee.join_date, salaryConfig]);

//   const handleCountryChange = (selectedCountry) => {
//     const countryId = selectedCountry ? selectedCountry.country_id : "";
//     const countryName = selectedCountry ? selectedCountry.country_name : null;
//     setCurrentEmployee((prev) => ({ ...prev, country_id: countryId, state_id: "", employee_hub_id: "" }));
//     setStates([]);
//     setEmployeeHubs([]);
//     if (countryName) {
//       axiosInstance
//         .get(`api/states/?country_name=${countryName}`)
//         .then((res) => {
//           if (res.data.status === "success") setStates(res.data.data || []);
//         })
//         .catch((err) => {
//           console.error("Error fetching states:", err);
//           Swal.fire({ icon: "error", title: "Error", text: "Failed to fetch states.", target: employeeDialogRef.current, timer: 3000, showConfirmButton: false });
//         });
//     }
//   };

//   const handleStateChange = (selectedState) => {
//     const stateId = selectedState ? selectedState.state_id : "";
//     setCurrentEmployee((prev) => ({ ...prev, state_id: stateId, employee_hub_id: "" }));
//     setEmployeeHubs([]);
//     if (stateId) {
//       axiosInstance
//         .get(`api/employee_hub_dropdown/${stateId}/`)
//         .then((res) => {
//           if (res.data.status === "success") setEmployeeHubs(res.data.data || []);
//         })
//         .catch((err) => {
//           console.error("Error fetching employee hubs:", err);
//           Swal.fire({ icon: "error", title: "Error", text: "Failed to fetch holiday hubs.", target: employeeDialogRef.current, timer: 3000, showConfirmButton: false });
//         });
//     }
//   };

//   const handleDeptChange = (selectedDept) => {
//     const deptId = selectedDept ? selectedDept.dept_id : "";
//     setCurrentEmployee((prev) => ({ ...prev, department_id: deptId, designation_id: "" }));
//     if (deptId) {
//       axiosInstance
//         .get(`api/desig_dept_dropdown/?dept_id=${deptId}/`)
//         .then((res) => setDesignations(res.data.desig_data || []))
//         .catch((err) => {
//           console.error("Error fetching designations:", err);
//           Swal.fire({ icon: "error", title: "Error", text: "Failed to load designations.", target: employeeDialogRef.current, timer: 3000, showConfirmButton: false });
//         });
//     } else {
//       setDesignations([]);
//     }
//   };

//   const handleDivisionChange = (selectedDivision) => {
//     const divisionId = selectedDivision ? selectedDivision.division_id : "";
//     if (selectedDivision && selectedDivision.division_name !== "Livestock") {
//       setCurrentEmployee((prev) => ({ ...prev, division_id: divisionId, subDivision: "" }));
//     } else {
//       setCurrentEmployee((prev) => ({ ...prev, division_id: divisionId }));
//     }
//   };

//   const handleChangeManager = async () => {
//     if (!selectedEmployeeForManagerChange || !newManager) {
//       Swal.fire({ icon: "warning", title: "Incomplete Selection", text: "Please select an employee and a new manager.", target: changeManagerDialogRef.current });
//       return;
//     }
//     try {
//       await axiosInstance.put("api/change_manager/", { user_id: selectedEmployeeForManagerChange, manager_id: newManager });
//       await fetchEmployees();
//       Swal.fire({ icon: "success", title: "Success", text: "Manager changed successfully!", timer: 3000, showConfirmButton: false });
//       setOpenChangeManagerForm(false);
//       setSelectedEmployeeForManagerChange("");
//       setNewManager("");
//     } catch (error) {
//       console.error("Error changing manager:", error);
//       Swal.fire({ icon: "error", title: "Operation Failed", text: `Error changing manager: ${error.response?.data?.message || "An error occurred."}`, target: changeManagerDialogRef.current });
//     }
//   };

//   const navigate = useNavigate();
//   const handleArrowClick = (id) => navigate(`/hrms/admindashboard/employeedetail/${id}`);

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setCurrentEmployee((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleAddEmployee = async () => {
//     try {
//       const maxIdResponse = await axios.get("https://tdtlworld.com/hrms-backend/api/get_max_employee_id/");
//       const newEmpId = maxIdResponse.data.employee_id;
//       setCurrentEmployee({
//         emp_id: newEmpId,
//         firstName: "",
//         middleName: "",
//         lastName: "",
//         email: "",
//         phone: "",
//         avatar: null,
//         officeShift: "",
//         status: 1,
//         join_date: "",
//         gender: "",
//         username: newEmpId,
//         password: "",
//         role: "",
//         grossSalary: "",
//         department_id: "",
//         designation_id: "",
//         manager_id: "",
//         country_id: "",
//         state_id: "",
//         employee_hub_id: "",
//         headquarter_id: "",
//         division_id: "",
//         company_id: 2,
//         is_probation: "n",
//         resumeUrl: "",
//         subDivision: "",
//         grossSalaryYearly: "",
//         ctcMonthly: "",
//         ctcYearly: "",
//         employee_id: "",
//       });
//       setDesignations([]);
//       setStates([]);
//       setEmployeeHubs([]);
//       setEmployeeDocuments(null);
//       setIsEditMode(false);
//       setShowPassword(false);
//       setOpenEmployeeForm(true);
//     } catch (error) {
//       console.error("Error fetching max employee ID:", error);
//       Swal.fire({ icon: "error", title: "Error", text: "Failed to initialize employee form.", timer: 3000, showConfirmButton: false });
//     }
//   };

//   const handleTalentSelect = async (event, selectedOption) => {
//     setEmployeeDocuments(null);
//     setCurrentEmployee((prev) => ({ ...prev, resumeUrl: "" }));
//     if (!selectedOption) {
//       setCurrentEmployee((prev) => ({ ...prev, firstName: "", middleName: "", lastName: "", email: "", phone: "", gender: "", country_id: "", state_id: "" }));
//       return;
//     }
//     const talent = talentPool.find((p) => p.email === selectedOption.email);
//     if (!talent) return;
//     const selectedCountry = countries.find((c) => c.country_name === talent.country);
//     const resumeLink = talent.resume ? `${RESUME_BASE_URL}${talent.resume}` : "";
//     setCurrentEmployee((prev) => ({
//       ...prev,
//       firstName: talent.first_name || "",
//       middleName: talent.middle_name || "",
//       lastName: talent.last_name || "",
//       email: talent.email || "",
//       phone: talent.phone || "",
//       gender: talent.gender || "",
//       country_id: selectedCountry ? selectedCountry.country_id : "",
//       state_id: "",
//       employee_hub_id: "",
//       resumeUrl: resumeLink,
//     }));
//     if (selectedCountry) {
//       try {
//         const statesRes = await axiosInstance.get(`api/states/?country_name=${selectedCountry.country_name}`);
//         if (statesRes.data.status === "success") {
//           const fetchedStates = statesRes.data.data || [];
//           setStates(fetchedStates);
//           const selectedState = fetchedStates.find((s) => s.state_name === talent.state);
//           if (selectedState) {
//             setCurrentEmployee((prev) => ({ ...prev, state_id: selectedState.state_id }));
//             const hubsRes = await axiosInstance.get(`api/employee_hub_dropdown/${selectedState.state_id}/`);
//             if (hubsRes.data.status === "success") setEmployeeHubs(hubsRes.data.data || []);
//           }
//         }
//       } catch (err) {
//         console.error("Error fetching dependent data for talent:", err);
//       }
//     }
//     setIsFetchingDocs(true);
//     try {
//       const docResponse = await axios.post("https://raasbackend.vetrinahealthcare.com/fetch_documents/", { email_id: talent.email });
//       setEmployeeDocuments(docResponse.data.status === "success" && docResponse.data.documents ? docResponse.data.documents : null);
//     } catch (error) {
//       console.error("Error fetching documents:", error);
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
//         Swal.fire({ icon: "error", title: "Error", text: "Failed to load employee details.", timer: 3000, showConfirmButton: false });
//         return;
//       }
//       const empData = response.data.data[0];
//       const [desigRes, statesRes, hubsRes] = await Promise.all([
//         axiosInstance.get(`api/desig_dept_dropdown/?dept_id=${empData.department_id}/`),
//         empData.country_name ? axiosInstance.get(`api/states/?country_name=${empData.country_name}`) : Promise.resolve({ data: { data: [] } }),
//         empData.state ? axiosInstance.get(`api/employee_hub_dropdown/${empData.state}/`) : Promise.resolve({ data: { data: [] } }),
//       ]);
//       setDesignations(desigRes.data.desig_data || []);
//       setStates(statesRes.data.data || []);
//       setEmployeeHubs(hubsRes.data.data || []);
//       const officeShiftObj = officeShifts.find((s) => s.office_shift_name === empData.office_shift);
//       const nameParts = (empData.emp_name || "").split(" ");
//       const selectedCountry = countries.find((c) => c.country_name === empData.country_name);
//       const selectedHeadquarter = headquarters.find((hq) => hq.headquarter_name === empData.headquarter);
//       let finalSubDivisionValue = empData.sub_division || "";
//       if (finalSubDivisionValue === "Tred") {
//         finalSubDivisionValue = "TredBiz";
//       }
//       setCurrentEmployee({
//         id: employee.user_id,
//         firstName: nameParts[0] || "",
//         middleName: nameParts.length > 2 ? nameParts.slice(1, -1).join(" ") : "",
//         lastName: nameParts.length > 1 ? nameParts[nameParts.length - 1] : "",
//         email: empData.email || "",
//         employee_id: empData.employee_id || "",
//         phone: empData.phone || "",
//         manager_id: empData.manager_id ? Number(empData.manager_id) : "",
//         designation_id: empData.designation_id ? Number(empData.designation_id) : "",
//         department_id: empData.department_id ? Number(empData.department_id) : "",
//         headquarter_id: selectedHeadquarter ? selectedHeadquarter.headquarter_id : "",
//         subDivision: finalSubDivisionValue,
//         division_id: empData.division_id ? Number(empData.division_id) : "",
//         state_id: empData.state ? Number(empData.state) : "",
//         employee_hub_id: empData.employee_hub_id ? Number(empData.employee_hub_id) : "",
//         role: empData.role_id ? Number(empData.role_id) : "",
//         officeShift: officeShiftObj ? Number(officeShiftObj.office_shift_id) : "",
//         status: Number(empData.status),
//         join_date: empData.join_date ? empData.join_date.split(" ")[0] : "",
//         country_id: selectedCountry ? Number(selectedCountry.country_id) : "",
//         avatar: empData.profile_photo || "",
//         is_probation: empData.probation?.toLowerCase() === "y" ? "y" : "n",
//         resumeUrl: "",
//       });
//       setIsEditMode(true);
//       setOpenEmployeeForm(true);
//       setShowPassword(false);
//     } catch (error) {
//       console.error("Error fetching employee details for edit:", error);
//       Swal.fire({ icon: "error", title: "Error", text: "Failed to fetch complete employee details.", timer: 3000, showConfirmButton: false });
//     }
//   };

//   const handleSaveEmployee = async () => {
//     if (!isEditMode) {
//       const requiredFields = {
//         firstName: "First Name",
//         lastName: "Last Name",
//         email: "Email",
//         phone: "Phone",
//         country_id: "Country",
//         state_id: "State",
//         employee_hub_id: "holiday Hub",
//         headquarter_id: "Headquarter",
//         division_id: "Division",
//         manager_id: "Manager",
//         department_id: "Department",
//         designation_id: "Designation",
//         officeShift: "Office Shift",
//         join_date: "Join Date",
//         avatar: "Photo",
//         gender: "Gender",
//         username: "Username",
//         password: "Password",
//         role: "Role",
//         grossSalary: "Gross Salary",
//       };
//       const selectedDivision = divisions.find((d) => d.division_id == currentEmployee.division_id);
//       if (selectedDivision && selectedDivision.division_name === "Livestock" && !currentEmployee.subDivision) {
//         Swal.fire({ icon: "error", title: "Validation Error", text: "Sub Division is required when Division is Livestock.", target: employeeDialogRef.current });
//         return;
//       }
//       for (const field in requiredFields) {
//         if (!currentEmployee[field]) {
//           Swal.fire({ icon: "error", title: "Validation Error", text: `The field "${requiredFields[field]}" is required.`, target: employeeDialogRef.current });
//           return;
//         }
//       }
//     }
//     const formData = new FormData();
//     const keyMap = {
//       firstName: "first_name",
//       middleName: "middle_name",
//       lastName: "last_name",
//       officeShift: "office_shift",
//       join_date: "join_date",
//       grossSalary: "gross_salary",
//       headquarter_id: "headquarter_id",
//       grossSalaryYearly: "gross_salary_yearly",
//       ctcMonthly: "ctc_monthly",
//       ctcYearly: "ctc_yearly",
//     };
//     Object.keys(currentEmployee).forEach((key) => {
//       if (key === "avatar" && currentEmployee.avatar instanceof File) {
//         formData.append("file", currentEmployee.avatar);
//       } else if (key !== "resumeUrl" && currentEmployee[key] !== null && currentEmployee[key] !== undefined && currentEmployee[key] !== "") {
//         const backendKey = keyMap[key] || key;
//         formData.append(backendKey, currentEmployee[key]);
//       }
//     });
//     setIsSaving(true);
//     try {
//       const action = isEditMode ? "updated" : "added";
//       if (isEditMode) {
//         formData.append("user_id", currentEmployee.id);
//         await axiosInstance.put("api/edit_employee/", formData, { headers: { "Content-Type": "multipart/form-data" } });
//       } else {
//         await axiosInstance.post("api/add_employee/", formData, { headers: { "Content-Type": "multipart/form-data" } });
//       }
//       setOpenEmployeeForm(false);
//       await fetchEmployees();
//       Swal.fire({ icon: "success", title: "Success", text: `Employee ${action} successfully!`, timer: 3000, showConfirmButton: false });
//     } catch (error) {
//       console.error("Error saving employee:", error);
//       const errorMessage = error.response?.data?.message || error.response?.data?.detail || "An unexpected error occurred.";
//       Swal.fire({ icon: "error", title: "Operation failed", text: `${errorMessage}`, target: employeeDialogRef.current });
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   const handleDeleteEmployee = (employeeId) => {
//     if (!employeeId) return;
//     Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: themePurple,
//       cancelButtonColor: themeOrange,
//       confirmButtonText: "Yes, delete it!",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         axiosInstance
//           .delete("api/edit_employee/", { data: { user_id: employeeId } })
//           .then(() => {
//             fetchEmployees();
//             Swal.fire({ icon: "success", title: "Deleted!", text: "The employee has been deleted.", timer: 3000, showConfirmButton: false });
//           })
//           .catch((error) => {
//             console.error("Error deleting employee: ", error);
//             const errorMessage = error.response?.data?.message || error.response?.data?.detail || "Failed to delete employee.";
//             Swal.fire({ icon: "error", title: "Error", text: errorMessage, timer: 3000, showConfirmButton: false });
//           });
//       }
//     });
//   };

//   const handleExportEmployees = () => {
//     if (employees.length === 0) {
//       Swal.fire({ icon: "info", title: "Info", text: "There is no employee data to export.", timer: 3000, showConfirmButton: false });
//       return;
//     }
//     const worksheet = XLSX.utils.json_to_sheet(employees);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Employees");
//     XLSX.writeFile(workbook, "EmployeesData.xlsx");
//   };

//   const sortedEmployees = useMemo(() => {
//     if (!Array.isArray(employees)) return [];
//     return [...employees].sort((a, b) => b.user_id - a.user_id);
//   }, [employees]);

//   const filteredEmployees = useMemo(
//     () =>
//       sortedEmployees.filter(
//         (e) =>
//           (e.employee_name && e.employee_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
//           (e.department_name && e.department_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
//           (e.designation_name && e.designation_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
//           (e.join_date && e.join_date.toLowerCase().includes(searchTerm.toLowerCase())) ||
//           (e.manager && e.manager.toLowerCase().includes(searchTerm.toLowerCase()))
//       ),
//     [sortedEmployees, searchTerm]
//   );

//   const handlePaginationChange = (event, newPage) => {
//     setCurrentPage(newPage - 1);
//   };

//   const handleRowsPerPageChange = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setCurrentPage(0);
//   };

//   const handleFileUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) setCurrentEmployee((prev) => ({ ...prev, avatar: file }));
//   };

//   const isSubDivisionDisabled = useMemo(() => {
//     if (!currentEmployee.division_id) return true;
//     const selectedDivision = divisions.find((d) => d.division_id == currentEmployee.division_id);
//     return !selectedDivision || selectedDivision.division_name !== "Livestock";
//   }, [currentEmployee.division_id, divisions]);

//   const formatDate = (dateString) => {
//     if (!dateString) return "";
//     try {
//       const date = new Date(dateString);
//       const day = String(date.getDate()).padStart(2, "0");
//       const month = String(date.getMonth() + 1).padStart(2, "0");
//       const year = date.getFullYear();
//       return `${day}/${month}/${year}`;
//     } catch (error) {
//       return dateString.split(" ")[0];
//     }
//   };

//   return (
//     <Box component={Paper} p={3}>
//       <Typography variant="h4" sx={{ color: themePurple, fontWeight: "bold", mb: 5 }}>
//         Employees List
//       </Typography>
//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           flexDirection: isMobile ? "column" : "row",
//           gap: 2,
//           mb: 2,
//         }}
//       >
//         <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
//           <Button variant="contained" startIcon={<AddIcon />} onClick={handleAddEmployee} sx={purpleButtonSx}>
//             Add Employee
//           </Button>
//           <Button variant="contained" startIcon={<DownloadIcon />} onClick={handleExportEmployees} sx={purpleButtonSx}>
//             Export
//           </Button>
//           <Button variant="contained" startIcon={<ChangeManagerIcon />} onClick={() => setOpenChangeManagerForm(true)} sx={purpleButtonSx}>
//             Change Manager
//           </Button>
//         </Box>
//         <TextField
//           size="small"
//           placeholder="Search..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           sx={{ width: isMobile ? "100%" : "auto" }}
//           InputProps={{
//             startAdornment: (
//               <InputAdornment position="start">
//                 <SearchIcon />
//               </InputAdornment>
//             ),
//           }}
//         />
//       </Box>

//       <Dialog open={openChangeManagerForm} onClose={() => setOpenChangeManagerForm(false)} maxWidth="sm" fullWidth ref={changeManagerDialogRef}>
//         <DialogTitle sx={{ color: themePurple, fontWeight: "bold" }}>
//           Change Manager
//           <IconButton onClick={() => setOpenChangeManagerForm(false)} sx={{ position: "absolute", right: 8, top: 8, color: (theme) => theme.palette.grey[500] }}>
//             <CloseIcon />
//           </IconButton>
//         </DialogTitle>
//         <DialogContent>
//           <Grid container spacing={2} sx={{ mt: 1 }}>
//             <Grid item xs={12}>
//               <FormControl fullWidth>
//                 <InputLabel>Select Employee</InputLabel>
//                 <Select value={selectedEmployeeForManagerChange} onChange={(e) => setSelectedEmployeeForManagerChange(e.target.value)} label="Select Employee">
//                   {allEmployeesForDropdown.map((emp) => (
//                     <MenuItem key={emp.value} value={emp.value}>
//                       {`${emp.label} (${emp.emp_id})`}
//                     </MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>
//             </Grid>
//             <Grid item xs={12}>
//               <FormControl fullWidth>
//                 <InputLabel>Select New Manager</InputLabel>
//                 <Select value={newManager} onChange={(e) => setNewManager(e.target.value)} label="Select New Manager">
//                   {allEmployeesForDropdown.map((emp) => (
//                     <MenuItem key={emp.value} value={emp.value}>
//                       {`${emp.label} (${emp.emp_id})`}
//                     </MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>
//             </Grid>
//           </Grid>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setOpenChangeManagerForm(false)} sx={cancelButtonSx}>
//             Cancel
//           </Button>
//           <Button onClick={handleChangeManager} variant="contained" sx={purpleButtonSx}>
//             Save
//           </Button>
//         </DialogActions>
//       </Dialog>

//       <Dialog open={openEmployeeForm} onClose={() => setOpenEmployeeForm(false)} maxWidth="md" fullWidth ref={employeeDialogRef}>
//         <DialogTitle sx={{ color: "#8C257C ", fontWeight: "bold", fontSize: "2rem" }}>
//           {isEditMode ? "Edit Employee" : "Add Employee"}
//           <IconButton onClick={() => setOpenEmployeeForm(false)} sx={{ position: "absolute", right: 8, top: 8, color: (theme) => theme.palette.grey[500] }}>
//             <CloseIcon />
//           </IconButton>
//         </DialogTitle>
//         <DialogContent>
//           <Grid container spacing={2} sx={{ mt: 1 }}>
//             {!isEditMode && (
//               <Grid item xs={12}>
//                 <Autocomplete
//                   options={talentPool}
//                   getOptionLabel={(option) => option.email || ""}
//                   onChange={handleTalentSelect}
//                   onInputChange={(event, newInputValue) => {
//                     if (!talentPool.find((p) => p.email === newInputValue)) {
//                       setCurrentEmployee((prev) => ({ ...prev, email: newInputValue }));
//                     }
//                   }}
//                   renderInput={(params) => <TextField {...params} label="Search Email to Auto-fill" />}
//                 />
//               </Grid>
//             )}
//             <Grid item xs={12} sm={4}>
//               <TextField fullWidth label="First Name" name="firstName" value={currentEmployee.firstName || ""} onChange={handleInputChange} onKeyPress={(e) => { if (!/^[A-Za-z]$/.test(e.key)) e.preventDefault(); }} InputProps={{ readOnly: isEditMode }} />
//             </Grid>
//             <Grid item xs={12} sm={4}>
//               <TextField fullWidth label="Middle Name" name="middleName" value={currentEmployee.middleName || ""} onChange={handleInputChange} onKeyPress={(e) => { if (!/^[A-Za-z]$/.test(e.key)) e.preventDefault(); }} InputProps={{ readOnly: isEditMode }} />
//             </Grid>
//             <Grid item xs={12} sm={4}>
//               <TextField fullWidth label="Last Name" name="lastName" value={currentEmployee.lastName || ""} onChange={handleInputChange} onKeyPress={(e) => { if (!/^[A-Za-z]$/.test(e.key)) e.preventDefault(); }} InputProps={{ readOnly: isEditMode }} />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField fullWidth label="Email" name="email" value={currentEmployee.email || ""} onChange={handleInputChange} InputProps={{ readOnly: isEditMode || !!talentPool.find((p) => p.email === currentEmployee.email) }} />
//             </Grid>
//             {isEditMode && (
//               <Grid item xs={12} sm={6}>
//                 <TextField fullWidth label="Employee ID" name="employee_id" value={currentEmployee.employee_id || ""} InputProps={{ readOnly: true }} />
//               </Grid>
//             )}
//             <Grid item xs={12} sm={6}>
//               <TextField fullWidth label="Phone" name="phone" value={currentEmployee.phone || ""} onChange={(e) => { const value = e.target.value; if (/^\d{0,10}$/.test(value)) handleInputChange(e); }} inputProps={{ maxLength: 10, inputMode: "numeric", pattern: "[0-9]*" }} InputProps={{ readOnly: isEditMode }} />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <Autocomplete options={countries} getOptionLabel={(option) => option.country_name || ""} value={countries.find((c) => c.country_id == currentEmployee.country_id) || null} onChange={(e, nv) => handleCountryChange(nv)} isOptionEqualToValue={(option, value) => option.country_id == value.country_id} renderInput={(params) => <TextField {...params} label="Country" />} />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <Autocomplete options={states} getOptionLabel={(option) => option.state_name || ""} value={states.find((s) => s.state_id == currentEmployee.state_id) || null} onChange={(e, nv) => handleStateChange(nv)} isOptionEqualToValue={(option, value) => option.state_id == value.state_id} disabled={!currentEmployee.country_id} renderInput={(params) => <TextField {...params} label="State" />} />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <Autocomplete options={employeeHubs} getOptionLabel={(option) => option.employee_hub_name || ""} value={employeeHubs.find((h) => h.employee_hub_id == currentEmployee.employee_hub_id) || null} onChange={(e, nv) => setCurrentEmployee((prev) => ({ ...prev, employee_hub_id: nv ? nv.employee_hub_id : "" }))} isOptionEqualToValue={(option, value) => option.employee_hub_id == value.employee_hub_id} disabled={!currentEmployee.state_id} renderInput={(params) => <TextField {...params} label="holiday Hub" />} />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <Autocomplete options={headquarters} getOptionLabel={(option) => option.headquarter_name || ""} value={headquarters.find((h) => h.headquarter_id == currentEmployee.headquarter_id) || null} onChange={(e, nv) => setCurrentEmployee((prev) => ({ ...prev, headquarter_id: nv ? nv.headquarter_id : "" }))} isOptionEqualToValue={(option, value) => option.headquarter_id == value.headquarter_id} renderInput={(params) => <TextField {...params} label="Headquarter" />} />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <Autocomplete options={divisions} getOptionLabel={(option) => option.division_name || ""} value={divisions.find((d) => d.division_id == currentEmployee.division_id) || null} onChange={(e, nv) => handleDivisionChange(nv)} isOptionEqualToValue={(option, value) => option.division_id == value.division_id} renderInput={(params) => <TextField {...params} label="Division" />} />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <Autocomplete options={subDivisionOptions} getOptionLabel={(option) => option.label || ""} value={subDivisionOptions.find((sd) => sd.value === currentEmployee.subDivision) || null} onChange={(e, nv) => setCurrentEmployee((prev) => ({ ...prev, subDivision: nv ? nv.value : "" }))} isOptionEqualToValue={(option, value) => option.value === value.value} disabled={isSubDivisionDisabled} renderInput={(params) => <TextField {...params} label="Sub Division" />} />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <Autocomplete options={allEmployeesForDropdown} getOptionLabel={(option) => (option.label ? `${option.label} (${option.emp_id})` : "")} value={allEmployeesForDropdown.find((e) => e.value == currentEmployee.manager_id) || null} onChange={(e, nv) => setCurrentEmployee((prev) => ({ ...prev, manager_id: nv ? nv.value : "" }))} isOptionEqualToValue={(option, value) => option.value == value.value} renderInput={(params) => <TextField {...params} label="Manager" />} />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <Autocomplete options={departments} getOptionLabel={(option) => option.dept_name || ""} value={departments.find((d) => d.dept_id == currentEmployee.department_id) || null} onChange={(e, nv) => handleDeptChange(nv)} isOptionEqualToValue={(option, value) => option.dept_id == value.dept_id} renderInput={(params) => <TextField {...params} label="Department" />} />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <Autocomplete options={designations} getOptionLabel={(option) => option.desig_name || ""} value={designations.find((d) => d.desig_id == currentEmployee.designation_id) || null} onChange={(e, nv) => setCurrentEmployee((prev) => ({ ...prev, designation_id: nv ? nv.desig_id : "" }))} isOptionEqualToValue={(option, value) => option.desig_id == value.desig_id} disabled={!currentEmployee.department_id} renderInput={(params) => <TextField {...params} label="Designation" />} />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <Autocomplete options={officeShifts} getOptionLabel={(option) => option.office_shift_name || ""} value={officeShifts.find((s) => s.office_shift_id == currentEmployee.officeShift) || null} onChange={(e, nv) => setCurrentEmployee((prev) => ({ ...prev, officeShift: nv ? nv.office_shift_id : "" }))} isOptionEqualToValue={(option, value) => option.office_shift_id == value.office_shift_id} renderInput={(params) => <TextField {...params} label="Office Shift" />} />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <Autocomplete options={statusOptions} getOptionLabel={(option) => option.label} value={statusOptions.find((s) => s.value === currentEmployee.status) || null} onChange={(e, nv) => setCurrentEmployee((prev) => ({ ...prev, status: nv ? nv.value : 1 }))} isOptionEqualToValue={(option, value) => option.value === value.value} renderInput={(params) => <TextField {...params} label="Status" />} />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <Autocomplete options={probationOptions} getOptionLabel={(option) => option.label} value={probationOptions.find((p) => p.value === currentEmployee.is_probation) || null} onChange={(e, nv) => setCurrentEmployee((prev) => ({ ...prev, is_probation: nv ? nv.value : "n" }))} isOptionEqualToValue={(option, value) => option.value === value.value} renderInput={(params) => <TextField {...params} label="On Probation" />} />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField fullWidth label="Join Date" name="join_date" type="date" value={currentEmployee.join_date || ""} onChange={handleInputChange} InputLabelProps={{ shrink: true }} />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
//                 <Button variant="contained" component="label" disabled={isEditMode} sx={purpleButtonSx}>
//                   Upload Photo
//                   <input type="file" hidden accept="image/*" onChange={handleFileUpload} />
//                 </Button>
//                 {currentEmployee.avatar && <Avatar src={typeof currentEmployee.avatar === "string" ? currentEmployee.avatar : URL.createObjectURL(currentEmployee.avatar)} sx={{ width: 56, height: 56 }} />}
//               </Box>
//             </Grid>
//             <Grid item xs={12}>
//               {isFetchingDocs && <CircularProgress />}
//               {employeeDocuments && !isFetchingDocs && (
//                 <Box>
//                   <Typography variant="subtitle1" gutterBottom>
//                     Fetched Documents
//                   </Typography>
//                   <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
//                     {Object.entries(employeeDocuments).map(([name, url]) =>
//                       url ? (
//                         <Chip key={name} label={name.replace(/_/g, " ")} component="a" href={url} target="_blank" clickable icon={<LinkIcon />} variant="outlined" color="secondary" size="small" />
//                       ) : null
//                     )}
//                   </Box>
//                 </Box>
//               )}
//             </Grid>
//             {!isEditMode && (
//               <>
//                 <Grid item xs={12} sm={6}>
//                   <Autocomplete options={genderOptions} getOptionLabel={(option) => option.label} value={genderOptions.find((g) => g.value === currentEmployee.gender) || null} onChange={(e, nv) => setCurrentEmployee((prev) => ({ ...prev, gender: nv ? nv.value : "" }))} isOptionEqualToValue={(option, value) => option.value === value.value} renderInput={(params) => <TextField {...params} label="Gender" />} />
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <TextField fullWidth label="Username" name="username" value={currentEmployee.username || ""} onChange={handleInputChange} InputProps={{ readOnly: true }} />
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <TextField fullWidth label="Password" name="password" value={currentEmployee.password || ""} onChange={handleInputChange} type={showPassword ? "text" : "password"} InputProps={{ endAdornment: (<InputAdornment position="end"> <IconButton aria-label="toggle password visibility" onClick={() => setShowPassword((prev) => !prev)} onMouseDown={(e) => e.preventDefault()} edge="end"> {showPassword ? <VisibilityOff /> : <Visibility />} </IconButton> </InputAdornment>) }} />
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <Autocomplete options={roles} getOptionLabel={(option) => option.role_name || ""} value={roles.find((r) => r.index == currentEmployee.role) || null} onChange={(e, nv) => setCurrentEmployee((prev) => ({ ...prev, role: nv ? nv.index : "" }))} isOptionEqualToValue={(option, value) => option.index == value.index} renderInput={(params) => <TextField {...params} label="Role" />} />
//                 </Grid>
//                 <Grid item xs={12} sm={6} md={3}>
//                   <TextField fullWidth label="Gross Salary monthly" name="grossSalary" type="number" value={currentEmployee.grossSalary || ""} onChange={(e) => { const value = e.target.value; if (/^\d*\.?\d*$/.test(value)) handleInputChange(e); }} />
//                 </Grid>
//                 <Grid item xs={12} sm={6} md={3}>
//                   <TextField fullWidth label="Gross Salary Yearly" name="grossSalaryYearly" type="number" value={currentEmployee.grossSalaryYearly || ""} InputProps={{ readOnly: true }} />
//                 </Grid>
//                 <Grid item xs={12} sm={6} md={3}>
//                   <TextField fullWidth label="CTC Monthly" name="ctcMonthly" type="number" value={currentEmployee.ctcMonthly || ""} InputProps={{ readOnly: true }} />
//                 </Grid>
//                 <Grid item xs={12} sm={6} md={3}>
//                   <TextField fullWidth label="CTC Yearly" name="ctcYearly" type="number" value={currentEmployee.ctcYearly || ""} InputProps={{ readOnly: true }} />
//                 </Grid>
//               </>
//             )}
//           </Grid>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setOpenEmployeeForm(false)} disabled={isSaving} sx={cancelButtonSx}>
//             Cancel
//           </Button>
//           <Button onClick={handleSaveEmployee} variant="contained" disabled={isSaving} sx={purpleButtonSx}>
//             {isSaving ? <CircularProgress size={24} color="inherit" /> : "Save"}
//           </Button>
//         </DialogActions>
//       </Dialog>

//       <TableContainer>
//         <Table sx={{ minWidth: "100%", whiteSpace: "nowrap" }}>
//           <TableHead>
//             <TableRow sx={{ bgcolor: themePurple }}>
//               <TableCell sx={{ fontWeight: "bold", color: "white" }}>SR. NO.</TableCell>
//               <TableCell sx={{ fontWeight: "bold", color: "white" }}>EMPLOYEE</TableCell>
//               <TableCell sx={{ color: "white" }}></TableCell>
//               <TableCell sx={{ fontWeight: "bold", color: "white" }}>DEPARTMENT</TableCell>
//               <TableCell sx={{ fontWeight: "bold", color: "white" }}>DESIGNATION</TableCell>
//               <TableCell sx={{ fontWeight: "bold", color: "white" }}>JOIN DATE</TableCell>
//               <TableCell sx={{ fontWeight: "bold", color: "white" }}>STATUS</TableCell>
//               <TableCell sx={{ fontWeight: "bold", color: "white" }}>MANAGER</TableCell>
//               <TableCell sx={{ fontWeight: "bold", textAlign: "center", color: "white" }}>ACTIONS</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {loading ? (
//               Array.from(new Array(rowsPerPage)).map((_, index) => (
//                 <TableRow key={index}>
//                   <TableCell>
//                     <Skeleton variant="text" />
//                   </TableCell>
//                   <TableCell>
//                     <Skeleton variant="text" />
//                   </TableCell>
//                   <TableCell>
//                     <Skeleton variant="text" />
//                   </TableCell>
//                   <TableCell>
//                     <Skeleton variant="text" />
//                   </TableCell>
//                   <TableCell>
//                     <Skeleton variant="text" />
//                   </TableCell>
//                   <TableCell>
//                     <Skeleton variant="text" />
//                   </TableCell>
//                   <TableCell>
//                     <Skeleton variant="text" />
//                   </TableCell>
//                   <TableCell>
//                     <Skeleton variant="text" />
//                   </TableCell>
//                   <TableCell align="center">
//                     <Skeleton variant="rectangular" width={80} height={30} />
//                   </TableCell>
//                 </TableRow>
//               ))
//             ) : (
//               (rowsPerPage > 0 ? filteredEmployees.slice(currentPage * rowsPerPage, currentPage * rowsPerPage + rowsPerPage) : filteredEmployees).map((employee, index) => (
//                 <TableRow key={employee.user_id} sx={{ "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.04)" } }} onMouseEnter={() => setHoveredRowId(employee.user_id)} onMouseLeave={() => setHoveredRowId(null)}>
//                   <TableCell sx={{ fontSize: "0.95rem" }}>{currentPage * rowsPerPage + index + 1}</TableCell>
//                   <TableCell sx={{ fontSize: "0.95rem" }}>{employee.employee_name}</TableCell>
//                   <TableCell sx={{ padding: "0 8px", textAlign: "center" }}>
//                     {hoveredRowId === employee.user_id && (
//                       <IconButton onClick={() => handleArrowClick(employee.user_id)} size="small" sx={{ color: themeOrange }}>
//                         <ArrowForwardIcon fontSize="small" />
//                       </IconButton>
//                     )}
//                   </TableCell>
//                   <TableCell sx={{ fontSize: "0.95rem" }}>{employee.department_name || "N/A"}</TableCell>
//                   <TableCell sx={{ fontSize: "0.95rem" }}>{employee.designation_name || "N/A"}</TableCell>
//                   <TableCell sx={{ fontSize: "0.95rem" }}>{formatDate(employee.join_date)}</TableCell>
//                   <TableCell sx={{ fontSize: "0.95rem" }}>
//                     <Chip
//                       label={employee.status === 1 ? "Active" : "Inactive"}
//                       size="small"
//                       sx={{
//                         bgcolor: employee.status === 1 ? "#4caf50" : themeOrange,
//                         color: "white",
//                         borderRadius: "16px",
//                         height: "24px",
//                       }}
//                     />
//                   </TableCell>
//                   <TableCell sx={{ fontSize: "0.95rem" }}>{employee.manager}</TableCell>
//                   <TableCell>
//                     <Box display="flex" justifyContent="center" gap={0.5}>
//                       <IconButton onClick={() => handleEditEmployee(employee)} sx={{ color: themePurple }}>
//                         <EditIcon />
//                       </IconButton>
//                       <IconButton onClick={() => handleDeleteEmployee(employee.user_id)} sx={{ color: themeOrange }}>
//                         <DeleteIcon />
//                       </IconButton>
//                     </Box>
//                   </TableCell>
//                 </TableRow>
//               ))
//             )}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       <Box sx={{ p: 2, borderTop: "1px solid rgba(224, 224, 224, 1)" }}>
//         {loading ? (
//           <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//             <Skeleton variant="text" width={150} />
//             <Skeleton variant="rectangular" width={400} height={40} />
//           </Box>
//         ) : (
//           <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 2 }}>
//             <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
//               <FormControl variant="outlined" size="small">
//                 <Select
//                   value={rowsPerPage}
//                   onChange={handleRowsPerPageChange}
//                   sx={{
//                     backgroundColor: themePurple,
//                     color: "white",
//                     borderRadius: "4px",
//                     transition: "background-color 0.3s",
//                     "&:hover": {
//                       backgroundColor: themePurpleHover,
//                     },
//                     "& .MuiOutlinedInput-notchedOutline": {
//                       border: "none",
//                     },
//                     "& .MuiSvgIcon-root": {
//                       color: "white",
//                     },
//                   }}
//                 >
//                   {[10, 25, 50, 100].map((value) => (
//                     <MenuItem key={value} value={value}>
//                       {value}
//                     </MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>
//               <Typography variant="body2" color="text.secondary">
//                 {`1 to ${Math.min(rowsPerPage, filteredEmployees.length)} of ${filteredEmployees.length}`}
//               </Typography>
//             </Box>

//             <Pagination
//               count={Math.ceil(filteredEmployees.length / rowsPerPage)}
//               page={currentPage + 1}
//               onChange={handlePaginationChange}
//               showFirstButton
//               showLastButton
//               sx={{
//                 "& .MuiPaginationItem-root": {
//                   borderRadius: "4px",
//                   transition: "background-color 0.3s, color 0.3s",
//                   "&:hover": {
//                     backgroundColor: themeOrange,
//                     color: "white",
//                   },
//                 },
//                 "& .MuiPaginationItem-page": {
//                   color: themePurple,
//                   "&.Mui-selected": {
//                     backgroundColor: themePurple,
//                     color: "white",
//                     "&:hover": {
//                       backgroundColor: themeOrange,
//                     },
//                   },
//                 },
//                 "& .MuiPaginationItem-icon": {
//                   color: themePurple,
//                 },
//               }}
//             />
//           </Box>
//         )}
//       </Box>
//     </Box>
//   );
// }





// import React, { useState, useEffect, useMemo, useCallback, useRef } from "react";
// import axios from "axios";
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
//   Pagination,
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
// import Swal from "sweetalert2";

// const RESUME_BASE_URL = "https://raasbackend.vetrinahealthcare.com/";
// const statusOptions = [{ value: 1, label: "Active" }, { value: 0, label: "Inactive" }];
// const probationOptions = [{ value: "y", label: "Yes" }, { value: "n", label: "No" }];
// const genderOptions = [{ value: "Male", label: "Male" }, { value: "Female", label: "Female" }, { value: "Other", label: "Other" }];
// const subDivisionOptions = [{ value: "VetBiz", label: "VetBiz" }, { value: "TredBiz", label: "TredBiz" }, { value: " ", label: "TredBiz Mix" }];

// export default function EmployeesView() {
//   const employeeDialogRef = useRef(null);
//   const changeManagerDialogRef = useRef(null);
//   const muiTheme = useTheme();
//   const isMobile = useMediaQuery(muiTheme.breakpoints.down("sm"));
//   const themePurple = "#8C257C";
//   const themePurpleHover = "#6d1d60";
//   const themeOrange = "#F58E35";

//   const purpleButtonSx = {
//     backgroundColor: themePurple,
//     color: "white",
//     "&:hover": {
//       backgroundColor: themePurpleHover,
//     },
//   };
//   const cancelButtonSx = {
//     color: "#757575",
//     "&:hover": {
//       backgroundColor: "rgba(0, 0, 0, 0.04)",
//     },
//   };

//   const [loading, setLoading] = useState(true);
//   const [departments, setDepartments] = useState([]);
//   const [designations, setDesignations] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [openChangeManagerForm, setOpenChangeManagerForm] = useState(false);
//   const [currentPage, setCurrentPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
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
//   const [salaryConfig, setSalaryConfig] = useState(null);

//   const [currentEmployee, setCurrentEmployee] = useState({
//     id: null,
//     firstName: "",
//     middleName: "",
//     lastName: "",
//     email: "",
//     phone: "",
//     address: "", // Added address field
//     employee_id: "",
//     join_date: "",
//     status: 1,
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
//     grossSalaryYearly: "",
//     ctcMonthly: "",
//     ctcYearly: "",
//   });

//   const [openEmployeeForm, setOpenEmployeeForm] = useState(false);

//   // Initial Data Fetch
//   useEffect(() => {
//     const requests = [
//       axiosInstance.get("api/desig_dept_dropdown/"),
//       axiosInstance.get("employee-dropdown/"),
//       axiosInstance.get("api/office_shift_dropdown/"),
//       axiosInstance.get("api/countries/"),
//       axiosInstance.get("api/employee_hub/"),
//       axiosInstance.get("api/division/"),
//       axiosInstance.get("api/role_list/"),
//       axiosInstance.get("api/search_by_email_vet_talent/"),
//       axios.get("https://tdtlworld.com/hrms-backend/api/headquarters/"),
//       axios.get("https://tdtlworld.com/hrms-backend/api/payroll_setup_configuration/"),
//     ];

//     (async () => {
//       try {
//         const results = await Promise.allSettled(requests);
//         const valueAt = (index) => (results[index]?.status === "fulfilled" ? results[index].value : undefined);

//         const depts = valueAt(0);
//         const empDropdown = valueAt(1);
//         const shifts = valueAt(2);
//         const countriesRes = valueAt(3);
//         const hubs = valueAt(4);
//         const divs = valueAt(5);
//         const rolesRes = valueAt(6);
//         const talent = valueAt(7);
//         const headquartersRes = valueAt(8);
//         const salaryConf = valueAt(9);

//         if (depts?.data) setDepartments(depts.data.dept_data ?? []);
//         if (empDropdown?.data) setAllEmployeesForDropdown(empDropdown.data ?? []);
//         if (shifts?.data) setOfficeShifts(shifts.data.office_shift_data ?? []);
//         if (countriesRes?.data && countriesRes.data.status === "success") setCountries(countriesRes.data.data ?? []);
//         if (divs?.data) setDivisions(divs.data ?? []);
//         if (rolesRes?.data?.status === "success") setRoles(rolesRes.data.data ?? []);
//         if (headquartersRes?.data) setHeadquarters(headquartersRes.data ?? []);
//         if (talent?.data?.data) setTalentPool(talent.data.data ?? []);

//         // Salary Config Logic
//         let configData = null;
//         if (Array.isArray(salaryConf?.data)) {
//           configData = salaryConf.data.reduce((acc, item) => {
//             if (item?.particulars) acc[item.particulars] = parseFloat(item.value) || 0;
//             return acc;
//           }, {});
//           setSalaryConfig(configData);
//         } else {
//           setSalaryConfig({ hra: 0.25, basic_plus_da: 0.6, pf_employer_contribution: 0.12, esic_employer_contribution: 0.0325 });
//         }
//       } catch (outerError) {
//         console.error("Unexpected error in fetchInitialData:", outerError);
//       }
//     })();
//   }, []);

//   const fetchEmployees = useCallback(() => {
//     setLoading(true);
//     axiosInstance
//       .get("api/employee_details/")
//       .then((response) => setEmployees(Array.isArray(response.data.data) ? response.data.data : []))
//       .catch((error) => {
//         console.error("Error fetching employees:", error);
//         setEmployees([]);
//       })
//       .finally(() => setLoading(false));
//   }, []);

//   useEffect(() => {
//     fetchEmployees();
//   }, [fetchEmployees]);

//   // CTC Calculator Effect
//   useEffect(() => {
//     if (!salaryConfig || !currentEmployee.grossSalary) {
//       setCurrentEmployee((prev) => ({ ...prev, grossSalaryYearly: "", ctcMonthly: "", ctcYearly: "" }));
//       return;
//     }

//     const parseNumberOrPercent = (v, fallback = 0) => {
//       if (v === null || v === undefined || v === "") return fallback;
//       if (typeof v === "number") return v;
//       const s = String(v).trim();
//       if (s.endsWith("%")) {
//         const num = parseFloat(s.slice(0, -1));
//         return isNaN(num) ? fallback : num / 100;
//       }
//       const n = parseFloat(s);
//       return isNaN(n) ? fallback : n;
//     };

//     const grossSalaryMonthly = parseFloat(currentEmployee.grossSalary);
//     if (isNaN(grossSalaryMonthly) || grossSalaryMonthly <= 0) {
//       setCurrentEmployee((prev) => ({ ...prev, grossSalaryYearly: "", ctcMonthly: "", ctcYearly: "" }));
//       return;
//     }

//     const hraRate = parseNumberOrPercent(salaryConfig.hra, 0.25);
//     const basicPlusDaRate = parseNumberOrPercent(salaryConfig.basic_plus_da, 0.6);
//     let pfRate = parseNumberOrPercent(salaryConfig.pf_employer_contribution, 0.12);
//     if (pfRate > 1) pfRate = pfRate / 100;
//     let esicRate = parseNumberOrPercent(salaryConfig.esic_employer_contribution, 0.0);
//     if (esicRate > 1) esicRate = esicRate / 100;

//     const grossSalaryYearly = grossSalaryMonthly * 12;
//     const hra = grossSalaryMonthly * hraRate;
//     let baseForPf = grossSalaryMonthly - hra;
//     if (baseForPf < 0) baseForPf = 0;
//     let pf_employer = baseForPf * pfRate;
//     const PF_CAP = 1800;
//     if (pf_employer > PF_CAP) pf_employer = PF_CAP;
//     const esic_applicable = grossSalaryMonthly <= 21000;
//     const esic_employer = esic_applicable ? grossSalaryMonthly * esicRate : 0;

//     let no_of_employment_year = 0;
//     const joinDateStr = currentEmployee.join_date;
//     if (joinDateStr) {
//       try {
//         const date_of_joining = new Date(joinDateStr);
//         const now = new Date();
//         if (!isNaN(date_of_joining.getTime()) && date_of_joining <= now) {
//           no_of_employment_year = (now.getTime() - date_of_joining.getTime()) / (1000 * 60 * 60 * 24 * 365.25);
//         }
//       } catch (e) {
//         no_of_employment_year = 0;
//       }
//     }
//     no_of_employment_year = Math.max(0, no_of_employment_year);

//     let gratuityMonthly = 0;
//     try {
//       const basic_plus_da_amount = grossSalaryMonthly * basicPlusDaRate;
//       const completedYears = Math.floor(no_of_employment_year);
//       if (completedYears > 5 && basic_plus_da_amount > 0) {
//         const annualGratuity = (basic_plus_da_amount * 15) / 26 * completedYears;
//         gratuityMonthly = annualGratuity / 12;
//       }
//     } catch (e) {
//       gratuityMonthly = 0;
//     }
//     gratuityMonthly = Math.max(0, gratuityMonthly);

//     const total_benefit = pf_employer + esic_employer + gratuityMonthly;
//     const ctc_monthly = grossSalaryMonthly + total_benefit;
//     const ctc_yearly = ctc_monthly * 12;

//     const round2 = (n) => Math.round((n + Number.EPSILON) * 100) / 100;

//     setCurrentEmployee((prev) => ({
//       ...prev,
//       grossSalaryYearly: round2(grossSalaryYearly).toFixed(2),
//       ctcMonthly: round2(ctc_monthly).toFixed(2),
//       ctcYearly: round2(ctc_yearly).toFixed(2),
//     }));
//   }, [currentEmployee.grossSalary, currentEmployee.join_date, salaryConfig]);

//   // Handlers
//   const handleCountryChange = (selectedCountry) => {
//     const countryId = selectedCountry ? selectedCountry.country_id : "";
//     const countryName = selectedCountry ? selectedCountry.country_name : null;
//     setCurrentEmployee((prev) => ({ ...prev, country_id: countryId, state_id: "", employee_hub_id: "" }));
//     setStates([]);
//     setEmployeeHubs([]);
//     if (countryName) {
//       axiosInstance
//         .get(`api/states/?country_name=${countryName}`)
//         .then((res) => {
//           if (res.data.status === "success") setStates(res.data.data || []);
//         })
//         .catch((err) => console.error("Error fetching states:", err));
//     }
//   };

//   const handleStateChange = (selectedState) => {
//     const stateId = selectedState ? selectedState.state_id : "";
//     setCurrentEmployee((prev) => ({ ...prev, state_id: stateId, employee_hub_id: "" }));
//     setEmployeeHubs([]);
//     if (stateId) {
//       axiosInstance
//         .get(`api/employee_hub_dropdown/${stateId}/`)
//         .then((res) => {
//           if (res.data.status === "success") setEmployeeHubs(res.data.data || []);
//         })
//         .catch((err) => console.error("Error fetching employee hubs:", err));
//     }
//   };

//   const handleDeptChange = (selectedDept) => {
//     const deptId = selectedDept ? selectedDept.dept_id : "";
//     setCurrentEmployee((prev) => ({ ...prev, department_id: deptId, designation_id: "" }));
//     if (deptId) {
//       axiosInstance
//         .get(`api/desig_dept_dropdown/?dept_id=${deptId}/`)
//         .then((res) => setDesignations(res.data.desig_data || []))
//         .catch((err) => console.error("Error fetching designations:", err));
//     } else {
//       setDesignations([]);
//     }
//   };

//   const handleDivisionChange = (selectedDivision) => {
//     const divisionId = selectedDivision ? selectedDivision.division_id : "";
//     if (selectedDivision && selectedDivision.division_name !== "Livestock") {
//       setCurrentEmployee((prev) => ({ ...prev, division_id: divisionId, subDivision: "" }));
//     } else {
//       setCurrentEmployee((prev) => ({ ...prev, division_id: divisionId }));
//     }
//   };

//   const handleChangeManager = async () => {
//     if (!selectedEmployeeForManagerChange || !newManager) {
//       Swal.fire({ icon: "warning", title: "Incomplete Selection", text: "Please select an employee and a new manager.", target: changeManagerDialogRef.current });
//       return;
//     }
//     try {
//       await axiosInstance.put("api/change_manager/", { user_id: selectedEmployeeForManagerChange, manager_id: newManager });
//       await fetchEmployees();
//       Swal.fire({ icon: "success", title: "Success", text: "Manager changed successfully!", timer: 3000, showConfirmButton: false });
//       setOpenChangeManagerForm(false);
//       setSelectedEmployeeForManagerChange("");
//       setNewManager("");
//     } catch (error) {
//       console.error("Error changing manager:", error);
//       Swal.fire({ icon: "error", title: "Operation Failed", text: `Error changing manager: ${error.response?.data?.message || "An error occurred."}`, target: changeManagerDialogRef.current });
//     }
//   };

//   const navigate = useNavigate();
//   const handleArrowClick = (id) => navigate(`/hrms/admindashboard/employeedetail/${id}`);

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setCurrentEmployee((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleAddEmployee = async () => {
//     try {
//       const maxIdResponse = await axios.get("https://tdtlworld.com/hrms-backend/api/get_max_employee_id/");
//       const newEmpId = maxIdResponse.data.employee_id;
//       setCurrentEmployee({
//         emp_id: newEmpId,
//         firstName: "",
//         middleName: "",
//         lastName: "",
//         email: "",
//         phone: "",
//         address: "",
//         avatar: null,
//         officeShift: "",
//         status: 1,
//         join_date: "",
//         gender: "",
//         username: newEmpId,
//         password: "",
//         role: "",
//         grossSalary: "",
//         department_id: "",
//         designation_id: "",
//         manager_id: "",
//         country_id: "",
//         state_id: "",
//         employee_hub_id: "",
//         headquarter_id: "",
//         division_id: "",
//         company_id: 2,
//         is_probation: "n",
//         resumeUrl: "",
//         subDivision: "",
//         grossSalaryYearly: "",
//         ctcMonthly: "",
//         ctcYearly: "",
//         employee_id: "",
//       });
//       setDesignations([]);
//       setStates([]);
//       setEmployeeHubs([]);
//       setEmployeeDocuments(null);
//       setIsEditMode(false);
//       setShowPassword(false);
//       setOpenEmployeeForm(true);
//     } catch (error) {
//       console.error("Error fetching max employee ID:", error);
//       Swal.fire({ icon: "error", title: "Error", text: "Failed to initialize employee form.", timer: 3000, showConfirmButton: false });
//     }
//   };

//   const handleTalentSelect = async (event, selectedOption) => {
//     setEmployeeDocuments(null);
//     setCurrentEmployee((prev) => ({ ...prev, resumeUrl: "" }));
//     if (!selectedOption) {
//       setCurrentEmployee((prev) => ({ ...prev, firstName: "", middleName: "", lastName: "", email: "", phone: "", gender: "", country_id: "", state_id: "" }));
//       return;
//     }
//     const talent = talentPool.find((p) => p.email === selectedOption.email);
//     if (!talent) return;
//     const selectedCountry = countries.find((c) => c.country_name === talent.country);
//     const resumeLink = talent.resume ? `${RESUME_BASE_URL}${talent.resume}` : "";
//     setCurrentEmployee((prev) => ({
//       ...prev,
//       firstName: talent.first_name || "",
//       middleName: talent.middle_name || "",
//       lastName: talent.last_name || "",
//       email: talent.email || "",
//       phone: talent.phone || "",
//       gender: talent.gender || "",
//       address: talent.address || "", // Map address if available
//       country_id: selectedCountry ? selectedCountry.country_id : "",
//       state_id: "",
//       employee_hub_id: "",
//       resumeUrl: resumeLink,
//     }));
//     // ... dependent dropdown fetch logic for state/hub ...
//     if (selectedCountry) {
//         try {
//           const statesRes = await axiosInstance.get(`api/states/?country_name=${selectedCountry.country_name}`);
//           if (statesRes.data.status === "success") {
//             const fetchedStates = statesRes.data.data || [];
//             setStates(fetchedStates);
//             const selectedState = fetchedStates.find((s) => s.state_name === talent.state);
//             if (selectedState) {
//               setCurrentEmployee((prev) => ({ ...prev, state_id: selectedState.state_id }));
//               const hubsRes = await axiosInstance.get(`api/employee_hub_dropdown/${selectedState.state_id}/`);
//               if (hubsRes.data.status === "success") setEmployeeHubs(hubsRes.data.data || []);
//             }
//           }
//         } catch (err) { console.error(err); }
//     }
//     setIsFetchingDocs(true);
//     try {
//       const docResponse = await axios.post("https://raasbackend.vetrinahealthcare.com/fetch_documents/", { email_id: talent.email });
//       setEmployeeDocuments(docResponse.data.status === "success" && docResponse.data.documents ? docResponse.data.documents : null);
//     } catch (error) {
//       console.error("Error fetching documents:", error);
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
//         Swal.fire({ icon: "error", title: "Error", text: "Failed to load employee details.", timer: 3000, showConfirmButton: false });
//         return;
//       }
//       const empData = response.data.data[0];
//       const [desigRes, statesRes, hubsRes] = await Promise.all([
//         axiosInstance.get(`api/desig_dept_dropdown/?dept_id=${empData.department_id}/`),
//         empData.country_name ? axiosInstance.get(`api/states/?country_name=${empData.country_name}`) : Promise.resolve({ data: { data: [] } }),
//         empData.state ? axiosInstance.get(`api/employee_hub_dropdown/${empData.state}/`) : Promise.resolve({ data: { data: [] } }),
//       ]);
//       setDesignations(desigRes.data.desig_data || []);
//       setStates(statesRes.data.data || []);
//       setEmployeeHubs(hubsRes.data.data || []);
//       const officeShiftObj = officeShifts.find((s) => s.office_shift_name === empData.office_shift);
//       const nameParts = (empData.emp_name || "").split(" ");
//       const selectedCountry = countries.find((c) => c.country_name === empData.country_name);
//       const selectedHeadquarter = headquarters.find((hq) => hq.headquarter_name === empData.headquarter);
//       let finalSubDivisionValue = empData.sub_division || "";
//       if (finalSubDivisionValue === "Tred") finalSubDivisionValue = "TredBiz";

//       setCurrentEmployee({
//         id: employee.user_id,
//         firstName: nameParts[0] || "",
//         middleName: nameParts.length > 2 ? nameParts.slice(1, -1).join(" ") : "",
//         lastName: nameParts.length > 1 ? nameParts[nameParts.length - 1] : "",
//         email: empData.email || "",
//         employee_id: empData.employee_id || "",
//         phone: empData.phone || "",
//         address: empData.address || "", // Populate Address
//         manager_id: empData.manager_id ? Number(empData.manager_id) : "",
//         designation_id: empData.designation_id ? Number(empData.designation_id) : "",
//         department_id: empData.department_id ? Number(empData.department_id) : "",
//         headquarter_id: selectedHeadquarter ? selectedHeadquarter.headquarter_id : "",
//         subDivision: finalSubDivisionValue,
//         division_id: empData.division_id ? Number(empData.division_id) : "",
//         state_id: empData.state ? Number(empData.state) : "",
//         employee_hub_id: empData.employee_hub_id ? Number(empData.employee_hub_id) : "",
//         role: empData.role_id ? Number(empData.role_id) : "",
//         officeShift: officeShiftObj ? Number(officeShiftObj.office_shift_id) : "",
//         status: Number(empData.status),
//         join_date: empData.join_date ? empData.join_date.split(" ")[0] : "",
//         country_id: selectedCountry ? Number(selectedCountry.country_id) : "",
//         avatar: empData.profile_photo || "",
//         is_probation: empData.probation?.toLowerCase() === "y" ? "y" : "n",
//         resumeUrl: "",
//       });
//       setIsEditMode(true);
//       setOpenEmployeeForm(true);
//       setShowPassword(false);
//     } catch (error) {
//       console.error("Error fetching employee details for edit:", error);
//       Swal.fire({ icon: "error", title: "Error", text: "Failed to fetch complete employee details.", timer: 3000, showConfirmButton: false });
//     }
//   };

//   const handleSaveEmployee = async () => {
//     if (!isEditMode) {
//       // Validate required fields
//       const requiredFields = {
//         firstName: "First Name",
//         lastName: "Last Name",
//         email: "Email",
//         phone: "Mobile Number",
//         country_id: "Country",
//         state_id: "State",
//         // address: "Address", // Uncomment if address is strictly required
//         role: "User (Role)",
//         department_id: "Department",
//         division_id: "Division",
//         designation_id: "Designation",
//         headquarter_id: "Headquarter",
//         manager_id: "Line Manager",
//         employee_hub_id: "Holiday Hub",
//         officeShift: "Shift & Scheduling",
//         // Remaining
//         join_date: "Join Date",
//         avatar: "Photo",
//         gender: "Gender",
//         username: "Username",
//         password: "Password",
//         grossSalary: "Gross Salary",
//       };
      
//       const selectedDivision = divisions.find((d) => d.division_id == currentEmployee.division_id);
//       if (selectedDivision && selectedDivision.division_name === "Livestock" && !currentEmployee.subDivision) {
//         Swal.fire({ icon: "error", title: "Validation Error", text: "Sub Division is required when Division is Livestock.", target: employeeDialogRef.current });
//         return;
//       }
      
//       for (const field in requiredFields) {
//         if (!currentEmployee[field]) {
//           Swal.fire({ icon: "error", title: "Validation Error", text: `The field "${requiredFields[field]}" is required.`, target: employeeDialogRef.current });
//           return;
//         }
//       }
//     }
    
//     const formData = new FormData();
//     const keyMap = {
//       firstName: "first_name",
//       middleName: "middle_name",
//       lastName: "last_name",
//       officeShift: "office_shift",
//       join_date: "join_date",
//       grossSalary: "gross_salary",
//       headquarter_id: "headquarter_id",
//       grossSalaryYearly: "gross_salary_yearly",
//       ctcMonthly: "ctc_monthly",
//       ctcYearly: "ctc_yearly",
//       address: "address", // Ensure address is sent
//     };
//     Object.keys(currentEmployee).forEach((key) => {
//       if (key === "avatar" && currentEmployee.avatar instanceof File) {
//         formData.append("file", currentEmployee.avatar);
//       } else if (key !== "resumeUrl" && currentEmployee[key] !== null && currentEmployee[key] !== undefined && currentEmployee[key] !== "") {
//         const backendKey = keyMap[key] || key;
//         formData.append(backendKey, currentEmployee[key]);
//       }
//     });
    
//     setIsSaving(true);
//     try {
//       const action = isEditMode ? "updated" : "added";
//       if (isEditMode) {
//         formData.append("user_id", currentEmployee.id);
//         await axiosInstance.put("api/edit_employee/", formData, { headers: { "Content-Type": "multipart/form-data" } });
//       } else {
//         await axiosInstance.post("api/add_employee/", formData, { headers: { "Content-Type": "multipart/form-data" } });
//       }
//       setOpenEmployeeForm(false);
//       await fetchEmployees();
//       Swal.fire({ icon: "success", title: "Success", text: `Employee ${action} successfully!`, timer: 3000, showConfirmButton: false });
//     } catch (error) {
//       console.error("Error saving employee:", error);
//       const errorMessage = error.response?.data?.message || error.response?.data?.detail || "An unexpected error occurred.";
//       Swal.fire({ icon: "error", title: "Operation failed", text: `${errorMessage}`, target: employeeDialogRef.current });
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   const handleDeleteEmployee = (employeeId) => {
//     if (!employeeId) return;
//     Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: themePurple,
//       cancelButtonColor: themeOrange,
//       confirmButtonText: "Yes, delete it!",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         axiosInstance
//           .delete("api/edit_employee/", { data: { user_id: employeeId } })
//           .then(() => {
//             fetchEmployees();
//             Swal.fire({ icon: "success", title: "Deleted!", text: "The employee has been deleted.", timer: 3000, showConfirmButton: false });
//           })
//           .catch((error) => {
//             const errorMessage = error.response?.data?.message || error.response?.data?.detail || "Failed to delete employee.";
//             Swal.fire({ icon: "error", title: "Error", text: errorMessage, timer: 3000, showConfirmButton: false });
//           });
//       }
//     });
//   };

//   const handleExportEmployees = () => {
//     if (employees.length === 0) {
//       Swal.fire({ icon: "info", title: "Info", text: "There is no employee data to export.", timer: 3000, showConfirmButton: false });
//       return;
//     }
//     const worksheet = XLSX.utils.json_to_sheet(employees);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Employees");
//     XLSX.writeFile(workbook, "EmployeesData.xlsx");
//   };

//   const sortedEmployees = useMemo(() => {
//     if (!Array.isArray(employees)) return [];
//     return [...employees].sort((a, b) => b.user_id - a.user_id);
//   }, [employees]);

//   const filteredEmployees = useMemo(
//     () =>
//       sortedEmployees.filter(
//         (e) =>
//           (e.employee_name && e.employee_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
//           (e.department_name && e.department_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
//           (e.designation_name && e.designation_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
//           (e.join_date && e.join_date.toLowerCase().includes(searchTerm.toLowerCase())) ||
//           (e.manager && e.manager.toLowerCase().includes(searchTerm.toLowerCase()))
//       ),
//     [sortedEmployees, searchTerm]
//   );

//   const handlePaginationChange = (event, newPage) => setCurrentPage(newPage - 1);
//   const handleRowsPerPageChange = (event) => { setRowsPerPage(parseInt(event.target.value, 10)); setCurrentPage(0); };
//   const handleFileUpload = (e) => { const file = e.target.files[0]; if (file) setCurrentEmployee((prev) => ({ ...prev, avatar: file })); };

//   const isSubDivisionDisabled = useMemo(() => {
//     if (!currentEmployee.division_id) return true;
//     const selectedDivision = divisions.find((d) => d.division_id == currentEmployee.division_id);
//     return !selectedDivision || selectedDivision.division_name !== "Livestock";
//   }, [currentEmployee.division_id, divisions]);

//   const formatDate = (dateString) => {
//     if (!dateString) return "";
//     try {
//       const date = new Date(dateString);
//       return `${String(date.getDate()).padStart(2, "0")}/${String(date.getMonth() + 1).padStart(2, "0")}/${date.getFullYear()}`;
//     } catch (error) {
//       return dateString.split(" ")[0];
//     }
//   };

//   return (
//     <Box component={Paper} p={3}>
//       <Typography variant="h4" sx={{ color: themePurple, fontWeight: "bold", mb: 5 }}>
//         Employees List
//       </Typography>
//       <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: isMobile ? "column" : "row", gap: 2, mb: 2 }}>
//         <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
//           <Button variant="contained" startIcon={<AddIcon />} onClick={handleAddEmployee} sx={purpleButtonSx}>Add Employee</Button>
//           <Button variant="contained" startIcon={<DownloadIcon />} onClick={handleExportEmployees} sx={purpleButtonSx}>Export</Button>
//           <Button variant="contained" startIcon={<ChangeManagerIcon />} onClick={() => setOpenChangeManagerForm(true)} sx={purpleButtonSx}>Change Manager</Button>
//         </Box>
//         <TextField size="small" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} sx={{ width: isMobile ? "100%" : "auto" }} InputProps={{ startAdornment: (<InputAdornment position="start"><SearchIcon /></InputAdornment>) }} />
//       </Box>

//       {/* Change Manager Dialog */}
//       <Dialog open={openChangeManagerForm} onClose={() => setOpenChangeManagerForm(false)} maxWidth="sm" fullWidth ref={changeManagerDialogRef}>
//         <DialogTitle sx={{ color: themePurple, fontWeight: "bold" }}>
//           Change Manager
//           <IconButton onClick={() => setOpenChangeManagerForm(false)} sx={{ position: "absolute", right: 8, top: 8, color: "grey.500" }}><CloseIcon /></IconButton>
//         </DialogTitle>
//         <DialogContent>
//           <Grid container spacing={2} sx={{ mt: 1 }}>
//             <Grid item xs={12}>
//               <FormControl fullWidth>
//                 <InputLabel>Select Employee</InputLabel>
//                 <Select value={selectedEmployeeForManagerChange} onChange={(e) => setSelectedEmployeeForManagerChange(e.target.value)} label="Select Employee">
//                   {allEmployeesForDropdown.map((emp) => (<MenuItem key={emp.value} value={emp.value}>{`${emp.label} (${emp.emp_id})`}</MenuItem>))}
//                 </Select>
//               </FormControl>
//             </Grid>
//             <Grid item xs={12}>
//               <FormControl fullWidth>
//                 <InputLabel>Select New Manager</InputLabel>
//                 <Select value={newManager} onChange={(e) => setNewManager(e.target.value)} label="Select New Manager">
//                   {allEmployeesForDropdown.map((emp) => (<MenuItem key={emp.value} value={emp.value}>{`${emp.label} (${emp.emp_id})`}</MenuItem>))}
//                 </Select>
//               </FormControl>
//             </Grid>
//           </Grid>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setOpenChangeManagerForm(false)} sx={cancelButtonSx}>Cancel</Button>
//           <Button onClick={handleChangeManager} variant="contained" sx={purpleButtonSx}>Save</Button>
//         </DialogActions>
//       </Dialog>

//       {/* Main Employee Form Dialog */}
//       <Dialog open={openEmployeeForm} onClose={() => setOpenEmployeeForm(false)} maxWidth="md" fullWidth ref={employeeDialogRef}>
//         <DialogTitle sx={{ color: "#8C257C ", fontWeight: "bold", fontSize: "2rem" }}>
//           {isEditMode ? "Edit Employee" : "Add Employee"}
//           <IconButton onClick={() => setOpenEmployeeForm(false)} sx={{ position: "absolute", right: 8, top: 8, color: "grey.500" }}><CloseIcon /></IconButton>
//         </DialogTitle>
//         <DialogContent>
//           <Grid container spacing={2} sx={{ mt: 1 }}>
//             {!isEditMode && (
//               <Grid item xs={12}>
//                 <Autocomplete
//                   options={talentPool}
//                   getOptionLabel={(option) => option.email || ""}
//                   onChange={handleTalentSelect}
//                   onInputChange={(event, newInputValue) => { if (!talentPool.find((p) => p.email === newInputValue)) setCurrentEmployee((prev) => ({ ...prev, email: newInputValue })); }}
//                   renderInput={(params) => <TextField {...params} label="Search Email to Auto-fill" />}
//                 />
//               </Grid>
//             )}

//             {/* 1. Name */}
//             <Grid item xs={12} sm={4}>
//               <TextField fullWidth label="First Name" name="firstName" value={currentEmployee.firstName || ""} onChange={handleInputChange} onKeyPress={(e) => { if (!/^[A-Za-z]$/.test(e.key)) e.preventDefault(); }} InputProps={{ readOnly: isEditMode }} />
//             </Grid>
//             <Grid item xs={12} sm={4}>
//               <TextField fullWidth label="Middle Name" name="middleName" value={currentEmployee.middleName || ""} onChange={handleInputChange} onKeyPress={(e) => { if (!/^[A-Za-z]$/.test(e.key)) e.preventDefault(); }} InputProps={{ readOnly: isEditMode }} />
//             </Grid>
//             <Grid item xs={12} sm={4}>
//               <TextField fullWidth label="Last Name" name="lastName" value={currentEmployee.lastName || ""} onChange={handleInputChange} onKeyPress={(e) => { if (!/^[A-Za-z]$/.test(e.key)) e.preventDefault(); }} InputProps={{ readOnly: isEditMode }} />
//             </Grid>

//             {/* 2. Email */}
//             <Grid item xs={12} sm={6}>
//               <TextField fullWidth label="Email" name="email" value={currentEmployee.email || ""} onChange={handleInputChange} InputProps={{ readOnly: isEditMode || !!talentPool.find((p) => p.email === currentEmployee.email) }} />
//             </Grid>

//             {/* 3. Mobile Number */}
//             <Grid item xs={12} sm={6}>
//               <TextField fullWidth label="Mobile Number" name="phone" value={currentEmployee.phone || ""} onChange={(e) => { const value = e.target.value; if (/^\d{0,10}$/.test(value)) handleInputChange(e); }} inputProps={{ maxLength: 10, inputMode: "numeric", pattern: "[0-9]*" }} InputProps={{ readOnly: isEditMode }} />
//             </Grid>

//             {/* 4. Address */}
//             <Grid item xs={12}>
//                 <TextField fullWidth label="Address" name="address" value={currentEmployee.address || ""} onChange={handleInputChange} />
//             </Grid>

//             {/* 5. Country */}
//             <Grid item xs={12} sm={6}>
//               <Autocomplete options={countries} getOptionLabel={(option) => option.country_name || ""} value={countries.find((c) => c.country_id == currentEmployee.country_id) || null} onChange={(e, nv) => handleCountryChange(nv)} isOptionEqualToValue={(option, value) => option.country_id == value.country_id} renderInput={(params) => <TextField {...params} label="Country" />} />
//             </Grid>

//             {/* 6. State */}
//             <Grid item xs={12} sm={6}>
//               <Autocomplete options={states} getOptionLabel={(option) => option.state_name || ""} value={states.find((s) => s.state_id == currentEmployee.state_id) || null} onChange={(e, nv) => handleStateChange(nv)} isOptionEqualToValue={(option, value) => option.state_id == value.state_id} disabled={!currentEmployee.country_id} renderInput={(params) => <TextField {...params} label="State" />} />
//             </Grid>

//             {/* 7. User (role) */}
//             <Grid item xs={12} sm={6}>
//                <Autocomplete options={roles} getOptionLabel={(option) => option.role_name || ""} value={roles.find((r) => r.index == currentEmployee.role) || null} onChange={(e, nv) => setCurrentEmployee((prev) => ({ ...prev, role: nv ? nv.index : "" }))} isOptionEqualToValue={(option, value) => option.index == value.index} renderInput={(params) => <TextField {...params} label="User (Role)" />} />
//             </Grid>

//             {/* 8. Department */}
//             <Grid item xs={12} sm={6}>
//               <Autocomplete options={departments} getOptionLabel={(option) => option.dept_name || ""} value={departments.find((d) => d.dept_id == currentEmployee.department_id) || null} onChange={(e, nv) => handleDeptChange(nv)} isOptionEqualToValue={(option, value) => option.dept_id == value.dept_id} renderInput={(params) => <TextField {...params} label="Department" />} />
//             </Grid>

//             {/* 9. Division */}
//             <Grid item xs={12} sm={6}>
//               <Autocomplete options={divisions} getOptionLabel={(option) => option.division_name || ""} value={divisions.find((d) => d.division_id == currentEmployee.division_id) || null} onChange={(e, nv) => handleDivisionChange(nv)} isOptionEqualToValue={(option, value) => option.division_id == value.division_id} renderInput={(params) => <TextField {...params} label="Division" />} />
//             </Grid>

//             {/* 10. Sub-division */}
//             <Grid item xs={12} sm={6}>
//               <Autocomplete options={subDivisionOptions} getOptionLabel={(option) => option.label || ""} value={subDivisionOptions.find((sd) => sd.value === currentEmployee.subDivision) || null} onChange={(e, nv) => setCurrentEmployee((prev) => ({ ...prev, subDivision: nv ? nv.value : "" }))} isOptionEqualToValue={(option, value) => option.value === value.value} disabled={isSubDivisionDisabled} renderInput={(params) => <TextField {...params} label="Sub-division" />} />
//             </Grid>

//             {/* 11. Designation */}
//             <Grid item xs={12} sm={6}>
//               <Autocomplete options={designations} getOptionLabel={(option) => option.desig_name || ""} value={designations.find((d) => d.desig_id == currentEmployee.designation_id) || null} onChange={(e, nv) => setCurrentEmployee((prev) => ({ ...prev, designation_id: nv ? nv.desig_id : "" }))} isOptionEqualToValue={(option, value) => option.desig_id == value.desig_id} disabled={!currentEmployee.department_id} renderInput={(params) => <TextField {...params} label="Designation" />} />
//             </Grid>

//             {/* 12. Headquarter */}
//             <Grid item xs={12} sm={6}>
//               <Autocomplete options={headquarters} getOptionLabel={(option) => option.headquarter_name || ""} value={headquarters.find((h) => h.headquarter_id == currentEmployee.headquarter_id) || null} onChange={(e, nv) => setCurrentEmployee((prev) => ({ ...prev, headquarter_id: nv ? nv.headquarter_id : "" }))} isOptionEqualToValue={(option, value) => option.headquarter_id == value.headquarter_id} renderInput={(params) => <TextField {...params} label="Headquarter" />} />
//             </Grid>

//             {/* 13. Line Manager */}
//             <Grid item xs={12} sm={12}>
//               <Autocomplete 
//                 options={allEmployeesForDropdown} 
//                 getOptionLabel={(option) => (option.label ? `${option.label} (${option.emp_id})` : "")} 
//                 value={allEmployeesForDropdown.find((e) => e.value == currentEmployee.manager_id) || null} 
//                 onChange={(e, nv) => setCurrentEmployee((prev) => ({ ...prev, manager_id: nv ? nv.value : "" }))} 
//                 isOptionEqualToValue={(option, value) => option.value == value.value} 
//                 renderInput={(params) => <TextField {...params} label="Line Manager (Select designation of line manager with division subdivision-HQ)" />} 
//               />
//             </Grid>

//             {/* 14. Holiday Hub */}
//             <Grid item xs={12} sm={6}>
//               <Autocomplete options={employeeHubs} getOptionLabel={(option) => option.employee_hub_name || ""} value={employeeHubs.find((h) => h.employee_hub_id == currentEmployee.employee_hub_id) || null} onChange={(e, nv) => setCurrentEmployee((prev) => ({ ...prev, employee_hub_id: nv ? nv.employee_hub_id : "" }))} isOptionEqualToValue={(option, value) => option.employee_hub_id == value.employee_hub_id} disabled={!currentEmployee.state_id} renderInput={(params) => <TextField {...params} label="Holiday Hub" />} />
//             </Grid>

//             {/* 15. Shift & Scheduling */}
//             <Grid item xs={12} sm={6}>
//               <Autocomplete options={officeShifts} getOptionLabel={(option) => option.office_shift_name || ""} value={officeShifts.find((s) => s.office_shift_id == currentEmployee.officeShift) || null} onChange={(e, nv) => setCurrentEmployee((prev) => ({ ...prev, officeShift: nv ? nv.office_shift_id : "" }))} isOptionEqualToValue={(option, value) => option.office_shift_id == value.office_shift_id} renderInput={(params) => <TextField {...params} label="Shift & Scheduling" />} />
//             </Grid>

//             {/* --- Keep all remaining details as it is --- */}
            
//             {isEditMode && (
//               <Grid item xs={12} sm={6}>
//                 <TextField fullWidth label="Employee ID" name="employee_id" value={currentEmployee.employee_id || ""} InputProps={{ readOnly: true }} />
//               </Grid>
//             )}

//             <Grid item xs={12} sm={6}>
//               <Autocomplete options={statusOptions} getOptionLabel={(option) => option.label} value={statusOptions.find((s) => s.value === currentEmployee.status) || null} onChange={(e, nv) => setCurrentEmployee((prev) => ({ ...prev, status: nv ? nv.value : 1 }))} isOptionEqualToValue={(option, value) => option.value === value.value} renderInput={(params) => <TextField {...params} label="Status" />} />
//             </Grid>

//             <Grid item xs={12} sm={6}>
//               <Autocomplete options={probationOptions} getOptionLabel={(option) => option.label} value={probationOptions.find((p) => p.value === currentEmployee.is_probation) || null} onChange={(e, nv) => setCurrentEmployee((prev) => ({ ...prev, is_probation: nv ? nv.value : "n" }))} isOptionEqualToValue={(option, value) => option.value === value.value} renderInput={(params) => <TextField {...params} label="On Probation" />} />
//             </Grid>

//             <Grid item xs={12} sm={6}>
//               <TextField fullWidth label="Join Date" name="join_date" type="date" value={currentEmployee.join_date || ""} onChange={handleInputChange} InputLabelProps={{ shrink: true }} />
//             </Grid>

//             <Grid item xs={12} sm={6}>
//               <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
//                 <Button variant="contained" component="label" disabled={isEditMode} sx={purpleButtonSx}>
//                   Upload Photo
//                   <input type="file" hidden accept="image/*" onChange={handleFileUpload} />
//                 </Button>
//                 {currentEmployee.avatar && <Avatar src={typeof currentEmployee.avatar === "string" ? currentEmployee.avatar : URL.createObjectURL(currentEmployee.avatar)} sx={{ width: 56, height: 56 }} />}
//               </Box>
//             </Grid>

//             <Grid item xs={12}>
//               {isFetchingDocs && <CircularProgress />}
//               {employeeDocuments && !isFetchingDocs && (
//                 <Box>
//                   <Typography variant="subtitle1" gutterBottom>Fetched Documents</Typography>
//                   <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
//                     {Object.entries(employeeDocuments).map(([name, url]) =>
//                       url ? <Chip key={name} label={name.replace(/_/g, " ")} component="a" href={url} target="_blank" clickable icon={<LinkIcon />} variant="outlined" color="secondary" size="small" /> : null
//                     )}
//                   </Box>
//                 </Box>
//               )}
//             </Grid>

//             {!isEditMode && (
//               <>
//                 <Grid item xs={12} sm={6}>
//                   <Autocomplete options={genderOptions} getOptionLabel={(option) => option.label} value={genderOptions.find((g) => g.value === currentEmployee.gender) || null} onChange={(e, nv) => setCurrentEmployee((prev) => ({ ...prev, gender: nv ? nv.value : "" }))} isOptionEqualToValue={(option, value) => option.value === value.value} renderInput={(params) => <TextField {...params} label="Gender" />} />
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <TextField fullWidth label="Username" name="username" value={currentEmployee.username || ""} onChange={handleInputChange} InputProps={{ readOnly: true }} />
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <TextField fullWidth label="Password" name="password" value={currentEmployee.password || ""} onChange={handleInputChange} type={showPassword ? "text" : "password"} InputProps={{ endAdornment: (<InputAdornment position="end"> <IconButton aria-label="toggle password visibility" onClick={() => setShowPassword((prev) => !prev)} onMouseDown={(e) => e.preventDefault()} edge="end"> {showPassword ? <VisibilityOff /> : <Visibility />} </IconButton> </InputAdornment>) }} />
//                 </Grid>
                
//                 {/* Gross Salary Block */}
//                 <Grid item xs={12} sm={6} md={3}>
//                   <TextField fullWidth label="Gross Salary monthly" name="grossSalary" type="number" value={currentEmployee.grossSalary || ""} onChange={(e) => { const value = e.target.value; if (/^\d*\.?\d*$/.test(value)) handleInputChange(e); }} />
//                 </Grid>
//                 <Grid item xs={12} sm={6} md={3}>
//                   <TextField fullWidth label="Gross Salary Yearly" name="grossSalaryYearly" type="number" value={currentEmployee.grossSalaryYearly || ""} InputProps={{ readOnly: true }} />
//                 </Grid>
//                 <Grid item xs={12} sm={6} md={3}>
//                   <TextField fullWidth label="CTC Monthly" name="ctcMonthly" type="number" value={currentEmployee.ctcMonthly || ""} InputProps={{ readOnly: true }} />
//                 </Grid>
//                 <Grid item xs={12} sm={6} md={3}>
//                   <TextField fullWidth label="CTC Yearly" name="ctcYearly" type="number" value={currentEmployee.ctcYearly || ""} InputProps={{ readOnly: true }} />
//                 </Grid>
//               </>
//             )}
//           </Grid>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setOpenEmployeeForm(false)} disabled={isSaving} sx={cancelButtonSx}>Cancel</Button>
//           <Button onClick={handleSaveEmployee} variant="contained" disabled={isSaving} sx={purpleButtonSx}>{isSaving ? <CircularProgress size={24} color="inherit" /> : "Save"}</Button>
//         </DialogActions>
//       </Dialog>

//       <TableContainer>
//         <Table sx={{ minWidth: "100%", whiteSpace: "nowrap" }}>
//           <TableHead>
//             <TableRow sx={{ bgcolor: themePurple }}>
//               <TableCell sx={{ fontWeight: "bold", color: "white" }}>SR. NO.</TableCell>
//               <TableCell sx={{ fontWeight: "bold", color: "white" }}>EMPLOYEE</TableCell>
//               <TableCell sx={{ color: "white" }}></TableCell>
//               <TableCell sx={{ fontWeight: "bold", color: "white" }}>DEPARTMENT</TableCell>
//               <TableCell sx={{ fontWeight: "bold", color: "white" }}>DESIGNATION</TableCell>
//               <TableCell sx={{ fontWeight: "bold", color: "white" }}>JOIN DATE</TableCell>
//               <TableCell sx={{ fontWeight: "bold", color: "white" }}>STATUS</TableCell>
//               <TableCell sx={{ fontWeight: "bold", color: "white" }}>MANAGER</TableCell>
//               <TableCell sx={{ fontWeight: "bold", textAlign: "center", color: "white" }}>ACTIONS</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {loading ? (
//               Array.from(new Array(rowsPerPage)).map((_, index) => (
//                 <TableRow key={index}><TableCell colSpan={9}><Skeleton animation="wave" /></TableCell></TableRow>
//               ))
//             ) : (
//               (rowsPerPage > 0 ? filteredEmployees.slice(currentPage * rowsPerPage, currentPage * rowsPerPage + rowsPerPage) : filteredEmployees).map((employee, index) => (
//                 <TableRow key={employee.user_id} sx={{ "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.04)" } }} onMouseEnter={() => setHoveredRowId(employee.user_id)} onMouseLeave={() => setHoveredRowId(null)}>
//                   <TableCell sx={{ fontSize: "0.95rem" }}>{currentPage * rowsPerPage + index + 1}</TableCell>
//                   <TableCell sx={{ fontSize: "0.95rem" }}>{employee.employee_name}</TableCell>
//                   <TableCell sx={{ padding: "0 8px", textAlign: "center" }}>{hoveredRowId === employee.user_id && (<IconButton onClick={() => handleArrowClick(employee.user_id)} size="small" sx={{ color: themeOrange }}><ArrowForwardIcon fontSize="small" /></IconButton>)}</TableCell>
//                   <TableCell sx={{ fontSize: "0.95rem" }}>{employee.department_name || "N/A"}</TableCell>
//                   <TableCell sx={{ fontSize: "0.95rem" }}>{employee.designation_name || "N/A"}</TableCell>
//                   <TableCell sx={{ fontSize: "0.95rem" }}>{formatDate(employee.join_date)}</TableCell>
//                   <TableCell sx={{ fontSize: "0.95rem" }}><Chip label={employee.status === 1 ? "Active" : "Inactive"} size="small" sx={{ bgcolor: employee.status === 1 ? "#4caf50" : themeOrange, color: "white", borderRadius: "16px", height: "24px" }} /></TableCell>
//                   <TableCell sx={{ fontSize: "0.95rem" }}>{employee.manager}</TableCell>
//                   <TableCell><Box display="flex" justifyContent="center" gap={0.5}><IconButton onClick={() => handleEditEmployee(employee)} sx={{ color: themePurple }}><EditIcon /></IconButton><IconButton onClick={() => handleDeleteEmployee(employee.user_id)} sx={{ color: themeOrange }}><DeleteIcon /></IconButton></Box></TableCell>
//                 </TableRow>
//               ))
//             )}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       <Box sx={{ p: 2, borderTop: "1px solid rgba(224, 224, 224, 1)" }}>
//         {!loading && (
//           <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 2 }}>
//             <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
//               <FormControl variant="outlined" size="small">
//                 <Select value={rowsPerPage} onChange={handleRowsPerPageChange} sx={{ backgroundColor: themePurple, color: "white", borderRadius: "4px", "&:hover": { backgroundColor: themePurpleHover }, "& .MuiOutlinedInput-notchedOutline": { border: "none" }, "& .MuiSvgIcon-root": { color: "white" } }}>
//                   {[10, 25, 50, 100].map((value) => (<MenuItem key={value} value={value}>{value}</MenuItem>))}
//                 </Select>
//               </FormControl>
//               <Typography variant="body2" color="text.secondary">{`1 to ${Math.min(rowsPerPage, filteredEmployees.length)} of ${filteredEmployees.length}`}</Typography>
//             </Box>
//             <Pagination count={Math.ceil(filteredEmployees.length / rowsPerPage)} page={currentPage + 1} onChange={handlePaginationChange} showFirstButton showLastButton sx={{ "& .MuiPaginationItem-root": { borderRadius: "4px" }, "& .MuiPaginationItem-page.Mui-selected": { backgroundColor: themePurple, color: "white" } }} />
//           </Box>
//         )}
//       </Box>
//     </Box>
//   );
// }



// import React, { useState, useEffect, useMemo, useCallback, useRef } from "react";
// import axios from "axios";
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
//   Pagination,
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
// import Swal from "sweetalert2";

// const RESUME_BASE_URL = "https://raasbackend.vetrinahealthcare.com/";
// const statusOptions = [{ value: 1, label: "Active" }, { value: 0, label: "Inactive" }];
// const probationOptions = [{ value: "y", label: "Yes" }, { value: "n", label: "No" }];
// const genderOptions = [{ value: "Male", label: "Male" }, { value: "Female", label: "Female" }, { value: "Other", label: "Other" }];
// const subDivisionOptions = [{ value: "VetBiz", label: "VetBiz" }, { value: "TredBiz", label: "TredBiz" }, { value: " ", label: "TredBiz Mix" }];

// export default function EmployeesView() {
//   const employeeDialogRef = useRef(null);
//   const changeManagerDialogRef = useRef(null);
//   const muiTheme = useTheme();
//   const isMobile = useMediaQuery(muiTheme.breakpoints.down("sm"));
//   const themePurple = "#8C257C";
//   const themePurpleHover = "#6d1d60";
//   const themeOrange = "#F58E35";

//   const purpleButtonSx = {
//     backgroundColor: themePurple,
//     color: "white",
//     "&:hover": {
//       backgroundColor: themePurpleHover,
//     },
//   };
//   const cancelButtonSx = {
//     color: "#757575",
//     "&:hover": {
//       backgroundColor: "rgba(0, 0, 0, 0.04)",
//     },
//   };

//   const [loading, setLoading] = useState(true);
//   const [departments, setDepartments] = useState([]);
//   const [designations, setDesignations] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [openChangeManagerForm, setOpenChangeManagerForm] = useState(false);
//   const [currentPage, setCurrentPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
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
//   const [salaryConfig, setSalaryConfig] = useState(null);

//   const [currentEmployee, setCurrentEmployee] = useState({
//     id: null,
//     firstName: "",
//     middleName: "",
//     lastName: "",
//     email: "",
//     phone: "",
//     address: "",
//     employee_id: "",
//     join_date: "",
//     status: 1,
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
//     grossSalaryYearly: "",
//     ctcMonthly: "",
//     ctcYearly: "",
//   });

//   const [openEmployeeForm, setOpenEmployeeForm] = useState(false);

//   // Initial Data Fetch
//   useEffect(() => {
//     const requests = [
//       axiosInstance.get("api/desig_dept_dropdown/"),
//       axiosInstance.get("employee-dropdown/"),
//       // Removed generic office shift fetch here to support hub-dependent logic
//       axiosInstance.get("api/countries/"),
//       axiosInstance.get("api/employee_hub/"),
//       axiosInstance.get("api/division/"),
//       axiosInstance.get("api/role_list/"),
//       axiosInstance.get("api/search_by_email_vet_talent/"),
//       axios.get("https://tdtlworld.com/hrms-backend/api/headquarters/"),
//       axios.get("https://tdtlworld.com/hrms-backend/api/payroll_setup_configuration/"),
//     ];

//     (async () => {
//       try {
//         const results = await Promise.allSettled(requests);
//         const valueAt = (index) => (results[index]?.status === "fulfilled" ? results[index].value : undefined);

//         const depts = valueAt(0);
//         const empDropdown = valueAt(1);
//         const countriesRes = valueAt(2);
//         const hubs = valueAt(3);
//         const divs = valueAt(4);
//         const rolesRes = valueAt(5);
//         const talent = valueAt(6);
//         const headquartersRes = valueAt(7);
//         const salaryConf = valueAt(8);

//         if (depts?.data) setDepartments(depts.data.dept_data ?? []);
//         if (empDropdown?.data) setAllEmployeesForDropdown(empDropdown.data ?? []);
//         if (countriesRes?.data && countriesRes.data.status === "success") setCountries(countriesRes.data.data ?? []);
//         if (divs?.data) setDivisions(divs.data ?? []);
//         if (rolesRes?.data?.status === "success") setRoles(rolesRes.data.data ?? []);
//         if (headquartersRes?.data) setHeadquarters(headquartersRes.data ?? []);
//         if (talent?.data?.data) setTalentPool(talent.data.data ?? []);

//         // Salary Config Logic
//         let configData = null;
//         if (Array.isArray(salaryConf?.data)) {
//           configData = salaryConf.data.reduce((acc, item) => {
//             if (item?.particulars) acc[item.particulars] = parseFloat(item.value) || 0;
//             return acc;
//           }, {});
//           setSalaryConfig(configData);
//         } else {
//           setSalaryConfig({ hra: 0.25, basic_plus_da: 0.6, pf_employer_contribution: 0.12, esic_employer_contribution: 0.0325 });
//         }
//       } catch (outerError) {
//         console.error("Unexpected error in fetchInitialData:", outerError);
//       }
//     })();
//   }, []);

//   const fetchEmployees = useCallback(() => {
//     setLoading(true);
//     axiosInstance
//       .get("api/employee_details/")
//       .then((response) => setEmployees(Array.isArray(response.data.data) ? response.data.data : []))
//       .catch((error) => {
//         console.error("Error fetching employees:", error);
//         setEmployees([]);
//       })
//       .finally(() => setLoading(false));
//   }, []);

//   useEffect(() => {
//     fetchEmployees();
//   }, [fetchEmployees]);

//   // --- NEW FUNCTION: Fetch Office Shifts by Hub ---
//   const fetchOfficeShifts = async (hubId) => {
//     if (!hubId) {
//       setOfficeShifts([]);
//       return [];
//     }
//     try {
//       const response = await axios.get(`https://tdtlworld.com/hrms-backend/api/office_shift_dropdown/${hubId}/`);
//       const shifts = response.data.data || response.data.office_shift_data || [];
//       setOfficeShifts(shifts);
//       return shifts; // Return for use in await calls
//     } catch (error) {
//       console.error("Error fetching office shifts:", error);
//       setOfficeShifts([]);
//       return [];
//     }
//   };

//   // CTC Calculator Effect
//   useEffect(() => {
//     if (!salaryConfig || !currentEmployee.grossSalary) {
//       setCurrentEmployee((prev) => ({ ...prev, grossSalaryYearly: "", ctcMonthly: "", ctcYearly: "" }));
//       return;
//     }

//     const parseNumberOrPercent = (v, fallback = 0) => {
//       if (v === null || v === undefined || v === "") return fallback;
//       if (typeof v === "number") return v;
//       const s = String(v).trim();
//       if (s.endsWith("%")) {
//         const num = parseFloat(s.slice(0, -1));
//         return isNaN(num) ? fallback : num / 100;
//       }
//       const n = parseFloat(s);
//       return isNaN(n) ? fallback : n;
//     };

//     const grossSalaryMonthly = parseFloat(currentEmployee.grossSalary);
//     if (isNaN(grossSalaryMonthly) || grossSalaryMonthly <= 0) {
//       setCurrentEmployee((prev) => ({ ...prev, grossSalaryYearly: "", ctcMonthly: "", ctcYearly: "" }));
//       return;
//     }

//     const hraRate = parseNumberOrPercent(salaryConfig.hra, 0.25);
//     const basicPlusDaRate = parseNumberOrPercent(salaryConfig.basic_plus_da, 0.6);
//     let pfRate = parseNumberOrPercent(salaryConfig.pf_employer_contribution, 0.12);
//     if (pfRate > 1) pfRate = pfRate / 100;
//     let esicRate = parseNumberOrPercent(salaryConfig.esic_employer_contribution, 0.0);
//     if (esicRate > 1) esicRate = esicRate / 100;

//     const grossSalaryYearly = grossSalaryMonthly * 12;
//     const hra = grossSalaryMonthly * hraRate;
//     let baseForPf = grossSalaryMonthly - hra;
//     if (baseForPf < 0) baseForPf = 0;
//     let pf_employer = baseForPf * pfRate;
//     const PF_CAP = 1800;
//     if (pf_employer > PF_CAP) pf_employer = PF_CAP;
//     const esic_applicable = grossSalaryMonthly <= 21000;
//     const esic_employer = esic_applicable ? grossSalaryMonthly * esicRate : 0;

//     let no_of_employment_year = 0;
//     const joinDateStr = currentEmployee.join_date;
//     if (joinDateStr) {
//       try {
//         const date_of_joining = new Date(joinDateStr);
//         const now = new Date();
//         if (!isNaN(date_of_joining.getTime()) && date_of_joining <= now) {
//           no_of_employment_year = (now.getTime() - date_of_joining.getTime()) / (1000 * 60 * 60 * 24 * 365.25);
//         }
//       } catch (e) {
//         no_of_employment_year = 0;
//       }
//     }
//     no_of_employment_year = Math.max(0, no_of_employment_year);

//     let gratuityMonthly = 0;
//     try {
//       const basic_plus_da_amount = grossSalaryMonthly * basicPlusDaRate;
//       const completedYears = Math.floor(no_of_employment_year);
//       if (completedYears > 5 && basic_plus_da_amount > 0) {
//         const annualGratuity = (basic_plus_da_amount * 15) / 26 * completedYears;
//         gratuityMonthly = annualGratuity / 12;
//       }
//     } catch (e) {
//       gratuityMonthly = 0;
//     }
//     gratuityMonthly = Math.max(0, gratuityMonthly);

//     const total_benefit = pf_employer + esic_employer + gratuityMonthly;
//     const ctc_monthly = grossSalaryMonthly + total_benefit;
//     const ctc_yearly = ctc_monthly * 12;

//     const round2 = (n) => Math.round((n + Number.EPSILON) * 100) / 100;

//     setCurrentEmployee((prev) => ({
//       ...prev,
//       grossSalaryYearly: round2(grossSalaryYearly).toFixed(2),
//       ctcMonthly: round2(ctc_monthly).toFixed(2),
//       ctcYearly: round2(ctc_yearly).toFixed(2),
//     }));
//   }, [currentEmployee.grossSalary, currentEmployee.join_date, salaryConfig]);

//   // Handlers
//   const handleCountryChange = (selectedCountry) => {
//     const countryId = selectedCountry ? selectedCountry.country_id : "";
//     const countryName = selectedCountry ? selectedCountry.country_name : null;
//     setCurrentEmployee((prev) => ({ ...prev, country_id: countryId, state_id: "", employee_hub_id: "", officeShift: "" }));
//     setStates([]);
//     setEmployeeHubs([]);
//     setOfficeShifts([]); // Clear shifts if country changes
//     if (countryName) {
//       axiosInstance
//         .get(`api/states/?country_name=${countryName}`)
//         .then((res) => {
//           if (res.data.status === "success") setStates(res.data.data || []);
//         })
//         .catch((err) => console.error("Error fetching states:", err));
//     }
//   };

//   const handleStateChange = (selectedState) => {
//     const stateId = selectedState ? selectedState.state_id : "";
//     setCurrentEmployee((prev) => ({ ...prev, state_id: stateId, employee_hub_id: "", officeShift: "" }));
//     setEmployeeHubs([]);
//     setOfficeShifts([]); // Clear shifts if state changes
//     if (stateId) {
//       axiosInstance
//         .get(`api/employee_hub_dropdown/${stateId}/`)
//         .then((res) => {
//           if (res.data.status === "success") setEmployeeHubs(res.data.data || []);
//         })
//         .catch((err) => console.error("Error fetching employee hubs:", err));
//     }
//   };

//   const handleDeptChange = (selectedDept) => {
//     const deptId = selectedDept ? selectedDept.dept_id : "";
//     setCurrentEmployee((prev) => ({ ...prev, department_id: deptId, designation_id: "" }));
//     if (deptId) {
//       axiosInstance
//         .get(`api/desig_dept_dropdown/?dept_id=${deptId}/`)
//         .then((res) => setDesignations(res.data.desig_data || []))
//         .catch((err) => console.error("Error fetching designations:", err));
//     } else {
//       setDesignations([]);
//     }
//   };

//   const handleDivisionChange = (selectedDivision) => {
//     const divisionId = selectedDivision ? selectedDivision.division_id : "";
//     if (selectedDivision && selectedDivision.division_name !== "Livestock") {
//       setCurrentEmployee((prev) => ({ ...prev, division_id: divisionId, subDivision: "" }));
//     } else {
//       setCurrentEmployee((prev) => ({ ...prev, division_id: divisionId }));
//     }
//   };

//   const handleChangeManager = async () => {
//     if (!selectedEmployeeForManagerChange || !newManager) {
//       Swal.fire({ icon: "warning", title: "Incomplete Selection", text: "Please select an employee and a new manager.", target: changeManagerDialogRef.current });
//       return;
//     }
//     try {
//       await axiosInstance.put("api/change_manager/", { user_id: selectedEmployeeForManagerChange, manager_id: newManager });
//       await fetchEmployees();
//       Swal.fire({ icon: "success", title: "Success", text: "Manager changed successfully!", timer: 3000, showConfirmButton: false });
//       setOpenChangeManagerForm(false);
//       setSelectedEmployeeForManagerChange("");
//       setNewManager("");
//     } catch (error) {
//       console.error("Error changing manager:", error);
//       Swal.fire({ icon: "error", title: "Operation Failed", text: `Error changing manager: ${error.response?.data?.message || "An error occurred."}`, target: changeManagerDialogRef.current });
//     }
//   };

//   const navigate = useNavigate();
//   const handleArrowClick = (id) => navigate(`/hrms/admindashboard/employeedetail/${id}`);

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setCurrentEmployee((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleAddEmployee = async () => {
//     try {
//       const maxIdResponse = await axios.get("https://tdtlworld.com/hrms-backend/api/get_max_employee_id/");
//       const newEmpId = maxIdResponse.data.employee_id;
//       setCurrentEmployee({
//         emp_id: newEmpId,
//         firstName: "",
//         middleName: "",
//         lastName: "",
//         email: "",
//         phone: "",
//         address: "",
//         avatar: null,
//         officeShift: "",
//         status: 1,
//         join_date: "",
//         gender: "",
//         username: newEmpId,
//         password: "",
//         role: "",
//         grossSalary: "",
//         department_id: "",
//         designation_id: "",
//         manager_id: "",
//         country_id: "",
//         state_id: "",
//         employee_hub_id: "",
//         headquarter_id: "",
//         division_id: "",
//         company_id: 2,
//         is_probation: "n",
//         resumeUrl: "",
//         subDivision: "",
//         grossSalaryYearly: "",
//         ctcMonthly: "",
//         ctcYearly: "",
//         employee_id: "",
//       });
//       setDesignations([]);
//       setStates([]);
//       setEmployeeHubs([]);
//       setOfficeShifts([]); // Reset shifts
//       setEmployeeDocuments(null);
//       setIsEditMode(false);
//       setShowPassword(false);
//       setOpenEmployeeForm(true);
//     } catch (error) {
//       console.error("Error fetching max employee ID:", error);
//       Swal.fire({ icon: "error", title: "Error", text: "Failed to initialize employee form.", timer: 3000, showConfirmButton: false });
//     }
//   };

//   const handleTalentSelect = async (event, selectedOption) => {
//     setEmployeeDocuments(null);
//     setCurrentEmployee((prev) => ({ ...prev, resumeUrl: "" }));
//     setOfficeShifts([]); // Reset shifts on new talent select

//     if (!selectedOption) {
//       setCurrentEmployee((prev) => ({ ...prev, firstName: "", middleName: "", lastName: "", email: "", phone: "", gender: "", country_id: "", state_id: "", officeShift: "" }));
//       return;
//     }
//     const talent = talentPool.find((p) => p.email === selectedOption.email);
//     if (!talent) return;
//     const selectedCountry = countries.find((c) => c.country_name === talent.country);
//     const resumeLink = talent.resume ? `${RESUME_BASE_URL}${talent.resume}` : "";
//     setCurrentEmployee((prev) => ({
//       ...prev,
//       firstName: talent.first_name || "",
//       middleName: talent.middle_name || "",
//       lastName: talent.last_name || "",
//       email: talent.email || "",
//       phone: talent.phone || "",
//       gender: talent.gender || "",
//       address: talent.address || "", 
//       country_id: selectedCountry ? selectedCountry.country_id : "",
//       state_id: "",
//       employee_hub_id: "",
//       officeShift: "", // Reset
//       resumeUrl: resumeLink,
//     }));
    
//     if (selectedCountry) {
//         try {
//           const statesRes = await axiosInstance.get(`api/states/?country_name=${selectedCountry.country_name}`);
//           if (statesRes.data.status === "success") {
//             const fetchedStates = statesRes.data.data || [];
//             setStates(fetchedStates);
//             const selectedState = fetchedStates.find((s) => s.state_name === talent.state);
//             if (selectedState) {
//               setCurrentEmployee((prev) => ({ ...prev, state_id: selectedState.state_id }));
//               const hubsRes = await axiosInstance.get(`api/employee_hub_dropdown/${selectedState.state_id}/`);
//               if (hubsRes.data.status === "success") setEmployeeHubs(hubsRes.data.data || []);
//             }
//           }
//         } catch (err) { console.error(err); }
//     }
//     setIsFetchingDocs(true);
//     try {
//       const docResponse = await axios.post("https://raasbackend.vetrinahealthcare.com/fetch_documents/", { email_id: talent.email });
//       setEmployeeDocuments(docResponse.data.status === "success" && docResponse.data.documents ? docResponse.data.documents : null);
//     } catch (error) {
//       console.error("Error fetching documents:", error);
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
//         Swal.fire({ icon: "error", title: "Error", text: "Failed to load employee details.", timer: 3000, showConfirmButton: false });
//         return;
//       }
//       const empData = response.data.data[0];
      
//       // Fetch dependencies
//       const [desigRes, statesRes, hubsRes] = await Promise.all([
//         axiosInstance.get(`api/desig_dept_dropdown/?dept_id=${empData.department_id}/`),
//         empData.country_name ? axiosInstance.get(`api/states/?country_name=${empData.country_name}`) : Promise.resolve({ data: { data: [] } }),
//         empData.state ? axiosInstance.get(`api/employee_hub_dropdown/${empData.state}/`) : Promise.resolve({ data: { data: [] } }),
//       ]);

//       setDesignations(desigRes.data.desig_data || []);
//       setStates(statesRes.data.data || []);
//       setEmployeeHubs(hubsRes.data.data || []);

//       // Fetch Office Shifts specifically for this user's Hub
//       let validOfficeShifts = [];
//       if (empData.employee_hub_id) {
//           validOfficeShifts = await fetchOfficeShifts(empData.employee_hub_id);
//       } else {
//           setOfficeShifts([]);
//       }

//       const officeShiftObj = validOfficeShifts.find((s) => s.office_shift_name === empData.office_shift);
//       const nameParts = (empData.emp_name || "").split(" ");
//       const selectedCountry = countries.find((c) => c.country_name === empData.country_name);
//       const selectedHeadquarter = headquarters.find((hq) => hq.headquarter_name === empData.headquarter);
//       let finalSubDivisionValue = empData.sub_division || "";
//       if (finalSubDivisionValue === "Tred") finalSubDivisionValue = "TredBiz";

//       setCurrentEmployee({
//         id: employee.user_id,
//         firstName: nameParts[0] || "",
//         middleName: nameParts.length > 2 ? nameParts.slice(1, -1).join(" ") : "",
//         lastName: nameParts.length > 1 ? nameParts[nameParts.length - 1] : "",
//         email: empData.email || "",
//         employee_id: empData.employee_id || "",
//         phone: empData.phone || "",
//         address: empData.address || "",
//         manager_id: empData.manager_id ? Number(empData.manager_id) : "",
//         designation_id: empData.designation_id ? Number(empData.designation_id) : "",
//         department_id: empData.department_id ? Number(empData.department_id) : "",
//         headquarter_id: selectedHeadquarter ? selectedHeadquarter.headquarter_id : "",
//         subDivision: finalSubDivisionValue,
//         division_id: empData.division_id ? Number(empData.division_id) : "",
//         state_id: empData.state ? Number(empData.state) : "",
//         employee_hub_id: empData.employee_hub_id ? Number(empData.employee_hub_id) : "",
//         role: empData.role_id ? Number(empData.role_id) : "",
//         officeShift: officeShiftObj ? Number(officeShiftObj.office_shift_id) : "",
//         status: Number(empData.status),
//         join_date: empData.join_date ? empData.join_date.split(" ")[0] : "",
//         country_id: selectedCountry ? Number(selectedCountry.country_id) : "",
//         avatar: empData.profile_photo || "",
//         is_probation: empData.probation?.toLowerCase() === "y" ? "y" : "n",
//         resumeUrl: "",
//       });
//       setIsEditMode(true);
//       setOpenEmployeeForm(true);
//       setShowPassword(false);
//     } catch (error) {
//       console.error("Error fetching employee details for edit:", error);
//       Swal.fire({ icon: "error", title: "Error", text: "Failed to fetch complete employee details.", timer: 3000, showConfirmButton: false });
//     }
//   };

//   const handleSaveEmployee = async () => {
//     if (!isEditMode) {
//       const requiredFields = {
//         firstName: "First Name",
//         lastName: "Last Name",
//         email: "Email",
//         phone: "Mobile Number",
//         country_id: "Country",
//         state_id: "State",
//         role: "User (Role)",
//         department_id: "Department",
//         division_id: "Division",
//         designation_id: "Designation",
//         headquarter_id: "Headquarter",
//         manager_id: "Line Manager",
//         employee_hub_id: "Holiday Hub",
//         officeShift: "Shift & Scheduling",
//         join_date: "Join Date",
//         avatar: "Photo",
//         gender: "Gender",
//         username: "Username",
//         password: "Password",
//         grossSalary: "Gross Salary",
//       };
      
//       const selectedDivision = divisions.find((d) => d.division_id == currentEmployee.division_id);
//       if (selectedDivision && selectedDivision.division_name === "Livestock" && !currentEmployee.subDivision) {
//         Swal.fire({ icon: "error", title: "Validation Error", text: "Sub Division is required when Division is Livestock.", target: employeeDialogRef.current });
//         return;
//       }
      
//       for (const field in requiredFields) {
//         if (!currentEmployee[field]) {
//           Swal.fire({ icon: "error", title: "Validation Error", text: `The field "${requiredFields[field]}" is required.`, target: employeeDialogRef.current });
//           return;
//         }
//       }
//     }
    
//     const formData = new FormData();
//     const keyMap = {
//       firstName: "first_name",
//       middleName: "middle_name",
//       lastName: "last_name",
//       officeShift: "office_shift",
//       join_date: "join_date",
//       grossSalary: "gross_salary",
//       headquarter_id: "headquarter_id",
//       grossSalaryYearly: "gross_salary_yearly",
//       ctcMonthly: "ctc_monthly",
//       ctcYearly: "ctc_yearly",
//       address: "address",
//     };
//     Object.keys(currentEmployee).forEach((key) => {
//       if (key === "avatar" && currentEmployee.avatar instanceof File) {
//         formData.append("file", currentEmployee.avatar);
//       } else if (key !== "resumeUrl" && currentEmployee[key] !== null && currentEmployee[key] !== undefined && currentEmployee[key] !== "") {
//         const backendKey = keyMap[key] || key;
//         formData.append(backendKey, currentEmployee[key]);
//       }
//     });
    
//     setIsSaving(true);
//     try {
//       const action = isEditMode ? "updated" : "added";
//       if (isEditMode) {
//         formData.append("user_id", currentEmployee.id);
//         await axiosInstance.put("api/edit_employee/", formData, { headers: { "Content-Type": "multipart/form-data" } });
//       } else {
//         await axiosInstance.post("api/add_employee/", formData, { headers: { "Content-Type": "multipart/form-data" } });
//       }
//       setOpenEmployeeForm(false);
//       await fetchEmployees();
//       Swal.fire({ icon: "success", title: "Success", text: `Employee ${action} successfully!`, timer: 3000, showConfirmButton: false });
//     } catch (error) {
//       console.error("Error saving employee:", error);
//       const errorMessage = error.response?.data?.message || error.response?.data?.detail || "An unexpected error occurred.";
//       Swal.fire({ icon: "error", title: "Operation failed", text: `${errorMessage}`, target: employeeDialogRef.current });
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   const handleDeleteEmployee = (employeeId) => {
//     if (!employeeId) return;
//     Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: themePurple,
//       cancelButtonColor: themeOrange,
//       confirmButtonText: "Yes, delete it!",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         axiosInstance
//           .delete("api/edit_employee/", { data: { user_id: employeeId } })
//           .then(() => {
//             fetchEmployees();
//             Swal.fire({ icon: "success", title: "Deleted!", text: "The employee has been deleted.", timer: 3000, showConfirmButton: false });
//           })
//           .catch((error) => {
//             const errorMessage = error.response?.data?.message || error.response?.data?.detail || "Failed to delete employee.";
//             Swal.fire({ icon: "error", title: "Error", text: errorMessage, timer: 3000, showConfirmButton: false });
//           });
//       }
//     });
//   };

//   const handleExportEmployees = () => {
//     if (employees.length === 0) {
//       Swal.fire({ icon: "info", title: "Info", text: "There is no employee data to export.", timer: 3000, showConfirmButton: false });
//       return;
//     }
//     const worksheet = XLSX.utils.json_to_sheet(employees);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Employees");
//     XLSX.writeFile(workbook, "EmployeesData.xlsx");
//   };

//   const sortedEmployees = useMemo(() => {
//     if (!Array.isArray(employees)) return [];
//     return [...employees].sort((a, b) => b.user_id - a.user_id);
//   }, [employees]);

//   const filteredEmployees = useMemo(
//     () =>
//       sortedEmployees.filter(
//         (e) =>
//           (e.employee_name && e.employee_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
//           (e.department_name && e.department_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
//           (e.designation_name && e.designation_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
//           (e.join_date && e.join_date.toLowerCase().includes(searchTerm.toLowerCase())) ||
//           (e.manager && e.manager.toLowerCase().includes(searchTerm.toLowerCase()))
//       ),
//     [sortedEmployees, searchTerm]
//   );

//   const handlePaginationChange = (event, newPage) => setCurrentPage(newPage - 1);
//   const handleRowsPerPageChange = (event) => { setRowsPerPage(parseInt(event.target.value, 10)); setCurrentPage(0); };
//   const handleFileUpload = (e) => { const file = e.target.files[0]; if (file) setCurrentEmployee((prev) => ({ ...prev, avatar: file })); };

//   const isSubDivisionDisabled = useMemo(() => {
//     if (!currentEmployee.division_id) return true;
//     const selectedDivision = divisions.find((d) => d.division_id == currentEmployee.division_id);
//     return !selectedDivision || selectedDivision.division_name !== "Livestock";
//   }, [currentEmployee.division_id, divisions]);

//   const formatDate = (dateString) => {
//     if (!dateString) return "";
//     try {
//       const date = new Date(dateString);
//       return `${String(date.getDate()).padStart(2, "0")}/${String(date.getMonth() + 1).padStart(2, "0")}/${date.getFullYear()}`;
//     } catch (error) {
//       return dateString.split(" ")[0];
//     }
//   };

//   return (
//     <Box component={Paper} p={3}>
//       <Typography variant="h4" sx={{ color: themePurple, fontWeight: "bold", mb: 5 }}>
//         Employees List
//       </Typography>
//       <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: isMobile ? "column" : "row", gap: 2, mb: 2 }}>
//         <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
//           <Button variant="contained" startIcon={<AddIcon />} onClick={handleAddEmployee} sx={purpleButtonSx}>Add Employee</Button>
//           <Button variant="contained" startIcon={<DownloadIcon />} onClick={handleExportEmployees} sx={purpleButtonSx}>Export</Button>
//           <Button variant="contained" startIcon={<ChangeManagerIcon />} onClick={() => setOpenChangeManagerForm(true)} sx={purpleButtonSx}>Change Manager</Button>
//         </Box>
//         <TextField size="small" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} sx={{ width: isMobile ? "100%" : "auto" }} InputProps={{ startAdornment: (<InputAdornment position="start"><SearchIcon /></InputAdornment>) }} />
//       </Box>

//       {/* Change Manager Dialog */}
//       <Dialog open={openChangeManagerForm} onClose={() => setOpenChangeManagerForm(false)} maxWidth="sm" fullWidth ref={changeManagerDialogRef}>
//         <DialogTitle sx={{ color: themePurple, fontWeight: "bold" }}>
//           Change Manager
//           <IconButton onClick={() => setOpenChangeManagerForm(false)} sx={{ position: "absolute", right: 8, top: 8, color: "grey.500" }}><CloseIcon /></IconButton>
//         </DialogTitle>
//         <DialogContent>
//           <Grid container spacing={2} sx={{ mt: 1 }}>
//             <Grid item xs={12}>
//               <FormControl fullWidth>
//                 <InputLabel>Select Employee</InputLabel>
//                 <Select value={selectedEmployeeForManagerChange} onChange={(e) => setSelectedEmployeeForManagerChange(e.target.value)} label="Select Employee">
//                   {allEmployeesForDropdown.map((emp) => (<MenuItem key={emp.value} value={emp.value}>{`${emp.label} (${emp.emp_id})`}</MenuItem>))}
//                 </Select>
//               </FormControl>
//             </Grid>
//             <Grid item xs={12}>
//               <FormControl fullWidth>
//                 <InputLabel>Select New Manager</InputLabel>
//                 <Select value={newManager} onChange={(e) => setNewManager(e.target.value)} label="Select New Manager">
//                   {allEmployeesForDropdown.map((emp) => (<MenuItem key={emp.value} value={emp.value}>{`${emp.label} (${emp.emp_id})`}</MenuItem>))}
//                 </Select>
//               </FormControl>
//             </Grid>
//           </Grid>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setOpenChangeManagerForm(false)} sx={cancelButtonSx}>Cancel</Button>
//           <Button onClick={handleChangeManager} variant="contained" sx={purpleButtonSx}>Save</Button>
//         </DialogActions>
//       </Dialog>

//       {/* Main Employee Form Dialog */}
//       <Dialog open={openEmployeeForm} onClose={() => setOpenEmployeeForm(false)} maxWidth="md" fullWidth ref={employeeDialogRef}>
//         <DialogTitle sx={{ color: "#8C257C ", fontWeight: "bold", fontSize: "2rem" }}>
//           {isEditMode ? "Edit Employee" : "Add Employee"}
//           <IconButton onClick={() => setOpenEmployeeForm(false)} sx={{ position: "absolute", right: 8, top: 8, color: "grey.500" }}><CloseIcon /></IconButton>
//         </DialogTitle>
//         <DialogContent>
//           <Grid container spacing={2} sx={{ mt: 1 }}>
//             {!isEditMode && (
//               <Grid item xs={12}>
//                 <Autocomplete
//                   options={talentPool}
//                   getOptionLabel={(option) => option.email || ""}
//                   onChange={handleTalentSelect}
//                   onInputChange={(event, newInputValue) => { if (!talentPool.find((p) => p.email === newInputValue)) setCurrentEmployee((prev) => ({ ...prev, email: newInputValue })); }}
//                   renderInput={(params) => <TextField {...params} label="Search Email to Auto-fill" />}
//                 />
//               </Grid>
//             )}

//             {/* 1. Name */}
//             <Grid item xs={12} sm={4}>
//               <TextField fullWidth label="First Name" name="firstName" value={currentEmployee.firstName || ""} onChange={handleInputChange} onKeyPress={(e) => { if (!/^[A-Za-z]$/.test(e.key)) e.preventDefault(); }} InputProps={{ readOnly: isEditMode }} />
//             </Grid>
//             <Grid item xs={12} sm={4}>
//               <TextField fullWidth label="Middle Name" name="middleName" value={currentEmployee.middleName || ""} onChange={handleInputChange} onKeyPress={(e) => { if (!/^[A-Za-z]$/.test(e.key)) e.preventDefault(); }} InputProps={{ readOnly: isEditMode }} />
//             </Grid>
//             <Grid item xs={12} sm={4}>
//               <TextField fullWidth label="Last Name" name="lastName" value={currentEmployee.lastName || ""} onChange={handleInputChange} onKeyPress={(e) => { if (!/^[A-Za-z]$/.test(e.key)) e.preventDefault(); }} InputProps={{ readOnly: isEditMode }} />
//             </Grid>

//             {/* 2. Email */}
//             <Grid item xs={12} sm={6}>
//               <TextField fullWidth label="Email" name="email" value={currentEmployee.email || ""} onChange={handleInputChange} InputProps={{ readOnly: isEditMode || !!talentPool.find((p) => p.email === currentEmployee.email) }} />
//             </Grid>

//             {/* 3. Mobile Number */}
//             <Grid item xs={12} sm={6}>
//               <TextField fullWidth label="Mobile Number" name="phone" value={currentEmployee.phone || ""} onChange={(e) => { const value = e.target.value; if (/^\d{0,10}$/.test(value)) handleInputChange(e); }} inputProps={{ maxLength: 10, inputMode: "numeric", pattern: "[0-9]*" }} InputProps={{ readOnly: isEditMode }} />
//             </Grid>

//             {/* 4. Address */}
//             <Grid item xs={12}>
//                 <TextField fullWidth label="Address" name="address" value={currentEmployee.address || ""} onChange={handleInputChange} />
//             </Grid>

//             {/* 5. Country */}
//             <Grid item xs={12} sm={6}>
//               <Autocomplete options={countries} getOptionLabel={(option) => option.country_name || ""} value={countries.find((c) => c.country_id == currentEmployee.country_id) || null} onChange={(e, nv) => handleCountryChange(nv)} isOptionEqualToValue={(option, value) => option.country_id == value.country_id} renderInput={(params) => <TextField {...params} label="Country" />} />
//             </Grid>

//             {/* 6. State */}
//             <Grid item xs={12} sm={6}>
//               <Autocomplete options={states} getOptionLabel={(option) => option.state_name || ""} value={states.find((s) => s.state_id == currentEmployee.state_id) || null} onChange={(e, nv) => handleStateChange(nv)} isOptionEqualToValue={(option, value) => option.state_id == value.state_id} disabled={!currentEmployee.country_id} renderInput={(params) => <TextField {...params} label="State" />} />
//             </Grid>

//             {/* 7. User (role) */}
//             <Grid item xs={12} sm={6}>
//                <Autocomplete options={roles} getOptionLabel={(option) => option.role_name || ""} value={roles.find((r) => r.index == currentEmployee.role) || null} onChange={(e, nv) => setCurrentEmployee((prev) => ({ ...prev, role: nv ? nv.index : "" }))} isOptionEqualToValue={(option, value) => option.index == value.index} renderInput={(params) => <TextField {...params} label="User (Role)" />} />
//             </Grid>

//             {/* 8. Department */}
//             <Grid item xs={12} sm={6}>
//               <Autocomplete options={departments} getOptionLabel={(option) => option.dept_name || ""} value={departments.find((d) => d.dept_id == currentEmployee.department_id) || null} onChange={(e, nv) => handleDeptChange(nv)} isOptionEqualToValue={(option, value) => option.dept_id == value.dept_id} renderInput={(params) => <TextField {...params} label="Department" />} />
//             </Grid>

//             {/* 9. Division */}
//             <Grid item xs={12} sm={6}>
//               <Autocomplete options={divisions} getOptionLabel={(option) => option.division_name || ""} value={divisions.find((d) => d.division_id == currentEmployee.division_id) || null} onChange={(e, nv) => handleDivisionChange(nv)} isOptionEqualToValue={(option, value) => option.division_id == value.division_id} renderInput={(params) => <TextField {...params} label="Division" />} />
//             </Grid>

//             {/* 10. Sub-division */}
//             <Grid item xs={12} sm={6}>
//               <Autocomplete options={subDivisionOptions} getOptionLabel={(option) => option.label || ""} value={subDivisionOptions.find((sd) => sd.value === currentEmployee.subDivision) || null} onChange={(e, nv) => setCurrentEmployee((prev) => ({ ...prev, subDivision: nv ? nv.value : "" }))} isOptionEqualToValue={(option, value) => option.value === value.value} disabled={isSubDivisionDisabled} renderInput={(params) => <TextField {...params} label="Sub-division" />} />
//             </Grid>

//             {/* 11. Designation */}
//             <Grid item xs={12} sm={6}>
//               <Autocomplete options={designations} getOptionLabel={(option) => option.desig_name || ""} value={designations.find((d) => d.desig_id == currentEmployee.designation_id) || null} onChange={(e, nv) => setCurrentEmployee((prev) => ({ ...prev, designation_id: nv ? nv.desig_id : "" }))} isOptionEqualToValue={(option, value) => option.desig_id == value.desig_id} disabled={!currentEmployee.department_id} renderInput={(params) => <TextField {...params} label="Designation" />} />
//             </Grid>

//             {/* 12. Headquarter */}
//             <Grid item xs={12} sm={6}>
//               <Autocomplete options={headquarters} getOptionLabel={(option) => option.headquarter_name || ""} value={headquarters.find((h) => h.headquarter_id == currentEmployee.headquarter_id) || null} onChange={(e, nv) => setCurrentEmployee((prev) => ({ ...prev, headquarter_id: nv ? nv.headquarter_id : "" }))} isOptionEqualToValue={(option, value) => option.headquarter_id == value.headquarter_id} renderInput={(params) => <TextField {...params} label="Headquarter" />} />
//             </Grid>

//             {/* 13. Line Manager */}
//             <Grid item xs={12} sm={12}>
//               <Autocomplete 
//                 options={allEmployeesForDropdown} 
//                 getOptionLabel={(option) => (option.label ? `${option.label} (${option.emp_id})` : "")} 
//                 value={allEmployeesForDropdown.find((e) => e.value == currentEmployee.manager_id) || null} 
//                 onChange={(e, nv) => setCurrentEmployee((prev) => ({ ...prev, manager_id: nv ? nv.value : "" }))} 
//                 isOptionEqualToValue={(option, value) => option.value == value.value} 
//                 renderInput={(params) => <TextField {...params} label="Line Manager (Select designation of line manager with division subdivision-HQ)" />} 
//               />
//             </Grid>

//             {/* 14. Holiday Hub (Updates Shifts on Selection) */}
//             <Grid item xs={12} sm={6}>
//               <Autocomplete 
//                 options={employeeHubs} 
//                 getOptionLabel={(option) => option.employee_hub_name || ""} 
//                 value={employeeHubs.find((h) => h.employee_hub_id == currentEmployee.employee_hub_id) || null} 
//                 onChange={async (e, nv) => {
//                    const hubId = nv ? nv.employee_hub_id : "";
//                    setCurrentEmployee((prev) => ({ ...prev, employee_hub_id: hubId, officeShift: "" })); // Reset shift on hub change
//                    await fetchOfficeShifts(hubId);
//                 }} 
//                 isOptionEqualToValue={(option, value) => option.employee_hub_id == value.employee_hub_id} 
//                 disabled={!currentEmployee.state_id} 
//                 renderInput={(params) => <TextField {...params} label="Holiday Hub" />} 
//               />
//             </Grid>

//             {/* 15. Shift & Scheduling (Dependent on Hub) */}
//             <Grid item xs={12} sm={6}>
//               <Autocomplete 
//                 options={officeShifts} 
//                 getOptionLabel={(option) => option.office_shift_name || ""} 
//                 value={officeShifts.find((s) => s.office_shift_id == currentEmployee.officeShift) || null} 
//                 onChange={(e, nv) => setCurrentEmployee((prev) => ({ ...prev, officeShift: nv ? nv.office_shift_id : "" }))} 
//                 isOptionEqualToValue={(option, value) => option.office_shift_id == value.office_shift_id} 
//                 disabled={!currentEmployee.employee_hub_id || officeShifts.length === 0} // Disabled if no hub or no shifts found
//                 renderInput={(params) => <TextField {...params} label="Shift & Scheduling" />} 
//               />
//             </Grid>

//             {isEditMode && (
//               <Grid item xs={12} sm={6}>
//                 <TextField fullWidth label="Employee ID" name="employee_id" value={currentEmployee.employee_id || ""} InputProps={{ readOnly: true }} />
//               </Grid>
//             )}

//             <Grid item xs={12} sm={6}>
//               <Autocomplete options={statusOptions} getOptionLabel={(option) => option.label} value={statusOptions.find((s) => s.value === currentEmployee.status) || null} onChange={(e, nv) => setCurrentEmployee((prev) => ({ ...prev, status: nv ? nv.value : 1 }))} isOptionEqualToValue={(option, value) => option.value === value.value} renderInput={(params) => <TextField {...params} label="Status" />} />
//             </Grid>

//             <Grid item xs={12} sm={6}>
//               <Autocomplete options={probationOptions} getOptionLabel={(option) => option.label} value={probationOptions.find((p) => p.value === currentEmployee.is_probation) || null} onChange={(e, nv) => setCurrentEmployee((prev) => ({ ...prev, is_probation: nv ? nv.value : "n" }))} isOptionEqualToValue={(option, value) => option.value === value.value} renderInput={(params) => <TextField {...params} label="On Probation" />} />
//             </Grid>

//             <Grid item xs={12} sm={6}>
//               <TextField fullWidth label="Join Date" name="join_date" type="date" value={currentEmployee.join_date || ""} onChange={handleInputChange} InputLabelProps={{ shrink: true }} />
//             </Grid>

//             <Grid item xs={12} sm={6}>
//               <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
//                 <Button variant="contained" component="label" disabled={isEditMode} sx={purpleButtonSx}>
//                   Upload Photo
//                   <input type="file" hidden accept="image/*" onChange={handleFileUpload} />
//                 </Button>
//                 {currentEmployee.avatar && <Avatar src={typeof currentEmployee.avatar === "string" ? currentEmployee.avatar : URL.createObjectURL(currentEmployee.avatar)} sx={{ width: 56, height: 56 }} />}
//               </Box>
//             </Grid>

//             <Grid item xs={12}>
//               {isFetchingDocs && <CircularProgress />}
//               {employeeDocuments && !isFetchingDocs && (
//                 <Box>
//                   <Typography variant="subtitle1" gutterBottom>Fetched Documents</Typography>
//                   <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
//                     {Object.entries(employeeDocuments).map(([name, url]) =>
//                       url ? <Chip key={name} label={name.replace(/_/g, " ")} component="a" href={url} target="_blank" clickable icon={<LinkIcon />} variant="outlined" color="secondary" size="small" /> : null
//                     )}
//                   </Box>
//                 </Box>
//               )}
//             </Grid>

//             {!isEditMode && (
//               <>
//                 <Grid item xs={12} sm={6}>
//                   <Autocomplete options={genderOptions} getOptionLabel={(option) => option.label} value={genderOptions.find((g) => g.value === currentEmployee.gender) || null} onChange={(e, nv) => setCurrentEmployee((prev) => ({ ...prev, gender: nv ? nv.value : "" }))} isOptionEqualToValue={(option, value) => option.value === value.value} renderInput={(params) => <TextField {...params} label="Gender" />} />
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <TextField fullWidth label="Username" name="username" value={currentEmployee.username || ""} onChange={handleInputChange} InputProps={{ readOnly: true }} />
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <TextField fullWidth label="Password" name="password" value={currentEmployee.password || ""} onChange={handleInputChange} type={showPassword ? "text" : "password"} InputProps={{ endAdornment: (<InputAdornment position="end"> <IconButton aria-label="toggle password visibility" onClick={() => setShowPassword((prev) => !prev)} onMouseDown={(e) => e.preventDefault()} edge="end"> {showPassword ? <VisibilityOff /> : <Visibility />} </IconButton> </InputAdornment>) }} />
//                 </Grid>
                
//                 {/* Gross Salary Block */}
//                 <Grid item xs={12} sm={6} md={3}>
//                   <TextField fullWidth label="Gross Salary monthly" name="grossSalary" type="number" value={currentEmployee.grossSalary || ""} onChange={(e) => { const value = e.target.value; if (/^\d*\.?\d*$/.test(value)) handleInputChange(e); }} />
//                 </Grid>
//                 <Grid item xs={12} sm={6} md={3}>
//                   <TextField fullWidth label="Gross Salary Yearly" name="grossSalaryYearly" type="number" value={currentEmployee.grossSalaryYearly || ""} InputProps={{ readOnly: true }} />
//                 </Grid>
//                 <Grid item xs={12} sm={6} md={3}>
//                   <TextField fullWidth label="CTC Monthly" name="ctcMonthly" type="number" value={currentEmployee.ctcMonthly || ""} InputProps={{ readOnly: true }} />
//                 </Grid>
//                 <Grid item xs={12} sm={6} md={3}>
//                   <TextField fullWidth label="CTC Yearly" name="ctcYearly" type="number" value={currentEmployee.ctcYearly || ""} InputProps={{ readOnly: true }} />
//                 </Grid>
//               </>
//             )}
//           </Grid>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setOpenEmployeeForm(false)} disabled={isSaving} sx={cancelButtonSx}>Cancel</Button>
//           <Button onClick={handleSaveEmployee} variant="contained" disabled={isSaving} sx={purpleButtonSx}>{isSaving ? <CircularProgress size={24} color="inherit" /> : "Save"}</Button>
//         </DialogActions>
//       </Dialog>

//       <TableContainer>
//         <Table sx={{ minWidth: "100%", whiteSpace: "nowrap" }}>
//           <TableHead>
//             <TableRow sx={{ bgcolor: themePurple }}>
//               <TableCell sx={{ fontWeight: "bold", color: "white" }}>SR. NO.</TableCell>
//               <TableCell sx={{ fontWeight: "bold", color: "white" }}>EMPLOYEE</TableCell>
//               <TableCell sx={{ color: "white" }}></TableCell>
//               <TableCell sx={{ fontWeight: "bold", color: "white" }}>DEPARTMENT</TableCell>
//               <TableCell sx={{ fontWeight: "bold", color: "white" }}>DESIGNATION</TableCell>
//               <TableCell sx={{ fontWeight: "bold", color: "white" }}>JOIN DATE</TableCell>
//               <TableCell sx={{ fontWeight: "bold", color: "white" }}>STATUS</TableCell>
//               <TableCell sx={{ fontWeight: "bold", color: "white" }}>MANAGER</TableCell>
//               <TableCell sx={{ fontWeight: "bold", textAlign: "center", color: "white" }}>ACTIONS</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {loading ? (
//               Array.from(new Array(rowsPerPage)).map((_, index) => (
//                 <TableRow key={index}><TableCell colSpan={9}><Skeleton animation="wave" /></TableCell></TableRow>
//               ))
//             ) : (
//               (rowsPerPage > 0 ? filteredEmployees.slice(currentPage * rowsPerPage, currentPage * rowsPerPage + rowsPerPage) : filteredEmployees).map((employee, index) => (
//                 <TableRow key={employee.user_id} sx={{ "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.04)" } }} onMouseEnter={() => setHoveredRowId(employee.user_id)} onMouseLeave={() => setHoveredRowId(null)}>
//                   <TableCell sx={{ fontSize: "0.95rem" }}>{currentPage * rowsPerPage + index + 1}</TableCell>
//                   <TableCell sx={{ fontSize: "0.95rem" }}>{employee.employee_name}</TableCell>
//                   <TableCell sx={{ padding: "0 8px", textAlign: "center" }}>{hoveredRowId === employee.user_id && (<IconButton onClick={() => handleArrowClick(employee.user_id)} size="small" sx={{ color: themeOrange }}><ArrowForwardIcon fontSize="small" /></IconButton>)}</TableCell>
//                   <TableCell sx={{ fontSize: "0.95rem" }}>{employee.department_name || "N/A"}</TableCell>
//                   <TableCell sx={{ fontSize: "0.95rem" }}>{employee.designation_name || "N/A"}</TableCell>
//                   <TableCell sx={{ fontSize: "0.95rem" }}>{formatDate(employee.join_date)}</TableCell>
//                   <TableCell sx={{ fontSize: "0.95rem" }}><Chip label={employee.status === 1 ? "Active" : "Inactive"} size="small" sx={{ bgcolor: employee.status === 1 ? "#4caf50" : themeOrange, color: "white", borderRadius: "16px", height: "24px" }} /></TableCell>
//                   <TableCell sx={{ fontSize: "0.95rem" }}>{employee.manager}</TableCell>
//                   <TableCell><Box display="flex" justifyContent="center" gap={0.5}><IconButton onClick={() => handleEditEmployee(employee)} sx={{ color: themePurple }}><EditIcon /></IconButton><IconButton onClick={() => handleDeleteEmployee(employee.user_id)} sx={{ color: themeOrange }}><DeleteIcon /></IconButton></Box></TableCell>
//                 </TableRow>
//               ))
//             )}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       <Box sx={{ p: 2, borderTop: "1px solid rgba(224, 224, 224, 1)" }}>
//         {!loading && (
//           <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 2 }}>
//             <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
//               <FormControl variant="outlined" size="small">
//                 <Select value={rowsPerPage} onChange={handleRowsPerPageChange} sx={{ backgroundColor: themePurple, color: "white", borderRadius: "4px", "&:hover": { backgroundColor: themePurpleHover }, "& .MuiOutlinedInput-notchedOutline": { border: "none" }, "& .MuiSvgIcon-root": { color: "white" } }}>
//                   {[10, 25, 50, 100].map((value) => (<MenuItem key={value} value={value}>{value}</MenuItem>))}
//                 </Select>
//               </FormControl>
//               <Typography variant="body2" color="text.secondary">{`1 to ${Math.min(rowsPerPage, filteredEmployees.length)} of ${filteredEmployees.length}`}</Typography>
//             </Box>
//             <Pagination count={Math.ceil(filteredEmployees.length / rowsPerPage)} page={currentPage + 1} onChange={handlePaginationChange} showFirstButton showLastButton sx={{ "& .MuiPaginationItem-root": { borderRadius: "4px" }, "& .MuiPaginationItem-page.Mui-selected": { backgroundColor: themePurple, color: "white" } }} />
//           </Box>
//         )}
//       </Box>
//     </Box>
//   );
// }


import React, { useState, useEffect, useMemo, useCallback, useRef } from "react";
import axios from "axios";
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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Avatar,
  Chip,
  IconButton,
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
  Pagination,
  Divider,
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
import Swal from "sweetalert2";

const RESUME_BASE_URL = "https://raasbackend.vetrinahealthcare.com/";
const statusOptions = [{ value: 1, label: "Active" }, { value: 0, label: "Inactive" }];
const probationOptions = [{ value: "y", label: "Yes" }, { value: "n", label: "No" }];
const genderOptions = [{ value: "Male", label: "Male" }, { value: "Female", label: "Female" }, { value: "Other", label: "Other" }];
const subDivisionOptions = [{ value: "VetBiz", label: "VetBiz" }, { value: "TredBiz", label: "TredBiz" }, { value: " ", label: "TredBiz Mix" }];

export default function EmployeesView() {
  const employeeDialogRef = useRef(null);
  const changeManagerDialogRef = useRef(null);
  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("sm"));
  const themePurple = "#8C257C";
  const themePurpleHover = "#6d1d60";
  const themeOrange = "#F58E35";

  const purpleButtonSx = {
    backgroundColor: themePurple,
    color: "white",
    "&:hover": {
      backgroundColor: themePurpleHover,
    },
  };
  const cancelButtonSx = {
    color: "#757575",
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.04)",
    },
  };

  const [loading, setLoading] = useState(true);
  const [departments, setDepartments] = useState([]);
  const [designations, setDesignations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [openChangeManagerForm, setOpenChangeManagerForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [newManager, setNewManager] = useState("");
  const [selectedEmployeeForManagerChange, setSelectedEmployeeForManagerChange] = useState("");
  const [employees, setEmployees] = useState([]);
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
  const [salaryConfig, setSalaryConfig] = useState(null);

  const [currentEmployee, setCurrentEmployee] = useState({
    id: null,
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    employee_id: "",
    join_date: "",
    status: 1,
    avatar: null,
    country_id: "",
    state_id: "",
    employee_hub_id: "",
    headquarter_id: "",
    division_id: "",
    subDivision: "",
    role: "",
    is_probation: "n",
    resumeUrl: "",
    password: "",
    gender: "",
    username: "",
    grossSalary: "",
    department_id: "",
    designation_id: "",
    manager_id: "",
    officeShift: "",
    grossSalaryYearly: "",
    ctcMonthly: "",
    ctcYearly: "",
  });

  const [openEmployeeForm, setOpenEmployeeForm] = useState(false);

  useEffect(() => {
    const requests = [
      axiosInstance.get("api/desig_dept_dropdown/"),
      axiosInstance.get("employee-dropdown/"),
      axiosInstance.get("api/countries/"),
      axiosInstance.get("api/employee_hub/"),
      axiosInstance.get("api/division/"),
      axiosInstance.get("api/role_list/"),
      axiosInstance.get("api/search_by_email_vet_talent/"),
      axios.get("https://tdtlworld.com/hrms-backend/api/headquarters/"),
      axios.get("https://tdtlworld.com/hrms-backend/api/payroll_setup_configuration/"),
    ];

    (async () => {
      try {
        const results = await Promise.allSettled(requests);
        const valueAt = (index) => (results[index]?.status === "fulfilled" ? results[index].value : undefined);

        const depts = valueAt(0);
        const empDropdown = valueAt(1);
        const countriesRes = valueAt(2);
        const hubs = valueAt(3);
        const divs = valueAt(4);
        const rolesRes = valueAt(5);
        const talent = valueAt(6);
        const headquartersRes = valueAt(7);
        const salaryConf = valueAt(8);

        if (depts?.data) setDepartments(depts.data.dept_data ?? []);
        if (empDropdown?.data) setAllEmployeesForDropdown(empDropdown.data ?? []);
        if (countriesRes?.data && countriesRes.data.status === "success") setCountries(countriesRes.data.data ?? []);
        if (divs?.data) setDivisions(divs.data ?? []);
        if (rolesRes?.data?.status === "success") setRoles(rolesRes.data.data ?? []);
        if (headquartersRes?.data) setHeadquarters(headquartersRes.data ?? []);
        if (talent?.data?.data) setTalentPool(talent.data.data ?? []);

        let configData = null;
        if (Array.isArray(salaryConf?.data)) {
          configData = salaryConf.data.reduce((acc, item) => {
            if (item?.particulars) acc[item.particulars] = parseFloat(item.value) || 0;
            return acc;
          }, {});
          setSalaryConfig(configData);
        } else {
          setSalaryConfig({ hra: 0.25, basic_plus_da: 0.6, pf_employer_contribution: 0.12, esic_employer_contribution: 0.0325 });
        }
      } catch (outerError) {
        console.error("Unexpected error in fetchInitialData:", outerError);
      }
    })();
  }, []);

  const fetchEmployees = useCallback(() => {
    setLoading(true);
    axiosInstance
      .get("api/employee_details/")
      .then((response) => setEmployees(Array.isArray(response.data.data) ? response.data.data : []))
      .catch((error) => {
        console.error("Error fetching employees:", error);
        setEmployees([]);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  const fetchOfficeShifts = async (hubId) => {
    if (!hubId) {
      setOfficeShifts([]);
      return [];
    }
    try {
      const response = await axios.get(`https://tdtlworld.com/hrms-backend/api/office_shift_dropdown/${hubId}/`);
      const shifts = response.data.data || response.data.office_shift_data || [];
      setOfficeShifts(shifts);
      return shifts;
    } catch (error) {
      console.error("Error fetching office shifts:", error);
      setOfficeShifts([]);
      return [];
    }
  };

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
    if (pfRate > 1) pfRate = pfRate / 100;
    let esicRate = parseNumberOrPercent(salaryConfig.esic_employer_contribution, 0.0);
    if (esicRate > 1) esicRate = esicRate / 100;

    const grossSalaryYearly = grossSalaryMonthly * 12;
    const hra = grossSalaryMonthly * hraRate;
    let baseForPf = grossSalaryMonthly - hra;
    if (baseForPf < 0) baseForPf = 0;
    let pf_employer = baseForPf * pfRate;
    const PF_CAP = 1800;
    if (pf_employer > PF_CAP) pf_employer = PF_CAP;
    const esic_applicable = grossSalaryMonthly <= 21000;
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
      if (completedYears > 5 && basic_plus_da_amount > 0) {
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

  const handleCountryChange = (selectedCountry) => {
    const countryId = selectedCountry ? selectedCountry.country_id : "";
    const countryName = selectedCountry ? selectedCountry.country_name : null;
    setCurrentEmployee((prev) => ({ ...prev, country_id: countryId, state_id: "", employee_hub_id: "", officeShift: "" }));
    setStates([]);
    setEmployeeHubs([]);
    setOfficeShifts([]); 
    if (countryName) {
      axiosInstance
        .get(`api/states/?country_name=${countryName}`)
        .then((res) => {
          if (res.data.status === "success") setStates(res.data.data || []);
        })
        .catch((err) => console.error("Error fetching states:", err));
    }
  };

  const handleStateChange = (selectedState) => {
    const stateId = selectedState ? selectedState.state_id : "";
    setCurrentEmployee((prev) => ({ ...prev, state_id: stateId, employee_hub_id: "", officeShift: "" }));
    setEmployeeHubs([]);
    setOfficeShifts([]); 
    if (stateId) {
      axiosInstance
        .get(`api/employee_hub_dropdown/${stateId}/`)
        .then((res) => {
          if (res.data.status === "success") setEmployeeHubs(res.data.data || []);
        })
        .catch((err) => console.error("Error fetching employee hubs:", err));
    }
  };

  const handleDeptChange = (selectedDept) => {
    const deptId = selectedDept ? selectedDept.dept_id : "";
    setCurrentEmployee((prev) => ({ ...prev, department_id: deptId, designation_id: "" }));
    if (deptId) {
      axiosInstance
        .get(`api/desig_dept_dropdown/?dept_id=${deptId}/`)
        .then((res) => setDesignations(res.data.desig_data || []))
        .catch((err) => console.error("Error fetching designations:", err));
    } else {
      setDesignations([]);
    }
  };

  const handleDivisionChange = (selectedDivision) => {
    const divisionId = selectedDivision ? selectedDivision.division_id : "";
    if (selectedDivision && selectedDivision.division_name !== "Livestock") {
      setCurrentEmployee((prev) => ({ ...prev, division_id: divisionId, subDivision: "" }));
    } else {
      setCurrentEmployee((prev) => ({ ...prev, division_id: divisionId }));
    }
  };

  const handleChangeManager = async () => {
    if (!selectedEmployeeForManagerChange || !newManager) {
      Swal.fire({ icon: "warning", title: "Incomplete Selection", text: "Please select an employee and a new manager.", target: changeManagerDialogRef.current });
      return;
    }
    try {
      await axiosInstance.put("api/change_manager/", { user_id: selectedEmployeeForManagerChange, manager_id: newManager });
      await fetchEmployees();
      Swal.fire({ icon: "success", title: "Success", text: "Manager changed successfully!", timer: 3000, showConfirmButton: false });
      setOpenChangeManagerForm(false);
      setSelectedEmployeeForManagerChange("");
      setNewManager("");
    } catch (error) {
      console.error("Error changing manager:", error);
      Swal.fire({ icon: "error", title: "Operation Failed", text: `Error changing manager: ${error.response?.data?.message || "An error occurred."}`, target: changeManagerDialogRef.current });
    }
  };

  const navigate = useNavigate();
  const handleArrowClick = (id) => navigate(`/hrms/admindashboard/employeedetail/${id}`);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentEmployee((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddEmployee = async () => {
    try {
      const maxIdResponse = await axios.get("https://tdtlworld.com/hrms-backend/api/get_max_employee_id/");
      const newEmpId = maxIdResponse.data.employee_id;
      setCurrentEmployee({
        emp_id: newEmpId,
        firstName: "",
        middleName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        avatar: null,
        officeShift: "",
        status: 1,
        join_date: "",
        gender: "",
        username: newEmpId,
        password: "",
        role: "",
        grossSalary: "",
        department_id: "",
        designation_id: "",
        manager_id: "",
        country_id: "",
        state_id: "",
        employee_hub_id: "",
        headquarter_id: "",
        division_id: "",
        company_id: 2,
        is_probation: "n",
        resumeUrl: "",
        subDivision: "",
        grossSalaryYearly: "",
        ctcMonthly: "",
        ctcYearly: "",
        employee_id: "",
      });
      setDesignations([]);
      setStates([]);
      setEmployeeHubs([]);
      setOfficeShifts([]); 
      setEmployeeDocuments(null);
      setIsEditMode(false);
      setShowPassword(false);
      setOpenEmployeeForm(true);
    } catch (error) {
      console.error("Error fetching max employee ID:", error);
      Swal.fire({ icon: "error", title: "Error", text: "Failed to initialize employee form.", timer: 3000, showConfirmButton: false });
    }
  };

  const handleTalentSelect = async (event, selectedOption) => {
    setEmployeeDocuments(null);
    setCurrentEmployee((prev) => ({ ...prev, resumeUrl: "" }));
    setOfficeShifts([]); 

    if (!selectedOption) {
      setCurrentEmployee((prev) => ({ ...prev, firstName: "", middleName: "", lastName: "", email: "", phone: "", gender: "", country_id: "", state_id: "", officeShift: "" }));
      return;
    }
    const talent = talentPool.find((p) => p.email === selectedOption.email);
    if (!talent) return;
    const selectedCountry = countries.find((c) => c.country_name === talent.country);
    const resumeLink = talent.resume ? `${RESUME_BASE_URL}${talent.resume}` : "";
    setCurrentEmployee((prev) => ({
      ...prev,
      firstName: talent.first_name || "",
      middleName: talent.middle_name || "",
      lastName: talent.last_name || "",
      email: talent.email || "",
      phone: talent.phone || "",
      gender: talent.gender || "",
      address: talent.address || "", 
      country_id: selectedCountry ? selectedCountry.country_id : "",
      state_id: "",
      employee_hub_id: "",
      officeShift: "", 
      resumeUrl: resumeLink,
    }));
    
    if (selectedCountry) {
        try {
          const statesRes = await axiosInstance.get(`api/states/?country_name=${selectedCountry.country_name}`);
          if (statesRes.data.status === "success") {
            const fetchedStates = statesRes.data.data || [];
            setStates(fetchedStates);
            const selectedState = fetchedStates.find((s) => s.state_name === talent.state);
            if (selectedState) {
              setCurrentEmployee((prev) => ({ ...prev, state_id: selectedState.state_id }));
              const hubsRes = await axiosInstance.get(`api/employee_hub_dropdown/${selectedState.state_id}/`);
              if (hubsRes.data.status === "success") setEmployeeHubs(hubsRes.data.data || []);
            }
          }
        } catch (err) { console.error(err); }
    }
    setIsFetchingDocs(true);
    try {
      const docResponse = await axios.post("https://raasbackend.vetrinahealthcare.com/fetch_documents/", { email_id: talent.email });
      setEmployeeDocuments(docResponse.data.status === "success" && docResponse.data.documents ? docResponse.data.documents : null);
    } catch (error) {
      console.error("Error fetching documents:", error);
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
        Swal.fire({ icon: "error", title: "Error", text: "Failed to load employee details.", timer: 3000, showConfirmButton: false });
        return;
      }
      const empData = response.data.data[0];
      
      const [desigRes, statesRes, hubsRes] = await Promise.all([
        axiosInstance.get(`api/desig_dept_dropdown/?dept_id=${empData.department_id}/`),
        empData.country_name ? axiosInstance.get(`api/states/?country_name=${empData.country_name}`) : Promise.resolve({ data: { data: [] } }),
        empData.state ? axiosInstance.get(`api/employee_hub_dropdown/${empData.state}/`) : Promise.resolve({ data: { data: [] } }),
      ]);

      setDesignations(desigRes.data.desig_data || []);
      setStates(statesRes.data.data || []);
      setEmployeeHubs(hubsRes.data.data || []);

      let validOfficeShifts = [];
      if (empData.employee_hub_id) {
          validOfficeShifts = await fetchOfficeShifts(empData.employee_hub_id);
      } else {
          setOfficeShifts([]);
      }

      const officeShiftObj = validOfficeShifts.find((s) => s.office_shift_name === empData.office_shift);
      const nameParts = (empData.emp_name || "").split(" ");
      const selectedCountry = countries.find((c) => c.country_name === empData.country_name);
      const selectedHeadquarter = headquarters.find((hq) => hq.headquarter_name === empData.headquarter);
      let finalSubDivisionValue = empData.sub_division || "";
      if (finalSubDivisionValue === "Tred") finalSubDivisionValue = "TredBiz";

      setCurrentEmployee({
        id: employee.user_id,
        firstName: nameParts[0] || "",
        middleName: nameParts.length > 2 ? nameParts.slice(1, -1).join(" ") : "",
        lastName: nameParts.length > 1 ? nameParts[nameParts.length - 1] : "",
        email: empData.email || "",
        employee_id: empData.employee_id || "",
        phone: empData.phone || "",
        address: empData.address || "",
        manager_id: empData.manager_id ? Number(empData.manager_id) : "",
        designation_id: empData.designation_id ? Number(empData.designation_id) : "",
        department_id: empData.department_id ? Number(empData.department_id) : "",
        headquarter_id: selectedHeadquarter ? selectedHeadquarter.headquarter_id : "",
        subDivision: finalSubDivisionValue,
        division_id: empData.division_id ? Number(empData.division_id) : "",
        state_id: empData.state ? Number(empData.state) : "",
        employee_hub_id: empData.employee_hub_id ? Number(empData.employee_hub_id) : "",
        role: empData.role_id ? Number(empData.role_id) : "",
        officeShift: officeShiftObj ? Number(officeShiftObj.office_shift_id) : "",
        status: Number(empData.status),
        join_date: empData.join_date ? empData.join_date.split(" ")[0] : "",
        country_id: selectedCountry ? Number(selectedCountry.country_id) : "",
        avatar: empData.profile_photo || "",
        is_probation: empData.probation?.toLowerCase() === "y" ? "y" : "n",
        resumeUrl: "",
      });
      setIsEditMode(true);
      setOpenEmployeeForm(true);
      setShowPassword(false);
    } catch (error) {
      console.error("Error fetching employee details for edit:", error);
      Swal.fire({ icon: "error", title: "Error", text: "Failed to fetch complete employee details.", timer: 3000, showConfirmButton: false });
    }
  };

  const handleSaveEmployee = async () => {
    if (!isEditMode) {
      const requiredFields = {
        firstName: "First Name",
        lastName: "Last Name",
        email: "Email",
        phone: "Mobile Number",
        country_id: "Country",
        state_id: "State",
        role: "User (Role)",
        department_id: "Department",
        division_id: "Division",
        designation_id: "Designation",
        headquarter_id: "Headquarter",
        manager_id: "Line Manager",
        employee_hub_id: "Holiday Hub",
        officeShift: "Shift & Scheduling",
        join_date: "Join Date",
        avatar: "Photo",
        gender: "Gender",
        username: "Username",
        password: "Password",
        grossSalary: "Gross Salary",
      };
      
      const selectedDivision = divisions.find((d) => d.division_id == currentEmployee.division_id);
      if (selectedDivision && selectedDivision.division_name === "Livestock" && !currentEmployee.subDivision) {
        Swal.fire({ icon: "error", title: "Validation Error", text: "Sub Division is required when Division is Livestock.", target: employeeDialogRef.current });
        return;
      }
      
      for (const field in requiredFields) {
        if (!currentEmployee[field]) {
          Swal.fire({ icon: "error", title: "Validation Error", text: `The field "${requiredFields[field]}" is required.`, target: employeeDialogRef.current });
          return;
        }
      }
    }
    
    const formData = new FormData();
    const keyMap = {
      firstName: "first_name",
      middleName: "middle_name",
      lastName: "last_name",
      officeShift: "office_shift",
      join_date: "join_date",
      grossSalary: "gross_salary",
      headquarter_id: "headquarter_id",
      grossSalaryYearly: "gross_salary_yearly",
      ctcMonthly: "ctc_monthly",
      ctcYearly: "ctc_yearly",
      address: "address",
    };
    Object.keys(currentEmployee).forEach((key) => {
      if (key === "avatar" && currentEmployee.avatar instanceof File) {
        formData.append("file", currentEmployee.avatar);
      } else if (key !== "resumeUrl" && currentEmployee[key] !== null && currentEmployee[key] !== undefined && currentEmployee[key] !== "") {
        const backendKey = keyMap[key] || key;
        formData.append(backendKey, currentEmployee[key]);
      }
    });
    
    setIsSaving(true);
    try {
      const action = isEditMode ? "updated" : "added";
      if (isEditMode) {
        formData.append("user_id", currentEmployee.id);
        await axiosInstance.put("api/edit_employee/", formData, { headers: { "Content-Type": "multipart/form-data" } });
      } else {
        await axiosInstance.post("api/add_employee/", formData, { headers: { "Content-Type": "multipart/form-data" } });
      }
      setOpenEmployeeForm(false);
      await fetchEmployees();
      Swal.fire({ icon: "success", title: "Success", text: `Employee ${action} successfully!`, timer: 3000, showConfirmButton: false });
    } catch (error) {
      console.error("Error saving employee:", error);
      const errorMessage = error.response?.data?.message || error.response?.data?.detail || "An unexpected error occurred.";
      Swal.fire({ icon: "error", title: "Operation failed", text: `${errorMessage}`, target: employeeDialogRef.current });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteEmployee = (employeeId) => {
    if (!employeeId) return;
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: themePurple,
      cancelButtonColor: themeOrange,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosInstance
          .delete("api/edit_employee/", { data: { user_id: employeeId } })
          .then(() => {
            fetchEmployees();
            Swal.fire({ icon: "success", title: "Deleted!", text: "The employee has been deleted.", timer: 3000, showConfirmButton: false });
          })
          .catch((error) => {
            const errorMessage = error.response?.data?.message || error.response?.data?.detail || "Failed to delete employee.";
            Swal.fire({ icon: "error", title: "Error", text: errorMessage, timer: 3000, showConfirmButton: false });
          });
      }
    });
  };

  const handleExportEmployees = () => {
    if (employees.length === 0) {
      Swal.fire({ icon: "info", title: "Info", text: "There is no employee data to export.", timer: 3000, showConfirmButton: false });
      return;
    }
    const worksheet = XLSX.utils.json_to_sheet(employees);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Employees");
    XLSX.writeFile(workbook, "EmployeesData.xlsx");
  };

  const sortedEmployees = useMemo(() => {
    if (!Array.isArray(employees)) return [];
    return [...employees].sort((a, b) => b.user_id - a.user_id);
  }, [employees]);

  const filteredEmployees = useMemo(
    () =>
      sortedEmployees.filter(
        (e) =>
          (e.employee_name && e.employee_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (e.department_name && e.department_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (e.designation_name && e.designation_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (e.join_date && e.join_date.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (e.manager && e.manager.toLowerCase().includes(searchTerm.toLowerCase()))
      ),
    [sortedEmployees, searchTerm]
  );

  const handlePaginationChange = (event, newPage) => setCurrentPage(newPage - 1);
  const handleRowsPerPageChange = (event) => { setRowsPerPage(parseInt(event.target.value, 10)); setCurrentPage(0); };
  const handleFileUpload = (e) => { const file = e.target.files[0]; if (file) setCurrentEmployee((prev) => ({ ...prev, avatar: file })); };

  const isSubDivisionDisabled = useMemo(() => {
    if (!currentEmployee.division_id) return true;
    const selectedDivision = divisions.find((d) => d.division_id == currentEmployee.division_id);
    return !selectedDivision || selectedDivision.division_name !== "Livestock";
  }, [currentEmployee.division_id, divisions]);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      return `${String(date.getDate()).padStart(2, "0")}/${String(date.getMonth() + 1).padStart(2, "0")}/${date.getFullYear()}`;
    } catch (error) {
      return dateString.split(" ")[0];
    }
  };

  return (
    <Box component={Paper} p={3}>
      <Typography variant="h4" sx={{ color: themePurple, fontWeight: "bold", mb: 5 }}>
        Employees List
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: isMobile ? "column" : "row", gap: 2, mb: 2 }}>
        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
          <Button variant="contained" startIcon={<AddIcon />} onClick={handleAddEmployee} sx={purpleButtonSx}>Add Employee</Button>
          <Button variant="contained" startIcon={<DownloadIcon />} onClick={handleExportEmployees} sx={purpleButtonSx}>Export</Button>
          <Button variant="contained" startIcon={<ChangeManagerIcon />} onClick={() => setOpenChangeManagerForm(true)} sx={purpleButtonSx}>Change Manager</Button>
        </Box>
        <TextField size="small" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} sx={{ width: isMobile ? "100%" : "auto" }} InputProps={{ startAdornment: (<InputAdornment position="start"><SearchIcon /></InputAdornment>) }} />
      </Box>

      <Dialog open={openChangeManagerForm} onClose={() => setOpenChangeManagerForm(false)} maxWidth="sm" fullWidth ref={changeManagerDialogRef}>
        <DialogTitle sx={{ color: themePurple, fontWeight: "bold" }}>
          Change Manager
          <IconButton onClick={() => setOpenChangeManagerForm(false)} sx={{ position: "absolute", right: 8, top: 8, color: "grey.500" }}><CloseIcon /></IconButton>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Select Employee</InputLabel>
                <Select value={selectedEmployeeForManagerChange} onChange={(e) => setSelectedEmployeeForManagerChange(e.target.value)} label="Select Employee">
                  {allEmployeesForDropdown.map((emp) => (<MenuItem key={emp.value} value={emp.value}>{`${emp.label} (${emp.emp_id})`}</MenuItem>))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Select New Manager</InputLabel>
                <Select value={newManager} onChange={(e) => setNewManager(e.target.value)} label="Select New Manager">
                  {allEmployeesForDropdown.map((emp) => (<MenuItem key={emp.value} value={emp.value}>{`${emp.label} (${emp.emp_id})`}</MenuItem>))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenChangeManagerForm(false)} sx={cancelButtonSx}>Cancel</Button>
          <Button onClick={handleChangeManager} variant="contained" sx={purpleButtonSx}>Save</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openEmployeeForm} onClose={() => setOpenEmployeeForm(false)} maxWidth="md" fullWidth ref={employeeDialogRef}>
        <DialogTitle sx={{ color: "#8C257C", fontWeight: "bold", fontSize: "1.5rem", borderBottom: "1px solid #e0e0e0", pb: 2 }}>
          {isEditMode ? "Edit Employee" : "Add Employee"}
          <IconButton onClick={() => setOpenEmployeeForm(false)} sx={{ position: "absolute", right: 8, top: 8, color: "grey.500" }}><CloseIcon /></IconButton>
        </DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          <Grid container spacing={3}>
            {!isEditMode && (
              <Grid item xs={12}>
                <Autocomplete
                  options={talentPool}
                  getOptionLabel={(option) => option.email || ""}
                  onChange={handleTalentSelect}
                  onInputChange={(event, newInputValue) => { if (!talentPool.find((p) => p.email === newInputValue)) setCurrentEmployee((prev) => ({ ...prev, email: newInputValue })); }}
                  renderInput={(params) => <TextField {...params} label="Search Email to Auto-fill" />}
                />
              </Grid>
            )}

            <Grid item xs={12}>
              <Typography variant="h6" sx={{ color: themePurple, fontWeight: 'bold' }}>Personal Information</Typography>
              <Divider sx={{ mb: 0 }} />
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextField fullWidth label="First Name" name="firstName" value={currentEmployee.firstName || ""} onChange={handleInputChange} onKeyPress={(e) => { if (!/^[A-Za-z]$/.test(e.key)) e.preventDefault(); }} InputProps={{ readOnly: isEditMode }} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField fullWidth label="Middle Name" name="middleName" value={currentEmployee.middleName || ""} onChange={handleInputChange} onKeyPress={(e) => { if (!/^[A-Za-z]$/.test(e.key)) e.preventDefault(); }} InputProps={{ readOnly: isEditMode }} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField fullWidth label="Last Name" name="lastName" value={currentEmployee.lastName || ""} onChange={handleInputChange} onKeyPress={(e) => { if (!/^[A-Za-z]$/.test(e.key)) e.preventDefault(); }} InputProps={{ readOnly: isEditMode }} />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Email" name="email" value={currentEmployee.email || ""} onChange={handleInputChange} InputProps={{ readOnly: isEditMode || !!talentPool.find((p) => p.email === currentEmployee.email) }} />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Mobile Number" name="phone" value={currentEmployee.phone || ""} onChange={(e) => { const value = e.target.value; if (/^\d{0,10}$/.test(value)) handleInputChange(e); }} inputProps={{ maxLength: 10, inputMode: "numeric", pattern: "[0-9]*" }} InputProps={{ readOnly: isEditMode }} />
            </Grid>

            {!isEditMode && (
                <Grid item xs={12} sm={6}>
                  <Autocomplete options={genderOptions} getOptionLabel={(option) => option.label} value={genderOptions.find((g) => g.value === currentEmployee.gender) || null} onChange={(e, nv) => setCurrentEmployee((prev) => ({ ...prev, gender: nv ? nv.value : "" }))} isOptionEqualToValue={(option, value) => option.value === value.value} renderInput={(params) => <TextField {...params} label="Gender" />} />
                </Grid>
            )}

            <Grid item xs={12} sm={!isEditMode ? 6 : 12}>
                <TextField fullWidth label="Address" name="address" value={currentEmployee.address || ""} onChange={handleInputChange} />
            </Grid>

            <Grid item xs={12} sm={12}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Button variant="outlined" component="label" disabled={isEditMode} color="secondary">
                  Upload Photo
                  <input type="file" hidden accept="image/*" onChange={handleFileUpload} />
                </Button>
                {currentEmployee.avatar && <Avatar src={typeof currentEmployee.avatar === "string" ? currentEmployee.avatar : URL.createObjectURL(currentEmployee.avatar)} sx={{ width: 56, height: 56 }} />}
              </Box>
            </Grid>

            <Grid item xs={12}>
              {isFetchingDocs && <CircularProgress />}
              {employeeDocuments && !isFetchingDocs && (
                <Box sx={{ mt: 1 }}>
                  <Typography variant="subtitle2" gutterBottom>Fetched Documents</Typography>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                    {Object.entries(employeeDocuments).map(([name, url]) =>
                      url ? <Chip key={name} label={name.replace(/_/g, " ")} component="a" href={url} target="_blank" clickable icon={<LinkIcon />} variant="outlined" color="primary" size="small" /> : null
                    )}
                  </Box>
                </Box>
              )}
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6" sx={{ color: themePurple, fontWeight: 'bold', mt: 0 }}>Location Details</Typography>
              <Divider sx={{ mb: 0 }} />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Autocomplete options={countries} getOptionLabel={(option) => option.country_name || ""} value={countries.find((c) => c.country_id == currentEmployee.country_id) || null} onChange={(e, nv) => handleCountryChange(nv)} isOptionEqualToValue={(option, value) => option.country_id == value.country_id} renderInput={(params) => <TextField {...params} label="Country" />} />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Autocomplete options={states} getOptionLabel={(option) => option.state_name || ""} value={states.find((s) => s.state_id == currentEmployee.state_id) || null} onChange={(e, nv) => handleStateChange(nv)} isOptionEqualToValue={(option, value) => option.state_id == value.state_id} disabled={!currentEmployee.country_id} renderInput={(params) => <TextField {...params} label="State" />} />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6" sx={{ color: themePurple, fontWeight: 'bold', mt: 0 }}>Employment & Role</Typography>
              <Divider sx={{ mb: 0 }} />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Autocomplete options={departments} getOptionLabel={(option) => option.dept_name || ""} value={departments.find((d) => d.dept_id == currentEmployee.department_id) || null} onChange={(e, nv) => handleDeptChange(nv)} isOptionEqualToValue={(option, value) => option.dept_id == value.dept_id} renderInput={(params) => <TextField {...params} label="Department" />} />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Autocomplete options={divisions} getOptionLabel={(option) => option.division_name || ""} value={divisions.find((d) => d.division_id == currentEmployee.division_id) || null} onChange={(e, nv) => handleDivisionChange(nv)} isOptionEqualToValue={(option, value) => option.division_id == value.division_id} renderInput={(params) => <TextField {...params} label="Division" />} />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Autocomplete options={subDivisionOptions} getOptionLabel={(option) => option.label || ""} value={subDivisionOptions.find((sd) => sd.value === currentEmployee.subDivision) || null} onChange={(e, nv) => setCurrentEmployee((prev) => ({ ...prev, subDivision: nv ? nv.value : "" }))} isOptionEqualToValue={(option, value) => option.value === value.value} disabled={isSubDivisionDisabled} renderInput={(params) => <TextField {...params} label="Sub-division" />} />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Autocomplete options={designations} getOptionLabel={(option) => option.desig_name || ""} value={designations.find((d) => d.desig_id == currentEmployee.designation_id) || null} onChange={(e, nv) => setCurrentEmployee((prev) => ({ ...prev, designation_id: nv ? nv.desig_id : "" }))} isOptionEqualToValue={(option, value) => option.desig_id == value.desig_id} disabled={!currentEmployee.department_id} renderInput={(params) => <TextField {...params} label="Designation" />} />
            </Grid>

            <Grid item xs={12} sm={6}>
               <Autocomplete options={roles} getOptionLabel={(option) => option.role_name || ""} value={roles.find((r) => r.index == currentEmployee.role) || null} onChange={(e, nv) => setCurrentEmployee((prev) => ({ ...prev, role: nv ? nv.index : "" }))} isOptionEqualToValue={(option, value) => option.index == value.index} renderInput={(params) => <TextField {...params} label="User (Role)" />} />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Autocomplete options={headquarters} getOptionLabel={(option) => option.headquarter_name || ""} value={headquarters.find((h) => h.headquarter_id == currentEmployee.headquarter_id) || null} onChange={(e, nv) => setCurrentEmployee((prev) => ({ ...prev, headquarter_id: nv ? nv.headquarter_id : "" }))} isOptionEqualToValue={(option, value) => option.headquarter_id == value.headquarter_id} renderInput={(params) => <TextField {...params} label="Headquarter" />} />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6" sx={{ color: themePurple, fontWeight: 'bold', mt: 0 }}>Reporting & Schedule</Typography>
              <Divider sx={{ mb: 0 }} />
            </Grid>

            <Grid item xs={12} sm={12}>
              <Autocomplete 
                options={allEmployeesForDropdown} 
                getOptionLabel={(option) => (option.label ? `${option.label} (${option.emp_id})` : "")} 
                value={allEmployeesForDropdown.find((e) => e.value == currentEmployee.manager_id) || null} 
                onChange={(e, nv) => setCurrentEmployee((prev) => ({ ...prev, manager_id: nv ? nv.value : "" }))} 
                isOptionEqualToValue={(option, value) => option.value == value.value} 
                renderInput={(params) => <TextField {...params} label="Line Manager (Select designation of line manager with division subdivision-HQ)" />} 
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Autocomplete 
                options={employeeHubs} 
                getOptionLabel={(option) => option.employee_hub_name || ""} 
                value={employeeHubs.find((h) => h.employee_hub_id == currentEmployee.employee_hub_id) || null} 
                onChange={async (e, nv) => {
                   const hubId = nv ? nv.employee_hub_id : "";
                   setCurrentEmployee((prev) => ({ ...prev, employee_hub_id: hubId, officeShift: "" })); 
                   await fetchOfficeShifts(hubId);
                }} 
                isOptionEqualToValue={(option, value) => option.employee_hub_id == value.employee_hub_id} 
                disabled={!currentEmployee.state_id} 
                renderInput={(params) => <TextField {...params} label="Holiday Hub" />} 
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Autocomplete 
                options={officeShifts} 
                getOptionLabel={(option) => option.office_shift_name || ""} 
                value={officeShifts.find((s) => s.office_shift_id == currentEmployee.officeShift) || null} 
                onChange={(e, nv) => setCurrentEmployee((prev) => ({ ...prev, officeShift: nv ? nv.office_shift_id : "" }))} 
                isOptionEqualToValue={(option, value) => option.office_shift_id == value.office_shift_id} 
                disabled={!currentEmployee.employee_hub_id || officeShifts.length === 0} 
                renderInput={(params) => <TextField {...params} label="Shift & Scheduling" />} 
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Autocomplete options={statusOptions} getOptionLabel={(option) => option.label} value={statusOptions.find((s) => s.value === currentEmployee.status) || null} onChange={(e, nv) => setCurrentEmployee((prev) => ({ ...prev, status: nv ? nv.value : 1 }))} isOptionEqualToValue={(option, value) => option.value === value.value} renderInput={(params) => <TextField {...params} label="Status" />} />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Autocomplete options={probationOptions} getOptionLabel={(option) => option.label} value={probationOptions.find((p) => p.value === currentEmployee.is_probation) || null} onChange={(e, nv) => setCurrentEmployee((prev) => ({ ...prev, is_probation: nv ? nv.value : "n" }))} isOptionEqualToValue={(option, value) => option.value === value.value} renderInput={(params) => <TextField {...params} label="On Probation" />} />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Join Date" name="join_date" type="date" value={currentEmployee.join_date || ""} onChange={handleInputChange} InputLabelProps={{ shrink: true }} />
            </Grid>

            {isEditMode && (
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Employee ID" name="employee_id" value={currentEmployee.employee_id || ""} InputProps={{ readOnly: true }} />
              </Grid>
            )}

            {!isEditMode && (
              <>
                <Grid item xs={12}>
                    <Typography variant="h6" sx={{ color: themePurple, fontWeight: 'bold', mt: 0 }}>Account & Payroll</Typography>
                    <Divider sx={{ mb: 0 }} />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Username" name="username" value={currentEmployee.username || ""} onChange={handleInputChange} InputProps={{ readOnly: true }} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Password" name="password" value={currentEmployee.password || ""} onChange={handleInputChange} type={showPassword ? "text" : "password"} InputProps={{ endAdornment: (<InputAdornment position="end"> <IconButton aria-label="toggle password visibility" onClick={() => setShowPassword((prev) => !prev)} onMouseDown={(e) => e.preventDefault()} edge="end"> {showPassword ? <VisibilityOff /> : <Visibility />} </IconButton> </InputAdornment>) }} />
                </Grid>
                
                <Grid item xs={12} sm={6} md={3}>
                  <TextField fullWidth label="Gross Salary monthly" name="grossSalary" type="number" value={currentEmployee.grossSalary || ""} onChange={(e) => { const value = e.target.value; if (/^\d*\.?\d*$/.test(value)) handleInputChange(e); }} />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <TextField fullWidth label="Gross Salary Yearly" name="grossSalaryYearly" type="number" value={currentEmployee.grossSalaryYearly || ""} InputProps={{ readOnly: true }} />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <TextField fullWidth label="CTC Monthly" name="ctcMonthly" type="number" value={currentEmployee.ctcMonthly || ""} InputProps={{ readOnly: true }} />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <TextField fullWidth label="CTC Yearly" name="ctcYearly" type="number" value={currentEmployee.ctcYearly || ""} InputProps={{ readOnly: true }} />
                </Grid>
              </>
            )}
          </Grid>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => setOpenEmployeeForm(false)} disabled={isSaving} sx={cancelButtonSx}>Cancel</Button>
          <Button onClick={handleSaveEmployee} variant="contained" disabled={isSaving} sx={purpleButtonSx}>{isSaving ? <CircularProgress size={24} color="inherit" /> : "Save"}</Button>
        </DialogActions>
      </Dialog>

      <TableContainer>
        <Table sx={{ minWidth: "100%", whiteSpace: "nowrap" }}>
          <TableHead>
            <TableRow sx={{ bgcolor: themePurple }}>
              <TableCell sx={{ fontWeight: "bold", color: "white" }}>SR. NO.</TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "white" }}>EMPLOYEE</TableCell>
              <TableCell sx={{ color: "white" }}></TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "white" }}>DEPARTMENT</TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "white" }}>DESIGNATION</TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "white" }}>JOIN DATE</TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "white" }}>STATUS</TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "white" }}>MANAGER</TableCell>
              <TableCell sx={{ fontWeight: "bold", textAlign: "center", color: "white" }}>ACTIONS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              Array.from(new Array(rowsPerPage)).map((_, index) => (
                <TableRow key={index}><TableCell colSpan={9}><Skeleton animation="wave" /></TableCell></TableRow>
              ))
            ) : (
              (rowsPerPage > 0 ? filteredEmployees.slice(currentPage * rowsPerPage, currentPage * rowsPerPage + rowsPerPage) : filteredEmployees).map((employee, index) => (
                <TableRow key={employee.user_id} sx={{ "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.04)" } }} onMouseEnter={() => setHoveredRowId(employee.user_id)} onMouseLeave={() => setHoveredRowId(null)}>
                  <TableCell sx={{ fontSize: "0.95rem" }}>{currentPage * rowsPerPage + index + 1}</TableCell>
                  <TableCell sx={{ fontSize: "0.95rem" }}>{employee.employee_name}</TableCell>
                  <TableCell sx={{ padding: "0 8px", textAlign: "center" }}>{hoveredRowId === employee.user_id && (<IconButton onClick={() => handleArrowClick(employee.user_id)} size="small" sx={{ color: themeOrange }}><ArrowForwardIcon fontSize="small" /></IconButton>)}</TableCell>
                  <TableCell sx={{ fontSize: "0.95rem" }}>{employee.department_name || "N/A"}</TableCell>
                  <TableCell sx={{ fontSize: "0.95rem" }}>{employee.designation_name || "N/A"}</TableCell>
                  <TableCell sx={{ fontSize: "0.95rem" }}>{formatDate(employee.join_date)}</TableCell>
                  <TableCell sx={{ fontSize: "0.95rem" }}><Chip label={employee.status === 1 ? "Active" : "Inactive"} size="small" sx={{ bgcolor: employee.status === 1 ? "#4caf50" : themeOrange, color: "white", borderRadius: "16px", height: "24px" }} /></TableCell>
                  <TableCell sx={{ fontSize: "0.95rem" }}>{employee.manager}</TableCell>
                  <TableCell><Box display="flex" justifyContent="center" gap={0.5}><IconButton onClick={() => handleEditEmployee(employee)} sx={{ color: themePurple }}><EditIcon /></IconButton><IconButton onClick={() => handleDeleteEmployee(employee.user_id)} sx={{ color: themeOrange }}><DeleteIcon /></IconButton></Box></TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ p: 2, borderTop: "1px solid rgba(224, 224, 224, 1)" }}>
        {!loading && (
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <FormControl variant="outlined" size="small">
                <Select value={rowsPerPage} onChange={handleRowsPerPageChange} sx={{ backgroundColor: themePurple, color: "white", borderRadius: "4px", "&:hover": { backgroundColor: themePurpleHover }, "& .MuiOutlinedInput-notchedOutline": { border: "none" }, "& .MuiSvgIcon-root": { color: "white" } }}>
                  {[10, 25, 50, 100].map((value) => (<MenuItem key={value} value={value}>{value}</MenuItem>))}
                </Select>
              </FormControl>
              <Typography variant="body2" color="text.secondary">{`1 to ${Math.min(rowsPerPage, filteredEmployees.length)} of ${filteredEmployees.length}`}</Typography>
            </Box>
            <Pagination count={Math.ceil(filteredEmployees.length / rowsPerPage)} page={currentPage + 1} onChange={handlePaginationChange} showFirstButton showLastButton sx={{ "& .MuiPaginationItem-root": { borderRadius: "4px" }, "& .MuiPaginationItem-page.Mui-selected": { backgroundColor: themePurple, color: "white" } }} />
          </Box>
        )}
      </Box>
    </Box>
  );
}