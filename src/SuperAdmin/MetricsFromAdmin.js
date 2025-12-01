// import React from 'react'

// export default function MetricsFromAdmin() {
//   return (
//     <div>MetricsFromAdmin</div>
//   )
// }








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

// const MetricsFromAdmin = () => {
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

// export default MetricsFromAdmin;











// import React, { useState } from "react";
// import {
//   Box,
//   Grid,
//   Paper,
//   TextField,
//   Typography,
//   Button,
//   MenuItem,
//   Divider,
//   createTheme, // Import for theme creation
//   ThemeProvider, // Import for applying the theme
// } from "@mui/material";
// import axios from "axios";
// import Swal from "sweetalert2";

// // Define the standardized theme with your brand colors
// const theme = createTheme({
//   palette: {
//     primary: {
//       main: '#8C257C', // Purple
//     },
//     secondary: {
//       main: '#F58E35', // Orange
//     },
//     background: {
//       default: '#f4f6f8', // A light background for the page
//     },
//   },
//   components: {
//     MuiButton: {
//       styleOverrides: {
//         containedPrimary: {
//           color: 'white',
//         },
//         containedSecondary: {
//             color: 'white'
//         }
//       }
//     },
//     MuiPaper: {
//         styleOverrides: {
//             root: {
//                 borderRadius: '8px',
//             }
//         }
//     }
//   }
// });


// const MetricsFromAdmin = () => {
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
//     "total_revenue", "employee_contribution", "average", "total_salary", "fixed_cost_employee",
//     "total_cost_employee", "monthly_total_salary", "monthly_expenses", "total_employee_cost",
//     "per_employee_cost", "per_revenue", "exceptional", "exceeds_expectations",
//     "meet_expectations", "below_expectations", "unsatisfactory", "department_attrition_rate",
//     "division_attrition_rate", "opened_recruitment_tracker", "filed_recruitment_tracker",
//     "in_process_recruitment_tracker", "level1_employee", "level2_employee",
//     "level3_employee", "level4_employee",
//   ];

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//     if (errors[name]) {
//       setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
//     }
//   };

//   const handleNumericChange = (e) => {
//     const { name, value } = e.target;
//     if (value === "" || /^-?\d*\.?\d*$/.test(value)) {
//       setFormData((prevData) => ({ ...prevData, [name]: value }));
//       if (errors[name]) {
//         setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
//       }
//     }
//   };

//   const validateForm = () => {
//     const newErrors = {};
//     let isValid = true;

//     Object.keys(formData).forEach((key) => {
//       if (formData[key] === "" || formData[key] === null) {
//         newErrors[key] = "This field is required.";
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
//         text: "Please fill out all required fields.",
//         confirmButtonColor: theme.palette.error.main,
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
//           confirmButtonColor: theme.palette.primary.main,
//         });
//         setFormData(initialFormData);
//         setErrors({});
//       } else {
//         Swal.fire({
//           icon: "warning",
//           title: "Warning!",
//           text: response.data.message || "Something went wrong",
//           confirmButtonColor: theme.palette.primary.main,
//         });
//       }
//     } catch (error) {
//       console.error("API Error:", error);
//       Swal.fire({
//         icon: "error",
//         title: "Error!",
//         text: error.response?.data?.message || "Failed to submit metrics",
//         confirmButtonColor: theme.palette.error.main,
//       });
//     }
//   };

//   const renderTextField = (key) => (
//     <TextField
//       fullWidth
//       label={key.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
//       name={key}
//       value={formData[key]}
//       onChange={numericFields.includes(key) ? handleNumericChange : handleChange}
//       variant="outlined"
//       error={!!errors[key]}
//       helperText={errors[key]}
//       inputProps={numericFields.includes(key) ? { inputMode: 'decimal', pattern: "^-?\\d*\\.?\\d*$" } : {}}
//     />
//   );

//   return (
//     <ThemeProvider theme={theme}>
//       <Box sx={{ p: { xs: 2, sm: 3 }, bgcolor: 'background.default', minHeight: '100vh' }}>
//         <Paper elevation={3} sx={{ p: { xs: 2, md: 4 }, maxWidth: 1200, mx: "auto" }}>
//           <Typography variant="h4" gutterBottom align="center" fontWeight="bold" color="primary">
//             Admin Dashboard Metrics
//           </Typography>
//           <Typography variant="body1" color="textSecondary" align="center" sx={{ mb: 3 }}>
//             Submit monthly metrics for the organization.
//           </Typography>
//           <Divider />

//           <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }} noValidate>
//             <Typography variant="h6" gutterBottom sx={{ mt: 3, mb: 2, fontWeight: 600 }}>
//               Date Selection
//             </Typography>
//             <Grid container spacing={3}>
//               <Grid item xs={12} sm={6}>
//                 <TextField select fullWidth label="Month" name="month" value={formData.month} onChange={handleChange} variant="outlined" error={!!errors.month} helperText={errors.month}>
//                   {[ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ].map((month, index) => (
//                     <MenuItem key={index + 1} value={index + 1}> {month} </MenuItem>
//                   ))}
//                 </TextField>
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField select fullWidth label="Year" name="year" value={formData.year} onChange={handleChange} variant="outlined" error={!!errors.year} helperText={errors.year}>
//                   {Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i).map((year) => (
//                     <MenuItem key={year} value={year}> {year} </MenuItem>
//                   ))}
//                 </TextField>
//               </Grid>
//             </Grid>

//             <Divider sx={{ my: 4 }} />

//             <Typography variant="h6" gutterBottom sx={{ mb: 2, fontWeight: 600 }}>
//               Financial Metrics
//             </Typography>
//             <Grid container spacing={3}>
//                 <Grid item xs={12} sm={6} md={4}>{renderTextField("total_revenue")}</Grid>
//                 <Grid item xs={12} sm={6} md={4}>{renderTextField("employee_contribution")}</Grid>
//                 <Grid item xs={12} sm={6} md={4}>{renderTextField("average")}</Grid>
//                 <Grid item xs={12} sm={6} md={4}>{renderTextField("total_salary")}</Grid>
//                 <Grid item xs={12} sm={6} md={4}>{renderTextField("fixed_cost_employee")}</Grid>
//                 <Grid item xs={12} sm={6} md={4}>{renderTextField("total_cost_employee")}</Grid>
//                 <Grid item xs={12} sm={6} md={4}>{renderTextField("monthly_total_salary")}</Grid>
//                 <Grid item xs={12} sm={6} md={4}>{renderTextField("monthly_expenses")}</Grid>
//                 <Grid item xs={12} sm={6} md={4}>{renderTextField("total_employee_cost")}</Grid>
//                 <Grid item xs={12} sm={6} md={4}>{renderTextField("per_employee_cost")}</Grid>
//                 <Grid item xs={12} sm={6} md={4}>{renderTextField("per_revenue")}</Grid>
//             </Grid>

//             <Divider sx={{ my: 4 }} />

//             <Typography variant="h6" gutterBottom sx={{ mb: 2, fontWeight: 600 }}>
//               Employee Performance & Attrition
//             </Typography>
//             <Grid container spacing={3}>
//                 <Grid item xs={12} sm={6} md={4}>{renderTextField("exceptional")}</Grid>
//                 <Grid item xs={12} sm={6} md={4}>{renderTextField("exceeds_expectations")}</Grid>
//                 <Grid item xs={12} sm={6} md={4}>{renderTextField("meet_expectations")}</Grid>
//                 <Grid item xs={12} sm={6} md={4}>{renderTextField("below_expectations")}</Grid>
//                 <Grid item xs={12} sm={6} md={4}>{renderTextField("unsatisfactory")}</Grid>
//                 <Grid item xs={12} sm={6} md={4}>{renderTextField("department_attrition_rate")}</Grid>
//                 <Grid item xs={12} sm={6} md={4}>{renderTextField("division_attrition_rate")}</Grid>
//             </Grid>

//             <Divider sx={{ my: 4 }} />

//             <Typography variant="h6" gutterBottom sx={{ mb: 2, fontWeight: 600 }}>
//               Recruitment Tracker
//             </Typography>
//             <Grid container spacing={3}>
//                 <Grid item xs={12} sm={6} md={4}>{renderTextField("opened_recruitment_tracker")}</Grid>
//                 <Grid item xs={12} sm={6} md={4}>{renderTextField("filed_recruitment_tracker")}</Grid>
//                 <Grid item xs={12} sm={6} md={4}>{renderTextField("in_process_recruitment_tracker")}</Grid>
//             </Grid>

//             <Divider sx={{ my: 4 }} />

//             <Typography variant="h6" gutterBottom sx={{ mb: 2, fontWeight: 600 }}>
//               Employee Levels
//             </Typography>
//             <Grid container spacing={3}>
//                 <Grid item xs={12} sm={6} md={3}>{renderTextField("level1_employee")}</Grid>
//                 <Grid item xs={12} sm={6} md={3}>{renderTextField("level2_employee")}</Grid>
//                 <Grid item xs={12} sm={6} md={3}>{renderTextField("level3_employee")}</Grid>
//                 <Grid item xs={12} sm={6} md={3}>{renderTextField("level4_employee")}</Grid>
//             </Grid>

//             <Box sx={{ mt: 5, display: 'flex', justifyContent: 'flex-end' }}>
//               <Button type="submit" variant="contained" color="primary" size="large" sx={{ px: 4, py: 1.5 }}>
//                 Save Metrics
//               </Button>
//             </Box>
//           </Box>
//         </Paper>
//       </Box>
//     </ThemeProvider>
//   );
// };

// export default MetricsFromAdmin;


















// import React, { useState } from "react";
// import {
//   Box,
//   Grid,
//   Paper,
//   TextField,
//   Typography,
//   Button,
//   MenuItem,
//   Divider,
//   CircularProgress,
// } from "@mui/material";
// import axios from "axios";
// import Swal from "sweetalert2";

// const MetricsFromAdmin = () => {
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
//   const [isSubmitting, setIsSubmitting] = useState(false);

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
//       setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
//     }
//   };

//   const handleNumericChange = (e) => {
//     const { name, value } = e.target;
//     if (value === "" || /^-?\d*\.?\d*$/.test(value)) {
//       setFormData((prevData) => ({ ...prevData, [name]: value }));
//       if (errors[name]) {
//         setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
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
//       if (String(formData[key]).trim() === "") {
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
//         title: "Validation Error",
//         text: "Please fill all the required fields correctly.",
//         timer: 3000,
//         showConfirmButton: false,
//       });
//       return;
//     }

//     setIsSubmitting(true);
//     try {
//       const response = await axios.post("https://tdtlworld.com/hrms-backend/admin_dashboard/", formData);
//       if (response.data.status === "success") {
//         Swal.fire({
//           icon: "success",
//           title: "Success!",
//           text: response.data.message,
//           timer: 3000,
//           showConfirmButton: false,
//         });
//         setFormData(initialFormData);
//         setErrors({});
//       } else {
//         Swal.fire({
//           icon: "warning",
//           title: "Warning",
//           text: response.data.message || "Something went wrong.",
//           timer: 3000,
//           showConfirmButton: false,
//         });
//       }
//     } catch (error) {
//       Swal.fire({
//         icon: "error",
//         title: "Submission Error",
//         text: error.response?.data?.message || "Failed to submit metrics.",
//         timer: 3000,
//         showConfirmButton: false,
//       });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const renderTextField = (key) => (
//     <TextField
//       fullWidth
//       label={key.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
//       name={key}
//       value={formData[key]}
//       onChange={numericFields.includes(key) ? handleNumericChange : handleChange}
//       variant="outlined"
//       error={!!errors[key]}
//       helperText={errors[key]}
//       size="small"
//     />
//   );

//   return (
//     <Box component={Paper} p={3}>
//       <Typography variant="h4" sx={{ color: "#8C257C", fontWeight: "bold", mb: 5, alignItems: "center" }}>
//      Metrics Form
//       </Typography>

//       <Box component="form" onSubmit={handleSubmit} noValidate>
//         <Typography variant="h6" gutterBottom sx={{ mt: 2, mb: 2, fontWeight: "medium", color: "#8C257C", fontWeight: "bold" }}>
//           Date Selection
//         </Typography>
//         <Grid container spacing={2}>
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
//               size="small"
//             >
//               {[
//                 { label: "January", value: 1 }, { label: "February", value: 2 },
//                 { label: "March", value: 3 }, { label: "April", value: 4 },
//                 { label: "May", value: 5 }, { label: "June", value: 6 },
//                 { label: "July", value: 7 }, { label: "August", value: 8 },
//                 { label: "September", value: 9 }, { label: "October", value: 10 },
//                 { label: "November", value: 11 }, { label: "December", value: 12 },
//               ].map((month) => (
//                 <MenuItem key={month.value} value={month.value}>
//                   {month.label}
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
//               size="small"
//             >
//               {Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i).map((year) => (
//                 <MenuItem key={year} value={year}>
//                   {year}
//                 </MenuItem>
//               ))}
//             </TextField>
//           </Grid>
//         </Grid>

//         <Divider sx={{ my: 3 }} />

//         <Typography variant="h6" gutterBottom sx={{ mb: 2, fontWeight: "medium", color: "#8C257C", fontWeight: "bold" }}>
//           Financial Metrics
//         </Typography>
//         <Grid container spacing={2}>
//           {[
//             "total_revenue", "employee_contribution", "average", "total_salary",
//             "fixed_cost_employee", "total_cost_employee", "monthly_total_salary",
//             "monthly_expenses", "total_employee_cost", "per_employee_cost", "per_revenue"
//           ].map(field => (
//             <Grid item xs={12} sm={6} md={4} key={field}>{renderTextField(field)}</Grid>
//           ))}
//         </Grid>

//         <Divider sx={{ my: 3 }} />

//         <Typography variant="h6" gutterBottom sx={{ mb: 2, fontWeight: "medium", color: "#8C257C", fontWeight: "bold" }}>
//           Employee Performance & Attrition
//         </Typography>
//         <Grid container spacing={2}>
//           {[
//             "exceptional", "exceeds_expectations", "meet_expectations",
//             "below_expectations", "unsatisfactory", "department_attrition_rate",
//             "division_attrition_rate"
//           ].map(field => (
//             <Grid item xs={12} sm={6} md={4} key={field}>{renderTextField(field)}</Grid>
//           ))}
//         </Grid>

//         <Divider sx={{ my: 3 }} />

//         <Typography variant="h6" gutterBottom sx={{ mb: 2, fontWeight: "medium", color: "#8C257C" , fontWeight: "bold"}}>
//           Recruitment Tracker
//         </Typography>
//         <Grid container spacing={2}>
//           {[
//             "opened_recruitment_tracker", "filed_recruitment_tracker", "in_process_recruitment_tracker"
//           ].map(field => (
//             <Grid item xs={12} sm={6} md={4} key={field}>{renderTextField(field)}</Grid>
//           ))}
//         </Grid>

//         <Divider sx={{ my: 3 }} />

//         <Typography variant="h6" gutterBottom sx={{ mb: 2, fontWeight: "medium", color: "#8C257C", fontWeight: "bold" }}>
//           Employee Levels
//         </Typography>
//         <Grid container spacing={2}>
//           {[
//             "level1_employee", "level2_employee", "level3_employee", "level4_employee"
//           ].map(field => (
//             <Grid item xs={12} sm={6} md={3} key={field}>{renderTextField(field)}</Grid>
//           ))}
//         </Grid>

//         <Box sx={{ mt: 4, textAlign: "center" }}>
//           <Button
//             type="submit"
//             variant="contained"
//             disabled={isSubmitting}
//             sx={{
//               backgroundColor: "#8C257C",
//               color: "#FFFFFF",
//               "&:hover": {
//                 backgroundColor: "#6d1d60",
//               },
//             }}
//           >
//             {isSubmitting ? <CircularProgress size={24} sx={{ color: "white" }} /> : "Save Metrics"}
//           </Button>
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default MetricsFromAdmin;










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

const MetricsFromAdmin = () => {
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

export default MetricsFromAdmin;