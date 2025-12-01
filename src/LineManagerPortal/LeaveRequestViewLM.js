// // // // // // // import React, { useState } from 'react';
// // // // // // // import {
// // // // // // //   Box,
// // // // // // //   Typography,
// // // // // // //   Button,
// // // // // // //   Paper,
// // // // // // //   Table,
// // // // // // //   TableBody,
// // // // // // //   TableCell,
// // // // // // //   TableContainer,
// // // // // // //   TableHead,
// // // // // // //   TableRow,
// // // // // // //   TextField,
// // // // // // //   FormControl,
// // // // // // //   InputLabel,
// // // // // // //   Select,
// // // // // // //   MenuItem,
// // // // // // //   Grid,
// // // // // // //   Dialog,
// // // // // // //   DialogTitle,
// // // // // // //   DialogContent,
// // // // // // //   DialogActions,
// // // // // // //   Switch,
// // // // // // //   FormControlLabel,
// // // // // // //   IconButton,
// // // // // // // } from '@mui/material';
// // // // // // // import {
// // // // // // //   QuestionAnswer as QuestionAnswerIcon,
// // // // // // //   Add as AddIcon,
// // // // // // //   Close as CloseIcon,
// // // // // // //   Upload as UploadIcon,
// // // // // // // } from '@mui/icons-material';
// // // // // // // import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// // // // // // // import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// // // // // // // import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

// // // // // // // export default function LeaveManagement() {
// // // // // // //   const [entries, setEntries] = useState('10');
// // // // // // //   const [searchTerm, setSearchTerm] = useState('');
// // // // // // //   const [selectedYear, setSelectedYear] = useState('2024');
// // // // // // //   const [isAddLeaveOpen, setIsAddLeaveOpen] = useState(false);
// // // // // // //   const [isAddCompOffOpen, setIsAddCompOffOpen] = useState(false);
// // // // // // //   const [leaveData, setLeaveData] = useState([
// // // // // // //     { id: 1, employee: "Prasad Shinde", email: "prasad.shinde@tdt.world", leaveType: "Casual Leave (CL)", leaveDuration: "30/07/2024 To 30/07/2024", days: "1 Days", appliedOn: "30/07/2024", status: "Approved" },
// // // // // // //     { id: 2, employee: "Prasad Shinde", email: "prasad.shinde@tdt.world", leaveType: "Casual Leave (CL)", leaveDuration: "09/09/2024 To 09/09/2024", days: "1 Days", appliedOn: "07/09/2024", status: "Pending" },
// // // // // // //   ]);
// // // // // // //   const [compOffData, setCompOffData] = useState([]);
// // // // // // //   const [showAllLeaves, setShowAllLeaves] = useState(true);
// // // // // // //   const [formData, setFormData] = useState({
// // // // // // //     leaveType: '',
// // // // // // //     startDate: null,
// // // // // // //     endDate: null,
// // // // // // //     isHalfDay: false,
// // // // // // //     remarks: '',
// // // // // // //     leaveReason: '',
// // // // // // //     attachment: null
// // // // // // //   });

// // // // // // //   const leaveStats = [
// // // // // // //     { title: "LEAVE TAKEN | PENDING", count: `${leaveData.filter(leave => leave.status === 'Approved').length} | ${leaveData.filter(leave => leave.status === 'Pending').length}`, color: "primary.main" },
// // // // // // //     { title: "APPROVED", count: leaveData.filter(leave => leave.status === 'Approved').length, color: "success.main" },
// // // // // // //     { title: "REJECTED", count: leaveData.filter(leave => leave.status === 'Rejected').length, color: "error.main" },
// // // // // // //   ];

// // // // // // //   const handleAddLeaveOpen = () => setIsAddLeaveOpen(true);
// // // // // // //   const handleAddLeaveClose = () => setIsAddLeaveOpen(false);

// // // // // // //   const handleInputChange = (field) => (event) => {
// // // // // // //     setFormData({
// // // // // // //       ...formData,
// // // // // // //       [field]: event.target.value
// // // // // // //     });
// // // // // // //   };

// // // // // // //   const handleDateChange = (field) => (date) => {
// // // // // // //     setFormData({
// // // // // // //       ...formData,
// // // // // // //       [field]: date
// // // // // // //     });
// // // // // // //   };

// // // // // // //   const handleFileChange = (event) => {
// // // // // // //     if (event.target.files && event.target.files[0]) {
// // // // // // //       setFormData({
// // // // // // //         ...formData,
// // // // // // //         attachment: event.target.files[0]
// // // // // // //       });
// // // // // // //     }
// // // // // // //   };

// // // // // // //   const handleAddLeaveSubmit = () => {
// // // // // // //     const newLeave = {
// // // // // // //       id: leaveData.length + 1,
// // // // // // //       employee: "Prasad Shinde",
// // // // // // //       email: "prasad.shinde@tdtl.world",
// // // // // // //       leaveType: formData.leaveType,
// // // // // // //       leaveDuration: `${formData.startDate.toLocaleDateString()} To ${formData.endDate.toLocaleDateString()}`,
// // // // // // //       days: `${Math.ceil((formData.endDate - formData.startDate) / (1000 * 60 * 60 * 24))} Days`,
// // // // // // //       appliedOn: new Date().toLocaleDateString(),
// // // // // // //       status: "Pending"
// // // // // // //     };
// // // // // // //     setLeaveData([...leaveData, newLeave]);
// // // // // // //     handleAddLeaveClose();
// // // // // // //   };

// // // // // // //   const handleAddCompOffOpen = () => setIsAddCompOffOpen(true);
// // // // // // //   const handleAddCompOffClose = () => setIsAddCompOffOpen(false);
// // // // // // //   const handleAddCompOffSubmit = () => {
// // // // // // //     const newCompOff = {
// // // // // // //       id: compOffData.length + 1,
// // // // // // //       employee: "Prasad Shinde",
// // // // // // //       email: "prasad.shinde@tdtl.world",
// // // // // // //       leaveDuration: `${formData.startDate.toLocaleDateString()} To ${formData.endDate.toLocaleDateString()}`,
// // // // // // //       days: `${Math.ceil((formData.endDate - formData.startDate) / (1000 * 60 * 60 * 24))} Days`,
// // // // // // //       appliedOn: new Date().toLocaleDateString(),
// // // // // // //       reason: formData.leaveReason,
// // // // // // //       status: "Pending"
// // // // // // //     };
// // // // // // //     setCompOffData([...compOffData, newCompOff]);
// // // // // // //     handleAddCompOffClose();
// // // // // // //   };

// // // // // // //   const handleShowAllLeaves = () => setShowAllLeaves(true);
// // // // // // //   const handleShowCompOffLeaves = () => setShowAllLeaves(false);

// // // // // // //   return (
// // // // // // //     <LocalizationProvider dateAdapter={AdapterDateFns}>
// // // // // // //       <Box sx={{ mt: 2 }}>
// // // // // // //         <Typography variant="h4" sx={{ mb: 2 }}>Leave Request</Typography>
// // // // // // //         <Grid container spacing={2}>
// // // // // // //           {leaveStats.map((stat, index) => (
// // // // // // //             <Grid item xs={12} sm={4} key={index}>
// // // // // // //               <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
// // // // // // //                 <Typography variant="subtitle2" color="text.secondary">{stat.title}</Typography>
// // // // // // //                 <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
// // // // // // //                   <Typography variant="h4" color={stat.color}>{stat.count}</Typography>
// // // // // // //                   <Box sx={{ ml: 1, color: 'text.secondary' }}>
// // // // // // //                     <QuestionAnswerIcon />
// // // // // // //                   </Box>
// // // // // // //                 </Box>
// // // // // // //               </Paper>
// // // // // // //             </Grid>
// // // // // // //           ))}
// // // // // // //         </Grid>
// // // // // // //         <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
// // // // // // //           <FormControl sx={{ minWidth: 120 }}>
// // // // // // //             <InputLabel id="year-select-label">Year</InputLabel>
// // // // // // //             <Select
// // // // // // //               labelId="year-select-label"
// // // // // // //               id="year-select"
// // // // // // //               value={selectedYear}
// // // // // // //               label="Year"
// // // // // // //               onChange={(e) => setSelectedYear(e.target.value)}
// // // // // // //             >
// // // // // // //               <MenuItem value="2024">2024</MenuItem>
// // // // // // //               <MenuItem value="2023">2023</MenuItem>
// // // // // // //             </Select>
// // // // // // //           </FormControl>
// // // // // // //           <Box>
// // // // // // //             <Button variant="contained" startIcon={<AddIcon />} sx={{ mr: 1 }} onClick={handleAddLeaveOpen}>
// // // // // // //               Add New Leave
// // // // // // //             </Button>
// // // // // // //             <Button variant="contained" startIcon={<AddIcon />} onClick={handleAddCompOffOpen}>
// // // // // // //               Add Comp off
// // // // // // //             </Button>
// // // // // // //           </Box>
// // // // // // //         </Box>
// // // // // // //         <Paper sx={{ mt: 2, p: 2 }}>
// // // // // // //           <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
// // // // // // //             <FormControl sx={{ minWidth: 120 }}>
// // // // // // //               <InputLabel id="entries-select-label">Show entries</InputLabel>
// // // // // // //               <Select
// // // // // // //                 labelId="entries-select-label"
// // // // // // //                 id="entries-select"
// // // // // // //                 value={entries}
// // // // // // //                 label="Show entries"
// // // // // // //                 onChange={(e) => setEntries(e.target.value)}
// // // // // // //               >
// // // // // // //                 <MenuItem value={10}>10</MenuItem>
// // // // // // //                 <MenuItem value={25}>25</MenuItem>
// // // // // // //                 <MenuItem value={50}>50</MenuItem>
// // // // // // //               </Select>
// // // // // // //             </FormControl>
// // // // // // //             <Box>
// // // // // // //               <Button variant="outlined" sx={{ mr: 1 }} onClick={handleShowAllLeaves}>List of all Leave</Button>
// // // // // // //               <Button variant="outlined" onClick={handleShowCompOffLeaves}>List of Compoff Leave</Button>
// // // // // // //             </Box>
// // // // // // //             <TextField
// // // // // // //               label="Search"
// // // // // // //               variant="outlined"
// // // // // // //               size="small"
// // // // // // //               value={searchTerm}
// // // // // // //               onChange={(e) => setSearchTerm(e.target.value)}
// // // // // // //             />
// // // // // // //           </Box>
// // // // // // //           <TableContainer>
// // // // // // //             <Table>
// // // // // // //               <TableHead>
// // // // // // //                 <TableRow>
// // // // // // //                   <TableCell>EMPLOYEE</TableCell>
// // // // // // //                   <TableCell>LEAVE TYPE</TableCell>
// // // // // // //                   <TableCell>LEAVE DURATION</TableCell>
// // // // // // //                   <TableCell>DAYS</TableCell>
// // // // // // //                   <TableCell>APPLIED ON</TableCell>
// // // // // // //                   <TableCell>STATUS</TableCell>
// // // // // // //                 </TableRow>
// // // // // // //               </TableHead>
// // // // // // //               <TableBody>
// // // // // // //                 {(showAllLeaves ? leaveData : compOffData).map((leave) => (
// // // // // // //                   <TableRow key={leave.id}>
// // // // // // //                     <TableCell>
// // // // // // //                       <Typography variant="body1">{leave.employee}</Typography>
// // // // // // //                       <Typography variant="body2" color="text.secondary">{leave.email}</Typography>
// // // // // // //                     </TableCell>
// // // // // // //                     <TableCell>{leave.leaveType || 'Comp Off'}</TableCell>
// // // // // // //                     <TableCell>{leave.leaveDuration}</TableCell>
// // // // // // //                     <TableCell>{leave.days}</TableCell>
// // // // // // //                     <TableCell>{leave.appliedOn}</TableCell>
// // // // // // //                     <TableCell>
// // // // // // //                       <Box sx={{
// // // // // // //                         px: 1,
// // // // // // //                         py: 0.5,
// // // // // // //                         borderRadius: '16px',
// // // // // // //                         display: 'inline-block',
// // // // // // //                         bgcolor: leave.status === 'Approved' ? 'success.main' :
// // // // // // //                                  leave.status === 'Pending' ? 'warning.main' : 'error.main',
// // // // // // //                         color: 'white',
// // // // // // //                       }}>
// // // // // // //                         {leave.status}
// // // // // // //                       </Box>
// // // // // // //                     </TableCell>
// // // // // // //                   </TableRow>
// // // // // // //                 ))}
// // // // // // //               </TableBody>
// // // // // // //             </Table>
// // // // // // //           </TableContainer>
// // // // // // //           <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
// // // // // // //             <Typography variant="body2">Showing 1 to {(showAllLeaves ? leaveData : compOffData).length} of {(showAllLeaves ? leaveData : compOffData).length} entries</Typography>
// // // // // // //             <Box>
// // // // // // //               <Button variant="outlined" sx={{ mr: 1 }}>Previous</Button>
// // // // // // //               <Button variant="contained" sx={{ mr: 1 }}>1</Button>
// // // // // // //               <Button variant="outlined">Next</Button>
// // // // // // //             </Box>
// // // // // // //           </Box>
// // // // // // //         </Paper>

// // // // // // //         {/* Add Leave Dialog */}
// // // // // // //         <Dialog
// // // // // // //           open={isAddLeaveOpen}
// // // // // // //           onClose={handleAddLeaveClose}
// // // // // // //           maxWidth="md"
// // // // // // //           fullWidth
// // // // // // //           PaperProps={{
// // // // // // //             sx: {
// // // // // // //               bgcolor: 'background.paper',
// // // // // // //               backgroundImage: 'none'
// // // // // // //             }
// // // // // // //           }}
// // // // // // //         >
// // // // // // //           <DialogTitle sx={{
// // // // // // //             display: 'flex',
// // // // // // //             justifyContent: 'space-between',
// // // // // // //             alignItems: 'center',
// // // // // // //             bgcolor: 'background.paper',
// // // // // // //             borderBottom: '1px solid',
// // // // // // //             borderColor: 'divider'
// // // // // // //           }}>
// // // // // // //             <Typography variant="h6">Leave Management</Typography>
// // // // // // //             <IconButton onClick={handleAddLeaveClose} size="small">
// // // // // // //               <CloseIcon />
// // // // // // //             </IconButton>
// // // // // // //           </DialogTitle>

// // // // // // //           <DialogContent sx={{ mt: 2 }}>
// // // // // // //             <Grid container spacing={3}>
// // // // // // //               <Grid item xs={12} md={8}>
// // // // // // //                 <FormControl fullWidth required>
// // // // // // //                   <InputLabel>Leave Type</InputLabel>
// // // // // // //                   <Select
// // // // // // //                     value={formData.leaveType}
// // // // // // //                     onChange={handleInputChange('leaveType')}
// // // // // // //                     label="Leave Type"
// // // // // // //                   >
// // // // // // //                     <MenuItem value="CL">Casual Leave (CL)</MenuItem>
// // // // // // //                     <MenuItem value="SL">Sick Leave (SL)</MenuItem>
// // // // // // //                     <MenuItem value="PL">Privileged Leave (PL)</MenuItem>
// // // // // // //                   </Select>
// // // // // // //                 </FormControl>

// // // // // // //                 <Grid container spacing={2} sx={{ mt: 1 }}>
// // // // // // //                   <Grid item xs={12} md={6}>
// // // // // // //                     <DatePicker
// // // // // // //                       label="Start Date"
// // // // // // //                       value={formData.startDate}
// // // // // // //                       onChange={handleDateChange('startDate')}
// // // // // // //                       renderInput={(params) => <TextField {...params} fullWidth required />}
// // // // // // //                     />
// // // // // // //                   </Grid>
// // // // // // //                   <Grid item xs={12} md={6}>
// // // // // // //                     <DatePicker
// // // // // // //                       label="End Date"
// // // // // // //                       value={formData.endDate}
// // // // // // //                       onChange={handleDateChange('endDate')}
// // // // // // //                       renderInput={(params) => <TextField {...params} fullWidth required />}
// // // // // // //                     />
// // // // // // //                   </Grid>
// // // // // // //                 </Grid>

// // // // // // //                 <FormControlLabel
// // // // // // //                   control={
// // // // // // //                     <Switch
// // // // // // //                       checked={formData.isHalfDay}
// // // // // // //                       onChange={(e) => setFormData({ ...formData, isHalfDay: e.target.checked })}
// // // // // // //                     />
// // // // // // //                   }
// // // // // // //                   label="Half Day"
// // // // // // //                   sx={{ mt: 2 }}
// // // // // // //                 />

// // // // // // //                 <TextField
// // // // // // //                   fullWidth
// // // // // // //                   label="Remarks"
// // // // // // //                   multiline
// // // // // // //                   rows={4}
// // // // // // //                   value={formData.remarks}
// // // // // // //                   onChange={handleInputChange('remarks')}
// // // // // // //                   sx={{ mt: 2 }}
// // // // // // //                 />

// // // // // // //                 <TextField
// // // // // // //                   fullWidth
// // // // // // //                   label="Leave Reason"
// // // // // // //                   required
// // // // // // //                   multiline
// // // // // // //                   rows={4}
// // // // // // //                   value={formData.leaveReason}
// // // // // // //                   onChange={handleInputChange('leaveReason')}
// // // // // // //                   sx={{ mt: 2 }}
// // // // // // //                 />
// // // // // // //               </Grid>

// // // // // // //               <Grid item xs={12} md={4}>
// // // // // // //                 <Box sx={{
// // // // // // //                   p: 2,
// // // // // // //                   border: '1px solid',
// // // // // // //                   borderColor: 'divider',
// // // // // // //                   borderRadius: 1
// // // // // // //                 }}>
// // // // // // //                   <Typography variant="subtitle2" gutterBottom>
// // // // // // //                     Leave Attachment
// // // // // // //                   </Typography>
// // // // // // //                   <input
// // // // // // //                     accept="image/*,.pdf"
// // // // // // //                     style={{ display: 'none' }}
// // // // // // //                     id="leave-attachment"
// // // // // // //                     type="file"
// // // // // // //                     onChange={handleFileChange}
// // // // // // //                   />
// // // // // // //                   <label htmlFor="leave-attachment">
// // // // // // //                     <Button
// // // // // // //                       variant="outlined"
// // // // // // //                       component="span"
// // // // // // //                       startIcon={<UploadIcon />}
// // // // // // //                       fullWidth
// // // // // // //                     >
// // // // // // //                       Choose File
// // // // // // //                     </Button>
// // // // // // //                   </label>
// // // // // // //                   {formData.attachment && (
// // // // // // //                     <Typography variant="caption" display="block" sx={{ mt: 1 }}>
// // // // // // //                       Selected: {formData.attachment.name}
// // // // // // //                     </Typography>
// // // // // // //                   )}
// // // // // // //                   <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
// // // // // // //                     Upload files only: pdf,gif,png,jpg,jpeg
// // // // // // //                   </Typography>
// // // // // // //                 </Box>
// // // // // // //               </Grid>
// // // // // // //             </Grid>
// // // // // // //           </DialogContent>

// // // // // // //           <DialogActions sx={{
// // // // // // //             p: 2,
// // // // // // //             borderTop: '1px solid',
// // // // // // //             borderColor: 'divider'
// // // // // // //           }}>
// // // // // // //             <Button onClick={handleAddLeaveClose} variant="outlined">
// // // // // // //               Reset
// // // // // // //             </Button>
// // // // // // //             <Button onClick={handleAddLeaveSubmit} variant="contained" color="primary">
// // // // // // //               Save
// // // // // // //             </Button>
// // // // // // //           </DialogActions>
// // // // // // //         </Dialog>

// // // // // // //         {/* Add Comp off Dialog */}
// // // // // // //         <Dialog
// // // // // // //           open={isAddCompOffOpen}
// // // // // // //           onClose={handleAddCompOffClose}
// // // // // // //           maxWidth="md"
// // // // // // //           fullWidth
// // // // // // //           PaperProps={{
// // // // // // //             sx: {
// // // // // // //               bgcolor: 'background.paper',
// // // // // // //               backgroundImage: 'none'
// // // // // // //             }
// // // // // // //           }}
// // // // // // //         >
// // // // // // //           <DialogTitle sx={{
// // // // // // //             display: 'flex',
// // // // // // //             justifyContent: 'space-between',
// // // // // // //             alignItems: 'center',
// // // // // // //             bgcolor: 'background.paper',
// // // // // // //             borderBottom: '1px solid',
// // // // // // //             borderColor: 'divider'
// // // // // // //           }}>
// // // // // // //             <Typography variant="h6">Add Comp off</Typography>
// // // // // // //             <IconButton onClick={handleAddCompOffClose} size="small">
// // // // // // //               <CloseIcon />
// // // // // // //             </IconButton>
// // // // // // //           </DialogTitle>

// // // // // // //           <DialogContent sx={{ mt: 2 }}>
// // // // // // //             <Grid container spacing={3}>
// // // // // // //               <Grid item xs={12}>
// // // // // // //                 <Grid container spacing={2}>
// // // // // // //                   <Grid item xs={12} md={6}>
// // // // // // //                     <DatePicker
// // // // // // //                       label="Start Date"
// // // // // // //                       value={formData.startDate}
// // // // // // //                       onChange={handleDateChange('startDate')}
// // // // // // //                       renderInput={(params) => <TextField {...params} fullWidth required />}
// // // // // // //                     />
// // // // // // //                   </Grid>
// // // // // // //                   <Grid item xs={12} md={6}>
// // // // // // //                     <DatePicker
// // // // // // //                       label="End Date"
// // // // // // //                       value={formData.endDate}
// // // // // // //                       onChange={handleDateChange('endDate')}
// // // // // // //                       renderInput={(params) => <TextField {...params} fullWidth required />}
// // // // // // //                     />
// // // // // // //                   </Grid>
// // // // // // //                 </Grid>

// // // // // // //                 <TextField
// // // // // // //                   fullWidth
// // // // // // //                   label="Comp off Reason"
// // // // // // //                   required
// // // // // // //                   multiline
// // // // // // //                   rows={4}
// // // // // // //                   value={formData.leaveReason}
// // // // // // //                   onChange={handleInputChange('leaveReason')}
// // // // // // //                   sx={{ mt: 2 }}
// // // // // // //                 />
// // // // // // //               </Grid>
// // // // // // //             </Grid>
// // // // // // //           </DialogContent>

// // // // // // //           <DialogActions sx={{
// // // // // // //             p: 2,
// // // // // // //             borderTop: '1px solid',
// // // // // // //             borderColor: 'divider'
// // // // // // //           }}>
// // // // // // //             <Button onClick={handleAddCompOffClose} variant="outlined">
// // // // // // //               Reset
// // // // // // //             </Button>
// // // // // // //             <Button onClick={handleAddCompOffSubmit} variant="contained" color="primary">
// // // // // // //               Save
// // // // // // //             </Button>
// // // // // // //           </DialogActions>
// // // // // // //         </Dialog>
// // // // // // //       </Box>
// // // // // // //     </LocalizationProvider>
// // // // // // //   );
// // // // // // // }

// // // // // // import React, { useState } from 'react';
// // // // // // import {
// // // // // //   Box,
// // // // // //   Typography,
// // // // // //   Button,
// // // // // //   Paper,
// // // // // //   Table,
// // // // // //   TableBody,
// // // // // //   TableCell,
// // // // // //   TableContainer,
// // // // // //   TableHead,
// // // // // //   TableRow,
// // // // // //   TextField,
// // // // // //   FormControl,
// // // // // //   InputLabel,
// // // // // //   Select,
// // // // // //   MenuItem,
// // // // // //   Grid,
// // // // // //   Switch,
// // // // // //   FormControlLabel,
// // // // // // } from '@mui/material';
// // // // // // import {
// // // // // //   QuestionAnswer as QuestionAnswerIcon,
// // // // // //   Add as AddIcon,
// // // // // // } from '@mui/icons-material';
// // // // // // // Import DatePicker and other necessary date-related components
// // // // // // import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// // // // // // import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// // // // // // import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// // // // // // import { Remove as RemoveIcon } from '@mui/icons-material';

// // // // // // // ===================================================================================
// // // // // // //  COMPONENT 1: ADD LEAVE VIEW (The UI from your image)
// // // // // // // ===================================================================================

// // // // // // // Helper component for consistent form labels
// // // // // // const FormLabel = ({ children, required = false }) => (
// // // // // //   <Typography
// // // // // //     component="label"
// // // // // //     sx={{
// // // // // //       display: 'block',
// // // // // //       fontWeight: '500',
// // // // // //       mb: 1,
// // // // // //       fontSize: '0.875rem'
// // // // // //     }}
// // // // // //   >
// // // // // //     {children} {required && <span style={{ color: '#f44336' }}>*</span>}
// // // // // //   </Typography>
// // // // // // );

// // // // // // const AddLeaveView = ({ onSave, onHide }) => {
// // // // // //   const [leaveType, setLeaveType] = useState('');
// // // // // //   const [startDate, setStartDate] = useState(null);
// // // // // //   const [endDate, setEndDate] = useState(null);
// // // // // //   const [isHalfDay, setIsHalfDay] = useState(false);
// // // // // //   const [remarks, setRemarks] = useState('');
// // // // // //   const [leaveReason, setLeaveReason] = useState('');
// // // // // //   const [selectedFile, setSelectedFile] = useState(null);

// // // // // //   const handleFileChange = (event) => {
// // // // // //     if (event.target.files && event.target.files.length > 0) {
// // // // // //       setSelectedFile(event.target.files[0]);
// // // // // //     }
// // // // // //   };

// // // // // //   const handleReset = () => {
// // // // // //     setLeaveType('');
// // // // // //     setStartDate(null);
// // // // // //     setEndDate(null);
// // // // // //     setIsHalfDay(false);
// // // // // //     setRemarks('');
// // // // // //     setLeaveReason('');
// // // // // //     setSelectedFile(null);
// // // // // //   };

// // // // // //   const handleSave = () => {
// // // // // //     const newLeaveData = {
// // // // // //       leaveType,
// // // // // //       startDate,
// // // // // //       endDate,
// // // // // //       isHalfDay,
// // // // // //       remarks,
// // // // // //       leaveReason,
// // // // // //       attachment: selectedFile,
// // // // // //     };
// // // // // //     onSave(newLeaveData);
// // // // // //   }

// // // // // //   return (
// // // // // //     <Grid container spacing={3}>
// // // // // //       {/* Left Panel: Add Leave Form */}
// // // // // //       <Grid item xs={12} lg={8}>
// // // // // //         <Paper sx={{ p: 3, borderRadius: '8px' }} elevation={1}>
// // // // // //           <Box
// // // // // //             sx={{
// // // // // //               display: 'flex',
// // // // // //               justifyContent: 'space-between',
// // // // // //               alignItems: 'center',
// // // // // //               mb: 4,
// // // // // //             }}
// // // // // //           >
// // // // // //             <Typography variant="h6" fontWeight="600">
// // // // // //               Add Leave
// // // // // //             </Typography>
// // // // // //             <Button
// // // // // //               variant="contained"
// // // // // //               startIcon={<RemoveIcon />}
// // // // // //               onClick={onHide}
// // // // // //               sx={{ textTransform: 'none' }}
// // // // // //             >
// // // // // //               Hide
// // // // // //             </Button>
// // // // // //           </Box>

// // // // // //           <Grid container spacing={3}>
// // // // // //             <Grid item xs={12}>
// // // // // //               <FormLabel required>Leave Type</FormLabel>
// // // // // //               <FormControl fullWidth>
// // // // // //                 <Select
// // // // // //                   displayEmpty
// // // // // //                   value={leaveType}
// // // // // //                   onChange={(e) => setLeaveType(e.target.value)}
// // // // // //                   renderValue={(selected) => {
// // // // // //                     if (!selected) {
// // // // // //                       return <Typography sx={{ color: 'text.secondary' }}>Leave Type</Typography>
// // // // // //                     }
// // // // // //                     return selected;
// // // // // //                   }}
// // // // // //                 >
// // // // // //                   <MenuItem disabled value=""><em>Leave Type</em></MenuItem>
// // // // // //                   <MenuItem value="Casual Leave (CL)">Casual Leave (CL)</MenuItem>
// // // // // //                   <MenuItem value="Sick Leave (SL)">Sick Leave (SL)</MenuItem>
// // // // // //                   <MenuItem value="Privileged Leave (PL)">Privileged Leave (PL)</MenuItem>
// // // // // //                 </Select>
// // // // // //               </FormControl>
// // // // // //             </Grid>

// // // // // //             <Grid item xs={12} sm={6}>
// // // // // //               <FormLabel required>Start Date</FormLabel>
// // // // // //               <DatePicker
// // // // // //                 value={startDate}
// // // // // //                 onChange={(newValue) => setStartDate(newValue)}
// // // // // //                 renderInput={(params) => <TextField {...params} fullWidth placeholder="Start Date" />}
// // // // // //               />
// // // // // //             </Grid>

// // // // // //             <Grid item xs={12} sm={6}>
// // // // // //               <FormLabel required>End Date</FormLabel>
// // // // // //               <DatePicker
// // // // // //                 value={endDate}
// // // // // //                 onChange={(newValue) => setEndDate(newValue)}
// // // // // //                 renderInput={(params) => <TextField {...params} fullWidth placeholder="End Date" />}
// // // // // //               />
// // // // // //             </Grid>

// // // // // //             <Grid item xs={12}>
// // // // // //               <FormControlLabel
// // // // // //                 control={<Switch checked={isHalfDay} onChange={(e) => setIsHalfDay(e.target.checked)} />}
// // // // // //                 label="Half Day"
// // // // // //               />
// // // // // //             </Grid>

// // // // // //             <Grid item xs={12}>
// // // // // //               <FormLabel>Remarks</FormLabel>
// // // // // //               <TextField
// // // // // //                 fullWidth
// // // // // //                 multiline
// // // // // //                 rows={3}
// // // // // //                 placeholder="Remarks"
// // // // // //                 value={remarks}
// // // // // //                 onChange={(e) => setRemarks(e.target.value)}
// // // // // //               />
// // // // // //             </Grid>

// // // // // //             <Grid item xs={12}>
// // // // // //               <FormLabel required>Leave Reason</FormLabel>
// // // // // //               <TextField
// // // // // //                 fullWidth
// // // // // //                 multiline
// // // // // //                 rows={3}
// // // // // //                 placeholder="Leave Reason"
// // // // // //                 value={leaveReason}
// // // // // //                 onChange={(e) => setLeaveReason(e.target.value)}
// // // // // //               />
// // // // // //             </Grid>
// // // // // //           </Grid>

// // // // // //           <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4, pt: 3, borderTop: '1px solid #e0e0e0' }}>
// // // // // //             <Button
// // // // // //               variant="text"
// // // // // //               onClick={handleReset}
// // // // // //               sx={{
// // // // // //                 mr: 2,
// // // // // //                 color: 'text.primary',
// // // // // //                 backgroundColor: '#f5f5f5',
// // // // // //                 '&:hover': {
// // // // // //                   backgroundColor: '#e0e0e0',
// // // // // //                 }
// // // // // //               }}
// // // // // //             >
// // // // // //               Reset
// // // // // //             </Button>
// // // // // //             <Button
// // // // // //               variant="contained"
// // // // // //               onClick={handleSave}
// // // // // //             >
// // // // // //               Save
// // // // // //             </Button>
// // // // // //           </Box>

// // // // // //         </Paper>
// // // // // //       </Grid>

// // // // // //       {/* Right Panel: Attachment */}
// // // // // //       <Grid item xs={12} lg={4}>
// // // // // //         <Paper sx={{ p: 3, borderRadius: '8px' }} elevation={1}>
// // // // // //           <Typography variant="h6" fontWeight="600" sx={{ mb: 2 }}>
// // // // // //             Leave Attachment
// // // // // //           </Typography>
// // // // // //           <FormLabel>Attachment</FormLabel>
// // // // // //           <Box sx={{ display: 'flex', alignItems: 'center' }}>
// // // // // //             <Button
// // // // // //               variant="outlined"
// // // // // //               component="label"
// // // // // //               sx={{
// // // // // //                 textTransform: 'none',
// // // // // //                 borderColor: '#e0e0e0',
// // // // // //                 color: 'text.primary',
// // // // // //                 backgroundColor: 'white',
// // // // // //                 '&:hover': {
// // // // // //                   backgroundColor: '#f5f5f5',
// // // // // //                   borderColor: '#bdbdbd'
// // // // // //                 }
// // // // // //               }}
// // // // // //             >
// // // // // //               Choose file
// // // // // //               <input type="file" hidden onChange={handleFileChange} accept=".pdf,.gif,.png,.jpg,.jpeg" />
// // // // // //             </Button>
// // // // // //             <Typography variant="body2" sx={{ ml: 2, color: 'text.secondary', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
// // // // // //               {selectedFile ? selectedFile.name : 'No file chosen'}
// // // // // //             </Typography>
// // // // // //           </Box>
// // // // // //           <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
// // // // // //             Upload files only: pdf,gif,png,jpg,jpeg
// // // // // //           </Typography>
// // // // // //         </Paper>
// // // // // //       </Grid>
// // // // // //     </Grid>
// // // // // //   );
// // // // // // };

// // // // // // // ===================================================================================
// // // // // // //  COMPONENT 2: MAIN LEAVE MANAGEMENT PAGE
// // // // // // // ===================================================================================
// // // // // // export default function LeaveManagement() {
// // // // // //   const [entries, setEntries] = useState('10');
// // // // // //   const [searchTerm, setSearchTerm] = useState('');
// // // // // //   const [selectedYear, setSelectedYear] = useState('2024');
// // // // // //   const [isAddLeaveOpen, setIsAddLeaveOpen] = useState(false);
// // // // // //   const [leaveData, setLeaveData] = useState([
// // // // // //     { id: 1, employee: "Prasad Shinde", email: "prasad.shinde@tdt.world", leaveType: "Casual Leave (CL)", leaveDuration: "30/07/2024 To 30/07/2024", days: "1 Days", appliedOn: "30/07/2024", status: "Approved" },
// // // // // //     { id: 2, employee: "Prasad Shinde", email: "prasad.shinde@tdt.world", leaveType: "Casual Leave (CL)", leaveDuration: "09/09/2024 To 09/09/2024", days: "1 Days", appliedOn: "07/09/2024", status: "Pending" },
// // // // // //   ]);

// // // // // //   const leaveStats = [
// // // // // //     { title: "LEAVE TAKEN | PENDING", count: `${leaveData.filter(leave => leave.status === 'Approved').length} | ${leaveData.filter(leave => leave.status === 'Pending').length}`, color: "primary.main" },
// // // // // //   ];

// // // // // //   const handleAddLeaveOpen = () => setIsAddLeaveOpen(true);
// // // // // //   const handleAddLeaveClose = () => setIsAddLeaveOpen(false);

// // // // // //   const handleAddLeaveSubmit = (newLeaveData) => {
// // // // // //     // Basic validation to ensure dates are selected
// // // // // //     if (!newLeaveData.startDate || !newLeaveData.endDate) {
// // // // // //       alert("Please select a valid Start and End Date.");
// // // // // //       return;
// // // // // //     }

// // // // // //     console.log("New Leave Submitted:", newLeaveData);
// // // // // //     const newLeaveEntry = {
// // // // // //       id: leaveData.length + 1,
// // // // // //       employee: "Prasad Shinde",
// // // // // //       email: "prasad.shinde@tdtl.world",
// // // // // //       leaveType: newLeaveData.leaveType,
// // // // // //       leaveDuration: `${newLeaveData.startDate.toLocaleDateString()} To ${newLeaveData.endDate.toLocaleDateString()}`,
// // // // // //       days: newLeaveData.isHalfDay ? "0.5 Days" : "1+ Days",
// // // // // //       appliedOn: new Date().toLocaleDateString(),
// // // // // //       status: "Pending"
// // // // // //     };
// // // // // //     setLeaveData([...leaveData, newLeaveEntry]);
// // // // // //     handleAddLeaveClose();
// // // // // //   };

// // // // // //   return (
// // // // // //     // LocalizationProvider is essential for DatePicker to work
// // // // // //     <LocalizationProvider dateAdapter={AdapterDateFns}>
// // // // // //       <Box sx={{ p: 3, backgroundColor: '#f4f6f8', minHeight: '100vh' }}>

// // // // // //         {isAddLeaveOpen ? (
// // // // // //           <AddLeaveView onHide={handleAddLeaveClose} onSave={handleAddLeaveSubmit} />
// // // // // //         ) : (
// // // // // //           <>
// // // // // //             <Typography variant="h4" sx={{ mb: 2 }}>Leave Request</Typography>
// // // // // //             {/* MODIFIED: Added justifyContent="center" to center the grid items */}
// // // // // //             <Grid container spacing={2} justifyContent="center">
// // // // // //               {leaveStats.map((stat, index) => (
// // // // // //                 <Grid item xs={12} sm={4} key={index}>
// // // // // //                   <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
// // // // // //                     <Typography variant="subtitle2" color="text.secondary" sx={{ textAlign: 'center' }}>
// // // // // //                       {stat.title}
// // // // // //                     </Typography>
// // // // // //                     <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
// // // // // //                       <Typography variant="h4" color={stat.color}>{stat.count}</Typography>
// // // // // //                       <Box sx={{ ml: 1, color: 'text.secondary' }}>
// // // // // //                         <QuestionAnswerIcon />
// // // // // //                       </Box>
// // // // // //                     </Box>
// // // // // //                   </Paper>
// // // // // //                 </Grid>
// // // // // //               ))}
// // // // // //             </Grid>
// // // // // //             <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
// // // // // //               <FormControl sx={{ minWidth: 120 }}>
// // // // // //                 <InputLabel id="year-select-label">Year</InputLabel>
// // // // // //                 <Select
// // // // // //                   labelId="year-select-label"
// // // // // //                   id="year-select"
// // // // // //                   value={selectedYear}
// // // // // //                   label="Year"
// // // // // //                   onChange={(e) => setSelectedYear(e.target.value)}
// // // // // //                 >
// // // // // //                   <MenuItem value="2024">2024</MenuItem>
// // // // // //                   <MenuItem value="2023">2023</MenuItem>
// // // // // //                 </Select>
// // // // // //               </FormControl>
// // // // // //               <Box>
// // // // // //                 <Button variant="contained" startIcon={<AddIcon />} onClick={handleAddLeaveOpen}>
// // // // // //                   Add New Leave
// // // // // //                 </Button>
// // // // // //               </Box>
// // // // // //             </Box>
// // // // // //             <Paper sx={{ mt: 2, p: 2 }}>
// // // // // //               <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
// // // // // //                 <FormControl sx={{ minWidth: 120 }}>
// // // // // //                   <InputLabel id="entries-select-label">Show entries</InputLabel>
// // // // // //                   <Select
// // // // // //                     labelId="entries-select-label"
// // // // // //                     id="entries-select"
// // // // // //                     value={entries}
// // // // // //                     label="Show entries"
// // // // // //                     onChange={(e) => setEntries(e.target.value)}
// // // // // //                   >
// // // // // //                     <MenuItem value={10}>10</MenuItem>
// // // // // //                     <MenuItem value={25}>25</MenuItem>
// // // // // //                     <MenuItem value={50}>50</MenuItem>
// // // // // //                   </Select>
// // // // // //                 </FormControl>
// // // // // //                 <TextField
// // // // // //                   label="Search"
// // // // // //                   variant="outlined"
// // // // // //                   size="small"
// // // // // //                   value={searchTerm}
// // // // // //                   onChange={(e) => setSearchTerm(e.target.value)}
// // // // // //                 />
// // // // // //               </Box>
// // // // // //               <TableContainer>
// // // // // //                 <Table>
// // // // // //                   <TableHead>
// // // // // //                     <TableRow>
// // // // // //                       <TableCell>EMPLOYEE</TableCell>
// // // // // //                       <TableCell>LEAVE TYPE</TableCell>
// // // // // //                       <TableCell>LEAVE DURATION</TableCell>
// // // // // //                       <TableCell>DAYS</TableCell>
// // // // // //                       <TableCell>APPLIED ON</TableCell>
// // // // // //                     </TableRow>
// // // // // //                   </TableHead>
// // // // // //                   <TableBody>
// // // // // //                     {leaveData.map((leave) => (
// // // // // //                       <TableRow key={leave.id}>
// // // // // //                         <TableCell>
// // // // // //                           <Typography variant="body1">{leave.employee}</Typography>
// // // // // //                           <Typography variant="body2" color="text.secondary">{leave.email}</Typography>
// // // // // //                         </TableCell>
// // // // // //                         <TableCell>{leave.leaveType}</TableCell>
// // // // // //                         <TableCell>{leave.leaveDuration}</TableCell>
// // // // // //                         <TableCell>{leave.days}</TableCell>
// // // // // //                         <TableCell>{leave.appliedOn}</TableCell>
// // // // // //                       </TableRow>
// // // // // //                     ))}
// // // // // //                   </TableBody>
// // // // // //                 </Table>
// // // // // //               </TableContainer>
// // // // // //               <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
// // // // // //                 <Typography variant="body2">Showing 1 to {leaveData.length} of {leaveData.length} entries</Typography>
// // // // // //                 <Box>
// // // // // //                   <Button variant="outlined" sx={{ mr: 1 }}>Previous</Button>
// // // // // //                   <Button variant="contained" sx={{ mr: 1 }}>1</Button>
// // // // // //                   <Button variant="outlined">Next</Button>
// // // // // //                 </Box>
// // // // // //               </Box>
// // // // // //             </Paper>
// // // // // //           </>
// // // // // //         )}
// // // // // //       </Box>
// // // // // //     </LocalizationProvider>
// // // // // //   );
// // // // // // }

// // // // // import React, { useState, useEffect } from 'react';
// // // // // import {
// // // // //   Box,
// // // // //   Typography,
// // // // //   Button,
// // // // //   Paper,
// // // // //   Table,
// // // // //   TableBody,
// // // // //   TableCell,
// // // // //   TableContainer,
// // // // //   TableHead,
// // // // //   TableRow,
// // // // //   TextField,
// // // // //   FormControl,
// // // // //   InputLabel,
// // // // //   Select,
// // // // //   MenuItem,
// // // // //   Grid,
// // // // //   Switch,
// // // // //   FormControlLabel,
// // // // //   CircularProgress, // Removed Chip as it's no longer used
// // // // // } from '@mui/material';
// // // // // import {
// // // // //   QuestionAnswer as QuestionAnswerIcon,
// // // // //   Add as AddIcon,
// // // // //   Remove as RemoveIcon,
// // // // // } from '@mui/icons-material';
// // // // // import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// // // // // import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// // // // // import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// // // // // import { format, addDays } from 'date-fns';

// // // // // // ===================================================================================
// // // // // //  COMPONENT 1: HELPER FOR FORM LABELS
// // // // // // ===================================================================================
// // // // // const FormLabel = ({ children, required = false }) => (
// // // // //   <Typography component="label" sx={{ display: 'block', fontWeight: '500', mb: 1, fontSize: '0.875rem' }}>
// // // // //     {children} {required && <span style={{ color: '#f44336' }}>*</span>}
// // // // //   </Typography>
// // // // // );

// // // // // // ===================================================================================
// // // // // //  COMPONENT 2: ADD LEAVE VIEW (The UI for the form)
// // // // // // ===================================================================================
// // // // // const AddLeaveView = ({ onSave, onHide, submitting }) => {
// // // // //   const [leaveTypeId, setLeaveTypeId] = useState('');
// // // // //   const [leaveTypes, setLeaveTypes] = useState([]);
// // // // //   const [startDate, setStartDate] = useState(null);
// // // // //   const [endDate, setEndDate] = useState(null);
// // // // //   const [isHalfDay, setIsHalfDay] = useState(false);
// // // // //   const [remarks, setRemarks] = useState('');
// // // // //   const [leaveReason, setLeaveReason] = useState('');
// // // // //   const [selectedFile, setSelectedFile] = useState(null);

// // // // //   useEffect(() => {
// // // // //     const fetchLeaveTypes = async () => {
// // // // //       const accessToken = localStorage.getItem('accessToken');
// // // // //       if (!accessToken) return;
// // // // //       try {
// // // // //         const response = await fetch('https://tdtlworld.com/hrms-backend/api/leavetype-dropdown/', {
// // // // //           headers: { 'Authorization': `Bearer ${accessToken}` },
// // // // //         });
// // // // //         if (response.ok) setLeaveTypes(await response.json());
// // // // //       } catch (error) { console.error("Failed to fetch leave types:", error); }
// // // // //     };
// // // // //     fetchLeaveTypes();
// // // // //   }, []);

// // // // //   const handleFileChange = (event) => {
// // // // //     if (event.target.files && event.target.files.length > 0) setSelectedFile(event.target.files[0]);
// // // // //   };

// // // // //   const handleReset = () => {
// // // // //     setLeaveTypeId('');
// // // // //     setStartDate(null);
// // // // //     setEndDate(null);
// // // // //     setIsHalfDay(false);
// // // // //     setRemarks('');
// // // // //     setLeaveReason('');
// // // // //     setSelectedFile(null);
// // // // //   };

// // // // //   const handleSave = () => {
// // // // //     if (!leaveTypeId || !startDate || !endDate || !leaveReason) {
// // // // //       alert('Please fill all required fields.');
// // // // //       return;
// // // // //     }
// // // // //     onSave({
// // // // //       leaveTypeId,
// // // // //       startDate,
// // // // //       endDate,
// // // // //       isHalfDay,
// // // // //       remarks,
// // // // //       leaveReason,
// // // // //       attachment: selectedFile,
// // // // //     });
// // // // //   };

// // // // //   const selectedLeaveType = leaveTypes.find(lt => lt.value === leaveTypeId);
// // // // //   const isPaidLeave = selectedLeaveType?.label === "Paid Leave";
// // // // //   const isCasualLeave = selectedLeaveType?.label === "Casual Leave (CL)";

// // // // //   useEffect(() => {
// // // // //     if (!isCasualLeave) {
// // // // //       setIsHalfDay(false);
// // // // //     }
// // // // //   }, [isCasualLeave]);

// // // // //   const minPaidLeaveDate = addDays(new Date(), 8);
// // // // //   const maxCasualLeaveEndDate = startDate ? addDays(startDate, 1) : null;

// // // // //   return (
// // // // //     <Grid container spacing={3}>
// // // // //       <Grid item xs={12} lg={8}>
// // // // //         <Paper sx={{ p: 3, borderRadius: '8px' }} elevation={1}>
// // // // //           <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
// // // // //             <Typography variant="h6" fontWeight="600">Add Leave</Typography>
// // // // //             <Button variant="contained" startIcon={<RemoveIcon />} onClick={onHide} sx={{ textTransform: 'none' }}>Hide</Button>
// // // // //           </Box>
// // // // //           <Grid container spacing={3}>
// // // // //             <Grid item xs={12}>
// // // // //               <FormLabel required>Leave Type</FormLabel>
// // // // //               <FormControl fullWidth>
// // // // //                 <Select value={leaveTypeId} onChange={(e) => setLeaveTypeId(e.target.value)} displayEmpty
// // // // //                   renderValue={(selected) => selected ? leaveTypes.find(lt => lt.value === selected)?.label : <Typography sx={{ color: 'text.secondary' }}>Leave Type</Typography>}>
// // // // //                   <MenuItem disabled value=""><em>Leave Type</em></MenuItem>
// // // // //                   {leaveTypes.map((type) => (<MenuItem key={type.value} value={type.value}>{type.label}</MenuItem>))}
// // // // //                 </Select>
// // // // //               </FormControl>
// // // // //             </Grid>
// // // // //             <Grid item xs={12} sm={6}>
// // // // //               <FormLabel required>Start Date</FormLabel>
// // // // //               <DatePicker value={startDate} onChange={setStartDate} minDate={isPaidLeave ? minPaidLeaveDate : null} renderInput={(params) => <TextField {...params} fullWidth />} />
// // // // //             </Grid>
// // // // //             <Grid item xs={12} sm={6}>
// // // // //               <FormLabel required>End Date</FormLabel>
// // // // //               <DatePicker value={endDate} onChange={setEndDate} minDate={startDate} maxDate={isCasualLeave ? maxCasualLeaveEndDate : null} disabled={!startDate} renderInput={(params) => <TextField {...params} fullWidth disabled={!startDate} />} />
// // // // //             </Grid>

// // // // //             {isCasualLeave && (
// // // // //               <Grid item xs={12}>
// // // // //                 <FormControlLabel
// // // // //                   control={<Switch checked={isHalfDay} onChange={(e) => setIsHalfDay(e.target.checked)} />}
// // // // //                   label="Half Day"
// // // // //                 />
// // // // //               </Grid>
// // // // //             )}

// // // // //             <Grid item xs={12}>
// // // // //               <FormLabel>Remarks</FormLabel>
// // // // //               <TextField fullWidth multiline rows={3} placeholder="Remarks" value={remarks} onChange={(e) => setRemarks(e.target.value)} />
// // // // //             </Grid>
// // // // //             <Grid item xs={12}>
// // // // //               <FormLabel required>Leave Reason</FormLabel>
// // // // //               <TextField fullWidth multiline rows={3} placeholder="Leave Reason" value={leaveReason} onChange={(e) => setLeaveReason(e.target.value)} />
// // // // //             </Grid>
// // // // //           </Grid>
// // // // //           <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4, pt: 3, borderTop: '1px solid #e0e0e0' }}>
// // // // //             <Button variant="text" onClick={handleReset} sx={{ mr: 2, color: 'text.primary', backgroundColor: '#f5f5f5', '&:hover': { backgroundColor: '#e0e0e0' } }} disabled={submitting}>Reset</Button>
// // // // //             <Button variant="contained" onClick={handleSave} disabled={submitting}>
// // // // //               {submitting ? <CircularProgress size={24} /> : 'Save'}
// // // // //             </Button>
// // // // //           </Box>
// // // // //         </Paper>
// // // // //       </Grid>
// // // // //       <Grid item xs={12} lg={4}>
// // // // //         <Paper sx={{ p: 3, borderRadius: '8px' }} elevation={1}>
// // // // //           <Typography variant="h6" fontWeight="600" sx={{ mb: 2 }}>Leave Attachment</Typography>
// // // // //           <FormLabel>Attachment</FormLabel>
// // // // //           <Box sx={{ display: 'flex', alignItems: 'center' }}>
// // // // //             <Button variant="outlined" component="label" sx={{ textTransform: 'none', borderColor: '#e0e0e0', color: 'text.primary', backgroundColor: 'white', '&:hover': { backgroundColor: '#f5f5f5', borderColor: '#bdbdbd' } }}>
// // // // //               Choose file
// // // // //               <input type="file" hidden onChange={handleFileChange} accept=".pdf,.gif,.png,.jpg,.jpeg" />
// // // // //             </Button>
// // // // //             <Typography variant="body2" sx={{ ml: 2, color: 'text.secondary', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
// // // // //               {selectedFile ? selectedFile.name : 'No file chosen'}
// // // // //             </Typography>
// // // // //           </Box>
// // // // //           <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>Upload files only: pdf,gif,png,jpg,jpeg</Typography>
// // // // //         </Paper>
// // // // //       </Grid>
// // // // //     </Grid>
// // // // //   );
// // // // // };

// // // // // // ===================================================================================
// // // // // //  COMPONENT 3: MAIN LEAVE MANAGEMENT PAGE
// // // // // // ===================================================================================
// // // // // export default function LeaveManagement() {
// // // // //   const [entries, setEntries] = useState('10');
// // // // //   const [searchTerm, setSearchTerm] = useState('');
// // // // //   const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString());
// // // // //   const [isAddLeaveOpen, setIsAddLeaveOpen] = useState(false);
// // // // //   const [currentPage, setCurrentPage] = useState(1);
// // // // //   const [submitting, setSubmitting] = useState(false);
// // // // //   const [leaveData, setLeaveData] = useState([]);
// // // // //   const [loading, setLoading] = useState(true);
// // // // //   const [error, setError] = useState(null);

// // // // //   const fetchLeaveList = async () => {
// // // // //     setLoading(true);
// // // // //     setError(null);
// // // // //     try {
// // // // //       const employeeId = localStorage.getItem('loggedInUser');
// // // // //       const accessToken = localStorage.getItem('accessToken');
// // // // //       if (!employeeId || !accessToken) throw new Error("Authentication details not found.");
// // // // //       const url = `https://tdtlworld.com/hrms-backend/api/employee-leaves-list/?employee_id=${employeeId}`;
// // // // //       const response = await fetch(url, { headers: { 'Authorization': `Bearer ${accessToken}` } });
// // // // //       if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);
// // // // //       const data = await response.json();
// // // // //       setLeaveData(data.leave_applications.map((item, index) => ({
// // // // //         id: item.id || index, employee: item.employee_name, email: item.email, leaveType: item.leave_type,
// // // // //         leaveDuration: `${format(new Date(item.from_date), 'dd/MM/yyyy')} To ${format(new Date(item.to_date), 'dd/MM/yyyy')}`,
// // // // //         days: `${item.days_applied} Days`, status: item.status, appliedOn: new Date(item.from_date),
// // // // //       })).reverse());
// // // // //     } catch (err) {
// // // // //       setError(err.message);
// // // // //       console.error(err);
// // // // //     } finally { setLoading(false); }
// // // // //   };

// // // // //   useEffect(() => { fetchLeaveList(); }, []);

// // // // //   const handleAddLeaveSubmit = async (newLeaveData) => {
// // // // //     setSubmitting(true);
// // // // //     try {
// // // // //       const employeeId = localStorage.getItem('loggedInUser');
// // // // //       const accessToken = localStorage.getItem('accessToken');
// // // // //       if (!employeeId || !accessToken) throw new Error("Cannot submit leave. Authentication details are missing.");

// // // // //       const formData = new FormData();
// // // // //       formData.append('employee_id', employeeId);
// // // // //       formData.append('company_id', 2);
// // // // //       formData.append('leave_type_id', newLeaveData.leaveTypeId);
// // // // //       formData.append('from_date', format(newLeaveData.startDate, 'yyyy-MM-dd'));
// // // // //       formData.append('to_date', format(newLeaveData.endDate, 'yyyy-MM-dd'));
// // // // //       formData.append('reason', newLeaveData.leaveReason);
// // // // //       formData.append('remarks', newLeaveData.remarks);
// // // // //       formData.append('is_half_day', newLeaveData.isHalfDay ? 1 : 0);
// // // // //       if (newLeaveData.attachment) {
// // // // //         formData.append('leave_attachment', newLeaveData.attachment);
// // // // //       }

// // // // //       const response = await fetch('https://tdtlworld.com/hrms-backend/api/apply-leave/', {
// // // // //         method: 'POST',
// // // // //         headers: { 'Authorization': `Bearer ${accessToken}` },
// // // // //         body: formData,
// // // // //       });

// // // // //       if (!response.ok) {
// // // // //         const errorData = await response.json();
// // // // //         throw new Error(errorData.error || `Failed to apply for leave. Status: ${response.status}`);
// // // // //       }

// // // // //       alert('Leave applied successfully!');
// // // // //       setIsAddLeaveOpen(false);
// // // // //       fetchLeaveList();

// // // // //     } catch (err) {
// // // // //       console.error('Failed to submit leave:', err);
// // // // //       alert(`Error: ${err.message}`);
// // // // //     } finally {
// // // // //       setSubmitting(false);
// // // // //     }
// // // // //   };

// // // // //   // **REMOVED**: getStatusChip function is no longer needed.

// // // // //   const filteredData = leaveData
// // // // //     .filter(leave => leave.appliedOn.getFullYear().toString() === selectedYear)
// // // // //     .filter(leave => leave.employee.toLowerCase().includes(searchTerm.toLowerCase()) || leave.leaveType.toLowerCase().includes(searchTerm.toLowerCase()));

// // // // //   const entriesPerPage = parseInt(entries, 10);
// // // // //   const totalPages = Math.ceil(filteredData.length / entriesPerPage);
// // // // //   const startIndex = (currentPage - 1) * entriesPerPage;
// // // // //   const paginatedData = filteredData.slice(startIndex, startIndex + entriesPerPage);

// // // // //   return (
// // // // //     <LocalizationProvider dateAdapter={AdapterDateFns}>
// // // // //       <Box sx={{ p: 3, backgroundColor: '#f4f6f8', minHeight: '100vh' }}>
// // // // //         {isAddLeaveOpen ? (
// // // // //           <AddLeaveView onHide={() => setIsAddLeaveOpen(false)} onSave={handleAddLeaveSubmit} submitting={submitting} />
// // // // //         ) : (
// // // // //           <>
// // // // //             <Typography variant="h4" sx={{ mb: 2 }}>Leave Request</Typography>
// // // // //             <Grid container spacing={2} justifyContent="center" sx={{ mb: 2 }}>
// // // // //               <Grid item xs={12} sm={4}>
// // // // //                   <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
// // // // //                     <Typography variant="subtitle2" color="text.secondary">LEAVE TAKEN | PENDING</Typography>
// // // // //                     <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
// // // // //                       <Typography variant="h4" color="primary.main">{`${leaveData.filter(l => l.status === 'Approved').length} | ${leaveData.filter(l => l.status === 'Pending').length}`}</Typography>
// // // // //                       <QuestionAnswerIcon sx={{ ml: 1, color: 'text.secondary' }} />
// // // // //                     </Box>
// // // // //                   </Paper>
// // // // //                 </Grid>
// // // // //             </Grid>
// // // // //             <Box sx={{ my: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
// // // // //               <FormControl sx={{ minWidth: 120 }}>
// // // // //                 <InputLabel>Year</InputLabel>
// // // // //                 <Select value={selectedYear} label="Year" onChange={(e) => setSelectedYear(e.target.value)}>
// // // // //                   <MenuItem value="2025">2025</MenuItem>
// // // // //                   <MenuItem value="2024">2024</MenuItem>
// // // // //                   <MenuItem value="2023">2023</MenuItem>
// // // // //                 </Select>
// // // // //               </FormControl>
// // // // //               <Button variant="contained" startIcon={<AddIcon />} onClick={() => setIsAddLeaveOpen(true)}>Add New Leave</Button>
// // // // //             </Box>
// // // // //             <Paper sx={{ mt: 2, p: 2 }}>
// // // // //               <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
// // // // //                 <FormControl variant="outlined" size="small" sx={{minWidth: 120}}>
// // // // //                     <InputLabel>Show</InputLabel>
// // // // //                     <Select value={entries} label="Show" onChange={e => {setEntries(e.target.value); setCurrentPage(1);}}>
// // // // //                         <MenuItem value={10}>10</MenuItem>
// // // // //                         <MenuItem value={25}>25</MenuItem>
// // // // //                         <MenuItem value={50}>50</MenuItem>
// // // // //                     </Select>
// // // // //                 </FormControl>
// // // // //                 <TextField label="Search" variant="outlined" size="small" value={searchTerm} onChange={e => {setSearchTerm(e.target.value); setCurrentPage(1);}} />
// // // // //               </Box>
// // // // //               {loading ? <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}><CircularProgress /></Box>
// // // // //                : error ? <Typography color="error" sx={{ textAlign: 'center', p: 5 }}>{error}</Typography>
// // // // //                : <TableContainer>
// // // // //                   <Table>
// // // // //                     {/* **MODIFIED**: Removed 'STATUS' from the table header */}
// // // // //                     <TableHead><TableRow sx={{ bgcolor: '#f5f5f5' }}><TableCell>EMPLOYEE</TableCell><TableCell>LEAVE TYPE</TableCell><TableCell>LEAVE DURATION</TableCell><TableCell>DAYS</TableCell></TableRow></TableHead>
// // // // //                     <TableBody>
// // // // //                       {paginatedData.length > 0 ? paginatedData.map((leave) => (
// // // // //                         <TableRow key={leave.id}>
// // // // //                             <TableCell><Typography variant="body1">{leave.employee}</Typography><Typography variant="body2" color="text.secondary">{leave.email}</Typography></TableCell>
// // // // //                             <TableCell>{leave.leaveType}</TableCell>
// // // // //                             <TableCell>{leave.leaveDuration}</TableCell>
// // // // //                             <TableCell>{leave.days}</TableCell>
// // // // //                             {/* **MODIFIED**: Removed the status cell */}
// // // // //                         </TableRow>
// // // // //                       )) :
// // // // //                       // **MODIFIED**: Changed colSpan from 5 to 4
// // // // //                       <TableRow><TableCell colSpan={4} align="center">No leave data found for the selected criteria.</TableCell></TableRow>}
// // // // //                     </TableBody>
// // // // //                   </Table>
// // // // //                 </TableContainer>}
// // // // //               <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
// // // // //                 <Typography variant="body2">Showing {filteredData.length > 0 ? startIndex + 1 : 0} to {Math.min(startIndex + entriesPerPage, filteredData.length)} of {filteredData.length} entries</Typography>
// // // // //                 <Box>
// // // // //                   <Button variant="outlined" sx={{ mr: 1 }} disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}>Previous</Button>
// // // // //                   <Button variant="contained" sx={{ mr: 1, cursor: 'default' }}>{currentPage}</Button>
// // // // //                   <Button variant="outlined" disabled={currentPage >= totalPages} onClick={() => setCurrentPage(p => p + 1)}>Next</Button>
// // // // //                 </Box>
// // // // //               </Box>
// // // // //             </Paper>
// // // // //           </>
// // // // //         )}
// // // // //       </Box>
// // // // //     </LocalizationProvider>
// // // // //   );
// // // // // }

// // // // "use client"

// // // // import { useState, useEffect, useCallback, useMemo } from "react"
// // // // import {
// // // //   Box,
// // // //   Typography,
// // // //   Button,
// // // //   Paper,
// // // //   Table,
// // // //   TableBody,
// // // //   TableCell,
// // // //   TableContainer,
// // // //   TableHead,
// // // //   TableRow,
// // // //   TextField,
// // // //   FormControl,
// // // //   InputLabel,
// // // //   Select,
// // // //   MenuItem,
// // // //   Grid,
// // // //   Switch,
// // // //   FormControlLabel,
// // // //   CircularProgress,
// // // // } from "@mui/material"
// // // // import { QuestionAnswer as QuestionAnswerIcon, Add as AddIcon, Remove as RemoveIcon } from "@mui/icons-material"
// // // // import { DatePicker } from "@mui/x-date-pickers/DatePicker"
// // // // import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
// // // // import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
// // // // import {
// // // //   format,
// // // //   addDays,
// // // //   parseISO,
// // // //   isSaturday,
// // // //   isSunday,
// // // //   isBefore,
// // // //   isWithinInterval,
// // // //   startOfDay,
// // // // } from "date-fns"

// // // // // ===================================================================================
// // // // //  CONSTANTS
// // // // // ===================================================================================
// // // // const LEAVE_TYPES = {
// // // //   PAID: "Paid Leave",
// // // //   CASUAL: "Casual Leave (CL)",
// // // // }

// // // // const HOLIDAY_COLORS = {
// // // //   PUBLISHED: "#ffeb3b",
// // // //   UNPUBLISHED: "#ff9800",
// // // //   PUBLISHED_HOVER: "#fff176",
// // // //   UNPUBLISHED_HOVER: "#ffb74d",
// // // // }

// // // // const API_ENDPOINTS = {
// // // //   LEAVE_BALANCE: (employeeId) => `https://tdtlworld.com/hrms-backend/api/leave-balance/?employee_id=${employeeId}`,
// // // //   HOLIDAYS: (employeeId) => `https://tdtlworld.com/hrms-backend/employee/holidays/${employeeId}/`,
// // // //   EMPLOYEE_LEAVES: (employeeId) =>
// // // //     `https://tdtlworld.com/hrms-backend/api/employee-leaves-list/?employee_id=${employeeId}`,
// // // //   APPLY_LEAVE: "https://tdtlworld.com/hrms-backend/api/apply-leave/",
// // // // }

// // // // // ===================================================================================
// // // // //  UTILITY FUNCTIONS
// // // // // ===================================================================================
// // // // const getAuthHeaders = () => {
// // // //   const accessToken = localStorage.getItem("accessToken")
// // // //   return accessToken ? { Authorization: `Bearer ${accessToken}` } : {}
// // // // }

// // // // const getEmployeeId = () => localStorage.getItem("loggedInUser")

// // // // // ===================================================================================
// // // // //  CUSTOM HOOKS
// // // // // ===================================================================================
// // // // const useLeaveTypes = () => {
// // // //   const [leaveTypes, setLeaveTypes] = useState([])

// // // //   useEffect(() => {
// // // //     const fetchLeaveTypes = async () => {
// // // //       const accessToken = localStorage.getItem("accessToken")
// // // //       const employeeId = getEmployeeId()

// // // //       if (!accessToken || !employeeId) {
// // // //         console.warn("Access Token or Employee ID not found for fetching leave balance.")
// // // //         return
// // // //       }

// // // //       try {
// // // //         const response = await fetch(API_ENDPOINTS.LEAVE_BALANCE(employeeId), {
// // // //           headers: { Authorization: `Bearer ${accessToken}` },
// // // //         })
// // // //         if (response.ok) {
// // // //           const data = await response.json()
// // // //           // Transform data to the required { value, label, balance } format
// // // //           const transformedData = data.map((item) => ({
// // // //             value: item.leave_type_id,
// // // //             label: item.leave_type,
// // // //             balance: item.balance_leave,
// // // //           }))
// // // //           setLeaveTypes(transformedData)
// // // //         } else {
// // // //           console.error("Failed to fetch leave balance:", response.statusText)
// // // //         }
// // // //       } catch (error) {
// // // //         console.error("Failed to fetch leave types:", error)
// // // //       }
// // // //     }
// // // //     fetchLeaveTypes()
// // // //   }, [])

// // // //   return leaveTypes
// // // // }

// // // // const useHolidays = () => {
// // // //   const [holidays, setHolidays] = useState([])
// // // //   const [loading, setLoading] = useState(false)

// // // //   const fetchHolidays = useCallback(async () => {
// // // //     setLoading(true)
// // // //     try {
// // // //       const employeeId = getEmployeeId()
// // // //       const accessToken = localStorage.getItem("accessToken")

// // // //       if (!employeeId || !accessToken) {
// // // //         console.warn("Employee ID or access token not found for fetching holidays")
// // // //         return
// // // //       }

// // // //       const response = await fetch(API_ENDPOINTS.HOLIDAYS(employeeId), {
// // // //         method: "GET",
// // // //         headers: {
// // // //           Authorization: `Bearer ${accessToken}`,
// // // //           "Content-Type": "application/json",
// // // //         },
// // // //       })

// // // //       if (response.ok) {
// // // //         const holidayData = await response.json()
// // // //         const holidaysArray = Array.isArray(holidayData) ? holidayData : [holidayData]
// // // //         setHolidays(holidaysArray)
// // // //         console.log("Holidays fetched successfully:", holidaysArray)
// // // //       } else {
// // // //         console.error("Failed to fetch holidays:", response.status, response.statusText)
// // // //       }
// // // //     } catch (error) {
// // // //       console.error("Error fetching holidays:", error)
// // // //     } finally {
// // // //       setLoading(false)
// // // //     }
// // // //   }, [])

// // // //   useEffect(() => {
// // // //     fetchHolidays()
// // // //   }, [fetchHolidays])

// // // //   return { holidays, loading, refetch: fetchHolidays }
// // // // }

// // // // // ===================================================================================
// // // // //  COMPONENT 1: HELPER FOR FORM LABELS
// // // // // ===================================================================================
// // // // const FormLabel = ({ children, required = false }) => (
// // // //   <Typography component="label" sx={{ display: "block", fontWeight: "500", mb: 1, fontSize: "0.875rem" }}>
// // // //     {children} {required && <span style={{ color: "#f44336" }}>*</span>}
// // // //   </Typography>
// // // // )

// // // // // ===================================================================================
// // // // //  COMPONENT 2: HOLIDAY LEGEND
// // // // // ===================================================================================
// // // // const HolidayLegend = () => (
// // // //   <Box sx={{ mt: 3, p: 2, backgroundColor: "#f9f9f9", borderRadius: "4px" }}>
// // // //     <Typography variant="subtitle2" sx={{ mb: 1 }}>
// // // //       Holiday Legend:
// // // //     </Typography>
// // // //     <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
// // // //       <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
// // // //         <Box sx={{ width: 16, height: 16, backgroundColor: HOLIDAY_COLORS.PUBLISHED, borderRadius: "2px" }}></Box>
// // // //         <Typography variant="caption">Published Holidays</Typography>
// // // //       </Box>
// // // //       <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
// // // //         <Box sx={{ width: 16, height: 16, backgroundColor: HOLIDAY_COLORS.UNPUBLISHED, borderRadius: "2px" }}></Box>
// // // //         <Typography variant="caption">Unpublished Holidays</Typography>
// // // //       </Box>
// // // //     </Box>
// // // //   </Box>
// // // // )

// // // // // ===================================================================================
// // // // //  COMPONENT 3: CUSTOM DATE PICKER WITH HOLIDAY HIGHLIGHTING
// // // // // ===================================================================================
// // // // const HolidayDatePicker = ({ holidays, label, required, ...datePickerProps }) => {
// // // //   const getDayProps = useCallback(
// // // //     (ownerState) => {
// // // //       const isHoliday = holidays.find((h) => {
// // // //         try {
// // // //           const startDate = parseISO(h.start_date)
// // // //           const endDate = parseISO(h.end_date)
// // // //           return ownerState.day >= startDate && ownerState.day <= endDate
// // // //         } catch (e) {
// // // //           return false
// // // //         }
// // // //       })

// // // //       return {
// // // //         sx: {
// // // //           backgroundColor: isHoliday
// // // //             ? isHoliday.is_publish === 1
// // // //               ? `${HOLIDAY_COLORS.PUBLISHED} !important`
// // // //               : `${HOLIDAY_COLORS.UNPUBLISHED} !important`
// // // //             : "transparent",
// // // //           color: isHoliday ? "#000 !important" : "inherit",
// // // //           fontWeight: isHoliday ? "bold" : "normal",
// // // //           "&:hover": {
// // // //             backgroundColor: isHoliday
// // // //               ? isHoliday.is_publish === 1
// // // //                 ? `${HOLIDAY_COLORS.PUBLISHED_HOVER} !important`
// // // //                 : `${HOLIDAY_COLORS.UNPUBLISHED_HOVER} !important`
// // // //               : undefined,
// // // //           },
// // // //         },
// // // //       }
// // // //     },
// // // //     [holidays],
// // // //   )

// // // //   return (
// // // //     <>
// // // //       <FormLabel required={required}>{label}</FormLabel>
// // // //       <DatePicker
// // // //         {...datePickerProps}
// // // //         renderInput={(params) => <TextField {...params} fullWidth />}
// // // //         slotProps={{
// // // //           day: getDayProps,
// // // //         }}
// // // //       />
// // // //     </>
// // // //   )
// // // // }

// // // // // ===================================================================================
// // // // //  COMPONENT 4: ADD LEAVE VIEW (The UI for the form)
// // // // // ===================================================================================
// // // // const AddLeaveView = ({ onSave, onHide, submitting, holidays }) => {
// // // //   const [formData, setFormData] = useState({
// // // //     leaveTypeId: "",
// // // //     startDate: null,
// // // //     endDate: null,
// // // //     isHalfDay: false,
// // // //     remarks: "",
// // // //     leaveReason: "",
// // // //     selectedFile: null,
// // // //   })
// // // //   const [sandwichNotification, setSandwichNotification] = useState("")

// // // //   const leaveTypes = useLeaveTypes()

// // // //   const selectedLeaveType = useMemo(
// // // //     () => leaveTypes.find((lt) => lt.value === formData.leaveTypeId),
// // // //     [leaveTypes, formData.leaveTypeId],
// // // //   )

// // // //   const isPaidLeave = selectedLeaveType?.label === LEAVE_TYPES.PAID
// // // //   const isCasualLeave = selectedLeaveType?.label === LEAVE_TYPES.CASUAL
// // // //   const isLeaveTypeSelectedWithNoBalance = selectedLeaveType && selectedLeaveType.balance <= 0

// // // //   const dateConstraints = useMemo(
// // // //     () => ({
// // // //       // Block all past dates for selection.
// // // //       minDate: startOfDay(new Date()),
// // // //       // Paid leave can only be applied 8 days in advance (existing rule).
// // // //       minPaidLeaveDate: addDays(new Date(), 8),
// // // //     }),
// // // //     [],
// // // //   )

// // // //   // Calculate the maximum allowed end date based on balance and other rules
// // // //   const maxEndDate = useMemo(() => {
// // // //     if (!formData.startDate || !selectedLeaveType || selectedLeaveType.balance <= 0) {
// // // //       return null
// // // //     }

// // // //     const balance = selectedLeaveType.balance
// // // //     // Balance of 1 means end date is same as start date (add 0 days)
// // // //     const balanceBasedMaxDate = addDays(formData.startDate, balance - 1)

// // // //     // Existing business rules for specific leave types
// // // //     const maxCasualLeaveEndDate = addDays(formData.startDate, 1) // 2 days total
// // // //     const maxPaidLeaveEndDate = addDays(formData.startDate, 6) // 7 days total

// // // //     let finalMaxDate = balanceBasedMaxDate

// // // //     // The effective max date is the EARLIEST of the applicable constraints
// // // //     if (isCasualLeave && isBefore(maxCasualLeaveEndDate, finalMaxDate)) {
// // // //       finalMaxDate = maxCasualLeaveEndDate
// // // //     }
// // // //     if (isPaidLeave && isBefore(maxPaidLeaveEndDate, finalMaxDate)) {
// // // //       finalMaxDate = maxPaidLeaveEndDate
// // // //     }

// // // //     return finalMaxDate
// // // //   }, [formData.startDate, selectedLeaveType, isCasualLeave, isPaidLeave])

// // // //   useEffect(() => {
// // // //     if (!isCasualLeave) {
// // // //       setFormData((prev) => ({ ...prev, isHalfDay: false }))
// // // //     }
// // // //   }, [isCasualLeave])

// // // //   // Effect to check for the sandwich rule
// // // //   useEffect(() => {
// // // //     const { startDate, endDate } = formData

// // // //     const isHoliday = (date, holidayList) => {
// // // //       if (!holidayList || holidayList.length === 0) return false
// // // //       const checkDate = startOfDay(date)
// // // //       return holidayList.some((h) => {
// // // //         try {
// // // //           const holidayStart = startOfDay(parseISO(h.start_date))
// // // //           const holidayEnd = startOfDay(parseISO(h.end_date))
// // // //           return isWithinInterval(checkDate, { start: holidayStart, end: holidayEnd })
// // // //         } catch (error) {
// // // //           console.error("Invalid date format in holiday data:", h)
// // // //           return false
// // // //         }
// // // //       })
// // // //     }

// // // //     const checkSandwichRule = () => {
// // // //       if (!startDate || !endDate || !isBefore(startDate, endDate)) {
// // // //         setSandwichNotification("")
// // // //         return
// // // //       }

// // // //       let currentDate = addDays(startDate, 1)
// // // //       let ruleApplied = false

// // // //       while (isBefore(currentDate, endDate)) {
// // // //         const isWeekendDay = isSaturday(currentDate) || isSunday(currentDate)
// // // //         const isHolidayDay = isHoliday(currentDate, holidays)

// // // //         if (isWeekendDay || isHolidayDay) {
// // // //           ruleApplied = true
// // // //           break
// // // //         }
// // // //         currentDate = addDays(currentDate, 1)
// // // //       }

// // // //       if (ruleApplied) {
// // // //         setSandwichNotification(
// // // //           "Sandwich Rule Applied: Weekends and/or holidays between the selected dates will be counted as part of the leave.",
// // // //         )
// // // //       } else {
// // // //         setSandwichNotification("")
// // // //       }
// // // //     }

// // // //     checkSandwichRule()
// // // //   }, [formData.startDate, formData.endDate, holidays])

// // // //   const handleInputChange = useCallback((field, value) => {
// // // //     setFormData((prev) => {
// // // //       const newState = { ...prev, [field]: value }
// // // //       // If leave type or start date changes, reset subsequent date fields
// // // //       if (field === "leaveTypeId") {
// // // //         newState.startDate = null
// // // //         newState.endDate = null
// // // //       }
// // // //       if (field === "startDate") {
// // // //         newState.endDate = null
// // // //       }
// // // //       return newState
// // // //     })
// // // //   }, [])

// // // //   const handleFileChange = useCallback(
// // // //     (event) => {
// // // //       if (event.target.files && event.target.files.length > 0) {
// // // //         handleInputChange("selectedFile", event.target.files[0])
// // // //       }
// // // //     },
// // // //     [handleInputChange],
// // // //   )

// // // //   const handleReset = useCallback(() => {
// // // //     setFormData({
// // // //       leaveTypeId: "",
// // // //       startDate: null,
// // // //       endDate: null,
// // // //       isHalfDay: false,
// // // //       remarks: "",
// // // //       leaveReason: "",
// // // //       selectedFile: null,
// // // //     })
// // // //   }, [])

// // // //   const handleSave = useCallback(() => {
// // // //     const { leaveTypeId, startDate, endDate, leaveReason } = formData
// // // //     if (!leaveTypeId || !startDate || !endDate || !leaveReason) {
// // // //       alert("Please fill all required fields.")
// // // //       return
// // // //     }
// // // //     if (isLeaveTypeSelectedWithNoBalance) {
// // // //       alert("Cannot apply for leave with zero balance.")
// // // //       return
// // // //     }
// // // //     onSave(formData)
// // // //   }, [formData, onSave, isLeaveTypeSelectedWithNoBalance])

// // // //   return (
// // // //     <Grid container spacing={3}>
// // // //       <Grid item xs={12} lg={8}>
// // // //         <Paper sx={{ p: 3, borderRadius: "8px" }} elevation={1}>
// // // //           <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
// // // //             <Typography variant="h6" fontWeight="600">
// // // //               Add Leave
// // // //             </Typography>
// // // //             <Button variant="contained" startIcon={<RemoveIcon />} onClick={onHide} sx={{ textTransform: "none" }}>
// // // //               Hide
// // // //             </Button>
// // // //           </Box>

// // // //           <Grid container spacing={3}>
// // // //             <Grid item xs={12}>
// // // //               <FormLabel required>Leave Type</FormLabel>
// // // //               <FormControl fullWidth>
// // // //                 <Select
// // // //                   value={formData.leaveTypeId}
// // // //                   onChange={(e) => handleInputChange("leaveTypeId", e.target.value)}
// // // //                   displayEmpty
// // // //                   renderValue={(selected) =>
// // // //                     selected ? (
// // // //                       leaveTypes.find((lt) => lt.value === selected)?.label
// // // //                     ) : (
// // // //                       <Typography sx={{ color: "text.secondary" }}>Leave Type</Typography>
// // // //                     )
// // // //                   }
// // // //                 >
// // // //                   <MenuItem disabled value="">
// // // //                     <em>Leave Type</em>
// // // //                   </MenuItem>
// // // //                   {leaveTypes.map((type) => (
// // // //                     <MenuItem key={type.value} value={type.value}>
// // // //                       {`${type.label} (Balance: ${type.balance})`}
// // // //                     </MenuItem>
// // // //                   ))}
// // // //                 </Select>
// // // //               </FormControl>
// // // //             </Grid>

// // // //             <Grid item xs={12} sm={6}>
// // // //               <HolidayDatePicker
// // // //                 holidays={holidays}
// // // //                 label="Start Date"
// // // //                 required
// // // //                 value={formData.startDate}
// // // //                 onChange={(value) => handleInputChange("startDate", value)}
// // // //                 minDate={isPaidLeave ? dateConstraints.minPaidLeaveDate : dateConstraints.minDate}
// // // //                 disabled={!formData.leaveTypeId || isLeaveTypeSelectedWithNoBalance}
// // // //               />
// // // //             </Grid>

// // // //             <Grid item xs={12} sm={6}>
// // // //               <HolidayDatePicker
// // // //                 holidays={holidays}
// // // //                 label="End Date"
// // // //                 required
// // // //                 value={formData.endDate}
// // // //                 onChange={(value) => handleInputChange("endDate", value)}
// // // //                 minDate={formData.startDate}
// // // //                 maxDate={maxEndDate}
// // // //                 disabled={!formData.startDate || isLeaveTypeSelectedWithNoBalance}
// // // //               />
// // // //             </Grid>

// // // //             {sandwichNotification && (
// // // //               <Grid item xs={12}>
// // // //                 <Paper
// // // //                   elevation={0}
// // // //                   sx={{
// // // //                     p: 1.5,
// // // //                     mt: 1,
// // // //                     backgroundColor: "warning.light",
// // // //                     color: "warning.dark",
// // // //                     textAlign: "center",
// // // //                     borderRadius: "4px",
// // // //                   }}
// // // //                 >
// // // //                   <Typography variant="body2" sx={{ fontWeight: 500 }}>
// // // //                     {sandwichNotification}
// // // //                   </Typography>
// // // //                 </Paper>
// // // //               </Grid>
// // // //             )}

// // // //             {isCasualLeave && (
// // // //               <Grid item xs={12}>
// // // //                 <FormControlLabel
// // // //                   control={
// // // //                     <Switch
// // // //                       checked={formData.isHalfDay}
// // // //                       onChange={(e) => handleInputChange("isHalfDay", e.target.checked)}
// // // //                     />
// // // //                   }
// // // //                   label="Half Day"
// // // //                 />
// // // //               </Grid>
// // // //             )}

// // // //             <Grid item xs={12}>
// // // //               <FormLabel>Remarks</FormLabel>
// // // //               <TextField
// // // //                 fullWidth
// // // //                 multiline
// // // //                 rows={3}
// // // //                 placeholder="Remarks"
// // // //                 value={formData.remarks}
// // // //                 onChange={(e) => handleInputChange("remarks", e.target.value)}
// // // //               />
// // // //             </Grid>

// // // //             <Grid item xs={12}>
// // // //               <FormLabel required>Leave Reason</FormLabel>
// // // //               <TextField
// // // //                 fullWidth
// // // //                 multiline
// // // //                 rows={3}
// // // //                 placeholder="Leave Reason"
// // // //                 value={formData.leaveReason}
// // // //                 onChange={(e) => handleInputChange("leaveReason", e.target.value)}
// // // //               />
// // // //             </Grid>
// // // //           </Grid>

// // // //           <HolidayLegend />

// // // //           <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4, pt: 3, borderTop: "1px solid #e0e0e0" }}>
// // // //             <Button
// // // //               variant="text"
// // // //               onClick={handleReset}
// // // //               sx={{
// // // //                 mr: 2,
// // // //                 color: "text.primary",
// // // //                 backgroundColor: "#f5f5f5",
// // // //                 "&:hover": { backgroundColor: "#e0e0e0" },
// // // //               }}
// // // //               disabled={submitting}
// // // //             >
// // // //               Reset
// // // //             </Button>
// // // //             <Button variant="contained" onClick={handleSave} disabled={submitting || isLeaveTypeSelectedWithNoBalance}>
// // // //               {submitting ? <CircularProgress size={24} /> : "Save"}
// // // //             </Button>
// // // //           </Box>
// // // //         </Paper>
// // // //       </Grid>

// // // //       <Grid item xs={12} lg={4}>
// // // //         <Paper sx={{ p: 3, borderRadius: "8px" }} elevation={1}>
// // // //           <Typography variant="h6" fontWeight="600" sx={{ mb: 2 }}>
// // // //             Leave Attachment
// // // //           </Typography>
// // // //           <FormLabel>Attachment</FormLabel>
// // // //           <Box sx={{ display: "flex", alignItems: "center" }}>
// // // //             <Button
// // // //               variant="outlined"
// // // //               component="label"
// // // //               sx={{
// // // //                 textTransform: "none",
// // // //                 borderColor: "#e0e0e0",
// // // //                 color: "text.primary",
// // // //                 backgroundColor: "white",
// // // //                 "&:hover": { backgroundColor: "#f5f5f5", borderColor: "#bdbdbd" },
// // // //               }}
// // // //             >
// // // //               Choose file
// // // //               <input type="file" hidden onChange={handleFileChange} accept=".pdf,.gif,.png,.jpg,.jpeg" />
// // // //             </Button>
// // // //             <Typography
// // // //               variant="body2"
// // // //               sx={{
// // // //                 ml: 2,
// // // //                 color: "text.secondary",
// // // //                 whiteSpace: "nowrap",
// // // //                 overflow: "hidden",
// // // //                 textOverflow: "ellipsis",
// // // //               }}
// // // //             >
// // // //               {formData.selectedFile ? formData.selectedFile.name : "No file chosen"}
// // // //             </Typography>
// // // //           </Box>
// // // //           <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 1 }}>
// // // //             Upload files only: pdf,gif,png,jpg,jpeg
// // // //           </Typography>
// // // //         </Paper>
// // // //       </Grid>
// // // //     </Grid>
// // // //   )
// // // // }

// // // // // ===================================================================================
// // // // //  COMPONENT 5: MAIN LEAVE MANAGEMENT PAGE
// // // // // ===================================================================================
// // // // export default function LeaveManagementLM() {
// // // //   const [entries, setEntries] = useState("10")
// // // //   const [searchTerm, setSearchTerm] = useState("")
// // // //   const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString())
// // // //   const [isAddLeaveOpen, setIsAddLeaveOpen] = useState(false)
// // // //   const [currentPage, setCurrentPage] = useState(1)
// // // //   const [submitting, setSubmitting] = useState(false)
// // // //   const [leaveData, setLeaveData] = useState([])
// // // //   const [loading, setLoading] = useState(true)
// // // //   const [error, setError] = useState(null)

// // // //   const { holidays } = useHolidays()

// // // //   const fetchLeaveList = useCallback(async () => {
// // // //     setLoading(true)
// // // //     setError(null)
// // // //     try {
// // // //       const employeeId = getEmployeeId()
// // // //       const accessToken = localStorage.getItem("accessToken")
// // // //       if (!employeeId || !accessToken) throw new Error("Authentication details not found.")

// // // //       const response = await fetch(API_ENDPOINTS.EMPLOYEE_LEAVES(employeeId), {
// // // //         headers: { Authorization: `Bearer ${accessToken}` },
// // // //       })
// // // //       if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`)

// // // //       const data = await response.json()
// // // //       setLeaveData(
// // // //         data.leave_applications
// // // //           .map((item, index) => ({
// // // //             id: item.id || index,
// // // //             employee: item.employee_name,
// // // //             email: item.email,
// // // //             leaveType: item.leave_type,
// // // //             leaveDuration: `${format(new Date(item.from_date), "dd/MM/yyyy")} To ${format(
// // // //               new Date(item.to_date),
// // // //               "dd/MM/yyyy",
// // // //             )}`,
// // // //             days: `${item.days_applied} Days`,
// // // //             status: item.status,
// // // //             appliedOn: new Date(item.from_date),
// // // //           }))
// // // //           .reverse(),
// // // //       )
// // // //     } catch (err) {
// // // //       setError(err.message)
// // // //       console.error(err)
// // // //     } finally {
// // // //       setLoading(false)
// // // //     }
// // // //   }, [])

// // // //   useEffect(() => {
// // // //     fetchLeaveList()
// // // //   }, [fetchLeaveList])

// // // //   const handleAddLeaveSubmit = useCallback(
// // // //     async (newLeaveData) => {
// // // //       setSubmitting(true)
// // // //       try {
// // // //         const employeeId = getEmployeeId()
// // // //         const accessToken = localStorage.getItem("accessToken")
// // // //         if (!employeeId || !accessToken) throw new Error("Cannot submit leave. Authentication details are missing.")

// // // //         const formData = new FormData()
// // // //         formData.append("employee_id", employeeId)
// // // //         formData.append("company_id", 2)
// // // //         formData.append("leave_type_id", newLeaveData.leaveTypeId)
// // // //         formData.append("from_date", format(newLeaveData.startDate, "yyyy-MM-dd"))
// // // //         formData.append("to_date", format(newLeaveData.endDate, "yyyy-MM-dd"))
// // // //         formData.append("reason", newLeaveData.leaveReason)
// // // //         formData.append("remarks", newLeaveData.remarks)
// // // //         formData.append("is_half_day", newLeaveData.isHalfDay ? 1 : 0)
// // // //         if (newLeaveData.selectedFile) {
// // // //           formData.append("leave_attachment", newLeaveData.selectedFile)
// // // //         }

// // // //         const response = await fetch(API_ENDPOINTS.APPLY_LEAVE, {
// // // //           method: "POST",
// // // //           headers: getAuthHeaders(),
// // // //           body: formData,
// // // //         })

// // // //         if (!response.ok) {
// // // //           const errorData = await response.json()
// // // //           throw new Error(errorData.error || `Failed to apply for leave. Status: ${response.status}`)
// // // //         }

// // // //         alert("Leave applied successfully!")
// // // //         setIsAddLeaveOpen(false)
// // // //         fetchLeaveList()
// // // //       } catch (err) {
// // // //         console.error("Failed to submit leave:", err)
// // // //         alert(`Error: ${err.message}`)
// // // //       } finally {
// // // //         setSubmitting(false)
// // // //       }
// // // //     },
// // // //     [fetchLeaveList],
// // // //   )

// // // //   const filteredData = useMemo(() => {
// // // //     return leaveData
// // // //       .filter((leave) => leave.appliedOn.getFullYear().toString() === selectedYear)
// // // //       .filter(
// // // //         (leave) =>
// // // //           leave.employee.toLowerCase().includes(searchTerm.toLowerCase()) ||
// // // //           leave.leaveType.toLowerCase().includes(searchTerm.toLowerCase()),
// // // //       )
// // // //   }, [leaveData, selectedYear, searchTerm])

// // // //   const paginationData = useMemo(() => {
// // // //     const entriesPerPage = Number.parseInt(entries, 10)
// // // //     const totalPages = Math.ceil(filteredData.length / entriesPerPage)
// // // //     const startIndex = (currentPage - 1) * entriesPerPage
// // // //     const paginatedData = filteredData.slice(startIndex, startIndex + entriesPerPage)

// // // //     return { entriesPerPage, totalPages, startIndex, paginatedData }
// // // //   }, [filteredData, entries, currentPage])

// // // //   const leaveStats = useMemo(
// // // //     () => ({
// // // //       approved: leaveData.filter((l) => l.status === "Approved").length,
// // // //       pending: leaveData.filter((l) => l.status === "Pending").length,
// // // //     }),
// // // //     [leaveData],
// // // //   )

// // // //   return (
// // // //     <LocalizationProvider dateAdapter={AdapterDateFns}>
// // // //       <Box sx={{ p: 3, backgroundColor: "#f4f6f8", minHeight: "100vh" }}>
// // // //         {isAddLeaveOpen ? (
// // // //           <AddLeaveView
// // // //             onHide={() => setIsAddLeaveOpen(false)}
// // // //             onSave={handleAddLeaveSubmit}
// // // //             submitting={submitting}
// // // //             holidays={holidays}
// // // //           />
// // // //         ) : (
// // // //           <>
// // // //             <Typography variant="h4" sx={{ mb: 2 }}>
// // // //               Leave Request
// // // //             </Typography>

// // // //             <Grid container spacing={2} justifyContent="center" sx={{ mb: 2 }}>
// // // //               <Grid item xs={12} sm={4}>
// // // //                 <Paper sx={{ p: 2, display: "flex", flexDirection: "column", alignItems: "center" }}>
// // // //                   <Typography variant="subtitle2" color="text.secondary">
// // // //                     LEAVE TAKEN | PENDING
// // // //                   </Typography>
// // // //                   <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
// // // //                     <Typography variant="h4" color="primary.main">
// // // //                       {`${leaveStats.approved} | ${leaveStats.pending}`}
// // // //                     </Typography>
// // // //                     <QuestionAnswerIcon sx={{ ml: 1, color: "text.secondary" }} />
// // // //                   </Box>
// // // //                 </Paper>
// // // //               </Grid>
// // // //             </Grid>

// // // //             <Box sx={{ my: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
// // // //               <FormControl sx={{ minWidth: 120 }}>
// // // //                 <InputLabel>Year</InputLabel>
// // // //                 <Select value={selectedYear} label="Year" onChange={(e) => setSelectedYear(e.target.value)}>
// // // //                   <MenuItem value="2025">2025</MenuItem>
// // // //                   <MenuItem value="2024">2024</MenuItem>
// // // //                   <MenuItem value="2023">2023</MenuItem>
// // // //                 </Select>
// // // //               </FormControl>
// // // //               <Button variant="contained" startIcon={<AddIcon />} onClick={() => setIsAddLeaveOpen(true)}>
// // // //                 Add New Leave
// // // //               </Button>
// // // //             </Box>

// // // //             <Paper sx={{ mt: 2, p: 2 }}>
// // // //               <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
// // // //                 <FormControl variant="outlined" size="small" sx={{ minWidth: 120 }}>
// // // //                   <InputLabel>Show</InputLabel>
// // // //                   <Select
// // // //                     value={entries}
// // // //                     label="Show"
// // // //                     onChange={(e) => {
// // // //                       setEntries(e.target.value)
// // // //                       setCurrentPage(1)
// // // //                     }}
// // // //                   >
// // // //                     <MenuItem value={10}>10</MenuItem>
// // // //                     <MenuItem value={25}>25</MenuItem>
// // // //                     <MenuItem value={50}>50</MenuItem>
// // // //                   </Select>
// // // //                 </FormControl>
// // // //                 <TextField
// // // //                   label="Search"
// // // //                   variant="outlined"
// // // //                   size="small"
// // // //                   value={searchTerm}
// // // //                   onChange={(e) => {
// // // //                     setSearchTerm(e.target.value)
// // // //                     setCurrentPage(1)
// // // //                   }}
// // // //                 />
// // // //               </Box>

// // // //               {loading ? (
// // // //                 <Box sx={{ display: "flex", justifyContent: "center", p: 5 }}>
// // // //                   <CircularProgress />
// // // //                 </Box>
// // // //               ) : error ? (
// // // //                 <Typography color="error" sx={{ textAlign: "center", p: 5 }}>
// // // //                   {error}
// // // //                 </Typography>
// // // //               ) : (
// // // //                 <TableContainer>
// // // //                   <Table>
// // // //                     <TableHead>
// // // //                       <TableRow sx={{ bgcolor: "#f5f5f5" }}>
// // // //                         <TableCell>EMPLOYEE</TableCell>
// // // //                         <TableCell>LEAVE TYPE</TableCell>
// // // //                         <TableCell>LEAVE DURATION</TableCell>
// // // //                         <TableCell>DAYS</TableCell>
// // // //                       </TableRow>
// // // //                     </TableHead>
// // // //                     <TableBody>
// // // //                       {paginationData.paginatedData.length > 0 ? (
// // // //                         paginationData.paginatedData.map((leave) => (
// // // //                           <TableRow key={leave.id}>
// // // //                             <TableCell>
// // // //                               <Typography variant="body1">{leave.employee}</Typography>
// // // //                               <Typography variant="body2" color="text.secondary">
// // // //                                 {leave.email}
// // // //                               </Typography>
// // // //                             </TableCell>
// // // //                             <TableCell>{leave.leaveType}</TableCell>
// // // //                             <TableCell>{leave.leaveDuration}</TableCell>
// // // //                             <TableCell>{leave.days}</TableCell>
// // // //                           </TableRow>
// // // //                         ))
// // // //                       ) : (
// // // //                         <TableRow>
// // // //                           <TableCell colSpan={4} align="center">
// // // //                             No leave data found for the selected criteria.
// // // //                           </TableCell>
// // // //                         </TableRow>
// // // //                       )}
// // // //                     </TableBody>
// // // //                   </Table>
// // // //                 </TableContainer>
// // // //               )}

// // // //               <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 2 }}>
// // // //                 <Typography variant="body2">
// // // //                   Showing {filteredData.length > 0 ? paginationData.startIndex + 1 : 0} to{" "}
// // // //                   {Math.min(paginationData.startIndex + paginationData.entriesPerPage, filteredData.length)} of{" "}
// // // //                   {filteredData.length} entries
// // // //                 </Typography>
// // // //                 <Box>
// // // //                   <Button
// // // //                     variant="outlined"
// // // //                     sx={{ mr: 1 }}
// // // //                     disabled={currentPage === 1}
// // // //                     onClick={() => setCurrentPage((p) => p - 1)}
// // // //                   >
// // // //                     Previous
// // // //                   </Button>
// // // //                   <Button variant="contained" sx={{ mr: 1, cursor: "default" }}>
// // // //                     {currentPage}
// // // //                   </Button>
// // // //                   <Button
// // // //                     variant="outlined"
// // // //                     disabled={currentPage >= paginationData.totalPages}
// // // //                     onClick={() => setCurrentPage((p) => p + 1)}
// // // //                   >
// // // //                     Next
// // // //                   </Button>
// // // //                 </Box>
// // // //               </Box>
// // // //             </Paper>
// // // //           </>
// // // //         )}
// // // //       </Box>
// // // //     </LocalizationProvider>
// // // //   )
// // // // }

// // // import { useState, useEffect, useCallback, useMemo } from "react"
// // // import {
// // //   Box,
// // //   Typography,
// // //   Button,
// // //   Paper,
// // //   Table,
// // //   TableBody,
// // //   TableCell,
// // //   TableContainer,
// // //   TableHead,
// // //   TableRow,
// // //   TextField,
// // //   FormControl,
// // //   InputLabel,
// // //   Select,
// // //   MenuItem,
// // //   Grid,
// // //   Switch,
// // //   FormControlLabel,
// // //   CircularProgress,
// // // } from "@mui/material"
// // // import { QuestionAnswer as QuestionAnswerIcon, Add as AddIcon, Remove as RemoveIcon } from "@mui/icons-material"
// // // import { DatePicker } from "@mui/x-date-pickers/DatePicker"
// // // import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
// // // import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
// // // import {
// // //   format,
// // //   addDays,
// // //   parseISO,
// // //   isSaturday,
// // //   isSunday,
// // //   isBefore,
// // //   isWithinInterval,
// // //   startOfDay,
// // // } from "date-fns"

// // // // ===================================================================================
// // // //  CONSTANTS
// // // // ===================================================================================
// // // const LEAVE_TYPES = {
// // //   PAID: "Paid Leave",
// // //   CASUAL: "Casual Leave (CL)",
// // //   MATERNITY: "Maternity Leave",
// // // }

// // // const HOLIDAY_COLORS = {
// // //   PUBLISHED: "#ffeb3b",
// // //   UNPUBLISHED: "#ff9800",
// // //   PUBLISHED_HOVER: "#fff176",
// // //   UNPUBLISHED_HOVER: "#ffb74d",
// // // }

// // // const API_ENDPOINTS = {
// // //   LEAVE_BALANCE: (employeeId) => `https://tdtlworld.com/hrms-backend/api/leave-balance/?employee_id=${employeeId}`,
// // //   HOLIDAYS: (employeeId) => `https://tdtlworld.com/hrms-backend/employee/holidays/${employeeId}/`,
// // //   EMPLOYEE_LEAVES: (employeeId) =>
// // //     `https://tdtlworld.com/hrms-backend/api/employee-leaves-list/?employee_id=${employeeId}`,
// // //   APPLY_LEAVE: "https://tdtlworld.com/hrms-backend/api/apply-leave/",
// // // }

// // // // ===================================================================================
// // // //  UTILITY FUNCTIONS
// // // // ===================================================================================
// // // const getAuthHeaders = () => {
// // //   const accessToken = localStorage.getItem("accessToken")
// // //   return accessToken ? { Authorization: `Bearer ${accessToken}` } : {}
// // // }

// // // const getEmployeeId = () => localStorage.getItem("loggedInUser")

// // // // ===================================================================================
// // // //  CUSTOM HOOKS
// // // // ===================================================================================
// // // const useLeaveTypes = () => {
// // //   const [leaveTypes, setLeaveTypes] = useState([])
// // //   const EXCLUDED_LEAVE_TYPES = ["Compensatory Off (Comp Off)", "Privilege Leave (PL)", "Privilege Leave"]

// // //   useEffect(() => {
// // //     const fetchLeaveTypes = async () => {
// // //       const accessToken = localStorage.getItem("accessToken")
// // //       const employeeId = getEmployeeId()

// // //       if (!accessToken || !employeeId) {
// // //         console.warn("Access Token or Employee ID not found for fetching leave balance.")
// // //         return
// // //       }

// // //       try {
// // //         const response = await fetch(API_ENDPOINTS.LEAVE_BALANCE(employeeId), {
// // //           headers: { Authorization: `Bearer ${accessToken}` },
// // //         })
// // //         if (response.ok) {
// // //           const data = await response.json()
// // //           // MODIFIED: Changed `item.leave_type` to `item.category_name` to get the correct label.
// // //           const transformedData = data.map((item) => ({
// // //             value: item.leave_type_id,
// // //             label: item.category_name, // Use category_name for the display label
// // //             balance: item.balance_leave,
// // //           }))
// // //           // Filter out the excluded leave types
// // //           const filteredData = transformedData.filter((item) => !EXCLUDED_LEAVE_TYPES.includes(item.label))
// // //           setLeaveTypes(filteredData)
// // //         } else {
// // //           console.error("Failed to fetch leave balance:", response.statusText)
// // //         }
// // //       } catch (error) {
// // //         console.error("Failed to fetch leave types:", error)
// // //       }
// // //     }
// // //     fetchLeaveTypes()
// // //   }, [])

// // //   return leaveTypes
// // // }

// // // const useHolidays = () => {
// // //   const [holidays, setHolidays] = useState([])
// // //   const [loading, setLoading] = useState(false)

// // //   const fetchHolidays = useCallback(async () => {
// // //     setLoading(true)
// // //     try {
// // //       const employeeId = getEmployeeId()
// // //       const accessToken = localStorage.getItem("accessToken")

// // //       if (!employeeId || !accessToken) {
// // //         console.warn("Employee ID or access token not found for fetching holidays")
// // //         return
// // //       }

// // //       const response = await fetch(API_ENDPOINTS.HOLIDAYS(employeeId), {
// // //         method: "GET",
// // //         headers: {
// // //           Authorization: `Bearer ${accessToken}`,
// // //           "Content-Type": "application/json",
// // //         },
// // //       })

// // //       if (response.ok) {
// // //         const holidayData = await response.json()
// // //         const holidaysArray = Array.isArray(holidayData) ? holidayData : [holidayData]
// // //         setHolidays(holidaysArray)
// // //         console.log("Holidays fetched successfully:", holidaysArray)
// // //       } else {
// // //         console.error("Failed to fetch holidays:", response.status, response.statusText)
// // //       }
// // //     } catch (error) {
// // //       console.error("Error fetching holidays:", error)
// // //     } finally {
// // //       setLoading(false)
// // //     }
// // //   }, [])

// // //   useEffect(() => {
// // //     fetchHolidays()
// // //   }, [fetchHolidays])

// // //   return { holidays, loading, refetch: fetchHolidays }
// // // }

// // // // ===================================================================================
// // // //  COMPONENT 1: HELPER FOR FORM LABELS
// // // // ===================================================================================
// // // const FormLabel = ({ children, required = false }) => (
// // //   <Typography component="label" sx={{ display: "block", fontWeight: "500", mb: 1, fontSize: "0.875rem" }}>
// // //     {children} {required && <span style={{ color: "#f44336" }}>*</span>}
// // //   </Typography>
// // // )

// // // // ===================================================================================
// // // //  COMPONENT 2: HOLIDAY LEGEND
// // // // ===================================================================================
// // // const HolidayLegend = () => (
// // //   <Box sx={{ mt: 3, p: 2, backgroundColor: "#f9f9f9", borderRadius: "4px" }}>
// // //     <Typography variant="subtitle2" sx={{ mb: 1 }}>
// // //       Holiday Legend:
// // //     </Typography>
// // //     <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
// // //       <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
// // //         <Box sx={{ width: 16, height: 16, backgroundColor: HOLIDAY_COLORS.PUBLISHED, borderRadius: "2px" }}></Box>
// // //         <Typography variant="caption">Published Holidays</Typography>
// // //       </Box>
// // //       <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
// // //         <Box sx={{ width: 16, height: 16, backgroundColor: HOLIDAY_COLORS.UNPUBLISHED, borderRadius: "2px" }}></Box>
// // //         <Typography variant="caption">Unpublished Holidays</Typography>
// // //       </Box>
// // //     </Box>
// // //   </Box>
// // // )

// // // // ===================================================================================
// // // //  COMPONENT 3: CUSTOM DATE PICKER WITH HOLIDAY HIGHLIGHTING
// // // // ===================================================================================
// // // const HolidayDatePicker = ({ holidays, label, required, shouldDisableDate, ...datePickerProps }) => {
// // //   const getDayProps = useCallback(
// // //     (ownerState) => {
// // //       const isHoliday = holidays.find((h) => {
// // //         try {
// // //           const startDate = parseISO(h.start_date)
// // //           const endDate = parseISO(h.end_date)
// // //           return ownerState.day >= startDate && ownerState.day <= endDate
// // //         } catch (e) {
// // //           return false
// // //         }
// // //       })

// // //       return {
// // //         sx: {
// // //           backgroundColor: isHoliday
// // //             ? isHoliday.is_publish === 1
// // //               ? `${HOLIDAY_COLORS.PUBLISHED} !important`
// // //               : `${HOLIDAY_COLORS.UNPUBLISHED} !important`
// // //             : "transparent",
// // //           color: isHoliday ? "#000 !important" : "inherit",
// // //           fontWeight: isHoliday ? "bold" : "normal",
// // //           "&:hover": {
// // //             backgroundColor: isHoliday
// // //               ? isHoliday.is_publish === 1
// // //                 ? `${HOLIDAY_COLORS.PUBLISHED_HOVER} !important`
// // //                 : `${HOLIDAY_COLORS.UNPUBLISHED_HOVER} !important`
// // //               : undefined,
// // //           },
// // //         },
// // //       }
// // //     },
// // //     [holidays],
// // //   )

// // //   return (
// // //     <>
// // //       <FormLabel required={required}>{label}</FormLabel>
// // //       <DatePicker
// // //         {...datePickerProps}
// // //         renderInput={(params) => <TextField {...params} fullWidth />}
// // //         shouldDisableDate={shouldDisableDate}
// // //         slotProps={{
// // //           day: getDayProps,
// // //         }}
// // //       />
// // //     </>
// // //   )
// // // }

// // // // ===================================================================================
// // // //  COMPONENT 4: ADD LEAVE VIEW (The UI for the form)
// // // // ===================================================================================
// // // const AddLeaveView = ({ onSave, onHide, submitting, holidays }) => {
// // //   const [formData, setFormData] = useState({
// // //     leaveTypeId: "",
// // //     startDate: null,
// // //     endDate: null,
// // //     isHalfDay: false,
// // //     remarks: "",
// // //     leaveReason: "",
// // //     selectedFile: null,
// // //   })
// // //   const [sandwichNotification, setSandwichNotification] = useState("")

// // //   const leaveTypes = useLeaveTypes()

// // //   const selectedLeaveType = useMemo(
// // //     () => leaveTypes.find((lt) => lt.value === formData.leaveTypeId),
// // //     [leaveTypes, formData.leaveTypeId],
// // //   )

// // //   const isPaidLeave = selectedLeaveType?.label === LEAVE_TYPES.PAID
// // //   const isCasualLeave = selectedLeaveType?.label === LEAVE_TYPES.CASUAL
// // //   const isMaternityLeave = selectedLeaveType?.label === LEAVE_TYPES.MATERNITY
// // //   const isLeaveTypeSelectedWithNoBalance =
// // //     selectedLeaveType && !isMaternityLeave && selectedLeaveType.balance <= 0

// // //   const dateConstraints = useMemo(
// // //     () => ({
// // //       // Block all past dates for selection.
// // //       minDate: startOfDay(new Date()),
// // //       // Paid leave can only be applied 8 days in advance (existing rule).
// // //       minPaidLeaveDate: addDays(new Date(), 8),
// // //     }),
// // //     [],
// // //   )

// // //   // Calculate the maximum allowed end date based on balance and other rules
// // //   const maxEndDate = useMemo(() => {
// // //     if (!formData.startDate || !selectedLeaveType) {
// // //       return null
// // //     }

// // //     // Maternity leave has a fixed duration rule of 182 days
// // //     if (isMaternityLeave) {
// // //       return addDays(formData.startDate, 181) // 182 days total duration
// // //     }

// // //     // For other leaves, check balance first
// // //     if (selectedLeaveType.balance <= 0) {
// // //       return null
// // //     }

// // //     const balance = selectedLeaveType.balance
// // //     // Balance of 1 means end date is same as start date (add 0 days)
// // //     const balanceBasedMaxDate = addDays(formData.startDate, balance - 1)

// // //     // Existing business rules for specific leave types
// // //     const maxCasualLeaveEndDate = addDays(formData.startDate, 1) // 2 days total
// // //     const maxPaidLeaveEndDate = addDays(formData.startDate, 6) // 7 days total

// // //     let finalMaxDate = balanceBasedMaxDate

// // //     // The effective max date is the EARLIEST of the applicable constraints
// // //     if (isCasualLeave && isBefore(maxCasualLeaveEndDate, finalMaxDate)) {
// // //       finalMaxDate = maxCasualLeaveEndDate
// // //     }
// // //     if (isPaidLeave && isBefore(maxPaidLeaveEndDate, finalMaxDate)) {
// // //       finalMaxDate = maxPaidLeaveEndDate
// // //     }

// // //     return finalMaxDate
// // //   }, [formData.startDate, selectedLeaveType, isCasualLeave, isPaidLeave, isMaternityLeave])

// // //   useEffect(() => {
// // //     // If the selected leave type is neither Casual nor Paid, reset the half-day toggle.
// // //     if (!isCasualLeave && !isPaidLeave) {
// // //       setFormData((prev) => ({ ...prev, isHalfDay: false }))
// // //     }
// // //   }, [isCasualLeave, isPaidLeave])

// // //   // Effect to check for the sandwich rule
// // //   useEffect(() => {
// // //     const { startDate, endDate } = formData

// // //     const isHoliday = (date, holidayList) => {
// // //       if (!holidayList || holidayList.length === 0) return false
// // //       const checkDate = startOfDay(date)
// // //       return holidayList.some((h) => {
// // //         try {
// // //           const holidayStart = startOfDay(parseISO(h.start_date))
// // //           const holidayEnd = startOfDay(parseISO(h.end_date))
// // //           return isWithinInterval(checkDate, { start: holidayStart, end: holidayEnd })
// // //         } catch (error) {
// // //           console.error("Invalid date format in holiday data:", h)
// // //           return false
// // //         }
// // //       })
// // //     }

// // //     const checkSandwichRule = () => {
// // //       // Do not apply sandwich rule for Maternity Leave
// // //       if (!startDate || !endDate || !isBefore(startDate, endDate) || isMaternityLeave) {
// // //         setSandwichNotification("")
// // //         return
// // //       }

// // //       let currentDate = addDays(startDate, 1)
// // //       let ruleApplied = false

// // //       while (isBefore(currentDate, endDate)) {
// // //         const isWeekendDay = isSaturday(currentDate) || isSunday(currentDate)
// // //         const isHolidayDay = isHoliday(currentDate, holidays)

// // //         if (isWeekendDay || isHolidayDay) {
// // //           ruleApplied = true
// // //           break
// // //         }
// // //         currentDate = addDays(currentDate, 1)
// // //       }

// // //       if (ruleApplied) {
// // //         setSandwichNotification(
// // //           "Sandwich Rule Applied: Weekends and/or holidays between the selected dates will be counted as part of the leave.",
// // //         )
// // //       } else {
// // //         setSandwichNotification("")
// // //       }
// // //     }

// // //     checkSandwichRule()
// // //   }, [formData.startDate, formData.endDate, holidays, isMaternityLeave])

// // //   const handleInputChange = useCallback((field, value) => {
// // //     setFormData((prev) => {
// // //       const newState = { ...prev, [field]: value }
// // //       // If leave type or start date changes, reset subsequent date fields
// // //       if (field === "leaveTypeId") {
// // //         newState.startDate = null
// // //         newState.endDate = null
// // //       }
// // //       if (field === "startDate") {
// // //         newState.endDate = null
// // //       }
// // //       return newState
// // //     })
// // //   }, [])

// // //   const handleFileChange = useCallback(
// // //     (event) => {
// // //       if (event.target.files && event.target.files.length > 0) {
// // //         const file = event.target.files[0]
// // //         const allowedExtensions = ["pdf", "gif", "png", "jpg", "jpeg"]
// // //         const fileExtension = file.name.split(".").pop().toLowerCase()

// // //         if (!allowedExtensions.includes(fileExtension)) {
// // //           alert("Invalid file type. Please upload only: pdf, gif, png, jpg, jpeg")
// // //           event.target.value = null // Clear the file input
// // //           return
// // //         }
// // //         handleInputChange("selectedFile", file)
// // //       }
// // //     },
// // //     [handleInputChange],
// // //   )

// // //   const handleReset = useCallback(() => {
// // //     setFormData({
// // //       leaveTypeId: "",
// // //       startDate: null,
// // //       endDate: null,
// // //       isHalfDay: false,
// // //       remarks: "",
// // //       leaveReason: "",
// // //       selectedFile: null,
// // //     })
// // //   }, [])

// // //   const handleSave = useCallback(() => {
// // //     const { leaveTypeId, startDate, endDate, leaveReason } = formData
// // //     if (!leaveTypeId || !startDate || !endDate || !leaveReason) {
// // //       alert("Please fill all required fields.")
// // //       return
// // //     }
// // //     if (isLeaveTypeSelectedWithNoBalance) {
// // //       alert("Cannot apply for leave with zero balance.")
// // //       return
// // //     }
// // //     onSave(formData)
// // //   }, [formData, onSave, isLeaveTypeSelectedWithNoBalance])

// // //   return (
// // //     <Grid container spacing={3}>
// // //       <Grid item xs={12} lg={8}>
// // //         <Paper sx={{ p: 3, borderRadius: "8px" }} elevation={1}>
// // //           <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
// // //             <Typography variant="h6" fontWeight="600">
// // //               Add Leave
// // //             </Typography>
// // //             <Button variant="contained" startIcon={<RemoveIcon />} onClick={onHide} sx={{ textTransform: "none" }}>
// // //               Hide
// // //             </Button>
// // //           </Box>

// // //           <Grid container spacing={3}>
// // //             <Grid item xs={12}>
// // //               <FormLabel required>Leave Type</FormLabel>
// // //               <FormControl fullWidth>
// // //                 <Select
// // //                   value={formData.leaveTypeId}
// // //                   onChange={(e) => handleInputChange("leaveTypeId", e.target.value)}
// // //                   displayEmpty
// // //                   renderValue={(selected) =>
// // //                     selected ? (
// // //                       leaveTypes.find((lt) => lt.value === selected)?.label
// // //                     ) : (
// // //                       <Typography sx={{ color: "text.secondary" }}>Leave Type</Typography>
// // //                     )
// // //                   }
// // //                 >
// // //                   <MenuItem disabled value="">
// // //                     <em>Leave Type</em>
// // //                   </MenuItem>
// // //                   {leaveTypes.map((type) => (
// // //                     <MenuItem
// // //                       key={type.value}
// // //                       value={type.value}
// // //                       disabled={type.label !== LEAVE_TYPES.MATERNITY && type.balance <= 0}
// // //                     >
// // //                       {`${type.label} (Balance: ${type.balance})`}
// // //                     </MenuItem>
// // //                   ))}
// // //                 </Select>
// // //               </FormControl>
// // //             </Grid>

// // //             <Grid item xs={12} sm={6}>
// // //               <HolidayDatePicker
// // //                 holidays={holidays}
// // //                 label="Start Date"
// // //                 required
// // //                 value={formData.startDate}
// // //                 onChange={(value) => handleInputChange("startDate", value)}
// // //                 minDate={isPaidLeave ? dateConstraints.minPaidLeaveDate : dateConstraints.minDate}
// // //                 disabled={!formData.leaveTypeId || isLeaveTypeSelectedWithNoBalance}
// // //                 shouldDisableDate={(date) => isSunday(date)}
// // //               />
// // //             </Grid>

// // //             <Grid item xs={12} sm={6}>
// // //               <HolidayDatePicker
// // //                 holidays={holidays}
// // //                 label="End Date"
// // //                 required
// // //                 value={formData.endDate}
// // //                 onChange={(value) => handleInputChange("endDate", value)}
// // //                 minDate={formData.startDate}
// // //                 maxDate={maxEndDate}
// // //                 disabled={!formData.startDate || isLeaveTypeSelectedWithNoBalance}
// // //                 shouldDisableDate={(date) => isSunday(date)}
// // //               />
// // //             </Grid>

// // //             {sandwichNotification && (
// // //               <Grid item xs={12}>
// // //                 <Paper
// // //                   elevation={0}
// // //                   sx={{
// // //                     p: 1.5,
// // //                     mt: 1,
// // //                     backgroundColor: "warning.light",
// // //                     color: "warning.dark",
// // //                     textAlign: "center",
// // //                     borderRadius: "4px",
// // //                   }}
// // //                 >
// // //                   <Typography variant="body2" sx={{ fontWeight: 500 }}>
// // //                     {sandwichNotification}
// // //                   </Typography>
// // //                 </Paper>
// // //               </Grid>
// // //             )}

// // //             {(isCasualLeave || isPaidLeave) && (
// // //               <Grid item xs={12}>
// // //                 <FormControlLabel
// // //                   control={
// // //                     <Switch
// // //                       checked={formData.isHalfDay}
// // //                       onChange={(e) => handleInputChange("isHalfDay", e.target.checked)}
// // //                     />
// // //                   }
// // //                   label="Half Day"
// // //                 />
// // //               </Grid>
// // //             )}

// // //             <Grid item xs={12}>
// // //               <FormLabel>Remarks</FormLabel>
// // //               <TextField
// // //                 fullWidth
// // //                 multiline
// // //                 rows={3}
// // //                 placeholder="Remarks"
// // //                 value={formData.remarks}
// // //                 onChange={(e) => handleInputChange("remarks", e.target.value)}
// // //               />
// // //             </Grid>

// // //             <Grid item xs={12}>
// // //               <FormLabel required>Leave Reason</FormLabel>
// // //               <TextField
// // //                 fullWidth
// // //                 multiline
// // //                 rows={3}
// // //                 placeholder="Leave Reason"
// // //                 value={formData.leaveReason}
// // //                 onChange={(e) => handleInputChange("leaveReason", e.target.value)}
// // //               />
// // //             </Grid>
// // //           </Grid>

// // //           <HolidayLegend />

// // //           <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4, pt: 3, borderTop: "1px solid #e0e0e0" }}>
// // //             <Button
// // //               variant="text"
// // //               onClick={handleReset}
// // //               sx={{
// // //                 mr: 2,
// // //                 color: "text.primary",
// // //                 backgroundColor: "#f5f5f5",
// // //                 "&:hover": { backgroundColor: "#e0e0e0" },
// // //               }}
// // //               disabled={submitting}
// // //             >
// // //               Reset
// // //             </Button>
// // //             <Button variant="contained" onClick={handleSave} disabled={submitting || isLeaveTypeSelectedWithNoBalance}>
// // //               {submitting ? <CircularProgress size={24} /> : "Save"}
// // //             </Button>
// // //           </Box>
// // //         </Paper>
// // //       </Grid>

// // //       <Grid item xs={12} lg={4}>
// // //         <Paper sx={{ p: 3, borderRadius: "8px" }} elevation={1}>
// // //           <Typography variant="h6" fontWeight="600" sx={{ mb: 2 }}>
// // //             Leave Attachment
// // //           </Typography>
// // //           <FormLabel>Attachment</FormLabel>
// // //           <Box sx={{ display: "flex", alignItems: "center" }}>
// // //             <Button
// // //               variant="outlined"
// // //               component="label"
// // //               sx={{
// // //                 textTransform: "none",
// // //                 borderColor: "#e0e0e0",
// // //                 color: "text.primary",
// // //                 backgroundColor: "white",
// // //                 "&:hover": { backgroundColor: "#f5f5f5", borderColor: "#bdbdbd" },
// // //               }}
// // //             >
// // //               Choose file
// // //               <input type="file" hidden onChange={handleFileChange} accept=".pdf,.gif,.png,.jpg,.jpeg" />
// // //             </Button>
// // //             <Typography
// // //               variant="body2"
// // //               sx={{
// // //                 ml: 2,
// // //                 color: "text.secondary",
// // //                 whiteSpace: "nowrap",
// // //                 overflow: "hidden",
// // //                 textOverflow: "ellipsis",
// // //               }}
// // //             >
// // //               {formData.selectedFile ? formData.selectedFile.name : "No file chosen"}
// // //             </Typography>
// // //           </Box>
// // //           <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 1 }}>
// // //             Upload files only: pdf,gif,png,jpg,jpeg
// // //           </Typography>
// // //         </Paper>
// // //       </Grid>
// // //     </Grid>
// // //   )
// // // }

// // // // ===================================================================================
// // // //  COMPONENT 5: MAIN LEAVE MANAGEMENT PAGE
// // // // ===================================================================================
// // // export default function LeaveManagement() {
// // //   const [entries, setEntries] = useState("10")
// // //   const [searchTerm, setSearchTerm] = useState("")
// // //   const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString())
// // //   const [isAddLeaveOpen, setIsAddLeaveOpen] = useState(false)
// // //   const [currentPage, setCurrentPage] = useState(1)
// // //   const [submitting, setSubmitting] = useState(false)
// // //   const [leaveData, setLeaveData] = useState([])
// // //   const [loading, setLoading] = useState(true)
// // //   const [error, setError] = useState(null)

// // //   const { holidays } = useHolidays()

// // //   const fetchLeaveList = useCallback(async () => {
// // //     setLoading(true)
// // //     setError(null)
// // //     try {
// // //       const employeeId = getEmployeeId()
// // //       const accessToken = localStorage.getItem("accessToken")
// // //       if (!employeeId || !accessToken) throw new Error("Authentication details not found.")

// // //       const response = await fetch(API_ENDPOINTS.EMPLOYEE_LEAVES(employeeId), {
// // //         headers: { Authorization: `Bearer ${accessToken}` },
// // //       })
// // //       if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`)

// // //       const data = await response.json()
// // //       // If `leave_applications` exists and is an array, use it. Otherwise, use an empty array.
// // //       const applications = Array.isArray(data.leave_applications) ? data.leave_applications : []

// // //       setLeaveData(
// // //         applications
// // //           .map((item, index) => ({
// // //             id: item.id || index,
// // //             employee: item.employee_name,
// // //             email: item.email,
// // //             leaveType: item.leave_type,
// // //             leaveDuration: `${format(new Date(item.from_date), "dd/MM/yyyy")} To ${format(
// // //               new Date(item.to_date),
// // //               "dd/MM/yyyy",
// // //             )}`,
// // //             days: `${item.days_applied} Days`,
// // //             status: item.status,
// // //             appliedOn: new Date(item.from_date),
// // //           }))
// // //           .reverse(),
// // //       )
// // //     } catch (err) {
// // //       setError(err.message)
// // //       console.error(err)
// // //     } finally {
// // //       setLoading(false)
// // //     }
// // //   }, [])

// // //   useEffect(() => {
// // //     fetchLeaveList()
// // //   }, [fetchLeaveList])

// // //   const handleAddLeaveSubmit = useCallback(
// // //     async (newLeaveData) => {
// // //       setSubmitting(true)
// // //       try {
// // //         const employeeId = getEmployeeId()
// // //         const accessToken = localStorage.getItem("accessToken")
// // //         if (!employeeId || !accessToken) throw new Error("Cannot submit leave. Authentication details are missing.")

// // //         const formData = new FormData()
// // //         formData.append("employee_id", employeeId)
// // //         formData.append("company_id", 2)
// // //         formData.append("leave_type_id", newLeaveData.leaveTypeId)
// // //         formData.append("from_date", format(newLeaveData.startDate, "yyyy-MM-dd"))
// // //         formData.append("to_date", format(newLeaveData.endDate, "yyyy-MM-dd"))
// // //         formData.append("reason", newLeaveData.leaveReason)
// // //         formData.append("remarks", newLeaveData.remarks)
// // //         formData.append("is_half_day", newLeaveData.isHalfDay ? 1 : 0)
// // //         if (newLeaveData.selectedFile) {
// // //           formData.append("leave_attachment", newLeaveData.selectedFile)
// // //         }

// // //         const response = await fetch(API_ENDPOINTS.APPLY_LEAVE, {
// // //           method: "POST",
// // //           headers: getAuthHeaders(),
// // //           body: formData,
// // //         })

// // //         if (!response.ok) {
// // //           const errorData = await response.json()
// // //           throw new Error(errorData.error || `Failed to apply for leave. Status: ${response.status}`)
// // //         }

// // //         alert("Leave applied successfully!")
// // //         setIsAddLeaveOpen(false)
// // //         fetchLeaveList()
// // //       } catch (err) {
// // //         console.error("Failed to submit leave:", err)
// // //         alert(`Error: ${err.message}`)
// // //       } finally {
// // //         setSubmitting(false)
// // //       }
// // //     },
// // //     [fetchLeaveList],
// // //   )

// // //   const filteredData = useMemo(() => {
// // //     return leaveData
// // //       .filter((leave) => leave.appliedOn.getFullYear().toString() === selectedYear)
// // //       .filter(
// // //         (leave) =>
// // //           leave.employee.toLowerCase().includes(searchTerm.toLowerCase()) ||
// // //           leave.leaveType.toLowerCase().includes(searchTerm.toLowerCase()),
// // //       )
// // //   }, [leaveData, selectedYear, searchTerm])

// // //   const paginationData = useMemo(() => {
// // //     const entriesPerPage = Number.parseInt(entries, 10)
// // //     const totalPages = Math.ceil(filteredData.length / entriesPerPage)
// // //     const startIndex = (currentPage - 1) * entriesPerPage
// // //     const paginatedData = filteredData.slice(startIndex, startIndex + entriesPerPage)

// // //     return { entriesPerPage, totalPages, startIndex, paginatedData }
// // //   }, [filteredData, entries, currentPage])

// // //   const leaveStats = useMemo(
// // //     () => ({
// // //       approved: leaveData.filter((l) => l.status === "Approved").length,
// // //       pending: leaveData.filter((l) => l.status === "Pending").length,
// // //     }),
// // //     [leaveData],
// // //   )

// // //   return (
// // //     <LocalizationProvider dateAdapter={AdapterDateFns}>
// // //       <Box sx={{ p: 3, backgroundColor: "#f4f6f8", minHeight: "100vh" }}>
// // //         {isAddLeaveOpen ? (
// // //           <AddLeaveView
// // //             onHide={() => setIsAddLeaveOpen(false)}
// // //             onSave={handleAddLeaveSubmit}
// // //             submitting={submitting}
// // //             holidays={holidays}
// // //           />
// // //         ) : (
// // //           <>
// // //             <Typography variant="h4" sx={{ mb: 2 }}>
// // //               Leave Request
// // //             </Typography>

// // //             <Grid container spacing={2} justifyContent="center" sx={{ mb: 2 }}>
// // //               <Grid item xs={12} sm={4}>
// // //                 <Paper sx={{ p: 2, display: "flex", flexDirection: "column", alignItems: "center" }}>
// // //                   <Typography variant="subtitle2" color="text.secondary">
// // //                     LEAVE TAKEN
// // //                   </Typography>
// // //                   <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
// // //                     <Typography variant="h4" color="primary.main">
// // //                       {`${leaveStats.approved} `}
// // //                     </Typography>
// // //                     <QuestionAnswerIcon sx={{ ml: 1, color: "text.secondary" }} />
// // //                   </Box>
// // //                 </Paper>
// // //               </Grid>
// // //             </Grid>

// // //             <Box sx={{ my: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
// // //               <FormControl sx={{ minWidth: 120 }}>
// // //                 <InputLabel>Year</InputLabel>
// // //                 <Select value={selectedYear} label="Year" onChange={(e) => setSelectedYear(e.target.value)}>
// // //                   <MenuItem value="2025">2025</MenuItem>
// // //                   <MenuItem value="2024">2024</MenuItem>
// // //                   <MenuItem value="2023">2023</MenuItem>
// // //                 </Select>
// // //               </FormControl>
// // //               <Button variant="contained" startIcon={<AddIcon />} onClick={() => setIsAddLeaveOpen(true)}>
// // //                 Add New Leave
// // //               </Button>
// // //             </Box>

// // //             <Paper sx={{ mt: 2, p: 2 }}>
// // //               <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
// // //                 <FormControl variant="outlined" size="small" sx={{ minWidth: 120 }}>
// // //                   <InputLabel>Show</InputLabel>
// // //                   <Select
// // //                     value={entries}
// // //                     label="Show"
// // //                     onChange={(e) => {
// // //                       setEntries(e.target.value)
// // //                       setCurrentPage(1)
// // //                     }}
// // //                   >
// // //                     <MenuItem value={10}>10</MenuItem>
// // //                     <MenuItem value={25}>25</MenuItem>
// // //                     <MenuItem value={50}>50</MenuItem>
// // //                   </Select>
// // //                 </FormControl>
// // //                 <TextField
// // //                   label="Search"
// // //                   variant="outlined"
// // //                   size="small"
// // //                   value={searchTerm}
// // //                   onChange={(e) => {
// // //                     setSearchTerm(e.target.value)
// // //                     setCurrentPage(1)
// // //                   }}
// // //                 />
// // //               </Box>

// // //               {loading ? (
// // //                 <Box sx={{ display: "flex", justifyContent: "center", p: 5 }}>
// // //                   <CircularProgress />
// // //                 </Box>
// // //               ) : error ? (
// // //                 <Typography color="error" sx={{ textAlign: "center", p: 5 }}>
// // //                   {error}
// // //                 </Typography>
// // //               ) : (
// // //                 <TableContainer>
// // //                   <Table>
// // //                     <TableHead>
// // //                       <TableRow sx={{ bgcolor: "#f5f5f5" }}>
// // //                         <TableCell>EMPLOYEE</TableCell>
// // //                         <TableCell>LEAVE TYPE</TableCell>
// // //                         <TableCell>LEAVE DURATION</TableCell>
// // //                         <TableCell>DAYS</TableCell>
// // //                       </TableRow>
// // //                     </TableHead>
// // //                     <TableBody>
// // //                       {paginationData.paginatedData.length > 0 ? (
// // //                         paginationData.paginatedData.map((leave) => (
// // //                           <TableRow key={leave.id}>
// // //                             <TableCell>
// // //                               <Typography variant="body1">{leave.employee}</Typography>
// // //                               <Typography variant="body2" color="text.secondary">
// // //                                 {leave.email}
// // //                               </Typography>
// // //                             </TableCell>
// // //                             <TableCell>{leave.leaveType}</TableCell>
// // //                             <TableCell>{leave.leaveDuration}</TableCell>
// // //                             <TableCell>{leave.days}</TableCell>
// // //                           </TableRow>
// // //                         ))
// // //                       ) : (
// // //                         <TableRow>
// // //                           <TableCell colSpan={4} align="center">
// // //                             No leave data found for the selected criteria.
// // //                           </TableCell>
// // //                         </TableRow>
// // //                       )}
// // //                     </TableBody>
// // //                   </Table>
// // //                 </TableContainer>
// // //               )}

// // //               <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 2 }}>
// // //                 <Typography variant="body2">
// // //                   Showing {filteredData.length > 0 ? paginationData.startIndex + 1 : 0} to{" "}
// // //                   {Math.min(paginationData.startIndex + paginationData.entriesPerPage, filteredData.length)} of{" "}
// // //                   {filteredData.length} entries
// // //                 </Typography>
// // //                 <Box>
// // //                   <Button
// // //                     variant="outlined"
// // //                     sx={{ mr: 1 }}
// // //                     disabled={currentPage === 1}
// // //                     onClick={() => setCurrentPage((p) => p - 1)}
// // //                   >
// // //                     Previous
// // //                   </Button>
// // //                   <Button variant="contained" sx={{ mr: 1, cursor: "default" }}>
// // //                     {currentPage}
// // //                   </Button>
// // //                   <Button
// // //                     variant="outlined"
// // //                     disabled={currentPage >= paginationData.totalPages}
// // //                     onClick={() => setCurrentPage((p) => p + 1)}
// // //                   >
// // //                     Next
// // //                   </Button>
// // //                 </Box>
// // //               </Box>
// // //             </Paper>
// // //           </>
// // //         )}
// // //       </Box>
// // //     </LocalizationProvider>
// // //   )
// // // }

// // import { useState, useEffect, useCallback, useMemo } from "react";
// // import {
// //   Box,
// //   Typography,
// //   Button,
// //   Paper,
// //   Table,
// //   TableBody,
// //   TableCell,
// //   TableContainer,
// //   TableHead,
// //   TableRow,
// //   TextField,
// //   FormControl,
// //   InputLabel,
// //   Select,
// //   MenuItem,
// //   Grid,
// //   Switch,
// //   FormControlLabel,
// //   CircularProgress,
// // } from "@mui/material";
// // import {
// //   QuestionAnswer as QuestionAnswerIcon,
// //   Add as AddIcon,
// //   Remove as RemoveIcon,
// // } from "@mui/icons-material";
// // import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// // import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
// // import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// // import {
// //   format,
// //   addDays,
// //   parseISO,
// //   isSaturday,
// //   isSunday,
// //   isBefore,
// //   isWithinInterval,
// //   startOfDay,
// //   differenceInCalendarDays,
// // } from "date-fns";

// // // ===================================================================================
// // //  CONSTANTS
// // // ===================================================================================
// // const LEAVE_TYPES = {
// //   PAID: "Paid Leave",
// //   CASUAL: "Casual Leave (CL)",
// //   MATERNITY: "Maternity Leave",
// //   MEDICAL: "Medical Leave (ML)",
// //   PATERNITY: "Paternity Leave",
// // };

// // const HOLIDAY_COLORS = {
// //   PUBLISHED: "#ffeb3b",
// //   UNPUBLISHED: "#ff9800",
// //   PUBLISHED_HOVER: "#fff176",
// //   UNPUBLISHED_HOVER: "#ffb74d",
// // };

// // const API_ENDPOINTS = {
// //   LEAVE_BALANCE: (employeeId) =>
// //     `https://tdtlworld.com/hrms-backend/api/leave-balance/?employee_id=${employeeId}`,
// //   HOLIDAYS: (employeeId) =>
// //     `https://tdtlworld.com/hrms-backend/employee/holidays/${employeeId}/`,
// //   EMPLOYEE_LEAVES: (employeeId) =>
// //     `https://tdtlworld.com/hrms-backend/api/employee-leaves-list/?employee_id=${employeeId}`,
// //   APPLY_LEAVE: "https://tdtlworld.com/hrms-backend/api/apply-leave/",
// // };

// // // ===================================================================================
// // //  UTILITY FUNCTIONS
// // // ===================================================================================
// // const getAuthHeaders = () => {
// //   const accessToken = localStorage.getItem("accessToken");
// //   return accessToken ? { Authorization: `Bearer ${accessToken}` } : {};
// // };

// // const getEmployeeId = () => localStorage.getItem("loggedInUser");

// // // ===================================================================================
// // //  CUSTOM HOOKS
// // // ===================================================================================
// // const useLeaveTypes = () => {
// //   const [leaveTypes, setLeaveTypes] = useState([]);
// //   const EXCLUDED_LEAVE_TYPES = [
// //     "Compensatory Off (Comp Off)",
// //     "Privilege Leave (PL)",
// //     "Privilege Leave",
// //   ];

// //   useEffect(() => {
// //     const fetchLeaveTypes = async () => {
// //       const accessToken = localStorage.getItem("accessToken");
// //       const employeeId = getEmployeeId();

// //       if (!accessToken || !employeeId) {
// //         console.warn(
// //           "Access Token or Employee ID not found for fetching leave balance."
// //         );
// //         return;
// //       }

// //       try {
// //         const response = await fetch(API_ENDPOINTS.LEAVE_BALANCE(employeeId), {
// //           headers: { Authorization: `Bearer ${accessToken}` },
// //         });
// //         if (response.ok) {
// //           const data = await response.json();
// //           const transformedData = data.map((item) => ({
// //             value: item.leave_type_id,
// //             label: item.category_name,
// //             balance: item.balance_leave,
// //           }));
// //           const filteredData = transformedData.filter(
// //             (item) => !EXCLUDED_LEAVE_TYPES.includes(item.label)
// //           );
// //           setLeaveTypes(filteredData);
// //         } else {
// //           console.error("Failed to fetch leave balance:", response.statusText);
// //         }
// //       } catch (error) {
// //         console.error("Failed to fetch leave types:", error);
// //       }
// //     };
// //     fetchLeaveTypes();
// //   }, []);

// //   return leaveTypes;
// // };

// // const useHolidays = () => {
// //   const [holidays, setHolidays] = useState([]);
// //   const [loading, setLoading] = useState(false);

// //   const fetchHolidays = useCallback(async () => {
// //     setLoading(true);
// //     try {
// //       const employeeId = getEmployeeId();
// //       const accessToken = localStorage.getItem("accessToken");

// //       if (!employeeId || !accessToken) {
// //         console.warn(
// //           "Employee ID or access token not found for fetching holidays"
// //         );
// //         return;
// //       }

// //       const response = await fetch(API_ENDPOINTS.HOLIDAYS(employeeId), {
// //         method: "GET",
// //         headers: {
// //           Authorization: `Bearer ${accessToken}`,
// //           "Content-Type": "application/json",
// //         },
// //       });

// //       if (response.ok) {
// //         const holidayData = await response.json();
// //         const holidaysArray = Array.isArray(holidayData)
// //           ? holidayData
// //           : [holidayData];
// //         setHolidays(holidaysArray);
// //         console.log("Holidays fetched successfully:", holidaysArray);
// //       } else {
// //         console.error(
// //           "Failed to fetch holidays:",
// //           response.status,
// //           response.statusText
// //         );
// //       }
// //     } catch (error) {
// //       console.error("Error fetching holidays:", error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   }, []);

// //   useEffect(() => {
// //     fetchHolidays();
// //   }, [fetchHolidays]);

// //   return { holidays, loading, refetch: fetchHolidays };
// // };

// // // ===================================================================================
// // //  COMPONENT 1: HELPER FOR FORM LABELS
// // // ===================================================================================
// // const FormLabel = ({ children, required = false }) => (
// //   <Typography
// //     component="label"
// //     sx={{ display: "block", fontWeight: "500", mb: 1, fontSize: "0.875rem" }}
// //   >
// //     {children} {required && <span style={{ color: "#f44336" }}>*</span>}
// //   </Typography>
// // );

// // // ===================================================================================
// // //  COMPONENT 2: HOLIDAY LEGEND
// // // ===================================================================================
// // const HolidayLegend = () => (
// //   <Box sx={{ mt: 3, p: 2, backgroundColor: "#f9f9f9", borderRadius: "4px" }}>
// //     <Typography variant="subtitle2" sx={{ mb: 1 }}>
// //       Holiday Legend:
// //     </Typography>
// //     <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
// //       <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
// //         <Box
// //           sx={{
// //             width: 16,
// //             height: 16,
// //             backgroundColor: HOLIDAY_COLORS.PUBLISHED,
// //             borderRadius: "2px",
// //           }}
// //         ></Box>
// //         <Typography variant="caption">Published Holidays</Typography>
// //       </Box>
// //       <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
// //         <Box
// //           sx={{
// //             width: 16,
// //             height: 16,
// //             backgroundColor: HOLIDAY_COLORS.UNPUBLISHED,
// //             borderRadius: "2px",
// //           }}
// //         ></Box>
// //         <Typography variant="caption">Unpublished Holidays</Typography>
// //       </Box>
// //     </Box>
// //   </Box>
// // );

// // // ===================================================================================
// // //  COMPONENT 3: CUSTOM DATE PICKER WITH HOLIDAY HIGHLIGHTING
// // // ===================================================================================
// // const HolidayDatePicker = ({
// //   holidays,
// //   label,
// //   required,
// //   shouldDisableDate,
// //   ...datePickerProps
// // }) => {
// //   const getDayProps = useCallback(
// //     (ownerState) => {
// //       const isHoliday = holidays.find((h) => {
// //         try {
// //           const startDate = parseISO(h.start_date);
// //           const endDate = parseISO(h.end_date);
// //           return ownerState.day >= startDate && ownerState.day <= endDate;
// //         } catch (e) {
// //           return false;
// //         }
// //       });

// //       return {
// //         sx: {
// //           backgroundColor: isHoliday
// //             ? isHoliday.is_publish === 1
// //               ? `${HOLIDAY_COLORS.PUBLISHED} !important`
// //               : `${HOLIDAY_COLORS.UNPUBLISHED} !important`
// //             : "transparent",
// //           color: isHoliday ? "#000 !important" : "inherit",
// //           fontWeight: isHoliday ? "bold" : "normal",
// //           "&:hover": {
// //             backgroundColor: isHoliday
// //               ? isHoliday.is_publish === 1
// //                 ? `${HOLIDAY_COLORS.PUBLISHED_HOVER} !important`
// //                 : `${HOLIDAY_COLORS.UNPUBLISHED_HOVER} !important`
// //               : undefined,
// //           },
// //         },
// //       };
// //     },
// //     [holidays]
// //   );

// //   return (
// //     <>
// //       <FormLabel required={required}>{label}</FormLabel>
// //       <DatePicker
// //         {...datePickerProps}
// //         renderInput={(params) => <TextField {...params} fullWidth />}
// //         shouldDisableDate={shouldDisableDate}
// //         slotProps={{
// //           day: getDayProps,
// //         }}
// //       />
// //     </>
// //   );
// // };

// // // ===================================================================================
// // //  COMPONENT 4: ADD LEAVE VIEW (The UI for the form)
// // // ===================================================================================
// // const AddLeaveView = ({ onSave, onHide, submitting, holidays }) => {
// //   const [formData, setFormData] = useState({
// //     leaveTypeId: "",
// //     startDate: null,
// //     endDate: null,
// //     isHalfDay: false,
// //     remarks: "",
// //     leaveReason: "",
// //     selectedFile: null,
// //   });
// //   const [sandwichNotification, setSandwichNotification] = useState("");

// //   const leaveTypes = useLeaveTypes();

// //   const selectedLeaveType = useMemo(
// //     () => leaveTypes.find((lt) => lt.value === formData.leaveTypeId),
// //     [leaveTypes, formData.leaveTypeId]
// //   );

// //   const isPaidLeave = selectedLeaveType?.label === LEAVE_TYPES.PAID;
// //   const isCasualLeave = selectedLeaveType?.label === LEAVE_TYPES.CASUAL;
// //   const isMaternityLeave = selectedLeaveType?.label === LEAVE_TYPES.MATERNITY;
// //   const isMedicalLeave = selectedLeaveType?.label === LEAVE_TYPES.MEDICAL;
// //   const isPaternityLeave = selectedLeaveType?.label === LEAVE_TYPES.PATERNITY;
// //   const hasHalfDayBalance = selectedLeaveType?.balance === 0.5;

// //   const isLeaveTypeSelectedWithNoBalance =
// //     selectedLeaveType && !isMaternityLeave && selectedLeaveType.balance <= 0;

// //   const dateConstraints = useMemo(
// //     () => ({
// //       minDate: startOfDay(new Date()),
// //       minPaidLeaveDate: addDays(new Date(), 8),
// //     }),
// //     []
// //   );

// //   const maxEndDate = useMemo(() => {
// //     if (
// //       !formData.startDate ||
// //       !selectedLeaveType ||
// //       (selectedLeaveType.balance <= 0 && !isMaternityLeave)
// //     ) {
// //       return null;
// //     }

// //     if (isMaternityLeave) {
// //       return addDays(formData.startDate, 181); // 182 days total
// //     }

// //     const balanceInDays = Math.floor(selectedLeaveType.balance);
// //     let finalMaxDate = addDays(formData.startDate, balanceInDays - 1);

// //     let ruleBasedMaxDate = null;
// //     if (isPaidLeave) {
// //       ruleBasedMaxDate = addDays(formData.startDate, 5); // Max 6 days
// //     } else if (isCasualLeave) {
// //       ruleBasedMaxDate = addDays(formData.startDate, 1); // Max 2 days
// //     } else if (isPaternityLeave) {
// //       ruleBasedMaxDate = addDays(formData.startDate, 2); // Max 3 days
// //     }

// //     if (ruleBasedMaxDate && isBefore(ruleBasedMaxDate, finalMaxDate)) {
// //       finalMaxDate = ruleBasedMaxDate;
// //     }

// //     return finalMaxDate;
// //   }, [
// //     formData.startDate,
// //     selectedLeaveType,
// //     isPaidLeave,
// //     isCasualLeave,
// //     isMaternityLeave,
// //     isPaternityLeave,
// //   ]);

// //   // Effect to handle half-day logic
// //   useEffect(() => {
// //     // If half-day is toggled, end date must be same as start date
// //     if (formData.isHalfDay && formData.startDate) {
// //       setFormData((prev) => ({ ...prev, endDate: prev.startDate }));
// //     }
// //     // MODIFIED: If leave type changes, clear half-day unless new type has 0.5 balance.
// //     // Removed Medical Leave from this condition.
// //     if (!isCasualLeave && !isPaidLeave && !hasHalfDayBalance) {
// //       setFormData((prev) => ({ ...prev, isHalfDay: false }));
// //     }
// //   }, [
// //     formData.isHalfDay,
// //     formData.startDate,
// //     isCasualLeave,
// //     isPaidLeave,
// //     hasHalfDayBalance,
// //   ]);

// //   // Effect to automatically handle 0.5 day balance
// //   useEffect(() => {
// //     if (hasHalfDayBalance) {
// //       setFormData((prev) => ({ ...prev, isHalfDay: true }));
// //     }
// //   }, [hasHalfDayBalance]);

// //   // Effect to check for the sandwich rule
// //   useEffect(() => {
// //     const { startDate, endDate } = formData;
// //     const isHoliday = (date, holidayList) => {
// //       if (!holidayList || holidayList.length === 0) return false;
// //       const checkDate = startOfDay(date);
// //       return holidayList.some((h) => {
// //         try {
// //           const holidayStart = startOfDay(parseISO(h.start_date));
// //           const holidayEnd = startOfDay(parseISO(h.end_date));
// //           return isWithinInterval(checkDate, {
// //             start: holidayStart,
// //             end: holidayEnd,
// //           });
// //         } catch (error) {
// //           console.error("Invalid date format in holiday data:", h);
// //           return false;
// //         }
// //       });
// //     };

// //     const checkSandwichRule = () => {
// //       if (
// //         !startDate ||
// //         !endDate ||
// //         !isBefore(startDate, endDate) ||
// //         isMaternityLeave
// //       ) {
// //         setSandwichNotification("");
// //         return;
// //       }
// //       let currentDate = addDays(startDate, 1);
// //       let ruleApplied = false;
// //       while (isBefore(currentDate, endDate)) {
// //         const isWeekendDay = isSaturday(currentDate) || isSunday(currentDate);
// //         const isHolidayDay = isHoliday(currentDate, holidays);
// //         if (isWeekendDay || isHolidayDay) {
// //           ruleApplied = true;
// //           break;
// //         }
// //         currentDate = addDays(currentDate, 1);
// //       }
// //       if (ruleApplied) {
// //         setSandwichNotification(
// //           "Sandwich Rule Applied: Weekends and/or holidays between the selected dates will be counted as part of the leave."
// //         );
// //       } else {
// //         setSandwichNotification("");
// //       }
// //     };
// //     checkSandwichRule();
// //   }, [formData.startDate, formData.endDate, holidays, isMaternityLeave]);

// //   const handleInputChange = useCallback((field, value) => {
// //     setFormData((prev) => {
// //       const newState = { ...prev, [field]: value };
// //       if (field === "leaveTypeId") {
// //         newState.startDate = null;
// //         newState.endDate = null;
// //       }
// //       if (field === "startDate") {
// //         newState.endDate = null;
// //       }
// //       return newState;
// //     });
// //   }, []);

// //   const handleFileChange = useCallback(
// //     (event) => {
// //       if (event.target.files && event.target.files.length > 0) {
// //         const file = event.target.files[0];
// //         const allowedExtensions = ["pdf", "gif", "png", "jpg", "jpeg"];
// //         const fileExtension = file.name.split(".").pop().toLowerCase();
// //         if (!allowedExtensions.includes(fileExtension)) {
// //           alert(
// //             "Invalid file type. Please upload only: pdf, gif, png, jpg, jpeg"
// //           );
// //           event.target.value = null;
// //           return;
// //         }
// //         handleInputChange("selectedFile", file);
// //       }
// //     },
// //     [handleInputChange]
// //   );

// //   const handleReset = useCallback(() => {
// //     setFormData({
// //       leaveTypeId: "",
// //       startDate: null,
// //       endDate: null,
// //       isHalfDay: false,
// //       remarks: "",
// //       leaveReason: "",
// //       selectedFile: null,
// //     });
// //   }, []);

// //   const handleSave = useCallback(() => {
// //     const { leaveTypeId, startDate, endDate, leaveReason, selectedFile } =
// //       formData;
// //     if (!leaveTypeId || !startDate || !endDate || !leaveReason) {
// //       alert("Please fill all required fields.");
// //       return;
// //     }
// //     if (isLeaveTypeSelectedWithNoBalance) {
// //       alert("Cannot apply for leave with zero balance.");
// //       return;
// //     }

// //     if (isMedicalLeave) {
// //       const duration = differenceInCalendarDays(endDate, startDate) + 1;
// //       if (duration > 2 && !selectedFile) {
// //         alert("For Medical Leave exceeding 2 days, an attachment is required.");
// //         return;
// //       }
// //     }

// //     onSave(formData);
// //   }, [formData, onSave, isLeaveTypeSelectedWithNoBalance, isMedicalLeave]);

// //   // MODIFIED: Half-day toggle is now only shown for Casual and Paid leave.
// //   const showHalfDayToggle = isCasualLeave || isPaidLeave;

// //   return (
// //     <Grid container spacing={3}>
// //       <Grid item xs={12} lg={8}>
// //         <Paper sx={{ p: 3, borderRadius: "8px" }} elevation={1}>
// //           <Box
// //             sx={{
// //               display: "flex",
// //               justifyContent: "space-between",
// //               alignItems: "center",
// //               mb: 4,
// //             }}
// //           >
// //             <Typography variant="h6" fontWeight="600">
// //               Add Leave
// //             </Typography>
// //             <Button
// //               variant="contained"
// //               startIcon={<RemoveIcon />}
// //               onClick={onHide}
// //               sx={{ textTransform: "none" }}
// //             >
// //               Hide
// //             </Button>
// //           </Box>

// //           <Grid container spacing={3}>
// //             <Grid item xs={12}>
// //               <FormLabel required>Leave Type</FormLabel>
// //               <FormControl fullWidth>
// //                 <Select
// //                   value={formData.leaveTypeId}
// //                   onChange={(e) =>
// //                     handleInputChange("leaveTypeId", e.target.value)
// //                   }
// //                   displayEmpty
// //                   renderValue={(selected) =>
// //                     selected ? (
// //                       leaveTypes.find((lt) => lt.value === selected)?.label
// //                     ) : (
// //                       <Typography sx={{ color: "text.secondary" }}>
// //                         Leave Type
// //                       </Typography>
// //                     )
// //                   }
// //                 >
// //                   <MenuItem disabled value="">
// //                     <em>Leave Type</em>
// //                   </MenuItem>
// //                   {leaveTypes.map((type) => (
// //                     <MenuItem
// //                       key={type.value}
// //                       value={type.value}
// //                       disabled={
// //                         type.label !== LEAVE_TYPES.MATERNITY &&
// //                         type.balance <= 0
// //                       }
// //                     >
// //                       {`${type.label} (Balance: ${type.balance})`}
// //                     </MenuItem>
// //                   ))}
// //                 </Select>
// //               </FormControl>
// //             </Grid>

// //             <Grid item xs={12} sm={6}>
// //               <HolidayDatePicker
// //                 holidays={holidays}
// //                 label="Start Date"
// //                 required
// //                 value={formData.startDate}
// //                 onChange={(value) => handleInputChange("startDate", value)}
// //                 minDate={
// //                   isPaidLeave
// //                     ? dateConstraints.minPaidLeaveDate
// //                     : dateConstraints.minDate
// //                 }
// //                 disabled={
// //                   !formData.leaveTypeId || isLeaveTypeSelectedWithNoBalance
// //                 }
// //                 shouldDisableDate={(date) => isSunday(date)}
// //               />
// //             </Grid>

// //             <Grid item xs={12} sm={6}>
// //               <HolidayDatePicker
// //                 holidays={holidays}
// //                 label="End Date"
// //                 required
// //                 value={formData.endDate}
// //                 onChange={(value) => handleInputChange("endDate", value)}
// //                 minDate={formData.startDate}
// //                 maxDate={maxEndDate}
// //                 disabled={
// //                   !formData.startDate ||
// //                   isLeaveTypeSelectedWithNoBalance ||
// //                   formData.isHalfDay
// //                 }
// //                 shouldDisableDate={(date) => isSunday(date)}
// //               />
// //             </Grid>

// //             {sandwichNotification && (
// //               <Grid item xs={12}>
// //                 <Paper
// //                   elevation={0}
// //                   sx={{
// //                     p: 1.5,
// //                     mt: 1,
// //                     backgroundColor: "warning.light",
// //                     color: "warning.dark",
// //                     textAlign: "center",
// //                     borderRadius: "4px",
// //                   }}
// //                 >
// //                   <Typography variant="body2" sx={{ fontWeight: 500 }}>
// //                     {sandwichNotification}
// //                   </Typography>
// //                 </Paper>
// //               </Grid>
// //             )}

// //             {showHalfDayToggle && (
// //               <Grid item xs={12}>
// //                 <FormControlLabel
// //                   control={
// //                     <Switch
// //                       checked={formData.isHalfDay}
// //                       onChange={(e) =>
// //                         handleInputChange("isHalfDay", e.target.checked)
// //                       }
// //                       disabled={hasHalfDayBalance}
// //                     />
// //                   }
// //                   label="Half Day"
// //                 />
// //               </Grid>
// //             )}

// //             <Grid item xs={12}>
// //               <FormLabel>Remarks</FormLabel>
// //               <TextField
// //                 fullWidth
// //                 multiline
// //                 rows={3}
// //                 placeholder="Remarks"
// //                 value={formData.remarks}
// //                 onChange={(e) => handleInputChange("remarks", e.target.value)}
// //               />
// //             </Grid>

// //             <Grid item xs={12}>
// //               <FormLabel required>Leave Reason</FormLabel>
// //               <TextField
// //                 fullWidth
// //                 multiline
// //                 rows={3}
// //                 placeholder="Leave Reason"
// //                 value={formData.leaveReason}
// //                 onChange={(e) =>
// //                   handleInputChange("leaveReason", e.target.value)
// //                 }
// //               />
// //             </Grid>
// //           </Grid>

// //           <HolidayLegend />

// //           <Box
// //             sx={{
// //               display: "flex",
// //               justifyContent: "flex-end",
// //               mt: 4,
// //               pt: 3,
// //               borderTop: "1px solid #e0e0e0",
// //             }}
// //           >
// //             <Button
// //               variant="text"
// //               onClick={handleReset}
// //               sx={{
// //                 mr: 2,
// //                 color: "text.primary",
// //                 backgroundColor: "#f5f5f5",
// //                 "&:hover": { backgroundColor: "#e0e0e0" },
// //               }}
// //               disabled={submitting}
// //             >
// //               Reset
// //             </Button>
// //             <Button
// //               variant="contained"
// //               onClick={handleSave}
// //               disabled={submitting || isLeaveTypeSelectedWithNoBalance}
// //             >
// //               {submitting ? <CircularProgress size={24} /> : "Save"}
// //             </Button>
// //           </Box>
// //         </Paper>
// //       </Grid>

// //       <Grid item xs={12} lg={4}>
// //         <Paper sx={{ p: 3, borderRadius: "8px" }} elevation={1}>
// //           <Typography variant="h6" fontWeight="600" sx={{ mb: 2 }}>
// //             Leave Attachment
// //           </Typography>
// //           <FormLabel
// //             required={
// //               isMedicalLeave &&
// //               formData.startDate &&
// //               formData.endDate &&
// //               differenceInCalendarDays(formData.endDate, formData.startDate) +
// //                 1 >
// //                 2
// //             }
// //           >
// //             Attachment
// //           </FormLabel>
// //           <Box sx={{ display: "flex", alignItems: "center" }}>
// //             <Button
// //               variant="outlined"
// //               component="label"
// //               sx={{
// //                 textTransform: "none",
// //                 borderColor: "#e0e0e0",
// //                 color: "text.primary",
// //                 backgroundColor: "white",
// //                 "&:hover": {
// //                   backgroundColor: "#f5f5f5",
// //                   borderColor: "#bdbdbd",
// //                 },
// //               }}
// //             >
// //               Choose file
// //               <input
// //                 type="file"
// //                 hidden
// //                 onChange={handleFileChange}
// //                 accept=".pdf,.gif,.png,.jpg,.jpeg"
// //               />
// //             </Button>
// //             <Typography
// //               variant="body2"
// //               sx={{
// //                 ml: 2,
// //                 color: "text.secondary",
// //                 whiteSpace: "nowrap",
// //                 overflow: "hidden",
// //                 textOverflow: "ellipsis",
// //               }}
// //             >
// //               {formData.selectedFile
// //                 ? formData.selectedFile.name
// //                 : "No file chosen"}
// //             </Typography>
// //           </Box>
// //           <Typography
// //             variant="caption"
// //             color="text.secondary"
// //             sx={{ display: "block", mt: 1 }}
// //           >
// //             Upload files only: pdf,gif,png,jpg,jpeg
// //           </Typography>
// //         </Paper>
// //       </Grid>
// //     </Grid>
// //   );
// // };

// // // ===================================================================================
// // //  COMPONENT 5: MAIN LEAVE MANAGEMENT PAGE
// // // ===================================================================================
// // export default function LeaveManagementLM() {
// //   const [entries, setEntries] = useState("10");
// //   const [searchTerm, setSearchTerm] = useState("");
// //   const [selectedYear, setSelectedYear] = useState(
// //     new Date().getFullYear().toString()
// //   );
// //   const [isAddLeaveOpen, setIsAddLeaveOpen] = useState(false);
// //   const [currentPage, setCurrentPage] = useState(1);
// //   const [submitting, setSubmitting] = useState(false);
// //   const [leaveData, setLeaveData] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);

// //   const { holidays } = useHolidays();

// //   const fetchLeaveList = useCallback(async () => {
// //     setLoading(true);
// //     setError(null);
// //     try {
// //       const employeeId = getEmployeeId();
// //       const accessToken = localStorage.getItem("accessToken");
// //       if (!employeeId || !accessToken)
// //         throw new Error("Authentication details not found.");

// //       const response = await fetch(API_ENDPOINTS.EMPLOYEE_LEAVES(employeeId), {
// //         headers: { Authorization: `Bearer ${accessToken}` },
// //       });
// //       if (!response.ok)
// //         throw new Error(`Error ${response.status}: ${response.statusText}`);

// //       const data = await response.json();
// //       const applications = Array.isArray(data.leave_applications)
// //         ? data.leave_applications
// //         : [];

// //       setLeaveData(
// //         applications
// //           .map((item, index) => ({
// //             id: item.id || index,
// //             employee: item.employee_name,
// //             email: item.email,
// //             leaveType: item.leave_type,
// //             leaveDuration: `${format(
// //               new Date(item.from_date),
// //               "dd/MM/yyyy"
// //             )} To ${format(new Date(item.to_date), "dd/MM/yyyy")}`,
// //             days: `${item.days_applied} Days`,
// //             // MODIFIED: Added a numeric version of days_applied for easy calculation
// //             daysApplied: Number(item.days_applied) || 0,
// //             status: item.status,
// //             appliedOn: new Date(item.from_date),
// //           }))
// //           .reverse()
// //       );
// //     } catch (err) {
// //       setError(err.message);
// //       console.error(err);
// //     } finally {
// //       setLoading(false);
// //     }
// //   }, []);

// //   useEffect(() => {
// //     fetchLeaveList();
// //   }, [fetchLeaveList]);

// //   const handleAddLeaveSubmit = useCallback(
// //     async (newLeaveData) => {
// //       setSubmitting(true);
// //       try {
// //         const employeeId = getEmployeeId();
// //         const accessToken = localStorage.getItem("accessToken");
// //         if (!employeeId || !accessToken)
// //           throw new Error(
// //             "Cannot submit leave. Authentication details are missing."
// //           );

// //         const formData = new FormData();
// //         formData.append("employee_id", employeeId);
// //         formData.append("company_id", 2);
// //         formData.append("leave_type_id", newLeaveData.leaveTypeId);
// //         formData.append(
// //           "from_date",
// //           format(newLeaveData.startDate, "yyyy-MM-dd")
// //         );
// //         formData.append("to_date", format(newLeaveData.endDate, "yyyy-MM-dd"));
// //         formData.append("reason", newLeaveData.leaveReason);
// //         formData.append("remarks", newLeaveData.remarks);
// //         formData.append("is_half_day", newLeaveData.isHalfDay ? 1 : 0);
// //         if (newLeaveData.selectedFile) {
// //           formData.append("leave_attachment", newLeaveData.selectedFile);
// //         }

// //         const response = await fetch(API_ENDPOINTS.APPLY_LEAVE, {
// //           method: "POST",
// //           headers: getAuthHeaders(),
// //           body: formData,
// //         });

// //         if (!response.ok) {
// //           const errorData = await response.json();
// //           throw new Error(
// //             errorData.error ||
// //               `Failed to apply for leave. Status: ${response.status}`
// //           );
// //         }

// //         alert("Leave applied successfully!");
// //         setIsAddLeaveOpen(false);
// //         fetchLeaveList();
// //       } catch (err) {
// //         console.error("Failed to submit leave:", err);
// //         alert(`Error: ${err.message}`);
// //       } finally {
// //         setSubmitting(false);
// //       }
// //     },
// //     [fetchLeaveList]
// //   );

// //   const filteredData = useMemo(() => {
// //     return leaveData
// //       .filter(
// //         (leave) => leave.appliedOn.getFullYear().toString() === selectedYear
// //       )
// //       .filter(
// //         (leave) =>
// //           leave.employee.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //           leave.leaveType.toLowerCase().includes(searchTerm.toLowerCase())
// //       );
// //   }, [leaveData, selectedYear, searchTerm]);

// //   const paginationData = useMemo(() => {
// //     const entriesPerPage = Number.parseInt(entries, 10);
// //     const totalPages = Math.ceil(filteredData.length / entriesPerPage);
// //     const startIndex = (currentPage - 1) * entriesPerPage;
// //     const paginatedData = filteredData.slice(
// //       startIndex,
// //       startIndex + entriesPerPage
// //     );

// //     return { entriesPerPage, totalPages, startIndex, paginatedData };
// //   }, [filteredData, entries, currentPage]);

// //   // MODIFIED: The 'approved' count is now a sum of days_applied for approved leaves.
// //   const leaveStats = useMemo(() => {
// //     const approvedLeaves = leaveData.filter((l) => l.status === "Approved");
// //     const totalDaysTaken = approvedLeaves.reduce(
// //       (sum, leave) => sum + leave.daysApplied,
// //       0
// //     );
// //     return {
// //       approved: totalDaysTaken,
// //       pending: leaveData.filter((l) => l.status === "Pending").length,
// //     };
// //   }, [leaveData]);

// //   return (
// //     <LocalizationProvider dateAdapter={AdapterDateFns}>
// //       <Box sx={{ p: 3, backgroundColor: "#f4f6f8", minHeight: "100vh" }}>
// //         {isAddLeaveOpen ? (
// //           <AddLeaveView
// //             onHide={() => setIsAddLeaveOpen(false)}
// //             onSave={handleAddLeaveSubmit}
// //             submitting={submitting}
// //             holidays={holidays}
// //           />
// //         ) : (
// //           <>
// //             <Typography variant="h4" sx={{ mb: 2 }}>
// //               Leave Request
// //             </Typography>

// //             <Grid container spacing={2} justifyContent="center" sx={{ mb: 2 }}>
// //               <Grid item xs={12} sm={4}>
// //                 <Paper
// //                   sx={{
// //                     p: 2,
// //                     display: "flex",
// //                     flexDirection: "column",
// //                     alignItems: "center",
// //                   }}
// //                 >
// //                   <Typography variant="subtitle2" color="text.secondary">
// //                     LEAVE TAKEN
// //                   </Typography>
// //                   <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
// //                     <Typography variant="h4" color="primary.main">
// //                       {`${leaveStats.approved} `}
// //                     </Typography>
// //                     <QuestionAnswerIcon
// //                       sx={{ ml: 1, color: "text.secondary" }}
// //                     />
// //                   </Box>
// //                 </Paper>
// //               </Grid>
// //             </Grid>

// //             <Box
// //               sx={{
// //                 my: 2,
// //                 display: "flex",
// //                 justifyContent: "space-between",
// //                 alignItems: "center",
// //               }}
// //             >
// //               <FormControl sx={{ minWidth: 120 }}>
// //                 <InputLabel>Year</InputLabel>
// //                 <Select
// //                   value={selectedYear}
// //                   label="Year"
// //                   onChange={(e) => setSelectedYear(e.target.value)}
// //                 >
// //                   <MenuItem value="2025">2025</MenuItem>
// //                   <MenuItem value="2024">2024</MenuItem>
// //                   <MenuItem value="2023">2023</MenuItem>
// //                 </Select>
// //               </FormControl>
// //               <Button
// //                 variant="contained"
// //                 startIcon={<AddIcon />}
// //                 onClick={() => setIsAddLeaveOpen(true)}
// //               >
// //                 Add New Leave
// //               </Button>
// //             </Box>

// //             <Paper sx={{ mt: 2, p: 2 }}>
// //               <Box
// //                 sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
// //               >
// //                 <FormControl
// //                   variant="outlined"
// //                   size="small"
// //                   sx={{ minWidth: 120 }}
// //                 >
// //                   <InputLabel>Show</InputLabel>
// //                   <Select
// //                     value={entries}
// //                     label="Show"
// //                     onChange={(e) => {
// //                       setEntries(e.target.value);
// //                       setCurrentPage(1);
// //                     }}
// //                   >
// //                     <MenuItem value={10}>10</MenuItem>
// //                     <MenuItem value={25}>25</MenuItem>
// //                     <MenuItem value={50}>50</MenuItem>
// //                   </Select>
// //                 </FormControl>
// //                 <TextField
// //                   label="Search"
// //                   variant="outlined"
// //                   size="small"
// //                   value={searchTerm}
// //                   onChange={(e) => {
// //                     setSearchTerm(e.target.value);
// //                     setCurrentPage(1);
// //                   }}
// //                 />
// //               </Box>

// //               {loading ? (
// //                 <Box sx={{ display: "flex", justifyContent: "center", p: 5 }}>
// //                   <CircularProgress />
// //                 </Box>
// //               ) : error ? (
// //                 <Typography color="error" sx={{ textAlign: "center", p: 5 }}>
// //                   {error}
// //                 </Typography>
// //               ) : (
// //                 <TableContainer>
// //                   <Table>
// //                     <TableHead>
// //                       <TableRow sx={{ bgcolor: "#f5f5f5" }}>
// //                         <TableCell>EMPLOYEE</TableCell>
// //                         <TableCell>LEAVE TYPE</TableCell>
// //                         <TableCell>LEAVE DURATION</TableCell>
// //                         <TableCell>DAYS</TableCell>
// //                       </TableRow>
// //                     </TableHead>
// //                     <TableBody>
// //                       {paginationData.paginatedData.length > 0 ? (
// //                         paginationData.paginatedData.map((leave) => (
// //                           <TableRow key={leave.id}>
// //                             <TableCell>
// //                               <Typography variant="body1">
// //                                 {leave.employee}
// //                               </Typography>
// //                               <Typography
// //                                 variant="body2"
// //                                 color="text.secondary"
// //                               >
// //                                 {leave.email}
// //                               </Typography>
// //                             </TableCell>
// //                             <TableCell>{leave.leaveType}</TableCell>
// //                             <TableCell>{leave.leaveDuration}</TableCell>
// //                             <TableCell>{leave.days}</TableCell>
// //                           </TableRow>
// //                         ))
// //                       ) : (
// //                         <TableRow>
// //                           <TableCell colSpan={4} align="center">
// //                             No leave data found for the selected criteria.
// //                           </TableCell>
// //                         </TableRow>
// //                       )}
// //                     </TableBody>
// //                   </Table>
// //                 </TableContainer>
// //               )}

// //               <Box
// //                 sx={{
// //                   display: "flex",
// //                   justifyContent: "space-between",
// //                   alignItems: "center",
// //                   mt: 2,
// //                 }}
// //               >
// //                 <Typography variant="body2">
// //                   Showing{" "}
// //                   {filteredData.length > 0 ? paginationData.startIndex + 1 : 0}{" "}
// //                   to{" "}
// //                   {Math.min(
// //                     paginationData.startIndex + paginationData.entriesPerPage,
// //                     filteredData.length
// //                   )}{" "}
// //                   of {filteredData.length} entries
// //                 </Typography>
// //                 <Box>
// //                   <Button
// //                     variant="outlined"
// //                     sx={{ mr: 1 }}
// //                     disabled={currentPage === 1}
// //                     onClick={() => setCurrentPage((p) => p - 1)}
// //                   >
// //                     Previous
// //                   </Button>
// //                   <Button variant="contained" sx={{ mr: 1, cursor: "default" }}>
// //                     {currentPage}
// //                   </Button>
// //                   <Button
// //                     variant="outlined"
// //                     disabled={currentPage >= paginationData.totalPages}
// //                     onClick={() => setCurrentPage((p) => p + 1)}
// //                   >
// //                     Next
// //                   </Button>
// //                 </Box>
// //               </Box>
// //             </Paper>
// //           </>
// //         )}
// //       </Box>
// //     </LocalizationProvider>
// //   );
// // }

// import { useState, useEffect, useCallback, useMemo } from "react";
// import {
//   Box,
//   Typography,
//   Button,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TextField,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   Grid,
//   Switch,
//   FormControlLabel,
//   CircularProgress,
//   Snackbar, // Added for pop-ups
//   Alert, // Added for pop-ups
// } from "@mui/material";
// import {
//   QuestionAnswer as QuestionAnswerIcon,
//   Add as AddIcon,
//   Remove as RemoveIcon,
// } from "@mui/icons-material";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import {
//   format,
//   addDays,
//   parseISO,
//   isSaturday,
//   isSunday,
//   isBefore,
//   isWithinInterval,
//   startOfDay,
//   differenceInCalendarDays,
// } from "date-fns";

// // ===================================================================================
// //  CONSTANTS
// // ===================================================================================
// const LEAVE_TYPES = {
//   PAID: "Paid Leave",
//   CASUAL: "Casual Leave (CL)",
//   MATERNITY: "Maternity Leave",
//   MEDICAL: "Medical Leave (ML)",
//   PATERNITY: "Paternity Leave",
// };

// const HOLIDAY_COLORS = {
//   PUBLISHED: "#ffeb3b",
//   UNPUBLISHED: "#ff9800",
//   PUBLISHED_HOVER: "#fff176",
//   UNPUBLISHED_HOVER: "#ffb74d",
// };

// const API_ENDPOINTS = {
//   LEAVE_BALANCE: (employeeId) =>
//     `https://tdtlworld.com/hrms-backend/api/leave-balance/?employee_id=${employeeId}`,
//   HOLIDAYS: (employeeId) =>
//     `https://tdtlworld.com/hrms-backend/employee/holidays/${employeeId}/`,
//   EMPLOYEE_LEAVES: (employeeId) =>
//     `https://tdtlworld.com/hrms-backend/api/employee-leaves-list/?employee_id=${employeeId}`,
//   APPLY_LEAVE: "https://tdtlworld.com/hrms-backend/api/apply-leave/",
// };

// // ===================================================================================
// //  UTILITY FUNCTIONS
// // ===================================================================================
// const getAuthHeaders = () => {
//   const accessToken = localStorage.getItem("accessToken");
//   return accessToken ? { Authorization: `Bearer ${accessToken}` } : {};
// };

// const getEmployeeId = () => localStorage.getItem("loggedInUser");

// // ===================================================================================
// //  CUSTOM HOOKS
// // ===================================================================================
// const useLeaveTypes = () => {
//   const [leaveTypes, setLeaveTypes] = useState([]);
//   const EXCLUDED_LEAVE_TYPES = [
//     "Compensatory Off (Comp Off)",
//     "Privilege Leave (PL)",
//     "Privilege Leave",
//   ];

//   useEffect(() => {
//     const fetchLeaveTypes = async () => {
//       const accessToken = localStorage.getItem("accessToken");
//       const employeeId = getEmployeeId();

//       if (!accessToken || !employeeId) {
//         console.warn(
//           "Access Token or Employee ID not found for fetching leave balance."
//         );
//         return;
//       }

//       try {
//         const response = await fetch(API_ENDPOINTS.LEAVE_BALANCE(employeeId), {
//           headers: { Authorization: `Bearer ${accessToken}` },
//         });
//         if (response.ok) {
//           const data = await response.json();
//           const transformedData = data.map((item) => ({
//             value: item.leave_type_id,
//             label: item.category_name,
//             balance: item.balance_leave,
//           }));
//           const filteredData = transformedData.filter(
//             (item) => !EXCLUDED_LEAVE_TYPES.includes(item.label)
//           );
//           setLeaveTypes(filteredData);
//         } else {
//           console.error("Failed to fetch leave balance:", response.statusText);
//         }
//       } catch (error) {
//         console.error("Failed to fetch leave types:", error);
//       }
//     };
//     fetchLeaveTypes();
//   }, []);

//   return leaveTypes;
// };

// const useHolidays = () => {
//   const [holidays, setHolidays] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const fetchHolidays = useCallback(async () => {
//     setLoading(true);
//     try {
//       const employeeId = getEmployeeId();
//       const accessToken = localStorage.getItem("accessToken");

//       if (!employeeId || !accessToken) {
//         console.warn(
//           "Employee ID or access token not found for fetching holidays"
//         );
//         return;
//       }

//       const response = await fetch(API_ENDPOINTS.HOLIDAYS(employeeId), {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//           "Content-Type": "application/json",
//         },
//       });

//       if (response.ok) {
//         const holidayData = await response.json();
//         const holidaysArray = Array.isArray(holidayData)
//           ? holidayData
//           : [holidayData];
//         setHolidays(holidaysArray);
//         console.log("Holidays fetched successfully:", holidaysArray);
//       } else {
//         console.error(
//           "Failed to fetch holidays:",
//           response.status,
//           response.statusText
//         );
//       }
//     } catch (error) {
//       console.error("Error fetching holidays:", error);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchHolidays();
//   }, [fetchHolidays]);

//   return { holidays, loading, refetch: fetchHolidays };
// };

// // ===================================================================================
// //  COMPONENT 1: HELPER FOR FORM LABELS
// // ===================================================================================
// const FormLabel = ({ children, required = false }) => (
//   <Typography
//     component="label"
//     sx={{ display: "block", fontWeight: "500", mb: 1, fontSize: "0.875rem" }}
//   >
//     {children} {required && <span style={{ color: "#f44336" }}>*</span>}
//   </Typography>
// );

// // ===================================================================================
// //  COMPONENT 2: HOLIDAY LEGEND
// // ===================================================================================
// const HolidayLegend = () => (
//   <Box sx={{ mt: 3, p: 2, backgroundColor: "#f9f9f9", borderRadius: "4px" }}>
//     <Typography variant="subtitle2" sx={{ mb: 1 }}>
//       Holiday Legend:
//     </Typography>
//     <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
//       <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//         <Box
//           sx={{
//             width: 16,
//             height: 16,
//             backgroundColor: HOLIDAY_COLORS.PUBLISHED,
//             borderRadius: "2px",
//           }}
//         ></Box>
//         <Typography variant="caption">Published Holidays</Typography>
//       </Box>
//       <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//         <Box
//           sx={{
//             width: 16,
//             height: 16,
//             backgroundColor: HOLIDAY_COLORS.UNPUBLISHED,
//             borderRadius: "2px",
//           }}
//         ></Box>
//         <Typography variant="caption">Unpublished Holidays</Typography>
//       </Box>
//     </Box>
//   </Box>
// );

// // ===================================================================================
// //  COMPONENT 3: CUSTOM DATE PICKER WITH HOLIDAY HIGHLIGHTING
// // ===================================================================================
// const HolidayDatePicker = ({
//   holidays,
//   label,
//   required,
//   shouldDisableDate,
//   ...datePickerProps
// }) => {
//   const getDayProps = useCallback(
//     (ownerState) => {
//       const isHoliday = holidays.find((h) => {
//         try {
//           const startDate = parseISO(h.start_date);
//           const endDate = parseISO(h.end_date);
//           return ownerState.day >= startDate && ownerState.day <= endDate;
//         } catch (e) {
//           return false;
//         }
//       });

//       return {
//         sx: {
//           backgroundColor: isHoliday
//             ? isHoliday.is_publish === 1
//               ? `${HOLIDAY_COLORS.PUBLISHED} !important`
//               : `${HOLIDAY_COLORS.UNPUBLISHED} !important`
//             : "transparent",
//           color: isHoliday ? "#000 !important" : "inherit",
//           fontWeight: isHoliday ? "bold" : "normal",
//           "&:hover": {
//             backgroundColor: isHoliday
//               ? isHoliday.is_publish === 1
//                 ? `${HOLIDAY_COLORS.PUBLISHED_HOVER} !important`
//                 : `${HOLIDAY_COLORS.UNPUBLISHED_HOVER} !important`
//               : undefined,
//           },
//         },
//       };
//     },
//     [holidays]
//   );

//   return (
//     <>
//       <FormLabel required={required}>{label}</FormLabel>
//       <DatePicker
//         {...datePickerProps}
//         renderInput={(params) => <TextField {...params} fullWidth />}
//         shouldDisableDate={shouldDisableDate}
//         slotProps={{
//           day: getDayProps,
//         }}
//       />
//     </>
//   );
// };

// // ===================================================================================
// //  COMPONENT 4: ADD LEAVE VIEW (The UI for the form)
// // ===================================================================================
// const AddLeaveView = ({
//   onSave,
//   onHide,
//   submitting,
//   holidays,
//   showNotification,
// }) => {
//   const [formData, setFormData] = useState({
//     leaveTypeId: "",
//     startDate: null,
//     endDate: null,
//     isHalfDay: false,
//     remarks: "",
//     leaveReason: "",
//     selectedFile: null,
//   });
//   const [sandwichNotification, setSandwichNotification] = useState("");

//   const leaveTypes = useLeaveTypes();

//   const selectedLeaveType = useMemo(
//     () => leaveTypes.find((lt) => lt.value === formData.leaveTypeId),
//     [leaveTypes, formData.leaveTypeId]
//   );

//   const isPaidLeave = selectedLeaveType?.label === LEAVE_TYPES.PAID;
//   const isCasualLeave = selectedLeaveType?.label === LEAVE_TYPES.CASUAL;
//   const isMaternityLeave = selectedLeaveType?.label === LEAVE_TYPES.MATERNITY;
//   const isMedicalLeave = selectedLeaveType?.label === LEAVE_TYPES.MEDICAL;
//   const isPaternityLeave = selectedLeaveType?.label === LEAVE_TYPES.PATERNITY;
//   const hasHalfDayBalance = selectedLeaveType?.balance === 0.5;

//   const isLeaveTypeSelectedWithNoBalance =
//     selectedLeaveType && !isMaternityLeave && selectedLeaveType.balance <= 0;

//   const dateConstraints = useMemo(
//     () => ({
//       minDate: startOfDay(new Date()),
//       minPaidLeaveDate: addDays(new Date(), 8),
//     }),
//     []
//   );

//   const maxEndDate = useMemo(() => {
//     if (
//       !formData.startDate ||
//       !selectedLeaveType ||
//       (selectedLeaveType.balance <= 0 && !isMaternityLeave)
//     ) {
//       return null;
//     }

//     if (isMaternityLeave) {
//       return addDays(formData.startDate, 181); // 182 days total
//     }

//     const balanceInDays = Math.floor(selectedLeaveType.balance);
//     let finalMaxDate = addDays(formData.startDate, balanceInDays - 1);

//     let ruleBasedMaxDate = null;
//     if (isPaidLeave) {
//       ruleBasedMaxDate = addDays(formData.startDate, 5); // Max 6 days
//     } else if (isCasualLeave) {
//       ruleBasedMaxDate = addDays(formData.startDate, 1); // Max 2 days
//     } else if (isPaternityLeave) {
//       ruleBasedMaxDate = addDays(formData.startDate, 2); // Max 3 days
//     }

//     if (ruleBasedMaxDate && isBefore(ruleBasedMaxDate, finalMaxDate)) {
//       finalMaxDate = ruleBasedMaxDate;
//     }

//     return finalMaxDate;
//   }, [
//     formData.startDate,
//     selectedLeaveType,
//     isPaidLeave,
//     isCasualLeave,
//     isMaternityLeave,
//     isPaternityLeave,
//   ]);

//   // Effect to handle half-day logic
//   useEffect(() => {
//     // If half-day is toggled, end date must be same as start date
//     if (formData.isHalfDay && formData.startDate) {
//       setFormData((prev) => ({ ...prev, endDate: prev.startDate }));
//     }
//     // MODIFIED: If leave type changes, clear half-day unless new type has 0.5 balance.
//     // Removed Medical Leave from this condition.
//     if (!isCasualLeave && !isPaidLeave && !hasHalfDayBalance) {
//       setFormData((prev) => ({ ...prev, isHalfDay: false }));
//     }
//   }, [
//     formData.isHalfDay,
//     formData.startDate,
//     isCasualLeave,
//     isPaidLeave,
//     hasHalfDayBalance,
//   ]);

//   // Effect to automatically handle 0.5 day balance
//   useEffect(() => {
//     if (hasHalfDayBalance) {
//       setFormData((prev) => ({ ...prev, isHalfDay: true }));
//     }
//   }, [hasHalfDayBalance]);

//   // Effect to check for the sandwich rule
//   useEffect(() => {
//     const { startDate, endDate } = formData;
//     const isHoliday = (date, holidayList) => {
//       if (!holidayList || holidayList.length === 0) return false;
//       const checkDate = startOfDay(date);
//       return holidayList.some((h) => {
//         try {
//           const holidayStart = startOfDay(parseISO(h.start_date));
//           const holidayEnd = startOfDay(parseISO(h.end_date));
//           return isWithinInterval(checkDate, {
//             start: holidayStart,
//             end: holidayEnd,
//           });
//         } catch (error) {
//           console.error("Invalid date format in holiday data:", h);
//           return false;
//         }
//       });
//     };

//     const checkSandwichRule = () => {
//       if (
//         !startDate ||
//         !endDate ||
//         !isBefore(startDate, endDate) ||
//         isMaternityLeave
//       ) {
//         setSandwichNotification("");
//         return;
//       }
//       let currentDate = addDays(startDate, 1);
//       let ruleApplied = false;
//       while (isBefore(currentDate, endDate)) {
//         const isWeekendDay = isSaturday(currentDate) || isSunday(currentDate);
//         const isHolidayDay = isHoliday(currentDate, holidays);
//         if (isWeekendDay || isHolidayDay) {
//           ruleApplied = true;
//           break;
//         }
//         currentDate = addDays(currentDate, 1);
//       }
//       if (ruleApplied) {
//         setSandwichNotification(
//           "Sandwich Rule Applied: Weekends and/or holidays between the selected dates will be counted as part of the leave."
//         );
//       } else {
//         setSandwichNotification("");
//       }
//     };
//     checkSandwichRule();
//   }, [formData.startDate, formData.endDate, holidays, isMaternityLeave]);

//   const handleInputChange = useCallback((field, value) => {
//     setFormData((prev) => {
//       const newState = { ...prev, [field]: value };
//       if (field === "leaveTypeId") {
//         newState.startDate = null;
//         newState.endDate = null;
//       }
//       if (field === "startDate") {
//         newState.endDate = null;
//       }
//       return newState;
//     });
//   }, []);

//   const handleFileChange = useCallback(
//     (event) => {
//       if (event.target.files && event.target.files.length > 0) {
//         const file = event.target.files[0];
//         const allowedExtensions = ["pdf", "gif", "png", "jpg", "jpeg"];
//         const fileExtension = file.name.split(".").pop().toLowerCase();
//         if (!allowedExtensions.includes(fileExtension)) {
//           showNotification(
//             "Invalid file type. Please upload only: pdf, gif, png, jpg, jpeg",
//             "warning"
//           );
//           event.target.value = null;
//           return;
//         }
//         handleInputChange("selectedFile", file);
//       }
//     },
//     [handleInputChange, showNotification]
//   );

//   const handleReset = useCallback(() => {
//     setFormData({
//       leaveTypeId: "",
//       startDate: null,
//       endDate: null,
//       isHalfDay: false,
//       remarks: "",
//       leaveReason: "",
//       selectedFile: null,
//     });
//   }, []);

//   const handleSave = useCallback(() => {
//     const { leaveTypeId, startDate, endDate, leaveReason, selectedFile } =
//       formData;
//     if (!leaveTypeId || !startDate || !endDate || !leaveReason) {
//       showNotification("Please fill all required fields.", "warning");
//       return;
//     }
//     if (isLeaveTypeSelectedWithNoBalance) {
//       showNotification("Cannot apply for leave with zero balance.", "error");
//       return;
//     }

//     if (isMedicalLeave) {
//       const duration = differenceInCalendarDays(endDate, startDate) + 1;
//       if (duration > 2 && !selectedFile) {
//         showNotification(
//           "For Medical Leave exceeding 2 days, an attachment is required.",
//           "warning"
//         );
//         return;
//       }
//     }

//     onSave(formData);
//   }, [
//     formData,
//     onSave,
//     isLeaveTypeSelectedWithNoBalance,
//     isMedicalLeave,
//     showNotification,
//   ]);

//   const showHalfDayToggle = isCasualLeave || isPaidLeave;

//   return (
//     <Grid container spacing={3}>
//       <Grid item xs={12} lg={8}>
//         <Paper sx={{ p: 3, borderRadius: "8px" }} elevation={1}>
//           <Box
//             sx={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//               mb: 4,
//             }}
//           >
//             <Typography variant="h6" fontWeight="600">
//               Add Leave
//             </Typography>
//             <Button
//               variant="contained"
//               startIcon={<RemoveIcon />}
//               onClick={onHide}
//               sx={{ textTransform: "none" }}
//             >
//               Hide
//             </Button>
//           </Box>

//           <Grid container spacing={3}>
//             <Grid item xs={12}>
//               <FormLabel required>Leave Type</FormLabel>
//               <FormControl fullWidth>
//                 <Select
//                   value={formData.leaveTypeId}
//                   onChange={(e) =>
//                     handleInputChange("leaveTypeId", e.target.value)
//                   }
//                   displayEmpty
//                   renderValue={(selected) =>
//                     selected ? (
//                       leaveTypes.find((lt) => lt.value === selected)?.label
//                     ) : (
//                       <Typography sx={{ color: "text.secondary" }}>
//                         Leave Type
//                       </Typography>
//                     )
//                   }
//                 >
//                   <MenuItem disabled value="">
//                     <em>Leave Type</em>
//                   </MenuItem>
//                   {leaveTypes.map((type) => (
//                     <MenuItem
//                       key={type.value}
//                       value={type.value}
//                       disabled={
//                         type.label !== LEAVE_TYPES.MATERNITY &&
//                         type.balance <= 0
//                       }
//                     >
//                       {`${type.label} (Balance: ${type.balance})`}
//                     </MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>
//             </Grid>

//             <Grid item xs={12} sm={6}>
//               <HolidayDatePicker
//                 holidays={holidays}
//                 label="Start Date"
//                 required
//                 value={formData.startDate}
//                 onChange={(value) => handleInputChange("startDate", value)}
//                 minDate={
//                   isPaidLeave
//                     ? dateConstraints.minPaidLeaveDate
//                     : dateConstraints.minDate
//                 }
//                 disabled={
//                   !formData.leaveTypeId || isLeaveTypeSelectedWithNoBalance
//                 }
//                 shouldDisableDate={(date) => isSunday(date)}
//               />
//             </Grid>

//             <Grid item xs={12} sm={6}>
//               <HolidayDatePicker
//                 holidays={holidays}
//                 label="End Date"
//                 required
//                 value={formData.endDate}
//                 onChange={(value) => handleInputChange("endDate", value)}
//                 minDate={formData.startDate}
//                 maxDate={maxEndDate}
//                 disabled={
//                   !formData.startDate ||
//                   isLeaveTypeSelectedWithNoBalance ||
//                   formData.isHalfDay
//                 }
//                 shouldDisableDate={(date) => isSunday(date)}
//               />
//             </Grid>

//             {sandwichNotification && (
//               <Grid item xs={12}>
//                 {/* MODIFICATION: Sandwich rule notification style changed */}
//                 <Typography
//                   variant="body2"
//                   sx={{
//                     fontStyle: "italic",
//                     textAlign: "center",
//                     mt: 1,
//                     p: 1.5,
//                     border: "1px dashed red", // border in red
//                     borderRadius: "4px",
//                     color: "red", // text in red
//                   }}
//                 >
//                   {sandwichNotification}
//                 </Typography>
//               </Grid>
//             )}

//             {showHalfDayToggle && (
//               <Grid item xs={12}>
//                 <FormControlLabel
//                   control={
//                     <Switch
//                       checked={formData.isHalfDay}
//                       onChange={(e) =>
//                         handleInputChange("isHalfDay", e.target.checked)
//                       }
//                       disabled={hasHalfDayBalance}
//                     />
//                   }
//                   label="Half Day"
//                 />
//               </Grid>
//             )}

//             <Grid item xs={12}>
//               <FormLabel>Remarks</FormLabel>
//               <TextField
//                 fullWidth
//                 multiline
//                 rows={3}
//                 placeholder="Remarks"
//                 value={formData.remarks}
//                 onChange={(e) => handleInputChange("remarks", e.target.value)}
//               />
//             </Grid>

//             <Grid item xs={12}>
//               <FormLabel required>Leave Reason</FormLabel>
//               <TextField
//                 fullWidth
//                 multiline
//                 rows={3}
//                 placeholder="Leave Reason"
//                 value={formData.leaveReason}
//                 onChange={(e) =>
//                   handleInputChange("leaveReason", e.target.value)
//                 }
//               />
//             </Grid>
//           </Grid>

//           <HolidayLegend />

//           <Box
//             sx={{
//               display: "flex",
//               justifyContent: "flex-end",
//               mt: 4,
//               pt: 3,
//               borderTop: "1px solid #e0e0e0",
//             }}
//           >
//             <Button
//               variant="text"
//               onClick={handleReset}
//               sx={{
//                 mr: 2,
//                 color: "text.primary",
//                 backgroundColor: "#f5f5f5",
//                 "&:hover": { backgroundColor: "#e0e0e0" },
//               }}
//               disabled={submitting}
//             >
//               Reset
//             </Button>
//             <Button
//               variant="contained"
//               onClick={handleSave}
//               disabled={submitting || isLeaveTypeSelectedWithNoBalance}
//             >
//               {submitting ? <CircularProgress size={24} /> : "Save"}
//             </Button>
//           </Box>
//         </Paper>
//       </Grid>

//       <Grid item xs={12} lg={4}>
//         <Paper sx={{ p: 3, borderRadius: "8px" }} elevation={1}>
//           <Typography variant="h6" fontWeight="600" sx={{ mb: 2 }}>
//             Leave Attachment
//           </Typography>
//           <FormLabel
//             required={
//               isMedicalLeave &&
//               formData.startDate &&
//               formData.endDate &&
//               differenceInCalendarDays(formData.endDate, formData.startDate) +
//                 1 >
//                 2
//             }
//           >
//             Attachment
//           </FormLabel>
//           <Box sx={{ display: "flex", alignItems: "center" }}>
//             <Button
//               variant="outlined"
//               component="label"
//               sx={{
//                 textTransform: "none",
//                 borderColor: "#e0e0e0",
//                 color: "text.primary",
//                 backgroundColor: "white",
//                 "&:hover": {
//                   backgroundColor: "#f5f5f5",
//                   borderColor: "#bdbdbd",
//                 },
//               }}
//             >
//               Choose file
//               <input
//                 type="file"
//                 hidden
//                 onChange={handleFileChange}
//                 accept=".pdf,.gif,.png,.jpg,.jpeg"
//               />
//             </Button>
//             <Typography
//               variant="body2"
//               sx={{
//                 ml: 2,
//                 color: "text.secondary",
//                 whiteSpace: "nowrap",
//                 overflow: "hidden",
//                 textOverflow: "ellipsis",
//               }}
//             >
//               {formData.selectedFile
//                 ? formData.selectedFile.name
//                 : "No file chosen"}
//             </Typography>
//           </Box>
//           <Typography
//             variant="caption"
//             color="text.secondary"
//             sx={{ display: "block", mt: 1 }}
//           >
//             Upload files only: pdf,gif,png,jpg,jpeg
//           </Typography>
//         </Paper>
//       </Grid>
//     </Grid>
//   );
// };

// // ===================================================================================
// //  COMPONENT 5: MAIN LEAVE MANAGEMENT PAGE
// // ===================================================================================
// export default function LeaveManagementLM() {
//   const [entries, setEntries] = useState("10");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedYear, setSelectedYear] = useState(
//     new Date().getFullYear().toString()
//   );
//   const [isAddLeaveOpen, setIsAddLeaveOpen] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [submitting, setSubmitting] = useState(false);
//   const [leaveData, setLeaveData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [notification, setNotification] = useState({
//     open: false,
//     message: "",
//     severity: "info",
//   });

//   const { holidays } = useHolidays();

//   const showNotification = (message, severity = "info") => {
//     setNotification({ open: true, message, severity });
//   };

//   const handleNotificationClose = (event, reason) => {
//     if (reason === "clickaway") {
//       return;
//     }
//     setNotification({ ...notification, open: false });
//   };

//   const fetchLeaveList = useCallback(async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const employeeId = getEmployeeId();
//       const accessToken = localStorage.getItem("accessToken");
//       if (!employeeId || !accessToken)
//         throw new Error("Authentication details not found.");

//       const response = await fetch(API_ENDPOINTS.EMPLOYEE_LEAVES(employeeId), {
//         headers: { Authorization: `Bearer ${accessToken}` },
//       });
//       if (!response.ok)
//         throw new Error(`Error ${response.status}: ${response.statusText}`);

//       const data = await response.json();
//       const applications = Array.isArray(data.leave_applications)
//         ? data.leave_applications
//         : [];

//       setLeaveData(
//         applications
//           .map((item, index) => ({
//             id: item.id || index,
//             employee: item.employee_name,
//             email: item.email,
//             leaveType: item.leave_type,
//             leaveDuration: `${format(
//               new Date(item.from_date),
//               "dd/MM/yyyy"
//             )} To ${format(new Date(item.to_date), "dd/MM/yyyy")}`,
//             days: `${item.days_applied} Days`,
//             daysApplied: Number(item.days_applied) || 0,
//             status: item.status,
//             appliedOn: new Date(item.from_date),
//           }))
//           // MODIFICATION 1: Sort by from_date (appliedOn) in descending order
//           .sort((a, b) => b.appliedOn - a.appliedOn)
//       );
//     } catch (err) {
//       setError(err.message);
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchLeaveList();
//   }, [fetchLeaveList]);

//   const handleAddLeaveSubmit = useCallback(
//     async (newLeaveData) => {
//       setSubmitting(true);
//       try {
//         const employeeId = getEmployeeId();
//         const accessToken = localStorage.getItem("accessToken");
//         if (!employeeId || !accessToken)
//           throw new Error(
//             "Cannot submit leave. Authentication details are missing."
//           );

//         const formData = new FormData();
//         formData.append("employee_id", employeeId);
//         formData.append("company_id", 2);
//         formData.append("leave_type_id", newLeaveData.leaveTypeId);
//         formData.append(
//           "from_date",
//           format(newLeaveData.startDate, "yyyy-MM-dd")
//         );
//         formData.append("to_date", format(newLeaveData.endDate, "yyyy-MM-dd"));
//         formData.append("reason", newLeaveData.leaveReason);
//         formData.append("remarks", newLeaveData.remarks);

//         if (newLeaveData.isHalfDay) {
//           formData.append("is_half_day", 1);
//         }

//         if (newLeaveData.selectedFile) {
//           formData.append("leave_attachment", newLeaveData.selectedFile);
//         }

//         const response = await fetch(API_ENDPOINTS.APPLY_LEAVE, {
//           method: "POST",
//           headers: getAuthHeaders(),
//           body: formData,
//         });

//         if (!response.ok) {
//           const errorData = await response.json();
//           throw new Error(
//             errorData.error ||
//               `Failed to apply for leave. Status: ${response.status}`
//           );
//         }
//         showNotification("Leave applied successfully!", "success");
//         setIsAddLeaveOpen(false);
//         fetchLeaveList();
//       } catch (err) {
//         console.error("Failed to submit leave:", err);
//         showNotification(`Error: ${err.message}`, "error");
//       } finally {
//         setSubmitting(false);
//       }
//     },
//     [fetchLeaveList]
//   );

//   const filteredData = useMemo(() => {
//     return leaveData
//       .filter(
//         (leave) => leave.appliedOn.getFullYear().toString() === selectedYear
//       )
//       .filter(
//         (leave) =>
//           // MODIFICATION 3: Added leaveDuration to the search condition
//           leave.employee.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           leave.leaveType.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           leave.leaveDuration.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//   }, [leaveData, selectedYear, searchTerm]);

//   const paginationData = useMemo(() => {
//     const entriesPerPage = Number.parseInt(entries, 10);
//     const totalPages = Math.ceil(filteredData.length / entriesPerPage);
//     const startIndex = (currentPage - 1) * entriesPerPage;
//     const paginatedData = filteredData.slice(
//       startIndex,
//       startIndex + entriesPerPage
//     );

//     return { entriesPerPage, totalPages, startIndex, paginatedData };
//   }, [filteredData, entries, currentPage]);

//   const leaveStats = useMemo(() => {
//     const approvedLeaves = leaveData.filter((l) => l.status === "Approved");
//     const totalDaysTaken = approvedLeaves.reduce(
//       (sum, leave) => sum + leave.daysApplied,
//       0
//     );
//     return {
//       approved: totalDaysTaken,
//       pending: leaveData.filter((l) => l.status === "Pending").length,
//     };
//   }, [leaveData]);

//   return (
//     <LocalizationProvider dateAdapter={AdapterDateFns}>
//       <Box sx={{ p: 3, backgroundColor: "#f4f6f8", minHeight: "100vh" }}>
//         <Snackbar
//           open={notification.open}
//           autoHideDuration={6000}
//           onClose={handleNotificationClose}
//           anchorOrigin={{ vertical: "top", horizontal: "center" }}
//         >
//           <Alert
//             onClose={handleNotificationClose}
//             severity={notification.severity}
//             sx={{ width: "100%" }}
//           >
//             {notification.message}
//           </Alert>
//         </Snackbar>

//         {isAddLeaveOpen ? (
//           <AddLeaveView
//             onHide={() => setIsAddLeaveOpen(false)}
//             onSave={handleAddLeaveSubmit}
//             submitting={submitting}
//             holidays={holidays}
//             showNotification={showNotification}
//           />
//         ) : (
//           <>
//             <Typography variant="h4" sx={{ mb: 2 }}>
//               Leave Request
//             </Typography>

//             <Grid container spacing={2} justifyContent="center" sx={{ mb: 2 }}>
//               <Grid item xs={12} sm={4}>
//                 <Paper
//                   sx={{
//                     p: 2,
//                     display: "flex",
//                     flexDirection: "column",
//                     alignItems: "center",
//                   }}
//                 >
//                   <Typography variant="subtitle2" color="text.secondary">
//                     LEAVE TAKEN
//                   </Typography>
//                   <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
//                     <Typography variant="h4" color="primary.main">
//                       {`${leaveStats.approved} `}
//                     </Typography>
//                     <QuestionAnswerIcon
//                       sx={{ ml: 1, color: "text.secondary" }}
//                     />
//                   </Box>
//                 </Paper>
//               </Grid>
//             </Grid>

//             <Box
//               sx={{
//                 my: 2,
//                 display: "flex",
//                 justifyContent: "space-between",
//                 alignItems: "center",
//               }}
//             >
//               <FormControl sx={{ minWidth: 120 }}>
//                 <InputLabel>Year</InputLabel>
//                 <Select
//                   value={selectedYear}
//                   label="Year"
//                   onChange={(e) => setSelectedYear(e.target.value)}
//                 >
//                   <MenuItem value="2025">2025</MenuItem>
//                   <MenuItem value="2024">2024</MenuItem>
//                   <MenuItem value="2023">2023</MenuItem>
//                 </Select>
//               </FormControl>
//               <Button
//                 variant="contained"
//                 startIcon={<AddIcon />}
//                 onClick={() => setIsAddLeaveOpen(true)}
//               >
//                 Add New Leave
//               </Button>
//             </Box>

//             <Paper sx={{ mt: 2, p: 2 }}>
//               <Box
//                 sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
//               >
//                 <FormControl
//                   variant="outlined"
//                   size="small"
//                   sx={{ minWidth: 120 }}
//                 >
//                   <InputLabel>Show</InputLabel>
//                   <Select
//                     value={entries}
//                     label="Show"
//                     onChange={(e) => {
//                       setEntries(e.target.value);
//                       setCurrentPage(1);
//                     }}
//                   >
//                     <MenuItem value={10}>10</MenuItem>
//                     <MenuItem value={25}>25</MenuItem>
//                     <MenuItem value={50}>50</MenuItem>
//                   </Select>
//                 </FormControl>
//                 <TextField
//                   label="Search"
//                   variant="outlined"
//                   size="small"
//                   value={searchTerm}
//                   onChange={(e) => {
//                     setSearchTerm(e.target.value);
//                     setCurrentPage(1);
//                   }}
//                 />
//               </Box>

//               {loading ? (
//                 <Box sx={{ display: "flex", justifyContent: "center", p: 5 }}>
//                   <CircularProgress />
//                 </Box>
//               ) : error ? (
//                 <Typography color="error" sx={{ textAlign: "center", p: 5 }}>
//                   {error}
//                 </Typography>
//               ) : (
//                 <TableContainer>
//                   <Table>
//                     <TableHead>
//                       <TableRow sx={{ bgcolor: "#f5f5f5" }}>
//                         {/* MODIFICATION 2: Added Serial No. column header */}
//                         <TableCell>S.NO.</TableCell>
//                         <TableCell>EMPLOYEE</TableCell>
//                         <TableCell>LEAVE TYPE</TableCell>
//                         <TableCell>LEAVE DURATION</TableCell>
//                         <TableCell>DAYS</TableCell>
//                       </TableRow>
//                     </TableHead>
//                     <TableBody>
//                       {paginationData.paginatedData.length > 0 ? (
//                         paginationData.paginatedData.map((leave, index) => (
//                           <TableRow key={leave.id}>
//                             {/* MODIFICATION 2: Added Serial No. cell */}
//                             <TableCell>
//                               {paginationData.startIndex + index + 1}
//                             </TableCell>
//                             <TableCell>
//                               <Typography variant="body1">
//                                 {leave.employee}
//                               </Typography>
//                               <Typography
//                                 variant="body2"
//                                 color="text.secondary"
//                               >
//                                 {leave.email}
//                               </Typography>
//                             </TableCell>
//                             <TableCell>{leave.leaveType}</TableCell>
//                             <TableCell>{leave.leaveDuration}</TableCell>
//                             <TableCell>{leave.days}</TableCell>
//                           </TableRow>
//                         ))
//                       ) : (
//                         <TableRow>
//                           {/* MODIFICATION 2: Updated colSpan */}
//                           <TableCell colSpan={5} align="center">
//                             No leave data found for the selected criteria.
//                           </TableCell>
//                         </TableRow>
//                       )}
//                     </TableBody>
//                   </Table>
//                 </TableContainer>
//               )}

//               <Box
//                 sx={{
//                   display: "flex",
//                   justifyContent: "space-between",
//                   alignItems: "center",
//                   mt: 2,
//                 }}
//               >
//                 <Typography variant="body2">
//                   Showing{" "}
//                   {filteredData.length > 0 ? paginationData.startIndex + 1 : 0}{" "}
//                   to{" "}
//                   {Math.min(
//                     paginationData.startIndex + paginationData.entriesPerPage,
//                     filteredData.length
//                   )}{" "}
//                   of {filteredData.length} entries
//                 </Typography>
//                 <Box>
//                   <Button
//                     variant="outlined"
//                     sx={{ mr: 1 }}
//                     disabled={currentPage === 1}
//                     onClick={() => setCurrentPage((p) => p - 1)}
//                   >
//                     Previous
//                   </Button>
//                   <Button variant="contained" sx={{ mr: 1, cursor: "default" }}>
//                     {currentPage}
//                   </Button>
//                   <Button
//                     variant="outlined"
//                     disabled={currentPage >= paginationData.totalPages}
//                     onClick={() => setCurrentPage((p) => p + 1)}
//                   >
//                     Next
//                   </Button>
//                 </Box>
//               </Box>
//             </Paper>
//           </>
//         )}
//       </Box>
//     </LocalizationProvider>
//   );
// }



// import { useState, useEffect, useCallback, useMemo } from "react";
// import {
//   Box,
//   Typography,
//   Button,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TextField,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   Grid,
//   Switch,
//   FormControlLabel,
//   CircularProgress,
//   Snackbar, // Added for pop-ups
//   Alert, // Added for pop-ups
// } from "@mui/material";
// import {
//   QuestionAnswer as QuestionAnswerIcon,
//   Add as AddIcon,
//   Remove as RemoveIcon,
// } from "@mui/icons-material";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import {
//   format,
//   addDays,
//   parseISO,
//   isSaturday,
//   isSunday,
//   isBefore,
//   isWithinInterval,
//   startOfDay,
//   differenceInCalendarDays,
// } from "date-fns";

// // ===================================================================================
// //  CONSTANTS
// // ===================================================================================
// const LEAVE_TYPES = {
//   PAID: "Paid Leave",
//   CASUAL: "Casual Leave (CL)",
//   MATERNITY: "Maternity Leave",
//   MEDICAL: "Medical Leave (ML)",
//   PATERNITY: "Paternity Leave",
// };

// const HOLIDAY_COLORS = {
//   PUBLISHED: "#ffeb3b",
//   UNPUBLISHED: "#ff9800",
//   PUBLISHED_HOVER: "#fff176",
//   UNPUBLISHED_HOVER: "#ffb74d",
// };

// const API_ENDPOINTS = {
//   LEAVE_BALANCE: (employeeId) =>
//     `https://tdtlworld.com/hrms-backend/api/leave-balance/?employee_id=${employeeId}`,
//   HOLIDAYS: (employeeId) =>
//     `https://tdtlworld.com/hrms-backend/employee/holidays/${employeeId}/`,
//   // ====================== CHANGE 1: API URL UPDATED ======================
//   EMPLOYEE_LEAVES: (employeeId) =>
//     `https://tdtlworld.com/hrms-backend/api/apply-leave/?employee_id=${employeeId}`,
//   APPLY_LEAVE: "https://tdtlworld.com/hrms-backend/api/apply-leave/",
// };

// // ===================================================================================
// //  UTILITY FUNCTIONS
// // ===================================================================================
// const getAuthHeaders = () => {
//   const accessToken = localStorage.getItem("accessToken");
//   return accessToken ? { Authorization: `Bearer ${accessToken}` } : {};
// };

// const getEmployeeId = () => localStorage.getItem("loggedInUser");

// // ===================================================================================
// //  CUSTOM HOOKS
// // ===================================================================================
// const useLeaveTypes = () => {
//   const [leaveTypes, setLeaveTypes] = useState([]);
//   const EXCLUDED_LEAVE_TYPES = [
//     "Compensatory Off (Comp Off)",
//     "Privilege Leave (PL)",
//     "Privilege Leave",
//   ];

//   useEffect(() => {
//     const fetchLeaveTypes = async () => {
//       const accessToken = localStorage.getItem("accessToken");
//       const employeeId = getEmployeeId();

//       if (!accessToken || !employeeId) {
//         console.warn(
//           "Access Token or Employee ID not found for fetching leave balance."
//         );
//         return;
//       }

//       try {
//         const response = await fetch(API_ENDPOINTS.LEAVE_BALANCE(employeeId), {
//           headers: { Authorization: `Bearer ${accessToken}` },
//         });
//         if (response.ok) {
//           const data = await response.json();
//           const transformedData = data.map((item) => ({
//             value: item.leave_type_id,
//             label: item.category_name,
//             balance: item.balance_leave,
//           }));
//           const filteredData = transformedData.filter(
//             (item) => !EXCLUDED_LEAVE_TYPES.includes(item.label)
//           );
//           setLeaveTypes(filteredData);
//         } else {
//           console.error("Failed to fetch leave balance:", response.statusText);
//         }
//       } catch (error) {
//         console.error("Failed to fetch leave types:", error);
//       }
//     };
//     fetchLeaveTypes();
//   }, []);

//   return leaveTypes;
// };

// const useHolidays = () => {
//   const [holidays, setHolidays] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const fetchHolidays = useCallback(async () => {
//     setLoading(true);
//     try {
//       const employeeId = getEmployeeId();
//       const accessToken = localStorage.getItem("accessToken");

//       if (!employeeId || !accessToken) {
//         console.warn(
//           "Employee ID or access token not found for fetching holidays"
//         );
//         return;
//       }

//       const response = await fetch(API_ENDPOINTS.HOLIDAYS(employeeId), {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//           "Content-Type": "application/json",
//         },
//       });

//       if (response.ok) {
//         const holidayData = await response.json();
//         const holidaysArray = Array.isArray(holidayData)
//           ? holidayData
//           : [holidayData];
//         setHolidays(holidaysArray);
//         console.log("Holidays fetched successfully:", holidaysArray);
//       } else {
//         console.error(
//           "Failed to fetch holidays:",
//           response.status,
//           response.statusText
//         );
//       }
//     } catch (error) {
//       console.error("Error fetching holidays:", error);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchHolidays();
//   }, [fetchHolidays]);

//   return { holidays, loading, refetch: fetchHolidays };
// };

// // ===================================================================================
// //  COMPONENT 1: HELPER FOR FORM LABELS
// // ===================================================================================
// const FormLabel = ({ children, required = false }) => (
//   <Typography
//     component="label"
//     sx={{ display: "block", fontWeight: "500", mb: 1, fontSize: "0.875rem" }}
//   >
//     {children} {required && <span style={{ color: "#f44336" }}>*</span>}
//   </Typography>
// );

// // ===================================================================================
// //  COMPONENT 2: HOLIDAY LEGEND
// // ===================================================================================
// const HolidayLegend = () => (
//   <Box sx={{ mt: 3, p: 2, backgroundColor: "#f9f9f9", borderRadius: "4px" }}>
//     <Typography variant="subtitle2" sx={{ mb: 1 }}>
//       Holiday Legend:
//     </Typography>
//     <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
//       <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//         <Box
//           sx={{
//             width: 16,
//             height: 16,
//             backgroundColor: HOLIDAY_COLORS.PUBLISHED,
//             borderRadius: "2px",
//           }}
//         ></Box>
//         <Typography variant="caption">Published Holidays</Typography>
//       </Box>
//       <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//         <Box
//           sx={{
//             width: 16,
//             height: 16,
//             backgroundColor: HOLIDAY_COLORS.UNPUBLISHED,
//             borderRadius: "2px",
//           }}
//         ></Box>
//         <Typography variant="caption">Unpublished Holidays</Typography>
//       </Box>
//     </Box>
//   </Box>
// );

// // ===================================================================================
// //  COMPONENT 3: CUSTOM DATE PICKER WITH HOLIDAY HIGHLIGHTING
// // ===================================================================================
// const HolidayDatePicker = ({
//   holidays,
//   label,
//   required,
//   shouldDisableDate,
//   ...datePickerProps
// }) => {
//   const getDayProps = useCallback(
//     (ownerState) => {
//       const isHoliday = holidays.find((h) => {
//         try {
//           const startDate = parseISO(h.start_date);
//           const endDate = parseISO(h.end_date);
//           return ownerState.day >= startDate && ownerState.day <= endDate;
//         } catch (e) {
//           return false;
//         }
//       });

//       return {
//         sx: {
//           backgroundColor: isHoliday
//             ? isHoliday.is_publish === 1
//               ? `${HOLIDAY_COLORS.PUBLISHED} !important`
//               : `${HOLIDAY_COLORS.UNPUBLISHED} !important`
//             : "transparent",
//           color: isHoliday ? "#000 !important" : "inherit",
//           fontWeight: isHoliday ? "bold" : "normal",
//           "&:hover": {
//             backgroundColor: isHoliday
//               ? isHoliday.is_publish === 1
//                 ? `${HOLIDAY_COLORS.PUBLISHED_HOVER} !important`
//                 : `${HOLIDAY_COLORS.UNPUBLISHED_HOVER} !important`
//               : undefined,
//           },
//         },
//       };
//     },
//     [holidays]
//   );

//   return (
//     <>
//       <FormLabel required={required}>{label}</FormLabel>
//       <DatePicker
//         {...datePickerProps}
//         renderInput={(params) => <TextField {...params} fullWidth />}
//         shouldDisableDate={shouldDisableDate}
//         slotProps={{
//           day: getDayProps,
//         }}
//       />
//     </>
//   );
// };

// // ===================================================================================
// //  COMPONENT 4: ADD LEAVE VIEW (The UI for the form)
// // ===================================================================================
// const AddLeaveView = ({
//   onSave,
//   onHide,
//   submitting,
//   holidays,
//   showNotification,
// }) => {
//   const [formData, setFormData] = useState({
//     leaveTypeId: "",
//     startDate: null,
//     endDate: null,
//     isHalfDay: false,
//     remarks: "",
//     leaveReason: "",
//     selectedFile: null,
//   });
//   const [sandwichNotification, setSandwichNotification] = useState("");

//   const leaveTypes = useLeaveTypes();

//   const selectedLeaveType = useMemo(
//     () => leaveTypes.find((lt) => lt.value === formData.leaveTypeId),
//     [leaveTypes, formData.leaveTypeId]
//   );

//   const isPaidLeave = selectedLeaveType?.label === LEAVE_TYPES.PAID;
//   const isCasualLeave = selectedLeaveType?.label === LEAVE_TYPES.CASUAL;
//   const isMaternityLeave = selectedLeaveType?.label === LEAVE_TYPES.MATERNITY;
//   const isMedicalLeave = selectedLeaveType?.label === LEAVE_TYPES.MEDICAL;
//   const isPaternityLeave = selectedLeaveType?.label === LEAVE_TYPES.PATERNITY;
//   const hasHalfDayBalance = selectedLeaveType?.balance === 0.5;

//   const isLeaveTypeSelectedWithNoBalance =
//     selectedLeaveType && !isMaternityLeave && selectedLeaveType.balance <= 0;

//   const dateConstraints = useMemo(
//     () => ({
//       minDate: startOfDay(new Date()),
//       minPaidLeaveDate: addDays(new Date(), 8),
//     }),
//     []
//   );

//   const maxEndDate = useMemo(() => {
//     if (
//       !formData.startDate ||
//       !selectedLeaveType ||
//       (selectedLeaveType.balance <= 0 && !isMaternityLeave)
//     ) {
//       return null;
//     }

//     if (isMaternityLeave) {
//       return addDays(formData.startDate, 181); // 182 days total
//     }

//     const balanceInDays = Math.floor(selectedLeaveType.balance);
//     let finalMaxDate = addDays(formData.startDate, balanceInDays - 1);

//     let ruleBasedMaxDate = null;
//     if (isPaidLeave) {
//       ruleBasedMaxDate = addDays(formData.startDate, 5); // Max 6 days
//     } else if (isCasualLeave) {
//       ruleBasedMaxDate = addDays(formData.startDate, 1); // Max 2 days
//     } else if (isPaternityLeave) {
//       ruleBasedMaxDate = addDays(formData.startDate, 2); // Max 3 days
//     }

//     if (ruleBasedMaxDate && isBefore(ruleBasedMaxDate, finalMaxDate)) {
//       finalMaxDate = ruleBasedMaxDate;
//     }

//     return finalMaxDate;
//   }, [
//     formData.startDate,
//     selectedLeaveType,
//     isPaidLeave,
//     isCasualLeave,
//     isMaternityLeave,
//     isPaternityLeave,
//   ]);

//   // Effect to handle half-day logic
//   useEffect(() => {
//     // If half-day is toggled, end date must be same as start date
//     if (formData.isHalfDay && formData.startDate) {
//       setFormData((prev) => ({ ...prev, endDate: prev.startDate }));
//     }
//     // MODIFIED: If leave type changes, clear half-day unless new type has 0.5 balance.
//     // Removed Medical Leave from this condition.
//     if (!isCasualLeave && !isPaidLeave && !hasHalfDayBalance) {
//       setFormData((prev) => ({ ...prev, isHalfDay: false }));
//     }
//   }, [
//     formData.isHalfDay,
//     formData.startDate,
//     isCasualLeave,
//     isPaidLeave,
//     hasHalfDayBalance,
//   ]);

//   // Effect to automatically handle 0.5 day balance
//   useEffect(() => {
//     if (hasHalfDayBalance) {
//       setFormData((prev) => ({ ...prev, isHalfDay: true }));
//     }
//   }, [hasHalfDayBalance]);

//   // Effect to check for the sandwich rule
//   useEffect(() => {
//     const { startDate, endDate } = formData;
//     const isHoliday = (date, holidayList) => {
//       if (!holidayList || holidayList.length === 0) return false;
//       const checkDate = startOfDay(date);
//       return holidayList.some((h) => {
//         try {
//           const holidayStart = startOfDay(parseISO(h.start_date));
//           const holidayEnd = startOfDay(parseISO(h.end_date));
//           return isWithinInterval(checkDate, {
//             start: holidayStart,
//             end: holidayEnd,
//           });
//         } catch (error) {
//           console.error("Invalid date format in holiday data:", h);
//           return false;
//         }
//       });
//     };

//     const checkSandwichRule = () => {
//       if (
//         !startDate ||
//         !endDate ||
//         !isBefore(startDate, endDate) ||
//         isMaternityLeave
//       ) {
//         setSandwichNotification("");
//         return;
//       }
//       let currentDate = addDays(startDate, 1);
//       let ruleApplied = false;
//       while (isBefore(currentDate, endDate)) {
//         const isWeekendDay = isSaturday(currentDate) || isSunday(currentDate);
//         const isHolidayDay = isHoliday(currentDate, holidays);
//         if (isWeekendDay || isHolidayDay) {
//           ruleApplied = true;
//           break;
//         }
//         currentDate = addDays(currentDate, 1);
//       }
//       if (ruleApplied) {
//         setSandwichNotification(
//           "Sandwich Rule Applied: Weekends and/or holidays between the selected dates will be counted as part of the leave."
//         );
//       } else {
//         setSandwichNotification("");
//       }
//     };
//     checkSandwichRule();
//   }, [formData.startDate, formData.endDate, holidays, isMaternityLeave]);

//   const handleInputChange = useCallback((field, value) => {
//     setFormData((prev) => {
//       const newState = { ...prev, [field]: value };
//       if (field === "leaveTypeId") {
//         newState.startDate = null;
//         newState.endDate = null;
//       }
//       if (field === "startDate") {
//         newState.endDate = null;
//       }
//       return newState;
//     });
//   }, []);

//   const handleFileChange = useCallback(
//     (event) => {
//       if (event.target.files && event.target.files.length > 0) {
//         const file = event.target.files[0];
//         const allowedExtensions = ["pdf", "gif", "png", "jpg", "jpeg"];
//         const fileExtension = file.name.split(".").pop().toLowerCase();
//         if (!allowedExtensions.includes(fileExtension)) {
//           showNotification(
//             "Invalid file type. Please upload only: pdf, gif, png, jpg, jpeg",
//             "warning"
//           );
//           event.target.value = null;
//           return;
//         }
//         handleInputChange("selectedFile", file);
//       }
//     },
//     [handleInputChange, showNotification]
//   );

//   const handleReset = useCallback(() => {
//     setFormData({
//       leaveTypeId: "",
//       startDate: null,
//       endDate: null,
//       isHalfDay: false,
//       remarks: "",
//       leaveReason: "",
//       selectedFile: null,
//     });
//   }, []);

//   const handleSave = useCallback(() => {
//     const { leaveTypeId, startDate, endDate, leaveReason, selectedFile } =
//       formData;
//     if (!leaveTypeId || !startDate || !endDate || !leaveReason) {
//       showNotification("Please fill all required fields.", "warning");
//       return;
//     }
//     if (isLeaveTypeSelectedWithNoBalance) {
//       showNotification("Cannot apply for leave with zero balance.", "error");
//       return;
//     }

//     if (isMedicalLeave) {
//       const duration = differenceInCalendarDays(endDate, startDate) + 1;
//       if (duration > 2 && !selectedFile) {
//         showNotification(
//           "For Medical Leave exceeding 2 days, an attachment is required.",
//           "warning"
//         );
//         return;
//       }
//     }

//     onSave(formData);
//   }, [
//     formData,
//     onSave,
//     isLeaveTypeSelectedWithNoBalance,
//     isMedicalLeave,
//     showNotification,
//   ]);

//   const showHalfDayToggle = isCasualLeave || isPaidLeave;

//   return (
//     <Grid container spacing={3}>
//       <Grid item xs={12} lg={8}>
//         <Paper sx={{ p: 3, borderRadius: "8px" }} elevation={1}>
//           <Box
//             sx={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//               mb: 4,
//             }}
//           >
//             <Typography variant="h6" fontWeight="600">
//               Add Leave
//             </Typography>
//             <Button
//               variant="contained"
//               startIcon={<RemoveIcon />}
//               onClick={onHide}
//               sx={{ textTransform: "none" }}
//             >
//               Hide
//             </Button>
//           </Box>

//           <Grid container spacing={3}>
//             <Grid item xs={12}>
//               <FormLabel required>Leave Type</FormLabel>
//               <FormControl fullWidth>
//                 <Select
//                   value={formData.leaveTypeId}
//                   onChange={(e) =>
//                     handleInputChange("leaveTypeId", e.target.value)
//                   }
//                   displayEmpty
//                   renderValue={(selected) =>
//                     selected ? (
//                       leaveTypes.find((lt) => lt.value === selected)?.label
//                     ) : (
//                       <Typography sx={{ color: "text.secondary" }}>
//                         Leave Type
//                       </Typography>
//                     )
//                   }
//                 >
//                   <MenuItem disabled value="">
//                     <em>Leave Type</em>
//                   </MenuItem>
//                   {leaveTypes.map((type) => (
//                     <MenuItem
//                       key={type.value}
//                       value={type.value}
//                       disabled={
//                         type.label !== LEAVE_TYPES.MATERNITY &&
//                         type.balance <= 0
//                       }
//                     >
//                       {`${type.label} (Balance: ${type.balance})`}
//                     </MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>
//             </Grid>

//             <Grid item xs={12} sm={6}>
//               <HolidayDatePicker
//                 holidays={holidays}
//                 label="Start Date"
//                 required
//                 value={formData.startDate}
//                 onChange={(value) => handleInputChange("startDate", value)}
//                 minDate={
//                   isPaidLeave
//                     ? dateConstraints.minPaidLeaveDate
//                     : dateConstraints.minDate
//                 }
//                 disabled={
//                   !formData.leaveTypeId || isLeaveTypeSelectedWithNoBalance
//                 }
//                 shouldDisableDate={(date) => isSunday(date)}
//               />
//             </Grid>

//             <Grid item xs={12} sm={6}>
//               <HolidayDatePicker
//                 holidays={holidays}
//                 label="End Date"
//                 required
//                 value={formData.endDate}
//                 onChange={(value) => handleInputChange("endDate", value)}
//                 minDate={formData.startDate}
//                 maxDate={maxEndDate}
//                 disabled={
//                   !formData.startDate ||
//                   isLeaveTypeSelectedWithNoBalance ||
//                   formData.isHalfDay
//                 }
//                 shouldDisableDate={(date) => isSunday(date)}
//               />
//             </Grid>

//             {sandwichNotification && (
//               <Grid item xs={12}>
//                 <Typography
//                   variant="body2"
//                   sx={{
//                     fontStyle: "italic",
//                     textAlign: "center",
//                     mt: 1,
//                     p: 1.5,
//                     border: "1px dashed red",
//                     borderRadius: "4px",
//                     color: "red",
//                   }}
//                 >
//                   {sandwichNotification}
//                 </Typography>
//               </Grid>
//             )}

//             {showHalfDayToggle && (
//               <Grid item xs={12}>
//                 <FormControlLabel
//                   control={
//                     <Switch
//                       checked={formData.isHalfDay}
//                       onChange={(e) =>
//                         handleInputChange("isHalfDay", e.target.checked)
//                       }
//                       disabled={hasHalfDayBalance}
//                     />
//                   }
//                   label="Half Day"
//                 />
//               </Grid>
//             )}

//             <Grid item xs={12}>
//               <FormLabel>Remarks</FormLabel>
//               <TextField
//                 fullWidth
//                 multiline
//                 rows={3}
//                 placeholder="Remarks"
//                 value={formData.remarks}
//                 onChange={(e) => handleInputChange("remarks", e.target.value)}
//               />
//             </Grid>

//             <Grid item xs={12}>
//               <FormLabel required>Leave Reason</FormLabel>
//               <TextField
//                 fullWidth
//                 multiline
//                 rows={3}
//                 placeholder="Leave Reason"
//                 value={formData.leaveReason}
//                 onChange={(e) =>
//                   handleInputChange("leaveReason", e.target.value)
//                 }
//               />
//             </Grid>
//           </Grid>

//           <HolidayLegend />

//           <Box
//             sx={{
//               display: "flex",
//               justifyContent: "flex-end",
//               mt: 4,
//               pt: 3,
//               borderTop: "1px solid #e0e0e0",
//             }}
//           >
//             <Button
//               variant="text"
//               onClick={handleReset}
//               sx={{
//                 mr: 2,
//                 color: "text.primary",
//                 backgroundColor: "#f5f5f5",
//                 "&:hover": { backgroundColor: "#e0e0e0" },
//               }}
//               disabled={submitting}
//             >
//               Reset
//             </Button>
//             <Button
//               variant="contained"
//               onClick={handleSave}
//               disabled={submitting || isLeaveTypeSelectedWithNoBalance}
//             >
//               {submitting ? <CircularProgress size={24} /> : "Save"}
//             </Button>
//           </Box>
//         </Paper>
//       </Grid>

//       <Grid item xs={12} lg={4}>
//         <Paper sx={{ p: 3, borderRadius: "8px" }} elevation={1}>
//           <Typography variant="h6" fontWeight="600" sx={{ mb: 2 }}>
//             Leave Attachment
//           </Typography>
//           <FormLabel
//             required={
//               isMedicalLeave &&
//               formData.startDate &&
//               formData.endDate &&
//               differenceInCalendarDays(formData.endDate, formData.startDate) +
//                 1 >
//                 2
//             }
//           >
//             Attachment
//           </FormLabel>
//           <Box sx={{ display: "flex", alignItems: "center" }}>
//             <Button
//               variant="outlined"
//               component="label"
//               sx={{
//                 textTransform: "none",
//                 borderColor: "#e0e0e0",
//                 color: "text.primary",
//                 backgroundColor: "white",
//                 "&:hover": {
//                   backgroundColor: "#f5f5f5",
//                   borderColor: "#bdbdbd",
//                 },
//               }}
//             >
//               Choose file
//               <input
//                 type="file"
//                 hidden
//                 onChange={handleFileChange}
//                 accept=".pdf,.gif,.png,.jpg,.jpeg"
//               />
//             </Button>
//             <Typography
//               variant="body2"
//               sx={{
//                 ml: 2,
//                 color: "text.secondary",
//                 whiteSpace: "nowrap",
//                 overflow: "hidden",
//                 textOverflow: "ellipsis",
//               }}
//             >
//               {formData.selectedFile
//                 ? formData.selectedFile.name
//                 : "No file chosen"}
//             </Typography>
//           </Box>
//           <Typography
//             variant="caption"
//             color="text.secondary"
//             sx={{ display: "block", mt: 1 }}
//           >
//             Upload files only: pdf,gif,png,jpg,jpeg
//           </Typography>
//         </Paper>
//       </Grid>
//     </Grid>
//   );
// };

// // ===================================================================================
// //  COMPONENT 5: MAIN LEAVE MANAGEMENT PAGE
// // ===================================================================================
// export default function LeaveManagementLM() {
//   const [entries, setEntries] = useState("10");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedYear, setSelectedYear] = useState(
//     new Date().getFullYear().toString()
//   );
//   const [isAddLeaveOpen, setIsAddLeaveOpen] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [submitting, setSubmitting] = useState(false);
//   const [leaveData, setLeaveData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [notification, setNotification] = useState({
//     open: false,
//     message: "",
//     severity: "info",
//   });

//   const { holidays } = useHolidays();

//   const showNotification = (message, severity = "info") => {
//     setNotification({ open: true, message, severity });
//   };

//   const handleNotificationClose = (event, reason) => {
//     if (reason === "clickaway") {
//       return;
//     }
//     setNotification({ ...notification, open: false });
//   };

//   // ====================== CHANGE 2: fetchLeaveList UPDATED FOR NEW API RESPONSE ======================
//   const fetchLeaveList = useCallback(async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const employeeId = getEmployeeId();
//       const accessToken = localStorage.getItem("accessToken");
//       if (!employeeId || !accessToken)
//         throw new Error("Authentication details not found.");

//       const response = await fetch(API_ENDPOINTS.EMPLOYEE_LEAVES(employeeId), {
//         headers: { Authorization: `Bearer ${accessToken}` },
//       });
//       if (!response.ok)
//         throw new Error(`Error ${response.status}: ${response.statusText}`);

//       const data = await response.json();
//       // New response is a direct array, not an object with a 'leave_applications' key
//       const applications = Array.isArray(data) ? data : [];

//       setLeaveData(
//         applications
//           .map((item) => ({
//             id: item.leave_id, // Use unique leave_id
//             employee: item.employee_name,
//             // Email is no longer available in the new response
//             leaveType: item.leave_type || "N/A", // Handle potential null values
//             leaveDuration: `${format(
//               new Date(item.from_date),
//               "dd/MM/yyyy"
//             )} To ${format(new Date(item.to_date), "dd/MM/yyyy")}`,
//             // Map 'no_of_days' instead of 'days_applied'
//             days: `${item.no_of_days} Days`,
//             daysApplied: Number(item.no_of_days) || 0,
//             // Map 'line_manager_status' to 'status'
//             status: item.line_manager_status,
//             appliedOn: new Date(item.from_date),
//           }))
//           // Sort by from_date in descending order
//           .sort((a, b) => b.appliedOn - a.appliedOn)
//       );
//     } catch (err) {
//       setError(err.message);
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   }, []);
//   // ====================== END OF CHANGE 2 ======================

//   useEffect(() => {
//     fetchLeaveList();
//   }, [fetchLeaveList]);

//   const handleAddLeaveSubmit = useCallback(
//     async (newLeaveData) => {
//       setSubmitting(true);
//       try {
//         const employeeId = getEmployeeId();
//         const accessToken = localStorage.getItem("accessToken");
//         if (!employeeId || !accessToken)
//           throw new Error(
//             "Cannot submit leave. Authentication details are missing."
//           );

//         const formData = new FormData();
//         formData.append("employee_id", employeeId);
//         formData.append("company_id", 2);
//         formData.append("leave_type_id", newLeaveData.leaveTypeId);
//         formData.append(
//           "from_date",
//           format(newLeaveData.startDate, "yyyy-MM-dd")
//         );
//         formData.append("to_date", format(newLeaveData.endDate, "yyyy-MM-dd"));
//         formData.append("reason", newLeaveData.leaveReason);
//         formData.append("remarks", newLeaveData.remarks);

//         if (newLeaveData.isHalfDay) {
//           formData.append("is_half_day", 1);
//         }

//         if (newLeaveData.selectedFile) {
//           formData.append("leave_attachment", newLeaveData.selectedFile);
//         }

//         const response = await fetch(API_ENDPOINTS.APPLY_LEAVE, {
//           method: "POST",
//           headers: getAuthHeaders(),
//           body: formData,
//         });

//         if (!response.ok) {
//           const errorData = await response.json();
//           throw new Error(
//             errorData.error ||
//               `Failed to apply for leave. Status: ${response.status}`
//           );
//         }
//         showNotification("Leave applied successfully!", "success");
//         setIsAddLeaveOpen(false);
//         fetchLeaveList();
//       } catch (err) {
//         console.error("Failed to submit leave:", err);
//         showNotification(`Error: ${err.message}`, "error");
//       } finally {
//         setSubmitting(false);
//       }
//     },
//     [fetchLeaveList]
//   );

//   const filteredData = useMemo(() => {
//     return leaveData
//       .filter(
//         (leave) => leave.appliedOn.getFullYear().toString() === selectedYear
//       )
//       .filter(
//         (leave) =>
//           leave.employee.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           leave.leaveType.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           leave.leaveDuration.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//   }, [leaveData, selectedYear, searchTerm]);

//   const paginationData = useMemo(() => {
//     const entriesPerPage = Number.parseInt(entries, 10);
//     const totalPages = Math.ceil(filteredData.length / entriesPerPage);
//     const startIndex = (currentPage - 1) * entriesPerPage;
//     const paginatedData = filteredData.slice(
//       startIndex,
//       startIndex + entriesPerPage
//     );

//     return { entriesPerPage, totalPages, startIndex, paginatedData };
//   }, [filteredData, entries, currentPage]);

//   const leaveStats = useMemo(() => {
//     const approvedLeaves = leaveData.filter((l) => l.status === "Approved");
//     const totalDaysTaken = approvedLeaves.reduce(
//       (sum, leave) => sum + leave.daysApplied,
//       0
//     );
//     return {
//       approved: totalDaysTaken,
//       pending: leaveData.filter((l) => l.status === "Pending").length,
//     };
//   }, [leaveData]);

//   return (
//     <LocalizationProvider dateAdapter={AdapterDateFns}>
//       <Box sx={{ p: 3, backgroundColor: "#f4f6f8", minHeight: "100vh" }}>
//         <Snackbar
//           open={notification.open}
//           autoHideDuration={6000}
//           onClose={handleNotificationClose}
//           anchorOrigin={{ vertical: "top", horizontal: "center" }}
//         >
//           <Alert
//             onClose={handleNotificationClose}
//             severity={notification.severity}
//             sx={{ width: "100%" }}
//           >
//             {notification.message}
//           </Alert>
//         </Snackbar>

//         {isAddLeaveOpen ? (
//           <AddLeaveView
//             onHide={() => setIsAddLeaveOpen(false)}
//             onSave={handleAddLeaveSubmit}
//             submitting={submitting}
//             holidays={holidays}
//             showNotification={showNotification}
//           />
//         ) : (
//           <>
//             <Typography variant="h4" sx={{ mb: 2 }}>
//               Leave Request
//             </Typography>

//             <Grid container spacing={2} justifyContent="center" sx={{ mb: 2 }}>
//               <Grid item xs={12} sm={4}>
//                 <Paper
//                   sx={{
//                     p: 2,
//                     display: "flex",
//                     flexDirection: "column",
//                     alignItems: "center",
//                   }}
//                 >
//                   <Typography variant="subtitle2" color="text.secondary">
//                     LEAVE TAKEN
//                   </Typography>
//                   <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
//                     <Typography variant="h4" color="primary.main">
//                       {`${leaveStats.approved} `}
//                     </Typography>
//                     <QuestionAnswerIcon
//                       sx={{ ml: 1, color: "text.secondary" }}
//                     />
//                   </Box>
//                 </Paper>
//               </Grid>
//             </Grid>

//             <Box
//               sx={{
//                 my: 2,
//                 display: "flex",
//                 justifyContent: "space-between",
//                 alignItems: "center",
//               }}
//             >
//               <FormControl sx={{ minWidth: 120 }}>
//                 <InputLabel>Year</InputLabel>
//                 <Select
//                   value={selectedYear}
//                   label="Year"
//                   onChange={(e) => setSelectedYear(e.target.value)}
//                 >
//                   <MenuItem value="2025">2025</MenuItem>
//                   <MenuItem value="2024">2024</MenuItem>
//                   <MenuItem value="2023">2023</MenuItem>
//                 </Select>
//               </FormControl>
//               <Button
//                 variant="contained"
//                 startIcon={<AddIcon />}
//                 onClick={() => setIsAddLeaveOpen(true)}
//               >
//                 Add New Leave
//               </Button>
//             </Box>

//             <Paper sx={{ mt: 2, p: 2 }}>
//               <Box
//                 sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
//               >
//                 <FormControl
//                   variant="outlined"
//                   size="small"
//                   sx={{ minWidth: 120 }}
//                 >
//                   <InputLabel>Show</InputLabel>
//                   <Select
//                     value={entries}
//                     label="Show"
//                     onChange={(e) => {
//                       setEntries(e.target.value);
//                       setCurrentPage(1);
//                     }}
//                   >
//                     <MenuItem value={10}>10</MenuItem>
//                     <MenuItem value={25}>25</MenuItem>
//                     <MenuItem value={50}>50</MenuItem>
//                   </Select>
//                 </FormControl>
//                 <TextField
//                   label="Search"
//                   variant="outlined"
//                   size="small"
//                   value={searchTerm}
//                   onChange={(e) => {
//                     setSearchTerm(e.target.value);
//                     setCurrentPage(1);
//                   }}
//                 />
//               </Box>

//               {loading ? (
//                 <Box sx={{ display: "flex", justifyContent: "center", p: 5 }}>
//                   <CircularProgress />
//                 </Box>
//               ) : error ? (
//                 <Typography color="error" sx={{ textAlign: "center", p: 5 }}>
//                   {error}
//                 </Typography>
//               ) : (
//                 <TableContainer>
//                   <Table>
//                     {/* ====================== CHANGE 3: TABLE HEADERS UPDATED ====================== */}
//                     <TableHead>
//                       <TableRow sx={{ bgcolor: "#f5f5f5" }}>
//                         <TableCell>S.NO.</TableCell>
//                         <TableCell>EMPLOYEE</TableCell>
//                         <TableCell>LEAVE TYPE</TableCell>
//                         <TableCell>LEAVE DURATION</TableCell>
//                         <TableCell>DAYS</TableCell>
//                         <TableCell>STATUS</TableCell>
//                       </TableRow>
//                     </TableHead>
//                     {/* ====================== END OF CHANGE 3 ====================== */}
//                     <TableBody>
//                       {paginationData.paginatedData.length > 0 ? (
//                         paginationData.paginatedData.map((leave, index) => (
//                           // ====================== CHANGE 4: TABLE ROWS UPDATED ======================
//                           <TableRow key={leave.id}>
//                             <TableCell>
//                               {paginationData.startIndex + index + 1}
//                             </TableCell>
//                             <TableCell>
//                               {/* Email is removed as it's not in the new API response */}
//                               <Typography variant="body1">
//                                 {leave.employee}
//                               </Typography>
//                             </TableCell>
//                             <TableCell>{leave.leaveType}</TableCell>
//                             <TableCell>{leave.leaveDuration}</TableCell>
//                             <TableCell>{leave.days}</TableCell>
//                             <TableCell>{leave.status}</TableCell>
//                           </TableRow>
//                           // ====================== END OF CHANGE 4 ======================
//                         ))
//                       ) : (
//                         <TableRow>
//                           {/* ====================== CHANGE 5: COLSPAN UPDATED ====================== */}
//                           <TableCell colSpan={6} align="center">
//                             No leave data found for the selected criteria.
//                           </TableCell>
//                           {/* ====================== END OF CHANGE 5 ====================== */}
//                         </TableRow>
//                       )}
//                     </TableBody>
//                   </Table>
//                 </TableContainer>
//               )}

//               <Box
//                 sx={{
//                   display: "flex",
//                   justifyContent: "space-between",
//                   alignItems: "center",
//                   mt: 2,
//                 }}
//               >
//                 <Typography variant="body2">
//                   Showing{" "}
//                   {filteredData.length > 0 ? paginationData.startIndex + 1 : 0}{" "}
//                   to{" "}
//                   {Math.min(
//                     paginationData.startIndex + paginationData.entriesPerPage,
//                     filteredData.length
//                   )}{" "}
//                   of {filteredData.length} entries
//                 </Typography>
//                 <Box>
//                   <Button
//                     variant="outlined"
//                     sx={{ mr: 1 }}
//                     disabled={currentPage === 1}
//                     onClick={() => setCurrentPage((p) => p - 1)}
//                   >
//                     Previous
//                   </Button>
//                   <Button variant="contained" sx={{ mr: 1, cursor: "default" }}>
//                     {currentPage}
//                   </Button>
//                   <Button
//                     variant="outlined"
//                     disabled={currentPage >= paginationData.totalPages}
//                     onClick={() => setCurrentPage((p) => p + 1)}
//                   >
//                     Next
//                   </Button>
//                 </Box>
//               </Box>
//             </Paper>
//           </>
//         )}
//       </Box>
//     </LocalizationProvider>
//   );
// }








import { useState, useEffect, useCallback, useMemo } from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Switch,
  FormControlLabel,
  CircularProgress,
  Chip, // <-- ADD THIS IMPORT
  Snackbar, // Added for pop-ups
  Alert, // Added for pop-ups
} from "@mui/material";
import {
  QuestionAnswer as QuestionAnswerIcon,
  Add as AddIcon,
  Remove as RemoveIcon,
} from "@mui/icons-material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import {
  format,
  addDays,
  parseISO,
  isSaturday,
  isSunday,
  isBefore,
  isWithinInterval,
  startOfDay,
  differenceInCalendarDays,
} from "date-fns";

// ===================================================================================
//  CONSTANTS
// ===================================================================================
const LEAVE_TYPES = {
  PAID: "Paid Leave",
  CASUAL: "Casual Leave (CL)",
  MATERNITY: "Maternity Leave",
  MEDICAL: "Medical Leave (ML)",
  PATERNITY: "Paternity Leave",
};

const HOLIDAY_COLORS = {
  PUBLISHED: "#ffeb3b",
  UNPUBLISHED: "#ff9800",
  PUBLISHED_HOVER: "#fff176",
  UNPUBLISHED_HOVER: "#ffb74d",
};

const API_ENDPOINTS = {
  LEAVE_BALANCE: (employeeId) =>
    `https://tdtlworld.com/hrms-backend/api/leave-balance/?employee_id=${employeeId}`,
  HOLIDAYS: (employeeId) =>
    `https://tdtlworld.com/hrms-backend/employee/holidays/${employeeId}/`,
  // ====================== CHANGE 1: API URL UPDATED ======================
  EMPLOYEE_LEAVES: (employeeId) =>
    `https://tdtlworld.com/hrms-backend/api/apply-leave/?employee_id=${employeeId}`,
  APPLY_LEAVE: "https://tdtlworld.com/hrms-backend/api/apply-leave/",
};

// ===================================================================================
//  UTILITY FUNCTIONS
// ===================================================================================
const getAuthHeaders = () => {
  const accessToken = localStorage.getItem("accessToken");
  return accessToken ? { Authorization: `Bearer ${accessToken}` } : {};
};

const getEmployeeId = () => localStorage.getItem("loggedInUser");

// ===================================================================================
//  CUSTOM HOOKS
// ===================================================================================
const useLeaveTypes = () => {
  const [leaveTypes, setLeaveTypes] = useState([]);
  const EXCLUDED_LEAVE_TYPES = [
    "Compensatory Off (Comp Off)",
    "Privilege Leave (PL)",
    "Privilege Leave",
  ];

  useEffect(() => {
    const fetchLeaveTypes = async () => {
      const accessToken = localStorage.getItem("accessToken");
      const employeeId = getEmployeeId();

      if (!accessToken || !employeeId) {
        console.warn(
          "Access Token or Employee ID not found for fetching leave balance."
        );
        return;
      }

      try {
        const response = await fetch(API_ENDPOINTS.LEAVE_BALANCE(employeeId), {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        if (response.ok) {
          const data = await response.json();
          const transformedData = data.map((item) => ({
            value: item.leave_type_id,
            label: item.category_name,
            balance: item.balance_leave,
          }));
          const filteredData = transformedData.filter(
            (item) => !EXCLUDED_LEAVE_TYPES.includes(item.label)
          );
          setLeaveTypes(filteredData);
        } else {
          console.error("Failed to fetch leave balance:", response.statusText);
        }
      } catch (error) {
        console.error("Failed to fetch leave types:", error);
      }
    };
    fetchLeaveTypes();
  }, []);

  return leaveTypes;
};

const useHolidays = () => {
  const [holidays, setHolidays] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchHolidays = useCallback(async () => {
    setLoading(true);
    try {
      const employeeId = getEmployeeId();
      const accessToken = localStorage.getItem("accessToken");

      if (!employeeId || !accessToken) {
        console.warn(
          "Employee ID or access token not found for fetching holidays"
        );
        return;
      }

      const response = await fetch(API_ENDPOINTS.HOLIDAYS(employeeId), {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const holidayData = await response.json();
        const holidaysArray = Array.isArray(holidayData)
          ? holidayData
          : [holidayData];
        setHolidays(holidaysArray);
        console.log("Holidays fetched successfully:", holidaysArray);
      } else {
        console.error(
          "Failed to fetch holidays:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error fetching holidays:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHolidays();
  }, [fetchHolidays]);

  return { holidays, loading, refetch: fetchHolidays };
};

// ===================================================================================
//  COMPONENT 1: HELPER FOR FORM LABELS
// ===================================================================================
const FormLabel = ({ children, required = false }) => (
  <Typography
    component="label"
    sx={{ display: "block", fontWeight: "500", mb: 1, fontSize: "0.875rem" }}
  >
    {children} {required && <span style={{ color: "#f44336" }}>*</span>}
  </Typography>
);

// ===================================================================================
//  COMPONENT 2: HOLIDAY LEGEND
// ===================================================================================
const HolidayLegend = () => (
  <Box sx={{ mt: 3, p: 2, backgroundColor: "#f9f9f9", borderRadius: "4px" }}>
    <Typography variant="subtitle2" sx={{ mb: 1 }}>
      Holiday Legend:
    </Typography>
    <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Box
          sx={{
            width: 16,
            height: 16,
            backgroundColor: HOLIDAY_COLORS.PUBLISHED,
            borderRadius: "2px",
          }}
        ></Box>
        <Typography variant="caption">Published Holidays</Typography>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Box
          sx={{
            width: 16,
            height: 16,
            backgroundColor: HOLIDAY_COLORS.UNPUBLISHED,
            borderRadius: "2px",
          }}
        ></Box>
        <Typography variant="caption">Unpublished Holidays</Typography>
      </Box>
    </Box>
  </Box>
);

// ===================================================================================
//  COMPONENT 3: CUSTOM DATE PICKER WITH HOLIDAY HIGHLIGHTING
// ===================================================================================
const HolidayDatePicker = ({
  holidays,
  label,
  required,
  shouldDisableDate,
  ...datePickerProps
}) => {
  const getDayProps = useCallback(
    (ownerState) => {
      const isHoliday = holidays.find((h) => {
        try {
          const startDate = parseISO(h.start_date);
          const endDate = parseISO(h.end_date);
          return ownerState.day >= startDate && ownerState.day <= endDate;
        } catch (e) {
          return false;
        }
      });

      return {
        sx: {
          backgroundColor: isHoliday
            ? isHoliday.is_publish === 1
              ? `${HOLIDAY_COLORS.PUBLISHED} !important`
              : `${HOLIDAY_COLORS.UNPUBLISHED} !important`
            : "transparent",
          color: isHoliday ? "#000 !important" : "inherit",
          fontWeight: isHoliday ? "bold" : "normal",
          "&:hover": {
            backgroundColor: isHoliday
              ? isHoliday.is_publish === 1
                ? `${HOLIDAY_COLORS.PUBLISHED_HOVER} !important`
                : `${HOLIDAY_COLORS.UNPUBLISHED_HOVER} !important`
              : undefined,
          },
        },
      };
    },
    [holidays]
  );

  return (
    <>
      <FormLabel required={required}>{label}</FormLabel>
      <DatePicker
        {...datePickerProps}
        renderInput={(params) => <TextField {...params} fullWidth />}
        shouldDisableDate={shouldDisableDate}
        slotProps={{
          day: getDayProps,
        }}
      />
    </>
  );
};

// ===================================================================================
//  COMPONENT 4: ADD LEAVE VIEW (The UI for the form)
// ===================================================================================
const AddLeaveView = ({
  onSave,
  onHide,
  submitting,
  holidays,
  showNotification,
}) => {
  const [formData, setFormData] = useState({
    leaveTypeId: "",
    startDate: null,
    endDate: null,
    isHalfDay: false,
    remarks: "",
    leaveReason: "",
    selectedFile: null,
  });
  const [sandwichNotification, setSandwichNotification] = useState("");

  const leaveTypes = useLeaveTypes();

  const selectedLeaveType = useMemo(
    () => leaveTypes.find((lt) => lt.value === formData.leaveTypeId),
    [leaveTypes, formData.leaveTypeId]
  );

  const isPaidLeave = selectedLeaveType?.label === LEAVE_TYPES.PAID;
  const isCasualLeave = selectedLeaveType?.label === LEAVE_TYPES.CASUAL;
  const isMaternityLeave = selectedLeaveType?.label === LEAVE_TYPES.MATERNITY;
  const isMedicalLeave = selectedLeaveType?.label === LEAVE_TYPES.MEDICAL;
  const isPaternityLeave = selectedLeaveType?.label === LEAVE_TYPES.PATERNITY;
  const hasHalfDayBalance = selectedLeaveType?.balance === 0.5;

  const isLeaveTypeSelectedWithNoBalance =
    selectedLeaveType && !isMaternityLeave && selectedLeaveType.balance <= 0;

  const dateConstraints = useMemo(
    () => ({
      minDate: startOfDay(new Date()),
      minPaidLeaveDate: addDays(new Date(), 8),
    }),
    []
  );

  const maxEndDate = useMemo(() => {
    if (
      !formData.startDate ||
      !selectedLeaveType ||
      (selectedLeaveType.balance <= 0 && !isMaternityLeave)
    ) {
      return null;
    }

    if (isMaternityLeave) {
      return addDays(formData.startDate, 181); // 182 days total
    }

    const balanceInDays = Math.floor(selectedLeaveType.balance);
    let finalMaxDate = addDays(formData.startDate, balanceInDays - 1);

    let ruleBasedMaxDate = null;
    if (isPaidLeave) {
      ruleBasedMaxDate = addDays(formData.startDate, 5); // Max 6 days
    } else if (isCasualLeave) {
      ruleBasedMaxDate = addDays(formData.startDate, 1); // Max 2 days
    } else if (isPaternityLeave) {
      ruleBasedMaxDate = addDays(formData.startDate, 2); // Max 3 days
    }

    if (ruleBasedMaxDate && isBefore(ruleBasedMaxDate, finalMaxDate)) {
      finalMaxDate = ruleBasedMaxDate;
    }

    return finalMaxDate;
  }, [
    formData.startDate,
    selectedLeaveType,
    isPaidLeave,
    isCasualLeave,
    isMaternityLeave,
    isPaternityLeave,
  ]);

  // Effect to handle half-day logic
  useEffect(() => {
    // If half-day is toggled, end date must be same as start date
    if (formData.isHalfDay && formData.startDate) {
      setFormData((prev) => ({ ...prev, endDate: prev.startDate }));
    }
    // MODIFIED: If leave type changes, clear half-day unless new type has 0.5 balance.
    // Removed Medical Leave from this condition.
    if (!isCasualLeave && !isPaidLeave && !hasHalfDayBalance) {
      setFormData((prev) => ({ ...prev, isHalfDay: false }));
    }
  }, [
    formData.isHalfDay,
    formData.startDate,
    isCasualLeave,
    isPaidLeave,
    hasHalfDayBalance,
  ]);

  // Effect to automatically handle 0.5 day balance
  useEffect(() => {
    if (hasHalfDayBalance) {
      setFormData((prev) => ({ ...prev, isHalfDay: true }));
    }
  }, [hasHalfDayBalance]);

  // Effect to check for the sandwich rule
  useEffect(() => {
    const { startDate, endDate } = formData;
    const isHoliday = (date, holidayList) => {
      if (!holidayList || holidayList.length === 0) return false;
      const checkDate = startOfDay(date);
      return holidayList.some((h) => {
        try {
          const holidayStart = startOfDay(parseISO(h.start_date));
          const holidayEnd = startOfDay(parseISO(h.end_date));
          return isWithinInterval(checkDate, {
            start: holidayStart,
            end: holidayEnd,
          });
        } catch (error) {
          console.error("Invalid date format in holiday data:", h);
          return false;
        }
      });
    };

    const checkSandwichRule = () => {
      if (
        !startDate ||
        !endDate ||
        !isBefore(startDate, endDate) ||
        isMaternityLeave
      ) {
        setSandwichNotification("");
        return;
      }
      let currentDate = addDays(startDate, 1);
      let ruleApplied = false;
      while (isBefore(currentDate, endDate)) {
        const isWeekendDay = isSaturday(currentDate) || isSunday(currentDate);
        const isHolidayDay = isHoliday(currentDate, holidays);
        if (isWeekendDay || isHolidayDay) {
          ruleApplied = true;
          break;
        }
        currentDate = addDays(currentDate, 1);
      }
      if (ruleApplied) {
        setSandwichNotification(
          "Sandwich Rule Applied: Weekends and/or holidays between the selected dates will be counted as part of the leave."
        );
      } else {
        setSandwichNotification("");
      }
    };
    checkSandwichRule();
  }, [formData.startDate, formData.endDate, holidays, isMaternityLeave]);

  const handleInputChange = useCallback((field, value) => {
    setFormData((prev) => {
      const newState = { ...prev, [field]: value };
      if (field === "leaveTypeId") {
        newState.startDate = null;
        newState.endDate = null;
      }
      if (field === "startDate") {
        newState.endDate = null;
      }
      return newState;
    });
  }, []);

  const handleFileChange = useCallback(
    (event) => {
      if (event.target.files && event.target.files.length > 0) {
        const file = event.target.files[0];
        const allowedExtensions = ["pdf", "gif", "png", "jpg", "jpeg"];
        const fileExtension = file.name.split(".").pop().toLowerCase();
        if (!allowedExtensions.includes(fileExtension)) {
          showNotification(
            "Invalid file type. Please upload only: pdf, gif, png, jpg, jpeg",
            "warning"
          );
          event.target.value = null;
          return;
        }
        handleInputChange("selectedFile", file);
      }
    },
    [handleInputChange, showNotification]
  );

  const handleReset = useCallback(() => {
    setFormData({
      leaveTypeId: "",
      startDate: null,
      endDate: null,
      isHalfDay: false,
      remarks: "",
      leaveReason: "",
      selectedFile: null,
    });
  }, []);

  const handleSave = useCallback(() => {
    const { leaveTypeId, startDate, endDate, leaveReason, selectedFile } =
      formData;
    if (!leaveTypeId || !startDate || !endDate || !leaveReason) {
      showNotification("Please fill all required fields.", "warning");
      return;
    }
    if (isLeaveTypeSelectedWithNoBalance) {
      showNotification("Cannot apply for leave with zero balance.", "error");
      return;
    }

    if (isMedicalLeave) {
      const duration = differenceInCalendarDays(endDate, startDate) + 1;
      if (duration > 2 && !selectedFile) {
        showNotification(
          "For Medical Leave exceeding 2 days, an attachment is required.",
          "warning"
        );
        return;
      }
    }

    onSave(formData);
  }, [
    formData,
    onSave,
    isLeaveTypeSelectedWithNoBalance,
    isMedicalLeave,
    showNotification,
  ]);

  const showHalfDayToggle = isCasualLeave || isPaidLeave;

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} lg={8}>
        <Paper sx={{ p: 3, borderRadius: "8px" }} elevation={1}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 4,
            }}
          >
            <Typography variant="h6" fontWeight="600">
              Add Leave
            </Typography>
            <Button
              variant="contained"
              startIcon={<RemoveIcon />}
              onClick={onHide}
              sx={{ textTransform: "none" }}
            >
              Hide
            </Button>
          </Box>

          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormLabel required>Leave Type</FormLabel>
              <FormControl fullWidth>
                <Select
                  value={formData.leaveTypeId}
                  onChange={(e) =>
                    handleInputChange("leaveTypeId", e.target.value)
                  }
                  displayEmpty
                  renderValue={(selected) =>
                    selected ? (
                      leaveTypes.find((lt) => lt.value === selected)?.label
                    ) : (
                      <Typography sx={{ color: "text.secondary" }}>
                        Leave Type
                      </Typography>
                    )
                  }
                >
                  <MenuItem disabled value="">
                    <em>Leave Type</em>
                  </MenuItem>
                  {leaveTypes.map((type) => (
                    <MenuItem
                      key={type.value}
                      value={type.value}
                      disabled={
                        type.label !== LEAVE_TYPES.MATERNITY &&
                        type.balance <= 0
                      }
                    >
                      {`${type.label} (Balance: ${type.balance})`}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <HolidayDatePicker
                holidays={holidays}
                label="Start Date"
                required
                value={formData.startDate}
                onChange={(value) => handleInputChange("startDate", value)}
                minDate={
                  isPaidLeave
                    ? dateConstraints.minPaidLeaveDate
                    : dateConstraints.minDate
                }
                disabled={
                  !formData.leaveTypeId || isLeaveTypeSelectedWithNoBalance
                }
                shouldDisableDate={(date) => isSunday(date)}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <HolidayDatePicker
                holidays={holidays}
                label="End Date"
                required
                value={formData.endDate}
                onChange={(value) => handleInputChange("endDate", value)}
                minDate={formData.startDate}
                maxDate={maxEndDate}
                disabled={
                  !formData.startDate ||
                  isLeaveTypeSelectedWithNoBalance ||
                  formData.isHalfDay
                }
                shouldDisableDate={(date) => isSunday(date)}
              />
            </Grid>

            {sandwichNotification && (
              <Grid item xs={12}>
                <Typography
                  variant="body2"
                  sx={{
                    fontStyle: "italic",
                    textAlign: "center",
                    mt: 1,
                    p: 1.5,
                    border: "1px dashed red",
                    borderRadius: "4px",
                    color: "red",
                  }}
                >
                  {sandwichNotification}
                </Typography>
              </Grid>
            )}

            {showHalfDayToggle && (
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={formData.isHalfDay}
                      onChange={(e) =>
                        handleInputChange("isHalfDay", e.target.checked)
                      }
                      disabled={hasHalfDayBalance}
                    />
                  }
                  label="Half Day"
                />
              </Grid>
            )}

            <Grid item xs={12}>
              <FormLabel>Remarks</FormLabel>
              <TextField
                fullWidth
                multiline
                rows={3}
                placeholder="Remarks"
                value={formData.remarks}
                onChange={(e) => handleInputChange("remarks", e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <FormLabel required>Leave Reason</FormLabel>
              <TextField
                fullWidth
                multiline
                rows={3}
                placeholder="Leave Reason"
                value={formData.leaveReason}
                onChange={(e) =>
                  handleInputChange("leaveReason", e.target.value)
                }
              />
            </Grid>
          </Grid>

          <HolidayLegend />

          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              mt: 4,
              pt: 3,
              borderTop: "1px solid #e0e0e0",
            }}
          >
            <Button
              variant="text"
              onClick={handleReset}
              sx={{
                mr: 2,
                color: "text.primary",
                backgroundColor: "#f5f5f5",
                "&:hover": { backgroundColor: "#e0e0e0" },
              }}
              disabled={submitting}
            >
              Reset
            </Button>
            <Button
              variant="contained"
              onClick={handleSave}
              disabled={submitting || isLeaveTypeSelectedWithNoBalance}
            >
              {submitting ? <CircularProgress size={24} /> : "Save"}
            </Button>
          </Box>
        </Paper>
      </Grid>

      <Grid item xs={12} lg={4}>
        <Paper sx={{ p: 3, borderRadius: "8px" }} elevation={1}>
          <Typography variant="h6" fontWeight="600" sx={{ mb: 2 }}>
            Leave Attachment
          </Typography>
          <FormLabel
            required={
              isMedicalLeave &&
              formData.startDate &&
              formData.endDate &&
              differenceInCalendarDays(formData.endDate, formData.startDate) +
              1 >
              2
            }
          >
            Attachment
          </FormLabel>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Button
              variant="outlined"
              component="label"
              sx={{
                textTransform: "none",
                borderColor: "#e0e0e0",
                color: "text.primary",
                backgroundColor: "white",
                "&:hover": {
                  backgroundColor: "#f5f5f5",
                  borderColor: "#bdbdbd",
                },
              }}
            >
              Choose file
              <input
                type="file"
                hidden
                onChange={handleFileChange}
                accept=".pdf,.gif,.png,.jpg,.jpeg"
              />
            </Button>
            <Typography
              variant="body2"
              sx={{
                ml: 2,
                color: "text.secondary",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {formData.selectedFile
                ? formData.selectedFile.name
                : "No file chosen"}
            </Typography>
          </Box>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ display: "block", mt: 1 }}
          >
            Upload files only: pdf,gif,png,jpg,jpeg
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};

// ===================================================================================
//  COMPONENT 5: MAIN LEAVE MANAGEMENT PAGE
// ===================================================================================
export default function LeaveManagementLM() {
  const [entries, setEntries] = useState("10");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedYear, setSelectedYear] = useState(
    new Date().getFullYear().toString()
  );
  const [isAddLeaveOpen, setIsAddLeaveOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [leaveData, setLeaveData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  const { holidays } = useHolidays();

  const showNotification = (message, severity = "info") => {
    setNotification({ open: true, message, severity });
  };

  const handleNotificationClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setNotification({ ...notification, open: false });
  };

  // ====================== CHANGE 2: fetchLeaveList UPDATED FOR NEW API RESPONSE ======================
  const fetchLeaveList = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const employeeId = getEmployeeId();
      const accessToken = localStorage.getItem("accessToken");
      if (!employeeId || !accessToken)
        throw new Error("Authentication details not found.");

      const response = await fetch(API_ENDPOINTS.EMPLOYEE_LEAVES(employeeId), {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (!response.ok)
        throw new Error(`Error ${response.status}: ${response.statusText}`);

      const data = await response.json();
      // New response is a direct array, not an object with a 'leave_applications' key
      const applications = Array.isArray(data) ? data : [];

      setLeaveData(
        applications
          .map((item) => ({
            id: item.leave_id, // Use unique leave_id
            employee: item.employee_name,
            // Email is no longer available in the new response
            leaveType: item.leave_type || "N/A", // Handle potential null values
            leaveDuration: `${format(
              new Date(item.from_date),
              "dd/MM/yyyy"
            )} To ${format(new Date(item.to_date), "dd/MM/yyyy")}`,
            // Map 'no_of_days' instead of 'days_applied'
            days: `${item.no_of_days} Days`,
            daysApplied: Number(item.no_of_days) || 0,
            // Map 'line_manager_status' to 'status'
            status: item.line_manager_status,
            appliedOn: new Date(item.from_date),
          }))
          // Sort by from_date in descending order
          .sort((a, b) => b.appliedOn - a.appliedOn)
      );
    } catch (err) {
      setError(err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);
  // ====================== END OF CHANGE 2 ======================

  useEffect(() => {
    fetchLeaveList();
  }, [fetchLeaveList]);

  const handleAddLeaveSubmit = useCallback(
    async (newLeaveData) => {
      setSubmitting(true);
      try {
        const employeeId = getEmployeeId();
        const accessToken = localStorage.getItem("accessToken");
        if (!employeeId || !accessToken)
          throw new Error(
            "Cannot submit leave. Authentication details are missing."
          );

        const formData = new FormData();
        formData.append("employee_id", employeeId);
        formData.append("company_id", 2);
        formData.append("leave_type_id", newLeaveData.leaveTypeId);
        formData.append(
          "from_date",
          format(newLeaveData.startDate, "yyyy-MM-dd")
        );
        formData.append("to_date", format(newLeaveData.endDate, "yyyy-MM-dd"));
        formData.append("reason", newLeaveData.leaveReason);
        formData.append("remarks", newLeaveData.remarks);

        if (newLeaveData.isHalfDay) {
          formData.append("is_half_day", 1);
        }

        if (newLeaveData.selectedFile) {
          formData.append("leave_attachment", newLeaveData.selectedFile);
        }

        const response = await fetch(API_ENDPOINTS.APPLY_LEAVE, {
          method: "POST",
          headers: getAuthHeaders(),
          body: formData,
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            errorData.error ||
            `Failed to apply for leave. Status: ${response.status}`
          );
        }
        showNotification("Leave applied successfully!", "success");
        setIsAddLeaveOpen(false);
        fetchLeaveList();
      } catch (err) {
        console.error("Failed to submit leave:", err);
        showNotification(`Error: ${err.message}`, "error");
      } finally {
        setSubmitting(false);
      }
    },
    [fetchLeaveList]
  );

  const filteredData = useMemo(() => {
    return leaveData
      .filter(
        (leave) => leave.appliedOn.getFullYear().toString() === selectedYear
      )
      .filter(
        (leave) =>
          leave.employee.toLowerCase().includes(searchTerm.toLowerCase()) ||
          leave.leaveType.toLowerCase().includes(searchTerm.toLowerCase()) ||
          leave.leaveDuration.toLowerCase().includes(searchTerm.toLowerCase())
      );
  }, [leaveData, selectedYear, searchTerm]);

  const paginationData = useMemo(() => {
    const entriesPerPage = Number.parseInt(entries, 10);
    const totalPages = Math.ceil(filteredData.length / entriesPerPage);
    const startIndex = (currentPage - 1) * entriesPerPage;
    const paginatedData = filteredData.slice(
      startIndex,
      startIndex + entriesPerPage
    );

    return { entriesPerPage, totalPages, startIndex, paginatedData };
  }, [filteredData, entries, currentPage]);

  const leaveStats = useMemo(() => {
    const approvedLeaves = leaveData.filter((l) => l.status === "Approved");
    const totalDaysTaken = approvedLeaves.reduce(
      (sum, leave) => sum + leave.daysApplied,
      0
    );
    return {
      approved: totalDaysTaken,
      pending: leaveData.filter((l) => l.status === "Pending").length,
    };
  }, [leaveData]);

  const getStatusChipProps = (status) => {
    switch (status) {
      case "Approved":
        return { label: "Approved", color: "success" };
      case "Rejected":
        return { label: "Rejected", color: "error" };
      case "Pending":
        return { label: "Pending", color: "warning" };
      default:
        return { label: status, color: "default" };
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ p: 3, backgroundColor: "#f4f6f8", minHeight: "100vh" }}>
        <Snackbar
          open={notification.open}
          autoHideDuration={6000}
          onClose={handleNotificationClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            onClose={handleNotificationClose}
            severity={notification.severity}
            sx={{ width: "100%" }}
          >
            {notification.message}
          </Alert>
        </Snackbar>

        {isAddLeaveOpen ? (
          <AddLeaveView
            onHide={() => setIsAddLeaveOpen(false)}
            onSave={handleAddLeaveSubmit}
            submitting={submitting}
            holidays={holidays}
            showNotification={showNotification}
          />
        ) : (
          <>
            <Typography variant="h4" sx={{ mb: 2 }}>
              Leave Request
            </Typography>

            <Grid container spacing={2} justifyContent="center" sx={{ mb: 2 }}>
              <Grid item xs={12} sm={4}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="subtitle2" color="text.secondary">
                    LEAVE TAKEN
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                    <Typography variant="h4" color="primary.main">
                      {`${leaveStats.approved} `}
                    </Typography>
                    <QuestionAnswerIcon
                      sx={{ ml: 1, color: "text.secondary" }}
                    />
                  </Box>
                </Paper>
              </Grid>
            </Grid>

            <Box
              sx={{
                my: 2,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <FormControl sx={{ minWidth: 120 }}>
                <InputLabel>Year</InputLabel>
                <Select
                  value={selectedYear}
                  label="Year"
                  onChange={(e) => setSelectedYear(e.target.value)}
                >
                  <MenuItem value="2025">2025</MenuItem>
                  <MenuItem value="2024">2024</MenuItem>
                  <MenuItem value="2023">2023</MenuItem>
                </Select>
              </FormControl>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => setIsAddLeaveOpen(true)}
              >
                Add New Leave
              </Button>
            </Box>

            <Paper sx={{ mt: 2, p: 2 }}>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
              >
                <FormControl
                  variant="outlined"
                  size="small"
                  sx={{ minWidth: 120 }}
                >
                  <InputLabel>Show</InputLabel>
                  <Select
                    value={entries}
                    label="Show"
                    onChange={(e) => {
                      setEntries(e.target.value);
                      setCurrentPage(1);
                    }}
                  >
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={25}>25</MenuItem>
                    <MenuItem value={50}>50</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  label="Search"
                  variant="outlined"
                  size="small"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                />
              </Box>

              {loading ? (
                <Box sx={{ display: "flex", justifyContent: "center", p: 5 }}>
                  <CircularProgress />
                </Box>
              ) : error ? (
                <Typography color="error" sx={{ textAlign: "center", p: 5 }}>
                  {error}
                </Typography>
              ) : (
                <TableContainer>
                  <Table>
                    {/* ====================== CHANGE 3: TABLE HEADERS UPDATED ====================== */}
                    <TableHead>
                      <TableRow sx={{ bgcolor: "#f5f5f5" }}>
                        <TableCell>S.NO.</TableCell>
                        <TableCell>EMPLOYEE</TableCell>
                        <TableCell>LEAVE TYPE</TableCell>
                        <TableCell>LEAVE DURATION</TableCell>
                        <TableCell>DAYS</TableCell>
                        <TableCell>STATUS</TableCell>
                      </TableRow>
                    </TableHead>
                    {/* ====================== END OF CHANGE 3 ====================== */}
                    <TableBody>
                      {paginationData.paginatedData.length > 0 ? (
                        paginationData.paginatedData.map((leave, index) => {
                          // ====================== CHANGE 2: USE HELPER IN TABLE ROW ======================
                          const statusProps = getStatusChipProps(leave.status);
                          return (
                            <TableRow key={leave.id}>
                              <TableCell>
                                {paginationData.startIndex + index + 1}
                              </TableCell>
                              <TableCell>
                                <Typography variant="body1">
                                  {leave.employee}
                                </Typography>
                              </TableCell>
                              <TableCell>{leave.leaveType}</TableCell>
                              <TableCell>{leave.leaveDuration}</TableCell>
                              <TableCell>{leave.days}</TableCell>
                              <TableCell>
                                <Chip
                                  label={statusProps.label}
                                  color={statusProps.color}
                                  size="small"
                                />
                              </TableCell>
                            </TableRow>
                          );
                          // ====================== END OF CHANGE 2 ======================
                        })
                      ) : (
                        <TableRow>
                          <TableCell colSpan={6} align="center">
                            No leave data found for the selected criteria.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mt: 2,
                }}
              >
                <Typography variant="body2">
                  Showing{" "}
                  {filteredData.length > 0 ? paginationData.startIndex + 1 : 0}{" "}
                  to{" "}
                  {Math.min(
                    paginationData.startIndex + paginationData.entriesPerPage,
                    filteredData.length
                  )}{" "}
                  of {filteredData.length} entries
                </Typography>
                <Box>
                  <Button
                    variant="outlined"
                    sx={{ mr: 1 }}
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((p) => p - 1)}
                  >
                    Previous
                  </Button>
                  <Button variant="contained" sx={{ mr: 1, cursor: "default" }}>
                    {currentPage}
                  </Button>
                  <Button
                    variant="outlined"
                    disabled={currentPage >= paginationData.totalPages}
                    onClick={() => setCurrentPage((p) => p + 1)}
                  >
                    Next
                  </Button>
                </Box>
              </Box>
            </Paper>
          </>
        )}
      </Box>
    </LocalizationProvider>
  );
}
