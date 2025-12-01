// // import React, { useState } from "react";
// // import {
// //   Box,
// //   Typography,
// //   Grid,
// //   Card,
// //   CardContent,
// //   CardActions,
// //   Button,
// //   LinearProgress,
// //   Avatar,
// //   IconButton,
// //   Dialog,
// //   DialogActions,
// //   DialogContent,
// //   DialogTitle,
// //   TextField,
// // } from "@mui/material";
// // import {
// //   List as ListIcon,
// //   Group as GroupIcon,
// //   CheckCircle as CheckCircleIcon,
// //   AccessTime as AccessTimeIcon,
// //   Edit as EditIcon,
// //   Delete as DeleteIcon,
// //   Add as AddIcon,
// // } from "@mui/icons-material";

// // const taskData = [
// //   {
// //     id: 1,
// //     title: "TDTL HRMS Tasks",
// //     description: "Complete HRMS related tasks and ensure alignment with goals.",
// //     dueDate: "13/09/2023",
// //     completion: 85,
// //     status: "Completed",
// //     assignedTo: ["Alice", "Bob"],
// //   },
// //   {
// //     id: 2,
// //     title: "Clinical Notes Development",
// //     description: "Develop clinical notes as per requirements.",
// //     dueDate: "17/10/2023",
// //     completion: 100,
// //     status: "Completed",
// //     assignedTo: ["Charlie"],
// //   },
// //   {
// //     id: 3,
// //     title: "Push Notifications",
// //     description: "Implement push notifications through the header.",
// //     dueDate: "17/10/2023",
// //     completion: 60,
// //     status: "In Progress",
// //     assignedTo: ["David"],
// //   },
// // ];

// // export default function Tasks() {
// //   const [tasks, setTasks] = useState(taskData);
// //   const [open, setOpen] = useState(false);
// //   const [isEditing, setIsEditing] = useState(false);
// //   const [currentTask, setCurrentTask] = useState({
// //     id: null,
// //     title: "",
// //     description: "",
// //     dueDate: "",
// //     completion: 0,
// //     assignedTo: [],
// //   });

// //   const handleOpen = (task = null) => {
// //     setIsEditing(Boolean(task));
// //     setCurrentTask(
// //       task || {
// //         id: null,
// //         title: "",
// //         description: "",
// //         dueDate: "",
// //         completion: 0,
// //         assignedTo: [],
// //       }
// //     );
// //     setOpen(true);
// //   };

// //   const handleClose = () => setOpen(false);

// //   const handleSave = () => {
// //     if (isEditing) {
// //       setTasks((prevTasks) =>
// //         prevTasks.map((task) =>
// //           task.id === currentTask.id ? currentTask : task
// //         )
// //       );
// //     } else {
// //       setTasks((prevTasks) => [
// //         ...prevTasks,
// //         {
// //           ...currentTask,
// //           id: tasks.length ? tasks[tasks.length - 1].id + 1 : 1,
// //         },
// //       ]);
// //     }
// //     handleClose();
// //   };

// //   const handleDelete = (taskId) => {
// //     setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
// //   };

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setCurrentTask({ ...currentTask, [name]: value });
// //   };

// //   return (
// //     <Box sx={{ p: 3 }}>
// //       {/* Header Section */}
// //       <Typography variant="h4" sx={{ mb: 3 }}>
// //         Tasks
// //       </Typography>
// //       <Grid container spacing={2} sx={{ mb: 3 }}>
// //         <Grid item xs={3}>
// //           <Card sx={{ textAlign: "center", bgcolor: "#4CAF50", color: "#FFF" }}>
// //             <CardContent>
// //               <CheckCircleIcon fontSize="large" />
// //               <Typography variant="h6">9</Typography>
// //               <Typography>Total Completed</Typography>
// //             </CardContent>
// //           </Card>
// //         </Grid>
// //         <Grid item xs={3}>
// //           <Card sx={{ textAlign: "center", bgcolor: "#2196F3", color: "#FFF" }}>
// //             <CardContent>
// //               <AccessTimeIcon fontSize="large" />
// //               <Typography variant="h6">1</Typography>
// //               <Typography>Total In Progress</Typography>
// //             </CardContent>
// //           </Card>
// //         </Grid>
// //         <Grid item xs={3}>
// //           <Card sx={{ textAlign: "center", bgcolor: "#FF9800", color: "#FFF" }}>
// //             <CardContent>
// //               <ListIcon fontSize="large" />
// //               <Typography variant="h6">14</Typography>
// //               <Typography>Total Not Started</Typography>
// //             </CardContent>
// //           </Card>
// //         </Grid>
// //         <Grid item xs={3}>
// //           <Card sx={{ textAlign: "center", bgcolor: "#F44336", color: "#FFF" }}>
// //             <CardContent>
// //               <GroupIcon fontSize="large" />
// //               <Typography variant="h6">0</Typography>
// //               <Typography>Overdue Tasks</Typography>
// //             </CardContent>
// //           </Card>
// //         </Grid>
// //       </Grid>

// //       <Box
// //         sx={{
// //           display: "flex",
// //           justifyContent: "space-between",
// //           alignItems: "center",
// //           mb: 2,
// //         }}
// //       >
// //         <Typography variant="h5" sx={{ mb: 2 }}>
// //           List All Tasks
// //         </Typography>
// //         <Button
// //           variant="contained"
// //           color="primary"
// //           startIcon={<AddIcon />}
// //           onClick={() => handleOpen()}
// //         >
// //           Add Task
// //         </Button>
// //       </Box>

// //       <Grid container spacing={2} sx={{ mt: 2 }}>
// //         {tasks.map((task) => (
// //           <Grid item xs={12} md={6} key={task.id}>
// //             <Card>
// //               <CardContent>
// //                 <Typography variant="h6">{task.title}</Typography>
// //                 <Typography variant="subtitle2" color="textSecondary">
// //                   Due: {task.dueDate}
// //                 </Typography>
// //                 <Typography variant="body2" sx={{ mb: 1 }}>
// //                   {task.description}
// //                 </Typography>
// //                 <LinearProgress
// //                   variant="determinate"
// //                   value={task.completion}
// //                   sx={{ height: 10, borderRadius: 5, mb: 1 }}
// //                 />
// //                 <Typography variant="caption">
// //                   {task.completion}% Completed
// //                 </Typography>
// //               </CardContent>
// //               <CardActions>
// //                 {task.assignedTo.map((name, index) => (
// //                   <Avatar key={index} sx={{ mr: 1 }}>
// //                     {name[0]}
// //                   </Avatar>
// //                 ))}
// //                 <Box sx={{ flexGrow: 1 }} />
// //                 <IconButton color="primary" onClick={() => handleOpen(task)}>
// //                   <EditIcon />
// //                 </IconButton>
// //                 <IconButton color="error" onClick={() => handleDelete(task.id)}>
// //                   <DeleteIcon />
// //                 </IconButton>
// //               </CardActions>
// //             </Card>
// //           </Grid>
// //         ))}
// //       </Grid>

// //       <Dialog open={open} onClose={handleClose}>
// //         <DialogTitle>{isEditing ? "Edit Task" : "Add Task"}</DialogTitle>
// //         <DialogContent>
// //           <TextField
// //             autoFocus
// //             margin="dense"
// //             name="title"
// //             label="Task Title"
// //             fullWidth
// //             value={currentTask.title}
// //             onChange={handleChange}
// //           />
// //           <TextField
// //             margin="dense"
// //             name="description"
// //             label="Description"
// //             fullWidth
// //             value={currentTask.description}
// //             onChange={handleChange}
// //           />
// //           <TextField
// //             margin="dense"
// //             name="dueDate"
// //             label="Due Date"
// //             type="date"
// //             fullWidth
// //             value={currentTask.dueDate}
// //             InputLabelProps={{ shrink: true }}
// //             onChange={handleChange}
// //           />
// //           <TextField
// //             margin="dense"
// //             name="completion"
// //             label="Completion (%)"
// //             type="number"
// //             fullWidth
// //             value={currentTask.completion}
// //             onChange={handleChange}
// //           />
// //         </DialogContent>
// //         <DialogActions>
// //           <Button onClick={handleClose}>Cancel</Button>
// //           <Button onClick={handleSave} color="primary">
// //             {isEditing ? "Update" : "Add"}
// //           </Button>
// //         </DialogActions>
// //       </Dialog>
// //     </Box>
// //   );
// // }


// import React, { useState, useEffect } from "react";
// import {
//   Box, Typography, Grid, Card, CardContent, CardActions, Button,
//   LinearProgress, Avatar, IconButton, Dialog, DialogActions, DialogContent,
//   DialogTitle, TextField, Paper, Tooltip, Skeleton, CircularProgress,
//   InputAdornment, Chip, MenuItem, FormControl, InputLabel, Select
// } from "@mui/material";
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
// import { format, parse, isValid } from 'date-fns';
// import CancelIcon from '@mui/icons-material/Cancel'; // For Cancelled status


// // Icons
// import {
//   List as ListIcon,
//   Group as GroupIcon, // Still available if needed elsewhere
//   CheckCircle as CheckCircleIcon,
//   AccessTime as AccessTimeIcon,
//   Edit as EditIcon,
//   Delete as DeleteIcon,
//   Add as AddIcon,
//   AssignmentTurnedIn as AssignmentTurnedInIcon,
//   Search as SearchIcon,
//   Refresh as RefreshIcon,
//   Close as CloseIcon,
//   Save as SaveIcon,
//   Event as EventIcon,
//   PeopleOutline as PeopleOutlineIcon,
//   DescriptionOutlined as DescriptionOutlinedIcon,
//   TrendingUp as TrendingUpIcon,
//   HourglassEmpty as HourglassEmptyIcon,
//   WarningAmber as WarningAmberIcon,
//   PauseCircle as PauseCircleIcon, // Added
//   FlagOutlined as FlagOutlinedIcon, // Added
// } from "@mui/icons-material";

// // Helper to format Date object to yyyy-MM-dd string
// const formatDateToInput = (dateObj) => {
//   if (!dateObj || !(dateObj instanceof Date) || isNaN(dateObj)) return '';
//   return format(dateObj, 'yyyy-MM-dd');
// };

// // Helper to parse dd/MM/yyyy (or other) string to Date object
// const parseInputToDate = (dateString) => {
//   if (!dateString) return null;
//   let parsedDate = parse(dateString, 'dd/MM/yyyy', new Date());
//   if (isValid(parsedDate)) return parsedDate;
//   parsedDate = parse(dateString, 'yyyy-MM-dd', new Date());
//   if (isValid(parsedDate)) return parsedDate;
//   parsedDate = new Date(dateString);
//   return isValid(parsedDate) ? parsedDate : null;
// };

// // Gradient button style
// const gradientButtonStyle = {
//   background: 'linear-gradient(135deg, rgba(36, 73, 239, 0.89) 0%, rgb(218, 18, 202) 100%)',
//   color: 'white',
//   borderRadius: 2,
//   fontWeight: 600,
//   boxShadow: '0 4px 10px rgba(36, 73, 239, 0.3)',
//   transition: 'all 0.3s ease',
//   '&:hover': {
//     background: 'linear-gradient(135deg, rgba(36, 73, 239, 1) 0%, rgb(218, 18, 202, 1) 100%)',
//     boxShadow: '0 6px 15px rgba(36, 73, 239, 0.4)',
//     transform: 'translateY(-2px)',
//   },
//   '&.Mui-disabled': {
//     background: 'rgba(0, 0, 0, 0.12)',
//     color: 'rgba(0, 0, 0, 0.26)',
//     boxShadow: 'none',
//   }
// };

// // Skeleton for Task Card
// const TaskCardSkeleton = () => (
//   <Grid item xs={12} md={6}>
//     <Card sx={{ borderRadius: 2, height: '100%' }}>
//       <CardContent>
//         <Skeleton variant="text" width="70%" height={30} />
//         <Skeleton variant="text" width="50%" sx={{ mt: 1 }}/>
//         <Skeleton variant="rectangular" height={40} sx={{ my: 1, borderRadius:1 }}/>
//         <Skeleton variant="text" width="40%" height={20} />
//         <Skeleton variant="rectangular" height={10} sx={{ my: 1, borderRadius: 5 }}/>
//         <Skeleton variant="text" width="30%" />
//       </CardContent>
//       <CardActions sx={{ justifyContent: 'space-between', p:1.5, borderTop: '1px solid', borderColor:'divider' }}>
//         <Box sx={{display: 'flex'}}>
//             <Skeleton variant="circular" width={32} height={32} sx={{mr:1}}/>
//             <Skeleton variant="circular" width={32} height={32} />
//         </Box>
//         <Box>
//             <Skeleton variant="circular" width={32} height={32} sx={{display:'inline-block', mr:1}} />
//             <Skeleton variant="circular" width={32} height={32} sx={{display:'inline-block'}} />
//         </Box>
//       </CardActions>
//     </Card>
//   </Grid>
// );

// // Summary Stat Card Component with light gradient and hover effect
// const StatCard = ({ title, value, icon, gradient }) => (
//     <Grid item xs={12} sm={6} md={3}>
//       <Card sx={{
//         textAlign: "center",
//         borderRadius: 2,
//         background: gradient,
//         color: "rgba(0,0,0,0.75)",
//         transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
//         boxShadow: 3,
//         '&:hover': {
//           transform: 'scale(1.04)',
//           boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
//           '& .MuiCardContent-root': {
//             '& .MuiSvgIcon-root': {
//                 color: 'primary.main'
//             }
//           }
//         }
//       }}>
//         <CardContent sx={{ py: 3 }}>
//           {React.cloneElement(icon, { sx:{ fontSize: "2.5rem", mb: 1, color: 'primary.dark' }})}
//           <Typography variant="h5" sx={{fontWeight: 'bold'}}>{value}</Typography>
//           <Typography variant="body2">{title}</Typography>
//         </CardContent>
//       </Card>
//     </Grid>
//   );

// const taskStatuses = ["Not Started", "In Progress", "On Hold", "Completed", "Cancelled"];
// const taskPriorities = ["High", "Medium", "Low"];

// export default function Tasks() { // Or AdminTasks
//   const [tasks, setTasks] = useState([]);
//   const [filteredTasks, setFilteredTasks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [submitLoading, setSubmitLoading] = useState(false);
//   const [refreshKey, setRefreshKey] = useState(0);
//   const [searchQuery, setSearchQuery] = useState("");

//   const [openDialog, setOpenDialog] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [currentTask, setCurrentTask] = useState(null);

//   const initialTaskState = {
//     title: "", description: "", dueDate: null, completion: 0,
//     assignedTo: [], status: taskStatuses[0], priority: taskPriorities[1]
//   };

//   const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
//   const [taskToDelete, setTaskToDelete] = useState(null);

//   useEffect(() => {
//     setLoading(true);
//     setTimeout(() => {
//       const taskData = [
//         { id: 1, title: "TDTL HRMS Tasks", description: "Complete HRMS related tasks and ensure alignment with goals.", dueDate: "13/09/2023", completion: 85, status: "Completed", priority: "High", assignedTo: ["Alice", "Bob"] },
//         { id: 2, title: "Clinical Notes Development", description: "Develop clinical notes as per requirements.", dueDate: "17/10/2023", completion: 100, status: "Completed", priority: "High", assignedTo: ["Charlie"] },
//         { id: 3, title: "Push Notifications Feature", description: "Implement push notifications through the header for new alerts.", dueDate: "25/11/2024", completion: 60, status: "In Progress", priority: "Medium", assignedTo: ["David", "Eve"] },
//         { id: 4, title: "User Onboarding Flow Design", description: "Design a seamless onboarding experience for new users.", dueDate: "10/12/2024", completion: 0, status: "Not Started", priority: "Medium", assignedTo: ["Frank"] },
//         { id: 5, title: "API Documentation Update", description: "Update all API endpoints documentation for version 2.0.", dueDate: "05/01/2025", completion: 20, status: "In Progress", priority: "Low", assignedTo: ["Grace", "Heidi"] },
//       ];
//       const processedData = taskData.map(task => ({
//           ...task,
//           dueDate: parseInputToDate(task.dueDate)
//       }));
//       setTasks(processedData);
//       setFilteredTasks(processedData);
//       setLoading(false);
//     }, 1000);
//   }, [refreshKey]);

//   useEffect(() => {
//     const lowercasedQuery = searchQuery.toLowerCase();
//     const filtered = tasks.filter(task =>
//         task.title.toLowerCase().includes(lowercasedQuery) ||
//         task.description.toLowerCase().includes(lowercasedQuery) ||
//         task.status.toLowerCase().includes(lowercasedQuery) ||
//         task.assignedTo.some(assignee => assignee.toLowerCase().includes(lowercasedQuery))
//     );
//     setFilteredTasks(filtered);
//   }, [searchQuery, tasks]);

//   const handleRefresh = () => setRefreshKey(k => k + 1);

//   const handleOpenDialog = (task = null) => {
//     setIsEditing(Boolean(task));
//     setCurrentTask(task ? { ...task } : initialTaskState);
//     setOpenDialog(true);
//   };

//   const handleCloseDialog = () => {
//     setOpenDialog(false);
//     setCurrentTask(null);
//   };

//   const handleSaveTask = async () => {
//     if (!currentTask.title || !currentTask.dueDate) {
//         alert("Task Title and Due Date are required.");
//         return;
//     }
//     setSubmitLoading(true);
//     await new Promise(resolve => setTimeout(resolve, 1000));

//     if (isEditing) {
//       setTasks(prevTasks =>
//         prevTasks.map(task => (task.id === currentTask.id ? currentTask : task))
//       );
//     } else {
//       setTasks(prevTasks => [
//         ...prevTasks,
//         { ...currentTask, id: tasks.length ? Math.max(...tasks.map(t=>t.id)) + 1 : 1 },
//       ]);
//     }
//     setSubmitLoading(false);
//     handleCloseDialog();
//   };

//   const handleOpenDeleteDialog = (task) => {
//     setTaskToDelete(task);
//     setOpenDeleteDialog(true);
//   };
//   const handleCloseDeleteDialog = () => {
//     setOpenDeleteDialog(false);
//     setTaskToDelete(null);
//   };

//   const handleDeleteTask = async () => {
//     if (!taskToDelete) return;
//     setTasks(prevTasks => prevTasks.filter(task => task.id !== taskToDelete.id));
//     handleCloseDeleteDialog();
//   };

//   const handleFormInputChange = (e) => {
//     const { name, value } = e.target;
//     setCurrentTask(prev => ({ ...prev, [name]: value }));
//   };
//   const handleDateChange = (date) => {
//     setCurrentTask(prev => ({ ...prev, dueDate: date }));
//   };
//   const handleAssignedToChange = (event) => {
//     const { value } = event.target;
//     setCurrentTask(prev => ({
//       ...prev,
//       assignedTo: typeof value === 'string' ? value.split(',').map(name => name.trim()).filter(name => name) : value,
//     }));
//   };

//   const getStatusChip = (status) => {
//     let color = "default";
//     let icon = <HourglassEmptyIcon />;
//     if (status === "Completed") { color = "success"; icon = <CheckCircleIcon />; }
//     else if (status === "In Progress") { color = "info"; icon = <AccessTimeIcon />; }
//     else if (status === "Not Started") { color = "warning"; icon = <ListIcon />; }
//     else if (status === "On Hold") { color = "error"; icon = <PauseCircleIcon />; }
//     else if (status === "Cancelled") { color = "error"; icon = <CancelIcon/>; }
//     return <Chip icon={icon} label={status} color={color} size="small" variant="outlined"/>;
//   };

//   const getProgressColor = (completion) => {
//     if (completion < 30) return 'error';
//     if (completion < 70) return 'warning';
//     return 'success';
//   };

//   const completedCount = tasks.filter(t => t.status === "Completed").length;
//   const inProgressCount = tasks.filter(t => t.status === "In Progress").length;
//   const notStartedCount = tasks.filter(t => t.status === "Not Started").length;
//   const overdueCount = tasks.filter(t => t.status !== "Completed" && t.dueDate && new Date(t.dueDate) < new Date() && !(t.status === "On Hold" || t.status === "Cancelled")).length;


//   return (
//     <LocalizationProvider dateAdapter={AdapterDateFns}>
//     <Box sx={{ p: { xs: 2, sm: 3 } }}>
//       <Card
//         elevation={0}
//         sx={{
//           mb: 3, borderRadius: 2,
//           background: "linear-gradient(135deg, rgba(36, 73, 239, 0.03) 0%, rgba(218, 18, 202, 0.03) 100%)",
//           borderLeft: "5px solid",
//           borderImage: "linear-gradient(135deg, rgba(36, 73, 239, 0.89) 0%, rgb(218, 18, 202) 100%) 1",
//         }}
//       >
//         <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
//           <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
//             <AssignmentTurnedInIcon sx={{ fontSize: '2rem', mr: 1, color: 'primary.main' }} />
//             <Typography variant="h4" sx={{ fontWeight: 700, color: "text.primary" }}>
//               Task Management
//             </Typography>
//           </Box>
//           <Typography variant="body2" color="text.secondary">
//             Organize, track, and manage your project tasks efficiently.
//           </Typography>
//         </CardContent>
//       </Card>

//       <Grid container spacing={2.5} sx={{ mb: 3 }}>
//         <StatCard title="Total Completed" value={completedCount} icon={<CheckCircleIcon />} gradient="linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%)" />
//         <StatCard title="In Progress" value={inProgressCount} icon={<AccessTimeIcon />} gradient="linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)" />
//         <StatCard title="Not Started" value={notStartedCount} icon={<ListIcon />} gradient="linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%)" />
//         <StatCard title="Overdue Tasks" value={overdueCount} icon={<PauseCircleIcon />} gradient="linear-gradient(135deg, #ffebee 0%, #ffcdd2 100%)" />
//       </Grid>

//       <Paper sx={{ p: 2.5, mb: 3, borderRadius: 2, boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
//         <Grid container spacing={2} alignItems="center">
//             <Grid item xs={12} sm={6} md={8}>
//                 <TextField
//                     fullWidth
//                     variant="outlined"
//                     placeholder="Search Tasks by Title, Description, Assignee, Status..."
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                     InputProps={{
//                     startAdornment: (<InputAdornment position="start"><SearchIcon color="action" /></InputAdornment>),
//                     }}
//                     sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
//                 />
//             </Grid>
//             <Grid item xs={12} sm={6} md={4} sx={{ display: 'flex', justifyContent: {xs: 'flex-start', sm: 'flex-end'}, gap: 1 }}>
//                 <Tooltip title="Refresh Tasks">
//                     <IconButton onClick={handleRefresh} color="primary" sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
//                         <RefreshIcon />
//                     </IconButton>
//                 </Tooltip>
//                 <Button
//                     startIcon={<AddIcon />}
//                     onClick={() => handleOpenDialog()}
//                     sx={{ ...gradientButtonStyle, py: 1.25, px: 3 }}
//                 >
//                     Add Task
//                 </Button>
//             </Grid>
//         </Grid>
//       </Paper>

//       {loading ? (
//         <Grid container spacing={2.5}>
//             {Array.from(new Array(4)).map((_, index) => (<TaskCardSkeleton key={index} />))}
//         </Grid>
//       ) : filteredTasks.length === 0 ? (
//           <Paper sx={{textAlign: 'center', p:5, borderRadius: 2, mt: 2}}>
//               <AssignmentTurnedInIcon sx={{fontSize: 60, color: 'text.disabled', mb: 2}}/>
//               <Typography variant="h6" color="text.secondary">
//                   {searchQuery ? "No tasks match your search." : "No tasks found."}
//               </Typography>
//                 <Typography variant="body2" color="text.secondary" sx={{mt:1}}>
//                   {searchQuery ? "Try a different search term." : "Click 'Add Task' to create a new one."}
//               </Typography>
//           </Paper>
//       ) : (
//         <Grid container spacing={2.5}>
//             {filteredTasks.map((task) => (
//             <Grid item xs={12} md={6} lg={4} key={task.id}>
//                 <Card sx={{ borderRadius: 2, height: '100%', display: 'flex', flexDirection: 'column', transition: 'box-shadow 0.3s', '&:hover': {boxShadow: 6} }}>
//                 <CardContent sx={{ flexGrow: 1, pb:1 }}>
//                     <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems:'flex-start', mb:1}}>
//                         <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', color: 'primary.dark', flexGrow:1, mr:1 }}>
//                             {task.title}
//                         </Typography>
//                         {getStatusChip(task.status)}
//                     </Box>
//                     <Typography variant="caption" color="textSecondary" display="block" gutterBottom>
//                         Due: {task.dueDate ? format(new Date(task.dueDate), 'dd MMM, yyyy') : 'N/A'}
//                     </Typography>
//                     <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5, minHeight: '40px',
//                         display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', textOverflow: 'ellipsis'
//                     }}>
//                         {task.description}
//                     </Typography>
//                     <Box sx={{ width: '100%', mb:0.5 }}>
//                         <LinearProgress variant="determinate" value={task.completion} color={getProgressColor(task.completion)} sx={{ height: 8, borderRadius: 5 }} />
//                     </Box>
//                     <Typography variant="caption" color="text.secondary">
//                         {task.completion}% Completed
//                     </Typography>
//                 </CardContent>
//                 <CardActions sx={{ p:1.5, borderTop: '1px solid', borderColor: 'divider', display: 'flex', justifyContent: 'space-between', bgcolor: 'grey.50' }}>
//                     <Box sx={{ display: 'flex' }}>
//                         {task.assignedTo.slice(0, 3).map((name, index) => (
//                             <Tooltip title={name} key={index}>
//                                 <Avatar sx={{ width: 32, height: 32, mr: -1, border: '2px solid white', bgcolor: 'secondary.main', fontSize: '0.8rem' }}>
//                                     {name[0].toUpperCase()}
//                                 </Avatar>
//                             </Tooltip>
//                         ))}
//                         {task.assignedTo.length > 3 && (
//                             <Tooltip title={task.assignedTo.slice(3).join(', ')}>
//                                 <Avatar sx={{ width: 32, height: 32, mr: -1, border: '2px solid white', bgcolor: 'grey.400', fontSize: '0.8rem' }}>
//                                     +{task.assignedTo.length - 3}
//                                 </Avatar>
//                             </Tooltip>
//                         )}
//                     </Box>
//                     <Box>
//                     <Tooltip title="Edit Task">
//                         <IconButton size="small" sx={{color: 'secondary.main'}} onClick={() => handleOpenDialog(task)}>
//                             <EditIcon fontSize="small"/>
//                         </IconButton>
//                     </Tooltip>
//                     <Tooltip title="Delete Task">
//                         <IconButton size="small" sx={{color: 'error.main'}} onClick={() => handleOpenDeleteDialog(task)}>
//                             <DeleteIcon fontSize="small"/>
//                         </IconButton>
//                     </Tooltip>
//                     </Box>
//                 </CardActions>
//                 </Card>
//             </Grid>
//             ))}
//         </Grid>
//       )}

//       {/* Add/Edit Dialog */}
//       <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: 3 } }}>
//         <DialogTitle sx={{ ...gradientButtonStyle, color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1.5 }}>
//           {isEditing ? "Edit Task" : "Add New Task"}
//           <IconButton onClick={handleCloseDialog} sx={{ color: 'rgba(255,255,255,0.8)', '&:hover': {color: 'white'} }}>
//             <CloseIcon />
//           </IconButton>
//         </DialogTitle>
//         <DialogContent dividers sx={{ p: { xs: 2, sm: 3 }, backgroundColor: 'grey.50' }}>
//           <Grid container spacing={2.5}>
//             <Grid item xs={12}>
//               <TextField label="Task Title" name="title" value={currentTask?.title || ""} onChange={handleFormInputChange} fullWidth required margin="dense" sx={{"& .MuiOutlinedInput-root": {borderRadius:2}}} InputProps={{startAdornment: <InputAdornment position="start"><AssignmentTurnedInIcon fontSize="small" /></InputAdornment>}} />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField label="Description" name="description" value={currentTask?.description || ""} onChange={handleFormInputChange} fullWidth multiline rows={3} margin="dense" sx={{"& .MuiOutlinedInput-root": {borderRadius:2}}} InputProps={{startAdornment: <InputAdornment position="start"><DescriptionOutlinedIcon fontSize="small" /></InputAdornment>}} />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <DatePicker label="Due Date *" value={currentTask?.dueDate || null} onChange={handleDateChange} renderInput={(params) => <TextField {...params} fullWidth required margin="dense" sx={{"& .MuiOutlinedInput-root": {borderRadius:2}}} InputProps={{...params.InputProps, startAdornment: <InputAdornment position="start"><EventIcon fontSize="small" /></InputAdornment>}} />} />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField label="Completion (%)" name="completion" type="number" value={currentTask?.completion || 0} onChange={handleFormInputChange} fullWidth margin="dense" InputProps={{ inputProps: { min: 0, max: 100 }, startAdornment: <InputAdornment position="start"><TrendingUpIcon fontSize="small" /></InputAdornment> }} sx={{"& .MuiOutlinedInput-root": {borderRadius:2}}} />
//             </Grid>
//              <Grid item xs={12} sm={6}>
//                 <TextField label="Assigned To (comma separated)" name="assignedTo" value={Array.isArray(currentTask?.assignedTo) ? currentTask.assignedTo.join(',') : (currentTask?.assignedTo || '')} onChange={handleAssignedToChange} fullWidth margin="dense" sx={{"& .MuiOutlinedInput-root": {borderRadius:2}}} InputProps={{startAdornment: <InputAdornment position="start"><PeopleOutlineIcon fontSize="small" /></InputAdornment>}} helperText="Enter names separated by commas"/>
//             </Grid>
//             <Grid item xs={12} sm={6}>
//                 <FormControl fullWidth margin="dense" sx={{"& .MuiOutlinedInput-root": {borderRadius:2}}}>
//                     <InputLabel id="task-status-label">Status</InputLabel>
//                     <Select labelId="task-status-label" label="Status" name="status" value={currentTask?.status || taskStatuses[0]} onChange={handleFormInputChange} startAdornment={<InputAdornment position="start"><HourglassEmptyIcon fontSize="small" /></InputAdornment>}>
//                         {taskStatuses.map(option => (<MenuItem key={option} value={option}>{option}</MenuItem>))}
//                     </Select>
//                 </FormControl>
//             </Grid>
//              <Grid item xs={12} sm={6}>
//                 <FormControl fullWidth margin="dense" sx={{"& .MuiOutlinedInput-root": {borderRadius:2}}}>
//                     <InputLabel id="task-priority-label">Priority</InputLabel>
//                     <Select labelId="task-priority-label" label="Priority" name="priority" value={currentTask?.priority || taskPriorities[1]} onChange={handleFormInputChange} startAdornment={<InputAdornment position="start"><FlagOutlinedIcon fontSize="small" /></InputAdornment>}>
//                         {taskPriorities.map(option => (<MenuItem key={option} value={option}>{option}</MenuItem>))}
//                     </Select>
//                 </FormControl>
//             </Grid>
//           </Grid>
//         </DialogContent>
//         <DialogActions sx={{ p: 2, backgroundColor: 'grey.50', borderTop: '1px solid', borderColor: 'divider' }}>
//           <Button onClick={handleCloseDialog} color="inherit" sx={{borderRadius:2}} disabled={submitLoading}>Cancel</Button>
//           <Button onClick={handleSaveTask} sx={{...gradientButtonStyle, minWidth: '120px', py: '10px', px: 3}} disabled={submitLoading}>
//             {submitLoading ? <CircularProgress size={24} color="inherit" /> : (isEditing ? <><SaveIcon sx={{mr:1}}/>Update Task</> : <><AddIcon sx={{mr:1}}/>Add Task</>)}
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* Delete Confirmation Dialog */}
//       <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog} PaperProps={{sx: {borderRadius: 3}}}>
//         <DialogTitle sx={{display: 'flex', alignItems: 'center'}}>
//             <WarningAmberIcon color="error" sx={{mr:1}}/> Confirm Deletion
//         </DialogTitle>
//         <DialogContent>
//           <Typography>Are you sure you want to delete the task: <strong>{taskToDelete?.title}</strong>?</Typography>
//         </DialogContent>
//         <DialogActions sx={{px:3, pb:2}}>
//           <Button onClick={handleCloseDeleteDialog} color="inherit" sx={{borderRadius:2}}>Cancel</Button>
//           <Button onClick={handleDeleteTask} variant="contained" color="error" sx={{borderRadius:2}}>
//             Delete
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//     </LocalizationProvider>
//   );
// }


import React, { useState, useEffect } from "react";
import axios from 'axios';
import {
  Box, Typography, Grid, Card, CardContent, CardActions, Button,
  LinearProgress, Avatar, IconButton, Dialog, DialogActions, DialogContent,
  DialogTitle, TextField, Paper, Tooltip, Skeleton, CircularProgress,
  InputAdornment, Chip, MenuItem, FormControl, InputLabel, Select
} from "@mui/material";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { format, parse, isValid, startOfToday } from 'date-fns';
import CancelIcon from '@mui/icons-material/Cancel';

// Icons
import {
  List as ListIcon,
  CheckCircle as CheckCircleIcon,
  AccessTime as AccessTimeIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  AssignmentTurnedIn as AssignmentTurnedInIcon,
  Search as SearchIcon,
  Refresh as RefreshIcon,
  Close as CloseIcon,
  Save as SaveIcon,
  Event as EventIcon,
  PeopleOutline as PeopleOutlineIcon,
  DescriptionOutlined as DescriptionOutlinedIcon,
  TrendingUp as TrendingUpIcon,
  HourglassEmpty as HourglassEmptyIcon,
  WarningAmber as WarningAmberIcon,
  PauseCircle as PauseCircleIcon,
  FlagOutlined as FlagOutlinedIcon,
  FolderSpecialOutlined as FolderSpecialOutlinedIcon,
} from "@mui/icons-material";

// --- Axios API Client Setup ---
const apiClient = axios.create({
  baseURL: 'https://tdtlworld.com/hrms-backend/api/',
  headers: {
    'Content-Type': 'application/json',
  }
});

// Helper to format Date object to yyyy-MM-dd string
const formatDateToInput = (dateObj) => {
  if (!dateObj || !(dateObj instanceof Date) || isNaN(dateObj)) return '';
  return format(dateObj, 'yyyy-MM-dd');
};

// Helper to parse yyyy-MM-dd (or other) string to Date object
const parseInputToDate = (dateString) => {
  if (!dateString) return null;
  let parsedDate = parse(dateString, 'yyyy-MM-dd', new Date());
  if (isValid(parsedDate)) return parsedDate;
  parsedDate = parse(dateString, 'dd/MM/yyyy', new Date());
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

// Skeleton for Task Card
const TaskCardSkeleton = () => (
  <Grid item xs={12} md={6} lg={4}>
    <Card sx={{ borderRadius: 2, height: '100%' }}>
      <CardContent>
        <Skeleton variant="text" width="70%" height={30} />
        <Skeleton variant="text" width="50%" sx={{ mt: 1 }} />
        <Skeleton variant="rectangular" height={40} sx={{ my: 1, borderRadius: 1 }} />
        <Skeleton variant="text" width="40%" height={20} />
        <Skeleton variant="rectangular" height={10} sx={{ my: 1, borderRadius: 5 }} />
        <Skeleton variant="text" width="30%" />
      </CardContent>
      <CardActions sx={{ justifyContent: 'space-between', p: 1.5, borderTop: '1px solid', borderColor: 'divider' }}>
        <Box sx={{ display: 'flex' }}>
          <Skeleton variant="circular" width={32} height={32} sx={{ mr: 1 }} />
          <Skeleton variant="circular" width={32} height={32} />
        </Box>
        <Box>
          <Skeleton variant="circular" width={32} height={32} sx={{ display: 'inline-block', mr: 1 }} />
          <Skeleton variant="circular" width={32} height={32} sx={{ display: 'inline-block' }} />
        </Box>
      </CardActions>
    </Card>
  </Grid>
);

// Summary Stat Card Component
const StatCard = ({ title, value, icon, gradient }) => (
  <Grid item xs={12} sm={6} md={3}>
    <Card sx={{ textAlign: "center", borderRadius: 2, background: gradient, color: "rgba(0,0,0,0.75)", transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out', boxShadow: 3, '&:hover': { transform: 'scale(1.04)', boxShadow: "0 10px 25px rgba(0,0,0,0.2)", '& .MuiCardContent-root': { '& .MuiSvgIcon-root': { color: 'primary.main' } } } }}>
      <CardContent sx={{ py: 3 }}>
        {React.cloneElement(icon, { sx: { fontSize: "2.5rem", mb: 1, color: 'primary.dark' } })}
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>{value}</Typography>
        <Typography variant="body2">{title}</Typography>
      </CardContent>
    </Card>
  </Grid>
);

const taskStatuses = ["Not Started", "In Progress", "On Hold", "Completed", "Cancelled"];
const taskPriorities = ["High", "Medium", "Low"];

// --- API Data Mappings ---
const statusToApi = { "Not Started": "0", "In Progress": "1", "On Hold": "2", "Completed": "3", "Cancelled": "4" };
const statusFromApi = { "0": "Not Started", "1": "In Progress", "2": "On Hold", "3": "Completed", "4": "Cancelled" };

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const [openDialog, setOpenDialog] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);

  const [projectsList, setProjectsList] = useState([]);
  const [projectsLoading, setProjectsLoading] = useState(true);
  const [employees, setEmployees] = useState([]);
  const [employeesLoading, setEmployeesLoading] = useState(false);

  const initialTaskState = {
    id: "",
    title: "",
    description: "",
    dueDate: null,
    startDate: null,
    completion: 0,
    assignedTo: [],
    status: taskStatuses[0],
    priority: taskPriorities[1],
    projectId: "",
  };

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  // Fetch projects list on component mount
  useEffect(() => {
    const fetchProjects = async () => {
      setProjectsLoading(true);
      try {
        const response = await apiClient.get('/projects/');
        setProjectsList(response.data || []);
      } catch (error) {
        console.error("Failed to fetch projects list:", error);
        alert("Could not fetch the list of projects. Please try refreshing.");
      } finally {
        setProjectsLoading(false);
      }
    };
    fetchProjects();
  }, []);

  // Fetch employees list on component mount
  useEffect(() => {
    const fetchEmployees = async () => {
      setEmployeesLoading(true);
      try {
        const response = await axios.get('https://tdtlworld.com/hrms-backend/employee-dropdown/');
        setEmployees(response.data || []);
      } catch (error) {
        console.error("Failed to fetch employees:", error);
        alert("Could not fetch employee list. Please try refreshing.");
      } finally {
        setEmployeesLoading(false);
      }
    };
    fetchEmployees();
  }, []);

  // Fetch tasks from API
  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      try {
        const response = await apiClient.get('/tasks/');
        const tasksFromApi = response.data || [];

        const processedData = tasksFromApi.map(task => {
          const project = projectsList.find(p => p.title === task.project_title);

          // Get all employee names from the employees list
          const employeeNames = employees.map(e => e.label);

          // Handle assigned_to data properly
          let assignedNames = [];
          if (Array.isArray(task.assigned_to)) {
            assignedNames = task.assigned_to.map(user => {
              if (typeof user === 'string') {
                // If the name exists in our employee list, use it
                if (employeeNames.includes(user)) return user;
                // Otherwise try to find a matching employee
                const foundEmployee = employees.find(e => 
                  e.label.toLowerCase() === user.toLowerCase() ||
                  e.value.toString() === user
                );
                return foundEmployee ? foundEmployee.label : user;
              } else if (user && typeof user === 'object') {
                // If it's an object, try to match with our employee list
                const fullName = `${user.first_name || ''} ${user.last_name || ''}`.trim();
                const foundEmployee = employees.find(e => 
                  e.label.toLowerCase() === fullName.toLowerCase() ||
                  e.value.toString() === user.id?.toString()
                );
                return foundEmployee ? foundEmployee.label : fullName;
              }
              return '';
            }).filter(Boolean);
          }

          return {
            id: task.task_id,
            title: task.task_name,
            description: task.description,
            dueDate: parseInputToDate(task.end_date),
            startDate: parseInputToDate(task.start_date),
            completion: parseInt(task.task_progress, 10) || 0,
            status: statusFromApi[task.task_status] || "Not Started",
            priority: task.priority || "Medium",
            assignedTo: assignedNames,
            projectId: project ? project.id : "",
          };
        });
        setTasks(processedData);
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
        alert("Could not fetch tasks. Please try refreshing.");
        setTasks([]);
      } finally {
        setLoading(false);
      }
    };

    if (!projectsLoading && !employeesLoading) {
      fetchTasks();
    }
  }, [refreshKey, projectsLoading, projectsList, employeesLoading, employees]);

  // Filter tasks based on search query
  useEffect(() => {
    const lowercasedQuery = searchQuery.toLowerCase();
    const filtered = tasks.filter(task => {
      const title = task.title || '';
      const description = task.description || '';
      const status = task.status || '';
      const assignedTo = task.assignedTo || [];

      return (
        title.toLowerCase().includes(lowercasedQuery) ||
        description.toLowerCase().includes(lowercasedQuery) ||
        status.toLowerCase().includes(lowercasedQuery) ||
        assignedTo.some(assignee =>
          (assignee || '').toLowerCase().includes(lowercasedQuery)
        )
      );
    });
    setFilteredTasks(filtered);
  }, [searchQuery, tasks]);

  const handleRefresh = () => setRefreshKey(k => k + 1);

  const handleOpenDialog = (task = null) => {
    setIsEditing(Boolean(task));
    setCurrentTask(task ? { ...task } : initialTaskState);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentTask(null);
  };

  const handleSaveTask = async () => {
    if (!currentTask?.title || !currentTask?.dueDate || !currentTask?.projectId) {
      alert("Task Title, Due Date, and Project are required.");
      return;
    }
    setSubmitLoading(true);

    const project = projectsList.find(p => p.id === currentTask.projectId);
    if (!project) {
      alert("Selected project not found. Please refresh the page.");
      setSubmitLoading(false);
      return;
    }

    // Prepare payload for the API
    const payload = {
      project_title: project.title,
      task_name: currentTask.title,
      description: currentTask.description,
      start_date: formatDateToInput(currentTask.startDate || startOfToday()),
      end_date: formatDateToInput(currentTask.dueDate),
      task_progress: String(currentTask.completion),
      assigned_to: Array.isArray(currentTask.assignedTo) ? currentTask.assignedTo.join(',') : '',
      task_status: statusToApi[currentTask.status] || "0",
      priority: currentTask.priority || "Medium",
    };

    try {
      if (isEditing) {
        if (!currentTask.id) {
          throw new Error("Task ID is missing for update operation");
        }
        await apiClient.patch(`/tasks/${currentTask.id}/`, payload);
      } else {
        await apiClient.post('/tasks/', payload);
      }
      handleRefresh();
      handleCloseDialog();
    } catch (error) {
      console.error("Failed to save task:", error.response?.data || error.message);
      let errorMessage = "Failed to save task.";
      if (error.response?.data) {
        if (typeof error.response.data === 'object') {
          errorMessage = Object.entries(error.response.data)
            .map(([field, errors]) => `${field}: ${Array.isArray(errors) ? errors.join(', ') : errors}`)
            .join('\n');
        } else {
          errorMessage = error.response.data;
        }
      }
      alert(errorMessage);
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleOpenDeleteDialog = (task) => {
    setTaskToDelete(task);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setTaskToDelete(null);
  };

  const handleDeleteTask = async () => {
    if (!taskToDelete?.id) {
      alert("Task ID is missing for deletion");
      return;
    }

    try {
      await apiClient.delete(`/tasks/${taskToDelete.id}/`);
      handleRefresh();
      handleCloseDeleteDialog();
    } catch (error) {
      console.error("Failed to delete task:", error.response?.data || error.message);
      alert(`Failed to delete task: ${error.response?.data?.detail || error.message}`);
    }
  };

  const handleFormInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentTask(prev => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date) => {
    setCurrentTask(prev => ({ ...prev, dueDate: date }));
  };

  const handleAssignedToChange = (event) => {
    const { value } = event.target;
    setCurrentTask(prev => ({
      ...prev,
      assignedTo: typeof value === 'string' ? value.split(',') : value,
    }));
  };

  const getStatusChip = (status) => {
    let color = "default", icon = <HourglassEmptyIcon />;
    if (status === "Completed") { color = "success"; icon = <CheckCircleIcon />; }
    else if (status === "In Progress") { color = "info"; icon = <AccessTimeIcon />; }
    else if (status === "Not Started") { color = "warning"; icon = <ListIcon />; }
    else if (status === "On Hold") { color = "default"; icon = <PauseCircleIcon />; }
    else if (status === "Cancelled") { color = "error"; icon = <CancelIcon />; }
    return <Chip icon={icon} label={status} color={color} size="small" variant="outlined" />;
  };

  const getProgressColor = (completion) => {
    if (completion < 30) return 'error';
    if (completion < 70) return 'warning';
    return 'success';
  };

  const completedCount = tasks.filter(t => t.status === "Completed").length;
  const inProgressCount = tasks.filter(t => t.status === "In Progress").length;
  const notStartedCount = tasks.filter(t => t.status === "Not Started").length;
  const overdueCount = tasks.filter(t => t.status !== "Completed" && t.dueDate && new Date(t.dueDate) < new Date() && !(t.status === "On Hold" || t.status === "Cancelled")).length;

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ p: { xs: 2, sm: 3 } }}>
        <Card elevation={0} sx={{ mb: 3, borderRadius: 2, background: "linear-gradient(135deg, rgba(36, 73, 239, 0.03) 0%, rgba(218, 18, 202, 0.03) 100%)", borderLeft: "5px solid", borderImage: "linear-gradient(135deg, rgba(36, 73, 239, 0.89) 0%, rgb(218, 18, 202) 100%) 1" }}>
          <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}><AssignmentTurnedInIcon sx={{ fontSize: '2rem', mr: 1, color: 'primary.main' }} /><Typography variant="h4" sx={{ fontWeight: 700, color: "text.primary" }}>Task Management</Typography></Box>
            <Typography variant="body2" color="text.secondary">Organize, track, and manage your project tasks efficiently.</Typography>
          </CardContent>
        </Card>

        <Grid container spacing={2.5} sx={{ mb: 3 }}>
          <StatCard title="Total Completed" value={loading ? <CircularProgress size={20} /> : completedCount} icon={<CheckCircleIcon />} gradient="linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%)" />
          <StatCard title="In Progress" value={loading ? <CircularProgress size={20} /> : inProgressCount} icon={<AccessTimeIcon />} gradient="linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)" />
          <StatCard title="Not Started" value={loading ? <CircularProgress size={20} /> : notStartedCount} icon={<ListIcon />} gradient="linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%)" />
          <StatCard title="Overdue Tasks" value={loading ? <CircularProgress size={20} /> : overdueCount} icon={<WarningAmberIcon />} gradient="linear-gradient(135deg, #ffebee 0%, #ffcdd2 100%)" />
        </Grid>

        <Paper sx={{ p: 2.5, mb: 3, borderRadius: 2, boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={6} md={8}><TextField fullWidth variant="outlined" placeholder="Search Tasks by Title, Description, Assignee, Status..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} InputProps={{ startAdornment: (<InputAdornment position="start"><SearchIcon color="action" /></InputAdornment>), }} sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} /></Grid>
            <Grid item xs={12} sm={6} md={4} sx={{ display: 'flex', justifyContent: { xs: 'flex-start', sm: 'flex-end' }, gap: 1 }}>
              <Tooltip title="Refresh Tasks"><IconButton onClick={handleRefresh} color="primary" sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2 }}><RefreshIcon /></IconButton></Tooltip>
              <Button startIcon={<AddIcon />} onClick={() => handleOpenDialog()} sx={{ ...gradientButtonStyle, py: 1.25, px: 3 }}>Add Task</Button>
            </Grid>
          </Grid>
        </Paper>

        {loading ? (
          <Grid container spacing={2.5}>{Array.from(new Array(6)).map((_, index) => (<TaskCardSkeleton key={index} />))}</Grid>
        ) : filteredTasks.length === 0 ? (
          <Paper sx={{ textAlign: 'center', p: 5, borderRadius: 2, mt: 2 }}><AssignmentTurnedInIcon sx={{ fontSize: 60, color: 'text.disabled', mb: 2 }} /><Typography variant="h6" color="text.secondary">{searchQuery ? "No tasks match your search." : "No tasks found."}</Typography><Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>{searchQuery ? "Try a different search term." : "Click 'Add Task' to create a new one."}</Typography></Paper>
        ) : (
          <Grid container spacing={2.5}>
            {filteredTasks.map((task) => (
              <Grid item xs={12} md={6} lg={4} key={task.id}>
                <Card sx={{ borderRadius: 2, height: '100%', display: 'flex', flexDirection: 'column', transition: 'box-shadow 0.3s', '&:hover': { boxShadow: 6 } }}>
                  <CardContent sx={{ flexGrow: 1, pb: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}><Typography variant="h6" component="div" sx={{ fontWeight: 'bold', color: 'primary.dark', flexGrow: 1, mr: 1 }}>{task.title}</Typography>{getStatusChip(task.status)}</Box>
                    <Typography variant="caption" color="textSecondary" display="block" gutterBottom>Due: {task.dueDate ? format(new Date(task.dueDate), 'dd MMM, yyyy') : 'N/A'}</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5, minHeight: '40px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', textOverflow: 'ellipsis' }}>{task.description}</Typography>
                    <Box sx={{ width: '100%', mb: 0.5 }}><LinearProgress variant="determinate" value={task.completion} color={getProgressColor(task.completion)} sx={{ height: 8, borderRadius: 5 }} /></Box>
                    <Typography variant="caption" color="text.secondary">{task.completion}% Completed</Typography>
                  </CardContent>
                  <CardActions sx={{ p: 1.5, borderTop: '1px solid', borderColor: 'divider', display: 'flex', justifyContent: 'space-between', bgcolor: 'grey.50' }}>
                    <Box sx={{ display: 'flex' }}>
                      {task.assignedTo.slice(0, 3).map((name, index) => (<Tooltip title={name} key={index}><Avatar sx={{ width: 32, height: 32, mr: -1, border: '2px solid white', bgcolor: 'secondary.main', fontSize: '0.8rem' }}>{name.charAt(0).toUpperCase()}</Avatar></Tooltip>))}
                      {task.assignedTo.length > 3 && (<Tooltip title={task.assignedTo.slice(3).join(', ')}><Avatar sx={{ width: 32, height: 32, mr: -1, border: '2px solid white', bgcolor: 'grey.400', fontSize: '0.8rem' }}>+{task.assignedTo.length - 3}</Avatar></Tooltip>)}
                    </Box>
                    <Box>
                      <Tooltip title="Edit Task"><IconButton size="small" sx={{ color: 'secondary.main' }} onClick={() => handleOpenDialog(task)}><EditIcon fontSize="small" /></IconButton></Tooltip>
                      <Tooltip title="Delete Task"><IconButton size="small" sx={{ color: 'error.main' }} onClick={() => handleOpenDeleteDialog(task)}><DeleteIcon fontSize="small" /></IconButton></Tooltip>
                    </Box>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        {/* Add/Edit Dialog */}
        <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: 3 } }}>
          <DialogTitle sx={{ ...gradientButtonStyle, color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1.5 }}>{isEditing ? "Edit Task" : "Add New Task"}<IconButton onClick={handleCloseDialog} sx={{ color: 'rgba(255,255,255,0.8)', '&:hover': { color: 'white' } }}><CloseIcon /></IconButton></DialogTitle>
          <DialogContent dividers sx={{ p: { xs: 2, sm: 3 }, backgroundColor: 'grey.50' }}>
            <Grid container spacing={2.5}>
              <Grid item xs={12}><TextField label="Task Title" name="title" value={currentTask?.title || ""} onChange={handleFormInputChange} fullWidth required margin="dense" sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }} InputProps={{ startAdornment: <InputAdornment position="start"><AssignmentTurnedInIcon fontSize="small" /></InputAdornment> }} /></Grid>
              <Grid item xs={12}><TextField label="Description" name="description" value={currentTask?.description || ""} onChange={handleFormInputChange} fullWidth multiline rows={3} margin="dense" sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }} InputProps={{ startAdornment: <InputAdornment position="start"><DescriptionOutlinedIcon fontSize="small" /></InputAdornment> }} /></Grid>

              <Grid item xs={12}>
                <FormControl fullWidth required margin="dense" sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}>
                  <InputLabel id="project-select-label">Project</InputLabel>
                  <Select
                    labelId="project-select-label"
                    label="Project *"
                    name="projectId"
                    value={currentTask?.projectId || ""}
                    onChange={handleFormInputChange}
                    disabled={projectsLoading}
                    startAdornment={<InputAdornment position="start"><FolderSpecialOutlinedIcon fontSize="small" /></InputAdornment>}
                  >
                    {projectsLoading ? (
                      <MenuItem value="" disabled><em>Loading projects... <CircularProgress size={16} sx={{ verticalAlign: 'middle', ml: 1 }} /></em></MenuItem>
                    ) : projectsList.length === 0 ? (
                      <MenuItem value="" disabled><em>No projects found.</em></MenuItem>
                    ) : (
                      projectsList.map(project => (
                        <MenuItem key={project.id} value={project.id}>
                          {project.title}
                        </MenuItem>
                      ))
                    )}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}><DatePicker label="Due Date *" value={currentTask?.dueDate || null} onChange={handleDateChange} renderInput={(params) => <TextField {...params} fullWidth required margin="dense" sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }} InputProps={{ ...params.InputProps, startAdornment: <InputAdornment position="start"><EventIcon fontSize="small" /></InputAdornment> }} />} /></Grid>
              <Grid item xs={12} sm={6}><TextField label="Completion (%)" name="completion" type="number" value={currentTask?.completion || 0} onChange={handleFormInputChange} fullWidth margin="dense" InputProps={{ inputProps: { min: 0, max: 100 }, startAdornment: <InputAdornment position="start"><TrendingUpIcon fontSize="small" /></InputAdornment> }} sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }} /></Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth margin="dense" sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}>
                  <InputLabel id="assigned-to-label">Assigned To</InputLabel>
                  <Select
                    labelId="assigned-to-label"
                    label="Assigned To"
                    name="assignedTo"
                    multiple
                    value={currentTask?.assignedTo || []}
                    onChange={handleAssignedToChange}
                    renderValue={(selected) => selected.join(', ')}
                    startAdornment={
                      <InputAdornment position="start">
                        <PeopleOutlineIcon fontSize="small" />
                      </InputAdornment>
                    }
                  >
                    {employeesLoading ? (
                      <MenuItem disabled>
                        <CircularProgress size={24} />
                      </MenuItem>
                    ) : (
                      employees.map((employee) => (
                        <MenuItem 
                          key={employee.value} 
                          value={employee.label}
                          selected={currentTask?.assignedTo?.includes(employee.label)}
                        >
                          {employee.label} ({employee.email})
                        </MenuItem>
                      ))
                    )}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}><FormControl fullWidth margin="dense" sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}><InputLabel id="task-status-label">Status</InputLabel><Select labelId="task-status-label" label="Status" name="status" value={currentTask?.status || taskStatuses[0]} onChange={handleFormInputChange} startAdornment={<InputAdornment position="start"><HourglassEmptyIcon fontSize="small" /></InputAdornment>}>{taskStatuses.map(option => (<MenuItem key={option} value={option}>{option}</MenuItem>))}</Select></FormControl></Grid>
              <Grid item xs={12} sm={6}><FormControl fullWidth margin="dense" sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}><InputLabel id="task-priority-label">Priority</InputLabel><Select labelId="task-priority-label" label="Priority" name="priority" value={currentTask?.priority || taskPriorities[1]} onChange={handleFormInputChange} startAdornment={<InputAdornment position="start"><FlagOutlinedIcon fontSize="small" /></InputAdornment>}>{taskPriorities.map(option => (<MenuItem key={option} value={option}>{option}</MenuItem>))}</Select></FormControl></Grid>
            </Grid>
          </DialogContent>
          <DialogActions sx={{ p: 2, backgroundColor: 'grey.50', borderTop: '1px solid', borderColor: 'divider' }}>
            <Button onClick={handleCloseDialog} color="inherit" sx={{ borderRadius: 2 }} disabled={submitLoading}>Cancel</Button>
            <Button onClick={handleSaveTask} sx={{ ...gradientButtonStyle, minWidth: '120px', py: '10px', px: 3 }} disabled={submitLoading}>{submitLoading ? <CircularProgress size={24} color="inherit" /> : (isEditing ? <><SaveIcon sx={{ mr: 1 }} />Update Task</> : <><AddIcon sx={{ mr: 1 }} />Add Task</>)}</Button>
          </DialogActions>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog} PaperProps={{ sx: { borderRadius: 3 } }}>
          <DialogTitle sx={{ display: 'flex', alignItems: 'center' }}><WarningAmberIcon color="error" sx={{ mr: 1 }} /> Confirm Deletion</DialogTitle>
          <DialogContent><Typography>Are you sure you want to delete the task: <strong>{taskToDelete?.title}</strong>?</Typography></DialogContent>
          <DialogActions sx={{ px: 3, pb: 2 }}><Button onClick={handleCloseDeleteDialog} color="inherit" sx={{ borderRadius: 2 }}>Cancel</Button><Button onClick={handleDeleteTask} variant="contained" color="error" sx={{ borderRadius: 2 }}>Delete</Button></DialogActions>
        </Dialog>
      </Box>
    </LocalizationProvider>
  );
}