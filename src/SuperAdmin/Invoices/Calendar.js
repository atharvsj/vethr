import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Paper,
  Card,
  CardContent,
  IconButton,
  Grid,
  InputAdornment,
  CircularProgress,
  Tooltip,
} from '@mui/material';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { format } from 'date-fns';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';

// Icons
import {
    Event as EventIcon,
    AddBox as AddBoxIcon,
    Close as CloseIcon,
    PeopleAlt as PeopleAltIcon, // Customer
    AttachMoney as AttachMoneyIcon,
    ConfirmationNumber as ConfirmationNumberIcon, // Invoice Number
    ArrowBack as ArrowBackIcon,
    ReceiptLong as ReceiptLongIcon, // Invoice details icon
} from '@mui/icons-material';

// Set up localizer for react-big-calendar
const moment = require('moment');
const localizer = momentLocalizer(moment);

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

const CalendarPage = () => {
  const [invoices, setInvoices] = useState([]);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  const initialNewInvoiceState = { invoiceNumber: "", customer: "", amount: "", dueDate: null };
  const [newInvoice, setNewInvoice] = useState(initialNewInvoiceState);

  const [selectedEventForDialog, setSelectedEventForDialog] = useState(null);
  const [currentCalendarView, setCurrentCalendarView] = useState(Views.MONTH);
  const [currentCalendarDate, setCurrentCalendarDate] = useState(new Date());

  useEffect(() => {
    const fetchInvoices = () => {
      const data = [
        { id: 1, invoiceNumber: "INV-001", customer: "John Doe", amount: "$500", dueDate: new Date(2024, 10, 10) },
        { id: 2, invoiceNumber: "INV-002", customer: "Jane Smith", amount: "$700", dueDate: new Date(2024, 10, 12) },
        { id: 3, invoiceNumber: "INV-003", customer: "Acme Corp", amount: "$1200", dueDate: new Date(2024, 10, 13) },
        { id: 4, invoiceNumber: "INV-004", customer: "Tech Solutions", amount: "$350", dueDate: new Date(2024, 9, 28) },
      ];
      setInvoices(data);
    };
    fetchInvoices();
  }, []);

  const handleOpenCreateDialog = () => {
    setNewInvoice(initialNewInvoiceState);
    setOpenCreateDialog(true);
  };

  const handleCloseCreateDialog = () => {
    setOpenCreateDialog(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewInvoice({ ...newInvoice, [name]: value });
  };

  const handleDateChange = (date) => {
    setNewInvoice({ ...newInvoice, dueDate: date });
  };

  const handleSaveInvoice = async () => {
    if (!newInvoice.invoiceNumber || !newInvoice.customer || !newInvoice.amount || !newInvoice.dueDate) {
        alert("Please fill all required fields.");
        return;
    }
    setSubmitLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call

    const newInvoiceData = { ...newInvoice, id: invoices.length + 1 }; // dueDate is already a Date object
    setInvoices((prev) => [...prev, newInvoiceData]);
    setSubmitLoading(false);
    handleCloseCreateDialog();
  };

  const calendarEvents = invoices.map((invoice) => ({
    id: invoice.id,
    title: `${invoice.invoiceNumber} - ${invoice.customer}`,
    start: invoice.dueDate,
    end: invoice.dueDate,
    allDay: true,
    resource: invoice, // Store the full invoice object
  }));

  const handleSelectEvent = (event) => {
    setSelectedEventForDialog(event.resource);
    setCurrentCalendarView(Views.DAY);
    setCurrentCalendarDate(event.start);
  };

  const handleNavigate = (newDate, view) => {
    setCurrentCalendarDate(newDate);
    setCurrentCalendarView(view);
  };

  const handleViewChange = (newView) => {
    setCurrentCalendarView(newView);
  };

  const EventComponent = ({ event }) => (
    <Tooltip title={`Customer: ${event.resource.customer}, Amount: ${event.resource.amount}`} placement="top">
      <Box sx={{fontSize: '0.75em', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', p: '2px'}}>
        <strong>{event.resource.invoiceNumber}</strong>
        <Box sx={{fontSize: '0.9em'}}>{event.resource.customer}</Box>
      </Box>
    </Tooltip>
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
            <EventIcon sx={{ fontSize: '2rem', mr: 1, color: 'primary.main' }} />
            <Typography variant="h4" sx={{ fontWeight: 700, color: "text.primary" }}>
              Invoices Calendar
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary">
            Visualize invoice due dates and manage your billing schedule.
          </Typography>
        </CardContent>
      </Card>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2.5, flexWrap: 'wrap', gap: 1 }}>
        <Typography variant="h6" color="text.secondary">
            {format(currentCalendarDate, 'MMMM yyyy')} ({currentCalendarView.charAt(0).toUpperCase() + currentCalendarView.slice(1)})
        </Typography>
        <Button
            startIcon={<AddBoxIcon />}
            onClick={handleOpenCreateDialog}
            sx={{ ...gradientButtonStyle, py: 1.25, px: 3 }}
        >
            Create Invoice
        </Button>
      </Box>

      {currentCalendarView !== Views.MONTH && currentCalendarView !== Views.AGENDA && (
         <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => setCurrentCalendarView(Views.MONTH)}
            variant="outlined"
            color="primary"
            sx={{ mb: 2, borderRadius: 2 }}
        >
            Back to Month View
        </Button>
      )}

      <Paper sx={{ p: {xs:1, sm:2}, borderRadius: 2, boxShadow: "0 4px 20px rgba(0,0,0,0.08)", overflowX: 'auto' }}>
        <Calendar
          localizer={localizer}
          events={calendarEvents}
          startAccessor="start"
          endAccessor="end"
          style={{ minHeight: 600 }}
          onSelectEvent={handleSelectEvent}
          view={currentCalendarView}
          date={currentCalendarDate}
          onNavigate={handleNavigate}
          onView={handleViewChange}
          selectable
          popup
          components={{ event: EventComponent }}
          formats={{ eventTimeRangeFormat: () => '' }}
        />
      </Paper>

      {/* Dialog for Creating New Invoice */}
      <Dialog
        open={openCreateDialog}
        onClose={handleCloseCreateDialog}
        maxWidth="sm"
        fullWidth
        PaperProps={{ sx: { borderRadius: 3 } }}
      >
        <DialogTitle sx={{ ...gradientButtonStyle, color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1.5 }}>
          Create New Invoice
          <IconButton onClick={handleCloseCreateDialog} sx={{ color: 'rgba(255,255,255,0.8)', '&:hover': {color: 'white'} }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers sx={{ p: { xs: 2, sm: 3 }, backgroundColor: 'grey.50' }}>
          <Grid container spacing={2.5}>
            <Grid item xs={12} sm={6}>
              <TextField label="Invoice Number" name="invoiceNumber" value={newInvoice.invoiceNumber} onChange={handleInputChange} fullWidth required margin="dense" sx={{"& .MuiOutlinedInput-root": {borderRadius:2}}} InputProps={{startAdornment: <InputAdornment position="start"><ConfirmationNumberIcon fontSize="small" /></InputAdornment>}}/>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Customer" name="customer" value={newInvoice.customer} onChange={handleInputChange} fullWidth required margin="dense" sx={{"& .MuiOutlinedInput-root": {borderRadius:2}}} InputProps={{startAdornment: <InputAdornment position="start"><PeopleAltIcon fontSize="small" /></InputAdornment>}} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Amount" name="amount" value={newInvoice.amount} onChange={handleInputChange} fullWidth required margin="dense" sx={{"& .MuiOutlinedInput-root": {borderRadius:2}}} InputProps={{startAdornment: <InputAdornment position="start"><AttachMoneyIcon fontSize="small" /></InputAdornment>}} placeholder="$0.00" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <DatePicker
                label="Due Date *"
                value={newInvoice.dueDate}
                onChange={handleDateChange}
                renderInput={(params) => <TextField {...params} fullWidth required margin="dense" sx={{"& .MuiOutlinedInput-root": {borderRadius:2}}} InputProps={{...params.InputProps, startAdornment: <InputAdornment position="start"><EventIcon fontSize="small" /></InputAdornment>}} />}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 2, backgroundColor: 'grey.50', borderTop: '1px solid', borderColor: 'divider' }}>
          <Button onClick={handleCloseCreateDialog} color="inherit" sx={{borderRadius:2}} disabled={submitLoading}>Cancel</Button>
          <Button onClick={handleSaveInvoice} sx={{...gradientButtonStyle, minWidth: '120px', py: '10px', px: 3}} disabled={submitLoading}>
            {submitLoading ? <CircularProgress size={24} color="inherit" /> : "Save Invoice"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog for displaying Invoice details from Calendar Event Click */}
      <Dialog
        open={Boolean(selectedEventForDialog)}
        onClose={() => setSelectedEventForDialog(null)}
        maxWidth="xs"
        fullWidth
        PaperProps={{ sx: { borderRadius: 3 } }}
      >
        <DialogTitle sx={{ ...gradientButtonStyle, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1.5 }}>
          Invoice: {selectedEventForDialog?.invoiceNumber}
          <IconButton onClick={() => setSelectedEventForDialog(null)} sx={{ color: 'rgba(255,255,255,0.8)', '&:hover': {color: 'white'} }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers sx={{ p: {xs:2, sm:3}, backgroundColor: 'grey.50' }}>
          {selectedEventForDialog ? (
            <>
              <Box sx={{display: 'flex', alignItems: 'center', mb: 1.5}}>
                <ReceiptLongIcon sx={{mr:1, color: 'primary.main'}}/>
                <Typography variant="h6" sx={{fontWeight: 'medium'}}>
                    {selectedEventForDialog.invoiceNumber}
                </Typography>
              </Box>
              <Box sx={{mb:2}}>
                <Typography variant="caption" color="text.secondary">Customer:</Typography>
                <Typography variant="body1" sx={{fontWeight:500}}>{selectedEventForDialog.customer}</Typography>
              </Box>
              <Box sx={{mb:2}}>
                <Typography variant="caption" color="text.secondary">Amount:</Typography>
                <Typography variant="h6" sx={{fontWeight: 'bold', color: 'success.dark'}}>{selectedEventForDialog.amount}</Typography>
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary">Due Date:</Typography>
                <Typography variant="body1">{format(selectedEventForDialog.dueDate, 'PP')}</Typography>
              </Box>
            </>
          ) : (
            <Typography variant="body1">No invoice details to display.</Typography>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 2, backgroundColor: 'grey.50', borderTop: '1px solid', borderColor: 'divider' }}>
          <Button onClick={() => setSelectedEventForDialog(null)} variant="contained" sx={{borderRadius:2}}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
    </LocalizationProvider>
  );
};

export default CalendarPage;