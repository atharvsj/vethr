// import React, { useState, useEffect } from "react";
// import {
//   Container,
//   Paper,
//   Typography,
//   TextField,
//   Button,
//   Box,
//   Grid,
//   CircularProgress,
// } from "@mui/material";
// import BusinessIcon from "@mui/icons-material/Business";
// import axios from "axios";

// // Label Component
// const FormLabel = ({ children }) => (
//   <Typography variant="body1" sx={{ mb: 1, fontWeight: "medium" }}>
//     {children}
//     <span style={{ color: "red" }}>*</span>
//   </Typography>
// );

// const initialFormData = {
//   companyName: "",
//   registerAddress: "",
//   manufacturingAddress: "",
//   phoneNumber: "",
//   panNumber: "",
// };

// function CompanyDetails() {
//   const [formData, setFormData] = useState(initialFormData);
//   const [loading, setLoading] = useState(true);
//   const [companyId, setCompanyId] = useState(null); // Keep companyId in state if it's used elsewhere or for future features

//   useEffect(() => {
//     const fetchCompanyDetails = async () => {
//       try {
//         const response = await axios.get(
//           "https://tdtlworld.com/hrms-backend/api/company-details/"
//         );
//         const data = response.data;

//         setFormData({
//           companyName: data.company_name || "",
//           registerAddress: data.register_address || "",
//           manufacturingAddress: data.manufacturing_address || "",
//           phoneNumber: data.phone_number || "",
//           panNumber: data.pan_number || "",
//         });

//         setCompanyId(data.id); // Still setting companyId, but not using it for the update condition
//       } catch (error) {
//         console.error("Failed to fetch company details:", error);
//         alert("Error fetching company details.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCompanyDetails();
//   }, []);

//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     // The condition `if (!companyId)` has been removed as per your request.
//     // This assumes the backend PATCH endpoint doesn't require companyId in the request body
//     // for this specific update scenario.

//     try {
//       const payload = {
//         // id: companyId, // Uncomment if your PATCH API requires the ID in the body
//         company_name: formData.companyName,
//         register_address: formData.registerAddress,
//         manufacturing_address: formData.manufacturingAddress,
//         phone_number: formData.phoneNumber,
//         pan_number: formData.panNumber,
//         is_posted: 1,
//       };

//       await axios.patch(
//         "https://tdtlworld.com/hrms-backend/api/company-details/",
//         payload
//       );
//       alert("Company details updated successfully!");
//     } catch (error) {
//       console.error("Failed to update company details:", error);
//       alert("Error updating company details.");
//     }
//   };

//   if (loading) {
//     return (
//       <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
//         <CircularProgress />
//       </Box>
//     );
//   }

//   return (
//     <Paper elevation={2} sx={{ borderRadius: 2 }}>
//       {/* Header */}
//       <Box
//         sx={{
//           display: "flex",
//           alignItems: "center",
//           p: 2,
//           borderBottom: 1,
//           borderColor: "divider",
//         }}
//       >
//         <BusinessIcon sx={{ mr: 1.5, fontWeight: "bold" }} />
//         <Typography variant="h5" component="h1" sx={{ fontWeight: "bold" }}>
//           Company Details
//         </Typography>
//       </Box>

//       {/* Form */}
//       <Box component="form" onSubmit={handleSubmit} sx={{ p: 3 }}>
//         <Grid container spacing={4}>
//           <Grid item xs={12} md={6}>
//             <FormLabel>Company Name</FormLabel>
//             <TextField
//               fullWidth
//               variant="outlined"
//               name="companyName"
//               value={formData.companyName}
//               onChange={handleChange}
//               size="small"
//             />
//           </Grid>

//           <Grid item xs={12} md={6}>
//             <FormLabel>Register Address</FormLabel>
//             <TextField
//               fullWidth
//               variant="outlined"
//               name="registerAddress"
//               value={formData.registerAddress}
//               onChange={handleChange}
//               size="small"
//             />
//           </Grid>

//           <Grid item xs={12} md={6}>
//             <FormLabel>Manufacturing Address</FormLabel>
//             <TextField
//               fullWidth
//               variant="outlined"
//               name="manufacturingAddress"
//               value={formData.manufacturingAddress}
//               onChange={handleChange}
//               size="small"
//             />
//           </Grid>

//           <Grid item xs={12} md={6}>
//             <FormLabel>Phone Number</FormLabel>
//             <TextField
//               fullWidth
//               variant="outlined"
//               name="phoneNumber"
//               value={formData.phoneNumber}
//               onChange={handleChange}
//               size="small"
//             />
//           </Grid>

//           <Grid item xs={12} md={6}>
//             <FormLabel>PAN Number</FormLabel>
//             <TextField
//               fullWidth
//               variant="outlined"
//               name="panNumber"
//               value={formData.panNumber}
//               onChange={handleChange}
//               size="small"
//             />
//           </Grid>

//           <Grid item xs={12}>
//             <Button
//               type="submit"
//               variant="contained"
//               sx={{
//                 backgroundColor: "#673ab7",
//                 textTransform: "none",
//                 px: 4,
//                 py: 1,
//               }}
//             >
//               Save Details
//             </Button>
//           </Grid>
//         </Grid>
//       </Box>
//     </Paper>
//   );
// }

// export default CompanyDetails;











// import React, { useState, useEffect } from "react";
// import {
//   Container, // Note: Container from MUI is typically used for page layout, not directly within Paper
//   Paper,
//   Typography,
//   TextField,
//   Button,
//   Box,
//   Grid,
//   CircularProgress,
// } from "@mui/material";
// import BusinessIcon from "@mui/icons-material/Business";
// import axios from "axios";
// import Swal from "sweetalert2"; // Import SweetAlert2

// // Label Component
// // This component renders a label with a required asterisk.
// const FormLabel = ({ children }) => (
//   <Typography variant="body1" sx={{ mb: 1, fontWeight: "medium" }}>
//     {children}
//     <span style={{ color: "red" }}>*</span>
//   </Typography>
// );

// // Initial state for the form data
// const initialFormData = {
//   companyName: "",
//   registerAddress: "",
//   manufacturingAddress: "",
//   phoneNumber: "",
//   panNumber: "",
// };

// function CompanyDetails() {
//   const [formData, setFormData] = useState(initialFormData);
//   const [loading, setLoading] = useState(true);
//   // companyId is kept in state for potential future use,
//   // but it's not used in the update logic as per your request.
//   const [companyId, setCompanyId] = useState(null);

//   // useEffect to fetch company details when the component mounts
//   useEffect(() => {
//     const fetchCompanyDetails = async () => {
//       try {
//         const response = await axios.get(
//           "https://tdtlworld.com/hrms-backend/api/company-details/"
//         );
//         const data = response.data;

//         // Populate form fields with fetched data
//         setFormData({
//           companyName: data.company_name || "",
//           registerAddress: data.register_address || "",
//           manufacturingAddress: data.manufacturing_address || "",
//           phoneNumber: data.phone_number || "",
//           panNumber: data.pan_number || "",
//         });

//         // Store the company ID, useful if subsequent API calls need it (e.g., PUT /company-details/{id})
//         setCompanyId(data.id);
//       } catch (error) {
//         console.error("Failed to fetch company details:", error);
//         // Show an error alert using SweetAlert2
//         Swal.fire({
//           icon: "error",
//           title: "Oops...",
//           text: "Error fetching company details. Please try again later.",
//         });
//       } finally {
//         setLoading(false); // Set loading to false regardless of success or failure
//       }
//     };

//     fetchCompanyDetails();
//   }, []); // Empty dependency array means this effect runs once on mount

//   // Handles changes in form input fields
//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   // Handles form submission
//   const handleSubmit = async (event) => {
//     event.preventDefault(); // Prevent default browser form submission

//     // No check for companyId here as per your request.
//     // The backend is expected to handle the update without an explicit ID in the frontend payload
//     // for this specific PATCH endpoint.

//     try {
//       const payload = {
//         // If your PATCH API requires the ID in the body for identification, uncomment the line below:
//         // id: companyId,
//         company_name: formData.companyName,
//         register_address: formData.registerAddress,
//         manufacturing_address: formData.manufacturingAddress,
//         phone_number: formData.phoneNumber,
//         pan_number: formData.panNumber,
//         is_posted: 1, // Assuming this is a required field for the backend
//       };

//       await axios.patch(
//         "https://tdtlworld.com/hrms-backend/api/company-details/",
//         payload
//       );

//       // Show a success alert using SweetAlert2
//       Swal.fire({
//         icon: "success",
//         title: "Success!",
//         text: "Company details updated successfully!",
//         showConfirmButton: false, // Hide the "OK" button
//         timer: 1500, // Close the alert automatically after 1.5 seconds
//       });
//     } catch (error) {
//       console.error("Failed to update company details:", error);
//       // Show an error alert using SweetAlert2
//       Swal.fire({
//         icon: "error",
//         title: "Error!",
//         text: "Failed to update company details. Please check your input and try again.",
//       });
//     }
//   };

//   // Show a loading spinner while data is being fetched
//   if (loading) {
//     return (
//       <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
//         <CircularProgress />
//       </Box>
//     );
//   }

//   // Render the form once data is loaded
//   return (
//     // Paper component for a card-like UI with elevation
//     <Paper elevation={2} sx={{ borderRadius: 2, m: { xs: 2, md: 4 } }}> {/* Added margin for better spacing */}
//       {/* Header section of the form */}
//       <Box
//         sx={{
//           display: "flex",
//           alignItems: "center",
//           p: 2,
//           borderBottom: 1,
//           borderColor: "divider",
//           backgroundColor: "#f5f5f5", // Light background for header
//           borderTopLeftRadius: 8,
//           borderTopRightRadius: 8,
//         }}
//       >
//         <BusinessIcon sx={{ mr: 1.5, color: "#673ab7" }} /> {/* Icon with theme color */}
//         <Typography variant="h5" component="h1" sx={{ fontWeight: "bold", color: "#333" }}>
//           Company Details
//         </Typography>
//       </Box>

//       {/* Form section */}
//       <Box component="form" onSubmit={handleSubmit} sx={{ p: 3 }}>
//         <Grid container spacing={4}> {/* Spacing between grid items */}
//           <Grid item xs={12} md={6}>
//             <FormLabel>Company Name</FormLabel>
//             <TextField
//               fullWidth
//               variant="outlined"
//               name="companyName"
//               value={formData.companyName}
//               onChange={handleChange}
//               size="small" // Compact size for text fields
//               required // HTML5 required attribute for basic validation
//             />
//           </Grid>

//           <Grid item xs={12} md={6}>
//             <FormLabel>Register Address</FormLabel>
//             <TextField
//               fullWidth
//               variant="outlined"
//               name="registerAddress"
//               value={formData.registerAddress}
//               onChange={handleChange}
//               size="small"
//               required
//             />
//           </Grid>

//           <Grid item xs={12} md={6}>
//             <FormLabel>Manufacturing Address</FormLabel>
//             <TextField
//               fullWidth
//               variant="outlined"
//               name="manufacturingAddress"
//               value={formData.manufacturingAddress}
//               onChange={handleChange}
//               size="small"
//               required
//             />
//           </Grid>

//           <Grid item xs={12} md={6}>
//             <FormLabel>Phone Number</FormLabel>
//             <TextField
//               fullWidth
//               variant="outlined"
//               name="phoneNumber"
//               value={formData.phoneNumber}
//               onChange={handleChange}
//               size="small"
//               type="tel" // Suggests a numeric keyboard on mobile
//               inputProps={{ pattern: "[0-9]{10}" }} // Basic pattern for 10 digits
//               required
//             />
//           </Grid>

//           <Grid item xs={12} md={6}>
//             <FormLabel>PAN Number</FormLabel>
//             <TextField
//               fullWidth
//               variant="outlined"
//               name="panNumber"
//               value={formData.panNumber}
//               onChange={handleChange}
//               size="small"
//               inputProps={{ maxLength: 10 }} // PAN numbers are typically 10 characters
//               required
//             />
//           </Grid>

//           {/* Submit Button */}
//           <Grid item xs={12}>
//             <Button
//               type="submit"
//               variant="contained"
//               sx={{
//                 backgroundColor: "#673ab7", // Deep purple, a common Material-UI primary color
//                 "&:hover": {
//                   backgroundColor: "#5e35b1", // Slightly darker on hover
//                 },
//                 textTransform: "none", // Prevent uppercase text
//                 px: 4, // Horizontal padding
//                 py: 1.2, // Vertical padding
//                 mt: 2, // Margin top for spacing from last input
//                 fontWeight: "bold",
//               }}
//             >
//               Save Details
//             </Button>
//           </Grid>
//         </Grid>
//       </Box>
//     </Paper>
//   );
// }

// export default CompanyDetails;
























// import React, { useState, useEffect } from "react";
// import {
//   Paper,
//   Typography,
//   TextField,
//   Button,
//   Box,
//   Grid,
//   CircularProgress,
// } from "@mui/material";
// import BusinessIcon from "@mui/icons-material/Business"; // ✅ Corrected import
// import axios from "axios";
// import Swal from "sweetalert2"; // Import SweetAlert2

// // FormLabel Component: Renders a label with a required asterisk.
// const FormLabel = ({ children }) => (
//   <Typography variant="body1" sx={{ mb: 1, fontWeight: "medium" }}>
//     {children}
//     <span style={{ color: "red" }}>*</span>
//   </Typography>
// );

// // Initial state for the form data (empty values)
// const initialFormData = {
//   companyName: "",
//   registerAddress: "",
//   manufacturingAddress: "",
//   phoneNumber: "",
//   panNumber: "",
// };

// function CompanyDetails() {
//   const [formData, setFormData] = useState(initialFormData); // State for current form values
//   const [originalFormData, setOriginalFormData] = useState(initialFormData); // State to store initial fetched values for comparison
//   const [loading, setLoading] = useState(true); // State for loading indicator
//   const [companyId, setCompanyId] = useState(null); // State for company ID (fetched but not used for update condition)

//   // Derived state: true if formData is different from originalFormData, false otherwise.
//   const hasChanges =
//     JSON.stringify(formData) !== JSON.stringify(originalFormData);

//   // Fetch company details on component mount
//   useEffect(() => {
//     const fetchCompanyDetails = async () => {
//       try {
//         const response = await axios.get(
//           "https://tdtlworld.com/hrms-backend/api/company-details/"
//         );
//         const data = response.data;

//         const fetchedData = {
//           companyName: data.company_name || "",
//           registerAddress: data.register_address || "",
//           manufacturingAddress: data.manufacturing_address || "",
//           phoneNumber: data.phone_number || "",
//           panNumber: data.pan_number || "",
//         };

//         setFormData(fetchedData);
//         setOriginalFormData(fetchedData);
//         setCompanyId(data.id);
//       } catch (error) {
//         console.error("Failed to fetch company details:", error);
//         Swal.fire({
//           icon: "error",
//           title: "Oops...",
//           text: "Error fetching company details. Please try again later.",
//         });
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCompanyDetails();
//   }, []);

//   // Handle input change
//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   // Handle form submission
//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     if (!hasChanges) {
//       Swal.fire({
//         icon: "info",
//         title: "No Changes",
//         text: "No changes detected. Nothing to save.",
//       });
//       return;
//     }

//     try {
//       const payload = {
//         company_name: formData.companyName,
//         register_address: formData.registerAddress,
//         manufacturing_address: formData.manufacturingAddress,
//         phone_number: formData.phoneNumber,
//         pan_number: formData.panNumber,
//         is_posted: 1,
//       };

//       await axios.patch(
//         "https://tdtlworld.com/hrms-backend/api/company-details/",
//         payload
//       );

//       Swal.fire({
//         icon: "success",
//         title: "Success!",
//         text: "Company details updated successfully!",
//         showConfirmButton: false,
//         timer: 1500,
//       });

//       setOriginalFormData(formData);
//     } catch (error) {
//       console.error("Failed to update company details:", error);
//       Swal.fire({
//         icon: "error",
//         title: "Error!",
//         text: "Failed to update company details. Please check your input and try again.",
//       });
//     }
//   };

//   if (loading) {
//     return (
//       <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
//         <CircularProgress />
//       </Box>
//     );
//   }

//   return (
//     <Paper elevation={2} sx={{ borderRadius: 2, m: { xs: 2, md: 4 } }}>
//       {/* Header */}
//       <Box
//         sx={{
//           display: "flex",
//           alignItems: "center",
//           p: 2,
//           borderBottom: 1,
//           borderColor: "divider",
//           backgroundColor: "#f5f5f5",
//           borderTopLeftRadius: 8,
//           borderTopRightRadius: 8,
//         }}
//       >
//         <BusinessIcon sx={{ mr: 1.5, color: "#673ab7" }} />
//         <Typography variant="h5" component="h1" sx={{ fontWeight: "bold", color: "#333" }}>
//           Company Details
//         </Typography>
//       </Box>

//       {/* Form */}
//       <Box component="form" onSubmit={handleSubmit} sx={{ p: 3 }}>
//         <Grid container spacing={4}>
//           <Grid item xs={12} md={6}>
//             <FormLabel>Company Name</FormLabel>
//             <TextField
//               fullWidth
//               variant="outlined"
//               name="companyName"
//               value={formData.companyName}
//               onChange={handleChange}
//               size="small"
//               required
//             />
//           </Grid>

//           <Grid item xs={12} md={6}>
//             <FormLabel>Register Address</FormLabel>
//             <TextField
//               fullWidth
//               variant="outlined"
//               name="registerAddress"
//               value={formData.registerAddress}
//               onChange={handleChange}
//               size="small"
//               required
//             />
//           </Grid>

//           <Grid item xs={12} md={6}>
//             <FormLabel>Manufacturing Address</FormLabel>
//             <TextField
//               fullWidth
//               variant="outlined"
//               name="manufacturingAddress"
//               value={formData.manufacturingAddress}
//               onChange={handleChange}
//               size="small"
//               required
//             />
//           </Grid>

//           <Grid item xs={12} md={6}>
//             <FormLabel>Phone Number</FormLabel>
//             <TextField
//               fullWidth
//               variant="outlined"
//               name="phoneNumber"
//               value={formData.phoneNumber}
//               onChange={handleChange}
//               size="small"
//               type="tel"
//               inputProps={{ pattern: "[0-9]{10}" }}
//               required
//             />
//           </Grid>

//           <Grid item xs={12} md={6}>
//             <FormLabel>PAN Number</FormLabel>
//             <TextField
//               fullWidth
//               variant="outlined"
//               name="panNumber"
//               value={formData.panNumber}
//               onChange={handleChange}
//               size="small"
//               inputProps={{ maxLength: 10 }}
//               required
//             />
//           </Grid>

//           {/* Save Button */}
//           <Grid item xs={12}>
//             <Button
//               type="submit"
//               variant="contained"
//               disabled={!hasChanges}
//               sx={{
//                 backgroundColor: "#673ab7",
//                 "&:hover": { backgroundColor: "#5e35b1" },
//                 "&.Mui-disabled": {
//                   backgroundColor: "#bdbdbd",
//                   color: "#e0e0e0",
//                 },
//                 textTransform: "none",
//                 px: 4,
//                 py: 1.2,
//                 mt: 2,
//                 fontWeight: "bold",
//               }}
//             >
//               Save Details
//             </Button>
//           </Grid>
//         </Grid>
//       </Box>
//     </Paper>
//   );
// }

// export default CompanyDetails;



















// import React, { useState, useEffect } from "react";
// import {
//   Paper,
//   Typography,
//   TextField,
//   Button,
//   Box,
//   Grid,
//   CircularProgress,
// } from "@mui/material";
// import BusinessIcon from "@mui/icons-material/Business";
// import axios from "axios";
// import Swal from "sweetalert2";

// const FormLabel = ({ children }) => (
//   <Typography variant="body1" sx={{ mb: 1, fontWeight: "medium" }}>
//     {children}
//     <span style={{ color: "red" }}>*</span>
//   </Typography>
// );

// const initialFormData = {
//   companyName: "",
//   registerAddress: "",
//   manufacturingAddress: "",
//   phoneNumber: "",
//   panNumber: "",
// };

// function CompanyDetailsForm() {
//   const [formData, setFormData] = useState(initialFormData);
//   const [originalFormData, setOriginalFormData] = useState(initialFormData);
//   const [loading, setLoading] = useState(true);

//   const hasChanges =
//     JSON.stringify(formData) !== JSON.stringify(originalFormData);

//   useEffect(() => {
//     const fetchCompanyDetails = async () => {
//       try {
//         const response = await axios.get(
//           "https://tdtlworld.com/hrms-backend/api/company-details/"
//         );
//         const data = response.data;

//         const fetchedData = {
//           companyName: data.company_name || "",
//           registerAddress: data.register_address || "",
//           manufacturingAddress: data.manufacturing_address || "",
//           phoneNumber: data.phone_number || "",
//           panNumber: data.pan_number || "",
//         };

//         setFormData(fetchedData);
//         setOriginalFormData(fetchedData);
//       } catch (error) {
//         console.error("Failed to fetch company details:", error);
//         Swal.fire({
//           icon: "error",
//           title: "Oops...",
//           text: "Error fetching company details. Please try again later.",
//         });
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchCompanyDetails();
//   }, []);

//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     if (!hasChanges) {
//       Swal.fire({
//         icon: "info",
//         title: "No Changes",
//         text: "No changes detected. Nothing to save.",
//       });
//       return;
//     }

//     try {
//       const payload = {
//         company_name: formData.companyName,
//         register_address: formData.registerAddress,
//         manufacturing_address: formData.manufacturingAddress,
//         phone_number: formData.phoneNumber,
//         pan_number: formData.panNumber,
//         is_posted: 1,
//       };

//       await axios.patch(
//         "https://tdtlworld.com/hrms-backend/api/company-details/",
//         payload
//       );

//       Swal.fire({
//         icon: "success",
//         title: "Success!",
//         text: "Company details updated successfully!",
//         showConfirmButton: false,
//         timer: 1500,
//       });

//       setOriginalFormData(formData);
//     } catch (error) {
//       console.error("Failed to update company details:", error);
//       Swal.fire({
//         icon: "error",
//         title: "Error!",
//         text: "Failed to update company details. Please check your input and try again.",
//       });
//     }
//   };

//   if (loading) {
//     return (
//       <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
//         <CircularProgress sx={{ color: "#8C257C" }} />
//       </Box>
//     );
//   }

//   return (
//     <Paper elevation={3} sx={{ borderRadius: 2, m: { xs: 2, md: 4 } }}>
//       {/* Header */}
//       <Box
//         sx={{
//           display: "flex",
//           alignItems: "center",
//           p: 2,
//           borderBottom: 1,
//           borderColor: "divider",
//           backgroundColor: "#f5f5f5",
//           borderTopLeftRadius: 8,
//           borderTopRightRadius: 8,
//         }}
//       >
//         <Typography variant="h4    " component="h1" sx={{ fontWeight: "bold", color: "#8C257C"}}>
//           Company Details
//         </Typography>
//       </Box>

//       {/* Form */}
//       <Box component="form" onSubmit={handleSubmit} sx={{ p: 3 }}>
//         <Grid container spacing={4}>
//           <Grid item xs={12} md={6}>
//             <FormLabel>Company Name</FormLabel>
//             <TextField fullWidth name="companyName" value={formData.companyName} onChange={handleChange} size="small" required />
//           </Grid>
//           <Grid item xs={12} md={6}>
//             <FormLabel>Register Address</FormLabel>
//             <TextField fullWidth name="registerAddress" value={formData.registerAddress} onChange={handleChange} size="small" required />
//           </Grid>
//           <Grid item xs={12} md={6}>
//             <FormLabel>Manufacturing Address</FormLabel>
//             <TextField fullWidth name="manufacturingAddress" value={formData.manufacturingAddress} onChange={handleChange} size="small" required />
//           </Grid>
//           <Grid item xs={12} md={6}>
//             <FormLabel>Phone Number</FormLabel>
//             <TextField fullWidth name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} size="small" type="tel" inputProps={{ pattern: "[0-9]{10}" }} required />
//           </Grid>
//           <Grid item xs={12} md={6}>
//             <FormLabel>PAN Number</FormLabel>
//             <TextField fullWidth name="panNumber" value={formData.panNumber} onChange={handleChange} size="small" inputProps={{ maxLength: 10, style: { textTransform: 'uppercase' } }} required />
//           </Grid>
//           <Grid item xs={12}>
//             <Button
//               type="submit"
//               variant="contained"
//               disabled={!hasChanges}
//               sx={{
//                 backgroundColor: "#8C257C", // Updated to Purple
//                 "&:hover": { backgroundColor: "#701D63" },
//                 "&.Mui-disabled": {
//                   backgroundColor: "#bdbdbd",
//                   color: "#e0e0e0",
//                 },
//                 textTransform: "none",
//                 px: 4,
//                 py: 1.2,
//                 mt: 2,
//                 fontWeight: "bold",
//               }}
//             >
//               Save Details
//             </Button>
//           </Grid>
//         </Grid>
//       </Box>
//     </Paper>
//   );
// }

// export default CompanyDetailsForm;







import React, { useState, useEffect } from "react";
import {
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Grid,
  CircularProgress,
  Avatar,
} from "@mui/material";
import axios from "axios";
import Swal from "sweetalert2";

const FormLabel = ({ children }) => (
  <Typography variant="body1" sx={{ mb: 1, fontWeight: "medium" }}>
    {children}
    <span style={{ color: "red" }}>*</span>
  </Typography>
);

const initialFormData = {
  companyName: "",
  registerAddress: "",
  manufacturingAddress: "",
  phoneNumber: "",
  panNumber: "",
  company_detail_id: null,
  company_stamp: null,
};

function CompanyDetailsForm() {
  const [formData, setFormData] = useState(initialFormData);
  const [originalFormData, setOriginalFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(true);
  const [selectedStamp, setSelectedStamp] = useState(null);
  const [stampPreview, setStampPreview] = useState(null);

  const hasChanges =
    JSON.stringify(formData) !== JSON.stringify(originalFormData);

  useEffect(() => {
    const fetchCompanyDetails = async () => {
      try {
        const response = await axios.get(
          "https://tdtlworld.com/hrms-backend/api/company-details/"
        );
        const data = response.data;

        const fetchedData = {
          companyName: data.company_name || "",
          registerAddress: data.register_address || "",
          manufacturingAddress: data.manufacturing_address || "",
          phoneNumber: data.phone_number || "",
          panNumber: data.pan_number || "",
          company_detail_id: data.company_detail_id || null,
          company_stamp: data.company_stamp || null,
        };

        setFormData(fetchedData);
        setOriginalFormData(fetchedData);

        if (data.company_stamp) {
          setStampPreview(data.company_stamp);
        }
      } catch (error) {
        console.error("Failed to fetch company details:", error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Error fetching company details. Please try again later.",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchCompanyDetails();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleStampChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedStamp(file);
      setStampPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!hasChanges) {
      Swal.fire({
        icon: "info",
        title: "No Changes",
        text: "No changes detected. Nothing to save.",
      });
      return;
    }

    try {
      const payload = {
        company_name: formData.companyName,
        register_address: formData.registerAddress,
        manufacturing_address: formData.manufacturingAddress,
        phone_number: formData.phoneNumber,
        pan_number: formData.panNumber,
        is_posted: 1,
      };

      await axios.patch(
        "https://tdtlworld.com/hrms-backend/api/company-details/",
        payload
      );

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Company details updated successfully!",
        showConfirmButton: false,
        timer: 1500,
      });

      setOriginalFormData(formData);
    } catch (error) {
      console.error("Failed to update company details:", error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Failed to update company details. Please check your input and try again.",
      });
    }
  };

  const handleStampUpload = async () => {
    if (!selectedStamp) {
      Swal.fire({
        icon: 'info',
        title: 'No File Selected',
        text: 'Please select a stamp image to upload.',
      });
      return;
    }

    const uploadData = new FormData();
    uploadData.append('stamp', selectedStamp);

    try {
      await axios.patch(
        `https://tdtlworld.com/hrms-backend/upload-stamp/${formData.company_detail_id}/`,
        uploadData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Stamp uploaded successfully!',
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error('Failed to upload stamp:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Failed to upload stamp. Please try again.',
      });
    }
  };


  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
        <CircularProgress sx={{ color: "#8C257C" }} />
      </Box>
    );
  }

  return (
    <Paper elevation={3} sx={{ borderRadius: 2, m: { xs: 2, md: 4 } }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          p: 2,
          borderBottom: 1,
          borderColor: "divider",
          backgroundColor: "#f5f5f5",
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
        }}
      >
        <Typography variant="h4" component="h1" sx={{ fontWeight: "bold", color: "#8C257C" }}>
          Company Details
        </Typography>
      </Box>
      <Box component="form" onSubmit={handleSubmit} sx={{ p: 3 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <FormLabel>Company Name</FormLabel>
            <TextField fullWidth name="companyName" value={formData.companyName} onChange={handleChange} size="small" required />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormLabel>Register Address</FormLabel>
            <TextField fullWidth name="registerAddress" value={formData.registerAddress} onChange={handleChange} size="small" required />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormLabel>Manufacturing Address</FormLabel>
            <TextField fullWidth name="manufacturingAddress" value={formData.manufacturingAddress} onChange={handleChange} size="small" required />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormLabel>Phone Number</FormLabel>
            <TextField fullWidth name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} size="small" type="tel" inputProps={{ pattern: "[0-9]{10}" }} required />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormLabel>PAN Number</FormLabel>
            <TextField fullWidth name="panNumber" value={formData.panNumber} onChange={handleChange} size="small" inputProps={{ maxLength: 10, style: { textTransform: 'uppercase' } }} required />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormLabel>Company Stamp</FormLabel>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Button
                variant="contained"
                component="label"
                sx={{
                  backgroundColor: "#8C257C",
                  "&:hover": { backgroundColor: "#701D63" },
                  textTransform: "none",
                  fontWeight: "bold",
                }}
              >
                Choose File
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleStampChange}
                />
              </Button>
              {stampPreview && (
                <Avatar
                  src={stampPreview}
                  alt="Stamp Preview"
                  sx={{ width: 56, height: 56, ml: 2 }}
                  variant="square"
                />
              )}
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              disabled={!hasChanges}
              sx={{
                backgroundColor: "#8C257C",
                "&:hover": { backgroundColor: "#701D63" },
                "&.Mui-disabled": {
                  backgroundColor: "#bdbdbd",
                  color: "#e0e0e0",
                },
                textTransform: "none",
                px: 4,
                py: 1.2,
                mt: 2,
                mr: 2,
                fontWeight: "bold",
              }}
            >
              Save Details
            </Button>
            <Button
              variant="contained"
              onClick={handleStampUpload}
              disabled={!selectedStamp || !formData.company_detail_id}
              sx={{
                backgroundColor: "#8C257C",
                "&:hover": { backgroundColor: "#701D63" },
                "&.Mui-disabled": {
                  backgroundColor: "#bdbdbd",
                  color: "#e0e0e0",
                },
                textTransform: "none",
                px: 4,
                py: 1.2,
                mt: 2,
                fontWeight: "bold",
              }}
            >
              Upload Stamp
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
}

export default CompanyDetailsForm;