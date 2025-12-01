import { useState, useEffect, useRef } from 'react';
import {
  Box, Typography, TextField, Button, Grid, FormControl,
  InputLabel, Select, MenuItem, CircularProgress, Stack
} from "@mui/material";
import axiosInstance from "../utils/axiosInstance";

// The component now accepts an 'onBack' prop
const BasicInformationForm = ({ onBack }) => {
  const employeeId = localStorage.getItem("loggedInEmpId");

  // State to hold all form data. Internally, we'll use country_id for clarity.
  const [formData, setFormData] = useState({
    first_name: '',
    middle_name: '',
    last_name: '',
    contact_number: '',
    gender: '',
    employee_id: '',
    date_of_birth: '',
    marital_status: '',
    country_id: '', // Internally represents the selected country
    state_id: '',
    employee_hub_id: '',
    city: '',
    zipcode: '',
    religion_id: '',
    blood_group: '',
    address_1: '',
    address_2: ''
  });

  // State for all dropdown options
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [religions, setReligions] = useState([]);
  const [employeeHubs, setEmployeeHubs] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const isInitialMount = useRef(true);

  // Effect for initial data fetching
  useEffect(() => {
    if (!employeeId) {
      setLoading(false);
      return;
    }

    const fetchInitialData = async () => {
      setLoading(true);
      try {
        const [infoRes, countryRes, religionRes, hubRes] = await Promise.all([
          axiosInstance.post('api/emp_basic_info/', { user_id: employeeId }),
          axiosInstance.get('api/countries/'),
          axiosInstance.get('api/religion-dropdown/'),
          axiosInstance.get('api/employee_hub/'),
        ]);

        const allCountries = countryRes.data.status === 'success' ? countryRes.data.data : [];
        const allHubs = hubRes.data.status === 'success' ? hubRes.data.data : [];
        const allReligions = Array.isArray(religionRes.data) ? religionRes.data : [];

        setCountries(allCountries);
        setEmployeeHubs(allHubs);
        setReligions(allReligions);

        if (infoRes.data.status === 'success' && infoRes.data.data.length > 0) {
          const employeeData = { ...infoRes.data.data[0] };
          if (employeeData.date_of_birth) {
            employeeData.date_of_birth = employeeData.date_of_birth.split('T')[0];
          }

          const hub = allHubs.find(h => h.employee_hub_name === employeeData.employee_hub_name);
          if (hub) {
            employeeData.employee_hub_id = hub.employee_hub_id;
          }
          
          const initialCountryId = employeeData.citizenship_id;
          
          setFormData(prev => ({ ...prev, ...employeeData, country_id: initialCountryId }));

          if (initialCountryId && allCountries.length > 0) {
            const countryName = allCountries.find(c => c.country_id === initialCountryId)?.country_name;
            if (countryName) {
              const stateRes = await axiosInstance.get(`api/states/?country_name=${countryName}`);
              if (stateRes.data.status === 'success') {
                setStates(stateRes.data.data);
              }
            }
          }
        }
      } catch (error) {
        console.error("Failed to fetch initial data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, [employeeId]);
  
  // Effect for fetching states when the country changes
  useEffect(() => {
    if (isInitialMount.current) {
        isInitialMount.current = false;
        return;
    }

    const fetchStates = async () => {
        if (!formData.country_id) {
            setStates([]);
            return;
        }

        const selectedCountry = countries.find(c => c.country_id === formData.country_id);
        if (selectedCountry) {
            try {
                const response = await axiosInstance.get(`api/states/?country_name=${selectedCountry.country_name}`);
                setStates(response.data.status === 'success' ? response.data.data : []);
            } catch (error) {
                console.error("Failed to fetch states:", error);
                setStates([]);
            }
        }
    };

    fetchStates();
  }, [formData.country_id, countries]);


  const handleChange = (event) => {
    const { name, value } = event.target;
    
    if (name === 'country_id') {
      setFormData(prev => ({ 
        ...prev, 
        country_id: value, 
        state_id: ''
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleUpdate = async () => {
    if (!employeeId) {
      alert("Cannot update profile: No user is specified.");
      return;
    }
    
    const stateName = states.find(s => s.state_id === formData.state_id)?.state_name || '';
    const religionName = religions.find(r => r.value === formData.religion_id)?.label || '';
    const hubName = employeeHubs.find(h => h.employee_hub_id === formData.employee_hub_id)?.employee_hub_name || null;

    const patchPayload = {
      user_id: Number(employeeId),
      first_name: formData.first_name,
      middle_name: formData.middle_name,
      last_name: formData.last_name,
      contact_number: formData.contact_number,
      gender: formData.gender,
      employee_id: formData.employee_id,
      date_of_birth: formData.date_of_birth,
      marital_status: Number(formData.marital_status),
      citizenship_id: Number(formData.country_id),
      state_id: Number(formData.state_id),
      state: stateName,
      city: formData.city,
      zipcode: formData.zipcode,
      religion_id: Number(formData.religion_id),
      religion: religionName,
      blood_group: formData.blood_group,
      address_1: formData.address_1,
      address_2: formData.address_2,
      employee_hub_id: Number(formData.employee_hub_id),
      employee_hub_name: hubName,
      is_active: 1, 
      role_id: 3,
    };

    try {
      const response = await axiosInstance.patch('api/emp_basic_info/', patchPayload);
      if (response.data.status === 'success') {
        alert('Profile updated successfully!');
      } else {
        alert(`Failed to update profile: ${response.data.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error("Error updating profile:", error.response?.data || error);
      alert('An error occurred while updating the profile.');
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
        <Typography sx={{ ml: 2 }}>Loading Information...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 6 }}>
      <Typography variant="h6" gutterBottom>Basic Information Form</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}><TextField name="first_name" label="First Name" value={formData.first_name || ''} onChange={handleChange} fullWidth /></Grid>
        <Grid item xs={12} sm={4}><TextField name="middle_name" label="Middle Name" value={formData.middle_name || ''} onChange={handleChange} fullWidth /></Grid>
        <Grid item xs={12} sm={4}><TextField name="last_name" label="Last Name" value={formData.last_name || ''} onChange={handleChange} fullWidth /></Grid>
        <Grid item xs={12} sm={6}><TextField name="contact_number" label="Contact Number" value={formData.contact_number || ''} onChange={handleChange} fullWidth /></Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth><InputLabel>Gender</InputLabel><Select name="gender" label="Gender" value={formData.gender || ''} onChange={handleChange}><MenuItem value="1">Male</MenuItem><MenuItem value="2">Female</MenuItem><MenuItem value="3">Other</MenuItem></Select></FormControl>
        </Grid>
        <Grid item xs={12} sm={6}><TextField name="employee_id" label="Employee ID" value={formData.employee_id || ''} onChange={handleChange} fullWidth /></Grid>
        <Grid item xs={12} sm={6}><TextField name="date_of_birth" label="Date of Birth" type="date" value={formData.date_of_birth || ''} onChange={handleChange} fullWidth InputLabelProps={{ shrink: true }} /></Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth><InputLabel>Marital Status</InputLabel><Select name="marital_status" label="Marital Status" value={formData.marital_status === 0 ? "0" : formData.marital_status || ''} onChange={handleChange}><MenuItem value="0">Single</MenuItem><MenuItem value="1">Married</MenuItem></Select></FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth><InputLabel>Religion</InputLabel><Select name="religion_id" label="Religion" value={formData.religion_id || ''} onChange={handleChange}>
              {religions.map((religion) => (<MenuItem key={religion.value} value={religion.value}>{religion.label}</MenuItem>))}
          </Select></FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
            <FormControl fullWidth><InputLabel>Country</InputLabel><Select name="country_id" label="Country" value={formData.country_id || ''} onChange={handleChange}>
                {countries.map((country) => (<MenuItem key={country.country_id} value={country.country_id}>{country.country_name}</MenuItem>))}
            </Select></FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth disabled={!formData.country_id || states.length === 0}>
            <InputLabel>State</InputLabel>
            <Select name="state_id" label="State" value={formData.state_id || ''} onChange={handleChange}>
              {states.map((state) => (<MenuItem key={state.state_id} value={state.state_id}>{state.state_name}</MenuItem>))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}><TextField name="city" label="City" value={formData.city || ''} onChange={handleChange} fullWidth /></Grid>
        <Grid item xs={12} sm={6}><TextField name="zipcode" label="Zip Code" value={formData.zipcode || ''} onChange={handleChange} fullWidth /></Grid>
        <Grid item xs={12} sm={6}><TextField name="blood_group" label="Blood Group" value={formData.blood_group || ''} onChange={handleChange} fullWidth /></Grid>
        <Grid item xs={12} sm={6}>
            <FormControl fullWidth><InputLabel>Holiday Hub</InputLabel><Select name="employee_hub_id" label="holiday Hub" value={formData.employee_hub_id || ''} onChange={handleChange}>
                {employeeHubs.map((hub) => (<MenuItem key={hub.employee_hub_id} value={hub.employee_hub_id}>{hub.employee_hub_name}</MenuItem>))}
            </Select></FormControl>
        </Grid>
        <Grid item xs={12} sm={6}><TextField name="address_1" label="Address 1" value={formData.address_1 || ''} onChange={handleChange} fullWidth /></Grid>
        <Grid item xs={12} sm={6}><TextField name="address_2" label="Address 2" value={formData.address_2 || ''} onChange={handleChange} fullWidth /></Grid>
      </Grid>
      {/* Container for the buttons */}
      <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
        <Button variant="outlined" color="secondary" onClick={onBack}>
          Back
        </Button>
        <Button variant="contained" color="primary" onClick={handleUpdate}>
          Update Profile
        </Button>
      </Stack>
    </Box>
  )
}

export default BasicInformationForm;