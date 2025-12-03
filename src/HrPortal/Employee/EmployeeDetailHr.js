
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
import React, { useState, useEffect, useContext, useRef, useMemo } from "react";
import { EmployeeContext } from "./EmployeeContext";
import axiosInstance from "../../utils/axiosInstance";

import {
  Box, Paper, Typography, Avatar, CircularProgress, Alert, Button,
  Stepper, Step, StepLabel, StepButton, Dialog, DialogTitle, DialogContent, DialogActions,
  IconButton, Grid, TableContainer, Table, TableHead, TableRow, TableCell, TableBody,
  Zoom, Divider, Chip
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowBack as ArrowBackIcon,
  Close as CloseIcon,
  Download as DownloadIcon,
  Visibility as VisibilityIcon,
  CheckCircle as CheckCircleIcon
} from "@mui/icons-material";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion"; 
import vetrinaLogo from "../../Assests/vetrinalogo.jpg"; 

// Child Components
import Detail from "./Contract";
import BasicInformation from "./BasicInformation";
import AccountInformation from "./AccountInformation";
import ProfilePicture from "./ProfilePicture";
import PersonalInformation from "./PersonalInformation";
import Documents from "./Documents";

const PRIMARY_COLOR = "#8C257C"; 
const SECONDARY_COLOR = "#F58E35"; 
const GRADIENT_BTN = `linear-gradient(135deg, ${PRIMARY_COLOR} 0%, #6d1d60 100%)`;
const GRADIENT_FINISH = `linear-gradient(135deg, ${SECONDARY_COLOR} 0%, #d4762c 100%)`;

const ModernPaper = ({ children, sx, ...props }) => (
  <Paper 
    elevation={0}
    sx={{ 
      p: 3, 
      borderRadius: 4, 
      boxShadow: '0 4px 20px rgba(0,0,0,0.05)', 
      border: '1px solid rgba(0,0,0,0.05)',
      ...sx 
    }} 
    {...props}
  >
    {children}
  </Paper>
);

const pageVariants = {
  initial: { opacity: 0, x: 20 },
  in: { opacity: 1, x: 0 },
  out: { opacity: 0, x: -20 }
};

const pageTransition = { type: "tween", ease: "anticipate", duration: 0.4 };

const formatCurrency = (value) => {
    if (value === null || value === undefined || value === "" || isNaN(Number(value))) {
      return "N/A";
    }
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(Number(value));
};

const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try { return new Date(dateString).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }); }
    catch { return dateString; }
};

// --- ORIGINAL VIEW (Restored Exact Layout + Full Pay Slip) ---
const OriginalView = ({ data }) => {
  const [openSlip, setOpenSlip] = useState(false);
  const [selectedSlip, setSelectedSlip] = useState(null);
  const [loadingSlip, setLoadingSlip] = useState(false);
  const [slipError, setSlipError] = useState(null);
  const slipPreviewRef = useRef(null);

  if (!data) return null;

  const {
    employee_info,
    personal_details,
    nearest_police_station,
    work_details,
    compensation_details,
    bank_details,
    assets,
    rewards,
    salary_history,
  } = data;

  const Section = ({ title, children }) => (
    <Box mb={4}>
      <Typography variant="h6" gutterBottom sx={{ 
          borderBottom: `2px solid ${PRIMARY_COLOR}`, 
          display: 'inline-block',
          pb: 0.5, 
          mb: 2, 
          color: PRIMARY_COLOR, 
          fontWeight: 700 
      }}>
        {title}
      </Typography>
      {children}
    </Box>
  );

  const DetailItem = ({ label, value }) => (
    <Grid item xs={12} sm={6}>
      <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{label}</Typography>
      <Typography variant="body1" sx={{ color: "#333", fontWeight: 500, mt: 0.5 }}>{value || "N/A"}</Typography>
    </Grid>
  );

  const handleOpenSlip = async (row) => {
    setOpenSlip(true);
    setLoadingSlip(true);
    setSlipError(null);
    setSelectedSlip(null);
    
    try {
      const employeeId = data?.employee_info?.employee_id;
      if (!employeeId) {
        setSlipError('Employee ID not found.');
        setLoadingSlip(false);
        return;
      }
      
      const response = await axiosInstance.get(`api/view_employee_salary_slip/${employeeId}/`);
      
      if (response.data && response.data.data) {
        const slipData = Array.isArray(response.data.data) ? response.data.data[0] : response.data.data;
        if (!slipData) {
          setSlipError('No salary slip data found.');
          setLoadingSlip(false);
          return;
        }

        const transformedSlip = {
            name: slipData.employee_name || employee_info?.full_name || 'N/A',
            salaryMonth: row.month || slipData.salary_month || 'N/A',
            year: row.year || slipData.year,
            payDate: formatDate(slipData.pay_date),
            netPayable: parseFloat(slipData.net_pay || slipData.net_payable || slipData.take_home || 0),
            details: {
                employeeId: slipData.employee_id || 'N/A',
                department: slipData.department_name || employee_info?.department || 'N/A',
                dateOfJoining: formatDate(slipData.date_of_joining),
                designation: slipData.designation_name || employee_info?.designation || 'N/A',
                location: slipData.location || 'N/A',
                payableDays: slipData.payable_days || 30,
                leaves: slipData.leaves || 'N/A',
                bankName: slipData.bank_name || 'N/A',
                bankAcNo: slipData.bank_account_number || 'N/A',
                pfNo: slipData.pf_number || 'N/A',
                uanNo: slipData.uan_number || 'N/A',
                esicNo: slipData.esic_number || 'N/A',
                panNo: slipData.pan_number || 'N/A',
                basic: parseFloat(slipData.basic_plus_da || 0),
                hra: parseFloat(slipData.hra || 0),
                medical: parseFloat(slipData.medical_allowance || 0),
                conveyance: parseFloat(slipData.conveyance_allowance || 0),
                arrears: parseFloat(slipData.arrears || 0),
                pf: parseFloat(slipData.pf || 0),
                esic: parseFloat(slipData.esic || 0),
                pt: parseFloat(slipData.pt || slipData.professional_tax || 0),
                tds: parseFloat(slipData.tds || 0),
                otherDeduction: parseFloat(slipData.other_deduction || 0),
                advance: parseFloat(slipData.advance || 0),
                totalEarnings: parseFloat(slipData.total_earnings || 0),
                totalDeductions: parseFloat(slipData.total_deduction || slipData.total_deductions || 0),
            }
        };
        setSelectedSlip(transformedSlip);
      } else {
          setSlipError('Invalid response from server.');
      }
    } catch (error) {
        setSlipError('Failed to load salary slip. Please try again.');
    } finally {
        setLoadingSlip(false);
    }
  };

  const handleDownloadSlip = async () => {
      if(slipPreviewRef.current) {
          const canvas = await html2canvas(slipPreviewRef.current, { scale: 2, useCORS: true });
          const imgData = canvas.toDataURL('image/png');
          const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
          const pdfWidth = pdf.internal.pageSize.getWidth();
          const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
          pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
          pdf.save(`${employee_info?.full_name}-Payslip.pdf`);
      }
  };

  return (
    <Box sx={{ p: 4 }}>
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={4}>
          <Box display="flex" alignItems="center">
            <Avatar 
                src={employee_info?.profile_photo} 
                imgProps={{ crossOrigin: "anonymous" }}
                sx={{ width: 90, height: 90, mr: 3, border: `3px solid ${PRIMARY_COLOR}` }} 
            />
            <Box>
              <Typography variant="h4" fontWeight="bold" color="#333">{employee_info?.full_name || "N/A"}</Typography>
              <Typography variant="subtitle1" color="text.secondary">ID: {employee_info?.employee_id || "N/A"}</Typography>
            </Box>
          </Box>
          {vetrinaLogo && <img src={vetrinaLogo} alt="Logo" style={{ height: "60px", width: "auto" }} />}
        </Box>

        <Section title="Employee Information">
          <Grid container spacing={3}>
            <DetailItem label="Department" value={employee_info?.department} />
            <DetailItem label="Designation" value={employee_info?.designation} />
            <DetailItem label="Division" value={employee_info?.division} />
            <DetailItem label="Sub Division" value={employee_info?.sub_division} />
            <DetailItem label="Head Quarter" value={employee_info?.head_quarter} />
          </Grid>
        </Section>
        <Section title="Personal Details">
          <Grid container spacing={3}>
            <DetailItem label="Contact Number" value={personal_details?.contact_number} />
            <DetailItem label="Email" value={personal_details?.email} />
            <DetailItem label="Date of Birth" value={personal_details?.date_of_birth} />
            <DetailItem label="Age" value={personal_details?.age} />
          </Grid>
        </Section>
        <Section title="Correspondence Address">
          <Grid container spacing={3}>
            <DetailItem label="Address 2" value={personal_details?.correspondence_address?.address_2} />
            <DetailItem label="City" value={personal_details?.correspondence_address?.city} />
            <DetailItem label="State" value={personal_details?.correspondence_address?.state} />
            <DetailItem label="Country" value={personal_details?.correspondence_address?.country} />
            <DetailItem label="Zipcode" value={personal_details?.correspondence_address?.zipcode} />
          </Grid>
        </Section>
        <Section title="Nearest Police Station">
            <Grid container spacing={3}>
                <DetailItem label="Address" value={nearest_police_station?.address} />
                <DetailItem label="Country" value={nearest_police_station?.country} />
                <DetailItem label="State" value={nearest_police_station?.state} />
                <DetailItem label="District" value={nearest_police_station?.district} />
                <DetailItem label="Tehsil" value={nearest_police_station?.tehsil} />
                <DetailItem label="Village" value={nearest_police_station?.village} />
                <DetailItem label="Pincode" value={nearest_police_station?.pincode} />
            </Grid>
        </Section>
        <Section title="Work Details">
            <Grid container spacing={3}>
                <DetailItem label="Date of Joining" value={work_details?.date_of_joining} />
                <DetailItem label="Date of Promotion" value={work_details?.date_of_promotion} />
                <DetailItem label="Status" value={work_details?.employee_status} />
            </Grid>
        </Section>
        <Section title="Compensation Details">
             <Grid container spacing={3}>
                <DetailItem label="Gross Salary" value={compensation_details?.current_salary} />
                <DetailItem label="Current CTC" value={compensation_details?.current_ctc} />
                <DetailItem label="Joining Salary" value={compensation_details?.joining_salary} />
                <DetailItem label="Joining CTC" value={compensation_details?.joining_ctc} />
             </Grid>
        </Section>
        <Section title="Bank Details">
             <Grid container spacing={3}>
                <DetailItem label="Account Title" value={bank_details?.account_title} />
                <DetailItem label="Account Number" value={bank_details?.account_number} />
                <DetailItem label="Bank Name" value={bank_details?.bank_name} />
                <DetailItem label="IFSC Code" value={bank_details?.ifsc_code} />
                <DetailItem label="Swift Code" value={bank_details?.swift_code} />
                <DetailItem label="Bank Branch" value={bank_details?.bank_branch} />
             </Grid>
        </Section>

        <Typography variant="body2" sx={{fontWeight:'bold', mb:1}}>Note</Typography>
        <Typography variant="body2" mb={2}>Salary history is available below.</Typography>
          
        <Section title="Assigned Assets">
            <TableContainer component={Paper} elevation={0} variant="outlined">
                <Table size="small">
                    <TableHead>
                        <TableRow sx={{ bgcolor: "#f5f5f5" }}>
                            <TableCell>Sr. No.</TableCell><TableCell>Asset Name</TableCell><TableCell>Category</TableCell>
                            <TableCell>Brand</TableCell><TableCell>Manufacturer</TableCell><TableCell>Serial Number</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(assets || []).length > 0 ? (assets.map((asset, i) => (
                            <TableRow key={i}>
                                <TableCell>{i+1}</TableCell><TableCell>{asset.assets_name}</TableCell><TableCell>{asset.category_name}</TableCell>
                                <TableCell>{asset.brand_name}</TableCell><TableCell>{asset.manufacturer}</TableCell><TableCell>{asset.serial_number}</TableCell>
                            </TableRow>
                        ))) : <TableRow><TableCell colSpan={6} align="center">Assets Not Allocated</TableCell></TableRow>}
                    </TableBody>
                </Table>
            </TableContainer>
        </Section>

        <Section title="Reward & Recognition">
            <TableContainer component={Paper} elevation={0} variant="outlined">
                <Table size="small">
                    <TableHead>
                        <TableRow sx={{ bgcolor: "#f5f5f5" }}>
                            <TableCell>Sr No.</TableCell><TableCell>Name of Reward</TableCell><TableCell>Month/Year</TableCell><TableCell>Cash Prize</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rewards || []).map((r, i) => (
                            <TableRow key={i}>
                                <TableCell>{i+1}</TableCell><TableCell>{r.award_type}</TableCell><TableCell>{r.month_year}</TableCell><TableCell>{formatCurrency(r.award_cash)}</TableCell>
                            </TableRow>
                        ))}
                        {!(rewards || []).length && <TableRow><TableCell colSpan={4} align="center">No Rewards Information Available</TableCell></TableRow>}
                    </TableBody>
                </Table>
            </TableContainer>
        </Section>
          
        <Section title="Compensation – View">
             <TableContainer component={Paper} elevation={0} variant="outlined">
                <Table size="small">
                    <TableHead>
                        <TableRow sx={{ bgcolor: "#f5f5f5" }}>
                           <TableCell>Sr. No.</TableCell><TableCell>Designation</TableCell><TableCell>Level</TableCell><TableCell>Financial Year</TableCell>
                           <TableCell>W.E.F</TableCell><TableCell>Basic + DA</TableCell><TableCell>Gross Salary</TableCell><TableCell>CTC</TableCell><TableCell>View Salary slip</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(salary_history || []).map((row, i) => (
                             <TableRow key={i}>
                                 <TableCell>{i+1}</TableCell><TableCell>{row.designation}</TableCell><TableCell>{row.level}</TableCell>
                                 <TableCell>{row.year}</TableCell><TableCell>{row.wef}</TableCell>
                                 <TableCell>{formatCurrency(row.basic_plus_da)}</TableCell><TableCell>{formatCurrency(row.gross_salary)}</TableCell><TableCell>{formatCurrency(row.ctc)}</TableCell>
                                 <TableCell>
                                     <Button size="small" onClick={() => handleOpenSlip(row)} sx={{ textTransform: "none", color: PRIMARY_COLOR, fontWeight:'bold' }}>View</Button>
                                 </TableCell>
                             </TableRow>
                        ))}
                         {!(salary_history || []).length && <TableRow><TableCell colSpan={9} align="center">No Compensation Information Available</TableCell></TableRow>}
                    </TableBody>
                </Table>
             </TableContainer>
        </Section>

      {/* --- RESTORED: FULL DETAILED SALARY SLIP DIALOG --- */}
      <Dialog open={openSlip} onClose={() => setOpenSlip(false)} maxWidth="md" fullWidth>
        <DialogTitle sx={{ color: PRIMARY_COLOR, fontWeight: 'bold' }}>Pay Slip</DialogTitle>
        <Box ref={slipPreviewRef}>
          <DialogContent>
            {loadingSlip ? (
              <Box display="flex" justifyContent="center" p={3}><CircularProgress /></Box>
            ) : slipError ? (
              <Box display="flex" justifyContent="center" p={3}><Typography color="error">{slipError}</Typography></Box>
            ) : selectedSlip ? (
                <Box sx={{ p: 2, border: "2px solid #000", fontFamily: 'Arial, sans-serif' }}>
                   
                   <Grid container alignItems="flex-start" justifyContent="space-between" sx={{ mb: 2 }}>
                       <Grid item xs={6}>{vetrinaLogo && <img src={vetrinaLogo} style={{ maxWidth: '180px', height: 'auto' }} alt="logo"/>}</Grid>
                       <Grid item xs={6} textAlign="right">
                           <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Vetrina Healthcare Pvt. Ltd.</Typography>
                           <Typography variant="body2">Pay Slip For Month: {selectedSlip.salaryMonth}, {selectedSlip.year}</Typography>
                           <Typography variant="body2">Salary Payment Date: {selectedSlip.payDate}</Typography>
                       </Grid>
                   </Grid>

                   <Grid container spacing={1} sx={{ mb: 2 }}>
                       <Grid item xs={6}>
                           <Typography variant="body2"><strong>Employee ID:</strong> {selectedSlip.details.employeeId}</Typography>
                           <Typography variant="body2"><strong>Employee Name:</strong> {selectedSlip.name}</Typography>
                           <Typography variant="body2"><strong>Department:</strong> {selectedSlip.details.department}</Typography>
                           <Typography variant="body2"><strong>Date of Joining:</strong> {selectedSlip.details.dateOfJoining}</Typography>
                           <Typography variant="body2"><strong>Designation:</strong> {selectedSlip.details.designation}</Typography>
                           <Typography variant="body2"><strong>Leaves:</strong> {selectedSlip.details.leaves}</Typography>
                           <Typography variant="body2"><strong>Location:</strong> {selectedSlip.details.location}</Typography>
                           <Typography variant="body2"><strong>Payable Days:</strong> {selectedSlip.details.payableDays}</Typography>
                       </Grid>
                       <Grid item xs={6}>
                           <Typography variant="body2"><strong>Bank Name:</strong> {selectedSlip.details.bankName}</Typography>
                           <Typography variant="body2"><strong>Bank A/c No:</strong> {selectedSlip.details.bankAcNo}</Typography>
                           <Typography variant="body2"><strong>PF No:</strong> {selectedSlip.details.pfNo}</Typography>
                           <Typography variant="body2"><strong>UAN No:</strong> {selectedSlip.details.uanNo}</Typography>
                           <Typography variant="body2"><strong>ESIC No:</strong> {selectedSlip.details.esicNo}</Typography>
                           <Typography variant="body2"><strong>PAN No:</strong> {selectedSlip.details.panNo}</Typography>
                       </Grid>
                   </Grid>

                   <TableContainer sx={{ border: "2px solid #000" }}>
                       <Table size="small" sx={{ '& td, & th': { borderRight: '1px solid #000', padding: '4px 8px' } }}>
                           <TableHead>
                               <TableRow sx={{ '& th': { borderBottom: '1px solid #000', fontWeight: 'bold' } }}>
                                   <TableCell sx={{ width: '35%' }}>Earning Title</TableCell>
                                   <TableCell align="right" sx={{ width: '15%' }}>Current Month</TableCell>
                                   <TableCell sx={{ width: '35%' }}>Deduction Title</TableCell>
                                   <TableCell align="right" sx={{ width: '15%', borderRight: 'none !important' }}>Current Month</TableCell>
                               </TableRow>
                           </TableHead>
                           <TableBody>
                               <TableRow>
                                   <TableCell>Basic + DA</TableCell><TableCell align="right">{selectedSlip.details.basic.toFixed(2)}</TableCell>
                                   <TableCell>PF</TableCell><TableCell align="right" sx={{ borderRight: 'none !important' }}>{selectedSlip.details.pf.toFixed(2)}</TableCell>
                               </TableRow>
                               <TableRow>
                                   <TableCell>HRA</TableCell><TableCell align="right">{selectedSlip.details.hra.toFixed(2)}</TableCell>
                                   <TableCell>ESIC</TableCell><TableCell align="right" sx={{ borderRight: 'none !important' }}>{selectedSlip.details.esic.toFixed(2)}</TableCell>
                               </TableRow>
                               <TableRow>
                                   <TableCell>Medical</TableCell><TableCell align="right">{selectedSlip.details.medical.toFixed(2)}</TableCell>
                                   <TableCell>PT</TableCell><TableCell align="right" sx={{ borderRight: 'none !important' }}>{selectedSlip.details.pt.toFixed(2)}</TableCell>
                               </TableRow>
                               <TableRow>
                                   <TableCell>Conveyance</TableCell><TableCell align="right">{selectedSlip.details.conveyance.toFixed(2)}</TableCell>
                                   <TableCell>TDS</TableCell><TableCell align="right" sx={{ borderRight: 'none !important' }}>{selectedSlip.details.tds.toFixed(2)}</TableCell>
                               </TableRow>
                               <TableRow>
                                   <TableCell>Arrears</TableCell><TableCell align="right">{selectedSlip.details.arrears.toFixed(2)}</TableCell>
                                   <TableCell>Other Deduction</TableCell><TableCell align="right" sx={{ borderRight: 'none !important' }}>{selectedSlip.details.otherDeduction.toFixed(2)}</TableCell>
                               </TableRow>
                               <TableRow sx={{ '& td': { borderBottom: '1px solid #000' } }}>
                                   <TableCell></TableCell><TableCell align="right"></TableCell>
                                   <TableCell>Advance</TableCell><TableCell align="right" sx={{ borderRight: 'none !important' }}>{selectedSlip.details.advance.toFixed(2)}</TableCell>
                               </TableRow>
                               <TableRow sx={{ '& td': { fontWeight: 'bold', borderRight: '1px solid #000' } }}>
                                   <TableCell>Total</TableCell><TableCell align="right">{selectedSlip.details.totalEarnings.toFixed(2)}</TableCell>
                                   <TableCell>Total</TableCell><TableCell align="right" sx={{ borderRight: 'none !important' }}>{selectedSlip.details.totalDeductions.toFixed(2)}</TableCell>
                               </TableRow>
                           </TableBody>
                       </Table>
                   </TableContainer>

                   <Box sx={{ mt: 1 }}><Typography variant="body2"><strong>Remark:</strong> NA</Typography></Box>
                   
                   <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                       <Box><Typography variant="body2">Total Earnings: ₹{selectedSlip.details.totalEarnings.toFixed(2)}</Typography></Box>
                       <Box><Typography variant="body2">Total Deductions: ₹{selectedSlip.details.totalDeductions.toFixed(2)}</Typography></Box>
                       <Box><Typography variant="body1" sx={{ fontWeight: 'bold' }}>Take Home: ₹{selectedSlip.netPayable.toFixed(2)}</Typography></Box>
                   </Box>

                   <Box sx={{ mt: 4, textAlign: "center" }}>
                       <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                           Vetrina Healthcare Pvt. Ltd., Corporate Office - Punyai Pride, 1st Floor, Shivshambho Nagar, Lane 3A, Katraj Kondhwa Road, Katraj, Pune - 411046.
                       </Typography>
                       <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                           This is an electronically generated pay slip and does not require any signature.
                       </Typography>
                   </Box>
                </Box>
            ) : null}
          </DialogContent>
        </Box>
        <DialogActions>
            <Button onClick={() => setOpenSlip(false)} color="inherit">Close</Button>
            <Button onClick={() => window.print()} variant="outlined" sx={{color: PRIMARY_COLOR, borderColor: PRIMARY_COLOR}}>Print</Button>
            <Button variant="contained" onClick={handleDownloadSlip} sx={{ bgcolor: PRIMARY_COLOR }}>Download PDF</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

const OnboardingReport = ({ data, pageRefs }) => {
  if (!data) return null;

  const {
    employee_info,
    work_details,
    personal_details,
    account_info,
    bank_details,
    nearest_police_station,
    uploaded_documents,
    statutory_documents
  } = data;

  const ReportSection = ({ number, title, children }) => (
    <Box mb={3} sx={{ breakInside: 'avoid' }}>
        <Box display="flex" alignItems="center" mb={2} sx={{ borderBottom: `2px solid ${PRIMARY_COLOR}`, pb: 1 }}>
            <Box sx={{ 
                bgcolor: PRIMARY_COLOR, color: '#fff', width: 28, height: 28, borderRadius: '50%', 
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', mr: 1.5, fontSize: '0.9rem'
            }}>
                {number}
            </Box>
            <Typography variant="h6" sx={{ color: PRIMARY_COLOR, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                {title}
            </Typography>
        </Box>
        <Box sx={{ pl: 2 }}>{children}</Box>
    </Box>
  );

  const InfoRow = ({ label, value, fullWidth = false }) => (
    <Grid item xs={12} sm={fullWidth ? 12 : 6} md={fullWidth ? 12 : 4} sx={{ mb: 1.5 }}>
        <Typography variant="caption" display="block" color="text.secondary" fontWeight={600} textTransform="uppercase">{label}</Typography>
        <Typography variant="body2" fontWeight={500} color="#333">{value || "N/A"}</Typography>
    </Grid>
  );

  const PageContainer = ({ children, innerRef }) => (
    <Box ref={innerRef} sx={{ p: 5, bgcolor: '#fff', mb: 2, minHeight: '1123px', width: '794px', margin: '0 auto' }}> 
        {children}
    </Box>
  );

  return (
    <>
      <PageContainer innerRef={pageRefs.page1}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={4} pb={2} borderBottom="1px solid #eee">
            <Box>
                <Typography variant="h4" fontWeight={800} color={PRIMARY_COLOR}>ONBOARDING REPORT</Typography>
                <Typography variant="subtitle2" color="text.secondary">Generated on: {new Date().toLocaleDateString()}</Typography>
            </Box>
            {vetrinaLogo && <img src={vetrinaLogo} alt="Logo" style={{ height: 60 }} />}
        </Box>
        <ReportSection number="1" title="Employment Details">
            <Grid container>
                <InfoRow label="Employee ID" value={employee_info?.employee_id} />
                <InfoRow label="Department" value={work_details?.department || employee_info?.department} />
                <InfoRow label="Designation" value={work_details?.designation || employee_info?.designation} />
                <InfoRow label="Date of Joining" value={formatDate(work_details?.date_of_joining)} />
                <InfoRow label="Work Shift" value={work_details?.shift || "General"} />
                <InfoRow label="Employment Status" value={work_details?.employee_status} />
                <InfoRow label="Gross Salary" value={formatCurrency(work_details?.gross_salary)} />
                <InfoRow label="Probation" value={work_details?.probation === 'Y' ? 'Yes' : 'No'} />
            </Grid>
        </ReportSection>
        <ReportSection number="2" title="Basic Information">
            <Grid container>
                <InfoRow label="Full Name" value={employee_info?.full_name} />
                <InfoRow label="Date of Birth" value={formatDate(personal_details?.date_of_birth)} />
                <InfoRow label="Gender" value={personal_details?.gender} />
                <InfoRow label="Marital Status" value={personal_details?.marital_status} />
                <InfoRow label="Blood Group" value={personal_details?.blood_group} />
                <InfoRow label="Contact Number" value={personal_details?.contact_number} />
                <InfoRow label="Permanent Address" value={`${personal_details?.permanent_address?.address || ''}, ${personal_details?.permanent_address?.city || ''}`} fullWidth />
                <InfoRow label="Correspondence Address" value={`${personal_details?.correspondence_address?.address_2 || ''}, ${personal_details?.correspondence_address?.city || ''}`} fullWidth />
            </Grid>
        </ReportSection>
        <ReportSection number="3" title="Account Information">
            <Grid container>
                <InfoRow label="System Username" value={account_info?.username} />
                <InfoRow label="System Email" value={account_info?.email} />
            </Grid>
        </ReportSection>
        <ReportSection number="4" title="Profile Picture">
             <Box display="flex" alignItems="center" gap={3}>
                <Avatar 
                    src={employee_info?.profile_photo} 
                    variant="rounded"
                    imgProps={{ crossOrigin: "anonymous" }}
                    sx={{ width: 100, height: 100, border: `1px solid ${PRIMARY_COLOR}` }} 
                />
            </Box>
        </ReportSection>
        <ReportSection number="5" title="Professional Information">
            <Grid container>
                <InfoRow label="Education / Degree" value={personal_details?.bio?.degree || "N/A"} />
                <InfoRow label="Total Experience" value={personal_details?.bio?.experience ? `${personal_details.bio.experience} Years` : "N/A"} />
                <InfoRow label="Bio / Summary" value={personal_details?.bio?.bio || "N/A"} fullWidth />
            </Grid>
        </ReportSection>
      </PageContainer>

      <PageContainer innerRef={pageRefs.page2}>
         <ReportSection number="6" title="Bank Account Details">
            <Grid container>
                <InfoRow label="Account Holder" value={bank_details?.account_title} />
                <InfoRow label="Bank Name" value={bank_details?.bank_name} />
                <InfoRow label="Account Number" value={bank_details?.account_number} />
                <InfoRow label="IFSC Code" value={bank_details?.ifsc_code} />
                <InfoRow label="Branch" value={bank_details?.bank_branch} />
            </Grid>
         </ReportSection>
         <ReportSection number="7" title="Identification Details">
            <Grid container>
                <InfoRow label="PAN Number" value={personal_details?.pan_number} />
                <InfoRow label="Aadhar Number" value={personal_details?.aadhar_number} />
                <InfoRow label="UAN Number" value={personal_details?.uan_number} />
                <InfoRow label="PF Number" value={personal_details?.pf_number} />
                <InfoRow label="ESIC Number" value={personal_details?.esic_number} />
                <InfoRow label="Passport" value={personal_details?.passport_number} />
            </Grid>
         </ReportSection>
         <ReportSection number="8" title="Emergency Contact">
            <Grid container>
                <InfoRow label="Contact Name" value={personal_details?.emergency_contact?.name} />
                <InfoRow label="Primary Phone" value={personal_details?.emergency_contact?.phone} />
                <InfoRow label="Secondary Phone" value={personal_details?.emergency_contact?.phone_2} />
                <InfoRow label="Address" value={personal_details?.emergency_contact?.address} fullWidth />
            </Grid>
         </ReportSection>
         <ReportSection number="9" title="Nearest Police Station">
            <Grid container>
                <InfoRow label="Address" value={nearest_police_station?.address} fullWidth />
                <InfoRow label="District" value={nearest_police_station?.district} />
                <InfoRow label="State" value={nearest_police_station?.state} />
                <InfoRow label="Pincode" value={nearest_police_station?.pincode} />
            </Grid>
         </ReportSection>
         <ReportSection number="10" title="Social Profiles">
            <Grid container>
                <InfoRow label="LinkedIn" value={personal_details?.social?.linkedin || "N/A"} />
                <InfoRow label="Twitter" value={personal_details?.social?.twitter || "N/A"} />
                <InfoRow label="Facebook" value={personal_details?.social?.facebook || "N/A"} />
            </Grid>
         </ReportSection>
      </PageContainer>

      <PageContainer innerRef={pageRefs.page3}>
          <ReportSection number="11" title="Uploaded Documents">
             <TableContainer component={Paper} variant="outlined" sx={{mb:2}}>
                <Table size="small">
                    <TableHead sx={{ bgcolor: '#f5f5f5' }}>
                        <TableRow><TableCell><strong>Document Name</strong></TableCell><TableCell><strong>Type</strong></TableCell><TableCell align="right"><strong>Status</strong></TableCell></TableRow>
                    </TableHead>
                    <TableBody>
                        {(uploaded_documents || []).length > 0 ? (
                            uploaded_documents.map((doc, i) => (
                                <TableRow key={i}>
                                    <TableCell>{doc.document_name}</TableCell>
                                    <TableCell>{doc.document_type}</TableCell>
                                    <TableCell align="right"><Chip icon={<CheckCircleIcon/>} label="Uploaded" color="success" size="small" variant="outlined"/></TableCell>
                                </TableRow>
                            ))
                        ) : <TableRow><TableCell colSpan={3} align="center">No personal documents uploaded.</TableCell></TableRow>}
                    </TableBody>
                </Table>
             </TableContainer>
          </ReportSection>
          <ReportSection number="12" title="Company & Statutory Documents">
             <TableContainer component={Paper} variant="outlined">
                <Table size="small">
                    <TableHead sx={{ bgcolor: '#f5f5f5' }}>
                        <TableRow><TableCell><strong>Document Name</strong></TableCell><TableCell align="right"><strong>Availability</strong></TableCell></TableRow>
                    </TableHead>
                    <TableBody>
                         {(statutory_documents || []).length > 0 ? (
                             statutory_documents.map((doc, i) => (
                                <TableRow key={i}>
                                    <TableCell>{doc.name}</TableCell>
                                    <TableCell align="right"><Chip label="Available" color="primary" size="small" variant="outlined"/></TableCell>
                                </TableRow>
                             ))
                         ) : <TableRow><TableCell colSpan={2} align="center">No statutory documents found.</TableCell></TableRow>}
                    </TableBody>
                </Table>
             </TableContainer>
          </ReportSection>
      </PageContainer>
    </>
  );
};

const EmployeeDetailHr = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { setEmployeeId } = useContext(EmployeeContext);

  const [loading, setLoading] = useState(true);
  const [employeeData, setEmployeeData] = useState(null);
  const [error, setError] = useState(null);

  const [activeStep, setActiveStep] = useState(0); 
  const [subStep, setSubStep] = useState(0); 

  // Separate States for View Details vs Finish PDF
  const [openViewDetails, setOpenViewDetails] = useState(false);
  const [viewDetailsData, setViewDetailsData] = useState(null);

  const [openReportDialog, setOpenReportDialog] = useState(false);
  const [reportData, setReportData] = useState(null);
  const [autoDownloadReport, setAutoDownloadReport] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const reportRefs = useMemo(() => ({ page1: React.createRef(), page2: React.createRef(), page3: React.createRef() }), []);
  
  const mainSteps = ["Employment Information", "Personal Information", "Documents"];

  useEffect(() => {
    if (id) { setEmployeeId(id); fetchEmployeeHeader(); }
  }, [id, setEmployeeId]);

  const fetchEmployeeHeader = () => {
    setLoading(true);
    axiosInstance.get(`api/edit_employee/${id}/`).then((res) => {
        if (res.data?.data?.length) setEmployeeData(res.data.data[0]);
        else setError("Employee not found.");
      }).catch((err) => setError("Failed to load data.")).finally(() => setLoading(false));
  };

  const handleEmploymentNext = () => {
    if (subStep < 3) setSubStep((prev) => prev + 1);
    else { setActiveStep(1); window.scrollTo(0, 0); }
  };

  const handlePersonalNext = () => { setActiveStep(2); window.scrollTo(0, 0); };

  const handleBack = () => {
    if (activeStep === 0) { if (subStep > 0) setSubStep(prev => prev - 1); else navigate(-1); }
    else if (activeStep === 1) { setActiveStep(0); setSubStep(3); }
    else if (activeStep === 2) { setActiveStep(1); }
    window.scrollTo(0, 0);
  };

  // --- 1. VIEW DETAILS BUTTON LOGIC (Original Layout) ---
  const handleViewDetails = () => {
    if (!id) return;
    setIsProcessing(true);
    setOpenViewDetails(true);
    
    axiosInstance.get(`api/employee/${id}/`).then((res) => {
        const payload = res.data || {};
        let salaryData = [];
        if (payload.salary_history && Array.isArray(payload.salary_history)) salaryData = payload.salary_history;
        else if (payload.compensation && typeof payload.compensation === 'object') salaryData = [payload.compensation];

        const normalized = {
          employee_info: payload.employee_info || { full_name: payload.full_name || payload.emp_name, profile_photo: payload.profile_photo || payload.photo, employee_id: payload.employee_id || payload.emp_id },
          personal_details: payload.personal_details || payload.personal || {},
          assets: payload.assets || [],
          rewards: payload.rewards || [],
          salary_history: salaryData,
          nearest_police_station: payload.nearest_police_station || {},
          work_details: payload.work_details || {},
          compensation_details: payload.compensation_details || {},
          bank_details: payload.bank_details || {},
          employee_journey: payload.employee_journey || {},
        };
        setViewDetailsData(normalized);
      }).catch(() => { Swal.fire("Error", "Failed to load details.", "error"); setOpenViewDetails(false); })
      .finally(() => setIsProcessing(false));
  };

  // --- 2. FINISH & DOWNLOAD PDF LOGIC (New 12-Section Layout) ---
  const handleFinishAndGenerate = async () => {
      setAutoDownloadReport(true);
      setOpenReportDialog(true);
      setIsProcessing(true);

      try {
        const mainReq = axiosInstance.get(`api/employee/${id}/`);
        const accountReq = axiosInstance.post('/api/account_info/', { user_id: id });
        const docReq = axiosInstance.get(`/api/document_details/?user_id=${id}`);
        
        const [mainRes, accountRes, docRes] = await Promise.all([mainReq, accountReq, docReq]);
        
        const payload = mainRes.data || {};
        const uploadedDocs = docRes.data.status === 'success' ? docRes.data.docs : [];

        const normalized = {
          employee_info: payload.employee_info || { 
              full_name: payload.full_name || employeeData?.emp_name, 
              profile_photo: payload.profile_photo || employeeData?.profile_photo, 
              employee_id: payload.employee_id || id 
          },
          personal_details: {
              ...payload.personal_details,
              bio: payload.personal_details?.bio || {},
              social: payload.personal_details?.social || {},
              emergency_contact: payload.personal_details?.contact || {},
              pan_number: payload.personal_details?.pan_number || payload.personal_details?.other?.pan_no,
              aadhar_number: payload.personal_details?.aadhar_number || payload.personal_details?.other?.aadhar_no,
              uan_number: payload.personal_details?.uan_number,
              pf_number: payload.personal_details?.pf_number,
              esic_number: payload.personal_details?.esic_number,
          },
          account_info: accountRes.data.status === 'success' ? accountRes.data.data : {},
          bank_details: payload.bank_details || {},
          nearest_police_station: payload.nearest_police_station || {},
          work_details: payload.work_details || payload.contract_details || {},
          uploaded_documents: uploadedDocs,
          statutory_documents: [ { name: "Code of Conduct" }, { name: "IT Policy" }, { name: "Leave Policy" } ] 
        };
        setReportData(normalized);
      } catch (e) {
          console.error(e);
          Swal.fire("Error", "Failed to generate report data", "error");
          setOpenReportDialog(false);
      } finally {
          setIsProcessing(false);
      }
  };

  const downloadReportPdf = async () => {
    Swal.fire({
      title: 'Generating PDF...',
      html: 'Compiling <b>12 Sections</b> into a professional report.<br>Please wait...',
      allowOutsideClick: false,
      didOpen: () => {
          Swal.showLoading();
          const container = Swal.getContainer();
          if(container) container.style.zIndex = "1400";
      }
    });

    try {
      const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
      const imgWidth = 210; 

      const capturePage = async (ref) => {
        if (!ref.current) return null;
        try {
            const canvas = await html2canvas(ref.current, {
                scale: 2,
                useCORS: true, 
                logging: false,
                backgroundColor: '#ffffff',
                windowWidth: ref.current.scrollWidth,
                windowHeight: ref.current.scrollHeight,
                x: 0, y: 0
            });
            return { imgData: canvas.toDataURL("image/png"), imgHeight: (canvas.height * imgWidth) / canvas.width };
        } catch (e) {
            const canvas = await html2canvas(ref.current, { scale: 2, useCORS: false, logging: false, backgroundColor: '#ffffff' });
            return { imgData: canvas.toDataURL("image/png"), imgHeight: (canvas.height * imgWidth) / canvas.width };
        }
      };

      const p1 = await capturePage(reportRefs.page1);
      if (p1) pdf.addImage(p1.imgData, "PNG", 0, 0, imgWidth, p1.imgHeight);

      if (reportRefs.page2.current) {
        pdf.addPage();
        const p2 = await capturePage(reportRefs.page2);
        if (p2) pdf.addImage(p2.imgData, "PNG", 0, 0, imgWidth, p2.imgHeight);
      }

      if (reportRefs.page3.current) {
        pdf.addPage();
        const p3 = await capturePage(reportRefs.page3);
        if (p3) pdf.addImage(p3.imgData, "PNG", 0, 0, imgWidth, p3.imgHeight);
      }

      const safeName = (employeeData?.emp_name || "Employee").replace(/[^a-z0-9]/gi, '_');
      pdf.save(`${safeName}_Onboarding_Report.pdf`);
      
      Swal.close();
      Swal.fire({ 
        icon: 'success', 
        title: 'Downloaded Successfully', 
        timer: 1500, 
        showConfirmButton: false,
        didOpen: () => { const container = Swal.getContainer(); if(container) container.style.zIndex = "1400"; }
      });
      // Optionally close the dialog after download
      setOpenReportDialog(false);

    } catch (err) {
      console.error(err);
      Swal.fire({ title: 'Error', text: 'Failed to generate PDF.', icon: 'error', didOpen: () => { const container = Swal.getContainer(); if(container) container.style.zIndex = "1400"; }});
    }
  };

  useEffect(() => {
    if (openReportDialog && !isProcessing && reportData && autoDownloadReport) {
        const timer = setTimeout(() => {
            downloadReportPdf().then(() => setAutoDownloadReport(false));
        }, 1500);
        return () => clearTimeout(timer);
    }
  }, [openReportDialog, isProcessing, reportData, autoDownloadReport]);

  const renderEmploymentInfo = () => {
    const subStepsLabels = ["Details", "Basic Information", "Account Information", "Profile Picture"];
    return (
      <Box component={motion.div} initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
        <Stepper activeStep={subStep} alternativeLabel nonLinear sx={{ mb: 4, 
            '& .MuiStepLabel-label': { fontWeight: 600 },
            '& .MuiStepIcon-root': { color: '#ccc' },
            '& .MuiStepIcon-root.Mui-active': { color: PRIMARY_COLOR },
            '& .MuiStepIcon-root.Mui-completed': { color: SECONDARY_COLOR }
        }}>
            {subStepsLabels.map((label, index) => (
                <Step key={label}>
                    <StepButton onClick={() => setSubStep(index)}>{label}</StepButton>
                </Step>
            ))}
        </Stepper>
        {subStep === 0 && <Detail onNext={handleEmploymentNext} onBack={handleBack} />}
        {subStep === 1 && <BasicInformation onNext={handleEmploymentNext} onBack={handleBack} />}
        {subStep === 2 && <AccountInformation onNext={handleEmploymentNext} onBack={handleBack} />}
        {subStep === 3 && <ProfilePicture onNext={handleEmploymentNext} onBack={handleBack} />}
      </Box>
    );
  };

  if (loading) return <Box display="flex" justifyContent="center" p={4}><CircularProgress sx={{ color: PRIMARY_COLOR }} /></Box>;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Box sx={{ flexGrow: 1, p: 3, background: '#f8f9fa', minHeight: '100vh' }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", color: PRIMARY_COLOR ,}}>
          Employee Details
        </Typography>
        <Button variant="contained" onClick={() => navigate(-1)} startIcon={<ArrowBackIcon />} sx={{ borderRadius: '20px', background: GRADIENT_BTN, boxShadow: '0 4px 10px rgba(140, 37, 124, 0.3)' }}>
          Back to List
        </Button>
      </Box>

      <ModernPaper sx={{ mb: 4, background: 'linear-gradient(to right, #ffffff, #fdf2f8)' }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box display="flex" alignItems="center">
                <Avatar src={employeeData?.profile_photo} sx={{ width: 70, height: 70, mr: 2, border: `3px solid ${PRIMARY_COLOR}` }} />
                <Box>
                    <Typography variant="h5" color={PRIMARY_COLOR} fontWeight="bold">{employeeData?.emp_name}</Typography>
                    <Typography variant="body1" color="textSecondary">{employeeData?.designation} | {employeeData?.employee_id}</Typography>
                </Box>
            </Box>
            <Button variant="contained" onClick={handleViewDetails} startIcon={<VisibilityIcon />} sx={{ borderRadius: '20px', background: GRADIENT_BTN, px: 3 }}>
                View Details
            </Button>
        </Box>
      </ModernPaper>

      <Stepper activeStep={activeStep} nonLinear sx={{ mb: 4, 
          '& .MuiStepConnector-line': { borderColor: '#e0e0e0', borderWidth: 2 },
          '& .MuiStepIcon-root': { width: 32, height: 32 },
          '& .MuiStepIcon-root.Mui-active': { color: PRIMARY_COLOR },
          '& .MuiStepIcon-root.Mui-completed': { color: SECONDARY_COLOR },
          '& .MuiStepLabel-label': { fontSize: '1rem', fontWeight: 600 }
      }}>
        {mainSteps.map((label, index) => (
          <Step key={label}>
            <StepButton onClick={() => setActiveStep(index)}>{label}</StepButton>
          </Step>
        ))}
      </Stepper>

      <AnimatePresence mode="wait">
        <ModernPaper sx={{ minHeight: 400 }}>
            {activeStep === 0 && renderEmploymentInfo()}
            {activeStep === 1 && <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}><PersonalInformation onNext={handlePersonalNext} onBack={handleBack} /></motion.div>}
            {activeStep === 2 && <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}><Documents onNext={handleFinishAndGenerate} onBack={handleBack} /></motion.div>}
        </ModernPaper>
      </AnimatePresence>

      {/* 1. VIEW DETAILS DIALOG (ORIGINAL LAYOUT) */}
      <Dialog open={openViewDetails} onClose={() => setOpenViewDetails(false)} fullWidth maxWidth="md" 
        PaperProps={{ sx: { borderRadius: 4, overflow: 'hidden' } }}
        TransitionComponent={Zoom}
      >
        <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: '1px solid #eee', bgcolor: '#fafafa', p: 2 }}>
             <Typography variant="h6" color={PRIMARY_COLOR} fontWeight="bold">Employee Details</Typography>
             <IconButton onClick={() => setOpenViewDetails(false)} sx={{ color: '#666' }}><CloseIcon /></IconButton>
        </DialogTitle>
        <DialogContent dividers sx={{ p: 0, bgcolor: '#fff' }}>
            {isProcessing ? <Box display="flex" justifyContent="center" p={5}><CircularProgress sx={{ color: PRIMARY_COLOR }} /></Box> : 
            <OriginalView data={viewDetailsData} />}
        </DialogContent>
        <DialogActions sx={{ p: 3, bgcolor: '#fafafa' }}>
            <Button onClick={() => setOpenViewDetails(false)} variant="outlined" color="error" sx={{ borderRadius: 2 }}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* 2. REPORT GENERATION DIALOG (FOR FINISH BUTTON) */}
      <Dialog open={openReportDialog} onClose={() => setOpenReportDialog(false)} fullWidth maxWidth="lg" 
        PaperProps={{ sx: { borderRadius: 4, overflow: 'hidden', height: '90vh' } }}
      >
        <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: '1px solid #eee', bgcolor: '#fafafa', p: 2 }}>
             <Typography variant="h6" color={PRIMARY_COLOR} fontWeight="bold">Generating Report...</Typography>
             <IconButton onClick={() => setOpenReportDialog(false)} sx={{ color: '#666' }}><CloseIcon /></IconButton>
        </DialogTitle>
        <DialogContent dividers sx={{ p: 0, bgcolor: '#888', display: 'flex', justifyContent: 'center' }}>
            <Box sx={{ overflowY: 'auto', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', py: 4 }}>
                {isProcessing || !reportData ? <CircularProgress sx={{ color: '#fff' }} /> : 
                <OnboardingReport pageRefs={reportRefs} data={reportData} />}
            </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3, bgcolor: '#fafafa', justifyContent: 'center' }}>
            <Button onClick={downloadReportPdf} variant="contained" startIcon={<DownloadIcon />} sx={{ background: GRADIENT_FINISH, px: 4, borderRadius: 2 }}>Download PDF</Button>
            <Button onClick={() => setOpenReportDialog(false)} variant="outlined" color="error" sx={{ borderRadius: 2 }}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default EmployeeDetailHr;