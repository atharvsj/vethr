
// import { useState, useEffect } from "react";
// import {
//   Box, Typography, TextField, Button, Grid, FormControl,
//   InputLabel, Select, MenuItem, CircularProgress
// } from "@mui/material";
// import axiosInstance from "../utils/axiosInstance";

// // Helper to format dates from various formats to 'YYYY-MM-DD' for input fields
// const formatDateForInput = (dateString) => {
//   if (!dateString || typeof dateString !== 'string') return '';
//   // Handles 'DD-MM-YYYY'
//   const parts = dateString.split('-');
//   if (parts.length === 3 && parts[2].length === 4) {
//     return `${parts[2]}-${parts[1]}-${parts[0]}`;
//   }
//   // Handles 'YYYY-MM-DDTHH:mm:ss' from API
//   if (dateString.includes('T')) {
//     return dateString.split('T')[0];
//   }
//   return dateString;
// };

// // The component now accepts an 'onBack' prop
// const ContractTopBar = ({ onBack }) => {
//   const employeeId = localStorage.getItem("loggedInEmpId");

//   const [contractData, setContractData] = useState({
//     joining_date: "",
//     department_id: "",
//     designation_id: "",
//     gross_salary: "",
//     office_shift_id: "",
//     probation: "",
//     // Store these in the background for the PATCH request
//     probation_end_date: "",
//     manager: null,
//     role_description: ""
//   });

//   // State for the dynamic dropdowns
//   const [departments, setDepartments] = useState([]);
//   const [designations, setDesignations] = useState([]);
//   const [officeShifts, setOfficeShifts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Initial data fetch for contract, departments, and shifts
//   useEffect(() => {
//     if (!employeeId) {
//       setLoading(false);
//       return;
//     }

//     const fetchInitialData = async () => {
//       setLoading(true);
//       try {
//         const [contractRes, deptRes, shiftRes] = await Promise.all([
//           axiosInstance.post('api/contract_details/', { user_id: employeeId, type: 1 }),
//           axiosInstance.get('api/desig_dept_dropdown/'),
//           axiosInstance.get('api/office_shift_dropdown/')
//         ]);

//         if (contractRes.data.contract_details?.length > 0) {
//           const details = contractRes.data.contract_details[0];
//           setContractData(prev => ({
//             ...prev,
//             ...details,
//             // Map incoming API fields to our new state fields
//             joining_date: formatDateForInput(details.contract_date),
//             gross_salary: details.basic_salary,
//             probation_end_date: formatDateForInput(details.probation_end_date),
//           }));
//         }
        
//         if (deptRes.data.status === 'success') setDepartments(deptRes.data.dept_data);
//         if (shiftRes.data.status === 'success') setOfficeShifts(shiftRes.data.office_shift_data);

//       } catch (error) {
//         console.error("Failed to fetch initial data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchInitialData();
//   }, [employeeId]);
  
//   // Effect to fetch designations when department changes
//   useEffect(() => {
//       const fetchDesignations = async () => {
//         if (!contractData.department_id) {
//             setDesignations([]);
//             return;
//         };
//         try {
//             const response = await axiosInstance.get(`api/desig_dept_dropdown/?dept_id=${contractData.department_id}`);
//             if(response.data.status === 'success') {
//                 setDesignations(response.data.desig_data);
//             }
//         } catch (error) {
//             console.error("Failed to fetch designations:", error);
//             setDesignations([]);
//         }
//       }
//       fetchDesignations();
//   }, [contractData.department_id])


//   const handleDepartmentChange = (e) => {
//     setContractData(prev => ({
//         ...prev,
//         department_id: e.target.value,
//         designation_id: ""
//     }));
//   };

//   const handleChange = (e) => {
//     setContractData({ ...contractData, [e.target.name]: e.target.value });
//   };

//   const handleUpdate = async () => {
//     if (!employeeId) return alert("No user specified.");

//     const patchPayload = {
//       user_id: Number(employeeId),
//       company_id: 2,
//       type: 1,
//       department_id: Number(contractData.department_id),
//       designation_id: Number(contractData.designation_id),
//       // Map state fields back to the API's expected field names
//       basic_salary: Number(contractData.gross_salary), 
//       contract_date: contractData.joining_date,
//       office_shift_id: Number(contractData.office_shift_id),
//       probation: contractData.probation === 'Y' ? 1 : 0,
//       probation_end_date: contractData.probation_end_date,
//       manager: contractData.manager,
//       role_description: contractData.role_description,
//     };

//     try {
//       const response = await axiosInstance.patch('api/contract_details/', patchPayload);
//       if (response.data.status === 'success') {
//         alert('Contract saved successfully!');
//       } else {
//         alert(`Failed to save contract: ${response.data.message || 'Unknown error'}`);
//       }
//     } catch (error) {
//       console.error("Error saving contract:", error);
//       alert("An error occurred while saving the contract.");
//     }
//   };
  
//   if (loading) {
//     return (
//       <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
//         <CircularProgress />
//       </Box>
//     );
//   }

//   return (
//     <Box sx={{ padding: 2 }}>
//       <Typography variant="h6" gutterBottom>
//         Set Details
//       </Typography>
//       <Grid container spacing={2}>
//         <Grid item xs={12} sm={6}>
//           <TextField name="joining_date" label="Joining Date" type="date" value={contractData.joining_date || ''} onChange={handleChange} fullWidth InputLabelProps={{ shrink: true }} />
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <FormControl fullWidth>
//               <InputLabel>Department</InputLabel>
//               <Select name="department_id" label="Department" value={contractData.department_id || ''} onChange={handleDepartmentChange}>
//                 {departments.map(dept => (
//                     <MenuItem key={dept.dept_id} value={dept.dept_id}>{dept.dept_name}</MenuItem>
//                 ))}
//               </Select>
//           </FormControl>
//         </Grid>
//         <Grid item xs={12} sm={6}>
//            <FormControl fullWidth disabled={!contractData.department_id}>
//               <InputLabel>Designation</InputLabel>
//               <Select name="designation_id" label="Designation" value={contractData.designation_id || ''} onChange={handleChange}>
//                   {designations.map(desig => (
//                       <MenuItem key={desig.desig_id} value={desig.desig_id}>{desig.desig_name}</MenuItem>
//                   ))}
//               </Select>
//           </FormControl>
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <TextField name="gross_salary" label="Gross Salary" type="number" value={contractData.gross_salary || ''} onChange={handleChange} fullWidth />
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <FormControl fullWidth>
//             <InputLabel>Office Shift</InputLabel>
//             <Select name="office_shift_id" label="Office Shift" value={contractData.office_shift_id || ''} onChange={handleChange}>
//                {officeShifts.map(shift => (
//                 <MenuItem key={shift.office_shift_id} value={shift.office_shift_id}>
//                   {shift.office_shift_name}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <FormControl fullWidth>
//             <InputLabel>Probation</InputLabel>
//             <Select name="probation" label="Probation" value={contractData.probation || ''} onChange={handleChange}>
//               <MenuItem value="Y">Yes</MenuItem>
//               <MenuItem value="N">No</MenuItem>
//             </Select>
//           </FormControl>
//         </Grid>
//       </Grid>
//       {/* Container for the buttons */}
//       <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
//         <Button variant="outlined" color="secondary" onClick={onBack}>
//           Back
//         </Button>
//         <Button variant="contained" color="primary" onClick={handleUpdate}>
//           Save Contract
//         </Button>
//       </Box>
//     </Box>
//   );
// };

// export default ContractTopBar;
// import { useState, useEffect } from "react";
// import {
//   Box, Typography, TextField, Button, Grid, FormControl,
//   InputLabel, Select, MenuItem, CircularProgress
// } from "@mui/material";
// import axiosInstance from "../utils/axiosInstance";

// // Helper to format dates from various formats to 'YYYY-MM-DD' for input fields
// const formatDateForInput = (dateString) => {
//   if (!dateString || typeof dateString !== 'string') return '';
//   // Handles 'DD-MM-YYYY'
//   const parts = dateString.split('-');
//   if (parts.length === 3 && parts[2].length === 4) {
//     return `${parts[2]}-${parts[1]}-${parts[0]}`;
//   }
//   // Handles 'YYYY-MM-DDTHH:mm:ss' from API
//   if (dateString.includes('T')) {
//     return dateString.split('T')[0];
//   }
//   return dateString;
// };

// // The component now accepts an 'onBack' prop
// const ContractTopBar = ({ onBack }) => {
//   const employeeId = localStorage.getItem("loggedInEmpId");

//   const [contractData, setContractData] = useState({
//     joining_date: "",
//     department_id: "",
//     designation_id: "",
//     gross_salary: "",
//     office_shift_id: "",
//     probation: "",
//     line_manager: "", // Added state for Line Manager
//     // Fields below are not displayed but kept for structure if needed elsewhere
//     probation_end_date: "",
//     manager: null,
//     role_description: ""
//   });

//   // State for the dynamic dropdowns
//   const [departments, setDepartments] = useState([]);
//   const [designations, setDesignations] = useState([]);
//   const [officeShifts, setOfficeShifts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Initial data fetch for contract, departments, and shifts
//   useEffect(() => {
//     if (!employeeId) {
//       setLoading(false);
//       return;
//     }

//     const fetchInitialData = async () => {
//       setLoading(true);
//       try {
//         const [contractRes, deptRes, shiftRes] = await Promise.all([
//           axiosInstance.post('api/contract_details/', { user_id: employeeId, type: 1 }),
//           axiosInstance.get('api/desig_dept_dropdown/'),
//           axiosInstance.get('api/office_shift_dropdown/')
//         ]);

//         if (contractRes.data.contract_details?.length > 0) {
//           const details = contractRes.data.contract_details[0];
//           setContractData(prev => ({
//             ...prev,
//             ...details,
//             // Map incoming API fields to our state fields
//             joining_date: formatDateForInput(details.contract_date),
//             gross_salary: details.basic_salary,
//             line_manager: details.line_manager || '', // Set Line Manager from API
//             probation_end_date: formatDateForInput(details.probation_end_date),
//           }));
//         }
        
//         if (deptRes.data.status === 'success') setDepartments(deptRes.data.dept_data);
//         if (shiftRes.data.status === 'success') setOfficeShifts(shiftRes.data.office_shift_data);

//       } catch (error) {
//         console.error("Failed to fetch initial data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchInitialData();
//   }, [employeeId]);
  
//   // Effect to fetch designations when department changes
//   useEffect(() => {
//       const fetchDesignations = async () => {
//         if (!contractData.department_id) {
//             setDesignations([]);
//             return;
//         };
//         try {
//             const response = await axiosInstance.get(`api/desig_dept_dropdown/?dept_id=${contractData.department_id}`);
//             if(response.data.status === 'success') {
//                 setDesignations(response.data.desig_data);
//             }
//         } catch (error) {
//             console.error("Failed to fetch designations:", error);
//             setDesignations([]);
//         }
//       }
//       fetchDesignations();
//   }, [contractData.department_id])
  
//   if (loading) {
//     return (
//       <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
//         <CircularProgress />
//       </Box>
//     );
//   }

//   return (
//     <Box sx={{ padding: 2 }}>
//       <Typography variant="h6" gutterBottom>
//         Set Details
//       </Typography>
//       <Grid container spacing={2}>
//         <Grid item xs={12} sm={6}>
//           <TextField name="joining_date" label="Joining Date" type="date" value={contractData.joining_date || ''} fullWidth InputLabelProps={{ shrink: true }} disabled />
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <FormControl fullWidth disabled>
//               <InputLabel>Department</InputLabel>
//               <Select name="department_id" label="Department" value={contractData.department_id || ''}>
//                 {departments.map(dept => (
//                     <MenuItem key={dept.dept_id} value={dept.dept_id}>{dept.dept_name}</MenuItem>
//                 ))}
//               </Select>
//           </FormControl>
//         </Grid>
//         <Grid item xs={12} sm={6}>
//            <FormControl fullWidth disabled>
//               <InputLabel>Designation</InputLabel>
//               <Select name="designation_id" label="Designation" value={contractData.designation_id || ''}>
//                   {designations.map(desig => (
//                       <MenuItem key={desig.desig_id} value={desig.desig_id}>{desig.desig_name}</MenuItem>
//                   ))}
//               </Select>
//           </FormControl>
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <TextField name="gross_salary" label="Gross Salary" type="number" value={contractData.gross_salary || ''} fullWidth disabled />
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <FormControl fullWidth disabled>
//             <InputLabel>Office Shift</InputLabel>
//             <Select name="office_shift_id" label="Office Shift" value={contractData.office_shift_id || ''}>
//                {officeShifts.map(shift => (
//                 <MenuItem key={shift.office_shift_id} value={shift.office_shift_id}>
//                   {shift.office_shift_name}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <FormControl fullWidth disabled>
//             <InputLabel>Probation</InputLabel>
//             <Select name="probation" label="Probation" value={contractData.probation || ''}>
//               <MenuItem value="Y">Yes</MenuItem>
//               <MenuItem value="N">No</MenuItem>
//             </Select>
//           </FormControl>
//         </Grid>
//         {/* New read-only Line Manager field */}
//         <Grid item xs={12} sm={6}>
//           <TextField name="line_manager" label="Line Manager" value={contractData.line_manager || ''} fullWidth disabled />
//         </Grid>
//       </Grid>
//       {/* Container for the Back button */}
//       <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
//         <Button variant="outlined" color="secondary" onClick={onBack}>
//           Back
//         </Button>
//       </Box>
//     </Box>
//   );
// };

// export default ContractTopBar;
// import { useState, useEffect } from "react";
// import {
//   Box, Typography, TextField, Button, Grid, FormControl,
//   InputLabel, Select, MenuItem, CircularProgress
// } from "@mui/material";
// import axiosInstance from "../utils/axiosInstance";

// // Helper to format dates from various formats to 'YYYY-MM-DD' for input fields
// const formatDateForInput = (dateString) => {
//   if (!dateString || typeof dateString !== 'string') return '';
//   // Handles 'DD-MM-YYYY'
//   const parts = dateString.split('-');
//   if (parts.length === 3 && parts[2].length === 4) {
//     return `${parts[2]}-${parts[1]}-${parts[0]}`;
//   }
//   // Handles 'YYYY-MM-DDTHH:mm:ss' from API
//   if (dateString.includes('T')) {
//     return dateString.split('T')[0];
//   }
//   return dateString;
// };

// // The component now accepts an 'onBack' prop
// const ContractTopBar = ({ onBack }) => {
//   const employeeId = localStorage.getItem("loggedInEmpId");

//   const [contractData, setContractData] = useState({
//     joining_date: "",
//     department_id: "",
//     designation_id: "",
//     gross_salary: "",
//     office_shift_id: "",
//     probation: "",
//     line_manager: "",
//     probation_end_date: "",
//     manager: null,
//     role_description: ""
//   });

//   // State for the dynamic dropdowns
//   const [departments, setDepartments] = useState([]);
//   const [designations, setDesignations] = useState([]);
//   const [officeShifts, setOfficeShifts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Initial data fetch for contract, departments, and shifts
//   useEffect(() => {
//     if (!employeeId) {
//       setLoading(false);
//       return;
//     }

//     const fetchInitialData = async () => {
//       setLoading(true);
//       try {
//         const [contractRes, deptRes, shiftRes] = await Promise.all([
//           axiosInstance.post('api/contract_details/', { user_id: employeeId, type: 1 }),
//           axiosInstance.get('api/desig_dept_dropdown/'),
//           axiosInstance.get('api/office_shift_dropdown/')
//         ]);

//         if (contractRes.data.contract_details?.length > 0) {
//           const details = contractRes.data.contract_details[0];
//           setContractData(prev => ({
//             ...prev,
//             joining_date: formatDateForInput(details.contract_date),
//             department_id: details.department_id || "",
//             designation_id: details.designation_id || "",
//             gross_salary: details.gross_salary || "", // Correctly mapping gross_salary
//             office_shift_id: details.office_shift_id || "",
//             probation: details.probation || "",
//             line_manager: details.manager_name || '',
//             probation_end_date: formatDateForInput(details.probation_end_date),
//           }));
//         }
        
//         if (deptRes.data.status === 'success') setDepartments(deptRes.data.dept_data);
//         if (shiftRes.data.status === 'success') setOfficeShifts(shiftRes.data.office_shift_data);

//       } catch (error) {
//         console.error("Failed to fetch initial data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchInitialData();
//   }, [employeeId]);
  
//   // Effect to fetch designations when department changes
//   useEffect(() => {
//       const fetchDesignations = async () => {
//         if (!contractData.department_id) {
//             setDesignations([]);
//             return;
//         };
//         try {
//             const response = await axiosInstance.get(`api/desig_dept_dropdown/?dept_id=${contractData.department_id}`);
//             if(response.data.status === 'success') {
//                 setDesignations(response.data.desig_data);
//             }
//         } catch (error) {
//             console.error("Failed to fetch designations:", error);
//             setDesignations([]);
//         }
//       }
//       fetchDesignations();
//   }, [contractData.department_id])
  
//   if (loading) {
//     return (
//       <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
//         <CircularProgress />
//       </Box>
//     );
//   }

//   // Style object to make disabled Select fields look normal
//   const readOnlySelectStyles = {
//     '&.Mui-disabled': {
//       color: 'rgba(0, 0, 0, 0.87)', // Black text
//       WebkitTextFillColor: 'rgba(0, 0, 0, 0.87)',
//     },
//     '& .MuiOutlinedInput-notchedOutline': {
//       borderColor: 'rgba(0, 0, 0, 0.23)', // Standard border color
//     },
//     '& .MuiSelect-icon.Mui-disabled': {
//       display: 'none', // Hide dropdown arrow
//     },
//   };

//   return (
//     <Box sx={{ padding: 2 }}>
//       <Typography variant="h6" gutterBottom>
//         Set Details
//       </Typography>
//       <Grid container spacing={2}>
//         <Grid item xs={12} sm={6}>
//           <TextField name="joining_date" label="Joining Date" type="date" value={contractData.joining_date || ''} fullWidth InputLabelProps={{ shrink: true }} InputProps={{ readOnly: true }} />
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <FormControl fullWidth disabled>
//               <InputLabel>Department</InputLabel>
//               <Select name="department_id" label="Department" value={contractData.department_id || ''} sx={readOnlySelectStyles}>
//                 {departments.map(dept => (
//                     <MenuItem key={dept.dept_id} value={dept.dept_id}>{dept.dept_name}</MenuItem>
//                 ))}
//               </Select>
//           </FormControl>
//         </Grid>
//         <Grid item xs={12} sm={6}>
//            <FormControl fullWidth disabled>
//               <InputLabel>Designation</InputLabel>
//               <Select name="designation_id" label="Designation" value={contractData.designation_id || ''} sx={readOnlySelectStyles}>
//                   {designations.map(desig => (
//                       <MenuItem key={desig.desig_id} value={desig.desig_id}>{desig.desig_name}</MenuItem>
//                   ))}
//               </Select>
//           </FormControl>
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <TextField name="gross_salary" label="Gross Salary" type="number" value={contractData.gross_salary || ''} fullWidth InputProps={{ readOnly: true }} />
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <FormControl fullWidth disabled>
//             <InputLabel>Office Shift</InputLabel>
//             <Select name="office_shift_id" label="Office Shift" value={contractData.office_shift_id || ''} sx={readOnlySelectStyles}>
//                {officeShifts.map(shift => (
//                 <MenuItem key={shift.office_shift_id} value={shift.office_shift_id}>
//                   {shift.office_shift_name}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <FormControl fullWidth disabled>
//             <InputLabel>Probation</InputLabel>
//             <Select name="probation" label="Probation" value={contractData.probation || ''} sx={readOnlySelectStyles}>
//               <MenuItem value="Y">Yes</MenuItem>
//               <MenuItem value="N">No</MenuItem>
//             </Select>
//           </FormControl>
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <TextField name="line_manager" label="Line Manager" value={contractData.line_manager || ''} fullWidth InputProps={{ readOnly: true }} />
//         </Grid>
//       </Grid>
//       {/* Container for the Back button */}
//       <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
//         <Button variant="outlined" color="secondary" onClick={onBack}>
//           Back
//         </Button>
//       </Box>
//     </Box>
//   );
// };

// export default ContractTopBar;
// import { useState, useEffect } from "react";
// import {
//   Box, Typography, TextField, Button, Grid, FormControl,
//   InputLabel, Select, MenuItem, CircularProgress
// } from "@mui/material";
// import axiosInstance from "../utils/axiosInstance";

// // Helper to format dates from various formats to 'YYYY-MM-DD'
// const formatDateForInput = (dateString) => {
//   if (!dateString || typeof dateString !== 'string') return '';
//   const parts = dateString.split('-');
//   if (parts.length === 3 && parts[2].length === 4) {
//     return `${parts[2]}-${parts[1]}-${parts[0]}`;
//   }
//   if (dateString.includes('T')) {
//     return dateString.split('T')[0];
//   }
//   return dateString;
// };

// const ContractTopBar = ({ onBack }) => {
//   const employeeId = localStorage.getItem("loggedInEmpId");

//   const [contractData, setContractData] = useState({
//     joining_date: "",
//     department_id: "",
//     designation_id: "",
//     gross_salary: "",
//     office_shift_id: "",
//     probation: "",
//     line_manager: "",
//     probation_end_date: "",
//   });

//   const [departments, setDepartments] = useState([]);
//   const [designations, setDesignations] = useState([]);
//   const [officeShifts, setOfficeShifts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Read-only styles (keep black outline)
//   const readOnlyStyles = {
//     pointerEvents: "none",
//     "& .MuiOutlinedInput-notchedOutline": {
//       borderColor: "rgba(0, 0, 0, 0.87)",
//     },
//     "& .MuiSelect-icon": {
//       display: "none",
//     },
//   };

//   useEffect(() => {
//     if (!employeeId) {
//       setLoading(false);
//       return;
//     }

//     const fetchInitialData = async () => {
//       setLoading(true);
//       try {
//         const [contractRes, deptRes, shiftRes] = await Promise.all([
//           axiosInstance.post("api/contract_details/", { user_id: employeeId, type: 1 }),
//           axiosInstance.get("api/desig_dept_dropdown/"),
//           axiosInstance.get("api/office_shift_dropdown/")
//         ]);

//         if (contractRes.data.contract_details?.length > 0) {
//           const details = contractRes.data.contract_details[0];
//           setContractData(prev => ({
//             ...prev,
//             joining_date: formatDateForInput(details.contract_date),
//             department_id: details.department_id || "",
//             designation_id: details.designation_id || "",
//             gross_salary: details.gross_salary || "",
//             office_shift_id: details.office_shift_id || "",
//             probation: details.probation || "",
//             line_manager: details.manager_name || "",
//             probation_end_date: formatDateForInput(details.probation_end_date),
//           }));
//         }

//         if (deptRes.data.status === "success") setDepartments(deptRes.data.dept_data);
//         if (shiftRes.data.status === "success") setOfficeShifts(shiftRes.data.office_shift_data);

//       } catch (error) {
//         console.error("Failed to fetch initial data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchInitialData();
//   }, [employeeId]);

//   useEffect(() => {
//     const fetchDesignations = async () => {
//       if (!contractData.department_id) {
//         setDesignations([]);
//         return;
//       }
//       try {
//         const response = await axiosInstance.get(`api/desig_dept_dropdown/?dept_id=${contractData.department_id}`);
//         if (response.data.status === "success") {
//           setDesignations(response.data.desig_data);
//         }
//       } catch (error) {
//         console.error("Failed to fetch designations:", error);
//         setDesignations([]);
//       }
//     };
//     fetchDesignations();
//   }, [contractData.department_id]);

//   if (loading) {
//     return (
//       <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
//         <CircularProgress />
//       </Box>
//     );
//   }

//   return (
//     <Box sx={{ padding: 2 }}>
//       <Typography variant="h6" gutterBottom>
//         Set Details
//       </Typography>
//       <Grid container spacing={2}>
//         <Grid item xs={12} sm={6}>
//           <TextField
//             name="joining_date"
//             label="Joining Date"
//             type="date"
//             value={contractData.joining_date || ""}
//             fullWidth
//             InputLabelProps={{ shrink: true }}
//             InputProps={{ readOnly: true }}
//             sx={readOnlyStyles}
//           />
//         </Grid>

//         <Grid item xs={12} sm={6}>
//           <FormControl fullWidth sx={readOnlyStyles}>
//             <InputLabel>Department</InputLabel>
//             <Select
//               name="department_id"
//               value={contractData.department_id || ""}
//               onChange={() => {}}
//             >
//               {departments.map(dept => (
//                 <MenuItem key={dept.dept_id} value={dept.dept_id}>
//                   {dept.dept_name}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//         </Grid>

//         <Grid item xs={12} sm={6}>
//           <FormControl fullWidth sx={readOnlyStyles}>
//             <InputLabel>Designation</InputLabel>
//             <Select
//               name="designation_id"
//               value={contractData.designation_id || ""}
//               onChange={() => {}}
//             >
//               {designations.map(desig => (
//                 <MenuItem key={desig.desig_id} value={desig.desig_id}>
//                   {desig.desig_name}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//         </Grid>

//         <Grid item xs={12} sm={6}>
//           <TextField
//             name="gross_salary"
//             label="Gross Salary"
//             type="number"
//             value={contractData.gross_salary || ""}
//             fullWidth
//             InputProps={{ readOnly: true }}
//             sx={readOnlyStyles}
//           />
//         </Grid>

//         <Grid item xs={12} sm={6}>
//           <FormControl fullWidth sx={readOnlyStyles}>
//             <InputLabel>Office Shift</InputLabel>
//             <Select
//               name="office_shift_id"
//               value={contractData.office_shift_id || ""}
//               onChange={() => {}}
//             >
//               {officeShifts.map(shift => (
//                 <MenuItem key={shift.office_shift_id} value={shift.office_shift_id}>
//                   {shift.office_shift_name}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//         </Grid>

//         <Grid item xs={12} sm={6}>
//           <FormControl fullWidth sx={readOnlyStyles}>
//             <InputLabel>Probation</InputLabel>
//             <Select
//               name="probation"
//               value={contractData.probation || ""}
//               onChange={() => {}}
//             >
//               <MenuItem value="Y">Yes</MenuItem>
//               <MenuItem value="N">No</MenuItem>
//             </Select>
//           </FormControl>
//         </Grid>

//         <Grid item xs={12} sm={6}>
//           <TextField
//             name="line_manager"
//             label="Line Manager"
//             value={contractData.line_manager || ""}
//             fullWidth
//             InputProps={{ readOnly: true }}
//             sx={readOnlyStyles}
//           />
//         </Grid>
//       </Grid>

//       <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
//         <Button variant="outlined" color="secondary" onClick={onBack}>
//           Back
//         </Button>
//       </Box>
//     </Box>
//   );
// };

// export default ContractTopBar;
import { useState, useEffect } from "react";
import {
  Box, Typography, TextField, Button, Grid, FormControl,
  InputLabel, Select, MenuItem, CircularProgress
} from "@mui/material";
import axiosInstance from "../utils/axiosInstance";

// Helper to format dates from various formats to 'YYYY-MM-DD'
const formatDateForInput = (dateString) => {
  if (!dateString || typeof dateString !== 'string') return '';
  const parts = dateString.split('-');
  if (parts.length === 3 && parts[2].length === 4) {
    return `${parts[2]}-${parts[1]}-${parts[0]}`;
  }
  if (dateString.includes('T')) {
    return dateString.split('T')[0];
  }
  return dateString;
};

const ContractTopBar = ({ onBack }) => {
  const employeeId = localStorage.getItem("loggedInEmpId");

  const [contractData, setContractData] = useState({
    joining_date: "",
    department_id: "",
    designation_id: "",
    gross_salary: "",
    office_shift_id: "",
    probation: "",
    line_manager: "",
    probation_end_date: "",
  });

  const [departments, setDepartments] = useState([]);
  const [designations, setDesignations] = useState([]);
  const [officeShifts, setOfficeShifts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Styles to make outlined fields appear normal but be non-interactive.
  const readOnlyStyles = {
    pointerEvents: "none", // Disables mouse interactions
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "rgba(0, 0, 0, 0.23) !important", // Ensures a standard border color
    },
    "& .MuiInputBase-input.Mui-disabled": {
        WebkitTextFillColor: "rgba(0, 0, 0, 0.87)", // Keeps text color black on disabled fields
         color: "rgba(0, 0, 0, 0.87)",
    },
    "& .MuiSelect-icon.Mui-disabled": {
      display: "none", // Hides the dropdown arrow
    },
  };

  useEffect(() => {
    if (!employeeId) {
      setLoading(false);
      return;
    }

    const fetchInitialData = async () => {
      setLoading(true);
      try {
        const [contractRes, deptRes, shiftRes] = await Promise.all([
          axiosInstance.post("api/contract_details/", { user_id: employeeId, type: 1 }),
          axiosInstance.get("api/desig_dept_dropdown/"),
          axiosInstance.get("api/office_shift_dropdown/")
        ]);

        if (contractRes.data.contract_details?.length > 0) {
          const details = contractRes.data.contract_details[0];
          setContractData(prev => ({
            ...prev,
            joining_date: formatDateForInput(details.contract_date),
            department_id: details.department_id || "",
            designation_id: details.designation_id || "",
            gross_salary: details.gross_salary || "",
            office_shift_id: details.office_shift_id || "",
            probation: details.probation || "",
            line_manager: details.manager_name || "",
            probation_end_date: formatDateForInput(details.probation_end_date),
          }));
        }

        if (deptRes.data.status === "success") setDepartments(deptRes.data.dept_data);
        if (shiftRes.data.status === "success") setOfficeShifts(shiftRes.data.office_shift_data);

      } catch (error) {
        console.error("Failed to fetch initial data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, [employeeId]);

  useEffect(() => {
    const fetchDesignations = async () => {
      if (!contractData.department_id) {
        setDesignations([]);
        return;
      }
      try {
        const response = await axiosInstance.get(`api/desig_dept_dropdown/?dept_id=${contractData.department_id}`);
        if (response.data.status === "success") {
          setDesignations(response.data.desig_data);
        }
      } catch (error) {
        console.error("Failed to fetch designations:", error);
        setDesignations([]);
      }
    };
    fetchDesignations();
  }, [contractData.department_id]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h6" gutterBottom>
        Set Details
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          {/* This is the reference field */}
          <TextField
            label="Joining Date"
            type="date"
            value={contractData.joining_date || ""}
            fullWidth
            InputLabelProps={{ shrink: true }}
            disabled // Use disabled to make it truly read-only
            sx={readOnlyStyles}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          {/* Apply same props to this FormControl */}
          <FormControl fullWidth disabled sx={readOnlyStyles}>
            <InputLabel>Department</InputLabel>
            <Select
              value={contractData.department_id || ""}
              label="Department"
            >
              {departments.map(dept => (
                <MenuItem key={dept.dept_id} value={dept.dept_id}>
                  {dept.dept_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth disabled sx={readOnlyStyles}>
            <InputLabel>Designation</InputLabel>
            <Select
              value={contractData.designation_id || ""}
              label="Designation"
            >
              {designations.map(desig => (
                <MenuItem key={desig.desig_id} value={desig.desig_id}>
                  {desig.desig_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Gross Salary"
            type="number"
            value={contractData.gross_salary || ""}
            fullWidth
            disabled // Use disabled for consistency
            sx={readOnlyStyles}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth disabled sx={readOnlyStyles}>
            <InputLabel>Office Shift</InputLabel>
            <Select
              value={contractData.office_shift_id || ""}
              label="Office Shift"
            >
              {officeShifts.map(shift => (
                <MenuItem key={shift.office_shift_id} value={shift.office_shift_id}>
                  {shift.office_shift_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth disabled sx={readOnlyStyles}>
            <InputLabel>Probation</InputLabel>
            <Select
              value={contractData.probation || ""}
              label="Probation"
            >
              <MenuItem value="Y">Yes</MenuItem>
              <MenuItem value="N">No</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Line Manager"
            value={contractData.line_manager || ""}
            fullWidth
            disabled // Use disabled for consistency
            sx={readOnlyStyles}
          />
        </Grid>
      </Grid>

      <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
        <Button variant="outlined" color="secondary" onClick={onBack}>
          Back
        </Button>
      </Box>
    </Box>
  );
};

export default ContractTopBar;
