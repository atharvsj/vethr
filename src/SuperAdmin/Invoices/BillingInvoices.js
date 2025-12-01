import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Button, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Dialog, DialogActions, DialogContent,
  DialogTitle, TextField, Card, CardContent, Grid, IconButton,
  Tooltip, Skeleton, CircularProgress, InputAdornment, Chip
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { format, parse, isValid } from 'date-fns'; // Using 'parse' for flexibility

// Icons
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddBoxIcon from '@mui/icons-material/AddBox';
import ReceiptIcon from '@mui/icons-material/Receipt'; // For Invoices title
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import RefreshIcon from '@mui/icons-material/Refresh';
import EventIcon from '@mui/icons-material/Event';
import DescriptionIcon from '@mui/icons-material/Description'; // For Project
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import WarningAmberIcon from '@mui/icons-material/WarningAmber'; // For delete dialog


// Helper to format Date object to yyyy-MM-dd string for date inputs/storage
const formatDateObjectToInput = (dateObj) => {
  if (!dateObj || !(dateObj instanceof Date) || isNaN(dateObj)) return '';
  return format(dateObj, 'yyyy-MM-dd');
};

// Helper to parse yyyy-MM-dd string (or other common date strings) to Date object
const parseInputToDateObject = (dateString) => {
  if (!dateString) return null;
  // Try parsing yyyy-MM-dd first
  let parsedDate = parse(dateString, 'yyyy-MM-dd', new Date());
  if (isValid(parsedDate)) return parsedDate;
  // Fallback for other potential date string formats (e.g., from server or older data)
  parsedDate = new Date(dateString); // General purpose parsing
  return isValid(parsedDate) ? parsedDate : null;
};


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

// Skeleton for Table Row
const TableRowSkeleton = ({ columns = 6 }) => (
  <TableRow>
    {Array.from(new Array(columns)).map((_, index) => (
      <TableCell key={index}>
        <Skeleton variant="text" width={index === columns -1 ? 80 : "90%"} />
      </TableCell>
    ))}
  </TableRow>
);


const BillingInvoices = () => {
  const [invoices, setInvoices] = useState([]);
  const [filteredInvoices, setFilteredInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const [openCreateEditDialog, setOpenCreateEditDialog] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [invoiceToDelete, setInvoiceToDelete] = useState(null); // Specific for delete
  const [currentInvoice, setCurrentInvoice] = useState(null); // For create/edit form data

  const initialInvoiceState = {
    invoiceNumber: '', project: '', invoiceDate: null, dueDate: null, amount: ''
  };

  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setLoading(true);
    const fetchInvoices = () => {
      // Simulate API call
      setTimeout(() => {
        const data = [
          { id: 1, invoiceNumber: 'INV001', project: 'Alpha Web Design', invoiceDate: '2024-11-10', dueDate: '2024-12-10', amount: '$500.00' },
          { id: 2, invoiceNumber: 'INV002', project: 'Beta Mobile App', invoiceDate: '2024-11-12', dueDate: '2024-12-12', amount: '$720.50' },
          { id: 3, invoiceNumber: 'INV003', project: 'Gamma E-commerce', invoiceDate: '2024-11-13', dueDate: '2024-12-13', amount: '$1250.00' },
          { id: 4, invoiceNumber: 'INV004', project: 'Delta Marketing', invoiceDate: '2024-11-14', dueDate: '2024-12-14', amount: '$1300.75' },
        ];
        setInvoices(data);
        setFilteredInvoices(data);
        setLoading(false);
      }, 1200);
    };
    fetchInvoices();
  }, [refreshKey]);

  useEffect(() => {
    const lowercasedFilter = searchQuery.toLowerCase();
    const filteredData = invoices.filter(item => {
      return (
        item.invoiceNumber.toLowerCase().includes(lowercasedFilter) ||
        item.project.toLowerCase().includes(lowercasedFilter) ||
        item.invoiceDate.includes(lowercasedFilter) || // Assuming date search is on string
        item.dueDate.includes(lowercasedFilter) ||
        item.amount.toLowerCase().includes(lowercasedFilter)
      );
    });
    setFilteredInvoices(filteredData);
  }, [searchQuery, invoices]);


  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  const handleOpenCreateDialog = () => {
    setIsEditing(false);
    setCurrentInvoice(initialInvoiceState);
    setOpenCreateEditDialog(true);
  };

  const handleOpenEditDialog = (invoice) => {
    setIsEditing(true);
    setCurrentInvoice({
        ...invoice,
        invoiceDate: parseInputToDateObject(invoice.invoiceDate),
        dueDate: parseInputToDateObject(invoice.dueDate)
    });
    setOpenCreateEditDialog(true);
  };

  const handleCloseCreateEditDialog = () => {
    setOpenCreateEditDialog(false);
    setCurrentInvoice(null);
  };

  const handleFormInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentInvoice(prev => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (name, date) => {
    setCurrentInvoice(prev => ({ ...prev, [name]: date }));
  };

  const handleSaveOrUpdateInvoice = async () => {
    if (!currentInvoice.invoiceNumber || !currentInvoice.project || !currentInvoice.invoiceDate || !currentInvoice.dueDate || !currentInvoice.amount) {
        alert("Please fill all required fields.");
        return;
    }
    setSubmitLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API

    const payload = {
        ...currentInvoice,
        invoiceDate: formatDateObjectToInput(currentInvoice.invoiceDate),
        dueDate: formatDateObjectToInput(currentInvoice.dueDate)
    };

    if (isEditing) {
      setInvoices(prevInvoices =>
        prevInvoices.map(inv => (inv.id === payload.id ? payload : inv))
      );
    } else {
      setInvoices(prevInvoices => [{ ...payload, id: Date.now() }, ...prevInvoices]);
    }
    setSubmitLoading(false);
    handleCloseCreateEditDialog();
  };


  const handleOpenDeleteDialog = (invoice) => {
    setInvoiceToDelete(invoice);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setInvoiceToDelete(null);
  };

  const handleDeleteInvoice = async () => {
    if (!invoiceToDelete) return;
    // Simulate API call for delete if needed
    setInvoices(prevInvoices => prevInvoices.filter(inv => inv.id !== invoiceToDelete.id));
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
            <ReceiptIcon sx={{ fontSize: '2rem', mr: 1, color: 'primary.main' }} />
            <Typography variant="h4" sx={{ fontWeight: 700, color: "text.primary" }}>
              Billing Invoices
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary">
            Manage your customer invoices and billing cycles.
          </Typography>
        </CardContent>
      </Card>

      <Paper sx={{ p: 2.5, mb: 3, borderRadius: 2, boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
        <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={6} md={8}>
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Search by Invoice #, Project, Date, Amount..."
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
                    Create Invoice
                </Button>
            </Grid>
        </Grid>
      </Paper>


      <TableContainer component={Paper} sx={{borderRadius: 2, boxShadow: "0 4px 20px rgba(0,0,0,0.08)"}}>
        <Table>
          <TableHead sx={{ "& th": { backgroundColor: "#f5f5f7", borderBottom: "2px solid rgba(36, 73, 239, 0.1)", fontWeight: "bold", color: "#333", py: 1.5 } }}>
            <TableRow>
              <TableCell>Invoice #</TableCell>
              <TableCell>Project</TableCell>
              <TableCell>Invoice Date</TableCell>
              <TableCell>Due Date</TableCell>
              <TableCell align="right">Amount</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              Array.from(new Array(5)).map((_, index) => (
                <TableRowSkeleton key={index} />
              ))
            ) : filteredInvoices.length === 0 ? (
                <TableRow>
                    <TableCell colSpan={6} align="center" sx={{ py: 5 }}>
                        <ReceiptIcon sx={{fontSize: 48, color: 'text.disabled', mb: 1}}/>
                        <Typography variant="subtitle1" color="text.secondary">
                            {searchQuery ? "No invoices match your search." : "No invoices found."}
                        </Typography>
                    </TableCell>
                </TableRow>
            ) : (
              filteredInvoices.map((invoice) => (
                <TableRow key={invoice.id} hover sx={{ "&:hover": { backgroundColor: "rgba(36, 73, 239, 0.03)" }}}>
                  <TableCell sx={{fontWeight: 'medium'}}>{invoice.invoiceNumber}</TableCell>
                  <TableCell>{invoice.project}</TableCell>
                  <TableCell>{format(parseInputToDateObject(invoice.invoiceDate), 'dd MMM, yyyy')}</TableCell>
                  <TableCell>{format(parseInputToDateObject(invoice.dueDate), 'dd MMM, yyyy')}</TableCell>
                  <TableCell align="right" sx={{fontWeight: 'medium'}}>{invoice.amount}</TableCell>
                  <TableCell align="center">
                    <Tooltip title="Edit Invoice">
                        <IconButton size="small" sx={{color: 'secondary.main', mr: 0.5}} onClick={() => handleOpenEditDialog(invoice)}>
                            <EditIcon fontSize="small"/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Invoice">
                        <IconButton size="small" sx={{color: 'error.main'}} onClick={() => handleOpenDeleteDialog(invoice)}>
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

      {/* Create/Edit Invoice Dialog */}
      <Dialog
        open={openCreateEditDialog}
        onClose={handleCloseCreateEditDialog}
        maxWidth="sm"
        fullWidth
        PaperProps={{ sx: { borderRadius: 3 } }}
      >
        <DialogTitle sx={{ ...gradientButtonStyle, color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1.5 }}>
          {isEditing ? `Edit Invoice: ${currentInvoice?.invoiceNumber || ''}` : "Create New Invoice"}
          <IconButton onClick={handleCloseCreateEditDialog} sx={{ color: 'rgba(255,255,255,0.8)', '&:hover': {color: 'white'} }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers sx={{ p: { xs: 2, sm: 3 }, backgroundColor: 'grey.50' }}>
          <Grid container spacing={2.5}>
            <Grid item xs={12} sm={6}>
              <TextField label="Invoice Number" name="invoiceNumber" value={currentInvoice?.invoiceNumber || ''} onChange={handleFormInputChange} fullWidth required margin="dense" sx={{"& .MuiOutlinedInput-root": {borderRadius:2}}} InputProps={{startAdornment: <InputAdornment position="start"><ConfirmationNumberIcon fontSize="small" /></InputAdornment>}}/>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Project / Client" name="project" value={currentInvoice?.project || ''} onChange={handleFormInputChange} fullWidth required margin="dense" sx={{"& .MuiOutlinedInput-root": {borderRadius:2}}} InputProps={{startAdornment: <InputAdornment position="start"><DescriptionIcon fontSize="small" /></InputAdornment>}}/>
            </Grid>
            <Grid item xs={12} sm={6}>
              <DatePicker label="Invoice Date *" value={currentInvoice?.invoiceDate || null} onChange={(date) => handleDateChange('invoiceDate', date)} renderInput={(params) => <TextField {...params} fullWidth required margin="dense" sx={{"& .MuiOutlinedInput-root": {borderRadius:2}}} InputProps={{...params.InputProps, startAdornment: <InputAdornment position="start"><EventIcon fontSize="small" /></InputAdornment>}} />} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <DatePicker label="Due Date *" value={currentInvoice?.dueDate || null} onChange={(date) => handleDateChange('dueDate', date)} renderInput={(params) => <TextField {...params} fullWidth required margin="dense" sx={{"& .MuiOutlinedInput-root": {borderRadius:2}}} InputProps={{...params.InputProps, startAdornment: <InputAdornment position="start"><EventIcon fontSize="small" /></InputAdornment>}} />} minDate={currentInvoice?.invoiceDate || undefined}/>
            </Grid>
            <Grid item xs={12}>
              <TextField label="Amount" name="amount" value={currentInvoice?.amount || ''} onChange={handleFormInputChange} fullWidth required margin="dense" sx={{"& .MuiOutlinedInput-root": {borderRadius:2}}} InputProps={{startAdornment: <InputAdornment position="start"><AttachMoneyIcon fontSize="small" /></InputAdornment>}} placeholder="$0.00"/>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 2, backgroundColor: 'grey.50', borderTop: '1px solid', borderColor: 'divider' }}>
          <Button onClick={handleCloseCreateEditDialog} color="inherit" sx={{borderRadius:2}} disabled={submitLoading}>Cancel</Button>
          <Button onClick={handleSaveOrUpdateInvoice} sx={{...gradientButtonStyle, minWidth: '120px', py: '10px', px: 3}} disabled={submitLoading}>
            {submitLoading ? <CircularProgress size={24} color="inherit" /> : (isEditing ? "Save Changes" : "Add Invoice")}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog} PaperProps={{sx: {borderRadius: 3}}}>
        <DialogTitle sx={{display: 'flex', alignItems: 'center'}}>
            <WarningAmberIcon color="error" sx={{mr:1}}/> Confirm Deletion
        </DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete invoice <strong>{invoiceToDelete?.invoiceNumber}</strong>? This action cannot be undone.</Typography>
        </DialogContent>
        <DialogActions sx={{px:3, pb:2}}>
          <Button onClick={handleCloseDeleteDialog} color="inherit" sx={{borderRadius:2}}>Cancel</Button>
          <Button onClick={handleDeleteInvoice} variant="contained" color="error" sx={{borderRadius:2}}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
    </LocalizationProvider>
  );
};

export default BillingInvoices;