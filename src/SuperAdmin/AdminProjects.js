// // // // import React, { useEffect, useState } from "react";
// // // // import {
// // // //   Box, Typography, Grid, Card, CardContent, CardActions, Button, Avatar,
// // // //   Dialog, DialogTitle, DialogContent, DialogActions, TextField, IconButton,
// // // //   Paper, Tooltip, Skeleton, CircularProgress, InputAdornment, Chip,
// // // //   FormControl, InputLabel, Select, MenuItem // For status/priority dropdowns
// // // // } from "@mui/material";

// // // // import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// // // // import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
// // // // import { format, parseISO, isValid } from 'date-fns'; // parseISO for date strings from server
// // // // import axiosInstance from "../utils/axiosInstance";

// // // // // Icons
// // // // import {
// // // //   Edit as EditIcon,
// // // //   Delete as DeleteIcon,
// // // //   AddBox as AddBoxIcon,
// // // //   WorkOutline as WorkOutlineIcon,
// // // //   Search as SearchIcon,
// // // //   Refresh as RefreshIcon,
// // // //   Close as CloseIcon,
// // // //   Save as SaveIcon,
// // // //   Event as EventIcon,
// // // //   PersonOutline as PersonOutlineIcon,
// // // //   FlagOutlined as FlagOutlinedIcon,
// // // //   Notes as NotesIcon,
// // // //   TrendingUp as TrendingUpIcon,
// // // //   MonetizationOnOutlined as BudgetIcon,
// // // //   WarningAmber as WarningAmberIcon,
// // // //   Group as GroupIcon,         // For Summary Card
// // // //   Folder as FolderIcon,       // For Summary Card
// // // //   Timeline as TimelineIcon,   // For Summary Card & Associated Goals
// // // //   PauseCircle as PauseCircleIcon, // For Summary Card
// // // //   ConfirmationNumber as ConfirmationNumberIcon, // Added
// // // //   CheckCircleOutline as CheckCircleOutlineIcon, // Added
// // // //   Cancel as CancelIcon,                         // Added
// // // //   PeopleAlt as PeopleAltIcon, // Should be there, for Client ID, Added By
// // // //   Business as BusinessIcon,   // Should be there, for Company ID
// // // // } from "@mui/icons-material";
// // // // import FormControlLabel from '@mui/material/FormControlLabel'; // Added

// // // // // Gradient button style (reusable)
// // // // const gradientButtonStyle = {
// // // //   background: 'linear-gradient(135deg, rgba(36, 73, 239, 0.89) 0%, rgb(218, 18, 202) 100%)',
// // // //   color: 'white',
// // // //   borderRadius: 2,
// // // //   fontWeight: 600,
// // // //   boxShadow: '0 4px 10px rgba(36, 73, 239, 0.3)',
// // // //   transition: 'all 0.3s ease',
// // // //   '&:hover': {
// // // //     background: 'linear-gradient(135deg, rgba(36, 73, 239, 1) 0%, rgb(218, 18, 202, 1) 100%)',
// // // //     boxShadow: '0 6px 15px rgba(36, 73, 239, 0.4)',
// // // //     transform: 'translateY(-2px)',
// // // //   },
// // // //   '&.Mui-disabled': {
// // // //     background: 'rgba(0, 0, 0, 0.12)',
// // // //     color: 'rgba(0, 0, 0, 0.26)',
// // // //     boxShadow: 'none',
// // // //   }
// // // // };

// // // // // Helper to format Date object to yyyy-MM-dd string
// // // // const formatDateToInput = (dateObj) => {
// // // //   if (!dateObj || !(dateObj instanceof Date) || isNaN(dateObj)) return '';
// // // //   return format(dateObj, 'yyyy-MM-dd');
// // // // };

// // // // // Helper to parse yyyy-MM-dd string to Date object
// // // // const parseInputToDate = (dateString) => {
// // // //   if (!dateString) return null;
// // // //   const parsed = parseISO(dateString); // parseISO is good for yyyy-MM-dd
// // // //   return isValid(parsed) ? parsed : null;
// // // // };

// // // // // Skeleton for Project Card
// // // // const ProjectCardSkeleton = () => (
// // // //   <Grid item xs={12} md={6}>
// // // //     <Card sx={{ borderRadius: 2, height: '100%' }}>
// // // //       <CardContent>
// // // //         <Skeleton variant="text" width="70%" height={30} />
// // // //         <Skeleton variant="text" width="50%" sx={{ mt: 1 }}/>
// // // //         <Skeleton variant="rectangular" height={60} sx={{ my: 1, borderRadius:1 }}/>
// // // //         <Skeleton variant="text" width="30%" />
// // // //       </CardContent>
// // // //       <CardActions sx={{ justifyContent: 'space-between', p:1.5, borderTop: '1px solid', borderColor:'divider' }}>
// // // //         <Skeleton variant="circular" width={40} height={40} />
// // // //         <Box>
// // // //             <Skeleton variant="circular" width={32} height={32} sx={{display:'inline-block', mr:1}} />
// // // //             <Skeleton variant="circular" width={32} height={32} sx={{display:'inline-block'}} />
// // // //         </Box>
// // // //       </CardActions>
// // // //     </Card>
// // // //   </Grid>
// // // // );

// // // // // Summary Stat Card Component
// // // // const StatCard = ({ title, value, icon, gradient }) => (
// // // //     <Grid item xs={12} sm={6} md={3}>
// // // //       <Card sx={{
// // // //         textAlign: "center", color: "#FFF", borderRadius: 2,
// // // //         background: gradient,
// // // //         transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
// // // //         '&:hover': {
// // // //           transform: 'scale(1.03)',
// // // //           boxShadow: "0 8px 25px rgba(0,0,0,0.2)",
// // // //         }
// // // //       }}>
// // // //         <CardContent sx={{ py: 3 }}>
// // // //           {React.cloneElement(icon, { sx:{ fontSize: "2.5rem", mb: 1 }})}
// // // //           <Typography variant="h5" sx={{fontWeight: 'bold'}}>{value}</Typography>
// // // //           <Typography variant="body2">{title}</Typography>
// // // //         </CardContent>
// // // //       </Card>
// // // //     </Grid>
// // // //   );


// // // // export default function Projects() {
// // // //   const [projects, setProjects] = useState([]);
// // // //   const [filteredProjects, setFilteredProjects] = useState([]);
// // // //   const [loading, setLoading] = useState(true);
// // // //   const [submitLoading, setSubmitLoading] = useState(false);
// // // //   const [refreshKey, setRefreshKey] = useState(0);
// // // //   const [searchQuery, setSearchQuery] = useState("");

// // // //   const [openDialog, setOpenDialog] = useState(false);
// // // //   const [isEditing, setIsEditing] = useState(false);
// // // //   const [currentProject, setCurrentProject] = useState(null);

// // // //   const initialProjectState = {
// // // //     company_id: "", client_id: "", title: "", start_date: null, end_date: null,
// // // //     assigned_to: "", associated_goals: "", priority: "Medium", project_no: "",
// // // //     budget_hours: "", summary: "", description: "", project_progress: "0",
// // // //     project_note: "", status: true, added_by: "1", // Assuming current user ID, adjust as needed
// // // //   };

// // // //   const fetchProjects = async () => {
// // // //     setLoading(true);
// // // //     try {
// // // //       const response = await axiosInstance.get("ci_projects/");
// // // //       setProjects(response.data || []); // Ensure projects is always an array
// // // //       setFilteredProjects(response.data || []);
// // // //     } catch (error) {
// // // //       console.error("Failed to fetch projects:", error);
// // // //       setProjects([]); // Set to empty array on error
// // // //       setFilteredProjects([]);
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   useEffect(() => {
// // // //     fetchProjects();
// // // //   }, [refreshKey]);

// // // //   // Filter projects
// // // //   useEffect(() => {
// // // //     if (!projects) return; // Guard against null projects
// // // //     const lowercasedQuery = searchQuery.toLowerCase();
// // // //     const filtered = projects.filter(project =>
// // // //         project.title?.toLowerCase().includes(lowercasedQuery) ||
// // // //         project.project_no?.toLowerCase().includes(lowercasedQuery) ||
// // // //         (project.status ? "active" : "inactive").includes(lowercasedQuery)
// // // //     );
// // // //     setFilteredProjects(filtered);
// // // //   }, [searchQuery, projects]);


// // // //   const handleRefresh = () => setRefreshKey(k => k + 1);

// // // //   const handleClickOpen = (project = null) => {
// // // //     setIsEditing(!!project);
// // // //     setCurrentProject(
// // // //       project
// // // //         ? {
// // // //             ...project,
// // // //             start_date: parseInputToDate(project.start_date),
// // // //             end_date: parseInputToDate(project.end_date),
// // // //           }
// // // //         : initialProjectState
// // // //     );
// // // //     setOpenDialog(true);
// // // //   };

// // // //   const handleCloseDialog = () => {
// // // //     setOpenDialog(false);
// // // //     setIsEditing(false);
// // // //     setCurrentProject(null);
// // // //   };

// // // //   const handleInputChange = (e) => {
// // // //     const { name, value, type, checked } = e.target;
// // // //     setCurrentProject((prev) => ({
// // // //       ...prev,
// // // //       [name]: type === 'checkbox' ? checked : value,
// // // //     }));
// // // //   };

// // // //   const handleDateChange = (name, date) => {
// // // //     setCurrentProject((prev) => ({ ...prev, [name]: date }));
// // // //   };

// // // //   const handleSaveProject = async () => {
// // // //     if (!currentProject || !currentProject.title || !currentProject.start_date || !currentProject.end_date) {
// // // //         alert("Please fill in Title, Start Date, and End Date.");
// // // //         return;
// // // //     }
// // // //     setSubmitLoading(true);
// // // //     const projectData = {
// // // //       ...currentProject,
// // // //       start_date: formatDateToInput(currentProject.start_date),
// // // //       end_date: formatDateToInput(currentProject.end_date),
// // // //       // Ensure numeric fields are numbers if API expects them
// // // //       budget_hours: currentProject.budget_hours ? parseFloat(currentProject.budget_hours) : null,
// // // //       project_progress: currentProject.project_progress ? parseInt(currentProject.project_progress, 10) : 0,
// // // //     };

// // // //     try {
// // // //       if (isEditing) {
// // // //         await axiosInstance.patch(`ci_projects/${currentProject.project_id}/`, projectData);
// // // //       } else {
// // // //         // Remove project_id for creation if it was part of initial state from an edit
// // // //         const { project_id, ...createData } = projectData;
// // // //         await axiosInstance.post("ci_projects/", {...createData, created_at: new Date().toISOString()});
// // // //       }
// // // //       handleCloseDialog();
// // // //       fetchProjects(); // Refresh the list
// // // //     } catch (error) {
// // // //       console.error("Failed to save project:", error.response?.data || error.message);
// // // //       alert(`Failed to save project: ${JSON.stringify(error.response?.data) || error.message}`);
// // // //     } finally {
// // // //       setSubmitLoading(false);
// // // //     }
// // // //   };

// // // //   const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);
// // // //   const [projectToDelete, setProjectToDelete] = useState(null);

// // // //   const handleOpenDeleteConfirm = (project) => {
// // // //     setProjectToDelete(project);
// // // //     setOpenDeleteConfirm(true);
// // // //   };
// // // //   const handleCloseDeleteConfirm = () => {
// // // //     setOpenDeleteConfirm(false);
// // // //     setProjectToDelete(null);
// // // //   };

// // // //   const handleDeleteProject = async () => {
// // // //     if (!projectToDelete) return;
// // // //     try {
// // // //       await axiosInstance.delete(`ci_projects/${projectToDelete.project_id}/`);
// // // //       fetchProjects(); // Refresh list
// // // //       handleCloseDeleteConfirm();
// // // //     } catch (error) {
// // // //       console.error("Failed to delete project:", error);
// // // //       alert("Failed to delete project.");
// // // //     }
// // // //   };

// // // //   // Calculate summary counts
// // // //   const completedCount = projects?.filter(p => p.project_progress === 100 || p.status_text?.toLowerCase() === 'completed').length || 0;
// // // //   const inProgressCount = projects?.filter(p => p.project_progress > 0 && p.project_progress < 100 && p.status_text?.toLowerCase() === 'in progress').length || 0;
// // // //   const notStartedCount = projects?.filter(p => p.project_progress === 0 && p.status_text?.toLowerCase() === 'not started').length || 0;
// // // //   const onHoldCount = projects?.filter(p => p.status_text?.toLowerCase() === 'on hold').length || 0;


// // // //   const projectFieldsConfig = [
// // // //     { name: "project_no", label: "Project Number", icon: <ConfirmationNumberIcon fontSize="small"/>, halfWidth: true },
// // // //     { name: "title", label: "Project Title", icon: <WorkOutlineIcon fontSize="small"/> },
// // // //     { name: "client_id", label: "Client ID", icon: <PeopleAltIcon fontSize="small"/>, halfWidth: true }, // Consider making this a Select
// // // //     { name: "company_id", label: "Company ID", icon: <BusinessIcon fontSize="small"/>, halfWidth: true }, // Consider making this a Select
// // // //     { name: "start_date", label: "Start Date", type: "date", icon: <EventIcon fontSize="small"/>, halfWidth: true },
// // // //     { name: "end_date", label: "End Date", type: "date", icon: <EventIcon fontSize="small"/>, halfWidth: true },
// // // //     { name: "assigned_to", label: "Assigned To", icon: <PersonOutlineIcon fontSize="small"/>, halfWidth: true }, // Consider making this a Select
// // // //     { name: "priority", label: "Priority", type: "select", options: ["High", "Medium", "Low"], icon: <FlagOutlinedIcon fontSize="small"/>, halfWidth: true },
// // // //     { name: "budget_hours", label: "Budget Hours", type: "number", icon: <BudgetIcon fontSize="small"/>, halfWidth: true },
// // // //     { name: "project_progress", label: "Progress (%)", type: "number", icon: <TrendingUpIcon fontSize="small"/>, halfWidth: true },
// // // //     { name: "summary", label: "Summary", multiline: true, rows: 2, icon: <NotesIcon fontSize="small"/> },
// // // //     { name: "description", label: "Description", multiline: true, rows: 4, icon: <NotesIcon fontSize="small"/> },
// // // //     { name: "project_note", label: "Internal Note", multiline: true, rows: 2, icon: <NotesIcon fontSize="small"/> },
// // // //     { name: "associated_goals", label: "Associated Goals", icon: <TimelineIcon fontSize="small"/> },
// // // //     { name: "status", label: "Project Active", type: "checkbox" }, // Handled differently for boolean
// // // //     { name: "added_by", label: "Added By (User ID)", icon: <PersonOutlineIcon fontSize="small"/> }
// // // //   ];


// // // //   return (
// // // //     <LocalizationProvider dateAdapter={AdapterDateFns}>
// // // //     <Box sx={{ p: { xs: 2, sm: 3 } }}>
// // // //       <Card
// // // //         elevation={0}
// // // //         sx={{
// // // //           mb: 3, borderRadius: 2,
// // // //           background: "linear-gradient(135deg, rgba(36, 73, 239, 0.03) 0%, rgba(218, 18, 202, 0.03) 100%)",
// // // //           borderLeft: "5px solid",
// // // //           borderImage: "linear-gradient(135deg, rgba(36, 73, 239, 0.89) 0%, rgb(218, 18, 202) 100%) 1",
// // // //         }}
// // // //       >
// // // //         <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
// // // //           <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
// // // //             <WorkOutlineIcon sx={{ fontSize: '2rem', mr: 1, color: 'primary.main' }} />
// // // //             <Typography variant="h4" sx={{ fontWeight: 700, color: "text.primary" }}>
// // // //               Projects Management
// // // //             </Typography>
// // // //           </Box>
// // // //           <Typography variant="body2" color="text.secondary">
// // // //             Oversee, add, and manage all your ongoing and completed projects.
// // // //           </Typography>
// // // //         </CardContent>
// // // //       </Card>

// // // //       <Grid container spacing={2.5} sx={{ mb: 3 }}>
// // // //         <StatCard title="Total Completed" value={completedCount} icon={<GroupIcon />} gradient="linear-gradient(135deg, #66bb6a 0%, #43a047 100%)" />
// // // //         <StatCard title="In Progress" value={inProgressCount} icon={<FolderIcon />} gradient="linear-gradient(135deg, #42a5f5 0%, #1e88e5 100%)" />
// // // //         <StatCard title="Not Started" value={notStartedCount} icon={<TimelineIcon />} gradient="linear-gradient(135deg, #ffa726 0%, #fb8c00 100%)" />
// // // //         <StatCard title="On Hold" value={onHoldCount} icon={<PauseCircleIcon />} gradient="linear-gradient(135deg, #ef5350 0%, #e53935 100%)" />
// // // //       </Grid>

// // // //       <Paper sx={{ p: 2.5, mb: 3, borderRadius: 2, boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
// // // //         <Grid container spacing={2} alignItems="center">
// // // //             <Grid item xs={12} sm={6} md={8}>
// // // //                 <TextField
// // // //                     fullWidth
// // // //                     variant="outlined"
// // // //                     placeholder="Search Projects by Title, Number, Status..."
// // // //                     value={searchQuery}
// // // //                     onChange={(e) => setSearchQuery(e.target.value)}
// // // //                     InputProps={{
// // // //                     startAdornment: (<InputAdornment position="start"><SearchIcon color="action" /></InputAdornment>),
// // // //                     }}
// // // //                     sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
// // // //                 />
// // // //             </Grid>
// // // //             <Grid item xs={12} sm={6} md={4} sx={{ display: 'flex', justifyContent: {xs: 'flex-start', sm: 'flex-end'}, gap: 1 }}>
// // // //                 <Tooltip title="Refresh Projects">
// // // //                     <IconButton onClick={handleRefresh} color="primary" sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
// // // //                         <RefreshIcon />
// // // //                     </IconButton>
// // // //                 </Tooltip>
// // // //                 <Button
// // // //                     startIcon={<AddBoxIcon />}
// // // //                     onClick={() => handleClickOpen()}
// // // //                     sx={{ ...gradientButtonStyle, py: 1.25, px: 3 }}
// // // //                 >
// // // //                     Add Project
// // // //                 </Button>
// // // //             </Grid>
// // // //         </Grid>
// // // //       </Paper>

// // // //       {loading ? (
// // // //         <Grid container spacing={2.5}>
// // // //             {Array.from(new Array(4)).map((_, index) => (<ProjectCardSkeleton key={index} />))}
// // // //         </Grid>
// // // //       ) : filteredProjects.length === 0 ? (
// // // //           <Paper sx={{textAlign: 'center', p:5, borderRadius: 2, mt: 2}}>
// // // //               <WorkOutlineIcon sx={{fontSize: 60, color: 'text.disabled', mb: 2}}/>
// // // //               <Typography variant="h6" color="text.secondary">
// // // //                   {searchQuery ? "No projects match your search." : "No projects found."}
// // // //               </Typography>
// // // //                 <Typography variant="body2" color="text.secondary" sx={{mt:1}}>
// // // //                   {searchQuery ? "Try a different search term." : "Click 'Add Project' to create a new one."}
// // // //               </Typography>
// // // //           </Paper>
// // // //       ) : (
// // // //         <Grid container spacing={2.5}>
// // // //             {filteredProjects.map((project) => (
// // // //             <Grid item xs={12} md={6} lg={4} key={project.project_id}>
// // // //                 <Card sx={{ borderRadius: 2, height: '100%', display: 'flex', flexDirection: 'column', transition: 'box-shadow 0.3s', '&:hover': {boxShadow: 6} }}>
// // // //                 <CardContent sx={{ flexGrow: 1, pb:1 }}>
// // // //                     <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems:'flex-start', mb:1}}>
// // // //                         <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', color: 'primary.dark', flexGrow:1, mr:1 }}>
// // // //                             {project.title}
// // // //                         </Typography>
// // // //                         <Chip
// // // //                             label={project.status ? "Active" : "Inactive"}
// // // //                             color={project.status ? "success" : "error"}
// // // //                             size="small"
// // // //                             variant="outlined"
// // // //                             icon={project.status ? <CheckCircleOutlineIcon fontSize="inherit"/> : <CancelIcon fontSize="inherit"/> }
// // // //                         />
// // // //                     </Box>
// // // //                     <Typography variant="caption" color="textSecondary" display="block" gutterBottom>
// // // //                         Project #: {project.project_no || 'N/A'}
// // // //                     </Typography>
// // // //                     <Typography variant="body2" color="text.secondary" sx={{ mb: 1, minHeight: '40px',
// // // //                         display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', textOverflow: 'ellipsis'
// // // //                     }}>
// // // //                         {project.summary || project.description || "No summary available."}
// // // //                     </Typography>
// // // //                     <Grid container spacing={1} sx={{fontSize:'0.8rem', color:'text.secondary'}}>
// // // //                         <Grid item xs={6} sx={{display:'flex', alignItems:'center'}}><EventIcon fontSize="inherit" sx={{mr:0.5}}/> Start: {project.start_date ? format(parseInputToDate(project.start_date), 'dd MMM yyyy') : 'N/A'}</Grid>
// // // //                         <Grid item xs={6} sx={{display:'flex', alignItems:'center'}}><EventIcon fontSize="inherit" sx={{mr:0.5}}/> End: {project.end_date ? format(parseInputToDate(project.end_date), 'dd MMM yyyy') : 'N/A'}</Grid>
// // // //                         <Grid item xs={6} sx={{display:'flex', alignItems:'center'}}><PersonOutlineIcon fontSize="inherit" sx={{mr:0.5}}/> By: {project.added_by_username || project.added_by || 'N/A'}</Grid>
// // // //                         <Grid item xs={6} sx={{display:'flex', alignItems:'center'}}><FlagOutlinedIcon fontSize="inherit" sx={{mr:0.5}}/> {project.priority || 'N/A'}</Grid>
// // // //                     </Grid>
// // // //                 </CardContent>
// // // //                 <CardActions sx={{ p:1, borderTop: '1px solid', borderColor: 'divider', display: 'flex', justifyContent: 'space-between', bgcolor: 'grey.50' }}>
// // // //                     <Avatar sx={{ width: 32, height: 32, bgcolor: 'secondary.light', color: 'secondary.dark', fontSize: '0.8rem' }}>
// // // //                         {String(project.assigned_to || "NA")[0].toUpperCase()}
// // // //                     </Avatar>
// // // //                     <Box>
// // // //                     <Tooltip title="Edit Project">
// // // //                         <IconButton size="small" sx={{color: 'secondary.main'}} onClick={() => handleClickOpen(project)}>
// // // //                             <EditIcon fontSize="small"/>
// // // //                         </IconButton>
// // // //                     </Tooltip>
// // // //                     <Tooltip title="Delete Project">
// // // //                         <IconButton size="small" sx={{color: 'error.main'}} onClick={() => handleOpenDeleteConfirm(project)}>
// // // //                             <DeleteIcon fontSize="small"/>
// // // //                         </IconButton>
// // // //                     </Tooltip>
// // // //                     </Box>
// // // //                 </CardActions>
// // // //                 </Card>
// // // //             </Grid>
// // // //             ))}
// // // //         </Grid>
// // // //       )}

// // // //       {/* Add/Edit Dialog */}
// // // //       <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth PaperProps={{ sx: { borderRadius: 3 } }}>
// // // //         <DialogTitle sx={{ ...gradientButtonStyle, color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1.5 }}>
// // // //           {isEditing ? "Edit Project" : "Add New Project"}
// // // //           <IconButton onClick={handleCloseDialog} sx={{ color: 'rgba(255,255,255,0.8)', '&:hover': {color: 'white'} }}>
// // // //             <CloseIcon />
// // // //           </IconButton>
// // // //         </DialogTitle>
// // // //         <DialogContent dividers sx={{ p: { xs: 2, sm: 3 }, backgroundColor: 'grey.50' }}>
// // // //           <Grid container spacing={2.5}>
// // // //             {currentProject && projectFieldsConfig.map(({ name, label, type, options, multiline, rows, icon, halfWidth }) => {
// // // //               if (name === "project_id" || name === "created_at" || name === "added_by") return null; // Handled by backend or auto

// // // //               const commonProps = {
// // // //                 key: name,
// // // //                 label: label,
// // // //                 name: name,
// // // //                 value: currentProject[name] === null || currentProject[name] === undefined ? '' : currentProject[name],
// // // //                 onChange: handleInputChange,
// // // //                 fullWidth: true,
// // // //                 margin: "dense",
// // // //                 size: "small",
// // // //                 sx: {"& .MuiOutlinedInput-root": {borderRadius:2}},
// // // //                 InputProps: icon ? {startAdornment: <InputAdornment position="start">{icon}</InputAdornment>} : {}
// // // //               };

// // // //               if (type === "date") {
// // // //                 return (
// // // //                   <Grid item xs={12} sm={halfWidth ? 6 : 12} key={name}>
// // // //                     <DatePicker
// // // //                       label={label}
// // // //                       value={currentProject[name] || null}
// // // //                       onChange={(date) => handleDateChange(name, date)}
// // // //                       renderInput={(params) => <TextField {...params} {...commonProps} InputLabelProps={{shrink:true}} error={false} helperText="" />} // Removed commonProps value & onChange
// // // //                     />
// // // //                   </Grid>
// // // //                 );
// // // //               } else if (type === "select") {
// // // //                 return (
// // // //                   <Grid item xs={12} sm={halfWidth ? 6 : 12} key={name}>
// // // //                     <FormControl fullWidth required size="small" margin="dense" sx={{"& .MuiOutlinedInput-root": {borderRadius:2}}}>
// // // //                         <InputLabel id={`${name}-label`}>{label}</InputLabel>
// // // //                         <Select labelId={`${name}-label`} label={label} {...commonProps} value={currentProject[name] || options[0]}>
// // // //                             {options.map(opt => <MenuItem key={opt} value={opt}>{opt}</MenuItem>)}
// // // //                         </Select>
// // // //                     </FormControl>
// // // //                   </Grid>
// // // //                 );
// // // //               } else if (type === "checkbox") { // For boolean 'status'
// // // //                   return (
// // // //                     <Grid item xs={12} sm={halfWidth ? 6 : 12} key={name} sx={{alignSelf: 'center'}}>
// // // //                         <FormControlLabel
// // // //                             control={<Chip
// // // //                                 icon={currentProject[name] ? <CheckCircleOutlineIcon/> : <CancelIcon/>}
// // // //                                 label={currentProject[name] ? "Active" : "Inactive"}
// // // //                                 clickable
// // // //                                 color={currentProject[name] ? "success" : "error"}
// // // //                                 onClick={() => setCurrentProject(prev => ({...prev, [name]: !prev[name]}))}
// // // //                                 variant="outlined"
// // // //                                 sx={{borderRadius:1.5, p:0.5}}
// // // //                             />}
// // // //                             labelPlacement="start"
// // // //                             label={label}
// // // //                             sx={{mr:0, ml:0, justifyContent:'space-between', width: '100%'}}
// // // //                         />
// // // //                     </Grid>
// // // //                   );
// // // //               }
// // // //               return (
// // // //                 <Grid item xs={12} sm={halfWidth ? 6 : 12} key={name}>
// // // //                   <TextField {...commonProps} type={type || "text"} multiline={multiline} rows={rows} />
// // // //                 </Grid>
// // // //               );
// // // //             })}
// // // //           </Grid>
// // // //         </DialogContent>
// // // //         <DialogActions sx={{ p: 2, backgroundColor: 'grey.50', borderTop: '1px solid', borderColor: 'divider' }}>
// // // //           <Button onClick={handleCloseDialog} color="inherit" sx={{borderRadius:2}} disabled={submitLoading}>Cancel</Button>
// // // //           <Button onClick={handleSaveProject} sx={{...gradientButtonStyle, minWidth: '150px', py: '10px', px: 3}} disabled={submitLoading}>
// // // //             {submitLoading ? <CircularProgress size={24} color="inherit" /> : (isEditing ? <><SaveIcon sx={{mr:1}}/>Save Changes</> : <><AddBoxIcon sx={{mr:1}}/>Add Project</>)}
// // // //           </Button>
// // // //         </DialogActions>
// // // //       </Dialog>

// // // //       {/* Delete Confirmation Dialog */}
// // // //       <Dialog open={openDeleteConfirm} onClose={handleCloseDeleteConfirm} PaperProps={{sx: {borderRadius: 3}}}>
// // // //         <DialogTitle sx={{display: 'flex', alignItems: 'center'}}>
// // // //             <WarningAmberIcon color="error" sx={{mr:1}}/> Confirm Deletion
// // // //         </DialogTitle>
// // // //         <DialogContent>
// // // //           <Typography>Are you sure you want to delete the project: <strong>{projectToDelete?.title}</strong>? This action cannot be undone.</Typography>
// // // //         </DialogContent>
// // // //         <DialogActions sx={{px:3, pb:2}}>
// // // //           <Button onClick={handleCloseDeleteConfirm} color="inherit" sx={{borderRadius:2}}>Cancel</Button>
// // // //           <Button onClick={handleDeleteProject} variant="contained" color="error" sx={{borderRadius:2}}>
// // // //             Delete
// // // //           </Button>
// // // //         </DialogActions>
// // // //       </Dialog>
// // // //     </Box>
// // // //     </LocalizationProvider>
// // // //   );
// // // // }




// // import React, { useEffect, useState } from "react";
// // import {
// //   Box, Typography, Grid, Card, CardContent, CardActions, Button, Avatar,
// //   Dialog, DialogTitle, DialogContent, DialogActions, TextField, IconButton,
// //   Paper, Tooltip, Skeleton, CircularProgress, InputAdornment, Chip,
// //   FormControl, InputLabel, Select, MenuItem, FormControlLabel
// // } from "@mui/material";

// // import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// // import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
// // import { format, parseISO, isValid } from 'date-fns';
// // import axios from "axios"; // Using a generic axios for this example

// // // Icons
// // import {
// //   Edit as EditIcon, Delete as DeleteIcon, AddBox as AddBoxIcon, WorkOutline as WorkOutlineIcon,
// //   Search as SearchIcon, Refresh as RefreshIcon, Close as CloseIcon, Save as SaveIcon,
// //   Event as EventIcon, PersonOutline as PersonOutlineIcon, FlagOutlined as FlagOutlinedIcon,
// //   Notes as NotesIcon, TrendingUp as TrendingUpIcon, MonetizationOnOutlined as BudgetIcon,
// //   WarningAmber as WarningAmberIcon, CheckCircleOutline as CheckCircleOutlineIcon,
// //   Cancel as CancelIcon, PeopleAlt as PeopleAltIcon, FolderOpen as FolderOpenIcon,
// //   CheckCircle as CheckCircleIcon, PlayCircleOutline as PlayCircleOutlineIcon
// // } from "@mui/icons-material";

// // // --- Assuming axiosInstance is configured like this ---
// // // You can replace this with your actual axiosInstance import
// // const axiosInstance = axios.create({
// //   baseURL: "https://tdtlworld.com/hrms-backend/api/",
// // });
// // // ----------------------------------------------------

// // const gradientButtonStyle = {
// //   background: 'linear-gradient(135deg, rgba(36, 73, 239, 0.89) 0%, rgb(218, 18, 202) 100%)',
// //   color: 'white',
// //   borderRadius: 2,
// //   fontWeight: 600,
// //   boxShadow: '0 4px 10px rgba(36, 73, 239, 0.3)',
// //   transition: 'all 0.3s ease',
// //   '&:hover': {
// //     background: 'linear-gradient(135deg, rgba(36, 73, 239, 1) 0%, rgb(218, 18, 202, 1) 100%)',
// //     boxShadow: '0 6px 15px rgba(36, 73, 239, 0.4)',
// //     transform: 'translateY(-2px)',
// //   },
// //   '&.Mui-disabled': {
// //     background: 'rgba(0, 0, 0, 0.12)',
// //     color: 'rgba(0, 0, 0, 0.26)',
// //     boxShadow: 'none',
// //   }
// // };

// // const formatDateToInput = (dateObj) => {
// //   if (!dateObj || !isValid(dateObj)) return '';
// //   return format(dateObj, 'yyyy-MM-dd');
// // };

// // const parseInputToDate = (dateString) => {
// //   if (!dateString) return null;
// //   const parsed = parseISO(dateString);
// //   return isValid(parsed) ? parsed : null;
// // };

// // const ProjectCardSkeleton = () => (
// //     <Grid item xs={12} md={6} lg={4}>
// //       <Card sx={{ borderRadius: 2, height: '100%' }}>
// //         <CardContent>
// //           <Skeleton variant="text" width="70%" height={30} />
// //           <Skeleton variant="text" width="50%" sx={{ mt: 1 }}/>
// //           <Skeleton variant="rectangular" height={60} sx={{ my: 1, borderRadius:1 }}/>
// //           <Skeleton variant="text" width="30%" />
// //         </CardContent>
// //         <CardActions sx={{ justifyContent: 'space-between', p:1.5, borderTop: '1px solid', borderColor:'divider' }}>
// //           <Skeleton variant="circular" width={40} height={40} />
// //           <Box>
// //               <Skeleton variant="circular" width={32} height={32} sx={{display:'inline-block', mr:1}} />
// //               <Skeleton variant="circular" width={32} height={32} sx={{display:'inline-block'}} />
// //           </Box>
// //         </CardActions>
// //       </Card>
// //     </Grid>
// // );

// // const StatCard = ({ title, value, icon, gradient }) => (
// //     <Grid item xs={12} sm={6} md={3}>
// //       <Card sx={{
// //         textAlign: "center", color: "#FFF", borderRadius: 2,
// //         background: gradient,
// //         transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
// //         '&:hover': { transform: 'scale(1.03)', boxShadow: "0 8px 25px rgba(0,0,0,0.2)" }
// //       }}>
// //         <CardContent sx={{ py: 3 }}>
// //           {React.cloneElement(icon, { sx:{ fontSize: "2.5rem", mb: 1 }})}
// //           <Typography variant="h5" sx={{fontWeight: 'bold'}}>{value}</Typography>
// //           <Typography variant="body2">{title}</Typography>
// //         </CardContent>
// //       </Card>
// //     </Grid>
// // );


// // export default function Projects() {
// //   const [projects, setProjects] = useState([]);
// //   const [filteredProjects, setFilteredProjects] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [submitLoading, setSubmitLoading] = useState(false);
// //   const [searchQuery, setSearchQuery] = useState("");

// //   const [openDialog, setOpenDialog] = useState(false);
// //   const [isEditing, setIsEditing] = useState(false);
// //   const [currentProject, setCurrentProject] = useState(null);

// //   const initialProjectState = {
// //     client_id: "", title: "", start_date: null, end_date: null,
// //     assigned_to: "", associated_goals: "", priority: "Medium",
// //     budget_hours: "", summary: "", description: "", project_progress: 0,
// //     project_note: "", status: true,
// //   };

// //   const fetchProjects = async () => {
// //     setLoading(true);
// //     try {
// //       const response = await axiosInstance.get("projects/");
// //       const formattedData = (response.data || []).map(p => ({
// //         ...p,
// //         project_id: p.id, // Map API 'id' to frontend 'project_id'
// //         client_id: p.client_name || '', // Map 'client_name' to 'client_id'
// //         project_progress: parseInt(String(p.project_progress).replace('%', ''), 10) || 0,
// //         status: !!p.status, // Convert 1/0 to true/false
// //       }));
// //       setProjects(formattedData);
// //       setFilteredProjects(formattedData);
// //     } catch (error) {
// //       console.error("Failed to fetch projects:", error);
// //       setProjects([]);
// //       setFilteredProjects([]);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchProjects();
// //   }, []);

// //   useEffect(() => {
// //     const lowercasedQuery = searchQuery.toLowerCase();
// //     const filtered = projects.filter(project =>
// //         project.title?.toLowerCase().includes(lowercasedQuery) ||
// //         (project.status ? "active" : "inactive").includes(lowercasedQuery)
// //     );
// //     setFilteredProjects(filtered);
// //   }, [searchQuery, projects]);


// //   const handleClickOpen = (project = null) => {
// //     setIsEditing(!!project);
// //     setCurrentProject(
// //       project
// //         ? {
// //             ...project,
// //             start_date: parseInputToDate(project.start_date),
// //             end_date: parseInputToDate(project.end_date),
// //           }
// //         : initialProjectState
// //     );
// //     setOpenDialog(true);
// //   };

// //   const handleCloseDialog = () => {
// //     setOpenDialog(false);
// //     setIsEditing(false);
// //     setCurrentProject(null);
// //   };

// //   const handleInputChange = (e) => {
// //     const { name, value, type, checked } = e.target;
// //     setCurrentProject((prev) => ({
// //       ...prev,
// //       [name]: type === 'checkbox' ? checked : value,
// //     }));
// //   };

// //   const handleDateChange = (name, date) => {
// //     setCurrentProject((prev) => ({ ...prev, [name]: date }));
// //   };

// //   const handleSaveProject = async () => {
// //     if (!currentProject || !currentProject.title || !currentProject.start_date || !currentProject.end_date) {
// //         alert("Please fill in Title, Start Date, and End Date.");
// //         return;
// //     }
// //     setSubmitLoading(true);

// //     // Prepare payload for the API
// //     const payload = {
// //       ...currentProject,
// //       client_id: currentProject.client_id, // API expects this field with a name
// //       start_date: formatDateToInput(currentProject.start_date),
// //       end_date: formatDateToInput(currentProject.end_date),
// //       budget_hours: String(currentProject.budget_hours || "0"),
// //       project_progress: `${currentProject.project_progress || 0}%`,
// //       status: currentProject.status ? 1 : 0,
// //     };
// //     // Remove frontend-specific fields
// //     delete payload.project_id;
// //     delete payload.id;

// //     try {
// //       if (isEditing) {
// //         await axiosInstance.patch(`projects/${currentProject.project_id}/`, payload);
// //       } else {
// //         await axiosInstance.post("projects/", payload);
// //       }
// //       handleCloseDialog();
// //       fetchProjects();
// //     } catch (error) {
// //       console.error("Failed to save project:", error.response?.data || error.message);
// //       alert(`Failed to save project: ${JSON.stringify(error.response?.data) || error.message}`);
// //     } finally {
// //       setSubmitLoading(false);
// //     }
// //   };

// //   const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);
// //   const [projectToDelete, setProjectToDelete] = useState(null);

// //   const handleOpenDeleteConfirm = (project) => {
// //     setProjectToDelete(project);
// //     setOpenDeleteConfirm(true);
// //   };
// //   const handleCloseDeleteConfirm = () => {
// //     setOpenDeleteConfirm(false);
// //     setProjectToDelete(null);
// //   };

// //   const handleDeleteProject = async () => {
// //     if (!projectToDelete) return;
// //     try {
// //       await axiosInstance.delete(`projects/${projectToDelete.project_id}/`);
// //       fetchProjects();
// //       handleCloseDeleteConfirm();
// //     } catch (error) {
// //       console.error("Failed to delete project:", error);
// //       alert("Failed to delete project.");
// //     }
// //   };

// //   // Calculate summary counts based on live data
// //   const completedCount = projects.filter(p => p.project_progress === 100).length;
// //   const inProgressCount = projects.filter(p => p.status && p.project_progress > 0 && p.project_progress < 100).length;
// //   const notStartedCount = projects.filter(p => p.status && p.project_progress === 0).length;
// //   const inactiveCount = projects.filter(p => !p.status).length;


// //   const projectFieldsConfig = [
// //     { name: "title", label: "Project Title", icon: <WorkOutlineIcon fontSize="small"/> },
// //     { name: "client_id", label: "Client Name", icon: <PeopleAltIcon fontSize="small"/>, halfWidth: true },
// //     { name: "priority", label: "Priority", type: "select", options: ["High", "Medium", "Low"], icon: <FlagOutlinedIcon fontSize="small"/>, halfWidth: true },
// //     { name: "start_date", label: "Start Date", type: "date", icon: <EventIcon fontSize="small"/>, halfWidth: true },
// //     { name: "end_date", label: "End Date", type: "date", icon: <EventIcon fontSize="small"/>, halfWidth: true },
// //     { name: "budget_hours", label: "Budget Hours", type: "number", icon: <BudgetIcon fontSize="small"/>, halfWidth: true },
// //     { name: "project_progress", label: "Progress (%)", type: "number", icon: <TrendingUpIcon fontSize="small"/>, halfWidth: true },
// //     { name: "assigned_to", label: "Assigned To (e.g. [3,4])", icon: <PersonOutlineIcon fontSize="small"/> },
// //     { name: "summary", label: "Summary", multiline: true, rows: 2, icon: <NotesIcon fontSize="small"/> },
// //     { name: "description", label: "Description", multiline: true, rows: 4, icon: <NotesIcon fontSize="small"/> },
// //     { name: "project_note", label: "Internal Note", multiline: true, rows: 2, icon: <NotesIcon fontSize="small"/> },
// //     { name: "associated_goals", label: "Associated Goals", icon: <NotesIcon fontSize="small"/> },
// //     { name: "status", label: "Project Active", type: "checkbox" },
// //   ];


// //   return (
// //     <LocalizationProvider dateAdapter={AdapterDateFns}>
// //     <Box sx={{ p: { xs: 2, sm: 3 } }}>
// //       <Card
// //         elevation={0}
// //         sx={{
// //           mb: 3, borderRadius: 2,
// //           background: "linear-gradient(135deg, rgba(36, 73, 239, 0.03) 0%, rgba(218, 18, 202, 0.03) 100%)",
// //           borderLeft: "5px solid",
// //           borderImage: "linear-gradient(135deg, rgba(36, 73, 239, 0.89) 0%, rgb(218, 18, 202) 100%) 1",
// //         }}
// //       >
// //         <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
// //           <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
// //             <WorkOutlineIcon sx={{ fontSize: '2rem', mr: 1, color: 'primary.main' }} />
// //             <Typography variant="h4" sx={{ fontWeight: 700, color: "text.primary" }}>Projects Management</Typography>
// //           </Box>
// //           <Typography variant="body2" color="text.secondary">Oversee, add, and manage all your ongoing and completed projects.</Typography>
// //         </CardContent>
// //       </Card>

// //       <Grid container spacing={2.5} sx={{ mb: 3 }}>
// //         <StatCard title="Completed" value={completedCount} icon={<CheckCircleIcon />} gradient="linear-gradient(135deg, #66bb6a 0%, #43a047 100%)" />
// //         <StatCard title="In Progress" value={inProgressCount} icon={<PlayCircleOutlineIcon />} gradient="linear-gradient(135deg, #42a5f5 0%, #1e88e5 100%)" />
// //         <StatCard title="Not Started" value={notStartedCount} icon={<FolderOpenIcon />} gradient="linear-gradient(135deg, #ffa726 0%, #fb8c00 100%)" />
// //         <StatCard title="Inactive / Archived" value={inactiveCount} icon={<CancelIcon />} gradient="linear-gradient(135deg, #ef5350 0%, #e53935 100%)" />
// //       </Grid>

// //       <Paper sx={{ p: 2.5, mb: 3, borderRadius: 2, boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
// //         <Grid container spacing={2} alignItems="center">
// //             <Grid item xs={12} sm={6} md={8}>
// //                 <TextField fullWidth variant="outlined" placeholder="Search Projects by Title..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
// //                     InputProps={{ startAdornment: (<InputAdornment position="start"><SearchIcon color="action" /></InputAdornment>) }}
// //                     sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
// //                 />
// //             </Grid>
// //             <Grid item xs={12} sm={6} md={4} sx={{ display: 'flex', justifyContent: {xs: 'flex-start', sm: 'flex-end'}, gap: 1 }}>
// //                 <Tooltip title="Refresh Projects"><IconButton onClick={fetchProjects} color="primary" sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2 }}><RefreshIcon /></IconButton></Tooltip>
// //                 <Button startIcon={<AddBoxIcon />} onClick={() => handleClickOpen()} sx={{ ...gradientButtonStyle, py: 1.25, px: 3 }}>Add Project</Button>
// //             </Grid>
// //         </Grid>
// //       </Paper>

// //       {loading ? (
// //         <Grid container spacing={2.5}>
// //             {Array.from(new Array(6)).map((_, index) => (<ProjectCardSkeleton key={index} />))}
// //         </Grid>
// //       ) : filteredProjects.length === 0 ? (
// //           <Paper sx={{textAlign: 'center', p:5, borderRadius: 2, mt: 2}}>
// //               <WorkOutlineIcon sx={{fontSize: 60, color: 'text.disabled', mb: 2}}/>
// //               <Typography variant="h6" color="text.secondary">{searchQuery ? "No projects match your search." : "No projects found."}</Typography>
// //               <Typography variant="body2" color="text.secondary" sx={{mt:1}}>{searchQuery ? "Try a different search term." : "Click 'Add Project' to create a new one."}</Typography>
// //           </Paper>
// //       ) : (
// //         <Grid container spacing={2.5}>
// //             {filteredProjects.map((project) => (
// //             <Grid item xs={12} md={6} lg={4} key={project.project_id}>
// //                 <Card sx={{ borderRadius: 2, height: '100%', display: 'flex', flexDirection: 'column', transition: 'box-shadow 0.3s', '&:hover': {boxShadow: 6} }}>
// //                     <CardContent sx={{ flexGrow: 1, pb:1 }}>
// //                         <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems:'flex-start', mb:1}}>
// //                             <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', color: 'primary.dark', flexGrow:1, mr:1 }}>{project.title}</Typography>
// //                             <Chip label={project.status ? "Active" : "Inactive"} color={project.status ? "success" : "error"} size="small" variant="outlined"
// //                                 icon={project.status ? <CheckCircleOutlineIcon fontSize="inherit"/> : <CancelIcon fontSize="inherit"/> }
// //                             />
// //                         </Box>
// //                         <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5, minHeight: '40px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', textOverflow: 'ellipsis' }}>
// //                             {project.summary || project.description || "No summary available."}
// //                         </Typography>
// //                         <Grid container spacing={1} sx={{fontSize:'0.8rem', color:'text.secondary'}}>
// //                             <Grid item xs={6} sx={{display:'flex', alignItems:'center'}}><EventIcon fontSize="inherit" sx={{mr:0.5}}/> Start: {project.start_date ? format(parseInputToDate(project.start_date), 'dd MMM yyyy') : 'N/A'}</Grid>
// //                             <Grid item xs={6} sx={{display:'flex', alignItems:'center'}}><EventIcon fontSize="inherit" sx={{mr:0.5}}/> End: {project.end_date ? format(parseInputToDate(project.end_date), 'dd MMM yyyy') : 'N/A'}</Grid>
// //                             <Grid item xs={6} sx={{display:'flex', alignItems:'center'}}><PeopleAltIcon fontSize="inherit" sx={{mr:0.5}}/> Client: {project.client_id || 'N/A'}</Grid>
// //                             <Grid item xs={6} sx={{display:'flex', alignItems:'center'}}><FlagOutlinedIcon fontSize="inherit" sx={{mr:0.5}}/> {project.priority || 'N/A'}</Grid>
// //                         </Grid>
// //                     </CardContent>
// //                     <CardActions sx={{ p:1.5, borderTop: '1px solid', borderColor: 'divider', display: 'flex', justifyContent: 'space-between', bgcolor: 'grey.50' }}>
// //                         <Typography variant="body2" fontWeight="bold">{project.project_progress}% Complete</Typography>
// //                         <Box>
// //                             <Tooltip title="Edit Project"><IconButton size="small" sx={{color: 'secondary.main'}} onClick={() => handleClickOpen(project)}><EditIcon fontSize="small"/></IconButton></Tooltip>
// //                             <Tooltip title="Delete Project"><IconButton size="small" sx={{color: 'error.main'}} onClick={() => handleOpenDeleteConfirm(project)}><DeleteIcon fontSize="small"/></IconButton></Tooltip>
// //                         </Box>
// //                     </CardActions>
// //                 </Card>
// //             </Grid>
// //             ))}
// //         </Grid>
// //       )}

// //       {/* Add/Edit Dialog */}
// //       <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth PaperProps={{ sx: { borderRadius: 3 } }}>
// //         <DialogTitle sx={{ ...gradientButtonStyle, color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1.5 }}>
// //           {isEditing ? "Edit Project" : "Add New Project"}
// //           <IconButton onClick={handleCloseDialog} sx={{ color: 'rgba(255,255,255,0.8)', '&:hover': {color: 'white'} }}><CloseIcon /></IconButton>
// //         </DialogTitle>
// //         <DialogContent dividers sx={{ p: { xs: 2, sm: 3 }, backgroundColor: 'grey.50' }}>
// //           <Grid container spacing={2.5}>
// //             {currentProject && projectFieldsConfig.map(({ name, label, type, options, multiline, rows, icon, halfWidth }) => {
// //               const commonProps = {
// //                 key: name, label: label, name: name,
// //                 value: currentProject[name] ?? '', onChange: handleInputChange,
// //                 fullWidth: true, margin: "dense", size: "small",
// //                 sx: {"& .MuiOutlinedInput-root": {borderRadius:2}},
// //                 InputProps: icon ? {startAdornment: <InputAdornment position="start">{icon}</InputAdornment>} : {}
// //               };
// //               if (type === "date") {
// //                 return ( <Grid item xs={12} sm={halfWidth ? 6 : 12} key={name}><DatePicker label={label} value={currentProject[name]} onChange={(date) => handleDateChange(name, date)} renderInput={(params) => <TextField {...params} size="small" margin="dense" fullWidth sx={{"& .MuiOutlinedInput-root": {borderRadius:2}}} />} /></Grid> );
// //               } else if (type === "select") {
// //                 return ( <Grid item xs={12} sm={halfWidth ? 6 : 12} key={name}><FormControl fullWidth size="small" margin="dense"><InputLabel>{label}</InputLabel><Select label={label} {...commonProps}>{options.map(opt => <MenuItem key={opt} value={opt}>{opt}</MenuItem>)}</Select></FormControl></Grid> );
// //               } else if (type === "checkbox") {
// //                   return ( <Grid item xs={12} sm={halfWidth ? 6 : 12} key={name} sx={{alignSelf: 'center'}}><FormControlLabel control={<Chip icon={currentProject[name] ? <CheckCircleOutlineIcon/> : <CancelIcon/>} label={currentProject[name] ? "Active" : "Inactive"} clickable color={currentProject[name] ? "success" : "error"} onClick={() => setCurrentProject(prev => ({...prev, [name]: !prev[name]}))} variant="outlined" sx={{borderRadius:1.5, p:0.5}} />} labelPlacement="start" label={label} sx={{mr:0, ml:0, justifyContent:'space-between', width: '100%'}} /></Grid> );
// //               }
// //               return ( <Grid item xs={12} sm={halfWidth ? 6 : 12} key={name}><TextField {...commonProps} type={type || "text"} multiline={multiline} rows={rows} /></Grid> );
// //             })}
// //           </Grid>
// //         </DialogContent>
// //         <DialogActions sx={{ p: 2, backgroundColor: 'grey.50', borderTop: '1px solid', borderColor: 'divider' }}>
// //           <Button onClick={handleCloseDialog} color="inherit" sx={{borderRadius:2}} disabled={submitLoading}>Cancel</Button>
// //           <Button onClick={handleSaveProject} sx={{...gradientButtonStyle, minWidth: '150px', py: '10px', px: 3}} disabled={submitLoading}>
// //             {submitLoading ? <CircularProgress size={24} color="inherit" /> : (isEditing ? <><SaveIcon sx={{mr:1}}/>Save Changes</> : <><AddBoxIcon sx={{mr:1}}/>Add Project</>)}
// //           </Button>
// //         </DialogActions>
// //       </Dialog>

// //       {/* Delete Confirmation Dialog */}
// //       <Dialog open={openDeleteConfirm} onClose={handleCloseDeleteConfirm} PaperProps={{sx: {borderRadius: 3}}}>
// //         <DialogTitle sx={{display: 'flex', alignItems: 'center'}}><WarningAmberIcon color="error" sx={{mr:1}}/> Confirm Deletion</DialogTitle>
// //         <DialogContent><Typography>Are you sure you want to delete the project: <strong>{projectToDelete?.title}</strong>? This action cannot be undone.</Typography></DialogContent>
// //         <DialogActions sx={{px:3, pb:2}}>
// //           <Button onClick={handleCloseDeleteConfirm} color="inherit" sx={{borderRadius:2}}>Cancel</Button>
// //           <Button onClick={handleDeleteProject} variant="contained" color="error" sx={{borderRadius:2}}>Delete</Button>
// //         </DialogActions>
// //       </Dialog>
// //     </Box>
// //     </LocalizationProvider>
// //   );
// // }












// // // import React, { useEffect, useState } from "react";
// // // import {
// // //   Box, Typography, Grid, Card, CardContent, CardActions, Button, Avatar,
// // //   Dialog, DialogTitle, DialogContent, DialogActions, TextField, IconButton,
// // //   Paper, Tooltip, Skeleton, CircularProgress, InputAdornment, Chip,
// // //   FormControl, InputLabel, Select, MenuItem, FormControlLabel, OutlinedInput
// // // } from "@mui/material";

// // // import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// // // import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
// // // import { format, parseISO, isValid } from 'date-fns';
// // // import axios from "axios";

// // // // Icons
// // // import {
// // //   Edit as EditIcon, Delete as DeleteIcon, AddBox as AddBoxIcon, WorkOutline as WorkOutlineIcon,
// // //   Search as SearchIcon, Refresh as RefreshIcon, Close as CloseIcon, Save as SaveIcon,
// // //   Event as EventIcon, PersonOutline as PersonOutlineIcon, FlagOutlined as FlagOutlinedIcon,
// // //   Notes as NotesIcon, TrendingUp as TrendingUpIcon, MonetizationOnOutlined as BudgetIcon,
// // //   WarningAmber as WarningAmberIcon, CheckCircleOutline as CheckCircleOutlineIcon,

// // //   Cancel as CancelIcon, PeopleAlt as PeopleAltIcon, FolderOpen as FolderOpenIcon,
// // //   CheckCircle as CheckCircleIcon, PlayCircleOutline as PlayCircleOutlineIcon
// // // } from "@mui/icons-material";

// // // // --- Assuming axiosInstance is configured like this ---
// // // const axiosInstance = axios.create({
// // //   baseURL: "https://tdtlworld.com/hrms-backend/api/",
// // // });
// // // // ----------------------------------------------------

// // // const gradientButtonStyle = { /* (Style unchanged) */ };

// // // // Helper functions (unchanged)
// // // const formatDateToInput = (dateObj) => { /* ... */ };
// // // const parseInputToDate = (dateString) => { /* ... */ };
// // // const ProjectCardSkeleton = () => { /* ... */ };
// // // const StatCard = () => { /* ... */ };


// // // export default function Projects() {
// // //   const [projects, setProjects] = useState([]);
// // //   const [filteredProjects, setFilteredProjects] = useState([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [submitLoading, setSubmitLoading] = useState(false);
// // //   const [searchQuery, setSearchQuery] = useState("");

// // //   // State for dropdown data
// // //   const [clients, setClients] = useState([]);
// // //   const [employees, setEmployees] = useState([]);

// // //   const [openDialog, setOpenDialog] = useState(false);
// // //   const [isEditing, setIsEditing] = useState(false);
// // //   const [currentProject, setCurrentProject] = useState(null);

// // //   // Initial state updated for multi-select
// // //   const initialProjectState = {
// // //     client_id: "", title: "", start_date: null, end_date: null,
// // //     assigned_to: [], // Changed to an array for multi-select
// // //     associated_goals: "", priority: "Medium", budget_hours: "",
// // //     summary: "", description: "", project_progress: 0,
// // //     project_note: "", status: true,
// // //   };

// // //   const fetchAllData = async () => {
// // //     setLoading(true);
// // //     try {
// // //       // Fetch all data in parallel for efficiency
// // //       const [projectsRes, clientsRes, employeesRes] = await Promise.all([
// // //         axiosInstance.get("projects/"),
// // //         axiosInstance.get("clients/"),
// // //         axiosInstance.get("employee-dropdown/"),
// // //       ]);

// // //       const formattedData = (projectsRes.data || []).map(p => ({
// // //         ...p, project_id: p.id, client_id: p.client_name || '',
// // //         project_progress: parseInt(String(p.project_progress).replace('%', ''), 10) || 0,
// // //         status: !!p.status,
// // //       }));
// // //       setProjects(formattedData);
// // //       setFilteredProjects(formattedData);
// // //       setClients(clientsRes.data || []);
// // //       setEmployees(employeesRes.data || []);

// // //     } catch (error) {
// // //       console.error("Failed to fetch initial data:", error);
// // //       // Set to empty arrays on error to prevent crashes
// // //       setProjects([]);
// // //       setFilteredProjects([]);
// // //       setClients([]);
// // //       setEmployees([]);
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     fetchAllData();
// // //   }, []);

// // //   // Filter projects (unchanged)
// // //   useEffect(() => { /* ... */ }, [searchQuery, projects]);

// // //   const handleClickOpen = (project = null) => {
// // //     setIsEditing(!!project);
// // //     let assignedToArray = [];
// // //     if (project && project.assigned_to) {
// // //         try {
// // //             // Safely parse the stringified array from the API
// // //             const parsed = JSON.parse(project.assigned_to);
// // //             if (Array.isArray(parsed)) {
// // //                 assignedToArray = parsed;
// // //             }
// // //         } catch (e) {
// // //             console.error("Failed to parse assigned_to:", e);
// // //             assignedToArray = []; // Default to empty array on parsing error
// // //         }
// // //     }

// // //     setCurrentProject(
// // //       project
// // //         ? {
// // //             ...project,
// // //             assigned_to: assignedToArray, // Use the parsed array
// // //             start_date: parseInputToDate(project.start_date),
// // //             end_date: parseInputToDate(project.end_date),
// // //           }
// // //         : initialProjectState
// // //     );
// // //     setOpenDialog(true);
// // //   };

// // //   const handleCloseDialog = () => { /* (Unchanged) */ };
// // //   const handleDateChange = () => { /* (Unchanged) */ };

// // //   // Updated input change handler for multi-select
// // //   const handleInputChange = (e) => {
// // //     const { name, value, type, checked } = e.target;
// // //     setCurrentProject((prev) => ({
// // //       ...prev,
// // //       [name]: type === 'checkbox' ? checked : value,
// // //     }));
// // //   };

// // //   const handleSaveProject = async () => {
// // //     // ... (Validation unchanged)
// // //     setSubmitLoading(true);

// // //     const payload = {
// // //       ...currentProject,
// // //       client_id: currentProject.client_id,
// // //       start_date: formatDateToInput(currentProject.start_date),
// // //       end_date: formatDateToInput(currentProject.end_date),
// // //       budget_hours: String(currentProject.budget_hours || "0"),
// // //       project_progress: `${currentProject.project_progress || 0}%`,
// // //       status: currentProject.status ? 1 : 0,
// // //       // Stringify the 'assigned_to' array for the API
// // //       assigned_to: JSON.stringify(currentProject.assigned_to || []),
// // //     };
// // //     delete payload.project_id;
// // //     delete payload.id;

// // //     try {
// // //       if (isEditing) {
// // //         await axiosInstance.patch(`projects/${currentProject.project_id}/`, payload);
// // //       } else {
// // //         await axiosInstance.post("projects/", payload);
// // //       }
// // //       handleCloseDialog();
// // //       fetchAllData(); // Refresh all data
// // //     } catch (error) {
// // //         // ... (Error handling unchanged)
// // //     } finally {
// // //       setSubmitLoading(false);
// // //     }
// // //   };

// // //   const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);
// // //   const [projectToDelete, setProjectToDelete] = useState(null);
// // //   const handleOpenDeleteConfirm = () => { /* (Unchanged) */ };
// // //   const handleCloseDeleteConfirm = () => { /* (Unchanged) */ };

// // //   const handleDeleteProject = async () => {
// // //     // ... (Logic unchanged, but uses fetchAllData for refresh)
// // //     await axiosInstance.delete(`projects/${projectToDelete.project_id}/`);
// // //     fetchAllData(); // Refresh all data
// // //     // ...
// // //   };

// // //   // Summary counts (unchanged)
// // //   const completedCount = 0; /* ... */

// // //   // UPDATED Field Configuration
// // //   const projectFieldsConfig = [
// // //     { name: "title", label: "Project Title", icon: <WorkOutlineIcon fontSize="small"/> },
// // //     { name: "client_id", label: "Client Company Name", type: "select", optionsSource: "clients", icon: <PeopleAltIcon fontSize="small"/>, halfWidth: true },
// // //     { name: "priority", label: "Priority", type: "select", options: ["High", "Medium", "Low"], icon: <FlagOutlinedIcon fontSize="small"/>, halfWidth: true },
// // //     { name: "start_date", label: "Start Date", type: "date", icon: <EventIcon fontSize="small"/>, halfWidth: true },
// // //     { name: "end_date", label: "End Date", type: "date", icon: <EventIcon fontSize="small"/>, halfWidth: true },
// // //     { name: "budget_hours", label: "Budget Hours", type: "number", icon: <BudgetIcon fontSize="small"/>, halfWidth: true },
// // //     { name: "project_progress", label: "Progress (%)", type: "number", icon: <TrendingUpIcon fontSize="small"/>, halfWidth: true },
// // //     { name: "assigned_to", label: "Assigned To", type: "multiselect", optionsSource: "employees", icon: <PersonOutlineIcon fontSize="small"/> },
// // //     { name: "summary", label: "Summary", multiline: true, rows: 2, icon: <NotesIcon fontSize="small"/> },
// // //     { name: "description", label: "Description", multiline: true, rows: 4, icon: <NotesIcon fontSize="small"/> },
// // //     { name: "project_note", label: "Internal Note", multiline: true, rows: 2, icon: <NotesIcon fontSize="small"/> },
// // //     { name: "associated_goals", label: "Associated Goals", icon: <NotesIcon fontSize="small"/> },
// // //     { name: "status", label: "Project Active", type: "checkbox" },
// // //   ];


// // //   return (
// // //     <LocalizationProvider dateAdapter={AdapterDateFns}>
// // //       <Box sx={{ p: { xs: 2, sm: 3 } }}>
// // //         {/* Header and Summary Cards (Unchanged) */}

// // //         {/* Dialog Rendering Logic is now more complex */}
// // //         <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth PaperProps={{ sx: { borderRadius: 3 } }}>
// // //           <DialogTitle> {/* ... */} </DialogTitle>
// // //           <DialogContent dividers sx={{ p: { xs: 2, sm: 3 }, backgroundColor: 'grey.50' }}>
// // //             <Grid container spacing={2.5}>
// // //               {currentProject && projectFieldsConfig.map(({ name, label, type, options, multiline, rows, icon, halfWidth, optionsSource }) => {
// // //                 const commonProps = { /* ... */ };

// // //                 // ... (Date and Checkbox render logic unchanged)

// // //                 if (type === "select") {
// // //                     let menuItems = [];
// // //                     if (optionsSource === 'clients') {
// // //                         menuItems = clients.map(client => <MenuItem key={client.id} value={client.company_name}>{client.company_name}</MenuItem>);
// // //                     } else {
// // //                         menuItems = (options || []).map(opt => <MenuItem key={opt} value={opt}>{opt}</MenuItem>);
// // //                     }
// // //                     return (
// // //                         <Grid item xs={12} sm={halfWidth ? 6 : 12} key={name}>
// // //                             <FormControl fullWidth size="small" margin="dense">
// // //                                 <InputLabel>{label}</InputLabel>
// // //                                 <Select label={label} {...commonProps}>{menuItems}</Select>
// // //                             </FormControl>
// // //                         </Grid>
// // //                     );
// // //                 }

// // //                 if (type === "multiselect") {
// // //                     return (
// // //                         <Grid item xs={12} sm={halfWidth ? 6 : 12} key={name}>
// // //                            <FormControl fullWidth size="small" margin="dense">
// // //                             <InputLabel>{label}</InputLabel>
// // //                             <Select
// // //                                 multiple
// // //                                 label={label}
// // //                                 {...commonProps} // includes value, name, onChange
// // //                                 input={<OutlinedInput label={label} />}
// // //                                 renderValue={(selected) => (
// // //                                     <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
// // //                                         {selected.map((value) => {
// // //                                             const employee = employees.find(e => e.id === value);
// // //                                             return <Chip key={value} label={employee ? `${employee.first_name} ${employee.last_name}` : value} />;
// // //                                         })}
// // //                                     </Box>
// // //                                 )}
// // //                             >
// // //                                 {employees.map((employee) => (
// // //                                     <MenuItem key={employee.id} value={employee.id}>
// // //                                         {`${employee.first_name} ${employee.last_name}`}
// // //                                     </MenuItem>
// // //                                 ))}
// // //                             </Select>
// // //                            </FormControl>
// // //                         </Grid>
// // //                     );
// // //                 }
                
// // //                 return ( <Grid item xs={12} sm={halfWidth ? 6 : 12} key={name}><TextField {...commonProps} type={type || "text"} multiline={multiline} rows={rows} /></Grid> );
// // //               })}
// // //             </Grid>
// // //           </DialogContent>
// // //           <DialogActions> {/* ... */} </DialogActions>
// // //         </Dialog>
        
// // //         {/* Delete Confirmation Dialog (Unchanged) */}
// // //       </Box>
// // //     </LocalizationProvider>
// // //   );
// // // }


// import React, { useEffect, useState } from "react";
// import {
//   Box, Typography, Grid, Card, CardContent, CardActions, Button, Avatar,
//   Dialog, DialogTitle, DialogContent, DialogActions, TextField, IconButton,
//   Paper, Tooltip, Skeleton, CircularProgress, InputAdornment, Chip,
//   FormControl, InputLabel, Select, MenuItem
// } from "@mui/material";

// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
// import { format, parseISO, isValid } from 'date-fns';
// import axiosInstance from "../utils/axiosInstance";

// // Icons
// import {
//   Edit as EditIcon,
//   Delete as DeleteIcon,
//   AddBox as AddBoxIcon,
//   WorkOutline as WorkOutlineIcon,
//   Search as SearchIcon,
//   Refresh as RefreshIcon,
//   Close as CloseIcon,
//   Save as SaveIcon,
//   Event as EventIcon,
//   PersonOutline as PersonOutlineIcon,
//   FlagOutlined as FlagOutlinedIcon,
//   Notes as NotesIcon,
//   TrendingUp as TrendingUpIcon,
//   MonetizationOnOutlined as BudgetIcon,
//   WarningAmber as WarningAmberIcon,
//   Group as GroupIcon,
//   Folder as FolderIcon,
//   Timeline as TimelineIcon,
//   PauseCircle as PauseCircleIcon,
//   ConfirmationNumber as ConfirmationNumberIcon,
//   CheckCircleOutline as CheckCircleOutlineIcon,
//   Cancel as CancelIcon,
//   PeopleAlt as PeopleAltIcon,
//   Business as BusinessIcon,
// } from "@mui/icons-material";
// import FormControlLabel from '@mui/material/FormControlLabel';

// // (Keep all your existing styles, helpers, and skeleton components)
// // ...
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

// const formatDateToInput = (dateObj) => {
//   if (!dateObj || !(dateObj instanceof Date) || isNaN(dateObj)) return '';
//   return format(dateObj, 'yyyy-MM-dd');
// };

// const parseInputToDate = (dateString) => {
//   if (!dateString) return null;
//   const parsed = parseISO(dateString);
//   return isValid(parsed) ? parsed : null;
// };

// const ProjectCardSkeleton = () => (
//   <Grid item xs={12} md={6}><Card sx={{ borderRadius: 2, height: '100%' }}><CardContent><Skeleton variant="text" width="70%" height={30} /><Skeleton variant="text" width="50%" sx={{ mt: 1 }}/><Skeleton variant="rectangular" height={60} sx={{ my: 1, borderRadius:1 }}/><Skeleton variant="text" width="30%" /></CardContent><CardActions sx={{ justifyContent: 'space-between', p:1.5, borderTop: '1px solid', borderColor:'divider' }}><Skeleton variant="circular" width={40} height={40} /><Box><Skeleton variant="circular" width={32} height={32} sx={{display:'inline-block', mr:1}} /><Skeleton variant="circular" width={32} height={32} sx={{display:'inline-block'}} /></Box></CardActions></Card></Grid>
// );

// const StatCard = ({ title, value, icon, gradient }) => (
//     <Grid item xs={12} sm={6} md={3}><Card sx={{ textAlign: "center", color: "#FFF", borderRadius: 2, background: gradient, transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out', '&:hover': { transform: 'scale(1.03)', boxShadow: "0 8px 25px rgba(0,0,0,0.2)" }}}><CardContent sx={{ py: 3 }}>{React.cloneElement(icon, { sx:{ fontSize: "2.5rem", mb: 1 }})}<Typography variant="h5" sx={{fontWeight: 'bold'}}>{value}</Typography><Typography variant="body2">{title}</Typography></CardContent></Card></Grid>
// );


// export default function Projects() {
//   const [projects, setProjects] = useState([]);
//   const [filteredProjects, setFilteredProjects] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [submitLoading, setSubmitLoading] = useState(false);
//   const [refreshKey, setRefreshKey] = useState(0);
//   const [searchQuery, setSearchQuery] = useState("");

//   const [clientsList, setClientsList] = useState([]);
//   const [clientsLoading, setClientsLoading] = useState(true);
//   const [companyList, setCompanyList] = useState([]);

//   const [openDialog, setOpenDialog] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [currentProject, setCurrentProject] = useState(null);

//   const initialProjectState = {
//    company_id: "", client_id: "", title: "", start_date: null, end_date: null,
//     assigned_to: "", associated_goals: "", priority: "Medium", project_no: "",
//     budget_hours: "", summary: "", description: "", project_progress: "0",
//     project_note: "", status: true, added_by: "1",id:"",
//   };

//   const fetchProjects = async () => {
//     setLoading(true);
//     try {
//       const response = await axiosInstance.get("api/projects/");
//       setProjects(response.data || []);
//       setFilteredProjects(response.data || []);
//     } catch (error) {
//       console.error("Failed to fetch projects:", error);
//       setProjects([]);
//       setFilteredProjects([]);
//     } finally {
//       setLoading(false);
//     }
//   };
 
//   const fetchClients = async () => {
//     setClientsLoading(true);
//     try {
//       const response = await axiosInstance.get("api/clients/");
//       const clientsData = response.data || [];
//       setClientsList(clientsData);


//       if (clientsData.length > 0) {
//         const uniqueCompanies = [...new Set(clientsData.map(client => client.company_name).filter(Boolean))];
//         setCompanyList(uniqueCompanies);
//       }

//     } catch (error) {
//       console.error("Failed to fetch clients:", error);
//       setClientsList([]);
//       setCompanyList([]);
//     } finally {
//       setClientsLoading(false);
//     }
//   };


//   useEffect(() => {
//     fetchProjects();
//     fetchClients();
//   }, [refreshKey]);

//   useEffect(() => {
//     if (!projects) return;
//     const lowercasedQuery = searchQuery.toLowerCase();
//     const filtered = projects.filter(project =>
//         project.title?.toLowerCase().includes(lowercasedQuery) ||
//         project.project_no?.toLowerCase().includes(lowercasedQuery) ||
//         (project.status ? "active" : "inactive").includes(lowercasedQuery)
//     );
//     setFilteredProjects(filtered);
//   }, [searchQuery, projects]);

//   const handleRefresh = () => setRefreshKey(k => k + 1);

//   const handleClickOpen = (project = null) => {
//     setIsEditing(!!project);
//     if (project) {
//         // Find the client's name from their ID to pre-fill the form correctly.
//         const clientName = clientsList.find(c => c.id === project.client_id)?.full_name || "";
//         setCurrentProject({
//             ...project,
//             client_id: clientName, // Use the string name for the form state
//             start_date: parseInputToDate(project.start_date),
//             end_date: parseInputToDate(project.end_date),
//         });
//     } else {
//         setCurrentProject(initialProjectState);
//     }
//     setOpenDialog(true);
//   };

//   const handleCloseDialog = () => {
//     setOpenDialog(false);
//     setIsEditing(false);
//     setCurrentProject(null);
//   };
//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setCurrentProject((prev) => ({...prev, [name]: type === 'checkbox' ? checked : value}));
//   };
//   const handleDateChange = (name, date) => {
//     setCurrentProject((prev) => ({ ...prev, [name]: date }));
//   };

//   // --- FIXED: handleSaveProject now correctly sends the numeric ID on edit ---
//   const handleSaveProject = async () => {
//     if (!currentProject || !currentProject.title || !currentProject.client_id || !currentProject.company_id || !currentProject.start_date || !currentProject.end_date) {
//         alert("Please fill in Title, Client, Company, Start Date, and End Date.");
//         return;
//     }
//     setSubmitLoading(true);

//     // Prepare the base data object with formatted dates.
//     const projectData = {
//         ...currentProject,
//         start_date: formatDateToInput(currentProject.start_date),
//         end_date: formatDateToInput(currentProject.end_date),
//         budget_hours: currentProject.budget_hours ? parseFloat(currentProject.budget_hours) : null,
//         project_progress: currentProject.project_progress ? parseInt(currentProject.project_progress, 10) : 0,
//     };

//     try {
//         if (isEditing) {
//             // For editing, we must find the numeric ID from the client's name.
//             const selectedClient = clientsList.find(c => c.full_name === projectData.client_id);
//             if (!selectedClient) {
//                 alert("Could not find a valid ID for the selected client. Please re-select the client.");
//                 setSubmitLoading(false);
//                 return;
//             }
//             // Create the final payload with the numeric client_id.
//             const payload = { ...projectData, client_id: selectedClient.full_name };
//             await axiosInstance.patch(`/api/projects/${currentProject.id}/`, payload);
//         } else {
//             // For creating, we send the name string directly as requested.
//             const { project_id, ...createData } = projectData;
//             await axiosInstance.post("api/projects/", {...createData, created_at: new Date().toISOString()});
//         }
//         handleCloseDialog();
//         fetchProjects();
//     } catch (error) {
//         console.error("Failed to save project:", error.response?.data || error.message);
//         alert(`Failed to save project: ${JSON.stringify(error.response?.data) || error.message}`);
//     } finally {
//         setSubmitLoading(false);
//     }
//   };


//   const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);
//   const [projectToDelete, setProjectToDelete] = useState(null);
//   const handleOpenDeleteConfirm = (project) => { setProjectToDelete(project); setOpenDeleteConfirm(true); };
//   const handleCloseDeleteConfirm = () => { setOpenDeleteConfirm(false); setProjectToDelete(null); };
//   const handleDeleteProject = async () => {
//     if (!projectToDelete) return;
//     try {
//       await axiosInstance.delete(`/api/projects/${projectToDelete.id}/`);
//       fetchProjects();
//       handleCloseDeleteConfirm();
//     } catch (error) {
//       console.error("Failed to delete project:", error);
//       alert("Failed to delete project.");
//     }
//   };

//   const completedCount = projects?.filter(p => p.project_progress === 100).length || 0;
//   const inProgressCount = projects?.filter(p => p.project_progress > 0 && p.project_progress < 100).length || 0;
//   const notStartedCount = projects?.filter(p => p.project_progress === 0).length || 0;
//   const onHoldCount = projects?.filter(p => p.status_text?.toLowerCase() === 'on hold').length || 0;


//   const projectFieldsConfig = [
//     { name: "project_no", label: "Project Number", icon: <ConfirmationNumberIcon fontSize="small"/>, halfWidth: true },
//     { name: "title", label: "Project Title", icon: <WorkOutlineIcon fontSize="small"/> },
//     { name: "client_id", label: "Client Name", type: "client_select", icon: <PeopleAltIcon fontSize="small"/>, halfWidth: true },
//     { name: "company_id", label: "Company Name", type: "company_select", icon: <BusinessIcon fontSize="small"/>, halfWidth: true },
//     { name: "start_date", label: "Start Date", type: "date", icon: <EventIcon fontSize="small"/>, halfWidth: true },
//     { name: "end_date", label: "End Date", type: "date", icon: <EventIcon fontSize="small"/>, halfWidth: true },
//     { name: "assigned_to", label: "Assigned To", icon: <PersonOutlineIcon fontSize="small"/>, halfWidth: true },
//     { name: "priority", label: "Priority", type: "select", options: ["High", "Medium", "Low"], icon: <FlagOutlinedIcon fontSize="small"/>, halfWidth: true },
//     { name: "budget_hours", label: "Budget Hours", type: "number", icon: <BudgetIcon fontSize="small"/>, halfWidth: true },
//     { name: "project_progress", label: "Progress (%)", type: "number", icon: <TrendingUpIcon fontSize="small"/>, halfWidth: true },
//     { name: "summary", label: "Summary", multiline: true, rows: 2, icon: <NotesIcon fontSize="small"/> },
//     { name: "description", label: "Description", multiline: true, rows: 4, icon: <NotesIcon fontSize="small"/> },
//     { name: "project_note", label: "Internal Note", multiline: true, rows: 2, icon: <NotesIcon fontSize="small"/> },
//     { name: "associated_goals", label: "Associated Goals", icon: <TimelineIcon fontSize="small"/> },
//     { name: "status", label: "Project Active", type: "checkbox" },
//     { name: "added_by", label: "Added By (User ID)", icon: <PersonOutlineIcon fontSize="small"/> }
//   ];


//   return (
//     <LocalizationProvider dateAdapter={AdapterDateFns}>
//     <Box sx={{ p: { xs: 2, sm: 3 } }}>
//       <Card elevation={0} sx={{ mb: 3, borderRadius: 2, background: "linear-gradient(135deg, rgba(36, 73, 239, 0.03) 0%, rgba(218, 18, 202, 0.03) 100%)", borderLeft: "5px solid", borderImage: "linear-gradient(135deg, rgba(36, 73, 239, 0.89) 0%, rgb(218, 18, 202) 100%) 1" }}>
//         <CardContent sx={{ p: { xs: 2, sm: 3 } }}><Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}><WorkOutlineIcon sx={{ fontSize: '2rem', mr: 1, color: 'primary.main' }} /><Typography variant="h4" sx={{ fontWeight: 700, color: "text.primary" }}>Projects Management</Typography></Box><Typography variant="body2" color="text.secondary">Oversee, add, and manage all your ongoing and completed projects.</Typography></CardContent>
//       </Card>

//       <Grid container spacing={2.5} sx={{ mb: 3 }}>
//         <StatCard title="Total Completed" value={completedCount} icon={<GroupIcon />} gradient="linear-gradient(135deg, #66bb6a 0%, #43a047 100%)" />
//         <StatCard title="In Progress" value={inProgressCount} icon={<FolderIcon />} gradient="linear-gradient(135deg, #42a5f5 0%, #1e88e5 100%)" />
//         <StatCard title="Not Started" value={notStartedCount} icon={<TimelineIcon />} gradient="linear-gradient(135deg, #ffa726 0%, #fb8c00 100%)" />
//         <StatCard title="On Hold" value={onHoldCount} icon={<PauseCircleIcon />} gradient="linear-gradient(135deg, #ef5350 0%, #e53935 100%)" />
//       </Grid>

//       <Paper sx={{ p: 2.5, mb: 3, borderRadius: 2, boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
//         <Grid container spacing={2} alignItems="center">
//             <Grid item xs={12} sm={6} md={8}><TextField fullWidth variant="outlined" placeholder="Search Projects by Title, Number, Status..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} InputProps={{ startAdornment: (<InputAdornment position="start"><SearchIcon color="action" /></InputAdornment>)}} sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} /></Grid>
//             <Grid item xs={12} sm={6} md={4} sx={{ display: 'flex', justifyContent: {xs: 'flex-start', sm: 'flex-end'}, gap: 1 }}>
//                 <Tooltip title="Refresh Projects"><IconButton onClick={handleRefresh} color="primary" sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2 }}><RefreshIcon /></IconButton></Tooltip>
//                 <Button startIcon={<AddBoxIcon />} onClick={() => handleClickOpen()} sx={{ ...gradientButtonStyle, py: 1.25, px: 3 }}>Add Project</Button>
//             </Grid>
//         </Grid>
//       </Paper>

//       {loading ? (
//         <Grid container spacing={2.5}>{Array.from(new Array(4)).map((_, index) => (<ProjectCardSkeleton key={index} />))}</Grid>
//       ) : filteredProjects.length === 0 ? (
//           <Paper sx={{textAlign: 'center', p:5, borderRadius: 2, mt: 2}}><WorkOutlineIcon sx={{fontSize: 60, color: 'text.disabled', mb: 2}}/><Typography variant="h6" color="text.secondary">{searchQuery ? "No projects match your search." : "No projects found."}</Typography><Typography variant="body2" color="text.secondary" sx={{mt:1}}>{searchQuery ? "Try a different search term." : "Click 'Add Project' to create a new one."}</Typography></Paper>
//       ) : (
//         <Grid container spacing={2.5}>
//             {filteredProjects.map((project) => {
//               const startDate = parseInputToDate(project.start_date);
//               const endDate = parseInputToDate(project.end_date);
//               return (
//                 <Grid item xs={12} md={6} lg={4} key={project.project_id}>
//                     <Card sx={{ borderRadius: 2, height: '100%', display: 'flex', flexDirection: 'column', transition: 'box-shadow 0.3s', '&:hover': {boxShadow: 6} }}>
//                     <CardContent sx={{ flexGrow: 1, pb:1 }}>
//                         <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems:'flex-start', mb:1}}><Typography variant="h6" component="div" sx={{ fontWeight: 'bold', color: 'primary.dark', flexGrow:1, mr:1 }}>{project.title}</Typography><Chip label={project.status ? "Active" : "Inactive"} color={project.status ? "success" : "error"} size="small" variant="outlined" icon={project.status ? <CheckCircleOutlineIcon fontSize="inherit"/> : <CancelIcon fontSize="inherit"/> }/></Box>
//                         <Typography variant="caption" color="textSecondary" display="block" gutterBottom>Project #: {project.project_no || 'N/A'}</Typography>
//                         <Typography variant="body2" color="text.secondary" sx={{ mb: 1, minHeight: '40px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', textOverflow: 'ellipsis' }}>{project.summary || project.description || "No summary available."}</Typography>
//                         <Grid container spacing={1} sx={{fontSize:'0.8rem', color:'text.secondary'}}><Grid item xs={6} sx={{display:'flex', alignItems:'center'}}><EventIcon fontSize="inherit" sx={{mr:0.5}}/> Start: {startDate ? format(startDate, 'dd MMM yyyy') : 'N/A'}</Grid><Grid item xs={6} sx={{display:'flex', alignItems:'center'}}><EventIcon fontSize="inherit" sx={{mr:0.5}}/> End: {endDate ? format(endDate, 'dd MMM yyyy') : 'N/A'}</Grid><Grid item xs={6} sx={{display:'flex', alignItems:'center'}}><PersonOutlineIcon fontSize="inherit" sx={{mr:0.5}}/> By: {project.added_by_username || project.added_by || 'N/A'}</Grid><Grid item xs={6} sx={{display:'flex', alignItems:'center'}}><FlagOutlinedIcon fontSize="inherit" sx={{mr:0.5}}/> {project.priority || 'N/A'}</Grid></Grid>
//                     </CardContent>
//                     <CardActions sx={{ p:1, borderTop: '1px solid', borderColor: 'divider', display: 'flex', justifyContent: 'space-between', bgcolor: 'grey.50' }}><Avatar sx={{ width: 32, height: 32, bgcolor: 'secondary.light', color: 'secondary.dark', fontSize: '0.8rem' }}>{String(project.assigned_to || "NA")[0].toUpperCase()}</Avatar><Box><Tooltip title="Edit Project"><IconButton size="small" sx={{color: 'secondary.main'}} onClick={() => handleClickOpen(project)}><EditIcon fontSize="small"/></IconButton></Tooltip><Tooltip title="Delete Project"><IconButton size="small" sx={{color: 'error.main'}} onClick={() => handleOpenDeleteConfirm(project)}><DeleteIcon fontSize="small"/></IconButton></Tooltip></Box></CardActions>
//                     </Card>
//                 </Grid>
//               );
//             })}
//         </Grid>
//       )}

//       {/* Add/Edit Dialog */}
//       <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth PaperProps={{ sx: { borderRadius: 3 } }}>
//         <DialogTitle sx={{ ...gradientButtonStyle, color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1.5 }}>
//           {isEditing ? "Edit Project" : "Add New Project"}
//           <IconButton onClick={handleCloseDialog} sx={{ color: 'rgba(255,255,255,0.8)', '&:hover': {color: 'white'} }}><CloseIcon /></IconButton>
//         </DialogTitle>
//         <DialogContent dividers sx={{ p: { xs: 2, sm: 3 }, backgroundColor: 'grey.50' }}>
//           <Grid container spacing={2.5}>
//             {currentProject && projectFieldsConfig.map(({ name, label, type, options, multiline, rows, icon, halfWidth }) => {
//               if (name === "project_id" || name === "created_at" || name === "added_by") return null;

//               const commonProps = { key: name, label: label, name: name, value: currentProject[name] ?? '', onChange: handleInputChange, fullWidth: true, margin: "dense", size: "small", sx: {"& .MuiOutlinedInput-root": {borderRadius:2}}, InputProps: icon ? {startAdornment: <InputAdornment position="start">{icon}</InputAdornment>} : {} };

//               if (type === "date") {
//                 return ( <Grid item xs={12} sm={halfWidth ? 6 : 12} key={name}><DatePicker label={label} value={currentProject[name] || null} onChange={(date) => handleDateChange(name, date)} renderInput={(params) => <TextField {...params} {...commonProps} InputLabelProps={{shrink:true}} error={false} helperText="" />} /></Grid> );
//               } else if (type === "select") {
//                 return ( <Grid item xs={12} sm={halfWidth ? 6 : 12} key={name}><FormControl fullWidth required size="small" margin="dense" sx={{"& .MuiOutlinedInput-root": {borderRadius:2}}}><InputLabel id={`${name}-label`}>{label}</InputLabel><Select labelId={`${name}-label`} label={label} {...commonProps} value={currentProject[name] || options[0]}>{options.map(opt => <MenuItem key={opt} value={opt}>{opt}</MenuItem>)}</Select></FormControl></Grid> );
//               } else if (type === "client_select") {
//                 return (
//                   <Grid item xs={12} sm={halfWidth ? 6 : 12} key={name}>
//                     <FormControl fullWidth required size="small" margin="dense" sx={{"& .MuiOutlinedInput-root": {borderRadius:2}}}>
//                         <InputLabel id={`${name}-label`}>{label}</InputLabel>
//                         <Select labelId={`${name}-label`} label={label} {...commonProps} disabled={clientsLoading}>
//                             {clientsLoading ? (<MenuItem value="" disabled><em>Loading clients...</em></MenuItem>) : clientsList.length === 0 ? (<MenuItem value="" disabled><em>No clients found.</em></MenuItem>) : (clientsList.map(client => (
//                                 <MenuItem key={client.id} value={client.full_name}>{client.full_name}</MenuItem>
//                             )))}
//                         </Select>
//                     </FormControl>
//                   </Grid>
//                 );
//               } else if (type === "company_select") {
//                 return (
//                   <Grid item xs={12} sm={halfWidth ? 6 : 12} key={name}>
//                     <FormControl fullWidth required size="small" margin="dense" sx={{"& .MuiOutlinedInput-root": {borderRadius:2}}}>
//                         <InputLabel id={`${name}-label`}>{label}</InputLabel>
//                         <Select labelId={`${name}-label`} label={label} {...commonProps} disabled={clientsLoading}>
//                             {clientsLoading ? (<MenuItem value="" disabled><em>Loading companies...</em></MenuItem>) : companyList.length === 0 ? (<MenuItem value="" disabled><em>No companies found.</em></MenuItem>) : (companyList.map(companyName => (<MenuItem key={companyName} value={companyName}>{companyName}</MenuItem>)))}
//                         </Select>
//                     </FormControl>
//                   </Grid>
//                 );
//               } else if (type === "checkbox") {
//                 return ( <Grid item xs={12} sm={halfWidth ? 6 : 12} key={name} sx={{alignSelf: 'center'}}><FormControlLabel control={<Chip icon={currentProject[name] ? <CheckCircleOutlineIcon/> : <CancelIcon/>} label={currentProject[name] ? "Active" : "Inactive"} clickable color={currentProject[name] ? "success" : "error"} onClick={() => setCurrentProject(prev => ({...prev, [name]: !prev[name]}))} variant="outlined" sx={{borderRadius:1.5, p:0.5}} />} labelPlacement="start" label={label} sx={{mr:0, ml:0, justifyContent:'space-between', width: '100%'}}/></Grid> );
//               }
//               return ( <Grid item xs={12} sm={halfWidth ? 6 : 12} key={name}><TextField {...commonProps} type={type || "text"} multiline={multiline} rows={rows} /></Grid> );
//             })}
//           </Grid>
//         </DialogContent>
//         <DialogActions sx={{ p: 2, backgroundColor: 'grey.50', borderTop: '1px solid', borderColor: 'divider' }}>
//           <Button onClick={handleCloseDialog} color="inherit" sx={{borderRadius:2}} disabled={submitLoading}>Cancel</Button>
//           <Button onClick={handleSaveProject} sx={{...gradientButtonStyle, minWidth: '150px', py: '10px', px: 3}} disabled={submitLoading}>{submitLoading ? <CircularProgress size={24} color="inherit" /> : (isEditing ? <><SaveIcon sx={{mr:1}}/>Save Changes</> : <><AddBoxIcon sx={{mr:1}}/>Add Project</>)}</Button>
//         </DialogActions>
//       </Dialog>

//       <Dialog open={openDeleteConfirm} onClose={handleCloseDeleteConfirm} PaperProps={{sx: {borderRadius: 3}}}>
//         <DialogTitle sx={{display: 'flex', alignItems: 'center'}}><WarningAmberIcon color="error" sx={{mr:1}}/> Confirm Deletion</DialogTitle>
//         <DialogContent><Typography>Are you sure you want to delete the project: <strong>{projectToDelete?.title}</strong>? This action cannot be undone.</Typography></DialogContent>
//         <DialogActions sx={{px:3, pb:2}}><Button onClick={handleCloseDeleteConfirm} color="inherit" sx={{borderRadius:2}}>Cancel</Button><Button onClick={handleDeleteProject} variant="contained" color="error" sx={{borderRadius:2}}>Delete</Button></DialogActions>
//       </Dialog>
//     </Box>
//     </LocalizationProvider>
//   );
// }

import React, { useEffect, useState } from "react";
import {
  Box, Typography, Grid, Card, CardContent, CardActions, Button, Avatar,
  Dialog, DialogTitle, DialogContent, DialogActions, TextField, IconButton,
  Paper, Tooltip, Skeleton, CircularProgress, InputAdornment, Chip,
  FormControl, InputLabel, Select, MenuItem, OutlinedInput, AvatarGroup, // Added OutlinedInput & AvatarGroup
} from "@mui/material";

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { format, parseISO, isValid } from 'date-fns';
import axios from 'axios'; // Imported axios for external API call
import axiosInstance from "../utils/axiosInstance";

// Icons
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  AddBox as AddBoxIcon,
  WorkOutline as WorkOutlineIcon,
  Search as SearchIcon,
  Refresh as RefreshIcon,
  Close as CloseIcon,
  Save as SaveIcon,
  Event as EventIcon,
  PersonOutline as PersonOutlineIcon,
  FlagOutlined as FlagOutlinedIcon,
  Notes as NotesIcon,
  TrendingUp as TrendingUpIcon,
  MonetizationOnOutlined as BudgetIcon,
  WarningAmber as WarningAmberIcon,
  Group as GroupIcon,
  Folder as FolderIcon,
  Timeline as TimelineIcon,
  PauseCircle as PauseCircleIcon,
  ConfirmationNumber as ConfirmationNumberIcon,
  CheckCircleOutline as CheckCircleOutlineIcon,
  Cancel as CancelIcon,
  PeopleAlt as PeopleAltIcon,
  Business as BusinessIcon,
} from "@mui/icons-material";
import FormControlLabel from '@mui/material/FormControlLabel';


// (Keep all your existing styles, helpers, and skeleton components)
// ...
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

const formatDateToInput = (dateObj) => {
  if (!dateObj || !(dateObj instanceof Date) || isNaN(dateObj)) return '';
  return format(dateObj, 'yyyy-MM-dd');
};

const parseInputToDate = (dateString) => {
  if (!dateString) return null;
  const parsed = parseISO(dateString);
  return isValid(parsed) ? parsed : null;
};

const ProjectCardSkeleton = () => (
  <Grid item xs={12} md={6}><Card sx={{ borderRadius: 2, height: '100%' }}><CardContent><Skeleton variant="text" width="70%" height={30} /><Skeleton variant="text" width="50%" sx={{ mt: 1 }} /><Skeleton variant="rectangular" height={60} sx={{ my: 1, borderRadius: 1 }} /><Skeleton variant="text" width="30%" /></CardContent><CardActions sx={{ justifyContent: 'space-between', p: 1.5, borderTop: '1px solid', borderColor: 'divider' }}><Skeleton variant="circular" width={40} height={40} /><Box><Skeleton variant="circular" width={32} height={32} sx={{ display: 'inline-block', mr: 1 }} /><Skeleton variant="circular" width={32} height={32} sx={{ display: 'inline-block' }} /></Box></CardActions></Card></Grid>
);

const StatCard = ({ title, value, icon, gradient }) => (
  <Grid item xs={12} sm={6} md={3}><Card sx={{ textAlign: "center", color: "#FFF", borderRadius: 2, background: gradient, transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out', '&:hover': { transform: 'scale(1.03)', boxShadow: "0 8px 25px rgba(0,0,0,0.2)" } }}><CardContent sx={{ py: 3 }}>{React.cloneElement(icon, { sx: { fontSize: "2.5rem", mb: 1 } })}<Typography variant="h5" sx={{ fontWeight: 'bold' }}>{value}</Typography><Typography variant="body2">{title}</Typography></CardContent></Card></Grid>
);


export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const [clientsList, setClientsList] = useState([]);
  const [clientsLoading, setClientsLoading] = useState(true);
  const [companyList, setCompanyList] = useState([]);

  // --- NEW: State for employees dropdown ---
  const [employeesList, setEmployeesList] = useState([]);
  const [employeesLoading, setEmployeesLoading] = useState(true);

  const [openDialog, setOpenDialog] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);

  const initialProjectState = {
    company_id: "", client_id: "", title: "", start_date: null, end_date: null,
    assigned_to: [], // --- MODIFIED: Changed to array for multi-select ---
    associated_goals: "", priority: "Medium", project_no: "",
    budget_hours: "", summary: "", description: "", project_progress: "0",
    project_note: "", status: true, added_by: "1", id: "",
  };

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("api/projects/");
      setProjects(response.data || []);
      setFilteredProjects(response.data || []);
    } catch (error) {
      console.error("Failed to fetch projects:", error);
      setProjects([]);
      setFilteredProjects([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchClients = async () => {
    setClientsLoading(true);
    try {
      const response = await axiosInstance.get("api/clients/");
      const clientsData = response.data || [];
      setClientsList(clientsData);


      if (clientsData.length > 0) {
        const uniqueCompanies = [...new Set(clientsData.map(client => client.company_name).filter(Boolean))];
        setCompanyList(uniqueCompanies);
      }

    } catch (error) {
      console.error("Failed to fetch clients:", error);
      setClientsList([]);
      setCompanyList([]);
    } finally {
      setClientsLoading(false);
    }
  };

  // --- NEW: Function to fetch employees from external API ---
  const fetchEmployees = async () => {
    setEmployeesLoading(true);
    try {
      const response = await axios.get("https://tdtlworld.com/hrms-backend/employee-dropdown/");
      setEmployeesList(response.data || []);
    } catch (error) {
      console.error("Failed to fetch employees:", error);
      setEmployeesList([]);
    } finally {
      setEmployeesLoading(false);
    }
  };


  useEffect(() => {
    fetchProjects();
    fetchClients();
    fetchEmployees(); // --- NEW: Fetch employees on component mount/refresh
  }, [refreshKey]);

  useEffect(() => {
    if (!projects) return;
    const lowercasedQuery = searchQuery.toLowerCase();
    const filtered = projects.filter(project =>
      project.title?.toLowerCase().includes(lowercasedQuery) ||
      project.project_no?.toLowerCase().includes(lowercasedQuery) ||
      (project.status ? "active" : "inactive").includes(lowercasedQuery)
    );
    setFilteredProjects(filtered);
  }, [searchQuery, projects]);

  const handleRefresh = () => setRefreshKey(k => k + 1);

  // --- MODIFIED: To handle assigned_to as an array ---
  const handleClickOpen = (project = null) => {
    setIsEditing(!!project);
    if (project) {
      const clientName = clientsList.find(c => c.id === project.client_id)?.full_name || "";
      setCurrentProject({
        ...project,
        client_id: clientName,
        start_date: parseInputToDate(project.start_date),
        end_date: parseInputToDate(project.end_date),
        // Convert comma-separated string from backend to array for the form
        assigned_to: project.assigned_to ? String(project.assigned_to).split(',') : [],
      });
    } else {
      setCurrentProject(initialProjectState);
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setIsEditing(false);
    setCurrentProject(null);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    // For multi-select, the value is already an array
    setCurrentProject((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleDateChange = (name, date) => {
    setCurrentProject((prev) => ({ ...prev, [name]: date }));
  };

  // --- MODIFIED: To handle saving assigned_to array as string ---
  const handleSaveProject = async () => {
    if (!currentProject || !currentProject.title || !currentProject.client_id || !currentProject.company_id || !currentProject.start_date || !currentProject.end_date) {
      alert("Please fill in Title, Client, Company, Start Date, and End Date.");
      return;
    }
    setSubmitLoading(true);

    const projectData = {
      ...currentProject,
      start_date: formatDateToInput(currentProject.start_date),
      end_date: formatDateToInput(currentProject.end_date),
      budget_hours: currentProject.budget_hours ? parseFloat(currentProject.budget_hours) : null,
      project_progress: currentProject.project_progress ? parseInt(currentProject.project_progress, 10) : 0,
      // Convert assigned_to array back to a comma-separated string for the backend
      assigned_to: currentProject.assigned_to.join(','),
    };

    try {
      if (isEditing) {
        const selectedClient = clientsList.find(c => c.full_name === projectData.client_id);
        if (!selectedClient) {
          alert("Could not find a valid ID for the selected client. Please re-select the client.");
          setSubmitLoading(false);
          return;
        }
        const payload = { ...projectData, client_id: selectedClient.full_name };
        await axiosInstance.patch(`/api/projects/${currentProject.id}/`, payload);
      } else {
        const { id, ...createData } = projectData; // Remove 'id' for creation
        await axiosInstance.post("api/projects/", { ...createData, created_at: new Date().toISOString() });
      }
      handleCloseDialog();
      fetchProjects();
    } catch (error) {
      console.error("Failed to save project:", error.response?.data || error.message);
      alert(`Failed to save project: ${JSON.stringify(error.response?.data) || error.message}`);
    } finally {
      setSubmitLoading(false);
    }
  };


  const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);
  const handleOpenDeleteConfirm = (project) => { setProjectToDelete(project); setOpenDeleteConfirm(true); };
  const handleCloseDeleteConfirm = () => { setOpenDeleteConfirm(false); setProjectToDelete(null); };
  const handleDeleteProject = async () => {
    if (!projectToDelete) return;
    try {
      await axiosInstance.delete(`/api/projects/${projectToDelete.id}/`);
      fetchProjects();
      handleCloseDeleteConfirm();
    } catch (error) {
      console.error("Failed to delete project:", error);
      alert("Failed to delete project.");
    }
  };

  const completedCount = projects?.filter(p => p.project_progress === 100).length || 0;
  const inProgressCount = projects?.filter(p => p.project_progress > 0 && p.project_progress < 100).length || 0;
  const notStartedCount = projects?.filter(p => p.project_progress === 0).length || 0;
  const onHoldCount = projects?.filter(p => p.status_text?.toLowerCase() === 'on hold').length || 0;

  // --- MODIFIED: Changed assigned_to to a new type ---
  const projectFieldsConfig = [
    { name: "project_no", label: "Project Number", icon: <ConfirmationNumberIcon fontSize="small" />, halfWidth: true },
    { name: "title", label: "Project Title", icon: <WorkOutlineIcon fontSize="small" /> },
    { name: "client_id", label: "Client Name", type: "client_select", icon: <PeopleAltIcon fontSize="small" />, halfWidth: true },
    { name: "company_id", label: "Company Name", type: "company_select", icon: <BusinessIcon fontSize="small" />, halfWidth: true },
    { name: "start_date", label: "Start Date", type: "date", icon: <EventIcon fontSize="small" />, halfWidth: true },
    { name: "end_date", label: "End Date", type: "date", icon: <EventIcon fontSize="small" />, halfWidth: true },
    { name: "assigned_to", label: "Assigned To", type: "employee_multiselect", icon: <GroupIcon fontSize="small" />, halfWidth: true },
    { name: "priority", label: "Priority", type: "select", options: ["High", "Medium", "Low"], icon: <FlagOutlinedIcon fontSize="small" />, halfWidth: true },
    { name: "budget_hours", label: "Budget Hours", type: "number", icon: <BudgetIcon fontSize="small" />, halfWidth: true },
    { name: "project_progress", label: "Progress (%)", type: "number", icon: <TrendingUpIcon fontSize="small" />, halfWidth: true },
    { name: "summary", label: "Summary", multiline: true, rows: 2, icon: <NotesIcon fontSize="small" /> },
    { name: "description", label: "Description", multiline: true, rows: 4, icon: <NotesIcon fontSize="small" /> },
    { name: "project_note", label: "Internal Note", multiline: true, rows: 2, icon: <NotesIcon fontSize="small" /> },
    { name: "associated_goals", label: "Associated Goals", icon: <TimelineIcon fontSize="small" /> },
    { name: "status", label: "Project Active", type: "checkbox" },
    { name: "added_by", label: "Added By (User ID)", icon: <PersonOutlineIcon fontSize="small" /> }
  ];


  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ p: { xs: 2, sm: 3 } }}>
        {/* Header and Stat Cards remain the same */}
        <Card elevation={0} sx={{ mb: 3, borderRadius: 2, background: "linear-gradient(135deg, rgba(36, 73, 239, 0.03) 0%, rgba(218, 18, 202, 0.03) 100%)", borderLeft: "5px solid", borderImage: "linear-gradient(135deg, rgba(36, 73, 239, 0.89) 0%, rgb(218, 18, 202) 100%) 1" }}>
          <CardContent sx={{ p: { xs: 2, sm: 3 } }}><Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}><WorkOutlineIcon sx={{ fontSize: '2rem', mr: 1, color: 'primary.main' }} /><Typography variant="h4" sx={{ fontWeight: 700, color: "text.primary" }}>Projects Management</Typography></Box><Typography variant="body2" color="text.secondary">Oversee, add, and manage all your ongoing and completed projects.</Typography></CardContent>
        </Card>

        <Grid container spacing={2.5} sx={{ mb: 3 }}>
          <StatCard title="Total Completed" value={completedCount} icon={<GroupIcon />} gradient="linear-gradient(135deg, #66bb6a 0%, #43a047 100%)" />
          <StatCard title="In Progress" value={inProgressCount} icon={<FolderIcon />} gradient="linear-gradient(135deg, #42a5f5 0%, #1e88e5 100%)" />
          <StatCard title="Not Started" value={notStartedCount} icon={<TimelineIcon />} gradient="linear-gradient(135deg, #ffa726 0%, #fb8c00 100%)" />
          <StatCard title="On Hold" value={onHoldCount} icon={<PauseCircleIcon />} gradient="linear-gradient(135deg, #ef5350 0%, #e53935 100%)" />
        </Grid>

        <Paper sx={{ p: 2.5, mb: 3, borderRadius: 2, boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={6} md={8}><TextField fullWidth variant="outlined" placeholder="Search Projects by Title, Number, Status..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} InputProps={{ startAdornment: (<InputAdornment position="start"><SearchIcon color="action" /></InputAdornment>) }} sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} /></Grid>
            <Grid item xs={12} sm={6} md={4} sx={{ display: 'flex', justifyContent: { xs: 'flex-start', sm: 'flex-end' }, gap: 1 }}>
              <Tooltip title="Refresh Projects"><IconButton onClick={handleRefresh} color="primary" sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2 }}><RefreshIcon /></IconButton></Tooltip>
              <Button startIcon={<AddBoxIcon />} onClick={() => handleClickOpen()} sx={{ ...gradientButtonStyle, py: 1.25, px: 3 }}>Add Project</Button>
            </Grid>
          </Grid>
        </Paper>

        {loading ? (
          <Grid container spacing={2.5}>{Array.from(new Array(4)).map((_, index) => (<ProjectCardSkeleton key={index} />))}</Grid>
        ) : filteredProjects.length === 0 ? (
          <Paper sx={{ textAlign: 'center', p: 5, borderRadius: 2, mt: 2 }}><WorkOutlineIcon sx={{ fontSize: 60, color: 'text.disabled', mb: 2 }} /><Typography variant="h6" color="text.secondary">{searchQuery ? "No projects match your search." : "No projects found."}</Typography><Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>{searchQuery ? "Try a different search term." : "Click 'Add Project' to create a new one."}</Typography></Paper>
        ) : (
          <Grid container spacing={2.5}>
            {filteredProjects.map((project) => {
              const startDate = parseInputToDate(project.start_date);
              const endDate = parseInputToDate(project.end_date);
              // --- NEW: Prepare assigned users for card display ---
              const assignedUserIds = project.assigned_to ? String(project.assigned_to).split(',') : [];

              return (
                <Grid item xs={12} md={6} lg={4} key={project.id}>
                  <Card sx={{ borderRadius: 2, height: '100%', display: 'flex', flexDirection: 'column', transition: 'box-shadow 0.3s', '&:hover': { boxShadow: 6 } }}>
                    <CardContent sx={{ flexGrow: 1, pb: 1 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}><Typography variant="h6" component="div" sx={{ fontWeight: 'bold', color: 'primary.dark', flexGrow: 1, mr: 1 }}>{project.title}</Typography><Chip label={project.status ? "Active" : "Inactive"} color={project.status ? "success" : "error"} size="small" variant="outlined" icon={project.status ? <CheckCircleOutlineIcon fontSize="inherit" /> : <CancelIcon fontSize="inherit" />} /></Box>
                      <Typography variant="caption" color="textSecondary" display="block" gutterBottom>Project #: {project.project_no || 'N/A'}</Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1, minHeight: '40px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', textOverflow: 'ellipsis' }}>{project.summary || project.description || "No summary available."}</Typography>
                      <Grid container spacing={1} sx={{ fontSize: '0.8rem', color: 'text.secondary' }}><Grid item xs={6} sx={{ display: 'flex', alignItems: 'center' }}><EventIcon fontSize="inherit" sx={{ mr: 0.5 }} /> Start: {startDate ? format(startDate, 'dd MMM yyyy') : 'N/A'}</Grid><Grid item xs={6} sx={{ display: 'flex', alignItems: 'center' }}><EventIcon fontSize="inherit" sx={{ mr: 0.5 }} /> End: {endDate ? format(endDate, 'dd MMM yyyy') : 'N/A'}</Grid><Grid item xs={6} sx={{ display: 'flex', alignItems: 'center' }}><PersonOutlineIcon fontSize="inherit" sx={{ mr: 0.5 }} /> By: {project.added_by_username || project.added_by || 'N/A'}</Grid><Grid item xs={6} sx={{ display: 'flex', alignItems: 'center' }}><FlagOutlinedIcon fontSize="inherit" sx={{ mr: 0.5 }} /> {project.priority || 'N/A'}</Grid></Grid>
                    </CardContent>
                    {/* --- MODIFIED: CardActions now shows AvatarGroup for assigned_to --- */}
                    <CardActions sx={{ p: 1.5, borderTop: '1px solid', borderColor: 'divider', display: 'flex', justifyContent: 'space-between', bgcolor: 'grey.50' }}>
                      <AvatarGroup max={4} sx={{ '& .MuiAvatar-root': { width: 32, height: 32, fontSize: '0.8rem', border: '2px solid', borderColor: 'grey.50' } }}>
                        {assignedUserIds.map(id => {
                          const employee = employeesList.find(e => e.value === id);
                          return (
                            <Tooltip key={id} title={employee ? employee.label : 'Unknown User'}>
                              <Avatar sx={{ bgcolor: 'secondary.light', color: 'secondary.dark' }}>
                                {employee ? employee.label.split(' ').map(n => n[0]).join('') : '?'}
                              </Avatar>
                            </Tooltip>
                          );
                        })}
                        {assignedUserIds.length === 0 && (
                          <Tooltip title="Not Assigned">
                            <Avatar><PersonOutlineIcon fontSize="small" /></Avatar>
                          </Tooltip>
                        )}
                      </AvatarGroup>
                      <Box>
                        <Tooltip title="Edit Project"><IconButton size="small" sx={{ color: 'secondary.main' }} onClick={() => handleClickOpen(project)}><EditIcon fontSize="small" /></IconButton></Tooltip>
                        <Tooltip title="Delete Project"><IconButton size="small" sx={{ color: 'error.main' }} onClick={() => handleOpenDeleteConfirm(project)}><DeleteIcon fontSize="small" /></IconButton></Tooltip>
                      </Box>
                    </CardActions>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        )}

        {/* --- MODIFIED: Add/Edit Dialog --- */}
        <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth PaperProps={{ sx: { borderRadius: 3 } }}>
          <DialogTitle sx={{ ...gradientButtonStyle, color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1.5 }}>
            {isEditing ? "Edit Project" : "Add New Project"}
            <IconButton onClick={handleCloseDialog} sx={{ color: 'rgba(255,255,255,0.8)', '&:hover': { color: 'white' } }}><CloseIcon /></IconButton>
          </DialogTitle>
          <DialogContent dividers sx={{ p: { xs: 2, sm: 3 }, backgroundColor: 'grey.50' }}>
            <Grid container spacing={2.5}>
              {currentProject && projectFieldsConfig.map(({ name, label, type, options, multiline, rows, icon, halfWidth }) => {
                if (name === "project_id" || name === "created_at" || name === "added_by") return null;

                const commonProps = { key: name, label: label, name: name, value: currentProject[name] ?? '', onChange: handleInputChange, fullWidth: true, margin: "dense", size: "small", sx: { "& .MuiOutlinedInput-root": { borderRadius: 2 } }, InputProps: icon ? { startAdornment: <InputAdornment position="start">{icon}</InputAdornment> } : {} };

                if (type === "date") {
                  return (<Grid item xs={12} sm={halfWidth ? 6 : 12} key={name}><DatePicker label={label} value={currentProject[name] || null} onChange={(date) => handleDateChange(name, date)} renderInput={(params) => <TextField {...params} {...commonProps} InputLabelProps={{ shrink: true }} error={false} helperText="" />} /></Grid>);
                } else if (type === "select") {
                  return (<Grid item xs={12} sm={halfWidth ? 6 : 12} key={name}><FormControl fullWidth required size="small" margin="dense" sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}><InputLabel id={`${name}-label`}>{label}</InputLabel><Select labelId={`${name}-label`} label={label} {...commonProps} value={currentProject[name] || options[0]}>{options.map(opt => <MenuItem key={opt} value={opt}>{opt}</MenuItem>)}</Select></FormControl></Grid>);
                } else if (type === "client_select") {
                  return (
                    <Grid item xs={12} sm={halfWidth ? 6 : 12} key={name}>
                      <FormControl fullWidth required size="small" margin="dense" sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}>
                        <InputLabel id={`${name}-label`}>{label}</InputLabel>
                        <Select labelId={`${name}-label`} label={label} {...commonProps} disabled={clientsLoading}>
                          {clientsLoading ? (<MenuItem value="" disabled><em>Loading clients...</em></MenuItem>) : clientsList.length === 0 ? (<MenuItem value="" disabled><em>No clients found.</em></MenuItem>) : (clientsList.map(client => (
                            <MenuItem key={client.id} value={client.full_name}>{client.full_name}</MenuItem>
                          )))}
                        </Select>
                      </FormControl>
                    </Grid>
                  );
                } else if (type === "company_select") {
                  return (
                    <Grid item xs={12} sm={halfWidth ? 6 : 12} key={name}>
                      <FormControl fullWidth required size="small" margin="dense" sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}>
                        <InputLabel id={`${name}-label`}>{label}</InputLabel>
                        <Select labelId={`${name}-label`} label={label} {...commonProps} disabled={clientsLoading}>
                          {clientsLoading ? (<MenuItem value="" disabled><em>Loading companies...</em></MenuItem>) : companyList.length === 0 ? (<MenuItem value="" disabled><em>No companies found.</em></MenuItem>) : (companyList.map(companyName => (<MenuItem key={companyName} value={companyName}>{companyName}</MenuItem>)))}
                        </Select>
                      </FormControl>
                    </Grid>
                  );
                  // --- NEW: Rendering logic for the multi-select employee dropdown ---
                } else if (type === "employee_multiselect") {
                  return (
                    <Grid item xs={12} sm={halfWidth ? 6 : 12} key={name}>
                      <FormControl fullWidth size="small" margin="dense">
                        <InputLabel id={`${name}-label`}>{label}</InputLabel>
                        <Select
                          labelId={`${name}-label`}
                          multiple
                          {...commonProps}
                          value={currentProject[name] || []}
                          input={<OutlinedInput id="select-multiple-chip" label={label} sx={{ borderRadius: 2, '& .MuiOutlinedInput-notchedOutline': {border: '1px solid rgba(0, 0, 0, 0.23)'}}} />}
                          renderValue={(selected) => (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                              {selected.map((value) => {
                                const employeeName = employeesList.find(e => e.value === value)?.label || value;
                                return <Chip key={value} label={employeeName} size="small" />;
                              })}
                            </Box>
                          )}
                          disabled={employeesLoading}
                          MenuProps={{ PaperProps: { style: { maxHeight: 224 } } }}
                        >
                          {employeesLoading ? (
                            <MenuItem disabled><em>Loading employees...</em></MenuItem>
                          ) : (
                            employeesList.map((employee) => (
                              <MenuItem key={employee.value} value={employee.value}>
                                {employee.label}
                              </MenuItem>
                            ))
                          )}
                        </Select>
                      </FormControl>
                    </Grid>
                  )
                } else if (type === "checkbox") {
                  return (<Grid item xs={12} sm={halfWidth ? 6 : 12} key={name} sx={{ alignSelf: 'center' }}><FormControlLabel control={<Chip icon={currentProject[name] ? <CheckCircleOutlineIcon /> : <CancelIcon />} label={currentProject[name] ? "Active" : "Inactive"} clickable color={currentProject[name] ? "success" : "error"} onClick={() => setCurrentProject(prev => ({ ...prev, [name]: !prev[name] }))} variant="outlined" sx={{ borderRadius: 1.5, p: 0.5 }} />} labelPlacement="start" label={label} sx={{ mr: 0, ml: 0, justifyContent: 'space-between', width: '100%' }} /></Grid>);
                }
                return (<Grid item xs={12} sm={halfWidth ? 6 : 12} key={name}><TextField {...commonProps} type={type || "text"} multiline={multiline} rows={rows} /></Grid>);
              })}
            </Grid>
          </DialogContent>
          <DialogActions sx={{ p: 2, backgroundColor: 'grey.50', borderTop: '1px solid', borderColor: 'divider' }}>
            <Button onClick={handleCloseDialog} color="inherit" sx={{ borderRadius: 2 }} disabled={submitLoading}>Cancel</Button>
            <Button onClick={handleSaveProject} sx={{ ...gradientButtonStyle, minWidth: '150px', py: '10px', px: 3 }} disabled={submitLoading}>{submitLoading ? <CircularProgress size={24} color="inherit" /> : (isEditing ? <><SaveIcon sx={{ mr: 1 }} />Save Changes</> : <><AddBoxIcon sx={{ mr: 1 }} />Add Project</>)}</Button>
          </DialogActions>
        </Dialog>

        {/* Delete Confirmation Dialog remains the same */}
        <Dialog open={openDeleteConfirm} onClose={handleCloseDeleteConfirm} PaperProps={{ sx: { borderRadius: 3 } }}>
          <DialogTitle sx={{ display: 'flex', alignItems: 'center' }}><WarningAmberIcon color="error" sx={{ mr: 1 }} /> Confirm Deletion</DialogTitle>
          <DialogContent><Typography>Are you sure you want to delete the project: <strong>{projectToDelete?.title}</strong>? This action cannot be undone.</Typography></DialogContent>
          <DialogActions sx={{ px: 3, pb: 2 }}><Button onClick={handleCloseDeleteConfirm} color="inherit" sx={{ borderRadius: 2 }}>Cancel</Button><Button onClick={handleDeleteProject} variant="contained" color="error" sx={{ borderRadius: 2 }}>Delete</Button></DialogActions>
        </Dialog>
      </Box>
    </LocalizationProvider>
  );
}