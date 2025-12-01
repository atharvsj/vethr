// // "use client"

// // import { useState } from "react"
// // import { Card, CardContent, Typography, Grid, TextField, Button, Box, Alert } from "@mui/material"

// // export default function PayrollSetup() {
// //   const [formulas, setFormulas] = useState({
// //     hra: 40,
// //     medical: 1250,
// //     conveyance: 1600,
// //     pf: 12,
// //     esi: 1.75,
// //     tds: 0,
// //     mlwf: 0,
// //     gratuity: 4.81,
// //     bonus: 8.33,
// //   })

// //   const [companyInfo, setCompanyInfo] = useState({
// //     name: "Vetrina Healthcare Pvt. Ltd.",
// //     address:
// //       "Corporate Office - Punjai Pride, 1st Floor, Shivshambho Nagar, Lane 3A, Katraj Kondhwa Road, Katraj, Pune - 411046",
// //     pfNumber: "MH/PUN/0000000",
// //     esiNumber: "ESIC000000000",
// //     panNumber: "AEMCO0000M",
// //   })

// //   const [saved, setSaved] = useState(false)

// //   const handleFormulaChange = (field, value) => {
// //     setFormulas((prev) => ({ ...prev, [field]: value }))
// //   }

// //   const handleCompanyInfoChange = (field, value) => {
// //     setCompanyInfo((prev) => ({ ...prev, [field]: value }))
// //   }

// //   const handleSave = () => {
// //     // Save to localStorage or API
// //     localStorage.setItem("payrollFormulas", JSON.stringify(formulas))
// //     localStorage.setItem("companyInfo", JSON.stringify(companyInfo))
// //     setSaved(true)
// //     setTimeout(() => setSaved(false), 3000)
// //   }

// //   return (
// //     <Box>
// //       <Typography variant="h4" gutterBottom>
// //         Payroll Setup Configuration
// //       </Typography>

// //       {saved && (
// //         <Alert severity="success" sx={{ mb: 2 }}>
// //           Payroll configuration saved successfully!
// //         </Alert>
// //       )}

// //       <Grid container spacing={3}>
// //         {/* Company Information */}
// //         <Grid item xs={12}>
// //           <Card>
// //             <CardContent>
// //               <Typography variant="h6" gutterBottom>
// //                 Company Information
// //               </Typography>
// //               <Grid container spacing={2}>
// //                 <Grid item xs={12} md={6}>
// //                   <TextField
// //                     fullWidth
// //                     label="Company Name"
// //                     value={companyInfo.name}
// //                     onChange={(e) => handleCompanyInfoChange("name", e.target.value)}
// //                   />
// //                 </Grid>
// //                 <Grid item xs={12}>
// //                   <TextField
// //                     fullWidth
// //                     label="Company Address"
// //                     multiline
// //                     rows={3}
// //                     value={companyInfo.address}
// //                     onChange={(e) => handleCompanyInfoChange("address", e.target.value)}
// //                   />
// //                 </Grid>
// //                 <Grid item xs={12} md={4}>
// //                   <TextField
// //                     fullWidth
// //                     label="PF Number"
// //                     value={companyInfo.pfNumber}
// //                     onChange={(e) => handleCompanyInfoChange("pfNumber", e.target.value)}
// //                   />
// //                 </Grid>
// //                 <Grid item xs={12} md={4}>
// //                   <TextField
// //                     fullWidth
// //                     label="ESI Number"
// //                     value={companyInfo.esiNumber}
// //                     onChange={(e) => handleCompanyInfoChange("esiNumber", e.target.value)}
// //                   />
// //                 </Grid>
// //                 <Grid item xs={12} md={4}>
// //                   <TextField
// //                     fullWidth
// //                     label="PAN Number"
// //                     value={companyInfo.panNumber}
// //                     onChange={(e) => handleCompanyInfoChange("panNumber", e.target.value)}
// //                   />
// //                 </Grid>
// //               </Grid>
// //             </CardContent>
// //           </Card>
// //         </Grid>

// //         {/* Earnings Formula */}
// //         <Grid item xs={12} md={6}>
// //           <Card>
// //             <CardContent>
// //               <Typography variant="h6" gutterBottom color="primary">
// //                 Earnings Formula Configuration
// //               </Typography>
// //               <Grid container spacing={2}>
// //                 <Grid item xs={12}>
// //                   <TextField
// //                     fullWidth
// //                     label="HRA (% of Basic)"
// //                     type="number"
// //                     value={formulas.hra}
// //                     onChange={(e) => handleFormulaChange("hra", Number(e.target.value))}
// //                     InputProps={{ endAdornment: "%" }}
// //                   />
// //                 </Grid>
// //                 <Grid item xs={12}>
// //                   <TextField
// //                     fullWidth
// //                     label="Medical Allowance (Fixed Amount)"
// //                     type="number"
// //                     value={formulas.medical}
// //                     onChange={(e) => handleFormulaChange("medical", Number(e.target.value))}
// //                     InputProps={{ startAdornment: "₹" }}
// //                   />
// //                 </Grid>
// //                 <Grid item xs={12}>
// //                   <TextField
// //                     fullWidth
// //                     label="Conveyance Allowance (Fixed Amount)"
// //                     type="number"
// //                     value={formulas.conveyance}
// //                     onChange={(e) => handleFormulaChange("conveyance", Number(e.target.value))}
// //                     InputProps={{ startAdornment: "₹" }}
// //                   />
// //                 </Grid>
// //                 <Grid item xs={12}>
// //                   <TextField
// //                     fullWidth
// //                     label="Bonus (% of Basic)"
// //                     type="number"
// //                     value={formulas.bonus}
// //                     onChange={(e) => handleFormulaChange("bonus", Number(e.target.value))}
// //                     InputProps={{ endAdornment: "%" }}
// //                   />
// //                 </Grid>
// //                 <Grid item xs={12}>
// //                   <TextField
// //                     fullWidth
// //                     label="Gratuity (% of Basic)"
// //                     type="number"
// //                     value={formulas.gratuity}
// //                     onChange={(e) => handleFormulaChange("gratuity", Number(e.target.value))}
// //                     InputProps={{ endAdornment: "%" }}
// //                   />
// //                 </Grid>
// //               </Grid>
// //             </CardContent>
// //           </Card>
// //         </Grid>

// //         {/* Deductions Formula */}
// //         <Grid item xs={12} md={6}>
// //           <Card>
// //             <CardContent>
// //               <Typography variant="h6" gutterBottom color="secondary">
// //                 Deductions Formula Configuration
// //               </Typography>
// //               <Grid container spacing={2}>
// //                 <Grid item xs={12}>
// //                   <TextField
// //                     fullWidth
// //                     label="PF (% of Basic)"
// //                     type="number"
// //                     value={formulas.pf}
// //                     onChange={(e) => handleFormulaChange("pf", Number(e.target.value))}
// //                     InputProps={{ endAdornment: "%" }}
// //                   />
// //                 </Grid>
// //                 <Grid item xs={12}>
// //                   <TextField
// //                     fullWidth
// //                     label="ESI (% of Gross)"
// //                     type="number"
// //                     value={formulas.esi}
// //                     onChange={(e) => handleFormulaChange("esi", Number(e.target.value))}
// //                     InputProps={{ endAdornment: "%" }}
// //                   />
// //                 </Grid>
// //                 <Grid item xs={12}>
// //                   <TextField
// //                     fullWidth
// //                     label="TDS (% of Gross)"
// //                     type="number"
// //                     value={formulas.tds}
// //                     onChange={(e) => handleFormulaChange("tds", Number(e.target.value))}
// //                     InputProps={{ endAdornment: "%" }}
// //                   />
// //                 </Grid>
// //                 <Grid item xs={12}>
// //                   <TextField
// //                     fullWidth
// //                     label="MLWF (Fixed Amount)"
// //                     type="number"
// //                     value={formulas.mlwf}
// //                     onChange={(e) => handleFormulaChange("mlwf", Number(e.target.value))}
// //                     InputProps={{ startAdornment: "₹" }}
// //                   />
// //                 </Grid>
// //               </Grid>
// //             </CardContent>
// //           </Card>
// //         </Grid>
// //       </Grid>

// //       <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
// //         <Button variant="contained" size="large" onClick={handleSave} sx={{ minWidth: 200 }}>
// //           Save Configuration
// //         </Button>
// //       </Box>
// //     </Box>
// //   )
// // }





// import { useState, useEffect } from "react"
// import { Card, CardContent, Typography, Grid, TextField, Button, Box, Alert } from "@mui/material"

// export default function PayrollSetup() {
//   const [formulas, setFormulas] = useState({
//     // Earnings
//     hra: 40,
//     bonus: 8.33,
//     basicDa: 0,
//     medicalEsicApplicable: 0,
//     medicalEsicNotApplicable: 1250,
//     conveyanceEsicApplicable: 0,
//     conveyanceEsicNotApplicable: 1600,

//     // Benefits (Employer Contributions)
//     pfEmployer: 12,
//     esicEmployer: 4.75, // Standard rate for employer
//     gratuity: 4.81,

//     // Deductions (Employee Contributions)
//     pfEmployee: 12,
//     esi: 0.75, // Standard rate for employee
//     tds: 0,
//     mlwf: 0,
//     ptMale: 200,
//     ptFemale: 150,
//   })

//   const [companyInfo, setCompanyInfo] = useState({
//     name: "Vetrina Healthcare Pvt. Ltd.",
//     address:
//       "Corporate Office - Punjai Pride, 1st Floor, Shivshambho Nagar, Lane 3A, Katraj Kondhwa Road, Katraj, Pune - 411046",
//     pfNumber: "MH/PUN/0000000",
//     esiNumber: "ESIC000000000",
//     panNumber: "AEMCO0000M",
//   })

//   const [saved, setSaved] = useState(false)

//   // Load saved data from localStorage on component mount
//   useEffect(() => {
//     const savedFormulas = localStorage.getItem("payrollFormulas");
//     if (savedFormulas) {
//       setFormulas(JSON.parse(savedFormulas));
//     }
//     const savedCompanyInfo = localStorage.getItem("companyInfo");
//     if (savedCompanyInfo) {
//       setCompanyInfo(JSON.parse(savedCompanyInfo));
//     }
//   }, []);


//   const handleFormulaChange = (field, value) => {
//     setFormulas((prev) => ({ ...prev, [field]: value }))
//   }

//   const handleCompanyInfoChange = (field, value) => {
//     setCompanyInfo((prev) => ({ ...prev, [field]: value }))
//   }

//   const handleSave = () => {
//     // Save to localStorage or an API
//     localStorage.setItem("payrollFormulas", JSON.stringify(formulas))
//     localStorage.setItem("companyInfo", JSON.stringify(companyInfo))
//     setSaved(true)
//     setTimeout(() => setSaved(false), 3000)
//   }

//   return (
//     <Box>
//       <Typography variant="h4" gutterBottom>
//         Payroll Setup Configuration
//       </Typography>

//       {saved && (
//         <Alert severity="success" sx={{ mb: 2 }}>
//           Payroll configuration saved successfully!
//         </Alert>
//       )}

//       <Grid container spacing={3}>
    

//         {/* Earnings Formula */}
//         <Grid item xs={12} md={6}>
//           <Card>
//             <CardContent>
//               <Typography variant="h6" gutterBottom sx={{ color: 'primary.main' }}>Earnings Formula Configuration</Typography>
//               <Grid container spacing={2} sx={{ mt: 1 }}>
//                 <Grid item xs={12}><TextField fullWidth label="HRA (% of Basic)" type="number" value={formulas.hra} onChange={(e) => handleFormulaChange("hra", Number(e.target.value))} InputProps={{ endAdornment: "%" }} /></Grid>
//                 <Grid item xs={12}><TextField fullWidth label="Basic + DA (% of Basic)" type="number" value={formulas.basicDa} onChange={(e) => handleFormulaChange("basicDa", Number(e.target.value))} InputProps={{ endAdornment: "%" }} /></Grid>
//                 <Grid item xs={12}><TextField fullWidth label="Medical Allowance (If ESIC Applicable)" type="number" value={formulas.medicalEsicApplicable} onChange={(e) => handleFormulaChange("medicalEsicApplicable", Number(e.target.value))} InputProps={{ endAdornment: "%" }}/></Grid>
//                 <Grid item xs={12}><TextField fullWidth label="Medical Allowance (If ESIC Not Applicable)" type="number" value={formulas.medicalEsicNotApplicable} onChange={(e) => handleFormulaChange("medicalEsicNotApplicable", Number(e.target.value))} InputProps={{ endAdornment: "%" }} /></Grid>
//                 <Grid item xs={12}><TextField fullWidth label="Conveyance Allowance (If ESIC Applicable)" type="number" value={formulas.conveyanceEsicApplicable} onChange={(e) => handleFormulaChange("conveyanceEsicApplicable", Number(e.target.value))}  InputProps={{ endAdornment: "%" }}/></Grid>
//                 <Grid item xs={12}><TextField fullWidth label="Conveyance Allowance (If ESIC Not Applicable)" type="number" value={formulas.conveyanceEsicNotApplicable} onChange={(e) => handleFormulaChange("conveyanceEsicNotApplicable", Number(e.target.value))} InputProps={{ endAdornment: "%" }}/></Grid>
//                 <Grid item xs={12}><TextField fullWidth label="Bonus (% of Basic)" type="number" value={formulas.bonus} onChange={(e) => handleFormulaChange("bonus", Number(e.target.value))} InputProps={{ endAdornment: "%" }} /></Grid>
//               </Grid>
//             </CardContent>
//           </Card>
//         </Grid>

//         {/* Deductions Formula */}
//         <Grid item xs={12} md={6}>
//           <Card>
//             <CardContent>
//               <Typography variant="h6" gutterBottom color="error">Deductions Formula Configuration</Typography>
//               <Grid container spacing={2} sx={{ mt: 1 }}>
//                 <Grid item xs={12}><TextField fullWidth label="PF Employee Contribution (% of Basic)" type="number" value={formulas.pfEmployee} onChange={(e) => handleFormulaChange("pfEmployee", Number(e.target.value))} InputProps={{ endAdornment: "%" }} /></Grid>
//                 <Grid item xs={12}><TextField fullWidth label="ESI (% of Gross)" type="number" value={formulas.esi} onChange={(e) => handleFormulaChange("esi", Number(e.target.value))} InputProps={{ endAdornment: "%" }} /></Grid>
//                 <Grid item xs={12}><TextField fullWidth label="TDS (% of Gross)" type="number" value={formulas.tds} onChange={(e) => handleFormulaChange("tds", Number(e.target.value))} InputProps={{ endAdornment: "%" }} /></Grid>
//                 <Grid item xs={12}><TextField fullWidth label="MLWF (Fixed Amount)" type="number" value={formulas.mlwf} onChange={(e) => handleFormulaChange("mlwf", Number(e.target.value))} InputProps={{ endAdornment: "%" }} /></Grid>
//                 <Grid item xs={12}><TextField fullWidth label="PT for Male (Fixed Amount)" type="number" value={formulas.ptMale} onChange={(e) => handleFormulaChange("ptMale", Number(e.target.value))} InputProps={{ endAdornment: "%" }} /></Grid>
//                 <Grid item xs={12}><TextField fullWidth label="PT for Female (Fixed Amount)" type="number" value={formulas.ptFemale} onChange={(e) => handleFormulaChange("ptFemale", Number(e.target.value))} InputProps={{ endAdornment: "%" }} /></Grid>
//               </Grid>
//             </CardContent>
//           </Card>
//         </Grid>

//         {/* Benefits Section */}
//         <Grid item xs={12}>
//           <Card>
//             <CardContent>
//               <Typography variant="h6" gutterBottom sx={{ color: 'success.main' }}>Benefits Configuration (Employer Contributions)</Typography>
//               <Grid container spacing={2} sx={{ mt: 1 }}>
//                 <Grid item xs={12} md={4}><TextField fullWidth label="PF - Employer Contribution (% of Basic)" type="number" value={formulas.pfEmployer} onChange={(e) => handleFormulaChange("pfEmployer", Number(e.target.value))} InputProps={{ endAdornment: "%" }} /></Grid>
//                 <Grid item xs={12} md={4}><TextField fullWidth label="ESIC - Employer Contribution (% of Gross)" type="number" value={formulas.esicEmployer} onChange={(e) => handleFormulaChange("esicEmployer", Number(e.target.value))} InputProps={{ endAdornment: "%" }} /></Grid>
//                 <Grid item xs={12} md={4}><TextField fullWidth label="Gratuity (% of Basic)" type="number" value={formulas.gratuity} onChange={(e) => handleFormulaChange("gratuity", Number(e.target.value))} InputProps={{ endAdornment: "%" }} /></Grid>
//               </Grid>
//             </CardContent>
//           </Card>
//         </Grid>

//       </Grid>

//       <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
//         <Button variant="contained" size="large" onClick={handleSave} sx={{ minWidth: 200 }}>Save Configuration</Button>
//       </Box>
//     </Box>
//   )
// }
// import { useState, useEffect } from "react"
// import { Card, CardContent, Typography, Grid, TextField, Button, Box, Alert, CircularProgress } from "@mui/material"
// import  axiosInstance from  "../../utils/axiosInstance";  // Make sure this path is correct

// // Mapping from the API's 'particulars' key to our component's state key
// const apiToStateKeyMap = {
//   'hra': 'hra',
//   'basic_plus_da': 'basicDa',
//   'medical_allowance_with_esic': 'medicalEsicApplicable',
//   'medical_allowance_without_esic': 'medicalEsicNotApplicable',
//   'conveyance_allowance_with_esic': 'conveyanceEsicApplicable',
//   'conveyance_allowance_without_esic': 'conveyanceEsicNotApplicable',
//   'pf_employer_contribution': 'pfEmployer',
//   'esic_employer_contribution': 'esicEmployer',
//   'gratuity': 'gratuity',
//   'pf_employee_contribution': 'pfEmployee',
//   'esic_employee_contribution': 'esi',
//   'tds': 'tds',
//   'mlwf_deduction': 'mlwf',
//   'pt_for_male': 'ptMale',
//   'pt_for_female': 'ptFemale'
// };

// // Fields that are treated as fixed amounts, not percentages
// const fixedAmountFields = ['mlwf', 'ptMale', 'ptFemale'];

// export default function PayrollSetup() {
//   const [formulas, setFormulas] = useState({
//     // Earnings
//     hra: 0,
//     basicDa: 0,
//     medicalEsicApplicable: 0,
//     medicalEsicNotApplicable: 0,
//     conveyanceEsicApplicable: 0,
//     conveyanceEsicNotApplicable: 0,
//     // Benefits
//     pfEmployer: 0,
//     esicEmployer: 0,
//     gratuity: 0,
//     // Deductions
//     pfEmployee: 0,
//     esi: 0,
//     tds: 0,
//     mlwf: 0,
//     ptMale: 0,
//     ptFemale: 0,
//   })

//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [alert, setAlert] = useState({ show: false, message: "", severity: "success" });

//   // Fetch configuration from API on component mount
//   useEffect(() => {
//     const fetchConfig = async () => {
//       setLoading(true);
//       try {
//         const response = await axiosInstance.get('/api/payroll_setup_configuration/');
//         if (response.data.status === 'success') {
//           const newFormulas = { ...formulas };
//           response.data.data.forEach(item => {
//             const stateKey = apiToStateKeyMap[item.particulars];
//             if (stateKey) {
//               // Convert decimal to percentage for UI, except for fixed amount fields
//               newFormulas[stateKey] = fixedAmountFields.includes(stateKey) 
//                 ? item.value 
//                 : item.value * 100;
//             }
//           });
//           setFormulas(newFormulas);
//         }
//       } catch (error) {
//         console.error("Failed to fetch payroll configuration:", error);
//         setAlert({ show: true, message: "Failed to load configuration.", severity: "error" });
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchConfig();
//   }, []);

//   const handleFormulaChange = (field, value) => {
//     setFormulas((prev) => ({ ...prev, [field]: value }))
//   }

//   const handleSave = async () => {
//     setSaving(true);
//     const payload = {};
    
//     // Create the payload for the API by reversing the map
//     for (const stateKey in apiToStateKeyMap) {
//         const apiKey = apiToStateKeyMap[stateKey];
//         const apiValue = fixedAmountFields.includes(apiKey)
//             ? formulas[apiKey]
//             : formulas[apiKey] / 100; // Convert percentage back to decimal for API
//         payload[stateKey] = apiValue.toString();
//     }

//     try {
//       await axiosInstance.post('/api/payroll_setup_configuration/', payload);
//       setAlert({ show: true, message: "Payroll configuration saved successfully!", severity: "success" });
//     } catch (error) {
//       console.error("Failed to save payroll configuration:", error);
//       setAlert({ show: true, message: "Failed to save configuration.", severity: "error" });
//     } finally {
//       setSaving(false);
//       setTimeout(() => setAlert({ show: false, message: "", severity: "success" }), 3000);
//     }
//   }
  
//   if (loading) {
//       return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box>
//   }

//   return (
//     <Box>
//       <Typography variant="h4" gutterBottom>
//         Payroll Setup Configuration
//       </Typography>

//       {alert.show && (
//         <Alert severity={alert.severity} sx={{ mb: 2 }}>
//           {alert.message}
//         </Alert>
//       )}

//       <Grid container spacing={3}>
//         {/* Earnings Formula */}
//         <Grid item xs={12} md={6}>
//           <Card>
//             <CardContent>
//               <Typography variant="h6" gutterBottom sx={{ color: 'primary.main' }}>Earnings Formula Configuration</Typography>
//               <Grid container spacing={2} sx={{ mt: 1 }}>
//                 <Grid item xs={12}><TextField fullWidth label="HRA (% of Basic)" type="number" value={formulas.hra} onChange={(e) => handleFormulaChange("hra", Number(e.target.value))} InputProps={{ endAdornment: "%" }} /></Grid>
//                 <Grid item xs={12}><TextField fullWidth label="Basic + DA (% of Basic)" type="number" value={formulas.basicDa} onChange={(e) => handleFormulaChange("basicDa", Number(e.target.value))} InputProps={{ endAdornment: "%" }} /></Grid>
//                 <Grid item xs={12}><TextField fullWidth label="Medical Allowance (If ESIC Applicable) (%)" type="number" value={formulas.medicalEsicApplicable} onChange={(e) => handleFormulaChange("medicalEsicApplicable", Number(e.target.value))} InputProps={{ endAdornment: "%" }}/></Grid>
//                 <Grid item xs={12}><TextField fullWidth label="Medical Allowance (If ESIC Not Applicable) (%)" type="number" value={formulas.medicalEsicNotApplicable} onChange={(e) => handleFormulaChange("medicalEsicNotApplicable", Number(e.target.value))} InputProps={{ endAdornment: "%" }} /></Grid>
//                 <Grid item xs={12}><TextField fullWidth label="Conveyance Allowance (If ESIC Applicable) (%)" type="number" value={formulas.conveyanceEsicApplicable} onChange={(e) => handleFormulaChange("conveyanceEsicApplicable", Number(e.target.value))}  InputProps={{ endAdornment: "%" }}/></Grid>
//                 <Grid item xs={12}><TextField fullWidth label="Conveyance Allowance (If ESIC Not Applicable) (%)" type="number" value={formulas.conveyanceEsicNotApplicable} onChange={(e) => handleFormulaChange("conveyanceEsicNotApplicable", Number(e.target.value))} InputProps={{ endAdornment: "%" }}/></Grid>
//               </Grid>
//             </CardContent>
//           </Card>
//         </Grid>

//         {/* Deductions Formula */}
//         <Grid item xs={12} md={6}>
//           <Card>
//             <CardContent>
//               <Typography variant="h6" gutterBottom color="error">Deductions Formula Configuration</Typography>
//               <Grid container spacing={2} sx={{ mt: 1 }}>
//                 <Grid item xs={12}><TextField fullWidth label="PF Employee Contribution (% of Basic)" type="number" value={formulas.pfEmployee} onChange={(e) => handleFormulaChange("pfEmployee", Number(e.target.value))} InputProps={{ endAdornment: "%" }} /></Grid>
//                 <Grid item xs={12}><TextField fullWidth label="ESI (% of Gross)" type="number" value={formulas.esi} onChange={(e) => handleFormulaChange("esi", Number(e.target.value))} InputProps={{ endAdornment: "%" }} /></Grid>
//                 <Grid item xs={12}><TextField fullWidth label="TDS (% of Gross)" type="number" value={formulas.tds} onChange={(e) => handleFormulaChange("tds", Number(e.target.value))} InputProps={{ endAdornment: "%" }} /></Grid>
//                 <Grid item xs={12}><TextField fullWidth label="MLWF (Fixed Amount)" type="number" value={formulas.mlwf} onChange={(e) => handleFormulaChange("mlwf", Number(e.target.value))} /></Grid>
//                 <Grid item xs={12}><TextField fullWidth label="PT for Male (Fixed Amount)" type="number" value={formulas.ptMale} onChange={(e) => handleFormulaChange("ptMale", Number(e.target.value))} /></Grid>
//                 <Grid item xs={12}><TextField fullWidth label="PT for Female (Fixed Amount)" type="number" value={formulas.ptFemale} onChange={(e) => handleFormulaChange("ptFemale", Number(e.target.value))} /></Grid>
//               </Grid>
//             </CardContent>
//           </Card>
//         </Grid>

//         {/* Benefits Section */}
//         <Grid item xs={12}>
//           <Card>
//             <CardContent>
//               <Typography variant="h6" gutterBottom sx={{ color: 'success.main' }}>Benefits Configuration (Employer Contributions)</Typography>
//               <Grid container spacing={2} sx={{ mt: 1 }}>
//                 <Grid item xs={12} md={4}><TextField fullWidth label="PF - Employer Contribution (% of Basic)" type="number" value={formulas.pfEmployer} onChange={(e) => handleFormulaChange("pfEmployer", Number(e.target.value))} InputProps={{ endAdornment: "%" }} /></Grid>
//                 <Grid item xs={12} md={4}><TextField fullWidth label="ESIC - Employer Contribution (% of Gross)" type="number" value={formulas.esicEmployer} onChange={(e) => handleFormulaChange("esicEmployer", Number(e.target.value))} InputProps={{ endAdornment: "%" }} /></Grid>
//                 <Grid item xs={12} md={4}><TextField fullWidth label="Gratuity (% of Basic)" type="number" value={formulas.gratuity} onChange={(e) => handleFormulaChange("gratuity", Number(e.target.value))} InputProps={{ endAdornment: "%" }} /></Grid>
//               </Grid>
//             </CardContent>
//           </Card>
//         </Grid>

//       </Grid>

//       <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
//         <Button variant="contained" size="large" onClick={handleSave} sx={{ minWidth: 200 }} disabled={saving}>
//           {saving ? <CircularProgress size={24} color="inherit" /> : 'Save Configuration'}
//         </Button>
//       </Box>
//     </Box>
//   )
// }




// import { useState, useEffect } from "react";
// import { Card, CardContent, Typography, Grid, TextField, Button, Box, Alert, CircularProgress } from "@mui/material";
// import  axiosInstance from  "../../utils/axiosInstance";  // Make sure this path is correct

// // Mapping from the API's 'particulars' key to our component's state key
// const apiToStateKeyMap = {
//   'hra': 'hra',
//   'basic_plus_da': 'basicDa',
//   'medical_allowance_with_esic': 'medicalEsicApplicable',
//   'medical_allowance_without_esic': 'medicalEsicNotApplicable',
//   'conveyance_allowance_with_esic': 'conveyanceEsicApplicable',
//   'conveyance_allowance_without_esic': 'conveyanceEsicNotApplicable',
//   'pf_employer_contribution': 'pfEmployer',
//   'esic_employer_contribution': 'esicEmployer',
//   'gratuity': 'gratuity',
//   'pf_employee_contribution': 'pfEmployee',
//   'esic_employee_contribution': 'esi',
//   'tds': 'tds',
//   'mlwf_deduction': 'mlwf',
//   'pt_for_male': 'ptMale',
//   'pt_for_female': 'ptFemale'
// };

// // Fields that are treated as fixed amounts, not percentages
// const fixedAmountFields = ['mlwf', 'ptMale', 'ptFemale'];

// export default function PayrollSetup() {
//   // --- MODIFIED: Initial state uses empty strings for a cleaner UI ---
//   const [formulas, setFormulas] = useState({
//     hra: '', basicDa: '', medicalEsicApplicable: '', medicalEsicNotApplicable: '',
//     conveyanceEsicApplicable: '', conveyanceEsicNotApplicable: '', pfEmployer: '',
//     esicEmployer: '', gratuity: '', pfEmployee: '', esi: '', tds: '',
//     mlwf: '', ptMale: '', ptFemale: '',
//   });

//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [alert, setAlert] = useState({ show: false, message: "", severity: "success" });

//   useEffect(() => {
//     const fetchConfig = async () => {
//       setLoading(true);
//       try {
//         const response = await axiosInstance.get('/api/payroll_setup_configuration/');
//         if (response.data.status === 'success') {
//           const newFormulas = {};
//           response.data.data.forEach(item => {
//             const stateKey = apiToStateKeyMap[item.particulars];
//             if (stateKey) {
//               const value = parseFloat(item.value);
//               newFormulas[stateKey] = fixedAmountFields.includes(stateKey) 
//                 ? value 
//                 : value * 100;
//             }
//           });
//           setFormulas(prev => ({ ...prev, ...newFormulas }));
//         }
//       } catch (error) {
//         console.error("Failed to fetch payroll configuration:", error);
//         setAlert({ show: true, message: "Failed to load configuration.", severity: "error" });
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchConfig();
//   }, []);

//   // --- THE FIX: Input validation to allow only positive numbers ---
//   const handleFormulaChange = (field, value) => {
//     const numericValue = Number(value);
    
//     // Only update state if the field is cleared (empty string) or the number is positive.
//     if (value === "" || numericValue > 0) {
//       setFormulas((prev) => ({ ...prev, [field]: value }));
//     }
//   };

//   const handleSave = async () => {
//     setSaving(true);
//     const payload = {};
    
//     // Loop through each API key defined in our map to build the payload
//     for (const apiKey in apiToStateKeyMap) {
//         const stateKey = apiToStateKeyMap[apiKey]; // e.g., 'basicDa'
        
//         // Get value from state. If it's empty string or falsy, default to 0.
//         const valueFromState = formulas[stateKey] || 0;

//         const valueToSend = fixedAmountFields.includes(stateKey)
//             ? valueFromState
//             : valueFromState / 100; // Convert % to decimal

//         payload[apiKey] = valueToSend.toString();
//     }

//     try {
//       await axiosInstance.post('/api/payroll_setup_configuration/', payload);
//       setAlert({ show: true, message: "Payroll configuration saved successfully!", severity: "success" });
//     } catch (error) {
//       console.error("Failed to save payroll configuration:", error);
//       setAlert({ show: true, message: "Failed to save configuration.", severity: "error" });
//     } finally {
//       setSaving(false);
//       setTimeout(() => setAlert({ show: false, message: "", severity: "success" }), 3000);
//     }
//   };
  
//   if (loading) {
//       return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box>
//   }

//   return (
//     <Box>
//       <Typography variant="h4" gutterBottom>
//         Payroll Setup Configuration
//       </Typography>

//       {alert.show && (
//         <Alert severity={alert.severity} sx={{ mb: 2 }} onClose={() => setAlert(prev => ({...prev, show: false}))}>
//           {alert.message}
//         </Alert>
//       )}

//       <Grid container spacing={3}>
//         {/* Earnings Formula */}
//         <Grid item xs={12} md={6}>
//           <Card>
//             <CardContent>
//               <Typography variant="h6" gutterBottom sx={{ color: 'primary.main' }}>Earnings Formula Configuration</Typography>
//               <Grid container spacing={2} sx={{ mt: 1 }}>
//                 <Grid item xs={12}><TextField fullWidth label="HRA (% of Basic)" type="number" value={formulas.hra} onChange={(e) => handleFormulaChange("hra", e.target.value)} InputProps={{ endAdornment: "%" }} /></Grid>
//                 <Grid item xs={12}><TextField fullWidth label="Basic + DA (% of Basic)" type="number" value={formulas.basicDa} onChange={(e) => handleFormulaChange("basicDa", e.target.value)} InputProps={{ endAdornment: "%" }} /></Grid>
//                 <Grid item xs={12}><TextField fullWidth label="Medical Allowance (If ESIC Applicable) (%)" type="number" value={formulas.medicalEsicApplicable} onChange={(e) => handleFormulaChange("medicalEsicApplicable", e.target.value)} InputProps={{ endAdornment: "%" }}/></Grid>
//                 <Grid item xs={12}><TextField fullWidth label="Medical Allowance (If ESIC Not Applicable) (%)" type="number" value={formulas.medicalEsicNotApplicable} onChange={(e) => handleFormulaChange("medicalEsicNotApplicable", e.target.value)} InputProps={{ endAdornment: "%" }} /></Grid>
//                 <Grid item xs={12}><TextField fullWidth label="Conveyance Allowance (If ESIC Applicable) (%)" type="number" value={formulas.conveyanceEsicApplicable} onChange={(e) => handleFormulaChange("conveyanceEsicApplicable", e.target.value)}  InputProps={{ endAdornment: "%" }}/></Grid>
//                 <Grid item xs={12}><TextField fullWidth label="Conveyance Allowance (If ESIC Not Applicable) (%)" type="number" value={formulas.conveyanceEsicNotApplicable} onChange={(e) => handleFormulaChange("conveyanceEsicNotApplicable", e.target.value)} InputProps={{ endAdornment: "%" }}/></Grid>
//               </Grid>
//             </CardContent>
//           </Card>
//         </Grid>

//         {/* Deductions Formula */}
//         <Grid item xs={12} md={6}>
//           <Card>
//             <CardContent>
//               <Typography variant="h6" gutterBottom color="error">Deductions Formula Configuration</Typography>
//               <Grid container spacing={2} sx={{ mt: 1 }}>
//                 <Grid item xs={12}><TextField fullWidth label="PF Employee Contribution (% of Basic)" type="number" value={formulas.pfEmployee} onChange={(e) => handleFormulaChange("pfEmployee", e.target.value)} InputProps={{ endAdornment: "%" }} /></Grid>
//                 <Grid item xs={12}><TextField fullWidth label="ESI (% of Gross)" type="number" value={formulas.esi} onChange={(e) => handleFormulaChange("esi", e.target.value)} InputProps={{ endAdornment: "%" }} /></Grid>
//                 <Grid item xs={12}><TextField fullWidth label="TDS (% of Gross)" type="number" value={formulas.tds} onChange={(e) => handleFormulaChange("tds", e.target.value)} InputProps={{ endAdornment: "%" }} /></Grid>
//                 <Grid item xs={12}><TextField fullWidth label="MLWF (Fixed Amount)" type="number" value={formulas.mlwf} onChange={(e) => handleFormulaChange("mlwf", e.target.value)} /></Grid>
//                 <Grid item xs={12}><TextField fullWidth label="PT for Male (Fixed Amount)" type="number" value={formulas.ptMale} onChange={(e) => handleFormulaChange("ptMale", e.target.value)} /></Grid>
//                 <Grid item xs={12}><TextField fullWidth label="PT for Female (Fixed Amount)" type="number" value={formulas.ptFemale} onChange={(e) => handleFormulaChange("ptFemale", e.target.value)} /></Grid>
//               </Grid>
//             </CardContent>
//           </Card>
//         </Grid>

//         {/* Benefits Section */}
//         <Grid item xs={12}>
//           <Card>
//             <CardContent>
//               <Typography variant="h6" gutterBottom sx={{ color: 'success.main' }}>Benefits Configuration (Employer Contributions)</Typography>
//               <Grid container spacing={2} sx={{ mt: 1 }}>
//                 <Grid item xs={12} md={4}><TextField fullWidth label="PF - Employer Contribution (% of Basic)" type="number" value={formulas.pfEmployer} onChange={(e) => handleFormulaChange("pfEmployer", e.target.value)} InputProps={{ endAdornment: "%" }} /></Grid>
//                 <Grid item xs={12} md={4}><TextField fullWidth label="ESIC - Employer Contribution (% of Gross)" type="number" value={formulas.esicEmployer} onChange={(e) => handleFormulaChange("esicEmployer", e.target.value)} InputProps={{ endAdornment: "%" }} /></Grid>
//                 <Grid item xs={12} md={4}><TextField fullWidth label="Gratuity (% of Basic)" type="number" value={formulas.gratuity} onChange={(e) => handleFormulaChange("gratuity", e.target.value)} InputProps={{ endAdornment: "%" }} /></Grid>
//               </Grid>
//             </CardContent>
//           </Card>
//         </Grid>

//       </Grid>

//       <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
//         <Button variant="contained" size="large" onClick={handleSave} sx={{ minWidth: 200 }} disabled={saving}>
//           {saving ? <CircularProgress size={24} color="inherit" /> : 'Save Configuration'}
//         </Button>
//       </Box>
//     </Box>
//   )
// }








// import { useState, useEffect } from "react";
// import { 
//     Card, 
//     CardContent, 
//     Typography, 
//     Grid, 
//     TextField, 
//     Button, 
//     Box, 
//     Alert, 
//     CircularProgress,
//     ThemeProvider,
//     createTheme
// } from "@mui/material";
// import axiosInstance from "../../utils/axiosInstance";

// const theme = createTheme({
//   palette: {
//     primary: {
//       main: '#8C257C',
//     },
//     error: {
//       main: '#D32F2F',
//     },
//     success: {
//         main: '#2E7D32'
//     }
//   },
// });

// const apiToStateKeyMap = {
//   'hra': 'hra',
//   'basic_plus_da': 'basicDa',
//   'medical_allowance_with_esic': 'medicalEsicApplicable',
//   'medical_allowance_without_esic': 'medicalEsicNotApplicable',
//   'conveyance_allowance_with_esic': 'conveyanceEsicApplicable',
//   'conveyance_allowance_without_esic': 'conveyanceEsicNotApplicable',
//   'pf_employer_contribution': 'pfEmployer',
//   'esic_employer_contribution': 'esicEmployer',
//   'gratuity': 'gratuity',
//   'pf_employee_contribution': 'pfEmployee',
//   'esic_employee_contribution': 'esi',
//   'tds': 'tds',
//   'mlwf_deduction': 'mlwf',
//   'pt_for_male': 'ptMale',
//   'pt_for_female': 'ptFemale'
// };

// const fixedAmountFields = ['mlwf', 'ptMale', 'ptFemale'];

// function PayrollSetupContent() {
//   const [formulas, setFormulas] = useState({
//     hra: '', basicDa: '', medicalEsicApplicable: '', medicalEsicNotApplicable: '',
//     conveyanceEsicApplicable: '', conveyanceEsicNotApplicable: '', pfEmployer: '',
//     esicEmployer: '', gratuity: '', pfEmployee: '', esi: '', tds: '',
//     mlwf: '', ptMale: '', ptFemale: '',
//   });

//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [alert, setAlert] = useState({ show: false, message: "", severity: "success" });

//   useEffect(() => {
//     const fetchConfig = async () => {
//       setLoading(true);
//       try {
//         const response = await axiosInstance.get('/api/payroll_setup_configuration/');
//         if (response.data.status === 'success') {
//           const newFormulas = {};
//           response.data.data.forEach(item => {
//             const stateKey = apiToStateKeyMap[item.particulars];
//             if (stateKey) {
//               const value = parseFloat(item.value);
//               newFormulas[stateKey] = fixedAmountFields.includes(stateKey) 
//                 ? value 
//                 : value * 100;
//             }
//           });
//           setFormulas(prev => ({ ...prev, ...newFormulas }));
//         }
//       } catch (error) {
//         console.error("Failed to fetch payroll configuration:", error);
//         setAlert({ show: true, message: "Failed to load configuration.", severity: "error" });
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchConfig();
//   }, []);

//   const handleFormulaChange = (field, value) => {
//     const numericValue = Number(value);
//     if (value === "" || numericValue > 0) {
//       setFormulas((prev) => ({ ...prev, [field]: value }));
//     }
//   };

//   const handleSave = async () => {
//     setSaving(true);
//     const payload = {};
    
//     for (const apiKey in apiToStateKeyMap) {
//         const stateKey = apiToStateKeyMap[apiKey];
//         const valueFromState = formulas[stateKey] || 0;
//         const valueToSend = fixedAmountFields.includes(stateKey)
//             ? valueFromState
//             : valueFromState / 100;
//         payload[apiKey] = valueToSend.toString();
//     }

//     try {
//       await axiosInstance.post('/api/payroll_setup_configuration/', payload);
//       setAlert({ show: true, message: "Payroll configuration saved successfully!", severity: "success" });
//     } catch (error) {
//       console.error("Failed to save payroll configuration:", error);
//       setAlert({ show: true, message: "Failed to save configuration.", severity: "error" });
//     } finally {
//       setSaving(false);
//       setTimeout(() => setAlert({ show: false, message: "", severity: "success" }), 3000);
//     }
//   };
  
//   if (loading) {
//       return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress color="primary" /></Box>
//   }

//   return (
//     <Box>
//       <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold', color: 'primary.main' }}>
//         Payroll Setup Configuration
//       </Typography>

//       {alert.show && (
//         <Alert severity={alert.severity} sx={{ mb: 2 }} onClose={() => setAlert(prev => ({...prev, show: false}))}>
//           {alert.message}
//         </Alert>
//       )}

//       <Grid container spacing={3}>
//         <Grid item xs={12} md={6}>
//           <Card>
//             <CardContent>
//               <Typography variant="h6" gutterBottom sx={{ color: 'primary.main', fontWeight: 'bold' }}>
//                 Earnings Formula Configuration
//               </Typography>
//               <Grid container spacing={2} sx={{ mt: 1 }}>
//                 <Grid item xs={12}><TextField fullWidth label="HRA (% of Basic)" type="number" value={formulas.hra} onChange={(e) => handleFormulaChange("hra", e.target.value)} InputProps={{ endAdornment: "%" }} /></Grid>
//                 <Grid item xs={12}><TextField fullWidth label="Basic + DA (% of Basic)" type="number" value={formulas.basicDa} onChange={(e) => handleFormulaChange("basicDa", e.target.value)} InputProps={{ endAdornment: "%" }} /></Grid>
//                 <Grid item xs={12}><TextField fullWidth label="Medical Allowance (If ESIC Applicable) (%)" type="number" value={formulas.medicalEsicApplicable} onChange={(e) => handleFormulaChange("medicalEsicApplicable", e.target.value)} InputProps={{ endAdornment: "%" }}/></Grid>
//                 <Grid item xs={12}><TextField fullWidth label="Medical Allowance (If ESIC Not Applicable) (%)" type="number" value={formulas.medicalEsicNotApplicable} onChange={(e) => handleFormulaChange("medicalEsicNotApplicable", e.target.value)} InputProps={{ endAdornment: "%" }} /></Grid>
//                 <Grid item xs={12}><TextField fullWidth label="Conveyance Allowance (If ESIC Applicable) (%)" type="number" value={formulas.conveyanceEsicApplicable} onChange={(e) => handleFormulaChange("conveyanceEsicApplicable", e.target.value)}  InputProps={{ endAdornment: "%" }}/></Grid>
//                 <Grid item xs={12}><TextField fullWidth label="Conveyance Allowance (If ESIC Not Applicable) (%)" type="number" value={formulas.conveyanceEsicNotApplicable} onChange={(e) => handleFormulaChange("conveyanceEsicNotApplicable", e.target.value)} InputProps={{ endAdornment: "%" }}/></Grid>
//               </Grid>
//             </CardContent>
//           </Card>
//         </Grid>

//         <Grid item xs={12} md={6}>
//           <Card>
//             <CardContent>
//               <Typography variant="h6" gutterBottom color="error" sx={{ fontWeight: 'bold' }}>
//                 Deductions Formula Configuration
//               </Typography>
//               <Grid container spacing={2} sx={{ mt: 1 }}>
//                 <Grid item xs={12}><TextField fullWidth label="PF Employee Contribution (% of Basic)" type="number" value={formulas.pfEmployee} onChange={(e) => handleFormulaChange("pfEmployee", e.target.value)} InputProps={{ endAdornment: "%" }} /></Grid>
//                 <Grid item xs={12}><TextField fullWidth label="ESI (% of Gross)" type="number" value={formulas.esi} onChange={(e) => handleFormulaChange("esi", e.target.value)} InputProps={{ endAdornment: "%" }} /></Grid>
//                 <Grid item xs={12}><TextField fullWidth label="TDS (% of Gross)" type="number" value={formulas.tds} onChange={(e) => handleFormulaChange("tds", e.target.value)} InputProps={{ endAdornment: "%" }} /></Grid>
//                 <Grid item xs={12}><TextField fullWidth label="MLWF (Fixed Amount)" type="number" value={formulas.mlwf} onChange={(e) => handleFormulaChange("mlwf", e.target.value)} /></Grid>
//                 <Grid item xs={12}><TextField fullWidth label="PT for Male (Fixed Amount)" type="number" value={formulas.ptMale} onChange={(e) => handleFormulaChange("ptMale", e.target.value)} /></Grid>
//                 <Grid item xs={12}><TextField fullWidth label="PT for Female (Fixed Amount)" type="number" value={formulas.ptFemale} onChange={(e) => handleFormulaChange("ptFemale", e.target.value)} /></Grid>
//               </Grid>
//             </CardContent>
//           </Card>
//         </Grid>

//         <Grid item xs={12}>
//           <Card>
//             <CardContent>
//               <Typography variant="h6" gutterBottom sx={{ color: 'success.main', fontWeight: 'bold' }}>
//                 Benefits Configuration (Employer Contributions)
//               </Typography>
//               <Grid container spacing={2} sx={{ mt: 1 }}>
//                 <Grid item xs={12} md={4}><TextField fullWidth label="PF - Employer Contribution (% of Basic)" type="number" value={formulas.pfEmployer} onChange={(e) => handleFormulaChange("pfEmployer", e.target.value)} InputProps={{ endAdornment: "%" }} /></Grid>
//                 <Grid item xs={12} md={4}><TextField fullWidth label="ESIC - Employer Contribution (% of Gross)" type="number" value={formulas.esicEmployer} onChange={(e) => handleFormulaChange("esicEmployer", e.target.value)} InputProps={{ endAdornment: "%" }} /></Grid>
//                 <Grid item xs={12} md={4}><TextField fullWidth label="Gratuity (% of Basic)" type="number" value={formulas.gratuity} onChange={(e) => handleFormulaChange("gratuity", e.target.value)} InputProps={{ endAdornment: "%" }} /></Grid>
//               </Grid>
//             </CardContent>
//           </Card>
//         </Grid>

//       </Grid>

//       <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
//         <Button variant="contained" size="large" onClick={handleSave} sx={{ minWidth: 200 }} disabled={saving} color="primary">
//           {saving ? <CircularProgress size={24} color="inherit" /> : 'Save Configuration'}
//         </Button>
//       </Box>
//     </Box>
//   )
// }

// export default function PayrollSetup() {
//     return (
//         <ThemeProvider theme={theme}>
//             <PayrollSetupContent />
//         </ThemeProvider>
//     );
// }






// import { useState, useEffect } from "react";
// import {
//     Card,
//     CardContent,
//     Typography,
//     Grid,
//     TextField,
//     Button,
//     Box,
//     Alert,
//     CircularProgress,
//     ThemeProvider,
//     createTheme,
//     MenuItem,
//     Table,
//     TableBody,
//     TableCell,
//     TableContainer,
//     TableHead,
//     TableRow,
//     Paper
// } from "@mui/material";
// import axiosInstance from "../../utils/axiosInstance";

// const theme = createTheme({
//   palette: {
//     primary: {
//       main: '#8C257C',
//     },
//     error: {
//       main: '#D32F2F',
//     },
//     success: {
//         main: '#2E7D32'
//     }
//   },
// });

// const apiToStateKeyMap = {
//   'hra': 'hra',
//   'basic_plus_da': 'basicDa',
//   'medical_allowance_with_esic': 'medicalEsicApplicable',
//   'medical_allowance_without_esic': 'medicalEsicNotApplicable',
//   'conveyance_allowance_with_esic': 'conveyanceEsicApplicable',
//   'conveyance_allowance_without_esic': 'conveyanceEsicNotApplicable',
//   'pf_employer_contribution': 'pfEmployer',
//   'esic_employer_contribution': 'esicEmployer',
//   'gratuity': 'gratuity',
//   'pf_employee_contribution': 'pfEmployee',
//   'esic_employee_contribution': 'esi',
//   'mlwf_deduction': 'mlwf',
//   'pt_for_male': 'ptMale',
//   'pt_for_female': 'ptFemale'
// };

// const fixedAmountFields = ['mlwf', 'ptMale', 'ptFemale'];

// // Mock data for dropdowns
// const employees = [
//     { value: 'emp001', label: 'John Doe' },
//     { value: 'emp002', label: 'Jane Smith' },
//     { value: 'emp003', label: 'Peter Jones' },
// ];

// const financialYears = ['2024-2025', '2025-2026', '2026-2027'];
// const financialMonths = [
//     'January', 'February', 'March', 'April', 'May', 'June',
//     'July', 'August', 'September', 'October', 'November', 'December'
// ];


// function PayrollSetupContent() {
//   const [formulas, setFormulas] = useState({
//     hra: '', basicDa: '', medicalEsicApplicable: '', medicalEsicNotApplicable: '',
//     conveyanceEsicApplicable: '', conveyanceEsicNotApplicable: '', pfEmployer: '',
//     esicEmployer: '', gratuity: '', pfEmployee: '', esi: '',
//     mlwf: '', ptMale: '', ptFemale: '',
//   });

//   const [tdsFilters, setTdsFilters] = useState({
//     employee: '',
//     employeeName: '',
//     financialYear: '',
//     financialMonth: '',
//     amount: ''
//   });

//   const [tdsData, setTdsData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [alert, setAlert] = useState({ show: false, message: "", severity: "success" });

//   useEffect(() => {
//     const fetchConfig = async () => {
//       setLoading(true);
//       try {
//         const response = await axiosInstance.get('/api/payroll_setup_configuration/');
//         if (response.data.status === 'success') {
//           const newFormulas = {};
//           response.data.data.forEach(item => {
//             const stateKey = apiToStateKeyMap[item.particulars];
//             if (stateKey) {
//               const value = parseFloat(item.value);
//               newFormulas[stateKey] = fixedAmountFields.includes(stateKey)
//                 ? value
//                 : value * 100;
//             }
//           });
//           setFormulas(prev => ({ ...prev, ...newFormulas }));
//         }
//       } catch (error) {
//         console.error("Failed to fetch payroll configuration:", error);
//         setAlert({ show: true, message: "Failed to load configuration.", severity: "error" });
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchConfig();
//   }, []);

//   const handleFormulaChange = (field, value) => {
//     const numericValue = Number(value);
//     if (value === "" || numericValue >= 0) {
//       setFormulas((prev) => ({ ...prev, [field]: value }));
//     }
//   };

//   const handleTdsFilterChange = (event) => {
//     const { name, value } = event.target;
//     let newFilters = { ...tdsFilters, [name]: value };

//     if (name === 'employee') {
//         const selectedEmployee = employees.find(emp => emp.value === value);
//         newFilters.employeeName = selectedEmployee ? selectedEmployee.label : '';
//     }
//     setTdsFilters(newFilters);
//   };

//   const handleTdsSave = () => {
//     const { employee, financialYear, financialMonth, amount, employeeName } = tdsFilters;
//     if (!employee || !financialYear || !financialMonth || !amount || Number(amount) <= 0) {
//         setAlert({ show: true, message: "Please fill all TDS fields and enter a valid positive amount.", severity: "error" });
//         return;
//     }

//     const newEntry = {
//         srNo: tdsData.length + 1,
//         employeeName,
//         financialYear,
//         financialMonth,
//         tdsAmount: parseFloat(amount).toFixed(2),
//     };

//     setTdsData(prev => [...prev, newEntry]);
//     setTdsFilters({ employee: '', employeeName: '', financialYear: '', financialMonth: '', amount: '' });
//     setAlert({ show: false, message: "", severity: "success" });
//   };

//   const handleSave = async () => {
//     setSaving(true);
//     const payload = {};

//     for (const apiKey in apiToStateKeyMap) {
//         const stateKey = apiToStateKeyMap[apiKey];
//         const valueFromState = formulas[stateKey] || 0;
//         const valueToSend = fixedAmountFields.includes(stateKey)
//             ? valueFromState
//             : valueFromState / 100;
//         payload[apiKey] = valueToSend.toString();
//     }

//     try {
//       await axiosInstance.post('/api/payroll_setup_configuration/', payload);
//       setAlert({ show: true, message: "Payroll configuration saved successfully!", severity: "success" });
//     } catch (error) {
//       console.error("Failed to save payroll configuration:", error);
//       setAlert({ show: true, message: "Failed to save configuration.", severity: "error" });
//     } finally {
//       setSaving(false);
//       setTimeout(() => setAlert({ show: false, message: "", severity: "success" }), 3000);
//     }
//   };

//   if (loading) {
//       return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress color="primary" /></Box>
//   }

//   return (
//     <Box>
//       <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold', color: 'primary.main' }}>
//         Payroll Setup Configuration
//       </Typography>

//       {alert.show && (
//         <Alert severity={alert.severity} sx={{ mb: 2 }} onClose={() => setAlert(prev => ({...prev, show: false}))}>
//           {alert.message}
//         </Alert>
//       )}

//       <Grid container spacing={3}>
//         <Grid item xs={12} md={6}>
//           <Card>
//             <CardContent>
//               <Typography variant="h6" gutterBottom sx={{ color: 'primary.main', fontWeight: 'bold' }}>
//                 Earnings Formula Configuration
//               </Typography>
//               <Grid container spacing={2} sx={{ mt: 1 }}>
//                 <Grid item xs={12}><TextField fullWidth label="HRA (% of Basic)" type="number" value={formulas.hra} onChange={(e) => handleFormulaChange("hra", e.target.value)} InputProps={{ endAdornment: "%" }} /></Grid>
//                 <Grid item xs={12}><TextField fullWidth label="Basic + DA (% of Basic)" type="number" value={formulas.basicDa} onChange={(e) => handleFormulaChange("basicDa", e.target.value)} InputProps={{ endAdornment: "%" }} /></Grid>
//                 <Grid item xs={12}><TextField fullWidth label="Medical Allowance (If ESIC Applicable) (%)" type="number" value={formulas.medicalEsicApplicable} onChange={(e) => handleFormulaChange("medicalEsicApplicable", e.target.value)} InputProps={{ endAdornment: "%" }}/></Grid>
//                 <Grid item xs={12}><TextField fullWidth label="Medical Allowance (If ESIC Not Applicable) (%)" type="number" value={formulas.medicalEsicNotApplicable} onChange={(e) => handleFormulaChange("medicalEsicNotApplicable", e.target.value)} InputProps={{ endAdornment: "%" }} /></Grid>
//                 <Grid item xs={12}><TextField fullWidth label="Conveyance Allowance (If ESIC Applicable) (%)" type="number" value={formulas.conveyanceEsicApplicable} onChange={(e) => handleFormulaChange("conveyanceEsicApplicable", e.target.value)}  InputProps={{ endAdornment: "%" }}/></Grid>
//                 <Grid item xs={12}><TextField fullWidth label="Conveyance Allowance (If ESIC Not Applicable) (%)" type="number" value={formulas.conveyanceEsicNotApplicable} onChange={(e) => handleFormulaChange("conveyanceEsicNotApplicable", e.target.value)} InputProps={{ endAdornment: "%" }}/></Grid>
//               </Grid>
//             </CardContent>
//           </Card>
//         </Grid>

//         <Grid item xs={12} md={6}>
//           <Card>
//             <CardContent>
//               <Typography variant="h6" gutterBottom color="error" sx={{ fontWeight: 'bold' }}>
//                 Deductions Formula Configuration
//               </Typography>
//               <Grid container spacing={2} sx={{ mt: 1 }}>
//                 <Grid item xs={12}><TextField fullWidth label="PF Employee Contribution (% of Basic)" type="number" value={formulas.pfEmployee} onChange={(e) => handleFormulaChange("pfEmployee", e.target.value)} InputProps={{ endAdornment: "%" }} /></Grid>
//                 <Grid item xs={12}><TextField fullWidth label="ESI (% of Gross)" type="number" value={formulas.esi} onChange={(e) => handleFormulaChange("esi", e.target.value)} InputProps={{ endAdornment: "%" }} /></Grid>
//                 <Grid item xs={12}><TextField fullWidth label="MLWF (Fixed Amount)" type="number" value={formulas.mlwf} onChange={(e) => handleFormulaChange("mlwf", e.target.value)} /></Grid>
//                 <Grid item xs={12}><TextField fullWidth label="PT for Male (Fixed Amount)" type="number" value={formulas.ptMale} onChange={(e) => handleFormulaChange("ptMale", e.target.value)} /></Grid>
//                 <Grid item xs={12}><TextField fullWidth label="PT for Female (Fixed Amount)" type="number" value={formulas.ptFemale} onChange={(e) => handleFormulaChange("ptFemale", e.target.value)} /></Grid>
//               </Grid>
//             </CardContent>
//           </Card>
//         </Grid>

//         <Grid item xs={12}>
//           <Card>
//             <CardContent>
//               <Typography variant="h6" gutterBottom sx={{ color: 'success.main', fontWeight: 'bold' }}>
//                 Benefits Configuration (Employer Contributions)
//               </Typography>
//               <Grid container spacing={2} sx={{ mt: 1 }}>
//                 <Grid item xs={12} md={4}><TextField fullWidth label="PF - Employer Contribution (% of Basic)" type="number" value={formulas.pfEmployer} onChange={(e) => handleFormulaChange("pfEmployer", e.target.value)} InputProps={{ endAdornment: "%" }} /></Grid>
//                 <Grid item xs={12} md={4}><TextField fullWidth label="ESIC - Employer Contribution (% of Gross)" type="number" value={formulas.esicEmployer} onChange={(e) => handleFormulaChange("esicEmployer", e.target.value)} InputProps={{ endAdornment: "%" }} /></Grid>
//                 <Grid item xs={12} md={4}><TextField fullWidth label="Gratuity (% of Basic)" type="number" value={formulas.gratuity} onChange={(e) => handleFormulaChange("gratuity", e.target.value)} InputProps={{ endAdornment: "%" }} /></Grid>
//               </Grid>
//             </CardContent>
//           </Card>
//         </Grid>

//         <Grid item xs={12}>
//             <Box sx={{ mt: 1, display: "flex", justifyContent: "center" }}>
//                 <Button variant="contained" size="large" onClick={handleSave} sx={{ minWidth: 200 }} disabled={saving} color="primary">
//                 {saving ? <CircularProgress size={24} color="inherit" /> : 'Save Configuration'}
//                 </Button>
//             </Box>
//         </Grid>

//         <Grid item xs={12}>
//             <Card>
//                 <CardContent>
//                     <Typography variant="h6" gutterBottom sx={{ color: 'primary.main', fontWeight: 'bold' }}>
//                         TDS
//                     </Typography>
//                     <Grid container spacing={2} sx={{ mt: 1 }}>
//                         <Grid item xs={12} sm={6} md={3}>
//                             <TextField select fullWidth label="Select Employee" name="employee" value={tdsFilters.employee} onChange={handleTdsFilterChange}>
//                                 {employees.map(option => (
//                                     <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
//                                 ))}
//                             </TextField>
//                         </Grid>
//                         <Grid item xs={12} sm={6} md={3}>
//                             <TextField select fullWidth label="Select Financial Year" name="financialYear" value={tdsFilters.financialYear} onChange={handleTdsFilterChange}>
//                                 {financialYears.map(year => (
//                                     <MenuItem key={year} value={year}>{year}</MenuItem>
//                                 ))}
//                             </TextField>
//                         </Grid>
//                         <Grid item xs={12} sm={6} md={3}>
//                             <TextField select fullWidth label="Select Financial Month" name="financialMonth" value={tdsFilters.financialMonth} onChange={handleTdsFilterChange}>
//                                 {financialMonths.map(month => (
//                                     <MenuItem key={month} value={month}>{month}</MenuItem>
//                                 ))}
//                             </TextField>
//                         </Grid>
//                         <Grid item xs={12} sm={6} md={3}>
//                             <TextField fullWidth label="Enter Amount" name="amount" type="number" value={tdsFilters.amount} onChange={handleTdsFilterChange} />
//                         </Grid>
//                     </Grid>
//                     <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
//                         <Button variant="contained" onClick={handleTdsSave}>Save</Button>
//                     </Box>
//                 </CardContent>
//             </Card>
//         </Grid>

//         {tdsData.length > 0 && (
//             <Grid item xs={12}>
//                 <TableContainer component={Paper}>
//                     <Table sx={{ minWidth: 650 }} aria-label="simple table">
//                         <TableHead>
//                             <TableRow>
//                                 <TableCell sx={{ fontWeight: 'bold' }}>Sr. No</TableCell>
//                                 <TableCell sx={{ fontWeight: 'bold' }}>Employee Name</TableCell>
//                                 <TableCell sx={{ fontWeight: 'bold' }}>Financial Year</TableCell>
//                                 <TableCell sx={{ fontWeight: 'bold' }}>Financial Month</TableCell>
//                                 <TableCell sx={{ fontWeight: 'bold' }}>TDS Amount</TableCell>
//                             </TableRow>
//                         </TableHead>
//                         <TableBody>
//                             {tdsData.map((row) => (
//                                 <TableRow key={row.srNo}>
//                                     <TableCell>{row.srNo}</TableCell>
//                                     <TableCell>{row.employeeName}</TableCell>
//                                     <TableCell>{row.financialYear}</TableCell>
//                                     <TableCell>{row.financialMonth}</TableCell>
//                                     <TableCell>{row.tdsAmount}</TableCell>
//                                 </TableRow>
//                             ))}
//                         </TableBody>
//                     </Table>
//                 </TableContainer>
//             </Grid>
//         )}
//       </Grid>
//     </Box>
//   )
// }

// export default function PayrollSetup() {
//     return (
//         <ThemeProvider theme={theme}>
//             <PayrollSetupContent />
//         </ThemeProvider>
//     );
// }




// import { useState, useEffect } from "react";
// import {
//     Card,
//     CardContent,
//     Typography,
//     Grid,
//     TextField,
//     Button,
//     Box,
//     Alert,
//     CircularProgress,
//     ThemeProvider,
//     createTheme,
//     MenuItem,
//     Table,
//     TableBody,
//     TableCell,
//     TableContainer,
//     TableHead,
//     TableRow,
//     Paper
// } from "@mui/material";
// import axiosInstance from "../../utils/axiosInstance";

// const theme = createTheme({
//   palette: {
//     primary: {
//       main: '#8C257C',
//     },
//     error: {
//       main: '#D32F2F',
//     },
//     success: {
//         main: '#2E7D32'
//     }
//   },
// });

// const apiToStateKeyMap = {
//   'hra': 'hra',
//   'basic_plus_da': 'basicDa',
//   'medical_allowance_with_esic': 'medicalEsicApplicable',
//   'medical_allowance_without_esic': 'medicalEsicNotApplicable',
//   'conveyance_allowance_with_esic': 'conveyanceEsicApplicable',
//   'conveyance_allowance_without_esic': 'conveyanceEsicNotApplicable',
//   'pf_employer_contribution': 'pfEmployer',
//   'esic_employer_contribution': 'esicEmployer',
//   'gratuity': 'gratuity',
//   'pf_employee_contribution': 'pfEmployee',
//   'esic_employee_contribution': 'esi',
//   'mlwf_deduction': 'mlwf',
//   'pt_for_male': 'ptMale',
//   'pt_for_female': 'ptFemale'
// };

// const fixedAmountFields = ['mlwf', 'ptMale', 'ptFemale'];

// // Mock data for dropdowns
// const employees = [
//     { value: 'emp001', label: 'John Doe' },
//     { value: 'emp002', label: 'Jane Smith' },
//     { value: 'emp003', label: 'Peter Jones' },
// ];

// function PayrollSetupContent() {
//   const [formulas, setFormulas] = useState({
//     hra: '', basicDa: '', medicalEsicApplicable: '', medicalEsicNotApplicable: '',
//     conveyanceEsicApplicable: '', conveyanceEsicNotApplicable: '', pfEmployer: '',
//     esicEmployer: '', gratuity: '', pfEmployee: '', esi: '',
//     mlwf: '', ptMale: '', ptFemale: '',
//   });

//   const [tdsFilters, setTdsFilters] = useState({
//     employee: '',
//     employeeName: '',
//     fromDate: '',
//     toDate: '',
//     amount: ''
//   });

//   const [tdsData, setTdsData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [alert, setAlert] = useState({ show: false, message: "", severity: "success" });

//   useEffect(() => {
//     const fetchConfig = async () => {
//       setLoading(true);
//       try {
//         const response = await axiosInstance.get('/api/payroll_setup_configuration/');
//         if (response.data.status === 'success') {
//           const newFormulas = {};
//           response.data.data.forEach(item => {
//             const stateKey = apiToStateKeyMap[item.particulars];
//             if (stateKey) {
//               const value = parseFloat(item.value);
//               newFormulas[stateKey] = fixedAmountFields.includes(stateKey)
//                 ? value
//                 : value * 100;
//             }
//           });
//           setFormulas(prev => ({ ...prev, ...newFormulas }));
//         }
//       } catch (error) {
//         console.error("Failed to fetch payroll configuration:", error);
//         setAlert({ show: true, message: "Failed to load configuration.", severity: "error" });
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchConfig();
//   }, []);

//   const handleFormulaChange = (field, value) => {
//     const numericValue = Number(value);
//     if (value === "" || numericValue >= 0) {
//       setFormulas((prev) => ({ ...prev, [field]: value }));
//     }
//   };

//   const handleTdsFilterChange = (event) => {
//     const { name, value } = event.target;
//     let newFilters = { ...tdsFilters, [name]: value };

//     if (name === 'employee') {
//         const selectedEmployee = employees.find(emp => emp.value === value);
//         newFilters.employeeName = selectedEmployee ? selectedEmployee.label : '';
//     }
//     setTdsFilters(newFilters);
//   };

//   const handleTdsSave = () => {
//     const { employee, fromDate, toDate, amount, employeeName } = tdsFilters;
//     if (!employee || !fromDate || !toDate || !amount || Number(amount) <= 0) {
//         setAlert({ show: true, message: "Please fill all TDS fields and enter a valid positive amount.", severity: "error" });
//         return;
//     }

//     if (new Date(fromDate) > new Date(toDate)) {
//         setAlert({ show: true, message: "From Date cannot be after To Date.", severity: "error" });
//         return;
//     }

//     const newEntry = {
//         srNo: tdsData.length + 1,
//         employeeName,
//         fromDate,
//         toDate,
//         tdsAmount: parseFloat(amount).toFixed(2),
//     };

//     setTdsData(prev => [...prev, newEntry]);
//     setTdsFilters({ employee: '', employeeName: '', fromDate: '', toDate: '', amount: '' });
//     setAlert({ show: false, message: "", severity: "success" });
//   };

//   const handleSave = async () => {
//     setSaving(true);
//     const payload = {};

//     for (const apiKey in apiToStateKeyMap) {
//         const stateKey = apiToStateKeyMap[apiKey];
//         const valueFromState = formulas[stateKey] || 0;
//         const valueToSend = fixedAmountFields.includes(stateKey)
//             ? valueFromState
//             : valueFromState / 100;
//         payload[apiKey] = valueToSend.toString();
//     }

//     try {
//       await axiosInstance.post('/api/payroll_setup_configuration/', payload);
//       setAlert({ show: true, message: "Payroll configuration saved successfully!", severity: "success" });
//     } catch (error) {
//       console.error("Failed to save payroll configuration:", error);
//       setAlert({ show: true, message: "Failed to save configuration.", severity: "error" });
//     } finally {
//       setSaving(false);
//       setTimeout(() => setAlert({ show: false, message: "", severity: "success" }), 3000);
//     }
//   };

//   if (loading) {
//       return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress color="primary" /></Box>
//   }

//   return (
//     <Box>
//       <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold', color: 'primary.main' }}>
//         Payroll Setup Configuration
//       </Typography>

//       {alert.show && (
//         <Alert severity={alert.severity} sx={{ mb: 2 }} onClose={() => setAlert(prev => ({...prev, show: false}))}>
//           {alert.message}
//         </Alert>
//       )}

//       <Grid container spacing={3}>
//         <Grid item xs={12} md={6}>
//           <Card>
//             <CardContent>
//               <Typography variant="h6" gutterBottom sx={{ color: 'primary.main', fontWeight: 'bold' }}>
//                 Earnings Formula Configuration
//               </Typography>
//               <Grid container spacing={2} sx={{ mt: 1 }}>
//                 <Grid item xs={12}><TextField fullWidth label="HRA (% of Basic)" type="number" value={formulas.hra} onChange={(e) => handleFormulaChange("hra", e.target.value)} InputProps={{ endAdornment: "%" }} /></Grid>
//                 <Grid item xs={12}><TextField fullWidth label="Basic + DA (% of Basic)" type="number" value={formulas.basicDa} onChange={(e) => handleFormulaChange("basicDa", e.target.value)} InputProps={{ endAdornment: "%" }} /></Grid>
//                 <Grid item xs={12}><TextField fullWidth label="Medical Allowance (If ESIC Applicable) (%)" type="number" value={formulas.medicalEsicApplicable} onChange={(e) => handleFormulaChange("medicalEsicApplicable", e.target.value)} InputProps={{ endAdornment: "%" }}/></Grid>
//                 <Grid item xs={12}><TextField fullWidth label="Medical Allowance (If ESIC Not Applicable) (%)" type="number" value={formulas.medicalEsicNotApplicable} onChange={(e) => handleFormulaChange("medicalEsicNotApplicable", e.target.value)} InputProps={{ endAdornment: "%" }} /></Grid>
//                 <Grid item xs={12}><TextField fullWidth label="Conveyance Allowance (If ESIC Applicable) (%)" type="number" value={formulas.conveyanceEsicApplicable} onChange={(e) => handleFormulaChange("conveyanceEsicApplicable", e.target.value)}  InputProps={{ endAdornment: "%" }}/></Grid>
//                 <Grid item xs={12}><TextField fullWidth label="Conveyance Allowance (If ESIC Not Applicable) (%)" type="number" value={formulas.conveyanceEsicNotApplicable} onChange={(e) => handleFormulaChange("conveyanceEsicNotApplicable", e.target.value)} InputProps={{ endAdornment: "%" }}/></Grid>
//               </Grid>
//             </CardContent>
//           </Card>
//         </Grid>

//         <Grid item xs={12} md={6}>
//           <Card>
//             <CardContent>
//               <Typography variant="h6" gutterBottom color="error" sx={{ fontWeight: 'bold' }}>
//                 Deductions Formula Configuration
//               </Typography>
//               <Grid container spacing={2} sx={{ mt: 1 }}>
//                 <Grid item xs={12}><TextField fullWidth label="PF Employee Contribution (% of Basic)" type="number" value={formulas.pfEmployee} onChange={(e) => handleFormulaChange("pfEmployee", e.target.value)} InputProps={{ endAdornment: "%" }} /></Grid>
//                 <Grid item xs={12}><TextField fullWidth label="ESI (% of Gross)" type="number" value={formulas.esi} onChange={(e) => handleFormulaChange("esi", e.target.value)} InputProps={{ endAdornment: "%" }} /></Grid>
//                 <Grid item xs={12}><TextField fullWidth label="MLWF (Fixed Amount)" type="number" value={formulas.mlwf} onChange={(e) => handleFormulaChange("mlwf", e.target.value)} /></Grid>
//                 <Grid item xs={12}><TextField fullWidth label="PT for Male (Fixed Amount)" type="number" value={formulas.ptMale} onChange={(e) => handleFormulaChange("ptMale", e.target.value)} /></Grid>
//                 <Grid item xs={12}><TextField fullWidth label="PT for Female (Fixed Amount)" type="number" value={formulas.ptFemale} onChange={(e) => handleFormulaChange("ptFemale", e.target.value)} /></Grid>
//               </Grid>
//             </CardContent>
//           </Card>
//         </Grid>

//         <Grid item xs={12}>
//           <Card>
//             <CardContent>
//               <Typography variant="h6" gutterBottom sx={{ color: 'success.main', fontWeight: 'bold' }}>
//                 Benefits Configuration (Employer Contributions)
//               </Typography>
//               <Grid container spacing={2} sx={{ mt: 1 }}>
//                 <Grid item xs={12} md={4}><TextField fullWidth label="PF - Employer Contribution (% of Basic)" type="number" value={formulas.pfEmployer} onChange={(e) => handleFormulaChange("pfEmployer", e.target.value)} InputProps={{ endAdornment: "%" }} /></Grid>
//                 <Grid item xs={12} md={4}><TextField fullWidth label="ESIC - Employer Contribution (% of Gross)" type="number" value={formulas.esicEmployer} onChange={(e) => handleFormulaChange("esicEmployer", e.target.value)} InputProps={{ endAdornment: "%" }} /></Grid>
//                 <Grid item xs={12} md={4}><TextField fullWidth label="Gratuity (% of Basic)" type="number" value={formulas.gratuity} onChange={(e) => handleFormulaChange("gratuity", e.target.value)} InputProps={{ endAdornment: "%" }} /></Grid>
//               </Grid>
//             </CardContent>
//           </Card>
//         </Grid>

//         <Grid item xs={12}>
//             <Box sx={{ mt: 1, display: "flex", justifyContent: "center" }}>
//                 <Button variant="contained" size="large" onClick={handleSave} sx={{ minWidth: 200 }} disabled={saving} color="primary">
//                 {saving ? <CircularProgress size={24} color="inherit" /> : 'Save Configuration'}
//                 </Button>
//             </Box>
//         </Grid>

//         <Grid item xs={12}>
//             <Card>
//                 <CardContent>
//                     <Typography variant="h6" gutterBottom sx={{ color: 'primary.main', fontWeight: 'bold' }}>
//                         TDS
//                     </Typography>
//                     <Grid container spacing={2} alignItems="center" sx={{ mt: 1 }}>
//                         <Grid item xs={12} sm={6} md={3}>
//                             <TextField select fullWidth label="Select Employee" name="employee" value={tdsFilters.employee} onChange={handleTdsFilterChange}>
//                                 {employees.map(option => (
//                                     <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
//                                 ))}
//                             </TextField>
//                         </Grid>
//                         <Grid item xs={12} sm={6} md={3}>
//                             <TextField
//                                 fullWidth
//                                 label="From Date"
//                                 type="date"
//                                 name="fromDate"
//                                 value={tdsFilters.fromDate}
//                                 onChange={handleTdsFilterChange}
//                                 InputLabelProps={{ shrink: true }}
//                             />
//                         </Grid>
//                         <Grid item xs={12} sm={6} md={3}>
//                             <TextField
//                                 fullWidth
//                                 label="To Date"
//                                 type="date"
//                                 name="toDate"
//                                 value={tdsFilters.toDate}
//                                 onChange={handleTdsFilterChange}
//                                 InputLabelProps={{ shrink: true }}
//                             />
//                         </Grid>
//                         <Grid item xs={12} sm={6} md={3}>
//                             <TextField fullWidth label="Enter Amount" name="amount" type="number" value={tdsFilters.amount} onChange={handleTdsFilterChange} />
//                         </Grid>
//                     </Grid>
//                     <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
//                         <Button variant="contained" onClick={handleTdsSave}>Save</Button>
//                     </Box>
//                 </CardContent>
//             </Card>
//         </Grid>

//         {tdsData.length > 0 && (
//             <Grid item xs={12}>
//                 <TableContainer component={Paper}>
//                     <Table sx={{ minWidth: 650 }} aria-label="simple table">
//                         <TableHead>
//                             <TableRow>
//                                 <TableCell sx={{ fontWeight: 'bold' }}>Sr. No</TableCell>
//                                 <TableCell sx={{ fontWeight: 'bold' }}>Employee Name</TableCell>
//                                 <TableCell sx={{ fontWeight: 'bold' }}>From Date</TableCell>
//                                 <TableCell sx={{ fontWeight: 'bold' }}>To Date</TableCell>
//                                 <TableCell sx={{ fontWeight: 'bold' }}>TDS Amount</TableCell>
//                             </TableRow>
//                         </TableHead>
//                         <TableBody>
//                             {tdsData.map((row) => (
//                                 <TableRow key={row.srNo}>
//                                     <TableCell>{row.srNo}</TableCell>
//                                     <TableCell>{row.employeeName}</TableCell>
//                                     <TableCell>{row.fromDate}</TableCell>
//                                     <TableCell>{row.toDate}</TableCell>
//                                     <TableCell>{row.tdsAmount}</TableCell>
//                                 </TableRow>
//                             ))}
//                         </TableBody>
//                     </Table>
//                 </TableContainer>
//             </Grid>
//         )}
//       </Grid>
//     </Box>
//   )
// }

// export default function PayrollSetup() {
//     return (
//         <ThemeProvider theme={theme}>
//             <PayrollSetupContent />
//         </ThemeProvider>
//     );
// }


// import { useState, useEffect } from "react";
// import {
//     Card,
//     CardContent,
//     Typography,
//     Grid,
//     TextField,
//     Button,
//     Box,
//     Alert,
//     CircularProgress,
//     ThemeProvider,
//     createTheme,
//     MenuItem,
//     Table,
//     TableBody,
//     TableCell,
//     TableContainer,
//     TableHead,
//     TableRow,
//     Paper
// } from "@mui/material";
// import axiosInstance from "../../utils/axiosInstance";

// const theme = createTheme({
//   palette: {
//     primary: {
//       main: '#8C257C',
//     },
//     error: {
//       main: '#D32F2F',
//     },
//     success: {
//         main: '#2E7D32'
//     }
//   },
// });

// const apiToStateKeyMap = {
//   'hra': 'hra',
//   'basic_plus_da': 'basicDa',
//   'medical_allowance_with_esic': 'medicalEsicApplicable',
//   'medical_allowance_without_esic': 'medicalEsicNotApplicable',
//   'conveyance_allowance_with_esic': 'conveyanceEsicApplicable',
//   'conveyance_allowance_without_esic': 'conveyanceEsicNotApplicable',
//   'pf_employer_contribution': 'pfEmployer',
//   'esic_employer_contribution': 'esicEmployer',
//   'gratuity': 'gratuity',
//   'pf_employee_contribution': 'pfEmployee',
//   'esic_employee_contribution': 'esi',
//   'mlwf_deduction': 'mlwf',
//   'pt_for_male': 'ptMale',
//   'pt_for_female': 'ptFemale'
// };

// const fixedAmountFields = ['mlwf', 'ptMale', 'ptFemale'];

// function PayrollSetupContent() {
//   const [formulas, setFormulas] = useState({
//     hra: '', basicDa: '', medicalEsicApplicable: '', medicalEsicNotApplicable: '',
//     conveyanceEsicApplicable: '', conveyanceEsicNotApplicable: '', pfEmployer: '',
//     esicEmployer: '', gratuity: '', pfEmployee: '', esi: '',
//     mlwf: '', ptMale: '', ptFemale: '',
//   });

//   const [tdsFilters, setTdsFilters] = useState({
//     employee: '',
//     employeeName: '',
//     fromDate: '',
//     toDate: '',
//     amount: ''
//   });

//   const [tdsData, setTdsData] = useState([]);
//   const [employees, setEmployees] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [alert, setAlert] = useState({ show: false, message: "", severity: "success" });

//   useEffect(() => {
//     const fetchInitialData = async () => {
//       setLoading(true);
//       try {
//         const [configResponse, employeesResponse] = await Promise.all([
//           axiosInstance.get('/api/payroll_setup_configuration/'),
//           axiosInstance.get('https://tdtlworld.com/hrms-backend/employee-dropdown/')
//         ]);

//         if (configResponse.data.status === 'success') {
//           const newFormulas = {};
//           configResponse.data.data.forEach(item => {
//             const stateKey = apiToStateKeyMap[item.particulars];
//             if (stateKey) {
//               const value = parseFloat(item.value);
//               newFormulas[stateKey] = fixedAmountFields.includes(stateKey)
//                 ? value
//                 : value * 100;
//             }
//           });
//           setFormulas(prev => ({ ...prev, ...newFormulas }));
//         }
        
//         if (employeesResponse.data) {
//             const formattedEmployees = employeesResponse.data.map(emp => ({
//                 label: `${emp.label} (${emp.emp_id})`,
//                 value: emp.emp_id 
//             }));
//             setEmployees(formattedEmployees);
//         }

//       } catch (error) {
//         console.error("Failed to fetch initial data:", error);
//         setAlert({ show: true, message: "Failed to load page data.", severity: "error" });
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchInitialData();
//   }, []);

//   const handleFormulaChange = (field, value) => {
//     const numericValue = Number(value);
//     if (value === "" || numericValue >= 0) {
//       setFormulas((prev) => ({ ...prev, [field]: value }));
//     }
//   };

//   const handleTdsFilterChange = (event) => {
//     const { name, value } = event.target;
//     let newFilters = { ...tdsFilters, [name]: value };

//     if (name === 'employee') {
//         const selectedEmployee = employees.find(emp => emp.value === value);
//         newFilters.employeeName = selectedEmployee ? selectedEmployee.label : '';
//     }
//     setTdsFilters(newFilters);
//   };

//   const handleTdsSave = () => {
//     const { employee, fromDate, toDate, amount, employeeName } = tdsFilters;
//     if (!employee || !fromDate || !toDate || !amount || Number(amount) <= 0) {
//         setAlert({ show: true, message: "Please fill all TDS fields and enter a valid positive amount.", severity: "error" });
//         return;
//     }

//     if (new Date(fromDate) > new Date(toDate)) {
//         setAlert({ show: true, message: "From Date cannot be after To Date.", severity: "error" });
//         return;
//     }

//     const newEntry = {
//         srNo: tdsData.length + 1,
//         employeeName,
//         fromDate,
//         toDate,
//         tdsAmount: parseFloat(amount).toFixed(2),
//     };

//     setTdsData(prev => [...prev, newEntry]);
//     setTdsFilters({ employee: '', employeeName: '', fromDate: '', toDate: '', amount: '' });
//     setAlert({ show: false, message: "", severity: "success" });
//   };

//   const handleSave = async () => {
//     setSaving(true);
//     const payload = {};

//     for (const apiKey in apiToStateKeyMap) {
//         const stateKey = apiToStateKeyMap[apiKey];
//         const valueFromState = formulas[stateKey] || 0;
//         const valueToSend = fixedAmountFields.includes(stateKey)
//             ? valueFromState
//             : valueFromState / 100;
//         payload[apiKey] = valueToSend.toString();
//     }

//     try {
//       await axiosInstance.post('/api/payroll_setup_configuration/', payload);
//       setAlert({ show: true, message: "Payroll configuration saved successfully!", severity: "success" });
//     } catch (error) {
//       console.error("Failed to save payroll configuration:", error);
//       setAlert({ show: true, message: "Failed to save configuration.", severity: "error" });
//     } finally {
//       setSaving(false);
//       setTimeout(() => setAlert({ show: false, message: "", severity: "success" }), 3000);
//     }
//   };

//   if (loading) {
//       return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress color="primary" /></Box>
//   }

//   return (
//     <Box>
//       <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold', color: 'primary.main' }}>
//         Payroll Setup Configuration
//       </Typography>

//       {alert.show && (
//         <Alert severity={alert.severity} sx={{ mb: 2 }} onClose={() => setAlert(prev => ({...prev, show: false}))}>
//           {alert.message}
//         </Alert>
//       )}

//       <Grid container spacing={3}>
//         <Grid item xs={12} md={6}>
//           <Card>
//             <CardContent>
//               <Typography variant="h6" gutterBottom sx={{ color: 'primary.main', fontWeight: 'bold' }}>
//                 Earnings Formula Configuration
//               </Typography>
//               <Grid container spacing={2} sx={{ mt: 1 }}>
//                 <Grid item xs={12}><TextField fullWidth label="HRA (% of Basic)" type="number" value={formulas.hra} onChange={(e) => handleFormulaChange("hra", e.target.value)} InputProps={{ endAdornment: "%" }} /></Grid>
//                 <Grid item xs={12}><TextField fullWidth label="Basic + DA (% of Basic)" type="number" value={formulas.basicDa} onChange={(e) => handleFormulaChange("basicDa", e.target.value)} InputProps={{ endAdornment: "%" }} /></Grid>
//                 <Grid item xs={12}><TextField fullWidth label="Medical Allowance (If ESIC Applicable) (%)" type="number" value={formulas.medicalEsicApplicable} onChange={(e) => handleFormulaChange("medicalEsicApplicable", e.target.value)} InputProps={{ endAdornment: "%" }}/></Grid>
//                 <Grid item xs={12}><TextField fullWidth label="Medical Allowance (If ESIC Not Applicable) (%)" type="number" value={formulas.medicalEsicNotApplicable} onChange={(e) => handleFormulaChange("medicalEsicNotApplicable", e.target.value)} InputProps={{ endAdornment: "%" }} /></Grid>
//                 <Grid item xs={12}><TextField fullWidth label="Conveyance Allowance (If ESIC Applicable) (%)" type="number" value={formulas.conveyanceEsicApplicable} onChange={(e) => handleFormulaChange("conveyanceEsicApplicable", e.target.value)}  InputProps={{ endAdornment: "%" }}/></Grid>
//                 <Grid item xs={12}><TextField fullWidth label="Conveyance Allowance (If ESIC Not Applicable) (%)" type="number" value={formulas.conveyanceEsicNotApplicable} onChange={(e) => handleFormulaChange("conveyanceEsicNotApplicable", e.target.value)} InputProps={{ endAdornment: "%" }}/></Grid>
//               </Grid>
//             </CardContent>
//           </Card>
//         </Grid>

//         <Grid item xs={12} md={6}>
//           <Card>
//             <CardContent>
//               <Typography variant="h6" gutterBottom color="error" sx={{ fontWeight: 'bold' }}>
//                 Deductions Formula Configuration
//               </Typography>
//               <Grid container spacing={2} sx={{ mt: 1 }}>
//                 <Grid item xs={12}><TextField fullWidth label="PF Employee Contribution (% of Basic)" type="number" value={formulas.pfEmployee} onChange={(e) => handleFormulaChange("pfEmployee", e.target.value)} InputProps={{ endAdornment: "%" }} /></Grid>
//                 <Grid item xs={12}><TextField fullWidth label="ESI (% of Gross)" type="number" value={formulas.esi} onChange={(e) => handleFormulaChange("esi", e.target.value)} InputProps={{ endAdornment: "%" }} /></Grid>
//                 <Grid item xs={12}><TextField fullWidth label="MLWF (Fixed Amount)" type="number" value={formulas.mlwf} onChange={(e) => handleFormulaChange("mlwf", e.target.value)} /></Grid>
//                 <Grid item xs={12}><TextField fullWidth label="PT for Male (Fixed Amount)" type="number" value={formulas.ptMale} onChange={(e) => handleFormulaChange("ptMale", e.target.value)} /></Grid>
//                 <Grid item xs={12}><TextField fullWidth label="PT for Female (Fixed Amount)" type="number" value={formulas.ptFemale} onChange={(e) => handleFormulaChange("ptFemale", e.target.value)} /></Grid>
//               </Grid>
//             </CardContent>
//           </Card>
//         </Grid>

//         <Grid item xs={12}>
//           <Card>
//             <CardContent>
//               <Typography variant="h6" gutterBottom sx={{ color: 'success.main', fontWeight: 'bold' }}>
//                 Benefits Configuration (Employer Contributions)
//               </Typography>
//               <Grid container spacing={2} sx={{ mt: 1 }}>
//                 <Grid item xs={12} md={4}><TextField fullWidth label="PF - Employer Contribution (% of Basic)" type="number" value={formulas.pfEmployer} onChange={(e) => handleFormulaChange("pfEmployer", e.target.value)} InputProps={{ endAdornment: "%" }} /></Grid>
//                 <Grid item xs={12} md={4}><TextField fullWidth label="ESIC - Employer Contribution (% of Gross)" type="number" value={formulas.esicEmployer} onChange={(e) => handleFormulaChange("esicEmployer", e.target.value)} InputProps={{ endAdornment: "%" }} /></Grid>
//                 <Grid item xs={12} md={4}><TextField fullWidth label="Gratuity (% of Basic)" type="number" value={formulas.gratuity} onChange={(e) => handleFormulaChange("gratuity", e.target.value)} InputProps={{ endAdornment: "%" }} /></Grid>
//               </Grid>
//             </CardContent>
//           </Card>
//         </Grid>

//         <Grid item xs={12}>
//             <Box sx={{ mt: 1, display: "flex", justifyContent: "center" }}>
//                 <Button variant="contained" size="large" onClick={handleSave} sx={{ minWidth: 200 }} disabled={saving} color="primary">
//                 {saving ? <CircularProgress size={24} color="inherit" /> : 'Save Configuration'}
//                 </Button>
//             </Box>
//         </Grid>

//         <Grid item xs={12}>
//             <Card>
//                 <CardContent>
//                     <Typography variant="h6" gutterBottom sx={{ color: 'primary.main', fontWeight: 'bold' }}>
//                         TDS
//                     </Typography>
//                     <Grid container spacing={2} alignItems="center" sx={{ mt: 1 }}>
//                         <Grid item xs={12} sm={6} md={3}>
//                             <TextField select fullWidth label="Select Employee" name="employee" value={tdsFilters.employee} onChange={handleTdsFilterChange}>
//                                 {employees.map(option => (
//                                     <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
//                                 ))}
//                             </TextField>
//                         </Grid>
//                         <Grid item xs={12} sm={6} md={3}>
//                             <TextField
//                                 fullWidth
//                                 label="From Date"
//                                 type="date"
//                                 name="fromDate"
//                                 value={tdsFilters.fromDate}
//                                 onChange={handleTdsFilterChange}
//                                 InputLabelProps={{ shrink: true }}
//                             />
//                         </Grid>
//                         <Grid item xs={12} sm={6} md={3}>
//                             <TextField
//                                 fullWidth
//                                 label="To Date"
//                                 type="date"
//                                 name="toDate"
//                                 value={tdsFilters.toDate}
//                                 onChange={handleTdsFilterChange}
//                                 InputLabelProps={{ shrink: true }}
//                             />
//                         </Grid>
//                         <Grid item xs={12} sm={6} md={3}>
//                             <TextField fullWidth label="Enter Amount" name="amount" type="number" value={tdsFilters.amount} onChange={handleTdsFilterChange} />
//                         </Grid>
//                     </Grid>
//                     <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
//                         <Button variant="contained" onClick={handleTdsSave}>Save</Button>
//                     </Box>
//                 </CardContent>
//             </Card>
//         </Grid>

//         {tdsData.length > 0 && (
//             <Grid item xs={12}>
//                 <TableContainer component={Paper}>
//                     <Table sx={{ minWidth: 650 }} aria-label="simple table">
//                         <TableHead>
//                             <TableRow>
//                                 <TableCell sx={{ fontWeight: 'bold' }}>Sr. No</TableCell>
//                                 <TableCell sx={{ fontWeight: 'bold' }}>Employee Name</TableCell>
//                                 <TableCell sx={{ fontWeight: 'bold' }}>From Date</TableCell>
//                                 <TableCell sx={{ fontWeight: 'bold' }}>To Date</TableCell>
//                                 <TableCell sx={{ fontWeight: 'bold' }}>TDS Amount</TableCell>
//                             </TableRow>
//                         </TableHead>
//                         <TableBody>
//                             {tdsData.map((row) => (
//                                 <TableRow key={row.srNo}>
//                                     <TableCell>{row.srNo}</TableCell>
//                                     <TableCell>{row.employeeName}</TableCell>
//                                     <TableCell>{row.fromDate}</TableCell>
//                                     <TableCell>{row.toDate}</TableCell>
//                                     <TableCell>{row.tdsAmount}</TableCell>
//                                 </TableRow>
//                             ))}
//                         </TableBody>
//                     </Table>
//                 </TableContainer>
//             </Grid>
//         )}
//       </Grid>
//     </Box>
//   )
// }

// export default function PayrollSetup() {
//     return (
//         <ThemeProvider theme={theme}>
//             <PayrollSetupContent />
//         </ThemeProvider>
//     );
// }   




import { useState, useEffect } from "react";
import {
    Card,
    CardContent,
    Typography,
    Grid,
    TextField,
    Button,
    Box,
    Alert,
    CircularProgress,
    ThemeProvider,
    createTheme,
    MenuItem,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper
} from "@mui/material";
import axiosInstance from "../../utils/axiosInstance";

const theme = createTheme({
  palette: {
    primary: {
      main: '#8C257C',
    },
    error: {
      main: '#D32F2F',
    },
    success: {
        main: '#2E7D32'
    }
  },
});

const apiToStateKeyMap = {
  'hra': 'hra',
  'basic_plus_da': 'basicDa',
  'medical_allowance_with_esic': 'medicalEsicApplicable',
  'medical_allowance_without_esic': 'medicalEsicNotApplicable',
  'conveyance_allowance_with_esic': 'conveyanceEsicApplicable',
  'conveyance_allowance_without_esic': 'conveyanceEsicNotApplicable',
  'pf_employer_contribution': 'pfEmployer',
  'esic_employer_contribution': 'esicEmployer',
  'gratuity': 'gratuity',
  'pf_employee_contribution': 'pfEmployee',
  'esic_employee_contribution': 'esi',
  'mlwf_deduction': 'mlwf',
  'pt_for_male': 'ptMale',
  'pt_for_female': 'ptFemale'
};

const fixedAmountFields = ['mlwf', 'ptMale', 'ptFemale'];

function PayrollSetupContent() {
  const [formulas, setFormulas] = useState({
    hra: '', basicDa: '', medicalEsicApplicable: '', medicalEsicNotApplicable: '',
    conveyanceEsicApplicable: '', conveyanceEsicNotApplicable: '', pfEmployer: '',
    esicEmployer: '', gratuity: '', pfEmployee: '', esi: '',
    mlwf: '', ptMale: '', ptFemale: '',
  });

  const [tdsFilters, setTdsFilters] = useState({
    employee: '',
    employeeName: '',
    fromDate: '',
    toDate: '',
    amount: ''
  });

  const [tdsData, setTdsData] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [alert, setAlert] = useState({ show: false, message: "", severity: "success" });

  const fetchTdsData = async () => {
    try {
      const response = await axiosInstance.get('https://tdtlworld.com/hrms-backend/api/payroll_employee_tds/');
      if (response.data && response.data.data) {
        const formattedTdsData = response.data.data.map((item, index) => {
          return {
            srNo: index + 1,
            employeeName: item.employee_name,
            fromDate: item.from_date,
            toDate: item.to_date,
            tdsAmount: parseFloat(item.tds_amount).toFixed(2),
          };
        });
        setTdsData(formattedTdsData);
      }
    } catch (error) {
      console.error("Failed to fetch TDS data:", error);
      setAlert({ show: true, message: "Failed to load TDS data.", severity: "error" });
    }
  };

  useEffect(() => {
    const fetchInitialData = async () => {
      setLoading(true);
      try {
        const [configResponse, employeesResponse] = await Promise.all([
          axiosInstance.get('/api/payroll_setup_configuration/'),
          axiosInstance.get('https://tdtlworld.com/hrms-backend/employee-dropdown/')
        ]);

        if (configResponse.data.status === 'success') {
          const newFormulas = {};
          configResponse.data.data.forEach(item => {
            const stateKey = apiToStateKeyMap[item.particulars];
            if (stateKey) {
              const value = parseFloat(item.value);
              newFormulas[stateKey] = fixedAmountFields.includes(stateKey)
                ? value
                : value * 100;
            }
          });
          setFormulas(prev => ({ ...prev, ...newFormulas }));
        }
        
        if (employeesResponse.data) {
            const formattedEmployees = employeesResponse.data.map(emp => ({
                label: `${emp.label} (${emp.emp_id})`,
                value: emp.emp_id 
            }));
            setEmployees(formattedEmployees);
        }

        await fetchTdsData(); 

      } catch (error) {
        console.error("Failed to fetch initial data:", error);
        setAlert({ show: true, message: "Failed to load page data.", severity: "error" });
      } finally {
        setLoading(false);
      }
    };
    fetchInitialData();
  }, []);

  const handleFormulaChange = (field, value) => {
    const numericValue = Number(value);
    if (value === "" || numericValue >= 0) {
      setFormulas((prev) => ({ ...prev, [field]: value }));
    }
  };

  const handleTdsFilterChange = (event) => {
    const { name, value } = event.target;
    let newFilters = { ...tdsFilters, [name]: value };

    if (name === 'employee') {
        const selectedEmployee = employees.find(emp => emp.value === value);
        newFilters.employeeName = selectedEmployee ? selectedEmployee.label : '';
    }
    setTdsFilters(newFilters);
  };

  const handleTdsSave = async () => {
    const { employee, fromDate, toDate, amount } = tdsFilters;
    if (!employee || !fromDate || !toDate || !amount || Number(amount) <= 0) {
        setAlert({ show: true, message: "Please fill all TDS fields and enter a valid positive amount.", severity: "error" });
        return;
    }

    if (new Date(fromDate) > new Date(toDate)) {
        setAlert({ show: true, message: "From Date cannot be after To Date.", severity: "error" });
        return;
    }

    setSaving(true);
    try {
        const payload = {
            employee_id: employee,
            from_date: fromDate,
            to_date: toDate,
            tds_amount: parseFloat(amount),
        };
        await axiosInstance.post('https://tdtlworld.com/hrms-backend/api/payroll_employee_tds/', payload);
        setAlert({ show: true, message: "TDS entry saved successfully!", severity: "success" });
        setTdsFilters({ employee: '', employeeName: '', fromDate: '', toDate: '', amount: '' });
        await fetchTdsData(); 
    } catch (error) {
        console.error("Failed to save TDS entry:", error);
        setAlert({ show: true, message: "Failed to save TDS entry.", severity: "error" });
    } finally {
        setSaving(false);
        setTimeout(() => setAlert(prev => ({...prev, show: false})), 3000);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    const payload = {};

    for (const apiKey in apiToStateKeyMap) {
        const stateKey = apiToStateKeyMap[apiKey];
        const valueFromState = formulas[stateKey] || 0;
        const valueToSend = fixedAmountFields.includes(stateKey)
            ? valueFromState
            : valueFromState / 100;
        payload[apiKey] = valueToSend.toString();
    }

    try {
      await axiosInstance.post('/api/payroll_setup_configuration/', payload);
      setAlert({ show: true, message: "Payroll configuration saved successfully!", severity: "success" });
    } catch (error) {
      console.error("Failed to save payroll configuration:", error);
      setAlert({ show: true, message: "Failed to save configuration.", severity: "error" });
    } finally {
      setSaving(false);
      setTimeout(() => setAlert(prev => ({...prev, show: false})), 3000);
    }
  };

  if (loading) {
      return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress color="primary" /></Box>
  }

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold', color: 'primary.main' }}>
        Payroll Setup Configuration
      </Typography>

      {alert.show && (
        <Alert severity={alert.severity} sx={{ mb: 2 }} onClose={() => setAlert(prev => ({...prev, show: false}))}>
          {alert.message}
        </Alert>
      )}

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ color: 'primary.main', fontWeight: 'bold' }}>
                Earnings Formula Configuration
              </Typography>
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={12}><TextField fullWidth label="HRA (% of Basic)" type="number" value={formulas.hra} onChange={(e) => handleFormulaChange("hra", e.target.value)} InputProps={{ endAdornment: "%" }} /></Grid>
                <Grid item xs={12}><TextField fullWidth label="Basic + DA (% of Basic)" type="number" value={formulas.basicDa} onChange={(e) => handleFormulaChange("basicDa", e.target.value)} InputProps={{ endAdornment: "%" }} /></Grid>
                <Grid item xs={12}><TextField fullWidth label="Medical Allowance (If ESIC Applicable) (%)" type="number" value={formulas.medicalEsicApplicable} onChange={(e) => handleFormulaChange("medicalEsicApplicable", e.target.value)} InputProps={{ endAdornment: "%" }}/></Grid>
                <Grid item xs={12}><TextField fullWidth label="Medical Allowance (If ESIC Not Applicable) (%)" type="number" value={formulas.medicalEsicNotApplicable} onChange={(e) => handleFormulaChange("medicalEsicNotApplicable", e.target.value)} InputProps={{ endAdornment: "%" }} /></Grid>
                <Grid item xs={12}><TextField fullWidth label="Conveyance Allowance (If ESIC Applicable) (%)" type="number" value={formulas.conveyanceEsicApplicable} onChange={(e) => handleFormulaChange("conveyanceEsicApplicable", e.target.value)}  InputProps={{ endAdornment: "%" }}/></Grid>
                <Grid item xs={12}><TextField fullWidth label="Conveyance Allowance (If ESIC Not Applicable) (%)" type="number" value={formulas.conveyanceEsicNotApplicable} onChange={(e) => handleFormulaChange("conveyanceEsicNotApplicable", e.target.value)} InputProps={{ endAdornment: "%" }}/></Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom color="error" sx={{ fontWeight: 'bold' }}>
                Deductions Formula Configuration
              </Typography>
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={12}><TextField fullWidth label="PF Employee Contribution (% of Basic)" type="number" value={formulas.pfEmployee} onChange={(e) => handleFormulaChange("pfEmployee", e.target.value)} InputProps={{ endAdornment: "%" }} /></Grid>
                <Grid item xs={12}><TextField fullWidth label="ESI (% of Gross)" type="number" value={formulas.esi} onChange={(e) => handleFormulaChange("esi", e.target.value)} InputProps={{ endAdornment: "%" }} /></Grid>
                <Grid item xs={12}><TextField fullWidth label="MLWF (Fixed Amount)" type="number" value={formulas.mlwf} onChange={(e) => handleFormulaChange("mlwf", e.target.value)} /></Grid>
                <Grid item xs={12}><TextField fullWidth label="PT for Male (Fixed Amount)" type="number" value={formulas.ptMale} onChange={(e) => handleFormulaChange("ptMale", e.target.value)} /></Grid>
                <Grid item xs={12}><TextField fullWidth label="PT for Female (Fixed Amount)" type="number" value={formulas.ptFemale} onChange={(e) => handleFormulaChange("ptFemale", e.target.value)} /></Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ color: 'success.main', fontWeight: 'bold' }}>
                Benefits Configuration (Employer Contributions)
              </Typography>
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={12} md={4}><TextField fullWidth label="PF - Employer Contribution (% of Basic)" type="number" value={formulas.pfEmployer} onChange={(e) => handleFormulaChange("pfEmployer", e.target.value)} InputProps={{ endAdornment: "%" }} /></Grid>
                <Grid item xs={12} md={4}><TextField fullWidth label="ESIC - Employer Contribution (% of Gross)" type="number" value={formulas.esicEmployer} onChange={(e) => handleFormulaChange("esicEmployer", e.target.value)} InputProps={{ endAdornment: "%" }} /></Grid>
                <Grid item xs={12} md={4}><TextField fullWidth label="Gratuity (% of Basic)" type="number" value={formulas.gratuity} onChange={(e) => handleFormulaChange("gratuity", e.target.value)} InputProps={{ endAdornment: "%" }} /></Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
            <Box sx={{ mt: 1, display: "flex", justifyContent: "center" }}>
                <Button variant="contained" size="large" onClick={handleSave} sx={{ minWidth: 200 }} disabled={saving} color="primary">
                {saving ? <CircularProgress size={24} color="inherit" /> : 'Save Configuration'}
                </Button>
            </Box>
        </Grid>

        <Grid item xs={12}>
            <Card>
                <CardContent>
                    <Typography variant="h6" gutterBottom sx={{ color: 'primary.main', fontWeight: 'bold' }}>
                        TDS
                    </Typography>
                    <Grid container spacing={2} alignItems="center" sx={{ mt: 1 }}>
                        <Grid item xs={12} sm={6} md={3}>
                            <TextField select fullWidth label="Select Employee" name="employee" value={tdsFilters.employee} onChange={handleTdsFilterChange}>
                                {employees.map(option => (
                                    <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <TextField
                                fullWidth
                                label="From Date"
                                type="date"
                                name="fromDate"
                                value={tdsFilters.fromDate}
                                onChange={handleTdsFilterChange}
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <TextField
                                fullWidth
                                label="To Date"
                                type="date"
                                name="toDate"
                                value={tdsFilters.toDate}
                                onChange={handleTdsFilterChange}
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <TextField fullWidth label="Enter Amount" name="amount" type="number" value={tdsFilters.amount} onChange={handleTdsFilterChange} />
                        </Grid>
                    </Grid>
                    <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
                        <Button variant="contained" onClick={handleTdsSave} disabled={saving}>Save</Button>
                    </Box>
                </CardContent>
            </Card>
        </Grid>

        {tdsData.length > 0 && (
            <Grid item xs={12}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow sx={{ backgroundColor: '#8C257C' }}>
                                <TableCell sx={{ fontWeight: 'bold', color: 'white', textTransform: 'uppercase' }}>Sr. No</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', color: 'white', textTransform: 'uppercase' }}>Employee Name</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', color: 'white', textTransform: 'uppercase' }}>From Date</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', color: 'white', textTransform: 'uppercase' }}>To Date</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', color: 'white', textTransform: 'uppercase' }}>TDS Amount</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tdsData.map((row) => (
                                <TableRow key={row.srNo}>
                                    <TableCell>{row.srNo}</TableCell>
                                    <TableCell>{row.employeeName}</TableCell>
                                    <TableCell>{row.fromDate}</TableCell>
                                    <TableCell>{row.toDate}</TableCell>
                                    <TableCell>{row.tdsAmount}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        )}
      </Grid>
    </Box>
  )
}

export default function PayrollSetup() {
    return (
        <ThemeProvider theme={theme}>
            <PayrollSetupContent />
        </ThemeProvider>
    );
}