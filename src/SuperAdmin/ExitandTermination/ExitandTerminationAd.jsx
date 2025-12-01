import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
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
  Skeleton,
  InputAdornment,
  useTheme,
  useMediaQuery,
  FormControl,
  Select,
  MenuItem,
  Pagination,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import SearchIcon from "@mui/icons-material/Search";
import Add from "@mui/icons-material/Add";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import letterheadImage from "../../Assests/letterhead.png";
import Swal from "sweetalert2";

const staticLetterData = {
  "EMP001": {
    emp_data: { employee_name: "Alice Johnson", address_1: "123 Maple Street, Anytown", gender: "Female", date_of_joining: "15-03-2022", designation_name: "Software Engineer" },
    hr_data: { hr_name: "Robert Smith", designation_name: "HR Manager", gender: "Male", sign: "path/to/robert_sign.png" },
    company_stamp: { company_stamp: "path/to/company_stamp.png" },
    last_working_date: ["2025-10-30"],
  },
};

const ExitDashboardAdmin = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const primaryColor = "#8C257C";
  const primaryDarkColor = "#6d1d60";
  const secondaryColor = "#F58E35";

  const [exitRecords, setExitRecords] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState({ id: null, type: null, action: null });
  const [hoveredRowId, setHoveredRowId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const relievingLetterRef = useRef(null);
  const experienceLetterRef = useRef(null);
  const [letterData, setLetterData] = useState(null);
  const [transparentStamp, setTransparentStamp] = useState(null);
  const [transparentSign, setTransparentSign] = useState(null);

  const navigate = useNavigate();

  const makeImageTransparent = (imageUrl) => {
    return new Promise((resolve) => resolve(null));
  };

  const fetchExitRecords = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch("https://tdtlworld.com/hrms-backend/exit-employee-finaltable/");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setExitRecords(data);
      setFilteredData(data);
    } catch (error) {
      console.error("Error fetching exit records:", error);
      Swal.fire({
        icon: 'error',
        title: 'Fetch Error',
        text: 'Could not fetch exit records from the server.',
        timer: 3000,
        showConfirmButton: false,
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchExitRecords();
  }, [fetchExitRecords]);

  useEffect(() => {
    const lowercasedQuery = searchTerm.toLowerCase();
    const filtered = exitRecords.filter(record =>
      (record.employee_id || '').toLowerCase().includes(lowercasedQuery) ||
      (record.employee_name || '').toLowerCase().includes(lowercasedQuery) ||
      (record.exit_type || '').toLowerCase().includes(lowercasedQuery)
    );
    setFilteredData(filtered);
    setPage(0);
  }, [searchTerm, exitRecords]);

  const handleNavigateToProcess = (employeeId) => {
    navigate(``);
  };

  const handlePaginationChange = (event, newPage) => {
    setPage(newPage - 1);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const fetchLetterData = async (employeeId) => {
    try {
      const data = staticLetterData[employeeId] || staticLetterData["EMP001"];
      if (!data) throw new Error("No data found for this employee.");
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
      Swal.fire({ icon: 'error', title: 'Error', text: 'Failed to fetch data for the letter.', timer: 3000, showConfirmButton: false });
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
      Swal.fire({ icon: 'error', title: 'Preview Failed', text: `Failed to preview ${letterType} Letter.`, timer: 3000, showConfirmButton: false });
    } finally {
      setIsGenerating({ id: null, type: null, action: null });
    }
  };

  const handleSendLetter = async (employeeId, letterType, letterRef) => {
    setIsGenerating({ id: employeeId, type: letterType, action: 'send' });
    try {
      const data = await fetchLetterData(employeeId);
      if (!data) throw new Error("Failed to get data for PDF generation.");
      await new Promise(resolve => setTimeout(resolve, 100));

      const pdf = await createPdfDocument(letterRef);
      const pdfBlob = pdf.output('blob');
      const pdfFileUrl = URL.createObjectURL(pdfBlob);

      console.log(`Simulating sending of ${letterType} letter for ${employeeId}.`);
      await new Promise(resolve => setTimeout(resolve, 1000));

      const updatedRecordKey = `${letterType}_letter`;
      setExitRecords(prevRecords =>
        prevRecords.map(record =>
          record.employee_id === employeeId ? { ...record, [updatedRecordKey]: pdfFileUrl } : record
        )
      );
      Swal.fire({ icon: 'success', title: 'Success!', text: `${letterType.charAt(0).toUpperCase() + letterType.slice(1)} Letter sent successfully!`, timer: 3000, showConfirmButton: false });
      setLetterData(null);
    } catch (error) {
      console.error(`Error sending ${letterType} letter:`, error);
      Swal.fire({ icon: 'error', title: 'Send Failed', text: `Failed to send ${letterType} Letter.`, timer: 3000, showConfirmButton: false });
    } finally {
      setIsGenerating({ id: null, type: null, action: null });
    }
  };

  const formatYesNo = (value) => {
    const isYes = typeof value === 'string' && value.trim().toUpperCase() === 'Y';
    return <Chip label={isYes ? "Yes" : "No"} color={isYes ? "success" : "error"} size="small" />;
  };

  const renderLetterCell = (record, type) => {
    const isFullAndFinalDone = record["f&f"]?.trim().toUpperCase() === 'Y';
    if (!isFullAndFinalDone) return <Typography variant="caption" color="text.secondary">N/A</Typography>;

    const letterInfo = {
      relieving: { isSent: !!record.relieving_letter, url: record.relieving_letter, ref: relievingLetterRef, prereqMet: true },
      experience: { isSent: !!record.experience_letter, url: record.experience_letter, ref: experienceLetterRef, prereqMet: !!record.relieving_letter }
    }[type];

    if (!letterInfo.prereqMet) return <Typography variant="caption" color="text.secondary">-</Typography>;

    if (letterInfo.isSent) {
      return (
        <Box display="flex" flexDirection="column" alignItems="center" gap={0.5}>
          <Button
            size="small"
            variant="contained"
            onClick={() => window.open(letterInfo.url, '_blank')}
            sx={{ backgroundColor: primaryColor, '&:hover': { backgroundColor: primaryDarkColor } }}
          >
            Show
          </Button>
          <Typography variant="caption" sx={{ color: "green" }}>
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
          sx={{ color: primaryColor, borderColor: primaryColor, '&:hover': { borderColor: primaryDarkColor, color: primaryDarkColor } }}
        >
          {isGenerating.id === record.employee_id && isGenerating.action === 'preview' ? <CircularProgress size={20} color="inherit" /> : "Preview"}
        </Button>
        <Button
          size="small"
          variant="contained"
          onClick={() => handleSendLetter(record.employee_id, type, letterInfo.ref)}
          disabled={isGenerating.id === record.employee_id}
          sx={{ backgroundColor: primaryColor, '&:hover': { backgroundColor: primaryDarkColor } }}
        >
          {isGenerating.id === record.employee_id && isGenerating.action === 'send' ? <CircularProgress size={20} color="inherit" /> : "Send"}
        </Button>
      </Box>
    );
  };

  const startEntry = filteredData.length > 0 ? page * rowsPerPage + 1 : 0;
  const endEntry = Math.min((page + 1) * rowsPerPage, filteredData.length);

  return (
    <Box component={Paper} p={3}>
      <Box sx={{ position: 'absolute', left: '-9999px', fontFamily: 'serif', color: 'black', zIndex: -1 }}>
        {letterData && (
          <>
            <div ref={relievingLetterRef} style={{ width: '210mm', height: '297mm', fontSize: '12pt', lineHeight: '1.5' }}>
               {/* Relieving Letter Content Here */}
            </div>
            <div ref={experienceLetterRef} style={{ width: '210mm', height: '297mm', fontSize: '12pt', lineHeight: '1.5' }}>
               {/* Experience Letter Content Here */}
            </div>
          </>
        )}
      </Box>
     
      <Typography variant="h4" sx={{ color: primaryColor, fontWeight: 'bold', mb: 5 }}>
        Exit Dashboard 
      </Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
          flexDirection: isMobile ? "column" : "row",
          gap: 2,
        }}
      >
        {/* <Button
          variant="contained"
          startIcon={<Add />}
          sx={{
            backgroundColor: primaryColor,
            color: '#FFFFFF',
            '&:hover': { backgroundColor: primaryDarkColor },
            width: isMobile ? "100%" : "auto",
            alignSelf: isMobile ? "stretch" : "auto",
          }}
        >
          Add New
        </Button> */}
        <TextField
          size="small"
          placeholder="Search ..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ width: isMobile ? "100%" : "auto" }}
        />
      </Box>

      <TableContainer>
        <Table sx={{ minWidth: '100%', whiteSpace: 'nowrap' }}>
          <TableHead sx={{ backgroundColor: primaryColor }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Sr No.</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Employee ID</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Employee Name</TableCell>
              <TableCell sx={{ width: '60px' }}></TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Exit Type</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Return Asset</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Exit Interview</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Clearance Form</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Full & Final</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Relieving Letter</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: 'white' }}>Experience Letter</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              Array.from(new Array(rowsPerPage)).map((_, index) => (
                <TableRow key={index}>
                  <TableCell><Skeleton variant="text" /></TableCell>
                  <TableCell><Skeleton variant="text" /></TableCell>
                  <TableCell><Skeleton variant="text" /></TableCell>
                  <TableCell></TableCell>
                  <TableCell><Skeleton variant="text" /></TableCell>
                  <TableCell><Skeleton variant="rectangular" width={40} height={20} /></TableCell>
                  <TableCell><Skeleton variant="rectangular" width={40} height={20} /></TableCell>
                  <TableCell><Skeleton variant="rectangular" width={40} height={20} /></TableCell>
                  <TableCell><Skeleton variant="rectangular" width={40} height={20} /></TableCell>
                  <TableCell><Skeleton variant="rectangular" width={80} height={40} /></TableCell>
                  <TableCell><Skeleton variant="rectangular" width={80} height={40} /></TableCell>
                </TableRow>
              ))
            ) : filteredData.length > 0 ? (
              filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((record, index) => (
                <TableRow key={record.employee_id || index} onMouseEnter={() => setHoveredRowId(record.employee_id)} onMouseLeave={() => setHoveredRowId(null)} hover>
                  <TableCell sx={{ fontSize: '0.95rem' }}>{page * rowsPerPage + index + 1}</TableCell>
                  <TableCell sx={{ fontSize: '0.95rem' }}>{record.employee_id || "N/A"}</TableCell>
                  <TableCell sx={{ fontSize: '0.95rem' }}>{record.employee_name || "N/A"}</TableCell>
                  <TableCell sx={{ padding: '0 8px', textAlign: 'center' }}>
                    {/* {hoveredRowId === record.employee_id && (
                      <IconButton onClick={() => handleNavigateToProcess(record.employee_id)} size="small" sx={{ color: primaryColor }}>
                        <ArrowForwardIcon fontSize="small" />
                      </IconButton>
                    )} */}
                  </TableCell>
                  <TableCell sx={{ fontSize: '0.95rem' }}>{record.exit_type || "N/A"}</TableCell>
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
      </TableContainer>

      <Box sx={{ p: 2, borderTop: '1px solid rgba(224, 224, 224, 1)' }}>
          {isLoading ? (
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Skeleton variant="text" width={200} />
                  <Skeleton variant="rectangular" width={300} height={40} />
              </Box>
          ) : (
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <FormControl variant="outlined" size="small">
                          <Select
                              value={rowsPerPage}
                              onChange={handleChangeRowsPerPage}
                              sx={{
                                  backgroundColor: primaryColor,
                                  color: 'white',
                                  borderRadius: '4px',
                                  transition: 'background-color 0.3s',
                                  '&:hover': {
                                      backgroundColor: primaryDarkColor,
                                  },
                                  '& .MuiOutlinedInput-notchedOutline': {
                                      border: 'none',
                                  },
                                  '& .MuiSvgIcon-root': {
                                      color: 'white',
                                  },
                              }}
                          >
                              {[5, 10, 15, 25].map((value) => (
                                  <MenuItem key={value} value={value}>{value}</MenuItem>
                              ))}
                          </Select>
                      </FormControl>
                      <Typography variant="body2" color="text.secondary">
                        {`Showing ${startEntry} to ${endEntry} of ${filteredData.length} results`}
                      </Typography>
                  </Box>
                  <Pagination
                      count={Math.ceil(filteredData.length / rowsPerPage)}
                      page={page + 1}
                      onChange={handlePaginationChange}
                      showFirstButton
                      showLastButton
                      sx={{
                          '& .MuiPaginationItem-root': {
                              borderRadius: '4px',
                              transition: 'background-color 0.3s, color 0.3s',
                              '&:hover': {
                                  backgroundColor: secondaryColor,
                                  color: 'white',
                              }
                          },
                          '& .MuiPaginationItem-page': {
                              color: primaryColor,
                              '&.Mui-selected': {
                                  backgroundColor: primaryColor,
                                  color: 'white',
                                  '&:hover': {
                                      backgroundColor: secondaryColor,
                                  }
                              },
                          },
                          '& .MuiPaginationItem-icon': {
                              color: primaryColor,
                          }
                      }}
                  />
              </Box>
          )}
      </Box>
    </Box>
  );
};

export default ExitDashboardAdmin;