// import React, { useState, useEffect, useContext, useRef } from 'react';
// import { EmployeeContext } from './EmployeeContext';
// import axiosInstance from "../../utils/axiosInstance"; 
// import {
//   Box, Grid, Paper, Typography, Avatar, List, ListItem,
//   ListItemIcon, ListItemText, CircularProgress, Alert, IconButton,
//   Dialog, DialogTitle, DialogContent, DialogActions, Button, Tooltip,
//   TableContainer, Table, TableHead, TableRow, TableCell, TableBody
// } from '@mui/material';
// import { useParams } from 'react-router-dom';
// import {
//   Lock, Info, AccountBox, Image, AccountBalance,
//   Description, SupervisorAccount, Print as PrintIcon,
//   Close as CloseIcon, Download as DownloadIcon, Group as GroupIcon
// } from '@mui/icons-material';

// // --- PDF Generation Libraries ---
// import jsPDF from 'jspdf';
// import html2canvas from 'html2canvas';

// // --- Child Component Imports ---
// import Contract from './Contract';
// import BasicInformation from './BasicInformation';
// import PersonalInformation from './PersonalInformation';
// import ProfilePicture from './ProfilePicture';
// import AccountInformation from './AccountInformation';
// import Documents from './Documents';
// import FamilyDetails from './FamilyDetails';

// // --- Logo Import ---
// import vetrinaLogo from '../../Assests/vetrinalogo.jpg';

// const componentMap = {
//   'Details': <Contract />,
//   'Basic Information': <BasicInformation />,
//   'Personal Information': <PersonalInformation />,
//   'Profile Picture': <ProfilePicture />,
//   'Account Information': <AccountInformation />,
//   'Documents': <Documents />,
//   'Family Details': <FamilyDetails />,
// };
  
// const sidebarItems = [
//   { icon: <Lock />, text: 'Details' },
//   { icon: <Info />, text: 'Basic Information' },
//   { icon: <AccountBox />, text: 'Personal Information' },
//   { icon: <Image />, text: 'Profile Picture' },
//   { icon: <AccountBalance />, text: 'Account Information' },
//   { icon: <Description />, text: 'Documents' },
//   { icon: <GroupIcon />, text: 'Family Details' },
// ];

// const getInitials = (name = "") => {
//   const nameParts = name.split(' ').filter(Boolean);
//   if (nameParts.length === 0) return '...';
//   if (nameParts.length === 1) return nameParts[0][0].toUpperCase();
//   return (nameParts[0][0] + nameParts[nameParts.length - 1][0]).toUpperCase();
// };

// // ======================= START: UPDATED PRINTABLE VIEW COMPONENT =======================
// const PrintableView = React.forwardRef(({ data, secondPartRef, thirdPartRef }, ref) => {
//   if (!data) return null;

//   const {
//     employee_info, personal_details, emergency_contact,
//     work_details, compensation_details, bank_details,
//     assets, employee_journey
//   } = data;

//   const Section = ({ title, children }) => (
//     <Box mb={3}>
//       <Typography variant="h6" gutterBottom sx={{ 
//         borderBottom: 1, 
//         borderColor: 'divider', 
//         pb: 1, mb: 2, 
//         color: '#673AB7' // Vibrant purple for section titles
//       }}>
//         {title}
//       </Typography>
//       {children}
//     </Box>
//   );

//   const DetailItem = ({ label, value }) => (
//     <Grid item xs={12} sm={6}>
//       <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 'bold' }}> {/* Faint Grey Label */}
//         {label}
//       </Typography>
//       <Typography variant="body1" sx={{ pl: 1, color: '#000' }}> {/* Dark Black Value */}
//         {value || 'N/A'}
//       </Typography>
//     </Grid>
//   );

//   const formatAddress = (address) => {
//     if (!address) return 'N/A';
//     const parts = [
//       address.address_1,
//       address.address_2,
//       address.city,
//       address.state,
//       address.country
//     ].filter(Boolean);
//     if (parts.length === 0) return 'N/A';
//     const mainAddress = parts.join(', ');
//     return address.zipcode ? `${mainAddress} - ${address.zipcode}` : mainAddress;
//   };

//   const formatGender = (gender) => {
//     if (gender === '1') return 'Male';
//     if (gender === '2') return 'Female';
//     return gender;
//   };

//   return (
//     <>
//       {/* --- PART 1: CONTENT FOR THE FIRST PAGE --- */}
//       <Box ref={ref} sx={{ p: 3 }}>
//         <Box display="flex" alignItems="center" justifyContent="space-between" mb={4}>
//           <Box display="flex" alignItems="center">
//             <Avatar src={employee_info?.profile_photo} sx={{ width: 80, height: 80, mr: 3 }} />
//             <Box>
//               <Typography variant="h5" fontWeight="bold">
//                 {employee_info?.full_name}
//               </Typography>
//               <Typography variant="body1" color="text.secondary">
//                 Employee ID: {employee_info?.employee_id || 'N/A'}
//               </Typography>
//             </Box>
//           </Box>
//           <img src={vetrinaLogo} alt="Company Logo" style={{ height: '60px', width: 'auto' }} />
//         </Box>

//         <Section title="Employee Information">
//           <Grid container spacing={2}>
//               <DetailItem label="Department" value={employee_info?.department} />
//               <DetailItem label="Designation" value={employee_info?.designation} />
//               <DetailItem label="User ID" value={employee_info?.user_id} />
//               <DetailItem label="Division" value={employee_info?.division} />
//           </Grid>
//         </Section>
        
//         <Section title="Personal Details">
//           <Grid container spacing={2}>
//             <DetailItem label="Contact Number" value={personal_details?.contact_number} />
//             <DetailItem label="Email" value={personal_details?.email} />
//             <DetailItem label="Date of Birth" value={personal_details?.date_of_birth} />
//             <DetailItem label="Gender" value={formatGender(personal_details?.gender)} />
//             <DetailItem label="Marital Status" value={personal_details?.marital_status} />
//             <DetailItem label="Blood Group" value={personal_details?.blood_group} />
//             <DetailItem label="Aadhar No." value={personal_details?.aadhar_no} />
//             <DetailItem label="PAN No." value={personal_details?.pan_number} />
//             <DetailItem label="UAN No." value={personal_details?.uan_number} />
//             <DetailItem label="Address" value={formatAddress(personal_details?.address)} />
//           </Grid>
//         </Section>
        
//         <Section title="Emergency Contact">
//           <Grid container spacing={2}>
//             <DetailItem label="Name" value={emergency_contact?.name} />
//             <DetailItem label="Phone" value={emergency_contact?.phone} />
//             <DetailItem label="Email" value={emergency_contact?.email} />
//             <DetailItem label="Address" value={emergency_contact?.address} />
//           </Grid>
//         </Section>

//         <Section title="Work Details">
//           <Grid container spacing={2}>
//             <DetailItem label="Date of Joining" value={work_details?.date_of_joining} />
//             <DetailItem label="Date of Leaving" value={work_details?.date_of_leaving} />
//             <DetailItem label="Status" value={work_details?.employee_status} />
//           </Grid>
//         </Section>
//       </Box>

//       {/* --- PART 2: CONTENT FOR THE SECOND PAGE --- */}
//       <Box ref={secondPartRef} sx={{ p: 3 }}>
//         <Box sx={{ mt: 5 }} />

//         <Section title="Compensation Details">
//           <Grid container spacing={2}>
//               <DetailItem label="Basic Salary" value={compensation_details?.basic_salary} />
//               <DetailItem label="Gross Salary" value={compensation_details?.gross_salary} />
//               <DetailItem label="Monthly CTC" value={compensation_details?.ctc_monthly} />
//               <DetailItem label="Yearly CTC" value={compensation_details?.ctc_yearly} />
//           </Grid>
//         </Section>
        
//         <Section title="Bank Details">
//           <Grid container spacing={2}>
//               <DetailItem label="Account Title" value={bank_details?.account_title} />
//               <DetailItem label="Account Number" value={bank_details?.account_number} />
//               <DetailItem label="Bank Name" value={bank_details?.bank_name} />
//               <DetailItem label="IFSC Code" value={bank_details?.ifsc_code} />
//               <DetailItem label="Swift Code" value={bank_details?.swift_code} />
//               <DetailItem label="Bank Branch" value={bank_details?.bank_branch} />
//           </Grid>
//         </Section>

//         <Section title="Employee Journey">
//           <Grid container spacing={2}>
//               <DetailItem label="Date of Joining" value={employee_journey?.date_of_joining} />
//               <DetailItem label="Department" value={employee_journey?.department} />
//               <DetailItem label="Designation" value={employee_journey?.designation} />
//               <DetailItem label="Division" value={employee_journey?.division} />
//               <DetailItem label="Sub Division" value={employee_journey?.sub_division} />
//               <DetailItem label="Head Quarter" value={employee_journey?.head_quarter} />
//               <DetailItem label="Level" value={employee_journey?.level} />
//               <DetailItem label="Compensation" value={employee_journey?.compensation} />
//               <DetailItem label="Duration" value={employee_journey?.duration} />
//           </Grid>
//         </Section>

//         {(!assets || assets.length === 0) && (
//           <Section title="Assigned Assets">
//             <Typography variant="body1" sx={{ pl: 1, color: '#000' }}>
//               Assets Not Allocated
//             </Typography>
//           </Section>
//         )}
//       </Box>
      
//       {/* --- PART 3: CONTENT FOR THE THIRD PAGE (only if assets exist) --- */}
//       {assets && assets.length > 0 && (
//         <Box ref={thirdPartRef} sx={{ p: 3 }}>
//            <Box sx={{ mt: 5 }} />
//             <Section title="Assigned Assets">
//               <TableContainer component={Paper} sx={{ border: '1px solid rgba(224, 224, 224, 1)' }}>
//                 <Table size="small">
//                   <TableHead>
//                     <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
//                       <TableCell sx={{ fontWeight: 'bold', border: '1px solid rgba(224, 224, 224, 1)', color: 'text.secondary' }}>Sr. No.</TableCell>
//                       <TableCell sx={{ fontWeight: 'bold', border: '1px solid rgba(224, 224, 224, 1)', color: 'text.secondary' }}>Asset Name</TableCell>
//                       <TableCell sx={{ fontWeight: 'bold', border: '1px solid rgba(224, 224, 224, 1)', color: 'text.secondary' }}>Category</TableCell>
//                       <TableCell sx={{ fontWeight: 'bold', border: '1px solid rgba(224, 224, 224, 1)', color: 'text.secondary' }}>Brand</TableCell>
//                       <TableCell sx={{ fontWeight: 'bold', border: '1px solid rgba(224, 224, 224, 1)', color: 'text.secondary' }}>Manufacturer</TableCell>
//                       <TableCell sx={{ fontWeight: 'bold', border: '1px solid rgba(224, 224, 224, 1)', color: 'text.secondary' }}>Serial Number</TableCell>
//                     </TableRow>
//                   </TableHead>
//                   <TableBody>
//                     {assets.map((asset, index) => (
//                       <TableRow key={index}>
//                         <TableCell sx={{ border: '1px solid rgba(224, 224, 224, 1)', color: '#000' }}>{index + 1}</TableCell>
//                         <TableCell sx={{ border: '1px solid rgba(224, 224, 224, 1)', color: '#000' }}>{asset.assets_name || 'N/A'}</TableCell>
//                         <TableCell sx={{ border: '1px solid rgba(224, 224, 224, 1)', color: '#000' }}>{asset.category_name || 'N/A'}</TableCell>
//                         <TableCell sx={{ border: '1px solid rgba(224, 224, 224, 1)', color: '#000' }}>{asset.brand_name || 'N/A'}</TableCell>
//                         <TableCell sx={{ border: '1px solid rgba(224, 224, 224, 1)', color: '#000' }}>{asset.manufacturer || 'N/A'}</TableCell>
//                         <TableCell sx={{ border: '1px solid rgba(224, 224, 224, 1)', color: '#000' }}>{asset.serial_number || 'N/A'}</TableCell>
//                       </TableRow>
//                     ))}
//                   </TableBody>
//                 </Table>
//               </TableContainer>
//             </Section>
//         </Box>
//       )}
//     </>
//   );
// });


// const EmployeeDetail = () => {
//   const [selectedItem, setSelectedItem] = useState('Details');
//   const [employeeData, setEmployeeData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
  
//   const [openPrintDialog, setOpenPrintDialog] = useState(false);
//   const [printableData, setPrintableData] = useState(null);
//   const [isPrintableLoading, setIsPrintableLoading] = useState(false);

//   const printContentRef = useRef(null);
//   const printContentPart2Ref = useRef(null);
//   const printContentPart3Ref = useRef(null);

//   const { setEmployeeId } = useContext(EmployeeContext);
//   const { id } = useParams();

//   useEffect(() => {
//     if (id) {
//       setEmployeeId(id);
//     }
//   }, [id, setEmployeeId]);

//   useEffect(() => {
//     if (!id) {
//         setLoading(false);
//         setError("No employee ID provided in the URL.");
//         return;
//     }
//     setLoading(true);
//     setError(null);
//     axiosInstance.get(`api/edit_employee/${id}/`)
//       .then(res => {
//         if (res.data?.data?.length) {
//           setEmployeeData(res.data.data[0]);
//         } else {
//           setError("Employee not found.");
//         }
//       })
//       .catch(err => {
//         console.error("Error fetching employee data:", err);
//         setError("Failed to load employee data.");
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   }, [id]);

//   const handleOpenPrintDialog = () => {
//     if (!id) {
//         alert("Employee user ID is not available to fetch details.");
//         return;
//     }
//     setIsPrintableLoading(true);
//     setOpenPrintDialog(true);
//     axiosInstance.get(`api/employee/${id}/`)
//       .then(res => {
//         setPrintableData(res.data);
//       })
//       .catch(err => {
//         console.error("Error fetching printable employee data:", err);
//         alert("Failed to load printable details.");
//         setOpenPrintDialog(false);
//       })
//       .finally(() => {
//         setIsPrintableLoading(false);
//       });
//   };

//   const handleDownloadPdf = async () => {
//     const part1 = printContentRef.current;
//     const part2 = printContentPart2Ref.current;
//     const part3 = printContentPart3Ref.current;
//     if (!part1 || !part2) return;
  
//     const pdf = new jsPDF({
//       orientation: 'portrait',
//       unit: 'mm',
//       format: 'a4'
//     });
  
//     const canvas1 = await html2canvas(part1, { scale: 2, useCORS: true });
//     const imgData1 = canvas1.toDataURL('image/png');
//     const imgProps1 = pdf.getImageProperties(imgData1);
//     const pdfWidth = pdf.internal.pageSize.getWidth();
//     const pdfHeight1 = (imgProps1.height * pdfWidth) / imgProps1.width;
//     pdf.addImage(imgData1, 'PNG', 0, 0, pdfWidth, pdfHeight1);
  
//     const canvas2 = await html2canvas(part2, { scale: 2, useCORS: true });
//     const imgData2 = canvas2.toDataURL('image/png');
//     const imgProps2 = pdf.getImageProperties(imgData2);
//     const pdfHeight2 = (imgProps2.height * pdfWidth) / imgProps2.width;
//     pdf.addPage();
//     pdf.addImage(imgData2, 'PNG', 0, 0, pdfWidth, pdfHeight2);
  
//     if (printableData?.assets && printableData.assets.length > 0 && part3) {
//       const canvas3 = await html2canvas(part3, { scale: 2, useCORS: true });
//       const imgData3 = canvas3.toDataURL('image/png');
//       const imgProps3 = pdf.getImageProperties(imgData3);
//       const pdfHeight3 = (imgProps3.height * pdfWidth) / imgProps3.width;
//       pdf.addPage();
//       pdf.addImage(imgData3, 'PNG', 0, 0, pdfWidth, pdfHeight3);
//     }
  
//     pdf.save(`${employeeData?.emp_name || 'employee'}-details.pdf`);
//   };

//   if (loading) {
//     return <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress /></Box>;
//   }

//   if (error) {
//     return <Alert severity="error" sx={{ m: 2 }}>{error}</Alert>;
//   }

//   return (
//     <>
//       <Box sx={{ flexGrow: 1, p: 2 }}>
//         <Grid container spacing={2}>
//           <Grid item xs={12} md={4}>
//             <Paper elevation={3} sx={{ p: 2 }}>
//               <Box display="flex" alignItems="center" mb={2}>
//                 <Avatar
//                   src={employeeData?.profile_photo}
//                   alt={employeeData?.emp_name}
//                   sx={{ width: 56, height: 56, mr: 2 }}
//                 >
//                   {getInitials(employeeData?.emp_name)}
//                 </Avatar>
//                 <Box>
//                   <Typography variant="subtitle1" fontWeight="bold">
//                     {employeeData?.emp_name || "Employee Name"}
//                   </Typography>
//                   <Typography variant="body2" color="textSecondary">
//                     {employeeData?.designation || "Designation"}
//                   </Typography>
//                 </Box>
//               </Box>
            
//               <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', mb: 2 }}>
//                 <Box display="flex" alignItems="center">
//                   <SupervisorAccount sx={{ mr: 1, color: 'text.secondary' }} />
//                   <Typography>Manager: {employeeData?.manager || "N/A"}</Typography>
//                 </Box>
//                 <Button 
//                   variant="contained" 
//                   onClick={handleOpenPrintDialog}
//                   sx={{ 
//                     mt: 1.5, 
//                     backgroundColor: '#673AB7', 
//                     '&:hover': { backgroundColor: '#512DA8' } 
//                   }}
//                 >
//                   View Detail
//                 </Button>
//               </Box>

//               <List>
//                 {sidebarItems.map((item, index) => (
//                   <ListItem
//                     key={index}
//                     button
//                     selected={selectedItem === item.text}
//                     onClick={() => setSelectedItem(item.text)}
//                   >
//                     <ListItemIcon>{item.icon}</ListItemIcon>
//                     <ListItemText
//                       primary={item.text}
//                       primaryTypographyProps={{ fontSize: '14px' }}
//                     />
//                   </ListItem>
//                 ))}
//               </List>
//             </Paper>
//           </Grid>

//           <Grid item xs={12} md={8}>
//             <Paper elevation={3} sx={{ p: 2 }}>
//               {componentMap[selectedItem]}
//             </Paper>
//           </Grid>
//         </Grid>
//       </Box>

//       <Dialog 
//         open={openPrintDialog} 
//         onClose={() => setOpenPrintDialog(false)} 
//         fullWidth 
//         maxWidth="md"
//       >
//         <DialogTitle>
//           Employee Details
//           <IconButton
//             onClick={() => setOpenPrintDialog(false)}
//             sx={{ position: 'absolute', right: 8, top: 8 }}
//           >
//             <CloseIcon />
//           </IconButton>
//         </DialogTitle>
//         <DialogContent dividers>
//           {isPrintableLoading ? (
//             <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}>
//               <CircularProgress />
//             </Box>
//           ) : (
//             <PrintableView 
//               ref={printContentRef} 
//               secondPartRef={printContentPart2Ref} 
//               thirdPartRef={printContentPart3Ref} 
//               data={printableData} 
//             />
//           )}
//         </DialogContent>
//         <DialogActions>
//           <Button
//             onClick={handleDownloadPdf}
//             variant="contained"
//             startIcon={<DownloadIcon />}
//             disabled={isPrintableLoading}
//             sx={{
//               backgroundColor: "#9c27b0",
//               "&:hover": { backgroundColor: "#7b1fa2" }
//             }}
//           >
//             Download PDF
//           </Button>
//           <Button
//             onClick={() => setOpenPrintDialog(false)}
//             variant="contained"
//             sx={{
//               backgroundColor: "#f44336",
//               "&:hover": { backgroundColor: "#d32f2f" }
//             }}
//           >
//             Close
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </>
//   );
// };
 
// export default EmployeeDetail;
// import React, { useState, useEffect, useContext, useRef } from 'react';
// import { EmployeeContext } from './EmployeeContext';
// import axiosInstance from "../../utils/axiosInstance"; 
// import {
//   Box, Grid, Paper, Typography, Avatar, List, ListItem,
//   ListItemIcon, ListItemText, CircularProgress, Alert, IconButton,
//   Dialog, DialogTitle, DialogContent, DialogActions, Button, Tooltip,
//   TableContainer, Table, TableHead, TableRow, TableCell, TableBody
// } from '@mui/material';
// import { useParams } from 'react-router-dom';
// import {
//   Lock, Info, AccountBox, Image, AccountBalance,
//   Description, SupervisorAccount, Print as PrintIcon,
//   Close as CloseIcon, Download as DownloadIcon, Group as GroupIcon
// } from '@mui/icons-material';

// // --- PDF Generation Libraries ---
// import jsPDF from 'jspdf';
// import html2canvas from 'html2canvas';

// // --- Child Component Imports ---
// import Contract from './Contract';
// import BasicInformation from './BasicInformation';
// import PersonalInformation from './PersonalInformation';
// import ProfilePicture from './ProfilePicture';
// import AccountInformation from './AccountInformation';
// import Documents from './Documents';
// import FamilyDetails from './FamilyDetails';

// // --- Logo Import ---
// import vetrinaLogo from '../../Assests/vetrinalogo.jpg';

// const componentMap = {
//   'Details': <Contract />,
//   'Basic Information': <BasicInformation />,
//   'Personal Information': <PersonalInformation />,
//   'Profile Picture': <ProfilePicture />,
//   'Account Information': <AccountInformation />,
//   'Documents': <Documents />,
//   'Family Details': <FamilyDetails />,
// };
  
// const sidebarItems = [
//   { icon: <Lock />, text: 'Details' },
//   { icon: <Info />, text: 'Basic Information' },
//   { icon: <AccountBox />, text: 'Personal Information' },
//   { icon: <Image />, text: 'Profile Picture' },
//   { icon: <AccountBalance />, text: 'Account Information' },
//   { icon: <Description />, text: 'Documents' },
//   { icon: <GroupIcon />, text: 'Family Details' },
// ];

// const getInitials = (name = "") => {
//   const nameParts = name.split(' ').filter(Boolean);
//   if (nameParts.length === 0) return '...';
//   if (nameParts.length === 1) return nameParts[0][0].toUpperCase();
//   return (nameParts[0][0] + nameParts[nameParts.length - 1][0]).toUpperCase();
// };

// // ======================= START: UPDATED PRINTABLE VIEW COMPONENT =======================
// const PrintableView = React.forwardRef(({ data, pageRefs }, ref) => {
//   if (!data) return null;

//   const {
//     employee_info, personal_details, nearest_police_station, emergency_contact,
//     work_details, compensation_details, bank_details,
//     assets, employee_journey, rewards, salary_history // Added rewards and salary_history
//   } = data;

//   const Section = ({ title, children }) => (
//     <Box mb={3}>
//       <Typography variant="h6" gutterBottom sx={{ 
//         borderBottom: 1, 
//         borderColor: 'divider', 
//         pb: 1, mb: 2, 
//         color: '#673AB7' // Vibrant purple for section titles
//       }}>
//         {title}
//       </Typography>
//       {children}
//     </Box>
//   );

//   const DetailItem = ({ label, value }) => (
//     <Grid item xs={12} sm={6}>
//       <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 'bold' }}> {/* Faint Grey Label */}
//         {label}
//       </Typography>
//       <Typography variant="body1" sx={{ pl: 1, color: '#000' }}> {/* Dark Black Value */}
//         {value || 'N/A'}
//       </Typography>
//     </Grid>
//   );

//   const formatPermanentAddress = (address) => {
//     if (!address) return 'N/A';
//     const parts = [
//       address.address_1,
//       address.city,
//       address.state,
//       address.country
//     ].filter(Boolean);
//     if (parts.length === 0) return 'N/A';
//     const mainAddress = parts.join(', ');
//     return address.zipcode ? `${mainAddress} - ${address.zipcode}` : mainAddress;
//   };

//   const formatCorrespondenceAddress = (address) => {
//     if (!address) return 'N/A';
//     const parts = [
//       address.address_2,
//       address.city,
//       address.state,
//       address.country,
//       address.zipcode // Added zipcode to the parts list
//     ].filter(Boolean);
//     return parts.join(', ') || 'N/A';
//   };

//   const formatGender = (gender) => {
//     if (gender === '1') return 'Male';
//     if (gender === '2') return 'Female';
//     return gender || 'N/A';
//   };

//   const PageWrapper = ({ children, innerRef }) => (
//     <Box ref={innerRef} sx={{ p: 3, pt: 5, pb: 5,  position: 'relative', pageBreakAfter: 'always' }}>
//       {children}
//     </Box>
//   );

//   return (
//   <>
//   {/* --- PAGE 1 --- */}
//   <PageWrapper innerRef={pageRefs.page1}>
//     <Box display="flex" alignItems="center" justifyContent="space-between" mb={4}>
//       <Box display="flex" alignItems="center">
//         <Avatar src={employee_info?.profile_photo} sx={{ width: 80, height: 80, mr: 3 }} />
//         <Box>
//           <Typography variant="h5" fontWeight="bold">
//             {employee_info?.full_name || 'N/A'}
//           </Typography>
//           <Typography variant="body1" color="text.secondary">
//             Employee ID: {employee_info?.employee_id || 'N/A'}
//           </Typography>
//         </Box>
//       </Box>
//       <img src={vetrinaLogo} alt="Company Logo" style={{ height: '60px', width: 'auto' }} />
//     </Box>

//     <Section title="Employee Information">
//       <Grid container spacing={2}>
//         <DetailItem label="Department" value={employee_info?.department} />
//         <DetailItem label="Designation" value={employee_info?.designation} />
//         {/* <DetailItem label="User ID" value={employee_info?.user_id} />  // REMOVED as per request */}
//         <DetailItem label="Division" value={employee_info?.division} />
//         <DetailItem label="Sub Division" value={employee_info?.sub_division} />
//         <DetailItem label="Head Quarter" value={employee_info?.head_quarter} />
//       </Grid>
//     </Section>

//     <Section title="Personal Details">
//       <Grid container spacing={2}>
//         <DetailItem label="Contact Number" value={personal_details?.contact_number} />
//         <DetailItem label="Email" value={personal_details?.email} />
//         <DetailItem label="Date of Birth" value={personal_details?.date_of_birth} />
//         <DetailItem label="Age" value={personal_details?.age} />
//         <DetailItem label="Gender" value={formatGender(personal_details?.gender)} />
//         <DetailItem label="Marital Status" value={personal_details?.marital_status} />
//         <DetailItem label="Blood Group" value={personal_details?.blood_group} />
//         <DetailItem label="Aadhar No." value={personal_details?.aadhar_no} />
//         <DetailItem label="PAN No." value={personal_details?.pan_number} />
//         <DetailItem label="UAN No." value={personal_details?.uan_number} />
//         <DetailItem label="Passport No." value={personal_details?.passport_no} />
//         <DetailItem label="Vehicle No." value={personal_details?.vehicle_no} />
//         <DetailItem label="Driving Licence No." value={personal_details?.driving_licence_no} />
//         <DetailItem label="Permanent Address" value={formatPermanentAddress(personal_details?.permanent_address)} />
//         <DetailItem label="Correspondence Address" value={formatCorrespondenceAddress(personal_details?.correspondence_address)} />
//       </Grid>
//     </Section>
//   </PageWrapper>

//   {/* --- PAGE 2 --- */}
//   <PageWrapper innerRef={pageRefs.page2}>
//     <Section title="Nearest Police Station">
//       <Grid container spacing={2}>
//         <DetailItem label="Address" value={nearest_police_station?.address} />
//         <DetailItem label="Country" value={nearest_police_station?.country} />
//         <DetailItem label="State" value={nearest_police_station?.state} />
//         <DetailItem label="District" value={nearest_police_station?.district} />
//         <DetailItem label="Tehsil" value={nearest_police_station?.tehsil} />
//         <DetailItem label="Village" value={nearest_police_station?.village} />
//         <DetailItem label="Pincode" value={nearest_police_station?.pincode} />
//       </Grid>
//     </Section>

//     <Section title="Emergency Contact">
//       <Grid container spacing={2}>
//         <DetailItem label="Name" value={emergency_contact?.name} />
//         <DetailItem label="Phone" value={emergency_contact?.phone} />
//         <DetailItem label="Email" value={emergency_contact?.email} />
//         <DetailItem label="Address" value={emergency_contact?.address} />
//       </Grid>
//     </Section>
//       <Section title="Work Details">
//       <Grid container spacing={2}>
//         <DetailItem label="Date of Joining" value={work_details?.date_of_joining} />
//         <DetailItem label="Date of Leaving" value={work_details?.date_of_leaving} />
//         <DetailItem label="Date of Promotion" value={work_details?.date_of_promotion} />
//         <DetailItem label="Status" value={work_details?.employee_status} />
//       </Grid>
//     </Section>

//     <Section title="Compensation Details">
//       <Grid container spacing={2}>
//         <DetailItem label="Current Salary" value={compensation_details?.current_salary} />
//         <DetailItem label="Current CTC" value={compensation_details?.current_ctc} />
//         <DetailItem label="Joining Salary" value={compensation_details?.joining_salary} />
//         <DetailItem label="Joining CTC" value={compensation_details?.joining_ctc} />
//       </Grid>
//     </Section>

//     <Section title="Bank Details">
//       <Grid container spacing={2}>
//         <DetailItem label="Account Title" value={bank_details?.account_title} />
//         <DetailItem label="Account Number" value={bank_details?.account_number} />
//         <DetailItem label="Bank Name" value={bank_details?.bank_name} />
//         <DetailItem label="IFSC Code" value={bank_details?.ifsc_code} />
//         <DetailItem label="Swift Code" value={bank_details?.swift_code} />
//         <DetailItem label="Bank Branch" value={bank_details?.bank_branch} />
//       </Grid>
//     </Section>
//   </PageWrapper>

// {/* --- PAGE 3 --- */}
// <PageWrapper innerRef={pageRefs.page3}>
//   <Section title="Employee Journey">
//     <Grid container spacing={2}>
//       <DetailItem label="Date of Joining" value={employee_journey?.date_of_joining} />
//       <DetailItem label="Department" value={employee_journey?.department} />
//       <DetailItem label="Designation" value={employee_journey?.designation} />
//       <DetailItem label="Division" value={employee_journey?.division} />
//       <DetailItem label="Sub Division" value={employee_journey?.sub_division} />
//       <DetailItem label="Head Quarter" value={employee_journey?.head_quarter} />
//       <DetailItem label="Level" value={employee_journey?.level} />
//       <DetailItem label="Compensation" value={employee_journey?.compensation} />
//       <DetailItem label="Duration" value={employee_journey?.duration} />
//     </Grid>
//   </Section>

//   {!assets || assets.length === 0 ? (
//     <Section title="Assigned Assets">
//       <Typography variant="body1" sx={{ pl: 1, color: "#000" }}>
//         Assets Not Allocated
//       </Typography>
//     </Section>
//   ) : null}
// </PageWrapper>

// {/* --- PAGE 4 --- Only if assets exist --- */}
// {assets && assets.length > 0 && (
//   <PageWrapper innerRef={pageRefs.page4}>
//     <Section title="Assigned Assets">
//       <TableContainer component={Paper} sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}>
//         <Table size="small">
//           <TableHead>
//             <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
//               <TableCell sx={{ fontWeight: "bold", border: "1px solid rgba(224, 224, 224, 1)", color: "text.secondary" }}>Sr. No.</TableCell>
//               <TableCell sx={{ fontWeight: "bold", border: "1px solid rgba(224, 224, 224, 1)", color: "text.secondary" }}>Asset Name</TableCell>
//               <TableCell sx={{ fontWeight: "bold", border: "1px solid rgba(224, 224, 224, 1)", color: "text.secondary" }}>Category</TableCell>
//               <TableCell sx={{ fontWeight: "bold", border: "1px solid rgba(224, 224, 224, 1)", color: "text.secondary" }}>Brand</TableCell>
//               <TableCell sx={{ fontWeight: "bold", border: "1px solid rgba(224, 224, 224, 1)", color: "text.secondary" }}>Manufacturer</TableCell>
//               <TableCell sx={{ fontWeight: "bold", border: "1px solid rgba(224, 224, 224, 1)", color: "text.secondary" }}>Serial Number</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {assets.map((asset, index) => (
//               <TableRow key={index}>
//                 <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)", color: "#000" }}>{index + 1}</TableCell>
//                 <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)", color: "#000" }}>{asset.assets_name || "N/A"}</TableCell>
//                 <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)", color: "#000" }}>{asset.category_name || "N/A"}</TableCell>
//                 <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)", color: "#000" }}>{asset.brand_name || "N/A"}</TableCell>
//                 <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)", color: "#000" }}>{asset.manufacturer || "N/A"}</TableCell>
//                 <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)", color: "#000" }}>{asset.serial_number || "N/A"}</TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </Section>
//   </PageWrapper>
// )}

// {/* --- PAGE 5 --- REWARDS & SALARY --- */}
// <PageWrapper innerRef={pageRefs.page5}>
//   <Section title="Reward & Recognition">
//     {rewards && rewards.length > 0 ? (
//       <TableContainer component={Paper} sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}>
//         <Table size="small">
//           <TableHead>
//             <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
//               <TableCell sx={{ fontWeight: "bold", border: "1px solid rgba(224, 224, 224, 1)", color: "text.secondary" }}>Sr No.</TableCell>
//               <TableCell sx={{ fontWeight: "bold", border: "1px solid rgba(224, 224, 224, 1)", color: "text.secondary" }}>Name of Reward</TableCell>
//               <TableCell sx={{ fontWeight: "bold", border: "1px solid rgba(224, 224, 224, 1)", color: "text.secondary" }}>Year (Financial Year)</TableCell>
//               <TableCell sx={{ fontWeight: "bold", border: "1px solid rgba(224, 224, 224, 1)", color: "text.secondary" }}>Date (DD/MM/YYYY)</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {rewards.map((reward, index) => (
//               <TableRow key={index}>
//                 <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)", color: "#000" }}>{index + 1}</TableCell>
//                 <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)", color: "#000" }}>{reward.name || "N/A"}</TableCell>
//                 <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)", color: "#000" }}>{reward.financial_year || "N/A"}</TableCell>
//                 <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)", color: "#000" }}>{reward.date || "N/A"}</TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     ) : (
//       <Typography variant="body1" sx={{ pl: 1, color: "#000" }}>
//         No Rewards Information Available
//       </Typography>
//     )}
//   </Section>

//   <Section title="Salary Details">
//     {salary_history && salary_history.length > 0 ? (
//       <TableContainer component={Paper} sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}>
//         <Table size="small">
//           <TableHead>
//             <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
//               <TableCell sx={{ fontWeight: "bold", border: "1px solid rgba(224, 224, 224, 1)", color: "text.secondary" }}>Sr No.</TableCell>
//               <TableCell sx={{ fontWeight: "bold", border: "1px solid rgba(224, 224, 224, 1)", color: "text.secondary" }}>Designation</TableCell>
//               <TableCell sx={{ fontWeight: "bold", border: "1px solid rgba(224, 224, 224, 1)", color: "text.secondary" }}>Level</TableCell>
//               <TableCell sx={{ fontWeight: "bold", border: "1px solid rgba(224, 224, 224, 1)", color: "text.secondary" }}>Financial Year</TableCell>
//               <TableCell sx={{ fontWeight: "bold", border: "1px solid rgba(224, 224, 224, 1)", color: "text.secondary" }}>W.E.F</TableCell>
//               <TableCell sx={{ fontWeight: "bold", border: "1px solid rgba(224, 224, 224, 1)", color: "text.secondary" }}>Basic + DA</TableCell>
//               <TableCell sx={{ fontWeight: "bold", border: "1px solid rgba(224, 224, 224, 1)", color: "text.secondary" }}>Gross Salary</TableCell>
//               <TableCell sx={{ fontWeight: "bold", border: "1px solid rgba(224, 224, 224, 1)", color: "text.secondary" }}>CTC</TableCell>
//               <TableCell sx={{ fontWeight: "bold", border: "1px solid rgba(224, 224, 224, 1)", color: "text.secondary" }}>View Salary slip</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {salary_history.map((salary, index) => (
//               <TableRow key={index}>
//                 <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)", color: "#000" }}>{index + 1}</TableCell>
//                 <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)", color: "#000" }}>{salary.designation || "N/A"}</TableCell>
//                 <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)", color: "#000" }}>{salary.level || "N/A"}</TableCell>
//                 <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)", color: "#000" }}>{salary.financial_year || "N/A"}</TableCell>
//                 <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)", color: "#000" }}>{salary.wef || "N/A"}</TableCell>
//                 <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)", color: "#000" }}>{salary.basic_da || "N/A"}</TableCell>
//                 <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)", color: "#000" }}>{salary.gross_salary || "N/A"}</TableCell>
//                 <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)", color: "#000" }}>{salary.ctc || "N/A"}</TableCell>
//                 <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)", color: "#000", textAlign: "center" }}>
//                   <Button size="small" variant="outlined">View</Button>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     ) : (
//       <Typography variant="body1" sx={{ pl: 1, color: "#000" }}>
//         No Salary History Available
//       </Typography>
//     )}
//   </Section>
// </PageWrapper>

// </>

//   );
// });


// const EmployeeDetail = () => {
//   const [selectedItem, setSelectedItem] = useState('Details');
//   const [employeeData, setEmployeeData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
  
//   const [openPrintDialog, setOpenPrintDialog] = useState(false);
//   const [printableData, setPrintableData] = useState(null);
//   const [isPrintableLoading, setIsPrintableLoading] = useState(false);

//   const page1Ref = useRef(null);
//   const page2Ref = useRef(null);
//   const page3Ref = useRef(null);
//   const page4Ref = useRef(null);
//   const page5Ref = useRef(null); // Ref for the new page

//   const pageRefs = {
//     page1: page1Ref,
//     page2: page2Ref,
//     page3: page3Ref,
//     page4: page4Ref,
//     page5: page5Ref, // Added ref for page 5
//   };

//   const { setEmployeeId } = useContext(EmployeeContext);
//   const { id } = useParams();

//   useEffect(() => {
//     if (id) {
//       setEmployeeId(id);
//     }
//   }, [id, setEmployeeId]);

//   useEffect(() => {
//     if (!id) {
//         setLoading(false);
//         setError("No employee ID provided in the URL.");
//         return;
//     }
//     setLoading(true);
//     setError(null);
//     axiosInstance.get(`api/edit_employee/${id}/`)
//       .then(res => {
//         if (res.data?.data?.length) {
//           setEmployeeData(res.data.data[0]);
//         } else {
//           setError("Employee not found.");
//         }
//       })
//       .catch(err => {
//         console.error("Error fetching employee data:", err);
//         setError("Failed to load employee data.");
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   }, [id]);

//   const handleOpenPrintDialog = () => {
//     if (!id) {
//         alert("Employee user ID is not available to fetch details.");
//         return;
//     }
//     setIsPrintableLoading(true);
//     setOpenPrintDialog(true);
//     axiosInstance.get(`api/employee/${id}/`)
//       .then(res => {
//         setPrintableData(res.data);
//       })
//       .catch(err => {
//         console.error("Error fetching printable employee data:", err);
//         alert("Failed to load printable details.");
//         setOpenPrintDialog(false);
//       })
//       .finally(() => {
//         setIsPrintableLoading(false);
//       });
//   };

// const handleDownloadPdf = async () => {
//   const pdf = new jsPDF({
//     orientation: 'portrait',
//     unit: 'mm',
//     format: 'a4'
//   });

//   const addPageContent = async (ref, pageNum) => {
//     if (ref.current) {
//       // Check if the ref's content is more than just a placeholder to avoid blank pages
//       const hasContent = ref.current.querySelector('h6'); // Checks for a Section title
//       if (!hasContent) return;

//       if (pageNum > 1) {
//         pdf.addPage();
//       }
//       const canvas = await html2canvas(ref.current, { 
//         scale: 2, 
//         useCORS: true,
//         logging: false 
//       });
//       const imgData = canvas.toDataURL('image/png');
//       const pdfWidth = pdf.internal.pageSize.getWidth();
//       const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

//       // Avoid adding a page that is too tall
//       const pageHeightLimit = pdf.internal.pageSize.getHeight();
//       pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, Math.min(pdfHeight, pageHeightLimit));
//     }
//   };
  
//   // Use a counter for actual pages added
//   let pagesAdded = 0;
  
//   const processPage = async (ref) => {
//     if (ref.current) {
//       const hasContent = ref.current.querySelector('h6'); // Check if the page has a section title
//       if (hasContent) {
//         pagesAdded++;
//         await addPageContent(ref, pagesAdded);
//       }
//     }
//   };

//   await processPage(pageRefs.page1);
//   await processPage(pageRefs.page2);
//   await processPage(pageRefs.page3);
//   await processPage(pageRefs.page4);
//   await processPage(pageRefs.page5); // Process the new page 5

//   pdf.save(`${employeeData?.emp_name || 'employee'}-details.pdf`);
// };


//   if (loading) {
//     return <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress /></Box>;
//   }

//   if (error) {
//     return <Alert severity="error" sx={{ m: 2 }}>{error}</Alert>;
//   }

//   return (
//     <>
//       <Box sx={{ flexGrow: 1, p: 2 }}>
//         <Grid container spacing={2}>
//           <Grid item xs={12} md={4}>
//             <Paper elevation={3} sx={{ p: 2 }}>
//               <Box display="flex" alignItems="center" mb={2}>
//                 <Avatar
//                   src={employeeData?.profile_photo}
//                   alt={employeeData?.emp_name}
//                   sx={{ width: 56, height: 56, mr: 2 }}
//                 >
//                   {getInitials(employeeData?.emp_name)}
//                 </Avatar>
//                 <Box>
//                   <Typography variant="subtitle1" fontWeight="bold">
//                     {employeeData?.emp_name || "Employee Name"}
//                   </Typography>
//                   <Typography variant="body2" color="textSecondary">
//                     {employeeData?.designation || "Designation"}
//                   </Typography>
//                 </Box>
//               </Box>
            
//               <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', mb: 2 }}>
//                 <Box display="flex" alignItems="center">
//                   <SupervisorAccount sx={{ mr: 1, color: 'text.secondary' }} />
//                   <Typography>Manager: {employeeData?.manager || "N/A"}</Typography>
//                 </Box>
//                 <Button 
//                   variant="contained" 
//                   onClick={handleOpenPrintDialog}
//                   sx={{ 
//                     mt: 1.5, 
//                     backgroundColor: '#673AB7', 
//                     '&:hover': { backgroundColor: '#512DA8' } 
//                   }}
//                 >
//                   View Detail
//                 </Button>
//               </Box>

//               <List>
//                 {sidebarItems.map((item, index) => (
//                   <ListItem
//                     key={index}
//                     button
//                     selected={selectedItem === item.text}
//                     onClick={() => setSelectedItem(item.text)}
//                   >
//                     <ListItemIcon>{item.icon}</ListItemIcon>
//                     <ListItemText
//                       primary={item.text}
//                       primaryTypographyProps={{ fontSize: '14px' }}
//                     />
//                   </ListItem>
//                 ))}
//               </List>
//             </Paper>
//           </Grid>

//           <Grid item xs={12} md={8}>
//             <Paper elevation={3} sx={{ p: 2 }}>
//               {componentMap[selectedItem]}
//             </Paper>
//           </Grid>
//         </Grid>
//       </Box>

//       <Dialog 
//         open={openPrintDialog} 
//         onClose={() => setOpenPrintDialog(false)} 
//         fullWidth 
//         maxWidth="md"
//       >
//         <DialogTitle>
//           Employee Details
//           <IconButton
//             onClick={() => setOpenPrintDialog(false)}
//             sx={{ position: 'absolute', right: 8, top: 8 }}
//           >
//             <CloseIcon />
//           </IconButton>
//         </DialogTitle>
//         <DialogContent dividers>
//           {isPrintableLoading ? (
//             <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}>
//               <CircularProgress />
//             </Box>
//           ) : (
//             <PrintableView 
//               pageRefs={pageRefs} 
//               data={printableData} 
//             />
//           )}
//         </DialogContent>
//         <DialogActions>
//           <Button
//             onClick={handleDownloadPdf}
//             variant="contained"
//             startIcon={<DownloadIcon />}
//             disabled={isPrintableLoading}
//             sx={{
//               backgroundColor: "#9c27b0",
//               "&:hover": { backgroundColor: "#7b1fa2" }
//             }}
//           >
//             Download PDF
//           </Button>
//           <Button
//             onClick={() => setOpenPrintDialog(false)}
//             variant="contained"
//             sx={{
//               backgroundColor: "#f44336",
//               "&:hover": { backgroundColor: "#d32f2f" }
//             }}
//           >
//             Close
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </>
//   );
// };
 
// export default EmployeeDetail;


// import React, { useState, useEffect, useContext, useRef } from 'react';
// import { EmployeeContext } from './EmployeeContext';
// import axiosInstance from "../../utils/axiosInstance"; 
// import {
//   Box, Grid, Paper, Typography, Avatar, List, ListItem,
//   ListItemIcon, ListItemText, CircularProgress, Alert, IconButton,
//   Dialog, DialogTitle, DialogContent, DialogActions, Button, Tooltip,
//   TableContainer, Table, TableHead, TableRow, TableCell, TableBody
// } from '@mui/material';
// import { useParams } from 'react-router-dom';
// import {
//   Lock, Info, AccountBox, Image, AccountBalance,
//   Description, SupervisorAccount, Print as PrintIcon,
//   Close as CloseIcon, Download as DownloadIcon, Group as GroupIcon
// } from '@mui/icons-material';

// // --- PDF Generation Libraries ---
// import jsPDF from 'jspdf';
// import html2canvas from 'html2canvas';

// // --- Child Component Imports ---
// import Contract from './Contract';
// import BasicInformation from './BasicInformation';
// import PersonalInformation from './PersonalInformation';
// import ProfilePicture from './ProfilePicture';
// import AccountInformation from './AccountInformation';
// import Documents from './Documents';
// import FamilyDetails from './FamilyDetails';

// // --- Logo Import ---
// import vetrinaLogo from '../../Assests/vetrinalogo.jpg';

// const componentMap = {
//   'Details': <Contract />,
//   'Basic Information': <BasicInformation />,
//   'Personal Information': <PersonalInformation />,
//   'Profile Picture': <ProfilePicture />,
//   'Account Information': <AccountInformation />,
//   'Documents': <Documents />,
//   'Family Details': <FamilyDetails />,
// };
  
// const sidebarItems = [
//   { icon: <Lock />, text: 'Details' },
//   { icon: <Info />, text: 'Basic Information' },
//   { icon: <AccountBox />, text: 'Personal Information' },
//   { icon: <Image />, text: 'Profile Picture' },
//   { icon: <AccountBalance />, text: 'Account Information' },
//   { icon: <Description />, text: 'Documents' },
//   { icon: <GroupIcon />, text: 'Family Details' },
// ];

// const getInitials = (name = "") => {
//   const nameParts = name.split(' ').filter(Boolean);
//   if (nameParts.length === 0) return '...';
//   if (nameParts.length === 1) return nameParts[0][0].toUpperCase();
//   return (nameParts[0][0] + nameParts[nameParts.length - 1][0]).toUpperCase();
// };

// // ======================= START: UPDATED PRINTABLE VIEW COMPONENT =======================
// const PrintableView = React.forwardRef(({ data, pageRefs }, ref) => {
//   if (!data) return null;

//   const {
//     employee_info, personal_details, nearest_police_station, emergency_contact,
//     work_details, compensation_details, bank_details,
//     assets, employee_journey, rewards, salary_history // Added rewards and salary_history
//   } = data;

//   const Section = ({ title, children }) => (
//     <Box mb={3}>
//       <Typography variant="h6" gutterBottom sx={{ 
//         borderBottom: 1, 
//         borderColor: 'divider', 
//         pb: 1, mb: 2, 
//         color: '#673AB7' // Vibrant purple for section titles
//       }}>
//         {title}
//       </Typography>
//       {children}
//     </Box>
//   );

//   const DetailItem = ({ label, value }) => (
//     <Grid item xs={12} sm={6}>
//       <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 'bold' }}> {/* Faint Grey Label */}
//         {label}
//       </Typography>
//       <Typography variant="body1" sx={{ pl: 1, color: '#000' }}> {/* Dark Black Value */}
//         {value || 'N/A'}
//       </Typography>
//     </Grid>
//   );

//   const formatPermanentAddress = (address) => {
//     if (!address) return 'N/A';
//     const parts = [
//       address.address_1,
//       address.city,
//       address.state,
//       address.country
//     ].filter(Boolean);
//     if (parts.length === 0) return 'N/A';
//     const mainAddress = parts.join(', ');
//     return address.zipcode ? `${mainAddress} - ${address.zipcode}` : mainAddress;
//   };

//   const formatCorrespondenceAddress = (address) => {
//     if (!address) return 'N/A';
//     const parts = [
//       address.address_2,
//       address.city,
//       address.state,
//       address.country,
//       address.zipcode // Added zipcode to the parts list
//     ].filter(Boolean);
//     return parts.join(', ') || 'N/A';
//   };

//   const formatGender = (gender) => {
//     if (gender === '1') return 'Male';
//     if (gender === '2') return 'Female';
//     return gender || 'N/A';
//   };

//   const PageWrapper = ({ children, innerRef }) => (
//     <Box ref={innerRef} sx={{ p: 3, pt: 5, pb: 5,  position: 'relative', pageBreakAfter: 'always' }}>
//       {children}
//     </Box>
//   );

//   // ✅ Helper to check if a row has at least one non-empty value
// const hasValidData = (row) => {
//   if (!row) return false;
//   return Object.values(row).some((val) => val !== null && val !== "" && val !== undefined);
// };

// // ✅ Custom component to handle conditional rendering & page fit
// const ConditionalTable = ({ title, data, columns, renderRow, message, pageRefs }) => {
//   const tableRef = React.useRef(null);
//   const [fitsOnPage, setFitsOnPage] = React.useState(true);

//   // Check height after render
//   React.useEffect(() => {
//     if (tableRef.current) {
//       const tableHeight = tableRef.current.offsetHeight;
//       const pageHeight = 1123; // A4 height in px (depends on your export system)
//       setFitsOnPage(tableHeight < pageHeight * 0.85); // 85% threshold
//     }
//   }, [data]);

//   // Filter data (remove empty rows)
//   const filteredData = (data || []).filter(hasValidData);

//   if (!filteredData.length) {
//     // No valid rows → show message only
//     return (
//       <Section title={title}>
//         <Typography variant="body1" sx={{ pl: 1, color: "#000" }}>
//           {message}
//         </Typography>
//       </Section>
//     );
//   }

//   // Decide where to render table (same page or next page)
//   const TableContent = (
//     <Section title={title}>
//       <TableContainer ref={tableRef} component={Paper} sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}>
//         <Table size="small">
//           <TableHead>
//             <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
//               {columns.map((col, i) => (
//                 <TableCell
//                   key={i}
//                   sx={{
//                     fontWeight: "bold",
//                     border: "1px solid rgba(224, 224, 224, 1)",
//                     color: "text.secondary",
//                   }}
//                 >
//                   {col}
//                 </TableCell>
//               ))}
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {filteredData.map((row, index) => renderRow(row, index))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </Section>
//   );

//   return fitsOnPage ? TableContent : <PageWrapper innerRef={pageRefs[title]}>{TableContent}</PageWrapper>;
// };


// return (
//   <>
//     {/* --- PAGE 1 --- */}
//     <PageWrapper innerRef={pageRefs.page1}>
//       <Box display="flex" alignItems="center" justifyContent="space-between" mb={4}>
//         <Box display="flex" alignItems="center">
//           <Avatar src={employee_info?.profile_photo} sx={{ width: 80, height: 80, mr: 3 }} />
//           <Box>
//             <Typography variant="h5" fontWeight="bold">
//               {employee_info?.full_name || 'N/A'}
//             </Typography>
//             <Typography variant="body1" color="text.secondary">
//               Employee ID: {employee_info?.employee_id || 'N/A'}
//             </Typography>
//           </Box>
//         </Box>
//         <img src={vetrinaLogo} alt="Company Logo" style={{ height: '60px', width: 'auto' }} />
//       </Box>

//       <Section title="Employee Information">
//         <Grid container spacing={2}>
//           <DetailItem label="Department" value={employee_info?.department} />
//           <DetailItem label="Designation" value={employee_info?.designation} />
//           <DetailItem label="Division" value={employee_info?.division} />
//           <DetailItem label="Sub Division" value={employee_info?.sub_division} />
//           <DetailItem label="Head Quarter" value={employee_info?.head_quarter} />
//         </Grid>
//       </Section>

//       <Section title="Personal Details">
//         <Grid container spacing={2}>
//           <DetailItem label="Contact Number" value={personal_details?.contact_number} />
//           <DetailItem label="Email" value={personal_details?.email} />
//           <DetailItem label="Date of Birth" value={personal_details?.date_of_birth} />
//           <DetailItem label="Age" value={personal_details?.age} />
//           <DetailItem label="Gender" value={formatGender(personal_details?.gender)} />
//           <DetailItem label="Marital Status" value={personal_details?.marital_status} />
//           <DetailItem label="Blood Group" value={personal_details?.blood_group} />
//           <DetailItem label="Aadhar No." value={personal_details?.aadhar_no} />
//           <DetailItem label="PAN No." value={personal_details?.pan_number} />
//           <DetailItem label="UAN No." value={personal_details?.uan_number} />
//           <DetailItem label="Passport No." value={personal_details?.passport_no} />
//           <DetailItem label="Vehicle No." value={personal_details?.vehicle_no} />
//           <DetailItem label="Driving Licence No." value={personal_details?.driving_licence_no} />
//         </Grid>
//       </Section>

//       {/* 🔹 Permanent Address */}
//       <Section title="Permanent Address">
//         <Grid container spacing={2}>
//           <DetailItem label="Address 1" value={personal_details?.permanent_address?.address_1} />
//           <DetailItem label="City" value={personal_details?.permanent_address?.city} />
//           <DetailItem label="State" value={personal_details?.permanent_address?.state} />
//           <DetailItem label="Country" value={personal_details?.permanent_address?.country} />
//           <DetailItem label="Zipcode" value={personal_details?.permanent_address?.zipcode} />
//         </Grid>
//       </Section>
//     </PageWrapper>

//     {/* --- PAGE 2 --- */}
//     <PageWrapper innerRef={pageRefs.page2}>
//       <Section title="Correspondence Address">
//         <Grid container spacing={2}>
//           <DetailItem label="Address 2" value={personal_details?.correspondence_address?.address_2} />
//           <DetailItem label="City" value={personal_details?.correspondence_address?.city} />
//           <DetailItem label="State" value={personal_details?.correspondence_address?.state} />
//           <DetailItem label="Country" value={personal_details?.correspondence_address?.country} />
//           <DetailItem label="Zipcode" value={personal_details?.correspondence_address?.zipcode} />
//         </Grid>
//       </Section>

//       <Section title="Nearest Police Station">
//         <Grid container spacing={2}>
//           <DetailItem label="Address" value={nearest_police_station?.address} />
//           <DetailItem label="Country" value={nearest_police_station?.country} />
//           <DetailItem label="State" value={nearest_police_station?.state} />
//           <DetailItem label="District" value={nearest_police_station?.district} />
//           <DetailItem label="Tehsil" value={nearest_police_station?.tehsil} />
//           <DetailItem label="Village" value={nearest_police_station?.village} />
//           <DetailItem label="Pincode" value={nearest_police_station?.pincode} />
//         </Grid>
//       </Section>

//       <Section title="Family Emergency Contact Details">
//         <Grid container spacing={2}>
//           <DetailItem label="Name" value={emergency_contact?.name} />
//           <DetailItem label="Contact No 1" value={emergency_contact?.phone} />
//           <DetailItem label="Contact No 2" value={emergency_contact?.phone2} />
//         </Grid>
//       </Section>

//       <Section title="Work Details">
//         <Grid container spacing={2}>
//           <DetailItem label="Date of Joining" value={work_details?.date_of_joining} />
//           <DetailItem label="Date of Promotion" value={work_details?.date_of_promotion} />
//           <DetailItem label="Status" value={work_details?.employee_status} />
//         </Grid>
//       </Section>

//       <Section title="Compensation Details">
//         <Grid container spacing={2}>
//           <DetailItem label="Gross Salary" value={compensation_details?.current_salary} />
//           <DetailItem label="Current CTC" value={compensation_details?.current_ctc} />
//           <DetailItem label="Joining Salary" value={compensation_details?.joining_salary} />
//           <DetailItem label="Joining CTC" value={compensation_details?.joining_ctc} />
//         </Grid>
//       </Section>
//     </PageWrapper>

//     {/* --- PAGE 3 --- */}
//     <PageWrapper innerRef={pageRefs.page3}>
//       <Section title="Bank Details">
//         <Grid container spacing={2}>
//           <DetailItem label="Account Title" value={bank_details?.account_title} />
//           <DetailItem label="Account Number" value={bank_details?.account_number} />
//           <DetailItem label="Bank Name" value={bank_details?.bank_name} />
//           <DetailItem label="IFSC Code" value={bank_details?.ifsc_code} />
//           <DetailItem label="Swift Code" value={bank_details?.swift_code} />
//           <DetailItem label="Bank Branch" value={bank_details?.bank_branch} />
//         </Grid>
//       </Section>

//       <Section title="Employee Journey">
//         <Grid container spacing={2}>
//           <DetailItem label="Date of Joining" value={employee_journey?.date_of_joining} />
//           <DetailItem label="Department" value={employee_journey?.department} />
//           <DetailItem label="Designation" value={employee_journey?.designation} />
//           <DetailItem label="Division" value={employee_journey?.division} />
//           <DetailItem label="Sub Division" value={employee_journey?.sub_division} />
//           <DetailItem label="Head Quarter" value={employee_journey?.head_quarter} />
//           <DetailItem label="Level" value={employee_journey?.level} />
//           <DetailItem label="Compensation" value={employee_journey?.compensation} />
//           <DetailItem label="Duration" value={employee_journey?.duration} />
//         </Grid>
//       </Section>

//       {/* 🔹 Assets Table with ConditionalTable */}
//       <ConditionalTable
//         title="Assigned Assets"
//         data={assets}
//         pageRefs={pageRefs}
//         message="Assets Not Allocated"
//         columns={["Sr. No.", "Asset Name", "Category", "Brand", "Manufacturer", "Serial Number"]}
//         renderRow={(asset, index) => (
//           <TableRow key={index}>
//             <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)", color: "#000" }}>{index + 1}</TableCell>
//             <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)", color: "#000" }}>{asset.assets_name || "N/A"}</TableCell>
//             <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)", color: "#000" }}>{asset.category_name || "N/A"}</TableCell>
//             <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)", color: "#000" }}>{asset.brand_name || "N/A"}</TableCell>
//             <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)", color: "#000" }}>{asset.manufacturer || "N/A"}</TableCell>
//             <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)", color: "#000" }}>{asset.serial_number || "N/A"}</TableCell>
//           </TableRow>
//         )}
//       />
//     </PageWrapper>

//     {/* --- PAGE 4 --- REWARDS & SALARY --- */}
//     <PageWrapper innerRef={pageRefs.page4}>
//       <ConditionalTable
//         title="Reward & Recognition"
//         data={rewards}
//         pageRefs={pageRefs}
//         message="No Rewards Information Available"
//         columns={["Sr No.", "Name of Reward", "Year (Financial Year)", "Date (DD/MM/YYYY)"]}
//         renderRow={(reward, index) => (
//           <TableRow key={index}>
//             <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)", color: "#000" }}>{index + 1}</TableCell>
//             <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)", color: "#000" }}>{reward.name || "N/A"}</TableCell>
//             <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)", color: "#000" }}>{reward.financial_year || "N/A"}</TableCell>
//             <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)", color: "#000" }}>{reward.date || "N/A"}</TableCell>
//           </TableRow>
//         )}
//       />

//       <ConditionalTable
//         title="Salary Details"
//         data={salary_history}
//         pageRefs={pageRefs}
//         message="No Salary History Available"
//         columns={[
//           "Sr No.",
//           "Designation",
//           "Level",
//           "Financial Year",
//           "W.E.F",
//           "Basic + DA",
//           "Gross Salary",
//           "CTC",
//           "View Salary slip",
//         ]}
//         renderRow={(salary, index) => (
//           <TableRow key={index}>
//             <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)", color: "#000" }}>{index + 1}</TableCell>
//             <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)", color: "#000" }}>{salary.designation || "N/A"}</TableCell>
//             <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)", color: "#000" }}>{salary.level || "N/A"}</TableCell>
//             <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)", color: "#000" }}>{salary.financial_year || "N/A"}</TableCell>
//             <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)", color: "#000" }}>{salary.wef || "N/A"}</TableCell>
//             <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)", color: "#000" }}>{salary.basic_da || "N/A"}</TableCell>
//             <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)", color: "#000" }}>{salary.gross_salary || "N/A"}</TableCell>
//             <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)", color: "#000" }}>{salary.ctc || "N/A"}</TableCell>
//             <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)", color: "#000", textAlign: "center" }}>
//               <Button size="small" variant="outlined">View</Button>
//             </TableCell>
//           </TableRow>
//         )}
//       />
//     </PageWrapper>
//   </>
// );

// });


// const EmployeeDetail = () => {
//   const [selectedItem, setSelectedItem] = useState('Details');
//   const [employeeData, setEmployeeData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
  
//   const [openPrintDialog, setOpenPrintDialog] = useState(false);
//   const [printableData, setPrintableData] = useState(null);
//   const [isPrintableLoading, setIsPrintableLoading] = useState(false);

//   const page1Ref = useRef(null);
//   const page2Ref = useRef(null);
//   const page3Ref = useRef(null);
//   const page4Ref = useRef(null);
//   const page5Ref = useRef(null); // Ref for the new page

//   const pageRefs = {
//     page1: page1Ref,
//     page2: page2Ref,
//     page3: page3Ref,
//     page4: page4Ref,
//     page5: page5Ref, // Added ref for page 5
//   };

//   const { setEmployeeId } = useContext(EmployeeContext);
//   const { id } = useParams();

//   useEffect(() => {
//     if (id) {
//       setEmployeeId(id);
//     }
//   }, [id, setEmployeeId]);

//   useEffect(() => {
//     if (!id) {
//         setLoading(false);
//         setError("No employee ID provided in the URL.");
//         return;
//     }
//     setLoading(true);
//     setError(null);
//     axiosInstance.get(`api/edit_employee/${id}/`)
//       .then(res => {
//         if (res.data?.data?.length) {
//           setEmployeeData(res.data.data[0]);
//         } else {
//           setError("Employee not found.");
//         }
//       })
//       .catch(err => {
//         console.error("Error fetching employee data:", err);
//         setError("Failed to load employee data.");
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   }, [id]);

//   const handleOpenPrintDialog = () => {
//     if (!id) {
//         alert("Employee user ID is not available to fetch details.");
//         return;
//     }
//     setIsPrintableLoading(true);
//     setOpenPrintDialog(true);
//     axiosInstance.get(`api/employee/${id}/`)
//       .then(res => {
//         setPrintableData(res.data);
//       })
//       .catch(err => {
//         console.error("Error fetching printable employee data:", err);
//         alert("Failed to load printable details.");
//         setOpenPrintDialog(false);
//       })
//       .finally(() => {
//         setIsPrintableLoading(false);
//       });
//   };

// const handleDownloadPdf = async () => {
//   const pdf = new jsPDF({
//     orientation: 'portrait',
//     unit: 'mm',
//     format: 'a4'
//   });

//   const addPageContent = async (ref, pageNum) => {
//     if (ref.current) {
//       // Check if the ref's content is more than just a placeholder to avoid blank pages
//       const hasContent = ref.current.querySelector('h6'); // Checks for a Section title
//       if (!hasContent) return;

//       if (pageNum > 1) {
//         pdf.addPage();
//       }
//       const canvas = await html2canvas(ref.current, { 
//         scale: 2, 
//         useCORS: true,
//         logging: false 
//       });
//       const imgData = canvas.toDataURL('image/png');
//       const pdfWidth = pdf.internal.pageSize.getWidth();
//       const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

//       // Avoid adding a page that is too tall
//       const pageHeightLimit = pdf.internal.pageSize.getHeight();
//       pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, Math.min(pdfHeight, pageHeightLimit));
//     }
//   };
  
//   // Use a counter for actual pages added
//   let pagesAdded = 0;
  
//   const processPage = async (ref) => {
//     if (ref.current) {
//       const hasContent = ref.current.querySelector('h6'); // Check if the page has a section title
//       if (hasContent) {
//         pagesAdded++;
//         await addPageContent(ref, pagesAdded);
//       }
//     }
//   };

//   await processPage(pageRefs.page1);
//   await processPage(pageRefs.page2);
//   await processPage(pageRefs.page3);
//   await processPage(pageRefs.page4);
//   await processPage(pageRefs.page5); // Process the new page 5

//   pdf.save(`${employeeData?.emp_name || 'employee'}-details.pdf`);
// };


//   if (loading) {
//     return <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress /></Box>;
//   }

//   if (error) {
//     return <Alert severity="error" sx={{ m: 2 }}>{error}</Alert>;
//   }

//   return (
//     <>
//       <Box sx={{ flexGrow: 1, p: 2 }}>
//         <Grid container spacing={2}>
//           <Grid item xs={12} md={4}>
//             <Paper elevation={3} sx={{ p: 2 }}>
//               <Box display="flex" alignItems="center" mb={2}>
//                 <Avatar
//                   src={employeeData?.profile_photo}
//                   alt={employeeData?.emp_name}
//                   sx={{ width: 56, height: 56, mr: 2 }}
//                 >
//                   {getInitials(employeeData?.emp_name)}
//                 </Avatar>
//                 <Box>
//                   <Typography variant="subtitle1" fontWeight="bold">
//                     {employeeData?.emp_name || "Employee Name"}
//                   </Typography>
//                   <Typography variant="body2" color="textSecondary">
//                     {employeeData?.designation || "Designation"}
//                   </Typography>
//                 </Box>
//               </Box>
            
//               <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', mb: 2 }}>
//                 <Box display="flex" alignItems="center">
//                   <SupervisorAccount sx={{ mr: 1, color: 'text.secondary' }} />
//                   <Typography>Manager: {employeeData?.manager || "N/A"}</Typography>
//                 </Box>
//                 <Button 
//                   variant="contained" 
//                   onClick={handleOpenPrintDialog}
//                   sx={{ 
//                     mt: 1.5, 
//                     backgroundColor: '#673AB7', 
//                     '&:hover': { backgroundColor: '#512DA8' } 
//                   }}
//                 >
//                   View Detail
//                 </Button>
//               </Box>

//               <List>
//                 {sidebarItems.map((item, index) => (
//                   <ListItem
//                     key={index}
//                     button
//                     selected={selectedItem === item.text}
//                     onClick={() => setSelectedItem(item.text)}
//                   >
//                     <ListItemIcon>{item.icon}</ListItemIcon>
//                     <ListItemText
//                       primary={item.text}
//                       primaryTypographyProps={{ fontSize: '14px' }}
//                     />
//                   </ListItem>
//                 ))}
//               </List>
//             </Paper>
//           </Grid>

//           <Grid item xs={12} md={8}>
//             <Paper elevation={3} sx={{ p: 2 }}>
//               {componentMap[selectedItem]}
//             </Paper>
//           </Grid>
//         </Grid>
//       </Box>

//       <Dialog 
//         open={openPrintDialog} 
//         onClose={() => setOpenPrintDialog(false)} 
//         fullWidth 
//         maxWidth="md"
//       >
//         <DialogTitle>
//           Employee Details
//           <IconButton
//             onClick={() => setOpenPrintDialog(false)}
//             sx={{ position: 'absolute', right: 8, top: 8 }}
//           >
//             <CloseIcon />
//           </IconButton>
//         </DialogTitle>
//         <DialogContent dividers>
//           {isPrintableLoading ? (
//             <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}>
//               <CircularProgress />
//             </Box>
//           ) : (
//             <PrintableView 
//               pageRefs={pageRefs} 
//               data={printableData} 
//             />
//           )}
//         </DialogContent>
//         <DialogActions>
//           <Button
//             onClick={handleDownloadPdf}
//             variant="contained"
//             startIcon={<DownloadIcon />}
//             disabled={isPrintableLoading}
//             sx={{
//               backgroundColor: "#9c27b0",
//               "&:hover": { backgroundColor: "#7b1fa2" }
//             }}
//           >
//             Download PDF
//           </Button>
//           <Button
//             onClick={() => setOpenPrintDialog(false)}
//             variant="contained"
//             sx={{
//               backgroundColor: "#f44336",
//               "&:hover": { backgroundColor: "#d32f2f" }
//             }}
//           >
//             Close
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </>
//   );
// };
 
// export default EmployeeDetail;












// import React, { useState, useEffect, useContext, useRef } from 'react';
// import { EmployeeContext } from './EmployeeContext';
// import axiosInstance from "../../utils/axiosInstance";
// import {
//   Box, Grid, Paper, Typography, Avatar, List, ListItem,
//   ListItemIcon, ListItemText, CircularProgress, Alert, IconButton,
//   Dialog, DialogTitle, DialogContent, DialogActions, Button, Tooltip,
//   TableContainer, Table, TableHead, TableRow, TableCell, TableBody
// } from '@mui/material';
// // ✅ 1. Import useNavigate for back button functionality
// import { useParams, useNavigate } from 'react-router-dom';
// import {
//   Lock, Info, AccountBox, Image, AccountBalance,
//   Description, SupervisorAccount, Print as PrintIcon,
//   Close as CloseIcon, Download as DownloadIcon, Group as GroupIcon,
//   // ✅ 2. Import ArrowBackIcon for the back button
//   ArrowBack as ArrowBackIcon
// } from '@mui/icons-material';
 
// // --- PDF Generation Libraries ---
// import jsPDF from 'jspdf';
// import html2canvas from 'html2canvas';
// import Swal from 'sweetalert2';
// // --- Child Component Imports ---
// import Contract from './Contract';
// import BasicInformation from './BasicInformation';
// import PersonalInformation from './PersonalInformation';
// import ProfilePicture from './ProfilePicture';
// import AccountInformation from './AccountInformation';
// import Documents from './Documents';
// import FamilyDetails from './FamilyDetails';

// // --- Logo Import ---
// import vetrinaLogo from '../../Assests/vetrinalogo.jpg';

// const componentMap = {
//   'Details': <Contract />,
//   'Basic Information': <BasicInformation />,
//   'Personal Information': <PersonalInformation />,
//   'Profile Picture': <ProfilePicture />,
//   'Account Information': <AccountInformation />,
//   'Documents': <Documents />,
//   'Family Details': <FamilyDetails />,
// };

// const sidebarItems = [
//   { icon: <Lock />, text: 'Details' },
//   { icon: <Info />, text: 'Basic Information' },
//   { icon: <AccountBox />, text: 'Personal Information' },
//   { icon: <Image />, text: 'Profile Picture' },
//   { icon: <AccountBalance />, text: 'Account Information' },
//   { icon: <Description />, text: 'Documents' },
//   { icon: <GroupIcon />, text: 'Family Details' },
// ];

// const getInitials = (name = "") => {
//   const nameParts = name.split(' ').filter(Boolean);
//   if (nameParts.length === 0) return '...';
//   if (nameParts.length === 1) return nameParts[0][0].toUpperCase();
//   return (nameParts[0][0] + nameParts[nameParts.length - 1][0]).toUpperCase();
// };

// // ======================= START: UPDATED PRINTABLE VIEW COMPONENT =======================
// const PrintableView = React.forwardRef(({ data, pageRefs }, ref) => {
//   if (!data) return null;

//   const {
//     employee_info, personal_details, nearest_police_station, emergency_contact,
//     work_details, compensation_details, bank_details,
//     assets, employee_journey, rewards, salary_history // Added rewards and salary_history
//   } = data;

//   const Section = ({ title, children }) => (
//     <Box mb={3}>
//       <Typography variant="h6" gutterBottom sx={{
//         borderBottom: 1,
//         borderColor: 'divider',
//         pb: 1, mb: 2,
//         color: '#673AB7' // Vibrant purple for section titles
//       }}>
//         {title}
//       </Typography>
//       {children}
//     </Box>
//   );

//   const DetailItem = ({ label, value }) => (
//     <Grid item xs={12} sm={6}>
//       <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 'bold' }}> {/* Faint Grey Label */}
//         {label}
//       </Typography>
//       <Typography variant="body1" sx={{ pl: 1, color: '#000' }}> {/* Dark Black Value */}
//         {value || 'N/A'}
//       </Typography>
//     </Grid>
//   );

//   const formatPermanentAddress = (address) => {
//     if (!address) return 'N/A';
//     const parts = [
//       address.address_1,
//       address.city,
//       address.state,
//       address.country
//     ].filter(Boolean);
//     if (parts.length === 0) return 'N/A';
//     const mainAddress = parts.join(', ');
//     return address.zipcode ? `${mainAddress} - ${address.zipcode}` : mainAddress;
//   };

//   const formatCorrespondenceAddress = (address) => {
//     if (!address) return 'N/A';
//     const parts = [
//       address.address_2,
//       address.city,
//       address.state,
//       address.country,
//       address.zipcode // Added zipcode to the parts list
//     ].filter(Boolean);
//     return parts.join(', ') || 'N/A';
//   };

//   const formatGender = (gender) => {
//     if (gender === '1') return 'Male';
//     if (gender === '2') return 'Female';
//     return gender || 'N/A';
//   };

//   const PageWrapper = ({ children, innerRef }) => (
//     <Box ref={innerRef} sx={{ p: 3, pt: 5, pb: 5, position: 'relative', pageBreakAfter: 'always' }}>
//       {children}
//     </Box>
//   );

//   const hasValidData = (row) => {
//     if (!row) return false;
//     return Object.values(row).some((val) => val !== null && val !== "" && val !== undefined);
//   };

//   const ConditionalTable = ({ title, data, columns, renderRow, message, pageRefs }) => {
//     const tableRef = React.useRef(null);
//     const [fitsOnPage, setFitsOnPage] = React.useState(true);

//     React.useEffect(() => {
//       if (tableRef.current) {
//         const tableHeight = tableRef.current.offsetHeight;
//         const pageHeight = 1123;
//         setFitsOnPage(tableHeight < pageHeight * 0.85);
//       }
//     }, [data]);

//     const filteredData = (data || []).filter(hasValidData);

//     if (!filteredData.length) {
//       return (
//         <Section title={title}>
//           <Typography variant="body1" sx={{ pl: 1, color: "#000" }}>
//             {message}
//           </Typography>
//         </Section>
//       );
//     }

//     const TableContent = (
//       <Section title={title}>
//         <TableContainer ref={tableRef} component={Paper} sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}>
//           <Table size="small">
//             <TableHead>
//               <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
//                 {columns.map((col, i) => (
//                   <TableCell key={i} sx={{ fontWeight: "bold", border: "1px solid rgba(224, 224, 224, 1)", color: "text.secondary" }}>
//                     {col}
//                   </TableCell>
//                 ))}
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {filteredData.map((row, index) => renderRow(row, index))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </Section>
//     );

//     return fitsOnPage ? TableContent : <PageWrapper innerRef={pageRefs[title]}>{TableContent}</PageWrapper>;
//   };

//   return (
//     <>
//       {/* --- PAGE 1 --- */}
//       <PageWrapper innerRef={pageRefs.page1}>
//         <Box display="flex" alignItems="center" justifyContent="space-between" mb={4}>
//           <Box display="flex" alignItems="center">
//             <Avatar src={employee_info?.profile_photo} sx={{ width: 80, height: 80, mr: 3 }} />
//             <Box>
//               <Typography variant="h5" fontWeight="bold">
//                 {employee_info?.full_name || 'N/A'}
//               </Typography>
//               <Typography variant="body1" color="text.secondary">
//                 Employee ID: {employee_info?.employee_id || 'N/A'}
//               </Typography>
//             </Box>
//           </Box>
//           <img src={vetrinaLogo} alt="Company Logo" style={{ height: '60px', width: 'auto' }} />
//         </Box>
//         <Section title="Employee Information">
//           <Grid container spacing={2}>
//             <DetailItem label="Department" value={employee_info?.department} />
//             <DetailItem label="Designation" value={employee_info?.designation} />
//             <DetailItem label="Division" value={employee_info?.division} />
//             <DetailItem label="Sub Division" value={employee_info?.sub_division} />
//             <DetailItem label="Head Quarter" value={employee_info?.head_quarter} />
//           </Grid>
//         </Section>
//         <Section title="Personal Details">
//           <Grid container spacing={2}>
//             <DetailItem label="Contact Number" value={personal_details?.contact_number} />
//             <DetailItem label="Email" value={personal_details?.email} />
//             <DetailItem label="Date of Birth" value={personal_details?.date_of_birth} />
//             <DetailItem label="Age" value={personal_details?.age} />
//             <DetailItem label="Gender" value={formatGender(personal_details?.gender)} />
//             <DetailItem label="Marital Status" value={personal_details?.marital_status} />
//             <DetailItem label="Blood Group" value={personal_details?.blood_group} />
//             <DetailItem label="Aadhar No." value={personal_details?.aadhar_no} />
//             <DetailItem label="PAN No." value={personal_details?.pan_number} />
//             <DetailItem label="UAN No." value={personal_details?.uan_number} />
//             <DetailItem label="Passport No." value={personal_details?.passport_no} />
//             <DetailItem label="Vehicle No." value={personal_details?.vehicle_no} />
//             <DetailItem label="Driving Licence No." value={personal_details?.driving_licence_no} />
//           </Grid>
//         </Section>
//         <Section title="Permanent Address">
//           <Grid container spacing={2}>
//             <DetailItem label="Address 1" value={personal_details?.permanent_address?.address_1} />
//             <DetailItem label="City" value={personal_details?.permanent_address?.city} />
//             <DetailItem label="State" value={personal_details?.permanent_address?.state} />
//             <DetailItem label="Country" value={personal_details?.permanent_address?.country} />
//             <DetailItem label="Zipcode" value={personal_details?.permanent_address?.zipcode} />
//           </Grid>
//         </Section>
//       </PageWrapper>
//       {/* --- PAGE 2 --- */}
//       <PageWrapper innerRef={pageRefs.page2}>
//         <Section title="Correspondence Address">
//           <Grid container spacing={2}>
//             <DetailItem label="Address 2" value={personal_details?.correspondence_address?.address_2} />
//             <DetailItem label="City" value={personal_details?.correspondence_address?.city} />
//             <DetailItem label="State" value={personal_details?.correspondence_address?.state} />
//             <DetailItem label="Country" value={personal_details?.correspondence_address?.country} />
//             <DetailItem label="Zipcode" value={personal_details?.correspondence_address?.zipcode} />
//           </Grid>
//         </Section>
//         <Section title="Nearest Police Station">
//           <Grid container spacing={2}>
//             <DetailItem label="Address" value={nearest_police_station?.address} />
//             <DetailItem label="Country" value={nearest_police_station?.country} />
//             <DetailItem label="State" value={nearest_police_station?.state} />
//             <DetailItem label="District" value={nearest_police_station?.district} />
//             <DetailItem label="Tehsil" value={nearest_police_station?.tehsil} />
//             <DetailItem label="Village" value={nearest_police_station?.village} />
//             <DetailItem label="Pincode" value={nearest_police_station?.pincode} />
//           </Grid>
//         </Section>
//         <Section title="Family Emergency Contact Details">
//           <Grid container spacing={2}>
//             <DetailItem label="Name" value={emergency_contact?.name} />
//             <DetailItem label="Contact No 1" value={emergency_contact?.phone} />
//             <DetailItem label="Contact No 2" value={emergency_contact?.phone2} />
//           </Grid>
//         </Section>
//         <Section title="Work Details">
//           <Grid container spacing={2}>
//             <DetailItem label="Date of Joining" value={work_details?.date_of_joining} />
//             <DetailItem label="Date of Promotion" value={work_details?.date_of_promotion} />
//             <DetailItem label="Status" value={work_details?.employee_status} />
//           </Grid>
//         </Section>
//         <Section title="Compensation Details">
//           <Grid container spacing={2}>
//             <DetailItem label="Gross Salary" value={compensation_details?.current_salary} />
//             <DetailItem label="Current CTC" value={compensation_details?.current_ctc} />
//             <DetailItem label="Joining Salary" value={compensation_details?.joining_salary} />
//             <DetailItem label="Joining CTC" value={compensation_details?.joining_ctc} />
//           </Grid>
//         </Section>
//       </PageWrapper>
//       {/* --- PAGE 3 --- */}
//       <PageWrapper innerRef={pageRefs.page3}>
//         <Section title="Bank Details">
//           <Grid container spacing={2}>
//             <DetailItem label="Account Title" value={bank_details?.account_title} />
//             <DetailItem label="Account Number" value={bank_details?.account_number} />
//             <DetailItem label="Bank Name" value={bank_details?.bank_name} />
//             <DetailItem label="IFSC Code" value={bank_details?.ifsc_code} />
//             <DetailItem label="Swift Code" value={bank_details?.swift_code} />
//             <DetailItem label="Bank Branch" value={bank_details?.bank_branch} />
//           </Grid>
//         </Section>
//         <Section title="Employee Journey">
//           <Grid container spacing={2}>
//             <DetailItem label="Date of Joining" value={employee_journey?.date_of_joining} />
//             <DetailItem label="Department" value={employee_journey?.department} />
//             <DetailItem label="Designation" value={employee_journey?.designation} />
//             <DetailItem label="Division" value={employee_journey?.division} />
//             <DetailItem label="Sub Division" value={employee_journey?.sub_division} />
//             <DetailItem label="Head Quarter" value={employee_journey?.head_quarter} />
//             <DetailItem label="Level" value={employee_journey?.level} />
//             <DetailItem label="Compensation" value={employee_journey?.compensation} />
//             <DetailItem label="Duration" value={employee_journey?.duration} />
//           </Grid>
//         </Section>
//         <ConditionalTable
//           title="Assigned Assets"
//           data={assets}
//           pageRefs={pageRefs}
//           message="Assets Not Allocated"
//           columns={["Sr. No.", "Asset Name", "Category", "Brand", "Manufacturer", "Serial Number"]}
//           renderRow={(asset, index) => (
//             <TableRow key={index}>
//               <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)", color: "#000" }}>{index + 1}</TableCell>
//               <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)", color: "#000" }}>{asset.assets_name || "N/A"}</TableCell>
//               <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)", color: "#000" }}>{asset.category_name || "N/A"}</TableCell>
//               <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)", color: "#000" }}>{asset.brand_name || "N/A"}</TableCell>
//               <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)", color: "#000" }}>{asset.manufacturer || "N/A"}</TableCell>
//               <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)", color: "#000" }}>{asset.serial_number || "N/A"}</TableCell>
//             </TableRow>
//           )}
//         />
//       </PageWrapper>
//       {/* --- PAGE 4 --- REWARDS & SALARY --- */}
//       <PageWrapper innerRef={pageRefs.page4}>
//         <ConditionalTable
//           title="Reward & Recognition"
//           data={rewards}
//           pageRefs={pageRefs}
//           message="No Rewards Information Available"
//           columns={["Sr No.", "Name of Reward", "Year (Financial Year)", "Date (DD/MM/YYYY)"]}
//           renderRow={(reward, index) => (
//             <TableRow key={index}>
//               <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)", color: "#000" }}>{index + 1}</TableCell>
//               <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)", color: "#000" }}>{reward.name || "N/A"}</TableCell>
//               <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)", color: "#000" }}>{reward.financial_year || "N/A"}</TableCell>
//               <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)", color: "#000" }}>{reward.date || "N/A"}</TableCell>
//             </TableRow>
//           )}
//         />
//         <ConditionalTable
//           title="Salary Details"
//           data={salary_history}
//           pageRefs={pageRefs}
//           message="No Salary History Available"
//           columns={["Sr No.", "Designation", "Level", "Financial Year", "W.E.F", "Basic + DA", "Gross Salary", "CTC", "View Salary slip",]}
//           renderRow={(salary, index) => (
//             <TableRow key={index}>
//               <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)", color: "#000" }}>{index + 1}</TableCell>
//               <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)", color: "#000" }}>{salary.designation || "N/A"}</TableCell>
//               <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)", color: "#000" }}>{salary.level || "N/A"}</TableCell>
//               <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)", color: "#000" }}>{salary.financial_year || "N/A"}</TableCell>
//               <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)", color: "#000" }}>{salary.wef || "N/A"}</TableCell>
//               <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)", color: "#000" }}>{salary.basic_da || "N/A"}</TableCell>
//               <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)", color: "#000" }}>{salary.gross_salary || "N/A"}</TableCell>
//               <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)", color: "#000" }}>{salary.ctc || "N/A"}</TableCell>
//               <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)", color: "#000", textAlign: "center" }}>
//                 <Button size="small" variant="outlined">View</Button>
//               </TableCell>
//             </TableRow>
//           )}
//         />
//       </PageWrapper>
//     </>
//   );
// });

// const EmployeeDetail = () => {
//   const [selectedItem, setSelectedItem] = useState('Details');
//   const [employeeData, setEmployeeData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const [openPrintDialog, setOpenPrintDialog] = useState(false);
//   const [printableData, setPrintableData] = useState(null);
//   const [isPrintableLoading, setIsPrintableLoading] = useState(false);

//   const page1Ref = useRef(null);
//   const page2Ref = useRef(null);
//   const page3Ref = useRef(null);
//   const page4Ref = useRef(null);
//   const page5Ref = useRef(null);

//   const pageRefs = {
//     page1: page1Ref,
//     page2: page2Ref,
//     page3: page3Ref,
//     page4: page4Ref,
//     page5: page5Ref,
//   };

//   const { setEmployeeId } = useContext(EmployeeContext);
//   const { id } = useParams();
//   // ✅ 3. Initialize useNavigate hook
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (id) {
//       setEmployeeId(id);
//     }
//   }, [id, setEmployeeId]);

//   useEffect(() => {
//     if (!id) {
//       setLoading(false);
//       setError("No employee ID provided in the URL.");
//       return;
//     }
//     setLoading(true);
//     setError(null);
//     axiosInstance.get(`api/edit_employee/${id}/`)
//       .then(res => {
//         if (res.data?.data?.length) {
//           setEmployeeData(res.data.data[0]);
//         } else {
//           setError("Employee not found.");
//         }
//       })
//       .catch(err => {
//         console.error("Error fetching employee data:", err);
//         setError("Failed to load employee data.");
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   }, [id]);

//   const handleOpenPrintDialog = () => {
//     if (!id) {
//        Swal.fire("Error", "Employee user ID is not available to fetch details.", "error");
//       return;
//     }
//     setIsPrintableLoading(true);
//     setOpenPrintDialog(true);
//     axiosInstance.get(`api/employee/${id}/`)
//       .then(res => {
//         setPrintableData(res.data);
//       })
//       .catch(err => {
//         console.error("Error fetching printable employee data:", err);
//          Swal.fire("Error", "Failed to load printable details.", "error");
//         setOpenPrintDialog(false);
//       })
//       .finally(() => {
//         setIsPrintableLoading(false);
//       });
//   };

//   const handleDownloadPdf = async () => {
//     const pdf = new jsPDF({
//       orientation: 'portrait',
//       unit: 'mm',
//       format: 'a4'
//     });

//     const addPageContent = async (ref, pageNum) => {
//       if (ref.current) {
//         const hasContent = ref.current.querySelector('h6');
//         if (!hasContent) return;
//         if (pageNum > 1) pdf.addPage();
//         const canvas = await html2canvas(ref.current, { scale: 2, useCORS: true, logging: false });
//         const imgData = canvas.toDataURL('image/png');
//         const pdfWidth = pdf.internal.pageSize.getWidth();
//         const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
//         const pageHeightLimit = pdf.internal.pageSize.getHeight();
//         pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, Math.min(pdfHeight, pageHeightLimit));
//       }
//     };

//     let pagesAdded = 0;
//     const processPage = async (ref) => {
//       if (ref.current) {
//         const hasContent = ref.current.querySelector('h6');
//         if (hasContent) {
//           pagesAdded++;
//           await addPageContent(ref, pagesAdded);
//         }
//       }
//     };

//     await processPage(pageRefs.page1);
//     await processPage(pageRefs.page2);
//     await processPage(pageRefs.page3);
//     await processPage(pageRefs.page4);
//     await processPage(pageRefs.page5);

//     pdf.save(`${employeeData?.emp_name || 'employee'}-details.pdf`);
//   };

//   if (loading) {
//     return <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress /></Box>;
//   }

//   if (error) {
//     return <Alert severity="error" sx={{ m: 2 }}>{error}</Alert>;
//   }

//   return (
//     <>
//       <Box sx={{ flexGrow: 1, p: 2 }}>
//         {/* ✅ 4. ADDED: Responsive top bar with title and back button */}
//         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
//           <Typography variant="h5" component="h1" fontWeight="bold">
//             Employee Profile
//           </Typography>
//           <Button
//             variant="contained"
//             onClick={() => navigate(-1)} // Navigates to the previous page
//             startIcon={<ArrowBackIcon />}
//             sx={{
//               backgroundColor: '#673AB7',
//               '&:hover': { backgroundColor: '#512DA8' }
//             }}
//           >
//             Back 
//           </Button>
//         </Box>

//         <Grid container spacing={2}>
//           <Grid item xs={12} md={4}>
//             <Paper elevation={3} sx={{ p: 2 }}>
//               <Box display="flex" alignItems="center" mb={2}>
//                 <Avatar
//                   src={employeeData?.profile_photo}
//                   alt={employeeData?.emp_name}
//                   sx={{ width: 56, height: 56, mr: 2 }}
//                 >
//                   {getInitials(employeeData?.emp_name)}
//                 </Avatar>
//                 <Box>
//                   <Typography variant="subtitle1" fontWeight="bold">
//                     {employeeData?.emp_name || "Employee Name"}
//                   </Typography>
//                   <Typography variant="body2" color="textSecondary">
//                     {employeeData?.designation || "Designation"}
//                   </Typography>
//                 </Box>
//               </Box>

//               <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', mb: 2 }}>
//                 <Box display="flex" alignItems="center">
//                   <SupervisorAccount sx={{ mr: 1, color: 'text.secondary' }} />
//                   <Typography>Manager: {employeeData?.manager || "N/A"}</Typography>
//                 </Box>
//                 <Button
//                   variant="contained"
//                   onClick={handleOpenPrintDialog}
//                   sx={{
//                     mt: 1.5,
//                     backgroundColor: '#673AB7',
//                     '&:hover': { backgroundColor: '#512DA8' }
//                   }}
//                 >
//                   View Detail
//                 </Button>
//               </Box>

//               <List>
//                 {sidebarItems.map((item, index) => (
//                   <ListItem
//                     key={index}
//                     button
//                     selected={selectedItem === item.text}
//                     onClick={() => setSelectedItem(item.text)}
//                   >
//                     <ListItemIcon>{item.icon}</ListItemIcon>
//                     <ListItemText
//                       primary={item.text}
//                       primaryTypographyProps={{ fontSize: '14px' }}
//                     />
//                   </ListItem>
//                 ))}
//               </List>
//             </Paper>
//           </Grid>

//           <Grid item xs={12} md={8}>
//             <Paper elevation={3} sx={{ p: 2 }}>
//               {componentMap[selectedItem]}
//             </Paper>
//           </Grid>
//         </Grid>
//       </Box>

//       <Dialog
//         open={openPrintDialog}
//         onClose={() => setOpenPrintDialog(false)}
//         fullWidth
//         maxWidth="md"
//       >
//         <DialogTitle>
//           Employee Details
//           <IconButton
//             onClick={() => setOpenPrintDialog(false)}
//             sx={{ position: 'absolute', right: 8, top: 8 }}
//           >
//             <CloseIcon />
//           </IconButton>
//         </DialogTitle>
//         <DialogContent dividers>
//           {isPrintableLoading ? (
//             <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}>
//               <CircularProgress />
//             </Box>
//           ) : (
//             <PrintableView
//               pageRefs={pageRefs}
//               data={printableData}
//             />
//           )}
//         </DialogContent>
//         <DialogActions>
//           {/* ✅ 5. UPDATED: Consistent styling for the Download button */}
//           <Button
//             onClick={handleDownloadPdf}
//             variant="contained"
//             startIcon={<DownloadIcon />}
//             disabled={isPrintableLoading}
//             sx={{
//               backgroundColor: "#673AB7",
//               "&:hover": { backgroundColor: "#512DA8" }
//             }}
//           >
//             Download PDF
//           </Button>
//           <Button
//             onClick={() => setOpenPrintDialog(false)}
//             variant="contained"
//             sx={{
//               backgroundColor: "#f44336",
//               "&:hover": { backgroundColor: "#d32f2f" }
//             }}
//           >
//             Close
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </>
//   );
// };

// export default EmployeeDetail;













// import React, { useState, useEffect, useContext, useRef } from 'react';
// import { EmployeeContext } from './EmployeeContext';
// import axiosInstance from "../../utils/axiosInstance";
// import {
//   Box, Grid, Paper, Typography, Avatar, List, ListItem,
//   ListItemIcon, ListItemText, CircularProgress, Alert, IconButton,
//   Dialog, DialogTitle, DialogContent, DialogActions, Button, Tooltip,
//   TableContainer, Table, TableHead, TableRow, TableCell, TableBody
// } from '@mui/material';
// // ✅ 1. Import useNavigate for back button functionality
// import { useParams, useNavigate } from 'react-router-dom';
// import {
//   Lock, Info, AccountBox, Image, AccountBalance,
//   Description, SupervisorAccount, Print as PrintIcon,
//   Close as CloseIcon, Download as DownloadIcon, Group as GroupIcon,
//   // ✅ 2. Import ArrowBackIcon for the back button
//   ArrowBack as ArrowBackIcon
// } from '@mui/icons-material';
 
// // --- PDF Generation Libraries ---
// import jsPDF from 'jspdf';
// import html2canvas from 'html2canvas';
// import Swal from 'sweetalert2';
// // --- Child Component Imports ---
// import Contract from './Contract';
// import BasicInformation from './BasicInformation';
// import PersonalInformation from './PersonalInformation';
// import ProfilePicture from './ProfilePicture';
// import AccountInformation from './AccountInformation';
// import Documents from './Documents';
// import FamilyDetails from './FamilyDetails';

// // --- Logo Import ---
// import vetrinaLogo from '../../Assests/vetrinalogo.jpg';

// const componentMap = {
//   'Details': <Contract />,
//   'Basic Information': <BasicInformation />,
//   'Personal Information': <PersonalInformation />,
//   'Profile Picture': <ProfilePicture />,
//   'Account Information': <AccountInformation />,
//   'Documents': <Documents />,
//   'Family Details': <FamilyDetails />,
// };

// const sidebarItems = [
//   { icon: <Lock />, text: 'Details' },
//   { icon: <Info />, text: 'Basic Information' },
//   { icon: <AccountBox />, text: 'Personal Information' },
//   { icon: <Image />, text: 'Profile Picture' },
//   { icon: <AccountBalance />, text: 'Account Information' },
//   { icon: <Description />, text: 'Documents' },
//   { icon: <GroupIcon />, text: 'Family Details' },
// ];

// const getInitials = (name = "") => {
//   const nameParts = name.split(' ').filter(Boolean);
//   if (nameParts.length === 0) return '...';
//   if (nameParts.length === 1) return nameParts[0][0].toUpperCase();
//   return (nameParts[0][0] + nameParts[nameParts.length - 1][0]).toUpperCase();
// };

// // ======================= START: UPDATED PRINTABLE VIEW COMPONENT =======================
// const PrintableView = React.forwardRef(({ data, pageRefs }, ref) => {
//   if (!data) return null;

//   const {
//     employee_info, personal_details, nearest_police_station, emergency_contact,
//     work_details, compensation_details, bank_details,
//     assets, employee_journey, rewards, salary_history // Added rewards and salary_history
//   } = data;

//   const Section = ({ title, children }) => (
//     <Box mb={3}>
//       <Typography variant="h6" gutterBottom sx={{
//         borderBottom: 1,
//         borderColor: 'divider',
//         pb: 1, mb: 2,
//         color: '#673AB7' // Vibrant purple for section titles
//       }}>
//         {title}
//       </Typography>
//       {children}
//     </Box>
//   );

//   const DetailItem = ({ label, value }) => (
//     <Grid item xs={12} sm={6}>
//       <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 'bold' }}> {/* Faint Grey Label */}
//         {label}
//       </Typography>
//       <Typography variant="body1" sx={{ pl: 1, color: '#000' }}> {/* Dark Black Value */}
//         {value || 'N/A'}
//       </Typography>
//     </Grid>
//   );

//   const formatPermanentAddress = (address) => {
//     if (!address) return 'N/A';
//     const parts = [
//       address.address_1,
//       address.city,
//       address.state,
//       address.country
//     ].filter(Boolean);
//     if (parts.length === 0) return 'N/A';
//     const mainAddress = parts.join(', ');
//     return address.zipcode ? `${mainAddress} - ${address.zipcode}` : mainAddress;
//   };

//   const formatCorrespondenceAddress = (address) => {
//     if (!address) return 'N/A';
//     const parts = [
//       address.address_2,
//       address.city,
//       address.state,
//       address.country,
//       address.zipcode // Added zipcode to the parts list
//     ].filter(Boolean);
//     return parts.join(', ') || 'N/A';
//   };

//   const formatGender = (gender) => {
//     if (gender === '1') return 'Male';
//     if (gender === '2') return 'Female';
//     return gender || 'N/A';
//   };

//   const PageWrapper = ({ children, innerRef }) => (
//     <Box ref={innerRef} sx={{ p: 3, pt: 5, pb: 5, position: 'relative', pageBreakAfter: 'always' }}>
//       {children}
//     </Box>
//   );

//   const hasValidData = (row) => {
//     if (!row) return false;
//     return Object.values(row).some((val) => val !== null && val !== "" && val !== undefined);
//   };

//   const ConditionalTable = ({ title, data, columns, renderRow, message, pageRefs }) => {
//     const tableRef = React.useRef(null);
//     const [fitsOnPage, setFitsOnPage] = React.useState(true);

//     React.useEffect(() => {
//       if (tableRef.current) {
//         const tableHeight = tableRef.current.offsetHeight;
//         const pageHeight = 1123;
//         setFitsOnPage(tableHeight < pageHeight * 0.85);
//       }
//     }, [data]);

//     const filteredData = (data || []).filter(hasValidData);

//     if (!filteredData.length) {
//       return (
//         <Section title={title}>
//           <Typography variant="body1" sx={{ pl: 1, color: "#000" }}>
//             {message}
//           </Typography>
//         </Section>
//       );
//     }

//     const TableContent = (
//       <Section title={title}>
//         <TableContainer ref={tableRef} component={Paper} sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}>
//           <Table size="small">
//             <TableHead>
//               <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
//                 {columns.map((col, i) => (
//                   <TableCell key={i} sx={{ fontWeight: "bold", border: "1px solid rgba(224, 224, 224, 1)", color: "text.secondary" }}>
//                     {col}
//                   </TableCell>
//                 ))}
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {filteredData.map((row, index) => renderRow(row, index))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </Section>
//     );

//     return fitsOnPage ? TableContent : <PageWrapper innerRef={pageRefs[title]}>{TableContent}</PageWrapper>;
//   };

//   return (
//     <>
//       {/* --- PAGE 1 --- */}
//       <PageWrapper innerRef={pageRefs.page1}>
//         <Box display="flex" alignItems="center" justifyContent="space-between" mb={4}>
//           <Box display="flex" alignItems="center">
//             <Avatar src={employee_info?.profile_photo} sx={{ width: 80, height: 80, mr: 3 }} />
//             <Box>
//               <Typography variant="h5" fontWeight="bold">
//                 {employee_info?.full_name || 'N/A'}
//               </Typography>
//               <Typography variant="body1" color="text.secondary">
//                 Employee ID: {employee_info?.employee_id || 'N/A'}
//               </Typography>
//             </Box>
//           </Box>
//           <img src={vetrinaLogo} alt="Company Logo" style={{ height: '60px', width: 'auto' }} />
//         </Box>
//         <Section title="Employee Information">
//           <Grid container spacing={2}>
//             <DetailItem label="Department" value={employee_info?.department} />
//             <DetailItem label="Designation" value={employee_info?.designation} />
//             <DetailItem label="Division" value={employee_info?.division} />
//             <DetailItem label="Sub Division" value={employee_info?.sub_division} />
//             <DetailItem label="Head Quarter" value={employee_info?.head_quarter} />
//           </Grid>
//         </Section>
//         <Section title="Personal Details">
//           <Grid container spacing={2}>
//             <DetailItem label="Contact Number" value={personal_details?.contact_number} />
//             <DetailItem label="Email" value={personal_details?.email} />
//             <DetailItem label="Date of Birth" value={personal_details?.date_of_birth} />
//             <DetailItem label="Age" value={personal_details?.age} />
//             <DetailItem label="Gender" value={formatGender(personal_details?.gender)} />
//             <DetailItem label="Marital Status" value={personal_details?.marital_status} />
//             <DetailItem label="Blood Group" value={personal_details?.blood_group} />
//             <DetailItem label="Aadhar No." value={personal_details?.aadhar_no} />
//             <DetailItem label="PAN No." value={personal_details?.pan_number} />
//             <DetailItem label="UAN No." value={personal_details?.uan_number} />
//             <DetailItem label="Passport No." value={personal_details?.passport_no} />
//             <DetailItem label="Vehicle No." value={personal_details?.vehicle_no} />
//             <DetailItem label="Driving Licence No." value={personal_details?.driving_licence_no} />
//           </Grid>
//         </Section>
//         <Section title="Permanent Address">
//           <Grid container spacing={2}>
//             <DetailItem label="Address 1" value={personal_details?.permanent_address?.address_1} />
//             <DetailItem label="City" value={personal_details?.permanent_address?.city} />
//             <DetailItem label="State" value={personal_details?.permanent_address?.state} />
//             <DetailItem label="Country" value={personal_details?.permanent_address?.country} />
//             <DetailItem label="Zipcode" value={personal_details?.permanent_address?.zipcode} />
//           </Grid>
//         </Section>
//       </PageWrapper>
//       {/* --- PAGE 2 --- */}
//       <PageWrapper innerRef={pageRefs.page2}>
//         <Section title="Correspondence Address">
//           <Grid container spacing={2}>
//             <DetailItem label="Address 2" value={personal_details?.correspondence_address?.address_2} />
//             <DetailItem label="City" value={personal_details?.correspondence_address?.city} />
//             <DetailItem label="State" value={personal_details?.correspondence_address?.state} />
//             <DetailItem label="Country" value={personal_details?.correspondence_address?.country} />
//             <DetailItem label="Zipcode" value={personal_details?.correspondence_address?.zipcode} />
//           </Grid>
//         </Section>
//         <Section title="Nearest Police Station">
//           <Grid container spacing={2}>
//             <DetailItem label="Address" value={nearest_police_station?.address} />
//             <DetailItem label="Country" value={nearest_police_station?.country} />
//             <DetailItem label="State" value={nearest_police_station?.state} />
//             <DetailItem label="District" value={nearest_police_station?.district} />
//             <DetailItem label="Tehsil" value={nearest_police_station?.tehsil} />
//             <DetailItem label="Village" value={nearest_police_station?.village} />
//             <DetailItem label="Pincode" value={nearest_police_station?.pincode} />
//           </Grid>
//         </Section>
//         <Section title="Family Emergency Contact Details">
//           <Grid container spacing={2}>
//             <DetailItem label="Name" value={emergency_contact?.name} />
//             <DetailItem label="Contact No 1" value={emergency_contact?.phone} />
//             <DetailItem label="Contact No 2" value={emergency_contact?.phone2} />
//           </Grid>
//         </Section>
//         <Section title="Work Details">
//           <Grid container spacing={2}>
//             <DetailItem label="Date of Joining" value={work_details?.date_of_joining} />
//             <DetailItem label="Date of Promotion" value={work_details?.date_of_promotion} />
//             <DetailItem label="Status" value={work_details?.employee_status} />
//           </Grid>
//         </Section>
//         <Section title="Compensation Details">
//           <Grid container spacing={2}>
//             <DetailItem label="Gross Salary" value={compensation_details?.current_salary} />
//             <DetailItem label="Current CTC" value={compensation_details?.current_ctc} />
//             <DetailItem label="Joining Salary" value={compensation_details?.joining_salary} />
//             <DetailItem label="Joining CTC" value={compensation_details?.joining_ctc} />
//           </Grid>
//         </Section>
//       </PageWrapper>
//       {/* --- PAGE 3 --- */}
//       <PageWrapper innerRef={pageRefs.page3}>
//         <Section title="Bank Details">
//           <Grid container spacing={2}>
//             <DetailItem label="Account Title" value={bank_details?.account_title} />
//             <DetailItem label="Account Number" value={bank_details?.account_number} />
//             <DetailItem label="Bank Name" value={bank_details?.bank_name} />
//             <DetailItem label="IFSC Code" value={bank_details?.ifsc_code} />
//             <DetailItem label="Swift Code" value={bank_details?.swift_code} />
//             <DetailItem label="Bank Branch" value={bank_details?.bank_branch} />
//           </Grid>
//         </Section>
//         <Section title="Employee Journey">
//           <Grid container spacing={2}>
//             <DetailItem label="Date of Joining" value={employee_journey?.date_of_joining} />
//             <DetailItem label="Department" value={employee_journey?.department} />
//             <DetailItem label="Designation" value={employee_journey?.designation} />
//             <DetailItem label="Division" value={employee_journey?.division} />
//             <DetailItem label="Sub Division" value={employee_journey?.sub_division} />
//             <DetailItem label="Head Quarter" value={employee_journey?.head_quarter} />
//             <DetailItem label="Level" value={employee_journey?.level} />
//             <DetailItem label="Compensation" value={employee_journey?.compensation} />
//             <DetailItem label="Duration" value={employee_journey?.duration} />
//           </Grid>
//         </Section>
//         <ConditionalTable
//           title="Assigned Assets"
//           data={assets}
//           pageRefs={pageRefs}
//           message="Assets Not Allocated"
//           columns={["Sr. No.", "Asset Name", "Category", "Brand", "Manufacturer", "Serial Number"]}
//           renderRow={(asset, index) => (
//             <TableRow key={index}>
//               <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)", color: "#000" }}>{index + 1}</TableCell>
//               <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)", color: "#000" }}>{asset.assets_name || "N/A"}</TableCell>
//               <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)", color: "#000" }}>{asset.category_name || "N/A"}</TableCell>
//               <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)", color: "#000" }}>{asset.brand_name || "N/A"}</TableCell>
//               <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)", color: "#000" }}>{asset.manufacturer || "N/A"}</TableCell>
//               <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)", color: "#000" }}>{asset.serial_number || "N/A"}</TableCell>
//             </TableRow>
//           )}
//         />
//       </PageWrapper>
//       {/* --- PAGE 4 --- REWARDS & SALARY --- */}
//       <PageWrapper innerRef={pageRefs.page4}>
//         <ConditionalTable
//           title="Reward & Recognition"
//           data={rewards}
//           pageRefs={pageRefs}
//           message="No Rewards Information Available"
//           columns={["Sr No.", "Name of Reward", "Year (Financial Year)", "Date (DD/MM/YYYY)"]}
//           renderRow={(reward, index) => (
//             <TableRow key={index}>
//               <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)", color: "#000" }}>{index + 1}</TableCell>
//               <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)", color: "#000" }}>{reward.name || "N/A"}</TableCell>
//               <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)", color: "#000" }}>{reward.financial_year || "N/A"}</TableCell>
//               <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)", color: "#000" }}>{reward.date || "N/A"}</TableCell>
//             </TableRow>
//           )}
//         />
//         <ConditionalTable
//           title="Salary Details"
//           data={salary_history}
//           pageRefs={pageRefs}
//           message="No Salary History Available"
//           columns={["Sr No.", "Designation", "Level", "Financial Year", "W.E.F", "Basic + DA", "Gross Salary", "CTC", "View Salary slip",]}
//           renderRow={(salary, index) => (
//             <TableRow key={index}>
//               <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)", color: "#000" }}>{index + 1}</TableCell>
//               <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)", color: "#000" }}>{salary.designation || "N/A"}</TableCell>
//               <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)", color: "#000" }}>{salary.level || "N/A"}</TableCell>
//               <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)", color: "#000" }}>{salary.financial_year || "N/A"}</TableCell>
//               <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)", color: "#000" }}>{salary.wef || "N/A"}</TableCell>
//               <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)", color: "#000" }}>{salary.basic_da || "N/A"}</TableCell>
//               <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)", color: "#000" }}>{salary.gross_salary || "N/A"}</TableCell>
//               <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)", color: "#000" }}>{salary.ctc || "N/A"}</TableCell>
//               <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)", color: "#000", textAlign: "center" }}>
//                 <Button size="small" variant="outlined">View</Button>
//               </TableCell>
//             </TableRow>
//           )}
//         />
//       </PageWrapper>
//     </>
//   );
// });

// const EmployeeDetail = () => {
//   const [selectedItem, setSelectedItem] = useState('Details');
//   const [employeeData, setEmployeeData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const [openPrintDialog, setOpenPrintDialog] = useState(false);
//   const [printableData, setPrintableData] = useState(null);
//   const [isPrintableLoading, setIsPrintableLoading] = useState(false);

//   const page1Ref = useRef(null);
//   const page2Ref = useRef(null);
//   const page3Ref = useRef(null);
//   const page4Ref = useRef(null);
//   const page5Ref = useRef(null);

//   const pageRefs = {
//     page1: page1Ref,
//     page2: page2Ref,
//     page3: page3Ref,
//     page4: page4Ref,
//     page5: page5Ref,
//   };

//   const { setEmployeeId } = useContext(EmployeeContext);
//   const { id } = useParams();
//   // ✅ 3. Initialize useNavigate hook
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (id) {
//       setEmployeeId(id);
//     }
//   }, [id, setEmployeeId]);

//   useEffect(() => {
//     if (!id) {
//       setLoading(false);
//       setError("No employee ID provided in the URL.");
//       return;
//     }
//     setLoading(true);
//     setError(null);
//     axiosInstance.get(`api/edit_employee/${id}/`)
//       .then(res => {
//         if (res.data?.data?.length) {
//           setEmployeeData(res.data.data[0]);
//         } else {
//           setError("Employee not found.");
//         }
//       })
//       .catch(err => {
//         console.error("Error fetching employee data:", err);
//         setError("Failed to load employee data.");
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   }, [id]);

//   const handleOpenPrintDialog = () => {
//     if (!id) {
//        Swal.fire("Error", "Employee user ID is not available to fetch details.", "error");
//       return;
//     }
//     setIsPrintableLoading(true);
//     setOpenPrintDialog(true);
//     axiosInstance.get(`api/employee/${id}/`)
//       .then(res => {
//         setPrintableData(res.data);
//       })
//       .catch(err => {
//         console.error("Error fetching printable employee data:", err);
//          Swal.fire("Error", "Failed to load printable details.", "error");
//         setOpenPrintDialog(false);
//       })
//       .finally(() => {
//         setIsPrintableLoading(false);
//       });
//   };

//   const handleDownloadPdf = async () => {
//     const pdf = new jsPDF({
//       orientation: 'portrait',
//       unit: 'mm',
//       format: 'a4'
//     });

//     const addPageContent = async (ref, pageNum) => {
//       if (ref.current) {
//         const hasContent = ref.current.querySelector('h6');
//         if (!hasContent) return;
//         if (pageNum > 1) pdf.addPage();
//         const canvas = await html2canvas(ref.current, { scale: 2, useCORS: true, logging: false });
//         const imgData = canvas.toDataURL('image/png');
//         const pdfWidth = pdf.internal.pageSize.getWidth();
//         const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
//         const pageHeightLimit = pdf.internal.pageSize.getHeight();
//         pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, Math.min(pdfHeight, pageHeightLimit));
//       }
//     };

//     let pagesAdded = 0;
//     const processPage = async (ref) => {
//       if (ref.current) {
//         const hasContent = ref.current.querySelector('h6');
//         if (hasContent) {
//           pagesAdded++;
//           await addPageContent(ref, pagesAdded);
//         }
//       }
//     };

//     await processPage(pageRefs.page1);
//     await processPage(pageRefs.page2);
//     await processPage(pageRefs.page3);
//     await processPage(pageRefs.page4);
//     await processPage(pageRefs.page5);

//     pdf.save(`${employeeData?.emp_name || 'employee'}-details.pdf`);
//   };

//   if (loading) {
//     return <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress /></Box>;
//   }

//   if (error) {
//     return <Alert severity="error" sx={{ m: 2 }}>{error}</Alert>;
//   }

//   return (
//     <>
//       <Box sx={{ flexGrow: 1, p: 2 }}>
//         {/* ✅ 4. ADDED: Responsive top bar with title and back button */}
//         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
//           <Typography variant="h4" color= '#8C257C ' component="h1" fontWeight="bold" mb={5}>
//             Employee Profile
//           </Typography>
//           <Button
//             variant="contained"
//             onClick={() => navigate(-1)} // Navigates to the previous page
//             startIcon={<ArrowBackIcon />}
//             sx={{
//               backgroundColor: '#8C257C',
//               '&:hover': { backgroundColor: '#8C257C' }
//             }}
//           >
//             Back 
//           </Button>
//         </Box>

//         <Grid container spacing={2}>
//           <Grid item xs={12} md={4}>
//             <Paper elevation={3} sx={{ p: 2 }}>
//               <Box display="flex" alignItems="center" mb={2}>
//                 <Avatar
//                   src={employeeData?.profile_photo}
//                   alt={employeeData?.emp_name}
//                   sx={{ width: 56, height: 56, mr: 2 }}
//                 >
//                   {getInitials(employeeData?.emp_name)}
//                 </Avatar>
//                 <Box>
//                   <Typography variant="h6" color='#8C257C' fontWeight="bold">
//                     {employeeData?.emp_name || "Employee Name"}
//                   </Typography>
//                   <Typography variant="body2" color="textSecondary">
//                     {employeeData?.designation || "Designation"}
//                   </Typography>
//                 </Box>
//               </Box>

//               <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', mb: 2 }}>
//                 <Box display="flex" alignItems="center">
//                   <SupervisorAccount color='#8C257C' sx={{ mr: 1, color: 'text.secondary' }} />
//                   <Typography color='#8C257C'>Manager: {employeeData?.manager || "N/A"}</Typography>
//                 </Box>
//                {/* ======================= START: MODIFIED/CONFIRMED CODE ======================= */}
// {/* <Box display="flex" alignItems="center" mt={0.5}>
//   <Info sx={{ mr: 1, color: 'text.secondary' }} />
//   <Typography>
//     Probation Period: {employeeData?.probation === 'y' ? 'Yes' : employeeData?.probation === 'n' ? 'No' : 'N/A'}
//   </Typography>
// </Box> */}
// {/* ======================= END: MODIFIED/CONFIRMED CODE ======================= */}
//                 <Button
//                   variant="contained"
//                   onClick={handleOpenPrintDialog}
//                   sx={{
//                     mt: 1.5,
//                     backgroundColor: '#8C257C ',
//                     '&:hover': { backgroundColor: '#8C257C' }
//                   }}
//                 >
//                   View Details
//                 </Button>
//               </Box>

//               <List>
//                 {sidebarItems.map((item, index) => (
//                   <ListItem
//                     key={index}
//                     button
//                     selected={selectedItem === item.text}
//                     onClick={() => setSelectedItem(item.text)}
//                   >
//                     <ListItemIcon>{item.icon}</ListItemIcon>
//                     <ListItemText
//                       primary={item.text}
//                       primaryTypographyProps={{ fontSize: '14px' }}
//                     />
//                   </ListItem>
//                 ))}
//               </List>
//             </Paper>
//           </Grid>

//           <Grid item xs={12} md={8}>
//             <Paper elevation={3} sx={{ p: 2 }}>
//               {componentMap[selectedItem]}
//             </Paper>
//           </Grid>
//         </Grid>
//       </Box>

//       <Dialog
//         open={openPrintDialog}
//         onClose={() => setOpenPrintDialog(false)}
//         fullWidth
//         maxWidth="md"
//       >
//         <DialogTitle variant="h5" color= '#8C257C ' component="h1" fontWeight="bold" mb={3}>
//           Employee Details
//           <IconButton
//             onClick={() => setOpenPrintDialog(false)}
//             sx={{ position: 'absolute', right: 8, top: 8 }}
//           >
//             <CloseIcon />
//           </IconButton>
//         </DialogTitle>
//         <DialogContent dividers>
//           {isPrintableLoading ? (
//             <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}>
//               <CircularProgress />
//             </Box>
//           ) : (
//             <PrintableView
//               pageRefs={pageRefs}
//               data={printableData}
//             />
//           )}
//         </DialogContent>
//         <DialogActions>
//           {/* ✅ 5. UPDATED: Consistent styling for the Download button */}
//           <Button
//             onClick={handleDownloadPdf}
//             variant="contained"
//             startIcon={<DownloadIcon />}
//             disabled={isPrintableLoading}
//             sx={{
//               backgroundColor: "#673AB7",
//               "&:hover": { backgroundColor: "#512DA8" }
//             }}
//           >
//             Download PDF
//           </Button>
//           <Button
//             onClick={() => setOpenPrintDialog(false)}
//             variant="contained"
//             sx={{
//               backgroundColor: "#f44336",
//               "&:hover": { backgroundColor: "#d32f2f" }
//             }}
//           >
//             Close
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </>
//   );
// };

// export default EmployeeDetail;







// import React, { useState, useEffect, useContext, useRef, useMemo } from 'react';
// import { EmployeeContext } from './EmployeeContext';
// import axiosInstance from "../../utils/axiosInstance";
// import {
//   Box, Grid, Paper, Typography, Avatar, List, ListItem,
//   ListItemIcon, ListItemText, CircularProgress, Alert, IconButton,
//   Dialog, DialogTitle, DialogContent, DialogActions, Button,
//   TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper as MuiPaper
// } from '@mui/material';
// import { useParams, useNavigate } from 'react-router-dom';
// import {
//   Lock, Info, AccountBox, Image, AccountBalance,
//   Description, SupervisorAccount, Print as PrintIcon,
//   Close as CloseIcon, Download as DownloadIcon, Group as GroupIcon,
//   ArrowBack as ArrowBackIcon
// } from '@mui/icons-material';

// import jsPDF from 'jspdf';
// import html2canvas from 'html2canvas';
// import Swal from 'sweetalert2';

// import Contract from './Contract';
// import BasicInformation from './BasicInformation';
// import PersonalInformation from './PersonalInformation';
// import ProfilePicture from './ProfilePicture';
// import AccountInformation from './AccountInformation';
// import Documents from './Documents';
// import FamilyDetails from './FamilyDetails';

// import vetrinaLogo from '../../Assests/vetrinalogo.jpg';

// const componentMap = {
//   'Details': <Contract />,
//   'Basic Information': <BasicInformation />,
//   'Personal Information': <PersonalInformation />,
//   'Profile Picture': <ProfilePicture />,
//   'Account Information': <AccountInformation />,
//   'Documents': <Documents />,
//   'Family Details': <FamilyDetails />,
// };

// const sidebarItems = [
//   { icon: <Lock />, text: 'Details' },
//   { icon: <Info />, text: 'Basic Information' },
//   { icon: <AccountBox />, text: 'Personal Information' },
//   { icon: <Image />, text: 'Profile Picture' },
//   { icon: <AccountBalance />, text: 'Account Information' },
//   { icon: <Description />, text: 'Documents' },
//   { icon: <GroupIcon />, text: 'Family Details' },
// ];

// const getInitials = (name = "") => {
//   const nameParts = name.split(' ').filter(Boolean);
//   if (nameParts.length === 0) return '...';
//   if (nameParts.length === 1) return nameParts[0][0].toUpperCase();
//   return (nameParts[0][0] + nameParts[nameParts.length - 1][0]).toUpperCase();
// };

// const PrintableView = ({ data, pageRefs }) => {
//   // Hooks must run unconditionally
//   const [openSlip, setOpenSlip] = useState(false);
//   const [selectedSlip, setSelectedSlip] = useState(null);
//   const slipPreviewRef = useRef(null);

//   // Sample fallback rows — will use salary_history if available
//   const sampleCompensationRows = [
//     {
//       designation: 'Software Engineer',
//       level: 'L2',
//       financial_year: '2023-24',
//       wef: '01/04/2023',
//       basic_da: '₹40,000',
//       gross_salary: '₹60,000',
//       ctc: '₹7,20,000',
//       // slipUrl: 'https://example.com/slips/emp123-2023-24.pdf'
//     },
//     {
//       designation: 'Senior Software Engineer',
//       level: 'L3',
//       financial_year: '2024-25',
//       wef: '01/04/2024',
//       basic_da: '₹50,000',
//       gross_salary: '₹75,000',
//       ctc: '₹9,00,000',
//       // slipUrl: 'https://example.com/slips/emp123-2024-25.pdf'
//     }
//   ];

//   // If no data, render nothing (hooks already ran above)
//   if (!data) return null;

//   const {
//     employee_info, personal_details, nearest_police_station, emergency_contact,
//     work_details, compensation_details, bank_details,
//     assets, employee_journey, rewards, salary_history
//   } = data;

//   const Section = ({ title, children }) => (
//     <Box mb={3}>
//       <Typography variant="h6" gutterBottom sx={{
//         borderBottom: 1,
//         borderColor: 'divider',
//         pb: 1, mb: 2,
//         color: '#673AB7'
//       }}>
//         {title}
//       </Typography>
//       {children}
//     </Box>
//   );

//   const DetailItem = ({ label, value }) => (
//     <Grid item xs={12} sm={6}>
//       <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 'bold' }}>
//         {label}
//       </Typography>
//       <Typography variant="body1" sx={{ pl: 1, color: '#000' }}>
//         {value || 'N/A'}
//       </Typography>
//     </Grid>
//   );

//   const PageWrapper = ({ children, innerRef }) => (
//     <Box ref={innerRef} sx={{ p: 3, pt: 5, pb: 5, position: 'relative', pageBreakAfter: 'always' }}>
//       {children}
//     </Box>
//   );

//   const hasValidData = (row) => {
//     if (!row) return false;
//     return Object.values(row).some((val) => val !== null && val !== "" && val !== undefined);
//   };

//   const formatCurrency = (value) => {
//     if (value === null || value === undefined || value === '') return 'N/A';
//     return value;
//   };

//   const handleOpenSlip = (row) => {
//     setSelectedSlip(row);
//     setOpenSlip(true);
//   };

//   const handleCloseSlip = () => {
//     setOpenSlip(false);
//     setSelectedSlip(null);
//   };

//   const handleOpenOriginalSlip = (row) => {
//     if (!row?.slipUrl) return;
//     window.open(row.slipUrl, '_blank', 'noopener,noreferrer');
//   };

//   const handleDownloadSlip = async () => {
//     if (!selectedSlip) return;
//     try {
//       // If original slip URL present, open it in new tab as convenience
//       if (selectedSlip.slipUrl) {
//         window.open(selectedSlip.slipUrl, '_blank', 'noopener,noreferrer');
//       }

//       // Capture preview DOM using html2canvas and create PDF
//       const elementToCapture = slipPreviewRef.current;
//       if (elementToCapture) {
//         const canvas = await html2canvas(elementToCapture, { scale: 2, useCORS: true, logging: false });
//         const imgData = canvas.toDataURL('image/png');

//         const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
//         const pdfWidth = doc.internal.pageSize.getWidth();
//         const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
//         doc.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

//         const pageHeight = doc.internal.pageSize.getHeight();
//         if (pdfHeight > pageHeight) {
//           let remaining = pdfHeight - pageHeight;
//           let position = pageHeight;
//           while (remaining > 0) {
//             doc.addPage();
//             doc.addImage(imgData, 'PNG', 0, -position, pdfWidth, pdfHeight);
//             remaining -= pageHeight;
//             position += pageHeight;
//           }
//         }

//         const fileName = `${employee_info?.full_name || 'employee'}-salaryslip-${selectedSlip.financial_year || 'slip'}.pdf`;
//         doc.save(fileName);
//         return;
//       }

//       // Fallback text PDF
//       const doc = new jsPDF({ unit: 'mm', format: 'a4' });
//       doc.setFontSize(14);
//       doc.text(`${employee_info?.full_name || 'Employee'} - Salary Slip`, 14, 20);
//       doc.setFontSize(11);
//       doc.text(`Financial Year: ${selectedSlip.financial_year || 'N/A'}`, 14, 30);
//       doc.text(`W.E.F: ${selectedSlip.wef || 'N/A'}`, 14, 38);
//       doc.text(`Designation: ${selectedSlip.designation || 'N/A'}`, 14, 46);
//       doc.text(`Level: ${selectedSlip.level || 'N/A'}`, 14, 54);
//       doc.text(`Basic + DA: ${selectedSlip.basic_da || 'N/A'}`, 14, 62);
//       doc.text(`Gross Salary: ${selectedSlip.gross_salary || 'N/A'}`, 14, 70);
//       doc.text(`CTC: ${selectedSlip.ctc || 'N/A'}`, 14, 78);
//       doc.save(`${employee_info?.full_name || 'employee'}-salaryslip-${selectedSlip.financial_year || 'slip'}.pdf`);
//     } catch (err) {
//       console.error('PDF generation error:', err);
//       Swal.fire('Error', 'Failed to generate PDF for salary slip.', 'error');
//     }
//   };

//   return (
//     <>
//       <PageWrapper innerRef={pageRefs.page1}>
//         <Box display="flex" alignItems="center" justifyContent="space-between" mb={4}>
//           <Box display="flex" alignItems="center">
//             <Avatar src={employee_info?.profile_photo} sx={{ width: 80, height: 80, mr: 3 }} imgProps={{ crossOrigin: 'anonymous' }} />
//             <Box>
//               <Typography variant="h5" fontWeight="bold">
//                 {employee_info?.full_name || 'N/A'}
//               </Typography>
//               <Typography variant="body1" color="text.secondary">
//                 Employee ID: {employee_info?.employee_id || 'N/A'}
//               </Typography>
//             </Box>
//           </Box>
//           <img src={vetrinaLogo} alt="Company Logo" crossOrigin="anonymous" style={{ height: '60px', width: 'auto' }} />
//         </Box>
//         <Section title="Employee Information">
//           <Grid container spacing={2}>
//             <DetailItem label="Department" value={employee_info?.department} />
//             <DetailItem label="Designation" value={employee_info?.designation} />
//             <DetailItem label="Division" value={employee_info?.division} />
//             <DetailItem label="Sub Division" value={employee_info?.sub_division} />
//             <DetailItem label="Head Quarter" value={employee_info?.head_quarter} />
//           </Grid>
//         </Section>
//         <Section title="Personal Details">
//           <Grid container spacing={2}>
//             <DetailItem label="Contact Number" value={personal_details?.contact_number} />
//             <DetailItem label="Email" value={personal_details?.email} />
//             <DetailItem label="Date of Birth" value={personal_details?.date_of_birth} />
//             <DetailItem label="Age" value={personal_details?.age} />
//             <DetailItem label="Gender" value={personal_details?.gender} />
//             <DetailItem label="Marital Status" value={personal_details?.marital_status} />
//             <DetailItem label="Blood Group" value={personal_details?.blood_group} />
//           </Grid>
//         </Section>
//       </PageWrapper>

//       <PageWrapper innerRef={pageRefs.page2}>
//         <Section title="Correspondence Address">
//           <Grid container spacing={2}>
//             <DetailItem label="Address 2" value={personal_details?.correspondence_address?.address_2} />
//             <DetailItem label="City" value={personal_details?.correspondence_address?.city} />
//             <DetailItem label="State" value={personal_details?.correspondence_address?.state} />
//             <DetailItem label="Country" value={personal_details?.correspondence_address?.country} />
//             <DetailItem label="Zipcode" value={personal_details?.correspondence_address?.zipcode} />
//           </Grid>
//         </Section>
//         <Section title="Nearest Police Station">
//           <Grid container spacing={2}>
//             <DetailItem label="Address" value={nearest_police_station?.address} />
//             <DetailItem label="Country" value={nearest_police_station?.country} />
//             <DetailItem label="State" value={nearest_police_station?.state} />
//             <DetailItem label="District" value={nearest_police_station?.district} />
//             <DetailItem label="Tehsil" value={nearest_police_station?.tehsil} />
//             <DetailItem label="Village" value={nearest_police_station?.village} />
//             <DetailItem label="Pincode" value={nearest_police_station?.pincode} />
//           </Grid>
//         </Section>
//       </PageWrapper>

//       <PageWrapper innerRef={pageRefs.page3}>
//         <Section title="Work Details">
//           <Grid container spacing={2}>
//             <DetailItem label="Date of Joining" value={work_details?.date_of_joining} />
//             <DetailItem label="Date of Promotion" value={work_details?.date_of_promotion} />
//             <DetailItem label="Status" value={work_details?.employee_status} />
//           </Grid>
//         </Section>

//         <Section title="Compensation Details">
//           <Grid container spacing={2}>
//             <DetailItem label="Gross Salary" value={compensation_details?.current_salary} />
//             <DetailItem label="Current CTC" value={compensation_details?.current_ctc} />
//             <DetailItem label="Joining Salary" value={compensation_details?.joining_salary} />
//             <DetailItem label="Joining CTC" value={compensation_details?.joining_ctc} />
//           </Grid>
//         </Section>

//         {/* Moved: Bank Details (now above Assigned Assets) */}
//         <Section title="Bank Details">
//           <Grid container spacing={2}>
//             <DetailItem label="Account Title" value={bank_details?.account_title} />
//             <DetailItem label="Account Number" value={bank_details?.account_number} />
//             <DetailItem label="Bank Name" value={bank_details?.bank_name} />
//             <DetailItem label="IFSC Code" value={bank_details?.ifsc_code} />
//             <DetailItem label="Swift Code" value={bank_details?.swift_code} />
//             <DetailItem label="Bank Branch" value={bank_details?.bank_branch} />
//           </Grid>
//         </Section>

//         {/* Moved: Employee Journey (now above Assigned Assets) */}
//         <Section title="Employee Journey">
//           <Grid container spacing={2}>
//             <DetailItem label="Date of Joining" value={employee_journey?.date_of_joining} />
//             <DetailItem label="Department" value={employee_journey?.department} />
//             <DetailItem label="Designation" value={employee_journey?.designation} />
//             <DetailItem label="Division" value={employee_journey?.division} />
//             <DetailItem label="Sub Division" value={employee_journey?.sub_division} />
//             <DetailItem label="Head Quarter" value={employee_journey?.head_quarter} />
//             <DetailItem label="Level" value={employee_journey?.level} />
//             <DetailItem label="Compensation" value={employee_journey?.compensation} />
//             <DetailItem label="Duration" value={employee_journey?.duration} />
//           </Grid>
//         </Section>

//         {/* Moved: Salary Details (now above Assigned Assets) */}
//         <Section title="Salary Details">
//           <Grid container spacing={2}>
//             <DetailItem label="Note" value={'Salary history is available below.'} />
//           </Grid>
//         </Section>

//         {/* Assigned Assets table (existing) */}
//         <Section title="Assigned Assets">
//           <TableContainer component={MuiPaper} sx={{ border: '1px solid rgba(224,224,224,1)' }}>
//             <Table size="small">
//               <TableHead>
//                 <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
//                   <TableCell sx={{ fontWeight: 'bold', border: '1px solid rgba(224,224,224,1)' }}>Sr. No.</TableCell>
//                   <TableCell sx={{ fontWeight: 'bold', border: '1px solid rgba(224,224,224,1)' }}>Asset Name</TableCell>
//                   <TableCell sx={{ fontWeight: 'bold', border: '1px solid rgba(224,224,224,1)' }}>Category</TableCell>
//                   <TableCell sx={{ fontWeight: 'bold', border: '1px solid rgba(224,224,224,1)' }}>Brand</TableCell>
//                   <TableCell sx={{ fontWeight: 'bold', border: '1px solid rgba(224,224,224,1)' }}>Manufacturer</TableCell>
//                   <TableCell sx={{ fontWeight: 'bold', border: '1px solid rgba(224,224,224,1)' }}>Serial Number</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {(assets || []).filter(hasValidData).map((asset, index) => (
//                   <TableRow key={index}>
//                     <TableCell sx={{ border: '1px solid rgba(224,224,224,1)' }}>{index + 1}</TableCell>
//                     <TableCell sx={{ border: '1px solid rgba(224,224,224,1)' }}>{asset.assets_name || 'N/A'}</TableCell>
//                     <TableCell sx={{ border: '1px solid rgba(224,224,224,1)' }}>{asset.category_name || 'N/A'}</TableCell>
//                     <TableCell sx={{ border: '1px solid rgba(224,224,224,1)' }}>{asset.brand_name || 'N/A'}</TableCell>
//                     <TableCell sx={{ border: '1px solid rgba(224,224,224,1)' }}>{asset.manufacturer || 'N/A'}</TableCell>
//                     <TableCell sx={{ border: '1px solid rgba(224,224,224,1)' }}>{asset.serial_number || 'N/A'}</TableCell>
//                   </TableRow>
//                 ))}
//                 {(!(assets || []).filter(hasValidData).length) && (
//                   <TableRow>
//                     <TableCell colSpan={6} sx={{ border: '1px solid rgba(224,224,224,1)' }}>Assets Not Allocated</TableCell>
//                   </TableRow>
//                 )}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         </Section>

//         {/* ----------------- Static Reward & Recognition table ----------------- */}
//         <Section title="Reward & Recognition">
//           <TableContainer component={MuiPaper} sx={{ border: '1px solid rgba(224,224,224,1)' }}>
//             <Table size="small">
//               <TableHead>
//                 <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
//                   <TableCell sx={{ fontWeight: 'bold', border: '1px solid rgba(224,224,224,1)' }}>Sr No.</TableCell>
//                   <TableCell sx={{ fontWeight: 'bold', border: '1px solid rgba(224,224,224,1)' }}>Name of Reward</TableCell>
//                   <TableCell sx={{ fontWeight: 'bold', border: '1px solid rgba(224,224,224,1)' }}>Year (Financial Year)</TableCell>
//                   <TableCell sx={{ fontWeight: 'bold', border: '1px solid rgba(224,224,224,1)' }}>Date (DD/MM/YYYY)</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 { (rewards && rewards.length ? rewards : [
//                   { name: 'Best Performer', financial_year: '2023-24', date: '15/03/2024' },
//                   { name: 'Spot Award', financial_year: '2022-23', date: '10/11/2022' }
//                 ]).map((r, i) => (
//                   <TableRow key={i}>
//                     <TableCell sx={{ border: '1px solid rgba(224,224,224,1)' }}>{i + 1}</TableCell>
//                     <TableCell sx={{ border: '1px solid rgba(224,224,224,1)' }}>{r.name}</TableCell>
//                     <TableCell sx={{ border: '1px solid rgba(224,224,224,1)' }}>{r.financial_year}</TableCell>
//                     <TableCell sx={{ border: '1px solid rgba(224,224,224,1)' }}>{r.date}</TableCell>
//                   </TableRow>
//                 )) }
//               </TableBody>
//             </Table>
//           </TableContainer>
//         </Section>

//         {/* ----------------- NEW: Static Compensation Table with clickable "View Salary Slip" ----------------- */}
//         <Section title="Compensation – View">
//           <TableContainer component={MuiPaper} sx={{ border: '1px solid rgba(224,224,224,1)' }}>
//             <Table size="small">
//               <TableHead>
//                 <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
//                   <TableCell sx={{ fontWeight: 'bold', border: '1px solid rgba(224,224,224,1)' }}>Sr. No.</TableCell>
//                   <TableCell sx={{ fontWeight: 'bold', border: '1px solid rgba(224,224,224,1)' }}>Designation</TableCell>
//                   <TableCell sx={{ fontWeight: 'bold', border: '1px solid rgba(224,224,224,1)' }}>Level</TableCell>
//                   <TableCell sx={{ fontWeight: 'bold', border: '1px solid rgba(224,224,224,1)' }}>Financial Year</TableCell>
//                   <TableCell sx={{ fontWeight: 'bold', border: '1px solid rgba(224,224,224,1)' }}>W.E.F</TableCell>
//                   <TableCell sx={{ fontWeight: 'bold', border: '1px solid rgba(224,224,224,1)' }}>Basic + DA</TableCell>
//                   <TableCell sx={{ fontWeight: 'bold', border: '1px solid rgba(224,224,224,1)' }}>Gross Salary</TableCell>
//                   <TableCell sx={{ fontWeight: 'bold', border: '1px solid rgba(224,224,224,1)' }}>CTC</TableCell>
//                   <TableCell sx={{ fontWeight: 'bold', border: '1px solid rgba(224,224,224,1)' }}>View Salary slip</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 { (salary_history && Array.isArray(salary_history) && salary_history.length ? salary_history : sampleCompensationRows).map((row, index) => (
//                   <TableRow key={index}>
//                     <TableCell sx={{ border: '1px solid rgba(224,224,224,1)' }}>{index + 1}</TableCell>
//                     <TableCell sx={{ border: '1px solid rgba(224,224,224,1)' }}>{row.designation}</TableCell>
//                     <TableCell sx={{ border: '1px solid rgba(224,224,224,1)' }}>{row.level}</TableCell>
//                     <TableCell sx={{ border: '1px solid rgba(224,224,224,1)' }}>{row.financial_year}</TableCell>
//                     <TableCell sx={{ border: '1px solid rgba(224,224,224,1)' }}>{row.wef}</TableCell>
//                     <TableCell sx={{ border: '1px solid rgba(224,224,224,1)' }}>{formatCurrency(row.basic_da)}</TableCell>
//                     <TableCell sx={{ border: '1px solid rgba(224,224,224,1)' }}>{formatCurrency(row.gross_salary)}</TableCell>
//                     <TableCell sx={{ border: '1px solid rgba(224,224,224,1)' }}>{formatCurrency(row.ctc)}</TableCell>
//                     <TableCell sx={{ border: '1px solid rgba(224,224,224,1)' }}>
//                       <Box sx={{ display: 'flex', gap: 1 }}>
//                         <Button size="small" onClick={() => handleOpenSlip(row)} sx={{ textTransform: 'none' }}>View</Button>
//                         {row.slipUrl && (
//                           <Button size="small" onClick={() => handleOpenOriginalSlip(row)} sx={{ textTransform: 'none' }}>
//                             Open Original
//                           </Button>
//                         )}
//                       </Box>
//                     </TableCell>
//                   </TableRow>
//                 )) }
//               </TableBody>
//             </Table>
//           </TableContainer>
//         </Section>
//         {/* ----------------------------------------------------------------------------------------------- */}
//       </PageWrapper>

//       {/* Empty pages kept for PDF pagination; hooks/refs preserved */}
//       <PageWrapper innerRef={pageRefs.page4}>
//         {/* intentionally left blank (page4) */}
//       </PageWrapper>

//       <PageWrapper innerRef={pageRefs.page5}>
//         {/* intentionally left blank (page5) */}
//       </PageWrapper>

//       {/* Salary Slip Dialog & preview */}
//       <Dialog open={openSlip} onClose={handleCloseSlip} maxWidth="sm" fullWidth aria-labelledby="salary-slip-dialog">
//         <DialogTitle>
//           <Box display="flex" alignItems="center" justifyContent="space-between">
//             <Typography variant="h6" color="#673AB7">Salary Slip Preview</Typography>
//             <IconButton onClick={handleCloseSlip}><CloseIcon /></IconButton>
//           </Box>
//         </DialogTitle>

//         <DialogContent dividers>
//           {selectedSlip ? (
//             <Box>
//               {/* Visible preview (captured by html2canvas) */}
//               <Box ref={slipPreviewRef} sx={{ p: 2 }}>
//                 <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
//                   <Box>
//                     <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>{employee_info?.full_name || 'N/A'}</Typography>
//                     <Typography variant="body2">{employee_info?.employee_id ? `Employee ID: ${employee_info.employee_id}` : ''}</Typography>
//                   </Box>
//                   {vetrinaLogo && (
//                     <img src={vetrinaLogo} alt="Company Logo" crossOrigin="anonymous" style={{ height: 48, objectFit: 'contain' }} />
//                   )}
//                 </Box>

//                 <Box sx={{ borderTop: '1px solid rgba(0,0,0,0.08)', pt: 2 }}>
//                   <Grid container spacing={1}>
//                     <Grid item xs={6}><Typography variant="body2" sx={{ fontWeight: 'bold' }}>Designation</Typography></Grid>
//                     <Grid item xs={6}><Typography variant="body2">{selectedSlip.designation}</Typography></Grid>

//                     <Grid item xs={6}><Typography variant="body2" sx={{ fontWeight: 'bold' }}>Level</Typography></Grid>
//                     <Grid item xs={6}><Typography variant="body2">{selectedSlip.level}</Typography></Grid>

//                     <Grid item xs={6}><Typography variant="body2" sx={{ fontWeight: 'bold' }}>Financial Year</Typography></Grid>
//                     <Grid item xs={6}><Typography variant="body2">{selectedSlip.financial_year}</Typography></Grid>

//                     <Grid item xs={6}><Typography variant="body2" sx={{ fontWeight: 'bold' }}>W.E.F</Typography></Grid>
//                     <Grid item xs={6}><Typography variant="body2">{selectedSlip.wef}</Typography></Grid>

//                     <Grid item xs={6}><Typography variant="body2" sx={{ fontWeight: 'bold' }}>Basic + DA</Typography></Grid>
//                     <Grid item xs={6}><Typography variant="body2">{formatCurrency(selectedSlip.basic_da)}</Typography></Grid>

//                     <Grid item xs={6}><Typography variant="body2" sx={{ fontWeight: 'bold' }}>Gross Salary</Typography></Grid>
//                     <Grid item xs={6}><Typography variant="body2">{formatCurrency(selectedSlip.gross_salary)}</Typography></Grid>

//                     <Grid item xs={6}><Typography variant="body2" sx={{ fontWeight: 'bold' }}>CTC</Typography></Grid>
//                     <Grid item xs={6}><Typography variant="body2">{formatCurrency(selectedSlip.ctc)}</Typography></Grid>
//                   </Grid>
//                 </Box>
//               </Box>
//             </Box>
//           ) : (
//             <Typography>No slip data available.</Typography>
//           )}
//         </DialogContent>

//         <DialogActions>
//           {selectedSlip?.slipUrl && (
//             <Button onClick={() => handleOpenOriginalSlip(selectedSlip)} variant="outlined" startIcon={<DownloadIcon />}>
//               Open Original
//             </Button>
//           )}
//           <Button onClick={handleDownloadSlip} variant="contained" startIcon={<DownloadIcon />} sx={{ backgroundColor: "#673AB7", "&:hover": { backgroundColor: "#512DA8" } }}>
//             Download PDF
//           </Button>
//           <Button onClick={handleCloseSlip} variant="outlined">Close</Button>
//         </DialogActions>
//       </Dialog>
//     </>
//   );
// };

// const EmployeeDetail = () => {
//   const [selectedItem, setSelectedItem] = useState('Details');
//   const [employeeData, setEmployeeData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const [openPrintDialog, setOpenPrintDialog] = useState(false);
//   const [printableData, setPrintableData] = useState(null);
//   const [isPrintableLoading, setIsPrintableLoading] = useState(false);

//   const page1Ref = useRef(null);
//   const page2Ref = useRef(null);
//   const page3Ref = useRef(null);
//   const page4Ref = useRef(null);
//   const page5Ref = useRef(null);

//   const pageRefs = useMemo(() => ({ page1: page1Ref, page2: page2Ref, page3: page3Ref, page4: page4Ref, page5: page5Ref }), [page1Ref, page2Ref, page3Ref, page4Ref, page5Ref]);

//   const { setEmployeeId } = useContext(EmployeeContext);
//   const { id } = useParams();
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (id) {
//       setEmployeeId(id);
//     }
//   }, [id, setEmployeeId]);

//   useEffect(() => {
//     if (!id) {
//       setLoading(false);
//       setError("No employee ID provided in the URL.");
//       return;
//     }
//     setLoading(true);
//     setError(null);
//     const controller = new AbortController();
//     axiosInstance.get(`api/edit_employee/${id}/`, { signal: controller.signal })
//       .then(res => {
//         if (res.data?.data?.length) {
//           setEmployeeData(res.data.data[0]);
//         } else {
//           setError("Employee not found.");
//         }
//       })
//       .catch(err => {
//         if (err.name === 'CanceledError' || err.message === 'canceled') return;
//         console.error("Error fetching employee data:", err);
//         setError("Failed to load employee data.");
//       })
//       .finally(() => setLoading(false));

//     return () => controller.abort();
//   }, [id, setEmployeeId]);

//   const handleOpenPrintDialog = () => {
//     if (!id) {
//       Swal.fire("Error", "Employee user ID is not available to fetch details.", "error");
//       return;
//     }
//     setIsPrintableLoading(true);
//     setOpenPrintDialog(true);
//     axiosInstance.get(`api/employee/${id}/`)
//       .then(res => {
//         const payload = res.data || {};
//         const normalized = {
//           employee_info: payload.employee_info || {
//             full_name: payload.full_name || payload.emp_name,
//             profile_photo: payload.profile_photo || payload.photo,
//             employee_id: payload.employee_id || payload.emp_id
//           },
//           personal_details: payload.personal_details || payload.personal || {},
//           assets: payload.assets || [],
//           rewards: payload.rewards || [],
//           salary_history: payload.salary_history || [],
//           nearest_police_station: payload.nearest_police_station || {},
//           emergency_contact: payload.emergency_contact || {},
//           work_details: payload.work_details || {},
//           compensation_details: payload.compensation_details || {},
//           bank_details: payload.bank_details || {},
//           employee_journey: payload.employee_journey || {}
//         };
//         setPrintableData(normalized);
//       })
//       .catch(err => {
//         console.error("Error fetching printable employee data:", err);
//         Swal.fire("Error", "Failed to load printable details.", "error");
//         setOpenPrintDialog(false);
//       })
//       .finally(() => setIsPrintableLoading(false));
//   };

//   const handleDownloadPdf = async () => {
//     const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

//     const addPageContent = async (ref, pageNum) => {
//       if (ref.current) {
//         const hasContent = ref.current.querySelector('h6');
//         if (!hasContent) return;
//         if (pageNum > 1) pdf.addPage();
//         try {
//           const canvas = await html2canvas(ref.current, { scale: 2, useCORS: true, logging: false });
//           const imgData = canvas.toDataURL('image/png');
//           const pdfWidth = pdf.internal.pageSize.getWidth();
//           const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
//           const pageHeightLimit = pdf.internal.pageSize.getHeight();
//           pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, Math.min(pdfHeight, pageHeightLimit));
//         } catch (err) {
//           console.error('html2canvas error:', err);
//           Swal.fire('Error', 'Failed to capture page for PDF (possible cross-origin image).', 'error');
//         }
//       }
//     };

//     let pagesAdded = 0;
//     const processPage = async (ref) => {
//       if (ref.current) {
//         const hasContent = ref.current.querySelector('h6');
//         if (hasContent) {
//           pagesAdded++;
//           await addPageContent(ref, pagesAdded);
//         }
//       }
//     };

//     await processPage(pageRefs.page1);
//     await processPage(pageRefs.page2);
//     await processPage(pageRefs.page3);
//     await processPage(pageRefs.page4);
//     await processPage(pageRefs.page5);

//     pdf.save(`${employeeData?.emp_name || 'employee'}-details.pdf`);
//   };

//   if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress /></Box>;
//   if (error) return <Alert severity="error" sx={{ m: 2 }}>{error}</Alert>;

//   return (
//     <>
//       <Box sx={{ flexGrow: 1, p: 2 }}>
//         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
//           <Typography variant="h4" color= '#8C257C ' component="h1" fontWeight="bold" mb={5}>
//             Employee Profile
//           </Typography>
//           <Button
//             variant="contained"
//             onClick={() => navigate(-1)}
//             startIcon={<ArrowBackIcon />}
//             sx={{ backgroundColor: '#8C257C', '&:hover': { backgroundColor: '#8C257C' } }}
//           >
//             Back
//           </Button>
//         </Box>

//         <Grid container spacing={2}>
//           <Grid item xs={12} md={4}>
//             <Paper elevation={3} sx={{ p: 2 }}>
//               <Box display="flex" alignItems="center" mb={2}>
//                 <Avatar src={employeeData?.profile_photo} alt={employeeData?.emp_name} sx={{ width: 56, height: 56, mr: 2 }} imgProps={{ crossOrigin: 'anonymous' }}>
//                   {getInitials(employeeData?.emp_name)}
//                 </Avatar>
//                 <Box>
//                   <Typography variant="h6" color='#8C257C' fontWeight="bold">
//                     {employeeData?.emp_name || "Employee Name"}
//                   </Typography>
//                   <Typography variant="body2" color="textSecondary">
//                     {employeeData?.designation || "Designation"}
//                   </Typography>
//                 </Box>
//               </Box>

//               <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', mb: 2 }}>
//                 <Box display="flex" alignItems="center">
//                   <SupervisorAccount sx={{ mr: 1, color: 'text.secondary' }} />
//                   <Typography color='#8C257C'>Manager: {employeeData?.manager || "N/A"}</Typography>
//                 </Box>
//                 <Button
//                   variant="contained"
//                   onClick={handleOpenPrintDialog}
//                   sx={{ mt: 1.5, backgroundColor: '#8C257C ', '&:hover': { backgroundColor: '#8C257C' } }}
//                 >
//                   View Details
//                 </Button>
//               </Box>

//               <List>
//                 {sidebarItems.map((item, index) => (
//                   <ListItem key={index} button selected={selectedItem === item.text} onClick={() => setSelectedItem(item.text)} aria-current={selectedItem === item.text ? 'true' : undefined}>
//                     <ListItemIcon>{item.icon}</ListItemIcon>
//                     <ListItemText primary={item.text} primaryTypographyProps={{ fontSize: '14px' }} />
//                   </ListItem>
//                 ))}
//               </List>
//             </Paper>
//           </Grid>

//           <Grid item xs={12} md={8}>
//             <Paper elevation={3} sx={{ p: 2 }}>
//               {componentMap[selectedItem]}
//             </Paper>
//           </Grid>
//         </Grid>
//       </Box>

//       <Dialog open={openPrintDialog} onClose={() => setOpenPrintDialog(false)} fullWidth maxWidth="md">
//         <DialogTitle>
//           <Typography variant="h6" color="#8C257C" fontWeight="bold">Employee Details</Typography>
//           <IconButton onClick={() => setOpenPrintDialog(false)} aria-label="Close dialog" sx={{ position: 'absolute', right: 8, top: 8 }}>
//             <CloseIcon />
//           </IconButton>
//         </DialogTitle>
//         <DialogContent dividers>
//           {isPrintableLoading ? (
//             <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}><CircularProgress /></Box>
//           ) : (
//             <PrintableView pageRefs={pageRefs} data={printableData} />
//           )}
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleDownloadPdf} variant="contained" startIcon={<DownloadIcon />} disabled={isPrintableLoading} sx={{ backgroundColor: "#673AB7", "&:hover": { backgroundColor: "#512DA8" } }}>Download PDF</Button>
//           <Button onClick={() => setOpenPrintDialog(false)} variant="contained" sx={{ backgroundColor: "#f44336", "&:hover": { backgroundColor: "#d32f2f" } }}>Close</Button>
//         </DialogActions>
//       </Dialog>
//     </>
//   );
// };

// export default EmployeeDetail;





// import React, { useState, useEffect, useContext, useRef, useMemo } from 'react';
// import { EmployeeContext } from './EmployeeContext';
// import axiosInstance from "../../utils/axiosInstance";
// import {
//   Box, Grid, Paper, Typography, Avatar, List, ListItem,
//   ListItemIcon, ListItemText, CircularProgress, Alert, IconButton,
//   Dialog, DialogTitle, DialogContent, DialogActions, Button,
//   TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper as MuiPaper
// } from '@mui/material';
// import { useParams, useNavigate } from 'react-router-dom';
// import {
//   Lock, Info, AccountBox, Image, AccountBalance,
//   Description, SupervisorAccount, Print as PrintIcon,
//   Close as CloseIcon, Download as DownloadIcon, Group as GroupIcon,
//   ArrowBack as ArrowBackIcon
// } from '@mui/icons-material';

// import jsPDF from 'jspdf';
// import html2canvas from 'html2canvas';
// import Swal from 'sweetalert2';

// import Contract from './Contract';
// import BasicInformation from './BasicInformation';
// import PersonalInformation from './PersonalInformation';
// import ProfilePicture from './ProfilePicture';
// import AccountInformation from './AccountInformation';
// import Documents from './Documents';
// import FamilyDetails from './FamilyDetails';

// import vetrinaLogo from '../../Assests/vetrinalogo.jpg';

// const componentMap = {
//   'Details': <Contract />,
//   'Basic Information': <BasicInformation />,
//   'Personal Information': <PersonalInformation />,
//   'Profile Picture': <ProfilePicture />,
//   'Account Information': <AccountInformation />,
//   'Documents': <Documents />,
//   'Family Details': <FamilyDetails />,
// };

// const sidebarItems = [
//   { icon: <Lock />, text: 'Details' },
//   { icon: <Info />, text: 'Basic Information' },
//   { icon: <AccountBox />, text: 'Personal Information' },
//   { icon: <Image />, text: 'Profile Picture' },
//   { icon: <AccountBalance />, text: 'Account Information' },
//   { icon: <Description />, text: 'Documents' },
//   { icon: <GroupIcon />, text: 'Family Details' },
// ];

// const getInitials = (name = "") => {
//   const nameParts = name.split(' ').filter(Boolean);
//   if (nameParts.length === 0) return '...';
//   if (nameParts.length === 1) return nameParts[0][0].toUpperCase();
//   return (nameParts[0][0] + nameParts[nameParts.length - 1][0]).toUpperCase();
// };

// const PrintableView = ({ data, pageRefs }) => {
//   const [openSlip, setOpenSlip] = useState(false);
//   const [selectedSlip, setSelectedSlip] = useState(null);
//   const slipPreviewRef = useRef(null);

//   if (!data) return null;

//   const {
//     employee_info, personal_details, nearest_police_station,
//     work_details, compensation_details, bank_details,
//     assets, employee_journey, rewards, salary_history
//   } = data;

//   const Section = ({ title, children }) => (
//     <Box mb={3}>
//       <Typography variant="h6" gutterBottom sx={{
//         borderBottom: 1,
//         borderColor: 'divider',
//         pb: 1, mb: 2,
//         color: '#673AB7'
//       }}>
//         {title}
//       </Typography>
//       {children}
//     </Box>
//   );

//   const DetailItem = ({ label, value }) => (
//     <Grid item xs={12} sm={6}>
//       <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 'bold' }}>
//         {label}
//       </Typography>
//       <Typography variant="body1" sx={{ pl: 1, color: '#000' }}>
//         {value || 'N/A'}
//       </Typography>
//     </Grid>
//   );

//   const PageWrapper = ({ children, innerRef }) => (
//     <Box ref={innerRef} sx={{ p: 3, pt: 5, pb: 5, position: 'relative', pageBreakAfter: 'always' }}>
//       {children}
//     </Box>
//   );

//   const hasValidData = (row) => {
//     if (!row) return false;
//     return Object.values(row).some((val) => val !== null && val !== "" && val !== undefined);
//   };

//   const formatCurrency = (value) => {
//     if (value === null || value === undefined || value === '') return 'N/A';
//     return value;
//   };

//   const handleOpenSlip = (row) => {
//     setSelectedSlip(row);
//     setOpenSlip(true);
//   };

//   const handleCloseSlip = () => {
//     setOpenSlip(false);
//     setSelectedSlip(null);
//   };

//   const handleOpenOriginalSlip = (row) => {
//     if (!row?.slipUrl) return;
//     window.open(row.slipUrl, '_blank', 'noopener,noreferrer');
//   };

//   const handleDownloadSlip = async () => {
//     if (!selectedSlip) return;
//     try {
//       if (selectedSlip.slipUrl) {
//         window.open(selectedSlip.slipUrl, '_blank', 'noopener,noreferrer');
//       }

//       const elementToCapture = slipPreviewRef.current;
//       if (elementToCapture) {
//         const canvas = await html2canvas(elementToCapture, { scale: 2, useCORS: true, logging: false });
//         const imgData = canvas.toDataURL('image/png');

//         const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
//         const pdfWidth = doc.internal.pageSize.getWidth();
//         const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
//         doc.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

//         const pageHeight = doc.internal.pageSize.getHeight();
//         if (pdfHeight > pageHeight) {
//           let remaining = pdfHeight - pageHeight;
//           let position = pageHeight;
//           while (remaining > 0) {
//             doc.addPage();
//             doc.addImage(imgData, 'PNG', 0, -position, pdfWidth, pdfHeight);
//             remaining -= pageHeight;
//             position += pageHeight;
//           }
//         }

//         const fileName = `${employee_info?.full_name || 'employee'}-salaryslip-${selectedSlip.year || 'slip'}.pdf`;
//         doc.save(fileName);
//         return;
//       }

//       const doc = new jsPDF({ unit: 'mm', format: 'a4' });
//       doc.setFontSize(14);
//       doc.text(`${employee_info?.full_name || 'Employee'} - Salary Slip`, 14, 20);
//       doc.setFontSize(11);
//       doc.text(`Year: ${selectedSlip.year || 'N/A'}`, 14, 30);
//       doc.text(`W.E.F: ${selectedSlip.wef || 'N/A'}`, 14, 38);
//       doc.text(`Designation: ${selectedSlip.designation || 'N/A'}`, 14, 46);
//       doc.text(`Level: ${selectedSlip.level || 'N/A'}`, 14, 54);
//       doc.text(`Basic + DA: ${selectedSlip.basic_plus_da || 'N/A'}`, 14, 62);
//       doc.text(`Gross Salary: ${selectedSlip.gross_salary || 'N/A'}`, 14, 70);
//       doc.text(`CTC: ${selectedSlip.ctc || 'N/A'}`, 14, 78);
//       doc.save(`${employee_info?.full_name || 'employee'}-salaryslip-${selectedSlip.year || 'slip'}.pdf`);
//     } catch (err) {
//       console.error('PDF generation error:', err);
//       Swal.fire('Error', 'Failed to generate PDF for salary slip.', 'error');
//     }
//   };

//   return (
//     <>
//       <PageWrapper innerRef={pageRefs.page1}>
//         <Box display="flex" alignItems="center" justifyContent="space-between" mb={4}>
//           <Box display="flex" alignItems="center">
//             <Avatar src={employee_info?.profile_photo} sx={{ width: 80, height: 80, mr: 3 }} imgProps={{ crossOrigin: 'anonymous' }} />
//             <Box>
//               <Typography variant="h5" fontWeight="bold">
//                 {employee_info?.full_name || 'N/A'}
//               </Typography>
//               <Typography variant="body1" color="text.secondary">
//                 Employee ID: {employee_info?.employee_id || 'N/A'}
//               </Typography>
//             </Box>
//           </Box>
//           <img src={vetrinaLogo} alt="Company Logo" crossOrigin="anonymous" style={{ height: '60px', width: 'auto' }} />
//         </Box>
//         <Section title="Employee Information">
//           <Grid container spacing={2}>
//             <DetailItem label="Department" value={employee_info?.department} />
//             <DetailItem label="Designation" value={employee_info?.designation} />
//             <DetailItem label="Division" value={employee_info?.division} />
//             <DetailItem label="Sub Division" value={employee_info?.sub_division} />
//             <DetailItem label="Head Quarter" value={employee_info?.head_quarter} />
//           </Grid>
//         </Section>
//         <Section title="Personal Details">
//           <Grid container spacing={2}>
//             <DetailItem label="Contact Number" value={personal_details?.contact_number} />
//             <DetailItem label="Email" value={personal_details?.email} />
//             <DetailItem label="Date of Birth" value={personal_details?.date_of_birth} />
//             <DetailItem label="Age" value={personal_details?.age} />
//             <DetailItem label="Gender" value={personal_details?.gender} />
//             <DetailItem label="Marital Status" value={personal_details?.marital_status} />
//             <DetailItem label="Blood Group" value={personal_details?.blood_group} />
//           </Grid>
//         </Section>
//       </PageWrapper>

//       <PageWrapper innerRef={pageRefs.page2}>
//         <Section title="Correspondence Address">
//           <Grid container spacing={2}>
//             <DetailItem label="Address 2" value={personal_details?.correspondence_address?.address_2} />
//             <DetailItem label="City" value={personal_details?.correspondence_address?.city} />
//             <DetailItem label="State" value={personal_details?.correspondence_address?.state} />
//             <DetailItem label="Country" value={personal_details?.correspondence_address?.country} />
//             <DetailItem label="Zipcode" value={personal_details?.correspondence_address?.zipcode} />
//           </Grid>
//         </Section>
//         <Section title="Nearest Police Station">
//           <Grid container spacing={2}>
//             <DetailItem label="Address" value={nearest_police_station?.address} />
//             <DetailItem label="Country" value={nearest_police_station?.country} />
//             <DetailItem label="State" value={nearest_police_station?.state} />
//             <DetailItem label="District" value={nearest_police_station?.district} />
//             <DetailItem label="Tehsil" value={nearest_police_station?.tehsil} />
//             <DetailItem label="Village" value={nearest_police_station?.village} />
//             <DetailItem label="Pincode" value={nearest_police_station?.pincode} />
//           </Grid>
//         </Section>
//       </PageWrapper>

//       <PageWrapper innerRef={pageRefs.page3}>
//         <Section title="Work Details">
//           <Grid container spacing={2}>
//             <DetailItem label="Date of Joining" value={work_details?.date_of_joining} />
//             <DetailItem label="Date of Promotion" value={work_details?.date_of_promotion} />
//             <DetailItem label="Status" value={work_details?.employee_status} />
//           </Grid>
//         </Section>

//         <Section title="Compensation Details">
//           <Grid container spacing={2}>
//             <DetailItem label="Gross Salary" value={compensation_details?.current_salary} />
//             <DetailItem label="Current CTC" value={compensation_details?.current_ctc} />
//             <DetailItem label="Joining Salary" value={compensation_details?.joining_salary} />
//             <DetailItem label="Joining CTC" value={compensation_details?.joining_ctc} />
//           </Grid>
//         </Section>

//         <Section title="Bank Details">
//           <Grid container spacing={2}>
//             <DetailItem label="Account Title" value={bank_details?.account_title} />
//             <DetailItem label="Account Number" value={bank_details?.account_number} />
//             <DetailItem label="Bank Name" value={bank_details?.bank_name} />
//             <DetailItem label="IFSC Code" value={bank_details?.ifsc_code} />
//             <DetailItem label="Swift Code" value={bank_details?.swift_code} />
//             <DetailItem label="Bank Branch" value={bank_details?.bank_branch} />
//           </Grid>
//         </Section>

//         <Section title="Employee Journey">
//           <Grid container spacing={2}>
//             <DetailItem label="Date of Joining" value={employee_journey?.date_of_joining} />
//             <DetailItem label="Department" value={employee_journey?.department} />
//             <DetailItem label="Designation" value={employee_journey?.designation} />
//             <DetailItem label="Division" value={employee_journey?.division} />
//             <DetailItem label="Sub Division" value={employee_journey?.sub_division} />
//             <DetailItem label="Head Quarter" value={employee_journey?.head_quarter} />
//             <DetailItem label="Level" value={employee_journey?.level} />
//             <DetailItem label="Compensation" value={employee_journey?.compensation} />
//             <DetailItem label="Duration" value={employee_journey?.duration} />
//           </Grid>
//         </Section>

//         <Section title="Salary Details">
//           <Grid container spacing={2}>
//             <DetailItem label="Note" value={'Salary history is available below.'} />
//           </Grid>
//         </Section>

//         <Section title="Assigned Assets">
//           <TableContainer component={MuiPaper} sx={{ border: '1px solid rgba(224,224,224,1)' }}>
//             <Table size="small">
//               <TableHead>
//                 <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
//                   <TableCell sx={{ fontWeight: 'bold', border: '1px solid rgba(224,224,224,1)' }}>Sr. No.</TableCell>
//                   <TableCell sx={{ fontWeight: 'bold', border: '1px solid rgba(224,224,224,1)' }}>Asset Name</TableCell>
//                   <TableCell sx={{ fontWeight: 'bold', border: '1px solid rgba(224,224,224,1)' }}>Category</TableCell>
//                   <TableCell sx={{ fontWeight: 'bold', border: '1px solid rgba(224,224,224,1)' }}>Brand</TableCell>
//                   <TableCell sx={{ fontWeight: 'bold', border: '1px solid rgba(224,224,224,1)' }}>Manufacturer</TableCell>
//                   <TableCell sx={{ fontWeight: 'bold', border: '1px solid rgba(224,224,224,1)' }}>Serial Number</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {(assets || []).filter(hasValidData).map((asset, index) => (
//                   <TableRow key={index}>
//                     <TableCell sx={{ border: '1px solid rgba(224,224,224,1)' }}>{index + 1}</TableCell>
//                     <TableCell sx={{ border: '1px solid rgba(224,224,224,1)' }}>{asset.assets_name || 'N/A'}</TableCell>
//                     <TableCell sx={{ border: '1px solid rgba(224,224,224,1)' }}>{asset.category_name || 'N/A'}</TableCell>
//                     <TableCell sx={{ border: '1px solid rgba(224,224,224,1)' }}>{asset.brand_name || 'N/A'}</TableCell>
//                     <TableCell sx={{ border: '1px solid rgba(224,224,224,1)' }}>{asset.manufacturer || 'N/A'}</TableCell>
//                     <TableCell sx={{ border: '1px solid rgba(224,224,224,1)' }}>{asset.serial_number || 'N/A'}</TableCell>
//                   </TableRow>
//                 ))}
//                 {(!(assets || []).filter(hasValidData).length) && (
//                   <TableRow>
//                     <TableCell colSpan={6} sx={{ border: '1px solid rgba(224,224,224,1)', textAlign: 'center' }}>Assets Not Allocated</TableCell>
//                   </TableRow>
//                 )}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         </Section>

//         <Section title="Reward & Recognition">
//           <TableContainer component={MuiPaper} sx={{ border: '1px solid rgba(224,224,224,1)' }}>
//             <Table size="small">
//               <TableHead>
//                 <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
//                   <TableCell sx={{ fontWeight: 'bold', border: '1px solid rgba(224,224,224,1)' }}>Sr No.</TableCell>
//                   <TableCell sx={{ fontWeight: 'bold', border: '1px solid rgba(224,224,224,1)' }}>Name of Reward</TableCell>
//                   <TableCell sx={{ fontWeight: 'bold', border: '1px solid rgba(224,224,224,1)' }}>Month/Year</TableCell>
//                   <TableCell sx={{ fontWeight: 'bold', border: '1px solid rgba(224,224,224,1)' }}>Cash Prize</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {(rewards && rewards.length > 0) ? (
//                   rewards.map((r, i) => (
//                     <TableRow key={i}>
//                       <TableCell sx={{ border: '1px solid rgba(224,224,224,1)' }}>{i + 1}</TableCell>
//                       <TableCell sx={{ border: '1px solid rgba(224,224,224,1)' }}>{r.award_type || 'N/A'}</TableCell>
//                       <TableCell sx={{ border: '1px solid rgba(224,224,224,1)' }}>{r.month_year || 'N/A'}</TableCell>
//                       <TableCell sx={{ border: '1px solid rgba(224,224,224,1)' }}>{formatCurrency(r.award_cash)}</TableCell>
//                     </TableRow>
//                   ))
//                 ) : (
//                   <TableRow>
//                     <TableCell colSpan={4} sx={{ border: '1px solid rgba(224,224,224,1)', textAlign: 'center' }}>No Rewards Information Available</TableCell>
//                   </TableRow>
//                 )}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         </Section>

//         <Section title="Compensation – View">
//           <TableContainer component={MuiPaper} sx={{ border: '1px solid rgba(224,224,224,1)' }}>
//             <Table size="small">
//               <TableHead>
//                 <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
//                   <TableCell sx={{ fontWeight: 'bold', border: '1px solid rgba(224,224,224,1)' }}>Sr. No.</TableCell>
//                   <TableCell sx={{ fontWeight: 'bold', border: '1px solid rgba(224,224,224,1)' }}>Designation</TableCell>
//                   <TableCell sx={{ fontWeight: 'bold', border: '1px solid rgba(224,224,224,1)' }}>Level</TableCell>
//                   <TableCell sx={{ fontWeight: 'bold', border: '1px solid rgba(224,224,224,1)' }}>Financial Year</TableCell>
//                   <TableCell sx={{ fontWeight: 'bold', border: '1px solid rgba(224,224,224,1)' }}>W.E.F</TableCell>
//                   <TableCell sx={{ fontWeight: 'bold', border: '1px solid rgba(224,224,224,1)' }}>Basic + DA</TableCell>
//                   <TableCell sx={{ fontWeight: 'bold', border: '1px solid rgba(224,224,224,1)' }}>Gross Salary</TableCell>
//                   <TableCell sx={{ fontWeight: 'bold', border: '1px solid rgba(224,224,224,1)' }}>CTC</TableCell>
//                   <TableCell sx={{ fontWeight: 'bold', border: '1px solid rgba(224,224,224,1)' }}>View Salary slip</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {(salary_history && salary_history.length > 0) ? (
//                   salary_history.map((row, index) => (
//                     <TableRow key={index}>
//                       <TableCell sx={{ border: '1px solid rgba(224,224,224,1)' }}>{index + 1}</TableCell>
//                       <TableCell sx={{ border: '1px solid rgba(224,224,224,1)' }}>{row.designation}</TableCell>
//                       <TableCell sx={{ border: '1px solid rgba(224,224,224,1)' }}>{row.level}</TableCell>
//                       <TableCell sx={{ border: '1px solid rgba(224,224,224,1)' }}>{row.year}</TableCell>
//                       <TableCell sx={{ border: '1px solid rgba(224,224,224,1)' }}>{row.wef}</TableCell>
//                       <TableCell sx={{ border: '1px solid rgba(224,224,224,1)' }}>{formatCurrency(row.basic_plus_da)}</TableCell>
//                       <TableCell sx={{ border: '1px solid rgba(224,224,224,1)' }}>{formatCurrency(row.gross_salary)}</TableCell>
//                       <TableCell sx={{ border: '1px solid rgba(224,224,224,1)' }}>{formatCurrency(row.ctc)}</TableCell>
//                       <TableCell sx={{ border: '1px solid rgba(224,224,224,1)' }}>
//                         <Box sx={{ display: 'flex', gap: 1 }}>
//                           <Button size="small" onClick={() => handleOpenSlip(row)} sx={{ textTransform: 'none' }}>View</Button>
//                           {row.slipUrl && (
//                             <Button size="small" onClick={() => handleOpenOriginalSlip(row)} sx={{ textTransform: 'none' }}>
//                               Open Original
//                             </Button>
//                           )}
//                         </Box>
//                       </TableCell>
//                     </TableRow>
//                   ))
//                 ) : (
//                   <TableRow>
//                     <TableCell colSpan={9} sx={{ border: '1px solid rgba(224,224,224,1)', textAlign: 'center' }}>No Compensation Information Available</TableCell>
//                   </TableRow>
//                 )}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         </Section>
//       </PageWrapper>

//       <PageWrapper innerRef={pageRefs.page4}></PageWrapper>
//       <PageWrapper innerRef={pageRefs.page5}></PageWrapper>

//       <Dialog open={openSlip} onClose={handleCloseSlip} maxWidth="sm" fullWidth aria-labelledby="salary-slip-dialog">
//         <DialogTitle>
//           <Box display="flex" alignItems="center" justifyContent="space-between">
//             <Typography variant="h6" color="#673AB7">Salary Slip Preview</Typography>
//             <IconButton onClick={handleCloseSlip}><CloseIcon /></IconButton>
//           </Box>
//         </DialogTitle>

//         <DialogContent dividers>
//           {selectedSlip ? (
//             <Box>
//               <Box ref={slipPreviewRef} sx={{ p: 2 }}>
//                 <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
//                   <Box>
//                     <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>{employee_info?.full_name || 'N/A'}</Typography>
//                     <Typography variant="body2">{employee_info?.employee_id ? `Employee ID: ${employee_info.employee_id}` : ''}</Typography>
//                   </Box>
//                   {vetrinaLogo && (
//                     <img src={vetrinaLogo} alt="Company Logo" crossOrigin="anonymous" style={{ height: 48, objectFit: 'contain' }} />
//                   )}
//                 </Box>

//                 <Box sx={{ borderTop: '1px solid rgba(0,0,0,0.08)', pt: 2 }}>
//                   <Grid container spacing={1}>
//                     <Grid item xs={6}><Typography variant="body2" sx={{ fontWeight: 'bold' }}>Designation</Typography></Grid>
//                     <Grid item xs={6}><Typography variant="body2">{selectedSlip.designation}</Typography></Grid>

//                     <Grid item xs={6}><Typography variant="body2" sx={{ fontWeight: 'bold' }}>Level</Typography></Grid>
//                     <Grid item xs={6}><Typography variant="body2">{selectedSlip.level}</Typography></Grid>

//                     <Grid item xs={6}><Typography variant="body2" sx={{ fontWeight: 'bold' }}>Financial Year</Typography></Grid>
//                     <Grid item xs={6}><Typography variant="body2">{selectedSlip.year}</Typography></Grid>

//                     <Grid item xs={6}><Typography variant="body2" sx={{ fontWeight: 'bold' }}>W.E.F</Typography></Grid>
//                     <Grid item xs={6}><Typography variant="body2">{selectedSlip.wef}</Typography></Grid>

//                     <Grid item xs={6}><Typography variant="body2" sx={{ fontWeight: 'bold' }}>Basic + DA</Typography></Grid>
//                     <Grid item xs={6}><Typography variant="body2">{formatCurrency(selectedSlip.basic_plus_da)}</Typography></Grid>

//                     <Grid item xs={6}><Typography variant="body2" sx={{ fontWeight: 'bold' }}>Gross Salary</Typography></Grid>
//                     <Grid item xs={6}><Typography variant="body2">{formatCurrency(selectedSlip.gross_salary)}</Typography></Grid>

//                     <Grid item xs={6}><Typography variant="body2" sx={{ fontWeight: 'bold' }}>CTC</Typography></Grid>
//                     <Grid item xs={6}><Typography variant="body2">{formatCurrency(selectedSlip.ctc)}</Typography></Grid>
//                   </Grid>
//                 </Box>
//               </Box>
//             </Box>
//           ) : (
//             <Typography>No slip data available.</Typography>
//           )}
//         </DialogContent>

//         <DialogActions>
//           {selectedSlip?.slipUrl && (
//             <Button onClick={() => handleOpenOriginalSlip(selectedSlip)} variant="outlined" startIcon={<DownloadIcon />}>
//               Open Original
//             </Button>
//           )}
//           <Button onClick={handleDownloadSlip} variant="contained" startIcon={<DownloadIcon />} sx={{ backgroundColor: "#673AB7", "&:hover": { backgroundColor: "#512DA8" } }}>
//             Download PDF
//           </Button>
//           <Button onClick={handleCloseSlip} variant="outlined">Close</Button>
//         </DialogActions>
//       </Dialog>
//     </>
//   );
// };

// const EmployeeDetail = () => {
//   const [selectedItem, setSelectedItem] = useState('Details');
//   const [employeeData, setEmployeeData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const [openPrintDialog, setOpenPrintDialog] = useState(false);
//   const [printableData, setPrintableData] = useState(null);
//   const [isPrintableLoading, setIsPrintableLoading] = useState(false);

//   const page1Ref = useRef(null);
//   const page2Ref = useRef(null);
//   const page3Ref = useRef(null);
//   const page4Ref = useRef(null);
//   const page5Ref = useRef(null);

//   const pageRefs = useMemo(() => ({ page1: page1Ref, page2: page2Ref, page3: page3Ref, page4: page4Ref, page5: page5Ref }), []);

//   const { setEmployeeId } = useContext(EmployeeContext);
//   const { id } = useParams();
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (id) {
//       setEmployeeId(id);
//     }
//   }, [id, setEmployeeId]);

//   useEffect(() => {
//     if (!id) {
//       setLoading(false);
//       setError("No employee ID provided in the URL.");
//       return;
//     }
//     setLoading(true);
//     setError(null);
//     const controller = new AbortController();
//     axiosInstance.get(`api/edit_employee/${id}/`, { signal: controller.signal })
//       .then(res => {
//         if (res.data?.data?.length) {
//           setEmployeeData(res.data.data[0]);
//         } else {
//           setError("Employee not found.");
//         }
//       })
//       .catch(err => {
//         if (err.name === 'CanceledError' || err.message === 'canceled') return;
//         console.error("Error fetching employee data:", err);
//         setError("Failed to load employee data.");
//       })
//       .finally(() => setLoading(false));

//     return () => controller.abort();
//   }, [id]);

//   const handleOpenPrintDialog = () => {
//     if (!id) {
//       Swal.fire("Error", "Employee user ID is not available to fetch details.", "error");
//       return;
//     }
//     setIsPrintableLoading(true);
//     setOpenPrintDialog(true);
//     axiosInstance.get(`api/employee/${id}/`)
//       .then(res => {
//         const payload = res.data || {};

//         let salaryData = [];
//         if (payload.salary_history && Array.isArray(payload.salary_history) && payload.salary_history.length > 0) {
//             salaryData = payload.salary_history;
//         } else if (payload.compensation && typeof payload.compensation === 'object' && Object.keys(payload.compensation).length > 0) {
//             salaryData = [payload.compensation];
//         }

//         const normalized = {
//           employee_info: payload.employee_info || {
//             full_name: payload.full_name || payload.emp_name,
//             profile_photo: payload.profile_photo || payload.photo,
//             employee_id: payload.employee_id || payload.emp_id
//           },
//           personal_details: payload.personal_details || payload.personal || {},
//           assets: payload.assets || [],
//           rewards: payload.rewards || [],
//           salary_history: salaryData,
//           nearest_police_station: payload.nearest_police_station || {},
//           emergency_contact: payload.emergency_contact || {},
//           work_details: payload.work_details || {},
//           compensation_details: payload.compensation_details || {},
//           bank_details: payload.bank_details || {},
//           employee_journey: payload.employee_journey || {}
//         };
//         setPrintableData(normalized);
//       })
//       .catch(err => {
//         console.error("Error fetching printable employee data:", err);
//         Swal.fire("Error", "Failed to load printable details.", "error");
//         setOpenPrintDialog(false);
//       })
//       .finally(() => setIsPrintableLoading(false));
//   };

//   const handleDownloadPdf = async () => {
//     const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

//     const addPageContent = async (ref, pageNum) => {
//       if (ref.current) {
//         const hasContent = ref.current.querySelector('h6');
//         if (!hasContent) return;
//         if (pageNum > 1) pdf.addPage();
//         try {
//           const canvas = await html2canvas(ref.current, { scale: 2, useCORS: true, logging: false });
//           const imgData = canvas.toDataURL('image/png');
//           const pdfWidth = pdf.internal.pageSize.getWidth();
//           const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
//           const pageHeightLimit = pdf.internal.pageSize.getHeight();
//           pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, Math.min(pdfHeight, pageHeightLimit));
//         } catch (err) {
//           console.error('html2canvas error:', err);
//           Swal.fire('Error', 'Failed to capture page for PDF (possible cross-origin image).', 'error');
//         }
//       }
//     };

//     let pagesAdded = 0;
//     const processPage = async (ref) => {
//       if (ref.current) {
//         const hasContent = ref.current.querySelector('h6');
//         if (hasContent) {
//           pagesAdded++;
//           await addPageContent(ref, pagesAdded);
//         }
//       }
//     };

//     await processPage(pageRefs.page1);
//     await processPage(pageRefs.page2);
//     await processPage(pageRefs.page3);
//     await processPage(pageRefs.page4);
//     await processPage(pageRefs.page5);

//     pdf.save(`${employeeData?.emp_name || 'employee'}-details.pdf`);
//   };

//   if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress /></Box>;
//   if (error) return <Alert severity="error" sx={{ m: 2 }}>{error}</Alert>;

//   return (
//     <>
//       <Box sx={{ flexGrow: 1, p: 2 }}>
//         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
//           <Typography variant="h4" color='#8C257C ' component="h1" fontWeight="bold" mb={5}>
//             Employee Profile
//           </Typography>
//           <Button
//             variant="contained"
//             onClick={() => navigate(-1)}
//             startIcon={<ArrowBackIcon />}
//             sx={{ backgroundColor: '#8C257C', '&:hover': { backgroundColor: '#8C257C' } }}
//           >
//             Back
//           </Button>
//         </Box>

//         <Grid container spacing={2}>
//           <Grid item xs={12} md={4}>
//             <Paper elevation={3} sx={{ p: 2 }}>
//               <Box display="flex" alignItems="center" mb={2}>
//                 <Avatar src={employeeData?.profile_photo} alt={employeeData?.emp_name} sx={{ width: 56, height: 56, mr: 2 }} imgProps={{ crossOrigin: 'anonymous' }}>
//                   {getInitials(employeeData?.emp_name)}
//                 </Avatar>
//                 <Box>
//                   <Typography variant="h6" color='#8C257C' fontWeight="bold">
//                     {employeeData?.emp_name || "Employee Name"}
//                   </Typography>
//                   <Typography variant="body2" color="textSecondary">
//                     {employeeData?.designation || "Designation"}
//                   </Typography>
//                 </Box>
//               </Box>

//               <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', mb: 2 }}>
//                 <Box display="flex" alignItems="center">
//                   <SupervisorAccount sx={{ mr: 1, color: 'text.secondary' }} />
//                   <Typography color='#8C257C'>Manager: {employeeData?.manager || "N/A"}</Typography>
//                 </Box>
//                 <Button
//                   variant="contained"
//                   onClick={handleOpenPrintDialog}
//                   sx={{ mt: 1.5, backgroundColor: '#8C257C ', '&:hover': { backgroundColor: '#8C257C' } }}
//                 >
//                   View Details
//                 </Button>
//               </Box>

//               <List>
//                 {sidebarItems.map((item, index) => (
//                   <ListItem key={index} button selected={selectedItem === item.text} onClick={() => setSelectedItem(item.text)} aria-current={selectedItem === item.text ? 'true' : undefined}>
//                     <ListItemIcon>{item.icon}</ListItemIcon>
//                     <ListItemText primary={item.text} primaryTypographyProps={{ fontSize: '14px' }} />
//                   </ListItem>
//                 ))}
//               </List>
//             </Paper>
//           </Grid>

//           <Grid item xs={12} md={8}>
//             <Paper elevation={3} sx={{ p: 2 }}>
//               {componentMap[selectedItem]}
//             </Paper>
//           </Grid>
//         </Grid>
//       </Box>

//       <Dialog open={openPrintDialog} onClose={() => setOpenPrintDialog(false)} fullWidth maxWidth="md">
//         <DialogTitle>
//           <Typography variant="h6" color="#8C257C" fontWeight="bold">Employee Details</Typography>
//           <IconButton onClick={() => setOpenPrintDialog(false)} aria-label="Close dialog" sx={{ position: 'absolute', right: 8, top: 8 }}>
//             <CloseIcon />
//           </IconButton>
//         </DialogTitle>
//         <DialogContent dividers>
//           {isPrintableLoading ? (
//             <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}><CircularProgress /></Box>
//           ) : (
//             <PrintableView pageRefs={pageRefs} data={printableData} />
//           )}
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleDownloadPdf} variant="contained" startIcon={<DownloadIcon />} disabled={isPrintableLoading} sx={{ backgroundColor: "#673AB7", "&:hover": { backgroundColor: "#512DA8" } }}>Download PDF</Button>
//           <Button onClick={() => setOpenPrintDialog(false)} variant="contained" sx={{ backgroundColor: "#f44336", "&:hover": { backgroundColor: "#d32f2f" } }}>Close</Button>
//         </DialogActions>
//       </Dialog>
//     </>
//   );
// };

// export default EmployeeDetail;







  // import React, { useState, useEffect, useContext, useRef, useMemo } from 'react';
  // import { EmployeeContext } from './EmployeeContext';
  // import axiosInstance from "../../utils/axiosInstance";
  // import {
  //   Box, Grid, Paper, Typography, Avatar, List, ListItem,
  //   ListItemIcon, ListItemText, CircularProgress, Alert, IconButton,
  //   Dialog, DialogTitle, DialogContent, DialogActions, Button,
  //   TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper as MuiPaper
  // } from '@mui/material';
  // import { useParams, useNavigate } from 'react-router-dom';
  // import {
  //   Lock, Info, AccountBox, Image, AccountBalance,
  //   Description, SupervisorAccount, Print as PrintIcon,
  //   Close as CloseIcon, Download as DownloadIcon, Group as GroupIcon,
  //   ArrowBack as ArrowBackIcon
  // } from '@mui/icons-material';
  // import jsPDF from 'jspdf';
  // import html2canvas from 'html2canvas';
  // import Swal from 'sweetalert2';
  // import Contract from './Contract';
  // import BasicInformation from './BasicInformation';
  // import PersonalInformation from './PersonalInformation';
  // import ProfilePicture from './ProfilePicture';
  // import AccountInformation from './AccountInformation';
  // import Documents from './Documents';
  // import FamilyDetails from './FamilyDetails';
  // import vetrinaLogo from '../../Assests/vetrinalogo.jpg';

  // const componentMap = {
  //   'Details': <Contract />,
  //   'Basic Information': <BasicInformation />,
  //   'Personal Information': <PersonalInformation />,
  //   'Profile Picture': <ProfilePicture />,
  //   'Account Information': <AccountInformation />,
  //   'Documents': <Documents />,
  //   'Family Details': <FamilyDetails />,
  // };

  // const sidebarItems = [
  //   { icon: <Lock />, text: 'Details' },
  //   { icon: <Info />, text: 'Basic Information' },
  //   { icon: <AccountBox />, text: 'Personal Information' },
  //   { icon: <Image />, text: 'Profile Picture' },
  //   { icon: <AccountBalance />, text: 'Account Information' },
  //   { icon: <Description />, text: 'Documents' },
  //   { icon: <GroupIcon />, text: 'Family Details' },
  // ];

  // const getInitials = (name = "") => {
  //   const nameParts = name.split(' ').filter(Boolean);
  //   if (nameParts.length === 0) return '...';
  //   if (nameParts.length === 1) return nameParts[0][0].toUpperCase();
  //   return (nameParts[0][0] + nameParts[nameParts.length - 1][0]).toUpperCase();
  // };

  // const PrintableView = ({ data, pageRefs }) => {
  //   const [openSlip, setOpenSlip] = useState(false);
  //   const [selectedSlip, setSelectedSlip] = useState(null);
  //   const slipPreviewRef = useRef(null);

  //   if (!data) return null;

  //   const {
  //     employee_info, personal_details, nearest_police_station,
  //     work_details, compensation_details, bank_details,
  //     assets, employee_journey, rewards, salary_history
  //   } = data;

  //   const Section = ({ title, children }) => (
  //     <Box mb={3}>
  //       <Typography variant="h6" gutterBottom sx={{ borderBottom: 1, borderColor: 'divider', pb: 1, mb: 2, color: '#673AB7' }}>
  //         {title}
  //       </Typography>
  //       {children}
  //     </Box>
  //   );

  //   const DetailItem = ({ label, value }) => (
  //     <Grid item xs={12} sm={6}>
  //       <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 'bold' }}>
  //         {label}
  //       </Typography>
  //       <Typography variant="body1" sx={{ pl: 1, color: '#000' }}>
  //         {value || 'N/A'}
  //       </Typography>
  //     </Grid>
  //   );

  //   const PageWrapper = ({ children, innerRef }) => (
  //     <Box ref={innerRef} sx={{ p: 3, pt: 5, pb: 5, position: 'relative', pageBreakAfter: 'always' }}>
  //       {children}
  //     </Box>
  //   );

  //   const hasValidData = (row) => {
  //     if (!row) return false;
  //     return Object.values(row).some((val) => val !== null && val !== "" && val !== undefined);
  //   };

  //   const formatCurrency = (value) => {
  //     if (value === null || value === undefined || value === '' || isNaN(Number(value))) {
  //       return 'N/A';
  //     }
  //     return new Intl.NumberFormat('en-IN', {
  //       style: 'currency',
  //       currency: 'INR',
  //       minimumFractionDigits: 0,
  //       maximumFractionDigits: 2,
  //     }).format(Number(value));
  //   };

  //   const handleOpenSlip = (row) => {
  //     setSelectedSlip(row);
  //     setOpenSlip(true);
  //   };

  //   const handleCloseSlip = () => {
  //     setOpenSlip(false);
  //     setSelectedSlip(null);
  //   };

  //   const handleOpenOriginalSlip = (row) => {
  //     if (!row?.slipUrl) return;
  //     window.open(row.slipUrl, '_blank', 'noopener,noreferrer');
  //   };

  //   const handleDownloadSlip = async () => {
  //     if (!selectedSlip) return;
  //     try {
  //       if (selectedSlip.slipUrl) {
  //         window.open(selectedSlip.slipUrl, '_blank', 'noopener,noreferrer');
  //       }

  //       const elementToCapture = slipPreviewRef.current;
  //       if (elementToCapture) {
  //         const canvas = await html2canvas(elementToCapture, { scale: 2, useCORS: true, logging: false });
  //         const imgData = canvas.toDataURL('image/png');
  //         const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  //         const pdfWidth = doc.internal.pageSize.getWidth();
  //         const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
  //         doc.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
  //         const pageHeight = doc.internal.pageSize.getHeight();
  //         if (pdfHeight > pageHeight) {
  //           let remaining = pdfHeight - pageHeight;
  //           let position = pageHeight;
  //           while (remaining > 0) {
  //             doc.addPage();
  //             doc.addImage(imgData, 'PNG', 0, -position, pdfWidth, pdfHeight);
  //             remaining -= pageHeight;
  //             position += pageHeight;
  //           }
  //         }
  //         const fileName = `${employee_info?.full_name || 'employee'}-salaryslip-${selectedSlip.year || 'slip'}.pdf`;
  //         doc.save(fileName);
  //         return;
  //       }

  //       const doc = new jsPDF({ unit: 'mm', format: 'a4' });
  //       doc.setFontSize(14);
  //       doc.text(`${employee_info?.full_name || 'Employee'} - Salary Slip`, 14, 20);
  //       doc.setFontSize(11);
  //       doc.text(`Year: ${selectedSlip.year || 'N/A'}`, 14, 30);
  //       doc.text(`W.E.F: ${selectedSlip.wef || 'N/A'}`, 14, 38);
  //       doc.text(`Designation: ${selectedSlip.designation || 'N/A'}`, 14, 46);
  //       doc.text(`Level: ${selectedSlip.level || 'N/A'}`, 14, 54);
  //       doc.text(`Basic + DA: ${selectedSlip.basic_plus_da || 'N/A'}`, 14, 62);
  //       doc.text(`Gross Salary: ${selectedSlip.gross_salary || 'N/A'}`, 14, 70);
  //       doc.text(`CTC: ${selectedSlip.ctc || 'N/A'}`, 14, 78);
  //       doc.save(`${employee_info?.full_name || 'employee'}-salaryslip-${selectedSlip.year || 'slip'}.pdf`);
  //     } catch (err) {
  //       console.error('PDF generation error:', err);
  //       Swal.fire('Error', 'Failed to generate PDF for salary slip.', 'error');
  //     }
  //   };

  //   return (
  //     <>
  //       <PageWrapper innerRef={pageRefs.page1}>
  //         <Box display="flex" alignItems="center" justifyContent="space-between" mb={4}>
  //           <Box display="flex" alignItems="center">
  //             <Avatar src={employee_info?.profile_photo} sx={{ width: 80, height: 80, mr: 3 }} imgProps={{ crossOrigin: 'anonymous' }} />
  //             <Box>
  //               <Typography variant="h5" fontWeight="bold">{employee_info?.full_name || 'N/A'}</Typography>
  //               <Typography variant="body1" color="text.secondary">Employee ID: {employee_info?.employee_id || 'N/A'}</Typography>
  //             </Box>
  //           </Box>
  //           <img src={vetrinaLogo} alt="Company Logo" crossOrigin="anonymous" style={{ height: '60px', width: 'auto' }} />
  //         </Box>
  //         <Section title="Employee Information">
  //           <Grid container spacing={2}>
  //             <DetailItem label="Department" value={employee_info?.department} />
  //             <DetailItem label="Designation" value={employee_info?.designation} />
  //             <DetailItem label="Division" value={employee_info?.division} />
  //             <DetailItem label="Sub Division" value={employee_info?.sub_division} />
  //             <DetailItem label="Head Quarter" value={employee_info?.head_quarter} />
  //           </Grid>
  //         </Section>
  //         <Section title="Personal Details">
  //           <Grid container spacing={2}>
  //             <DetailItem label="Contact Number" value={personal_details?.contact_number} />
  //             <DetailItem label="Email" value={personal_details?.email} />
  //             <DetailItem label="Date of Birth" value={personal_details?.date_of_birth} />
  //             <DetailItem label="Age" value={personal_details?.age} />
  //             <DetailItem label="Gender" value={personal_details?.gender} />
  //             <DetailItem label="Marital Status" value={personal_details?.marital_status} />
  //             <DetailItem label="Blood Group" value={personal_details?.blood_group} />
  //           </Grid>
  //         </Section>
  //       </PageWrapper>

  //       <PageWrapper innerRef={pageRefs.page2}>
  //         <Section title="Correspondence Address">
  //           <Grid container spacing={2}>
  //             <DetailItem label="Address 2" value={personal_details?.correspondence_address?.address_2} />
  //             <DetailItem label="City" value={personal_details?.correspondence_address?.city} />
  //             <DetailItem label="State" value={personal_details?.correspondence_address?.state} />
  //             <DetailItem label="Country" value={personal_details?.correspondence_address?.country} />
  //             <DetailItem label="Zipcode" value={personal_details?.correspondence_address?.zipcode} />
  //           </Grid>
  //         </Section>
  //         <Section title="Nearest Police Station">
  //           <Grid container spacing={2}>
  //             <DetailItem label="Address" value={nearest_police_station?.address} />
  //             <DetailItem label="Country" value={nearest_police_station?.country} />
  //             <DetailItem label="State" value={nearest_police_station?.state} />
  //             <DetailItem label="District" value={nearest_police_station?.district} />
  //             <DetailItem label="Tehsil" value={nearest_police_station?.tehsil} />
  //             <DetailItem label="Village" value={nearest_police_station?.village} />
  //             <DetailItem label="Pincode" value={nearest_police_station?.pincode} />
  //           </Grid>
  //         </Section>
  //       </PageWrapper>

  //       <PageWrapper innerRef={pageRefs.page3}>
  //         <Section title="Work Details">
  //           <Grid container spacing={2}>
  //             <DetailItem label="Date of Joining" value={work_details?.date_of_joining} />
  //             <DetailItem label="Date of Promotion" value={work_details?.date_of_promotion} />
  //             <DetailItem label="Status" value={work_details?.employee_status} />
  //           </Grid>
  //         </Section>
  //         <Section title="Compensation Details">
  //           <Grid container spacing={2}>
  //             <DetailItem label="Gross Salary" value={compensation_details?.current_salary} />
  //             <DetailItem label="Current CTC" value={compensation_details?.current_ctc} />
  //             <DetailItem label="Joining Salary" value={compensation_details?.joining_salary} />
  //             <DetailItem label="Joining CTC" value={compensation_details?.joining_ctc} />
  //           </Grid>
  //         </Section>
  //         <Section title="Bank Details">
  //           <Grid container spacing={2}>
  //             <DetailItem label="Account Title" value={bank_details?.account_title} />
  //             <DetailItem label="Account Number" value={bank_details?.account_number} />
  //             <DetailItem label="Bank Name" value={bank_details?.bank_name} />
  //             <DetailItem label="IFSC Code" value={bank_details?.ifsc_code} />
  //             <DetailItem label="Swift Code" value={bank_details?.swift_code} />
  //             <DetailItem label="Bank Branch" value={bank_details?.bank_branch} />
  //           </Grid>
  //         </Section>
  //         <Section title="Employee Journey">
  //           <Grid container spacing={2}>
  //             <DetailItem label="Date of Joining" value={employee_journey?.date_of_joining} />
  //             <DetailItem label="Department" value={employee_journey?.department} />
  //             <DetailItem label="Designation" value={employee_journey?.designation} />
  //             <DetailItem label="Division" value={employee_journey?.division} />
  //             <DetailItem label="Sub Division" value={employee_journey?.sub_division} />
  //             <DetailItem label="Head Quarter" value={employee_journey?.head_quarter} />
  //             <DetailItem label="Level" value={employee_journey?.level} />
  //             <DetailItem label="Compensation" value={employee_journey?.compensation} />
  //             <DetailItem label="Duration" value={employee_journey?.duration} />
  //           </Grid>
  //         </Section>
  //         <Section title="Salary Details">
  //           <Grid container spacing={2}><DetailItem label="Note" value={'Salary history is available below.'} /></Grid>
  //         </Section>
  //         <Section title="Assigned Assets">
  //           <TableContainer component={MuiPaper} sx={{ border: '1px solid rgba(224,224,224,1)' }}>
  //             <Table size="small">
  //               <TableHead><TableRow sx={{ backgroundColor: '#f5f5f5' }}><TableCell sx={{ fontWeight: 'bold', border: '1px solid rgba(224,224,224,1)' }}>Sr. No.</TableCell><TableCell sx={{ fontWeight: 'bold', border: '1px solid rgba(224,224,224,1)' }}>Asset Name</TableCell><TableCell sx={{ fontWeight: 'bold', border: '1px solid rgba(224,224,224,1)' }}>Category</TableCell><TableCell sx={{ fontWeight: 'bold', border: '1px solid rgba(224,224,224,1)' }}>Brand</TableCell><TableCell sx={{ fontWeight: 'bold', border: '1px solid rgba(224,224,224,1)' }}>Manufacturer</TableCell><TableCell sx={{ fontWeight: 'bold', border: '1px solid rgba(224,224,224,1)' }}>Serial Number</TableCell></TableRow></TableHead>
  //               <TableBody>
  //                 {(assets || []).filter(hasValidData).map((asset, index) => (<TableRow key={index}><TableCell sx={{ border: '1px solid rgba(224,224,224,1)' }}>{index + 1}</TableCell><TableCell sx={{ border: '1px solid rgba(224,224,224,1)' }}>{asset.assets_name || 'N/A'}</TableCell><TableCell sx={{ border: '1px solid rgba(224,224,224,1)' }}>{asset.category_name || 'N/A'}</TableCell><TableCell sx={{ border: '1px solid rgba(224,224,224,1)' }}>{asset.brand_name || 'N/A'}</TableCell><TableCell sx={{ border: '1px solid rgba(224,224,224,1)' }}>{asset.manufacturer || 'N/A'}</TableCell><TableCell sx={{ border: '1px solid rgba(224,224,224,1)' }}>{asset.serial_number || 'N/A'}</TableCell></TableRow>))}
  //                 {(!(assets || []).filter(hasValidData).length) && (<TableRow><TableCell colSpan={6} sx={{ border: '1px solid rgba(224,224,224,1)', textAlign: 'center' }}>Assets Not Allocated</TableCell></TableRow>)}
  //               </TableBody>
  //             </Table>
  //           </TableContainer>
  //         </Section>
  //         <Section title="Reward & Recognition">
  //           <TableContainer component={MuiPaper} sx={{ border: '1px solid rgba(224,224,224,1)' }}>
  //             <Table size="small">
  //               <TableHead><TableRow sx={{ backgroundColor: '#f5f5f5' }}><TableCell sx={{ fontWeight: 'bold', border: '1px solid rgba(224,224,224,1)' }}>Sr No.</TableCell><TableCell sx={{ fontWeight: 'bold', border: '1px solid rgba(224,224,224,1)' }}>Name of Reward</TableCell><TableCell sx={{ fontWeight: 'bold', border: '1px solid rgba(224,224,224,1)' }}>Month/Year</TableCell><TableCell sx={{ fontWeight: 'bold', border: '1px solid rgba(224,224,224,1)' }}>Cash Prize</TableCell></TableRow></TableHead>
  //               <TableBody>
  //                 {(rewards && rewards.length > 0) ? (rewards.map((r, i) => (<TableRow key={i}><TableCell sx={{ border: '1px solid rgba(224,224,224,1)' }}>{i + 1}</TableCell><TableCell sx={{ border: '1px solid rgba(224,224,224,1)' }}>{r.award_type || 'N/A'}</TableCell><TableCell sx={{ border: '1px solid rgba(224,224,224,1)' }}>{r.month_year || 'N/A'}</TableCell><TableCell sx={{ border: '1px solid rgba(224,224,224,1)' }}>{formatCurrency(r.award_cash)}</TableCell></TableRow>))) : (<TableRow><TableCell colSpan={4} sx={{ border: '1px solid rgba(224,224,224,1)', textAlign: 'center' }}>No Rewards Information Available</TableCell></TableRow>)}
  //               </TableBody>
  //             </Table>
  //           </TableContainer>
  //         </Section>
  //         <Section title="Compensation – View">
  //           <TableContainer component={MuiPaper} sx={{ border: '1px solid rgba(224,224,224,1)' }}>
  //             <Table size="small">
  //               <TableHead><TableRow sx={{ backgroundColor: '#f5f5f5' }}><TableCell sx={{ fontWeight: 'bold', border: '1px solid rgba(224,224,224,1)' }}>Sr. No.</TableCell><TableCell sx={{ fontWeight: 'bold', border: '1px solid rgba(224,224,224,1)' }}>Designation</TableCell><TableCell sx={{ fontWeight: 'bold', border: '1px solid rgba(224,224,224,1)' }}>Level</TableCell><TableCell sx={{ fontWeight: 'bold', border: '1px solid rgba(224,224,224,1)' }}>Financial Year</TableCell><TableCell sx={{ fontWeight: 'bold', border: '1px solid rgba(224,224,224,1)' }}>W.E.F</TableCell><TableCell sx={{ fontWeight: 'bold', border: '1px solid rgba(224,224,224,1)' }}>Basic + DA</TableCell><TableCell sx={{ fontWeight: 'bold', border: '1px solid rgba(224,224,224,1)' }}>Gross Salary</TableCell><TableCell sx={{ fontWeight: 'bold', border: '1px solid rgba(224,224,224,1)' }}>CTC</TableCell><TableCell sx={{ fontWeight: 'bold', border: '1px solid rgba(224,224,224,1)' }}>View Salary slip</TableCell></TableRow></TableHead>
  //               <TableBody>
  //                 {(salary_history && salary_history.length > 0) ? (salary_history.map((row, index) => (<TableRow key={index}><TableCell sx={{ border: '1px solid rgba(224,224,224,1)' }}>{index + 1}</TableCell><TableCell sx={{ border: '1px solid rgba(224,224,224,1)' }}>{row.designation}</TableCell><TableCell sx={{ border: '1px solid rgba(224,224,224,1)' }}>{row.level}</TableCell><TableCell sx={{ border: '1px solid rgba(224,224,224,1)' }}>{row.year}</TableCell><TableCell sx={{ border: '1px solid rgba(224,224,224,1)' }}>{row.wef}</TableCell><TableCell sx={{ border: '1px solid rgba(224,224,224,1)' }}>{formatCurrency(row.basic_plus_da)}</TableCell><TableCell sx={{ border: '1px solid rgba(224,224,224,1)' }}>{formatCurrency(row.gross_salary)}</TableCell><TableCell sx={{ border: '1px solid rgba(224,224,224,1)' }}>{formatCurrency(row.ctc)}</TableCell><TableCell sx={{ border: '1px solid rgba(224,224,224,1)' }}><Box sx={{ display: 'flex', gap: 1 }}><Button size="small" onClick={() => handleOpenSlip(row)} sx={{ textTransform: 'none' }}>View</Button>{row.slipUrl && (<Button size="small" onClick={() => handleOpenOriginalSlip(row)} sx={{ textTransform: 'none' }}>Open Original</Button>)}</Box></TableCell></TableRow>))) : (<TableRow><TableCell colSpan={9} sx={{ border: '1px solid rgba(224,224,224,1)', textAlign: 'center' }}>No Compensation Information Available</TableCell></TableRow>)}
  //               </TableBody>
  //             </Table>
  //           </TableContainer>
  //         </Section>
  //       </PageWrapper>

  //       <PageWrapper innerRef={pageRefs.page4}></PageWrapper>
  //       <PageWrapper innerRef={pageRefs.page5}></PageWrapper>

  //       <Dialog open={openSlip} onClose={handleCloseSlip} maxWidth="sm" fullWidth><DialogTitle><Box display="flex" alignItems="center" justifyContent="space-between"><Typography variant="h6" color="#673AB7">Salary Slip Preview</Typography><IconButton onClick={handleCloseSlip}><CloseIcon /></IconButton></Box></DialogTitle><DialogContent dividers>{selectedSlip ? (<Box><Box ref={slipPreviewRef} sx={{ p: 2 }}><Box display="flex" alignItems="center" justifyContent="space-between" mb={2}><Box><Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>{employee_info?.full_name || 'N/A'}</Typography><Typography variant="body2">{employee_info?.employee_id ? `Employee ID: ${employee_info.employee_id}` : ''}</Typography></Box>{vetrinaLogo && (<img src={vetrinaLogo} alt="Company Logo" crossOrigin="anonymous" style={{ height: 48, objectFit: 'contain' }} />)}</Box><Box sx={{ borderTop: '1px solid rgba(0,0,0,0.08)', pt: 2 }}><Grid container spacing={1}><Grid item xs={6}><Typography variant="body2" sx={{ fontWeight: 'bold' }}>Designation</Typography></Grid><Grid item xs={6}><Typography variant="body2">{selectedSlip.designation}</Typography></Grid><Grid item xs={6}><Typography variant="body2" sx={{ fontWeight: 'bold' }}>Level</Typography></Grid><Grid item xs={6}><Typography variant="body2">{selectedSlip.level}</Typography></Grid><Grid item xs={6}><Typography variant="body2" sx={{ fontWeight: 'bold' }}>Financial Year</Typography></Grid><Grid item xs={6}><Typography variant="body2">{selectedSlip.year}</Typography></Grid><Grid item xs={6}><Typography variant="body2" sx={{ fontWeight: 'bold' }}>W.E.F</Typography></Grid><Grid item xs={6}><Typography variant="body2">{selectedSlip.wef}</Typography></Grid><Grid item xs={6}><Typography variant="body2" sx={{ fontWeight: 'bold' }}>Basic + DA</Typography></Grid><Grid item xs={6}><Typography variant="body2">{formatCurrency(selectedSlip.basic_plus_da)}</Typography></Grid><Grid item xs={6}><Typography variant="body2" sx={{ fontWeight: 'bold' }}>Gross Salary</Typography></Grid><Grid item xs={6}><Typography variant="body2">{formatCurrency(selectedSlip.gross_salary)}</Typography></Grid><Grid item xs={6}><Typography variant="body2" sx={{ fontWeight: 'bold' }}>CTC</Typography></Grid><Grid item xs={6}><Typography variant="body2">{formatCurrency(selectedSlip.ctc)}</Typography></Grid></Grid></Box></Box></Box>) : (<Typography>No slip data available.</Typography>)}</DialogContent><DialogActions>{selectedSlip?.slipUrl && (<Button onClick={() => handleOpenOriginalSlip(selectedSlip)} variant="outlined" startIcon={<DownloadIcon />}>Open Original</Button>)}<Button onClick={handleDownloadSlip} variant="contained" startIcon={<DownloadIcon />} sx={{ backgroundColor: "#673AB7", "&:hover": { backgroundColor: "#512DA8" } }}>Download PDF</Button><Button onClick={handleCloseSlip} variant="outlined">Close</Button></DialogActions></Dialog>
  //     </>
  //   );
  // };

  // const EmployeeDetail = () => {
  //   const [selectedItem, setSelectedItem] = useState('Details');
  //   const [employeeData, setEmployeeData] = useState(null);
  //   const [loading, setLoading] = useState(true);
  //   const [error, setError] = useState(null);
  //   const [openPrintDialog, setOpenPrintDialog] = useState(false);
  //   const [printableData, setPrintableData] = useState(null);
  //   const [isPrintableLoading, setIsPrintableLoading] = useState(false);
  //   const page1Ref = useRef(null);
  //   const page2Ref = useRef(null);
  //   const page3Ref = useRef(null);
  //   const page4Ref = useRef(null);
  //   const page5Ref = useRef(null);
  //   const pageRefs = useMemo(() => ({ page1: page1Ref, page2: page2Ref, page3: page3Ref, page4: page4Ref, page5: page5Ref }), []);
  //   const { setEmployeeId } = useContext(EmployeeContext);
  //   const { id } = useParams();
  //   const navigate = useNavigate();

  //   useEffect(() => {
  //     if (id) setEmployeeId(id);
  //   }, [id, setEmployeeId]);

  //   // ***** THIS IS THE CORRECTED HOOK *****
  //   useEffect(() => {
  //     // If the id from useParams is not yet available, do nothing and wait.
  //     // This prevents showing a premature error message on the initial render
  //     // while the router is still populating the params.
  //     if (!id) {
  //       return;
  //     }

  //     setLoading(true);
  //     setError(null);
  //     const controller = new AbortController();

  //     axiosInstance.get(`api/edit_employee/${id}/`, { signal: controller.signal, handleErrorLocally: true })
  //       .then(res => {
  //         if (res.data?.data?.length) {
  //           setEmployeeData(res.data.data[0]);
  //         } else {
  //           // If the API returns no data for a valid ID, then it's a "not found" error.
  //           setError("Employee not found.");
  //         }
  //       })
  //       .catch(err => {
  //         // Ignore errors from the request being cancelled (e.g., component unmounts quickly).
  //         if (err.name === 'CanceledError' || err.message === 'canceled') return;
          
  //         console.error("Error fetching employee data:", err);
  //         setError("Failed to load employee data.");
  //       })
  //       .finally(() => {
  //         setLoading(false);
  //       });

  //     // Cleanup function to cancel the request if the component unmounts.
  //     return () => controller.abort();
  //   }, [id]); // This hook re-runs only when the 'id' changes.

  //   const handleOpenPrintDialog = () => {
  //     if (!id) {
  //       Swal.fire("Error", "Employee user ID is not available to fetch details.", "error");
  //       return;
  //     }
  //     setIsPrintableLoading(true);
  //     setOpenPrintDialog(true);
  //     axiosInstance.get(`api/employee/${id}/`, { handleErrorLocally: true })
  //       .then(res => {
  //         const payload = res.data || {};
  //         let salaryData = [];
  //         if (payload.salary_history && Array.isArray(payload.salary_history) && payload.salary_history.length > 0) {
  //             salaryData = payload.salary_history;
  //         } else if (payload.compensation && typeof payload.compensation === 'object' && Object.keys(payload.compensation).length > 0) {
  //             salaryData = [payload.compensation];
  //         }
  //         const normalized = {
  //           employee_info: payload.employee_info || { full_name: payload.full_name || payload.emp_name, profile_photo: payload.profile_photo || payload.photo, employee_id: payload.employee_id || payload.emp_id },
  //           personal_details: payload.personal_details || payload.personal || {},
  //           assets: payload.assets || [],
  //           rewards: payload.rewards || [],
  //           salary_history: salaryData,
  //           nearest_police_station: payload.nearest_police_station || {},
  //           emergency_contact: payload.emergency_contact || {},
  //           work_details: payload.work_details || {},
  //           compensation_details: payload.compensation_details || {},
  //           bank_details: payload.bank_details || {},
  //           employee_journey: payload.employee_journey || {}
  //         };
  //         setPrintableData(normalized);
  //       })
  //       .catch(err => {
  //         console.error("Error fetching printable employee data:", err);
  //         Swal.fire("Error", "Failed to load printable details.", "error");
  //         setOpenPrintDialog(false);
  //       })
  //       .finally(() => setIsPrintableLoading(false));
  //   };

  //   const handleDownloadPdf = async () => {
  //     const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  //     const addPageContent = async (ref, pageNum) => {
  //       if (ref.current) {
  //         const hasContent = ref.current.querySelector('h6');
  //         if (!hasContent) return;
  //         if (pageNum > 1) pdf.addPage();
  //         try {
  //           const canvas = await html2canvas(ref.current, { scale: 2, useCORS: true, logging: false });
  //           const imgData = canvas.toDataURL('image/png');
  //           const pdfWidth = pdf.internal.pageSize.getWidth();
  //           const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
  //           const pageHeightLimit = pdf.internal.pageSize.getHeight();
  //           pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, Math.min(pdfHeight, pageHeightLimit));
  //         } catch (err) {
  //           console.error('html2canvas error:', err);
  //           Swal.fire('Error', 'Failed to capture page for PDF (possible cross-origin image).', 'error');
  //         }
  //       }
  //     };
  //     let pagesAdded = 0;
  //     const processPage = async (ref) => {
  //       if (ref.current?.querySelector('h6')) {
  //         pagesAdded++;
  //         await addPageContent(ref, pagesAdded);
  //       }
  //     };
  //     await processPage(pageRefs.page1);
  //     await processPage(pageRefs.page2);
  //     await processPage(pageRefs.page3);
  //     await processPage(pageRefs.page4);
  //     await processPage(pageRefs.page5);
  //     pdf.save(`${employeeData?.emp_name || 'employee'}-details.pdf`);
  //   };

  //   if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress /></Box>;
  //   if (error) return <Alert severity="error" sx={{ m: 2 }}>{error}</Alert>;

  //   return (
  //     <>
  //       <Box sx={{ flexGrow: 1, p: 2 }}>
  //         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
  //           <Typography variant="h4" color='#8C257C ' component="h1" fontWeight="bold" mb={5}>Employee Profile</Typography>
  //           <Button variant="contained" onClick={() => navigate(-1)} startIcon={<ArrowBackIcon />} sx={{ backgroundColor: '#8C257C', '&:hover': { backgroundColor: '#8C257C' } }}>Back</Button>
  //         </Box>
  //         <Grid container spacing={2}>
  //           <Grid item xs={12} md={4}>
  //             <Paper elevation={3} sx={{ p: 2 }}>
  //               <Box display="flex" alignItems="center" mb={2}>
  //                 <Avatar src={employeeData?.profile_photo} alt={employeeData?.emp_name} sx={{ width: 56, height: 56, mr: 2 }} imgProps={{ crossOrigin: 'anonymous' }}>{getInitials(employeeData?.emp_name)}</Avatar>
  //                 <Box>
  //                   <Typography variant="h6" color='#8C257C' fontWeight="bold">{employeeData?.emp_name || "Employee Name"}</Typography>
  //                   <Typography variant="body2" color="textSecondary">{employeeData?.designation || "Designation"}</Typography>
  //                 </Box>
  //               </Box>
  //               <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', mb: 2 }}>
  //                 <Box display="flex" alignItems="center"><SupervisorAccount sx={{ mr: 1, color: 'text.secondary' }} /><Typography color='#8C257C'>Manager: {employeeData?.manager || "N/A"}</Typography></Box>
  //                 <Button variant="contained" onClick={handleOpenPrintDialog} sx={{ mt: 1.5, backgroundColor: '#8C257C ', '&:hover': { backgroundColor: '#8C257C' } }}>View Details</Button>
  //               </Box>
  //               <List>
  //                 {sidebarItems.map((item, index) => (<ListItem key={index} button selected={selectedItem === item.text} onClick={() => setSelectedItem(item.text)}><ListItemIcon>{item.icon}</ListItemIcon><ListItemText primary={item.text} primaryTypographyProps={{ fontSize: '14px' }} /></ListItem>))}
  //               </List>
  //             </Paper>
  //           </Grid>
  //           <Grid item xs={12} md={8}><Paper elevation={3} sx={{ p: 2 }}>{componentMap[selectedItem]}</Paper></Grid>
  //         </Grid>
  //       </Box>
  //       <Dialog open={openPrintDialog} onClose={() => setOpenPrintDialog(false)} fullWidth maxWidth="md">
  //         <DialogTitle><Typography variant="h6" color="#8C257C" fontWeight="bold">Employee Details</Typography><IconButton onClick={() => setOpenPrintDialog(false)} aria-label="Close dialog" sx={{ position: 'absolute', right: 8, top: 8 }}><CloseIcon /></IconButton></DialogTitle>
  //         <DialogContent dividers>{isPrintableLoading ? (<Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}><CircularProgress /></Box>) : (<PrintableView pageRefs={pageRefs} data={printableData} />)}</DialogContent>
  //         <DialogActions><Button onClick={handleDownloadPdf} variant="contained" startIcon={<DownloadIcon />} disabled={isPrintableLoading} sx={{ backgroundColor: "#673AB7", "&:hover": { backgroundColor: "#512DA8" } }}>Download PDF</Button><Button onClick={() => setOpenPrintDialog(false)} variant="contained" sx={{ backgroundColor: "#f44336", "&:hover": { backgroundColor: "#d32f2f" } }}>Close</Button></DialogActions>
  //       </Dialog>
  //     </>
  //   );
  // };

  // export default EmployeeDetail;


//   import React, { useState, useEffect, useContext, useRef, useMemo } from 'react';
// import { EmployeeContext } from './EmployeeContext';
// import axiosInstance from "../../utils/axiosInstance";
// import {
//   Box, Grid, Paper, Typography, Avatar, List, ListItem,
//   ListItemIcon, ListItemText, CircularProgress, Alert, IconButton,
//   Dialog, DialogTitle, DialogContent, DialogActions, Button,
//   TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper as MuiPaper
// } from '@mui/material';
// import { useParams, useNavigate } from 'react-router-dom';
// import {
//   Lock, Info, AccountBox, Image, AccountBalance,
//   Description, SupervisorAccount, Print as PrintIcon,
//   Close as CloseIcon, Download as DownloadIcon, Group as GroupIcon,
//   ArrowBack as ArrowBackIcon
// } from '@mui/icons-material';
// import jsPDF from 'jspdf';
// import html2canvas from 'html2canvas';
// import Swal from 'sweetalert2';
// import Contract from './Contract';
// import BasicInformation from './BasicInformation';
// import PersonalInformation from './PersonalInformation';
// import ProfilePicture from './ProfilePicture';
// import AccountInformation from './AccountInformation';
// import Documents from './Documents';
// import FamilyDetails from './FamilyDetails';
// import vetrinaLogo from '../../Assests/vetrinalogo.jpg';

// const allMonths = [
//   "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December",
// ];

// const transformPayslipDetails = (apiDetail) => {
//   if (!apiDetail) return null;
//   const netPay = apiDetail.net_pay || 0;
//   const totalEarnings = apiDetail.total_earnings || 0;
//   const totalDeductions = apiDetail.total_deduction || 0;

//   return {
//     name: apiDetail.employee_name,
//     netPayable: netPay,
//     salaryMonth: `${allMonths[apiDetail.month - 1]}, ${apiDetail.year}`,
//     payDate: new Date(apiDetail.salary_payment_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
//     details: {
//       employeeId: apiDetail.employee_id,
//       department: apiDetail.department_name,
//       dateOfJoining: apiDetail.date_of_joining ? new Date(apiDetail.date_of_joining).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : 'N/A',
//       designation: apiDetail.designation_name,
//       leaves: 'N/A',
//       location: apiDetail.location || 'N/A',
//       payableDays: apiDetail.payable_days,
//       bankName: apiDetail.bank_name || 'N/A',
//       bankAcNo: apiDetail.bank_account_number || 'N/A',
//       pfNo: apiDetail.pf_number || 'N/A',
//       uanNo: apiDetail.uan_number || 'N/A',
//       esicNo: apiDetail.esic_number || 'N/A',
//       panNo: apiDetail.pan_number || 'N/A',
//       basic: apiDetail.basic_plus_da || 0,
//       hra: apiDetail.hra || 0,
//       medical: apiDetail.medical_allowance || 0,
//       conveyance: apiDetail.conveyance_allowance || 0,
//       arrears: apiDetail.arrears || 0,
//       pf: apiDetail.pf || 0,
//       esic: apiDetail.esic || 0,
//       pt: apiDetail.pt || 0,
//       tds: apiDetail.tds || 0,
//       otherDeduction: apiDetail.other_deduction || 0,
//       mlwf: apiDetail.mlwf || 0,
//       advance: 0,
//       totalEarnings: totalEarnings,
//       totalDeductions: totalDeductions,
//     }
//   };
// };

// const componentMap = {
//   'Details': <Contract />,
//   'Basic Information': <BasicInformation />,
//   'Personal Information': <PersonalInformation />,
//   'Profile Picture': <ProfilePicture />,
//   'Account Information': <AccountInformation />,
//   'Documents': <Documents />,
//   'Family Details': <FamilyDetails />,
// };

// const sidebarItems = [
//   { icon: <Lock />, text: 'Details' },
//   { icon: <Info />, text: 'Basic Information' },
//   { icon: <AccountBox />, text: 'Personal Information' },
//   { icon: <Image />, text: 'Profile Picture' },
//   { icon: <AccountBalance />, text: 'Account Information' },
//   { icon: <Description />, text: 'Documents' },
//   { icon: <GroupIcon />, text: 'Family Details' },
// ];

// const getInitials = (name = "") => {
//   const nameParts = name.split(' ').filter(Boolean);
//   if (nameParts.length === 0) return '...';
//   if (nameParts.length === 1) return nameParts[0][0].toUpperCase();
//   return (nameParts[0][0] + nameParts[nameParts.length - 1][0]).toUpperCase();
// };

// const PrintableView = ({ data, pageRefs }) => {
//   const [openPayslipModal, setOpenPayslipModal] = useState(false);
//   const [selectedPayslipRecord, setSelectedPayslipRecord] = useState(null);
//   const [payslipLoading, setPayslipLoading] = useState(false);
//   const payslipRef = useRef(null);

//   if (!data) return null;

//   const {
//     employee_info, personal_details, nearest_police_station,
//     work_details, compensation_details, bank_details,
//     assets, employee_journey, rewards, salary_history
//   } = data;

//   const Section = ({ title, children }) => (
//     <Box mb={3}>
//       <Typography variant="h6" gutterBottom sx={{ borderBottom: 1, borderColor: 'divider', pb: 1, mb: 2, color: '#673AB7' }}>
//         {title}
//       </Typography>
//       {children}
//     </Box>
//   );

//   const DetailItem = ({ label, value }) => (
//     <Grid item xs={12} sm={6}>
//       <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 'bold' }}>
//         {label}
//       </Typography>
//       <Typography variant="body1" sx={{ pl: 1, color: '#000' }}>
//         {value || 'N/A'}
//       </Typography>
//     </Grid>
//   );

//   const PageWrapper = ({ children, innerRef }) => (
//     <Box ref={innerRef} sx={{ p: 3, pt: 5, pb: 5, position: 'relative', pageBreakAfter: 'always' }}>
//       {children}
//     </Box>
//   );

//   const hasValidData = (row) => {
//     if (!row) return false;
//     return Object.values(row).some((val) => val !== null && val !== "" && val !== undefined);
//   };

//   const formatCurrency = (value) => {
//     if (value === null || value === undefined || value === '' || isNaN(Number(value))) {
//       return 'N/A';
//     }
//     return new Intl.NumberFormat('en-IN', {
//       style: 'currency',
//       currency: 'INR',
//       minimumFractionDigits: 0,
//       maximumFractionDigits: 2,
//     }).format(Number(value));
//   };

//   const handleFetchAndOpenPayslip = async (row) => {
//     setOpenPayslipModal(true);
//     setPayslipLoading(true);
//     setSelectedPayslipRecord(null);

//     // Get Employee ID from the main employee info data
//     const empId = employee_info?.employee_id;

//     try {
//       if (!empId) throw new Error("Employee ID not found.");

//       // UPDATED API CALL: Using the new endpoint provided
//       const response = await axiosInstance.get(`https://tdtlworld.com/hrms-backend/api/view_employee_salary_slip/?employee_id=${empId}`);

//       if (response.data.status === 'success' && response.data.data.length > 0) {
//         // transformPayslipDetails maps the exact fields from your new response payload
//         const transformedDetails = transformPayslipDetails(response.data.data[0]);
//         setSelectedPayslipRecord(transformedDetails);
//       } else {
//         throw new Error('No payslip data found');
//       }
//     } catch (error) {
//       console.error("Failed to fetch payslip details:", error);
//       setOpenPayslipModal(false);
//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: 'Could not load payslip details.',
//         timer: 3000,
//         showConfirmButton: false,
//       });
//     } finally {
//       setPayslipLoading(false);
//     }
//   };

//   const handleClosePayslipModal = () => {
//     setOpenPayslipModal(false);
//     setSelectedPayslipRecord(null);
//   };

//   const handleDownloadPayslipPdf = () => {
//     const input = payslipRef.current;
//     if (!input) return;
//     const actions = input.querySelector('.payslip-actions-buttons');
//     if (actions) actions.style.display = 'none';

//     html2canvas(input, { scale: 2 }).then((canvas) => {
//       if (actions) actions.style.display = 'flex';
//       const imgData = canvas.toDataURL('image/png');
//       const pdf = new jsPDF('p', 'mm', 'a4');
//       const pdfWidth = pdf.internal.pageSize.getWidth();
//       const pdfHeight = pdf.internal.pageSize.getHeight();
//       const ratio = canvas.width / canvas.height;
//       let newWidth = pdfWidth; let newHeight = newWidth / ratio;
//       if (newHeight > pdfHeight) { newHeight = pdfHeight; newWidth = newHeight * ratio; }
//       const x = (pdfWidth - newWidth) / 2;
//       pdf.addImage(imgData, 'PNG', x, 0, newWidth, newHeight);
//       pdf.save(`Payslip-${selectedPayslipRecord.name.replace(' ', '_')}-${selectedPayslipRecord.salaryMonth.replace(', ', '_')}.pdf`);
//     });
//   };

//   const handleOpenOriginalSlip = (row) => {
//     if (!row?.slipUrl) return;
//     window.open(row.slipUrl, '_blank', 'noopener,noreferrer');
//   };

//   return (
//     <>
//       <PageWrapper innerRef={pageRefs.page1}>
//         <Box display="flex" alignItems="center" justifyContent="space-between" mb={4}>
//           <Box display="flex" alignItems="center">
//             <Avatar src={employee_info?.profile_photo} sx={{ width: 80, height: 80, mr: 3 }} imgProps={{ crossOrigin: 'anonymous' }} />
//             <Box>
//               <Typography variant="h5" fontWeight="bold">{employee_info?.full_name || 'N/A'}</Typography>
//               <Typography variant="body1" color="text.secondary">Employee ID: {employee_info?.employee_id || 'N/A'}</Typography>
//             </Box>
//           </Box>
//           <img src={vetrinaLogo} alt="Company Logo" crossOrigin="anonymous" style={{ height: '60px', width: 'auto' }} />
//         </Box>
//         <Section title="Employee Information">
//           <Grid container spacing={2}>
//             <DetailItem label="Department" value={employee_info?.department} />
//             <DetailItem label="Designation" value={employee_info?.designation} />
//             <DetailItem label="Division" value={employee_info?.division} />
//             <DetailItem label="Sub Division" value={employee_info?.sub_division} />
//             <DetailItem label="Head Quarter" value={employee_info?.head_quarter} />
//           </Grid>
//         </Section>
//         <Section title="Personal Details">
//           <Grid container spacing={2}>
//             <DetailItem label="Contact Number" value={personal_details?.contact_number} />
//             <DetailItem label="Email" value={personal_details?.email} />
//             <DetailItem label="Date of Birth" value={personal_details?.date_of_birth} />
//             <DetailItem label="Age" value={personal_details?.age} />
//             <DetailItem label="Gender" value={personal_details?.gender} />
//             <DetailItem label="Marital Status" value={personal_details?.marital_status} />
//             <DetailItem label="Blood Group" value={personal_details?.blood_group} />
//           </Grid>
//         </Section>
//       </PageWrapper>

//       <PageWrapper innerRef={pageRefs.page2}>
//         <Section title="Correspondence Address">
//           <Grid container spacing={2}>
//             <DetailItem label="Address 2" value={personal_details?.correspondence_address?.address_2} />
//             <DetailItem label="City" value={personal_details?.correspondence_address?.city} />
//             <DetailItem label="State" value={personal_details?.correspondence_address?.state} />
//             <DetailItem label="Country" value={personal_details?.correspondence_address?.country} />
//             <DetailItem label="Zipcode" value={personal_details?.correspondence_address?.zipcode} />
//           </Grid>
//         </Section>
//         <Section title="Nearest Police Station">
//           <Grid container spacing={2}>
//             <DetailItem label="Address" value={nearest_police_station?.address} />
//             <DetailItem label="Country" value={nearest_police_station?.country} />
//             <DetailItem label="State" value={nearest_police_station?.state} />
//             <DetailItem label="District" value={nearest_police_station?.district} />
//             <DetailItem label="Tehsil" value={nearest_police_station?.tehsil} />
//             <DetailItem label="Village" value={nearest_police_station?.village} />
//             <DetailItem label="Pincode" value={nearest_police_station?.pincode} />
//           </Grid>
//         </Section>
//       </PageWrapper>

//       <PageWrapper innerRef={pageRefs.page3}>
//         <Section title="Work Details">
//           <Grid container spacing={2}>
//             <DetailItem label="Date of Joining" value={work_details?.date_of_joining} />
//             <DetailItem label="Date of Promotion" value={work_details?.date_of_promotion} />
//             <DetailItem label="Status" value={work_details?.employee_status} />
//           </Grid>
//         </Section>
//         <Section title="Compensation Details">
//           <Grid container spacing={2}>
//             <DetailItem label="Gross Salary" value={compensation_details?.current_salary} />
//             <DetailItem label="Current CTC" value={compensation_details?.current_ctc} />
//             <DetailItem label="Joining Salary" value={compensation_details?.joining_salary} />
//             <DetailItem label="Joining CTC" value={compensation_details?.joining_ctc} />
//           </Grid>
//         </Section>
//         <Section title="Bank Details">
//           <Grid container spacing={2}>
//             <DetailItem label="Account Title" value={bank_details?.account_title} />
//             <DetailItem label="Account Number" value={bank_details?.account_number} />
//             <DetailItem label="Bank Name" value={bank_details?.bank_name} />
//             <DetailItem label="IFSC Code" value={bank_details?.ifsc_code} />
//             <DetailItem label="Swift Code" value={bank_details?.swift_code} />
//             <DetailItem label="Bank Branch" value={bank_details?.bank_branch} />
//           </Grid>
//         </Section>
//         <Section title="Employee Journey">
//           <Grid container spacing={2}>
//             <DetailItem label="Date of Joining" value={employee_journey?.date_of_joining} />
//             <DetailItem label="Department" value={employee_journey?.department} />
//             <DetailItem label="Designation" value={employee_journey?.designation} />
//             <DetailItem label="Division" value={employee_journey?.division} />
//             <DetailItem label="Sub Division" value={employee_journey?.sub_division} />
//             <DetailItem label="Head Quarter" value={employee_journey?.head_quarter} />
//             <DetailItem label="Level" value={employee_journey?.level} />
//             <DetailItem label="Compensation" value={employee_journey?.compensation} />
//             <DetailItem label="Duration" value={employee_journey?.duration} />
//           </Grid>
//         </Section>
//         <Section title="Salary Details">
//           <Grid container spacing={2}><DetailItem label="Note" value={'Salary history is available below.'} /></Grid>
//         </Section>
//         <Section title="Assigned Assets">
//           <TableContainer component={MuiPaper} sx={{ border: '1px solid rgba(224,224,224,1)' }}>
//             <Table size="small">
//               <TableHead><TableRow sx={{ backgroundColor: '#f5f5f5' }}><TableCell sx={{ fontWeight: 'bold', border: '1px solid rgba(224,224,224,1)' }}>Sr. No.</TableCell><TableCell sx={{ fontWeight: 'bold', border: '1px solid rgba(224,224,224,1)' }}>Asset Name</TableCell><TableCell sx={{ fontWeight: 'bold', border: '1px solid rgba(224,224,224,1)' }}>Category</TableCell><TableCell sx={{ fontWeight: 'bold', border: '1px solid rgba(224,224,224,1)' }}>Brand</TableCell><TableCell sx={{ fontWeight: 'bold', border: '1px solid rgba(224,224,224,1)' }}>Manufacturer</TableCell><TableCell sx={{ fontWeight: 'bold', border: '1px solid rgba(224,224,224,1)' }}>Serial Number</TableCell></TableRow></TableHead>
//               <TableBody>
//                 {(assets || []).filter(hasValidData).map((asset, index) => (<TableRow key={index}><TableCell sx={{ border: '1px solid rgba(224,224,224,1)' }}>{index + 1}</TableCell><TableCell sx={{ border: '1px solid rgba(224,224,224,1)' }}>{asset.assets_name || 'N/A'}</TableCell><TableCell sx={{ border: '1px solid rgba(224,224,224,1)' }}>{asset.category_name || 'N/A'}</TableCell><TableCell sx={{ border: '1px solid rgba(224,224,224,1)' }}>{asset.brand_name || 'N/A'}</TableCell><TableCell sx={{ border: '1px solid rgba(224,224,224,1)' }}>{asset.manufacturer || 'N/A'}</TableCell><TableCell sx={{ border: '1px solid rgba(224,224,224,1)' }}>{asset.serial_number || 'N/A'}</TableCell></TableRow>))}
//                 {(!(assets || []).filter(hasValidData).length) && (<TableRow><TableCell colSpan={6} sx={{ border: '1px solid rgba(224,224,224,1)', textAlign: 'center' }}>Assets Not Allocated</TableCell></TableRow>)}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         </Section>
//         <Section title="Reward & Recognition">
//           <TableContainer component={MuiPaper} sx={{ border: '1px solid rgba(224,224,224,1)' }}>
//             <Table size="small">
//               <TableHead><TableRow sx={{ backgroundColor: '#f5f5f5' }}><TableCell sx={{ fontWeight: 'bold', border: '1px solid rgba(224,224,224,1)' }}>Sr No.</TableCell><TableCell sx={{ fontWeight: 'bold', border: '1px solid rgba(224,224,224,1)' }}>Name of Reward</TableCell><TableCell sx={{ fontWeight: 'bold', border: '1px solid rgba(224,224,224,1)' }}>Month/Year</TableCell><TableCell sx={{ fontWeight: 'bold', border: '1px solid rgba(224,224,224,1)' }}>Cash Prize</TableCell></TableRow></TableHead>
//               <TableBody>
//                 {(rewards && rewards.length > 0) ? (rewards.map((r, i) => (<TableRow key={i}><TableCell sx={{ border: '1px solid rgba(224,224,224,1)' }}>{i + 1}</TableCell><TableCell sx={{ border: '1px solid rgba(224,224,224,1)' }}>{r.award_type || 'N/A'}</TableCell><TableCell sx={{ border: '1px solid rgba(224,224,224,1)' }}>{r.month_year || 'N/A'}</TableCell><TableCell sx={{ border: '1px solid rgba(224,224,224,1)' }}>{formatCurrency(r.award_cash)}</TableCell></TableRow>))) : (<TableRow><TableCell colSpan={4} sx={{ border: '1px solid rgba(224,224,224,1)', textAlign: 'center' }}>No Rewards Information Available</TableCell></TableRow>)}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         </Section>
//         <Section title="Compensation – View">
//           <TableContainer component={MuiPaper} sx={{ border: '1px solid rgba(224,224,224,1)' }}>
//             <Table size="small">
//               <TableHead><TableRow sx={{ backgroundColor: '#f5f5f5' }}><TableCell sx={{ fontWeight: 'bold', border: '1px solid rgba(224,224,224,1)' }}>Sr. No.</TableCell><TableCell sx={{ fontWeight: 'bold', border: '1px solid rgba(224,224,224,1)' }}>Designation</TableCell><TableCell sx={{ fontWeight: 'bold', border: '1px solid rgba(224,224,224,1)' }}>Level</TableCell><TableCell sx={{ fontWeight: 'bold', border: '1px solid rgba(224,224,224,1)' }}>Financial Year</TableCell><TableCell sx={{ fontWeight: 'bold', border: '1px solid rgba(224,224,224,1)' }}>W.E.F</TableCell><TableCell sx={{ fontWeight: 'bold', border: '1px solid rgba(224,224,224,1)' }}>Basic + DA</TableCell><TableCell sx={{ fontWeight: 'bold', border: '1px solid rgba(224,224,224,1)' }}>Gross Salary</TableCell><TableCell sx={{ fontWeight: 'bold', border: '1px solid rgba(224,224,224,1)' }}>CTC</TableCell><TableCell sx={{ fontWeight: 'bold', border: '1px solid rgba(224,224,224,1)' }}>View Salary slip</TableCell></TableRow></TableHead>
//               <TableBody>
//                 {(salary_history && salary_history.length > 0) ? (salary_history.map((row, index) => (<TableRow key={index}><TableCell sx={{ border: '1px solid rgba(224,224,224,1)' }}>{index + 1}</TableCell><TableCell sx={{ border: '1px solid rgba(224,224,224,1)' }}>{row.designation}</TableCell><TableCell sx={{ border: '1px solid rgba(224,224,224,1)' }}>{row.level}</TableCell><TableCell sx={{ border: '1px solid rgba(224,224,224,1)' }}>{row.year}</TableCell><TableCell sx={{ border: '1px solid rgba(224,224,224,1)' }}>{row.wef}</TableCell><TableCell sx={{ border: '1px solid rgba(224,224,224,1)' }}>{formatCurrency(row.basic_plus_da)}</TableCell><TableCell sx={{ border: '1px solid rgba(224,224,224,1)' }}>{formatCurrency(row.gross_salary)}</TableCell><TableCell sx={{ border: '1px solid rgba(224,224,224,1)' }}>{formatCurrency(row.ctc)}</TableCell><TableCell sx={{ border: '1px solid rgba(224,224,224,1)' }}><Box sx={{ display: 'flex', gap: 1 }}><Button size="small" onClick={() => handleFetchAndOpenPayslip(row)} sx={{ textTransform: 'none' }}>View</Button>{row.slipUrl && (<Button size="small" onClick={() => handleOpenOriginalSlip(row)} sx={{ textTransform: 'none' }}>Open Original</Button>)}</Box></TableCell></TableRow>))) : (<TableRow><TableCell colSpan={9} sx={{ border: '1px solid rgba(224,224,224,1)', textAlign: 'center' }}>No Compensation Information Available</TableCell></TableRow>)}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         </Section>
//       </PageWrapper>

//       <PageWrapper innerRef={pageRefs.page4}></PageWrapper>
//       <PageWrapper innerRef={pageRefs.page5}></PageWrapper>

//       <Dialog open={openPayslipModal} onClose={handleClosePayslipModal} maxWidth="md" fullWidth>
//         <DialogTitle sx={{ color: '#8C257C', fontWeight: 'bold' }}>Pay Slip</DialogTitle>
//         <Box ref={payslipRef}>
//           <DialogContent>
//             {payslipLoading ? (
//               <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 400 }}><CircularProgress sx={{ color: '#8C257C' }} /></Box>
//             ) : selectedPayslipRecord ? (
//               <Box sx={{ p: { xs: 1, sm: 2 }, border: "2px solid #000", borderRadius: 1, bgcolor: "background.paper" }}>
//                 <Grid container spacing={2} alignItems="center" justifyContent="space-between">
//                   <Grid item xs={4}>
//                     <img src={vetrinaLogo} alt="Vetrina Logo" style={{ maxWidth: '140px', height: 'auto' }} />
//                   </Grid>
//                   <Grid item xs={8} sx={{ textAlign: 'right' }}>
//                     <Typography variant="h5" sx={{ fontWeight: 'bold' }} gutterBottom>
//                       Vetrina Healthcare Pvt. Ltd.
//                     </Typography>
//                     <Typography variant="body2">Pay Slip For Month: {selectedPayslipRecord.salaryMonth}</Typography>
//                     <Typography variant="body2">Salary Payment Date: {selectedPayslipRecord.payDate}</Typography>
//                   </Grid>
//                 </Grid>
//                 <Grid container spacing={2} sx={{ mt: 2 }}>
//                   <Grid item xs={6}>
//                     <Typography variant="body2"><strong>Employee ID:</strong> {selectedPayslipRecord.details.employeeId}</Typography>
//                     <Typography variant="body2"><strong>Employee Name:</strong> {selectedPayslipRecord.name}</Typography>
//                     <Typography variant="body2"><strong>Department:</strong> {selectedPayslipRecord.details.department}</Typography>
//                     <Typography variant="body2"><strong>Date of Joining:</strong> {selectedPayslipRecord.details.dateOfJoining}</Typography>
//                     <Typography variant="body2"><strong>Designation:</strong> {selectedPayslipRecord.details.designation}</Typography>
//                     <Typography variant="body2"><strong>Leaves:</strong> {selectedPayslipRecord.details.leaves}</Typography>
//                     <Typography variant="body2"><strong>Location:</strong> {selectedPayslipRecord.details.location}</Typography>
//                     <Typography variant="body2"><strong>Payable Days:</strong> {selectedPayslipRecord.details.payableDays}</Typography>
//                   </Grid>
//                   <Grid item xs={6}>
//                     <Typography variant="body2"><strong>Bank Name:</strong> {selectedPayslipRecord.details.bankName}</Typography>
//                     <Typography variant="body2"><strong>Bank A/c No:</strong> {selectedPayslipRecord.details.bankAcNo}</Typography>
//                     <Typography variant="body2"><strong>PF No:</strong> {selectedPayslipRecord.details.pfNo}</Typography>
//                     <Typography variant="body2"><strong>UAN No:</strong> {selectedPayslipRecord.details.uanNo}</Typography>
//                     <Typography variant="body2"><strong>ESIC No:</strong> {selectedPayslipRecord.details.esicNo}</Typography>
//                     <Typography variant="body2"><strong>PAN No:</strong> {selectedPayslipRecord.details.panNo}</Typography>
//                   </Grid>
//                 </Grid>
//                 <TableContainer sx={{ mt: 3, border: "1px solid #000" }}>
//                   <Table size="small">
//                     <TableHead><TableRow><TableCell sx={{ border: "1px solid #000" }}><strong>Earning Title</strong></TableCell><TableCell sx={{ border: "1px solid #000" }} align="right"><strong>Current Month</strong></TableCell><TableCell sx={{ border: "1px solid #000" }}><strong>Deduction Title</strong></TableCell><TableCell sx={{ border: "1px solid #000" }} align="right"><strong>Current Month</strong></TableCell></TableRow></TableHead>
//                     <TableBody>
//                       <TableRow><TableCell sx={{ border: "1px solid #000" }}>Basic + DA</TableCell><TableCell sx={{ border: "1px solid #000" }} align="right">{(selectedPayslipRecord?.details?.basic ?? 0).toFixed(2)}</TableCell><TableCell sx={{ border: "1px solid #000" }}>PF</TableCell><TableCell sx={{ border: "1px solid #000" }} align="right">{(selectedPayslipRecord?.details?.pf ?? 0).toFixed(2)}</TableCell></TableRow>
//                       <TableRow><TableCell sx={{ border: "1px solid #000" }}>HRA</TableCell><TableCell sx={{ border: "1px solid #000" }} align="right">{(selectedPayslipRecord?.details?.hra ?? 0).toFixed(2)}</TableCell><TableCell sx={{ border: "1px solid #000" }}>ESIC</TableCell><TableCell sx={{ border: "1px solid #000" }} align="right">{(selectedPayslipRecord?.details?.esic ?? 0).toFixed(2)}</TableCell></TableRow>
//                       <TableRow><TableCell sx={{ border: "1px solid #000" }}>Medical</TableCell><TableCell sx={{ border: "1px solid #000" }} align="right">{(selectedPayslipRecord?.details?.medical ?? 0).toFixed(2)}</TableCell><TableCell sx={{ border: "1px solid #000" }}>PT</TableCell><TableCell sx={{ border: "1px solid #000" }} align="right">{(selectedPayslipRecord?.details?.pt ?? 0).toFixed(2)}</TableCell></TableRow>
//                       <TableRow><TableCell sx={{ border: "1px solid #000" }}>Conveyance</TableCell><TableCell sx={{ border: "1px solid #000" }} align="right">{(selectedPayslipRecord?.details?.conveyance ?? 0).toFixed(2)}</TableCell><TableCell sx={{ border: "1px solid #000" }}>TDS</TableCell><TableCell sx={{ border: "1px solid #000" }} align="right">{(selectedPayslipRecord?.details?.tds ?? 0).toFixed(2)}</TableCell></TableRow>
//                       <TableRow><TableCell sx={{ border: "1px solid #000" }}>Arrears</TableCell><TableCell sx={{ border: "1px solid #000" }} align="right">{(selectedPayslipRecord?.details?.arrears ?? 0).toFixed(2)}</TableCell><TableCell sx={{ border: "1px solid #000" }}>Other Deduction</TableCell><TableCell sx={{ border: "1px solid #000" }} align="right">{(selectedPayslipRecord?.details?.otherDeduction ?? 0).toFixed(2)}</TableCell></TableRow>
//                       {selectedPayslipRecord?.details?.mlwf > 0 && (
//                         <TableRow>
//                           <TableCell sx={{ border: "1px solid #000" }}></TableCell>
//                           <TableCell sx={{ border: "1px solid #000" }} align="right"></TableCell>
//                           <TableCell sx={{ border: "1px solid #000" }}>MLWF</TableCell>
//                           <TableCell sx={{ border: "1px solid #000" }} align="right">{(selectedPayslipRecord.details.mlwf).toFixed(2)}</TableCell>
//                         </TableRow>
//                       )}
//                       <TableRow><TableCell sx={{ border: "1px solid #000" }}></TableCell><TableCell sx={{ border: "1px solid #000" }} align="right"></TableCell><TableCell sx={{ border: "1px solid #000" }}>Advance</TableCell><TableCell sx={{ border: "1px solid #000" }} align="right">{(selectedPayslipRecord?.details?.advance ?? 0).toFixed(2)}</TableCell></TableRow>
//                       <TableRow><TableCell sx={{ border: "1px solid #000", fontWeight: 'bold' }}>Total</TableCell><TableCell sx={{ border: "1px solid #000", fontWeight: 'bold' }} align="right">{(selectedPayslipRecord?.details?.totalEarnings ?? 0).toFixed(2)}</TableCell><TableCell sx={{ border: "1.2px solid #000", fontWeight: 'bold' }}>Total</TableCell><TableCell sx={{ border: "1.2px solid #000", fontWeight: 'bold' }} align="right">{(selectedPayslipRecord?.details?.totalDeductions ?? 0).toFixed(2)}</TableCell></TableRow>
//                     </TableBody>
//                   </Table>
//                 </TableContainer>
//                 <Box sx={{ mt: 1, px: 1 }}><Typography variant="body2"><strong>Remark:</strong> NA</Typography></Box>
//                 <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
//                   <Typography variant="body2"><strong>Total Earnings:</strong> ₹{(selectedPayslipRecord?.details?.totalEarnings ?? 0).toFixed(2)}</Typography>
//                   <Typography variant="body2"><strong>Total Deductions:</strong> ₹{(selectedPayslipRecord?.details?.totalDeductions ?? 0).toFixed(2)}</Typography>
//                   <Typography variant="body2"><strong>Take Home:</strong> ₹{(selectedPayslipRecord?.netPayable ?? 0).toFixed(2)}</Typography>
//                 </Box>
//                 <Box sx={{ mt: 3, textAlign: "center" }}><Typography variant="body2"><strong>Vetrina Healthcare Pvt. Ltd., Corporate Office - Punyai Pride, 1st Floor, Shivshambho Nagar, Lane 3A, Katraj Kondhwa Road, Katraj, Pune - 411046.</strong></Typography><Typography variant="caption" sx={{ mt: 1, display: "block" }}>This is an electronically generated pay slip and does not require any signature.</Typography></Box>
//               </Box>
//             ) : <Typography>Could not load payslip details.</Typography>}
//           </DialogContent>
//         </Box>
//         <DialogActions className="payslip-actions-buttons">
//           <Button onClick={handleClosePayslipModal} sx={{ color: '#757575' }}>Close</Button>
//           <Button variant="outlined" onClick={() => window.print()} sx={{ color: '#8C257C', borderColor: '#8C257C', '&:hover': { borderColor: '#6d1d60', color: '#6d1d60' } }} disabled={payslipLoading || !selectedPayslipRecord}>Print</Button>
//           <Button variant="contained" onClick={handleDownloadPayslipPdf} sx={{ bgcolor: '#8C257C', color: 'white', '&:hover': { bgcolor: '#6d1d60' } }} disabled={payslipLoading || !selectedPayslipRecord}>Download PDF</Button>
//         </DialogActions>
//       </Dialog>
//     </>
//   );
// };

// const EmployeeDetail = () => {
//   const [selectedItem, setSelectedItem] = useState('Details');
//   const [employeeData, setEmployeeData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [openPrintDialog, setOpenPrintDialog] = useState(false);
//   const [printableData, setPrintableData] = useState(null);
//   const [isPrintableLoading, setIsPrintableLoading] = useState(false);
//   const page1Ref = useRef(null);
//   const page2Ref = useRef(null);
//   const page3Ref = useRef(null);
//   const page4Ref = useRef(null);
//   const page5Ref = useRef(null);
//   const pageRefs = useMemo(() => ({ page1: page1Ref, page2: page2Ref, page3: page3Ref, page4: page4Ref, page5: page5Ref }), []);
//   const { setEmployeeId } = useContext(EmployeeContext);
//   const { id } = useParams();
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (id) setEmployeeId(id);
//   }, [id, setEmployeeId]);

//   useEffect(() => {
//     if (!id) return;
//     setLoading(true);
//     setError(null);
//     const controller = new AbortController();

//     axiosInstance.get(`api/edit_employee/${id}/`, { signal: controller.signal, handleErrorLocally: true })
//       .then(res => {
//         if (res.data?.data?.length) {
//           setEmployeeData(res.data.data[0]);
//         } else {
//           setError("Employee not found.");
//         }
//       })
//       .catch(err => {
//         if (err.name === 'CanceledError' || err.message === 'canceled') return;
//         console.error("Error fetching employee data:", err);
//         setError("Failed to load employee data.");
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//     return () => controller.abort();
//   }, [id]);

//   const handleOpenPrintDialog = () => {
//     if (!id) {
//       Swal.fire("Error", "Employee user ID is not available to fetch details.", "error");
//       return;
//     }
//     setIsPrintableLoading(true);
//     setOpenPrintDialog(true);
//     axiosInstance.get(`api/employee/${id}/`, { handleErrorLocally: true })
//       .then(res => {
//         const payload = res.data || {};
//         let salaryData = [];
//         if (payload.salary_history && Array.isArray(payload.salary_history) && payload.salary_history.length > 0) {
//           salaryData = payload.salary_history;
//         } else if (payload.compensation && typeof payload.compensation === 'object' && Object.keys(payload.compensation).length > 0) {
//           salaryData = [payload.compensation];
//         }
//         const normalized = {
//           employee_info: payload.employee_info || { full_name: payload.full_name || payload.emp_name, profile_photo: payload.profile_photo || payload.photo, employee_id: payload.employee_id || payload.emp_id },
//           personal_details: payload.personal_details || payload.personal || {},
//           assets: payload.assets || [],
//           rewards: payload.rewards || [],
//           salary_history: salaryData,
//           nearest_police_station: payload.nearest_police_station || {},
//           emergency_contact: payload.emergency_contact || {},
//           work_details: payload.work_details || {},
//           compensation_details: payload.compensation_details || {},
//           bank_details: payload.bank_details || {},
//           employee_journey: payload.employee_journey || {}
//         };
//         setPrintableData(normalized);
//       })
//       .catch(err => {
//         console.error("Error fetching printable employee data:", err);
//         Swal.fire("Error", "Failed to load printable details.", "error");
//         setOpenPrintDialog(false);
//       })
//       .finally(() => setIsPrintableLoading(false));
//   };

//   const handleDownloadPdf = async () => {
//     const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
//     const addPageContent = async (ref, pageNum) => {
//       if (ref.current) {
//         const hasContent = ref.current.querySelector('h6');
//         if (!hasContent) return;
//         if (pageNum > 1) pdf.addPage();
//         try {
//           const canvas = await html2canvas(ref.current, { scale: 2, useCORS: true, logging: false });
//           const imgData = canvas.toDataURL('image/png');
//           const pdfWidth = pdf.internal.pageSize.getWidth();
//           const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
//           const pageHeightLimit = pdf.internal.pageSize.getHeight();
//           pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, Math.min(pdfHeight, pageHeightLimit));
//         } catch (err) {
//           console.error('html2canvas error:', err);
//           Swal.fire('Error', 'Failed to capture page for PDF (possible cross-origin image).', 'error');
//         }
//       }
//     };
//     let pagesAdded = 0;
//     const processPage = async (ref) => {
//       if (ref.current?.querySelector('h6')) {
//         pagesAdded++;
//         await addPageContent(ref, pagesAdded);
//       }
//     };
//     await processPage(pageRefs.page1);
//     await processPage(pageRefs.page2);
//     await processPage(pageRefs.page3);
//     await processPage(pageRefs.page4);
//     await processPage(pageRefs.page5);
//     pdf.save(`${employeeData?.emp_name || 'employee'}-details.pdf`);
//   };

//   if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress /></Box>;
//   if (error) return <Alert severity="error" sx={{ m: 2 }}>{error}</Alert>;

//   return (
//     <>
//       <Box sx={{ flexGrow: 1, p: 2 }}>
//         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
//           <Typography variant="h4" color='#8C257C ' component="h1" fontWeight="bold" mb={5}>Employee Profile</Typography>
//           <Button variant="contained" onClick={() => navigate(-1)} startIcon={<ArrowBackIcon />} sx={{ backgroundColor: '#8C257C', '&:hover': { backgroundColor: '#8C257C' } }}>Back</Button>
//         </Box>
//         <Grid container spacing={2}>
//           <Grid item xs={12} md={4}>
//             <Paper elevation={3} sx={{ p: 2 }}>
//               <Box display="flex" alignItems="center" mb={2}>
//                 <Avatar src={employeeData?.profile_photo} alt={employeeData?.emp_name} sx={{ width: 56, height: 56, mr: 2 }} imgProps={{ crossOrigin: 'anonymous' }}>{getInitials(employeeData?.emp_name)}</Avatar>
//                 <Box>
//                   <Typography variant="h6" color='#8C257C' fontWeight="bold">{employeeData?.emp_name || "Employee Name"}</Typography>
//                   <Typography variant="body2" color="textSecondary">{employeeData?.designation || "Designation"}</Typography>
//                 </Box>
//               </Box>
//               <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', mb: 2 }}>
//                 <Box display="flex" alignItems="center"><SupervisorAccount sx={{ mr: 1, color: 'text.secondary' }} /><Typography color='#8C257C'>Manager: {employeeData?.manager || "N/A"}</Typography></Box>
//                 <Button variant="contained" onClick={handleOpenPrintDialog} sx={{ mt: 1.5, backgroundColor: '#8C257C ', '&:hover': { backgroundColor: '#8C257C' } }}>View Details</Button>
//               </Box>
//               <List>
//                 {sidebarItems.map((item, index) => (<ListItem key={index} button selected={selectedItem === item.text} onClick={() => setSelectedItem(item.text)}><ListItemIcon>{item.icon}</ListItemIcon><ListItemText primary={item.text} primaryTypographyProps={{ fontSize: '14px' }} /></ListItem>))}
//               </List>
//             </Paper>
//           </Grid>
//           <Grid item xs={12} md={8}><Paper elevation={3} sx={{ p: 2 }}>{componentMap[selectedItem]}</Paper></Grid>
//         </Grid>
//       </Box>
//       <Dialog open={openPrintDialog} onClose={() => setOpenPrintDialog(false)} fullWidth maxWidth="md">
//         <DialogTitle><Typography variant="h6" color="#8C257C" fontWeight="bold">Employee Details</Typography><IconButton onClick={() => setOpenPrintDialog(false)} aria-label="Close dialog" sx={{ position: 'absolute', right: 8, top: 8 }}><CloseIcon /></IconButton></DialogTitle>
//         <DialogContent dividers>{isPrintableLoading ? (<Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}><CircularProgress /></Box>) : (<PrintableView pageRefs={pageRefs} data={printableData} />)}</DialogContent>
//         <DialogActions><Button onClick={handleDownloadPdf} variant="contained" startIcon={<DownloadIcon />} disabled={isPrintableLoading} sx={{ backgroundColor: "#673AB7", "&:hover": { backgroundColor: "#512DA8" } }}>Download PDF</Button><Button onClick={() => setOpenPrintDialog(false)} variant="contained" sx={{ backgroundColor: "#f44336", "&:hover": { backgroundColor: "#d32f2f" } }}>Close</Button></DialogActions>
//       </Dialog>
//     </>
//   );
// };

// export default EmployeeDetail;




// import React, { useState, useEffect, useContext, useRef, useMemo } from "react";
// import { EmployeeContext } from "./EmployeeContext";
// import axiosInstance from "../../utils/axiosInstance";
// import {
//   Box,
//   Grid,
//   Paper,
//   Typography,
//   Avatar,
//   List,
//   ListItem,
//   ListItemIcon,
//   ListItemText,
//   CircularProgress,
//   Alert,
//   IconButton,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Button,
//   TableContainer,
//   Table,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableBody,
//   Paper as MuiPaper,
// } from "@mui/material";
// import { useParams, useNavigate } from "react-router-dom";
// import {
//   Lock,
//   Info,
//   AccountBox,
//   Image,
//   AccountBalance,
//   Description,
//   SupervisorAccount,
//   Close as CloseIcon,
//   Download as DownloadIcon,
//   Group as GroupIcon,
//   ArrowBack as ArrowBackIcon,
// } from "@mui/icons-material";
// import jsPDF from "jspdf";
// import html2canvas from "html2canvas";
// import Swal from "sweetalert2";
// import Contract from "./Contract";
// import BasicInformation from "./BasicInformation";
// import PersonalInformation from "./PersonalInformation";
// import ProfilePicture from "./ProfilePicture";
// import AccountInformation from "./AccountInformation";
// import Documents from "./Documents";
// import FamilyDetails from "./FamilyDetails";
// import vetrinaLogo from "../../Assests/vetrinalogo.jpg";

// const componentMap = {
//   Details: <Contract />,
//   "Basic Information": <BasicInformation />,
//   "Personal Information": <PersonalInformation />,
//   "Profile Picture": <ProfilePicture />,
//   "Account Information": <AccountInformation />,
//   Documents: <Documents />,
//   "Family Details": <FamilyDetails />,
// };


// const sidebarItems = [
//   { icon: <Lock />, text: "Details" },
//   { icon: <Info />, text: "Basic Information" },
//   { icon: <AccountBox />, text: "Personal Information" },
//   { icon: <Image />, text: "Profile Picture" },
//   { icon: <AccountBalance />, text: "Account Information" },
//   { icon: <Description />, text: "Documents" },
//   { icon: <GroupIcon />, text: "Family Details" },
// ];

// const getInitials = (name = "") => {
//   const nameParts = name.split(" ").filter(Boolean);
//   if (nameParts.length === 0) return "...";
//   if (nameParts.length === 1) return nameParts[0][0].toUpperCase();
//   return (nameParts[0][0] + nameParts[nameParts.length - 1][0]).toUpperCase();
// };

// const PrintableView = ({ data, pageRefs }) => {
//   const [openSlip, setOpenSlip] = useState(false);
//   const [selectedSlip, setSelectedSlip] = useState(null);
//   const [loadingSlip, setLoadingSlip] = useState(false);
//   const [slipError, setSlipError] = useState(null);
//   const slipPreviewRef = useRef(null);

//   if (!data) return null;

//   const {
//     employee_info,
//     personal_details,
//     nearest_police_station,
//     work_details,
//     compensation_details,
//     bank_details,
//     assets,
//     employee_journey,
//     rewards,
//     salary_history,
//   } = data;

//   const Section = ({ title, children }) => (
//     <Box mb={3}>
//       <Typography
//         variant="h6"
//         gutterBottom
//         sx={{
//           borderBottom: 1,
//           borderColor: "divider",
//           pb: 1,
//           mb: 2,
//           color: "#673AB7",
//         }}
//       >
//         {title}
//       </Typography>
//       {children}
//     </Box>
//   );

//   const DetailItem = ({ label, value }) => (
//     <Grid item xs={12} sm={6}>
//       <Typography
//         variant="body2"
//         color="text.secondary"
//         sx={{ fontWeight: "bold" }}
//       >
//         {label}
//       </Typography>
//       <Typography variant="body1" sx={{ pl: 1, color: "#000" }}>
//         {value || "N/A"}
//       </Typography>
//     </Grid>
//   );

//   const PageWrapper = ({ children, innerRef }) => (
//     <Box
//       ref={innerRef}
//       sx={{
//         p: 3,
//         pt: 5,
//         pb: 5,
//         position: "relative",
//         pageBreakAfter: "always",
//       }}
//     >
//       {children}
//     </Box>
//   );

//   const hasValidData = (row) => {
//     if (!row) return false;
//     return Object.values(row).some(
//       (val) => val !== null && val !== "" && val !== undefined
//     );
//   };

//   const formatCurrency = (value) => {
//     if (
//       value === null ||
//       value === undefined ||
//       value === "" ||
//       isNaN(Number(value))
//     ) {
//       return "N/A";
//     }
//     return new Intl.NumberFormat("en-IN", {
//       style: "currency",
//       currency: "INR",
//       minimumFractionDigits: 0,
//       maximumFractionDigits: 2,
//     }).format(Number(value));
//   };

//   const handleOpenSlip = async (row) => {
//     setOpenSlip(true);
//     setLoadingSlip(true);
//     setSlipError(null);
//     setSelectedSlip(null);
    
//     try {
//       const employeeId = data?.employee_info?.employee_id;
      
//       if (!employeeId) {
//         setSlipError('Employee ID not found in employee data.');
//         setLoadingSlip(false);
//         return;
//       }
      
//       const response = await axiosInstance.get(
//         `api/view_employee_salary_slip/${employeeId}/`
//       );

//       console.log('Salary Slip API Response:', response.data);
//       console.log('Response data structure:', {
//         hasData: !!response.data?.data,
//         isArray: Array.isArray(response.data?.data),
//         dataLength: Array.isArray(response.data?.data) ? response.data.data.length : 'N/A',
//         responseKeys: Object.keys(response.data || {})
//       });

//       if (response.data && response.data.data) {
//         const slipData = Array.isArray(response.data.data) ? response.data.data[0] : response.data.data;
        
//         if (!slipData) {
//           setSlipError('No salary slip data found in response.');
//           setLoadingSlip(false);
//           return;
//         }

//         console.log('Processed slip data:', slipData);

//         // Helper function to format date
//         const formatDate = (dateString) => {
//           if (!dateString) return 'N/A';
//           try {
//             const date = new Date(dateString);
//             return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
//           } catch {
//             return dateString;
//           }
//         };

//         // Helper function to format salary month (e.g., "November 2025" from various formats)
//         const formatSalaryMonth = (slipDataObj) => {
//           // Try multiple field combinations to get month and year
//           let month = slipDataObj.salary_month || slipDataObj.month;
//           let year = slipDataObj.year || slipDataObj.financial_year;
          
//           // Convert month to string if it's a number
//           if (typeof month === 'number') {
//             month = String(month);
//           }
          
//           // If salary_month is a date string like "2025-11", extract month and year
//           if (month && typeof month === 'string' && month.includes('-')) {
//             const parts = month.split('-');
//             year = parts[0];
//             month = parts[1];
//           }
          
//           // If we have month as a number (1-12), convert to month name
//           if (month) {
//             const monthNum = parseInt(month);
//             if (!isNaN(monthNum) && monthNum >= 1 && monthNum <= 12) {
//               const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
//                 'July', 'August', 'September', 'October', 'November', 'December'];
//               month = monthNames[monthNum - 1];
//             }
//           }
          
//           // Construct the display string
//           if (month && year) {
//             return `${month}, ${year}`;
//           }
//           if (month) return month;
//           if (year) return year;
//           return 'N/A';
//         };

//         // Map API response to PayslipHistory structure
//         const transformedSlip = {
//           // Basic Info
//           name: slipData.employee_name || employee_info?.full_name || 'N/A',
//           salaryMonth: formatSalaryMonth(slipData),
//           payDate: formatDate(slipData.pay_date),
//           netPayable: parseFloat(slipData.net_pay || slipData.net_payable || slipData.take_home || 0),
          
//           // Details object (matching PayslipHistory structure)
//           details: {
//             employeeId: slipData.employee_id || employee_info?.employee_id || 'N/A',
//             department: slipData.department_name || employee_info?.department || 'N/A',
//             dateOfJoining: formatDate(slipData.date_of_joining),
//             designation: slipData.designation_name || employee_info?.designation || 'N/A',
//             location: slipData.location || 'N/A',
//             payableDays: slipData.payable_days || 0,
//             bankName: slipData.bank_name || 'N/A',
//             bankAcNo: slipData.bank_account_number || 'N/A',
//             pfUan: slipData.pf_number || 'N/A',
//             esicNo: slipData.esic_number || 'N/A',
//             panNo: slipData.pan_number || 'N/A',
            
//             // Earnings
//             basic: parseFloat(slipData.basic_plus_da || 0),
//             hra: parseFloat(slipData.hra || 0),
//             medical: parseFloat(slipData.medical_allowance || 0),
//             conveyance: parseFloat(slipData.conveyance_allowance || 0),
//             arrears: parseFloat(slipData.arrears || 0),
            
//             // Deductions
//             pf: parseFloat(slipData.pf || 0),
//             esic: parseFloat(slipData.esic || 0),
//             tds: parseFloat(slipData.tds || 0),
//             otherDeduction: parseFloat(slipData.other_deduction || 0),
//             mlwf: parseFloat(slipData.mlwf || 0),
//             advance: parseFloat(slipData.advance || 0),
            
//             // Totals
//             totalEarnings: parseFloat(slipData.total_earnings || 0),
//             totalDeductions: parseFloat(slipData.total_deduction || slipData.total_deductions || 0),
//             leaves: slipData.leaves || 0,
//           }
//         };
        
//         setSelectedSlip(transformedSlip);
//       } else {
//         console.error('Unexpected response structure:', response.data);
//         setSlipError('Invalid response format from server. Check browser console for details.');
//         setLoadingSlip(false);
//       }
//     } catch (error) {
//       console.error('Error fetching salary slip:', error);
//       console.error('Error response:', error.response?.data);
//       console.error('Error status:', error.response?.status);
//       console.error('Error message:', error.message);
//       const errorMsg = error.response?.data?.message || error.response?.data?.detail || error.message || 'Failed to load salary slip. Please try again.';
//       setSlipError(errorMsg);
//       setLoadingSlip(false);
//     } finally {
//       setLoadingSlip(false);
//     }
//   };

//   const handleCloseSlip = () => {
//     setOpenSlip(false);
//     setSelectedSlip(null);
//     setSlipError(null);
//   };

//   const handleOpenOriginalSlip = (row) => {
//     if (!row?.slipUrl) return;
//     window.open(row.slipUrl, "_blank", "noopener,noreferrer");
//   };

//   const handleDownloadSlip = async () => {
//     if (!selectedSlip) return;
//     try {
//       if (selectedSlip.slipUrl) {
//         window.open(selectedSlip.slipUrl, "_blank", "noopener,noreferrer");
//       }

//       const elementToCapture = slipPreviewRef.current;
//       if (elementToCapture) {
//         const canvas = await html2canvas(elementToCapture, {
//           scale: 2,
//           useCORS: true,
//           logging: false,
//         });
//         const imgData = canvas.toDataURL("image/png");
//         const doc = new jsPDF({
//           orientation: "portrait",
//           unit: "mm",
//           format: "a4",
//         });
//         const pdfWidth = doc.internal.pageSize.getWidth();
//         const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
//         doc.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
//         const pageHeight = doc.internal.pageSize.getHeight();
//         if (pdfHeight > pageHeight) {
//           let remaining = pdfHeight - pageHeight;
//           let position = pageHeight;
//           while (remaining > 0) {
//             doc.addPage();
//             doc.addImage(imgData, "PNG", 0, -position, pdfWidth, pdfHeight);
//             remaining -= pageHeight;
//             position += pageHeight;
//           }
//         }
//         const fileName = `${
//           employee_info?.full_name || "employee"
//         }-salaryslip-${selectedSlip.year || "slip"}.pdf`;
//         doc.save(fileName);
//         return;
//       }

//       const doc = new jsPDF({ unit: "mm", format: "a4" });
//       doc.setFontSize(14);
//       doc.text(
//         `${employee_info?.full_name || "Employee"} - Salary Slip`,
//         14,
//         20
//       );
//       doc.setFontSize(11);
//       doc.text(`Year: ${selectedSlip.year || "N/A"}`, 14, 30);
//       doc.text(`W.E.F: ${selectedSlip.wef || "N/A"}`, 14, 38);
//       doc.text(`Designation: ${selectedSlip.designation || "N/A"}`, 14, 46);
//       doc.text(`Level: ${selectedSlip.level || "N/A"}`, 14, 54);
//       doc.text(`Basic + DA: ${selectedSlip.basic_plus_da || "N/A"}`, 14, 62);
//       doc.text(`Gross Salary: ${selectedSlip.gross_salary || "N/A"}`, 14, 70);
//       doc.text(`CTC: ${selectedSlip.ctc || "N/A"}`, 14, 78);
//       doc.save(
//         `${employee_info?.full_name || "employee"}-salaryslip-${
//           selectedSlip.year || "slip"
//         }.pdf`
//       );
//     } catch (err) {
//       console.error("PDF generation error:", err);
//       Swal.fire("Error", "Failed to generate PDF for salary slip.", "error");
//     }
//   };

//   return (
//     <>
//       <PageWrapper innerRef={pageRefs.page1}>
//         <Box
//           display="flex"
//           alignItems="center"
//           justifyContent="space-between"
//           mb={4}
//         >
//           <Box display="flex" alignItems="center">
//             <Avatar
//               src={employee_info?.profile_photo}
//               sx={{ width: 80, height: 80, mr: 3 }}
//               imgProps={{ crossOrigin: "anonymous" }}
//             />
//             <Box>
//               <Typography variant="h5" fontWeight="bold">
//                 {employee_info?.full_name || "N/A"}
//               </Typography>
//               <Typography variant="body1" color="text.secondary">
//                 Employee ID: {employee_info?.employee_id || "N/A"}
//               </Typography>
//             </Box>
//           </Box>
//           <img
//             src={vetrinaLogo}
//             alt="Company Logo"
//             crossOrigin="anonymous"
//             style={{ height: "60px", width: "auto" }}
//           />
//         </Box>
//         <Section title="Employee Information">
//           <Grid container spacing={2}>
//             <DetailItem label="Department" value={employee_info?.department} />
//             <DetailItem
//               label="Designation"
//               value={employee_info?.designation}
//             />
//             <DetailItem label="Division" value={employee_info?.division} />
//             <DetailItem
//               label="Sub Division"
//               value={employee_info?.sub_division}
//             />
//             <DetailItem
//               label="Head Quarter"
//               value={employee_info?.head_quarter}
//             />
//           </Grid>
//         </Section>
//         <Section title="Personal Details">
//           <Grid container spacing={2}>
//             <DetailItem
//               label="Contact Number"
//               value={personal_details?.contact_number}
//             />
//             <DetailItem label="Email" value={personal_details?.email} />
//             <DetailItem
//               label="Date of Birth"
//               value={personal_details?.date_of_birth}
//             />
//             <DetailItem label="Age" value={personal_details?.age} />
//             <DetailItem label="Gender" value={personal_details?.gender} />
//             <DetailItem
//               label="Marital Status"
//               value={personal_details?.marital_status}
//             />
//             <DetailItem
//               label="Blood Group"
//               value={personal_details?.blood_group}
//             />
//           </Grid>
//         </Section>
//       </PageWrapper>

//       <PageWrapper innerRef={pageRefs.page2}>
//         <Section title="Correspondence Address">
//           <Grid container spacing={2}>
//             <DetailItem
//               label="Address 2"
//               value={personal_details?.correspondence_address?.address_2}
//             />
//             <DetailItem
//               label="City"
//               value={personal_details?.correspondence_address?.city}
//             />
//             <DetailItem
//               label="State"
//               value={personal_details?.correspondence_address?.state}
//             />
//             <DetailItem
//               label="Country"
//               value={personal_details?.correspondence_address?.country}
//             />
//             <DetailItem
//               label="Zipcode"
//               value={personal_details?.correspondence_address?.zipcode}
//             />
//           </Grid>
//         </Section>
//         <Section title="Nearest Police Station">
//           <Grid container spacing={2}>
//             <DetailItem
//               label="Address"
//               value={nearest_police_station?.address}
//             />
//             <DetailItem
//               label="Country"
//               value={nearest_police_station?.country}
//             />
//             <DetailItem label="State" value={nearest_police_station?.state} />
//             <DetailItem
//               label="District"
//               value={nearest_police_station?.district}
//             />
//             <DetailItem label="Tehsil" value={nearest_police_station?.tehsil} />
//             <DetailItem
//               label="Village"
//               value={nearest_police_station?.village}
//             />
//             <DetailItem
//               label="Pincode"
//               value={nearest_police_station?.pincode}
//             />
//           </Grid>
//         </Section>
//       </PageWrapper>

//       <PageWrapper innerRef={pageRefs.page3}>
//         <Section title="Work Details">
//           <Grid container spacing={2}>
//             <DetailItem
//               label="Date of Joining"
//               value={work_details?.date_of_joining}
//             />
//             <DetailItem
//               label="Date of Promotion"
//               value={work_details?.date_of_promotion}
//             />
//             <DetailItem label="Status" value={work_details?.employee_status} />
//           </Grid>
//         </Section>
//         <Section title="Compensation Details">
//           <Grid container spacing={2}>
//             <DetailItem
//               label="Gross Salary"
//               value={compensation_details?.current_salary}
//             />
//             <DetailItem
//               label="Current CTC"
//               value={compensation_details?.current_ctc}
//             />
//             <DetailItem
//               label="Joining Salary"
//               value={compensation_details?.joining_salary}
//             />
//             <DetailItem
//               label="Joining CTC"
//               value={compensation_details?.joining_ctc}
//             />
//           </Grid>
//         </Section>
//         <Section title="Bank Details">
//           <Grid container spacing={2}>
//             <DetailItem
//               label="Account Title"
//               value={bank_details?.account_title}
//             />
//             <DetailItem
//               label="Account Number"
//               value={bank_details?.account_number}
//             />
//             <DetailItem label="Bank Name" value={bank_details?.bank_name} />
//             <DetailItem label="IFSC Code" value={bank_details?.ifsc_code} />
//             <DetailItem label="Swift Code" value={bank_details?.swift_code} />
//             <DetailItem label="Bank Branch" value={bank_details?.bank_branch} />
//           </Grid>
//         </Section>
//         <Section title="Employee Journey">
//           <Grid container spacing={2}>
//             <DetailItem
//               label="Date of Joining"
//               value={employee_journey?.date_of_joining}
//             />
//             <DetailItem
//               label="Department"
//               value={employee_journey?.department}
//             />
//             <DetailItem
//               label="Designation"
//               value={employee_journey?.designation}
//             />
//             <DetailItem label="Division" value={employee_journey?.division} />
//             <DetailItem
//               label="Sub Division"
//               value={employee_journey?.sub_division}
//             />
//             <DetailItem
//               label="Head Quarter"
//               value={employee_journey?.head_quarter}
//             />
//             <DetailItem label="Level" value={employee_journey?.level} />
//             <DetailItem
//               label="Compensation"
//               value={employee_journey?.compensation}
//             />
//             <DetailItem label="Duration" value={employee_journey?.duration} />
//           </Grid>
//         </Section>
//         <Section title="Salary Details">
//           <Grid container spacing={2}>
//             <DetailItem
//               label="Note"
//               value={"Salary history is available below."}
//             />
//           </Grid>
//         </Section>
//         <Section title="Assigned Assets">
//           <TableContainer
//             component={MuiPaper}
//             sx={{ border: "1px solid rgba(224,224,224,1)" }}
//           >
//             <Table size="small">
//               <TableHead>
//                 <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
//                   <TableCell
//                     sx={{
//                       fontWeight: "bold",
//                       border: "1px solid rgba(224,224,224,1)",
//                     }}
//                   >
//                     Sr. No.
//                   </TableCell>
//                   <TableCell
//                     sx={{
//                       fontWeight: "bold",
//                       border: "1px solid rgba(224,224,224,1)",
//                     }}
//                   >
//                     Asset Name
//                   </TableCell>
//                   <TableCell
//                     sx={{
//                       fontWeight: "bold",
//                       border: "1px solid rgba(224,224,224,1)",
//                     }}
//                   >
//                     Category
//                   </TableCell>
//                   <TableCell
//                     sx={{
//                       fontWeight: "bold",
//                       border: "1px solid rgba(224,224,224,1)",
//                     }}
//                   >
//                     Brand
//                   </TableCell>
//                   <TableCell
//                     sx={{
//                       fontWeight: "bold",
//                       border: "1px solid rgba(224,224,224,1)",
//                     }}
//                   >
//                     Manufacturer
//                   </TableCell>
//                   <TableCell
//                     sx={{
//                       fontWeight: "bold",
//                       border: "1px solid rgba(224,224,224,1)",
//                     }}
//                   >
//                     Serial Number
//                   </TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {(assets || []).filter(hasValidData).map((asset, index) => (
//                   <TableRow key={index}>
//                     <TableCell sx={{ border: "1px solid rgba(224,224,224,1)" }}>
//                       {index + 1}
//                     </TableCell>
//                     <TableCell sx={{ border: "1px solid rgba(224,224,224,1)" }}>
//                       {asset.assets_name || "N/A"}
//                     </TableCell>
//                     <TableCell sx={{ border: "1px solid rgba(224,224,224,1)" }}>
//                       {asset.category_name || "N/A"}
//                     </TableCell>
//                     <TableCell sx={{ border: "1px solid rgba(224,224,224,1)" }}>
//                       {asset.brand_name || "N/A"}
//                     </TableCell>
//                     <TableCell sx={{ border: "1px solid rgba(224,224,224,1)" }}>
//                       {asset.manufacturer || "N/A"}
//                     </TableCell>
//                     <TableCell sx={{ border: "1px solid rgba(224,224,224,1)" }}>
//                       {asset.serial_number || "N/A"}
//                     </TableCell>
//                   </TableRow>
//                 ))}
//                 {!(assets || []).filter(hasValidData).length && (
//                   <TableRow>
//                     <TableCell
//                       colSpan={6}
//                       sx={{
//                         border: "1px solid rgba(224,224,224,1)",
//                         textAlign: "center",
//                       }}
//                     >
//                       Assets Not Allocated
//                     </TableCell>
//                   </TableRow>
//                 )}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         </Section>
//         <Section title="Reward & Recognition">
//           <TableContainer
//             component={MuiPaper}
//             sx={{ border: "1px solid rgba(224,224,224,1)" }}
//           >
//             <Table size="small">
//               <TableHead>
//                 <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
//                   <TableCell
//                     sx={{
//                       fontWeight: "bold",
//                       border: "1px solid rgba(224,224,224,1)",
//                     }}
//                   >
//                     Sr No.
//                   </TableCell>
//                   <TableCell
//                     sx={{
//                       fontWeight: "bold",
//                       border: "1px solid rgba(224,224,224,1)",
//                     }}
//                   >
//                     Name of Reward
//                   </TableCell>
//                   <TableCell
//                     sx={{
//                       fontWeight: "bold",
//                       border: "1px solid rgba(224,224,224,1)",
//                     }}
//                   >
//                     Month/Year
//                   </TableCell>
//                   <TableCell
//                     sx={{
//                       fontWeight: "bold",
//                       border: "1px solid rgba(224,224,224,1)",
//                     }}
//                   >
//                     Cash Prize
//                   </TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {rewards && rewards.length > 0 ? (
//                   rewards.map((r, i) => (
//                     <TableRow key={i}>
//                       <TableCell
//                         sx={{ border: "1px solid rgba(224,224,224,1)" }}
//                       >
//                         {i + 1}
//                       </TableCell>
//                       <TableCell
//                         sx={{ border: "1px solid rgba(224,224,224,1)" }}
//                       >
//                         {r.award_type || "N/A"}
//                       </TableCell>
//                       <TableCell
//                         sx={{ border: "1px solid rgba(224,224,224,1)" }}
//                       >
//                         {r.month_year || "N/A"}
//                       </TableCell>
//                       <TableCell
//                         sx={{ border: "1px solid rgba(224,224,224,1)" }}
//                       >
//                         {formatCurrency(r.award_cash)}
//                       </TableCell>
//                     </TableRow>
//                   ))
//                 ) : (
//                   <TableRow>
//                     <TableCell
//                       colSpan={4}
//                       sx={{
//                         border: "1px solid rgba(224,224,224,1)",
//                         textAlign: "center",
//                       }}
//                     >
//                       No Rewards Information Available
//                     </TableCell>
//                   </TableRow>
//                 )}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         </Section>
//         <Section title="Compensation – View">
//           <TableContainer
//             component={MuiPaper}
//             sx={{ border: "1px solid rgba(224,224,224,1)" }}
//           >
//             <Table size="small">
//               <TableHead>
//                 <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
//                   <TableCell
//                     sx={{
//                       fontWeight: "bold",
//                       border: "1px solid rgba(224,224,224,1)",
//                     }}
//                   >
//                     Sr. No.
//                   </TableCell>
//                   <TableCell
//                     sx={{
//                       fontWeight: "bold",
//                       border: "1px solid rgba(224,224,224,1)",
//                     }}
//                   >
//                     Designation
//                   </TableCell>
//                   <TableCell
//                     sx={{
//                       fontWeight: "bold",
//                       border: "1px solid rgba(224,224,224,1)",
//                     }}
//                   >
//                     Level
//                   </TableCell>
//                   <TableCell
//                     sx={{
//                       fontWeight: "bold",
//                       border: "1px solid rgba(224,224,224,1)",
//                     }}
//                   >
//                     Financial Year
//                   </TableCell>
//                   <TableCell
//                     sx={{
//                       fontWeight: "bold",
//                       border: "1px solid rgba(224,224,224,1)",
//                     }}
//                   >
//                     W.E.F
//                   </TableCell>
//                   <TableCell
//                     sx={{
//                       fontWeight: "bold",
//                       border: "1px solid rgba(224,224,224,1)",
//                     }}
//                   >
//                     Basic + DA
//                   </TableCell>
//                   <TableCell
//                     sx={{
//                       fontWeight: "bold",
//                       border: "1px solid rgba(224,224,224,1)",
//                     }}
//                   >
//                     Gross Salary
//                   </TableCell>
//                   <TableCell
//                     sx={{
//                       fontWeight: "bold",
//                       border: "1px solid rgba(224,224,224,1)",
//                     }}
//                   >
//                     CTC
//                   </TableCell>
//                   <TableCell
//                     sx={{
//                       fontWeight: "bold",
//                       border: "1px solid rgba(224,224,224,1)",
//                     }}
//                   >
//                     View Salary slip
//                   </TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {salary_history && salary_history.length > 0 ? (
//                   salary_history.map((row, index) => (
//                     <TableRow key={index}>
//                       <TableCell
//                         sx={{ border: "1px solid rgba(224,224,224,1)" }}
//                       >
//                         {index + 1}
//                       </TableCell>
//                       <TableCell
//                         sx={{ border: "1px solid rgba(224,224,224,1)" }}
//                       >
//                         {row.designation}
//                       </TableCell>
//                       <TableCell
//                         sx={{ border: "1px solid rgba(224,224,224,1)" }}
//                       >
//                         {row.level}
//                       </TableCell>
//                       <TableCell
//                         sx={{ border: "1px solid rgba(224,224,224,1)" }}
//                       >
//                         {row.year}
//                       </TableCell>
//                       <TableCell
//                         sx={{ border: "1px solid rgba(224,224,224,1)" }}
//                       >
//                         {row.wef}
//                       </TableCell>
//                       <TableCell
//                         sx={{ border: "1px solid rgba(224,224,224,1)" }}
//                       >
//                         {formatCurrency(row.basic_plus_da)}
//                       </TableCell>
//                       <TableCell
//                         sx={{ border: "1px solid rgba(224,224,224,1)" }}
//                       >
//                         {formatCurrency(row.gross_salary)}
//                       </TableCell>
//                       <TableCell
//                         sx={{ border: "1px solid rgba(224,224,224,1)" }}
//                       >
//                         {formatCurrency(row.ctc)}
//                       </TableCell>
//                       <TableCell
//                         sx={{ border: "1px solid rgba(224,224,224,1)" }}
//                       >
//                         <Box sx={{ display: "flex", gap: 1 }}>
//                           <Button
//                             size="small"
//                             onClick={() => handleOpenSlip(row)}
//                             sx={{ textTransform: "none" }}
//                           >
//                             View
//                           </Button>
//                           {row.slipUrl && (
//                             <Button
//                               size="small"
//                               onClick={() => handleOpenOriginalSlip(row)}
//                               sx={{ textTransform: "none" }}
//                             >
//                               Open Original
//                             </Button>
//                           )}
//                         </Box>
//                       </TableCell>
//                     </TableRow>
//                   ))
//                 ) : (
//                   <TableRow>
//                     <TableCell
//                       colSpan={9}
//                       sx={{
//                         border: "1px solid rgba(224,224,224,1)",
//                         textAlign: "center",
//                       }}
//                     >
//                       No Compensation Information Available
//                     </TableCell>
//                   </TableRow>
//                 )}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         </Section>
//       </PageWrapper>

//       <PageWrapper innerRef={pageRefs.page4}></PageWrapper>
//       <PageWrapper innerRef={pageRefs.page5}></PageWrapper>

//       <Dialog open={openSlip} onClose={handleCloseSlip} maxWidth="md" fullWidth>
//         <DialogTitle sx={{ color: '#8C257C', fontWeight: 'bold' }}>Pay Slip</DialogTitle>
//         <Box ref={slipPreviewRef}>
//           <DialogContent>
//             {loadingSlip ? (
//               <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 400 }}>
//                 <CircularProgress sx={{ color: '#8C257C' }} />
//               </Box>
//             ) : slipError ? (
//               <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 400 }}>
//                 <Typography color="error">{slipError}</Typography>
//               </Box>
//             ) : selectedSlip ? (
//               <Box sx={{ p: { xs: 1, sm: 2 }, border: "2px solid #000", borderRadius: 1, bgcolor: "background.paper" }}>
//                 <Grid container spacing={2} alignItems="center" justifyContent="space-between">
//                   <Grid item xs={4}>
//                     {vetrinaLogo && (
//                       <img src={vetrinaLogo} alt="Vetrina Logo" style={{ maxWidth: '140px', height: 'auto' }} />
//                     )}
//                   </Grid>
//                   <Grid item xs={8} sx={{ textAlign: 'right' }}>
//                     <Typography variant="h5" sx={{ fontWeight: 'bold' }} gutterBottom>
//                       Vetrina Healthcare Pvt. Ltd.
//                     </Typography>
//                     <Typography variant="body2">Pay Slip For Month: {selectedSlip.salaryMonth}</Typography>
//                     <Typography variant="body2">Salary Payment Date: {selectedSlip.payDate}</Typography>
//                   </Grid>
//                 </Grid>
                
//                 <Grid container spacing={2} sx={{ mt: 2 }}>
//                   <Grid item xs={6}>
//                     <Typography variant="body2"><strong>Employee ID:</strong> {selectedSlip.details.employeeId}</Typography>
//                     <Typography variant="body2"><strong>Employee Name:</strong> {selectedSlip.name}</Typography>
//                     <Typography variant="body2"><strong>Department:</strong> {selectedSlip.details.department}</Typography>
//                     <Typography variant="body2"><strong>Date of Joining:</strong> {selectedSlip.details.dateOfJoining}</Typography>
//                     <Typography variant="body2"><strong>Designation:</strong> {selectedSlip.details.designation}</Typography>
//                     <Typography variant="body2"><strong>Leaves:</strong> {selectedSlip.details.leaves}</Typography>
//                     <Typography variant="body2"><strong>Location:</strong> {selectedSlip.details.location}</Typography>
//                     <Typography variant="body2"><strong>Payable Days:</strong> {selectedSlip.details.payableDays}</Typography>
//                   </Grid>
//                   <Grid item xs={6}>
//                     <Typography variant="body2"><strong>Bank Name:</strong> {selectedSlip.details.bankName}</Typography>
//                     <Typography variant="body2"><strong>Bank A/c No:</strong> {selectedSlip.details.bankAcNo}</Typography>
//                     <Typography variant="body2"><strong>PF UAN:</strong> {selectedSlip.details.pfUan}</Typography>
//                     <Typography variant="body2"><strong>ESIC No:</strong> {selectedSlip.details.esicNo}</Typography>
//                     <Typography variant="body2"><strong>PAN No:</strong> {selectedSlip.details.panNo}</Typography>
//                   </Grid>
//                 </Grid>

//                 <TableContainer sx={{ mt: 3, border: "1px solid #000" }}>
//                   <Table size="small">
//                     <TableHead>
//                       <TableRow>
//                         <TableCell sx={{ border: "1px solid #000" }}><strong>Earning Title</strong></TableCell>
//                         <TableCell sx={{ border: "1px solid #000" }} align="right"><strong>Current Month</strong></TableCell>
//                         <TableCell sx={{ border: "1px solid #000" }}><strong>Deduction Title</strong></TableCell>
//                         <TableCell sx={{ border: "1px solid #000" }} align="right"><strong>Current Month</strong></TableCell>
//                       </TableRow>
//                     </TableHead>
//                     <TableBody>
//                       <TableRow>
//                         <TableCell sx={{ border: "1px solid #000" }}>Basic + DA</TableCell>
//                         <TableCell sx={{ border: "1px solid #000" }} align="right">{(selectedSlip?.details?.basic ?? 0).toFixed(2)}</TableCell>
//                         <TableCell sx={{ border: "1px solid #000" }}>PF</TableCell>
//                         <TableCell sx={{ border: "1px solid #000" }} align="right">{(selectedSlip?.details?.pf ?? 0).toFixed(2)}</TableCell>
//                       </TableRow>
//                       <TableRow>
//                         <TableCell sx={{ border: "1px solid #000" }}>HRA</TableCell>
//                         <TableCell sx={{ border: "1px solid #000" }} align="right">{(selectedSlip?.details?.hra ?? 0).toFixed(2)}</TableCell>
//                         <TableCell sx={{ border: "1px solid #000" }}>ESIC</TableCell>
//                         <TableCell sx={{ border: "1px solid #000" }} align="right">{(selectedSlip?.details?.esic ?? 0).toFixed(2)}</TableCell>
//                       </TableRow>
//                       <TableRow>
//                         <TableCell sx={{ border: "1px solid #000" }}>Medical</TableCell>
//                         <TableCell sx={{ border: "1px solid #000" }} align="right">{(selectedSlip?.details?.medical ?? 0).toFixed(2)}</TableCell>
//                         <TableCell sx={{ border: "1px solid #000" }}>TDS</TableCell>
//                         <TableCell sx={{ border: "1px solid #000" }} align="right">{(selectedSlip?.details?.tds ?? 0).toFixed(2)}</TableCell>
//                       </TableRow>
//                       <TableRow>
//                         <TableCell sx={{ border: "1px solid #000" }}>Conveyance</TableCell>
//                         <TableCell sx={{ border: "1px solid #000" }} align="right">{(selectedSlip?.details?.conveyance ?? 0).toFixed(2)}</TableCell>
//                         <TableCell sx={{ border: "1px solid #000" }}>Other Deduction</TableCell>
//                         <TableCell sx={{ border: "1px solid #000" }} align="right">{(selectedSlip?.details?.otherDeduction ?? 0).toFixed(2)}</TableCell>
//                       </TableRow>
//                       <TableRow>
//                         <TableCell sx={{ border: "1px solid #000" }}>Arrears</TableCell>
//                         <TableCell sx={{ border: "1px solid #000" }} align="right">{(selectedSlip?.details?.arrears ?? 0).toFixed(2)}</TableCell>
//                         <TableCell sx={{ border: "1px solid #000" }}>MLWF</TableCell>
//                         <TableCell sx={{ border: "1px solid #000" }} align="right">{(selectedSlip?.details?.mlwf ?? 0).toFixed(2)}</TableCell>
//                       </TableRow>
//                       <TableRow>
//                         <TableCell sx={{ border: "1px solid #000" }}></TableCell>
//                         <TableCell sx={{ border: "1px solid #000" }} align="right"></TableCell>
//                         <TableCell sx={{ border: "1px solid #000" }}>Advance</TableCell>
//                         <TableCell sx={{ border: "1px solid #000" }} align="right">{(selectedSlip?.details?.advance ?? 0).toFixed(2)}</TableCell>
//                       </TableRow>
//                       <TableRow>
//                         <TableCell sx={{ border: "1px solid #000", fontWeight: 'bold' }}>Total</TableCell>
//                         <TableCell sx={{ border: "1px solid #000", fontWeight: 'bold' }} align="right">{(selectedSlip?.details?.totalEarnings ?? 0).toFixed(2)}</TableCell>
//                         <TableCell sx={{ border: "1.2px solid #000", fontWeight: 'bold' }}>Total</TableCell>
//                         <TableCell sx={{ border: "1.2px solid #000", fontWeight: 'bold' }} align="right">{(selectedSlip?.details?.totalDeductions ?? 0).toFixed(2)}</TableCell>
//                       </TableRow>
//                     </TableBody>
//                   </Table>
//                 </TableContainer>

//                 <Box sx={{ mt: 1, px: 1 }}>
//                   <Typography variant="body2"><strong>Remark:</strong> NA</Typography>
//                 </Box>

//                 <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
//                   <Typography variant="body2"><strong>Total Earnings:</strong> ₹{(selectedSlip?.details?.totalEarnings ?? 0).toFixed(2)}</Typography>
//                   <Typography variant="body2"><strong>Total Deductions:</strong> ₹{(selectedSlip?.details?.totalDeductions ?? 0).toFixed(2)}</Typography>
//                   <Typography variant="body2"><strong>Take Home:</strong> ₹{(selectedSlip?.netPayable ?? 0).toFixed(2)}</Typography>
//                 </Box>

//                 <Box sx={{ mt: 3, textAlign: "center" }}>
//                   <Typography variant="body2"><strong>Vetrina Healthcare Pvt. Ltd., Corporate Office - Punyai Pride, 1st Floor, Shivshambho Nagar, Lane 3A, Katraj Kondhwa Road, Katraj, Pune - 411046.</strong></Typography>
//                   <Typography variant="caption" sx={{ mt: 1, display: "block" }}>This is an electronically generated pay slip and does not require any signature.</Typography>
//                 </Box>
//               </Box>
//             ) : (
//               <Typography>Could not load payslip details.</Typography>
//             )}
//           </DialogContent>
//         </Box>
//         <DialogActions className="payslip-actions-buttons">
//           <Button onClick={handleCloseSlip} sx={{ color: '#757575' }}>Close</Button>
//           <Button variant="outlined" onClick={() => window.print()} sx={{ color: '#8C257C', borderColor: '#8C257C', '&:hover': { borderColor: '#6d1d60', color: '#6d1d60' } }} disabled={loadingSlip || !selectedSlip}>Print</Button>
//           <Button variant="contained" onClick={handleDownloadSlip} sx={{ bgcolor: '#8C257C', color: 'white', '&:hover': { bgcolor: '#6d1d60' } }} disabled={loadingSlip || !selectedSlip}>Download PDF</Button>
//         </DialogActions>
//       </Dialog>
//     </>
//   );
// };

// const EmployeeDetail = () => {
//   const [selectedItem, setSelectedItem] = useState("Details");
//   const [employeeData, setEmployeeData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [openPrintDialog, setOpenPrintDialog] = useState(false);
//   const [printableData, setPrintableData] = useState(null);
//   const [isPrintableLoading, setIsPrintableLoading] = useState(false);
//   const page1Ref = useRef(null);
//   const page2Ref = useRef(null);
//   const page3Ref = useRef(null);
//   const page4Ref = useRef(null);
//   const page5Ref = useRef(null);
//   const pageRefs = useMemo(
//     () => ({
//       page1: page1Ref,
//       page2: page2Ref,
//       page3: page3Ref,
//       page4: page4Ref,
//       page5: page5Ref,
//     }),
//     []
//   );
//   const { setEmployeeId } = useContext(EmployeeContext);
//   const { id } = useParams();
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (id) setEmployeeId(id);
//   }, [id, setEmployeeId]);

//   // ***** THIS IS THE CORRECTED HOOK *****
//   useEffect(() => {
//     // If the id from useParams is not yet available, do nothing and wait.
//     // This prevents showing a premature error message on the initial render
//     // while the router is still populating the params.
//     if (!id) {
//       return;
//     }

//     setLoading(true);
//     setError(null);
//     const controller = new AbortController();

//     axiosInstance
//       .get(`api/edit_employee/${id}/`, {
//         signal: controller.signal,
//         handleErrorLocally: true,
//       })
//       .then((res) => {
//         if (res.data?.data?.length) {
//           setEmployeeData(res.data.data[0]);
//         } else {
//           // If the API returns no data for a valid ID, then it's a "not found" error.
//           setError("Employee not found.");
//         }
//       })
//       .catch((err) => {
//         // Ignore errors from the request being cancelled (e.g., component unmounts quickly).
//         if (err.name === "CanceledError" || err.message === "canceled") return;

//         console.error("Error fetching employee data:", err);
//         setError("Failed to load employee data.");
//       })
//       .finally(() => {
//         setLoading(false);
//       });

//     // Cleanup function to cancel the request if the component unmounts.
//     return () => controller.abort();
//   }, [id]); // This hook re-runs only when the 'id' changes.

//   const handleOpenPrintDialog = () => {
//     if (!id) {
//       Swal.fire(
//         "Error",
//         "Employee user ID is not available to fetch details.",
//         "error"
//       );
//       return;
//     }
//     setIsPrintableLoading(true);
//     setOpenPrintDialog(true);
//     axiosInstance
//       .get(`api/employee/${id}/`, { handleErrorLocally: true })
//       .then((res) => {
//         const payload = res.data || {};
//         let salaryData = [];
//         if (
//           payload.salary_history &&
//           Array.isArray(payload.salary_history) &&
//           payload.salary_history.length > 0
//         ) {
//           salaryData = payload.salary_history;
//         } else if (
//           payload.compensation &&
//           typeof payload.compensation === "object" &&
//           Object.keys(payload.compensation).length > 0
//         ) {
//           salaryData = [payload.compensation];
//         }
//         const normalized = {
//           employee_info: payload.employee_info || {
//             full_name: payload.full_name || payload.emp_name,
//             profile_photo: payload.profile_photo || payload.photo,
//             employee_id: payload.employee_id || payload.emp_id,
//           },
//           personal_details: payload.personal_details || payload.personal || {},
//           assets: payload.assets || [],
//           rewards: payload.rewards || [],
//           salary_history: salaryData,
//           nearest_police_station: payload.nearest_police_station || {},
//           emergency_contact: payload.emergency_contact || {},
//           work_details: payload.work_details || {},
//           compensation_details: payload.compensation_details || {},
//           bank_details: payload.bank_details || {},
//           employee_journey: payload.employee_journey || {},
//         };
//         setPrintableData(normalized);
//       })
//       .catch((err) => {
//         console.error("Error fetching printable employee data:", err);
//         Swal.fire("Error", "Failed to load printable details.", "error");
//         setOpenPrintDialog(false);
//       })
//       .finally(() => setIsPrintableLoading(false));
//   };

//   const handleDownloadPdf = async () => {
//     const pdf = new jsPDF({
//       orientation: "portrait",
//       unit: "mm",
//       format: "a4",
//     });
//     const addPageContent = async (ref, pageNum) => {
//       if (ref.current) {
//         const hasContent = ref.current.querySelector("h6");
//         if (!hasContent) return;
//         if (pageNum > 1) pdf.addPage();
//         try {
//           const canvas = await html2canvas(ref.current, {
//             scale: 2,
//             useCORS: true,
//             logging: false,
//           });
//           const imgData = canvas.toDataURL("image/png");
//           const pdfWidth = pdf.internal.pageSize.getWidth();
//           const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
//           const pageHeightLimit = pdf.internal.pageSize.getHeight();
//           pdf.addImage(
//             imgData,
//             "PNG",
//             0,
//             0,
//             pdfWidth,
//             Math.min(pdfHeight, pageHeightLimit)
//           );
//         } catch (err) {
//           console.error("html2canvas error:", err);
//           Swal.fire(
//             "Error",
//             "Failed to capture page for PDF (possible cross-origin image).",
//             "error"
//           );
//         }
//       }
//     };
//     let pagesAdded = 0;
//     const processPage = async (ref) => {
//       if (ref.current?.querySelector("h6")) {
//         pagesAdded++;
//         await addPageContent(ref, pagesAdded);
//       }
//     };
//     await processPage(pageRefs.page1);
//     await processPage(pageRefs.page2);
//     await processPage(pageRefs.page3);
//     await processPage(pageRefs.page4);
//     await processPage(pageRefs.page5);
//     pdf.save(`${employeeData?.emp_name || "employee"}-details.pdf`);
//   };

//   if (loading)
//     return (
//       <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
//         <CircularProgress />
//       </Box>
//     );
//   if (error)
//     return (
//       <Alert severity="error" sx={{ m: 2 }}>
//         {error}
//       </Alert>
//     );

//   return (
//     <>
//       <Box sx={{ flexGrow: 1, p: 2 }}>
//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             mb: 2,
//           }}
//         >
//           <Typography
//             variant="h4"
//             color="#8C257C "
//             component="h1"
//             fontWeight="bold"
//             mb={5}
//           >
//             Employee Profile
//           </Typography>
//           <Button
//             variant="contained"
//             onClick={() => navigate(-1)}
//             startIcon={<ArrowBackIcon />}
//             sx={{
//               backgroundColor: "#8C257C",
//               "&:hover": { backgroundColor: "#8C257C" },
//             }}
//           >
//             Back
//           </Button>
//         </Box>
//         <Grid container spacing={2}>
//           <Grid item xs={12} md={4}>
//             <Paper elevation={3} sx={{ p: 2 }}>
//               <Box display="flex" alignItems="center" mb={2}>
//                 <Avatar
//                   src={employeeData?.profile_photo}
//                   alt={employeeData?.emp_name}
//                   sx={{ width: 56, height: 56, mr: 2 }}
//                   imgProps={{ crossOrigin: "anonymous" }}
//                 >
//                   {getInitials(employeeData?.emp_name)}
//                 </Avatar>
//                 <Box>
//                   <Typography variant="h6" color="#8C257C" fontWeight="bold">
//                     {employeeData?.emp_name || "Employee Name"}
//                   </Typography>
//                   <Typography variant="body2" color="textSecondary">
//                     {employeeData?.designation || "Designation"}
//                   </Typography>
//                 </Box>
//               </Box>
//               <Box
//                 sx={{
//                   display: "flex",
//                   flexDirection: "column",
//                   alignItems: "flex-start",
//                   mb: 2,
//                 }}
//               >
//                 <Box display="flex" alignItems="center">
//                   <SupervisorAccount sx={{ mr: 1, color: "text.secondary" }} />
//                   <Typography color="#8C257C">
//                     Manager: {employeeData?.manager || "N/A"}
//                   </Typography>
//                 </Box>
//                 <Button
//                   variant="contained"
//                   onClick={handleOpenPrintDialog}
//                   sx={{
//                     mt: 1.5,
//                     backgroundColor: "#8C257C ",
//                     "&:hover": { backgroundColor: "#8C257C" },
//                   }}
//                 >
//                   View Details
//                 </Button>
//               </Box>
//               <List>
//                 {sidebarItems.map((item, index) => (
//                   <ListItem
//                     key={index}
//                     button
//                     selected={selectedItem === item.text}
//                     onClick={() => setSelectedItem(item.text)}
//                   >
//                     <ListItemIcon>{item.icon}</ListItemIcon>
//                     <ListItemText
//                       primary={item.text}
//                       primaryTypographyProps={{ fontSize: "14px" }}
//                     />
//                   </ListItem>
//                 ))}
//               </List>
//             </Paper>
//           </Grid>
//           <Grid item xs={12} md={8}>
//             <Paper elevation={3} sx={{ p: 2 }}>
//               {componentMap[selectedItem]}
//             </Paper>
//           </Grid>
//         </Grid>
//       </Box>
//       <Dialog
//         open={openPrintDialog}
//         onClose={() => setOpenPrintDialog(false)}
//         fullWidth
//         maxWidth="md"
//       >
//         <DialogTitle>
//           <Typography variant="h6" color="#8C257C" fontWeight="bold">
//             Employee Details
//           </Typography>
//           <IconButton
//             onClick={() => setOpenPrintDialog(false)}
//             aria-label="Close dialog"
//             sx={{ position: "absolute", right: 8, top: 8 }}
//           >
//             <CloseIcon />
//           </IconButton>
//         </DialogTitle>
//         <DialogContent dividers>
//           {isPrintableLoading ? (
//             <Box sx={{ display: "flex", justifyContent: "center", p: 5 }}>
//               <CircularProgress />
//             </Box>
//           ) : (
//             <PrintableView pageRefs={pageRefs} data={printableData} />
//           )}
//         </DialogContent>
//         <DialogActions>
//           <Button
//             onClick={handleDownloadPdf}
//             variant="contained"
//             startIcon={<DownloadIcon />}
//             disabled={isPrintableLoading}
//             sx={{
//               backgroundColor: "#673AB7",
//               "&:hover": { backgroundColor: "#512DA8" },
//             }}
//           >
//             Download PDF
//           </Button>
//           <Button
//             onClick={() => setOpenPrintDialog(false)}
//             variant="contained"
//             sx={{
//               backgroundColor: "#f44336",
//               "&:hover": { backgroundColor: "#d32f2f" },
//             }}
//           >
//             Close
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </>
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
  Paper as MuiPaper, Zoom
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowBack as ArrowBackIcon,
  Close as CloseIcon,
  Download as DownloadIcon,
  Visibility as VisibilityIcon
} from "@mui/icons-material";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion"; // Modern Animation
import vetrinaLogo from "../../Assests/vetrinalogo.jpg"; 

// Child Components
import Contract from "./Contract";
import BasicInformation from "./BasicInformation";
import AccountInformation from "./AccountInformation";
import ProfilePicture from "./ProfilePicture";
import PersonalInformation from "./PersonalInformation";
import Documents from "./Documents";

// --- THEME CONSTANTS ---
const PRIMARY_COLOR = "#8C257C"; // Purple
const SECONDARY_COLOR = "#F58E35"; // Orange
const GRADIENT_BTN = `linear-gradient(135deg, ${PRIMARY_COLOR} 0%, #6d1d60 100%)`;
const GRADIENT_FINISH = `linear-gradient(135deg, ${SECONDARY_COLOR} 0%, #d4762c 100%)`;

// --- MODERN STYLED COMPONENTS ---
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

// --- ANIMATION VARIANTS ---
const pageVariants = {
  initial: { opacity: 0, x: 20 },
  in: { opacity: 1, x: 0 },
  out: { opacity: 0, x: -20 }
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.4
};

// --- HELPER FUNCTIONS ---
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

// --- FULL PRINTABLE VIEW (Containing the Exact Pay Slip Logic) ---
const PrintableView = ({ data, pageRefs }) => {
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

  const PageWrapper = ({ children, innerRef }) => (
    <Box ref={innerRef} sx={{ p: 4, pt: 5, pb: 5, bgcolor: '#fff', mb: 2 }}>{children}</Box>
  );

  const hasValidData = (row) => {
    if (!row) return false;
    return Object.values(row).some((val) => val !== null && val !== "" && val !== undefined);
  };

  // --- EXACT PREVIOUS PAY SLIP LOGIC & MAPPING ---
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

        const formatDate = (dateString) => {
             if (!dateString) return 'N/A';
             try { return new Date(dateString).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }); } 
             catch { return dateString; }
        };
        
        // Exact Mapping from previous code
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
    <>
      <PageWrapper innerRef={pageRefs.page1}>
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={4}>
          <Box display="flex" alignItems="center">
            <Avatar src={employee_info?.profile_photo} sx={{ width: 90, height: 90, mr: 3, border: `3px solid ${PRIMARY_COLOR}` }} />
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
      </PageWrapper>

      <PageWrapper innerRef={pageRefs.page2}>
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
      </PageWrapper>

      <PageWrapper innerRef={pageRefs.page3}>
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
      </PageWrapper>

      <PageWrapper innerRef={pageRefs.page4}>
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
                        {(assets || []).filter(hasValidData).map((asset, i) => (
                            <TableRow key={i}>
                                <TableCell>{i+1}</TableCell><TableCell>{asset.assets_name}</TableCell><TableCell>{asset.category_name}</TableCell>
                                <TableCell>{asset.brand_name}</TableCell><TableCell>{asset.manufacturer}</TableCell><TableCell>{asset.serial_number}</TableCell>
                            </TableRow>
                        ))}
                        {!(assets || []).filter(hasValidData).length && <TableRow><TableCell colSpan={6} align="center">Assets Not Allocated</TableCell></TableRow>}
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
      </PageWrapper>

      {/* --- SALARY SLIP DIALOG (EXACT PREVIOUS DESIGN) --- */}
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
    </>
  );
};

const EmployeeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { setEmployeeId } = useContext(EmployeeContext);

  const [loading, setLoading] = useState(true);
  const [employeeData, setEmployeeData] = useState(null);
  const [error, setError] = useState(null);

  // Stepper State
  const [activeStep, setActiveStep] = useState(0); 
  const [subStep, setSubStep] = useState(0); 

  // Print Dialog & Auto Download State
  const [openPrintDialog, setOpenPrintDialog] = useState(false);
  const [printableData, setPrintableData] = useState(null);
  const [isPrintableLoading, setIsPrintableLoading] = useState(false);
  const [autoDownload, setAutoDownload] = useState(false);

  const pageRefs = useMemo(() => ({ page1: React.createRef(), page2: React.createRef(), page3: React.createRef(), page4: React.createRef(), page5: React.createRef() }), []);
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

  const handleDocumentNext = async () => {
     setAutoDownload(true);
     handleOpenPrintDialog(); 
  };

  const handleBack = () => {
    if (activeStep === 0) { if (subStep > 0) setSubStep(prev => prev - 1); else navigate(-1); }
    else if (activeStep === 1) { setActiveStep(0); setSubStep(3); }
    else if (activeStep === 2) { setActiveStep(1); }
    window.scrollTo(0, 0);
  };

  // --- DIALOG / PDF DATA FETCH ---
  const handleOpenPrintDialog = () => {
    if (!id) return;
    setIsPrintableLoading(true);
    setOpenPrintDialog(true);
    
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
        setPrintableData(normalized);
      }).catch(() => { Swal.fire("Error", "Failed.", "error"); setOpenPrintDialog(false); })
      .finally(() => setIsPrintableLoading(false));
  };

  const handleDownloadPdf = async () => {
    const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
    const addPageContent = async (ref, pageNum) => {
      if (ref.current) {
        if (pageNum > 1) pdf.addPage();
        try {
          const canvas = await html2canvas(ref.current, { scale: 2, useCORS: true });
          const imgData = canvas.toDataURL("image/png");
          const pdfWidth = pdf.internal.pageSize.getWidth();
          const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
          pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, Math.min(pdfHeight, pdf.internal.pageSize.getHeight()));
        } catch (err) { }
      }
    };
    await addPageContent(pageRefs.page1, 1);
    await addPageContent(pageRefs.page2, 2);
    await addPageContent(pageRefs.page3, 3);
    await addPageContent(pageRefs.page4, 4);
    pdf.save(`${employeeData?.emp_name || "Employee"}-Details.pdf`);
  };

  useEffect(() => {
    if (openPrintDialog && !isPrintableLoading && printableData && autoDownload) {
        const timer = setTimeout(() => {
            handleDownloadPdf().then(() => {
                setAutoDownload(false);
                Swal.fire({ icon: 'success', title: 'Downloaded', text: 'PDF generated successfully.', timer: 2000, showConfirmButton: false });
            });
        }, 1500); 
        return () => clearTimeout(timer);
    }
  }, [openPrintDialog, isPrintableLoading, printableData, autoDownload]);

  // --- RENDER ---
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
        {subStep === 0 && <Contract onNext={handleEmploymentNext} onBack={handleBack} />}
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
      {/* Header */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", color: PRIMARY_COLOR ,}}>
          Employee Profile
        </Typography>
        <Button variant="contained" onClick={() => navigate(-1)} startIcon={<ArrowBackIcon />} sx={{ borderRadius: '20px', background: GRADIENT_BTN, boxShadow: '0 4px 10px rgba(140, 37, 124, 0.3)' }}>
          Back to List
        </Button>
      </Box>

      {/* Summary Card */}
      <ModernPaper sx={{ mb: 4, background: 'linear-gradient(to right, #ffffff, #fdf2f8)' }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box display="flex" alignItems="center">
                <Avatar src={employeeData?.profile_photo} sx={{ width: 70, height: 70, mr: 2, border: `3px solid ${PRIMARY_COLOR}` }} />
                <Box>
                    <Typography variant="h5" color={PRIMARY_COLOR} fontWeight="bold">{employeeData?.emp_name}</Typography>
                    <Typography variant="body1" color="textSecondary">{employeeData?.designation} | {employeeData?.employee_id}</Typography>
                </Box>
            </Box>
            <Button variant="contained" onClick={handleOpenPrintDialog} startIcon={<VisibilityIcon />} sx={{ borderRadius: '20px', background: GRADIENT_BTN, px: 3 }}>
                View Details
            </Button>
        </Box>
      </ModernPaper>

      {/* Main Stepper */}
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

      {/* Content Area with Animation */}
      <AnimatePresence mode="wait">
        <ModernPaper sx={{ minHeight: 400 }}>
            {activeStep === 0 && renderEmploymentInfo()}
            {activeStep === 1 && <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}><PersonalInformation onNext={handlePersonalNext} onBack={handleBack} /></motion.div>}
            {activeStep === 2 && <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}><Documents onNext={handleDocumentNext} onBack={handleBack} /></motion.div>}
        </ModernPaper>
      </AnimatePresence>

      {/* View Details Dialog */}
      <Dialog open={openPrintDialog} onClose={() => setOpenPrintDialog(false)} fullWidth maxWidth="md" 
        PaperProps={{ sx: { borderRadius: 4, overflow: 'hidden' } }}
        TransitionComponent={Zoom}
      >
        <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: '1px solid #eee', bgcolor: '#fafafa', p: 2 }}>
             <Typography variant="h6" color={PRIMARY_COLOR} fontWeight="bold">Employee Details</Typography>
             <IconButton onClick={() => setOpenPrintDialog(false)} sx={{ color: '#666' }}><CloseIcon /></IconButton>
        </DialogTitle>
        <DialogContent dividers sx={{ p: 0, bgcolor: '#fff' }}>
            {isPrintableLoading ? <Box display="flex" justifyContent="center" p={5}><CircularProgress sx={{ color: PRIMARY_COLOR }} /></Box> : 
            <PrintableView pageRefs={pageRefs} data={printableData} />}
        </DialogContent>
        <DialogActions sx={{ p: 3, bgcolor: '#fafafa' }}>
            <Button onClick={handleDownloadPdf} variant="contained" startIcon={<DownloadIcon />} sx={{ background: GRADIENT_FINISH, px: 3, borderRadius: 2 }}>Download PDF</Button>
            <Button onClick={() => setOpenPrintDialog(false)} variant="outlined" color="error" sx={{ borderRadius: 2 }}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default EmployeeDetail;