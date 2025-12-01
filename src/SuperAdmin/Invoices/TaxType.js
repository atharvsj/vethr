import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Button, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Dialog, DialogActions, DialogContent,
  DialogTitle, TextField, Card, CardContent, Grid, IconButton,
  Tooltip, Skeleton, CircularProgress, InputAdornment, MenuItem, FormControl, InputLabel, Select
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { format, parse, isValid } from 'date-fns';

// Icons
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddBoxIcon from '@mui/icons-material/AddBox';
import PercentIcon from '@mui/icons-material/Percent'; // For Tax Types title
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import RefreshIcon from '@mui/icons-material/Refresh';
import EventIcon from '@mui/icons-material/Event';
import TitleIcon from '@mui/icons-material/Title'; // For Tax Name
import CategoryIcon from '@mui/icons-material/Category'; // For Tax Type
import WarningAmberIcon from '@mui/icons-material/WarningAmber';


// Helper to format Date object to yyyy-MM-dd string
const formatDateObjectToInput = (dateObj) => {
  if (!dateObj || !(dateObj instanceof Date) || isNaN(dateObj)) return '';
  return format(dateObj, 'yyyy-MM-dd');
};

// Helper to parse yyyy-MM-dd string to Date object
const parseInputToDateObject = (dateString) => {
  if (!dateString) return null;
  let parsedDate = parse(dateString, 'yyyy-MM-dd', new Date());
  if (isValid(parsedDate)) return parsedDate;
  parsedDate = new Date(dateString);
  return isValid(parsedDate) ? parsedDate : null;
};

// Gradient button style
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

// Skeleton for Table Row
const TableRowSkeleton = ({ columns = 5 }) => (
  <TableRow>
    {Array.from(new Array(columns)).map((_, index) => (
      <TableCell key={index}>
        <Skeleton variant="text" width={index === columns -1 ? 80 : "90%"} />
      </TableCell>
    ))}
  </TableRow>
);

const taxTypeOptions = ["Sales", "VAT", "Service", "GST", "Excise", "Other"];

const TaxType = () => {
  const [taxTypes, setTaxTypes] = useState([]);
  const [filteredTaxTypes, setFilteredTaxTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const [openCreateEditDialog, setOpenCreateEditDialog] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [taxToDelete, setTaxToDelete] = useState(null);
  const [currentTax, setCurrentTax] = useState(null);

  const initialTaxState = {
    taxName: "", taxRate: "", taxType: taxTypeOptions[0], createdAt: new Date() // Auto-fill current date as Date object
  };

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setLoading(true);
    const fetchTaxTypes = () => {
      setTimeout(() => {
        const data = [
          { id: 1, taxName: "Sales Tax (General)", taxRate: "5%", taxType: "Sales", createdAt: "2024-11-10" },
          { id: 2, taxName: "Value Added Tax (Standard)", taxRate: "12%", taxType: "VAT", createdAt: "2024-11-12" },
          { id: 3, taxName: "Service Charge", taxRate: "10%", taxType: "Service", createdAt: "2024-10-01" },
          { id: 4, taxName: "GST (Interstate)", taxRate: "18%", taxType: "GST", createdAt: "2023-05-20" },
        ];
        setTaxTypes(data);
        setFilteredTaxTypes(data);
        setLoading(false);
      }, 1000);
    };
    fetchTaxTypes();
  }, [refreshKey]);

  useEffect(() => {
    const lowercasedFilter = searchQuery.toLowerCase();
    const filteredData = taxTypes.filter(tax => {
      return (
        tax.taxName.toLowerCase().includes(lowercasedFilter) ||
        tax.taxRate.toLowerCase().includes(lowercasedFilter) ||
        tax.taxType.toLowerCase().includes(lowercasedFilter) ||
        tax.createdAt.includes(lowercasedFilter)
      );
    });
    setFilteredTaxTypes(filteredData);
  }, [searchQuery, taxTypes]);

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  const handleOpenCreateDialog = () => {
    setIsEditing(false);
    setCurrentTax(initialTaxState);
    setOpenCreateEditDialog(true);
  };

  const handleOpenEditDialog = (tax) => {
    setIsEditing(true);
    setCurrentTax({
      ...tax,
      createdAt: parseInputToDateObject(tax.createdAt), // Convert string to Date object for DatePicker
    });
    setOpenCreateEditDialog(true);
  };

  const handleCloseCreateEditDialog = () => {
    setOpenCreateEditDialog(false);
    setCurrentTax(null);
  };

  const handleFormInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentTax(prev => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date) => { // For DatePicker
    setCurrentTax(prev => ({ ...prev, createdAt: date }));
  };

  const handleSaveOrUpdateTax = async () => {
    if (!currentTax.taxName || !currentTax.taxRate || !currentTax.taxType || !currentTax.createdAt) {
        alert("Please fill all required fields.");
        return;
    }
    setSubmitLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));

    const payload = {
        ...currentTax,
        createdAt: formatDateObjectToInput(currentTax.createdAt), // Convert Date object back to string for storage/display
    };

    if (isEditing) {
      setTaxTypes(prevTaxes =>
        prevTaxes.map(tax => (tax.id === payload.id ? payload : tax))
      );
    } else {
      setTaxTypes(prevTaxes => [{ ...payload, id: Date.now() }, ...prevTaxes]);
    }
    setSubmitLoading(false);
    handleCloseCreateEditDialog();
  };

  const handleOpenDeleteDialog = (tax) => {
    setTaxToDelete(tax);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setTaxToDelete(null);
  };

  const handleDeleteTax = async () => {
    if (!taxToDelete) return;
    setTaxTypes(prevTaxes => prevTaxes.filter(tax => tax.id !== taxToDelete.id));
    handleCloseDeleteDialog();
  };

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
            <PercentIcon sx={{ fontSize: '2rem', mr: 1, color: 'primary.main' }} />
            <Typography variant="h4" sx={{ fontWeight: 700, color: "text.primary" }}>
              Tax Types Management
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary">
            Configure and manage different types of taxes for your business.
          </Typography>
        </CardContent>
      </Card>

      <Paper sx={{ p: 2.5, mb: 3, borderRadius: 2, boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
        <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={6} md={8}>
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Search by Tax Name, Rate, Type, Date..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    InputProps={{
                    startAdornment: (<InputAdornment position="start"><SearchIcon color="action" /></InputAdornment>),
                    }}
                    sx={{
                    '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'primary.light' },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'primary.main', borderWidth: '1px' },
                    },
                    }}
                />
            </Grid>
            <Grid item xs={12} sm={6} md={4} sx={{ display: 'flex', justifyContent: {xs: 'flex-start', sm: 'flex-end'}, gap: 1 }}>
                <Tooltip title="Refresh Data">
                    <IconButton onClick={handleRefresh} color="primary" sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
                        <RefreshIcon />
                    </IconButton>
                </Tooltip>
                <Button
                    startIcon={<AddBoxIcon />}
                    onClick={handleOpenCreateDialog}
                    sx={{ ...gradientButtonStyle, py: 1.25, px: 3 }}
                >
                    Add Tax Type
                </Button>
            </Grid>
        </Grid>
      </Paper>

      <TableContainer component={Paper} sx={{borderRadius: 2, boxShadow: "0 4px 20px rgba(0,0,0,0.08)"}}>
        <Table>
          <TableHead sx={{ "& th": { backgroundColor: "#f5f5f7", borderBottom: "2px solid rgba(36, 73, 239, 0.1)", fontWeight: "bold", color: "#333", py: 1.5 } }}>
            <TableRow>
              <TableCell>Tax Name</TableCell>
              <TableCell>Tax Rate</TableCell>
              <TableCell>Tax Type</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              Array.from(new Array(4)).map((_, index) => (
                <TableRowSkeleton key={index} columns={5}/>
              ))
            ) : filteredTaxTypes.length === 0 ? (
                <TableRow>
                    <TableCell colSpan={5} align="center" sx={{ py: 5 }}>
                        <PercentIcon sx={{fontSize: 48, color: 'text.disabled', mb: 1}}/>
                        <Typography variant="subtitle1" color="text.secondary">
                            {searchQuery ? "No tax types match your search." : "No tax types configured."}
                        </Typography>
                    </TableCell>
                </TableRow>
            ) : (
              filteredTaxTypes.map((tax) => (
                <TableRow key={tax.id} hover sx={{ "&:hover": { backgroundColor: "rgba(36, 73, 239, 0.03)" }}}>
                  <TableCell sx={{fontWeight: 'medium'}}>{tax.taxName}</TableCell>
                  <TableCell>{tax.taxRate}</TableCell>
                  <TableCell>{tax.taxType}</TableCell>
                  <TableCell>{format(parseInputToDateObject(tax.createdAt), 'dd MMM, yyyy')}</TableCell>
                  <TableCell align="center">
                    <Tooltip title="Edit Tax Type">
                        <IconButton size="small" sx={{color: 'secondary.main', mr: 0.5}} onClick={() => handleOpenEditDialog(tax)}>
                            <EditIcon fontSize="small"/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Tax Type">
                        <IconButton size="small" sx={{color: 'error.main'}} onClick={() => handleOpenDeleteDialog(tax)}>
                            <DeleteIcon fontSize="small"/>
                        </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Create/Edit Tax Type Dialog */}
      <Dialog
        open={openCreateEditDialog}
        onClose={handleCloseCreateEditDialog}
        maxWidth="sm"
        fullWidth
        PaperProps={{ sx: { borderRadius: 3 } }}
      >
        <DialogTitle sx={{ ...gradientButtonStyle, color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1.5 }}>
          {isEditing ? `Edit Tax Type: ${currentTax?.taxName || ''}` : "Add New Tax Type"}
          <IconButton onClick={handleCloseCreateEditDialog} sx={{ color: 'rgba(255,255,255,0.8)', '&:hover': {color: 'white'} }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers sx={{ p: { xs: 2, sm: 3 }, backgroundColor: 'grey.50' }}>
          <Grid container spacing={2.5}>
            <Grid item xs={12} sm={6}>
              <TextField label="Tax Name" name="taxName" value={currentTax?.taxName || ''} onChange={handleFormInputChange} fullWidth required margin="dense" sx={{"& .MuiOutlinedInput-root": {borderRadius:2}}} InputProps={{startAdornment: <InputAdornment position="start"><TitleIcon fontSize="small" /></InputAdornment>}}/>
            </Grid>
             <Grid item xs={12} sm={6}>
              <TextField label="Tax Rate (e.g., 5% or 0.05)" name="taxRate" value={currentTax?.taxRate || ''} onChange={handleFormInputChange} fullWidth required margin="dense" sx={{"& .MuiOutlinedInput-root": {borderRadius:2}}} InputProps={{startAdornment: <InputAdornment position="start"><PercentIcon fontSize="small" /></InputAdornment>}} placeholder="e.g. 5% or 0.05"/>
            </Grid>
            <Grid item xs={12} sm={6}>
                <FormControl fullWidth required margin="dense" sx={{"& .MuiOutlinedInput-root": {borderRadius:2}}}>
                    <InputLabel id="tax-type-label">Tax Type</InputLabel>
                    <Select
                        labelId="tax-type-label"
                        label="Tax Type"
                        name="taxType"
                        value={currentTax?.taxType || taxTypeOptions[0]}
                        onChange={handleFormInputChange}
                        startAdornment={<InputAdornment position="start"><CategoryIcon fontSize="small" /></InputAdornment>}
                    >
                        {taxTypeOptions.map(option => (<MenuItem key={option} value={option}>{option}</MenuItem>))}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <DatePicker
                label="Created At"
                value={currentTax?.createdAt || null}
                onChange={handleDateChange}
                renderInput={(params) => <TextField {...params} fullWidth required margin="dense" sx={{"& .MuiOutlinedInput-root": {borderRadius:2}}} InputProps={{...params.InputProps, startAdornment: <InputAdornment position="start"><EventIcon fontSize="small" /></InputAdornment>}} />}
                disabled={isEditing} // Often, created date is not editable
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 2, backgroundColor: 'grey.50', borderTop: '1px solid', borderColor: 'divider' }}>
          <Button onClick={handleCloseCreateEditDialog} color="inherit" sx={{borderRadius:2}} disabled={submitLoading}>Cancel</Button>
          <Button onClick={handleSaveOrUpdateTax} sx={{...gradientButtonStyle, minWidth: '150px', py: '10px', px: 3}} disabled={submitLoading}>
            {submitLoading ? <CircularProgress size={24} color="inherit" /> : (isEditing ? "Save Changes" : "Add Tax Type")}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog} PaperProps={{sx: {borderRadius: 3}}}>
        <DialogTitle sx={{display: 'flex', alignItems: 'center'}}>
            <WarningAmberIcon color="error" sx={{mr:1}}/> Confirm Deletion
        </DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete the tax type: <strong>{taxToDelete?.taxName}</strong> ({taxToDelete?.taxRate})?</Typography>
        </DialogContent>
        <DialogActions sx={{px:3, pb:2}}>
          <Button onClick={handleCloseDeleteDialog} color="inherit" sx={{borderRadius:2}}>Cancel</Button>
          <Button onClick={handleDeleteTax} variant="contained" color="error" sx={{borderRadius:2}}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
    </LocalizationProvider>
  );
};

export default TaxType;