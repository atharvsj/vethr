// import React, { useState, useEffect } from "react";
// import {
//     Table,
//     TableBody,
//     TableCell,
//     TableContainer,
//     TableHead,
//     TableRow,
//     Paper,
//     Button,
//     TextField,
//     Dialog,
//     DialogActions,
//     DialogContent,
//     DialogTitle,
//     IconButton,
//     Select,
//     MenuItem,
//     InputLabel,
//     FormControl,
//     Box,
//     Typography,
// } from "@mui/material";
// import { Edit, Delete, Add } from "@mui/icons-material";
// import { styled } from "@mui/system";
// import Swal from "sweetalert2";
// import axiosInstance from "../../utils/axiosInstance"; // ✅ axios instance

// const VibrantPurpleButton = styled(Button)({
//     backgroundColor: "#8A2BE2",
//     color: "#fff",
//     marginLeft: "10px",
//     fontSize: "0.8rem",
//     padding: "4px 10px",
//     "&:hover": {
//         backgroundColor: "#9932CC",
//     },
// });

// const Role = () => {
//     const [roles, setRoles] = useState([]);
//     const [openForm, setOpenForm] = useState(false);
//     const [currentRole, setCurrentRole] = useState({ role_name: "" });
//     const [isEditing, setIsEditing] = useState(false);
//     const [page, setPage] = useState(0);
//     const [rowsPerPage, setRowsPerPage] = useState(5);
//     const [totalRoles, setTotalRoles] = useState(0);
//     const [searchTerm, setSearchTerm] = useState("");

//     useEffect(() => {
//         fetchRoles();
//     }, [page, rowsPerPage, searchTerm]);

//     // ✅ Fetch Roles from API
//     const fetchRoles = async () => {
//         try {
//             const res = await axiosInstance.get("api/staffrole/");
//             let data = res.data;

//             // Map API response -> match table keys
//             let formatted = data.map((r) => ({
//                 role_id: r.value,
//                 role_name: r.label,
//                 created_at: r.created_at,
//             }));

//             // Search filter
//             if (searchTerm) {
//                 formatted = formatted.filter((role) =>
//                     role.role_name.toLowerCase().includes(searchTerm.toLowerCase())
//                 );
//             }

//             setTotalRoles(formatted.length);

//             // Pagination
//             const startIndex = page * rowsPerPage;
//             const endIndex = startIndex + rowsPerPage;
//             setRoles(formatted.slice(startIndex, endIndex));
//         } catch (error) {
//             console.error("Error fetching roles:", error);
//             Swal.fire("Error", "Failed to fetch roles", "error");
//         }
//     };

//     const handleOpenForm = (role = { role_name: "" }) => {
//         setCurrentRole(role);
//         setIsEditing(!!role.role_id);
//         setOpenForm(true);
//     };

//     const handleCloseForm = () => {
//         setOpenForm(false);
//         setCurrentRole({ role_name: "" });
//     };

//     // ✅ Add or Update Role
//     const handleSubmit = async () => {
//         try {
//             if (isEditing) {
//                 await axiosInstance.patch(`api/staffrole/${currentRole.role_id}/`, {
//                     role_name: currentRole.role_name,
//                 });
//                 Swal.fire({
//                     icon: "success",
//                     title: "Role Updated",
//                     text: `Role "${currentRole.role_name}" has been updated successfully.`,
//                     timer: 2000,
//                     showConfirmButton: false,
//                 });
//             } else {
//                 await axiosInstance.post("api/staffrole/", {
//                     role_name: currentRole.role_name,
//                 });
//                 Swal.fire({
//                     icon: "success",
//                     title: "Role Added",
//                     text: `Role "${currentRole.role_name}" has been added successfully.`,
//                     timer: 2000,
//                     showConfirmButton: false,
//                 });
//             }
//             handleCloseForm();
//             fetchRoles();
//         } catch (error) {
//             console.error("Error saving role:", error);
//             Swal.fire("Error", "Failed to save role", "error");
//         }
//     };

//     // ✅ Delete Role
//     const handleDelete = (role) => {
//         Swal.fire({
//             title: "Are you sure?",
//             text: `You won't be able to revert deleting Role: ${role.role_name}`,
//             icon: "warning",
//             showCancelButton: true,
//             confirmButtonColor: "#8A2BE2",
//             cancelButtonColor: "#d33",
//             confirmButtonText: "Yes, delete it!",
//         }).then(async (result) => {
//             if (result.isConfirmed) {
//                 try {
//                     await axiosInstance.delete(`api/staffrole/${role.role_id}/`);
//                     Swal.fire({
//                         icon: "success",
//                         title: "Deleted!",
//                         text: `Role "${role.role_name}" has been deleted.`,
//                         timer: 2000,
//                         showConfirmButton: false,
//                     });
//                     fetchRoles();
//                 } catch (error) {
//                     console.error("Error deleting role:", error);
//                     Swal.fire("Error", "Failed to delete role", "error");
//                 }
//             }
//         });
//     };

//     // ✅ Format Date (Month Name, Day, Year)
//     const formatDate = (dateString) => {
//         if (!dateString) return "";
//         const date = new Date(dateString);
//         return date.toLocaleDateString("en-US", {
//             year: "numeric",
//             month: "long",
//             day: "numeric",
//         });
//     };

//     return (
//         <Box sx={{ p: 2, maxWidth: "95%", mx: "auto" }}>
//             <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
//                 Roles List
//             </Typography>

//             {/* Top Action Buttons */}
//             <Box display="flex" justifyContent="flex-end" mb={2}>
//                 <VibrantPurpleButton
//                     variant="contained"
//                     startIcon={<Add />}
//                     onClick={() => handleOpenForm()}
//                 >
//                     Add Role
//                 </VibrantPurpleButton>
//             </Box>

//             {/* Search + Rows per page */}
//             <Box display="flex" justifyContent="space-between" mb={2}>
//                 <FormControl size="small" sx={{ minWidth: 90 }}>
//                     <InputLabel id="rows-per-page-label">Rows</InputLabel>
//                     <Select
//                         labelId="rows-per-page-label"
//                         value={rowsPerPage}
//                         onChange={(e) => {
//                             setRowsPerPage(e.target.value);
//                             setPage(0);
//                         }}
//                         sx={{ fontSize: "0.85rem", height: 36 }}
//                     >
//                         <MenuItem value={5}>5</MenuItem>
//                         <MenuItem value={10}>10</MenuItem>
//                         <MenuItem value={25}>25</MenuItem>
//                     </Select>
//                 </FormControl>

//                 <TextField
//                     placeholder="Search by Role Name"
//                     variant="outlined"
//                     size="small"
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     sx={{ width: "240px" }}
//                 />
//             </Box>

//             {/* Table */}
//             <TableContainer component={Paper}>
//                 <Table size="small">
//                     <TableHead sx={{ backgroundColor: "#c7c6c67c" }}>
//                         <TableRow>
//                             <TableCell sx={{ fontWeight: "bold" }}>SR. NO.</TableCell>
//                             <TableCell sx={{ fontWeight: "bold" }}>Role ID</TableCell>
//                             <TableCell sx={{ fontWeight: "bold" }}>Role Name</TableCell>
//                             <TableCell sx={{ fontWeight: "bold" }}>Created At</TableCell>
//                             <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {roles.map((role, index) => (
//                             <TableRow key={role.role_id}>
//                                 <TableCell>{page * rowsPerPage + index + 1}</TableCell>
//                                 <TableCell>{role.role_id}</TableCell>
//                                 <TableCell>{role.role_name}</TableCell>
//                                 <TableCell>{formatDate(role.created_at)}</TableCell>
//                                 <TableCell>
//                                     <IconButton
//                                         size="small"
//                                         color="primary"
//                                         onClick={() => handleOpenForm(role)}
//                                     >
//                                         <Edit fontSize="small" />
//                                     </IconButton>
//                                     <IconButton
//                                         size="small"
//                                         color="error"
//                                         onClick={() => handleDelete(role)}
//                                     >
//                                         <Delete fontSize="small" />
//                                     </IconButton>
//                                 </TableCell>
//                             </TableRow>
//                         ))}
//                         {roles.length === 0 && (
//                             <TableRow>
//                                 <TableCell colSpan={5} align="center">
//                                     No roles found.
//                                 </TableCell>
//                             </TableRow>
//                         )}
//                     </TableBody>
//                 </Table>
//             </TableContainer>

//             {/* Custom Pagination */}
//             <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
//                 <Typography fontSize="0.9rem">
//                     Showing <b>{page * rowsPerPage + 1}</b> -{" "}
//                     <b>{Math.min((page + 1) * rowsPerPage, totalRoles)}</b> rows of{" "}
//                     <b>{totalRoles}</b> Roles
//                 </Typography>

//                 <Box display="flex" alignItems="center">
//                     <Button
//                         variant="contained"
//                         size="small"
//                         disabled={page === 0}
//                         onClick={() => setPage((prev) => prev - 1)}
//                         sx={{
//                             backgroundColor: page === 0 ? "#e0e0e0" : "#8A2BE2",
//                             color: page === 0 ? "#888" : "#fff",
//                             "&:hover": { backgroundColor: page === 0 ? "#e0e0e0" : "#9932CC" },
//                             mr: 1,
//                             fontSize: "0.75rem",
//                             padding: "2px 8px",
//                         }}
//                     >
//                         PREVIOUS
//                     </Button>

//                     <Typography sx={{ mx: 1, fontSize: "0.85rem" }}>
//                         Page {page + 1}
//                     </Typography>

//                     <Button
//                         variant="contained"
//                         size="small"
//                         disabled={(page + 1) * rowsPerPage >= totalRoles}
//                         onClick={() => setPage((prev) => prev + 1)}
//                         sx={{
//                             backgroundColor: "#8A2BE2",
//                             color: "#fff",
//                             "&:hover": { backgroundColor: "#9932CC" },
//                             fontSize: "0.75rem",
//                             padding: "2px 8px",
//                         }}
//                     >
//                         NEXT
//                     </Button>
//                 </Box>
//             </Box>

//             {/* Add/Edit Role Form */}
//             <Dialog open={openForm} onClose={handleCloseForm} fullWidth maxWidth="xs">
//                 <DialogTitle>{isEditing ? "Edit Role" : "Add Role"}</DialogTitle>
//                 <DialogContent>
//                     <TextField
//                         autoFocus
//                         margin="dense"
//                         label="Role Name"
//                         type="text"
//                         fullWidth
//                         value={currentRole.role_name}
//                         onChange={(e) =>
//                             setCurrentRole({ ...currentRole, role_name: e.target.value })
//                         }
//                     />
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={handleCloseForm} sx={{ color: "red" }}>
//                         Cancel
//                     </Button>
//                     <VibrantPurpleButton onClick={handleSubmit}>Save</VibrantPurpleButton>
//                 </DialogActions>
//             </Dialog>
//         </Box>
//     );
// };

// export default Role;






// import React, { useState, useEffect } from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Button,
//   TextField,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   IconButton,
//   Select,
//   MenuItem,
//   InputLabel,
//   FormControl,
//   Box,
//   Typography,
// } from "@mui/material";
// import { Edit, Delete, Add } from "@mui/icons-material";
// import { styled } from "@mui/system";
// import Swal from "sweetalert2";
// import axiosInstance from "../../utils/axiosInstance"; // ✅ axios instance

// const VibrantPurpleButton = styled(Button)({
//   backgroundColor: "#8A2BE2",
//   color: "#fff",
//   marginLeft: "10px",
//   fontSize: "0.8rem",
//   padding: "4px 10px",
//   "&:hover": {
//     backgroundColor: "#9932CC",
//   },
// });

// // Styled table cells to prevent overflow
// const StyledTableCell = styled(TableCell)({
//   wordBreak: "break-word",
//   whiteSpace: "normal",
//   maxWidth: "200px",
// });

// const Role = () => {
//   const [roles, setRoles] = useState([]);
//   const [openForm, setOpenForm] = useState(false);
//   const [currentRole, setCurrentRole] = useState({ role_name: "" });
//   const [isEditing, setIsEditing] = useState(false);
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);
//   const [totalRoles, setTotalRoles] = useState(0);
//   const [searchTerm, setSearchTerm] = useState("");

//   useEffect(() => {
//     fetchRoles();
//   }, [page, rowsPerPage, searchTerm]);

//   // ✅ Fetch Roles from API
//   const fetchRoles = async () => {
//     try {
//       const res = await axiosInstance.get("api/staffrole/");
//       let data = res.data;

//       // Map API response -> match table keys
//       let formatted = data.map((r) => ({
//         role_id: r.value,
//         role_name: r.label,
//         created_at: r.created_at,
//       }));

//       // Search filter
//       if (searchTerm) {
//         formatted = formatted.filter((role) =>
//           role.role_name.toLowerCase().includes(searchTerm.toLowerCase())
//         );
//       }

//       setTotalRoles(formatted.length);

//       // Pagination
//       const startIndex = page * rowsPerPage;
//       const endIndex = startIndex + rowsPerPage;
//       setRoles(formatted.slice(startIndex, endIndex));
//     } catch (error) {
//       console.error("Error fetching roles:", error);
//       Swal.fire("Error", "Failed to fetch roles", "error");
//     }
//   };

//   const handleOpenForm = (role = { role_name: "" }) => {
//     setCurrentRole(role);
//     setIsEditing(!!role.role_id);
//     setOpenForm(true);
//   };

//   const handleCloseForm = () => {
//     setOpenForm(false);
//     setCurrentRole({ role_name: "" });
//   };

//   // ✅ Add or Update Role
//   const handleSubmit = async () => {
//     try {
//       if (isEditing) {
//         await axiosInstance.patch(`api/staffrole/${currentRole.role_id}/`, {
//           role_name: currentRole.role_name,
//         });
//         Swal.fire({
//           icon: "success",
//           title: "Role Updated",
//           text: `Role "${currentRole.role_name}" has been updated successfully.`,
//           timer: 2000,
//           showConfirmButton: false,
//         });
//       } else {
//         await axiosInstance.post("api/staffrole/", {
//           role_name: currentRole.role_name,
//         });
//         Swal.fire({
//           icon: "success",
//           title: "Role Added",
//           text: `Role "${currentRole.role_name}" has been added successfully.`,
//           timer: 2000,
//           showConfirmButton: false,
//         });
//       }
//       handleCloseForm();
//       fetchRoles();
//     } catch (error) {
//       console.error("Error saving role:", error);
//       Swal.fire("Error", "Failed to save role", "error");
//     }
//   };

//   // ✅ Delete Role
//   const handleDelete = (role) => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: `You won't be able to revert deleting Role: ${role.role_name}`,
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#8A2BE2",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, delete it!",
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         try {
//           await axiosInstance.delete(`api/staffrole/${role.role_id}/`);
//           Swal.fire({
//             icon: "success",
//             title: "Deleted!",
//             text: `Role "${role.role_name}" has been deleted.`,
//             timer: 2000,
//             showConfirmButton: false,
//           });
//           fetchRoles();
//         } catch (error) {
//           console.error("Error deleting role:", error);
//           Swal.fire("Error", "Failed to delete role", "error");
//         }
//       }
//     });
//   };

//   // ✅ Format Date (Month Name, Day, Year)
//   const formatDate = (dateString) => {
//     if (!dateString) return "";
//     const date = new Date(dateString);
//     return date.toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//     });
//   };

//   return (
//     <Box
//       sx={{
//         p: 2,
//         width: "100%",
//         maxWidth: { xs: "100%", md: "1200px" },
//         mx: "auto",
//       }}
//     >
//       <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
//         Roles List
//       </Typography>

//       {/* Top Action Buttons */}
//       <Box display="flex" justifyContent="flex-end" mb={2}>
//         <VibrantPurpleButton
//           variant="contained"
//           startIcon={<Add />}
//           onClick={() => handleOpenForm()}
//         >
//           Add Role
//         </VibrantPurpleButton>
//       </Box>

//       {/* Search + Rows per page */}
//       <Box
//         display="flex"
//         justifyContent="space-between"
//         mb={2}
//         flexWrap="wrap"
//         gap={2}
//       >
//         <FormControl size="small" sx={{ minWidth: 90 }}>
//           <InputLabel id="rows-per-page-label">Rows</InputLabel>
//           <Select
//             labelId="rows-per-page-label"
//             value={rowsPerPage}
//             onChange={(e) => {
//               setRowsPerPage(e.target.value);
//               setPage(0);
//             }}
//             sx={{ fontSize: "0.85rem", height: 36 }}
//           >
//             <MenuItem value={5}>5</MenuItem>
//             <MenuItem value={10}>10</MenuItem>
//             <MenuItem value={25}>25</MenuItem>
//           </Select>
//         </FormControl>

//         <TextField
//           placeholder="Search by Role Name"
//           variant="outlined"
//           size="small"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           sx={{ width: "240px" }}
//         />
//       </Box>

//       {/* Table */}
//       <TableContainer
//         component={Paper}
//         sx={{ width: "100%", overflowX: "auto" }}
//       >
//         <Table size="small" sx={{ tableLayout: "fixed", width: "100%" }}>
//           <TableHead sx={{ backgroundColor: "#c7c6c67c" }}>
//             <TableRow>
//               <StyledTableCell sx={{ fontWeight: "bold" }}>
//                 SR. NO.
//               </StyledTableCell>
//               <StyledTableCell sx={{ fontWeight: "bold" }}>
//                 Role ID
//               </StyledTableCell>
//               <StyledTableCell sx={{ fontWeight: "bold" }}>
//                 Role Name
//               </StyledTableCell>
//               <StyledTableCell sx={{ fontWeight: "bold" }}>
//                 Created At
//               </StyledTableCell>
//               <StyledTableCell sx={{ fontWeight: "bold" }}>
//                 Actions
//               </StyledTableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {roles.map((role, index) => (
//               <TableRow key={role.role_id}>
//                 <StyledTableCell>
//                   {page * rowsPerPage + index + 1}
//                 </StyledTableCell>
//                 <StyledTableCell>{role.role_id}</StyledTableCell>
//                 <StyledTableCell>{role.role_name}</StyledTableCell>
//                 <StyledTableCell>{formatDate(role.created_at)}</StyledTableCell>
//                 <StyledTableCell>
//                   <IconButton
//                     size="small"
//                     color="primary"
//                     onClick={() => handleOpenForm(role)}
//                   >
//                     <Edit fontSize="small" />
//                   </IconButton>
//                   <IconButton
//                     size="small"
//                     color="error"
//                     onClick={() => handleDelete(role)}
//                   >
//                     <Delete fontSize="small" />
//                   </IconButton>
//                 </StyledTableCell>
//               </TableRow>
//             ))}
//             {roles.length === 0 && (
//               <TableRow>
//                 <StyledTableCell colSpan={5} align="center">
//                   No roles found.
//                 </StyledTableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       {/* Custom Pagination */}
//       <Box
//         display="flex"
//         justifyContent="space-between"
//         alignItems="center"
//         mt={2}
//         flexWrap="wrap"
//         gap={2}
//       >
//         <Typography fontSize="0.9rem">
//           Showing <b>{page * rowsPerPage + 1}</b> -{" "}
//           <b>{Math.min((page + 1) * rowsPerPage, totalRoles)}</b> rows of{" "}
//           <b>{totalRoles}</b> Roles
//         </Typography>

//         <Box display="flex" alignItems="center" flexWrap="wrap" gap={1}>
//           <Button
//             variant="contained"
//             size="small"
//             disabled={page === 0}
//             onClick={() => setPage((prev) => prev - 1)}
//             sx={{
//               backgroundColor: page === 0 ? "#e0e0e0" : "#8A2BE2",
//               color: page === 0 ? "#888" : "#fff",
//               "&:hover": {
//                 backgroundColor: page === 0 ? "#e0e0e0" : "#9932CC",
//               },
//               fontSize: "0.75rem",
//               padding: "2px 8px",
//             }}
//           >
//             PREVIOUS
//           </Button>

//           <Typography sx={{ mx: 1, fontSize: "0.85rem" }}>
//             Page {page + 1}
//           </Typography>

//           <Button
//             variant="contained"
//             size="small"
//             disabled={(page + 1) * rowsPerPage >= totalRoles}
//             onClick={() => setPage((prev) => prev + 1)}
//             sx={{
//               backgroundColor:
//                 (page + 1) * rowsPerPage >= totalRoles ? "#e0e0e0" : "#8A2BE2",
//               color: (page + 1) * rowsPerPage >= totalRoles ? "#888" : "#fff",
//               "&:hover": { backgroundColor: "#9932CC" },
//               fontSize: "0.75rem",
//               padding: "2px 8px",
//             }}
//           >
//             NEXT
//           </Button>
//         </Box>
//       </Box>

//       {/* Add/Edit Role Form */}
//       <Dialog open={openForm} onClose={handleCloseForm} fullWidth maxWidth="xs">
//         <DialogTitle>{isEditing ? "Edit Role" : "Add Role"}</DialogTitle>
//         <DialogContent>
//           <TextField
//             autoFocus
//             margin="dense"
//             label="Role Name"
//             type="text"
//             fullWidth
//             value={currentRole.role_name}
//             onChange={(e) =>
//               setCurrentRole({ ...currentRole, role_name: e.target.value })
//             }
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseForm} sx={{ color: "red" }}>
//             Cancel
//           </Button>
//           <VibrantPurpleButton onClick={handleSubmit}>Save</VibrantPurpleButton>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// };

// export default Role;










// import React, { useState, useEffect } from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Button,
//   TextField,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   IconButton,
//   Select,
//   MenuItem,
//   InputLabel,
//   FormControl,
//   Box,
//   Typography,
// } from "@mui/material";
// import { Edit, Delete, Add } from "@mui/icons-material";
// import { styled } from "@mui/system";
// import Swal from "sweetalert2";
// import axiosInstance from "../../utils/axiosInstance"; // ✅ axios instance

// // --- Color Palette for Standardization ---
// const THEME_PURPLE = "#8C257C";
// const THEME_ORANGE = "#F58E35";
// const THEME_PURPLE_HOVER = "#701d63"; // A darker shade for hover effects

// // --- Styled Components ---

// // Primary button using the new purple theme color
// const PrimaryButton = styled(Button)(({ theme }) => ({
//   backgroundColor: THEME_PURPLE,
//   color: "#fff",
//   "&:hover": {
//     backgroundColor: THEME_PURPLE_HOVER,
//   },
// }));

// // Styled table cells to prevent text overflow
// const StyledTableCell = styled(TableCell)({
//   wordBreak: "break-word",
//   whiteSpace: "normal",
//   maxWidth: "200px",
// });

// const Role = () => {
//   const [roles, setRoles] = useState([]);
//   const [openForm, setOpenForm] = useState(false);
//   const [currentRole, setCurrentRole] = useState({ role_name: "" });
//   const [isEditing, setIsEditing] = useState(false);
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10); // ✅ Default rows set to 10
//   const [totalRoles, setTotalRoles] = useState(0);
//   const [searchTerm, setSearchTerm] = useState("");

//   useEffect(() => {
//     fetchRoles();
//   }, [page, rowsPerPage, searchTerm]);

//   // ✅ Fetch Roles from API
//   const fetchRoles = async () => {
//     try {
//       const res = await axiosInstance.get("api/staffrole/");
//       let data = res.data;

//       let formatted = data.map((r) => ({
//         role_id: r.value,
//         role_name: r.label,
//         created_at: r.created_at,
//       }));

//       if (searchTerm) {
//         formatted = formatted.filter((role) =>
//           role.role_name.toLowerCase().includes(searchTerm.toLowerCase())
//         );
//       }

//       setTotalRoles(formatted.length);

//       const startIndex = page * rowsPerPage;
//       const endIndex = startIndex + rowsPerPage;
//       setRoles(formatted.slice(startIndex, endIndex));
//     } catch (error) {
//       console.error("Error fetching roles:", error);
//       Swal.fire("Error", "Failed to fetch roles", "error");
//     }
//   };

//   const handleOpenForm = (role = { role_name: "" }) => {
//     setCurrentRole(role);
//     setIsEditing(!!role.role_id);
//     setOpenForm(true);
//   };

//   const handleCloseForm = () => {
//     setOpenForm(false);
//     setCurrentRole({ role_name: "" });
//   };

//   // ✅ Add or Update Role
//   const handleSubmit = async () => {
//     try {
//       if (isEditing) {
//         await axiosInstance.patch(`api/staffrole/${currentRole.role_id}/`, {
//           role_name: currentRole.role_name,
//         });
//         Swal.fire({
//           icon: "success",
//           title: "Role Updated",
//           text: `Role "${currentRole.role_name}" has been updated successfully.`,
//           timer: 2000,
//           showConfirmButton: false,
//         });
//       } else {
//         await axiosInstance.post("api/staffrole/", {
//           role_name: currentRole.role_name,
//         });
//         Swal.fire({
//           icon: "success",
//           title: "Role Added",
//           text: `Role "${currentRole.role_name}" has been added successfully.`,
//           timer: 2000,
//           showConfirmButton: false,
//         });
//       }
//       handleCloseForm();
//       fetchRoles();
//     } catch (error) {
//       console.error("Error saving role:", error);
//       Swal.fire("Error", "Failed to save role", "error");
//     }
//   };

//   // ✅ Delete Role
//   const handleDelete = (role) => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: `You won't be able to revert deleting Role: ${role.role_name}`,
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: THEME_PURPLE,
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, delete it!",
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         try {
//           await axiosInstance.delete(`api/staffrole/${role.role_id}/`);
//           Swal.fire({
//             icon: "success",
//             title: "Deleted!",
//             text: `Role "${role.role_name}" has been deleted.`,
//             timer: 2000,
//             showConfirmButton: false,
//           });
//           fetchRoles();
//         } catch (error) {
//           console.error("Error deleting role:", error);
//           Swal.fire("Error", "Failed to delete role", "error");
//         }
//       }
//     });
//   };

//   // ✅ Format Date (Month Name, Day, Year)
//   const formatDate = (dateString) => {
//     if (!dateString) return "";
//     const date = new Date(dateString);
//     return date.toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//     });
//   };

//   const handleRowsPerPageChange = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   return (
//     <Box sx={{ p: 3, width: "100%" }}>
//       <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", color: "#8C257C ", mb: 5}}>
//         Create Roles 
//       </Typography>

//       {/* --- Top Bar: Add Button and Search --- */}
//       <Box
//         display="flex"
//         justifyContent="space-between"
//         alignItems="center"
//         mb={2}
//         flexWrap="wrap"
//         gap={2}
//       >
//         <PrimaryButton
//           variant="contained"
//           startIcon={<Add />}
//           onClick={() => handleOpenForm()}
//         >
//           Add Role
//         </PrimaryButton>
//         <TextField
//           placeholder="Search by Role Name..."
//           variant="outlined"
//           size="small"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           sx={{ width: { xs: "100%", sm: "250px" } }}
//         />
//       </Box>

//       {/* --- Table --- */}
//       <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
//         <Table size="small">
//           <TableHead sx={{ backgroundColor: THEME_PURPLE }}>
//             <TableRow>
//               <StyledTableCell sx={{ color: "white", fontWeight: "bold" }}>
//                 SR. NO.
//               </StyledTableCell>
//               <StyledTableCell sx={{ color: "white", fontWeight: "bold" }}>
//                 ROLE ID
//               </StyledTableCell>
//               <StyledTableCell sx={{ color: "white", fontWeight: "bold" }}>
//                 ROLE NAME
//               </StyledTableCell>
//               <StyledTableCell sx={{ color: "white", fontWeight: "bold" }}>
//                 CREATED AT
//               </StyledTableCell>
//               <StyledTableCell sx={{ color: "white", fontWeight: "bold" }}>
//                 ACTIONS
//               </StyledTableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {roles.map((role, index) => (
//               <TableRow
//                 key={role.role_id}
//                 sx={{ "&:nth-of-type(odd)": { backgroundColor: "#f9f9f9" } }}
//               >
//                 <StyledTableCell>
//                   {page * rowsPerPage + index + 1}
//                 </StyledTableCell>
//                 <StyledTableCell>{role.role_id}</StyledTableCell>
//                 <StyledTableCell>{role.role_name}</StyledTableCell>
//                 <StyledTableCell>{formatDate(role.created_at)}</StyledTableCell>
//                 <StyledTableCell>
//                   <IconButton
//                     size="small"
//                     color="primary"
//                     onClick={() => handleOpenForm(role)}
//                   >
//                     <Edit fontSize="small" />
//                   </IconButton>
//                   <IconButton
//                     size="small"
//                     color="error"
//                     onClick={() => handleDelete(role)}
//                   >
//                     <Delete fontSize="small" />
//                   </IconButton>
//                 </StyledTableCell>
//               </TableRow>
//             ))}
//             {roles.length === 0 && (
//               <TableRow>
//                 <StyledTableCell colSpan={5} align="center">
//                   No roles found.
//                 </StyledTableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       {/* --- Bottom Bar: Total Rows and Pagination --- */}
//       <Box
//         display="flex"
//         justifyContent="space-between"
//         alignItems="center"
//         mt={2}
//         flexWrap="wrap"
//         gap={2}
//       >
//         {/* Left Side: Total Rows Info */}
//         <Typography variant="body2" color="text.secondary">
//           Showing{" "}
//           <b>{roles.length > 0 ? page * rowsPerPage + 1 : 0}</b> to{" "}
//           <b>{Math.min((page + 1) * rowsPerPage, totalRoles)}</b> of{" "}
//           <b>{totalRoles}</b> results
//         </Typography>

//         {/* Right Side: Pagination Controls */}
//         <Box display="flex" alignItems="center" gap={2}>
//           <FormControl size="small" sx={{ minWidth: 80 }}>
//             <InputLabel id="rows-per-page-label">Rows</InputLabel>
//             <Select
//               labelId="rows-per-page-label"
//               value={rowsPerPage}
//               label="Rows"
//               onChange={handleRowsPerPageChange}
//             >
//               <MenuItem value={5}>5</MenuItem>
//               <MenuItem value={10}>10</MenuItem>
//               <MenuItem value={25}>25</MenuItem>
//             </Select>
//           </FormControl>

//           <Box display="flex" alignItems="center" gap={1}>
//             <Button
//               size="small"
//               onClick={() => setPage(page - 1)}
//               disabled={page === 0}
//             >
//               Previous
//             </Button>
//             <Typography variant="body2">
//               Page {page + 1}
//             </Typography>
//             <Button
//               size="small"
//               onClick={() => setPage(page + 1)}
//               disabled={(page + 1) * rowsPerPage >= totalRoles}
//             >
//               Next
//             </Button>
//           </Box>
//         </Box>
//       </Box>

//       {/* --- Add/Edit Role Dialog Form --- */}
//       <Dialog open={openForm} onClose={handleCloseForm} fullWidth maxWidth="xs">
//         <DialogTitle sx={{ color: '#8C257C' , fontWeight: "bold", fontSize: '2rem' }} >
//           {isEditing ? "Edit Role" : "Add Role"}</DialogTitle>
//         <DialogContent>
//           <TextField
//             autoFocus
//             margin="dense"
//             label="Role Name"
//             type="text"
//             fullWidth
//             value={currentRole.role_name}
//             onChange={(e) =>
//               setCurrentRole({ ...currentRole, role_name: e.target.value })
//             }
//           />
//         </DialogContent>
//         <DialogActions sx={{ p: "16px 24px" }}>
//           <Button onClick={handleCloseForm} sx={{ color: THEME_ORANGE }}>
//             Cancel
//           </Button>
//           <PrimaryButton onClick={handleSubmit} variant="contained">
//             Save
//           </PrimaryButton>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// };

// export default Role;




// import React, { useState, useEffect } from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Button,
//   TextField,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   IconButton,
//   Select,
//   MenuItem,
//   InputLabel,
//   FormControl,
//   Box,
//   Typography,
//   Pagination, // Added import
//   Skeleton,   // Added import
// } from "@mui/material";
// import { Edit, Delete, Add } from "@mui/icons-material";
// import { styled } from "@mui/system";
// import Swal from "sweetalert2";
// import axiosInstance from "../../utils/axiosInstance"; // ✅ axios instance

// // --- Color Palette for Standardization ---
// const THEME_PURPLE = "#8C257C";
// const THEME_ORANGE = "#F58E35";
// const THEME_PURPLE_HOVER = "#701d63"; // A darker shade for hover effects

// // --- Styled Components ---
// const PrimaryButton = styled(Button)(({ theme }) => ({
//   backgroundColor: THEME_PURPLE,
//   color: "#fff",
//   "&:hover": {
//     backgroundColor: THEME_PURPLE_HOVER,
//   },
// }));

// const StyledTableCell = styled(TableCell)({
//   wordBreak: "break-word",
//   whiteSpace: "normal",
//   maxWidth: "200px",
// });

// const Role = () => {
//   const [roles, setRoles] = useState([]);
//   const [openForm, setOpenForm] = useState(false);
//   const [currentRole, setCurrentRole] = useState({ role_name: "" });
//   const [isEditing, setIsEditing] = useState(false);
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [totalRoles, setTotalRoles] = useState(0);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [loading, setLoading] = useState(true); // Added loading state

//   useEffect(() => {
//     fetchRoles();
//   }, [page, rowsPerPage, searchTerm]);

//   const fetchRoles = async () => {
//     setLoading(true);
//     try {
//       const res = await axiosInstance.get("api/staffrole/");
//       let data = res.data;

//       let formatted = data.map((r) => ({
//         role_id: r.value,
//         role_name: r.label,
//         created_at: r.created_at,
//       }));

//       if (searchTerm) {
//         formatted = formatted.filter((role) =>
//           role.role_name.toLowerCase().includes(searchTerm.toLowerCase())
//         );
//       }

//       setTotalRoles(formatted.length);

//       const startIndex = page * rowsPerPage;
//       const endIndex = startIndex + rowsPerPage;
//       setRoles(formatted.slice(startIndex, endIndex));
//     } catch (error) {
//       console.error("Error fetching roles:", error);
//       Swal.fire("Error", "Failed to fetch roles", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleOpenForm = (role = { role_name: "" }) => {
//     // ... (function remains the same)
//     setCurrentRole(role);
//     setIsEditing(!!role.role_id);
//     setOpenForm(true);
//   };

//   const handleCloseForm = () => {
//     // ... (function remains the same)
//     setOpenForm(false);
//     setCurrentRole({ role_name: "" });
//   };

//   const handleSubmit = async () => {
//     // ... (function remains the same)
//     try {
//       if (isEditing) {
//         await axiosInstance.patch(`api/staffrole/${currentRole.role_id}/`, {
//           role_name: currentRole.role_name,
//         });
//         Swal.fire({
//           icon: "success",
//           title: "Role Updated",
//           text: `Role "${currentRole.role_name}" has been updated successfully.`,
//           timer: 2000,
//           showConfirmButton: false,
//         });
//       } else {
//         await axiosInstance.post("api/staffrole/", {
//           role_name: currentRole.role_name,
//         });
//         Swal.fire({
//           icon: "success",
//           title: "Role Added",
//           text: `Role "${currentRole.role_name}" has been added successfully.`,
//           timer: 2000,
//           showConfirmButton: false,
//         });
//       }
//       handleCloseForm();
//       fetchRoles();
//     } catch (error) {
//       console.error("Error saving role:", error);
//       Swal.fire("Error", "Failed to save role", "error");
//     }
//   };

//   const handleDelete = (role) => {
//     // ... (function remains the same)
//     Swal.fire({
//       title: "Are you sure?",
//       text: `You won't be able to revert deleting Role: ${role.role_name}`,
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: THEME_PURPLE,
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, delete it!",
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         try {
//           await axiosInstance.delete(`api/staffrole/${role.role_id}/`);
//           Swal.fire({
//             icon: "success",
//             title: "Deleted!",
//             text: `Role "${role.role_name}" has been deleted.`,
//             timer: 2000,
//             showConfirmButton: false,
//           });
//           fetchRoles();
//         } catch (error) {
//           console.error("Error deleting role:", error);
//           Swal.fire("Error", "Failed to delete role", "error");
//         }
//       }
//     });
//   };

//   const formatDate = (dateString) => {
//     // ... (function remains the same)
//     if (!dateString) return "";
//     const date = new Date(dateString);
//     return date.toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//     });
//   };

//   const handlePaginationChange = (event, newPage) => {
//     setPage(newPage - 1);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };
  
//   const startEntry = roles.length > 0 ? page * rowsPerPage + 1 : 0;
//   const endEntry = Math.min((page + 1) * rowsPerPage, totalRoles);

//   return (
//     <Box sx={{ p: 3, width: "100%" }}>
//       <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", color: "#8C257C ", mb: 5}}>
//         Create Roles 
//       </Typography>

//       {/* --- Top Bar: Add Button and Search --- */}
//       <Box
//         display="flex"
//         justifyContent="space-between"
//         alignItems="center"
//         mb={2}
//         flexWrap="wrap"
//         gap={2}
//       >
//         <PrimaryButton
//           variant="contained"
//           startIcon={<Add />}
//           onClick={() => handleOpenForm()}
//         >
//           Add Role
//         </PrimaryButton>
//         <TextField
//           placeholder="Search by Role Name..."
//           variant="outlined"
//           size="small"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           sx={{ width: { xs: "100%", sm: "250px" } }}
//         />
//       </Box>

//       {/* --- Table --- */}
//       <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
//         <Table size="small">
//           <TableHead sx={{ backgroundColor: THEME_PURPLE }}>
//             <TableRow>
//               <StyledTableCell sx={{ color: "white", fontWeight: "bold" }}>
//                 SR. NO.
//               </StyledTableCell>
//               <StyledTableCell sx={{ color: "white", fontWeight: "bold" }}>
//                 ROLE ID
//               </StyledTableCell>
//               <StyledTableCell sx={{ color: "white", fontWeight: "bold" }}>
//                 ROLE NAME
//               </StyledTableCell>
//               <StyledTableCell sx={{ color: "white", fontWeight: "bold" }}>
//                 CREATED AT
//               </StyledTableCell>
//               <StyledTableCell sx={{ color: "white", fontWeight: "bold" }}>
//                 ACTIONS
//               </StyledTableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {loading ? (
//               Array.from(new Array(rowsPerPage)).map((_, index) => (
//                 <TableRow key={index}>
//                   <StyledTableCell colSpan={5}><Skeleton /></StyledTableCell>
//                 </TableRow>
//               ))
//             ) : roles.length > 0 ? (
//               roles.map((role, index) => (
//                 <TableRow
//                   key={role.role_id}
//                   sx={{ "&:nth-of-type(odd)": { backgroundColor: "#f9f9f9" } }}
//                 >
//                   <StyledTableCell>
//                     {page * rowsPerPage + index + 1}
//                   </StyledTableCell>
//                   <StyledTableCell>{role.role_id}</StyledTableCell>
//                   <StyledTableCell>{role.role_name}</StyledTableCell>
//                   <StyledTableCell>{formatDate(role.created_at)}</StyledTableCell>
//                   <StyledTableCell>
//                     <IconButton
//                       size="small"
//                       color="primary"
//                       onClick={() => handleOpenForm(role)}
//                     >
//                       <Edit fontSize="small" />
//                     </IconButton>
//                     <IconButton
//                       size="small"
//                       color="error"
//                       onClick={() => handleDelete(role)}
//                     >
//                       <Delete fontSize="small" />
//                     </IconButton>
//                   </StyledTableCell>
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <StyledTableCell colSpan={5} align="center">
//                   No roles found.
//                 </StyledTableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       {/* --- START: New Styled Pagination --- */}
//       <Box sx={{ p: 2, borderTop: '1px solid rgba(224, 224, 224, 1)' }}>
//           {loading ? (
//               <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                   <Skeleton variant="text" width={200} />
//                   <Skeleton variant="rectangular" width={300} height={40} />
//               </Box>
//           ) : (
//               <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
//                   <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//                       <FormControl variant="outlined" size="small">
//                           <Select
//                               value={rowsPerPage}
//                               onChange={handleChangeRowsPerPage}
//                               sx={{
//                                   backgroundColor: THEME_PURPLE,
//                                   color: 'white',
//                                   borderRadius: '4px',
//                                   transition: 'background-color 0.3s',
//                                   '&:hover': {
//                                       backgroundColor: THEME_PURPLE_HOVER,
//                                   },
//                                   '& .MuiOutlinedInput-notchedOutline': {
//                                       border: 'none',
//                                   },
//                                   '& .MuiSvgIcon-root': {
//                                       color: 'white',
//                                   },
//                               }}
//                           >
//                               {[5, 10, 15, 25].map((value) => (
//                                   <MenuItem key={value} value={value}>{value}</MenuItem>
//                               ))}
//                           </Select>
//                       </FormControl>
//                       <Typography variant="body2" color="text.secondary">
//                          {`Showing ${startEntry} to ${endEntry} of ${totalRoles} results`}
//                       </Typography>
//                   </Box>
//                   <Pagination
//                       count={Math.ceil(totalRoles / rowsPerPage)}
//                       page={page + 1}
//                       onChange={handlePaginationChange}
//                       showFirstButton
//                       showLastButton
//                       sx={{
//                           '& .MuiPaginationItem-root': {
//                               borderRadius: '4px',
//                               transition: 'background-color 0.3s, color 0.3s',
//                               '&:hover': {
//                                   backgroundColor: THEME_ORANGE,
//                                   color: 'white',
//                               }
//                           },
//                           '& .MuiPaginationItem-page': {
//                               color: THEME_PURPLE,
//                               '&.Mui-selected': {
//                                   backgroundColor: THEME_PURPLE,
//                                   color: 'white',
//                                   '&:hover': {
//                                       backgroundColor: THEME_ORANGE,
//                                   }
//                               },
//                           },
//                            '& .MuiPaginationItem-icon': {
//                               color: THEME_PURPLE,
//                           }
//                       }}
//                   />
//               </Box>
//           )}
//       </Box>
//       {/* --- END: New Styled Pagination --- */}

//       {/* --- Add/Edit Role Dialog Form --- */}
//       <Dialog open={openForm} onClose={handleCloseForm} fullWidth maxWidth="xs">
//         <DialogTitle sx={{ color: '#8C257C' , fontWeight: "bold", fontSize: '2rem' }} >
//           {isEditing ? "Edit Role" : "Add Role"}</DialogTitle>
//         <DialogContent>
//           <TextField
//             autoFocus
//             margin="dense"
//             label="Role Name"
//             type="text"
//             fullWidth
//             value={currentRole.role_name}
//             onChange={(e) =>
//               setCurrentRole({ ...currentRole, role_name: e.target.value })
//             }
//           />
//         </DialogContent>
//         <DialogActions sx={{ p: "16px 24px" }}>
//           <Button onClick={handleCloseForm} sx={{ color: THEME_ORANGE }}>
//             Cancel
//           </Button>
//           <PrimaryButton onClick={handleSubmit} variant="contained">
//             Save
//           </PrimaryButton>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// };

// export default Role;



import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  Box,
  Typography,
  Pagination,
  Skeleton,
} from "@mui/material";
import { Edit, Delete, Add } from "@mui/icons-material";
import { styled } from "@mui/system";
import Swal from "sweetalert2";
import axiosInstance from "../../utils/axiosInstance";

// --- Color Palette for Standardization ---
const THEME_PURPLE = "#8C257C";
const THEME_ORANGE = "#F58E35";
const THEME_PURPLE_HOVER = "#701d63";

// --- Styled Components ---
const PrimaryButton = styled(Button)(({ theme }) => ({
  backgroundColor: THEME_PURPLE,
  color: "#fff",
  "&:hover": {
    backgroundColor: THEME_PURPLE_HOVER,
  },
}));

const StyledTableCell = styled(TableCell)({
  wordBreak: "break-word",
  whiteSpace: "normal",
  maxWidth: "200px",
});

const Role = () => {
  const [roles, setRoles] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [currentRole, setCurrentRole] = useState({ role_name: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalRoles, setTotalRoles] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRoles();
  }, [page, rowsPerPage, searchTerm]);

  const fetchRoles = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("api/staffrole/");
      let data = res.data;

      let formatted = data.map((r) => ({
        role_id: r.value,
        role_name: r.label,
        created_at: r.created_at,
      }));

      // ---------------------------------------------------------
      // ✅ CHANGED: Sort by created_at DESCENDING (Newest First)
      // ---------------------------------------------------------
      formatted.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      
      // Fallback: If dates are missing, you can sort by ID descending:
      // formatted.sort((a, b) => b.role_id - a.role_id);

      if (searchTerm) {
        formatted = formatted.filter((role) =>
          role.role_name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      setTotalRoles(formatted.length);

      // Pagination slice is applied AFTER sorting
      const startIndex = page * rowsPerPage;
      const endIndex = startIndex + rowsPerPage;
      setRoles(formatted.slice(startIndex, endIndex));
    } catch (error) {
      console.error("Error fetching roles:", error);
      Swal.fire("Error", "Failed to fetch roles", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenForm = (role = { role_name: "" }) => {
    setCurrentRole(role);
    setIsEditing(!!role.role_id);
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
    setCurrentRole({ role_name: "" });
  };

  const handleSubmit = async () => {
    try {
      if (isEditing) {
        await axiosInstance.patch(`api/staffrole/${currentRole.role_id}/`, {
          role_name: currentRole.role_name,
        });
        Swal.fire({
          icon: "success",
          title: "Role Updated",
          text: `Role "${currentRole.role_name}" has been updated successfully.`,
          timer: 2000,
          showConfirmButton: false,
        });
      } else {
        await axiosInstance.post("api/staffrole/", {
          role_name: currentRole.role_name,
        });
        Swal.fire({
          icon: "success",
          title: "Role Added",
          text: `Role "${currentRole.role_name}" has been added successfully.`,
          timer: 2000,
          showConfirmButton: false,
        });
      }
      handleCloseForm();
      fetchRoles();
    } catch (error) {
      console.error("Error saving role:", error);
      Swal.fire("Error", "Failed to save role", "error");
    }
  };

  const handleDelete = (role) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You won't be able to revert deleting Role: ${role.role_name}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: THEME_PURPLE,
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosInstance.delete(`api/staffrole/${role.role_id}/`);
          Swal.fire({
            icon: "success",
            title: "Deleted!",
            text: `Role "${role.role_name}" has been deleted.`,
            timer: 2000,
            showConfirmButton: false,
          });
          fetchRoles();
        } catch (error) {
          console.error("Error deleting role:", error);
          Swal.fire("Error", "Failed to delete role", "error");
        }
      }
    });
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handlePaginationChange = (event, newPage) => {
    setPage(newPage - 1);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  
  const startEntry = roles.length > 0 ? page * rowsPerPage + 1 : 0;
  const endEntry = Math.min((page + 1) * rowsPerPage, totalRoles);

  return (
    <Box sx={{ p: 3, width: "100%" }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", color: "#8C257C ", mb: 5}}>
        Create Roles 
      </Typography>

      {/* --- Top Bar: Add Button and Search --- */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
        flexWrap="wrap"
        gap={2}
      >
        <PrimaryButton
          variant="contained"
          startIcon={<Add />}
          onClick={() => handleOpenForm()}
        >
          Add Role
        </PrimaryButton>
        <TextField
          placeholder="Search by Role Name..."
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ width: { xs: "100%", sm: "250px" } }}
        />
      </Box>

      {/* --- Table --- */}
      <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
        <Table size="small">
          <TableHead sx={{ backgroundColor: THEME_PURPLE }}>
            <TableRow>
              <StyledTableCell sx={{ color: "white", fontWeight: "bold" }}>
                SR. NO.
              </StyledTableCell>
              <StyledTableCell sx={{ color: "white", fontWeight: "bold" }}>
                ROLE ID
              </StyledTableCell>
              <StyledTableCell sx={{ color: "white", fontWeight: "bold" }}>
                ROLE NAME
              </StyledTableCell>
              <StyledTableCell sx={{ color: "white", fontWeight: "bold" }}>
                CREATED AT
              </StyledTableCell>
              <StyledTableCell sx={{ color: "white", fontWeight: "bold" }}>
                ACTIONS
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              Array.from(new Array(rowsPerPage)).map((_, index) => (
                <TableRow key={index}>
                  <StyledTableCell colSpan={5}><Skeleton /></StyledTableCell>
                </TableRow>
              ))
            ) : roles.length > 0 ? (
              roles.map((role, index) => (
                <TableRow
                  key={role.role_id}
                  sx={{ "&:nth-of-type(odd)": { backgroundColor: "#f9f9f9" } }}
                >
                  <StyledTableCell>
                    {page * rowsPerPage + index + 1}
                  </StyledTableCell>
                  <StyledTableCell>{role.role_id}</StyledTableCell>
                  <StyledTableCell>{role.role_name}</StyledTableCell>
                  <StyledTableCell>{formatDate(role.created_at)}</StyledTableCell>
                  <StyledTableCell>
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={() => handleOpenForm(role)}
                    >
                      <Edit fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => handleDelete(role)}
                    >
                      <Delete fontSize="small" />
                    </IconButton>
                  </StyledTableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <StyledTableCell colSpan={5} align="center">
                  No roles found.
                </StyledTableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* --- Pagination --- */}
      <Box sx={{ p: 2, borderTop: '1px solid rgba(224, 224, 224, 1)' }}>
          {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Skeleton variant="text" width={200} />
                  <Skeleton variant="rectangular" width={300} height={40} />
              </Box>
          ) : (
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <FormControl variant="outlined" size="small">
                          <Select
                              value={rowsPerPage}
                              onChange={handleChangeRowsPerPage}
                              sx={{
                                  backgroundColor: THEME_PURPLE,
                                  color: 'white',
                                  borderRadius: '4px',
                                  transition: 'background-color 0.3s',
                                  '&:hover': {
                                      backgroundColor: THEME_PURPLE_HOVER,
                                  },
                                  '& .MuiOutlinedInput-notchedOutline': {
                                      border: 'none',
                                  },
                                  '& .MuiSvgIcon-root': {
                                      color: 'white',
                                  },
                              }}
                          >
                              {[5, 10, 15, 25].map((value) => (
                                  <MenuItem key={value} value={value}>{value}</MenuItem>
                              ))}
                          </Select>
                      </FormControl>
                      <Typography variant="body2" color="text.secondary">
                         {`Showing ${startEntry} to ${endEntry} of ${totalRoles} results`}
                      </Typography>
                  </Box>
                  <Pagination
                      count={Math.ceil(totalRoles / rowsPerPage)}
                      page={page + 1}
                      onChange={handlePaginationChange}
                      showFirstButton
                      showLastButton
                      sx={{
                          '& .MuiPaginationItem-root': {
                              borderRadius: '4px',
                              transition: 'background-color 0.3s, color 0.3s',
                              '&:hover': {
                                  backgroundColor: THEME_ORANGE,
                                  color: 'white',
                              }
                          },
                          '& .MuiPaginationItem-page': {
                              color: THEME_PURPLE,
                              '&.Mui-selected': {
                                  backgroundColor: THEME_PURPLE,
                                  color: 'white',
                                  '&:hover': {
                                      backgroundColor: THEME_ORANGE,
                                  }
                              },
                          },
                           '& .MuiPaginationItem-icon': {
                              color: THEME_PURPLE,
                          }
                      }}
                  />
              </Box>
          )}
      </Box>

      {/* --- Add/Edit Role Dialog Form --- */}
      <Dialog open={openForm} onClose={handleCloseForm} fullWidth maxWidth="xs">
        <DialogTitle sx={{ color: '#8C257C' , fontWeight: "bold", fontSize: '2rem' }} >
          {isEditing ? "Edit Role" : "Add Role"}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Role Name"
            type="text"
            fullWidth
            value={currentRole.role_name}
            onChange={(e) =>
              setCurrentRole({ ...currentRole, role_name: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions sx={{ p: "16px 24px" }}>
          <Button onClick={handleCloseForm} sx={{ color: THEME_ORANGE }}>
            Cancel
          </Button>
          <PrimaryButton onClick={handleSubmit} variant="contained">
            Save
          </PrimaryButton>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Role;