"use client"

import { useState, useEffect } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TextField,
  Button,
  Box,
  Paper,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  CircularProgress,
  Alert,
  IconButton,
  Card,
  CardContent,
  InputAdornment,
  Tooltip,
  useTheme,
  useMediaQuery,
  Fade,
  Skeleton,
} from "@mui/material"
import {
  Add as AddIcon,
  Search as SearchIcon,
  Refresh as RefreshIcon,
  Close as CloseIcon,
  Category as CategoryIcon,
  CalendarToday as CalendarIcon,
} from "@mui/icons-material"

const API_URL = "https://tdtlworld.com/hrms-backend/api/case-types/"

// Skeleton component for table rows
const TableRowSkeleton = () => (
  <TableRow>
    <TableCell>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Skeleton variant="circular" width={20} height={20} sx={{ mr: 1 }} />
        <Skeleton variant="text" width={150} />
      </Box>
    </TableCell>
    <TableCell>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Skeleton variant="circular" width={18} height={18} sx={{ mr: 1 }} />
        <Skeleton variant="text" width={100} />
      </Box>
    </TableCell>
  </TableRow>
)

export default function CaseType() {
  const [caseTypes, setCaseTypes] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [showDialog, setShowDialog] = useState(false)
  const [newCaseType, setNewCaseType] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const [dialogError, setDialogError] = useState(null)
  const [refreshKey, setRefreshKey] = useState(0)

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

  // Fetch case types from API
  const fetchCaseTypes = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch(API_URL)
      if (!response.ok) {
        throw new Error(`Failed to fetch case types: ${response.statusText} (${response.status})`)
      }
      const data = await response.json()
      // Transform API data to match the expected structure for the table
      const transformedData = data.map((item) => ({
        id: item.value, // API uses 'value' for id
        type: item.label, // API uses 'label' for type
        createdAt: item.created_at ? new Date(item.created_at).toISOString().split("T")[0] : "N/A", // Format date
      }))
      setCaseTypes(transformedData)
    } catch (e) {
      console.error("Failed to fetch case types:", e)
      setError(e.message || "An unknown error occurred while fetching data.")
      setCaseTypes([])
    } finally {
      setIsLoading(false)
    }
  }

  // Fetch data on component mount
  useEffect(() => {
    fetchCaseTypes()
  }, [refreshKey])

  // Filter case types based on the search query
  const filteredCaseTypes = caseTypes.filter((row) => {
    const searchTerm = searchQuery.toLowerCase()
    return row.type && row.type.toLowerCase().includes(searchTerm)
  })

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value)
    setPage(0) // Reset to first page on search
  }

  // Handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(Number.parseInt(event.target.value, 10))
    setPage(0)
  }

  // Handle opening the add new case type dialog
  const handleAddNewCaseType = () => {
    setNewCaseType("") // Clear previous input
    setDialogError(null) // Clear previous errors
    setShowDialog(true)
  }

  // Handle dialog close
  const handleCloseDialog = () => {
    setShowDialog(false)
  }

  // Handle new case type input change in the dialog
  const handleInputChange = (e) => {
    setNewCaseType(e.target.value)
    if (dialogError) setDialogError(null)
  }

  const handleRefresh = () => {
    setRefreshKey((prevKey) => prevKey + 1)
  }

  // Handle saving new case type via API
  const handleSaveCaseType = async () => {
    if (!newCaseType.trim()) {
      setDialogError("Case type name cannot be empty.")
      return
    }

    setDialogError(null)
    setIsSubmitting(true)

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ category_name: newCaseType }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: `HTTP error! Status: ${response.status}` }))
        const errorMessage = errorData.message || `Failed to add case type. Status: ${response.status}`
        throw new Error(errorMessage)
      }

      handleCloseDialog()
      fetchCaseTypes() // Refetch the list to get the updated data
      setNewCaseType("") // Reset the input field
    } catch (e) {
      console.error("Failed to save case type:", e)
      setDialogError(e.message || "An unknown error occurred while saving the case type.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Box sx={{ px: { xs: 2, sm: 3 }, pb: { xs: 2, sm: 3 } }}>
      <Card
        elevation={3}
        sx={{
          mb: 4,
          borderRadius: 2,
          background: "linear-gradient(135deg, rgba(36, 73, 239, 0.05) 0%, rgba(218, 18, 202, 0.05) 100%)",
          borderLeft: "4px solid",
          borderImage: "linear-gradient(135deg, rgba(36, 73, 239, 0.89) 0%, rgb(218, 18, 202) 100%) 1",
        }}
      >
        <CardContent>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: "#333" }}>
            Case Types
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage and configure case types for disciplinary actions
          </Typography>
        </CardContent>
      </Card>

      {error && !isLoading && (
        <Alert
          severity="error"
          sx={{
            marginBottom: 2,
            borderRadius: 2,
            boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
          }}
        >
          {`Error loading data: ${error}`}
        </Alert>
      )}

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 3,
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <TextField
          variant="outlined"
          value={searchQuery}
          onChange={handleSearchChange}
          sx={{
            width: { xs: "100%", sm: "auto" },
            flexGrow: { sm: 1 },
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgba(36, 73, 239, 0.5)",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgba(218, 18, 202, 0.7)",
              },
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
          }}
          placeholder="Search case types..."
        />
        <Box sx={{ display: "flex", gap: 2 }}>
          <Tooltip title="Refresh Data">
            <IconButton
              onClick={handleRefresh}
              color="primary"
              sx={{
                border: "1px solid rgba(0, 0, 0, 0.12)",
                borderRadius: 2,
                "&:hover": {
                  backgroundColor: "rgba(36, 73, 239, 0.04)",
                },
              }}
            >
              <RefreshIcon />
            </IconButton>
          </Tooltip>
          <Button
            variant="contained"
            onClick={handleAddNewCaseType}
            startIcon={<AddIcon />}
            sx={{
              background: "linear-gradient(135deg, rgba(36, 73, 239, 0.89) 0%, rgb(218, 18, 202) 100%)",
              color: "white",
              borderRadius: 2,
              padding: "10px 24px",
              fontWeight: 600,
              boxShadow: "0 4px 10px rgba(36, 73, 239, 0.3)",
              transition: "all 0.3s ease",
              "&:hover": {
                boxShadow: "0 6px 15px rgba(36, 73, 239, 0.4)",
                transform: "translateY(-2px)",
              },
              width: { xs: "100%", sm: "auto" },
            }}
          >
            Add New Case Type
          </Button>
        </Box>
      </Box>

      {/* Dialog for Add New Case Type Form */}
      <Dialog
        open={showDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
            overflow: "hidden",
          },
        }}
        TransitionComponent={Fade}
        transitionDuration={400}
      >
        <DialogTitle
          sx={{
            background: "linear-gradient(135deg, rgba(36, 73, 239, 0.89) 0%, rgb(218, 18, 202) 100%)",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            py: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <CategoryIcon />
            Add New Case Type
          </Box>
          <IconButton onClick={handleCloseDialog} sx={{ color: "white" }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ pt: 3, pb: 2 }}>
          {dialogError && (
            <Alert
              severity="error"
              sx={{
                marginBottom: 3,
                borderRadius: 2,
              }}
            >
              {dialogError}
            </Alert>
          )}
          <TextField
            autoFocus
            margin="dense"
            label="Case Type Name"
            type="text"
            fullWidth
            variant="outlined"
            value={newCaseType}
            onChange={handleInputChange}
            sx={{
              marginBottom: 2,
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(36, 73, 239, 0.5)",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(218, 18, 202, 0.7)",
                },
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CategoryIcon color="action" />
                </InputAdornment>
              ),
            }}
            placeholder="Enter case type name..."
          />
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2, borderTop: "1px solid rgba(0,0,0,0.08)" }}>
          <Button
            onClick={handleCloseDialog}
            sx={{
              color: "text.secondary",
              borderRadius: 2,
              px: 3,
            }}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSaveCaseType}
            variant="contained"
            disabled={isSubmitting}
            sx={{
              background: "linear-gradient(135deg, rgba(36, 73, 239, 0.89) 0%, rgb(218, 18, 202) 100%)",
              color: "white",
              borderRadius: 2,
              px: 3,
              "&:hover": {
                boxShadow: "0 4px 12px rgba(36, 73, 239, 0.3)",
              },
            }}
          >
            {isSubmitting ? <CircularProgress size={24} color="inherit" /> : "Save Case Type"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Table with Paginated Data */}
      {isLoading ? (
        <Paper
          sx={{
            width: "100%",
            overflow: "hidden",
            borderRadius: 3,
            boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
          }}
        >
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow
                  sx={{
                    "& th": {
                      backgroundColor: "#f5f5f7",
                      borderBottom: "2px solid rgba(36, 73, 239, 0.1)",
                      fontWeight: "bold",
                      color: "#333",
                    },
                  }}
                >
                  <TableCell sx={{ fontWeight: "bold" }}>Case Type</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Created At</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Array.from(new Array(5)).map((_, index) => (
                  <TableRowSkeleton key={index} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      ) : !error && caseTypes.length === 0 && !searchQuery ? (
        <Paper
          sx={{
            padding: 4,
            textAlign: "center",
            borderRadius: 3,
            backgroundColor: "rgba(0,0,0,0.02)",
            border: "1px dashed rgba(0,0,0,0.1)",
          }}
        >
          <CategoryIcon sx={{ fontSize: 60, color: "text.secondary", opacity: 0.5, mb: 2 }} />
          <Typography variant="h6" color="text.secondary">
            No case types available at the moment.
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Click "Add New Case Type" to create your first case type.
          </Typography>
        </Paper>
      ) : (
        <Paper
          sx={{
            width: "100%",
            overflow: "hidden",
            borderRadius: 3,
            boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
          }}
        >
          <TableContainer sx={{ maxHeight: "calc(100vh - 350px)", overflow: "auto" }}>
            <Table stickyHeader aria-label="case types table">
              <TableHead>
                <TableRow
                  sx={{
                    "& th": {
                      backgroundColor: "#f5f5f7",
                      borderBottom: "2px solid rgba(36, 73, 239, 0.1)",
                      fontWeight: "bold",
                      color: "#333",
                    },
                  }}
                >
                  <TableCell sx={{ fontWeight: "bold" }}>Case Type</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Created At</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredCaseTypes.length > 0 ? (
                  filteredCaseTypes.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                    <TableRow
                      hover
                      key={row.id}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                        transition: "background-color 0.2s",
                        "&:hover": {
                          backgroundColor: "rgba(36, 73, 239, 0.04)",
                        },
                        cursor: "pointer",
                      }}
                    >
                      <TableCell>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <CategoryIcon sx={{ mr: 1, color: "rgba(36, 73, 239, 0.7)", fontSize: 20 }} />
                          <Typography variant="body2">{row.type}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <CalendarIcon sx={{ mr: 1, color: "text.secondary", fontSize: 18 }} />
                          <Typography variant="body2">
                            {row.createdAt !== "N/A" ? new Date(row.createdAt).toLocaleDateString() : "N/A"}
                          </Typography>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={2} align="center" sx={{ py: 4 }}>
                      <Typography variant="body1" color="text.secondary">
                        {searchQuery
                          ? "No case types match your search."
                          : error
                            ? "Error loading data."
                            : "No case types found."}
                      </Typography>
                      {searchQuery && (
                        <Button
                          variant="text"
                          onClick={() => setSearchQuery("")}
                          sx={{ mt: 1, color: "rgba(36, 73, 239, 0.89)" }}
                        >
                          Clear Search
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {filteredCaseTypes.length > 0 && (
            <TablePagination
              rowsPerPageOptions={[5, 10, 15, 25]}
              component="div"
              count={filteredCaseTypes.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              sx={{
                borderTop: "1px solid rgba(0,0,0,0.08)",
                "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows": {
                  margin: 0,
                },
              }}
            />
          )}
        </Paper>
      )}
    </Box>
  )
}


// import React, { useState, useEffect } from 'react';
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TablePagination,
//   TextField,
//   Button,
//   Box,
//   Paper,
//   Typography,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   CircularProgress, // For loading indicator
//   Alert, // For error messages
// } from '@mui/material';

// const API_URL = "https://tdtlworld.com/hrms-backend/api/case-types/";

// export default function CaseType() {
//   const [caseTypes, setCaseTypes] = useState([]);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [showDialog, setShowDialog] = useState(false);
//   const [newCaseType, setNewCaseType] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // Fetch case types from API
//   const fetchCaseTypes = async () => {
//     setIsLoading(true);
//     setError(null);
//     try {
//       const response = await fetch(API_URL);
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
//       const data = await response.json();
//       // Transform API data to match the expected structure for the table
//       const transformedData = data.map(item => ({
//         id: item.value, // API uses 'value' for id
//         type: item.label, // API uses 'label' for type
//         createdAt: item.created_at ? new Date(item.created_at).toISOString().split('T')[0] : 'N/A', // Format date
//       }));
//       setCaseTypes(transformedData);
//     } catch (e) {
//       setError(e.message);
//       console.error("Failed to fetch case types:", e);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Fetch data on component mount
//   useEffect(() => {
//     fetchCaseTypes();
//   }, []);

//   // Filter case types based on the search query
//   const filteredCaseTypes = caseTypes.filter((row) => {
//     return row.type.toLowerCase().includes(searchQuery.toLowerCase());
//   });

//   // Handle search input change
//   const handleSearchChange = (event) => {
//     setSearchQuery(event.target.value);
//     setPage(0); // Reset to first page on search
//   };

//   // Handle page change
//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   // Handle rows per page change
//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   // Handle opening the add new case type dialog
//   const handleAddNewCaseType = () => {
//     setNewCaseType(''); // Clear previous input
//     setError(null); // Clear previous errors
//     setShowDialog(true);
//   };

//   // Handle dialog close
//   const handleCloseDialog = () => {
//     setShowDialog(false);
//   };

//   // Handle new case type input change in the dialog
//   const handleInputChange = (e) => {
//     setNewCaseType(e.target.value);
//   };

//   // Handle saving new case type via API
//   const handleSaveCaseType = async () => {
//     if (newCaseType.trim()) {
//       setIsLoading(true); // Show loading indicator on button or dialog if needed
//       setError(null);
//       try {
//         const response = await fetch(API_URL, {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//             // Add any other headers like Authorization if required
//           },
//           body: JSON.stringify({ category_name: newCaseType }),
//         });

//         if (!response.ok) {
//           const errorData = await response.json();
//           throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
//         }
        
//         // const savedCaseType = await response.json(); // Assuming API returns the saved item

//         // Refetch the list to get the updated data including the new item
//         await fetchCaseTypes(); 
        
//         handleCloseDialog();
//         setNewCaseType(''); // Reset the input field
//       } catch (e) {
//         setError(e.message); // Display error in the dialog or as a general alert
//         console.error("Failed to save case type:", e);
//       } finally {
//         setIsLoading(false); // Hide loading indicator
//       }
//     } else {
//       setError("Case type name cannot be empty."); // Simple validation
//     }
//   };

//   return (
//     <Box sx={{ padding: 3 }}>
//       <Typography variant="h4" gutterBottom>
//         Case Types
//       </Typography>

//       {/* Search Bar */}
//       <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2, flexWrap: 'wrap' }}>
//         <Button variant="contained" color="primary" onClick={handleAddNewCaseType} sx={{ marginBottom: { xs: 2, sm: 0 } }}>
//           Add New Case Type
//         </Button>
//         <TextField
//           label="Search Case Types"
//           variant="outlined"
//           value={searchQuery}
//           onChange={handleSearchChange}
//           sx={{ width: { xs: '100%', sm: '50%', md: '30%' } }}
//         />
//       </Box>

//       {/* Display general error messages */}
//       {error && !showDialog && ( // Show general errors when dialog is not open
//         <Alert severity="error" sx={{ marginBottom: 2 }}>
//           {error}
//         </Alert>
//       )}

//       {/* Dialog for Add New Case Type Form */}
//       <Dialog open={showDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
//         <DialogTitle>Add New Case Type</DialogTitle>
//         <DialogContent>
//           {/* Display error messages inside dialog */}
//           {error && showDialog && (
//             <Alert severity="error" sx={{ marginBottom: 2 }}>
//               {error}
//             </Alert>
//           )}
//           <TextField
//             autoFocus
//             margin="dense"
//             label="Case Type Name"
//             type="text"
//             fullWidth
//             variant="outlined"
//             value={newCaseType}
//             onChange={handleInputChange}
//             sx={{ marginBottom: 2 }}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseDialog} color="secondary">
//             Cancel
//           </Button>
//           <Button onClick={handleSaveCaseType} color="primary" disabled={isLoading}>
//             {isLoading ? <CircularProgress size={24} /> : 'Save'}
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* Table with Paginated Data */}
//       {isLoading && caseTypes.length === 0 ? ( // Show loading indicator only on initial load
//         <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 200 }}>
//           <CircularProgress />
//         </Box>
//       ) : !isLoading && error && caseTypes.length === 0 ? ( // Show error if initial fetch failed
//         <Alert severity="error">Failed to load case types: {error}</Alert>
//       ) : (
//         <Paper sx={{ width: '100%', overflow: 'hidden' }}>
//           <TableContainer sx={{ maxHeight: 500 }}>
//             <Table stickyHeader aria-label="sticky table">
//               <TableHead>
//                 <TableRow>
//                   <TableCell sx={{ fontWeight: 'bold' }}>Case Type</TableCell>
//                   <TableCell sx={{ fontWeight: 'bold' }}>Created At</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {filteredCaseTypes.length > 0 ? (
//                   filteredCaseTypes
//                     .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                     .map((row) => (
//                       <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
//                         <TableCell>{row.type}</TableCell>
//                         <TableCell>{row.createdAt}</TableCell>
//                       </TableRow>
//                     ))
//                 ) : (
//                   <TableRow>
//                     <TableCell colSpan={2} align="center">
//                       No case types found.
//                     </TableCell>
//                   </TableRow>
//                 )}
//               </TableBody>
//             </Table>
//           </TableContainer>

//           {/* Pagination */}
//           <TablePagination
//             rowsPerPageOptions={[10, 25, 50, 100]}
//             component="div"
//             count={filteredCaseTypes.length}
//             rowsPerPage={rowsPerPage}
//             page={page}
//             onPageChange={handleChangePage}
//             onRowsPerPageChange={handleChangeRowsPerPage}
//           />
//         </Paper>
//       )}
//     </Box>
//   );
// }