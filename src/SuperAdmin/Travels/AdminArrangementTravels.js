// import { useState } from "react"
// import {
//   Box,
//   Button,
//   Grid,
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
//   Tab,
//   Tabs,
//   IconButton,
// } from "@mui/material"
// import { ArrowBack, ArrowForward, ArrowUpward } from "@mui/icons-material"

// function Page() {
//   const [view, setView] = useState("arrangement") // 'arrangement' or 'calendar'

//   // Arrangement Type state
//   const [arrangementTypes, setArrangementTypes] = useState([
//     { id: 1, name: "Deluxe", createdAt: "28/10/2021" },
//     { id: 2, name: "Simple", createdAt: "28/10/2021" },
//   ])
//   const [newArrangementType, setNewArrangementType] = useState("")
//   const [entriesPerPage, setEntriesPerPage] = useState(10)
//   const [searchTerm, setSearchTerm] = useState("")
//   const [currentPage, setCurrentPage] = useState(1)

//   // Calendar state
//   const [calendarView, setCalendarView] = useState("month")
//   const [currentMonth, setCurrentMonth] = useState("April 2025")

//   // Calendar data
//   const calendarDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

//   // Add Arrangement Type
//   const handleAddArrangementType = () => {
//     if (newArrangementType.trim() !== "") {
//       const today = new Date()
//       const formattedDate = `${today.getDate().toString().padStart(2, "0")}/${(today.getMonth() + 1)
//         .toString()
//         .padStart(2, "0")}/${today.getFullYear()}`

//       const newType = {
//         id: arrangementTypes.length + 1,
//         name: newArrangementType,
//         createdAt: formattedDate,
//       }

//       setArrangementTypes([...arrangementTypes, newType])
//       setNewArrangementType("")
//     }
//   }

//   const filteredArrangementTypes = arrangementTypes.filter((type) =>
//     type.name.toLowerCase().includes(searchTerm.toLowerCase()),
//   )

//   const totalPages = Math.ceil(filteredArrangementTypes.length / entriesPerPage)
//   const startIndex = (currentPage - 1) * entriesPerPage
//   const visibleArrangementTypes = filteredArrangementTypes.slice(startIndex, startIndex + entriesPerPage)

//   return (
//     <Box sx={{ p: 3 }}>
//       {/* Top Navigation Tabs */}
//       <Tabs value={view} onChange={(e, newValue) => setView(newValue)} centered>
//         <Tab label="Arrangement Type" value="arrangement" />
//         <Tab label="Calendar" value="calendar" />
//       </Tabs>

//       {view === "arrangement" ? (
//         <Grid container spacing={2} sx={{ mt: 2 }}>
//           <Grid item xs={12} md={4}>
//             <Paper sx={{ p: 2, height: "100%" }}>
//               <Typography variant="h6" sx={{ mb: 2 }}>
//                 Add New Arrangement Type
//               </Typography>
//               <TextField
//                 required
//                 label="Arrangement Type"
//                 fullWidth
//                 value={newArrangementType}
//                 onChange={(e) => setNewArrangementType(e.target.value)}
//                 sx={{ mb: 2 }}
//               />
//               <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
//                 <Button
//                   variant="contained"
//                   onClick={handleAddArrangementType}
//                   sx={{ bgcolor: "#6f42c1", "&:hover": { bgcolor: "#5e35b1" } }}
//                 >
//                   Save
//                 </Button>
//               </Box>
//             </Paper>
//           </Grid>

//           <Grid item xs={12} md={8}>
//             <Paper sx={{ p: 2 }}>
//               <Typography variant="h6" sx={{ mb: 2 }}>
//                 List of Arrangement Types
//               </Typography>

//               <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
//                 <Box sx={{ display: "flex", alignItems: "center" }}>
//                   <Typography variant="body2" sx={{ mr: 1 }}>
//                     Show
//                   </Typography>
//                   <Select
//                     value={entriesPerPage}
//                     onChange={(e) => setEntriesPerPage(e.target.value)}
//                     size="small"
//                     sx={{ minWidth: 70, height: 30 }}
//                   >
//                     {[10, 25, 50, 100].map((num) => (
//                       <MenuItem key={num} value={num}>
//                         {num}
//                       </MenuItem>
//                     ))}
//                   </Select>
//                   <Typography variant="body2" sx={{ ml: 1 }}>
//                     entries
//                   </Typography>
//                 </Box>

//                 <TextField
//                   size="small"
//                   variant="outlined"
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   sx={{ width: 200 }}
//                   placeholder="Search..."
//                 />
//               </Box>

//               <TableContainer sx={{ mb: 2 }}>
//                 <Table size="small">
//                   <TableHead>
//                     <TableRow sx={{ bgcolor: "#f5f5f5" }}>
//                       <TableCell sx={{ fontWeight: "bold" }}>
//                         <Box sx={{ display: "flex", alignItems: "center" }}>
//                           <ArrowUpward fontSize="small" sx={{ mr: 0.5 }} />
//                           ARRANGEMENT TYPE
//                         </Box>
//                       </TableCell>
//                       <TableCell sx={{ fontWeight: "bold" }}>CREATED AT</TableCell>
//                     </TableRow>
//                   </TableHead>
//                   <TableBody>
//                     {visibleArrangementTypes.map((type) => (
//                       <TableRow key={type.id}>
//                         <TableCell>{type.name}</TableCell>
//                         <TableCell>{type.createdAt}</TableCell>
//                       </TableRow>
//                     ))}
//                   </TableBody>
//                 </Table>
//               </TableContainer>
//             </Paper>
//           </Grid>
//         </Grid>
//       ) : (
//         <Paper sx={{ p: 2, mt: 2 }}>
//           <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
//             <Box sx={{ display: "flex", alignItems: "center" }}>
//               <IconButton>
//                 <ArrowBack />
//               </IconButton>
//               <IconButton>
//                 <ArrowForward />
//               </IconButton>
//               <Button
//                 variant="contained"
//                 size="small"
//                 sx={{ ml: 1, bgcolor: "#6f42c1", "&:hover": { bgcolor: "#5e35b1" } }}
//               >
//                 Today
//               </Button>
//             </Box>

//             <Typography variant="h6">{currentMonth}</Typography>

//             <Box>
//               {["month", "week", "day", "list"].map((mode) => (
//                 <Button
//                   key={mode}
//                   variant={calendarView === mode ? "contained" : "outlined"}
//                   size="small"
//                   onClick={() => setCalendarView(mode)}
//                   sx={{ mx: 0.5, bgcolor: calendarView === mode ? "#6f42c1" : "transparent" }}
//                 >
//                   {mode}
//                 </Button>
//               ))}
//             </Box>
//           </Box>

//           <TableContainer>
//             <Table>
//               <TableHead>
//                 <TableRow>
//                   {calendarDays.map((day) => (
//                     <TableCell key={day} align="center" sx={{ fontWeight: "bold", borderBottom: "1px solid #e0e0e0" }}>
//                       {day}
//                     </TableCell>
//                   ))}
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 <TableRow>
//                   {Array(7)
//                     .fill(null)
//                     .map((_, index) => (
//                       <TableCell key={index} align="center" sx={{ height: "100px", border: "1px solid #e0e0e0" }}>
//                         {index + 1}
//                       </TableCell>
//                     ))}
//                 </TableRow>
//               </TableBody>
//             </Table>
//           </TableContainer>
//         </Paper>
//       )}
//     </Box>
//   )
// }

// export default Page


import React, { useState, useMemo, useEffect, useCallback } from "react";
import {
  Box,
  Button,
  Grid,
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
  Tab,
  Tabs,
  IconButton,
  CircularProgress,
  TableSortLabel,
} from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material"; // ArrowUpward removed as TableSortLabel will be used

const API_URL = "https://tdtlworld.com/hrms-backend/api/arrangement-type/";

const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return dateString; // Return original if invalid
    }
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  } catch (e) {
    console.error("Error formatting date:", e, "Original date:", dateString);
    return dateString;
  }
};

function Page() {
  const [view, setView] = useState("arrangement"); // 'arrangement' or 'calendar'

  // Arrangement Type state
  const [allArrangementTypes, setAllArrangementTypes] = useState([]);
  const [newArrangementType, setNewArrangementType] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1); // 1-based indexing

  const [loadingArrangements, setLoadingArrangements] = useState(true);
  const [arrangementError, setArrangementError] = useState(null);
  const [submittingArrangement, setSubmittingArrangement] = useState(false);
  const [submitArrangementError, setSubmitArrangementError] = useState(null);
  
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'ascending' });


  // Calendar state
  const [calendarView, setCalendarView] = useState("month");
  const [currentMonth, setCurrentMonth] = useState("April 2025"); // This will need dynamic updates

  // Calendar data
  const calendarDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const fetchArrangementTypes = useCallback(async () => {
    setLoadingArrangements(true);
    setArrangementError(null);
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      const transformedData = data.map(item => ({
        id: item.value,
        name: item.label,
        createdAt: formatDate(item.created_at),
      }));
      setAllArrangementTypes(transformedData);
    } catch (error) {
      console.error("Failed to fetch arrangement types:", error);
      setArrangementError(error.message);
    } finally {
      setLoadingArrangements(false);
    }
  }, []);

  useEffect(() => {
    if (view === "arrangement") {
      fetchArrangementTypes();
    }
  }, [view, fetchArrangementTypes]);

  // Add Arrangement Type
  const handleAddArrangementType = async () => {
    if (newArrangementType.trim() !== "") {
      setSubmittingArrangement(true);
      setSubmitArrangementError(null);
      try {
        const response = await fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Add Authorization header if needed
          },
          body: JSON.stringify({ category_name: newArrangementType.trim() }),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({ message: 'Failed to add arrangement type. Unknown server error.' }));
          throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }
        // const addedType = await response.json(); // Process if needed
        setNewArrangementType("");
        alert("Arrangement type added successfully!");
        fetchArrangementTypes(); // Refresh the list
      } catch (error) {
        console.error("Failed to add arrangement type:", error);
        setSubmitArrangementError(error.message);
        alert(`Error: ${error.message}`);
      } finally {
        setSubmittingArrangement(false);
      }
    } else {
        alert("Arrangement type name cannot be empty.");
    }
  };
  
  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedAndFilteredArrangementTypes = useMemo(() => {
    let sortableItems = [...allArrangementTypes];
    if (sortConfig.key !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems.filter((type) =>
        type.name && type.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [allArrangementTypes, searchTerm, sortConfig]);


  const totalPages = Math.ceil(sortedAndFilteredArrangementTypes.length / entriesPerPage);
  const startIndex = (currentPage - 1) * entriesPerPage;
  const visibleArrangementTypes = sortedAndFilteredArrangementTypes.slice(startIndex, startIndex + entriesPerPage);

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };


  // Dummy calendar generation for the month view
  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay(); // 0 (Sun) - 6 (Sat)

  const generateCalendarGrid = () => {
    // For "April 2025"
    const year = 2025;
    const month = 3; // April (0-indexed)
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    const grid = [];
    let dayCounter = 1;
    for (let i = 0; i < 6; i++) { // Max 6 weeks
      const week = [];
      for (let j = 0; j < 7; j++) {
        if (i === 0 && j < firstDay) {
          week.push({ day: "", isCurrentMonth: false });
        } else if (dayCounter <= daysInMonth) {
          week.push({ day: dayCounter, isCurrentMonth: true });
          dayCounter++;
        } else {
          week.push({ day: "", isCurrentMonth: false });
        }
      }
      grid.push(week);
      if (dayCounter > daysInMonth) break; // Stop if all days are placed
    }
    return grid;
  };

  const calendarGrid = useMemo(() => generateCalendarGrid(), [currentMonth]); // Re-generate if currentMonth changes


  return (
    <Box sx={{ p: 3 }}>
      <Tabs value={view} onChange={(e, newValue) => setView(newValue)} centered indicatorColor="primary" textColor="primary">
        <Tab label="Arrangement Type" value="arrangement" />
        <Tab label="Calendar" value="calendar" />
      </Tabs>

      {view === "arrangement" ? (
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 2, height: "100%" }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Add New Arrangement Type
              </Typography>
              <TextField
                required
                label="Arrangement Type"
                fullWidth
                value={newArrangementType}
                onChange={(e) => setNewArrangementType(e.target.value)}
                sx={{ mb: 2 }}
                disabled={submittingArrangement}
              />
              {submitArrangementError && (
                <Typography color="error" variant="body2" sx={{ mb: 1 }}>
                  Error: {submitArrangementError}
                </Typography>
              )}
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                  variant="contained"
                  onClick={handleAddArrangementType}
                  disabled={submittingArrangement}
                  sx={{ bgcolor: "#6f42c1", "&:hover": { bgcolor: "#5e35b1" } }}
                >
                  {submittingArrangement ? <CircularProgress size={24} color="inherit" /> : "Save"}
                </Button>
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                List of Arrangement Types
              </Typography>

              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2, flexWrap: 'wrap', gap: 1 }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography variant="body2" sx={{ mr: 1 }}>
                    Show
                  </Typography>
                  <Select
                    value={entriesPerPage}
                    onChange={(e) => {
                        setEntriesPerPage(e.target.value);
                        setCurrentPage(1); // Reset to first page
                    }}
                    size="small"
                    sx={{ minWidth: 70, height: 30 }}
                  >
                    {[10, 25, 50, 100].map((num) => (
                      <MenuItem key={num} value={num}>
                        {num}
                      </MenuItem>
                    ))}
                  </Select>
                  <Typography variant="body2" sx={{ ml: 1 }}>
                    entries
                  </Typography>
                </Box>

                <TextField
                  size="small"
                  variant="outlined"
                  value={searchTerm}
                  onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setCurrentPage(1); // Reset to first page
                  }}
                  sx={{ width: {xs: '100%', sm: 200} }}
                  placeholder="Search..."
                />
              </Box>

              {loadingArrangements ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}><CircularProgress /></Box>
              ) : arrangementError ? (
                <Typography color="error" sx={{ p: 2 }}>
                    Error: {arrangementError}. <Button onClick={fetchArrangementTypes}>Retry</Button>
                </Typography>
              ) : (
                <>
                  <TableContainer sx={{ mb: 2 }}>
                    <Table size="small">
                      <TableHead>
                        <TableRow sx={{ bgcolor: "#f5f5f5" }}>
                          <TableCell sx={{ fontWeight: "bold" }}>
                            <TableSortLabel
                              active={sortConfig.key === 'name'}
                              direction={sortConfig.key === 'name' ? sortConfig.direction : 'asc'}
                              onClick={() => handleSort('name')}
                            >
                              ARRANGEMENT TYPE
                            </TableSortLabel>
                          </TableCell>
                          <TableCell sx={{ fontWeight: "bold" }}>
                             <TableSortLabel
                              active={sortConfig.key === 'createdAt'}
                              direction={sortConfig.key === 'createdAt' ? sortConfig.direction : 'asc'}
                              onClick={() => handleSort('createdAt')}
                            >
                              CREATED AT
                            </TableSortLabel>
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {visibleArrangementTypes.length > 0 ? visibleArrangementTypes.map((type) => (
                          <TableRow key={type.id}>
                            <TableCell>{type.name}</TableCell>
                            <TableCell>{type.createdAt}</TableCell>
                          </TableRow>
                        )) : (
                            <TableRow>
                                <TableCell colSpan={2} align="center">No arrangement types found.</TableCell>
                            </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  {sortedAndFilteredArrangementTypes.length > 0 && (
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                        <Typography variant="body2">
                            Showing {startIndex + 1} to {Math.min(startIndex + entriesPerPage, sortedAndFilteredArrangementTypes.length)} of {sortedAndFilteredArrangementTypes.length} entries
                        </Typography>
                        <Box>
                            <Button onClick={handlePreviousPage} disabled={currentPage === 1} size="small">Previous</Button>
                            <Typography variant="body2" component="span" sx={{ mx: 1 }}>
                                Page {currentPage} of {totalPages}
                            </Typography>
                            <Button onClick={handleNextPage} disabled={currentPage === totalPages} size="small">Next</Button>
                        </Box>
                    </Box>
                  )}
                </>
              )}
            </Paper>
          </Grid>
        </Grid>
      ) : (
        <Paper sx={{ p: 2, mt: 2 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2, flexWrap: 'wrap', gap: 1 }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <IconButton onClick={() => alert("Previous month logic needed")}> {/* TODO: Implement month change */}
                <ArrowBack />
              </IconButton>
              <IconButton onClick={() => alert("Next month logic needed")}> {/* TODO: Implement month change */}
                <ArrowForward />
              </IconButton>
              <Button
                variant="contained"
                size="small"
                onClick={() => alert("Today logic needed")} /* TODO: Implement go to today */
                sx={{ ml: 1, bgcolor: "#6f42c1", "&:hover": { bgcolor: "#5e35b1" } }}
              >
                Today
              </Button>
            </Box>

            <Typography variant="h6">{currentMonth}</Typography>

            <Box>
              {["month", "week", "day", "list"].map((mode) => (
                <Button
                  key={mode}
                  variant={calendarView === mode ? "contained" : "outlined"}
                  size="small"
                  onClick={() => setCalendarView(mode)}
                  sx={{ 
                    mx: 0.5, 
                    bgcolor: calendarView === mode ? "#6f42c1" : "transparent",
                    color: calendarView === mode ? "white" : "#6f42c1",
                    borderColor: "#6f42c1",
                    '&:hover': {
                        bgcolor: calendarView === mode ? "#5e35b1" : "rgba(111, 66, 193, 0.08)"
                    }
                  }}
                >
                  {mode.charAt(0).toUpperCase() + mode.slice(1)}
                </Button>
              ))}
            </Box>
          </Box>

         {calendarView === "month" && (
          <TableContainer>
            <Table sx={{ tableLayout: 'fixed' }}>
              <TableHead>
                <TableRow>
                  {calendarDays.map((day) => (
                    <TableCell key={day} align="center" sx={{ fontWeight: "bold", borderBottom: "1px solid #e0e0e0", p: 1 }}>
                      {day}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {calendarGrid.map((week, weekIndex) => (
                  <TableRow key={weekIndex}>
                    {week.map((dayCell, dayIndex) => (
                      <TableCell 
                        key={dayIndex} 
                        align="left" // Align day number to top-left
                        valign="top"
                        sx={{ 
                            height: "100px", 
                            border: "1px solid #e0e0e0",
                            p: 0.5,
                            bgcolor: dayCell.isCurrentMonth ? 'transparent' : '#f9f9f9',
                            color: dayCell.isCurrentMonth ? 'inherit' : 'text.disabled'
                        }}
                      >
                        {dayCell.day}
                        {/* Placeholder for events */}
                        {dayCell.isCurrentMonth && dayCell.day === 15 && ( // Example event
                            <Box sx={{mt:1, p:0.5, bgcolor: 'primary.light', borderRadius: 1, fontSize: '0.75rem'}}>
                                Event A
                            </Box>
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
         )}
         {calendarView !== "month" && (
            <Typography sx={{textAlign: 'center', p: 5}}>
                {calendarView.charAt(0).toUpperCase() + calendarView.slice(1)} view is not implemented yet.
            </Typography>
         )}
        </Paper>
      )}
    </Box>
  );
}

export default Page;