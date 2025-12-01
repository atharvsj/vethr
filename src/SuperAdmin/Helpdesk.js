



// // // import React, { useState, useMemo, useEffect, useCallback } from 'react';
// // // import {
// // //   Box, Typography, Button, Paper, Card, CardContent, Grid,
// // //   Divider, FormControl, Select, MenuItem, TextField, IconButton, Avatar, Radio,
// // //   Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions,
// // //   CircularProgress, Alert,
// // // } from '@mui/material';
// // // import {
// // //   Add as AddIcon,
// // //   AccessTime as AccessTimeIcon,
// // //   LockOutlined as LockOutlinedIcon,
// // //   Delete as DeleteIcon,
// // //   CalendarTodayOutlined as CalendarIcon,
// // //   PersonOutline as PersonIcon,
// // //   CheckCircle as CheckCircleIcon,
// // //   Leaderboard as LeaderboardIcon,
// // //   ChatBubbleOutline as ReplyIcon,
// // //   NoteAddOutlined as NoteIcon,
// // //   AttachFileOutlined as AttachIcon,
// // //   ArrowBack as ArrowBackIcon,
// // //   Download as DownloadIcon,
// // //   Edit as EditIcon,
// // //   Visibility as VisibilityIcon,
// // //   Close as CloseIcon,
// // // } from '@mui/icons-material';
// // // import axiosInstance from "../utils/axiosInstance";
// // // // Chart.js imports
// // // import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
// // // import { Pie, Doughnut } from 'react-chartjs-2';
// // // import ChartDataLabels from 'chartjs-plugin-datalabels';

// // // // Rich Text Editor imports
// // // import ReactQuill from 'react-quill';
// // // import 'react-quill/dist/quill.snow.css';

// // // ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

// // // // --- HELPER FUNCTIONS ---

// // // /**
// // //  * Safely strips HTML tags from a string to return plain text.
// // //  * This is used for displaying the description without HTML tags.
// // //  * @param {string} html The HTML string to parse.
// // //  * @returns {string} The plain text content.
// // //  */
// // // const stripHtml = (html) => {
// // //   if (typeof window === 'undefined' || !html) return html || '';
// // //   const doc = new DOMParser().parseFromString(html, 'text/html');
// // //   return doc.body.textContent || "";
// // // };

// // // const transformApiTicket = (apiTicket) => {
// // //   const formatDate = (dateString) => {
// // //     if (!dateString) return 'N/A';
// // //     const date = new Date(dateString);
// // //     if (isNaN(date.getTime())) return 'N/A';
// // //     const day = String(date.getDate()).padStart(2, '0');
// // //     const month = String(date.getMonth() + 1).padStart(2, '0');
// // //     const year = date.getFullYear();
// // //     return `${day}-${month}-${year}`;
// // //   };

// // //   const generateDisplayId = (id) => {
// // //     const letters = 'IJKLMONPQRSTUVWXYZ';
// // //     const part1 = String(id).padStart(3, '0');
// // //     const part2 = letters[id % letters.length] + letters[(id * 3) % letters.length];
// // //     return `${part1}${part2}L`;
// // //   };

// // //   // This function correctly maps the API response fields to the names used in the frontend.
// // //   return {
// // //     id: apiTicket.id,
// // //     displayId: generateDisplayId(apiTicket.id),
// // //     subject: apiTicket.subject,
// // //     employee: apiTicket.employee_name, // Maps employee_name
// // //     assignedTo: 'Support Team',
// // //     department: apiTicket.department_name, // Maps department_name
// // //     date: formatDate(apiTicket.created_at),
// // //     priority: apiTicket.priority,
// // //     status: apiTicket.ticket_status, // Maps ticket_status to 'status' for frontend use
// // //     description: apiTicket.description || '',
// // //   };
// // // };

// // // // ===================================================================================
// // // //  COMPONENT 0: EDIT TICKET MODAL
// // // // ===================================================================================
// // // const EditTicketModal = ({ open, onClose, onUpdate, ticket }) => {
// // //   const [editedStatus, setEditedStatus] = useState('');

// // //   useEffect(() => {
// // //     if (ticket) {
// // //       setEditedStatus(ticket.status);
// // //     }
// // //   }, [ticket]);

// // //   const handleUpdateClick = () => {
// // //     // onUpdate is called with the correct payload structure: { status: '...' }
// // //     onUpdate(ticket.id, { status: editedStatus });
// // //     onClose();
// // //   };

// // //   if (!ticket) return null;

// // //   return (
// // //     <Dialog open={open} onClose={onClose} PaperProps={{ sx: { borderRadius: 2 } }}>
// // //       <DialogTitle sx={{ fontWeight: 'bold', fontSize: '1.25rem', pt: 2.5, pb: 1 }}>
// // //         Update Ticket Status
// // //         <IconButton
// // //           aria-label="close"
// // //           onClick={onClose}
// // //           sx={{ position: 'absolute', right: 8, top: 8, color: (theme) => theme.palette.grey[500] }}
// // //         >
// // //           <CloseIcon />
// // //         </IconButton>
// // //       </DialogTitle>
// // //       <DialogContent>
// // //         <DialogContentText sx={{ mb: 2 }}>
// // //           Select the new status for Ticket #{ticket.displayId}.
// // //         </DialogContentText>
// // //         <FormControl fullWidth size="small" sx={{ mt: 1 }}>
// // //           <Select
// // //             value={editedStatus}
// // //             onChange={(e) => setEditedStatus(e.target.value)}
// // //           >
// // //             <MenuItem value="Open">Open</MenuItem>
// // //             <MenuItem value="Closed">Closed</MenuItem>
// // //           </Select>
// // //         </FormControl>
// // //       </DialogContent>
// // //       <DialogActions sx={{ p: '16px 24px' }}>
// // //         <Button onClick={onClose} sx={{ color: 'text.secondary', textTransform: 'none' }}>Close</Button>
// // //         <Button onClick={handleUpdateClick} variant="contained" sx={{ bgcolor: '#673ab7', '&:hover': { bgcolor: '#5e35b1' }, textTransform: 'none', px: 3 }}>Update</Button>
// // //       </DialogActions>
// // //     </Dialog>
// // //   );
// // // };

// // // // ===================================================================================
// // // //  COMPONENT 1: TICKET LIST & DASHBOARD VIEW
// // // // ===================================================================================
// // // const TicketDashboard = ({ tickets, onViewTicket, onDeleteTicket, onEditTicket, onRadioSelect, selectedTicketId, loading, error }) => {
// // //   const { priorityData, statusData } = useMemo(() => {
// // //     const counts = { High: 0, Low: 0, Medium: 0, Critical: 0, Open: 0, Closed: 0 };
// // //     (tickets || []).forEach(ticket => {
// // //       if (ticket.priority in counts) counts[ticket.priority]++;
// // //       if (ticket.status in counts) counts[ticket.status]++;
// // //     });
// // //     return {
// // //       priorityData: {
// // //         labels: ['Low', 'High', 'Medium', 'Critical'],
// // //         datasets: [{ data: [counts.Low, counts.High, counts.Medium, counts.Critical], backgroundColor: ['#F9A825', '#F57F17', '#FDD835', '#FFF59D'] }],
// // //       },
// // //       statusData: {
// // //         labels: ['Open', 'Closed'],
// // //         datasets: [{ data: [counts.Open, counts.Closed], backgroundColor: ['#2196F3', '#4CAF50'] }],
// // //       }
// // //     };
// // //   }, [tickets]);

// // //   const chartOptions = { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'right' }, datalabels: { display: false } } };
// // //   const doughnutOptions = { ...chartOptions, cutout: '70%' };

// // //   const getPriorityColor = (p) => {
// // //     const priorityLower = p?.toLowerCase();
// // //     return (priorityLower === 'high' || priorityLower === 'critical') ? 'error.main' : 'warning.main';
// // //   };
// // //   const getStatusColor = (s) => s?.toLowerCase() === 'closed' ? 'success.main' : 'primary.main';

// // //   const renderTicketList = () => {
// // //     if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}><CircularProgress /></Box>;
// // //     if (error) return <Alert severity="error" sx={{ m: 2 }}>{error}</Alert>;
// // //     if (!tickets || tickets.length === 0) return <Typography sx={{ textAlign: 'center', p: 5, color: 'text.secondary' }}>No tickets found.</Typography>;

// // //     return tickets.map((ticket) => (
// // //       <Card key={ticket.id} elevation={1} sx={{ display: 'flex', alignItems: 'center', mb: 2, p: 1 }}>
// // //         <Box sx={{ px: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
// // //           <Avatar sx={{ bgcolor: 'primary.main', width: 56, height: 56 }}>
// // //             <AccessTimeIcon sx={{ fontSize: '2rem', color: 'white' }} />
// // //           </Avatar>
// // //         </Box>
// // //         <CardContent sx={{ flexGrow: 1, p: '12px !important' }}>
// // //           <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
// // //             <LockOutlinedIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
// // //             <Typography variant="h6" component="div" fontWeight="500">{ticket.subject}</Typography>
// // //           </Box>
// // //           <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: { xs: 1, sm: 2 }, color: 'text.secondary', fontSize: '0.875rem' }}>
// // //             <Typography variant="body2" fontWeight="bold"># {ticket.displayId}</Typography>
// // //             <Box sx={{ display: 'flex', alignItems: 'center' }}>
// // //               <PersonIcon sx={{ fontSize: '1.1rem', mr: 0.5, color: 'primary.light' }} /> {ticket.employee}
// // //             </Box>
// // //             <Box sx={{ display: 'flex', alignItems: 'center' }}>
// // //               <CalendarIcon sx={{ fontSize: '1rem', mr: 0.5 }} /> {ticket.date}
// // //             </Box>
// // //             <Typography variant="body2" sx={{ color: getPriorityColor(ticket.priority), fontWeight: '500' }}>{ticket.priority}</Typography>
// // //             <Typography variant="body2" sx={{ color: getStatusColor(ticket.status), fontWeight: '500' }}>{ticket.status}</Typography>
// // //           </Box>
// // //           <Box sx={{ display: 'flex', gap: { xs: 0.5, sm: 1.5 }, mt: 1.5, borderTop: 1, borderColor: 'divider', pt: 1.5 }}>
// // //             <Button size="small" sx={{ textTransform: 'none', color: 'text.secondary', p: 0.5 }} startIcon={<EditIcon />} onClick={() => onEditTicket(ticket.id)}>
// // //               Edit
// // //             </Button>
// // //             <Button size="small" sx={{ textTransform: 'none', color: 'text.secondary', p: 0.5 }} startIcon={<VisibilityIcon />} onClick={() => onViewTicket(ticket.id)}>
// // //               View Ticket
// // //             </Button>
// // //             <Button size="small" sx={{ textTransform: 'none', color: 'error.main', p: 0.5 }} startIcon={<DeleteIcon />} onClick={() => onDeleteTicket(ticket.id)}>
// // //               Delete
// // //             </Button>
// // //           </Box>
// // //         </CardContent>
// // //         <Box sx={{ px: 1 }}>
// // //           <Radio checked={selectedTicketId === ticket.id} onChange={() => onRadioSelect(ticket.id)} value={ticket.id} name="ticket-selection-radio" />
// // //         </Box>
// // //       </Card>
// // //     ));
// // //   };

// // //   return (
// // //     <Grid container spacing={3}>
// // //       <Grid item xs={12} lg={8}>
// // //         <Paper elevation={0} sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
// // //           <Typography variant="h6" fontWeight="bold">Tickets List</Typography>
// // //         </Paper>
// // //         {renderTicketList()}
// // //       </Grid>
// // //       <Grid item xs={12} lg={4}>
// // //         <Paper elevation={0} sx={{ p: 2, mb: 3, height: '350px' }}><Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>Ticket Priority</Typography><Box sx={{ height: 'calc(100% - 48px)' }}><Pie data={priorityData} options={chartOptions} /></Box></Paper>
// // //         <Paper elevation={0} sx={{ p: 2, height: '350px' }}><Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>Ticket Status</Typography><Box sx={{ height: 'calc(100% - 48px)' }}><Doughnut data={statusData} options={doughnutOptions} /></Box></Paper>
// // //       </Grid>
// // //     </Grid>
// // //   );
// // // };


// // // // ===================================================================================
// // // //  COMPONENT 2: TICKET DETAIL VIEW
// // // // ===================================================================================
// // // const DetailRow = ({ label, value, icon }) => (
// // //   <><Grid item xs={5}><Typography variant="subtitle2" color="text.secondary">{label}</Typography></Grid><Grid item xs={7}><Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', fontWeight: 500 }}>{icon && React.cloneElement(icon, { sx: { mr: 1 } })}{value}</Typography></Grid><Grid item xs={12}><Divider sx={{ my: 1.5 }} /></Grid></>
// // // );

// // // const TicketDetailView = ({ ticket, onBackToList, onUpdateStatus }) => {
// // //   const [status, setStatus] = useState('');

// // //   useEffect(() => {
// // //     if (ticket) {
// // //       setStatus(ticket.status);
// // //     }
// // //   }, [ticket]);

// // //   if (!ticket) return <Typography>No ticket selected or not found.</Typography>;

// // //   const handleStatusUpdateClick = () => {
// // //     onUpdateStatus(ticket.id, status);
// // //   };

// // //   return (
// // //     <Grid container spacing={3}>
// // //       <Grid item xs={12} md={4}>
// // //         <Paper elevation={2} sx={{ p: 2 }}>
// // //           <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
// // //             <IconButton onClick={onBackToList} sx={{ mr: 1 }}><ArrowBackIcon /></IconButton>
// // //             <Typography variant="h6" fontWeight="bold">Ticket Details</Typography>
// // //           </Box>
// // //           <Box sx={{ bgcolor: '#e8f5e9', color: '#388e3c', p: 1.5, borderRadius: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2, fontWeight: 'bold' }}><CheckCircleIcon sx={{ mr: 1 }} /> TICKET # {ticket.displayId}</Box>
// // //           <Grid container alignItems="center" spacing={1}>
// // //             <DetailRow label="Subject" value={ticket.subject} /><DetailRow label="Employee" value={ticket.employee} icon={<PersonIcon />} /><DetailRow label="Priority" value={ticket.priority} /><DetailRow label="Department" value={ticket.department} /><DetailRow label="Assigned to" value={ticket.assignedTo} /><DetailRow label="Created at" value={ticket.date} icon={<CalendarIcon />} />
// // //           </Grid>
// // //           <Box sx={{ mt: 2 }}>
// // //             <Typography variant="subtitle2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}><LeaderboardIcon sx={{ mr: 1 }} /> Status *</Typography>
// // //             <FormControl fullWidth size="small">
// // //               <Select value={status} onChange={(e) => setStatus(e.target.value)}>
// // //                 <MenuItem value="Open">Open</MenuItem>
// // //                 <MenuItem value="Closed">Closed</MenuItem>
// // //               </Select>
// // //             </FormControl>
// // //           </Box>
// // //           <Button onClick={handleStatusUpdateClick} fullWidth variant="contained" sx={{ mt: 3, bgcolor: '#673ab7', '&:hover': { bgcolor: '#5e35b1' } }}>Update Status</Button>
// // //         </Paper>
// // //       </Grid>
// // //       <Grid item xs={12} md={8}>
// // //         <Paper elevation={2} sx={{ p: 2, height: '100%' }}>
// // //           <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
// // //             Description
// // //           </Typography>
// // //           <Typography variant="body1" sx={{ whiteSpace: 'pre-line', wordBreak: 'break-word' }}>
// // //             {stripHtml(ticket.description)}
// // //           </Typography>
// // //         </Paper>
// // //       </Grid>
// // //     </Grid>
// // //   );
// // // };


// // // // ===================================================================================
// // // //  COMPONENT 3: MAIN HELPDESK SYSTEM (PARENT)
// // // // ===================================================================================
// // // const HelpdeskSystem = () => {
// // //   const [viewMode, setViewMode] = useState('list');
// // //   const [selectedTicketId, setSelectedTicketId] = useState(null);
// // //   const [tickets, setTickets] = useState([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [error, setError] = useState(null);

// // //   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
// // //   const [ticketToEdit, setTicketToEdit] = useState(null);

// // //   // INTEGRATION POINT 1: Fetching all tickets
// // //   const fetchTickets = useCallback(async () => {
// // //     setLoading(true);
// // //     setError(null);
// // //     try {
// // //       // This GET request matches your API for fetching all tickets
// // //       const response = await axiosInstance.get('/admin_support_tickets/');
// // //       setTickets(Array.isArray(response.data) ? response.data.map(transformApiTicket) : []);
// // //     } catch (err) {
// // //       setError(err.message || 'Failed to fetch tickets.');
// // //       console.error("Fetch tickets error:", err);
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   }, []);

// // //   useEffect(() => { fetchTickets(); }, [fetchTickets]);

// // //   const handleOpenEditModal = (ticketId) => {
// // //     const ticket = tickets.find(t => t.id === ticketId);
// // //     if (ticket) {
// // //       setTicketToEdit(ticket);
// // //       setIsEditModalOpen(true);
// // //     }
// // //   };

// // //   const handleCloseEditModal = () => {
// // //     setIsEditModalOpen(false);
// // //     setTicketToEdit(null);
// // //   };

// // //   // INTEGRATION POINT 2: Updating a ticket's status (used by the modal)
// // //   const handleUpdateTicket = async (ticketId, updateData) => {
// // //     const originalTickets = [...tickets];

// // //     const updatedTickets = tickets.map(ticket =>
// // //       ticket.id === ticketId ? { ...ticket, status: updateData.status } : ticket
// // //     );
// // //     setTickets(updatedTickets);

// // //     try {
// // //       // This PATCH request matches your API for updating a ticket
// // //       // The updateData is correctly formatted as { status: '...' }
// // //       await axiosInstance.patch(`/admin_support_tickets/${ticketId}/`, updateData);
// // //       alert(`Ticket #${ticketId} status updated successfully.`);
// // //     } catch (err) {
// // //       alert(`Failed to update ticket #${ticketId}. Please try again.`);
// // //       console.error("Update error:", err);
// // //       setTickets(originalTickets); // Revert on failure
// // //     }
// // //   };

// // //   // This function is also a valid way to update status (used by the detail view)
// // //   const handleUpdateTicketStatus = async (ticketId, newStatus) => {
// // //     const originalTickets = [...tickets];
// // //     const updatedTickets = tickets.map(ticket =>
// // //       ticket.id === ticketId ? { ...ticket, status: newStatus } : ticket
// // //     );
// // //     setTickets(updatedTickets);

// // //     try {
// // //       // This PATCH request also correctly updates the status
// // //       await axiosInstance.patch(`/admin_support_tickets/${ticketId}/`, { status: newStatus });
// // //       alert(`Ticket #${ticketId} status updated to ${newStatus}.`);
// // //     } catch (err) {
// // //       alert(`Failed to update status for ticket #${ticketId}.`);
// // //       console.error("Status update error:", err);
// // //       setTickets(originalTickets); // Revert on failure
// // //     }
// // //   };

// // //   // INTEGRATION POINT 3: Deleting a ticket
// // //   const handleDeleteTicket = async (ticketId) => {
// // //     if (window.confirm('Are you sure you want to delete this ticket?')) {
// // //       try {
// // //         // This DELETE request matches your API for deleting a ticket
// // //         await axiosInstance.delete(`/admin_support_tickets/${ticketId}/`);
// // //         setTickets(prevTickets => prevTickets.filter(ticket => ticket.id !== ticketId));
// // //         alert(`Ticket #${ticketId} has been deleted.`);
// // //       } catch (err) {
// // //         alert(`Failed to delete ticket #${ticketId}. Please try again.`);
// // //         console.error("Delete error:", err);
// // //       }
// // //     }
// // //   };

// // //   const handleViewTicket = (ticketId) => {
// // //     setSelectedTicketId(ticketId);
// // //     setViewMode('detail');
// // //   };

// // //   const handleBackToList = () => {
// // //     setViewMode('list');
// // //     setSelectedTicketId(null);
// // //   };

// // //   const selectedTicketData = tickets.find(t => t.id === selectedTicketId);

// // //   const renderContent = () => {
// // //     switch (viewMode) {
// // //       case 'detail':
// // //         return <TicketDetailView ticket={selectedTicketData} onBackToList={handleBackToList} onUpdateStatus={handleUpdateTicketStatus} />;
// // //       case 'list':
// // //       default:
// // //         return <TicketDashboard
// // //           tickets={tickets}
// // //           onViewTicket={handleViewTicket}
// // //           onDeleteTicket={handleDeleteTicket}
// // //           onEditTicket={handleOpenEditModal}
// // //           onRadioSelect={handleViewTicket}
// // //           selectedTicketId={selectedTicketId}
// // //           loading={loading}
// // //           error={error}
// // //         />;
// // //     }
// // //   };

// // //   return (
// // //     <Box sx={{ p: 3, bgcolor: '#f4f6f8', minHeight: '100vh' }}>
// // //       {renderContent()}
// // //       <EditTicketModal
// // //         open={isEditModalOpen}
// // //         onClose={handleCloseEditModal}
// // //         onUpdate={handleUpdateTicket}
// // //         ticket={ticketToEdit}
// // //       />
// // //     </Box>
// // //   );
// // // };

// // // export default HelpdeskSystem;   ///



 
// // import React, { useState, useMemo, useEffect, useCallback } from 'react';
// // import {
// //   Box, Typography, Button, Paper, Card, CardContent, Grid,
// //   Divider, FormControl, Select, MenuItem, TextField, IconButton, Avatar, Radio,
// //   Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions,
// //   CircularProgress, Alert,
// // } from '@mui/material';
// // import {
// //   Add as AddIcon,
// //   AccessTime as AccessTimeIcon,
// //   LockOutlined as LockOutlinedIcon,
// //   Delete as DeleteIcon,
// //   CalendarTodayOutlined as CalendarIcon,
// //   PersonOutline as PersonIcon,
// //   CheckCircle as CheckCircleIcon,
// //   Leaderboard as LeaderboardIcon,
// //   ChatBubbleOutline as ReplyIcon,
// //   NoteAddOutlined as NoteIcon,
// //   AttachFileOutlined as AttachIcon,
// //   ArrowBack as ArrowBackIcon,
// //   Download as DownloadIcon,
// //   Edit as EditIcon,
// //   Visibility as VisibilityIcon,
// //   Close as CloseIcon,
// // } from '@mui/icons-material';
// // import axiosInstance from "../utils/axiosInstance";
// // // Chart.js imports
// // import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
// // import { Pie, Doughnut } from 'react-chartjs-2';
// // import ChartDataLabels from 'chartjs-plugin-datalabels';
 
// // // Rich Text Editor imports
// // import ReactQuill from 'react-quill';
// // import 'react-quill/dist/quill.snow.css';
 
// // ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);
 
// // // --- HELPER FUNCTIONS ---
 
// // /**
// //  * Safely strips HTML tags from a string to return plain text.
// //  * This is used for displaying the description without HTML tags.
// //  * @param {string} html The HTML string to parse.
// //  * @returns {string} The plain text content.
// //  */
// // const stripHtml = (html) => {
// //   if (typeof window === 'undefined' || !html) return html || '';
// //   const doc = new DOMParser().parseFromString(html, 'text/html');
// //   return doc.body.textContent || "";
// // };
 
// // const transformApiTicket = (apiTicket) => {
// //   const formatDate = (dateString) => {
// //     if (!dateString) return 'N/A';
// //     const date = new Date(dateString);
// //     if (isNaN(date.getTime())) return 'N/A';
// //     const day = String(date.getDate()).padStart(2, '0');
// //     const month = String(date.getMonth() + 1).padStart(2, '0');
// //     const year = date.getFullYear();
// //     return `${day}-${month}-${year}`;
// //   };
 
// //   const generateDisplayId = (id) => {
// //     const letters = 'IJKLMONPQRSTUVWXYZ';
// //     const part1 = String(id).padStart(3, '0');
// //     const part2 = letters[id % letters.length] + letters[(id * 3) % letters.length];
// //     return `${part1}${part2}L`;
// //   };
 
// //   // This function correctly maps the API response fields to the names used in the frontend.
// //   return {
// //     id: apiTicket.id,
// //     displayId: generateDisplayId(apiTicket.id),
// //     subject: apiTicket.subject,
// //     employee: apiTicket.employee_name, // Maps employee_name
// //     assignedTo: 'Support Team',
// //     department: apiTicket.department_name, // Maps department_name
// //     date: formatDate(apiTicket.created_at),
// //     priority: apiTicket.priority,
// //     status: apiTicket.ticket_status, // Maps ticket_status to 'status' for frontend use
// //     description: apiTicket.description || '',
// //   };
// // };
 
// // // ===================================================================================
// // //  COMPONENT 0: EDIT TICKET MODAL
// // // ===================================================================================
// // const EditTicketModal = ({ open, onClose, onUpdate, ticket }) => {
// //   const [editedStatus, setEditedStatus] = useState('');
 
// //   useEffect(() => {
// //     if (ticket) {
// //       setEditedStatus(ticket.status);
// //     }
// //   }, [ticket]);
 
// //   const handleUpdateClick = () => {
// //     // onUpdate is called with the correct payload structure: { status: '...' }
// //     onUpdate(ticket.id, { status: editedStatus });
// //     onClose();
// //   };
 
// //   if (!ticket) return null;
 
// //   return (
// //     <Dialog open={open} onClose={onClose} PaperProps={{ sx: { borderRadius: 2, width: '100%', maxWidth: 450 } }}>
// //       <DialogTitle sx={{ fontWeight: 'bold', fontSize: { xs: '1rem', sm: '1.25rem' }, pt: 2.5, pb: 1 }}>
// //         Update Ticket Status
// //         <IconButton
// //           aria-label="close"
// //           onClick={onClose}
// //           sx={{ position: 'absolute', right: 8, top: 8, color: (theme) => theme.palette.grey[500] }}
// //         >
// //           <CloseIcon />
// //         </IconButton>
// //       </DialogTitle>
// //       <DialogContent>
// //         <DialogContentText sx={{ mb: 2, fontSize: { xs: '0.875rem', sm: '1rem' } }}>
// //           Select the new status for Ticket #{ticket.displayId}.
// //         </DialogContentText>
// //         <FormControl fullWidth size="small" sx={{ mt: 1 }}>
// //           <Select
// //             value={editedStatus}
// //             onChange={(e) => setEditedStatus(e.target.value)}
// //             inputProps={{ 'aria-label': 'Select Ticket Status' }}
// //           >
// //             <MenuItem value="Open">Open</MenuItem>
// //             <MenuItem value="Closed">Closed</MenuItem>
// //           </Select>
// //         </FormControl>
// //       </DialogContent>
// //       <DialogActions sx={{ p: '16px 24px' }}>
// //         <Button onClick={onClose} sx={{ color: 'text.secondary', textTransform: 'none' }}>Close</Button>
// //         <Button onClick={handleUpdateClick} variant="contained" sx={{ bgcolor: '#673ab7', '&:hover': { bgcolor: '#5e35b1' }, textTransform: 'none', px: 3 }}>Update</Button>
// //       </DialogActions>
// //     </Dialog>
// //   );
// // };
 
// // // ===================================================================================
// // //  COMPONENT 1: TICKET LIST & DASHBOARD VIEW
// // // ===================================================================================
// // const TicketDashboard = ({ tickets, onViewTicket, onDeleteTicket, onEditTicket, onRadioSelect, selectedTicketId, loading, error }) => {
// //   const { priorityData, statusData } = useMemo(() => {
// //     const counts = { High: 0, Low: 0, Medium: 0, Critical: 0, Open: 0, Closed: 0 };
// //     (tickets || []).forEach(ticket => {
// //       if (ticket.priority in counts) counts[ticket.priority]++;
// //       if (ticket.status in counts) counts[ticket.status]++;
// //     });
// //     return {
// //       priorityData: {
// //         labels: ['Low', 'High', 'Medium', 'Critical'],
// //         datasets: [{
// //           data: [counts.Low, counts.High, counts.Medium, counts.Critical],
// //           backgroundColor: ['#F9A825', '#F57F17', '#FDD835', '#FFF59D']
// //         }],
// //       },
// //       statusData: {
// //         labels: ['Open', 'Closed'],
// //         datasets: [{
// //           data: [counts.Open, counts.Closed],
// //           backgroundColor: ['#2196F3', '#4CAF50']
// //         }],
// //       }
// //     };
// //   }, [tickets]);
 
// //   const chartOptions = {
// //     responsive: true,
// //     maintainAspectRatio: false,
// //     plugins: {
// //       legend: {
// //         position: 'right',
// //         labels: {
// //           font: {
// //             size: 10, // Smaller font for legend on smaller screens
// //           },
// //         },
// //       },
// //       datalabels: { display: false }
// //     }
// //   };
// //   const doughnutOptions = { ...chartOptions, cutout: '70%' };
 
// //   const getPriorityColor = (p) => {
// //     const priorityLower = p?.toLowerCase();
// //     switch (priorityLower) {
// //       case 'critical': return 'error.dark';
// //       case 'high': return 'error.main';
// //       case 'medium': return 'warning.dark';
// //       case 'low': return 'warning.main';
// //       default: return 'text.secondary';
// //     }
// //   };
// //   const getStatusColor = (s) => s?.toLowerCase() === 'closed' ? 'success.main' : 'primary.main';
 
// //   const renderTicketList = () => {
// //     if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}><CircularProgress /></Box>;
// //     if (error) return <Alert severity="error" sx={{ m: 2 }}>{error}</Alert>;
// //     if (!tickets || tickets.length === 0) return <Typography sx={{ textAlign: 'center', p: 5, color: 'text.secondary' }}>No tickets found.</Typography>;
 
// //     return tickets.map((ticket) => (
// //       <Card key={ticket.id} elevation={1} sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: { xs: 'flex-start', sm: 'center' }, mb: 2, p: { xs: 1, sm: 2 } }}>
// //         <Box sx={{
// //           px: { xs: 1, sm: 2 },
// //           py: { xs: 1, sm: 0 },
// //           display: 'flex',
// //           alignItems: 'center',
// //           justifyContent: 'center',
// //           width: { xs: '100%', sm: 'auto' },
// //           mb: { xs: 1, sm: 0 }
// //         }}>
// //           <Avatar sx={{ bgcolor: 'primary.main', width: 48, height: 48, mr: { xs: 1, sm: 0 } }}>
// //             <AccessTimeIcon sx={{ fontSize: '1.8rem', color: 'white' }} />
// //           </Avatar>
// //           <Radio
// //             checked={selectedTicketId === ticket.id}
// //             onChange={() => onRadioSelect(ticket.id)}
// //             value={ticket.id}
// //             name="ticket-selection-radio"
// //             sx={{ display: { sm: 'none' } }} // Hide radio on larger screens, show on small
// //           />
// //         </Box>
// //         <CardContent sx={{ flexGrow: 1, p: { xs: '8px !important', sm: '12px !important' }, width: { xs: '100%', sm: 'auto' } }}>
// //           <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
// //             <LockOutlinedIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
// //             <Typography variant="h6" component="div" fontWeight="500" sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}>{ticket.subject}</Typography>
// //           </Box>
// //           <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: { xs: 1, sm: 2 }, color: 'text.secondary', fontSize: '0.875rem' }}>
// //             <Typography variant="body2" fontWeight="bold"># {ticket.displayId}</Typography>
// //             <Box sx={{ display: 'flex', alignItems: 'center' }}>
// //               <PersonIcon sx={{ fontSize: '1.1rem', mr: 0.5, color: 'primary.light' }} /> <Typography variant="body2">{ticket.employee}</Typography>
// //             </Box>
// //             <Box sx={{ display: 'flex', alignItems: 'center' }}>
// //               <CalendarIcon sx={{ fontSize: '1rem', mr: 0.5 }} /> <Typography variant="body2">{ticket.date}</Typography>
// //             </Box>
// //             <Typography variant="body2" sx={{ color: getPriorityColor(ticket.priority), fontWeight: '500' }}>{ticket.priority}</Typography>
// //             <Typography variant="body2" sx={{ color: getStatusColor(ticket.status), fontWeight: '500' }}>{ticket.status}</Typography>
// //           </Box>
// //           <Box sx={{
// //             display: 'flex',
// //             flexWrap: 'wrap', // Allow buttons to wrap on small screens
// //             gap: { xs: 0.5, sm: 1.5 },
// //             mt: 1.5,
// //             borderTop: 1,
// //             borderColor: 'divider',
// //             pt: 1.5
// //           }}>
// //             <Button size="small" sx={{ textTransform: 'none', color: 'text.secondary', p: 0.5 }} startIcon={<EditIcon />} onClick={() => onEditTicket(ticket.id)}>
// //               Edit
// //             </Button>
// //             <Button size="small" sx={{ textTransform: 'none', color: 'text.secondary', p: 0.5 }} startIcon={<VisibilityIcon />} onClick={() => onViewTicket(ticket.id)}>
// //               View Ticket
// //             </Button>
// //             <Button size="small" sx={{ textTransform: 'none', color: 'error.main', p: 0.5 }} startIcon={<DeleteIcon />} onClick={() => onDeleteTicket(ticket.id)}>
// //               Delete
// //             </Button>
// //           </Box>
// //         </CardContent>
// //         <Box sx={{ px: 1, display: { xs: 'none', sm: 'block' } }}> {/* Hide radio on small screens, show on large */}
// //           <Radio checked={selectedTicketId === ticket.id} onChange={() => onRadioSelect(ticket.id)} value={ticket.id} name="ticket-selection-radio" />
// //         </Box>
// //       </Card>
// //     ));
// //   };
 
// //   return (
// //     <Grid container spacing={3}>
// //       <Grid item xs={12} lg={8}>
// //         <Paper elevation={0} sx={{ p: { xs: 1, sm: 2 }, display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
// //           <Typography variant="h6" fontWeight="bold" sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}>Tickets List</Typography>
// //         </Paper>
// //         {renderTicketList()}
// //       </Grid>
// //       <Grid item xs={12} lg={4}>
// //         <Paper elevation={0} sx={{ p: { xs: 1, sm: 2 }, mb: 3, height: { xs: '300px', sm: '350px' } }}>
// //           <Typography variant="h6" fontWeight="bold" sx={{ mb: { xs: 1, sm: 2 }, fontSize: { xs: '1rem', sm: '1.25rem' } }}>Ticket Priority</Typography>
// //           <Box sx={{ height: 'calc(100% - 48px)' }}>
// //             <Pie data={priorityData} options={chartOptions} />
// //           </Box>
// //         </Paper>
// //         <Paper elevation={0} sx={{ p: { xs: 1, sm: 2 }, height: { xs: '300px', sm: '350px' } }}>
// //           <Typography variant="h6" fontWeight="bold" sx={{ mb: { xs: 1, sm: 2 }, fontSize: { xs: '1rem', sm: '1.25rem' } }}>Ticket Status</Typography>
// //           <Box sx={{ height: 'calc(100% - 48px)' }}>
// //             <Doughnut data={statusData} options={doughnutOptions} />
// //           </Box>
// //         </Paper>
// //       </Grid>
// //     </Grid>
// //   );
// // };
 
 
// // // ===================================================================================
// // //  COMPONENT 2: TICKET DETAIL VIEW
// // // ===================================================================================
// // const DetailRow = ({ label, value, icon }) => (
// //   <>
// //     <Grid item xs={12} sm={5}>
// //       <Typography variant="subtitle2" color="text.secondary" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>{label}</Typography>
// //     </Grid>
// //     <Grid item xs={12} sm={7}>
// //       <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', fontWeight: 500, fontSize: { xs: '0.875rem', sm: '1rem' } }}>
// //         {icon && React.cloneElement(icon, { sx: { mr: 1, fontSize: { xs: '1rem', sm: '1.25rem' } } })}
// //         {value}
// //       </Typography>
// //     </Grid>
// //     <Grid item xs={12}>
// //       <Divider sx={{ my: { xs: 0.5, sm: 1.5 } }} />
// //     </Grid>
// //   </>
// // );
 
// // const TicketDetailView = ({ ticket, onBackToList, onUpdateStatus }) => {
// //   const [status, setStatus] = useState('');
 
// //   useEffect(() => {
// //     if (ticket) {
// //       setStatus(ticket.status);
// //     }
// //   }, [ticket]);
 
// //   if (!ticket) return <Typography sx={{ p: 2, textAlign: 'center' }}>No ticket selected or not found.</Typography>;
 
// //   const handleStatusUpdateClick = () => {
// //     onUpdateStatus(ticket.id, status);
// //   };
 
// //   return (
// //     <Grid container spacing={3}>
// //       <Grid item xs={12} md={4}>
// //         <Paper elevation={2} sx={{ p: { xs: 2, sm: 3 } }}>
// //           <Box sx={{ display: 'flex', alignItems: 'center', mb: { xs: 1, sm: 2 } }}>
// //             <IconButton onClick={onBackToList} sx={{ mr: 1, p: { xs: 0.5, sm: 1 } }}><ArrowBackIcon sx={{ fontSize: { xs: '1.2rem', sm: '1.5rem' } }} /></IconButton>
// //             <Typography variant="h6" fontWeight="bold" sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}>Ticket Details</Typography>
// //           </Box>
// //           <Box sx={{ bgcolor: '#e8f5e9', color: '#388e3c', p: { xs: 1, sm: 1.5 }, borderRadius: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', mb: { xs: 1.5, sm: 2 }, fontWeight: 'bold', fontSize: { xs: '0.875rem', sm: '1rem' } }}>
// //             <CheckCircleIcon sx={{ mr: 1, fontSize: { xs: '1rem', sm: '1.25rem' } }} /> TICKET # {ticket.displayId}
// //           </Box>
// //           <Grid container alignItems="center" spacing={1}>
// //             <DetailRow label="Subject" value={ticket.subject} />
// //             <DetailRow label="Employee" value={ticket.employee} icon={<PersonIcon />} />
// //             <DetailRow label="Priority" value={ticket.priority} />
// //             <DetailRow label="Department" value={ticket.department} />
// //             <DetailRow label="Assigned to" value={ticket.assignedTo} />
// //             <DetailRow label="Created at" value={ticket.date} icon={<CalendarIcon />} />
// //           </Grid>
// //           <Box sx={{ mt: { xs: 1.5, sm: 2 } }}>
// //             <Typography variant="subtitle2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', mb: 1, fontSize: { xs: '0.75rem', sm: '0.875rem' } }}><LeaderboardIcon sx={{ mr: 1, fontSize: { xs: '1rem', sm: '1.25rem' } }} /> Status *</Typography>
// //             <FormControl fullWidth size="small">
// //               <Select
// //                 value={status}
// //                 onChange={(e) => setStatus(e.target.value)}
// //                 inputProps={{ 'aria-label': 'Select Ticket Status' }}
// //               >
// //                 <MenuItem value="Open">Open</MenuItem>
// //                 <MenuItem value="Closed">Closed</MenuItem>
// //               </Select>
// //             </FormControl>
// //           </Box>
// //           <Button onClick={handleStatusUpdateClick} fullWidth variant="contained" sx={{ mt: { xs: 2, sm: 3 }, bgcolor: '#673ab7', '&:hover': { bgcolor: '#5e35b1' }, fontSize: { xs: '0.875rem', sm: '1rem' } }}>Update Status</Button>
// //         </Paper>
// //       </Grid>
// //       <Grid item xs={12} md={8}>
// //         <Paper elevation={2} sx={{ p: { xs: 2, sm: 3 }, height: '100%' }}>
// //           <Typography variant="h6" fontWeight="bold" sx={{ mb: { xs: 1, sm: 2 }, fontSize: { xs: '1rem', sm: '1.25rem' } }}>
// //             Description
// //           </Typography>
// //           <Typography variant="body1" sx={{ whiteSpace: 'pre-line', wordBreak: 'break-word', fontSize: { xs: '0.875rem', sm: '1rem' } }}>
// //             {stripHtml(ticket.description)}
// //           </Typography>
// //         </Paper>
// //       </Grid>
// //     </Grid>
// //   );
// // };
 
 
// // // ===================================================================================
// // //  COMPONENT 3: MAIN HELPDESK SYSTEM (PARENT)
// // // ===================================================================================
// // const HelpdeskSystem = () => {
// //   const [viewMode, setViewMode] = useState('list');
// //   const [selectedTicketId, setSelectedTicketId] = useState(null);
// //   const [tickets, setTickets] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);
 
// //   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
// //   const [ticketToEdit, setTicketToEdit] = useState(null);
 
// //   // INTEGRATION POINT 1: Fetching all tickets
// //   const fetchTickets = useCallback(async () => {
// //     setLoading(true);
// //     setError(null);
// //     try {
// //       // This GET request matches your API for fetching all tickets
// //       const response = await axiosInstance.get('/admin_support_tickets/');
// //       setTickets(Array.isArray(response.data) ? response.data.map(transformApiTicket) : []);
// //     } catch (err) {
// //       setError(err.message || 'Failed to fetch tickets.');
// //       console.error("Fetch tickets error:", err);
// //     } finally {
// //       setLoading(false);
// //     }
// //   }, []);
 
// //   useEffect(() => { fetchTickets(); }, [fetchTickets]);
 
// //   const handleOpenEditModal = (ticketId) => {
// //     const ticket = tickets.find(t => t.id === ticketId);
// //     if (ticket) {
// //       setTicketToEdit(ticket);
// //       setIsEditModalOpen(true);
// //     }
// //   };
 
// //   const handleCloseEditModal = () => {
// //     setIsEditModalOpen(false);
// //     setTicketToEdit(null);
// //   };
 
// //   // INTEGRATION POINT 2: Updating a ticket's status (used by the modal)
// //   const handleUpdateTicket = async (ticketId, updateData) => {
// //     const originalTickets = [...tickets];
 
// //     const updatedTickets = tickets.map(ticket =>
// //       ticket.id === ticketId ? { ...ticket, status: updateData.status } : ticket
// //     );
// //     setTickets(updatedTickets);
 
// //     try {
// //       // This PATCH request matches your API for updating a ticket
// //       // The updateData is correctly formatted as { status: '...' }
// //       await axiosInstance.patch(`/admin_support_tickets/${ticketId}/`, updateData);
// //       // alert(`Ticket #${ticketId} status updated successfully.`); // Consider using Snackbar for less intrusive feedback
// //       fetchTickets(); // Re-fetch to ensure data consistency
// //     } catch (err) {
// //       alert(`Failed to update ticket #${ticketId}. Please try again.`);
// //       console.error("Update error:", err);
// //       setTickets(originalTickets); // Revert on failure
// //     }
// //   };
 
// //   // This function is also a valid way to update status (used by the detail view)
// //   const handleUpdateTicketStatus = async (ticketId, newStatus) => {
// //     const originalTickets = [...tickets];
// //     const updatedTickets = tickets.map(ticket =>
// //       ticket.id === ticketId ? { ...ticket, status: newStatus } : ticket
// //     );
// //     setTickets(updatedTickets);
 
// //     try {
// //       // This PATCH request also correctly updates the status
// //       await axiosInstance.patch(`/admin_support_tickets/${ticketId}/`, { status: newStatus });
// //       // alert(`Ticket #${ticketId} status updated to ${newStatus}.`); // Consider using Snackbar
// //       fetchTickets(); // Re-fetch to ensure data consistency
// //     } catch (err) {
// //       alert(`Failed to update status for ticket #${ticketId}.`);
// //       console.error("Status update error:", err);
// //       setTickets(originalTickets); // Revert on failure
// //     }
// //   };
 
// //   // INTEGRATION POINT 3: Deleting a ticket
// //   const handleDeleteTicket = async (ticketId) => {
// //     if (window.confirm('Are you sure you want to delete this ticket?')) {
// //       try {
// //         // This DELETE request matches your API for deleting a ticket
// //         await axiosInstance.delete(`/admin_support_tickets/${ticketId}/`);
// //         setTickets(prevTickets => prevTickets.filter(ticket => ticket.id !== ticketId));
// //         // alert(`Ticket #${ticketId} has been deleted.`); // Consider using Snackbar
// //       } catch (err) {
// //         alert(`Failed to delete ticket #${ticketId}. Please try again.`);
// //         console.error("Delete error:", err);
// //       }
// //     }
// //   };
 
// //   const handleViewTicket = (ticketId) => {
// //     setSelectedTicketId(ticketId);
// //     setViewMode('detail');
// //   };
 
// //   const handleBackToList = () => {
// //     setViewMode('list');
// //     setSelectedTicketId(null);
// //   };
 
// //   const selectedTicketData = tickets.find(t => t.id === selectedTicketId);
 
// //   const renderContent = () => {
// //     switch (viewMode) {
// //       case 'detail':
// //         return <TicketDetailView ticket={selectedTicketData} onBackToList={handleBackToList} onUpdateStatus={handleUpdateTicketStatus} />;
// //       case 'list':
// //       default:
// //         return <TicketDashboard
// //           tickets={tickets}
// //           onViewTicket={handleViewTicket}
// //           onDeleteTicket={handleDeleteTicket}
// //           onEditTicket={handleOpenEditModal}
// //           onRadioSelect={handleViewTicket}
// //           selectedTicketId={selectedTicketId}
// //           loading={loading}
// //           error={error}
// //         />;
// //     }
// //   };
 
// //   return (
// //     <Box sx={{ p: { xs: 2, sm: 3 }, bgcolor: '#f4f6f8', minHeight: '100vh' }}>
// //       {renderContent()}
// //       <EditTicketModal
// //         open={isEditModalOpen}
// //         onClose={handleCloseEditModal}
// //         onUpdate={handleUpdateTicket}
// //         ticket={ticketToEdit}
// //       />
// //     </Box>
// //   );
// // };
 
// // export default HelpdeskSystem;
//  import React, { useState, useMemo, useEffect, useCallback } from 'react';
// import {
//   Box, Typography, Button, Paper, Card, CardContent, Grid,
//   Divider, FormControl, Select, MenuItem, TextField, IconButton, Avatar, Radio,
//   Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions,
//   CircularProgress, Alert,
// } from '@mui/material';
// import {
//   Add as AddIcon,
//   AccessTime as AccessTimeIcon,
//   LockOutlined as LockOutlinedIcon,
//   Delete as DeleteIcon,
//   CalendarTodayOutlined as CalendarIcon,
//   PersonOutline as PersonIcon,
//   CheckCircle as CheckCircleIcon,
//   Leaderboard as LeaderboardIcon,
//   ChatBubbleOutline as ReplyIcon,
//   NoteAddOutlined as NoteIcon,
//   AttachFileOutlined as AttachIcon,
//   ArrowBack as ArrowBackIcon,
//   Download as DownloadIcon,
//   Edit as EditIcon,
//   Visibility as VisibilityIcon,
//   Close as CloseIcon,
// } from '@mui/icons-material';
// import axiosInstance from "../utils/axiosInstance";
// // Chart.js imports
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
// import { Pie, Doughnut } from 'react-chartjs-2';
// import ChartDataLabels from 'chartjs-plugin-datalabels';
 
// // Rich Text Editor imports
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
 
// ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);
 
// // --- HELPER FUNCTIONS ---
 
// /**
//  * Safely strips HTML tags from a string to return plain text.
//  * This is used for displaying the description without HTML tags.
//  * @param {string} html The HTML string to parse.
//  * @returns {string} The plain text content.
//  */
// const stripHtml = (html) => {
//   if (typeof window === 'undefined' || !html) return html || '';
//   const doc = new DOMParser().parseFromString(html, 'text/html');
//   return doc.body.textContent || "";
// };
 
// const transformApiTicket = (apiTicket) => {
//   const formatDate = (dateString) => {
//     if (!dateString) return 'N/A';
//     const date = new Date(dateString);
//     if (isNaN(date.getTime())) return 'N/A';
//     const day = String(date.getDate()).padStart(2, '0');
//     const month = String(date.getMonth() + 1).padStart(2, '0');
//     const year = date.getFullYear();
//     return `${day}-${month}-${year}`;
//   };
 
//   const generateDisplayId = (id) => {
//     const letters = 'IJKLMONPQRSTUVWXYZ';
//     const part1 = String(id).padStart(3, '0');
//     const part2 = letters[id % letters.length] + letters[(id * 3) % letters.length];
//     return `${part1}${part2}L`;
//   };
 
//   // This function correctly maps the API response fields to the names used in the frontend.
//   return {
//     id: apiTicket.id,
//     displayId: generateDisplayId(apiTicket.id),
//     subject: apiTicket.subject,
//     employee: apiTicket.employee_name, // Maps employee_name
//     assignedTo: 'Support Team',
//     department: apiTicket.department_name, // Maps department_name
//     date: formatDate(apiTicket.created_at),
//     priority: apiTicket.priority,
//     status: apiTicket.ticket_status, // Maps ticket_status to 'status' for frontend use
//     description: apiTicket.description || '',
//   };
// };
 
// // ===================================================================================
// //  COMPONENT 0: EDIT TICKET MODAL
// // ===================================================================================
// const EditTicketModal = ({ open, onClose, onUpdate, ticket }) => {
//   const [editedStatus, setEditedStatus] = useState('');
 
//   useEffect(() => {
//     if (ticket) {
//       setEditedStatus(ticket.status);
//     }
//   }, [ticket]);
 
//   const handleUpdateClick = () => {
//     // onUpdate is called with the correct payload structure: { status: '...' }
//     onUpdate(ticket.id, { status: editedStatus });
//     onClose();
//   };
 
//   if (!ticket) return null;
 
//   return (
//     <Dialog open={open} onClose={onClose} PaperProps={{ sx: { borderRadius: 2, width: '100%', maxWidth: 450 } }}>
//       <DialogTitle sx={{ fontWeight: 'bold', fontSize: { xs: '1rem', sm: '1.25rem' }, pt: 2.5, pb: 1 }}>
//         Update Ticket Status
//         <IconButton
//           aria-label="close"
//           onClick={onClose}
//           sx={{ position: 'absolute', right: 8, top: 8, color: (theme) => theme.palette.grey[500] }}
//         >
//           <CloseIcon />
//         </IconButton>
//       </DialogTitle>
//       <DialogContent>
//         <DialogContentText sx={{ mb: 2, fontSize: { xs: '0.875rem', sm: '1rem' } }}>
//           Select the new status for Ticket #{ticket.displayId}.
//         </DialogContentText>
//         <FormControl fullWidth size="small" sx={{ mt: 1 }}>
//           <Select
//             value={editedStatus}
//             onChange={(e) => setEditedStatus(e.target.value)}
//             inputProps={{ 'aria-label': 'Select Ticket Status' }}
//           >
//             <MenuItem value="Open">Open</MenuItem>
//             <MenuItem value="Closed">Closed</MenuItem>
//           </Select>
//         </FormControl>
//       </DialogContent>
//       <DialogActions sx={{ p: '16px 24px' }}>
//         <Button onClick={onClose} sx={{ color: 'text.secondary', textTransform: 'none' }}>Close</Button>
//         <Button onClick={handleUpdateClick} variant="contained" sx={{ bgcolor: '#673ab7', '&:hover': { bgcolor: '#5e35b1' }, textTransform: 'none', px: 3 }}>Update</Button>
//       </DialogActions>
//     </Dialog>
//   );
// };
 
// // ===================================================================================
// //  COMPONENT 1: TICKET LIST & DASHBOARD VIEW
// // ===================================================================================
// const TicketDashboard = ({ tickets, onViewTicket, onDeleteTicket, onEditTicket, onRadioSelect, selectedTicketId, loading, error }) => {
//   const { priorityData, statusData } = useMemo(() => {
//     const counts = { High: 0, Low: 0, Medium: 0, Critical: 0, Open: 0, Closed: 0 };
//     (tickets || []).forEach(ticket => {
//       if (ticket.priority in counts) counts[ticket.priority]++;
//       if (ticket.status in counts) counts[ticket.status]++;
//     });
//     return {
//       priorityData: {
//         labels: ['Low', 'High', 'Medium', 'Critical'],
//         datasets: [{
//           data: [counts.Low, counts.High, counts.Medium, counts.Critical],
//           backgroundColor: ['#F9A825', '#F57F17', '#FDD835', '#FFF59D']
//         }],
//       },
//       statusData: {
//         labels: ['Open', 'Closed'],
//         datasets: [{
//           data: [counts.Open, counts.Closed],
//           backgroundColor: ['#2196F3', '#4CAF50']
//         }],
//       }
//     };
//   }, [tickets]);
 
//   const chartOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: {
//         position: 'right',
//         labels: {
//           font: {
//             size: 10, // Smaller font for legend on smaller screens
//           },
//         },
//       },
//       datalabels: { display: false }
//     }
//   };
//   const doughnutOptions = { ...chartOptions, cutout: '70%' };
 
//   const getPriorityColor = (p) => {
//     const priorityLower = p?.toLowerCase();
//     switch (priorityLower) {
//       case 'critical': return 'error.dark';
//       case 'high': return 'error.main';
//       case 'medium': return 'warning.dark';
//       case 'low': return 'warning.main';
//       default: return 'text.secondary';
//     }
//   };
//   const getStatusColor = (s) => s?.toLowerCase() === 'closed' ? 'success.main' : 'primary.main';
 
//   const renderTicketList = () => {
//     if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}><CircularProgress /></Box>;
//     if (error) return <Alert severity="error" sx={{ m: 2 }}>{error}</Alert>;
//     if (!tickets || tickets.length === 0) return <Typography sx={{ textAlign: 'center', p: 5, color: 'text.secondary' }}>No tickets found.</Typography>;
 
//     return tickets.map((ticket) => (
//       <Card key={ticket.id} elevation={1} sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: { xs: 'flex-start', sm: 'center' }, mb: 2, p: { xs: 1, sm: 2 } }}>
//         <Box sx={{
//           px: { xs: 1, sm: 2 },
//           py: { xs: 1, sm: 0 },
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center',
//           width: { xs: '100%', sm: 'auto' },
//           mb: { xs: 1, sm: 0 }
//         }}>
//           <Avatar sx={{ bgcolor: 'primary.main', width: 48, height: 48, mr: { xs: 1, sm: 0 } }}>
//             <AccessTimeIcon sx={{ fontSize: '1.8rem', color: 'white' }} />
//           </Avatar>
//           <Radio
//             checked={selectedTicketId === ticket.id}
//             onChange={() => onRadioSelect(ticket.id)}
//             value={ticket.id}
//             name="ticket-selection-radio"
//             sx={{ display: { sm: 'none' } }} // Hide radio on larger screens, show on small
//           />
//         </Box>
//         <CardContent sx={{ flexGrow: 1, p: { xs: '8px !important', sm: '12px !important' }, width: { xs: '100%', sm: 'auto' } }}>
//           <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
//             <LockOutlinedIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
//             <Typography variant="h6" component="div" fontWeight="500" sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}>{ticket.subject}</Typography>
//           </Box>
//           <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: { xs: 1, sm: 2 }, color: 'text.secondary', fontSize: '0.875rem' }}>
//             <Typography variant="body2" fontWeight="bold"># {ticket.displayId}</Typography>
//             <Box sx={{ display: 'flex', alignItems: 'center' }}>
//               <PersonIcon sx={{ fontSize: '1.1rem', mr: 0.5, color: 'primary.light' }} /> <Typography variant="body2">{ticket.employee}</Typography>
//             </Box>
//             <Box sx={{ display: 'flex', alignItems: 'center' }}>
//               <CalendarIcon sx={{ fontSize: '1rem', mr: 0.5 }} /> <Typography variant="body2">{ticket.date}</Typography>
//             </Box>
//             <Typography variant="body2" sx={{ color: getPriorityColor(ticket.priority), fontWeight: '500' }}>{ticket.priority}</Typography>
//             <Typography variant="body2" sx={{ color: getStatusColor(ticket.status), fontWeight: '500' }}>{ticket.status}</Typography>
//           </Box>
//           <Box sx={{
//             display: 'flex',
//             flexWrap: 'wrap', // Allow buttons to wrap on small screens
//             gap: { xs: 0.5, sm: 1.5 },
//             mt: 1.5,
//             borderTop: 1,
//             borderColor: 'divider',
//             pt: 1.5
//           }}>
//             <Button size="small" sx={{ textTransform: 'none', color: 'text.secondary', p: 0.5 }} startIcon={<EditIcon />} onClick={() => onEditTicket(ticket.id)}>
//               Edit
//             </Button>
//             <Button size="small" sx={{ textTransform: 'none', color: 'text.secondary', p: 0.5 }} startIcon={<VisibilityIcon />} onClick={() => onViewTicket(ticket.id)}>
//               View Ticket
//             </Button>
//             <Button size="small" sx={{ textTransform: 'none', color: 'error.main', p: 0.5 }} startIcon={<DeleteIcon />} onClick={() => onDeleteTicket(ticket.id)}>
//               Delete
//             </Button>
//           </Box>
//         </CardContent>
//         <Box sx={{ px: 1, display: { xs: 'none', sm: 'block' } }}> {/* Hide radio on small screens, show on large */}
//           <Radio checked={selectedTicketId === ticket.id} onChange={() => onRadioSelect(ticket.id)} value={ticket.id} name="ticket-selection-radio" />
//         </Box>
//       </Card>
//     ));
//   };
 
//   return (
//     <Grid container spacing={3}>
//       <Grid item xs={12} lg={8}>
//         <Paper elevation={0} sx={{ p: { xs: 1, sm: 2 }, display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
//           <Typography variant="h6" fontWeight="bold" sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}>Tickets List</Typography>
//         </Paper>
//         {renderTicketList()}
//       </Grid>
//       <Grid item xs={12} lg={4}>
//         <Paper elevation={0} sx={{ p: { xs: 1, sm: 2 }, mb: 3, height: { xs: '300px', sm: '350px' } }}>
//           <Typography variant="h6" fontWeight="bold" sx={{ mb: { xs: 1, sm: 2 }, fontSize: { xs: '1rem', sm: '1.25rem' } }}>Ticket Priority</Typography>
//           <Box sx={{ height: 'calc(100% - 48px)' }}>
//             <Pie data={priorityData} options={chartOptions} />
//           </Box>
//         </Paper>
//         <Paper elevation={0} sx={{ p: { xs: 1, sm: 2 }, height: { xs: '300px', sm: '350px' } }}>
//           <Typography variant="h6" fontWeight="bold" sx={{ mb: { xs: 1, sm: 2 }, fontSize: { xs: '1rem', sm: '1.25rem' } }}>Ticket Status</Typography>
//           <Box sx={{ height: 'calc(100% - 48px)' }}>
//             <Doughnut data={statusData} options={doughnutOptions} />
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
//     <Grid item xs={12} sm={5}>
//       <Typography variant="subtitle2" color="text.secondary" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>{label}</Typography>
//     </Grid>
//     <Grid item xs={12} sm={7}>
//       <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', fontWeight: 500, fontSize: { xs: '0.875rem', sm: '1rem' } }}>
//         {icon && React.cloneElement(icon, { sx: { mr: 1, fontSize: { xs: '1rem', sm: '1.25rem' } } })}
//         {value}
//       </Typography>
//     </Grid>
//     <Grid item xs={12}>
//       <Divider sx={{ my: { xs: 0.5, sm: 1.5 } }} />
//     </Grid>
//   </>
// );
 
// const TicketDetailView = ({ ticket, onBackToList, onUpdateStatus }) => {
//   const [status, setStatus] = useState('');
 
//   useEffect(() => {
//     if (ticket) {
//       setStatus(ticket.status);
//     }
//   }, [ticket]);
 
//   if (!ticket) return <Typography sx={{ p: 2, textAlign: 'center' }}>No ticket selected or not found.</Typography>;
 
//   const handleStatusUpdateClick = () => {
//     onUpdateStatus(ticket.id, status);
//   };
 
//   return (
//     <Grid container spacing={3}>
//       <Grid item xs={12} md={4}>
//         <Paper elevation={2} sx={{ p: { xs: 2, sm: 3 } }}>
//           <Box sx={{ display: 'flex', alignItems: 'center', mb: { xs: 1, sm: 2 } }}>
//             <IconButton onClick={onBackToList} sx={{ mr: 1, p: { xs: 0.5, sm: 1 } }}><ArrowBackIcon sx={{ fontSize: { xs: '1.2rem', sm: '1.5rem' } }} /></IconButton>
//             <Typography variant="h6" fontWeight="bold" sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}>Ticket Details</Typography>
//           </Box>
//           <Box sx={{ bgcolor: '#e8f5e9', color: '#388e3c', p: { xs: 1, sm: 1.5 }, borderRadius: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', mb: { xs: 1.5, sm: 2 }, fontWeight: 'bold', fontSize: { xs: '0.875rem', sm: '1rem' } }}>
//             <CheckCircleIcon sx={{ mr: 1, fontSize: { xs: '1rem', sm: '1.25rem' } }} /> TICKET # {ticket.displayId}
//           </Box>
//           <Grid container alignItems="center" spacing={1}>
//             <DetailRow label="Subject" value={ticket.subject} />
//             <DetailRow label="Employee" value={ticket.employee} icon={<PersonIcon />} />
//             <DetailRow label="Priority" value={ticket.priority} />
//             <DetailRow label="Department" value={ticket.department} />
//             <DetailRow label="Assigned to" value={ticket.assignedTo} />
//             <DetailRow label="Created at" value={ticket.date} icon={<CalendarIcon />} />
//           </Grid>
//           <Box sx={{ mt: { xs: 1.5, sm: 2 } }}>
//             <Typography variant="subtitle2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', mb: 1, fontSize: { xs: '0.75rem', sm: '0.875rem' } }}><LeaderboardIcon sx={{ mr: 1, fontSize: { xs: '1rem', sm: '1.25rem' } }} /> Status *</Typography>
//             <FormControl fullWidth size="small">
//               <Select
//                 value={status}
//                 onChange={(e) => setStatus(e.target.value)}
//                 inputProps={{ 'aria-label': 'Select Ticket Status' }}
//               >
//                 <MenuItem value="Open">Open</MenuItem>
//                 <MenuItem value="Closed">Closed</MenuItem>
//               </Select>
//             </FormControl>
//           </Box>
//           <Button onClick={handleStatusUpdateClick} fullWidth variant="contained" sx={{ mt: { xs: 2, sm: 3 }, bgcolor: '#673ab7', '&:hover': { bgcolor: '#5e35b1' }, fontSize: { xs: '0.875rem', sm: '1rem' } }}>Update Status</Button>
//         </Paper>
//       </Grid>
//       <Grid item xs={12} md={8}>
//         <Paper elevation={2} sx={{ p: { xs: 2, sm: 3 }, height: '100%' }}>
//           <Typography variant="h6" fontWeight="bold" sx={{ mb: { xs: 1, sm: 2 }, fontSize: { xs: '1rem', sm: '1.25rem' } }}>
//             Description
//           </Typography>
//           <Typography variant="body1" sx={{ whiteSpace: 'pre-line', wordBreak: 'break-word', fontSize: { xs: '0.875rem', sm: '1rem' } }}>
//             {stripHtml(ticket.description)}
//           </Typography>
//         </Paper>
//       </Grid>
//     </Grid>
//   );
// };
 
 
// // ===================================================================================
// //  COMPONENT 3: MAIN HELPDESK SYSTEM (PARENT)
// // ===================================================================================
// const HelpdeskSystem = () => {
//   const [viewMode, setViewMode] = useState('list');
//   const [selectedTicketId, setSelectedTicketId] = useState(null);
//   const [tickets, setTickets] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
 
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [ticketToEdit, setTicketToEdit] = useState(null);
 
//   // INTEGRATION POINT 1: Fetching all tickets
//   const fetchTickets = useCallback(async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       // This GET request matches your API for fetching all tickets
//       const response = await axiosInstance.get('/admin_support_tickets/');
//       setTickets(Array.isArray(response.data) ? response.data.map(transformApiTicket) : []);
//     } catch (err) {
//       setError(err.message || 'Failed to fetch tickets.');
//       console.error("Fetch tickets error:", err);
//     } finally {
//       setLoading(false);
//     }
//   }, []);
 
//   useEffect(() => { fetchTickets(); }, [fetchTickets]);
 
//   const handleOpenEditModal = (ticketId) => {
//     const ticket = tickets.find(t => t.id === ticketId);
//     if (ticket) {
//       setTicketToEdit(ticket);
//       setIsEditModalOpen(true);
//     }
//   };
 
//   const handleCloseEditModal = () => {
//     setIsEditModalOpen(false);
//     setTicketToEdit(null);
//   };
 
//   // INTEGRATION POINT 2: Updating a ticket's status (used by the modal)
//   const handleUpdateTicket = async (ticketId, updateData) => {
//     const originalTickets = [...tickets];
 
//     const updatedTickets = tickets.map(ticket =>
//       ticket.id === ticketId ? { ...ticket, status: updateData.status } : ticket
//     );
//     setTickets(updatedTickets);
 
//     try {
//       // This PATCH request matches your API for updating a ticket
//       // The updateData is correctly formatted as { status: '...' }
//       await axiosInstance.patch(`/admin_support_tickets/${ticketId}/`, updateData);
//       // alert(`Ticket #${ticketId} status updated successfully.`); // Consider using Snackbar for less intrusive feedback
//       fetchTickets(); // Re-fetch to ensure data consistency
//     } catch (err) {
//       alert(`Failed to update ticket #${ticketId}. Please try again.`);
//       console.error("Update error:", err);
//       setTickets(originalTickets); // Revert on failure
//     }
//   };
 
//   // This function is also a valid way to update status (used by the detail view)
//   const handleUpdateTicketStatus = async (ticketId, newStatus) => {
//     const originalTickets = [...tickets];
//     const updatedTickets = tickets.map(ticket =>
//       ticket.id === ticketId ? { ...ticket, status: newStatus } : ticket
//     );
//     setTickets(updatedTickets);
 
//     try {
//       // This PATCH request also correctly updates the status
//       await axiosInstance.patch(`/admin_support_tickets/${ticketId}/`, { status: newStatus });
//       // alert(`Ticket #${ticketId} status updated to ${newStatus}.`); // Consider using Snackbar
//       fetchTickets(); // Re-fetch to ensure data consistency
//     } catch (err) {
//       alert(`Failed to update status for ticket #${ticketId}.`);
//       console.error("Status update error:", err);
//       setTickets(originalTickets); // Revert on failure
//     }
//   };
 
//   // INTEGRATION POINT 3: Deleting a ticket
//   const handleDeleteTicket = async (ticketId) => {
//     if (window.confirm('Are you sure you want to delete this ticket?')) {
//       try {
//         // This DELETE request matches your API for deleting a ticket
//         await axiosInstance.delete(`/admin_support_tickets/${ticketId}/`);
//         setTickets(prevTickets => prevTickets.filter(ticket => ticket.id !== ticketId));
//         // alert(`Ticket #${ticketId} has been deleted.`); // Consider using Snackbar
//       } catch (err) {
//         alert(`Failed to delete ticket #${ticketId}. Please try again.`);
//         console.error("Delete error:", err);
//       }
//     }
//   };
 
//   const handleViewTicket = (ticketId) => {
//     setSelectedTicketId(ticketId);
//     setViewMode('detail');
//   };
 
//   const handleBackToList = () => {
//     setViewMode('list');
//     setSelectedTicketId(null);
//   };
 
//   const selectedTicketData = tickets.find(t => t.id === selectedTicketId);
 
//   const renderContent = () => {
//     switch (viewMode) {
//       case 'detail':
//         return <TicketDetailView ticket={selectedTicketData} onBackToList={handleBackToList} onUpdateStatus={handleUpdateTicketStatus} />;
//       case 'list':
//       default:
//         return <TicketDashboard
//           tickets={tickets}
//           onViewTicket={handleViewTicket}
//           onDeleteTicket={handleDeleteTicket}
//           onEditTicket={handleOpenEditModal}
//           onRadioSelect={handleViewTicket}
//           selectedTicketId={selectedTicketId}
//           loading={loading}
//           error={error}
//         />;
//     }
//   };
 
//   return (
//     <Box sx={{ p: { xs: 2, sm: 3 }, bgcolor: '#f4f6f8', minHeight: '100vh' }}>
//       {renderContent()}
//       <EditTicketModal
//         open={isEditModalOpen}
//         onClose={handleCloseEditModal}
//         onUpdate={handleUpdateTicket}
//         ticket={ticketToEdit}
//       />
//     </Box>
//   );
// };
 
// export default HelpdeskSystem;

import React, { useState, useMemo, useEffect, useCallback } from 'react';

import {

  Box, Typography, Button, Paper, Card, CardContent, Grid,

  Divider, FormControl, Select, MenuItem, TextField, IconButton, Avatar, Radio,

  Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions,

  CircularProgress, Alert,

} from '@mui/material';

import {

  Add as AddIcon,

  AccessTime as AccessTimeIcon,

  LockOutlined as LockOutlinedIcon,

  Delete as DeleteIcon,

  CalendarTodayOutlined as CalendarIcon,

  PersonOutline as PersonIcon,

  CheckCircle as CheckCircleIcon,

  Leaderboard as LeaderboardIcon,

  ChatBubbleOutline as ReplyIcon,

  NoteAddOutlined as NoteIcon,

  AttachFileOutlined as AttachIcon,

  ArrowBack as ArrowBackIcon,

  Download as DownloadIcon,

  Edit as EditIcon,

  Visibility as VisibilityIcon,

  Close as CloseIcon,

} from '@mui/icons-material';

import axiosInstance from "../utils/axiosInstance";

// Chart.js imports

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

import { Pie, Doughnut } from 'react-chartjs-2';

import ChartDataLabels from 'chartjs-plugin-datalabels';

 

// Rich Text Editor imports

import ReactQuill from 'react-quill';

import 'react-quill/dist/quill.snow.css';

 

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

 

// --- HELPER FUNCTIONS ---

 

/**

 * Safely strips HTML tags from a string to return plain text.

 * This is used for displaying the description without HTML tags.

 * @param {string} html The HTML string to parse.

 * @returns {string} The plain text content.

 */

const stripHtml = (html) => {

  if (typeof window === 'undefined' || !html) return html || '';

  const doc = new DOMParser().parseFromString(html, 'text/html');

  return doc.body.textContent || "";

};

 

const transformApiTicket = (apiTicket) => {

  const formatDate = (dateString) => {

    if (!dateString) return 'N/A';

    const date = new Date(dateString);

    if (isNaN(date.getTime())) return 'N/A';

    const day = String(date.getDate()).padStart(2, '0');

    const month = String(date.getMonth() + 1).padStart(2, '0');

    const year = date.getFullYear();

    return `${day}-${month}-${year}`;

  };

 

  const generateDisplayId = (id) => {

    const letters = 'IJKLMONPQRSTUVWXYZ';

    const part1 = String(id).padStart(3, '0');

    const part2 = letters[id % letters.length] + letters[(id * 3) % letters.length];

    return `${part1}${part2}L`;

  };

 

  // This function correctly maps the API response fields to the names used in the frontend.

  return {

    id: apiTicket.id,

    displayId: generateDisplayId(apiTicket.id),

    subject: apiTicket.subject,

    employee: apiTicket.employee_name, // Maps employee_name

    assignedTo: 'Support Team',

    department: apiTicket.department_name, // Maps department_name

    date: formatDate(apiTicket.created_at),

    priority: apiTicket.priority,

    status: apiTicket.ticket_status, // Maps ticket_status to 'status' for frontend use

    description: apiTicket.description || '',

  };

};

 

// ===================================================================================

//  COMPONENT 0: EDIT TICKET MODAL

// ===================================================================================

const EditTicketModal = ({ open, onClose, onUpdate, ticket }) => {

  const [editedStatus, setEditedStatus] = useState('');

 

  useEffect(() => {

    if (ticket) {

      setEditedStatus(ticket.status);

    }

  }, [ticket]);

 

  const handleUpdateClick = () => {

    // onUpdate is called with the correct payload structure: { status: '...' }

    onUpdate(ticket.id, { status: editedStatus });

    onClose();

  };

 

  if (!ticket) return null;

 

  return (

    <Dialog open={open} onClose={onClose} PaperProps={{ sx: { borderRadius: 2, width: '100%', maxWidth: 450 } }}>

      <DialogTitle sx={{ fontWeight: 'bold', fontSize: { xs: '1rem', sm: '1.25rem' }, pt: 2.5, pb: 1 }}>

        Update Ticket Status

        <IconButton

          aria-label="close"

          onClick={onClose}

          sx={{ position: 'absolute', right: 8, top: 8, color: (theme) => theme.palette.grey[500] }}

        >

          <CloseIcon />

        </IconButton>

      </DialogTitle>

      <DialogContent>

        <DialogContentText sx={{ mb: 2, fontSize: { xs: '0.875rem', sm: '1rem' } }}>

          Select the new status for Ticket #{ticket.displayId}.

        </DialogContentText>

        <FormControl fullWidth size="small" sx={{ mt: 1 }}>

          <Select

            value={editedStatus}

            onChange={(e) => setEditedStatus(e.target.value)}

            inputProps={{ 'aria-label': 'Select Ticket Status' }}

          >

            <MenuItem value="Open">Open</MenuItem>

            <MenuItem value="Closed">Closed</MenuItem>

          </Select>

        </FormControl>

      </DialogContent>

      <DialogActions sx={{ p: '16px 24px' }}>

        <Button onClick={onClose} sx={{ color: 'text.secondary', textTransform: 'none' }}>Close</Button>

        <Button onClick={handleUpdateClick} variant="contained" sx={{ bgcolor: '#673ab7', '&:hover': { bgcolor: '#5e35b1' }, textTransform: 'none', px: 3 }}>Update</Button>

      </DialogActions>

    </Dialog>

  );

};

 

// ===================================================================================

//  COMPONENT 1: TICKET LIST & DASHBOARD VIEW

// ===================================================================================

const TicketDashboard = ({ tickets, onViewTicket, onDeleteTicket, onEditTicket, onRadioSelect, selectedTicketId, loading, error }) => {

  const { priorityData, statusData } = useMemo(() => {

    const counts = { High: 0, Low: 0, Medium: 0, Critical: 0, Open: 0, Closed: 0 };

    (tickets || []).forEach(ticket => {

      if (ticket.priority in counts) counts[ticket.priority]++;

      if (ticket.status in counts) counts[ticket.status]++;

    });

    return {

      priorityData: {

        labels: ['Low', 'High', 'Medium', 'Critical'],

        datasets: [{

          data: [counts.Low, counts.High, counts.Medium, counts.Critical],

          backgroundColor: ['#F9A825', '#F57F17', '#FDD835', '#FFF59D']

        }],

      },

      statusData: {

        labels: ['Open', 'Closed'],

        datasets: [{

          data: [counts.Open, counts.Closed],

          backgroundColor: ['#2196F3', '#4CAF50']

        }],

      }

    };

  }, [tickets]);

 

  const chartOptions = {

    responsive: true,

    maintainAspectRatio: false,

    plugins: {

      legend: {

        position: 'right',

        labels: {

          font: {

            size: 10, // Smaller font for legend on smaller screens

          },

        },

      },

      datalabels: { display: false }

    }

  };

  const doughnutOptions = { ...chartOptions, cutout: '70%' };

 

  const getPriorityColor = (p) => {

    const priorityLower = p?.toLowerCase();

    switch (priorityLower) {

      case 'critical': return 'error.dark';

      case 'high': return 'error.main';

      case 'medium': return 'warning.dark';

      case 'low': return 'warning.main';

      default: return 'text.secondary';

    }

  };

  const getStatusColor = (s) => s?.toLowerCase() === 'closed' ? 'success.main' : 'primary.main';

 

  const renderTicketList = () => {

    if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}><CircularProgress /></Box>;

    if (error) return <Alert severity="error" sx={{ m: 2 }}>{error}</Alert>;

    if (!tickets || tickets.length === 0) return <Typography sx={{ textAlign: 'center', p: 5, color: 'text.secondary' }}>No tickets found.</Typography>;

 

    return tickets.map((ticket) => (

      <Card key={ticket.id} elevation={1} sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: { xs: 'flex-start', sm: 'center' }, mb: 2, p: { xs: 1, sm: 2 } }}>

        <Box sx={{

          px: { xs: 1, sm: 2 },

          py: { xs: 1, sm: 0 },

          display: 'flex',

          alignItems: 'center',

          justifyContent: 'center',

          width: { xs: '100%', sm: 'auto' },

          mb: { xs: 1, sm: 0 }

        }}>

          <Avatar sx={{ bgcolor: 'primary.main', width: 48, height: 48, mr: { xs: 1, sm: 0 } }}>

            <AccessTimeIcon sx={{ fontSize: '1.8rem', color: 'white' }} />

          </Avatar>

          <Radio

            checked={selectedTicketId === ticket.id}

            onChange={() => onRadioSelect(ticket.id)}

            value={ticket.id}

            name="ticket-selection-radio"

            sx={{ display: { sm: 'none' } }} // Hide radio on larger screens, show on small

          />

        </Box>

        <CardContent sx={{ flexGrow: 1, p: { xs: '8px !important', sm: '12px !important' }, width: { xs: '100%', sm: 'auto' } }}>

          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>

            <LockOutlinedIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />

            <Typography variant="h6" component="div" fontWeight="500" sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}>{ticket.subject}</Typography>

          </Box>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: { xs: 1, sm: 2 }, color: 'text.secondary', fontSize: '0.875rem' }}>

            <Typography variant="body2" fontWeight="bold"># {ticket.displayId}</Typography>

            <Box sx={{ display: 'flex', alignItems: 'center' }}>

              <PersonIcon sx={{ fontSize: '1.1rem', mr: 0.5, color: 'primary.light' }} /> <Typography variant="body2">{ticket.employee}</Typography>

            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center' }}>

              <CalendarIcon sx={{ fontSize: '1rem', mr: 0.5 }} /> <Typography variant="body2">{ticket.date}</Typography>

            </Box>

            <Typography variant="body2" sx={{ color: getPriorityColor(ticket.priority), fontWeight: '500' }}>{ticket.priority}</Typography>

            <Typography variant="body2" sx={{ color: getStatusColor(ticket.status), fontWeight: '500' }}>{ticket.status}</Typography>

          </Box>

          <Box sx={{

            display: 'flex',

            flexWrap: 'wrap', // Allow buttons to wrap on small screens

            gap: { xs: 0.5, sm: 1.5 },

            mt: 1.5,

            borderTop: 1,

            borderColor: 'divider',

            pt: 1.5

          }}>

            <Button size="small" sx={{ textTransform: 'none', color: 'text.secondary', p: 0.5 }} startIcon={<EditIcon />} onClick={() => onEditTicket(ticket.id)}>

              Edit

            </Button>

            <Button size="small" sx={{ textTransform: 'none', color: 'text.secondary', p: 0.5 }} startIcon={<VisibilityIcon />} onClick={() => onViewTicket(ticket.id)}>

              View Ticket

            </Button>

            <Button size="small" sx={{ textTransform: 'none', color: 'error.main', p: 0.5 }} startIcon={<DeleteIcon />} onClick={() => onDeleteTicket(ticket.id)}>

              Delete

            </Button>

          </Box>

        </CardContent>

        <Box sx={{ px: 1, display: { xs: 'none', sm: 'block' } }}> {/* Hide radio on small screens, show on large */}

          <Radio checked={selectedTicketId === ticket.id} onChange={() => onRadioSelect(ticket.id)} value={ticket.id} name="ticket-selection-radio" />

        </Box>

      </Card>

    ));

  };

 

  return (

    <Grid container spacing={3}>

      <Grid item xs={12} lg={8}>

        <Paper elevation={0} sx={{ p: { xs: 1, sm: 2 }, display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>

          <Typography variant="h4" fontWeight="bold" color= '#8C257C' sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}>Tickets List</Typography>

        </Paper>

        {renderTicketList()}

      </Grid>

      <Grid item xs={12} lg={4}>

        <Paper elevation={0} sx={{ p: { xs: 1, sm: 2 }, mb: 3, height: { xs: '300px', sm: '350px' } }}>

          <Typography variant="h6" fontWeight="bold" color= '#8C257C' sx={{ mb: { xs: 1, sm: 2 }, fontSize: { xs: '1rem', sm: '1.25rem' } }}>Ticket Priority</Typography>

          <Box sx={{ height: 'calc(100% - 48px)' }}>

            <Pie data={priorityData} options={chartOptions} />

          </Box>

        </Paper>

        <Paper elevation={0} sx={{ p: { xs: 1, sm: 2 }, height: { xs: '300px', sm: '350px' } }}>

          <Typography variant="h6" fontWeight="bold" color= '#8C257C' sx={{ mb: { xs: 1, sm: 2 }, fontSize: { xs: '1rem', sm: '1.25rem' } }}>Ticket Status</Typography>

          <Box sx={{ height: 'calc(100% - 48px)' }}>

            <Doughnut data={statusData} options={doughnutOptions} />

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

    <Grid item xs={12} sm={5}>

      <Typography variant="subtitle2" color="text.secondary" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>{label}</Typography>

    </Grid>

    <Grid item xs={12} sm={7}>

      <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', fontWeight: 500, fontSize: { xs: '0.875rem', sm: '1rem' } }}>

        {icon && React.cloneElement(icon, { sx: { mr: 1, fontSize: { xs: '1rem', sm: '1.25rem' } } })}

        {value}

      </Typography>

    </Grid>

    <Grid item xs={12}>

      <Divider sx={{ my: { xs: 0.5, sm: 1.5 } }} />

    </Grid>

  </>

);

 

const TicketDetailView = ({ ticket, onBackToList, onUpdateStatus }) => {

  const [status, setStatus] = useState('');

 

  useEffect(() => {

    if (ticket) {

      setStatus(ticket.status);

    }

  }, [ticket]);

 

  if (!ticket) return <Typography sx={{ p: 2, textAlign: 'center' }}>No ticket selected or not found.</Typography>;

 

  const handleStatusUpdateClick = () => {

    onUpdateStatus(ticket.id, status);

  };

 

  return (

    <Grid container spacing={3}>

      <Grid item xs={12} md={4}>

        <Paper elevation={2} sx={{ p: { xs: 2, sm: 3 } }}>

          <Box sx={{ display: 'flex', alignItems: 'center', mb: { xs: 1, sm: 2 } }}>

            <IconButton onClick={onBackToList} sx={{ mr: 1, p: { xs: 0.5, sm: 1 } }}><ArrowBackIcon sx={{ fontSize: { xs: '1.2rem', sm: '1.5rem' } }} /></IconButton>

            <Typography variant="h6" fontWeight="bold" sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}>Ticket Details</Typography>

          </Box>

          <Box sx={{ bgcolor: '#e8f5e9', color: '#388e3c', p: { xs: 1, sm: 1.5 }, borderRadius: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', mb: { xs: 1.5, sm: 2 }, fontWeight: 'bold', fontSize: { xs: '0.875rem', sm: '1rem' } }}>

            <CheckCircleIcon sx={{ mr: 1, fontSize: { xs: '1rem', sm: '1.25rem' } }} /> TICKET # {ticket.displayId}

          </Box>

          <Grid container alignItems="center" spacing={1}>

            <DetailRow label="Subject" value={ticket.subject} />

            <DetailRow label="Employee" value={ticket.employee} icon={<PersonIcon />} />

            <DetailRow label="Priority" value={ticket.priority} />

            <DetailRow label="Department" value={ticket.department} />

            <DetailRow label="Assigned to" value={ticket.assignedTo} />

            <DetailRow label="Created at" value={ticket.date} icon={<CalendarIcon />} />

          </Grid>

          <Box sx={{ mt: { xs: 1.5, sm: 2 } }}>

            <Typography variant="subtitle2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', mb: 1, fontSize: { xs: '0.75rem', sm: '0.875rem' } }}><LeaderboardIcon sx={{ mr: 1, fontSize: { xs: '1rem', sm: '1.25rem' } }} /> Status *</Typography>

            <FormControl fullWidth size="small">

              <Select

                value={status}

                onChange={(e) => setStatus(e.target.value)}

                inputProps={{ 'aria-label': 'Select Ticket Status' }}

              >

                <MenuItem value="Open">Open</MenuItem>

                <MenuItem value="Closed">Closed</MenuItem>

              </Select>

            </FormControl>

          </Box>

          <Button onClick={handleStatusUpdateClick} fullWidth variant="contained" sx={{ mt: { xs: 2, sm: 3 }, bgcolor: '#673ab7', '&:hover': { bgcolor: '#5e35b1' }, fontSize: { xs: '0.875rem', sm: '1rem' } }}>Update Status</Button>

        </Paper>

      </Grid>

      <Grid item xs={12} md={8}>

        <Paper elevation={2} sx={{ p: { xs: 2, sm: 3 }, height: '100%' }}>

          <Typography variant="h6" fontWeight="bold" sx={{ mb: { xs: 1, sm: 2 }, fontSize: { xs: '1rem', sm: '1.25rem' } }}>

            Description

          </Typography>

          <Typography variant="body1" sx={{ whiteSpace: 'pre-line', wordBreak: 'break-word', fontSize: { xs: '0.875rem', sm: '1rem' } }}>

            {stripHtml(ticket.description)}

          </Typography>

        </Paper>

      </Grid>

    </Grid>

  );

};

 

 

// ===================================================================================

//  COMPONENT 3: MAIN HELPDESK SYSTEM (PARENT)

// ===================================================================================

const HelpdeskSystem = () => {

  const [viewMode, setViewMode] = useState('list');

  const [selectedTicketId, setSelectedTicketId] = useState(null);

  const [tickets, setTickets] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);

 

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [ticketToEdit, setTicketToEdit] = useState(null);

 

  // INTEGRATION POINT 1: Fetching all tickets

  const fetchTickets = useCallback(async () => {

    setLoading(true);

    setError(null);

    try {

      // This GET request matches your API for fetching all tickets

      const response = await axiosInstance.get('/admin_support_tickets/');

      setTickets(Array.isArray(response.data) ? response.data.map(transformApiTicket) : []);

    } catch (err) {

      setError(err.message || 'Failed to fetch tickets.');

      console.error("Fetch tickets error:", err);

    } finally {

      setLoading(false);

    }

  }, []);

 

  useEffect(() => { fetchTickets(); }, [fetchTickets]);

 

  const handleOpenEditModal = (ticketId) => {

    const ticket = tickets.find(t => t.id === ticketId);

    if (ticket) {

      setTicketToEdit(ticket);

      setIsEditModalOpen(true);

    }

  };

 

  const handleCloseEditModal = () => {

    setIsEditModalOpen(false);

    setTicketToEdit(null);

  };

 

  // INTEGRATION POINT 2: Updating a ticket's status (used by the modal)

  const handleUpdateTicket = async (ticketId, updateData) => {

    const originalTickets = [...tickets];

 

    const updatedTickets = tickets.map(ticket =>

      ticket.id === ticketId ? { ...ticket, status: updateData.status } : ticket

    );

    setTickets(updatedTickets);

 

    try {

      // This PATCH request matches your API for updating a ticket

      // The updateData is correctly formatted as { status: '...' }

      await axiosInstance.patch(`/admin_support_tickets/${ticketId}/`, updateData);

      // alert(`Ticket #${ticketId} status updated successfully.`); // Consider using Snackbar for less intrusive feedback

      fetchTickets(); // Re-fetch to ensure data consistency

    } catch (err) {

      alert(`Failed to update ticket #${ticketId}. Please try again.`);

      console.error("Update error:", err);

      setTickets(originalTickets); // Revert on failure

    }

  };

 

  // This function is also a valid way to update status (used by the detail view)

  const handleUpdateTicketStatus = async (ticketId, newStatus) => {

    const originalTickets = [...tickets];

    const updatedTickets = tickets.map(ticket =>

      ticket.id === ticketId ? { ...ticket, status: newStatus } : ticket

    );

    setTickets(updatedTickets);

 

    try {

      // This PATCH request also correctly updates the status

      await axiosInstance.patch(`/admin_support_tickets/${ticketId}/`, { status: newStatus });

      // alert(`Ticket #${ticketId} status updated to ${newStatus}.`); // Consider using Snackbar

      fetchTickets(); // Re-fetch to ensure data consistency

    } catch (err) {

      alert(`Failed to update status for ticket #${ticketId}.`);

      console.error("Status update error:", err);

      setTickets(originalTickets); // Revert on failure

    }

  };

 

  // INTEGRATION POINT 3: Deleting a ticket

  const handleDeleteTicket = async (ticketId) => {

    if (window.confirm('Are you sure you want to delete this ticket?')) {

      try {

        // This DELETE request matches your API for deleting a ticket

        await axiosInstance.delete(`/admin_support_tickets/${ticketId}/`);

        setTickets(prevTickets => prevTickets.filter(ticket => ticket.id !== ticketId));

        // alert(`Ticket #${ticketId} has been deleted.`); // Consider using Snackbar

      } catch (err) {

        alert(`Failed to delete ticket #${ticketId}. Please try again.`);

        console.error("Delete error:", err);

      }

    }

  };

 

  const handleViewTicket = (ticketId) => {

    setSelectedTicketId(ticketId);

    setViewMode('detail');

  };

 

  const handleBackToList = () => {

    setViewMode('list');

    setSelectedTicketId(null);

  };

 

  const selectedTicketData = tickets.find(t => t.id === selectedTicketId);

 

  const renderContent = () => {

    switch (viewMode) {

      case 'detail':

        return <TicketDetailView ticket={selectedTicketData} onBackToList={handleBackToList} onUpdateStatus={handleUpdateTicketStatus} />;

      case 'list':

      default:

        return <TicketDashboard

          tickets={tickets}

          onViewTicket={handleViewTicket}

          onDeleteTicket={handleDeleteTicket}

          onEditTicket={handleOpenEditModal}

          onRadioSelect={handleViewTicket}

          selectedTicketId={selectedTicketId}

          loading={loading}

          error={error}

        />;

    }

  };

 

  return (

    <Box sx={{ p: { xs: 2, sm: 3 }, bgcolor: '#f4f6f8', minHeight: '100vh' }}>

      {renderContent()}

      <EditTicketModal

        open={isEditModalOpen}

        onClose={handleCloseEditModal}

        onUpdate={handleUpdateTicket}

        ticket={ticketToEdit}

      />

    </Box>

  );

};

 

export default HelpdeskSystem;