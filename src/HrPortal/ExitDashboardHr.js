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
// import axiosInstance from "../utils/axiosInstance";

// // --- PDF Generation Imports ---
// import jsPDF from "jspdf";
// import html2canvas from "html2canvas";
// import letterheadImage from "../Assests/letterhead.png"; // <-- IMPORTANT: Make sure this path is correct

// const ExitDashboardHr = () => {
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

// export default ExitDashboardHr;




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
//   Tabs,
//   Tab,
// } from "@mui/material";
// import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
// import axiosInstance from "../utils/axiosInstance";

// // --- PDF Generation Imports ---
// import jsPDF from "jspdf";
// import html2canvas from "html2canvas";
// import letterheadImage from "../Assests/letterhead.png";

// // Helper component for Tab Panels
// function TabPanel(props) {
//   const { children, value, index, ...other } = props;
//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`simple-tabpanel-${index}`}
//       aria-labelledby={`simple-tab-${index}`}
//       {...other}
//     >
//       {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
//     </div>
//   );
// }

// const ExitDashboardHr = () => {
//   // --- STATE MANAGEMENT ---
//   const [exitRecords, setExitRecords] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isGenerating, setIsGenerating] = useState({ id: null, type: null, action: null });
//   const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
//   const [hoveredRowId, setHoveredRowId] = useState(null);
//   const [activeTab, setActiveTab] = useState(0);

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
//   const buttonColor = "#8A4FFF";

//   // --- IMAGE PROCESSING (Unchanged) ---
//   const makeImageTransparent = (imageUrl) => {
//     return new Promise((resolve, reject) => {
//         if (!imageUrl) {
//             resolve(null);
//             return;
//         }
//         const img = new Image();
//         img.crossOrigin = "Anonymous";
//         img.src = imageUrl;
//         img.onload = () => {
//             const canvas = document.createElement('canvas');
//             const ctx = canvas.getContext("2d");
//             canvas.width = img.width;
//             canvas.height = img.height;
//             ctx.drawImage(img, 0, 0);
//             const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
//             const data = imageData.data;
//             for (let i = 0; i < data.length; i += 4) {
//                 if (data[i] > 220 && data[i + 1] > 220 && data[i + 2] > 220) {
//                     data[i + 3] = 0;
//                 }
//             }
//             ctx.putImageData(imageData, 0, 0);
//             resolve(canvas.toDataURL("image/png"));
//         };
//         img.onerror = (err) => {
//             console.error("Failed to load image for transparency processing:", imageUrl);
//             reject(err);
//         };
//     });
//   };


//   // --- UPDATED: API INTERACTIONS FOR ALL TABS ---
//   const fetchDataForTab = useCallback(async (tabIndex) => {
//     setIsLoading(true);
//     let endpoint = "exit-employee-table1/"; // Default for Tab 0
//     if (tabIndex === 1) {
//       endpoint = "exit-employee-table2/"; // API for Relieving Letter Tab
//     } else if (tabIndex === 2) {
//       endpoint = "exit-employee-table3/"; // API for Experience Letter Tab
//     } else if (tabIndex === 3) {
//       endpoint = "exit-employee-finaltable/"; // API for Exited Employee Tab
//     }

//     try {
//       const response = await axiosInstance.get(endpoint);
//       setExitRecords(response.data || []);
//     } catch (error) {
//       console.error(`Error fetching records for tab ${tabIndex}:`, error);
//       setSnackbar({ open: true, message: "Failed to load records.", severity: "error" });
//       setExitRecords([]);
//     } finally {
//       setIsLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchDataForTab(activeTab);
//   }, [activeTab, fetchDataForTab]);

//   useEffect(() => {
//     const lowercasedQuery = searchQuery.toLowerCase();
//     const filtered = exitRecords.filter(record =>
//       record.employee_id?.toLowerCase().includes(lowercasedQuery) ||
//       record.employee_name?.toLowerCase().includes(lowercasedQuery) ||
//       record.exit_type?.toLowerCase().includes(lowercasedQuery)
//     );
//     setFilteredData(filtered);
//     setPage(0);
//   }, [searchQuery, exitRecords]);

//   // --- UI EVENT HANDLERS ---
//   const handleNavigateToProcess = (employeeId) => {
//     navigate(`/hrms/dashboardhr/exitProcessHr/${employeeId}`);
//   };

//   const handleTabChange = (event, newValue) => {
//     setActiveTab(newValue);
//   };
 
//   // --- PDF LOGIC (Unchanged) ---
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
//       await axiosInstance.patch(endpoint, formData, { headers: { "Content-Type": "multipart/form-data" } });
     
//       // Refetch data for the current tab to show the update
//       fetchDataForTab(activeTab);

//       setSnackbar({ open: true, message: `${letterType.charAt(0).toUpperCase() + letterType.slice(1)} Letter sent successfully!`, severity: "success" });
//       setLetterData(null);
//     } catch (error) {
//       console.error(`Error sending ${letterType} letter:`, error);
//       setSnackbar({ open: true, message: `Failed to send ${letterType} Letter.`, severity: "error" });
//     } finally {
//       setIsGenerating({ id: null, type: null, action: null });
//     }
//   };

//   // --- RENDER LOGIC ---
//   const formatYesNo = (value) => {
//     const isYes = value?.trim().toUpperCase() === 'Y';
//     return <Chip label={isYes ? "Yes" : "No"} color={isYes ? "success" : "error"} size="small" />;
//   };
 
//   const renderRelievingLetterTabCell = (record) => {
//     if (record.relieving_letter) {
//       return (
//         <Box display="flex" flexDirection="column" alignItems="center" gap={0.5}>
//           <Button size="small" variant="contained" onClick={() => window.open(record.relieving_letter, '_blank')} sx={{ backgroundColor: buttonColor, '&:hover': { backgroundColor: '#7a3de0' } }}>
//             Show Document
//           </Button>
//            <Typography variant="caption" sx={{ color: "green" }}>Letter Sent</Typography>
//         </Box>
//       );
//     } else {
//       const letterInfo = { ref: relievingLetterRef, endpoint: `update-exit-employee-table2/${record.employee_id}/`, formDataKey: 'relieving_letter' };
//       return (
//         <Box display="flex" flexDirection="column" gap={1}>
//           <Button size="small" variant="outlined" onClick={() => processLetter(record.employee_id, 'relieving', letterInfo.ref)} disabled={isGenerating.id === record.employee_id} sx={{ color: buttonColor, borderColor: buttonColor, '&:hover': { borderColor: '#7a3de0', color: '#7a3de0' } }}>
//             {isGenerating.id === record.employee_id && isGenerating.action === 'preview' ? <CircularProgress size={20} color="inherit" /> : "Preview"}
//           </Button>
//           <Button size="small" variant="contained" onClick={() => handleSendLetter(record.employee_id, 'relieving', letterInfo.ref, letterInfo)} disabled={isGenerating.id === record.employee_id} sx={{ backgroundColor: buttonColor, '&:hover': { backgroundColor: '#7a3de0' } }}>
//             {isGenerating.id === record.employee_id && isGenerating.action === 'send' ? <CircularProgress size={20} color="inherit" /> : "Send"}
//           </Button>
//         </Box>
//       );
//     }
//   };

//   const renderExperienceLetterTabCell = (record) => {
//     if (!record.relieving_letter) {
//       return <Typography variant="caption" color="text.secondary">-</Typography>;
//     }
//     if (record.experience_letter) {
//       return (
//         <Box display="flex" flexDirection="column" alignItems="center" gap={0.5}>
//           <Button size="small" variant="contained" onClick={() => window.open(record.experience_letter, '_blank')} sx={{ backgroundColor: buttonColor, '&:hover': { backgroundColor: '#7a3de0' } }}>
//             Show Document
//           </Button>
//           <Typography variant="caption" sx={{ color: "green" }}>Letter Sent</Typography>
//         </Box>
//       );
//     } else {
//       const letterInfo = { ref: experienceLetterRef, endpoint: `update-exit-employee-table3/${record.employee_id}/`, formDataKey: 'experience_letter' };
//       return (
//         <Box display="flex" flexDirection="column" gap={1}>
//           <Button size="small" variant="outlined" onClick={() => processLetter(record.employee_id, 'experience', letterInfo.ref)} disabled={isGenerating.id === record.employee_id} sx={{ color: buttonColor, borderColor: buttonColor, '&:hover': { borderColor: '#7a3de0', color: '#7a3de0' } }}>
//             {isGenerating.id === record.employee_id && isGenerating.action === 'preview' ? <CircularProgress size={20} color="inherit" /> : "Preview"}
//           </Button>
//           <Button size="small" variant="contained" onClick={() => handleSendLetter(record.employee_id, 'experience', letterInfo.ref, letterInfo)} disabled={isGenerating.id === record.employee_id} sx={{ backgroundColor: buttonColor, '&:hover': { backgroundColor: '#7a3de0' } }}>
//             {isGenerating.id === record.employee_id && isGenerating.action === 'send' ? <CircularProgress size={20} color="inherit" /> : "Send"}
//           </Button>
//         </Box>
//       );
//     }
//   };


//   const getVisibleColumns = () => {
//     const baseCols = ['Sr No.', 'Employee ID', 'Employee Name', '', 'Exit Type', 'Return Asset', 'Exit Interview', 'Clearance Form', 'Full & Final'];
//     switch (activeTab) {
//         case 0: return baseCols;
//         case 1: return [...baseCols, 'Relieving Letter'];
//         case 2: return [...baseCols, 'Relieving Letter', 'Experience Letter'];
//         case 3: return [...baseCols, 'Relieving Letter', 'Experience Letter'];
//         default: return baseCols;
//     }
//   };
//   const visibleColumns = getVisibleColumns();

//   const renderCellContent = (record, column, index) => {
//     if (activeTab === 1 && column === 'Relieving Letter') {
//         return renderRelievingLetterTabCell(record);
//     }
//     if (activeTab === 2 && column === 'Experience Letter') {
//         return renderExperienceLetterTabCell(record);
//     }
   
//     switch (column) {
//       case 'Sr No.': return page * rowsPerPage + index + 1;
//       case 'Employee ID': return record.employee_id;
//       case 'Employee Name': return record.employee_name;
//       case '':
//         return (hoveredRowId === record.employee_id && activeTab !== 3 && ( // Disable arrow on final tab
//             <IconButton onClick={() => handleNavigateToProcess(record.employee_id)} size="small" sx={{ color: '#E55D87' }}><ArrowForwardIcon fontSize="small" /></IconButton>
//         ));
//       case 'Exit Type': return record.exit_type || "N/A";
//       case 'Return Asset': return formatYesNo(record.return_asset);
//       case 'Exit Interview': return formatYesNo(record.exit_interview_questionnaire);
//       case 'Clearance Form': return formatYesNo(record.employee_clearance_form);
//       case 'Full & Final': return formatYesNo(record["f&f"]);
//       case 'Relieving Letter':
//         if (record.relieving_letter) {
//             return <Button size="small" variant="outlined" onClick={() => window.open(record.relieving_letter, '_blank')}>View</Button>;
//         }
//         return <Typography variant="caption" color="text.secondary">Pending</Typography>;
//       case 'Experience Letter':
//          if (record.experience_letter) {
//             return <Button size="small" variant="outlined" onClick={() => window.open(record.experience_letter, '_blank')}>View</Button>;
//         }
//         return <Typography variant="caption" color="text.secondary">Pending</Typography>;
//       default: return null;
//     }
//   };

//   return (
//     <Box>
//        {/* Hidden PDF Templates */}
//       <Box sx={{ position: 'absolute', left: '-9999px', width: '210mm' }}>
//          {letterData && (
//           <>
//             {/* Relieving Letter Template */}
//             <div ref={relievingLetterRef}>
//               {/* ... template content ... */}
//             </div>
//             {/* Experience Letter Template */}
//             <div ref={experienceLetterRef}>
//               {/* ... template content ... */}
//             </div>
//           </>
//          )}
//       </Box>

//       <Typography variant="h4" gutterBottom>Exit Dashboard</Typography>
//       <Paper sx={{ p: 3 }}>
//         <Grid container spacing={2} sx={{ mb: 2 }} alignItems="center">
//           <Grid item xs={12} sm={6} md={2}><FormControl size="small" sx={{ width: 120 }}><InputLabel>Rows</InputLabel><Select value={rowsPerPage} label="Rows" onChange={(e) => { setRowsPerPage(parseInt(e.target.value, 10)); setPage(0);}}><MenuItem value={5}>5</MenuItem><MenuItem value={10}>10</MenuItem><MenuItem value={25}>25</MenuItem></Select></FormControl></Grid>
//           <Grid item xs={12} sm={6} md={3} sx={{ ml: "auto" }}><TextField fullWidth size="small" label="Search" variant="outlined" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} /></Grid>
//         </Grid>

//         <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
//           <Tabs value={activeTab} onChange={handleTabChange} aria-label="exit process tabs">
//             <Tab label="In Exit Process" />
//             <Tab label="Relieving Letter" />
//             <Tab label="Experience Letter" />
//             <Tab label="Exited Employee" />
//           </Tabs>
//         </Box>
       
//         <TabPanel value={activeTab} index={activeTab}>
//           <TableContainer>
//             {isLoading ? (
//               <Box sx={{ display: 'flex', justifyContent: 'center', my: 5 }}><CircularProgress /><Typography sx={{ ml: 2 }}>Loading Records...</Typography></Box>
//             ) : (
//               <Table>
//                 <TableHead sx={{ backgroundColor: '#f5f5ff' }}>
//                   <TableRow sx={{ '& th': { fontWeight: 'bold' } }}>
//                     {visibleColumns.map(colName => <TableCell key={colName}>{colName}</TableCell>)}
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {filteredData.length > 0 ? (
//                     filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((record, index) => (
//                       <TableRow key={record.employee_id + index} onMouseEnter={() => setHoveredRowId(record.employee_id)} onMouseLeave={() => setHoveredRowId(null)} sx={{ '&:hover': { backgroundColor: '#fafafa' } }}>
//                         {visibleColumns.map(colName => (
//                           <TableCell key={`${record.employee_id}-${colName}`}>{renderCellContent(record, colName, index)}</TableCell>
//                         ))}
//                       </TableRow>
//                     ))
//                   ) : (
//                     <TableRow><TableCell colSpan={visibleColumns.length} align="center">No matching records found.</TableCell></TableRow>
//                   )}
//                 </TableBody>
//               </Table>
//             )}
//           </TableContainer>
         
//           <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', p: 2 }}>
//              <Button variant="contained" onClick={() => setPage(p => Math.max(0, p - 1))} disabled={page === 0}>Previous</Button>
//              <Typography sx={{ mx: 2 }}>Page {page + 1}</Typography>
//              <Button variant="contained" onClick={() => setPage(p => p + 1)} disabled={(page + 1) * rowsPerPage >= filteredData.length}>Next</Button>
//           </Box>
//         </TabPanel>
//       </Paper>
     
//       <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
//         <Alert severity={snackbar.severity} sx={{ width: "100%" }}>{snackbar.message}</Alert>
//       </Snackbar>
//     </Box>
//   );
// };

// export default ExitDashboardHr;









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
//   Tabs,
//   Tab,
//   useTheme,
//   useMediaQuery,
//   InputAdornment,
//   Skeleton,
//   Pagination,
// } from "@mui/material";
// import {
//   ArrowForward as ArrowForwardIcon,
//   Search as SearchIcon,
// } from "@mui/icons-material";
// import axiosInstance from "../utils/axiosInstance";

// // --- PDF Generation Imports ---
// import jsPDF from "jspdf";
// import html2canvas from "html2canvas";
// import letterheadImage from "../Assests/letterhead.png";

// // Helper component for Tab Panels
// function TabPanel(props) {
//   const { children, value, index, ...other } = props;
//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`simple-tabpanel-${index}`}
//       aria-labelledby={`simple-tab-${index}`}
//       {...other}
//     >
//       {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
//     </div>
//   );
// }

// const ExitDashboardHr = () => {
//   const muiTheme = useTheme();
//   const isMobile = useMediaQuery(muiTheme.breakpoints.down("sm"));

//   // --- THEME & STYLING ---
//   const themePurple = '#8C257C';
//   const themePurpleHover = '#6d1d60';
//   const themeOrange = '#F58E35';

//   const purpleButtonSx = {
//     backgroundColor: themePurple,
//     color: 'white',
//     '&:hover': {
//       backgroundColor: themePurpleHover,
//     },
//   };

//   // --- STATE MANAGEMENT ---
//   const [exitRecords, setExitRecords] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isGenerating, setIsGenerating] = useState({ id: null, type: null, action: null });
//   const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
//   const [hoveredRowId, setHoveredRowId] = useState(null);
//   const [activeTab, setActiveTab] = useState(0);

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

//   // --- IMAGE PROCESSING (Unchanged) ---
//   const makeImageTransparent = (imageUrl) => {
//     return new Promise((resolve, reject) => {
//         if (!imageUrl) {
//             resolve(null);
//             return;
//         }
//         const img = new Image();
//         img.crossOrigin = "Anonymous";
//         img.src = imageUrl;
//         img.onload = () => {
//             const canvas = document.createElement('canvas');
//             const ctx = canvas.getContext("2d");
//             canvas.width = img.width;
//             canvas.height = img.height;
//             ctx.drawImage(img, 0, 0);
//             const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
//             const data = imageData.data;
//             for (let i = 0; i < data.length; i += 4) {
//                 if (data[i] > 220 && data[i + 1] > 220 && data[i + 2] > 220) {
//                     data[i + 3] = 0;
//                 }
//             }
//             ctx.putImageData(imageData, 0, 0);
//             resolve(canvas.toDataURL("image/png"));
//         };
//         img.onerror = (err) => {
//             console.error("Failed to load image for transparency processing:", imageUrl);
//             reject(err);
//         };
//     });
//   };


//   // --- UPDATED: API INTERACTIONS FOR ALL TABS ---
//   const fetchDataForTab = useCallback(async (tabIndex) => {
//     setIsLoading(true);
//     let endpoint = "exit-employee-table1/"; // Default for Tab 0
//     if (tabIndex === 1) {
//       endpoint = "exit-employee-table2/"; // API for Relieving Letter Tab
//     } else if (tabIndex === 2) {
//       endpoint = "exit-employee-table3/"; // API for Experience Letter Tab
//     } else if (tabIndex === 3) {
//       endpoint = "exit-employee-finaltable/"; // API for Exited Employee Tab
//     }

//     try {
//       const response = await axiosInstance.get(endpoint);
//       setExitRecords(response.data || []);
//     } catch (error) {
//       console.error(`Error fetching records for tab ${tabIndex}:`, error);
//       setSnackbar({ open: true, message: "Failed to load records.", severity: "error" });
//       setExitRecords([]);
//     } finally {
//       setIsLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchDataForTab(activeTab);
//   }, [activeTab, fetchDataForTab]);

//   useEffect(() => {
//     const lowercasedQuery = searchQuery.toLowerCase();
//     const filtered = exitRecords.filter(record =>
//       record.employee_id?.toLowerCase().includes(lowercasedQuery) ||
//       record.employee_name?.toLowerCase().includes(lowercasedQuery) ||
//       record.exit_type?.toLowerCase().includes(lowercasedQuery)
//     );
//     setFilteredData(filtered);
//     setPage(0);
//   }, [searchQuery, exitRecords]);

//   // --- UI EVENT HANDLERS ---
//   const handleNavigateToProcess = (employeeId) => {
//     navigate(`/hrms/dashboardhr/exitProcessHr/${employeeId}`);
//   };

//   const handleTabChange = (event, newValue) => {
//     setActiveTab(newValue);
//   };
 
//   const handlePaginationChange = (event, newPage) => {
//     setPage(newPage - 1);
//   };

//   const handleRowsPerPageChange = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   // --- PDF LOGIC (Unchanged) ---
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
//     } catch (error)
//     {
//         console.error("Error fetching letter data:", error);
//         setSnackbar({ open: true, message: "Failed to fetch data for the letter.", severity: "error" });
//         return null;
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
//       await axiosInstance.patch(endpoint, formData, { headers: { "Content-Type": "multipart/form-data" } });
     
//       fetchDataForTab(activeTab);

//       setSnackbar({ open: true, message: `${letterType.charAt(0).toUpperCase() + letterType.slice(1)} Letter sent successfully!`, severity: "success" });
//       setLetterData(null);
//     } catch (error) {
//       console.error(`Error sending ${letterType} letter:`, error);
//       setSnackbar({ open: true, message: `Failed to send ${letterType} Letter.`, severity: "error" });
//     } finally {
//       setIsGenerating({ id: null, type: null, action: null });
//     }
//   };

//   // --- RENDER LOGIC ---
//   const formatYesNo = (value) => {
//     const isYes = value?.trim().toUpperCase() === 'Y';
//     return <Chip label={isYes ? "Yes" : "No"} size="small" sx={{ 
//       bgcolor: isYes ? '#4caf50' : themeOrange, 
//       color: 'white',
//       borderRadius: '16px',
//       height: '24px',
//     }} />;
//   };
 
//   const renderRelievingLetterTabCell = (record) => {
//     if (record.relieving_letter) {
//       return (
//         <Box display="flex" flexDirection="column" alignItems="center" gap={0.5}>
//           <Button size="small" variant="contained" onClick={() => window.open(record.relieving_letter, '_blank')} sx={purpleButtonSx}>
//             Show Document
//           </Button>
//            <Typography variant="caption" sx={{ color: "green" }}>Letter Sent</Typography>
//         </Box>
//       );
//     } else {
//       const letterInfo = { ref: relievingLetterRef, endpoint: `update-exit-employee-table2/${record.employee_id}/`, formDataKey: 'relieving_letter' };
//       return (
//         <Box display="flex" flexDirection="column" gap={1}>
//           <Button size="small" variant="outlined" onClick={() => processLetter(record.employee_id, 'relieving', letterInfo.ref)} disabled={isGenerating.id === record.employee_id} sx={{ color: themePurple, borderColor: themePurple, '&:hover': { borderColor: themePurple, backgroundColor: 'rgba(140, 37, 124, 0.04)' } }}>
//             {isGenerating.id === record.employee_id && isGenerating.action === 'preview' ? <CircularProgress size={20} color="inherit" /> : "Preview"}
//           </Button>
//           <Button size="small" variant="contained" onClick={() => handleSendLetter(record.employee_id, 'relieving', letterInfo.ref, letterInfo)} disabled={isGenerating.id === record.employee_id} sx={purpleButtonSx}>
//             {isGenerating.id === record.employee_id && isGenerating.action === 'send' ? <CircularProgress size={20} color="inherit" /> : "Send"}
//           </Button>
//         </Box>
//       );
//     }
//   };

//   const renderExperienceLetterTabCell = (record) => {
//     if (!record.relieving_letter) {
//       return <Typography variant="caption" color="text.secondary">-</Typography>;
//     }
//     if (record.experience_letter) {
//       return (
//         <Box display="flex" flexDirection="column" alignItems="center" gap={0.5}>
//           <Button size="small" variant="contained" onClick={() => window.open(record.experience_letter, '_blank')} sx={purpleButtonSx}>
//             Show Document
//           </Button>
//           <Typography variant="caption" sx={{ color: "green" }}>Letter Sent</Typography>
//         </Box>
//       );
//     } else {
//       const letterInfo = { ref: experienceLetterRef, endpoint: `update-exit-employee-table3/${record.employee_id}/`, formDataKey: 'experience_letter' };
//       return (
//         <Box display="flex" flexDirection="column" gap={1}>
//           <Button size="small" variant="outlined" onClick={() => processLetter(record.employee_id, 'experience', letterInfo.ref)} disabled={isGenerating.id === record.employee_id} sx={{ color: themePurple, borderColor: themePurple, '&:hover': { borderColor: themePurple, backgroundColor: 'rgba(140, 37, 124, 0.04)' } }}>
//             {isGenerating.id === record.employee_id && isGenerating.action === 'preview' ? <CircularProgress size={20} color="inherit" /> : "Preview"}
//           </Button>
//           <Button size="small" variant="contained" onClick={() => handleSendLetter(record.employee_id, 'experience', letterInfo.ref, letterInfo)} disabled={isGenerating.id === record.employee_id} sx={purpleButtonSx}>
//             {isGenerating.id === record.employee_id && isGenerating.action === 'send' ? <CircularProgress size={20} color="inherit" /> : "Send"}
//           </Button>
//         </Box>
//       );
//     }
//   };

//   const getVisibleColumns = () => {
//     const baseCols = ['Sr No.', 'Employee ID', 'Employee Name', '', 'Exit Type', 'Return Asset', 'Exit Interview', 'Clearance Form', 'Full & Final'];
//     switch (activeTab) {
//         case 0: return baseCols;
//         case 1: return [...baseCols, 'Relieving Letter'];
//         case 2: return [...baseCols, 'Relieving Letter', 'Experience Letter'];
//         case 3: return [...baseCols, 'Relieving Letter', 'Experience Letter'];
//         default: return baseCols;
//     }
//   };
//   const visibleColumns = getVisibleColumns();

//   const renderCellContent = (record, column, index) => {
//     if (activeTab === 1 && column === 'Relieving Letter') {
//         return renderRelievingLetterTabCell(record);
//     }
//     if (activeTab === 2 && column === 'Experience Letter') {
//         return renderExperienceLetterTabCell(record);
//     }
   
//     switch (column) {
//       case 'Sr No.': return page * rowsPerPage + index + 1;
//       case 'Employee ID': return record.employee_id;
//       case 'Employee Name': return record.employee_name;
//       case '':
//         return (hoveredRowId === record.employee_id && activeTab !== 3 && ( // Disable arrow on final tab
//             <IconButton onClick={() => handleNavigateToProcess(record.employee_id)} size="small" sx={{ color: themeOrange }}><ArrowForwardIcon fontSize="small" /></IconButton>
//         ));
//       case 'Exit Type': return record.exit_type || "N/A";
//       case 'Return Asset': return formatYesNo(record.return_asset);
//       case 'Exit Interview': return formatYesNo(record.exit_interview_questionnaire);
//       case 'Clearance Form': return formatYesNo(record.employee_clearance_form);
//       case 'Full & Final': return formatYesNo(record["f&f"]);
//       case 'Relieving Letter':
//         if (record.relieving_letter) {
//             return <Button size="small" sx={{ color: themePurple }} onClick={() => window.open(record.relieving_letter, '_blank')}>View</Button>;
//         }
//         return <Typography variant="caption" color="text.secondary">Pending</Typography>;
//       case 'Experience Letter':
//          if (record.experience_letter) {
//             return <Button size="small" sx={{ color: themePurple }} onClick={() => window.open(record.experience_letter, '_blank')}>View</Button>;
//         }
//         return <Typography variant="caption" color="text.secondary">Pending</Typography>;
//       default: return null;
//     }
//   };

//   return (
//     <Box component={Paper} p={3}>
//        {/* Hidden PDF Templates */}
//       <Box sx={{ position: 'absolute', left: '-9999px', width: '210mm' }}>
//          {letterData && (
//           <>
//             <div ref={relievingLetterRef}>{/* ... template content ... */}</div>
//             <div ref={experienceLetterRef}>{/* ... template content ... */}</div>
//           </>
//          )}
//       </Box>
//       <Typography variant="h4" sx={{ color: themePurple, fontWeight: "bold", mb: 5 }}>Exit Dashboard</Typography>

//       <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: isMobile ? "column" : "row", gap: 2, mb: 2 }}>
//         <Box />
//         <TextField
//           size="small"
//           placeholder="Search by ID, Name, Type..."
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           sx={{ width: isMobile ? "100%" : "auto" }}
//           InputProps={{
//             startAdornment: (
//               <InputAdornment position="start">
//                 <SearchIcon />
//               </InputAdornment>
//             ),
//           }}
//         />
//       </Box>

//       <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
//         <Tabs value={activeTab} onChange={handleTabChange} aria-label="exit process tabs"
//           sx={{
//             '& .MuiTabs-indicator': { backgroundColor: themePurple },
//             '& .MuiTab-root': {
//               textTransform: 'none',
//               fontWeight: '600',
//               '&.Mui-selected': { color: themePurple },
//             },
//           }}
//         >
//           <Tab label="In Exit Process" />
//           <Tab label="Relieving Letter" />
//           <Tab label="Experience Letter" />
//           <Tab label="Exited Employee" />
//         </Tabs>
//       </Box>
       
//       <TabPanel value={activeTab} index={activeTab}>
//         <TableContainer>
//           <Table sx={{ minWidth: "100%", whiteSpace: "nowrap" }}>
//             <TableHead>
//               <TableRow sx={{ bgcolor: themePurple }}>
//                 {visibleColumns.map(colName => <TableCell key={colName} sx={{ fontWeight: 'bold', color: 'white' }}>{colName}</TableCell>)}
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {isLoading ? (
//                   Array.from(new Array(rowsPerPage)).map((_, index) => (
//                     <TableRow key={index}>
//                       {visibleColumns.map((col, i) => (
//                         <TableCell key={i}><Skeleton variant="text" /></TableCell>
//                       ))}
//                     </TableRow>
//                   ))
//               ) : filteredData.length > 0 ? (
//                 (rowsPerPage > 0 ? filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : filteredData)
//                 .map((record, index) => (
//                   <TableRow key={record.employee_id + index} onMouseEnter={() => setHoveredRowId(record.employee_id)} onMouseLeave={() => setHoveredRowId(null)} sx={{ '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' } }}>
//                     {visibleColumns.map(colName => (
//                       <TableCell key={`${record.employee_id}-${colName}`}>{renderCellContent(record, colName, index)}</TableCell>
//                     ))}
//                   </TableRow>
//                 ))
//               ) : (
//                 <TableRow><TableCell colSpan={visibleColumns.length} align="center" sx={{ py: 5 }}>No matching records found.</TableCell></TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>
         
//         <Box sx={{ p: 2, borderTop: '1px solid rgba(224, 224, 224, 1)' }}>
//           <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
//             <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//               <FormControl variant="outlined" size="small">
//                 <Select value={rowsPerPage} onChange={handleRowsPerPageChange} sx={{ backgroundColor: themePurple, color: 'white', borderRadius: '4px', '&:hover': { backgroundColor: themePurpleHover }, '& .MuiOutlinedInput-notchedOutline': { border: 'none' }, '& .MuiSvgIcon-root': { color: 'white' } }}>
//                   {[10, 25, 50].map((value) => (<MenuItem key={value} value={value}>{value}</MenuItem>))}
//                 </Select>
//               </FormControl>
//               <Typography variant="body2" color="text.secondary">
//                 {`Showing ${filteredData.length > 0 ? page * rowsPerPage + 1 : 0} to ${Math.min((page + 1) * rowsPerPage, filteredData.length)} of ${filteredData.length} entries`}
//               </Typography>
//             </Box>

//             <Pagination
//               count={Math.ceil(filteredData.length / rowsPerPage)} page={page + 1} onChange={handlePaginationChange} showFirstButton showLastButton
//               sx={{ '& .MuiPaginationItem-root': { borderRadius: '4px', '&:hover': { backgroundColor: themeOrange, color: 'white' }}, '& .MuiPaginationItem-page': { color: themePurple, '&.Mui-selected': { backgroundColor: themePurple, color: 'white', '&:hover': { backgroundColor: themeOrange }}}, '& .MuiPaginationItem-icon': { color: themePurple }}}
//             />
//           </Box>
//         </Box>
//       </TabPanel>
     
//       <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
//         <Alert severity={snackbar.severity} sx={{ width: "100%" }}>{snackbar.message}</Alert>
//       </Snackbar>
//     </Box>
//   );
// };

// export default ExitDashboardHr;














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
//   Tabs,
//   Tab,
// } from "@mui/material";
// import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
// import axiosInstance from "../utils/axiosInstance";

// // --- PDF Generation Imports ---
// import jsPDF from "jspdf";
// import html2canvas from "html2canvas";
// import letterheadImage from "../Assests/letterhead.png";

// // Helper component for Tab Panels
// function TabPanel(props) {
//   const { children, value, index, ...other } = props;
//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`simple-tabpanel-${index}`}
//       aria-labelledby={`simple-tab-${index}`}
//       {...other}
//     >
//       {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
//     </div>
//   );
// }

// const ExitDashboardHr = () => {
//   // --- STATE MANAGEMENT ---
//   const [exitRecords, setExitRecords] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isGenerating, setIsGenerating] = useState({ id: null, type: null });
//   const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
//   const [hoveredRowId, setHoveredRowId] = useState(null);
//   const [activeTab, setActiveTab] = useState(0);

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
//   const buttonColor = "#8A4FFF";

//   // --- IMAGE PROCESSING ---
//   const makeImageTransparent = (imageUrl) => {
//     return new Promise((resolve, reject) => {
//         if (!imageUrl) {
//             resolve(null);
//             return;
//         }
//         const img = new Image();
//         img.crossOrigin = "Anonymous";
//         img.src = imageUrl;
//         img.onload = () => {
//             const canvas = document.createElement('canvas');
//             const ctx = canvas.getContext("2d");
//             canvas.width = img.width;
//             canvas.height = img.height;
//             ctx.drawImage(img, 0, 0);
//             const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
//             const data = imageData.data;
//             for (let i = 0; i < data.length; i += 4) {
//                 if (data[i] > 220 && data[i + 1] > 220 && data[i + 2] > 220) {
//                     data[i + 3] = 0;
//                 }
//             }
//             ctx.putImageData(imageData, 0, 0);
//             resolve(canvas.toDataURL("image/png"));
//         };
//         img.onerror = (err) => {
//             console.error("Failed to load image for transparency processing:", imageUrl);
//             reject(err);
//         };
//     });
//   };


//   // --- API INTERACTIONS ---
//   const fetchDataForTab = useCallback(async (tabIndex) => {
//     setIsLoading(true);
//     let endpoint = "exit-employee-table1/"; // Default for Tab 0
//     if (tabIndex === 1) {
//       endpoint = "exit-employee-table2/"; // API for Relieving Letter Tab
//     } else if (tabIndex === 2) {
//       endpoint = "exit-employee-table3/"; // API for Experience Letter Tab
//     } else if (tabIndex === 3) {
//       endpoint = "exit-employee-finaltable/"; // API for Exited Employee Tab
//     }

//     try {
//       const response = await axiosInstance.get(endpoint);
//       setExitRecords(response.data || []);
//     } catch (error) {
//       console.error(`Error fetching records for tab ${tabIndex}:`, error);
//       setSnackbar({ open: true, message: "Failed to load records.", severity: "error" });
//       setExitRecords([]);
//     } finally {
//       setIsLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchDataForTab(activeTab);
//   }, [activeTab, fetchDataForTab]);

//   useEffect(() => {
//     const lowercasedQuery = searchQuery.toLowerCase();
//     const filtered = exitRecords.filter(record =>
//       record.employee_id?.toLowerCase().includes(lowercasedQuery) ||
//       record.employee_name?.toLowerCase().includes(lowercasedQuery) ||
//       record.exit_type?.toLowerCase().includes(lowercasedQuery)
//     );
//     setFilteredData(filtered);
//     setPage(0);
//   }, [searchQuery, exitRecords]);

//   // --- UI EVENT HANDLERS ---
//   const handleNavigateToProcess = (employeeId) => {
//     navigate(`/hrms/dashboardhr/exitProcessHr/${employeeId}`);
//   };

//   const handleTabChange = (event, newValue) => {
//     setActiveTab(newValue);
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

//   const handleSendLetter = async (employeeId, letterType, letterRef, { endpoint, formDataKey }) => {
//     setIsGenerating({ id: employeeId, type: letterType });
//     try {
//       const data = await fetchLetterData(employeeId);
//       if (!data) throw new Error("Failed to get data for PDF generation.");
     
//       await new Promise(resolve => setTimeout(resolve, 100)); // Ensure state updates and template renders
     
//       const pdf = await createPdfDocument(letterRef);
//       const pdfBlob = pdf.output('blob');
//       const pdfFile = new File([pdfBlob], `${employeeId}_${letterType}_letter.pdf`, { type: 'application/pdf' });
     
//       const formData = new FormData();
//       formData.append(formDataKey, pdfFile);
     
//       await axiosInstance.patch(endpoint, formData, { headers: { "Content-Type": "multipart/form-data" } });
     
//       // Refetch data for the current tab to show the update
//       fetchDataForTab(activeTab);

//       setSnackbar({ open: true, message: `${letterType.charAt(0).toUpperCase() + letterType.slice(1)} Letter sent successfully!`, severity: "success" });
//       setLetterData(null);
//     } catch (error) {
//       console.error(`Error sending ${letterType} letter:`, error);
//       setSnackbar({ open: true, message: `Failed to send ${letterType} Letter.`, severity: "error" });
//     } finally {
//       setIsGenerating({ id: null, type: null });
//     }
//   };

//   // --- RENDER LOGIC ---
//   const formatYesNo = (value) => {
//     const isYes = value?.trim().toUpperCase() === 'Y';
//     return <Chip label={isYes ? "Yes" : "No"} color={isYes ? "success" : "error"} size="small" />;
//   };
 
//   const renderRelievingLetterTabCell = (record) => {
//     if (record.relieving_letter) {
//       return (
//         <Box display="flex" flexDirection="column" alignItems="center" gap={0.5}>
//           <Button size="small" variant="contained" onClick={() => window.open(record.relieving_letter, '_blank')} sx={{ backgroundColor: buttonColor, '&:hover': { backgroundColor: '#7a3de0' } }}>
//             Show Document
//           </Button>
//            <Typography variant="caption" sx={{ color: "green" }}>Letter Sent</Typography>
//         </Box>
//       );
//     } else {
//       const letterInfo = {
//           ref: relievingLetterRef,
//           endpoint: `update-exit-employee-table2/${record.employee_id}/`,
//           formDataKey: 'relieving_letter'
//       };
//       return (
//         <Box display="flex" flexDirection="column" gap={1}>
//           <Button
//             size="small"
//             variant="contained"
//             onClick={() => handleSendLetter(record.employee_id, 'relieving', letterInfo.ref, letterInfo)}
//             disabled={isGenerating.id === record.employee_id}
//             sx={{ backgroundColor: buttonColor, '&:hover': { backgroundColor: '#7a3de0' } }}
//           >
//             {isGenerating.id === record.employee_id ? <CircularProgress size={20} color="inherit" /> : "Send"}
//           </Button>
//         </Box>
//       );
//     }
//   };

//   const renderExperienceLetterTabCell = (record) => {
//     if (!record.relieving_letter) {
//       return <Typography variant="caption" color="text.secondary">-</Typography>;
//     }
//     if (record.experience_letter) {
//       return (
//         <Box display="flex" flexDirection="column" alignItems="center" gap={0.5}>
//           <Button size="small" variant="contained" onClick={() => window.open(record.experience_letter, '_blank')} sx={{ backgroundColor: buttonColor, '&:hover': { backgroundColor: '#7a3de0' } }}>
//             Show Document
//           </Button>
//           <Typography variant="caption" sx={{ color: "green" }}>Letter Sent</Typography>
//         </Box>
//       );
//     } else {
//       const letterInfo = {
//           ref: experienceLetterRef,
//           endpoint: `update-exit-employee-table3/${record.employee_id}/`,
//           formDataKey: 'experience_letter'
//       };
//       return (
//         <Box display="flex" flexDirection="column" gap={1}>
//           <Button
//             size="small"
//             variant="contained"
//             onClick={() => handleSendLetter(record.employee_id, 'experience', letterInfo.ref, letterInfo)}
//             disabled={isGenerating.id === record.employee_id}
//             sx={{ backgroundColor: buttonColor, '&:hover': { backgroundColor: '#7a3de0' } }}
//           >
//             {isGenerating.id === record.employee_id ? <CircularProgress size={20} color="inherit" /> : "Send"}
//           </Button>
//         </Box>
//       );
//     }
//   };


//   const getVisibleColumns = () => {
//     const baseCols = ['Sr No.', 'Employee ID', 'Employee Name', '', 'Exit Type', 'Return Asset', 'Exit Interview', 'Clearance Form', 'Full & Final'];
//     switch (activeTab) {
//         case 0: return baseCols;
//         case 1: return [...baseCols, 'Relieving Letter'];
//         case 2: return [...baseCols, 'Relieving Letter', 'Experience Letter'];
//         case 3: return [...baseCols, 'Relieving Letter', 'Experience Letter'];
//         default: return baseCols;
//     }
//   };
//   const visibleColumns = getVisibleColumns();

//   const renderCellContent = (record, column, index) => {
//     if (activeTab === 1 && column === 'Relieving Letter') {
//         return renderRelievingLetterTabCell(record);
//     }
//     if (activeTab === 2 && column === 'Experience Letter') {
//         return renderExperienceLetterTabCell(record);
//     }
   
//     switch (column) {
//       case 'Sr No.': return page * rowsPerPage + index + 1;
//       case 'Employee ID': return record.employee_id;
//       case 'Employee Name': return record.employee_name;
//       case '':
//         return (hoveredRowId === record.employee_id && activeTab !== 3 && ( // Disable arrow on final tab
//             <IconButton onClick={() => handleNavigateToProcess(record.employee_id)} size="small" sx={{ color: '#E55D87' }}><ArrowForwardIcon fontSize="small" /></IconButton>
//         ));
//       case 'Exit Type': return record.exit_type || "N/A";
//       case 'Return Asset': return formatYesNo(record.return_asset);
//       case 'Exit Interview': return formatYesNo(record.exit_interview_questionnaire);
//       case 'Clearance Form': return formatYesNo(record.employee_clearance_form);
//       case 'Full & Final': return formatYesNo(record["f&f"]);
//       case 'Relieving Letter':
//         if (record.relieving_letter) {
//             return <Button size="small" variant="outlined" onClick={() => window.open(record.relieving_letter, '_blank')}>View</Button>;
//         }
//         return <Typography variant="caption" color="text.secondary">Pending</Typography>;
//       case 'Experience Letter':
//          if (record.experience_letter) {
//             return <Button size="small" variant="outlined" onClick={() => window.open(record.experience_letter, '_blank')}>View</Button>;
//         }
//         return <Typography variant="caption" color="text.secondary">Pending</Typography>;
//       default: return null;
//     }
//   };

//   return (
//     <Box>
//        {/* Hidden PDF Templates */}
//       <Box sx={{ position: 'absolute', left: '-9999px', width: '210mm' }}>
//          {letterData && (
//           <>
//             {/* Relieving Letter Template */}
//             <div ref={relievingLetterRef}>
//               {/* This is where your custom relieving letter component/HTML will be rendered */}
//               {/* The content here will be captured to generate the PDF */}
//             </div>
//             {/* Experience Letter Template */}
//             <div ref={experienceLetterRef}>
//               {/* This is where your custom experience letter component/HTML will be rendered */}
//             </div>
//           </>
//          )}
//       </Box>

//       <Typography variant="h4" gutterBottom>Exit Dashboard</Typography>
//       <Paper sx={{ p: 3 }}>
//         <Grid container spacing={2} sx={{ mb: 2 }} alignItems="center">
//           <Grid item xs={12} sm={6} md={2}><FormControl size="small" sx={{ width: 120 }}><InputLabel>Rows</InputLabel><Select value={rowsPerPage} label="Rows" onChange={(e) => { setRowsPerPage(parseInt(e.target.value, 10)); setPage(0);}}><MenuItem value={5}>5</MenuItem><MenuItem value={10}>10</MenuItem><MenuItem value={25}>25</MenuItem></Select></FormControl></Grid>
//           <Grid item xs={12} sm={6} md={3} sx={{ ml: "auto" }}><TextField fullWidth size="small" label="Search" variant="outlined" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} /></Grid>
//         </Grid>

//         <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
//           <Tabs value={activeTab} onChange={handleTabChange} aria-label="exit process tabs">
//             <Tab label="In Exit Process" />
//             <Tab label="Relieving Letter" />
//             <Tab label="Experience Letter" />
//             <Tab label="Exited Employee" />
//           </Tabs>
//         </Box>
       
//         <TabPanel value={activeTab} index={activeTab}>
//           <TableContainer>
//             {isLoading ? (
//               <Box sx={{ display: 'flex', justifyContent: 'center', my: 5 }}><CircularProgress /><Typography sx={{ ml: 2 }}>Loading Records...</Typography></Box>
//             ) : (
//               <Table>
//                 <TableHead sx={{ backgroundColor: '#f5f5ff' }}>
//                   <TableRow sx={{ '& th': { fontWeight: 'bold' } }}>
//                     {visibleColumns.map(colName => <TableCell key={colName}>{colName}</TableCell>)}
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {filteredData.length > 0 ? (
//                     filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((record, index) => (
//                       <TableRow key={record.employee_id + index} onMouseEnter={() => setHoveredRowId(record.employee_id)} onMouseLeave={() => setHoveredRowId(null)} sx={{ '&:hover': { backgroundColor: '#fafafa' } }}>
//                         {visibleColumns.map(colName => (
//                           <TableCell key={`${record.employee_id}-${colName}`}>{renderCellContent(record, colName, index)}</TableCell>
//                         ))}
//                       </TableRow>
//                     ))
//                   ) : (
//                     <TableRow><TableCell colSpan={visibleColumns.length} align="center">No matching records found.</TableCell></TableRow>
//                   )}
//                 </TableBody>
//               </Table>
//             )}
//           </TableContainer>
         
//           <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', p: 2 }}>
//              <Button variant="contained" onClick={() => setPage(p => Math.max(0, p - 1))} disabled={page === 0}>Previous</Button>
//              <Typography sx={{ mx: 2 }}>Page {page + 1}</Typography>
//              <Button variant="contained" onClick={() => setPage(p => p + 1)} disabled={(page + 1) * rowsPerPage >= filteredData.length}>Next</Button>
//           </Box>
//         </TabPanel>
//       </Paper>
     
//       <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
//         <Alert severity={snackbar.severity} sx={{ width: "100%" }}>{snackbar.message}</Alert>
//       </Snackbar>
//     </Box>
//   );
// };

// export default ExitDashboardHr;





import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  Paper,
  Typography,
  Grid,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  CircularProgress,
  Tabs,
  Tab,
  useTheme,
  useMediaQuery,
  InputAdornment,
  TablePagination,
  Skeleton,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Add from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import axiosInstance from "../utils/axiosInstance";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import letterheadImage from "../Assests/letterhead.png";
import Swal from "sweetalert2";

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

const ExitDashboardHr = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const location = useLocation();

  const [exitRecords, setExitRecords] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isGenerating, setIsGenerating] = useState({ id: null, type: null });
  const [hoveredRowId, setHoveredRowId] = useState(null);
  const [activeTab, setActiveTab] = useState(location.state?.tabId || 0);

  const relievingLetterRef = useRef(null);
  const experienceLetterRef = useRef(null);
  const [letterData, setLetterData] = useState(null);
  const [transparentStamp, setTransparentStamp] = useState(null);
  const [transparentSign, setTransparentSign] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const primaryColor = "#8C257C";
  const primaryDarkColor = "#6d1d60";
  const textColorOnPrimary = "#FFFFFF";

  useEffect(() => {
    if (location.state?.tabId !== undefined) {
      setActiveTab(location.state.tabId);
    }
  }, [location.state]);

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
        const canvas = document.createElement("canvas");
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

  const fetchDataForTab = useCallback(async (tabIndex) => {
    setIsLoading(true);
    let endpoint = "exit-employee-table1/";
    if (tabIndex === 1) endpoint = "exit-employee-table2/";
    else if (tabIndex === 2) endpoint = "exit-employee-table3/";
    else if (tabIndex === 3) endpoint = "exit-employee-finaltable/";

    try {
      const response = await axiosInstance.get(endpoint);
      setExitRecords(response.data || []);
    } catch (error) {
      console.error(`Error fetching records for tab ${tabIndex}:`, error);
      Swal.fire({ icon: "error", title: "Error", text: "Failed to load records.", timer: 3000, showConfirmButton: false });
      setExitRecords([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDataForTab(activeTab);
  }, [activeTab, fetchDataForTab]);

  useEffect(() => {
    const lowercasedQuery = searchQuery.toLowerCase();
    const filtered = exitRecords.filter(
      (record) =>
        record.employee_id?.toLowerCase().includes(lowercasedQuery) ||
        record.employee_name?.toLowerCase().includes(lowercasedQuery) ||
        record.exit_type?.toLowerCase().includes(lowercasedQuery)
    );
    setFilteredData(filtered);
    setPage(0);
  }, [searchQuery, exitRecords]);

  const handleNavigateToProcess = (employeeId) => {
    navigate(`/hrms/dashboardhr/exitProcessHr/${employeeId}`);
  };

  const handleTabChange = (event, newPage) => {
    setActiveTab(newPage);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const fetchLetterData = async (employeeId) => {
    try {
      const response = await axiosInstance.get(`data-for-letters/${employeeId}/`);
      const data = response.data;
      setLetterData(data);
      const [stampDataUrl, signDataUrl] = await Promise.all([
        makeImageTransparent(data.company_stamp?.company_stamp),
        makeImageTransparent(data.hr_data?.sign),
      ]);
      setTransparentStamp(stampDataUrl);
      setTransparentSign(signDataUrl);
      return data;
    } catch (error) {
      console.error("Error fetching letter data:", error);
      Swal.fire({ icon: "error", title: "Error", text: "Failed to fetch data for the letter.", timer: 3000, showConfirmButton: false });
      return null;
    }
  };

  const createPdfDocument = async (elementRef) => {
    const input = elementRef.current;
    if (!input) throw new Error("PDF template element not found.");
    const canvas = await html2canvas(input, { scale: 2, useCORS: true, backgroundColor: null });
    const contentImgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    pdf.addImage(letterheadImage, "PNG", 0, 0, pdfWidth, pdfHeight);
    const contentImgWidth = pdfWidth;
    const contentImgHeight = (canvas.height * contentImgWidth) / canvas.width;
    pdf.addImage(contentImgData, "PNG", 0, 0, contentImgWidth, contentImgHeight);
    return pdf;
  };

  const handleSendLetter = async (employeeId, letterType, letterRef, { endpoint, formDataKey }) => {
    setIsGenerating({ id: employeeId, type: letterType });
    try {
      const data = await fetchLetterData(employeeId);
      if (!data) throw new Error("Failed to get data for PDF generation.");
      await new Promise((resolve) => setTimeout(resolve, 100));
      const pdf = await createPdfDocument(letterRef);
      const pdfBlob = pdf.output("blob");
      const pdfFile = new File([pdfBlob], `${employeeId}_${letterType}_letter.pdf`, { type: "application/pdf" });
      const formData = new FormData();
      formData.append(formDataKey, pdfFile);
      await axiosInstance.patch(endpoint, formData, { headers: { "Content-Type": "multipart/form-data" } });
      fetchDataForTab(activeTab);
      Swal.fire({ icon: "success", title: "Success", text: `${letterType.charAt(0).toUpperCase() + letterType.slice(1)} Letter sent successfully!`, timer: 3000, showConfirmButton: false });
      setLetterData(null);
    } catch (error) {
      console.error(`Error sending ${letterType} letter:`, error);
      Swal.fire({ icon: "error", title: "Error", text: `Failed to send ${letterType} Letter.`, timer: 3000, showConfirmButton: false });
    } finally {
      setIsGenerating({ id: null, type: null });
    }
  };

  const formatYesNo = (value) => {
    const isYes = value?.trim().toUpperCase() === "Y";
    return <Chip label={isYes ? "Yes" : "No"} color={isYes ? "success" : "error"} size="small" />;
  };

  const renderRelievingLetterTabCell = (record) => {
    if (record.relieving_letter) {
      return (
        <Box display="flex" justifyContent="center" gap={0.5}>
          <Button size="small" variant="contained" onClick={() => window.open(record.relieving_letter, "_blank")} sx={{ backgroundColor: primaryColor, "&:hover": { backgroundColor: primaryDarkColor } }}>View</Button>
        </Box>
      );
    } else {
      const letterInfo = { ref: relievingLetterRef, endpoint: `update-exit-employee-table2/${record.employee_id}/`, formDataKey: "relieving_letter" };
      return (
        <Box display="flex" justifyContent="center" gap={0.5}>
          <Button size="small" variant="contained" onClick={() => handleSendLetter(record.employee_id, "relieving", letterInfo.ref, letterInfo)} disabled={isGenerating.id === record.employee_id} sx={{ backgroundColor: primaryColor, "&:hover": { backgroundColor: primaryDarkColor } }}>
            {isGenerating.id === record.employee_id ? <CircularProgress size={20} color="inherit" /> : "Send"}
          </Button>
        </Box>
      );
    }
  };

  const renderExperienceLetterTabCell = (record) => {
    if (!record.relieving_letter) {
      return (<Typography variant="caption" color="text.secondary" sx={{ display: "flex", justifyContent: "center" }}>-</Typography>);
    }
    if (record.experience_letter) {
      return (
        <Box display="flex" justifyContent="center" gap={0.5}>
          <Button size="small" variant="contained" onClick={() => window.open(record.experience_letter, "_blank")} sx={{ backgroundColor: primaryColor, "&:hover": { backgroundColor: primaryDarkColor } }}>View</Button>
        </Box>
      );
    } else {
      const letterInfo = { ref: experienceLetterRef, endpoint: `update-exit-employee-table3/${record.employee_id}/`, formDataKey: "experience_letter" };
      return (
        <Box display="flex" justifyContent="center" gap={0.5}>
          <Button size="small" variant="contained" onClick={() => handleSendLetter(record.employee_id, "experience", letterInfo.ref, letterInfo)} disabled={isGenerating.id === record.employee_id} sx={{ backgroundColor: primaryColor, "&:hover": { backgroundColor: primaryDarkColor } }}>
            {isGenerating.id === record.employee_id ? <CircularProgress size={20} color="inherit" /> : "Send"}
          </Button>
        </Box>
      );
    }
  };

  const getVisibleColumns = () => {
    const baseCols = ["Sr No.", "Employee ID", "Employee Name", "", "Exit Type", "Return Asset", "Exit Interview", "Clearance Form", "Full & Final"];
    switch (activeTab) {
      case 0: return baseCols;
      case 1: return [...baseCols, "Relieving Letter"];
      case 2: return [...baseCols, "Relieving Letter", "Experience Letter"];
      case 3: return [...baseCols, "Relieving Letter", "Experience Letter"];
      default: return baseCols;
    }
  };
  const visibleColumns = getVisibleColumns();

  const renderCellContent = (record, column, index) => {
    if (activeTab === 1 && column === "Relieving Letter") return renderRelievingLetterTabCell(record);
    if (activeTab === 2 && column === "Experience Letter") return renderExperienceLetterTabCell(record);

    switch (column) {
      case "Sr No.": return page * rowsPerPage + index + 1;
      case "Employee ID": return record.employee_id;
      case "Employee Name": return record.employee_name;
      case "": return (<Box display="flex" justifyContent="center">{hoveredRowId === record.employee_id && activeTab !== 3 && (<IconButton onClick={() => handleNavigateToProcess(record.employee_id)} size="small" sx={{ color: "#E55D87" }}><ArrowForwardIcon fontSize="small" /></IconButton>)}</Box>);
      case "Exit Type": return record.exit_type || "N/A";
      case "Return Asset": return formatYesNo(record.return_asset);
      case "Exit Interview": return formatYesNo(record.exit_interview_questionnaire);
      case "Clearance Form": return formatYesNo(record.employee_clearance_form);
      case "Full & Final": return formatYesNo(record["f&f"]);
      case "Relieving Letter": if (record.relieving_letter) { return <Button size="small" variant="outlined" onClick={() => window.open(record.relieving_letter, "_blank")}>View</Button>; } return <Typography variant="caption" color="text.secondary">Pending</Typography>;
      case "Experience Letter": if (record.experience_letter) { return <Button size="small" variant="outlined" onClick={() => window.open(record.experience_letter, "_blank")}>View</Button>; } return <Typography variant="caption" color="text.secondary">Pending</Typography>;
      default: return null;
    }
  };

  return (
    <Box>
      <Box sx={{ position: "absolute", left: "-9999px", width: "210mm" }}>
        {letterData && (<><div ref={relievingLetterRef}></div><div ref={experienceLetterRef}></div></>)}
      </Box>

      <Typography variant="h5" sx={{ color: primaryColor, fontWeight: "bold", mb: 2 }}>
        Exit Dashboard
      </Typography>

      <Box component={Paper} p={3}>
        <Grid container spacing={2} sx={{ mb: 2 }} alignItems="center" direction={isMobile ? "column" : "row"}>
          
          <Grid item xs={12} sm>
            <TextField fullWidth size="small" placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} InputProps={{ startAdornment: (<InputAdornment position="start"><SearchIcon /></InputAdornment>) }} sx={{ width: isMobile ? "100%" : "auto", float: isMobile ? "none" : "right" }} />
          </Grid>
        </Grid>

        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={activeTab} onChange={handleTabChange} aria-label="exit process tabs">
            <Tab label="In Exit Process" />
            <Tab label="Relieving Letter" />
            <Tab label="Experience Letter" />
            <Tab label="Exited Employee" />
          </Tabs>
        </Box>

        <TabPanel value={activeTab} index={activeTab}>
          <TableContainer sx={{ minWidth: "100%", whiteSpace: "nowrap" }}>
            <Table>
              <TableHead sx={{ backgroundColor: primaryColor }}>
                <TableRow>
                  {visibleColumns.map((colName) => (<TableCell key={colName} sx={{ fontWeight: "bold", color: textColorOnPrimary }}>{colName}</TableCell>))}
                </TableRow>
              </TableHead>
              <TableBody>
                {isLoading ? (Array.from(new Array(rowsPerPage)).map((_, index) => (<TableRow key={`skeleton-${index}`}>{visibleColumns.map((colName) => (<TableCell key={`skeleton-cell-${colName}-${index}`}>{colName === "Relieving Letter" || colName === "Experience Letter" || colName === "" ? (<Skeleton variant="rectangular" width={100} height={30} />) : (<Skeleton variant="text" />)}</TableCell>))}</TableRow>))) : filteredData.length > 0 ? (filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((record, index) => (<TableRow key={record.employee_id + index} onMouseEnter={() => setHoveredRowId(record.employee_id)} onMouseLeave={() => setHoveredRowId(null)} hover>{visibleColumns.map((colName) => (<TableCell key={`${record.employee_id}-${colName}`} sx={{ fontSize: "0.95rem" }}>{renderCellContent(record, colName, index)}</TableCell>))}</TableRow>))) : (<TableRow><TableCell colSpan={visibleColumns.length} align="center">No matching records found.</TableCell></TableRow>)}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>

        <Box sx={{ display: "flex", justifyContent: isMobile ? "center" : "space-between", alignItems: "center", flexDirection: isMobile ? "column" : "row", p: 2, gap: 2 }}>
          <Typography variant="body2" color="text.secondary">
            Showing {Math.min(page * rowsPerPage + 1, filteredData.length)} to {Math.min((page + 1) * rowsPerPage, filteredData.length)} of {filteredData.length} results
          </Typography>
          <TablePagination component="div" count={filteredData.length} page={page} onPageChange={handlePageChange} rowsPerPage={rowsPerPage} onRowsPerPageChange={handleRowsPerPageChange} rowsPerPageOptions={[5, 10, 15, 25]} sx={{ "& .MuiSvgIcon-root": { color: primaryColor } }} />
        </Box>
      </Box>
    </Box>
  );
};

export default ExitDashboardHr;