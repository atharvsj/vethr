// import React, { useState } from "react";
// import {
//   Box,
//   Button,
//   TextField,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Grid,
//   MenuItem,
//   Select,
//   InputLabel,
//   FormControl,
// } from "@mui/material";
// import AddIcon from "@mui/icons-material/Add";

// // Sample data for skills (this can be fetched from an API)
// const generateTrainingSkillsData = () => {
//   return [
//     { id: 1, skill: "JavaScript", createdAt: "2024-01-10" },
//     { id: 2, skill: "React", createdAt: "2024-02-15" },
//     { id: 3, skill: "Node.js", createdAt: "2024-03-20" },
//     { id: 4, skill: "Python", createdAt: "2024-04-25" },
//     { id: 5, skill: "Angular", createdAt: "2024-05-30" },
//   ];
// };

// export default function TrainingSkills() {
//   const [skills, setSkills] = useState(generateTrainingSkillsData());
//   const [filteredSkills, setFilteredSkills] = useState(skills);
//   const [openDialog, setOpenDialog] = useState(false);
//   const [newSkill, setNewSkill] = useState("");
//   const [skillCategory, setSkillCategory] = useState(""); // Softskills dropdown
//   const [searchQuery, setSearchQuery] = useState("");
//   const [error, setError] = useState("");

//   // Sample soft skill categories for dropdown
//   const softSkillsOptions = [
//     "Communication",
//     "Teamwork",
//     "Problem Solving",
//     "Time Management",
//     "Leadership",
//     "Adaptability",
//     "Creativity",
//   ];

//   // Handle search input change
//   const handleSearchChange = (e) => {
//     const query = e.target.value.toLowerCase();
//     setSearchQuery(query);

//     // Filter the skills based on the search query
//     const filtered = skills.filter((skill) => {
//       return skill.skill.toLowerCase().includes(query);
//     });
//     setFilteredSkills(filtered);
//   };

//   // Handle dialog open and close
//   const handleDialogOpen = () => {
//     setOpenDialog(true);
//   };

//   const handleDialogClose = () => {
//     setOpenDialog(false);
//     setError(""); // Clear error when dialog closes
//     setSkillCategory(""); // Reset category
//     setNewSkill(""); // Reset skill input
//   };

//   // Handle input changes in the Add New Skill form
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     if (name === "newSkill") {
//       setNewSkill(value);
//     } else if (name === "skillCategory") {
//       setSkillCategory(value);
//     }
//   };

//   // Validate the input fields
//   const validateInput = () => {
//     if (newSkill) {
//       return "Please select a category and enter a skill.";
//     }
//     return null;
//   };

//   // Add the new skill to the list
//   const handleAddSkill = () => {
//     const validationError = validateInput();
//     if (validationError) {
//       setError(validationError);
//       return;
//     }

//     const newSkillData = {
//       id: skills.length + 1,
//       skill: `${newSkill} (${skillCategory})`,
//       createdAt: new Date().toLocaleDateString(),
//     };
//     setSkills([...skills, newSkillData]);
//     setFilteredSkills([...skills, newSkillData]); // Update the filtered list
//     setNewSkill("");
//     setSkillCategory("");
//     setOpenDialog(false);
//   };

//   return (
//     <Box sx={{ p: 3, display: "flex", flexDirection: "column", height: "100vh" }}>
//       <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
//         <h2>Training Skills</h2>
//         <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
//           <TextField
//             label="Search Skills"
//             variant="outlined"
//             value={searchQuery}
//             onChange={handleSearchChange}
//             sx={{ width: 300 }}
//           />
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={handleDialogOpen}
//             startIcon={<AddIcon />}
//           >
//             Add New Skill
//           </Button>
//         </Box>
//       </Box>

//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Training Skill</TableCell>
//               <TableCell>Created At</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {filteredSkills.map((skill) => (
//               <TableRow key={skill.id}>
//                 <TableCell>{skill.skill}</TableCell>
//                 <TableCell>{skill.createdAt}</TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       {/* Add Skill Dialog */}
//       <Dialog open={openDialog} onClose={handleDialogClose}>
//         <DialogTitle>Add New Skill</DialogTitle>
//         <DialogContent>
//           <Grid container spacing={2}>
          
//             <Grid item xs={12}>
//               <FormControl fullWidth>
//                 <InputLabel>Soft Skill Category</InputLabel>
//                 <Select
//                   value={skillCategory}
//                   onChange={handleInputChange}
//                   name="skillCategory"
//                   label="Soft Skill Category"
//                 >
//                   {softSkillsOptions.map((category, index) => (
//                     <MenuItem key={index} value={category}>
//                       {category}
//                     </MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>
//             </Grid>

//             <Grid item xs={12}>
//               <TextField
//                 label="Skill"
//                 fullWidth
//                 name="newSkill"
//                 value={newSkill}
//                 onChange={handleInputChange}
//                 error={Boolean(error && error.includes("skill"))}
//                 helperText={error && error.includes("skill") && error}
//               />
//             </Grid>
//             {/* {error && <Box color="red">{error}</Box>} */}
//           </Grid>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleDialogClose} color="secondary">
//             Cancel
//           </Button>
//           <Button onClick={handleAddSkill} color="primary">
//             Add Skill
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// }



"use client"

import { useState, useEffect } from "react"
import {
  Box,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Card,
  CardContent,
  InputAdornment,
  Tooltip,
  useTheme,
  useMediaQuery,
  Fade,
  Skeleton,
  Alert,
  CircularProgress,
  TablePagination,
  IconButton,
  Chip,
} from "@mui/material"
import {
  Add as AddIcon,
  Search as SearchIcon,
  Refresh as RefreshIcon,
  Close as CloseIcon,
  School as SchoolIcon,
  CalendarToday as CalendarIcon,
  Psychology as SkillIcon,
} from "@mui/icons-material"

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

export default function TrainingSkills() {
  const [skills, setSkills] = useState([])
  const [filteredSkills, setFilteredSkills] = useState([])
  const [openDialog, setOpenDialog] = useState(false)
  const [newSkill, setNewSkill] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [error, setError] = useState("")
  const [dialogError, setDialogError] = useState("")
  const [loading, setLoading] = useState(true)
  const [submitLoading, setSubmitLoading] = useState(false)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [refreshKey, setRefreshKey] = useState(0)

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

  // Fetch skills from API
  const fetchSkills = async () => {
    setLoading(true)
    setError("")
    try {
      const accessToken = localStorage.getItem("accessToken")
      const response = await fetch("https://tdtlworld.com/hrms-backend/api/training-skills/", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })

      if (!response.ok) {
        throw new Error(`Failed to fetch training skills: ${response.statusText} (${response.status})`)
      }

      const data = await response.json()
      const formattedSkills = data.map((skill) => ({
        id: skill.value,
        skill: skill.label,
        createdAt: skill.created_at ? skill.created_at.split(" ")[0] : "N/A", // Format to YYYY-MM-DD
      }))
      setSkills(formattedSkills)
      setFilteredSkills(formattedSkills)
    } catch (error) {
      console.error("Error fetching skills:", error.message)
      setError(error.message || "An unknown error occurred while fetching data.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSkills()
  }, [refreshKey])

  // Filter skills by search query
  useEffect(() => {
    const query = searchQuery.toLowerCase().trim()
    if (query) {
      const filtered = skills.filter((s) => s.skill.toLowerCase().includes(query))
      setFilteredSkills(filtered)
    } else {
      setFilteredSkills(skills)
    }
    setPage(0) // Reset to first page when filtering
  }, [searchQuery, skills])

  const handleRefresh = () => {
    setRefreshKey((prevKey) => prevKey + 1)
  }

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
  }

  const handleDialogOpen = () => {
    setNewSkill("")
    setDialogError("")
    setOpenDialog(true)
  }

  const handleDialogClose = () => {
    setOpenDialog(false)
    setDialogError("")
    setNewSkill("")
  }

  const handleNewSkillInputChange = (e) => {
    setNewSkill(e.target.value)
    if (dialogError) {
      setDialogError("")
    }
  }

  const validateInput = () => {
    if (!newSkill.trim()) {
      return "Please enter a skill name."
    }
    if (skills.some((s) => s.skill.toLowerCase() === newSkill.trim().toLowerCase())) {
      return "This skill already exists."
    }
    return ""
  }

  const handleAddSkill = async () => {
    const validationError = validateInput()
    if (validationError) {
      setDialogError(validationError)
      return
    }

    setSubmitLoading(true)
    setDialogError("")

    try {
      const accessToken = localStorage.getItem("accessToken")
      const response = await fetch("https://tdtlworld.com/hrms-backend/api/training-skills/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          category_name: newSkill.trim(),
        }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: `HTTP error! Status: ${response.status}` }))
        const apiMessage = errorData?.message || "Failed to add skill."
        throw new Error(apiMessage)
      }

      // Refresh skill list after successful add
      await fetchSkills()
      setNewSkill("")
      setDialogError("")
      setOpenDialog(false)
    } catch (err) {
      console.error("Add skill failed:", err.message)
      setDialogError(err.message || "Something went wrong")
    } finally {
      setSubmitLoading(false)
    }
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(Number.parseInt(event.target.value, 10))
    setPage(0)
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
            Training Skills
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage and configure available training skills and competencies
          </Typography>
        </CardContent>
      </Card>

      {error && (
        <Alert
          severity="error"
          sx={{
            marginBottom: 2,
            borderRadius: 2,
            boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
          }}
          onClose={() => setError("")}
        >
          {error}
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
          placeholder="Search training skills..."
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
            onClick={handleDialogOpen}
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
            Add New Skill
          </Button>
        </Box>
      </Box>

      {/* Stats */}
      <Box
        sx={{
          display: "flex",
          gap: 2,
          mb: 3,
          flexWrap: "wrap",
          p: 2,
          borderRadius: 2,
          bgcolor: "rgba(36, 73, 239, 0.02)",
          border: "1px solid rgba(36, 73, 239, 0.1)",
        }}
      >
        <Typography variant="body2" color="text.secondary" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <SkillIcon fontSize="small" />
          Total Skills: {skills.length}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <SearchIcon fontSize="small" />
          Filtered: {filteredSkills.length}
        </Typography>
      </Box>

      {loading ? (
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
                  <TableCell sx={{ fontWeight: "bold" }}>
                    <Skeleton variant="text" width="100%" />
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    <Skeleton variant="text" width="100%" />
                  </TableCell>
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
      ) : !error && skills.length === 0 && !searchQuery ? (
        <Paper
          sx={{
            padding: 4,
            textAlign: "center",
            borderRadius: 3,
            backgroundColor: "rgba(0,0,0,0.02)",
            border: "1px dashed rgba(0,0,0,0.1)",
          }}
        >
          <SkillIcon sx={{ fontSize: 60, color: "text.secondary", opacity: 0.5, mb: 2 }} />
          <Typography variant="h6" color="text.secondary">
            No training skills available at the moment.
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Click "Add New Skill" to create your first training skill.
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
            <Table stickyHeader aria-label="training skills table">
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
                  <TableCell sx={{ fontWeight: "bold" }}>Training Skill</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Created At</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredSkills.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={2} align="center" sx={{ py: 4 }}>
                      <Typography variant="body1" color="text.secondary">
                        {searchQuery ? "No training skills match your search." : "No training skills found."}
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
                ) : (
                  filteredSkills.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((skill) => (
                    <TableRow
                      key={skill.id}
                      hover
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
                          <SchoolIcon sx={{ mr: 1, color: "rgba(36, 73, 239, 0.7)", fontSize: 20 }} />
                          <Chip
                            label={skill.skill}
                            color="primary"
                            size="medium"
                            sx={{
                              fontWeight: 500,
                              borderRadius: 1.5,
                              bgcolor: "rgba(36, 73, 239, 0.1)",
                              color: "rgba(36, 73, 239, 0.89)",
                              border: "1px solid rgba(36, 73, 239, 0.2)",
                            }}
                          />
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <CalendarIcon sx={{ mr: 1, color: "text.secondary", fontSize: 18 }} />
                          <Typography variant="body2">
                            {skill.createdAt !== "N/A" ? new Date(skill.createdAt).toLocaleDateString() : "N/A"}
                          </Typography>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {filteredSkills.length > 0 && (
            <TablePagination
              rowsPerPageOptions={[5, 10, 15, 25]}
              component="div"
              count={filteredSkills.length}
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

      {/* Add Skill Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleDialogClose}
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
            <SkillIcon />
            Add New Training Skill
          </Box>
          <IconButton onClick={handleDialogClose} sx={{ color: "white" }}>
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
            label="Training Skill Name"
            fullWidth
            variant="outlined"
            value={newSkill}
            onChange={handleNewSkillInputChange}
            placeholder="e.g., React Development, Project Management, Data Analysis..."
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
                  <SchoolIcon color="action" />
                </InputAdornment>
              ),
            }}
          />
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Enter a unique training skill that can be assigned to training sessions and employee development programs.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2, borderTop: "1px solid rgba(0,0,0,0.08)" }}>
          <Button
            onClick={handleDialogClose}
            sx={{
              color: "text.secondary",
              borderRadius: 2,
              px: 3,
            }}
            disabled={submitLoading}
          >
            Cancel
          </Button>
          <Button
            onClick={handleAddSkill}
            variant="contained"
            disabled={submitLoading}
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
            {submitLoading ? <CircularProgress size={24} color="inherit" /> : "Add Skill"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
