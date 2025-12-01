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
//   CircularProgress, // Added for loading state
//   FormControl,      // Added for select control
// } from "@mui/material";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import AddIcon from "@mui/icons-material/Add";
// import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

// const modalStyle = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 400,
//   bgcolor: "background.paper",
//   border: "1px solid #ddd",
//   boxShadow: 24,
//   borderRadius: 2,
//   p: 4,
// };

// // --- NEW: Utility function for formatting date for display ---
// const formatDisplayDate = (dateString) => {
//   if (!dateString) return "-";
//   try {
//     const date = new Date(dateString);
//     if (isNaN(date.getTime())) return dateString; // Return original if invalid
//     const day = date.getDate().toString().padStart(2, "0");
//     const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Month is 0-indexed
//     const year = date.getFullYear();
//     return `${day}-${month}-${year}`;
//   } catch (error) {
//     return dateString;
//   }
// };

// function Grade() {
//   const [grades, setGrades] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [openModal, setOpenModal] = useState(false);
//   const [newGrade, setNewGrade] = useState({ grade_name: "", grade_code: "" });
//   const [editModalOpen, setEditModalOpen] = useState(false);
//   const [editGrade, setEditGrade] = useState(null);
//   const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
//   const [deleteId, setDeleteId] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [firstLoad, setFirstLoad] = useState(true);

//   const fetchGrades = async () => {
//     if (firstLoad) setIsLoading(true);
//     try {
//       const res = await axios.get("https://tdtlworld.com/hrms-backend/api/grade/");
//       setGrades(res.data);
//     } catch (error) {
//       console.error("Error fetching grades:", error);
//     } finally {
//       setIsLoading(false);
//       setFirstLoad(false);
//     }
//   };

//   useEffect(() => {
//     fetchGrades();
//   }, []);

//   const handleOpenModal = () => setOpenModal(true);
//   const handleCloseModal = () => setOpenModal(false);

//   const handleAddNewGrade = async (e) => {
//     e.preventDefault();
//     try {
//       const payload = {
//         grade_name: newGrade.grade_name,
//         grade_code: newGrade.grade_code,
//       };

//       await axios.post("https://tdtlworld.com/hrms-backend/api/grade/", payload, {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });

//       setNewGrade({ grade_name: "", grade_code: "" });
//       handleCloseModal();
//       fetchGrades();
//     } catch (error) {
//       console.error("Error adding grade:", error.response?.data || error.message);
//       alert("Failed to add grade. Please check input or try again.");
//     }
//   };

//   const handleDeleteClick = (id) => {
//     setDeleteId(id);
//     setDeleteDialogOpen(true);
//   };

//   const handleDeleteConfirm = async () => {
//     try {
//       await axios.delete(`https://tdtlworld.com/hrms-backend/api/grade/${deleteId}/`);
//       setDeleteDialogOpen(false);
//       fetchGrades();
//     } catch (error) {
//       console.error("Error deleting grade:", error);
//       alert("Failed to delete grade.");
//     }
//   };

//   const handleEditClick = (row) => {
//     setEditGrade(row);
//     setEditModalOpen(true);
//   };

//   const handleEditSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.patch(
//         `https://tdtlworld.com/hrms-backend/api/grade/${editGrade.grade_id}/`,
//         {
//           grade_name: editGrade.grade_name,
//           grade_code: editGrade.grade_code,
//         }
//       );
//       setEditModalOpen(false);
//       fetchGrades();
//     } catch (error) {
//       console.error("Error editing grade:", error);
//       alert("Failed to update grade.");
//     }
//   };

//   const filteredGrades = useMemo(() => {
//     return grades.filter((g) =>
//       g?.grade_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       g?.grade_code?.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//   }, [grades, searchTerm]);

//   const paginatedGrades = useMemo(() => {
//     return filteredGrades.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
//   }, [filteredGrades, page, rowsPerPage]);

//   const totalPages = Math.ceil(filteredGrades.length / rowsPerPage);

//   // --- NEW: Reusable purple button style ---
//   const purpleButtonStyle = {
//     backgroundColor: "#673ab7",
//     color: "#fff",
//     "&:hover": { backgroundColor: "#5e35b1" },
//   };

//   return (
//     <>
//       <Container maxWidth="lg" sx={{ mt: 2 }}>
//         <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
//           <Box
//             sx={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//               mb: 2
//             }}
//           >
//             <Typography variant="h5" sx={{ fontWeight: "bold" }}>Grade Management</Typography>
//             {/* --- UPDATED: Button color --- */}
//             <Button variant="contained" sx={purpleButtonStyle} startIcon={<AddIcon />} onClick={handleOpenModal}>
//               Add Grade
//             </Button>
//           </Box>

//           <Box sx={{ mb: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//             <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//               <Typography>Show</Typography>
//               <FormControl size="small">
//                 <Select
//                   value={rowsPerPage}
//                   onChange={(e) => {
//                     setRowsPerPage(parseInt(e.target.value, 10));
//                     setPage(0);
//                   }}
//                 >
//                   <MenuItem value={10}>10</MenuItem>
//                   <MenuItem value={25}>25</MenuItem>
//                   <MenuItem value={50}>50</MenuItem>
//                 </Select>
//               </FormControl>
//               <Typography>entries</Typography>
//             </Box>

//             <TextField
//               label="Search"
//               variant="outlined"
//               size="small"
//               value={searchTerm}
//               onChange={(e) => {
//                 setSearchTerm(e.target.value);
//                 setPage(0);
//               }}
//             />
//           </Box>

//           <TableContainer>
//             <Table>
//               {/* --- UPDATED: Table Head style --- */}
//               <TableHead>
//                 <TableRow>
//                   {/* --- NEW: SR. NO. Column --- */}
//                   <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#e3f2fd', width: '80px' }}>SR. NO.</TableCell>
//                   <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#e3f2fd' }}>GRADE NAME</TableCell>
//                   <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#e3f2fd' }}>GRADE CODE</TableCell>
//                   <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#e3f2fd' }}>
//                     <CalendarTodayIcon sx={{ fontSize: 16, mr: 0.5, verticalAlign: 'middle' }} />
//                     CREATED DATE
//                   </TableCell>
//                   <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#e3f2fd' }}>ACTIONS</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {isLoading ? (
//                   <TableRow>
//                     {/* --- UPDATED: Colspan and loading indicator --- */}
//                     <TableCell colSpan={5} align="center">
//                       <CircularProgress />
//                     </TableCell>
//                   </TableRow>
//                 ) : paginatedGrades.length > 0 ? (
//                   paginatedGrades.map((g, index) => (
//                     <TableRow key={g.grade_id}>
//                       {/* --- NEW: SR. NO. Cell with correct calculation --- */}
//                       <TableCell>{page * rowsPerPage + index + 1}</TableCell>
//                       <TableCell>{g.grade_name}</TableCell>
//                       <TableCell>{g.grade_code}</TableCell>
//                       {/* --- UPDATED: Use date formatting function --- */}
//                       <TableCell>{formatDisplayDate(g.created_date)}</TableCell>
//                       <TableCell>
//                         {/* --- UPDATED: Edit icon color --- */}
//                         <IconButton size="small" sx={{ color: '#673ab7' }} onClick={() => handleEditClick(g)}>
//                           <EditIcon />
//                         </IconButton>
//                         <IconButton size="small" color="error" onClick={() => handleDeleteClick(g.grade_id)}>
//                           <DeleteIcon />
//                         </IconButton>
//                       </TableCell>
//                     </TableRow>
//                   ))
//                 ) : (
//                   <TableRow>
//                     {/* --- UPDATED: Colspan increased --- */}
//                     <TableCell colSpan={5} align="center">
//                       No data found.
//                     </TableCell>
//                   </TableRow>
//                 )}
//               </TableBody>
//             </Table>
//           </TableContainer>

//           {filteredGrades.length > 0 && (
//             <Box sx={{ p: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//               <Typography variant="body2">
//                 Showing {paginatedGrades.length > 0 ? page * rowsPerPage + 1 : 0} to {Math.min((page + 1) * rowsPerPage, filteredGrades.length)} of {filteredGrades.length} records
//               </Typography>
//               <Box sx={{ display: 'flex', gap: 1 }}>
//                 {/* --- UPDATED: Pagination button colors --- */}
//                 <Button variant="contained" disabled={page === 0} onClick={() => setPage((p) => p - 1)} sx={purpleButtonStyle}>
//                   Previous
//                 </Button>
//                 <Typography component="span" sx={{ p: '6px 16px' }}>
//                   {page + 1}
//                 </Typography>
//                 <Button
//                   variant="contained"
//                   disabled={page >= totalPages - 1}
//                   onClick={() => setPage((p) => p + 1)}
//                   sx={purpleButtonStyle}
//                 >
//                   Next
//                 </Button>
//               </Box>
//             </Box>
//           )}
//         </Paper>
//       </Container>

//       {/* Add Modal */}
//       <Modal open={openModal} onClose={handleCloseModal}>
//         <Box sx={modalStyle} component="form" onSubmit={handleAddNewGrade}>
//           <Typography variant="h6" sx={{ mb: 2 }}>
//             Add New Grade
//           </Typography>
//           <TextField
//             label="Grade Name"
//             value={newGrade.grade_name}
//             onChange={(e) => setNewGrade({ ...newGrade, grade_name: e.target.value })}
//             fullWidth
//             margin="normal"
//             required
//           />
//           <TextField
//             label="Grade Code"
//             value={newGrade.grade_code}
//             onChange={(e) => setNewGrade({ ...newGrade, grade_code: e.target.value })}
//             fullWidth
//             margin="normal"
//             required
//           />
//           <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end", gap: 1 }}>
//             <Button onClick={handleCloseModal} variant="outlined">
//               Cancel
//             </Button>
//             {/* --- UPDATED: Button color --- */}
//             <Button type="submit" variant="contained" sx={purpleButtonStyle}>
//               Add
//             </Button>
//           </Box>
//         </Box>
//       </Modal>

//       {/* Edit Modal */}
//       <Modal open={editModalOpen} onClose={() => setEditModalOpen(false)}>
//         <Box sx={modalStyle} component="form" onSubmit={handleEditSubmit}>
//           <Typography variant="h6" sx={{ mb: 2 }}>
//             Edit Grade
//           </Typography>
//           <TextField
//             label="Grade Name"
//             value={editGrade?.grade_name || ""}
//             onChange={(e) => setEditGrade({ ...editGrade, grade_name: e.target.value })}
//             fullWidth
//             margin="normal"
//             required
//           />
//           <TextField
//             label="Grade Code"
//             value={editGrade?.grade_code || ""}
//             onChange={(e) => setEditGrade({ ...editGrade, grade_code: e.target.value })}
//             fullWidth
//             margin="normal"
//             required
//           />
//           <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end", gap: 1 }}>
//             <Button onClick={() => setEditModalOpen(false)} variant="outlined">
//               Cancel
//             </Button>
//             {/* --- UPDATED: Button color --- */}
//             <Button type="submit" variant="contained" sx={purpleButtonStyle}>
//               Save
//             </Button>
//           </Box>
//         </Box>
//       </Modal>

//       {/* Delete Dialog */}
//       <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
//         <DialogTitle>Confirm Delete</DialogTitle>
//         <DialogContent>
//           <DialogContentText> Are you sure you want to delete this grade? This action cannot be undone.</DialogContentText>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
//           <Button color="error" onClick={handleDeleteConfirm}>
//             Delete
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </>
//   );
// }

// export default Grade;
















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
//   InputLabel, // Added for better form control accessibility
// } from "@mui/material";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import AddIcon from "@mui/icons-material/Add";
// import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

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

// // Utility function for formatting date for display
// const formatDisplayDate = (dateString) => {
//   if (!dateString) return "-";
//   try {
//     const date = new Date(dateString);
//     if (isNaN(date.getTime())) return dateString;
//     const day = date.getDate().toString().padStart(2, "0");
//     const month = (date.getMonth() + 1).toString().padStart(2, "0");
//     const year = date.getFullYear();
//     return `${day}-${month}-${year}`;
//   } catch (error) {
//     return dateString;
//   }
// };

// function Grade() {
//   const [grades, setGrades] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [openModal, setOpenModal] = useState(false);
//   const [newGrade, setNewGrade] = useState({ grade_name: "", grade_code: "" });
//   const [editModalOpen, setEditModalOpen] = useState(false);
//   const [editGrade, setEditGrade] = useState(null);
//   const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
//   const [deleteId, setDeleteId] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [firstLoad, setFirstLoad] = useState(true);

//   const fetchGrades = async () => {
//     if (firstLoad) setIsLoading(true);
//     try {
//       const res = await axios.get(
//         "https://tdtlworld.com/hrms-backend/api/grade/"
//       );
//       // Sorting by created_date descending to show newest first
//       const sortedData = res.data.sort(
//         (a, b) => new Date(b.created_date) - new Date(a.created_date)
//       );
//       setGrades(sortedData);
//     } catch (error) {
//       console.error("Error fetching grades:", error);
//     } finally {
//       setIsLoading(false);
//       setFirstLoad(false);
//     }
//   };

//   useEffect(() => {
//     fetchGrades();
//     // The empty dependency array ensures this runs only once on mount.
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   const handleOpenModal = () => setOpenModal(true);
//   const handleCloseModal = () => setOpenModal(false);

//   const handleAddNewGrade = async (e) => {
//     e.preventDefault();
//     try {
//       const payload = {
//         grade_name: newGrade.grade_name,
//         grade_code: newGrade.grade_code,
//       };

//       await axios.post(
//         "https://tdtlworld.com/hrms-backend/api/grade/",
//         payload,
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       setNewGrade({ grade_name: "", grade_code: "" });
//       handleCloseModal();
//       fetchGrades();
//     } catch (error) {
//       console.error(
//         "Error adding grade:",
//         error.response?.data || error.message
//       );
//       alert("Failed to add grade. Please check input or try again.");
//     }
//   };

//   const handleDeleteClick = (id) => {
//     setDeleteId(id);
//     setDeleteDialogOpen(true);
//   };

//   const handleDeleteConfirm = async () => {
//     try {
//       await axios.delete(
//         `https://tdtlworld.com/hrms-backend/api/grade/${deleteId}/`
//       );
//       setDeleteDialogOpen(false);
//       fetchGrades();
//     } catch (error) {
//       console.error("Error deleting grade:", error);
//       alert("Failed to delete grade.");
//     }
//   };

//   const handleEditClick = (row) => {
//     setEditGrade(row);
//     setEditModalOpen(true);
//   };

//   const handleEditSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.patch(
//         `https://tdtlworld.com/hrms-backend/api/grade/${editGrade.grade_id}/`,
//         {
//           grade_name: editGrade.grade_name,
//           grade_code: editGrade.grade_code,
//         }
//       );
//       setEditModalOpen(false);
//       fetchGrades();
//     } catch (error) {
//       console.error("Error editing grade:", error);
//       alert("Failed to update grade.");
//     }
//   };

//   const filteredGrades = useMemo(() => {
//     return grades.filter(
//       (g) =>
//         g?.grade_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         g?.grade_code?.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//   }, [grades, searchTerm]);

//   const paginatedGrades = useMemo(() => {
//     return filteredGrades.slice(
//       page * rowsPerPage,
//       page * rowsPerPage + rowsPerPage
//     );
//   }, [filteredGrades, page, rowsPerPage]);

//   const totalPages = Math.ceil(filteredGrades.length / rowsPerPage);

//   const purpleButtonStyle = {
//     backgroundColor: "#673ab7",
//     color: "#fff",
//     "&:hover": { backgroundColor: "#5e35b1" },
//   };

//   return (
//     <>
//       <Container maxWidth="lg" sx={{ mt: 2 }}>
//         {/* RESPONSIVE CHANGE: Added responsive padding */}
//         <Paper elevation={3} sx={{ p: { xs: 2, md: 3 }, borderRadius: 2 }}>
//           {/* RESPONSIVE CHANGE: Header now stacks on mobile */}
//           <Box
//             sx={{
//               display: "flex",
//               flexDirection: { xs: "column", sm: "row" },
//               justifyContent: "space-between",
//               alignItems: { xs: "flex-start", sm: "center" },
//               mb: 2,
//               gap: 2,
//             }}
//           >
//             <Typography variant="h5" sx={{ fontWeight: "bold" }}>
//               Grade Management
//             </Typography>
//             <Button
//               variant="contained"
//               sx={{ ...purpleButtonStyle, width: { xs: "100%", sm: "auto" } }}
//               startIcon={<AddIcon />}
//               onClick={handleOpenModal}
//             >
//               Add Grade
//             </Button>
//           </Box>

//           {/* RESPONSIVE CHANGE: Controls now stack on mobile */}
//           <Box
//             sx={{
//               mb: 2,
//               display: "flex",
//               flexDirection: { xs: "column", md: "row" },
//               justifyContent: "space-between",
//               alignItems: { xs: "stretch", md: "center" },
//               gap: 2,
//             }}
//           >
//             <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//               <Typography>Show</Typography>
//               <FormControl size="small" sx={{ minWidth: 70 }}>
//                 <Select
//                   value={rowsPerPage}
//                   onChange={(e) => {
//                     setRowsPerPage(parseInt(e.target.value, 10));
//                     setPage(0);
//                   }}
//                 >
//                   <MenuItem value={10}>10</MenuItem>
//                   <MenuItem value={25}>25</MenuItem>
//                   <MenuItem value={50}>50</MenuItem>
//                 </Select>
//               </FormControl>
//               <Typography>entries</Typography>
//             </Box>

//             <TextField
//               label="Search"
//               variant="outlined"
//               size="small"
//               value={searchTerm}
//               onChange={(e) => {
//                 setSearchTerm(e.target.value);
//                 setPage(0);
//               }}
//             />
//           </Box>

//           {/* RESPONSIVE CHANGE: TableContainer makes table scrollable */}
//           <TableContainer>
//             <Table>
//               <TableHead>
//                 <TableRow>
//                   {/* RESPONSIVE CHANGE: 'whiteSpace: nowrap' for better scrolling */}
//                   <TableCell
//                     sx={{
//                       fontWeight: "bold",
//                       backgroundColor: "#e3f2fd",
//                       whiteSpace: "nowrap",
//                     }}
//                   >
//                     SR. NO.
//                   </TableCell>
//                   <TableCell
//                     sx={{
//                       fontWeight: "bold",
//                       backgroundColor: "#e3f2fd",
//                       whiteSpace: "nowrap",
//                     }}
//                   >
//                     GRADE NAME
//                   </TableCell>
//                   <TableCell
//                     sx={{
//                       fontWeight: "bold",
//                       backgroundColor: "#e3f2fd",
//                       whiteSpace: "nowrap",
//                     }}
//                   >
//                     GRADE CODE
//                   </TableCell>
//                   <TableCell
//                     sx={{
//                       fontWeight: "bold",
//                       backgroundColor: "#e3f2fd",
//                       whiteSpace: "nowrap",
//                     }}
//                   >
//                     <CalendarTodayIcon
//                       sx={{ fontSize: 16, mr: 0.5, verticalAlign: "middle" }}
//                     />
//                     CREATED DATE
//                   </TableCell>
//                   <TableCell
//                     sx={{
//                       fontWeight: "bold",
//                       backgroundColor: "#e3f2fd",
//                       whiteSpace: "nowrap",
//                     }}
//                   >
//                     ACTIONS
//                   </TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {isLoading ? (
//                   <TableRow>
//                     <TableCell colSpan={5} align="center">
//                       <CircularProgress />
//                     </TableCell>
//                   </TableRow>
//                 ) : paginatedGrades.length > 0 ? (
//                   paginatedGrades.map((g, index) => (
//                     <TableRow key={g.grade_id}>
//                       <TableCell>{page * rowsPerPage + index + 1}</TableCell>
//                       <TableCell>{g.grade_name}</TableCell>
//                       <TableCell>{g.grade_code}</TableCell>
//                       <TableCell>{formatDisplayDate(g.created_date)}</TableCell>
//                       <TableCell>
//                         <IconButton
//                           size="small"
//                           sx={{ color: "#673ab7" }}
//                           onClick={() => handleEditClick(g)}
//                         >
//                           <EditIcon />
//                         </IconButton>
//                         <IconButton
//                           size="small"
//                           color="error"
//                           onClick={() => handleDeleteClick(g.grade_id)}
//                         >
//                           <DeleteIcon />
//                         </IconButton>
//                       </TableCell>
//                     </TableRow>
//                   ))
//                 ) : (
//                   <TableRow>
//                     <TableCell colSpan={5} align="center">
//                       No data found.
//                     </TableCell>
//                   </TableRow>
//                 )}
//               </TableBody>
//             </Table>
//           </TableContainer>

//           {filteredGrades.length > 0 && (
//             // RESPONSIVE CHANGE: Pagination stacks and centers on mobile
//             <Box
//               sx={{
//                 p: 2,
//                 display: "flex",
//                 flexDirection: { xs: "column", sm: "row" },
//                 justifyContent: "space-between",
//                 alignItems: "center",
//                 gap: 2,
//               }}
//             >
//               <Typography variant="body2">
//                 Showing{" "}
//                 {paginatedGrades.length > 0 ? page * rowsPerPage + 1 : 0} to{" "}
//                 {Math.min((page + 1) * rowsPerPage, filteredGrades.length)} of{" "}
//                 {filteredGrades.length} records
//               </Typography>
//               <Box sx={{ display: "flex", gap: 1 }}>
//                 <Button
//                   variant="contained"
//                   disabled={page === 0}
//                   onClick={() => setPage((p) => p - 1)}
//                   sx={purpleButtonStyle}
//                 >
//                   Previous
//                 </Button>
//                 <Typography
//                   component="span"
//                   sx={{
//                     p: "6px 16px",
//                     border: "1px solid #ddd",
//                     borderRadius: 1,
//                   }}
//                 >
//                   {page + 1}
//                 </Typography>
//                 <Button
//                   variant="contained"
//                   disabled={page >= totalPages - 1}
//                   onClick={() => setPage((p) => p + 1)}
//                   sx={purpleButtonStyle}
//                 >
//                   Next
//                 </Button>
//               </Box>
//             </Box>
//           )}
//         </Paper>
//       </Container>

//       {/* Add Modal */}
//       <Modal open={openModal} onClose={handleCloseModal}>
//         <Box sx={modalStyle} component="form" onSubmit={handleAddNewGrade}>
//           <Typography variant="h6" sx={{ mb: 2 }}>
//             Add New Grade
//           </Typography>
//           <TextField
//             label="Grade Name"
//             value={newGrade.grade_name}
//             onChange={(e) =>
//               setNewGrade({ ...newGrade, grade_name: e.target.value })
//             }
//             fullWidth
//             margin="normal"
//             required
//           />
//           <TextField
//             label="Grade Code"
//             value={newGrade.grade_code}
//             onChange={(e) =>
//               setNewGrade({ ...newGrade, grade_code: e.target.value })
//             }
//             fullWidth
//             margin="normal"
//             required
//           />
//           <Box
//             sx={{ mt: 3, display: "flex", justifyContent: "flex-end", gap: 1 }}
//           >
//             <Button onClick={handleCloseModal} variant="outlined">
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
//           <Typography variant="h6" sx={{ mb: 2 }}>
//             Edit Grade
//           </Typography>
//           <TextField
//             label="Grade Name"
//             value={editGrade?.grade_name || ""}
//             onChange={(e) =>
//               setEditGrade({ ...editGrade, grade_name: e.target.value })
//             }
//             fullWidth
//             margin="normal"
//             required
//           />
//           <TextField
//             label="Grade Code"
//             value={editGrade?.grade_code || ""}
//             onChange={(e) =>
//               setEditGrade({ ...editGrade, grade_code: e.target.value })
//             }
//             fullWidth
//             margin="normal"
//             required
//           />
//           <Box
//             sx={{ mt: 3, display: "flex", justifyContent: "flex-end", gap: 1 }}
//           >
//             <Button onClick={() => setEditModalOpen(false)} variant="outlined">
//               Cancel
//             </Button>
//             <Button type="submit" variant="contained" sx={purpleButtonStyle}>
//               Save
//             </Button>
//           </Box>
//         </Box>
//       </Modal>

//       {/* Delete Dialog - Dialog component is inherently responsive */}
//       <Dialog
//         open={deleteDialogOpen}
//         onClose={() => setDeleteDialogOpen(false)}
//       >
//         <DialogTitle>Confirm Delete</DialogTitle>
//         <DialogContent>
//           <DialogContentText>
//             {" "}
//             Are you sure you want to delete this grade? This action cannot be
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
//     </>
//   );
// }

// export default Grade;

















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
//   InputLabel,
// } from "@mui/material";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import AddIcon from "@mui/icons-material/Add";
// import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

// // ======================= UI & COLOR STANDARDIZATION =======================
// const primaryColor = "#8C257C"; // Main Purple
// const accentColor = "#F58E35"; // Main Orange
// const primaryHoverColor = "#7a206a"; // Darker Purple for hover

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

// const mainButtonStyle = {
//   backgroundColor: primaryColor,
//   color: "#fff",
//   "&:hover": { backgroundColor: primaryHoverColor },
// };
// // =========================================================================

// // Utility function for formatting date for display
// const formatDisplayDate = (dateString) => {
//   if (!dateString) return "-";
//   try {
//     const date = new Date(dateString);
//     if (isNaN(date.getTime())) return dateString;
//     const day = date.getDate().toString().padStart(2, "0");
//     const month = (date.getMonth() + 1).toString().padStart(2, "0");
//     const year = date.getFullYear();
//     return `${day}-${month}-${year}`;
//   } catch (error) {
//     return dateString;
//   }
// };

// function Grade() {
//   const [grades, setGrades] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [openModal, setOpenModal] = useState(false);
//   const [newGrade, setNewGrade] = useState({ grade_name: "", grade_code: "" });
//   const [editModalOpen, setEditModalOpen] = useState(false);
//   const [editGrade, setEditGrade] = useState(null);
//   const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
//   const [deleteId, setDeleteId] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [firstLoad, setFirstLoad] = useState(true);

//   const fetchGrades = async () => {
//     if (firstLoad) setIsLoading(true);
//     try {
//       const res = await axios.get(
//         "https://tdtlworld.com/hrms-backend/api/grade/"
//       );
//       const sortedData = res.data.sort(
//         (a, b) => new Date(b.created_date) - new Date(a.created_date)
//       );
//       setGrades(sortedData);
//     } catch (error) {
//       console.error("Error fetching grades:", error);
//     } finally {
//       setIsLoading(false);
//       setFirstLoad(false);
//     }
//   };

//   useEffect(() => {
//     fetchGrades();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   const handleOpenModal = () => setOpenModal(true);
//   const handleCloseModal = () => setOpenModal(false);

//   const handleAddNewGrade = async (e) => {
//     e.preventDefault();
//     try {
//       const payload = {
//         grade_name: newGrade.grade_name,
//         grade_code: newGrade.grade_code,
//       };
//       await axios.post(
//         "https://tdtlworld.com/hrms-backend/api/grade/",
//         payload,
//         { headers: { "Content-Type": "application/json" } }
//       );
//       setNewGrade({ grade_name: "", grade_code: "" });
//       handleCloseModal();
//       fetchGrades();
//     } catch (error) {
//       console.error("Error adding grade:", error.response?.data || error.message);
//       alert("Failed to add grade. Please check input or try again.");
//     }
//   };

//   const handleDeleteClick = (id) => {
//     setDeleteId(id);
//     setDeleteDialogOpen(true);
//   };

//   const handleDeleteConfirm = async () => {
//     try {
//       await axios.delete(
//         `https://tdtlworld.com/hrms-backend/api/grade/${deleteId}/`
//       );
//       setDeleteDialogOpen(false);
//       fetchGrades();
//     } catch (error) {
//       console.error("Error deleting grade:", error);
//       alert("Failed to delete grade.");
//     }
//   };

//   const handleEditClick = (row) => {
//     setEditGrade(row);
//     setEditModalOpen(true);
//   };

//   const handleEditSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.patch(
//         `https://tdtlworld.com/hrms-backend/api/grade/${editGrade.grade_id}/`,
//         {
//           grade_name: editGrade.grade_name,
//           grade_code: editGrade.grade_code,
//         }
//       );
//       setEditModalOpen(false);
//       fetchGrades();
//     } catch (error) {
//       console.error("Error editing grade:", error);
//       alert("Failed to update grade.");
//     }
//   };

//   const filteredGrades = useMemo(() => {
//     return grades.filter(
//       (g) =>
//         g?.grade_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         g?.grade_code?.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//   }, [grades, searchTerm]);

//   const paginatedGrades = useMemo(() => {
//     return filteredGrades.slice(
//       page * rowsPerPage,
//       page * rowsPerPage + rowsPerPage
//     );
//   }, [filteredGrades, page, rowsPerPage]);

//   const totalPages = Math.ceil(filteredGrades.length / rowsPerPage);

//   return (
//     <>
//       <Container maxWidth="lg" sx={{ mt: 2 }}>
//         <Paper elevation={3} sx={{ p: { xs: 2, md: 3 }, borderRadius: 2 }}>
//           <Box
//             sx={{
//               display: "flex",
//               flexDirection: { xs: "column", sm: "row" },
//               justifyContent: "space-between",
//               alignItems: { xs: "flex-start", sm: "center" },
//               mb: 2,
//               gap: 2,
//             }}
//           >
//             <Typography variant="h5" sx={{ fontWeight: "bold" }}>
//               Grade Management
//             </Typography>
//             <Button
//               variant="contained"
//               sx={{ ...mainButtonStyle, width: { xs: "100%", sm: "auto" } }}
//               startIcon={<AddIcon />}
//               onClick={handleOpenModal}
//             >
//               Add Grade
//             </Button>
//           </Box>

//           {/* ====== STANDARDIZED CONTROLS: Show Entries (Left) & Search (Right) ====== */}
//           <Box
//             sx={{
//               mb: 2,
//               display: "flex",
//               flexDirection: { xs: "column", md: "row" },
//               justifyContent: "space-between",
//               alignItems: { xs: "stretch", md: "center" },
//               gap: 2,
//             }}
//           >
//             <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//               <Typography>Show</Typography>
//               <FormControl size="small" sx={{ minWidth: 70 }}>
//                 <Select
//                   value={rowsPerPage}
//                   onChange={(e) => {
//                     setRowsPerPage(parseInt(e.target.value, 10));
//                     setPage(0);
//                   }}
//                 >
//                   <MenuItem value={10}>10</MenuItem>
//                   <MenuItem value={25}>25</MenuItem>
//                   <MenuItem value={50}>50</MenuItem>
//                 </Select>
//               </FormControl>
//               <Typography>entries</Typography>
//             </Box>

//             <TextField
//               label="Search"
//               variant="outlined"
//               size="small"
//               value={searchTerm}
//               onChange={(e) => {
//                 setSearchTerm(e.target.value);
//                 setPage(0);
//               }}
//               sx={{ width: { xs: "100%", md: "auto" } }}
//             />
//           </Box>

//           <TableContainer>
//             <Table>
//               <TableHead>
//                 {/* ====== UI CHANGE: Table header color updated ====== */}
//                 <TableRow>
//                   {[
//                     "SR. NO.",
//                     "GRADE NAME",
//                     "GRADE CODE",
//                     "CREATED DATE",
//                     "ACTIONS",
//                   ].map((headCell, index) => (
//                     <TableCell
//                       key={headCell}
//                       sx={{
//                         fontWeight: "bold",
//                         backgroundColor: primaryColor,
//                         color: "white",
//                         whiteSpace: "nowrap",
//                       }}
//                     >
//                       {index === 3 && ( // Add icon only for the "CREATED DATE" header
//                         <CalendarTodayIcon
//                           sx={{
//                             fontSize: 16,
//                             mr: 0.5,
//                             verticalAlign: "middle",
//                           }}
//                         />
//                       )}
//                       {headCell}
//                     </TableCell>
//                   ))}
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {isLoading ? (
//                   <TableRow>
//                     <TableCell colSpan={5} align="center">
//                       <CircularProgress sx={{ color: primaryColor }} />
//                     </TableCell>
//                   </TableRow>
//                 ) : paginatedGrades.length > 0 ? (
//                   paginatedGrades.map((g, index) => (
//                     <TableRow
//                       key={g.grade_id}
//                       sx={{ "&:hover": { backgroundColor: "#f5f5f5" } }}
//                     >
//                       <TableCell>{page * rowsPerPage + index + 1}</TableCell>
//                       <TableCell>{g.grade_name}</TableCell>
//                       <TableCell>{g.grade_code}</TableCell>
//                       <TableCell>{formatDisplayDate(g.created_date)}</TableCell>
//                       <TableCell>
//                         <IconButton
//                           size="small"
//                           sx={{ color: primaryColor }}
//                           onClick={() => handleEditClick(g)}
//                         >
//                           <EditIcon />
//                         </IconButton>
//                         <IconButton
//                           size="small"
//                           color="error"
//                           onClick={() => handleDeleteClick(g.grade_id)}
//                         >
//                           <DeleteIcon />
//                         </IconButton>
//                       </TableCell>
//                     </TableRow>
//                   ))
//                 ) : (
//                   <TableRow>
//                     <TableCell colSpan={5} align="center">
//                       No data found.
//                     </TableCell>
//                   </TableRow>
//                 )}
//               </TableBody>
//             </Table>
//           </TableContainer>

//           {/* ====== STANDARDIZED FOOTER: Total Rows (Left) & Pagination (Right) ====== */}
//           {filteredGrades.length > 0 && (
//             <Box
//               sx={{
//                 p: 2,
//                 display: "flex",
//                 flexDirection: { xs: "column", sm: "row" },
//                 justifyContent: "space-between",
//                 alignItems: "center",
//                 gap: 2,
//               }}
//             >
//               <Typography variant="body2">
//                 Showing {page * rowsPerPage + 1} to{" "}
//                 {Math.min((page + 1) * rowsPerPage, filteredGrades.length)} of{" "}
//                 {filteredGrades.length} records
//               </Typography>
//               <Box sx={{ display: "flex", gap: 1 }}>
//                 <Button
//                   variant="contained"
//                   disabled={page === 0}
//                   onClick={() => setPage((p) => p - 1)}
//                   sx={mainButtonStyle}
//                 >
//                   Previous
//                 </Button>
//                 <Typography
//                   component="span"
//                   sx={{
//                     p: "6px 16px",
//                     border: "1px solid #ddd",
//                     borderRadius: 1,
//                     display: "flex",
//                     alignItems: "center",
//                   }}
//                 >
//                   {page + 1}
//                 </Typography>
//                 <Button
//                   variant="contained"
//                   disabled={page >= totalPages - 1}
//                   onClick={() => setPage((p) => p + 1)}
//                   sx={mainButtonStyle}
//                 >
//                   Next
//                 </Button>
//               </Box>
//             </Box>
//           )}
//         </Paper>
//       </Container>

//       {/* Add Modal */}
//       <Modal open={openModal} onClose={handleCloseModal}>
//         <Box sx={modalStyle} component="form" onSubmit={handleAddNewGrade}>
//           <Typography variant="h6" sx={{ mb: 2 }}>
//             Add New Grade
//           </Typography>
//           <TextField
//             label="Grade Name"
//             value={newGrade.grade_name}
//             onChange={(e) =>
//               setNewGrade({ ...newGrade, grade_name: e.target.value })
//             }
//             fullWidth
//             margin="normal"
//             required
//           />
//           <TextField
//             label="Grade Code"
//             value={newGrade.grade_code}
//             onChange={(e) =>
//               setNewGrade({ ...newGrade, grade_code: e.target.value })
//             }
//             fullWidth
//             margin="normal"
//             required
//           />
//           <Box
//             sx={{ mt: 3, display: "flex", justifyContent: "flex-end", gap: 1 }}
//           >
//             <Button onClick={handleCloseModal} variant="outlined">
//               Cancel
//             </Button>
//             <Button type="submit" variant="contained" sx={mainButtonStyle}>
//               Add
//             </Button>
//           </Box>
//         </Box>
//       </Modal>

//       {/* Edit Modal */}
//       <Modal open={editModalOpen} onClose={() => setEditModalOpen(false)}>
//         <Box sx={modalStyle} component="form" onSubmit={handleEditSubmit}>
//           <Typography variant="h6" sx={{ mb: 2 }}>
//             Edit Grade
//           </Typography>
//           <TextField
//             label="Grade Name"
//             value={editGrade?.grade_name || ""}
//             onChange={(e) =>
//               setEditGrade({ ...editGrade, grade_name: e.target.value })
//             }
//             fullWidth
//             margin="normal"
//             required
//           />
//           <TextField
//             label="Grade Code"
//             value={editGrade?.grade_code || ""}
//             onChange={(e) =>
//               setEditGrade({ ...editGrade, grade_code: e.target.value })
//             }
//             fullWidth
//             margin="normal"
//             required
//           />
//           <Box
//             sx={{ mt: 3, display: "flex", justifyContent: "flex-end", gap: 1 }}
//           >
//             <Button onClick={() => setEditModalOpen(false)} variant="outlined">
//               Cancel
//             </Button>
//             <Button type="submit" variant="contained" sx={mainButtonStyle}>
//               Save
//             </Button>
//           </Box>
//         </Box>
//       </Modal>

//       {/* Delete Dialog */}
//       <Dialog
//         open={deleteDialogOpen}
//         onClose={() => setDeleteDialogOpen(false)}
//       >
//         <DialogTitle>Confirm Delete</DialogTitle>
//         <DialogContent>
//           <DialogContentText>
//             Are you sure you want to delete this grade? This action cannot be
//             undone.
//           </DialogContentText>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
//           <Button
//             color="error"
//             onClick={handleDeleteConfirm}
//             variant="contained"
//           >
//             Delete
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </>
//   );
// }

// export default Grade;



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
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   CircularProgress,
//   InputAdornment,
//   Skeleton,
//   TablePagination,
//   useTheme,
//   useMediaQuery,
// } from "@mui/material";
// import {
//   Edit,
//   Delete,
//   Add,
//   Search as SearchIcon,
// } from "@mui/icons-material";
// import Swal from "sweetalert2";

// // ======================= UI & COLOR STANDARDIZATION =======================
// const primaryColor = "#8C257C";
// const primaryHoverColor = "#6d1d60";
// const textOnPrimary = "#FFFFFF";

// // =========================================================================

// function Grade() {
//   const [grades, setGrades] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);
//   const [openAddEditDialog, setOpenAddEditDialog] = useState(false);
//   const [currentGrade, setCurrentGrade] = useState({ grade_name: "", grade_code: "" });
//   const [isEditMode, setIsEditMode] = useState(false);
//   const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
//   const [deleteId, setDeleteId] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

//   const fetchGrades = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get(
//         "https://tdtlworld.com/hrms-backend/api/grade/"
//       );
//       const sortedData = res.data.sort(
//         (a, b) => new Date(b.created_date) - new Date(a.created_date)
//       );
//       setGrades(sortedData);
//     } catch (error) {
//       console.error("Error fetching grades:", error);
//       Swal.fire({
//         icon: "error",
//         title: "Fetch Error",
//         text: "Could not fetch grades from the server.",
//         timer: 3000,
//         showConfirmButton: false,
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchGrades();
//   }, []);

//   const handleOpenAddDialog = () => {
//     setIsEditMode(false);
//     setCurrentGrade({ grade_name: "", grade_code: "" });
//     setOpenAddEditDialog(true);
//   };

//   const handleOpenEditDialog = (grade) => {
//     setIsEditMode(true);
//     setCurrentGrade(grade);
//     setOpenAddEditDialog(true);
//   };

//   const handleCloseDialog = () => {
//     setOpenAddEditDialog(false);
//     setCurrentGrade({ grade_name: "", grade_code: "" });
//   };
  
//   const handleFormSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     const url = isEditMode
//       ? `https://tdtlworld.com/hrms-backend/api/grade/${currentGrade.grade_id}/`
//       : "https://tdtlworld.com/hrms-backend/api/grade/";
//     const method = isEditMode ? "patch" : "post";

//     try {
//       await axios[method](url, {
//         grade_name: currentGrade.grade_name,
//         grade_code: currentGrade.grade_code,
//       });
//       Swal.fire({
//         icon: "success",
//         title: `Grade ${isEditMode ? "Updated" : "Added"}!`,
//         text: `The grade has been successfully ${isEditMode ? "updated" : "added"}.`,
//         timer: 3000,
//         showConfirmButton: false,
//       });
//       handleCloseDialog();
//       fetchGrades();
//     } catch (error) {
//       console.error("Error submitting grade:", error.response?.data || error.message);
//       Swal.fire({
//         icon: "error",
//         title: "Submission Failed",
//         text: "Failed to submit grade. Please check your input or try again.",
//         timer: 3000,
//         showConfirmButton: false,
//       });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleDeleteClick = (id) => {
//     setDeleteId(id);
//     setDeleteDialogOpen(true);
//   };

//   const handleDeleteConfirm = async () => {
//     try {
//       await axios.delete(
//         `https://tdtlworld.com/hrms-backend/api/grade/${deleteId}/`
//       );
//       Swal.fire({
//         icon: "success",
//         title: "Deleted!",
//         text: "The grade has been successfully deleted.",
//         timer: 3000,
//         showConfirmButton: false,
//       });
//       fetchGrades();
//     } catch (error) {
//       console.error("Error deleting grade:", error);
//       Swal.fire({
//         icon: "error",
//         title: "Delete Failed",
//         text: "Failed to delete the grade.",
//         timer: 3000,
//         showConfirmButton: false,
//       });
//     } finally {
//       setDeleteDialogOpen(false);
//     }
//   };

//   const filteredGrades = useMemo(() => {
//     if (!searchTerm) return grades;
//     return grades.filter(
//       (g) =>
//         g?.grade_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         g?.grade_code?.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//   }, [grades, searchTerm]);

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   return (
//     <Container maxWidth="lg" sx={{ mt: 2 }}>
//       <Box component={Paper} p={3}>
//         <Typography
//           variant="h4"
//           sx={{ color: primaryColor, fontWeight: "bold", mb: 4 }}
//         >
//           Grade 
//         </Typography>

//         <Box
//           sx={{
//             display: "flex",
//             flexDirection: isMobile ? "column" : "row",
//             justifyContent: "space-between",
//             alignItems: isMobile ? "stretch" : "center",
//             gap: 2,
//             mb: 2,
//           }}
//         >
//           <Button
//             variant="contained"
//             startIcon={<Add />}
//             onClick={handleOpenAddDialog}
//             sx={{
//               backgroundColor: primaryColor,
//               color: textOnPrimary,
//               "&:hover": { backgroundColor: primaryHoverColor },
//             }}
//           >
//             Add New 
//           </Button>
//           <TextField
//             size="small"
//             placeholder="Search..."
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

//         <TableContainer sx={{ whiteSpace: "nowrap" }}>
//           <Table sx={{ minWidth: "100%" }}>
//             <TableHead>
//               <TableRow sx={{ backgroundColor: primaryColor }}>
//                 {[
//                   "SR. NO.",
//                   "GRADE NAME",
//                   "GRADE CODE",
//                   "CREATED DATE",
//                   "ACTIONS",
//                 ].map((headCell) => (
//                   <TableCell
//                     key={headCell}
//                     sx={{ fontWeight: "bold", color: textOnPrimary }}
//                   >
//                     {headCell}
//                   </TableCell>
//                 ))}
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {loading ? (
//                 Array.from(new Array(rowsPerPage)).map((_, index) => (
//                   <TableRow key={index}>
//                     <TableCell>
//                       <Skeleton variant="text" />
//                     </TableCell>
//                     <TableCell>
//                       <Skeleton variant="text" />
//                     </TableCell>
//                     <TableCell>
//                       <Skeleton variant="text" />
//                     </TableCell>
//                     <TableCell>
//                       <Skeleton variant="text" />
//                     </TableCell>
//                     <TableCell align="center">
//                       <Skeleton variant="rectangular" width={80} height={30} />
//                     </TableCell>
//                   </TableRow>
//                 ))
//               ) : filteredGrades.length > 0 ? (
//                 filteredGrades
//                   .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                   .map((g, index) => (
//                     <TableRow
//                       key={g.grade_id}
//                       sx={{ "&:hover": { backgroundColor: "#f5f5f5" } }}
//                     >
//                       <TableCell>{page * rowsPerPage + index + 1}</TableCell>
//                       <TableCell sx={{ fontSize: "0.95rem" }}>{g.grade_name}</TableCell>
//                       <TableCell sx={{ fontSize: "0.95rem" }}>{g.grade_code}</TableCell>
//                       <TableCell sx={{ fontSize: "0.95rem" }}>
//                         {new Date(g.created_date).toLocaleDateString("en-GB")}
//                       </TableCell>
//                       <TableCell>
//                         <Box display="flex" justifyContent="center" gap={0.5}>
//                           <IconButton size="small" onClick={() => handleOpenEditDialog(g)}>
//                             <Edit sx={{ color: primaryColor }} />
//                           </IconButton>
//                           <IconButton
//                             size="small"
//                             onClick={() => handleDeleteClick(g.grade_id)}
//                           >
//                             <Delete color="error" />
//                           </IconButton>
//                         </Box>
//                       </TableCell>
//                     </TableRow>
//                   ))
//               ) : (
//                 <TableRow>
//                   <TableCell colSpan={5} align="center">
//                     No data found.
//                   </TableCell>
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>

//         {filteredGrades.length > 0 && (
//           <Box
//             sx={{
//               display: "flex",
//               flexDirection: isMobile ? "column" : "row",
//               justifyContent: "space-between",
//               alignItems: "center",
//               pt: 2,
//               gap: isMobile ? 2 : 0,
//             }}
//           >
//             <Typography variant="body2" color="text.secondary">
//               Showing {page * rowsPerPage + 1} to{" "}
//               {Math.min((page + 1) * rowsPerPage, filteredGrades.length)} of{" "}
//               {filteredGrades.length} results
//             </Typography>
//             <TablePagination
//               component="div"
//               count={filteredGrades.length}
//               page={page}
//               onPageChange={handleChangePage}
//               rowsPerPage={rowsPerPage}
//               onRowsPerPageChange={handleChangeRowsPerPage}
//               rowsPerPageOptions={[5, 10, 15, 25]}
//               sx={{
//                 "& .MuiSvgIcon-root": { color: primaryColor },
//               }}
//             />
//           </Box>
//         )}
//       </Box>

//       {/* Add/Edit Dialog */}
//       <Dialog open={openAddEditDialog} onClose={handleCloseDialog} fullWidth maxWidth="sm">
//         <DialogTitle sx={{ color: '#8C257C' , fontWeight: "bold", fontSize: '2rem' }}>
//           {isEditMode ? "Edit Grade" : "Add New "}
//         </DialogTitle>
//         <DialogContent>
//           <Box component="form" onSubmit={handleFormSubmit} id="grade-form">
//             <TextField
//               label="Grade Name"
//               value={currentGrade.grade_name}
//               onChange={(e) =>
//                 setCurrentGrade({ ...currentGrade, grade_name: e.target.value })
//               }
//               fullWidth
//               margin="normal"
//               required
//             />
//             <TextField
//               label="Grade Code"
//               value={currentGrade.grade_code}
//               onChange={(e) =>
//                 setCurrentGrade({ ...currentGrade, grade_code: e.target.value })
//               }
//               fullWidth
//               margin="normal"
//               required
//             />
//           </Box>
//         </DialogContent>
//         <DialogActions sx={{ p: '0 24px 16px' }}>
//           <Button onClick={handleCloseDialog} sx={{ color: "#757575" }}>
//             Cancel
//           </Button>
//           <Button
//             type="submit"
//             form="grade-form"
//             variant="contained"
//             disabled={isSubmitting}
//             sx={{
//               backgroundColor: primaryColor,
//               color: textOnPrimary,
//               "&:hover": { backgroundColor: primaryHoverColor },
//             }}
//           >
//             {isSubmitting ? (
//               <CircularProgress size={24} sx={{ color: textOnPrimary }} />
//             ) : isEditMode ? (
//               "Save"
//             ) : (
//               "Add"
//             )}
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* Delete Confirmation Dialog */}
//       <Dialog
//         open={deleteDialogOpen}
//         onClose={() => setDeleteDialogOpen(false)}
//       >
//         <DialogTitle>Confirm Delete</DialogTitle>
//         <DialogContent>
//             Are you sure you want to delete this grade? This action cannot be undone.
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setDeleteDialogOpen(false)} sx={{ color: "#757575" }}>Cancel</Button>
//           <Button
//             color="error"
//             onClick={handleDeleteConfirm}
//             variant="contained"
//           >
//             Delete
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Container>
//   );
// }

// export default Grade;





import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
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
  DialogTitle,
  DialogContent,
  DialogActions,
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
} from "@mui/material";
import {
  Edit,
  Delete,
  Add,
  Search as SearchIcon,
} from "@mui/icons-material";
import Swal from "sweetalert2";

// ======================= UI & COLOR STANDARDIZATION =======================
const primaryColor = "#8C257C";
const primaryHoverColor = "#6d1d60";
const secondaryColor = "#F58E35"; // Added for hover effects
const textOnPrimary = "#FFFFFF";
// =========================================================================

function Grade() {
  const [grades, setGrades] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openAddEditDialog, setOpenAddEditDialog] = useState(false);
  const [currentGrade, setCurrentGrade] = useState({ grade_name: "", grade_code: "" });
  const [isEditMode, setIsEditMode] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const fetchGrades = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        "https://tdtlworld.com/hrms-backend/api/grade/"
      );
      const sortedData = res.data.sort(
        (a, b) => new Date(b.created_date) - new Date(a.created_date)
      );
      setGrades(sortedData);
    } catch (error) {
      console.error("Error fetching grades:", error);
      Swal.fire({
        icon: "error",
        title: "Fetch Error",
        text: "Could not fetch grades from the server.",
        timer: 3000,
        showConfirmButton: false,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGrades();
  }, []);

  const handleOpenAddDialog = () => {
    setIsEditMode(false);
    setCurrentGrade({ grade_name: "", grade_code: "" });
    setOpenAddEditDialog(true);
  };

  const handleOpenEditDialog = (grade) => {
    setIsEditMode(true);
    setCurrentGrade(grade);
    setOpenAddEditDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenAddEditDialog(false);
    setCurrentGrade({ grade_name: "", grade_code: "" });
  };
  
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const url = isEditMode
      ? `https://tdtlworld.com/hrms-backend/api/grade/${currentGrade.grade_id}/`
      : "https://tdtlworld.com/hrms-backend/api/grade/";
    const method = isEditMode ? "patch" : "post";

    try {
      await axios[method](url, {
        grade_name: currentGrade.grade_name,
        grade_code: currentGrade.grade_code,
      });
      Swal.fire({
        icon: "success",
        title: `Grade ${isEditMode ? "Updated" : "Added"}!`,
        text: `The grade has been successfully ${isEditMode ? "updated" : "added"}.`,
        timer: 3000,
        showConfirmButton: false,
      });
      handleCloseDialog();
      fetchGrades();
    } catch (error) {
      console.error("Error submitting grade:", error.response?.data || error.message);
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: "Failed to submit grade. Please check your input or try again.",
        timer: 3000,
        showConfirmButton: false,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(
        `https://tdtlworld.com/hrms-backend/api/grade/${deleteId}/`
      );
      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "The grade has been successfully deleted.",
        timer: 3000,
        showConfirmButton: false,
      });
      fetchGrades();
    } catch (error) {
      console.error("Error deleting grade:", error);
      Swal.fire({
        icon: "error",
        title: "Delete Failed",
        text: "Failed to delete the grade.",
        timer: 3000,
        showConfirmButton: false,
      });
    } finally {
      setDeleteDialogOpen(false);
    }
  };

  const filteredGrades = useMemo(() => {
    if (!searchTerm) return grades;
    return grades.filter(
      (g) =>
        g?.grade_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        g?.grade_code?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [grades, searchTerm]);

  // --- START: Handlers and calculations for new pagination ---
  const handlePaginationChange = (event, newPage) => {
    setPage(newPage - 1); // MUI Pagination is 1-based, our state is 0-based
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  
  const startEntry = filteredGrades.length > 0 ? page * rowsPerPage + 1 : 0;
  const endEntry = Math.min((page + 1) * rowsPerPage, filteredGrades.length);
  // --- END: Handlers and calculations for new pagination ---

  return (
    <Container maxWidth="lg" sx={{ mt: 2 }}>
      <Box component={Paper} p={3}>
        <Typography
          variant="h4"
          sx={{ color: primaryColor, fontWeight: "bold", mb: 4 }}
        >
          Grade 
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            justifyContent: "space-between",
            alignItems: isMobile ? "stretch" : "center",
            gap: 2,
            mb: 2,
          }}
        >
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={handleOpenAddDialog}
            sx={{
              backgroundColor: primaryColor,
              color: textOnPrimary,
              "&:hover": { backgroundColor: primaryHoverColor },
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
              setPage(0); // Reset page on new search
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

        <TableContainer sx={{ whiteSpace: "nowrap" }}>
          <Table sx={{ minWidth: "100%" }}>
            <TableHead>
              <TableRow sx={{ backgroundColor: primaryColor }}>
                {[
                  "SR. NO.",
                  "GRADE NAME",
                  "GRADE CODE",
                  "CREATED DATE",
                  "ACTIONS",
                ].map((headCell, index) => (
                  <TableCell
                    key={index}
                    sx={{ fontWeight: "bold", color: textOnPrimary, textAlign: headCell === 'ACTIONS' ? 'center' : 'left' }}
                  >
                    {headCell}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                Array.from(new Array(rowsPerPage)).map((_, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Skeleton variant="text" />
                    </TableCell>
                    <TableCell>
                      <Skeleton variant="text" />
                    </TableCell>
                    <TableCell>
                      <Skeleton variant="text" />
                    </TableCell>
                    <TableCell>
                      <Skeleton variant="text" />
                    </TableCell>
                    <TableCell align="center">
                      <Skeleton variant="rectangular" width={80} height={30} />
                    </TableCell>
                  </TableRow>
                ))
              ) : filteredGrades.length > 0 ? (
                filteredGrades
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((g, index) => (
                    <TableRow
                      key={g.grade_id}
                      sx={{ "&:hover": { backgroundColor: "#f5f5f5" } }}
                    >
                      <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                      <TableCell sx={{ fontSize: "0.95rem" }}>{g.grade_name}</TableCell>
                      <TableCell sx={{ fontSize: "0.95rem" }}>{g.grade_code}</TableCell>
                      <TableCell sx={{ fontSize: "0.95rem" }}>
                        {new Date(g.created_date).toLocaleDateString("en-GB")}
                      </TableCell>
                      <TableCell>
                        <Box display="flex" justifyContent="center" gap={0.5}>
                          <IconButton size="small" onClick={() => handleOpenEditDialog(g)}>
                            <Edit sx={{ color: primaryColor }} />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => handleDeleteClick(g.grade_id)}
                          >
                            <Delete color="error" />
                          </IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    No data found.
                  </TableCell>
                </TableRow>
              )}
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
            filteredGrades.length > 0 && (
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <FormControl variant="outlined" size="small">
                          <Select
                              value={rowsPerPage}
                              onChange={handleChangeRowsPerPage}
                              sx={{
                                  backgroundColor: primaryColor,
                                  color: 'white',
                                  borderRadius: '4px',
                                  '&:hover': { backgroundColor: primaryHoverColor },
                                  '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                                  '& .MuiSvgIcon-root': { color: 'white' },
                              }}
                          >
                              {[5, 10, 15, 25].map((value) => ( <MenuItem key={value} value={value}>{value}</MenuItem> ))}
                          </Select>
                      </FormControl>
                      <Typography variant="body2" color="text.secondary">
                         {`Showing ${startEntry} to ${endEntry} of ${filteredGrades.length} results`}
                      </Typography>
                  </Box>
                  <Pagination
                      count={Math.ceil(filteredGrades.length / rowsPerPage)}
                      page={page + 1}
                      onChange={handlePaginationChange}
                      showFirstButton showLastButton
                      sx={{
                          '& .MuiPaginationItem-root:hover': { backgroundColor: secondaryColor, color: 'white' },
                          '& .MuiPaginationItem-page': {
                              color: primaryColor,
                              '&.Mui-selected': {
                                  backgroundColor: primaryColor,
                                  color: 'white',
                                  '&:hover': { backgroundColor: secondaryColor }
                              },
                          },
                           '& .MuiPaginationItem-icon': { color: primaryColor }
                      }}
                  />
              </Box>
            )
          )}
        </Box>
        {/* --- END: New Styled Pagination --- */}

      </Box>

      {/* Add/Edit Dialog */}
      <Dialog open={openAddEditDialog} onClose={handleCloseDialog} fullWidth maxWidth="sm">
        <DialogTitle sx={{ color: '#8C257C' , fontWeight: "bold", fontSize: '2rem' }}>
          {isEditMode ? "Edit Grade" : "Add New Grade"}
        </DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleFormSubmit} id="grade-form">
            <TextField
              label="Grade Name"
              value={currentGrade.grade_name}
              onChange={(e) =>
                setCurrentGrade({ ...currentGrade, grade_name: e.target.value })
              }
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Grade Code"
              value={currentGrade.grade_code}
              onChange={(e) =>
                setCurrentGrade({ ...currentGrade, grade_code: e.target.value })
              }
              fullWidth
              margin="normal"
              required
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: '0 24px 16px' }}>
          <Button onClick={handleCloseDialog} sx={{ color: "#757575" }}>
            Cancel
          </Button>
          <Button
            type="submit"
            form="grade-form"
            variant="contained"
            disabled={isSubmitting}
            sx={{
              backgroundColor: primaryColor,
              color: textOnPrimary,
              "&:hover": { backgroundColor: primaryHoverColor },
            }}
          >
            {isSubmitting ? (
              <CircularProgress size={24} sx={{ color: textOnPrimary }} />
            ) : isEditMode ? (
              "Save Changes"
            ) : (
              "Save"
            )}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
            Are you sure you want to delete this grade? This action cannot be undone.
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} sx={{ color: "#757575" }}>Cancel</Button>
          <Button
            color="error"
            onClick={handleDeleteConfirm}
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default Grade;