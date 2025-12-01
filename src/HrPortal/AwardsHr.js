// import React, { useState, useEffect } from 'react';
// import {
//   Box,
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
//   IconButton,
// } from '@mui/material';
// import {
//   Edit as EditIcon,
//   Delete as DeleteIcon,
// } from '@mui/icons-material';

// export default function AwardManagement() {
//   const [activeTab, setActiveTab] = useState(0);
//   const [awards, setAwards] = useState([]);
//   const [awardTypes, setAwardTypes] = useState([
//     { id: 1, name: 'Best Employee This Month', createdAt: '28/10/2021' },
//     { id: 2, name: 'Exceptional Performance', createdAt: '06/07/2022' }
//   ]);
//   const [entriesPerPage, setEntriesPerPage] = useState(10);
//   const [searchTerm, setSearchTerm] = useState('');

//   useEffect(() => {
//     const fetchAwards = async () => {
//       const response = await new Promise(resolve => 
//         setTimeout(() => resolve([
//           { id: 1, awardType: 'Best Employee This Month', employee: 'John Doe', awardGift: 'Trophy', awardCash: '1000', monthYear: '2023-11' },
//           { id: 2, awardType: 'Exceptional Performance', employee: 'Jane Smith', awardGift: 'Certificate', awardCash: '500', monthYear: '2023-10' },
//         ]), 1000)
//       );
//       setAwards(response);
//     };

//     fetchAwards();
//   }, []);

//   const handleTabChange = (event, newValue) => {
//     setActiveTab(newValue);
//   };

//   const filteredAwards = awards.filter(award => 
//     Object.values(award).some(value => 
//       value.toString().toLowerCase().includes(searchTerm.toLowerCase())
//     )
//   );

//   const filteredAwardTypes = awardTypes.filter(type => 
//     type.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const AwardsList = () => (
//     <Box>
//       <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
//         <Box sx={{ display: 'flex', alignItems: 'center' }}>
//           <Typography variant="body2" sx={{ mr: 1 }}>Show</Typography>
//           <Select
//             size="small"
//             value={entriesPerPage}
//             onChange={(e) => setEntriesPerPage(e.target.value)}
//           >
//             <MenuItem value={10}>10</MenuItem>
//             <MenuItem value={25}>25</MenuItem>
//             <MenuItem value={50}>50</MenuItem>
//           </Select>
//           <Typography variant="body2" sx={{ ml: 1 }}>entries</Typography>
//         </Box>
//         <TextField
//           size="small"
//           placeholder="Search..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//       </Box>

//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>AWARD TYPE</TableCell>
//               <TableCell>EMPLOYEE</TableCell>
//               <TableCell>AWARD GIFT</TableCell>
//               <TableCell>AWARD CASH</TableCell>
//               <TableCell>MONTH & YEAR</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {filteredAwards.length === 0 ? (
//               <TableRow>
//                 <TableCell colSpan={5} align="center">No records available</TableCell>
//               </TableRow>
//             ) : (
//               filteredAwards.map((award) => (
//                 <TableRow key={award.id}>
//                   <TableCell>{award.awardType}</TableCell>
//                   <TableCell>{award.employee}</TableCell>
//                   <TableCell>{award.awardGift}</TableCell>
//                   <TableCell>{award.awardCash}</TableCell>
//                   <TableCell>{award.monthYear}</TableCell>
//                 </TableRow>
//               ))
//             )}
//           </TableBody>
//         </Table>
//       </TableContainer>
//       <Typography variant="body2" sx={{ mt: 2 }}>
//         Showing 1 to {filteredAwards.length} of {awards.length} entries
//       </Typography>
//     </Box>
//   );

//   const AwardTypesList = () => (
//     <Box>
//       <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
//         <Box sx={{ display: 'flex', alignItems: 'center' }}>
//           <Typography variant="body2" sx={{ mr: 1 }}>Show</Typography>
//           <Select
//             size="small"
//             value={entriesPerPage}
//             onChange={(e) => setEntriesPerPage(e.target.value)}
//           >
//             <MenuItem value={10}>10</MenuItem>
//             <MenuItem value={25}>25</MenuItem>
//             <MenuItem value={50}>50</MenuItem>
//           </Select>
//           <Typography variant="body2" sx={{ ml: 1 }}>entries</Typography>
//         </Box>
//         <TextField
//           size="small"
//           placeholder="Search..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//       </Box>

//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>AWARD TYPE</TableCell>
//               <TableCell>CREATED AT</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {filteredAwardTypes.map((type) => (
//               <TableRow key={type.id}>
//                 <TableCell>{type.name}</TableCell>
//                 <TableCell>{type.createdAt}</TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//       <Typography variant="body2" sx={{ mt: 2 }}>
//         Showing 1 to {filteredAwardTypes.length} of {awardTypes.length} entries
//       </Typography>
//     </Box>
//   );

//   return (
//     <Box sx={{ p: 3 }}>
//       <Tabs value={activeTab} onChange={handleTabChange} sx={{ mb: 3 }}>
//         <Tab label="Awards" sx={{ fontWeight: 'bold', height: 48 }} />
//         <Tab label="Award Types" sx={{ fontWeight: 'bold', height: 48 }} />
//       </Tabs>

//       {activeTab === 0 ? <AwardsList /> : <AwardTypesList />}
//     </Box>
//   );
// }








// import React, { useState, useEffect } from 'react';
// import {
//   Box,
//   Typography,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TextField,
//   Tabs,
//   Tab,
//   IconButton,
//   Button,
//   InputAdornment,
//   TablePagination,
//   Skeleton,
//   useTheme,
//   useMediaQuery,
// } from '@mui/material';
// import {
//   Edit as EditIcon,
//   Delete as DeleteIcon,
//   Add as AddIcon,
//   Search as SearchIcon,
// } from '@mui/icons-material';
// import Swal from 'sweetalert2';

// // Mock data fetching functions
// const fetchAwardsData = () => new Promise(resolve =>
//   setTimeout(() => resolve([
//     { id: 1, awardType: 'Best Employee This Month', employee: 'John Doe', awardGift: 'Trophy', awardCash: '1000', monthYear: '2023-11' },
//     { id: 2, awardType: 'Exceptional Performance', employee: 'Jane Smith', awardGift: 'Certificate', awardCash: '500', monthYear: '2023-10' },
//     { id: 3, awardType: 'Innovator of the Quarter', employee: 'Peter Jones', awardGift: 'Plaque', awardCash: '750', monthYear: '2023-09' },
//   ]), 1500)
// );

// const fetchAwardTypesData = () => new Promise(resolve =>
//   setTimeout(() => resolve([
//     { id: 1, name: 'Best Employee This Month', createdAt: '28/10/2021' },
//     { id: 2, name: 'Exceptional Performance', createdAt: '06/07/2022' },
//     { id: 3, name: 'Innovator of the Quarter', createdAt: '15/03/2022' },
//     { id: 4, name: 'Team Player Award', createdAt: '20/01/2023' },
//   ]), 1500)
// );


// // Reusable DataTable Component
// const DataTable = ({
//   data,
//   columns,
//   loading,
//   page,
//   rowsPerPage,
//   totalRows,
//   onPageChange,
//   onRowsPerPageChange,
// }) => {

//   const handleEdit = (row) => {
//     // Placeholder for Edit Dialog
//     Swal.fire({
//       icon: 'info',
//       title: 'Edit Action',
//       text: `Editing item: ${row.employee || row.name}`,
//       timer: 3000,
//       showConfirmButton: false,
//     });
//   };

//   const handleDelete = (row) => {
//     Swal.fire({
//       title: 'Are you sure?',
//       text: "You won't be able to revert this!",
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#8C257C',
//       cancelButtonColor: '#757575',
//       confirmButtonText: 'Yes, delete it!'
//     }).then((result) => {
//       if (result.isConfirmed) {
//         // Placeholder for actual delete logic
//         Swal.fire({
//           title: 'Deleted!',
//           text: 'The record has been deleted.',
//           icon: 'success',
//           timer: 3000,
//           showConfirmButton: false,
//         });
//       }
//     });
//   };

//   const paginatedData = data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

//   return (
//     <>
//       <TableContainer>
//         <Table sx={{ minWidth: '100%', whiteSpace: 'nowrap' }}>
//           <TableHead sx={{ backgroundColor: '#8C257C' }}>
//             <TableRow>
//               {columns.map((col) => (
//                 <TableCell key={col.id} sx={{ color: '#FFFFFF', fontWeight: 'bold' }}>
//                   {col.label}
//                 </TableCell>
//               ))}
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {loading ? (
//               Array.from(new Array(rowsPerPage)).map((_, index) => (
//                 <TableRow key={index}>
//                   {columns.map((col) => (
//                     <TableCell key={col.id}>
//                       {col.id === 'actions' ? (
//                         <Skeleton variant="rectangular" width={100} height={30} />
//                       ) : (
//                         <Skeleton variant="text" />
//                       )}
//                     </TableCell>
//                   ))}
//                 </TableRow>
//               ))
//             ) : paginatedData.length === 0 ? (
//               <TableRow>
//                 <TableCell colSpan={columns.length} align="center">
//                   No records available
//                 </TableCell>
//               </TableRow>
//             ) : (
//               paginatedData.map((row, index) => (
//                 <TableRow key={row.id} hover sx={{ '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' } }}>
//                   <TableCell sx={{ fontSize: '0.95rem' }}>{page * rowsPerPage + index + 1}</TableCell>
//                   {columns.slice(1, -1).map((col) => (
//                     <TableCell key={col.id} sx={{ fontSize: '0.95rem' }}>{row[col.id]}</TableCell>
//                   ))}
//                   <TableCell>
//                     <Box display="flex" justifyContent="center" gap={0.5}>
//                       <IconButton size="small" onClick={() => handleEdit(row)}>
//                         <EditIcon fontSize="small" />
//                       </IconButton>
//                       <IconButton size="small" onClick={() => handleDelete(row)}>
//                         <DeleteIcon fontSize="small" />
//                       </IconButton>
//                     </Box>
//                   </TableCell>
//                 </TableRow>
//               ))
//             )}
//           </TableBody>
//         </Table>
//       </TableContainer>
      
//       <Box
//         sx={{
//           display: 'flex',
//           flexDirection: isMobile ? 'column' : 'row',
//           justifyContent: 'space-between',
//           alignItems: 'center',
//           mt: 2,
//           gap: 2,
//         }}
//       >
//         <Typography variant="body2" color="text.secondary">
//           Showing {paginatedData.length > 0 ? page * rowsPerPage + 1 : 0} to {page * rowsPerPage + paginatedData.length} of {totalRows} results
//         </Typography>
//         <TablePagination
//           component="div"
//           count={totalRows}
//           page={page}
//           onPageChange={onPageChange}
//           rowsPerPage={rowsPerPage}
//           onRowsPerPageChange={onRowsPerPageChange}
//           rowsPerPageOptions={[5, 10, 15, 25]}
//           sx={{
//             '& .MuiSvgIcon-root': { color: '#8C257C' },
//             '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': {
//               color: 'text.secondary',
//             }
//           }}
//         />
//       </Box>
//     </>
//   );
// };


// // Main Component
// export default function AwardManagement() {
//   const [activeTab, setActiveTab] = useState(0);
//   const [awards, setAwards] = useState([]);
//   const [awardTypes, setAwardTypes] = useState([]);
//   const [loading, setLoading] = useState(true);
  
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [searchTerm, setSearchTerm] = useState('');

//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       const [awardsResponse, awardTypesResponse] = await Promise.all([
//         fetchAwardsData(),
//         fetchAwardTypesData(),
//       ]);
//       setAwards(awardsResponse);
//       setAwardTypes(awardTypesResponse);
//       setLoading(false);
//     };

//     fetchData();
//   }, []);
  
//   const handleTabChange = (event, newValue) => {
//     setActiveTab(newValue);
//     setSearchTerm(''); // Reset search on tab change
//     setPage(0); // Reset pagination on tab change
//   };

//   const handlePageChange = (event, newPage) => {
//     setPage(newPage);
//   };
  
//   const handleRowsPerPageChange = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const handleAddNew = () => {
//     // Placeholder for Add Dialog
//     Swal.fire({
//       icon: 'info',
//       title: `Add New ${activeTab === 0 ? 'Award' : 'Award Type'}`,
//       text: 'This will open a form dialog.',
//       timer: 3000,
//       showConfirmButton: false,
//     });
//   };

//   const filteredAwards = awards.filter(award =>
//     Object.values(award).some(value =>
//       String(value).toLowerCase().includes(searchTerm.toLowerCase())
//     )
//   );

//   const filteredAwardTypes = awardTypes.filter(type =>
//     Object.values(type).some(value =>
//       String(value).toLowerCase().includes(searchTerm.toLowerCase())
//     )
//   );
  
//   const awardsColumns = [
//     { id: 'sr_no', label: 'SR NO.' },
//     { id: 'awardType', label: 'AWARD TYPE' },
//     { id: 'employee', label: 'EMPLOYEE' },
//     { id: 'awardGift', label: 'AWARD GIFT' },
//     { id: 'awardCash', label: 'AWARD CASH' },
//     { id: 'monthYear', label: 'MONTH & YEAR' },
//     { id: 'actions', label: 'ACTIONS' },
//   ];

//   const awardTypesColumns = [
//     { id: 'sr_no', label: 'SR NO.' },
//     { id: 'name', label: 'AWARD TYPE' },
//     { id: 'createdAt', label: 'CREATED AT' },
//     { id: 'actions', label: 'ACTIONS' },
//   ];

//   return (
//     <Box component={Paper} p={3}>
//       <Typography variant="h5" color="#8C257C" fontWeight="bold" mb={2}>
//         Award Management
//       </Typography>

//       <Box
//         sx={{
//           display: 'flex',
//           flexDirection: isMobile ? 'column' : 'row',
//           justifyContent: 'space-between',
//           alignItems: 'center',
//           mb: 2,
//           gap: 2,
//         }}
//       >
//         <Button
//           variant="contained"
//           startIcon={<AddIcon />}
//           onClick={handleAddNew}
//           sx={{
//             backgroundColor: '#8C257C',
//             color: '#FFFFFF',
//             '&:hover': {
//               backgroundColor: '#6d1d60',
//             },
//             width: isMobile ? '100%' : 'auto',
//           }}
//         >
//           Add New
//         </Button>
//         <TextField
//           size="small"
//           placeholder="Search..."
//           value={searchTerm}
//           onChange={(e) => {
//             setSearchTerm(e.target.value);
//             setPage(0); // Reset page to 0 on search
//           }}
//           InputProps={{
//             startAdornment: (
//               <InputAdornment position="start">
//                 <SearchIcon />
//               </InputAdornment>
//             ),
//           }}
//           sx={{ width: isMobile ? '100%' : 'auto' }}
//         />
//       </Box>

//       <Tabs value={activeTab} onChange={handleTabChange} sx={{ mb: 3 }}>
//         <Tab label="Awards" sx={{ fontWeight: 'bold' }} />
//         <Tab label="Award Types" sx={{ fontWeight: 'bold' }} />
//       </Tabs>
      
//       {activeTab === 0 ? (
//         <DataTable
//           data={filteredAwards}
//           columns={awardsColumns}
//           loading={loading}
//           page={page}
//           rowsPerPage={rowsPerPage}
//           totalRows={filteredAwards.length}
//           onPageChange={handlePageChange}
//           onRowsPerPageChange={handleRowsPerPageChange}
//         />
//       ) : (
//         <DataTable
//           data={filteredAwardTypes}
//           columns={awardTypesColumns}
//           loading={loading}
//           page={page}
//           rowsPerPage={rowsPerPage}
//           totalRows={filteredAwardTypes.length}
//           onPageChange={handlePageChange}
//           onRowsPerPageChange={handleRowsPerPageChange}
//         />
//       )}
//     </Box>
//   );
// }








// import React, { useState, useEffect } from 'react';
// import {
//   Box,
//   Typography,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TextField,
//   Tabs,
//   Tab,
//   IconButton,
//   Button,
//   InputAdornment,
//   TablePagination,
//   Skeleton,
//   useTheme,
//   useMediaQuery,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Grid,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   CircularProgress,
// } from '@mui/material';
// import {
//   Edit as EditIcon,
//   Delete as DeleteIcon,
//   Add as AddIcon,
//   Search as SearchIcon,
// } from '@mui/icons-material';
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

// const DataTable = ({
//   data,
//   columns,
//   loading,
//   page,
//   rowsPerPage,
//   onEdit,
//   onDelete,
//   activeTab,
// }) => {
//   const paginatedData = data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

//   return (
//     <TableContainer>
//       <Table sx={{ minWidth: '100%', whiteSpace: 'nowrap' }}>
//         <TableHead sx={{ backgroundColor: '#8C257C' }}>
//           <TableRow>
//             {columns.map((col) => (
//               <TableCell key={col.id} sx={{ color: '#FFFFFF', fontWeight: 'bold' }}>
//                 {col.label}
//               </TableCell>
//             ))}
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {loading ? (
//             Array.from(new Array(rowsPerPage)).map((_, index) => (
//               <TableRow key={index}>
//                 {columns.map((col) => (
//                   <TableCell key={col.id}>
//                     {col.id === 'actions' ? (
//                       <Skeleton variant="rectangular" width={70} height={30} />
//                     ) : (
//                       <Skeleton variant="text" />
//                     )}
//                   </TableCell>
//                 ))}
//               </TableRow>
//             ))
//           ) : paginatedData.length === 0 ? (
//             <TableRow>
//               <TableCell colSpan={columns.length} align="center" sx={{ py: 5 }}>
//                 No records available
//               </TableCell>
//             </TableRow>
//           ) : (
//             paginatedData.map((row, index) => (
//               <TableRow key={activeTab === 0 ? row.award_id : row.value} hover>
//                 <TableCell sx={{ fontSize: '0.95rem' }}>{page * rowsPerPage + index + 1}</TableCell>
//                 {columns.slice(1, -1).map((col) => (
//                    <TableCell key={col.id} sx={{ fontSize: '0.95rem' }}>
//                     {col.id === 'cash_price' ? `₹${Number.parseInt(row[col.id] || 0)}` :
//                      col.id === 'created_at' ? new Date(row[col.id]).toLocaleDateString() :
//                      row[col.id] || "N/A"}
//                   </TableCell>
//                 ))}
//                 <TableCell>
//                   <Box display="flex" justifyContent="center" gap={0.5}>
//                     <IconButton size="small" onClick={() => onEdit(row)} sx={{ color: '#8C257C' }}>
//                       <EditIcon fontSize="small" />
//                     </IconButton>
//                     <IconButton size="small" onClick={() => onDelete(row)} color="error">
//                       <DeleteIcon fontSize="small" />
//                     </IconButton>
//                   </Box>
//                 </TableCell>
//               </TableRow>
//             ))
//           )}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// };

// export default function AwardManagement() {
//   const API_BASE_URL = "https://tdtlworld.com/hrms-backend";
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

//   const [activeTab, setActiveTab] = useState(0);
//   const [awards, setAwards] = useState([]);
//   const [awardTypes, setAwardTypes] = useState([]);
//   const [employees, setEmployees] = useState([]);
  
//   const [loadingAwards, setLoadingAwards] = useState(true);
//   const [loadingAwardTypes, setLoadingAwardTypes] = useState(true);
//   const [loadingEmployees, setLoadingEmployees] = useState(true);

//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);
//   const [searchTerm, setSearchTerm] = useState('');
  
//   const [dialogOpen, setDialogOpen] = useState(false);
//   const [isSaving, setIsSaving] = useState(false);
//   const [editingData, setEditingData] = useState(null);
  
//   const initialFormData = { employee_id: "", award_type_id: "", gift_item: "", cash_price: "0", award_month_year: "", award_information: "" };
//   const [formData, setFormData] = useState(initialFormData);
//   const [newAwardTypeName, setNewAwardTypeName] = useState("");

//   const fetchData = async (url, setData, setLoading) => {
//     setLoading(true);
//     try {
//       const response = await fetch(url);
//       if (!response.ok) throw new Error("Network response was not ok");
//       const data = await response.json();
//       setData(Array.isArray(data) ? data : []);
//     } catch (error) {
//       showNotification(`Error fetching data from ${url}`, "error");
//       setData([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchAllData = () => {
//     fetchData(`${API_BASE_URL}/api/awards/`, setAwards, setLoadingAwards);
//     fetchData(`${API_BASE_URL}/api/award-types/`, setAwardTypes, setLoadingAwardTypes);
//     fetchData(`${API_BASE_URL}/employee-dropdown/`, setEmployees, setLoadingEmployees);
//   };

//   useEffect(() => {
//     fetchAllData();
//   }, []);
  
//   const handleTabChange = (event, newValue) => {
//     setActiveTab(newValue);
//     setSearchTerm('');
//     setPage(0);
//   };

//   const handlePageChange = (event, newPage) => {
//     setPage(newPage);
//   };
  
//   const handleRowsPerPageChange = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const handleOpenDialog = (data = null) => {
//     setEditingData(data);
//     if (activeTab === 0) {
//       if (data) {
//         setFormData({
//             employee_id: data.employee_id || "",
//             award_type_id: data.award_type_id || "",
//             gift_item: data.gift_item || "",
//             cash_price: Number.parseInt(data.cash_price || 0).toString(),
//             award_month_year: data.award_month_year ? data.award_month_year.substring(0, 7) : "",
//             award_information: data.award_information || "",
//         });
//       } else {
//         setFormData(initialFormData);
//       }
//     } else {
//       setNewAwardTypeName(data ? data.label : "");
//     }
//     setDialogOpen(true);
//   };

//   const handleCloseDialog = () => {
//     setDialogOpen(false);
//     setEditingData(null);
//   };

//   const handleFormSubmit = async () => {
//     setIsSaving(true);
//     let url, method, body, successMessage;

//     if (activeTab === 0) {
//       const submitData = new FormData();
//       Object.keys(formData).forEach(key => submitData.append(key, formData[key]));
//       submitData.append("company_id", "2");

//       url = editingData ? `${API_BASE_URL}/api/awards/${editingData.award_id}/` : `${API_BASE_URL}/api/awards/`;
//       method = editingData ? "PATCH" : "POST";
//       body = submitData;
//       successMessage = `Award ${editingData ? 'updated' : 'added'} successfully!`;
//     } else {
//       url = editingData ? `${API_BASE_URL}/api/award-types/${editingData.value}/` : `${API_BASE_URL}/api/award-types/`;
//       method = editingData ? "PATCH" : "POST";
//       body = JSON.stringify({ category_name: newAwardTypeName.trim() });
//       successMessage = `Award type ${editingData ? 'updated' : 'updated'} successfully!`;
//     }

//     try {
//       const headers = activeTab === 0 ? {} : { "Content-Type": "application/json" };
//       const response = await fetch(url, { method, body, headers });
//       if (!response.ok) throw new Error("Failed to save data");

//       showNotification(successMessage, "success");
//       fetchAllData();
//       handleCloseDialog();
//     } catch (error) {
//       showNotification(`Failed to ${editingData ? 'update' : 'add'} record`, "error");
//     } finally {
//       setIsSaving(false);
//     }
//   };
  
//   const handleDelete = (rowToDelete) => {
//     const id = activeTab === 0 ? rowToDelete.award_id : rowToDelete.value;
//     const url = activeTab === 0 ? `${API_BASE_URL}/api/awards/${id}/` : `${API_BASE_URL}/api/award-types/${id}/`;
    
//     MySwal.fire({
//       title: 'Are you sure?',
//       text: "You won't be able to revert this!",
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#8C257C',
//       cancelButtonColor: '#d33',
//       confirmButtonText: 'Yes, delete it!'
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         try {
//           const response = await fetch(url, { method: "DELETE" });
//           if (!response.ok) throw new Error("Failed to delete");
//           showNotification("Record deleted successfully!", "success");
//           fetchAllData();
//         } catch (error) {
//           showNotification("Failed to delete record", "error");
//         }
//       }
//     });
//   };

//   const dataToDisplay = activeTab === 0 ? awards : awardTypes;
//   const filteredData = dataToDisplay.filter(item =>
//     Object.values(item).some(value =>
//       value && String(value).toLowerCase().includes(searchTerm.toLowerCase())
//     )
//   );
  
//   const awardsColumns = [
//     { id: 'sr_no', label: 'SR NO.' },
//     { id: 'award_type_name', label: 'AWARD TYPE' },
//     { id: 'employee_name', label: 'EMPLOYEE' },
//     { id: 'gift_item', label: 'GIFT' },
//     { id: 'cash_price', label: 'CASH' },
//     { id: 'award_month_year', label: 'MONTH & YEAR' },
//     { id: 'actions', label: 'ACTIONS' },
//   ];

//   const awardTypesColumns = [
//     { id: 'sr_no', label: 'SR NO.' },
//     { id: 'label', label: 'AWARD TYPE' },
//     { id: 'created_at', label: 'CREATED AT' },
//     { id: 'actions', label: 'ACTIONS' },
//   ];
  
//   const currentColumns = activeTab === 0 ? awardsColumns : awardTypesColumns;
//   const isLoading = activeTab === 0 ? loadingAwards : loadingAwardTypes;

//   return (
//     <Box component={Paper} elevation={2} p={3}>
//       <Typography variant="h5" color="#8C257C" fontWeight="bold" mb={2}>
//         Awards
//       </Typography>

//       <Box sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', alignItems: 'center', mb: 2, gap: 2 }}>
//         <Button
//           variant="contained"
//           startIcon={<AddIcon />}
//           onClick={() => handleOpenDialog()}
//           sx={{ backgroundColor: '#8C257C', '&:hover': { backgroundColor: '#6d1d60' }, width: isMobile ? '100%' : 'auto' }}
//         >
//           Add New
//         </Button>
//         <TextField
//           size="small"
//           placeholder="Search..."
//           value={searchTerm}
//           onChange={(e) => { setSearchTerm(e.target.value); setPage(0); }}
//           InputProps={{ startAdornment: (<InputAdornment position="start"><SearchIcon /></InputAdornment>) }}
//           sx={{ width: isMobile ? '100%' : 300 }}
//         />
//       </Box>

//       <Tabs value={activeTab} onChange={handleTabChange} sx={{ mb: 3, borderBottom: 1, borderColor: 'divider' }}>
//         <Tab label="Awards" sx={{ fontWeight: 'bold', '&.Mui-selected': { color: '#8C257C' } }} />
//         <Tab label="Award Types" sx={{ fontWeight: 'bold', '&.Mui-selected': { color: '#8C257C' } }} />
//       </Tabs>
      
//       <DataTable
//         data={filteredData}
//         columns={currentColumns}
//         loading={isLoading}
//         page={page}
//         rowsPerPage={rowsPerPage}
//         onEdit={handleOpenDialog}
//         onDelete={handleDelete}
//         activeTab={activeTab}
//       />
      
//       <TablePagination
//         component="div"
//         count={filteredData.length}
//         page={page}
//         onPageChange={handlePageChange}
//         rowsPerPage={rowsPerPage}
//         onRowsPerPageChange={handleRowsPerPageChange}
//         rowsPerPageOptions={[5, 10, 15, 25]}
//         sx={{ mt: 2 }}
//       />
      
//       <Dialog open={dialogOpen} onClose={handleCloseDialog} fullWidth maxWidth="md">
//         <DialogTitle sx={{ color: '#8C257C', fontWeight: 'bold' }}>
//           {editingData ? 'Edit' : 'Add New'} {activeTab === 0 ? 'Award' : 'Award Type'}
//         </DialogTitle>
//         <DialogContent>
//           {activeTab === 0 ? (
//             <Grid container spacing={2.5} sx={{ mt: 1 }}>
//               <Grid item xs={12} sm={6}>
//                 <FormControl fullWidth size="small" required>
//                   <InputLabel>Employee</InputLabel>
//                   <Select value={formData.employee_id} onChange={(e) => setFormData(p => ({...p, employee_id: e.target.value}))} label="Employee" disabled={isSaving || loadingEmployees}>
//                     {loadingEmployees ? <MenuItem disabled><CircularProgress size={20} sx={{mr: 1}} /> Loading...</MenuItem> : 
//                      employees.map((emp) => (<MenuItem key={emp.value} value={emp.value}>{`${emp.label} ( ${emp.emp_id})`}</MenuItem>))}
//                   </Select>
//                 </FormControl>
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <FormControl fullWidth size="small" required>
//                   <InputLabel>Award Type</InputLabel>
//                   <Select value={formData.award_type_id} onChange={(e) => setFormData(p => ({...p, award_type_id: e.target.value}))} label="Award Type" disabled={isSaving || loadingAwardTypes}>
//                     {loadingAwardTypes ? <MenuItem disabled><CircularProgress size={20} sx={{mr: 1}} /> Loading...</MenuItem> :
//                      awardTypes.map((type) => (<MenuItem key={type.value} value={type.value}>{type.label}</MenuItem>))}
//                   </Select>
//                 </FormControl>
//               </Grid>
//               <Grid item xs={12} sm={6}><TextField fullWidth size="small" type="month" label="Month & Year" required value={formData.award_month_year} onChange={(e) => setFormData(p => ({...p, award_month_year: e.target.value}))} InputLabelProps={{ shrink: true }} disabled={isSaving} /></Grid>
//               <Grid item xs={12} sm={6}><TextField fullWidth size="small" label="Gift Item" value={formData.gift_item} onChange={(e) => setFormData(p => ({...p, gift_item: e.target.value}))} disabled={isSaving} /></Grid>
//               <Grid item xs={12} sm={6}><TextField fullWidth size="small" label="Cash Amount" type="number" value={formData.cash_price} onChange={(e) => setFormData(p => ({...p, cash_price: e.target.value}))} InputProps={{ startAdornment: <InputAdornment position="start">₹</InputAdornment>, inputProps: { min: "0" } }} disabled={isSaving} /></Grid>
//               <Grid item xs={12}><TextField fullWidth size="small" label="Award Information" multiline rows={2} required value={formData.award_information} onChange={(e) => setFormData(p => ({...p, award_information: e.target.value}))} disabled={isSaving} /></Grid>
//             </Grid>
//           ) : (
//             <TextField fullWidth size="small" value={newAwardTypeName} onChange={(e) => setNewAwardTypeName(e.target.value)} label="Award Type Name" sx={{ mt: 1 }} disabled={isSaving} autoFocus/>
//           )}
//         </DialogContent>
//         <DialogActions sx={{ p: '16px 24px' }}>
//           <Button onClick={handleCloseDialog} sx={{ color: '#757575' }}>Cancel</Button>
//           <Button variant="contained" onClick={handleFormSubmit} disabled={isSaving} sx={{ backgroundColor: '#8C257C', '&:hover': { backgroundColor: '#6d1d60' } }}>
//             {isSaving ? <CircularProgress size={24} color="inherit" /> : editingData ? 'Update' : 'Save'}
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// }





import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tabs,
  Tab,
  IconButton,
  Button,
  InputAdornment,
  TablePagination,
  Skeleton,
  useTheme,
  useMediaQuery,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Search as SearchIcon,
} from '@mui/icons-material';
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

const DataTable = ({
  data,
  columns,
  loading,
  page,
  rowsPerPage,
  onEdit,
  onDelete,
  activeTab,
  apiBaseUrl,
}) => {
  const paginatedData = data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <TableContainer>
      <Table sx={{ minWidth: '100%', whiteSpace: 'nowrap' }}>
        <TableHead sx={{ backgroundColor: '#8C257C' }}>
          <TableRow>
            {columns.map((col) => (
              <TableCell key={col.id} sx={{ color: '#FFFFFF', fontWeight: 'bold' }}>
                {col.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {loading ? (
            Array.from(new Array(rowsPerPage)).map((_, index) => (
              <TableRow key={index}>
                {columns.map((col) => (
                  <TableCell key={col.id}>
                    {col.id === 'actions' ? (
                      <Skeleton variant="rectangular" width={70} height={30} />
                    ) : (
                      <Skeleton variant="text" />
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : paginatedData.length === 0 ? (
            <TableRow>
              <TableCell colSpan={columns.length} align="center" sx={{ py: 5 }}>
                No records available
              </TableCell>
            </TableRow>
          ) : (
            paginatedData.map((row, index) => (
              <TableRow key={activeTab === 0 ? row.award_id : row.value} hover>
                <TableCell sx={{ fontSize: '0.95rem' }}>{page * rowsPerPage + index + 1}</TableCell>
                {columns.slice(1, -1).map((col) => (
                   <TableCell key={col.id} sx={{ fontSize: '0.95rem' }}>
                    {col.id === 'cash_price' ? `₹${Number.parseInt(row[col.id] || 0)}` :
                     col.id === 'created_at' ? new Date(row[col.id]).toLocaleDateString() :
                     col.id === 'award_photo' ? (
                       row.award_photo ? (
                         <img 
                           src={`${apiBaseUrl}/media/${row.award_photo}`} 
                           alt="Award" 
                           style={{ width: '50px', height: '50px', borderRadius: '4px', objectFit: 'cover' }} 
                         />
                       ) : "N/A"
                     ) :
                     row[col.id] || "N/A"}
                  </TableCell>
                ))}
                <TableCell>
                  <Box display="flex" justifyContent="center" gap={0.5}>
                    <IconButton size="small" onClick={() => onEdit(row)} sx={{ color: '#8C257C' }}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" onClick={() => onDelete(row)} color="error">
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default function AwardManagement() {
  const API_BASE_URL = "https://tdtlworld.com/hrms-backend";
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [activeTab, setActiveTab] = useState(0);
  const [awards, setAwards] = useState([]);
  const [awardTypes, setAwardTypes] = useState([]);
  const [employees, setEmployees] = useState([]);
  
  const [loadingAwards, setLoadingAwards] = useState(true);
  const [loadingAwardTypes, setLoadingAwardTypes] = useState(true);
  const [loadingEmployees, setLoadingEmployees] = useState(true);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editingData, setEditingData] = useState(null);
  
  const initialFormData = { 
    employee_id: "", 
    award_type_id: "", 
    gift_item: "", 
    cash_price: "0", 
    award_month_year: "", 
    award_information: "", 
    award_photo: "",
    associated_goals: "",
    description: "",
  };
  const [formData, setFormData] = useState(initialFormData);
  const [newAwardTypeName, setNewAwardTypeName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const fetchData = async (url, setData, setLoading) => {
    setLoading(true);
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      setData(Array.isArray(data) ? data : []);
    } catch (error) {
      showNotification(`Error fetching data from ${url}`, "error");
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllData = () => {
    fetchData(`${API_BASE_URL}/api/awards/`, setAwards, setLoadingAwards);
    fetchData(`${API_BASE_URL}/api/award-types/`, setAwardTypes, setLoadingAwardTypes);
    fetchData(`${API_BASE_URL}/employee-dropdown/`, setEmployees, setLoadingEmployees);
  };

  useEffect(() => {
    fetchAllData();
  }, []);
  
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    setSearchTerm('');
    setPage(0);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };
  
  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  
  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleOpenDialog = (data = null) => {
    setEditingData(data);
    setSelectedFile(null);

    if (activeTab === 0) {
      if (data) {
        setFormData({
            employee_id: data.employee_id || "",
            award_type_id: data.award_type_id || "",
            gift_item: data.gift_item || "",
            cash_price: Number.parseInt(data.cash_price || 0).toString(),
            award_month_year: data.award_month_year ? data.award_month_year.substring(0, 7) : "",
            award_information: data.award_information || "",
            award_photo: data.award_photo || "",
            associated_goals: data.associated_goals || "",
            description: data.description || "",
        });
      } else {
        setFormData(initialFormData);
      }
    } else {
      setNewAwardTypeName(data ? data.label : "");
    }
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingData(null);
    setSelectedFile(null);
  };

  const handleFormSubmit = async () => {
    setIsSaving(true);
    let url, method, body, successMessage;

    if (activeTab === 0) {
      const submitData = new FormData();
      Object.keys(formData).forEach(key => {
        if (key !== 'award_photo') {
          submitData.append(key, formData[key]);
        }
      });
      submitData.append("company_id", "2");

      if (selectedFile) {
        submitData.append('award_photo', selectedFile);
      }

      url = editingData ? `${API_BASE_URL}/api/awards/${editingData.award_id}/` : `${API_BASE_URL}/api/awards/`;
      method = editingData ? "PATCH" : "POST";
      body = submitData;
      successMessage = `Award ${editingData ? 'updated' : 'added'} successfully!`;
    } else {
      url = editingData ? `${API_BASE_URL}/api/award-types/${editingData.value}/` : `${API_BASE_URL}/api/award-types/`;
      method = editingData ? "PATCH" : "POST";
      body = JSON.stringify({ category_name: newAwardTypeName.trim() });
      successMessage = `Award type ${editingData ? 'updated' : 'updated'} successfully!`;
    }

    try {
      const headers = activeTab === 0 ? {} : { "Content-Type": "application/json" };
      const response = await fetch(url, { method, body, headers });
      if (!response.ok) throw new Error("Failed to save data");

      showNotification(successMessage, "success");
      fetchAllData();
      handleCloseDialog();
    } catch (error) {
      showNotification(`Failed to ${editingData ? 'update' : 'add'} record`, "error");
    } finally {
      setIsSaving(false);
    }
  };
  
  const handleDelete = (rowToDelete) => {
    const id = activeTab === 0 ? rowToDelete.award_id : rowToDelete.value;
    const url = activeTab === 0 ? `${API_BASE_URL}/api/awards/${id}/` : `${API_BASE_URL}/api/award-types/${id}/`;
    
    MySwal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#8C257C',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(url, { method: "DELETE" });
          if (!response.ok) throw new Error("Failed to delete");
          showNotification("Record deleted successfully!", "success");
          fetchAllData();
        } catch (error) {
          showNotification("Failed to delete record", "error");
        }
      }
    });
  };

  const dataToDisplay = activeTab === 0 ? awards : awardTypes;
  const filteredData = dataToDisplay.filter(item =>
    Object.values(item).some(value =>
      value && String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );
  
  const awardsColumns = [
    { id: 'sr_no', label: 'SR NO.' },
    { id: 'award_type_name', label: 'AWARD TYPE' },
    { id: 'employee_name', label: 'EMPLOYEE' },
    { id: 'gift_item', label: 'GIFT' },
    { id: 'award_photo', label: 'PHOTO'},
    { id: 'cash_price', label: 'CASH' },
    { id: 'associated_goals', label: 'ASSOCIATED GOALS' },
    { id: 'description', label: 'DESCRIPTION' },
    { id: 'award_month_year', label: 'MONTH & YEAR' },
    { id: 'actions', label: 'ACTIONS' },
  ];

  const awardTypesColumns = [
    { id: 'sr_no', label: 'SR NO.' },
    { id: 'label', label: 'AWARD TYPE' },
    { id: 'created_at', label: 'CREATED AT' },
    { id: 'actions', label: 'ACTIONS' },
  ];
  
  const currentColumns = activeTab === 0 ? awardsColumns : awardTypesColumns;
  const isLoading = activeTab === 0 ? loadingAwards : loadingAwardTypes;

  return (
    <Box component={Paper} elevation={2} p={3}>
      <Typography variant="h5" color="#8C257C" fontWeight="bold" mb={2}>
        Awards
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', alignItems: 'center', mb: 2, gap: 2 }}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
          sx={{ backgroundColor: '#8C257C', '&:hover': { backgroundColor: '#6d1d60' }, width: isMobile ? '100%' : 'auto' }}
        >
          Add New
        </Button>
        <TextField
          size="small"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => { setSearchTerm(e.target.value); setPage(0); }}
          InputProps={{ startAdornment: (<InputAdornment position="start"><SearchIcon /></InputAdornment>) }}
          sx={{ width: isMobile ? '100%' : 300 }}
        />
      </Box>

      <Tabs value={activeTab} onChange={handleTabChange} sx={{ mb: 3, borderBottom: 1, borderColor: 'divider' }}>
        <Tab label="Awards" sx={{ fontWeight: 'bold', '&.Mui-selected': { color: '#8C257C' } }} />
        <Tab label="Award Types" sx={{ fontWeight: 'bold', '&.Mui-selected': { color: '#8C257C' } }} />
      </Tabs>
      
      <DataTable
        data={filteredData}
        columns={currentColumns}
        loading={isLoading}
        page={page}
        rowsPerPage={rowsPerPage}
        onEdit={handleOpenDialog}
        onDelete={handleDelete}
        activeTab={activeTab}
        apiBaseUrl={API_BASE_URL}
      />
      
      <TablePagination
        component="div"
        count={filteredData.length}
        page={page}
        onPageChange={handlePageChange}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleRowsPerPageChange}
        rowsPerPageOptions={[5, 10, 15, 25]}
        sx={{ mt: 2 }}
      />
      
      <Dialog open={dialogOpen} onClose={handleCloseDialog} fullWidth maxWidth="md">
        <DialogTitle sx={{ color: '#8C257C', fontWeight: 'bold' }}>
          {editingData ? 'Edit' : 'Add New'} {activeTab === 0 ? 'Award' : 'Award Type'}
        </DialogTitle>
        <DialogContent>
          {activeTab === 0 ? (
            <Grid container spacing={2.5} sx={{ mt: 1 }}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth size="small" required>
                  <InputLabel>Employee</InputLabel>
                  <Select value={formData.employee_id} onChange={(e) => setFormData(p => ({...p, employee_id: e.target.value}))} label="Employee" disabled={isSaving || loadingEmployees}>
                    {loadingEmployees ? <MenuItem disabled><CircularProgress size={20} sx={{mr: 1}} /> Loading...</MenuItem> : 
                     employees.map((emp) => (<MenuItem key={emp.value} value={emp.value}>{`${emp.label} ( ${emp.emp_id})`}</MenuItem>))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth size="small" required>
                  <InputLabel>Award Type</InputLabel>
                  <Select value={formData.award_type_id} onChange={(e) => setFormData(p => ({...p, award_type_id: e.target.value}))} label="Award Type" disabled={isSaving || loadingAwardTypes}>
                    {loadingAwardTypes ? <MenuItem disabled><CircularProgress size={20} sx={{mr: 1}} /> Loading...</MenuItem> :
                     awardTypes.map((type) => (<MenuItem key={type.value} value={type.value}>{type.label}</MenuItem>))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}><TextField fullWidth size="small" type="month" label="Month & Year" required value={formData.award_month_year} onChange={(e) => setFormData(p => ({...p, award_month_year: e.target.value}))} InputLabelProps={{ shrink: true }} disabled={isSaving} /></Grid>
              <Grid item xs={12} sm={6}><TextField fullWidth size="small" label="Gift Item" value={formData.gift_item} onChange={(e) => setFormData(p => ({...p, gift_item: e.target.value}))} disabled={isSaving} /></Grid>
              <Grid item xs={12} sm={6}><TextField fullWidth size="small" label="Cash Amount" type="number" value={formData.cash_price} onChange={(e) => setFormData(p => ({...p, cash_price: e.target.value}))} InputProps={{ startAdornment: <InputAdornment position="start">₹</InputAdornment>, inputProps: { min: "0" } }} disabled={isSaving} /></Grid>
              <Grid item xs={12}><TextField fullWidth size="small" label="Award Information" multiline rows={2} required value={formData.award_information} onChange={(e) => setFormData(p => ({...p, award_information: e.target.value}))} disabled={isSaving} /></Grid>
              <Grid item xs={12}><TextField fullWidth size="small" label="Associated Goals" value={formData.associated_goals} onChange={(e) => setFormData(p => ({...p, associated_goals: e.target.value}))} disabled={isSaving} /></Grid>
              <Grid item xs={12}><TextField fullWidth size="small" label="Description" multiline rows={2} value={formData.description} onChange={(e) => setFormData(p => ({...p, description: e.target.value}))} disabled={isSaving} /></Grid>
              <Grid item xs={12}>
                <Button variant="outlined" component="label" fullWidth disabled={isSaving}>
                  Upload Photo
                  <input type="file" hidden onChange={handleFileChange} accept="image/*" />
                </Button>
                {selectedFile && <Typography variant="body2" sx={{ mt: 1 }}>Selected file: {selectedFile.name}</Typography>}
                {editingData && !selectedFile && formData.award_photo && (
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    Current Photo: <a href={`${API_BASE_URL}/media/${formData.award_photo}`} target="_blank" rel="noopener noreferrer">{formData.award_photo.split('/').pop()}</a>
                  </Typography>
                )}
              </Grid>
            </Grid>
          ) : (
            <TextField fullWidth size="small" value={newAwardTypeName} onChange={(e) => setNewAwardTypeName(e.target.value)} label="Award Type Name" sx={{ mt: 1 }} disabled={isSaving} autoFocus/>
          )}
        </DialogContent>
        <DialogActions sx={{ p: '16px 24px' }}>
          <Button onClick={handleCloseDialog} sx={{ color: '#757575' }}>Cancel</Button>
          <Button variant="contained" onClick={handleFormSubmit} disabled={isSaving} sx={{ backgroundColor: '#8C257C', '&:hover': { backgroundColor: '#6d1d60' } }}>
            {isSaving ? <CircularProgress size={24} color="inherit" /> : editingData ? 'Update' : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
} 