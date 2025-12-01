// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Button,
//   Card,
//   CardContent,
//   Divider,
//   FormControl,
//   Grid,
//   InputLabel,
//   MenuItem,
//   Select,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TextField,
//   Typography,
// } from "@mui/material";
// import InputAdornment from "@mui/material/InputAdornment";
// import PersonIcon from "@mui/icons-material/Person";
// import AccessTimeIcon from "@mui/icons-material/AccessTime";
// import EmailIcon from "@mui/icons-material/Email";
// import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
 
// const VisitorBook = () => {
//   const [showForm, setShowForm] = useState(false);
//   const [purchaseDate, setPurchaseDate] = useState(null);
//   const [warrantyEndDate, setWarrantyEndDate] = useState(null);
 
//   const [departments, setDepartments] = useState([]);
//   const [visitors, setVisitors] = useState([]);
//   const [formData, setFormData] = useState({
//     department_name: "",
//     visit_purpose: "",
//     visitor_name: "",
//     visit_date: "",
//     check_in: "",
//     phone: "",
//     email: "",
//     description: "",
//     address: "",
//     company_id: 2, // or get this dynamically
//     department: "", // department ID
//   });
 
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };
 
//   const fetchVisitors = async () => {
//     const token = localStorage.getItem("accessToken");
 
//     try {
//       const response = await fetch(
//         "https://tdtlworld.com/hrms-backend/visitors/raw/",
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
 
//       const data = await response.json();
 
//       if (Array.isArray(data)) {
//         setVisitors(data); // Assume response is an array
//       } else if (data.status === "success" && Array.isArray(data.data)) {
//         setVisitors(data.data); // Handle if data is under `data` key
//       } else {
//         console.error("Unexpected data format:", data);
//       }
//     } catch (error) {
//       console.error("Error fetching visitor data:", error);
//     }
//   };
 
//   useEffect(() => {
//     fetchVisitors();
//   }, []);
 
//   useEffect(() => {
//     const fetchDepartments = async () => {
//       const token = localStorage.getItem("accessToken");
//       try {
//         const response = await fetch(
//           "https://tdtlworld.com/hrms-backend/api/desig_dept_dropdown",
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
 
//         const data = await response.json();
 
//         if (data.status === "success") {
//           setDepartments(data.dept_data); // Store dept data in state
//         } else {
//           console.error("Failed to fetch departments:", data);
//         }
//       } catch (error) {
//         console.error("Error fetching departments:", error);
//       }
//     };
 
//     fetchDepartments();
//   }, []);
 
//   const handleSubmit = async () => {
//     const token = localStorage.getItem("accessToken");
 
//     const now = new Date();
//     const formattedDateTime = now.toISOString().slice(0, 19).replace("T", " ");
 
//     const payload = {
//       ...formData,
//       company_id: 3,
//       department: 5,
//       created_by: 3,
//       created_at: formattedDateTime, // current system time
//     };
 
//     try {
//       const response = await fetch(
//         "https://tdtlworld.com/hrms-backend/visitors/",
//         {
//           method: "POST",
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(payload),
//         }
//       );
 
//       if (!response.ok) {
//         throw new Error("Failed to submit data");
//       }
 
//       const data = await response.json();
//       alert("Visitor added successfully!");
//       // // Optionally update the visitors list
//       // setVisitors((prev) => [...prev, data]);
 
//       await fetchVisitors();
 
//       // Reset the form
//       setFormData({
//         department_name: "",
//         visit_purpose: "",
//         visitor_name: "",
//         visit_date: "",
//         check_in: "",
//         phone: "",
//         email: "",
//         description: "",
//         address: "",
//       });
 
//       setShowForm(false);
//     } catch (error) {
//       console.error(error);
//       alert("Error while submitting the form.");
//     }
//   };
 
//   return (
//     <LocalizationProvider dateAdapter={AdapterDayjs}>
//       <Card elevation={0} sx={{ backgroundColor: "#f5f5f5", borderRadius: 2 }}>
//         <CardContent sx={{ backgroundColor: "white", borderRadius: 2, p: 3 }}>
//           <Box
//             display="flex"
//             justifyContent="space-between"
//             alignItems="center"
//             mb={2}
//           >
//             <Typography variant="subtitle1" fontWeight="bold">
//               List All Visitors
//             </Typography>
//             <Button
//               variant="contained"
//               sx={{ backgroundColor: "#8b5cf6", textTransform: "none" }}
//               onClick={() => setShowForm(!showForm)}
//             >
//               {showForm ? "− Hide" : "+ Add New"}
//             </Button>
//           </Box>
 
//           {showForm && (
//             <>
//               {/* Container for form and image section */}
//               <Box
//                 display="flex"
//                 flexDirection="column"
//                 gap={2}
//                 mb={5}
//                 sx={{
//                   border: "1px solid #eee",
//                   borderRadius: 2,
//                   backgroundColor: "#fafafa",
//                   p: 2,
//                 }}
//               >
//                 <Grid container spacing={2}>
//                   <Grid item xs={12} md={4}>
//                     <FormControl fullWidth required>
//                       <InputLabel>Department</InputLabel>
//                       <Select
//                         name="department_name"
//                         value={formData.department_name}
//                         onChange={handleChange}
//                         fullWidth
//                       >
//                         <MenuItem value="">Select Department</MenuItem>
//                         {departments.map((dept) => (
//                           <MenuItem key={dept.dept_id} value={dept.dept_name}>
//                             {dept.dept_name}
//                           </MenuItem>
//                         ))}
//                       </Select>
//                     </FormControl>
//                   </Grid>
//                   <Grid item xs={12} md={4}>
//                     <TextField
//                       sx={{ height: "100%" }}
//                       label="Visit Purpose"
//                       name="visit_purpose"
//                       value={formData.visit_purpose}
//                       onChange={handleChange}
//                       required
//                       fullWidth
//                     />
//                   </Grid>
//                   <Grid item xs={12} md={4}>
//                     <TextField
//                       label="Visitor Name"
//                       name="visitor_name"
//                       value={formData.visitor_name}
//                       onChange={handleChange}
//                       required
//                       fullWidth
//                       InputProps={{
//                         startAdornment: (
//                           <InputAdornment position="start">
//                             <PersonIcon />
//                           </InputAdornment>
//                         ),
//                       }}
//                     />
//                   </Grid>
 
//                   <Grid item xs={12} md={4}>
//                     <TextField
//                       label="Visit Date"
//                       name="visit_date"
//                       value={formData.visit_date}
//                       onChange={handleChange}
//                       required
//                       fullWidth
//                       type="date"
//                       InputLabelProps={{ shrink: true }}
//                     />
//                   </Grid>
//                   <Grid item xs={12} md={4}>
//                     <TextField
//                       label="In Time"
//                       name="check_in"
//                       value={formData.check_in}
//                       onChange={handleChange}
//                       required
//                       fullWidth
//                       type="time"
//                       InputLabelProps={{ shrink: true }}
//                       InputProps={{
//                         endAdornment: (
//                           <InputAdornment position="end"></InputAdornment>
//                         ),
//                       }}
//                     />
//                   </Grid>
//                   <Grid item xs={12} md={4}>
//                     <TextField
//                       label="Phone"
//                       name="phone"
//                       value={formData.phone}
//                       onChange={handleChange}
//                       required
//                       fullWidth
//                     />
//                   </Grid>
 
//                   <Grid item xs={12} md={4}>
//                     <TextField
//                       label="Email"
//                       name="email"
//                       value={formData.email}
//                       onChange={handleChange}
//                       required
//                       fullWidth
//                       type="email"
//                       InputProps={{
//                         startAdornment: (
//                           <InputAdornment position="start">
//                             <EmailIcon />
//                           </InputAdornment>
//                         ),
//                       }}
//                     />
//                   </Grid>
 
//                   <Grid item xs={12}>
//                     <TextField
//                       label="Description"
//                       name="description"
//                       value={formData.description}
//                       onChange={handleChange}
//                       fullWidth
//                       multiline
//                       rows={2}
//                     />
//                   </Grid>
//                   <Grid item xs={12}>
//                     <TextField
//                       label="Address"
//                       name="address"
//                       value={formData.address}
//                       onChange={handleChange}
//                       required
//                       fullWidth
//                       multiline
//                       rows={2}
//                     />
//                   </Grid>
//                 </Grid>
 
//                 {/* Action buttons */}
//                 <Box display="flex" justifyContent="flex-end" gap={2}>
//                   <Button variant="outlined" color="secondary">
//                     Reset
//                   </Button>
//                   {/* <Button
//                     variant="contained"
//                     sx={{ backgroundColor: "#8b5cf6" }}
//                   >
//                     Save
//                   </Button> */}
//                   <Button
//                     variant="contained"
//                     sx={{ backgroundColor: "#8b5cf6" }}
//                     onClick={handleSubmit}
//                   >
//                     Save
//                   </Button>
//                 </Box>
//               </Box>
//             </>
//           )}
 
//           {/* Table container section */}
//           <Box>
//            <Box
//   display="flex"
//   flexDirection={{ xs: "column", sm: "row" }}
//   justifyContent="space-between"
//   alignItems={{ xs: "stretch", sm: "center" }}
//   gap={2}
//   mb={2}
// >
//   <FormControl size="small" sx={{ width: { xs: "100%", sm: 120 } }}>
//     <InputLabel>Show</InputLabel>
//     <Select defaultValue={10} label="Show">
//       <MenuItem value={10}>10</MenuItem>
//       <MenuItem value={25}>25</MenuItem>
//       <MenuItem value={50}>50</MenuItem>
//     </Select>
//   </FormControl>

//   <TextField
//     size="small"
//     placeholder="Search"
//     sx={{ width: { xs: "100%", sm: 200 } }}
//   />
// </Box>

 
//             <TableContainer sx={{ width: "100%", overflowX: "auto" }}>
//               <Table size="small" sx={{ minWidth: 650 }}>
//                 <TableHead sx={{ backgroundColor: "#f9fafb" }}>
//                   <TableRow>
//                     {[
//                       "VISITOR NAME",
//                       "DEPARTMENT",
//                       "VISIT PURPOSE",
//                       "PHONE",
//                       "VISIT DATE",
//                       "IN TIME",
//                     ].map((header) => (
//                       <TableCell key={header} sx={{ fontWeight: "bold" }}>
//                         {header}
//                       </TableCell>
//                     ))}
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {visitors.length === 0 ? (
//                     <TableRow>
//                       <TableCell colSpan={7} align="center">
//                         No records available
//                       </TableCell>
//                     </TableRow>
//                   ) : (
//                     visitors.map((visitor) => (
//                       <TableRow key={visitor.visitor_id}>
//                         <TableCell>{visitor.visitor_name}</TableCell>
//                         <TableCell>{visitor.department_name}</TableCell>
//                         <TableCell>{visitor.visit_purpose}</TableCell>
//                         <TableCell>{visitor.phone}</TableCell>
//                         <TableCell>{visitor.visit_date}</TableCell>
//                         <TableCell>{visitor.check_in}</TableCell>
//                       </TableRow>
//                     ))
//                   )}
//                 </TableBody>
//               </Table>
//             </TableContainer>
 
//             <Divider sx={{ my: 2 }} />
 
//             <Box display="flex" justifyContent="space-between">
//               {/* <Typography variant="body2">No records available</Typography> */}
//               <Box>
//                 <Button size="small" disabled>
//                   Previous
//                 </Button>
//                 <Button size="small">Next</Button>
//               </Box>
//             </Box>
//           </Box>
//         </CardContent>
//       </Card>
//     </LocalizationProvider>
//   );
// };
 
// export default VisitorBook;









// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Button,
//   Card,
//   CardContent,
//   Divider,
//   FormControl,
//   Grid,
//   InputLabel,
//   MenuItem,
//   Select,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TextField,
//   Typography,
// } from "@mui/material";
// import InputAdornment from "@mui/material/InputAdornment";
// import PersonIcon from "@mui/icons-material/Person";
// import EmailIcon from "@mui/icons-material/Email";
// import { LocalizationProvider } from "@mui/x-date-pickers";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

// const VisitorBook = () => {
//   const [showForm, setShowForm] = useState(false);
//   const [departments, setDepartments] = useState([]);
//   const [visitors, setVisitors] = useState([]);

//   // Initial form state
//   const initialFormData = {
//     visit_purpose: "",
//     visitor_name: "",
//     visit_date: "",
//     check_in: "",
//     phone: "",
//     email: "",
//     description: "",
//     address: "",
//     company_id: 2, // or get this dynamically
//     department: "", // This will hold the department ID
//   };

//   const [formData, setFormData] = useState(initialFormData);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const fetchVisitors = async () => {
//     const token = localStorage.getItem("accessToken");

//     try {
//       const response = await fetch(
//         "https://tdtlworld.com/hrms-backend/visitors/raw/",
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       const data = await response.json();

//       if (Array.isArray(data)) {
//         setVisitors(data); // Assume response is an array
//       } else if (data.status === "success" && Array.isArray(data.data)) {
//         setVisitors(data.data); // Handle if data is under `data` key
//       } else {
//         console.error("Unexpected visitor data format:", data);
//         setVisitors([]);
//       }
//     } catch (error) {
//       console.error("Error fetching visitor data:", error);
//     }
//   };

//   const fetchDepartments = async () => {
//     const token = localStorage.getItem("accessToken");
//     try {
//       // *** MODIFIED: Using the new API endpoint for departments ***
//       const response = await fetch(
//         "https://tdtlworld.com/hrms-backend/api/departments/dropdown/",
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       const data = await response.json();

//       // *** MODIFIED: Changed success check to `data.status === true` and data key to `data.data` ***
//       if (data.status === true && Array.isArray(data.data)) {
//         setDepartments(data.data); // Store dept data in state
//       } else {
//         console.error("Failed to fetch departments:", data);
//       }
//     } catch (error) {
//       console.error("Error fetching departments:", error);
//     }
//   };

//   useEffect(() => {
//     fetchVisitors();
//     fetchDepartments(); // Fetch departments on component mount
//   }, []);

//   const handleSubmit = async () => {
//     const token = localStorage.getItem("accessToken");
//     const now = new Date();
//     const formattedDateTime = now.toISOString().slice(0, 19).replace("T", " ");

//     const payload = {
//       ...formData,
//       company_id: 3,
//       // *** MODIFIED: Using the selected department ID from the state ***
//       department: formData.department,
//       created_by: 3,
//       created_at: formattedDateTime, // current system time
//     };

//     // Simple validation check
//     if (!payload.department || !payload.visitor_name || !payload.visit_date) {
//         alert("Please fill all required fields: Department, Visitor Name, and Visit Date.");
//         return;
//     }

//     try {
//       const response = await fetch(
//         "https://tdtlworld.com/hrms-backend/visitors/",
//         {
//           method: "POST",
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(payload),
//         }
//       );

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message || "Failed to submit data");
//       }

//       await response.json();
//       alert("Visitor added successfully!");

//       // Refresh the visitor list
//       await fetchVisitors();

//       // Reset the form to its initial state and hide it
//       setFormData(initialFormData);
//       setShowForm(false);
//     } catch (error) {
//       console.error(error);
//       alert(`Error while submitting the form: ${error.message}`);
//     }
//   };
  
//   const handleReset = () => {
//     setFormData(initialFormData);
//   }

//   return (
//     <LocalizationProvider dateAdapter={AdapterDayjs}>
//       <Card elevation={0} sx={{ backgroundColor: "#f5f5f5", borderRadius: 2 }}>
//         <CardContent sx={{ backgroundColor: "white", borderRadius: 2, p: 3 }}>
//           <Box
//             display="flex"
//             justifyContent="space-between"
//             alignItems="center"
//             mb={2}
//           >
//             <Typography variant="subtitle1" fontWeight="bold">
//               List All Visitors
//             </Typography>
//             <Button
//               variant="contained"
//               sx={{ backgroundColor: "#8b5cf6", textTransform: "none" }}
//               onClick={() => setShowForm(!showForm)}
//             >
//               {showForm ? "− Hide" : "+ Add New"}
//             </Button>
//           </Box>

//           {showForm && (
//             <>
//               <Box
//                 display="flex"
//                 flexDirection="column"
//                 gap={2}
//                 mb={5}
//                 sx={{
//                   border: "1px solid #eee",
//                   borderRadius: 2,
//                   backgroundColor: "#fafafa",
//                   p: 2,
//                 }}
//               >
//                 <Grid container spacing={2}>
//                   <Grid item xs={12} md={4}>
//                     <FormControl fullWidth required>
//                       <InputLabel>Department</InputLabel>
//                       {/* *** MODIFIED: Select component now uses `department` for name/value and maps new API data *** */}
//                       <Select
//                         name="department"
//                         value={formData.department}
//                         onChange={handleChange}
//                         label="Department"
//                       >
//                         <MenuItem value="">
//                           <em>Select Department</em>
//                         </MenuItem>
//                         {departments.map((dept) => (
//                           <MenuItem
//                             key={dept.department_id}
//                             value={dept.department_id}
//                           >
//                             {dept.department_name}
//                           </MenuItem>
//                         ))}
//                       </Select>
//                     </FormControl>
//                   </Grid>
//                   <Grid item xs={12} md={4}>
//                     <TextField
//                       label="Visit Purpose"
//                       name="visit_purpose"
//                       value={formData.visit_purpose}
//                       onChange={handleChange}
//                       required
//                       fullWidth
//                     />
//                   </Grid>
//                   <Grid item xs={12} md={4}>
//                     <TextField
//                       label="Visitor Name"
//                       name="visitor_name"
//                       value={formData.visitor_name}
//                       onChange={handleChange}
//                       required
//                       fullWidth
//                       InputProps={{
//                         startAdornment: (
//                           <InputAdornment position="start">
//                             <PersonIcon />
//                           </InputAdornment>
//                         ),
//                       }}
//                     />
//                   </Grid>

//                   <Grid item xs={12} md={4}>
//                     <TextField
//                       label="Visit Date"
//                       name="visit_date"
//                       value={formData.visit_date}
//                       onChange={handleChange}
//                       required
//                       fullWidth
//                       type="date"
//                       InputLabelProps={{ shrink: true }}
//                     />
//                   </Grid>
//                   <Grid item xs={12} md={4}>
//                     <TextField
//                       label="In Time"
//                       name="check_in"
//                       value={formData.check_in}
//                       onChange={handleChange}
//                       required
//                       fullWidth
//                       type="time"
//                       InputLabelProps={{ shrink: true }}
//                     />
//                   </Grid>
//                   <Grid item xs={12} md={4}>
//                     <TextField
//                       label="Phone"
//                       name="phone"
//                       value={formData.phone}
//                       onChange={handleChange}
//                       required
//                       fullWidth
//                     />
//                   </Grid>

//                   <Grid item xs={12} md={4}>
//                     <TextField
//                       label="Email"
//                       name="email"
//                       value={formData.email}
//                       onChange={handleChange}
//                       required
//                       fullWidth
//                       type="email"
//                       InputProps={{
//                         startAdornment: (
//                           <InputAdornment position="start">
//                             <EmailIcon />
//                           </InputAdornment>
//                         ),
//                       }}
//                     />
//                   </Grid>

//                   <Grid item xs={12}>
//                     <TextField
//                       label="Description"
//                       name="description"
//                       value={formData.description}
//                       onChange={handleChange}
//                       fullWidth
//                       multiline
//                       rows={2}
//                     />
//                   </Grid>
//                   <Grid item xs={12}>
//                     <TextField
//                       label="Address"
//                       name="address"
//                       value={formData.address}
//                       onChange={handleChange}
//                       required
//                       fullWidth
//                       multiline
//                       rows={2}
//                     />
//                   </Grid>
//                 </Grid>

//                 <Box display="flex" justifyContent="flex-end" gap={2}>
//                   <Button variant="outlined" color="secondary" onClick={handleReset}>
//                     Reset
//                   </Button>
//                   <Button
//                     variant="contained"
//                     sx={{ backgroundColor: "#8b5cf6" }}
//                     onClick={handleSubmit}
//                   >
//                     Save
//                   </Button>
//                 </Box>
//               </Box>
//             </>
//           )}

//           <Box>
//             <Box
//               display="flex"
//               flexDirection={{ xs: "column", sm: "row" }}
//               justifyContent="space-between"
//               alignItems={{ xs: "stretch", sm: "center" }}
//               gap={2}
//               mb={2}
//             >
//               <FormControl
//                 size="small"
//                 sx={{ width: { xs: "100%", sm: 120 } }}
//               >
//                 <InputLabel>Show</InputLabel>
//                 <Select defaultValue={10} label="Show">
//                   <MenuItem value={10}>10</MenuItem>
//                   <MenuItem value={25}>25</MenuItem>
//                   <MenuItem value={50}>50</MenuItem>
//                 </Select>
//               </FormControl>

//               <TextField
//                 size="small"
//                 placeholder="Search"
//                 sx={{ width: { xs: "100%", sm: 200 } }}
//               />
//             </Box>

//             <TableContainer sx={{ width: "100%", overflowX: "auto" }}>
//               <Table size="small" sx={{ minWidth: 650 }}>
//                 <TableHead sx={{ backgroundColor: "#f9fafb" }}>
//                   <TableRow>
//                     {[
//                       "VISITOR NAME",
//                       "DEPARTMENT",
//                       "VISIT PURPOSE",
//                       "PHONE",
//                       "VISIT DATE",
//                       "IN TIME",
//                     ].map((header) => (
//                       <TableCell key={header} sx={{ fontWeight: "bold" }}>
//                         {header}
//                       </TableCell>
//                     ))}
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {visitors.length === 0 ? (
//                     <TableRow>
//                       <TableCell colSpan={6} align="center">
//                         No records available
//                       </TableCell>
//                     </TableRow>
//                   ) : (
//                     visitors.map((visitor) => (
//                       <TableRow key={visitor.visitor_id}>
//                         <TableCell>{visitor.visitor_name}</TableCell>
//                         <TableCell>{visitor.department_name}</TableCell>
//                         <TableCell>{visitor.visit_purpose}</TableCell>
//                         <TableCell>{visitor.phone}</TableCell>
//                         <TableCell>{visitor.visit_date}</TableCell>
//                         <TableCell>{visitor.check_in}</TableCell>
//                       </TableRow>
//                     ))
//                   )}
//                 </TableBody>
//               </Table>
//             </TableContainer>

//             <Divider sx={{ my: 2 }} />

//             <Box display="flex" justifyContent="space-between">
//               <Box>
//                 <Button size="small" disabled>
//                   Previous
//                 </Button>
//                 <Button size="small">Next</Button>
//               </Box>
//             </Box>
//           </Box>
//         </CardContent>
//       </Card>
//     </LocalizationProvider>
//   );
// };

// export default VisitorBook;







// import React, { useState, useEffect, useMemo } from "react";
// import {
//   Box,
//   Button,
//   Card,
//   CardContent,
//   Divider,
//   FormControl,
//   Grid,
//   InputLabel,
//   MenuItem,
//   Select,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TextField,
//   Typography,
//   Paper,
//   InputAdornment,
//   useTheme,
//   useMediaQuery,
//   TablePagination,
//   Skeleton,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   CircularProgress,
//   IconButton,
// } from "@mui/material";
// import {
//   Add,
//   Search as SearchIcon,
//   Person as PersonIcon,
//   Email as EmailIcon,
//   Edit,
//   Delete,
// } from "@mui/icons-material";
// import { LocalizationProvider } from "@mui/x-date-pickers";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import Swal from "sweetalert2";

// const VisitorBook = () => {
//   // Theme and Responsive Hooks
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

//   // State Management
//   const [loading, setLoading] = useState(true);
//   const [visitors, setVisitors] = useState([]);
//   const [departments, setDepartments] = useState([]);
//   const [openDialog, setOpenDialog] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");

//   // Pagination State
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);

//   // Initial Form State
//   const initialFormData = {
//     visit_purpose: "",
//     visitor_name: "",
//     visit_date: "",
//     check_in: "",
//     phone: "",
//     email: "",
//     description: "",
//     address: "",
//     department: "", // This will hold the department ID
//   };

//   const [formData, setFormData] = useState(initialFormData);

//   // Handlers
//   const handleDialogOpen = () => {
//     setFormData(initialFormData); // Reset form on open
//     setOpenDialog(true);
//   };

//   const handleDialogClose = () => {
//     setOpenDialog(false);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   // API Fetching
//   const fetchVisitors = async () => {
//     setLoading(true);
//     const token = localStorage.getItem("accessToken");
//     try {
//       const response = await fetch(
//         "https://tdtlworld.com/hrms-backend/visitors/raw/",
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       const data = await response.json();
//       setVisitors(Array.isArray(data) ? data : []);
//     } catch (error) {
//       console.error("Error fetching visitor data:", error);
//       Swal.fire({
//         icon: "error",
//         title: "Fetch Error",
//         text: "Could not fetch visitor data.",
//         timer: 3000,
//         showConfirmButton: false,
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchDepartments = async () => {
//     const token = localStorage.getItem("accessToken");
//     try {
//       const response = await fetch(
//         "https://tdtlworld.com/hrms-backend/api/departments/dropdown/",
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       const data = await response.json();
//       if (data.status === true && Array.isArray(data.data)) {
//         setDepartments(data.data);
//       } else {
//         console.error("Failed to fetch departments:", data);
//       }
//     } catch (error) {
//       console.error("Error fetching departments:", error);
//     }
//   };

//   useEffect(() => {
//     fetchVisitors();
//     fetchDepartments();
//   }, []);

//   const handleSubmit = async () => {
//     // Simple validation check
//     if (!formData.department || !formData.visitor_name || !formData.visit_date) {
//       Swal.fire({
//         icon: "warning",
//         title: "Missing Information",
//         text: "Please fill all required fields: Department, Visitor Name, and Visit Date.",
//         timer: 3000,
//         showConfirmButton: false,
//       });
//       return;
//     }

//     setIsSubmitting(true);
//     const token = localStorage.getItem("accessToken");
//     const now = new Date();
//     const formattedDateTime = now.toISOString().slice(0, 19).replace("T", " ");

//     const payload = {
//       ...formData,
//       company_id: 3,
//       created_by: 3,
//       created_at: formattedDateTime,
//     };

//     try {
//       const response = await fetch(
//         "https://tdtlworld.com/hrms-backend/visitors/",
//         {
//           method: "POST",
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(payload),
//         }
//       );

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message || "Failed to submit data");
//       }

//       Swal.fire({
//         icon: "success",
//         title: "Success!",
//         text: "Visitor added successfully!",
//         timer: 3000,
//         showConfirmButton: false,
//       });

//       await fetchVisitors(); // Refresh list
//       handleDialogClose(); // Close dialog
//     } catch (error) {
//       console.error(error);
//       Swal.fire({
//         icon: "error",
//         title: "Submission Failed",
//         text: error.message || "An unexpected error occurred.",
//         timer: 3000,
//         showConfirmButton: false,
//       });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // Filtering Logic
//   const filteredVisitors = useMemo(() => {
//     if (!searchTerm) return visitors;
//     return visitors.filter(
//       (visitor) =>
//         visitor.visitor_name
//           .toLowerCase()
//           .includes(searchTerm.toLowerCase()) ||
//         visitor.department_name
//           .toLowerCase()
//           .includes(searchTerm.toLowerCase()) ||
//         visitor.visit_purpose.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//   }, [visitors, searchTerm]);

//   return (
//     <LocalizationProvider dateAdapter={AdapterDayjs}>
//       <Box component={Paper} p={3}>
//         <Typography
//           variant="h4"
//           sx={{ color: "#8C257C", fontWeight: "bold", mb: 4 }}
//         >
//           Visitor Book
//         </Typography>

//         <Box
//           sx={{
//             display: "flex",
//             flexDirection: isMobile ? "column" : "row",
//             justifyContent: "space-between",
//             alignItems: "center",
//             gap: 2,
//             mb: 2,
//           }}
//         >
//           <Button
//             variant="contained"
//             startIcon={<Add />}
//             onClick={handleDialogOpen}
//             sx={{
//               backgroundColor: "#8C257C",
//               color: "#FFFFFF",
//               textTransform: "none",
//               width: isMobile ? "100%" : "auto",
//               "&:hover": { backgroundColor: "#6d1d60" },
//             }}
//           >
//             Add New 
//           </Button>

//           <TextField
//             size="small"
//             placeholder="Search ..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <SearchIcon />
//                 </InputAdornment>
//               ),
//             }}
//             sx={{ width: isMobile ? "100%" : "auto" }}
//           />
//         </Box>

//         {/* Visitor Form Dialog */}
//         <Dialog open={openDialog} onClose={handleDialogClose} fullWidth maxWidth="md">
//           <DialogTitle variant="h5" sx={{ color: "#8C257C", fontWeight: "bold" }}>
//             Add New Visitor
//           </DialogTitle>
//           <DialogContent>
//             <Grid container spacing={2} sx={{ mt: 1 }}>
//               <Grid item xs={12} sm={4}>
//                 <FormControl fullWidth required>
//                   <InputLabel>Department</InputLabel>
//                   <Select
//                     name="department"
//                     value={formData.department}
//                     onChange={handleChange}
//                     label="Department"
//                   >
//                     <MenuItem value="">
//                       <em>Select Department</em>
//                     </MenuItem>
//                     {departments.map((dept) => (
//                       <MenuItem
//                         key={dept.department_id}
//                         value={dept.department_id}
//                       >
//                         {dept.department_name}
//                       </MenuItem>
//                     ))}
//                   </Select>
//                 </FormControl>
//               </Grid>
//               <Grid item xs={12} sm={4}>
//                 <TextField
//                   label="Visit Purpose"
//                   name="visit_purpose"
//                   value={formData.visit_purpose}
//                   onChange={handleChange}
//                   required
//                   fullWidth
//                 />
//               </Grid>
//               <Grid item xs={12} sm={4}>
//                 <TextField
//                   label="Visitor Name"
//                   name="visitor_name"
//                   value={formData.visitor_name}
//                   onChange={handleChange}
//                   required
//                   fullWidth
//                   InputProps={{
//                     startAdornment: (
//                       <InputAdornment position="start">
//                         <PersonIcon />
//                       </InputAdornment>
//                     ),
//                   }}
//                 />
//               </Grid>
//               <Grid item xs={12} sm={4}>
//                 <TextField
//                   label="Visit Date"
//                   name="visit_date"
//                   value={formData.visit_date}
//                   onChange={handleChange}
//                   required
//                   fullWidth
//                   type="date"
//                   InputLabelProps={{ shrink: true }}
//                 />
//               </Grid>
//               <Grid item xs={12} sm={4}>
//                 <TextField
//                   label="In Time"
//                   name="check_in"
//                   value={formData.check_in}
//                   onChange={handleChange}
//                   required
//                   fullWidth
//                   type="time"
//                   InputLabelProps={{ shrink: true }}
//                 />
//               </Grid>
//               <Grid item xs={12} sm={4}>
//                 <TextField
//                   label="Phone"
//                   name="phone"
//                   value={formData.phone}
//                   onChange={handleChange}
//                   required
//                   fullWidth
//                 />
//               </Grid>
//               <Grid item xs={12} sm={4}>
//                 <TextField
//                   label="Email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   fullWidth
//                   type="email"
//                   InputProps={{
//                     startAdornment: (
//                       <InputAdornment position="start">
//                         <EmailIcon />
//                       </InputAdornment>
//                     ),
//                   }}
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   label="Description"
//                   name="description"
//                   value={formData.description}
//                   onChange={handleChange}
//                   fullWidth
//                   multiline
//                   rows={2}
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   label="Address"
//                   name="address"
//                   value={formData.address}
//                   onChange={handleChange}
//                   required
//                   fullWidth
//                   multiline
//                   rows={2}
//                 />
//               </Grid>
//             </Grid>
//           </DialogContent>
//           <DialogActions sx={{ p: '16px 24px' }}>
//             <Button
//               onClick={handleDialogClose}
//               sx={{ color: '#757575', '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' } }}
//             >
//               Cancel
//             </Button>
//             <Button
//               variant="contained"
//               onClick={handleSubmit}
//               disabled={isSubmitting}
//               sx={{
//                 backgroundColor: "#8C257C",
//                 color: "#FFFFFF",
//                 "&:hover": { backgroundColor: "#6d1d60" },
//               }}
//             >
//               {isSubmitting ? (
//                 <CircularProgress size={24} color="inherit" />
//               ) : (
//                 "Save"
//               )}
//             </Button>
//           </DialogActions>
//         </Dialog>

//         {/* Table */}
//         <TableContainer>
//           <Table sx={{ minWidth: '100%', whiteSpace: 'nowrap' }}>
//             <TableHead sx={{ backgroundColor: "#8C257C" }}>
//               <TableRow>
//                 {/* *** MODIFIED: Added Sr.No Header *** */}
//                 <TableCell sx={{ color: "white", fontWeight: "bold" }}>SR.NO</TableCell>
//                 <TableCell sx={{ color: "white", fontWeight: "bold" }}>VISITOR NAME</TableCell>
//                 <TableCell sx={{ color: "white", fontWeight: "bold" }}>DEPARTMENT</TableCell>
//                 <TableCell sx={{ color: "white", fontWeight: "bold" }}>VISIT PURPOSE</TableCell>
//                 <TableCell sx={{ color: "white", fontWeight: "bold" }}>PHONE</TableCell>
//                 <TableCell sx={{ color: "white", fontWeight: "bold" }}>VISIT DATE</TableCell>
//                 <TableCell sx={{ color: "white", fontWeight: "bold" }}>IN TIME</TableCell>
//                 <TableCell align="center" sx={{ color: "white", fontWeight: "bold" }}>ACTIONS</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {loading ? (
//                 Array.from(new Array(5)).map((_, index) => (
//                   <TableRow key={index}>
//                     {/* *** MODIFIED: Added Skeleton for Sr.No *** */}
//                     <TableCell><Skeleton variant="text" /></TableCell>
//                     <TableCell><Skeleton variant="text" /></TableCell>
//                     <TableCell><Skeleton variant="text" /></TableCell>
//                     <TableCell><Skeleton variant="text" /></TableCell>
//                     <TableCell><Skeleton variant="text" /></TableCell>
//                     <TableCell><Skeleton variant="text" /></TableCell>
//                     <TableCell><Skeleton variant="text" /></TableCell>
//                     <TableCell align="center"><Skeleton variant="rectangular" width={100} height={30} /></TableCell>
//                   </TableRow>
//                 ))
//               ) : filteredVisitors.length === 0 ? (
//                 <TableRow>
//                   {/* *** MODIFIED: Updated colSpan to 8 *** */}
//                   <TableCell colSpan={8} align="center">
//                     No records available
//                   </TableCell>
//                 </TableRow>
//               ) : (
//                 filteredVisitors
//                   .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                   .map((visitor, index) => ( // Added index to map
//                     <TableRow key={visitor.visitor_id} sx={{ '&:hover': { backgroundColor: '#f5f5f5' } }}>
//                       {/* *** MODIFIED: Added Sr.No Cell *** */}
//                       <TableCell sx={{ fontSize: '0.95rem' }}>{page * rowsPerPage + index + 1}</TableCell>
//                       <TableCell sx={{ fontSize: '0.95rem' }}>{visitor.visitor_name}</TableCell>
//                       <TableCell sx={{ fontSize: '0.95rem' }}>{visitor.department_name}</TableCell>
//                       <TableCell sx={{ fontSize: '0.95rem' }}>{visitor.visit_purpose}</TableCell>
//                       <TableCell sx={{ fontSize: '0.95rem' }}>{visitor.phone}</TableCell>
//                       <TableCell sx={{ fontSize: '0.95rem' }}>{visitor.visit_date}</TableCell>
//                       <TableCell sx={{ fontSize: '0.95rem' }}>{visitor.check_in}</TableCell>
//                       <TableCell>
//                         <Box display="flex" justifyContent="center" gap={0.5}>
//                           <IconButton size="small" sx={{ color: theme.palette.primary.main }}>
//                             <Edit fontSize="inherit" />
//                           </IconButton>
//                           <IconButton size="small" sx={{ color: theme.palette.error.main }}>
//                             <Delete fontSize="inherit" />
//                           </IconButton>
//                         </Box>
//                       </TableCell>
//                     </TableRow>
//                   ))
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>

//         {/* Footer & Pagination */}
//         <Box
//           sx={{
//             display: 'flex',
//             flexDirection: isMobile ? 'column' : 'row',
//             justifyContent: 'space-between',
//             alignItems: 'center',
//             mt: 2,
//             gap: 2
//           }}
//         >
//           <Typography variant="body2" color="text.secondary">
//             Showing {filteredVisitors.length > 0 ? page * rowsPerPage + 1 : 0} to {Math.min((page + 1) * rowsPerPage, filteredVisitors.length)} of {filteredVisitors.length} results
//           </Typography>
//           <TablePagination
//             component="div"
//             count={filteredVisitors.length}
//             page={page}
//             onPageChange={handleChangePage}
//             rowsPerPage={rowsPerPage}
//             onRowsPerPageChange={handleChangeRowsPerPage}
//             rowsPerPageOptions={[5, 10, 15, 25]}
//             sx={{
//               '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': {
//                 color: '#8C257C'
//               },
//               '& .MuiSvgIcon-root': {
//                 color: '#8C257C'
//               }
//             }}
//           />
//         </Box>
//       </Box>
//     </LocalizationProvider>
//   );
// };

// export default VisitorBook;





import React, { useState, useEffect, useMemo } from "react";
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Paper,
  InputAdornment,
  useTheme,
  useMediaQuery,
  Skeleton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  IconButton,
  Pagination,
} from "@mui/material";
import {
  Add,
  Search as SearchIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  Edit,
  Delete,
} from "@mui/icons-material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Swal from "sweetalert2";

const VisitorBook = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [loading, setLoading] = useState(true);
  const [visitors, setVisitors] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const initialFormData = {
    visit_purpose: "",
    visitor_name: "",
    visit_date: "",
    check_in: "",
    phone: "",
    email: "",
    description: "",
    address: "",
    department: "",
  };

  const [formData, setFormData] = useState(initialFormData);

  const primaryColor = "#8C257C";
  const primaryHoverColor = "#6d1d60";
  const secondaryColor = "#F58E35";
  const textOnPrimary = "#FFFFFF";

  const handleDialogOpen = () => {
    setFormData(initialFormData);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePaginationChange = (event, newPage) => {
    setPage(newPage - 1);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const fetchVisitors = async () => {
    setLoading(true);
    const token = localStorage.getItem("accessToken");
    try {
      const response = await fetch(
        "https://tdtlworld.com/hrms-backend/visitors/raw/",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const data = await response.json();
      setVisitors(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching visitor data:", error);
      Swal.fire({
        icon: "error",
        title: "Fetch Error",
        text: "Could not fetch visitor data.",
        timer: 3000,
        showConfirmButton: false,
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchDepartments = async () => {
    const token = localStorage.getItem("accessToken");
    try {
      const response = await fetch(
        "https://tdtlworld.com/hrms-backend/api/departments/dropdown/",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const data = await response.json();
      if (data.status === true && Array.isArray(data.data)) {
        setDepartments(data.data);
      } else {
        console.error("Failed to fetch departments:", data);
      }
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  };

  useEffect(() => {
    fetchVisitors();
    fetchDepartments();
  }, []);

  const handleSubmit = async () => {
    if (!formData.department || !formData.visitor_name || !formData.visit_date) {
      Swal.fire({
        icon: "warning",
        title: "Missing Information",
        text: "Please fill all required fields: Department, Visitor Name, and Visit Date.",
        timer: 3000,
        showConfirmButton: false,
      });
      return;
    }

    setIsSubmitting(true);
    const token = localStorage.getItem("accessToken");
    const now = new Date();
    const formattedDateTime = now.toISOString().slice(0, 19).replace("T", " ");

    const payload = {
      ...formData,
      company_id: 3,
      created_by: 3,
      created_at: formattedDateTime,
    };

    try {
      const response = await fetch(
        "https://tdtlworld.com/hrms-backend/visitors/",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to submit data");
      }

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Visitor added successfully!",
        timer: 3000,
        showConfirmButton: false,
      });

      await fetchVisitors();
      handleDialogClose();
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: error.message || "An unexpected error occurred.",
        timer: 3000,
        showConfirmButton: false,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredVisitors = useMemo(() => {
    if (!searchTerm) return visitors;
    return visitors.filter(
      (visitor) =>
        visitor.visitor_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        visitor.department_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        visitor.visit_purpose?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [visitors, searchTerm]);

  const startEntry = filteredVisitors.length > 0 ? page * rowsPerPage + 1 : 0;
  const endEntry = Math.min((page + 1) * rowsPerPage, filteredVisitors.length);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box component={Paper} p={3}>
        <Typography
          variant="h4"
          sx={{ color: primaryColor, fontWeight: "bold", mb: 4 }}
        >
          Visitor Book
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
            mb: 2,
          }}
        >
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={handleDialogOpen}
            sx={{
              backgroundColor: primaryColor,
              color: textOnPrimary,
              width: isMobile ? "100%" : "auto",
              "&:hover": { backgroundColor: primaryHoverColor },
            }}
          >
            Add New
          </Button>

          <TextField
            size="small"
            placeholder="Search ..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPage(0);
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{ width: isMobile ? "100%" : "auto" }}
          />
        </Box>

        <Dialog
          open={openDialog}
          onClose={handleDialogClose}
          fullWidth
          maxWidth="md"
        >
          <DialogTitle
            variant="h5"
            sx={{ color: primaryColor, fontWeight: "bold" }}
          >
            Add New Visitor
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth required>
                  <InputLabel>Department</InputLabel>
                  <Select
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    label="Department"
                  >
                    <MenuItem value="">
                      <em>Select Department</em>
                    </MenuItem>
                    {departments.map((dept) => (
                      <MenuItem
                        key={dept.department_id}
                        value={dept.department_id}
                      >
                        {dept.department_name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Visit Purpose"
                  name="visit_purpose"
                  value={formData.visit_purpose}
                  onChange={handleChange}
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Visitor Name"
                  name="visitor_name"
                  value={formData.visitor_name}
                  onChange={handleChange}
                  required
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Visit Date"
                  name="visit_date"
                  value={formData.visit_date}
                  onChange={handleChange}
                  required
                  fullWidth
                  type="date"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="In Time"
                  name="check_in"
                  value={formData.check_in}
                  onChange={handleChange}
                  required
                  fullWidth
                  type="time"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  fullWidth
                  type="email"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  fullWidth
                  multiline
                  rows={2}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  fullWidth
                  multiline
                  rows={2}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions sx={{ p: "16px 24px" }}>
            <Button
              onClick={handleDialogClose}
              sx={{
                color: "#757575",
                "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.04)" },
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={isSubmitting}
              sx={{
                backgroundColor: primaryColor,
                color: textOnPrimary,
                "&:hover": { backgroundColor: primaryHoverColor },
              }}
            >
              {isSubmitting ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Save"
              )}
            </Button>
          </DialogActions>
        </Dialog>

        <TableContainer>
          <Table sx={{ minWidth: "100%", whiteSpace: "nowrap" }}>
            <TableHead sx={{ backgroundColor: primaryColor }}>
              <TableRow>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>SR.NO</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>VISITOR NAME</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>DEPARTMENT</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>VISIT PURPOSE</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>PHONE</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>VISIT DATE</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>IN TIME</TableCell>
                <TableCell align="center" sx={{ color: "white", fontWeight: "bold" }}>ACTIONS</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                Array.from(new Array(rowsPerPage)).map((_, index) => (
                  <TableRow key={index}>
                    {[...Array(8)].map((_, i) => (
                      <TableCell key={i}>
                        <Skeleton variant="text" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : filteredVisitors.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} align="center">
                    No records available
                  </TableCell>
                </TableRow>
              ) : (
                filteredVisitors
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((visitor, index) => (
                    <TableRow
                      key={visitor.visitor_id}
                      sx={{ "&:hover": { backgroundColor: "#f5f5f5" } }}
                    >
                      <TableCell sx={{ fontSize: "0.95rem" }}>
                        {page * rowsPerPage + index + 1}
                      </TableCell>
                      <TableCell sx={{ fontSize: "0.95rem" }}>
                        {visitor.visitor_name}
                      </TableCell>
                      <TableCell sx={{ fontSize: "0.95rem" }}>
                        {visitor.department_name}
                      </TableCell>
                      <TableCell sx={{ fontSize: "0.95rem" }}>
                        {visitor.visit_purpose}
                      </TableCell>
                      <TableCell sx={{ fontSize: "0.95rem" }}>
                        {visitor.phone}
                      </TableCell>
                      <TableCell sx={{ fontSize: "0.95rem" }}>
                        {visitor.visit_date}
                      </TableCell>
                      <TableCell sx={{ fontSize: "0.95rem" }}>
                        {visitor.check_in}
                      </TableCell>
                      <TableCell>
                        <Box
                          display="flex"
                          justifyContent="center"
                          gap={0.5}
                        >
                          <IconButton
                            size="small"
                            sx={{ color: theme.palette.primary.main }}
                          >
                            <Edit fontSize="inherit" />
                          </IconButton>
                          <IconButton
                            size="small"
                            sx={{ color: theme.palette.error.main }}
                          >
                            <Delete fontSize="inherit" />
                          </IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <Box sx={{ p: 2, borderTop: "1px solid rgba(224, 224, 224, 1)" }}>
          {loading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Skeleton variant="text" width={200} />
              <Skeleton variant="rectangular" width={300} height={40} />
            </Box>
          ) : (
            filteredVisitors.length > 0 && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: 2,
                }}
              >
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 2 }}
                >
                  <FormControl variant="outlined" size="small">
                    <Select
                      value={rowsPerPage}
                      onChange={handleChangeRowsPerPage}
                      sx={{
                        backgroundColor: primaryColor,
                        color: "white",
                        borderRadius: "4px",
                        "&:hover": { backgroundColor: primaryHoverColor },
                        "& .MuiOutlinedInput-notchedOutline": {
                          border: "none",
                        },
                        "& .MuiSvgIcon-root": { color: "white" },
                      }}
                    >
                      {[5, 10, 15, 25].map((value) => (
                        <MenuItem key={value} value={value}>
                          {value}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <Typography variant="body2" color="text.secondary">
                    {`Showing ${startEntry} to ${endEntry} of ${filteredVisitors.length} results`}
                  </Typography>
                </Box>
                <Pagination
                  count={Math.ceil(filteredVisitors.length / rowsPerPage)}
                  page={page + 1}
                  onChange={handlePaginationChange}
                  showFirstButton
                  showLastButton
                  sx={{
                    "& .MuiPaginationItem-root:hover": {
                      backgroundColor: secondaryColor,
                      color: "white",
                    },
                    "& .MuiPaginationItem-page": {
                      color: primaryColor,
                      "&.Mui-selected": {
                        backgroundColor: primaryColor,
                        color: "white",
                        "&:hover": { backgroundColor: secondaryColor },
                      },
                    },
                    "& .MuiPaginationItem-icon": { color: primaryColor },
                  }}
                />
              </Box>
            )
          )}
        </Box>
      </Box>
    </LocalizationProvider>
  );
};

export default VisitorBook;