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
//   Select,
//   MenuItem,
//   Tabs,
//   Tab
// } from '@mui/material';

// export default function AwardManagement() {
//   const [activeTab, setActiveTab] = useState(0);
//   const [awards, setAwards] = useState([]);
//   const [awardTypes, setAwardTypes] = useState([]);
//   const [entriesPerPage, setEntriesPerPage] = useState(10);
//   const [searchTerm, setSearchTerm] = useState('');

//   useEffect(() => {
//     const fetchAwards = async () => {
//       const employeeId = localStorage.getItem("loggedInUser");
//       if (!employeeId) {
//         console.error("No employee ID found in localStorage.");
//         return;
//       }

//       try {
//         const response = await fetch(`https://tdtlworld.com/hrms-backend/employee_awards/${employeeId}/`);
//         const data = await response.json();

//         const formattedAwards = data.map((item, index) => ({
//           id: index + 1,
//           awardType: item.award_type,
//           awardGift: item.award_gift,
//           awardCash: item.award_cash,
//           monthYear: item.month_year,
//           employee: employeeId
//         }));

//         setAwards(formattedAwards);

//         // Extract unique award types
//         const uniqueTypes = [];
//         const seen = new Set();

//         data.forEach(item => {
//           if (!seen.has(item.award_type)) {
//             seen.add(item.award_type);
//             uniqueTypes.push({
//               name: item.award_type,
//               createdAt: item.month_year // using monthYear as createdAt fallback
//             });
//           }
//         });

//         setAwardTypes(uniqueTypes);

//       } catch (error) {
//         console.error("Error fetching awards:", error);
//       }
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
//               filteredAwards.slice(0, entriesPerPage).map((award) => (
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
//         Showing 1 to {Math.min(filteredAwards.length, entriesPerPage)} of {awards.length} entries
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
//             {filteredAwardTypes.length === 0 ? (
//               <TableRow>
//                 <TableCell colSpan={2} align="center">No records available</TableCell>
//               </TableRow>
//             ) : (
//               filteredAwardTypes.slice(0, entriesPerPage).map((type, index) => (
//                 <TableRow key={index}>
//                   <TableCell>{type.name}</TableCell>
//                   <TableCell>{type.createdAt}</TableCell>
//                 </TableRow>
//               ))
//             )}
//           </TableBody>
//         </Table>
//       </TableContainer>
//       <Typography variant="body2" sx={{ mt: 2 }}>
//         Showing 1 to {Math.min(filteredAwardTypes.length, entriesPerPage)} of {awardTypes.length} entries
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
//   Select,
//   MenuItem,
//   Tabs,
//   Tab,
//   CircularProgress,
// } from '@mui/material';

// /**
//  * AwardManagement Component
//  * Displays two tabs: one for an employee's awards and another for all available award types.
//  */
// export default function AwardManagement() {
//   // UI State
//   const [activeTab, setActiveTab] = useState(0);
//   const [entriesPerPage, setEntriesPerPage] = useState(10);
//   const [searchTerm, setSearchTerm] = useState('');

//   // State for "Awards" data
//   const [awards, setAwards] = useState([]);
//   const [awardsLoading, setAwardsLoading] = useState(true);
//   const [awardsError, setAwardsError] = useState(null);

//   // State for "Award Types" data
//   const [awardTypes, setAwardTypes] = useState([]);
//   const [awardTypesLoading, setAwardTypesLoading] = useState(true);
//   const [awardTypesError, setAwardTypesError] = useState(null);

//   // Fetch all necessary data when the component mounts
//   useEffect(() => {
//     const employeeId = localStorage.getItem("loggedInUser");

//     // 1. Fetch the list of awards for the specific employee
//     const fetchAwards = async () => {
//       if (!employeeId) {
//         setAwardsError("No employee ID found in localStorage.");
//         setAwardsLoading(false);
//         return;
//       }
//       try {
//         const response = await fetch(`https://tdtlworld.com/hrms-backend/employee_awards/${employeeId}/`);
//         if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
//         const data = await response.json();

//         const formattedAwards = data.map((item, index) => ({
//           id: item.id || index + 1,
//           awardType: item.award_type,
//           awardGift: item.award_gift,
//           awardCash: item.award_cash,
//           monthYear: item.month_year,
//           employee: employeeId,
//         }));
//         setAwards(formattedAwards);
//       } catch (error) {
//         setAwardsError(error.message);
//       } finally {
//         setAwardsLoading(false);
//       }
//     };

//     // 2. Fetch all available award types from the new, dedicated API
//     const fetchAwardTypes = async () => {
//       try {
//         const response = await fetch("https://tdtlworld.com/hrms-backend/api/award-types/");
//         if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
//         const data = await response.json();

//         const formattedTypes = data.map(item => ({
//           id: item.id,
//           name: item.name,
//           createdAt: new Date(item.created_at).toLocaleDateString("en-US", {
//             year: 'numeric', month: 'long', day: 'numeric',
//           }),
//         }));
//         setAwardTypes(formattedTypes);
//       } catch (error) {
//         setAwardTypesError(error.message);
//       } finally {
//         setAwardTypesLoading(false);
//       }
//     };

//     // Run both fetch operations
//     fetchAwards();
//     fetchAwardTypes();
//   }, []); // Empty dependency array ensures this runs once on mount

//   // Reset filters when switching tabs for a better user experience
//   const handleTabChange = (event, newValue) => {
//     setActiveTab(newValue);
//     setSearchTerm('');
//     setEntriesPerPage(10);
//   };

//   // Memoized filtering logic
//   const filteredAwards = awards.filter(award =>
//     Object.values(award).some(value =>
//       // **FIX:** Use `(value || '')` to prevent crash on null/undefined values
//       (String(value) || '').toLowerCase().includes(searchTerm.toLowerCase())
//     )
//   );

//   const filteredAwardTypes = awardTypes.filter(type =>
//     // **FIX:** Use `(type.name || '')` to prevent crash if name is null/undefined
//     (type.name || '').toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   // Reusable component to show loading spinners or error messages
//   const DataStatus = ({ loading, error, colSpan, type }) => {
//     if (loading) {
//       return (
//         <TableRow>
//           <TableCell colSpan={colSpan} align="center" sx={{ py: 5 }}>
//             <CircularProgress size={24} sx={{ mr: 2 }} />
//             <Typography variant="body1" component="span">Loading {type}...</Typography>
//           </TableCell>
//         </TableRow>
//       );
//     }
//     if (error) {
//       return (
//         <TableRow>
//           <TableCell colSpan={colSpan} align="center" sx={{ color: 'error.main', py: 5 }}>
//             Error: {error}
//           </TableCell>
//         </TableRow>
//       );
//     }
//     return null;
//   };

//   // Reusable component for table controls (Search and Show Entries)
//   const TableControls = () => (
//     <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
//       <Box sx={{ display: 'flex', alignItems: 'center' }}>
//         <Typography variant="body2" sx={{ mr: 1 }}>Show</Typography>
//         <Select size="small" value={entriesPerPage} onChange={(e) => setEntriesPerPage(e.target.value)}>
//           <MenuItem value={10}>10</MenuItem>
//           <MenuItem value={25}>25</MenuItem>
//           <MenuItem value={50}>50</MenuItem>
//         </Select>
//         <Typography variant="body2" sx={{ ml: 1 }}>entries</Typography>
//       </Box>
//       <TextField
//         size="small"
//         variant="outlined"
//         placeholder="Search..."
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//       />
//     </Box>
//   );

//   // Component for the "Awards" list tab
//   const AwardsList = () => {
//     const paginatedData = filteredAwards.slice(0, entriesPerPage);
//     return (
//         <Box>
//             <TableControls />
//             <TableContainer component={Paper}>
//                 <Table>
//                 <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
//                     <TableRow>
//                     <TableCell sx={{ fontWeight: 'bold' }}>AWARD TYPE</TableCell>
//                     <TableCell sx={{ fontWeight: 'bold' }}>EMPLOYEE ID</TableCell>
//                     <TableCell sx={{ fontWeight: 'bold' }}>GIFT</TableCell>
//                     <TableCell sx={{ fontWeight: 'bold' }}>CASH</TableCell>
//                     <TableCell sx={{ fontWeight: 'bold' }}>MONTH & YEAR</TableCell>
//                     </TableRow>
//                 </TableHead>
//                 <TableBody>
//                     {awardsLoading || awardsError ? (
//                     <DataStatus loading={awardsLoading} error={awardsError} colSpan={5} type="Awards" />
//                     ) : paginatedData.length === 0 ? (
//                     <TableRow><TableCell colSpan={5} align="center">No awards found.</TableCell></TableRow>
//                     ) : (
//                     paginatedData.map((award) => (
//                         <TableRow key={award.id} hover>
//                         <TableCell>{award.awardType || '—'}</TableCell>
//                         <TableCell>{award.employee}</TableCell>
//                         <TableCell>{award.awardGift || '—'}</TableCell>
//                         <TableCell>{`$${Number(award.awardCash || 0).toFixed(2)}`}</TableCell>
//                         <TableCell>{award.monthYear || '—'}</TableCell>
//                         </TableRow>
//                     ))
//                     )}
//                 </TableBody>
//                 </Table>
//             </TableContainer>
//             {filteredAwards.length > 0 && (
//                 <Typography variant="body2" sx={{ mt: 2, color: 'text.secondary' }}>
//                     Showing 1 to {paginatedData.length} of {filteredAwards.length} entries
//                 </Typography>
//             )}
//         </Box>
//     );
//   };
  

//   // Component for the "Award Types" list tab
//   const AwardTypesList = () => {
//     const paginatedData = filteredAwardTypes.slice(0, entriesPerPage);
//     return (
//         <Box>
//             <TableControls />
//             <TableContainer component={Paper}>
//                 <Table>
//                 <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
//                     <TableRow>
//                     <TableCell sx={{ fontWeight: 'bold' }}>AWARD TYPE</TableCell>
//                     <TableCell sx={{ fontWeight: 'bold' }}>CREATED AT</TableCell>
//                     </TableRow>
//                 </TableHead>
//                 <TableBody>
//                     {awardTypesLoading || awardTypesError ? (
//                     <DataStatus loading={awardTypesLoading} error={awardTypesError} colSpan={2} type="Award Types" />
//                     ) : paginatedData.length === 0 ? (
//                     <TableRow><TableCell colSpan={2} align="center">No award types found.</TableCell></TableRow>
//                     ) : (
//                     paginatedData.map((type) => (
//                         <TableRow key={type.id} hover>
//                         <TableCell>{type.name || '—'}</TableCell>
//                         <TableCell>{type.createdAt || '—'}</TableCell>
//                         </TableRow>
//                     ))
//                     )}
//                 </TableBody>
//                 </Table>
//             </TableContainer>
//             {filteredAwardTypes.length > 0 && (
//                  <Typography variant="body2" sx={{ mt: 2, color: 'text.secondary' }}>
//                     Showing 1 to {paginatedData.length} of {filteredAwardTypes.length} entries
//                 </Typography>
//             )}
//         </Box>
//     );
//   };

//   return (
//     <Box sx={{ p: 3, backgroundColor: '#fafafa', minHeight: '100vh' }}>
//       <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: '#333' }}>
//         Award Management
//       </Typography>
//       <Paper elevation={2}>
//         <Tabs value={activeTab} onChange={handleTabChange} sx={{ borderBottom: 1, borderColor: 'divider' }}>
//           <Tab label="My Awards" sx={{ fontWeight: 'bold', textTransform: 'none', fontSize: '1rem' }} />
//           <Tab label="Award Types" sx={{ fontWeight: 'bold', textTransform: 'none', fontSize: '1rem' }} />
//         </Tabs>
//         <Box p={3}>
//           {activeTab === 0 ? <AwardsList /> : <AwardTypesList />}
//         </Box>
//       </Paper>
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
//   Select,
//   MenuItem,
//   Tabs,
//   Tab,
//   CircularProgress,
// } from '@mui/material';
 
// /**
//  * AwardManagement Component
//  * Displays two tabs: one for an employee's awards and another for all available award types.
//  */
// export default function AwardManagement() {
//   // UI State
//   const [activeTab, setActiveTab] = useState(0);
//   const [entriesPerPage, setEntriesPerPage] = useState(10);
//   const [searchTerm, setSearchTerm] = useState('');
 
//   // State for "Awards" data
//   const [awards, setAwards] = useState([]);
//   const [awardsLoading, setAwardsLoading] = useState(true);
//   const [awardsError, setAwardsError] = useState(null);
 
//   // State for "Award Types" data
//   const [awardTypes, setAwardTypes] = useState([]);
//   const [awardTypesLoading, setAwardTypesLoading] = useState(true);
//   const [awardTypesError, setAwardTypesError] = useState(null);
 
//   // Fetch all necessary data when the component mounts
//   useEffect(() => {
//     const employeeId = localStorage.getItem("loggedInUser");
 
//     // 1. Fetch the list of awards for the specific employee
//     const fetchAwards = async () => {
//       if (!employeeId) {
//         setAwardsError("No employee ID found in localStorage.");
//         setAwardsLoading(false);
//         return;
//       }
//       try {
//         const response = await fetch(`https://tdtlworld.com/hrms-backend/employee_awards/${employeeId}/`);
//         if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
//         const data = await response.json();
 
//         const formattedAwards = data.map((item, index) => ({
//           id: item.id || index + 1,
//           awardTypeId: item.award_type, // Store the ID
//           awardGift: item.award_gift,
//           awardCash: item.award_cash,
//           monthYear: item.month_year,
//           employee: employeeId,
//         }));
//         setAwards(formattedAwards);
//       } catch (error) {
//         setAwardsError(error.message);
//       } finally {
//         setAwardsLoading(false);
//       }
//     };
 
//     // 2. Fetch all available award types from the new, dedicated API
//     const fetchAwardTypes = async () => {
//       try {
//         const response = await fetch("https://tdtlworld.com/hrms-backend/api/award-types/");
//         if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
//         const data = await response.json();
 
//         // Assuming data is an array of objects like { value: id, label: name, created_at: ... }
//         const formattedTypes = data.map(item => ({
//           id: item.value, // Use 'value' as ID
//           name: item.label, // Use 'label' as the award type name
//           createdAt: new Date(item.created_at).toLocaleDateString("en-US", {
//             year: 'numeric', month: 'long', day: 'numeric',
//           }),
//         }));
//         setAwardTypes(formattedTypes);
//       } catch (error) {
//         setAwardTypesError(error.message);
//       } finally {
//         setAwardTypesLoading(false);
//       }
//     };
 
//     // Run both fetch operations
//     fetchAwards();
//     fetchAwardTypes();
//   }, []); // Empty dependency array ensures this runs once on mount
 
//   // Reset filters when switching tabs for a better user experience
//   const handleTabChange = (event, newValue) => {
//     setActiveTab(newValue);
//     setSearchTerm('');
//     setEntriesPerPage(10);
//   };
 
//   // Memoized filtering logic
//   const filteredAwards = awards
//     // Enhance awards with the actual award type name
//     .map(award => ({
//       ...award,
//       awardTypeName: awardTypes.find(type => type.id === award.awardTypeId)?.name || 'Unknown Award',
//     }))
//     .filter(award =>
//       Object.values(award).some(value =>
//         // **FIX:** Use `(value || '')` to prevent crash on null/undefined values
//         (String(value) || '').toLowerCase().includes(searchTerm.toLowerCase())
//       )
//     );
 
//   const filteredAwardTypes = awardTypes.filter(type =>
//     // **FIX:** Use `(type.name || '')` to prevent crash if name is null/undefined
//     (type.name || '').toLowerCase().includes(searchTerm.toLowerCase())
//   );
 
//   // Reusable component to show loading spinners or error messages
//   const DataStatus = ({ loading, error, colSpan, type }) => {
//     if (loading) {
//       return (
//         <TableRow>
//           <TableCell colSpan={colSpan} align="center" sx={{ py: 5 }}>
//             <CircularProgress size={24} sx={{ mr: 2 }} />
//             <Typography variant="body1" component="span">Loading {type}...</Typography>
//           </TableCell>
//         </TableRow>
//       );
//     }
//     if (error) {
//       return (
//         <TableRow>
//           <TableCell colSpan={colSpan} align="center" sx={{ color: 'error.main', py: 5 }}>
//             Error: {error}
//           </TableCell>
//         </TableRow>
//       );
//     }
//     return null;
//   };
 
//   // Reusable component for table controls (Search and Show Entries)
//   const TableControls = () => (
//     <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
//       <Box sx={{ display: 'flex', alignItems: 'center' }}>
//         <Typography variant="body2" sx={{ mr: 1 }}>Show</Typography>
//         <Select size="small" value={entriesPerPage} onChange={(e) => setEntriesPerPage(e.target.value)}>
//           <MenuItem value={10}>10</MenuItem>
//           <MenuItem value={25}>25</MenuItem>
//           <MenuItem value={50}>50</MenuItem>
//         </Select>
//         <Typography variant="body2" sx={{ ml: 1 }}>entries</Typography>
//       </Box>
//       <TextField
//         size="small"
//         variant="outlined"
//         placeholder="Search..."
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//       />
//     </Box>
//   );
 
//   // Component for the "Awards" list tab
//   const AwardsList = () => {
//     const paginatedData = filteredAwards.slice(0, entriesPerPage);
//     return (
//       <Box>
//         <TableControls />
//         <TableContainer component={Paper}>
//           <Table>
//             <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
//               <TableRow>
//                 <TableCell sx={{ fontWeight: 'bold' }}>Sr. No.</TableCell> {/* Added Sr. No. */}
//                 <TableCell sx={{ fontWeight: 'bold' }}>AWARD TYPE</TableCell>
//                 <TableCell sx={{ fontWeight: 'bold' }}>EMPLOYEE ID</TableCell>
//                 <TableCell sx={{ fontWeight: 'bold' }}>GIFT</TableCell>
//                 <TableCell sx={{ fontWeight: 'bold' }}>CASH</TableCell>
//                 <TableCell sx={{ fontWeight: 'bold' }}>MONTH & YEAR</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {awardsLoading || awardsError ? (
//                 <DataStatus loading={awardsLoading} error={awardsError} colSpan={6} type="Awards" />
//               ) : paginatedData.length === 0 ? (
//                 <TableRow><TableCell colSpan={6} align="center">No awards found.</TableCell></TableRow>
//               ) : (
//                 paginatedData.map((award, index) => (
//                   <TableRow key={award.id} hover>
//                     <TableCell>{index + 1}</TableCell> {/* Sr. No. value */}
//                     <TableCell>{award.awardTypeName}</TableCell> {/* Displaying the label */}
//                     <TableCell>{award.employee}</TableCell>
//                     <TableCell>{award.awardGift || '—'}</TableCell>
//                     <TableCell>{`$${Number(award.awardCash || 0).toFixed(2)}`}</TableCell>
//                     <TableCell>{award.monthYear || '—'}</TableCell>
//                   </TableRow>
//                 ))
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>
//         {filteredAwards.length > 0 && (
//           <Typography variant="body2" sx={{ mt: 2, color: 'text.secondary' }}>
//             Showing 1 to {paginatedData.length} of {filteredAwards.length} entries
//           </Typography>
//         )}
//       </Box>
//     );
//   };
 
 
//   // Component for the "Award Types" list tab
//   const AwardTypesList = () => {
//     const paginatedData = filteredAwardTypes.slice(0, entriesPerPage);
//     return (
//       <Box>
//         <TableControls />
//         <TableContainer component={Paper}>
//           <Table>
//             <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
//               <TableRow>
//                 <TableCell sx={{ fontWeight: 'bold' }}>Sr. No.</TableCell> {/* Added Sr. No. */}
//                 <TableCell sx={{ fontWeight: 'bold' }}>AWARD TYPE</TableCell>
//                 <TableCell sx={{ fontWeight: 'bold' }}>CREATED AT</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {awardTypesLoading || awardTypesError ? (
//                 <DataStatus loading={awardTypesLoading} error={awardTypesError} colSpan={3} type="Award Types" />
//               ) : paginatedData.length === 0 ? (
//                 <TableRow><TableCell colSpan={3} align="center">No award types found.</TableCell></TableRow>
//               ) : (
//                 paginatedData.map((type, index) => (
//                   <TableRow key={type.id} hover>
//                     <TableCell>{index + 1}</TableCell> {/* Sr. No. value */}
//                     <TableCell>{type.name || '—'}</TableCell>
//                     <TableCell>{type.createdAt || '—'}</TableCell>
//                   </TableRow>
//                 ))
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>
//         {filteredAwardTypes.length > 0 && (
//           <Typography variant="body2" sx={{ mt: 2, color: 'text.secondary' }}>
//             Showing 1 to {paginatedData.length} of {filteredAwardTypes.length} entries
//           </Typography>
//         )}
//       </Box>
//     );
//   };
 
//   return (
//     <Box sx={{ p: 3, backgroundColor: '#fafafa', minHeight: '100vh' }}>
//       <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: '#333' }}>
//         Award Management
//       </Typography>
//       <Paper elevation={2}>
//         <Tabs value={activeTab} onChange={handleTabChange} sx={{ borderBottom: 1, borderColor: 'divider' }}>
//           <Tab label="My Awards" sx={{ fontWeight: 'bold', textTransform: 'none', fontSize: '1rem' }} />
//           <Tab label="Award Types" sx={{ fontWeight: 'bold', textTransform: 'none', fontSize: '1rem' }} />
//         </Tabs>
//         <Box p={3}>
//           {activeTab === 0 ? <AwardsList /> : <AwardTypesList />}
//         </Box>
//       </Paper>
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
//   CircularProgress,
//   Button,
//   TablePagination,
//   Skeleton,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   InputAdornment,
//   useTheme,
//   useMediaQuery,
// } from '@mui/material';
// import { Add as AddIcon, Search as SearchIcon } from '@mui/icons-material';
// import Swal from 'sweetalert2';

// /**
//  * AwardManagement Component
//  * Displays and manages employee awards and award types with a consistent theme.
//  */
// export default function AwardManagement() {
//   // UI State
//   const [activeTab, setActiveTab] = useState(0);
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [openDialog, setOpenDialog] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   // State for "Awards" data
//   const [awards, setAwards] = useState([]);
//   const [awardsLoading, setAwardsLoading] = useState(true);
//   const [awardsError, setAwardsError] = useState(null);

//   // State for "Award Types" data
//   const [awardTypes, setAwardTypes] = useState([]);
//   const [awardTypesLoading, setAwardTypesLoading] = useState(true);
//   const [awardTypesError, setAwardTypesError] = useState(null);
  
//   // Responsive Design
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

//   // Fetch all necessary data when the component mounts
//   useEffect(() => {
//     const employeeId = localStorage.getItem("loggedInUser") || '1'; // Default for example

//     const fetchAwards = async () => {
//       setAwardsLoading(true);
//       try {
//         const response = await fetch(`https://tdtlworld.com/hrms-backend/employee_awards/${employeeId}/`);
//         if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
//         const data = await response.json();
//         const formattedAwards = data.map((item, index) => ({
//           id: item.id || index + 1,
//           awardTypeId: item.award_type,
//           awardGift: item.award_gift,
//           awardCash: item.award_cash,
//           monthYear: item.month_year,
//           employee: employeeId,
//         }));
//         setAwards(formattedAwards);
//       } catch (error) {
//         setAwardsError(error.message);
//       } finally {
//         setAwardsLoading(false);
//       }
//     };

//     const fetchAwardTypes = async () => {
//       setAwardTypesLoading(true);
//       try {
//         const response = await fetch("https://tdtlworld.com/hrms-backend/api/award-types/");
//         if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
//         const data = await response.json();
//         const formattedTypes = data.map(item => ({
//           id: item.value,
//           name: item.label,
//           createdAt: new Date(item.created_at).toLocaleDateString("en-US", {
//             year: 'numeric', month: 'long', day: 'numeric',
//           }),
//         }));
//         setAwardTypes(formattedTypes);
//       } catch (error) {
//         setAwardTypesError(error.message);
//       } finally {
//         setAwardTypesLoading(false);
//       }
//     };

//     fetchAwards();
//     fetchAwardTypes();
//   }, []);

//   const handleTabChange = (event, newValue) => {
//     setActiveTab(newValue);
//     setSearchTerm('');
//     setPage(0);
//     setRowsPerPage(5);
//   };
  
//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const handleOpenDialog = () => setOpenDialog(true);
//   const handleCloseDialog = () => setOpenDialog(false);

//   const handleAddAwardType = async (event) => {
//     event.preventDefault();
//     setIsSubmitting(true);
//     // Fake submission logic
//     setTimeout(() => {
//         setIsSubmitting(false);
//         handleCloseDialog();
//         Swal.fire({
//             icon: 'success',
//             title: 'Success!',
//             text: 'New award type added successfully.',
//             timer: 3000,
//             showConfirmButton: false,
//         });
//     }, 1500);
//   };
  
//   const filteredAwards = awards
//     .map(award => ({
//       ...award,
//       awardTypeName: awardTypes.find(type => type.id === award.awardTypeId)?.name || 'Unknown',
//     }))
//     .filter(award =>
//       Object.values(award).some(value =>
//         (String(value) || '').toLowerCase().includes(searchTerm.toLowerCase())
//       )
//     );

//   const filteredAwardTypes = awardTypes.filter(type =>
//     (type.name || '').toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const SkeletonLoader = ({ columns }) => (
//     Array.from(new Array(rowsPerPage)).map((_, index) => (
//         <TableRow key={index}>
//             {Array.from(new Array(columns)).map((_, colIndex) => (
//                 <TableCell key={colIndex}><Skeleton variant="text" /></TableCell>
//             ))}
//         </TableRow>
//     ))
//   );

//   const TableFooter = ({ count }) => (
//     <Box
//         sx={{
//             display: 'flex',
//             justifyContent: 'space-between',
//             alignItems: 'center',
//             flexDirection: isMobile ? 'column' : 'row',
//             p: 2,
//             gap: 2,
//         }}
//     >
//         <Typography variant="body2" color="text.secondary">
//             Showing {page * rowsPerPage + 1} to {Math.min((page + 1) * rowsPerPage, count)} of {count} results
//         </Typography>
//         <TablePagination
//             component="div"
//             count={count}
//             page={page}
//             onPageChange={handleChangePage}
//             rowsPerPage={rowsPerPage}
//             onRowsPerPageChange={handleChangeRowsPerPage}
//             rowsPerPageOptions={[5, 10, 15, 25]}
//             sx={{
//                 '& .MuiSvgIcon-root': {
//                     color: '#8C257C',
//                 },
//             }}
//         />
//     </Box>
//   );

//   const AwardsList = () => {
//     const paginatedData = filteredAwards.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

//     return (
//       <>
//         <TableContainer sx={{ whiteSpace: 'nowrap' }}>
//           <Table sx={{ minWidth: '100%' }}>
//             <TableHead sx={{ backgroundColor: '#8C257C' }}>
//               <TableRow>
//                 <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>SR. NO.</TableCell>
//                 <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>AWARD TYPE</TableCell>
//                 <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>GIFT</TableCell>
//                 <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>CASH</TableCell>
//                 <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>MONTH & YEAR</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {awardsLoading ? <SkeletonLoader columns={5} /> : 
//                 paginatedData.map((award, index) => (
//                   <TableRow key={award.id} hover>
//                     <TableCell sx={{ fontSize: '0.95rem' }}>{page * rowsPerPage + index + 1}</TableCell>
//                     <TableCell sx={{ fontSize: '0.95rem' }}>{award.awardTypeName}</TableCell>
//                     <TableCell sx={{ fontSize: '0.95rem' }}>{award.awardGift || '—'}</TableCell>
//                     <TableCell sx={{ fontSize: '0.95rem' }}>{`$${Number(award.awardCash || 0).toFixed(2)}`}</TableCell>
//                     <TableCell sx={{ fontSize: '0.95rem' }}>{award.monthYear || '—'}</TableCell>
//                   </TableRow>
//                 ))
//               }
//             </TableBody>
//           </Table>
//         </TableContainer>
//         <TableFooter count={filteredAwards.length} />
//       </>
//     );
//   };

//   const AwardTypesList = () => {
//     const paginatedData = filteredAwardTypes.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

//     return (
//         <>
//             <TableContainer sx={{ whiteSpace: 'nowrap' }}>
//                 <Table sx={{ minWidth: '100%' }}>
//                     <TableHead sx={{ backgroundColor: '#8C257C' }}>
//                         <TableRow>
//                             <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>SR. NO.</TableCell>
//                             <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>AWARD TYPE</TableCell>
//                             <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>CREATED AT</TableCell>
//                             <TableCell sx={{ fontWeight: 'bold', color: 'white', textAlign: 'center' }}>ACTIONS</TableCell>
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {awardTypesLoading ? <SkeletonLoader columns={4} /> :
//                             paginatedData.map((type, index) => (
//                                 <TableRow key={type.id} hover>
//                                     <TableCell sx={{ fontSize: '0.95rem' }}>{page * rowsPerPage + index + 1}</TableCell>
//                                     <TableCell sx={{ fontSize: '0.95rem' }}>{type.name || '—'}</TableCell>
//                                     <TableCell sx={{ fontSize: '0.95rem' }}>{type.createdAt || '—'}</TableCell>
//                                     <TableCell>
//                                         <Box display="flex" justifyContent="center" gap={0.5}>
//                                            <Skeleton variant="rectangular" width={120} height={30} />
//                                         </Box>
//                                     </TableCell>
//                                 </TableRow>
//                             ))
//                         }
//                     </TableBody>
//                 </Table>
//             </TableContainer>
//             <TableFooter count={filteredAwardTypes.length} />
//         </>
//     );
//   };
  
//   return (
//     <Box component={Paper} p={3}>
//         <Typography variant="h4" sx={{ color: '#8C257C', fontWeight: 'bold', mb: 5 }}>
//             Awards 
//         </Typography>

//         <Box
//             sx={{
//                 display: 'flex',
//                 justifyContent: 'space-between',
//                 alignItems: 'center',
//                 flexDirection: isMobile ? 'column' : 'row',
//                 gap: 2,
//                 mb: 2,
//             }}
//         >
//             <Button
//                 variant="contained"
//                 startIcon={<AddIcon />}
//                 onClick={handleOpenDialog}
//                 sx={{
//                     backgroundColor: '#8C257C',
//                     color: 'white',
//                     alignSelf: isMobile ? 'stretch' : 'auto',
//                     '&:hover': {
//                         backgroundColor: '#6d1d60',
//                     },
//                 }}
//             >
//                 Add New
//             </Button>
//             <TextField
//                 size="small"
//                 placeholder="Search ..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 InputProps={{
//                     startAdornment: (
//                         <InputAdornment position="start">
//                             <SearchIcon />
//                         </InputAdornment>
//                     ),
//                 }}
//                 sx={{ width: isMobile ? '100%' : 'auto' }}
//             />
//         </Box>

//         <Tabs value={activeTab} onChange={handleTabChange} sx={{ borderBottom: 1, borderColor: 'divider', color1: '#FFA500' }}>
//             <Tab label="My Awards" sx={{ fontWeight: 'bold', textTransform: 'none', fontSize: '1rem', color1: '#FFA500' }} />
//             <Tab label="Award Types" sx={{ fontWeight: 'bold', textTransform: 'none', fontSize: '1rem', color1: '#FFA500'}} />
//         </Tabs>

//         <Box mt={2}>
//             {activeTab === 0 ? <AwardsList /> : <AwardTypesList />}
//         </Box>

//         <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="sm">
//             <DialogTitle sx={{ color: '#8C257C', fontWeight: 'bold' }}>
//                 Add New Award Type
//             </DialogTitle>
//             <form onSubmit={handleAddAwardType}>
//                 <DialogContent>
//                     <TextField
//                         autoFocus
//                         margin="dense"
//                         id="award-name"
//                         label="Award Type Title"
//                         type="text"
//                         fullWidth
//                         variant="outlined"
//                         required
//                     />
//                     <TextField
//                         margin="dense"
//                         id="award-description"
//                         label="Description"
//                         type="text"
//                         fullWidth
//                         variant="outlined"
//                         multiline
//                         rows={4}
//                     />
//                      <Button
//                         variant="contained"
//                         component="label"
//                         fullWidth
//                         sx={{ mt: 2 }}
//                     >
//                         Upload Attachment
//                         <input type="file" accept=".pdf" hidden />
//                     </Button>
//                 </DialogContent>
//                 <DialogActions sx={{ p: '16px 24px' }}>
//                     <Button onClick={handleCloseDialog} sx={{ color: '#757575', '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' } }}>
//                         Cancel
//                     </Button>
//                     <Button
//                         type="submit"
//                         variant="contained"
//                         disabled={isSubmitting}
//                         sx={{
//                             backgroundColor: '#8C257C',
//                             color: 'white',
//                             '&:hover': {
//                                 backgroundColor: '#6d1d60',
//                             },
//                         }}
//                     >

//                         {isSubmitting ? <CircularProgress size={24} color="inherit" /> : 'Save'}
//                     </Button>
//                 </DialogActions>
//             </form>
//         </Dialog>
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
  Button, // Keep for potential future use or remove if certain
  TablePagination,
  Skeleton,
  InputAdornment,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import Swal from 'sweetalert2'; // Kept in case of future use with delete/edit actions



/**
 * AwardManagement Component
 * Displays and manages employee awards and award types with a consistent theme.
 */
export default function AwardManagement() {
  // UI State
  const [activeTab, setActiveTab] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');

  // State for "Awards" data
  const [awards, setAwards] = useState([]);
  const [awardsLoading, setAwardsLoading] = useState(true);
  const [awardsError, setAwardsError] = useState(null);

  // State for "Award Types" data
  const [awardTypes, setAwardTypes] = useState([]);
  const [awardTypesLoading, setAwardTypesLoading] = useState(true);
  const [awardTypesError, setAwardTypesError] = useState(null);
  
  // Responsive Design
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Fetch all necessary data when the component mounts
  useEffect(() => {
    const employeeId = localStorage.getItem("loggedInUser") || '1'; // Default for example

    const fetchAwards = async () => {
      setAwardsLoading(true);
      try {
        const response = await fetch(`https://tdtlworld.com/hrms-backend/employee_awards/${employeeId}/`);
        if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
        const data = await response.json();
        const formattedAwards = data.map((item, index) => ({
          id: item.id || index + 1,
          awardTypeId: item.award_type,
          awardGift: item.award_gift,
          awardCash: item.award_cash,
          monthYear: item.month_year,
          employee: employeeId,
        }));
        setAwards(formattedAwards);
      } catch (error) {
        setAwardsError(error.message);
      } finally {
        setAwardsLoading(false);
      }
    };

    const fetchAwardTypes = async () => {
      setAwardTypesLoading(true);
      try {
        const response = await fetch("https://tdtlworld.com/hrms-backend/api/award-types/");
        if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
        const data = await response.json();
        const formattedTypes = data.map(item => ({
          id: item.value,
          name: item.label,
          createdAt: new Date(item.created_at).toLocaleDateString("en-US", {
            year: 'numeric', month: 'long', day: 'numeric',
          }),
        }));
        setAwardTypes(formattedTypes);
      } catch (error) {
        setAwardTypesError(error.message);
      } finally {
        setAwardTypesLoading(false);
      }
    };

    fetchAwards();
    fetchAwardTypes();
  }, []);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    setSearchTerm('');
    setPage(0);
    setRowsPerPage(5);
  };
  
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredAwards = awards
    .map(award => ({
      ...award,
      awardTypeName: awardTypes.find(type => type.id === award.awardTypeId)?.name || 'Unknown',
    }))
    .filter(award =>
      Object.values(award).some(value =>
        (String(value) || '').toLowerCase().includes(searchTerm.toLowerCase())
      )
    );

  const filteredAwardTypes = awardTypes.filter(type =>
    (type.name || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const SkeletonLoader = ({ columns }) => (
    Array.from(new Array(rowsPerPage)).map((_, index) => (
        <TableRow key={index}>
            {Array.from(new Array(columns)).map((_, colIndex) => (
                <TableCell key={colIndex}><Skeleton variant="text" /></TableCell>
            ))}
        </TableRow>
    ))
  );

  const TableFooter = ({ count }) => (
    <Box
        sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: isMobile ? 'column' : 'row',
            p: 2,
            gap: 2,
        }}
    >
        <Typography variant="body2" color="text.secondary">
            Showing {page * rowsPerPage + 1} to {Math.min((page + 1) * rowsPerPage, count)} of {count} results
        </Typography>
        <TablePagination
            component="div"
            count={count}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[5, 10, 15, 25]}
            sx={{
                '& .MuiSvgIcon-root': {
                    color: '#8C257C',
                },
            }}
        />
    </Box>
  );

  const AwardsList = () => {
    const paginatedData = filteredAwards.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
      <>
        <TableContainer sx={{ whiteSpace: 'nowrap' }}>
          <Table sx={{ minWidth: '100%' }}>
            <TableHead sx={{ backgroundColor: '#8C257C' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>SR. NO.</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>AWARD TYPE</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>GIFT</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>CASH</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>MONTH & YEAR</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {awardsLoading ? <SkeletonLoader columns={5} /> : 
                paginatedData.map((award, index) => (
                  <TableRow key={award.id} hover>
                    <TableCell sx={{ fontSize: '0.95rem' }}>{page * rowsPerPage + index + 1}</TableCell>
                    <TableCell sx={{ fontSize: '0.95rem' }}>{award.awardTypeName}</TableCell>
                    <TableCell sx={{ fontSize: '0.95rem' }}>{award.awardGift || '—'}</TableCell>
                    <TableCell sx={{ fontSize: '0.95rem' }}>{`$${Number(award.awardCash || 0).toFixed(2)}`}</TableCell>
                    <TableCell sx={{ fontSize: '0.95rem' }}>{award.monthYear || '—'}</TableCell>
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>
        </TableContainer>
        <TableFooter count={filteredAwards.length} />
      </>
    );
  };

  const AwardTypesList = () => {
    const paginatedData = filteredAwardTypes.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
        <>
            <TableContainer sx={{ whiteSpace: 'nowrap' }}>
                <Table sx={{ minWidth: '100%' }}>
                    <TableHead sx={{ backgroundColor: '#8C257C' }}>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>SR. NO.</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>AWARD TYPE</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>CREATED AT</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', color: 'white', textAlign: 'center' }}>ACTIONS</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {awardTypesLoading ? <SkeletonLoader columns={4} /> :
                            paginatedData.map((type, index) => (
                                <TableRow key={type.id} hover>
                                    <TableCell sx={{ fontSize: '0.95rem' }}>{page * rowsPerPage + index + 1}</TableCell>
                                    <TableCell sx={{ fontSize: '0.95rem' }}>{type.name || '—'}</TableCell>
                                    <TableCell sx={{ fontSize: '0.95rem' }}>{type.createdAt || '—'}</TableCell>
                                    <TableCell>
                                        <Box display="flex" justifyContent="center" gap={0.5}>
                                           <Skeleton variant="rectangular" width={120} height={30} />
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <TableFooter count={filteredAwardTypes.length} />
        </>
    );
  };
  
  return (
    <Box component={Paper} p={3}>
        <Typography variant="h4" sx={{ color: '#8C257C', fontWeight: 'bold', mb: 4 }}>
            Awards 
        </Typography>

        {/* --- MODIFIED SECTION --- */}
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'flex-end', // Aligns items to the right
                alignItems: 'center',
                mb: 2,
            }}
        >
            <TextField
                size="small"
                placeholder="Search ..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
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
        {/* --- END OF MODIFIED SECTION --- */}

        <Tabs value={activeTab} onChange={handleTabChange} sx={{ borderBottom: 1, borderColor: 'divider', color:'#F58E35' }}>
            <Tab label="My Awards" sx={{ fontWeight: 'bold', textTransform: 'none', fontSize: '1rem' , color:'#8C257C '}} />
            <Tab label="Award Types" sx={{ fontWeight: 'bold', textTransform: 'none', fontSize: '1rem' , color:'#8C257C '}} />
        </Tabs>

        <Box mt={2}>
            {activeTab === 0 ? <AwardsList /> : <AwardTypesList />}
        </Box>
    </Box>
  );
}