// import React, { useState, useEffect, useMemo } from "react";
// import axios from "axios";
// import {
//   Container,
//   Paper,
//   Typography,
//   TextField,
//   Box,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   IconButton,
//   Button,
//   Select,
//   MenuItem,
//   Modal,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogContentText,
//   DialogActions,
//   CircularProgress,
//   FormControl,
// } from "@mui/material";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import AddIcon from "@mui/icons-material/Add";
// import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
// import dayjs from "dayjs";

// // RESPONSIVE CHANGE: Updated modal style for responsiveness
// const modalStyle = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: { xs: "90%", sm: 400 }, // Responsive width
//   bgcolor: "background.paper",
//   border: "1px solid #ddd",
//   boxShadow: 24,
//   borderRadius: 2,
//   p: 4,
// };

// function Division() {
//   const [rows, setRows] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [openModal, setOpenModal] = useState(false);
//   const [newDivision, setNewDivision] = useState({ name: "", code: "" });
//   const [editModalOpen, setEditModalOpen] = useState(false);
//   const [editDivision, setEditDivision] = useState(null);
//   const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
//   const [deleteId, setDeleteId] = useState(null);

//   const API_URL = "https://tdtlworld.com/hrms-backend/api/division/";

//   const fetchData = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get(API_URL);
//       // Sort by latest created_at date first
//       const sortedData = res.data.sort(
//         (a, b) => new Date(b.created_at) - new Date(a.created_at)
//       );
//       const apiData = sortedData.map((d) => ({
//         id: d.division_id,
//         name: d.division_name || "",
//         code: d.division_code || "",
//         createdAt: d.created_at
//           ? dayjs(d.created_at).format("DD-MM-YYYY")
//           : "-",
//       }));
//       setRows(apiData);
//     } catch (error) {
//       console.error("GET API error:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const handleAddNewDivision = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post(API_URL, {
//         division_name: newDivision.name.trim(),
//         division_code: newDivision.code.trim(),
//       });
//       setNewDivision({ name: "", code: "" });
//       setOpenModal(false);
//       fetchData();
//     } catch (err) {
//       console.error("POST error", err);
//       alert("Error while adding division.");
//     }
//   };

//   const handleEditSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.patch(`${API_URL}${editDivision.id}/`, {
//         division_name: editDivision.name,
//         division_code: editDivision.code,
//       });
//       setEditModalOpen(false);
//       fetchData();
//     } catch (err) {
//       console.error("PATCH error", err);
//       alert("Error while updating.");
//     }
//   };

//   const handleDeleteConfirm = async () => {
//     try {
//       await axios.delete(`${API_URL}${deleteId}/`);
//       setDeleteDialogOpen(false);
//       fetchData();
//     } catch (err) {
//       console.error("DELETE error", err);
//       alert("Error while deleting.");
//     }
//   };

//   const filteredRows = useMemo(() => {
//     return rows.filter((row) => {
//       const name = row.name || "";
//       const code = row.code || "";
//       return (
//         name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         code.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     });
//   }, [rows, searchTerm]);

//   const paginatedRows = useMemo(() => {
//     return filteredRows.slice(
//       page * rowsPerPage,
//       page * rowsPerPage + rowsPerPage
//     );
//   }, [filteredRows, page, rowsPerPage]);

//   const totalPages = Math.ceil(filteredRows.length / rowsPerPage);

//   const purpleButtonStyle = {
//     backgroundColor: "#673ab7",
//     color: "#fff",
//     "&:hover": { backgroundColor: "#5e35b1" },
//   };

//   return (
//     <Container maxWidth="lg" sx={{ mt: 2 }}>
//       {/* RESPONSIVE CHANGE: Added responsive padding */}
//       <Paper elevation={3} sx={{ p: { xs: 2, md: 3 }, borderRadius: 2 }}>
//         {/* RESPONSIVE CHANGE: Header now stacks on mobile */}
//         <Box
//           sx={{
//             display: "flex",
//             flexDirection: { xs: "column", sm: "row" },
//             justifyContent: "space-between",
//             alignItems: { xs: "flex-start", sm: "center" },
//             mb: 2,
//             gap: 2,
//           }}
//         >
//           <Typography variant="h5" sx={{ fontWeight: "bold" }}>
//             Division Management ---------
//           </Typography>
//           <Button
//             variant="contained"
//             sx={{ ...purpleButtonStyle, width: { xs: "100%", sm: "auto" } }}
//             startIcon={<AddIcon />}
//             onClick={() => setOpenModal(true)}
//           >
//             Add Division
//           </Button>
//         </Box>

        
//         {/* RESPONSIVE CHANGE: Controls now stack on mobile */}
//         <Box
//           sx={{
//             mb: 2,
//             display: "flex",
//             flexDirection: { xs: "column", md: "row" },
//             justifyContent: "space-between",
//             alignItems: { xs: "stretch", md: "center" },
//             gap: 2,
//           }}
//         >
//           <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//             <Typography variant="body2">Show</Typography>
//             <FormControl size="small">
//               <Select
//                 value={rowsPerPage}
//                 onChange={(e) => {
//                   setRowsPerPage(parseInt(e.target.value, 10));
//                   setPage(0);
//                 }}
//               >
//                 <MenuItem value={10}>10</MenuItem>
//                 <MenuItem value={25}>25</MenuItem>
//                 <MenuItem value={50}>50</MenuItem>
//               </Select>
//             </FormControl>
//             <Typography variant="body2">entries</Typography>
//           </Box>
//           <TextField
//             label="Search"
//             variant="outlined"
//             size="small"
//             value={searchTerm}
//             onChange={(e) => {
//               setSearchTerm(e.target.value);
//               setPage(0);
//             }}
//           />
//         </Box>

//         {loading ? (
//           <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
//             <CircularProgress />
//           </Box>
//         ) : (
//           <>
//             {/* RESPONSIVE CHANGE: TableContainer makes table scrollable */}
//             <TableContainer>
//               <Table>
//                 <TableHead>
//                   <TableRow>
//                     {/* RESPONSIVE CHANGE: 'whiteSpace: nowrap' for better scrolling */}
//                     <TableCell
//                       sx={{
//                         fontWeight: "bold",
//                         backgroundColor: "#e3f2fd",
//                         whiteSpace: "nowrap",
//                       }}
//                     >
//                       SR. NO.
//                     </TableCell>
//                     <TableCell
//                       sx={{
//                         fontWeight: "bold",
//                         backgroundColor: "#e3f2fd",
//                         whiteSpace: "nowrap",
//                       }}
//                     >
//                       DIVISION NAME
//                     </TableCell>
//                     <TableCell
//                       sx={{
//                         fontWeight: "bold",
//                         backgroundColor: "#e3f2fd",
//                         whiteSpace: "nowrap",
//                       }}
//                     >
//                       DIVISION CODE
//                     </TableCell>
//                     <TableCell
//                       sx={{
//                         fontWeight: "bold",
//                         backgroundColor: "#e3f2fd",
//                         whiteSpace: "nowrap",
//                       }}
//                     >
//                       <CalendarTodayIcon
//                         sx={{ fontSize: 16, mr: 0.5, verticalAlign: "middle" }}
//                       />{" "}
//                       CREATED AT
//                     </TableCell>
//                     <TableCell
//                       sx={{
//                         fontWeight: "bold",
//                         backgroundColor: "#e3f2fd",
//                         whiteSpace: "nowrap",
//                       }}
//                     >
//                       ACTIONS
//                     </TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {paginatedRows.length > 0 ? (
//                     paginatedRows.map((row, index) => (
//                       <TableRow key={row.id}>
//                         <TableCell>{page * rowsPerPage + index + 1}</TableCell>
//                         <TableCell>{row.name}</TableCell>
//                         <TableCell>{row.code}</TableCell>
//                         <TableCell>{row.createdAt}</TableCell>
//                         <TableCell>
//                           <IconButton
//                             sx={{ color: "#673ab7" }}
//                             onClick={() => {
//                               setEditDivision(row);
//                               setEditModalOpen(true);
//                             }}
//                           >
//                             <EditIcon />
//                           </IconButton>
//                           <IconButton
//                             color="error"
//                             onClick={() => {
//                               setDeleteId(row.id);
//                               setDeleteDialogOpen(true);
//                             }}
//                           >
//                             <DeleteIcon />
//                           </IconButton>
//                         </TableCell>
//                       </TableRow>
//                     ))
//                   ) : (
//                     <TableRow>
//                       <TableCell colSpan={5} align="center">
//                         No Divisions Found
//                       </TableCell>
//                     </TableRow>
//                   )}
//                 </TableBody>
//               </Table>
//             </TableContainer>

//             {/* RESPONSIVE CHANGE: Pagination stacks and centers on mobile */}
//             {filteredRows.length > 0 && (
//               <Box
//                 sx={{
//                   p: 2,
//                   display: "flex",
//                   flexDirection: { xs: "column", sm: "row" },
//                   justifyContent: "space-between",
//                   alignItems: "center",
//                   gap: 2,
//                 }}
//               >
//                 <Typography variant="body2">
//                   Showing{" "}
//                   {paginatedRows.length > 0 ? page * rowsPerPage + 1 : 0} to{" "}
//                   {Math.min((page + 1) * rowsPerPage, filteredRows.length)} of{" "}
//                   {filteredRows.length} records
//                 </Typography>
//                 <Box sx={{ display: "flex", gap: 1 }}>
//                   <Button
//                     variant="contained"
//                     disabled={page === 0}
//                     onClick={() => setPage((p) => p - 1)}
//                     sx={purpleButtonStyle}
//                   >
//                     Previous
//                   </Button>
//                   <Typography
//                     component="span"
//                     sx={{
//                       p: "6px 16px",
//                       border: "1px solid #ddd",
//                       borderRadius: 1,
//                     }}
//                   >
//                     {page + 1}
//                   </Typography>
//                   <Button
//                     variant="contained"
//                     disabled={page >= totalPages - 1}
//                     onClick={() => setPage((p) => p + 1)}
//                     sx={purpleButtonStyle}
//                   >
//                     Next
//                   </Button>
//                 </Box>
//               </Box>
//             )}
//           </>
//         )}
//       </Paper>

//       {/* Add Modal */}
//       <Modal open={openModal} onClose={() => setOpenModal(false)}>
//         <Box sx={modalStyle} component="form" onSubmit={handleAddNewDivision}>
//           <Typography variant="h6" mb={2}>
//             Add New Division
//           </Typography>
//           <TextField
//             label="Division Name"
//             value={newDivision.name}
//             onChange={(e) =>
//               setNewDivision({ ...newDivision, name: e.target.value })
//             }
//             fullWidth
//             margin="normal"
//             required
//           />
//           <TextField
//             label="Division Code"
//             value={newDivision.code}
//             onChange={(e) =>
//               setNewDivision({ ...newDivision, code: e.target.value })
//             }
//             fullWidth
//             margin="normal"
//             required
//           />
//           <Box mt={3} display="flex" justifyContent="flex-end" gap={1}>
//             <Button onClick={() => setOpenModal(false)} variant="outlined">
//               Cancel
//             </Button>
//             <Button type="submit" variant="contained" sx={purpleButtonStyle}>
//               Add
//             </Button>
//           </Box>
//         </Box>
//       </Modal>

//       {/* Edit Modal */}
//       <Modal open={editModalOpen} onClose={() => setEditModalOpen(false)}>
//         <Box sx={modalStyle} component="form" onSubmit={handleEditSubmit}>
//           <Typography variant="h6" mb={2}>
//             Edit Division
//           </Typography>
//           <TextField
//             label="Division Name"
//             value={editDivision?.name || ""}
//             onChange={(e) =>
//               setEditDivision({ ...editDivision, name: e.target.value })
//             }
//             fullWidth
//             margin="normal"
//             required
//           />
//           <TextField
//             label="Division Code"
//             value={editDivision?.code || ""}
//             onChange={(e) =>
//               setEditDivision({ ...editDivision, code: e.target.value })
//             }
//             fullWidth
//             margin="normal"
//             required
//           />
//           <Box mt={3} display="flex" justifyContent="flex-end" gap={1}>
//             <Button onClick={() => setEditModalOpen(false)} variant="outlined">
//               Cancel
//             </Button>
//             <Button type="submit" variant="contained" sx={purpleButtonStyle}>
//               Update
//             </Button>
//           </Box>
//         </Box>
//       </Modal>

//       {/* Delete Confirm Dialog - Dialog component is inherently responsive */}
//       <Dialog
//         open={deleteDialogOpen}
//         onClose={() => setDeleteDialogOpen(false)}
//       >
//         <DialogTitle>Confirm Deletion</DialogTitle>
//         <DialogContent>
//           <DialogContentText>
//             Are you sure you want to delete this division? This action cannot be
//             undone.
//           </DialogContentText>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
//           <Button color="error" onClick={handleDeleteConfirm}>
//             Delete
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Container>
//   );
// }

// export default Division;



















// import React, { useState, useEffect, useMemo } from "react";
// import axios from "axios";
// import {
//   Container,
//   Paper,
//   Typography,
//   TextField,
//   Box,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   IconButton,
//   Button,
//   Select,
//   MenuItem,
//   Modal,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogContentText,
//   DialogActions,
//   CircularProgress,
//   FormControl,
// } from "@mui/material";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import AddIcon from "@mui/icons-material/Add";
// import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
// import dayjs from "dayjs";
// import Swal from "sweetalert2"; // Import SweetAlert2

// // RESPONSIVE CHANGE: Updated modal style for responsiveness
// const modalStyle = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: { xs: "90%", sm: 400 }, // Responsive width
//   bgcolor: "background.paper",
//   border: "1px solid #ddd",
//   boxShadow: 24,
//   borderRadius: 2,
//   p: 4,
// };

// function Division() {
//   const [rows, setRows] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [openModal, setOpenModal] = useState(false);
//   const [newDivision, setNewDivision] = useState({ name: "", code: "" });
//   const [editModalOpen, setEditModalOpen] = useState(false);
//   const [editDivision, setEditDivision] = useState(null);
//   const [deleteDialogOpen, setDeleteDialogOpen] = useState(false); // No longer needed directly for Swal
//   const [deleteId, setDeleteId] = useState(null);

//   const API_URL = "https://tdtlworld.com/hrms-backend/api/division/";

//   const fetchData = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get(API_URL);
//       // Sort by latest created_at date first
//       const sortedData = res.data.sort(
//         (a, b) => new Date(b.created_at) - new Date(a.created_at)
//       );
//       const apiData = sortedData.map((d) => ({
//         id: d.division_id,
//         name: d.division_name || "",
//         code: d.division_code || "",
//         createdAt: d.created_at
//           ? dayjs(d.created_at).format("DD-MM-YYYY")
//           : "-",
//       }));
//       setRows(apiData);
//     } catch (error) {
//       console.error("GET API error:", error);
//       Swal.fire("Error!", "Failed to fetch divisions.", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const handleAddNewDivision = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post(API_URL, {
//         division_name: newDivision.name.trim(),
//         division_code: newDivision.code.trim(),
//       });
//       Swal.fire("Success!", "Division added successfully.", "success");
//       setNewDivision({ name: "", code: "" });
//       setOpenModal(false);
//       fetchData();
//     } catch (err) {
//       console.error("POST error", err);
//       Swal.fire("Error!", "Error while adding division.", "error");
//     }
//   };

//   const handleEditSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.patch(`${API_URL}${editDivision.id}/`, {
//         division_name: editDivision.name,
//         division_code: editDivision.code,
//       });
//       Swal.fire("Success!", "Division updated successfully.", "success");
//       setEditModalOpen(false);
//       fetchData();
//     } catch (err) {
//       console.error("PATCH error", err);
//       Swal.fire("Error!", "Error while updating division.", "error");
//     }
//   };

//   const handleDeleteClick = (id) => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#d33",
//       cancelButtonColor: "#3085d6",
//       confirmButtonText: "Yes, delete it!",
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         try {
//           await axios.delete(`${API_URL}${id}/`);
//           Swal.fire("Deleted!", "Your division has been deleted.", "success");
//           fetchData();
//         } catch (err) {
//           console.error("DELETE error", err);
//           Swal.fire("Error!", "Error while deleting division.", "error");
//         }
//       }
//     });
//   };

//   const filteredRows = useMemo(() => {
//     return rows.filter((row) => {
//       const name = row.name || "";
//       const code = row.code || "";
//       return (
//         name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         code.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     });
//   }, [rows, searchTerm]);

//   const paginatedRows = useMemo(() => {
//     return filteredRows.slice(
//       page * rowsPerPage,
//       page * rowsPerPage + rowsPerPage
//     );
//   }, [filteredRows, page, rowsPerPage]);

//   const totalPages = Math.ceil(filteredRows.length / rowsPerPage);

//   const purpleButtonStyle = {
//     backgroundColor: "#673ab7",
//     color: "#fff",
//     "&:hover": { backgroundColor: "#5e35b1" },
//   };

//   return (
//     <Container maxWidth="lg" sx={{ mt: 2 }}>
//       {/* RESPONSIVE CHANGE: Added responsive padding */}
//       <Paper elevation={3} sx={{ p: { xs: 2, md: 3 }, borderRadius: 2 }}>
//         {/* RESPONSIVE CHANGE: Header now stacks on mobile */}
//         <Box
//           sx={{
//             display: "flex",
//             flexDirection: { xs: "column", sm: "row" },
//             justifyContent: "space-between",
//             alignItems: { xs: "flex-start", sm: "center" },
//             mb: 2,
//             gap: 2,
//           }}
//         >
//           <Typography variant="h5" sx={{ fontWeight: "bold" }}>
//             Division Management
//           </Typography>
//           <Button
//             variant="contained"
//             sx={{ ...purpleButtonStyle, width: { xs: "100%", sm: "auto" } }}
//             startIcon={<AddIcon />}
//             onClick={() => setOpenModal(true)}
//           >
//             Add Division
//           </Button>
//         </Box>

//         {/* RESPONSIVE CHANGE: Controls now stack on mobile */}
//         <Box
//           sx={{
//             mb: 2,
//             display: "flex",
//             flexDirection: { xs: "column", md: "row" },
//             justifyContent: "space-between",
//             alignItems: { xs: "stretch", md: "center" },
//             gap: 2,
//           }}
//         >
//           <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//             <Typography variant="body2">Show</Typography>
//             <FormControl size="small">
//               <Select
//                 value={rowsPerPage}
//                 onChange={(e) => {
//                   setRowsPerPage(parseInt(e.target.value, 10));
//                   setPage(0);
//                 }}
//               >
//                 <MenuItem value={10}>10</MenuItem>
//                 <MenuItem value={25}>25</MenuItem>
//                 <MenuItem value={50}>50</MenuItem>
//               </Select>
//             </FormControl>
//             <Typography variant="body2">entries</Typography>
//           </Box>
//           <TextField
//             label="Search"
//             variant="outlined"
//             size="small"
//             value={searchTerm}
//             onChange={(e) => {
//               setSearchTerm(e.target.value);
//               setPage(0);
//             }}
//           />
//         </Box>

//         {loading ? (
//           <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
//             <CircularProgress />
//           </Box>
//         ) : (
//           <>
//             {/* RESPONSIVE CHANGE: TableContainer makes table scrollable */}
//             <TableContainer>
//               <Table>
//                 <TableHead>
//                   <TableRow>
//                     {/* RESPONSIVE CHANGE: 'whiteSpace: nowrap' for better scrolling */}
//                     <TableCell
//                       sx={{
//                         fontWeight: "bold",
//                         backgroundColor: "#e3f2fd",
//                         whiteSpace: "nowrap",
//                       }}
//                     >
//                       SR. NO.
//                     </TableCell>
//                     <TableCell
//                       sx={{
//                         fontWeight: "bold",
//                         backgroundColor: "#e3f2fd",
//                         whiteSpace: "nowrap",
//                       }}
//                     >
//                       DIVISION NAME
//                     </TableCell>
//                     <TableCell
//                       sx={{
//                         fontWeight: "bold",
//                         backgroundColor: "#e3f2fd",
//                         whiteSpace: "nowrap",
//                       }}
//                     >
//                       DIVISION CODE
//                     </TableCell>
//                     <TableCell
//                       sx={{
//                         fontWeight: "bold",
//                         backgroundColor: "#e3f2fd",
//                         whiteSpace: "nowrap",
//                       }}
//                     >
//                       <CalendarTodayIcon
//                         sx={{ fontSize: 16, mr: 0.5, verticalAlign: "middle" }}
//                       />{" "}
//                       CREATED AT
//                     </TableCell>
//                     <TableCell
//                       sx={{
//                         fontWeight: "bold",
//                         backgroundColor: "#e3f2fd",
//                         whiteSpace: "nowrap",
//                       }}
//                     >
//                       ACTIONS
//                     </TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {paginatedRows.length > 0 ? (
//                     paginatedRows.map((row, index) => (
//                       <TableRow key={row.id}>
//                         <TableCell>{page * rowsPerPage + index + 1}</TableCell>
//                         <TableCell>{row.name}</TableCell>
//                         <TableCell>{row.code}</TableCell>
//                         <TableCell>{row.createdAt}</TableCell>
//                         <TableCell>
//                           <IconButton
//                             sx={{ color: "#673ab7" }}
//                             onClick={() => {
//                               setEditDivision(row);
//                               setEditModalOpen(true);
//                             }}
//                           >
//                             <EditIcon />
//                           </IconButton>
//                           <IconButton
//                             color="error"
//                             onClick={() => handleDeleteClick(row.id)} // Changed to use Swal directly
//                           >
//                             <DeleteIcon />
//                           </IconButton>
//                         </TableCell>
//                       </TableRow>
//                     ))
//                   ) : (
//                     <TableRow>
//                       <TableCell colSpan={5} align="center">
//                         No Divisions Found
//                       </TableCell>
//                     </TableRow>
//                   )}
//                 </TableBody>
//               </Table>
//             </TableContainer>

//             {/* RESPONSIVE CHANGE: Pagination stacks and centers on mobile */}
//             {filteredRows.length > 0 && (
//               <Box
//                 sx={{
//                   p: 2,
//                   display: "flex",
//                   flexDirection: { xs: "column", sm: "row" },
//                   justifyContent: "space-between",
//                   alignItems: "center",
//                   gap: 2,
//                 }}
//               >
//                 <Typography variant="body2">
//                   Showing{" "}
//                   {paginatedRows.length > 0 ? page * rowsPerPage + 1 : 0} to{" "}
//                   {Math.min((page + 1) * rowsPerPage, filteredRows.length)} of{" "}
//                   {filteredRows.length} records
//                 </Typography>
//                 <Box sx={{ display: "flex", gap: 1 }}>
//                   <Button
//                     variant="contained"
//                     disabled={page === 0}
//                     onClick={() => setPage((p) => p - 1)}
//                     sx={purpleButtonStyle}
//                   >
//                     Previous
//                   </Button>
//                   <Typography
//                     component="span"
//                     sx={{
//                       p: "6px 16px",
//                       border: "1px solid #ddd",
//                       borderRadius: 1,
//                     }}
//                   >
//                     {page + 1}
//                   </Typography>
//                   <Button
//                     variant="contained"
//                     disabled={page >= totalPages - 1}
//                     onClick={() => setPage((p) => p + 1)}
//                     sx={purpleButtonStyle}
//                   >
//                     Next
//                   </Button>
//                 </Box>
//               </Box>
//             )}
//           </>
//         )}
//       </Paper>

//       {/* Add Modal */}
//       <Modal open={openModal} onClose={() => setOpenModal(false)}>
//         <Box sx={modalStyle} component="form" onSubmit={handleAddNewDivision}>
//           <Typography variant="h6" mb={2}>
//             Add New Division
//           </Typography>
//           <TextField
//             label="Division Name"
//             value={newDivision.name}
//             onChange={(e) =>
//               setNewDivision({ ...newDivision, name: e.target.value })
//             }
//             fullWidth
//             margin="normal"
//             required
//           />
//           <TextField
//             label="Division Code"
//             value={newDivision.code}
//             onChange={(e) =>
//               setNewDivision({ ...newDivision, code: e.target.value })
//             }
//             fullWidth
//             margin="normal"
//             required
//           />
//           <Box mt={3} display="flex" justifyContent="flex-end" gap={1}>
//             <Button onClick={() => setOpenModal(false)} variant="outlined">
//               Cancel
//             </Button>
//             <Button type="submit" variant="contained" sx={purpleButtonStyle}>
//               Add
//             </Button>
//           </Box>
//         </Box>
//       </Modal>

//       {/* Edit Modal */}
//       <Modal open={editModalOpen} onClose={() => setEditModalOpen(false)}>
//         <Box sx={modalStyle} component="form" onSubmit={handleEditSubmit}>
//           <Typography variant="h6" mb={2}>
//             Edit Division
//           </Typography>
//           <TextField
//             label="Division Name"
//             value={editDivision?.name || ""}
//             onChange={(e) =>
//               setEditDivision({ ...editDivision, name: e.target.value })
//             }
//             fullWidth
//             margin="normal"
//             required
//           />
//           <TextField
//             label="Division Code"
//             value={editDivision?.code || ""}
//             onChange={(e) =>
//               setEditDivision({ ...editDivision, code: e.target.value })
//             }
//             fullWidth
//             margin="normal"
//             required
//           />
//           <Box mt={3} display="flex" justifyContent="flex-end" gap={1}>
//             <Button onClick={() => setEditModalOpen(false)} variant="outlined">
//               Cancel
//             </Button>
//             <Button type="submit" variant="contained" sx={purpleButtonStyle}>
//               Update
//             </Button>
//           </Box>
//         </Box>
//       </Modal>
//     </Container>
//   );
// }

// export default Division;








// import React, { useState, useEffect, useMemo } from "react";
// import axios from "axios";
// import {
//   Container,
//   Paper,
//   Typography,
//   TextField,
//   Box,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   IconButton,
//   Button,
//   Select,
//   MenuItem,
//   Modal,
//   CircularProgress,
//   FormControl,
// } from "@mui/material";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import AddIcon from "@mui/icons-material/Add";
// import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
// import dayjs from "dayjs";
// import Swal from "sweetalert2";

// // --- UI STANDARDIZATION & COLOR SCHEME ---
// const primaryPurple = "#8C257C";
// // const primaryOrange = "#F58E35"; // Available for use

// // Style for primary buttons
// const purpleButtonStyle = {
//   backgroundColor: primaryPurple,
//   color: "#fff",
//   "&:hover": {
//     backgroundColor: "#7a216c", // A darker shade of the purple for hover
//   },
// };

// // Style for table headers
// const tableHeaderStyle = {
//   fontWeight: "bold",
//   backgroundColor: primaryPurple,
//   color: "white",
//   whiteSpace: "nowrap",
// };

// // Updated modal style for responsiveness
// const modalStyle = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: { xs: "90%", sm: 400 },
//   bgcolor: "background.paper",
//   border: "1px solid #ddd",
//   boxShadow: 24,
//   borderRadius: 2,
//   p: 4,
// };
// // --- END OF STYLES ---

// function Division() {
//   const [rows, setRows] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [openModal, setOpenModal] = useState(false);
//   const [newDivision, setNewDivision] = useState({ name: "", code: "" });
//   const [editModalOpen, setEditModalOpen] = useState(false);
//   const [editDivision, setEditDivision] = useState(null);

//   const API_URL = "https://tdtlworld.com/hrms-backend/api/division/";

//   const fetchData = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get(API_URL);
//       const sortedData = res.data.sort(
//         (a, b) => new Date(b.created_at) - new Date(a.created_at)
//       );
//       const apiData = sortedData.map((d) => ({
//         id: d.division_id,
//         name: d.division_name || "",
//         code: d.division_code || "",
//         createdAt: d.created_at
//           ? dayjs(d.created_at).format("DD-MM-YYYY")
//           : "-",
//       }));
//       setRows(apiData);
//     } catch (error) {
//       console.error("GET API error:", error);
//       Swal.fire("Error!", "Failed to fetch divisions.", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const handleAddNewDivision = async (e) => {
//     e.preventDefault();
//     if (!newDivision.name.trim() || !newDivision.code.trim()) {
//       Swal.fire("Validation Error", "All fields are required.", "error");
//       return;
//     }
//     try {
//       await axios.post(API_URL, {
//         division_name: newDivision.name.trim(),
//         division_code: newDivision.code.trim(),
//       });
//       Swal.fire("Success!", "Division added successfully.", "success");
//       setNewDivision({ name: "", code: "" });
//       setOpenModal(false);
//       fetchData();
//     } catch (err) {
//       console.error("POST error", err);
//       Swal.fire("Error!", "Error while adding division.", "error");
//     }
//   };

//   const handleEditSubmit = async (e) => {
//     e.preventDefault();
//     if (!editDivision.name.trim() || !editDivision.code.trim()) {
//       Swal.fire("Validation Error", "All fields are required.", "error");
//       return;
//     }
//     try {
//       await axios.patch(`${API_URL}${editDivision.id}/`, {
//         division_name: editDivision.name.trim(),
//         division_code: editDivision.code.trim(),
//       });
//       Swal.fire("Success!", "Division updated successfully.", "success");
//       setEditModalOpen(false);
//       fetchData();
//     } catch (err) {
//       console.error("PATCH error", err);
//       Swal.fire("Error!", "Error while updating division.", "error");
//     }
//   };

//   const handleDeleteClick = (id) => {
//     Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#d33",
//       cancelButtonColor: "#3085d6",
//       confirmButtonText: "Yes, delete it!",
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         try {
//           await axios.delete(`${API_URL}${id}/`);
//           Swal.fire("Deleted!", "Your division has been deleted.", "success");
//           fetchData();
//         } catch (err) {
//           console.error("DELETE error", err);
//           Swal.fire("Error!", "Error while deleting division.", "error");
//         }
//       }
//     });
//   };

//   const filteredRows = useMemo(() => {
//     return rows.filter((row) => {
//       const name = row.name || "";
//       const code = row.code || "";
//       return (
//         name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         code.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     });
//   }, [rows, searchTerm]);

//   const paginatedRows = useMemo(() => {
//     return filteredRows.slice(
//       page * rowsPerPage,
//       page * rowsPerPage + rowsPerPage
//     );
//   }, [filteredRows, page, rowsPerPage]);

//   const totalPages = Math.ceil(filteredRows.length / rowsPerPage);

//   return (
//     <Container maxWidth="lg" sx={{ mt: 2 }}>
//       <Paper elevation={3} sx={{ p: { xs: 2, md: 3 }, borderRadius: 2 }}>
//         <Box
//           sx={{
//             display: "flex",
//             flexDirection: { xs: "column", sm: "row" },
//             justifyContent: "space-between",
//             alignItems: { xs: "flex-start", sm: "center" },
//             mb: 2,
//             gap: 2,
//           }}
//         >
//           <Typography variant="h5" sx={{ fontWeight: "bold" }}>
//             Division Management
//           </Typography>
//           <Button
//             variant="contained"
//             sx={{ ...purpleButtonStyle, width: { xs: "100%", sm: "auto" } }}
//             startIcon={<AddIcon />}
//             onClick={() => setOpenModal(true)}
//           >
//             Add Division
//           </Button>
//         </Box>

//         {/* --- STANDARDIZED CONTROLS: TOP LEFT AND TOP RIGHT --- */}
//         <Box
//           sx={{
//             mb: 2,
//             display: "flex",
//             flexDirection: { xs: "column", md: "row" },
//             justifyContent: "space-between",
//             alignItems: { md: "center" },
//             gap: 2,
//           }}
//         >
//           {/* Show Entries - Top Left */}
//           <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//             <Typography variant="body2">Show</Typography>
//             <FormControl size="small">
//               <Select
//                 value={rowsPerPage}
//                 onChange={(e) => {
//                   setRowsPerPage(parseInt(e.target.value, 10));
//                   setPage(0);
//                 }}
//               >
//                 <MenuItem value={10}>10</MenuItem>
//                 <MenuItem value={25}>25</MenuItem>
//                 <MenuItem value={50}>50</MenuItem>
//               </Select>
//             </FormControl>
//             <Typography variant="body2">entries</Typography>
//           </Box>

//           {/* Search Bar - Top Right */}
//           <TextField
//             label="Search"
//             variant="outlined"
//             size="small"
//             value={searchTerm}
//             onChange={(e) => {
//               setSearchTerm(e.target.value);
//               setPage(0);
//             }}
//             sx={{ width: { xs: "100%", md: "auto" } }}
//           />
//         </Box>

//         {loading ? (
//           <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
//             <CircularProgress sx={{ color: primaryPurple }} />
//           </Box>
//         ) : (
//           <>
//             <TableContainer>
//               <Table>
//                 <TableHead>
//                   <TableRow>
//                     <TableCell sx={tableHeaderStyle}>SR. NO.</TableCell>
//                     <TableCell sx={tableHeaderStyle}>DIVISION NAME</TableCell>
//                     <TableCell sx={tableHeaderStyle}>DIVISION CODE</TableCell>
//                     <TableCell sx={tableHeaderStyle}>
//                       <CalendarTodayIcon
//                         sx={{ fontSize: 16, mr: 0.5, verticalAlign: "middle" }}
//                       />
//                       CREATED AT
//                     </TableCell>
//                     <TableCell sx={tableHeaderStyle}>ACTIONS</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {paginatedRows.length > 0 ? (
//                     paginatedRows.map((row, index) => (
//                       <TableRow
//                         key={row.id}
//                         sx={{ "&:nth-of-type(odd)": { backgroundColor: "#f9f9f9" } }}
//                       >
//                         <TableCell>{page * rowsPerPage + index + 1}</TableCell>
//                         <TableCell>{row.name}</TableCell>
//                         <TableCell>{row.code}</TableCell>
//                         <TableCell>{row.createdAt}</TableCell>
//                         <TableCell>
//                           <IconButton
//                             sx={{ color: primaryPurple }}
//                             onClick={() => {
//                               setEditDivision(row);
//                               setEditModalOpen(true);
//                             }}
//                           >
//                             <EditIcon />
//                           </IconButton>
//                           <IconButton
//                             color="error"
//                             onClick={() => handleDeleteClick(row.id)}
//                           >
//                             <DeleteIcon />
//                           </IconButton>
//                         </TableCell>
//                       </TableRow>
//                     ))
//                   ) : (
//                     <TableRow>
//                       <TableCell colSpan={5} align="center">
//                         No Divisions Found
//                       </TableCell>
//                     </TableRow>
//                   )}
//                 </TableBody>
//               </Table>
//             </TableContainer>

//             {/* --- STANDARDIZED PAGINATION: BOTTOM LEFT AND BOTTOM RIGHT --- */}
//             {filteredRows.length > 0 && (
//               <Box
//                 sx={{
//                   p: 2,
//                   display: "flex",
//                   flexDirection: { xs: "column", sm: "row" },
//                   justifyContent: "space-between",
//                   alignItems: "center",
//                   gap: 2,
//                 }}
//               >
//                 {/* Total Rows - Bottom Left */}
//                 <Typography variant="body2">
//                   Showing{" "}
//                   {paginatedRows.length > 0 ? page * rowsPerPage + 1 : 0} to{" "}
//                   {Math.min((page + 1) * rowsPerPage, filteredRows.length)} of{" "}
//                   {filteredRows.length} records
//                 </Typography>

//                 {/* Pagination Controls - Bottom Right */}
//                 <Box sx={{ display: "flex", gap: 1 }}>
//                   <Button
//                     variant="contained"
//                     disabled={page === 0}
//                     onClick={() => setPage((p) => p - 1)}
//                     sx={purpleButtonStyle}
//                   >
//                     Previous
//                   </Button>
//                   <Typography
//                     component="span"
//                     sx={{
//                       p: "6px 16px",
//                       border: "1px solid #ddd",
//                       borderRadius: 1,
//                       display: "flex",
//                       alignItems: "center",
//                     }}
//                   >
//                     {page + 1}
//                   </Typography>
//                   <Button
//                     variant="contained"
//                     disabled={page >= totalPages - 1}
//                     onClick={() => setPage((p) => p + 1)}
//                     sx={purpleButtonStyle}
//                   >
//                     Next
//                   </Button>
//                 </Box>
//               </Box>
//             )}
//           </>
//         )}
//       </Paper>

//       {/* Add Modal */}
//       <Modal open={openModal} onClose={() => setOpenModal(false)}>
//         <Box sx={modalStyle} component="form" onSubmit={handleAddNewDivision}>
//           <Typography variant="h6" mb={2}>
//             Add New Division
//           </Typography>
//           <TextField
//             label="Division Name"
//             value={newDivision.name}
//             onChange={(e) =>
//               setNewDivision({ ...newDivision, name: e.target.value })
//             }
//             fullWidth
//             margin="normal"
//             required
//           />
//           <TextField
//             label="Division Code"
//             value={newDivision.code}
//             onChange={(e) =>
//               setNewDivision({ ...newDivision, code: e.target.value })
//             }
//             fullWidth
//             margin="normal"
//             required
//           />
//           <Box mt={3} display="flex" justifyContent="flex-end" gap={1}>
//             <Button onClick={() => setOpenModal(false)} variant="outlined">
//               Cancel
//             </Button>
//             <Button type="submit" variant="contained" sx={purpleButtonStyle}>
//               Add
//             </Button>
//           </Box>
//         </Box>
//       </Modal>

//       {/* Edit Modal */}
//       <Modal open={editModalOpen} onClose={() => setEditModalOpen(false)}>
//         <Box sx={modalStyle} component="form" onSubmit={handleEditSubmit}>
//           <Typography variant="h6" mb={2}>
//             Edit Division
//           </Typography>
//           {editDivision && (
//             <>
//               <TextField
//                 label="Division Name"
//                 value={editDivision.name}
//                 onChange={(e) =>
//                   setEditDivision({ ...editDivision, name: e.target.value })
//                 }
//                 fullWidth
//                 margin="normal"
//                 required
//               />
//               <TextField
//                 label="Division Code"
//                 value={editDivision.code}
//                 onChange={(e) =>
//                   setEditDivision({ ...editDivision, code: e.target.value })
//                 }
//                 fullWidth
//                 margin="normal"
//                 required
//               />
//             </>
//           )}
//           <Box mt={3} display="flex" justifyContent="flex-end" gap={1}>
//             <Button
//               onClick={() => setEditModalOpen(false)}
//               variant="outlined"
//             >
//               Cancel
//             </Button>
//             <Button type="submit" variant="contained" sx={purpleButtonStyle}>
//               Update
//             </Button>
//           </Box>
//         </Box>
//       </Modal>
//     </Container>
//   );
// }

// export default Division;







// import React, {
//     useState,
//     useEffect,
//     useMemo,
//     useCallback
// } from 'react';
// import axios from 'axios';
// import {
//     Container,
//     Paper,
//     Typography,
//     TextField,
//     Box,
//     Table,
//     TableBody,
//     TableCell,
//     TableContainer,
//     TableHead,
//     TableRow,
//     IconButton,
//     Button,
//     Dialog,
//     DialogActions,
//     DialogContent,
//     DialogTitle,
//     CircularProgress,
//     InputAdornment,
//     Skeleton,
//     TablePagination,
//     useTheme,
//     useMediaQuery,
// } from '@mui/material';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
// import Add from '@mui/icons-material/Add';
// import SearchIcon from '@mui/icons-material/Search'; // <-- CORRECTED THIS LINE
// import dayjs from 'dayjs';
// import Swal from 'sweetalert2';

// // --- UI STANDARDIZATION & COLOR SCHEME ---
// const THEME_COLORS = {
//     primary: '#8C257C',
//     primaryDark: '#6d1d60', // For hover
//     secondary: '#F58E35',
//     textOnPrimary: '#FFFFFF',
//     cancelButton: '#757575',
// };

// function Division() {
//     const [rows, setRows] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [page, setPage] = useState(0);
//     const [rowsPerPage, setRowsPerPage] = useState(5);
//     const [openAddDialog, setOpenAddDialog] = useState(false);
//     const [openEditDialog, setOpenEditDialog] = useState(false);
//     const [newDivision, setNewDivision] = useState({
//         name: '',
//         code: ''
//     });
//     const [editDivision, setEditDivision] = useState(null);
//     const [isSubmitting, setIsSubmitting] = useState(false);

//     const theme = useTheme();
//     const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

//     const API_URL = 'https://tdtlworld.com/hrms-backend/api/division/';

//     const fetchData = useCallback(async () => {
//         setLoading(true);
//         try {
//             const res = await axios.get(API_URL);
//             const sortedData = res.data.sort(
//                 (a, b) => new Date(b.created_at) - new Date(a.created_at)
//             );
//             const apiData = sortedData.map((d) => ({
//                 id: d.division_id,
//                 name: d.division_name || '',
//                 code: d.division_code || '',
//                 createdAt: d.created_at ?
//                     dayjs(d.created_at).format('DD-MM-YYYY') :
//                     '-',
//             }));
//             setRows(apiData);
//         } catch (error) {
//             console.error('GET API error:', error);
//             Swal.fire({
//                 icon: 'error',
//                 title: 'Fetch Error',
//                 text: 'Failed to fetch divisions from the server.',
//                 timer: 3000,
//                 showConfirmButton: false,
//             });
//         } finally {
//             setLoading(false);
//         }
//     }, []);

//     useEffect(() => {
//         fetchData();
//     }, [fetchData]);

//     const filteredRows = useMemo(() => {
//         if (!searchTerm) {
//             return rows;
//         }
//         return rows.filter(
//             (row) =>
//             row.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//             row.code.toLowerCase().includes(searchTerm.toLowerCase())
//         );
//     }, [rows, searchTerm]);

//     const paginatedRows = useMemo(() => {
//         return filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
//     }, [filteredRows, page, rowsPerPage]);

//     const handleAddNewDivision = async (e) => {
//         e.preventDefault();
//         if (!newDivision.name.trim() || !newDivision.code.trim()) {
//             Swal.fire({
//                 icon: 'error',
//                 title: 'Validation Error',
//                 text: 'All fields are required.',
//                 timer: 3000,
//                 showConfirmButton: false,
//             });
//             return;
//         }
//         setIsSubmitting(true);
//         try {
//             await axios.post(API_URL, {
//                 division_name: newDivision.name.trim(),
//                 division_code: newDivision.code.trim(),
//             });
//             Swal.fire({
//                 icon: 'success',
//                 title: 'Success!',
//                 text: 'Division added successfully.',
//                 timer: 3000,
//                 showConfirmButton: false,
//             });
//             setOpenAddDialog(false);
//             setNewDivision({
//                 name: '',
//                 code: ''
//             });
//             fetchData(); // Refresh data
//         } catch (err) {
//             console.error('POST error', err);
//             Swal.fire({
//                 icon: 'error',
//                 title: 'Submission Error',
//                 text: 'An error occurred while adding the division.',
//                 timer: 3000,
//                 showConfirmButton: false,
//             });
//         } finally {
//             setIsSubmitting(false);
//         }
//     };

//     const handleEditSubmit = async (e) => {
//         e.preventDefault();
//         if (!editDivision || !editDivision.name.trim() || !editDivision.code.trim()) {
//             Swal.fire({
//                 icon: 'error',
//                 title: 'Validation Error',
//                 text: 'All fields are required.',
//                 timer: 3000,
//                 showConfirmButton: false,
//             });
//             return;
//         }
//         setIsSubmitting(true);
//         try {
//             await axios.patch(`${API_URL}${editDivision.id}/`, {
//                 division_name: editDivision.name.trim(),
//                 division_code: editDivision.code.trim(),
//             });
//             Swal.fire({
//                 icon: 'success',
//                 title: 'Success!',
//                 text: 'Division updated successfully.',
//                 timer: 3000,
//                 showConfirmButton: false,
//             });
//             setOpenEditDialog(false);
//             setEditDivision(null);
//             fetchData(); // Refresh data
//         } catch (err) {
//             console.error('PATCH error', err);
//             Swal.fire({
//                 icon: 'error',
//                 title: 'Update Error',
//                 text: 'An error occurred while updating the division.',
//                 timer: 3000,
//                 showConfirmButton: false,
//             });
//         } finally {
//             setIsSubmitting(false);
//         }
//     };

//     const handleDeleteClick = (id) => {
//         Swal.fire({
//             title: 'Are you sure?',
//             text: "You won't be able to revert this!",
//             icon: 'warning',
//             showCancelButton: true,
//             confirmButtonColor: '#d33',
//             cancelButtonColor: '#3085d6',
//             confirmButtonText: 'Yes, delete it!',
//         }).then(async (result) => {
//             if (result.isConfirmed) {
//                 try {
//                     await axios.delete(`${API_URL}${id}/`);
//                     Swal.fire({
//                         icon: 'success',
//                         title: 'Deleted!',
//                         text: 'The division has been deleted.',
//                         timer: 3000,
//                         showConfirmButton: false,
//                     });
//                     fetchData(); // Refresh data
//                 } catch (err) {
//                     console.error('DELETE error', err);
//                     Swal.fire({
//                         icon: 'error',
//                         title: 'Deletion Error',
//                         text: 'An error occurred while deleting the division.',
//                         timer: 3000,
//                         showConfirmButton: false,
//                     });
//                 }
//             }
//         });
//     };

//     const handleChangePage = (event, newPage) => {
//         setPage(newPage);
//     };

//     const handleChangeRowsPerPage = (event) => {
//         setRowsPerPage(parseInt(event.target.value, 10));
//         setPage(0);
//     };

//     const handleOpenEditDialog = (row) => {
//         setEditDivision(row);
//         setOpenEditDialog(true);
//     };

//     return (
//         <Container maxWidth="lg" sx={{ mt: 2 }}>
//             <Box component={Paper} p={3}>
//                 <Typography
//                     variant="h4"
//                     sx={{
//                         color: THEME_COLORS.primary,
//                         fontWeight: 'bold',
//                         mb: 4,
//                     }}
//                 >
//                     Division 
//                 </Typography>

//                 <Box
//                     sx={{
//                         display: 'flex',
//                         flexDirection: isMobile ? 'column' : 'row',
//                         justifyContent: 'space-between',
//                         alignItems: isMobile ? 'stretch' : 'center',
//                         gap: 2,
//                         mb: 2,
//                     }}
//                 >
//                     <Button
//                         variant="contained"
//                         startIcon={<Add />}
//                         onClick={() => setOpenAddDialog(true)}
//                         sx={{
//                             backgroundColor: THEME_COLORS.primary,
//                             color: THEME_COLORS.textOnPrimary,
//                             '&:hover': { backgroundColor: THEME_COLORS.primaryDark },
//                         }}
//                     >
//                         Add New
//                     </Button>
//                     <TextField
//                         size="small"
//                         placeholder="Search..."
//                         value={searchTerm}
//                         onChange={(e) => {
//                             setSearchTerm(e.target.value);
//                             setPage(0);
//                         }}
//                         InputProps={{
//                             startAdornment: (
//                                 <InputAdornment position="start">
//                                     <SearchIcon />
//                                 </InputAdornment>
//                             ),
//                         }}
//                         sx={{ width: isMobile ? '100%' : 'auto' }}
//                     />
//                 </Box>

//                 <TableContainer>
//                     <Table sx={{ minWidth: '100%', whiteSpace: 'nowrap' }}>
//                         <TableHead sx={{ backgroundColor: THEME_COLORS.primary }}>
//                             <TableRow>
//                                 <TableCell sx={{ fontWeight: 'bold', color: THEME_COLORS.textOnPrimary }}>
//                                     SR. NO.
//                                 </TableCell>
//                                 <TableCell sx={{ fontWeight: 'bold', color: THEME_COLORS.textOnPrimary }}>
//                                     DIVISION NAME
//                                 </TableCell>
//                                 <TableCell sx={{ fontWeight: 'bold', color: THEME_COLORS.textOnPrimary }}>
//                                     DIVISION CODE
//                                 </TableCell>
//                                 <TableCell sx={{ fontWeight: 'bold', color: THEME_COLORS.textOnPrimary }}>
//                                     CREATED AT
//                                 </TableCell>
//                                 <TableCell align="center" sx={{ fontWeight: 'bold', color: THEME_COLORS.textOnPrimary }}>
//                                     ACTIONS
//                                 </TableCell>
//                             </TableRow>
//                         </TableHead>
//                         <TableBody>
//                             {loading ?
//                                 Array.from(new Array(rowsPerPage)).map((_, index) => (
//                                     <TableRow key={index}>
//                                         <TableCell><Skeleton variant="text" /></TableCell>
//                                         <TableCell><Skeleton variant="text" /></TableCell>
//                                         <TableCell><Skeleton variant="text" /></TableCell>
//                                         <TableCell><Skeleton variant="text" /></TableCell>
//                                         <TableCell align="center">
//                                             <Skeleton variant="rectangular" width={120} height={30} />
//                                         </TableCell>
//                                     </TableRow>
//                                 )) :
//                                 paginatedRows.length > 0 ?
//                                 paginatedRows.map((row, index) => (
//                                     <TableRow key={row.id} hover>
//                                         <TableCell sx={{ fontSize: '0.95rem' }}>{page * rowsPerPage + index + 1}</TableCell>
//                                         <TableCell sx={{ fontSize: '0.95rem' }}>{row.name}</TableCell>
//                                         <TableCell sx={{ fontSize: '0.95rem' }}>{row.code}</TableCell>
//                                         <TableCell sx={{ fontSize: '0.95rem' }}>{row.createdAt}</TableCell>
//                                         <TableCell>
//                                             <Box display="flex" justifyContent="center" gap={0.5}>
//                                                 <IconButton
//                                                     sx={{ color: THEME_COLORS.primary }}
//                                                     onClick={() => handleOpenEditDialog(row)}
//                                                 >
//                                                     <EditIcon />
//                                                 </IconButton>
//                                                 <IconButton
//                                                     color="error"
//                                                     onClick={() => handleDeleteClick(row.id)}
//                                                 >
//                                                     <DeleteIcon />
//                                                 </IconButton>
//                                             </Box>
//                                         </TableCell>
//                                     </TableRow>
//                                 )) :
//                                 (
//                                     <TableRow>
//                                         <TableCell colSpan={5} align="center">
//                                             No Divisions Found
//                                         </TableCell>
//                                     </TableRow>
//                                 )
//                             }
//                         </TableBody>
//                     </Table>
//                 </TableContainer>

//                 <Box
//                     sx={{
//                         display: 'flex',
//                         flexDirection: isMobile ? 'column' : 'row',
//                         justifyContent: 'space-between',
//                         alignItems: 'center',
//                         p: 2,
//                     }}
//                 >
//                     <Typography variant="body2" color="text.secondary">
//                         Showing {paginatedRows.length} of {filteredRows.length} results
//                     </Typography>
//                     <TablePagination
//                         rowsPerPageOptions={[5, 10, 15, 25]}
//                         component="div"
//                         count={filteredRows.length}
//                         rowsPerPage={rowsPerPage}
//                         page={page}
//                         onPageChange={handleChangePage}
//                         onRowsPerPageChange={handleChangeRowsPerPage}
//                         sx={{
//                             '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': {
//                                 color: THEME_COLORS.primary,
//                             },
//                             '& .MuiSvgIcon-root': {
//                                 color: THEME_COLORS.primary,
//                             },
//                         }}
//                     />
//                 </Box>
//             </Box>

//             {/* Add/Edit Dialogs */}
//             <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)} fullWidth maxWidth="sm">
//                 <DialogTitle sx={{ color: '#8C257C' , fontWeight: "bold", fontSize: '2rem' }}>
//                     Add New Division
//                 </DialogTitle>
//                 <DialogContent>
//                     <TextField
//                         label="Division Name"
//                         value={newDivision.name}
//                         onChange={(e) => setNewDivision({ ...newDivision, name: e.target.value })}
//                         fullWidth
//                         margin="normal"
//                         required
//                     />
//                     <TextField
//                         label="Division Code"
//                         value={newDivision.code}
//                         onChange={(e) => setNewDivision({ ...newDivision, code: e.target.value })}
//                         fullWidth
//                         margin="normal"
//                         required
//                     />
//                 </DialogContent>
//                 <DialogActions sx={{ p: '0 24px 16px' }}>
//                     <Button onClick={() => setOpenAddDialog(false)} sx={{ color: THEME_COLORS.cancelButton }}>
//                         Cancel
//                     </Button>
//                     <Button
//                         onClick={handleAddNewDivision}
//                         variant="contained"
//                         disabled={isSubmitting}
//                         sx={{
//                             backgroundColor: THEME_COLORS.primary,
//                             '&:hover': { backgroundColor: THEME_COLORS.primaryDark },
//                             color: THEME_COLORS.textOnPrimary,
//                         }}
//                     >
//                         {isSubmitting ? <CircularProgress size={24} color="inherit" /> : 'Save'}
//                     </Button>
//                 </DialogActions>
//             </Dialog>

//             <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)} fullWidth maxWidth="sm">
//                 <DialogTitle sx={{ color: THEME_COLORS.primary, fontWeight: 'bold' }}>
//                     Edit Division
//                 </DialogTitle>
//                 {editDivision && (
//                     <>
//                         <DialogContent>
//                             <TextField
//                                 label="Division Name"
//                                 value={editDivision.name}
//                                 onChange={(e) =>
//                                     setEditDivision({ ...editDivision, name: e.target.value })
//                                 }
//                                 fullWidth
//                                 margin="normal"
//                                 required
//                             />
//                             <TextField
//                                 label="Division Code"
//                                 value={editDivision.code}
//                                 onChange={(e) =>
//                                     setEditDivision({ ...editDivision, code: e.target.value })
//                                 }
//                                 fullWidth
//                                 margin="normal"
//                                 required
//                             />
//                         </DialogContent>
//                         <DialogActions sx={{ p: '0 24px 16px' }}>
//                             <Button onClick={() => setOpenEditDialog(false)} sx={{ color: THEME_COLORS.cancelButton }}>
//                                 Cancel
//                             </Button>
//                             <Button
//                                 onClick={handleEditSubmit}
//                                 variant="contained"
//                                 disabled={isSubmitting}
//                                 sx={{
//                                     backgroundColor: THEME_COLORS.primary,
//                                     '&:hover': { backgroundColor: THEME_COLORS.primaryDark },
//                                     color: THEME_COLORS.textOnPrimary,
//                                 }}
//                             >
//                                 {isSubmitting ? (
//                                     <CircularProgress size={24} color="inherit" />
//                                 ) : (
//                                     'Update'
//                                 )}
//                             </Button>
//                         </DialogActions>
//                     </>
//                 )}
//             </Dialog>
//         </Container>
//     );
// }

// export default Division;







import React, {
    useState,
    useEffect,
    useMemo,
    useCallback
} from 'react';
import axios from 'axios';
import {
    Container,
    Paper,
    Typography,
    TextField,
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    IconButton,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    CircularProgress,
    InputAdornment,
    Skeleton,
    // --- START: Imports for new pagination ---
    Pagination,
    FormControl,
    Select,
    MenuItem,
    // --- END: Imports for new pagination ---
    useTheme,
    useMediaQuery,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Add from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import dayjs from 'dayjs';
import Swal from 'sweetalert2';

// --- UI STANDARDIZATION & COLOR SCHEME ---
const THEME_COLORS = {
    primary: '#8C257C',
    primaryDark: '#6d1d60', // For hover
    secondary: '#F58E35',
    textOnPrimary: '#FFFFFF',
    cancelButton: '#757575',
};

function Division() {
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [openAddDialog, setOpenAddDialog] = useState(false);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [newDivision, setNewDivision] = useState({
        name: '',
        code: ''
    });
    const [editDivision, setEditDivision] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const API_URL = 'https://tdtlworld.com/hrms-backend/api/division/';

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const res = await axios.get(API_URL);
            const sortedData = res.data.sort(
                (a, b) => new Date(b.created_at) - new Date(a.created_at)
            );
            const apiData = sortedData.map((d) => ({
                id: d.division_id,
                name: d.division_name || '',
                code: d.division_code || '',
                createdAt: d.created_at ?
                    dayjs(d.created_at).format('DD-MM-YYYY') :
                    '-',
            }));
            setRows(apiData);
        } catch (error) {
            console.error('GET API error:', error);
            Swal.fire({
                icon: 'error',
                title: 'Fetch Error',
                text: 'Failed to fetch divisions from the server.',
                timer: 3000,
                showConfirmButton: false,
            });
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const filteredRows = useMemo(() => {
        if (!searchTerm) {
            return rows;
        }
        return rows.filter(
            (row) =>
            row.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            row.code.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [rows, searchTerm]);

    const paginatedRows = useMemo(() => {
        return filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    }, [filteredRows, page, rowsPerPage]);

    // --- START: Calculation for 'Showing X to Y' text ---
    const startEntry = filteredRows.length > 0 ? page * rowsPerPage + 1 : 0;
    const endEntry = Math.min((page + 1) * rowsPerPage, filteredRows.length);
    // --- END: Calculation for 'Showing X to Y' text ---

    const handleAddNewDivision = async (e) => {
        e.preventDefault();
        if (!newDivision.name.trim() || !newDivision.code.trim()) {
            Swal.fire({
                icon: 'error',
                title: 'Validation Error',
                text: 'All fields are required.',
                timer: 3000,
                showConfirmButton: false,
            });
            return;
        }
        setIsSubmitting(true);
        try {
            await axios.post(API_URL, {
                division_name: newDivision.name.trim(),
                division_code: newDivision.code.trim(),
            });
            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'Division added successfully.',
                timer: 3000,
                showConfirmButton: false,
            });
            setOpenAddDialog(false);
            setNewDivision({
                name: '',
                code: ''
            });
            fetchData(); // Refresh data
        } catch (err) {
            console.error('POST error', err);
            Swal.fire({
                icon: 'error',
                title: 'Submission Error',
                text: 'An error occurred while adding the division.',
                timer: 3000,
                showConfirmButton: false,
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        if (!editDivision || !editDivision.name.trim() || !editDivision.code.trim()) {
            Swal.fire({
                icon: 'error',
                title: 'Validation Error',
                text: 'All fields are required.',
                timer: 3000,
                showConfirmButton: false,
            });
            return;
        }
        setIsSubmitting(true);
        try {
            await axios.patch(`${API_URL}${editDivision.id}/`, {
                division_name: editDivision.name.trim(),
                division_code: editDivision.code.trim(),
            });
            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'Division updated successfully.',
                timer: 3000,
                showConfirmButton: false,
            });
            setOpenEditDialog(false);
            setEditDivision(null);
            fetchData(); // Refresh data
        } catch (err) {
            console.error('PATCH error', err);
            Swal.fire({
                icon: 'error',
                title: 'Update Error',
                text: 'An error occurred while updating the division.',
                timer: 3000,
                showConfirmButton: false,
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDeleteClick = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete(`${API_URL}${id}/`);
                    Swal.fire({
                        icon: 'success',
                        title: 'Deleted!',
                        text: 'The division has been deleted.',
                        timer: 3000,
                        showConfirmButton: false,
                    });
                    fetchData(); // Refresh data
                } catch (err) {
                    console.error('DELETE error', err);
                    Swal.fire({
                        icon: 'error',
                        title: 'Deletion Error',
                        text: 'An error occurred while deleting the division.',
                        timer: 3000,
                        showConfirmButton: false,
                    });
                }
            }
        });
    };

    // --- START: Handlers for new pagination ---
    const handlePaginationChange = (event, newPage) => {
        setPage(newPage - 1); // MUI Pagination is 1-based, array is 0-based
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    // --- END: Handlers for new pagination ---

    const handleOpenEditDialog = (row) => {
        setEditDivision(row);
        setOpenEditDialog(true);
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 2 }}>
            <Box component={Paper} p={3}>
                <Typography
                    variant="h4"
                    sx={{
                        color: THEME_COLORS.primary,
                        fontWeight: 'bold',
                        mb: 4,
                    }}
                >
                    Division 
                </Typography>

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: isMobile ? 'column' : 'row',
                        justifyContent: 'space-between',
                        alignItems: isMobile ? 'stretch' : 'center',
                        gap: 2,
                        mb: 2,
                    }}
                >
                    <Button
                        variant="contained"
                        startIcon={<Add />}
                        onClick={() => setOpenAddDialog(true)}
                        sx={{
                            backgroundColor: THEME_COLORS.primary,
                            color: THEME_COLORS.textOnPrimary,
                            '&:hover': { backgroundColor: THEME_COLORS.primaryDark },
                        }}
                    >
                        Add New
                    </Button>
                    <TextField
                        size="small"
                        placeholder="Search..."
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
                        sx={{ width: isMobile ? '100%' : 'auto' }}
                    />
                </Box>

                <TableContainer>
                    <Table sx={{ minWidth: '100%', whiteSpace: 'nowrap' }}>
                        <TableHead sx={{ backgroundColor: THEME_COLORS.primary }}>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 'bold', color: THEME_COLORS.textOnPrimary }}>
                                    SR. NO.
                                </TableCell>
                                <TableCell sx={{ fontWeight: 'bold', color: THEME_COLORS.textOnPrimary }}>
                                    DIVISION NAME
                                </TableCell>
                                <TableCell sx={{ fontWeight: 'bold', color: THEME_COLORS.textOnPrimary }}>
                                    DIVISION CODE
                                </TableCell>
                                <TableCell sx={{ fontWeight: 'bold', color: THEME_COLORS.textOnPrimary }}>
                                    CREATED AT
                                </TableCell>
                                <TableCell align="center" sx={{ fontWeight: 'bold', color: THEME_COLORS.textOnPrimary }}>
                                    ACTIONS
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {loading ?
                                Array.from(new Array(rowsPerPage)).map((_, index) => (
                                    <TableRow key={index}>
                                        <TableCell><Skeleton variant="text" /></TableCell>
                                        <TableCell><Skeleton variant="text" /></TableCell>
                                        <TableCell><Skeleton variant="text" /></TableCell>
                                        <TableCell><Skeleton variant="text" /></TableCell>
                                        <TableCell align="center">
                                            <Skeleton variant="rectangular" width={120} height={30} />
                                        </TableCell>
                                    </TableRow>
                                )) :
                                paginatedRows.length > 0 ?
                                paginatedRows.map((row, index) => (
                                    <TableRow key={row.id} hover>
                                        <TableCell sx={{ fontSize: '0.95rem' }}>{page * rowsPerPage + index + 1}</TableCell>
                                        <TableCell sx={{ fontSize: '0.95rem' }}>{row.name}</TableCell>
                                        <TableCell sx={{ fontSize: '0.95rem' }}>{row.code}</TableCell>
                                        <TableCell sx={{ fontSize: '0.95rem' }}>{row.createdAt}</TableCell>
                                        <TableCell>
                                            <Box display="flex" justifyContent="center" gap={0.5}>
                                                <IconButton
                                                    sx={{ color: THEME_COLORS.primary }}
                                                    onClick={() => handleOpenEditDialog(row)}
                                                >
                                                    <EditIcon />
                                                </IconButton>
                                                <IconButton
                                                    color="error"
                                                    onClick={() => handleDeleteClick(row.id)}
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                )) :
                                (
                                    <TableRow>
                                        <TableCell colSpan={5} align="center">
                                            No Divisions Found
                                        </TableCell>
                                    </TableRow>
                                )
                            }
                        </TableBody>
                    </Table>
                </TableContainer>

                {/* --- START: New Styled Pagination (Replaces TablePagination) --- */}
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
                                            backgroundColor: THEME_COLORS.primary,
                                            color: 'white',
                                            borderRadius: '4px',
                                            '&:hover': { backgroundColor: THEME_COLORS.primaryDark },
                                            '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                                            '& .MuiSvgIcon-root': { color: 'white' },
                                        }}
                                    >
                                        {[5, 10, 15, 25].map((value) => ( <MenuItem key={value} value={value}>{value}</MenuItem> ))}
                                    </Select>
                                </FormControl>
                                <Typography variant="body2" color="text.secondary">
                                   {`Showing ${startEntry} to ${endEntry} of ${filteredRows.length} results`}
                                </Typography>
                            </Box>
                            <Pagination
                                count={Math.ceil(filteredRows.length / rowsPerPage)}
                                page={page + 1}
                                onChange={handlePaginationChange}
                                showFirstButton showLastButton
                                sx={{
                                    '& .MuiPaginationItem-root:hover': { backgroundColor: THEME_COLORS.secondary, color: 'white' },
                                    '& .MuiPaginationItem-page': {
                                        color: THEME_COLORS.primary,
                                        '&.Mui-selected': {
                                            backgroundColor: THEME_COLORS.primary,
                                            color: 'white',
                                            '&:hover': { backgroundColor: THEME_COLORS.secondary }
                                        },
                                    },
                                    '& .MuiPaginationItem-icon': { color: THEME_COLORS.primary }
                                }}
                            />
                        </Box>
                    )}
                </Box>
                {/* --- END: New Styled Pagination --- */}

            </Box>

            {/* Add/Edit Dialogs */}
            <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)} fullWidth maxWidth="sm">
                <DialogTitle sx={{ color: '#8C257C' , fontWeight: "bold", fontSize: '2rem' }}>
                    Add New Division
                </DialogTitle>
                <DialogContent>
                    <TextField
                        label="Division Name"
                        value={newDivision.name}
                        onChange={(e) => setNewDivision({ ...newDivision, name: e.target.value })}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        label="Division Code"
                        value={newDivision.code}
                        onChange={(e) => setNewDivision({ ...newDivision, code: e.target.value })}
                        fullWidth
                        margin="normal"
                        required
                    />
                </DialogContent>
                <DialogActions sx={{ p: '0 24px 16px' }}>
                    <Button onClick={() => setOpenAddDialog(false)} sx={{ color: THEME_COLORS.cancelButton }}>
                        Cancel
                    </Button>
                    <Button
                        onClick={handleAddNewDivision}
                        variant="contained"
                        disabled={isSubmitting}
                        sx={{
                            backgroundColor: THEME_COLORS.primary,
                            '&:hover': { backgroundColor: THEME_COLORS.primaryDark },
                            color: THEME_COLORS.textOnPrimary,
                        }}
                    >
                        {isSubmitting ? <CircularProgress size={24} color="inherit" /> : 'Save'}
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)} fullWidth maxWidth="sm">
                <DialogTitle sx={{ color: THEME_COLORS.primary, fontWeight: 'bold' }}>
                    Edit Division
                </DialogTitle>
                {editDivision && (
                    <>
                        <DialogContent>
                            <TextField
                                label="Division Name"
                                value={editDivision.name}
                                onChange={(e) =>
                                    setEditDivision({ ...editDivision, name: e.target.value })
                                }
                                fullWidth
                                margin="normal"
                                required
                            />
                            <TextField
                                label="Division Code"
                                value={editDivision.code}
                                onChange={(e) =>
                                    setEditDivision({ ...editDivision, code: e.target.value })
                                }
                                fullWidth
                                margin="normal"
                                required
                            />
                        </DialogContent>
                        <DialogActions sx={{ p: '0 24px 16px' }}>
                            <Button onClick={() => setOpenEditDialog(false)} sx={{ color: THEME_COLORS.cancelButton }}>
                                Cancel
                            </Button>
                            <Button
                                onClick={handleEditSubmit}
                                variant="contained"
                                disabled={isSubmitting}
                                sx={{
                                    backgroundColor: THEME_COLORS.primary,
                                    '&:hover': { backgroundColor: THEME_COLORS.primaryDark },
                                    color: THEME_COLORS.textOnPrimary,
                                }}
                            >
                                {isSubmitting ? (
                                    <CircularProgress size={24} color="inherit" />
                                ) : (
                                    'Update'
                                )}
                            </Button>
                        </DialogActions>
                    </>
                )}
            </Dialog>
        </Container>
    );
}

export default Division;