import React, { useState, useEffect, useContext, useRef } from 'react';
import axiosInstance from "../../utils/axiosInstance"; 
import {
  Box, Grid, Paper, Typography, Avatar, List, ListItem,
  ListItemIcon, ListItemText, CircularProgress, Alert, IconButton,
  Dialog, DialogTitle, DialogContent, DialogActions, Button,
  TableContainer, Table, TableHead, TableRow, TableCell, TableBody
} from '@mui/material';
import { useParams } from 'react-router-dom';
import {
  Lock, Info, AccountBox, Image, AccountBalance,
  Description, SupervisorAccount, Close as CloseIcon, 
  Download as DownloadIcon, Group as GroupIcon
} from '@mui/icons-material';

// PDF Generation Libraries
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

// Import child components
import Contract from './Contract';
import BasicInformation from './BasicInformation';
import PersonalInformation from './PersonalInformation';
import ProfilePicture from './ProfilePicture';
import AccountInformation from './AccountInformation';
import Documents from './Documents';
import FamilyDetails from './FamilyDetails';
import { EmployeeContext } from '../../SuperAdmin/Employee/EmployeeContext';

// Logo Import
import vetrinaLogo from '../../Assests/vetrinalogo.jpg';

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
  { icon: <GroupIcon />, text: 'Family Details' },
];

// Helper function to get initials from a name for the Avatar fallback
const getInitials = (name = "") => {
  const nameParts = name.split(' ').filter(Boolean);
  if (nameParts.length === 0) return '...';
  if (nameParts.length === 1) return nameParts[0][0].toUpperCase();
  return (nameParts[0][0] + nameParts[nameParts.length - 1][0]).toUpperCase();
};

// ======================= START: PRINTABLE VIEW COMPONENT =======================
const PrintableView = React.forwardRef(({ data, pageRefs }, ref) => {
  if (!data) return null;

  const {
    employee_info, personal_details, nearest_police_station, emergency_contact,
    work_details, compensation_details, bank_details,
    assets, employee_journey, rewards, salary_history
  } = data;

  const Section = ({ title, children }) => (
    <Box mb={3}>
      <Typography variant="h6" gutterBottom sx={{ 
        borderBottom: 1, 
        borderColor: 'divider', 
        pb: 1, mb: 2, 
        color: '#673AB7'
      }}>
        {title}
      </Typography>
      {children}
    </Box>
  );

  const DetailItem = ({ label, value }) => (
    <Grid item xs={12} sm={6}>
      <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 'bold' }}>
        {label}
      </Typography>
      <Typography variant="body1" sx={{ pl: 1, color: '#000' }}>
        {value || 'N/A'}
      </Typography>
    </Grid>
  );

  const formatGender = (gender) => {
    if (gender === '1') return 'Male';
    if (gender === '2') return 'Female';
    return gender || 'N/A';
  };

  const PageWrapper = ({ children, innerRef }) => (
    <Box ref={innerRef} sx={{ p: 3, pt: 5, pb: 5, position: 'relative', pageBreakAfter: 'always' }}>
      {children}
    </Box>
  );

  const hasValidData = (row) => {
    if (!row) return false;
    return Object.values(row).some((val) => val !== null && val !== "" && val !== undefined);
  };

  const ConditionalTable = ({ title, data, columns, renderRow, message }) => {
    const filteredData = (data || []).filter(hasValidData);

    if (!filteredData.length) {
      return (
        <Section title={title}>
          <Typography variant="body1" sx={{ pl: 1, color: "#000" }}>
            {message}
          </Typography>
        </Section>
      );
    }

    return (
      <Section title={title}>
        <TableContainer component={Paper} sx={{ border: "1px solid rgba(224, 224, 224, 1)" }}>
          <Table size="small">
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                {columns.map((col, i) => (
                  <TableCell
                    key={i}
                    sx={{
                      fontWeight: "bold",
                      border: "1px solid rgba(224, 224, 224, 1)",
                      color: "text.secondary",
                    }}
                  >
                    {col}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.map((row, index) => renderRow(row, index))}
            </TableBody>
          </Table>
        </TableContainer>
      </Section>
    );
  };

  return (
    <>
      {/* --- PAGE 1 --- */}
      <PageWrapper innerRef={pageRefs.page1}>
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={4}>
          <Box display="flex" alignItems="center">
            <Avatar src={employee_info?.profile_photo} sx={{ width: 80, height: 80, mr: 3 }} />
            <Box>
              <Typography variant="h5" fontWeight="bold">
                {employee_info?.full_name || 'N/A'}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Employee ID: {employee_info?.employee_id || 'N/A'}
              </Typography>
            </Box>
          </Box>
          <img src={vetrinaLogo} alt="Company Logo" style={{ height: '60px', width: 'auto' }} />
        </Box>

        <Section title="Employee Information">
          <Grid container spacing={2}>
            <DetailItem label="Department" value={employee_info?.department} />
            <DetailItem label="Designation" value={employee_info?.designation} />
            <DetailItem label="Division" value={employee_info?.division} />
            <DetailItem label="Sub Division" value={employee_info?.sub_division} />
            <DetailItem label="Head Quarter" value={employee_info?.head_quarter} />
          </Grid>
        </Section>

        <Section title="Personal Details">
          <Grid container spacing={2}>
            <DetailItem label="Contact Number" value={personal_details?.contact_number} />
            <DetailItem label="Email" value={personal_details?.email} />
            <DetailItem label="Date of Birth" value={personal_details?.date_of_birth} />
            <DetailItem label="Age" value={personal_details?.age} />
            <DetailItem label="Gender" value={formatGender(personal_details?.gender)} />
            <DetailItem label="Marital Status" value={personal_details?.marital_status} />
            <DetailItem label="Blood Group" value={personal_details?.blood_group} />
            <DetailItem label="Aadhar No." value={personal_details?.aadhar_no} />
            <DetailItem label="PAN No." value={personal_details?.pan_number} />
            <DetailItem label="UAN No." value={personal_details?.uan_number} />
            <DetailItem label="Passport No." value={personal_details?.passport_no} />
            <DetailItem label="Vehicle No." value={personal_details?.vehicle_no} />
            <DetailItem label="Driving Licence No." value={personal_details?.driving_licence_no} />
          </Grid>
        </Section>

        <Section title="Permanent Address">
          <Grid container spacing={2}>
            <DetailItem label="Address 1" value={personal_details?.permanent_address?.address_1} />
            <DetailItem label="City" value={personal_details?.permanent_address?.city} />
            <DetailItem label="State" value={personal_details?.permanent_address?.state} />
            <DetailItem label="Country" value={personal_details?.permanent_address?.country} />
            <DetailItem label="Zipcode" value={personal_details?.permanent_address?.zipcode} />
          </Grid>
        </Section>
      </PageWrapper>

      {/* --- PAGE 2 --- */}
      <PageWrapper innerRef={pageRefs.page2}>
        <Section title="Correspondence Address">
          <Grid container spacing={2}>
            <DetailItem label="Address 2" value={personal_details?.correspondence_address?.address_2} />
            <DetailItem label="City" value={personal_details?.correspondence_address?.city} />
            <DetailItem label="State" value={personal_details?.correspondence_address?.state} />
            <DetailItem label="Country" value={personal_details?.correspondence_address?.country} />
            <DetailItem label="Zipcode" value={personal_details?.correspondence_address?.zipcode} />
          </Grid>
        </Section>

        <Section title="Nearest Police Station">
          <Grid container spacing={2}>
            <DetailItem label="Address" value={nearest_police_station?.address} />
            <DetailItem label="Country" value={nearest_police_station?.country} />
            <DetailItem label="State" value={nearest_police_station?.state} />
            <DetailItem label="District" value={nearest_police_station?.district} />
            <DetailItem label="Tehsil" value={nearest_police_station?.tehsil} />
            <DetailItem label="Village" value={nearest_police_station?.village} />
            <DetailItem label="Pincode" value={nearest_police_station?.pincode} />
          </Grid>
        </Section>

        <Section title="Emergency Contact">
          <Grid container spacing={2}>
            <DetailItem label="Name" value={emergency_contact?.name} />
            <DetailItem label="Phone" value={emergency_contact?.phone} />
            <DetailItem label="Email" value={emergency_contact?.email} />
            <DetailItem label="Address" value={emergency_contact?.address} />
          </Grid>
        </Section>

        <Section title="Work Details">
          <Grid container spacing={2}>
            <DetailItem label="Date of Joining" value={work_details?.date_of_joining} />
            <DetailItem label="Date of Leaving" value={work_details?.date_of_leaving} />
            <DetailItem label="Date of Promotion" value={work_details?.date_of_promotion} />
            <DetailItem label="Status" value={work_details?.employee_status} />
          </Grid>
        </Section>

        <Section title="Compensation Details">
          <Grid container spacing={2}>
            <DetailItem label="Current Salary" value={compensation_details?.current_salary} />
            <DetailItem label="Current CTC" value={compensation_details?.current_ctc} />
            <DetailItem label="Joining Salary" value={compensation_details?.joining_salary} />
            <DetailItem label="Joining CTC" value={compensation_details?.joining_ctc} />
          </Grid>
        </Section>
      </PageWrapper>

      {/* --- PAGE 3 --- */}
      <PageWrapper innerRef={pageRefs.page3}>
        <Section title="Bank Details">
          <Grid container spacing={2}>
            <DetailItem label="Account Title" value={bank_details?.account_title} />
            <DetailItem label="Account Number" value={bank_details?.account_number} />
            <DetailItem label="Bank Name" value={bank_details?.bank_name} />
            <DetailItem label="IFSC Code" value={bank_details?.ifsc_code} />
            <DetailItem label="Swift Code" value={bank_details?.swift_code} />
            <DetailItem label="Bank Branch" value={bank_details?.bank_branch} />
          </Grid>
        </Section>

        <Section title="Employee Journey">
          <Grid container spacing={2}>
            <DetailItem label="Date of Joining" value={employee_journey?.date_of_joining} />
            <DetailItem label="Department" value={employee_journey?.department} />
            <DetailItem label="Designation" value={employee_journey?.designation} />
            <DetailItem label="Division" value={employee_journey?.division} />
            <DetailItem label="Sub Division" value={employee_journey?.sub_division} />
            <DetailItem label="Head Quarter" value={employee_journey?.head_quarter} />
            <DetailItem label="Level" value={employee_journey?.level} />
            <DetailItem label="Compensation" value={employee_journey?.compensation} />
            <DetailItem label="Duration" value={employee_journey?.duration} />
          </Grid>
        </Section>

        <ConditionalTable
          title="Assigned Assets"
          data={assets}
          message="Assets Not Allocated"
          columns={["Sr. No.", "Asset Name", "Category", "Brand", "Manufacturer", "Serial Number"]}
          renderRow={(asset, index) => (
            <TableRow key={index}>
              <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)", color: "#000" }}>{index + 1}</TableCell>
              <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)", color: "#000" }}>{asset.assets_name || "N/A"}</TableCell>
              <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)", color: "#000" }}>{asset.category_name || "N/A"}</TableCell>
              <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)", color: "#000" }}>{asset.brand_name || "N/A"}</TableCell>
              <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)", color: "#000" }}>{asset.manufacturer || "N/A"}</TableCell>
              <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)", color: "#000" }}>{asset.serial_number || "N/A"}</TableCell>
            </TableRow>
          )}
        />
      </PageWrapper>

      {/* --- PAGE 4 --- REWARDS & SALARY --- */}
      <PageWrapper innerRef={pageRefs.page4}>
        <ConditionalTable
          title="Reward & Recognition"
          data={rewards}
          message="No Rewards Information Available"
          columns={["Sr No.", "Name of Reward", "Year (Financial Year)", "Date (DD/MM/YYYY)"]}
          renderRow={(reward, index) => (
            <TableRow key={index}>
              <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)", color: "#000" }}>{index + 1}</TableCell>
              <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)", color: "#000" }}>{reward.name || "N/A"}</TableCell>
              <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)", color: "#000" }}>{reward.financial_year || "N/A"}</TableCell>
              <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)", color: "#000" }}>{reward.date || "N/A"}</TableCell>
            </TableRow>
          )}
        />

        <ConditionalTable
          title="Salary Details"
          data={salary_history}
          message="No Salary History Available"
          columns={[
            "Sr No.",
            "Designation",
            "Level",
            "Financial Year",
            "W.E.F",
            "Basic + DA",
            "Gross Salary",
            "CTC"
          ]}
          renderRow={(salary, index) => (
            <TableRow key={index}>
              <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)", color: "#000" }}>{index + 1}</TableCell>
              <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)", color: "#000" }}>{salary.designation || "N/A"}</TableCell>
              <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)", color: "#000" }}>{salary.level || "N/A"}</TableCell>
              <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)", color: "#000" }}>{salary.financial_year || "N/A"}</TableCell>
              <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)", color: "#000" }}>{salary.wef || "N/A"}</TableCell>
              <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)", color: "#000" }}>{salary.basic_da || "N/A"}</TableCell>
              <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)", color: "#000" }}>{salary.gross_salary || "N/A"}</TableCell>
              <TableCell sx={{ border: "1px solid rgba(224, 224, 224, 1)", color: "#000" }}>{salary.ctc || "N/A"}</TableCell>
            </TableRow>
          )}
        />
      </PageWrapper>
    </>
  );
});

const EmployeeDetailHr = () => {
  const [selectedItem, setSelectedItem] = useState('Details');
  const [employeeData, setEmployeeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [openPrintDialog, setOpenPrintDialog] = useState(false);
  const [printableData, setPrintableData] = useState(null);
  const [isPrintableLoading, setIsPrintableLoading] = useState(false);

  const page1Ref = useRef(null);
  const page2Ref = useRef(null);
  const page3Ref = useRef(null);
  const page4Ref = useRef(null);

  const pageRefs = {
    page1: page1Ref,
    page2: page2Ref,
    page3: page3Ref,
    page4: page4Ref,
  };

  const { setEmployeeId } = useContext(EmployeeContext);
  const { id } = useParams();

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

  const handleOpenPrintDialog = () => {
    if (!id) {
        alert("Employee user ID is not available to fetch details.");
        return;
    }
    setIsPrintableLoading(true);
    setOpenPrintDialog(true);
    axiosInstance.get(`api/employee/${id}/`)
      .then(res => {
        setPrintableData(res.data);
      })
      .catch(err => {
        console.error("Error fetching printable employee data:", err);
        alert("Failed to load printable details.");
        setOpenPrintDialog(false);
      })
      .finally(() => {
        setIsPrintableLoading(false);
      });
  };

  const handleDownloadPdf = async () => {
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const addPageContent = async (ref, pageNum) => {
      if (ref.current) {
        const hasContent = ref.current.querySelector('h6');
        if (!hasContent) return;

        if (pageNum > 1) {
          pdf.addPage();
        }
        const canvas = await html2canvas(ref.current, { 
          scale: 2, 
          useCORS: true,
          logging: false 
        });
        const imgData = canvas.toDataURL('image/png');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        const pageHeightLimit = pdf.internal.pageSize.getHeight();
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, Math.min(pdfHeight, pageHeightLimit));
      }
    };
    
    let pagesAdded = 0;
    
    const processPage = async (ref) => {
      if (ref.current) {
        const hasContent = ref.current.querySelector('h6');
        if (hasContent) {
          pagesAdded++;
          await addPageContent(ref, pagesAdded);
        }
      }
    };

    await processPage(pageRefs.page1);
    await processPage(pageRefs.page2);
    await processPage(pageRefs.page3);
    await processPage(pageRefs.page4);

    pdf.save(`${employeeData?.emp_name || 'employee'}-details.pdf`);
  };

  if (loading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}><CircularProgress /></Box>;
  }

  if (error) {
    return <Alert severity="error" sx={{ m: 2 }}>{error}</Alert>;
  }

  return (
    <>
      <Box sx={{ flexGrow: 1, p: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Box display="flex" alignItems="center" mb={2}>
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
            
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', mb: 2 }}>
                <Box display="flex" alignItems="center">
                  <SupervisorAccount sx={{ mr: 1, color: 'text.secondary' }} />
                  <Typography>Manager: {employeeData?.manager || "N/A"}</Typography>
                </Box>
                <Button 
                  variant="contained" 
                  onClick={handleOpenPrintDialog}
                  sx={{ 
                    mt: 1.5, 
                    backgroundColor: '#673AB7', 
                    '&:hover': { backgroundColor: '#512DA8' } 
                  }}
                >
                  View Detail
                </Button>
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

          <Grid item xs={12} md={8}>
            <Paper elevation={3} sx={{ p: 2 }}>
              {componentMap[selectedItem]}
            </Paper>
          </Grid>
        </Grid>
      </Box>

      <Dialog 
        open={openPrintDialog} 
        onClose={() => setOpenPrintDialog(false)} 
        fullWidth 
        maxWidth="md"
      >
        <DialogTitle>
          Employee Details
          <IconButton
            onClick={() => setOpenPrintDialog(false)}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          {isPrintableLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}>
              <CircularProgress />
            </Box>
          ) : (
            <PrintableView 
              pageRefs={pageRefs} 
              data={printableData} 
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleDownloadPdf}
            variant="contained"
            startIcon={<DownloadIcon />}
            disabled={isPrintableLoading}
            sx={{
              backgroundColor: "#9c27b0",
              "&:hover": { backgroundColor: "#7b1fa2" }
            }}
          >
            Download PDF
          </Button>
          <Button
            onClick={() => setOpenPrintDialog(false)}
            variant="contained"
            sx={{
              backgroundColor: "#f44336",
              "&:hover": { backgroundColor: "#d32f2f" }
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EmployeeDetailHr;