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
// export default function AwardManagementHead() {
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
  Select,
  MenuItem,
  Tabs,
  Tab,
  CircularProgress,
  TablePagination,
} from '@mui/material';

/**
 * AwardManagementHead Component
 * Displays two tabs: one for an employee's awards and another for all available award types.
 */
export default function AwardManagementHead() {
  // UI State
  const [activeTab, setActiveTab] = useState(0);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  // State for "Awards" data
  const [awards, setAwards] = useState([]);
  const [awardsLoading, setAwardsLoading] = useState(true);
  const [awardsError, setAwardsError] = useState(null);

  // State for "Award Types" data
  const [awardTypes, setAwardTypes] = useState([]);
  const [awardTypesLoading, setAwardTypesLoading] = useState(true);
  const [awardTypesError, setAwardTypesError] = useState(null);

  // Fetch data
  useEffect(() => {
    const employeeId = localStorage.getItem('loggedInUser');

    const fetchAwards = async () => {
      if (!employeeId) {
        setAwardsError('No employee ID found in localStorage.');
        setAwardsLoading(false);
        return;
      }
      try {
        const res = await fetch(`https://tdtlworld.com/hrms-backend/employee_awards/${employeeId}/`);
        if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
        const data = await res.json();

        const formatted = data.map((item, index) => ({
          id: item.id || index + 1,
          awardType: item.award_type,
          awardGift: item.award_gift,
          awardCash: item.award_cash,
          monthYear: item.month_year,
          employee: employeeId,
        }));
        setAwards(formatted);
      } catch (err) {
        setAwardsError(err.message);
      } finally {
        setAwardsLoading(false);
      }
    };

    const fetchAwardTypes = async () => {
      try {
        const res = await fetch('https://tdtlworld.com/hrms-backend/api/award-types/');
        if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
        const data = await res.json();

        const formatted = data.map((item) => ({
          id: item.id,
          name: item.name,
          createdAt: new Date(item.created_at).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }),
        }));
        setAwardTypes(formatted);
      } catch (err) {
        setAwardTypesError(err.message);
      } finally {
        setAwardTypesLoading(false);
      }
    };

    fetchAwards();
    fetchAwardTypes();
  }, []);

  // Handlers
  const handleTabChange = (e, newValue) => {
    setActiveTab(newValue);
    setSearchTerm('');
    setEntriesPerPage(10);
    setPage(0);
  };

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setEntriesPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Filters
  const filteredAwards = awards.filter((a) =>
    Object.values(a).some((v) => (String(v) || '').toLowerCase().includes(searchTerm.toLowerCase()))
  );
  const filteredAwardTypes = awardTypes.filter((t) =>
    (t.name || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Reusable loading/error handler
  const DataStatus = ({ loading, error, colSpan, type }) => {
    if (loading)
      return (
        <TableRow>
          <TableCell colSpan={colSpan} align="center" sx={{ py: 5 }}>
            <CircularProgress size={24} sx={{ mr: 1 }} />
            <Typography component="span">Loading {type}...</Typography>
          </TableCell>
        </TableRow>
      );
    if (error)
      return (
        <TableRow>
          <TableCell colSpan={colSpan} align="center" sx={{ color: 'error.main', py: 5 }}>
            Error: {error}
          </TableCell>
        </TableRow>
      );
    return null;
  };

  // Table controls (search + show entries)
  const TableControls = () => (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography variant="body2" sx={{ mr: 1 }}>
          Show
        </Typography>
        <Select size="small" value={entriesPerPage} onChange={handleChangeRowsPerPage}>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={25}>25</MenuItem>
          <MenuItem value={50}>50</MenuItem>
        </Select>
        <Typography variant="body2" sx={{ ml: 1 }}>
          entries
        </Typography>
      </Box>
      <TextField
        size="small"
        variant="outlined"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </Box>
  );

  // === Awards Table ===
  const AwardsList = () => {
    const startIndex = page * entriesPerPage;
    const paginatedData = filteredAwards.slice(startIndex, startIndex + entriesPerPage);

    return (
      <Box>
        <TableControls />
        <TableContainer component={Paper} sx={{ borderRadius: 2, overflow: 'hidden' }}>
          <Table>
            <TableHead sx={{ backgroundColor: '#8C257C' }}>
              <TableRow>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>SR NO.</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>AWARD TYPE</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>EMPLOYEE ID</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>GIFT</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>CASH</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>MONTH & YEAR</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {awardsLoading || awardsError ? (
                <DataStatus loading={awardsLoading} error={awardsError} colSpan={6} type="Awards" />
              ) : paginatedData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    No awards found.
                  </TableCell>
                </TableRow>
              ) : (
                paginatedData.map((award, index) => (
                  <TableRow key={award.id} hover>
                    <TableCell>{startIndex + index + 1}</TableCell>
                    <TableCell>{award.awardType || '—'}</TableCell>
                    <TableCell>{award.employee}</TableCell>
                    <TableCell>{award.awardGift || '—'}</TableCell>
                    <TableCell>{`$${Number(award.awardCash || 0).toFixed(2)}`}</TableCell>
                    <TableCell>{award.monthYear || '—'}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
          <Typography variant="body2" color="text.secondary">
            Total Entries: {filteredAwards.length}
          </Typography>
          <TablePagination
            component="div"
            count={filteredAwards.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={entriesPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[10, 25, 50]}
            sx={{
              '& .MuiTablePagination-actions button': {
                color: '#8C257C',
              },
            }}
          />
        </Box>
      </Box>
    );
  };

  // === Award Types Table ===
  const AwardTypesList = () => {
    const startIndex = page * entriesPerPage;
    const paginatedData = filteredAwardTypes.slice(startIndex, startIndex + entriesPerPage);

    return (
      <Box>
        <TableControls />
        <TableContainer component={Paper} sx={{ borderRadius: 2, overflow: 'hidden' }}>
          <Table>
            <TableHead sx={{ backgroundColor: '#8C257C' }}>
              <TableRow>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>SR NO.</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>AWARD TYPE</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>CREATED AT</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {awardTypesLoading || awardTypesError ? (
                <DataStatus loading={awardTypesLoading} error={awardTypesError} colSpan={3} type="Award Types" />
              ) : paginatedData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} align="center">
                    No award types found.
                  </TableCell>
                </TableRow>
              ) : (
                paginatedData.map((type, index) => (
                  <TableRow key={type.id} hover>
                    <TableCell>{startIndex + index + 1}</TableCell>
                    <TableCell>{type.name || '—'}</TableCell>
                    <TableCell>{type.createdAt || '—'}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
          <Typography variant="body2" color="text.secondary">
            Total Entries: {filteredAwardTypes.length}
          </Typography>
          <TablePagination
            component="div"
            count={filteredAwardTypes.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={entriesPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[10, 25, 50]}
            sx={{
              '& .MuiTablePagination-actions button': {
                color: '#8C257C',
              },
            }}
          />
        </Box>
      </Box>
    );
  };

  return (
    <Box sx={{ p: 3, backgroundColor: '#fafafa', minHeight: '100vh' }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: '#8C257C' }}>
        Awards
      </Typography>

      <Paper elevation={3}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          sx={{
            borderBottom: 1,
            borderColor: 'divider',
            '& .MuiTab-root.Mui-selected': {
              color: '#F58E35',
            },
            '& .MuiTabs-indicator': {
              backgroundColor: '#F58E35',
            },
          }}
        >
          <Tab label="My Awards" sx={{ fontWeight: 'bold', textTransform: 'none', fontSize: '1rem' }} />
          <Tab label="Award Types" sx={{ fontWeight: 'bold', textTransform: 'none', fontSize: '1rem' }} />
        </Tabs>

        <Box p={3}>{activeTab === 0 ? <AwardsList /> : <AwardTypesList />}</Box>
      </Paper>
    </Box>
  );
}
