// "use client"
// import { useState, useEffect } from "react"
// import { Box, Typography, TextField, Button, Tabs, Tab, FormControl, InputLabel, Select, MenuItem, CircularProgress, Grid, Stack } from "@mui/material"
// import axiosInstance from "../utils/axiosInstance";

// // Mappings for the 'experience' field
// const experienceApiToUi = { 1: 'Beginner', 2: 'Intermediate', 3: 'Expert' };
// const experienceUiToApi = { 'Beginner': 1, 'Intermediate': 2, 'Expert': 3 };

// // Component now accepts 'onBack' prop
// const PersonalInformation = ({ selectedTab, setSelectedTab, onBack }) => {
//   const employeeId = localStorage.getItem("loggedInEmpId");

//   const [bioData, setBioData] = useState({ bio: "", experience: "" });
//   const [socialProfile, setSocialProfile] = useState({
//     fb_profile: "",
//     twitter_profile: "",
//     gplus_profile: "",
//     linkedin_profile: ""
//   });
//   const [bankAccount, setBankAccount] = useState({
//     account_title: "",
//     account_number: "",
//     bank_name: "",
//     iban: "",
//     bank_branch: "",
//     pan_number: "",
//     esic_number: "",
//     pf_number: ""
//   });
//   const [emergencyContact, setEmergencyContact] = useState({
//     contact_full_name: "",
//     contact_phone_no: "",
//     contact_email: "",
//     contact_address: ""
//   });
  
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (!employeeId) return;
    
//     const apiTypeMap = { 0: 1, 1: 2, 2: 3, 3: 4 };
//     const type = apiTypeMap[selectedTab];

//     if (!type) return;

//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         const response = await axiosInstance.post('api/personal_info/', { user_id: employeeId, type });
//         if (response.data.status === 'success' && response.data.personal_details) {
//           const details = response.data.personal_details;
//           switch (type) {
//             case 1:
//               setBioData({
//                 bio: details.bio,
//                 experience: experienceApiToUi[details.experience] || ''
//               });
//               break;
//             case 2: setSocialProfile(details); break;
//             case 3: setBankAccount(details); break;
//             case 4: setEmergencyContact(details); break;
//           }
//         }
//       } catch (error) {
//         console.error(`Failed to fetch data for type ${type}:`, error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [selectedTab, employeeId]);

//   const handleTabChange = (event, newValue) => {
//     setSelectedTab(newValue);
//   };
  
//   const createChangeHandler = (setter) => (e) => {
//     setter(prev => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleBioChange = createChangeHandler(setBioData);
//   const handleSocialChange = createChangeHandler(setSocialProfile);
//   const handleBankChange = createChangeHandler(setBankAccount);
//   const handleEmergencyChange = createChangeHandler(setEmergencyContact);

//   const handleUpdate = async (type, payload) => {
//     if (!employeeId) return alert("No user specified.");
    
//     setLoading(true);
//     const fullPayload = { user_id: employeeId, type, ...payload };
//     try {
//       const response = await axiosInstance.patch('api/personal_info/', fullPayload);
//       if (response.data.status === 'success') {
//         alert("Information updated successfully!");
//       } else {
//         alert(`Update failed: ${response.data.message || 'Unknown error'}`);
//       }
//     } catch (error) {
//       console.error(`Failed to update data for type ${type}:`, error);
//       alert("An error occurred during the update.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleBioUpdate = () => {
//     const payloadForApi = {
//       bio: bioData.bio,
//       experience: experienceUiToApi[bioData.experience]
//     };
//     handleUpdate(1, payloadForApi);
//   };

//   const renderTabContent = () => {
//     if (loading) {
//       return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box>;
//     }
    
//     // Generic component for action buttons to avoid repetition
//     const ActionButtons = ({ onSave }) => (
//       <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
//         <Button variant="outlined" color="secondary" onClick={onBack}>
//           Back
//         </Button>
//         <Button variant="contained" color="primary" onClick={onSave}>
//           Update
//         </Button>
//       </Stack>
//     );
    
//     switch (selectedTab) {
//       case 0: // Bio
//         return (
//           <Box sx={{ mt: 2 }}>
//             <Typography variant="h6">Bio</Typography>
//             <TextField label="Bio" name="bio" fullWidth multiline rows={4} value={bioData.bio || ''} onChange={handleBioChange} sx={{ mt: 2 }} />
//             <FormControl fullWidth sx={{ mt: 2 }}>
//               <InputLabel>Experience</InputLabel>
//               <Select name="experience" value={bioData.experience || ''} label="Experience" onChange={handleBioChange}>
//                 <MenuItem value="Beginner">Beginner</MenuItem>
//                 <MenuItem value="Intermediate">Intermediate</MenuItem>
//                 <MenuItem value="Expert">Expert</MenuItem>
//               </Select>
//             </FormControl>
//             <ActionButtons onSave={handleBioUpdate} />
//           </Box>
//         );
//       case 1: // Social Profile
//         return (
//           <Box sx={{ mt: 2 }}>
//             <Typography variant="h6">Social Profile</Typography>
//             <Grid container spacing={2} sx={{mt: 1}}>
//               <Grid item xs={12} sm={6}><TextField name="fb_profile" label="Facebook URL" value={socialProfile.fb_profile || ''} onChange={handleSocialChange} fullWidth /></Grid>
//               <Grid item xs={12} sm={6}><TextField name="twitter_profile" label="Twitter URL" value={socialProfile.twitter_profile || ''} onChange={handleSocialChange} fullWidth /></Grid>
//               <Grid item xs={12} sm={6}><TextField name="gplus_profile" label="Google Plus URL" value={socialProfile.gplus_profile || ''} onChange={handleSocialChange} fullWidth /></Grid>
//               <Grid item xs={12} sm={6}><TextField name="linkedin_profile" label="LinkedIn URL" value={socialProfile.linkedin_profile || ''} onChange={handleSocialChange} fullWidth /></Grid>
//             </Grid>
//             <ActionButtons onSave={() => handleUpdate(2, socialProfile)} />
//           </Box>
//         );
//       case 2: // Bank Account
//         return (
//           <Box sx={{ mt: 2 }}>
//             <Typography variant="h6">Bank Account</Typography>
//              <Grid container spacing={2} sx={{ mt: 1 }}>
//                 <Grid item xs={12} sm={6}><TextField name="account_title" label="Account Title" value={bankAccount.account_title || ''} onChange={handleBankChange} fullWidth /></Grid>
//                 <Grid item xs={12} sm={6}><TextField name="account_number" label="Account Number" value={bankAccount.account_number || ''} onChange={handleBankChange} fullWidth /></Grid>
//                 <Grid item xs={12} sm={6}><TextField name="bank_name" label="Bank Name" value={bankAccount.bank_name || ''} onChange={handleBankChange} fullWidth /></Grid>
//                 <Grid item xs={12} sm={6}><TextField name="iban" label="IBAN" value={bankAccount.iban || ''} onChange={handleBankChange} fullWidth /></Grid>
//                 <Grid item xs={12} sm={6}><TextField name="bank_branch" label="Bank Branch" value={bankAccount.bank_branch || ''} onChange={handleBankChange} fullWidth /></Grid>
//                 <Grid item xs={12} sm={6}><TextField name="pan_number" label="PAN Number" value={bankAccount.pan_number || ''} onChange={handleBankChange} fullWidth /></Grid>
//                 <Grid item xs={12} sm={6}><TextField name="esic_number" label="ESIC Number" value={bankAccount.esic_number || ''} onChange={handleBankChange} fullWidth /></Grid>
//                 <Grid item xs={12} sm={6}><TextField name="pf_number" label="PF Number" value={bankAccount.pf_number || ''} onChange={handleBankChange} fullWidth /></Grid>
//             </Grid>
//             <ActionButtons onSave={() => handleUpdate(3, bankAccount)} />
//           </Box>
//         );
//       case 3: // Emergency Contact
//         return (
//           <Box sx={{ mt: 2 }}>
//             <Typography variant="h6">Emergency Contact</Typography>
//             <Grid container spacing={2} sx={{ mt: 1 }}>
//                 <Grid item xs={12} sm={6}><TextField name="contact_full_name" label="Full Name" value={emergencyContact.contact_full_name || ''} onChange={handleEmergencyChange} fullWidth /></Grid>
//                 <Grid item xs={12} sm={6}><TextField name="contact_phone_no" label="Contact Number" value={emergencyContact.contact_phone_no || ''} onChange={handleEmergencyChange} fullWidth /></Grid>
//                 <Grid item xs={12} sm={6}><TextField name="contact_email" label="Email" value={emergencyContact.contact_email || ''} onChange={handleEmergencyChange} fullWidth /></Grid>
//                 <Grid item xs={12} sm={6}><TextField name="contact_address" label="Address" value={emergencyContact.contact_address || ''} onChange={handleEmergencyChange} fullWidth /></Grid>
//             </Grid>
//             <ActionButtons onSave={() => handleUpdate(4, emergencyContact)} />
//           </Box>
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <Box sx={{ padding: 6 }}>
//       <Typography variant="h6">Personal Information</Typography>
//       <Tabs value={selectedTab} onChange={handleTabChange} indicatorColor="primary" textColor="primary" sx={{ mt: 2, borderBottom: 1, borderColor: 'divider' }}>
//         <Tab label="Bio" />
//         <Tab label="Social Profile" />
//         <Tab label="Bank Account" />
//         <Tab label="Emergency Contact" />
//       </Tabs>
//       {renderTabContent()}
//     </Box>
//   )
// }

// export default PersonalInformation;









"use client"
import { useState, useEffect } from "react";
import {
    Box, Typography, TextField, Button, Tabs, Tab, FormControl,
    InputLabel, Select, MenuItem, CircularProgress, Grid, Stack, Alert, InputAdornment
} from "@mui/material";
import axiosInstance from "../utils/axiosInstance";
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import GoogleIcon from '@mui/icons-material/Google';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const PersonalInformation = ({ selectedTab, setSelectedTab, onBack }) => {
    const employeeId = localStorage.getItem("loggedInEmpId");

    // State for each form section
    const [bioData, setBioData] = useState({ bio: "", experience: "" });
    const [socialProfile, setSocialProfile] = useState({ fb_profile: "", twitter_profile: "", gplus_profile: "", linkedin_profile: "" });
    const [bankAccount, setBankAccount] = useState({ account_title: "", account_number: "", bank_name: "", iban: "", bank_branch: "" });
    const [emergencyContact, setEmergencyContact] = useState({ contact_full_name: "", contact_phone_no_1: "", contact_phone_no_2: "", contact_email: "", contact_address: "" });
    const [identification, setIdentification] = useState({ uan_number: "", pf_no: "", esic_no: "", pan_no: "", aadhar_no: "", passport_no: "", vehicle_no: "", driving_licence_no: "" });
    const [policeStation, setPoliceStation] = useState({ police_station_address: "", police_station_country: "", police_station_state: "", police_station_state_id: null, police_station_district: "", police_station_village: "", police_station_pincode: "" });

    // State for UI and dynamic data
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ text: '', type: '' });
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState('');

    useEffect(() => {
        if (!employeeId) return;
        
        const apiTypeMap = { 0: 1, 1: 2, 2: 3, 3: 4, 4: 5, 5: 6 };
        const type = apiTypeMap[selectedTab];

        if (!type) return;

        const fetchData = async () => {
            setLoading(true);
            setMessage({ text: '', type: '' });
            try {
                const response = await axiosInstance.post('api/personal_info/', { user_id: employeeId, type });
                if (response.data.status === 'success' && response.data.personal_details) {
                    const details = response.data.personal_details;
                    switch (type) {
                        case 1: setBioData({ bio: details.bio || '', experience: details.experience || '' }); break;
                        case 2: setSocialProfile(details); break;
                        case 3:
                            const { ifsc_code, ...restOfBankDetails } = details;
                            setBankAccount({ ...restOfBankDetails, iban: ifsc_code || '' });
                            break;
                        case 4: setEmergencyContact(details); break;
                        case 5: 
                            const { pf_number, esic_number, pan_number, ...restOfId } = details;
                            setIdentification({
                                ...restOfId,
                                pf_no: pf_number || '',
                                esic_no: esic_number || '',
                                pan_no: pan_number || ''
                            });
                            break;
                        case 6: 
                            setPoliceStation({ ...details, police_station_state_id: details.police_station_state });
                            if (details.police_station_country) {
                                setSelectedCountry(details.police_station_country);
                            }
                            break;
                    }
                }
            } catch (error) {
                console.error(`Failed to fetch data for type ${type}:`, error);
                setMessage({ text: "Failed to load information.", type: 'error' });
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [selectedTab, employeeId]);

    // Fetch countries on component mount
    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const res = await axiosInstance.get('/api/countries/');
                setCountries(res.data.data);
            } catch (err) {
                console.error('Failed to fetch countries:', err);
            }
        };
        fetchCountries();
    }, []);

    // Fetch states when selectedCountry changes
    useEffect(() => {
        if (selectedCountry) {
            const fetchStates = async () => {
                try {
                    const res = await axiosInstance.get(`/api/states/?country_name=${selectedCountry}`);
                    setStates(res.data.data);
                } catch (err) {
                    console.error('Failed to fetch states:', err);
                    setStates([]);
                }
            };
            fetchStates();
        } else {
            setStates([]);
        }
    }, [selectedCountry]);

    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);
    };
  
    const createChangeHandler = (setter) => (e) => {
        setter(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleBioChange = createChangeHandler(setBioData);
    const handleSocialChange = createChangeHandler(setSocialProfile);
    const handleBankChange = createChangeHandler(setBankAccount);
    const handleEmergencyChange = createChangeHandler(setEmergencyContact);
    const handleIdentificationChange = createChangeHandler(setIdentification);
    const handlePoliceStationChange = createChangeHandler(setPoliceStation);

    const handleUpdate = async (type, payload) => {
        if (!employeeId) {
            setMessage({ text: 'No user specified.', type: 'error' });
            return;
        }
    
        setLoading(true);
        setMessage({ text: '', type: '' });
        const fullPayload = { user_id: employeeId, type, ...payload };
        
        try {
            const response = await axiosInstance.patch('api/personal_info/', fullPayload);
            if (response.data.status === 'success') {
                setMessage({ text: 'Information updated successfully!', type: 'success' });
            } else {
                setMessage({ text: response.data.message || 'An unknown error occurred.', type: 'error' });
            }
        } catch (error) {
            console.error(`Failed to update data for type ${type}:`, error);
            const errorMessage = error.response?.data?.message || 'An error occurred during the update.';
            setMessage({ text: errorMessage, type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    const handleIdentificationUpdate = () => {
        const { pf_no, esic_no, pan_no, ...restOfState } = identification;
        const payload = {
            ...restOfState,
            pf_number: pf_no,
            esic_number: esic_no,
            pan_number: pan_no,
        };
        handleUpdate(5, payload);
    };
    
    // CHANGE 1: Modified to send state as a string
    const handlePoliceStationUpdate = () => {
        // Destructure to remove the internal-use state_id from the payload
        const { police_station_state_id, ...restOfPoliceStation } = policeStation;
        
        const payload = {
            ...restOfPoliceStation,
            police_station_country: selectedCountry,
            // Ensure the state key sends the string value stored in the state
            police_station_state: policeStation.police_station_state 
        };
        handleUpdate(6, payload);
    };

    const renderTabContent = () => {
        if (loading) {
            return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}><CircularProgress /></Box>;
        }
    
        const ActionButtons = ({ onSave }) => (
            <Stack direction="row" spacing={2} sx={{ mt: 3, alignItems: 'center', justifyContent: 'flex-end' }}>
                {message.text && (
                    <Alert severity={message.type} onClose={() => setMessage({ text: '', type: '' })} sx={{ flex: '1 1 auto', mr: 'auto' }}>
                        {message.text}
                    </Alert>
                )}
                <Button variant="outlined" color="secondary" onClick={onBack}>Back</Button>
                <Button variant="contained" color="primary" onClick={onSave} disabled={loading}>Update</Button>
            </Stack>
        );
    
        switch (selectedTab) {
            // ... other cases remain unchanged
            case 0: // Bio
                return (
                    <Box sx={{ mt: 2, maxWidth: 800 }}>
                        <TextField label="Bio" name="bio" fullWidth multiline minRows={3} value={bioData.bio || ''} onChange={handleBioChange} sx={{ mb: 3 }} />
                        <TextField label="Experience" name="experience" select fullWidth value={bioData.experience || ''} onChange={handleBioChange}>
                            {Array.from({ length: 50 }, (_, i) => (<MenuItem key={i + 1} value={i + 1}>{i + 1} {i + 1 === 1 ? 'Year' : 'Years'}</MenuItem>))}
                        </TextField>
                        <ActionButtons onSave={() => handleUpdate(1, bioData)} />
                    </Box>
                );
            case 1: // Social Profile
                return (
                    <Box sx={{ mt: 2, maxWidth: 600 }}>
                         {[ { label: 'Facebook', name: 'fb_profile', icon: <FacebookIcon sx={{ color: '#3b5998' }} /> }, { label: 'Twitter', name: 'twitter_profile', icon: <TwitterIcon sx={{ color: '#00acee' }} /> }, { label: 'Google Plus', name: 'gplus_profile', icon: <GoogleIcon sx={{ color: '#db4437' }} /> }, { label: 'LinkedIn', name: 'linkedin_profile', icon: <LinkedInIcon sx={{ color: '#0e76a8' }} /> }, ].map(({ label, name, icon }) => (
                            <Box key={name} sx={{ mb: 2 }}>
                                <TextField label={label} fullWidth name={name} value={socialProfile[name] || ''} onChange={handleSocialChange} InputProps={{ startAdornment: <InputAdornment position="start">{icon}</InputAdornment> }} />
                            </Box>
                        ))}
                        <ActionButtons onSave={() => handleUpdate(2, socialProfile)} />
                    </Box>
                );
            case 2: // Bank Account
                return (
                    <Box sx={{ mt: 2 }}>
                        <Grid container spacing={2} maxWidth={800}>
                            <Grid item xs={12} sm={6}><TextField label="Account Holder Name" name="account_title" value={bankAccount.account_title || ''} onChange={(e) => handleBankChange({ target: { name: e.target.name, value: e.target.value.replace(/[^a-zA-Z\s]/g, '') } })} fullWidth /></Grid>
                            <Grid item xs={12} sm={6}><TextField label="Account Number" name="account_number" value={bankAccount.account_number || ''} onChange={(e) => handleBankChange({ target: { name: e.target.name, value: e.target.value.replace(/[^0-9]/g, '') } })} fullWidth /></Grid>
                            <Grid item xs={12} sm={6}><TextField label="Bank Name" name="bank_name" value={bankAccount.bank_name || ''} onChange={(e) => handleBankChange({ target: { name: e.target.name, value: e.target.value.replace(/[^a-zA-Z\s]/g, '') } })} fullWidth /></Grid>
                            <Grid item xs={12} sm={6}><TextField label="IFSC Code" name="iban" value={bankAccount.iban || ''} onChange={handleBankChange} fullWidth /></Grid>
                            <Grid item xs={12}><TextField label="Bank Branch" name="bank_branch" value={bankAccount.bank_branch || ''} onChange={(e) => handleBankChange({ target: { name: e.target.name, value: e.target.value.replace(/[^a-zA-Z\s]/g, '') } })} fullWidth /></Grid>
                        </Grid>
                        <ActionButtons 
                            onSave={() => {
                                const { iban, ...restOfBankAccount } = bankAccount;
                                const payload = { ...restOfBankAccount, ifsc_code: iban };
                                handleUpdate(3, payload);
                            }} 
                        />
                    </Box>
                );
            case 3: // Emergency Contact
                return (
                    <Box sx={{ mt: 2 }}>
                        <Grid container spacing={2} maxWidth={800}>
                            <Grid item xs={12}><TextField label="Full Name" name="contact_full_name" value={emergencyContact.contact_full_name || ''} onChange={(e) => handleEmergencyChange({ target: { name: e.target.name, value: e.target.value.replace(/[^a-zA-Z\s]/g, '') } })} fullWidth InputProps={{ startAdornment: <InputAdornment position="start"><PersonIcon /></InputAdornment> }} /></Grid>
                            <Grid item xs={12} sm={6}><TextField label="Emergency Contact 1" name="contact_phone_no_1" value={emergencyContact.contact_phone_no_1 || ''} onChange={(e) => handleEmergencyChange({ target: { name: e.target.name, value: e.target.value.replace(/[^0-9]/g, '').slice(0, 10) } })} fullWidth type="tel" /></Grid>
                            <Grid item xs={12} sm={6}><TextField label="Emergency Contact 2" name="contact_phone_no_2" value={emergencyContact.contact_phone_no_2 || ''} onChange={(e) => handleEmergencyChange({ target: { name: e.target.name, value: e.target.value.replace(/[^0-9]/g, '').slice(0, 10) } })} fullWidth type="tel" /></Grid>
                            <Grid item xs={12}><TextField label="Email" name="contact_email" value={emergencyContact.contact_email || ''} onChange={handleEmergencyChange} fullWidth InputProps={{ startAdornment: <InputAdornment position="start"><EmailIcon /></InputAdornment> }} /></Grid>
                            <Grid item xs={12}><TextField label="Address" name="contact_address" value={emergencyContact.contact_address || ''} onChange={handleEmergencyChange} fullWidth multiline minRows={2} /></Grid>
                        </Grid>
                        <ActionButtons onSave={() => handleUpdate(4, emergencyContact)} />
                    </Box>
                );
            case 4: // Identification Details
                return (
                    <Box sx={{ mt: 2 }}>
                        <Grid container spacing={2} maxWidth={800}>
                            <Grid item xs={12} sm={6}><TextField label="UAN No." name="uan_number" value={identification.uan_number || ''} onChange={(e) => handleIdentificationChange({ target: { name: e.target.name, value: e.target.value.replace(/[^0-9]/g, '') } })} fullWidth /></Grid>
                            <Grid item xs={12} sm={6}><TextField label="PF No." name="pf_no" value={identification.pf_no || ''} onChange={(e) => handleIdentificationChange({ target: { name: e.target.name, value: e.target.value.replace(/[^0-9]/g, '') } })} fullWidth /></Grid>
                            <Grid item xs={12} sm={6}><TextField label="ESIC No." name="esic_no" value={identification.esic_no || ''} onChange={(e) => handleIdentificationChange({ target: { name: e.target.name, value: e.target.value.replace(/[^0-9]/g, '') } })} fullWidth /></Grid>
                            <Grid item xs={12} sm={6}><TextField label="PAN No." name="pan_no" value={identification.pan_no || ''} onChange={(e) => handleIdentificationChange({ target: { name: e.target.name, value: e.target.value.toUpperCase() } })} fullWidth inputProps={{ maxLength: 10 }} /></Grid>
                            <Grid item xs={12} sm={6}><TextField label="Aadhar No." name="aadhar_no" value={identification.aadhar_no || ''} onChange={(e) => handleIdentificationChange({ target: { name: e.target.name, value: e.target.value.replace(/[^0-9]/g, '') } })} fullWidth /></Grid>
                            <Grid item xs={12} sm={6}><TextField label="Passport No." name="passport_no" value={identification.passport_no || ''} onChange={handleIdentificationChange} fullWidth /></Grid>
                            <Grid item xs={12} sm={6}><TextField label="Vehicle No." name="vehicle_no" value={identification.vehicle_no || ''} onChange={handleIdentificationChange} fullWidth /></Grid>
                            <Grid item xs={12} sm={6}><TextField label="Driving Licence No." name="driving_licence_no" value={identification.driving_licence_no || ''} onChange={handleIdentificationChange} fullWidth /></Grid>
                        </Grid>
                        <ActionButtons onSave={handleIdentificationUpdate} />
                    </Box>
                );
            case 5: // Police Station Details
                return (
                    <Box sx={{ mt: 2 }}>
                        <Grid container spacing={2} maxWidth={800}>
                            <Grid item xs={12}><TextField label="Police Station Address" name="police_station_address" value={policeStation.police_station_address || ''} onChange={handlePoliceStationChange} fullWidth /></Grid>
                            <Grid item xs={12} sm={6}><TextField select label="Country" value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)} fullWidth>{countries.map(c => <MenuItem key={c.country_id} value={c.country_name}>{c.country_name}</MenuItem>)}</TextField></Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField select label="State" name="police_station_state" value={policeStation.police_station_state || ''}
                                    onChange={(e) => {
                                        const stateName = e.target.value;
                                        const stateObj = states.find(s => s.state_name === stateName);
                                        setPoliceStation(prev => ({ ...prev, police_station_state: stateName, police_station_state_id: stateObj ? stateObj.state_id : null }));
                                    }} fullWidth disabled={!selectedCountry || states.length === 0}>
                                    {states.length > 0 ? states.map(s => <MenuItem key={s.state_id} value={s.state_name}>{s.state_name}</MenuItem>) : <MenuItem disabled>No States Available</MenuItem>}
                                </TextField>
                            </Grid>
                            <Grid item xs={12} sm={6}><TextField label="District" name="police_station_district" value={policeStation.police_station_district || ''} onChange={(e) => handlePoliceStationChange({ target: { name: e.target.name, value: e.target.value.replace(/[^a-zA-Z\s]/g, '') } })} fullWidth /></Grid>
                            <Grid item xs={12} sm={6}><TextField label="Village/City" name="police_station_village" value={policeStation.police_station_village || ''} onChange={(e) => handlePoliceStationChange({ target: { name: e.target.name, value: e.target.value.replace(/[^a-zA-Z\s]/g, '') } })} fullWidth /></Grid>
                            <Grid item xs={12} sm={6}><TextField label="Pincode" name="police_station_pincode" value={policeStation.police_station_pincode || ''} onChange={(e) => handlePoliceStationChange({ target: { name: e.target.name, value: e.target.value.replace(/[^0-9]/g, '').slice(0, 6) } })} fullWidth type="tel" /></Grid>
                        </Grid>
                        <ActionButtons onSave={handlePoliceStationUpdate} />
                    </Box>
                );
            default:
                return null;
        }
    };

    return (
        <Box sx={{ padding: 6 }}>
            <Typography variant="h6">Personal Information</Typography>
            <Tabs
                value={selectedTab}
                onChange={handleTabChange}
                indicatorColor="primary"
                textColor="primary"
                variant="scrollable"
                scrollButtons="auto"
                allowScrollButtonsMobile
                sx={{ mt: 2, borderBottom: 1, borderColor: 'divider' }}
            >
                <Tab label="Bio" />
                <Tab label="Social Profile" />
                <Tab label="Bank Account" />
                <Tab label="Emergency Contact" />
                <Tab label="Identification Details" />
                <Tab label="Police Station Details" />
            </Tabs>
            {renderTabContent()}
        </Box>
    )
}

export default PersonalInformation;