
// import { useEffect, useState ,useContext } from 'react';
// import  axiosInstance from  "../../utils/axiosInstance"; 
// import { EmployeeIdProvider } from "./EmployeeContext";
// import { EmployeeContext } from './EmployeeContext';
// import Contract from './Contract';
// import  BasicInformation from './BasicInformation';
// import  PersonalInformation from './PersonalInformation';
// import  ProfilePicture from './ProfilePicture';
// import  AccountInformation from './AccountInformation';
// import  Documents from './Documents';
// import  ChangePassword from './ChangePassword';
// import  TimeSheet from './TimeSheet';
// import  FamilyDetails from './FamilyDetails';
// import {
//   Box, Grid, Paper, Typography, Avatar, List, ListItem,
//   ListItemIcon, ListItemText, Chip
// } from '@mui/material';
// import { useParams } from 'react-router-dom';
// import {
//   Email, Lock, Info, AccountBox, Image, AccountBalance,
//   Description, AccessTime, LockReset, SupervisorAccount
// } from '@mui/icons-material';

// // Dummy Components for Right Pane
// //const Contract = () => <Typography>Contract Content</Typography>;
// //const BasicInformation = () => <Typography>Basic Information Content</Typography>;
// //const PersonalInformation = () => <Typography>Personal Information Content</Typography>;
// //const ProfilePicture = () => <Typography>Profile Picture Content</Typography>;
// //const AccountInformation = () => <Typography>Account Information Content</Typography>;
// //const Documents = () => <Typography>Documents Content</Typography>;
// //const Timesheet = () => <Typography>Timesheet Agenda Content</Typography>;
// //const ChangePassword = () => <Typography>Change Password Content</Typography>;

// const componentMap = {
//     'Contract': <Contract />,
//     'Basic Information': <BasicInformation />,
//     'Personal Information': <PersonalInformation />,
//     'Profile Picture': <ProfilePicture />,
//     'Account Information': <AccountInformation />,
//     'Documents': <Documents />,
//       'Family Details': <FamilyDetails />,
//     'Timesheet Agenda': <TimeSheet />,
//     'Change Password': <ChangePassword />,
//   };
  
// const sidebarItems = [
//   { icon: <Lock />, text: 'Contract' },
//   { icon: <Info />, text: 'Basic Information' },
//   { icon: <AccountBox />, text: 'Personal Information' },
//   { icon: <Image />, text: 'Profile Picture' },
//   { icon: <AccountBalance />, text: 'Account Information' },
//   { icon: <Description />, text: 'Documents' },
//    { icon: <Description />, text: 'Family Details' },
//   { icon: <AccessTime />, text: 'Timesheet Agenda' },
//   { icon: <LockReset />, text: 'Change Password' }
// ];

// const EmployeeDetail = () => {
//   const [selectedItem, setSelectedItem] = useState('Contract');
//   const [employeeData, setEmployeeData] = useState(null);

//   const { setEmployeeId } = useContext(EmployeeContext);
 
//    const { id } = useParams();
//      useEffect(() => {
//     if (id) {
//       setEmployeeId(id);
//     }
//   }, [id, setEmployeeId]);
// useEffect(() => {
//   axiosInstance.get(`api/edit_employee/${id}`)
//     .then(res => {
//       if (res.data?.data?.length) {
//         setEmployeeData(res.data.data[0]);
//       }
//     })
//     .catch(err => {
//       console.error("Error fetching employee data:", err);
//     });
// }, [id]);

//   return (
    
//     <Box sx={{ flexGrow: 1, p: 2 }}>
//       <Grid container spacing={2}>
//         {/* Left Sidebar */}
//         <Grid item xs={12} md={4}>
//           <Paper elevation={3} sx={{ p: 2 }}>
//             {/* Profile Header */}
//             <Box display="flex" alignItems="center" mb={2}>
//               <Avatar
//                 src="https://i.pravatar.cc/150?img=32"
//                 alt="Employee"
//                 sx={{ width: 56, height: 56, mr: 2 }}
//               />
//            <Box>
//     <Typography variant="subtitle1" fontWeight="bold">
//       {employeeData?.emp_name || "Employee Name"}
//     </Typography>
//     <Typography variant="body2" color="textSecondary">
//       {employeeData?.designation || "Designation"}
//     </Typography>
//     <Chip
//       label={employeeData?.status === 1 ? "Active" : "Inactive"}
//       color={employeeData?.status === 1 ? "success" : "error"}
//       size="small"
//       sx={{ mt: 0.5 }}
//     />
//   </Box>
// </Box>
           

//             {/* Manager */}
//            <Box display="flex" alignItems="center" mb={1}>
//   <SupervisorAccount sx={{ mr: 1 }} />
//   <Typography>Manager: {employeeData?.manager || "N/A"}</Typography>
// </Box>
//             {/* Email */}
//             {/* <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
//               <Box display="flex" alignItems="center">
//                 <Email sx={{ mr: 1 }} />
//                 <Typography variant="body2">Email</Typography>
//               </Box>
//               <Typography variant="body2" color="textSecondary">
//                 aaryadev.ghosalkar@thedatatechlabs.com
//               </Typography>
//             </Box> */}

//             {/* Sidebar Items */}
//             <List>
//               {sidebarItems.map((item, index) => (
//                 <ListItem
//                   key={index}
//                   button
//                   selected={selectedItem === item.text}
//                   onClick={() => setSelectedItem(item.text)}
//                 >
//                   <ListItemIcon>{item.icon}</ListItemIcon>
//                   <ListItemText
//                     primary={item.text}
//                     primaryTypographyProps={{ fontSize: '14px' }}
//                   />
//                 </ListItem>
//               ))}
//             </List>
//           </Paper>
//         </Grid>

//         {/* Right Content */}
//         <Grid item xs={12} md={8}>
//           <Paper elevation={3} sx={{ p: 2 }}>
//             {componentMap[selectedItem]}
//           </Paper>
//         </Grid>
//       </Grid>
//     </Box>
    
//   );
// };

// export default EmployeeDetail;



// import { useEffect, useState ,useContext } from 'react';
// import  axiosInstance from  "../../utils/axiosInstance"; 
// import { EmployeeIdProvider } from "./EmployeeContext";
// import { EmployeeContext } from './EmployeeContext';
// import Contract from './Contract';
// import  BasicInformation from './BasicInformation';
// import  PersonalInformation from './PersonalInformation';
// import  ProfilePicture from './ProfilePicture';
// import  AccountInformation from './AccountInformation';
// import  Documents from './Documents';
// import  ChangePassword from './ChangePassword';
// import  TimeSheet from './TimeSheet';
// import  FamilyDetails from './FamilyDetails';
// import {
//   Box, Grid, Paper, Typography, Avatar, List, ListItem,
//   ListItemIcon, ListItemText, Chip
// } from '@mui/material';
// import { useParams } from 'react-router-dom';
// import {
//   Email, Lock, Info, AccountBox, Image, AccountBalance,
//   Description, AccessTime, LockReset, SupervisorAccount
// } from '@mui/icons-material';

// // Dummy Components for Right Pane
// //const Contract = () => <Typography>Contract Content</Typography>;
// //const BasicInformation = () => <Typography>Basic Information Content</Typography>;
// //const PersonalInformation = () => <Typography>Personal Information Content</Typography>;
// //const ProfilePicture = () => <Typography>Profile Picture Content</Typography>;
// //const AccountInformation = () => <Typography>Account Information Content</Typography>;
// //const Documents = () => <Typography>Documents Content</Typography>;
// //const Timesheet = () => <Typography>Timesheet Agenda Content</Typography>;
// //const ChangePassword = () => <Typography>Change Password Content</Typography>;

// const componentMap = {
//     'Details': <Contract />,
//     'Basic Information': <BasicInformation />,
//     'Personal Information': <PersonalInformation />,
//     'Profile Picture': <ProfilePicture />,
//     'Account Information': <AccountInformation />,
//     'Documents': <Documents />,
//       'Family Details': <FamilyDetails />,
//     //'Timesheet Agenda': <TimeSheet />,
//    // 'Change Password': <ChangePassword />,
//   };
  
// const sidebarItems = [
//   { icon: <Lock />, text: 'Details' },
//   { icon: <Info />, text: 'Basic Information' },
//   { icon: <AccountBox />, text: 'Personal Information' },
//   { icon: <Image />, text: 'Profile Picture' },
//   { icon: <AccountBalance />, text: 'Account Information' },
//   { icon: <Description />, text: 'Documents' },
//    { icon: <Description />, text: 'Family Details' },
//   //[{ icon: <AccessTime />, text: 'Timesheet Agenda' },
//  /// { icon: <LockReset />, text: 'Change Password' }
// ];

// const EmployeeDetail = () => {
//   const [selectedItem, setSelectedItem] = useState('Details');
//   const [employeeData, setEmployeeData] = useState(null);

//   const { setEmployeeId } = useContext(EmployeeContext);
 
//    const { id } = useParams();
//      useEffect(() => {
//     if (id) {
//       setEmployeeId(id);
//     }
//   }, [id, setEmployeeId]);
// useEffect(() => {
//   axiosInstance.get(`api/edit_employee/${id}/`)
//     .then(res => {
//       if (res.data?.data?.length) {
//         setEmployeeData(res.data.data[0]);
//       }
//     })
//     .catch(err => {
//       console.error("Error fetching employee data:", err);
//     });
// }, [id]);

//   return (
    
//     <Box sx={{ flexGrow: 1, p: 2 }}>
//       <Grid container spacing={2}>
//         {/* Left Sidebar */}
//         <Grid item xs={12} md={4}>
//           <Paper elevation={3} sx={{ p: 2 }}>
//             {/* Profile Header */}
//             <Box display="flex" alignItems="center" mb={2}>
//               <Avatar
//                 src="https://i.pravatar.cc/150?img=32"
//                 alt="Employee"
//                 sx={{ width: 56, height: 56, mr: 2 }}
//               />
//            <Box>
//     <Typography variant="subtitle1" fontWeight="bold">
//       {employeeData?.emp_name || "Employee Name"}
//     </Typography>
//     <Typography variant="body2" color="textSecondary">
//       {employeeData?.designation || "Designation"}
//     </Typography>
    
//   </Box>
// </Box>
           

//             {/* Manager */}
//            <Box display="flex" alignItems="center" mb={1}>
//   <SupervisorAccount sx={{ mr: 1 }} />
//   <Typography>Manager: {employeeData?.manager || "N/A"}</Typography>
// </Box>
//             {/* Email */}
//             {/* <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
//               <Box display="flex" alignItems="center">
//                 <Email sx={{ mr: 1 }} />
//                 <Typography variant="body2">Email</Typography>
//               </Box>
//               <Typography variant="body2" color="textSecondary">
//                 aaryadev.ghosalkar@thedatatechlabs.com
//               </Typography>
//             </Box> */}

//             {/* Sidebar Items */}
//             <List>
//               {sidebarItems.map((item, index) => (
//                 <ListItem
//                   key={index}
//                   button
//                   selected={selectedItem === item.text}
//                   onClick={() => setSelectedItem(item.text)}
//                 >
//                   <ListItemIcon>{item.icon}</ListItemIcon>
//                   <ListItemText
//                     primary={item.text}
//                     primaryTypographyProps={{ fontSize: '14px' }}
//                   />
//                 </ListItem>
//               ))}
//             </List>
//           </Paper>
//         </Grid>

//         {/* Right Content */}
//         <Grid item xs={12} md={8}>
//           <Paper elevation={3} sx={{ p: 2 }}>
//             {componentMap[selectedItem]}
//           </Paper>
//         </Grid>
//       </Grid>
//     </Box>
    
//   );
// };

// export default EmployeeDetail;
import React, { useState, useEffect, useContext } from 'react';
//import { EmployeeContext } from './EmployeeContext';
import axiosInstance from "../../utils/axiosInstance"; 
import {
  Box, Grid, Paper, Typography, Avatar, List, ListItem,
  ListItemIcon, ListItemText, CircularProgress, Alert
} from '@mui/material';
import { useParams } from 'react-router-dom';
import {
  Lock, Info, AccountBox, Image, AccountBalance,
  Description, SupervisorAccount
} from '@mui/icons-material';

// Import child components
import Contract from './Contract';
import BasicInformation from './BasicInformation';
import PersonalInformation from './PersonalInformation';
import ProfilePicture from './ProfilePicture';
import AccountInformation from './AccountInformation';
import Documents from './Documents';
import FamilyDetails from './FamilyDetails';
import { EmployeeContext } from '../../SuperAdmin/Employee/EmployeeContext';

const componentMap = {
  'Details': <Contract />,
  'Basic Information': <BasicInformation />,
  'Personal Information': <PersonalInformation />,
  'Profile Picture': <ProfilePicture />,
  'Account Information': <AccountInformation />,
  'Documents': <Documents />,
  'Family Details': <FamilyDetails />,
};
  
const sidebarItems = [
  { icon: <Lock />, text: 'Details' },
  { icon: <Info />, text: 'Basic Information' },
  { icon: <AccountBox />, text: 'Personal Information' },
  { icon: <Image />, text: 'Profile Picture' },
  { icon: <AccountBalance />, text: 'Account Information' },
  { icon: <Description />, text: 'Documents' },
  { icon: <Description />, text: 'Family Details' },
];

// Helper function to get initials from a name for the Avatar fallback
const getInitials = (name = "") => {
  const nameParts = name.split(' ').filter(Boolean);
  if (nameParts.length === 0) return '...';
  if (nameParts.length === 1) return nameParts[0][0].toUpperCase();
  return (nameParts[0][0] + nameParts[nameParts.length - 1][0]).toUpperCase();
};

const EmployeeDetailHr = () => {
  const [selectedItem, setSelectedItem] = useState('Details');
  const [employeeData, setEmployeeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { setEmployeeId } = useContext(EmployeeContext);
  console.log("Emp id",setEmployeeId )
  const { id } = useParams();
  console.log("Emp id  param",id )


  useEffect(() => {
    if (id) {
      setEmployeeId(id);
    }
  }, [id, setEmployeeId]);

  useEffect(() => {
    if (!id) {
        setLoading(false);
        setError("No employee ID provided in the URL.");
        return;
    }
    setLoading(true);
    setError(null);
    axiosInstance.get(`api/edit_employee/${id}/`)
      .then(res => {
        if (res.data?.data?.length) {
          setEmployeeData(res.data.data[0]);
        } else {
          setError("Employee not found.");
        }
      })
      .catch(err => {
        console.error("Error fetching employee data:", err);
        setError("Failed to load employee data.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress /></Box>;
  }

  if (error) {
    return <Alert severity="error" sx={{ m: 2 }}>{error}</Alert>;
  }

  return (
    <Box sx={{ flexGrow: 1, p: 2 }}>
      <Grid container spacing={2}>
        {/* Left Sidebar */}
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Box display="flex" alignItems="center" mb={2}>
              {/* --- THE FIX: Dynamic Avatar with Fallback --- */}
              <Avatar
                src={employeeData?.profile_photo}
                alt={employeeData?.emp_name}
                sx={{ width: 56, height: 56, mr: 2 }}
              >
                {getInitials(employeeData?.emp_name)}
              </Avatar>
              <Box>
                <Typography variant="subtitle1" fontWeight="bold">
                  {employeeData?.emp_name || "Employee Name"}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {employeeData?.designation || "Designation"}
                </Typography>
              </Box>
            </Box>
           
            <Box display="flex" alignItems="center" mb={2}>
              <SupervisorAccount sx={{ mr: 1, color: 'text.secondary' }} />
              <Typography>Manager: {employeeData?.manager || "N/A"}</Typography>
            </Box>

            <List>
              {sidebarItems.map((item, index) => (
                <ListItem
                  key={index}
                  button
                  selected={selectedItem === item.text}
                  onClick={() => setSelectedItem(item.text)}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    primaryTypographyProps={{ fontSize: '14px' }}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Right Content */}
        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ p: 2 }}>
            {componentMap[selectedItem]}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EmployeeDetailHr;