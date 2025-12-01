import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Button, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Dialog, DialogActions, DialogContent,
  DialogTitle, TextField, Card, CardContent, Grid, IconButton,
  Tooltip, Skeleton, CircularProgress, InputAdornment, Chip, MenuItem
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { format, parse, isValid } from 'date-fns';

// Icons
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddBoxIcon from '@mui/icons-material/AddBox';
import PaymentIcon from '@mui/icons-material/Payment'; // For Payments title
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import RefreshIcon from '@mui/icons-material/Refresh';
import EventIcon from '@mui/icons-material/Event';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'; // For Bill For
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CreditCardIcon from '@mui/icons-material/CreditCard'; // For Payment Method
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty'; // For Pending Status
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'; // For Paid Status
import CancelIcon from '@mui/icons-material/Cancel'; // For Failed/Cancelled Status
import WarningAmberIcon from '@mui/icons-material/WarningAmber';


// Helper to format Date object to yyyy-MM-dd string
const formatDateObjectToInput = (dateObj) => {
  if (!dateObj || !(dateObj instanceof Date) || isNaN(dateObj)) return '';
  return format(dateObj, 'yyyy-MM-dd');
};

// Helper to parse yyyy-MM-dd string (or other common date strings) to Date object
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
const TableRowSkeleton = ({ columns = 6 }) => (
  <TableRow>
    {Array.from(new Array(columns)).map((_, index) => (
      <TableCell key={index}>
        <Skeleton variant="text" width={index === columns -1 ? 80 : "90%"} />
      </TableCell>
    ))}
  </TableRow>
);

const paymentMethods = ["Credit Card", "Bank Transfer", "PayPal", "Check", "Cash", "Other"];
const paymentStatuses = ["Paid", "Pending", "Failed", "Refunded", "Overdue"];


const InvoicePayments = () => {
  const [payments, setPayments] = useState([]);
  const [filteredPayments, setFilteredPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const [openCreateEditDialog, setOpenCreateEditDialog] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [paymentToDelete, setPaymentToDelete] = useState(null);
  const [currentPayment, setCurrentPayment] = useState(null);

  const initialPaymentState = {
    billFor: '', invoiceDate: null, amount: '', paymentMethod: paymentMethods[0], status: paymentStatuses[1] // Default to Pending
  };

  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setLoading(true);
    const fetchPayments = () => {
      setTimeout(() => {
        const data = [
          { id: 1, billFor: "John Doe", invoiceDate: "2024-11-10", amount: "$500.00", paymentMethod: "Credit Card", status: "Paid" },
          { id: 2, billFor: "Jane Smith", invoiceDate: "2024-11-12", amount: "$700.00", paymentMethod: "Bank Transfer", status: "Pending" },
          { id: 3, billFor: "Acme Corp", invoiceDate: "2024-11-13", amount: "$1200.00", paymentMethod: "PayPal", status: "Paid" },
          { id: 4, billFor: "Mahesh B", invoiceDate: "2024-11-14", amount: "$1300.00", paymentMethod: "Check", status: "Failed" },
        ];
        setPayments(data);
        setFilteredPayments(data);
        setLoading(false);
      }, 1200);
    };
    fetchPayments();
  }, [refreshKey]);

  useEffect(() => {
    const lowercasedFilter = searchQuery.toLowerCase();
    const filteredData = payments.filter(payment => {
      return (
        payment.billFor.toLowerCase().includes(lowercasedFilter) ||
        payment.invoiceDate.includes(lowercasedFilter) ||
        payment.amount.toLowerCase().includes(lowercasedFilter) ||
        payment.paymentMethod.toLowerCase().includes(lowercasedFilter) ||
        payment.status.toLowerCase().includes(lowercasedFilter)
      );
    });
    setFilteredPayments(filteredData);
  }, [searchQuery, payments]);

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  const handleOpenCreateDialog = () => {
    setIsEditing(false);
    setCurrentPayment(initialPaymentState);
    setOpenCreateEditDialog(true);
  };

  const handleOpenEditDialog = (payment) => {
    setIsEditing(true);
    setCurrentPayment({
        ...payment,
        invoiceDate: parseInputToDateObject(payment.invoiceDate),
    });
    setOpenCreateEditDialog(true);
  };

  const handleCloseCreateEditDialog = () => {
    setOpenCreateEditDialog(false);
    setCurrentPayment(null);
  };

  const handleFormInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentPayment(prev => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date) => {
    setCurrentPayment(prev => ({ ...prev, invoiceDate: date }));
  };

  const handleSaveOrUpdatePayment = async () => {
    if (!currentPayment.billFor || !currentPayment.invoiceDate || !currentPayment.amount || !currentPayment.paymentMethod || !currentPayment.status) {
        alert("Please fill all required fields.");
        return;
    }
    setSubmitLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));

    const payload = {
        ...currentPayment,
        invoiceDate: formatDateObjectToInput(currentPayment.invoiceDate),
    };

    if (isEditing) {
      setPayments(prevPayments =>
        prevPayments.map(p => (p.id === payload.id ? payload : p))
      );
    } else {
      setPayments(prevPayments => [{ ...payload, id: Date.now() }, ...prevPayments]);
    }
    setSubmitLoading(false);
    handleCloseCreateEditDialog();
  };

  const handleOpenDeleteDialog = (payment) => {
    setPaymentToDelete(payment);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setPaymentToDelete(null);
  };

  const handleDeletePayment = async () => {
    if (!paymentToDelete) return;
    setPayments(prevPayments => prevPayments.filter(p => p.id !== paymentToDelete.id));
    handleCloseDeleteDialog();
  };

  const getStatusChip = (status) => {
    let color = "default";
    let icon = <HourglassEmptyIcon />;
    switch (status) {
      case "Paid": color = "success"; icon = <CheckCircleOutlineIcon />; break;
      case "Pending": color = "warning"; icon = <HourglassEmptyIcon />; break;
      case "Failed": color = "error"; icon = <CancelIcon />; break;
      case "Refunded": color = "info"; icon = <CreditCardIcon />; break; // Example
      case "Overdue": color = "error"; icon = <WarningAmberIcon />; break; // Example
      default: break;
    }
    return <Chip icon={icon} label={status} color={color} size="small" sx={{ fontWeight: 'medium' }} />;
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
            <PaymentIcon sx={{ fontSize: '2rem', mr: 1, color: 'primary.main' }} />
            <Typography variant="h4" sx={{ fontWeight: 700, color: "text.primary" }}>
              Invoice Payments
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary">
            Track and manage customer payments for invoices.
          </Typography>
        </CardContent>
      </Card>

      <Paper sx={{ p: 2.5, mb: 3, borderRadius: 2, boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
        <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={6} md={8}>
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Search by Bill For, Date, Amount, Method, Status..."
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
                    Record Payment
                </Button>
            </Grid>
        </Grid>
      </Paper>

      <TableContainer component={Paper} sx={{borderRadius: 2, boxShadow: "0 4px 20px rgba(0,0,0,0.08)"}}>
        <Table>
          <TableHead sx={{ "& th": { backgroundColor: "#f5f5f7", borderBottom: "2px solid rgba(36, 73, 239, 0.1)", fontWeight: "bold", color: "#333", py: 1.5 } }}>
            <TableRow>
              <TableCell>Bill For</TableCell>
              <TableCell>Invoice Date</TableCell>
              <TableCell align="right">Amount</TableCell>
              <TableCell>Payment Method</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              Array.from(new Array(5)).map((_, index) => (
                <TableRowSkeleton key={index} columns={6}/>
              ))
            ) : filteredPayments.length === 0 ? (
                <TableRow>
                    <TableCell colSpan={6} align="center" sx={{ py: 5 }}>
                        <PaymentIcon sx={{fontSize: 48, color: 'text.disabled', mb: 1}}/>
                        <Typography variant="subtitle1" color="text.secondary">
                            {searchQuery ? "No payments match your search." : "No payments recorded."}
                        </Typography>
                    </TableCell>
                </TableRow>
            ) : (
              filteredPayments.map((payment) => (
                <TableRow key={payment.id} hover sx={{ "&:hover": { backgroundColor: "rgba(36, 73, 239, 0.03)" }}}>
                  <TableCell sx={{fontWeight: 'medium'}}>{payment.billFor}</TableCell>
                  <TableCell>{format(parseInputToDateObject(payment.invoiceDate), 'dd MMM, yyyy')}</TableCell>
                  <TableCell align="right" sx={{fontWeight: 'medium'}}>{payment.amount}</TableCell>
                  <TableCell>{payment.paymentMethod}</TableCell>
                  <TableCell>{getStatusChip(payment.status)}</TableCell>
                  <TableCell align="center">
                    <Tooltip title="Edit Payment">
                        <IconButton size="small" sx={{color: 'secondary.main', mr: 0.5}} onClick={() => handleOpenEditDialog(payment)}>
                            <EditIcon fontSize="small"/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Payment">
                        <IconButton size="small" sx={{color: 'error.main'}} onClick={() => handleOpenDeleteDialog(payment)}>
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

      {/* Create/Edit Payment Dialog */}
      <Dialog
        open={openCreateEditDialog}
        onClose={handleCloseCreateEditDialog}
        maxWidth="sm"
        fullWidth
        PaperProps={{ sx: { borderRadius: 3 } }}
      >
        <DialogTitle sx={{ ...gradientButtonStyle, color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1.5 }}>
          {isEditing ? `Edit Payment for ${currentPayment?.billFor || ''}` : "Record New Payment"}
          <IconButton onClick={handleCloseCreateEditDialog} sx={{ color: 'rgba(255,255,255,0.8)', '&:hover': {color: 'white'} }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers sx={{ p: { xs: 2, sm: 3 }, backgroundColor: 'grey.50' }}>
          <Grid container spacing={2.5}>
            <Grid item xs={12} sm={6}>
              <TextField label="Bill For" name="billFor" value={currentPayment?.billFor || ''} onChange={handleFormInputChange} fullWidth required margin="dense" sx={{"& .MuiOutlinedInput-root": {borderRadius:2}}} InputProps={{startAdornment: <InputAdornment position="start"><PeopleAltIcon fontSize="small" /></InputAdornment>}}/>
            </Grid>
             <Grid item xs={12} sm={6}>
              <DatePicker label="Invoice Date / Payment Date *" value={currentPayment?.invoiceDate || null} onChange={handleDateChange} renderInput={(params) => <TextField {...params} fullWidth required margin="dense" sx={{"& .MuiOutlinedInput-root": {borderRadius:2}}} InputProps={{...params.InputProps, startAdornment: <InputAdornment position="start"><EventIcon fontSize="small" /></InputAdornment>}} />} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Amount" name="amount" value={currentPayment?.amount || ''} onChange={handleFormInputChange} fullWidth required margin="dense" sx={{"& .MuiOutlinedInput-root": {borderRadius:2}}} InputProps={{startAdornment: <InputAdornment position="start"><AttachMoneyIcon fontSize="small" /></InputAdornment>}} placeholder="$0.00"/>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Payment Method" name="paymentMethod" value={currentPayment?.paymentMethod || ''} onChange={handleFormInputChange} select fullWidth required margin="dense" sx={{"& .MuiOutlinedInput-root": {borderRadius:2}}} InputProps={{startAdornment: <InputAdornment position="start"><CreditCardIcon fontSize="small" /></InputAdornment>}}>
                {paymentMethods.map(option => (<MenuItem key={option} value={option}>{option}</MenuItem>))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField label="Status" name="status" value={currentPayment?.status || ''} onChange={handleFormInputChange} select fullWidth required margin="dense" sx={{"& .MuiOutlinedInput-root": {borderRadius:2}}} InputProps={{startAdornment: <InputAdornment position="start"><HourglassEmptyIcon fontSize="small" /></InputAdornment>}}>
                 {paymentStatuses.map(option => (<MenuItem key={option} value={option}>{option}</MenuItem>))}
              </TextField>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 2, backgroundColor: 'grey.50', borderTop: '1px solid', borderColor: 'divider' }}>
          <Button onClick={handleCloseCreateEditDialog} color="inherit" sx={{borderRadius:2}} disabled={submitLoading}>Cancel</Button>
          <Button onClick={handleSaveOrUpdatePayment} sx={{...gradientButtonStyle, minWidth: '150px', py: '10px', px: 3}} disabled={submitLoading}>
            {submitLoading ? <CircularProgress size={24} color="inherit" /> : (isEditing ? "Save Changes" : "Record Payment")}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog} PaperProps={{sx: {borderRadius: 3}}}>
        <DialogTitle sx={{display: 'flex', alignItems: 'center'}}>
            <WarningAmberIcon color="error" sx={{mr:1}}/> Confirm Deletion
        </DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete the payment for <strong>{paymentToDelete?.billFor}</strong> (Amount: {paymentToDelete?.amount})?</Typography>
        </DialogContent>
        <DialogActions sx={{px:3, pb:2}}>
          <Button onClick={handleCloseDeleteDialog} color="inherit" sx={{borderRadius:2}}>Cancel</Button>
          <Button onClick={handleDeletePayment} variant="contained" color="error" sx={{borderRadius:2}}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
    </LocalizationProvider>
  );
};

export default InvoicePayments;