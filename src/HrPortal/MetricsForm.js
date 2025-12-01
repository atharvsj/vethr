// import React, { useState } from "react";
// import { Box, Grid, Paper, TextField, Typography, Button, MenuItem } from "@mui/material";
// import axios from "axios";
// import Swal from "sweetalert2";

// const MetricsForm = () => {
//   const [formData, setFormData] = useState({
//     month: "",
//     year: "",
//     total_revenue: "",
//     employee_contribution: "",
//     average: "",
//     total_salary: "",
//     fixed_cost_employee: "",
//     total_cost_employee: "",
//     monthly_total_salary: "",
//     monthly_expenses: "",
//     total_employee_cost: "",
//     per_employee_cost: "",
//     per_revenue: "",
//     exceptional: "",
//     exceeds_expectations: "",
//     meet_expectations: "",
//     below_expectations: "",
//     unsatisfactory: "",
//     department_attrition_rate: "",
//     division_attrition_rate: "",
//     opened_recruitment_tracker: "",
//     filed_recruitment_tracker: "",
//     in_process_recruitment_tracker: "",
//     level1_employee: "",
//     level2_employee: "",
//     level3_employee: "",
//     level4_employee: "",
    
//   });

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post(
//         "https://tdtlworld.com/hrms-backend/admin_dashboard/",
//         formData
//       );

//       if (response.data.status === "success") {
//         Swal.fire({
//           icon: "success",
//           title: "Success!",
//           text: response.data.message,
//           confirmButtonColor: "#1976d2",
//         });
//         console.log("API Response:", response.data);
//       } else {
//         Swal.fire({
//           icon: "warning",
//           title: "Warning!",
//           text: response.data.message || "Something went wrong",
//           confirmButtonColor: "#1976d2",
//         });
//       }
//     } catch (error) {
//       console.error("API Error:", error);
//       Swal.fire({
//         icon: "error",
//         title: "Error!",
//         text: error.response?.data?.message || "Failed to submit metrics",
//         confirmButtonColor: "#d33",
//       });
//     }
//   };

//   return (
//     <Paper elevation={3} sx={{ p: 3, maxWidth: 1000, mx: "auto" }}>
//       <Typography variant="h5" gutterBottom fontWeight="bold">
//         Admin Dashboard Metrics Form
//       </Typography>
//       <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
//         <Grid container spacing={2}>
//           {Object.keys(formData).map((key) => (
//             <Grid item xs={12} sm={6} md={4} key={key}>
//               <TextField
//                 fullWidth
//                 label={key
//                   .replace(/_/g, " ")
//                   .replace(/\b\w/g, (l) => l.toUpperCase())}
//                 name={key}
//                 type={
//                   key === "created_at"
//                     ? "datetime-local"
//                     : isNaN(formData[key]) || formData[key] === ""
//                     ? "text"
//                     : "number"
//                 }
//                 value={formData[key]}
//                 onChange={handleChange}
//                 variant="outlined"
//                 InputLabelProps={key === "created_at" ? { shrink: true } : {}}
//               />
//             </Grid>
//           ))}
//         </Grid>
//         <Box sx={{ mt: 3, textAlign: "center" }}>
//           <Button type="submit" variant="contained" color="primary">
//             Save Metrics
//           </Button>
//         </Box>
//       </Box>
//     </Paper>
//   );
// };

// export default MetricsForm;








// import React, { useState } from "react";
// import {
//   Box,
//   Grid,
//   Paper,
//   TextField,
//   Typography,
//   Button,
//   MenuItem,
// } from "@mui/material";
// import axios from "axios";
// import Swal from "sweetalert2";

// const MetricsForm = () => {
//   const [formData, setFormData] = useState({
//     month: "",
//     year: "",
//     total_revenue: "",
//     employee_contribution: "",
//     average: "",
//     total_salary: "",
//     fixed_cost_employee: "",
//     total_cost_employee: "",
//     monthly_total_salary: "",
//     monthly_expenses: "",
//     total_employee_cost: "",
//     per_employee_cost: "",
//     per_revenue: "",
//     exceptional: "",
//     exceeds_expectations: "",
//     meet_expectations: "",
//     below_expectations: "",
//     unsatisfactory: "",
//     department_attrition_rate: "",
//     division_attrition_rate: "",
//     opened_recruitment_tracker: "",
//     filed_recruitment_tracker: "",
//     in_process_recruitment_tracker: "",
//     level1_employee: "",
//     level2_employee: "",
//     level3_employee: "",
//     level4_employee: "",
//   });

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post(
//         "https://tdtlworld.com/hrms-backend/admin_dashboard/",
//         formData
//       );

//       if (response.data.status === "success") {
//         Swal.fire({
//           icon: "success",
//           title: "Success!",
//           text: response.data.message,
//           confirmButtonColor: "#1976d2",
//         });
//         console.log("API Response:", response.data);
//       } else {
//         Swal.fire({
//           icon: "warning",
//           title: "Warning!",
//           text: response.data.message || "Something went wrong",
//           confirmButtonColor: "#1976d2",
//         });
//       }
//     } catch (error) {
//       console.error("API Error:", error);
//       Swal.fire({
//         icon: "error",
//         title: "Error!",
//         text: error.response?.data?.message || "Failed to submit metrics",
//         confirmButtonColor: "#d33",
//       });
//     }
//   };

//   return (
//     <Paper elevation={3} sx={{ p: 3, maxWidth: 1000, mx: "auto" }}>
//       <Typography variant="h5" gutterBottom fontWeight="bold">
//         Admin Dashboard Metrics Form
//       </Typography>
//       <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
//         <Grid container spacing={2}>
//           {Object.keys(formData).map((key) => (
//             <Grid item xs={12} sm={6} md={4} key={key}>
//               {key === "month" ? (
//                 <TextField
//                   select
//                   fullWidth
//                   label="Month"
//                   name="month"
//                   value={formData.month}
//                   onChange={handleChange}
//                   variant="outlined"
//                 >
//                   {[
//                     "January",
//                     "February",
//                     "March",
//                     "April",
//                     "May",
//                     "June",
//                     "July",
//                     "August",
//                     "September",
//                     "October",
//                     "November",
//                     "December",
//                   ].map((month, index) => (
//                     <MenuItem key={index + 1} value={index + 1}>
//                       {month}
//                     </MenuItem>
//                   ))}
//                 </TextField>
//               ) : key === "year" ? (
//                 <TextField
//                   select
//                   fullWidth
//                   label="Year"
//                   name="year"
//                   value={formData.year}
//                   onChange={handleChange}
//                   variant="outlined"
//                 >
//                   {Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i).map(
//                     (year) => (
//                       <MenuItem key={year} value={year}>
//                         {year}
//                       </MenuItem>
//                     )
//                   )}
//                 </TextField>
//               ) : (
//                 <TextField
//                   fullWidth
//                   label={key
//                     .replace(/_/g, " ")
//                     .replace(/\b\w/g, (l) => l.toUpperCase())}
//                   name={key}
//                   type={
//                     key === "created_at"
//                       ? "datetime-local"
//                       : isNaN(formData[key]) || formData[key] === ""
//                       ? "text"
//                       : "number"
//                   }
//                   value={formData[key]}
//                   onChange={handleChange}
//                   variant="outlined"
//                   InputLabelProps={key === "created_at" ? { shrink: true } : {}}
//                 />
//               )}
//             </Grid>
//           ))}
//         </Grid>
//         <Box sx={{ mt: 3, textAlign: "center" }}>
//           <Button type="submit" variant="contained" color="primary">
//             Save Metrics
//           </Button>
//         </Box>
//       </Box>
//     </Paper>
//   );
// };

// export default MetricsForm;













// import React, { useState } from "react";
// import {
//   Box,
//   Grid,
//   Paper,
//   TextField,
//   Typography,
//   Button,
//   MenuItem,
// } from "@mui/material";
// import axios from "axios";
// import Swal from "sweetalert2";

// const MetricsForm = () => {
//   const [formData, setFormData] = useState({
//     month: "",
//     year: "",
//     total_revenue: "",
//     employee_contribution: "",
//     average: "",
//     total_salary: "",
//     fixed_cost_employee: "",
//     total_cost_employee: "",
//     monthly_total_salary: "",
//     monthly_expenses: "",
//     total_employee_cost: "",
//     per_employee_cost: "",
//     per_revenue: "",
//     exceptional: "",
//     exceeds_expectations: "",
//     meet_expectations: "",
//     below_expectations: "",
//     unsatisfactory: "",
//     department_attrition_rate: "",
//     division_attrition_rate: "",
//     opened_recruitment_tracker: "",
//     filed_recruitment_tracker: "",
//     in_process_recruitment_tracker: "",
//     level1_employee: "",
//     level2_employee: "",
//     level3_employee: "",
//     level4_employee: "",
//   });

//   const [errors, setErrors] = useState({});

//   // Fields that should only accept numbers and decimals
//   const numericFields = [
//     "total_revenue",
//     "employee_contribution",
//     "average",
//     "total_salary",
//     "fixed_cost_employee",
//     "total_cost_employee",
//     "monthly_total_salary",
//     "monthly_expenses",
//     "total_employee_cost",
//     "per_employee_cost",
//     "per_revenue",
//     "exceptional",
//     "exceeds_expectations",
//     "meet_expectations",
//     "below_expectations",
//     "unsatisfactory",
//     "department_attrition_rate",
//     "division_attrition_rate",
//     "opened_recruitment_tracker",
//     "filed_recruitment_tracker",
//     "in_process_recruitment_tracker",
//     "level1_employee",
//     "level2_employee",
//     "level3_employee",
//     "level4_employee",
//   ];

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));

//     // Clear error for the field if it becomes valid
//     if (errors[name]) {
//       setErrors((prevErrors) => ({
//         ...prevErrors,
//         [name]: "",
//       }));
//     }
//   };

//   const handleNumericChange = (e) => {
//     const { name, value } = e.target;
//     // Allow empty string (for initial state) or numbers and a single decimal point
//     if (value === "" || /^-?\d*\.?\d*$/.test(value)) {
//       setFormData((prevData) => ({
//         ...prevData,
//         [name]: value,
//       }));
//       // Clear error for the field if it becomes valid
//       if (errors[name]) {
//         setErrors((prevErrors) => ({
//           ...prevErrors,
//           [name]: "",
//         }));
//       }
//     } else {
//       setErrors((prevErrors) => ({
//         ...prevErrors,
//         [name]: "Only numbers and decimals are allowed.",
//       }));
//     }
//   };

//   const validateForm = () => {
//     const newErrors = {};
//     let isValid = true;

//     // Basic required field validation (can be expanded)
//     // For simplicity, let's assume all fields are required for this example.
//     Object.keys(formData).forEach((key) => {
//       if (formData[key] === "") {
//         newErrors[key] = "This field is required.";
//         isValid = false;
//       }
//     });

//     // Specific numeric validation for fields that should be numbers
//     numericFields.forEach((key) => {
//       if (formData[key] !== "" && !/^-?\d*\.?\d*$/.test(formData[key])) {
//         newErrors[key] = "Only numbers and decimals are allowed.";
//         isValid = false;
//       }
//     });

//     setErrors(newErrors);
//     return isValid;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!validateForm()) {
//       Swal.fire({
//         icon: "error",
//         title: "Validation Error!",
//         text: "Please correct the errors in the form.",
//         confirmButtonColor: "#d33",
//       });
//       return;
//     }

//     try {
//       const response = await axios.post(
//         "https://tdtlworld.com/hrms-backend/admin_dashboard/",
//         formData
//       );

//       if (response.data.status === "success") {
//         Swal.fire({
//           icon: "success",
//           title: "Success!",
//           text: response.data.message,
//           confirmButtonColor: "#1976d2",
//         });
//         console.log("API Response:", response.data);
//         // Optionally clear the form after successful submission
//         setFormData({
//           month: "",
//           year: "",
//           total_revenue: "",
//           employee_contribution: "",
//           average: "",
//           total_salary: "",
//           fixed_cost_employee: "",
//           total_cost_employee: "",
//           monthly_total_salary: "",
//           monthly_expenses: "",
//           total_employee_cost: "",
//           per_employee_cost: "",
//           per_revenue: "",
//           exceptional: "",
//           exceeds_expectations: "",
//           meet_expectations: "",
//           below_expectations: "",
//           unsatisfactory: "",
//           department_attrition_rate: "",
//           division_attrition_rate: "",
//           opened_recruitment_tracker: "",
//           filed_recruitment_tracker: "",
//           in_process_recruitment_tracker: "",
//           level1_employee: "",
//           level2_employee: "",
//           level3_employee: "",
//           level4_employee: "",
//         });
//         setErrors({}); // Clear errors too
//       } else {
//         Swal.fire({
//           icon: "warning",
//           title: "Warning!",
//           text: response.data.message || "Something went wrong",
//           confirmButtonColor: "#1976d2",
//         });
//       }
//     } catch (error) {
//       console.error("API Error:", error);
//       Swal.fire({
//         icon: "error",
//         title: "Error!",
//         text: error.response?.data?.message || "Failed to submit metrics",
//         confirmButtonColor: "#d33",
//       });
//     }
//   };

//   return (
//     <Paper elevation={3} sx={{ p: 3, maxWidth: 1000, mx: "auto" }}>
//       <Typography variant="h5" gutterBottom fontWeight="bold">
//         Admin Dashboard Metrics Form
//       </Typography>
//       <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
//         <Grid container spacing={2}>
//           {Object.keys(formData).map((key) => (
//             <Grid item xs={12} sm={6} md={4} key={key}>
//               {key === "month" ? (
//                 <TextField
//                   select
//                   fullWidth
//                   label="Month"
//                   name="month"
//                   value={formData.month}
//                   onChange={handleChange}
//                   variant="outlined"
//                   error={!!errors.month}
//                   helperText={errors.month}
//                 >
//                   {[
//                     "January",
//                     "February",
//                     "March",
//                     "April",
//                     "May",
//                     "June",
//                     "July",
//                     "August",
//                     "September",
//                     "October",
//                     "November",
//                     "December",
//                   ].map((month, index) => (
//                     <MenuItem key={index + 1} value={index + 1}>
//                       {month}
//                     </MenuItem>
//                   ))}
//                 </TextField>
//               ) : key === "year" ? (
//                 <TextField
//                   select
//                   fullWidth
//                   label="Year"
//                   name="year"
//                   value={formData.year}
//                   onChange={handleChange}
//                   variant="outlined"
//                   error={!!errors.year}
//                   helperText={errors.year}
//                 >
//                   {Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i).map(
//                     (year) => (
//                       <MenuItem key={year} value={year}>
//                         {year}
//                       </MenuItem>
//                     )
//                   )}
//                 </TextField>
//               ) : (
//                 <TextField
//                   fullWidth
//                   label={key
//                     .replace(/_/g, " ")
//                     .replace(/\b\w/g, (l) => l.toUpperCase())}
//                   name={key}
//                   // Determine input type dynamically. 'text' for all fields, but with pattern validation.
//                   // 'number' type can be problematic for allowing decimals and preventing invalid inputs.
//                   type="text"
//                   value={formData[key]}
//                   onChange={numericFields.includes(key) ? handleNumericChange : handleChange}
//                   variant="outlined"
//                   error={!!errors[key]}
//                   helperText={errors[key]}
//                 />
//               )}
//             </Grid>
//           ))}
//         </Grid>
//         <Box sx={{ mt: 3, textAlign: "center" }}>
//           <Button type="submit" variant="contained" color="primary">
//             Save Metrics
//           </Button>
//         </Box>
//       </Box>
//     </Paper>
//   );
// };

// export default MetricsForm;























// import React, { useState } from "react";
// import {
//   Box,
//   Grid,
//   Paper,
//   TextField,
//   Typography,
//   Button,
//   MenuItem,
// } from "@mui/material";
// import axios from "axios";
// import Swal from "sweetalert2";

// const MetricsForm = () => {
//   // Initial state for the form data, all fields are empty
//   const initialFormData = {
//     month: "",
//     year: "",
//     total_revenue: "",
//     employee_contribution: "",
//     average: "",
//     total_salary: "",
//     fixed_cost_employee: "",
//     total_cost_employee: "",
//     monthly_total_salary: "",
//     monthly_expenses: "",
//     total_employee_cost: "",
//     per_employee_cost: "",
//     per_revenue: "",
//     exceptional: "",
//     exceeds_expectations: "",
//     meet_expectations: "",
//     below_expectations: "",
//     unsatisfactory: "",
//     department_attrition_rate: "",
//     division_attrition_rate: "",
//     opened_recruitment_tracker: "",
//     filed_recruitment_tracker: "",
//     in_process_recruitment_tracker: "",
//     level1_employee: "",
//     level2_employee: "",
//     level3_employee: "",
//     level4_employee: "",
//   };

//   const [formData, setFormData] = useState(initialFormData);
//   const [errors, setErrors] = useState({});

//   // Define fields that should only accept numbers and decimals
//   const numericFields = [
//     "total_revenue",
//     "employee_contribution",
//     "average",
//     "total_salary",
//     "fixed_cost_employee",
//     "total_cost_employee",
//     "monthly_total_salary",
//     "monthly_expenses",
//     "total_employee_cost",
//     "per_employee_cost",
//     "per_revenue",
//     "exceptional",
//     "exceeds_expectations",
//     "meet_expectations",
//     "below_expectations",
//     "unsatisfactory",
//     "department_attrition_rate",
//     "division_attrition_rate",
//     "opened_recruitment_tracker",
//     "filed_recruitment_tracker",
//     "in_process_recruitment_tracker",
//     "level1_employee",
//     "level2_employee",
//     "level3_employee",
//     "level4_employee",
//   ];

//   // Generic change handler for non-numeric fields (like month, year selects)
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//     // Clear error for the field if it becomes valid
//     if (errors[name]) {
//       setErrors((prevErrors) => ({
//         ...prevErrors,
//         [name]: "",
//       }));
//     }
//   };

//   // Change handler specifically for numeric fields, preventing non-numeric input
//   const handleNumericChange = (e) => {
//     const { name, value } = e.target;
//     // Regex to allow empty string, or numbers (including decimals and optional negative sign)
//     if (value === "" || /^-?\d*\.?\d*$/.test(value)) {
//       setFormData((prevData) => ({
//         ...prevData,
//         [name]: value,
//       }));
//       // Clear error for the field if it becomes valid
//       if (errors[name]) {
//         setErrors((prevErrors) => ({
//           ...prevErrors,
//           [name]: "",
//         }));
//       }
//     } else {
//       // If input is invalid, set an error message
//       setErrors((prevErrors) => ({
//         ...prevErrors,
//         [name]: "Only numbers and decimals are allowed.",
//       }));
//     }
//   };

//   // Validation function for the entire form before submission
//   const validateForm = () => {
//     const newErrors = {};
//     let isValid = true;

//     Object.keys(formData).forEach((key) => {
//       // Check for empty required fields
//       if (formData[key] === "") {
//         newErrors[key] = "This field is required.";
//         isValid = false;
//       }

//       // Specific numeric validation for fields that should be numbers
//       if (numericFields.includes(key) && formData[key] !== "") {
//         if (!/^-?\d*\.?\d*$/.test(formData[key])) {
//           newErrors[key] = "Only numbers and decimals are allowed.";
//           isValid = false;
//         }
//       }
//     });

//     setErrors(newErrors); // Update the errors state
//     return isValid; // Return true if no errors, false otherwise
//   };

//   // Handles the form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Validate the form before attempting to submit
//     if (!validateForm()) {
//       Swal.fire({
//         icon: "error",
//         title: "Validation Error!",
//         text: "Please correct the errors in the form before submitting.",
//         confirmButtonColor: "#d33",
//       });
//       return; // Stop submission if validation fails
//     }

//     try {
//       const response = await axios.post(
//         "https://tdtlworld.com/hrms-backend/admin_dashboard/",
//         formData
//       );

//       if (response.data.status === "success") {
//         Swal.fire({
//           icon: "success",
//           title: "Success!",
//           text: response.data.message,
//           confirmButtonColor: "#1976d2",
//         });
//         console.log("API Response:", response.data);

//         // --- CLEAR THE FORM AFTER SUCCESSFUL SUBMISSION ---
//         setFormData(initialFormData); // Reset to initial empty state
//         setErrors({}); // Clear any validation errors
//         // --------------------------------------------------
//       } else {
//         Swal.fire({
//           icon: "warning",
//           title: "Warning!",
//           text: response.data.message || "Something went wrong",
//           confirmButtonColor: "#1976d2",
//         });
//       }
//     } catch (error) {
//       console.error("API Error:", error);
//       Swal.fire({
//         icon: "error",
//         title: "Error!",
//         text: error.response?.data?.message || "Failed to submit metrics",
//         confirmButtonColor: "#d33",
//       });
//     }
//   };

//   return (
//     <Paper elevation={3} sx={{ p: 3, maxWidth: 1000, mx: "auto" }}>
//       <Typography variant="h5" gutterBottom fontWeight="bold">
//         Admin Dashboard Metrics Form
//       </Typography>
//       <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
//         <Grid container spacing={2}>
//           {Object.keys(formData).map((key) => (
//             <Grid item xs={12} sm={6} md={4} key={key}>
//               {key === "month" ? (
//                 <TextField
//                   select
//                   fullWidth
//                   label="Month"
//                   name="month"
//                   value={formData.month}
//                   onChange={handleChange}
//                   variant="outlined"
//                   error={!!errors.month} // Highlight if there's an error for this field
//                   helperText={errors.month} // Display the error message
//                 >
//                   {[
//                     "January",
//                     "February",
//                     "March",
//                     "April",
//                     "May",
//                     "June",
//                     "July",
//                     "August",
//                     "September",
//                     "October",
//                     "November",
//                     "December",
//                   ].map((month, index) => (
//                     // Month values are 1-indexed for backend consistency
//                     <MenuItem key={index + 1} value={index + 1}>
//                       {month}
//                     </MenuItem>
//                   ))}
//                 </TextField>
//               ) : key === "year" ? (
//                 <TextField
//                   select
//                   fullWidth
//                   label="Year"
//                   name="year"
//                   value={formData.year}
//                   onChange={handleChange}
//                   variant="outlined"
//                   error={!!errors.year} // Highlight if there's an error for this field
//                   helperText={errors.year} // Display the error message
//                 >
//                   {/* Generate last 5 years dynamically */}
//                   {Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i).map(
//                     (year) => (
//                       <MenuItem key={year} value={year}>
//                         {year}
//                       </MenuItem>
//                     )
//                   )}
//                 </TextField>
//               ) : (
//                 // Render a generic TextField for other fields
//                 <TextField
//                   fullWidth
//                   label={key // Auto-format label from snake_case to Title Case
//                     .replace(/_/g, " ")
//                     .replace(/\b\w/g, (l) => l.toUpperCase())}
//                   name={key}
//                   // For numeric fields, use type="text" and custom handler for better control.
//                   // For others, type="text" is fine.
//                   type="text"
//                   value={formData[key]}
//                   onChange={numericFields.includes(key) ? handleNumericChange : handleChange}
//                   variant="outlined"
//                   error={!!errors[key]} // Highlight if there's an error for this field
//                   helperText={errors[key]} // Display the error message
//                   // Optionally add input props for numeric pattern if type="text" is used
//                   // This is more for visual hint, handleNumericChange does the actual prevention
//                   inputProps={numericFields.includes(key) ? { pattern: "^-?\\d*\\.?\\d*$" } : {}}
//                 />
//               )}
//             </Grid>
//           ))}
//         </Grid>
//         <Box sx={{ mt: 3, textAlign: "center" }}>
//           <Button type="submit" variant="contained" color="primary">
//             Save Metrics
//           </Button>
//         </Box>
//       </Box>
//     </Paper>
//   );
// };

// export default MetricsForm;







// import React, { useState } from "react";
// import {
//   Box,
//   Grid,
//   Paper,
//   TextField,
//   Typography,
//   Button,
//   MenuItem,
//   Divider, // Added for visual separation between sections
// } from "@mui/material";
// import axios from "axios";
// import Swal from "sweetalert2";

// const MetricsForm = () => {
//   const initialFormData = {
//     month: "",
//     year: "",
//     total_revenue: "",
//     employee_contribution: "",
//     average: "",
//     total_salary: "",
//     fixed_cost_employee: "",
//     total_cost_employee: "",
//     monthly_total_salary: "",
//     monthly_expenses: "",
//     total_employee_cost: "",
//     per_employee_cost: "",
//     per_revenue: "",
//     exceptional: "",
//     exceeds_expectations: "",
//     meet_expectations: "",
//     below_expectations: "",
//     unsatisfactory: "",
//     department_attrition_rate: "",
//     division_attrition_rate: "",
//     opened_recruitment_tracker: "",
//     filed_recruitment_tracker: "",
//     in_process_recruitment_tracker: "",
//     level1_employee: "",
//     level2_employee: "",
//     level3_employee: "",
//     level4_employee: "",
//   };

//   const [formData, setFormData] = useState(initialFormData);
//   const [errors, setErrors] = useState({});

//   const numericFields = [
//     "total_revenue",
//     "employee_contribution",
//     "average",
//     "total_salary",
//     "fixed_cost_employee",
//     "total_cost_employee",
//     "monthly_total_salary",
//     "monthly_expenses",
//     "total_employee_cost",
//     "per_employee_cost",
//     "per_revenue",
//     "exceptional",
//     "exceeds_expectations",
//     "meet_expectations",
//     "below_expectations",
//     "unsatisfactory",
//     "department_attrition_rate",
//     "division_attrition_rate",
//     "opened_recruitment_tracker",
//     "filed_recruitment_tracker",
//     "in_process_recruitment_tracker",
//     "level1_employee",
//     "level2_employee",
//     "level3_employee",
//     "level4_employee",
//   ];

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//     if (errors[name]) {
//       setErrors((prevErrors) => ({
//         ...prevErrors,
//         [name]: "",
//       }));
//     }
//   };

//   const handleNumericChange = (e) => {
//     const { name, value } = e.target;
//     if (value === "" || /^-?\d*\.?\d*$/.test(value)) {
//       setFormData((prevData) => ({
//         ...prevData,
//         [name]: value,
//       }));
//       if (errors[name]) {
//         setErrors((prevErrors) => ({
//           ...prevErrors,
//           [name]: "",
//         }));
//       }
//     } else {
//       setErrors((prevErrors) => ({
//         ...prevErrors,
//         [name]: "Only numbers and decimals are allowed.",
//       }));
//     }
//   };

//   const validateForm = () => {
//     const newErrors = {};
//     let isValid = true;

//     Object.keys(formData).forEach((key) => {
//       if (formData[key] === "") {
//         newErrors[key] = "This field is required.";
//         isValid = false;
//       }

//       if (numericFields.includes(key) && formData[key] !== "") {
//         if (!/^-?\d*\.?\d*$/.test(formData[key])) {
//           newErrors[key] = "Only numbers and decimals are allowed.";
//           isValid = false;
//         }
//       }
//     });

//     setErrors(newErrors);
//     return isValid;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!validateForm()) {
//       Swal.fire({
//         icon: "error",
//         title: "Validation Error!",
//         text: "Please correct the errors in the form before submitting.",
//         confirmButtonColor: "#d33",
//       });
//       return;
//     }

//     try {
//       const response = await axios.post(
//         "https://tdtlworld.com/hrms-backend/admin_dashboard/",
//         formData
//       );

//       if (response.data.status === "success") {
//         Swal.fire({
//           icon: "success",
//           title: "Success!",
//           text: response.data.message,
//           confirmButtonColor: "#1976d2",
//         });
//         console.log("API Response:", response.data);

//         setFormData(initialFormData);
//         setErrors({});
//       } else {
//         Swal.fire({
//           icon: "warning",
//           title: "Warning!",
//           text: response.data.message || "Something went wrong",
//           confirmButtonColor: "#1976d2",
//         });
//       }
//     } catch (error) {
//       console.error("API Error:", error);
//       Swal.fire({
//         icon: "error",
//         title: "Error!",
//         text: error.response?.data?.message || "Failed to submit metrics",
//         confirmButtonColor: "#d33",
//       });
//     }
//   };

//   // Helper to render TextField
//   const renderTextField = (key) => (
//     <TextField
//       fullWidth
//       label={
//         key // Auto-format label from snake_case to Title Case
//           .replace(/_/g, " ")
//           .replace(/\b\w/g, (l) => l.toUpperCase())
//       }
//       name={key}
//       type="text"
//       value={formData[key]}
//       onChange={numericFields.includes(key) ? handleNumericChange : handleChange}
//       variant="outlined"
//       error={!!errors[key]}
//       helperText={errors[key]}
//       inputProps={numericFields.includes(key) ? { pattern: "^-?\\d*\\.?\\d*$" } : {}}
//       sx={{ mb: 1 }} // Add a small bottom margin for consistent spacing
//     />
//   );

//   return (
//     <Paper elevation={3} sx={{ p: 4, maxWidth: 1200, mx: "auto", my: 4 }}>
//       <Typography variant="h4" gutterBottom align="center" fontWeight="bold" color="primary">
//         Admin Dashboard Metrics Form
//       </Typography>
//       <Divider sx={{ mb: 3 }} />

//       <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
//         {/* Date Selection */}
//         <Typography variant="h6" gutterBottom sx={{ mt: 3, mb: 2, fontWeight: 'medium' }}>
//           Date Selection
//         </Typography>
//         <Grid container spacing={3}>
//           <Grid item xs={12} sm={6}>
//             <TextField
//               select
//               fullWidth
//               label="Month"
//               name="month"
//               value={formData.month}
//               onChange={handleChange}
//               variant="outlined"
//               error={!!errors.month}
//               helperText={errors.month}
//             >
//               {[
//                 "January", "February", "March", "April", "May", "June",
//                 "July", "August", "September", "October", "November", "December",
//               ].map((month, index) => (
//                 <MenuItem key={index + 1} value={index + 1}>
//                   {month}
//                 </MenuItem>
//               ))}
//             </TextField>
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <TextField
//               select
//               fullWidth
//               label="Year"
//               name="year"
//               value={formData.year}
//               onChange={handleChange}
//               variant="outlined"
//               error={!!errors.year}
//               helperText={errors.year}
//             >
//               {Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i).map(
//                 (year) => (
//                   <MenuItem key={year} value={year}>
//                     {year}
//                   </MenuItem>
//                 )
//               )}
//             </TextField>
//           </Grid>
//         </Grid>

//         <Divider sx={{ my: 4 }} />

//         {/* Financial Metrics */}
//         <Typography variant="h6" gutterBottom sx={{ mb: 2, fontWeight: 'medium' }}>
//           Financial Metrics
//         </Typography>
//         <Grid container spacing={3}>
//           <Grid item xs={12} sm={6} md={4}>
//             {renderTextField("total_revenue")}
//           </Grid>
//           <Grid item xs={12} sm={6} md={4}>
//             {renderTextField("employee_contribution")}
//           </Grid>
//           <Grid item xs={12} sm={6} md={4}>
//             {renderTextField("average")}
//           </Grid>
//           <Grid item xs={12} sm={6} md={4}>
//             {renderTextField("total_salary")}
//           </Grid>
//           <Grid item xs={12} sm={6} md={4}>
//             {renderTextField("fixed_cost_employee")}
//           </Grid>
//           <Grid item xs={12} sm={6} md={4}>
//             {renderTextField("total_cost_employee")}
//           </Grid>
//           <Grid item xs={12} sm={6} md={4}>
//             {renderTextField("monthly_total_salary")}
//           </Grid>
//           <Grid item xs={12} sm={6} md={4}>
//             {renderTextField("monthly_expenses")}
//           </Grid>
//           <Grid item xs={12} sm={6} md={4}>
//             {renderTextField("total_employee_cost")}
//           </Grid>
//           <Grid item xs={12} sm={6} md={4}>
//             {renderTextField("per_employee_cost")}
//           </Grid>
//           <Grid item xs={12} sm={6} md={4}>
//             {renderTextField("per_revenue")}
//           </Grid>
//         </Grid>

//         <Divider sx={{ my: 4 }} />

//         {/* Employee Performance & Attrition */}
//         <Typography variant="h6" gutterBottom sx={{ mb: 2, fontWeight: 'medium' }}>
//           Employee Performance & Attrition
//         </Typography>
//         <Grid container spacing={3}>
//           <Grid item xs={12} sm={6} md={4}>
//             {renderTextField("exceptional")}
//           </Grid>
//           <Grid item xs={12} sm={6} md={4}>
//             {renderTextField("exceeds_expectations")}
//           </Grid>
//           <Grid item xs={12} sm={6} md={4}>
//             {renderTextField("meet_expectations")}
//           </Grid>
//           <Grid item xs={12} sm={6} md={4}>
//             {renderTextField("below_expectations")}
//           </Grid>
//           <Grid item xs={12} sm={6} md={4}>
//             {renderTextField("unsatisfactory")}
//           </Grid>
//           <Grid item xs={12} sm={6} md={4}>
//             {renderTextField("department_attrition_rate")}
//           </Grid>
//           <Grid item xs={12} sm={6} md={4}>
//             {renderTextField("division_attrition_rate")}
//           </Grid>
//         </Grid>

//         <Divider sx={{ my: 4 }} />

//         {/* Recruitment Tracker */}
//         <Typography variant="h6" gutterBottom sx={{ mb: 2, fontWeight: 'medium' }}>
//           Recruitment Tracker
//         </Typography>
//         <Grid container spacing={3}>
//           <Grid item xs={12} sm={6} md={4}>
//             {renderTextField("opened_recruitment_tracker")}
//           </Grid>
//           <Grid item xs={12} sm={6} md={4}>
//             {renderTextField("filed_recruitment_tracker")}
//           </Grid>
//           <Grid item xs={12} sm={6} md={4}>
//             {renderTextField("in_process_recruitment_tracker")}
//           </Grid>
//         </Grid>

//         <Divider sx={{ my: 4 }} />

//         {/* Employee Levels */}
//         <Typography variant="h6" gutterBottom sx={{ mb: 2, fontWeight: 'medium' }}>
//           Employee Levels
//         </Typography>
//         <Grid container spacing={3}>
//           <Grid item xs={12} sm={6} md={3}>
//             {renderTextField("level1_employee")}
//           </Grid>
//           <Grid item xs={12} sm={6} md={3}>
//             {renderTextField("level2_employee")}
//           </Grid>
//           <Grid item xs={12} sm={6} md={3}>
//             {renderTextField("level3_employee")}
//           </Grid>
//           <Grid item xs={12} sm={6} md={3}>
//             {renderTextField("level4_employee")}
//           </Grid>
//         </Grid>

//         {/* Submit Button */}
//         <Box sx={{ mt: 5, textAlign: "center" }}>
//           <Button type="submit" variant="contained" color="primary" size="large">
//             Save Metrics
//           </Button>
//         </Box>
//       </Box>
//     </Paper>
//   );
// };

// export default MetricsForm;











import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Paper,
  TextField,
  Typography,
  Button,
  MenuItem,
  Divider,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import Swal from "sweetalert2";

const MetricsForm = () => {
  const initialFormData = {
    month: "",
    year: "",
    total_revenue: "",
    employee_contribution: "",
    average: "",
    total_salary: "",
    fixed_cost_employee: "",
    total_cost_employee: "",
    monthly_total_salary: "",
    monthly_expenses: "",
    total_employee_cost: "",
    per_employee_cost: "",
    per_revenue: "",
    exceptional: "",
    exceeds_expectations: "",
    meet_expectations: "",
    below_expectations: "",
    unsatisfactory: "",
    department_attrition_rate: "",
    division_attrition_rate: "",
    opened_recruitment_tracker: "",
    filed_recruitment_tracker: "",
    in_process_recruitment_tracker: "",
    level1_employee: "",
    level2_employee: "",
    level3_employee: "",
    level4_employee: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const numericFields = [
    "total_revenue",
    "employee_contribution",
    "average",
    "total_salary",
    "fixed_cost_employee",
    "total_cost_employee",
    "monthly_total_salary",
    "monthly_expenses",
    "total_employee_cost",
    "per_employee_cost",
    "per_revenue",
    "exceptional",
    "exceeds_expectations",
    "meet_expectations",
    "below_expectations",
    "unsatisfactory",
    "department_attrition_rate",
    "division_attrition_rate",
    "opened_recruitment_tracker",
    "filed_recruitment_tracker",
    "in_process_recruitment_tracker",
    "level1_employee",
    "level2_employee",
    "level3_employee",
    "level4_employee",
  ];

  useEffect(() => {
    const fetchMetricsData = async () => {
      if (formData.month && formData.year) {
        try {
          const response = await axios.get(
            `https://tdtlworld.com/hrms-backend/apis/get_metrics_form_data/?month=${formData.month}&year=${formData.year}`
          );
          if (response.data.data && response.data.data.length > 0) {
            const metricsData = response.data.data[0];
            const updatedFormData = {};
            for (const key in initialFormData) {
              if (metricsData.hasOwnProperty(key)) {
                updatedFormData[key] = metricsData[key];
              }
            }
            setFormData((prevData) => ({ ...prevData, ...updatedFormData }));
          } else {
            const resetData = { ...initialFormData };
            resetData.month = formData.month;
            resetData.year = formData.year;
            setFormData(resetData);
          }
        } catch (error) {
          console.error("Failed to fetch metrics data:", error);
          const resetData = { ...initialFormData };
          resetData.month = formData.month;
          resetData.year = formData.year;
          setFormData(resetData);
        }
      }
    };
    fetchMetricsData();
  }, [formData.month, formData.year]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    }
  };

  const handleNumericChange = (e) => {
    const { name, value } = e.target;
    if (value === "" || /^-?\d*\.?\d*$/.test(value)) {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
      if (errors[name]) {
        setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
      }
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "Only numbers and decimals are allowed.",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;
    Object.keys(formData).forEach((key) => {
      if (String(formData[key]).trim() === "") {
        newErrors[key] = "This field is required.";
        isValid = false;
      }
      if (numericFields.includes(key) && formData[key] !== "") {
        if (!/^-?\d*\.?\d*$/.test(formData[key])) {
          newErrors[key] = "Only numbers and decimals are allowed.";
          isValid = false;
        }
      }
    });
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "Please fill all the required fields correctly.",
        timer: 3000,
        showConfirmButton: false,
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await axios.post(
        "https://tdtlworld.com/hrms-backend/admin_dashboard/",
        formData
      );
      if (response.data.status === "success") {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: response.data.message,
          timer: 3000,
          showConfirmButton: false,
        });
        setFormData(initialFormData);
        setErrors({});
      } else {
        Swal.fire({
          icon: "warning",
          title: "Warning",
          text: response.data.message || "Something went wrong.",
          timer: 3000,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Submission Error",
        text: error.response?.data?.message || "Failed to submit metrics.",
        timer: 3000,
        showConfirmButton: false,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderTextField = (key) => (
    <TextField
      fullWidth
      label={key.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
      name={key}
      value={formData[key]}
      onChange={
        numericFields.includes(key) ? handleNumericChange : handleChange
      }
      variant="outlined"
      error={!!errors[key]}
      helperText={errors[key]}
      size="small"
    />
  );

  return (
    <Box component={Paper} p={3}>
      <Typography
        variant="h4"
        sx={{
          color: "#8C257C",
          fontWeight: "bold",
          mb: 5,
          alignItems: "center",
        }}
      >
        Metrics Form
      </Typography>

      <Box component="form" onSubmit={handleSubmit} noValidate>
        <Typography
          variant="h6"
          gutterBottom
          sx={{
            mt: 2,
            mb: 2,
            fontWeight: "medium",
            color: "#8C257C",
            fontWeight: "bold",
          }}
        >
          Date Selection
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              select
              fullWidth
              label="Month"
              name="month"
              value={formData.month}
              onChange={handleChange}
              variant="outlined"
              error={!!errors.month}
              helperText={errors.month}
              size="small"
            >
              {[
                { label: "January", value: 1 },
                { label: "February", value: 2 },
                { label: "March", value: 3 },
                { label: "April", value: 4 },
                { label: "May", value: 5 },
                { label: "June", value: 6 },
                { label: "July", value: 7 },
                { label: "August", value: 8 },
                { label: "September", value: 9 },
                { label: "October", value: 10 },
                { label: "November", value: 11 },
                { label: "December", value: 12 },
              ].map((month) => (
                <MenuItem key={month.value} value={month.value}>
                  {month.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              select
              fullWidth
              label="Year"
              name="year"
              value={formData.year}
              onChange={handleChange}
              variant="outlined"
              error={!!errors.year}
              helperText={errors.year}
              size="small"
            >
              {Array.from(
                { length: 5 },
                (_, i) => new Date().getFullYear() - i
              ).map((year) => (
                <MenuItem key={year} value={year}>
                  {year}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        <Typography
          variant="h6"
          gutterBottom
          sx={{
            mb: 2,
            fontWeight: "medium",
            color: "#8C257C",
            fontWeight: "bold",
          }}
        >
          Financial Metrics
        </Typography>
        <Grid container spacing={2}>
          {[
            "total_revenue",
            "employee_contribution",
            "average",
            "total_salary",
            "fixed_cost_employee",
            "total_cost_employee",
            "monthly_total_salary",
            "monthly_expenses",
            "total_employee_cost",
            "per_employee_cost",
            "per_revenue",
          ].map((field) => (
            <Grid item xs={12} sm={6} md={4} key={field}>
              {renderTextField(field)}
            </Grid>
          ))}
        </Grid>

        <Divider sx={{ my: 3 }} />

        <Typography
          variant="h6"
          gutterBottom
          sx={{
            mb: 2,
            fontWeight: "medium",
            color: "#8C257C",
            fontWeight: "bold",
          }}
        >
          Employee Performance & Attrition
        </Typography>
        <Grid container spacing={2}>
          {[
            "exceptional",
            "exceeds_expectations",
            "meet_expectations",
            "below_expectations",
            "unsatisfactory",
            "department_attrition_rate",
            "division_attrition_rate",
          ].map((field) => (
            <Grid item xs={12} sm={6} md={4} key={field}>
              {renderTextField(field)}
            </Grid>
          ))}
        </Grid>

        <Divider sx={{ my: 3 }} />

        <Typography
          variant="h6"
          gutterBottom
          sx={{
            mb: 2,
            fontWeight: "medium",
            color: "#8C257C",
            fontWeight: "bold",
          }}
        >
          Recruitment Tracker
        </Typography>
        <Grid container spacing={2}>
          {[
            "opened_recruitment_tracker",
            "filed_recruitment_tracker",
            "in_process_recruitment_tracker",
          ].map((field) => (
            <Grid item xs={12} sm={6} md={4} key={field}>
              {renderTextField(field)}
            </Grid>
          ))}
        </Grid>

        <Divider sx={{ my: 3 }} />

        <Typography
          variant="h6"
          gutterBottom
          sx={{
            mb: 2,
            fontWeight: "medium",
            color: "#8C257C",
            fontWeight: "bold",
          }}
        >
          Employee Levels
        </Typography>
        <Grid container spacing={2}>
          {[
            "level1_employee",
            "level2_employee",
            "level3_employee",
            "level4_employee",
          ].map((field) => (
            <Grid item xs={12} sm={6} md={3} key={field}>
              {renderTextField(field)}
            </Grid>
          ))}
        </Grid>

        <Box sx={{ mt: 4, textAlign: "center" }}>
          <Button
            type="submit"
            variant="contained"
            disabled={isSubmitting}
            sx={{
              backgroundColor: "#8C257C",
              color: "#FFFFFF",
              "&:hover": {
                backgroundColor: "#6d1d60",
              },
            }}
          >
            {isSubmitting ? (
              <CircularProgress size={24} sx={{ color: "white" }} />
            ) : (
              "Save Metrics"
            )}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default MetricsForm;