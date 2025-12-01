// import React, { useState } from 'react';
// import {
//   Box,
//   Typography,
//   Paper,
//   List,
//   ListItem,
//   ListItemIcon,
//   ListItemText,
//   Link,
//   TextField,
//   Button,
//   Grid,
//   Snackbar,
//   Alert,
// } from '@mui/material';
// import {
//   Description as DescriptionIcon,
//   GetApp as GetAppIcon,
//   ReportProblem as ReportProblemIcon,
//   CheckCircle as CheckCircleIcon,
// } from '@mui/icons-material';

// const UserManual = () => {
//   const [openSnackbar, setOpenSnackbar] = useState(false); // State to manage Snackbar visibility
//   const [ticketDescription, setTicketDescription] = useState(''); // State to manage text field content

//   const manuals = [
//     {
//       title: 'Employee User Manual',
//       description: 'Complete guide for employees on using the HRMAAS system',
//       downloadLink: '#',
//     },
//     {
//       title: 'Leave Management Guide',
//       description: 'How to apply and manage leaves in the system',
//       downloadLink: '#',
//     },
//     {
//       title: 'Attendance System Guide',
//       description: 'Understanding the attendance marking and reporting system',
//       downloadLink: '#',
//     },
//     {
//       title: 'Project Management Manual',
//       description: 'Guide to project tracking and task management',
//       downloadLink: '#',
//     },
//   ];

//   const handleTicketSubmit = () => {
//     // Logic to submit the ticket would go here

//     // Show success message
//     setOpenSnackbar(true);
//     // Clear the text field
//     setTicketDescription('');
//   };

//   const handleCloseSnackbar = (event, reason) => {
//     if (reason === 'clickaway') {
//       return;
//     }
//     setOpenSnackbar(false);
//   };

//   return (
//     <Box sx={{ p: 4, bgcolor: '#f4f6f8', minHeight: '100vh' }}>
//       <Grid container spacing={3}>
//         {/* User Manuals Section */}
//         <Grid item xs={12} md={6}>
//           <Paper sx={{ p: 3 }}>
//             <Typography variant="h5" gutterBottom>
//               User Manuals
//             </Typography>
//             <List>
//               {manuals.map((manual, index) => (
//                 <Paper
//                   key={index}
//                   sx={{
//                     mb: 2,
//                     p: 2,
//                     '&:hover': {
//                       boxShadow: 3,
//                       transition: 'box-shadow 0.3s ease-in-out',
//                     },
//                   }}
//                 >
//                   <ListItem>
//                     <ListItemIcon>
//                       <DescriptionIcon color="primary" />
//                     </ListItemIcon>
//                     <ListItemText
//                       primary={manual.title}
//                       secondary={manual.description}
//                     />
//                     <Link href={manual.downloadLink} underline="none">
//                       <GetAppIcon color="primary" />
//                     </Link>
//                   </ListItem>
//                 </Paper>
//               ))}
//             </List>
//           </Paper>
//         </Grid>

//         {/* Ticket Generate Section */}
//         <Grid item xs={12} md={6}>
//           <Paper sx={{ p: 3, mb: 3 }}>
//             <Typography variant="h5" gutterBottom>
//               Ticket Generate
//             </Typography>
//             <ListItem>
//               <ListItemIcon>
//                 <ReportProblemIcon color="primary" />
//               </ListItemIcon>
//               <ListItemText
//                 primary="Generate a New Ticket"
//                 secondary="Submit a ticket for assistance with any issues"
//               />
//             </ListItem>
//             <TextField
//               label="Ticket Description"
//               multiline
//               rows={4}
//               variant="outlined"
//               fullWidth
//               value={ticketDescription}
//               onChange={(e) => setTicketDescription(e.target.value)}
//               sx={{ mt: 2, mb: 2 }}
//             />
//             <Button
//               variant="contained"
//               color="primary"
//               fullWidth
//               onClick={handleTicketSubmit}
//               disabled={!ticketDescription.trim()} // Disable button if description is empty
//             >
//               Submit Ticket
//             </Button>
//           </Paper>

//           {/* Show Ticket Status Section */}
//           <Paper sx={{ p: 3 }}>
//             <Typography variant="h5" gutterBottom>
//               Ticket Status
//             </Typography>
//             <ListItem>
//               <ListItemIcon>
//                 <CheckCircleIcon color="primary" />
//               </ListItemIcon>
//               <ListItemText
//                 primary="Your Submitted Tickets"
//                 secondary="View the status of your tickets"
//               />
//             </ListItem>
//             <List sx={{ mt: 2 }}>
//               {/* Displaying sample ticket statuses */}
//               <ListItem>
//                 <ListItemText
//                   primary="Ticket #1234"
//                   secondary="Status: In Progress"
//                 />
//               </ListItem>
//               <ListItem>
//                 <ListItemText
//                   primary="Ticket #5678"
//                   secondary="Status: Resolved"
//                 />
//               </ListItem>
//             </List>
//           </Paper>
//         </Grid>
//       </Grid>

//       {/* Snackbar for success message */}
//       <Snackbar
//         open={openSnackbar}
//         autoHideDuration={3000}
//         onClose={handleCloseSnackbar}
//         anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
//       >
//         <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
//           Ticket successfully generated!
//         </Alert>
//       </Snackbar>
//     </Box>
//   );
// };

// export default UserManual;




import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Link,
  TextField,
  Button,
  Grid,
  Snackbar,
  Alert,
  createTheme,
  ThemeProvider,
} from '@mui/material';
import {
  Description as DescriptionIcon,
  GetApp as GetAppIcon,
  ReportProblem as ReportProblemIcon,
  CheckCircle as CheckCircleIcon,
} from '@mui/icons-material';

// Define the custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#8C257C',
    },
  },
});

const UserManual = () => {
  const [openSnackbar, setOpenSnackbar] = useState(false); // State to manage Snackbar visibility
  const [ticketDescription, setTicketDescription] = useState(''); // State to manage text field content

  const manuals = [
    {
      title: 'Employee User Manual',
      description: 'Complete guide for employees on using the HRMAAS system',
      downloadLink: '#',
    },
    {
      title: 'Leave Management Guide',
      description: 'How to apply and manage leaves in the system',
      downloadLink: '#',
    },
    {
      title: 'Attendance System Guide',
      description: 'Understanding the attendance marking and reporting system',
      downloadLink: '#',
    },
    {
      title: 'Project Management Manual',
      description: 'Guide to project tracking and task management',
      downloadLink: '#',
    },
  ];

  const handleTicketSubmit = () => {
    // Logic to submit the ticket would go here

    // Show success message
    setOpenSnackbar(true);
    // Clear the text field
    setTicketDescription('');
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ p: 4, bgcolor: '#f4f6f8', minHeight: '100vh' }}>
        <Grid container spacing={3}>
          {/* User Manuals Section */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h4" color="primary" gutterBottom sx={{ mb: 5,fontWeight: 'bold', }}>
                User Manuals
              </Typography>
              <List>
                {manuals.map((manual, index) => (
                  <Paper
                    key={index}
                    sx={{
                      mb: 2,
                      p: 2,
                      '&:hover': {
                        boxShadow: 3,
                        transition: 'box-shadow 0.3s ease-in-out',
                      },
                    }}
                  >
                    <ListItem>
                      <ListItemIcon>
                        <DescriptionIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText
                        primary={manual.title}
                        secondary={manual.description}
                      />
                      <Link href={manual.downloadLink} underline="none">
                        <GetAppIcon color="primary" />
                      </Link>
                    </ListItem>
                  </Paper>
                ))}
              </List>
            </Paper>
          </Grid>

          {/* Ticket Generate Section */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3, mb: 3 }}>
              <Typography variant="h4" color="primary" gutterBottom sx={{ mb: 5,fontWeight: 'bold', }}>
                Ticket Generate
              </Typography>
              <ListItem>
                <ListItemIcon>
                  <ReportProblemIcon color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary="Generate a New Ticket"
                  secondary="Submit a ticket for assistance with any issues"
                />
              </ListItem>
              <TextField
                label="Ticket Description"
                multiline
                rows={4}
                variant="outlined"
                fullWidth
                value={ticketDescription}
                onChange={(e) => setTicketDescription(e.target.value)}
                sx={{ mt: 2, mb: 2 }}
              />
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleTicketSubmit}
                disabled={!ticketDescription.trim()} // Disable button if description is empty
              >
                Submit Ticket
              </Button>
            </Paper>

            {/* Show Ticket Status Section */}
            <Paper sx={{ p: 3 }}>
              <Typography variant="h4" color="primary" gutterBottom sx={{ mb: 5, fontWeight: 'bold', }}>
                Ticket Status
              </Typography>
              <ListItem>
                <ListItemIcon>
                  <CheckCircleIcon color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary="Your Submitted Tickets"
                  secondary="View the status of your tickets"
                />
              </ListItem>
              <List sx={{ mt: 2 }}>
                {/* Displaying sample ticket statuses */}
                <ListItem>
                  <ListItemText
                    primary="Ticket #1234"
                    secondary="Status: In Progress"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Ticket #5678"
                    secondary="Status: Resolved"
                  />
                </ListItem>
              </List>
            </Paper>
          </Grid>
        </Grid>

        {/* Snackbar for success message */}
        <Snackbar
          open={openSnackbar}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
            Ticket successfully generated!
          </Alert>
        </Snackbar>
      </Box>
    </ThemeProvider>
  );
};

export default UserManual;