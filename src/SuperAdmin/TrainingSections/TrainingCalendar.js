// src/SuperAdmin/TrainingSections/TrainingCalendar.js

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
  Grid,
  Typography,
  Card,
  CardContent,
  InputAdornment,
  Tooltip,
  useTheme,
  useMediaQuery,
  Fade,
  Alert,
  CircularProgress,
  IconButton,
  Chip,
  Paper,
} from "@mui/material"
import {
  Add as AddIcon,
  Search as SearchIcon,
  Refresh as RefreshIcon,
  Close as CloseIcon,
  Schedule as ScheduleIcon,
  Event as EventIcon,
  Description as DescriptionIcon,
  AccessTime as TimeIcon,
  School as SchoolIcon,
} from "@mui/icons-material"
import { Calendar, momentLocalizer } from "react-big-calendar"
import moment from "moment"
import "react-big-calendar/lib/css/react-big-calendar.css"

// Sample training sessions data
const generateTrainingSessions = () => {
  return [
    {
      id: 1,
      title: "React Development Fundamentals",
      start: new Date(2024, 11, 10, 9, 0),
      end: new Date(2024, 11, 10, 17, 0),
      description: "Comprehensive React training covering components, hooks, and state management",
      trainer: "John Smith",
      participants: 15,
      status: "confirmed",
    },
    {
      id: 2,
      title: "Node.js Backend Workshop",
      start: new Date(2024, 11, 15, 10, 0),
      end: new Date(2024, 11, 15, 16, 0),
      description: "Advanced Node.js workshop for backend developers covering APIs and databases",
      trainer: "Sarah Johnson",
      participants: 12,
      status: "confirmed",
    },
    {
      id: 3,
      title: "UI/UX Design Principles",
      start: new Date(2024, 11, 20, 14, 0),
      end: new Date(2024, 11, 20, 18, 0),
      description: "Design thinking and user experience best practices",
      trainer: "Mike Davis",
      participants: 8,
      status: "pending",
    },
    {
      id: 4,
      title: "Agile Project Management",
      start: new Date(2024, 11, 25, 9, 0),
      end: new Date(2024, 11, 25, 13, 0),
      description: "Scrum methodology and agile practices for project managers",
      trainer: "Lisa Chen",
      participants: 20,
      status: "confirmed",
    },
  ]
}

const localizer = momentLocalizer(moment)

export default function TrainingCalendar() {
  const [sessions, setSessions] = useState(generateTrainingSessions())
  const [filteredSessions, setFilteredSessions] = useState(sessions)
  const [openDialog, setOpenDialog] = useState(false)
  const [newSession, setNewSession] = useState({
    title: "",
    start: "",
    end: "",
    description: "",
    trainer: "",
    participants: "",
  })
  const [searchQuery, setSearchQuery] = useState("")
  const [error, setError] = useState("")
  const [dialogError, setDialogError] = useState("")
  const [submitLoading, setSubmitLoading] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

  useEffect(() => {
    // Filter the sessions based on the search query
    const query = searchQuery.toLowerCase()
    const filtered = sessions.filter((session) => {
      return (
        session.title.toLowerCase().includes(query) ||
        session.trainer?.toLowerCase().includes(query) ||
        session.description.toLowerCase().includes(query)
      )
    })
    setFilteredSessions(filtered)
  }, [searchQuery, sessions])

  const handleRefresh = () => {
    setRefreshKey((prevKey) => prevKey + 1)
    // In a real app, this would refetch data from the API
    setSessions(generateTrainingSessions())
  }

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
  }

  const handleDialogOpen = () => {
    setNewSession({
      title: "",
      start: "",
      end: "",
      description: "",
      trainer: "",
      participants: "",
    })
    setDialogError("")
    setOpenDialog(true)
  }

  const handleDialogClose = () => {
    setOpenDialog(false)
    setDialogError("")
    setNewSession({
      title: "",
      start: "",
      end: "",
      description: "",
      trainer: "",
      participants: "",
    })
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewSession((prevState) => ({
      ...prevState,
      [name]: value,
    }))
    if (dialogError) setDialogError("")
  }

  const validateInput = () => {
    const { title, start, end, description, trainer } = newSession
    if (!title.trim()) {
      return "Session title is required."
    }
    if (!start) {
      return "Start time is required."
    }
    if (!end) {
      return "End time is required."
    }
    if (!description.trim()) {
      return "Description is required."
    }
    if (!trainer.trim()) {
      return "Trainer name is required."
    }
    if (new Date(start) >= new Date(end)) {
      return "Start time must be before end time."
    }
    if (new Date(start) < new Date()) {
      return "Start time cannot be in the past."
    }
    return null
  }

  const handleAddSession = async () => {
    const validationError = validateInput()
    if (validationError) {
      setDialogError(validationError)
      return
    }

    setSubmitLoading(true)
    setDialogError("")

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const newSessionData = {
        id: sessions.length + 1,
        title: newSession.title,
        start: new Date(newSession.start),
        end: new Date(newSession.end),
        description: newSession.description,
        trainer: newSession.trainer,
        participants: Number.parseInt(newSession.participants) || 0,
        status: "pending",
      }

      setSessions([...sessions, newSessionData])
      setOpenDialog(false)
    } catch (error) {
      setDialogError("Failed to add training session. Please try again.")
    } finally {
      setSubmitLoading(false)
    }
  }

  const handleSelectEvent = (event) => {
    // Handle event selection - could open a detail view
    console.log("Selected event:", event)
  }

  const eventStyleGetter = (event) => {
    let backgroundColor = "#2449ef"
    let borderColor = "#1a365d"

    if (event.status === "pending") {
      backgroundColor = "#ed8936"
      borderColor = "#c05621"
    } else if (event.status === "cancelled") {
      backgroundColor = "#e53e3e"
      borderColor = "#c53030"
    }

    return {
      style: {
        backgroundColor,
        borderColor,
        color: "white",
        border: "none",
        borderRadius: "4px",
        fontSize: "12px",
        padding: "2px 4px",
      },
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "success"
      case "pending":
        return "warning"
      case "cancelled":
        return "error"
      default:
        return "default"
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
            Training Calendar
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Schedule and manage training sessions with an interactive calendar view
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
          placeholder="Search sessions by title, trainer, or description..."
        />
        <Box sx={{ display: "flex", gap: 2 }}>
          <Tooltip title="Refresh Calendar">
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
            Add New Session
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
          <EventIcon fontSize="small" />
          Total Sessions: {sessions.length}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <SearchIcon fontSize="small" />
          Filtered: {filteredSessions.length}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <SchoolIcon fontSize="small" />
          This Month: {sessions.filter((s) => moment(s.start).isSame(moment(), "month")).length}
        </Typography>
      </Box>

      {/* Legend */}
      <Box
        sx={{
          display: "flex",
          gap: 2,
          mb: 3,
          flexWrap: "wrap",
          p: 2,
          borderRadius: 2,
          bgcolor: "rgba(0, 0, 0, 0.02)",
          border: "1px solid rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography variant="body2" color="text.secondary" sx={{ mr: 2 }}>
          Status Legend:
        </Typography>
        <Chip label="Confirmed" color="success" size="small" />
        <Chip label="Pending" color="warning" size="small" />
        <Chip label="Cancelled" color="error" size="small" />
      </Box>

      {/* Calendar */}
      <Paper
        sx={{
          borderRadius: 3,
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
          overflow: "hidden",
          "& .rbc-calendar": {
            fontFamily: theme.typography.fontFamily,
          },
          "& .rbc-header": {
            backgroundColor: "#f5f5f7",
            borderBottom: "2px solid rgba(36, 73, 239, 0.1)",
            fontWeight: "bold",
            color: "#333",
            padding: "12px 8px",
          },
          "& .rbc-today": {
            backgroundColor: "rgba(36, 73, 239, 0.05)",
          },
          "& .rbc-event": {
            borderRadius: "4px",
            border: "none",
            fontSize: "12px",
            fontWeight: 500,
          },
          "& .rbc-toolbar": {
            padding: "16px",
            backgroundColor: "#f8f9fa",
            borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
          },
          "& .rbc-toolbar button": {
            borderRadius: "8px",
            border: "1px solid rgba(36, 73, 239, 0.2)",
            backgroundColor: "white",
            color: "rgba(36, 73, 239, 0.89)",
            fontWeight: 500,
            "&:hover": {
              backgroundColor: "rgba(36, 73, 239, 0.1)",
            },
            "&.rbc-active": {
              backgroundColor: "rgba(36, 73, 239, 0.89)",
              color: "white",
            },
          },
        }}
      >
        <Calendar
          localizer={localizer}
          events={filteredSessions}
          startAccessor="start"
          endAccessor="end"
          style={{ height: "calc(100vh - 400px)", minHeight: "500px" }}
          onSelectEvent={handleSelectEvent}
          eventPropGetter={eventStyleGetter}
          views={["month", "week", "day", "agenda"]}
          defaultView="month"
          popup
          tooltipAccessor={(event) => `${event.title} - ${event.trainer}`}
        />
      </Paper>

      {/* Add Session Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleDialogClose}
        maxWidth="md"
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
            <EventIcon />
            Add New Training Session
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

          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                label="Session Title"
                fullWidth
                name="title"
                value={newSession.title}
                onChange={handleInputChange}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EventIcon color="action" />
                    </InputAdornment>
                  ),
                }}
                placeholder="e.g., React Development Fundamentals"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Start Time"
                fullWidth
                name="start"
                type="datetime-local"
                value={newSession.start}
                onChange={handleInputChange}
                InputLabelProps={{ shrink: true }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <ScheduleIcon color="action" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="End Time"
                fullWidth
                name="end"
                type="datetime-local"
                value={newSession.end}
                onChange={handleInputChange}
                InputLabelProps={{ shrink: true }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <TimeIcon color="action" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Trainer Name"
                fullWidth
                name="trainer"
                value={newSession.trainer}
                onChange={handleInputChange}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SchoolIcon color="action" />
                    </InputAdornment>
                  ),
                }}
                placeholder="e.g., John Smith"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Expected Participants"
                fullWidth
                name="participants"
                type="number"
                value={newSession.participants}
                onChange={handleInputChange}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                  },
                }}
                inputProps={{ min: 1, max: 100 }}
                placeholder="e.g., 15"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Description"
                fullWidth
                name="description"
                value={newSession.description}
                onChange={handleInputChange}
                multiline
                rows={3}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <DescriptionIcon color="action" />
                    </InputAdornment>
                  ),
                }}
                placeholder="Provide a detailed description of the training session..."
              />
            </Grid>
          </Grid>
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
            onClick={handleAddSession}
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
            {submitLoading ? <CircularProgress size={24} color="inherit" /> : "Add Session"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
