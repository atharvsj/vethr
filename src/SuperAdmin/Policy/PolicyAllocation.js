// import { useState, useEffect, useMemo } from "react";
// import axiosInstance from "../../utils/axiosInstance";
// import axios from "axios";
// import {
//   Box,
//   Button,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   OutlinedInput,
//   Chip,
//   TextField,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   TablePagination,
//   Typography,
//   Container,
//   Card,
//   CardContent,
//   Snackbar,
//   Alert,
//   IconButton,
//   InputAdornment,
//   Checkbox,
//   ListItemText,
//   Tooltip,
//   CircularProgress,
// } from "@mui/material";
// import {
//   Add as AddIcon,
//   Search as SearchIcon,
//   Clear as ClearIcon,
//   Edit as EditIcon,
//   Delete as DeleteIcon,
// } from "@mui/icons-material";

// const API_BASE_URL = "https://tdtlworld.com/hrms-backend";

// const PolicyAllocation = () => {
//   const [employees, setEmployees] = useState([]);
//   const [policies, setPolicies] = useState([]);
//   const [allocations, setAllocations] = useState([]);
//   const [open, setOpen] = useState(false);
//   const [selectedEmployees, setSelectedEmployees] = useState([]);
//   const [selectedPolicies, setSelectedPolicies] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);
//   const [snackbarInfo, setSnackbarInfo] = useState({
//     open: false,
//     message: "",
//     severity: "success",
//   });
//   const [editingId, setEditingId] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [acknowledgedPolicyIds, setAcknowledgedPolicyIds] = useState([]);

//   // ADDED: State to control the open/close of the select dropdowns
//   const [employeeSelectOpen, setEmployeeSelectOpen] = useState(false);
//   const [policySelectOpen, setPolicySelectOpen] = useState(false);

//   const policyMap = useMemo(() => {
//     return new Map(policies.map((p) => [p.id, p.name]));
//   }, [policies]);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     setLoading(true);
//     try {
//       const [allocationsRes, employeesRes, policiesRes] = await Promise.all([
//         axios.get(`${API_BASE_URL}/api/policy-allocation/`),
//         axios.get(`${API_BASE_URL}/employee-dropdown/`),
//         axiosInstance.get(`${API_BASE_URL}/policies/`),
//       ]);

//       setEmployees(
//         employeesRes.data.map((emp) => ({ id: emp.emp_id, name: emp.label }))
//       );

//       const allPolicies = policiesRes.data.data.map((policy) => ({
//         id: policy.policy_id,
//         name: policy.title,
//       }));
//       setPolicies(allPolicies);
//       const localPolicyMap = new Map(allPolicies.map((p) => [p.id, p.name]));

//       const processedAllocations = allocationsRes.data.map((alloc) => {
//         const policyIds = alloc.policy_id ? alloc.policy_id.split(",").map((id) => parseInt(id.trim(), 10)) : [];
//         const policyStatuses = alloc.policy_acknowledgement_status ? alloc.policy_acknowledgement_status.split(",").map((s) => s.trim()) : [];

//         const uniquePolicies = new Map();
//         policyIds.forEach((id, index) => {
//           if (isNaN(id)) return;
//           const isAcknowledged = policyStatuses[index] === "Y";
//           const policyName = localPolicyMap.get(id) || "Unknown Policy";

//           if (!uniquePolicies.has(id)) {
//             uniquePolicies.set(id, { id, name: policyName, acknowledged: isAcknowledged });
//           } else if (isAcknowledged) {
//             uniquePolicies.get(id).acknowledged = true;
//           }
//         });

//         const detailedPolicies = Array.from(uniquePolicies.values());
//         return {
//           policy_allocation_id: alloc.policy_allocation_id,
//           id: alloc.emp_id,
//           employeeName: alloc.employee_name,
//           detailedPolicies: detailedPolicies,
//           policyIds: detailedPolicies.map((p) => p.id),
//           policies: detailedPolicies.map((p) => p.name).filter((name) => name !== "Unknown Policy"),
//           allocationDate: alloc.allocation_date,
//         };
//       });

//       const sortedAllocations = processedAllocations.sort(
//         (a, b) => new Date(b.allocationDate) - new Date(a.allocationDate)
//       );

//       setAllocations(sortedAllocations);
//     } catch (err) {
//       console.error("Error fetching data:", err);
//       setSnackbarInfo({ open: true, message: "Error loading data.", severity: "error" });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleClickOpen = () => setOpen(true);

//   const handleClose = () => {
//     setOpen(false);
//     setEditingId(null);
//     setSelectedEmployees([]);
//     setSelectedPolicies([]);
//     setAcknowledgedPolicyIds([]);
//   };

//   const handleEditClick = (allocation) => {
//     setEditingId(allocation.policy_allocation_id);
//     setSelectedEmployees([allocation.id]);
//     setSelectedPolicies(allocation.policyIds);
//     const acknowledgedIds = allocation.detailedPolicies.filter((p) => p.acknowledged).map((p) => p.id);
//     setAcknowledgedPolicyIds(acknowledgedIds);
//     setOpen(true);
//   };

//   const handleEmployeeChange = (e) => setSelectedEmployees(typeof e.target.value === "string" ? e.target.value.split(",") : e.target.value);
//   const handlePolicyChange = (e) => {
//     const value = e.target.value;
//     if (value.includes("all")) {
//       setSelectedPolicies(selectedPolicies.length === policies.length ? [] : policies.map((p) => p.id));
//     } else {
//       setSelectedPolicies(value);
//     }
//   };

//   const handleSave = async () => {
//     if (selectedEmployees.length === 0) {
//       return setSnackbarInfo({ open: true, message: "Select at least one employee.", severity: "warning" });
//     }
//     if (editingId) {
//       try {
//         const originalAllocation = allocations.find((a) => a.policy_allocation_id === editingId);
//         if (!originalAllocation) throw new Error("Original allocation not found.");
//         const originalPolicyIds = originalAllocation.policyIds;
//         const newPolicyIds = selectedPolicies;
//         const policies_to_add_ids = newPolicyIds.filter((id) => !originalPolicyIds.includes(id));
//         const policies_to_remove_ids = originalPolicyIds.filter((id) => !newPolicyIds.includes(id));

//         if (policies_to_add_ids.length === 0 && policies_to_remove_ids.length === 0) {
//           setSnackbarInfo({ open: true, message: "No changes detected.", severity: "info" });
//           handleClose();
//           return;
//         }

//         // --- MODIFICATION START ---
//         // Convert policy IDs to policy names (the "actual value") for the payload.
//         const policies_to_add_names = policies_to_add_ids.map(id => policyMap.get(id));
//         const policies_to_remove_names = policies_to_remove_ids.map(id => policyMap.get(id));
        
//         const payload = {
//           employee_id: originalAllocation.id,
//           policies_to_add: policies_to_add_names,
//           policies_to_remove: policies_to_remove_names,
//         };
//         // --- MODIFICATION END ---
        
//         await axios.patch(`${API_BASE_URL}/api/policy-allocation/${editingId}/`, payload);
//         setSnackbarInfo({ open: true, message: "Policy allocation updated successfully.", severity: "success" });
//         fetchData();
//         handleClose();
//       } catch (err) {
//         console.error("Failed to update policy allocation:", err);
//         setSnackbarInfo({ open: true, message: err.response?.data?.detail || "Failed to update allocation.", severity: "error" });
//       }
//     } else {
//       try {
//         const payload = { employee_ids: selectedEmployees, policy_ids: selectedPolicies };
//         await axios.post(`${API_BASE_URL}/api/policy-allocation/`, payload);
//         setSnackbarInfo({ open: true, message: "Policies allocated successfully!", severity: "success" });
//         fetchData();
//         handleClose();
//       } catch (err) {
//         console.error("Failed to allocate policy:", err);
//         setSnackbarInfo({ open: true, message: err.response?.data?.detail || "Failed to allocate policy.", severity: "error" });
//       }
//     }
//   };

//   const handleDelete = async (allocationId) => {
//     if (window.confirm("Are you sure you want to delete this allocation?")) {
//       try {
//         await axios.delete(`${API_BASE_URL}/api/policy-allocation/${allocationId}/`);
//         setSnackbarInfo({ open: true, message: "Policy allocation deleted successfully.", severity: "success" });
//         fetchData();
//       } catch (err) {
//         console.error("Failed to delete policy allocation:", err);
//         setSnackbarInfo({ open: true, message: "Failed to delete allocation.", severity: "error" });
//       }
//     }
//   };

//   const filtered = allocations.filter(
//     (a) => a.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) || a.policies.some((p) => p.toLowerCase().includes(searchTerm.toLowerCase()))
//   );

//   const paginated = filtered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
//   const isAllSelected = policies.length > 0 && selectedPolicies.length === policies.length;

//   return (
//     <Container maxWidth="lg" sx={{ py: 2 }}>
//       <Card elevation={3} sx={{ borderRadius: 2 }}>
//         <CardContent>
//           <Typography variant="h5" gutterBottom fontWeight="600">
//             Policy Allocation Management
//           </Typography>
//           <Box
//             sx={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//               mb: 2,
//               flexWrap: "wrap",
//               gap: 2,
//             }}
//           >
//             <Button
//               variant="contained"
//               startIcon={<AddIcon />}
//               onClick={handleClickOpen}
//               sx={{ backgroundColor: '#7C3AED', '&:hover': { backgroundColor: '#6D28D9' } }}
//             >
//               Allocate Policy
//             </Button>
//             <TextField
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               placeholder="Search..."
//               size="small"
//               sx={{ minWidth: 300 }}
//               InputProps={{
//                 startAdornment: (<InputAdornment position="start"><SearchIcon /></InputAdornment>),
//                 endAdornment: searchTerm && (<InputAdornment position="end"><IconButton size="small" onClick={() => setSearchTerm("")}><ClearIcon /></IconButton></InputAdornment>),
//               }}
//             />
//           </Box>
//           <TableContainer component={Paper} variant="outlined">
//             <Table>
//               <TableHead sx={{ backgroundColor: "#f9fafb" }}>
//                 <TableRow>
//                   <TableCell sx={{ fontWeight: "bold" }}>SR. NO.</TableCell>
//                   <TableCell sx={{ fontWeight: "bold" }}>Employee</TableCell>
//                   <TableCell sx={{ fontWeight: "bold" }}>Policies</TableCell>
//                   <TableCell sx={{ fontWeight: "bold" }}>Date</TableCell>
//                   <TableCell align="center" sx={{ fontWeight: "bold" }}>Actions</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {loading ? (
//                   <TableRow><TableCell colSpan={5} align="center" sx={{ p: 4 }}><CircularProgress /></TableCell></TableRow>
//                 ) : paginated.length > 0 ? (
//                   paginated.map((row, index) => (
//                     <TableRow key={row.policy_allocation_id} hover>
//                       <TableCell>{page * rowsPerPage + index + 1}</TableCell>
//                       <TableCell>{row.employeeName}</TableCell>
//                       <TableCell sx={{ maxWidth: "400px" }}>
//                         <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
//                           {row.policies.map((p, i) => (<Chip key={i} label={p} size="small" sx={{ bgcolor: 'grey.200' }} />))}
//                         </Box>
//                       </TableCell>
//                       <TableCell>{new Date(row.allocationDate).toLocaleDateString()}</TableCell>
//                       <TableCell align="center">
//                         <Tooltip title="Edit"><IconButton onClick={() => handleEditClick(row)}><EditIcon sx={{ color: '#7C3AED' }} /></IconButton></Tooltip>
//                         <Tooltip title="Delete"><IconButton onClick={() => handleDelete(row.policy_allocation_id)}><DeleteIcon color="error" /></IconButton></Tooltip>
//                       </TableCell>
//                     </TableRow>
//                   ))
//                 ) : (
//                   <TableRow><TableCell colSpan={5} align="center" sx={{ p: 4 }}>No records found</TableCell></TableRow>
//                 )}
//               </TableBody>
//             </Table>
//           </TableContainer>
//           <TablePagination
//             rowsPerPageOptions={[5, 10, 25]}
//             component="div"
//             count={filtered.length}
//             rowsPerPage={rowsPerPage}
//             page={page}
//             onPageChange={(e, newPage) => setPage(newPage)}
//             onRowsPerPageChange={(e) => { setRowsPerPage(+e.target.value); setPage(0); }}
//           />
//         </CardContent>
//       </Card>
//       <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
//         <DialogTitle>{editingId ? "Edit Allocation" : "Allocate New Policy"}</DialogTitle>
//         <DialogContent>
//           <FormControl fullWidth sx={{ my: 2 }}>
//             <InputLabel>Select Employees</InputLabel>
//             <Select
//               multiple value={selectedEmployees} onChange={handleEmployeeChange}
//               input={<OutlinedInput label="Select Employees" />} disabled={!!editingId}
//               // ADDED: Control open state
//               open={employeeSelectOpen}
//               onOpen={() => setEmployeeSelectOpen(true)}
//               onClose={() => setEmployeeSelectOpen(false)}
//               renderValue={(selected) => (
//                 <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
//                   {selected.map((val) => (<Chip key={val} label={employees.find((emp) => emp.id === val)?.name || val} size="small" />))}
//                 </Box>
//               )}
//             >
//               {employees.map((emp) => (<MenuItem key={emp.id} value={emp.id}>{emp.name}</MenuItem>))}
//               {/* ADDED: Sticky close button container */}
//               <Box sx={{ position: 'sticky', bottom: 0, bgcolor: 'background.paper', py: 1, px: 2, borderTop: 1, borderColor: 'divider', display: 'flex', justifyContent: 'flex-end' }}>
//                 <Button onClick={() => setEmployeeSelectOpen(false)} size="small">Close</Button>
//               </Box>
//             </Select>
//           </FormControl>
//           <FormControl fullWidth sx={{ my: 2 }}>
//             <InputLabel>Select Policies</InputLabel>
//             <Select
//               multiple value={selectedPolicies} onChange={handlePolicyChange}
//               input={<OutlinedInput label="Select Policies" />}
//               // ADDED: Control open state
//               open={policySelectOpen}
//               onOpen={() => setPolicySelectOpen(true)}
//               onClose={() => setPolicySelectOpen(false)}
//               renderValue={(selected) => (
//                 <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
//                   {selected.map((id) => (<Chip key={id} label={policyMap.get(id) || id} size="small" />))}
//                 </Box>
//               )}
//             >
//               <MenuItem value="all">
//                 <Checkbox checked={isAllSelected} indeterminate={selectedPolicies.length > 0 && !isAllSelected} />
//                 <ListItemText primary="Select All" />
//               </MenuItem>
//               {policies.map((policy) => {
//                 const isAcknowledged = !!editingId && acknowledgedPolicyIds.includes(policy.id);
//                 return (
//                   <MenuItem key={policy.id} value={policy.id} disabled={isAcknowledged}>
//                     <Checkbox checked={selectedPolicies.includes(policy.id)} disabled={isAcknowledged} />
//                     <ListItemText primary={policy.name} sx={isAcknowledged ? { color: "text.disabled" } : {}} />
//                   </MenuItem>
//                 );
//               })}
//               {/* ADDED: Sticky close button container */}
//               <Box sx={{ position: 'sticky', bottom: 0, bgcolor: 'background.paper', py: 1, px: 2, borderTop: 1, borderColor: 'divider', display: 'flex', justifyContent: 'flex-end' }}>
//                 <Button onClick={() => setPolicySelectOpen(false)} size="small">Close</Button>
//               </Box>
//             </Select>
//           </FormControl>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose}>Cancel</Button>
//           <Button onClick={handleSave} variant="contained" disabled={selectedEmployees.length === 0} sx={{ backgroundColor: '#7C3AED', '&:hover': { backgroundColor: '#6D28D9' } }}>
//             {editingId ? "Update" : "Save"}
//           </Button>
//         </DialogActions>
//       </Dialog>
//       <Snackbar
//         open={snackbarInfo.open}
//         autoHideDuration={6000}
//         onClose={() => setSnackbarInfo({ ...snackbarInfo, open: false })}
//         anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
//       >
//         <Alert onClose={() => setSnackbarInfo({ ...snackbarInfo, open: false })} severity={snackbarInfo.severity} variant="filled" sx={{ width: "100%" }}>
//           {snackbarInfo.message}
//         </Alert>
//       </Snackbar>
//     </Container>
//   );
// };

// export default PolicyAllocation;   //// 






// import { useState, useEffect, useMemo } from "react";
// import axiosInstance from "../../utils/axiosInstance";
// import axios from "axios";
// import {
//   Box,
//   Button,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   OutlinedInput,
//   Chip,
//   TextField,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   TablePagination,
//   Typography,
//   Container,
//   Card,
//   CardContent,
//   Snackbar,
//   Alert,
//   IconButton,
//   InputAdornment,
//   Checkbox,
//   ListItemText,
//   Tooltip,
//   CircularProgress,
// } from "@mui/material";
// import {
//   Search as SearchIcon,
//   Clear as ClearIcon,
//   Edit as EditIcon,
//   Delete as DeleteIcon,
// } from "@mui/icons-material";

// const API_BASE_URL = "https://tdtlworld.com/hrms-backend";

// const PolicyAllocation = () => {
//   const [employees, setEmployees] = useState([]);
//   const [policies, setPolicies] = useState([]);
//   const [allocations, setAllocations] = useState([]);
//   const [open, setOpen] = useState(false);
//   const [selectedEmployees, setSelectedEmployees] = useState([]);
//   const [selectedPolicies, setSelectedPolicies] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);
//   const [snackbarInfo, setSnackbarInfo] = useState({
//     open: false,
//     message: "",
//     severity: "success",
//   });
//   const [editingId, setEditingId] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [acknowledgedPolicyIds, setAcknowledgedPolicyIds] = useState([]);

//   // ADDED: State to control the open/close of the select dropdowns
//   const [employeeSelectOpen, setEmployeeSelectOpen] = useState(false);
//   const [policySelectOpen, setPolicySelectOpen] = useState(false);

//   const policyMap = useMemo(() => {
//     return new Map(policies.map((p) => [p.id, p.name]));
//   }, [policies]);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     setLoading(true);
//     try {
//       const [allocationsRes, employeesRes, policiesRes] = await Promise.all([
//         axios.get(`${API_BASE_URL}/api/policy-allocation/`),
//         axios.get(`${API_BASE_URL}/employee-dropdown/`),
//         axiosInstance.get(`${API_BASE_URL}/policies/`),
//       ]);

//       setEmployees(
//         employeesRes.data.map((emp) => ({ id: emp.emp_id, name: emp.label }))
//       );

//       const allPolicies = policiesRes.data.data.map((policy) => ({
//         id: policy.policy_id,
//         name: policy.title,
//       }));
//       setPolicies(allPolicies);
//       const localPolicyMap = new Map(allPolicies.map((p) => [p.id, p.name]));

//       const processedAllocations = allocationsRes.data.map((alloc) => {
//         const policyIds = alloc.policy_id ? alloc.policy_id.split(",").map((id) => parseInt(id.trim(), 10)) : [];
//         const policyStatuses = alloc.policy_acknowledgement_status ? alloc.policy_acknowledgement_status.split(",").map((s) => s.trim()) : [];

//         const uniquePolicies = new Map();
//         policyIds.forEach((id, index) => {
//           if (isNaN(id)) return;
//           const isAcknowledged = policyStatuses[index] === "Y";
//           const policyName = localPolicyMap.get(id) || "Unknown Policy";

//           if (!uniquePolicies.has(id)) {
//             uniquePolicies.set(id, { id, name: policyName, acknowledged: isAcknowledged });
//           } else if (isAcknowledged) {
//             uniquePolicies.get(id).acknowledged = true;
//           }
//         });

//         const detailedPolicies = Array.from(uniquePolicies.values());
//         return {
//           policy_allocation_id: alloc.policy_allocation_id,
//           id: alloc.emp_id,
//           employeeName: alloc.employee_name,
//           detailedPolicies: detailedPolicies,
//           policyIds: detailedPolicies.map((p) => p.id),
//           policies: detailedPolicies.map((p) => p.name).filter((name) => name !== "Unknown Policy"),
//           allocationDate: alloc.allocation_date,
//         };
//       });

//       const sortedAllocations = processedAllocations.sort(
//         (a, b) => new Date(b.allocationDate) - new Date(a.allocationDate)
//       );

//       setAllocations(sortedAllocations);
//     } catch (err) {
//       console.error("Error fetching data:", err);
//       setSnackbarInfo({ open: true, message: "Error loading data.", severity: "error" });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleClose = () => {
//     setOpen(false);
//     setEditingId(null);
//     setSelectedEmployees([]);
//     setSelectedPolicies([]);
//     setAcknowledgedPolicyIds([]);
//   };

//   const handleEditClick = (allocation) => {
//     setEditingId(allocation.policy_allocation_id);
//     setSelectedEmployees([allocation.id]);
//     setSelectedPolicies(allocation.policyIds);
//     const acknowledgedIds = allocation.detailedPolicies.filter((p) => p.acknowledged).map((p) => p.id);
//     setAcknowledgedPolicyIds(acknowledgedIds);
//     setOpen(true);
//   };

//   const handlePolicyChange = (e) => {
//     const value = e.target.value;
//     if (value.includes("all")) {
//       setSelectedPolicies(selectedPolicies.length === policies.length ? [] : policies.map((p) => p.id));
//     } else {
//       setSelectedPolicies(value);
//     }
//   };

//   const handleSave = async () => {
//     if (!editingId) {
//       console.error("Attempted to save without an editing ID.");
//       setSnackbarInfo({ open: true, message: "An error occurred.", severity: "error" });
//       return;
//     }

//     try {
//       const originalAllocation = allocations.find((a) => a.policy_allocation_id === editingId);
//       if (!originalAllocation) throw new Error("Original allocation not found.");
//       const originalPolicyIds = originalAllocation.policyIds;
//       const newPolicyIds = selectedPolicies;
//       const policies_to_add_ids = newPolicyIds.filter((id) => !originalPolicyIds.includes(id));
//       const policies_to_remove_ids = originalPolicyIds.filter((id) => !newPolicyIds.includes(id));

//       if (policies_to_add_ids.length === 0 && policies_to_remove_ids.length === 0) {
//         setSnackbarInfo({ open: true, message: "No changes detected.", severity: "info" });
//         handleClose();
//         return;
//       }

//       // --- MODIFICATION START ---
//       // Convert policy IDs to policy names (the "actual value") for the payload.
//       const policies_to_add_names = policies_to_add_ids.map(id => policyMap.get(id));
//       const policies_to_remove_names = policies_to_remove_ids.map(id => policyMap.get(id));

//       const payload = {
//         employee_id: originalAllocation.id,
//         policies_to_add: policies_to_add_names,
//         policies_to_remove: policies_to_remove_names,
//       };
//       // --- MODIFICATION END ---

//       await axios.patch(`${API_BASE_URL}/api/policy-allocation/${editingId}/`, payload);
//       setSnackbarInfo({ open: true, message: "Policy allocation updated successfully.", severity: "success" });
//       fetchData();
//       handleClose();
//     } catch (err) {
//       console.error("Failed to update policy allocation:", err);
//       setSnackbarInfo({ open: true, message: err.response?.data?.detail || "Failed to update allocation.", severity: "error" });
//     }
//   };

//   const handleDelete = async (allocationId) => {
//     if (window.confirm("Are you sure you want to delete this allocation?")) {
//       try {
//         await axios.delete(`${API_BASE_URL}/api/policy-allocation/${allocationId}/`);
//         setSnackbarInfo({ open: true, message: "Policy allocation deleted successfully.", severity: "success" });
//         fetchData();
//       } catch (err) {
//         console.error("Failed to delete policy allocation:", err);
//         setSnackbarInfo({ open: true, message: "Failed to delete allocation.", severity: "error" });
//       }
//     }
//   };

//   const filtered = allocations.filter(
//     (a) => a.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) || a.policies.some((p) => p.toLowerCase().includes(searchTerm.toLowerCase()))
//   );

//   const paginated = filtered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
//   const isAllSelected = policies.length > 0 && selectedPolicies.length === policies.length;

//   return (
//     <Container maxWidth="lg" sx={{ py: 2 }}>
//       <Card elevation={3} sx={{ borderRadius: 2 }}>
//         <CardContent>
//           <Typography variant="h5" gutterBottom fontWeight="600">
//             Policy Allocation Management
//           </Typography>
//           <Box
//             sx={{
//               display: "flex",
//               justifyContent: "flex-end", // Changed to align search to the right
//               alignItems: "center",
//               mb: 2,
//               flexWrap: "wrap",
//               gap: 2,
//             }}
//           >
//             <TextField
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               placeholder="Search..."
//               size="small"
//               sx={{ minWidth: 300 }}
//               InputProps={{
//                 startAdornment: (<InputAdornment position="start"><SearchIcon /></InputAdornment>),
//                 endAdornment: searchTerm && (<InputAdornment position="end"><IconButton size="small" onClick={() => setSearchTerm("")}><ClearIcon /></IconButton></InputAdornment>),
//               }}
//             />
//           </Box>
//           <TableContainer component={Paper} variant="outlined">
//             <Table>
//               <TableHead sx={{ backgroundColor: "#f9fafb" }}>
//                 <TableRow>
//                   <TableCell sx={{ fontWeight: "bold" }}>SR. NO.</TableCell>
//                   <TableCell sx={{ fontWeight: "bold" }}>Employee</TableCell>
//                   <TableCell sx={{ fontWeight: "bold" }}>Policies</TableCell>
//                   <TableCell sx={{ fontWeight: "bold" }}>Date</TableCell>
//                   {/* <TableCell align="center" sx={{ fontWeight: "bold" }}>Actions</TableCell> */}
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {loading ? (
//                   <TableRow><TableCell colSpan={5} align="center" sx={{ p: 4 }}><CircularProgress /></TableCell></TableRow>
//                 ) : paginated.length > 0 ? (
//                   paginated.map((row, index) => (
//                     <TableRow key={row.policy_allocation_id} hover>
//                       <TableCell>{page * rowsPerPage + index + 1}</TableCell>
//                       <TableCell>{row.employeeName}</TableCell>
//                       <TableCell sx={{ maxWidth: "400px" }}>
//                         <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
//                           {row.policies.map((p, i) => (<Chip key={i} label={p} size="small" sx={{ bgcolor: 'grey.200' }} />))}
//                         </Box>
//                       </TableCell>
//                       <TableCell>{new Date(row.allocationDate).toLocaleDateString()}</TableCell>
//                       {/* <TableCell align="center">
//                         <Tooltip title="Edit"><IconButton onClick={() => handleEditClick(row)}><EditIcon sx={{ color: '#7C3AED' }} /></IconButton></Tooltip>
//                         <Tooltip title="Delete"><IconButton onClick={() => handleDelete(row.policy_allocation_id)}><DeleteIcon color="error" /></IconButton></Tooltip>
//                       </TableCell> */}
//                     </TableRow>
//                   ))
//                 ) : (
//                   <TableRow><TableCell colSpan={5} align="center" sx={{ p: 4 }}>No records found</TableCell></TableRow>
//                 )}
//               </TableBody>
//             </Table>
//           </TableContainer>
//           <TablePagination
//             rowsPerPageOptions={[5, 10, 25]}
//             component="div"
//             count={filtered.length}
//             rowsPerPage={rowsPerPage}
//             page={page}
//             onPageChange={(e, newPage) => setPage(newPage)}
//             onRowsPerPageChange={(e) => { setRowsPerPage(+e.target.value); setPage(0); }}
//           />
//         </CardContent>
//       </Card>
//       <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
//         <DialogTitle>Edit Allocation</DialogTitle>
//         <DialogContent>
//           <FormControl fullWidth sx={{ my: 2 }}>
//             <InputLabel>Employee</InputLabel>
//             <Select
//               multiple value={selectedEmployees}
//               input={<OutlinedInput label="Employee" />} disabled // Always disabled in edit mode
//               // ADDED: Control open state
//               open={employeeSelectOpen}
//               onOpen={() => setEmployeeSelectOpen(true)}
//               onClose={() => setEmployeeSelectOpen(false)}
//               renderValue={(selected) => (
//                 <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
//                   {selected.map((val) => (<Chip key={val} label={employees.find((emp) => emp.id === val)?.name || val} size="small" />))}
//                 </Box>
//               )}
//             >
//               {employees.map((emp) => (<MenuItem key={emp.id} value={emp.id}>{emp.name}</MenuItem>))}
//               {/* ADDED: Sticky close button container */}
//               <Box sx={{ position: 'sticky', bottom: 0, bgcolor: 'background.paper', py: 1, px: 2, borderTop: 1, borderColor: 'divider', display: 'flex', justifyContent: 'flex-end' }}>
//                 <Button onClick={() => setEmployeeSelectOpen(false)} size="small">Close</Button>
//               </Box>
//             </Select>
//           </FormControl>
//           <FormControl fullWidth sx={{ my: 2 }}>
//             <InputLabel>Select Policies</InputLabel>
//             <Select
//               multiple value={selectedPolicies} onChange={handlePolicyChange}
//               input={<OutlinedInput label="Select Policies" />}
//               // ADDED: Control open state
//               open={policySelectOpen}
//               onOpen={() => setPolicySelectOpen(true)}
//               onClose={() => setPolicySelectOpen(false)}
//               renderValue={(selected) => (
//                 <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
//                   {selected.map((id) => (<Chip key={id} label={policyMap.get(id) || id} size="small" />))}
//                 </Box>
//               )}
//             >
//               <MenuItem value="all">
//                 <Checkbox checked={isAllSelected} indeterminate={selectedPolicies.length > 0 && !isAllSelected} />
//                 <ListItemText primary="Select All" />
//               </MenuItem>
//               {policies.map((policy) => {
//                 const isAcknowledged = !!editingId && acknowledgedPolicyIds.includes(policy.id);
//                 return (
//                   <MenuItem key={policy.id} value={policy.id} disabled={isAcknowledged}>
//                     <Checkbox checked={selectedPolicies.includes(policy.id)} disabled={isAcknowledged} />
//                     <ListItemText primary={policy.name} sx={isAcknowledged ? { color: "text.disabled" } : {}} />
//                   </MenuItem>
//                 );
//               })}
//               {/* ADDED: Sticky close button container */}
//               <Box sx={{ position: 'sticky', bottom: 0, bgcolor: 'background.paper', py: 1, px: 2, borderTop: 1, borderColor: 'divider', display: 'flex', justifyContent: 'flex-end' }}>
//                 <Button onClick={() => setPolicySelectOpen(false)} size="small">Close</Button>
//               </Box>
//             </Select>
//           </FormControl>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose}>Cancel</Button>
//           <Button onClick={handleSave} variant="contained" disabled={selectedEmployees.length === 0} sx={{ backgroundColor: '#7C3AED', '&:hover': { backgroundColor: '#6D28D9' } }}>
//             Update
//           </Button>
//         </DialogActions>
//       </Dialog>
//       <Snackbar
//         open={snackbarInfo.open}
//         autoHideDuration={6000}
//         onClose={() => setSnackbarInfo({ ...snackbarInfo, open: false })}
//         anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
//       >
//         <Alert onClose={() => setSnackbarInfo({ ...snackbarInfo, open: false })} severity={snackbarInfo.severity} variant="filled" sx={{ width: "100%" }}>
//           {snackbarInfo.message}
//         </Alert>
//       </Snackbar>
//     </Container>
//   );
// };

// export default PolicyAllocation;














// import { useState, useEffect, useMemo } from "react";
// import axiosInstance from "../../utils/axiosInstance";
// import axios from "axios";
// import {
//   Box,
//   Button,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   OutlinedInput,
//   Chip,
//   TextField,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   TablePagination,
//   Typography,
//   Container,
//   Card,
//   CardContent,
//   Snackbar,
//   Alert,
//   IconButton,
//   InputAdornment,
//   Checkbox,
//   ListItemText,
//   Tooltip,
//   CircularProgress,
// } from "@mui/material";
// import {
//   Search as SearchIcon,
//   Clear as ClearIcon,
//   Edit as EditIcon,
//   Delete as DeleteIcon,
// } from "@mui/icons-material";

// const API_BASE_URL = "https://tdtlworld.com/hrms-backend";

// const PolicyAllocation = () => {
//   const [employees, setEmployees] = useState([]);
//   const [policies, setPolicies] = useState([]);
//   const [allocations, setAllocations] = useState([]);
//   const [open, setOpen] = useState(false);
//   const [selectedEmployees, setSelectedEmployees] = useState([]);
//   const [selectedPolicies, setSelectedPolicies] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);
//   const [snackbarInfo, setSnackbarInfo] = useState({
//     open: false,
//     message: "",
//     severity: "success",
//   });
//   const [editingId, setEditingId] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [acknowledgedPolicyIds, setAcknowledgedPolicyIds] = useState([]);

//   // ADDED: State to control the open/close of the select dropdowns
//   const [employeeSelectOpen, setEmployeeSelectOpen] = useState(false);
//   const [policySelectOpen, setPolicySelectOpen] = useState(false);

//   const policyMap = useMemo(() => {
//     return new Map(policies.map((p) => [p.id, p.name]));
//   }, [policies]);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     setLoading(true);
//     try {
//       const [allocationsRes, employeesRes, policiesRes] = await Promise.all([
//         axios.get(`${API_BASE_URL}/api/policy-allocation/`),
//         axios.get(`${API_BASE_URL}/employee-dropdown/`),
//         axiosInstance.get(`${API_BASE_URL}/policies/`),
//       ]);

//       setEmployees(
//         employeesRes.data.map((emp) => ({ id: emp.emp_id, name: emp.label }))
//       );

//       const allPolicies = policiesRes.data.data.map((policy) => ({
//         id: policy.policy_id,
//         name: policy.title,
//       }));
//       setPolicies(allPolicies);
//       const localPolicyMap = new Map(allPolicies.map((p) => [p.id, p.name]));

//       const processedAllocations = allocationsRes.data.map((alloc) => {
//         const policyIds = alloc.policy_id ? alloc.policy_id.split(",").map((id) => parseInt(id.trim(), 10)) : [];
//         const policyStatuses = alloc.policy_acknowledgement_status ? alloc.policy_acknowledgement_status.split(",").map((s) => s.trim()) : [];

//         const uniquePolicies = new Map();
//         policyIds.forEach((id, index) => {
//           if (isNaN(id)) return;
//           const isAcknowledged = policyStatuses[index] === "Y";
//           const policyName = localPolicyMap.get(id) || "Unknown Policy";

//           if (!uniquePolicies.has(id)) {
//             uniquePolicies.set(id, { id, name: policyName, acknowledged: isAcknowledged });
//           } else if (isAcknowledged) {
//             uniquePolicies.get(id).acknowledged = true;
//           }
//         });

//         const detailedPolicies = Array.from(uniquePolicies.values());
//         return {
//           policy_allocation_id: alloc.policy_allocation_id,
//           id: alloc.emp_id,
//           employeeName: alloc.employee_name,
//           detailedPolicies: detailedPolicies,
//           policyIds: detailedPolicies.map((p) => p.id),
//           policies: detailedPolicies.map((p) => p.name).filter((name) => name !== "Unknown Policy"),
//           allocationDate: alloc.allocation_date,
//         };
//       });

//       const sortedAllocations = processedAllocations.sort(
//         (a, b) => new Date(b.allocationDate) - new Date(a.allocationDate)
//       );

//       setAllocations(sortedAllocations);
//     } catch (err) {
//       console.error("Error fetching data:", err);
//       setSnackbarInfo({ open: true, message: "Error loading data.", severity: "error" });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleClose = () => {
//     setOpen(false);
//     setEditingId(null);
//     setSelectedEmployees([]);
//     setSelectedPolicies([]);
//     setAcknowledgedPolicyIds([]);
//   };

//   const handleEditClick = (allocation) => {
//     setEditingId(allocation.policy_allocation_id);
//     setSelectedEmployees([allocation.id]);
//     setSelectedPolicies(allocation.policyIds);
//     const acknowledgedIds = allocation.detailedPolicies.filter((p) => p.acknowledged).map((p) => p.id);
//     setAcknowledgedPolicyIds(acknowledgedIds);
//     setOpen(true);
//   };

//   const handlePolicyChange = (e) => {
//     const value = e.target.value;
//     if (value.includes("all")) {
//       setSelectedPolicies(selectedPolicies.length === policies.length ? [] : policies.map((p) => p.id));
//     } else {
//       setSelectedPolicies(value);
//     }
//   };

//   const handleSave = async () => {
//     if (!editingId) {
//       console.error("Attempted to save without an editing ID.");
//       setSnackbarInfo({ open: true, message: "An error occurred.", severity: "error" });
//       return;
//     }

//     try {
//       const originalAllocation = allocations.find((a) => a.policy_allocation_id === editingId);
//       if (!originalAllocation) throw new Error("Original allocation not found.");
//       const originalPolicyIds = originalAllocation.policyIds;
//       const newPolicyIds = selectedPolicies;
//       const policies_to_add_ids = newPolicyIds.filter((id) => !originalPolicyIds.includes(id));
//       const policies_to_remove_ids = originalPolicyIds.filter((id) => !newPolicyIds.includes(id));

//       if (policies_to_add_ids.length === 0 && policies_to_remove_ids.length === 0) {
//         setSnackbarInfo({ open: true, message: "No changes detected.", severity: "info" });
//         handleClose();
//         return;
//       }

//       // --- MODIFICATION START ---
//       // Convert policy IDs to policy names (the "actual value") for the payload.
//       const policies_to_add_names = policies_to_add_ids.map(id => policyMap.get(id));
//       const policies_to_remove_names = policies_to_remove_ids.map(id => policyMap.get(id));

//       const payload = {
//         employee_id: originalAllocation.id,
//         policies_to_add: policies_to_add_names,
//         policies_to_remove: policies_to_remove_names,
//       };
//       // --- MODIFICATION END ---

//       await axios.patch(`${API_BASE_URL}/api/policy-allocation/${editingId}/`, payload);
//       setSnackbarInfo({ open: true, message: "Policy allocation updated successfully.", severity: "success" });
//       fetchData();
//       handleClose();
//     } catch (err) {
//       console.error("Failed to update policy allocation:", err);
//       setSnackbarInfo({ open: true, message: err.response?.data?.detail || "Failed to update allocation.", severity: "error" });
//     }
//   };

//   const handleDelete = async (allocationId) => {
//     if (window.confirm("Are you sure you want to delete this allocation?")) {
//       try {
//         await axios.delete(`${API_BASE_URL}/api/policy-allocation/${allocationId}/`);
//         setSnackbarInfo({ open: true, message: "Policy allocation deleted successfully.", severity: "success" });
//         fetchData();
//       } catch (err) {
//         console.error("Failed to delete policy allocation:", err);
//         setSnackbarInfo({ open: true, message: "Failed to delete allocation.", severity: "error" });
//       }
//     }
//   };

//   const filtered = allocations.filter(
//     (a) => a.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) || a.policies.some((p) => p.toLowerCase().includes(searchTerm.toLowerCase()))
//   );

//   const paginated = filtered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
//   const isAllSelected = policies.length > 0 && selectedPolicies.length === policies.length;

//   return (
//     <Container maxWidth="lg" sx={{ py: 2 }}>
//       <Card elevation={3} sx={{ borderRadius: 2 }}>
//         <CardContent>
//           <Typography variant="h5" gutterBottom fontWeight="600">
//             Policy Allocation Management
//           </Typography>
//           <Box
//             sx={{
//               display: "flex",
//               justifyContent: "flex-end", // Changed to align search to the right
//               alignItems: "center",
//               mb: 2,
//               flexWrap: "wrap",
//               gap: 2,
//             }}
//           >
//             <TextField
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               placeholder="Search..."
//               size="small"
//               sx={{ minWidth: 300 }}
//               InputProps={{
//                 startAdornment: (<InputAdornment position="start"><SearchIcon /></InputAdornment>),
//                 endAdornment: searchTerm && (<InputAdornment position="end"><IconButton size="small" onClick={() => setSearchTerm("")}><ClearIcon /></IconButton></InputAdornment>),
//               }}
//             />
//           </Box>
//           <TableContainer component={Paper} variant="outlined">
//             <Table>
//               <TableHead sx={{ backgroundColor: "#f9fafb" }}>
//                 <TableRow>
//                   <TableCell sx={{ fontWeight: "bold" }}>SR. NO.</TableCell>
//                   <TableCell sx={{ fontWeight: "bold" }}>Employee</TableCell>
//                   <TableCell sx={{ fontWeight: "bold" }}>Policies</TableCell>
//                   {/* <TableCell align="center" sx={{ fontWeight: "bold" }}>Actions</TableCell> */}
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {loading ? (
//                   <TableRow><TableCell colSpan={3} align="center" sx={{ p: 4 }}><CircularProgress /></TableCell></TableRow>
//                 ) : paginated.length > 0 ? (
//                   paginated.map((row, index) => (
//                     <TableRow key={row.policy_allocation_id} hover>
//                       <TableCell>{page * rowsPerPage + index + 1}</TableCell>
//                       <TableCell>{row.employeeName}</TableCell>
//                       <TableCell sx={{ maxWidth: "400px" }}>
//                         <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
//                           {row.policies.map((p, i) => (<Chip key={i} label={p} size="small" sx={{ bgcolor: 'grey.200' }} />))}
//                         </Box>
//                       </TableCell>
//                       {/* <TableCell align="center">
//                         <Tooltip title="Edit"><IconButton onClick={() => handleEditClick(row)}><EditIcon sx={{ color: '#7C3AED' }} /></IconButton></Tooltip>
//                         <Tooltip title="Delete"><IconButton onClick={() => handleDelete(row.policy_allocation_id)}><DeleteIcon color="error" /></IconButton></Tooltip>
//                       </TableCell> */}
//                     </TableRow>
//                   ))
//                 ) : (
//                   <TableRow><TableCell colSpan={3} align="center" sx={{ p: 4 }}>No records found</TableCell></TableRow>
//                 )}
//               </TableBody>
//             </Table>
//           </TableContainer>
//           <TablePagination
//             rowsPerPageOptions={[5, 10, 25]}
//             component="div"
//             count={filtered.length}
//             rowsPerPage={rowsPerPage}
//             page={page}
//             onPageChange={(e, newPage) => setPage(newPage)}
//             onRowsPerPageChange={(e) => { setRowsPerPage(+e.target.value); setPage(0); }}
//           />
//         </CardContent>
//       </Card>
//       <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
//         <DialogTitle>Edit Allocation</DialogTitle>
//         <DialogContent>
//           <FormControl fullWidth sx={{ my: 2 }}>
//             <InputLabel>Employee</InputLabel>
//             <Select
//               multiple value={selectedEmployees}
//               input={<OutlinedInput label="Employee" />} disabled // Always disabled in edit mode
//               // ADDED: Control open state
//               open={employeeSelectOpen}
//               onOpen={() => setEmployeeSelectOpen(true)}
//               onClose={() => setEmployeeSelectOpen(false)}
//               renderValue={(selected) => (
//                 <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
//                   {selected.map((val) => (<Chip key={val} label={employees.find((emp) => emp.id === val)?.name || val} size="small" />))}
//                 </Box>
//               )}
//             >
//               {employees.map((emp) => (<MenuItem key={emp.id} value={emp.id}>{emp.name}</MenuItem>))}
//               {/* ADDED: Sticky close button container */}
//               <Box sx={{ position: 'sticky', bottom: 0, bgcolor: 'background.paper', py: 1, px: 2, borderTop: 1, borderColor: 'divider', display: 'flex', justifyContent: 'flex-end' }}>
//                 <Button onClick={() => setEmployeeSelectOpen(false)} size="small">Close</Button>
//               </Box>
//             </Select>
//           </FormControl>
//           <FormControl fullWidth sx={{ my: 2 }}>
//             <InputLabel>Select Policies</InputLabel>
//             <Select
//               multiple value={selectedPolicies} onChange={handlePolicyChange}
//               input={<OutlinedInput label="Select Policies" />}
//               // ADDED: Control open state
//               open={policySelectOpen}
//               onOpen={() => setPolicySelectOpen(true)}
//               onClose={() => setPolicySelectOpen(false)}
//               renderValue={(selected) => (
//                 <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
//                   {selected.map((id) => (<Chip key={id} label={policyMap.get(id) || id} size="small" />))}
//                 </Box>
//               )}
//             >
//               <MenuItem value="all">
//                 <Checkbox checked={isAllSelected} indeterminate={selectedPolicies.length > 0 && !isAllSelected} />
//                 <ListItemText primary="Select All" />
//               </MenuItem>
//               {policies.map((policy) => {
//                 const isAcknowledged = !!editingId && acknowledgedPolicyIds.includes(policy.id);
//                 return (
//                   <MenuItem key={policy.id} value={policy.id} disabled={isAcknowledged}>
//                     <Checkbox checked={selectedPolicies.includes(policy.id)} disabled={isAcknowledged} />
//                     <ListItemText primary={policy.name} sx={isAcknowledged ? { color: "text.disabled" } : {}} />
//                   </MenuItem>
//                 );
//               })}
//               {/* ADDED: Sticky close button container */}
//               <Box sx={{ position: 'sticky', bottom: 0, bgcolor: 'background.paper', py: 1, px: 2, borderTop: 1, borderColor: 'divider', display: 'flex', justifyContent: 'flex-end' }}>
//                 <Button onClick={() => setPolicySelectOpen(false)} size="small">Close</Button>
//               </Box>
//             </Select>
//           </FormControl>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose}>Cancel</Button>
//           <Button onClick={handleSave} variant="contained" disabled={selectedEmployees.length === 0} sx={{ backgroundColor: '#7C3AED', '&:hover': { backgroundColor: '#6D28D9' } }}>
//             Update
//           </Button>
//         </DialogActions>
//       </Dialog>
//       <Snackbar
//         open={snackbarInfo.open}
//         autoHideDuration={6000}
//         onClose={() => setSnackbarInfo({ ...snackbarInfo, open: false })}
//         anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
//       >
//         <Alert onClose={() => setSnackbarInfo({ ...snackbarInfo, open: false })} severity={snackbarInfo.severity} variant="filled" sx={{ width: "100%" }}>
//           {snackbarInfo.message}
//         </Alert>
//       </Snackbar>
//     </Container>
//   );
// };

// export default PolicyAllocation;










// import { useState, useEffect, useMemo } from "react";
// import axiosInstance from "../../utils/axiosInstance";
// import axios from "axios";
// import {
//   Box,
//   Button,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   OutlinedInput,
//   Chip,
//   TextField,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   TablePagination,
//   Typography,
//   Container,
//   Card,
//   CardContent,
//   Snackbar,
//   Alert,
//   IconButton,
//   InputAdornment,
//   Checkbox,
//   ListItemText,
//   Tooltip,
//   CircularProgress,
// } from "@mui/material";
// import {
//   Search as SearchIcon,
//   Clear as ClearIcon,
//   Edit as EditIcon,
//   Delete as DeleteIcon,
// } from "@mui/icons-material";

// const API_BASE_URL = "https://tdtlworld.com/hrms-backend";

// // Define color constants as per request
// const PRIMARY_COLOR = "#8C257C";
// const SECONDARY_COLOR = "#F58E35";

// const PolicyAllocation = () => {
//   const [employees, setEmployees] = useState([]);
//   const [policies, setPolicies] = useState([]);
//   const [allocations, setAllocations] = useState([]);
//   const [open, setOpen] = useState(false);
//   const [selectedEmployees, setSelectedEmployees] = useState([]);
//   const [selectedPolicies, setSelectedPolicies] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);
//   const [snackbarInfo, setSnackbarInfo] = useState({
//     open: false,
//     message: "",
//     severity: "success",
//   });
//   const [editingId, setEditingId] = useState(null); // null for create, ID for edit
//   const [loading, setLoading] = useState(true);
//   const [acknowledgedPolicyIds, setAcknowledgedPolicyIds] = useState([]);

//   const [employeeSelectOpen, setEmployeeSelectOpen] = useState(false);
//   const [policySelectOpen, setPolicySelectOpen] = useState(false);

//   const policyMap = useMemo(() => {
//     return new Map(policies.map((p) => [p.id, p.name]));
//   }, [policies]);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     setLoading(true);
//     try {
//       const [allocationsRes, employeesRes, policiesRes] = await Promise.all([
//         axios.get(`${API_BASE_URL}/api/policy-allocation/`),
//         axios.get(`${API_BASE_URL}/employee-dropdown/`),
//         axiosInstance.get(`${API_BASE_URL}/policies/`),
//       ]);

//       setEmployees(
//         employeesRes.data.map((emp) => ({ id: emp.emp_id, name: emp.label }))
//       );

//       const allPolicies = policiesRes.data.data.map((policy) => ({
//         id: policy.policy_id,
//         name: policy.title,
//       }));
//       setPolicies(allPolicies);
//       const localPolicyMap = new Map(allPolicies.map((p) => [p.id, p.name]));

//       const processedAllocations = allocationsRes.data.map((alloc) => {
//         const policyIds = alloc.policy_id ? alloc.policy_id.split(",").map((id) => parseInt(id.trim(), 10)) : [];
//         const policyStatuses = alloc.policy_acknowledgement_status ? alloc.policy_acknowledgement_status.split(",").map((s) => s.trim()) : [];

//         const uniquePolicies = new Map();
//         policyIds.forEach((id, index) => {
//           if (isNaN(id)) return;
//           const isAcknowledged = policyStatuses[index] === "Y";
//           const policyName = localPolicyMap.get(id) || "Unknown Policy";

//           if (!uniquePolicies.has(id)) {
//             uniquePolicies.set(id, { id, name: policyName, acknowledged: isAcknowledged });
//           } else if (isAcknowledged) {
//             uniquePolicies.get(id).acknowledged = true;
//           }
//         });

//         const detailedPolicies = Array.from(uniquePolicies.values());
//         return {
//           policy_allocation_id: alloc.policy_allocation_id,
//           id: alloc.emp_id,
//           employeeName: alloc.employee_name,
//           detailedPolicies: detailedPolicies,
//           policyIds: detailedPolicies.map((p) => p.id),
//           policies: detailedPolicies.map((p) => p.name).filter((name) => name !== "Unknown Policy"),
//           allocationDate: alloc.allocation_date,
//         };
//       });

//       const sortedAllocations = processedAllocations.sort(
//         (a, b) => new Date(b.allocationDate) - new Date(a.allocationDate)
//       );

//       setAllocations(sortedAllocations);
//     } catch (err) {
//       console.error("Error fetching data:", err);
//       setSnackbarInfo({ open: true, message: "Error loading data.", severity: "error" });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleClose = () => {
//     setOpen(false);
//     setEditingId(null);
//     setSelectedEmployees([]);
//     setSelectedPolicies([]);
//     setAcknowledgedPolicyIds([]);
//   };
  
//   const handleOpenCreate = () => {
//     setEditingId(null);
//     setSelectedEmployees([]);
//     setSelectedPolicies([]);
//     setAcknowledgedPolicyIds([]);
//     setOpen(true);
//   };

//   // This function is kept for potential future use but is not currently callable from the UI
//   const handleEditClick = (allocation) => {
//     setEditingId(allocation.policy_allocation_id);
//     setSelectedEmployees([allocation.id]);
//     setSelectedPolicies(allocation.policyIds);
//     const acknowledgedIds = allocation.detailedPolicies.filter((p) => p.acknowledged).map((p) => p.id);
//     setAcknowledgedPolicyIds(acknowledgedIds);
//     setOpen(true);
//   };

//   const handlePolicyChange = (e) => {
//     const value = e.target.value;
//     if (value.includes("all")) {
//       const allPolicyIds = policies.map((p) => p.id);
//       const unacknowledgedPolicyIds = allPolicyIds.filter(id => !acknowledgedPolicyIds.includes(id));
//       setSelectedPolicies(selectedPolicies.length === unacknowledgedPolicyIds.length ? [] : unacknowledgedPolicyIds);
//     } else {
//       setSelectedPolicies(value);
//     }
//   };

//   const handleSave = async () => {
//     if (editingId) {
//       // --- UPDATE LOGIC ---
//       try {
//         const originalAllocation = allocations.find((a) => a.policy_allocation_id === editingId);
//         if (!originalAllocation) throw new Error("Original allocation not found.");
        
//         const originalPolicyIds = originalAllocation.policyIds;
//         const newPolicyIds = selectedPolicies;
//         const policies_to_add_ids = newPolicyIds.filter((id) => !originalPolicyIds.includes(id));
//         const policies_to_remove_ids = originalPolicyIds.filter((id) => !newPolicyIds.includes(id) && !acknowledgedPolicyIds.includes(id));

//         if (policies_to_add_ids.length === 0 && policies_to_remove_ids.length === 0) {
//           setSnackbarInfo({ open: true, message: "No changes detected.", severity: "info" });
//           handleClose();
//           return;
//         }

//         const policies_to_add_names = policies_to_add_ids.map(id => policyMap.get(id));
//         const policies_to_remove_names = policies_to_remove_ids.map(id => policyMap.get(id));

//         const payload = {
//           employee_id: originalAllocation.id,
//           policies_to_add: policies_to_add_names,
//           policies_to_remove: policies_to_remove_names,
//         };
        
//         await axios.patch(`${API_BASE_URL}/api/policy-allocation/${editingId}/`, payload);
//         setSnackbarInfo({ open: true, message: "Policy allocation updated successfully.", severity: "success" });
//         fetchData();
//         handleClose();
//       } catch (err) {
//         console.error("Failed to update policy allocation:", err);
//         setSnackbarInfo({ open: true, message: err.response?.data?.detail || "Failed to update allocation.", severity: "error" });
//       }
//     } else {
//       // --- CREATE LOGIC ---
//        if (selectedEmployees.length === 0 || selectedPolicies.length === 0) {
//           setSnackbarInfo({ open: true, message: "Please select at least one employee and one policy.", severity: "warning" });
//           return;
//        }
//        try {
//         const payload = {
//           employee_ids: selectedEmployees,
//           policy_ids: selectedPolicies,
//         };
//         await axios.post(`${API_BASE_URL}/api/policy-allocation/`, payload);
//         setSnackbarInfo({ open: true, message: "Policy allocation created successfully.", severity: "success" });
//         fetchData();
//         handleClose();
//        } catch (err) {
//          console.error("Failed to create policy allocation:", err);
//          setSnackbarInfo({ open: true, message: err.response?.data?.detail || "Failed to create allocation.", severity: "error" });
//        }
//     }
//   };

//   // This function is kept for potential future use but is not currently callable from the UI
//   const handleDelete = async (allocationId) => {
//     if (window.confirm("Are you sure you want to delete this allocation?")) {
//       try {
//         await axios.delete(`${API_BASE_URL}/api/policy-allocation/${allocationId}/`);
//         setSnackbarInfo({ open: true, message: "Policy allocation deleted successfully.", severity: "success" });
//         fetchData();
//       } catch (err) {
//         console.error("Failed to delete policy allocation:", err);
//         setSnackbarInfo({ open: true, message: "Failed to delete allocation.", severity: "error" });
//       }
//     }
//   };

//   const filtered = allocations.filter(
//     (a) => a.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) || a.policies.some((p) => p.toLowerCase().includes(searchTerm.toLowerCase()))
//   );

//   const paginated = filtered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
//   const isAllSelected = policies.length > 0 && selectedPolicies.length === policies.filter(p => !acknowledgedPolicyIds.includes(p.id)).length;

//   return (
//     <Container maxWidth="lg" sx={{ py: 2 }}>
//       <Card elevation={3} sx={{ borderRadius: 2 }}>
//         <CardContent>
//           <Typography variant="h5" gutterBottom fontWeight="600">
//             Policy Allocation Management
//           </Typography>
//           <Box
//             sx={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//               mb: 2,
//               flexWrap: "wrap",
//               gap: 2,
//             }}
//           >
//             {/* <Button
//               variant="contained"
//               onClick={handleOpenCreate}
//               sx={{ backgroundColor: PRIMARY_COLOR, '&:hover': { backgroundColor: '#7a1f6a' } }}
//             >
//               Create Allocation
//             </Button> */}
//             <TextField
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               placeholder="Search..."
//               size="small"
//               sx={{ minWidth: 300 }}
//               InputProps={{
//                 startAdornment: (<InputAdornment position="start"><SearchIcon /></InputAdornment>),
//                 endAdornment: searchTerm && (<InputAdornment position="end"><IconButton size="small" onClick={() => setSearchTerm("")}><ClearIcon /></IconButton></InputAdornment>),
//               }}
//             />
//           </Box>
//           <TableContainer component={Paper} variant="outlined">
//             <Table>
//               <TableHead sx={{ backgroundColor: "#f9fafb" }}>
//                 <TableRow>
//                   <TableCell sx={{ fontWeight: "bold" }}>SR. NO.</TableCell>
//                   <TableCell sx={{ fontWeight: "bold" }}>Employee</TableCell>
//                   <TableCell sx={{ fontWeight: "bold" }}>Policies</TableCell>
//                   {/* Action column header removed */}
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {loading ? (
//                   <TableRow><TableCell colSpan={3} align="center" sx={{ p: 4 }}><CircularProgress sx={{ color: PRIMARY_COLOR }} /></TableCell></TableRow>
//                 ) : paginated.length > 0 ? (
//                   paginated.map((row, index) => (
//                     <TableRow key={row.policy_allocation_id} hover>
//                       <TableCell>{page * rowsPerPage + index + 1}</TableCell>
//                       <TableCell>{row.employeeName}</TableCell>
//                       <TableCell sx={{ maxWidth: "400px" }}>
//                         <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
//                           {row.policies.map((p, i) => (<Chip key={i} label={p} size="small" sx={{ bgcolor: 'grey.200' }} />))}
//                         </Box>
//                       </TableCell>
//                       {/* Action column cell removed */}
//                     </TableRow>
//                   ))
//                 ) : (
//                   <TableRow><TableCell colSpan={3} align="center" sx={{ p: 4 }}>No records found</TableCell></TableRow>
//                 )}
//               </TableBody>
//             </Table>
//           </TableContainer>
//           <TablePagination
//             rowsPerPageOptions={[5, 10, 25]}
//             component="div"
//             count={filtered.length}
//             rowsPerPage={rowsPerPage}
//             page={page}
//             onPageChange={(e, newPage) => setPage(newPage)}
//             onRowsPerPageChange={(e) => { setRowsPerPage(+e.target.value); setPage(0); }}
//           />
//         </CardContent>
//       </Card>
//       <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
//         <DialogTitle>{editingId ? "Edit Allocation" : "Create New Allocation"}</DialogTitle>
//         <DialogContent>
//           <FormControl fullWidth sx={{ my: 2 }}>
//             <InputLabel>Employee(s)</InputLabel>
//             <Select
//               multiple 
//               value={selectedEmployees}
//               onChange={(e) => setSelectedEmployees(typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value)}
//               input={<OutlinedInput label="Employee(s)" />} 
//               disabled={!!editingId}
//               open={employeeSelectOpen}
//               onOpen={() => setEmployeeSelectOpen(true)}
//               onClose={() => setEmployeeSelectOpen(false)}
//               renderValue={(selected) => (
//                 <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
//                   {selected.map((val) => (<Chip key={val} label={employees.find((emp) => emp.id === val)?.name || val} size="small" />))}
//                 </Box>
//               )}
//             >
//               {employees.map((emp) => (<MenuItem key={emp.id} value={emp.id}>{emp.name}</MenuItem>))}
//               <Box sx={{ position: 'sticky', bottom: 0, bgcolor: 'background.paper', py: 1, px: 2, borderTop: 1, borderColor: 'divider', display: 'flex', justifyContent: 'flex-end' }}>
//                 <Button onClick={() => setEmployeeSelectOpen(false)} size="small">Close</Button>
//               </Box>
//             </Select>
//           </FormControl>
//           <FormControl fullWidth sx={{ my: 2 }}>
//             <InputLabel>Select Policies</InputLabel>
//             <Select
//               multiple value={selectedPolicies} onChange={handlePolicyChange}
//               input={<OutlinedInput label="Select Policies" />}
//               open={policySelectOpen}
//               onOpen={() => setPolicySelectOpen(true)}
//               onClose={() => setPolicySelectOpen(false)}
//               renderValue={(selected) => (
//                 <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
//                   {selected.map((id) => (<Chip key={id} label={policyMap.get(id) || id} size="small" />))}
//                 </Box>
//               )}
//             >
//               <MenuItem value="all">
//                 <Checkbox checked={isAllSelected} indeterminate={selectedPolicies.length > 0 && !isAllSelected} />
//                 <ListItemText primary="Select All" />
//               </MenuItem>
//               {policies.map((policy) => {
//                 const isAcknowledged = !!editingId && acknowledgedPolicyIds.includes(policy.id);
//                 return (
//                   <MenuItem key={policy.id} value={policy.id} disabled={isAcknowledged}>
//                     <Checkbox checked={selectedPolicies.includes(policy.id)} disabled={isAcknowledged} />
//                     <ListItemText primary={policy.name} sx={isAcknowledged ? { color: "text.disabled" } : {}} />
//                   </MenuItem>
//                 );
//               })}
//               <Box sx={{ position: 'sticky', bottom: 0, bgcolor: 'background.paper', py: 1, px: 2, borderTop: 1, borderColor: 'divider', display: 'flex', justifyContent: 'flex-end' }}>
//                 <Button onClick={() => setPolicySelectOpen(false)} size="small">Close</Button>
//               </Box>
//             </Select>
//           </FormControl>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose}>Cancel</Button>
//           <Button 
//             onClick={handleSave} 
//             variant="contained" 
//             disabled={selectedEmployees.length === 0 || selectedPolicies.length === 0}
//             sx={{ backgroundColor: PRIMARY_COLOR, '&:hover': { backgroundColor: '#7a1f6a' } }}
//           >
//             {editingId ? "Update" : "Create"}
//           </Button>
//         </DialogActions>
//       </Dialog>
//       <Snackbar
//         open={snackbarInfo.open}
//         autoHideDuration={6000}
//         onClose={() => setSnackbarInfo({ ...snackbarInfo, open: false })}
//         anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
//       >
//         <Alert onClose={() => setSnackbarInfo({ ...snackbarInfo, open: false })} severity={snackbarInfo.severity} variant="filled" sx={{ width: "100%" }}>
//           {snackbarInfo.message}
//         </Alert>
//       </Snackbar>
//     </Container>
//   );
// };

// export default PolicyAllocation;





















// import { useState, useEffect, useMemo } from "react";
// import axiosInstance from "../../utils/axiosInstance";
// import axios from "axios";
// import {
//   Box,
//   Button,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   OutlinedInput,
//   Chip,
//   TextField,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   TablePagination,
//   Typography,
//   Container,
//   Card,
//   CardContent,
//   Snackbar,
//   Alert,
//   IconButton,
//   InputAdornment,
//   Checkbox,
//   ListItemText,
//   CircularProgress,
// } from "@mui/material";
// import {
//   Search as SearchIcon,
//   Clear as ClearIcon,
// } from "@mui/icons-material";

// const API_BASE_URL = "https://tdtlworld.com/hrms-backend";

// // Define color constants as per request
// const PRIMARY_COLOR = "#8C257C";
// const SECONDARY_COLOR = "#F58E35";

// const PolicyAllocation = () => {
//   const [employees, setEmployees] = useState([]);
//   const [policies, setPolicies] = useState([]);
//   const [allocations, setAllocations] = useState([]);
//   const [open, setOpen] = useState(false);
//   const [selectedEmployees, setSelectedEmployees] = useState([]);
//   const [selectedPolicies, setSelectedPolicies] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);
//   const [snackbarInfo, setSnackbarInfo] = useState({
//     open: false,
//     message: "",
//     severity: "success",
//   });
//   const [editingId, setEditingId] = useState(null); // null for create, ID for edit
//   const [loading, setLoading] = useState(true);
//   const [acknowledgedPolicyIds, setAcknowledgedPolicyIds] = useState([]);

//   const [employeeSelectOpen, setEmployeeSelectOpen] = useState(false);
//   const [policySelectOpen, setPolicySelectOpen] = useState(false);

//   const policyMap = useMemo(() => {
//     return new Map(policies.map((p) => [p.id, p.name]));
//   }, [policies]);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     setLoading(true);
//     try {
//       const [allocationsRes, employeesRes, policiesRes] = await Promise.all([
//         axios.get(`${API_BASE_URL}/api/policy-allocation/`),
//         axios.get(`${API_BASE_URL}/employee-dropdown/`),
//         axiosInstance.get(`${API_BASE_URL}/policies/`),
//       ]);

//       setEmployees(
//         employeesRes.data.map((emp) => ({ id: emp.emp_id, name: emp.label }))
//       );

//       const allPolicies = policiesRes.data.data.map((policy) => ({
//         id: policy.policy_id,
//         name: policy.title,
//       }));
//       setPolicies(allPolicies);
//       const localPolicyMap = new Map(allPolicies.map((p) => [p.id, p.name]));

//       const processedAllocations = allocationsRes.data.map((alloc) => {
//         const policyIds = alloc.policy_id ? alloc.policy_id.split(",").map((id) => parseInt(id.trim(), 10)) : [];
//         const policyStatuses = alloc.policy_acknowledgement_status ? alloc.policy_acknowledgement_status.split(",").map((s) => s.trim()) : [];

//         const uniquePolicies = new Map();
//         policyIds.forEach((id, index) => {
//           if (isNaN(id)) return;
//           const isAcknowledged = policyStatuses[index] === "Y";
//           const policyName = localPolicyMap.get(id) || "Unknown Policy";

//           if (!uniquePolicies.has(id)) {
//             uniquePolicies.set(id, { id, name: policyName, acknowledged: isAcknowledged });
//           } else if (isAcknowledged) {
//             uniquePolicies.get(id).acknowledged = true;
//           }
//         });

//         const detailedPolicies = Array.from(uniquePolicies.values());
//         return {
//           policy_allocation_id: alloc.policy_allocation_id,
//           id: alloc.emp_id,
//           employeeName: alloc.employee_name,
//           detailedPolicies: detailedPolicies,
//           policyIds: detailedPolicies.map((p) => p.id),
//           policies: detailedPolicies.map((p) => p.name).filter((name) => name !== "Unknown Policy"),
//           allocationDate: alloc.allocation_date,
//         };
//       });

//       const sortedAllocations = processedAllocations.sort(
//         (a, b) => new Date(b.allocationDate) - new Date(a.allocationDate)
//       );

//       setAllocations(sortedAllocations);
//     } catch (err) {
//       console.error("Error fetching data:", err);
//       setSnackbarInfo({ open: true, message: "Error loading data.", severity: "error" });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleClose = () => {
//     setOpen(false);
//     setEditingId(null);
//     setSelectedEmployees([]);
//     setSelectedPolicies([]);
//     setAcknowledgedPolicyIds([]);
//   };
  
//   const handleOpenCreate = () => {
//     setEditingId(null);
//     setSelectedEmployees([]);
//     setSelectedPolicies([]);
//     setAcknowledgedPolicyIds([]);
//     setOpen(true);
//   };

//   const handlePolicyChange = (e) => {
//     const value = e.target.value;
//     if (value.includes("all")) {
//       const allPolicyIds = policies.map((p) => p.id);
//       const unacknowledgedPolicyIds = allPolicyIds.filter(id => !acknowledgedPolicyIds.includes(id));
//       setSelectedPolicies(selectedPolicies.length === unacknowledgedPolicyIds.length ? [] : unacknowledgedPolicyIds);
//     } else {
//       setSelectedPolicies(value);
//     }
//   };

//   const handleSave = async () => {
//     if (editingId) {
//       // --- UPDATE LOGIC ---
//       try {
//         const originalAllocation = allocations.find((a) => a.policy_allocation_id === editingId);
//         if (!originalAllocation) throw new Error("Original allocation not found.");
        
//         const originalPolicyIds = originalAllocation.policyIds;
//         const newPolicyIds = selectedPolicies;
//         const policies_to_add_ids = newPolicyIds.filter((id) => !originalPolicyIds.includes(id));
//         const policies_to_remove_ids = originalPolicyIds.filter((id) => !newPolicyIds.includes(id) && !acknowledgedPolicyIds.includes(id));

//         if (policies_to_add_ids.length === 0 && policies_to_remove_ids.length === 0) {
//           setSnackbarInfo({ open: true, message: "No changes detected.", severity: "info" });
//           handleClose();
//           return;
//         }

//         const policies_to_add_names = policies_to_add_ids.map(id => policyMap.get(id));
//         const policies_to_remove_names = policies_to_remove_ids.map(id => policyMap.get(id));

//         const payload = {
//           employee_id: originalAllocation.id,
//           policies_to_add: policies_to_add_names,
//           policies_to_remove: policies_to_remove_names,
//         };
        
//         await axios.patch(`${API_BASE_URL}/api/policy-allocation/${editingId}/`, payload);
//         setSnackbarInfo({ open: true, message: "Policy allocation updated successfully.", severity: "success" });
//         fetchData();
//         handleClose();
//       } catch (err) {
//         console.error("Failed to update policy allocation:", err);
//         setSnackbarInfo({ open: true, message: err.response?.data?.detail || "Failed to update allocation.", severity: "error" });
//       }
//     } else {
//       // --- CREATE LOGIC ---
//        if (selectedEmployees.length === 0 || selectedPolicies.length === 0) {
//           setSnackbarInfo({ open: true, message: "Please select at least one employee and one policy.", severity: "warning" });
//           return;
//        }
//        try {
//         const payload = {
//           employee_ids: selectedEmployees,
//           policy_ids: selectedPolicies,
//         };
//         await axios.post(`${API_BASE_URL}/api/policy-allocation/`, payload);
//         setSnackbarInfo({ open: true, message: "Policy allocation created successfully.", severity: "success" });
//         fetchData();
//         handleClose();
//        } catch (err) {
//          console.error("Failed to create policy allocation:", err);
//          setSnackbarInfo({ open: true, message: err.response?.data?.detail || "Failed to create allocation.", severity: "error" });
//        }
//     }
//   };

//   const filtered = allocations.filter(
//     (a) => a.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) || a.policies.some((p) => p.toLowerCase().includes(searchTerm.toLowerCase()))
//   );

//   const paginated = filtered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
//   const isAllSelected = policies.length > 0 && selectedPolicies.length === policies.filter(p => !acknowledgedPolicyIds.includes(p.id)).length;

//   return (
//     <Container maxWidth="lg" sx={{ py: 2 }}>
//       <Card elevation={3} sx={{ borderRadius: 2 }}>
//         <CardContent>
//           <Typography variant="h5" gutterBottom fontWeight="600" sx={{ color: PRIMARY_COLOR }}>
//             Policy Allocation Management
//           </Typography>
//           <Box
//             sx={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//               mb: 2,
//               flexWrap: "wrap",
//               gap: 2,
//             }}
//           >
//             {/* <Button
//               variant="contained"
//               onClick={handleOpenCreate}
//               sx={{ backgroundColor: PRIMARY_COLOR, '&:hover': { backgroundColor: '#7a1f6a' } }}
//             >
//               Create Allocation
//             </Button> */}
//             <TextField
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               placeholder="Search..."
//               size="small"
//               sx={{ 
//                 minWidth: 300,
//                 '& .MuiOutlinedInput-root': {
//                   '&.Mui-focused fieldset': {
//                     borderColor: PRIMARY_COLOR,
//                   },
//                 },
//               }}
//               InputProps={{
//                 startAdornment: (<InputAdornment position="start"><SearchIcon /></InputAdornment>),
//                 endAdornment: searchTerm && (<InputAdornment position="end"><IconButton size="small" onClick={() => setSearchTerm("")}><ClearIcon /></IconButton></InputAdornment>),
//               }}
//             />
//           </Box>
//           <TableContainer component={Paper} variant="outlined">
//             <Table>
//               <TableHead sx={{ backgroundColor: PRIMARY_COLOR }}>
//                 <TableRow>
//                   <TableCell sx={{ fontWeight: "bold", color: 'white' }}>SR. NO.</TableCell>
//                   <TableCell sx={{ fontWeight: "bold", color: 'white' }}>Employee</TableCell>
//                   <TableCell sx={{ fontWeight: "bold", color: 'white' }}>Policies</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {loading ? (
//                   <TableRow><TableCell colSpan={3} align="center" sx={{ p: 4 }}><CircularProgress sx={{ color: PRIMARY_COLOR }} /></TableCell></TableRow>
//                 ) : paginated.length > 0 ? (
//                   paginated.map((row, index) => (
//                     <TableRow key={row.policy_allocation_id} hover>
//                       <TableCell>{page * rowsPerPage + index + 1}</TableCell>
//                       <TableCell>{row.employeeName}</TableCell>
//                       <TableCell sx={{ maxWidth: "400px" }}>
//                         <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
//                           {row.policies.map((p, i) => (<Chip key={i} label={p} size="small" sx={{ bgcolor: 'grey.200' }} />))}
//                         </Box>
//                       </TableCell>
//                     </TableRow>
//                   ))
//                 ) : (
//                   <TableRow><TableCell colSpan={3} align="center" sx={{ p: 4 }}>No records found</TableCell></TableRow>
//                 )}
//               </TableBody>
//             </Table>
//           </TableContainer>
//           <TablePagination
//             rowsPerPageOptions={[5, 10, 25]}
//             component="div"
//             count={filtered.length}
//             rowsPerPage={rowsPerPage}
//             page={page}
//             onPageChange={(e, newPage) => setPage(newPage)}
//             onRowsPerPageChange={(e) => { setRowsPerPage(+e.target.value); setPage(0); }}
//             sx={{
//                 '& .Mui-selected': {
//                   backgroundColor: `${PRIMARY_COLOR} !important`,
//                   color: '#fff',
//                 },
//                 '& .MuiPaginationItem-root:hover': {
//                     backgroundColor: 'rgba(140, 37, 124, 0.08)',
//                 }
//             }}
//           />
//         </CardContent>
//       </Card>
//       <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
//         <DialogTitle sx={{ color: PRIMARY_COLOR }}>{editingId ? "Edit Allocation" : "Create New Allocation"}</DialogTitle>
//         <DialogContent>
//           <FormControl fullWidth sx={{ my: 2 }}>
//             <InputLabel>Employee(s)</InputLabel>
//             <Select
//               multiple 
//               value={selectedEmployees}
//               onChange={(e) => setSelectedEmployees(typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value)}
//               input={<OutlinedInput label="Employee(s)" />} 
//               disabled={!!editingId}
//               open={employeeSelectOpen}
//               onOpen={() => setEmployeeSelectOpen(true)}
//               onClose={() => setEmployeeSelectOpen(false)}
//               renderValue={(selected) => (
//                 <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
//                   {selected.map((val) => (<Chip key={val} label={employees.find((emp) => emp.id === val)?.name || val} size="small" sx={{ backgroundColor: '#fff0e6', color: SECONDARY_COLOR, border: `1px solid ${SECONDARY_COLOR}` }} />))}
//                 </Box>
//               )}
//             >
//               {employees.map((emp) => (<MenuItem key={emp.id} value={emp.id}>{emp.name}</MenuItem>))}
//               <Box sx={{ position: 'sticky', bottom: 0, bgcolor: 'background.paper', py: 1, px: 2, borderTop: 1, borderColor: 'divider', display: 'flex', justifyContent: 'flex-end' }}>
//                 <Button onClick={() => setEmployeeSelectOpen(false)} size="small">Close</Button>
//               </Box>
//             </Select>
//           </FormControl>
//           <FormControl fullWidth sx={{ my: 2 }}>
//             <InputLabel>Select Policies</InputLabel>
//             <Select
//               multiple value={selectedPolicies} onChange={handlePolicyChange}
//               input={<OutlinedInput label="Select Policies" />}
//               open={policySelectOpen}
//               onOpen={() => setPolicySelectOpen(true)}
//               onClose={() => setPolicySelectOpen(false)}
//               renderValue={(selected) => (
//                 <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
//                   {selected.map((id) => (<Chip key={id} label={policyMap.get(id) || id} size="small" sx={{ backgroundColor: '#fff0e6', color: SECONDARY_COLOR, border: `1px solid ${SECONDARY_COLOR}` }} />))}
//                 </Box>
//               )}
//             >
//               <MenuItem value="all">
//                 <Checkbox checked={isAllSelected} indeterminate={selectedPolicies.length > 0 && !isAllSelected} sx={{ '&.Mui-checked': { color: PRIMARY_COLOR } }} />
//                 <ListItemText primary="Select All" />
//               </MenuItem>
//               {policies.map((policy) => {
//                 const isAcknowledged = !!editingId && acknowledgedPolicyIds.includes(policy.id);
//                 return (
//                   <MenuItem key={policy.id} value={policy.id} disabled={isAcknowledged}>
//                     <Checkbox checked={selectedPolicies.includes(policy.id)} disabled={isAcknowledged} sx={{ '&.Mui-checked': { color: PRIMARY_COLOR } }} />
//                     <ListItemText primary={policy.name} sx={isAcknowledged ? { color: "text.disabled" } : {}} />
//                   </MenuItem>
//                 );
//               })}
//               <Box sx={{ position: 'sticky', bottom: 0, bgcolor: 'background.paper', py: 1, px: 2, borderTop: 1, borderColor: 'divider', display: 'flex', justifyContent: 'flex-end' }}>
//                 <Button onClick={() => setPolicySelectOpen(false)} size="small">Close</Button>
//               </Box>
//             </Select>
//           </FormControl>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose} sx={{ color: SECONDARY_COLOR, borderColor: SECONDARY_COLOR, '&:hover': { borderColor: '#e07e2b', backgroundColor: 'rgba(245, 142, 53, 0.08)' } }} variant="outlined">Cancel</Button>
//           <Button 
//             onClick={handleSave} 
//             variant="contained" 
//             disabled={selectedEmployees.length === 0 || selectedPolicies.length === 0}
//             sx={{ backgroundColor: PRIMARY_COLOR, '&:hover': { backgroundColor: '#7a1f6a' } }}
//           >
//             {editingId ? "Update" : "Create"}
//           </Button>
//         </DialogActions>
//       </Dialog>
//       <Snackbar
//         open={snackbarInfo.open}
//         autoHideDuration={6000}
//         onClose={() => setSnackbarInfo({ ...snackbarInfo, open: false })}
//         anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
//       >
//         <Alert onClose={() => setSnackbarInfo({ ...snackbarInfo, open: false })} severity={snackbarInfo.severity} variant="filled" sx={{ width: "100%" }}>
//           {snackbarInfo.message}
//         </Alert>
//       </Snackbar>
//     </Container>
//   );
// };

// export default PolicyAllocation;













// import { useState, useEffect, useMemo } from "react";
// import axiosInstance from "../../utils/axiosInstance";
// import axios from "axios";
// import {
//   Box,
//   Button,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   OutlinedInput,
//   Chip,
//   TextField,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   TablePagination,
//   Typography,
//   Container,
//   Card,
//   CardContent,
//   Snackbar,
//   Alert,
//   IconButton,
//   InputAdornment,
//   Checkbox,
//   ListItemText,
//   CircularProgress,
// } from "@mui/material";
// import {
//   Search as SearchIcon,
//   Clear as ClearIcon,
// } from "@mui/icons-material";

// const API_BASE_URL = "https://tdtlworld.com/hrms-backend";

// // Define color constants as per request
// const PRIMARY_COLOR = "#8C257C";
// const SECONDARY_COLOR = "#F58E35";

// const PolicyAllocation = () => {
//   const [employees, setEmployees] = useState([]);
//   const [policies, setPolicies] = useState([]);
//   const [allocations, setAllocations] = useState([]);
//   const [open, setOpen] = useState(false);
//   const [selectedEmployees, setSelectedEmployees] = useState([]);
//   const [selectedPolicies, setSelectedPolicies] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);
//   const [snackbarInfo, setSnackbarInfo] = useState({
//     open: false,
//     message: "",
//     severity: "success",
//   });
//   const [editingId, setEditingId] = useState(null); // null for create, ID for edit
//   const [loading, setLoading] = useState(true);
//   const [acknowledgedPolicyIds, setAcknowledgedPolicyIds] = useState([]);

//   const [employeeSelectOpen, setEmployeeSelectOpen] = useState(false);
//   const [policySelectOpen, setPolicySelectOpen] = useState(false);

//   const policyMap = useMemo(() => {
//     return new Map(policies.map((p) => [p.id, p.name]));
//   }, [policies]);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     setLoading(true);
//     try {
//       const [allocationsRes, employeesRes, policiesRes] = await Promise.all([
//         axios.get(`${API_BASE_URL}/api/policy-allocation/`),
//         axios.get(`${API_BASE_URL}/employee-dropdown/`),
//         axiosInstance.get(`${API_BASE_URL}/policies/`),
//       ]);

//       setEmployees(
//         employeesRes.data.map((emp) => ({ id: emp.emp_id, name: emp.label }))
//       );

//       const allPolicies = policiesRes.data.data.map((policy) => ({
//         id: policy.policy_id,
//         name: policy.title,
//       }));
//       setPolicies(allPolicies);
//       const localPolicyMap = new Map(allPolicies.map((p) => [p.id, p.name]));

//       const processedAllocations = allocationsRes.data.map((alloc) => {
//         const policyIds = alloc.policy_id ? alloc.policy_id.split(",").map((id) => parseInt(id.trim(), 10)) : [];
//         const policyStatuses = alloc.policy_acknowledgement_status ? alloc.policy_acknowledgement_status.split(",").map((s) => s.trim()) : [];

//         const uniquePolicies = new Map();
//         policyIds.forEach((id, index) => {
//           if (isNaN(id)) return;
//           const isAcknowledged = policyStatuses[index] === "Y";
//           const policyName = localPolicyMap.get(id) || "Unknown Policy";

//           if (!uniquePolicies.has(id)) {
//             uniquePolicies.set(id, { id, name: policyName, acknowledged: isAcknowledged });
//           } else if (isAcknowledged) {
//             uniquePolicies.get(id).acknowledged = true;
//           }
//         });

//         const detailedPolicies = Array.from(uniquePolicies.values());
//         return {
//           policy_allocation_id: alloc.policy_allocation_id,
//           id: alloc.emp_id,
//           employeeName: alloc.employee_name,
//           detailedPolicies: detailedPolicies,
//           policyIds: detailedPolicies.map((p) => p.id),
//           policies: detailedPolicies.map((p) => p.name).filter((name) => name !== "Unknown Policy"),
//           allocationDate: alloc.allocation_date,
//         };
//       });

//       const sortedAllocations = processedAllocations.sort(
//         (a, b) => new Date(b.allocationDate) - new Date(a.allocationDate)
//       );

//       setAllocations(sortedAllocations);
//     } catch (err) {
//       console.error("Error fetching data:", err);
//       setSnackbarInfo({ open: true, message: "Error loading data.", severity: "error" });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleClose = () => {
//     setOpen(false);
//     setEditingId(null);
//     setSelectedEmployees([]);
//     setSelectedPolicies([]);
//     setAcknowledgedPolicyIds([]);
//   };
 
//   const handleOpenCreate = () => {
//     setEditingId(null);
//     setSelectedEmployees([]);
//     setSelectedPolicies([]);
//     setAcknowledgedPolicyIds([]);
//     setOpen(true);
//   };

//   const handlePolicyChange = (e) => {
//     const value = e.target.value;
//     if (value.includes("all")) {
//       const allPolicyIds = policies.map((p) => p.id);
//       const unacknowledgedPolicyIds = allPolicyIds.filter(id => !acknowledgedPolicyIds.includes(id));
//       setSelectedPolicies(selectedPolicies.length === unacknowledgedPolicyIds.length ? [] : unacknowledgedPolicyIds);
//     } else {
//       setSelectedPolicies(value);
//     }
//   };

//   const handleSave = async () => {
//     if (editingId) {
//       // --- UPDATE LOGIC ---
//       try {
//         const originalAllocation = allocations.find((a) => a.policy_allocation_id === editingId);
//         if (!originalAllocation) throw new Error("Original allocation not found.");
       
//         const originalPolicyIds = originalAllocation.policyIds;
//         const newPolicyIds = selectedPolicies;
//         const policies_to_add_ids = newPolicyIds.filter((id) => !originalPolicyIds.includes(id));
//         const policies_to_remove_ids = originalPolicyIds.filter((id) => !newPolicyIds.includes(id) && !acknowledgedPolicyIds.includes(id));

//         if (policies_to_add_ids.length === 0 && policies_to_remove_ids.length === 0) {
//           setSnackbarInfo({ open: true, message: "No changes detected.", severity: "info" });
//           handleClose();
//           return;
//         }

//         const policies_to_add_names = policies_to_add_ids.map(id => policyMap.get(id));
//         const policies_to_remove_names = policies_to_remove_ids.map(id => policyMap.get(id));

//         const payload = {
//           employee_id: originalAllocation.id,
//           policies_to_add: policies_to_add_names,
//           policies_to_remove: policies_to_remove_names,
//         };
       
//         await axios.patch(`${API_BASE_URL}/api/policy-allocation/${editingId}/`, payload);
//         setSnackbarInfo({ open: true, message: "Policy allocation updated successfully.", severity: "success" });
//         fetchData();
//         handleClose();
//       } catch (err) {
//         console.error("Failed to update policy allocation:", err);
//         setSnackbarInfo({ open: true, message: err.response?.data?.detail || "Failed to update allocation.", severity: "error" });
//       }
//     } else {
//       // --- CREATE LOGIC ---
//        if (selectedEmployees.length === 0 || selectedPolicies.length === 0) {
//           setSnackbarInfo({ open: true, message: "Please select at least one employee and one policy.", severity: "warning" });
//           return;
//        }
//        try {
//         const payload = {
//           employee_ids: selectedEmployees,
//           policy_ids: selectedPolicies,
//         };
//         await axios.post(`${API_BASE_URL}/api/policy-allocation/`, payload);
//         setSnackbarInfo({ open: true, message: "Policy allocation created successfully.", severity: "success" });
//         fetchData();
//         handleClose();
//        } catch (err) {
//          console.error("Failed to create policy allocation:", err);
//          setSnackbarInfo({ open: true, message: err.response?.data?.detail || "Failed to create allocation.", severity: "error" });
//        }
//     }
//   };

//   const filtered = allocations.filter(
//     (a) => a.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) || a.policies.some((p) => p.toLowerCase().includes(searchTerm.toLowerCase()))
//   );

//   const paginated = filtered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
//   const isAllSelected = policies.length > 0 && selectedPolicies.length === policies.filter(p => !acknowledgedPolicyIds.includes(p.id)).length;

//   return (
//     <Container maxWidth="lg" sx={{ py: 2 }}>
//       <Card elevation={3} sx={{ borderRadius: 2 }}>
//         <CardContent>
//           <Typography variant="h5" gutterBottom fontWeight="600" sx={{ color: PRIMARY_COLOR }}>
//             Policy Allocation Management
//           </Typography>
//           <Box
//             sx={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//               mb: 2,
//               flexWrap: "wrap",
//               gap: 2,
//             }}
//           >
//             <TextField
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               placeholder="Search..."
//               size="small"
//               sx={{
//                 minWidth: 300,
//                 '& .MuiOutlinedInput-root': {
//                   '&.Mui-focused fieldset': {
//                     borderColor: PRIMARY_COLOR,
//                   },
//                 },
//               }}
//               InputProps={{
//                 startAdornment: (<InputAdornment position="start"><SearchIcon /></InputAdornment>),
//                 endAdornment: searchTerm && (<InputAdornment position="end"><IconButton size="small" onClick={() => setSearchTerm("")}><ClearIcon /></IconButton></InputAdornment>),
//               }}
//             />
//           </Box>
//           <TableContainer component={Paper} variant="outlined">
//             <Table>
//               <TableHead sx={{ backgroundColor: PRIMARY_COLOR }}>
//                 <TableRow>
//                   <TableCell sx={{ fontWeight: "bold", color: 'white' }}>SR. NO.</TableCell>
//                   <TableCell sx={{ fontWeight: "bold", color: 'white' }}>Employee</TableCell>
//                   <TableCell sx={{ fontWeight: "bold", color: 'white' }}>Policies</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {loading ? (
//                   <TableRow><TableCell colSpan={3} align="center" sx={{ p: 4 }}><CircularProgress sx={{ color: PRIMARY_COLOR }} /></TableCell></TableRow>
//                 ) : paginated.length > 0 ? (
//                   paginated.map((row, index) => (
//                     <TableRow key={row.policy_allocation_id} hover>
//                       <TableCell>{page * rowsPerPage + index + 1}</TableCell>
//                       <TableCell>{row.employeeName}</TableCell>
//                       <TableCell sx={{ maxWidth: "400px" }}>
//                         <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
//                           {row.policies.map((p, i) => (<Chip key={i} label={p} size="small" sx={{ bgcolor: 'grey.200' }} />))}
//                         </Box>
//                       </TableCell>
//                     </TableRow>
//                   ))
//                 ) : (
//                   <TableRow><TableCell colSpan={3} align="center" sx={{ p: 4 }}>No records found</TableCell></TableRow>
//                 )}
//               </TableBody>
//             </Table>
//           </TableContainer>
//           <Box sx={{
//               display: 'flex',
//               justifyContent: 'space-between',
//               alignItems: 'center',
//               flexWrap: 'wrap',
//               py: 2,
//               px: { xs: 0, sm: 2 },
//               gap: 2,
//               flexDirection: { xs: 'column', sm: 'row' }
//           }}>
//               <Typography variant="body2" color="text.secondary">
//                   {`Showing ${filtered.length > 0 ? page * rowsPerPage + 1 : 0} to ${Math.min((page + 1) * rowsPerPage, filtered.length)} of ${filtered.length} results`}
//               </Typography>
//               <TablePagination
//                   rowsPerPageOptions={[5, 10, 15, 25]}
//                   component="div"
//                   count={filtered.length}
//                   rowsPerPage={rowsPerPage}
//                   page={page}
//                   onPageChange={(e, newPage) => setPage(newPage)}
//                   onRowsPerPageChange={(e) => {
//                       setRowsPerPage(parseInt(e.target.value, 10));
//                       setPage(0);
//                   }}
//                   sx={{
//                       p: 0,
//                       '& .MuiIconButton-root': {
//                           color: PRIMARY_COLOR
//                       },
//                       '& .MuiIconButton-root.Mui-disabled': {
//                           color: 'rgba(0, 0, 0, 0.26)'
//                       }
//                   }}
//               />
//           </Box>
//         </CardContent>
//       </Card>
//       <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
//         <DialogTitle sx={{ color: PRIMARY_COLOR }}>{editingId ? "Edit Allocation" : "Create New Allocation"}</DialogTitle>
//         <DialogContent>
//           <FormControl fullWidth sx={{ my: 2 }}>
//             <InputLabel>Employee(s)</InputLabel>
//             <Select
//               multiple
//               value={selectedEmployees}
//               onChange={(e) => setSelectedEmployees(typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value)}
//               input={<OutlinedInput label="Employee(s)" />}
//               disabled={!!editingId}
//               open={employeeSelectOpen}
//               onOpen={() => setEmployeeSelectOpen(true)}
//               onClose={() => setEmployeeSelectOpen(false)}
//               renderValue={(selected) => (
//                 <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
//                   {selected.map((val) => (<Chip key={val} label={employees.find((emp) => emp.id === val)?.name || val} size="small" sx={{ backgroundColor: '#fff0e6', color: SECONDARY_COLOR, border: `1px solid ${SECONDARY_COLOR}` }} />))}
//                 </Box>
//               )}
//             >
//               {employees.map((emp) => (<MenuItem key={emp.id} value={emp.id}>{emp.name}</MenuItem>))}
//               <Box sx={{ position: 'sticky', bottom: 0, bgcolor: 'background.paper', py: 1, px: 2, borderTop: 1, borderColor: 'divider', display: 'flex', justifyContent: 'flex-end' }}>
//                 <Button onClick={() => setEmployeeSelectOpen(false)} size="small">Close</Button>
//               </Box>
//             </Select>
//           </FormControl>
//           <FormControl fullWidth sx={{ my: 2 }}>
//             <InputLabel>Select Policies</InputLabel>
//             <Select
//               multiple value={selectedPolicies} onChange={handlePolicyChange}
//               input={<OutlinedInput label="Select Policies" />}
//               open={policySelectOpen}
//               onOpen={() => setPolicySelectOpen(true)}
//               onClose={() => setPolicySelectOpen(false)}
//               renderValue={(selected) => (
//                 <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
//                   {selected.map((id) => (<Chip key={id} label={policyMap.get(id) || id} size="small" sx={{ backgroundColor: '#fff0e6', color: SECONDARY_COLOR, border: `1px solid ${SECONDARY_COLOR}` }} />))}
//                 </Box>
//               )}
//             >
//               <MenuItem value="all">
//                 <Checkbox checked={isAllSelected} indeterminate={selectedPolicies.length > 0 && !isAllSelected} sx={{ '&.Mui-checked': { color: PRIMARY_COLOR } }} />
//                 <ListItemText primary="Select All" />
//               </MenuItem>
//               {policies.map((policy) => {
//                 const isAcknowledged = !!editingId && acknowledgedPolicyIds.includes(policy.id);
//                 return (
//                   <MenuItem key={policy.id} value={policy.id} disabled={isAcknowledged}>
//                     <Checkbox checked={selectedPolicies.includes(policy.id)} disabled={isAcknowledged} sx={{ '&.Mui-checked': { color: PRIMARY_COLOR } }} />
//                     <ListItemText primary={policy.name} sx={isAcknowledged ? { color: "text.disabled" } : {}} />
//                   </MenuItem>
//                 );
//               })}
//               <Box sx={{ position: 'sticky', bottom: 0, bgcolor: 'background.paper', py: 1, px: 2, borderTop: 1, borderColor: 'divider', display: 'flex', justifyContent: 'flex-end' }}>
//                 <Button onClick={() => setPolicySelectOpen(false)} size="small">Close</Button>
//               </Box>
//             </Select>
//           </FormControl>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose} sx={{ color: SECONDARY_COLOR, borderColor: SECONDARY_COLOR, '&:hover': { borderColor: '#e07e2b', backgroundColor: 'rgba(245, 142, 53, 0.08)' } }} variant="outlined">Cancel</Button>
//           <Button
//             onClick={handleSave}
//             variant="contained"
//             disabled={selectedEmployees.length === 0 || selectedPolicies.length === 0}
//             sx={{ backgroundColor: PRIMARY_COLOR, '&:hover': { backgroundColor: '#7a1f6a' } }}
//           >
//             {editingId ? "Update" : "Create"}
//           </Button>
//         </DialogActions>
//       </Dialog>
//       <Snackbar
//         open={snackbarInfo.open}
//         autoHideDuration={6000}
//         onClose={() => setSnackbarInfo({ ...snackbarInfo, open: false })}
//         anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
//       >
//         <Alert onClose={() => setSnackbarInfo({ ...snackbarInfo, open: false })} severity={snackbarInfo.severity} variant="filled" sx={{ width: "100%" }}>
//           {snackbarInfo.message}
//         </Alert>
//       </Snackbar>
//     </Container>
//   );
// };

// export default PolicyAllocation;















// import { useState, useEffect, useMemo } from "react";
//   import axiosInstance from "../../utils/axiosInstance";
//   import axios from "axios";
//   import {
//     Box,
//     Button,
//     Dialog,
//     DialogTitle,
//     DialogContent,
//     DialogActions,
//     FormControl,
//     InputLabel,
//     Select,
//     MenuItem,
//     OutlinedInput,
//     Chip,
//     TextField,
//     Table,
//     TableBody,
//     TableCell,
//     TableContainer,
//     TableHead,
//     TableRow,
//     Paper,
//     TablePagination,
//     Typography,
//     Container,
//     Card,
//     CardContent,
//     Snackbar,
//     Alert,
//     IconButton,
//     InputAdornment,
//     Checkbox,
//     ListItemText,
//     CircularProgress,
//   } from "@mui/material";
//   import {
//     Search as SearchIcon,
//     Clear as ClearIcon,
//   } from "@mui/icons-material";

//   const API_BASE_URL = "https://tdtlworld.com/hrms-backend";

//   // Define color constants as per request
//   const PRIMARY_COLOR = "#8C257C";
//   const SECONDARY_COLOR = "#F58E35";

//   const PolicyAllocation = () => {
//     const [employees, setEmployees] = useState([]);
//     const [policies, setPolicies] = useState([]);
//     const [allocations, setAllocations] = useState([]);
//     const [open, setOpen] = useState(false);
//     const [selectedEmployees, setSelectedEmployees] = useState([]);
//     const [selectedPolicies, setSelectedPolicies] = useState([]);
//     const [searchTerm, setSearchTerm] = useState("");
//     const [page, setPage] = useState(0);
//     const [rowsPerPage, setRowsPerPage] = useState(5);
//     const [snackbarInfo, setSnackbarInfo] = useState({
//       open: false,
//       message: "",
//       severity: "success",
//     });
//     const [editingId, setEditingId] = useState(null); // null for create, ID for edit
//     const [loading, setLoading] = useState(true);
//     const [acknowledgedPolicyIds, setAcknowledgedPolicyIds] = useState([]);

//     const [employeeSelectOpen, setEmployeeSelectOpen] = useState(false);
//     const [policySelectOpen, setPolicySelectOpen] = useState(false);

//     const policyMap = useMemo(() => {
//       return new Map(policies.map((p) => [p.id, p.name]));
//     }, [policies]);

//     useEffect(() => {
//       fetchData();
//     }, []);

//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         const [allocationsRes, employeesRes, policiesRes] = await Promise.all([
//           axios.get(`${API_BASE_URL}/api/policy-allocation/`),
//           axios.get(`${API_BASE_URL}/employee-dropdown/`),
//           axiosInstance.get(`${API_BASE_URL}/policies/`),
//         ]);

//         setEmployees(
//           employeesRes.data.map((emp) => ({ id: emp.emp_id, name: emp.label }))
//         );

//         const allPolicies = policiesRes.data.data.map((policy) => ({
//           id: policy.policy_id,
//           name: policy.title,
//         }));
//         setPolicies(allPolicies);
//         const localPolicyMap = new Map(allPolicies.map((p) => [p.id, p.name]));

//         const processedAllocations = allocationsRes.data.map((alloc) => {
//           const policyIds = alloc.policy_id ? alloc.policy_id.split(",").map((id) => parseInt(id.trim(), 10)) : [];
//           const policyStatuses = alloc.policy_acknowledgement_status ? alloc.policy_acknowledgement_status.split(",").map((s) => s.trim()) : [];

//           const uniquePolicies = new Map();
//           policyIds.forEach((id, index) => {
//             if (isNaN(id)) return;
//             const isAcknowledged = policyStatuses[index] === "Y";
//             const policyName = localPolicyMap.get(id) || "Unknown Policy";

//             if (!uniquePolicies.has(id)) {
//               uniquePolicies.set(id, { id, name: policyName, acknowledged: isAcknowledged });
//             } else if (isAcknowledged) {
//               uniquePolicies.get(id).acknowledged = true;
//             }
//           });

//           const detailedPolicies = Array.from(uniquePolicies.values());
//           return {
//             policy_allocation_id: alloc.policy_allocation_id,
//             id: alloc.emp_id,
//             employeeName: alloc.employee_name,
//             detailedPolicies: detailedPolicies,
//             policyIds: detailedPolicies.map((p) => p.id),
//             policies: detailedPolicies.map((p) => p.name).filter((name) => name !== "Unknown Policy"),
//             allocationDate: alloc.allocation_date,
//           };
//         });

//         const sortedAllocations = processedAllocations.sort(
//           (a, b) => new Date(b.allocationDate) - new Date(a.allocationDate)
//         );

//         setAllocations(sortedAllocations);
//       } catch (err) {
//         console.error("Error fetching data:", err);
//         setSnackbarInfo({ open: true, message: "Error loading data.", severity: "error" });
//       } finally {
//         setLoading(false);
//       }
//     };

//     const handleClose = () => {
//       setOpen(false);
//       setEditingId(null);
//       setSelectedEmployees([]);
//       setSelectedPolicies([]);
//       setAcknowledgedPolicyIds([]);
//     };
   
//     const handleOpenCreate = () => {
//       setEditingId(null);
//       setSelectedEmployees([]);
//       setSelectedPolicies([]);
//       setAcknowledgedPolicyIds([]);
//       setOpen(true);
//     };

//     const handlePolicyChange = (e) => {
//       const value = e.target.value;
//       if (value.includes("all")) {
//         const allPolicyIds = policies.map((p) => p.id);
//         const unacknowledgedPolicyIds = allPolicyIds.filter(id => !acknowledgedPolicyIds.includes(id));
//         setSelectedPolicies(selectedPolicies.length === unacknowledgedPolicyIds.length ? [] : unacknowledgedPolicyIds);
//       } else {
//         setSelectedPolicies(value);
//       }
//     };

//     const handleSave = async () => {
//       if (editingId) {
//         // --- UPDATE LOGIC ---
//         try {
//           const originalAllocation = allocations.find((a) => a.policy_allocation_id === editingId);
//           if (!originalAllocation) throw new Error("Original allocation not found.");
         
//           const originalPolicyIds = originalAllocation.policyIds;
//           const newPolicyIds = selectedPolicies;
//           const policies_to_add_ids = newPolicyIds.filter((id) => !originalPolicyIds.includes(id));
//           const policies_to_remove_ids = originalPolicyIds.filter((id) => !newPolicyIds.includes(id) && !acknowledgedPolicyIds.includes(id));

//           if (policies_to_add_ids.length === 0 && policies_to_remove_ids.length === 0) {
//             setSnackbarInfo({ open: true, message: "No changes detected.", severity: "info" });
//             handleClose();
//             return;
//           }

//           const policies_to_add_names = policies_to_add_ids.map(id => policyMap.get(id));
//           const policies_to_remove_names = policies_to_remove_ids.map(id => policyMap.get(id));

//           const payload = {
//             employee_id: originalAllocation.id,
//             policies_to_add: policies_to_add_names,
//             policies_to_remove: policies_to_remove_names,
//           };
         
//           await axios.patch(`${API_BASE_URL}/api/policy-allocation/${editingId}/`, payload);
//           setSnackbarInfo({ open: true, message: "Policy allocation updated successfully.", severity: "success" });
//           fetchData();
//           handleClose();
//         } catch (err) {
//           console.error("Failed to update policy allocation:", err);
//           setSnackbarInfo({ open: true, message: err.response?.data?.detail || "Failed to update allocation.", severity: "error" });
//         }
//       } else {
//         // --- CREATE LOGIC ---
//         if (selectedEmployees.length === 0 || selectedPolicies.length === 0) {
//             setSnackbarInfo({ open: true, message: "Please select at least one employee and one policy.", severity: "warning" });
//             return;
//         }
//         try {
//           const payload = {
//             employee_ids: selectedEmployees,
//             policy_ids: selectedPolicies,
//           };
//           await axios.post(`${API_BASE_URL}/api/policy-allocation/`, payload);
//           setSnackbarInfo({ open: true, message: "Policy allocation created successfully.", severity: "success" });
//           fetchData();
//           handleClose();
//         } catch (err) {
//           console.error("Failed to create policy allocation:", err);
//           setSnackbarInfo({ open: true, message: err.response?.data?.detail || "Failed to create allocation.", severity: "error" });
//         }
//       }
//     };

//     const filtered = allocations.filter(
//       (a) => a.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) || a.policies.some((p) => p.toLowerCase().includes(searchTerm.toLowerCase()))
//     );

//     const paginated = filtered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
//     const isAllSelected = policies.length > 0 && selectedPolicies.length === policies.filter(p => !acknowledgedPolicyIds.includes(p.id)).length;

//     return (
//     <Box p={3} component={Paper}>
//       <Box display="flex" flexDirection="column" alignItems="flex-start" mb={2} gap={2}>
//             <Typography variant="h4" gutterBottom fontWeight="600" sx={{ color: PRIMARY_COLOR }}>
//               Policy Allocation
//             </Typography>
//             <Box
//               sx={{
//                 display: "flex",
//                 justifyContent: "flex-end",
//                 alignItems: "center",
//                 mb: 2,
//                 flexWrap: "wrap",
//                 gap: 2,
//               }}
//             >
//               <TextField
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 placeholder="Search..."
//                 size="small"
//                 sx={{
//                   minWidth: 300,
//                   '& .MuiOutlinedInput-root': {
//                     '&.Mui-focused fieldset': {
//                       borderColor: PRIMARY_COLOR,
//                     },
//                   },
//                 }}
//                 InputProps={{
//                   startAdornment: (<InputAdornment position="start"><SearchIcon /></InputAdornment>),
//                   endAdornment: searchTerm && (<InputAdornment position="end"><IconButton size="small" onClick={() => setSearchTerm("")}><ClearIcon /></IconButton></InputAdornment>),
//                 }}
//               />
//             </Box>
//             <TableContainer component={Paper} variant="outlined">
//               <Table>
//                 <TableHead sx={{ backgroundColor: PRIMARY_COLOR }}>
//                   <TableRow>
//                     <TableCell sx={{ fontWeight: "bold", color: 'white' }}>SR. NO.</TableCell>
//                     <TableCell sx={{ fontWeight: "bold", color: 'white' }}>EMPLOYEES</TableCell>
//                     <TableCell sx={{ fontWeight: "bold", color: 'white' }}>POLICIES</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {loading ? (
//                     <TableRow><TableCell colSpan={3} align="center" sx={{ p: 4 }}><CircularProgress sx={{ color: PRIMARY_COLOR }} /></TableCell></TableRow>
//                   ) : paginated.length > 0 ? (
//                     paginated.map((row, index) => (
//                       <TableRow key={row.policy_allocation_id} hover>
//                         <TableCell>{page * rowsPerPage + index + 1}</TableCell>
//                         <TableCell>{row.employeeName}</TableCell>
//                         <TableCell sx={{ maxWidth: "400px" }}>
//                           <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
//                             {row.policies.map((p, i) => (<Chip key={i} label={p} size="small" sx={{ bgcolor: 'grey.200' }} />))}
//                           </Box>
//                         </TableCell>
//                       </TableRow>
//                     ))
//                   ) : (
//                     <TableRow><TableCell colSpan={3} align="center" sx={{ p: 4 }}>No records found</TableCell></TableRow>
//                   )}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//             <Box sx={{
//                 display: 'flex',
//                 justifyContent: 'space-between',
//                 alignItems: 'center',
//                 flexWrap: 'wrap',
//                 py: 2,
//                 px: { xs: 0, sm: 2 },
//                 gap: 2,
//                 flexDirection: { xs: 'column', sm: 'row' }
//             }}>
//                 <Typography variant="body2" color="text.secondary">
//                     {`Showing ${filtered.length > 0 ? page * rowsPerPage + 1 : 0} to ${Math.min((page + 1) * rowsPerPage, filtered.length)} of ${filtered.length} results`}
//                 </Typography>
//                 <TablePagination
//                     rowsPerPageOptions={[5, 10, 15, 25]}
//                     component="div"
//                     count={filtered.length}
//                     rowsPerPage={rowsPerPage}
//                     page={page}
//                     onPageChange={(e, newPage) => setPage(newPage)}
//                     onRowsPerPageChange={(e) => {
//                         setRowsPerPage(parseInt(e.target.value, 10));
//                         setPage(0);
//                     }}
//                     sx={{
//                         p: 0,
//                         '& .MuiIconButton-root': {
//                             color: PRIMARY_COLOR
//                         },
//                         '& .MuiIconButton-root.Mui-disabled': {
//                             color: 'rgba(0, 0, 0, 0.26)'
//                         }
//                     }}
//                 />
//             </Box>
//         </Box>
//         <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
//           <DialogTitle sx={{ color: PRIMARY_COLOR }}>{editingId ? "Edit Allocation" : "Create New Allocation"}</DialogTitle>
//           <DialogContent>
//             <FormControl fullWidth sx={{ my: 2 }}>
//               <InputLabel>Employee(s)</InputLabel>
//               <Select
//                 multiple
//                 value={selectedEmployees}
//                 onChange={(e) => setSelectedEmployees(typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value)}
//                 input={<OutlinedInput label="Employee(s)" />}
//                 disabled={!!editingId}
//                 open={employeeSelectOpen}
//                 onOpen={() => setEmployeeSelectOpen(true)}
//                 onClose={() => setEmployeeSelectOpen(false)}
//                 renderValue={(selected) => (
//                   <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
//                     {selected.map((val) => (<Chip key={val} label={employees.find((emp) => emp.id === val)?.name || val} size="small" sx={{ backgroundColor: '#fff0e6', color: SECONDARY_COLOR, border: `1px solid ${SECONDARY_COLOR}` }} />))}
//                   </Box>
//                 )}
//               >
//                 {employees.map((emp) => (<MenuItem key={emp.id} value={emp.id}>{emp.name}</MenuItem>))}
//                 <Box sx={{ position: 'sticky', bottom: 0, bgcolor: 'background.paper', py: 1, px: 2, borderTop: 1, borderColor: 'divider', display: 'flex', justifyContent: 'flex-end' }}>
//                   <Button onClick={() => setEmployeeSelectOpen(false)} size="small">Close</Button>
//                 </Box>
//               </Select>
//             </FormControl>
//             <FormControl fullWidth sx={{ my: 2 }}>
//               <InputLabel>Select Policies</InputLabel>
//               <Select
//                 multiple value={selectedPolicies} onChange={handlePolicyChange}
//                 input={<OutlinedInput label="Select Policies" />}
//                 open={policySelectOpen}
//                 onOpen={() => setPolicySelectOpen(true)}
//                 onClose={() => setPolicySelectOpen(false)}
//                 renderValue={(selected) => (
//                   <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
//                     {selected.map((id) => (<Chip key={id} label={policyMap.get(id) || id} size="small" sx={{ backgroundColor: '#fff0e6', color: SECONDARY_COLOR, border: `1px solid ${SECONDARY_COLOR}` }} />))}
//                   </Box>
//                 )}
//               >
//                 <MenuItem value="all">
//                   <Checkbox checked={isAllSelected} indeterminate={selectedPolicies.length > 0 && !isAllSelected} sx={{ '&.Mui-checked': { color: PRIMARY_COLOR } }} />
//                   <ListItemText primary="Select All" />
//                 </MenuItem>
//                 {policies.map((policy) => {
//                   const isAcknowledged = !!editingId && acknowledgedPolicyIds.includes(policy.id);
//                   return (
//                     <MenuItem key={policy.id} value={policy.id} disabled={isAcknowledged}>
//                       <Checkbox checked={selectedPolicies.includes(policy.id)} disabled={isAcknowledged} sx={{ '&.Mui-checked': { color: PRIMARY_COLOR } }} />
//                       <ListItemText primary={policy.name} sx={isAcknowledged ? { color: "text.disabled" } : {}} />
//                     </MenuItem>
//                   );
//                 })}
//                 <Box sx={{ position: 'sticky', bottom: 0, bgcolor: 'background.paper', py: 1, px: 2, borderTop: 1, borderColor: 'divider', display: 'flex', justifyContent: 'flex-end' }}>
//                   <Button onClick={() => setPolicySelectOpen(false)} size="small">Close</Button>
//                 </Box>
//               </Select>
//             </FormControl>
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={handleClose} sx={{ color: SECONDARY_COLOR, borderColor: SECONDARY_COLOR, '&:hover': { borderColor: '#e07e2b', backgroundColor: 'rgba(245, 142, 53, 0.08)' } }} variant="outlined">Cancel</Button>
//             <Button
//               onClick={handleSave}
//               variant="contained"
//               disabled={selectedEmployees.length === 0 || selectedPolicies.length === 0}
//               sx={{ backgroundColor: PRIMARY_COLOR, '&:hover': { backgroundColor: '#7a1f6a' } }}
//             >
//               {editingId ? "Update" : "Create"}
//             </Button>
//           </DialogActions>
//         </Dialog>
//         <Snackbar
//           open={snackbarInfo.open}
//           autoHideDuration={6000}
//           onClose={() => setSnackbarInfo({ ...snackbarInfo, open: false })}
//           anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
//         >
//           <Alert onClose={() => setSnackbarInfo({ ...snackbarInfo, open: false })} severity={snackbarInfo.severity} variant="filled" sx={{ width: "100%" }}>
//             {snackbarInfo.message}
//           </Alert>
//         </Snackbar>
//       </Box>
//     );
//   };

//   export default PolicyAllocation;  











// import { useState, useEffect, useMemo } from "react";
//   import axiosInstance from "../../utils/axiosInstance";
//   import axios from "axios";
//   import {
//     Box,
//     Button,
//     Dialog,
//     DialogTitle,
//     DialogContent,
//     DialogActions,
//     FormControl,
//     InputLabel,
//     Select,
//     MenuItem,
//     OutlinedInput,
//     Chip,
//     TextField,
//     Table,
//     TableBody,
//     TableCell,
//     TableContainer,
//     TableHead,
//     TableRow,
//     Paper,
//     TablePagination,
//     Typography,
//     Container,
//     Card,
//     CardContent,
//     Snackbar,
//     Alert,
//     IconButton,
//     InputAdornment,
//     Checkbox,
//     ListItemText,
//     CircularProgress,
//   } from "@mui/material";
//   import {
//     Search as SearchIcon,
//     Clear as ClearIcon,
//   } from "@mui/icons-material";

//   const API_BASE_URL = "https://tdtlworld.com/hrms-backend";

//   // Define color constants as per request
//   const PRIMARY_COLOR = "#8C257C";
//   const SECONDARY_COLOR = "#F58E35";

//   const PolicyAllocation = () => {
//     const [employees, setEmployees] = useState([]);
//     const [policies, setPolicies] = useState([]);
//     const [allocations, setAllocations] = useState([]);
//     const [open, setOpen] = useState(false);
//     const [selectedEmployees, setSelectedEmployees] = useState([]);
//     const [selectedPolicies, setSelectedPolicies] = useState([]);
//     const [searchTerm, setSearchTerm] = useState("");
//     const [page, setPage] = useState(0);
//     const [rowsPerPage, setRowsPerPage] = useState(5);
//     const [snackbarInfo, setSnackbarInfo] = useState({
//       open: false,
//       message: "",
//       severity: "success",
//     });
//     const [editingId, setEditingId] = useState(null); // null for create, ID for edit
//     const [loading, setLoading] = useState(true);
//     const [acknowledgedPolicyIds, setAcknowledgedPolicyIds] = useState([]);

//     const [employeeSelectOpen, setEmployeeSelectOpen] = useState(false);
//     const [policySelectOpen, setPolicySelectOpen] = useState(false);

//     const policyMap = useMemo(() => {
//       return new Map(policies.map((p) => [p.id, p.name]));
//     }, [policies]);

//     useEffect(() => {
//       fetchData();
//     }, []);

//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         const [allocationsRes, employeesRes, policiesRes] = await Promise.all([
//           axios.get(`${API_BASE_URL}/api/policy-allocation/`),
//           axios.get(`${API_BASE_URL}/employee-dropdown/`),
//           axiosInstance.get(`${API_BASE_URL}/policies/`),
//         ]);

//         setEmployees(
//           employeesRes.data.map((emp) => ({ id: emp.emp_id, name: emp.label }))
//         );

//         const allPolicies = policiesRes.data.data.map((policy) => ({
//           id: policy.policy_id,
//           name: policy.title,
//         }));
//         setPolicies(allPolicies);
//         const localPolicyMap = new Map(allPolicies.map((p) => [p.id, p.name]));

//         const processedAllocations = allocationsRes.data.map((alloc) => {
//           const policyIds = alloc.policy_id ? alloc.policy_id.split(",").map((id) => parseInt(id.trim(), 10)) : [];
//           const policyStatuses = alloc.policy_acknowledgement_status ? alloc.policy_acknowledgement_status.split(",").map((s) => s.trim()) : [];

//           const uniquePolicies = new Map();
//           policyIds.forEach((id, index) => {
//             if (isNaN(id)) return;
//             const isAcknowledged = policyStatuses[index] === "Y";
//             const policyName = localPolicyMap.get(id) || "Unknown Policy";

//             if (!uniquePolicies.has(id)) {
//               uniquePolicies.set(id, { id, name: policyName, acknowledged: isAcknowledged });
//             } else if (isAcknowledged) {
//               uniquePolicies.get(id).acknowledged = true;
//             }
//           });

//           const detailedPolicies = Array.from(uniquePolicies.values());
//           return {
//             policy_allocation_id: alloc.policy_allocation_id,
//             id: alloc.emp_id,
//             employeeName: alloc.employee_name,
//             detailedPolicies: detailedPolicies,
//             policyIds: detailedPolicies.map((p) => p.id),
//             policies: detailedPolicies.map((p) => p.name).filter((name) => name !== "Unknown Policy"),
//             allocationDate: alloc.allocation_date,
//           };
//         });

//         const sortedAllocations = processedAllocations.sort(
//           (a, b) => new Date(b.allocationDate) - new Date(a.allocationDate)
//         );

//         setAllocations(sortedAllocations);
//       } catch (err) {
//         console.error("Error fetching data:", err);
//         setSnackbarInfo({ open: true, message: "Error loading data.", severity: "error" });
//       } finally {
//         setLoading(false);
//       }
//     };

//     const handleClose = () => {
//       setOpen(false);
//       setEditingId(null);
//       setSelectedEmployees([]);
//       setSelectedPolicies([]);
//       setAcknowledgedPolicyIds([]);
//     };
   
//     const handleOpenCreate = () => {
//       setEditingId(null);
//       setSelectedEmployees([]);
//       setSelectedPolicies([]);
//       setAcknowledgedPolicyIds([]);
//       setOpen(true);
//     };

//     const handlePolicyChange = (e) => {
//       const value = e.target.value;
//       if (value.includes("all")) {
//         const allPolicyIds = policies.map((p) => p.id);
//         const unacknowledgedPolicyIds = allPolicyIds.filter(id => !acknowledgedPolicyIds.includes(id));
//         setSelectedPolicies(selectedPolicies.length === unacknowledgedPolicyIds.length ? [] : unacknowledgedPolicyIds);
//       } else {
//         setSelectedPolicies(value);
//       }
//     };

//     const handleSave = async () => {
//       if (editingId) {
//         // --- UPDATE LOGIC ---
//         try {
//           const originalAllocation = allocations.find((a) => a.policy_allocation_id === editingId);
//           if (!originalAllocation) throw new Error("Original allocation not found.");
         
//           const originalPolicyIds = originalAllocation.policyIds;
//           const newPolicyIds = selectedPolicies;
//           const policies_to_add_ids = newPolicyIds.filter((id) => !originalPolicyIds.includes(id));
//           const policies_to_remove_ids = originalPolicyIds.filter((id) => !newPolicyIds.includes(id) && !acknowledgedPolicyIds.includes(id));

//           if (policies_to_add_ids.length === 0 && policies_to_remove_ids.length === 0) {
//             setSnackbarInfo({ open: true, message: "No changes detected.", severity: "info" });
//             handleClose();
//             return;
//           }

//           const policies_to_add_names = policies_to_add_ids.map(id => policyMap.get(id));
//           const policies_to_remove_names = policies_to_remove_ids.map(id => policyMap.get(id));

//           const payload = {
//             employee_id: originalAllocation.id,
//             policies_to_add: policies_to_add_names,
//             policies_to_remove: policies_to_remove_names,
//           };
         
//           await axios.patch(`${API_BASE_URL}/api/policy-allocation/${editingId}/`, payload);
//           setSnackbarInfo({ open: true, message: "Policy allocation updated successfully.", severity: "success" });
//           fetchData();
//           handleClose();
//         } catch (err) {
//           console.error("Failed to update policy allocation:", err);
//           setSnackbarInfo({ open: true, message: err.response?.data?.detail || "Failed to update allocation.", severity: "error" });
//         }
//       } else {
//         // --- CREATE LOGIC ---
//         if (selectedEmployees.length === 0 || selectedPolicies.length === 0) {
//             setSnackbarInfo({ open: true, message: "Please select at least one employee and one policy.", severity: "warning" });
//             return;
//         }
//         try {
//           const payload = {
//             employee_ids: selectedEmployees,
//             policy_ids: selectedPolicies,
//           };
//           await axios.post(`${API_BASE_URL}/api/policy-allocation/`, payload);
//           setSnackbarInfo({ open: true, message: "Policy allocation created successfully.", severity: "success" });
//           fetchData();
//           handleClose();
//         } catch (err) {
//           console.error("Failed to create policy allocation:", err);
//           setSnackbarInfo({ open: true, message: err.response?.data?.detail || "Failed to create allocation.", severity: "error" });
//         }
//       }
//     };

//     const filtered = allocations.filter(
//       (a) => a.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) || a.policies.some((p) => p.toLowerCase().includes(searchTerm.toLowerCase()))
//     );

//     const paginated = filtered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
//     const isAllSelected = policies.length > 0 && selectedPolicies.length === policies.filter(p => !acknowledgedPolicyIds.includes(p.id)).length;

//     return (
//       <Box p={3} component={Paper}>
//         {/* MODIFIED PART STARTS HERE */}
//         <Box mb={2}>
//           <Typography variant="h4" gutterBottom fontWeight="600" sx={{ color: PRIMARY_COLOR }}>
//             Policy Allocation
//           </Typography>
//           <Box display="flex" justifyContent="flex-end" mt={1}>
//             <TextField
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               placeholder="Search..."
//               size="small"
//               sx={{
//                 minWidth: 300,
//                 '& .MuiOutlinedInput-root': {
//                   '&.Mui-focused fieldset': {
//                     borderColor: PRIMARY_COLOR,
//                   },
//                 },
//               }}
//               InputProps={{
//                 startAdornment: (<InputAdornment position="start"><SearchIcon /></InputAdornment>),
//                 endAdornment: searchTerm && (<InputAdornment position="end"><IconButton size="small" onClick={() => setSearchTerm("")}><ClearIcon /></IconButton></InputAdornment>),
//               }}
//             />
//           </Box>
//         </Box>
//         {/* MODIFIED PART ENDS HERE */}
  
//         <TableContainer component={Paper} variant="outlined">
//           <Table>
//             <TableHead sx={{ backgroundColor: PRIMARY_COLOR }}>
//               <TableRow>
//                 <TableCell sx={{ fontWeight: "bold", color: 'white' }}>SR. NO.</TableCell>
//                 <TableCell sx={{ fontWeight: "bold", color: 'white' }}>EMPLOYEES</TableCell>
//                 <TableCell sx={{ fontWeight: "bold", color: 'white' }}>POLICIES</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {loading ? (
//                 <TableRow><TableCell colSpan={3} align="center" sx={{ p: 4 }}><CircularProgress sx={{ color: PRIMARY_COLOR }} /></TableCell></TableRow>
//               ) : paginated.length > 0 ? (
//                 paginated.map((row, index) => (
//                   <TableRow key={row.policy_allocation_id} hover>
//                     <TableCell>{page * rowsPerPage + index + 1}</TableCell>
//                     <TableCell>{row.employeeName}</TableCell>
//                     <TableCell sx={{ maxWidth: "400px" }}>
//                       <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
//                         {row.policies.map((p, i) => (<Chip key={i} label={p} size="small" sx={{ bgcolor: 'grey.200' }} />))}
//                       </Box>
//                     </TableCell>
//                   </TableRow>
//                 ))
//               ) : (
//                 <TableRow><TableCell colSpan={3} align="center" sx={{ p: 4 }}>No records found</TableCell></TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>
        
//         <Box sx={{
//             display: 'flex',
//             justifyContent: 'space-between',
//             alignItems: 'center',
//             flexWrap: 'wrap',
//             py: 2,
//             px: { xs: 0, sm: 2 },
//             gap: 2,
//             flexDirection: { xs: 'column', sm: 'row' }
//         }}>
//             <Typography variant="body2" color="text.secondary">
//                 {`Showing ${filtered.length > 0 ? page * rowsPerPage + 1 : 0} to ${Math.min((page + 1) * rowsPerPage, filtered.length)} of ${filtered.length} results`}
//             </Typography>
//             <TablePagination
//                 rowsPerPageOptions={[5, 10, 15, 25]}
//                 component="div"
//                 count={filtered.length}
//                 rowsPerPage={rowsPerPage}
//                 page={page}
//                 onPageChange={(e, newPage) => setPage(newPage)}
//                 onRowsPerPageChange={(e) => {
//                     setRowsPerPage(parseInt(e.target.value, 10));
//                     setPage(0);
//                 }}
//                 sx={{
//                     p: 0,
//                     '& .MuiIconButton-root': {
//                         color: PRIMARY_COLOR
//                     },
//                     '& .MuiIconButton-root.Mui-disabled': {
//                         color: 'rgba(0, 0, 0, 0.26)'
//                     }
//                 }}
//             />
//         </Box>
  
//         <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
//           <DialogTitle sx={{ color: PRIMARY_COLOR }}>{editingId ? "Edit Allocation" : "Create New Allocation"}</DialogTitle>
//           <DialogContent>
//             <FormControl fullWidth sx={{ my: 2 }}>
//               <InputLabel>Employee(s)</InputLabel>
//               <Select
//                 multiple
//                 value={selectedEmployees}
//                 onChange={(e) => setSelectedEmployees(typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value)}
//                 input={<OutlinedInput label="Employee(s)" />}
//                 disabled={!!editingId}
//                 open={employeeSelectOpen}
//                 onOpen={() => setEmployeeSelectOpen(true)}
//                 onClose={() => setEmployeeSelectOpen(false)}
//                 renderValue={(selected) => (
//                   <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
//                     {selected.map((val) => (<Chip key={val} label={employees.find((emp) => emp.id === val)?.name || val} size="small" sx={{ backgroundColor: '#fff0e6', color: SECONDARY_COLOR, border: `1px solid ${SECONDARY_COLOR}` }} />))}
//                   </Box>
//                 )}
//               >
//                 {employees.map((emp) => (<MenuItem key={emp.id} value={emp.id}>{emp.name}</MenuItem>))}
//                 <Box sx={{ position: 'sticky', bottom: 0, bgcolor: 'background.paper', py: 1, px: 2, borderTop: 1, borderColor: 'divider', display: 'flex', justifyContent: 'flex-end' }}>
//                   <Button onClick={() => setEmployeeSelectOpen(false)} size="small">Close</Button>
//                 </Box>
//               </Select>
//             </FormControl>
//             <FormControl fullWidth sx={{ my: 2 }}>
//               <InputLabel>Select Policies</InputLabel>
//               <Select
//                 multiple value={selectedPolicies} onChange={handlePolicyChange}
//                 input={<OutlinedInput label="Select Policies" />}
//                 open={policySelectOpen}
//                 onOpen={() => setPolicySelectOpen(true)}
//                 onClose={() => setPolicySelectOpen(false)}
//                 renderValue={(selected) => (
//                   <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
//                     {selected.map((id) => (<Chip key={id} label={policyMap.get(id) || id} size="small" sx={{ backgroundColor: '#fff0e6', color: SECONDARY_COLOR, border: `1px solid ${SECONDARY_COLOR}` }} />))}
//                   </Box>
//                 )}
//               >
//                 <MenuItem value="all">
//                   <Checkbox checked={isAllSelected} indeterminate={selectedPolicies.length > 0 && !isAllSelected} sx={{ '&.Mui-checked': { color: PRIMARY_COLOR } }} />
//                   <ListItemText primary="Select All" />
//                 </MenuItem>
//                 {policies.map((policy) => {
//                   const isAcknowledged = !!editingId && acknowledgedPolicyIds.includes(policy.id);
//                   return (
//                     <MenuItem key={policy.id} value={policy.id} disabled={isAcknowledged}>
//                       <Checkbox checked={selectedPolicies.includes(policy.id)} disabled={isAcknowledged} sx={{ '&.Mui-checked': { color: PRIMARY_COLOR } }} />
//                       <ListItemText primary={policy.name} sx={isAcknowledged ? { color: "text.disabled" } : {}} />
//                     </MenuItem>
//                   );
//                 })}
//                 <Box sx={{ position: 'sticky', bottom: 0, bgcolor: 'background.paper', py: 1, px: 2, borderTop: 1, borderColor: 'divider', display: 'flex', justifyContent: 'flex-end' }}>
//                   <Button onClick={() => setPolicySelectOpen(false)} size="small">Close</Button>
//                 </Box>
//               </Select>
//             </FormControl>
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={handleClose} sx={{ color: SECONDARY_COLOR, borderColor: SECONDARY_COLOR, '&:hover': { borderColor: '#e07e2b', backgroundColor: 'rgba(245, 142, 53, 0.08)' } }} variant="outlined">Cancel</Button>
//             <Button
//               onClick={handleSave}
//               variant="contained"
//               disabled={selectedEmployees.length === 0 || selectedPolicies.length === 0}
//               sx={{ backgroundColor: PRIMARY_COLOR, '&:hover': { backgroundColor: '#7a1f6a' } }}
//             >
//               {editingId ? "Update" : "Create"}
//             </Button>
//           </DialogActions>
//         </Dialog>
//         <Snackbar
//           open={snackbarInfo.open}
//           autoHideDuration={6000}
//           onClose={() => setSnackbarInfo({ ...snackbarInfo, open: false })}
//           anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
//         >
//           <Alert onClose={() => setSnackbarInfo({ ...snackbarInfo, open: false })} severity={snackbarInfo.severity} variant="filled" sx={{ width: "100%" }}>
//             {snackbarInfo.message}
//           </Alert>
//         </Snackbar>
//       </Box>
//     );
//   };

//   export default PolicyAllocation;













// import { useState, useEffect, useMemo } from "react";
// import axiosInstance from "../../utils/axiosInstance";
// import axios from "axios";
// import {
//   Box,
//   Button,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   OutlinedInput,
//   Chip,
//   TextField,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   TablePagination,
//   Typography,
//   Snackbar,
//   Alert,
//   IconButton,
//   InputAdornment,
//   Checkbox,
//   ListItemText,
//   CircularProgress,
// } from "@mui/material";
// import {
//   Search as SearchIcon,
//   Clear as ClearIcon,
// } from "@mui/icons-material";

// const API_BASE_URL = "https://tdtlworld.com/hrms-backend";

// const PRIMARY_COLOR = "#8C257C";
// const SECONDARY_COLOR = "#F58E35";

// const PolicyAllocation = () => {
//   const [employees, setEmployees] = useState([]);
//   const [policies, setPolicies] = useState([]);
//   const [allocations, setAllocations] = useState([]);
//   const [open, setOpen] = useState(false);
//   const [selectedEmployees, setSelectedEmployees] = useState([]);
//   const [selectedPolicies, setSelectedPolicies] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);
//   const [snackbarInfo, setSnackbarInfo] = useState({
//     open: false,
//     message: "",
//     severity: "success",
//   });
//   const [editingId, setEditingId] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [acknowledgedPolicyIds, setAcknowledgedPolicyIds] = useState([]);

//   const [employeeSelectOpen, setEmployeeSelectOpen] = useState(false);
//   const [policySelectOpen, setPolicySelectOpen] = useState(false);

//   const policyMap = useMemo(() => {
//     return new Map(policies.map((p) => [p.id, p.name]));
//   }, [policies]);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     setLoading(true);
//     try {
//       const [allocationsRes, employeesRes, policiesRes] = await Promise.all([
//         axios.get(`${API_BASE_URL}/api/policy-allocation/`),
//         axios.get(`${API_BASE_URL}/employee-dropdown/`),
//         axiosInstance.get(`${API_BASE_URL}/policies/`),
//       ]);

//       setEmployees(
//         employeesRes.data.map((emp) => ({ id: emp.emp_id, name: emp.label }))
//       );

//       const allPolicies = policiesRes.data.data.map((policy) => ({
//         id: policy.policy_id,
//         name: policy.title,
//       }));
//       setPolicies(allPolicies);
//       const localPolicyMap = new Map(allPolicies.map((p) => [p.id, p.name]));

//       const processedAllocations = allocationsRes.data.data.map((alloc) => {
//         const policyIds = alloc.policy_id
//           ? alloc.policy_id.split(",").map((id) => parseInt(id.trim(), 10))
//           : [];
//         const policyStatuses = alloc.policy_acknowledgement_status
//           ? alloc.policy_acknowledgement_status.split(",").map((s) => s.trim())
//           : [];

//         const uniquePolicies = new Map();
//         policyIds.forEach((id, index) => {
//           if (isNaN(id)) return;
//           const isAcknowledged = policyStatuses[index] === "Y";
//           const policyName = localPolicyMap.get(id) || "Unknown Policy";

//           if (!uniquePolicies.has(id)) {
//             uniquePolicies.set(id, {
//               id,
//               name: policyName,
//               acknowledged: isAcknowledged,
//             });
//           } else if (isAcknowledged) {
//             uniquePolicies.get(id).acknowledged = true;
//           }
//         });

//         const detailedPolicies = Array.from(uniquePolicies.values());
//         return {
//           policy_allocation_id: alloc.policy_allocation_id,
//           id: alloc.emp_id,
//           employeeName: alloc.employee_name,
//           detailedPolicies: detailedPolicies,
//           policyIds: detailedPolicies.map((p) => p.id),
//           policies: detailedPolicies
//             .map((p) => p.name)
//             .filter((name) => name !== "Unknown Policy"),
//           allocationDate: alloc.allocation_date,
//         };
//       });

//       const sortedAllocations = processedAllocations.sort(
//         (a, b) => new Date(b.allocationDate) - new Date(a.allocationDate)
//       );

//       setAllocations(sortedAllocations);
//     } catch (err) {
//       console.error("Error fetching data:", err);
//       setSnackbarInfo({
//         open: true,
//         message: "Error loading data.",
//         severity: "error",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleClose = () => {
//     setOpen(false);
//     setEditingId(null);
//     setSelectedEmployees([]);
//     setSelectedPolicies([]);
//     setAcknowledgedPolicyIds([]);
//   };

//   const handleOpenCreate = () => {
//     setEditingId(null);
//     setSelectedEmployees([]);
//     setSelectedPolicies([]);
//     setAcknowledgedPolicyIds([]);
//     setOpen(true);
//   };

//   const handlePolicyChange = (e) => {
//     const value = e.target.value;
//     if (value.includes("all")) {
//       const allPolicyIds = policies.map((p) => p.id);
//       const unacknowledgedPolicyIds = allPolicyIds.filter(
//         (id) => !acknowledgedPolicyIds.includes(id)
//       );
//       setSelectedPolicies(
//         selectedPolicies.length === unacknowledgedPolicyIds.length
//           ? []
//           : unacknowledgedPolicyIds
//       );
//     } else {
//       setSelectedPolicies(value);
//     }
//   };

//   const handleSave = async () => {
//     if (editingId) {
//       try {
//         const originalAllocation = allocations.find(
//           (a) => a.policy_allocation_id === editingId
//         );
//         if (!originalAllocation)
//           throw new Error("Original allocation not found.");

//         const originalPolicyIds = originalAllocation.policyIds;
//         const newPolicyIds = selectedPolicies;
//         const policies_to_add_ids = newPolicyIds.filter(
//           (id) => !originalPolicyIds.includes(id)
//         );
//         const policies_to_remove_ids = originalPolicyIds.filter(
//           (id) =>
//             !newPolicyIds.includes(id) && !acknowledgedPolicyIds.includes(id)
//         );

//         if (
//           policies_to_add_ids.length === 0 &&
//           policies_to_remove_ids.length === 0
//         ) {
//           setSnackbarInfo({
//             open: true,
//             message: "No changes detected.",
//             severity: "info",
//           });
//           handleClose();
//           return;
//         }

//         const policies_to_add_names = policies_to_add_ids.map((id) =>
//           policyMap.get(id)
//         );
//         const policies_to_remove_names = policies_to_remove_ids.map((id) =>
//           policyMap.get(id)
//         );

//         const payload = {
//           employee_id: originalAllocation.id,
//           policies_to_add: policies_to_add_names,
//           policies_to_remove: policies_to_remove_names,
//         };

//         await axios.patch(
//           `${API_BASE_URL}/api/policy-allocation/${editingId}/`,
//           payload
//         );
//         setSnackbarInfo({
//           open: true,
//           message: "Policy allocation updated successfully.",
//           severity: "success",
//         });
//         fetchData();
//         handleClose();
//       } catch (err) {
//         console.error("Failed to update policy allocation:", err);
//         setSnackbarInfo({
//           open: true,
//           message:
//             err.response?.data?.detail || "Failed to update allocation.",
//           severity: "error",
//         });
//       }
//     } else {
//       if (selectedEmployees.length === 0 || selectedPolicies.length === 0) {
//         setSnackbarInfo({
//           open: true,
//           message: "Please select at least one employee and one policy.",
//           severity: "warning",
//         });
//         return;
//       }
//       try {
//         const payload = {
//           employee_ids: selectedEmployees,
//           policy_ids: selectedPolicies,
//         };
//         await axios.post(`${API_BASE_URL}/api/policy-allocation/`, payload);
//         setSnackbarInfo({
//           open: true,
//           message: "Policy allocation created successfully.",
//           severity: "success",
//         });
//         fetchData();
//         handleClose();
//       } catch (err) {
//         console.error("Failed to create policy allocation:", err);
//         setSnackbarInfo({
//           open: true,
//           message:
//             err.response?.data?.detail || "Failed to create allocation.",
//           severity: "error",
//         });
//       }
//     }
//   };

//   const filtered = allocations.filter(
//     (a) =>
//       a.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       a.policies.some((p) => p.toLowerCase().includes(searchTerm.toLowerCase()))
//   );

//   const paginated = filtered.slice(
//     page * rowsPerPage,
//     page * rowsPerPage + rowsPerPage
//   );
//   const isAllSelected =
//     policies.length > 0 &&
//     selectedPolicies.length ===
//       policies.filter((p) => !acknowledgedPolicyIds.includes(p.id)).length;

//   return (
//     <Box p={3} component={Paper}>
//       <Box mb={2}>
//         <Typography
//           variant="h4"
//           gutterBottom
//           fontWeight="600"
//           sx={{ color: PRIMARY_COLOR }}
//         >
//           Policy Allocation
//         </Typography>
//         <Box display="flex" justifyContent="flex-end" mt={1}>
//           <TextField
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             placeholder="Search..."
//             size="small"
//             sx={{
//               minWidth: 300,
//               "& .MuiOutlinedInput-root": {
//                 "&.Mui-focused fieldset": {
//                   borderColor: PRIMARY_COLOR,
//                 },
//               },
//             }}
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <SearchIcon />
//                 </InputAdornment>
//               ),
//               endAdornment: searchTerm && (
//                 <InputAdornment position="end">
//                   <IconButton size="small" onClick={() => setSearchTerm("")}>
//                     <ClearIcon />
//                   </IconButton>
//                 </InputAdornment>
//               ),
//             }}
//           />
//         </Box>
//       </Box>

//       <TableContainer component={Paper} variant="outlined">
//         <Table>
//           <TableHead sx={{ backgroundColor: PRIMARY_COLOR }}>
//             <TableRow>
//               <TableCell sx={{ fontWeight: "bold", color: "white" }}>
//                 SR. NO.
//               </TableCell>
//               <TableCell sx={{ fontWeight: "bold", color: "white" }}>
//                 EMPLOYEES
//               </TableCell>
//               <TableCell sx={{ fontWeight: "bold", color: "white" }}>
//                 POLICIES
//               </TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {loading ? (
//               <TableRow>
//                 <TableCell colSpan={3} align="center" sx={{ p: 4 }}>
//                   <CircularProgress sx={{ color: PRIMARY_COLOR }} />
//                 </TableCell>
//               </TableRow>
//             ) : paginated.length > 0 ? (
//               paginated.map((row, index) => (
//                 <TableRow key={row.policy_allocation_id} hover>
//                   <TableCell>{page * rowsPerPage + index + 1}</TableCell>
//                   <TableCell>{row.employeeName}</TableCell>
//                   <TableCell sx={{ maxWidth: "400px" }}>
//                     <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
//                       {row.policies.map((p, i) => (
//                         <Chip
//                           key={i}
//                           label={p}
//                           size="small"
//                           sx={{ bgcolor: "grey.200" }}
//                         />
//                       ))}
//                     </Box>
//                   </TableCell>
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell colSpan={3} align="center" sx={{ p: 4 }}>
//                   No records found
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           flexWrap: "wrap",
//           py: 2,
//           px: { xs: 0, sm: 2 },
//           gap: 2,
//           flexDirection: { xs: "column", sm: "row" },
//         }}
//       >
//         <Typography variant="body2" color="text.secondary">
//           {`Showing ${
//             filtered.length > 0 ? page * rowsPerPage + 1 : 0
//           } to ${Math.min(
//             (page + 1) * rowsPerPage,
//             filtered.length
//           )} of ${filtered.length} results`}
//         </Typography>
//         <TablePagination
//           rowsPerPageOptions={[5, 10, 15, 25]}
//           component="div"
//           count={filtered.length}
//           rowsPerPage={rowsPerPage}
//           page={page}
//           onPageChange={(e, newPage) => setPage(newPage)}
//           onRowsPerPageChange={(e) => {
//             setRowsPerPage(parseInt(e.target.value, 10));
//             setPage(0);
//           }}
//           sx={{
//             p: 0,
//             "& .MuiIconButton-root": {
//               color: PRIMARY_COLOR,
//             },
//             "& .MuiIconButton-root.Mui-disabled": {
//               color: "rgba(0, 0, 0, 0.26)",
//             },
//           }}
//         />
//       </Box>

//       <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
//         <DialogTitle sx={{ color: PRIMARY_COLOR }}>
//           {editingId ? "Edit Allocation" : "Create New Allocation"}
//         </DialogTitle>
//         <DialogContent>
//           <FormControl fullWidth sx={{ my: 2 }}>
//             <InputLabel>Employee(s)</InputLabel>
//             <Select
//               multiple
//               value={selectedEmployees}
//               onChange={(e) =>
//                 setSelectedEmployees(
//                   typeof e.target.value === "string"
//                     ? e.target.value.split(",")
//                     : e.target.value
//                 )
//               }
//               input={<OutlinedInput label="Employee(s)" />}
//               disabled={!!editingId}
//               open={employeeSelectOpen}
//               onOpen={() => setEmployeeSelectOpen(true)}
//               onClose={() => setEmployeeSelectOpen(false)}
//               renderValue={(selected) => (
//                 <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
//                   {selected.map((val) => (
//                     <Chip
//                       key={val}
//                       label={employees.find((emp) => emp.id === val)?.name || val}
//                       size="small"
//                       sx={{
//                         backgroundColor: "#fff0e6",
//                         color: SECONDARY_COLOR,
//                         border: `1px solid ${SECONDARY_COLOR}`,
//                       }}
//                     />
//                   ))}
//                 </Box>
//               )}
//             >
//               {employees.map((emp) => (
//                 <MenuItem key={emp.id} value={emp.id}>
//                   {emp.name}
//                 </MenuItem>
//               ))}
//               <Box
//                 sx={{
//                   position: "sticky",
//                   bottom: 0,
//                   bgcolor: "background.paper",
//                   py: 1,
//                   px: 2,
//                   borderTop: 1,
//                   borderColor: "divider",
//                   display: "flex",
//                   justifyContent: "flex-end",
//                 }}
//               >
//                 <Button onClick={() => setEmployeeSelectOpen(false)} size="small">
//                   Close
//                 </Button>
//               </Box>
//             </Select>
//           </FormControl>
//           <FormControl fullWidth sx={{ my: 2 }}>
//             <InputLabel>Select Policies</InputLabel>
//             <Select
//               multiple
//               value={selectedPolicies}
//               onChange={handlePolicyChange}
//               input={<OutlinedInput label="Select Policies" />}
//               open={policySelectOpen}
//               onOpen={() => setPolicySelectOpen(true)}
//               onClose={() => setPolicySelectOpen(false)}
//               renderValue={(selected) => (
//                 <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
//                   {selected.map((id) => (
//                     <Chip
//                       key={id}
//                       label={policyMap.get(id) || id}
//                       size="small"
//                       sx={{
//                         backgroundColor: "#fff0e6",
//                         color: SECONDARY_COLOR,
//                         border: `1px solid ${SECONDARY_COLOR}`,
//                       }}
//                     />
//                   ))}
//                 </Box>
//               )}
//             >
//               <MenuItem value="all">
//                 <Checkbox
//                   checked={isAllSelected}
//                   indeterminate={
//                     selectedPolicies.length > 0 && !isAllSelected
//                   }
//                   sx={{ "&.Mui-checked": { color: PRIMARY_COLOR } }}
//                 />
//                 <ListItemText primary="Select All" />
//               </MenuItem>
//               {policies.map((policy) => {
//                 const isAcknowledged =
//                   !!editingId && acknowledgedPolicyIds.includes(policy.id);
//                 return (
//                   <MenuItem
//                     key={policy.id}
//                     value={policy.id}
//                     disabled={isAcknowledged}
//                   >
//                     <Checkbox
//                       checked={selectedPolicies.includes(policy.id)}
//                       disabled={isAcknowledged}
//                       sx={{ "&.Mui-checked": { color: PRIMARY_COLOR } }}
//                     />
//                     <ListItemText
//                       primary={policy.name}
//                       sx={isAcknowledged ? { color: "text.disabled" } : {}}
//                     />
//                   </MenuItem>
//                 );
//               })}
//               <Box
//                 sx={{
//                   position: "sticky",
//                   bottom: 0,
//                   bgcolor: "background.paper",
//                   py: 1,
//                   px: 2,
//                   borderTop: 1,
//                   borderColor: "divider",
//                   display: "flex",
//                   justifyContent: "flex-end",
//                 }}
//               >
//                 <Button onClick={() => setPolicySelectOpen(false)} size="small">
//                   Close
//                 </Button>
//               </Box>
//             </Select>
//           </FormControl>
//         </DialogContent>
//         <DialogActions>
//           <Button
//             onClick={handleClose}
//             sx={{
//               color: SECONDARY_COLOR,
//               borderColor: SECONDARY_COLOR,
//               "&:hover": {
//                 borderColor: "#e07e2b",
//                 backgroundColor: "rgba(245, 142, 53, 0.08)",
//               },
//             }}
//             variant="outlined"
//           >
//             Cancel
//           </Button>
//           <Button
//             onClick={handleSave}
//             variant="contained"
//             disabled={
//               selectedEmployees.length === 0 || selectedPolicies.length === 0
//             }
//             sx={{
//               backgroundColor: PRIMARY_COLOR,
//               "&:hover": { backgroundColor: "#7a1f6a" },
//             }}
//           >
//             {editingId ? "Update" : "Create"}
//           </Button>
//         </DialogActions>
//       </Dialog>
//       <Snackbar
//         open={snackbarInfo.open}
//         autoHideDuration={6000}
//         onClose={() => setSnackbarInfo({ ...snackbarInfo, open: false })}
//         anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
//       >
//         <Alert
//           onClose={() => setSnackbarInfo({ ...snackbarInfo, open: false })}
//           severity={snackbarInfo.severity}
//           variant="filled"
//           sx={{ width: "100%" }}
//         >
//           {snackbarInfo.message}
//         </Alert>
//       </Snackbar>
//     </Box>
//   );
// };

// export default PolicyAllocation;




import { useState, useEffect, useMemo } from "react";
import axiosInstance from "../../utils/axiosInstance";
import axios from "axios";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  Chip,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Snackbar,
  Alert,
  IconButton,
  InputAdornment,
  Checkbox,
  ListItemText,
  CircularProgress,
  Pagination, // Added import
  Skeleton,   // Added import
} from "@mui/material";
import {
  Search as SearchIcon,
  Clear as ClearIcon,
} from "@mui/icons-material";

const API_BASE_URL = "https://tdtlworld.com/hrms-backend";

const PRIMARY_COLOR = "#8C257C";
const PRIMARY_DARK_COLOR = "#6d1d60";
const SECONDARY_COLOR = "#F58E35";

const PolicyAllocation = () => {
  const [employees, setEmployees] = useState([]);
  const [policies, setPolicies] = useState([]);
  const [allocations, setAllocations] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [selectedPolicies, setSelectedPolicies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [snackbarInfo, setSnackbarInfo] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [acknowledgedPolicyIds, setAcknowledgedPolicyIds] = useState([]);
  const [employeeSelectOpen, setEmployeeSelectOpen] = useState(false);
  const [policySelectOpen, setPolicySelectOpen] = useState(false);

  const policyMap = useMemo(() => {
    return new Map(policies.map((p) => [p.id, p.name]));
  }, [policies]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      // ... (fetchData logic remains the same)
      const [allocationsRes, employeesRes, policiesRes] = await Promise.all([
        axios.get(`${API_BASE_URL}/api/policy-allocation/`),
        axios.get(`${API_BASE_URL}/employee-dropdown/`),
        axiosInstance.get(`/policies/`),
      ]);

      setEmployees(
        employeesRes.data.map((emp) => ({ id: emp.emp_id, name: emp.label }))
      );

      const allPolicies = policiesRes.data.data.map((policy) => ({
        id: policy.policy_id,
        name: policy.title,
      }));
      setPolicies(allPolicies);
      const localPolicyMap = new Map(allPolicies.map((p) => [p.id, p.name]));

      const processedAllocations = allocationsRes.data.data.map((alloc) => {
        const policyIds = alloc.policy_id
          ? alloc.policy_id.split(",").map((id) => parseInt(id.trim(), 10))
          : [];
        const policyStatuses = alloc.policy_acknowledgement_status
          ? alloc.policy_acknowledgement_status.split(",").map((s) => s.trim())
          : [];

        const uniquePolicies = new Map();
        policyIds.forEach((id, index) => {
          if (isNaN(id)) return;
          const isAcknowledged = policyStatuses[index] === "Y";
          const policyName = localPolicyMap.get(id) || "Unknown Policy";

          if (!uniquePolicies.has(id)) {
            uniquePolicies.set(id, {
              id,
              name: policyName,
              acknowledged: isAcknowledged,
            });
          } else if (isAcknowledged) {
            uniquePolicies.get(id).acknowledged = true;
          }
        });

        const detailedPolicies = Array.from(uniquePolicies.values());
        return {
          policy_allocation_id: alloc.policy_allocation_id,
          id: alloc.emp_id,
          employeeName: alloc.employee_name,
          detailedPolicies: detailedPolicies,
          policyIds: detailedPolicies.map((p) => p.id),
          policies: detailedPolicies
            .map((p) => p.name)
            .filter((name) => name !== "Unknown Policy"),
          allocationDate: alloc.allocation_date,
        };
      });

      const sortedAllocations = processedAllocations.sort(
        (a, b) => new Date(b.allocationDate) - new Date(a.allocationDate)
      );

      setAllocations(sortedAllocations);
    } catch (err) {
      console.error("Error fetching data:", err);
      setSnackbarInfo({
        open: true,
        message: "Error loading data.",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    // ... (handleClose logic remains the same)
    setOpen(false);
    setEditingId(null);
    setSelectedEmployees([]);
    setSelectedPolicies([]);
    setAcknowledgedPolicyIds([]);
  };

  const handleOpenCreate = () => {
     // ... (handleOpenCreate logic remains the same)
    setEditingId(null);
    setSelectedEmployees([]);
    setSelectedPolicies([]);
    setAcknowledgedPolicyIds([]);
    setOpen(true);
  };
  
  const handlePolicyChange = (e) => {
     // ... (handlePolicyChange logic remains the same)
    const value = e.target.value;
    if (value.includes("all")) {
      const allPolicyIds = policies.map((p) => p.id);
      const unacknowledgedPolicyIds = allPolicyIds.filter(
        (id) => !acknowledgedPolicyIds.includes(id)
      );
      setSelectedPolicies(
        selectedPolicies.length === unacknowledgedPolicyIds.length
          ? []
          : unacknowledgedPolicyIds
      );
    } else {
      setSelectedPolicies(value);
    }
  };

  const handleSave = async () => {
    // ... (handleSave logic remains the same)
    if (editingId) {
      try {
        const originalAllocation = allocations.find(
          (a) => a.policy_allocation_id === editingId
        );
        if (!originalAllocation)
          throw new Error("Original allocation not found.");

        const originalPolicyIds = originalAllocation.policyIds;
        const newPolicyIds = selectedPolicies;
        const policies_to_add_ids = newPolicyIds.filter(
          (id) => !originalPolicyIds.includes(id)
        );
        const policies_to_remove_ids = originalPolicyIds.filter(
          (id) =>
            !newPolicyIds.includes(id) && !acknowledgedPolicyIds.includes(id)
        );

        if (
          policies_to_add_ids.length === 0 &&
          policies_to_remove_ids.length === 0
        ) {
          setSnackbarInfo({
            open: true,
            message: "No changes detected.",
            severity: "info",
          });
          handleClose();
          return;
        }

        const policies_to_add_names = policies_to_add_ids.map((id) =>
          policyMap.get(id)
        );
        const policies_to_remove_names = policies_to_remove_ids.map((id) =>
          policyMap.get(id)
        );

        const payload = {
          employee_id: originalAllocation.id,
          policies_to_add: policies_to_add_names,
          policies_to_remove: policies_to_remove_names,
        };

        await axios.patch(
          `${API_BASE_URL}/api/policy-allocation/${editingId}/`,
          payload
        );
        setSnackbarInfo({
          open: true,
          message: "Policy allocation updated successfully.",
          severity: "success",
        });
        fetchData();
        handleClose();
      } catch (err) {
        console.error("Failed to update policy allocation:", err);
        setSnackbarInfo({
          open: true,
          message:
            err.response?.data?.detail || "Failed to update allocation.",
          severity: "error",
        });
      }
    } else {
      if (selectedEmployees.length === 0 || selectedPolicies.length === 0) {
        setSnackbarInfo({
          open: true,
          message: "Please select at least one employee and one policy.",
          severity: "warning",
        });
        return;
      }
      try {
        const payload = {
          employee_ids: selectedEmployees,
          policy_ids: selectedPolicies,
        };
        await axios.post(`${API_BASE_URL}/api/policy-allocation/`, payload);
        setSnackbarInfo({
          open: true,
          message: "Policy allocation created successfully.",
          severity: "success",
        });
        fetchData();
        handleClose();
      } catch (err) {
        console.error("Failed to create policy allocation:", err);
        setSnackbarInfo({
          open: true,
          message:
            err.response?.data?.detail || "Failed to create allocation.",
          severity: "error",
        });
      }
    }
  };

  const filtered = allocations.filter(
    (a) =>
      a.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.policies.some((p) => p.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const paginated = filtered.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );
  
  const isAllSelected =
    policies.length > 0 &&
    selectedPolicies.length ===
      policies.filter((p) => !acknowledgedPolicyIds.includes(p.id)).length;
      
  // New handlers for pagination
  const handlePaginationChange = (event, newPage) => {
    setPage(newPage - 1);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  
  const startEntry = filtered.length > 0 ? page * rowsPerPage + 1 : 0;
  const endEntry = Math.min((page + 1) * rowsPerPage, filtered.length);

  return (
    <Box p={3} component={Paper}>
      {/* ... (Header and Search bar remains the same) */}
      <Box mb={2}>
        <Typography
          variant="h4"
          gutterBottom
          fontWeight="600"
          sx={{ color: PRIMARY_COLOR }}
        >
          Policy Allocation
        </Typography>
        <Box display="flex" justifyContent="flex-end" mt={1}>
          <TextField
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search..."
            size="small"
            sx={{
              minWidth: 300,
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: PRIMARY_COLOR,
                },
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              endAdornment: searchTerm && (
                <InputAdornment position="end">
                  <IconButton size="small" onClick={() => setSearchTerm("")}>
                    <ClearIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </Box>

      <TableContainer component={Paper} variant="outlined">
        {/* ... (Table remains the same) */}
        <Table>
          <TableHead sx={{ backgroundColor: PRIMARY_COLOR }}>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold", color: "white" }}>
                SR. NO.
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "white" }}>
                EMPLOYEES
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "white" }}>
                POLICIES
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={3} align="center" sx={{ p: 4 }}>
                  <CircularProgress sx={{ color: PRIMARY_COLOR }} />
                </TableCell>
              </TableRow>
            ) : paginated.length > 0 ? (
              paginated.map((row, index) => (
                <TableRow key={row.policy_allocation_id} hover>
                  <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                  <TableCell>{row.employeeName}</TableCell>
                  <TableCell sx={{ maxWidth: "400px" }}>
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {row.policies.map((p, i) => (
                        <Chip
                          key={i}
                          label={p}
                          size="small"
                          sx={{ bgcolor: "grey.200" }}
                        />
                      ))}
                    </Box>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} align="center" sx={{ p: 4 }}>
                  No records found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* START: New Styled Pagination */}
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
                                  backgroundColor: PRIMARY_COLOR,
                                  color: 'white',
                                  borderRadius: '4px',
                                  transition: 'background-color 0.3s',
                                  '&:hover': {
                                      backgroundColor: PRIMARY_DARK_COLOR,
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
                         {`Showing ${startEntry} to ${endEntry} of ${filtered.length} results`}
                      </Typography>
                  </Box>

                  <Pagination
                      count={Math.ceil(filtered.length / rowsPerPage)}
                      page={page + 1}
                      onChange={handlePaginationChange}
                      showFirstButton
                      showLastButton
                      sx={{
                          '& .MuiPaginationItem-root': {
                              borderRadius: '4px',
                              transition: 'background-color 0.3s, color 0.3s',
                              '&:hover': {
                                  backgroundColor: SECONDARY_COLOR,
                                  color: 'white',
                              }
                          },
                          '& .MuiPaginationItem-page':{
                              color: PRIMARY_COLOR,
                              '&.Mui-selected': {
                                  backgroundColor: PRIMARY_COLOR,
                                  color: 'white',
                                  '&:hover': {
                                      backgroundColor: SECONDARY_COLOR,
                                  }
                              },
                          },
                           '& .MuiPaginationItem-icon': {
                              color: PRIMARY_COLOR,
                          }
                      }}
                  />
              </Box>
          )}
      </Box>
      {/* END: New Styled Pagination */}
      
      {/* ... (Dialog and Snackbar components remain the same) */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ color: PRIMARY_COLOR }}>
          {editingId ? "Edit Allocation" : "Create New Allocation"}
        </DialogTitle>
        <DialogContent>
          <FormControl fullWidth sx={{ my: 2 }}>
            <InputLabel>Employee(s)</InputLabel>
            <Select
              multiple
              value={selectedEmployees}
              onChange={(e) =>
                setSelectedEmployees(
                  typeof e.target.value === "string"
                    ? e.target.value.split(",")
                    : e.target.value
                )
              }
              input={<OutlinedInput label="Employee(s)" />}
              disabled={!!editingId}
              open={employeeSelectOpen}
              onOpen={() => setEmployeeSelectOpen(true)}
              onClose={() => setEmployeeSelectOpen(false)}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((val) => (
                    <Chip
                      key={val}
                      label={employees.find((emp) => emp.id === val)?.name || val}
                      size="small"
                      sx={{
                        backgroundColor: "#fff0e6",
                        color: SECONDARY_COLOR,
                        border: `1px solid ${SECONDARY_COLOR}`,
                      }}
                    />
                  ))}
                </Box>
              )}
            >
              {employees.map((emp) => (
                <MenuItem key={emp.id} value={emp.id}>
                  {emp.name}
                </MenuItem>
              ))}
              <Box
                sx={{
                  position: "sticky",
                  bottom: 0,
                  bgcolor: "background.paper",
                  py: 1,
                  px: 2,
                  borderTop: 1,
                  borderColor: "divider",
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <Button onClick={() => setEmployeeSelectOpen(false)} size="small">
                  Close
                </Button>
              </Box>
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ my: 2 }}>
            <InputLabel>Select Policies</InputLabel>
            <Select
              multiple
              value={selectedPolicies}
              onChange={handlePolicyChange}
              input={<OutlinedInput label="Select Policies" />}
              open={policySelectOpen}
              onOpen={() => setPolicySelectOpen(true)}
              onClose={() => setPolicySelectOpen(false)}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((id) => (
                    <Chip
                      key={id}
                      label={policyMap.get(id) || id}
                      size="small"
                      sx={{
                        backgroundColor: "#fff0e6",
                        color: SECONDARY_COLOR,
                        border: `1px solid ${SECONDARY_COLOR}`,
                      }}
                    />
                  ))}
                </Box>
              )}
            >
              <MenuItem value="all">
                <Checkbox
                  checked={isAllSelected}
                  indeterminate={
                    selectedPolicies.length > 0 && !isAllSelected
                  }
                  sx={{ "&.Mui-checked": { color: PRIMARY_COLOR } }}
                />
                <ListItemText primary="Select All" />
              </MenuItem>
              {policies.map((policy) => {
                const isAcknowledged =
                  !!editingId && acknowledgedPolicyIds.includes(policy.id);
                return (
                  <MenuItem
                    key={policy.id}
                    value={policy.id}
                    disabled={isAcknowledged}
                  >
                    <Checkbox
                      checked={selectedPolicies.includes(policy.id)}
                      disabled={isAcknowledged}
                      sx={{ "&.Mui-checked": { color: PRIMARY_COLOR } }}
                    />
                    <ListItemText
                      primary={policy.name}
                      sx={isAcknowledged ? { color: "text.disabled" } : {}}
                    />
                  </MenuItem>
                );
              })}
              <Box
                sx={{
                  position: "sticky",
                  bottom: 0,
                  bgcolor: "background.paper",
                  py: 1,
                  px: 2,
                  borderTop: 1,
                  borderColor: "divider",
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <Button onClick={() => setPolicySelectOpen(false)} size="small">
                  Close
                </Button>
              </Box>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            sx={{
              color: SECONDARY_COLOR,
              borderColor: SECONDARY_COLOR,
              "&:hover": {
                borderColor: "#e07e2b",
                backgroundColor: "rgba(245, 142, 53, 0.08)",
              },
            }}
            variant="outlined"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            variant="contained"
            disabled={
              (editingId ? false : selectedEmployees.length === 0) || selectedPolicies.length === 0
            }
            sx={{
              backgroundColor: PRIMARY_COLOR,
              "&:hover": { backgroundColor: "#7a1f6a" },
            }}
          >
            {editingId ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbarInfo.open}
        autoHideDuration={6000}
        onClose={() => setSnackbarInfo({ ...snackbarInfo, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbarInfo({ ...snackbarInfo, open: false })}
          severity={snackbarInfo.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbarInfo.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default PolicyAllocation;