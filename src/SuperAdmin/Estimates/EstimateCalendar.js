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
  Grid, // For dialog layout
  InputAdornment, // For icons in TextFields
  CircularProgress, // For loading state on save
  Tooltip,
} from '@mui/material';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { format, parseISO } from 'date-fns'; // parseISO for handling date strings from input
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers'; // For DatePicker in form

// Icons
import {
    Event as EventIcon, // Calendar title, Due Date
    AddBox as AddBoxIcon,
    Close as CloseIcon,
    PeopleAlt as PeopleAltIcon, // Client
    AttachMoney as AttachMoneyIcon, // Amount
    ConfirmationNumber as ConfirmationNumberIcon, // Estimate Number
    ArrowBack as ArrowBackIcon, // Back button
    ReceiptLong as ReceiptLongIcon, // Estimate details icon
} from '@mui/icons-material';


// Set up localizer for react-big-calendar
const moment = require('moment'); // Ensure moment is imported
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

// Helper to format Date object to yyyy-MM-dd string for date inputs
const formatDateObjectToInput = (dateObj) => {
  if (!dateObj || !(dateObj instanceof Date) || isNaN(dateObj)) return '';
  return format(dateObj, 'yyyy-MM-dd');
};


const EstimateCalendar = () => {
  const [estimates, setEstimates] = useState([]);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  const initialNewEstimateState = { estimateNumber: '', client: '', amount: '', dueDate: null }; // dueDate as null for DatePicker
  const [newEstimate, setNewEstimate] = useState(initialNewEstimateState);

  const [selectedEventForDialog, setSelectedEventForDialog] = useState(null); // For event details dialog
  const [currentCalendarView, setCurrentCalendarView] = useState(Views.MONTH);
  const [currentCalendarDate, setCurrentCalendarDate] = useState(new Date()); // To control calendar's displayed date

  useEffect(() => {
    const fetchEstimates = () => {
      // Sample data for estimates
      const data = [
        { id: 1, estimateNumber: 'EST-001', client: 'John Doe', amount: '$5000', dueDate: new Date(2024, 10, 10) }, // Month is 0-indexed
        { id: 2, estimateNumber: 'EST-002', client: 'Jane Smith', amount: '$7000', dueDate: new Date(2024, 10, 12) },
        { id: 3, estimateNumber: 'EST-003', client: 'Acme Corp', amount: '$12000', dueDate: new Date(2024, 10, 13) },
        { id: 4, estimateNumber: 'EST-004', client: 'Tech Solutions', amount: '$3500', dueDate: new Date(2024, 9, 25) },
      ];
      setEstimates(data);
    };
    fetchEstimates();
  }, []);

  const handleOpenCreateDialog = () => {
    setNewEstimate(initialNewEstimateState);
    setOpenCreateDialog(true);
  };

  const handleCloseCreateDialog = () => {
    setOpenCreateDialog(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEstimate({ ...newEstimate, [name]: value });
  };

  const handleDateChange = (date) => {
    setNewEstimate({ ...newEstimate, dueDate: date });
  };

  const handleSaveEstimate = async () => {
    if (!newEstimate.estimateNumber || !newEstimate.client || !newEstimate.amount || !newEstimate.dueDate) {
        alert("Please fill all required fields.");
        return;
    }
    setSubmitLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call

    const newEstimateData = {
        ...newEstimate,
        id: estimates.length + 1,
        // dueDate is already a Date object from DatePicker
    };
    setEstimates((prev) => [...prev, newEstimateData]);
    setSubmitLoading(false);
    handleCloseCreateDialog();
  };

  const calendarEvents = estimates.map((estimate) => ({
    id: estimate.id, // Important for unique keys if needed
    title: `${estimate.estimateNumber} - ${estimate.client}`,
    start: estimate.dueDate,
    end: estimate.dueDate, // For single-day events, start and end are the same
    allDay: true, // Assuming estimates are for the whole day
    resource: estimate, // Store the full estimate object for easy access
  }));

  const handleSelectEvent = (event) => {
    setSelectedEventForDialog(event.resource); // event.resource contains the original estimate object
    // Optionally, navigate to the day view of the selected event
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

  // Custom Event component to enhance display (optional)
  const EventComponent = ({ event }) => (
    <Tooltip title={`Client: ${event.resource.client}, Amount: ${event.resource.amount}`} placement="top">
      <Box sx={{fontSize: '0.75em', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>
        <strong>{event.resource.estimateNumber}</strong>
        <br/>
        {event.resource.client}
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
              Estimates Calendar
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary">
            Visualize and manage your estimate due dates.
          </Typography>
        </CardContent>
      </Card>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2.5 }}>
        <Typography variant="h6" color="text.secondary">
            Current View: {format(currentCalendarDate, 'MMMM yyyy')} ({currentCalendarView.charAt(0).toUpperCase() + currentCalendarView.slice(1)})
        </Typography>
        <Button
            startIcon={<AddBoxIcon />}
            onClick={handleOpenCreateDialog}
            sx={{ ...gradientButtonStyle, py: 1.25, px: 3 }}
        >
            Create Estimate
        </Button>
      </Box>

      {currentCalendarView !== Views.MONTH && currentCalendarView !== Views.AGENDA && (
         <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => {
                setCurrentCalendarView(Views.MONTH);
                // Optionally reset date to current month's start if needed, or keep currentCalendarDate
            }}
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
          style={{ minHeight: 600 }} // Ensure a good height
          onSelectEvent={handleSelectEvent}
          view={currentCalendarView}
          date={currentCalendarDate} // Control the displayed date
          onNavigate={handleNavigate}
          onView={handleViewChange}
          selectable // Allows clicking on date slots to potentially create events (not implemented here)
          popup // Uses default popup for overflowing events on month view
          components={{
            event: EventComponent, // Custom event rendering
          }}
          formats={{
             eventTimeRangeFormat: () => '', // Hide time for all-day events
          }}
        />
      </Paper>

      {/* Dialog for Creating New Estimate */}
      <Dialog
        open={openCreateDialog}
        onClose={handleCloseCreateDialog}
        maxWidth="sm"
        fullWidth
        PaperProps={{ sx: { borderRadius: 3 } }}
      >
        <DialogTitle sx={{ ...gradientButtonStyle, color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1.5 }}>
          Create New Estimate
          <IconButton onClick={handleCloseCreateDialog} sx={{ color: 'rgba(255,255,255,0.8)', '&:hover': {color: 'white'} }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers sx={{ p: { xs: 2, sm: 3 }, backgroundColor: 'grey.50' }}>
          <Grid container spacing={2.5}>
            <Grid item xs={12} sm={6}>
              <TextField label="Estimate Number" name="estimateNumber" value={newEstimate.estimateNumber} onChange={handleInputChange} fullWidth required margin="dense" sx={{"& .MuiOutlinedInput-root": {borderRadius:2}}} InputProps={{startAdornment: <InputAdornment position="start"><ConfirmationNumberIcon fontSize="small" /></InputAdornment>}}/>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Client" name="client" value={newEstimate.client} onChange={handleInputChange} fullWidth required margin="dense" sx={{"& .MuiOutlinedInput-root": {borderRadius:2}}} InputProps={{startAdornment: <InputAdornment position="start"><PeopleAltIcon fontSize="small" /></InputAdornment>}} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Amount" name="amount" value={newEstimate.amount} onChange={handleInputChange} fullWidth required margin="dense" sx={{"& .MuiOutlinedInput-root": {borderRadius:2}}} InputProps={{startAdornment: <InputAdornment position="start"><AttachMoneyIcon fontSize="small" /></InputAdornment>}} placeholder="$0.00" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <DatePicker
                label="Due Date *"
                value={newEstimate.dueDate}
                onChange={handleDateChange}
                renderInput={(params) => <TextField {...params} fullWidth required margin="dense" sx={{"& .MuiOutlinedInput-root": {borderRadius:2}}} InputProps={{...params.InputProps, startAdornment: <InputAdornment position="start"><EventIcon fontSize="small" /></InputAdornment>}} />}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 2, backgroundColor: 'grey.50', borderTop: '1px solid', borderColor: 'divider' }}>
          <Button onClick={handleCloseCreateDialog} color="inherit" sx={{borderRadius:2}} disabled={submitLoading}>Cancel</Button>
          <Button onClick={handleSaveEstimate} sx={{...gradientButtonStyle, minWidth: '120px', py: '10px', px: 3}} disabled={submitLoading}>
            {submitLoading ? <CircularProgress size={24} color="inherit" /> : "Save Estimate"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog for displaying Estimate details from Calendar Event Click */}
      <Dialog
        open={Boolean(selectedEventForDialog)}
        onClose={() => setSelectedEventForDialog(null)}
        maxWidth="xs"
        fullWidth
        PaperProps={{ sx: { borderRadius: 3 } }}
      >
        <DialogTitle sx={{ ...gradientButtonStyle, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1.5 }}>
          Estimate: {selectedEventForDialog?.estimateNumber}
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
                    {selectedEventForDialog.estimateNumber}
                </Typography>
              </Box>
              <Box sx={{mb:2}}>
                <Typography variant="caption" color="text.secondary">Client:</Typography>
                <Typography variant="body1" sx={{fontWeight:500}}>{selectedEventForDialog.client}</Typography>
              </Box>
              <Box sx={{mb:2}}>
                <Typography variant="caption" color="text.secondary">Amount:</Typography>
                <Typography variant="h6" sx={{fontWeight: 'bold', color: 'success.dark'}}>{selectedEventForDialog.amount}</Typography>
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary">Due Date:</Typography>
                <Typography variant="body1">{format(selectedEventForDialog.dueDate, 'PP')}</Typography> {/* PP for long date format */}
              </Box>
            </>
          ) : (
            <Typography variant="body1">No estimate details to display.</Typography>
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

export default EstimateCalendar;