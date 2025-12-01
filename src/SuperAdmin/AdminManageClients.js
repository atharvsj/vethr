// import React, { useState, useEffect } from 'react';
// import {
//   Box, Typography, Button, Card, CardContent, Grid, IconButton,
//   TextField, Avatar, Divider, MenuItem, FormControl, InputLabel, Select,
//   Dialog, DialogActions, DialogContent, DialogTitle,
//   Paper, Tooltip, Skeleton, CircularProgress, InputAdornment
// } from '@mui/material';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import { LocalizationProvider } from '@mui/x-date-pickers';

// // Icons
// import {
//   Edit as EditIcon,
//   Delete as DeleteIcon,
//   Search as SearchIcon,
//   PhotoCamera as PhotoCameraIcon,
//   Save as SaveIcon,
//   AddCircleOutline as AddCircleOutlineIcon,
//   PeopleAlt as PeopleAltIcon,
//   Business as BusinessIcon,
//   Phone as PhoneIcon,
//   Email as EmailIcon,
//   Refresh as RefreshIcon,
//   Close as CloseIcon,
//   WarningAmber as WarningAmberIcon,
// } from '@mui/icons-material';

// // Gradient button style (reusable)
// const gradientButtonStyle = {
//   background: 'linear-gradient(135deg, rgba(36, 73, 239, 0.89) 0%, rgb(218, 18, 202) 100%)',
//   color: 'white',
//   borderRadius: 2,
//   fontWeight: 600,
//   boxShadow: '0 4px 10px rgba(36, 73, 239, 0.3)',
//   transition: 'all 0.3s ease',
//   '&:hover': {
//     background: 'linear-gradient(135deg, rgba(36, 73, 239, 1) 0%, rgb(218, 18, 202, 1) 100%)',
//     boxShadow: '0 6px 15px rgba(36, 73, 239, 0.4)',
//     transform: 'translateY(-2px)',
//   },
//   '&.Mui-disabled': {
//     background: 'rgba(0, 0, 0, 0.12)',
//     color: 'rgba(0, 0, 0, 0.26)',
//     boxShadow: 'none',
//   }
// };

// // Skeleton for Client Card
// const ClientCardSkeleton = () => (
//   <Grid item xs={12} sm={6} md={4}>
//     <Card sx={{ borderRadius: 2, height: '100%' }}>
//       <CardContent>
//         <Box display="flex" alignItems="center" mb={2}>
//           <Skeleton variant="circular" width={50} height={50} sx={{ mr: 2 }} />
//           <Box>
//             <Skeleton variant="text" width={120} height={28} />
//             <Skeleton variant="text" width={150} />
//           </Box>
//         </Box>
//         <Skeleton variant="text" width="80%" />
//         <Skeleton variant="text" width="70%" />
//         <Skeleton variant="text" width="60%" />
//         <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
//           <Skeleton variant="circular" width={32} height={32} />
//           <Skeleton variant="circular" width={32} height={32} />
//         </Box>
//       </CardContent>
//     </Card>
//   </Grid>
// );


// export default function ManageClients() {
//   const [clients, setClients] = useState([]);
//   const [filteredClients, setFilteredClients] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [submitLoading, setSubmitLoading] = useState(false);
//   const [refreshKey, setRefreshKey] = useState(0);

//   const [searchTerm, setSearchTerm] = useState("");
//   const initialClientState = { name: "", company: "", contactNo: "", gender: "", email: "", profilePicture: null, profilePictureFile: null };
//   const [currentClient, setCurrentClient] = useState(initialClientState);
//   const [isEditing, setIsEditing] = useState(false);

//   const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
//   const [clientToDelete, setClientToDelete] = useState(null);

//   useEffect(() => {
//     setLoading(true);
//     setTimeout(() => {
//       const sampleData = [
//         { id: 1, name: "Amit Sharma", company: "TechCorp", contactNo: "9876543210", gender: "Male", email: "amit.sharma.longemailaddress@example.com", profilePicture: null },
//         { id: 2, name: "Priya Nair", company: "Innovatech", contactNo: "9876543211", gender: "Female", email: "priya.nair@example.com", profilePicture: '/placeholder.svg' },
//         { id: 3, name: "Rajesh Kumar", company: "AlphaTech", contactNo: "9876543212", gender: "Male", email: "rajesh.kumar@example.com", profilePicture: null },
//         { id: 4, name: "Sneha Patel", company: "BetaCorp", contactNo: "9876543213", gender: "Female", email: "another.very.long.email.address.for.testing.purposes@example-domain.com", profilePicture: null },
//         { id: 5, name: "Anil Verma", company: "Delta Solutions", contactNo: "9876543214", gender: "Male", email: "anil.verma@example.com", profilePicture: null },
//       ];
//       setClients(sampleData);
//       setFilteredClients(sampleData);
//       setLoading(false);
//     }, 1000);
//   }, [refreshKey]);

//   useEffect(() => {
//     const lowercasedQuery = searchTerm.toLowerCase();
//     const filtered = clients.filter(client =>
//         client.name.toLowerCase().includes(lowercasedQuery) ||
//         client.company.toLowerCase().includes(lowercasedQuery) ||
//         client.email.toLowerCase().includes(lowercasedQuery) ||
//         client.contactNo.includes(lowercasedQuery)
//     );
//     setFilteredClients(filtered);
//   }, [searchTerm, clients]);

//   const handleRefresh = () => setRefreshKey(k => k + 1);

//   const handleInputChange = (e) => {
//     setCurrentClient({ ...currentClient, [e.target.name]: e.target.value });
//   };

//   const handleFileChange = (e) => {
//     if (e.target.files && e.target.files[0]) {
//       setCurrentClient({
//         ...currentClient,
//         profilePicture: URL.createObjectURL(e.target.files[0]),
//         profilePictureFile: e.target.files[0]
//       });
//     }
//   };

//   const handleAddOrUpdateClient = async () => {
//     if (!currentClient.name || !currentClient.company || !currentClient.contactNo || !currentClient.email || !currentClient.gender) {
//         alert("Please fill all required fields.");
//         return;
//     }
//     setSubmitLoading(true);
//     await new Promise(resolve => setTimeout(resolve, 1000));

//     if (isEditing) {
//       setClients(clients.map(client =>
//         client.id === currentClient.id ? { ...currentClient, profilePictureFile: undefined } : client
//       ));
//     } else {
//       setClients([{ ...currentClient, id: Date.now(), profilePictureFile: undefined }, ...clients]);
//     }
//     setCurrentClient(initialClientState);
//     setIsEditing(false);
//     setSubmitLoading(false);
//   };

//   const handleEditClient = (client) => {
//     setIsEditing(true);
//     setCurrentClient({ ...client, profilePictureFile: null });
//   };

//   const handleCancelEdit = () => {
//     setIsEditing(false);
//     setCurrentClient(initialClientState);
//   };

//   const handleOpenDeleteDialog = (client) => {
//     setClientToDelete(client);
//     setOpenDeleteDialog(true);
//   };
//   const handleCloseDeleteDialog = () => {
//     setOpenDeleteDialog(false);
//     setClientToDelete(null);
//   };
//   const handleDeleteClient = async () => {
//     if (!clientToDelete) return;
//     setClients(clients.filter(client => client.id !== clientToDelete.id));
//     handleCloseDeleteDialog();
//   };


//   const renderClientForm = () => (
//     <Paper elevation={3} sx={{ p: {xs:2, sm:3}, borderRadius: 2, mb: {xs:3, md:0}, height: '100%' }}>
//       <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
//         {isEditing ? <EditIcon sx={{mr:1}}/> : <AddCircleOutlineIcon sx={{mr:1}}/>}
//         {isEditing ? "Edit Client Details" : "Add New Client"}
//       </Typography>
//       <Divider sx={{my:2}}/>
//       <Grid container spacing={2}>
//         <Grid item xs={12} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb:1 }}>
//             <Avatar
//               src={currentClient.profilePicture || undefined}
//               sx={{ width: 100, height: 100, mb: 1, bgcolor: 'primary.light' }}
//             >
//                 {!currentClient.profilePicture && <PeopleAltIcon sx={{fontSize: 50}}/>}
//             </Avatar>
//             <Button variant="outlined" size="small" component="label" startIcon={<PhotoCameraIcon />}>
//                 Upload Picture
//                 <input accept="image/*" type="file" hidden onChange={handleFileChange} />
//             </Button>
//         </Grid>

//         <Grid item xs={12} sm={6}>
//           <TextField label="Full Name" name="name" value={currentClient.name} onChange={handleInputChange} fullWidth required size="small" sx={{'& .MuiOutlinedInput-root': { borderRadius: 2}}} InputProps={{startAdornment: <InputAdornment position="start"><PeopleAltIcon fontSize="small" /></InputAdornment>}}/>
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <TextField label="Company Name" name="company" value={currentClient.company} onChange={handleInputChange} fullWidth required size="small" sx={{'& .MuiOutlinedInput-root': { borderRadius: 2}}} InputProps={{startAdornment: <InputAdornment position="start"><BusinessIcon fontSize="small" /></InputAdornment>}} />
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <TextField label="Contact Number" name="contactNo" value={currentClient.contactNo} onChange={handleInputChange} fullWidth required size="small" type="tel" sx={{'& .MuiOutlinedInput-root': { borderRadius: 2}}} InputProps={{startAdornment: <InputAdornment position="start"><PhoneIcon fontSize="small" /></InputAdornment>}}/>
//         </Grid>
//         <Grid item xs={12} sm={6}>
//             <FormControl fullWidth required size="small" sx={{'& .MuiOutlinedInput-root': { borderRadius: 2}}}>
//                 <InputLabel id="gender-select-label">Gender</InputLabel>
//                 <Select labelId="gender-select-label" label="Gender" name="gender" value={currentClient.gender} onChange={handleInputChange} startAdornment={<InputAdornment position="start"><PeopleAltIcon fontSize="small" /></InputAdornment>}>
//                     <MenuItem value="Male">Male</MenuItem>
//                     <MenuItem value="Female">Female</MenuItem>
//                     <MenuItem value="Other">Other</MenuItem>
//                 </Select>
//             </FormControl>
//         </Grid>
//         <Grid item xs={12}>
//           <TextField label="Email Address" name="email" value={currentClient.email} onChange={handleInputChange} fullWidth required type="email" size="small" sx={{'& .MuiOutlinedInput-root': { borderRadius: 2}}} InputProps={{startAdornment: <InputAdornment position="start"><EmailIcon fontSize="small" /></InputAdornment>}}/>
//         </Grid>
//         <Grid item xs={12} sx={{ mt: 1, display: 'flex', justifyContent: isEditing ? 'space-between' : 'flex-end' }}>
//             {isEditing && (
//                  <Button variant="outlined" color="inherit" onClick={handleCancelEdit} sx={{borderRadius:2}} disabled={submitLoading}>Cancel Edit</Button>
//             )}
//           <Button
//             onClick={handleAddOrUpdateClient}
//             sx={{ ...gradientButtonStyle, py: 1, px: 3, minWidth: 150 }}
//             disabled={submitLoading}
//             startIcon={submitLoading ? <CircularProgress size={20} color="inherit"/> : (isEditing ? <SaveIcon /> : <AddCircleOutlineIcon />)}
//           >
//             {isEditing ? "Save Changes" : "Add Client"}
//           </Button>
//         </Grid>
//       </Grid>
//     </Paper>
//   );

//   return (
//     <LocalizationProvider dateAdapter={AdapterDateFns}>
//     <Box sx={{ p: { xs: 2, sm: 3 } }}>
//       <Card
//         elevation={0}
//         sx={{
//           mb: 3, borderRadius: 2,
//           background: "linear-gradient(135deg, rgba(36, 73, 239, 0.03) 0%, rgba(218, 18, 202, 0.03) 100%)",
//           borderLeft: "5px solid",
//           borderImage: "linear-gradient(135deg, rgba(36, 73, 239, 0.89) 0%, rgb(218, 18, 202) 100%) 1",
//         }}
//       >
//         <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
//           <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
//             <PeopleAltIcon sx={{ fontSize: '2rem', mr: 1, color: 'primary.main' }} />
//             <Typography variant="h4" sx={{ fontWeight: 700, color: "text.primary" }}>
//               Manage Clients
//             </Typography>
//           </Box>
//           <Typography variant="body2" color="text.secondary">
//             Add, view, edit, and manage your client information.
//           </Typography>
//         </CardContent>
//       </Card>

//       <Grid container spacing={3}>
//         <Grid item xs={12} md={5} lg={4}>
//           {renderClientForm()}
//         </Grid>

//         <Grid item xs={12} md={7} lg={8}>
//             <Paper sx={{ p: 2.5, mb: 2.5, borderRadius: 2, boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
//                  <Grid container spacing={2} alignItems="center">
//                     <Grid item xs={12} sm={8}>
//                         <TextField
//                             fullWidth
//                             variant="outlined"
//                             placeholder="Search Clients by Name, Company, Email, Contact..."
//                             value={searchTerm}
//                             onChange={(e) => setSearchTerm(e.target.value)}
//                             InputProps={{
//                                 startAdornment: (<InputAdornment position="start"><SearchIcon color="action" /></InputAdornment>),
//                             }}
//                             sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
//                         />
//                     </Grid>
//                      <Grid item xs={12} sm={4} sx={{ display: 'flex', justifyContent: {xs: 'flex-start', sm: 'flex-end'} }}>
//                         <Tooltip title="Refresh List">
//                             <IconButton onClick={handleRefresh} color="primary" sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
//                                 <RefreshIcon />
//                             </IconButton>
//                         </Tooltip>
//                     </Grid>
//                  </Grid>
//             </Paper>

//             {loading ? (
//                 <Grid container spacing={2.5}>
//                     {Array.from(new Array(3)).map((_, index) => (<ClientCardSkeleton key={index} />))}
//                 </Grid>
//             ) : filteredClients.length === 0 ? (
//                 <Paper sx={{textAlign: 'center', p:5, borderRadius: 2, mt: 2}}>
//                     <PeopleAltIcon sx={{fontSize: 60, color: 'text.disabled', mb: 2}}/>
//                     <Typography variant="h6" color="text.secondary">
//                         {searchTerm ? "No clients match your search." : "No clients found."}
//                     </Typography>
//                      <Typography variant="body2" color="text.secondary" sx={{mt:1}}>
//                         {searchTerm ? "Try a different search term." : "Use the form to add your first client."}
//                     </Typography>
//                 </Paper>
//             ) : (
//                 <Grid container spacing={2.5}>
//                     {filteredClients.map((client) => (
//                     <Grid item xs={12} sm={6} lg={4} key={client.id}>
//                         <Card sx={{ borderRadius: 2, height: '100%', display: 'flex', flexDirection: 'column', transition: 'box-shadow 0.3s', '&:hover': {boxShadow: 6} }}>
//                         <CardContent sx={{ flexGrow: 1 }}>
//                             <Box display="flex" alignItems="center" mb={2}>
//                             <Avatar src={client.profilePicture || undefined} sx={{ width: 56, height: 56, mr: 2, bgcolor: 'secondary.light' }}>
//                                 {!client.profilePicture && client.name.charAt(0).toUpperCase()}
//                             </Avatar>
//                             <Box sx={{ overflow: 'hidden' }}> {/* Added this Box to constrain width for Typography */}
//                                 <Typography variant="h6" sx={{fontWeight: 'medium'}}>{client.name}</Typography>
//                                 <Typography
//                                     variant="body2"
//                                     color="textSecondary"
//                                     sx={{
//                                     whiteSpace: 'nowrap',
//                                     overflow: 'hidden',
//                                     textOverflow: 'ellipsis',
//                                     // maxWidth: '100%' // Let the parent Box control the max width
//                                     }}
//                                 >
//                                     {client.email}
//                                 </Typography>
//                             </Box>
//                             </Box>
//                             <Divider sx={{my:1}}/>
//                             <Typography variant="body2" color="text.secondary" gutterBottom><BusinessIcon fontSize="inherit" sx={{verticalAlign: 'middle', mr:0.5}}/> {client.company}</Typography>
//                             <Typography variant="body2" color="text.secondary" gutterBottom><PhoneIcon fontSize="inherit" sx={{verticalAlign: 'middle', mr:0.5}}/> {client.contactNo}</Typography>
//                             <Typography variant="body2" color="text.secondary"><PeopleAltIcon fontSize="inherit" sx={{verticalAlign: 'middle', mr:0.5}}/> {client.gender}</Typography>
//                         </CardContent>
//                         <Box sx={{ p: 1, borderTop: '1px solid', borderColor: 'divider', display: 'flex', justifyContent: 'flex-end', gap: 0.5, bgcolor: 'grey.50' }}>
//                             <Tooltip title="Edit Client">
//                                 <IconButton size="small" sx={{color: 'secondary.main'}} onClick={() => handleEditClient(client)}>
//                                     <EditIcon fontSize="small"/>
//                                 </IconButton>
//                             </Tooltip>
//                             <Tooltip title="Delete Client">
//                                 <IconButton size="small" sx={{color: 'error.main'}} onClick={() => handleOpenDeleteDialog(client)}>
//                                     <DeleteIcon fontSize="small"/>
//                                 </IconButton>
//                             </Tooltip>
//                         </Box>
//                         </Card>
//                     </Grid>
//                     ))}
//                 </Grid>
//             )}
//         </Grid>
//       </Grid>

//       {/* Delete Confirmation Dialog */}
//       <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog} PaperProps={{sx: {borderRadius: 3}}}>
//         <DialogTitle sx={{display: 'flex', alignItems: 'center'}}>
//             <WarningAmberIcon color="error" sx={{mr:1}}/> Confirm Deletion
//         </DialogTitle>
//         <DialogContent>
//           <Typography>Are you sure you want to delete the client: <strong>{clientToDelete?.name}</strong>? This action cannot be undone.</Typography>
//         </DialogContent>
//         <DialogActions sx={{px:3, pb:2}}>
//           <Button onClick={handleCloseDeleteDialog} color="inherit" sx={{borderRadius:2}}>Cancel</Button>
//           <Button onClick={handleDeleteClient} variant="contained" color="error" sx={{borderRadius:2}}>
//             Delete
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//     </LocalizationProvider>
//   );
// }


import React, { useState, useEffect, useCallback } from 'react';
import {
  Box, Typography, Button, Card, CardContent, Grid, IconButton,
  TextField, Avatar, Divider, MenuItem, FormControl, InputLabel, Select,
  Dialog, DialogActions, DialogContent, DialogTitle,
  Paper, Tooltip, Skeleton, CircularProgress, InputAdornment
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers';

// Icons
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  PhotoCamera as PhotoCameraIcon,
  Save as SaveIcon,
  AddCircleOutline as AddCircleOutlineIcon,
  PeopleAlt as PeopleAltIcon,
  Business as BusinessIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  Refresh as RefreshIcon,
  Close as CloseIcon,
  WarningAmber as WarningAmberIcon,
} from '@mui/icons-material';

// --- API Configuration ---
const API_BASE_URL = 'https://tdtlworld.com/hrms-backend/api/clients/';

// Gradient button style (reusable)
const gradientButtonStyle = {
  background: 'linear-gradient(135deg, rgba(36, 73, 239, 0.89) 0%, rgb(218, 18, 202) 100%)',
  color: 'white',
  borderRadius: 2,
  fontWeight: 600,
  boxShadow: '0 4px 10px rgba(36, 73, 239, 0.3)',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: 'linear-gradient(135deg, rgba(36, 73, 239, 1) 0%, rgb(218, 18, 202, 1) 100%)',
    boxShadow: '0 6px 15px rgba(36, 73, 239, 0.4)',
    transform: 'translateY(-2px)',
  },
  '&.Mui-disabled': {
    background: 'rgba(0, 0, 0, 0.12)',
    color: 'rgba(0, 0, 0, 0.26)',
    boxShadow: 'none',
  }
};

// Skeleton for Client Card
const ClientCardSkeleton = () => (
  <Grid item xs={12} sm={6} md={4}>
    <Card sx={{ borderRadius: 2, height: '100%' }}>
      <CardContent>
        <Box display="flex" alignItems="center" mb={2}>
          <Skeleton variant="circular" width={50} height={50} sx={{ mr: 2 }} />
          <Box>
            <Skeleton variant="text" width={120} height={28} />
            <Skeleton variant="text" width={150} />
          </Box>
        </Box>
        <Skeleton variant="text" width="80%" />
        <Skeleton variant="text" width="70%" />
        <Skeleton variant="text" width="60%" />
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
          <Skeleton variant="circular" width={32} height={32} />
          <Skeleton variant="circular" width={32} height={32} />
        </Box>
      </CardContent>
    </Card>
  </Grid>
);

// Helper function to map API data to component state
const mapApiToState = (apiClient) => ({
  id: apiClient.id,
  name: apiClient.full_name,
  company: apiClient.company_name,
  contactNo: apiClient.contact_number,
  gender: apiClient.gender,
  email: apiClient.email_address,
  profilePicture: apiClient.profile_picture, // This is a URL string from the API
  profilePictureFile: null, // This is for local file handling
});


export default function ManageClients() {
  const [clients, setClients] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const [searchTerm, setSearchTerm] = useState("");
  const initialClientState = { id: null, name: "", company: "", contactNo: "", gender: "", email: "", profilePicture: null, profilePictureFile: null };
  const [currentClient, setCurrentClient] = useState(initialClientState);
  const [isEditing, setIsEditing] = useState(false);

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [clientToDelete, setClientToDelete] = useState(null);

  // --- Data Fetching Logic (GET all clients) ---
  const fetchClients = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(API_BASE_URL);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      // Filter out clients with no name, as they might be bad data
      const validClients = data.filter(client => client.full_name);
      const mappedData = validClients.map(mapApiToState).sort((a, b) => b.id - a.id); // Sort by most recent
      setClients(mappedData);
      setFilteredClients(mappedData);
    } catch (error) {
      console.error("Failed to fetch clients:", error);
      // You could add a state here to show an error message to the user
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchClients();
  }, [refreshKey, fetchClients]);

  useEffect(() => {
    const lowercasedQuery = searchTerm.toLowerCase();
    const filtered = clients.filter(client =>
      client.name.toLowerCase().includes(lowercasedQuery) ||
      client.company.toLowerCase().includes(lowercasedQuery) ||
      client.email.toLowerCase().includes(lowercasedQuery) ||
      client.contactNo.includes(lowercasedQuery)
    );
    setFilteredClients(filtered);
  }, [searchTerm, clients]);

  const handleRefresh = () => setRefreshKey(k => k + 1);

  const handleInputChange = (e) => {
    setCurrentClient({ ...currentClient, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setCurrentClient({
        ...currentClient,
        // Create a temporary local URL to preview the image
        profilePicture: URL.createObjectURL(e.target.files[0]),
        profilePictureFile: e.target.files[0]
      });
    }
  };

  // --- Add/Update Client Logic (POST/PATCH) ---
  const handleAddOrUpdateClient = async () => {
    if (!currentClient.name || !currentClient.company || !currentClient.contactNo || !currentClient.email || !currentClient.gender) {
      alert("Please fill all required fields.");
      return;
    }
    setSubmitLoading(true);

    // Use FormData for multipart/form-data, which is needed for file uploads
    const formData = new FormData();
    formData.append('full_name', currentClient.name);
    formData.append('company_name', currentClient.company);
    formData.append('contact_number', currentClient.contactNo);
    formData.append('gender', currentClient.gender);
    formData.append('email_address', currentClient.email);
    if (currentClient.profilePictureFile) {
      formData.append('profile_picture', currentClient.profilePictureFile);
    }

    try {
      const url = isEditing ? `${API_BASE_URL}${currentClient.id}/` : API_BASE_URL;
      const method = isEditing ? 'PATCH' : 'POST';

      const response = await fetch(url, {
        method: method,
        body: formData,
        // Do NOT set Content-Type header, the browser does it automatically for FormData
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log(result.message); // e.g., "Client details Created successfully."

      // Reset form and refresh the list
      setCurrentClient(initialClientState);
      setIsEditing(false);
      handleRefresh();

    } catch (error) {
      console.error("Failed to save client:", error);
      alert(`Error: ${error.message}`);
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleEditClient = (client) => {
    setIsEditing(true);
    setCurrentClient({ ...client, profilePictureFile: null }); // Set client data to form
    window.scrollTo(0, 0); // Scroll to top to see the form
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setCurrentClient(initialClientState);
  };

  const handleOpenDeleteDialog = (client) => {
    setClientToDelete(client);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setClientToDelete(null);
  };

  // --- Delete Client Logic (DELETE) ---
  const handleDeleteClient = async () => {
    if (!clientToDelete) return;

    try {
      const response = await fetch(`${API_BASE_URL}${clientToDelete.id}/`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // No JSON body on 204 No Content, but your API might return 200 OK with a message
      // const result = await response.json(); // This might fail if response is empty
      // console.log(result.message); // e.g., "Client deleted successfully."

      handleCloseDeleteDialog();
      handleRefresh(); // Refresh the list from the server

    } catch (error) {
      console.error("Failed to delete client:", error);
      alert(`Failed to delete client: ${error.message}`);
      handleCloseDeleteDialog();
    }
  };


  const renderClientForm = () => (
    <Paper elevation={3} sx={{ p: { xs: 2, sm: 3 }, borderRadius: 2, mb: { xs: 3, md: 0 }, height: '100%' }}>
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
        {isEditing ? <EditIcon sx={{ mr: 1 }} /> : <AddCircleOutlineIcon sx={{ mr: 1 }} />}
        {isEditing ? "Edit Client Details" : "Add New Client"}
      </Typography>
      <Divider sx={{ my: 2 }} />
      <Grid container spacing={2}>
        <Grid item xs={12} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 1 }}>
          <Avatar
            src={currentClient.profilePicture || undefined}
            sx={{ width: 100, height: 100, mb: 1, bgcolor: 'primary.light' }}
          >
            {!currentClient.profilePicture && <PeopleAltIcon sx={{ fontSize: 50 }} />}
          </Avatar>
          <Button variant="outlined" size="small" component="label" startIcon={<PhotoCameraIcon />}>
            Upload Picture
            <input accept="image/*" type="file" hidden onChange={handleFileChange} />
          </Button>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField label="Full Name" name="name" value={currentClient.name} onChange={handleInputChange} fullWidth required size="small" sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} InputProps={{ startAdornment: <InputAdornment position="start"><PeopleAltIcon fontSize="small" /></InputAdornment> }} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="Company Name" name="company" value={currentClient.company} onChange={handleInputChange} fullWidth required size="small" sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} InputProps={{ startAdornment: <InputAdornment position="start"><BusinessIcon fontSize="small" /></InputAdornment> }} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="Contact Number" name="contactNo" value={currentClient.contactNo} onChange={handleInputChange} fullWidth required size="small" type="tel" sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} InputProps={{ startAdornment: <InputAdornment position="start"><PhoneIcon fontSize="small" /></InputAdornment> }} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth required size="small" sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}>
            <InputLabel id="gender-select-label">Gender</InputLabel>
            <Select labelId="gender-select-label" label="Gender" name="gender" value={currentClient.gender} onChange={handleInputChange} startAdornment={<InputAdornment position="start"><PeopleAltIcon fontSize="small" /></InputAdornment>}>
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField label="Email Address" name="email" value={currentClient.email} onChange={handleInputChange} fullWidth required type="email" size="small" sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} InputProps={{ startAdornment: <InputAdornment position="start"><EmailIcon fontSize="small" /></InputAdornment> }} />
        </Grid>
        <Grid item xs={12} sx={{ mt: 1, display: 'flex', justifyContent: isEditing ? 'space-between' : 'flex-end' }}>
          {isEditing && (
            <Button variant="outlined" color="inherit" onClick={handleCancelEdit} sx={{ borderRadius: 2 }} disabled={submitLoading}>Cancel Edit</Button>
          )}
          <Button
            onClick={handleAddOrUpdateClient}
            sx={{ ...gradientButtonStyle, py: 1, px: 3, minWidth: 150 }}
            disabled={submitLoading}
            startIcon={submitLoading ? <CircularProgress size={20} color="inherit" /> : (isEditing ? <SaveIcon /> : <AddCircleOutlineIcon />)}
          >
            {isEditing ? "Save Changes" : "Add Client"}
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ p: { xs: 2, sm: 3 } }}>
        <Card
          elevation={0}
          sx={{
            mb: 3, borderRadius: 2,
            background: "linear-gradient(135deg, rgba(36, 73, 239, 0.03) 0%, rgba(218, 18, 202, 0.03) 100%)",
            borderLeft: "5px solid",
            borderImage: "linear-gradient(135deg, rgba(36, 73, 239, 0.89) 0%, rgb(218, 18, 202) 100%) 1",
          }}
        >
          <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <PeopleAltIcon sx={{ fontSize: '2rem', mr: 1, color: 'primary.main' }} />
              <Typography variant="h4" sx={{ fontWeight: 700, color: "text.primary" }}>
                Manage Clients
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary">
              Add, view, edit, and manage your client information.
            </Typography>
          </CardContent>
        </Card>

        <Grid container spacing={3}>
          <Grid item xs={12} md={5} lg={4}>
            {renderClientForm()}
          </Grid>

          <Grid item xs={12} md={7} lg={8}>
            <Paper sx={{ p: 2.5, mb: 2.5, borderRadius: 2, boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={8}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Search Clients by Name, Company, Email, Contact..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                      startAdornment: (<InputAdornment position="start"><SearchIcon color="action" /></InputAdornment>),
                    }}
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                  />
                </Grid>
                <Grid item xs={12} sm={4} sx={{ display: 'flex', justifyContent: { xs: 'flex-start', sm: 'flex-end' } }}>
                  <Tooltip title="Refresh List">
                    <span>
                      <IconButton onClick={handleRefresh} disabled={loading} color="primary" sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
                        <RefreshIcon />
                      </IconButton>
                    </span>
                  </Tooltip>
                </Grid>
              </Grid>
            </Paper>

            {loading ? (
              <Grid container spacing={2.5}>
                {Array.from(new Array(3)).map((_, index) => (<ClientCardSkeleton key={index} />))}
              </Grid>
            ) : filteredClients.length === 0 ? (
              <Paper sx={{ textAlign: 'center', p: 5, borderRadius: 2, mt: 2 }}>
                <PeopleAltIcon sx={{ fontSize: 60, color: 'text.disabled', mb: 2 }} />
                <Typography variant="h6" color="text.secondary">
                  {searchTerm ? "No clients match your search." : "No clients found."}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  {searchTerm ? "Try a different search term." : "Use the form to add your first client."}
                </Typography>
              </Paper>
            ) : (
              <Grid container spacing={2.5}>
                {filteredClients.map((client) => (
                  <Grid item xs={12} sm={6} lg={4} key={client.id}>
                    <Card sx={{ borderRadius: 2, height: '100%', display: 'flex', flexDirection: 'column', transition: 'box-shadow 0.3s', '&:hover': { boxShadow: 6 } }}>
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Box display="flex" alignItems="center" mb={2}>
                          <Avatar src={client.profilePicture || undefined} sx={{ width: 56, height: 56, mr: 2, bgcolor: 'secondary.light' }}>
                            {(!client.profilePicture && client.name) ? client.name.charAt(0).toUpperCase() : null}
                          </Avatar>
                          <Box sx={{ overflow: 'hidden' }}>
                            <Typography variant="h6" sx={{ fontWeight: 'medium' }}>{client.name}</Typography>
                            <Tooltip title={client.email}>
                              <Typography
                                variant="body2"
                                color="textSecondary"
                                sx={{
                                  whiteSpace: 'nowrap',
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                }}
                              >
                                {client.email}
                              </Typography>
                            </Tooltip>
                          </Box>
                        </Box>
                        <Divider sx={{ my: 1 }} />
                        <Typography variant="body2" color="text.secondary" gutterBottom><BusinessIcon fontSize="inherit" sx={{ verticalAlign: 'middle', mr: 0.5 }} /> {client.company}</Typography>
                        <Typography variant="body2" color="text.secondary" gutterBottom><PhoneIcon fontSize="inherit" sx={{ verticalAlign: 'middle', mr: 0.5 }} /> {client.contactNo}</Typography>
                        <Typography variant="body2" color="text.secondary"><PeopleAltIcon fontSize="inherit" sx={{ verticalAlign: 'middle', mr: 0.5 }} /> {client.gender}</Typography>
                      </CardContent>
                      <Box sx={{ p: 1, borderTop: '1px solid', borderColor: 'divider', display: 'flex', justifyContent: 'flex-end', gap: 0.5, bgcolor: 'grey.50' }}>
                        <Tooltip title="Edit Client">
                          <IconButton size="small" sx={{ color: 'secondary.main' }} onClick={() => handleEditClient(client)}>
                            <EditIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete Client">
                          <IconButton size="small" sx={{ color: 'error.main' }} onClick={() => handleOpenDeleteDialog(client)}>
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
          </Grid>
        </Grid>

        {/* Delete Confirmation Dialog */}
        <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog} PaperProps={{ sx: { borderRadius: 3 } }}>
          <DialogTitle sx={{ display: 'flex', alignItems: 'center' }}>
            <WarningAmberIcon color="error" sx={{ mr: 1 }} /> Confirm Deletion
          </DialogTitle>
          <DialogContent>
            <Typography>Are you sure you want to delete the client: <strong>{clientToDelete?.name}</strong>? This action cannot be undone.</Typography>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 2 }}>
            <Button onClick={handleCloseDeleteDialog} color="inherit" sx={{ borderRadius: 2 }}>Cancel</Button>
            <Button onClick={handleDeleteClient} variant="contained" color="error" sx={{ borderRadius: 2 }}>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </LocalizationProvider>
  );
}