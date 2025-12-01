// // import React, { useState, useMemo, useEffect, useCallback } from 'react';
// // import {
// //   Box, Typography, Button, Paper, Card, CardContent, Grid, Radio,
// //   Divider, FormControl, Select, MenuItem, TextField, IconButton, InputLabel, CircularProgress, Alert
// // } from '@mui/material';
// // import {
// //   Add as AddIcon,
// //   AccessTime as AccessTimeIcon,
// //   LockOutlined as LockOutlinedIcon,
// //   Edit as EditIcon,
// //   Delete as DeleteIcon,
// //   Visibility as VisibilityIcon,
// //   CalendarTodayOutlined as CalendarIcon,
// //   PersonOutline as PersonIcon,
// //   CheckCircle as CheckCircleIcon,
// //   Leaderboard as LeaderboardIcon,
// //   ChatBubbleOutline as ReplyIcon,
// //   NoteAddOutlined as NoteIcon,
// //   AttachFileOutlined as AttachIcon,
// //   ArrowBack as ArrowBackIcon,
// // } from '@mui/icons-material';

// // // Chart.js imports
// // import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
// // import { Pie, Doughnut } from 'react-chartjs-2';
// // import ChartDataLabels from 'chartjs-plugin-datalabels';

// // // Rich Text Editor imports
// // import ReactQuill from 'react-quill';
// // import 'react-quill/dist/quill.snow.css';

// // ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

// // // --- API & CONFIGURATION ---
// // const API_BASE_URL = 'https://tdtlworld.com/hrms-backend/api/support-tickets';
// // // IMPORTANT: This should be replaced with the actual logged-in user's ID from your auth system
// // const LOGGED_IN_EMPLOYEE_ID = localStorage.getItem("loggedInUser");
// // console.log("Logged in employee ID:", LOGGED_IN_EMPLOYEE_ID);
 

// // // --- HELPER FUNCTION ---
// // // Transforms API ticket data into the format the UI components expect
// // const transformApiTicket = (apiTicket) => {
// //   const formatDate = (dateString) => {
// //     if (!dateString) return 'N/A';
// //     const date = new Date(dateString);
// //     const day = String(date.getDate()).padStart(2, '0');
// //     const month = String(date.getMonth() + 1).padStart(2, '0');
// //     const year = date.getFullYear();
// //     return `${day}-${month}-${year}`;
// //   };

// //   const formatStatus = (statusCode) => {
// //     return statusCode === 0 ? 'Open' : 'Closed';
// //   };

// //   return {
// //     id: apiTicket.id, // The numeric ID from the API
// //     displayId: `#${String(apiTicket.id).padStart(6, '0')}`,
// //     subject: apiTicket.subject,
// //     employee: apiTicket.employee_id,
// //     subSubject: null,
// //     assignedTo: 'Support Team', // Default value as it's not in the API response
// //     department: 'N/A', // Default value
// //     date: formatDate(apiTicket.created_at),
// //     priority: apiTicket.priority,
// //     status: formatStatus(apiTicket.ticket_status),
// //     description: apiTicket.description || '',
// //   };
// // };

// // // ===================================================================================
// // //  COMPONENT 1: TICKET LIST & DASHBOARD VIEW
// // // ===================================================================================
// // const TicketDashboard = ({ tickets, onTicketSelect, onShowCreateView, loading, error }) => {
// //   const { priorityData, statusData } = useMemo(() => {
// //     const counts = { High: 0, Low: 0, Medium: 0, Critical: 0, Open: 0, Closed: 0 };
// //     (tickets || []).forEach(ticket => {
// //       if (ticket.priority in counts) counts[ticket.priority]++;
// //       if (ticket.status in counts) counts[ticket.status]++;
// //     });
// //     return {
// //       priorityData: {
// //         labels: ['Low', 'High', 'Medium', 'Critical'],
// //         datasets: [{ data: [counts.Low, counts.High, counts.Medium, counts.Critical], backgroundColor: ['#F9A825', '#F57F17', '#FDD835', '#FFF59D'] }],
// //       },
// //       statusData: {
// //         labels: ['Open', 'Closed'],
// //         datasets: [{ data: [counts.Open, counts.Closed], backgroundColor: ['#2196F3', '#4CAF50'] }],
// //       }
// //     };
// //   }, [tickets]);

// //   const chartOptions = { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'right' }, datalabels: { display: false } } };
// //   const doughnutOptions = { ...chartOptions, cutout: '70%' };
// //   const getPriorityColor = (p) => p?.toLowerCase() === 'high' ? '#FF6347' : '#FFA500';

// //   const renderTicketList = () => {
// //     if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}><CircularProgress /></Box>;
// //     if (error) return <Alert severity="error" sx={{ m: 2 }}>{error}</Alert>;
// //     if (!tickets || tickets.length === 0) return <Typography sx={{ textAlign: 'center', p: 5, color: 'text.secondary' }}>No tickets found.</Typography>;
// //     return tickets.map((ticket) => (
// //       <Card key={ticket.id} elevation={1} sx={{ display: 'flex', alignItems: 'center', mb: 2, p: 1 }}>
// //         <Box sx={{ px: 2 }}><AccessTimeIcon sx={{ fontSize: 40, color: 'primary.main' }} /></Box>
// //         <CardContent sx={{ flexGrow: 1, p: '12px !important' }}>
// //           <Typography variant="h6" component="div" fontWeight="500">{ticket.subject}</Typography>
// //           <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 2, color: 'text.secondary', fontSize: '0.875rem', my: 1.5 }}>
// //             <Typography variant="body2" fontWeight="bold">{ticket.displayId}</Typography>
// //             <Box sx={{ display: 'flex', alignItems: 'center' }}><CalendarIcon sx={{ fontSize: '1rem', mr: 0.5 }} /> {ticket.date}</Box>
// //             <Typography variant="body2" sx={{ color: getPriorityColor(ticket.priority), fontWeight: '500' }}>{ticket.priority}</Typography>
// //             <Typography variant="body2" sx={{ color: '#FFA500', fontWeight: '500' }}>{ticket.status}</Typography>
// //           </Box>
// //         </CardContent>
// //         <Box><Radio name="ticket-radio-button" onChange={() => onTicketSelect(ticket.id)} /></Box>
// //       </Card>
// //     ));
// //   };

// //   return (
// //     <Grid container spacing={3}>
// //       <Grid item xs={12} lg={8}>
// //         <Paper elevation={0} sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
// //           <Typography variant="h6" fontWeight="bold">Tickets List</Typography>
// //           <Button variant="contained" startIcon={<AddIcon />} sx={{ bgcolor: '#673ab7', '&:hover': { bgcolor: '#5e35b1' }, textTransform: 'none' }} onClick={onShowCreateView}>Create Ticket</Button>
// //         </Paper>
// //         {renderTicketList()}
// //       </Grid>
// //       <Grid item xs={12} lg={4}>
// //         <Paper elevation={0} sx={{ p: 2, mb: 3, height: '350px' }}><Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>Ticket Priority</Typography><Box sx={{ height: 'calc(100% - 48px)' }}><Pie data={priorityData} options={chartOptions} /></Box></Paper>
// //         <Paper elevation={0} sx={{ p: 2, height: '350px' }}><Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>Ticket Status</Typography><Box sx={{ height: 'calc(100% - 48px)' }}><Doughnut data={statusData} options={doughnutOptions} /></Box></Paper>
// //       </Grid>
// //     </Grid>
// //   );
// // };

// // // ===================================================================================
// // //  COMPONENT 2: TICKET DETAIL VIEW (RESTORED STATUS/REMARKS FIELDS)
// // // ===================================================================================
// // const DetailRow = ({ label, value, icon }) => (
// //   <><Grid item xs={5}><Typography variant="subtitle2" color="text.secondary">{label}</Typography></Grid><Grid item xs={7}><Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', fontWeight: 500 }}>{icon && React.cloneElement(icon, { sx: { mr: 1 } })}{value}</Typography></Grid><Grid item xs={12}><Divider sx={{ my: 1.5 }} /></Grid></>
// // );

// // const TicketDetailView = ({ ticket, onBackToList }) => {
// //   const [status, setStatus] = useState('Closed');
// //   const [remarks, setRemarks] = useState('This is a remark.');

// //   if (!ticket) return <Typography>No ticket selected or not found.</Typography>;

// //   return (
// //     <Grid container spacing={3}>
// //       {/* Left Panel: Ticket Details */}
// //       <Grid item xs={12} md={4}>
// //         <Paper elevation={2} sx={{ p: 2 }}>
// //           <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
// //             <IconButton onClick={onBackToList} sx={{ mr: 1 }}><ArrowBackIcon /></IconButton>
// //             <Typography variant="h6" fontWeight="bold">Ticket Details</Typography>
// //           </Box>
// //           <Box sx={{ bgcolor: '#e8f5e9', color: '#388e3c', p: 1.5, borderRadius: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2, fontWeight: 'bold' }}>
// //             <CheckCircleIcon sx={{ mr: 1 }} /> TICKET {ticket.displayId}
// //           </Box>
// //           <Grid container alignItems="center" spacing={1}>
// //             <DetailRow label="Subject" value={ticket.subject} />
// //             <DetailRow label="Employee" value={ticket.employee} icon={<PersonIcon />} />
// //             <DetailRow label="Priority" value={ticket.priority} />
// //             <DetailRow label="Department" value={ticket.department} />
// //             <DetailRow label="Assigned to" value={ticket.assignedTo} />
// //             <DetailRow label="Created at" value={ticket.date} icon={<CalendarIcon />} />
// //           </Grid>
// //           {/* Status and Remarks fields are back */}
// //           <Box sx={{ mt: 2 }}>
// //             <Typography variant="subtitle2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
// //               <LeaderboardIcon sx={{ mr: 1 }} /> Status *
// //             </Typography>
// //             <FormControl fullWidth size="small">
// //               <Select value={status} onChange={(e) => setStatus(e.target.value)}>
// //                 <MenuItem value="Open">Open</MenuItem>
// //                 <MenuItem value="Closed">Closed</MenuItem>
// //               </Select>
// //             </FormControl>
// //           </Box>
// //           <Box sx={{ mt: 2 }}>
// //             <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>Remarks *</Typography>
// //             <TextField fullWidth multiline rows={4} value={remarks} onChange={(e) => setRemarks(e.target.value)} />
// //           </Box>
// //           {/* "Update Status" button is removed */}
// //         </Paper>
// //       </Grid>

// //       {/* Right Panel: Actions and Ticket Info */}
// //       <Grid item xs={12} md={8}>
// //         <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
// //           <Button variant="outlined" startIcon={<ReplyIcon />}>Post a Reply</Button>
// //           {/* "Post a Note" and "Attach Files" buttons are removed */}
// //         </Box>
// //         <Paper elevation={2} sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
// //           <LockOutlinedIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
// //           <Typography>Ticket {ticket.displayId}</Typography>
// //         </Paper>
// //       </Grid>
// //     </Grid>
// //   );
// // };


// // // ===================================================================================
// // //  COMPONENT 3: CREATE TICKET VIEW (NO CHANGES)
// // // ===================================================================================
// // const CreateTicketView = ({ onCreateTicket, onBackToList }) => {
// //   // State for form fields
// //   const [subject, setSubject] = useState('');
// //   const [priority, setPriority] = useState('');
// //   const [department, setDepartment] = useState('');
// //   const [employee, setEmployee] = useState('');
// //   const [description, setDescription] = useState('');
// //   const [isSubmitting, setIsSubmitting] = useState(false);

// //   // Form submission handler
// //   const handleSubmit = async () => {
// //     if (!subject || !priority || !department || !employee) {
// //       alert('Please fill all required fields marked with *');
// //       return;
// //     }
// //     setIsSubmitting(true);
// //     try {
// //       await onCreateTicket({ subject, priority, department, employee, description });
// //     } catch (error) {
// //       // Parent component handles error alerts
// //     } finally {
// //       setIsSubmitting(false);
// //     }
// //   };

// //   // Helper component for consistent labels
// //   const FormLabel = ({ children, required = false }) => (
// //     <Typography component="label" sx={{ display: 'block', mb: 1, fontWeight: 500 }}>
// //       {children} {required && <span style={{ color: 'red' }}>*</span>}
// //     </Typography>
// //   );

// //   return (
// //     <Paper elevation={1} sx={{ p: { xs: 2, md: 4 } }}>
// //       <Typography variant="h6" sx={{ mb: 4 }}>
// //         Create Ticket
// //       </Typography>

// //       <Grid container spacing={3}>
// //         <Grid item xs={12} md={6}>
// //           <FormLabel required>Subject</FormLabel>
// //           <TextField
// //             fullWidth
// //             placeholder="Subject"
// //             value={subject}
// //             onChange={(e) => setSubject(e.target.value)}
// //           />
// //         </Grid>

// //         <Grid item xs={12} md={6}>
// //           <FormLabel required>Priority</FormLabel>
// //           <FormControl fullWidth>
// //             <Select
// //               displayEmpty
// //               value={priority}
// //               onChange={(e) => setPriority(e.target.value)}
// //               renderValue={(selected) => selected || <em>Priority</em>}
// //             >
// //               <MenuItem disabled value=""><em>Priority</em></MenuItem>
// //               <MenuItem value="Low">Low</MenuItem>
// //               <MenuItem value="Medium">Medium</MenuItem>
// //               <MenuItem value="High">High</MenuItem>
// //             </Select>
// //           </FormControl>
// //         </Grid>

// //         <Grid item xs={12} md={6}>
// //           <FormLabel required>Department</FormLabel>
// //           <FormControl fullWidth>
// //             <Select
// //               displayEmpty
// //               value={department}
// //               onChange={(e) => setDepartment(e.target.value)}
// //               renderValue={(selected) => selected || <em>Department</em>}
// //             >
// //               <MenuItem disabled value=""><em>Department</em></MenuItem>
// //               <MenuItem value="HR">HR</MenuItem>
// //               <MenuItem value="IT">IT</MenuItem>
// //               <MenuItem value="Finance">Finance</MenuItem>
// //             </Select>
// //           </FormControl>
// //         </Grid>

// //         <Grid item xs={12} md={6}>
// //           <FormLabel required>Employee</FormLabel>
// //           <FormControl fullWidth>
// //             <Select
// //               displayEmpty
// //               value={employee}
// //               onChange={(e) => setEmployee(e.target.value)}
// //               renderValue={(selected) => {
// //                 if (!selected) {
// //                   return <Typography sx={{ color: 'text.secondary' }}>Choose an Employee</Typography>;
// //                 }
// //                 return selected;
// //               }}
// //               sx={{ backgroundColor: '#f0f0f0' }}
// //             >
// //               <MenuItem disabled value="">
// //                 <em style={{ color: 'grey' }}>Choose an Employee</em>
// //               </MenuItem>
// //               <MenuItem value="John Doe">John Doe</MenuItem>
// //               <MenuItem value="Jane Smith">Jane Smith</MenuItem>
// //             </Select>
// //           </FormControl>
// //         </Grid>

// //         <Grid item xs={12}>
// //           <FormLabel>Description</FormLabel>
// //           <Box sx={{
// //             '.ql-toolbar': { borderColor: 'rgba(0, 0, 0, 0.23)', borderTopLeftRadius: '4px', borderTopRightRadius: '4px' },
// //             '.ql-container': { borderColor: 'rgba(0, 0, 0, 0.23)', borderBottomLeftRadius: '4px', borderBottomRightRadius: '4px', minHeight: '200px' },
// //           }}>
// //             <ReactQuill
// //               theme="snow"
// //               value={description}
// //               onChange={setDescription}
// //             />
// //           </Box>
// //         </Grid>
// //       </Grid>

// //       <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4, pt: 2 }}>
// //         <Button
// //           variant="contained"
// //           onClick={handleSubmit}
// //           disabled={isSubmitting}
// //           sx={{
// //             backgroundColor: '#6633ff',
// //             '&:hover': { backgroundColor: '#5229cc' },
// //             textTransform: 'none',
// //             fontSize: '1rem',
// //             padding: '8px 24px',
// //           }}
// //         >
// //           {isSubmitting ? <CircularProgress size={24} color="inherit" /> : 'Create Ticket'}
// //         </Button>
// //       </Box>
// //     </Paper>
// //   );
// // };


// // // ===================================================================================
// // //  COMPONENT 4: MAIN HELPDESK SYSTEM (PARENT)
// // // ===================================================================================
// // const HelpdeskSystem = () => {
// //   const [viewMode, setViewMode] = useState('list');
// //   const [selectedTicketId, setSelectedTicketId] = useState(null);
// //   const [tickets, setTickets] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);

// //   const fetchTickets = useCallback(async () => {
// //     setLoading(true);
// //     setError(null);
// //     try {
// //       const response = await fetch(`${API_BASE_URL}/${LOGGED_IN_EMPLOYEE_ID}/`);
// //       if (!response.ok) throw new Error(`Network response was not ok: ${response.statusText}`);
// //       const data = await response.json();
// //       setTickets(Array.isArray(data) ? data.map(transformApiTicket) : []);
// //     } catch (err) {
// //       setError(err.message);
// //       console.error("Fetch tickets error:", err);
// //     } finally {
// //       setLoading(false);
// //     }
// //   }, []);

// //   useEffect(() => {
// //     fetchTickets();
// //   }, [fetchTickets]);

// //   const handleCreateTicket = async (newTicketData) => {
// //     const payload = {
// //       subject: newTicketData.subject,
// //       priority: newTicketData.priority,
// //       description: newTicketData.description,
// //       ticket_status: 0, // Default to 'Open'
// //     };
// //     try {
// //       const response = await fetch(`${API_BASE_URL}/${LOGGED_IN_EMPLOYEE_ID}/`, {
// //         method: 'POST',
// //         headers: { 'Content-Type': 'application/json' },
// //         body: JSON.stringify(payload)
// //       });
// //       if (!response.ok) {
// //         const errorData = await response.json();
// //         throw new Error(errorData.message || 'Failed to create ticket.');
// //       }
// //       await response.json(); // "Ticket created successfully"
// //       alert('Ticket created successfully!');
// //       await fetchTickets(); // Refresh list
// //       handleBackToList(); // Go back to list view
// //     } catch (err) {
// //       alert(`Error: ${err.message}`);
// //       console.error("Create ticket error:", err);
// //       throw err; // Re-throw to be caught by the child component if needed
// //     }
// //   };

// //   const handleTicketSelect = (ticketId) => {
// //     setSelectedTicketId(ticketId);
// //     setViewMode('detail');
// //   };

// //   const handleShowCreateView = () => setViewMode('create');
// //   const handleBackToList = () => { setViewMode('list'); setSelectedTicketId(null); };

// //   const selectedTicketData = tickets.find(t => t.id === selectedTicketId);

// //   const renderContent = () => {
// //     switch (viewMode) {
// //       case 'detail':
// //         return <TicketDetailView ticket={selectedTicketData} onBackToList={handleBackToList} />;
// //       case 'create':
// //         return <CreateTicketView onCreateTicket={handleCreateTicket} onBackToList={handleBackToList} />;
// //       case 'list':
// //       default:
// //         return <TicketDashboard tickets={tickets} onTicketSelect={handleTicketSelect} onShowCreateView={handleShowCreateView} loading={loading} error={error} />;
// //     }
// //   };

// //   return (
// //     <Box sx={{ p: 3, bgcolor: '#f4f6f8', minHeight: '100vh' }}>
// //       {renderContent()}
// //     </Box>
// //   );
// // };

// // export default HelpdeskSystem;

// import React, { useState, useMemo, useEffect, useCallback } from 'react';
// import {
//   Box, Typography, Button, Paper, Card, CardContent, Grid, Radio,
//   Divider, FormControl, Select, MenuItem, TextField, IconButton, CircularProgress, Alert
// } from '@mui/material';
// import {
//   Add as AddIcon,
//   AccessTime as AccessTimeIcon,
//   CalendarTodayOutlined as CalendarIcon,
//   PersonOutline as PersonIcon,
//   CheckCircle as CheckCircleIcon,
//   Leaderboard as LeaderboardIcon,
//   ArrowBack as ArrowBackIcon,
// } from '@mui/icons-material';

// // Chart.js imports
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
// import { Pie, Doughnut } from 'react-chartjs-2';
// import ChartDataLabels from 'chartjs-plugin-datalabels';

// // Rich Text Editor imports
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';

// ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

// // --- API & CONFIGURATION ---
// const API_BASE_URL = 'https://tdtlworld.com/hrms-backend/api/employee_support_tickets/';
// const LOGGED_IN_EMPLOYEE_ID = localStorage.getItem("loggedInUser") || null; // Default for testing

// // --- HELPER FUNCTIONS ---

// /**
//  * Safely strips HTML tags from a string to return plain text.
//  * @param {string} html The HTML string to parse.
//  * @returns {string} The plain text content.
//  */
// const stripHtml = (html) => {
//   if (typeof window === 'undefined' || !html) return html || ''; // SSR-safe and handles null/undefined
//   const doc = new DOMParser().parseFromString(html, 'text/html');
//   return doc.body.textContent || "";
// };

// const transformApiTicket = (apiTicket) => {
//   const formatDate = (dateString) => {
//     if (!dateString) return 'N/A';
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
//   };

//   return {
//     id: apiTicket.id,
//     displayId: `#${String(apiTicket.id).padStart(6, '0')}`,
//     subject: apiTicket.subject,
//     employee: apiTicket.employee_id,
//     subSubject: null,
//     assignedTo: 'Support Team',
//     department: 'N/A',
//     date: formatDate(apiTicket.created_at),
//     priority: apiTicket.priority,
//     status: apiTicket.ticket_status,
//     description: apiTicket.description || '',
//   };
// };

// // ===================================================================================
// //  COMPONENT 1: TICKET LIST & DASHBOARD VIEW
// // ===================================================================================
// const TicketDashboard = ({ tickets, onTicketSelect, onShowCreateView, loading, error }) => {
//   const { priorityData, statusData } = useMemo(() => {
//     const counts = { High: 0, Low: 0, Medium: 0, Critical: 0, Open: 0, Closed: 0 };
//     (tickets || []).forEach(ticket => {
//       if (ticket.priority in counts) counts[ticket.priority]++;
//       if (ticket.status in counts) counts[ticket.status]++;
//     });
//     return {
//       priorityData: {
//         labels: ['Low', 'Medium', 'High', 'Critical'],
//         datasets: [{
//           data: [counts.Low, counts.Medium, counts.High, counts.Critical],
//           backgroundColor: ['#4CAF50', '#FFC107', '#FF9800', '#F44336']
//         }],
//       },
//       statusData: {
//         labels: ['Open', 'Closed'],
//         datasets: [{
//           data: [counts.Open, counts.Closed],
//           backgroundColor: ['#2196F3', '#9E9E9E']
//         }],
//       }
//     };
//   }, [tickets]);

//   const chartOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: { position: 'right' },
//       datalabels: { display: false }
//     }
//   };

//   const getPriorityColor = (priority) => {
//     switch (priority) {
//       case 'High': return '#FF5722';
//       case 'Medium': return '#FFC107';
//       case 'Low': return '#4CAF50';
//       case 'Critical': return '#F44336';
//       default: return '#9E9E9E';
//     }
//   };

//   const renderTicketList = () => {
//     if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}><CircularProgress /></Box>;
//     if (error) return <Alert severity="error" sx={{ m: 2 }}>{error}</Alert>;
//     if (!tickets || tickets.length === 0) return <Typography sx={{ textAlign: 'center', p: 5, color: 'text.secondary' }}>No tickets found.</Typography>;

//     return tickets.map((ticket) => (
//       <Card key={ticket.id} elevation={1} sx={{ display: 'flex', alignItems: 'center', mb: 2, p: 1, cursor: 'pointer' }} onClick={() => onTicketSelect(ticket.id)}>
//         <Box sx={{ px: 2 }}><AccessTimeIcon sx={{ fontSize: 40, color: 'primary.main' }} /></Box>
//         <CardContent sx={{ flexGrow: 1, p: '12px !important' }}>
//           <Typography variant="h6" component="div" fontWeight="500">{ticket.subject}</Typography>
//           <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 2, color: 'text.secondary', fontSize: '0.875rem', my: 1.5 }}>
//             <Typography variant="body2" fontWeight="bold">{ticket.displayId}</Typography>
//             <Box sx={{ display: 'flex', alignItems: 'center' }}><CalendarIcon sx={{ fontSize: '1rem', mr: 0.5 }} /> {ticket.date}</Box>
//             <Typography variant="body2" sx={{ color: getPriorityColor(ticket.priority), fontWeight: '500' }}>
//               {ticket.priority}
//             </Typography>
//             <Typography variant="body2" sx={{
//               color: ticket.status === 'Open' ? '#2196F3' : '#9E9E9E',
//               fontWeight: '500'
//             }}>
//               {ticket.status}
//             </Typography>
//           </Box>
//         </CardContent>
//         <Box><Radio name="ticket-radio-button" checked={false} /></Box>
//       </Card>
//     ));
//   };

//   return (
//     <Grid container spacing={3}>
//       <Grid item xs={12} lg={8}>
//         <Paper elevation={0} sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
//           <Typography variant="h6" fontWeight="bold">Tickets List</Typography>
//           <Button
//             variant="contained"
//             startIcon={<AddIcon />}
//             sx={{
//               bgcolor: '#673ab7',
//               '&:hover': { bgcolor: '#5e35b1' },
//               textTransform: 'none'
//             }}
//             onClick={onShowCreateView}
//           >
//             Create Ticket
//           </Button>
//         </Paper>
//         {renderTicketList()}
//       </Grid>
//       <Grid item xs={12} lg={4}>
//         <Paper elevation={0} sx={{ p: 2, mb: 3, height: '350px' }}>
//           <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>Ticket Priority</Typography>
//           <Box sx={{ height: 'calc(100% - 48px)' }}>
//             <Pie data={priorityData} options={chartOptions} />
//           </Box>
//         </Paper>
//         <Paper elevation={0} sx={{ p: 2, height: '350px' }}>
//           <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>Ticket Status</Typography>
//           <Box sx={{ height: 'calc(100% - 48px)' }}>
//             <Doughnut data={statusData} options={chartOptions} />
//           </Box>
//         </Paper>
//       </Grid>
//     </Grid>
//   );
// };

// // ===================================================================================
// //  COMPONENT 2: TICKET DETAIL VIEW
// // ===================================================================================
// const DetailRow = ({ label, value, icon }) => (
//   <>
//     <Grid item xs={5}>
//       <Typography variant="subtitle2" color="text.secondary">{label}</Typography>
//     </Grid>
//     <Grid item xs={7}>
//       {typeof value === 'string' ? (
//         <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', fontWeight: 500 }}>
//           {icon && React.cloneElement(icon, { sx: { mr: 1 } })}
//           {value}
//         </Typography>
//       ) : (
//         // If value is a component, render it directly
//         <Box sx={{ display: 'flex', alignItems: 'center' }}>
//           {icon && React.cloneElement(icon, { sx: { mr: 1 } })}
//           {value}
//         </Box>
//       )}
//     </Grid>
//     <Grid item xs={12}>
//       <Divider sx={{ my: 1.5 }} />
//     </Grid>
//   </>
// );

// const StatusChip = ({ status }) => (
//   <Box component="span" sx={{
//     px: 1.5,
//     py: 0.5,
//     borderRadius: '16px',
//     fontWeight: 'bold',
//     fontSize: '0.8rem',
//     color: '#fff',
//     bgcolor: status === 'Open' ? '#2196F3' : '#9E9E9E',
//     display: 'inline-block',
//     lineHeight: 1.5
//   }}>
//     {status}
//   </Box>
// );

// const TicketDetailView = ({ ticket, onBackToList }) => {
//   if (!ticket) return <Typography>No ticket selected or not found.</Typography>;

//   return (
//     <Grid container spacing={3}>
//       {/* Left Panel: Ticket Details */}
//       <Grid item xs={12} md={5}>
//         <Paper elevation={2} sx={{ p: 2, height: '100%' }}>
//           <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
//             <IconButton onClick={onBackToList} sx={{ mr: 1 }}><ArrowBackIcon /></IconButton>
//             <Typography variant="h6" fontWeight="bold">Ticket Details</Typography>
//           </Box>
//           <Box sx={{
//             bgcolor: ticket.status === 'Open' ? '#e3f2fd' : '#e8f5e9',
//             color: ticket.status === 'Open' ? '#1976d2' : '#388e3c',
//             p: 1.5,
//             borderRadius: 1,
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             mb: 2,
//             fontWeight: 'bold'
//           }}>
//             <CheckCircleIcon sx={{ mr: 1 }} /> TICKET {ticket.displayId}
//           </Box>
//           <Grid container alignItems="center" spacing={1}>
//             <DetailRow label="Subject" value={ticket.subject} />
//             <DetailRow label="Employee" value={ticket.employee} icon={<PersonIcon />} />
//             <DetailRow label="Priority" value={ticket.priority} />
//             <DetailRow label="Status" value={<StatusChip status={ticket.status} />} />
//             <DetailRow label="Assigned to" value={ticket.assignedTo} />
//             <DetailRow label="Created at" value={ticket.date} icon={<CalendarIcon />} />
//           </Grid>
//         </Paper>
//       </Grid>

//       {/* Right Panel: Description */}
//       <Grid item xs={12} md={7}>
//         <Paper elevation={2} sx={{ p: 2, height: '100%' }}>
//           <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1 }}>Description</Typography>
//           <Typography variant="body1" sx={{ whiteSpace: 'pre-line', wordBreak: 'break-word' }}>
//             {stripHtml(ticket.description)}
//           </Typography>
//         </Paper>
//       </Grid>
//     </Grid>
//   );
// };


// // ===================================================================================
// //  COMPONENT 3: CREATE TICKET VIEW
// // ===================================================================================
// const CreateTicketView = ({ onCreateTicket, onBackToList }) => {
//   const [subject, setSubject] = useState('');
//   const [priority, setPriority] = useState('');
//   const [description, setDescription] = useState('');
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleSubmit = async () => {
//     if (!subject || !priority) {
//       alert('Please fill all required fields marked with *');
//       return;
//     }

//     setIsSubmitting(true);
//     try {
//       await onCreateTicket({
//         subject,
//         priority,
//         description
//       });
//     } catch (error) {
//       console.error("Error creating ticket:", error);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const FormLabel = ({ children, required = false }) => (
//     <Typography component="label" sx={{ display: 'block', mb: 1, fontWeight: 500 }}>
//       {children} {required && <span style={{ color: 'red' }}>*</span>}
//     </Typography>
//   );

//   return (
//     <Paper elevation={1} sx={{ p: { xs: 2, md: 4 } }}>
//       <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
//         <IconButton onClick={onBackToList} sx={{ mr: 1 }}><ArrowBackIcon /></IconButton>
//         <Typography variant="h6">Create Ticket</Typography>
//       </Box>

//       <Grid container spacing={3}>
//         <Grid item xs={12} md={6}>
//           <FormLabel required>Subject</FormLabel>
//           <TextField
//             fullWidth
//             placeholder="Enter ticket subject"
//             value={subject}
//             onChange={(e) => setSubject(e.target.value)}
//           />
//         </Grid>

//         <Grid item xs={12} md={6}>
//           <FormLabel required>Priority</FormLabel>
//           <FormControl fullWidth>
//             <Select
//               displayEmpty
//               value={priority}
//               onChange={(e) => setPriority(e.target.value)}
//               renderValue={(selected) => selected || <em>Select priority</em>}
//             >
//               <MenuItem disabled value=""><em>Select priority</em></MenuItem>
//               <MenuItem value="Low">Low</MenuItem>
//               <MenuItem value="Medium">Medium</MenuItem>
//               <MenuItem value="High">High</MenuItem>
//             </Select>
//           </FormControl>
//         </Grid>

//         <Grid item xs={12}>
//           <FormLabel>Description</FormLabel>
//           <Box sx={{
//             '.ql-toolbar': { borderColor: 'rgba(0, 0, 0, 0.23)', borderTopLeftRadius: '4px', borderTopRightRadius: '4px' },
//             '.ql-container': { borderColor: 'rgba(0, 0, 0, 0.23)', borderBottomLeftRadius: '4px', borderBottomRightRadius: '4px', minHeight: '200px' },
//           }}>
//             <ReactQuill
//               theme="snow"
//               value={description}
//               onChange={setDescription}
//               placeholder="Enter detailed description..."
//             />
//           </Box>
//         </Grid>
//       </Grid>

//       <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4, pt: 2 }}>
//         <Button
//           variant="contained"
//           onClick={handleSubmit}
//           disabled={isSubmitting}
//           sx={{
//             backgroundColor: '#673ab7',
//             '&:hover': { backgroundColor: '#5e35b1' },
//             textTransform: 'none',
//             fontSize: '1rem',
//             padding: '8px 24px',
//             minWidth: '150px'
//           }}
//         >
//           {isSubmitting ? <CircularProgress size={24} color="inherit" /> : 'Create Ticket'}
//         </Button>
//       </Box>
//     </Paper>
//   );
// };

// // ===================================================================================
// //  COMPONENT 4: MAIN HELPDESK SYSTEM (PARENT)
// // ===================================================================================
// const HelpdeskSystem = () => {
//   const [viewMode, setViewMode] = useState('list');
//   const [selectedTicketId, setSelectedTicketId] = useState(null);
//   const [tickets, setTickets] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const fetchTickets = useCallback(async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await fetch(`${API_BASE_URL}${LOGGED_IN_EMPLOYEE_ID}/`);
//       if (!response.ok) throw new Error(`Failed to fetch tickets: ${response.status}`);
//       const data = await response.json();
//       setTickets(Array.isArray(data) ? data.map(transformApiTicket) : []);
//     } catch (err) {
//       setError(err.message);
//       console.error("Fetch tickets error:", err);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchTickets();
//   }, [fetchTickets]);

//   const handleCreateTicket = async (newTicketData) => {
//     try {
//       const response = await fetch(`${API_BASE_URL}${LOGGED_IN_EMPLOYEE_ID}/`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           subject: newTicketData.subject,
//           priority: newTicketData.priority,
//           description: newTicketData.description,
//         })
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message || 'Failed to create ticket');
//       }

//       const result = await response.json();
//       if (result.message === "Ticket created successfully") {
//         alert('Ticket created successfully!');
//         await fetchTickets();
//         handleBackToList();
//       } else {
//         throw new Error('Unexpected response from server');
//       }
//     } catch (err) {
//       alert(`Error: ${err.message}`);
//       throw err;
//     }
//   };

//   const handleTicketSelect = (ticketId) => {
//     setSelectedTicketId(ticketId);
//     setViewMode('detail');
//   };

//   const handleShowCreateView = () => setViewMode('create');
//   const handleBackToList = () => setViewMode('list');

//   const selectedTicketData = tickets.find(t => t.id === selectedTicketId);

//   return (
//     <Box sx={{ p: 3, bgcolor: '#f4f6f8', minHeight: '100vh' }}>
//       {viewMode === 'detail' && (
//         <TicketDetailView
//           ticket={selectedTicketData}
//           onBackToList={handleBackToList}
//         />
//       )}
//       {viewMode === 'create' && (
//         <CreateTicketView
//           onCreateTicket={handleCreateTicket}
//           onBackToList={handleBackToList}
//         />
//       )}
//       {viewMode === 'list' && (
//         <TicketDashboard
//           tickets={tickets}
//           onTicketSelect={handleTicketSelect}
//           onShowCreateView={handleShowCreateView}
//           loading={loading}
//           error={error}
//         />
//       )}
//     </Box>
//   );
// };

// export default HelpdeskSystem;

import React, { useState, useMemo, useEffect, useCallback } from 'react';
import {
  Box, Typography, Button, Paper, Card, CardContent, Grid, Radio,
  Divider, FormControl, Select, MenuItem, TextField, IconButton, CircularProgress, Alert
} from '@mui/material';
import {
  Add as AddIcon,
  AccessTime as AccessTimeIcon,
  CalendarTodayOutlined as CalendarIcon,
  PersonOutline as PersonIcon,
  CheckCircle as CheckCircleIcon,
  Leaderboard as LeaderboardIcon,
  ArrowBack as ArrowBackIcon,
} from '@mui/icons-material';

// Chart.js imports
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie, Doughnut } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';

// Rich Text Editor imports
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

// --- API & CONFIGURATION ---
const API_BASE_URL = 'https://tdtlworld.com/hrms-backend/api/employee_support_tickets/';
const LOGGED_IN_EMPLOYEE_ID = localStorage.getItem("loggedInUser") || null; // Default for testing

// --- HELPER FUNCTIONS ---

/**
 * Safely strips HTML tags from a string to return plain text.
 * @param {string} html The HTML string to parse.
 * @returns {string} The plain text content.
 */
const stripHtml = (html) => {
  if (typeof window === 'undefined' || !html) return html || ''; // SSR-safe and handles null/undefined
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || "";
};

const transformApiTicket = (apiTicket) => {
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  return {
    id: apiTicket.id,
    displayId: `#${String(apiTicket.id).padStart(6, '0')}`,
    subject: apiTicket.subject,
    employee: apiTicket.employee_id,
    subSubject: null,
    assignedTo: 'Support Team',
    department: 'N/A',
    date: formatDate(apiTicket.created_at),
    priority: apiTicket.priority,
    status: apiTicket.ticket_status,
    description: apiTicket.description || '',
  };
};

// ===================================================================================
//  COMPONENT 1: TICKET LIST & DASHBOARD VIEW
// ===================================================================================
const TicketDashboard = ({ tickets, onTicketSelect, onShowCreateView, loading, error }) => {
  const { priorityData, statusData } = useMemo(() => {
    const counts = { High: 0, Low: 0, Medium: 0, Critical: 0, Open: 0, Closed: 0 };
    (tickets || []).forEach(ticket => {
      if (ticket.priority in counts) counts[ticket.priority]++;
      if (ticket.status in counts) counts[ticket.status]++;
    });
    return {
      priorityData: {
        labels: ['Low', 'Medium', 'High', 'Critical'],
        datasets: [{
          data: [counts.Low, counts.Medium, counts.High, counts.Critical],
          backgroundColor: ['#4CAF50', '#FFC107', '#FF9800', '#F44336']
        }],
      },
      statusData: {
        labels: ['Open', 'Closed'],
        datasets: [{
          data: [counts.Open, counts.Closed],
          backgroundColor: ['#2196F3', '#9E9E9E']
        }],
      }
    };
  }, [tickets]);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'right' },
      datalabels: { display: false }
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return '#FF5722';
      case 'Medium': return '#FFC107';
      case 'Low': return '#4CAF50';
      case 'Critical': return '#F44336';
      default: return '#9E9E9E';
    }
  };

  const renderTicketList = () => {
    if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}><CircularProgress /></Box>;
    if (error) return <Alert severity="error" sx={{ m: 2 }}>{error}</Alert>;
    if (!tickets || tickets.length === 0) return <Typography sx={{ textAlign: 'center', p: 5, color: 'text.secondary' }}>No tickets found.</Typography>;

    return tickets.map((ticket) => (
      <Card key={ticket.id} elevation={1} sx={{ display: 'flex', alignItems: 'center', mb: 2, p: 1, cursor: 'pointer' }} onClick={() => onTicketSelect(ticket.id)}>
        <Box sx={{ px: 2 }}><AccessTimeIcon sx={{ fontSize: 40, color: 'primary.main' }} /></Box>
        <CardContent sx={{ flexGrow: 1, p: '12px !important' }}>
          <Typography variant="h6" component="div" fontWeight="500">{ticket.subject}</Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 2, color: 'text.secondary', fontSize: '0.875rem', my: 1.5 }}>
            <Typography variant="body2" fontWeight="bold">{ticket.displayId}</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}><CalendarIcon sx={{ fontSize: '1rem', mr: 0.5 }} /> {ticket.date}</Box>
            <Typography variant="body2" sx={{ color: getPriorityColor(ticket.priority), fontWeight: '500' }}>
              {ticket.priority}
            </Typography>
            <Typography variant="body2" sx={{
              color: ticket.status === 'Open' ? '#2196F3' : '#9E9E9E',
              fontWeight: '500'
            }}>
              {ticket.status}
            </Typography>
          </Box>
        </CardContent>
        <Box><Radio name="ticket-radio-button" checked={false} /></Box>
      </Card>
    ));
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} lg={8}>
        <Paper elevation={0} sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" fontWeight="bold">Tickets List</Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            sx={{
              bgcolor: '#673ab7',
              '&:hover': { bgcolor: '#5e35b1' },
              textTransform: 'none'
            }}
            onClick={onShowCreateView}
          >
            Create Ticket
          </Button>
        </Paper>
        {renderTicketList()}
      </Grid>
      <Grid item xs={12} lg={4}>
        <Paper elevation={0} sx={{ p: 2, mb: 3, height: '350px' }}>
          <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>Ticket Priority</Typography>
          <Box sx={{ height: 'calc(100% - 48px)' }}>
            <Pie data={priorityData} options={chartOptions} />
          </Box>
        </Paper>
        <Paper elevation={0} sx={{ p: 2, height: '350px' }}>
          <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>Ticket Status</Typography>
          <Box sx={{ height: 'calc(100% - 48px)' }}>
            <Doughnut data={statusData} options={chartOptions} />
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

// ===================================================================================
//  COMPONENT 2: TICKET DETAIL VIEW
// ===================================================================================
const DetailRow = ({ label, value, icon }) => (
  <>
    <Grid item xs={5}>
      <Typography variant="subtitle2" color="text.secondary">{label}</Typography>
    </Grid>
    <Grid item xs={7}>
      {typeof value === 'string' ? (
        <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', fontWeight: 500 }}>
          {icon && React.cloneElement(icon, { sx: { mr: 1 } })}
          {value}
        </Typography>
      ) : (
        // If value is a component, render it directly
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {icon && React.cloneElement(icon, { sx: { mr: 1 } })}
          {value}
        </Box>
      )}
    </Grid>
    <Grid item xs={12}>
      <Divider sx={{ my: 1.5 }} />
    </Grid>
  </>
);

const StatusChip = ({ status }) => (
  <Box component="span" sx={{
    px: 1.5,
    py: 0.5,
    borderRadius: '16px',
    fontWeight: 'bold',
    fontSize: '0.8rem',
    color: '#fff',
    bgcolor: status === 'Open' ? '#2196F3' : '#9E9E9E',
    display: 'inline-block',
    lineHeight: 1.5
  }}>
    {status}
  </Box>
);

const TicketDetailView = ({ ticket, onBackToList }) => {
  if (!ticket) return <Typography>No ticket selected or not found.</Typography>;

  return (
    <Grid container spacing={3}>
      {/* Left Panel: Ticket Details */}
      <Grid item xs={12} md={5}>
        <Paper elevation={2} sx={{ p: 2, height: '100%' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <IconButton onClick={onBackToList} sx={{ mr: 1 }}><ArrowBackIcon /></IconButton>
            <Typography variant="h6" fontWeight="bold">Ticket Details</Typography>
          </Box>
          <Box sx={{
            bgcolor: ticket.status === 'Open' ? '#e3f2fd' : '#e8f5e9',
            color: ticket.status === 'Open' ? '#1976d2' : '#388e3c',
            p: 1.5,
            borderRadius: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mb: 2,
            fontWeight: 'bold'
          }}>
            <CheckCircleIcon sx={{ mr: 1 }} /> TICKET {ticket.displayId}
          </Box>
          <Grid container alignItems="center" spacing={1}>
            <DetailRow label="Subject" value={ticket.subject} />
            <DetailRow label="Employee" value={ticket.employee} icon={<PersonIcon />} />
            <DetailRow label="Priority" value={ticket.priority} />
            <DetailRow label="Status" value={<StatusChip status={ticket.status} />} />
            <DetailRow label="Assigned to" value={ticket.assignedTo} />
            <DetailRow label="Created at" value={ticket.date} icon={<CalendarIcon />} />
          </Grid>
        </Paper>
      </Grid>

      {/* Right Panel: Description */}
      <Grid item xs={12} md={7}>
        <Paper elevation={2} sx={{ p: 2, height: '100%' }}>
          <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1 }}>Description</Typography>
          <Typography variant="body1" sx={{ whiteSpace: 'pre-line', wordBreak: 'break-word' }}>
            {stripHtml(ticket.description)}
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};


// ===================================================================================
//  COMPONENT 3: CREATE TICKET VIEW
// ===================================================================================
const CreateTicketView = ({ onCreateTicket, onBackToList }) => {
  const [subject, setSubject] = useState('');
  const [priority, setPriority] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!subject || !priority) {
      alert('Please fill all required fields marked with *');
      return;
    }

    setIsSubmitting(true);
    try {
      await onCreateTicket({
        subject,
        priority,
        description
      });
    } catch (error) {
      console.error("Error creating ticket:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const FormLabel = ({ children, required = false }) => (
    <Typography component="label" sx={{ display: 'block', mb: 1, fontWeight: 500 }}>
      {children} {required && <span style={{ color: 'red' }}>*</span>}
    </Typography>
  );

  return (
    <Paper elevation={1} sx={{ p: { xs: 2, md: 4 } }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
        <IconButton onClick={onBackToList} sx={{ mr: 1 }}><ArrowBackIcon /></IconButton>
        <Typography variant="h6">Create Ticket</Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <FormLabel required>Subject</FormLabel>
          <TextField
            fullWidth
            placeholder="Enter ticket subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <FormLabel required>Priority</FormLabel>
          <FormControl fullWidth>
            <Select
              displayEmpty
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              renderValue={(selected) => selected || <em>Select priority</em>}
            >
              <MenuItem disabled value=""><em>Select priority</em></MenuItem>
              <MenuItem value="Low">Low</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="High">High</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormLabel>Description</FormLabel>
          <Box sx={{
            '.ql-toolbar': { borderColor: 'rgba(0, 0, 0, 0.23)', borderTopLeftRadius: '4px', borderTopRightRadius: '4px' },
            '.ql-container': { borderColor: 'rgba(0, 0, 0, 0.23)', borderBottomLeftRadius: '4px', borderBottomRightRadius: '4px', minHeight: '200px' },
          }}>
            <ReactQuill
              theme="snow"
              value={description}
              onChange={setDescription}
              placeholder="Enter detailed description..."
            />
          </Box>
        </Grid>
      </Grid>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4, pt: 2 }}>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={isSubmitting}
          sx={{
            backgroundColor: '#673ab7',
            '&:hover': { backgroundColor: '#5e35b1' },
            textTransform: 'none',
            fontSize: '1rem',
            padding: '8px 24px',
            minWidth: '150px'
          }}
        >
          {isSubmitting ? <CircularProgress size={24} color="inherit" /> : 'Create Ticket'}
        </Button>
      </Box>
    </Paper>
  );
};

// ===================================================================================
//  COMPONENT 4: MAIN HELPDESK SYSTEM (PARENT)
// ===================================================================================
const HelpdeskSystemLM = () => {
  const [viewMode, setViewMode] = useState('list');
  const [selectedTicketId, setSelectedTicketId] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTickets = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}${LOGGED_IN_EMPLOYEE_ID}/`);
      if (!response.ok) throw new Error(`Failed to fetch tickets: ${response.status}`);
      const data = await response.json();
      setTickets(Array.isArray(data) ? data.map(transformApiTicket) : []);
    } catch (err) {
      setError(err.message);
      console.error("Fetch tickets error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTickets();
  }, [fetchTickets]);

  const handleCreateTicket = async (newTicketData) => {
    try {
      const response = await fetch(`${API_BASE_URL}${LOGGED_IN_EMPLOYEE_ID}/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subject: newTicketData.subject,
          priority: newTicketData.priority,
          description: newTicketData.description,
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create ticket');
      }

      const result = await response.json();
      if (result.message === "Ticket created successfully") {
        alert('Ticket created successfully!');
        await fetchTickets();
        handleBackToList();
      } else {
        throw new Error('Unexpected response from server');
      }
    } catch (err) {
      alert(`Error: ${err.message}`);
      throw err;
    }
  };

  const handleTicketSelect = (ticketId) => {
    setSelectedTicketId(ticketId);
    setViewMode('detail');
  };

  const handleShowCreateView = () => setViewMode('create');
  const handleBackToList = () => setViewMode('list');

  const selectedTicketData = tickets.find(t => t.id === selectedTicketId);

  return (
    <Box sx={{ p: 3, bgcolor: '#f4f6f8', minHeight: '100vh' }}>
      {viewMode === 'detail' && (
        <TicketDetailView
          ticket={selectedTicketData}
          onBackToList={handleBackToList}
        />
      )}
      {viewMode === 'create' && (
        <CreateTicketView
          onCreateTicket={handleCreateTicket}
          onBackToList={handleBackToList}
        />
      )}
      {viewMode === 'list' && (
        <TicketDashboard
          tickets={tickets}
          onTicketSelect={handleTicketSelect}
          onShowCreateView={handleShowCreateView}
          loading={loading}
          error={error}
        />
      )}
    </Box>
  );
};

export default HelpdeskSystemLM;