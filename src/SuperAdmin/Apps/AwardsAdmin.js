// import { useState, useEffect } from "react"
// import {
//   Button,
//   Box,
//   Stack,
//   Typography,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TextField,
//   Select,
//   MenuItem,
//   Tabs,
//   Tab,
//   Grid,
//   InputLabel,
//   FormControl,
//   CircularProgress,
//   Alert,
//   Snackbar,
//   InputAdornment,
//   IconButton,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
// } from "@mui/material"
// import { Edit, Delete } from "@mui/icons-material"

// // Component for displaying and managing the list of awards
// const AwardsList = ({
//   awards,
//   showForm,
//   setShowForm,
//   entriesPerPage,
//   setEntriesPerPage,
//   searchTerm,
//   setSearchTerm,
//   currentPage,
//   setCurrentPage,
//   employees,
//   awardTypes,
//   formData,
//   setFormData,
//   handleSaveAward,
//   loadingAwards,
//   savingAward,
//   loadingEmployees,
//   loadingAwardTypes,
//   formErrors,
//   editingAward,
//   setEditingAward,
//   handleEditAward,
//   handleDeleteAward,
//   deletingAward,
// }) => {
//   const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
//   const [awardToDelete, setAwardToDelete] = useState(null)

//   const filteredAwards = awards.filter((award) =>
//     Object.values(award).some((value) => value && value.toString().toLowerCase().includes(searchTerm.toLowerCase())),
//   )
//   const totalPages = Math.ceil(filteredAwards.length / entriesPerPage) || 1
//   const paginatedAwards = filteredAwards.slice((currentPage - 1) * entriesPerPage, currentPage * entriesPerPage)

//   const handleInputChange = (field, value) => {
//     setFormData((prev) => ({
//       ...prev,
//       [field]: value,
//     }))
//   }

//   const handleCashPriceChange = (value) => {
//     // Ensure the value is a valid integer
//     let numValue = Number.parseInt(value) || 0
//     if (numValue < 0) {
//       numValue = 0
//     }
//     handleInputChange("cash_price", numValue.toString())
//   }

//   const resetForm = () => {
//     setFormData({
//       employee_id: "",
//       award_type_id: "",
//       associated_goals: "",
//       gift_item: "",
//       cash_price: "0",
//       award_month_year: "",
//       award_information: "",
//       description: "",
//       award_photo: null,
//       created_at: "",
//     })
//     setEditingAward(null)
//   }

//   const handleFormSubmit = async () => {
//     if (editingAward) {
//       await handleEditAward()
//     } else {
//       await handleSaveAward()
//     }
//   }

//   const isFormValid = () => {
//     return formData.employee_id && formData.award_type_id && formData.award_month_year && formData.award_information
//   }

//   const handleEdit = (award) => {
//     setFormData({
//       employee_id: award.employee_id || "",
//       award_type_id: award.award_type_id || "",
//       associated_goals: award.associated_goals || "",
//       gift_item: award.gift_item || "",
//       cash_price: Number.parseInt(award.cash_price || 0).toString(),
//       award_month_year: award.award_month_year || "",
//       award_information: award.award_information || "",
//       description: award.description || "",
//       award_photo: null,
//       created_at: award.created_at ? award.created_at.split("T")[0] : "",
//     })
//     setEditingAward(award)
//     setShowForm(true)
//   }

//   const handleDeleteClick = (award) => {
//     setAwardToDelete(award)
//     setDeleteDialogOpen(true)
//   }

//   const confirmDelete = async () => {
//     if (awardToDelete) {
//       await handleDeleteAward(awardToDelete.award_id)
//       setDeleteDialogOpen(false)
//       setAwardToDelete(null)
//     }
//   }

//   return (
//     <Box>
//       <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2, p: 2 }}>
//         <h3 style={{ margin: 0 }}>List All Awards</h3>
//         <Button
//           variant="contained"
//           onClick={() => {
//             if (showForm && editingAward) {
//               resetForm()
//             }
//             setShowForm((prev) => !prev)
//           }}
//           sx={{ bgcolor: "#7064F5" }}
//           disabled={loadingAwards}
//         >
//           {showForm ? "- Hide" : "+ Add New"}
//         </Button>
//       </Box>

//       {showForm && (
//         <Stack direction="row" spacing={3}>
//           <Paper elevation={2} sx={{ p: 3, flex: 2 }}>
//             <Typography variant="h6">{editingAward ? "Edit Award" : "Add New Award"}</Typography>
//             <Grid container spacing={2}>
//               <Grid item xs={6}>
//                 <FormControl fullWidth size="small" required error={!!formErrors.employee_id}>
//                   <InputLabel>Employee</InputLabel>
//                   <Select
//                     value={formData.employee_id}
//                     onChange={(e) => handleInputChange("employee_id", e.target.value)}
//                     label="Employee"
//                     disabled={loadingEmployees || savingAward}
//                   >
//                     {loadingEmployees ? (
//                       <MenuItem disabled>
//                         <CircularProgress size={20} /> Loading...
//                       </MenuItem>
//                     ) : (
//                       employees.map((employee) => (
//                         <MenuItem key={employee.value} value={employee.value}>
//                           {employee.label}
//                         </MenuItem>
//                       ))
//                     )}
//                   </Select>
//                   {formErrors.employee_id && (
//                     <Typography variant="caption" color="error" sx={{ mt: 0.5 }}>
//                       {formErrors.employee_id}
//                     </Typography>
//                   )}
//                 </FormControl>
//               </Grid>
//               <Grid item xs={6}>
//                 <FormControl fullWidth size="small" required error={!!formErrors.award_type_id}>
//                   <InputLabel>Award Type</InputLabel>
//                   <Select
//                     value={formData.award_type_id}
//                     onChange={(e) => handleInputChange("award_type_id", e.target.value)}
//                     label="Award Type"
//                     disabled={loadingAwardTypes || savingAward}
//                   >
//                     {loadingAwardTypes ? (
//                       <MenuItem disabled>
//                         <CircularProgress size={20} /> Loading...
//                       </MenuItem>
//                     ) : (
//                       awardTypes.map((type) => (
//                         <MenuItem key={type.value} value={type.value}>
//                           {type.label}
//                         </MenuItem>
//                       ))
//                     )}
//                   </Select>
//                   {formErrors.award_type_id && (
//                     <Typography variant="caption" color="error" sx={{ mt: 0.5 }}>
//                       {formErrors.award_type_id}
//                     </Typography>
//                   )}
//                 </FormControl>
//               </Grid>
//               <Grid item xs={6}>
//                 <TextField
//                   fullWidth
//                   size="small"
//                   type="date"
//                   label="Date"
//                   value={formData.created_at || ""}
//                   onChange={(e) => handleInputChange("created_at", e.target.value)}
//                   InputLabelProps={{ shrink: true }}
//                   disabled={savingAward}
//                   error={!!formErrors.created_at}
//                   helperText={formErrors.created_at}
//                 />
//               </Grid>
//               <Grid item xs={6}>
//                 <TextField
//                   fullWidth
//                   size="small"
//                   label="Gift Item"
//                   value={formData.gift_item}
//                   onChange={(e) => handleInputChange("gift_item", e.target.value)}
//                   disabled={savingAward}
//                   error={!!formErrors.gift_item}
//                   helperText={formErrors.gift_item}
//                 />
//               </Grid>
//               <Grid item xs={6}>
//                 <TextField
//                   fullWidth
//                   size="small"
//                   label="Cash Amount"
//                   required
//                   type="number"
//                   value={formData.cash_price}
//                   onChange={(e) => handleCashPriceChange(e.target.value)}
//                   InputProps={{
//                     startAdornment: <InputAdornment position="start">₹</InputAdornment>,
//                     inputProps: {
//                       step: "1",
//                       min: "0",
//                     },
//                   }}
//                   disabled={savingAward}
//                   error={!!formErrors.cash_price}
//                   helperText={formErrors.cash_price || "Enter an integer amount (e.g., 50)"}
//                 />
//               </Grid>
//               <Grid item xs={6}>
//                 <TextField
//                   fullWidth
//                   size="small"
//                   type="month"
//                   label="Month & Year"
//                   required
//                   value={formData.award_month_year}
//                   onChange={(e) => handleInputChange("award_month_year", e.target.value)}
//                   InputLabelProps={{ shrink: true }}
//                   disabled={savingAward}
//                   error={!!formErrors.award_month_year}
//                   helperText={formErrors.award_month_year}
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   fullWidth
//                   size="small"
//                   label="Associated Goals"
//                   value={formData.associated_goals}
//                   onChange={(e) => handleInputChange("associated_goals", e.target.value)}
//                   disabled={savingAward}
//                   error={!!formErrors.associated_goals}
//                   helperText={formErrors.associated_goals}
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   fullWidth
//                   size="small"
//                   label="Award Information"
//                   multiline
//                   rows={2}
//                   required
//                   value={formData.award_information}
//                   onChange={(e) => handleInputChange("award_information", e.target.value)}
//                   disabled={savingAward}
//                   error={!!formErrors.award_information}
//                   helperText={formErrors.award_information}
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   fullWidth
//                   size="small"
//                   label="Description"
//                   multiline
//                   rows={3}
//                   value={formData.description}
//                   onChange={(e) => handleInputChange("description", e.target.value)}
//                   disabled={savingAward}
//                   error={!!formErrors.description}
//                   helperText={formErrors.description}
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <Box display="flex" justifyContent="flex-end">
//                   <Button
//                     variant="contained"
//                     sx={{ mr: 2 }}
//                     onClick={handleFormSubmit}
//                     disabled={savingAward || !isFormValid()}
//                   >
//                     {savingAward ? <CircularProgress size={20} /> : editingAward ? "Update" : "Save"}
//                   </Button>
//                   <Button
//                     variant="outlined"
//                     onClick={() => {
//                       setShowForm(false)
//                       resetForm()
//                     }}
//                     disabled={savingAward}
//                   >
//                     Cancel
//                   </Button>
//                 </Box>
//               </Grid>
//             </Grid>
//           </Paper>
//           <Paper elevation={2} sx={{ p: 1, flex: 1, height: 200 }}>
//             <Typography variant="subtitle2">Award Attachment</Typography>
//             <FormControl fullWidth>
//               <InputLabel shrink htmlFor="upload-file">
//                 Attachment
//               </InputLabel>
//               <input
//                 accept=".gif,.png,.jpg,.jpeg"
//                 type="file"
//                 id="upload-file"
//                 style={{ display: "none" }}
//                 onChange={(e) => handleInputChange("award_photo", e.target.files[0])}
//                 disabled={savingAward}
//               />
//               <label htmlFor="upload-file">
//                 <Button variant="outlined" component="span" fullWidth sx={{ py: 0.5 }} disabled={savingAward}>
//                   {formData.award_photo ? formData.award_photo.name : "Choose file..."}
//                 </Button>
//               </label>
//               <Typography variant="caption">Upload files only: gif, png, jpg, jpeg</Typography>
//             </FormControl>
//           </Paper>
//         </Stack>
//       )}

//       <Paper sx={{ p: 2, mt: showForm ? 3 : 0 }}>
//         <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
//           <Box sx={{ display: "flex", alignItems: "center" }}>
//             <Typography sx={{ mr: 1 }}>Show</Typography>
//             <Select
//               size="small"
//               value={entriesPerPage}
//               onChange={(e) => setEntriesPerPage(Number.parseInt(e.target.value, 10))}
//             >
//               <MenuItem value={10}>10</MenuItem>
//               <MenuItem value={25}>25</MenuItem>
//               <MenuItem value={50}>50</MenuItem>
//             </Select>
//             <Typography sx={{ ml: 1 }}>entries</Typography>
//           </Box>
//           <TextField
//             size="small"
//             placeholder="Search..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </Box>

//         {loadingAwards ? (
//           <Box display="flex" justifyContent="center" p={4}>
//             <CircularProgress />
//           </Box>
//         ) : (
//           <TableContainer>
//             <Table>
//               <TableHead>
//                 <TableRow>
//                   <TableCell>AWARD TYPE</TableCell>
//                   <TableCell>EMPLOYEE</TableCell>
//                   <TableCell>AWARD GIFT</TableCell>
//                   <TableCell>AWARD CASH</TableCell>
//                   <TableCell>MONTH & YEAR</TableCell>
//                   <TableCell>ASSOCIATED GOALS</TableCell>
//                   <TableCell>AWARD INFO</TableCell>
//                   <TableCell>CREATED AT</TableCell>
//                   <TableCell>ACTIONS</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {paginatedAwards.length === 0 ? (
//                   <TableRow>
//                     <TableCell colSpan={9} align="center">
//                       No records available
//                     </TableCell>
//                   </TableRow>
//                 ) : (
//                   paginatedAwards.map((award) => (
//                     <TableRow key={award.award_id}>
//                       <TableCell>{award.award_type_name || "N/A"}</TableCell>
//                       <TableCell>{award.employee_name || "N/A"}</TableCell>
//                       <TableCell>{award.gift_item || "N/A"}</TableCell>
//                       <TableCell>₹{Number.parseInt(award.cash_price || 0)}</TableCell>
//                       <TableCell>{award.award_month_year || "N/A"}</TableCell>
//                       <TableCell>{award.associated_goals || "N/A"}</TableCell>
//                       <TableCell>{award.award_information || "N/A"}</TableCell>
//                       <TableCell>
//                         {award.created_at ? new Date(award.created_at).toLocaleDateString() : "N/A"}
//                       </TableCell>
//                       <TableCell>
//                         <Box sx={{ display: "flex", gap: 1 }}>
//                           <IconButton
//                             size="small"
//                             onClick={() => handleEdit(award)}
//                             disabled={savingAward || deletingAward}
//                             color="primary"
//                           >
//                             <Edit fontSize="small" />
//                           </IconButton>
//                           <IconButton
//                             size="small"
//                             onClick={() => handleDeleteClick(award)}
//                             disabled={savingAward || deletingAward}
//                             color="error"
//                           >
//                             <Delete fontSize="small" />
//                           </IconButton>
//                         </Box>
//                       </TableCell>
//                     </TableRow>
//                   ))
//                 )}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         )}

//         <Typography variant="body2" sx={{ mt: 2 }}>
//           Showing {filteredAwards.length === 0 ? 0 : (currentPage - 1) * entriesPerPage + 1} to{" "}
//           {Math.min(currentPage * entriesPerPage, filteredAwards.length)} of {filteredAwards.length} entries
//         </Typography>

//         <Box display="flex" justifyContent="flex-end" alignItems="center" mt={2}>
//           <Button
//             variant="outlined"
//             size="small"
//             onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//             disabled={currentPage === 1}
//             sx={{ mr: 1 }}
//           >
//             Previous
//           </Button>
//           <Typography variant="body2" mx={1}>
//             Page {currentPage} of {totalPages}
//           </Typography>
//           <Button
//             variant="outlined"
//             size="small"
//             onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
//             disabled={currentPage === totalPages || totalPages === 0}
//           >
//             Next
//           </Button>
//         </Box>
//       </Paper>

//       {/* Delete Confirmation Dialog */}
//       <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
//         <DialogTitle>Confirm Delete</DialogTitle>
//         <DialogContent>
//           <Typography>Are you sure you want to delete this award? This action cannot be undone.</Typography>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setDeleteDialogOpen(false)} disabled={deletingAward}>
//             Cancel
//           </Button>
//           <Button onClick={confirmDelete} color="error" disabled={deletingAward}>
//             {deletingAward ? <CircularProgress size={20} /> : "Delete"}
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   )
// }

// // Component for displaying and managing the list of award types
// const AwardTypesList = ({
//   awardTypes,
//   showTypeForm,
//   setShowTypeForm,
//   newAwardType,
//   setNewAwardType,
//   handleAddAwardType,
//   entriesPerPage,
//   setEntriesPerPage,
//   searchTerm,
//   setSearchTerm,
//   currentPage,
//   setCurrentPage,
//   loading,
//   saving,
//   handleEditAwardType,
//   handleDeleteAwardType,
//   editingAwardType,
//   setEditingAwardType,
//   deletingAwardType,
// }) => {
//   const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
//   const [typeToDelete, setTypeToDelete] = useState(null)

//   const filteredAwardTypes = awardTypes.filter(
//     (type) => type.label && type.label.toLowerCase().includes(searchTerm.toLowerCase()),
//   )
//   const totalPages = Math.ceil(filteredAwardTypes.length / entriesPerPage) || 1
//   const paginatedTypes = filteredAwardTypes.slice((currentPage - 1) * entriesPerPage, currentPage * entriesPerPage)

//   const handleEdit = (type) => {
//     setNewAwardType(type.label)
//     setEditingAwardType(type)
//     setShowTypeForm(true)
//   }

//   const handleDeleteClick = (type) => {
//     setTypeToDelete(type)
//     setDeleteDialogOpen(true)
//   }

//   const confirmDelete = async () => {
//     if (typeToDelete) {
//       await handleDeleteAwardType(typeToDelete.value)
//       setDeleteDialogOpen(false)
//       setTypeToDelete(null)
//     }
//   }

//   const handleFormSubmit = async () => {
//     if (editingAwardType) {
//       await handleEditAwardType()
//     } else {
//       await handleAddAwardType()
//     }
//   }

//   const resetForm = () => {
//     setNewAwardType("")
//     setEditingAwardType(null)
//   }

//   return (
//     <Box>
//       <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2, p: 2 }}>
//         <h3 style={{ margin: 0 }}>List All Award Types</h3>
//         <Button
//           variant="contained"
//           onClick={() => {
//             if (showTypeForm && editingAwardType) {
//               resetForm()
//             }
//             setShowTypeForm((prev) => !prev)
//           }}
//           sx={{ bgcolor: "#7064F5" }}
//           disabled={loading}
//         >
//           {showTypeForm ? "- Hide" : "+ Add New"}
//         </Button>
//       </Box>

//       {showTypeForm && (
//         <Paper sx={{ p: 2, mb: 3 }}>
//           <Typography variant="h6" sx={{ mb: 2 }}>
//             {editingAwardType ? "Edit Award Type" : "Add New Award Type"}
//           </Typography>
//           <TextField
//             fullWidth
//             size="small"
//             value={newAwardType}
//             onChange={(e) => setNewAwardType(e.target.value)}
//             placeholder="Enter award type"
//             disabled={saving}
//           />
//           <Box display="flex" justifyContent="flex-end" mt={2}>
//             <Button
//               variant="contained"
//               onClick={handleFormSubmit}
//               sx={{ mr: 2 }}
//               disabled={saving || !newAwardType.trim()}
//             >
//               {saving ? <CircularProgress size={20} /> : editingAwardType ? "Update" : "Save"}
//             </Button>
//             <Button
//               variant="outlined"
//               onClick={() => {
//                 setShowTypeForm(false)
//                 resetForm()
//               }}
//               disabled={saving}
//             >
//               Cancel
//             </Button>
//           </Box>
//         </Paper>
//       )}

//       <Paper sx={{ p: 2, mt: showTypeForm ? 3 : 0 }}>
//         <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
//           <Box sx={{ display: "flex", alignItems: "center" }}>
//             <Typography sx={{ mr: 1 }}>Show</Typography>
//             <Select
//               size="small"
//               value={entriesPerPage}
//               onChange={(e) => setEntriesPerPage(Number.parseInt(e.target.value, 10))}
//             >
//               <MenuItem value={10}>10</MenuItem>
//               <MenuItem value={25}>25</MenuItem>
//               <MenuItem value={50}>50</MenuItem>
//             </Select>
//             <Typography sx={{ ml: 1 }}>entries</Typography>
//           </Box>
//           <TextField
//             size="small"
//             placeholder="Search..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </Box>

//         {loading ? (
//           <Box display="flex" justifyContent="center" p={4}>
//             <CircularProgress />
//           </Box>
//         ) : (
//           <TableContainer>
//             <Table>
//               <TableHead>
//                 <TableRow>
//                   <TableCell>AWARD TYPE</TableCell>
//                   <TableCell>CREATED AT</TableCell>
//                   <TableCell>ACTIONS</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {paginatedTypes.length === 0 ? (
//                   <TableRow>
//                     <TableCell colSpan={3} align="center">
//                       No records available
//                     </TableCell>
//                   </TableRow>
//                 ) : (
//                   paginatedTypes.map((type) => (
//                     <TableRow key={type.value}>
//                       <TableCell>{type.label}</TableCell>
//                       <TableCell>{type.created_at ? new Date(type.created_at).toLocaleDateString() : "N/A"}</TableCell>
//                       <TableCell>
//                         <Box sx={{ display: "flex", gap: 1 }}>
//                           <IconButton
//                             size="small"
//                             onClick={() => handleEdit(type)}
//                             disabled={saving || deletingAwardType}
//                             color="primary"
//                           >
//                             <Edit fontSize="small" />
//                           </IconButton>
//                           <IconButton
//                             size="small"
//                             onClick={() => handleDeleteClick(type)}
//                             disabled={saving || deletingAwardType}
//                             color="error"
//                           >
//                             <Delete fontSize="small" />
//                           </IconButton>
//                         </Box>
//                       </TableCell>
//                     </TableRow>
//                   ))
//                 )}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         )}

//         <Typography variant="body2" sx={{ mt: 2 }}>
//           Showing {filteredAwardTypes.length === 0 ? 0 : (currentPage - 1) * entriesPerPage + 1} to{" "}
//           {Math.min(currentPage * entriesPerPage, filteredAwardTypes.length)} of {filteredAwardTypes.length} entries
//         </Typography>

//         <Box display="flex" justifyContent="flex-end" alignItems="center" mt={2}>
//           <Button
//             variant="outlined"
//             size="small"
//             onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//             disabled={currentPage === 1}
//             sx={{ mr: 1 }}
//           >
//             Previous
//           </Button>
//           <Typography variant="body2" mx={1}>
//             Page {currentPage} of {totalPages}
//           </Typography>
//           <Button
//             variant="outlined"
//             size="small"
//             onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
//             disabled={currentPage === totalPages || totalPages === 0}
//           >
//             Next
//           </Button>
//         </Box>
//       </Paper>

//       {/* Delete Confirmation Dialog */}
//       <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
//         <DialogTitle>Confirm Delete</DialogTitle>
//         <DialogContent>
//           <Typography>Are you sure you want to delete this award type? This action cannot be undone.</Typography>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setDeleteDialogOpen(false)} disabled={deletingAwardType}>
//             Cancel
//           </Button>
//           <Button onClick={confirmDelete} color="error" disabled={deletingAwardType}>
//             {deletingAwardType ? <CircularProgress size={20} /> : "Delete"}
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   )
// }

// export default function AwardsAdmin() {
//   const [activeTab, setActiveTab] = useState(0)
//   const [showForm, setShowForm] = useState(false)
//   const [awards, setAwards] = useState([])
//   const [employees, setEmployees] = useState([])
//   const [showTypeForm, setShowTypeForm] = useState(false)
//   const [newAwardType, setNewAwardType] = useState("")
//   const [awardTypes, setAwardTypes] = useState([])
//   const [entriesPerPage, setEntriesPerPage] = useState(10)
//   const [searchTerm, setSearchTerm] = useState("")
//   const [currentPage, setCurrentPage] = useState(1)
//   const [loading, setLoading] = useState(false)
//   const [loadingAwards, setLoadingAwards] = useState(false)
//   const [loadingEmployees, setLoadingEmployees] = useState(false)
//   const [loadingAwardTypes, setLoadingAwardTypes] = useState(false)
//   const [saving, setSaving] = useState(false)
//   const [savingAward, setSavingAward] = useState(false)
//   const [deletingAward, setDeletingAward] = useState(false)
//   const [deletingAwardType, setDeletingAwardType] = useState(false)
//   const [formErrors, setFormErrors] = useState({})
//   const [editingAward, setEditingAward] = useState(null)
//   const [editingAwardType, setEditingAwardType] = useState(null)
//   const [notification, setNotification] = useState({
//     open: false,
//     message: "",
//     severity: "success",
//   })

//   // Form data for new award
//   const [formData, setFormData] = useState({
//     employee_id: "",
//     award_type_id: "",
//     associated_goals: "",
//     gift_item: "",
//     cash_price: "0",
//     award_month_year: "",
//     award_information: "",
//     description: "",
//     award_photo: null,
//     created_at: "",
//   })

//   // API Base URLs
//   const API_BASE_URL = "https://tdtlworld.com/hrms-backend"

//   // Fetch awards from API
//   const fetchAwards = async () => {
//     setLoadingAwards(true)
//     try {
//       const response = await fetch(`${API_BASE_URL}/api/awards/`)
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`)
//       }
//       const data = await response.json()

//       // Handle both array and object responses
//       const awardsArray = Array.isArray(data) ? data : data.results || []
//       setAwards(awardsArray)
//     } catch (error) {
//       console.error("Error fetching awards:", error)
//       setNotification({
//         open: true,
//         message: "Failed to fetch awards. Please try again.",
//         severity: "error",
//       })
//       setAwards([])
//     } finally {
//       setLoadingAwards(false)
//     }
//   }

//   // Fetch employees from API
//   const fetchEmployees = async () => {
//     setLoadingEmployees(true)
//     try {
//       const response = await fetch(`${API_BASE_URL}/employee-dropdown/`)
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`)
//       }
//       const data = await response.json()

//       // Handle both array and object responses
//       const employeesArray = Array.isArray(data) ? data : data.results || []
//       setEmployees(employeesArray)
//     } catch (error) {
//       console.error("Error fetching employees:", error)
//       setNotification({
//         open: true,
//         message: "Failed to fetch employees. Please try again.",
//         severity: "error",
//       })
//       setEmployees([])
//     } finally {
//       setLoadingEmployees(false)
//     }
//   }

//   // Fetch award types from API
//   const fetchAwardTypes = async () => {
//     setLoading(true)
//     setLoadingAwardTypes(true)
//     try {
//       const response = await fetch(`${API_BASE_URL}/api/award-types/`)
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`)
//       }
//       const data = await response.json()

//       // Handle both array and object responses
//       const typesArray = Array.isArray(data) ? data : data.results || []
//       setAwardTypes(typesArray)
//     } catch (error) {
//       console.error("Error fetching award types:", error)
//       setNotification({
//         open: true,
//         message: "Failed to fetch award types. Please try again.",
//         severity: "error",
//       })
//       setAwardTypes([])
//     } finally {
//       setLoading(false)
//       setLoadingAwardTypes(false)
//     }
//   }

//   // Add new award via API
//   const handleSaveAward = async () => {
//     setSavingAward(true)
//     setFormErrors({})

//     try {
//       // Prepare form data for submission
//       const submitData = new FormData()

//       // Add required fields
//       submitData.append("company_id", "2") // Default company ID as per payload
//       submitData.append("employee_id", formData.employee_id)
//       submitData.append("award_type_id", formData.award_type_id)
//       submitData.append("associated_goals", formData.associated_goals || "")
//       submitData.append("gift_item", formData.gift_item || "")

//       // Ensure cash_price is properly formatted as integer
//       const cashPrice = Number.parseInt(formData.cash_price) || 0
//       submitData.append("cash_price", cashPrice.toString())

//       submitData.append("award_month_year", formData.award_month_year)
//       submitData.append("award_information", formData.award_information)
//       submitData.append("description", formData.description || "")

//       if (formData.created_at) {
//         submitData.append("created_at", formData.created_at)
//       }

//       if (formData.award_photo) {
//         submitData.append("award_photo", formData.award_photo)
//       }

//       const response = await fetch(`${API_BASE_URL}/api/awards/`, {
//         method: "POST",
//         body: submitData,
//       })

//       if (!response.ok) {
//         const errorData = await response.json()

//         // Handle validation errors
//         if (response.status === 400 && errorData) {
//           setFormErrors(errorData)
//           setNotification({
//             open: true,
//             message: "Please fix the form errors and try again.",
//             severity: "error",
//           })
//           return
//         }

//         throw new Error(`HTTP error! status: ${response.status}`)
//       }

//       const result = await response.json()

//       setNotification({
//         open: true,
//         message: "Award added successfully!",
//         severity: "success",
//       })

//       // Refresh awards list
//       await fetchAwards()

//       // Reset form
//       setFormData({
//         employee_id: "",
//         award_type_id: "",
//         associated_goals: "",
//         gift_item: "",
//         cash_price: "0",
//         award_month_year: "",
//         award_information: "",
//         description: "",
//         award_photo: null,
//         created_at: "",
//       })

//       setShowForm(false)
//     } catch (error) {
//       console.error("Error adding award:", error)
//       setNotification({
//         open: true,
//         message: "Failed to add award. Please try again.",
//         severity: "error",
//       })
//     } finally {
//       setSavingAward(false)
//     }
//   }

//   // Edit award via API
//   const handleEditAward = async () => {
//     if (!editingAward) return

//     setSavingAward(true)
//     setFormErrors({})

//     try {
//       // Prepare form data for submission
//       const submitData = new FormData()

//       // Add required fields
//       submitData.append("company_id", "2")
//       submitData.append("employee_id", formData.employee_id)
//       submitData.append("award_type_id", formData.award_type_id)
//       submitData.append("associated_goals", formData.associated_goals || "")
//       submitData.append("gift_item", formData.gift_item || "")

//       // Ensure cash_price is properly formatted as integer
//       const cashPrice = Number.parseInt(formData.cash_price) || 0
//       submitData.append("cash_price", cashPrice.toString())

//       submitData.append("award_month_year", formData.award_month_year)
//       submitData.append("award_information", formData.award_information)
//       submitData.append("description", formData.description || "")

//       if (formData.created_at) {
//         submitData.append("created_at", formData.created_at)
//       }

//       if (formData.award_photo) {
//         submitData.append("award_photo", formData.award_photo)
//       }

//       const response = await fetch(`${API_BASE_URL}/api/awards/${editingAward.award_id}/`, {
//         method: "PATCH",
//         body: submitData,
//       })

//       if (!response.ok) {
//         const errorData = await response.json()

//         // Handle validation errors
//         if (response.status === 400 && errorData) {
//           setFormErrors(errorData)
//           setNotification({
//             open: true,
//             message: "Please fix the form errors and try again.",
//             severity: "error",
//           })
//           return
//         }

//         throw new Error(`HTTP error! status: ${response.status}`)
//       }

//       const result = await response.json()

//       setNotification({
//         open: true,
//         message: "Award updated successfully!",
//         severity: "success",
//       })

//       // Refresh awards list
//       await fetchAwards()

//       // Reset form
//       setFormData({
//         employee_id: "",
//         award_type_id: "",
//         associated_goals: "",
//         gift_item: "",
//         cash_price: "0",
//         award_month_year: "",
//         award_information: "",
//         description: "",
//         award_photo: null,
//         created_at: "",
//       })

//       setEditingAward(null)
//       setShowForm(false)
//     } catch (error) {
//       console.error("Error updating award:", error)
//       setNotification({
//         open: true,
//         message: "Failed to update award. Please try again.",
//         severity: "error",
//       })
//     } finally {
//       setSavingAward(false)
//     }
//   }

//   // Delete award via API
//   const handleDeleteAward = async (awardId) => {
//     setDeletingAward(true)

//     try {
//       const response = await fetch(`${API_BASE_URL}/api/awards/${awardId}/`, {
//         method: "DELETE",
//       })

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`)
//       }

//       setNotification({
//         open: true,
//         message: "Award deleted successfully!",
//         severity: "success",
//       })

//       // Refresh awards list
//       await fetchAwards()
//     } catch (error) {
//       console.error("Error deleting award:", error)
//       setNotification({
//         open: true,
//         message: "Failed to delete award. Please try again.",
//         severity: "error",
//       })
//     } finally {
//       setDeletingAward(false)
//     }
//   }

//   // Add new award type via API
//   const handleAddAwardType = async () => {
//     if (!newAwardType.trim()) return

//     setSaving(true)
//     try {
//       const response = await fetch(`${API_BASE_URL}/api/award-types/`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           category_name: newAwardType.trim(),
//         }),
//       })

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`)
//       }

//       const result = await response.json()

//       setNotification({
//         open: true,
//         message: "Award type added successfully!",
//         severity: "success",
//       })

//       // Refresh award types list
//       await fetchAwardTypes()

//       setNewAwardType("")
//       setShowTypeForm(false)
//     } catch (error) {
//       console.error("Error adding award type:", error)
//       setNotification({
//         open: true,
//         message: "Failed to add award type. Please try again.",
//         severity: "error",
//       })
//     } finally {
//       setSaving(false)
//     }
//   }

//   // Edit award type via API
//   const handleEditAwardType = async () => {
//     if (!editingAwardType || !newAwardType.trim()) return

//     setSaving(true)
//     try {
//       const response = await fetch(`${API_BASE_URL}/api/award-types/${editingAwardType.value}/`, {
//         method: "PATCH",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           category_name: newAwardType.trim(),
//         }),
//       })

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`)
//       }

//       const result = await response.json()

//       setNotification({
//         open: true,
//         message: "Award type updated successfully!",
//         severity: "success",
//       })

//       // Refresh award types list
//       await fetchAwardTypes()

//       setNewAwardType("")
//       setEditingAwardType(null)
//       setShowTypeForm(false)
//     } catch (error) {
//       console.error("Error updating award type:", error)
//       setNotification({
//         open: true,
//         message: "Failed to update award type. Please try again.",
//         severity: "error",
//       })
//     } finally {
//       setSaving(false)
//     }
//   }

//   // Delete award type via API
//   const handleDeleteAwardType = async (typeId) => {
//     setDeletingAwardType(true)

//     try {
//       const response = await fetch(`${API_BASE_URL}/api/award-types/${typeId}/`, {
//         method: "DELETE",
//       })

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`)
//       }

//       setNotification({
//         open: true,
//         message: "Award type deleted successfully!",
//         severity: "success",
//       })

//       // Refresh award types list
//       await fetchAwardTypes()
//     } catch (error) {
//       console.error("Error deleting award type:", error)
//       setNotification({
//         open: true,
//         message: "Failed to delete award type. Please try again.",
//         severity: "error",
//       })
//     } finally {
//       setDeletingAwardType(false)
//     }
//   }

//   // Fetch all data on component mount
//   useEffect(() => {
//     fetchAwards()
//     fetchEmployees()
//     fetchAwardTypes()
//   }, [])

//   // Reset page when search, tab, or entries per page changes
//   useEffect(() => {
//     setCurrentPage(1)
//   }, [searchTerm, activeTab, entriesPerPage])

//   const handleTabChange = (event, newValue) => {
//     setActiveTab(newValue)
//   }

//   const handleCloseNotification = () => {
//     setNotification({ ...notification, open: false })
//   }

//   return (
//     <Box sx={{ p: 3 }}>
//       <Tabs value={activeTab} onChange={handleTabChange} sx={{ mb: 3 }}>
//         <Tab label="Awards" sx={{ fontWeight: "bold" }} />
//         <Tab label="Award Types" sx={{ fontWeight: "bold" }} />
//       </Tabs>

//       {activeTab === 0 ? (
//         <AwardsList
//           awards={awards}
//           showForm={showForm}
//           setShowForm={setShowForm}
//           entriesPerPage={entriesPerPage}
//           setEntriesPerPage={setEntriesPerPage}
//           searchTerm={searchTerm}
//           setSearchTerm={setSearchTerm}
//           currentPage={currentPage}
//           setCurrentPage={setCurrentPage}
//           employees={employees}
//           awardTypes={awardTypes}
//           formData={formData}
//           setFormData={setFormData}
//           handleSaveAward={handleSaveAward}
//           loadingAwards={loadingAwards}
//           savingAward={savingAward}
//           loadingEmployees={loadingEmployees}
//           loadingAwardTypes={loadingAwardTypes}
//           formErrors={formErrors}
//           editingAward={editingAward}
//           setEditingAward={setEditingAward}
//           handleEditAward={handleEditAward}
//           handleDeleteAward={handleDeleteAward}
//           deletingAward={deletingAward}
//         />
//       ) : (
//         <AwardTypesList
//           awardTypes={awardTypes}
//           showTypeForm={showTypeForm}
//           setShowTypeForm={setShowTypeForm}
//           newAwardType={newAwardType}
//           setNewAwardType={setNewAwardType}
//           handleAddAwardType={handleAddAwardType}
//           entriesPerPage={entriesPerPage}
//           setEntriesPerPage={setEntriesPerPage}
//           searchTerm={searchTerm}
//           setSearchTerm={setSearchTerm}
//           currentPage={currentPage}
//           setCurrentPage={setCurrentPage}
//           loading={loading}
//           saving={saving}
//           handleEditAwardType={handleEditAwardType}
//           handleDeleteAwardType={handleDeleteAwardType}
//           editingAwardType={editingAwardType}
//           setEditingAwardType={setEditingAwardType}
//           deletingAwardType={deletingAwardType}
//         />
//       )}

//       {/* Notification Snackbar */}
//       <Snackbar
//         open={notification.open}
//         autoHideDuration={6000}
//         onClose={handleCloseNotification}
//         anchorOrigin={{ vertical: "top", horizontal: "right" }}
//       >
//         <Alert onClose={handleCloseNotification} severity={notification.severity} sx={{ width: "100%" }}>
//           {notification.message}
//         </Alert>
//       </Snackbar>
//     </Box>
//   )
// }
//// 








// import { useState, useEffect } from "react"
// import {
//   Button,
//   Box,
//   Stack,
//   Typography,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TextField,
//   Select,
//   MenuItem,
//   Tabs,
//   Tab,
//   Grid,
//   InputLabel,
//   FormControl,
//   CircularProgress,
//   Alert,
//   Snackbar,
//   InputAdornment,
//   IconButton,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Pagination,
//   Card,
//   CardContent
// } from "@mui/material"
// import { Edit, Delete } from "@mui/icons-material"

// // Component for displaying and managing the list of awards
// const AwardsList = ({
//   awards,
//   showForm,
//   setShowForm,
//   entriesPerPage,
//   setEntriesPerPage,
//   searchTerm,
//   setSearchTerm,
//   currentPage,
//   setCurrentPage,
//   employees,
//   awardTypes,
//   formData,
//   setFormData,
//   handleSaveAward,
//   loadingAwards,
//   savingAward,
//   loadingEmployees,
//   loadingAwardTypes,
//   formErrors,
//   editingAward,
//   setEditingAward,
//   handleEditAward,
//   handleDeleteAward,
//   deletingAward,
// }) => {
//   const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
//   const [awardToDelete, setAwardToDelete] = useState(null)

//   const filteredAwards = awards.filter((award) =>
//     Object.values(award).some((value) => value && value.toString().toLowerCase().includes(searchTerm.toLowerCase())),
//   )
//   const totalPages = Math.ceil(filteredAwards.length / entriesPerPage) || 1
//   const paginatedAwards = filteredAwards.slice((currentPage - 1) * entriesPerPage, currentPage * entriesPerPage)

//   const handleInputChange = (field, value) => {
//     setFormData((prev) => ({
//       ...prev,
//       [field]: value,
//     }))
//   }

//   const handleCashPriceChange = (value) => {
//     let numValue = Number.parseInt(value) || 0
//     if (numValue < 0) {
//       numValue = 0
//     }
//     handleInputChange("cash_price", numValue.toString())
//   }

//   const resetForm = () => {
//     setFormData({
//       employee_id: "",
//       award_type_id: "",
//       associated_goals: "",
//       gift_item: "",
//       cash_price: "0",
//       award_month_year: "",
//       award_information: "",
//       description: "",
//       award_photo: null,
//       created_at: "",
//     })
//     setEditingAward(null)
//   }

//   const handleFormSubmit = async () => {
//     if (editingAward) {
//       await handleEditAward()
//     } else {
//       await handleSaveAward()
//     }
//   }

//   const isFormValid = () => {
//     return formData.employee_id && formData.award_type_id && formData.award_month_year && formData.award_information
//   }

//   const handleEdit = (award) => {
//     // Helper to convert "Month YYYY" to "YYYY-MM"
//     const formatMonthYear = (monthYearString) => {
//       if (!monthYearString) return "";
//       try {
//         const date = new Date(monthYearString);
//         if (isNaN(date.getTime())) return ""; // Invalid date
//         const year = date.getFullYear();
//         const month = (date.getMonth() + 1).toString().padStart(2, '0');
//         return `${year}-${month}`;
//       } catch (e) {
//         console.error("Could not parse month/year:", monthYearString);
//         return "";
//       }
//     };

//     setFormData({
//       // FIX #1: Use the correct keys from your payload
//       employee_id: award.employee_id || "",
//       award_type_id: award.award_type_id || "",

//       // The rest of the fields
//       associated_goals: award.associated_goals || "",
//       gift_item: award.gift_item || "",
//       cash_price: Number.parseInt(award.cash_price || 0).toString(),

//       // FIX #2: Format the month and year correctly for the input field
//       award_month_year: formatMonthYear(award.award_month_year),

//       award_information: award.award_information || "",
//       description: award.description || "",
//       award_photo: null, // Reset photo on edit, user can upload a new one
//       created_at: award.created_at ? award.created_at.split(" ")[0] : "",
//     });

//     setEditingAward(award);
//     setShowForm(true);
//     window.scrollTo(0, 0);
//   };

//   const handleDeleteClick = (award) => {
//     setAwardToDelete(award)
//     setDeleteDialogOpen(true)
//   }

//   const confirmDelete = async () => {
//     if (awardToDelete) {
//       await handleDeleteAward(awardToDelete.award_id)
//       setDeleteDialogOpen(false)
//       setAwardToDelete(null)
//     }
//   }

//   return (
//     <Box>
//       <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3, alignItems: 'center' }}>
//         <Typography variant="h5" fontWeight="600">List All Awards</Typography>
//         <Button
//           variant="contained"
//           onClick={() => {
//             if (showForm && editingAward) {
//               resetForm()
//             }
//             setShowForm((prev) => !prev)
//           }}
//           sx={{ backgroundColor: '#7C3AED', '&:hover': { backgroundColor: '#6D28D9' } }}
//           disabled={loadingAwards}
//         >
//           {showForm ? "− Cancel" : "+ Add New"}
//         </Button>
//       </Box>

//       {showForm && (
//         <Paper variant="outlined" sx={{ p: { xs: 1.5, sm: 3 }, mb: 4, backgroundColor: '#fdfdfd' }}>
//           <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
//             <Box sx={{ flex: 2 }}>
//               <Typography variant="h6" gutterBottom>{editingAward ? "Edit Award" : "Add New Award"}</Typography>
//               <Grid container spacing={2.5}>
//                 <Grid item xs={12} sm={6}>
//                   <FormControl fullWidth size="small" required error={!!formErrors.employee_id}>
//                     <InputLabel>Employee</InputLabel>
//                     <Select value={formData.employee_id} onChange={(e) => handleInputChange("employee_id", e.target.value)} label="Employee" disabled={loadingEmployees || savingAward}>
//                       {loadingEmployees ? <MenuItem disabled><CircularProgress size={20} /> Loading...</MenuItem> : employees.map((employee) => (<MenuItem key={employee.value} value={employee.value}>{employee.label}</MenuItem>))}
//                     </Select>
//                     {formErrors.employee_id && <Typography variant="caption" color="error" sx={{ mt: 0.5 }}>{formErrors.employee_id}</Typography>}
//                   </FormControl>
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <FormControl fullWidth size="small" required error={!!formErrors.award_type_id}>
//                     <InputLabel>Award Type</InputLabel>
//                     <Select value={formData.award_type_id} onChange={(e) => handleInputChange("award_type_id", e.target.value)} label="Award Type" disabled={loadingAwardTypes || savingAward}>
//                       {loadingAwardTypes ? <MenuItem disabled><CircularProgress size={20} /> Loading...</MenuItem> : awardTypes.map((type) => (<MenuItem key={type.value} value={type.value}>{type.label}</MenuItem>))}
//                     </Select>
//                     {formErrors.award_type_id && <Typography variant="caption" color="error" sx={{ mt: 0.5 }}>{formErrors.award_type_id}</Typography>}
//                   </FormControl>
//                 </Grid>
//                 <Grid item xs={12} sm={6}><TextField fullWidth size="small" type="date" label="Date" value={formData.created_at || ""} onChange={(e) => handleInputChange("created_at", e.target.value)} InputLabelProps={{ shrink: true }} disabled={savingAward} error={!!formErrors.created_at} helperText={formErrors.created_at} /></Grid>
//                 <Grid item xs={12} sm={6}><TextField fullWidth size="small" label="Gift Item" value={formData.gift_item} onChange={(e) => handleInputChange("gift_item", e.target.value)} disabled={savingAward} error={!!formErrors.gift_item} helperText={formErrors.gift_item} /></Grid>
//                 <Grid item xs={12} sm={6}><TextField fullWidth size="small" label="Cash Amount" required type="number" value={formData.cash_price} onChange={(e) => handleCashPriceChange(e.target.value)} InputProps={{ startAdornment: <InputAdornment position="start">₹</InputAdornment>, inputProps: { step: "1", min: "0" } }} disabled={savingAward} error={!!formErrors.cash_price} helperText={formErrors.cash_price} /></Grid>
//                 <Grid item xs={12} sm={6}><TextField fullWidth size="small" type="month" label="Month & Year" required value={formData.award_month_year} onChange={(e) => handleInputChange("award_month_year", e.target.value)} InputLabelProps={{ shrink: true }} disabled={savingAward} error={!!formErrors.award_month_year} helperText={formErrors.award_month_year} /></Grid>
//                 <Grid item xs={12}><TextField fullWidth size="small" label="Associated Goals" value={formData.associated_goals} onChange={(e) => handleInputChange("associated_goals", e.target.value)} disabled={savingAward} error={!!formErrors.associated_goals} helperText={formErrors.associated_goals} /></Grid>
//                 <Grid item xs={12}><TextField fullWidth size="small" label="Award Information" multiline rows={2} required value={formData.award_information} onChange={(e) => handleInputChange("award_information", e.target.value)} disabled={savingAward} error={!!formErrors.award_information} helperText={formErrors.award_information} /></Grid>
//                 <Grid item xs={12}><TextField fullWidth size="small" label="Description" multiline rows={3} value={formData.description} onChange={(e) => handleInputChange("description", e.target.value)} disabled={savingAward} error={!!formErrors.description} helperText={formErrors.description} /></Grid>
//               </Grid>
//             </Box>
//             <Box sx={{ flex: 1, mt: { xs: 3, md: 0 } }}>
//               <Typography variant="h6" gutterBottom>Award Attachment</Typography>
//               <Paper variant="outlined" sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', minHeight: 150 }}>
//                 <input accept=".gif,.png,.jpg,.jpeg" type="file" id="upload-file" style={{ display: "none" }} onChange={(e) => handleInputChange("award_photo", e.target.files[0])} disabled={savingAward} />
//                 <label htmlFor="upload-file">
//                   <Button variant="outlined" component="span" sx={{ borderColor: '#7C3AED', color: '#7C3AED', '&:hover': { borderColor: '#6D28D9', backgroundColor: 'rgba(124, 58, 237, 0.04)' } }} disabled={savingAward}>Choose file</Button>
//                 </label>
//                 <Typography variant="caption" sx={{ mt: 1, textAlign: 'center', wordBreak: 'break-all' }}>{formData.award_photo ? formData.award_photo.name : "No file chosen"}</Typography>
//                 <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5 }}>gif, png, jpg, jpeg</Typography>
//               </Paper>
//             </Box>
//           </Stack>
//           <Box display="flex" justifyContent="flex-end" gap={2} mt={3}>
//             <Button variant="outlined" color="secondary" onClick={resetForm} disabled={savingAward}>Reset</Button>
//             <Button variant="contained" onClick={handleFormSubmit} disabled={savingAward || !isFormValid()} sx={{ backgroundColor: '#7C3AED', '&:hover': { backgroundColor: '#6D28D9' } }}>
//               {savingAward ? <CircularProgress size={24} color="inherit" /> : editingAward ? "Update" : "Save"}
//             </Button>
//           </Box>
//         </Paper>
//       )}

//       <Paper variant="outlined">
//         <Box sx={{ p: 2, display: "flex", justifyContent: "space-between", alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
//           <FormControl size="small" variant="outlined">
//             <InputLabel>Show</InputLabel>
//             <Select value={entriesPerPage} onChange={(e) => setEntriesPerPage(Number(e.target.value))} label="Show" sx={{ width: 80 }}>
//               <MenuItem value={10}>10</MenuItem>
//               <MenuItem value={25}>25</MenuItem>
//               <MenuItem value={50}>50</MenuItem>
//             </Select>
//           </FormControl>
//           <TextField size="small" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} sx={{ width: { xs: '100%', sm: 300 } }} />
//         </Box>

//         {loadingAwards ? (
//           <Box display="flex" justifyContent="center" p={5}><CircularProgress /></Box>
//         ) : (
//           <TableContainer>
//             <Table size="small">
//               <TableHead sx={{ backgroundColor: '#f9fafb' }}>
//                 <TableRow>
//                   {['SR. NO.', 'AWARD TYPE', 'EMPLOYEE', 'GIFT', 'CASH', 'MONTH & YEAR', 'AWARD INFO', 'CREATED AT', 'ACTIONS'].map(h =>
//                     <TableCell key={h} sx={{ fontWeight: 600 }}>{h}</TableCell>
//                   )}
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {paginatedAwards.length === 0 ? (
//                   <TableRow><TableCell colSpan={9} align="center" sx={{ py: 5 }}>No records available</TableCell></TableRow>
//                 ) : (
//                   paginatedAwards.map((award, index) => (
//                     <TableRow key={award.award_id} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
//                       <TableCell>{(currentPage - 1) * entriesPerPage + index + 1}</TableCell>
//                       <TableCell>{award.award_type_name || "N/A"}</TableCell>
//                       <TableCell>{award.employee_name || "N/A"}</TableCell>
//                       <TableCell>{award.gift_item || "N/A"}</TableCell>
//                       <TableCell>₹{Number.parseInt(award.cash_price || 0)}</TableCell>
//                       <TableCell>{award.award_month_year || "N/A"}</TableCell>
//                       <TableCell>{award.award_information || "N/A"}</TableCell>
//                       <TableCell>{award.created_at ? new Date(award.created_at).toLocaleDateString() : "N/A"}</TableCell>
//                       <TableCell>
//                         <Box sx={{ display: "flex", gap: 0.5 }}>
//                           <IconButton size="small" onClick={() => handleEdit(award)} disabled={savingAward || deletingAward}><Edit fontSize="small" sx={{ color: '#7C3AED' }} /></IconButton>
//                           <IconButton size="small" onClick={() => handleDeleteClick(award)} disabled={savingAward || deletingAward} color="error"><Delete fontSize="small" /></IconButton>
//                         </Box>
//                       </TableCell>
//                     </TableRow>
//                   ))
//                 )}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         )}
//         <Box display="flex" justifyContent="space-between" alignItems="center" p={2} flexWrap="wrap" gap={2}>
//           <Typography variant="body2" color="text.secondary">
//             Showing {filteredAwards.length === 0 ? 0 : (currentPage - 1) * entriesPerPage + 1} to{" "}
//             {Math.min(currentPage * entriesPerPage, filteredAwards.length)} of {filteredAwards.length} entries
//           </Typography>
//           {totalPages > 1 && (
//             <Pagination count={totalPages} page={currentPage} onChange={(e, value) => setCurrentPage(value)} color="primary" sx={{ '& .Mui-selected': { backgroundColor: '#7C3AED', color: 'white' } }} size="small" />
//           )}
//         </Box>
//       </Paper>

//       <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
//         <DialogTitle>Confirm Delete</DialogTitle>
//         <DialogContent><Typography>Are you sure you want to delete this award? This action cannot be undone.</Typography></DialogContent>
//         <DialogActions>
//           <Button onClick={() => setDeleteDialogOpen(false)} disabled={deletingAward}>Cancel</Button>
//           <Button onClick={confirmDelete} color="error" variant="contained" disabled={deletingAward}>{deletingAward ? <CircularProgress size={24} color="inherit" /> : "Delete"}</Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   )
// }

// // Component for displaying and managing the list of award types
// const AwardTypesList = ({
//   awardTypes,
//   showTypeForm,
//   setShowTypeForm,
//   newAwardType,
//   setNewAwardType,
//   handleAddAwardType,
//   entriesPerPage,
//   setEntriesPerPage,
//   searchTerm,
//   setSearchTerm,
//   currentPage,
//   setCurrentPage,
//   loading,
//   saving,
//   handleEditAwardType,
//   handleDeleteAwardType,
//   editingAwardType,
//   setEditingAwardType,
//   deletingAwardType,
// }) => {
//   const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
//   const [typeToDelete, setTypeToDelete] = useState(null)

//   const filteredAwardTypes = awardTypes.filter(
//     (type) => type.label && type.label.toLowerCase().includes(searchTerm.toLowerCase()),
//   )
//   const totalPages = Math.ceil(filteredAwardTypes.length / entriesPerPage) || 1
//   const paginatedTypes = filteredAwardTypes.slice((currentPage - 1) * entriesPerPage, currentPage * entriesPerPage)

//   const handleEdit = (type) => {
//     setNewAwardType(type.label)
//     setEditingAwardType(type)
//     setShowTypeForm(true)
//     window.scrollTo(0, 0);
//   }

//   const handleDeleteClick = (type) => {
//     setTypeToDelete(type)
//     setDeleteDialogOpen(true)
//   }

//   const confirmDelete = async () => {
//     if (typeToDelete) {
//       await handleDeleteAwardType(typeToDelete.value)
//       setDeleteDialogOpen(false)
//       setTypeToDelete(null)
//     }
//   }

//   const handleFormSubmit = async () => {
//     if (editingAwardType) {
//       await handleEditAwardType()
//     } else {
//       await handleAddAwardType()
//     }
//   }

//   const resetForm = () => {
//     setNewAwardType("")
//     setEditingAwardType(null)
//   }

//   return (
//     <Box>
//       <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3, alignItems: 'center' }}>
//         <Typography variant="h5" fontWeight="600">List All Award Types</Typography>
//         <Button
//           variant="contained"
//           onClick={() => {
//             if (showTypeForm && editingAwardType) {
//               resetForm()
//             }
//             setShowTypeForm((prev) => !prev)
//           }}
//           sx={{ backgroundColor: '#7C3AED', '&:hover': { backgroundColor: '#6D28D9' } }}
//           disabled={loading}
//         >
//           {showTypeForm ? "− Cancel" : "+ Add New"}
//         </Button>
//       </Box>

//       {showTypeForm && (
//         <Paper variant="outlined" sx={{ p: { xs: 1.5, sm: 3 }, mb: 4, backgroundColor: '#fdfdfd' }}>
//           <Typography variant="h6" sx={{ mb: 2 }}>{editingAwardType ? "Edit Award Type" : "Add New Award Type"}</Typography>
//           <TextField fullWidth size="small" value={newAwardType} onChange={(e) => setNewAwardType(e.target.value)} placeholder="Enter award type" disabled={saving} />
//           <Box display="flex" justifyContent="flex-end" mt={2} gap={2}>
//             <Button variant="outlined" color="secondary" onClick={() => { setShowTypeForm(false); resetForm() }} disabled={saving}>Cancel</Button>
//             <Button variant="contained" onClick={handleFormSubmit} sx={{ backgroundColor: '#7C3AED', '&:hover': { backgroundColor: '#6D28D9' } }} disabled={saving || !newAwardType.trim()}>
//               {saving ? <CircularProgress size={24} color="inherit" /> : editingAwardType ? "Update" : "Save"}
//             </Button>
//           </Box>
//         </Paper>
//       )}

//       <Paper variant="outlined">
//         <Box sx={{ p: 2, display: "flex", justifyContent: "space-between", alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
//           <FormControl size="small" variant="outlined">
//             <InputLabel>Show</InputLabel>
//             <Select value={entriesPerPage} onChange={(e) => setEntriesPerPage(Number(e.target.value))} label="Show" sx={{ width: 80 }}>
//               <MenuItem value={10}>10</MenuItem>
//               <MenuItem value={25}>25</MenuItem>
//               <MenuItem value={50}>50</MenuItem>
//             </Select>
//           </FormControl>
//           <TextField size="small" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} sx={{ width: { xs: '100%', sm: 300 } }} />
//         </Box>

//         {loading ? (
//           <Box display="flex" justifyContent="center" p={5}><CircularProgress /></Box>
//         ) : (
//           <TableContainer>
//             <Table size="small">
//               <TableHead sx={{ backgroundColor: '#f9fafb' }}>
//                 <TableRow>
//                   {['SR. NO.', 'AWARD TYPE', 'CREATED AT', 'ACTIONS'].map(h => <TableCell key={h} sx={{ fontWeight: 600 }}>{h}</TableCell>)}
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {paginatedTypes.length === 0 ? (
//                   <TableRow><TableCell colSpan={4} align="center" sx={{ py: 5 }}>No records available</TableCell></TableRow>
//                 ) : (
//                   paginatedTypes.map((type, index) => (
//                     <TableRow key={type.value} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
//                       <TableCell>{(currentPage - 1) * entriesPerPage + index + 1}</TableCell>
//                       <TableCell>{type.label}</TableCell>
//                       <TableCell>{type.created_at ? new Date(type.created_at).toLocaleDateString() : "N/A"}</TableCell>
//                       <TableCell>
//                         <Box sx={{ display: "flex", gap: 0.5 }}>
//                           <IconButton size="small" onClick={() => handleEdit(type)} disabled={saving || deletingAwardType}><Edit fontSize="small" sx={{ color: '#7C3AED' }} /></IconButton>
//                           <IconButton size="small" onClick={() => handleDeleteClick(type)} disabled={saving || deletingAwardType} color="error"><Delete fontSize="small" /></IconButton>
//                         </Box>
//                       </TableCell>
//                     </TableRow>
//                   ))
//                 )}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         )}

//         <Box display="flex" justifyContent="space-between" alignItems="center" p={2} flexWrap="wrap" gap={2}>
//           <Typography variant="body2" color="text.secondary">
//             Showing {filteredAwardTypes.length === 0 ? 0 : (currentPage - 1) * entriesPerPage + 1} to{" "}
//             {Math.min(currentPage * entriesPerPage, filteredAwardTypes.length)} of {filteredAwardTypes.length} entries
//           </Typography>
//           {totalPages > 1 && (
//             <Pagination count={totalPages} page={currentPage} onChange={(e, value) => setCurrentPage(value)} color="primary" sx={{ '& .Mui-selected': { backgroundColor: '#7C3AED', color: 'white' } }} size="small" />
//           )}
//         </Box>
//       </Paper>

//       <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
//         <DialogTitle>Confirm Delete</DialogTitle>
//         <DialogContent><Typography>Are you sure you want to delete this award type? This action cannot be undone.</Typography></DialogContent>
//         <DialogActions>
//           <Button onClick={() => setDeleteDialogOpen(false)} disabled={deletingAwardType}>Cancel</Button>
//           <Button onClick={confirmDelete} color="error" variant="contained" disabled={deletingAwardType}>{deletingAwardType ? <CircularProgress size={24} color="inherit" /> : "Delete"}</Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   )
// }

// // Main component orchestrating the tabs and data fetching
// export default function AwardsAdmin() {
//   const [activeTab, setActiveTab] = useState(0)
//   const [showForm, setShowForm] = useState(false)
//   const [awards, setAwards] = useState([])
//   const [employees, setEmployees] = useState([])
//   const [showTypeForm, setShowTypeForm] = useState(false)
//   const [newAwardType, setNewAwardType] = useState("")
//   const [awardTypes, setAwardTypes] = useState([])
//   const [entriesPerPage, setEntriesPerPage] = useState(10)
//   const [searchTerm, setSearchTerm] = useState("")
//   const [currentPage, setCurrentPage] = useState(1)
//   const [loading, setLoading] = useState(false)
//   const [loadingAwards, setLoadingAwards] = useState(false)
//   const [loadingEmployees, setLoadingEmployees] = useState(false)
//   const [loadingAwardTypes, setLoadingAwardTypes] = useState(false)
//   const [saving, setSaving] = useState(false)
//   const [savingAward, setSavingAward] = useState(false)
//   const [deletingAward, setDeletingAward] = useState(false)
//   const [deletingAwardType, setDeletingAwardType] = useState(false)
//   const [formErrors, setFormErrors] = useState({})
//   const [editingAward, setEditingAward] = useState(null)
//   const [editingAwardType, setEditingAwardType] = useState(null)
//   const [notification, setNotification] = useState({ open: false, message: "", severity: "success" })

//   const [formData, setFormData] = useState({ employee_id: "", award_type_id: "", associated_goals: "", gift_item: "", cash_price: "0", award_month_year: "", award_information: "", description: "", award_photo: null, created_at: "" })

//   const API_BASE_URL = "https://tdtlworld.com/hrms-backend"

//   const fetchAwards = async () => {
//     setLoadingAwards(true)
//     try {
//       const response = await fetch(`${API_BASE_URL}/api/awards/`)
//       if (!response.ok) { throw new Error(`HTTP error! status: ${response.status}`) }
//       const data = await response.json()
//       const awardsArray = Array.isArray(data) ? data : data.results || []
//       setAwards(awardsArray)
//     } catch (error) {
//       console.error("Error fetching awards:", error)
//       setNotification({ open: true, message: "Failed to fetch awards. Please try again.", severity: "error" })
//       setAwards([])
//     } finally {
//       setLoadingAwards(false)
//     }
//   }

//   const fetchEmployees = async () => {
//     setLoadingEmployees(true)
//     try {
//       const response = await fetch(`${API_BASE_URL}/employee-dropdown/`)
//       if (!response.ok) { throw new Error(`HTTP error! status: ${response.status}`) }
//       const data = await response.json()
//       const employeesArray = Array.isArray(data) ? data : data.results || []
//       setEmployees(employeesArray)
//     } catch (error) {
//       console.error("Error fetching employees:", error)
//       setNotification({ open: true, message: "Failed to fetch employees. Please try again.", severity: "error" })
//       setEmployees([])
//     } finally {
//       setLoadingEmployees(false)
//     }
//   }

//   const fetchAwardTypes = async () => {
//     setLoading(true)
//     setLoadingAwardTypes(true)
//     try {
//       const response = await fetch(`${API_BASE_URL}/api/award-types/`)
//       if (!response.ok) { throw new Error(`HTTP error! status: ${response.status}`) }
//       const data = await response.json()
//       const typesArray = Array.isArray(data) ? data : data.results || []
//       setAwardTypes(typesArray)
//     } catch (error) {
//       console.error("Error fetching award types:", error)
//       setNotification({ open: true, message: "Failed to fetch award types. Please try again.", severity: "error" })
//       setAwardTypes([])
//     } finally {
//       setLoading(false)
//       setLoadingAwardTypes(false)
//     }
//   }

//   const handleSaveAward = async () => {
//     setSavingAward(true)
//     setFormErrors({})
//     try {
//       const submitData = new FormData()
//       submitData.append("company_id", "2")
//       submitData.append("employee_id", formData.employee_id)
//       submitData.append("award_type_id", formData.award_type_id)
//       submitData.append("associated_goals", formData.associated_goals || "")
//       submitData.append("gift_item", formData.gift_item || "")
//       const cashPrice = Number.parseInt(formData.cash_price) || 0
//       submitData.append("cash_price", cashPrice.toString())
//       submitData.append("award_month_year", formData.award_month_year)
//       submitData.append("award_information", formData.award_information)
//       submitData.append("description", formData.description || "")
//       if (formData.created_at) { submitData.append("created_at", formData.created_at) }
//       if (formData.award_photo) { submitData.append("award_photo", formData.award_photo) }

//       const response = await fetch(`${API_BASE_URL}/api/awards/`, { method: "POST", body: submitData })
//       if (!response.ok) {
//         const errorData = await response.json()
//         if (response.status === 400 && errorData) {
//           setFormErrors(errorData)
//           setNotification({ open: true, message: "Please fix the form errors and try again.", severity: "error" })
//           return
//         }
//         throw new Error(`HTTP error! status: ${response.status}`)
//       }
//       setNotification({ open: true, message: "Award added successfully!", severity: "success" })
//       await fetchAwards()
//       setFormData({ employee_id: "", award_type_id: "", associated_goals: "", gift_item: "", cash_price: "0", award_month_year: "", award_information: "", description: "", award_photo: null, created_at: "" })
//       setShowForm(false)
//     } catch (error) {
//       console.error("Error adding award:", error)
//       setNotification({ open: true, message: "Failed to add award. Please try again.", severity: "error" })
//     } finally {
//       setSavingAward(false)
//     }
//   }

//   const handleEditAward = async () => {
//     if (!editingAward) return
//     setSavingAward(true)
//     setFormErrors({})
//     try {
//       const submitData = new FormData()
//       submitData.append("company_id", "2")
//       submitData.append("employee_id", formData.employee_id)
//       submitData.append("award_type_id", formData.award_type_id)
//       submitData.append("associated_goals", formData.associated_goals || "")
//       submitData.append("gift_item", formData.gift_item || "")
//       const cashPrice = Number.parseInt(formData.cash_price) || 0
//       submitData.append("cash_price", cashPrice.toString())
//       submitData.append("award_month_year", formData.award_month_year)
//       submitData.append("award_information", formData.award_information)
//       submitData.append("description", formData.description || "")
//       if (formData.created_at) { submitData.append("created_at", formData.created_at) }
//       if (formData.award_photo) { submitData.append("award_photo", formData.award_photo) }

//       const response = await fetch(`${API_BASE_URL}/api/awards/${editingAward.award_id}/`, { method: "PATCH", body: submitData })
//       if (!response.ok) {
//         const errorData = await response.json()
//         if (response.status === 400 && errorData) {
//           setFormErrors(errorData)
//           setNotification({ open: true, message: "Please fix the form errors and try again.", severity: "error" })
//           return
//         }
//         throw new Error(`HTTP error! status: ${response.status}`)
//       }
//       setNotification({ open: true, message: "Award updated successfully!", severity: "success" })
//       await fetchAwards()
//       setFormData({ employee_id: "", award_type_id: "", associated_goals: "", gift_item: "", cash_price: "0", award_month_year: "", award_information: "", description: "", award_photo: null, created_at: "" })
//       setEditingAward(null)
//       setShowForm(false)
//     } catch (error) {
//       console.error("Error updating award:", error)
//       setNotification({ open: true, message: "Failed to update award. Please try again.", severity: "error" })
//     } finally {
//       setSavingAward(false)
//     }
//   }

//   const handleDeleteAward = async (awardId) => {
//     setDeletingAward(true)
//     try {
//       const response = await fetch(`${API_BASE_URL}/api/awards/${awardId}/`, { method: "DELETE" })
//       if (!response.ok) { throw new Error(`HTTP error! status: ${response.status}`) }
//       setNotification({ open: true, message: "Award deleted successfully!", severity: "success" })
//       await fetchAwards()
//     } catch (error) {
//       console.error("Error deleting award:", error)
//       setNotification({ open: true, message: "Failed to delete award. Please try again.", severity: "error" })
//     } finally {
//       setDeletingAward(false)
//     }
//   }

//   const handleAddAwardType = async () => {
//     if (!newAwardType.trim()) return
//     setSaving(true)
//     try {
//       const response = await fetch(`${API_BASE_URL}/api/award-types/`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ category_name: newAwardType.trim() }),
//       })
//       if (!response.ok) { throw new Error(`HTTP error! status: ${response.status}`) }
//       setNotification({ open: true, message: "Award type added successfully!", severity: "success" })
//       await fetchAwardTypes()
//       setNewAwardType("")
//       setShowTypeForm(false)
//     } catch (error) {
//       console.error("Error adding award type:", error)
//       setNotification({ open: true, message: "Failed to add award type. Please try again.", severity: "error" })
//     } finally {
//       setSaving(false)
//     }
//   }

//   const handleEditAwardType = async () => {
//     if (!editingAwardType || !newAwardType.trim()) return
//     setSaving(true)
//     try {
//       const response = await fetch(`${API_BASE_URL}/api/award-types/${editingAwardType.value}/`, {
//         method: "PATCH",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ category_name: newAwardType.trim() }),
//       })
//       if (!response.ok) { throw new Error(`HTTP error! status: ${response.status}`) }
//       setNotification({ open: true, message: "Award type updated successfully!", severity: "success" })
//       await fetchAwardTypes()
//       setNewAwardType("")
//       setEditingAwardType(null)
//       setShowTypeForm(false)
//     } catch (error) {
//       console.error("Error updating award type:", error)
//       setNotification({ open: true, message: "Failed to update award type. Please try again.", severity: "error" })
//     } finally {
//       setSaving(false)
//     }
//   }

//   const handleDeleteAwardType = async (typeId) => {
//     setDeletingAwardType(true)
//     try {
//       const response = await fetch(`${API_BASE_URL}/api/award-types/${typeId}/`, { method: "DELETE" })
//       if (!response.ok) { throw new Error(`HTTP error! status: ${response.status}`) }
//       setNotification({ open: true, message: "Award type deleted successfully!", severity: "success" })
//       await fetchAwardTypes()
//     } catch (error) {
//       console.error("Error deleting award type:", error)
//       setNotification({ open: true, message: "Failed to delete award type. Please try again.", severity: "error" })
//     } finally {
//       setDeletingAwardType(false)
//     }
//   }

//   useEffect(() => { fetchAwards(); fetchEmployees(); fetchAwardTypes() }, [])
//   useEffect(() => { setCurrentPage(1) }, [searchTerm, activeTab, entriesPerPage])

//   const handleTabChange = (event, newValue) => { setActiveTab(newValue) }
//   const handleCloseNotification = () => { setNotification({ ...notification, open: false }) }

//   return (
//     <Card elevation={3} sx={{ borderRadius: 2 }}>
//       <CardContent sx={{ p: { xs: 1.5, sm: 3 } }}>
//         <Tabs
//           value={activeTab}
//           onChange={handleTabChange}
//           indicatorColor="secondary"
//           textColor="inherit"
//           sx={{ mb: 3, borderBottom: 1, borderColor: 'divider' }}
//         >
//           <Tab label="Awards" sx={{ fontWeight: 'bold', '&.Mui-selected': { color: '#7C3AED' } }} />
//           <Tab label="Award Types" sx={{ fontWeight: 'bold', '&.Mui-selected': { color: '#7C3AED' } }} />
//         </Tabs>

//         {activeTab === 0 ? (
//           <AwardsList {...{ awards, showForm, setShowForm, entriesPerPage, setEntriesPerPage, searchTerm, setSearchTerm, currentPage, setCurrentPage, employees, awardTypes, formData, setFormData, handleSaveAward, loadingAwards, savingAward, loadingEmployees, loadingAwardTypes, formErrors, editingAward, setEditingAward, handleEditAward, handleDeleteAward, deletingAward }} />
//         ) : (
//           <AwardTypesList {...{ awardTypes, showTypeForm, setShowTypeForm, newAwardType, setNewAwardType, handleAddAwardType, entriesPerPage, setEntriesPerPage, searchTerm, setSearchTerm, currentPage, setCurrentPage, loading, saving, handleEditAwardType, handleDeleteAwardType, editingAwardType, setEditingAwardType, deletingAwardType }} />
//         )}

//         <Snackbar open={notification.open} autoHideDuration={6000} onClose={handleCloseNotification} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
//           <Alert onClose={handleCloseNotification} severity={notification.severity} sx={{ width: "100%" }} variant="filled">
//             {notification.message}
//           </Alert>
//         </Snackbar>
//       </CardContent>
//     </Card>
//   )
// }





// import { useState, useEffect } from "react"
// import {
//   Button,
//   Box,
//   Stack,
//   Typography,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TextField,
//   Select,
//   MenuItem,
//   Tabs,
//   Tab,
//   Grid,
//   InputLabel,
//   FormControl,
//   CircularProgress,
//   InputAdornment,
//   IconButton,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   TablePagination,
//   Skeleton,
//   useTheme,
//   useMediaQuery,
// } from "@mui/material"
// import { Edit, Delete, Add, Search } from "@mui/icons-material"
// import Swal from 'sweetalert2'
// import withReactContent from 'sweetalert2-react-content'

// const MySwal = withReactContent(Swal)

// // Notification helper using SweetAlert2
// const showNotification = (title, icon) => {
//   MySwal.fire({
//     title,
//     icon,
//     timer: 3000,
//     showConfirmButton: false,
//     toast: true,
//     position: 'top-end',
//   })
// }

// // Reusable Skeleton Loader for Tables
// const TableSkeleton = ({ columns, rows = 5 }) => (
//   <TableBody>
//     {[...Array(rows)].map((_, index) => (
//       <TableRow key={index}>
//         {columns.map((col, i) => (
//           <TableCell key={i} sx={{ fontSize: '0.95rem' }}>
//             {col.id === 'actions' ? (
//               <Box sx={{ display: 'flex', justifyContent: 'center', gap: 0.5 }}>
//                 <Skeleton variant="rectangular" width={70} height={30} />
//               </Box>
//             ) : (
//               <Skeleton variant="text" />
//             )}
//           </TableCell>
//         ))}
//       </TableRow>
//     ))}
//   </TableBody>
// );


// // Component for displaying the list of awards
// const AwardsList = ({
//   awards,
//   loading,
//   onEdit,
//   onDelete,
//   page,
//   rowsPerPage,
//   onPageChange,
//   onRowsPerPageChange,
//   searchTerm
// }) => {
//   const filteredAwards = awards.filter((award) =>
//     Object.values(award).some((value) => value && value.toString().toLowerCase().includes(searchTerm.toLowerCase())),
//   )

//   const awardTableColumns = [
//     { id: 'sr', label: 'SR. NO.' },
//     { id: 'type', label: 'AWARD TYPE' },
//     { id: 'employee', label: 'EMPLOYEE' },
//     { id: 'gift', label: 'GIFT' },
//     { id: 'cash', label: 'CASH' },
//     { id: 'month', label: 'MONTH & YEAR' },
//     { id: 'actions', label: 'ACTIONS' },
//   ];

//   return (
//     <Paper variant="outlined">
//       <TableContainer sx={{ minWidth: '100%', whiteSpace: 'nowrap' }}>
//         <Table size="small">
//           <TableHead sx={{ backgroundColor: '#8C257C' }}>
//             <TableRow>
//               {awardTableColumns.map(col =>
//                 <TableCell key={col.id} sx={{ color: 'white', fontWeight: 'bold' }}>{col.label}</TableCell>
//               )}
//             </TableRow>
//           </TableHead>
//           {loading ? (
//             <TableSkeleton columns={awardTableColumns} rows={rowsPerPage} />
//           ) : (
//             <TableBody>
//               {filteredAwards.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).length === 0 ? (
//                 <TableRow><TableCell colSpan={awardTableColumns.length} align="center" sx={{ py: 5 }}>No records available</TableCell></TableRow>
//               ) : (
//                 filteredAwards.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((award, index) => (
//                   <TableRow key={award.award_id} hover>
//                     <TableCell sx={{ fontSize: '0.95rem' }}>{page * rowsPerPage + index + 1}</TableCell>
//                     <TableCell sx={{ fontSize: '0.95rem' }}>{award.award_type_name || "N/A"}</TableCell>
//                     <TableCell sx={{ fontSize: '0.95rem' }}>{award.employee_name || "N/A"}</TableCell>
//                     <TableCell sx={{ fontSize: '0.95rem' }}>{award.gift_item || "N/A"}</TableCell>
//                     <TableCell sx={{ fontSize: '0.95rem' }}>₹{Number.parseInt(award.cash_price || 0)}</TableCell>
//                     <TableCell sx={{ fontSize: '0.95rem' }}>{award.award_month_year || "N/A"}</TableCell>
//                     <TableCell>
//                       <Box sx={{ display: "flex", justifyContent: "center", gap: 0.5 }}>
//                         <IconButton size="small" onClick={() => onEdit(award)}><Edit fontSize="small" sx={{ color: '#8C257C' }} /></IconButton>
//                         <IconButton size="small" onClick={() => onDelete(award)} color="error"><Delete fontSize="small" /></IconButton>
//                       </Box>
//                     </TableCell>
//                   </TableRow>
//                 ))
//               )}
//             </TableBody>
//           )}
//         </Table>
//       </TableContainer>
//       <TablePagination
//         rowsPerPageOptions={[5, 10, 15, 25]}
//         component="div"
//         count={filteredAwards.length}
//         rowsPerPage={rowsPerPage}
//         page={page}
//         onPageChange={onPageChange}
//         onRowsPerPageChange={onRowsPerPageChange}
//       />
//     </Paper>
//   );
// };


// // Component for displaying the list of award types
// const AwardTypesList = ({
//   awardTypes,
//   loading,
//   onEdit,
//   onDelete,
//   page,
//   rowsPerPage,
//   onPageChange,
//   onRowsPerPageChange,
//   searchTerm
// }) => {
//   const filteredAwardTypes = awardTypes.filter(
//     (type) => type.label && type.label.toLowerCase().includes(searchTerm.toLowerCase()),
//   )

//   const typeTableColumns = [
//     { id: 'sr', label: 'SR. NO.' },
//     { id: 'type', label: 'AWARD TYPE' },
//     { id: 'created', label: 'CREATED AT' },
//     { id: 'actions', label: 'ACTIONS' },
//   ];

//   return (
//     <Paper variant="outlined">
//       <TableContainer sx={{ minWidth: '100%', whiteSpace: 'nowrap' }}>
//         <Table size="small">
//           <TableHead sx={{ backgroundColor: '#8C257C' }}>
//             <TableRow>
//               {typeTableColumns.map(h => <TableCell key={h.id} sx={{ color: 'white', fontWeight: 'bold' }}>{h.label}</TableCell>)}
//             </TableRow>
//           </TableHead>
//           {loading ? (
//             <TableSkeleton columns={typeTableColumns} rows={rowsPerPage} />
//           ) : (
//             <TableBody>
//               {filteredAwardTypes.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).length === 0 ? (
//                 <TableRow><TableCell colSpan={4} align="center" sx={{ py: 5 }}>No records available</TableCell></TableRow>
//               ) : (
//                 filteredAwardTypes.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((type, index) => (
//                   <TableRow key={type.value} hover>
//                     <TableCell sx={{ fontSize: '0.95rem' }}>{page * rowsPerPage + index + 1}</TableCell>
//                     <TableCell sx={{ fontSize: '0.95rem' }}>{type.label}</TableCell>
//                     <TableCell sx={{ fontSize: '0.95rem' }}>{type.created_at ? new Date(type.created_at).toLocaleDateString() : "N/A"}</TableCell>
//                     <TableCell>
//                       <Box sx={{ display: "flex", justifyContent: "center", gap: 0.5 }}>
//                         <IconButton size="small" onClick={() => onEdit(type)}><Edit fontSize="small" sx={{ color: '#8C257C' }} /></IconButton>
//                         <IconButton size="small" onClick={() => onDelete(type)} color="error"><Delete fontSize="small" /></IconButton>
//                       </Box>
//                     </TableCell>
//                   </TableRow>
//                 ))
//               )}
//             </TableBody>
//           )}
//         </Table>
//       </TableContainer>
//       <TablePagination
//         rowsPerPageOptions={[5, 10, 15, 25]}
//         component="div"
//         count={filteredAwardTypes.length}
//         rowsPerPage={rowsPerPage}
//         page={page}
//         onPageChange={onPageChange}
//         onRowsPerPageChange={onRowsPerPageChange}
//       />
//     </Paper>
//   );
// };


// // Main component orchestrating the tabs and data fetching
// export default function AwardsAdmin() {
//   const theme = useTheme()
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

//   const [activeTab, setActiveTab] = useState(0)
//   const [dialogOpen, setDialogOpen] = useState(false)
  
//   const [awards, setAwards] = useState([])
//   const [employees, setEmployees] = useState([])
//   const [awardTypes, setAwardTypes] = useState([])

//   const initialFormData = { employee_id: "", award_type_id: "", associated_goals: "", gift_item: "", cash_price: "0", award_month_year: "", award_information: "", description: "", award_photo: null, created_at: "" }
//   const [formData, setFormData] = useState(initialFormData)
//   const [newAwardType, setNewAwardType] = useState("")
//   const [formErrors, setFormErrors] = useState({})
  
//   const [editingData, setEditingData] = useState(null)
//   const [dataToDelete, setDataToDelete] = useState(null)
  
//   const [loadingAwards, setLoadingAwards] = useState(false)
//   const [loadingEmployees, setLoadingEmployees] = useState(false)
//   const [loadingAwardTypes, setLoadingAwardTypes] = useState(false)
//   const [isSaving, setIsSaving] = useState(false)
//   const [isDeleting, setIsDeleting] = useState(false)

//   const [searchTerm, setSearchTerm] = useState("")
//   const [page, setPage] = useState(0)
//   const [rowsPerPage, setRowsPerPage] = useState(10)

//   const API_BASE_URL = "https://tdtlworld.com/hrms-backend"

//   // --- Start of Corrected Function Definitions ---
//   const fetchAwards = async () => {
//     setLoadingAwards(true)
//     try {
//       const response = await fetch(`${API_BASE_URL}/api/awards/`)
//       if (!response.ok) throw new Error("Failed to fetch")
//       const data = await response.json()
//       setAwards(Array.isArray(data) ? data : data.results || [])
//     } catch (error) { showNotification("Error fetching awards", "error"); setAwards([]) } 
//     finally { setLoadingAwards(false) }
//   }

//   const fetchEmployees = async () => {
//     setLoadingEmployees(true)
//     try {
//       const response = await fetch(`${API_BASE_URL}/employee-dropdown/`)
//       if (!response.ok) throw new Error("Failed to fetch")
//       const data = await response.json()
//       setEmployees(Array.isArray(data) ? data : data.results || [])
//     } catch (error) { showNotification("Error fetching employees", "error"); setEmployees([]) } 
//     finally { setLoadingEmployees(false) }
//   }

//   const fetchAwardTypes = async () => {
//     setLoadingAwardTypes(true)
//     try {
//       const response = await fetch(`${API_BASE_URL}/api/award-types/`)
//       if (!response.ok) throw new Error("Failed to fetch")
//       const data = await response.json()
//       setAwardTypes(Array.isArray(data) ? data : data.results || [])
//     } catch (error) { showNotification("Error fetching award types", "error"); setAwardTypes([]) } 
//     finally { setLoadingAwardTypes(false) }
//   }

//   const handleSaveAward = async () => {
//     setIsSaving(true)
//     setFormErrors({})
//     try {
//       const submitData = new FormData()
//       Object.keys(formData).forEach(key => {
//         if (key !== 'cash_price' && formData[key]) {
//           submitData.append(key, formData[key])
//         }
//       });
//       submitData.append("company_id", "2")
//       submitData.append("cash_price", Number.parseInt(formData.cash_price) || 0)
      
//       const response = await fetch(`${API_BASE_URL}/api/awards/`, { method: "POST", body: submitData })
//       if (!response.ok) {
//         if(response.status === 400) {
//           const errorData = await response.json()
//           setFormErrors(errorData)
//           throw new Error("Validation Error")
//         }
//         throw new Error("HTTP Error")
//       }
//       showNotification("Award added successfully!", "success")
//       await fetchAwards()
//       handleCloseDialog()
//     } catch (error) {
//       if(error.message !== "Validation Error") showNotification("Failed to add award", "error")
//     } finally {
//       setIsSaving(false)
//     }
//   }

//   const handleEditAward = async () => {
//     if (!editingData) return
//     setIsSaving(true)
//     setFormErrors({})
//     try {
//       const submitData = new FormData()
//       Object.keys(formData).forEach(key => {
//         if (key !== 'cash_price' && formData[key] !== null) {
//           submitData.append(key, formData[key])
//         }
//       });
//       submitData.append("company_id", "2")
//       submitData.append("cash_price", Number.parseInt(formData.cash_price) || 0)

//       const response = await fetch(`${API_BASE_URL}/api/awards/${editingData.award_id}/`, { method: "PATCH", body: submitData })
//       if (!response.ok) {
//         if(response.status === 400) {
//           const errorData = await response.json()
//           setFormErrors(errorData)
//           throw new Error("Validation Error")
//         }
//         throw new Error("HTTP Error")
//       }
//       showNotification("Award updated successfully!", "success")
//       await fetchAwards()
//       handleCloseDialog()
//     } catch (error) {
//        if(error.message !== "Validation Error") showNotification("Failed to update award", "error")
//     } finally {
//       setIsSaving(false)
//     }
//   }
  
//   const handleDeleteAward = async (awardId) => {
//     setIsDeleting(true);
//     try {
//       const response = await fetch(`${API_BASE_URL}/api/awards/${awardId}/`, { method: "DELETE" });
//       if (!response.ok) throw new Error("HTTP Error");
//       showNotification("Award deleted successfully!", "success");
//       await fetchAwards();
//     } catch (error) {
//       showNotification("Failed to delete award", "error");
//     } finally {
//       setIsDeleting(false);
//     }
//   };

//   const handleAddAwardType = async () => {
//     if (!newAwardType.trim()) return
//     setIsSaving(true)
//     try {
//       const response = await fetch(`${API_BASE_URL}/api/award-types/`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ category_name: newAwardType.trim() }) })
//       if (!response.ok) throw new Error("HTTP error")
//       showNotification("Award type added successfully!", "success")
//       await fetchAwardTypes()
//       handleCloseDialog()
//     } catch (error) { showNotification("Failed to add award type", "error") } 
//     finally { setIsSaving(false) }
//   }

//   const handleEditAwardType = async () => {
//     if (!editingData || !newAwardType.trim()) return
//     setIsSaving(true)
//     try {
//       const response = await fetch(`${API_BASE_URL}/api/award-types/${editingData.value}/`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ category_name: newAwardType.trim() }) })
//       if (!response.ok) throw new Error("HTTP error")
//       showNotification("Award type updated successfully!", "success")
//       await fetchAwardTypes()
//       handleCloseDialog()
//     } catch (error) { showNotification("Failed to update award type", "error") } 
//     finally { setIsSaving(false) }
//   }

//   const handleDeleteAwardType = async (typeId) => {
//     setIsDeleting(true)
//     try {
//       const response = await fetch(`${API_BASE_URL}/api/award-types/${typeId}/`, { method: "DELETE" })
//       if (!response.ok) throw new Error("HTTP error")
//       showNotification("Award type deleted successfully!", "success")
//       await fetchAwardTypes()
//     } catch (error) { showNotification("Failed to delete award type", "error") } 
//     finally { setIsDeleting(false) }
//   }
//   // --- End of Corrected Function Definitions ---

//   useEffect(() => { 
//     fetchAwards(); 
//     fetchEmployees(); 
//     fetchAwardTypes();
//   }, [])
  
//   useEffect(() => { 
//     setPage(0) 
//   }, [searchTerm, activeTab, rowsPerPage])

//   const handleTabChange = (event, newValue) => { 
//     setActiveTab(newValue) 
//     setSearchTerm("")
//     setPage(0)
//     setRowsPerPage(10)
//   }
  
//   const handleOpenDialog = (data = null) => {
//     setEditingData(data)
//     setFormErrors({})
//     if (activeTab === 0) { // Award Form
//       if (data) {
//         const formatMonthYear = (monthYearString) => {
//             if (!monthYearString) return "";
//             try {
//                 const date = new Date(monthYearString);
//                 if (isNaN(date.getTime())) return "";
//                 const year = date.getFullYear();
//                 const month = (date.getMonth() + 1).toString().padStart(2, '0');
//                 return `${year}-${month}`;
//             } catch (e) { return ""; }
//         };
//         setFormData({
//             employee_id: data.employee_id || "",
//             award_type_id: data.award_type_id || "",
//             associated_goals: data.associated_goals || "",
//             gift_item: data.gift_item || "",
//             cash_price: Number.parseInt(data.cash_price || 0).toString(),
//             award_month_year: formatMonthYear(data.award_month_year),
//             award_information: data.award_information || "",
//             description: data.description || "",
//             award_photo: null,
//             created_at: data.created_at ? data.created_at.split(" ")[0] : "",
//         });
//       } else {
//         setFormData(initialFormData)
//       }
//     } else { // Award Type Form
//       setNewAwardType(data ? data.label : "")
//     }
//     setDialogOpen(true)
//   }

//   const handleCloseDialog = () => {
//     setDialogOpen(false)
//     setEditingData(null)
//   }
  
//   const handleDeleteClick = (data) => {
//     MySwal.fire({
//       title: 'Are you sure?',
//       text: "You won't be able to revert this!",
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#8C257C',
//       cancelButtonColor: '#d33',
//       confirmButtonText: 'Yes, delete it!'
//     }).then((result) => {
//       if (result.isConfirmed) {
//         if (activeTab === 0) {
//           handleDeleteAward(data.award_id);
//         } else {
//           handleDeleteAwardType(data.value);
//         }
//       }
//     })
//   }
    
//   const handleFormSubmit = async () => {
//     if (activeTab === 0) {
//       editingData ? await handleEditAward() : await handleSaveAward();
//     } else {
//       editingData ? await handleEditAwardType() : await handleAddAwardType();
//     }
//   }

//   return (
//     <Box component={Paper} p={3}>
//       <Typography variant="h5" sx={{ color: '#8C257C', fontWeight: 'bold' }} mb={2}>
//         Awards Management
//       </Typography>
      
//       <Tabs value={activeTab} onChange={handleTabChange} sx={{ mb: 2, borderBottom: 1, borderColor: 'divider' }}>
//         <Tab label="Awards" sx={{ fontWeight: 'bold', '&.Mui-selected': { color: '#8C257C' } }} />
//         <Tab label="Award Types" sx={{ fontWeight: 'bold', '&.Mui-selected': { color: '#8C257C' } }} />
//       </Tabs>
      
//       <Stack direction={isMobile ? 'column' : 'row'} justifyContent="space-between" alignItems="center" spacing={2} mb={2}>
//         <Button
//           variant="contained"
//           startIcon={<Add />}
//           onClick={() => handleOpenDialog()}
//           sx={{
//             backgroundColor: '#8C257C',
//             color: 'white',
//             '&:hover': { backgroundColor: '#6d1d60' },
//             width: isMobile ? '100%' : 'auto',
//           }}
//         >
//           Add New
//         </Button>
//         <TextField
//           size="small"
//           placeholder="Search..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           InputProps={{
//             startAdornment: <InputAdornment position="start"><Search /></InputAdornment>,
//           }}
//           sx={{ width: isMobile ? '100%' : 'auto', minWidth: isMobile ? 'unset' : 300 }}
//         />
//       </Stack>
      
//       {activeTab === 0 ? (
//         <AwardsList 
//           awards={awards} 
//           loading={loadingAwards} 
//           onEdit={handleOpenDialog} 
//           onDelete={handleDeleteClick} 
//           page={page}
//           rowsPerPage={rowsPerPage}
//           onPageChange={(e, newPage) => setPage(newPage)}
//           onRowsPerPageChange={(e) => { setRowsPerPage(parseInt(e.target.value, 10)); setPage(0); }}
//           searchTerm={searchTerm}
//         />
//       ) : (
//         <AwardTypesList 
//           awardTypes={awardTypes} 
//           loading={loadingAwardTypes} 
//           onEdit={handleOpenDialog} 
//           onDelete={handleDeleteClick}
//           page={page}
//           rowsPerPage={rowsPerPage}
//           onPageChange={(e, newPage) => setPage(newPage)}
//           onRowsPerPageChange={(e) => { setRowsPerPage(parseInt(e.target.value, 10)); setPage(0); }}
//           searchTerm={searchTerm}
//         />
//       )}

//       {/* Add/Edit Dialog */}
//       <Dialog open={dialogOpen} onClose={handleCloseDialog} fullWidth maxWidth="md">
//         <DialogTitle sx={{ color: '#8C257C', fontWeight: 'bold' }}>
//           {editingData ? 'Edit' : 'Add New'} {activeTab === 0 ? 'Award' : 'Award Type'}
//         </DialogTitle>
//         <DialogContent>
//           {activeTab === 0 ? (
//             // Award Form
//             <Grid container spacing={2.5} sx={{ mt: 1 }}>
//               <Grid item xs={12} sm={6}>
//                 <FormControl fullWidth size="small" required error={!!formErrors.employee_id}>
//                   <InputLabel>Employee</InputLabel>
//                   <Select value={formData.employee_id} onChange={(e) => setFormData(p => ({...p, employee_id: e.target.value}))} label="Employee" disabled={loadingEmployees || isSaving}>
//                     {loadingEmployees ? <MenuItem disabled><CircularProgress size={20} /> Loading...</MenuItem> : employees.map((emp) => (<MenuItem key={emp.value} value={emp.value}>{emp.label}</MenuItem>))}
//                   </Select>
//                   {formErrors.employee_id && <Typography variant="caption" color="error">{formErrors.employee_id}</Typography>}
//                 </FormControl>
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <FormControl fullWidth size="small" required error={!!formErrors.award_type_id}>
//                   <InputLabel>Award Type</InputLabel>
//                   <Select value={formData.award_type_id} onChange={(e) => setFormData(p => ({...p, award_type_id: e.target.value}))} label="Award Type" disabled={loadingAwardTypes || isSaving}>
//                     {loadingAwardTypes ? <MenuItem disabled><CircularProgress size={20} /> Loading...</MenuItem> : awardTypes.map((type) => (<MenuItem key={type.value} value={type.value}>{type.label}</MenuItem>))}
//                   </Select>
//                   {formErrors.award_type_id && <Typography variant="caption" color="error">{formErrors.award_type_id}</Typography>}
//                 </FormControl>
//               </Grid>
//               <Grid item xs={12} sm={6}><TextField fullWidth size="small" type="date" label="Date" value={formData.created_at} onChange={(e) => setFormData(p => ({...p, created_at: e.target.value}))} InputLabelProps={{ shrink: true }} disabled={isSaving} error={!!formErrors.created_at} helperText={formErrors.created_at} /></Grid>
//               <Grid item xs={12} sm={6}><TextField fullWidth size="small" type="month" label="Month & Year" required value={formData.award_month_year} onChange={(e) => setFormData(p => ({...p, award_month_year: e.target.value}))} InputLabelProps={{ shrink: true }} disabled={isSaving} error={!!formErrors.award_month_year} helperText={formErrors.award_month_year} /></Grid>
//               <Grid item xs={12} sm={6}><TextField fullWidth size="small" label="Gift Item" value={formData.gift_item} onChange={(e) => setFormData(p => ({...p, gift_item: e.target.value}))} disabled={isSaving} /></Grid>
//               <Grid item xs={12} sm={6}><TextField fullWidth size="small" label="Cash Amount" type="number" value={formData.cash_price} onChange={(e) => setFormData(p => ({...p, cash_price: e.target.value}))} InputProps={{ startAdornment: <InputAdornment position="start">₹</InputAdornment>, inputProps: { min: "0" } }} disabled={isSaving} /></Grid>
//               <Grid item xs={12}><TextField fullWidth size="small" label="Award Information" multiline rows={2} required value={formData.award_information} onChange={(e) => setFormData(p => ({...p, award_information: e.target.value}))} disabled={isSaving} error={!!formErrors.award_information} helperText={formErrors.award_information} /></Grid>
//               <Grid item xs={12}>
//                 <Button variant="outlined" component="label">
//                     Upload Photo
//                     <input type="file" hidden accept=".gif,.png,.jpg,.jpeg" onChange={(e) => setFormData(p => ({...p, award_photo: e.target.files[0]}))} />
//                 </Button>
//                 {formData.award_photo && <Typography variant="caption" sx={{ ml: 2 }}>{formData.award_photo.name}</Typography>}
//               </Grid>
//             </Grid>
//           ) : (
//             // Award Type Form
//             <TextField fullWidth size="small" value={newAwardType} onChange={(e) => setNewAwardType(e.target.value)} label="Award Type Name" sx={{ mt: 1 }} disabled={isSaving} autoFocus/>
//           )}
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseDialog} sx={{ color: '#757575' }}>Cancel</Button>
//           <Button
//             variant="contained"
//             onClick={handleFormSubmit}
//             disabled={isSaving}
//             sx={{ backgroundColor: '#8C257C', color: 'white', '&:hover': { backgroundColor: '#6d1d60' } }}
//           >
//             {isSaving ? <CircularProgress size={24} color="inherit" /> : editingData ? 'Update' : 'Save'}
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   )
// }








// import { useState, useEffect } from "react"
// import {
//   Button,
//   Box,
//   Stack,
//   Typography,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TextField,
//   Select,
//   MenuItem,
//   Tabs,
//   Tab,
//   Grid,
//   InputLabel,
//   FormControl,
//   CircularProgress,
//   InputAdornment,
//   IconButton,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   TablePagination,
//   Skeleton,
//   useTheme,
//   useMediaQuery,
// } from "@mui/material"
// import { Edit, Delete, Add, Search } from "@mui/icons-material"
// import Swal from 'sweetalert2'
// import withReactContent from 'sweetalert2-react-content'

// const MySwal = withReactContent(Swal)

// const showNotification = (title, icon) => {
//   MySwal.fire({
//     title,
//     icon,
//     timer: 3000,
//     showConfirmButton: false,
//     toast: true,
//     position: 'top-end',
//   })
// }

// const TableSkeleton = ({ columns, rows = 5 }) => (
//   <TableBody>
//     {[...Array(rows)].map((_, index) => (
//       <TableRow key={index}>
//         {columns.map((col, i) => (
//           <TableCell key={i} sx={{ fontSize: '0.95rem', py: 1.5 }}>
//             {col.id === 'actions' ? (
//               <Box sx={{ display: 'flex', justifyContent: 'center', gap: 0.5 }}>
//                 <Skeleton variant="rectangular" width={70} height={30} />
//               </Box>
//             ) : (
//               <Skeleton variant="text" />
//             )}
//           </TableCell>
//         ))}
//       </TableRow>
//     ))}
//   </TableBody>
// );

// const AwardsList = ({
//   awards,
//   loading,
//   onEdit,
//   onDelete,
//   page,
//   rowsPerPage,
//   onPageChange,
//   onRowsPerPageChange,
//   searchTerm
// }) => {
//   const filteredAwards = awards.filter((award) =>
//     Object.values(award).some((value) => value && value.toString().toLowerCase().includes(searchTerm.toLowerCase())),
//   )

//   const awardTableColumns = [
//     { id: 'sr', label: 'SR. NO.' },
//     { id: 'type', label: 'AWARD TYPE' },
//     { id: 'employee', label: 'EMPLOYEE' },
//     { id: 'gift', label: 'GIFT' },
//     { id: 'cash', label: 'CASH' },
//     { id: 'month', label: 'MONTH & YEAR' },
//     { id: 'actions', label: 'ACTIONS' },
//   ];

//   return (
//     <Paper variant="outlined">
//       <TableContainer sx={{ minWidth: '100%', whiteSpace: 'nowrap' }}>
//         <Table size="small">
//           <TableHead sx={{ backgroundColor: '#8C257C' }}>
//             <TableRow>
//               {awardTableColumns.map(col =>
//                 <TableCell key={col.id} sx={{ color: 'white', fontWeight: 'bold' }}>{col.label}</TableCell>
//               )}
//             </TableRow>
//           </TableHead>
//           {loading ? (
//             <TableSkeleton columns={awardTableColumns} rows={rowsPerPage} />
//           ) : (
//             <TableBody>
//               {filteredAwards.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).length === 0 ? (
//                 <TableRow><TableCell colSpan={awardTableColumns.length} align="center" sx={{ py: 5 }}>No records available</TableCell></TableRow>
//               ) : (
//                 filteredAwards.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((award, index) => (
//                   <TableRow key={award.award_id} hover>
//                     <TableCell sx={{ fontSize: '0.95rem', py: 1.5 }}>{page * rowsPerPage + index + 1}</TableCell>
//                     <TableCell sx={{ fontSize: '0.95rem', py: 1.5 }}>{award.award_type_name || "N/A"}</TableCell>
//                     <TableCell sx={{ fontSize: '0.95rem', py: 1.5 }}>{award.employee_name || "N/A"}</TableCell>
//                     <TableCell sx={{ fontSize: '0.95rem', py: 1.5 }}>{award.gift_item || "N/A"}</TableCell>
//                     <TableCell sx={{ fontSize: '0.95rem', py: 1.5 }}>₹{Number.parseInt(award.cash_price || 0)}</TableCell>
//                     <TableCell sx={{ fontSize: '0.95rem', py: 1.5 }}>{award.award_month_year || "N/A"}</TableCell>
//                     <TableCell sx={{ py: 1.5 }}>
//                       <Box sx={{ display: "flex", justifyContent: "center", gap: 0.5 }}>
//                         <IconButton size="small" onClick={() => onEdit(award)}><Edit fontSize="small" sx={{ color: '#8C257C' }} /></IconButton>
//                         <IconButton size="small" onClick={() => onDelete(award)} color="error"><Delete fontSize="small" /></IconButton>
//                       </Box>
//                     </TableCell>
//                   </TableRow>
//                 ))
//               )}
//             </TableBody>
//           )}
//         </Table>
//       </TableContainer>
//       <TablePagination
//         rowsPerPageOptions={[5, 10, 15, 25]}
//         component="div"
//         count={filteredAwards.length}
//         rowsPerPage={rowsPerPage}
//         page={page}
//         onPageChange={onPageChange}
//         onRowsPerPageChange={onRowsPerPageChange}
//       />
//     </Paper>
//   );
// };

// const AwardTypesList = ({
//   awardTypes,
//   loading,
//   onEdit,
//   onDelete,
//   page,
//   rowsPerPage,
//   onPageChange,
//   onRowsPerPageChange,
//   searchTerm
// }) => {
//   const filteredAwardTypes = awardTypes.filter(
//     (type) => type.label && type.label.toLowerCase().includes(searchTerm.toLowerCase()),
//   )

//   const typeTableColumns = [
//     { id: 'sr', label: 'SR. NO.' },
//     { id: 'type', label: 'AWARD TYPE' },
//     { id: 'created', label: 'CREATED AT' },
//     { id: 'actions', label: 'ACTIONS' },
//   ];

//   return (
//     <Paper variant="outlined">
//       <TableContainer sx={{ minWidth: '100%', whiteSpace: 'nowrap' }}>
//         <Table size="small">
//           <TableHead sx={{ backgroundColor: '#8C257C' }}>
//             <TableRow>
//               {typeTableColumns.map(h => <TableCell key={h.id} sx={{ color: 'white', fontWeight: 'bold' }}>{h.label}</TableCell>)}
//             </TableRow>
//           </TableHead>
//           {loading ? (
//             <TableSkeleton columns={typeTableColumns} rows={rowsPerPage} />
//           ) : (
//             <TableBody>
//               {filteredAwardTypes.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).length === 0 ? (
//                 <TableRow><TableCell colSpan={4} align="center" sx={{ py: 5 }}>No records available</TableCell></TableRow>
//               ) : (
//                 filteredAwardTypes.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((type, index) => (
//                   <TableRow key={type.value} hover>
//                     <TableCell sx={{ fontSize: '0.95rem', py: 1.5 }}>{page * rowsPerPage + index + 1}</TableCell>
//                     <TableCell sx={{ fontSize: '0.95rem', py: 1.5 }}>{type.label}</TableCell>
//                     <TableCell sx={{ fontSize: '0.95rem', py: 1.5 }}>{type.created_at ? new Date(type.created_at).toLocaleDateString() : "N/A"}</TableCell>
//                     <TableCell sx={{ py: 1.5 }}>
//                       <Box sx={{ display: "flex", justifyContent: "center", gap: 0.5 }}>
//                         <IconButton size="small" onClick={() => onEdit(type)}><Edit fontSize="small" sx={{ color: '#8C257C' }} /></IconButton>
//                         <IconButton size="small" onClick={() => onDelete(type)} color="error"><Delete fontSize="small" /></IconButton>
//                       </Box>
//                     </TableCell>
//                   </TableRow>
//                 ))
//               )}
//             </TableBody>
//           )}
//         </Table>
//       </TableContainer>
//       <TablePagination
//         rowsPerPageOptions={[5, 10, 15, 25]}
//         component="div"
//         count={filteredAwardTypes.length}
//         rowsPerPage={rowsPerPage}
//         page={page}
//         onPageChange={onPageChange}
//         onRowsPerPageChange={onRowsPerPageChange}
//       />
//     </Paper>
//   );
// };

// export default function AwardsAdmin() {
//   const theme = useTheme()
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

//   const [activeTab, setActiveTab] = useState(0)
//   const [dialogOpen, setDialogOpen] = useState(false)
  
//   const [awards, setAwards] = useState([])
//   const [employees, setEmployees] = useState([])
//   const [awardTypes, setAwardTypes] = useState([])

//   const initialFormData = { employee_id: "", award_type_id: "", associated_goals: "", gift_item: "", cash_price: "0", award_month_year: "", award_information: "", description: "", award_photo: null, created_at: "" }
//   const [formData, setFormData] = useState(initialFormData)
//   const [newAwardType, setNewAwardType] = useState("")
//   const [formErrors, setFormErrors] = useState({})
  
//   const [editingData, setEditingData] = useState(null)
//   const [dataToDelete, setDataToDelete] = useState(null)
  
//   const [loadingAwards, setLoadingAwards] = useState(false)
//   const [loadingEmployees, setLoadingEmployees] = useState(false)
//   const [loadingAwardTypes, setLoadingAwardTypes] = useState(false)
//   const [isSaving, setIsSaving] = useState(false)
//   const [isDeleting, setIsDeleting] = useState(false)

//   const [searchTerm, setSearchTerm] = useState("")
//   const [page, setPage] = useState(0)
//   const [rowsPerPage, setRowsPerPage] = useState(10)

//   const API_BASE_URL = "https://tdtlworld.com/hrms-backend"

//   const fetchAwards = async () => {
//     setLoadingAwards(true)
//     try {
//       const response = await fetch(`${API_BASE_URL}/api/awards/`)
//       if (!response.ok) throw new Error("Failed to fetch")
//       const data = await response.json()
//       setAwards(Array.isArray(data) ? data : data.results || [])
//     } catch (error) { showNotification("Error fetching awards", "error"); setAwards([]) } 
//     finally { setLoadingAwards(false) }
//   }

//   const fetchEmployees = async () => {
//     setLoadingEmployees(true)
//     try {
//       const response = await fetch(`${API_BASE_URL}/employee-dropdown/`)
//       if (!response.ok) throw new Error("Failed to fetch")
//       const data = await response.json()
//       setEmployees(Array.isArray(data) ? data : data.results || [])
//     } catch (error) { showNotification("Error fetching employees", "error"); setEmployees([]) } 
//     finally { setLoadingEmployees(false) }
//   }

//   const fetchAwardTypes = async () => {
//     setLoadingAwardTypes(true)
//     try {
//       const response = await fetch(`${API_BASE_URL}/api/award-types/`)
//       if (!response.ok) throw new Error("Failed to fetch")
//       const data = await response.json()
//       setAwardTypes(Array.isArray(data) ? data : data.results || [])
//     } catch (error) { showNotification("Error fetching award types", "error"); setAwardTypes([]) } 
//     finally { setLoadingAwardTypes(false) }
//   }

//   const handleSaveAward = async () => {
//     setIsSaving(true)
//     setFormErrors({})
//     try {
//       const submitData = new FormData()
//       Object.keys(formData).forEach(key => {
//         if (key !== 'cash_price' && formData[key]) {
//           submitData.append(key, formData[key])
//         }
//       });
//       submitData.append("company_id", "2")
//       submitData.append("cash_price", Number.parseInt(formData.cash_price) || 0)
      
//       const response = await fetch(`${API_BASE_URL}/api/awards/`, { method: "POST", body: submitData })
//       if (!response.ok) {
//         if(response.status === 400) {
//           const errorData = await response.json()
//           setFormErrors(errorData)
//           throw new Error("Validation Error")
//         }
//         throw new Error("HTTP Error")
//       }
//       showNotification("Award added successfully!", "success")
//       await fetchAwards()
//       handleCloseDialog()
//     } catch (error) {
//       if(error.message !== "Validation Error") showNotification("Failed to add award", "error")
//     } finally {
//       setIsSaving(false)
//     }
//   }

//   const handleEditAward = async () => {
//     if (!editingData) return
//     setIsSaving(true)
//     setFormErrors({})
//     try {
//       const submitData = new FormData()
//       Object.keys(formData).forEach(key => {
//         if (key !== 'cash_price' && formData[key] !== null) {
//           submitData.append(key, formData[key])
//         }
//       });
//       submitData.append("company_id", "2")
//       submitData.append("cash_price", Number.parseInt(formData.cash_price) || 0)

//       const response = await fetch(`${API_BASE_URL}/api/awards/${editingData.award_id}/`, { method: "PATCH", body: submitData })
//       if (!response.ok) {
//         if(response.status === 400) {
//           const errorData = await response.json()
//           setFormErrors(errorData)
//           throw new Error("Validation Error")
//         }
//         throw new Error("HTTP Error")
//       }
//       showNotification("Award updated successfully!", "success")
//       await fetchAwards()
//       handleCloseDialog()
//     } catch (error) {
//        if(error.message !== "Validation Error") showNotification("Failed to update award", "error")
//     } finally {
//       setIsSaving(false)
//     }
//   }
  
//   const handleDeleteAward = async (awardId) => {
//     setIsDeleting(true);
//     try {
//       const response = await fetch(`${API_BASE_URL}/api/awards/${awardId}/`, { method: "DELETE" });
//       if (!response.ok) throw new Error("HTTP Error");
//       showNotification("Award deleted successfully!", "success");
//       await fetchAwards();
//     } catch (error) {
//       showNotification("Failed to delete award", "error");
//     } finally {
//       setIsDeleting(false);
//     }
//   };

//   const handleAddAwardType = async () => {
//     if (!newAwardType.trim()) return
//     setIsSaving(true)
//     try {
//       const response = await fetch(`${API_BASE_URL}/api/award-types/`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ category_name: newAwardType.trim() }) })
//       if (!response.ok) throw new Error("HTTP error")
//       showNotification("Award type added successfully!", "success")
//       await fetchAwardTypes()
//       handleCloseDialog()
//     } catch (error) { showNotification("Failed to add award type", "error") } 
//     finally { setIsSaving(false) }
//   }

//   const handleEditAwardType = async () => {
//     if (!editingData || !newAwardType.trim()) return
//     setIsSaving(true)
//     try {
//       const response = await fetch(`${API_BASE_URL}/api/award-types/${editingData.value}/`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ category_name: newAwardType.trim() }) })
//       if (!response.ok) throw new Error("HTTP error")
//       showNotification("Award type updated successfully!", "success")
//       await fetchAwardTypes()
//       handleCloseDialog()
//     } catch (error) { showNotification("Failed to update award type", "error") } 
//     finally { setIsSaving(false) }
//   }

//   const handleDeleteAwardType = async (typeId) => {
//     setIsDeleting(true)
//     try {
//       const response = await fetch(`${API_BASE_URL}/api/award-types/${typeId}/`, { method: "DELETE" })
//       if (!response.ok) throw new Error("HTTP error")
//       showNotification("Award type deleted successfully!", "success")
//       await fetchAwardTypes()
//     } catch (error) { showNotification("Failed to delete award type", "error") } 
//     finally { setIsDeleting(false) }
//   }

//   useEffect(() => { 
//     fetchAwards(); 
//     fetchEmployees(); 
//     fetchAwardTypes();
//   }, [])
  
//   useEffect(() => { 
//     setPage(0) 
//   }, [searchTerm, activeTab, rowsPerPage])

//   const handleTabChange = (event, newValue) => { 
//     setActiveTab(newValue) 
//     setSearchTerm("")
//     setPage(0)
//     setRowsPerPage(10)
//   }
  
//   const handleOpenDialog = (data = null) => {
//     setEditingData(data)
//     setFormErrors({})
//     if (activeTab === 0) {
//       if (data) {
//         const formatMonthYear = (monthYearString) => {
//             if (!monthYearString) return "";
//             try {
//                 const date = new Date(monthYearString);
//                 if (isNaN(date.getTime())) return "";
//                 const year = date.getFullYear();
//                 const month = (date.getMonth() + 1).toString().padStart(2, '0');
//                 return `${year}-${month}`;
//             } catch (e) { return ""; }
//         };
//         setFormData({
//             employee_id: data.employee_id || "",
//             award_type_id: data.award_type_id || "",
//             associated_goals: data.associated_goals || "",
//             gift_item: data.gift_item || "",
//             cash_price: Number.parseInt(data.cash_price || 0).toString(),
//             award_month_year: formatMonthYear(data.award_month_year),
//             award_information: data.award_information || "",
//             description: data.description || "",
//             award_photo: null,
//             created_at: data.created_at ? data.created_at.split(" ")[0] : "",
//         });
//       } else {
//         setFormData(initialFormData)
//       }
//     } else {
//       setNewAwardType(data ? data.label : "")
//     }
//     setDialogOpen(true)
//   }

//   const handleCloseDialog = () => {
//     setDialogOpen(false)
//     setEditingData(null)
//   }
  
//   const handleDeleteClick = (data) => {
//     MySwal.fire({
//       title: 'Are you sure?',
//       text: "You won't be able to revert this!",
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#8C257C',
//       cancelButtonColor: '#d33',
//       confirmButtonText: 'Yes, delete it!'
//     }).then((result) => {
//       if (result.isConfirmed) {
//         if (activeTab === 0) {
//           handleDeleteAward(data.award_id);
//         } else {
//           handleDeleteAwardType(data.value);
//         }
//       }
//     })
//   }
    
//   const handleFormSubmit = async () => {
//     if (activeTab === 0) {
//       editingData ? await handleEditAward() : await handleSaveAward();
//     } else {
//       editingData ? await handleEditAwardType() : await handleAddAwardType();
//     }
//   }

//   return (
//     <Box component={Paper} p={3}>
//       <Typography variant="h4" sx={{ color: '#8C257C', fontWeight: 'bold' }} mb={4}>
//         Awards 
//       </Typography>
      
//       <Tabs value={activeTab} onChange={handleTabChange} sx={{ mb: 2, borderBottom: 1, borderColor: 'divider' }}>
//         <Tab label="Awards" sx={{ fontWeight: 'bold', '&.Mui-selected': { color: '#8C257C' } }} />
//         <Tab label="Award Types" sx={{ fontWeight: 'bold', '&.Mui-selected': { color: '#8C257C' } }} />
//       </Tabs>
      
//       <Stack direction={isMobile ? 'column' : 'row'} justifyContent="space-between" alignItems="center" spacing={2} mb={2}>
//         <Button
//           variant="contained"
//           startIcon={<Add />}
//           onClick={() => handleOpenDialog()}
//           sx={{
//             backgroundColor: '#8C257C',
//             color: 'white',
//             '&:hover': { backgroundColor: '#6d1d60' },
//             width: isMobile ? '100%' : 'auto',
//           }}
//         >
//           Add New
//         </Button>
//         <TextField
//           size="small"
//           placeholder="Search..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           InputProps={{
//             startAdornment: <InputAdornment position="start"><Search /></InputAdornment>,
//           }}
//           sx={{ width: isMobile ? '100%' : 'auto', minWidth: isMobile ? 'unset' : 300 }}
//         />
//       </Stack>
      
//       {activeTab === 0 ? (
//         <AwardsList 
//           awards={awards} 
//           loading={loadingAwards} 
//           onEdit={handleOpenDialog} 
//           onDelete={handleDeleteClick} 
//           page={page}
//           rowsPerPage={rowsPerPage}
//           onPageChange={(e, newPage) => setPage(newPage)}
//           onRowsPerPageChange={(e) => { setRowsPerPage(parseInt(e.target.value, 10)); setPage(0); }}
//           searchTerm={searchTerm}
//         />
//       ) : (
//         <AwardTypesList 
//           awardTypes={awardTypes} 
//           loading={loadingAwardTypes} 
//           onEdit={handleOpenDialog} 
//           onDelete={handleDeleteClick}
//           page={page}
//           rowsPerPage={rowsPerPage}
//           onPageChange={(e, newPage) => setPage(newPage)}
//           onRowsPerPageChange={(e) => { setRowsPerPage(parseInt(e.target.value, 10)); setPage(0); }}
//           searchTerm={searchTerm}
//         />
//       )}

//       <Dialog open={dialogOpen} onClose={handleCloseDialog} fullWidth maxWidth="md">
//         <DialogTitle sx={{ color: '#8C257C', fontWeight: 'bold' }}>
//           {editingData ? 'Edit' : 'Add New'} {activeTab === 0 ? 'Award' : 'Award Type'}
//         </DialogTitle>
//         <DialogContent>
//           {activeTab === 0 ? (
//             <Grid container spacing={2.5} sx={{ mt: 1 }}>
//               <Grid item xs={12} sm={6}>
//                 <FormControl fullWidth size="small" required error={!!formErrors.employee_id}>
//                   <InputLabel>Employee</InputLabel>
//                   <Select value={formData.employee_id} onChange={(e) => setFormData(p => ({...p, employee_id: e.target.value}))} label="Employee" disabled={loadingEmployees || isSaving}>
//                     {loadingEmployees ? <MenuItem disabled><CircularProgress size={20} /> Loading...</MenuItem> : employees.map((emp) => (<MenuItem key={emp.value} value={emp.value}>{emp.label}</MenuItem>))}
//                   </Select>
//                   {formErrors.employee_id && <Typography variant="caption" color="error">{formErrors.employee_id}</Typography>}
//                 </FormControl>
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <FormControl fullWidth size="small" required error={!!formErrors.award_type_id}>
//                   <InputLabel>Award Type</InputLabel>
//                   <Select value={formData.award_type_id} onChange={(e) => setFormData(p => ({...p, award_type_id: e.target.value}))} label="Award Type" disabled={loadingAwardTypes || isSaving}>
//                     {loadingAwardTypes ? <MenuItem disabled><CircularProgress size={20} /> Loading...</MenuItem> : awardTypes.map((type) => (<MenuItem key={type.value} value={type.value}>{type.label}</MenuItem>))}
//                   </Select>
//                   {formErrors.award_type_id && <Typography variant="caption" color="error">{formErrors.award_type_id}</Typography>}
//                 </FormControl>
//               </Grid>
//               <Grid item xs={12} sm={6}><TextField fullWidth size="small" type="date" label="Date" value={formData.created_at} onChange={(e) => setFormData(p => ({...p, created_at: e.target.value}))} InputLabelProps={{ shrink: true }} disabled={isSaving} error={!!formErrors.created_at} helperText={formErrors.created_at} /></Grid>
//               <Grid item xs={12} sm={6}><TextField fullWidth size="small" type="month" label="Month & Year" required value={formData.award_month_year} onChange={(e) => setFormData(p => ({...p, award_month_year: e.target.value}))} InputLabelProps={{ shrink: true }} disabled={isSaving} error={!!formErrors.award_month_year} helperText={formErrors.award_month_year} /></Grid>
//               <Grid item xs={12} sm={6}><TextField fullWidth size="small" label="Gift Item" value={formData.gift_item} onChange={(e) => setFormData(p => ({...p, gift_item: e.target.value}))} disabled={isSaving} /></Grid>
//               <Grid item xs={12} sm={6}><TextField fullWidth size="small" label="Cash Amount" type="number" value={formData.cash_price} onChange={(e) => setFormData(p => ({...p, cash_price: e.target.value}))} InputProps={{ startAdornment: <InputAdornment position="start">₹</InputAdornment>, inputProps: { min: "0" } }} disabled={isSaving} /></Grid>
//               <Grid item xs={12}><TextField fullWidth size="small" label="Award Information" multiline rows={2} required value={formData.award_information} onChange={(e) => setFormData(p => ({...p, award_information: e.target.value}))} disabled={isSaving} error={!!formErrors.award_information} helperText={formErrors.award_information} /></Grid>
//               <Grid item xs={12}>
//                 <Button variant="outlined" component="label">
//                     Upload Photo
//                     <input type="file" hidden accept=".gif,.png,.jpg,.jpeg" onChange={(e) => setFormData(p => ({...p, award_photo: e.target.files[0]}))} />
//                 </Button>
//                 {formData.award_photo && <Typography variant="caption" sx={{ ml: 2 }}>{formData.award_photo.name}</Typography>}
//               </Grid>
//             </Grid>
//           ) : (
//             <TextField fullWidth size="small" value={newAwardType} onChange={(e) => setNewAwardType(e.target.value)} label="Award Type Name" sx={{ mt: 1 }} disabled={isSaving} autoFocus/>
//           )}
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseDialog} sx={{ color: '#757575' }}>Cancel</Button>
//           <Button
//             variant="contained"
//             onClick={handleFormSubmit}
//             disabled={isSaving}
//             sx={{ backgroundColor: '#8C257C', color: 'white', '&:hover': { backgroundColor: '#6d1d60' } }}
//           >
//             {isSaving ? <CircularProgress size={24} color="inherit" /> : editingData ? 'Update' : 'Save'}
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   )
// }







// import { useState, useEffect } from "react";
// import {
//   Button,
//   Box,
//   Stack,
//   Typography,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TextField,
//   Select,
//   MenuItem,
//   Tabs,
//   Tab,
//   Grid,
//   InputLabel,
//   FormControl,
//   CircularProgress,
//   InputAdornment,
//   IconButton,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Pagination,
//   Skeleton,
//   useTheme,
//   useMediaQuery,
// } from "@mui/material";
// import { Edit, Delete, Add, Search } from "@mui/icons-material";
// import Swal from 'sweetalert2';
// import withReactContent from 'sweetalert2-react-content';

// const MySwal = withReactContent(Swal);

// const showNotification = (title, icon) => {
//   MySwal.fire({
//     title,
//     icon,
//     timer: 3000,
//     showConfirmButton: false,
//     toast: true,
//     position: 'top-end',
//   });
// };

// const TableSkeleton = ({ columns, rows = 5 }) => (
//   <TableBody>
//     {[...Array(rows)].map((_, index) => (
//       <TableRow key={index}>
//         {columns.map((col, i) => (
//           <TableCell key={i} sx={{ fontSize: '0.95rem', py: 1.5 }}>
//             {col.id === 'actions' ? (
//               <Box sx={{ display: 'flex', justifyContent: 'center', gap: 0.5 }}>
//                 <Skeleton variant="rectangular" width={70} height={30} />
//               </Box>
//             ) : (
//               <Skeleton variant="text" />
//             )}
//           </TableCell>
//         ))}
//       </TableRow>
//     ))}
//   </TableBody>
// );

// const AwardsList = ({
//   awards,
//   loading,
//   onEdit,
//   onDelete,
//   page,
//   rowsPerPage,
//   onPageChange,
//   onRowsPerPageChange,
//   searchTerm
// }) => {
//   const filteredAwards = awards.filter((award) =>
//     Object.values(award).some((value) => value && value.toString().toLowerCase().includes(searchTerm.toLowerCase())),
//   );

//   const awardTableColumns = [
//     { id: 'sr', label: 'SR. NO.' },
//     { id: 'type', label: 'AWARD TYPE' },
//     { id: 'employee', label: 'EMPLOYEE' },
//     { id: 'gift', label: 'GIFT' },
//     { id: 'cash', label: 'CASH' },
//     { id: 'month', label: 'MONTH & YEAR' },
//     { id: 'actions', label: 'ACTIONS' },
//   ];
  
//   const startEntry = filteredAwards.length > 0 ? page * rowsPerPage + 1 : 0;
//   const endEntry = Math.min((page + 1) * rowsPerPage, filteredAwards.length);

//   const primaryColor = "#8C257C";
//   const primaryHoverColor = "#6d1d60";
//   const secondaryColor = "#F58E35";

//   return (
//     <Paper variant="outlined">
//       <TableContainer sx={{ minWidth: '100%', whiteSpace: 'nowrap' }}>
//         <Table size="small">
//           <TableHead sx={{ backgroundColor: primaryColor }}>
//             <TableRow>
//               {awardTableColumns.map(col =>
//                 <TableCell key={col.id} sx={{ color: 'white', fontWeight: 'bold' }}>{col.label}</TableCell>
//               )}
//             </TableRow>
//           </TableHead>
//           {loading ? (
//             <TableSkeleton columns={awardTableColumns} rows={rowsPerPage} />
//           ) : (
//             <TableBody>
//               {filteredAwards.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).length === 0 ? (
//                 <TableRow><TableCell colSpan={awardTableColumns.length} align="center" sx={{ py: 5 }}>No records available</TableCell></TableRow>
//               ) : (
//                 filteredAwards.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((award, index) => (
//                   <TableRow key={award.award_id} hover>
//                     <TableCell sx={{ fontSize: '0.95rem', py: 1.5 }}>{page * rowsPerPage + index + 1}</TableCell>
//                     <TableCell sx={{ fontSize: '0.95rem', py: 1.5 }}>{award.award_type_name || "N/A"}</TableCell>
//                     <TableCell sx={{ fontSize: '0.95rem', py: 1.5 }}>{award.employee_name || "N/A"}</TableCell>
//                     <TableCell sx={{ fontSize: '0.95rem', py: 1.5 }}>{award.gift_item || "N/A"}</TableCell>
//                     <TableCell sx={{ fontSize: '0.95rem', py: 1.5 }}>₹{Number.parseInt(award.cash_price || 0)}</TableCell>
//                     <TableCell sx={{ fontSize: '0.95rem', py: 1.5 }}>{award.award_month_year || "N/A"}</TableCell>
//                     <TableCell sx={{ py: 1.5 }}>
//                       <Box sx={{ display: "flex", justifyContent: "center", gap: 0.5 }}>
//                         <IconButton size="small" onClick={() => onEdit(award)}><Edit fontSize="small" sx={{ color: primaryColor }} /></IconButton>
//                         <IconButton size="small" onClick={() => onDelete(award)} color="error"><Delete fontSize="small" /></IconButton>
//                       </Box>
//                     </TableCell>
//                   </TableRow>
//                 ))
//               )}
//             </TableBody>
//           )}
//         </Table>
//       </TableContainer>
//       <Box sx={{ p: 2, borderTop: '1px solid rgba(224, 224, 224, 1)' }}>
//         {loading ? (
//             <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                 <Skeleton variant="text" width={200} />
//                 <Skeleton variant="rectangular" width={300} height={40} />
//             </Box>
//         ) : (
//           filteredAwards.length > 0 && (
//             <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
//                 <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//                     <FormControl variant="outlined" size="small">
//                         <Select
//                             value={rowsPerPage}
//                             onChange={onRowsPerPageChange}
//                             sx={{
//                                 backgroundColor: primaryColor,
//                                 color: 'white',
//                                 borderRadius: '4px',
//                                 '&:hover': { backgroundColor: primaryHoverColor },
//                                 '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
//                                 '& .MuiSvgIcon-root': { color: 'white' },
//                             }}
//                         >
//                             {[5, 10, 15, 25].map((value) => ( <MenuItem key={value} value={value}>{value}</MenuItem> ))}
//                         </Select>
//                     </FormControl>
//                     <Typography variant="body2" color="text.secondary">
//                        {`Showing ${startEntry} to ${endEntry} of ${filteredAwards.length} results`}
//                     </Typography>
//                 </Box>
//                 <Pagination
//                     count={Math.ceil(filteredAwards.length / rowsPerPage)}
//                     page={page + 1}
//                     onChange={onPageChange}
//                     showFirstButton showLastButton
//                     sx={{
//                         '& .MuiPaginationItem-root:hover': { backgroundColor: secondaryColor, color: 'white' },
//                         '& .MuiPaginationItem-page': {
//                             color: primaryColor,
//                             '&.Mui-selected': {
//                                 backgroundColor: primaryColor,
//                                 color: 'white',
//                                 '&:hover': { backgroundColor: secondaryColor }
//                             },
//                         },
//                          '& .MuiPaginationItem-icon': { color: primaryColor }
//                     }}
//                 />
//             </Box>
//           )
//         )}
//       </Box>
//     </Paper>
//   );
// };

// const AwardTypesList = ({
//   awardTypes,
//   loading,
//   onEdit,
//   onDelete,
//   page,
//   rowsPerPage,
//   onPageChange,
//   onRowsPerPageChange,
//   searchTerm
// }) => {
//   const filteredAwardTypes = awardTypes.filter(
//     (type) => type.label && type.label.toLowerCase().includes(searchTerm.toLowerCase()),
//   );

//   const typeTableColumns = [
//     { id: 'sr', label: 'SR. NO.' },
//     { id: 'type', label: 'AWARD TYPE' },
//     { id: 'created', label: 'CREATED AT' },
//     { id: 'actions', label: 'ACTIONS' },
//   ];

//   const startEntry = filteredAwardTypes.length > 0 ? page * rowsPerPage + 1 : 0;
//   const endEntry = Math.min((page + 1) * rowsPerPage, filteredAwardTypes.length);

//   const primaryColor = "#8C257C";
//   const primaryHoverColor = "#6d1d60";
//   const secondaryColor = "#F58E35";

//   return (
//     <Paper variant="outlined">
//       <TableContainer sx={{ minWidth: '100%', whiteSpace: 'nowrap' }}>
//         <Table size="small">
//           <TableHead sx={{ backgroundColor: primaryColor }}>
//             <TableRow>
//               {typeTableColumns.map(h => <TableCell key={h.id} sx={{ color: 'white', fontWeight: 'bold' }}>{h.label}</TableCell>)}
//             </TableRow>
//           </TableHead>
//           {loading ? (
//             <TableSkeleton columns={typeTableColumns} rows={rowsPerPage} />
//           ) : (
//             <TableBody>
//               {filteredAwardTypes.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).length === 0 ? (
//                 <TableRow><TableCell colSpan={4} align="center" sx={{ py: 5 }}>No records available</TableCell></TableRow>
//               ) : (
//                 filteredAwardTypes.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((type, index) => (
//                   <TableRow key={type.value} hover>
//                     <TableCell sx={{ fontSize: '0.95rem', py: 1.5 }}>{page * rowsPerPage + index + 1}</TableCell>
//                     <TableCell sx={{ fontSize: '0.95rem', py: 1.5 }}>{type.label}</TableCell>
//                     <TableCell sx={{ fontSize: '0.95rem', py: 1.5 }}>{type.created_at ? new Date(type.created_at).toLocaleDateString() : "N/A"}</TableCell>
//                     <TableCell sx={{ py: 1.5 }}>
//                       <Box sx={{ display: "flex", justifyContent: "center", gap: 0.5 }}>
//                         <IconButton size="small" onClick={() => onEdit(type)}><Edit fontSize="small" sx={{ color: primaryColor }} /></IconButton>
//                         <IconButton size="small" onClick={() => onDelete(type)} color="error"><Delete fontSize="small" /></IconButton>
//                       </Box>
//                     </TableCell>
//                   </TableRow>
//                 ))
//               )}
//             </TableBody>
//           )}
//         </Table>
//       </TableContainer>
//       <Box sx={{ p: 2, borderTop: '1px solid rgba(224, 224, 224, 1)' }}>
//         {loading ? (
//             <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                 <Skeleton variant="text" width={200} />
//                 <Skeleton variant="rectangular" width={300} height={40} />
//             </Box>
//         ) : (
//           filteredAwardTypes.length > 0 && (
//             <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
//                 <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//                     <FormControl variant="outlined" size="small">
//                         <Select
//                             value={rowsPerPage}
//                             onChange={onRowsPerPageChange}
//                             sx={{
//                                 backgroundColor: primaryColor,
//                                 color: 'white',
//                                 borderRadius: '4px',
//                                 '&:hover': { backgroundColor: primaryHoverColor },
//                                 '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
//                                 '& .MuiSvgIcon-root': { color: 'white' },
//                             }}
//                         >
//                             {[5, 10, 15, 25].map((value) => ( <MenuItem key={value} value={value}>{value}</MenuItem> ))}
//                         </Select>
//                     </FormControl>
//                     <Typography variant="body2" color="text.secondary">
//                        {`Showing ${startEntry} to ${endEntry} of ${filteredAwardTypes.length} results`}
//                     </Typography>
//                 </Box>
//                 <Pagination
//                     count={Math.ceil(filteredAwardTypes.length / rowsPerPage)}
//                     page={page + 1}
//                     onChange={onPageChange}
//                     showFirstButton showLastButton
//                     sx={{
//                         '& .MuiPaginationItem-root:hover': { backgroundColor: secondaryColor, color: 'white' },
//                         '& .MuiPaginationItem-page': {
//                             color: primaryColor,
//                             '&.Mui-selected': {
//                                 backgroundColor: primaryColor,
//                                 color: 'white',
//                                 '&:hover': { backgroundColor: secondaryColor }
//                             },
//                         },
//                          '& .MuiPaginationItem-icon': { color: primaryColor }
//                     }}
//                 />
//             </Box>
//           )
//         )}
//       </Box>
//     </Paper>
//   );
// };

// export default function AwardsAdmin() {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

//   const [activeTab, setActiveTab] = useState(0);
//   const [dialogOpen, setDialogOpen] = useState(false);
  
//   const [awards, setAwards] = useState([]);
//   const [employees, setEmployees] = useState([]);
//   const [awardTypes, setAwardTypes] = useState([]);

//   const initialFormData = { employee_id: "", award_type_id: "", associated_goals: "", gift_item: "", cash_price: "0", award_month_year: "", award_information: "", description: "", award_photo: null, created_at: "" };
//   const [formData, setFormData] = useState(initialFormData);
//   const [newAwardType, setNewAwardType] = useState("");
//   const [formErrors, setFormErrors] = useState({});
  
//   const [editingData, setEditingData] = useState(null);
  
//   const [loadingAwards, setLoadingAwards] = useState(false);
//   const [loadingEmployees, setLoadingEmployees] = useState(false);
//   const [loadingAwardTypes, setLoadingAwardTypes] = useState(false);
//   const [isSaving, setIsSaving] = useState(false);
//   const [isDeleting, setIsDeleting] = useState(false);

//   const [searchTerm, setSearchTerm] = useState("");
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);

//   const API_BASE_URL = "https://tdtlworld.com/hrms-backend";

//   const fetchAwards = async () => {
//     setLoadingAwards(true);
//     try {
//       const response = await fetch(`${API_BASE_URL}/api/awards/`);
//       if (!response.ok) throw new Error("Failed to fetch");
//       const data = await response.json();
//       setAwards(Array.isArray(data) ? data : data.results || []);
//     } catch (error) { showNotification("Error fetching awards", "error"); setAwards([]); } 
//     finally { setLoadingAwards(false); }
//   };

//   const fetchEmployees = async () => {
//     setLoadingEmployees(true);
//     try {
//       const response = await fetch(`${API_BASE_URL}/employee-dropdown/`);
//       if (!response.ok) throw new Error("Failed to fetch");
//       const data = await response.json();
//       setEmployees(Array.isArray(data) ? data : data.results || []);
//     } catch (error) { showNotification("Error fetching employees", "error"); setEmployees([]); } 
//     finally { setLoadingEmployees(false); }
//   };

//   const fetchAwardTypes = async () => {
//     setLoadingAwardTypes(true);
//     try {
//       const response = await fetch(`${API_BASE_URL}/api/award-types/`);
//       if (!response.ok) throw new Error("Failed to fetch");
//       const data = await response.json();
//       setAwardTypes(Array.isArray(data) ? data : data.results || []);
//     } catch (error) { showNotification("Error fetching award types", "error"); setAwardTypes([]); } 
//     finally { setLoadingAwardTypes(false); }
//   };

//   const handleSaveAward = async () => {
//     setIsSaving(true);
//     setFormErrors({});
//     try {
//       const submitData = new FormData();
//       Object.keys(formData).forEach(key => {
//         if (key !== 'cash_price' && formData[key]) {
//           submitData.append(key, formData[key]);
//         }
//       });
//       submitData.append("company_id", "2");
//       submitData.append("cash_price", Number.parseInt(formData.cash_price) || 0);
      
//       const response = await fetch(`${API_BASE_URL}/api/awards/`, { method: "POST", body: submitData });
//       if (!response.ok) {
//         if(response.status === 400) {
//           const errorData = await response.json();
//           setFormErrors(errorData);
//           throw new Error("Validation Error");
//         }
//         throw new Error("HTTP Error");
//       }
//       showNotification("Award added successfully!", "success");
//       await fetchAwards();
//       handleCloseDialog();
//     } catch (error) {
//       if(error.message !== "Validation Error") showNotification("Failed to add award", "error");
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   const handleEditAward = async () => {
//     if (!editingData) return;
//     setIsSaving(true);
//     setFormErrors({});
//     try {
//       const submitData = new FormData();
//       Object.keys(formData).forEach(key => {
//         if (key !== 'cash_price' && formData[key] !== null) {
//           submitData.append(key, formData[key]);
//         }
//       });
//       submitData.append("company_id", "2");
//       submitData.append("cash_price", Number.parseInt(formData.cash_price) || 0);

//       const response = await fetch(`${API_BASE_URL}/api/awards/${editingData.award_id}/`, { method: "PATCH", body: submitData });
//       if (!response.ok) {
//         if(response.status === 400) {
//           const errorData = await response.json();
//           setFormErrors(errorData);
//           throw new Error("Validation Error");
//         }
//         throw new Error("HTTP Error");
//       }
//       showNotification("Award updated successfully!", "success");
//       await fetchAwards();
//       handleCloseDialog();
//     } catch (error) {
//        if(error.message !== "Validation Error") showNotification("Failed to update award", "error");
//     } finally {
//       setIsSaving(false);
//     }
//   };
  
//   const handleDeleteAward = async (awardId) => {
//     setIsDeleting(true);
//     try {
//       const response = await fetch(`${API_BASE_URL}/api/awards/${awardId}/`, { method: "DELETE" });
//       if (!response.ok) throw new Error("HTTP Error");
//       showNotification("Award deleted successfully!", "success");
//       await fetchAwards();
//     } catch (error) {
//       showNotification("Failed to delete award", "error");
//     } finally {
//       setIsDeleting(false);
//     }
//   };

//   const handleAddAwardType = async () => {
//     if (!newAwardType.trim()) return;
//     setIsSaving(true);
//     try {
//       const response = await fetch(`${API_BASE_URL}/api/award-types/`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ category_name: newAwardType.trim() }) });
//       if (!response.ok) throw new Error("HTTP error");
//       showNotification("Award type added successfully!", "success");
//       await fetchAwardTypes();
//       handleCloseDialog();
//     } catch (error) { showNotification("Failed to add award type", "error"); } 
//     finally { setIsSaving(false); }
//   };

//   const handleEditAwardType = async () => {
//     if (!editingData || !newAwardType.trim()) return;
//     setIsSaving(true);
//     try {
//       const response = await fetch(`${API_BASE_URL}/api/award-types/${editingData.value}/`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ category_name: newAwardType.trim() }) });
//       if (!response.ok) throw new Error("HTTP error");
//       showNotification("Award type updated successfully!", "success");
//       await fetchAwardTypes();
//       handleCloseDialog();
//     } catch (error) { showNotification("Failed to update award type", "error"); } 
//     finally { setIsSaving(false); }
//   };

//   const handleDeleteAwardType = async (typeId) => {
//     setIsDeleting(true);
//     try {
//       const response = await fetch(`${API_BASE_URL}/api/award-types/${typeId}/`, { method: "DELETE" });
//       if (!response.ok) throw new Error("HTTP error");
//       showNotification("Award type deleted successfully!", "success");
//       await fetchAwardTypes();
//     } catch (error) { showNotification("Failed to delete award type", "error"); } 
//     finally { setIsDeleting(false); }
//   };

//   useEffect(() => { 
//     fetchAwards(); 
//     fetchEmployees(); 
//     fetchAwardTypes();
//   }, []);
  
//   useEffect(() => { 
//     setPage(0);
//   }, [searchTerm, activeTab, rowsPerPage]);

//   const handleTabChange = (event, newValue) => { 
//     setActiveTab(newValue);
//     setSearchTerm("");
//     setPage(0);
//     setRowsPerPage(5);
//   };
  
//   const handlePaginationChange = (event, newPage) => {
//     setPage(newPage - 1);
//   };

//   const handleChangeRowsPerPage = (event) => {
//       setRowsPerPage(parseInt(event.target.value, 10));
//       setPage(0);
//   };
  
//   const handleOpenDialog = (data = null) => {
//     setEditingData(data);
//     setFormErrors({});
//     if (activeTab === 0) {
//       if (data) {
//         const formatMonthYear = (monthYearString) => {
//             if (!monthYearString) return "";
//             try {
//                 const date = new Date(monthYearString);
//                 if (isNaN(date.getTime())) return "";
//                 const year = date.getFullYear();
//                 const month = (date.getMonth() + 1).toString().padStart(2, '0');
//                 return `${year}-${month}`;
//             } catch (e) { return ""; }
//         };
//         setFormData({
//             employee_id: data.employee_id || "",
//             award_type_id: data.award_type_id || "",
//             associated_goals: data.associated_goals || "",
//             gift_item: data.gift_item || "",
//             cash_price: Number.parseInt(data.cash_price || 0).toString(),
//             award_month_year: formatMonthYear(data.award_month_year),
//             award_information: data.award_information || "",
//             description: data.description || "",
//             award_photo: null,
//             created_at: data.created_at ? data.created_at.split(" ")[0] : "",
//         });
//       } else {
//         setFormData(initialFormData);
//       }
//     } else {
//       setNewAwardType(data ? data.label : "");
//     }
//     setDialogOpen(true);
//   };

//   const handleCloseDialog = () => {
//     setDialogOpen(false);
//     setEditingData(null);
//   };
  
//   const handleDeleteClick = (data) => {
//     MySwal.fire({
//       title: 'Are you sure?',
//       text: "You won't be able to revert this!",
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#8C257C',
//       cancelButtonColor: '#d33',
//       confirmButtonText: 'Yes, delete it!'
//     }).then((result) => {
//       if (result.isConfirmed) {
//         if (activeTab === 0) {
//           handleDeleteAward(data.award_id);
//         } else {
//           handleDeleteAwardType(data.value);
//         }
//       }
//     });
//   };
    
//   const handleFormSubmit = async () => {
//     if (activeTab === 0) {
//       editingData ? await handleEditAward() : await handleSaveAward();
//     } else {
//       editingData ? await handleEditAwardType() : await handleAddAwardType();
//     }
//   };

//   return (
//     <Box component={Paper} p={3}>
//       <Typography variant="h4" sx={{ color: '#8C257C', fontWeight: 'bold' }} mb={4}>
//         Awards 
//       </Typography>
      
//       <Tabs value={activeTab} onChange={handleTabChange} sx={{ mb: 2, borderBottom: 1, borderColor: 'divider' }}>
//         <Tab label="Awards" sx={{ fontWeight: 'bold', '&.Mui-selected': { color: '#8C257C' } }} />
//         <Tab label="Award Types" sx={{ fontWeight: 'bold', '&.Mui-selected': { color: '#8C257C' } }} />
//       </Tabs>
      
//       <Stack direction={isMobile ? 'column' : 'row'} justifyContent="space-between" alignItems="center" spacing={2} mb={2}>
//         <Button
//           variant="contained"
//           startIcon={<Add />}
//           onClick={() => handleOpenDialog()}
//           sx={{
//             backgroundColor: '#8C257C',
//             color: 'white',
//             '&:hover': { backgroundColor: '#6d1d60' },
//             width: isMobile ? '100%' : 'auto',
//           }}
//         >
//           Add New
//         </Button>
//         <TextField
//           size="small"
//           placeholder="Search..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           InputProps={{
//             startAdornment: <InputAdornment position="start"><Search /></InputAdornment>,
//           }}
//           sx={{ width: isMobile ? '100%' : 'auto', minWidth: isMobile ? 'unset' : 300 }}
//         />
//       </Stack>
      
//       {activeTab === 0 ? (
//         <AwardsList 
//           awards={awards} 
//           loading={loadingAwards} 
//           onEdit={handleOpenDialog} 
//           onDelete={handleDeleteClick} 
//           page={page}
//           rowsPerPage={rowsPerPage}
//           onPageChange={handlePaginationChange}
//           onRowsPerPageChange={handleChangeRowsPerPage}
//           searchTerm={searchTerm}
//         />
//       ) : (
//         <AwardTypesList 
//           awardTypes={awardTypes} 
//           loading={loadingAwardTypes} 
//           onEdit={handleOpenDialog} 
//           onDelete={handleDeleteClick}
//           page={page}
//           rowsPerPage={rowsPerPage}
//           onPageChange={handlePaginationChange}
//           onRowsPerPageChange={handleChangeRowsPerPage}
//           searchTerm={searchTerm}
//         />
//       )}

//       <Dialog open={dialogOpen} onClose={handleCloseDialog} fullWidth maxWidth="md">
//         <DialogTitle sx={{ color: '#8C257C', fontWeight: 'bold' }}>
//           {editingData ? 'Edit' : 'Add New'} {activeTab === 0 ? 'Award' : 'Award Type'}
//         </DialogTitle>
//         <DialogContent>
//           {activeTab === 0 ? (
//             <Grid container spacing={2.5} sx={{ mt: 1 }}>
//               <Grid item xs={12} sm={6}>
//                 <FormControl fullWidth size="small" required error={!!formErrors.employee_id}>
//                   <InputLabel>Employee</InputLabel>
//                   <Select value={formData.employee_id} onChange={(e) => setFormData(p => ({...p, employee_id: e.target.value}))} label="Employee" disabled={loadingEmployees || isSaving}>
//                     {loadingEmployees ? <MenuItem disabled><CircularProgress size={20} /> Loading...</MenuItem> : employees.map((emp) => (<MenuItem key={emp.value} value={emp.value}>{emp.label}</MenuItem>))}
//                   </Select>
//                   {formErrors.employee_id && <Typography variant="caption" color="error">{formErrors.employee_id}</Typography>}
//                 </FormControl>
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <FormControl fullWidth size="small" required error={!!formErrors.award_type_id}>
//                   <InputLabel>Award Type</InputLabel>
//                   <Select value={formData.award_type_id} onChange={(e) => setFormData(p => ({...p, award_type_id: e.target.value}))} label="Award Type" disabled={loadingAwardTypes || isSaving}>
//                     {loadingAwardTypes ? <MenuItem disabled><CircularProgress size={20} /> Loading...</MenuItem> : awardTypes.map((type) => (<MenuItem key={type.value} value={type.value}>{type.label}</MenuItem>))}
//                   </Select>
//                   {formErrors.award_type_id && <Typography variant="caption" color="error">{formErrors.award_type_id}</Typography>}
//                 </FormControl>
//               </Grid>
//               <Grid item xs={12} sm={6}><TextField fullWidth size="small" type="date" label="Date" value={formData.created_at} onChange={(e) => setFormData(p => ({...p, created_at: e.target.value}))} InputLabelProps={{ shrink: true }} disabled={isSaving} error={!!formErrors.created_at} helperText={formErrors.created_at} /></Grid>
//               <Grid item xs={12} sm={6}><TextField fullWidth size="small" type="month" label="Month & Year" required value={formData.award_month_year} onChange={(e) => setFormData(p => ({...p, award_month_year: e.target.value}))} InputLabelProps={{ shrink: true }} disabled={isSaving} error={!!formErrors.award_month_year} helperText={formErrors.award_month_year} /></Grid>
//               <Grid item xs={12} sm={6}><TextField fullWidth size="small" label="Gift Item" value={formData.gift_item} onChange={(e) => setFormData(p => ({...p, gift_item: e.target.value}))} disabled={isSaving} /></Grid>
//               <Grid item xs={12} sm={6}><TextField fullWidth size="small" label="Cash Amount" type="number" value={formData.cash_price} onChange={(e) => setFormData(p => ({...p, cash_price: e.target.value}))} InputProps={{ startAdornment: <InputAdornment position="start">₹</InputAdornment>, inputProps: { min: "0" } }} disabled={isSaving} /></Grid>
//               <Grid item xs={12}><TextField fullWidth size="small" label="Award Information" multiline rows={2} required value={formData.award_information} onChange={(e) => setFormData(p => ({...p, award_information: e.target.value}))} disabled={isSaving} error={!!formErrors.award_information} helperText={formErrors.award_information} /></Grid>
//               <Grid item xs={12}>
//                 <Button variant="outlined" component="label">
//                     Upload Photo
//                     <input type="file" hidden accept=".gif,.png,.jpg,.jpeg" onChange={(e) => setFormData(p => ({...p, award_photo: e.target.files[0]}))} />
//                 </Button>
//                 {formData.award_photo && <Typography variant="caption" sx={{ ml: 2 }}>{formData.award_photo.name}</Typography>}
//               </Grid>
//             </Grid>
//           ) : (
//             <TextField fullWidth size="small" value={newAwardType} onChange={(e) => setNewAwardType(e.target.value)} label="Award Type Name" sx={{ mt: 1 }} disabled={isSaving} autoFocus/>
//           )}
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseDialog} sx={{ color: '#757575' }}>Cancel</Button>
//           <Button
//             variant="contained"
//             onClick={handleFormSubmit}
//             disabled={isSaving}
//             sx={{ backgroundColor: '#8C257C', color: 'white', '&:hover': { backgroundColor: '#6d1d60' } }}
//           >
//             {isSaving ? <CircularProgress size={24} color="inherit" /> : editingData ? 'Update' : 'Save'}
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// }




import { useState, useEffect } from "react";
import {
  Button,
  Box,
  Stack,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Select,
  MenuItem,
  Tabs,
  Tab,
  Grid,
  InputLabel,
  FormControl,
  CircularProgress,
  InputAdornment,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Pagination,
  Skeleton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Edit, Delete, Add, Search } from "@mui/icons-material";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const showNotification = (title, icon) => {
  MySwal.fire({
    title,
    icon,
    timer: 3000,
    showConfirmButton: false,
    toast: true,
    position: 'top-end',
  });
};

const TableSkeleton = ({ columns, rows = 5 }) => (
  <TableBody>
    {[...Array(rows)].map((_, index) => (
      <TableRow key={index}>
        {columns.map((col, i) => (
          <TableCell key={i} sx={{ fontSize: '0.95rem', py: 1.5 }}>
            {col.id === 'actions' ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 0.5 }}>
                <Skeleton variant="rectangular" width={70} height={30} />
              </Box>
            ) : (
              <Skeleton variant="text" />
            )}
          </TableCell>
        ))}
      </TableRow>
    ))}
  </TableBody>
);

const AwardsList = ({
  awards,
  loading,
  onEdit,
  onDelete,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  searchTerm
}) => {
  const filteredAwards = awards.filter((award) =>
    Object.values(award).some((value) => value && value.toString().toLowerCase().includes(searchTerm.toLowerCase())),
  );

  const awardTableColumns = [
    { id: 'sr', label: 'SR. NO.' },
    { id: 'type', label: 'AWARD TYPE' },
    { id: 'employee', label: 'EMPLOYEE' },
    { id: 'gift', label: 'GIFT' },
    { id: 'cash', label: 'CASH' },
    { id: 'month', label: 'MONTH & YEAR' },
    { id: 'actions', label: 'ACTIONS' },
  ];
  
  const startEntry = filteredAwards.length > 0 ? page * rowsPerPage + 1 : 0;
  const endEntry = Math.min((page + 1) * rowsPerPage, filteredAwards.length);

  const primaryColor = "#8C257C";
  const primaryHoverColor = "#6d1d60";
  const secondaryColor = "#F58E35";

  return (
    <Paper variant="outlined">
      <TableContainer sx={{ minWidth: '100%', whiteSpace: 'nowrap' }}>
        <Table size="small">
          <TableHead sx={{ backgroundColor: primaryColor }}>
            <TableRow>
              {awardTableColumns.map(col =>
                <TableCell key={col.id} sx={{ color: 'white', fontWeight: 'bold' }}>{col.label}</TableCell>
              )}
            </TableRow>
          </TableHead>
          {loading ? (
            <TableSkeleton columns={awardTableColumns} rows={rowsPerPage} />
          ) : (
            <TableBody>
              {filteredAwards.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).length === 0 ? (
                <TableRow><TableCell colSpan={awardTableColumns.length} align="center" sx={{ py: 5 }}>No records available</TableCell></TableRow>
              ) : (
                filteredAwards.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((award, index) => (
                  <TableRow key={award.award_id} hover>
                    <TableCell sx={{ fontSize: '0.95rem', py: 1.5 }}>{page * rowsPerPage + index + 1}</TableCell>
                    <TableCell sx={{ fontSize: '0.95rem', py: 1.5 }}>{award.award_type_name || "N/A"}</TableCell>
                    <TableCell sx={{ fontSize: '0.95rem', py: 1.5 }}>{award.employee_name || "N/A"}</TableCell>
                    <TableCell sx={{ fontSize: '0.95rem', py: 1.5 }}>{award.gift_item || "N/A"}</TableCell>
                    <TableCell sx={{ fontSize: '0.95rem', py: 1.5 }}>₹{Number.parseInt(award.cash_price || 0)}</TableCell>
                    <TableCell sx={{ fontSize: '0.95rem', py: 1.5 }}>{award.award_month_year || "N/A"}</TableCell>
                    <TableCell sx={{ py: 1.5 }}>
                      <Box sx={{ display: "flex", justifyContent: "center", gap: 0.5 }}>
                        <IconButton size="small" onClick={() => onEdit(award)}><Edit fontSize="small" sx={{ color: primaryColor }} /></IconButton>
                        <IconButton size="small" onClick={() => onDelete(award)} color="error"><Delete fontSize="small" /></IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          )}
        </Table>
      </TableContainer>
      <Box sx={{ p: 2, borderTop: '1px solid rgba(224, 224, 224, 1)' }}>
        {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Skeleton variant="text" width={200} />
                <Skeleton variant="rectangular" width={300} height={40} />
            </Box>
        ) : (
          filteredAwards.length > 0 && (
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <FormControl variant="outlined" size="small">
                        <Select
                            value={rowsPerPage}
                            onChange={onRowsPerPageChange}
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
                       {`Showing ${startEntry} to ${endEntry} of ${filteredAwards.length} results`}
                    </Typography>
                </Box>
                <Pagination
                    count={Math.ceil(filteredAwards.length / rowsPerPage)}
                    page={page + 1}
                    onChange={onPageChange}
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
    </Paper>
  );
};

const AwardTypesList = ({
  awardTypes,
  loading,
  onEdit,
  onDelete,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  searchTerm
}) => {
  const filteredAwardTypes = awardTypes.filter(
    (type) => type.label && type.label.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const typeTableColumns = [
    { id: 'sr', label: 'SR. NO.' },
    { id: 'type', label: 'AWARD TYPE' },
    { id: 'created', label: 'CREATED AT' },
    { id: 'actions', label: 'ACTIONS' },
  ];

  const startEntry = filteredAwardTypes.length > 0 ? page * rowsPerPage + 1 : 0;
  const endEntry = Math.min((page + 1) * rowsPerPage, filteredAwardTypes.length);

  const primaryColor = "#8C257C";
  const primaryHoverColor = "#6d1d60";
  const secondaryColor = "#F58E35";

  return (
    <Paper variant="outlined">
      <TableContainer sx={{ minWidth: '100%', whiteSpace: 'nowrap' }}>
        <Table size="small">
          <TableHead sx={{ backgroundColor: primaryColor }}>
            <TableRow>
              {typeTableColumns.map(h => <TableCell key={h.id} sx={{ color: 'white', fontWeight: 'bold' }}>{h.label}</TableCell>)}
            </TableRow>
          </TableHead>
          {loading ? (
            <TableSkeleton columns={typeTableColumns} rows={rowsPerPage} />
          ) : (
            <TableBody>
              {filteredAwardTypes.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).length === 0 ? (
                <TableRow><TableCell colSpan={4} align="center" sx={{ py: 5 }}>No records available</TableCell></TableRow>
              ) : (
                filteredAwardTypes.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((type, index) => (
                  <TableRow key={type.value} hover>
                    <TableCell sx={{ fontSize: '0.95rem', py: 1.5 }}>{page * rowsPerPage + index + 1}</TableCell>
                    <TableCell sx={{ fontSize: '0.95rem', py: 1.5 }}>{type.label}</TableCell>
                    <TableCell sx={{ fontSize: '0.95rem', py: 1.5 }}>{type.created_at ? new Date(type.created_at).toLocaleDateString() : "N/A"}</TableCell>
                    <TableCell sx={{ py: 1.5 }}>
                      <Box sx={{ display: "flex", justifyContent: "center", gap: 0.5 }}>
                        <IconButton size="small" onClick={() => onEdit(type)}><Edit fontSize="small" sx={{ color: primaryColor }} /></IconButton>
                        <IconButton size="small" onClick={() => onDelete(type)} color="error"><Delete fontSize="small" /></IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          )}
        </Table>
      </TableContainer>
      <Box sx={{ p: 2, borderTop: '1px solid rgba(224, 224, 224, 1)' }}>
        {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Skeleton variant="text" width={200} />
                <Skeleton variant="rectangular" width={300} height={40} />
            </Box>
        ) : (
          filteredAwardTypes.length > 0 && (
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <FormControl variant="outlined" size="small">
                        <Select
                            value={rowsPerPage}
                            onChange={onRowsPerPageChange}
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
                       {`Showing ${startEntry} to ${endEntry} of ${filteredAwardTypes.length} results`}
                    </Typography>
                </Box>
                <Pagination
                    count={Math.ceil(filteredAwardTypes.length / rowsPerPage)}
                    page={page + 1}
                    onChange={onPageChange}
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
    </Paper>
  );
};

export default function AwardsAdmin() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [activeTab, setActiveTab] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);
  
  const [awards, setAwards] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [awardTypes, setAwardTypes] = useState([]);

  const initialFormData = { employee_id: "", award_type_id: "", associated_goals: "", gift_item: "", cash_price: "0", award_month_year: "", award_information: "", description: "", award_photo: null, created_at: "" };
  const [formData, setFormData] = useState(initialFormData);
  const [newAwardType, setNewAwardType] = useState("");
  const [formErrors, setFormErrors] = useState({});
  
  const [editingData, setEditingData] = useState(null);
  
  const [loadingAwards, setLoadingAwards] = useState(false);
  const [loadingEmployees, setLoadingEmployees] = useState(false);
  const [loadingAwardTypes, setLoadingAwardTypes] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const API_BASE_URL = "https://tdtlworld.com/hrms-backend";

  const fetchAwards = async () => {
    setLoadingAwards(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/awards/`);
      if (!response.ok) throw new Error("Failed to fetch");
      const data = await response.json();
      setAwards(Array.isArray(data) ? data : data.results || []);
    } catch (error) { showNotification("Error fetching awards", "error"); setAwards([]); } 
    finally { setLoadingAwards(false); }
  };

  const fetchEmployees = async () => {
    setLoadingEmployees(true);
    try {
      const response = await fetch(`${API_BASE_URL}/employee-dropdown/`);
      if (!response.ok) throw new Error("Failed to fetch");
      const data = await response.json();
      setEmployees(Array.isArray(data) ? data : data.results || []);
    } catch (error) { showNotification("Error fetching employees", "error"); setEmployees([]); } 
    finally { setLoadingEmployees(false); }
  };

  const fetchAwardTypes = async () => {
    setLoadingAwardTypes(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/award-types/`);
      if (!response.ok) throw new Error("Failed to fetch");
      const data = await response.json();
      setAwardTypes(Array.isArray(data) ? data : data.results || []);
    } catch (error) { showNotification("Error fetching award types", "error"); setAwardTypes([]); } 
    finally { setLoadingAwardTypes(false); }
  };

  const handleSaveAward = async () => {
    setIsSaving(true);
    setFormErrors({});
    try {
      const submitData = new FormData();
      Object.keys(formData).forEach(key => {
        if (key !== 'cash_price' && formData[key]) {
          submitData.append(key, formData[key]);
        }
      });
      submitData.append("company_id", "2");
      submitData.append("cash_price", Number.parseInt(formData.cash_price) || 0);
      
      const response = await fetch(`${API_BASE_URL}/api/awards/`, { method: "POST", body: submitData });
      if (!response.ok) {
        if(response.status === 400) {
          const errorData = await response.json();
          setFormErrors(errorData);
          throw new Error("Validation Error");
        }
        throw new Error("HTTP Error");
      }
      showNotification("Award added successfully!", "success");
      await fetchAwards();
      handleCloseDialog();
    } catch (error) {
      if(error.message !== "Validation Error") showNotification("Failed to add award", "error");
    } finally {
      setIsSaving(false);
    }
  };

  const handleEditAward = async () => {
    if (!editingData) return;
    setIsSaving(true);
    setFormErrors({});
    try {
      const submitData = new FormData();
      Object.keys(formData).forEach(key => {
        if (key !== 'cash_price' && formData[key] !== null) {
          submitData.append(key, formData[key]);
        }
      });
      submitData.append("company_id", "2");
      submitData.append("cash_price", Number.parseInt(formData.cash_price) || 0);

      const response = await fetch(`${API_BASE_URL}/api/awards/${editingData.award_id}/`, { method: "PATCH", body: submitData });
      if (!response.ok) {
        if(response.status === 400) {
          const errorData = await response.json();
          setFormErrors(errorData);
          throw new Error("Validation Error");
        }
        throw new Error("HTTP Error");
      }
      showNotification("Award updated successfully!", "success");
      await fetchAwards();
      handleCloseDialog();
    } catch (error) {
       if(error.message !== "Validation Error") showNotification("Failed to update award", "error");
    } finally {
      setIsSaving(false);
    }
  };
  
  const handleDeleteAward = async (awardId) => {
    setIsDeleting(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/awards/${awardId}/`, { method: "DELETE" });
      if (!response.ok) throw new Error("HTTP Error");
      showNotification("Award deleted successfully!", "success");
      await fetchAwards();
    } catch (error) {
      showNotification("Failed to delete award", "error");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleAddAwardType = async () => {
    if (!newAwardType.trim()) return;
    setIsSaving(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/award-types/`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ category_name: newAwardType.trim() }) });
      if (!response.ok) throw new Error("HTTP error");
      showNotification("Award type added successfully!", "success");
      await fetchAwardTypes();
      handleCloseDialog();
    } catch (error) { showNotification("Failed to add award type", "error"); } 
    finally { setIsSaving(false); }
  };

  const handleEditAwardType = async () => {
    if (!editingData || !newAwardType.trim()) return;
    setIsSaving(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/award-types/${editingData.value}/`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ category_name: newAwardType.trim() }) });
      if (!response.ok) throw new Error("HTTP error");
      showNotification("Award type updated successfully!", "success");
      await fetchAwardTypes();
      handleCloseDialog();
    } catch (error) { showNotification("Failed to update award type", "error"); } 
    finally { setIsSaving(false); }
  };

  const handleDeleteAwardType = async (typeId) => {
    setIsDeleting(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/award-types/${typeId}/`, { method: "DELETE" });
      if (!response.ok) throw new Error("HTTP error");
      showNotification("Award type deleted successfully!", "success");
      await fetchAwardTypes();
    } catch (error) { showNotification("Failed to delete award type", "error"); } 
    finally { setIsDeleting(false); }
  };

  useEffect(() => { 
    fetchAwards(); 
    fetchEmployees(); 
    fetchAwardTypes();
  }, []);
  
  useEffect(() => { 
    setPage(0);
  }, [searchTerm, activeTab, rowsPerPage]);

  const handleTabChange = (event, newValue) => { 
    setActiveTab(newValue);
    setSearchTerm("");
    setPage(0);
    setRowsPerPage(5);
  };
  
  const handlePaginationChange = (event, newPage) => {
    setPage(newPage - 1);
  };

  const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
  };
  
  const handleOpenDialog = (data = null) => {
    setEditingData(data);
    setFormErrors({});
    if (activeTab === 0) {
      if (data) {
        const formatMonthYear = (monthYearString) => {
            if (!monthYearString) return "";
            try {
                const date = new Date(monthYearString);
                if (isNaN(date.getTime())) return "";
                const year = date.getFullYear();
                const month = (date.getMonth() + 1).toString().padStart(2, '0');
                return `${year}-${month}`;
            } catch (e) { return ""; }
        };
        setFormData({
            employee_id: data.employee_id || "",
            award_type_id: data.award_type_id || "",
            associated_goals: data.associated_goals || "",
            gift_item: data.gift_item || "",
            cash_price: Number.parseInt(data.cash_price || 0).toString(),
            award_month_year: formatMonthYear(data.award_month_year),
            award_information: data.award_information || "",
            description: data.description || "",
            award_photo: null,
            created_at: data.created_at ? data.created_at.split(" ")[0] : "",
        });
      } else {
        setFormData(initialFormData);
      }
    } else {
      setNewAwardType(data ? data.label : "");
    }
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingData(null);
  };
  
  const handleDeleteClick = (data) => {
    MySwal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#8C257C',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        if (activeTab === 0) {
          handleDeleteAward(data.award_id);
        } else {
          handleDeleteAwardType(data.value);
        }
      }
    });
  };
    
  const handleFormSubmit = async () => {
    if (activeTab === 0) {
      editingData ? await handleEditAward() : await handleSaveAward();
    } else {
      editingData ? await handleEditAwardType() : await handleAddAwardType();
    }
  };

  return (
    <Box component={Paper} p={3}>
      <Typography variant="h4" sx={{ color: '#8C257C', fontWeight: 'bold' }} mb={4}>
        Awards 
      </Typography>
      
      <Tabs value={activeTab} onChange={handleTabChange} sx={{ mb: 2, borderBottom: 1, borderColor: 'divider' }}>
        <Tab label="Awards" sx={{ fontWeight: 'bold', '&.Mui-selected': { color: '#8C257C' } }} />
        <Tab label="Award Types" sx={{ fontWeight: 'bold', '&.Mui-selected': { color: '#8C257C' } }} />
      </Tabs>
      
      <Stack direction={isMobile ? 'column' : 'row'} justifyContent="space-between" alignItems="center" spacing={2} mb={2}>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => handleOpenDialog()}
          sx={{
            backgroundColor: '#8C257C',
            color: 'white',
            '&:hover': { backgroundColor: '#6d1d60' },
            width: isMobile ? '100%' : 'auto',
          }}
        >
          Add New
        </Button>
        <TextField
          size="small"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: <InputAdornment position="start"><Search /></InputAdornment>,
          }}
          sx={{ width: isMobile ? '100%' : 'auto', minWidth: isMobile ? 'unset' : 300 }}
        />
      </Stack>
      
      {activeTab === 0 ? (
        <AwardsList 
          awards={awards} 
          loading={loadingAwards} 
          onEdit={handleOpenDialog} 
          onDelete={handleDeleteClick} 
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={handlePaginationChange}
          onRowsPerPageChange={handleChangeRowsPerPage}
          searchTerm={searchTerm}
        />
      ) : (
        <AwardTypesList 
          awardTypes={awardTypes} 
          loading={loadingAwardTypes} 
          onEdit={handleOpenDialog} 
          onDelete={handleDeleteClick}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={handlePaginationChange}
          onRowsPerPageChange={handleChangeRowsPerPage}
          searchTerm={searchTerm}
        />
      )}

      <Dialog open={dialogOpen} onClose={handleCloseDialog} fullWidth maxWidth="md">
        <DialogTitle sx={{ color: '#8C257C', fontWeight: 'bold' }}>
          {editingData ? 'Edit' : 'Add New'} {activeTab === 0 ? 'Award' : 'Award Type'}
        </DialogTitle>
        <DialogContent>
          {activeTab === 0 ? (
            <Grid container spacing={2.5} sx={{ mt: 1 }}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth size="small" required error={!!formErrors.employee_id}>
                  <InputLabel>Employee</InputLabel>
                  <Select value={formData.employee_id} onChange={(e) => setFormData(p => ({...p, employee_id: e.target.value}))} label="Employee" disabled={loadingEmployees || isSaving}>
                    {loadingEmployees ? <MenuItem disabled><CircularProgress size={20} /> Loading...</MenuItem> : employees.map((emp) => (<MenuItem key={emp.value} value={emp.value}>{emp.label}</MenuItem>))}
                  </Select>
                  {formErrors.employee_id && <Typography variant="caption" color="error">{formErrors.employee_id}</Typography>}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth size="small" required error={!!formErrors.award_type_id}>
                  <InputLabel>Award Type</InputLabel>
                  <Select value={formData.award_type_id} onChange={(e) => setFormData(p => ({...p, award_type_id: e.target.value}))} label="Award Type" disabled={loadingAwardTypes || isSaving}>
                    {loadingAwardTypes ? <MenuItem disabled><CircularProgress size={20} /> Loading...</MenuItem> : awardTypes.map((type) => (<MenuItem key={type.value} value={type.value}>{type.label}</MenuItem>))}
                  </Select>
                  {formErrors.award_type_id && <Typography variant="caption" color="error">{formErrors.award_type_id}</Typography>}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}><TextField fullWidth size="small" type="date" label="Date" value={formData.created_at} onChange={(e) => setFormData(p => ({...p, created_at: e.target.value}))} InputLabelProps={{ shrink: true }} disabled={isSaving} error={!!formErrors.created_at} helperText={formErrors.created_at} /></Grid>
              <Grid item xs={12} sm={6}><TextField fullWidth size="small" type="month" label="Month & Year" required value={formData.award_month_year} onChange={(e) => setFormData(p => ({...p, award_month_year: e.target.value}))} InputLabelProps={{ shrink: true }} disabled={isSaving} error={!!formErrors.award_month_year} helperText={formErrors.award_month_year} /></Grid>
              <Grid item xs={12} sm={6}><TextField fullWidth size="small" label="Gift Item" value={formData.gift_item} onChange={(e) => setFormData(p => ({...p, gift_item: e.target.value}))} disabled={isSaving} /></Grid>
              <Grid item xs={12} sm={6}><TextField fullWidth size="small" label="Cash Amount" type="number" value={formData.cash_price} onChange={(e) => setFormData(p => ({...p, cash_price: e.target.value}))} InputProps={{ startAdornment: <InputAdornment position="start">₹</InputAdornment>, inputProps: { min: "0" } }} disabled={isSaving} /></Grid>
              <Grid item xs={12}><TextField fullWidth size="small" label="Associated Goals" value={formData.associated_goals} onChange={(e) => setFormData(p => ({...p, associated_goals: e.target.value}))} disabled={isSaving} error={!!formErrors.associated_goals} helperText={formErrors.associated_goals} /></Grid>
              <Grid item xs={12}><TextField fullWidth size="small" label="Description" multiline rows={2} value={formData.description} onChange={(e) => setFormData(p => ({...p, description: e.target.value}))} disabled={isSaving} error={!!formErrors.description} helperText={formErrors.description} /></Grid>
              <Grid item xs={12}><TextField fullWidth size="small" label="Award Information" multiline rows={2} required value={formData.award_information} onChange={(e) => setFormData(p => ({...p, award_information: e.target.value}))} disabled={isSaving} error={!!formErrors.award_information} helperText={formErrors.award_information} /></Grid>
              <Grid item xs={12}>
                <Button variant="outlined" component="label">
                    Upload Photo
                    <input type="file" hidden accept=".gif,.png,.jpg,.jpeg" onChange={(e) => setFormData(p => ({...p, award_photo: e.target.files[0]}))} />
                </Button>
                {formData.award_photo && <Typography variant="caption" sx={{ ml: 2 }}>{formData.award_photo.name}</Typography>}
              </Grid>
            </Grid>
          ) : (
            <TextField fullWidth size="small" value={newAwardType} onChange={(e) => setNewAwardType(e.target.value)} label="Award Type Name" sx={{ mt: 1 }} disabled={isSaving} autoFocus/>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} sx={{ color: '#757575' }}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleFormSubmit}
            disabled={isSaving}
            sx={{ backgroundColor: '#8C257C', color: 'white', '&:hover': { backgroundColor: '#6d1d60' } }}
          >
            {isSaving ? <CircularProgress size={24} color="inherit" /> : editingData ? 'Update' : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}