


// // // // // import React, { useState, useEffect } from 'react';
// // // // // import {
// // // // //   Box,
// // // // //   Typography,
// // // // //   Paper,
// // // // //   TextField,
// // // // //   Button,
// // // // //   Table,
// // // // //   TableBody,
// // // // //   TableCell,
// // // // //   TableContainer,
// // // // //   TableHead,
// // // // //   TableRow,
// // // // //   Select,
// // // // //   MenuItem,
// // // // //   FormControl,
// // // // //   InputLabel,
// // // // //   IconButton,
// // // // //   Grid,
// // // // //   Dialog,
// // // // //   DialogTitle,
// // // // //   DialogContent,
// // // // //   DialogActions,
// // // // //   Card,
// // // // //   CardContent,
// // // // //   InputAdornment,
// // // // //   Tooltip,
// // // // //   Chip,
// // // // //   Avatar,
// // // // //   Checkbox,
// // // // //   FormControlLabel,
// // // // //   TablePagination,
// // // // //   Skeleton, // Added for skeleton loading
// // // // //   CircularProgress, // Added for button loading state
// // // // // } from '@mui/material';
// // // // // import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// // // // // import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
// // // // // import {
// // // // //   Add as AddIcon,
// // // // //   Search as SearchIcon,
// // // // //   Close as CloseIcon,
// // // // //   Event as EventIcon,
// // // // //   PeopleAlt as PeopleAltIcon,
// // // // //   DateRange as DateRangeIcon,
// // // // //   Notes as NotesIcon,
// // // // //   Attachment as AttachmentIcon,
// // // // //   CheckCircleOutline as ApproveIcon,
// // // // //   HighlightOff as RejectIcon,
// // // // //   HourglassEmpty as PendingIcon,
// // // // //   ListAlt as ListAltIcon,
// // // // //   WorkOff as CompOffIcon,
// // // // //   Info as InfoIcon,
// // // // //   Refresh as RefreshIcon, // Added for refresh button
// // // // // } from '@mui/icons-material';
// // // // // import { format, parse, isValid } from 'date-fns';

// // // // // // Helper to format Date object to dd/MM/yyyy string
// // // // // const formatDateObjectToDDMMYYYY = (dateObj) => {
// // // // //   if (!dateObj || !isValid(dateObj)) return '';
// // // // //   return format(dateObj, 'dd/MM/yyyy');
// // // // // };

// // // // // // Helper to parse dd/MM/yyyy string to Date object
// // // // // const parseDDMMYYYYToDateObject = (dateString) => {
// // // // //   if (!dateString) return null;
// // // // //   const parsedDate = parse(dateString, 'dd/MM/yyyy', new Date());
// // // // //   return isValid(parsedDate) ? parsedDate : null;
// // // // // };

// // // // // // Skeleton component for table rows
// // // // // const TableRowSkeleton = ({ columns = 7 }) => (
// // // // //   <TableRow>
// // // // //     <TableCell>
// // // // //       <Box sx={{ display: 'flex', alignItems: 'center' }}>
// // // // //         <Skeleton variant="circular" width={36} height={36} sx={{ mr: 1.5 }} />
// // // // //         <Box>
// // // // //           <Skeleton variant="text" width={100} />
// // // // //           <Skeleton variant="text" width={150} />
// // // // //         </Box>
// // // // //       </Box>
// // // // //     </TableCell>
// // // // //     {Array.from(new Array(columns - 1)).map((_, index) => (
// // // // //       <TableCell key={index}>
// // // // //         <Skeleton variant="text" width={index === columns - 2 ? 80 : 120} /> {/* Shorter for status/actions */}
// // // // //       </TableCell>
// // // // //     ))}
// // // // //   </TableRow>
// // // // // );


// // // // // // Gradient button style
// // // // // const gradientButtonStyle = {
// // // // //   background: 'linear-gradient(135deg, rgba(36, 73, 239, 0.89) 0%, rgb(218, 18, 202) 100%)',
// // // // //   color: 'white',
// // // // //   borderRadius: 2,
// // // // //   padding: '10px 24px',
// // // // //   fontWeight: 600,
// // // // //   boxShadow: '0 4px 10px rgba(36, 73, 239, 0.3)',
// // // // //   transition: 'all 0.3s ease',
// // // // //   '&:hover': {
// // // // //     background: 'linear-gradient(135deg, rgba(36, 73, 239, 1) 0%, rgb(218, 18, 202, 1) 100%)',
// // // // //     boxShadow: '0 6px 15px rgba(36, 73, 239, 0.4)',
// // // // //     transform: 'translateY(-2px)',
// // // // //   },
// // // // //   '&.Mui-disabled': {
// // // // //     background: 'rgba(0, 0, 0, 0.12)', // Ensure disabled state has a proper background
// // // // //     color: 'rgba(0, 0, 0, 0.26)',
// // // // //     boxShadow: 'none',
// // // // //   }
// // // // // };

// // // // // function LeaveManagement() {
// // // // //   const [leaveRecords, setLeaveRecords] = useState([
// // // // //     { id: 1, employee: 'Achyut Panchal', email: 'achyut.panchal@tdt.world', leaveType: 'Casual Leave (CL)', startDate: '07/02/2025', endDate: '07/02/2025', appliedOn: '06/02/2025', days: 1, status: 'Approved', remarks: 'test', attachment: null, leaveReason: 'Personal work' },
// // // // //     { id: 2, employee: 'Aishwarya K Patil', email: 'aishwarya.patil@tdt.world', leaveType: 'Casual Leave (CL)', startDate: '08/01/2025', endDate: '08/01/2025', appliedOn: '08/01/2025', days: 1, status: 'Approved', remarks: '', attachment: null, leaveReason: 'Vacation' },
// // // // //     { id: 3, employee: 'Aishwarya K Patil', email: 'aishwarya.patil@tdt.world', leaveType: 'Leave without pay (LWP)', startDate: '29/01/2025', endDate: '29/01/2025', appliedOn: '29/01/2025', days: 1, status: 'Approved', remarks: '', attachment: null, leaveReason: 'Urgent matter' },
// // // // //     { id: 4, employee: 'Aishwarya K Patil', email: 'aishwarya.patil@tdt.world', leaveType: 'Leave without pay (LWP)', startDate: '07/02/2025', endDate: '10/02/2025', appliedOn: '07/02/2025', days: 4, status: 'Approved', remarks: '', attachment: null, leaveReason: 'Family event' },
// // // // //     { id: 5, employee: 'Aishwarya K Patil', email: 'aishwarya.patil@tdt.world', leaveType: 'Leave without pay (LWP)', startDate: '11/02/2025', endDate: '12/02/2025', appliedOn: '11/02/2025', days: 2, status: 'Approved', remarks: '', attachment: null, leaveReason: 'Appointment' },
// // // // //     { id: 6, employee: 'Aishwarya K Patil', email: 'aishwarya.patil@tdt.world', leaveType: 'Casual Leave (CL)', startDate: '07/03/2025', endDate: '07/03/2025', appliedOn: '07/03/2025', days: 1, status: 'Pending', remarks: '', attachment: null, leaveReason: 'Short break' },
// // // // //     { id: 7, employee: 'Aman Mulla', email: 'aman.mulla@tdt.world', leaveType: 'Casual Leave (CL)', startDate: '17/01/2025', endDate: '17/01/2025', appliedOn: '16/01/2025', days: 'Half Day', status: 'Approved', remarks: '', attachment: null, leaveReason: 'Quick errand' }
// // // // //   ]);

// // // // //   const [compOffRecords, setCompOffRecords] = useState([]);
// // // // //   const [leaveStats, setLeaveStats] = useState({ taken: 0, pending: 0, approved: 0, rejected: 0 });

// // // // //   const [showLeaveDetails, setShowLeaveDetails] = useState(false);
// // // // //   const [showAddLeave, setShowAddLeave] = useState(false);
// // // // //   const [showAddCompOff, setShowAddCompOff] = useState(false);
// // // // //   const [selectedLeave, setSelectedLeave] = useState(null);

// // // // //   const initialNewLeaveState = {
// // // // //     employee: '', leaveType: '', startDate: null, endDate: null,
// // // // //     isHalfDay: false, remarks: '', leaveReason: '', attachment: null
// // // // //   };
// // // // //   const [newLeave, setNewLeave] = useState(initialNewLeaveState);

// // // // //   const initialNewCompOffState = { employee: '', startDate: null, endDate: null, reason: '' };
// // // // //   const [newCompOff, setNewCompOff] = useState(initialNewCompOffState);

// // // // //   const [searchTerm, setSearchTerm] = useState('');
// // // // //   const [activeTab, setActiveTab] = useState('all');
// // // // //   const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString());

// // // // //   const [page, setPage] = useState(0);
// // // // //   const [rowsPerPage, setRowsPerPage] = useState(10);
// // // // //   const [loading, setLoading] = useState(true); // For table skeleton
// // // // //   const [submitLoading, setSubmitLoading] = useState(false); // For dialog submit buttons

// // // // //   const [refreshKey, setRefreshKey] = useState(0);


// // // // //   const employeeOptions = ['Amit Andre', 'Achyut Panchal', 'Aishwarya K Patil', 'Aman Mulla'];
// // // // //   const leaveTypeOptions = ['Casual Leave (CL)', 'Leave without pay (LWP)', 'Sick Leave (SL)'];

// // // // //   useEffect(() => {
// // // // //     setLoading(true);
// // // // //     // Simulate API call or data processing
// // // // //     setTimeout(() => {
// // // // //       const currentRecs = activeTab === 'all' ? leaveRecords : compOffRecords;
// // // // //       const approved = currentRecs.filter(r => r.status === 'Approved').length;
// // // // //       const pending = currentRecs.filter(r => r.status === 'Pending').length;
// // // // //       const rejected = currentRecs.filter(r => r.status === 'Rejected').length;
// // // // //       const taken = approved + pending; // Or your definition of taken

// // // // //       setLeaveStats({ taken, pending, approved, rejected });
// // // // //       setLoading(false);
// // // // //     }, 1000); // Simulate loading time
// // // // //   }, [leaveRecords, compOffRecords, activeTab, refreshKey]);


// // // // //   const handleRefresh = () => {
// // // // //     setRefreshKey(prevKey => prevKey + 1);
// // // // //   };

// // // // //   const handleViewDetails = (leave) => {
// // // // //     setSelectedLeave(leave);
// // // // //     setShowLeaveDetails(true);
// // // // //   };

// // // // //   const handleStatusChange = (status) => {
// // // // //     if (selectedLeave) {
// // // // //       const updateInLeaves = (records) => records.map(record =>
// // // // //         record.id === selectedLeave.id ? { ...record, status } : record
// // // // //       );
// // // // //       if (activeTab === 'all' || leaveRecords.find(lr => lr.id === selectedLeave.id)) {
// // // // //         setLeaveRecords(updateInLeaves(leaveRecords));
// // // // //       } else if (activeTab === 'compoff' || compOffRecords.find(cr => cr.id === selectedLeave.id)) {
// // // // //         setCompOffRecords(updateInLeaves(compOffRecords));
// // // // //       }
// // // // //       setSelectedLeave({ ...selectedLeave, status });
// // // // //       // setShowLeaveDetails(false); // Optionally close dialog
// // // // //     }
// // // // //   };

// // // // //   const handleLeaveInputChange = (e) => {
// // // // //     const { name, value, type, checked } = e.target;
// // // // //     setNewLeave(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
// // // // //   };

// // // // //   const handleDateChange = (name, date, formSetter) => {
// // // // //     formSetter(prev => ({ ...prev, [name]: date }));
// // // // //   };

// // // // //   const handleCompOffInputChange = (e) => {
// // // // //     const { name, value } = e.target;
// // // // //     setNewCompOff(prev => ({ ...prev, [name]: value }));
// // // // //   };

// // // // //   const handleFileUpload = (e) => {
// // // // //     const file = e.target.files[0];
// // // // //     if (file) setNewLeave(prev => ({ ...prev, attachment: file }));
// // // // //   };

// // // // //   const calculateDays = (startStr, endStr) => {
// // // // //     if (!startStr || !endStr) return 0;
// // // // //     const startDate = parseDDMMYYYYToDateObject(startStr);
// // // // //     const endDate = parseDDMMYYYYToDateObject(endStr);
// // // // //     if (!startDate || !endDate || !isValid(startDate) || !isValid(endDate) || endDate < startDate) return 0;
// // // // //     const timeDiff = endDate.getTime() - startDate.getTime();
// // // // //     return Math.floor(timeDiff / (1000 * 60 * 60 * 24)) + 1;
// // // // //   };

// // // // //   const handleSubmitLeave = async () => {
// // // // //     if (!newLeave.employee || !newLeave.leaveType || !newLeave.startDate || !newLeave.endDate || !newLeave.leaveReason) {
// // // // //       alert('Please fill all required fields'); return;
// // // // //     }
// // // // //     const formattedStartDate = formatDateObjectToDDMMYYYY(newLeave.startDate);
// // // // //     const formattedEndDate = formatDateObjectToDDMMYYYY(newLeave.endDate);
// // // // //     if (parseDDMMYYYYToDateObject(formattedEndDate) < parseDDMMYYYYToDateObject(formattedStartDate)) {
// // // // //       alert('End date cannot be before start date.'); return;
// // // // //     }
// // // // //     setSubmitLoading(true);
// // // // //     await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call

// // // // //     const days = newLeave.isHalfDay ? 'Half Day' : calculateDays(formattedStartDate, formattedEndDate);
// // // // //     const newLeaveRecord = {
// // // // //       id: Date.now(), // More robust ID
// // // // //       employee: newLeave.employee,
// // // // //       email: `${newLeave.employee.toLowerCase().replace(/\s+/g, '.')}@tdt.world`,
// // // // //       leaveType: newLeave.leaveType,
// // // // //       startDate: formattedStartDate, endDate: formattedEndDate,
// // // // //       appliedOn: formatDateObjectToDDMMYYYY(new Date()),
// // // // //       days, status: 'Pending', remarks: newLeave.remarks,
// // // // //       leaveReason: newLeave.leaveReason, attachment: newLeave.attachment
// // // // //     };
// // // // //     setLeaveRecords(prev => [...prev, newLeaveRecord]);
// // // // //     setShowAddLeave(false);
// // // // //     setNewLeave(initialNewLeaveState);
// // // // //     setSubmitLoading(false);
// // // // //   };

// // // // //   const handleSubmitCompOff = async () => {
// // // // //     if (!newCompOff.employee || !newCompOff.startDate || !newCompOff.endDate || !newCompOff.reason) {
// // // // //       alert('Please fill all required fields'); return;
// // // // //     }
// // // // //     const formattedStartDate = formatDateObjectToDDMMYYYY(newCompOff.startDate);
// // // // //     const formattedEndDate = formatDateObjectToDDMMYYYY(newCompOff.endDate);
// // // // //     if (parseDDMMYYYYToDateObject(formattedEndDate) < parseDDMMYYYYToDateObject(formattedStartDate)) {
// // // // //       alert('End date cannot be before start date.'); return;
// // // // //     }
// // // // //     setSubmitLoading(true);
// // // // //     await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call

// // // // //     const days = calculateDays(formattedStartDate, formattedEndDate);
// // // // //     const newCompOffRecord = {
// // // // //       id: Date.now(), // More robust ID
// // // // //       employee: newCompOff.employee,
// // // // //       email: `${newCompOff.employee.toLowerCase().replace(/\s+/g, '.')}@tdt.world`,
// // // // //       startDate: formattedStartDate, endDate: formattedEndDate,
// // // // //       appliedOn: formatDateObjectToDDMMYYYY(new Date()),
// // // // //       days, reason: newCompOff.reason, status: 'Pending'
// // // // //     };
// // // // //     setCompOffRecords(prev => [...prev, newCompOffRecord]);
// // // // //     setShowAddCompOff(false);
// // // // //     setNewCompOff(initialNewCompOffState);
// // // // //     setSubmitLoading(false);
// // // // //   };

// // // // //   const currentRecords = activeTab === 'all' ? leaveRecords : compOffRecords;
// // // // //   const filteredRecords = currentRecords.filter(record => {
// // // // //     const yearOfRecord = record.startDate ? record.startDate.split('/')[2] : '';
// // // // //     const matchesYear = selectedYear ? yearOfRecord === selectedYear : true;
// // // // //     if (!matchesYear) return false;
// // // // //     const searchTermLower = searchTerm.toLowerCase();
// // // // //     return (
// // // // //       record.employee.toLowerCase().includes(searchTermLower) ||
// // // // //       (activeTab === 'all' && record.leaveType.toLowerCase().includes(searchTermLower)) ||
// // // // //       (activeTab === 'compoff' && record.reason.toLowerCase().includes(searchTermLower)) ||
// // // // //       record.status.toLowerCase().includes(searchTermLower)
// // // // //     );
// // // // //   });

// // // // //   const handleChangePage = (event, newPage) => setPage(newPage);
// // // // //   const handleChangeRowsPerPage = (event) => {
// // // // //     setRowsPerPage(parseInt(event.target.value, 10));
// // // // //     setPage(0);
// // // // //   };

// // // // //   const getInitials = (name) => {
// // // // //     if (!name) return '';
// // // // //     return name.split(" ").map((n) => n[0]).join("").toUpperCase();
// // // // //   };

// // // // //   const getStatusChip = (status) => {
// // // // //     let color = 'default'; let icon = <InfoIcon />;
// // // // //     if (status === 'Approved') { color = 'success'; icon = <ApproveIcon />; }
// // // // //     else if (status === 'Pending') { color = 'warning'; icon = <PendingIcon />; }
// // // // //     else if (status === 'Rejected') { color = 'error'; icon = <RejectIcon />; }
// // // // //     return <Chip icon={icon} label={status} color={color} size="small" sx={{ fontWeight: 'medium' }} />;
// // // // //   };

// // // // //      const StatCard = ({ title, value, value2, icon, color = "primary.main", gradientOnHover }) => (
// // // // //     <Grid item xs={12} sm={6} md={3}>
// // // // //       <Card sx={{
// // // // //         display: 'flex', alignItems: 'center', p: 2, borderRadius: 2,
// // // // //         boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
// // // // //         transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out, background 0.3s ease-in-out, color 0.3s ease-in-out', // Added background and color to transition
// // // // //         background: 'white', // Default background
// // // // //         color: 'text.primary', // Default text color
// // // // //         '&:hover': {
// // // // //           transform: 'scale(1.03)',
// // // // //           boxShadow: "0 8px 25px rgba(0,0,0,0.15)", // Slightly more pronounced shadow
// // // // //           ...(gradientOnHover && { // Conditionally apply gradient and text color change
// // // // //             background: gradientOnHover,
// // // // //             color: 'white',
// // // // //             '& .MuiTypography-colorTextSecondary': { // Target secondary text specifically
// // // // //               color: 'rgba(255, 255, 255, 0.85)',
// // // // //             },
// // // // //           }),
// // // // //         }
// // // // //       }}>
// // // // //         <Avatar sx={{
// // // // //             bgcolor: 'rgba(255,255,255,0.2)', // Avatar background on hover (can be adjusted)
// // // // //             color: 'white', // Avatar icon color on hover
// // // // //             transition: 'background-color 0.3s ease-in-out, color 0.3s ease-in-out',
// // // // //             ...(gradientOnHover ? { // Styles for avatar when card has gradient
// // // // //                 '&': { // Use '&' to ensure specificity for hover state of card
// // // // //                     bgcolor: 'rgba(255,255,255,0.2)',
// // // // //                     color: 'white',
// // // // //                 }
// // // // //             } : { // Default avatar styles
// // // // //                 bgcolor: color,
// // // // //                 color: 'white',
// // // // //             }),
// // // // //         }}>
// // // // //             {icon}
// // // // //         </Avatar>
// // // // //         <Box ml={1.5}> {/* Added some margin for avatar */}
// // // // //           <Typography
// // // // //             variant="body2"
// // // // //             className="MuiTypography-colorTextSecondary" // Add class for specific targeting
// // // // //             sx={{
// // // // //               textTransform: 'uppercase', fontSize: '0.75rem', fontWeight: 'medium',
// // // // //               color: 'text.secondary', // Default secondary text color
// // // // //               transition: 'color 0.3s ease-in-out',
// // // // //             }}
// // // // //           >
// // // // //             {title}
// // // // //           </Typography>
// // // // //           <Typography variant="h5" component="p" sx={{ fontWeight: 'bold', transition: 'color 0.3s ease-in-out' }}>
// // // // //             {value} {value2 &&
// // // // //               <Typography
// // // // //                 component="span"
// // // // //                 variant="h5"
// // // // //                 className="MuiTypography-colorTextSecondary" // Add class here too
// // // // //                 sx={{ color: 'text.secondary', transition: 'color 0.3s ease-in-out' }}
// // // // //               >
// // // // //                 | {value2}
// // // // //               </Typography>}
// // // // //           </Typography>
// // // // //         </Box>
// // // // //       </Card>
// // // // //     </Grid>
// // // // //   );


// // // // //   return (
// // // // //     <LocalizationProvider dateAdapter={AdapterDateFns}>
// // // // //       <Box sx={{ p: { xs: 2, sm: 3 } }}>
// // // // //         <Card
// // // // //           elevation={0}
// // // // //           sx={{
// // // // //             mb: 3, borderRadius: 2,
// // // // //             background: "linear-gradient(135deg, rgba(36, 73, 239, 0.03) 0%, rgba(218, 18, 202, 0.03) 100%)",
// // // // //             borderLeft: "5px solid",
// // // // //             borderImage: "linear-gradient(135deg, rgba(36, 73, 239, 0.89) 0%, rgb(218, 18, 202) 100%) 1",
// // // // //           }}
// // // // //         >
// // // // //           <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
// // // // //             <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, color: "text.primary" }}>
// // // // //               Leave Management
// // // // //             </Typography>
// // // // //             <Typography variant="body2" color="text.secondary">
// // // // //               Track and manage employee leave requests and comp-off applications.
// // // // //             </Typography>
// // // // //           </CardContent>
// // // // //         </Card>

// // // // //         <Grid container spacing={2.5} sx={{ mb: 3 }}>
// // // // //           <StatCard title="TAKEN | PENDING" value={leaveStats.taken} value2={leaveStats.pending} icon={<ListAltIcon />} color="info.main" />
// // // // //           <StatCard title="APPROVED" value={leaveStats.approved} icon={<ApproveIcon />} color="success.main" />
// // // // //           <StatCard title="REJECTED" value={leaveStats.rejected} icon={<RejectIcon />} color="error.main" />
// // // // //           <Grid item xs={12} md={3} sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 1.5, alignItems: 'center', justifyContent: { xs: 'stretch', md: 'flex-end' } }}>
// // // // //             <Button startIcon={<AddIcon />} onClick={() => setShowAddLeave(true)} sx={{ ...gradientButtonStyle, width: { xs: '100%', sm: 'auto' } }}>
// // // // //               Add Leave
// // // // //             </Button>
// // // // //             <Button variant="outlined" color="secondary" startIcon={<CompOffIcon />} onClick={() => setShowAddCompOff(true)} sx={{ width: { xs: '100%', sm: 'auto' }, borderRadius: 2, py: '9px', px: '23px' }}>
// // // // //               Add Comp-off
// // // // //             </Button>
// // // // //           </Grid>
// // // // //         </Grid>

// // // // //         <Paper sx={{ p: 2.5, mb: 3, borderRadius: 2, boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
// // // // //           <Grid container spacing={2} alignItems="center">
// // // // //             <Grid item xs={12} sm={6} md={3}>
// // // // //               <FormControl fullWidth variant="outlined">
// // // // //                 <InputLabel>Year</InputLabel>
// // // // //                 <Select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)} label="Year" sx={{ borderRadius: 2 }}>
// // // // //                   {['2022', '2023', '2024', '2025'].map(y => <MenuItem key={y} value={y}>{y}</MenuItem>)}
// // // // //                 </Select>
// // // // //               </FormControl>
// // // // //             </Grid>
// // // // //             <Grid item xs={12} sm={6} md={4} sx={{ display: 'flex', justifyContent: { xs: 'center', sm: 'flex-start' }, gap: 1 }}>
// // // // //               <Button variant={activeTab === 'all' ? 'contained' : 'outlined'} onClick={() => { setActiveTab('all'); setPage(0); }} sx={{ borderRadius: 2, py: 1.2, px: 2 }}>All Leaves</Button>
// // // // //               <Button variant={activeTab === 'compoff' ? 'contained' : 'outlined'} color="secondary" onClick={() => { setActiveTab('compoff'); setPage(0); }} sx={{ borderRadius: 2, py: 1.2, px: 2 }}>Comp-off</Button>
// // // // //             </Grid>
// // // // //             <Grid item xs={12} md={5} sx={{ display: 'flex', alignItems: 'center', gap: 1}}>
// // // // //               <TextField
// // // // //                 fullWidth
// // // // //                 variant="outlined"
// // // // //                 placeholder="Search records..."
// // // // //                 value={searchTerm}
// // // // //                 onChange={(e) => setSearchTerm(e.target.value)}
// // // // //                 InputProps={{
// // // // //                   startAdornment: (<InputAdornment position="start"><SearchIcon color="action" /></InputAdornment>),
// // // // //                 }}
// // // // //                 sx={{
// // // // //                   flexGrow: 1,
// // // // //                   '& .MuiOutlinedInput-root': {
// // // // //                     borderRadius: 2,
// // // // //                     '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'primary.light' },
// // // // //                     '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'primary.main', borderWidth: '1px' },
// // // // //                   },
// // // // //                 }}
// // // // //               />
// // // // //               <Tooltip title="Refresh Data">
// // // // //                   <IconButton onClick={handleRefresh} color="primary" sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
// // // // //                       <RefreshIcon />
// // // // //                   </IconButton>
// // // // //               </Tooltip>
// // // // //             </Grid>
// // // // //           </Grid>
// // // // //         </Paper>

// // // // //         <Paper sx={{ width: '100%', overflow: 'hidden', borderRadius: 2, boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}>
// // // // //           <TableContainer sx={{ maxHeight: 'calc(100vh - 450px)' }}> {/* Adjusted maxHeight slightly */}
// // // // //             <Table stickyHeader aria-label="leave records table">
// // // // //               <TableHead>
// // // // //                 <TableRow sx={{ "& th": { backgroundColor: "#f5f5f7", borderBottom: "2px solid rgba(36, 73, 239, 0.1)", fontWeight: "bold", color: "#333", py: 1.5 } }}>
// // // // //                   <TableCell>EMPLOYEE</TableCell>
// // // // //                   <TableCell>{activeTab === 'all' ? 'LEAVE TYPE' : 'REASON'}</TableCell>
// // // // //                   <TableCell>LEAVE DURATION</TableCell>
// // // // //                   <TableCell>DAYS</TableCell>
// // // // //                   <TableCell>APPLIED ON</TableCell>
// // // // //                   <TableCell>STATUS</TableCell>
// // // // //                   <TableCell align="center">ACTIONS</TableCell>
// // // // //                 </TableRow>
// // // // //               </TableHead>
// // // // //               <TableBody>
// // // // //                 {loading ? (
// // // // //                   Array.from(new Array(rowsPerPage)).map((_, index) => (
// // // // //                     <TableRowSkeleton key={index} />
// // // // //                   ))
// // // // //                 ) : filteredRecords.length === 0 ? (
// // // // //                   <TableRow>
// // // // //                     <TableCell colSpan={7} align="center" sx={{ py: 5 }}>
// // // // //                       <ListAltIcon sx={{ fontSize: 48, color: 'text.disabled', mb: 1 }}/>
// // // // //                       <Typography variant="subtitle1" color="text.secondary">No records found.</Typography>
// // // // //                       {searchTerm && <Typography variant="body2" color="text.hint">Try adjusting your search or filters.</Typography>}
// // // // //                     </TableCell>
// // // // //                   </TableRow>
// // // // //                 ) : (
// // // // //                   filteredRecords.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((record) => (
// // // // //                     <TableRow hover key={record.id} sx={{ "&:hover": { backgroundColor: "rgba(36, 73, 239, 0.03)" }, cursor: 'pointer' }}>
// // // // //                       <TableCell onClick={() => handleViewDetails(record)}>
// // // // //                         <Box sx={{ display: 'flex', alignItems: 'center' }}>
// // // // //                           <Avatar sx={{ bgcolor: 'primary.light', color: 'primary.dark', mr: 1.5, width: 38, height: 38, fontSize: '0.9rem', fontWeight: 'medium' }}>
// // // // //                             {getInitials(record.employee)}
// // // // //                           </Avatar>
// // // // //                           <Box>
// // // // //                             <Typography variant="subtitle2" sx={{ fontWeight: 'medium' }}>{record.employee}</Typography>
// // // // //                             <Typography variant="caption" color="text.secondary">{record.email}</Typography>
// // // // //                           </Box>
// // // // //                         </Box>
// // // // //                       </TableCell>
// // // // //                       <TableCell onClick={() => handleViewDetails(record)} sx={{fontSize: '0.875rem'}}>{activeTab === 'all' ? record.leaveType : record.reason}</TableCell>
// // // // //                       <TableCell onClick={() => handleViewDetails(record)} sx={{fontSize: '0.875rem'}}>{`${record.startDate} to ${record.endDate}`}</TableCell>
// // // // //                       <TableCell onClick={() => handleViewDetails(record)} sx={{fontSize: '0.875rem'}}>{record.days}</TableCell>
// // // // //                       <TableCell onClick={() => handleViewDetails(record)} sx={{fontSize: '0.875rem'}}>{record.appliedOn}</TableCell>
// // // // //                       <TableCell onClick={() => handleViewDetails(record)}>{getStatusChip(record.status)}</TableCell>
// // // // //                       <TableCell align="center">
// // // // //                         <Tooltip title="View Details">
// // // // //                           <IconButton color="primary" size="small" onClick={() => handleViewDetails(record)} sx={{bgcolor: "primary.lighter", "&:hover": {bgcolor: "primary.light"}}}>
// // // // //                             <InfoIcon fontSize="small"/>
// // // // //                           </IconButton>
// // // // //                         </Tooltip>
// // // // //                       </TableCell>
// // // // //                     </TableRow>
// // // // //                   ))
// // // // //                 )}
// // // // //               </TableBody>
// // // // //             </Table>
// // // // //           </TableContainer>
// // // // //           {!loading && filteredRecords.length > 0 && (
// // // // //             <TablePagination
// // // // //               rowsPerPageOptions={[5, 10, 25, 50]}
// // // // //               component="div"
// // // // //               count={filteredRecords.length}
// // // // //               rowsPerPage={rowsPerPage}
// // // // //               page={page}
// // // // //               onPageChange={handleChangePage}
// // // // //               onRowsPerPageChange={handleChangeRowsPerPage}
// // // // //               sx={{ borderTop: '1px solid', borderColor: 'divider' }}
// // // // //             />
// // // // //           )}
// // // // //         </Paper>

// // // // //         {/* Leave Details Dialog */}
// // // // //         {selectedLeave && (
// // // // //           <Dialog open={showLeaveDetails} onClose={() => setShowLeaveDetails(false)} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: 3 } }}>
// // // // //             <DialogTitle sx={{ background: gradientButtonStyle.background, color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center', py:1.5 }}>
// // // // //               Leave Application Details
// // // // //               <IconButton onClick={() => setShowLeaveDetails(false)} sx={{ color: 'rgba(255,255,255,0.8)', '&:hover': {color: 'white'} }}><CloseIcon /></IconButton>
// // // // //             </DialogTitle>
// // // // //             <DialogContent dividers sx={{ p: 3, backgroundColor: 'grey.50' }}>
// // // // //               <Grid container spacing={2.5}>
// // // // //                 {[
// // // // //                   { label: 'Employee', value: selectedLeave.employee, icon: <PeopleAltIcon /> },
// // // // //                   { label: activeTab === 'all' ? 'Leave Type' : 'Reason', value: activeTab === 'all' ? selectedLeave.leaveType : selectedLeave.reason, icon: <EventIcon /> },
// // // // //                   { label: 'Applied On', value: selectedLeave.appliedOn, icon: <DateRangeIcon /> },
// // // // //                   { label: 'Start Date', value: selectedLeave.startDate, icon: <DateRangeIcon /> },
// // // // //                   { label: 'End Date', value: selectedLeave.endDate, icon: <DateRangeIcon /> },
// // // // //                   { label: 'Total Days', value: selectedLeave.days, icon: <DateRangeIcon /> },
// // // // //                   { label: 'Attachment', value: selectedLeave.attachment ? (selectedLeave.attachment.name || 'View Attachment') : 'No attachment', icon: <AttachmentIcon /> },
// // // // //                   { label: 'Status', value: getStatusChip(selectedLeave.status), icon: <InfoIcon /> },
// // // // //                   { label: 'Remarks', value: selectedLeave.remarks || 'N/A', icon: <NotesIcon /> },
// // // // //                   ...(activeTab === 'all' && selectedLeave.leaveReason ? [{ label: 'Leave Reason', value: selectedLeave.leaveReason || 'N/A', icon: <NotesIcon /> }] : [])
// // // // //                 ].map(item => (
// // // // //                   <Grid item xs={12} sm={6} key={item.label}>
// // // // //                     <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
// // // // //                       {React.cloneElement(item.icon, { fontSize: 'small', sx: { mr: 1, color: 'text.secondary' } })}
// // // // //                       <Typography variant="caption" color="text.secondary" sx={{fontWeight:'medium'}}>{item.label}:</Typography>
// // // // //                     </Box>
// // // // //                     {item.label === 'Status' ? item.value : <Typography variant="body1" sx={{ fontWeight: 'medium' }}>{item.value}</Typography>}
// // // // //                   </Grid>
// // // // //                 ))}
// // // // //               </Grid>
// // // // //             </DialogContent>
// // // // //             {selectedLeave.status === 'Pending' && (
// // // // //               <DialogActions sx={{ p: 2, backgroundColor: 'grey.50' }}>
// // // // //                 <Button onClick={() => handleStatusChange('Rejected')} color="error" variant="outlined" startIcon={<RejectIcon />} sx={{borderRadius:2}}>
// // // // //                   Reject
// // // // //                 </Button>
// // // // //                 <Button onClick={() => handleStatusChange('Approved')} variant="contained" startIcon={<ApproveIcon />} sx={{...gradientButtonStyle, bgcolor: 'success.main', '&:hover': {bgcolor: 'success.dark'}}}>
// // // // //                   Approve
// // // // //                 </Button>
// // // // //               </DialogActions>
// // // // //             )}
// // // // //             {selectedLeave.status !== 'Pending' && (
// // // // //               <DialogActions sx={{ p: 2, backgroundColor: 'grey.50' }}>
// // // // //                 <Button onClick={() => setShowLeaveDetails(false)} variant="contained" color="primary" sx={{borderRadius:2}}>Close</Button>
// // // // //               </DialogActions>
// // // // //             )}
// // // // //           </Dialog>
// // // // //         )}

// // // // //         {/* Add Leave Dialog */}
// // // // //         <Dialog open={showAddLeave} onClose={() => { setShowAddLeave(false); setNewLeave(initialNewLeaveState); }} maxWidth="md" fullWidth PaperProps={{ sx: { borderRadius: 3 } }}>
// // // // //           <DialogTitle sx={{ background: gradientButtonStyle.background, color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center', py:1.5 }}>
// // // // //             Add New Leave Application
// // // // //             <IconButton onClick={() => { setShowAddLeave(false); setNewLeave(initialNewLeaveState); }} sx={{ color: 'rgba(255,255,255,0.8)', '&:hover': {color: 'white'} }}><CloseIcon /></IconButton>
// // // // //           </DialogTitle>
// // // // //           <DialogContent dividers sx={{ p: {xs: 2, sm:3}, backgroundColor: 'grey.50' }}>
// // // // //             <Grid container spacing={2.5}>
// // // // //               <Grid item xs={12} sm={6}>
// // // // //                 <FormControl fullWidth required margin="dense"><InputLabel>Employee</InputLabel><Select name="employee" value={newLeave.employee} label="Employee" onChange={handleLeaveInputChange} sx={{borderRadius:2}}>{employeeOptions.map(name => <MenuItem key={name} value={name}>{name}</MenuItem>)}</Select></FormControl>
// // // // //               </Grid>
// // // // //               <Grid item xs={12} sm={6}>
// // // // //                 <FormControl fullWidth required margin="dense"><InputLabel>Leave Type</InputLabel><Select name="leaveType" value={newLeave.leaveType} label="Leave Type" onChange={handleLeaveInputChange} sx={{borderRadius:2}}>{leaveTypeOptions.map(type => <MenuItem key={type} value={type}>{type}</MenuItem>)}</Select></FormControl>
// // // // //               </Grid>
// // // // //               <Grid item xs={12} sm={6}>
// // // // //                 <DatePicker label="Start Date *" value={newLeave.startDate} onChange={(date) => handleDateChange('startDate', date, setNewLeave)} renderInput={(params) => <TextField {...params} fullWidth required margin="dense" sx={{"& .MuiOutlinedInput-root": {borderRadius:2}}} />} />
// // // // //               </Grid>
// // // // //               <Grid item xs={12} sm={6}>
// // // // //                 <DatePicker label="End Date *" value={newLeave.endDate} onChange={(date) => handleDateChange('endDate', date, setNewLeave)} renderInput={(params) => <TextField {...params} fullWidth required margin="dense" sx={{"& .MuiOutlinedInput-root": {borderRadius:2}}} />} minDate={newLeave.startDate} />
// // // // //               </Grid>
// // // // //               <Grid item xs={12}><FormControlLabel control={<Checkbox name="isHalfDay" checked={newLeave.isHalfDay} onChange={handleLeaveInputChange} />} label="Request Half Day" /></Grid>
// // // // //               <Grid item xs={12}><TextField name="leaveReason" label="Leave Reason *" value={newLeave.leaveReason} onChange={handleLeaveInputChange} multiline rows={3} fullWidth required margin="dense" sx={{"& .MuiOutlinedInput-root": {borderRadius:2}}} /></Grid>
// // // // //               <Grid item xs={12}><TextField name="remarks" label="Remarks (Optional)" value={newLeave.remarks} onChange={handleLeaveInputChange} multiline rows={2} fullWidth margin="dense" sx={{"& .MuiOutlinedInput-root": {borderRadius:2}}} /></Grid>
// // // // //               <Grid item xs={12}>
// // // // //                 <Typography variant="body2" color="textSecondary" sx={{ mb: 0.5 }}>Attachment (pdf, png, jpg, jpeg)</Typography>
// // // // //                 <Button variant="outlined" component="label" startIcon={<AttachmentIcon />} sx={{borderRadius:2}}>Upload File <input type="file" hidden onChange={handleFileUpload} accept=".pdf,.png,.jpg,.jpeg" /></Button>
// // // // //                 {newLeave.attachment && <Typography sx={{ mt: 1, ml:1 }} variant="caption" display="inline">{newLeave.attachment.name}</Typography>}
// // // // //               </Grid>
// // // // //             </Grid>
// // // // //           </DialogContent>
// // // // //           <DialogActions sx={{ p: 2, backgroundColor: 'grey.50', borderTop: '1px solid', borderColor: 'divider' }}>
// // // // //             <Button onClick={() => setNewLeave(initialNewLeaveState)} color="inherit" sx={{borderRadius:2}} disabled={submitLoading}>Reset</Button>
// // // // //             <Button onClick={handleSubmitLeave} sx={{...gradientButtonStyle, minWidth: 100}} disabled={submitLoading}>
// // // // //               {submitLoading ? <CircularProgress size={24} color="inherit" /> : "Submit"}
// // // // //             </Button>
// // // // //           </DialogActions>
// // // // //         </Dialog>

// // // // //         {/* Add Comp Off Dialog */}
// // // // //         <Dialog open={showAddCompOff} onClose={() => { setShowAddCompOff(false); setNewCompOff(initialNewCompOffState); }} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: 3 } }}>
// // // // //           <DialogTitle sx={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center', py:1.5 }}> {/* Different gradient for CompOff */}
// // // // //             Add Comp-off Request
// // // // //             <IconButton onClick={() => { setShowAddCompOff(false); setNewCompOff(initialNewCompOffState); }} sx={{ color: 'rgba(255,255,255,0.8)', '&:hover': {color: 'white'} }}><CloseIcon /></IconButton>
// // // // //           </DialogTitle>
// // // // //           <DialogContent dividers sx={{ p: {xs: 2, sm:3}, backgroundColor: 'grey.50' }}>
// // // // //             <Grid container spacing={2.5}>
// // // // //               <Grid item xs={12}><FormControl fullWidth required margin="dense"><InputLabel>Employee</InputLabel><Select name="employee" value={newCompOff.employee} label="Employee" onChange={handleCompOffInputChange} sx={{borderRadius:2}}>{employeeOptions.map(name => <MenuItem key={name} value={name}>{name}</MenuItem>)}</Select></FormControl></Grid>
// // // // //               <Grid item xs={12} sm={6}><DatePicker label="Start Date *" value={newCompOff.startDate} onChange={(date) => handleDateChange('startDate', date, setNewCompOff)} renderInput={(params) => <TextField {...params} fullWidth required margin="dense" sx={{"& .MuiOutlinedInput-root": {borderRadius:2}}} />} /></Grid>
// // // // //               <Grid item xs={12} sm={6}><DatePicker label="End Date *" value={newCompOff.endDate} onChange={(date) => handleDateChange('endDate', date, setNewCompOff)} renderInput={(params) => <TextField {...params} fullWidth required margin="dense" sx={{"& .MuiOutlinedInput-root": {borderRadius:2}}} />} minDate={newCompOff.startDate} /></Grid>
// // // // //               <Grid item xs={12}><TextField name="reason" label="Comp-off Reason *" value={newCompOff.reason} onChange={handleCompOffInputChange} multiline rows={3} fullWidth required margin="dense" sx={{"& .MuiOutlinedInput-root": {borderRadius:2}}} /></Grid>
// // // // //             </Grid>
// // // // //           </DialogContent>
// // // // //           <DialogActions sx={{ p: 2, backgroundColor: 'grey.50', borderTop: '1px solid', borderColor: 'divider' }}>
// // // // //             <Button onClick={() => setNewCompOff(initialNewCompOffState)} color="inherit" sx={{borderRadius:2}} disabled={submitLoading}>Reset</Button>
// // // // //             <Button onClick={handleSubmitCompOff} sx={{...gradientButtonStyle, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', minWidth: 100}} disabled={submitLoading}>
// // // // //               {submitLoading ? <CircularProgress size={24} color="inherit" /> : "Save Comp-off"}
// // // // //             </Button>
// // // // //           </DialogActions>
// // // // //         </Dialog>
// // // // //       </Box>
// // // // //     </LocalizationProvider>
// // // // //   );
// // // // // }

// // // // // export default LeaveManagement;





// // // // // import React, { useState, useEffect } from 'react';
// // // // // import './LeaveManagement.css';

// // // // // function LeaveManagement() {
// // // // //   // State for leave records
// // // // //   const [leaveRecords, setLeaveRecords] = useState([
// // // // //     {
// // // // //       id: 1,
// // // // //       employee: 'Achyut Panchal',
// // // // //       email: 'achyut.panchal@tdt.world',
// // // // //       leaveType: 'Casual Leave (CL)',
// // // // //       startDate: '07/02/2025',
// // // // //       endDate: '07/02/2025',
// // // // //       appliedOn: '06/02/2025',
// // // // //       days: 1,
// // // // //       status: 'Approved',
// // // // //       remarks: 'test',
// // // // //       attachment: null
// // // // //     },
// // // // //     {
// // // // //       id: 2,
// // // // //       employee: 'Aishwarya K Patil',
// // // // //       email: 'aishwarya.patil@tdt.world',
// // // // //       leaveType: 'Casual Leave (CL)',
// // // // //       startDate: '08/01/2025',
// // // // //       endDate: '08/01/2025',
// // // // //       appliedOn: '08/01/2025',
// // // // //       days: 1,
// // // // //       status: 'Approved',
// // // // //       remarks: '',
// // // // //       attachment: null
// // // // //     },
// // // // //     {
// // // // //       id: 3,
// // // // //       employee: 'Aishwarya K Patil',
// // // // //       email: 'aishwarya.patil@tdt.world',
// // // // //       leaveType: 'Leave without pay (LWP)',
// // // // //       startDate: '29/01/2025',
// // // // //       endDate: '29/01/2025',
// // // // //       appliedOn: '29/01/2025',
// // // // //       days: 1,
// // // // //       status: 'Approved',
// // // // //       remarks: '',
// // // // //       attachment: null
// // // // //     },
// // // // //     {
// // // // //       id: 4,
// // // // //       employee: 'Aishwarya K Patil',
// // // // //       email: 'aishwarya.patil@tdt.world',
// // // // //       leaveType: 'Leave without pay (LWP)',
// // // // //       startDate: '07/02/2025',
// // // // //       endDate: '10/02/2025',
// // // // //       appliedOn: '07/02/2025',
// // // // //       days: 4,
// // // // //       status: 'Approved',
// // // // //       remarks: '',
// // // // //       attachment: null
// // // // //     },
// // // // //     {
// // // // //       id: 5,
// // // // //       employee: 'Aishwarya K Patil',
// // // // //       email: 'aishwarya.patil@tdt.world',
// // // // //       leaveType: 'Leave without pay (LWP)',
// // // // //       startDate: '11/02/2025',
// // // // //       endDate: '12/02/2025',
// // // // //       appliedOn: '11/02/2025',
// // // // //       days: 2,
// // // // //       status: 'Approved',
// // // // //       remarks: '',
// // // // //       attachment: null
// // // // //     },
// // // // //     {
// // // // //       id: 6,
// // // // //       employee: 'Aishwarya K Patil',
// // // // //       email: 'aishwarya.patil@tdt.world',
// // // // //       leaveType: 'Casual Leave (CL)',
// // // // //       startDate: '07/03/2025',
// // // // //       endDate: '07/03/2025',
// // // // //       appliedOn: '07/03/2025',
// // // // //       days: 1,
// // // // //       status: 'Pending',
// // // // //       remarks: '',
// // // // //       attachment: null
// // // // //     },
// // // // //     {
// // // // //       id: 7,
// // // // //       employee: 'Aman Mulla',
// // // // //       email: 'aman.mulla@tdt.world',
// // // // //       leaveType: 'Casual Leave (CL)',
// // // // //       startDate: '17/01/2025',
// // // // //       endDate: '17/01/2025',
// // // // //       appliedOn: '16/01/2025',
// // // // //       days: 'Half Day',
// // // // //       status: 'Approved',
// // // // //       remarks: '',
// // // // //       attachment: null
// // // // //     }
// // // // //   ]);

// // // // //   // State for comp-off records
// // // // //   const [compOffRecords, setCompOffRecords] = useState([]);

// // // // //   // State for leave statistics
// // // // //   const [leaveStats, setLeaveStats] = useState({
// // // // //     taken: 3153,
// // // // //     pending: 209,
// // // // //     approved: 2762,
// // // // //     rejected: 182
// // // // //   });

// // // // //   // State for dialogs
// // // // //   const [showLeaveDetails, setShowLeaveDetails] = useState(false);
// // // // //   const [showAddLeave, setShowAddLeave] = useState(false);
// // // // //   const [showAddCompOff, setShowAddCompOff] = useState(false);
// // // // //   const [selectedLeave, setSelectedLeave] = useState(null);

// // // // //   // State for form inputs
// // // // //   const [newLeave, setNewLeave] = useState({
// // // // //     employee: '',
// // // // //     leaveType: '',
// // // // //     startDate: '',
// // // // //     endDate: '',
// // // // //     isHalfDay: false,
// // // // //     remarks: '',
// // // // //     leaveReason: '',
// // // // //     attachment: null
// // // // //   });

// // // // //   const [newCompOff, setNewCompOff] = useState({
// // // // //     employee: '',
// // // // //     startDate: '',
// // // // //     endDate: '',
// // // // //     reason: ''
// // // // //   });

// // // // //   // State for search and filtering
// // // // //   const [searchTerm, setSearchTerm] = useState('');
// // // // //   const [entriesPerPage, setEntriesPerPage] = useState(10);
// // // // //   const [selectedYear, setSelectedYear] = useState('2022');
// // // // //   const [activeTab, setActiveTab] = useState('all'); // 'all' or 'compoff'

// // // // //   // Calculate statistics whenever records change
// // // // //   useEffect(() => {
// // // // //     const approved = leaveRecords.filter(record => record.status === 'Approved').length;
// // // // //     const pending = leaveRecords.filter(record => record.status === 'Pending').length;
// // // // //     const rejected = leaveRecords.filter(record => record.status === 'Rejected').length;
// // // // //     const taken = approved + pending;

// // // // //     setLeaveStats({
// // // // //       taken,
// // // // //       pending,
// // // // //       approved,
// // // // //       rejected
// // // // //     });
// // // // //   }, [leaveRecords]);

// // // // //   // Handle view details
// // // // //   const handleViewDetails = (leave) => {
// // // // //     setSelectedLeave(leave);
// // // // //     setShowLeaveDetails(true);
// // // // //   };

// // // // //   // Handle approve/reject leave
// // // // //   const handleStatusChange = (status) => {
// // // // //     if (selectedLeave) {
// // // // //       const updatedRecords = leaveRecords.map(record =>
// // // // //         record.id === selectedLeave.id ? { ...record, status } : record
// // // // //       );
// // // // //       setLeaveRecords(updatedRecords);
// // // // //       setSelectedLeave({ ...selectedLeave, status });
// // // // //     }
// // // // //   };

// // // // //   // Handle form input changes for new leave
// // // // //   const handleLeaveInputChange = (e) => {
// // // // //     const { name, value, type, checked } = e.target;
// // // // //     setNewLeave({
// // // // //       ...newLeave,
// // // // //       [name]: type === 'checkbox' ? checked : value
// // // // //     });
// // // // //   };

// // // // //   // Handle form input changes for new comp-off
// // // // //   const handleCompOffInputChange = (e) => {
// // // // //     const { name, value } = e.target;
// // // // //     setNewCompOff({
// // // // //       ...newCompOff,
// // // // //       [name]: value
// // // // //     });
// // // // //   };

// // // // //   // Handle file upload
// // // // //   const handleFileUpload = (e) => {
// // // // //     const file = e.target.files[0];
// // // // //     if (file) {
// // // // //       setNewLeave({
// // // // //         ...newLeave,
// // // // //         attachment: file
// // // // //       });
// // // // //     }
// // // // //   };

// // // // //   // Calculate days between two dates
// // // // //   const calculateDays = (start, end) => {
// // // // //     if (!start || !end) return 0;

// // // // //     const startDate = new Date(start.split('/').reverse().join('-'));
// // // // //     const endDate = new Date(end.split('/').reverse().join('-'));

// // // // //     // Calculate the time difference in milliseconds
// // // // //     const timeDiff = endDate.getTime() - startDate.getTime();

// // // // //     // Convert the time difference to days and add 1 (inclusive of both start and end dates)
// // // // //     return Math.floor(timeDiff / (1000 * 60 * 60 * 24)) + 1;
// // // // //   };

// // // // //   // Submit new leave request
// // // // //   const handleSubmitLeave = () => {
// // // // //     // Validate form
// // // // //     if (!newLeave.employee || !newLeave.leaveType || !newLeave.startDate || !newLeave.endDate || !newLeave.leaveReason) {
// // // // //       alert('Please fill all required fields');
// // // // //       return;
// // // // //     }

// // // // //     const days = newLeave.isHalfDay ? 'Half Day' : calculateDays(newLeave.startDate, newLeave.endDate);

// // // // //     const newLeaveRecord = {
// // // // //       id: leaveRecords.length + 1,
// // // // //       employee: newLeave.employee,
// // // // //       email: `${newLeave.employee.toLowerCase().replace(' ', '.')}@tdt.world`,
// // // // //       leaveType: newLeave.leaveType,
// // // // //       startDate: newLeave.startDate,
// // // // //       endDate: newLeave.endDate,
// // // // //       appliedOn: new Date().toLocaleDateString('en-GB'),
// // // // //       days,
// // // // //       status: 'Pending',
// // // // //       remarks: newLeave.remarks,
// // // // //       attachment: newLeave.attachment
// // // // //     };

// // // // //     setLeaveRecords([...leaveRecords, newLeaveRecord]);
// // // // //     setShowAddLeave(false);

// // // // //     // Reset form
// // // // //     setNewLeave({
// // // // //       employee: '',
// // // // //       leaveType: '',
// // // // //       startDate: '',
// // // // //       endDate: '',
// // // // //       isHalfDay: false,
// // // // //       remarks: '',
// // // // //       leaveReason: '',
// // // // //       attachment: null
// // // // //     });
// // // // //   };

// // // // //   // Submit new comp-off request
// // // // //   const handleSubmitCompOff = () => {
// // // // //     // Validate form
// // // // //     if (!newCompOff.employee || !newCompOff.startDate || !newCompOff.endDate || !newCompOff.reason) {
// // // // //       alert('Please fill all required fields');
// // // // //       return;
// // // // //     }

// // // // //     const days = calculateDays(newCompOff.startDate, newCompOff.endDate);

// // // // //     const newCompOffRecord = {
// // // // //       id: compOffRecords.length + 1,
// // // // //       employee: newCompOff.employee,
// // // // //       email: `${newCompOff.employee.toLowerCase().replace(' ', '.')}@tdt.world`,
// // // // //       startDate: newCompOff.startDate,
// // // // //       endDate: newCompOff.endDate,
// // // // //       appliedOn: new Date().toLocaleDateString('en-GB'),
// // // // //       days,
// // // // //       reason: newCompOff.reason,
// // // // //       status: 'Pending'
// // // // //     };

// // // // //     setCompOffRecords([...compOffRecords, newCompOffRecord]);
// // // // //     setShowAddCompOff(false);

// // // // //     // Reset form
// // // // //     setNewCompOff({
// // // // //       employee: '',
// // // // //       startDate: '',
// // // // //       endDate: '',
// // // // //       reason: ''
// // // // //     });
// // // // //   };

// // // // //   // Filter records based on search term
// // // // //   const filteredRecords = activeTab === 'all'
// // // // //     ? leaveRecords.filter(record =>
// // // // //       record.employee.toLowerCase().includes(searchTerm.toLowerCase()) ||
// // // // //       record.leaveType.toLowerCase().includes(searchTerm.toLowerCase()) ||
// // // // //       record.status.toLowerCase().includes(searchTerm.toLowerCase())
// // // // //     )
// // // // //     : compOffRecords.filter(record =>
// // // // //       record.employee.toLowerCase().includes(searchTerm.toLowerCase()) ||
// // // // //       record.reason.toLowerCase().includes(searchTerm.toLowerCase()) ||
// // // // //       record.status.toLowerCase().includes(searchTerm.toLowerCase())
// // // // //     );

// // // // //   return (
// // // // //     <div className="leave-management" style={{ marginTop: '-30px' }}>
// // // // //       <h1>Leave Management</h1>

// // // // //       {/* Statistics Section */}
// // // // //       <div className="stats-container">
// // // // //         <div className="stat-box">
// // // // //           <div className="stat-header">
// // // // //             <span>LEAVE TAKEN | PENDING</span>
// // // // //           </div>
// // // // //           <div className="stat-value">
// // // // //             <span className="taken">{leaveStats.taken}</span> | <span className="pending">{leaveStats.pending}</span>
// // // // //           </div>
// // // // //           <div className="stat-icon">
// // // // //             <div className="cube"></div>
// // // // //           </div>
// // // // //         </div>

// // // // //         <div className="stat-box">
// // // // //           <div className="stat-header">
// // // // //             <span>APPROVED</span>
// // // // //           </div>
// // // // //           <div className="stat-value">
// // // // //             <span>{leaveStats.approved}</span>
// // // // //           </div>
// // // // //           <div className="stat-icon">
// // // // //             <div className="cube"></div>
// // // // //           </div>
// // // // //         </div>

// // // // //         <div className="stat-box">
// // // // //           <div className="stat-header">
// // // // //             <span>REJECTED</span>
// // // // //           </div>
// // // // //           <div className="stat-value">
// // // // //             <span>{leaveStats.rejected}</span>
// // // // //           </div>
// // // // //           <div className="stat-icon">
// // // // //             <div className="cube"></div>
// // // // //           </div>
// // // // //         </div>

// // // // //         <div className="action-buttons">
// // // // //           <button className="add-leave-btn" onClick={() => setShowAddLeave(true)}>Add New Leave</button>
// // // // //           <button className="add-compoff-btn" onClick={() => setShowAddCompOff(true)}>Add Comp off</button>
// // // // //         </div>
// // // // //       </div>

// // // // //       {/* Filter Section */}
// // // // //       <div className="filter-section">
// // // // //         <div className="year-filter">
// // // // //           <label>List of All Leaves</label>
// // // // //           <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
// // // // //             <option value="2022">2022</option>
// // // // //             <option value="2023">2023</option>
// // // // //             <option value="2024">2024</option>
// // // // //             <option value="2025">2025</option>
// // // // //           </select>
// // // // //         </div>
// // // // //       </div>

// // // // //       {/* Table Controls */}
// // // // //       <div className="table-controls">
// // // // //         <div className="entries-control">
// // // // //           <label>Show</label>
// // // // //           <select value={entriesPerPage} onChange={(e) => setEntriesPerPage(parseInt(e.target.value))}>
// // // // //             <option value="10">10</option>
// // // // //             <option value="25">25</option>
// // // // //             <option value="50">50</option>
// // // // //             <option value="100">100</option>
// // // // //           </select>
// // // // //           <label>entries</label>
// // // // //         </div>

// // // // //         <div className="list-tabs">
// // // // //           <button
// // // // //             className={activeTab === 'all' ? 'active' : ''}
// // // // //             onClick={() => setActiveTab('all')}
// // // // //           >
// // // // //             List of all Leave
// // // // //           </button>
// // // // //           <button
// // // // //             className={activeTab === 'compoff' ? 'active' : ''}
// // // // //             onClick={() => setActiveTab('compoff')}
// // // // //           >
// // // // //             List of Compoff Leave
// // // // //           </button>
// // // // //         </div>

// // // // //         <div className="search-control">
// // // // //           <label>Search:</label>
// // // // //           <input
// // // // //             type="text"
// // // // //             value={searchTerm}
// // // // //             onChange={(e) => setSearchTerm(e.target.value)}
// // // // //             placeholder="Search..."
// // // // //           />
// // // // //         </div>
// // // // //       </div>

// // // // //       {/* Leave Records Table */}
// // // // //       <div className="table-container">
// // // // //         <table className="leave-table">
// // // // //           <thead>
// // // // //             <tr>
// // // // //               <th>EMPLOYEE</th>
// // // // //               {activeTab === 'all' ? <th>LEAVE TYPE</th> : <th>REASON</th>}
// // // // //               <th>LEAVE DURATION</th>
// // // // //               <th>DAYS</th>
// // // // //               <th>APPLIED ON</th>
// // // // //               <th>STATUS</th>
// // // // //             </tr>
// // // // //           </thead>
// // // // //           <tbody>
// // // // //             {filteredRecords.map((record) => (
// // // // //               <tr key={record.id} onClick={() => handleViewDetails(record)}>
// // // // //                 <td>
// // // // //                   <div className="employee-cell">
// // // // //                     <div className="avatar"></div>
// // // // //                     <div className="employee-info">
// // // // //                       <div className="employee-name">{record.employee}</div>
// // // // //                       <div className="employee-email">{record.email}</div>
// // // // //                     </div>
// // // // //                   </div>
// // // // //                 </td>
// // // // //                 <td>{activeTab === 'all' ? record.leaveType : record.reason}</td>
// // // // //                 <td>{`${record.startDate} To ${record.endDate}`}</td>
// // // // //                 <td>{record.days}</td>
// // // // //                 <td>{record.appliedOn}</td>
// // // // //                 <td>
// // // // //                   <div className={`status-badge ${record.status.toLowerCase()}`}>
// // // // //                     {record.status}
// // // // //                   </div>
// // // // //                 </td>
// // // // //               </tr>
// // // // //             ))}
// // // // //           </tbody>
// // // // //         </table>
// // // // //       </div>

// // // // //       {/* Leave Details Dialog */}
// // // // //       {/* {showLeaveDetails && selectedLeave && (
// // // // //         <div className="dialog-overlay">
// // // // //           <div className="dialog leave-details-dialog">
// // // // //             <h2>Leave Details</h2>
// // // // //             <div className="leave-details-content">
// // // // //               <div className="detail-row">
// // // // //                 <div className="detail-label">Employee :</div>
// // // // //                 <div className="detail-value">{selectedLeave.employee}</div>
// // // // //               </div>

// // // // //               <div className="detail-row">
// // // // //                 <div className="detail-label">Leave Type :</div>
// // // // //                 <div className="detail-value">{selectedLeave.leaveType}</div>
// // // // //               </div>

// // // // //               <div className="detail-row">
// // // // //                 <div className="detail-label">Applied On :</div>
// // // // //                 <div className="detail-value">{selectedLeave.appliedOn}</div>
// // // // //               </div>

// // // // //               <div className="detail-row">
// // // // //                 <div className="detail-label">Start Date :</div>
// // // // //                 <div className="detail-value">{selectedLeave.startDate}</div>
// // // // //               </div>

// // // // //               <div className="detail-row">
// // // // //                 <div className="detail-label">End Date :</div>
// // // // //                 <div className="detail-value">{selectedLeave.endDate}</div>
// // // // //               </div>

// // // // //               <div className="detail-row">
// // // // //                 <div className="detail-label">Attachment :</div>
// // // // //                 <div className="detail-value">
// // // // //                   {selectedLeave.attachment ? selectedLeave.attachment.name : 'No attachment'}
// // // // //                 </div>
// // // // //               </div>

// // // // //               <div className="detail-row">
// // // // //                 <div className="detail-label">Total Days :</div>
// // // // //                 <div className="detail-value">{selectedLeave.days}</div>
// // // // //               </div>

// // // // //               <div className="detail-row">
// // // // //                 <div className="detail-label">Status</div>
// // // // //                 <div className="status-progress">
// // // // //                   <div className={`progress-bar ${selectedLeave.status.toLowerCase()}`}></div>
// // // // //                   <div className="status-text">{selectedLeave.status}</div>
// // // // //                 </div>
// // // // //               </div>

// // // // //               <div className="detail-row remarks-row">
// // // // //                 <div className="detail-label">Remarks</div>
// // // // //                 <div className="remarks-box">{selectedLeave.remarks || 'No remarks'}</div>
// // // // //               </div>

// // // // //               <div className="status-buttons">
// // // // //                 <button 
// // // // //                   className="approve-btn" 
// // // // //                   onClick={() => handleStatusChange('Approved')}
// // // // //                   disabled={selectedLeave.status === 'Approved'}
// // // // //                 >
// // // // //                   Approve
// // // // //                 </button>
// // // // //                 <button 
// // // // //                   className="reject-btn" 
// // // // //                   onClick={() => handleStatusChange('Rejected')}
// // // // //                   disabled={selectedLeave.status === 'Rejected'}
// // // // //                 >
// // // // //                   Reject
// // // // //                 </button>
// // // // //               </div>

// // // // //               <button className="update-status-btn">Update Status</button>
// // // // //             </div>
// // // // //             <button className="close-btn" onClick={() => setShowLeaveDetails(false)}>×</button>
// // // // //           </div>
// // // // //         </div>
// // // // //       )} */}

// // // // //       {showLeaveDetails && selectedLeave && (
// // // // //         <div className="dialog-overlay" style={{ marginTop: '50px', display: 'flex', justifyContent: 'center' }}>
// // // // //           <div className="dialog leave-details-dialog" style={{ width: '500px', position: 'relative', padding: '20px' }}>
// // // // //             <h2>Leave Details</h2>

// // // // //             <div className="leave-details-content">
// // // // //               {[
// // // // //                 ['Employee', selectedLeave.employee],
// // // // //                 ['Leave Type', selectedLeave.leaveType],
// // // // //                 ['Applied On', selectedLeave.appliedOn],
// // // // //                 ['Start Date', selectedLeave.startDate],
// // // // //                 ['End Date', selectedLeave.endDate],
// // // // //                 ['Attachment', selectedLeave.attachment?.name || 'No attachment'],
// // // // //                 ['Total Days', selectedLeave.days]
// // // // //               ].map(([label, value]) => (
// // // // //                 <div className="detail-row" key={label}>
// // // // //                   <div className="detail-label">{label} :</div>
// // // // //                   <div className="detail-value">{value}</div>
// // // // //                 </div>
// // // // //               ))}

// // // // //               <div className="detail-row">
// // // // //                 <div className="detail-label">Status</div>
// // // // //                 <div className="status-progress">
// // // // //                   <div className={`progress-bar ${selectedLeave.status.toLowerCase()}`}></div>
// // // // //                   <div className="status-text">{selectedLeave.status}</div>
// // // // //                 </div>
// // // // //               </div>

// // // // //               <div className="detail-row remarks-row">
// // // // //                 <div className="detail-label">Remarks</div>
// // // // //                 <div className="remarks-box">{selectedLeave.remarks || 'No remarks'}</div>
// // // // //               </div>

// // // // //               <div className="status-buttons">
// // // // //                 <button
// // // // //                   className="approve-btn"
// // // // //                   onClick={() => handleStatusChange('Approved')}
// // // // //                   disabled={selectedLeave.status === 'Approved'}
// // // // //                 >
// // // // //                   Approve
// // // // //                 </button>
// // // // //                 <button
// // // // //                   className="reject-btn"
// // // // //                   onClick={() => handleStatusChange('Rejected')}
// // // // //                   disabled={selectedLeave.status === 'Rejected'}
// // // // //                 >
// // // // //                   Reject
// // // // //                 </button>
// // // // //               </div>

// // // // //               <button
// // // // //                 className="update-status-btn"
// // // // //                 onClick={() => setShowLeaveDetails(false)}
// // // // //               >
// // // // //                 Update Status
// // // // //               </button>
// // // // //             </div>

// // // // //             <button
// // // // //               className="close-btn"
// // // // //               onClick={() => setShowLeaveDetails(false)}
// // // // //               style={{ position: 'absolute', top: '10px', right: '10px' }}
// // // // //             >
// // // // //               ×
// // // // //             </button>
// // // // //           </div>
// // // // //         </div>
// // // // //       )}

// // // // //       {/* Add Leave Dialog */}
// // // // //       {showAddLeave && (
// // // // //         <div className="dialog-overlay" >
// // // // //           <div className="dialog add-leave-dialog" style={{ marginTop: '55px' }}>
// // // // //             <div className="dialog-header" >
// // // // //               <h2>Leave Management</h2>
// // // // //               <div className="dialog-actions">
// // // // //                 <button className="hide-btn" onClick={() => setShowAddLeave(false)}>Hide</button>
// // // // //               </div>
// // // // //             </div>

// // // // //             <div className="dialog-content">
// // // // //               <div className="form-container">
// // // // //                 <div className="form-left">
// // // // //                   <div className="form-group">
// // // // //                     <label>Employee <span className="required">*</span></label>
// // // // //                     <select
// // // // //                       name="employee"
// // // // //                       value={newLeave.employee}
// // // // //                       onChange={handleLeaveInputChange}
// // // // //                       required
// // // // //                     >
// // // // //                       <option value="">Select Employee</option>
// // // // //                       <option value="Amit Andre">Amit Andre</option>
// // // // //                       <option value="Achyut Panchal">Achyut Panchal</option>
// // // // //                       <option value="Aishwarya K Patil">Aishwarya K Patil</option>
// // // // //                       <option value="Aman Mulla">Aman Mulla</option>
// // // // //                     </select>
// // // // //                   </div>

// // // // //                   <div className="form-group">
// // // // //                     <label>Leave Type <span className="required">*</span></label>
// // // // //                     <select
// // // // //                       name="leaveType"
// // // // //                       value={newLeave.leaveType}
// // // // //                       onChange={handleLeaveInputChange}
// // // // //                       required
// // // // //                     >
// // // // //                       <option value="">Select Leave Type</option>
// // // // //                       <option value="Casual Leave (CL)">Casual Leave (CL)</option>
// // // // //                       <option value="Leave without pay (LWP)">Leave without pay (LWP)</option>
// // // // //                       <option value="Sick Leave (SL)">Sick Leave (SL)</option>
// // // // //                     </select>
// // // // //                   </div>

// // // // //                   <div className="form-row">
// // // // //                     <div className="form-group">
// // // // //                       <label>Start Date <span className="required">*</span></label>
// // // // //                       <input
// // // // //                         type="date"
// // // // //                         name="startDate"
// // // // //                         value={newLeave.startDate}
// // // // //                         onChange={handleLeaveInputChange}
// // // // //                         required
// // // // //                       />
// // // // //                     </div>

// // // // //                     <div className="form-group">
// // // // //                       <label>End Date <span className="required">*</span></label>
// // // // //                       <input
// // // // //                         type="date"
// // // // //                         name="endDate"
// // // // //                         value={newLeave.endDate}
// // // // //                         onChange={handleLeaveInputChange}
// // // // //                         required
// // // // //                       />
// // // // //                     </div>
// // // // //                   </div>

// // // // //                   <div className="form-group half-day-group">
// // // // //                     <label className="checkbox-label">
// // // // //                       <input
// // // // //                         type="checkbox"
// // // // //                         name="isHalfDay"
// // // // //                         checked={newLeave.isHalfDay}
// // // // //                         onChange={handleLeaveInputChange}
// // // // //                       />
// // // // //                       Half Day
// // // // //                     </label>
// // // // //                   </div>

// // // // //                   <div className="form-group">
// // // // //                     <label>Remarks</label>
// // // // //                     <textarea
// // // // //                       name="remarks"
// // // // //                       value={newLeave.remarks}
// // // // //                       onChange={handleLeaveInputChange}
// // // // //                       placeholder="Remarks"
// // // // //                     ></textarea>
// // // // //                   </div>

// // // // //                   <div className="form-group">
// // // // //                     <label>Leave Reason <span className="required">*</span></label>
// // // // //                     <textarea
// // // // //                       name="leaveReason"
// // // // //                       value={newLeave.leaveReason}
// // // // //                       onChange={handleLeaveInputChange}
// // // // //                       placeholder="Leave Reason"
// // // // //                       required
// // // // //                     ></textarea>
// // // // //                   </div>
// // // // //                 </div>

// // // // //                 <div className="form-right">
// // // // //                   <div className="attachment-section">
// // // // //                     <h3>Leave Attachment</h3>
// // // // //                     <div className="attachment-form">
// // // // //                       <label>Attachment</label>
// // // // //                       <input
// // // // //                         type="file"
// // // // //                         onChange={handleFileUpload}
// // // // //                       />
// // // // //                       <p className="file-info">Upload files only: pdf,png,jpg,jpeg</p>
// // // // //                     </div>
// // // // //                   </div>
// // // // //                 </div>
// // // // //               </div>

// // // // //               <div className="form-actions">
// // // // //                 <button className="reset-btn" onClick={() => setNewLeave({
// // // // //                   employee: '',
// // // // //                   leaveType: '',
// // // // //                   startDate: '',
// // // // //                   endDate: '',
// // // // //                   isHalfDay: false,
// // // // //                   remarks: '',
// // // // //                   leaveReason: '',
// // // // //                   attachment: null
// // // // //                 })}>Reset</button>
// // // // //                 <button className="save-btn" onClick={handleSubmitLeave}>Save</button>
// // // // //               </div>
// // // // //             </div>
// // // // //           </div>
// // // // //         </div>
// // // // //       )}

// // // // //       {/* Add Comp Off Dialog */}
// // // // //       {showAddCompOff && (
// // // // //         <div className="dialog-overlay ml " style={{ marginTop: '50px' }}>
// // // // //           <div className="dialog add-compoff-dialog">
// // // // //             <div className="dialog-header">
// // // // //               <h2>Leave Management</h2>
// // // // //               <div className="dialog-actions">
// // // // //                 <button className="hide-btn" onClick={() => setShowAddCompOff(false)}>Hide</button>
// // // // //               </div>
// // // // //             </div>

// // // // //             <div className="dialog-content">
// // // // //               <div className="form-group">
// // // // //                 <label>Employee <span className="required">*</span></label>
// // // // //                 <select
// // // // //                   name="employee"
// // // // //                   value={newCompOff.employee}
// // // // //                   onChange={handleCompOffInputChange}
// // // // //                   required
// // // // //                 >
// // // // //                   <option value="">Select Employee</option>
// // // // //                   <option value="Amit Andre">Amit Andre</option>
// // // // //                   <option value="Achyut Panchal">Achyut Panchal</option>
// // // // //                   <option value="Aishwarya K Patil">Aishwarya K Patil</option>
// // // // //                   <option value="Aman Mulla">Aman Mulla</option>
// // // // //                 </select>
// // // // //               </div>

// // // // //               <div className="form-row">
// // // // //                 <div className="form-group">
// // // // //                   <label>Start Date <span className="required">*</span></label>
// // // // //                   <input
// // // // //                     type="date"
// // // // //                     name="startDate"
// // // // //                     value={newCompOff.startDate}
// // // // //                     onChange={handleCompOffInputChange}
// // // // //                     required
// // // // //                   />
// // // // //                 </div>

// // // // //                 <div className="form-group">
// // // // //                   <label>End Date <span className="required">*</span></label>
// // // // //                   <input
// // // // //                     type="date"
// // // // //                     name="endDate"
// // // // //                     value={newCompOff.endDate}
// // // // //                     onChange={handleCompOffInputChange}
// // // // //                     required
// // // // //                   />
// // // // //                 </div>
// // // // //               </div>

// // // // //               <div className="form-group">
// // // // //                 <label>Comp off Reason <span className="required">*</span></label>
// // // // //                 <textarea
// // // // //                   name="reason"
// // // // //                   value={newCompOff.reason}
// // // // //                   onChange={handleCompOffInputChange}
// // // // //                   placeholder="Comp off Reason"
// // // // //                   required
// // // // //                 ></textarea>
// // // // //               </div>

// // // // //               <div className="form-actions">
// // // // //                 <button className="reset-btn" onClick={() => setNewCompOff({
// // // // //                   employee: '',
// // // // //                   startDate: '',
// // // // //                   endDate: '',
// // // // //                   reason: ''
// // // // //                 })}>Reset</button>
// // // // //                 <button className="save-btn" onClick={handleSubmitCompOff}>Save</button>
// // // // //               </div>
// // // // //             </div>
// // // // //           </div>
// // // // //         </div>
// // // // //       )}
// // // // //     </div>
// // // // //   );
// // // // // }

// // // // // export default LeaveManagement;












// // import React, { useEffect, useState, useMemo } from "react";
// // import {
// //   Box,
// //   Paper,
// //   Table,
// //   TableHead,
// //   TableRow,
// //   TableCell,
// //   TableBody,
// //   TableContainer,
// //   Typography,
// //   TextField,
// //   IconButton,
// //   Tooltip,
// //   Dialog,
// //   DialogTitle,
// //   DialogContent,
// //   DialogActions,
// //   Button,
// //   Grid,
// //   Pagination,
// // } from "@mui/material";
// // import { Delete, Visibility } from "@mui/icons-material";
// // import { useNavigate } from "react-router-dom";

// // const LeaveManagementPage = () => {
// //   const [leaveData, setLeaveData] = useState([]);
// //   const [page, setPage] = useState(1);
// //   const [rowsPerPage, setRowsPerPage] = useState(10);
// //   const [searchQuery, setSearchQuery] = useState("");
// //   const [hoveredRow, setHoveredRow] = useState(null);
// //   const [openDialog, setOpenDialog] = useState(false);
// //   const [selectedRowId, setSelectedRowId] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     const fetchLeaveData = async () => {
// //       try {
// //         const response = await fetch("https://tdtlworld.com/hrms-backend/api/leave-applications/");
// //         if (!response.ok) {
// //           throw new Error('Failed to fetch leave data');
// //         }
// //         const data = await response.json();
// //         setLeaveData(data?.leaves || []);
// //       } catch (err) {
// //         setError(err.message);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchLeaveData();
// //   }, []);

// //   const filteredLeaveData = useMemo(() => {
// //     if (!searchQuery) return leaveData;
// //     return leaveData.filter((row) => {
// //       const query = searchQuery.toLowerCase();
// //       return (
// //         (row.employee_name?.toLowerCase() || '').includes(query) ||
// //         (row.employee_email?.toLowerCase() || '').includes(query) ||
// //         (row.leave_type?.toLowerCase() || '').includes(query)
// //       );
// //     });
// //   }, [searchQuery, leaveData]);

// //   const handleDelete = async () => {
// //     try {
// //       const response = await fetch(
// //         `https://tdtlworld.com/hrms-backend/api/leave-applications/${selectedRowId}/`,
// //         {
// //           method: "DELETE",
// //         }
// //       );

// //       if (!response.ok) {
// //         throw new Error('Failed to delete leave record');
// //       }

// //       setLeaveData((prev) => prev.filter((item) => item.leave_id !== selectedRowId));
// //       setOpenDialog(false);
// //     } catch (err) {
// //       setError(err.message);
// //     }
// //   };

// //   const getDisplayValue = (value) => {
// //     if (value === undefined || value === null || value === "") return "N/A";
// //     return value;
// //   };

// //   if (loading) {
// //     return (
// //       <Box p={3} display="flex" justifyContent="center">
// //         <Typography>Loading...</Typography>
// //       </Box>
// //     );
// //   }

// //   if (error) {
// //     return (
// //       <Box p={3} display="flex" justifyContent="center">
// //         <Typography color="error">Error: {error}</Typography>
// //       </Box>
// //     );
// //   }

// //   return (
// //     <Box p={3} sx={{ backgroundColor: '#f8f9fa' }}>
// //       {/* <Grid container justifyContent="center" mb={3}>
// //         <Grid item>
// //           <Paper elevation={3} sx={{ p: 3, textAlign: "center", borderRadius: 2 }}>
// //             <Typography fontSize={14}>Total Leave</Typography>
// //             <Typography variant="h5" fontWeight="bold">{leaveData.length}</Typography>
// //           </Paper>
// //         </Grid>
// //       </Grid> */}
// //       <Grid container justifyContent="center" mb={3}>
// //         <Grid item xs={12} md={6}> {/* Controls width while keeping centered */}
// //           <Paper
// //             elevation={3}
// //             sx={{
// //               p: 3,
// //               textAlign: "center",
// //               borderRadius: 2,
// //               width: '100%',
// //               maxWidth: 500,  // Increased maximum width
// //               margin: '0 auto', // Ensures centering
// //               cursor: 'pointer',
// //               transition: 'all 0.3s ease',
// //               '&:hover': {
// //                 transform: 'translateY(-5px)',
// //                 boxShadow: 6,
// //                 backgroundColor: '#f0f7ff'
// //               },
// //               '&:active': {
// //                 transform: 'translateY(0)'
// //               }
// //             }}
// //             onClick={() => {
// //               console.log('Total leaves clicked');
// //             }}
// //           >
// //             <Typography fontSize={14} sx={{ color: 'text.secondary' }}>Total Leave</Typography>
// //             <Typography
// //               variant="h3"  // Larger text size
// //               fontWeight="bold"
// //               sx={{
// //                 background: 'linear-gradient(45deg, #1976d2, #2196f3)',
// //                 WebkitBackgroundClip: 'text',
// //                 WebkitTextFillColor: 'transparent',
// //                 transition: 'all 0.3s ease',
// //                 '&:hover': {
// //                   transform: 'scale(1.05)'
// //                 }
// //               }}
// //             >
// //               {leaveData.length}
// //             </Typography>
// //           </Paper>
// //         </Grid>
// //       </Grid>

// //       <Paper elevation={2}>
// //         <Box sx={{ p: 2 }}>
// //           <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
// //             <Typography variant="h6" component="div">List All Leave</Typography>
// //             <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
// //               <Typography variant="body2">Search</Typography>
// //               <TextField
// //                 variant="outlined"
// //                 size="small"
// //                 value={searchQuery}
// //                 onChange={(e) => setSearchQuery(e.target.value)}
// //                 placeholder="Search..."
// //               />
// //             </Box>
// //           </Box>
// //         </Box>
// //         <TableContainer>
// //           <Table>
// //             <TableHead sx={{ bgcolor: '#f8f9fa' }}>
// //               <TableRow>
// //                 <TableCell><strong>EMPLOYEE</strong></TableCell>
// //                 <TableCell><strong>LEAVE TYPE</strong></TableCell>
// //                 <TableCell><strong>FROM</strong></TableCell>
// //                 <TableCell><strong>TO</strong></TableCell>
// //                 <TableCell><strong>DAYS</strong></TableCell>
// //                 <TableCell><strong>APPLIED ON</strong></TableCell>
// //               </TableRow>
// //             </TableHead>
// //             <TableBody>
// //               {filteredLeaveData.length > 0 ? (
// //                 filteredLeaveData.slice((page - 1) * rowsPerPage, page * rowsPerPage).map((row) => (
// //                   <TableRow
// //                     key={row.leave_id}
// //                     onMouseEnter={() => setHoveredRow(row.leave_id)}
// //                     onMouseLeave={() => setHoveredRow(null)}
// //                     sx={{ position: "relative" }}
// //                   >
// //                     <TableCell>
// //                       <Typography fontWeight="bold">{getDisplayValue(row.employee_name)}</Typography>
// //                       <Typography variant="caption">{getDisplayValue(row.employee_email)}</Typography>
// //                     </TableCell>
// //                     <TableCell>{getDisplayValue(row.leave_type)}</TableCell>
// //                     <TableCell>{getDisplayValue(row.from_date)}</TableCell>
// //                     <TableCell>{getDisplayValue(row.to_date)}</TableCell>
// //                     <TableCell>{getDisplayValue(row.leave_days)}</TableCell>
// //                     <TableCell>{getDisplayValue(row.created_at)}</TableCell>

// //                     {hoveredRow === row.leave_id && (
// //                       <Box
// //                         sx={{
// //                           position: "absolute",
// //                           top: 0,
// //                           left: 0,
// //                           height: "100%",
// //                           display: "flex",
// //                           alignItems: "center",
// //                           gap: 1,
// //                           px: 1,
// //                           backgroundColor: "rgba(255, 255, 255, 0.8)",
// //                           zIndex: 1,
// //                           borderRadius: 1,
// //                         }}
// //                       >
// //                         <Tooltip title="View">
// //                           <IconButton
// //                             onClick={() => navigate(`/hrms/admindashboard/leavedetails/${row.leave_id}`, {
// //                               state: {
// //                                 leaveRecord: row || {}
// //                               }
// //                             })}
// //                             sx={{ backgroundColor: "#ede9fe", color: "#6366f1", "&:hover": { backgroundColor: "#c7d2fe" } }}
// //                             size="small"
// //                           >
// //                             <Visibility fontSize="small" />
// //                           </IconButton>
// //                         </Tooltip>
// //                         <Tooltip title="Delete">
// //                           <IconButton
// //                             onClick={() => { setSelectedRowId(row.leave_id); setOpenDialog(true); }}
// //                             sx={{ backgroundColor: "#fee2e2", color: "#dc2626", "&:hover": { backgroundColor: "#fecaca" } }}
// //                             size="small"
// //                           >
// //                             <Delete fontSize="small" />
// //                           </IconButton>
// //                         </Tooltip>
// //                       </Box>
// //                     )}
// //                   </TableRow>
// //                 ))
// //               ) : (
// //                 <TableRow>
// //                   <TableCell colSpan={6} align="center">
// //                     <Typography>No leave records found</Typography>
// //                   </TableCell>
// //                 </TableRow>
// //               )}
// //             </TableBody>
// //           </Table>
// //         </TableContainer>
// //         <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
// //           <Typography variant="body2" color="text.secondary">
// //             Showing {(page - 1) * rowsPerPage + 1} to {Math.min(page * rowsPerPage, filteredLeaveData.length)} of {filteredLeaveData.length} records
// //           </Typography>
// //           <Pagination
// //             count={Math.ceil(filteredLeaveData.length / rowsPerPage)}
// //             page={page}
// //             onChange={(event, value) => setPage(value)}
// //             variant="outlined"
// //             shape="rounded"
// //           />
// //         </Box>
// //       </Paper>

// //       <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="xs" fullWidth>
// //         <DialogTitle>Delete Leave Record</DialogTitle>
// //         <DialogContent dividers>
// //           <Typography>Are you sure you want to delete this leave record?</Typography>
// //         </DialogContent>
// //         <DialogActions>
// //           <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
// //           <Button variant="contained" color="error" onClick={handleDelete}>Delete</Button>
// //         </DialogActions>
// //       </Dialog>
// //     </Box>
// //   );
// // };

// // export default LeaveManagementPage;////






// import React, { useState, useEffect, useMemo } from "react";
// import {
//   Box,
//   Paper,
//   Table,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableBody,
//   TableContainer,
//   Typography,
//   TextField,
//   IconButton,
//   Tooltip,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Button,
//   Grid,
//   Pagination,
// } from "@mui/material";
// import { Delete, Visibility } from "@mui/icons-material";
// import { useNavigate } from "react-router-dom";

// const LeaveManagementPage = () => {
//   const [leaveData, setLeaveData] = useState([]);
//   const [totalLeaveCount, setTotalLeaveCount] = useState(0); // State for the total count from API
//   const [page, setPage] = useState(1);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [hoveredRow, setHoveredRow] = useState(null);
//   const [openDialog, setOpenDialog] = useState(false);
//   const [selectedRowId, setSelectedRowId] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchLeaveData = async () => {
//       try {
//         const response = await fetch("https://tdtlworld.com/hrms-backend/api/leave-applications/");
//         if (!response.ok) {
//           throw new Error('Failed to fetch leave data');
//         }
//         const data = await response.json();
//         // Set both the list of leaves and the total count from the API response
//         setLeaveData(data?.leaves || []);
//         setTotalLeaveCount(data?.leave_count || 0);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchLeaveData();
//   }, []);

//   const filteredLeaveData = useMemo(() => {
//     if (!searchQuery) return leaveData;
//     return leaveData.filter((row) => {
//       const query = searchQuery.toLowerCase();
//       return (
//         (row.employee_name?.toLowerCase() || '').includes(query) ||
//         (row.employee_email?.toLowerCase() || '').includes(query) ||
//         (row.leave_type?.toLowerCase() || '').includes(query)
//       );
//     });
//   }, [searchQuery, leaveData]);

//   const handleDelete = async () => {
//     try {
//       const response = await fetch(
//         `https://tdtlworld.com/hrms-backend/api/leave-applications/${selectedRowId}/`,
//         {
//           method: "DELETE",
//         }
//       );

//       if (!response.ok) {
//         throw new Error('Failed to delete leave record');
//       }

//       // Update both the list and the total count to keep UI in sync
//       setLeaveData((prev) => prev.filter((item) => item.leave_id !== selectedRowId));
//       setTotalLeaveCount(prevCount => prevCount - 1);
//       setOpenDialog(false);
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   const getDisplayValue = (value) => {
//     if (value === undefined || value === null || value === "") return "N/A";
//     return value;
//   };

//   if (loading) {
//     return (
//       <Box p={3} display="flex" justifyContent="center">
//         <Typography>Loading...</Typography>
//       </Box>
//     );
//   }

//   if (error) {
//     return (
//       <Box p={3} display="flex" justifyContent="center">
//         <Typography color="error">Error: {error}</Typography>
//       </Box>
//     );
//   }

//   return (
//     <Box p={3} sx={{ backgroundColor: '#f8f9fa' }}>
//       <Grid container justifyContent="center" mb={3}>
//         <Grid item xs={12} md={6}>
//           <Paper
//             elevation={3}
//             sx={{
//               p: 3,
//               textAlign: "center",
//               borderRadius: 2,
//               width: '100%',
//               maxWidth: 500,
//               margin: '0 auto',
//               cursor: 'pointer',
//               transition: 'all 0.3s ease',
//               '&:hover': {
//                 transform: 'translateY(-5px)',
//                 boxShadow: 6,
//                 backgroundColor: '#f0f7ff'
//               },
//               '&:active': {
//                 transform: 'translateY(0)'
//               }
//             }}
//             onClick={() => {
//               console.log('Total leaves clicked');
//             }}
//           >
//             <Typography fontSize={14} sx={{ color: 'text.secondary' }}>Total Leave</Typography>
//             <Typography
//               variant="h3"
//               fontWeight="bold"
//               sx={{
//                 background: 'linear-gradient(45deg, #1976d2, #2196f3)',
//                 WebkitBackgroundClip: 'text',
//                 WebkitTextFillColor: 'transparent',
//                 transition: 'all 0.3s ease',
//                 '&:hover': {
//                   transform: 'scale(1.05)'
//                 }
//               }}
//             >
//               {totalLeaveCount}
//             </Typography>
//           </Paper>
//         </Grid>
//       </Grid>

//       <Paper elevation={2}>
//         <Box sx={{ p: 2 }}>
//           <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
//             <Typography variant="h6" component="div">List All Leave</Typography>
//             <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//               <Typography variant="body2">Search</Typography>
//               <TextField
//                 variant="outlined"
//                 size="small"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 placeholder="Search..."
//               />
//             </Box>
//           </Box>
//         </Box>
//         <TableContainer>
//           <Table>
//             <TableHead sx={{ bgcolor: '#f8f9fa' }}>
//               <TableRow>
//                 <TableCell><strong>EMPLOYEE</strong></TableCell>
//                 <TableCell><strong>LEAVE TYPE</strong></TableCell>
//                 <TableCell><strong>FROM</strong></TableCell>
//                 <TableCell><strong>TO</strong></TableCell>
//                 <TableCell><strong>DAYS</strong></TableCell>
//                 <TableCell><strong>APPLIED ON</strong></TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {filteredLeaveData.length > 0 ? (
//                 filteredLeaveData.slice((page - 1) * rowsPerPage, page * rowsPerPage).map((row) => (
//                   <TableRow
//                     key={row.leave_id}
//                     onMouseEnter={() => setHoveredRow(row.leave_id)}
//                     onMouseLeave={() => setHoveredRow(null)}
//                     sx={{ position: "relative" }}
//                   >
//                     <TableCell>
//                       <Typography fontWeight="bold">{getDisplayValue(row.employee_name)}</Typography>
//                       <Typography variant="caption">{getDisplayValue(row.employee_email)}</Typography>
//                     </TableCell>
//                     <TableCell>{getDisplayValue(row.leave_type)}</TableCell>
//                     <TableCell>{getDisplayValue(row.from_date)}</TableCell>
//                     <TableCell>{getDisplayValue(row.to_date)}</TableCell>
//                     <TableCell>{getDisplayValue(row.leave_days)}</TableCell>
//                     <TableCell>{getDisplayValue(row.created_at)}</TableCell>

//                     {hoveredRow === row.leave_id && (
//                       <Box
//                         sx={{
//                           position: "absolute",
//                           top: 0,
//                           left: 0,
//                           height: "100%",
//                           display: "flex",
//                           alignItems: "center",
//                           gap: 1,
//                           px: 1,
//                           backgroundColor: "rgba(255, 255, 255, 0.8)",
//                           zIndex: 1,
//                           borderRadius: 1,
//                         }}
//                       >
//                         <Tooltip title="View">
//                           <IconButton
//                             onClick={() => navigate(`/hrms/admindashboard/leavedetails/${row.leave_id}`, {
//                               state: {
//                                 leaveRecord: row || {}
//                               }
//                             })}
//                             sx={{ backgroundColor: "#ede9fe", color: "#6366f1", "&:hover": { backgroundColor: "#c7d2fe" } }}
//                             size="small"
//                           >
//                             <Visibility fontSize="small" />
//                           </IconButton>
//                         </Tooltip>
//                         <Tooltip title="Delete">
//                           <IconButton
//                             onClick={() => { setSelectedRowId(row.leave_id); setOpenDialog(true); }}
//                             sx={{ backgroundColor: "#fee2e2", color: "#dc2626", "&:hover": { backgroundColor: "#fecaca" } }}
//                             size="small"
//                           >
//                             <Delete fontSize="small" />
//                           </IconButton>
//                         </Tooltip>
//                       </Box>
//                     )}
//                   </TableRow>
//                 ))
//               ) : (
//                 <TableRow>
//                   <TableCell colSpan={6} align="center">
//                     <Typography>No leave records found</Typography>
//                   </TableCell>
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>
//         <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
//           <Typography variant="body2" color="text.secondary">
//             Showing {(page - 1) * rowsPerPage + 1} to {Math.min(page * rowsPerPage, filteredLeaveData.length)} of {filteredLeaveData.length} records
//           </Typography>
//           <Pagination
//             count={Math.ceil(filteredLeaveData.length / rowsPerPage)}
//             page={page}
//             onChange={(event, value) => setPage(value)}
//             variant="outlined"
//             shape="rounded"
//           />
//         </Box>
//       </Paper>

//       <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="xs" fullWidth>
//         <DialogTitle>Delete Leave Record</DialogTitle>
//         <DialogContent dividers>
//           <Typography>Are you sure you want to delete this leave record?</Typography>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
//           <Button variant="contained" color="error" onClick={handleDelete}>Delete</Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// };

// export default LeaveManagementPage;




















// import React, { useState, useEffect, useMemo, useCallback } from "react";

// import {

//   Box,

//   Paper,

//   Table,

//   TableHead,

//   TableRow,

//   TableCell,

//   TableBody,

//   TableContainer,

//   Typography,

//   TextField,

//   IconButton,

//   Tooltip,

//   Dialog,

//   DialogTitle,

//   DialogContent,

//   DialogActions,

//   Button,

//   Grid,

//   Pagination,

//   useMediaQuery,

//   useTheme,

//   Menu, // Added for mobile actions menu

//   MenuItem, // Added for mobile actions menu

// } from "@mui/material";

// import { Delete, Visibility, MoreVert } from "@mui/icons-material"; // Added MoreVert icon

// import { useNavigate } from "react-router-dom";

 

// const LeaveManagementPage = () => {

//   const [leaveData, setLeaveData] = useState([]);

//   const [totalLeaveCount, setTotalLeaveCount] = useState(0);

//   const [page, setPage] = useState(1);

//   const [rowsPerPage, setRowsPerPage] = useState(10);

//   const [searchQuery, setSearchQuery] = useState("");

//   // Removed hoveredRow as we're changing the action mechanism for mobile

//   const [openDialog, setOpenDialog] = useState(false);

//   const [selectedRowId, setSelectedRowId] = useState(null);

//   const [loading, setLoading] = useState(true);

//   const [error, setError] = useState(null);

//   // State for the anchor element of the mobile action menu

//   const [anchorEl, setAnchorEl] = useState(null);

//   // State to hold the row data for the currently open mobile action menu

//   const [currentMenuRow, setCurrentMenuRow] = useState(null);

 

//   const navigate = useNavigate();

//   const theme = useTheme();

//   // Using 'md' breakpoint for a more significant distinction between desktop and mobile-tablet

//   const isMobile = useMediaQuery(theme.breakpoints.down("md"));

 

//   useEffect(() => {

//     const fetchLeaveData = async () => {

//       try {

//         const response = await fetch("https://tdtlworld.com/hrms-backend/api/leave-applications/");

//         if (!response.ok) {

//           throw new Error('Failed to fetch leave data');

//         }

//         const data = await response.json();

//         setLeaveData(data?.leaves || []);

//         setTotalLeaveCount(data?.leave_count || 0);

//       } catch (err) {

//         setError(err.message);

//       } finally {

//         setLoading(false);

//       }

//     };

 

//     fetchLeaveData();

//   }, []);

 

//   const filteredLeaveData = useMemo(() => {

//     if (!searchQuery) return leaveData;

//     const query = searchQuery.toLowerCase();

//     return leaveData.filter((row) =>

//       (row.employee_name?.toLowerCase() || '').includes(query) ||

//       (row.employee_email?.toLowerCase() || '').includes(query) ||

//       (row.leave_type?.toLowerCase() || '').includes(query)

//     );

//   }, [searchQuery, leaveData]);

 

//   // Handler for opening the mobile actions menu

//   const handleOpenMenu = (event, row) => {

//     setAnchorEl(event.currentTarget);

//     setCurrentMenuRow(row);

//   };

 

//   // Handler for closing the mobile actions menu

//   const handleCloseMenu = () => {

//     setAnchorEl(null);

//     setCurrentMenuRow(null);

//   };

 

//   const handleDelete = useCallback(async () => {

//     try {

//       const response = await fetch(

//         `https://tdtlworld.com/hrms-backend/api/leave-applications/${selectedRowId}/`,

//         {

//           method: "DELETE",

//         }

//       );

 

//       if (!response.ok) {

//         throw new Error('Failed to delete leave record');

//       }

 

//       setLeaveData((prev) => prev.filter((item) => item.leave_id !== selectedRowId));

//       setTotalLeaveCount(prevCount => prevCount - 1);

//       setOpenDialog(false);

//       handleCloseMenu(); // Close the menu if delete was initiated from it

//     } catch (err) {

//       setError(err.message);

//     }

//   }, [selectedRowId]);

 

//   const getDisplayValue = useCallback((value) => {

//     if (value === undefined || value === null || value === "") return "N/A";

//     return value;

//   }, []);

 

//   const handleViewDetails = useCallback((rowId) => {

//     const row = leaveData.find(item => item.leave_id === rowId);

//     navigate(`/hrms/admindashboard/leavedetails/${rowId}`, {

//       state: {

//         leaveRecord: row || {}

//       }

//     });

//     handleCloseMenu(); // Close the menu after navigation

//   }, [navigate, leaveData]);

 

//   if (loading) {

//     return (

//       <Box p={isMobile ? 2 : 3} display="flex" justifyContent="center">

//         <Typography>Loading...</Typography>

//       </Box>

//     );

//   }

 

//   if (error) {

//     return (

//       <Box p={isMobile ? 2 : 3} display="flex" justifyContent="center">

//         <Typography color="error">Error: {error}</Typography>

//       </Box>

//     );

//   }

 

//   return (

//     <Box p={isMobile ? 2 : 3} sx={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>

//       <Grid container justifyContent="center" mb={isMobile ? 2 : 3}>

//         <Grid item xs={12} sm={8} md={6}> {/* Use sm for intermediate screens */}

//           <Paper

//             elevation={3}

//             sx={{

//               p: isMobile ? 2 : 3,

//               textAlign: "center",

//               borderRadius: 2,

//               width: '100%',

//               maxWidth: 500,

//               margin: '0 auto',

//               cursor: 'pointer',

//               transition: 'all 0.3s ease',

//               '&:hover': {

//                 transform: 'translateY(-5px)',

//                 boxShadow: 6,

//                 backgroundColor: '#f0f7ff'

//               },

//               '&:active': {

//                 transform: 'translateY(0)'

//               }

//             }}

//             onClick={() => {

//               console.log('Total leaves clicked');

//             }}

//           >

//             <Typography fontSize={isMobile ? 12 : 14} sx={{ color: 'text.secondary' }}>Total Leave</Typography>

//             <Typography

//               variant="h3"

//               fontWeight="bold"

//               sx={{

//                 background: 'linear-gradient(45deg, #1976d2, #2196f3)',

//                 WebkitBackgroundClip: 'text',

//                 WebkitTextFillColor: 'transparent',

//                 transition: 'all 0.3s ease',

//                 '&:hover': {

//                   transform: 'scale(1.05)'

//                 },

//                 fontSize: isMobile ? '2rem' : '3rem', // Smaller on mobile

//               }}

//             >

//               {totalLeaveCount}

//             </Typography>

//           </Paper>

//         </Grid>

//       </Grid>

 

//       <Paper elevation={2}>

//         <Box sx={{ p: isMobile ? 1.5 : 2 }}>

//           <Box

//             sx={{

//               display: 'flex',

//               justifyContent: 'space-between',

//               alignItems: 'center',

//               flexWrap: 'wrap',

//               gap: isMobile ? 1 : 2, // Smaller gap on mobile

//               mb: isMobile ? 1.5 : 0,

//             }}

//           >

//             <Typography variant="h6" component="div" sx={{ fontSize: isMobile ? '1rem' : '1.25rem' }}>

//               Leave Applications

//             </Typography>

//             <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: isMobile ? '100%' : 'auto' }}>

//               {/* Removed 'Search' text, placeholder is enough */}

//               <TextField

//                 variant="outlined"

//                 size="small"

//                 value={searchQuery}

//                 onChange={(e) => setSearchQuery(e.target.value)}

//                 placeholder="Search..."

//                 fullWidth={isMobile} // Full width on mobile

//               />

//             </Box>

//           </Box>

//         </Box>

//         <TableContainer sx={{ overflowX: 'auto', minWidth: 0 }}> {/* Ensure it scrolls horizontally */}

//           <Table size={isMobile ? "small" : "medium"}> {/* Use smaller table size on mobile */}

//             <TableHead sx={{ bgcolor: '#f8f9fa' }}>

//               <TableRow>

//                 <TableCell sx={{ py: isMobile ? 0.5 : 1.5, px: isMobile ? 0.5 : 2, fontSize: isMobile ? '0.7rem' : '0.8rem' }}><strong>EMPLOYEE</strong></TableCell>

//                 <TableCell sx={{ py: isMobile ? 0.5 : 1.5, px: isMobile ? 0.5 : 2, fontSize: isMobile ? '0.7rem' : '0.8rem' }}><strong>TYPE</strong></TableCell> {/* Abbreviated */}

//                 <TableCell sx={{ py: isMobile ? 0.5 : 1.5, px: isMobile ? 0.5 : 2, fontSize: isMobile ? '0.7rem' : '0.8rem' }}><strong>FROM</strong></TableCell>

//                 <TableCell sx={{ py: isMobile ? 0.5 : 1.5, px: isMobile ? 0.5 : 2, fontSize: isMobile ? '0.7rem' : '0.8rem' }}><strong>TO</strong></TableCell>

//                 <TableCell sx={{ py: isMobile ? 0.5 : 1.5, px: isMobile ? 0.5 : 2, fontSize: isMobile ? '0.7rem' : '0.8rem' }}><strong>DAYS</strong></TableCell>

//                 <TableCell sx={{ py: isMobile ? 0.5 : 1.5, px: isMobile ? 0.5 : 2, fontSize: isMobile ? '0.7rem' : '0.8rem' }}><strong>APPLIED</strong></TableCell> {/* Abbreviated */}

//                 <TableCell sx={{ py: isMobile ? 0.5 : 1.5, px: isMobile ? 0.5 : 2, width: isMobile ? '60px' : 'auto' }}> {/* Fixed width for actions on mobile */}

//                   <strong>{isMobile ? 'ACT' : 'ACTIONS'}</strong> {/* Abbreviated on mobile */}

//                 </TableCell>

//               </TableRow>

//             </TableHead>

//             <TableBody>

//               {filteredLeaveData.length > 0 ? (

//                 filteredLeaveData.slice((page - 1) * rowsPerPage, page * rowsPerPage).map((row) => (

//                   <TableRow

//                     key={row.leave_id}

//                     // Removed onMouseEnter/onMouseLeave, using explicit actions now

//                     sx={{

//                         position: "relative",

//                         '&:hover': {

//                             backgroundColor: !isMobile ? theme.palette.action.hover : 'inherit', // Only show hover effect on non-mobile

//                         }

//                     }}

//                   >

//                     <TableCell sx={{ py: isMobile ? 0.5 : 1.5, px: isMobile ? 0.5 : 2 }}>

//                       <Typography fontWeight="bold" variant={isMobile ? 'body2' : 'body1'} sx={{ fontSize: isMobile ? '0.75rem' : '0.875rem' }}>{getDisplayValue(row.employee_name)}</Typography>

//                       <Typography variant="caption" sx={{ fontSize: isMobile ? '0.65rem' : '0.75rem' }}>{getDisplayValue(row.employee_email)}</Typography>

//                     </TableCell>

//                     <TableCell sx={{ py: isMobile ? 0.5 : 1.5, px: isMobile ? 0.5 : 2, fontSize: isMobile ? '0.75rem' : '0.875rem' }}>{getDisplayValue(row.leave_type)}</TableCell>

//                     <TableCell sx={{ py: isMobile ? 0.5 : 1.5, px: isMobile ? 0.5 : 2, fontSize: isMobile ? '0.75rem' : '0.875rem' }}>{getDisplayValue(row.from_date)}</TableCell>

//                     <TableCell sx={{ py: isMobile ? 0.5 : 1.5, px: isMobile ? 0.5 : 2, fontSize: isMobile ? '0.75rem' : '0.875rem' }}>{getDisplayValue(row.to_date)}</TableCell>

//                     <TableCell sx={{ py: isMobile ? 0.5 : 1.5, px: isMobile ? 0.5 : 2, fontSize: isMobile ? '0.75rem' : '0.875rem' }}>{getDisplayValue(row.leave_days)}</TableCell>

//                     <TableCell sx={{ py: isMobile ? 0.5 : 1.5, px: isMobile ? 0.5 : 2, fontSize: isMobile ? '0.75rem' : '0.875rem' }}>{getDisplayValue(row.created_at)}</TableCell>

//                     <TableCell sx={{ py: isMobile ? 0.5 : 1.5, px: isMobile ? 0.5 : 2 }}>

//                       {isMobile ? (

//                         <IconButton

//                           aria-label="more"

//                           aria-controls="long-menu"

//                           aria-haspopup="true"

//                           onClick={(event) => handleOpenMenu(event, row)}

//                           size="small"

//                         >

//                           <MoreVert fontSize="small" />

//                         </IconButton>

//                       ) : (

//                         <Box sx={{ display: "flex", gap: 1 }}>

//                           <Tooltip title="View">

//                             <IconButton

//                               onClick={() => handleViewDetails(row.leave_id)}

//                               sx={{ backgroundColor: "#ede9fe", color: "#6366f1", "&:hover": { backgroundColor: "#c7d2fe" } }}

//                               size="small"

//                             >

//                               <Visibility fontSize="small" />

//                             </IconButton>

//                           </Tooltip>

//                           <Tooltip title="Delete">

//                             <IconButton

//                               onClick={() => { setSelectedRowId(row.leave_id); setOpenDialog(true); }}

//                               sx={{ backgroundColor: "#fee2e2", color: "#dc2626", "&:hover": { backgroundColor: "#fecaca" } }}

//                               size="small"

//                             >

//                               <Delete fontSize="small" />

//                             </IconButton>

//                           </Tooltip>

//                         </Box>

//                       )}

//                     </TableCell>

//                   </TableRow>

//                 ))

//               ) : (

//                 <TableRow>

//                   <TableCell colSpan={7} align="center" sx={{ py: isMobile ? 1 : 1.5 }}>

//                     <Typography variant={isMobile ? 'body2' : 'body1'}>No leave records found</Typography>

//                   </TableCell>

//                 </TableRow>

//               )}

//             </TableBody>

//           </Table>

//         </TableContainer>

//         <Box sx={{

//           p: isMobile ? 1.5 : 2,

//           display: 'flex',

//           justifyContent: 'space-between',

//           alignItems: 'center',

//           flexWrap: 'wrap',

//           gap: isMobile ? 1 : 2,

//           flexDirection: isMobile ? 'column' : 'row',

//         }}>

//           <Typography variant="body2" color="text.secondary" sx={{ textAlign: isMobile ? 'center' : 'left', fontSize: isMobile ? '0.75rem' : '0.875rem' }}>

//             Showing {(page - 1) * rowsPerPage + 1} to {Math.min(page * rowsPerPage, filteredLeaveData.length)} of {filteredLeaveData.length} records

//           </Typography>

//           <Pagination

//             count={Math.ceil(filteredLeaveData.length / rowsPerPage)}

//             page={page}

//             onChange={(event, value) => setPage(value)}

//             variant="outlined"

//             shape="rounded"

//             size={isMobile ? 'small' : 'medium'}

//           />

//         </Box>

//       </Paper>

 

//       {/* Dialog for Delete Confirmation */}

//       <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="xs" fullWidth>

//         <DialogTitle>Delete Leave Record</DialogTitle>

//         <DialogContent dividers>

//           <Typography>Are you sure you want to delete this leave record?</Typography>

//         </DialogContent>

//         <DialogActions>

//           <Button onClick={() => setOpenDialog(false)}>Cancel</Button>

//           <Button variant="contained" color="error" onClick={handleDelete}>Delete</Button>

//         </DialogActions>

//       </Dialog>

 

//       {/* Mobile Actions Menu */}

//       <Menu

//         id="long-menu"

//         MenuListProps={{

//           'aria-labelledby': 'long-button',

//         }}

//         anchorEl={anchorEl}

//         open={Boolean(anchorEl)}

//         onClose={handleCloseMenu}

//         PaperProps={{

//           style: {

//             maxHeight: 48 * 4.5,

//             width: '20ch',

//           },

//         }}

//       >

//         <MenuItem onClick={() => handleViewDetails(currentMenuRow?.leave_id)}>

//           <Visibility sx={{ mr: 1 }} /> View Details

//         </MenuItem>

//         <MenuItem onClick={() => { setSelectedRowId(currentMenuRow?.leave_id); setOpenDialog(true); }}>

//           <Delete sx={{ mr: 1 }} /> Delete

//         </MenuItem>

//       </Menu>

//     </Box>

//   );

// };

 

// export default LeaveManagementPage;

 














// import React, { useState, useEffect, useMemo, useCallback } from "react";
// import {
//   Box,
//   Paper,
//   Table,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableBody,
//   TableContainer,
//   Typography,
//   TextField,
//   IconButton,
//   Tooltip,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Button,
//   Grid,
//   Pagination,
//   useMediaQuery,
//   useTheme,
//   Menu,
//   MenuItem,
// } from "@mui/material";
// import { Delete, Visibility, MoreVert } from "@mui/icons-material";
// import { useNavigate } from "react-router-dom";

// const LeaveManagementPage = () => {
//   const [leaveData, setLeaveData] = useState([]);
//   const [totalLeaveCount, setTotalLeaveCount] = useState(0);
//   const [page, setPage] = useState(1);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [openDialog, setOpenDialog] = useState(false);
//   const [selectedRowId, setSelectedRowId] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [currentMenuRow, setCurrentMenuRow] = useState(null);

//   const navigate = useNavigate();
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("md"));

//   useEffect(() => {
//     const fetchLeaveData = async () => {
//       try {
//         const response = await fetch("https://tdtlworld.com/hrms-backend/api/leave-applications/");
//         if (!response.ok) {
//           throw new Error('Failed to fetch leave data');
//         }
//         const data = await response.json();
//         setLeaveData(data?.leaves || []);
//         setTotalLeaveCount(data?.leave_count || 0);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchLeaveData();
//   }, []);

//   const filteredLeaveData = useMemo(() => {
//     if (!searchQuery) return leaveData;
//     const query = searchQuery.toLowerCase();
//     return leaveData.filter((row) =>
//       (row.employee_name?.toLowerCase() || '').includes(query) ||
//       (row.employee_email?.toLowerCase() || '').includes(query) ||
//       (row.leave_type?.toLowerCase() || '').includes(query)
//     );
//   }, [searchQuery, leaveData]);

//   const handleOpenMenu = (event, row) => {
//     setAnchorEl(event.currentTarget);
//     setCurrentMenuRow(row);
//   };

//   const handleCloseMenu = () => {
//     setAnchorEl(null);
//     setCurrentMenuRow(null);
//   };

//   const handleDelete = useCallback(async () => {
//     try {
//       const response = await fetch(
//         `https://tdtlworld.com/hrms-backend/api/leave-applications/${selectedRowId}/`,
//         {
//           method: "DELETE",
//         }
//       );

//       if (!response.ok) {
//         throw new Error('Failed to delete leave record');
//       }

//       setLeaveData((prev) => prev.filter((item) => item.leave_id !== selectedRowId));
//       setTotalLeaveCount(prevCount => prevCount - 1);
//       setOpenDialog(false);
//       handleCloseMenu();
//     } catch (err) {
//       setError(err.message);
//     }
//   }, [selectedRowId]);

//   const getDisplayValue = useCallback((value) => {
//     if (value === undefined || value === null || value === "") return "N/A";
//     return value;
//   }, []);

//   const handleViewDetails = useCallback((rowId) => {
//     const row = leaveData.find(item => item.leave_id === rowId);
//     navigate(`/hrms/admindashboard/leavedetails/${rowId}`, {
//       state: {
//         leaveRecord: row || {}
//       }
//     });
//     handleCloseMenu();
//   }, [navigate, leaveData]);

//   if (loading) {
//     return (
//       <Box p={isMobile ? 2 : 3} display="flex" justifyContent="center">
//         <Typography>Loading...</Typography>
//       </Box>
//     );
//   }

//   if (error) {
//     return (
//       <Box p={isMobile ? 2 : 3} display="flex" justifyContent="center">
//         <Typography color="error">Error: {error}</Typography>
//       </Box>
//     );
//   }

//   return (
//     <Box p={isMobile ? 2 : 3} sx={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
//       <Grid container justifyContent="center" mb={isMobile ? 2 : 3}>
//         <Grid item xs={12} sm={8} md={6}>
//           <Paper
//             elevation={3}
//             sx={{
//               p: isMobile ? 2 : 3,
//               textAlign: "center",
//               borderRadius: 2,
//               width: '100%',
//               maxWidth: 500,
//               margin: '0 auto',
//             }}
//           >
//             <Typography fontSize={isMobile ? 12 : 14} sx={{ color: 'text.secondary' }}>Total Leave Applications</Typography>
//             <Typography
//               variant="h3"
//               fontWeight="bold"
//               sx={{
//                 background: 'linear-gradient(45deg, #8C257C, #F58E35)',
//                 WebkitBackgroundClip: 'text',
//                 WebkitTextFillColor: 'transparent',
//                 transition: 'all 0.3s ease',
//                 '&:hover': {
//                   transform: 'scale(1.05)'
//                 },
//                 fontSize: isMobile ? '2.5rem' : '3.5rem',
//               }}
//             >
//               {totalLeaveCount}
//             </Typography>
//           </Paper>
//         </Grid>
//       </Grid>

//       <Paper elevation={2}>
//         {/* Top section with Title and Search Bar */}
//         <Box
//           sx={{
//             p: 2,
//             display: 'flex',
//             justifyContent: 'space-between',
//             alignItems: 'center',
//             flexWrap: 'wrap',
//             gap: 2,
//           }}
//         >
//           <Typography variant="h6" component="div">
//             Leave Applications
//           </Typography>
//           <TextField
//             variant="outlined"
//             size="small"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             placeholder="Search..."
//             sx={{ width: isMobile ? '100%' : '250px' }}
//           />
//         </Box>

//         <TableContainer>
//           <Table size={isMobile ? "small" : "medium"}>
//             <TableHead sx={{ bgcolor: '#8C257C' }}>
//               <TableRow>
//                 {/* 1. Added Sr. No. Header */}
//                 <TableCell sx={{ color: 'white', width: '60px' }}><strong>SR. NO.</strong></TableCell>
//                 <TableCell sx={{ color: 'white' }}><strong>EMPLOYEE</strong></TableCell>
//                 <TableCell sx={{ color: 'white' }}><strong>LEAVE TYPE</strong></TableCell>
//                 <TableCell sx={{ color: 'white' }}><strong>FROM</strong></TableCell>
//                 <TableCell sx={{ color: 'white' }}><strong>TO</strong></TableCell>
//                 <TableCell sx={{ color: 'white' }}><strong>DAYS</strong></TableCell>
//                 <TableCell sx={{ color: 'white' }}><strong>APPLIED ON</strong></TableCell>
//                 <TableCell sx={{ color: 'white' }} align="center">
//                   <strong>ACTIONS</strong>
//                 </TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {filteredLeaveData.length > 0 ? (
//                 filteredLeaveData
//                   .slice((page - 1) * rowsPerPage, page * rowsPerPage)
//                   .map((row, index) => (
//                     <TableRow
//                       key={row.leave_id}
//                       sx={{ '&:hover': { backgroundColor: theme.palette.action.hover } }}
//                     >
//                       {/* 2. Calculated and rendered Sr. No. for each row */}
//                       <TableCell>{(page - 1) * rowsPerPage + index + 1}</TableCell>
//                       <TableCell>
//                         <Typography fontWeight="bold" variant="body2">{getDisplayValue(row.employee_name)}</Typography>
//                         <Typography variant="caption" color="text.secondary">{getDisplayValue(row.employee_email)}</Typography>
//                       </TableCell>
//                       <TableCell>{getDisplayValue(row.leave_type)}</TableCell>
//                       <TableCell>{getDisplayValue(row.from_date)}</TableCell>
//                       <TableCell>{getDisplayValue(row.to_date)}</TableCell>
//                       <TableCell>{getDisplayValue(row.leave_days)}</TableCell>
//                       <TableCell>{getDisplayValue(new Date(row.created_at).toLocaleDateString())}</TableCell>
//                       <TableCell align="center">
//                         {isMobile ? (
//                           <IconButton
//                             aria-label="more actions"
//                             onClick={(event) => handleOpenMenu(event, row)}
//                             size="small"
//                           >
//                             <MoreVert fontSize="small" />
//                           </IconButton>
//                         ) : (
//                           <Box sx={{ display: "flex", gap: 1, justifyContent: 'center' }}>
//                             <Tooltip title="View">
//                               <IconButton
//                                 onClick={() => handleViewDetails(row.leave_id)}
//                                 sx={{ backgroundColor: "#FEF3E9", color: "#F58E35", "&:hover": { backgroundColor: "#FCE6D0" } }}
//                                 size="small"
//                               >
//                                 <Visibility fontSize="small" />
//                               </IconButton>
//                             </Tooltip>
//                             <Tooltip title="Delete">
//                               <IconButton
//                                 onClick={() => { setSelectedRowId(row.leave_id); setOpenDialog(true); }}
//                                 sx={{ backgroundColor: "#fee2e2", color: "#dc2626", "&:hover": { backgroundColor: "#fecaca" } }}
//                                 size="small"
//                               >
//                                 <Delete fontSize="small" />
//                               </IconButton>
//                             </Tooltip>
//                           </Box>
//                         )}
//                       </TableCell>
//                     </TableRow>
//                   ))
//               ) : (
//                 <TableRow>
//                   {/* 3. Updated colSpan for the "No records" message */}
//                   <TableCell colSpan={8} align="center">
//                     <Typography>No leave records found</Typography>
//                   </TableCell>
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>

//         <Box
//           sx={{
//             p: 2,
//             display: 'flex',
//             justifyContent: 'space-between',
//             alignItems: 'center',
//             flexWrap: 'wrap',
//             gap: 2,
//           }}
//         >
//           <Typography variant="body2" color="text.secondary">
//             Showing {(page - 1) * rowsPerPage + 1} to {Math.min(page * rowsPerPage, filteredLeaveData.length)} of {filteredLeaveData.length} records
//           </Typography>
//           <Pagination
//             count={Math.ceil(filteredLeaveData.length / rowsPerPage)}
//             page={page}
//             onChange={(event, value) => setPage(value)}
//             variant="outlined"
//             shape="rounded"
//             size={isMobile ? 'small' : 'medium'}
//             sx={{
//               '& .Mui-selected': {
//                 backgroundColor: '#8C257C',
//                 color: 'white',
//                 '&:hover': {
//                   backgroundColor: '#7a1f6d',
//                 },
//               },
//             }}
//           />
//         </Box>
//       </Paper>

//       <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="xs" fullWidth>
//         <DialogTitle>Confirm Deletion</DialogTitle>
//         <DialogContent dividers>
//           <Typography>Are you sure you want to delete this leave record? This action cannot be undone.</Typography>
//         </DialogContent>
//         <DialogActions sx={{ p: 2 }}>
//           <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
//           <Button
//             variant="contained"
//             onClick={handleDelete}
//             sx={{
//               backgroundColor: '#F58E35',
//               color: 'white',
//               '&:hover': { backgroundColor: '#E47E21' }
//             }}
//           >
//             Delete
//           </Button>
//         </DialogActions>
//       </Dialog>

//       <Menu
//         id="actions-menu"
//         anchorEl={anchorEl}
//         open={Boolean(anchorEl)}
//         onClose={handleCloseMenu}
//       >
//         <MenuItem onClick={() => handleViewDetails(currentMenuRow?.leave_id)}>
//           <Visibility sx={{ mr: 1.5, color: '#F58E35' }} fontSize="small" /> View Details
//         </MenuItem>
//         <MenuItem onClick={() => { setSelectedRowId(currentMenuRow?.leave_id); setOpenDialog(true); }}>
//           <Delete sx={{ mr: 1.5, color: 'error.main' }} fontSize="small" /> Delete
//         </MenuItem>
//       </Menu>
//     </Box>
//   );
// };

// export default LeaveManagementPage;













import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  Box,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Typography,
  TextField,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  useMediaQuery,
  useTheme,
  Skeleton,
  InputAdornment,
  TablePagination,
  CircularProgress,
  Chip, // Imported Chip for the status column
} from "@mui/material";
import {
  Delete,
  Visibility,
  Add,
  Search as SearchIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const LeaveManagementPage = () => {
  const [leaveData, setLeaveData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Re-added state for status counts
  const [totalLeaveCount, setTotalLeaveCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);
  const [approvedCount, setApprovedCount] = useState(0);
  const [rejectedCount, setRejectedCount] = useState(0);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");

  const [openDialog, setOpenDialog] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
 
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const fetchLeaveData = async () => {
      setLoading(true);
      try {
        const response = await fetch("https://tdtlworld.com/hrms-backend/api/leave-applications/");
        if (!response.ok) {
          throw new Error('Failed to fetch leave applications');
        }
        const data = await response.json();
        const leaves = data?.leaves || [];
        setLeaveData(leaves);
       
        // Re-added logic to calculate counts
        setTotalLeaveCount(data?.leave_count || leaves.length);

        const counts = leaves.reduce((acc, leave) => {
          switch (leave.line_manager_status) {
            case 0: acc.pending++; break;
            case 1: acc.approved++; break;
            case 2: acc.rejected++; break;
            default: break;
          }
          return acc;
        }, { pending: 0, approved: 0, rejected: 0 });

        setPendingCount(counts.pending);
        setApprovedCount(counts.approved);
        setRejectedCount(counts.rejected);

      } catch (err) {
        setError(err.message);
        Swal.fire({
          icon: 'error',
          title: 'Fetch Error',
          text: err.message,
          timer: 3000,
          showConfirmButton: false,
        });
      } finally {
        setLoading(false);
      }
    };
    fetchLeaveData();
  }, []);

  const filteredLeaveData = useMemo(() => {
    if (!searchQuery) return leaveData;
    const query = searchQuery.toLowerCase();
    return leaveData.filter(
      (row) =>
        row.employee_name?.toLowerCase().includes(query) ||
        row.leave_type?.toLowerCase().includes(query)
    );
  }, [searchQuery, leaveData]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleAddClick = () => setOpenDialog(true);
  const handleCloseDialog = () => !isSubmitting && setOpenDialog(false);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    handleCloseDialog();
    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: 'New leave application added!',
      timer: 3000,
      showConfirmButton: false,
    });
  };
 
  const handleDelete = (rowId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "This action cannot be undone!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#8C257C',
      cancelButtonColor: '#757575',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        const deletedLeave = leaveData.find(item => item.leave_id === rowId);
       
        // Update counts when deleting
        if (deletedLeave) {
          switch (deletedLeave.line_manager_status) {
            case 0: setPendingCount(prev => prev - 1); break;
            case 1: setApprovedCount(prev => prev - 1); break;
            case 2: setRejectedCount(prev => prev - 1); break;
            default: break;
          }
        }
       
        setLeaveData((prev) => prev.filter((item) => item.leave_id !== rowId));
        setTotalLeaveCount(prev => prev - 1);

        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: 'The leave record has been removed.',
          timer: 3000,
          showConfirmButton: false,
        });
      }
    });
  };
 
  const handleViewDetails = (rowId) => {
    const row = leaveData.find((item) => item.leave_id === rowId);
    navigate(`/hrms/admindashboard/leavedetails/${rowId}`, {
      state: { leaveRecord: row || {} },
    });
  };

  const getDisplayValue = (value) => value || "N/A";

  const renderStatusChip = (status) => {
    const statusMap = {
      0: { label: "Pending", color: "warning" },
      1: { label: "Approved", color: "success" },
      2: { label: "Rejected", color: "error" },
    };
    const { label = "Unknown", color = "default" } = statusMap[status] || {};
    return <Chip label={label} color={color} size="small" sx={{ fontWeight: 'bold' }} />;
  };
 
  const StatCard = ({ title, count, color }) => (
    <Paper elevation={2} sx={{ p: 2, textAlign: 'center', borderRadius: 2 }}>
      <Typography variant="body2" color="text.secondary">{title}</Typography>
      <Typography variant="h5" fontWeight="bold" sx={{ color }}>
        {loading ? <Skeleton width={40} sx={{ margin: 'auto' }} /> : count}
      </Typography>
    </Paper>
  );

  const paginatedData = filteredLeaveData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Box component={Paper} p={3}>
      <Typography variant="h4" sx={{ color: "#8C257C", fontWeight: "bold", mb: 5 }}>
        Leave Request
      </Typography>

      {/* Re-added Status Cards */}
      <Grid container spacing={2} sx={{ mb: 3,  }}>
        <Grid item xs={6} sm={3}><StatCard title="Total Applications" count={totalLeaveCount} color="#8C257C" /></Grid>
        <Grid item xs={6} sm={3}><StatCard title="Approved" count={approvedCount} color="green" /></Grid>
        <Grid item xs={6} sm={3}><StatCard title="Pending" count={pendingCount} color="#F58E35" /></Grid>
        <Grid item xs={6} sm={3}><StatCard title="Rejected" count={rejectedCount} color="red" /></Grid>
      </Grid>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: isMobile ? "column" : "row",
          gap: 2,
          mb: 2,
        }}
      >
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={handleAddClick}
          sx={{
            backgroundColor: "#8C257C", color: "white", alignSelf: isMobile ? 'stretch' : 'auto',
            "&:hover": { backgroundColor: "#6d1d60" },
          }}
        >
          Add New
        </Button>
        <TextField
          size="small" placeholder="Search ..." value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{ startAdornment: (<InputAdornment position="start"><SearchIcon /></InputAdornment>) }}
          sx={{ width: isMobile ? "100%" : "auto" }}
        />
      </Box>

      <TableContainer>
        <Table sx={{ minWidth: '100%', whiteSpace: 'nowrap' }}>
          <TableHead sx={{ bgcolor: "#8C257C" }}>
            <TableRow>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>SR. NO.</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>EMPLOYEE</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>LEAVE TYPE</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>DATES</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>DAYS</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>STATUS</TableCell>
              <TableCell align="center" sx={{ color: "white", fontWeight: "bold" }}>ACTIONS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              Array.from(new Array(rowsPerPage)).map((_, index) => (
                <TableRow key={index}>
                  {[...Array(7)].map((_, i) => (<TableCell key={i}><Skeleton variant="text" /></TableCell>))}
                </TableRow>
              ))
            ) : paginatedData.length > 0 ? (
              paginatedData.map((row, index) => (
                <TableRow key={row.leave_id} hover>
                  <TableCell sx={{ fontSize: '0.95rem' }}>{page * rowsPerPage + index + 1}</TableCell>
                  <TableCell sx={{ fontSize: '0.95rem' }}>
                    <Typography fontWeight="bold" variant="body2">{getDisplayValue(row.employee_name)}</Typography>
                    <Typography variant="caption" color="text.secondary">{getDisplayValue(row.employee_email)}</Typography>
                  </TableCell>
                  <TableCell sx={{ fontSize: '0.95rem' }}>{getDisplayValue(row.leave_type)}</TableCell>
                  <TableCell sx={{ fontSize: '0.95rem' }}>{`${getDisplayValue(row.from_date)} to ${getDisplayValue(row.to_date)}`}</TableCell>
                  <TableCell sx={{ fontSize: '0.95rem' }}>{getDisplayValue(row.leave_days)}</TableCell>
                  <TableCell sx={{ fontSize: '0.95rem' }}>{renderStatusChip(row.line_manager_status)}</TableCell>
                  <TableCell>
                    <Box sx={{ display: "flex", justifyContent: "center", gap: 0.5 }}>
                      <Tooltip title="View"><IconButton size="small" onClick={() => handleViewDetails(row.leave_id)}><Visibility sx={{ color: '#F58E35' }} /></IconButton></Tooltip>
                      <Tooltip title="Delete"><IconButton size="small" onClick={() => handleDelete(row.leave_id)}><Delete color="error" /></IconButton></Tooltip>
                    </Box>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow><TableCell colSpan={7} align="center"><Typography>No records found</Typography></TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 15, 25]} component="div" count={filteredLeaveData.length}
        rowsPerPage={rowsPerPage} page={page} onPageChange={handleChangePage} onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{ color: '#8C257C', '& .MuiSvgIcon-root': { color: '#8C257C' }, '& .Mui-disabled .MuiSvgIcon-root': { color: 'rgba(0, 0, 0, 0.26)' }}}
      />

      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="sm">
        <DialogTitle sx={{ color: "#8C257C", fontWeight: "bold" }}>New Leave Application</DialogTitle>
        <Box component="form" onSubmit={handleFormSubmit}>
          <DialogContent>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12}><TextField fullWidth label="Application Title" name="title" required /></Grid>
              <Grid item xs={12}><TextField fullWidth label="Description" name="description" multiline rows={4} required /></Grid>
              <Grid item xs={12}><Button variant="outlined" component="label" fullWidth>Upload Attachment (PDF)<input type="file" accept=".pdf" hidden /></Button></Grid>
            </Grid>
          </DialogContent>
          <DialogActions sx={{ p: '16px 24px' }}>
            <Button onClick={handleCloseDialog} disabled={isSubmitting} sx={{ color: "#757575", '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' } }}>Cancel</Button>
            <Button type="submit" variant="contained" disabled={isSubmitting} sx={{ backgroundColor: "#8C257C", color: "white", "&:hover": { backgroundColor: "#6d1d60" }, minWidth: 90 }}>
              {isSubmitting ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Save'}
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Box>
  );
};

export default LeaveManagementPage;