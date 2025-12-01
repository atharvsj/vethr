// import React, { useState ,useEffect,useContext} from 'react';
// import {
//   Box, Typography, TextField, MenuItem, Select, FormControl, InputLabel,
//   Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
//   Paper, Button, Grid
// } from '@mui/material';
// import { EmployeeContext } from './EmployeeContext';
// import  axiosInstance from  "../../utils/axiosInstance"; 

// const Allowances = () => {
//   const [formData, setFormData] = useState({
//     title: '',
//     amount: '',
//     allowance_option: '',
//     amount_option: '',
//   });

//   const [allowances, setAllowances] = useState([]);
//  const { employeeId } = useContext(EmployeeContext);
//    useEffect(() => {
//       console.log("employee id from context in basicinfo:", employeeId);
//      }, [employeeId]);
  

//   const fetchAllowanceDetails = async () => {
//   try {
//     const response = await axiosInstance.post('/api/contract_details/', {
//       user_id: employeeId,
//       type: 2,
//     });

//     const { contract_details } = response.data;

//     const formattedAllowance = {
//       title: contract_details.title || '',
//       amount: contract_details.amount || '',
//       allowance_option: contract_details.allowance_option || 'Non Taxable',
//       amount_option: contract_details.amount_option?.toString() || '0',
//     };

//     setFormData(formattedAllowance);
//     setAllowances([formattedAllowance]);
//   } catch (error) {
//     console.error('Error fetching allowance details:', error);
//   }
// };

// useEffect(() => {
//   if ( employeeId) {
//     fetchAllowanceDetails();
//   }
// }, [ employeeId]);

// const updateAllowanceDetails = async () => {
//   try {
//     await axiosInstance.patch('/api/contract_details/', {
//       user_id: employeeId,
//       type: 2,
//       title: formData.title,
//       amount: parseFloat(formData.amount),
//       is_taxable: formData.allowance_option,
//       amount_option: parseInt(formData.amount_option, 10),
//     });
//     alert('Updated successfully!');
//   } catch (error) {
//     console.error('Error updating allowance details:', error);
//   }
// };

// const handleSave = () => {
//   if (formData.title && formData.amount && employeeId) {
//     updateAllowanceDetails();
//     // Replace the existing record instead of appending a new one
//     setAllowances([formData]);
//     setFormData({
//       title: '',
//       amount: '',
//       allowance_option: '',
//       amount_option: '',
//     });
//   } else {
//     alert("Please fill in all fields and user ID.");
//   }
// };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

 

//   return (
//     <Box sx={{ p: 3 }}>
//       <Typography variant="h6" gutterBottom>List All Allowances</Typography>

//       <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
//         <FormControl size="small">
//           <Select defaultValue="10">
//             <MenuItem value="10">10</MenuItem>
//             <MenuItem value="100">100</MenuItem>
//           </Select>
//         </FormControl>
//         <TextField size="small" placeholder="Search" />
//       </Box>
// {employeeId && (
//       <TableContainer component={Paper} sx={{ mb: 3 }}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell><strong>TITLE</strong></TableCell>
//               <TableCell><strong>AMOUNT</strong></TableCell>
//               <TableCell><strong>ALLOWANCE OPTION</strong></TableCell>
//               <TableCell><strong>AMOUNT OPTION</strong></TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {allowances.length === 0 ? (
//               <TableRow>
//                 <TableCell colSpan={4} align="center">No records available</TableCell>
//               </TableRow>
//             ) : (
//               allowances.map((row, index) => (
//                 <TableRow key={index}>
//                   <TableCell>{row.title}</TableCell>
//                   <TableCell>{row.amount}</TableCell>
//                  <TableCell>{row.allowance_option}</TableCell> 
//       <TableCell>{row.amount_option === 0 ? 'Fixed' : 'Percentage'}</TableCell>
//                 </TableRow>
//               ))
//             )}
//           </TableBody>
//         </Table>
//       </TableContainer>
// )}
//       <Box display="flex" justifyContent="space-between" mb={3}>
//         <Typography variant="body2">No records available</Typography>
//         <Box>
//           <Button variant="outlined" size="small" sx={{ mr: 1 }}>Previous</Button>
//           <Button variant="outlined" size="small">Next</Button>
//         </Box>
//       </Box>

//       <Grid container spacing={2}>
//   {/* Row 1: Allowance Option + Amount Option */}
//  <Grid item xs={12} sm={6}>
//   <FormControl fullWidth size="small" required>
//     <InputLabel>Allowance Option</InputLabel>
//     <Select
//       name="allowance_option"
//      value={formData.allowance_option ?? ''}
//       label="Allowance Option"
//       onChange={handleChange}
//     >
//       <MenuItem value="Non Taxable">Non Taxable</MenuItem>
//       <MenuItem value="Fully Taxable">Fully Taxable</MenuItem>
//       <MenuItem value="Partially Taxable">Partially Taxable</MenuItem>
//     </Select>
//   </FormControl>
// </Grid>

// <Grid item xs={12} sm={6}>
//   <FormControl fullWidth size="small" required>
//     <InputLabel>Amount Option</InputLabel>
//     <Select
//       name="amount_option"
//        value={formData.amount_option ?? ''}
//       label="Amount Option"
//       onChange={handleChange}
//     >
//       <MenuItem value={0}>Fixed</MenuItem>
//       <MenuItem value={1}>Percentage</MenuItem>
//     </Select>
//   </FormControl>
// </Grid>


//   {/* Row 2: Title + Amount */}
//   <Grid item xs={12} sm={6}>
//     <TextField
//       fullWidth
//       size="small"
//       label="Title"
//       name="title"
//       value={formData.title}
//       onChange={handleChange}
//       required
//     />
//   </Grid>

//   <Grid item xs={12} sm={6}>
//     <Box display="flex" alignItems="center">
//       <Typography sx={{ mr: 1 }}>INR</Typography>
//       <TextField
//         fullWidth
//         size="small"
//         label="Amount"
//         name="amount"
//         value={formData.amount}
//         onChange={handleChange}
//         required
//       />
//     </Box>
//   </Grid>

//   {/* Save Button */}
//   <Grid item xs={12}>
//     <Box display="flex" justifyContent="flex-end">
//       <Button
//         variant="contained"
//         color="primary"
//         sx={{ textTransform: 'none', px: 4 }}
//         onClick={handleSave}
//       >
//         Save
//       </Button>
//     </Box>
//   </Grid>
// </Grid>

//     </Box>
//   );
// };

// export default Allowances;


// import React, { useState, useContext, useEffect } from 'react';
// import {
//   Box, Typography, TextField, MenuItem, Select, FormControl, InputLabel,
//   Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
//   Paper, Button, Grid, IconButton
// } from '@mui/material';
// import { Edit, Delete } from '@mui/icons-material';
// import { EmployeeContext } from './EmployeeContext';
// import axiosInstance from '../../utils/axiosInstance';
// import { useCallback } from 'react';

// const Allowances = () => {
//   const { employeeId } = useContext(EmployeeContext);

//   const [formData, setFormData] = useState({
//     title: '',
//     amount: '',
//     allowance_option: '',
//     amount_option: '',
//   });

//   const [allowances, setAllowances] = useState([]);
//   const [hoveredRow, setHoveredRow] = useState(null);
//   const [editingId, setEditingId] = useState(null);
//   const [rowsPerPage, setRowsPerPage] = useState(5);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [searchTerm, setSearchTerm] = useState('');



// // Inside your component:
// const fetchAllowances = useCallback(async () => {
//   try {
//     const res = await axiosInstance.post('/api/contract_details/', {
//       user_id: employeeId,
//       type: 2,
//     });

//     const details = res.data.contract_details;
//     setAllowances(Array.isArray(details) ? details : []);
//   } catch (error) {
//     console.error('Error fetching allowances:', error);
//     setAllowances([]);
//   }
// }, [employeeId]); // ✅ include dependency

// useEffect(() => {
//   if (employeeId) fetchAllowances();
// }, [employeeId, fetchAllowances]); // ✅ include both


//   const handleSave = async () => {
//     if (!formData.title || !formData.amount) {
//       alert('Please fill all fields');
//       return;
//     }

//     const payload = {
//       user_id: employeeId,
//       type: 2,
//       pay_title: formData.title,
//       pay_amount: formData.amount,
//       is_taxable: formData.allowance_option,
//       is_fixed: formData.amount_option,
//       salary_month: '01'
//     };

//     if (editingId !== null) {
//       payload.pay_id = editingId;
//     }

//     try {
//       await axiosInstance.patch('/api/contract_details/', payload);
//       fetchAllowances();
//       setFormData({ title: '', amount: '', allowance_option: '', amount_option: '' });
//       setEditingId(null);
//     } catch (error) {
//       console.error('Error saving record:', error);
//     }
//   };

//   const handleEdit = (row) => {
//     setFormData({
//       title: row.title,
//       amount: row.amount,
//       allowance_option: row.allowance_option,
//       amount_option: row.amount_option.toString(),
//     });
//     setEditingId(row.id);
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axiosInstance.delete('/api/contract_details/', {
//         data: { pay_id: id, type: 2 },
//       });
//       fetchAllowances();
//     } catch (error) {
//       console.error('Error deleting record:', error);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleRowsPerPageChange = (e) => {
//     setRowsPerPage(parseInt(e.target.value));
//     setCurrentPage(1);
//   };

//   const handlePageChange = (newPage) => {
//     if (newPage > 0 && newPage <= Math.ceil(filteredAllowances.length / rowsPerPage)) {
//       setCurrentPage(newPage);
//     }
//   };

//   const filteredAllowances = allowances.filter(row =>
//     row.title.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const pageCount = Math.ceil(filteredAllowances.length / rowsPerPage);
//   const currentRows = filteredAllowances.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

//   return (
//     <Box sx={{ p: 3 }}>
//       <Typography variant="h6" gutterBottom>List All Allowances</Typography>

//       <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
//         <FormControl size="small" sx={{ minWidth: 80 }}>
//           <InputLabel sx={{ fontSize: '0.75rem' }}>Rows</InputLabel>
//           <Select
//             value={rowsPerPage}
//             label="Rows"
//             onChange={handleRowsPerPageChange}
//             sx={{ fontSize: '0.75rem', height: '32px' }}
//           >
//             {[5, 10, 25, 50].map(num => (
//               <MenuItem key={num} value={num} sx={{ fontSize: '0.75rem' }}>{num}</MenuItem>
//             ))}
//           </Select>
//         </FormControl>

//         <TextField
//           size="small"
//           placeholder="Search Title"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           sx={{ width: 150, '& .MuiInputBase-input': { fontSize: '0.75rem', height: '0.9em' } }}
//         />
//       </Box>

//       {employeeId && (
//         <TableContainer component={Paper} sx={{ mb: 1 }}>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell><strong>TITLE</strong></TableCell>
//                 <TableCell><strong>AMOUNT</strong></TableCell>
//                 <TableCell><strong>ALLOWANCE OPTION</strong></TableCell>
//                 <TableCell><strong>AMOUNT OPTION</strong></TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {currentRows.length === 0 ? (
//                 <TableRow><TableCell colSpan={4} align="center">No records found</TableCell></TableRow>
//               ) : (
//                 currentRows.map((row, index) => {
//                   const actualIndex = (currentPage - 1) * rowsPerPage + index;
//                   return (
//                     <TableRow
//                       key={row.id || actualIndex}
//                       onMouseEnter={() => setHoveredRow(actualIndex)}
//                       onMouseLeave={() => setHoveredRow(null)}
//                     >
//                       <TableCell>
//                         {hoveredRow === actualIndex ? (
//                           <>
//                             <IconButton size="small" color="primary" onClick={() => handleEdit(row)}>
//                               <Edit fontSize="small" />
//                             </IconButton>
//                             <IconButton size="small" color="error" onClick={() => handleDelete(row.id)}>
//                               <Delete fontSize="small" />
//                             </IconButton>
//                           </>
//                         ) : row.title}
//                       </TableCell>
//                       <TableCell>{row.amount}</TableCell>
//                       <TableCell>{row.allowance_option}</TableCell>
//                       <TableCell>{row.amount_option === 0 ? 'Fixed' : 'Percentage'}</TableCell>
//                     </TableRow>
//                   );
//                 })
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       )}

//       {/* Right-Aligned Pagination */}
//       <Box display="flex" justifyContent="flex-end" alignItems="center" mt={1} gap={1}>
//         <Button
//           variant="outlined"
//           size="small"
//           sx={{ fontSize: '0.7rem', minWidth: '70px', py: 0.5 }}
//           onClick={() => handlePageChange(currentPage - 1)}
//           disabled={currentPage === 1}
//         >
//           Previous
//         </Button>

//         <Typography sx={{ fontSize: '0.75rem', minWidth: '100px', textAlign: 'center' }}>
//           Page {currentPage} of {pageCount || 1}
//         </Typography>

//         <Button
//           variant="outlined"
//           size="small"
//           sx={{ fontSize: '0.7rem', minWidth: '70px', py: 0.5 }}
//           onClick={() => handlePageChange(currentPage + 1)}
//           disabled={currentPage === pageCount || pageCount === 0}
//         >
//           Next
//         </Button>
//       </Box>

//       {/* Form */}
//       <Grid container spacing={2} mt={3}>
//         <Grid item xs={12} sm={6}>
//           <FormControl fullWidth size="small" required>
//             <InputLabel>Allowance Option</InputLabel>
//             <Select
//               name="allowance_option"
//               value={formData.allowance_option ?? ''}
//               label="Allowance Option"
//               onChange={handleChange}
//             >
//               <MenuItem value="Non Taxable">Non Taxable</MenuItem>
//               <MenuItem value="Fully">Fully Taxable</MenuItem>
//               <MenuItem value="Partial">Partially Taxable</MenuItem>
//             </Select>
//           </FormControl>
//         </Grid>

//         <Grid item xs={12} sm={6}>
//           <FormControl fullWidth size="small" required>
//             <InputLabel>Amount Option</InputLabel>
//             <Select
//               name="amount_option"
//               value={formData.amount_option ?? ''}
//               label="Amount Option"
//               onChange={handleChange}
//             >
//               <MenuItem value="0">Fixed</MenuItem>
//               <MenuItem value="1">Percentage</MenuItem>
//             </Select>
//           </FormControl>
//         </Grid>

//         <Grid item xs={12} sm={6}>
//           <TextField
//             fullWidth
//             size="small"
//             label="Title"
//             name="title"
//             value={formData.title}
//             onChange={handleChange}
//             required
//           />
//         </Grid>

//         <Grid item xs={12} sm={6}>
//           <Box display="flex" alignItems="center">
//             <Typography sx={{ mr: 1 }}>INR</Typography>
//             <TextField
//               fullWidth
//               size="small"
//               label="Amount"
//               name="amount"
//               value={formData.amount}
//               onChange={handleChange}
//               required
//             />
//           </Box>
//         </Grid>

//         <Grid item xs={12}>
//           <Box display="flex" justifyContent="flex-end">
//             <Button
//               variant="contained"
//               color="primary"
//               sx={{ textTransform: 'none', px: 4 }}
//               onClick={handleSave}
//             >
//               {editingId !== null ? 'Update' : 'Save'}
//             </Button>
//           </Box>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// export default Allowances;
import React, { useState, useContext, useEffect, useCallback } from 'react';
import {
  Box, Typography, TextField, MenuItem, Select, FormControl, InputLabel,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Button, Grid, IconButton
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { EmployeeContext } from '../../SuperAdmin/Employee/EmployeeContext';
import axiosInstance from '../../utils/axiosInstance';
// 1. Import SweetAlert2
import Swal from 'sweetalert2';

const Allowances = () => {
  const { employeeId } = useContext(EmployeeContext);

  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    allowance_option: '',
    amount_option: '',
  });

  const [allowances, setAllowances] = useState([]);
  const [hoveredRow, setHoveredRow] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchAllowances = useCallback(async () => {
    try {
      const res = await axiosInstance.post('/api/contract_details/', {
        user_id: employeeId,
        type: 2,
      });

      const details = res.data.contract_details;
      setAllowances(Array.isArray(details) ? details : []);
    } catch (error) {
      console.error('Error fetching allowances:', error);
      Swal.fire({
        icon: 'error',
        title: 'Fetch Error',
        text: 'Could not load allowances. Please try refreshing the page.'
      });
      setAllowances([]);
    }
  }, [employeeId]);

  useEffect(() => {
    if (employeeId) fetchAllowances();
  }, [employeeId, fetchAllowances]);


  const handleSave = async () => {
    // 2. Use Swal for validation
    if (!formData.title || !formData.amount || !formData.allowance_option || !formData.amount_option) {
      Swal.fire({
        icon: 'warning',
        title: 'Missing Fields',
        text: 'Please fill out all the required fields before saving.',
      });
      return;
    }

    const payload = {
      user_id: employeeId,
      type: 2,
      pay_title: formData.title,
      pay_amount: formData.amount,
      is_taxable: formData.allowance_option,
      is_fixed: formData.amount_option,
      salary_month: '01' // Assuming this is static as in original code
    };

    const action = editingId !== null ? 'Updating' : 'Saving';

    // 3. Add loading state with Swal
    Swal.fire({
      title: `${action} Allowance...`,
      text: 'Please wait.',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    if (editingId !== null) {
      payload.pay_id = editingId;
    }

    try {
      await axiosInstance.patch('/api/contract_details/', payload);
      await fetchAllowances(); // Refetch data to show the new record

      // 4. Show success message with Swal
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: `Allowance has been ${editingId !== null ? 'updated' : 'saved'} successfully.`,
      });

      setFormData({ title: '', amount: '', allowance_option: '', amount_option: '' });
      setEditingId(null);
    } catch (error) {
      console.error('Error saving record:', error);
      const errorMessage = error.response?.data?.message || 'An unexpected error occurred.';
      // 5. Show error message with Swal
      Swal.fire({
        icon: 'error',
        title: 'Operation Failed',
        text: errorMessage,
      });
    }
  };

  const handleEdit = (row) => {
    setFormData({
      title: row.title,
      amount: row.amount,
      allowance_option: row.allowance_option,
      // Ensure amount_option is a string for the Select component
      amount_option: row.amount_option !== null ? row.amount_option.toString() : '',
    });
    setEditingId(row.id);
  };

  const handleDelete = async (id) => {
    // 6. Add confirmation dialog before deleting
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosInstance.delete('/api/contract_details/', {
            data: { pay_id: id, type: 2 },
          });
          await fetchAllowances(); // Refetch data
          Swal.fire(
            'Deleted!',
            'The allowance has been deleted.',
            'success'
          );
        } catch (error) {
          console.error('Error deleting record:', error);
          const errorMessage = error.response?.data?.message || 'Failed to delete the record.';
          Swal.fire(
            'Error!',
            errorMessage,
            'error'
          );
        }
      }
    });
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(parseInt(e.target.value));
    setCurrentPage(1);
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= Math.ceil(filteredAllowances.length / rowsPerPage)) {
      setCurrentPage(newPage);
    }
  };

  const filteredAllowances = allowances.filter(row =>
    row.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pageCount = Math.ceil(filteredAllowances.length / rowsPerPage);
  const currentRows = filteredAllowances.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>List All Allowances</Typography>

      <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
        <FormControl size="small" sx={{ minWidth: 80 }}>
          <InputLabel sx={{ fontSize: '0.75rem' }}>Rows</InputLabel>
          <Select
            value={rowsPerPage}
            label="Rows"
            onChange={handleRowsPerPageChange}
            sx={{ fontSize: '0.75rem', height: '32px' }}
          >
            {[5, 10, 25, 50].map(num => (
              <MenuItem key={num} value={num} sx={{ fontSize: '0.75rem' }}>{num}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          size="small"
          placeholder="Search Title"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ width: 150, '& .MuiInputBase-input': { fontSize: '0.75rem', height: '0.9em' } }}
        />
      </Box>

      {employeeId && (
        <TableContainer component={Paper} sx={{ mb: 1 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>TITLE</strong></TableCell>
                <TableCell><strong>AMOUNT</strong></TableCell>
                <TableCell><strong>ALLOWANCE OPTION</strong></TableCell>
                <TableCell><strong>AMOUNT OPTION</strong></TableCell>
                <TableCell align="right"><strong>ACTIONS</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentRows.length === 0 ? (
                <TableRow><TableCell colSpan={5} align="center">No records found</TableCell></TableRow>
              ) : (
                currentRows.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell>{row.title}</TableCell>
                      <TableCell>{row.amount}</TableCell>
                      <TableCell>{row.allowance_option}</TableCell>
                      <TableCell>{row.amount_option === 0 ? 'Fixed' : 'Percentage'}</TableCell>
                      <TableCell align="right">
                          <IconButton size="small" color="primary" onClick={() => handleEdit(row)}>
                            <Edit fontSize="small" />
                          </IconButton>
                          <IconButton size="small" color="error" onClick={() => handleDelete(row.id)}>
                            <Delete fontSize="small" />
                          </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Right-Aligned Pagination */}
      <Box display="flex" justifyContent="flex-end" alignItems="center" mt={1} gap={1}>
        <Button
          variant="outlined"
          size="small"
          sx={{ fontSize: '0.7rem', minWidth: '70px', py: 0.5 }}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </Button>

        <Typography sx={{ fontSize: '0.75rem', minWidth: '100px', textAlign: 'center' }}>
          Page {currentPage} of {pageCount || 1}
        </Typography>

        <Button
          variant="outlined"
          size="small"
          sx={{ fontSize: '0.7rem', minWidth: '70px', py: 0.5 }}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === pageCount || pageCount === 0}
        >
          Next
        </Button>
      </Box>

      {/* Form */}
      <Grid container spacing={2} mt={3}>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth size="small" required>
            <InputLabel>Allowance Option</InputLabel>
            <Select
              name="allowance_option"
              value={formData.allowance_option ?? ''}
              label="Allowance Option"
              onChange={handleChange}
            >
              <MenuItem value="Non Taxable">Non Taxable</MenuItem>
              <MenuItem value="Fully">Fully Taxable</MenuItem>
              <MenuItem value="Partial">Partially Taxable</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth size="small" required>
            <InputLabel>Amount Option</InputLabel>
            <Select
              name="amount_option"
              value={formData.amount_option ?? ''}
              label="Amount Option"
              onChange={handleChange}
            >
              <MenuItem value="0">Fixed</MenuItem>
              <MenuItem value="1">Percentage</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            size="small"
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Box display="flex" alignItems="center">
            <Typography sx={{ mr: 1 }}>INR</Typography>
            <TextField
              fullWidth
              size="small"
              label="Amount"
              name="amount"
              type="number"
              value={formData.amount}
              onChange={handleChange}
              required
            />
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Box display="flex" justifyContent="flex-end">
            <Button
              variant="contained"
              color="primary"
              sx={{ textTransform: 'none', px: 4 }}
              onClick={handleSave}
            >
              {editingId !== null ? 'Update' : 'Save'}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Allowances;