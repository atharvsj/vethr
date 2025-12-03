// import React, { useState } from 'react';
// import {
//   Box,
//   Typography,
//   TextField,
//   Button,
//   Grid,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Select,
//   MenuItem,
//   IconButton,
//   TableSortLabel,
//   Stack,
// } from '@mui/material';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
// import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
// import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

// // 1. Import SweetAlert2
// import Swal from 'sweetalert2';

// // Sample data - can be replaced with API data
// const initialFamilyMembers = [];

// export default function FamilyDetails() {
//   const [familyMembers, setFamilyMembers] = useState(initialFamilyMembers);
//   const [name, setName] = useState('');
//   const [age, setAge] = useState('');
//   const [relation, setRelation] = useState('');
//   const [occupation, setOccupation] = useState('');
//   const [dob, setDob] = useState(null);

//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [page, setPage] = useState(0);
//   const [searchTerm, setSearchTerm] = useState('');

//   const [orderBy, setOrderBy] = useState('name');
//   const [order, setOrder] = useState('asc');

//   const handleAddMember = (event) => {
//     event.preventDefault();
    
//     // 2. Use Swal for validation
//     if (!name || !age || !relation || !occupation || !dob) {
//       Swal.fire({
//         icon: 'warning',
//         title: 'Missing Fields',
//         text: 'Please fill in all required fields to add a family member.',
//       });
//       return;
//     }
//     const newMember = {
//       id: familyMembers.length + 1,
//       name,
//       age: parseInt(age, 10),
//       relation,
//       occupation,
//       dob: dob ? dob.toISOString().split('T')[0] : '',
//     };
//     setFamilyMembers([...familyMembers, newMember]);
    
//     // 3. Use Swal for success feedback
//     Swal.fire({
//       icon: 'success',
//       title: 'Member Added!',
//       text: `${name} has been successfully added to your family details.`,
//       timer: 2000, // Auto close after 2 seconds
//       showConfirmButton: false
//     });

//     // Clear form fields
//     setName('');
//     setAge('');
//     setRelation('');
//     setOccupation('');
//     setDob(null);
//   };

//   const handleSearchChange = (event) => {
//     setSearchTerm(event.target.value.toLowerCase());
//     setPage(0);
//   };

//   const handleRowsPerPageChange = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const filteredMembers = familyMembers.filter((member) =>
//     Object.values(member).some((value) =>
//       String(value).toLowerCase().includes(searchTerm)
//     )
//   );

//   const handleRequestSort = (property) => {
//     const isAsc = orderBy === property && order === 'asc';
//     setOrder(isAsc ? 'desc' : 'asc');
//     setOrderBy(property);
//   };

//   const sortedMembers = [...filteredMembers].sort((a, b) => {
//     if (orderBy) {
//       if (orderBy === 'age') {
//         return order === 'asc' ? a.age - b.age : b.age - a.age;
//       }
//       if (a[orderBy] < b[orderBy]) {
//         return order === 'asc' ? -1 : 1;
//       }
//       if (a[orderBy] > b[orderBy]) {
//         return order === 'asc' ? 1 : -1;
//       }
//     }
//     return 0;
//   });

//   const paginatedMembers = sortedMembers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
//   const totalPages = Math.ceil(filteredMembers.length / rowsPerPage);

//   const tableHeadCells = [
//     { id: 'name', label: 'NAME', numeric: false, align: 'left' },
//     { id: 'age', label: 'AGE', numeric: true, align: 'left' },
//     { id: 'relation', label: 'RELATION', numeric: false, align: 'left' },
//     { id: 'occupation', label: 'OCCUPATION', numeric: false, align: 'left' },
//     { id: 'dob', label: 'DATE OF BIRTH', numeric: false, align: 'left' },
//   ];

//   return (
//     <LocalizationProvider dateAdapter={AdapterDateFns}>
//       <Paper sx={{ p: { xs: 2, md: 3 }, borderRadius: 2 }}>
//         <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
//           Family - Details
//         </Typography>

//         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, flexWrap: 'wrap', gap: 2 }}>
//           <Box sx={{ display: 'flex', alignItems: 'center' }}>
//             <Typography variant="body2" sx={{ mr: 1 }}>Show</Typography>
//             <Select
//               value={rowsPerPage}
//               onChange={handleRowsPerPageChange}
//               size="small"
//               sx={{ minWidth: 70 }}
//             >
//               {[10, 25, 50].map((value) => (
//                 <MenuItem key={value} value={value}>
//                   {value}
//                 </MenuItem>
//               ))}
//             </Select>
//             <Typography variant="body2" sx={{ ml: 1 }}>entries</Typography>
//           </Box>
//           <TextField
//             label="Search"
//             variant="outlined"
//             size="small"
//             value={searchTerm}
//             onChange={handleSearchChange}
//             sx={{ minWidth: { xs: '100%', sm: 250 } }}
//           />
//         </Box>

//         <TableContainer>
//           <Table stickyHeader size="small">
//             <TableHead sx={{ backgroundColor: '#eef2f6' }}>
//               <TableRow>
//                 {tableHeadCells.map((headCell) => (
//                   <TableCell
//                     key={headCell.id}
//                     align={headCell.align || 'left'}
//                     sortDirection={orderBy === headCell.id ? order : false}
//                     sx={{ fontWeight: 'bold' }}
//                   >
//                     <TableSortLabel
//                       active={orderBy === headCell.id}
//                       direction={orderBy === headCell.id ? order : 'asc'}
//                       onClick={() => handleRequestSort(headCell.id)}
//                       IconComponent={orderBy === headCell.id ? (order === 'asc' ? ArrowUpwardIcon : ArrowDownwardIcon) : undefined}
//                     >
//                       {headCell.label}
//                     </TableSortLabel>
//                   </TableCell>
//                 ))}
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {paginatedMembers.length > 0 ? (
//                 paginatedMembers.map((member) => (
//                   <TableRow hover key={member.id}>
//                     <TableCell align="left">{member.name}</TableCell>
//                     <TableCell align="left">{member.age}</TableCell>
//                     <TableCell align="left">{member.relation}</TableCell>
//                     <TableCell align="left">{member.occupation}</TableCell>
//                     <TableCell align="left">{member.dob}</TableCell>
//                   </TableRow>
//                 ))
//               ) : (
//                 <TableRow>
//                   <TableCell colSpan={tableHeadCells.length} align="center" sx={{ py: 3 }}>
//                     No records available
//                   </TableCell>
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>

//         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2, flexWrap: 'wrap', gap: 2 }}>
//           <Typography variant="body2" color="text.secondary">
//             {filteredMembers.length > 0 ?
//               `Showing ${page * rowsPerPage + 1} to ${Math.min((page + 1) * rowsPerPage, filteredMembers.length)} of ${filteredMembers.length} entries` :
//               'No records available'
//             }
//           </Typography>
//           <Stack direction="row" spacing={1} alignItems="center">
//             <Button
//               variant="outlined"
//               size="small"
//               onClick={() => setPage(page - 1)}
//               disabled={page === 0}
//             >
//               Previous
//             </Button>
//             <Typography variant="body2">
//               Page {page + 1} of {totalPages > 0 ? totalPages : 1}
//             </Typography>
//             <Button
//               variant="outlined"
//               size="small"
//               onClick={() => setPage(page + 1)}
//               disabled={page >= totalPages - 1}
//             >
//               Next
//             </Button>
//           </Stack>
//         </Box>
//       </Paper>

//       <Paper sx={{ p: { xs: 2, md: 3 }, mt: 3, borderRadius: 2 }}>
//         <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
//           Add New Family Member
//         </Typography>
//         <Box component="form" onSubmit={handleAddMember}>
//           <Grid container spacing={3}>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 label="Name"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 fullWidth
//                 size="small"
//                 required
//                 placeholder="Name"
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 label="Age"
//                 type="number"
//                 value={age}
//                 onChange={(e) => setAge(e.target.value)}
//                 fullWidth
//                 size="small"
//                 required
//                 placeholder="Age"
//                 InputProps={{ inputProps: { min: 0 } }}
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 label="Relation"
//                 value={relation}
//                 onChange={(e) => setRelation(e.target.value)}
//                 fullWidth
//                 size="small"
//                 required
//                 placeholder="Relation (e.g., Spouse, Child)"
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 label="Occupation"
//                 value={occupation}
//                 onChange={(e) => setOccupation(e.target.value)}
//                 fullWidth
//                 size="small"
//                 required
//                 placeholder="Occupation"
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <DatePicker
//                 label="Date Of Birth"
//                 value={dob}
//                 onChange={(newValue) => setDob(newValue)}
//                 slots={{
//                   textField: (params) => <TextField {...params} fullWidth size="small" required placeholder="Date Of Birth" />,
//                   openPickerIcon: CalendarTodayIcon,
//                 }}
//                 maxDate={new Date()}
//               />
//             </Grid>
//             <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
//               <Button type="submit" variant="contained" color="primary">
//                 Add Member
//               </Button>
//             </Grid>
//           </Grid>
//         </Box>
//       </Paper>
//     </LocalizationProvider>
//   );
// }





import React, { useState, useEffect } from 'react';
// Make sure your route is defined with the ':id' parameter, e.g., <Route path="/family-details/:id" ... />
import { useParams } from 'react-router-dom';
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Select,
  MenuItem,
  TableSortLabel,
  Stack,
  FormControl,
  InputLabel,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import Swal from 'sweetalert2';

export default function FamilyDetails() {
  const { id } = useParams();
  console.log('URL Params:', id);

  const [familyMembers, setFamilyMembers] = useState([]);
  // Form State
  const [name, setName] = useState('');
  const [relation, setRelation] = useState('');
  const [occupation, setOccupation] = useState('');
  const [dob, setDob] = useState(null);
  const [contactNumber, setContactNumber] = useState('');
  const [gender, setGender] = useState('');

  // Table State
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  // Sorting State
  const [orderBy, setOrderBy] = useState('name');
  const [order, setOrder] = useState('asc');

  // Fetch existing family members on component mount
  useEffect(() => {
    const fetchFamilyMembers = async () => {
      if (!id) {
        console.error("User ID is missing from the URL. Cannot fetch family members.");
        return;
      }

      // Use the dynamic 'id' from the URL in the API endpoint.
      const apiUrl = `https://tdtlworld.com/hrms-backend/api/family-members-user/${id}/`;
      try {
        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            // Add Authorization header if needed, e.g.,
            // 'Authorization': `Bearer ${your_auth_token}`
          },
        });

        if (!response.ok) {
          // Handle cases where the user might not exist or other server errors
          if (response.status === 404) {
             console.log("No family members found for this user or user does not exist.");
             setFamilyMembers([]); // Set to empty array if no data
          } else {
             throw new Error('Failed to fetch family members.');
          }
          return;
        }

        const result = await response.json(); // result is the direct array: [{...}, {...}]
        
        // *** INTEGRATION CHANGE ***
        // Mapped API data to the format used by the table state.
        // Changed from result.data.map to result.map to match the API response structure which is a direct array.
        const formattedMembers = result.map(member => ({
          id: member.family_member_id,
          name: member.name,
          age: member.age,
          relation: member.relation,
          occupation: member.occupation,
          dob: member.date_of_birth,
        }));
        setFamilyMembers(formattedMembers);

      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error Fetching Data',
          text: error.message,
        });
      }
    };

    fetchFamilyMembers();
  }, [id]); // Re-run effect if the id from the URL changes

  // Helper: calculate age from DOB
  const calculateAge = (dob) => {
    if (!dob) return null;
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const handleAddMember = async (event) => {
    event.preventDefault();

    if (!name || !relation || !occupation || !dob || !contactNumber || !gender) {
      Swal.fire({
        icon: 'warning',
        title: 'Missing Fields',
        text: 'Please fill in all required fields to add a family member.',
      });
      return;
    }

    if (!/^\d{10}$/.test(contactNumber)) {
        Swal.fire({
            icon: 'warning',
            title: 'Invalid Contact Number',
            text: 'Please enter a valid 10-digit contact number.',
        });
        return;
    }
    
    if (!id) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'User ID is missing from the URL.',
        });
        return;
    }
    
    const apiUrl = `https://tdtlworld.com/hrms-backend/api/family-members-user/${id}/`;

    const payload = {
      name,
      age: calculateAge(dob),
      relation,
      occupation,
      date_of_birth: dob.toISOString().split('T')[0], // Format as YYYY-MM-DD
      contact_number: contactNumber,
      gender,
    };

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${your_auth_token}`
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Something went wrong while adding the member.');
      }

      // Create a new member object for the local state from the API response
      // Assuming the POST response might be wrapped in a 'data' object as per original code
      const responseData = result.data || result; 
      const newMemberFromApi = {
        id: responseData.family_member_id,
        name: responseData.name,
        age: responseData.age,
        relation: responseData.relation,
        occupation: responseData.occupation,
        dob: responseData.date_of_birth,
      };

      setFamilyMembers([...familyMembers, newMemberFromApi]);

      Swal.fire({
        icon: 'success',
        title: 'Member Added!',
        text: `${name} has been successfully added to your family details.`,
        timer: 2000,
        showConfirmButton: false,
      });

      // Reset all form fields
      setName('');
      setRelation('');
      setOccupation('');
      setDob(null);
      setContactNumber('');
      setGender('');

    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Failed to Add Member',
        text: error.message,
      });
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
    setPage(0);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredMembers = familyMembers.filter((member) =>
    Object.values(member).some((value) =>
      String(value).toLowerCase().includes(searchTerm)
    )
  );

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortedMembers = [...filteredMembers].sort((a, b) => {
    if (orderBy) {
      if (orderBy === 'age') {
        return order === 'asc' ? a.age - b.age : b.age - a.age;
      }
      if (a[orderBy] < b[orderBy]) {
        return order === 'asc' ? -1 : 1;
      }
      if (a[orderBy] > b[orderBy]) {
        return order === 'asc' ? 1 : -1;
      }
    }
    return 0;
  });

  const paginatedMembers = sortedMembers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  const totalPages = Math.ceil(filteredMembers.length / rowsPerPage);

  const tableHeadCells = [
    { id: 'name', label: 'NAME', numeric: false, align: 'left' },
    { id: 'age', label: 'AGE', numeric: true, align: 'left' },
    { id: 'relation', label: 'RELATION', numeric: false, align: 'left' },
    { id: 'occupation', label: 'OCCUPATION', numeric: false, align: 'left' },
    { id: 'dob', label: 'DATE OF BIRTH', numeric: false, align: 'left' },
  ];

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Paper sx={{ p: { xs: 2, md: 3 }, borderRadius: 2 }}>
        <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
          Family Details
        </Typography>



        {/* Search + RowsPerPage */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, flexWrap: 'wrap', gap: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="body2" sx={{ mr: 1 }}>Show</Typography>
            <Select
              value={rowsPerPage}
              onChange={handleRowsPerPageChange}
              size="small"
              sx={{ minWidth: 70 }}
            >
              {[10, 25, 50].map((value) => (
                <MenuItem key={value} value={value}>
                  {value}
                </MenuItem>
              ))}
            </Select>
            <Typography variant="body2" sx={{ ml: 1 }}>entries</Typography>
          </Box>
          <TextField
            label="Search"
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={handleSearchChange}
            sx={{ minWidth: { xs: '100%', sm: 250 } }}
          />
        </Box>

        {/* Table */}
        <TableContainer>
          <Table stickyHeader size="small">
            <TableHead sx={{ backgroundColor: '#eef2f6' }}>
              <TableRow>
                {tableHeadCells.map((headCell) => (
                  <TableCell
                    key={headCell.id}
                    align={headCell.align || 'left'}
                    sortDirection={orderBy === headCell.id ? order : false}
                    sx={{ fontWeight: 'bold' }}
                  >
                    <TableSortLabel
                      active={orderBy === headCell.id}
                      direction={orderBy === headCell.id ? order : 'asc'}
                      onClick={() => handleRequestSort(headCell.id)}
                      IconComponent={orderBy === headCell.id ? (order === 'asc' ? ArrowUpwardIcon : ArrowDownwardIcon) : undefined}
                    >
                      {headCell.label}
                    </TableSortLabel>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedMembers.length > 0 ? (
                paginatedMembers.map((member) => (
                  <TableRow hover key={member.id}>
                    <TableCell align="left">{member.name}</TableCell>
                    <TableCell align="left">{member.age}</TableCell>
                    <TableCell align="left">{member.relation}</TableCell>
                    <TableCell align="left">{member.occupation}</TableCell>
                    <TableCell align="left">{member.dob}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={tableHeadCells.length} align="center" sx={{ py: 3 }}>
                    No records available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2, flexWrap: 'wrap', gap: 2 }}>
          <Typography variant="body2" color="text.secondary">
            {filteredMembers.length > 0 ?
              `Showing ${page * rowsPerPage + 1} to ${Math.min((page + 1) * rowsPerPage, filteredMembers.length)} of ${filteredMembers.length} entries` :
              'No records available'
            }
          </Typography>
          <Stack direction="row" spacing={1} alignItems="center">
            <Button
              variant="outlined"
              size="small"
              onClick={() => setPage(page - 1)}
              disabled={page === 0}
            >
              Previous
            </Button>
            <Typography variant="body2">
              Page {page + 1} of {totalPages > 0 ? totalPages : 1}
            </Typography>
            <Button
              variant="outlined"
              size="small"
              onClick={() => setPage(page + 1)}
              disabled={page >= totalPages - 1}
            >
              Next
            </Button>
          </Stack>
        </Box>
      </Paper>

      {/* Add Member Form */}
      <Paper sx={{ p: { xs: 2, md: 3 }, mt: 3, borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
          Add New Family Member
        </Typography>
        <Box component="form" onSubmit={handleAddMember} noValidate>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
                size="small"
                required
                placeholder="Name"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Relation"
                value={relation}
                onChange={(e) => setRelation(e.target.value)}
                fullWidth
                size="small"
                required
                placeholder="Relation (e.g., Spouse, Child)"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Occupation"
                value={occupation}
                onChange={(e) => setOccupation(e.target.value)}
                fullWidth
                size="small"
                required
                placeholder="Occupation"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <DatePicker
                label="Date Of Birth"
                value={dob}
                onChange={(newValue) => setDob(newValue)}
                maxDate={new Date()}
                slots={{
                  openPickerIcon: CalendarTodayIcon,
                }}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    size: 'small',
                    required: true,
                    placeholder: 'Date Of Birth',
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Contact Number"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
                fullWidth
                size="small"
                required
                placeholder="10-digit mobile number"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth size="small" required>
                <InputLabel>Gender</InputLabel>
                <Select
                  value={gender}
                  label="Gender"
                  onChange={(e) => setGender(e.target.value)}
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
              <Button type="submit" variant="contained" color="primary">
                Add Member
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </LocalizationProvider>
  );
}