import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  MenuItem,
  Card,
  CardContent,
  Typography,
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  IconButton,
  Chip,
  Tooltip,
  Paper,
  Skeleton,
  CircularProgress,
  InputAdornment, // For potential search
} from "@mui/material";
import {
  AddBox as AddBoxIcon,
  Visibility as VisibilityIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  ReceiptLong as ReceiptLongIcon, // For Estimates title
  Search as SearchIcon, // For search
  Close as CloseIcon,
  Refresh as RefreshIcon, // For refresh button
  HourglassEmpty as PendingIcon,
  CheckCircleOutline as ApprovedIcon,
  Cancel as RejectedIcon, // Example for another status
  Event as EventIcon,
  Description as DescriptionIcon,
  AttachMoney as AttachMoneyIcon,
  ConfirmationNumber as ConfirmationNumberIcon,
} from "@mui/icons-material";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { format, parse, isValid } from 'date-fns';


// Helper to format Date object to yyyy-MM-dd string for date inputs
const formatDateObjectToInput = (dateObj) => {
  if (!dateObj || !isValid(dateObj)) return '';
  return format(dateObj, 'yyyy-MM-dd');
};

// Helper to parse yyyy-MM-dd string to Date object
const parseInputToDateObject = (dateString) => {
  if (!dateString) return null;
  // Try parsing with different common date input formats if necessary
  const parsedDate = parse(dateString, 'yyyy-MM-dd', new Date());
  if (isValid(parsedDate)) return parsedDate;
  // Fallback for browsers that might send full ISO
  const isoParsedDate = new Date(dateString);
  return isValid(isoParsedDate) ? isoParsedDate : null;
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

// Skeleton for Estimate Card
const EstimateCardSkeleton = () => (
  <Grid item xs={12} sm={6} md={4}>
    <Card variant="outlined" sx={{ borderRadius: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Skeleton variant="text" width="60%" height={30} />
        <Skeleton variant="text" width="80%" sx={{ mt: 1 }} />
        <Skeleton variant="text" width="70%" />
        <Skeleton variant="text" width="50%" height={40} sx={{ mt:1 }}/>
      </CardContent>
      <Box sx={{ p: 1.5, borderTop: '1px solid', borderColor: 'divider', display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
        <Skeleton variant="circular" width={32} height={32} />
        <Skeleton variant="circular" width={32} height={32} />
        <Skeleton variant="circular" width={32} height={32} />
      </Box>
    </Card>
  </Grid>
);


const Estimates = () => {
  const [estimates, setEstimates] = useState([]);
  const [filteredEstimates, setFilteredEstimates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openEstimateDialog, setOpenEstimateDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedEstimate, setSelectedEstimate] = useState(null);

  const initialNewEstimateState = {
    invoiceNumber: "",
    createdDate: null, // Use null for DatePicker
    dueDate: null,     // Use null for DatePicker
    description: "",
    amount: "",
    status: "Pending", // Default status
  };
  const [newEstimate, setNewEstimate] = useState(initialNewEstimateState);
  const [searchTerm, setSearchTerm] = useState(""); // For search functionality

  // Sample data fetching simulation
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      const sampleData = [
        { id: 1, invoiceNumber: "EST-001", createdDate: "2024-10-01", dueDate: "2024-10-15", description: "Web Design Consultation", amount: "$1,500.00", status: "Pending" },
        { id: 2, invoiceNumber: "EST-002", createdDate: "2024-10-05", dueDate: "2024-10-20", description: "Mobile App Prototyping", amount: "$5,250.00", status: "Approved" },
        { id: 3, invoiceNumber: "EST-003", createdDate: "2024-10-10", dueDate: "2024-10-25", description: "E-commerce Platform Development", amount: "$12,800.00", status: "Pending" },
        { id: 4, invoiceNumber: "EST-004", createdDate: "2024-11-01", dueDate: "2024-11-15", description: "SEO & Marketing Strategy", amount: "$3,000.00", status: "Rejected" },
        { id: 5, invoiceNumber: "EST-005", createdDate: "2024-11-05", dueDate: "2024-11-20", description: "Cloud Infrastructure Setup", amount: "$7,500.00", status: "Approved" },
      ];
      setEstimates(sampleData);
      setFilteredEstimates(sampleData); // Initialize filteredEstimates
      setLoading(false);
    }, 1200);
  }, [refreshKey]);

  // Filter estimates based on search term
  useEffect(() => {
    const lowercasedFilter = searchTerm.toLowerCase();
    const filteredData = estimates.filter(item => {
      return Object.keys(item).some(key =>
        item[key]?.toString().toLowerCase().includes(lowercasedFilter)
      );
    });
    setFilteredEstimates(filteredData);
  }, [searchTerm, estimates]);


  const handleRefresh = () => {
    setRefreshKey(prevKey => prevKey + 1);
  };

  const handleOpenCreateDialog = () => {
    setNewEstimate(initialNewEstimateState); // Reset form
    setOpenCreateDialog(true);
  };

  const handleCloseCreateDialog = () => setOpenCreateDialog(false);

  const handleCreateEstimate = async () => {
    // Basic Validation
    if (!newEstimate.invoiceNumber || !newEstimate.createdDate || !newEstimate.dueDate || !newEstimate.description || !newEstimate.amount) {
        alert("Please fill all required fields for the estimate.");
        return;
    }
    setSubmitLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call

    const created = formatDateObjectToInput(newEstimate.createdDate);
    const due = formatDateObjectToInput(newEstimate.dueDate);

    const newEstPayload = {
      ...newEstimate,
      id: Date.now(), // Use timestamp for unique ID in sample
      createdDate: created,
      dueDate: due,
    };
    setEstimates(prev => [newEstPayload, ...prev]); // Add to the beginning
    handleCloseCreateDialog();
    setSubmitLoading(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEstimate(prev => ({ ...prev, [name]: value }));
  };
  const handleDateChange = (name, date) => {
    setNewEstimate(prev => ({ ...prev, [name]: date }));
  };


  const handleOpenEstimateDialog = (estimate) => {
    setSelectedEstimate(estimate);
    setOpenEstimateDialog(true);
  };
  const handleCloseEstimateDialog = () => {
    setSelectedEstimate(null);
    setOpenEstimateDialog(false);
  };

  const handleOpenEditDialog = (estimate) => {
    setSelectedEstimate(estimate);
    setNewEstimate({
        ...estimate,
        createdDate: parseInputToDateObject(estimate.createdDate),
        dueDate: parseInputToDateObject(estimate.dueDate)
    });
    setOpenEditDialog(true);
  };
  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setSelectedEstimate(null);
  };

  const handleUpdateEstimate = async () => {
     if (!newEstimate.invoiceNumber || !newEstimate.createdDate || !newEstimate.dueDate || !newEstimate.description || !newEstimate.amount) {
        alert("Please fill all required fields for the estimate.");
        return;
    }
    setSubmitLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call

    const created = formatDateObjectToInput(newEstimate.createdDate);
    const due = formatDateObjectToInput(newEstimate.dueDate);

    setEstimates(prevEstimates =>
      prevEstimates.map(est =>
        est.id === selectedEstimate.id ? { ...newEstimate, id: selectedEstimate.id, createdDate: created, dueDate: due } : est
      )
    );
    handleCloseEditDialog();
    setSubmitLoading(false);
  };

  const handleDeleteEstimate = (id) => {
    if (window.confirm("Are you sure you want to delete this estimate?")) {
      setEstimates(prev => prev.filter(estimate => estimate.id !== id));
    }
  };

  const getStatusChip = (status) => {
    let color = "default";
    let icon = <ReceiptLongIcon />;
    if (status === "Approved") { color = "success"; icon = <ApprovedIcon />; }
    else if (status === "Pending") { color = "warning"; icon = <PendingIcon />; }
    else if (status === "Rejected") { color = "error"; icon = <RejectedIcon />; }
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
            <ReceiptLongIcon sx={{ fontSize: '2rem', mr: 1, color: 'primary.main' }} />
            <Typography variant="h4" sx={{ fontWeight: 700, color: "text.primary" }}>
              Estimates Management
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary">
            Create, view, and manage your project estimates.
          </Typography>
        </CardContent>
      </Card>

      <Paper sx={{ p: 2.5, mb: 3, borderRadius: 2, boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
        <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={6} md={8}>
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Search by Invoice #, Description, Amount, Status..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
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
                    Create Estimate
                </Button>
            </Grid>
        </Grid>
      </Paper>


      <Grid container spacing={3}>
        {loading ? (
          Array.from(new Array(6)).map((_, index) => (
            <EstimateCardSkeleton key={index} />
          ))
        ) : filteredEstimates.length === 0 ? (
            <Grid item xs={12}>
                <Paper sx={{textAlign: 'center', p:5, borderRadius: 2, mt: 2}}>
                    <ReceiptLongIcon sx={{fontSize: 60, color: 'text.disabled', mb: 2}}/>
                    <Typography variant="h6" color="text.secondary">
                        {searchTerm ? "No estimates match your search." : "No estimates found."}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{mt:1}}>
                        {searchTerm ? "Try a different search term or clear the search." : "Click 'Create Estimate' to add a new one."}
                    </Typography>
                </Paper>
            </Grid>
        ) : (
          filteredEstimates.map((estimate) => (
            <Grid item xs={12} sm={6} md={4} key={estimate.id}>
              <Card
                variant="outlined"
                sx={{
                  borderRadius: 2, height: '100%', display: 'flex', flexDirection: 'column',
                  transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                  }
                }}
              >
                <CardContent sx={{ flexGrow: 1, pb: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb:1.5 }}>
                    <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', color: 'primary.dark' }}>
                      {estimate.invoiceNumber}
                    </Typography>
                    {getStatusChip(estimate.status)}
                  </Box>
                  <Typography variant="body1" sx={{ mb: 1, minHeight: '40px' }} color="text.primary"> {/* Fixed height for description or use line-clamp */}
                    {estimate.description}
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'success.dark', my: 1.5 }}>
                    {estimate.amount}
                  </Typography>
                  <Grid container spacing={1}>
                    <Grid item xs={6}>
                         <Typography variant="caption" color="text.secondary" display="block">Created Date:</Typography>
                         <Typography variant="body2" sx={{fontWeight: 500}}>{format(parseInputToDateObject(estimate.createdDate), 'dd MMM, yyyy')}</Typography>
                    </Grid>
                     <Grid item xs={6}>
                         <Typography variant="caption" color="text.secondary" display="block">Due Date:</Typography>
                         <Typography variant="body2" sx={{fontWeight: 500}}>{format(parseInputToDateObject(estimate.dueDate), 'dd MMM, yyyy')}</Typography>
                    </Grid>
                  </Grid>

                </CardContent>
                <Box sx={{ p: 1, borderTop: '1px solid', borderColor: 'divider', display: 'flex', justifyContent: 'flex-end', gap: 0.5, bgcolor: 'grey.50' }}>
                  <Tooltip title="View Details">
                    <IconButton size="small" sx={{color: 'info.main'}} onClick={() => handleOpenEstimateDialog(estimate)}>
                      <VisibilityIcon fontSize="small"/>
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Edit Estimate">
                    <IconButton size="small" sx={{color: 'secondary.main'}} onClick={() => handleOpenEditDialog(estimate)}>
                      <EditIcon fontSize="small"/>
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete Estimate">
                    <IconButton size="small" sx={{color: 'error.main'}} onClick={() => handleDeleteEstimate(estimate.id)}>
                      <DeleteIcon fontSize="small"/>
                    </IconButton>
                  </Tooltip>
                </Box>
              </Card>
            </Grid>
          ))
        )}
      </Grid>

      {/* Create/Edit Estimate Dialog Common Structure */}
      <Dialog
        open={openCreateDialog || openEditDialog}
        onClose={openCreateDialog ? handleCloseCreateDialog : handleCloseEditDialog}
        maxWidth="sm"
        fullWidth
        PaperProps={{ sx: { borderRadius: 3 } }}
      >
        <DialogTitle sx={{ ...gradientButtonStyle, color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1.5 }}>
          {openCreateDialog ? "Create New Estimate" : `Edit Estimate: ${selectedEstimate?.invoiceNumber || ''}`}
          <IconButton onClick={openCreateDialog ? handleCloseCreateDialog : handleCloseEditDialog} sx={{ color: 'rgba(255,255,255,0.8)', '&:hover': {color: 'white'} }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers sx={{ p: { xs: 2, sm: 3 }, backgroundColor: 'grey.50' }}>
          <Grid container spacing={2.5}>
            <Grid item xs={12} sm={6}>
              <TextField label="Invoice Number" name="invoiceNumber" value={newEstimate.invoiceNumber} onChange={handleInputChange} fullWidth required margin="dense" sx={{"& .MuiOutlinedInput-root": {borderRadius:2}}} InputProps={{startAdornment: <InputAdornment position="start"><ConfirmationNumberIcon fontSize="small" /></InputAdornment>}} />
            </Grid>
            <Grid item xs={12} sm={6}>
               <TextField label="Status" name="status" value={newEstimate.status} onChange={handleInputChange} select fullWidth required margin="dense" sx={{"& .MuiOutlinedInput-root": {borderRadius:2}}} InputProps={{startAdornment: <InputAdornment position="start"><PendingIcon fontSize="small" /></InputAdornment>}}>
                {["Pending", "Approved", "Rejected", "Sent", "Draft"].map(option => (
                    <MenuItem key={option} value={option}>{option}</MenuItem>
                ))}
               </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <DatePicker label="Created Date *" value={newEstimate.createdDate} onChange={(date) => handleDateChange('createdDate', date)} renderInput={(params) => <TextField {...params} fullWidth required margin="dense" sx={{"& .MuiOutlinedInput-root": {borderRadius:2}}} InputProps={{...params.InputProps, startAdornment: <InputAdornment position="start"><EventIcon fontSize="small" /></InputAdornment>}} />} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <DatePicker label="Due Date *" value={newEstimate.dueDate} onChange={(date) => handleDateChange('dueDate', date)} renderInput={(params) => <TextField {...params} fullWidth required margin="dense" sx={{"& .MuiOutlinedInput-root": {borderRadius:2}}} InputProps={{...params.InputProps, startAdornment: <InputAdornment position="start"><EventIcon fontSize="small" /></InputAdornment>}} />} minDate={newEstimate.createdDate}/>
            </Grid>
            <Grid item xs={12}>
              <TextField label="Description" name="description" value={newEstimate.description} onChange={handleInputChange} fullWidth required multiline rows={3} margin="dense" sx={{"& .MuiOutlinedInput-root": {borderRadius:2}}} InputProps={{startAdornment: <InputAdornment position="start"><DescriptionIcon fontSize="small" /></InputAdornment>}}/>
            </Grid>
            <Grid item xs={12}>
              <TextField label="Amount" name="amount" value={newEstimate.amount} onChange={handleInputChange} fullWidth required margin="dense" sx={{"& .MuiOutlinedInput-root": {borderRadius:2}}} InputProps={{startAdornment: <InputAdornment position="start"><AttachMoneyIcon fontSize="small" /></InputAdornment>}} placeholder="$0.00"/>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 2, backgroundColor: 'grey.50', borderTop: '1px solid', borderColor: 'divider' }}>
          <Button onClick={openCreateDialog ? handleCloseCreateDialog : handleCloseEditDialog} color="inherit" sx={{borderRadius:2}} disabled={submitLoading}>Cancel</Button>
          <Button onClick={openCreateDialog ? handleCreateEstimate : handleUpdateEstimate} sx={{...gradientButtonStyle, minWidth: '120px', py: '10px', px: 3}} disabled={submitLoading}>
            {submitLoading ? <CircularProgress size={24} color="inherit" /> : (openCreateDialog ? "Create" : "Update")}
          </Button>
        </DialogActions>
      </Dialog>


      {/* Estimate Detail Dialog */}
      {selectedEstimate && (
        <Dialog open={openEstimateDialog} onClose={handleCloseEstimateDialog} maxWidth="xs" fullWidth PaperProps={{ sx: { borderRadius: 3 } }}>
          <DialogTitle sx={{ ...gradientButtonStyle, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1.5 }}>
            Details: {selectedEstimate.invoiceNumber}
            <IconButton onClick={handleCloseEstimateDialog} sx={{ color: 'rgba(255,255,255,0.8)', '&:hover': {color: 'white'} }}><CloseIcon /></IconButton>
          </DialogTitle>
          <DialogContent dividers sx={{ p: {xs:2, sm:3}, backgroundColor: 'grey.50' }}>
            <Typography variant="h6" gutterBottom sx={{fontWeight: 'medium', color: 'primary.dark'}}>
                {selectedEstimate.description}
            </Typography>
            <Box sx={{mb:2}}>
                <Typography variant="caption" color="text.secondary">Amount:</Typography>
                <Typography variant="h5" sx={{fontWeight: 'bold', color: 'success.dark'}}>{selectedEstimate.amount}</Typography>
            </Box>
             <Box sx={{mb:1.5}}>
                <Typography variant="caption" color="text.secondary">Status:</Typography>
                <Box sx={{mt:0.5}}>{getStatusChip(selectedEstimate.status)}</Box>
            </Box>
            <Grid container spacing={1}>
                <Grid item xs={6}>
                    <Typography variant="caption" color="text.secondary">Created Date:</Typography>
                    <Typography variant="body1">{format(parseInputToDateObject(selectedEstimate.createdDate), 'PP')}</Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="caption" color="text.secondary">Due Date:</Typography>
                    <Typography variant="body1">{format(parseInputToDateObject(selectedEstimate.dueDate), 'PP')}</Typography>
                </Grid>
            </Grid>
          </DialogContent>
          <DialogActions sx={{ p: 2, backgroundColor: 'grey.50', borderTop: '1px solid', borderColor: 'divider' }}>
            <Button onClick={handleCloseEstimateDialog} variant="contained" sx={{borderRadius:2}}>Close</Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
    </LocalizationProvider>
  );
};

export default Estimates;