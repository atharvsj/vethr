// "use client"

// import { useState } from "react"
// import {
//   Box,
//   Button,
//   Container,
//   FormControl,
//   Grid,
//   IconButton,
//   InputAdornment,
//   InputLabel,
//   MenuItem,
//   Paper,
//   Select,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TextField,
//   Typography,
//   Divider,
//   Avatar,
// } from "@mui/material"
// import {
//   CalendarToday,
//   FormatBold,
//   FormatItalic,
//   FormatUnderlined,
//   FormatListBulleted,
//   FormatListNumbered,
//   FormatIndentDecrease,
//   FormatIndentIncrease,
//   Link as LinkIcon,
//   Code,
//   Image,
//   TableChart,
//   Add as AddIcon,
//   ArrowUpward,
// } from "@mui/icons-material"

// function Page() {
//   const [view, setView] = useState("list") // 'list' or 'form'
//   const [travels, setTravels] = useState([
//     {
//       id: 1,
//       employee: "Hitesh Zhambare",
//       placeOfVisit: "Pune",
//       visitPurpose: "Training Purpose",
//       arrangementType: "Delux",
//       actualBudget: "₹7,000.00",
//       endDate: "30/10/2021",
//     },
//     {
//       id: 2,
//       employee: "Hitesh Zhambare",
//       placeOfVisit: "Test",
//       visitPurpose: "Test",
//       arrangementType: "Delux",
//       actualBudget: "₹5,000.00",
//       endDate: "24/11/2021",
//     },
//   ])

//   const [formData, setFormData] = useState({
//     employee: "Hitesh Zhambare",
//     visitPurpose: "",
//     placeOfVisit: "",
//     startDate: "",
//     endDate: "",
//     travelMode: "By Bus",
//     arrangementType: "",
//     expectedBudget: "",
//     actualBudget: "",
//     description: "",
//   })

//   const [entriesPerPage, setEntriesPerPage] = useState(10)
//   const [searchTerm, setSearchTerm] = useState("")
//   const [currentPage, setCurrentPage] = useState(1)

//   const handleInputChange = (e) => {
//     const { name, value } = e.target
//     setFormData({
//       ...formData,
//       [name]: value,
//     })
//   }

//   const handleSubmit = (e) => {
//     e.preventDefault()
//     const newTravel = {
//       id: travels.length + 1,
//       employee: formData.employee,
//       placeOfVisit: formData.placeOfVisit,
//       visitPurpose: formData.visitPurpose,
//       arrangementType: formData.arrangementType,
//       actualBudget: `₹${formData.actualBudget}`,
//       endDate: formData.endDate.split("-").reverse().join("/"),
//     }

//     setTravels([...travels, newTravel])
//     setView("list")
//   }

//   const filteredTravels = travels.filter(
//     (travel) =>
//       travel.employee.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       travel.placeOfVisit.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       travel.visitPurpose.toLowerCase().includes(searchTerm.toLowerCase()),
//   )

//   const totalPages = Math.ceil(filteredTravels.length / entriesPerPage)
//   const startIndex = (currentPage - 1) * entriesPerPage
//   const visibleTravels = filteredTravels.slice(startIndex, startIndex + entriesPerPage)

//   const handleNextPage = () => {
//     if (currentPage < totalPages) {
//       setCurrentPage(currentPage + 1)
//     }
//   }

//   const handlePrevPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1)
//     }
//   }

//   return (
//     <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
//       {view === "list" ? (
//         <Box>
//           <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
//             <Typography variant="h6" component="h1" sx={{ fontWeight: "normal" }}>
//               List All Travels
//             </Typography>
//             <Button
//               variant="contained"
//               startIcon={<AddIcon />}
//               onClick={() => setView("form")}
//               sx={{
//                 bgcolor: "#6f42c1",
//                 "&:hover": { bgcolor: "#5e35b1" },
//               }}
//             >
//               Add New
//             </Button>
//           </Box>

//           <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
//             <Box sx={{ display: "flex", alignItems: "center" }}>
//               <Typography variant="body2" sx={{ mr: 1 }}>
//                 Show
//               </Typography>
//               <Select
//                 value={entriesPerPage}
//                 onChange={(e) => setEntriesPerPage(e.target.value)}
//                 size="small"
//                 sx={{ minWidth: 70, height: 30 }}
//               >
//                 <MenuItem value={10}>10</MenuItem>
//                 <MenuItem value={25}>25</MenuItem>
//                 <MenuItem value={50}>50</MenuItem>
//                 <MenuItem value={100}>100</MenuItem>
//               </Select>
//               <Typography variant="body2" sx={{ ml: 1 }}>
//                 entries
//               </Typography>
//             </Box>

//             <Box sx={{ display: "flex", alignItems: "center" }}>
//               <Typography variant="body2" sx={{ mr: 1 }}>
//                 Search:
//               </Typography>
//               <TextField
//                 size="small"
//                 variant="outlined"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 sx={{ width: 200 }}
//               />
//             </Box>
//           </Box>

//           <TableContainer component={Paper} sx={{ mb: 2 }}>
//             <Table sx={{ minWidth: 650 }} size="small">
//               <TableHead>
//                 <TableRow sx={{ bgcolor: "#f5f5f5" }}>
//                   <TableCell sx={{ fontWeight: "bold" }}>
//                     <Box sx={{ display: "flex", alignItems: "center" }}>
//                       <ArrowUpward fontSize="small" sx={{ mr: 0.5 }} />
//                       EMPLOYEE
//                     </Box>
//                   </TableCell>
//                   <TableCell sx={{ fontWeight: "bold" }}>
//                     <Box sx={{ display: "flex", alignItems: "center" }}>PLACE OF VISIT</Box>
//                   </TableCell>
//                   <TableCell sx={{ fontWeight: "bold" }}>
//                     <Box sx={{ display: "flex", alignItems: "center" }}>VISIT PURPOSE</Box>
//                   </TableCell>
//                   <TableCell sx={{ fontWeight: "bold" }}>
//                     <Box sx={{ display: "flex", alignItems: "center" }}>ARRANGEMENT TYPE</Box>
//                   </TableCell>
//                   <TableCell sx={{ fontWeight: "bold" }}>
//                     <Box sx={{ display: "flex", alignItems: "center" }}>ACTUAL BUDGET</Box>
//                   </TableCell>
//                   <TableCell sx={{ fontWeight: "bold" }}>
//                     <Box sx={{ display: "flex", alignItems: "center" }}>END DATE</Box>
//                   </TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {visibleTravels.map((travel) => (
//                   <TableRow key={travel.id}>
//                     <TableCell>
//                       <Box sx={{ display: "flex", alignItems: "center" }}>
//                         <Avatar src="/user-image" alt="user image" sx={{ width: 24, height: 24, mr: 1 }} />
//                         {travel.employee}
//                       </Box>
//                     </TableCell>
//                     <TableCell>{travel.placeOfVisit}</TableCell>
//                     <TableCell>{travel.visitPurpose}</TableCell>
//                     <TableCell>{travel.arrangementType}</TableCell>
//                     <TableCell>{travel.actualBudget}</TableCell>
//                     <TableCell>{travel.endDate}</TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>

//           <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//             <Typography variant="body2">
//               Showing 1 to {Math.min(entriesPerPage, filteredTravels.length)} of {filteredTravels.length} records
//             </Typography>

//             <Box sx={{ display: "flex", alignItems: "center" }}>
//               <Button
//                 variant="outlined"
//                 size="small"
//                 onClick={handlePrevPage}
//                 disabled={currentPage === 1}
//                 sx={{
//                   minWidth: "auto",
//                   mr: 1,
//                   borderColor: "#dee2e6",
//                   color: "#212529",
//                   "&:hover": {
//                     bgcolor: "#e9ecef",
//                     borderColor: "#dee2e6",
//                   },
//                 }}
//               >
//                 Previous
//               </Button>

//               <Button
//                 variant="contained"
//                 size="small"
//                 sx={{
//                   minWidth: "auto",
//                   mr: 1,
//                   bgcolor: "#6f42c1",
//                   "&:hover": { bgcolor: "#5e35b1" },
//                 }}
//               >
//                 {currentPage}
//               </Button>

//               <Button
//                 variant="outlined"
//                 size="small"
//                 onClick={handleNextPage}
//                 disabled={currentPage === totalPages}
//                 sx={{
//                   minWidth: "auto",
//                   borderColor: "#dee2e6",
//                   color: "#212529",
//                   "&:hover": {
//                     bgcolor: "#e9ecef",
//                     borderColor: "#dee2e6",
//                   },
//                 }}
//               >
//                 Next
//               </Button>
//             </Box>
//           </Box>
//         </Box>
//       ) : (
//         <Paper sx={{ p: 3, mb: 4 }}>
//           <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
//             <Typography variant="h6" component="h1">
//               Add New Travel
//             </Typography>
//             <Button
//               variant="contained"
//               onClick={() => setView("list")}
//               sx={{
//                 bgcolor: "#6f42c1",
//                 "&:hover": { bgcolor: "#5e35b1" },
//               }}
//             >
//               Hide
//             </Button>
//           </Box>

//           <form onSubmit={handleSubmit}>
//             <Grid container spacing={3}>
//               <Grid item xs={12} md={6}>
//                 <FormControl fullWidth required>
//                   <InputLabel id="employee-label">Employee</InputLabel>
//                   <Select
//                     labelId="employee-label"
//                     id="employee"
//                     name="employee"
//                     value={formData.employee}
//                     onChange={handleInputChange}
//                     label="Employee"
//                   >
//                     <MenuItem value="Hitesh Zhambare">Hitesh Zhambare</MenuItem>
//                   </Select>
//                 </FormControl>
//               </Grid>

//               <Grid item xs={12} md={6}>
//                 <TextField
//                   required
//                   id="visitPurpose"
//                   name="visitPurpose"
//                   label="Visit Purpose"
//                   fullWidth
//                   value={formData.visitPurpose}
//                   onChange={handleInputChange}
//                 />
//               </Grid>

//               <Grid item xs={12} md={6}>
//                 <TextField
//                   required
//                   id="placeOfVisit"
//                   name="placeOfVisit"
//                   label="Place of Visit"
//                   fullWidth
//                   value={formData.placeOfVisit}
//                   onChange={handleInputChange}
//                 />
//               </Grid>

//               <Grid item xs={12} md={6}>
//                 <TextField
//                   required
//                   id="startDate"
//                   name="startDate"
//                   label="Start Date"
//                   type="date"
//                   fullWidth
//                   InputLabelProps={{
//                     shrink: true,
//                   }}
//                   InputProps={{
//                     endAdornment: (
//                       <InputAdornment position="end">
//                         <CalendarToday fontSize="small" />
//                       </InputAdornment>
//                     ),
//                   }}
//                   value={formData.startDate}
//                   onChange={handleInputChange}
//                 />
//               </Grid>

//               <Grid item xs={12} md={6}>
//                 <TextField
//                   required
//                   id="endDate"
//                   name="endDate"
//                   label="End Date"
//                   type="date"
//                   fullWidth
//                   InputLabelProps={{
//                     shrink: true,
//                   }}
//                   InputProps={{
//                     endAdornment: (
//                       <InputAdornment position="end">
//                         <CalendarToday fontSize="small" />
//                       </InputAdornment>
//                     ),
//                   }}
//                   value={formData.endDate}
//                   onChange={handleInputChange}
//                 />
//               </Grid>

//               <Grid item xs={12} md={6}>
//                 <FormControl fullWidth required>
//                   <InputLabel id="travelMode-label">Travel Mode</InputLabel>
//                   <Select
//                     labelId="travelMode-label"
//                     id="travelMode"
//                     name="travelMode"
//                     value={formData.travelMode}
//                     onChange={handleInputChange}
//                     label="Travel Mode"
//                   >
//                     <MenuItem value="By Bus">By Bus</MenuItem>
//                     <MenuItem value="By Train">By Train</MenuItem>
//                     <MenuItem value="By Flight">By Flight</MenuItem>
//                     <MenuItem value="By Car">By Car</MenuItem>
//                   </Select>
//                 </FormControl>
//               </Grid>

//               <Grid item xs={12} md={6}>
//                 <FormControl fullWidth required>
//                   <InputLabel id="arrangementType-label">Arrangement Type</InputLabel>
//                   <Select
//                     labelId="arrangementType-label"
//                     id="arrangementType"
//                     name="arrangementType"
//                     value={formData.arrangementType}
//                     onChange={handleInputChange}
//                     label="Arrangement Type"
//                   >
//                     <MenuItem value="Delux">Delux</MenuItem>
//                     <MenuItem value="Standard">Standard</MenuItem>
//                     <MenuItem value="Economy">Economy</MenuItem>
//                   </Select>
//                 </FormControl>
//               </Grid>

//               <Grid item xs={12} md={6}>
//                 <Box sx={{ display: "flex", alignItems: "flex-start" }}>
//                   <Box
//                     sx={{
//                       bgcolor: "#f8f9fa",
//                       border: "1px solid #ced4da",
//                       borderRight: "none",
//                       borderRadius: "4px 0 0 4px",
//                       p: "14px 10px",
//                       color: "#495057",
//                       fontSize: "0.875rem",
//                     }}
//                   >
//                     INR
//                   </Box>
//                   <TextField
//                     required
//                     id="expectedBudget"
//                     name="expectedBudget"
//                     label="Expected Budget"
//                     fullWidth
//                     value={formData.expectedBudget}
//                     onChange={handleInputChange}
//                     sx={{
//                       "& .MuiOutlinedInput-root": {
//                         borderRadius: "0 4px 4px 0",
//                       },
//                     }}
//                   />
//                 </Box>
//               </Grid>

//               <Grid item xs={12} md={6}>
//                 <Box sx={{ display: "flex", alignItems: "flex-start" }}>
//                   <Box
//                     sx={{
//                       bgcolor: "#f8f9fa",
//                       border: "1px solid #ced4da",
//                       borderRight: "none",
//                       borderRadius: "4px 0 0 4px",
//                       p: "14px 10px",
//                       color: "#495057",
//                       fontSize: "0.875rem",
//                     }}
//                   >
//                     INR
//                   </Box>
//                   <TextField
//                     required
//                     id="actualBudget"
//                     name="actualBudget"
//                     label="Actual Budget"
//                     fullWidth
//                     value={formData.actualBudget}
//                     onChange={handleInputChange}
//                     sx={{
//                       "& .MuiOutlinedInput-root": {
//                         borderRadius: "0 4px 4px 0",
//                       },
//                     }}
//                   />
//                 </Box>
//               </Grid>

//               <Grid item xs={12}>
//                 <Typography variant="body1" sx={{ mb: 1 }}>
//                   Description
//                 </Typography>
//                 <Box sx={{ mb: 1 }}>
//                   <Paper
//                     variant="outlined"
//                     sx={{
//                       display: "flex",
//                       flexWrap: "wrap",
//                       p: 0.5,
//                       borderRadius: "4px 4px 0 0",
//                       bgcolor: "#f8f9fa",
//                     }}
//                   >
//                     <Box
//                       sx={{
//                         display: "flex",
//                         alignItems: "center",
//                         border: "1px solid #ced4da",
//                         borderRadius: "4px",
//                         p: "2px 8px",
//                         mr: 1,
//                       }}
//                     >
//                       <Typography variant="body2">Format</Typography>
//                     </Box>
//                     <IconButton size="small">
//                       <FormatBold fontSize="small" />
//                     </IconButton>
//                     <IconButton size="small">
//                       <FormatItalic fontSize="small" />
//                     </IconButton>
//                     <IconButton size="small">
//                       <FormatUnderlined fontSize="small" />
//                     </IconButton>
//                     <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />
//                     <IconButton size="small">
//                       <FormatListBulleted fontSize="small" />
//                     </IconButton>
//                     <IconButton size="small">
//                       <FormatListNumbered fontSize="small" />
//                     </IconButton>
//                     <IconButton size="small">
//                       <FormatIndentDecrease fontSize="small" />
//                     </IconButton>
//                     <IconButton size="small">
//                       <FormatIndentIncrease fontSize="small" />
//                     </IconButton>
//                     <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />
//                     <IconButton size="small">
//                       <LinkIcon fontSize="small" />
//                     </IconButton>
//                     <IconButton size="small">
//                       <Code fontSize="small" />
//                     </IconButton>
//                     <IconButton size="small">
//                       <Image fontSize="small" />
//                     </IconButton>
//                     <IconButton size="small">
//                       <TableChart fontSize="small" />
//                     </IconButton>
//                   </Paper>
//                   <TextField
//                     id="description"
//                     name="description"
//                     multiline
//                     rows={6}
//                     fullWidth
//                     value={formData.description}
//                     onChange={handleInputChange}
//                     sx={{
//                       "& .MuiOutlinedInput-root": {
//                         borderRadius: "0 0 4px 4px",
//                       },
//                     }}
//                   />
//                 </Box>
//               </Grid>

//               <Grid item xs={12}>
//                 <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
//                   <Button
//                     type="submit"
//                     variant="contained"
//                     sx={{
//                       bgcolor: "#6f42c1",
//                       "&:hover": { bgcolor: "#5e35b1" },
//                     }}
//                   >
//                     Submit
//                   </Button>
//                 </Box>
//               </Grid>
//             </Grid>
//           </form>
//         </Paper>
//       )}
//     </Container>
//   )
// }

// export default Page




import { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Divider,
  Avatar,
} from "@mui/material";
import {
  CalendarToday,
  FormatBold,
  FormatItalic,
  FormatUnderlined,
  FormatListBulleted,
  FormatListNumbered,
  FormatIndentDecrease,
  FormatIndentIncrease,
  Link as LinkIcon,
  Code,
  Image,
  TableChart,
  Add as AddIcon,
  ArrowUpward,
} from "@mui/icons-material";

function Page() {
  const [view, setView] = useState("list");
  const [formData, setFormData] = useState({
    employee: "", // label (for UI)
    employeeId: "", // id (for payload)
    startDate: "",
    endDate: "",
    visitPurpose: "",
    placeOfVisit: "",
    travelMode: "",
    arrangementType: "",
    expectedBudget: "",
    actualBudget: "",
    description: "",
  });

  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [travels, setTravels] = useState([]);

  useEffect(() => {
    const fetchTravels = async () => {
      try {
        const token = localStorage.getItem("accessToken");

        const response = await axios.get(
          "https://tdtlworld.com/hrms-backend/travels/",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data && response.data.data) {
          setTravels(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching travel data:", error);
      }
    };

    fetchTravels();
  }, []);

  // Filter travels based on search term
  const filteredTravels = travels.filter((travel) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      travel.employee_name?.toLowerCase().includes(searchLower) ||
      travel.visit_place?.toLowerCase().includes(searchLower) ||
      travel.visit_purpose?.toLowerCase().includes(searchLower) ||
      travel.arrangement_type?.toLowerCase().includes(searchLower) ||
      travel.actual_budget?.toString().includes(searchLower) ||
      new Date(travel.end_date).toLocaleDateString().includes(searchLower)
    );
  });

  // Calculate pagination
  const totalRecords = filteredTravels.length;
  const totalPages = Math.ceil(totalRecords / entriesPerPage);
  const startIndex = (currentPage - 1) * entriesPerPage;
  const endIndex = startIndex + entriesPerPage;
  const currentTravels = filteredTravels.slice(startIndex, endIndex);

  // Reset to first page when search term or entries per page changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, entriesPerPage]);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    // Special case for employee dropdown
    if (name === "employee") {
      const selectedEmp = employees.find((emp) => emp.label === value);
      setFormData((prev) => ({
        ...prev,
        employee: value,
        employeeId: selectedEmp ? selectedEmp.value : "",
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("accessToken");

    const payload = {
      employee_id: formData.employeeId,
      start_date: `${formData.startDate}T00:00:00`,
      end_date: `${formData.endDate}T00:00:00`,
      associated_goals: formData.visitPurpose,
      visit_purpose: formData.visitPurpose,
      visit_place: formData.placeOfVisit,
      travel_mode: formData.travelMode,
      arrangement_type: formData.arrangementType,
      expected_budget: Number.parseFloat(formData.expectedBudget),
      actual_budget: Number.parseFloat(formData.actualBudget),
      description: formData.description,
      status: 1,
      added_by: 3, // hardcoded for now
    };

    try {
      const res = await axios.post(
        "https://tdtlworld.com/hrms-backend/travels/",
        payload,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log("Travel added:", res.data);
      alert("Travel entry added successfully!");
      // Optionally reset form or navigate
    } catch (err) {
      console.error("Submit error:", err);
      alert("Error submitting travel data.");
    }
  };

  const [employees, setEmployees] = useState([]);
  const [arrangementTypes, setArrangementTypes] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    const fetchDropdowns = async () => {
      try {
        const [employeeRes, arrangementRes] = await Promise.all([
          axios.get("https://tdtlworld.com/hrms-backend/employee-dropdown/", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("https://tdtlworld.com/hrms-backend/api/arrangement-type/", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setEmployees(employeeRes.data);
        setArrangementTypes(arrangementRes.data);
      } catch (err) {
        console.error("Dropdown fetch failed", err);
      }
    };

    fetchDropdowns();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {view === "list" ? (
        <Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography
              variant="h6"
              component="h1"
              sx={{ fontWeight: "normal" }}
            >
              List All Travels
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setView("form")}
              sx={{
                bgcolor: "#6f42c1",
                "&:hover": { bgcolor: "#5e35b1" },
              }}
            >
              Add New
            </Button>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography variant="body2" sx={{ mr: 1 }}>
                Show
              </Typography>
              <Select
                value={entriesPerPage}
                onChange={(e) => setEntriesPerPage(e.target.value)}
                size="small"
                sx={{ minWidth: 70, height: 30 }}
              >
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={25}>25</MenuItem>
                <MenuItem value={50}>50</MenuItem>
                <MenuItem value={100}>100</MenuItem>
              </Select>
              <Typography variant="body2" sx={{ ml: 1 }}>
                entries
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography variant="body2" sx={{ mr: 1 }}>
                Search:
              </Typography>
              <TextField
                size="small"
                variant="outlined"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                sx={{ width: 200 }}
              />
            </Box>
          </Box>

          <TableContainer component={Paper} sx={{ mb: 2 }}>
            <Table sx={{ minWidth: 650 }} size="small">
              <TableHead>
                <TableRow sx={{ bgcolor: "#f5f5f5" }}>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <ArrowUpward fontSize="small" sx={{ mr: 0.5 }} />
                      EMPLOYEE
                    </Box>
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      PLACE OF VISIT
                    </Box>
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      VISIT PURPOSE
                    </Box>
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      ARRANGEMENT TYPE
                    </Box>
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      ACTUAL BUDGET
                    </Box>
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      END DATE
                    </Box>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentTravels.map((travel) => (
                  <TableRow key={travel.travel_id}>
                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Avatar
                          src="/user-image" // Replace with actual image if available
                          alt="user image"
                          sx={{ width: 24, height: 24, mr: 1 }}
                        />
                        {travel.employee_name}
                      </Box>
                    </TableCell>
                    <TableCell>{travel.visit_place}</TableCell>
                    <TableCell>{travel.visit_purpose}</TableCell>
                    <TableCell>{travel.arrangement_type}</TableCell>
                    <TableCell>
                      ₹{travel.actual_budget.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      {new Date(travel.end_date).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="body2">
              Showing {totalRecords === 0 ? 0 : startIndex + 1} to{" "}
              {Math.min(endIndex, totalRecords)} of {totalRecords} records
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Button
                variant="outlined"
                size="small"
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                sx={{
                  minWidth: "auto",
                  mr: 1,
                  borderColor: "#dee2e6",
                  color: "#212529",
                  "&:hover": {
                    bgcolor: "#e9ecef",
                    borderColor: "#dee2e6",
                  },
                }}
              >
                Previous
              </Button>

              <Button
                variant="contained"
                size="small"
                sx={{
                  minWidth: "auto",
                  mr: 1,
                  bgcolor: "#6f42c1",
                  "&:hover": { bgcolor: "#5e35b1" },
                }}
              >
                {currentPage}
              </Button>

              <Button
                variant="outlined"
                size="small"
                onClick={handleNextPage}
                disabled={currentPage === totalPages || totalPages === 0}
                sx={{
                  minWidth: "auto",
                  borderColor: "#dee2e6",
                  color: "#212529",
                  "&:hover": {
                    bgcolor: "#e9ecef",
                    borderColor: "#dee2e6",
                  },
                }}
              >
                Next
              </Button>
            </Box>
          </Box>
        </Box>
      ) : (
        <Paper sx={{ p: 3, mb: 4 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 3,
            }}
          >
            <Typography variant="h6" component="h1">
              Add New Travel
            </Typography>
            <Button
              variant="contained"
              onClick={() => setView("list")}
              sx={{
                bgcolor: "#6f42c1",
                "&:hover": { bgcolor: "#5e35b1" },
              }}
            >
              Hide
            </Button>
          </Box>

          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth required>
                  <InputLabel id="employee-label">Employee</InputLabel>
                  <Select
                    labelId="employee-label"
                    id="employee"
                    name="employee"
                    value={formData.employee}
                    onChange={handleInputChange}
                    label="Employee"
                  >
                    {employees.map((emp) => (
                      <MenuItem key={emp.value} value={emp.label}>
                        {emp.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  required
                  id="visitPurpose"
                  name="visitPurpose"
                  label="Visit Purpose"
                  fullWidth
                  value={formData.visitPurpose}
                  onChange={handleInputChange}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  required
                  id="placeOfVisit"
                  name="placeOfVisit"
                  label="Place of Visit"
                  fullWidth
                  value={formData.placeOfVisit}
                  onChange={handleInputChange}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  required
                  id="startDate"
                  name="startDate"
                  label="Start Date"
                  type="date"
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <CalendarToday fontSize="small" />
                      </InputAdornment>
                    ),
                  }}
                  value={formData.startDate}
                  onChange={handleInputChange}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  required
                  id="endDate"
                  name="endDate"
                  label="End Date"
                  type="date"
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <CalendarToday fontSize="small" />
                      </InputAdornment>
                    ),
                  }}
                  value={formData.endDate}
                  onChange={handleInputChange}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControl fullWidth required>
                  <InputLabel id="travelMode-label">Travel Mode</InputLabel>
                  <Select
                    labelId="travelMode-label"
                    id="travelMode"
                    name="travelMode"
                    value={formData.travelMode}
                    onChange={handleInputChange}
                    label="Travel Mode"
                  >
                    <MenuItem value="By Bus">By Bus</MenuItem>
                    <MenuItem value="By Train">By Train</MenuItem>
                    <MenuItem value="By Flight">By Flight</MenuItem>
                    <MenuItem value="By Car">By Car</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControl fullWidth required sx={{ mb: 2 }}>
                  <InputLabel id="arrangementType-label">
                    Arrangement Type
                  </InputLabel>
                  <Select
                    labelId="arrangementType-label"
                    id="arrangementType"
                    name="arrangementType"
                    value={formData.arrangementType}
                    onChange={handleInputChange}
                    label="Arrangement Type"
                  >
                    {arrangementTypes.map((type) => (
                      <MenuItem key={type.value} value={type.label.trim()}>
                        {type.label.trim()}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <Box sx={{ display: "flex", alignItems: "flex-start" }}>
                  <Box
                    sx={{
                      bgcolor: "#f8f9fa",
                      border: "1px solid #ced4da",
                      borderRight: "none",
                      borderRadius: "4px 0 0 4px",
                      p: "14px 10px",
                      color: "#495057",
                      fontSize: "0.875rem",
                    }}
                  >
                    INR
                  </Box>
                  <TextField
                    required
                    id="expectedBudget"
                    name="expectedBudget"
                    label="Expected Budget"
                    fullWidth
                    value={formData.expectedBudget}
                    onChange={handleInputChange}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "0 4px 4px 0",
                      },
                    }}
                  />
                </Box>
              </Grid>

              <Grid item xs={12} md={6}>
                <Box sx={{ display: "flex", alignItems: "flex-start" }}>
                  <Box
                    sx={{
                      bgcolor: "#f8f9fa",
                      border: "1px solid #ced4da",
                      borderRight: "none",
                      borderRadius: "4px 0 0 4px",
                      p: "14px 10px",
                      color: "#495057",
                      fontSize: "0.875rem",
                    }}
                  >
                    INR
                  </Box>
                  <TextField
                    required
                    id="actualBudget"
                    name="actualBudget"
                    label="Actual Budget"
                    fullWidth
                    value={formData.actualBudget}
                    onChange={handleInputChange}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "0 4px 4px 0",
                      },
                    }}
                  />
                </Box>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  Description
                </Typography>
                <Box sx={{ mb: 1 }}>
                  <Paper
                    variant="outlined"
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      p: 0.5,
                      borderRadius: "4px 4px 0 0",
                      bgcolor: "#f8f9fa",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        border: "1px solid #ced4da",
                        borderRadius: "4px",
                        p: "2px 8px",
                        mr: 1,
                      }}
                    >
                      <Typography variant="body2">Format</Typography>
                    </Box>
                    <IconButton size="small">
                      <FormatBold fontSize="small" />
                    </IconButton>
                    <IconButton size="small">
                      <FormatItalic fontSize="small" />
                    </IconButton>
                    <IconButton size="small">
                      <FormatUnderlined fontSize="small" />
                    </IconButton>
                    <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />
                    <IconButton size="small">
                      <FormatListBulleted fontSize="small" />
                    </IconButton>
                    <IconButton size="small">
                      <FormatListNumbered fontSize="small" />
                    </IconButton>
                    <IconButton size="small">
                      <FormatIndentDecrease fontSize="small" />
                    </IconButton>
                    <IconButton size="small">
                      <FormatIndentIncrease fontSize="small" />
                    </IconButton>
                    <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />
                    <IconButton size="small">
                      <LinkIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small">
                      <Code fontSize="small" />
                    </IconButton>
                    <IconButton size="small">
                      <Image fontSize="small" />
                    </IconButton>
                    <IconButton size="small">
                      <TableChart fontSize="small" />
                    </IconButton>
                  </Paper>
                  <TextField
                    id="description"
                    name="description"
                    multiline
                    rows={6}
                    fullWidth
                    value={formData.description}
                    onChange={handleInputChange}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "0 0 4px 4px",
                      },
                    }}
                  />
                </Box>
              </Grid>

              <Grid item xs={12}>
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      bgcolor: "#6f42c1",
                      "&:hover": { bgcolor: "#5e35b1" },
                    }}
                  >
                    Submit
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </Paper>
      )}
    </Container>
  );
}

export default Page;