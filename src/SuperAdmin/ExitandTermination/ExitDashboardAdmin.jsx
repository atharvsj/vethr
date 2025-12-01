// import { useState, useEffect, useCallback, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   Box,
//   Paper,
//   Typography,
//   Grid,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   TextField,
//   Button,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Chip,
//   Alert,
//   Snackbar,
//   IconButton,
//   CircularProgress,
// } from "@mui/material";
// import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
// import axiosInstance from '../../utils/axiosInstance';


// // --- PDF Generation Imports ---
// import jsPDF from "jspdf";
// import html2canvas from "html2canvas";
// import letterheadImage from "../../Assests/letterhead.png"; // <-- IMPORTANT: Make sure this path is correct

// const ExitDashboardAdmin = () => {
//   // --- STATE MANAGEMENT ---
//   const [exitRecords, setExitRecords] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isGenerating, setIsGenerating] = useState({ id: null, type: null, action: null });
//   const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
//   const [hoveredRowId, setHoveredRowId] = useState(null);

//   // --- PDF Generation Refs ---
//   const relievingLetterRef = useRef(null);
//   const experienceLetterRef = useRef(null);
//   const [letterData, setLetterData] = useState(null);
//   const [transparentStamp, setTransparentStamp] = useState(null);
//   const [transparentSign, setTransparentSign] = useState(null);

//   // State for search and pagination
//   const [searchQuery, setSearchQuery] = useState("");
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);

//   const navigate = useNavigate();
//   const buttonColor = "#8A4FFF"; // Vibrant Medium Purple

//   // --- IMAGE PROCESSING ---
//   const makeImageTransparent = (imageUrl) => {
//     return new Promise((resolve, reject) => {
//       if (!imageUrl) {
//         resolve(null);
//         return;
//       }
//       const img = new Image();
//       img.crossOrigin = "Anonymous";
//       img.src = imageUrl;
//       img.onload = () => {
//         const canvas = document.createElement('canvas');
//         const ctx = canvas.getContext("2d");
//         canvas.width = img.width;
//         canvas.height = img.height;
//         ctx.drawImage(img, 0, 0);
//         const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
//         const data = imageData.data;
//         for (let i = 0; i < data.length; i += 4) {
//           if (data[i] > 220 && data[i + 1] > 220 && data[i + 2] > 220) {
//             data[i + 3] = 0;
//           }
//         }
//         ctx.putImageData(imageData, 0, 0);
//         resolve(canvas.toDataURL("image/png"));
//       };
//       img.onerror = (err) => {
//         console.error("Failed to load image for transparency processing:", imageUrl);
//         reject(err);
//       };
//     });
//   };

//   // --- API INTERACTIONS ---
//   const fetchExitRecords = useCallback(async () => {
//     setIsLoading(true);
//     try {
//       const response = await axiosInstance.get("exit-employee-table1/");
//       setExitRecords(response.data || []);
//     } catch (error) {
//       console.error("Error fetching exit records:", error);
//       setSnackbar({ open: true, message: "Failed to load exit records.", severity: "error" });
//     } finally {
//       setIsLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchExitRecords();
//   }, [fetchExitRecords]);

//   useEffect(() => {
//     const lowercasedQuery = searchQuery.toLowerCase();
//     const filtered = exitRecords.filter(record =>
//       record.employee_id?.toLowerCase().includes(lowercasedQuery) ||
//       record.employee_name?.toLowerCase().includes(lowercasedQuery) ||
//       record.exit_type?.toLowerCase().includes(lowercasedQuery)
//     );
//     setFilteredData(filtered);
//   }, [searchQuery, exitRecords]);

//   // --- UI EVENT HANDLERS ---
//   const handleNavigateToProcess = (employeeId) => {
//     navigate(`/hrms/dashboardhr/exitProcessHr/${employeeId}`);
//   };

//   // --- PDF LOGIC ---
//   const fetchLetterData = async (employeeId) => {
//     try {
//       const response = await axiosInstance.get(`data-for-letters/${employeeId}/`);
//       const data = response.data;
//       setLetterData(data);

//       const [stampDataUrl, signDataUrl] = await Promise.all([
//         makeImageTransparent(data.company_stamp?.company_stamp),
//         makeImageTransparent(data.hr_data?.sign)
//       ]);

//       setTransparentStamp(stampDataUrl);
//       setTransparentSign(signDataUrl);

//       return data;
//     } catch (error) {
//       console.error("Error fetching letter data:", error);
//       setSnackbar({ open: true, message: "Failed to fetch data for the letter.", severity: "error" });
//       return null;
//     }
//   };

//   const createPdfDocument = async (elementRef) => {
//     const input = elementRef.current;
//     if (!input) throw new Error("PDF template element not found.");
//     const canvas = await html2canvas(input, { scale: 2, useCORS: true, backgroundColor: null });
//     const contentImgData = canvas.toDataURL('image/png');
//     const pdf = new jsPDF('p', 'mm', 'a4');
//     const pdfWidth = pdf.internal.pageSize.getWidth();
//     const pdfHeight = pdf.internal.pageSize.getHeight();
//     pdf.addImage(letterheadImage, 'PNG', 0, 0, pdfWidth, pdfHeight);
//     const contentImgWidth = pdfWidth;
//     const contentImgHeight = (canvas.height * contentImgWidth) / canvas.width;
//     pdf.addImage(contentImgData, 'PNG', 0, 0, contentImgWidth, contentImgHeight);
//     return pdf;
//   };

//   const processLetter = async (employeeId, letterType, letterRef) => {
//     setIsGenerating({ id: employeeId, type: letterType, action: 'preview' });
//     try {
//       const data = await fetchLetterData(employeeId);
//       if (!data) return;
//       await new Promise(resolve => setTimeout(resolve, 100));
//       const pdf = await createPdfDocument(letterRef);
//       const pdfBlob = pdf.output('blob');
//       const url = URL.createObjectURL(pdfBlob);
//       window.open(url);
//     } catch (error) {
//       console.error("Error during letter preview:", error);
//       setSnackbar({ open: true, message: `Failed to preview ${letterType} Letter.`, severity: "error" });
//     } finally {
//       setIsGenerating({ id: null, type: null, action: null });
//     }
//   };

//   const handleSendLetter = async (employeeId, letterType, letterRef, { endpoint, formDataKey }) => {
//     setIsGenerating({ id: employeeId, type: letterType, action: 'send' });
//     try {
//       const data = await fetchLetterData(employeeId);
//       if (!data) throw new Error("Failed to get data for PDF generation.");

//       await new Promise(resolve => setTimeout(resolve, 100));

//       const pdf = await createPdfDocument(letterRef);
//       const pdfBlob = pdf.output('blob');
//       const pdfFile = new File([pdfBlob], `${employeeId}_${letterType}_letter.pdf`, { type: 'application/pdf' });

//       const formData = new FormData();
//       formData.append(formDataKey, pdfFile);
      
//       const response = await axiosInstance.patch(endpoint, formData, { headers: { "Content-Type": "multipart/form-data" } });
      
//       setExitRecords(prevRecords =>
//         prevRecords.map(record =>
//           record.employee_id === employeeId ? { ...record, ...response.data } : record
//         )
//       );

//       setSnackbar({ open: true, message: `${letterType.charAt(0).toUpperCase() + letterType.slice(1)} Letter sent successfully!`, severity: "success" });
//       setLetterData(null);
//       setTransparentStamp(null);
//       setTransparentSign(null);
//     } catch (error) {
//       console.error(`Error sending ${letterType} letter:`, error);
//       setSnackbar({ open: true, message: `Failed to send ${letterType} Letter.`, severity: "error" });
//     } finally {
//       setIsGenerating({ id: null, type: null, action: null });
//     }
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const formatYesNo = (value) => {
//     const isYes = value?.trim().toUpperCase() === 'Y';
//     return <Chip label={isYes ? "Yes" : "No"} color={isYes ? "success" : "error"} size="small" />;
//   };

//   // --- THIS IS THE MODIFIED FUNCTION ---
//   const renderLetterCell = (record, type) => {
//     const isFullAndFinalDone = record["f&f"]?.trim().toUpperCase() === 'Y';
//     if (!isFullAndFinalDone) return <Typography variant="caption" color="text.secondary">N/A</Typography>;

//     const letterInfo = {
//       relieving: { isSent: !!record.relieving_letter, url: record.relieving_letter, ref: relievingLetterRef, endpoint: `update-exit-employee-table2/${record.employee_id}/`, formDataKey: 'relieving_letter', prereqMet: true },
//       experience: { isSent: !!record.experience_letter, url: record.experience_letter, ref: experienceLetterRef, endpoint: `update-exit-employee-table3/${record.employee_id}/`, formDataKey: 'experience_letter', prereqMet: !!record.relieving_letter }
//     }[type];

//     if (!letterInfo.prereqMet) return <Typography variant="caption" color="text.secondary">-</Typography>;

//     if (letterInfo.isSent) {
//       return (
//         <Box display="flex" flexDirection="column" alignItems="center" gap={0.5}>
//           <Button
//             size="small"
//             variant="contained"
//             onClick={() => window.open(letterInfo.url, '_blank')}
//             sx={{ backgroundColor: buttonColor, '&:hover': { backgroundColor: '#7a3de0' } }}
//           >
//             Show
//           </Button>
//           <Typography variant="caption" sx={{ color: "red" }}>
//   Letter Sent
// </Typography>
//         </Box>
//       );
//     }

//     return (
//       <Box display="flex" flexDirection="column" gap={1}>
//         <Button
//           size="small"
//           variant="outlined"
//           onClick={() => processLetter(record.employee_id, type, letterInfo.ref)}
//           disabled={isGenerating.id === record.employee_id}
//           sx={{
//             color: buttonColor,
//             borderColor: buttonColor,
//             '&:hover': { borderColor: '#7a3de0', color: '#7a3de0' }
//           }}
//         >
//           {isGenerating.id === record.employee_id && isGenerating.action === 'preview' ? <CircularProgress size={20} color="inherit" /> : "Preview"}
//         </Button>
//         <Button
//           size="small"
//           variant="contained"
//           onClick={() => handleSendLetter(record.employee_id, type, letterInfo.ref, letterInfo)}
//           disabled={isGenerating.id === record.employee_id}
//           sx={{ backgroundColor: buttonColor, '&:hover': { backgroundColor: '#7a3de0' } }}
//         >
//           {isGenerating.id === record.employee_id && isGenerating.action === 'send' ? <CircularProgress size={20} color="inherit" /> : "Send"}
//         </Button>
//       </Box>
//     );
//   };


//   return (
//     <Box>
//       {/* Hidden templates for PDF generation */}
//       <Box sx={{ position: 'absolute', left: '-9999px', fontFamily: 'serif', color: 'black' }}>
//         {letterData && (
//           <>
//             {/* --- Relieving Letter Template --- */}
//             <div ref={relievingLetterRef} style={{ width: '210mm', height: '297mm', fontSize: '12pt', lineHeight: '1.5' }}>
//               <Box sx={{ paddingTop: '40mm', paddingX: '20mm' }}>
//                 <Typography variant="h6" sx={{ textDecoration: 'underline', textAlign: 'center', fontWeight: 'bold' }}>
//                     Relieving Letter
//                 </Typography>
//                 <Typography sx={{ textAlign: 'right', mt: -3, mb: '15mm' }}>
//                     Date: {new Date().toLocaleDateString('en-GB')}
//                 </Typography>
//                 <Box sx={{ mb: '10mm' }}>
//                   <Typography>To,</Typography>
//                   <Typography sx={{ fontWeight: 'bold' }}>{letterData.emp_data.employee_name}</Typography>
//                   <Typography>{letterData.emp_data.address_1}</Typography>
//                 </Box>
//                 <Typography sx={{ mb: '8mm' }}>
//                   This is to inform you that, you have been relived from your duties into Vetrina Healthcare Pvt Ltd, with
//                   effect from (Last working day {new Date(letterData.last_working_date[0]).toLocaleDateString('en-GB')})
//                 </Typography>
//                 <Typography sx={{ mb: '8mm' }}>
//                   We appreciate your contribution during your employment and wish you all the best for future prospects.
//                   Please feel free to contact HR department for any further information or assistance regarding your
//                   relieving or final settlement process.
//                 </Typography>
//                 <Box sx={{ mt: '20mm' }}>
//                   <Box sx={{ mt: '20mm' }}>
//   <Box sx={{ position: 'relative', height: '150px', mb: 1 }}>
//     {transparentStamp && (
//       <img
//         src={transparentStamp}
//         alt="Company Stamp"
//         style={{
//           position: "absolute",
//           left: "0px",
//           top: "-20px",   // ⬅️ move stamp upward
//           width: "120px",
//           height: "auto",
//           opacity: 0.8,
//           zIndex: 1,
//         }}
//       />
//     )}
//     {transparentSign && (
//       <img
//         src={transparentSign}
//         alt="Signature"
//         style={{
//           position: "absolute",
//              // ⬅️ shift slightly right so it doesn’t collide
//           top: "90px",    // ⬅️ move signature downward
//           width: "120px",
//           height: "auto",
//           zIndex: 2,
//         }}
//       />
//     )}
//   </Box>
//   <Typography>(Sign and stamp)</Typography>
//   <Typography>Best Regards,</Typography>
//  <Typography>
//   {letterData.hr_data.gender === "Male" ? "Mr." : "Ms."} {letterData.hr_data.hr_name}
// </Typography>
//   <Typography>{letterData.hr_data.designation_name}</Typography>
//   <Typography>Vetrina Healthcare Pvt. Ltd.</Typography>
// </Box>

                
//                 </Box>
//               </Box>
//             </div>

//             {/* --- Experience Letter Template --- */}
//             <div ref={experienceLetterRef} style={{ width: '210mm', height: '297mm', fontSize: '12pt', lineHeight: '1.5' }}>
//               <Box sx={{ paddingTop: '40mm', paddingX: '20mm' }}>
//                 <Typography variant="h6" sx={{ textDecoration: 'underline', textAlign: 'center', fontWeight: 'bold' }}>
//                     Experience Letter
//                 </Typography>
//                 <Typography sx={{ textAlign: 'right', mt: -3, mb: '15mm' }}>
//                     Date: {new Date().toLocaleDateString('en-GB')}
//                 </Typography>
//                 <Box sx={{ mb: '10mm' }}>
//                   <Typography>To,</Typography>
//                   <Typography> <strong>{letterData.emp_data.employee_name}</strong></Typography>
//                   <Typography> {letterData.emp_data.address_1}</Typography>
//                 </Box>
//                <Typography sx={{ mb: '8mm' }}>
//   This is to certify that 
//   {letterData.emp_data.gender === "Male" ? " Mr. " : " Ms. "}
//   <strong>{letterData.emp_data.employee_name}</strong> worked with us
//   from {
//     (() => {
//       const doj = letterData.emp_data.date_of_joining;
//       if (!doj) return "N/A";
//       const [day, month, year] = doj.split("-");
//       return new Date(`${year}-${month}-${day}`).toLocaleDateString("en-GB");
//     })()
//   } to {new Date(letterData.last_working_date[0]).toLocaleDateString("en-GB")} 
//   and was designated as "{letterData.emp_data.designation_name || "Not Specified"}" 
//   at the time of leaving the organisation. 
//   {letterData.emp_data.gender === "Male" ? " He" : " She"} has done a great job during the tenure here.
// </Typography>

// <Typography sx={{ mb: '8mm' }}>
//   Vetrina Healthcare extends its sincere appreciation to 
//   {letterData.emp_data.gender === "Male" ? " Mr. " : " Ms. "}
//   <strong>{letterData.emp_data.employee_name}</strong> 
//   for contribution during {letterData.emp_data.gender === "Male" ? "his" : "her"} employment.
// </Typography>

//                 <Box sx={{ mt: '20mm' }}>
//                 <Box sx={{ position: 'relative', height: '150px', mb: 1 }}>
//   {transparentStamp && (
//     <img
//       src={transparentStamp}
//       alt="Company Stamp"
//       style={{
//         position: "absolute",
//         left: "0px",
//         top: "-20px",   // ⬅️ stamp moved up
//         width: "120px",
//         height: "auto",
//         opacity: 0.8,
//         zIndex: 1,
//       }}
//     />
//   )}
//   {transparentSign && (
//     <img
//       src={transparentSign}
//       alt="Signature"
//       style={{
//         position: "absolute",
//            // ⬅️ shifted right
//         top: "90px",    // ⬅️ moved down
//         width: "120px",
//         height: "auto",
//         zIndex: 2,
//       }}
//     />
//   )}
// </Box>

//                   <Typography>(Sign and stamp)</Typography>
//                   <Typography>Best Regards,</Typography>
//                  <Typography>
//   {letterData.hr_data.gender === "Male" ? "Mr." : "Ms."} {letterData.hr_data.hr_name}
// </Typography>
//                   <Typography>{letterData.hr_data.designation_name}</Typography>
//                   <Typography>Vetrina Healthcare Pvt. Ltd.</Typography>
//                 </Box>
//               </Box>
//             </div>
//           </>
//         )}
//       </Box>

//       {/* --- The rest of the dashboard UI --- */}
//       <Typography variant="h4" gutterBottom>Exit Dashboard</Typography>
//       <Paper sx={{ p: 3 }}>
//         <Grid container spacing={2} sx={{ mb: 2 }} alignItems="center">
//           <Grid item xs={12} sm={6} md={2}>
//             <FormControl size="small" sx={{ width: 120 }}>
//               <InputLabel>Rows per page</InputLabel>
//               <Select value={rowsPerPage} label="Rows per page" onChange={handleChangeRowsPerPage}>
//                 <MenuItem value={5}>5</MenuItem>
//                 <MenuItem value={10}>10</MenuItem>
//                 <MenuItem value={25}>25</MenuItem>
//               </Select>
//             </FormControl>
//           </Grid>
//           <Grid item xs={12} sm={6} md={3} sx={{ ml: "auto" }}>
//             <TextField fullWidth size="small" label="Search" variant="outlined" value={searchQuery} onChange={(e) => { setSearchQuery(e.target.value); setPage(0); }} />
//           </Grid>
//         </Grid>

//         <TableContainer>
//           {isLoading ? (
//             <Box sx={{ display: 'flex', justifyContent: 'center', my: 5 }}><CircularProgress /><Typography sx={{ ml: 2 }}>Loading Records...</Typography></Box>
//           ) : (
//             <Table>
//               <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
//                 <TableRow sx={{ '& th': { fontWeight: 'bold' } }}>
//                   <TableCell>Sr No.</TableCell>
//                   <TableCell>Employee ID</TableCell>
//                   <TableCell>Employee Name</TableCell>
//                   <TableCell sx={{ width: '60px' }}></TableCell>
//                   <TableCell>Exit Type</TableCell>
//                   <TableCell>Return Asset</TableCell>
//                   <TableCell>Exit Interview</TableCell>
//                   <TableCell>Clearance Form</TableCell>
//                   <TableCell>Full & Final</TableCell>
//                   <TableCell>Relieving Letter</TableCell>
//                   <TableCell>Experience Letter</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {filteredData.length > 0 ? (
//                   filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((record, index) => (
//                     <TableRow key={record.employee_id + index} onMouseEnter={() => setHoveredRowId(record.employee_id)} onMouseLeave={() => setHoveredRowId(null)} sx={{ '&:hover': { backgroundColor: '#fafafa' } }}>
//                       <TableCell>{page * rowsPerPage + index + 1}</TableCell>
//                       <TableCell>{record.employee_id}</TableCell>
//                       <TableCell>{record.employee_name}</TableCell>
//                       <TableCell sx={{ padding: '0 8px', textAlign: 'center' }}>
//                         {hoveredRowId === record.employee_id && (
//                           <IconButton onClick={() => handleNavigateToProcess(record.employee_id)} size="small" sx={{ color: '#E55D87' }}>
//                             <ArrowForwardIcon fontSize="small" />
//                           </IconButton>
//                         )}
//                       </TableCell>
//                       <TableCell>{record.exit_type || "N/A"}</TableCell>
//                       <TableCell>{formatYesNo(record.return_asset)}</TableCell>
//                       <TableCell>{formatYesNo(record.exit_interview_questionnaire)}</TableCell>
//                       <TableCell>{formatYesNo(record.employee_clearance_form)}</TableCell>
//                       <TableCell>{formatYesNo(record["f&f"])}</TableCell>
//                       <TableCell>{renderLetterCell(record, 'relieving')}</TableCell>
//                       <TableCell>{renderLetterCell(record, 'experience')}</TableCell>
//                     </TableRow>
//                   ))
//                 ) : (
//                   <TableRow><TableCell colSpan={11} align="center">No matching records found.</TableCell></TableRow>
//                 )}
//               </TableBody>
//             </Table>
//           )}
//         </TableContainer>

//         <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', p: 2 }}>
//           <Button variant="contained" onClick={() => setPage(page - 1)} disabled={page === 0} sx={{ mr: 2 }}>Previous</Button>
//           <Typography variant="body2" sx={{ fontWeight: 'bold' }}>Page {page + 1}</Typography>
//           <Button variant="contained" onClick={() => setPage(page + 1)} disabled={(page + 1) * rowsPerPage >= filteredData.length} sx={{ ml: 2 }}>Next</Button>
//         </Box>
//       </Paper>

//       <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
//         <Alert severity={snackbar.severity} sx={{ width: "100%" }}>{snackbar.message}</Alert>
//       </Snackbar>
//     </Box>
//   );
// };

// export default ExitDashboardAdmin;








import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Paper,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Alert,
  Snackbar,
  IconButton,
  CircularProgress,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import axiosInstance from '../../utils/axiosInstance';


// --- PDF Generation Imports ---
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import letterheadImage from "../../Assests/letterhead.png"; // <-- IMPORTANT: Make sure this path is correct

const ExitDashboardAdmin = () => {
  // --- STATE MANAGEMENT ---
  const [exitRecords, setExitRecords] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isGenerating, setIsGenerating] = useState({ id: null, type: null, action: null });
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const [hoveredRowId, setHoveredRowId] = useState(null);

  // --- PDF Generation Refs ---
  const relievingLetterRef = useRef(null);
  const experienceLetterRef = useRef(null);
  const [letterData, setLetterData] = useState(null);
  const [transparentStamp, setTransparentStamp] = useState(null);
  const [transparentSign, setTransparentSign] = useState(null);

  // State for search and pagination
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const navigate = useNavigate();
  const buttonColor = "#8A4FFF"; // Vibrant Medium Purple

  // --- IMAGE PROCESSING ---
  const makeImageTransparent = (imageUrl) => {
    return new Promise((resolve, reject) => {
      if (!imageUrl) {
        resolve(null);
        return;
      }
      const img = new Image();
      img.crossOrigin = "Anonymous";
      img.src = imageUrl;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext("2d");
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        for (let i = 0; i < data.length; i += 4) {
          if (data[i] > 220 && data[i + 1] > 220 && data[i + 2] > 220) {
            data[i + 3] = 0;
          }
        }
        ctx.putImageData(imageData, 0, 0);
        resolve(canvas.toDataURL("image/png"));
      };
      img.onerror = (err) => {
        console.error("Failed to load image for transparency processing:", imageUrl);
        reject(err);
      };
    });
  };

  // --- API INTERACTIONS ---
  const fetchExitRecords = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get("exit-employee-table1/");
      setExitRecords(response.data || []);
    } catch (error) {
      console.error("Error fetching exit records:", error);
      setSnackbar({ open: true, message: "Failed to load exit records.", severity: "error" });
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchExitRecords();
  }, [fetchExitRecords]);

  // --- THIS IS THE CORRECTED FUNCTION ---
  useEffect(() => {
    const lowercasedQuery = searchQuery.toLowerCase();
    const filtered = exitRecords.filter(record =>
      (record.employee_id || '').toLowerCase().includes(lowercasedQuery) ||
      (record.employee_name || '').toLowerCase().includes(lowercasedQuery) ||
      (record.exit_type || '').toLowerCase().includes(lowercasedQuery)
    );
    setFilteredData(filtered);
  }, [searchQuery, exitRecords]);


  // --- UI EVENT HANDLERS ---
  const handleNavigateToProcess = (employeeId) => {
    navigate(`/hrms/dashboardhr/exitProcessHr/${employeeId}`);
  };

  // --- PDF LOGIC ---
  const fetchLetterData = async (employeeId) => {
    try {
      const response = await axiosInstance.get(`data-for-letters/${employeeId}/`);
      const data = response.data;
      setLetterData(data);

      const [stampDataUrl, signDataUrl] = await Promise.all([
        makeImageTransparent(data.company_stamp?.company_stamp),
        makeImageTransparent(data.hr_data?.sign)
      ]);

      setTransparentStamp(stampDataUrl);
      setTransparentSign(signDataUrl);

      return data;
    } catch (error) {
      console.error("Error fetching letter data:", error);
      setSnackbar({ open: true, message: "Failed to fetch data for the letter.", severity: "error" });
      return null;
    }
  };

  const createPdfDocument = async (elementRef) => {
    const input = elementRef.current;
    if (!input) throw new Error("PDF template element not found.");
    const canvas = await html2canvas(input, { scale: 2, useCORS: true, backgroundColor: null });
    const contentImgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    pdf.addImage(letterheadImage, 'PNG', 0, 0, pdfWidth, pdfHeight);
    const contentImgWidth = pdfWidth;
    const contentImgHeight = (canvas.height * contentImgWidth) / canvas.width;
    pdf.addImage(contentImgData, 'PNG', 0, 0, contentImgWidth, contentImgHeight);
    return pdf;
  };

  const processLetter = async (employeeId, letterType, letterRef) => {
    setIsGenerating({ id: employeeId, type: letterType, action: 'preview' });
    try {
      const data = await fetchLetterData(employeeId);
      if (!data) return;
      await new Promise(resolve => setTimeout(resolve, 100));
      const pdf = await createPdfDocument(letterRef);
      const pdfBlob = pdf.output('blob');
      const url = URL.createObjectURL(pdfBlob);
      window.open(url);
    } catch (error) {
      console.error("Error during letter preview:", error);
      setSnackbar({ open: true, message: `Failed to preview ${letterType} Letter.`, severity: "error" });
    } finally {
      setIsGenerating({ id: null, type: null, action: null });
    }
  };

  const handleSendLetter = async (employeeId, letterType, letterRef, { endpoint, formDataKey }) => {
    setIsGenerating({ id: employeeId, type: letterType, action: 'send' });
    try {
      const data = await fetchLetterData(employeeId);
      if (!data) throw new Error("Failed to get data for PDF generation.");

      await new Promise(resolve => setTimeout(resolve, 100));

      const pdf = await createPdfDocument(letterRef);
      const pdfBlob = pdf.output('blob');
      const pdfFile = new File([pdfBlob], `${employeeId}_${letterType}_letter.pdf`, { type: 'application/pdf' });

      const formData = new FormData();
      formData.append(formDataKey, pdfFile);
      
      const response = await axiosInstance.patch(endpoint, formData, { headers: { "Content-Type": "multipart/form-data" } });
      
      setExitRecords(prevRecords =>
        prevRecords.map(record =>
          record.employee_id === employeeId ? { ...record, ...response.data } : record
        )
      );

      setSnackbar({ open: true, message: `${letterType.charAt(0).toUpperCase() + letterType.slice(1)} Letter sent successfully!`, severity: "success" });
      setLetterData(null);
      setTransparentStamp(null);
      setTransparentSign(null);
    } catch (error) {
      console.error(`Error sending ${letterType} letter:`, error);
      setSnackbar({ open: true, message: `Failed to send ${letterType} Letter.`, severity: "error" });
    } finally {
      setIsGenerating({ id: null, type: null, action: null });
    }
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const formatYesNo = (value) => {
    // Safely check the value
    const isYes = typeof value === 'string' && value.trim().toUpperCase() === 'Y';
    return <Chip label={isYes ? "Yes" : "No"} color={isYes ? "success" : "error"} size="small" />;
  };

  const renderLetterCell = (record, type) => {
    const isFullAndFinalDone = record["f&f"]?.trim().toUpperCase() === 'Y';
    if (!isFullAndFinalDone) return <Typography variant="caption" color="text.secondary">N/A</Typography>;

    const letterInfo = {
      relieving: { isSent: !!record.relieving_letter, url: record.relieving_letter, ref: relievingLetterRef, endpoint: `update-exit-employee-table2/${record.employee_id}/`, formDataKey: 'relieving_letter', prereqMet: true },
      experience: { isSent: !!record.experience_letter, url: record.experience_letter, ref: experienceLetterRef, endpoint: `update-exit-employee-table3/${record.employee_id}/`, formDataKey: 'experience_letter', prereqMet: !!record.relieving_letter }
    }[type];

    if (!letterInfo.prereqMet) return <Typography variant="caption" color="text.secondary">-</Typography>;

    if (letterInfo.isSent) {
      return (
        <Box display="flex" flexDirection="column" alignItems="center" gap={0.5}>
          <Button
            size="small"
            variant="contained"
            onClick={() => window.open(letterInfo.url, '_blank')}
            sx={{ backgroundColor: buttonColor, '&:hover': { backgroundColor: '#7a3de0' } }}
          >
            Show
          </Button>
          <Typography variant="caption" sx={{ color: "red" }}>
            Letter Sent
          </Typography>
        </Box>
      );
    }

    return (
      <Box display="flex" flexDirection="column" gap={1}>
        <Button
          size="small"
          variant="outlined"
          onClick={() => processLetter(record.employee_id, type, letterInfo.ref)}
          disabled={isGenerating.id === record.employee_id}
          sx={{
            color: buttonColor,
            borderColor: buttonColor,
            '&:hover': { borderColor: '#7a3de0', color: '#7a3de0' }
          }}
        >
          {isGenerating.id === record.employee_id && isGenerating.action === 'preview' ? <CircularProgress size={20} color="inherit" /> : "Preview"}
        </Button>
        <Button
          size="small"
          variant="contained"
          onClick={() => handleSendLetter(record.employee_id, type, letterInfo.ref, letterInfo)}
          disabled={isGenerating.id === record.employee_id}
          sx={{ backgroundColor: buttonColor, '&:hover': { backgroundColor: '#7a3de0' } }}
        >
          {isGenerating.id === record.employee_id && isGenerating.action === 'send' ? <CircularProgress size={20} color="inherit" /> : "Send"}
        </Button>
      </Box>
    );
  };


  return (
    <Box>
      {/* Hidden templates for PDF generation */}
      <Box sx={{ position: 'absolute', left: '-9999px', fontFamily: 'serif', color: 'black' }}>
        {letterData && (
          <>
            {/* --- Relieving Letter Template --- */}
            <div ref={relievingLetterRef} style={{ width: '210mm', height: '297mm', fontSize: '12pt', lineHeight: '1.5' }}>
              <Box sx={{ paddingTop: '40mm', paddingX: '20mm' }}>
                <Typography variant="h6" sx={{ textDecoration: 'underline', textAlign: 'center', fontWeight: 'bold' }}>
                    Relieving Letter
                </Typography>
                <Typography sx={{ textAlign: 'right', mt: -3, mb: '15mm' }}>
                    Date: {new Date().toLocaleDateString('en-GB')}
                </Typography>
                <Box sx={{ mb: '10mm' }}>
                  <Typography>To,</Typography>
                  <Typography sx={{ fontWeight: 'bold' }}>{letterData.emp_data?.employee_name || "Employee Name"}</Typography>
                  <Typography>{letterData.emp_data?.address_1 || "Address"}</Typography>
                </Box>
                <Typography sx={{ mb: '8mm' }}>
                  This is to inform you that, you have been relived from your duties into Vetrina Healthcare Pvt Ltd, with
                  effect from (Last working day {letterData.last_working_date ? new Date(letterData.last_working_date[0]).toLocaleDateString('en-GB') : 'N/A'})
                </Typography>
                <Typography sx={{ mb: '8mm' }}>
                  We appreciate your contribution during your employment and wish you all the best for future prospects.
                  Please feel free to contact HR department for any further information or assistance regarding your
                  relieving or final settlement process.
                </Typography>
                <Box sx={{ mt: '20mm' }}>
                  <Box sx={{ position: 'relative', height: '150px', mb: 1 }}>
                    {transparentStamp && (
                      <img
                        src={transparentStamp}
                        alt="Company Stamp"
                        style={{ position: "absolute", left: "0px", top: "-20px", width: "120px", height: "auto", opacity: 0.8, zIndex: 1 }}
                      />
                    )}
                    {transparentSign && (
                      <img
                        src={transparentSign}
                        alt="Signature"
                        style={{ position: "absolute", top: "90px", width: "120px", height: "auto", zIndex: 2 }}
                      />
                    )}
                  </Box>
                  <Typography>(Sign and stamp)</Typography>
                  <Typography>Best Regards,</Typography>
                  <Typography>
                    {letterData.hr_data?.gender === "Male" ? "Mr." : "Ms."} {letterData.hr_data?.hr_name || "HR Name"}
                  </Typography>
                  <Typography>{letterData.hr_data?.designation_name || "Designation"}</Typography>
                  <Typography>Vetrina Healthcare Pvt. Ltd.</Typography>
                </Box>
              </Box>
            </div>

            {/* --- Experience Letter Template --- */}
            <div ref={experienceLetterRef} style={{ width: '210mm', height: '297mm', fontSize: '12pt', lineHeight: '1.5' }}>
              <Box sx={{ paddingTop: '40mm', paddingX: '20mm' }}>
                <Typography variant="h6" sx={{ textDecoration: 'underline', textAlign: 'center', fontWeight: 'bold' }}>
                    Experience Letter
                </Typography>
                <Typography sx={{ textAlign: 'right', mt: -3, mb: '15mm' }}>
                    Date: {new Date().toLocaleDateString('en-GB')}
                </Typography>
                <Box sx={{ mb: '10mm' }}>
                  <Typography>To,</Typography>
                  <Typography> <strong>{letterData.emp_data?.employee_name || "Employee Name"}</strong></Typography>
                  <Typography> {letterData.emp_data?.address_1 || "Address"}</Typography>
                </Box>
               <Typography sx={{ mb: '8mm' }}>
                This is to certify that 
                {letterData.emp_data?.gender === "Male" ? " Mr. " : " Ms. "}
                <strong>{letterData.emp_data?.employee_name}</strong> worked with us
                from {
                  (() => {
                    const doj = letterData.emp_data?.date_of_joining;
                    if (!doj) return "N/A";
                    const [day, month, year] = doj.split("-");
                    return new Date(`${year}-${month}-${day}`).toLocaleDateString("en-GB");
                  })()
                } to {letterData.last_working_date ? new Date(letterData.last_working_date[0]).toLocaleDateString("en-GB") : 'N/A'} 
                and was designated as "{letterData.emp_data?.designation_name || "Not Specified"}" 
                at the time of leaving the organisation. 
                {letterData.emp_data?.gender === "Male" ? " He" : " She"} has done a great job during the tenure here.
              </Typography>
              <Typography sx={{ mb: '8mm' }}>
                Vetrina Healthcare extends its sincere appreciation to 
                {letterData.emp_data?.gender === "Male" ? " Mr. " : " Ms. "}
                <strong>{letterData.emp_data?.employee_name}</strong> 
                for contribution during {letterData.emp_data?.gender === "Male" ? "his" : "her"} employment.
              </Typography>
                <Box sx={{ mt: '20mm' }}>
                <Box sx={{ position: 'relative', height: '150px', mb: 1 }}>
                  {transparentStamp && (
                    <img
                      src={transparentStamp}
                      alt="Company Stamp"
                      style={{ position: "absolute", left: "0px", top: "-20px", width: "120px", height: "auto", opacity: 0.8, zIndex: 1 }}
                    />
                  )}
                  {transparentSign && (
                    <img
                      src={transparentSign}
                      alt="Signature"
                      style={{ position: "absolute", top: "90px", width: "120px", height: "auto", zIndex: 2 }}
                    />
                  )}
                </Box>
                  <Typography>(Sign and stamp)</Typography>
                  <Typography>Best Regards,</Typography>
                  <Typography>
                    {letterData.hr_data?.gender === "Male" ? "Mr." : "Ms."} {letterData.hr_data?.hr_name || "HR Name"}
                  </Typography>
                  <Typography>{letterData.hr_data?.designation_name || "Designation"}</Typography>
                  <Typography>Vetrina Healthcare Pvt. Ltd.</Typography>
                </Box>
              </Box>
            </div>
          </>
        )}
      </Box>

      {/* --- The rest of the dashboard UI --- */}
      <Typography variant="h4" gutterBottom>Exit Dashboard</Typography>
      <Paper sx={{ p: 3, overflowX: 'auto' }}>
        <Grid container spacing={2} sx={{ mb: 2 }} alignItems="center">
          <Grid item xs={12} sm={6} md={2}>
            <FormControl size="small" sx={{ width: 120 }}>
              <InputLabel>Rows per page</InputLabel>
              <Select value={rowsPerPage} label="Rows per page" onChange={handleChangeRowsPerPage}>
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={25}>25</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={3} sx={{ ml: "auto" }}>
            <TextField fullWidth size="small" label="Search" variant="outlined" value={searchQuery} onChange={(e) => { setSearchQuery(e.target.value); setPage(0); }} />
          </Grid>
        </Grid>

        <TableContainer>
          {isLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 5 }}><CircularProgress /><Typography sx={{ ml: 2 }}>Loading Records...</Typography></Box>
          ) : (
            <Table sx={{ minWidth: 1200 }}>
              <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                <TableRow sx={{ '& th': { fontWeight: 'bold' } }}>
                  <TableCell>Sr No.</TableCell>
                  <TableCell>Employee ID</TableCell>
                  <TableCell>Employee Name</TableCell>
                  <TableCell sx={{ width: '60px' }}></TableCell>
                  <TableCell>Exit Type</TableCell>
                  <TableCell>Return Asset</TableCell>
                  <TableCell>Exit Interview</TableCell>
                  <TableCell>Clearance Form</TableCell>
                  <TableCell>Full & Final</TableCell>
                  <TableCell>Relieving Letter</TableCell>
                  <TableCell>Experience Letter</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredData.length > 0 ? (
                  filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((record, index) => (
                    <TableRow key={record.employee_id || index} onMouseEnter={() => setHoveredRowId(record.employee_id)} onMouseLeave={() => setHoveredRowId(null)} sx={{ '&:hover': { backgroundColor: '#fafafa' } }}>
                      <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                      <TableCell>{record.employee_id || "N/A"}</TableCell>
                      <TableCell>{record.employee_name || "N/A"}</TableCell>
                      <TableCell sx={{ padding: '0 8px', textAlign: 'center' }}>
                        {hoveredRowId === record.employee_id && (
                          <IconButton onClick={() => handleNavigateToProcess(record.employee_id)} size="small" sx={{ color: '#E55D87' }}>
                            <ArrowForwardIcon fontSize="small" />
                          </IconButton>
                        )}
                      </TableCell>
                      <TableCell>{record.exit_type || "N/A"}</TableCell>
                      <TableCell>{formatYesNo(record.return_asset)}</TableCell>
                      <TableCell>{formatYesNo(record.exit_interview_questionnaire)}</TableCell>
                      <TableCell>{formatYesNo(record.employee_clearance_form)}</TableCell>
                      <TableCell>{formatYesNo(record["f&f"])}</TableCell>
                      <TableCell>{renderLetterCell(record, 'relieving')}</TableCell>
                      <TableCell>{renderLetterCell(record, 'experience')}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow><TableCell colSpan={11} align="center">No matching records found.</TableCell></TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </TableContainer>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', p: 2 }}>
          <Button variant="contained" onClick={() => setPage(page - 1)} disabled={page === 0} sx={{ mr: 2 }}>Previous</Button>
          <Typography variant="body2" sx={{ fontWeight: 'bold' }}>Page {page + 1}</Typography>
          <Button variant="contained" onClick={() => setPage(page + 1)} disabled={(page + 1) * rowsPerPage >= filteredData.length} sx={{ ml: 2 }}>Next</Button>
        </Box>
      </Paper>

      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
        <Alert severity={snackbar.severity} sx={{ width: "100%" }}>{snackbar.message}</Alert>
      </Snackbar>
    </Box>
  );
};

export default ExitDashboardAdmin;