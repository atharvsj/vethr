// import React, { useState } from 'react';
// import {
//   Box,
//   Typography,
//   TextField,
//   Select,
//   MenuItem,
//   FormControl,
//   InputLabel,
//   Button,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   IconButton,
// } from '@mui/material';
// import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';

// const categories = ['Hardware', 'Software', 'Network Equipment', 'Furniture'];
// const brands = ['Dell', 'HP', 'Lenovo', 'Apple', 'Microsoft'];

// export default function AssetManagement() {
//   const [assets, setAssets] = useState([]);
//   const [formData, setFormData] = useState({
//     assetName: '',
//     category: '',
//     brand: '',
//     manufacturer: '',
//     serialNumber: '',
//     assetCode: '',
//     isWorking: 'Yes',
//     purchaseDate: null,
//     invoiceNumber: '',
//     warrantyEndDate: null,
//     assetNote: '',
//     assetImage: null
//   });

//   const handleInputChange = (field, value) => {
//     setFormData(prev => ({ ...prev, [field]: value }));
//   };

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       setFormData(prev => ({ ...prev, assetImage: file }));
//     }
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     setAssets(prev => [...prev, { ...formData, id: Date.now() }]);
//     // Reset form after submission
//     setFormData({
//       assetName: '',
//       category: '',
//       brand: '',
//       manufacturer: '',
//       serialNumber: '',
//       assetCode: '',
//       isWorking: 'Yes',
//       purchaseDate: null,
//       invoiceNumber: '',
//       warrantyEndDate: null,
//       assetNote: '',
//       assetImage: null
//     });
//   };

//   return (
//     <LocalizationProvider dateAdapter={AdapterDateFns}>
//       <Box sx={{ p: 3 }}>
//         <Typography variant="h4" gutterBottom>
//           Asset Management
//         </Typography>
//         <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
//           <Typography variant="h6" gutterBottom>
//             Add New Asset
//           </Typography>
//           <form onSubmit={handleSubmit}>
//             <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2 }}>
//               <TextField
//                 label="Asset Name"
//                 value={formData.assetName}
//                 onChange={(e) => handleInputChange('assetName', e.target.value)}
//                 required
//                 fullWidth
//               />
//               <FormControl fullWidth required>
//                 <InputLabel>Category</InputLabel>
//                 <Select
//                   value={formData.category}
//                   onChange={(e) => handleInputChange('category', e.target.value)}
//                   label="Category"
//                 >
//                   {categories.map((category) => (
//                     <MenuItem key={category} value={category}>{category}</MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>
//               <FormControl fullWidth required>
//                 <InputLabel>Brand</InputLabel>
//                 <Select
//                   value={formData.brand}
//                   onChange={(e) => handleInputChange('brand', e.target.value)}
//                   label="Brand"
//                 >
//                   {brands.map((brand) => (
//                     <MenuItem key={brand} value={brand}>{brand}</MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>
//               <TextField
//                 label="Manufacturer"
//                 value={formData.manufacturer}
//                 onChange={(e) => handleInputChange('manufacturer', e.target.value)}
//                 fullWidth
//               />
//               <TextField
//                 label="Serial Number"
//                 value={formData.serialNumber}
//                 onChange={(e) => handleInputChange('serialNumber', e.target.value)}
//                 fullWidth
//               />
//               <TextField
//                 label="Asset Code"
//                 value={formData.assetCode}
//                 onChange={(e) => handleInputChange('assetCode', e.target.value)}
//                 required
//                 fullWidth
//               />
//               <FormControl fullWidth required>
//                 <InputLabel>Is Working?</InputLabel>
//                 <Select
//                   value={formData.isWorking}
//                   onChange={(e) => handleInputChange('isWorking', e.target.value)}
//                   label="Is Working?"
//                 >
//                   <MenuItem value="Yes">Yes</MenuItem>
//                   <MenuItem value="No">No</MenuItem>
//                 </Select>
//               </FormControl>
//               <DatePicker
//                 label="Purchase Date"
//                 value={formData.purchaseDate}
//                 onChange={(date) => handleInputChange('purchaseDate', date)}
//                 renderInput={(params) => <TextField {...params} fullWidth />}
//               />
//               <TextField
//                 label="Invoice Number"
//                 value={formData.invoiceNumber}
//                 onChange={(e) => handleInputChange('invoiceNumber', e.target.value)}
//                 fullWidth
//               />
//               <DatePicker
//                 label="Warranty End Date"
//                 value={formData.warrantyEndDate}
//                 onChange={(date) => handleInputChange('warrantyEndDate', date)}
//                 renderInput={(params) => <TextField {...params} fullWidth />}
//               />
//               <TextField
//                 label="Asset Note"
//                 value={formData.assetNote}
//                 onChange={(e) => handleInputChange('assetNote', e.target.value)}
//                 multiline
//                 rows={4}
//                 fullWidth
//               />
//               <Box>
//                 <input
//                   accept="image/*"
//                   style={{ display: 'none' }}
//                   id="asset-image-upload"
//                   type="file"
//                   onChange={handleFileChange}
//                 />
//                 <label htmlFor="asset-image-upload">
//                   <Button variant="contained" component="span">
//                     Upload Asset Image
//                   </Button>
//                 </label>
//                 {formData.assetImage && (
//                   <Typography variant="body2" sx={{ mt: 1 }}>
//                     File selected: {formData.assetImage.name}
//                   </Typography>
//                 )}
//               </Box>
//             </Box>
//             <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
//               <Button type="submit" variant="contained" color="primary">
//                 Save
//               </Button>
//             </Box>
//           </form>
//         </Paper>

//         <Typography variant="h6" gutterBottom>
//           List All Assets
//         </Typography>
//         <TableContainer component={Paper}>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell>ASSET NAME</TableCell>
//                 <TableCell>CATEGORY</TableCell>
//                 <TableCell>BRAND</TableCell>
//                 <TableCell>ASSET CODE</TableCell>
//                 <TableCell>IS WORKING?</TableCell>
//                 <TableCell>EMPLOYEE</TableCell>
//                 <TableCell>CREATED AT</TableCell>
//                 <TableCell>ACTIONS</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {assets.length === 0 ? (
//                 <TableRow>
//                   <TableCell colSpan={8} align="center">No records available</TableCell>
//                 </TableRow>
//               ) : (
//                 assets.map((asset) => (
//                   <TableRow key={asset.id}>
//                     <TableCell>{asset.assetName}</TableCell>
//                     <TableCell>{asset.category}</TableCell>
//                     <TableCell>{asset.brand}</TableCell>
//                     <TableCell>{asset.assetCode}</TableCell>
//                     <TableCell>{asset.isWorking}</TableCell>
//                     <TableCell>Unassigned</TableCell>
//                     <TableCell>{new Date(asset.id).toLocaleString()}</TableCell>
//                     <TableCell>
//                       <IconButton size="small">
//                         <EditIcon />
//                       </IconButton>
//                       <IconButton size="small">
//                         <DeleteIcon />
//                       </IconButton>
//                     </TableCell>
//                   </TableRow>
//                 ))
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </Box>
//     </LocalizationProvider>
//   );
// }










import React, { useState, useMemo } from 'react';
import {
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  createTheme,
  ThemeProvider,
  useTheme,
  useMediaQuery,
  InputAdornment,
  TablePagination,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  CircularProgress,
  Skeleton,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
} from '@mui/icons-material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import Swal from 'sweetalert2';

// --- THEME DEFINITION ---
const theme = createTheme({
  palette: {
    primary: {
      main: '#8C257C',
      dark: '#6d1d60',
    },
    secondary: {
      main: '#F58E35',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    h5: {
      fontWeight: 'bold',
    },
  },
});

const categories = ['Hardware', 'Software', 'Network Equipment', 'Furniture'];
const brands = ['Dell', 'HP', 'Lenovo', 'Apple', 'Microsoft'];

const initialFormData = {
  assetName: '',
  category: '',
  brand: '',
  manufacturer: '',
  serialNumber: '',
  assetCode: '',
  isWorking: 'Yes',
  purchaseDate: null,
  invoiceNumber: '',
  warrantyEndDate: null,
  assetNote: '',
  assetImage: null,
};

function AssetManagementComponent() {
  const [assets, setAssets] = useState([]);
  const [formData, setFormData] = useState(initialFormData);
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(false); // Set to false, can be used for API calls

  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('sm'));

  const handleOpen = () => {
    setFormData(initialFormData); // Reset form when opening
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, assetImage: file }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setAssets((prev) => [...prev, { ...formData, id: Date.now() }]);
      setIsSubmitting(false);
      handleClose();
      Swal.fire({
        icon: 'success',
        title: 'Asset Saved!',
        text: 'The new asset has been added to the list.',
        timer: 3000,
        showConfirmButton: false,
      });
    }, 1500);
  };
  
  const handleDelete = (assetId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#8C257C',
      cancelButtonColor: '#757575',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        setAssets(assets.filter(asset => asset.id !== assetId));
        Swal.fire({
            icon: 'success',
            title: 'Deleted!',
            text: 'The asset has been removed.',
            timer: 3000,
            showConfirmButton: false,
        });
      }
    })
  }

  // Memoized filtering and pagination
  const filteredAssets = useMemo(() => {
    return assets.filter(
      (asset) =>
        asset.assetName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        asset.assetCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
        asset.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [assets, searchTerm]);

  const paginatedAssets = useMemo(() => {
    return filteredAssets.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }, [filteredAssets, page, rowsPerPage]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box component={Paper} p={3}>
      <Typography variant="h5" sx={{ color: '#8C257C', fontWeight: 'bold', mb: 2 }}>
        Asset Management
      </Typography>

      <Box
        sx={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 2,
          mb: 2,
        }}
      >
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpen}
          sx={{
            backgroundColor: '#8C257C',
            color: 'white',
            '&:hover': { backgroundColor: '#6d1d60' },
            width: isMobile ? '100%' : 'auto',
          }}
        >
          Add New Asset
        </Button>
        <TextField
          size="small"
          placeholder="Search..."
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

      {/* --- ASSET TABLE --- */}
      <TableContainer sx={{ whiteSpace: 'nowrap' }}>
        <Table sx={{ minWidth: '100%' }}>
          <TableHead sx={{ backgroundColor: '#8C257C' }}>
            <TableRow>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>SR NO.</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>ASSET NAME</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>CATEGORY</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>BRAND</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>ASSET CODE</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>IS WORKING?</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>CREATED AT</TableCell>
              <TableCell align="center" sx={{ color: 'white', fontWeight: 'bold' }}>ACTIONS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              Array.from(new Array(5)).map((_, index) => (
                <TableRow key={index}>
                  <TableCell><Skeleton variant="text" /></TableCell>
                  <TableCell><Skeleton variant="text" /></TableCell>
                  <TableCell><Skeleton variant="text" /></TableCell>
                  <TableCell><Skeleton variant="text" /></TableCell>
                  <TableCell><Skeleton variant="text" /></TableCell>
                  <TableCell><Skeleton variant="text" /></TableCell>
                  <TableCell><Skeleton variant="text" /></TableCell>
                  <TableCell align="center">
                    <Skeleton variant="rectangular" width={100} height={30} />
                  </TableCell>
                </TableRow>
              ))
            ) : paginatedAssets.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  No records available
                </TableCell>
              </TableRow>
            ) : (
              paginatedAssets.map((asset, index) => (
                <TableRow key={asset.id} hover>
                  <TableCell sx={{ fontSize: '0.95rem' }}>{page * rowsPerPage + index + 1}</TableCell>
                  <TableCell sx={{ fontSize: '0.95rem' }}>{asset.assetName}</TableCell>
                  <TableCell sx={{ fontSize: '0.95rem' }}>{asset.category}</TableCell>
                  <TableCell sx={{ fontSize: '0.95rem' }}>{asset.brand}</TableCell>
                  <TableCell sx={{ fontSize: '0.95rem' }}>{asset.assetCode}</TableCell>
                  <TableCell sx={{ fontSize: '0.95rem' }}>{asset.isWorking}</TableCell>
                  <TableCell sx={{ fontSize: '0.95rem' }}>{new Date(asset.id).toLocaleString()}</TableCell>
                  <TableCell>
                    <Box display="flex" justifyContent="center" gap={0.5}>
                      <IconButton size="small" sx={{ color: 'primary.main' }}>
                        <EditIcon />
                      </IconButton>
                      <IconButton size="small" sx={{ color: 'error.main' }} onClick={() => handleDelete(asset.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* --- FOOTER & PAGINATION --- */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          mt: 2,
          gap: isMobile ? 2 : 0,
        }}
      >
        <Typography variant="body2" color="text.secondary">
          Showing {paginatedAssets.length > 0 ? page * rowsPerPage + 1 : 0} to {Math.min((page + 1) * rowsPerPage, filteredAssets.length)} of {filteredAssets.length} results
        </Typography>
        <TablePagination
          component="div"
          count={filteredAssets.length}
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

      {/* --- ADD/EDIT DIALOG --- */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle sx={{ color: '#8C257C', fontWeight: 'bold' }}>
          Add New Asset
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit} id="asset-form">
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12} sm={4}>
                <TextField label="Asset Name" value={formData.assetName} onChange={(e) => handleInputChange('assetName', e.target.value)} required fullWidth />
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth required>
                  <InputLabel>Category</InputLabel>
                  <Select value={formData.category} onChange={(e) => handleInputChange('category', e.target.value)} label="Category">
                    {categories.map((c) => (<MenuItem key={c} value={c}>{c}</MenuItem>))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth required>
                  <InputLabel>Brand</InputLabel>
                  <Select value={formData.brand} onChange={(e) => handleInputChange('brand', e.target.value)} label="Brand">
                    {brands.map((b) => (<MenuItem key={b} value={b}>{b}</MenuItem>))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField label="Manufacturer" value={formData.manufacturer} onChange={(e) => handleInputChange('manufacturer', e.target.value)} fullWidth />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField label="Serial Number" value={formData.serialNumber} onChange={(e) => handleInputChange('serialNumber', e.target.value)} fullWidth />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField label="Asset Code" value={formData.assetCode} onChange={(e) => handleInputChange('assetCode', e.target.value)} required fullWidth />
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth required>
                  <InputLabel>Is Working?</InputLabel>
                  <Select value={formData.isWorking} onChange={(e) => handleInputChange('isWorking', e.target.value)} label="Is Working?">
                    <MenuItem value="Yes">Yes</MenuItem>
                    <MenuItem value="No">No</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4}>
                <DatePicker label="Purchase Date" value={formData.purchaseDate} onChange={(date) => handleInputChange('purchaseDate', date)} renderInput={(params) => <TextField {...params} fullWidth />} />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField label="Invoice Number" value={formData.invoiceNumber} onChange={(e) => handleInputChange('invoiceNumber', e.target.value)} fullWidth />
              </Grid>
              <Grid item xs={12} sm={4}>
                <DatePicker label="Warranty End Date" value={formData.warrantyEndDate} onChange={(date) => handleInputChange('warrantyEndDate', date)} renderInput={(params) => <TextField {...params} fullWidth />} />
              </Grid>
              <Grid item xs={12} sm={8}>
                <TextField label="Asset Note" value={formData.assetNote} onChange={(e) => handleInputChange('assetNote', e.target.value)} multiline rows={4} fullWidth />
              </Grid>
               <Grid item xs={12} sm={4}>
                <input accept="image/*" style={{ display: 'none' }} id="asset-image-upload" type="file" onChange={handleFileChange} />
                <label htmlFor="asset-image-upload">
                  <Button variant="contained" component="span" sx={{ backgroundColor: '#8C257C', color: 'white', '&:hover': { backgroundColor: '#6d1d60' } }}>
                    Upload Image
                  </Button>
                </label>
                {formData.assetImage && (
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    {formData.assetImage.name}
                  </Typography>
                )}
              </Grid>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions sx={{ p: '16px 24px' }}>
          <Button onClick={handleClose} sx={{ color: '#757575', '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' } }}>
            Cancel
          </Button>
          <Button
            type="submit"
            form="asset-form"
            variant="contained"
            disabled={isSubmitting}
            sx={{
              backgroundColor: '#8C257C',
              color: 'white',
              '&:hover': { backgroundColor: '#6d1d60' },
            }}
          >
            {isSubmitting ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

// Wrap component with ThemeProvider and LocalizationProvider for context
export default function AssetManagement() {
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <AssetManagementComponent />
      </LocalizationProvider>
    </ThemeProvider>
  );
}