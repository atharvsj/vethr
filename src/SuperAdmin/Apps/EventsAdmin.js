// import React, { useState, useEffect } from "react";
// import {
//   ThemeProvider,
//   createTheme,
//   Box,
//   Paper,
//   Typography,
//   Button,
//   IconButton,
//   TextField,
//   Select,
//   MenuItem,
//   FormControl,
//   InputLabel,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Grid,
//   CssBaseline,
//   InputAdornment,
//   Popover,
//   Tooltip,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Snackbar,
//   Alert,
//   Chip,
//   Card,
//   CardContent,
//   Fade,
//   Zoom,
//   useMediaQuery,
// } from "@mui/material";
// import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
// import {
//   CalendarToday as CalendarTodayIcon,
//   Event as EventIcon,
//   ArrowBack as ArrowBackIcon,
//   ArrowForward as ArrowForwardIcon,
//   AccessTime as AccessTimeIcon,
//   Search as SearchIcon,
//   ArrowUpward as ArrowUpwardIcon,
//   ArrowDownward as ArrowDownwardIcon,
//   Edit as EditIcon,
//   Delete as DeleteIcon,
//   Lock as LockIcon,
//   Person as PersonIcon,
//   Schedule as ScheduleIcon,
//   Today as TodayIcon,
// } from "@mui/icons-material";
// import axios from "axios";

// // Create theme
// const theme = createTheme({
//   palette: {
//     primary: {
//       main: "#7267EF",
//     },
//     secondary: {
//       main: "#f50057",
//     },
//     background: {
//       default: "#f5f5f9",
//     },
//   },
//   components: {
//     MuiTableCell: {
//       styleOverrides: {
//         root: {
//           padding: "8px 16px",
//         },
//       },
//     },
//     MuiButton: {
//       styleOverrides: {
//         root: {
//           textTransform: "none",
//           borderRadius: "8px",
//         },
//       },
//     },
//     MuiPaper: {
//       styleOverrides: {
//         root: {
//           borderRadius: "12px",
//         },
//       },
//     },
//   },
// });

// function EventsAdmin() {
//   // State for active view
//   const [activeView, setActiveView] = useState("events"); // 'events' or 'calendar'
//   const [calendarViewType, setCalendarViewType] = useState("month"); // 'month', 'week', 'day', 'list'

//   const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Detects if screen is 'sm' or smaller

//   // Authentication state
//   const [authToken, setAuthToken] = useState("");
//   const [userRole, setUserRole] = useState("");
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   // Employees data - populated only from API
//   const [employeesList, setEmployeesList] = useState([]);
//   const [loadingEmployees, setLoadingEmployees] = useState(false);

//   // State for events
//   const [events, setEvents] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // State for new event form
//   const [newEvent, setNewEvent] = useState({
//     event_title: "",
//     employee_id: "",
//     event_date: "",
//     event_time: "",
//     event_color: "#7267EF",
//     event_note: "",
//   });

//   // State for editing event
//   const [editingEvent, setEditingEvent] = useState(null);
//   const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

//   // State for delete confirmation
//   const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
//   const [eventToDelete, setEventToDelete] = useState(null);

//   // State for notifications
//   const [notification, setNotification] = useState({
//     open: false,
//     message: "",
//     severity: "success",
//   });

//   // State for calendar
//   const [currentDate, setCurrentDate] = useState(new Date());
//   const [calendarDays, setCalendarDays] = useState([]);

//   // State for pagination
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [searchTerm, setSearchTerm] = useState("");

//   // State for sorting
//   const [sortConfig, setSortConfig] = useState({
//     key: null,
//     direction: "asc",
//   });

//   // State for date picker
//   const [datePickerOpen, setDatePickerOpen] = useState(false);
//   const [datePickerAnchorEl, setDatePickerAnchorEl] = useState(null);

//   // State for time picker
//   const [timePickerOpen, setTimePickerOpen] = useState(false);
//   const [timePickerAnchorEl, setTimePickerAnchorEl] = useState(null);

//   // Load authentication data from localStorage on component mount
//   useEffect(() => {
//     const token = localStorage.getItem("accessToken");
//     const role = localStorage.getItem("userRole");

//     if (token) {
//       setAuthToken(token);
//       setUserRole(role || "admin");
//       setIsAuthenticated(true);
//     } else {
//       // For demo purposes, set a default authentication
//       setAuthToken("demo-token");
//       setUserRole("admin");
//       setIsAuthenticated(true);
//       setNotification({
//         open: true,
//         message: "Demo mode: Authentication simulated",
//         severity: "info",
//       });
//     }
//   }, []);

//   // Create request headers with authentication
//   const getAuthHeaders = () => {
//     const headers = {
//       "Content-Type": "application/json",
//     };

//     if (authToken && authToken !== "demo-token") {
//       headers["Authorization"] = `Bearer ${authToken}`;
//     }

//     return headers;
//   };

//   // Handle authentication errors
//   const handleAuthError = (error) => {
//     if (error.status === 401) {
//       setNotification({
//         open: true,
//         message: "Authentication expired. Please log in again.",
//         severity: "error",
//       });
//       setIsAuthenticated(false);
//       localStorage.removeItem("accessToken");
//       localStorage.removeItem("userRole");
//     }
//     return error;
//   };

//   useEffect(() => {
//     const fetchEmployees = async () => {
//       try {
//         const token = localStorage.getItem("accessToken"); // Replace with your actual key if different
//         const response = await axios.get(
//           "https://tdtlworld.com/hrms-backend/employee-dropdown/",
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         // Store both the numeric `value` (as id) and the string `emp_id`
//         const formattedData = response.data.map((emp) => ({
//           id: emp.value, // e.g., "564" - used for selection in dropdown
//           emp_id: emp.emp_id, // e.g., "V0992" - sent to the API
//           name: emp.label,
//           email: emp.email,
//         }));

//         setEmployeesList(formattedData);
//       } catch (error) {
//         console.error("Failed to fetch employee list", error);
//       }
//     };

//     fetchEmployees();
//   }, []);

//   // Fetch events from API
//   const fetchEvents = async () => {
//     if (!isAuthenticated) {
//       setNotification({
//         open: true,
//         message: "Authentication required to fetch events.",
//         severity: "warning",
//       });
//       return;
//     }

//     setLoading(true);
//     setError(null);
//     try {
//       const response = await fetch(
//         "https://tdtlworld.com/hrms-backend/events/",
//         {
//           method: "GET",
//           headers: getAuthHeaders(),
//         }
//       );

//       if (response.status === 401) {
//         throw handleAuthError({ status: 401 });
//       }

//       if (!response.ok) {
//         throw new Error(`Failed to fetch events: ${response.status}`);
//       }

//       const data = await response.json();

//       // Transform API data to match our format
//       const transformedEvents = Array.isArray(data)
//         ? data.map((event) => ({
//           event_id: event.event_id,
//           company_id: event.company_id,
//           employee_id: event.employee_id,
//           employee_name: event.employee_name,
//           event_title: event.event_title,
//           event_date: formatDateFromAPI(event.event_date),
//           event_time: formatTimeFromAPI(event.event_time),
//           event_color: event.event_color || "#7267EF",
//           event_note: event.event_note,
//           created_at: event.created_at,
//         }))
//         : [];

//       setEvents(transformedEvents);
//     } catch (err) {
//       if (err.status !== 401) {
//         setError(err.message);
//         setNotification({
//           open: true,
//           message: `Error fetching events: ${err.message}`,
//           severity: "error",
//         });
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Create new event
//   const createEvent = async () => {
//     if (!isAuthenticated) {
//       setNotification({
//         open: true,
//         message: "Authentication required to create events.",
//         severity: "warning",
//       });
//       return;
//     }

//     if (!validateEventForm()) {
//       return;
//     }

//     setLoading(true);
//     setError(null);

//     try {
//       // Format date and time for API
//       const [day, month, year] = newEvent.event_date.split("/");
//       const formattedDate = `${year}-${month.padStart(2, "0")}-${day.padStart(
//         2,
//         "0"
//       )}`;

//       // Format time for API (convert from "12:00 pm" to "12:00:00.000000")
//       const formattedTime = formatTimeForAPI(newEvent.event_time);

//       // Find the selected employee to get their string `emp_id` to send to the API.
//       const selectedEmployee = employeesList.find(
//         (emp) => emp.id == newEvent.employee_id
//       );

//       if (!selectedEmployee) {
//         setNotification({
//           open: true,
//           message:
//             "Could not find employee details. Please select an employee.",
//           severity: "error",
//         });
//         setLoading(false);
//         return;
//       }

//       const payload = {
//         company_id: 2,
//         employee_id: selectedEmployee.emp_id, // Send the string emp_id, e.g., "V0992"
//         event_title: newEvent.event_title,
//         event_date: formattedDate,
//         event_time: formattedTime,
//         event_color: newEvent.event_color,
//         event_note: newEvent.event_note,
//       };

//       const response = await fetch(
//         "https://tdtlworld.com/hrms-backend/events/",
//         {
//           method: "POST",
//           headers: getAuthHeaders(),
//           body: JSON.stringify(payload),
//         }
//       );

//       if (response.status === 401) {
//         throw handleAuthError({ status: 401 });
//       }

//       if (!response.ok) {
//         const errorData = await response.text();
//         throw new Error(
//           `Failed to create event: ${response.status} - ${errorData}`
//         );
//       }

//       // Refresh events list
//       await fetchEvents();

//       // Reset form
//       resetEventForm();

//       setNotification({
//         open: true,
//         message: "Event created successfully",
//         severity: "success",
//       });
//     } catch (err) {
//       if (err.status !== 401) {
//         setError(err.message);
//         setNotification({
//           open: true,
//           message: `Error creating event: ${err.message}`,
//           severity: "error",
//         });
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Update event
//   const updateEvent = async () => {
//     if (!isAuthenticated) {
//       setNotification({
//         open: true,
//         message: "Authentication required to update events.",
//         severity: "warning",
//       });
//       return;
//     }

//     if (!editingEvent || !validateEventForm(editingEvent)) {
//       return;
//     }

//     setLoading(true);
//     setError(null);

//     try {
//       // Format date and time for API
//       const [day, month, year] = editingEvent.event_date.split("/");
//       const formattedDate = `${year}-${month.padStart(2, "0")}-${day.padStart(
//         2,
//         "0"
//       )}`;

//       // Format time for API
//       const formattedTime = formatTimeForAPI(editingEvent.event_time);

//       // Find the selected employee to get their string `emp_id` to send to the API.
//       const selectedEmployee = employeesList.find(
//         (emp) => emp.id == editingEvent.employee_id
//       );

//       if (!selectedEmployee) {
//         setNotification({
//           open: true,
//           message:
//             "Could not find employee details. Please select an employee.",
//           severity: "error",
//         });
//         setLoading(false);
//         return;
//       }

//       const payload = {
//         company_id: 2,
//         employee_id: selectedEmployee.emp_id, // Send the string emp_id, e.g., "V0992"
//         event_title: editingEvent.event_title,
//         event_date: formattedDate,
//         event_time: formattedTime,
//         event_color: editingEvent.event_color,
//         event_note: editingEvent.event_note,
//       };

//       const response = await fetch(
//         `https://tdtlworld.com/hrms-backend/events/${editingEvent.event_id}/`,
//         {
//           method: "PATCH",
//           headers: getAuthHeaders(),
//           body: JSON.stringify(payload),
//         }
//       );

//       if (response.status === 401) {
//         throw handleAuthError({ status: 401 });
//       }

//       if (!response.ok) {
//         const errorData = await response.text();
//         throw new Error(
//           `Failed to update event: ${response.status} - ${errorData}`
//         );
//       }

//       // Refresh events list
//       await fetchEvents();

//       // Close edit dialog
//       setIsEditDialogOpen(false);
//       setEditingEvent(null);

//       setNotification({
//         open: true,
//         message: "Event updated successfully",
//         severity: "success",
//       });
//     } catch (err) {
//       if (err.status !== 401) {
//         setError(err.message);
//         setNotification({
//           open: true,
//           message: `Error updating event: ${err.message}`,
//           severity: "error",
//         });
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Delete event
//   const deleteEvent = async () => {
//     if (!isAuthenticated) {
//       setNotification({
//         open: true,
//         message: "Authentication required to delete events.",
//         severity: "warning",
//       });
//       return;
//     }

//     if (!eventToDelete) {
//       return;
//     }

//     setLoading(true);
//     setError(null);

//     try {
//       const response = await fetch(
//         `https://tdtlworld.com/hrms-backend/events/${eventToDelete.event_id}/`,
//         {
//           method: "DELETE",
//           headers: getAuthHeaders(),
//         }
//       );

//       if (response.status === 401) {
//         throw handleAuthError({ status: 401 });
//       }

//       if (!response.ok) {
//         const errorData = await response.text();
//         throw new Error(
//           `Failed to delete event: ${response.status} - ${errorData}`
//         );
//       }

//       // Refresh events list
//       await fetchEvents();

//       // Close delete confirmation
//       setDeleteConfirmOpen(false);
//       setEventToDelete(null);

//       setNotification({
//         open: true,
//         message: "Event deleted successfully",
//         severity: "success",
//       });
//     } catch (err) {
//       if (err.status !== 401) {
//         setError(err.message);
//         setNotification({
//           open: true,
//           message: `Error deleting event: ${err.message}`,
//           severity: "error",
//         });
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Format date from API (YYYY-MM-DD to DD/MM/YYYY)
//   const formatDateFromAPI = (dateString) => {
//     if (!dateString) return "";
//     const [year, month, day] = dateString.split("-");
//     return `${day.padStart(2, "0")}/${month.padStart(2, "0")}/${year}`;
//   };

//   // Format time from API (HH:MM:SS.SSSSSS to HH:MM am/pm)
//   const formatTimeFromAPI = (timeString) => {
//     if (!timeString) return "";

//     // Extract hours and minutes from the time string
//     const timeParts = timeString.split(":");
//     let hours = Number.parseInt(timeParts[0], 10);
//     const minutes = timeParts[1] ? timeParts[1].padStart(2, "0") : "00";

//     // Convert to 12-hour format
//     const ampm = hours >= 12 ? "pm" : "am";
//     hours = hours % 12;
//     hours = hours ? hours : 12; // the hour '0' should be '12'

//     return `${hours}:${minutes} ${ampm}`;
//   };

//   // Format time for API (HH:MM am/pm to HH:MM:SS.000000)
//   const formatTimeForAPI = (timeString) => {
//     if (!timeString) return "";

//     // Extract hours, minutes, and am/pm from the time string
//     const [time, ampm] = timeString.split(" ");
//     let [hours, minutes] = time.split(":");

//     // Convert hours to 24-hour format
//     hours = Number.parseInt(hours, 10);
//     if (ampm && ampm.toLowerCase() === "pm" && hours < 12) {
//       hours += 12;
//     } else if (ampm && ampm.toLowerCase() === "am" && hours === 12) {
//       hours = 0;
//     }

//     // Format as HH:MM:SS.000000
//     return `${hours.toString().padStart(2, "0")}:${minutes.padStart(
//       2,
//       "0"
//     )}:00.000000`;
//   };

//   // Validate event form
//   const validateEventForm = (eventData = newEvent) => {
//     if (!eventData.employee_id) {
//       setNotification({
//         open: true,
//         message: "Please select an employee",
//         severity: "error",
//       });
//       return false;
//     }

//     if (!eventData.event_title) {
//       setNotification({
//         open: true,
//         message: "Event title is required",
//         severity: "error",
//       });
//       return false;
//     }

//     if (!eventData.event_date) {
//       setNotification({
//         open: true,
//         message: "Event date is required",
//         severity: "error",
//       });
//       return false;
//     }

//     if (!eventData.event_time) {
//       setNotification({
//         open: true,
//         message: "Event time is required",
//         severity: "error",
//       });
//       return false;
//     }

//     if (!eventData.event_note) {
//       setNotification({
//         open: true,
//         message: "Event note is required",
//         severity: "error",
//       });
//       return false;
//     }

//     return true;
//   };

//   // Reset event form
//   const resetEventForm = () => {
//     setNewEvent({
//       event_title: "",
//       employee_id: employeesList.length > 0 ? employeesList[0].id : "",
//       event_date: "",
//       event_time: "",
//       event_color: "#7267EF",
//       event_note: "",
//     });
//   };

//   // Handle form changes for new event
//   const handleEventChange = (field, value) => {
//     setNewEvent({
//       ...newEvent,
//       [field]: value,
//     });
//   };

//   // Handle form changes for editing event
//   const handleEditingEventChange = (field, value) => {
//     setEditingEvent({
//       ...editingEvent,
//       [field]: value,
//     });
//   };

//   // Open edit dialog
//   // ---- FIX START ----
//   const handleOpenEditDialog = (event) => {
//     // The event object from the API/state has `employee_id` as a string ID (e.g., "V0992").
//     // The Select dropdown uses the numeric `id` (e.g., "564") for its values.
//     // We need to find the corresponding employee to get the numeric `id`.
//     const matchingEmployee = employeesList.find(
//       (emp) => emp.emp_id === event.employee_id
//     );

//     // Create the object for the editing state.
//     // Replace the string `employee_id` with the numeric `id` that the dropdown expects.
//     setEditingEvent({
//       ...event,
//       employee_id: matchingEmployee ? matchingEmployee.id : "", // Use numeric id or fallback
//     });

//     setIsEditDialogOpen(true);
//   };
//   // ---- FIX END ----

//   // Close edit dialog
//   const handleCloseEditDialog = () => {
//     setIsEditDialogOpen(false);
//     setEditingEvent(null);
//   };

//   // Open delete confirmation
//   const handleOpenDeleteConfirm = (event) => {
//     setEventToDelete(event);
//     setDeleteConfirmOpen(true);
//   };

//   // Close delete confirmation
//   const handleCloseDeleteConfirm = () => {
//     setDeleteConfirmOpen(false);
//     setEventToDelete(null);
//   };

//   // Close notification
//   const handleCloseNotification = () => {
//     setNotification({
//       ...notification,
//       open: false,
//     });
//   };

//   // Handle pagination
//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(Number.parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   // Handle search
//   const handleSearch = (e) => {
//     setSearchTerm(e.target.value);
//     setPage(0);
//   };

//   // Handle sorting
//   const requestSort = (key) => {
//     let direction = "asc";
//     if (sortConfig.key === key && sortConfig.direction === "asc") {
//       direction = "desc";
//     }
//     setSortConfig({ key, direction });
//   };

//   // Generate calendar days
//   useEffect(() => {
//     const generateCalendarDays = () => {
//       const year = currentDate.getFullYear();
//       const month = currentDate.getMonth();

//       const firstDay = new Date(year, month, 1);
//       const lastDay = new Date(year, month + 1, 0);
//       const firstDayOfWeek = firstDay.getDay();
//       const daysFromPrevMonth = firstDayOfWeek;
//       const totalDays = 42;
//       const days = [];
//       const prevMonth = new Date(year, month, 0);
//       const prevMonthDays = prevMonth.getDate();

//       for (
//         let i = prevMonthDays - daysFromPrevMonth + 1;
//         i <= prevMonthDays;
//         i++
//       ) {
//         days.push({
//           date: new Date(year, month - 1, i),
//           isCurrentMonth: false,
//           events: [],
//         });
//       }
//       for (let i = 1; i <= lastDay.getDate(); i++) {
//         days.push({
//           date: new Date(year, month, i),
//           isCurrentMonth: true,
//           events: [],
//         });
//       }
//       const remainingDays = totalDays - days.length;
//       for (let i = 1; i <= remainingDays; i++) {
//         days.push({
//           date: new Date(year, month + 1, i),
//           isCurrentMonth: false,
//           events: [],
//         });
//       }
//       setCalendarDays(days);
//     };
//     generateCalendarDays();
//   }, [currentDate]);

//   // Fetch events on component mount and when authentication changes
//   useEffect(() => {
//     if (isAuthenticated) {
//       fetchEvents();
//     }
//   }, [isAuthenticated]);

//   // Filter events based on search term
//   const filteredEvents = events.filter(
//     (event) =>
//       event.event_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       event.event_date.includes(searchTerm) ||
//       event.event_time.includes(searchTerm) ||
//       (event.employee_name &&
//         event.employee_name.toLowerCase().includes(searchTerm.toLowerCase()))
//   );

//   // Sort events
//   const sortedEvents = React.useMemo(() => {
//     const sortableEvents = [...filteredEvents];
//     if (sortConfig.key) {
//       sortableEvents.sort((a, b) => {
//         if (a[sortConfig.key] < b[sortConfig.key]) {
//           return sortConfig.direction === "asc" ? -1 : 1;
//         }
//         if (a[sortConfig.key] > b[sortConfig.key]) {
//           return sortConfig.direction === "asc" ? 1 : -1;
//         }
//         return 0;
//       });
//     }
//     return sortableEvents;
//   }, [filteredEvents, sortConfig]);

//   // Paginate events
//   const paginatedEvents = sortedEvents.slice(
//     page * rowsPerPage,
//     page * rowsPerPage + rowsPerPage
//   );

//   // Navigate to previous month
//   const goToPreviousMonth = () => {
//     setCurrentDate(
//       new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
//     );
//   };

//   // Navigate to next month
//   const goToNextMonth = () => {
//     setCurrentDate(
//       new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
//     );
//   };

//   // Go to today
//   const goToToday = () => {
//     setCurrentDate(new Date());
//   };

//   // Format date for display in calendar header
//   function formatMonthYear(date) {
//     return date.toLocaleString("en-US", { month: "long", year: "numeric" });
//   }

//   // Get day number for calendar cell
//   const getDayNumber = (date) => {
//     return date.getDate();
//   };

//   // Check if a date is today
//   const isToday = (date) => {
//     const today = new Date();
//     return (
//       date.getDate() === today.getDate() &&
//       date.getMonth() === today.getMonth() &&
//       date.getFullYear() === today.getFullYear()
//     );
//   };

//   // Handle date picker
//   const handleDatePickerOpen = (event, isEditing = false) => {
//     setDatePickerAnchorEl(event.currentTarget);
//     setDatePickerOpen(true);
//   };

//   const handleDatePickerClose = () => {
//     setDatePickerOpen(false);
//   };

//   const handleDateSelect = (date) => {
//     const day = date.getDate().toString().padStart(2, "0");
//     const month = (date.getMonth() + 1).toString().padStart(2, "0");
//     const year = date.getFullYear();
//     const formattedDate = `${day}/${month}/${year}`;

//     if (editingEvent) {
//       handleEditingEventChange("event_date", formattedDate);
//     } else {
//       handleEventChange("event_date", formattedDate);
//     }

//     handleDatePickerClose();
//   };

//   // Handle time picker
//   const handleTimePickerOpen = (event) => {
//     setTimePickerAnchorEl(event.currentTarget);
//     setTimePickerOpen(true);
//   };

//   const handleTimePickerClose = () => {
//     setTimePickerOpen(false);
//   };

//   const handleTimeSelect = (hours, minutes, ampm) => {
//     const formattedTime = `${hours}:${minutes} ${ampm}`;

//     if (editingEvent) {
//       handleEditingEventChange("event_time", formattedTime);
//     } else {
//       handleEventChange("event_time", formattedTime);
//     }

//     handleTimePickerClose();
//   };

//   // Find events for a specific date
//   const getEventsForDate = (date) => {
//     return events.filter((event) => {
//       if (!event.event_date) return false;
//       const [day, month, year] = event.event_date.split("/");
//       const eventDate = new Date(
//         Number.parseInt(year),
//         Number.parseInt(month) - 1,
//         Number.parseInt(day)
//       );
//       return (
//         eventDate.getDate() === date.getDate() &&
//         eventDate.getMonth() === date.getMonth() &&
//         eventDate.getFullYear() === date.getFullYear()
//       );
//     });
//   };

//   // Check if user has permission to perform actions
//   const hasPermission = (action) => {
//     if (!isAuthenticated) return false;
//     if (action === "delete" && userRole !== "admin") return false;
//     return true;
//   };

//   // Enhanced date picker component
//   const DatePicker = () => {
//     const [pickerDate, setPickerDate] = useState(new Date());
//     const [pickerDays, setPickerDays] = useState([]);

//     useEffect(() => {
//       const generatePickerDays = () => {
//         const year = pickerDate.getFullYear();
//         const month = pickerDate.getMonth();
//         const firstDay = new Date(year, month, 1);
//         const lastDay = new Date(year, month + 1, 0);
//         const firstDayOfWeek = firstDay.getDay();
//         const daysFromPrevMonth = firstDayOfWeek;
//         const totalDays = 42;
//         const days = [];
//         const prevMonth = new Date(year, month, 0);
//         const prevMonthDays = prevMonth.getDate();

//         for (
//           let i = prevMonthDays - daysFromPrevMonth + 1;
//           i <= prevMonthDays;
//           i++
//         ) {
//           days.push({
//             date: new Date(year, month - 1, i),
//             isCurrentMonth: false,
//           });
//         }
//         for (let i = 1; i <= lastDay.getDate(); i++) {
//           days.push({
//             date: new Date(year, month, i),
//             isCurrentMonth: true,
//           });
//         }
//         const remainingDays = totalDays - days.length;
//         for (let i = 1; i <= remainingDays; i++) {
//           days.push({
//             date: new Date(year, month + 1, i),
//             isCurrentMonth: false,
//           });
//         }
//         setPickerDays(days);
//       };
//       generatePickerDays();
//     }, [pickerDate]);

//     const goToPreviousMonth = () => {
//       setPickerDate(
//         new Date(pickerDate.getFullYear(), pickerDate.getMonth() - 1, 1)
//       );
//     };

//     const goToNextMonth = () => {
//       setPickerDate(
//         new Date(pickerDate.getFullYear(), pickerDate.getMonth() + 1, 1)
//       );
//     };
//     return (
//       <Paper elevation={8} sx={{ width: 320, p: 3, borderRadius: 3 }}>
//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             mb: 3,
//           }}
//         >
//           <IconButton
//             onClick={goToPreviousMonth}
//             size="small"
//             sx={{
//               bgcolor: "#f5f5f5",
//               "&:hover": { bgcolor: "#e0e0e0" },
//               borderRadius: 2,
//             }}
//           >
//             <ArrowBackIcon />
//           </IconButton>
//           <Typography variant="h6" sx={{ fontWeight: 600, color: "#7267EF" }}>
//             {pickerDate.toLocaleString("default", {
//               month: "long",
//               year: "numeric",
//             })}
//           </Typography>
//           <IconButton
//             onClick={goToNextMonth}
//             size="small"
//             sx={{
//               bgcolor: "#f5f5f5",
//               "&:hover": { bgcolor: "#e0e0e0" },
//               borderRadius: 2,
//             }}
//           >
//             <ArrowForwardIcon />
//           </IconButton>
//         </Box>
//         <Grid container spacing={0.5}>
//           {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day, index) => (
//             <Grid item xs key={index} sx={{ textAlign: "center", p: 1 }}>
//               <Typography
//                 variant="caption"
//                 sx={{
//                   fontWeight: "bold",
//                   color: "#666",
//                   fontSize: "0.75rem",
//                 }}
//               >
//                 {day}
//               </Typography>
//             </Grid>
//           ))}
//         </Grid>
//         <Grid container spacing={0.5}>
//           {pickerDays.map((day, index) => (
//             <Grid item xs key={index}>
//               <Box
//                 sx={{
//                   display: "flex",
//                   justifyContent: "center",
//                   alignItems: "center",
//                   height: 40,
//                   cursor: "pointer",
//                   borderRadius: 2,
//                   bgcolor: isToday(day.date) ? "#7267EF" : "transparent",
//                   color: isToday(day.date)
//                     ? "white"
//                     : day.isCurrentMonth
//                       ? "text.primary"
//                       : "text.disabled",
//                   fontWeight: isToday(day.date) ? "bold" : "normal",
//                   transition: "all 0.2s ease",
//                   "&:hover": {
//                     bgcolor: isToday(day.date)
//                       ? "#5E54D0"
//                       : day.isCurrentMonth
//                         ? "#f0f4ff"
//                         : "#f5f5f5",
//                     transform: "scale(1.05)",
//                   },
//                 }}
//                 onClick={() => handleDateSelect(day.date)}
//               >
//                 <Typography variant="body2" sx={{ fontWeight: "inherit" }}>
//                   {getDayNumber(day.date)}
//                 </Typography>
//               </Box>
//             </Grid>
//           ))}
//         </Grid>
//         <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
//           <Button
//             variant="outlined"
//             size="small"
//             onClick={() => handleDateSelect(new Date())}
//             startIcon={<TodayIcon />}
//             sx={{
//               borderColor: "#7267EF",
//               color: "#7267EF",
//               "&:hover": {
//                 borderColor: "#5E54D0",
//                 bgcolor: "#f0f4ff",
//               },
//             }}
//           >
//             Today
//           </Button>
//         </Box>
//       </Paper>
//     );
//   };

//   // Enhanced time picker component
//   const TimePicker = () => {
//     const [selectedHour, setSelectedHour] = useState("12");
//     const [selectedMinute, setSelectedMinute] = useState("00");
//     const [selectedAmPm, setSelectedAmPm] = useState("pm");

//     const hours = Array.from({ length: 12 }, (_, i) =>
//       (i + 1).toString().padStart(2, "0")
//     );
//     const minutes = Array.from({ length: 60 }, (_, i) =>
//       i.toString().padStart(2, "0")
//     );

//     const handleSelectTime = () => {
//       handleTimeSelect(selectedHour, selectedMinute, selectedAmPm);
//     };

//     return (
//       <Paper elevation={8} sx={{ width: 280, p: 3, borderRadius: 3 }}>
//         <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
//           <ScheduleIcon sx={{ color: "#7267EF", mr: 1 }} />
//           <Typography variant="h6" sx={{ fontWeight: 600, color: "#7267EF" }}>
//             Select Time
//           </Typography>
//         </Box>
//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "space-between",
//             mb: 3,
//             gap: 1,
//           }}
//         >
//           <FormControl sx={{ flex: 1 }}>
//             <InputLabel id="hour-select-label" sx={{ fontSize: "0.875rem" }}>
//               Hour
//             </InputLabel>
//             <Select
//               labelId="hour-select-label"
//               value={selectedHour}
//               onChange={(e) => setSelectedHour(e.target.value)}
//               label="Hour"
//               size="small"
//               sx={{ borderRadius: 2 }}
//             >
//               {hours.map((hour) => (
//                 <MenuItem key={hour} value={hour}>
//                   {hour}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//           <FormControl sx={{ flex: 1 }}>
//             <InputLabel id="minute-select-label" sx={{ fontSize: "0.875rem" }}>
//               Min
//             </InputLabel>
//             <Select
//               labelId="minute-select-label"
//               value={selectedMinute}
//               onChange={(e) => setSelectedMinute(e.target.value)}
//               label="Min"
//               size="small"
//               sx={{ borderRadius: 2 }}
//             >
//               {minutes.map((minute) => (
//                 <MenuItem key={minute} value={minute}>
//                   {minute}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//           <FormControl sx={{ flex: 1 }}>
//             <InputLabel id="ampm-select-label" sx={{ fontSize: "0.875rem" }}>
//               Period
//             </InputLabel>
//             <Select
//               labelId="ampm-select-label"
//               value={selectedAmPm}
//               onChange={(e) => setSelectedAmPm(e.target.value)}
//               label="Period"
//               size="small"
//               sx={{ borderRadius: 2 }}
//             >
//               <MenuItem value="am">AM</MenuItem>
//               <MenuItem value="pm">PM</MenuItem>
//             </Select>
//           </FormControl>
//         </Box>
//         <Box sx={{ display: "flex", justifyContent: "center", gap: 1 }}>
//           <Button
//             variant="outlined"
//             onClick={handleTimePickerClose}
//             sx={{
//               borderColor: "#ddd",
//               color: "#666",
//               "&:hover": { borderColor: "#bbb" },
//             }}
//           >
//             Cancel
//           </Button>
//           <Button
//             variant="contained"
//             onClick={handleSelectTime}
//             sx={{
//               bgcolor: "#7267EF",
//               "&:hover": { bgcolor: "#5E54D0" },
//               px: 3,
//             }}
//           >
//             Select
//           </Button>
//         </Box>
//       </Paper>
//     );
//   };

//   // Get employee name by ID
//   const getEmployeeNameById = (id) => {
//     const employee = employeesList.find((emp) => emp.id == id);
//     return employee ? employee.name : "Unknown Employee";
//   };

//   if (!isAuthenticated) {
//     return (
//       <ThemeProvider theme={theme}>
//         <CssBaseline />
//         <Box
//           sx={{
//             display: "flex",
//             flexDirection: "column",
//             minHeight: "100vh",
//             justifyContent: "center",
//             alignItems: "center",
//           }}
//         >
//           <Paper
//             elevation={3}
//             sx={{ p: 4, maxWidth: 500, textAlign: "center" }}
//           >
//             <LockIcon sx={{ fontSize: 60, color: "#7267EF", mb: 2 }} />
//             <Typography variant="h5" sx={{ mb: 2 }}>
//               Authentication Required
//             </Typography>
//             <Typography variant="body1" sx={{ mb: 3 }}>
//               You need to be logged in to access the Events Calendar. Please log
//               in with your credentials.
//             </Typography>
//             <Button
//               variant="contained"
//               sx={{ bgcolor: "#7267EF", "&:hover": { bgcolor: "#5E54D0" } }}
//               onClick={() => window.location.reload()}
//             >
//               Refresh
//             </Button>
//           </Paper>
//         </Box>
//       </ThemeProvider>
//     );
//   }

//   return (
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
//       <Box
//         sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
//       >
//         <Box sx={{ borderBottom: "1px solid #e0e0e0", p: 2, bgcolor: "white" }}>
//           <Box
//             sx={{
//               display: "flex",
//               alignItems: "center",
//               width: "100%",
//               maxWidth: 1200,
//               mx: "auto",
//             }}
//           >
//             <Box sx={{ display: "flex", alignItems: "center", mr: 4 }}>
//               <IconButton
//                 color={activeView === "events" ? "primary" : "default"}
//                 onClick={() => setActiveView("events")}
//                 sx={{
//                   borderRadius: 2,
//                   bgcolor: activeView === "events" ? "#f0f4ff" : "transparent",
//                 }}
//               >
//                 <EventIcon />
//               </IconButton>
//               <Box sx={{ ml: 1 }}>
//                 <Typography
//                   variant="subtitle1"
//                   color={activeView === "events" ? "primary" : "textPrimary"}
//                   sx={{
//                     fontWeight: activeView === "events" ? "bold" : "normal",
//                     cursor: "pointer",
//                   }}
//                   onClick={() => setActiveView("events")}
//                 >
//                   Events
//                 </Typography>
//                 <Typography variant="caption" color="textSecondary">
//                   Set up Events
//                 </Typography>
//               </Box>
//             </Box>
//             <Box sx={{ display: "flex", alignItems: "center" }}>
//               <IconButton
//                 color={activeView === "calendar" ? "primary" : "default"}
//                 onClick={() => setActiveView("calendar")}
//                 sx={{
//                   borderRadius: 2,
//                   bgcolor:
//                     activeView === "calendar" ? "#f0f4ff" : "transparent",
//                 }}
//               >
//                 <CalendarTodayIcon />
//               </IconButton>
//               <Box sx={{ ml: 1 }}>
//                 <Typography
//                   variant="subtitle1"
//                   color={activeView === "calendar" ? "primary" : "textPrimary"}
//                   sx={{
//                     fontWeight: activeView === "calendar" ? "bold" : "normal",
//                     cursor: "pointer",
//                   }}
//                   onClick={() => setActiveView("calendar")}
//                 >
//                   Calendar
//                 </Typography>
//                 <Typography variant="caption" color="textSecondary">
//                   Events Calendar
//                 </Typography>
//               </Box>
//             </Box>
//             <Box sx={{ ml: "auto", display: "flex", alignItems: "center" }}>
//               <Chip
//                 label={`Role: ${userRole || "User"}`}
//                 variant="outlined"
//                 size="small"
//                 sx={{ borderColor: "#7267EF", color: "#7267EF" }}
//               />
//             </Box>
//           </Box>
//         </Box>
//         <Box sx={{ p: 3, flexGrow: 1, bgcolor: "#f5f5f9" }}>
//           <Box sx={{ maxWidth: 1200, mx: "auto" }}>
//             {activeView === "events" ? (
//               <Grid container spacing={isMobile ? 0 : 3}>
//                 <Grid item xs={12} md={4}>
//                   <Paper
//                     elevation={2}
//                     sx={{
//                       p: isMobile ? 2 : 3,
//                       height: "100%",
//                       borderRadius: 3,
//                       mb: isMobile ? 2 : 0,
//                     }}
//                   >
//                     <Typography
//                       variant="h6"
//                       sx={{ mb: 3, fontWeight: "bold", color: "#333" }}
//                     >
//                       Add New Event
//                     </Typography>
//                     <Box sx={{ mb: 2 }}>
//                       <Typography
//                         variant="subtitle1"
//                         sx={{ mb: 1, fontWeight: 500 }}
//                       >
//                         Employee <span style={{ color: "red" }}>*</span>
//                       </Typography>
//                       <FormControl fullWidth>
//                         <Select
//                           value={newEvent.employee_id}
//                           onChange={(e) =>
//                             handleEventChange("employee_id", e.target.value)
//                           }
//                           displayEmpty
//                           sx={{ borderRadius: 2 }}
//                           startAdornment={
//                             <InputAdornment position="start">
//                               <PersonIcon sx={{ color: "#7267EF", ml: 1 }} />
//                             </InputAdornment>
//                           }
//                         >
//                           <MenuItem value="">
//                             <em>Select Employee</em>
//                           </MenuItem>
//                           {employeesList.map((employee) => (
//                             <MenuItem key={employee.id} value={employee.id}>
//                               {employee.name}
//                             </MenuItem>
//                           ))}
//                         </Select>
//                       </FormControl>
//                       {employeesList.length === 0 && (
//                         <Typography
//                           variant="caption"
//                           color="textSecondary"
//                           sx={{ mt: 1, display: "block" }}
//                         >
//                           Loading employees...
//                         </Typography>
//                       )}
//                     </Box>
//                     <Box sx={{ mb: 2 }}>
//                       <Typography
//                         variant="subtitle1"
//                         sx={{ mb: 1, fontWeight: 500 }}
//                       >
//                         Event Title <span style={{ color: "red" }}>*</span>
//                       </Typography>
//                       <TextField
//                         fullWidth
//                         placeholder="Enter event title"
//                         value={newEvent.event_title}
//                         onChange={(e) =>
//                           handleEventChange("event_title", e.target.value)
//                         }
//                         required
//                         sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
//                       />
//                     </Box>
//                     <Box sx={{ mb: 2 }}>
//                       <Typography
//                         variant="subtitle1"
//                         sx={{ mb: 1, fontWeight: 500 }}
//                       >
//                         Event Date <span style={{ color: "red" }}>*</span>
//                       </Typography>
//                       <TextField
//                         fullWidth
//                         placeholder="Select date"
//                         value={newEvent.event_date}
//                         onClick={handleDatePickerOpen}
//                         InputProps={{
//                           readOnly: true,
//                           endAdornment: (
//                             <InputAdornment position="end">
//                               <CalendarTodayIcon sx={{ color: "#7267EF" }} />
//                             </InputAdornment>
//                           ),
//                         }}
//                         required
//                         sx={{
//                           "& .MuiOutlinedInput-root": {
//                             borderRadius: 2,
//                             cursor: "pointer",
//                           },
//                         }}
//                       />
//                       <Popover
//                         open={datePickerOpen}
//                         anchorEl={datePickerAnchorEl}
//                         onClose={handleDatePickerClose}
//                         anchorOrigin={{
//                           vertical: "bottom",
//                           horizontal: "left",
//                         }}
//                         transformOrigin={{
//                           vertical: "top",
//                           horizontal: "left",
//                         }}
//                       >
//                         <DatePicker />
//                       </Popover>
//                     </Box>
//                     <Box sx={{ mb: 2 }}>
//                       <Typography
//                         variant="subtitle1"
//                         sx={{ mb: 1, fontWeight: 500 }}
//                       >
//                         Event Time <span style={{ color: "red" }}>*</span>
//                       </Typography>
//                       <TextField
//                         fullWidth
//                         placeholder="Select time"
//                         value={newEvent.event_time}
//                         onClick={handleTimePickerOpen}
//                         InputProps={{
//                           readOnly: true,
//                           endAdornment: (
//                             <InputAdornment position="end">
//                               <AccessTimeIcon sx={{ color: "#7267EF" }} />
//                             </InputAdornment>
//                           ),
//                         }}
//                         required
//                         sx={{
//                           "& .MuiOutlinedInput-root": {
//                             borderRadius: 2,
//                             cursor: "pointer",
//                           },
//                         }}
//                       />
//                       <Popover
//                         open={timePickerOpen}
//                         anchorEl={timePickerAnchorEl}
//                         onClose={handleTimePickerClose}
//                         anchorOrigin={{
//                           vertical: "bottom",
//                           horizontal: "left",
//                         }}
//                         transformOrigin={{
//                           vertical: "top",
//                           horizontal: "left",
//                         }}
//                       >
//                         <TimePicker />
//                       </Popover>
//                     </Box>
//                     <Box sx={{ mb: 2 }}>
//                       <Typography
//                         variant="subtitle1"
//                         sx={{ mb: 1, fontWeight: 500 }}
//                       >
//                         Event Color
//                       </Typography>
//                       <Box
//                         sx={{ display: "flex", alignItems: "center", gap: 1 }}
//                       >
//                         <Box
//                           sx={{
//                             width: 32,
//                             height: 32,
//                             bgcolor: newEvent.event_color,
//                             borderRadius: 2,
//                             border: "2px solid #e0e0e0",
//                             cursor: "pointer",
//                             transition: "transform 0.2s",
//                             "&:hover": { transform: "scale(1.1)" },
//                           }}
//                         />
//                         <TextField
//                           fullWidth
//                           value={newEvent.event_color}
//                           onChange={(e) =>
//                             handleEventChange("event_color", e.target.value)
//                           }
//                           sx={{
//                             "& .MuiOutlinedInput-root": { borderRadius: 2 },
//                           }}
//                         />
//                       </Box>
//                     </Box>
//                     <Box sx={{ mb: 3 }}>
//                       <Typography
//                         variant="subtitle1"
//                         sx={{ mb: 1, fontWeight: 500 }}
//                       >
//                         Event Note <span style={{ color: "red" }}>*</span>
//                       </Typography>
//                       <TextField
//                         fullWidth
//                         multiline
//                         rows={4}
//                         placeholder="Enter event description"
//                         value={newEvent.event_note}
//                         onChange={(e) =>
//                           handleEventChange("event_note", e.target.value)
//                         }
//                         required
//                         sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
//                       />
//                     </Box>
//                     <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
//                       <Button
//                         variant="contained"
//                         onClick={createEvent}
//                         disabled={loading}
//                         sx={{
//                           bgcolor: "#7267EF",
//                           "&:hover": { bgcolor: "#5E54D0" },
//                           px: 4,
//                           py: 1.5,
//                           borderRadius: 2,
//                           fontWeight: 600,
//                         }}
//                       >
//                         {loading ? "Saving..." : "Save Event"}
//                       </Button>
//                     </Box>
//                   </Paper>
//                 </Grid>
//                 <Grid item xs={12} md={8}>
//                   <Paper
//                     elevation={2}
//                     sx={{ p: isMobile ? 1 : 3, borderRadius: 3 }}
//                   >
//                     <Typography
//                       variant="h6"
//                       sx={{ mb: 3, fontWeight: "bold", color: "#333" }}
//                     >
//                       List All Events
//                     </Typography>
//                     <Box
//                       sx={{
//                         display: "flex",
//                         justifyContent: "space-between",
//                         mb: 2,
//                       }}
//                     >
//                       <Box sx={{ display: "flex", alignItems: "center" }}>
//                         <Typography variant="body2" sx={{ mr: 1 }}>
//                           Show
//                         </Typography>
//                         <FormControl size="small" sx={{ width: 80, mr: 1 }}>
//                           <Select
//                             value={rowsPerPage}
//                             onChange={handleChangeRowsPerPage}
//                             displayEmpty
//                             sx={{ borderRadius: 2 }}
//                           >
//                             <MenuItem value={10}>10</MenuItem>
//                             <MenuItem value={25}>25</MenuItem>
//                             <MenuItem value={50}>50</MenuItem>
//                           </Select>
//                         </FormControl>
//                         <Typography variant="body2">entries</Typography>
//                       </Box>
//                       <Box sx={{ display: "flex", alignItems: "center" }}>
//                         <Typography variant="body2" sx={{ mr: 1 }}>
//                           Search
//                         </Typography>
//                         <TextField
//                           size="small"
//                           value={searchTerm}
//                           onChange={handleSearch}
//                           placeholder="Search events..."
//                           InputProps={{
//                             endAdornment: (
//                               <InputAdornment position="end">
//                                 <SearchIcon sx={{ color: "#7267EF" }} />
//                               </InputAdornment>
//                             ),
//                           }}
//                           sx={{
//                             "& .MuiOutlinedInput-root": { borderRadius: 2 },
//                           }}
//                         />
//                       </Box>
//                     </Box>
//                     <TableContainer sx={{ borderRadius: 2 }}>
//                       <Table>
//                         <TableHead>
//                           <TableRow sx={{ bgcolor: "#f8f9fa" }}>
//                             <TableCell
//                               onClick={() => requestSort("event_title")}
//                               sx={{
//                                 fontWeight: "bold",
//                                 cursor: "pointer",
//                                 borderRadius: "8px 0 0 0",
//                               }}
//                             >
//                               <Box
//                                 sx={{ display: "flex", alignItems: "center" }}
//                               >
//                                 EVENT TITLE
//                                 {sortConfig.key === "event_title" &&
//                                   (sortConfig.direction === "asc" ? (
//                                     <ArrowUpwardIcon fontSize="small" />
//                                   ) : (
//                                     <ArrowDownwardIcon fontSize="small" />
//                                   ))}
//                               </Box>
//                             </TableCell>
//                             <TableCell
//                               onClick={() => requestSort("employee_name")}
//                               sx={{ fontWeight: "bold", cursor: "pointer" }}
//                             >
//                               <Box
//                                 sx={{ display: "flex", alignItems: "center" }}
//                               >
//                                 EMPLOYEE
//                                 {sortConfig.key === "employee_name" &&
//                                   (sortConfig.direction === "asc" ? (
//                                     <ArrowUpwardIcon fontSize="small" />
//                                   ) : (
//                                     <ArrowDownwardIcon fontSize="small" />
//                                   ))}
//                               </Box>
//                             </TableCell>
//                             <TableCell
//                               onClick={() => requestSort("event_date")}
//                               sx={{ fontWeight: "bold", cursor: "pointer" }}
//                             >
//                               <Box
//                                 sx={{ display: "flex", alignItems: "center" }}
//                               >
//                                 EVENT DATE
//                                 {sortConfig.key === "event_date" &&
//                                   (sortConfig.direction === "asc" ? (
//                                     <ArrowUpwardIcon fontSize="small" />
//                                   ) : (
//                                     <ArrowDownwardIcon fontSize="small" />
//                                   ))}
//                               </Box>
//                             </TableCell>
//                             <TableCell
//                               onClick={() => requestSort("event_time")}
//                               sx={{ fontWeight: "bold", cursor: "pointer" }}
//                             >
//                               <Box
//                                 sx={{ display: "flex", alignItems: "center" }}
//                               >
//                                 EVENT TIME
//                                 {sortConfig.key === "event_time" &&
//                                   (sortConfig.direction === "asc" ? (
//                                     <ArrowUpwardIcon fontSize="small" />
//                                   ) : (
//                                     <ArrowDownwardIcon fontSize="small" />
//                                   ))}
//                               </Box>
//                             </TableCell>
//                             <TableCell
//                               sx={{
//                                 fontWeight: "bold",
//                                 borderRadius: "0 8px 0 0",
//                               }}
//                             >
//                               ACTIONS
//                             </TableCell>
//                           </TableRow>
//                         </TableHead>
//                         <TableBody>
//                           {loading ? (
//                             <TableRow>
//                               <TableCell
//                                 colSpan={5}
//                                 align="center"
//                                 sx={{ py: 4 }}
//                               >
//                                 Loading events...
//                               </TableCell>
//                             </TableRow>
//                           ) : paginatedEvents.length === 0 ? (
//                             <TableRow>
//                               <TableCell
//                                 colSpan={5}
//                                 align="center"
//                                 sx={{ py: 4 }}
//                               >
//                                 No events found
//                               </TableCell>
//                             </TableRow>
//                           ) : (
//                             paginatedEvents.map((event) => (
//                               <TableRow
//                                 key={event.event_id}
//                                 hover
//                                 sx={{
//                                   "&:hover": { bgcolor: "#f8f9fa" },
//                                   transition: "background-color 0.2s",
//                                 }}
//                               >
//                                 <TableCell>
//                                   <Box
//                                     sx={{
//                                       display: "flex",
//                                       alignItems: "center",
//                                     }}
//                                   >
//                                     <Box
//                                       sx={{
//                                         width: 16,
//                                         height: 16,
//                                         bgcolor: event.event_color,
//                                         borderRadius: 1,
//                                         mr: 2,
//                                         boxShadow: 1,
//                                       }}
//                                     />
//                                     <Typography
//                                       variant="body2"
//                                       sx={{ fontWeight: 500 }}
//                                     >
//                                       {event.event_title}
//                                     </Typography>
//                                   </Box>
//                                 </TableCell>
//                                 <TableCell>
//                                   <Chip
//                                     label={
//                                       event.employee_name ||
//                                       getEmployeeNameById(event.employee_id)
//                                     }
//                                     size="small"
//                                     variant="outlined"
//                                     sx={{ borderRadius: 2 }}
//                                   />
//                                 </TableCell>
//                                 <TableCell>{event.event_date}</TableCell>
//                                 <TableCell>{event.event_time}</TableCell>
//                                 <TableCell>
//                                   <Box sx={{ display: "flex", gap: 1 }}>
//                                     <IconButton
//                                       size="small"
//                                       color="primary"
//                                       onClick={() =>
//                                         handleOpenEditDialog(event)
//                                       }
//                                       disabled={!hasPermission("edit")}
//                                       sx={{
//                                         borderRadius: 2,
//                                         "&:hover": { bgcolor: "#f0f4ff" },
//                                       }}
//                                     >
//                                       <EditIcon fontSize="small" />
//                                     </IconButton>
//                                     <IconButton
//                                       size="small"
//                                       color="error"
//                                       onClick={() =>
//                                         handleOpenDeleteConfirm(event)
//                                       }
//                                       sx={{
//                                         borderRadius: 2,
//                                         "&:hover": { bgcolor: "#ffebee" },
//                                       }}
//                                     >
//                                       <DeleteIcon fontSize="small" />
//                                     </IconButton>
//                                   </Box>
//                                 </TableCell>
//                               </TableRow>
//                             ))
//                           )}
//                         </TableBody>
//                       </Table>
//                     </TableContainer>
//                     <Box
//                       sx={{
//                         display: "flex",
//                         justifyContent: "space-between",
//                         alignItems: "center",
//                         mt: 2,
//                       }}
//                     >
//                       <Typography variant="body2" color="textSecondary">
//                         Showing{" "}
//                         {filteredEvents.length > 0 ? page * rowsPerPage + 1 : 0}{" "}
//                         to{" "}
//                         {Math.min(
//                           (page + 1) * rowsPerPage,
//                           filteredEvents.length
//                         )}{" "}
//                         of {filteredEvents.length} records
//                       </Typography>
//                       <Box sx={{ display: "flex", gap: 1 }}>
//                         <Button
//                           disabled={page === 0}
//                           onClick={() => handleChangePage(null, page - 1)}
//                           variant="outlined"
//                           size="small"
//                           sx={{
//                             borderColor: "#ddd",
//                             color:
//                               page === 0 ? "text.disabled" : "text.primary",
//                             borderRadius: 2,
//                           }}
//                         >
//                           <FaArrowLeft />
//                         </Button>
//                         <Button
//                           variant={page === 0 ? "contained" : "outlined"}
//                           onClick={() => handleChangePage(null, 0)}
//                           size="small"
//                           sx={{
//                             bgcolor: page === 0 ? "#7267EF" : "transparent",
//                             borderColor: page === 0 ? "#7267EF" : "#ddd",
//                             borderRadius: 2,
//                             "&:hover": {
//                               bgcolor: page === 0 ? "#5E54D0" : "#f0f4ff",
//                             },
//                           }}
//                         >
//                           1
//                         </Button>
//                         <Button
//                           disabled={
//                             page >=
//                             Math.ceil(filteredEvents.length / rowsPerPage) - 1
//                           }
//                           onClick={() => handleChangePage(null, page + 1)}
//                           variant="outlined"
//                           size="small"
//                           sx={{
//                             borderColor: "#ddd",
//                             color:
//                               page >=
//                                 Math.ceil(filteredEvents.length / rowsPerPage) - 1
//                                 ? "text.disabled"
//                                 : "text.primary",
//                             borderRadius: 2,
//                           }}
//                         >
//                           <FaArrowRight />
//                         </Button>
//                       </Box>
//                     </Box>
//                   </Paper>
//                 </Grid>
//               </Grid>
//             ) : (
//               <Paper
//                 elevation={2}
//                 sx={{ p: isMobile ? 2 : 3, borderRadius: 3 }}
//               >
//                 {/* Calendar View */}
//                 <Box
//                   sx={{
//                     display: "flex",
//                     justifyContent: "space-between",
//                     alignItems: "center",
//                     mb: 3,
//                   }}
//                 >
//                   <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//                     <IconButton
//                       onClick={goToPreviousMonth}
//                       sx={{
//                         bgcolor: "#f5f5f5",
//                         "&:hover": { bgcolor: "#e0e0e0" },
//                         borderRadius: 2,
//                       }}
//                     >
//                       <ArrowBackIcon />
//                     </IconButton>
//                     <Button
//                       variant="contained"
//                       onClick={goToToday}
//                       sx={{
//                         bgcolor: "#7267EF",
//                         "&:hover": { bgcolor: "#5E54D0" },
//                         borderRadius: 2,
//                         px: 3,
//                       }}
//                     >
//                       Today
//                     </Button>
//                     <IconButton
//                       onClick={goToNextMonth}
//                       sx={{
//                         bgcolor: "#f5f5f5",
//                         "&:hover": { bgcolor: "#e0e0e0" },
//                         borderRadius: 2,
//                       }}
//                     >
//                       <ArrowForwardIcon />
//                     </IconButton>
//                   </Box>
//                   <Typography
//                     variant="h5"
//                     sx={{ fontWeight: "bold", color: "#333" }}
//                   >
//                     {formatMonthYear(currentDate)}
//                   </Typography>
//                   <Box sx={{ display: "flex", gap: 1 }}>
//                     {["month", "week", "day", "list"].map((viewType) => (
//                       <Button
//                         key={viewType}
//                         variant={
//                           calendarViewType === viewType ? "contained" : "outlined"
//                         }
//                         onClick={() => setCalendarViewType(viewType)}
//                         size="small"
//                         sx={{
//                           bgcolor:
//                             calendarViewType === viewType
//                               ? "#7267EF"
//                               : "transparent",
//                           borderColor:
//                             calendarViewType === viewType ? "#7267EF" : "#ddd",
//                           color:
//                             calendarViewType === viewType ? "white" : "#7267EF",
//                           borderRadius: 2,
//                           textTransform: "capitalize",
//                           "&:hover": {
//                             bgcolor:
//                               calendarViewType === viewType
//                                 ? "#5E54D0"
//                                 : "#f0f4ff",
//                           },
//                         }}
//                       >
//                         {viewType}
//                       </Button>
//                     ))}
//                   </Box>
//                 </Box>
//                 {calendarViewType === "month" && (
//                   <Box>
//                     <Grid container sx={{ mb: 1 }}>
//                       {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
//                         (day, index) => (
//                           <Grid
//                             item
//                             xs
//                             key={index}
//                             sx={{
//                               textAlign: "center",
//                               p: 2,
//                               bgcolor: "#f8f9fa",
//                               borderRadius:
//                                 index === 0
//                                   ? "8px 0 0 0"
//                                   : index === 6
//                                     ? "0 8px 0 0"
//                                     : "0",
//                             }}
//                           >
//                             <Typography
//                               variant="subtitle2"
//                               sx={{ fontWeight: "bold", color: "#666" }}
//                             >
//                               {day}
//                             </Typography>
//                           </Grid>
//                         )
//                       )}
//                     </Grid>
//                     <Grid
//                       container
//                       sx={{ border: "1px solid #e0e0e0", borderRadius: 2 }}
//                     >
//                       {calendarDays.map((day, index) => (
//                         <Grid item xs key={index}>
//                           <Box
//                             sx={{
//                               height: 140,
//                               border: "1px solid #f0f0f0",
//                               p: 1,
//                               bgcolor: isToday(day.date) ? "#f0f4ff" : "white",
//                               color: day.isCurrentMonth
//                                 ? "text.primary"
//                                 : "text.disabled",
//                               transition: "all 0.2s ease",
//                               "&:hover": {
//                                 bgcolor: isToday(day.date)
//                                   ? "#e3f2fd"
//                                   : "#f8f9fa",
//                                 transform: "scale(1.02)",
//                               },
//                               cursor: "pointer",
//                               position: "relative",
//                               overflow: "hidden",
//                             }}
//                           >
//                             <Typography
//                               variant="body2"
//                               sx={{
//                                 textAlign: "right",
//                                 fontWeight: isToday(day.date)
//                                   ? "bold"
//                                   : "normal",
//                                 color: isToday(day.date)
//                                   ? "#7267EF"
//                                   : "inherit",
//                               }}
//                             >
//                               {getDayNumber(day.date)}
//                             </Typography>
//                             <Box
//                               sx={{
//                                 mt: 0.5,
//                                 maxHeight: 100,
//                                 overflowY: "auto",
//                               }}
//                             >
//                               {getEventsForDate(day.date)
//                                 .slice(0, 3)
//                                 .map((event, eventIndex) => (
//                                   <Tooltip
//                                     title={`${event.event_title} - ${event.event_time
//                                       }\n${event.employee_name ||
//                                       getEmployeeNameById(event.employee_id)
//                                       }`}
//                                     key={eventIndex}
//                                   >
//                                     <Fade in timeout={300 + eventIndex * 100}>
//                                       <Card
//                                         sx={{
//                                           bgcolor: event.event_color,
//                                           color: "white",
//                                           mb: 0.5,
//                                           cursor: "pointer",
//                                           transition: "all 0.2s ease",
//                                           "&:hover": {
//                                             transform: "scale(1.05)",
//                                             boxShadow: 2,
//                                           },
//                                         }}
//                                         onClick={(e) => {
//                                           e.stopPropagation();
//                                           handleOpenEditDialog(event);
//                                         }}
//                                       >
//                                         <CardContent
//                                           sx={{
//                                             p: 1,
//                                             "&:last-child": { pb: 1 },
//                                           }}
//                                         >
//                                           <Typography
//                                             variant="caption"
//                                             sx={{
//                                               fontSize: "0.7rem",
//                                               fontWeight: 500,
//                                               display: "block",
//                                               whiteSpace: "nowrap",
//                                               overflow: "hidden",
//                                               textOverflow: "ellipsis",
//                                             }}
//                                           >
//                                             {event.event_title}
//                                           </Typography>
//                                           <Typography
//                                             variant="caption"
//                                             sx={{
//                                               fontSize: "0.65rem",
//                                               opacity: 0.9,
//                                               display: "block",
//                                             }}
//                                           >
//                                             {event.event_time}
//                                           </Typography>
//                                         </CardContent>
//                                       </Card>
//                                     </Fade>
//                                   </Tooltip>
//                                 ))}
//                               {getEventsForDate(day.date).length > 3 && (
//                                 <Typography
//                                   variant="caption"
//                                   sx={{
//                                     color: "#7267EF",
//                                     fontWeight: "bold",
//                                     fontSize: "0.7rem",
//                                   }}
//                                 >
//                                   +{getEventsForDate(day.date).length - 3} more
//                                 </Typography>
//                               )}
//                             </Box>
//                           </Box>
//                         </Grid>
//                       ))}
//                     </Grid>
//                   </Box>
//                 )}
//                 {calendarViewType === "week" && (
//                   <Box>
//                     <Grid container sx={{ mb: 1 }}>
//                       {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
//                         (day, index) => {
//                           const date = new Date(currentDate);
//                           const firstDayOfWeek = new Date(
//                             date.setDate(date.getDate() - date.getDay())
//                           );
//                           const dayDate = new Date(firstDayOfWeek);
//                           dayDate.setDate(firstDayOfWeek.getDate() + index);

//                           return (
//                             <Grid
//                               item
//                               xs
//                               key={index}
//                               sx={{
//                                 textAlign: "center",
//                                 p: 2,
//                                 bgcolor: isToday(dayDate)
//                                   ? "#f0f4ff"
//                                   : "#f8f9fa",
//                                 borderRadius:
//                                   index === 0
//                                     ? "8px 0 0 0"
//                                     : index === 6
//                                       ? "0 8px 0 0"
//                                       : "0",
//                               }}
//                             >
//                               <Typography
//                                 variant="subtitle2"
//                                 sx={{ fontWeight: "bold", color: "#666" }}
//                               >
//                                 {day}
//                               </Typography>
//                               <Typography
//                                 variant="h6"
//                                 sx={{
//                                   fontWeight: isToday(dayDate) ? "bold" : "normal",
//                                   color: isToday(dayDate) ? "#7267EF" : "inherit",
//                                 }}
//                               >
//                                 {dayDate.getDate()}
//                               </Typography>
//                             </Grid>
//                           );
//                         }
//                       )}
//                     </Grid>
//                     <Box
//                       sx={{
//                         height: 600,
//                         overflowY: "auto",
//                         border: "1px solid #e0e0e0",
//                         borderRadius: 2,
//                       }}
//                     >
//                       {Array.from({ length: 24 }).map((_, hourIndex) => (
//                         <Box
//                           key={hourIndex}
//                           sx={{
//                             display: "flex",
//                             borderBottom:
//                               hourIndex < 23 ? "1px solid #f0f0f0" : "none",
//                             height: 60,
//                             "&:hover": { bgcolor: "#f8f9fa" },
//                           }}
//                         >
//                           <Box
//                             sx={{
//                               width: 80,
//                               pr: 2,
//                               textAlign: "right",
//                               borderRight: "1px solid #e0e0e0",
//                               display: "flex",
//                               alignItems: "center",
//                               justifyContent: "flex-end",
//                               bgcolor: "#f8f9fa",
//                             }}
//                           >
//                             <Typography
//                               variant="caption"
//                               sx={{ fontWeight: 500, color: "#666" }}
//                             >
//                               {hourIndex === 0
//                                 ? "12 AM"
//                                 : hourIndex < 12
//                                   ? `${hourIndex} AM`
//                                   : hourIndex === 12
//                                     ? "12 PM"
//                                     : `${hourIndex - 12} PM`}
//                             </Typography>
//                           </Box>
//                           <Grid container sx={{ flexGrow: 1 }}>
//                             {Array.from({ length: 7 }).map((_, dayIndex) => {
//                               const date = new Date(currentDate);
//                               const firstDayOfWeek = new Date(
//                                 date.setDate(date.getDate() - date.getDay())
//                               );
//                               const dayDate = new Date(firstDayOfWeek);
//                               dayDate.setDate(
//                                 firstDayOfWeek.getDate() + dayIndex
//                               );
//                               const dayEvents = getEventsForDate(dayDate).filter(
//                                 (event) => {
//                                   if (!event.event_time) return false;
//                                   const [time, ampm] =
//                                     event.event_time.split(" ");
//                                   const [hour] = time.split(":");
//                                   let eventHour = Number.parseInt(hour, 10);
//                                   if (ampm === "pm" && eventHour !== 12) {
//                                     eventHour += 12;
//                                   } else if (ampm === "am" && eventHour === 12) {
//                                     eventHour = 0;
//                                   }
//                                   return eventHour === hourIndex;
//                                 }
//                               );

//                               return (
//                                 <Grid
//                                   item
//                                   xs
//                                   key={dayIndex}
//                                   sx={{
//                                     borderRight:
//                                       dayIndex < 6 ? "1px solid #f0f0f0" : "none",
//                                     position: "relative",
//                                     bgcolor: isToday(dayDate) ? "#f9f9ff" : "white",
//                                   }}
//                                 >
//                                   {dayEvents.map((event, eventIndex) => (
//                                     <Tooltip
//                                       title={`${event.event_title} - ${event.event_time
//                                         }\n${event.employee_name ||
//                                         getEmployeeNameById(event.employee_id)
//                                         }`}
//                                       key={eventIndex}
//                                     >
//                                       <Zoom in timeout={300}>
//                                         <Card
//                                           sx={{
//                                             position: "absolute",
//                                             top: 4, left: 4, right: 4,
//                                             bgcolor: event.event_color,
//                                             color: "white", cursor: "pointer",
//                                             transition: "all 0.2s ease",
//                                             "&:hover": {
//                                               transform: "scale(1.05)",
//                                               boxShadow: 3, zIndex: 10,
//                                             },
//                                             zIndex: 1,
//                                           }}
//                                           onClick={() =>
//                                             handleOpenEditDialog(event)
//                                           }
//                                         >
//                                           <CardContent
//                                             sx={{ p: 1, "&:last-child": { pb: 1 } }}
//                                           >
//                                             <Typography
//                                               variant="caption"
//                                               sx={{
//                                                 fontSize: "0.7rem",
//                                                 fontWeight: 500,
//                                                 whiteSpace: "nowrap",
//                                                 overflow: "hidden",
//                                                 textOverflow: "ellipsis",
//                                               }}
//                                             >
//                                               {event.event_title}
//                                             </Typography>
//                                           </CardContent>
//                                         </Card>
//                                       </Zoom>
//                                     </Tooltip>
//                                   ))}
//                                 </Grid>
//                               );
//                             })}
//                           </Grid>
//                         </Box>
//                       ))}
//                     </Box>
//                   </Box>
//                 )}
//                 {calendarViewType === "day" && (
//                   <Box>
//                     <Paper
//                       elevation={1}
//                       sx={{
//                         p: 3, mb: 3, textAlign: "center",
//                         bgcolor: isToday(currentDate) ? "#f0f4ff" : "#f8f9fa",
//                         borderRadius: 3,
//                       }}
//                     >
//                       <Typography
//                         variant="h5"
//                         sx={{ fontWeight: "bold", color: "#333" }}
//                       >
//                         {currentDate.toLocaleDateString("default", {
//                           weekday: "long", day: "numeric", month: "long", year: "numeric",
//                         })}
//                       </Typography>
//                       <Typography
//                         variant="body2"
//                         color="textSecondary"
//                         sx={{ mt: 1 }}
//                       >
//                         {getEventsForDate(currentDate).length} events scheduled
//                       </Typography>
//                     </Paper>
//                     <Box
//                       sx={{
//                         height: 600,
//                         overflowY: "auto",
//                         border: "1px solid #e0e0e0",
//                         borderRadius: 2,
//                       }}
//                     >
//                       {Array.from({ length: 24 }).map((_, hourIndex) => (
//                         <Box
//                           key={hourIndex}
//                           sx={{
//                             display: "flex",
//                             borderBottom:
//                               hourIndex < 23 ? "1px solid #f0f0f0" : "none",
//                             height: 80,
//                             "&:hover": { bgcolor: "#f8f9fa" },
//                           }}
//                         >
//                           <Box
//                             sx={{
//                               width: 100, pr: 2, textAlign: "right",
//                               borderRight: "1px solid #e0e0e0",
//                               display: "flex", alignItems: "center",
//                               justifyContent: "flex-end", bgcolor: "#f8f9fa",
//                             }}
//                           >
//                             <Typography
//                               variant="body2"
//                               sx={{ fontWeight: 500, color: "#666" }}
//                             >
//                               {hourIndex === 0
//                                 ? "12:00 AM"
//                                 : hourIndex < 12
//                                   ? `${hourIndex}:00 AM`
//                                   : hourIndex === 12
//                                     ? "12:00 PM"
//                                     : `${hourIndex - 12}:00 PM`}
//                             </Typography>
//                           </Box>
//                           <Box sx={{ flexGrow: 1, position: "relative", p: 1 }}>
//                             {getEventsForDate(currentDate)
//                               .filter((event) => {
//                                 if (!event.event_time) return false;
//                                 const [time, ampm] = event.event_time.split(" ");
//                                 const [hour] = time.split(":");
//                                 let eventHour = Number.parseInt(hour, 10);
//                                 if (ampm === "pm" && eventHour !== 12) {
//                                   eventHour += 12;
//                                 } else if (ampm === "am" && eventHour === 12) {
//                                   eventHour = 0;
//                                 }
//                                 return eventHour === hourIndex;
//                               })
//                               .map((event, eventIndex) => (
//                                 <Tooltip
//                                   title={`${event.event_title}\n${event.employee_name ||
//                                     getEmployeeNameById(event.employee_id)
//                                     }\n${event.event_note}`}
//                                   key={eventIndex}
//                                 >
//                                   <Zoom in timeout={300 + eventIndex * 100}>
//                                     <Card
//                                       sx={{
//                                         bgcolor: event.event_color,
//                                         color: "white", mb: 1, cursor: "pointer",
//                                         transition: "all 0.2s ease",
//                                         "&:hover": {
//                                           transform: "scale(1.02)",
//                                           boxShadow: 4,
//                                         },
//                                       }}
//                                       onClick={() => handleOpenEditDialog(event)}
//                                     >
//                                       <CardContent sx={{ p: 2 }}>
//                                         <Box
//                                           sx={{
//                                             display: "flex",
//                                             justifyContent: "space-between",
//                                             alignItems: "center",
//                                           }}
//                                         >
//                                           <Box>
//                                             <Typography
//                                               variant="subtitle1"
//                                               sx={{ fontWeight: 600 }}
//                                             >
//                                               {event.event_title}
//                                             </Typography>
//                                             <Typography
//                                               variant="body2"
//                                               sx={{ opacity: 0.9 }}
//                                             >
//                                               {event.event_time} •{" "}
//                                               {event.employee_name ||
//                                                 getEmployeeNameById(
//                                                   event.employee_id
//                                                 )}
//                                             </Typography>
//                                           </Box>
//                                           <Box
//                                             sx={{ display: "flex", gap: 1 }}
//                                           >
//                                             <IconButton
//                                               size="small"
//                                               sx={{
//                                                 color: "white",
//                                                 "&:hover": {
//                                                   bgcolor: "rgba(255,255,255,0.2)",
//                                                 },
//                                               }}
//                                               onClick={(e) => {
//                                                 e.stopPropagation();
//                                                 handleOpenEditDialog(event);
//                                               }}
//                                             >
//                                               <EditIcon fontSize="small" />
//                                             </IconButton>
//                                           </Box>
//                                         </Box>
//                                       </CardContent>
//                                     </Card>
//                                   </Zoom>
//                                 </Tooltip>
//                               ))}
//                           </Box>
//                         </Box>
//                       ))}
//                     </Box>
//                   </Box>
//                 )}
//                 {calendarViewType === "list" && (
//                   <Box>
//                     <TableContainer sx={{ borderRadius: 2 }}>
//                       <Table>
//                         <TableHead>
//                           <TableRow sx={{ bgcolor: "#f8f9fa" }}>
//                             <TableCell sx={{ fontWeight: "bold", borderRadius: "8px 0 0 0" }}>
//                               EVENT TITLE
//                             </TableCell>
//                             <TableCell sx={{ fontWeight: "bold" }}>
//                               EMPLOYEE
//                             </TableCell>
//                             <TableCell sx={{ fontWeight: "bold" }}>
//                               EVENT DATE
//                             </TableCell>
//                             <TableCell sx={{ fontWeight: "bold" }}>
//                               EVENT TIME
//                             </TableCell>
//                             <TableCell sx={{ fontWeight: "bold", borderRadius: "0 8px 0 0" }}>
//                               ACTIONS
//                             </TableCell>
//                           </TableRow>
//                         </TableHead>
//                         <TableBody>
//                           {loading ? (
//                             <TableRow>
//                               <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
//                                 Loading events...
//                               </TableCell>
//                             </TableRow>
//                           ) : events.length === 0 ? (
//                             <TableRow>
//                               <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
//                                 No events found
//                               </TableCell>
//                             </TableRow>
//                           ) : (
//                             events.map((event) => (
//                               <TableRow
//                                 key={event.event_id}
//                                 hover
//                                 sx={{
//                                   "&:hover": { bgcolor: "#f8f9fa" },
//                                   transition: "background-color 0.2s",
//                                 }}
//                               >
//                                 <TableCell>
//                                   <Box sx={{ display: "flex", alignItems: "center" }}>
//                                     <Box
//                                       sx={{
//                                         width: 16, height: 16,
//                                         bgcolor: event.event_color,
//                                         borderRadius: 1, mr: 2, boxShadow: 1,
//                                       }}
//                                     />
//                                     <Typography
//                                       variant="body2"
//                                       sx={{ fontWeight: 500 }}
//                                     >
//                                       {event.event_title}
//                                     </Typography>
//                                   </Box>
//                                 </TableCell>
//                                 <TableCell>
//                                   <Chip
//                                     label={
//                                       event.employee_name ||
//                                       getEmployeeNameById(event.employee_id)
//                                     }
//                                     size="small"
//                                     variant="outlined"
//                                     sx={{ borderRadius: 2 }}
//                                   />
//                                 </TableCell>
//                                 <TableCell>{event.event_date}</TableCell>
//                                 <TableCell>{event.event_time}</TableCell>
//                                 <TableCell>
//                                   <Box sx={{ display: "flex", gap: 1 }}>
//                                     <IconButton
//                                       size="small"
//                                       color="primary"
//                                       onClick={() => handleOpenEditDialog(event)}
//                                       disabled={!hasPermission("edit")}
//                                       sx={{ borderRadius: 2, "&:hover": { bgcolor: "#f0f4ff" } }}
//                                     >
//                                       <EditIcon fontSize="small" />
//                                     </IconButton>
//                                     <IconButton
//                                       size="small"
//                                       color="error"
//                                       onClick={() => handleOpenDeleteConfirm(event)}
//                                       disabled={!hasPermission("delete")}
//                                       sx={{ borderRadius: 2, "&:hover": { bgcolor: "#ffebee" } }}
//                                     >
//                                       <DeleteIcon fontSize="small" />
//                                     </IconButton>
//                                   </Box>
//                                 </TableCell>
//                               </TableRow>
//                             ))
//                           )}
//                         </TableBody>
//                       </Table>
//                     </TableContainer>
//                   </Box>
//                 )}
//               </Paper>
//             )}
//           </Box>
//         </Box>
//       </Box>

//       {/* Edit Event Dialog */}
//       <Dialog
//         open={isEditDialogOpen}
//         onClose={handleCloseEditDialog}
//         maxWidth="sm"
//         fullWidth
//         PaperProps={{ sx: { borderRadius: 3 } }}
//       >
//         <DialogTitle sx={{ pb: 1 }}>
//           <Typography variant="h6" sx={{ fontWeight: "bold", color: "#333" }}>
//             Edit Event
//           </Typography>
//         </DialogTitle>
//         <DialogContent>
//           {editingEvent && (
//             <Box sx={{ mt: 2 }}>
//               <Box sx={{ mb: 2 }}>
//                 <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 500 }}>
//                   Employee <span style={{ color: "red" }}>*</span>
//                 </Typography>
//                 <FormControl fullWidth>
//                   <Select
//                     value={editingEvent.employee_id}
//                     onChange={(e) =>
//                       handleEditingEventChange("employee_id", e.target.value)
//                     }
//                     displayEmpty
//                     sx={{ borderRadius: 2 }}
//                     // This function helps display the correct employee name in the input field.
//                     renderValue={(selectedId) => {
//                       if (!selectedId) {
//                         return <em>Select Employee</em>;
//                       }
//                       const selectedEmployee = employeesList.find(
//                         (emp) => emp.id == selectedId
//                       );
//                       return selectedEmployee ? selectedEmployee.name : "";
//                     }}
//                   >
//                     <MenuItem value="">
//                       <em>Select Employee</em>
//                     </MenuItem>
//                     {employeesList.map((employee) => (
//                       <MenuItem key={employee.id} value={employee.id}>
//                         {employee.name}
//                       </MenuItem>
//                     ))}
//                   </Select>
//                 </FormControl>
//               </Box>

//               <Box sx={{ mb: 2 }}>
//                 <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 500 }}>
//                   Event Title <span style={{ color: "red" }}>*</span>
//                 </Typography>
//                 <TextField
//                   fullWidth
//                   placeholder="Event Title"
//                   value={editingEvent.event_title}
//                   onChange={(e) =>
//                     handleEditingEventChange("event_title", e.target.value)
//                   }
//                   required
//                   sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
//                 />
//               </Box>
//               <Box sx={{ mb: 2 }}>
//                 <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 500 }}>
//                   Event Date <span style={{ color: "red" }}>*</span>
//                 </Typography>
//                 <TextField
//                   fullWidth
//                   placeholder="Event Date"
//                   value={editingEvent.event_date}
//                   onClick={handleDatePickerOpen}
//                   InputProps={{
//                     readOnly: true,
//                     endAdornment: (
//                       <InputAdornment position="end">
//                         <CalendarTodayIcon sx={{ color: "#7267EF" }} />
//                       </InputAdornment>
//                     ),
//                   }}
//                   required
//                   sx={{
//                     "& .MuiOutlinedInput-root": {
//                       borderRadius: 2,
//                       cursor: "pointer",
//                     },
//                   }}
//                 />
//               </Box>
//               <Box sx={{ mb: 2 }}>
//                 <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 500 }}>
//                   Event Time <span style={{ color: "red" }}>*</span>
//                 </Typography>
//                 <TextField
//                   fullWidth
//                   placeholder="Event Time"
//                   value={editingEvent.event_time}
//                   onClick={handleTimePickerOpen}
//                   InputProps={{
//                     readOnly: true,
//                     endAdornment: (
//                       <InputAdornment position="end">
//                         <AccessTimeIcon sx={{ color: "#7267EF" }} />
//                       </InputAdornment>
//                     ),
//                   }}
//                   required
//                   sx={{
//                     "& .MuiOutlinedInput-root": {
//                       borderRadius: 2,
//                       cursor: "pointer",
//                     },
//                   }}
//                 />
//               </Box>
//               <Box sx={{ mb: 2 }}>
//                 <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 500 }}>
//                   Event Color
//                 </Typography>
//                 <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//                   <Box
//                     sx={{
//                       width: 32, height: 32, bgcolor: editingEvent.event_color,
//                       borderRadius: 2, border: "2px solid #e0e0e0",
//                       cursor: "pointer", transition: "transform 0.2s",
//                       "&:hover": { transform: "scale(1.1)" },
//                     }}
//                   />
//                   <TextField
//                     fullWidth
//                     value={editingEvent.event_color}
//                     onChange={(e) =>
//                       handleEditingEventChange("event_color", e.target.value)
//                     }
//                     sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
//                   />
//                 </Box>
//               </Box>
//               <Box sx={{ mb: 2 }}>
//                 <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 500 }}>
//                   Event Note <span style={{ color: "red" }}>*</span>
//                 </Typography>
//                 <TextField
//                   fullWidth
//                   multiline
//                   rows={4}
//                   placeholder="Event Note"
//                   value={editingEvent.event_note}
//                   onChange={(e) =>
//                     handleEditingEventChange("event_note", e.target.value)
//                   }
//                   required
//                   sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
//                 />
//               </Box>
//             </Box>
//           )}
//         </DialogContent>
//         <DialogActions sx={{ p: 3, pt: 1 }}>
//           <Button
//             onClick={handleCloseEditDialog}
//             variant="outlined"
//             sx={{
//               borderColor: "#ddd", color: "#666", borderRadius: 2,
//               "&:hover": { borderColor: "#bbb" },
//             }}
//           >
//             Cancel
//           </Button>
//           <Button
//             onClick={updateEvent}
//             variant="contained"
//             disabled={loading}
//             sx={{
//               bgcolor: "#7267EF", "&:hover": { bgcolor: "#5E54D0" },
//               borderRadius: 2, px: 3,
//             }}
//           >
//             {loading ? "Updating..." : "Update Event"}
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* Delete Confirmation Dialog */}
//       <Dialog
//         open={deleteConfirmOpen}
//         onClose={handleCloseDeleteConfirm}
//         PaperProps={{ sx: { borderRadius: 3 } }}
//       >
//         <DialogTitle sx={{ pb: 1 }}>
//           <Typography variant="h6" sx={{ fontWeight: "bold", color: "#d32f2f" }}>
//             Confirm Delete
//           </Typography>
//         </DialogTitle>
//         <DialogContent>
//           <Typography variant="body1">
//             Are you sure you want to delete the event "
//             {eventToDelete?.event_title}"?
//           </Typography>
//           <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
//             This action cannot be undone.
//           </Typography>
//         </DialogContent>
//         <DialogActions sx={{ p: 3, pt: 1 }}>
//           <Button
//             onClick={handleCloseDeleteConfirm}
//             variant="outlined"
//             sx={{
//               borderColor: "#ddd", color: "#666", borderRadius: 2,
//               "&:hover": { borderColor: "#bbb" },
//             }}
//           >
//             Cancel
//           </Button>
//           <Button
//             onClick={deleteEvent}
//             color="error"
//             variant="contained"
//             disabled={loading}
//             sx={{ borderRadius: 2, px: 3 }}
//           >
//             {loading ? "Deleting..." : "Delete Event"}
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* Notification Snackbar */}
//       <Snackbar
//         open={notification.open}
//         autoHideDuration={6000}
//         onClose={handleCloseNotification}
//         anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
//       >
//         <Alert
//           onClose={handleCloseNotification}
//           severity={notification.severity}
//           sx={{
//             width: "100%", borderRadius: 2,
//             "& .MuiAlert-icon": { fontSize: "1.2rem" },
//           }}
//         >
//           {notification.message}
//         </Alert>
//       </Snackbar>
//     </ThemeProvider>
//   );
// }

// export default EventsAdmin;













//  import React, { useState, useEffect } from "react";
//   import {
//     ThemeProvider,
//     createTheme,
//     Box,
//     Paper,
//     Typography,
//     Button,
//     IconButton,
//     TextField,
//     Select,
//     MenuItem,
//     FormControl,
//     InputLabel,
//     Table,
//     TableBody,
//     TableCell,
//     TableContainer,
//     TableHead,
//     TableRow,
//     Grid,
//     CssBaseline,
//     InputAdornment,
//     Popover,
//     Tooltip,
//     Dialog,
//     DialogTitle,
//     DialogContent,
//     DialogActions,
//     Snackbar,
//     Alert,
//     Chip,
//     Card,
//     CardContent,
//     Fade,
//     Zoom,
//     useMediaQuery,
//     TablePagination,
//   } from "@mui/material";
//   import {
//     CalendarToday as CalendarTodayIcon,
//     Event as EventIcon,
//     ArrowBack as ArrowBackIcon,
//     ArrowForward as ArrowForwardIcon,
//     AccessTime as AccessTimeIcon,
//     Search as SearchIcon,
//     ArrowUpward as ArrowUpwardIcon,
//     ArrowDownward as ArrowDownwardIcon,
//     Edit as EditIcon,
//     Delete as DeleteIcon,
//     Lock as LockIcon,
//     Person as PersonIcon,
//     Schedule as ScheduleIcon,
//     Today as TodayIcon,
//   } from "@mui/icons-material";
//   import axios from "axios";
 
//   // Create theme
//   const theme = createTheme({
//     palette: {
//       primary: {
//         main: "#8C257C",
//       },
//       secondary: {
//         main: "#f50057",
//       },
//       background: {
//         default: "#f5f5f9",
//       },
//     },
//     components: {
//       MuiTableCell: {
//         styleOverrides: {
//           root: {
//             padding: "8px 16px",
//           },
//         },
//       },
//       MuiButton: {
//         styleOverrides: {
//           root: {
//             textTransform: "none",
//             borderRadius: "8px",
//           },
//         },
//       },
//       MuiPaper: {
//         styleOverrides: {
//           root: {
//             borderRadius: "12px",
//           },
//         },
//       },
//     },
//   });
 
//   function EventsAdmin() {
//     // State for active view
//     const [activeView, setActiveView] = useState("events"); // 'events' or 'calendar'
//     const [calendarViewType, setCalendarViewType] = useState("month"); // 'month', 'week', 'day', 'list'
 
//     const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Detects if screen is 'sm' or smaller
 
//     // Authentication state
//     const [authToken, setAuthToken] = useState("");
//     const [userRole, setUserRole] = useState("");
//     const [isAuthenticated, setIsAuthenticated] = useState(false);
 
//     // Employees data - populated only from API
//     const [employeesList, setEmployeesList] = useState([]);
//     const [loadingEmployees, setLoadingEmployees] = useState(false);
 
//     // State for events
//     const [events, setEvents] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);
 
//     // State for new event form
//     const [newEvent, setNewEvent] = useState({
//       event_title: "",
//       employee_id: "",
//       event_date: "",
//       event_time: "",
//       event_color: "#8C257C",
//       event_note: "",
//     });
 
//     // State for editing event
//     const [editingEvent, setEditingEvent] = useState(null);
//     const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
 
//     // State for delete confirmation
//     const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
//     const [eventToDelete, setEventToDelete] = useState(null);
 
//     // State for notifications
//     const [notification, setNotification] = useState({
//       open: false,
//       message: "",
//       severity: "success",
//     });
 
//     // State for calendar
//     const [currentDate, setCurrentDate] = useState(new Date());
//     const [calendarDays, setCalendarDays] = useState([]);
 
//     // State for pagination
//     const [page, setPage] = useState(0);
//     const [rowsPerPage, setRowsPerPage] = useState(10);
//     const [searchTerm, setSearchTerm] = useState("");
 
//     // State for sorting
//     const [sortConfig, setSortConfig] = useState({
//       key: null,
//       direction: "asc",
//     });
 
//     // State for date picker
//     const [datePickerOpen, setDatePickerOpen] = useState(false);
//     const [datePickerAnchorEl, setDatePickerAnchorEl] = useState(null);
 
//     // State for time picker
//     const [timePickerOpen, setTimePickerOpen] = useState(false);
//     const [timePickerAnchorEl, setTimePickerAnchorEl] = useState(null);
 
//     // Load authentication data from localStorage on component mount
//     useEffect(() => {
//       const token = localStorage.getItem("accessToken");
//       const role = localStorage.getItem("userRole");
 
//       if (token) {
//         setAuthToken(token);
//         setUserRole(role || "admin");
//         setIsAuthenticated(true);
//       } else {
//         // For demo purposes, set a default authentication
//         setAuthToken("demo-token");
//         setUserRole("admin");
//         setIsAuthenticated(true);
//         setNotification({
//           open: true,
//           message: "Demo mode: Authentication simulated",
//           severity: "info",
//         });
//       }
//     }, []);
 
//     // Create request headers with authentication
//     const getAuthHeaders = () => {
//       const headers = {
//         "Content-Type": "application/json",
//       };
 
//       if (authToken && authToken !== "demo-token") {
//         headers["Authorization"] = `Bearer ${authToken}`;
//       }
 
//       return headers;
//     };
 
//     // Handle authentication errors
//     const handleAuthError = (error) => {
//       if (error.status === 401) {
//         setNotification({
//           open: true,
//           message: "Authentication expired. Please log in again.",
//           severity: "error",
//         });
//         setIsAuthenticated(false);
//         localStorage.removeItem("accessToken");
//         localStorage.removeItem("userRole");
//       }
//       return error;
//     };
 
//     useEffect(() => {
//       const fetchEmployees = async () => {
//         try {
//           const token = localStorage.getItem("accessToken"); // Replace with your actual key if different
//           const response = await axios.get(
//             "https://tdtlworld.com/hrms-backend/employee-dropdown/",
//             {
//               headers: {
//                 Authorization: `Bearer ${token}`,
//               },
//             }
//           );
 
//           // Store both the numeric `value` (as id) and the string `emp_id`
//           const formattedData = response.data.map((emp) => ({
//             id: emp.value, // e.g., "564" - used for selection in dropdown
//             emp_id: emp.emp_id, // e.g., "V0992" - sent to the API
//             name: emp.label,
//             email: emp.email,
//           }));
 
//           setEmployeesList(formattedData);
//         } catch (error) {
//           console.error("Failed to fetch employee list", error);
//         }
//       };
 
//       fetchEmployees();
//     }, []);
 
//     // Fetch events from API
//     const fetchEvents = async () => {
//       if (!isAuthenticated) {
//         setNotification({
//           open: true,
//           message: "Authentication required to fetch events.",
//           severity: "warning",
//         });
//         return;
//       }
 
//       setLoading(true);
//       setError(null);
//       try {
//         const response = await fetch(
//           "https://tdtlworld.com/hrms-backend/events/",
//           {
//             method: "GET",
//             headers: getAuthHeaders(),
//           }
//         );
 
//         if (response.status === 401) {
//           throw handleAuthError({ status: 401 });
//         }
 
//         if (!response.ok) {
//           throw new Error(`Failed to fetch events: ${response.status}`);
//         }
 
//         const data = await response.json();
 
//         // Transform API data to match our format
//         const transformedEvents = Array.isArray(data)
//           ? data.map((event) => ({
//             event_id: event.event_id,
//             company_id: event.company_id,
//             employee_id: event.employee_id,
//             employee_name: event.employee_name,
//             event_title: event.event_title,
//             event_date: formatDateFromAPI(event.event_date),
//             event_time: formatTimeFromAPI(event.event_time),
//             event_color: event.event_color || "#8C257C",
//             event_note: event.event_note,
//             created_at: event.created_at,
//           }))
//           : [];
 
//         setEvents(transformedEvents);
//       } catch (err) {
//         if (err.status !== 401) {
//           setError(err.message);
//           setNotification({
//             open: true,
//             message: `Error fetching events: ${err.message}`,
//             severity: "error",
//           });
//         }
//       } finally {
//         setLoading(false);
//       }
//     };
 
//     // Create new event
//     const createEvent = async () => {
//       if (!isAuthenticated) {
//         setNotification({
//           open: true,
//           message: "Authentication required to create events.",
//           severity: "warning",
//         });
//         return;
//       }
 
//       if (!validateEventForm()) {
//         return;
//       }
 
//       setLoading(true);
//       setError(null);
 
//       try {
//         // Format date and time for API
//         const [day, month, year] = newEvent.event_date.split("/");
//         const formattedDate = `${year}-${month.padStart(2, "0")}-${day.padStart(
//           2,
//           "0"
//         )}`;
 
//         // Format time for API (convert from "12:00 pm" to "12:00:00.000000")
//         const formattedTime = formatTimeForAPI(newEvent.event_time);
 
//         // Find the selected employee to get their string `emp_id` to send to the API.
//         const selectedEmployee = employeesList.find(
//           (emp) => emp.id == newEvent.employee_id
//         );
 
//         if (!selectedEmployee) {
//           setNotification({
//             open: true,
//             message:
//               "Could not find employee details. Please select an employee.",
//             severity: "error",
//           });
//           setLoading(false);
//           return;
//         }
 
//         const payload = {
//           company_id: 2,
//           employee_id: selectedEmployee.emp_id, // Send the string emp_id, e.g., "V0992"
//           event_title: newEvent.event_title,
//           event_date: formattedDate,
//           event_time: formattedTime,
//           event_color: newEvent.event_color,
//           event_note: newEvent.event_note,
//         };
 
//         const response = await fetch(
//           "https://tdtlworld.com/hrms-backend/events/",
//           {
//             method: "POST",
//             headers: getAuthHeaders(),
//             body: JSON.stringify(payload),
//           }
//         );
 
//         if (response.status === 401) {
//           throw handleAuthError({ status: 401 });
//         }
 
//         if (!response.ok) {
//           const errorData = await response.text();
//           throw new Error(
//             `Failed to create event: ${response.status} - ${errorData}`
//           );
//         }
 
//         // Refresh events list
//         await fetchEvents();
 
//         // Reset form
//         resetEventForm();
 
//         setNotification({
//           open: true,
//           message: "Event created successfully",
//           severity: "success",
//         });
//       } catch (err) {
//         if (err.status !== 401) {
//           setError(err.message);
//           setNotification({
//             open: true,
//             message: `Error creating event: ${err.message}`,
//             severity: "error",
//           });
//         }
//       } finally {
//         setLoading(false);
//       }
//     };
 
//     // Update event
//     const updateEvent = async () => {
//       if (!isAuthenticated) {
//         setNotification({
//           open: true,
//           message: "Authentication required to update events.",
//           severity: "warning",
//         });
//         return;
//       }
 
//       if (!editingEvent || !validateEventForm(editingEvent)) {
//         return;
//       }
 
//       setLoading(true);
//       setError(null);
 
//       try {
//         // Format date and time for API
//         const [day, month, year] = editingEvent.event_date.split("/");
//         const formattedDate = `${year}-${month.padStart(2, "0")}-${day.padStart(
//           2,
//           "0"
//         )}`;
 
//         // Format time for API
//         const formattedTime = formatTimeForAPI(editingEvent.event_time);
 
//         // Find the selected employee to get their string `emp_id` to send to the API.
//         const selectedEmployee = employeesList.find(
//           (emp) => emp.id == editingEvent.employee_id
//         );
 
//         if (!selectedEmployee) {
//           setNotification({
//             open: true,
//             message:
//               "Could not find employee details. Please select an employee.",
//             severity: "error",
//           });
//           setLoading(false);
//           return;
//         }
 
//         const payload = {
//           company_id: 2,
//           employee_id: selectedEmployee.emp_id, // Send the string emp_id, e.g., "V0992"
//           event_title: editingEvent.event_title,
//           event_date: formattedDate,
//           event_time: formattedTime,
//           event_color: editingEvent.event_color,
//           event_note: editingEvent.event_note,
//         };
 
//         const response = await fetch(
//           `https://tdtlworld.com/hrms-backend/events/${editingEvent.event_id}/`,
//           {
//             method: "PATCH",
//             headers: getAuthHeaders(),
//             body: JSON.stringify(payload),
//           }
//         );
 
//         if (response.status === 401) {
//           throw handleAuthError({ status: 401 });
//         }
 
//         if (!response.ok) {
//           const errorData = await response.text();
//           throw new Error(
//             `Failed to update event: ${response.status} - ${errorData}`
//           );
//         }
 
//         // Refresh events list
//         await fetchEvents();
 
//         // Close edit dialog
//         setIsEditDialogOpen(false);
//         setEditingEvent(null);
 
//         setNotification({
//           open: true,
//           message: "Event updated successfully",
//           severity: "success",
//         });
//       } catch (err) {
//         if (err.status !== 401) {
//           setError(err.message);
//           setNotification({
//             open: true,
//             message: `Error updating event: ${err.message}`,
//             severity: "error",
//           });
//         }
//       } finally {
//         setLoading(false);
//       }
//     };
 
//     // Delete event
//     const deleteEvent = async () => {
//       if (!isAuthenticated) {
//         setNotification({
//           open: true,
//           message: "Authentication required to delete events.",
//           severity: "warning",
//         });
//         return;
//       }
 
//       if (!eventToDelete) {
//         return;
//       }
 
//       setLoading(true);
//       setError(null);
 
//       try {
//         const response = await fetch(
//           `https://tdtlworld.com/hrms-backend/events/${eventToDelete.event_id}/`,
//           {
//             method: "DELETE",
//             headers: getAuthHeaders(),
//           }
//         );
 
//         if (response.status === 401) {
//           throw handleAuthError({ status: 401 });
//         }
 
//         if (!response.ok) {
//           const errorData = await response.text();
//           throw new Error(
//             `Failed to delete event: ${response.status} - ${errorData}`
//           );
//         }
 
//         // Refresh events list
//         await fetchEvents();
 
//         // Close delete confirmation
//         setDeleteConfirmOpen(false);
//         setEventToDelete(null);
 
//         setNotification({
//           open: true,
//           message: "Event deleted successfully",
//           severity: "success",
//         });
//       } catch (err) {
//         if (err.status !== 401) {
//           setError(err.message);
//           setNotification({
//             open: true,
//             message: `Error deleting event: ${err.message}`,
//             severity: "error",
//           });
//         }
//       } finally {
//         setLoading(false);
//       }
//     };
 
//     // Format date from API (YYYY-MM-DD to DD/MM/YYYY)
//     const formatDateFromAPI = (dateString) => {
//       if (!dateString) return "";
//       const [year, month, day] = dateString.split("-");
//       return `${day.padStart(2, "0")}/${month.padStart(2, "0")}/${year}`;
//     };
 
//     // Format time from API (HH:MM:SS.SSSSSS to HH:MM am/pm)
//     const formatTimeFromAPI = (timeString) => {
//       if (!timeString) return "";
 
//       // Extract hours and minutes from the time string
//       const timeParts = timeString.split(":");
//       let hours = Number.parseInt(timeParts[0], 10);
//       const minutes = timeParts[1] ? timeParts[1].padStart(2, "0") : "00";
 
//       // Convert to 12-hour format
//       const ampm = hours >= 12 ? "pm" : "am";
//       hours = hours % 12;
//       hours = hours ? hours : 12; // the hour '0' should be '12'
 
//       return `${hours}:${minutes} ${ampm}`;
//     };
 
//     // Format time for API (HH:MM am/pm to HH:MM:SS.000000)
//     const formatTimeForAPI = (timeString) => {
//       if (!timeString) return "";
 
//       // Extract hours, minutes, and am/pm from the time string
//       const [time, ampm] = timeString.split(" ");
//       let [hours, minutes] = time.split(":");
 
//       // Convert hours to 24-hour format
//       hours = Number.parseInt(hours, 10);
//       if (ampm && ampm.toLowerCase() === "pm" && hours < 12) {
//         hours += 12;
//       } else if (ampm && ampm.toLowerCase() === "am" && hours === 12) {
//         hours = 0;
//       }
 
//       // Format as HH:MM:SS.000000
//       return `${hours.toString().padStart(2, "0")}:${minutes.padStart(
//         2,
//         "0"
//       )}:00.000000`;
//     };
 
//     // Validate event form
//     const validateEventForm = (eventData = newEvent) => {
//       if (!eventData.employee_id) {
//         setNotification({
//           open: true,
//           message: "Please select an employee",
//           severity: "error",
//         });
//         return false;
//       }
 
//       if (!eventData.event_title) {
//         setNotification({
//           open: true,
//           message: "Event title is required",
//           severity: "error",
//         });
//         return false;
//       }
 
//       if (!eventData.event_date) {
//         setNotification({
//           open: true,
//           message: "Event date is required",
//           severity: "error",
//         });
//         return false;
//       }
 
//       if (!eventData.event_time) {
//         setNotification({
//           open: true,
//           message: "Event time is required",
//           severity: "error",
//         });
//         return false;
//       }
 
//       if (!eventData.event_note) {
//         setNotification({
//           open: true,
//           message: "Event note is required",
//           severity: "error",
//         });
//         return false;
//       }
 
//       return true;
//     };
 
//     // Reset event form
//     const resetEventForm = () => {
//       setNewEvent({
//         event_title: "",
//         employee_id: employeesList.length > 0 ? employeesList[0].id : "",
//         event_date: "",
//         event_time: "",
//         event_color: "#8C257C",
//         event_note: "",
//       });
//     };
 
//     // Handle form changes for new event
//     const handleEventChange = (field, value) => {
//       setNewEvent({
//         ...newEvent,
//         [field]: value,
//       });
//     };
 
//     // Handle form changes for editing event
//     const handleEditingEventChange = (field, value) => {
//       setEditingEvent({
//         ...editingEvent,
//         [field]: value,
//       });
//     };
 
//     // Open edit dialog
//     const handleOpenEditDialog = (event) => {
//       const matchingEmployee = employeesList.find(
//         (emp) => emp.emp_id === event.employee_id
//       );
 
//       setEditingEvent({
//         ...event,
//         employee_id: matchingEmployee ? matchingEmployee.id : "",
//       });
 
//       setIsEditDialogOpen(true);
//     };
 
//     // Close edit dialog
//     const handleCloseEditDialog = () => {
//       setIsEditDialogOpen(false);
//       setEditingEvent(null);
//     };
 
//     // Open delete confirmation
//     const handleOpenDeleteConfirm = (event) => {
//       setEventToDelete(event);
//       setDeleteConfirmOpen(true);
//     };
 
//     // Close delete confirmation
//     const handleCloseDeleteConfirm = () => {
//       setDeleteConfirmOpen(false);
//       setEventToDelete(null);
//     };
 
//     // Close notification
//     const handleCloseNotification = () => {
//       setNotification({
//         ...notification,
//         open: false,
//       });
//     };
 
//     // Handle pagination
//     const handleChangePage = (event, newPage) => {
//       setPage(newPage);
//     };
 
//     const handleChangeRowsPerPage = (event) => {
//       setRowsPerPage(Number.parseInt(event.target.value, 10));
//       setPage(0);
//     };
 
//     // Handle search
//     const handleSearch = (e) => {
//       setSearchTerm(e.target.value);
//       setPage(0);
//     };
 
//     // Handle sorting
//     const requestSort = (key) => {
//       let direction = "asc";
//       if (sortConfig.key === key && sortConfig.direction === "asc") {
//         direction = "desc";
//       }
//       setSortConfig({ key, direction });
//     };
 
//     // Generate calendar days
//     useEffect(() => {
//       const generateCalendarDays = () => {
//         const year = currentDate.getFullYear();
//         const month = currentDate.getMonth();
 
//         const firstDay = new Date(year, month, 1);
//         const lastDay = new Date(year, month + 1, 0);
//         const firstDayOfWeek = firstDay.getDay();
//         const daysFromPrevMonth = firstDayOfWeek;
//         const totalDays = 42;
//         const days = [];
//         const prevMonth = new Date(year, month, 0);
//         const prevMonthDays = prevMonth.getDate();
 
//         for (
//           let i = prevMonthDays - daysFromPrevMonth + 1;
//           i <= prevMonthDays;
//           i++
//         ) {
//           days.push({
//             date: new Date(year, month - 1, i),
//             isCurrentMonth: false,
//             events: [],
//           });
//         }
//         for (let i = 1; i <= lastDay.getDate(); i++) {
//           days.push({
//             date: new Date(year, month, i),
//             isCurrentMonth: true,
//             events: [],
//           });
//         }
//         const remainingDays = totalDays - days.length;
//         for (let i = 1; i <= remainingDays; i++) {
//           days.push({
//             date: new Date(year, month + 1, i),
//             isCurrentMonth: false,
//             events: [],
//           });
//         }
//         setCalendarDays(days);
//       };
//       generateCalendarDays();
//     }, [currentDate]);
 
//     // Fetch events on component mount and when authentication changes
//     useEffect(() => {
//       if (isAuthenticated) {
//         fetchEvents();
//       }
//     }, [isAuthenticated]);
 
//     // Filter events based on search term
//     const filteredEvents = events.filter(
//       (event) =>
//         event.event_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         event.event_date.includes(searchTerm) ||
//         event.event_time.includes(searchTerm) ||
//         (event.employee_name &&
//           event.employee_name.toLowerCase().includes(searchTerm.toLowerCase()))
//     );
 
//     // Sort events
//     const sortedEvents = React.useMemo(() => {
//       const sortableEvents = [...filteredEvents];
//       if (sortConfig.key) {
//         sortableEvents.sort((a, b) => {
//           if (a[sortConfig.key] < b[sortConfig.key]) {
//             return sortConfig.direction === "asc" ? -1 : 1;
//           }
//           if (a[sortConfig.key] > b[sortConfig.key]) {
//             return sortConfig.direction === "asc" ? 1 : -1;
//           }
//           return 0;
//         });
//       }
//       return sortableEvents;
//     }, [filteredEvents, sortConfig]);
 
//     // Paginate events
//     const paginatedEvents = sortedEvents.slice(
//       page * rowsPerPage,
//       page * rowsPerPage + rowsPerPage
//     );
 
//     // Navigate to previous month
//     const goToPreviousMonth = () => {
//       setCurrentDate(
//         new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
//       );
//     };
 
//     // Navigate to next month
//     const goToNextMonth = () => {
//       setCurrentDate(
//         new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
//       );
//     };
 
//     // Go to today
//     const goToToday = () => {
//       setCurrentDate(new Date());
//     };
 
//     // Format date for display in calendar header
//     function formatMonthYear(date) {
//       return date.toLocaleString("en-US", { month: "long", year: "numeric" });
//     }
 
//     // Get day number for calendar cell
//     const getDayNumber = (date) => {
//       return date.getDate();
//     };
 
//     // Check if a date is today
//     const isToday = (date) => {
//       const today = new Date();
//       return (
//         date.getDate() === today.getDate() &&
//         date.getMonth() === today.getMonth() &&
//         date.getFullYear() === today.getFullYear()
//       );
//     };
 
//     // Handle date picker
//     const handleDatePickerOpen = (event, isEditing = false) => {
//       setDatePickerAnchorEl(event.currentTarget);
//       setDatePickerOpen(true);
//     };
 
//     const handleDatePickerClose = () => {
//       setDatePickerOpen(false);
//     };
 
//     const handleDateSelect = (date) => {
//       const day = date.getDate().toString().padStart(2, "0");
//       const month = (date.getMonth() + 1).toString().padStart(2, "0");
//       const year = date.getFullYear();
//       const formattedDate = `${day}/${month}/${year}`;
 
//       if (editingEvent) {
//         handleEditingEventChange("event_date", formattedDate);
//       } else {
//         handleEventChange("event_date", formattedDate);
//       }
 
//       handleDatePickerClose();
//     };
 
//     // Handle time picker
//     const handleTimePickerOpen = (event) => {
//       setTimePickerAnchorEl(event.currentTarget);
//       setTimePickerOpen(true);
//     };
 
//     const handleTimePickerClose = () => {
//       setTimePickerOpen(false);
//     };
 
//     const handleTimeSelect = (hours, minutes, ampm) => {
//       const formattedTime = `${hours}:${minutes} ${ampm}`;
 
//       if (editingEvent) {
//         handleEditingEventChange("event_time", formattedTime);
//       } else {
//         handleEventChange("event_time", formattedTime);
//       }
 
//       handleTimePickerClose();
//     };
 
//     // Find events for a specific date
//     const getEventsForDate = (date) => {
//       return events.filter((event) => {
//         if (!event.event_date) return false;
//         const [day, month, year] = event.event_date.split("/");
//         const eventDate = new Date(
//           Number.parseInt(year),
//           Number.parseInt(month) - 1,
//           Number.parseInt(day)
//         );
//         return (
//           eventDate.getDate() === date.getDate() &&
//           eventDate.getMonth() === date.getMonth() &&
//           eventDate.getFullYear() === date.getFullYear()
//         );
//       });
//     };
 
//     // Check if user has permission to perform actions
//     const hasPermission = (action) => {
//       if (!isAuthenticated) return false;
//       if (action === "delete" && userRole !== "admin") return false;
//       return true;
//     };
 
//     // Enhanced date picker component
//     const DatePicker = () => {
//       const [pickerDate, setPickerDate] = useState(new Date());
//       const [pickerDays, setPickerDays] = useState([]);
 
//       useEffect(() => {
//         const generatePickerDays = () => {
//           const year = pickerDate.getFullYear();
//           const month = pickerDate.getMonth();
//           const firstDay = new Date(year, month, 1);
//           const lastDay = new Date(year, month + 1, 0);
//           const firstDayOfWeek = firstDay.getDay();
//           const daysFromPrevMonth = firstDayOfWeek;
//           const totalDays = 42;
//           const days = [];
//           const prevMonth = new Date(year, month, 0);
//           const prevMonthDays = prevMonth.getDate();
 
//           for (
//             let i = prevMonthDays - daysFromPrevMonth + 1;
//             i <= prevMonthDays;
//             i++
//           ) {
//             days.push({
//               date: new Date(year, month - 1, i),
//               isCurrentMonth: false,
//             });
//           }
//           for (let i = 1; i <= lastDay.getDate(); i++) {
//             days.push({
//               date: new Date(year, month, i),
//               isCurrentMonth: true,
//             });
//           }
//           const remainingDays = totalDays - days.length;
//           for (let i = 1; i <= remainingDays; i++) {
//             days.push({
//               date: new Date(year, month + 1, i),
//               isCurrentMonth: false,
//             });
//           }
//           setPickerDays(days);
//         };
//         generatePickerDays();
//       }, [pickerDate]);
 
//       const goToPreviousMonth = () => {
//         setPickerDate(
//           new Date(pickerDate.getFullYear(), pickerDate.getMonth() - 1, 1)
//         );
//       };
 
//       const goToNextMonth = () => {
//         setPickerDate(
//           new Date(pickerDate.getFullYear(), pickerDate.getMonth() + 1, 1)
//         );
//       };
//       return (
//         <Paper elevation={8} sx={{ width: 320, p: 3, borderRadius: 3 }}>
//           <Box
//             sx={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//               mb: 3,
//             }}
//           >
//             <IconButton
//               onClick={goToPreviousMonth}
//               size="small"
//               sx={{
//                 bgcolor: "#f5f5f5",
//                 "&:hover": { bgcolor: "#e0e0e0" },
//                 borderRadius: 2,
//               }}
//             >
//               <ArrowBackIcon />
//             </IconButton>
//             <Typography variant="h6" sx={{ fontWeight: 600, color: "#8C257C" }}>
//               {pickerDate.toLocaleString("default", {
//                 month: "long",
//                 year: "numeric",
//               })}
//             </Typography>
//             <IconButton
//               onClick={goToNextMonth}
//               size="small"
//               sx={{
//                 bgcolor: "#f5f5f5",
//                 "&:hover": { bgcolor: "#e0e0e0" },
//                 borderRadius: 2,
//               }}
//             >
//               <ArrowForwardIcon />
//             </IconButton>
//           </Box>
//           <Grid container spacing={0.5}>
//             {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day, index) => (
//               <Grid item xs key={index} sx={{ textAlign: "center", p: 1 }}>
//                 <Typography
//                   variant="caption"
//                   sx={{
//                     fontWeight: "bold",
//                     color: "#666",
//                     fontSize: "0.75rem",
//                   }}
//                 >
//                   {day}
//                 </Typography>
//               </Grid>
//             ))}
//           </Grid>
//           <Grid container spacing={0.5}>
//             {pickerDays.map((day, index) => (
//               <Grid item xs key={index}>
//                 <Box
//                   sx={{
//                     display: "flex",
//                     justifyContent: "center",
//                     alignItems: "center",
//                     height: 40,
//                     cursor: "pointer",
//                     borderRadius: 2,
//                     bgcolor: isToday(day.date) ? "#8C257C" : "transparent",
//                     color: isToday(day.date)
//                       ? "white"
//                       : day.isCurrentMonth
//                         ? "text.primary"
//                         : "text.disabled",
//                     fontWeight: isToday(day.date) ? "bold" : "normal",
//                     transition: "all 0.2s ease",
//                     "&:hover": {
//                       bgcolor: isToday(day.date)
//                         ? "#701D62"
//                         : day.isCurrentMonth
//                           ? "#f0f4ff"
//                           : "#f5f5f5",
//                       transform: "scale(1.05)",
//                     },
//                   }}
//                   onClick={() => handleDateSelect(day.date)}
//                 >
//                   <Typography variant="body2" sx={{ fontWeight: "inherit" }}>
//                     {getDayNumber(day.date)}
//                   </Typography>
//                 </Box>
//               </Grid>
//             ))}
//           </Grid>
//           <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
//             <Button
//               variant="outlined"
//               size="small"
//               onClick={() => handleDateSelect(new Date())}
//               startIcon={<TodayIcon />}
//               sx={{
//                 borderColor: "#8C257C",
//                 color: "#8C257C",
//                 "&:hover": {
//                   borderColor: "#701D62",
//                   bgcolor: "rgba(140, 37, 124, 0.04)",
//                 },
//               }}
//             >
//               Today
//             </Button>
//           </Box>
//         </Paper>
//       );
//     };
 
//     // Enhanced time picker component
//     const TimePicker = () => {
//       const [selectedHour, setSelectedHour] = useState("12");
//       const [selectedMinute, setSelectedMinute] = useState("00");
//       const [selectedAmPm, setSelectedAmPm] = useState("pm");
 
//       const hours = Array.from({ length: 12 }, (_, i) =>
//         (i + 1).toString().padStart(2, "0")
//       );
//       const minutes = Array.from({ length: 60 }, (_, i) =>
//         i.toString().padStart(2, "0")
//       );
 
//       const handleSelectTime = () => {
//         handleTimeSelect(selectedHour, selectedMinute, selectedAmPm);
//       };
 
//       return (
//         <Paper elevation={8} sx={{ width: 280, p: 3, borderRadius: 3 }}>
//           <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
//             <ScheduleIcon sx={{ color: "#8C257C", mr: 1 }} />
//             <Typography variant="h6" sx={{ fontWeight: 600, color: "#8C257C" }}>
//               Select Time
//             </Typography>
//           </Box>
//           <Box
//             sx={{
//               display: "flex",
//               justifyContent: "space-between",
//               mb: 3,
//               gap: 1,
//             }}
//           >
//             <FormControl sx={{ flex: 1 }}>
//               <InputLabel id="hour-select-label" sx={{ fontSize: "0.875rem" }}>
//                 Hour
//               </InputLabel>
//               <Select
//                 labelId="hour-select-label"
//                 value={selectedHour}
//                 onChange={(e) => setSelectedHour(e.target.value)}
//                 label="Hour"
//                 size="small"
//                 sx={{ borderRadius: 2 }}
//               >
//                 {hours.map((hour) => (
//                   <MenuItem key={hour} value={hour}>
//                     {hour}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//             <FormControl sx={{ flex: 1 }}>
//               <InputLabel id="minute-select-label" sx={{ fontSize: "0.875rem" }}>
//                 Min
//               </InputLabel>
//               <Select
//                 labelId="minute-select-label"
//                 value={selectedMinute}
//                 onChange={(e) => setSelectedMinute(e.target.value)}
//                 label="Min"
//                 size="small"
//                 sx={{ borderRadius: 2 }}
//               >
//                 {minutes.map((minute) => (
//                   <MenuItem key={minute} value={minute}>
//                     {minute}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//             <FormControl sx={{ flex: 1 }}>
//               <InputLabel id="ampm-select-label" sx={{ fontSize: "0.875rem" }}>
//                 Period
//               </InputLabel>
//               <Select
//                 labelId="ampm-select-label"
//                 value={selectedAmPm}
//                 onChange={(e) => setSelectedAmPm(e.target.value)}
//                 label="Period"
//                 size="small"
//                 sx={{ borderRadius: 2 }}
//               >
//                 <MenuItem value="am">AM</MenuItem>
//                 <MenuItem value="pm">PM</MenuItem>
//               </Select>
//             </FormControl>
//           </Box>
//           <Box sx={{ display: "flex", justifyContent: "center", gap: 1 }}>
//             <Button
//               variant="outlined"
//               onClick={handleTimePickerClose}
//               sx={{
//                 borderColor: "#ddd",
//                 color: "#666",
//                 "&:hover": { borderColor: "#bbb" },
//               }}
//             >
//               Cancel
//             </Button>
//             <Button
//               variant="contained"
//               onClick={handleSelectTime}
//               sx={{
//                 bgcolor: "#8C257C",
//                 "&:hover": { bgcolor: "#701D62" },
//                 px: 3,
//               }}
//             >
//               Select
//             </Button>
//           </Box>
//         </Paper>
//       );
//     };
 
//     // Get employee name by ID
//     const getEmployeeNameById = (id) => {
//       const employee = employeesList.find((emp) => emp.id == id);
//       return employee ? employee.name : "Unknown Employee";
//     };
 
//     if (!isAuthenticated) {
//       return (
//         <ThemeProvider theme={theme}>
//           <CssBaseline />
//           <Box
//             sx={{
//               display: "flex",
//               flexDirection: "column",
//               minHeight: "100vh",
//               justifyContent: "center",
//               alignItems: "center",
//             }}
//           >
//             <Paper
//               elevation={3}
//               sx={{ p: 4, maxWidth: 500, textAlign: "center" }}
//             >
//               <LockIcon sx={{ fontSize: 60, color: "#8C257C", mb: 2 }} />
//               <Typography variant="h5" sx={{ mb: 2 }}>
//                 Authentication Required
//               </Typography>
//               <Typography variant="body1" sx={{ mb: 3 }}>
//                 You need to be logged in to access the Events Calendar. Please log
//                 in with your credentials.
//               </Typography>
//               <Button
//                 variant="contained"
//                 sx={{ bgcolor: "#8C257C", "&:hover": { bgcolor: "#701D62" } }}
//                 onClick={() => window.location.reload()}
//               >
//                 Refresh
//               </Button>
//             </Paper>
//           </Box>
//         </ThemeProvider>
//       );
//     }
 
//     return (
//       <ThemeProvider theme={theme}>
//         <CssBaseline />
//         <Box
//           sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
//         >
//           <Box sx={{ borderBottom: "1px solid #e0e0e0", p: 2, bgcolor: "white" }}>
//             <Box
//               sx={{
//                 display: "flex",
//                 alignItems: "center",
//                 width: "100%",
//                 maxWidth: 1200,
//                 mx: "auto",
//               }}
//             >
//               <Box sx={{ display: "flex", alignItems: "center", mr: 4 }}>
//                 <IconButton
//                   color={activeView === "events" ? "primary" : "default"}
//                   onClick={() => setActiveView("events")}
//                   sx={{
//                     borderRadius: 2,
//                     bgcolor:
//                       activeView === "events"
//                         ? "rgba(140, 37, 124, 0.1)"
//                         : "transparent",
//                     color: activeView === "events" ? "#8C257C" : "inherit",
//                   }}
//                 >
//                   <EventIcon />
//                 </IconButton>
//                 <Box sx={{ ml: 1 }}>
//                   <Typography
//                     variant="subtitle1"
//                     onClick={() => setActiveView("events")}
//                     sx={{
//                       fontWeight: activeView === "events" ? "bold" : "normal",
//                       cursor: "pointer",
//                       color: activeView === "events" ? "#8C257C" : "textPrimary",
//                     }}
//                   >
//                     Events
//                   </Typography>
//                   <Typography variant="caption" color="textSecondary">
//                     Set up Events
//                   </Typography>
//                 </Box>
//               </Box>
//               <Box sx={{ display: "flex", alignItems: "center" }}>
//                 <IconButton
//                   onClick={() => setActiveView("calendar")}
//                   sx={{
//                     borderRadius: 2,
//                     bgcolor:
//                       activeView === "calendar"
//                         ? "rgba(140, 37, 124, 0.1)"
//                         : "transparent",
//                     color: activeView === "calendar" ? "#8C257C" : "inherit",
//                   }}
//                 >
//                   <CalendarTodayIcon />
//                 </IconButton>
//                 <Box sx={{ ml: 1 }}>
//                   <Typography
//                     variant="subtitle1"
//                     onClick={() => setActiveView("calendar")}
//                     sx={{
//                       fontWeight: activeView === "calendar" ? "bold" : "normal",
//                       cursor: "pointer",
//                       color: activeView === "calendar" ? "#8C257C" : "textPrimary",
//                     }}
//                   >
//                     Calendar
//                   </Typography>
//                   <Typography variant="caption" color="textSecondary">
//                     Events Calendar
//                   </Typography>
//                 </Box>
//               </Box>
//               <Box sx={{ ml: "auto", display: "flex", alignItems: "center" }}>
//                 <Chip
//                   label={`Role: ${userRole || "User"}`}
//                   variant="outlined"
//                   size="small"
//                   sx={{ borderColor: "#8C257C", color: "#8C257C" }}
//                 />
//               </Box>
//             </Box>
//           </Box>
//           <Box sx={{ p: 3, flexGrow: 1, bgcolor: "#f5f5f9" }}>
//             <Box sx={{ maxWidth: 1200, mx: "auto" }}>
//               {activeView === "events" ? (
//                 <Grid container spacing={isMobile ? 0 : 3}>
//                   <Grid item xs={12} md={4}>
//                     <Paper
//                       elevation={2}
//                       sx={{
//                         p: isMobile ? 2 : 3,
//                         height: "100%",
//                         borderRadius: 3,
//                         mb: isMobile ? 2 : 0,
//                       }}
//                     >
//                       <Typography
//                         variant="h6"
//                         sx={{
//                           mb: 3,
//                           fontWeight: "bold",
//                           color: "#8C257C",
//                         }}
//                       >
//                         Add New Event
//                       </Typography>
//                       <Box sx={{ mb: 2 }}>
//                         <Typography
//                           variant="subtitle1"
//                           sx={{ mb: 1, fontWeight: 500 }}
//                         >
//                           Employee <span style={{ color: "red" }}>*</span>
//                         </Typography>
//                         <FormControl fullWidth>
//                           <Select
//                             value={newEvent.employee_id}
//                             onChange={(e) =>
//                               handleEventChange("employee_id", e.target.value)
//                             }
//                             displayEmpty
//                             sx={{ borderRadius: 2 }}
//                             startAdornment={
//                               <InputAdornment position="start">
//                                 <PersonIcon sx={{ color: "#8C257C", ml: 1 }} />
//                               </InputAdornment>
//                             }
//                           >
//                             <MenuItem value="">
//                               <em>Select Employee</em>
//                             </MenuItem>
//                             {employeesList.map((employee) => (
//                               <MenuItem key={employee.id} value={employee.id}>
//                                 {employee.name}
//                               </MenuItem>
//                             ))}
//                           </Select>
//                         </FormControl>
//                         {employeesList.length === 0 && (
//                           <Typography
//                             variant="caption"
//                             color="textSecondary"
//                             sx={{ mt: 1, display: "block" }}
//                           >
//                             Loading employees...
//                           </Typography>
//                         )}
//                       </Box>
//                       <Box sx={{ mb: 2 }}>
//                         <Typography
//                           variant="subtitle1"
//                           sx={{ mb: 1, fontWeight: 500 }}
//                         >
//                           Event Title <span style={{ color: "red" }}>*</span>
//                         </Typography>
//                         <TextField
//                           fullWidth
//                           placeholder="Enter event title"
//                           value={newEvent.event_title}
//                           onChange={(e) =>
//                             handleEventChange("event_title", e.target.value)
//                           }
//                           required
//                           sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
//                         />
//                       </Box>
//                       <Box sx={{ mb: 2 }}>
//                         <Typography
//                           variant="subtitle1"
//                           sx={{ mb: 1, fontWeight: 500 }}
//                         >
//                           Event Date <span style={{ color: "red" }}>*</span>
//                         </Typography>
//                         <TextField
//                           fullWidth
//                           placeholder="Select date"
//                           value={newEvent.event_date}
//                           onClick={handleDatePickerOpen}
//                           InputProps={{
//                             readOnly: true,
//                             endAdornment: (
//                               <InputAdornment position="end">
//                                 <CalendarTodayIcon sx={{ color: "#8C257C" }} />
//                               </InputAdornment>
//                             ),
//                           }}
//                           required
//                           sx={{
//                             "& .MuiOutlinedInput-root": {
//                               borderRadius: 2,
//                               cursor: "pointer",
//                             },
//                           }}
//                         />
//                         <Popover
//                           open={datePickerOpen}
//                           anchorEl={datePickerAnchorEl}
//                           onClose={handleDatePickerClose}
//                           anchorOrigin={{
//                             vertical: "bottom",
//                             horizontal: "left",
//                           }}
//                           transformOrigin={{
//                             vertical: "top",
//                             horizontal: "left",
//                           }}
//                         >
//                           <DatePicker />
//                         </Popover>
//                       </Box>
//                       <Box sx={{ mb: 2 }}>
//                         <Typography
//                           variant="subtitle1"
//                           sx={{ mb: 1, fontWeight: 500 }}
//                         >
//                           Event Time <span style={{ color: "red" }}>*</span>
//                         </Typography>
//                         <TextField
//                           fullWidth
//                           placeholder="Select time"
//                           value={newEvent.event_time}
//                           onClick={handleTimePickerOpen}
//                           InputProps={{
//                             readOnly: true,
//                             endAdornment: (
//                               <InputAdornment position="end">
//                                 <AccessTimeIcon sx={{ color: "#8C257C" }} />
//                               </InputAdornment>
//                             ),
//                           }}
//                           required
//                           sx={{
//                             "& .MuiOutlinedInput-root": {
//                               borderRadius: 2,
//                               cursor: "pointer",
//                             },
//                           }}
//                         />
//                         <Popover
//                           open={timePickerOpen}
//                           anchorEl={timePickerAnchorEl}
//                           onClose={handleTimePickerClose}
//                           anchorOrigin={{
//                             vertical: "bottom",
//                             horizontal: "left",
//                           }}
//                           transformOrigin={{
//                             vertical: "top",
//                             horizontal: "left",
//                           }}
//                         >
//                           <TimePicker />
//                         </Popover>
//                       </Box>
//                       <Box sx={{ mb: 2 }}>
//                         <Typography
//                           variant="subtitle1"
//                           sx={{ mb: 1, fontWeight: 500 }}
//                         >
//                           Event Color
//                         </Typography>
//                         <Box
//                           sx={{ display: "flex", alignItems: "center", gap: 1 }}
//                         >
//                           <Box
//                             sx={{
//                               width: 32,
//                               height: 32,
//                               bgcolor: newEvent.event_color,
//                               borderRadius: 2,
//                               border: "2px solid #e0e0e0",
//                               cursor: "pointer",
//                               transition: "transform 0.2s",
//                               "&:hover": { transform: "scale(1.1)" },
//                             }}
//                           />
//                           <TextField
//                             fullWidth
//                             value={newEvent.event_color}
//                             onChange={(e) =>
//                               handleEventChange("event_color", e.target.value)
//                             }
//                             sx={{
//                               "& .MuiOutlinedInput-root": { borderRadius: 2 },
//                             }}
//                           />
//                         </Box>
//                       </Box>
//                       <Box sx={{ mb: 3 }}>
//                         <Typography
//                           variant="subtitle1"
//                           sx={{ mb: 1, fontWeight: 500 }}
//                         >
//                           Event Note <span style={{ color: "red" }}>*</span>
//                         </Typography>
//                         <TextField
//                           fullWidth
//                           multiline
//                           rows={4}
//                           placeholder="Enter event description"
//                           value={newEvent.event_note}
//                           onChange={(e) =>
//                             handleEventChange("event_note", e.target.value)
//                           }
//                           required
//                           sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
//                         />
//                       </Box>
//                       <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
//                         <Button
//                           variant="contained"
//                           onClick={createEvent}
//                           disabled={loading}
//                           sx={{
//                             bgcolor: "#8C257C",
//                             "&:hover": { bgcolor: "#701D62" },
//                             px: 4,
//                             py: 1.5,
//                             borderRadius: 2,
//                             fontWeight: 600,
//                           }}
//                         >
//                           {loading ? "Saving..." : "Save Event"}
//                         </Button>
//                       </Box>
//                     </Paper>
//                   </Grid>
//                   <Grid item xs={12} md={8}>
//                     <Paper
//                       elevation={2}
//                       sx={{ p: isMobile ? 1 : 3, borderRadius: 3 }}
//                     >
//                       <Typography
//                         variant="h6"
//                         sx={{
//                           mb: 3,
//                           fontWeight: "bold",
//                           color: "#8C257C",
//                         }}
//                       >
//                         List All Events
//                       </Typography>
//                       <Box
//                         sx={{
//                           display: "flex",
//                           justifyContent: "flex-end",
//                           mb: 2,
//                         }}
//                       >
//                         <Box sx={{ display: "flex", alignItems: "center" }}>
//                           <Typography variant="body2" sx={{ mr: 1 }}>
//                             Search
//                           </Typography>
//                           <TextField
//                             size="small"
//                             value={searchTerm}
//                             onChange={handleSearch}
//                             placeholder="Search events..."
//                             InputProps={{
//                               endAdornment: (
//                                 <InputAdornment position="end">
//                                   <SearchIcon sx={{ color: "#8C257C" }} />
//                                 </InputAdornment>
//                               ),
//                             }}
//                             sx={{
//                               "& .MuiOutlinedInput-root": { borderRadius: 2 },
//                             }}
//                           />
//                         </Box>
//                       </Box>
//                       <TableContainer sx={{ borderRadius: 2 }}>
//                         <Table>
//                           <TableHead>
//                             <TableRow sx={{ bgcolor: "#f8f9fa" }}>
//                               <TableCell
//                                 onClick={() => requestSort("event_title")}
//                                 sx={{
//                                   fontWeight: "bold",
//                                   cursor: "pointer",
//                                   borderRadius: "8px 0 0 0",
//                                 }}
//                               >
//                                 <Box
//                                   sx={{ display: "flex", alignItems: "center" }}
//                                 >
//                                   EVENT TITLE
//                                   {sortConfig.key === "event_title" &&
//                                     (sortConfig.direction === "asc" ? (
//                                       <ArrowUpwardIcon fontSize="small" />
//                                     ) : (
//                                       <ArrowDownwardIcon fontSize="small" />
//                                     ))}
//                                 </Box>
//                               </TableCell>
//                               <TableCell
//                                 onClick={() => requestSort("employee_name")}
//                                 sx={{ fontWeight: "bold", cursor: "pointer" }}
//                               >
//                                 <Box
//                                   sx={{ display: "flex", alignItems: "center" }}
//                                 >
//                                   EMPLOYEE
//                                   {sortConfig.key === "employee_name" &&
//                                     (sortConfig.direction === "asc" ? (
//                                       <ArrowUpwardIcon fontSize="small" />
//                                     ) : (
//                                       <ArrowDownwardIcon fontSize="small" />
//                                     ))}
//                                 </Box>
//                               </TableCell>
//                               <TableCell
//                                 onClick={() => requestSort("event_date")}
//                                 sx={{ fontWeight: "bold", cursor: "pointer" }}
//                               >
//                                 <Box
//                                   sx={{ display: "flex", alignItems: "center" }}
//                                 >
//                                   EVENT DATE
//                                   {sortConfig.key === "event_date" &&
//                                     (sortConfig.direction === "asc" ? (
//                                       <ArrowUpwardIcon fontSize="small" />
//                                     ) : (
//                                       <ArrowDownwardIcon fontSize="small" />
//                                     ))}
//                                 </Box>
//                               </TableCell>
//                               <TableCell
//                                 onClick={() => requestSort("event_time")}
//                                 sx={{ fontWeight: "bold", cursor: "pointer" }}
//                               >
//                                 <Box
//                                   sx={{ display: "flex", alignItems: "center" }}
//                                 >
//                                   EVENT TIME
//                                   {sortConfig.key === "event_time" &&
//                                     (sortConfig.direction === "asc" ? (
//                                       <ArrowUpwardIcon fontSize="small" />
//                                     ) : (
//                                       <ArrowDownwardIcon fontSize="small" />
//                                     ))}
//                                 </Box>
//                               </TableCell>
//                               <TableCell
//                                 sx={{
//                                   fontWeight: "bold",
//                                   borderRadius: "0 8px 0 0",
//                                 }}
//                               >
//                                 ACTIONS
//                               </TableCell>
//                             </TableRow>
//                           </TableHead>
//                           <TableBody>
//                             {loading ? (
//                               <TableRow>
//                                 <TableCell
//                                   colSpan={5}
//                                   align="center"
//                                   sx={{ py: 4 }}
//                                 >
//                                   Loading events...
//                                 </TableCell>
//                               </TableRow>
//                             ) : paginatedEvents.length === 0 ? (
//                               <TableRow>
//                                 <TableCell
//                                   colSpan={5}
//                                   align="center"
//                                   sx={{ py: 4 }}
//                                 >
//                                   No events found
//                                 </TableCell>
//                               </TableRow>
//                             ) : (
//                               paginatedEvents.map((event) => (
//                                 <TableRow
//                                   key={event.event_id}
//                                   hover
//                                   sx={{
//                                     "&:hover": { bgcolor: "#f8f9fa" },
//                                     transition: "background-color 0.2s",
//                                   }}
//                                 >
//                                   <TableCell>
//                                     <Box
//                                       sx={{
//                                         display: "flex",
//                                         alignItems: "center",
//                                       }}
//                                     >
//                                       <Box
//                                         sx={{
//                                           width: 16,
//                                           height: 16,
//                                           bgcolor: event.event_color,
//                                           borderRadius: 1,
//                                           mr: 2,
//                                           boxShadow: 1,
//                                         }}
//                                       />
//                                       <Typography
//                                         variant="body2"
//                                         sx={{ fontWeight: 500 }}
//                                       >
//                                         {event.event_title}
//                                       </Typography>
//                                     </Box>
//                                   </TableCell>
//                                   <TableCell>
//                                     <Chip
//                                       label={
//                                         event.employee_name ||
//                                         getEmployeeNameById(event.employee_id)
//                                       }
//                                       size="small"
//                                       variant="outlined"
//                                       sx={{ borderRadius: 2 }}
//                                     />
//                                   </TableCell>
//                                   <TableCell>{event.event_date}</TableCell>
//                                   <TableCell>{event.event_time}</TableCell>
//                                   <TableCell>
//                                     <Box sx={{ display: "flex", gap: 1 }}>
//                                       <IconButton
//                                         size="small"
//                                         color="primary"
//                                         onClick={() =>
//                                           handleOpenEditDialog(event)
//                                         }
//                                         disabled={!hasPermission("edit")}
//                                         sx={{
//                                           borderRadius: 2,
//                                           "&:hover": {
//                                             bgcolor:
//                                               "rgba(140, 37, 124, 0.1)",
//                                           },
//                                         }}
//                                       >
//                                         <EditIcon fontSize="small" />
//                                       </IconButton>
//                                       <IconButton
//                                         size="small"
//                                         color="error"
//                                         onClick={() =>
//                                           handleOpenDeleteConfirm(event)
//                                         }
//                                         sx={{
//                                           borderRadius: 2,
//                                           "&:hover": { bgcolor: "#ffebee" },
//                                         }}
//                                       >
//                                         <DeleteIcon fontSize="small" />
//                                       </IconButton>
//                                     </Box>
//                                   </TableCell>
//                                 </TableRow>
//                               ))
//                             )}
//                           </TableBody>
//                         </Table>
//                       </TableContainer>
//                       <Box
//                         component="footer"
//                         sx={{
//                           display: "flex",
//                           justifyContent: { xs: "center", sm: "space-between" },
//                           alignItems: "center",
//                           flexDirection: { xs: "column", sm: "row" },
//                           mt: 2,
//                           gap: 2,
//                           width: "100%",
//                         }}
//                       >
//                         <Typography variant="body2" color="text.secondary">
//                           Showing{" "}
//                           {filteredEvents.length > 0 ? page * rowsPerPage + 1 : 0}{" "}
//                           to{" "}
//                           {Math.min(
//                             (page + 1) * rowsPerPage,
//                             filteredEvents.length
//                           )}{" "}
//                           of {filteredEvents.length} results
//                         </Typography>
//                         <TablePagination
//                           component="div"
//                           count={filteredEvents.length}
//                           page={page}
//                           onPageChange={handleChangePage}
//                           rowsPerPage={rowsPerPage}
//                           onRowsPerPageChange={handleChangeRowsPerPage}
//                           rowsPerPageOptions={[5, 10, 15, 25]}
//                           sx={{
//                             p: 0,
//                             ".MuiTablePagination-toolbar": {
//                               p: 0,
//                             },
//                             ".MuiIconButton-root": {
//                               color: "#8C257C",
//                             },
//                           }}
//                         />
//                       </Box>
//                     </Paper>
//                   </Grid>
//                 </Grid>
//               ) : (
//                 <Paper
//                   elevation={2}
//                   sx={{ p: isMobile ? 2 : 3, borderRadius: 3 }}
//                 >
//                   <Box
//                     sx={{
//                       display: "flex",
//                       justifyContent: "space-between",
//                       alignItems: "center",
//                       mb: 3,
//                     }}
//                   >
//                     <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//                       <IconButton
//                         onClick={goToPreviousMonth}
//                         sx={{
//                           bgcolor: "#f5f5f5",
//                           "&:hover": { bgcolor: "#e0e0e0" },
//                           borderRadius: 2,
//                         }}
//                       >
//                         <ArrowBackIcon />
//                       </IconButton>
//                       <Button
//                         variant="contained"
//                         onClick={goToToday}
//                         sx={{
//                           bgcolor: "#8C257C",
//                           "&:hover": { bgcolor: "#701D62" },
//                           borderRadius: 2,
//                           px: 3,
//                         }}
//                       >
//                         Today
//                       </Button>
//                       <IconButton
//                         onClick={goToNextMonth}
//                         sx={{
//                           bgcolor: "#f5f5f5",
//                           "&:hover": { bgcolor: "#e0e0e0" },
//                           borderRadius: 2,
//                         }}
//                       >
//                         <ArrowForwardIcon />
//                       </IconButton>
//                     </Box>
//                     <Typography
//                       variant="h5"
//                       sx={{ fontWeight: "bold", color: "#333" }}
//                     >
//                       {formatMonthYear(currentDate)}
//                     </Typography>
//                     <Box sx={{ display: "flex", gap: 1 }}>
//                       {["month", "week", "day", "list"].map((viewType) => (
//                         <Button
//                           key={viewType}
//                           variant={
//                             calendarViewType === viewType ? "contained" : "outlined"
//                           }
//                           onClick={() => setCalendarViewType(viewType)}
//                           size="small"
//                           sx={{
//                             bgcolor:
//                               calendarViewType === viewType
//                                 ? "#8C257C"
//                                 : "transparent",
//                             borderColor:
//                               calendarViewType === viewType ? "#8C257C" : "#ddd",
//                             color:
//                               calendarViewType === viewType ? "white" : "#8C257C",
//                             borderRadius: 2,
//                             textTransform: "capitalize",
//                             "&:hover": {
//                               bgcolor:
//                                 calendarViewType === viewType
//                                   ? "#701D62"
//                                   : "rgba(140, 37, 124, 0.04)",
//                             },
//                           }}
//                         >
//                           {viewType}
//                         </Button>
//                       ))}
//                     </Box>
//                   </Box>
//                   {calendarViewType === "month" && (
//                     <Box>
//                       <Grid container sx={{ mb: 1 }}>
//                         {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
//                           (day, index) => (
//                             <Grid
//                               item
//                               xs
//                               key={index}
//                               sx={{
//                                 textAlign: "center",
//                                 p: 2,
//                                 bgcolor: "#f8f9fa",
//                                 borderRadius:
//                                   index === 0
//                                     ? "8px 0 0 0"
//                                     : index === 6
//                                       ? "0 8px 0 0"
//                                       : "0",
//                               }}
//                             >
//                               <Typography
//                                 variant="subtitle2"
//                                 sx={{ fontWeight: "bold", color: "#666" }}
//                               >
//                                 {day}
//                               </Typography>
//                             </Grid>
//                           )
//                         )}
//                       </Grid>
//                       <Grid
//                         container
//                         sx={{ border: "1px solid #e0e0e0", borderRadius: 2 }}
//                       >
//                         {calendarDays.map((day, index) => (
//                           <Grid item xs key={index}>
//                             <Box
//                               sx={{
//                                 height: 140,
//                                 border: "1px solid #f0f0f0",
//                                 p: 1,
//                                 bgcolor: isToday(day.date)
//                                   ? "rgba(140, 37, 124, 0.1)"
//                                   : "white",
//                                 color: day.isCurrentMonth
//                                   ? "text.primary"
//                                   : "text.disabled",
//                                 transition: "all 0.2s ease",
//                                 "&:hover": {
//                                   bgcolor: isToday(day.date)
//                                     ? "rgba(140, 37, 124, 0.2)"
//                                     : "#f8f9fa",
//                                   transform: "scale(1.02)",
//                                 },
//                                 cursor: "pointer",
//                                 position: "relative",
//                                 overflow: "hidden",
//                               }}
//                             >
//                               <Typography
//                                 variant="body2"
//                                 sx={{
//                                   textAlign: "right",
//                                   fontWeight: isToday(day.date)
//                                     ? "bold"
//                                     : "normal",
//                                   color: isToday(day.date)
//                                     ? "#8C257C"
//                                     : "inherit",
//                                 }}
//                               >
//                                 {getDayNumber(day.date)}
//                               </Typography>
//                               <Box
//                                 sx={{
//                                   mt: 0.5,
//                                   maxHeight: 100,
//                                   overflowY: "auto",
//                                 }}
//                               >
//                                 {getEventsForDate(day.date)
//                                   .slice(0, 3)
//                                   .map((event, eventIndex) => (
//                                     <Tooltip
//                                       title={`${event.event_title} - ${event.event_time
//                                         }\n${event.employee_name ||
//                                         getEmployeeNameById(event.employee_id)
//                                         }`}
//                                       key={eventIndex}
//                                     >
//                                       <Fade in timeout={300 + eventIndex * 100}>
//                                         <Card
//                                           sx={{
//                                             bgcolor: event.event_color,
//                                             color: "white",
//                                             mb: 0.5,
//                                             cursor: "pointer",
//                                             transition: "all 0.2s ease",
//                                             "&:hover": {
//                                               transform: "scale(1.05)",
//                                               boxShadow: 2,
//                                             },
//                                           }}
//                                           onClick={(e) => {
//                                             e.stopPropagation();
//                                             handleOpenEditDialog(event);
//                                           }}
//                                         >
//                                           <CardContent
//                                             sx={{
//                                               p: 1,
//                                               "&:last-child": { pb: 1 },
//                                             }}
//                                           >
//                                             <Typography
//                                               variant="caption"
//                                               sx={{
//                                                 fontSize: "0.7rem",
//                                                 fontWeight: 500,
//                                                 display: "block",
//                                                 whiteSpace: "nowrap",
//                                                 overflow: "hidden",
//                                                 textOverflow: "ellipsis",
//                                               }}
//                                             >
//                                               {event.event_title}
//                                             </Typography>
//                                             <Typography
//                                               variant="caption"
//                                               sx={{
//                                                 fontSize: "0.65rem",
//                                                 opacity: 0.9,
//                                                 display: "block",
//                                               }}
//                                             >
//                                               {event.event_time}
//                                             </Typography>
//                                           </CardContent>
//                                         </Card>
//                                       </Fade>
//                                     </Tooltip>
//                                   ))}
//                                 {getEventsForDate(day.date).length > 3 && (
//                                   <Typography
//                                     variant="caption"
//                                     sx={{
//                                       color: "#8C257C",
//                                       fontWeight: "bold",
//                                       fontSize: "0.7rem",
//                                     }}
//                                   >
//                                     +{getEventsForDate(day.date).length - 3} more
//                                   </Typography>
//                                 )}
//                               </Box>
//                             </Box>
//                           </Grid>
//                         ))}
//                       </Grid>
//                     </Box>
//                   )}
//                   {calendarViewType === "week" && (
//                     <Box>
//                       <Grid container sx={{ mb: 1 }}>
//                         {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
//                           (day, index) => {
//                             const date = new Date(currentDate);
//                             const firstDayOfWeek = new Date(
//                               date.setDate(date.getDate() - date.getDay())
//                             );
//                             const dayDate = new Date(firstDayOfWeek);
//                             dayDate.setDate(firstDayOfWeek.getDate() + index);
 
//                             return (
//                               <Grid
//                                 item
//                                 xs
//                                 key={index}
//                                 sx={{
//                                   textAlign: "center",
//                                   p: 2,
//                                   bgcolor: isToday(dayDate)
//                                     ? "rgba(140, 37, 124, 0.1)"
//                                     : "#f8f9fa",
//                                   borderRadius:
//                                     index === 0
//                                       ? "8px 0 0 0"
//                                       : index === 6
//                                         ? "0 8px 0 0"
//                                         : "0",
//                                 }}
//                               >
//                                 <Typography
//                                   variant="subtitle2"
//                                   sx={{ fontWeight: "bold", color: "#666" }}
//                                 >
//                                   {day}
//                                 </Typography>
//                                 <Typography
//                                   variant="h6"
//                                   sx={{
//                                     fontWeight: isToday(dayDate) ? "bold" : "normal",
//                                     color: isToday(dayDate) ? "#8C257C" : "inherit",
//                                   }}
//                                 >
//                                   {dayDate.getDate()}
//                                 </Typography>
//                               </Grid>
//                             );
//                           }
//                         )}
//                       </Grid>
//                       <Box
//                         sx={{
//                           height: 600,
//                           overflowY: "auto",
//                           border: "1px solid #e0e0e0",
//                           borderRadius: 2,
//                         }}
//                       >
//                         {Array.from({ length: 24 }).map((_, hourIndex) => (
//                           <Box
//                             key={hourIndex}
//                             sx={{
//                               display: "flex",
//                               borderBottom:
//                                 hourIndex < 23 ? "1px solid #f0f0f0" : "none",
//                               height: 60,
//                               "&:hover": { bgcolor: "#f8f9fa" },
//                             }}
//                           >
//                             <Box
//                               sx={{
//                                 width: 80,
//                                 pr: 2,
//                                 textAlign: "right",
//                                 borderRight: "1px solid #e0e0e0",
//                                 display: "flex",
//                                 alignItems: "center",
//                                 justifyContent: "flex-end",
//                                 bgcolor: "#f8f9fa",
//                               }}
//                             >
//                               <Typography
//                                 variant="caption"
//                                 sx={{ fontWeight: 500, color: "#666" }}
//                               >
//                                 {hourIndex === 0
//                                   ? "12 AM"
//                                   : hourIndex < 12
//                                     ? `${hourIndex} AM`
//                                     : hourIndex === 12
//                                       ? "12 PM"
//                                       : `${hourIndex - 12} PM`}
//                               </Typography>
//                             </Box>
//                             <Grid container sx={{ flexGrow: 1 }}>
//                               {Array.from({ length: 7 }).map((_, dayIndex) => {
//                                 const date = new Date(currentDate);
//                                 const firstDayOfWeek = new Date(
//                                   date.setDate(date.getDate() - date.getDay())
//                                 );
//                                 const dayDate = new Date(firstDayOfWeek);
//                                 dayDate.setDate(
//                                   firstDayOfWeek.getDate() + dayIndex
//                                 );
//                                 const dayEvents = getEventsForDate(dayDate).filter(
//                                   (event) => {
//                                     if (!event.event_time) return false;
//                                     const [time, ampm] =
//                                       event.event_time.split(" ");
//                                     const [hour] = time.split(":");
//                                     let eventHour = Number.parseInt(hour, 10);
//                                     if (ampm === "pm" && eventHour !== 12) {
//                                       eventHour += 12;
//                                     } else if (ampm === "am" && eventHour === 12) {
//                                       eventHour = 0;
//                                     }
//                                     return eventHour === hourIndex;
//                                   }
//                                 );
 
//                                 return (
//                                   <Grid
//                                     item
//                                     xs
//                                     key={dayIndex}
//                                     sx={{
//                                       borderRight:
//                                         dayIndex < 6 ? "1px solid #f0f0f0" : "none",
//                                       position: "relative",
//                                       bgcolor: isToday(dayDate)
//                                         ? "rgba(140, 37, 124, 0.05)"
//                                         : "white",
//                                     }}
//                                   >
//                                     {dayEvents.map((event, eventIndex) => (
//                                       <Tooltip
//                                         title={`${event.event_title} - ${event.event_time
//                                           }\n${event.employee_name ||
//                                           getEmployeeNameById(event.employee_id)
//                                           }`}
//                                         key={eventIndex}
//                                       >
//                                         <Zoom in timeout={300}>
//                                           <Card
//                                             sx={{
//                                               position: "absolute",
//                                               top: 4, left: 4, right: 4,
//                                               bgcolor: event.event_color,
//                                               color: "white", cursor: "pointer",
//                                               transition: "all 0.2s ease",
//                                               "&:hover": {
//                                                 transform: "scale(1.05)",
//                                                 boxShadow: 3, zIndex: 10,
//                                               },
//                                               zIndex: 1,
//                                             }}
//                                             onClick={() =>
//                                               handleOpenEditDialog(event)
//                                             }
//                                           >
//                                             <CardContent
//                                               sx={{ p: 1, "&:last-child": { pb: 1 } }}
//                                             >
//                                               <Typography
//                                                 variant="caption"
//                                                 sx={{
//                                                   fontSize: "0.7rem",
//                                                   fontWeight: 500,
//                                                   whiteSpace: "nowrap",
//                                                   overflow: "hidden",
//                                                   textOverflow: "ellipsis",
//                                                 }}
//                                               >
//                                                 {event.event_title}
//                                               </Typography>
//                                             </CardContent>
//                                           </Card>
//                                         </Zoom>
//                                       </Tooltip>
//                                     ))}
//                                   </Grid>
//                                 );
//                               })}
//                             </Grid>
//                           </Box>
//                         ))}
//                       </Box>
//                     </Box>
//                   )}
//                   {calendarViewType === "day" && (
//                     <Box>
//                       <Paper
//                         elevation={1}
//                         sx={{
//                           p: 3, mb: 3, textAlign: "center",
//                           bgcolor: isToday(currentDate)
//                             ? "rgba(140, 37, 124, 0.1)"
//                             : "#f8f9fa",
//                           borderRadius: 3,
//                         }}
//                       >
//                         <Typography
//                           variant="h5"
//                           sx={{ fontWeight: "bold", color: "#333" }}
//                         >
//                           {currentDate.toLocaleDateString("default", {
//                             weekday: "long", day: "numeric", month: "long", year: "numeric",
//                           })}
//                         </Typography>
//                         <Typography
//                           variant="body2"
//                           color="textSecondary"
//                           sx={{ mt: 1 }}
//                         >
//                           {getEventsForDate(currentDate).length} events scheduled
//                         </Typography>
//                       </Paper>
//                       <Box
//                         sx={{
//                           height: 600,
//                           overflowY: "auto",
//                           border: "1px solid #e0e0e0",
//                           borderRadius: 2,
//                         }}
//                       >
//                         {Array.from({ length: 24 }).map((_, hourIndex) => (
//                           <Box
//                             key={hourIndex}
//                             sx={{
//                               display: "flex",
//                               borderBottom:
//                                 hourIndex < 23 ? "1px solid #f0f0f0" : "none",
//                               height: 80,
//                               "&:hover": { bgcolor: "#f8f9fa" },
//                             }}
//                           >
//                             <Box
//                               sx={{
//                                 width: 100, pr: 2, textAlign: "right",
//                                 borderRight: "1px solid #e0e0e0",
//                                 display: "flex", alignItems: "center",
//                                 justifyContent: "flex-end", bgcolor: "#f8f9fa",
//                               }}
//                             >
//                               <Typography
//                                 variant="body2"
//                                 sx={{ fontWeight: 500, color: "#666" }}
//                               >
//                                 {hourIndex === 0
//                                   ? "12:00 AM"
//                                   : hourIndex < 12
//                                     ? `${hourIndex}:00 AM`
//                                     : hourIndex === 12
//                                       ? "12:00 PM"
//                                       : `${hourIndex - 12}:00 PM`}
//                               </Typography>
//                             </Box>
//                             <Box sx={{ flexGrow: 1, position: "relative", p: 1 }}>
//                               {getEventsForDate(currentDate)
//                                 .filter((event) => {
//                                   if (!event.event_time) return false;
//                                   const [time, ampm] = event.event_time.split(" ");
//                                   const [hour] = time.split(":");
//                                   let eventHour = Number.parseInt(hour, 10);
//                                   if (ampm === "pm" && eventHour !== 12) {
//                                     eventHour += 12;
//                                   } else if (ampm === "am" && eventHour === 12) {
//                                     eventHour = 0;
//                                   }
//                                   return eventHour === hourIndex;
//                                 })
//                                 .map((event, eventIndex) => (
//                                   <Tooltip
//                                     title={`${event.event_title}\n${event.employee_name ||
//                                       getEmployeeNameById(event.employee_id)
//                                       }\n${event.event_note}`}
//                                     key={eventIndex}
//                                   >
//                                     <Zoom in timeout={300 + eventIndex * 100}>
//                                       <Card
//                                         sx={{
//                                           bgcolor: event.event_color,
//                                           color: "white", mb: 1, cursor: "pointer",
//                                           transition: "all 0.2s ease",
//                                           "&:hover": {
//                                             transform: "scale(1.02)",
//                                             boxShadow: 4,
//                                           },
//                                         }}
//                                         onClick={() => handleOpenEditDialog(event)}
//                                       >
//                                         <CardContent sx={{ p: 2 }}>
//                                           <Box
//                                             sx={{
//                                               display: "flex",
//                                               justifyContent: "space-between",
//                                               alignItems: "center",
//                                             }}
//                                           >
//                                             <Box>
//                                               <Typography
//                                                 variant="subtitle1"
//                                                 sx={{ fontWeight: 600 }}
//                                               >
//                                                 {event.event_title}
//                                               </Typography>
//                                               <Typography
//                                                 variant="body2"
//                                                 sx={{ opacity: 0.9 }}
//                                               >
//                                                 {event.event_time} •{" "}
//                                                 {event.employee_name ||
//                                                   getEmployeeNameById(
//                                                     event.employee_id
//                                                   )}
//                                               </Typography>
//                                             </Box>
//                                             <Box
//                                               sx={{ display: "flex", gap: 1 }}
//                                             >
//                                               <IconButton
//                                                 size="small"
//                                                 sx={{
//                                                   color: "white",
//                                                   "&:hover": {
//                                                     bgcolor: "rgba(255,255,255,0.2)",
//                                                   },
//                                                 }}
//                                                 onClick={(e) => {
//                                                   e.stopPropagation();
//                                                   handleOpenEditDialog(event);
//                                                 }}
//                                               >
//                                                 <EditIcon fontSize="small" />
//                                               </IconButton>
//                                             </Box>
//                                           </Box>
//                                         </CardContent>
//                                       </Card>
//                                     </Zoom>
//                                   </Tooltip>
//                                 ))}
//                             </Box>
//                           </Box>
//                         ))}
//                       </Box>
//                     </Box>
//                   )}
//                   {calendarViewType === "list" && (
//                     <Box>
//                       <TableContainer sx={{ borderRadius: 2 }}>
//                         <Table>
//                           <TableHead>
//                             <TableRow sx={{ bgcolor: "#f8f9fa" }}>
//                               <TableCell sx={{ fontWeight: "bold", borderRadius: "8px 0 0 0" }}>
//                                 EVENT TITLE
//                               </TableCell>
//                               <TableCell sx={{ fontWeight: "bold" }}>
//                                 EMPLOYEE
//                               </TableCell>
//                               <TableCell sx={{ fontWeight: "bold" }}>
//                                 EVENT DATE
//                               </TableCell>
//                               <TableCell sx={{ fontWeight: "bold" }}>
//                                 EVENT TIME
//                               </TableCell>
//                               <TableCell sx={{ fontWeight: "bold", borderRadius: "0 8px 0 0" }}>
//                                 ACTIONS
//                               </TableCell>
//                             </TableRow>
//                           </TableHead>
//                           <TableBody>
//                             {loading ? (
//                               <TableRow>
//                                 <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
//                                   Loading events...
//                                 </TableCell>
//                               </TableRow>
//                             ) : events.length === 0 ? (
//                               <TableRow>
//                                 <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
//                                   No events found
//                                 </TableCell>
//                               </TableRow>
//                             ) : (
//                               events.map((event) => (
//                                 <TableRow
//                                   key={event.event_id}
//                                   hover
//                                   sx={{
//                                     "&:hover": { bgcolor: "#f8f9fa" },
//                                     transition: "background-color 0.2s",
//                                   }}
//                                 >
//                                   <TableCell>
//                                     <Box sx={{ display: "flex", alignItems: "center" }}>
//                                       <Box
//                                         sx={{
//                                           width: 16, height: 16,
//                                           bgcolor: event.event_color,
//                                           borderRadius: 1, mr: 2, boxShadow: 1,
//                                         }}
//                                       />
//                                       <Typography
//                                         variant="body2"
//                                         sx={{ fontWeight: 500 }}
//                                       >
//                                         {event.event_title}
//                                       </Typography>
//                                     </Box>
//                                   </TableCell>
//                                   <TableCell>
//                                     <Chip
//                                       label={
//                                         event.employee_name ||
//                                         getEmployeeNameById(event.employee_id)
//                                       }
//                                       size="small"
//                                       variant="outlined"
//                                       sx={{ borderRadius: 2 }}
//                                     />
//                                   </TableCell>
//                                   <TableCell>{event.event_date}</TableCell>
//                                   <TableCell>{event.event_time}</TableCell>
//                                   <TableCell>
//                                     <Box sx={{ display: "flex", gap: 1 }}>
//                                       <IconButton
//                                         size="small"
//                                         color="primary"
//                                         onClick={() => handleOpenEditDialog(event)}
//                                         disabled={!hasPermission("edit")}
//                                         sx={{ borderRadius: 2, "&:hover": { bgcolor: "rgba(140, 37, 124, 0.1)" } }}
//                                       >
//                                         <EditIcon fontSize="small" />
//                                       </IconButton>
//                                       <IconButton
//                                         size="small"
//                                         color="error"
//                                         onClick={() => handleOpenDeleteConfirm(event)}
//                                         disabled={!hasPermission("delete")}
//                                         sx={{ borderRadius: 2, "&:hover": { bgcolor: "#ffebee" } }}
//                                       >
//                                         <DeleteIcon fontSize="small" />
//                                       </IconButton>
//                                     </Box>
//                                   </TableCell>
//                                 </TableRow>
//                               ))
//                             )}
//                           </TableBody>
//                         </Table>
//                       </TableContainer>
//                     </Box>
//                   )}
//                 </Paper>
//               )}
//             </Box>
//           </Box>
//         </Box>
 
//         {/* Edit Event Dialog */}
//         <Dialog
//           open={isEditDialogOpen}
//           onClose={handleCloseEditDialog}
//           maxWidth="sm"
//           fullWidth
//           PaperProps={{ sx: { borderRadius: 3 } }}
//         >
//           <DialogTitle sx={{ pb: 1 }}>
//             <Typography variant="h6" sx={{ fontWeight: "bold", color: "#333" }}>
//               Edit Event
//             </Typography>
//           </DialogTitle>
//           <DialogContent>
//             {editingEvent && (
//               <Box sx={{ mt: 2 }}>
//                 <Box sx={{ mb: 2 }}>
//                   <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 500 }}>
//                     Employee <span style={{ color: "red" }}>*</span>
//                   </Typography>
//                   <FormControl fullWidth>
//                     <Select
//                       value={editingEvent.employee_id}
//                       onChange={(e) =>
//                         handleEditingEventChange("employee_id", e.target.value)
//                       }
//                       displayEmpty
//                       sx={{ borderRadius: 2 }}
//                       renderValue={(selectedId) => {
//                         if (!selectedId) {
//                           return <em>Select Employee</em>;
//                         }
//                         const selectedEmployee = employeesList.find(
//                           (emp) => emp.id == selectedId
//                         );
//                         return selectedEmployee ? selectedEmployee.name : "";
//                       }}
//                     >
//                       <MenuItem value="">
//                         <em>Select Employee</em>
//                       </MenuItem>
//                       {employeesList.map((employee) => (
//                         <MenuItem key={employee.id} value={employee.id}>
//                           {employee.name}
//                         </MenuItem>
//                       ))}
//                     </Select>
//                   </FormControl>
//                 </Box>
 
//                 <Box sx={{ mb: 2 }}>
//                   <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 500 }}>
//                     Event Title <span style={{ color: "red" }}>*</span>
//                   </Typography>
//                   <TextField
//                     fullWidth
//                     placeholder="Event Title"
//                     value={editingEvent.event_title}
//                     onChange={(e) =>
//                       handleEditingEventChange("event_title", e.target.value)
//                     }
//                     required
//                     sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
//                   />
//                 </Box>
//                 <Box sx={{ mb: 2 }}>
//                   <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 500 }}>
//                     Event Date <span style={{ color: "red" }}>*</span>
//                   </Typography>
//                   <TextField
//                     fullWidth
//                     placeholder="Event Date"
//                     value={editingEvent.event_date}
//                     onClick={handleDatePickerOpen}
//                     InputProps={{
//                       readOnly: true,
//                       endAdornment: (
//                         <InputAdornment position="end">
//                           <CalendarTodayIcon sx={{ color: "#8C257C" }} />
//                         </InputAdornment>
//                       ),
//                     }}
//                     required
//                     sx={{
//                       "& .MuiOutlinedInput-root": {
//                         borderRadius: 2,
//                         cursor: "pointer",
//                       },
//                     }}
//                   />
//                 </Box>
//                 <Box sx={{ mb: 2 }}>
//                   <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 500 }}>
//                     Event Time <span style={{ color: "red" }}>*</span>
//                   </Typography>
//                   <TextField
//                     fullWidth
//                     placeholder="Event Time"
//                     value={editingEvent.event_time}
//                     onClick={handleTimePickerOpen}
//                     InputProps={{
//                       readOnly: true,
//                       endAdornment: (
//                         <InputAdornment position="end">
//                           <AccessTimeIcon sx={{ color: "#8C257C" }} />
//                         </InputAdornment>
//                       ),
//                     }}
//                     required
//                     sx={{
//                       "& .MuiOutlinedInput-root": {
//                         borderRadius: 2,
//                         cursor: "pointer",
//                       },
//                     }}
//                   />
//                 </Box>
//                 <Box sx={{ mb: 2 }}>
//                   <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 500 }}>
//                     Event Color
//                   </Typography>
//                   <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//                     <Box
//                       sx={{
//                         width: 32, height: 32, bgcolor: editingEvent.event_color,
//                         borderRadius: 2, border: "2px solid #e0e0e0",
//                         cursor: "pointer", transition: "transform 0.2s",
//                         "&:hover": { transform: "scale(1.1)" },
//                       }}
//                     />
//                     <TextField
//                       fullWidth
//                       value={editingEvent.event_color}
//                       onChange={(e) =>
//                         handleEditingEventChange("event_color", e.target.value)
//                       }
//                       sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
//                     />
//                   </Box>
//                 </Box>
//                 <Box sx={{ mb: 2 }}>
//                   <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 500 }}>
//                     Event Note <span style={{ color: "red" }}>*</span>
//                   </Typography>
//                   <TextField
//                     fullWidth
//                     multiline
//                     rows={4}
//                     placeholder="Event Note"
//                     value={editingEvent.event_note}
//                     onChange={(e) =>
//                       handleEditingEventChange("event_note", e.target.value)
//                     }
//                     required
//                     sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
//                   />
//                 </Box>
//               </Box>
//             )}
//           </DialogContent>
//           <DialogActions sx={{ p: 3, pt: 1 }}>
//             <Button
//               onClick={handleCloseEditDialog}
//               variant="outlined"
//               sx={{
//                 borderColor: "#ddd", color: "#666", borderRadius: 2,
//                 "&:hover": { borderColor: "#bbb" },
//               }}
//             >
//               Cancel
//             </Button>
//             <Button
//               onClick={updateEvent}
//               variant="contained"
//               disabled={loading}
//               sx={{
//                 bgcolor: "#8C257C", "&:hover": { bgcolor: "#701D62" },
//                 borderRadius: 2, px: 3,
//               }}
//             >
//               {loading ? "Updating..." : "Update Event"}
//             </Button>
//           </DialogActions>
//         </Dialog>
 
//         {/* Delete Confirmation Dialog */}
//         <Dialog
//           open={deleteConfirmOpen}
//           onClose={handleCloseDeleteConfirm}
//           PaperProps={{ sx: { borderRadius: 3 } }}
//         >
//           <DialogTitle sx={{ pb: 1 }}>
//             <Typography variant="h6" sx={{ fontWeight: "bold", color: "#d32f2f" }}>
//               Confirm Delete
//             </Typography>
//           </DialogTitle>
//           <DialogContent>
//             <Typography variant="body1">
//               Are you sure you want to delete the event "
//               {eventToDelete?.event_title}"?
//             </Typography>
//             <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
//               This action cannot be undone.
//             </Typography>
//           </DialogContent>
//           <DialogActions sx={{ p: 3, pt: 1 }}>
//             <Button
//               onClick={handleCloseDeleteConfirm}
//               variant="outlined"
//               sx={{
//                 borderColor: "#ddd", color: "#666", borderRadius: 2,
//                 "&:hover": { borderColor: "#bbb" },
//               }}
//             >
//               Cancel
//             </Button>
//             <Button
//               onClick={deleteEvent}
//               color="error"
//               variant="contained"
//               disabled={loading}
//               sx={{ borderRadius: 2, px: 3 }}
//             >
//               {loading ? "Deleting..." : "Delete Event"}
//             </Button>
//           </DialogActions>
//         </Dialog>
 
//         {/* Notification Snackbar */}
//         <Snackbar
//           open={notification.open}
//           autoHideDuration={6000}
//           onClose={handleCloseNotification}
//           anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
//         >
//           <Alert
//             onClose={handleCloseNotification}
//             severity={notification.severity}
//             sx={{
//               width: "100%", borderRadius: 2,
//               "& .MuiAlert-icon": { fontSize: "1.2rem" },
//             }}
//           >
//             {notification.message}
//           </Alert>
//         </Snackbar>
//       </ThemeProvider>
//     );
//   }
 
//   export default EventsAdmin;














// import React, { useState, useEffect } from "react";
// import {
//   ThemeProvider,
//   createTheme,
//   Box,
//   Paper,
//   Typography,
//   Button,
//   IconButton,
//   TextField,
//   Select,
//   MenuItem,
//   FormControl,
//   InputLabel,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Grid,
//   CssBaseline,
//   InputAdornment,
//   Popover,
//   Tooltip,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Snackbar,
//   Alert,
//   Chip,
//   Card,
//   CardContent,
//   Fade,
//   Zoom,
//   useMediaQuery,
//   TablePagination,
// } from "@mui/material";
// import {
//   CalendarToday as CalendarTodayIcon,
//   Event as EventIcon,
//   ArrowBack as ArrowBackIcon,
//   ArrowForward as ArrowForwardIcon,
//   AccessTime as AccessTimeIcon,
//   Search as SearchIcon,
//   ArrowUpward as ArrowUpwardIcon,
//   ArrowDownward as ArrowDownwardIcon,
//   Edit as EditIcon,
//   Delete as DeleteIcon,
//   Lock as LockIcon,
//   Person as PersonIcon,
//   Schedule as ScheduleIcon,
//   Today as TodayIcon,
// } from "@mui/icons-material";
// import axios from "axios";
 
// const theme = createTheme({
//   palette: {
//     primary: {
//       main: "#8C257C",
//     },
//     secondary: {
//       main: "#f50057",
//     },
//     background: {
//       default: "#f5f5f9",
//     },
//   },
//   components: {
//     MuiTableCell: {
//       styleOverrides: {
//         root: {
//           padding: "8px 16px",
//         },
//       },
//     },
//     MuiButton: {
//       styleOverrides: {
//         root: {
//           textTransform: "none",
//           borderRadius: "8px",
//         },
//       },
//     },
//     MuiPaper: {
//       styleOverrides: {
//         root: {
//           borderRadius: "12px",
//         },
//       },
//     },
//   },
// });
 
// function EventsAdmin() {
//   const [activeView, setActiveView] = useState("events");
//   const [calendarViewType, setCalendarViewType] = useState("month");
 
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
 
//   const [authToken, setAuthToken] = useState("");
//   const [userRole, setUserRole] = useState("");
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
 
//   const [employeesList, setEmployeesList] = useState([]);
//   const [loadingEmployees, setLoadingEmployees] = useState(false);
 
//   const [events, setEvents] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
 
//   const [newEvent, setNewEvent] = useState({
//     event_title: "",
//     employee_id: "",
//     event_date: "",
//     event_time: "",
//     event_color: "#8C257C",
//     event_note: "",
//   });
 
//   const [editingEvent, setEditingEvent] = useState(null);
//   const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
 
//   const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
//   const [eventToDelete, setEventToDelete] = useState(null);
 
//   const [notification, setNotification] = useState({
//     open: false,
//     message: "",
//     severity: "success",
//   });
 
//   const [currentDate, setCurrentDate] = useState(new Date());
//   const [calendarDays, setCalendarDays] = useState([]);
 
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(15);
//   const [searchTerm, setSearchTerm] = useState("");
 
//   const [sortConfig, setSortConfig] = useState({
//     key: null,
//     direction: "asc",
//   });
 
//   const [datePickerOpen, setDatePickerOpen] = useState(false);
//   const [datePickerAnchorEl, setDatePickerAnchorEl] = useState(null);
 
//   const [timePickerOpen, setTimePickerOpen] = useState(false);
//   const [timePickerAnchorEl, setTimePickerAnchorEl] = useState(null);
 
//   useEffect(() => {
//     const token = localStorage.getItem("accessToken");
//     const role = localStorage.getItem("userRole");
 
//     if (token) {
//       setAuthToken(token);
//       setUserRole(role || "admin");
//       setIsAuthenticated(true);
//     } else {
//       setAuthToken("demo-token");
//       setUserRole("admin");
//       setIsAuthenticated(true);
//       setNotification({
//         open: true,
//         message: "Demo mode: Authentication simulated",
//         severity: "info",
//       });
//     }
//   }, []);
 
//   const getAuthHeaders = () => {
//     const headers = {
//       "Content-Type": "application/json",
//     };
 
//     if (authToken && authToken !== "demo-token") {
//       headers["Authorization"] = `Bearer ${authToken}`;
//     }
 
//     return headers;
//   };
 
//   const handleAuthError = (error) => {
//     if (error.status === 401) {
//       setNotification({
//         open: true,
//         message: "Authentication expired. Please log in again.",
//         severity: "error",
//       });
//       setIsAuthenticated(false);
//       localStorage.removeItem("accessToken");
//       localStorage.removeItem("userRole");
//     }
//     return error;
//   };
 
//   useEffect(() => {
//     const fetchEmployees = async () => {
//       try {
//         const token = localStorage.getItem("accessToken");
//         const response = await axios.get(
//           "https://tdtlworld.com/hrms-backend/employee-dropdown/",
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
 
//         const formattedData = response.data.map((emp) => ({
//           id: emp.value,
//           emp_id: emp.emp_id,
//           name: emp.label,
//           email: emp.email,
//         }));
 
//         setEmployeesList(formattedData);
//       } catch (error) {
//         console.error("Failed to fetch employee list", error);
//       }
//     };
 
//     fetchEmployees();
//   }, []);
 
//   const fetchEvents = async () => {
//     if (!isAuthenticated) {
//       setNotification({
//         open: true,
//         message: "Authentication required to fetch events.",
//         severity: "warning",
//       });
//       return;
//     }
 
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await fetch(
//         "https://tdtlworld.com/hrms-backend/events/",
//         {
//           method: "GET",
//           headers: getAuthHeaders(),
//         }
//       );
 
//       if (response.status === 401) {
//         throw handleAuthError({ status: 401 });
//       }
 
//       if (!response.ok) {
//         throw new Error(`Failed to fetch events: ${response.status}`);
//       }
 
//       const data = await response.json();
 
//       const transformedEvents = Array.isArray(data)
//         ? data.map((event) => ({
//             event_id: event.event_id,
//             company_id: event.company_id,
//             employee_id: event.employee_id,
//             employee_name: event.employee_name,
//             event_title: event.event_title,
//             event_date: formatDateFromAPI(event.event_date),
//             event_time: formatTimeFromAPI(event.event_time),
//             event_color: event.event_color || "#8C257C",
//             event_note: event.event_note,
//             created_at: event.created_at,
//           }))
//         : [];
 
//       setEvents(transformedEvents);
//     } catch (err) {
//       if (err.status !== 401) {
//         setError(err.message);
//         setNotification({
//           open: true,
//           message: `Error fetching events: ${err.message}`,
//           severity: "error",
//         });
//       }
//     } finally {
//       setLoading(false);
//     }
//   };
 
//   const createEvent = async () => {
//     if (!isAuthenticated) {
//       setNotification({
//         open: true,
//         message: "Authentication required to create events.",
//         severity: "warning",
//       });
//       return;
//     }
 
//     if (!validateEventForm()) {
//       return;
//     }
 
//     setLoading(true);
//     setError(null);
 
//     try {
//       const [day, month, year] = newEvent.event_date.split("/");
//       const formattedDate = `${year}-${month.padStart(2, "0")}-${day.padStart(
//         2,
//         "0"
//       )}`;
 
//       const formattedTime = formatTimeForAPI(newEvent.event_time);
 
//       const selectedEmployee = employeesList.find(
//         (emp) => emp.id == newEvent.employee_id
//       );
 
//       if (!selectedEmployee) {
//         setNotification({
//           open: true,
//           message:
//             "Could not find employee details. Please select an employee.",
//           severity: "error",
//         });
//         setLoading(false);
//         return;
//       }
 
//       const payload = {
//         company_id: 2,
//         employee_id: selectedEmployee.emp_id,
//         event_title: newEvent.event_title,
//         event_date: formattedDate,
//         event_time: formattedTime,
//         event_color: newEvent.event_color,
//         event_note: newEvent.event_note,
//       };
 
//       const response = await fetch(
//         "https://tdtlworld.com/hrms-backend/events/",
//         {
//           method: "POST",
//           headers: getAuthHeaders(),
//           body: JSON.stringify(payload),
//         }
//       );
 
//       if (response.status === 401) {
//         throw handleAuthError({ status: 401 });
//       }
 
//       if (!response.ok) {
//         const errorData = await response.text();
//         throw new Error(
//           `Failed to create event: ${response.status} - ${errorData}`
//         );
//       }
 
//       await fetchEvents();
 
//       resetEventForm();
 
//       setNotification({
//         open: true,
//         message: "Event created successfully",
//         severity: "success",
//       });
//     } catch (err) {
//       if (err.status !== 401) {
//         setError(err.message);
//         setNotification({
//           open: true,
//           message: `Error creating event: ${err.message}`,
//           severity: "error",
//         });
//       }
//     } finally {
//       setLoading(false);
//     }
//   };
 
//   const updateEvent = async () => {
//     if (!isAuthenticated) {
//       setNotification({
//         open: true,
//         message: "Authentication required to update events.",
//         severity: "warning",
//       });
//       return;
//     }
 
//     if (!editingEvent || !validateEventForm(editingEvent)) {
//       return;
//     }
 
//     setLoading(true);
//     setError(null);
 
//     try {
//       const [day, month, year] = editingEvent.event_date.split("/");
//       const formattedDate = `${year}-${month.padStart(2, "0")}-${day.padStart(
//         2,
//         "0"
//       )}`;
 
//       const formattedTime = formatTimeForAPI(editingEvent.event_time);
 
//       const selectedEmployee = employeesList.find(
//         (emp) => emp.id == editingEvent.employee_id
//       );
 
//       if (!selectedEmployee) {
//         setNotification({
//           open: true,
//           message:
//             "Could not find employee details. Please select an employee.",
//           severity: "error",
//         });
//         setLoading(false);
//         return;
//       }
 
//       const payload = {
//         company_id: 2,
//         employee_id: selectedEmployee.emp_id,
//         event_title: editingEvent.event_title,
//         event_date: formattedDate,
//         event_time: formattedTime,
//         event_color: editingEvent.event_color,
//         event_note: editingEvent.event_note,
//       };
 
//       const response = await fetch(
//         `https://tdtlworld.com/hrms-backend/events/${editingEvent.event_id}/`,
//         {
//           method: "PATCH",
//           headers: getAuthHeaders(),
//           body: JSON.stringify(payload),
//         }
//       );
 
//       if (response.status === 401) {
//         throw handleAuthError({ status: 401 });
//       }
 
//       if (!response.ok) {
//         const errorData = await response.text();
//         throw new Error(
//           `Failed to update event: ${response.status} - ${errorData}`
//         );
//       }
 
//       await fetchEvents();
 
//       setIsEditDialogOpen(false);
//       setEditingEvent(null);
 
//       setNotification({
//         open: true,
//         message: "Event updated successfully",
//         severity: "success",
//       });
//     } catch (err) {
//       if (err.status !== 401) {
//         setError(err.message);
//         setNotification({
//           open: true,
//           message: `Error updating event: ${err.message}`,
//           severity: "error",
//         });
//       }
//     } finally {
//       setLoading(false);
//     }
//   };
 
//   const deleteEvent = async () => {
//     if (!isAuthenticated) {
//       setNotification({
//         open: true,
//         message: "Authentication required to delete events.",
//         severity: "warning",
//       });
//       return;
//     }
 
//     if (!eventToDelete) {
//       return;
//     }
 
//     setLoading(true);
//     setError(null);
 
//     try {
//       const response = await fetch(
//         `https://tdtlworld.com/hrms-backend/events/${eventToDelete.event_id}/`,
//         {
//           method: "DELETE",
//           headers: getAuthHeaders(),
//         }
//       );
 
//       if (response.status === 401) {
//         throw handleAuthError({ status: 401 });
//       }
 
//       if (!response.ok) {
//         const errorData = await response.text();
//         throw new Error(
//           `Failed to delete event: ${response.status} - ${errorData}`
//         );
//       }
 
//       await fetchEvents();
 
//       setDeleteConfirmOpen(false);
//       setEventToDelete(null);
 
//       setNotification({
//         open: true,
//         message: "Event deleted successfully",
//         severity: "success",
//       });
//     } catch (err) {
//       if (err.status !== 401) {
//         setError(err.message);
//         setNotification({
//           open: true,
//           message: `Error deleting event: ${err.message}`,
//           severity: "error",
//         });
//       }
//     } finally {
//       setLoading(false);
//     }
//   };
 
//   const formatDateFromAPI = (dateString) => {
//     if (!dateString) return "";
//     const [year, month, day] = dateString.split("-");
//     return `${day.padStart(2, "0")}/${month.padStart(2, "0")}/${year}`;
//   };
 
//   const formatTimeFromAPI = (timeString) => {
//     if (!timeString) return "";
 
//     const timeParts = timeString.split(":");
//     let hours = Number.parseInt(timeParts[0], 10);
//     const minutes = timeParts[1] ? timeParts[1].padStart(2, "0") : "00";
 
//     const ampm = hours >= 12 ? "pm" : "am";
//     hours = hours % 12;
//     hours = hours ? hours : 12;
 
//     return `${hours}:${minutes} ${ampm}`;
//   };
 
//   const formatTimeForAPI = (timeString) => {
//     if (!timeString) return "";
 
//     const [time, ampm] = timeString.split(" ");
//     let [hours, minutes] = time.split(":");
 
//     hours = Number.parseInt(hours, 10);
//     if (ampm && ampm.toLowerCase() === "pm" && hours < 12) {
//       hours += 12;
//     } else if (ampm && ampm.toLowerCase() === "am" && hours === 12) {
//       hours = 0;
//     }
 
//     return `${hours.toString().padStart(2, "0")}:${minutes.padStart(
//       2,
//       "0"
//     )}:00.000000`;
//   };
 
//   const validateEventForm = (eventData = newEvent) => {
//     if (!eventData.employee_id) {
//       setNotification({
//         open: true,
//         message: "Please select an employee",
//         severity: "error",
//       });
//       return false;
//     }
 
//     if (!eventData.event_title) {
//       setNotification({
//         open: true,
//         message: "Event title is required",
//         severity: "error",
//       });
//       return false;
//     }
 
//     if (!eventData.event_date) {
//       setNotification({
//         open: true,
//         message: "Event date is required",
//         severity: "error",
//       });
//       return false;
//     }
 
//     if (!eventData.event_time) {
//       setNotification({
//         open: true,
//         message: "Event time is required",
//         severity: "error",
//       });
//       return false;
//     }
 
//     if (!eventData.event_note) {
//       setNotification({
//         open: true,
//         message: "Event note is required",
//         severity: "error",
//       });
//       return false;
//     }
 
//     return true;
//   };
 
//   const resetEventForm = () => {
//     setNewEvent({
//       event_title: "",
//       employee_id: employeesList.length > 0 ? employeesList[0].id : "",
//       event_date: "",
//       event_time: "",
//       event_color: "#8C257C",
//       event_note: "",
//     });
//   };
 
//   const handleEventChange = (field, value) => {
//     setNewEvent({
//       ...newEvent,
//       [field]: value,
//     });
//   };
 
//   const handleEditingEventChange = (field, value) => {
//     setEditingEvent({
//       ...editingEvent,
//       [field]: value,
//     });
//   };
 
//   const handleOpenEditDialog = (event) => {
//     const matchingEmployee = employeesList.find(
//       (emp) => emp.emp_id === event.employee_id
//     );
 
//     setEditingEvent({
//       ...event,
//       employee_id: matchingEmployee ? matchingEmployee.id : "",
//     });
 
//     setIsEditDialogOpen(true);
//   };
 
//   const handleCloseEditDialog = () => {
//     setIsEditDialogOpen(false);
//     setEditingEvent(null);
//   };
 
//   const handleOpenDeleteConfirm = (event) => {
//     setEventToDelete(event);
//     setDeleteConfirmOpen(true);
//   };
 
//   const handleCloseDeleteConfirm = () => {
//     setDeleteConfirmOpen(false);
//     setEventToDelete(null);
//   };
 
//   const handleCloseNotification = () => {
//     setNotification({
//       ...notification,
//       open: false,
//     });
//   };
 
//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };
 
//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(Number.parseInt(event.target.value, 10));
//     setPage(0);
//   };
 
//   const handleSearch = (e) => {
//     setSearchTerm(e.target.value);
//     setPage(0);
//   };
 
//   const requestSort = (key) => {
//     let direction = "asc";
//     if (sortConfig.key === key && sortConfig.direction === "asc") {
//       direction = "desc";
//     }
//     setSortConfig({ key, direction });
//   };
 
//   useEffect(() => {
//     const generateCalendarDays = () => {
//       const year = currentDate.getFullYear();
//       const month = currentDate.getMonth();
 
//       const firstDay = new Date(year, month, 1);
//       const lastDay = new Date(year, month + 1, 0);
//       const firstDayOfWeek = firstDay.getDay();
//       const daysFromPrevMonth = firstDayOfWeek;
//       const totalDays = 42;
//       const days = [];
//       const prevMonth = new Date(year, month, 0);
//       const prevMonthDays = prevMonth.getDate();
 
//       for (
//         let i = prevMonthDays - daysFromPrevMonth + 1;
//         i <= prevMonthDays;
//         i++
//       ) {
//         days.push({
//           date: new Date(year, month - 1, i),
//           isCurrentMonth: false,
//           events: [],
//         });
//       }
//       for (let i = 1; i <= lastDay.getDate(); i++) {
//         days.push({
//           date: new Date(year, month, i),
//           isCurrentMonth: true,
//           events: [],
//         });
//       }
//       const remainingDays = totalDays - days.length;
//       for (let i = 1; i <= remainingDays; i++) {
//         days.push({
//           date: new Date(year, month + 1, i),
//           isCurrentMonth: false,
//           events: [],
//         });
//       }
//       setCalendarDays(days);
//     };
//     generateCalendarDays();
//   }, [currentDate]);
 
//   useEffect(() => {
//     if (isAuthenticated) {
//       fetchEvents();
//     }
//   }, [isAuthenticated]);
 
//   const filteredEvents = events.filter(
//     (event) =>
//       event.event_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       event.event_date.includes(searchTerm) ||
//       event.event_time.includes(searchTerm) ||
//       (event.employee_name &&
//         event.employee_name.toLowerCase().includes(searchTerm.toLowerCase()))
//   );
 
//   const sortedEvents = React.useMemo(() => {
//     const sortableEvents = [...filteredEvents];
//     if (sortConfig.key) {
//       sortableEvents.sort((a, b) => {
//         if (a[sortConfig.key] < b[sortConfig.key]) {
//           return sortConfig.direction === "asc" ? -1 : 1;
//         }
//         if (a[sortConfig.key] > b[sortConfig.key]) {
//           return sortConfig.direction === "asc" ? 1 : -1;
//         }
//         return 0;
//       });
//     }
//     return sortableEvents;
//   }, [filteredEvents, sortConfig]);
 
//   const paginatedEvents = sortedEvents.slice(
//     page * rowsPerPage,
//     page * rowsPerPage + rowsPerPage
//   );
 
//   const goToPreviousMonth = () => {
//     setCurrentDate(
//       new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
//     );
//   };
 
//   const goToNextMonth = () => {
//     setCurrentDate(
//       new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
//     );
//   };
 
//   const goToToday = () => {
//     setCurrentDate(new Date());
//   };
 
//   function formatMonthYear(date) {
//     return date.toLocaleString("en-US", { month: "long", year: "numeric" });
//   }
 
//   const getDayNumber = (date) => {
//     return date.getDate();
//   };
 
//   const isToday = (date) => {
//     const today = new Date();
//     return (
//       date.getDate() === today.getDate() &&
//       date.getMonth() === today.getMonth() &&
//       date.getFullYear() === today.getFullYear()
//     );
//   };
 
//   const handleDatePickerOpen = (event, isEditing = false) => {
//     setDatePickerAnchorEl(event.currentTarget);
//     setDatePickerOpen(true);
//   };
 
//   const handleDatePickerClose = () => {
//     setDatePickerOpen(false);
//   };
 
//   const handleDateSelect = (date) => {
//     const day = date.getDate().toString().padStart(2, "0");
//     const month = (date.getMonth() + 1).toString().padStart(2, "0");
//     const year = date.getFullYear();
//     const formattedDate = `${day}/${month}/${year}`;
 
//     if (editingEvent) {
//       handleEditingEventChange("event_date", formattedDate);
//     } else {
//       handleEventChange("event_date", formattedDate);
//     }
 
//     handleDatePickerClose();
//   };
 
//   const handleTimePickerOpen = (event) => {
//     setTimePickerAnchorEl(event.currentTarget);
//     setTimePickerOpen(true);
//   };
 
//   const handleTimePickerClose = () => {
//     setTimePickerOpen(false);
//   };
 
//   const handleTimeSelect = (hours, minutes, ampm) => {
//     const formattedTime = `${hours}:${minutes} ${ampm}`;
 
//     if (editingEvent) {
//       handleEditingEventChange("event_time", formattedTime);
//     } else {
//       handleEventChange("event_time", formattedTime);
//     }
 
//     handleTimePickerClose();
//   };
 
//   const getEventsForDate = (date) => {
//     return events.filter((event) => {
//       if (!event.event_date) return false;
//       const [day, month, year] = event.event_date.split("/");
//       const eventDate = new Date(
//         Number.parseInt(year),
//         Number.parseInt(month) - 1,
//         Number.parseInt(day)
//       );
//       return (
//         eventDate.getDate() === date.getDate() &&
//         eventDate.getMonth() === date.getMonth() &&
//         eventDate.getFullYear() === date.getFullYear()
//       );
//     });
//   };
 
//   const hasPermission = (action) => {
//     if (!isAuthenticated) return false;
//     if (action === "delete" && userRole !== "admin") return false;
//     return true;
//   };
 
//   const DatePicker = () => {
//     const [pickerDate, setPickerDate] = useState(new Date());
//     const [pickerDays, setPickerDays] = useState([]);
 
//     useEffect(() => {
//       const generatePickerDays = () => {
//         const year = pickerDate.getFullYear();
//         const month = pickerDate.getMonth();
//         const firstDay = new Date(year, month, 1);
//         const lastDay = new Date(year, month + 1, 0);
//         const firstDayOfWeek = firstDay.getDay();
//         const daysFromPrevMonth = firstDayOfWeek;
//         const totalDays = 42;
//         const days = [];
//         const prevMonth = new Date(year, month, 0);
//         const prevMonthDays = prevMonth.getDate();
 
//         for (
//           let i = prevMonthDays - daysFromPrevMonth + 1;
//           i <= prevMonthDays;
//           i++
//         ) {
//           days.push({
//             date: new Date(year, month - 1, i),
//             isCurrentMonth: false,
//           });
//         }
//         for (let i = 1; i <= lastDay.getDate(); i++) {
//           days.push({
//             date: new Date(year, month, i),
//             isCurrentMonth: true,
//           });
//         }
//         const remainingDays = totalDays - days.length;
//         for (let i = 1; i <= remainingDays; i++) {
//           days.push({
//             date: new Date(year, month + 1, i),
//             isCurrentMonth: false,
//           });
//         }
//         setPickerDays(days);
//       };
//       generatePickerDays();
//     }, [pickerDate]);
 
//     const goToPreviousMonth = () => {
//       setPickerDate(
//         new Date(pickerDate.getFullYear(), pickerDate.getMonth() - 1, 1)
//       );
//     };
 
//     const goToNextMonth = () => {
//       setPickerDate(
//         new Date(pickerDate.getFullYear(), pickerDate.getMonth() + 1, 1)
//       );
//     };
//     return (
//       <Paper elevation={8} sx={{ width: 320, p: 3, borderRadius: 3 }}>
//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             mb: 3,
//           }}
//         >
//           <IconButton
//             onClick={goToPreviousMonth}
//             size="small"
//             sx={{
//               bgcolor: "#f5f5f5",
//               "&:hover": { bgcolor: "#e0e0e0" },
//               borderRadius: 2,
//             }}
//           >
//             <ArrowBackIcon />
//           </IconButton>
//           <Typography variant="h6" sx={{ fontWeight: 600, color: "#8C257C" }}>
//             {pickerDate.toLocaleString("default", {
//               month: "long",
//               year: "numeric",
//             })}
//           </Typography>
//           <IconButton
//             onClick={goToNextMonth}
//             size="small"
//             sx={{
//               bgcolor: "#f5f5f5",
//               "&:hover": { bgcolor: "#e0e0e0" },
//               borderRadius: 2,
//             }}
//           >
//             <ArrowForwardIcon />
//           </IconButton>
//         </Box>
//         <Grid container spacing={0.5}>
//           {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day, index) => (
//             <Grid item xs key={index} sx={{ textAlign: "center", p: 1 }}>
//               <Typography
//                 variant="caption"
//                 sx={{
//                   fontWeight: "bold",
//                   color: "#666",
//                   fontSize: "0.75rem",
//                 }}
//               >
//                 {day}
//               </Typography>
//             </Grid>
//           ))}
//         </Grid>
//         <Grid container spacing={0.5}>
//           {pickerDays.map((day, index) => (
//             <Grid item xs key={index}>
//               <Box
//                 sx={{
//                   display: "flex",
//                   justifyContent: "center",
//                   alignItems: "center",
//                   height: 40,
//                   cursor: "pointer",
//                   borderRadius: 2,
//                   bgcolor: isToday(day.date) ? "#8C257C" : "transparent",
//                   color: isToday(day.date)
//                     ? "white"
//                     : day.isCurrentMonth
//                     ? "text.primary"
//                     : "text.disabled",
//                   fontWeight: isToday(day.date) ? "bold" : "normal",
//                   transition: "all 0.2s ease",
//                   "&:hover": {
//                     bgcolor: isToday(day.date)
//                       ? "#701D62"
//                       : day.isCurrentMonth
//                       ? "#f0f4ff"
//                       : "#f5f5f5",
//                     transform: "scale(1.05)",
//                   },
//                 }}
//                 onClick={() => handleDateSelect(day.date)}
//               >
//                 <Typography variant="body2" sx={{ fontWeight: "inherit" }}>
//                   {getDayNumber(day.date)}
//                 </Typography>
//               </Box>
//             </Grid>
//           ))}
//         </Grid>
//         <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
//           <Button
//             variant="outlined"
//             size="small"
//             onClick={() => handleDateSelect(new Date())}
//             startIcon={<TodayIcon />}
//             sx={{
//               borderColor: "#8C257C",
//               color: "#8C257C",
//               "&:hover": {
//                 borderColor: "#701D62",
//                 bgcolor: "rgba(140, 37, 124, 0.04)",
//               },
//             }}
//           >
//             Today
//           </Button>
//         </Box>
//       </Paper>
//     );
//   };
 
//   const TimePicker = () => {
//     const [selectedHour, setSelectedHour] = useState("12");
//     const [selectedMinute, setSelectedMinute] = useState("00");
//     const [selectedAmPm, setSelectedAmPm] = useState("pm");
 
//     const hours = Array.from({ length: 12 }, (_, i) =>
//       (i + 1).toString().padStart(2, "0")
//     );
//     const minutes = Array.from({ length: 60 }, (_, i) =>
//       i.toString().padStart(2, "0")
//     );
 
//     const handleSelectTime = () => {
//       handleTimeSelect(selectedHour, selectedMinute, selectedAmPm);
//     };
 
//     return (
//       <Paper elevation={8} sx={{ width: 280, p: 3, borderRadius: 3 }}>
//         <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
//           <ScheduleIcon sx={{ color: "#8C257C", mr: 1 }} />
//           <Typography variant="h6" sx={{ fontWeight: 600, color: "#8C257C" }}>
//             Select Time
//           </Typography>
//         </Box>
//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "space-between",
//             mb: 3,
//             gap: 1,
//           }}
//         >
//           <FormControl sx={{ flex: 1 }}>
//             <InputLabel id="hour-select-label" sx={{ fontSize: "0.875rem" }}>
//               Hour
//             </InputLabel>
//             <Select
//               labelId="hour-select-label"
//               value={selectedHour}
//               onChange={(e) => setSelectedHour(e.target.value)}
//               label="Hour"
//               size="small"
//               sx={{ borderRadius: 2 }}
//             >
//               {hours.map((hour) => (
//                 <MenuItem key={hour} value={hour}>
//                   {hour}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//           <FormControl sx={{ flex: 1 }}>
//             <InputLabel id="minute-select-label" sx={{ fontSize: "0.875rem" }}>
//               Min
//             </InputLabel>
//             <Select
//               labelId="minute-select-label"
//               value={selectedMinute}
//               onChange={(e) => setSelectedMinute(e.target.value)}
//               label="Min"
//               size="small"
//               sx={{ borderRadius: 2 }}
//             >
//               {minutes.map((minute) => (
//                 <MenuItem key={minute} value={minute}>
//                   {minute}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//           <FormControl sx={{ flex: 1 }}>
//             <InputLabel id="ampm-select-label" sx={{ fontSize: "0.875rem" }}>
//               Period
//             </InputLabel>
//             <Select
//               labelId="ampm-select-label"
//               value={selectedAmPm}
//               onChange={(e) => setSelectedAmPm(e.target.value)}
//               label="Period"
//               size="small"
//               sx={{ borderRadius: 2 }}
//             >
//               <MenuItem value="am">AM</MenuItem>
//               <MenuItem value="pm">PM</MenuItem>
//             </Select>
//           </FormControl>
//         </Box>
//         <Box sx={{ display: "flex", justifyContent: "center", gap: 1 }}>
//           <Button
//             variant="outlined"
//             onClick={handleTimePickerClose}
//             sx={{
//               borderColor: "#ddd",
//               color: "#666",
//               "&:hover": { borderColor: "#bbb" },
//             }}
//           >
//             Cancel
//           </Button>
//           <Button
//             variant="contained"
//             onClick={handleSelectTime}
//             sx={{
//               bgcolor: "#8C257C",
//               "&:hover": { bgcolor: "#701D62" },
//               px: 3,
//             }}
//           >
//             Select
//           </Button>
//         </Box>
//       </Paper>
//     );
//   };
 
//   const getEmployeeNameById = (id) => {
//     const employee = employeesList.find((emp) => emp.id == id);
//     return employee ? employee.name : "Unknown Employee";
//   };
 
//   if (!isAuthenticated) {
//     return (
//       <ThemeProvider theme={theme}>
//         <CssBaseline />
//         <Box
//           sx={{
//             display: "flex",
//             flexDirection: "column",
//             minHeight: "100vh",
//             justifyContent: "center",
//             alignItems: "center",
//           }}
//         >
//           <Paper
//             elevation={3}
//             sx={{ p: 4, maxWidth: 500, textAlign: "center" }}
//           >
//             <LockIcon sx={{ fontSize: 60, color: "#8C257C", mb: 2 }} />
//             <Typography variant="h5" sx={{ mb: 2 }}>
//               Authentication Required
//             </Typography>
//             <Typography variant="body1" sx={{ mb: 3 }}>
//               You need to be logged in to access the Events Calendar. Please log
//               in with your credentials.
//             </Typography>
//             <Button
//               variant="contained"
//               sx={{ bgcolor: "#8C257C", "&:hover": { bgcolor: "#701D62" } }}
//               onClick={() => window.location.reload()}
//             >
//               Refresh
//             </Button>
//           </Paper>
//         </Box>
//       </ThemeProvider>
//     );
//   }
 
//   return (
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
//       <Box
//         sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
//       >
//         <Box sx={{ borderBottom: "1px solid #e0e0e0", p: 2, bgcolor: "white" }}>
//           <Box
//             sx={{
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "center",
//               width: "100%",
//               maxWidth: 1200,
//               mx: "auto",
//             }}
//           >
//             <Box sx={{ display: "flex", alignItems: "center", mr: 4 }}>
//               <IconButton
//                 color={activeView === "events" ? "primary" : "default"}
//                 onClick={() => setActiveView("events")}
//                 sx={{
//                   borderRadius: 2,
//                   bgcolor:
//                     activeView === "events"
//                       ? "rgba(140, 37, 124, 0.1)"
//                       : "transparent",
//                   color: activeView === "events" ? "#8C257C" : "inherit",
//                 }}
//               >
//                 <EventIcon />
//               </IconButton>
//               <Box sx={{ ml: 1 }}>
//                 <Typography
//                   variant="subtitle1"
//                   onClick={() => setActiveView("events")}
//                   sx={{
//                     fontWeight: activeView === "events" ? "bold" : "normal",
//                     cursor: "pointer",
//                     color: activeView === "events" ? "#8C257C" : "textPrimary",
//                   }}
//                 >
//                   Events
//                 </Typography>
//                 <Typography variant="caption" color="textSecondary">
//                   Set up Events
//                 </Typography>
//               </Box>
//             </Box>
//             <Box sx={{ display: "flex", alignItems: "center" }}>
//               <IconButton
//                 onClick={() => setActiveView("calendar")}
//                 sx={{
//                   borderRadius: 2,
//                   bgcolor:
//                     activeView === "calendar"
//                       ? "rgba(140, 37, 124, 0.1)"
//                       : "transparent",
//                   color: activeView === "calendar" ? "#8C257C" : "inherit",
//                 }}
//               >
//                 <CalendarTodayIcon />
//               </IconButton>
//               <Box sx={{ ml: 1 }}>
//                 <Typography
//                   variant="subtitle1"
//                   onClick={() => setActiveView("calendar")}
//                   sx={{
//                     fontWeight: activeView === "calendar" ? "bold" : "normal",
//                     cursor: "pointer",
//                     color:
//                       activeView === "calendar" ? "#8C257C" : "textPrimary",
//                   }}
//                 >
//                   Calendar
//                 </Typography>
//                 <Typography variant="caption" color="textSecondary">
//                   Events Calendar
//                 </Typography>
//               </Box>
//             </Box>
//           </Box>
//         </Box>
//         <Box sx={{ p: 3, flexGrow: 1, bgcolor: "#f5f5f9" }}>
//           <Box sx={{ maxWidth: 1200, mx: "auto" }}>
//             {activeView === "events" ? (
//               <Grid container spacing={isMobile ? 0 : 3}>
//                 <Grid item xs={12} md={4}>
//                   <Paper
//                     elevation={2}
//                     sx={{
//                       p: isMobile ? 2 : 3,
//                       height: "100%",
//                       borderRadius: 3,
//                       mb: isMobile ? 2 : 0,
//                     }}
//                   >
//                     <Typography
//                       variant="h5"
//                       sx={{
//                         mb: 3,
//                         fontWeight: "bold",
//                         color: "#8C257C",
//                       }}
//                     >
//                       Add New Event
//                     </Typography>
//                     <Box sx={{ mb: 2 }}>
//                       <Typography
//                         variant="subtitle1"
//                         sx={{ mb: 1, fontWeight: 500 }}
//                       >
//                         Employee <span style={{ color: "red" }}>*</span>
//                       </Typography>
//                       <FormControl fullWidth>
//                         <Select
//                           value={newEvent.employee_id}
//                           onChange={(e) =>
//                             handleEventChange("employee_id", e.target.value)
//                           }
//                           displayEmpty
//                           sx={{ borderRadius: 2 }}
//                           startAdornment={
//                             <InputAdornment position="start">
//                             </InputAdornment>
//                           }
//                         >
//                           <MenuItem value="">
//                             <em>Select Employee</em>
//                           </MenuItem>
//                           {employeesList.map((employee) => (
//                             <MenuItem key={employee.id} value={employee.id}>
//                               {employee.name}
//                             </MenuItem>
//                           ))}
//                         </Select>
//                       </FormControl>
//                       {employeesList.length === 0 && (
//                         <Typography
//                           variant="caption"
//                           color="textSecondary"
//                           sx={{ mt: 1, display: "block" }}
//                         >
//                           Loading employees...
//                         </Typography>
//                       )}
//                     </Box>
//                     <Box sx={{ mb: 2 }}>
//                       <Typography
//                         variant="subtitle1"
//                         sx={{ mb: 1, fontWeight: 500 }}
//                       >
//                         Event Title <span style={{ color: "red" }}>*</span>
//                       </Typography>
//                       <TextField
//                         fullWidth
//                         placeholder="Enter event title"
//                         value={newEvent.event_title}
//                         onChange={(e) =>
//                           handleEventChange("event_title", e.target.value)
//                         }
//                         required
//                         sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
//                       />
//                     </Box>
//                     <Box sx={{ mb: 2 }}>
//                       <Typography
//                         variant="subtitle1"
//                         sx={{ mb: 1, fontWeight: 500 }}
//                       >
//                         Event Date <span style={{ color: "red" }}>*</span>
//                       </Typography>
//                       <TextField
//                         fullWidth
//                         placeholder="Select date"
//                         value={newEvent.event_date}
//                         onClick={handleDatePickerOpen}
//                         InputProps={{
//                           readOnly: true,
//                           endAdornment: (
//                             <InputAdornment position="end">
//                               <CalendarTodayIcon sx={{ color: "#8C257C" }} />
//                             </InputAdornment>
//                           ),
//                         }}
//                         required
//                         sx={{
//                           "& .MuiOutlinedInput-root": {
//                             borderRadius: 2,
//                             cursor: "pointer",
//                           },
//                         }}
//                       />
//                       <Popover
//                         open={datePickerOpen}
//                         anchorEl={datePickerAnchorEl}
//                         onClose={handleDatePickerClose}
//                         anchorOrigin={{
//                           vertical: "bottom",
//                           horizontal: "left",
//                         }}
//                         transformOrigin={{
//                           vertical: "top",
//                           horizontal: "left",
//                         }}
//                       >
//                         <DatePicker />
//                       </Popover>
//                     </Box>
//                     <Box sx={{ mb: 2 }}>
//                       <Typography
//                         variant="subtitle1"
//                         sx={{ mb: 1, fontWeight: 500 }}
//                       >
//                         Event Time <span style={{ color: "red" }}>*</span>
//                       </Typography>
//                       <TextField
//                         fullWidth
//                         placeholder="Select time"
//                         value={newEvent.event_time}
//                         onClick={handleTimePickerOpen}
//                         InputProps={{
//                           readOnly: true,
//                           endAdornment: (
//                             <InputAdornment position="end">
//                               <AccessTimeIcon sx={{ color: "#8C257C" }} />
//                             </InputAdornment>
//                           ),
//                         }}
//                         required
//                         sx={{
//                           "& .MuiOutlinedInput-root": {
//                             borderRadius: 2,
//                             cursor: "pointer",
//                           },
//                         }}
//                       />
//                       <Popover
//                         open={timePickerOpen}
//                         anchorEl={timePickerAnchorEl}
//                         onClose={handleTimePickerClose}
//                         anchorOrigin={{
//                           vertical: "bottom",
//                           horizontal: "left",
//                         }}
//                         transformOrigin={{
//                           vertical: "top",
//                           horizontal: "left",
//                         }}
//                       >
//                         <TimePicker />
//                       </Popover>
//                     </Box>
//                     <Box sx={{ mb: 2 }}>
//                       <Typography
//                         variant="subtitle1"
//                         sx={{ mb: 1, fontWeight: 500 }}
//                       >
//                         Event Color
//                       </Typography>
//                       <Box
//                         sx={{ display: "flex", alignItems: "center", gap: 1 }}
//                       >
//                         <Box
//                           sx={{
//                             width: 32,
//                             height: 32,
//                             bgcolor: newEvent.event_color,
//                             borderRadius: 2,
//                             border: "2px solid #e0e0e0",
//                             cursor: "pointer",
//                             transition: "transform 0.2s",
//                             "&:hover": { transform: "scale(1.1)" },
//                           }}
//                         />
//                         <TextField
//                           fullWidth
//                           value={newEvent.event_color}
//                           onChange={(e) =>
//                             handleEventChange("event_color", e.target.value)
//                           }
//                           sx={{
//                             "& .MuiOutlinedInput-root": { borderRadius: 2 },
//                           }}
//                         />
//                       </Box>
//                     </Box>
//                     <Box sx={{ mb: 3 }}>
//                       <Typography
//                         variant="subtitle1"
//                         sx={{ mb: 1, fontWeight: 500 }}
//                       >
//                         Event Note <span style={{ color: "red" }}>*</span>
//                       </Typography>
//                       <TextField
//                         fullWidth
//                         multiline
//                         rows={4}
//                         placeholder="Enter event description"
//                         value={newEvent.event_note}
//                         onChange={(e) =>
//                           handleEventChange("event_note", e.target.value)
//                         }
//                         required
//                         sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
//                       />
//                     </Box>
//                     <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
//                       <Button
//                         variant="contained"
//                         onClick={createEvent}
//                         disabled={loading}
//                         sx={{
//                           bgcolor: "#8C257C",
//                           "&:hover": { bgcolor: "#701D62" },
//                           px: 4,
//                           py: 1.5,
//                           borderRadius: 2,
//                           fontWeight: 600,
//                         }}
//                       >
//                         {loading ? "Saving..." : "Save Event"}
//                       </Button>
//                     </Box>
//                   </Paper>
//                 </Grid>
//                 <Grid item xs={12} md={8}>
//                   <Paper
//                     elevation={2}
//                     sx={{ p: isMobile ? 1 : 3, borderRadius: 3 }}
//                   >
//                     <Typography
//                       variant="h5"
//                       sx={{
//                         mb: 3,
//                         fontWeight: "bold",
//                         color: "#8C257C",
//                       }}
//                     >
//                       List All Events
//                     </Typography>
//                     <Box
//                       sx={{
//                         display: "flex",
//                         justifyContent: "flex-end",
//                         mb: 2,
//                       }}
//                     >
//                       <Box sx={{ display: "flex", alignItems: "center" }}>
//                         <Typography variant="body2" sx={{ mr: 1 }}>
                         
//                         </Typography>
//                         <TextField
//                           size="small"
//                           value={searchTerm}
//                           onChange={handleSearch}
//                           placeholder="Search events..."
//                           InputProps={{
//                             endAdornment: (
//                               <InputAdornment position="end">
//                                 <SearchIcon sx={{ color: "#8C257C" }} />
//                               </InputAdornment>
//                             ),
//                           }}
//                           sx={{
//                             "& .MuiOutlinedInput-root": { borderRadius: 2 },
//                           }}
//                         />
//                       </Box>
//                     </Box>
//                     <TableContainer sx={{ borderRadius: 2 }}>
//                       <Table>
//                         <TableHead>
//                           <TableRow sx={{ bgcolor: "#8C257C" }}>
//                             <TableCell
//                               onClick={() => requestSort("event_title")}
//                               sx={{
//                                 fontWeight: "bold",
//                                 cursor: "pointer",
//                                 borderRadius: "8px 0 0 0",
//                               }}
//                             >
//                               <Box
//                                 sx={{ display: "flex", alignItems: "center" }}
//                               >
//                                 EVENT TITLE
//                                 {sortConfig.key === "event_title" &&
//                                   (sortConfig.direction === "asc" ? (
//                                     <ArrowUpwardIcon fontSize="small" />
//                                   ) : (
//                                     <ArrowDownwardIcon fontSize="small" />
//                                   ))}
//                               </Box>
//                             </TableCell>
//                             <TableCell
//                               onClick={() => requestSort("employee_name")}
//                               sx={{ fontWeight: "bold", cursor: "pointer" }}
//                             >
//                               <Box
//                                 sx={{ display: "flex", alignItems: "center" }}
//                               >
//                                 EMPLOYEE
//                                 {sortConfig.key === "employee_name" &&
//                                   (sortConfig.direction === "asc" ? (
//                                     <ArrowUpwardIcon fontSize="small" />
//                                   ) : (
//                                     <ArrowDownwardIcon fontSize="small" />
//                                   ))}
//                               </Box>
//                             </TableCell>
//                             <TableCell
//                               onClick={() => requestSort("event_date")}
//                               sx={{ fontWeight: "bold", cursor: "pointer" }}
//                             >
//                               <Box
//                                 sx={{ display: "flex", alignItems: "center" }}
//                               >
//                                 EVENT DATE
//                                 {sortConfig.key === "event_date" &&
//                                   (sortConfig.direction === "asc" ? (
//                                     <ArrowUpwardIcon fontSize="small" />
//                                   ) : (
//                                     <ArrowDownwardIcon fontSize="small" />
//                                   ))}
//                               </Box>
//                             </TableCell>
//                             <TableCell
//                               onClick={() => requestSort("event_time")}
//                               sx={{ fontWeight: "bold", cursor: "pointer" }}
//                             >
//                               <Box
//                                 sx={{ display: "flex", alignItems: "center" }}
//                               >
//                                 EVENT TIME
//                                 {sortConfig.key === "event_time" &&
//                                   (sortConfig.direction === "asc" ? (
//                                     <ArrowUpwardIcon fontSize="small" />
//                                   ) : (
//                                     <ArrowDownwardIcon fontSize="small" />
//                                   ))}
//                               </Box>
//                             </TableCell>
//                             <TableCell
//                               sx={{
//                                 fontWeight: "bold",
//                                 borderRadius: "0 8px 0 0",
//                               }}
//                             >
//                               ACTIONS
//                             </TableCell>
//                           </TableRow>
//                         </TableHead>
//                         <TableBody>
//                           {loading ? (
//                             <TableRow>
//                               <TableCell
//                                 colSpan={5}
//                                 align="center"
//                                 sx={{ py: 4 }}
//                               >
//                                 Loading events...
//                               </TableCell>
//                             </TableRow>
//                           ) : paginatedEvents.length === 0 ? (
//                             <TableRow>
//                               <TableCell
//                                 colSpan={5}
//                                 align="center"
//                                 sx={{ py: 4 }}
//                               >
//                                 No events found
//                               </TableCell>
//                             </TableRow>
//                           ) : (
//                             paginatedEvents.map((event) => (
//                               <TableRow
//                                 key={event.event_id}
//                                 hover
//                                 sx={{
//                                   "&:hover": { bgcolor: "#f8f9fa" },
//                                   transition: "background-color 0.2s",
//                                 }}
//                               >
//                                 <TableCell>
//                                   <Box
//                                     sx={{
//                                       display: "flex",
//                                       alignItems: "center",
//                                     }}
//                                   >
//                                     <Box
//                                       sx={{
//                                         width: 16,
//                                         height: 16,
//                                         bgcolor: event.event_color,
//                                         borderRadius: 1,
//                                         mr: 2,
//                                         boxShadow: 1,
//                                       }}
//                                     />
//                                     <Typography
//                                       variant="body2"
//                                       sx={{ fontWeight: 500 }}
//                                     >
//                                       {event.event_title}
//                                     </Typography>
//                                   </Box>
//                                 </TableCell>
//                                 <TableCell>
//                                   <Chip
//                                     label={
//                                       event.employee_name ||
//                                       getEmployeeNameById(event.employee_id)
//                                     }
//                                     size="small"
//                                     variant="outlined"
//                                     sx={{ borderRadius: 2 }}
//                                   />
//                                 </TableCell>
//                                 <TableCell>{event.event_date}</TableCell>
//                                 <TableCell>{event.event_time}</TableCell>
//                                 <TableCell>
//                                   <Box sx={{ display: "flex", gap: 1 }}>
//                                     <IconButton
//                                       size="small"
//                                       color="primary"
//                                       onClick={() =>
//                                         handleOpenEditDialog(event)
//                                       }
//                                       disabled={!hasPermission("edit")}
//                                       sx={{
//                                         borderRadius: 2,
//                                         "&:hover": {
//                                           bgcolor:
//                                             "rgba(140, 37, 124, 0.1)",
//                                         },
//                                       }}
//                                     >
//                                       <EditIcon fontSize="small" />
//                                     </IconButton>
//                                     <IconButton
//                                       size="small"
//                                       color="error"
//                                       onClick={() =>
//                                         handleOpenDeleteConfirm(event)
//                                       }
//                                       sx={{
//                                         borderRadius: 2,
//                                         "&:hover": { bgcolor: "#ffebee" },
//                                       }}
//                                     >
//                                       <DeleteIcon fontSize="small" />
//                                     </IconButton>
//                                   </Box>
//                                 </TableCell>
//                               </TableRow>
//                             ))
//                           )}
//                         </TableBody>
//                       </Table>
//                     </TableContainer>
//                     <Box
//                       component="footer"
//                       sx={{
//                         display: "flex",
//                         justifyContent: { xs: "center", sm: "space-between" },
//                         alignItems: "center",
//                         flexDirection: { xs: "column", sm: "row" },
//                         mt: 2,
//                         gap: 2,
//                         width: "100%",
//                       }}
//                     >
//                       <Typography variant="body2" color="text.secondary">
//                         Showing{" "}
//                         {filteredEvents.length > 0 ? page * rowsPerPage + 1 : 0}{" "}
//                         to{" "}
//                         {Math.min(
//                           (page + 1) * rowsPerPage,
//                           filteredEvents.length
//                         )}{" "}
//                         of {filteredEvents.length} results
//                       </Typography>
//                       <TablePagination
//                         component="div"
//                         count={filteredEvents.length}
//                         page={page}
//                         onPageChange={handleChangePage}
//                         rowsPerPage={rowsPerPage}
//                         onRowsPerPageChange={handleChangeRowsPerPage}
//                         rowsPerPageOptions={[5, 10, 15, 25]}
//                         sx={{
//                           p: 0,
//                           ".MuiTablePagination-toolbar": {
//                             p: 0,
//                           },
//                           ".MuiIconButton-root": {
//                             color: "#8C257C",
//                           },
//                         }}
//                       />
//                     </Box>
//                   </Paper>
//                 </Grid>
//               </Grid>
//             ) : (
//               <Paper
//                 elevation={2}
//                 sx={{ p: isMobile ? 2 : 3, borderRadius: 3 }}
//               >
//                 <Box
//                   sx={{
//                     display: "flex",
//                     justifyContent: "space-between",
//                     alignItems: "center",
//                     mb: 3,
//                   }}
//                 >
//                   <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//                     <IconButton
//                       onClick={goToPreviousMonth}
//                       sx={{
//                         bgcolor: "#f5f5f5",
//                         "&:hover": { bgcolor: "#e0e0e0" },
//                         borderRadius: 2,
//                       }}
//                     >
//                       <ArrowBackIcon />
//                     </IconButton>
//                     <Button
//                       variant="contained"
//                       onClick={goToToday}
//                       sx={{
//                         bgcolor: "#8C257C",
//                         "&:hover": { bgcolor: "#701D62" },
//                         borderRadius: 2,
//                         px: 3,
//                       }}
//                     >
//                       Today
//                     </Button>
//                     <IconButton
//                       onClick={goToNextMonth}
//                       sx={{
//                         bgcolor: "#f5f5f5",
//                         "&:hover": { bgcolor: "#e0e0e0" },
//                         borderRadius: 2,
//                       }}
//                     >
//                       <ArrowForwardIcon />
//                     </IconButton>
//                   </Box>
//                   <Typography
//                     variant="h5"
//                     sx={{ fontWeight: "bold", color: "#333" }}
//                   >
//                     {formatMonthYear(currentDate)}
//                   </Typography>
//                   <Box sx={{ display: "flex", gap: 1 }}>
//                     {["month", "week", "day", "list"].map((viewType) => (
//                       <Button
//                         key={viewType}
//                         variant={
//                           calendarViewType === viewType
//                             ? "contained"
//                             : "outlined"
//                         }
//                         onClick={() => setCalendarViewType(viewType)}
//                         size="small"
//                         sx={{
//                           bgcolor:
//                             calendarViewType === viewType
//                               ? "#8C257C"
//                               : "transparent",
//                           borderColor:
//                             calendarViewType === viewType
//                               ? "#8C257C"
//                               : "#ddd",
//                           color:
//                             calendarViewType === viewType
//                               ? "white"
//                               : "#8C257C",
//                           borderRadius: 2,
//                           textTransform: "capitalize",
//                           "&:hover": {
//                             bgcolor:
//                               calendarViewType === viewType
//                                 ? "#701D62"
//                                 : "rgba(140, 37, 124, 0.04)",
//                           },
//                         }}
//                       >
//                         {viewType}
//                       </Button>
//                     ))}
//                   </Box>
//                 </Box>
//                 {calendarViewType === "month" && (
//                   <Box>
//                     <Grid container sx={{ mb: 1 }}>
//                       {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
//                         (day, index) => (
//                           <Grid
//                             item
//                             xs
//                             key={index}
//                             sx={{
//                               textAlign: "center",
//                               p: 2,
//                               bgcolor: "#f8f9fa",
//                               borderRadius:
//                                 index === 0
//                                   ? "8px 0 0 0"
//                                   : index === 6
//                                   ? "0 8px 0 0"
//                                   : "0",
//                             }}
//                           >
//                             <Typography
//                               variant="subtitle2"
//                               sx={{ fontWeight: "bold", color: "#666" }}
//                             >
//                               {day}
//                             </Typography>
//                           </Grid>
//                         )
//                       )}
//                     </Grid>
//                     <Grid
//                       container
//                       sx={{ border: "1px solid #e0e0e0", borderRadius: 2 }}
//                     >
//                       {calendarDays.map((day, index) => (
//                         <Grid item xs key={index}>
//                           <Box
//                             sx={{
//                               height: 140,
//                               border: "1px solid #f0f0f0",
//                               p: 1,
//                               bgcolor: isToday(day.date)
//                                 ? "rgba(140, 37, 124, 0.1)"
//                                 : "white",
//                               color: day.isCurrentMonth
//                                 ? "text.primary"
//                                 : "text.disabled",
//                               transition: "all 0.2s ease",
//                               "&:hover": {
//                                 bgcolor: isToday(day.date)
//                                   ? "rgba(140, 37, 124, 0.2)"
//                                   : "#f8f9fa",
//                                 transform: "scale(1.02)",
//                               },
//                               cursor: "pointer",
//                               position: "relative",
//                               overflow: "hidden",
//                             }}
//                           >
//                             <Typography
//                               variant="body2"
//                               sx={{
//                                 textAlign: "right",
//                                 fontWeight: isToday(day.date)
//                                   ? "bold"
//                                   : "normal",
//                                 color: isToday(day.date)
//                                   ? "#8C257C"
//                                   : "inherit",
//                               }}
//                             >
//                               {getDayNumber(day.date)}
//                             </Typography>
//                             <Box
//                               sx={{
//                                 mt: 0.5,
//                                 maxHeight: 100,
//                                 overflowY: "auto",
//                               }}
//                             >
//                               {getEventsForDate(day.date)
//                                 .slice(0, 3)
//                                 .map((event, eventIndex) => (
//                                   <Tooltip
//                                     title={`${event.event_title} - ${
//                                       event.event_time
//                                     }\n${
//                                       event.employee_name ||
//                                       getEmployeeNameById(event.employee_id)
//                                     }`}
//                                     key={eventIndex}
//                                   >
//                                     <Fade in timeout={300 + eventIndex * 100}>
//                                       <Card
//                                         sx={{
//                                           bgcolor: event.event_color,
//                                           color: "white",
//                                           mb: 0.5,
//                                           cursor: "pointer",
//                                           transition: "all 0.2s ease",
//                                           "&:hover": {
//                                             transform: "scale(1.05)",
//                                             boxShadow: 2,
//                                           },
//                                         }}
//                                         onClick={(e) => {
//                                           e.stopPropagation();
//                                           handleOpenEditDialog(event);
//                                         }}
//                                       >
//                                         <CardContent
//                                           sx={{
//                                             p: 1,
//                                             "&:last-child": { pb: 1 },
//                                           }}
//                                         >
//                                           <Typography
//                                             variant="caption"
//                                             sx={{
//                                               fontSize: "0.7rem",
//                                               fontWeight: 500,
//                                               display: "block",
//                                               whiteSpace: "nowrap",
//                                               overflow: "hidden",
//                                               textOverflow: "ellipsis",
//                                             }}
//                                           >
//                                             {event.event_title}
//                                           </Typography>
//                                           <Typography
//                                             variant="caption"
//                                             sx={{
//                                               fontSize: "0.65rem",
//                                               opacity: 0.9,
//                                               display: "block",
//                                             }}
//                                           >
//                                             {event.event_time}
//                                           </Typography>
//                                         </CardContent>
//                                       </Card>
//                                     </Fade>
//                                   </Tooltip>
//                                 ))}
//                               {getEventsForDate(day.date).length > 3 && (
//                                 <Typography
//                                   variant="caption"
//                                   sx={{
//                                     color: "#8C257C",
//                                     fontWeight: "bold",
//                                     fontSize: "0.7rem",
//                                   }}
//                                 >
//                                   +{getEventsForDate(day.date).length - 3} more
//                                 </Typography>
//                               )}
//                             </Box>
//                           </Box>
//                         </Grid>
//                       ))}
//                     </Grid>
//                   </Box>
//                 )}
//                 {calendarViewType === "week" && (
//                   <Box>
//                     <Grid container sx={{ mb: 1 }}>
//                       {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
//                         (day, index) => {
//                           const date = new Date(currentDate);
//                           const firstDayOfWeek = new Date(
//                             date.setDate(date.getDate() - date.getDay())
//                           );
//                           const dayDate = new Date(firstDayOfWeek);
//                           dayDate.setDate(firstDayOfWeek.getDate() + index);
 
//                           return (
//                             <Grid
//                               item
//                               xs
//                               key={index}
//                               sx={{
//                                 textAlign: "center",
//                                 p: 2,
//                                 bgcolor: isToday(dayDate)
//                                   ? "rgba(140, 37, 124, 0.1)"
//                                   : "#f8f9fa",
//                                 borderRadius:
//                                   index === 0
//                                     ? "8px 0 0 0"
//                                     : index === 6
//                                     ? "0 8px 0 0"
//                                     : "0",
//                               }}
//                             >
//                               <Typography
//                                 variant="subtitle2"
//                                 sx={{ fontWeight: "bold", color: "#666" }}
//                               >
//                                 {day}
//                               </Typography>
//                               <Typography
//                                 variant="h6"
//                                 sx={{
//                                   fontWeight: isToday(dayDate)
//                                     ? "bold"
//                                     : "normal",
//                                   color: isToday(dayDate)
//                                     ? "#8C257C"
//                                     : "inherit",
//                                 }}
//                               >
//                                 {dayDate.getDate()}
//                               </Typography>
//                             </Grid>
//                           );
//                         }
//                       )}
//                     </Grid>
//                     <Box
//                       sx={{
//                         height: 600,
//                         overflowY: "auto",
//                         border: "1px solid #e0e0e0",
//                         borderRadius: 2,
//                       }}
//                     >
//                       {Array.from({ length: 24 }).map((_, hourIndex) => (
//                         <Box
//                           key={hourIndex}
//                           sx={{
//                             display: "flex",
//                             borderBottom:
//                               hourIndex < 23 ? "1px solid #f0f0f0" : "none",
//                             height: 60,
//                             "&:hover": { bgcolor: "#f8f9fa" },
//                           }}
//                         >
//                           <Box
//                             sx={{
//                               width: 80,
//                               pr: 2,
//                               textAlign: "right",
//                               borderRight: "1px solid #e0e0e0",
//                               display: "flex",
//                               alignItems: "center",
//                               justifyContent: "flex-end",
//                               bgcolor: "#f8f9fa",
//                             }}
//                           >
//                             <Typography
//                               variant="caption"
//                               sx={{ fontWeight: 500, color: "#666" }}
//                             >
//                               {hourIndex === 0
//                                 ? "12 AM"
//                                 : hourIndex < 12
//                                 ? `${hourIndex} AM`
//                                 : hourIndex === 12
//                                 ? "12 PM"
//                                 : `${hourIndex - 12} PM`}
//                             </Typography>
//                           </Box>
//                           <Grid container sx={{ flexGrow: 1 }}>
//                             {Array.from({ length: 7 }).map((_, dayIndex) => {
//                               const date = new Date(currentDate);
//                               const firstDayOfWeek = new Date(
//                                 date.setDate(date.getDate() - date.getDay())
//                               );
//                               const dayDate = new Date(firstDayOfWeek);
//                               dayDate.setDate(
//                                 firstDayOfWeek.getDate() + dayIndex
//                               );
//                               const dayEvents = getEventsForDate(
//                                 dayDate
//                               ).filter((event) => {
//                                 if (!event.event_time) return false;
//                                 const [time, ampm] =
//                                   event.event_time.split(" ");
//                                 const [hour] = time.split(":");
//                                 let eventHour = Number.parseInt(hour, 10);
//                                 if (ampm === "pm" && eventHour !== 12) {
//                                   eventHour += 12;
//                                 } else if (ampm === "am" && eventHour === 12) {
//                                   eventHour = 0;
//                                 }
//                                 return eventHour === hourIndex;
//                               });
 
//                               return (
//                                 <Grid
//                                   item
//                                   xs
//                                   key={dayIndex}
//                                   sx={{
//                                     borderRight:
//                                       dayIndex < 6
//                                         ? "1px solid #f0f0f0"
//                                         : "none",
//                                     position: "relative",
//                                     bgcolor: isToday(dayDate)
//                                       ? "rgba(140, 37, 124, 0.05)"
//                                       : "white",
//                                   }}
//                                 >
//                                   {dayEvents.map((event, eventIndex) => (
//                                     <Tooltip
//                                       title={`${event.event_title} - ${
//                                         event.event_time
//                                       }\n${
//                                         event.employee_name ||
//                                         getEmployeeNameById(event.employee_id)
//                                       }`}
//                                       key={eventIndex}
//                                     >
//                                       <Zoom in timeout={300}>
//                                         <Card
//                                           sx={{
//                                             position: "absolute",
//                                             top: 4,
//                                             left: 4,
//                                             right: 4,
//                                             bgcolor: event.event_color,
//                                             color: "white",
//                                             cursor: "pointer",
//                                             transition: "all 0.2s ease",
//                                             "&:hover": {
//                                               transform: "scale(1.05)",
//                                               boxShadow: 3,
//                                               zIndex: 10,
//                                             },
//                                             zIndex: 1,
//                                           }}
//                                           onClick={() =>
//                                             handleOpenEditDialog(event)
//                                           }
//                                         >
//                                           <CardContent
//                                             sx={{
//                                               p: 1,
//                                               "&:last-child": { pb: 1 },
//                                             }}
//                                           >
//                                             <Typography
//                                               variant="caption"
//                                               sx={{
//                                                 fontSize: "0.7rem",
//                                                 fontWeight: 500,
//                                                 whiteSpace: "nowrap",
//                                                 overflow: "hidden",
//                                                 textOverflow: "ellipsis",
//                                               }}
//                                             >
//                                               {event.event_title}
//                                             </Typography>
//                                           </CardContent>
//                                         </Card>
//                                       </Zoom>
//                                     </Tooltip>
//                                   ))}
//                                 </Grid>
//                               );
//                             })}
//                           </Grid>
//                         </Box>
//                       ))}
//                     </Box>
//                   </Box>
//                 )}
//                 {calendarViewType === "day" && (
//                   <Box>
//                     <Paper
//                       elevation={1}
//                       sx={{
//                         p: 3,
//                         mb: 3,
//                         textAlign: "center",
//                         bgcolor: isToday(currentDate)
//                           ? "rgba(140, 37, 124, 0.1)"
//                           : "#f8f9fa",
//                         borderRadius: 3,
//                       }}
//                     >
//                       <Typography
//                         variant="h5"
//                         sx={{ fontWeight: "bold", color: "#333" }}
//                       >
//                         {currentDate.toLocaleDateString("default", {
//                           weekday: "long",
//                           day: "numeric",
//                           month: "long",
//                           year: "numeric",
//                         })}
//                       </Typography>
//                       <Typography
//                         variant="body2"
//                         color="textSecondary"
//                         sx={{ mt: 1 }}
//                       >
//                         {getEventsForDate(currentDate).length} events scheduled
//                       </Typography>
//                     </Paper>
//                     <Box
//                       sx={{
//                         height: 600,
//                         overflowY: "auto",
//                         border: "1px solid #e0e0e0",
//                         borderRadius: 2,
//                       }}
//                     >
//                       {Array.from({ length: 24 }).map((_, hourIndex) => (
//                         <Box
//                           key={hourIndex}
//                           sx={{
//                             display: "flex",
//                             borderBottom:
//                               hourIndex < 23 ? "1px solid #f0f0f0" : "none",
//                             height: 80,
//                             "&:hover": { bgcolor: "#f8f9fa" },
//                           }}
//                         >
//                           <Box
//                             sx={{
//                               width: 100,
//                               pr: 2,
//                               textAlign: "right",
//                               borderRight: "1px solid #e0e0e0",
//                               display: "flex",
//                               alignItems: "center",
//                               justifyContent: "flex-end",
//                               bgcolor: "#f8f9fa",
//                             }}
//                           >
//                             <Typography
//                               variant="body2"
//                               sx={{ fontWeight: 500, color: "#666" }}
//                             >
//                               {hourIndex === 0
//                                 ? "12:00 AM"
//                                 : hourIndex < 12
//                                 ? `${hourIndex}:00 AM`
//                                 : hourIndex === 12
//                                 ? "12:00 PM"
//                                 : `${hourIndex - 12}:00 PM`}
//                             </Typography>
//                           </Box>
//                           <Box
//                             sx={{
//                               flexGrow: 1,
//                               position: "relative",
//                               p: 1,
//                             }}
//                           >
//                             {getEventsForDate(currentDate)
//                               .filter((event) => {
//                                 if (!event.event_time) return false;
//                                 const [time, ampm] =
//                                   event.event_time.split(" ");
//                                 const [hour] = time.split(":");
//                                 let eventHour = Number.parseInt(hour, 10);
//                                 if (ampm === "pm" && eventHour !== 12) {
//                                   eventHour += 12;
//                                 } else if (ampm === "am" && eventHour === 12) {
//                                   eventHour = 0;
//                                 }
//                                 return eventHour === hourIndex;
//                               })
//                               .map((event, eventIndex) => (
//                                 <Tooltip
//                                   title={`${event.event_title}\n${
//                                     event.employee_name ||
//                                     getEmployeeNameById(event.employee_id)
//                                   }\n${event.event_note}`}
//                                   key={eventIndex}
//                                 >
//                                   <Zoom
//                                     in
//                                     timeout={300 + eventIndex * 100}
//                                   >
//                                     <Card
//                                       sx={{
//                                         bgcolor: event.event_color,
//                                         color: "white",
//                                         mb: 1,
//                                         cursor: "pointer",
//                                         transition: "all 0.2s ease",
//                                         "&:hover": {
//                                           transform: "scale(1.02)",
//                                           boxShadow: 4,
//                                         },
//                                       }}
//                                       onClick={() =>
//                                         handleOpenEditDialog(event)
//                                       }
//                                     >
//                                       <CardContent sx={{ p: 2 }}>
//                                         <Box
//                                           sx={{
//                                             display: "flex",
//                                             justifyContent: "space-between",
//                                             alignItems: "center",
//                                           }}
//                                         >
//                                           <Box>
//                                             <Typography
//                                               variant="subtitle1"
//                                               sx={{ fontWeight: 600 }}
//                                             >
//                                               {event.event_title}
//                                             </Typography>
//                                             <Typography
//                                               variant="body2"
//                                               sx={{ opacity: 0.9 }}
//                                             >
//                                               {event.event_time} •{" "}
//                                               {event.employee_name ||
//                                                 getEmployeeNameById(
//                                                   event.employee_id
//                                                 )}
//                                             </Typography>
//                                           </Box>
//                                           <Box
//                                             sx={{
//                                               display: "flex",
//                                               gap: 1,
//                                             }}
//                                           >
//                                             <IconButton
//                                               size="small"
//                                               sx={{
//                                                 color: "white",
//                                                 "&:hover": {
//                                                   bgcolor:
//                                                     "rgba(255,255,255,0.2)",
//                                                 },
//                                               }}
//                                               onClick={(e) => {
//                                                 e.stopPropagation();
//                                                 handleOpenEditDialog(event);
//                                               }}
//                                             >
//                                               <EditIcon fontSize="small" />
//                                             </IconButton>
//                                           </Box>
//                                         </Box>
//                                       </CardContent>
//                                     </Card>
//                                   </Zoom>
//                                 </Tooltip>
//                               ))}
//                           </Box>
//                         </Box>
//                       ))}
//                     </Box>
//                   </Box>
//                 )}
//                 {calendarViewType === "list" && (
//                   <Box>
//                     <TableContainer sx={{ borderRadius: 2 }}>
//                       <Table>
//                         <TableHead>
//                           <TableRow sx={{ bgcolor: "#f8f9fa" }}>
//                             <TableCell
//                               sx={{
//                                 fontWeight: "bold",
//                                 borderRadius: "8px 0 0 0",
//                               }}
//                             >
//                               EVENT TITLE
//                             </TableCell>
//                             <TableCell sx={{ fontWeight: "bold" }}>
//                               EMPLOYEE
//                             </TableCell>
//                             <TableCell sx={{ fontWeight: "bold" }}>
//                               EVENT DATE
//                             </TableCell>
//                             <TableCell sx={{ fontWeight: "bold" }}>
//                               EVENT TIME
//                             </TableCell>
//                             <TableCell
//                               sx={{
//                                 fontWeight: "bold",
//                                 borderRadius: "0 8px 0 0",
//                               }}
//                             >
//                               ACTIONS
//                             </TableCell>
//                           </TableRow>
//                         </TableHead>
//                         <TableBody>
//                           {loading ? (
//                             <TableRow>
//                               <TableCell
//                                 colSpan={5}
//                                 align="center"
//                                 sx={{ py: 4 }}
//                               >
//                                 Loading events...
//                               </TableCell>
//                             </TableRow>
//                           ) : events.length === 0 ? (
//                             <TableRow>
//                               <TableCell
//                                 colSpan={5}
//                                 align="center"
//                                 sx={{ py: 4 }}
//                               >
//                                 No events found
//                               </TableCell>
//                             </TableRow>
//                           ) : (
//                             events.map((event) => (
//                               <TableRow
//                                 key={event.event_id}
//                                 hover
//                                 sx={{
//                                   "&:hover": { bgcolor: "#f8f9fa" },
//                                   transition: "background-color 0.2s",
//                                 }}
//                               >
//                                 <TableCell>
//                                   <Box
//                                     sx={{
//                                       display: "flex",
//                                       alignItems: "center",
//                                     }}
//                                   >
//                                     <Box
//                                       sx={{
//                                         width: 16,
//                                         height: 16,
//                                         bgcolor: event.event_color,
//                                         borderRadius: 1,
//                                         mr: 2,
//                                         boxShadow: 1,
//                                       }}
//                                     />
//                                     <Typography
//                                       variant="body2"
//                                       sx={{ fontWeight: 500 }}
//                                     >
//                                       {event.event_title}
//                                     </Typography>
//                                   </Box>
//                                 </TableCell>
//                                 <TableCell>
//                                   <Chip
//                                     label={
//                                       event.employee_name ||
//                                       getEmployeeNameById(event.employee_id)
//                                     }
//                                     size="small"
//                                     variant="outlined"
//                                     sx={{ borderRadius: 2 }}
//                                   />
//                                 </TableCell>
//                                 <TableCell>{event.event_date}</TableCell>
//                                 <TableCell>{event.event_time}</TableCell>
//                                 <TableCell>
//                                   <Box sx={{ display: "flex", gap: 1 }}>
//                                     <IconButton
//                                       size="small"
//                                       color="primary"
//                                       onClick={() =>
//                                         handleOpenEditDialog(event)
//                                       }
//                                       disabled={!hasPermission("edit")}
//                                       sx={{
//                                         borderRadius: 2,
//                                         "&:hover": {
//                                           bgcolor:
//                                             "rgba(140, 37, 124, 0.1)",
//                                         },
//                                       }}
//                                     >
//                                       <EditIcon fontSize="small" />
//                                     </IconButton>
//                                     <IconButton
//                                       size="small"
//                                       color="error"
//                                       onClick={() =>
//                                         handleOpenDeleteConfirm(event)
//                                       }
//                                       disabled={!hasPermission("delete")}
//                                       sx={{
//                                         borderRadius: 2,
//                                         "&:hover": { bgcolor: "#ffebee" },
//                                       }}
//                                     >
//                                       <DeleteIcon fontSize="small" />
//                                     </IconButton>
//                                   </Box>
//                                 </TableCell>
//                               </TableRow>
//                             ))
//                           )}
//                         </TableBody>
//                       </Table>
//                     </TableContainer>
//                   </Box>
//                 )}
//               </Paper>
//             )}
//           </Box>
//         </Box>
//       </Box>
 
//       <Dialog
//         open={isEditDialogOpen}
//         onClose={handleCloseEditDialog}
//         maxWidth="sm"
//         fullWidth
//         PaperProps={{ sx: { borderRadius: 3 } }}
//       >
//         <DialogTitle sx={{ pb: 1 }}>
//           <Typography
//             variant="h6"
//             sx={{ fontWeight: "bold", color: "#333" }}
//           >
//             Edit Event
//           </Typography>
//         </DialogTitle>
//         <DialogContent>
//           {editingEvent && (
//             <Box sx={{ mt: 2 }}>
//               <Box sx={{ mb: 2 }}>
//                 <Typography
//                   variant="subtitle1"
//                   sx={{ mb: 1, fontWeight: 500 }}
//                 >
//                   Employee <span style={{ color: "red" }}>*</span>
//                 </Typography>
//                 <FormControl fullWidth>
//                   <Select
//                     value={editingEvent.employee_id}
//                     onChange={(e) =>
//                       handleEditingEventChange("employee_id", e.target.value)
//                     }
//                     displayEmpty
//                     sx={{ borderRadius: 2 }}
//                     renderValue={(selectedId) => {
//                       if (!selectedId) {
//                         return <em>Select Employee</em>;
//                       }
//                       const selectedEmployee = employeesList.find(
//                         (emp) => emp.id == selectedId
//                       );
//                       return selectedEmployee ? selectedEmployee.name : "";
//                     }}
//                   >
//                     <MenuItem value="">
//                       <em>Select Employee</em>
//                     </MenuItem>
//                     {employeesList.map((employee) => (
//                       <MenuItem key={employee.id} value={employee.id}>
//                         {employee.name}
//                       </MenuItem>
//                     ))}
//                   </Select>
//                 </FormControl>
//               </Box>
 
//               <Box sx={{ mb: 2 }}>
//                 <Typography
//                   variant="subtitle1"
//                   sx={{ mb: 1, fontWeight: 500 }}
//                 >
//                   Event Title <span style={{ color: "red" }}>*</span>
//                 </Typography>
//                 <TextField
//                   fullWidth
//                   placeholder="Event Title"
//                   value={editingEvent.event_title}
//                   onChange={(e) =>
//                     handleEditingEventChange("event_title", e.target.value)
//                   }
//                   required
//                   sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
//                 />
//               </Box>
//               <Box sx={{ mb: 2 }}>
//                 <Typography
//                   variant="subtitle1"
//                   sx={{ mb: 1, fontWeight: 500 }}
//                 >
//                   Event Date <span style={{ color: "red" }}>*</span>
//                 </Typography>
//                 <TextField
//                   fullWidth
//                   placeholder="Event Date"
//                   value={editingEvent.event_date}
//                   onClick={handleDatePickerOpen}
//                   InputProps={{
//                     readOnly: true,
//                     endAdornment: (
//                       <InputAdornment position="end">
//                         <CalendarTodayIcon sx={{ color: "#8C257C" }} />
//                       </InputAdornment>
//                     ),
//                   }}
//                   required
//                   sx={{
//                     "& .MuiOutlinedInput-root": {
//                       borderRadius: 2,
//                       cursor: "pointer",
//                     },
//                   }}
//                 />
//               </Box>
//               <Box sx={{ mb: 2 }}>
//                 <Typography
//                   variant="subtitle1"
//                   sx={{ mb: 1, fontWeight: 500 }}
//                 >
//                   Event Time <span style={{ color: "red" }}>*</span>
//                 </Typography>
//                 <TextField
//                   fullWidth
//                   placeholder="Event Time"
//                   value={editingEvent.event_time}
//                   onClick={handleTimePickerOpen}
//                   InputProps={{
//                     readOnly: true,
//                     endAdornment: (
//                       <InputAdornment position="end">
//                         <AccessTimeIcon sx={{ color: "#8C257C" }} />
//                       </InputAdornment>
//                     ),
//                   }}
//                   required
//                   sx={{
//                     "& .MuiOutlinedInput-root": {
//                       borderRadius: 2,
//                       cursor: "pointer",
//                     },
//                   }}
//                 />
//               </Box>
//               <Box sx={{ mb: 2 }}>
//                 <Typography
//                   variant="subtitle1"
//                   sx={{ mb: 1, fontWeight: 500 }}
//                 >
//                   Event Color
//                 </Typography>
//                 <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//                   <Box
//                     sx={{
//                       width: 32,
//                       height: 32,
//                       bgcolor: editingEvent.event_color,
//                       borderRadius: 2,
//                       border: "2px solid #e0e0e0",
//                       cursor: "pointer",
//                       transition: "transform 0.2s",
//                       "&:hover": { transform: "scale(1.1)" },
//                     }}
//                   />
//                   <TextField
//                     fullWidth
//                     value={editingEvent.event_color}
//                     onChange={(e) =>
//                       handleEditingEventChange("event_color", e.target.value)
//                     }
//                     sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
//                   />
//                 </Box>
//               </Box>
//               <Box sx={{ mb: 2 }}>
//                 <Typography
//                   variant="subtitle1"
//                   sx={{ mb: 1, fontWeight: 500 }}
//                 >
//                   Event Note <span style={{ color: "red" }}>*</span>
//                 </Typography>
//                 <TextField
//                   fullWidth
//                   multiline
//                   rows={4}
//                   placeholder="Event Note"
//                   value={editingEvent.event_note}
//                   onChange={(e) =>
//                     handleEditingEventChange("event_note", e.target.value)
//                   }
//                   required
//                   sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
//                 />
//               </Box>
//             </Box>
//           )}
//         </DialogContent>
//         <DialogActions sx={{ p: 3, pt: 1 }}>
//           <Button
//             onClick={handleCloseEditDialog}
//             variant="outlined"
//             sx={{
//               borderColor: "#ddd",
//               color: "#666",
//               borderRadius: 2,
//               "&:hover": { borderColor: "#bbb" },
//             }}
//           >
//             Cancel
//           </Button>
//           <Button
//             onClick={updateEvent}
//             variant="contained"
//             disabled={loading}
//             sx={{
//               bgcolor: "#8C257C",
//               "&:hover": { bgcolor: "#701D62" },
//               borderRadius: 2,
//               px: 3,
//             }}
//           >
//             {loading ? "Updating..." : "Update Event"}
//           </Button>
//         </DialogActions>
//       </Dialog>
 
//       <Dialog
//         open={deleteConfirmOpen}
//         onClose={handleCloseDeleteConfirm}
//         PaperProps={{ sx: { borderRadius: 3 } }}
//       >
//         <DialogTitle sx={{ pb: 1 }}>
//           <Typography
//             variant="h6"
//             sx={{ fontWeight: "bold", color: "#d32f2f" }}
//           >
//             Confirm Delete
//           </Typography>
//         </DialogTitle>
//         <DialogContent>
//           <Typography variant="body1">
//             Are you sure you want to delete the event "
//             {eventToDelete?.event_title}"?
//           </Typography>
//           <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
//             This action cannot be undone.
//           </Typography>
//         </DialogContent>
//         <DialogActions sx={{ p: 3, pt: 1 }}>
//           <Button
//             onClick={handleCloseDeleteConfirm}
//             variant="outlined"
//             sx={{
//               borderColor: "#ddd",
//               color: "#666",
//               borderRadius: 2,
//               "&:hover": { borderColor: "#bbb" },
//             }}
//           >
//             Cancel
//           </Button>
//           <Button
//             onClick={deleteEvent}
//             color="error"
//             variant="contained"
//             disabled={loading}
//             sx={{ borderRadius: 2, px: 3 }}
//           >
//             {loading ? "Deleting..." : "Delete Event"}
//           </Button>
//         </DialogActions>
//       </Dialog>
 
//       <Snackbar
//         open={notification.open}
//         autoHideDuration={6000}
//         onClose={handleCloseNotification}
//         anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
//       >
//         <Alert
//           onClose={handleCloseNotification}
//           severity={notification.severity}
//           sx={{
//             width: "100%",
//             borderRadius: 2,
//             "& .MuiAlert-icon": { fontSize: "1.2rem" },
//           }}
//         >
//           {notification.message}
//         </Alert>
//       </Snackbar>
//     </ThemeProvider>
//   );
// }
 
// export default EventsAdmin;






// import React, { useState, useEffect } from "react";
// import {
//   ThemeProvider,
//   createTheme,
//   Box,
//   Paper,
//   Typography,
//   Button,
//   IconButton,
//   TextField,
//   Select,
//   MenuItem,
//   FormControl,
//   InputLabel,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Grid,
//   CssBaseline,
//   InputAdornment,
//   Popover,
//   Tooltip,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Snackbar,
//   Alert,
//   Chip,
//   Card,
//   CardContent,
//   Fade,
//   Zoom,
//   useMediaQuery,
//   TablePagination,
// } from "@mui/material";
// import {
//   CalendarToday as CalendarTodayIcon,
//   Event as EventIcon,
//   ArrowBack as ArrowBackIcon,
//   ArrowForward as ArrowForwardIcon,
//   AccessTime as AccessTimeIcon,
//   Search as SearchIcon,
//   ArrowUpward as ArrowUpwardIcon,
//   ArrowDownward as ArrowDownwardIcon,
//   Edit as EditIcon,
//   Delete as DeleteIcon,
//   Lock as LockIcon,
//   Person as PersonIcon,
//   Schedule as ScheduleIcon,
//   Today as TodayIcon,
// } from "@mui/icons-material";
// import axios from "axios";
 
// const theme = createTheme({
//   palette: {
//     primary: {
//       main: "#8C257C",
//     },
//     secondary: {
//       main: "#f50057",
//     },
//     background: {
//       default: "#f5f5f9",
//     },
//   },
//   components: {
//     MuiTableCell: {
//       styleOverrides: {
//         root: {
//           padding: "8px 16px",
//         },
//       },
//     },
//     MuiButton: {
//       styleOverrides: {
//         root: {
//           textTransform: "none",
//           borderRadius: "8px",
//         },
//       },
//     },
//     MuiPaper: {
//       styleOverrides: {
//         root: {
//           borderRadius: "12px",
//         },
//       },
//     },
//   },
// });
 
// function EventsAdmin() {
//   const [activeView, setActiveView] = useState("events");
//   const [calendarViewType, setCalendarViewType] = useState("month");
 
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
 
//   const [authToken, setAuthToken] = useState("");
//   const [userRole, setUserRole] = useState("");
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
 
//   const [employeesList, setEmployeesList] = useState([]);
//   const [loadingEmployees, setLoadingEmployees] = useState(false);
 
//   const [events, setEvents] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
 
//   const [newEvent, setNewEvent] = useState({
//     event_title: "",
//     employee_id: "",
//     event_date: "",
//     event_time: "",
//     event_color: "#8C257C",
//     event_note: "",
//   });
 
//   const [editingEvent, setEditingEvent] = useState(null);
//   const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
 
//   const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
//   const [eventToDelete, setEventToDelete] = useState(null);
 
//   const [notification, setNotification] = useState({
//     open: false,
//     message: "",
//     severity: "success",
//   });
 
//   const [currentDate, setCurrentDate] = useState(new Date());
//   const [calendarDays, setCalendarDays] = useState([]);
 
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(15);
//   const [searchTerm, setSearchTerm] = useState("");
 
//   const [sortConfig, setSortConfig] = useState({
//     key: null,
//     direction: "asc",
//   });
 
//   const [datePickerOpen, setDatePickerOpen] = useState(false);
//   const [datePickerAnchorEl, setDatePickerAnchorEl] = useState(null);
 
//   const [timePickerOpen, setTimePickerOpen] = useState(false);
//   const [timePickerAnchorEl, setTimePickerAnchorEl] = useState(null);
 
//   const [colorPickerOpen, setColorPickerOpen] = useState(false);
//   const [colorPickerAnchorEl, setColorPickerAnchorEl] = useState(null);
 
//   const colorPalette = [
//     "#8C257C",
//     "#f44336",
//     "#e91e63",
//     "#9c27b0",
//     "#673ab7",
//     "#3f51b5",
//     "#2196f3",
//     "#03a9f4",
//     "#00bcd4",
//     "#009688",
//     "#4caf50",
//     "#8bc34a",
//     "#cddc39",
//     "#ffeb3b",
//     "#ffc107",
//     "#ff9800",
//     "#ff5722",
//     "#795548",
//     "#9e9e9e",
//     "#607d8b",
//   ];
 
//   useEffect(() => {
//     const token = localStorage.getItem("accessToken");
//     const role = localStorage.getItem("userRole");
 
//     if (token) {
//       setAuthToken(token);
//       setUserRole(role || "admin");
//       setIsAuthenticated(true);
//     } else {
//       setAuthToken("demo-token");
//       setUserRole("admin");
//       setIsAuthenticated(true);
//       setNotification({
//         open: true,
//         message: "Demo mode: Authentication simulated",
//         severity: "info",
//       });
//     }
//   }, []);
 
//   const getAuthHeaders = () => {
//     const headers = {
//       "Content-Type": "application/json",
//     };
 
//     if (authToken && authToken !== "demo-token") {
//       headers["Authorization"] = `Bearer ${authToken}`;
//     }
 
//     return headers;
//   };
 
//   const handleAuthError = (error) => {
//     if (error.status === 401) {
//       setNotification({
//         open: true,
//         message: "Authentication expired. Please log in again.",
//         severity: "error",
//       });
//       setIsAuthenticated(false);
//       localStorage.removeItem("accessToken");
//       localStorage.removeItem("userRole");
//     }
//     return error;
//   };
 
//   useEffect(() => {
//     const fetchEmployees = async () => {
//       try {
//         const token = localStorage.getItem("accessToken");
//         const response = await axios.get(
//           "https://tdtlworld.com/hrms-backend/employee-dropdown/",
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
 
//         const formattedData = response.data.map((emp) => ({
//           id: emp.value,
//           emp_id: emp.emp_id,
//           name: emp.label,
//           email: emp.email,
//         }));
 
//         setEmployeesList(formattedData);
//       } catch (error) {
//         console.error("Failed to fetch employee list", error);
//       }
//     };
 
//     fetchEmployees();
//   }, []);
 
//   const fetchEvents = async () => {
//     if (!isAuthenticated) {
//       setNotification({
//         open: true,
//         message: "Authentication required to fetch events.",
//         severity: "warning",
//       });
//       return;
//     }
 
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await fetch(
//         "https://tdtlworld.com/hrms-backend/events/",
//         {
//           method: "GET",
//           headers: getAuthHeaders(),
//         }
//       );
 
//       if (response.status === 401) {
//         throw handleAuthError({ status: 401 });
//       }
 
//       if (!response.ok) {
//         throw new Error(`Failed to fetch events: ${response.status}`);
//       }
 
//       const data = await response.json();
 
//       const transformedEvents = Array.isArray(data)
//         ? data.map((event) => ({
//             event_id: event.event_id,
//             company_id: event.company_id,
//             employee_id: event.employee_id,
//             employee_name: event.employee_name,
//             event_title: event.event_title,
//             event_date: formatDateFromAPI(event.event_date),
//             event_time: formatTimeFromAPI(event.event_time),
//             event_color: event.event_color || "#8C257C",
//             event_note: event.event_note,
//             created_at: event.created_at,
//           }))
//         : [];
 
//       setEvents(transformedEvents);
//     } catch (err) {
//       if (err.status !== 401) {
//         setError(err.message);
//         setNotification({
//           open: true,
//           message: `Error fetching events: ${err.message}`,
//           severity: "error",
//         });
//       }
//     } finally {
//       setLoading(false);
//     }
//   };
 
//   const createEvent = async () => {
//     if (!isAuthenticated) {
//       setNotification({
//         open: true,
//         message: "Authentication required to create events.",
//         severity: "warning",
//       });
//       return;
//     }
 
//     if (!validateEventForm()) {
//       return;
//     }
 
//     setLoading(true);
//     setError(null);
 
//     try {
//       const [day, month, year] = newEvent.event_date.split("/");
//       const formattedDate = `${year}-${month.padStart(2, "0")}-${day.padStart(
//         2,
//         "0"
//       )}`;
 
//       const formattedTime = formatTimeForAPI(newEvent.event_time);
 
//       const selectedEmployee = employeesList.find(
//         (emp) => emp.id == newEvent.employee_id
//       );
 
//       if (!selectedEmployee) {
//         setNotification({
//           open: true,
//           message:
//             "Could not find employee details. Please select an employee.",
//           severity: "error",
//         });
//         setLoading(false);
//         return;
//       }
 
//       const payload = {
//         company_id: 2,
//         employee_id: selectedEmployee.emp_id,
//         event_title: newEvent.event_title,
//         event_date: formattedDate,
//         event_time: formattedTime,
//         event_color: newEvent.event_color,
//         event_note: newEvent.event_note,
//       };
 
//       const response = await fetch(
//         "https://tdtlworld.com/hrms-backend/events/",
//         {
//           method: "POST",
//           headers: getAuthHeaders(),
//           body: JSON.stringify(payload),
//         }
//       );
 
//       if (response.status === 401) {
//         throw handleAuthError({ status: 401 });
//       }
 
//       if (!response.ok) {
//         const errorData = await response.text();
//         throw new Error(
//           `Failed to create event: ${response.status} - ${errorData}`
//         );
//       }
 
//       await fetchEvents();
 
//       resetEventForm();
 
//       setNotification({
//         open: true,
//         message: "Event created successfully",
//         severity: "success",
//       });
//     } catch (err) {
//       if (err.status !== 401) {
//         setError(err.message);
//         setNotification({
//           open: true,
//           message: `Error creating event: ${err.message}`,
//           severity: "error",
//         });
//       }
//     } finally {
//       setLoading(false);
//     }
//   };
 
//   const updateEvent = async () => {
//     if (!isAuthenticated) {
//       setNotification({
//         open: true,
//         message: "Authentication required to update events.",
//         severity: "warning",
//       });
//       return;
//     }
 
//     if (!editingEvent || !validateEventForm(editingEvent)) {
//       return;
//     }
 
//     setLoading(true);
//     setError(null);
 
//     try {
//       const [day, month, year] = editingEvent.event_date.split("/");
//       const formattedDate = `${year}-${month.padStart(2, "0")}-${day.padStart(
//         2,
//         "0"
//       )}`;
 
//       const formattedTime = formatTimeForAPI(editingEvent.event_time);
 
//       const selectedEmployee = employeesList.find(
//         (emp) => emp.id == editingEvent.employee_id
//       );
 
//       if (!selectedEmployee) {
//         setNotification({
//           open: true,
//           message:
//             "Could not find employee details. Please select an employee.",
//           severity: "error",
//         });
//         setLoading(false);
//         return;
//       }
 
//       const payload = {
//         company_id: 2,
//         employee_id: selectedEmployee.emp_id,
//         event_title: editingEvent.event_title,
//         event_date: formattedDate,
//         event_time: formattedTime,
//         event_color: editingEvent.event_color,
//         event_note: editingEvent.event_note,
//       };
 
//       const response = await fetch(
//         `https://tdtlworld.com/hrms-backend/events/${editingEvent.event_id}/`,
//         {
//           method: "PATCH",
//           headers: getAuthHeaders(),
//           body: JSON.stringify(payload),
//         }
//       );
 
//       if (response.status === 401) {
//         throw handleAuthError({ status: 401 });
//       }
 
//       if (!response.ok) {
//         const errorData = await response.text();
//         throw new Error(
//           `Failed to update event: ${response.status} - ${errorData}`
//         );
//       }
 
//       await fetchEvents();
 
//       setIsEditDialogOpen(false);
//       setEditingEvent(null);
 
//       setNotification({
//         open: true,
//         message: "Event updated successfully",
//         severity: "success",
//       });
//     } catch (err) {
//       if (err.status !== 401) {
//         setError(err.message);
//         setNotification({
//           open: true,
//           message: `Error updating event: ${err.message}`,
//           severity: "error",
//         });
//       }
//     } finally {
//       setLoading(false);
//     }
//   };
 
//   const deleteEvent = async () => {
//     if (!isAuthenticated) {
//       setNotification({
//         open: true,
//         message: "Authentication required to delete events.",
//         severity: "warning",
//       });
//       return;
//     }
 
//     if (!eventToDelete) {
//       return;
//     }
 
//     setLoading(true);
//     setError(null);
 
//     try {
//       const response = await fetch(
//         `https://tdtlworld.com/hrms-backend/events/${eventToDelete.event_id}/`,
//         {
//           method: "DELETE",
//           headers: getAuthHeaders(),
//         }
//       );
 
//       if (response.status === 401) {
//         throw handleAuthError({ status: 401 });
//       }
 
//       if (!response.ok) {
//         const errorData = await response.text();
//         throw new Error(
//           `Failed to delete event: ${response.status} - ${errorData}`
//         );
//       }
 
//       await fetchEvents();
 
//       setDeleteConfirmOpen(false);
//       setEventToDelete(null);
 
//       setNotification({
//         open: true,
//         message: "Event deleted successfully",
//         severity: "success",
//       });
//     } catch (err) {
//       if (err.status !== 401) {
//         setError(err.message);
//         setNotification({
//           open: true,
//           message: `Error deleting event: ${err.message}`,
//           severity: "error",
//         });
//       }
//     } finally {
//       setLoading(false);
//     }
//   };
 
//   const formatDateFromAPI = (dateString) => {
//     if (!dateString) return "";
//     const [year, month, day] = dateString.split("-");
//     return `${day.padStart(2, "0")}/${month.padStart(2, "0")}/${year}`;
//   };
 
//   const formatTimeFromAPI = (timeString) => {
//     if (!timeString) return "";
 
//     const timeParts = timeString.split(":");
//     let hours = Number.parseInt(timeParts[0], 10);
//     const minutes = timeParts[1] ? timeParts[1].padStart(2, "0") : "00";
 
//     const ampm = hours >= 12 ? "pm" : "am";
//     hours = hours % 12;
//     hours = hours ? hours : 12;
 
//     return `${hours}:${minutes} ${ampm}`;
//   };
 
//   const formatTimeForAPI = (timeString) => {
//     if (!timeString) return "";
 
//     const [time, ampm] = timeString.split(" ");
//     let [hours, minutes] = time.split(":");
 
//     hours = Number.parseInt(hours, 10);
//     if (ampm && ampm.toLowerCase() === "pm" && hours < 12) {
//       hours += 12;
//     } else if (ampm && ampm.toLowerCase() === "am" && hours === 12) {
//       hours = 0;
//     }
 
//     return `${hours.toString().padStart(2, "0")}:${minutes.padStart(
//       2,
//       "0"
//     )}:00.000000`;
//   };
 
//   const validateEventForm = (eventData = newEvent) => {
//     if (!eventData.employee_id) {
//       setNotification({
//         open: true,
//         message: "Please select an employee",
//         severity: "error",
//       });
//       return false;
//     }
 
//     if (!eventData.event_title) {
//       setNotification({
//         open: true,
//         message: "Event title is required",
//         severity: "error",
//       });
//       return false;
//     }
 
//     if (!eventData.event_date) {
//       setNotification({
//         open: true,
//         message: "Event date is required",
//         severity: "error",
//       });
//       return false;
//     }
 
//     if (!eventData.event_time) {
//       setNotification({
//         open: true,
//         message: "Event time is required",
//         severity: "error",
//       });
//       return false;
//     }
 
//     if (!eventData.event_note) {
//       setNotification({
//         open: true,
//         message: "Event note is required",
//         severity: "error",
//       });
//       return false;
//     }
 
//     return true;
//   };
 
//   const resetEventForm = () => {
//     setNewEvent({
//       event_title: "",
//       employee_id: employeesList.length > 0 ? employeesList[0].id : "",
//       event_date: "",
//       event_time: "",
//       event_color: "#8C257C",
//       event_note: "",
//     });
//   };
 
//   const handleEventChange = (field, value) => {
//     setNewEvent({
//       ...newEvent,
//       [field]: value,
//     });
//   };
 
//   const handleEditingEventChange = (field, value) => {
//     setEditingEvent({
//       ...editingEvent,
//       [field]: value,
//     });
//   };
 
//   const handleOpenEditDialog = (event) => {
//     const matchingEmployee = employeesList.find(
//       (emp) => emp.emp_id === event.employee_id
//     );
 
//     setEditingEvent({
//       ...event,
//       employee_id: matchingEmployee ? matchingEmployee.id : "",
//     });
 
//     setIsEditDialogOpen(true);
//   };
 
//   const handleCloseEditDialog = () => {
//     setIsEditDialogOpen(false);
//     setEditingEvent(null);
//   };
 
//   const handleOpenDeleteConfirm = (event) => {
//     setEventToDelete(event);
//     setDeleteConfirmOpen(true);
//   };
 
//   const handleCloseDeleteConfirm = () => {
//     setDeleteConfirmOpen(false);
//     setEventToDelete(null);
//   };
 
//   const handleCloseNotification = () => {
//     setNotification({
//       ...notification,
//       open: false,
//     });
//   };
 
//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };
 
//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(Number.parseInt(event.target.value, 10));
//     setPage(0);
//   };
 
//   const handleSearch = (e) => {
//     setSearchTerm(e.target.value);
//     setPage(0);
//   };
 
//   const requestSort = (key) => {
//     let direction = "asc";
//     if (sortConfig.key === key && sortConfig.direction === "asc") {
//       direction = "desc";
//     }
//     setSortConfig({ key, direction });
//   };
 
//   useEffect(() => {
//     const generateCalendarDays = () => {
//       const year = currentDate.getFullYear();
//       const month = currentDate.getMonth();
 
//       const firstDay = new Date(year, month, 1);
//       const lastDay = new Date(year, month + 1, 0);
//       const firstDayOfWeek = firstDay.getDay();
//       const daysFromPrevMonth = firstDayOfWeek;
//       const totalDays = 42;
//       const days = [];
//       const prevMonth = new Date(year, month, 0);
//       const prevMonthDays = prevMonth.getDate();
 
//       for (
//         let i = prevMonthDays - daysFromPrevMonth + 1;
//         i <= prevMonthDays;
//         i++
//       ) {
//         days.push({
//           date: new Date(year, month - 1, i),
//           isCurrentMonth: false,
//           events: [],
//         });
//       }
//       for (let i = 1; i <= lastDay.getDate(); i++) {
//         days.push({
//           date: new Date(year, month, i),
//           isCurrentMonth: true,
//           events: [],
//         });
//       }
//       const remainingDays = totalDays - days.length;
//       for (let i = 1; i <= remainingDays; i++) {
//         days.push({
//           date: new Date(year, month + 1, i),
//           isCurrentMonth: false,
//           events: [],
//         });
//       }
//       setCalendarDays(days);
//     };
//     generateCalendarDays();
//   }, [currentDate]);
 
//   useEffect(() => {
//     if (isAuthenticated) {
//       fetchEvents();
//     }
//   }, [isAuthenticated]);
 
//   const filteredEvents = events.filter(
//     (event) =>
//       event.event_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       event.event_date.includes(searchTerm) ||
//       event.event_time.includes(searchTerm) ||
//       (event.employee_name &&
//         event.employee_name.toLowerCase().includes(searchTerm.toLowerCase()))
//   );
 
//   const sortedEvents = React.useMemo(() => {
//     const sortableEvents = [...filteredEvents];
//     if (sortConfig.key) {
//       sortableEvents.sort((a, b) => {
//         if (a[sortConfig.key] < b[sortConfig.key]) {
//           return sortConfig.direction === "asc" ? -1 : 1;
//         }
//         if (a[sortConfig.key] > b[sortConfig.key]) {
//           return sortConfig.direction === "asc" ? 1 : -1;
//         }
//         return 0;
//       });
//     }
//     return sortableEvents;
//   }, [filteredEvents, sortConfig]);
 
//   const paginatedEvents = sortedEvents.slice(
//     page * rowsPerPage,
//     page * rowsPerPage + rowsPerPage
//   );
 
//   const goToPreviousMonth = () => {
//     setCurrentDate(
//       new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
//     );
//   };
 
//   const goToNextMonth = () => {
//     setCurrentDate(
//       new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
//     );
//   };
 
//   const goToToday = () => {
//     setCurrentDate(new Date());
//   };
 
//   function formatMonthYear(date) {
//     return date.toLocaleString("en-US", { month: "long", year: "numeric" });
//   }
 
//   const getDayNumber = (date) => {
//     return date.getDate();
//   };
 
//   const isToday = (date) => {
//     const today = new Date();
//     return (
//       date.getDate() === today.getDate() &&
//       date.getMonth() === today.getMonth() &&
//       date.getFullYear() === today.getFullYear()
//     );
//   };
 
//   const handleDatePickerOpen = (event, isEditing = false) => {
//     setDatePickerAnchorEl(event.currentTarget);
//     setDatePickerOpen(true);
//   };
 
//   const handleDatePickerClose = () => {
//     setDatePickerOpen(false);
//   };
 
//   const handleDateSelect = (date) => {
//     const day = date.getDate().toString().padStart(2, "0");
//     const month = (date.getMonth() + 1).toString().padStart(2, "0");
//     const year = date.getFullYear();
//     const formattedDate = `${day}/${month}/${year}`;
 
//     if (editingEvent) {
//       handleEditingEventChange("event_date", formattedDate);
//     } else {
//       handleEventChange("event_date", formattedDate);
//     }
 
//     handleDatePickerClose();
//   };
 
//   const handleTimePickerOpen = (event) => {
//     setTimePickerAnchorEl(event.currentTarget);
//     setTimePickerOpen(true);
//   };
 
//   const handleTimePickerClose = () => {
//     setTimePickerOpen(false);
//   };
 
//   const handleTimeSelect = (hours, minutes, ampm) => {
//     const formattedTime = `${hours}:${minutes} ${ampm}`;
 
//     if (editingEvent) {
//       handleEditingEventChange("event_time", formattedTime);
//     } else {
//       handleEventChange("event_time", formattedTime);
//     }
 
//     handleTimePickerClose();
//   };
 
//   const handleColorPickerOpen = (event) => {
//     setColorPickerAnchorEl(event.currentTarget);
//     setColorPickerOpen(true);
//   };
 
//   const handleColorPickerClose = () => {
//     setColorPickerOpen(false);
//   };
 
//   const handleColorSelect = (color) => {
//     if (editingEvent) {
//       handleEditingEventChange("event_color", color);
//     } else {
//       handleEventChange("event_color", color);
//     }
//     handleColorPickerClose();
//   };
 
//   const getEventsForDate = (date) => {
//     return events.filter((event) => {
//       if (!event.event_date) return false;
//       const [day, month, year] = event.event_date.split("/");
//       const eventDate = new Date(
//         Number.parseInt(year),
//         Number.parseInt(month) - 1,
//         Number.parseInt(day)
//       );
//       return (
//         eventDate.getDate() === date.getDate() &&
//         eventDate.getMonth() === date.getMonth() &&
//         eventDate.getFullYear() === date.getFullYear()
//       );
//     });
//   };
 
//   const hasPermission = (action) => {
//     if (!isAuthenticated) return false;
//     if (action === "delete" && userRole !== "admin") return false;
//     return true;
//   };
 
//   const DatePicker = () => {
//     const [pickerDate, setPickerDate] = useState(new Date());
//     const [pickerDays, setPickerDays] = useState([]);
 
//     useEffect(() => {
//       const generatePickerDays = () => {
//         const year = pickerDate.getFullYear();
//         const month = pickerDate.getMonth();
//         const firstDay = new Date(year, month, 1);
//         const lastDay = new Date(year, month + 1, 0);
//         const firstDayOfWeek = firstDay.getDay();
//         const daysFromPrevMonth = firstDayOfWeek;
//         const totalDays = 42;
//         const days = [];
//         const prevMonth = new Date(year, month, 0);
//         const prevMonthDays = prevMonth.getDate();
 
//         for (
//           let i = prevMonthDays - daysFromPrevMonth + 1;
//           i <= prevMonthDays;
//           i++
//         ) {
//           days.push({
//             date: new Date(year, month - 1, i),
//             isCurrentMonth: false,
//           });
//         }
//         for (let i = 1; i <= lastDay.getDate(); i++) {
//           days.push({
//             date: new Date(year, month, i),
//             isCurrentMonth: true,
//           });
//         }
//         const remainingDays = totalDays - days.length;
//         for (let i = 1; i <= remainingDays; i++) {
//           days.push({
//             date: new Date(year, month + 1, i),
//             isCurrentMonth: false,
//           });
//         }
//         setPickerDays(days);
//       };
//       generatePickerDays();
//     }, [pickerDate]);
 
//     const goToPreviousMonth = () => {
//       setPickerDate(
//         new Date(pickerDate.getFullYear(), pickerDate.getMonth() - 1, 1)
//       );
//     };
 
//     const goToNextMonth = () => {
//       setPickerDate(
//         new Date(pickerDate.getFullYear(), pickerDate.getMonth() + 1, 1)
//       );
//     };
//     return (
//       <Paper elevation={8} sx={{ width: 320, p: 3, borderRadius: 3 }}>
//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             mb: 3,
//           }}
//         >
//           <IconButton
//             onClick={goToPreviousMonth}
//             size="small"
//             sx={{
//               bgcolor: "#f5f5f5",
//               "&:hover": { bgcolor: "#e0e0e0" },
//               borderRadius: 2,
//             }}
//           >
//             <ArrowBackIcon />
//           </IconButton>
//           <Typography variant="h6" sx={{ fontWeight: 600, color: "#8C257C" }}>
//             {pickerDate.toLocaleString("default", {
//               month: "long",
//               year: "numeric",
//             })}
//           </Typography>
//           <IconButton
//             onClick={goToNextMonth}
//             size="small"
//             sx={{
//               bgcolor: "#f5f5f5",
//               "&:hover": { bgcolor: "#e0e0e0" },
//               borderRadius: 2,
//             }}
//           >
//             <ArrowForwardIcon />
//           </IconButton>
//         </Box>
//         <Grid container spacing={0.5}>
//           {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day, index) => (
//             <Grid item xs key={index} sx={{ textAlign: "center", p: 1 }}>
//               <Typography
//                 variant="caption"
//                 sx={{
//                   fontWeight: "bold",
//                   color: "#666",
//                   fontSize: "0.75rem",
//                 }}
//               >
//                 {day}
//               </Typography>
//             </Grid>
//           ))}
//         </Grid>
//         <Grid container spacing={0.5}>
//           {pickerDays.map((day, index) => (
//             <Grid item xs key={index}>
//               <Box
//                 sx={{
//                   display: "flex",
//                   justifyContent: "center",
//                   alignItems: "center",
//                   height: 40,
//                   cursor: "pointer",
//                   borderRadius: 2,
//                   bgcolor: isToday(day.date) ? "#8C257C" : "transparent",
//                   color: isToday(day.date)
//                     ? "white"
//                     : day.isCurrentMonth
//                     ? "text.primary"
//                     : "text.disabled",
//                   fontWeight: isToday(day.date) ? "bold" : "normal",
//                   transition: "all 0.2s ease",
//                   "&:hover": {
//                     bgcolor: isToday(day.date)
//                       ? "#701D62"
//                       : day.isCurrentMonth
//                       ? "#f0f4ff"
//                       : "#f5f5f5",
//                     transform: "scale(1.05)",
//                   },
//                 }}
//                 onClick={() => handleDateSelect(day.date)}
//               >
//                 <Typography variant="body2" sx={{ fontWeight: "inherit" }}>
//                   {getDayNumber(day.date)}
//                 </Typography>
//               </Box>
//             </Grid>
//           ))}
//         </Grid>
//         <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
//           <Button
//             variant="outlined"
//             size="small"
//             onClick={() => handleDateSelect(new Date())}
//             startIcon={<TodayIcon />}
//             sx={{
//               borderColor: "#8C257C",
//               color: "#8C257C",
//               "&:hover": {
//                 borderColor: "#701D62",
//                 bgcolor: "rgba(140, 37, 124, 0.04)",
//               },
//             }}
//           >
//             Today
//           </Button>
//         </Box>
//       </Paper>
//     );
//   };
 
//   const TimePicker = () => {
//     const [selectedHour, setSelectedHour] = useState("12");
//     const [selectedMinute, setSelectedMinute] = useState("00");
//     const [selectedAmPm, setSelectedAmPm] = useState("pm");
 
//     const hours = Array.from({ length: 12 }, (_, i) =>
//       (i + 1).toString().padStart(2, "0")
//     );
//     const minutes = Array.from({ length: 60 }, (_, i) =>
//       i.toString().padStart(2, "0")
//     );
 
//     const handleSelectTime = () => {
//       handleTimeSelect(selectedHour, selectedMinute, selectedAmPm);
//     };
 
//     return (
//       <Paper elevation={8} sx={{ width: 280, p: 3, borderRadius: 3 }}>
//         <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
//           <ScheduleIcon sx={{ color: "#8C257C", mr: 1 }} />
//           <Typography variant="h6" sx={{ fontWeight: 600, color: "#8C257C" }}>
//             Select Time
//           </Typography>
//         </Box>
//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "space-between",
//             mb: 3,
//             gap: 1,
//           }}
//         >
//           <FormControl sx={{ flex: 1 }}>
//             <InputLabel id="hour-select-label" sx={{ fontSize: "0.875rem" }}>
//               Hour
//             </InputLabel>
//             <Select
//               labelId="hour-select-label"
//               value={selectedHour}
//               onChange={(e) => setSelectedHour(e.target.value)}
//               label="Hour"
//               size="small"
//               sx={{ borderRadius: 2 }}
//             >
//               {hours.map((hour) => (
//                 <MenuItem key={hour} value={hour}>
//                   {hour}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//           <FormControl sx={{ flex: 1 }}>
//             <InputLabel id="minute-select-label" sx={{ fontSize: "0.875rem" }}>
//               Min
//             </InputLabel>
//             <Select
//               labelId="minute-select-label"
//               value={selectedMinute}
//               onChange={(e) => setSelectedMinute(e.target.value)}
//               label="Min"
//               size="small"
//               sx={{ borderRadius: 2 }}
//             >
//               {minutes.map((minute) => (
//                 <MenuItem key={minute} value={minute}>
//                   {minute}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//           <FormControl sx={{ flex: 1 }}>
//             <InputLabel id="ampm-select-label" sx={{ fontSize: "0.875rem" }}>
//               Period
//             </InputLabel>
//             <Select
//               labelId="ampm-select-label"
//               value={selectedAmPm}
//               onChange={(e) => setSelectedAmPm(e.target.value)}
//               label="Period"
//               size="small"
//               sx={{ borderRadius: 2 }}
//             >
//               <MenuItem value="am">AM</MenuItem>
//               <MenuItem value="pm">PM</MenuItem>
//             </Select>
//           </FormControl>
//         </Box>
//         <Box sx={{ display: "flex", justifyContent: "center", gap: 1 }}>
//           <Button
//             variant="outlined"
//             onClick={handleTimePickerClose}
//             sx={{
//               borderColor: "#ddd",
//               color: "#666",
//               "&:hover": { borderColor: "#bbb" },
//             }}
//           >
//             Cancel
//           </Button>
//           <Button
//             variant="contained"
//             onClick={handleSelectTime}
//             sx={{
//               bgcolor: "#8C257C",
//               "&:hover": { bgcolor: "#701D62" },
//               px: 3,
//             }}
//           >
//             Select
//           </Button>
//         </Box>
//       </Paper>
//     );
//   };
 
//   const ColorPicker = ({ onSelect }) => (
//     <Paper elevation={8} sx={{ width: 220, p: 2, borderRadius: 3 }}>
//       <Typography
//         variant="subtitle1"
//         sx={{ fontWeight: 600, color: "#8C257C", mb: 2 }}
//       >
//         Select Color
//       </Typography>
//       <Grid container spacing={1}>
//         {colorPalette.map((color) => (
//           <Grid item key={color}>
//             <Tooltip title={color}>
//               <Box
//                 sx={{
//                   width: 32,
//                   height: 32,
//                   bgcolor: color,
//                   borderRadius: 2,
//                   cursor: "pointer",
//                   transition: "transform 0.2s ease",
//                   "&:hover": {
//                     transform: "scale(1.15)",
//                     boxShadow: "0px 4px 12px rgba(0,0,0,0.2)",
//                   },
//                 }}
//                 onClick={() => onSelect(color)}
//               />
//             </Tooltip>
//           </Grid>
//         ))}
//       </Grid>
//     </Paper>
//   );
 
//   const getEmployeeNameById = (id) => {
//     const employee = employeesList.find((emp) => emp.id == id);
//     return employee ? employee.name : "Unknown Employee";
//   };
 
//   if (!isAuthenticated) {
//     return (
//       <ThemeProvider theme={theme}>
//         <CssBaseline />
//         <Box
//           sx={{
//             display: "flex",
//             flexDirection: "column",
//             minHeight: "100vh",
//             justifyContent: "center",
//             alignItems: "center",
//           }}
//         >
//           <Paper
//             elevation={3}
//             sx={{ p: 4, maxWidth: 500, textAlign: "center" }}
//           >
//             <LockIcon sx={{ fontSize: 60, color: "#8C257C", mb: 2 }} />
//             <Typography variant="h5" sx={{ mb: 2 }}>
//               Authentication Required
//             </Typography>
//             <Typography variant="body1" sx={{ mb: 3 }}>
//               You need to be logged in to access the Events Calendar. Please log
//               in with your credentials.
//             </Typography>
//             <Button
//               variant="contained"
//               sx={{ bgcolor: "#8C257C", "&:hover": { bgcolor: "#701D62" } }}
//               onClick={() => window.location.reload()}
//             >
//               Refresh
//             </Button>
//           </Paper>
//         </Box>
//       </ThemeProvider>
//     );
//   }
 
//   return (
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
//       <Box
//         sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
//       >
//         <Box sx={{ borderBottom: "1px solid #e0e0e0", p: 2, bgcolor: "white" }}>
//           <Box
//             sx={{
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "center",
//               width: "100%",
//               maxWidth: 1200,
//               mx: "auto",
//             }}
//           >
//             <Box sx={{ display: "flex", alignItems: "center", mr: 4 }}>
//               <IconButton
//                 color={activeView === "events" ? "primary" : "default"}
//                 onClick={() => setActiveView("events")}
//                 sx={{
//                   borderRadius: 2,
//                   bgcolor:
//                     activeView === "events"
//                       ? "rgba(140, 37, 124, 0.1)"
//                       : "transparent",
//                   color: activeView === "events" ? "#8C257C" : "inherit",
//                 }}
//               >
//                 <EventIcon />
//               </IconButton>
//               <Box sx={{ ml: 1 }}>
//                 <Typography
//                   variant="subtitle1"
//                   onClick={() => setActiveView("events")}
//                   sx={{
//                     fontWeight: activeView === "events" ? "bold" : "normal",
//                     cursor: "pointer",
//                     color: activeView === "events" ? "#8C257C" : "textPrimary",
//                   }}
//                 >
//                   Events
//                 </Typography>
//                 <Typography variant="caption" color="textSecondary">
//                   Set up Events
//                 </Typography>
//               </Box>
//             </Box>
//             <Box sx={{ display: "flex", alignItems: "center" }}>
//               <IconButton
//                 onClick={() => setActiveView("calendar")}
//                 sx={{
//                   borderRadius: 2,
//                   bgcolor:
//                     activeView === "calendar"
//                       ? "rgba(140, 37, 124, 0.1)"
//                       : "transparent",
//                   color: activeView === "calendar" ? "#8C257C" : "inherit",
//                 }}
//               >
//                 <CalendarTodayIcon />
//               </IconButton>
//               <Box sx={{ ml: 1 }}>
//                 <Typography
//                   variant="subtitle1"
//                   onClick={() => setActiveView("calendar")}
//                   sx={{
//                     fontWeight: activeView === "calendar" ? "bold" : "normal",
//                     cursor: "pointer",
//                     color:
//                       activeView === "calendar" ? "#8C257C" : "textPrimary",
//                   }}
//                 >
//                   Calendar
//                 </Typography>
//                 <Typography variant="caption" color="textSecondary">
//                   Events Calendar
//                 </Typography>
//               </Box>
//             </Box>
//           </Box>
//         </Box>
//         <Box sx={{ p: 3, flexGrow: 1, bgcolor: "#f5f5f9" }}>
//           <Box sx={{ maxWidth: 1200, mx: "auto" }}>
//             {activeView === "events" ? (
//               <Grid container spacing={isMobile ? 0 : 3}>
//                 <Grid item xs={12} md={4}>
//                   <Paper
//                     elevation={2}
//                     sx={{
//                       p: isMobile ? 2 : 3,
//                       height: "100%",
//                       borderRadius: 3,
//                       mb: isMobile ? 2 : 0,
//                     }}
//                   >
//                     <Typography
//                       variant="h5"
//                       sx={{
//                         mb: 3,
//                         fontWeight: "bold",
//                         color: "#8C257C",
//                       }}
//                     >
//                       Add New Event
//                     </Typography>
//                     <Box sx={{ mb: 2 }}>
//                       <Typography
//                         variant="subtitle1"
//                         sx={{ mb: 1, fontWeight: 500 }}
//                       >
//                         Employee <span style={{ color: "red" }}>*</span>
//                       </Typography>
//                       <FormControl fullWidth>
//                         <Select
//                           value={newEvent.employee_id}
//                           onChange={(e) =>
//                             handleEventChange("employee_id", e.target.value)
//                           }
//                           displayEmpty
//                           sx={{ borderRadius: 2 }}
//                           startAdornment={
//                             <InputAdornment position="start">
//                             </InputAdornment>
//                           }
//                         >
//                           <MenuItem value="">
//                             <em>Select Employee</em>
//                           </MenuItem>
//                           {employeesList.map((employee) => (
//                             <MenuItem key={employee.id} value={employee.id}>
//                               {employee.name}
//                             </MenuItem>
//                           ))}
//                         </Select>
//                       </FormControl>
//                       {employeesList.length === 0 && (
//                         <Typography
//                           variant="caption"
//                           color="textSecondary"
//                           sx={{ mt: 1, display: "block" }}
//                         >
//                           Loading employees...
//                         </Typography>
//                       )}
//                     </Box>
//                     <Box sx={{ mb: 2 }}>
//                       <Typography
//                         variant="subtitle1"
//                         sx={{ mb: 1, fontWeight: 500 }}
//                       >
//                         Event Title <span style={{ color: "red" }}>*</span>
//                       </Typography>
//                       <TextField
//                         fullWidth
//                         placeholder="Enter event title"
//                         value={newEvent.event_title}
//                         onChange={(e) =>
//                           handleEventChange("event_title", e.target.value)
//                         }
//                         required
//                         sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
//                       />
//                     </Box>
//                     <Box sx={{ mb: 2 }}>
//                       <Typography
//                         variant="subtitle1"
//                         sx={{ mb: 1, fontWeight: 500 }}
//                       >
//                         Event Date <span style={{ color: "red" }}>*</span>
//                       </Typography>
//                       <TextField
//                         fullWidth
//                         placeholder="Select date"
//                         value={newEvent.event_date}
//                         onClick={handleDatePickerOpen}
//                         InputProps={{
//                           readOnly: true,
//                           endAdornment: (
//                             <InputAdornment position="end">
//                               <CalendarTodayIcon sx={{ color: "#8C257C" }} />
//                             </InputAdornment>
//                           ),
//                         }}
//                         required
//                         sx={{
//                           "& .MuiOutlinedInput-root": {
//                             borderRadius: 2,
//                             cursor: "pointer",
//                           },
//                         }}
//                       />
//                       <Popover
//                         open={datePickerOpen}
//                         anchorEl={datePickerAnchorEl}
//                         onClose={handleDatePickerClose}
//                         anchorOrigin={{
//                           vertical: "bottom",
//                           horizontal: "left",
//                         }}
//                         transformOrigin={{
//                           vertical: "top",
//                           horizontal: "left",
//                         }}
//                       >
//                         <DatePicker />
//                       </Popover>
//                     </Box>
//                     <Box sx={{ mb: 2 }}>
//                       <Typography
//                         variant="subtitle1"
//                         sx={{ mb: 1, fontWeight: 500 }}
//                       >
//                         Event Time <span style={{ color: "red" }}>*</span>
//                       </Typography>
//                       <TextField
//                         fullWidth
//                         placeholder="Select time"
//                         value={newEvent.event_time}
//                         onClick={handleTimePickerOpen}
//                         InputProps={{
//                           readOnly: true,
//                           endAdornment: (
//                             <InputAdornment position="end">
//                               <AccessTimeIcon sx={{ color: "#8C257C" }} />
//                             </InputAdornment>
//                           ),
//                         }}
//                         required
//                         sx={{
//                           "& .MuiOutlinedInput-root": {
//                             borderRadius: 2,
//                             cursor: "pointer",
//                           },
//                         }}
//                       />
//                       <Popover
//                         open={timePickerOpen}
//                         anchorEl={timePickerAnchorEl}
//                         onClose={handleTimePickerClose}
//                         anchorOrigin={{
//                           vertical: "bottom",
//                           horizontal: "left",
//                         }}
//                         transformOrigin={{
//                           vertical: "top",
//                           horizontal: "left",
//                         }}
//                       >
//                         <TimePicker />
//                       </Popover>
//                     </Box>
//                     <Box sx={{ mb: 2 }}>
//                       <Typography
//                         variant="subtitle1"
//                         sx={{ mb: 1, fontWeight: 500 }}
//                       >
//                         Event Color
//                       </Typography>
//                       <Box
//                         sx={{ display: "flex", alignItems: "center", gap: 1 }}
//                       >
//                         <Box
//                           onClick={handleColorPickerOpen}
//                           sx={{
//                             width: 32,
//                             height: 32,
//                             bgcolor: newEvent.event_color,
//                             borderRadius: 2,
//                             border: "2px solid #e0e0e0",
//                             cursor: "pointer",
//                             transition: "transform 0.2s",
//                             "&:hover": { transform: "scale(1.1)" },
//                           }}
//                         />
//                         <TextField
//                           fullWidth
//                           value={newEvent.event_color}
//                           onChange={(e) =>
//                             handleEventChange("event_color", e.target.value)
//                           }
//                           sx={{
//                             "& .MuiOutlinedInput-root": { borderRadius: 2 },
//                           }}
//                         />
//                       </Box>
//                       <Popover
//                         open={colorPickerOpen}
//                         anchorEl={colorPickerAnchorEl}
//                         onClose={handleColorPickerClose}
//                         anchorOrigin={{
//                           vertical: "bottom",
//                           horizontal: "left",
//                         }}
//                         transformOrigin={{
//                           vertical: "top",
//                           horizontal: "left",
//                         }}
//                       >
//                         <ColorPicker onSelect={handleColorSelect} />
//                       </Popover>
//                     </Box>
//                     <Box sx={{ mb: 3 }}>
//                       <Typography
//                         variant="subtitle1"
//                         sx={{ mb: 1, fontWeight: 500 }}
//                       >
//                         Event Note <span style={{ color: "red" }}>*</span>
//                       </Typography>
//                       <TextField
//                         fullWidth
//                         multiline
//                         rows={4}
//                         placeholder="Enter event description"
//                         value={newEvent.event_note}
//                         onChange={(e) =>
//                           handleEventChange("event_note", e.target.value)
//                         }
//                         required
//                         sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
//                       />
//                     </Box>
//                     <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
//                       <Button
//                         variant="contained"
//                         onClick={createEvent}
//                         disabled={loading}
//                         sx={{
//                           bgcolor: "#8C257C",
//                           "&:hover": { bgcolor: "#701D62" },
//                           px: 4,
//                           py: 1.5,
//                           borderRadius: 2,
//                           fontWeight: 600,
//                         }}
//                       >
//                         {loading ? "Saving..." : "Save Event"}
//                       </Button>
//                     </Box>
//                   </Paper>
//                 </Grid>
//                 <Grid item xs={12} md={8}>
//                   <Paper
//                     elevation={2}
//                     sx={{ p: isMobile ? 1 : 3, borderRadius: 3 }}
//                   >
//                     <Typography
//                       variant="h5"
//                       sx={{
//                         mb: 3,
//                         fontWeight: "bold",
//                         color: "#8C257C",
//                       }}
//                     >
//                       List All Events
//                     </Typography>
//                     <Box
//                       sx={{
//                         display: "flex",
//                         justifyContent: "flex-end",
//                         mb: 2,
//                       }}
//                     >
//                       <Box sx={{ display: "flex", alignItems: "center" }}>
//                         <Typography variant="body2" sx={{ mr: 1 }}>
                         
//                         </Typography>
//                         <TextField
//                           size="small"
//                           value={searchTerm}
//                           onChange={handleSearch}
//                           placeholder="Search events..."
//                           InputProps={{
//                             endAdornment: (
//                               <InputAdornment position="end">
//                                 <SearchIcon sx={{ color: "#8C257C" }} />
//                               </InputAdornment>
//                             ),
//                           }}
//                           sx={{
//                             "& .MuiOutlinedInput-root": { borderRadius: 2 },
//                           }}
//                         />
//                       </Box>
//                     </Box>
//                     <TableContainer sx={{ borderRadius: 2 }}>
//                       <Table>
//                         <TableHead>
//                           <TableRow sx={{ bgcolor: "#8C257C" }}>
//                             <TableCell
//                               onClick={() => requestSort("event_title")}
//                               sx={{
//                                 fontWeight: "bold",
//                                 cursor: "pointer",
//                                 borderRadius: "8px 0 0 0",
//                               }}
//                             >
//                               <Box
//                                 sx={{ display: "flex", alignItems: "center" }}
//                               >
//                                 EVENT TITLE
//                                 {sortConfig.key === "event_title" &&
//                                   (sortConfig.direction === "asc" ? (
//                                     <ArrowUpwardIcon fontSize="small" />
//                                   ) : (
//                                     <ArrowDownwardIcon fontSize="small" />
//                                   ))}
//                               </Box>
//                             </TableCell>
//                             <TableCell
//                               onClick={() => requestSort("employee_name")}
//                               sx={{ fontWeight: "bold", cursor: "pointer" }}
//                             >
//                               <Box
//                                 sx={{ display: "flex", alignItems: "center" }}
//                               >
//                                 EMPLOYEE
//                                 {sortConfig.key === "employee_name" &&
//                                   (sortConfig.direction === "asc" ? (
//                                     <ArrowUpwardIcon fontSize="small" />
//                                   ) : (
//                                     <ArrowDownwardIcon fontSize="small" />
//                                   ))}
//                               </Box>
//                             </TableCell>
//                             <TableCell
//                               onClick={() => requestSort("event_date")}
//                               sx={{ fontWeight: "bold", cursor: "pointer" }}
//                             >
//                               <Box
//                                 sx={{ display: "flex", alignItems: "center" }}
//                               >
//                                 EVENT DATE
//                                 {sortConfig.key === "event_date" &&
//                                   (sortConfig.direction === "asc" ? (
//                                     <ArrowUpwardIcon fontSize="small" />
//                                   ) : (
//                                     <ArrowDownwardIcon fontSize="small" />
//                                   ))}
//                               </Box>
//                             </TableCell>
//                             <TableCell
//                               onClick={() => requestSort("event_time")}
//                               sx={{ fontWeight: "bold", cursor: "pointer" }}
//                             >
//                               <Box
//                                 sx={{ display: "flex", alignItems: "center" }}
//                               >
//                                 EVENT TIME
//                                 {sortConfig.key === "event_time" &&
//                                   (sortConfig.direction === "asc" ? (
//                                     <ArrowUpwardIcon fontSize="small" />
//                                   ) : (
//                                     <ArrowDownwardIcon fontSize="small" />
//                                   ))}
//                               </Box>
//                             </TableCell>
//                             <TableCell
//                               sx={{
//                                 fontWeight: "bold",
//                                 borderRadius: "0 8px 0 0",
//                               }}
//                             >
//                               ACTIONS
//                             </TableCell>
//                           </TableRow>
//                         </TableHead>
//                         <TableBody>
//                           {loading ? (
//                             <TableRow>
//                               <TableCell
//                                 colSpan={5}
//                                 align="center"
//                                 sx={{ py: 4 }}
//                               >
//                                 Loading events...
//                               </TableCell>
//                             </TableRow>
//                           ) : paginatedEvents.length === 0 ? (
//                             <TableRow>
//                               <TableCell
//                                 colSpan={5}
//                                 align="center"
//                                 sx={{ py: 4 }}
//                               >
//                                 No events found
//                               </TableCell>
//                             </TableRow>
//                           ) : (
//                             paginatedEvents.map((event) => (
//                               <TableRow
//                                 key={event.event_id}
//                                 hover
//                                 sx={{
//                                   "&:hover": { bgcolor: "#f8f9fa" },
//                                   transition: "background-color 0.2s",
//                                 }}
//                               >
//                                 <TableCell>
//                                   <Box
//                                     sx={{
//                                       display: "flex",
//                                       alignItems: "center",
//                                     }}
//                                   >
//                                     <Box
//                                       sx={{
//                                         width: 16,
//                                         height: 16,
//                                         bgcolor: event.event_color,
//                                         borderRadius: 1,
//                                         mr: 2,
//                                         boxShadow: 1,
//                                       }}
//                                     />
//                                     <Typography
//                                       variant="body2"
//                                       sx={{ fontWeight: 500 }}
//                                     >
//                                       {event.event_title}
//                                     </Typography>
//                                   </Box>
//                                 </TableCell>
//                                 <TableCell>
//                                   <Chip
//                                     label={
//                                       event.employee_name ||
//                                       getEmployeeNameById(event.employee_id)
//                                     }
//                                     size="small"
//                                     variant="outlined"
//                                     sx={{ borderRadius: 2 }}
//                                   />
//                                 </TableCell>
//                                 <TableCell>{event.event_date}</TableCell>
//                                 <TableCell>{event.event_time}</TableCell>
//                                 <TableCell>
//                                   <Box sx={{ display: "flex", gap: 1 }}>
//                                     <IconButton
//                                       size="small"
//                                       color="primary"
//                                       onClick={() =>
//                                         handleOpenEditDialog(event)
//                                       }
//                                       disabled={!hasPermission("edit")}
//                                       sx={{
//                                         borderRadius: 2,
//                                         "&:hover": {
//                                           bgcolor:
//                                             "rgba(140, 37, 124, 0.1)",
//                                         },
//                                       }}
//                                     >
//                                       <EditIcon fontSize="small" />
//                                     </IconButton>
//                                     <IconButton
//                                       size="small"
//                                       color="error"
//                                       onClick={() =>
//                                         handleOpenDeleteConfirm(event)
//                                       }
//                                       sx={{
//                                         borderRadius: 2,
//                                         "&:hover": { bgcolor: "#ffebee" },
//                                       }}
//                                     >
//                                       <DeleteIcon fontSize="small" />
//                                     </IconButton>
//                                   </Box>
//                                 </TableCell>
//                               </TableRow>
//                             ))
//                           )}
//                         </TableBody>
//                       </Table>
//                     </TableContainer>
//                     <Box
//                       component="footer"
//                       sx={{
//                         display: "flex",
//                         justifyContent: { xs: "center", sm: "space-between" },
//                         alignItems: "center",
//                         flexDirection: { xs: "column", sm: "row" },
//                         mt: 2,
//                         gap: 2,
//                         width: "100%",
//                       }}
//                     >
//                       <Typography variant="body2" color="text.secondary">
//                         Showing{" "}
//                         {filteredEvents.length > 0 ? page * rowsPerPage + 1 : 0}{" "}
//                         to{" "}
//                         {Math.min(
//                           (page + 1) * rowsPerPage,
//                           filteredEvents.length
//                         )}{" "}
//                         of {filteredEvents.length} results
//                       </Typography>
//                       <TablePagination
//                         component="div"
//                         count={filteredEvents.length}
//                         page={page}
//                         onPageChange={handleChangePage}
//                         rowsPerPage={rowsPerPage}
//                         onRowsPerPageChange={handleChangeRowsPerPage}
//                         rowsPerPageOptions={[5, 10, 15, 25]}
//                         sx={{
//                           p: 0,
//                           ".MuiTablePagination-toolbar": {
//                             p: 0,
//                           },
//                           ".MuiIconButton-root": {
//                             color: "#8C257C",
//                           },
//                         }}
//                       />
//                     </Box>
//                   </Paper>
//                 </Grid>
//               </Grid>
//             ) : (
//               <Paper
//                 elevation={2}
//                 sx={{ p: isMobile ? 2 : 3, borderRadius: 3 }}
//               >
//                 <Box
//                   sx={{
//                     display: "flex",
//                     justifyContent: "space-between",
//                     alignItems: "center",
//                     mb: 3,
//                   }}
//                 >
//                   <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//                     <IconButton
//                       onClick={goToPreviousMonth}
//                       sx={{
//                         bgcolor: "#f5f5f5",
//                         "&:hover": { bgcolor: "#e0e0e0" },
//                         borderRadius: 2,
//                       }}
//                     >
//                       <ArrowBackIcon />
//                     </IconButton>
//                     <Button
//                       variant="contained"
//                       onClick={goToToday}
//                       sx={{
//                         bgcolor: "#8C257C",
//                         "&:hover": { bgcolor: "#701D62" },
//                         borderRadius: 2,
//                         px: 3,
//                       }}
//                     >
//                       Today
//                     </Button>
//                     <IconButton
//                       onClick={goToNextMonth}
//                       sx={{
//                         bgcolor: "#f5f5f5",
//                         "&:hover": { bgcolor: "#e0e0e0" },
//                         borderRadius: 2,
//                       }}
//                     >
//                       <ArrowForwardIcon />
//                     </IconButton>
//                   </Box>
//                   <Typography
//                     variant="h5"
//                     sx={{ fontWeight: "bold", color: "#333" }}
//                   >
//                     {formatMonthYear(currentDate)}
//                   </Typography>
//                   <Box sx={{ display: "flex", gap: 1 }}>
//                     {["month", "week", "day", "list"].map((viewType) => (
//                       <Button
//                         key={viewType}
//                         variant={
//                           calendarViewType === viewType
//                             ? "contained"
//                             : "outlined"
//                         }
//                         onClick={() => setCalendarViewType(viewType)}
//                         size="small"
//                         sx={{
//                           bgcolor:
//                             calendarViewType === viewType
//                               ? "#8C257C"
//                               : "transparent",
//                           borderColor:
//                             calendarViewType === viewType
//                               ? "#8C257C"
//                               : "#ddd",
//                           color:
//                             calendarViewType === viewType
//                               ? "white"
//                               : "#8C257C",
//                           borderRadius: 2,
//                           textTransform: "capitalize",
//                           "&:hover": {
//                             bgcolor:
//                               calendarViewType === viewType
//                                 ? "#701D62"
//                                 : "rgba(140, 37, 124, 0.04)",
//                           },
//                         }}
//                       >
//                         {viewType}
//                       </Button>
//                     ))}
//                   </Box>
//                 </Box>
//                 {calendarViewType === "month" && (
//                   <Box>
//                     <Grid container sx={{ mb: 1 }}>
//                       {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
//                         (day, index) => (
//                           <Grid
//                             item
//                             xs
//                             key={index}
//                             sx={{
//                               textAlign: "center",
//                               p: 2,
//                               bgcolor: "#f8f9fa",
//                               borderRadius:
//                                 index === 0
//                                   ? "8px 0 0 0"
//                                   : index === 6
//                                   ? "0 8px 0 0"
//                                   : "0",
//                             }}
//                           >
//                             <Typography
//                               variant="subtitle2"
//                               sx={{ fontWeight: "bold", color: "#666" }}
//                             >
//                               {day}
//                             </Typography>
//                           </Grid>
//                         )
//                       )}
//                     </Grid>
//                     <Grid
//                       container
//                       sx={{ border: "1px solid #e0e0e0", borderRadius: 2 }}
//                     >
//                       {calendarDays.map((day, index) => (
//                         <Grid item xs key={index}>
//                           <Box
//                             sx={{
//                               height: 140,
//                               border: "1px solid #f0f0f0",
//                               p: 1,
//                               bgcolor: isToday(day.date)
//                                 ? "rgba(140, 37, 124, 0.1)"
//                                 : "white",
//                               color: day.isCurrentMonth
//                                 ? "text.primary"
//                                 : "text.disabled",
//                               transition: "all 0.2s ease",
//                               "&:hover": {
//                                 bgcolor: isToday(day.date)
//                                   ? "rgba(140, 37, 124, 0.2)"
//                                   : "#f8f9fa",
//                                 transform: "scale(1.02)",
//                               },
//                               cursor: "pointer",
//                               position: "relative",
//                               overflow: "hidden",
//                             }}
//                           >
//                             <Typography
//                               variant="body2"
//                               sx={{
//                                 textAlign: "right",
//                                 fontWeight: isToday(day.date)
//                                   ? "bold"
//                                   : "normal",
//                                 color: isToday(day.date)
//                                   ? "#8C257C"
//                                   : "inherit",
//                               }}
//                             >
//                               {getDayNumber(day.date)}
//                             </Typography>
//                             <Box
//                               sx={{
//                                 mt: 0.5,
//                                 maxHeight: 100,
//                                 overflowY: "auto",
//                               }}
//                             >
//                               {getEventsForDate(day.date)
//                                 .slice(0, 3)
//                                 .map((event, eventIndex) => (
//                                   <Tooltip
//                                     title={`${event.event_title} - ${
//                                       event.event_time
//                                     }\n${
//                                       event.employee_name ||
//                                       getEmployeeNameById(event.employee_id)
//                                     }`}
//                                     key={eventIndex}
//                                   >
//                                     <Fade in timeout={300 + eventIndex * 100}>
//                                       <Card
//                                         sx={{
//                                           bgcolor: event.event_color,
//                                           color: "white",
//                                           mb: 0.5,
//                                           cursor: "pointer",
//                                           transition: "all 0.2s ease",
//                                           "&:hover": {
//                                             transform: "scale(1.05)",
//                                             boxShadow: 2,
//                                           },
//                                         }}
//                                         onClick={(e) => {
//                                           e.stopPropagation();
//                                           handleOpenEditDialog(event);
//                                         }}
//                                       >
//                                         <CardContent
//                                           sx={{
//                                             p: 1,
//                                             "&:last-child": { pb: 1 },
//                                           }}
//                                         >
//                                           <Typography
//                                             variant="caption"
//                                             sx={{
//                                               fontSize: "0.7rem",
//                                               fontWeight: 500,
//                                               display: "block",
//                                               whiteSpace: "nowrap",
//                                               overflow: "hidden",
//                                               textOverflow: "ellipsis",
//                                             }}
//                                           >
//                                             {event.event_title}
//                                           </Typography>
//                                           <Typography
//                                             variant="caption"
//                                             sx={{
//                                               fontSize: "0.65rem",
//                                               opacity: 0.9,
//                                               display: "block",
//                                             }}
//                                           >
//                                             {event.event_time}
//                                           </Typography>
//                                         </CardContent>
//                                       </Card>
//                                     </Fade>
//                                   </Tooltip>
//                                 ))}
//                               {getEventsForDate(day.date).length > 3 && (
//                                 <Typography
//                                   variant="caption"
//                                   sx={{
//                                     color: "#8C257C",
//                                     fontWeight: "bold",
//                                     fontSize: "0.7rem",
//                                   }}
//                                 >
//                                   +{getEventsForDate(day.date).length - 3} more
//                                 </Typography>
//                               )}
//                             </Box>
//                           </Box>
//                         </Grid>
//                       ))}
//                     </Grid>
//                   </Box>
//                 )}
//                 {calendarViewType === "week" && (
//                   <Box>
//                     <Grid container sx={{ mb: 1 }}>
//                       {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
//                         (day, index) => {
//                           const date = new Date(currentDate);
//                           const firstDayOfWeek = new Date(
//                             date.setDate(date.getDate() - date.getDay())
//                           );
//                           const dayDate = new Date(firstDayOfWeek);
//                           dayDate.setDate(firstDayOfWeek.getDate() + index);
 
//                           return (
//                             <Grid
//                               item
//                               xs
//                               key={index}
//                               sx={{
//                                 textAlign: "center",
//                                 p: 2,
//                                 bgcolor: isToday(dayDate)
//                                   ? "rgba(140, 37, 124, 0.1)"
//                                   : "#f8f9fa",
//                                 borderRadius:
//                                   index === 0
//                                     ? "8px 0 0 0"
//                                     : index === 6
//                                     ? "0 8px 0 0"
//                                     : "0",
//                               }}
//                             >
//                               <Typography
//                                 variant="subtitle2"
//                                 sx={{ fontWeight: "bold", color: "#666" }}
//                               >
//                                 {day}
//                               </Typography>
//                               <Typography
//                                 variant="h6"
//                                 sx={{
//                                   fontWeight: isToday(dayDate)
//                                     ? "bold"
//                                     : "normal",
//                                   color: isToday(dayDate)
//                                     ? "#8C257C"
//                                     : "inherit",
//                                 }}
//                               >
//                                 {dayDate.getDate()}
//                               </Typography>
//                             </Grid>
//                           );
//                         }
//                       )}
//                     </Grid>
//                     <Box
//                       sx={{
//                         height: 600,
//                         overflowY: "auto",
//                         border: "1px solid #e0e0e0",
//                         borderRadius: 2,
//                       }}
//                     >
//                       {Array.from({ length: 24 }).map((_, hourIndex) => (
//                         <Box
//                           key={hourIndex}
//                           sx={{
//                             display: "flex",
//                             borderBottom:
//                               hourIndex < 23 ? "1px solid #f0f0f0" : "none",
//                             height: 60,
//                             "&:hover": { bgcolor: "#f8f9fa" },
//                           }}
//                         >
//                           <Box
//                             sx={{
//                               width: 80,
//                               pr: 2,
//                               textAlign: "right",
//                               borderRight: "1px solid #e0e0e0",
//                               display: "flex",
//                               alignItems: "center",
//                               justifyContent: "flex-end",
//                               bgcolor: "#f8f9fa",
//                             }}
//                           >
//                             <Typography
//                               variant="caption"
//                               sx={{ fontWeight: 500, color: "#666" }}
//                             >
//                               {hourIndex === 0
//                                 ? "12 AM"
//                                 : hourIndex < 12
//                                 ? `${hourIndex} AM`
//                                 : hourIndex === 12
//                                 ? "12 PM"
//                                 : `${hourIndex - 12} PM`}
//                             </Typography>
//                           </Box>
//                           <Grid container sx={{ flexGrow: 1 }}>
//                             {Array.from({ length: 7 }).map((_, dayIndex) => {
//                               const date = new Date(currentDate);
//                               const firstDayOfWeek = new Date(
//                                 date.setDate(date.getDate() - date.getDay())
//                               );
//                               const dayDate = new Date(firstDayOfWeek);
//                               dayDate.setDate(
//                                 firstDayOfWeek.getDate() + dayIndex
//                               );
//                               const dayEvents = getEventsForDate(
//                                 dayDate
//                               ).filter((event) => {
//                                 if (!event.event_time) return false;
//                                 const [time, ampm] =
//                                   event.event_time.split(" ");
//                                 const [hour] = time.split(":");
//                                 let eventHour = Number.parseInt(hour, 10);
//                                 if (ampm === "pm" && eventHour !== 12) {
//                                   eventHour += 12;
//                                 } else if (ampm === "am" && eventHour === 12) {
//                                   eventHour = 0;
//                                 }
//                                 return eventHour === hourIndex;
//                               });
 
//                               return (
//                                 <Grid
//                                   item
//                                   xs
//                                   key={dayIndex}
//                                   sx={{
//                                     borderRight:
//                                       dayIndex < 6
//                                         ? "1px solid #f0f0f0"
//                                         : "none",
//                                     position: "relative",
//                                     bgcolor: isToday(dayDate)
//                                       ? "rgba(140, 37, 124, 0.05)"
//                                       : "white",
//                                   }}
//                                 >
//                                   {dayEvents.map((event, eventIndex) => (
//                                     <Tooltip
//                                       title={`${event.event_title} - ${
//                                         event.event_time
//                                       }\n${
//                                         event.employee_name ||
//                                         getEmployeeNameById(event.employee_id)
//                                       }`}
//                                       key={eventIndex}
//                                     >
//                                       <Zoom in timeout={300}>
//                                         <Card
//                                           sx={{
//                                             position: "absolute",
//                                             top: 4,
//                                             left: 4,
//                                             right: 4,
//                                             bgcolor: event.event_color,
//                                             color: "white",
//                                             cursor: "pointer",
//                                             transition: "all 0.2s ease",
//                                             "&:hover": {
//                                               transform: "scale(1.05)",
//                                               boxShadow: 3,
//                                               zIndex: 10,
//                                             },
//                                             zIndex: 1,
//                                           }}
//                                           onClick={() =>
//                                             handleOpenEditDialog(event)
//                                           }
//                                         >
//                                           <CardContent
//                                             sx={{
//                                               p: 1,
//                                               "&:last-child": { pb: 1 },
//                                             }}
//                                           >
//                                             <Typography
//                                               variant="caption"
//                                               sx={{
//                                                 fontSize: "0.7rem",
//                                                 fontWeight: 500,
//                                                 whiteSpace: "nowrap",
//                                                 overflow: "hidden",
//                                                 textOverflow: "ellipsis",
//                                               }}
//                                             >
//                                               {event.event_title}
//                                             </Typography>
//                                           </CardContent>
//                                         </Card>
//                                       </Zoom>
//                                     </Tooltip>
//                                   ))}
//                                 </Grid>
//                               );
//                             })}
//                           </Grid>
//                         </Box>
//                       ))}
//                     </Box>
//                   </Box>
//                 )}
//                 {calendarViewType === "day" && (
//                   <Box>
//                     <Paper
//                       elevation={1}
//                       sx={{
//                         p: 3,
//                         mb: 3,
//                         textAlign: "center",
//                         bgcolor: isToday(currentDate)
//                           ? "rgba(140, 37, 124, 0.1)"
//                           : "#f8f9fa",
//                         borderRadius: 3,
//                       }}
//                     >
//                       <Typography
//                         variant="h5"
//                         sx={{ fontWeight: "bold", color: "#333" }}
//                       >
//                         {currentDate.toLocaleDateString("default", {
//                           weekday: "long",
//                           day: "numeric",
//                           month: "long",
//                           year: "numeric",
//                         })}
//                       </Typography>
//                       <Typography
//                         variant="body2"
//                         color="textSecondary"
//                         sx={{ mt: 1 }}
//                       >
//                         {getEventsForDate(currentDate).length} events scheduled
//                       </Typography>
//                     </Paper>
//                     <Box
//                       sx={{
//                         height: 600,
//                         overflowY: "auto",
//                         border: "1px solid #e0e0e0",
//                         borderRadius: 2,
//                       }}
//                     >
//                       {Array.from({ length: 24 }).map((_, hourIndex) => (
//                         <Box
//                           key={hourIndex}
//                           sx={{
//                             display: "flex",
//                             borderBottom:
//                               hourIndex < 23 ? "1px solid #f0f0f0" : "none",
//                             height: 80,
//                             "&:hover": { bgcolor: "#f8f9fa" },
//                           }}
//                         >
//                           <Box
//                             sx={{
//                               width: 100,
//                               pr: 2,
//                               textAlign: "right",
//                               borderRight: "1px solid #e0e0e0",
//                               display: "flex",
//                               alignItems: "center",
//                               justifyContent: "flex-end",
//                               bgcolor: "#f8f9fa",
//                             }}
//                           >
//                             <Typography
//                               variant="body2"
//                               sx={{ fontWeight: 500, color: "#666" }}
//                             >
//                               {hourIndex === 0
//                                 ? "12:00 AM"
//                                 : hourIndex < 12
//                                 ? `${hourIndex}:00 AM`
//                                 : hourIndex === 12
//                                 ? "12:00 PM"
//                                 : `${hourIndex - 12}:00 PM`}
//                             </Typography>
//                           </Box>
//                           <Box
//                             sx={{
//                               flexGrow: 1,
//                               position: "relative",
//                               p: 1,
//                             }}
//                           >
//                             {getEventsForDate(currentDate)
//                               .filter((event) => {
//                                 if (!event.event_time) return false;
//                                 const [time, ampm] =
//                                   event.event_time.split(" ");
//                                 const [hour] = time.split(":");
//                                 let eventHour = Number.parseInt(hour, 10);
//                                 if (ampm === "pm" && eventHour !== 12) {
//                                   eventHour += 12;
//                                 } else if (ampm === "am" && eventHour === 12) {
//                                   eventHour = 0;
//                                 }
//                                 return eventHour === hourIndex;
//                               })
//                               .map((event, eventIndex) => (
//                                 <Tooltip
//                                   title={`${event.event_title}\n${
//                                     event.employee_name ||
//                                     getEmployeeNameById(event.employee_id)
//                                   }\n${event.event_note}`}
//                                   key={eventIndex}
//                                 >
//                                   <Zoom
//                                     in
//                                     timeout={300 + eventIndex * 100}
//                                   >
//                                     <Card
//                                       sx={{
//                                         bgcolor: event.event_color,
//                                         color: "white",
//                                         mb: 1,
//                                         cursor: "pointer",
//                                         transition: "all 0.2s ease",
//                                         "&:hover": {
//                                           transform: "scale(1.02)",
//                                           boxShadow: 4,
//                                         },
//                                       }}
//                                       onClick={() =>
//                                         handleOpenEditDialog(event)
//                                       }
//                                     >
//                                       <CardContent sx={{ p: 2 }}>
//                                         <Box
//                                           sx={{
//                                             display: "flex",
//                                             justifyContent: "space-between",
//                                             alignItems: "center",
//                                           }}
//                                         >
//                                           <Box>
//                                             <Typography
//                                               variant="subtitle1"
//                                               sx={{ fontWeight: 600 }}
//                                             >
//                                               {event.event_title}
//                                             </Typography>
//                                             <Typography
//                                               variant="body2"
//                                               sx={{ opacity: 0.9 }}
//                                             >
//                                               {event.event_time} •{" "}
//                                               {event.employee_name ||
//                                                 getEmployeeNameById(
//                                                   event.employee_id
//                                                 )}
//                                             </Typography>
//                                           </Box>
//                                           <Box
//                                             sx={{
//                                               display: "flex",
//                                               gap: 1,
//                                             }}
//                                           >
//                                             <IconButton
//                                               size="small"
//                                               sx={{
//                                                 color: "white",
//                                                 "&:hover": {
//                                                   bgcolor:
//                                                     "rgba(255,255,255,0.2)",
//                                                 },
//                                               }}
//                                               onClick={(e) => {
//                                                 e.stopPropagation();
//                                                 handleOpenEditDialog(event);
//                                               }}
//                                             >
//                                               <EditIcon fontSize="small" />
//                                             </IconButton>
//                                           </Box>
//                                         </Box>
//                                       </CardContent>
//                                     </Card>
//                                   </Zoom>
//                                 </Tooltip>
//                               ))}
//                           </Box>
//                         </Box>
//                       ))}
//                     </Box>
//                   </Box>
//                 )}
//                 {calendarViewType === "list" && (
//                   <Box>
//                     <TableContainer sx={{ borderRadius: 2 }}>
//                       <Table>
//                         <TableHead>
//                           <TableRow sx={{ bgcolor: "#f8f9fa" }}>
//                             <TableCell
//                               sx={{
//                                 fontWeight: "bold",
//                                 borderRadius: "8px 0 0 0",
//                               }}
//                             >
//                               EVENT TITLE
//                             </TableCell>
//                             <TableCell sx={{ fontWeight: "bold" }}>
//                               EMPLOYEE
//                             </TableCell>
//                             <TableCell sx={{ fontWeight: "bold" }}>
//                               EVENT DATE
//                             </TableCell>
//                             <TableCell sx={{ fontWeight: "bold" }}>
//                               EVENT TIME
//                             </TableCell>
//                             <TableCell
//                               sx={{
//                                 fontWeight: "bold",
//                                 borderRadius: "0 8px 0 0",
//                               }}
//                             >
//                               ACTIONS
//                             </TableCell>
//                           </TableRow>
//                         </TableHead>
//                         <TableBody>
//                           {loading ? (
//                             <TableRow>
//                               <TableCell
//                                 colSpan={5}
//                                 align="center"
//                                 sx={{ py: 4 }}
//                               >
//                                 Loading events...
//                               </TableCell>
//                             </TableRow>
//                           ) : events.length === 0 ? (
//                             <TableRow>
//                               <TableCell
//                                 colSpan={5}
//                                 align="center"
//                                 sx={{ py: 4 }}
//                               >
//                                 No events found
//                               </TableCell>
//                             </TableRow>
//                           ) : (
//                             events.map((event) => (
//                               <TableRow
//                                 key={event.event_id}
//                                 hover
//                                 sx={{
//                                   "&:hover": { bgcolor: "#f8f9fa" },
//                                   transition: "background-color 0.2s",
//                                 }}
//                               >
//                                 <TableCell>
//                                   <Box
//                                     sx={{
//                                       display: "flex",
//                                       alignItems: "center",
//                                     }}
//                                   >
//                                     <Box
//                                       sx={{
//                                         width: 16,
//                                         height: 16,
//                                         bgcolor: event.event_color,
//                                         borderRadius: 1,
//                                         mr: 2,
//                                         boxShadow: 1,
//                                       }}
//                                     />
//                                     <Typography
//                                       variant="body2"
//                                       sx={{ fontWeight: 500 }}
//                                     >
//                                       {event.event_title}
//                                     </Typography>
//                                   </Box>
//                                 </TableCell>
//                                 <TableCell>
//                                   <Chip
//                                     label={
//                                       event.employee_name ||
//                                       getEmployeeNameById(event.employee_id)
//                                     }
//                                     size="small"
//                                     variant="outlined"
//                                     sx={{ borderRadius: 2 }}
//                                   />
//                                 </TableCell>
//                                 <TableCell>{event.event_date}</TableCell>
//                                 <TableCell>{event.event_time}</TableCell>
//                                 <TableCell>
//                                   <Box sx={{ display: "flex", gap: 1 }}>
//                                     <IconButton
//                                       size="small"
//                                       color="primary"
//                                       onClick={() =>
//                                         handleOpenEditDialog(event)
//                                       }
//                                       disabled={!hasPermission("edit")}
//                                       sx={{
//                                         borderRadius: 2,
//                                         "&:hover": {
//                                           bgcolor:
//                                             "rgba(140, 37, 124, 0.1)",
//                                         },
//                                       }}
//                                     >
//                                       <EditIcon fontSize="small" />
//                                     </IconButton>
//                                     <IconButton
//                                       size="small"
//                                       color="error"
//                                       onClick={() =>
//                                         handleOpenDeleteConfirm(event)
//                                       }
//                                       disabled={!hasPermission("delete")}
//                                       sx={{
//                                         borderRadius: 2,
//                                         "&:hover": { bgcolor: "#ffebee" },
//                                       }}
//                                     >
//                                       <DeleteIcon fontSize="small" />
//                                     </IconButton>
//                                   </Box>
//                                 </TableCell>
//                               </TableRow>
//                             ))
//                           )}
//                         </TableBody>
//                       </Table>
//                     </TableContainer>
//                   </Box>
//                 )}
//               </Paper>
//             )}
//           </Box>
//         </Box>
//       </Box>
 
//       <Dialog
//         open={isEditDialogOpen}
//         onClose={handleCloseEditDialog}
//         maxWidth="sm"
//         fullWidth
//         PaperProps={{ sx: { borderRadius: 3 } }}
//       >
//         <DialogTitle sx={{ pb: 1 }}>
//           <Typography
//             variant="h6"
//             sx={{ fontWeight: "bold", color: "#333" }}
//           >
//             Edit Event
//           </Typography>
//         </DialogTitle>
//         <DialogContent>
//           {editingEvent && (
//             <Box sx={{ mt: 2 }}>
//               <Box sx={{ mb: 2 }}>
//                 <Typography
//                   variant="subtitle1"
//                   sx={{ mb: 1, fontWeight: 500 }}
//                 >
//                   Employee <span style={{ color: "red" }}>*</span>
//                 </Typography>
//                 <FormControl fullWidth>
//                   <Select
//                     value={editingEvent.employee_id}
//                     onChange={(e) =>
//                       handleEditingEventChange("employee_id", e.target.value)
//                     }
//                     displayEmpty
//                     sx={{ borderRadius: 2 }}
//                     renderValue={(selectedId) => {
//                       if (!selectedId) {
//                         return <em>Select Employee</em>;
//                       }
//                       const selectedEmployee = employeesList.find(
//                         (emp) => emp.id == selectedId
//                       );
//                       return selectedEmployee ? selectedEmployee.name : "";
//                     }}
//                   >
//                     <MenuItem value="">
//                       <em>Select Employee</em>
//                     </MenuItem>
//                     {employeesList.map((employee) => (
//                       <MenuItem key={employee.id} value={employee.id}>
//                         {employee.name}
//                       </MenuItem>
//                     ))}
//                   </Select>
//                 </FormControl>
//               </Box>
 
//               <Box sx={{ mb: 2 }}>
//                 <Typography
//                   variant="subtitle1"
//                   sx={{ mb: 1, fontWeight: 500 }}
//                 >
//                   Event Title <span style={{ color: "red" }}>*</span>
//                 </Typography>
//                 <TextField
//                   fullWidth
//                   placeholder="Event Title"
//                   value={editingEvent.event_title}
//                   onChange={(e) =>
//                     handleEditingEventChange("event_title", e.target.value)
//                   }
//                   required
//                   sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
//                 />
//               </Box>
//               <Box sx={{ mb: 2 }}>
//                 <Typography
//                   variant="subtitle1"
//                   sx={{ mb: 1, fontWeight: 500 }}
//                 >
//                   Event Date <span style={{ color: "red" }}>*</span>
//                 </Typography>
//                 <TextField
//                   fullWidth
//                   placeholder="Event Date"
//                   value={editingEvent.event_date}
//                   onClick={handleDatePickerOpen}
//                   InputProps={{
//                     readOnly: true,
//                     endAdornment: (
//                       <InputAdornment position="end">
//                         <CalendarTodayIcon sx={{ color: "#8C257C" }} />
//                       </InputAdornment>
//                     ),
//                   }}
//                   required
//                   sx={{
//                     "& .MuiOutlinedInput-root": {
//                       borderRadius: 2,
//                       cursor: "pointer",
//                     },
//                   }}
//                 />
//               </Box>
//               <Box sx={{ mb: 2 }}>
//                 <Typography
//                   variant="subtitle1"
//                   sx={{ mb: 1, fontWeight: 500 }}
//                 >
//                   Event Time <span style={{ color: "red" }}>*</span>
//                 </Typography>
//                 <TextField
//                   fullWidth
//                   placeholder="Event Time"
//                   value={editingEvent.event_time}
//                   onClick={handleTimePickerOpen}
//                   InputProps={{
//                     readOnly: true,
//                     endAdornment: (
//                       <InputAdornment position="end">
//                         <AccessTimeIcon sx={{ color: "#8C257C" }} />
//                       </InputAdornment>
//                     ),
//                   }}
//                   required
//                   sx={{
//                     "& .MuiOutlinedInput-root": {
//                       borderRadius: 2,
//                       cursor: "pointer",
//                     },
//                   }}
//                 />
//               </Box>
//               <Box sx={{ mb: 2 }}>
//                 <Typography
//                   variant="subtitle1"
//                   sx={{ mb: 1, fontWeight: 500 }}
//                 >
//                   Event Color
//                 </Typography>
//                 <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//                   <Box
//                     onClick={handleColorPickerOpen}
//                     sx={{
//                       width: 32,
//                       height: 32,
//                       bgcolor: editingEvent.event_color,
//                       borderRadius: 2,
//                       border: "2px solid #e0e0e0",
//                       cursor: "pointer",
//                       transition: "transform 0.2s",
//                       "&:hover": { transform: "scale(1.1)" },
//                     }}
//                   />
//                   <TextField
//                     fullWidth
//                     value={editingEvent.event_color}
//                     onChange={(e) =>
//                       handleEditingEventChange("event_color", e.target.value)
//                     }
//                     sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
//                   />
//                 </Box>
//               </Box>
//               <Box sx={{ mb: 2 }}>
//                 <Typography
//                   variant="subtitle1"
//                   sx={{ mb: 1, fontWeight: 500 }}
//                 >
//                   Event Note <span style={{ color: "red" }}>*</span>
//                 </Typography>
//                 <TextField
//                   fullWidth
//                   multiline
//                   rows={4}
//                   placeholder="Event Note"
//                   value={editingEvent.event_note}
//                   onChange={(e) =>
//                     handleEditingEventChange("event_note", e.target.value)
//                   }
//                   required
//                   sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
//                 />
//               </Box>
//             </Box>
//           )}
//         </DialogContent>
//         <DialogActions sx={{ p: 3, pt: 1 }}>
//           <Button
//             onClick={handleCloseEditDialog}
//             variant="outlined"
//             sx={{
//               borderColor: "#ddd",
//               color: "#666",
//               borderRadius: 2,
//               "&:hover": { borderColor: "#bbb" },
//             }}
//           >
//             Cancel
//           </Button>
//           <Button
//             onClick={updateEvent}
//             variant="contained"
//             disabled={loading}
//             sx={{
//               bgcolor: "#8C257C",
//               "&:hover": { bgcolor: "#701D62" },
//               borderRadius: 2,
//               px: 3,
//             }}
//           >
//             {loading ? "Updating..." : "Update Event"}
//           </Button>
//         </DialogActions>
//       </Dialog>
 
//       <Dialog
//         open={deleteConfirmOpen}
//         onClose={handleCloseDeleteConfirm}
//         PaperProps={{ sx: { borderRadius: 3 } }}
//       >
//         <DialogTitle sx={{ pb: 1 }}>
//           <Typography
//             variant="h6"
//             sx={{ fontWeight: "bold", color: "#d32f2f" }}
//           >
//             Confirm Delete
//           </Typography>
//         </DialogTitle>
//         <DialogContent>
//           <Typography variant="body1">
//             Are you sure you want to delete the event "
//             {eventToDelete?.event_title}"?
//           </Typography>
//           <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
//             This action cannot be undone.
//           </Typography>
//         </DialogContent>
//         <DialogActions sx={{ p: 3, pt: 1 }}>
//           <Button
//             onClick={handleCloseDeleteConfirm}
//             variant="outlined"
//             sx={{
//               borderColor: "#ddd",
//               color: "#666",
//               borderRadius: 2,
//               "&:hover": { borderColor: "#bbb" },
//             }}
//           >
//             Cancel
//           </Button>
//           <Button
//             onClick={deleteEvent}
//             color="error"
//             variant="contained"
//             disabled={loading}
//             sx={{ borderRadius: 2, px: 3 }}
//           >
//             {loading ? "Deleting..." : "Delete Event"}
//           </Button>
//         </DialogActions>
//       </Dialog>
 
//       <Snackbar
//         open={notification.open}
//         autoHideDuration={6000}
//         onClose={handleCloseNotification}
//         anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
//       >
//         <Alert
//           onClose={handleCloseNotification}
//           severity={notification.severity}
//           sx={{
//             width: "100%",
//             borderRadius: 2,
//             "& .MuiAlert-icon": { fontSize: "1.2rem" },
//           }}
//         >
//           {notification.message}
//         </Alert>
//       </Snackbar>
//     </ThemeProvider>
//   );
// }
 
// export default EventsAdmin;





import React, { useState, useEffect } from "react";
import {
  ThemeProvider,
  createTheme,
  Box,
  Paper,
  Typography,
  Button,
  IconButton,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Grid,
  CssBaseline,
  InputAdornment,
  Popover,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
  Chip,
  Card,
  CardContent,
  Fade,
  Zoom,
  useMediaQuery,
  Pagination,
  Skeleton,
} from "@mui/material";
import {
  CalendarToday as CalendarTodayIcon,
  Event as EventIcon,
  ArrowBack as ArrowBackIcon,
  ArrowForward as ArrowForwardIcon,
  AccessTime as AccessTimeIcon,
  Search as SearchIcon,
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Lock as LockIcon,
  Person as PersonIcon,
  Schedule as ScheduleIcon,
  Today as TodayIcon,
} from "@mui/icons-material";
import axios from "axios";
 
const theme = createTheme({
  palette: {
    primary: {
      main: "#8C257C",
    },
    secondary: {
      main: "#F58E35",
    },
    background: {
      default: "#f5f5f9",
    },
  },
  components: {
    MuiTableCell: {
      styleOverrides: {
        root: {
          padding: "8px 16px",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: "8px",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: "12px",
        },
      },
    },
  },
});
 
function EventsAdmin() {
  const [activeView, setActiveView] = useState("events");
  const [calendarViewType, setCalendarViewType] = useState("month");
 
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
 
  const [authToken, setAuthToken] = useState("");
  const [userRole, setUserRole] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
 
  const [employeesList, setEmployeesList] = useState([]);
 
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
 
  const [newEvent, setNewEvent] = useState({
    event_title: "",
    employee_id: "",
    event_date: "",
    event_time: "",
    event_color: "#8C257C",
    event_note: "",
  });
 
  const [editingEvent, setEditingEvent] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
 
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);
 
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success",
  });
 
  const [currentDate, setCurrentDate] = useState(new Date());
  const [calendarDays, setCalendarDays] = useState([]);
 
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
 
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "asc",
  });
 
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [datePickerAnchorEl, setDatePickerAnchorEl] = useState(null);
 
  const [timePickerOpen, setTimePickerOpen] = useState(false);
  const [timePickerAnchorEl, setTimePickerAnchorEl] = useState(null);
 
  const [colorPickerOpen, setColorPickerOpen] = useState(false);
  const [colorPickerAnchorEl, setColorPickerAnchorEl] = useState(null);
 
  const primaryColor = theme.palette.primary.main;
  const primaryHoverColor = "#6d1d60";
  const secondaryColor = theme.palette.secondary.main;
  const textOnPrimary = "#FFFFFF";
 
  const colorPalette = [
    "#8C257C", "#f44336", "#e91e63", "#9c27b0", "#673ab7", "#3f51b5", "#2196f3",
    "#03a9f4", "#00bcd4", "#009688", "#4caf50", "#8bc34a", "#cddc39", "#ffeb3b",
    "#ffc107", "#ff9800", "#ff5722", "#795548", "#9e9e9e", "#607d8b",
  ];
 
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const role = localStorage.getItem("userRole");
 
    if (token) {
      setAuthToken(token);
      setUserRole(role || "admin");
      setIsAuthenticated(true);
    } else {
      setAuthToken("demo-token");
      setUserRole("admin");
      setIsAuthenticated(true);
      setNotification({
        open: true,
        message: "Demo mode: Authentication simulated",
        severity: "info",
      });
    }
  }, []);
 
  const getAuthHeaders = () => {
    const headers = { "Content-Type": "application/json" };
    if (authToken && authToken !== "demo-token") {
      headers["Authorization"] = `Bearer ${authToken}`;
    }
    return headers;
  };
 
  const handleAuthError = (error) => {
    if (error.status === 401) {
      setNotification({
        open: true,
        message: "Authentication expired. Please log in again.",
        severity: "error",
      });
      setIsAuthenticated(false);
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userRole");
    }
    return error;
  };
 
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await axios.get("https://tdtlworld.com/hrms-backend/employee-dropdown/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const formattedData = response.data.map((emp) => ({
          id: emp.value, emp_id: emp.emp_id, name: emp.label, email: emp.email,
        }));
        setEmployeesList(formattedData);
      } catch (error) {
        console.error("Failed to fetch employee list", error);
      }
    };
    fetchEmployees();
  }, []);
 
  const fetchEvents = async () => {
    if (!isAuthenticated) return;
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("https://tdtlworld.com/hrms-backend/events/", {
        method: "GET", headers: getAuthHeaders(),
      });
      if (response.status === 401) throw handleAuthError({ status: 401 });
      if (!response.ok) throw new Error(`Failed to fetch events: ${response.status}`);
      const data = await response.json();
      const transformedEvents = Array.isArray(data)
        ? data.map((event) => ({
            event_id: event.event_id, company_id: event.company_id,
            employee_id: event.employee_id, employee_name: event.employee_name,
            event_title: event.event_title, event_date: formatDateFromAPI(event.event_date),
            event_time: formatTimeFromAPI(event.event_time),
            event_color: event.event_color || "#8C257C", event_note: event.event_note,
            created_at: event.created_at,
          }))
        : [];
      setEvents(transformedEvents);
    } catch (err) {
      if (err.status !== 401) {
        setError(err.message);
        setNotification({ open: true, message: `Error fetching events: ${err.message}`, severity: "error" });
      }
    } finally {
      setLoading(false);
    }
  };
 
  const createEvent = async () => {
    if (!isAuthenticated || !validateEventForm()) return;
    setLoading(true);
    setError(null);
    try {
      const [day, month, year] = newEvent.event_date.split("/");
      const formattedDate = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
      const formattedTime = formatTimeForAPI(newEvent.event_time);
      const selectedEmployee = employeesList.find((emp) => emp.id == newEvent.employee_id);
      if (!selectedEmployee) {
        setNotification({ open: true, message: "Could not find employee details.", severity: "error" });
        setLoading(false);
        return;
      }
      const payload = {
        company_id: 2, employee_id: selectedEmployee.emp_id, event_title: newEvent.event_title,
        event_date: formattedDate, event_time: formattedTime, event_color: newEvent.event_color,
        event_note: newEvent.event_note,
      };
      const response = await fetch("https://tdtlworld.com/hrms-backend/events/", {
        method: "POST", headers: getAuthHeaders(), body: JSON.stringify(payload),
      });
      if (response.status === 401) throw handleAuthError({ status: 401 });
      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Failed to create event: ${response.status} - ${errorData}`);
      }
      await fetchEvents();
      resetEventForm();
      setNotification({ open: true, message: "Event created successfully", severity: "success" });
    } catch (err) {
      if (err.status !== 401) {
        setError(err.message);
        setNotification({ open: true, message: `Error creating event: ${err.message}`, severity: "error" });
      }
    } finally {
      setLoading(false);
    }
  };
 
  const updateEvent = async () => {
    if (!isAuthenticated || !editingEvent || !validateEventForm(editingEvent)) return;
    setLoading(true);
    setError(null);
    try {
      const [day, month, year] = editingEvent.event_date.split("/");
      const formattedDate = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
      const formattedTime = formatTimeForAPI(editingEvent.event_time);
      const selectedEmployee = employeesList.find((emp) => emp.id == editingEvent.employee_id);
      if (!selectedEmployee) {
        setNotification({ open: true, message: "Could not find employee details.", severity: "error" });
        setLoading(false);
        return;
      }
      const payload = {
        company_id: 2, employee_id: selectedEmployee.emp_id, event_title: editingEvent.event_title,
        event_date: formattedDate, event_time: formattedTime, event_color: editingEvent.event_color,
        event_note: editingEvent.event_note,
      };
      const response = await fetch(`https://tdtlworld.com/hrms-backend/events/${editingEvent.event_id}/`, {
        method: "PATCH", headers: getAuthHeaders(), body: JSON.stringify(payload),
      });
      if (response.status === 401) throw handleAuthError({ status: 401 });
      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Failed to update event: ${response.status} - ${errorData}`);
      }
      await fetchEvents();
      setIsEditDialogOpen(false);
      setEditingEvent(null);
      setNotification({ open: true, message: "Event updated successfully", severity: "success" });
    } catch (err) {
      if (err.status !== 401) {
        setError(err.message);
        setNotification({ open: true, message: `Error updating event: ${err.message}`, severity: "error" });
      }
    } finally {
      setLoading(false);
    }
  };
 
  const deleteEvent = async () => {
    if (!isAuthenticated || !eventToDelete) return;
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://tdtlworld.com/hrms-backend/events/${eventToDelete.event_id}/`, {
        method: "DELETE", headers: getAuthHeaders(),
      });
      if (response.status === 401) throw handleAuthError({ status: 401 });
      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Failed to delete event: ${response.status} - ${errorData}`);
      }
      await fetchEvents();
      setDeleteConfirmOpen(false);
      setEventToDelete(null);
      setNotification({ open: true, message: "Event deleted successfully", severity: "success" });
    } catch (err) {
      if (err.status !== 401) {
        setError(err.message);
        setNotification({ open: true, message: `Error deleting event: ${err.message}`, severity: "error" });
      }
    } finally {
      setLoading(false);
    }
  };
 
  const formatDateFromAPI = (dateString) => {
    if (!dateString) return "";
    const [year, month, day] = dateString.split("-");
    return `${day.padStart(2, "0")}/${month.padStart(2, "0")}/${year}`;
  };
 
  const formatTimeFromAPI = (timeString) => {
    if (!timeString) return "";
    const timeParts = timeString.split(":");
    let hours = parseInt(timeParts[0], 10);
    const minutes = timeParts[1] ? timeParts[1].padStart(2, "0") : "00";
    const ampm = hours >= 12 ? "pm" : "am";
    hours %= 12;
    hours = hours || 12;
    return `${hours}:${minutes} ${ampm}`;
  };
 
  const formatTimeForAPI = (timeString) => {
    if (!timeString) return "";
    const [time, ampm] = timeString.split(" ");
    let [hours, minutes] = time.split(":");
    hours = parseInt(hours, 10);
    if (ampm?.toLowerCase() === "pm" && hours < 12) hours += 12;
    if (ampm?.toLowerCase() === "am" && hours === 12) hours = 0;
    return `${hours.toString().padStart(2, "0")}:${minutes.padStart(2, "0")}:00`;
  };
 
  const validateEventForm = (eventData = newEvent) => {
    const fields = ["employee_id", "event_title", "event_date", "event_time", "event_note"];
    for (const field of fields) {
      if (!eventData[field]) {
        setNotification({
          open: true,
          message: `${field.replace("_", " ")} is required`,
          severity: "error",
        });
        return false;
      }
    }
    return true;
  };
 
  const resetEventForm = () => {
    setNewEvent({
      event_title: "", employee_id: employeesList.length > 0 ? employeesList[0].id : "",
      event_date: "", event_time: "", event_color: "#8C257C", event_note: "",
    });
  };
 
  const handleEventChange = (field, value) => setNewEvent({ ...newEvent, [field]: value });
  const handleEditingEventChange = (field, value) => setEditingEvent({ ...editingEvent, [field]: value });
 
  const handleOpenEditDialog = (event) => {
    const matchingEmployee = employeesList.find((emp) => emp.emp_id === event.employee_id);
    setEditingEvent({ ...event, employee_id: matchingEmployee ? matchingEmployee.id : "" });
    setIsEditDialogOpen(true);
  };
 
  const handleCloseEditDialog = () => {
    setIsEditDialogOpen(false);
    setEditingEvent(null);
  };
 
  const handleOpenDeleteConfirm = (event) => {
    setEventToDelete(event);
    setDeleteConfirmOpen(true);
  };
 
  const handleCloseDeleteConfirm = () => {
    setDeleteConfirmOpen(false);
    setEventToDelete(null);
  };
 
  const handleCloseNotification = () => setNotification({ ...notification, open: false });
 
  const handlePaginationChange = (event, newPage) => {
    setPage(newPage - 1);
  };
 
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
 
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setPage(0);
  };
 
  const requestSort = (key) => {
    let direction = sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc";
    setSortConfig({ key, direction });
  };
 
  useEffect(() => {
    const generateCalendarDays = () => {
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth();
      const firstDay = new Date(year, month, 1);
      const lastDay = new Date(year, month + 1, 0);
      const daysFromPrevMonth = firstDay.getDay();
      const totalDays = 42;
      const days = [];
      const prevMonthLastDay = new Date(year, month, 0).getDate();
      for (let i = prevMonthLastDay - daysFromPrevMonth + 1; i <= prevMonthLastDay; i++) {
        days.push({ date: new Date(year, month - 1, i), isCurrentMonth: false, events: [] });
      }
      for (let i = 1; i <= lastDay.getDate(); i++) {
        days.push({ date: new Date(year, month, i), isCurrentMonth: true, events: [] });
      }
      const remainingDays = totalDays - days.length;
      for (let i = 1; i <= remainingDays; i++) {
        days.push({ date: new Date(year, month + 1, i), isCurrentMonth: false, events: [] });
      }
      setCalendarDays(days);
    };
    generateCalendarDays();
  }, [currentDate]);
 
  useEffect(() => {
    if (isAuthenticated) fetchEvents();
  }, [isAuthenticated]);
 
  const filteredEvents = events.filter((event) =>
    Object.values(event).some(
      (value) => value && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );
 
  const sortedEvents = React.useMemo(() => {
    const sortableEvents = [...filteredEvents];
    if (sortConfig.key) {
      sortableEvents.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === "asc" ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }
    return sortableEvents;
  }, [filteredEvents, sortConfig]);
 
  const paginatedEvents = sortedEvents.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
 
  const startEntry = filteredEvents.length > 0 ? page * rowsPerPage + 1 : 0;
  const endEntry = Math.min((page + 1) * rowsPerPage, filteredEvents.length);
 
  const goToPreviousMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  const goToNextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  const goToToday = () => setCurrentDate(new Date());
 
  const formatMonthYear = (date) => date.toLocaleString("en-US", { month: "long", year: "numeric" });
  const getDayNumber = (date) => date.getDate();
  const isToday = (date) => {
    const today = new Date();
    return date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
  };
 
  const handleDatePickerOpen = (event) => {
    setDatePickerAnchorEl(event.currentTarget);
    setDatePickerOpen(true);
  };
  const handleDatePickerClose = () => setDatePickerOpen(false);
 
  const handleDateSelect = (date) => {
    const formattedDate = `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth() + 1).toString().padStart(2, "0")}/${date.getFullYear()}`;
    if (editingEvent) handleEditingEventChange("event_date", formattedDate);
    else handleEventChange("event_date", formattedDate);
    handleDatePickerClose();
  };
 
  const handleTimePickerOpen = (event) => {
    setTimePickerAnchorEl(event.currentTarget);
    setTimePickerOpen(true);
  };
  const handleTimePickerClose = () => setTimePickerOpen(false);
 
  const handleTimeSelect = (hours, minutes, ampm) => {
    const formattedTime = `${hours}:${minutes} ${ampm}`;
    if (editingEvent) handleEditingEventChange("event_time", formattedTime);
    else handleEventChange("event_time", formattedTime);
    handleTimePickerClose();
  };
 
  const handleColorPickerOpen = (event) => {
    setColorPickerAnchorEl(event.currentTarget);
    setColorPickerOpen(true);
  };
  const handleColorPickerClose = () => setColorPickerOpen(false);
 
  const handleColorSelect = (color) => {
    if (editingEvent) handleEditingEventChange("event_color", color);
    else handleEventChange("event_color", color);
    handleColorPickerClose();
  };
 
  const getEventsForDate = (date) => {
    return events.filter((event) => {
      if (!event.event_date) return false;
      const [day, month, year] = event.event_date.split("/");
      const eventDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
      return (
        eventDate.getDate() === date.getDate() &&
        eventDate.getMonth() === date.getMonth() &&
        eventDate.getFullYear() === date.getFullYear()
      );
    });
  };
 
  const hasPermission = (action) => {
    if (!isAuthenticated) return false;
    if (action === "delete" && userRole !== "admin") return false;
    return true;
  };
 
  const DatePicker = () => {
    const [pickerDate, setPickerDate] = useState(new Date());
    const [pickerDays, setPickerDays] = useState([]);
 
    useEffect(() => {
      const generatePickerDays = () => {
        const year = pickerDate.getFullYear();
        const month = pickerDate.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysFromPrevMonth = firstDay.getDay();
        const totalDays = 42;
        const days = [];
        const prevMonthLastDay = new Date(year, month, 0).getDate();
        for (let i = prevMonthLastDay - daysFromPrevMonth + 1; i <= prevMonthLastDay; i++) {
          days.push({ date: new Date(year, month - 1, i), isCurrentMonth: false });
        }
        for (let i = 1; i <= lastDay.getDate(); i++) {
          days.push({ date: new Date(year, month, i), isCurrentMonth: true });
        }
        const remainingDays = totalDays - days.length;
        for (let i = 1; i <= remainingDays; i++) {
          days.push({ date: new Date(year, month + 1, i), isCurrentMonth: false });
        }
        setPickerDays(days);
      };
      generatePickerDays();
    }, [pickerDate]);
 
    const goToPreviousMonth = () => setPickerDate(new Date(pickerDate.getFullYear(), pickerDate.getMonth() - 1, 1));
    const goToNextMonth = () => setPickerDate(new Date(pickerDate.getFullYear(), pickerDate.getMonth() + 1, 1));
 
    return (
      <Paper elevation={8} sx={{ width: 320, p: 3, borderRadius: 3 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
          <IconButton onClick={goToPreviousMonth} size="small" sx={{ bgcolor: "#f5f5f5", "&:hover": { bgcolor: "#e0e0e0" }, borderRadius: 2 }}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" sx={{ fontWeight: 600, color: "#8C257C" }}>
            {pickerDate.toLocaleString("default", { month: "long", year: "numeric" })}
          </Typography>
          <IconButton onClick={goToNextMonth} size="small" sx={{ bgcolor: "#f5f5f5", "&:hover": { bgcolor: "#e0e0e0" }, borderRadius: 2 }}>
            <ArrowForwardIcon />
          </IconButton>
        </Box>
        <Grid container spacing={0.5}>
          {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day, index) => (
            <Grid item xs key={index} sx={{ textAlign: "center", p: 1 }}>
              <Typography variant="caption" sx={{ fontWeight: "bold", color: "#666", fontSize: "0.75rem" }}>{day}</Typography>
            </Grid>
          ))}
        </Grid>
        <Grid container spacing={0.5}>
          {pickerDays.map((day, index) => (
            <Grid item xs key={index}>
              <Box
                sx={{
                  display: "flex", justifyContent: "center", alignItems: "center", height: 40, cursor: "pointer",
                  borderRadius: 2, bgcolor: isToday(day.date) ? "#8C257C" : "transparent",
                  color: isToday(day.date) ? "white" : day.isCurrentMonth ? "text.primary" : "text.disabled",
                  fontWeight: isToday(day.date) ? "bold" : "normal", transition: "all 0.2s ease",
                  "&:hover": { bgcolor: isToday(day.date) ? "#701D62" : day.isCurrentMonth ? "#f0f4ff" : "#f5f5f5", transform: "scale(1.05)" },
                }}
                onClick={() => handleDateSelect(day.date)}
              >
                <Typography variant="body2" sx={{ fontWeight: "inherit" }}>{getDayNumber(day.date)}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
        <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
          <Button variant="outlined" size="small" onClick={() => handleDateSelect(new Date())} startIcon={<TodayIcon />}
            sx={{ borderColor: "#8C257C", color: "#8C257C", "&:hover": { borderColor: "#701D62", bgcolor: "rgba(140, 37, 124, 0.04)" } }}>
            Today
          </Button>
        </Box>
      </Paper>
    );
  };
 
  const TimePicker = () => {
    const [selectedHour, setSelectedHour] = useState("12");
    const [selectedMinute, setSelectedMinute] = useState("00");
    const [selectedAmPm, setSelectedAmPm] = useState("pm");
    const hours = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, "0"));
    const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, "0"));
    const handleSelectTime = () => handleTimeSelect(selectedHour, selectedMinute, selectedAmPm);
 
    return (
      <Paper elevation={8} sx={{ width: 280, p: 3, borderRadius: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
          <ScheduleIcon sx={{ color: "#8C257C", mr: 1 }} />
          <Typography variant="h6" sx={{ fontWeight: 600, color: "#8C257C" }}>Select Time</Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3, gap: 1 }}>
          <FormControl sx={{ flex: 1 }}>
            <InputLabel sx={{ fontSize: "0.875rem" }}>Hour</InputLabel>
            <Select value={selectedHour} onChange={(e) => setSelectedHour(e.target.value)} label="Hour" size="small" sx={{ borderRadius: 2 }}>
              {hours.map((hour) => <MenuItem key={hour} value={hour}>{hour}</MenuItem>)}
            </Select>
          </FormControl>
          <FormControl sx={{ flex: 1 }}>
            <InputLabel sx={{ fontSize: "0.875rem" }}>Min</InputLabel>
            <Select value={selectedMinute} onChange={(e) => setSelectedMinute(e.target.value)} label="Min" size="small" sx={{ borderRadius: 2 }}>
              {minutes.map((minute) => <MenuItem key={minute} value={minute}>{minute}</MenuItem>)}
            </Select>
          </FormControl>
          <FormControl sx={{ flex: 1 }}>
            <InputLabel sx={{ fontSize: "0.875rem" }}>Period</InputLabel>
            <Select value={selectedAmPm} onChange={(e) => setSelectedAmPm(e.target.value)} label="Period" size="small" sx={{ borderRadius: 2 }}>
              <MenuItem value="am">AM</MenuItem><MenuItem value="pm">PM</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center", gap: 1 }}>
          <Button variant="outlined" onClick={handleTimePickerClose} sx={{ borderColor: "#ddd", color: "#666", "&:hover": { borderColor: "#bbb" } }}>Cancel</Button>
          <Button variant="contained" onClick={handleSelectTime} sx={{ bgcolor: "#8C257C", "&:hover": { bgcolor: "#701D62" }, px: 3 }}>Select</Button>
        </Box>
      </Paper>
    );
  };
 
  const ColorPicker = ({ onSelect }) => (
    <Paper elevation={8} sx={{ width: 220, p: 2, borderRadius: 3 }}>
      <Typography variant="subtitle1" sx={{ fontWeight: 600, color: "#8C257C", mb: 2 }}>Select Color</Typography>
      <Grid container spacing={1}>
        {colorPalette.map((color) => (
          <Grid item key={color}>
            <Tooltip title={color}>
              <Box sx={{ width: 32, height: 32, bgcolor: color, borderRadius: 2, cursor: "pointer", transition: "transform 0.2s ease",
                  "&:hover": { transform: "scale(1.15)", boxShadow: "0px 4px 12px rgba(0,0,0,0.2)" } }}
                onClick={() => onSelect(color)}
              />
            </Tooltip>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
 
  const getEmployeeNameById = (id) => {
    const employee = employeesList.find((emp) => emp.id == id);
    return employee ? employee.name : "Unknown Employee";
  };
 
  if (!isAuthenticated) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh", justifyContent: "center", alignItems: "center" }}>
          <Paper elevation={3} sx={{ p: 4, maxWidth: 500, textAlign: "center" }}>
            <LockIcon sx={{ fontSize: 60, color: "#8C257C", mb: 2 }} />
            <Typography variant="h5" sx={{ mb: 2 }}>Authentication Required</Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>You need to be logged in to access the Events Calendar. Please log in with your credentials.</Typography>
            <Button variant="contained" sx={{ bgcolor: "#8C257C", "&:hover": { bgcolor: "#701D62" } }} onClick={() => window.location.reload()}>Refresh</Button>
          </Paper>
        </Box>
      </ThemeProvider>
    );
  }
 
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <Box sx={{ borderBottom: "1px solid #e0e0e0", p: 2, bgcolor: "white" }}>
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", maxWidth: 1200, mx: "auto" }}>
            <Box sx={{ display: "flex", alignItems: "center", mr: 4 }}>
              <IconButton color={activeView === "events" ? "primary" : "default"} onClick={() => setActiveView("events")}
                sx={{ borderRadius: 2, bgcolor: activeView === "events" ? "rgba(140, 37, 124, 0.1)" : "transparent",
                  color: activeView === "events" ? "#8C257C" : "inherit" }}>
                <EventIcon />
              </IconButton>
              <Box sx={{ ml: 1 }}>
                <Typography variant="subtitle1" onClick={() => setActiveView("events")}
                  sx={{ fontWeight: activeView === "events" ? "bold" : "normal", cursor: "pointer", color: activeView === "events" ? "#8C257C" : "textPrimary" }}>
                  Events
                </Typography>
                <Typography variant="caption" color="textSecondary">Set up Events</Typography>
              </Box>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <IconButton onClick={() => setActiveView("calendar")}
                sx={{ borderRadius: 2, bgcolor: activeView === "calendar" ? "rgba(140, 37, 124, 0.1)" : "transparent",
                  color: activeView === "calendar" ? "#8C257C" : "inherit" }}>
                <CalendarTodayIcon />
              </IconButton>
              <Box sx={{ ml: 1 }}>
                <Typography variant="subtitle1" onClick={() => setActiveView("calendar")}
                  sx={{ fontWeight: activeView === "calendar" ? "bold" : "normal", cursor: "pointer", color: activeView === "calendar" ? "#8C257C" : "textPrimary" }}>
                  Calendar
                </Typography>
                <Typography variant="caption" color="textSecondary">Events Calendar</Typography>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box sx={{ p: 3, flexGrow: 1, bgcolor: "#f5f5f9" }}>
          <Box sx={{ maxWidth: 1200, mx: "auto" }}>
            {activeView === "events" ? (
              <Grid container spacing={isMobile ? 0 : 3}>
                <Grid item xs={12} md={4}>
                  <Paper elevation={2} sx={{ p: isMobile ? 2 : 3, height: "100%", borderRadius: 3, mb: isMobile ? 2 : 0 }}>
                    <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold", color: "#8C257C" }}>Add New Event</Typography>
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 500 }}>Employee <span style={{ color: "red" }}>*</span></Typography>
                      <FormControl fullWidth>
                        <Select value={newEvent.employee_id} onChange={(e) => handleEventChange("employee_id", e.target.value)} displayEmpty sx={{ borderRadius: 2 }}>
                          <MenuItem value=""><em>Select Employee</em></MenuItem>
                          {employeesList.map((employee) => (<MenuItem key={employee.id} value={employee.id}>{employee.name}</MenuItem>))}
                        </Select>
                      </FormControl>
                      {employeesList.length === 0 && (<Typography variant="caption" color="textSecondary" sx={{ mt: 1, display: "block" }}>Loading employees...</Typography>)}
                    </Box>
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 500 }}>Event Title <span style={{ color: "red" }}>*</span></Typography>
                      <TextField fullWidth placeholder="Enter event title" value={newEvent.event_title} onChange={(e) => handleEventChange("event_title", e.target.value)} required sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }} />
                    </Box>
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 500 }}>Event Date <span style={{ color: "red" }}>*</span></Typography>
                      <TextField fullWidth placeholder="Select date" value={newEvent.event_date} onClick={handleDatePickerOpen}
                        InputProps={{ readOnly: true, endAdornment: (<InputAdornment position="end"><CalendarTodayIcon sx={{ color: "#8C257C" }} /></InputAdornment>) }}
                        required sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2, cursor: "pointer" } }} />
                      <Popover open={datePickerOpen} anchorEl={datePickerAnchorEl} onClose={handleDatePickerClose} anchorOrigin={{ vertical: "bottom", horizontal: "left" }} transformOrigin={{ vertical: "top", horizontal: "left" }}>
                        <DatePicker />
                      </Popover>
                    </Box>
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 500 }}>Event Time <span style={{ color: "red" }}>*</span></Typography>
                      <TextField fullWidth placeholder="Select time" value={newEvent.event_time} onClick={handleTimePickerOpen}
                        InputProps={{ readOnly: true, endAdornment: (<InputAdornment position="end"><AccessTimeIcon sx={{ color: "#8C257C" }} /></InputAdornment>) }}
                        required sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2, cursor: "pointer" } }} />
                      <Popover open={timePickerOpen} anchorEl={timePickerAnchorEl} onClose={handleTimePickerClose} anchorOrigin={{ vertical: "bottom", horizontal: "left" }} transformOrigin={{ vertical: "top", horizontal: "left" }}>
                        <TimePicker />
                      </Popover>
                    </Box>
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 500 }}>Event Color</Typography>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <Box onClick={handleColorPickerOpen} sx={{ width: 32, height: 32, bgcolor: newEvent.event_color, borderRadius: 2, border: "2px solid #e0e0e0", cursor: "pointer", transition: "transform 0.2s", "&:hover": { transform: "scale(1.1)" } }} />
                        <TextField fullWidth value={newEvent.event_color} onChange={(e) => handleEventChange("event_color", e.target.value)} sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }} />
                      </Box>
                      <Popover open={colorPickerOpen} anchorEl={colorPickerAnchorEl} onClose={handleColorPickerClose} anchorOrigin={{ vertical: "bottom", horizontal: "left" }} transformOrigin={{ vertical: "top", horizontal: "left" }}>
                        <ColorPicker onSelect={handleColorSelect} />
                      </Popover>
                    </Box>
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 500 }}>Event Note <span style={{ color: "red" }}>*</span></Typography>
                      <TextField fullWidth multiline rows={4} placeholder="Enter event description" value={newEvent.event_note} onChange={(e) => handleEventChange("event_note", e.target.value)} required sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }} />
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                      <Button variant="contained" onClick={createEvent} disabled={loading} sx={{ bgcolor: "#8C257C", "&:hover": { bgcolor: "#701D62" }, px: 4, py: 1.5, borderRadius: 2, fontWeight: 600 }}>
                        {loading ? "Saving..." : "Save Event"}
                      </Button>
                    </Box>
                  </Paper>
                </Grid>
                <Grid item xs={12} md={8}>
                  <Paper elevation={2} sx={{ p: isMobile ? 1 : 3, borderRadius: 3 }}>
                    <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold", color: "#8C257C" }}>List All Events</Typography>
                    <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
                      <TextField size="small" value={searchTerm} onChange={handleSearch} placeholder="Search events..."
                        InputProps={{ endAdornment: (<InputAdornment position="end"><SearchIcon sx={{ color: "#8C257C" }} /></InputAdornment>) }}
                        sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }} />
                    </Box>
                    <TableContainer sx={{ borderRadius: 2 }}>
                      <Table>
                        <TableHead>
                          <TableRow sx={{ "& .MuiTableCell-root": { color: textOnPrimary, bgcolor: primaryColor, fontWeight: "bold" }}}>
                            <TableCell onClick={() => requestSort("event_title")} sx={{ cursor: "pointer" }}>
                              <Box sx={{ display: "flex", alignItems: "center" }}>EVENT TITLE
                                {sortConfig.key === "event_title" && (sortConfig.direction === "asc" ? <ArrowUpwardIcon fontSize="small" /> : <ArrowDownwardIcon fontSize="small" />)}
                              </Box>
                            </TableCell>
                            <TableCell onClick={() => requestSort("employee_name")} sx={{ cursor: "pointer" }}>
                              <Box sx={{ display: "flex", alignItems: "center" }}>EMPLOYEE
                                {sortConfig.key === "employee_name" && (sortConfig.direction === "asc" ? <ArrowUpwardIcon fontSize="small" /> : <ArrowDownwardIcon fontSize="small" />)}
                              </Box>
                            </TableCell>
                            <TableCell onClick={() => requestSort("event_date")} sx={{ cursor: "pointer" }}>
                              <Box sx={{ display: "flex", alignItems: "center" }}>EVENT DATE
                                {sortConfig.key === "event_date" && (sortConfig.direction === "asc" ? <ArrowUpwardIcon fontSize="small" /> : <ArrowDownwardIcon fontSize="small" />)}
                              </Box>
                            </TableCell>
                            <TableCell onClick={() => requestSort("event_time")} sx={{ cursor: "pointer" }}>
                              <Box sx={{ display: "flex", alignItems: "center" }}>EVENT TIME
                                {sortConfig.key === "event_time" && (sortConfig.direction === "asc" ? <ArrowUpwardIcon fontSize="small" /> : <ArrowDownwardIcon fontSize="small" />)}
                              </Box>
                            </TableCell>
                            <TableCell>ACTIONS</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {loading ? (
                            <TableRow><TableCell colSpan={5} align="center" sx={{ py: 4 }}>Loading events...</TableCell></TableRow>
                          ) : paginatedEvents.length === 0 ? (
                            <TableRow><TableCell colSpan={5} align="center" sx={{ py: 4 }}>No events found</TableCell></TableRow>
                          ) : (
                            paginatedEvents.map((event) => (
                              <TableRow key={event.event_id} hover sx={{ "&:hover": { bgcolor: "#f8f9fa" }, transition: "background-color 0.2s" }}>
                                <TableCell>
                                  <Box sx={{ display: "flex", alignItems: "center" }}>
                                    <Box sx={{ width: 16, height: 16, bgcolor: event.event_color, borderRadius: 1, mr: 2, boxShadow: 1 }} />
                                    <Typography variant="body2" sx={{ fontWeight: 500 }}>{event.event_title}</Typography>
                                  </Box>
                                </TableCell>
                                <TableCell>
                                  <Chip label={event.employee_name || getEmployeeNameById(event.employee_id)} size="small" variant="outlined" sx={{ borderRadius: 2 }} />
                                </TableCell>
                                <TableCell>{event.event_date}</TableCell>
                                <TableCell>{event.event_time}</TableCell>
                                <TableCell>
                                  <Box sx={{ display: "flex", gap: 1 }}>
                                    <IconButton size="small" color="primary" onClick={() => handleOpenEditDialog(event)} disabled={!hasPermission("edit")}
                                      sx={{ borderRadius: 2, "&:hover": { bgcolor: "rgba(140, 37, 124, 0.1)" } }}>
                                      <EditIcon fontSize="small" />
                                    </IconButton>
                                    <IconButton size="small" color="error" onClick={() => handleOpenDeleteConfirm(event)}
                                      sx={{ borderRadius: 2, "&:hover": { bgcolor: "#ffebee" } }}>
                                      <DeleteIcon fontSize="small" />
                                    </IconButton>
                                  </Box>
                                </TableCell>
                              </TableRow>
                            ))
                          )}
                        </TableBody>
                      </Table>
                    </TableContainer>
                    <Box sx={{ p: 2, borderTop: '1px solid rgba(224, 224, 224, 1)' }}>
                      {loading ? (
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <Skeleton variant="text" width={200} />
                              <Skeleton variant="rectangular" width={300} height={40} />
                          </Box>
                      ) : (
                        filteredEvents.length > 0 && (
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                  <FormControl variant="outlined" size="small">
                                      <Select
                                          value={rowsPerPage}
                                          onChange={handleChangeRowsPerPage}
                                          sx={{ backgroundColor: primaryColor, color: textOnPrimary, borderRadius: '4px', '&:hover': { backgroundColor: primaryHoverColor }, '& .MuiOutlinedInput-notchedOutline': { border: 'none' }, '& .MuiSvgIcon-root': { color: textOnPrimary } }} >
                                          {[5, 10, 15, 25].map((value) => ( <MenuItem key={value} value={value}>{value}</MenuItem> ))}
                                      </Select>
                                  </FormControl>
                                  <Typography variant="body2" color="text.secondary">
                                    {`Showing ${startEntry} to ${endEntry} of ${filteredEvents.length} results`}
                                  </Typography>
                              </Box>
                              <Pagination
                                  count={Math.ceil(filteredEvents.length / rowsPerPage)}
                                  page={page + 1}
                                  onChange={handlePaginationChange}
                                  showFirstButton showLastButton
                                  sx={{
                                      '& .MuiPaginationItem-root:hover': { backgroundColor: secondaryColor, color: textOnPrimary },
                                      '& .MuiPaginationItem-page': {
                                          color: primaryColor,
                                          '&.Mui-selected': { backgroundColor: primaryColor, color: textOnPrimary, '&:hover': { backgroundColor: secondaryColor } },
                                      },
                                      '& .MuiPaginationItem-icon': { color: primaryColor }
                                  }}
                              />
                          </Box>
                        )
                      )}
                    </Box>
                  </Paper>
                </Grid>
              </Grid>
            ) : (
              <Paper elevation={2} sx={{ p: isMobile ? 2 : 3, borderRadius: 3 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <IconButton onClick={goToPreviousMonth} sx={{ bgcolor: "#f5f5f5", "&:hover": { bgcolor: "#e0e0e0" }, borderRadius: 2 }}><ArrowBackIcon /></IconButton>
                    <Button variant="contained" onClick={goToToday} sx={{ bgcolor: "#8C257C", "&:hover": { bgcolor: "#701D62" }, borderRadius: 2, px: 3 }}>Today</Button>
                    <IconButton onClick={goToNextMonth} sx={{ bgcolor: "#f5f5f5", "&:hover": { bgcolor: "#e0e0e0" }, borderRadius: 2 }}><ArrowForwardIcon /></IconButton>
                  </Box>
                  <Typography variant="h5" sx={{ fontWeight: "bold", color: "#333" }}>{formatMonthYear(currentDate)}</Typography>
                  <Box sx={{ display: "flex", gap: 1 }}>
                    {["month", "week", "day", "list"].map((viewType) => (
                      <Button key={viewType} variant={calendarViewType === viewType ? "contained" : "outlined"} onClick={() => setCalendarViewType(viewType)} size="small"
                        sx={{
                          bgcolor: calendarViewType === viewType ? "#8C257C" : "transparent", borderColor: calendarViewType === viewType ? "#8C257C" : "#ddd",
                          color: calendarViewType === viewType ? "white" : "#8C257C", borderRadius: 2, textTransform: "capitalize",
                          "&:hover": { bgcolor: calendarViewType === viewType ? "#701D62" : "rgba(140, 37, 124, 0.04)" } }}>
                        {viewType}
                      </Button>
                    ))}
                  </Box>
                </Box>
                {calendarViewType === "month" && (
                  <Box>
                    <Grid container sx={{ mb: 1 }}>
                      {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, index) => (
                        <Grid item xs key={index} sx={{ textAlign: "center", p: 2, bgcolor: "#f8f9fa", borderRadius: index === 0 ? "8px 0 0 0" : index === 6 ? "0 8px 0 0" : "0" }}>
                          <Typography variant="subtitle2" sx={{ fontWeight: "bold", color: "#666" }}>{day}</Typography>
                        </Grid>
                      ))}
                    </Grid>
                    <Grid container sx={{ border: "1px solid #e0e0e0", borderRadius: 2 }}>
                      {calendarDays.map((day, index) => (
                        <Grid item xs key={index}>
                          <Box sx={{ height: 140, border: "1px solid #f0f0f0", p: 1, bgcolor: isToday(day.date) ? "rgba(140, 37, 124, 0.1)" : "white",
                              color: day.isCurrentMonth ? "text.primary" : "text.disabled", transition: "all 0.2s ease",
                              "&:hover": { bgcolor: isToday(day.date) ? "rgba(140, 37, 124, 0.2)" : "#f8f9fa", transform: "scale(1.02)" },
                              cursor: "pointer", position: "relative", overflow: "hidden" }}>
                            <Typography variant="body2" sx={{ textAlign: "right", fontWeight: isToday(day.date) ? "bold" : "normal", color: isToday(day.date) ? "#8C257C" : "inherit" }}>
                              {getDayNumber(day.date)}
                            </Typography>
                            <Box sx={{ mt: 0.5, maxHeight: 100, overflowY: "auto" }}>
                              {getEventsForDate(day.date).slice(0, 3).map((event, eventIndex) => (
                                  <Tooltip title={`${event.event_title} - ${event.event_time}\n${event.employee_name || getEmployeeNameById(event.employee_id)}`} key={eventIndex}>
                                    <Fade in timeout={300 + eventIndex * 100}>
                                      <Card sx={{ bgcolor: event.event_color, color: "white", mb: 0.5, cursor: "pointer", transition: "all 0.2s ease", "&:hover": { transform: "scale(1.05)", boxShadow: 2 } }}
                                        onClick={(e) => { e.stopPropagation(); handleOpenEditDialog(event); }}>
                                        <CardContent sx={{ p: 1, "&:last-child": { pb: 1 } }}>
                                          <Typography variant="caption" sx={{ fontSize: "0.7rem", fontWeight: 500, display: "block", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                            {event.event_title}
                                          </Typography>
                                          <Typography variant="caption" sx={{ fontSize: "0.65rem", opacity: 0.9, display: "block" }}>{event.event_time}</Typography>
                                        </CardContent>
                                      </Card>
                                    </Fade>
                                  </Tooltip>
                                ))}
                              {getEventsForDate(day.date).length > 3 && (
                                <Typography variant="caption" sx={{ color: "#8C257C", fontWeight: "bold", fontSize: "0.7rem" }}>
                                  +{getEventsForDate(day.date).length - 3} more
                                </Typography>
                              )}
                            </Box>
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                )}
                {calendarViewType !== "month" && (
                  <Box sx={{ textAlign: "center", p: 5 }}>
                    <Typography>Week, Day, and List views are under construction.</Typography>
                  </Box>
                )}
              </Paper>
            )}
          </Box>
        </Box>
      </Box>
 
      <Dialog open={isEditDialogOpen} onClose={handleCloseEditDialog} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: 3 } }}>
        <DialogTitle sx={{ pb: 1 }}><Typography variant="h6" sx={{ fontWeight: "bold", color: "#333" }}>Edit Event</Typography></DialogTitle>
        <DialogContent>
          {editingEvent && (
            <Box sx={{ mt: 2 }}>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 500 }}>Employee <span style={{ color: "red" }}>*</span></Typography>
                <FormControl fullWidth>
                  <Select value={editingEvent.employee_id} onChange={(e) => handleEditingEventChange("employee_id", e.target.value)} displayEmpty sx={{ borderRadius: 2 }}
                    renderValue={(selectedId) => {
                      if (!selectedId) return <em>Select Employee</em>;
                      const selectedEmployee = employeesList.find((emp) => emp.id == selectedId);
                      return selectedEmployee ? selectedEmployee.name : "";
                    }}>
                    <MenuItem value=""><em>Select Employee</em></MenuItem>
                    {employeesList.map((employee) => (<MenuItem key={employee.id} value={employee.id}>{employee.name}</MenuItem>))}
                  </Select>
                </FormControl>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 500 }}>Event Title <span style={{ color: "red" }}>*</span></Typography>
                <TextField fullWidth placeholder="Event Title" value={editingEvent.event_title} onChange={(e) => handleEditingEventChange("event_title", e.target.value)} required sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }} />
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 500 }}>Event Date <span style={{ color: "red" }}>*</span></Typography>
                <TextField fullWidth placeholder="Event Date" value={editingEvent.event_date} onClick={handleDatePickerOpen}
                  InputProps={{ readOnly: true, endAdornment: (<InputAdornment position="end"><CalendarTodayIcon sx={{ color: "#8C257C" }} /></InputAdornment>) }}
                  required sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2, cursor: "pointer" } }} />
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 500 }}>Event Time <span style={{ color: "red" }}>*</span></Typography>
                <TextField fullWidth placeholder="Event Time" value={editingEvent.event_time} onClick={handleTimePickerOpen}
                  InputProps={{ readOnly: true, endAdornment: (<InputAdornment position="end"><AccessTimeIcon sx={{ color: "#8C257C" }} /></InputAdornment>) }}
                  required sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2, cursor: "pointer" } }} />
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 500 }}>Event Color</Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Box onClick={handleColorPickerOpen} sx={{ width: 32, height: 32, bgcolor: editingEvent.event_color, borderRadius: 2, border: "2px solid #e0e0e0", cursor: "pointer", transition: "transform 0.2s", "&:hover": { transform: "scale(1.1)" } }} />
                  <TextField fullWidth value={editingEvent.event_color} onChange={(e) => handleEditingEventChange("event_color", e.target.value)} sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }} />
                </Box>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 500 }}>Event Note <span style={{ color: "red" }}>*</span></Typography>
                <TextField fullWidth multiline rows={4} placeholder="Event Note" value={editingEvent.event_note} onChange={(e) => handleEditingEventChange("event_note", e.target.value)} required sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }} />
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 1 }}>
          <Button onClick={handleCloseEditDialog} variant="outlined" sx={{ borderColor: "#ddd", color: "#666", borderRadius: 2, "&:hover": { borderColor: "#bbb" } }}>Cancel</Button>
          <Button onClick={updateEvent} variant="contained" disabled={loading} sx={{ bgcolor: "#8C257C", "&:hover": { bgcolor: "#701D62" }, borderRadius: 2, px: 3 }}>
            {loading ? "Updating..." : "Update Event"}
          </Button>
        </DialogActions>
      </Dialog>
 
      <Dialog open={deleteConfirmOpen} onClose={handleCloseDeleteConfirm} PaperProps={{ sx: { borderRadius: 3 } }}>
        <DialogTitle sx={{ pb: 1 }}><Typography variant="h6" sx={{ fontWeight: "bold", color: "#d32f2f" }}>Confirm Delete</Typography></DialogTitle>
        <DialogContent>
          <Typography variant="body1">Are you sure you want to delete the event "{eventToDelete?.event_title}"?</Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>This action cannot be undone.</Typography>
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 1 }}>
          <Button onClick={handleCloseDeleteConfirm} variant="outlined" sx={{ borderColor: "#ddd", color: "#666", borderRadius: 2, "&:hover": { borderColor: "#bbb" } }}>Cancel</Button>
          <Button onClick={deleteEvent} color="error" variant="contained" disabled={loading} sx={{ borderRadius: 2, px: 3 }}>
            {loading ? "Deleting..." : "Delete Event"}
          </Button>
        </DialogActions>
      </Dialog>
 
      <Snackbar open={notification.open} autoHideDuration={6000} onClose={handleCloseNotification} anchorOrigin={{ vertical: "bottom", horizontal: "right" }}>
        <Alert onClose={handleCloseNotification} severity={notification.severity} sx={{ width: "100%", borderRadius: 2, "& .MuiAlert-icon": { fontSize: "1.2rem" } }}>
          {notification.message}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
}
 
export default EventsAdmin;