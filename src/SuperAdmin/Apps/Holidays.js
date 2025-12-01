

// import { useState, useEffect } from "react"
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
// import {
//   faSort,
//   faSortUp,
//   faSortDown,
//   faChevronLeft,
//   faChevronRight,
//   faEdit,
//   faTrash,
// } from "@fortawesome/free-solid-svg-icons"
// import axiosInstance from "../../utils/axiosInstance";

// export default function Holidays() {
//   // State for form inputs
//   const [eventTitle, setEventTitle] = useState("")
//   const [startDate, setStartDate] = useState("")
//   const [endDate, setEndDate] = useState("")
//   const [description, setDescription] = useState("")
//   const [status, setStatus] = useState("Published")
//   const [selectedCountry, setSelectedCountry] = useState("") // Stores country name
//   const [selectedState, setSelectedState] = useState("") // Stores state ID
//   const [selectedHub, setSelectedHub] = useState("");

//   // State for API-driven dropdown options
//   const [countries, setCountries] = useState([]);
//   const [formStates, setFormStates] = useState([]); // States for the form
//   const [filterStates, setFilterStates] = useState([]); // States for the filter dropdowns
//   const [hubOptions, setHubOptions] = useState([]);

//   // State for holidays list
//   const [holidays, setHolidays] = useState([])
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState("")

//   // State for pagination
//   const [currentPage, setCurrentPage] = useState(1)
//   const [entriesPerPage, setEntriesPerPage] = useState(10)
//   const [searchTerm, setSearchTerm] = useState("")

//   // State for sorting
//   const [sortField, setSortField] = useState("")
//   const [sortDirection, setSortDirection] = useState("asc")

//   // State for view mode
//   const [viewMode, setViewMode] = useState("holidays")

//   // State for calendar
//   const [currentMonth, setCurrentMonth] = useState(new Date())
//   const [calendarView, setCalendarView] = useState("month")

//   // State for filtering
//   const [filterCountry, setFilterCountry] = useState("") // Stores country name for filtering
//   const [filterState, setFilterState] = useState("")     // Stores state name for filtering

//   // State for editing
//   const [isEditing, setIsEditing] = useState(false)
//   const [editingHolidayId, setEditingHolidayId] = useState(null)

//   // Styles object (remains unchanged)
//   const styles = {
//     holidaysContainer: {
//       maxWidth: "1200px",
//       margin: "0 auto",
//       padding: "20px",
//       fontFamily: "Arial, sans-serif",
//     },
//     header: {
//       display: "flex",
//       justifyContent: "space-between",
//       alignItems: "center",
//       marginBottom: "30px",
//       borderBottom: "2px solid #e0e0e0",
//       paddingBottom: "20px",
//     },
//     titleSection: {
//       cursor: "pointer",
//       padding: "10px 20px",
//       borderRadius: "8px",
//       transition: "all 0.3s ease",
//     },
//     titleSectionActive: {
//       backgroundColor: "#007bff",
//       color: "white",
//     },
//     viewToggle: {
//       cursor: "pointer",
//       padding: "10px 20px",
//       borderRadius: "8px",
//       transition: "all 0.3s ease",
//     },
//     viewToggleActive: {
//       backgroundColor: "#007bff",
//       color: "white",
//     },
//     titleText: {
//       margin: 0,
//     },
//     titleH1: {
//       margin: 0,
//       fontSize: "24px",
//     },
//     titleP: {
//       margin: "5px 0 0 0",
//       fontSize: "14px",
//       opacity: 0.8,
//     },
//     content: {
//       display: "flex",
//       gap: "30px",
//     },
//     contentColumn: {
//       flexDirection: "column",
//     },
//     formSection: {
//       flex: 1,
//       background: "#f8f9fa",
//       padding: "25px",
//       borderRadius: "8px",
//       boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
//     },
//     viewSection: {
//       flex: 2,
//     },
//     formGroup: {
//       marginBottom: "20px",
//     },
//     formRow: {
//       display: "flex",
//       gap: "15px",
//     },
//     formRowGroup: {
//       flex: 1,
//     },
//     label: {
//       display: "block",
//       marginBottom: "5px",
//       fontWeight: "bold",
//       color: "#333",
//     },
//     required: {
//       color: "red",
//     },
//     input: {
//       width: "100%",
//       padding: "10px",
//       border: "1px solid #ddd",
//       borderRadius: "4px",
//       fontSize: "14px",
//       boxSizing: "border-box",
//     },
//     inputFocus: {
//       outline: "none",
//       borderColor: "#007bff",
//       boxShadow: "0 0 0 2px rgba(0, 123, 255, 0.25)",
//     },
//     textarea: {
//       width: "100%",
//       padding: "10px",
//       border: "1px solid #ddd",
//       borderRadius: "4px",
//       fontSize: "14px",
//       resize: "vertical",
//       minHeight: "80px",
//       boxSizing: "border-box",
//     },
//     formActions: {
//       display: "flex",
//       gap: "10px",
//       marginTop: "25px",
//     },
//     saveButton: {
//       padding: "12px 24px",
//       border: "none",
//       borderRadius: "4px",
//       cursor: "pointer",
//       fontSize: "14px",
//       fontWeight: "bold",
//       backgroundColor: "#28a745",
//       color: "white",
//       transition: "background-color 0.3s ease",
//     },
//     saveButtonDisabled: {
//       backgroundColor: "#6c757d",
//       cursor: "not-allowed",
//     },
//     cancelButton: {
//       padding: "12px 24px",
//       border: "none",
//       borderRadius: "4px",
//       cursor: "pointer",
//       fontSize: "14px",
//       fontWeight: "bold",
//       backgroundColor: "#6c757d",
//       color: "white",
//     },
//     listView: {
//       background: "white",
//       borderRadius: "8px",
//       boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
//       overflow: "hidden",
//     },
//     listControls: {
//       padding: "20px",
//       background: "#f8f9fa",
//       borderBottom: "1px solid #e0e0e0",
//     },
//     entriesSearchRow: {
//       display: "flex",
//       justifyContent: "space-between",
//       alignItems: "center",
//       marginBottom: "15px",
//     },
//     entriesSelector: {
//       display: "flex",
//       alignItems: "center",
//       gap: "10px",
//     },
//     searchBox: {
//       display: "flex",
//       alignItems: "center",
//       gap: "10px",
//     },
//     searchInput: {
//       width: "250px",
//       padding: "8px 12px",
//       border: "1px solid #ddd",
//       borderRadius: "4px",
//     },
//     filterRow: {
//       display: "flex",
//       gap: "20px",
//       alignItems: "center",
//     },
//     filterGroup: {
//       display: "flex",
//       alignItems: "center",
//       gap: "10px",
//     },
//     filterLabel: {
//       margin: 0,
//       fontWeight: "normal",
//     },
//     filterSelect: {
//       width: "auto",
//       minWidth: "150px",
//       padding: "5px 10px",
//       border: "1px solid #ddd",
//       borderRadius: "4px",
//     },
//     holidaysTable: {
//       width: "100%",
//       borderCollapse: "collapse",
//     },
//     tableHeader: {
//       backgroundColor: "#007bff",
//       color: "white",
//       padding: "12px",
//       textAlign: "left",
//       cursor: "pointer",
//       userSelect: "none",
//     },
//     tableHeaderHover: {
//       backgroundColor: "#0056b3",
//     },
//     tableCell: {
//       padding: "12px",
//       borderBottom: "1px solid #e0e0e0",
//     },
//     tableRowHover: {
//       backgroundColor: "#f8f9fa",
//     },
//     statusBadge: {
//       padding: "4px 8px",
//       borderRadius: "12px",
//       fontSize: "12px",
//       fontWeight: "bold",
//       textTransform: "uppercase",
//     },
//     statusPublished: {
//       backgroundColor: "#d4edda",
//       color: "#155724",
//     },
//     statusRestricted: {
//       backgroundColor: "#f8d7da",
//       color: "#721c24",
//     },
//     actionButton: {
//       padding: "6px 12px",
//       marginRight: "5px",
//       border: "none",
//       borderRadius: "4px",
//       cursor: "pointer",
//       fontSize: "12px",
//       transition: "background-color 0.3s ease",
//     },
//     editButton: {
//       backgroundColor: "#ffc107",
//       color: "#212529",
//     },
//     deleteButton: {
//       backgroundColor: "#dc3545",
//       color: "white",
//     },
//     actionButtonDisabled: {
//       opacity: 0.6,
//       cursor: "not-allowed",
//     },
//     pagination: {
//       display: "flex",
//       justifyContent: "space-between",
//       alignItems: "center",
//       padding: "20px",
//       background: "#f8f9fa",
//       borderTop: "1px solid #e0e0e0",
//     },
//     paginationControls: {
//       display: "flex",
//       gap: "5px",
//     },
//     paginationButton: {
//       padding: "8px 12px",
//       border: "1px solid #ddd",
//       background: "white",
//       cursor: "pointer",
//       borderRadius: "4px",
//     },
//     paginationButtonActive: {
//       backgroundColor: "#007bff",
//       color: "white",
//       borderColor: "#007bff",
//     },
//     paginationButtonDisabled: {
//       opacity: 0.6,
//       cursor: "not-allowed",
//     },
//     calendarContent: {
//       flexDirection: "row",
//     },
//     eventsSidebar: {
//       flex: "0 0 200px",
//       background: "#f8f9fa",
//       padding: "20px",
//       borderRadius: "8px",
//       marginRight: "20px",
//     },
//     calendarContainer: {
//       flex: 1,
//     },
//     eventTypes: {
//       marginTop: "15px",
//     },
//     eventType: {
//       display: "flex",
//       alignItems: "center",
//       marginBottom: "10px",
//       fontSize: "14px",
//     },
//     eventTypeSpan: {
//       width: "12px",
//       height: "12px",
//       borderRadius: "50%",
//       marginRight: "8px",
//     },
//     eventTypePublished: {
//       backgroundColor: "#28a745",
//     },
//     eventTypeRestricted: {
//       backgroundColor: "#dc3545",
//     },
//     calendarView: {
//       background: "white",
//       borderRadius: "8px",
//       boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
//       overflow: "hidden",
//     },
//     calendarHeader: {
//       padding: "20px",
//       background: "#f8f9fa",
//       borderBottom: "1px solid #e0e0e0",
//       display: "flex",
//       justifyContent: "space-between",
//       alignItems: "center",
//       flexWrap: "wrap",
//       gap: "15px",
//     },
//     calendarNavigation: {
//       display: "flex",
//       alignItems: "center",
//       gap: "10px",
//     },
//     navButton: {
//       padding: "8px 12px",
//       border: "1px solid #ddd",
//       background: "white",
//       cursor: "pointer",
//       borderRadius: "4px",
//     },
//     todayButton: {
//       padding: "8px 12px",
//       border: "1px solid #ddd",
//       background: "white",
//       cursor: "pointer",
//       borderRadius: "4px",
//     },
//     calendarTitle: {
//       fontSize: "18px",
//       fontWeight: "bold",
//       color: "#333",
//     },
//     calendarFilters: {
//       display: "flex",
//       gap: "15px",
//     },
//     viewOptions: {
//       display: "flex",
//       gap: "5px",
//     },
//     viewOption: {
//       padding: "6px 12px",
//       border: "1px solid #ddd",
//       background: "white",
//       cursor: "pointer",
//       borderRadius: "4px",
//       textTransform: "capitalize",
//     },
//     viewOptionActive: {
//       backgroundColor: "#007bff",
//       color: "white",
//       borderColor: "#007bff",
//     },
//     calendarGrid: {
//       padding: "20px",
//     },
//     calendarDaysHeader: {
//       display: "grid",
//       gridTemplateColumns: "repeat(7, 1fr)",
//       gap: "1px",
//       marginBottom: "10px",
//     },
//     calendarHeaderCell: {
//       padding: "10px",
//       textAlign: "center",
//       fontWeight: "bold",
//       backgroundColor: "#f8f9fa",
//       border: "1px solid #e0e0e0",
//     },
//     calendarDays: {
//       display: "grid",
//       gridTemplateColumns: "repeat(7, 1fr)",
//       gap: "1px",
//     },
//     calendarDay: {
//       minHeight: "100px",
//       padding: "8px",
//       border: "1px solid #e0e0e0",
//       background: "white",
//       position: "relative",
//     },
//     calendarDayOtherMonth: {
//       backgroundColor: "#f8f9fa",
//       color: "#6c757d",
//     },
//     calendarDayToday: {
//       backgroundColor: "#e3f2fd",
//       borderColor: "#2196f3",
//     },
//     dayNumber: {
//       fontWeight: "bold",
//       marginBottom: "5px",
//     },
//     dayHolidays: {
//       display: "flex",
//       flexDirection: "column",
//       gap: "2px",
//     },
//     holidayEvent: {
//       padding: "2px 6px",
//       borderRadius: "3px",
//       fontSize: "11px",
//       color: "white",
//       overflow: "hidden",
//       textOverflow: "ellipsis",
//       whiteSpace: "nowrap",
//     },
//     holidayEventPublished: {
//       backgroundColor: "#28a745",
//     },
//     holidayEventRestricted: {
//       backgroundColor: "#dc3545",
//     },
//     errorMessage: {
//       backgroundColor: "#f8d7da",
//       color: "#721c24",
//       padding: "10px",
//       border: "1px solid #f5c6cb",
//       borderRadius: "4px",
//       marginBottom: "15px",
//     },
//     loadingMessage: {
//       textAlign: "center",
//       padding: "20px",
//       color: "#6c757d",
//     },
//   }

//   // API Functions
//   const fetchHolidays = async () => {
//     setLoading(true);
//     try {
//       const response = await axiosInstance.get("/api/holiday/");
//       const holidaysFromAPI = response.data.data || [];

//       // DEBUGGING: Check the raw data from the API in your browser's console.
//       console.log("Raw API Data:", holidaysFromAPI);

//       const mappedHolidays = holidaysFromAPI.map((holiday) => ({
//         id: holiday.holiday_id,
//         event_name: holiday.event_name,
//         start_date: formatDateFromAPI(holiday.start_date),
//         endDate: formatDateFromAPI(holiday.end_date),
//         description: holiday.description || "",
//         //=========== THE FIX IS HERE ==================
//         // Use loose equality (==) to handle both numbers (1) and strings ("1")
//         status: holiday.status == 1 ? "Published" : "Restricted",
//         //==========================================
//         country: holiday.country,
//         state: holiday.state,
//         employee_hub_id: holiday.employee_hub,
//       }));
//       setHolidays(mappedHolidays);
//     } catch (error) {
//       console.error("Error fetching holidays:", error);
//       setError("Failed to load holidays");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const createHoliday = async () => {
//     setLoading(true);
//     try {
//       const payload = {
//         state: selectedState,
//         employee_hub: selectedHub,
//         country: selectedCountry,
//         event_name: eventTitle,
//         start_date: startDate,
//         end_date: endDate,
//         description,
//         is_publish: status === "Published" ? 1 : 0,
//       };
//       await axiosInstance.post("api/holiday/", payload);
//       await fetchHolidays();
//       resetForm();
//     } catch (error) {
//       console.error("Failed to create holiday:", error);
//       setError("Failed to create holiday.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const updateHoliday = async () => {
//     setLoading(true);
//     try {
//       const payload = {
//         holiday_id: editingHolidayId,
//         state: selectedState,
//         employee_hub: selectedHub,
//         country: selectedCountry,
//         event_name: eventTitle,
//         start_date: startDate,
//         end_date: endDate,
//         description,
//         is_publish: status === "Published" ? 1 : 0,
//       };
//       await axiosInstance.put("api/holiday/", payload);
//       await fetchHolidays();
//       resetForm();
//     } catch (error) {
//       console.error("Failed to update holiday:", error);
//       setError("Failed to update holiday.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const deleteHoliday = async (holidayId) => {
//     if (!window.confirm("Are you sure you want to delete this holiday?")) return;
//     setLoading(true);
//     try {
//       await axiosInstance.delete("api/holiday/", { data: { holiday_id: holidayId } });
//       await fetchHolidays();
//     } catch (error) {
//       console.error("Failed to delete holiday:", error);
//       setError("Failed to delete holiday.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchHubs = async () => {
//     try {
//       const response = await axiosInstance.get("api/employee_hub/");
//       setHubOptions(response.data.data || []);
//     } catch (error) {
//       console.error("Failed to fetch hubs", error);
//     }
//   };

//   // Initial data fetching
//   useEffect(() => {
//     fetchHolidays();
//     fetchHubs();
//     const fetchCountries = async () => {
//       try {
//         const response = await axiosInstance.get("https://tdtlworld.com/hrms-backend/api/countries/");
//         setCountries(response.data.data || []);
//       } catch (error) {
//         console.error("Failed to fetch countries:", error);
//       }
//     };
//     fetchCountries();
//   }, []);

//   // Fetch states for the ADD/EDIT FORM when its country changes
//   useEffect(() => {
//     if (selectedCountry) {
//       const fetchStates = async () => {
//         try {
//           const response = await axiosInstance.get(`https://tdtlworld.com/hrms-backend/api/states/?country_name=${selectedCountry}`);
//           setFormStates(response.data.data || []);
//         } catch (error) {
//           console.error("Failed to fetch states for form:", error);
//           setFormStates([]);
//         }
//       };
//       fetchStates();
//     } else {
//       setFormStates([]);
//     }
//   }, [selectedCountry]);

//     // Fetch states for the FILTER DROPDOWNS when its country changes
//   useEffect(() => {
//     if (filterCountry) {
//       const fetchStates = async () => {
//         try {
//           const response = await axiosInstance.get(`https://tdtlworld.com/hrms-backend/api/states/?country_name=${filterCountry}`);
//           setFilterStates(response.data.data || []);
//         } catch (error) {
//           console.error("Failed to fetch states for filter:", error);
//           setFilterStates([]);
//         }
//       };
//       fetchStates();
//     } else {
//       setFilterStates([]);
//     }
//   }, [filterCountry]);


//   // When editing, convert state name to state ID after states are fetched
//   useEffect(() => {
//     if (isEditing && formStates.length > 0 && typeof selectedState === 'string') {
//       const stateToSet = formStates.find(s => s.state_name === selectedState);
//       if (stateToSet) {
//         setSelectedState(stateToSet.state_id);
//       }
//     }
//   }, [formStates, isEditing, selectedState]);


//   // Helper functions for date formatting
//   const formatDateFromAPI = (apiDate) => {
//     if (!apiDate) return ""
//     const date = new Date(apiDate)
//     return new Intl.DateTimeFormat('en-GB').format(date); // DD/MM/YYYY
//   }

//   const formatDateForInput = (dateString_ddmmyyyy) => {
//     if (!dateString_ddmmyyyy) return ""
//     const parts = dateString_ddmmyyyy.split("/")
//     if (parts.length !== 3) return ""
//     return `${parts[2]}-${parts[1].padStart(2, "0")}-${parts[0].padStart(2, "0")}`
//   }

//   const parseDate = (dateString_ddmmyyyy) => {
//     if (!dateString_ddmmyyyy || typeof dateString_ddmmyyyy !== "string") {
//       return new Date(""); // Invalid Date
//     }
//     const parts = dateString_ddmmyyyy.split("/");
//     if (parts.length !== 3) return new Date("");
//     const [day, month, year] = parts;
//     return new Date(year, month - 1, day);
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     if (!eventTitle || !startDate || !endDate || !description || !selectedCountry || !selectedState) {
//       alert("Please fill in all required fields.")
//       return
//     }
//     if (new Date(startDate) > new Date(endDate)) {
//       alert("End date cannot be before start date.")
//       return
//     }

//     try {
//       if (isEditing) {
//         await updateHoliday()
//       } else {
//         await createHoliday()
//       }
//     } catch (err) {
//       // Error is already handled in the API functions
//     }
//   }

//   // Reset form fields
//   const resetForm = () => {
//     setEventTitle("");
//     setStartDate("");
//     setEndDate("");
//     setDescription("");
//     setSelectedCountry("");
//     setSelectedState("");
//     setSelectedHub("");
//     setStatus("Published");
//     setIsEditing(false);
//     setEditingHolidayId(null);
//     setError("");
//   };

//   // Handle Edit
//   const handleEdit = (id) => {
//     const holidayToEdit = holidays.find((h) => h.id === id)
//     if (holidayToEdit) {
//       window.scrollTo(0, 0)
//       setIsEditing(true)
//       setEditingHolidayId(id)
//       setEventTitle(holidayToEdit.event_name)
//       setStartDate(formatDateForInput(holidayToEdit.start_date))
//       setEndDate(formatDateForInput(holidayToEdit.endDate))
//       setDescription(holidayToEdit.description)
//       setStatus(holidayToEdit.status)
//       setSelectedHub(holidayToEdit.employee_hub_id || "")

//       setSelectedCountry(holidayToEdit.country)
//       setSelectedState(holidayToEdit.state)
//     }
//   }

//   // Handle Delete
//   const handleDelete = async (id) => {
//     await deleteHoliday(id)
//   }

//   // Handle sorting
//   const handleSort = (field) => {
//     const newDirection = (sortField === field && sortDirection === "asc") ? "desc" : "asc";
//     setSortField(field);
//     setSortDirection(newDirection);
//     setCurrentPage(1);
//   }

//   // Get sorted and filtered holidays
//   const getSortedAndFilteredHolidays = () => {
//     let filteredHolidays = [...holidays]

//     if (filterCountry) {
//       filteredHolidays = filteredHolidays.filter((holiday) => holiday.country === filterCountry)
//       if (filterState) {
//         filteredHolidays = filteredHolidays.filter((holiday) => holiday.state === filterState)
//       }
//     }

//     if (searchTerm) {
//       const lowercasedTerm = searchTerm.toLowerCase();
//       filteredHolidays = filteredHolidays.filter((holiday) =>
//         Object.values(holiday).some((value) => String(value).toLowerCase().includes(lowercasedTerm)),
//       )
//     }

//     if (sortField) {
//       filteredHolidays.sort((a, b) => {
//         let valA = a[sortField];
//         let valB = b[sortField];
//         let comparison = 0;

//         if (sortField === "startDate" || sortField === "endDate") {
//           comparison = parseDate(valA) - parseDate(valB);
//         } else {
//           comparison = String(valA).toLowerCase().localeCompare(String(valB).toLowerCase());
//         }
//         return sortDirection === "asc" ? comparison : -comparison;
//       });
//     }
//     return filteredHolidays;
//   }

//   const getPaginatedHolidays = () => {
//     const filteredHolidays = getSortedAndFilteredHolidays()
//     const startIndex = (currentPage - 1) * entriesPerPage
//     return filteredHolidays.slice(startIndex, startIndex + entriesPerPage)
//   }

//   const getTotalPages = () => Math.ceil(getSortedAndFilteredHolidays().length / entriesPerPage)

//   useEffect(() => { setCurrentPage(1) }, [entriesPerPage, searchTerm, filterCountry, filterState]);

//   const handlePreviousPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
//   const handleNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, getTotalPages()));

//   // Calendar utility functions
//   const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate()
//   const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay()

//   const generateCalendarDays = () => {
//     const year = currentMonth.getFullYear()
//     const month = currentMonth.getMonth()
//     const daysInMonth = getDaysInMonth(year, month)
//     const firstDayOfMonthIndex = getFirstDayOfMonth(year, month)
//     const calendarDays = [];

//     const prevMonthLastDate = new Date(year, month, 0);
//     const prevMonth = prevMonthLastDate.getMonth();
//     const prevYear = prevMonthLastDate.getFullYear();
//     for (let i = firstDayOfMonthIndex; i > 0; i--) {
//         calendarDays.push({
//             day: prevMonthLastDate.getDate() - i + 1,
//             month: prevMonth,
//             year: prevYear,
//             isCurrentMonth: false,
//         });
//     }
//     for (let i = 1; i <= daysInMonth; i++) {
//         calendarDays.push({ day: i, month, year, isCurrentMonth: true });
//     }
//     const nextMonth = (month + 1) % 12;
//     const nextYear = month === 11 ? year + 1 : year;
//     const remainingDays = 42 - calendarDays.length;
//     for (let i = 1; i <= remainingDays; i++) {
//         calendarDays.push({ day: i, month: nextMonth, year: nextYear, isCurrentMonth: false });
//     }
//     return calendarDays;
//   }

//   const getHolidaysForDay = (day, month, year) => {
//     const currentDateStr = new Intl.DateTimeFormat('en-GB').format(new Date(year, month, day));
//     const currentDateObj = parseDate(currentDateStr);

//     return holidays.filter((holiday) => {
//         const countryMatch = !filterCountry || holiday.country === filterCountry;
//         const stateMatch = !filterState || holiday.state === filterState;
//         if (!countryMatch || !stateMatch) return false;

//         const holidayStartDateObj = parseDate(holiday.start_date);
//         const holidayEndDateObj = parseDate(holiday.endDate);
//         return currentDateObj >= holidayStartDateObj && currentDateObj <= holidayEndDateObj;
//     });
//   }

//   const goToPreviousMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
//   const goToNextMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
//   const goToToday = () => setCurrentMonth(new Date())
//   const getMonthName = (date) => date.toLocaleString("default", { month: "long" })

//   const renderSortIcon = (field) => {
//     if (sortField !== field) return <FontAwesomeIcon icon={faSort} />
//     return sortDirection === "asc" ? <FontAwesomeIcon icon={faSortUp} /> : <FontAwesomeIcon icon={faSortDown} />
//   }

//   const handleFilterCountryChange = (e) => {
//     setFilterCountry(e.target.value)
//     setFilterState("")
//     setCurrentPage(1)
//   }

//   const handleFilterStateChange = (e) => {
//     setFilterState(e.target.value)
//     setCurrentPage(1)
//   }

//   // Render list view
//   const renderListView = () => {
//     const paginatedHolidays = getPaginatedHolidays();
//     const totalFilteredHolidays = getSortedAndFilteredHolidays().length;
//     const startEntry = totalFilteredHolidays === 0 ? 0 : (currentPage - 1) * entriesPerPage + 1;
//     const endEntry = Math.min(startEntry + entriesPerPage - 1, totalFilteredHolidays);

//     return (
//       <div style={styles.listView}>
//         <div style={styles.listControls}>
//           <div style={styles.entriesSearchRow}>
//             <div style={styles.entriesSelector}>
//               <span>Show</span>
//               <select
//                 style={styles.filterSelect}
//                 value={entriesPerPage}
//                 onChange={(e) => setEntriesPerPage(Number(e.target.value))}
//               >
//                 <option value={10}>10</option>
//                 <option value={25}>25</option>
//                 <option value={50}>50</option>
//                 <option value={100}>100</option>
//               </select>
//               <span>entries</span>
//             </div>
//             <div style={styles.searchBox}>
//               <span>Search:</span>
//               <input
//                 type="text"
//                 style={styles.searchInput}
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 placeholder="Search..."
//               />
//             </div>
//           </div>
//           <div style={styles.filterRow}>
//             <div style={styles.filterGroup}>
//               <label htmlFor="filterCountry" style={styles.filterLabel}>Country:</label>
//               <select
//                 id="filterCountry"
//                 style={styles.filterSelect}
//                 value={filterCountry}
//                 onChange={handleFilterCountryChange}
//               >
//                 <option value="">All Countries</option>
//                 {countries.map((c) => (
//                   <option key={c.country_id} value={c.country_name}>{c.country_name}</option>
//                 ))}
//               </select>
//             </div>
//             <div style={styles.filterGroup}>
//               <label htmlFor="filterState" style={styles.filterLabel}>State:</label>
//               <select
//                 id="filterState"
//                 style={styles.filterSelect}
//                 value={filterState}
//                 onChange={handleFilterStateChange}
//                 disabled={!filterCountry}
//               >
//                 <option value="">All States</option>
//                 {filterStates.map((s) => (
//                   <option key={s.state_id} value={s.state_name}>{s.state_name}</option>
//                 ))}
//               </select>
//             </div>
//           </div>
//         </div>

//         {error && <div style={styles.errorMessage}>{error}</div>}
//         {loading && !isEditing && <div style={styles.loadingMessage}>Loading...</div>}

//         <div style={{ overflowX: 'auto' }}>
//             <table style={styles.holidaysTable}>
//             <thead>
//                 <tr>
//                 <th style={styles.tableHeader} onClick={() => handleSort("event_name")}>EVENT TITLE {renderSortIcon("event_name")}</th>
//                 <th style={styles.tableHeader} onClick={() => handleSort("startDate")}>START DATE {renderSortIcon("startDate")}</th>
//                 <th style={styles.tableHeader} onClick={() => handleSort("endDate")}>END DATE {renderSortIcon("endDate")}</th>
//                 <th style={styles.tableHeader} onClick={() => handleSort("country")}>COUNTRY {renderSortIcon("country")}</th>
//                 <th style={styles.tableHeader} onClick={() => handleSort("state")}>STATE {renderSortIcon("state")}</th>
//                 <th style={styles.tableHeader} onClick={() => handleSort("status")}>STATUS {renderSortIcon("status")}</th>
//                 <th style={styles.tableHeader}>ACTIONS</th>
//                 </tr>
//             </thead>
//             <tbody>
//                 {paginatedHolidays.length > 0 ? (
//                 paginatedHolidays.map((holiday) => (
//                     <tr key={holiday.id}>
//                     <td style={styles.tableCell}>{holiday.event_name}</td>
//                     <td style={styles.tableCell}>{holiday.start_date}</td>
//                     <td style={styles.tableCell}>{holiday.endDate}</td>
//                     <td style={styles.tableCell}>{holiday.country}</td>
//                     <td style={styles.tableCell}>{holiday.state}</td>
//                     <td style={styles.tableCell}>
//                         <span style={{ ...styles.statusBadge, ...(String(holiday.status).toLowerCase() === "published" ? styles.statusPublished : styles.statusRestricted) }}>{holiday.status}</span>
//                     </td>
//                     <td style={styles.tableCell}>
//                         <button onClick={() => handleEdit(holiday.id)} style={{...styles.actionButton, ...styles.editButton}} disabled={loading}><FontAwesomeIcon icon={faEdit} /> Edit</button>
//                         <button onClick={() => handleDelete(holiday.id)} style={{...styles.actionButton, ...styles.deleteButton}} disabled={loading}><FontAwesomeIcon icon={faTrash} /> Delete</button>
//                     </td>
//                     </tr>
//                 ))
//                 ) : (
//                 <tr><td colSpan="7" style={{ ...styles.tableCell, textAlign: 'center' }}>No holidays found.</td></tr>
//                 )}
//             </tbody>
//             </table>
//         </div>

//         <div style={styles.pagination}>
//           <div>Showing {startEntry} to {endEntry} of {totalFilteredHolidays} records</div>
//           <div style={styles.paginationControls}>
//             <button onClick={handlePreviousPage} disabled={currentPage === 1} style={{ ...styles.paginationButton, ...(currentPage === 1 ? styles.paginationButtonDisabled : {}) }}>Previous</button>
//             <button style={{ ...styles.paginationButton, ...styles.paginationButtonActive }}>{currentPage}</button>
//             <button onClick={handleNextPage} disabled={currentPage >= getTotalPages()} style={{ ...styles.paginationButton, ...(currentPage >= getTotalPages() ? styles.paginationButtonDisabled : {}) }}>Next</button>
//           </div>
//         </div>
//       </div>
//     )
//   }

//   // Render calendar view
//   const renderCalendarView = () => {
//     const calendarDays = generateCalendarDays();
//     const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

//     return (
//       <div style={styles.calendarView}>
//         <div style={styles.calendarHeader}>
//           <div style={styles.calendarNavigation}>
//             <button style={styles.navButton} onClick={goToPreviousMonth}><FontAwesomeIcon icon={faChevronLeft} /></button>
//             <button style={styles.todayButton} onClick={goToToday}>Today</button>
//             <button style={styles.navButton} onClick={goToNextMonth}><FontAwesomeIcon icon={faChevronRight} /></button>
//           </div>
//           <div style={styles.calendarTitle}>{getMonthName(currentMonth).toUpperCase()} {currentMonth.getFullYear()}</div>
//           <div style={styles.calendarFilters}>
//              <div style={styles.filterGroup}>
//                 <label htmlFor="calendarFilterCountry" style={styles.filterLabel}>Country:</label>
//                 <select id="calendarFilterCountry" style={styles.filterSelect} value={filterCountry} onChange={handleFilterCountryChange}>
//                     <option value="">All Countries</option>
//                     {countries.map((c) => (<option key={c.country_id} value={c.country_name}>{c.country_name}</option>))}
//                 </select>
//              </div>
//              <div style={styles.filterGroup}>
//                 <label htmlFor="calendarFilterState" style={styles.filterLabel}>State:</label>
//                 <select id="calendarFilterState" style={styles.filterSelect} value={filterState} onChange={handleFilterStateChange} disabled={!filterCountry}>
//                     <option value="">All States</option>
//                     {filterStates.map((s) => (<option key={s.state_id} value={s.state_name}>{s.state_name}</option>))}
//                 </select>
//              </div>
//           </div>
//         </div>

//         <div style={styles.calendarGrid}>
//             <div style={styles.calendarDaysHeader}>
//             {daysOfWeek.map((day) => (<div key={day} style={styles.calendarHeaderCell}>{day}</div>))}
//             </div>
//             <div style={styles.calendarDays}>
//             {calendarDays.map((dayInfo, index) => {
//                 const dayHolidays = getHolidaysForDay(dayInfo.day, dayInfo.month, dayInfo.year);
//                 const isToday = new Date().toDateString() === new Date(dayInfo.year, dayInfo.month, dayInfo.day).toDateString();
//                 return (
//                 <div key={index} style={{ ...styles.calendarDay, ...(!dayInfo.isCurrentMonth ? styles.calendarDayOtherMonth : {}), ...(isToday ? styles.calendarDayToday : {}) }}>
//                     <div style={styles.dayNumber}>{dayInfo.day}</div>
//                     <div style={styles.dayHolidays}>
//                     {dayHolidays.map((holiday) => (
//                         <div key={holiday.id} style={{ ...styles.holidayEvent, ...(holiday.status.toLowerCase() === "published" ? styles.holidayEventPublished : styles.holidayEventRestricted) }} title={`${holiday.event_name} (${holiday.country} - ${holiday.state})`}>
//                         {holiday.event_name}
//                         </div>
//                     ))}
//                     </div>
//                 </div>
//                 )
//             })}
//             </div>
//         </div>
//       </div>
//     )
//   }

//   // Render holidays form and list view
//   const renderHolidaysView = () => {
//     return (
//       <div style={styles.content}>
//         <div style={styles.formSection}>
//           <h2>{isEditing ? "Edit Holiday" : "Add New Holiday"}</h2>
//           {error && <div style={styles.errorMessage}>{error}</div>}
//           <form onSubmit={handleSubmit}>
//             <div style={styles.formGroup}>
//               <label htmlFor="eventTitle" style={styles.label}>Event Title <span style={styles.required}>*</span></label>
//               <input type="text" id="eventTitle" style={styles.input} value={eventTitle} onChange={(e) => setEventTitle(e.target.value)} required disabled={loading}/>
//             </div>
//             <div style={styles.formRow}>
//               <div style={{...styles.formGroup, ...styles.formRowGroup}}>
//                 <label htmlFor="startDate" style={styles.label}>Start Date <span style={styles.required}>*</span></label>
//                 <input type="date" id="startDate" style={styles.input} value={startDate} onChange={(e) => setStartDate(e.target.value)} required disabled={loading}/>
//               </div>
//               <div style={{...styles.formGroup, ...styles.formRowGroup}}>
//                 <label htmlFor="endDate" style={styles.label}>End Date <span style={styles.required}>*</span></label>
//                 <input type="date" id="endDate" style={styles.input} value={endDate} onChange={(e) => setEndDate(e.target.value)} required disabled={loading}/>
//               </div>
//             </div>
//              <div style={styles.formRow}>
//                 <div style={{...styles.formGroup, ...styles.formRowGroup}}>
//                     <label htmlFor="selectedCountry" style={styles.label}>Country <span style={styles.required}>*</span></label>
//                     <select id="selectedCountry" style={styles.input} value={selectedCountry} onChange={(e) => { setSelectedCountry(e.target.value); setSelectedState(""); }} required disabled={loading}>
//                         <option value="">Select Country</option>
//                         {countries.map((c) => (<option key={c.country_id} value={c.country_name}>{c.country_name}</option>))}
//                     </select>
//                 </div>
//                 <div style={{...styles.formGroup, ...styles.formRowGroup}}>
//                     <label htmlFor="selectedState" style={styles.label}>State <span style={styles.required}>*</span></label>
//                     <select id="selectedState" style={styles.input} value={selectedState} onChange={(e) => setSelectedState(Number(e.target.value))} disabled={loading || !selectedCountry || formStates.length === 0} required>
//                         <option value="">Select State</option>
//                         {formStates.map((s) => (<option key={s.state_id} value={s.state_id}>{s.state_name}</option>))}
//                     </select>
//                 </div>
//             </div>
//             <div style={styles.formGroup}>
//               <label htmlFor="selectedHub" style={styles.label}>Employee Hub <span style={styles.required}>*</span></label>
//               <select id="selectedHub" style={styles.input} value={selectedHub} onChange={(e) => setSelectedHub(e.target.value)} required disabled={loading}>
//                 <option value="">Select Hub</option>
//                 {hubOptions.map((hub) => (<option key={hub.employee_hub_id} value={hub.employee_hub_id}>{hub.employee_hub_name}</option>))}
//               </select>
//             </div>
//             <div style={styles.formGroup}>
//               <label htmlFor="description" style={styles.label}>Description <span style={styles.required}>*</span></label>
//               <textarea id="description" style={styles.textarea} value={description} onChange={(e) => setDescription(e.target.value)} required disabled={loading}/>
//             </div>
//             <div style={styles.formGroup}>
//               <label htmlFor="status" style={styles.label}>Status</label>
//               <select id="status" style={styles.input} value={status} onChange={(e) => setStatus(e.target.value)} disabled={loading}>
//                 <option value="Published">Published</option>
//                 <option value="Restricted">Restricted</option>
//               </select>
//             </div>
//             <div style={styles.formActions}>
//               <button type="submit" style={{ ...styles.saveButton, ...(loading ? styles.saveButtonDisabled : {}) }} disabled={loading}>{loading ? "Processing..." : isEditing ? "Update" : "Save"}</button>
//               {isEditing && (<button type="button" onClick={resetForm} style={styles.cancelButton} disabled={loading}>Cancel</button>)}
//             </div>
//           </form>
//         </div>

//         <div style={styles.viewSection}>
//           <h2>List All Holidays</h2>
//           {renderListView()}
//         </div>
//       </div>
//     )
//   }

//   const renderCalendarViewWithSidebar = () => {
//     return (
//       <div style={{ ...styles.content, ...styles.calendarContent }}>
//         <div style={styles.eventsSidebar}>
//           <h2>Events Legend</h2>
//           <div style={styles.eventTypes}>
//             <div style={styles.eventType}><span style={{ ...styles.eventTypeSpan, ...styles.eventTypeRestricted }}></span>Restricted</div>
//             <div style={styles.eventType}><span style={{ ...styles.eventTypeSpan, ...styles.eventTypePublished }}></span>Published</div>
//           </div>
//         </div>
//         <div style={styles.calendarContainer}>{renderCalendarView()}</div>
//       </div>
//     )
//   }

//   return (
//     <div style={styles.holidaysContainer}>
//       <div style={styles.header}>
//         <div style={{ ...styles.titleSection, ...(viewMode === "holidays" ? styles.titleSectionActive : {}) }} onClick={() => setViewMode("holidays")}>
//           <div style={styles.titleText}>
//             <h1 style={styles.titleH1}>Holidays</h1>
//             <p style={styles.titleP}>Manage Holidays</p>
//           </div>
//         </div>
//         <div style={{ ...styles.viewToggle, ...(viewMode === "calendar" ? styles.viewToggleActive : {}) }} onClick={() => setViewMode("calendar")}>
//           <div style={styles.titleText}>
//             <h2 style={styles.titleH1}>Calendar View</h2>
//             <p style={styles.titleP}>Holidays Calendar</p>
//           </div>
//         </div>
//       </div>
//       {viewMode === "holidays" ? renderHolidaysView() : renderCalendarViewWithSidebar()}
//     </div>
//   )
// } // 






// import { useState, useEffect } from "react";
// import axiosInstance from "../../utils/axiosInstance";
// import {
//   Box,
//   Button,
//   Card,
//   CardContent,
//   Chip,
//   CircularProgress,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   FormControl,
//   Grid,
//   IconButton,
//   InputLabel,
//   MenuItem,
//   Pagination,
//   Paper,
//   Select,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Tabs,
//   Tab,
//   TextField,
//   Tooltip,
//   Typography,
// } from "@mui/material";
// import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";

// export default function Holidays() {
//   const [activeTab, setActiveTab] = useState(0);
//   const [formData, setFormData] = useState({
//     eventTitle: "", startDate: "", endDate: "", description: "", status: "Published", country: "", stateId: "", hubId: "",
//   });
//   const [countries, setCountries] = useState([]);
//   const [formStates, setFormStates] = useState([]);
//   const [hubOptions, setHubOptions] = useState([]);
//   const [holidays, setHolidays] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [entriesPerPage, setEntriesPerPage] = useState(10);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [isEditing, setIsEditing] = useState(false);
//   const [editingHolidayId, setEditingHolidayId] = useState(null);
//   const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
//   const [holidayToDeleteId, setHolidayToDeleteId] = useState(null);
//   // State to handle the async state selection on edit
//   const [stateNameToSelect, setStateNameToSelect] = useState('');

//   const fetchHolidays = async () => {
//     setLoading(true);
//     try {
//       const response = await axiosInstance.get("/api/holiday/");
//       const holidaysFromAPI = response.data.data || [];
//       // Correctly map and format the data on fetch
//       const mappedHolidays = holidaysFromAPI.map((holiday) => ({
//         ...holiday,
//         start_date: holiday.start_date ? holiday.start_date.split("T")[0] : "",
//         end_date: holiday.end_date ? holiday.end_date.split("T")[0] : "",
//       }));
//       setHolidays(mappedHolidays);
//     } catch (err) {
//       console.error("Error fetching holidays:", err);
//       setError("Failed to load holidays");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchDropdownData = async () => {
//     try {
//       const [countriesRes, hubsRes] = await Promise.all([
//         axiosInstance.get("https://tdtlworld.com/hrms-backend/api/countries/"),
//         axiosInstance.get("api/employee_hub/"),
//       ]);
//       setCountries(countriesRes.data.data || []);
//       setHubOptions(hubsRes.data.data || []);
//     } catch (err) {
//       console.error("Failed to fetch dropdown data:", err);
//     }
//   };

//   useEffect(() => {
//     fetchHolidays();
//     fetchDropdownData();
//   }, []);

//   useEffect(() => {
//     if (formData.country) {
//       const fetchStatesForForm = async () => {
//         try {
//           const response = await axiosInstance.get(`https://tdtlworld.com/hrms-backend/api/states/?country_name=${formData.country}`);
//           setFormStates(response.data.data || []);
//         } catch (err) {
//           console.error("Failed to fetch states for form:", err);
//           setFormStates([]);
//         }  
//       };
//       fetchStatesForForm();
//     } else {
//       setFormStates([]);
//     }
//   }, [formData.country]);

//   // This effect handles selecting the state ID after the states have been fetched for the selected country
//   useEffect(() => {
//     if (stateNameToSelect && formStates.length > 0) {
//       const stateToSet = formStates.find(s => s.state_name === stateNameToSelect);
//       if (stateToSet) {
//         setFormData(prev => ({ ...prev, stateId: stateToSet.state_id }));
//       }
//       setStateNameToSelect(''); // Reset after use
//     }
//   }, [formStates, stateNameToSelect]);


//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//     if (name === 'country') {
//       setFormData((prev) => ({ ...prev, stateId: '' }));
//     }
//   };

//   const resetForm = () => {
//     setFormData({
//       eventTitle: "", startDate: "", endDate: "", description: "", status: "Published", country: "", stateId: "", hubId: "",
//     });
//     setIsEditing(false);
//     setEditingHolidayId(null);
//   };

//   const handleEdit = (holiday) => {
//     window.scrollTo(0, 0);
//     setIsEditing(true);
//     setEditingHolidayId(holiday.holiday_id);

//     // Set form data using the correct keys from the payload
//     setFormData({
//       eventTitle: holiday.event_name,
//       startDate: holiday.start_date,
//       endDate: holiday.end_date,
//       description: holiday.description,
//       status: holiday.status === 1 ? "Published" : "Restricted",
//       country: holiday.country_name,
//       stateId: '', // Clear stateId initially
//       hubId: holiday.employee_hub,
//     });

//     // Set the state name to be selected once states are loaded
//     setStateNameToSelect(holiday.state);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     const payload = {
//       state: formData.stateId,
//       employee_hub: formData.hubId,
//       country: formData.country,
//       event_name: formData.eventTitle,
//       start_date: formData.startDate,
//       end_date: formData.endDate,
//       description: formData.description,
//       is_publish: formData.status === "Published" ? 1 : 0,
//     };

//     try {
//       if (isEditing) {
//         await axiosInstance.put("api/holiday/", { ...payload, holiday_id: editingHolidayId });
//       } else {
//         await axiosInstance.post("api/holiday/", payload);
//       }
//       await fetchHolidays();
//       resetForm();
//     } catch (err) {
//       console.error("Failed to save holiday:", err);
//       setError("Failed to save holiday.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDeleteRequest = (id) => {
//     setHolidayToDeleteId(id);
//     setDeleteDialogOpen(true);
//   };

//   const handleDeleteConfirm = async () => {
//     if (!holidayToDeleteId) return;
//     setLoading(true);
//     try {
//       await axiosInstance.delete("api/holiday/", { data: { holiday_id: holidayToDeleteId } });
//       await fetchHolidays();
//       setDeleteDialogOpen(false);
//       setHolidayToDeleteId(null);
//     } catch (err) {
//       console.error("Failed to delete holiday:", err);
//       setError("Failed to delete holiday.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const filteredHolidays = holidays.filter(h =>
//     Object.values(h).some(val =>
//       String(val).toLowerCase().includes(searchTerm.toLowerCase())
//     )
//   );

//   const paginatedHolidays = filteredHolidays.slice(
//     (currentPage - 1) * entriesPerPage,
//     currentPage * entriesPerPage
//   );

//   const totalPages = Math.ceil(filteredHolidays.length / entriesPerPage) || 1;

//   useEffect(() => {
//     setCurrentPage(1);
//   }, [entriesPerPage, searchTerm]);

//   const renderHolidayForm = () => (
//     <Grid item xs={12} md={4}>
//       <Paper variant="outlined" sx={{ p: { xs: 1.5, sm: 3 }, backgroundColor: '#fdfdfd' }}>
//         <Typography variant="h6" gutterBottom>{isEditing ? "Edit Holiday" : "Add New Holiday"}</Typography>
//         <form onSubmit={handleSubmit}>
//           <Grid container spacing={2}>
//             <Grid item xs={12}><TextField name="eventTitle" label="Event Title" value={formData.eventTitle} onChange={handleInputChange} fullWidth required size="small" disabled={loading} /></Grid>
//             <Grid item xs={12} sm={6}><TextField name="startDate" label="Start Date" type="date" value={formData.startDate} onChange={handleInputChange} fullWidth required size="small" InputLabelProps={{ shrink: true }} disabled={loading} /></Grid>
//             <Grid item xs={12} sm={6}><TextField name="endDate" label="End Date" type="date" value={formData.endDate} onChange={handleInputChange} fullWidth required size="small" InputLabelProps={{ shrink: true }} disabled={loading} /></Grid>
//             <Grid item xs={12} sm={6}>
//               <FormControl fullWidth size="small" required disabled={loading}>
//                 <InputLabel>Country</InputLabel>
//                 <Select name="country" label="Country" value={formData.country} onChange={handleInputChange}><MenuItem value=""><em>Select Country</em></MenuItem>{countries.map(c => <MenuItem key={c.country_id} value={c.country_name}>{c.country_name}</MenuItem>)}</Select>
//               </FormControl>
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <FormControl fullWidth size="small" required disabled={loading || !formData.country}>
//                 <InputLabel>State</InputLabel>
//                 <Select name="stateId" label="State" value={formData.stateId} onChange={handleInputChange}><MenuItem value=""><em>Select State</em></MenuItem>{formStates.map(s => <MenuItem key={s.state_id} value={s.state_id}>{s.state_name}</MenuItem>)}</Select>
//               </FormControl>
//             </Grid>
//             <Grid item xs={12}>
//               <FormControl fullWidth size="small" required disabled={loading}>
//                 <InputLabel>Employee Hub</InputLabel>
//                 <Select name="hubId" label="Employee Hub" value={formData.hubId} onChange={handleInputChange}><MenuItem value=""><em>Select Hub</em></MenuItem>{hubOptions.map(h => <MenuItem key={h.employee_hub_id} value={h.employee_hub_id}>{h.employee_hub_name}</MenuItem>)}</Select>
//               </FormControl>
//             </Grid>
//             <Grid item xs={12}><TextField name="description" label="Description" value={formData.description} onChange={handleInputChange} fullWidth required multiline rows={3} size="small" disabled={loading} /></Grid>
//             <Grid item xs={12}>
//               <FormControl fullWidth size="small" disabled={loading}>
//                 <InputLabel>Status</InputLabel>
//                 <Select name="status" label="Status" value={formData.status} onChange={handleInputChange}><MenuItem value="Published">Published</MenuItem><MenuItem value="Restricted">Restricted</MenuItem></Select>
//               </FormControl>
//             </Grid>
//             <Grid item xs={12} container justifyContent="flex-end" spacing={1}>
//               {isEditing && <Grid item><Button variant="outlined" color="secondary" onClick={resetForm} disabled={loading}>Cancel</Button></Grid>}
//               <Grid item><Button type="submit" variant="contained" sx={{ backgroundColor: '#7C3AED', '&:hover': { backgroundColor: '#6D28D9' } }} disabled={loading}>{loading ? <CircularProgress size={24} /> : (isEditing ? "Update" : "Save")}</Button></Grid>
//             </Grid>
//           </Grid>
//         </form>
//       </Paper>
//     </Grid>
//   );

//   const renderHolidayList = () => (
//     <Grid item xs={12} md={8}>
//       <Paper variant="outlined">
//         <Box sx={{ p: 2, display: "flex", justifyContent: "space-between", alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
//           <FormControl size="small" variant="outlined">
//             <InputLabel>Show</InputLabel>
//             <Select value={entriesPerPage} onChange={(e) => setEntriesPerPage(Number(e.target.value))} label="Show" sx={{ width: 80 }}>{[10, 25, 50, 100].map(val => <MenuItem key={val} value={val}>{val}</MenuItem>)}</Select>
//           </FormControl>
//           <TextField size="small" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} sx={{ width: { xs: '100%', sm: 300 } }} />
//         </Box>
//         <TableContainer>
//           <Table size="small">
//             <TableHead sx={{ backgroundColor: '#f9fafb' }}>
//               <TableRow>
//                 {['SR. NO.', 'EVENT TITLE', 'START DATE', 'END DATE', 'COUNTRY', 'STATE', 'STATUS', 'ACTIONS'].map(h => <TableCell key={h} sx={{ fontWeight: 600 }}>{h}</TableCell>)}
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {loading ? <TableRow><TableCell colSpan={8} align="center" sx={{ py: 5 }}><CircularProgress /></TableCell></TableRow> :
//                 paginatedHolidays.length > 0 ? paginatedHolidays.map((h, index) => (
//                   <TableRow key={h.holiday_id} hover>
//                     <TableCell>{(currentPage - 1) * entriesPerPage + index + 1}</TableCell>
//                     <TableCell>{h.event_name}</TableCell>
//                     <TableCell>{h.start_date}</TableCell>
//                     <TableCell>{h.end_date}</TableCell>
//                     <TableCell>{h.country_name}</TableCell>
//                     <TableCell>{h.state}</TableCell>
//                     <TableCell><Chip label={h.status === 1 ? "Published" : "Restricted"} size="small" sx={{ backgroundColor: h.status === 1 ? '#7C3AED' : (theme) => theme.palette.error.main, color: 'white' }} /></TableCell>
//                     <TableCell>
//                       <Tooltip title="Edit"><IconButton size="small" onClick={() => handleEdit(h)}><EditIcon fontSize="small" sx={{ color: '#7C3AED' }} /></IconButton></Tooltip>
//                       <Tooltip title="Delete"><IconButton size="small" color="error" onClick={() => handleDeleteRequest(h.holiday_id)}><DeleteIcon fontSize="small" /></IconButton></Tooltip>
//                     </TableCell>
//                   </TableRow>
//                 )) : <TableRow><TableCell colSpan={8} align="center" sx={{ py: 5 }}>No holidays found.</TableCell></TableRow>}
//             </TableBody>
//           </Table>
//         </TableContainer>
//         <Box display="flex" justifyContent="space-between" alignItems="center" p={2} flexWrap="wrap" gap={2}>
//           <Typography variant="body2" color="text.secondary">
//             Showing {filteredHolidays.length === 0 ? 0 : (currentPage - 1) * entriesPerPage + 1} to {Math.min(currentPage * entriesPerPage, filteredHolidays.length)} of {filteredHolidays.length} entries
//           </Typography>
//           {totalPages > 1 && <Pagination count={totalPages} page={currentPage} onChange={(e, value) => setCurrentPage(value)} color="primary" sx={{ '& .Mui-selected': { backgroundColor: '#7C3AED', color: 'white' } }} size="small" />}
//         </Box>
//       </Paper>
//     </Grid>
//   );

//   return (
//     <Card elevation={3} sx={{ borderRadius: 2 }}>
//       <CardContent sx={{ p: { xs: 1.5, sm: 3 } }}>
//         <Tabs value={activeTab} onChange={(e, val) => setActiveTab(val)} indicatorColor="secondary" textColor="inherit" sx={{ mb: 3, borderBottom: 1, borderColor: 'divider' }}>
//           <Tab label="Manage Holidays" sx={{ fontWeight: 'bold', '&.Mui-selected': { color: '#7C3AED' } }} />
//           <Tab label="Calendar View" sx={{ fontWeight: 'bold', '&.Mui-selected': { color: '#7C3AED' } }} />
//         </Tabs>

//         {activeTab === 0 && (
//           <Grid container spacing={3}>
//             {renderHolidayForm()}
//             {renderHolidayList()}
//           </Grid>
//         )}

//         {activeTab === 1 && (
//           <Typography>Calendar View will be implemented here.</Typography>
//         )}

//         <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
//           <DialogTitle>Confirm Deletion</DialogTitle>
//           <DialogContent><Typography>Are you sure you want to delete this holiday?</Typography></DialogContent>
//           <DialogActions>
//             <Button onClick={() => setDeleteDialogOpen(false)} disabled={loading}>Cancel</Button>
//             <Button onClick={handleDeleteConfirm} color="error" variant="contained" disabled={loading}>{loading ? <CircularProgress size={24} /> : "Delete"}</Button>
//           </DialogActions>
//         </Dialog>
//       </CardContent>
//     </Card>
//   );
// }   ///


// import { useState, useEffect } from "react"
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
// import {
//   faSort,
//   faSortUp,
//   faSortDown,
//   faChevronLeft,
//   faChevronRight,
//   faEdit,
//   faTrash,
// } from "@fortawesome/free-solid-svg-icons"
// import axiosInstance from "../../utils/axiosInstance";

// export default function Holidays() {
//   // State for form inputs
//   const [eventTitle, setEventTitle] = useState("")
//   const [startDate, setStartDate] = useState("")
//   const [endDate, setEndDate] = useState("")
//   const [description, setDescription] = useState("")
//   const [status, setStatus] = useState("Published")
//   const [selectedCountry, setSelectedCountry] = useState("") // Stores country NAME for the form (used for state fetching)
//   const [selectedCountryId, setSelectedCountryId] = useState(""); // Stores country ID for the form (used for submission)
//   const [selectedState, setSelectedState] = useState("") // Stores state ID for the form
//   const [selectedHub, setSelectedHub] = useState("");     // Stores hub ID for the form

//   // State for API-driven dropdown options
//   const [countries, setCountries] = useState([]);
//   const [formStates, setFormStates] = useState([]);      // States for the form dropdown
//   const [hubOptions, setHubOptions] = useState([]);      // Hubs for the form dropdown (dynamic)
//   const [filterStates, setFilterStates] = useState([]);  // States for the filter dropdowns
//   const [filterHubOptions, setFilterHubOptions] = useState([]); // Hubs for the filter dropdown (dynamic)


//   // State for holidays list
//   const [holidays, setHolidays] = useState([])
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState("")

//   // State for pagination
//   const [currentPage, setCurrentPage] = useState(1)
//   const [entriesPerPage, setEntriesPerPage] = useState(5)
//   const [searchTerm, setSearchTerm] = useState("")

//   // State for sorting
//   const [sortField, setSortField] = useState("")
//   const [sortDirection, setSortDirection] = useState("asc")

//   // State for view mode
//   const [viewMode, setViewMode] = useState("holidays")
//   const [isFormVisible, setIsFormVisible] = useState(false); // Controls form visibility

//   // State for calendar
//   const [currentMonth, setCurrentMonth] = useState(new Date())
//   const [calendarView, setCalendarView] = useState("month")

//   // State for filtering
//   const [filterCountry, setFilterCountry] = useState("") // Stores country name for filtering
//   const [filterState, setFilterState] = useState("")     // Stores state NAME for filtering
//   const [filterHub, setFilterHub] = useState("");         // Stores hub ID for filtering

//   // State for editing
//   const [isEditing, setIsEditing] = useState(false)
//   const [editingHolidayId, setEditingHolidayId] = useState(null)
//   const [initialHubNameToSelect, setInitialHubNameToSelect] = useState(null); // Helper for edit auto-fill


//   // Styles object (UPDATED with new colors)
//   const vibrantPurple = '#7F56D9';
//   const styles = {
//     holidaysContainer: {
//       maxWidth: "1200px",
//       margin: "0 auto",
//       padding: "20px",
//       fontFamily: "Arial, sans-serif",
//     },
//     header: {
//       display: "flex",
//       justifyContent: "space-between",
//       alignItems: "center",
//       marginBottom: "30px",
//       borderBottom: "2px solid #e0e0e0",
//       paddingBottom: "20px",
//     },
//     titleSection: {
//       cursor: "pointer",
//       padding: "10px 20px",
//       borderRadius: "8px",
//       transition: "all 0.3s ease",
//     },
//     titleSectionActive: {
//       backgroundColor: vibrantPurple,
//       color: "white",
//     },
//     viewToggle: {
//       cursor: "pointer",
//       padding: "10px 20px",
//       borderRadius: "8px",
//       transition: "all 0.3s ease",
//     },
//     viewToggleActive: {
//       backgroundColor: vibrantPurple,
//       color: "white",
//     },
//     titleText: {
//       margin: 0,
//     },
//     titleH1: {
//       margin: 0,
//       fontSize: "24px",
//     },
//     titleP: {
//       margin: "5px 0 0 0",
//       fontSize: "14px",
//       opacity: 0.8,
//     },
//     content: {
//       display: "flex",
//       gap: "30px",
//     },
//     contentColumn: {
//       flexDirection: "column",
//     },
//     formSection: {
//       background: "#f8f9fa",
//       padding: "25px",
//       borderRadius: "8px",
//       boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
//       marginBottom: '30px', // Add some space when it appears
//     },
//     viewSection: {
//       flex: 1, // Take full width when form is hidden
//     },
//     viewSectionHeader: {
//       display: 'flex',
//       justifyContent: 'space-between',
//       alignItems: 'center',
//       marginBottom: '20px',
//     },
//     addNewButton: {
//       padding: "10px 20px",
//       border: "none",
//       borderRadius: "4px",
//       cursor: "pointer",
//       fontSize: "14px",
//       fontWeight: "bold",
//       backgroundColor: vibrantPurple,
//       color: "white",
//       transition: "background-color 0.3s ease",
//     },
//     formGroup: {
//       marginBottom: "20px",
//     },
//     formRow: {
//       display: "flex",
//       gap: "15px",
//     },
//     formRowGroup: {
//       flex: 1,
//     },
//     label: {
//       display: "block",
//       marginBottom: "5px",
//       fontWeight: "bold",
//       color: "#333",
//     },
//     required: {
//       color: "red",
//     },
//     input: {
//       width: "100%",
//       padding: "10px",
//       border: "1px solid #ddd",
//       borderRadius: "4px",
//       fontSize: "14px",
//       boxSizing: "border-box",
//     },
//     inputFocus: {
//       outline: "none",
//       borderColor: vibrantPurple,
//       boxShadow: `0 0 0 2px rgba(127, 86, 217, 0.25)`,
//     },
//     textarea: {
//       width: "100%",
//       padding: "10px",
//       border: "1px solid #ddd",
//       borderRadius: "4px",
//       fontSize: "14px",
//       resize: "vertical",
//       minHeight: "80px",
//       boxSizing: "border-box",
//     },
//     formActions: {
//       display: "flex",
//       gap: "10px",
//       marginTop: "25px",
//     },
//     saveButton: {
//       padding: "12px 24px",
//       border: "none",
//       borderRadius: "4px",
//       cursor: "pointer",
//       fontSize: "14px",
//       fontWeight: "bold",
//       backgroundColor: vibrantPurple,
//       color: "white",
//       transition: "background-color 0.3s ease",
//     },
//     saveButtonDisabled: {
//       backgroundColor: "#6c757d",
//       cursor: "not-allowed",
//     },
//     cancelButton: {
//       padding: "12px 24px",
//       border: "none",
//       borderRadius: "4px",
//       cursor: "pointer",
//       fontSize: "14px",
//       fontWeight: "bold",
//       backgroundColor: "#6c757d",
//       color: "white",
//     },
//     listView: {
//       background: "white",
//       borderRadius: "8px",
//       boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
//       overflow: "hidden",
//     },
//     listControls: {
//       padding: "20px",
//       background: "#f8f9fa",
//       borderBottom: "1px solid #e0e0e0",
//     },
//     entriesSearchRow: {
//       display: "flex",
//       justifyContent: "space-between",
//       alignItems: "center",
//       marginBottom: "15px",
//     },
//     entriesSelector: {
//       display: "flex",
//       alignItems: "center",
//       gap: "10px",
//     },
//     searchBox: {
//       display: "flex",
//       alignItems: "center",
//       gap: "10px",
//     },
//     searchInput: {
//       width: "250px",
//       padding: "8px 12px",
//       border: "1px solid #ddd",
//       borderRadius: "4px",
//     },
//     filterRow: {
//       display: "flex",
//       gap: "20px",
//       alignItems: "center",
//       flexWrap: "wrap",
//     },
//     filterGroup: {
//       display: "flex",
//       alignItems: "center",
//       gap: "10px",
//     },
//     filterLabel: {
//       margin: 0,
//       fontWeight: "normal",
//     },
//     filterSelect: {
//       width: "auto",
//       minWidth: "150px",
//       padding: "5px 10px",
//       border: "1px solid #ddd",
//       borderRadius: "4px",
//     },
//     holidaysTable: {
//       width: "100%",
//       borderCollapse: "collapse",
//     },
//     tableHeader: {
//       backgroundColor: '#344054', // New charcoal color
//       color: "white",
//       padding: "12px",
//       textAlign: "left",
//       cursor: "pointer",
//       userSelect: "none",
//     },
//     tableHeaderHover: {
//       backgroundColor: "#475467",
//     },
//     tableCell: {
//       padding: "12px",
//       borderBottom: "1px solid #e0e0e0",
//     },
//     tableRowHover: {
//       backgroundColor: "#f8f9fa",
//     },
//     statusBadge: {
//       padding: "4px 8px",
//       borderRadius: "12px",
//       fontSize: "12px",
//       fontWeight: "bold",
//       textTransform: "uppercase",
//     },
//     statusPublished: {
//       backgroundColor: "#d4edda",
//       color: "#155724",
//     },
//     statusRestricted: {
//       backgroundColor: "#f8d7da",
//       color: "#721c24",
//     },
//     actionButton: {
//       padding: "6px 10px",
//       marginRight: "5px",
//       border: "none",
//       borderRadius: "4px",
//       cursor: "pointer",
//       fontSize: "14px",
//       backgroundColor: 'transparent',
//       transition: "opacity 0.3s ease",
//     },
//     editButtonIcon: {
//       color: '#2E90FA', // Blue icon color
//     },
//     deleteButtonIcon: {
//       color: '#D92D20', // Red icon color
//     },
//     actionButtonDisabled: {
//       opacity: 0.6,
//       cursor: "not-allowed",
//     },
//     pagination: {
//       display: "flex",
//       justifyContent: "space-between",
//       alignItems: "center",
//       padding: "20px",
//       background: "#f8f9fa",
//       borderTop: "1px solid #e0e0e0",
//     },
//     // ... (rest of the styles are unchanged)
//     paginationControls: {
//       display: "flex",
//       gap: "5px",
//     },
//     paginationButton: {
//       padding: "8px 12px",
//       border: "1px solid #ddd",
//       background: "white",
//       cursor: "pointer",
//       borderRadius: "4px",
//     },
//     paginationButtonActive: {
//       backgroundColor: vibrantPurple,
//       color: "white",
//       borderColor: vibrantPurple,
//     },
//     paginationButtonDisabled: {
//       opacity: 0.6,
//       cursor: "not-allowed",
//     },
//     calendarContent: {
//       flexDirection: "row",
//     },
//     eventsSidebar: {
//       flex: "0 0 200px",
//       background: "#f8f9fa",
//       padding: "20px",
//       borderRadius: "8px",
//       marginRight: "20px",
//     },
//     calendarContainer: {
//       flex: 1,
//     },
//     eventTypes: {
//       marginTop: "15px",
//     },
//     eventType: {
//       display: "flex",
//       alignItems: "center",
//       marginBottom: "10px",
//       fontSize: "14px",
//     },
//     eventTypeSpan: {
//       width: "12px",
//       height: "12px",
//       borderRadius: "50%",
//       marginRight: "8px",
//     },
//     eventTypePublished: {
//       backgroundColor: "#28a745",
//     },
//     eventTypeRestricted: {
//       backgroundColor: "#dc3545",
//     },
//     calendarView: {
//       background: "white",
//       borderRadius: "8px",
//       boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
//       overflow: "hidden",
//     },
//     calendarHeader: {
//       padding: "20px",
//       background: "#f8f9fa",
//       borderBottom: "1px solid #e0e0e0",
//       display: "flex",
//       justifyContent: "space-between",
//       alignItems: "center",
//       flexWrap: "wrap",
//       gap: "15px",
//     },
//     calendarNavigation: {
//       display: "flex",
//       alignItems: "center",
//       gap: "10px",
//     },
//     navButton: {
//       padding: "8px 12px",
//       border: "1px solid #ddd",
//       background: "white",
//       cursor: "pointer",
//       borderRadius: "4px",
//     },
//     todayButton: {
//       padding: "8px 12px",
//       border: "1px solid #ddd",
//       background: "white",
//       cursor: "pointer",
//       borderRadius: "4px",
//     },
//     calendarTitle: {
//       fontSize: "18px",
//       fontWeight: "bold",
//       color: "#333",
//     },
//     calendarFilters: {
//       display: "flex",
//       gap: "15px",
//       flexWrap: "wrap",
//     },
//     viewOptions: {
//       display: "flex",
//       gap: "5px",
//     },
//     viewOption: {
//       padding: "6px 12px",
//       border: "1px solid #ddd",
//       background: "white",
//       cursor: "pointer",
//       borderRadius: "4px",
//       textTransform: "capitalize",
//     },
//     viewOptionActive: {
//       backgroundColor: vibrantPurple,
//       color: "white",
//       borderColor: vibrantPurple,
//     },
//     calendarGrid: {
//       padding: "20px",
//     },
//     calendarDaysHeader: {
//       display: "grid",
//       gridTemplateColumns: "repeat(7, 1fr)",
//       gap: "1px",
//       marginBottom: "10px",
//     },
//     calendarHeaderCell: {
//       padding: "10px",
//       textAlign: "center",
//       fontWeight: "bold",
//       backgroundColor: "#f8f9fa",
//       border: "1px solid #e0e0e0",
//     },
//     calendarDays: {
//       display: "grid",
//       gridTemplateColumns: "repeat(7, 1fr)",
//       gap: "1px",
//     },
//     calendarDay: {
//       minHeight: "100px",
//       padding: "8px",
//       border: "1px solid #e0e0e0",
//       background: "white",
//       position: "relative",
//     },
//     calendarDayOtherMonth: {
//       backgroundColor: "#f8f9fa",
//       color: "#6c757d",
//     },
//     calendarDayToday: {
//       backgroundColor: "#e3f2fd",
//       borderColor: "#2196f3",
//     },
//     dayNumber: {
//       fontWeight: "bold",
//       marginBottom: "5px",
//     },
//     dayHolidays: {
//       display: "flex",
//       flexDirection: "column",
//       gap: "2px",
//     },
//     holidayEvent: {
//       padding: "2px 6px",
//       borderRadius: "3px",
//       fontSize: "11px",
//       color: "white",
//       overflow: "hidden",
//       textOverflow: "ellipsis",
//       whiteSpace: "nowrap",
//     },
//     holidayEventPublished: {
//       backgroundColor: "#28a745",
//     },
//     holidayEventRestricted: {
//       backgroundColor: "#dc3545",
//     },
//     errorMessage: {
//       backgroundColor: "#f8d7da",
//       color: "#721c24",
//       padding: "10px",
//       border: "1px solid #f5c6cb",
//       borderRadius: "4px",
//       marginBottom: "15px",
//     },
//     loadingMessage: {
//       textAlign: "center",
//       padding: "20px",
//       color: "#6c757d",
//     },
//   }

//   // API Functions
//   const fetchHolidays = async () => {
//     setLoading(true);
//     try {
//       const response = await axiosInstance.get("https://tdtlworld.com/hrms-backend/api/holiday/");
//       const holidaysFromAPI = response.data.data || [];

//       const mappedHolidays = holidaysFromAPI.map((holiday) => ({
//         id: holiday.holiday_id,
//         event_name: holiday.event_name,
//         start_date: formatDateFromAPI(holiday.start_date),
//         endDate: formatDateFromAPI(holiday.end_date),
//         description: holiday.description || "",
//         status: holiday.status == 1 ? "Published" : "Restricted",
//         country: holiday.country,
//         state: holiday.state,
//         employee_hub_name: holiday.employee_hub_name || "N/A",
//       }));
//       setHolidays(mappedHolidays);
//     } catch (error) {
//       console.error("Error fetching holidays:", error);
//       setError("Failed to load holidays");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const createHoliday = async () => {
//     setLoading(true);
//     try {
//       const payload = {
//         state: selectedState,
//         employee_hub: selectedHub,
//         country: selectedCountryId,
//         event_name: eventTitle,
//         start_date: startDate,
//         end_date: endDate,
//         description,
//         is_publish: status === "Published" ? 1 : 0,
//       };
//       await axiosInstance.post("api/holiday/", payload);
//       await fetchHolidays();
//       resetForm();
//     } catch (error) {
//       console.error("Failed to create holiday:", error);
//       setError("Failed to create holiday.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const updateHoliday = async () => {
//     setLoading(true);
//     try {
//       const payload = {
//         holiday_id: editingHolidayId,
//         state: selectedState,
//         employee_hub: selectedHub,
//         country: selectedCountryId,
//         event_name: eventTitle,
//         start_date: startDate,
//         end_date: endDate,
//         description,
//         is_publish: status === "Published" ? 1 : 0,
//       };
//       await axiosInstance.put("api/holiday/", payload);
//       await fetchHolidays();
//       resetForm();
//     } catch (error) {
//       console.error("Failed to update holiday:", error);
//       setError("Failed to update holiday.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const deleteHoliday = async (holidayId) => {
//     if (!window.confirm("Are you sure you want to delete this holiday?")) return;
//     setLoading(true);
//     try {
//       await axiosInstance.delete("api/holiday/", { data: { holiday_id: holidayId } });
//       await fetchHolidays();
//     } catch (error) {
//       console.error("Failed to delete holiday:", error);
//       setError("Failed to delete holiday.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Initial data fetching
//   useEffect(() => {
//     fetchHolidays();
//     const fetchCountries = async () => {
//       try {
//         const response = await axiosInstance.get("https://tdtlworld.com/hrms-backend/api/countries/");
//         setCountries(response.data.data || []);
//       } catch (error) {
//         console.error("Failed to fetch countries:", error);
//       }
//     };
//     fetchCountries();
//   }, []);

//   // Fetch states for the ADD/EDIT FORM when its country changes
//   useEffect(() => {
//     if (selectedCountry) {
//       const fetchStates = async () => {
//         try {
//           const response = await axiosInstance.get(`https://tdtlworld.com/hrms-backend/api/states/?country_name=${selectedCountry}`);
//           setFormStates(response.data.data || []);
//         } catch (error) {
//           console.error("Failed to fetch states for form:", error);
//           setFormStates([]);
//         }
//       };
//       fetchStates();
//     } else {
//       setFormStates([]);
//       setSelectedState("");
//     }
//   }, [selectedCountry]);

//   // Fetch HUBS for the ADD/EDIT FORM when its state changes
//   useEffect(() => {
//     if (selectedState && typeof selectedState === 'number') {
//       const fetchHubsForState = async () => {
//         try {
//           const response = await axiosInstance.get(`https://tdtlworld.com/hrms-backend/api/employee_hub_dropdown/${selectedState}/`);
//           setHubOptions(response.data.data || []);
//         } catch (error) {
//           console.error("Failed to fetch hubs for form:", error);
//           setHubOptions([]);
//         }
//       };
//       fetchHubsForState();
//     } else {
//       setHubOptions([]);
//     }
//   }, [selectedState]);

//   // Fetch states for the FILTER DROPDOWNS when its country changes
//   useEffect(() => {
//     if (filterCountry) {
//       const fetchStates = async () => {
//         try {
//           const response = await axiosInstance.get(`https://tdtlworld.com/hrms-backend/api/states/?country_name=${filterCountry}`);
//           setFilterStates(response.data.data || []);
//         } catch (error) {
//           console.error("Failed to fetch states for filter:", error);
//           setFilterStates([]);
//         }
//       };
//       fetchStates();
//     } else {
//       setFilterStates([]);
//       setFilterState("");
//     }
//   }, [filterCountry]);

//   // Fetch HUBS for the FILTER DROPDOWNS when the state filter changes
//   useEffect(() => {
//     const fetchHubsForFilter = async () => {
//       const selectedStateObj = filterStates.find(s => s.state_name === filterState);
//       if (selectedStateObj) {
//         try {
//           const response = await axiosInstance.get(`https://tdtlworld.com/hrms-backend/api/employee_hub_dropdown/${selectedStateObj.state_id}/`);
//           setFilterHubOptions(response.data.data || []);
//         } catch (error) {
//           console.error("Failed to fetch hubs for filter:", error);
//           setFilterHubOptions([]);
//         }
//       } else {
//         setFilterHubOptions([]);
//       }
//     };

//     if (filterState) {
//       fetchHubsForFilter();
//     } else {
//       setFilterHubOptions([]);
//       setFilterHub("");
//     }
//   }, [filterState, filterStates]);

//   // When editing, convert state NAME to state ID after states are fetched
//   useEffect(() => {
//     if (isEditing && formStates.length > 0 && typeof selectedState === 'string') {
//       const stateToSet = formStates.find(s => s.state_name === selectedState);
//       if (stateToSet) {
//         setSelectedState(stateToSet.state_id);
//       }
//     }
//   }, [formStates, isEditing, selectedState]);

//   // When editing, select the correct hub ID after the hubs for the state are fetched
//   useEffect(() => {
//     if (isEditing && hubOptions.length > 0 && initialHubNameToSelect) {
//       const hubToSet = hubOptions.find(h => h.employee_hub_name.trim() === initialHubNameToSelect.trim());
//       if (hubToSet) {
//         setSelectedHub(hubToSet.employee_hub_id);
//       }
//       setInitialHubNameToSelect(null);
//     }
//   }, [hubOptions, isEditing, initialHubNameToSelect]);

//   const handleAddNewClick = () => {
//     resetForm();
//     setIsEditing(false);
//     setIsFormVisible(true);
//   };

//   const handleCancelClick = () => {
//     resetForm();
//     setIsFormVisible(false);
//   }

//   // Helper functions for date formatting
//   const formatDateFromAPI = (apiDate) => {
//     if (!apiDate) return ""
//     const date = new Date(apiDate)
//     return new Intl.DateTimeFormat('en-GB').format(date);
//   }

//   const formatDateForInput = (dateString_ddmmyyyy) => {
//     if (!dateString_ddmmyyyy) return ""
//     const parts = dateString_ddmmyyyy.split("/")
//     if (parts.length !== 3) return ""
//     return `${parts[2]}-${parts[1].padStart(2, "0")}-${parts[0].padStart(2, "0")}`
//   }

//   const parseDate = (dateString_ddmmyyyy) => {
//     if (!dateString_ddmmyyyy || typeof dateString_ddmmyyyy !== "string") {
//       return new Date("");
//     }
//     const parts = dateString_ddmmyyyy.split("/");
//     if (parts.length !== 3) return new Date("");
//     const [day, month, year] = parts;
//     return new Date(year, month - 1, day);
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     if (!eventTitle || !startDate || !endDate || !description || !selectedCountryId || !selectedState || !selectedHub) {
//       alert("Please fill in all required fields.")
//       return
//     }
//     if (new Date(startDate) > new Date(endDate)) {
//       alert("End date cannot be before start date.")
//       return
//     }

//     try {
//       if (isEditing) {
//         await updateHoliday()
//       } else {
//         await createHoliday()
//       }
//     } catch (err) {
//       // Errors handled in API functions
//     }
//   }

//   // Reset form fields and hide form
//   const resetForm = () => {
//     setEventTitle("");
//     setStartDate("");
//     setEndDate("");
//     setDescription("");
//     setSelectedCountry("");
//     setSelectedCountryId("");
//     setSelectedState("");
//     setSelectedHub("");
//     setStatus("Published");
//     setIsEditing(false);
//     setEditingHolidayId(null);
//     setInitialHubNameToSelect(null);
//     setError("");
//     setIsFormVisible(false); // Hide form on reset
//   };

//   // Handle Edit
//   const handleEdit = (id) => {
//     const holidayToEdit = holidays.find((h) => h.id === id)
//     if (holidayToEdit) {
//       window.scrollTo(0, 0)

//       setEventTitle(holidayToEdit.event_name)
//       setStartDate(formatDateForInput(holidayToEdit.start_date))
//       setEndDate(formatDateForInput(holidayToEdit.endDate))
//       setDescription(holidayToEdit.description)
//       setStatus(holidayToEdit.status)
//       setEditingHolidayId(id)
//       setIsEditing(true)

//       if (holidayToEdit.employee_hub_name && holidayToEdit.employee_hub_name !== "N/A") {
//         setInitialHubNameToSelect(holidayToEdit.employee_hub_name);
//       } else {
//         setInitialHubNameToSelect(null);
//         setSelectedHub("");
//       }

//       const countryObj = countries.find(c => c.country_name === holidayToEdit.country);
//       if (countryObj) {
//         setSelectedCountryId(countryObj.country_id);
//       }

//       setSelectedCountry(holidayToEdit.country);
//       setSelectedState(holidayToEdit.state);
//       setIsFormVisible(true); // Show form
//     }
//   }

//   // Handle Delete
//   const handleDelete = async (id) => {
//     await deleteHoliday(id)
//   }

//   // Handle sorting
//   const handleSort = (field) => {
//     const newDirection = (sortField === field && sortDirection === "asc") ? "desc" : "asc";
//     setSortField(field);
//     setSortDirection(newDirection);
//     setCurrentPage(1);
//   }

//   // Get sorted and filtered holidays
//   const getSortedAndFilteredHolidays = () => {
//     let filteredHolidays = [...holidays]

//     if (filterCountry) {
//       filteredHolidays = filteredHolidays.filter((holiday) => holiday.country === filterCountry)
//       if (filterState) {
//         filteredHolidays = filteredHolidays.filter((holiday) => holiday.state === filterState)
//       }
//     }
//     if (filterHub) {
//       const hubMatch = filterHubOptions.find(h => h.employee_hub_id == filterHub);
//       if (hubMatch) {
//         filteredHolidays = filteredHolidays.filter(
//           (holiday) => holiday.employee_hub_name.trim() === hubMatch.employee_hub_name.trim()
//         );
//       }
//     }

//     if (searchTerm) {
//       const lowercasedTerm = searchTerm.toLowerCase();
//       filteredHolidays = filteredHolidays.filter((holiday) =>
//         Object.values(holiday).some((value) => String(value).toLowerCase().includes(lowercasedTerm)),
//       )
//     }

//     if (sortField) {
//       filteredHolidays.sort((a, b) => {
//         let valA = a[sortField];
//         let valB = b[sortField];
//         let comparison = 0;

//         if (sortField === "startDate" || sortField === "endDate") {
//           comparison = parseDate(valA) - parseDate(valB);
//         } else {
//           comparison = String(valA).toLowerCase().localeCompare(String(valB).toLowerCase());
//         }
//         return sortDirection === "asc" ? comparison : -comparison;
//       });
//     }
//     return filteredHolidays;
//   }

//   const getPaginatedHolidays = () => {
//     const filteredHolidays = getSortedAndFilteredHolidays()
//     const startIndex = (currentPage - 1) * entriesPerPage
//     return filteredHolidays.slice(startIndex, startIndex + entriesPerPage)
//   }

//   const getTotalPages = () => Math.ceil(getSortedAndFilteredHolidays().length / entriesPerPage)

//   useEffect(() => { setCurrentPage(1) }, [entriesPerPage, searchTerm, filterCountry, filterState, filterHub]);

//   const handlePreviousPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
//   const handleNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, getTotalPages()));

//   // Calendar utility functions
//   const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate()
//   const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay()

//   const generateCalendarDays = () => {
//     const year = currentMonth.getFullYear()
//     const month = currentMonth.getMonth()
//     const daysInMonth = getDaysInMonth(year, month)
//     const firstDayOfMonthIndex = getFirstDayOfMonth(year, month)
//     const calendarDays = [];

//     const prevMonthLastDate = new Date(year, month, 0);
//     const prevMonth = prevMonthLastDate.getMonth();
//     const prevYear = prevMonthLastDate.getFullYear();
//     for (let i = firstDayOfMonthIndex; i > 0; i--) {
//       calendarDays.push({ day: prevMonthLastDate.getDate() - i + 1, month: prevMonth, year: prevYear, isCurrentMonth: false });
//     }
//     for (let i = 1; i <= daysInMonth; i++) {
//       calendarDays.push({ day: i, month, year, isCurrentMonth: true });
//     }
//     const nextMonth = (month + 1) % 12;
//     const nextYear = month === 11 ? year + 1 : year;
//     const remainingDays = 42 - calendarDays.length;
//     for (let i = 1; i <= remainingDays; i++) {
//       calendarDays.push({ day: i, month: nextMonth, year: nextYear, isCurrentMonth: false });
//     }
//     return calendarDays;
//   }

//   const getHolidaysForDay = (day, month, year) => {
//     const currentDateStr = new Intl.DateTimeFormat('en-GB').format(new Date(year, month, day));
//     const currentDateObj = parseDate(currentDateStr);

//     return holidays.filter((holiday) => {
//       const countryMatch = !filterCountry || holiday.country === filterCountry;
//       const stateMatch = !filterState || holiday.state === filterState;

//       const hubToCompare = filterHubOptions.find(h => h.employee_hub_id == filterHub);
//       const hubMatch = !filterHub || (hubToCompare && holiday.employee_hub_name.trim() === hubToCompare.employee_hub_name.trim());

//       if (!countryMatch || !stateMatch || !hubMatch) return false;

//       const holidayStartDateObj = parseDate(holiday.start_date);
//       const holidayEndDateObj = parseDate(holiday.endDate);
//       return currentDateObj >= holidayStartDateObj && currentDateObj <= holidayEndDateObj;
//     });
//   }

//   const goToPreviousMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
//   const goToNextMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
//   const goToToday = () => setCurrentMonth(new Date())
//   const getMonthName = (date) => date.toLocaleString("default", { month: "long" })

//   const handleFormCountryChange = (e) => {
//     const countryName = e.target.value;
//     const countryObj = countries.find(c => c.country_name === countryName);
//     setSelectedCountry(countryName);
//     setSelectedCountryId(countryObj ? countryObj.country_id : "");
//     setSelectedState("");
//   }

//   const handleFilterCountryChange = (e) => {
//     setFilterCountry(e.target.value)
//     setFilterState("")
//     setCurrentPage(1)
//   }

//   const handleFilterStateChange = (e) => {
//     setFilterState(e.target.value)
//     setFilterHub("");
//     setCurrentPage(1)
//   }

//   const handleFilterHubChange = (e) => {
//     setFilterHub(e.target.value);
//     setCurrentPage(1);
//   }

//   // Render list view
//   const renderListView = () => {
//     const paginatedHolidays = getPaginatedHolidays();
//     const totalFilteredHolidays = getSortedAndFilteredHolidays().length;
//     const startEntry = totalFilteredHolidays === 0 ? 0 : (currentPage - 1) * entriesPerPage + 1;
//     const endEntry = Math.min(startEntry + entriesPerPage - 1, totalFilteredHolidays);

//     return (
//       <div style={styles.listView}>
//         <div style={styles.listControls}>
//           <div style={styles.entriesSearchRow}>
//             <div style={styles.entriesSelector}>
//               <span>Show</span>
//               <select
//                 style={styles.filterSelect}
//                 value={entriesPerPage}
//                 onChange={(e) => setEntriesPerPage(Number(e.target.value))}
//               >
//                 <option value={5}>5</option>
//                 <option value={10}>10</option>
//                 <option value={25}>25</option>
//                 <option value={50}>50</option>
//                 <option value={100}>100</option>
//               </select>
//               <span>entries</span>
//             </div>
//             <div style={styles.searchBox}>
//               <span>Search:</span>
//               <input
//                 type="text"
//                 style={styles.searchInput}
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 placeholder="Search..."
//               />
//             </div>
//           </div>
//           <div style={styles.filterRow}>
//             <div style={styles.filterGroup}>
//               <label htmlFor="filterCountry" style={styles.filterLabel}>Country:</label>
//               <select
//                 id="filterCountry"
//                 style={styles.filterSelect}
//                 value={filterCountry}
//                 onChange={handleFilterCountryChange}
//               >
//                 <option value="">All Countries</option>
//                 {countries.map((c) => (
//                   <option key={c.country_id} value={c.country_name}>{c.country_name}</option>
//                 ))}
//               </select>
//             </div>
//             <div style={styles.filterGroup}>
//               <label htmlFor="filterState" style={styles.filterLabel}>State:</label>
//               <select
//                 id="filterState"
//                 style={styles.filterSelect}
//                 value={filterState}
//                 onChange={handleFilterStateChange}
//                 disabled={!filterCountry}
//               >
//                 <option value="">All States</option>
//                 {filterStates.map((s) => (
//                   <option key={s.state_id} value={s.state_name}>{s.state_name}</option>
//                 ))}
//               </select>
//             </div>
//             <div style={styles.filterGroup}>
//               <label htmlFor="filterHub" style={styles.filterLabel}>Hub:</label>
//               <select id="filterHub" style={styles.filterSelect} value={filterHub} onChange={handleFilterHubChange} disabled={!filterState || filterHubOptions.length === 0}>
//                 <option value="">All Hubs</option>
//                 {filterHubOptions.map((hub) => (
//                   <option key={hub.employee_hub_id} value={hub.employee_hub_id}>{hub.employee_hub_name}</option>
//                 ))}
//               </select>
//             </div>
//           </div>
//         </div>

//         {error && <div style={styles.errorMessage}>{error}</div>}
//         {loading && !isEditing && <div style={styles.loadingMessage}>Loading...</div>}

//         <div style={{ overflowX: 'auto' }}>
//           <table style={styles.holidaysTable}>
//             <thead>
//               <tr>
//                 <th style={styles.tableHeader} onClick={() => handleSort("event_name")}>EVENT TITLE</th>
//                 <th style={styles.tableHeader} onClick={() => handleSort("startDate")}>START DATE</th>
//                 <th style={styles.tableHeader} onClick={() => handleSort("endDate")}>END DATE</th>
//                 <th style={styles.tableHeader} onClick={() => handleSort("country")}>COUNTRY</th>
//                 <th style={styles.tableHeader} onClick={() => handleSort("state")}>STATE</th>
//                 <th style={styles.tableHeader} onClick={() => handleSort("employee_hub_name")}>EMPLOYEE HUB</th>
//                 <th style={styles.tableHeader} onClick={() => handleSort("status")}>STATUS</th>
//                 <th style={styles.tableHeader}>ACTIONS</th>
//               </tr>
//             </thead>
//             <tbody>
//               {paginatedHolidays.length > 0 ? (
//                 paginatedHolidays.map((holiday) => (
//                   <tr key={holiday.id}>
//                     <td style={styles.tableCell}>{holiday.event_name}</td>
//                     <td style={styles.tableCell}>{holiday.start_date}</td>
//                     <td style={styles.tableCell}>{holiday.endDate}</td>
//                     <td style={styles.tableCell}>{holiday.country}</td>
//                     <td style={styles.tableCell}>{holiday.state}</td>
//                     <td style={styles.tableCell}>{holiday.employee_hub_name}</td>
//                     <td style={styles.tableCell}>
//                       <span style={{ ...styles.statusBadge, ...(String(holiday.status).toLowerCase() === "published" ? styles.statusPublished : styles.statusRestricted) }}>{holiday.status}</span>
//                     </td>
//                     <td style={styles.tableCell}>
//                       <button onClick={() => handleEdit(holiday.id)} style={{ ...styles.actionButton, ...styles.editButtonIcon }} disabled={loading}><FontAwesomeIcon icon={faEdit} /></button>
//                       <button onClick={() => handleDelete(holiday.id)} style={{ ...styles.actionButton, ...styles.deleteButtonIcon }} disabled={loading}><FontAwesomeIcon icon={faTrash} /></button>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr><td colSpan="8" style={{ ...styles.tableCell, textAlign: 'center' }}>No holidays found.</td></tr>
//               )}
//             </tbody>
//           </table>
//         </div>

//         <div style={styles.pagination}>
//           <div>Showing {startEntry} to {endEntry} of {totalFilteredHolidays} records</div>
//           <div style={styles.paginationControls}>
//             <button onClick={handlePreviousPage} disabled={currentPage === 1} style={{ ...styles.paginationButton, ...(currentPage === 1 ? styles.paginationButtonDisabled : {}) }}>Previous</button>
//             <button style={{ ...styles.paginationButton, ...styles.paginationButtonActive }}>{currentPage}</button>
//             <button onClick={handleNextPage} disabled={currentPage >= getTotalPages()} style={{ ...styles.paginationButton, ...(currentPage >= getTotalPages() ? styles.paginationButtonDisabled : {}) }}>Next</button>
//           </div>
//         </div>
//       </div>
//     )
//   }

//   // Render calendar view
//   const renderCalendarView = () => {
//     const calendarDays = generateCalendarDays();
//     const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

//     return (
//       <div style={styles.calendarView}>
//         <div style={styles.calendarHeader}>
//           <div style={styles.calendarNavigation}>
//             <button style={styles.navButton} onClick={goToPreviousMonth}><FontAwesomeIcon icon={faChevronLeft} /></button>
//             <button style={styles.todayButton} onClick={goToToday}>Today</button>
//             <button style={styles.navButton} onClick={goToNextMonth}><FontAwesomeIcon icon={faChevronRight} /></button>
//           </div>
//           <div style={styles.calendarTitle}>{getMonthName(currentMonth).toUpperCase()} {currentMonth.getFullYear()}</div>
//           <div style={styles.calendarFilters}>
//             <div style={styles.filterGroup}>
//               <label htmlFor="calendarFilterCountry" style={styles.filterLabel}>Country:</label>
//               <select id="calendarFilterCountry" style={styles.filterSelect} value={filterCountry} onChange={handleFilterCountryChange}>
//                 <option value="">All Countries</option>
//                 {countries.map((c) => (<option key={c.country_id} value={c.country_name}>{c.country_name}</option>))}
//               </select>
//             </div>
//             <div style={styles.filterGroup}>
//               <label htmlFor="calendarFilterState" style={styles.filterLabel}>State:</label>
//               <select id="calendarFilterState" style={styles.filterSelect} value={filterState} onChange={handleFilterStateChange} disabled={!filterCountry}>
//                 <option value="">All States</option>
//                 {filterStates.map((s) => (<option key={s.state_id} value={s.state_name}>{s.state_name}</option>))}
//               </select>
//             </div>
//             <div style={styles.filterGroup}>
//               <label htmlFor="calendarFilterHub" style={styles.filterLabel}>Hub:</label>
//               <select id="calendarFilterHub" style={styles.filterSelect} value={filterHub} onChange={handleFilterHubChange} disabled={!filterState || filterHubOptions.length === 0}>
//                 <option value="">All Hubs</option>
//                 {filterHubOptions.map((hub) => (
//                   <option key={hub.employee_hub_id} value={hub.employee_hub_id}>{hub.employee_hub_name}</option>
//                 ))}
//               </select>
//             </div>
//           </div>
//         </div>

//         <div style={styles.calendarGrid}>
//           <div style={styles.calendarDaysHeader}>
//             {daysOfWeek.map((day) => (<div key={day} style={styles.calendarHeaderCell}>{day}</div>))}
//           </div>
//           <div style={styles.calendarDays}>
//             {calendarDays.map((dayInfo, index) => {
//               const dayHolidays = getHolidaysForDay(dayInfo.day, dayInfo.month, dayInfo.year);
//               const isToday = new Date().toDateString() === new Date(dayInfo.year, dayInfo.month, dayInfo.day).toDateString();
//               return (
//                 <div key={index} style={{ ...styles.calendarDay, ...(!dayInfo.isCurrentMonth ? styles.calendarDayOtherMonth : {}), ...(isToday ? styles.calendarDayToday : {}) }}>
//                   <div style={styles.dayNumber}>{dayInfo.day}</div>
//                   <div style={styles.dayHolidays}>
//                     {dayHolidays.map((holiday) => (
//                       <div key={holiday.id} style={{ ...styles.holidayEvent, ...(holiday.status.toLowerCase() === "published" ? styles.holidayEventPublished : styles.holidayEventRestricted) }} title={`${holiday.event_name} (${holiday.country} - ${holiday.state})`}>
//                         {holiday.event_name}
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )
//             })}
//           </div>
//         </div>
//       </div>
//     )
//   }

//   // Render holidays form and list view
//   const renderHolidaysView = () => {
//     return (
//       <div>
//         {isFormVisible ? (
//           <div style={styles.formSection}>
//             <h2>{isEditing ? "Edit Holiday" : "Add New Holiday"}</h2>
//             {error && <div style={styles.errorMessage}>{error}</div>}
//             <form onSubmit={handleSubmit}>
//               <div style={styles.formGroup}>
//                 <label htmlFor="eventTitle" style={styles.label}>Event Title <span style={styles.required}>*</span></label>
//                 <input type="text" id="eventTitle" style={styles.input} value={eventTitle} onChange={(e) => setEventTitle(e.target.value)} required disabled={loading} />
//               </div>
//               <div style={styles.formRow}>
//                 <div style={{ ...styles.formGroup, ...styles.formRowGroup }}>
//                   <label htmlFor="startDate" style={styles.label}>Start Date <span style={styles.required}>*</span></label>
//                   <input type="date" id="startDate" style={styles.input} value={startDate} onChange={(e) => setStartDate(e.target.value)} required disabled={loading} />
//                 </div>
//                 <div style={{ ...styles.formGroup, ...styles.formRowGroup }}>
//                   <label htmlFor="endDate" style={styles.label}>End Date <span style={styles.required}>*</span></label>
//                   <input type="date" id="endDate" style={styles.input} value={endDate} onChange={(e) => setEndDate(e.target.value)} required disabled={loading} />
//                 </div>
//               </div>
//               <div style={styles.formRow}>
//                 <div style={{ ...styles.formGroup, ...styles.formRowGroup }}>
//                   <label htmlFor="selectedCountry" style={styles.label}>Country <span style={styles.required}>*</span></label>
//                   <select id="selectedCountry" style={styles.input} value={selectedCountry} onChange={handleFormCountryChange} required disabled={loading}>
//                     <option value="">Select Country</option>
//                     {countries.map((c) => (<option key={c.country_id} value={c.country_name}>{c.country_name}</option>))}
//                   </select>
//                 </div>
//                 <div style={{ ...styles.formGroup, ...styles.formRowGroup }}>
//                   <label htmlFor="selectedState" style={styles.label}>State <span style={styles.required}>*</span></label>
//                   <select id="selectedState" style={styles.input} value={selectedState} onChange={(e) => setSelectedState(Number(e.target.value))} disabled={loading || !selectedCountry || formStates.length === 0} required>
//                     <option value="">Select State</option>
//                     {formStates.map((s) => (<option key={s.state_id} value={s.state_id}>{s.state_name}</option>))}
//                   </select>
//                 </div>
//               </div>
//               <div style={styles.formGroup}>
//                 <label htmlFor="selectedHub" style={styles.label}>Employee Hub <span style={styles.required}>*</span></label>
//                 <select id="selectedHub" style={styles.input} value={selectedHub} onChange={(e) => setSelectedHub(e.target.value)} required disabled={loading || !selectedState || hubOptions.length === 0}>
//                   <option value="">Select Hub</option>
//                   {hubOptions.map((hub) => (<option key={hub.employee_hub_id} value={hub.employee_hub_id}>{hub.employee_hub_name}</option>))}
//                 </select>
//               </div>
//               <div style={styles.formGroup}>
//                 <label htmlFor="description" style={styles.label}>Description <span style={styles.required}>*</span></label>
//                 <textarea id="description" style={styles.textarea} value={description} onChange={(e) => setDescription(e.target.value)} required disabled={loading} />
//               </div>
//               <div style={styles.formGroup}>
//                 <label htmlFor="status" style={styles.label}>Status</label>
//                 <select id="status" style={styles.input} value={status} onChange={(e) => setStatus(e.target.value)} disabled={loading}>
//                   <option value="Published">Published</option>
//                   <option value="Restricted">Restricted</option>
//                 </select>
//               </div>
//               <div style={styles.formActions}>
//                 <button type="submit" style={{ ...styles.saveButton, ...(loading ? styles.saveButtonDisabled : {}) }} disabled={loading}>{loading ? "Processing..." : isEditing ? "Update" : "Save"}</button>
//                 <button type="button" onClick={handleCancelClick} style={styles.cancelButton} disabled={loading}>Cancel</button>
//               </div>
//             </form>
//           </div>
//         ) : (
//           <div style={styles.viewSection}>
//             <div style={styles.viewSectionHeader}>
//               <h2>List All Holidays</h2>
//               <button style={styles.addNewButton} onClick={handleAddNewClick}>Add New Holiday</button>
//             </div>
//             {renderListView()}
//           </div>
//         )}
//       </div>
//     )
//   }

//   const renderCalendarViewWithSidebar = () => {
//     return (
//       <div style={{ ...styles.content, ...styles.calendarContent }}>
//         <div style={styles.eventsSidebar}>
//           <h2>Events Legend</h2>
//           <div style={styles.eventTypes}>
//             <div style={styles.eventType}><span style={{ ...styles.eventTypeSpan, ...styles.eventTypeRestricted }}></span>Restricted</div>
//             <div style={styles.eventType}><span style={{ ...styles.eventTypeSpan, ...styles.eventTypePublished }}></span>Published</div>
//           </div>
//         </div>
//         <div style={styles.calendarContainer}>{renderCalendarView()}</div>
//       </div>
//     )
//   }

//   return (
//     <div style={styles.holidaysContainer}>
//       <div style={styles.header}>
//         <div style={{ ...styles.titleSection, ...(viewMode === "holidays" ? styles.titleSectionActive : {}) }} onClick={() => setViewMode("holidays")}>
//           <div style={styles.titleText}>
//             <h1 style={styles.titleH1}>Holidays</h1>
//             <p style={styles.titleP}>Manage Holidays</p>
//           </div>
//         </div>
//         <div style={{ ...styles.viewToggle, ...(viewMode === "calendar" ? styles.viewToggleActive : {}) }} onClick={() => setViewMode("calendar")}>
//           <div style={styles.titleText}>
//             <h2 style={styles.titleH1}>Calendar View</h2>
//             <p style={styles.titleP}>Holidays Calendar</p>
//           </div>
//         </div>
//       </div>
//       {viewMode === "holidays" ? renderHolidaysView() : renderCalendarViewWithSidebar()}
//     </div>
//   )
// }





















// import { useState, useEffect } from "react"
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
// import {
//   faSort,
//   faSortUp,
//   faSortDown,
//   faChevronLeft,
//   faChevronRight,
//   faEdit,
//   faTrash,
// } from "@fortawesome/free-solid-svg-icons"
// import axiosInstance from "../../utils/axiosInstance";
// export default function Holidays() {
//   // State for form inputs
//   const [eventTitle, setEventTitle] = useState("")
//   const [startDate, setStartDate] = useState("")
//   const [endDate, setEndDate] = useState("")
//   const [description, setDescription] = useState("")
//   const [status, setStatus] = useState("Published")
//   const [selectedCountry, setSelectedCountry] = useState("") // Stores country NAME for the form (used for state fetching)
//   const [selectedCountryId, setSelectedCountryId] = useState(""); // Stores country ID for the form (used for submission)
//   const [selectedState, setSelectedState] = useState("") // Stores state ID for the form
//   const [selectedHub, setSelectedHub] = useState("");     // Stores hub ID for the form
//   // State for API-driven dropdown options
//   const [countries, setCountries] = useState([]);
//   const [formStates, setFormStates] = useState([]);      // States for the form dropdown
//   const [hubOptions, setHubOptions] = useState([]);      // Hubs for the form dropdown (dynamic)
//   const [filterStates, setFilterStates] = useState([]);  // States for the filter dropdowns
//   const [filterHubOptions, setFilterHubOptions] = useState([]); // Hubs for the filter dropdown (dynamic)
//   // State for holidays list
//   const [holidays, setHolidays] = useState([])
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState("")
//   // State for pagination
//   const [currentPage, setCurrentPage] = useState(1)
//   const [entriesPerPage, setEntriesPerPage] = useState(5)
//   const [searchTerm, setSearchTerm] = useState("")
//   // State for sorting
//   const [sortField, setSortField] = useState("")
//   const [sortDirection, setSortDirection] = useState("asc")
//   // State for view mode
//   const [viewMode, setViewMode] = useState("holidays")
//   const [isFormVisible, setIsFormVisible] = useState(false); // Controls form visibility
//   // State for calendar
//   const [currentMonth, setCurrentMonth] = useState(new Date())
//   const [calendarView, setCalendarView] = useState("month")
//   // State for filtering
//   const [filterCountry, setFilterCountry] = useState("") // Stores country name for filtering
//   const [filterState, setFilterState] = useState("")     // Stores state NAME for filtering
//   const [filterHub, setFilterHub] = useState("");         // Stores hub ID for filtering
//   // State for editing
//   const [isEditing, setIsEditing] = useState(false)
//   const [editingHolidayId, setEditingHolidayId] = useState(null)
//   const [initialHubNameToSelect, setInitialHubNameToSelect] = useState(null); // Helper for edit auto-fill
//   // Styles object (UPDATED with new colors)
//   const vibrantPurple = '#7F56D9';
//   const styles = {
//     holidaysContainer: {
//       maxWidth: "1200px",

//       margin: "0 auto",

//       padding: "20px",

//       fontFamily: "Arial, sans-serif",

//     },

//     header: {

//       display: "flex",

//       justifyContent: "space-between",

//       alignItems: "center",

//       marginBottom: "30px",

//       borderBottom: "2px solid #e0e0e0",

//       paddingBottom: "20px",

//     },

//     titleSection: {

//       cursor: "pointer",

//       padding: "10px 20px",

//       borderRadius: "8px",

//       transition: "all 0.3s ease",

//       border: "1px solid #0c0000ff",

//     },

//     titleSectionActive: {

//       backgroundColor: vibrantPurple,

//       color: "white",

//     },

//     viewToggle: {

//       cursor: "pointer",

//       padding: "10px 20px",

//       borderRadius: "8px",

//       transition: "all 0.3s ease",
//        border: "1px solid #050000ff", 

//     },

//     viewToggleActive: {

//       backgroundColor: vibrantPurple,

//       color: "white",

//     },

//     titleText: {

//       margin: 0,

//     },

//     titleH1: {

//       margin: 0,

//       fontSize: "24px",

//     },

//     titleP: {

//       margin: "5px 0 0 0",

//       fontSize: "14px",

//       opacity: 0.8,

//     },

//     content: {

//       display: "flex",

//       gap: "30px",

//     },

//     contentColumn: {

//       flexDirection: "column",

//     },

//     formSection: {

//       background: "#f8f9fa",

//       padding: "25px",

//       borderRadius: "8px",

//       boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",

//       marginBottom: '30px', // Add some space when it appears

//     },

//     viewSection: {

//       flex: 1, // Take full width when form is hidden

//     },

//     viewSectionHeader: {

//       display: 'flex',

//       justifyContent: 'space-between',

//       alignItems: 'center',

//       marginBottom: '20px',

//     },

//     addNewButton: {

//       padding: "10px 20px",

//       border: `2px solid ${vibrantPurple}`,

//       borderRadius: "4px",

//       cursor: "pointer",

//       fontSize: "14px",

//       fontWeight: "bold",

//       backgroundColor: vibrantPurple,

//       color: "white",

//       transition: "background-color 0.3s ease",

//     },

//     formGroup: {

//       marginBottom: "20px",

//     },

//     formRow: {

//       display: "flex",

//       gap: "15px",

//     },

//     formRowGroup: {

//       flex: 1,

//     },

//     label: {

//       display: "block",

//       marginBottom: "5px",

//       fontWeight: "bold",

//       color: "#333",

//     },

//     required: {

//       color: "red",

//     },

//     input: {

//       width: "100%",

//       padding: "10px",

//       border: "1px solid #ddd",

//       borderRadius: "4px",

//       fontSize: "14px",

//       boxSizing: "border-box",

//     },

//     inputFocus: {

//       outline: "none",

//       borderColor: vibrantPurple,

//       boxShadow: `0 0 0 2px rgba(127, 86, 217, 0.25)`,

//     },

//     textarea: {

//       width: "100%",

//       padding: "10px",

//       border: "1px solid #ddd",

//       borderRadius: "4px",

//       fontSize: "14px",

//       resize: "vertical",

//       minHeight: "80px",

//       boxSizing: "border-box",

//     },

//     formActions: {

//       display: "flex",

//       gap: "10px",

//       marginTop: "25px",

//     },

//     saveButton: {

//       padding: "12px 24px",

//       border: `2px solid ${vibrantPurple}`,

//       borderRadius: "4px",

//       cursor: "pointer",

//       fontSize: "14px",

//       fontWeight: "bold",

//       backgroundColor: vibrantPurple,

//       color: "white",

//       transition: "background-color 0.3s ease",

//     },

//     saveButtonDisabled: {

//       backgroundColor: "#6c757d",

//       cursor: "not-allowed",

//     },

//     cancelButton: {

//       padding: "12px 24px",

//       border: "2px solid #6c757d",

//       borderRadius: "4px",

//       cursor: "pointer",

//       fontSize: "14px",

//       fontWeight: "bold",

//       backgroundColor: "#6c757d",

//       color: "white",

//     },

//     listView: {

//       background: "white",

//       borderRadius: "8px",

//       boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",

//       overflow: "hidden",

//     },

//     listControls: {

//       padding: "20px",

//       background: "#f8f9fa",

//       borderBottom: "1px solid #e0e0e0",

//     },

//     entriesSearchRow: {

//       display: "flex",

//       justifyContent: "space-between",

//       alignItems: "center",

//       marginBottom: "15px",

//     },

//     entriesSelector: {

//       display: "flex",

//       alignItems: "center",

//       gap: "10px",

//     },

//     searchBox: {

//       display: "flex",

//       alignItems: "center",

//       gap: "10px",

//     },

//     searchInput: {

//       width: "250px",

//       padding: "8px 12px",

//       border: `2px solid ${vibrantPurple}`,

//       borderRadius: "4px",

//     },

//     filterRow: {

//       display: "flex",

//       gap: "20px",

//       alignItems: "center",

//       flexWrap: "wrap",

//     },

//     filterGroup: {

//       display: "flex",

//       alignItems: "center",

//       gap: "10px",

//     },

//     filterLabel: {

//       margin: 0,

//       fontWeight: "normal",

//     },

//     filterSelect: {

//       width: "auto",

//       minWidth: "150px",

//       padding: "5px 10px",

//       border: "1px solid #ddd",

//       borderRadius: "4px",

//     },

//     holidaysTable: {

//       width: "100%",

//       borderCollapse: "collapse",

//     },

//     tableHeader: {

//       backgroundColor: '#344054', // New charcoal color

//       color: "white",

//       padding: "12px",

//       textAlign: "left",

//       cursor: "pointer",

//       userSelect: "none",

//     },

//     tableHeaderHover: {

//       backgroundColor: "#475467",

//     },

//     tableCell: {

//       padding: "12px",

//       borderBottom: "1px solid #e0e0e0",

//     },

//     tableRowHover: {

//       backgroundColor: "#f8f9fa",

//     },

//     statusBadge: {

//       padding: "4px 8px",

//       borderRadius: "12px",

//       fontSize: "12px",

//       fontWeight: "bold",

//       textTransform: "uppercase",

//     },

//     statusPublished: {

//       backgroundColor: "#d4edda",

//       color: "#155724",

//     },

//     statusRestricted: {

//       backgroundColor: "#f8d7da",

//       color: "#721c24",

//     },

//     actionButton: {

//       padding: "6px 10px",

//       marginRight: "5px",

//       border: "none",

//       borderRadius: "4px",

//       cursor: "pointer",

//       fontSize: "14px",

//       backgroundColor: 'transparent',

//       transition: "opacity 0.3s ease",

//     },

//     editButtonIcon: {

//       color: '#2E90FA', // Blue icon color

//     },

//     deleteButtonIcon: {

//       color: '#D92D20', // Red icon color

//     },

//     actionButtonDisabled: {

//       opacity: 0.6,

//       cursor: "not-allowed",

//     },

//     pagination: {

//       display: "flex",

//       justifyContent: "space-between",

//       alignItems: "center",

//       padding: "20px",

//       background: "#f8f9fa",

//       borderTop: "1px solid #e0e0e0",

//     },

//     // ... (rest of the styles are unchanged)

//     paginationControls: {

//       display: "flex",

//       gap: "5px",

//     },

//     paginationButton: {

//       padding: "8px 12px",

//       border: "1px solid #ddd",

//       background: "white",

//       cursor: "pointer",

//       borderRadius: "4px",

//     },

//     paginationButtonActive: {

//       backgroundColor: vibrantPurple,

//       color: "white",

//       borderColor: vibrantPurple,

//     },

//     paginationButtonDisabled: {

//       opacity: 0.6,

//       cursor: "not-allowed",

//     },

//     calendarContent: {

//       flexDirection: "row",

//     },

//     eventsSidebar: {

//       flex: "0 0 200px",

//       background: "#f8f9fa",

//       padding: "20px",

//       borderRadius: "8px",

//       marginRight: "20px",

//     },

//     calendarContainer: {

//       flex: 1,

//     },

//     eventTypes: {

//       marginTop: "15px",

//     },

//     eventType: {

//       display: "flex",

//       alignItems: "center",

//       marginBottom: "10px",

//       fontSize: "14px",

//     },

//     eventTypeSpan: {

//       width: "12px",

//       height: "12px",

//       borderRadius: "50%",

//       marginRight: "8px",

//     },

//     eventTypePublished: {

//       backgroundColor: "#28a745",

//     },

//     eventTypeRestricted: {

//       backgroundColor: "#dc3545",

//     },

//     calendarView: {

//       background: "white",

//       borderRadius: "8px",

//       boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",

//       overflow: "hidden",

//     },

//     calendarHeader: {

//       padding: "20px",

//       background: "#f8f9fa",

//       borderBottom: "1px solid #e0e0e0",

//       display: "flex",

//       justifyContent: "space-between",

//       alignItems: "center",

//       flexWrap: "wrap",

//       gap: "15px",

//     },

//     calendarNavigation: {

//       display: "flex",

//       alignItems: "center",

//       gap: "10px",

//     },

//     navButton: {

//       padding: "8px 12px",

//       border: "1px solid #ddd",

//       background: "white",

//       cursor: "pointer",

//       borderRadius: "4px",

//     },

//     todayButton: {

//       padding: "8px 12px",

//       border: "1px solid #ddd",

//       background: "white",

//       cursor: "pointer",

//       borderRadius: "4px",

//     },

//     calendarTitle: {

//       fontSize: "18px",

//       fontWeight: "bold",

//       color: "#333",

//     },

//     calendarFilters: {

//       display: "flex",

//       gap: "15px",

//       flexWrap: "wrap",

//     },

//     viewOptions: {

//       display: "flex",

//       gap: "5px",

//     },

//     viewOption: {

//       padding: "6px 12px",

//       border: "1px solid #ddd",

//       background: "white",

//       cursor: "pointer",

//       borderRadius: "4px",

//       textTransform: "capitalize",

//     },

//     viewOptionActive: {

//       backgroundColor: vibrantPurple,

//       color: "white",

//       borderColor: vibrantPurple,

//     },

//     calendarGrid: {

//       padding: "20px",

//     },

//     calendarDaysHeader: {

//       display: "grid",

//       gridTemplateColumns: "repeat(7, 1fr)",

//       gap: "1px",

//       marginBottom: "10px",

//     },

//     calendarHeaderCell: {

//       padding: "10px",

//       textAlign: "center",

//       fontWeight: "bold",

//       backgroundColor: "#f8f9fa",

//       border: "1px solid #e0e0e0",

//     },

//     calendarDays: {

//       display: "grid",

//       gridTemplateColumns: "repeat(7, 1fr)",

//       gap: "1px",

//     },

//     calendarDay: {

//       minHeight: "100px",

//       padding: "8px",

//       border: "1px solid #e0e0e0",

//       background: "white",

//       position: "relative",

//     },

//     calendarDayOtherMonth: {

//       backgroundColor: "#f8f9fa",

//       color: "#6c757d",

//     },

//     calendarDayToday: {

//       backgroundColor: "#e3f2fd",

//       borderColor: "#2196f3",

//     },

//     dayNumber: {

//       fontWeight: "bold",

//       marginBottom: "5px",

//     },

//     dayHolidays: {

//       display: "flex",

//       flexDirection: "column",

//       gap: "2px",

//     },

//     holidayEvent: {

//       padding: "2px 6px",

//       borderRadius: "3px",

//       fontSize: "11px",

//       color: "white",

//       overflow: "hidden",

//       textOverflow: "ellipsis",

//       whiteSpace: "nowrap",

//     },

//     holidayEventPublished: {

//       backgroundColor: "#28a745",

//     },

//     holidayEventRestricted: {

//       backgroundColor: "#dc3545",

//     },

//     errorMessage: {

//       backgroundColor: "#f8d7da",

//       color: "#721c24",

//       padding: "10px",

//       border: "1px solid #f5c6cb",

//       borderRadius: "4px",

//       marginBottom: "15px",

//     },

//     loadingMessage: {

//       textAlign: "center",

//       padding: "20px",

//       color: "#6c757d",

//     },

//   }

 

//   // API Functions

//   const fetchHolidays = async () => {

//     setLoading(true);

//     try {

//       const response = await axiosInstance.get("https://tdtlworld.com/hrms-backend/api/holiday/");

//       const holidaysFromAPI = response.data.data || [];

 

//       const mappedHolidays = holidaysFromAPI.map((holiday) => ({

//         id: holiday.holiday_id,

//         event_name: holiday.event_name,

//         start_date: formatDateFromAPI(holiday.start_date),

//         endDate: formatDateFromAPI(holiday.end_date),

//         description: holiday.description || "",

//         status: holiday.status == 1 ? "Published" : "Restricted",

//         country: holiday.country,

//         state: holiday.state,

//         employee_hub_name: holiday.employee_hub_name || "N/A",

//       }));

//       setHolidays(mappedHolidays);

//     } catch (error) {

//       console.error("Error fetching holidays:", error);

//       setError("Failed to load holidays");

//     } finally {

//       setLoading(false);

//     }

//   };

 

//   const createHoliday = async () => {

//     setLoading(true);

//     try {

//       const payload = {

//         state: selectedState,

//         employee_hub: selectedHub,

//         country: selectedCountryId,

//         event_name: eventTitle,

//         start_date: startDate,

//         end_date: endDate,

//         description,

//         is_publish: status === "Published" ? 1 : 0,

//       };

//       await axiosInstance.post("api/holiday/", payload);

//       await fetchHolidays();

//       resetForm();

//     } catch (error) {

//       console.error("Failed to create holiday:", error);

//       setError("Failed to create holiday.");

//     } finally {

//       setLoading(false);

//     }

//   };

 

//   const updateHoliday = async () => {

//     setLoading(true);

//     try {

//       const payload = {

//         holiday_id: editingHolidayId,

//         state: selectedState,

//         employee_hub: selectedHub,

//         country: selectedCountryId,

//         event_name: eventTitle,

//         start_date: startDate,

//         end_date: endDate,

//         description,

//         is_publish: status === "Published" ? 1 : 0,

//       };

//       await axiosInstance.put("api/holiday/", payload);

//       await fetchHolidays();

//       resetForm();

//     } catch (error) {

//       console.error("Failed to update holiday:", error);

//       setError("Failed to update holiday.");

//     } finally {

//       setLoading(false);

//     }

//   };

 

//   const deleteHoliday = async (holidayId) => {

//     if (!window.confirm("Are you sure you want to delete this holiday?")) return;

//     setLoading(true);

//     try {

//       await axiosInstance.delete("api/holiday/", { data: { holiday_id: holidayId } });

//       await fetchHolidays();

//     } catch (error) {

//       console.error("Failed to delete holiday:", error);

//       setError("Failed to delete holiday.");

//     } finally {

//       setLoading(false);

//     }

//   };

 

//   // Initial data fetching

//   useEffect(() => {

//     fetchHolidays();

//     const fetchCountries = async () => {

//       try {

//         const response = await axiosInstance.get("https://tdtlworld.com/hrms-backend/api/countries/");

//         setCountries(response.data.data || []);

//       } catch (error) {

//         console.error("Failed to fetch countries:", error);

//       }

//     };

//     fetchCountries();

//   }, []);

 

//   // Fetch states for the ADD/EDIT FORM when its country changes

//   useEffect(() => {

//     if (selectedCountry) {

//       const fetchStates = async () => {

//         try {

//           const response = await axiosInstance.get(`https://tdtlworld.com/hrms-backend/api/states/?country_name=${selectedCountry}`);

//           setFormStates(response.data.data || []);

//         } catch (error) {

//           console.error("Failed to fetch states for form:", error);

//           setFormStates([]);

//         }

//       };

//       fetchStates();

//     } else {

//       setFormStates([]);

//       setSelectedState("");

//     }

//   }, [selectedCountry]);

 

//   // Fetch HUBS for the ADD/EDIT FORM when its state changes

//   useEffect(() => {

//     if (selectedState && typeof selectedState === 'number') {

//       const fetchHubsForState = async () => {

//         try {

//           const response = await axiosInstance.get(`https://tdtlworld.com/hrms-backend/api/employee_hub_dropdown/${selectedState}/`);

//           setHubOptions(response.data.data || []);

//         } catch (error) {

//           console.error("Failed to fetch hubs for form:", error);

//           setHubOptions([]);

//         }

//       };

//       fetchHubsForState();

//     } else {

//       setHubOptions([]);

//     }

//   }, [selectedState]);

 

//   // Fetch states for the FILTER DROPDOWNS when its country changes

//   useEffect(() => {

//     if (filterCountry) {

//       const fetchStates = async () => {

//         try {

//           const response = await axiosInstance.get(`https://tdtlworld.com/hrms-backend/api/states/?country_name=${filterCountry}`);

//           setFilterStates(response.data.data || []);

//         } catch (error) {

//           console.error("Failed to fetch states for filter:", error);

//           setFilterStates([]);

//         }

//       };

//       fetchStates();

//     } else {

//       setFilterStates([]);

//       setFilterState("");

//     }

//   }, [filterCountry]);

 

//   // Fetch HUBS for the FILTER DROPDOWNS when the state filter changes

//   useEffect(() => {

//     const fetchHubsForFilter = async () => {

//       const selectedStateObj = filterStates.find(s => s.state_name === filterState);

//       if (selectedStateObj) {

//         try {

//           const response = await axiosInstance.get(`https://tdtlworld.com/hrms-backend/api/employee_hub_dropdown/${selectedStateObj.state_id}/`);

//           setFilterHubOptions(response.data.data || []);

//         } catch (error) {

//           console.error("Failed to fetch hubs for filter:", error);

//           setFilterHubOptions([]);

//         }

//       } else {

//         setFilterHubOptions([]);

//       }

//     };

 

//     if (filterState) {

//       fetchHubsForFilter();

//     } else {

//       setFilterHubOptions([]);

//       setFilterHub("");

//     }

//   }, [filterState, filterStates]);

 

//   // When editing, convert state NAME to state ID after states are fetched

//   useEffect(() => {

//     if (isEditing && formStates.length > 0 && typeof selectedState === 'string') {

//       const stateToSet = formStates.find(s => s.state_name === selectedState);

//       if (stateToSet) {

//         setSelectedState(stateToSet.state_id);

//       }

//     }

//   }, [formStates, isEditing, selectedState]);

 

//   // When editing, select the correct hub ID after the hubs for the state are fetched

//   useEffect(() => {

//     if (isEditing && hubOptions.length > 0 && initialHubNameToSelect) {

//       const hubToSet = hubOptions.find(h => h.employee_hub_name.trim() === initialHubNameToSelect.trim());

//       if (hubToSet) {

//         setSelectedHub(hubToSet.employee_hub_id);

//       }

//       setInitialHubNameToSelect(null);

//     }

//   }, [hubOptions, isEditing, initialHubNameToSelect]);

 

//   const handleAddNewClick = () => {

//     resetForm();

//     setIsEditing(false);

//     setIsFormVisible(true);

//   };

 

//   const handleCancelClick = () => {

//     resetForm();

//     setIsFormVisible(false);

//   }

 

//   // Helper functions for date formatting

//   const formatDateFromAPI = (apiDate) => {

//     if (!apiDate) return ""

//     const date = new Date(apiDate)

//     return new Intl.DateTimeFormat('en-GB').format(date);

//   }

 

//   const formatDateForInput = (dateString_ddmmyyyy) => {

//     if (!dateString_ddmmyyyy) return ""

//     const parts = dateString_ddmmyyyy.split("/")

//     if (parts.length !== 3) return ""

//     return `${parts[2]}-${parts[1].padStart(2, "0")}-${parts[0].padStart(2, "0")}`

//   }

 

//   const parseDate = (dateString_ddmmyyyy) => {

//     if (!dateString_ddmmyyyy || typeof dateString_ddmmyyyy !== "string") {

//       return new Date("");

//     }

//     const parts = dateString_ddmmyyyy.split("/");

//     if (parts.length !== 3) return new Date("");

//     const [day, month, year] = parts;

//     return new Date(year, month - 1, day);

//   };

 

//   // Handle form submission

//   const handleSubmit = async (e) => {

//     e.preventDefault()

//     if (!eventTitle || !startDate || !endDate || !description || !selectedCountryId || !selectedState || !selectedHub) {

//       alert("Please fill in all required fields.")

//       return

//     }

//     if (new Date(startDate) > new Date(endDate)) {

//       alert("End date cannot be before start date.")

//       return

//     }

 

//     try {

//       if (isEditing) {

//         await updateHoliday()

//       } else {

//         await createHoliday()

//       }

//     } catch (err) {

//       // Errors handled in API functions

//     }

//   }

 

//   // Reset form fields and hide form

//   const resetForm = () => {

//     setEventTitle("");

//     setStartDate("");

//     setEndDate("");

//     setDescription("");

//     setSelectedCountry("");

//     setSelectedCountryId("");

//     setSelectedState("");

//     setSelectedHub("");

//     setStatus("Published");

//     setIsEditing(false);

//     setEditingHolidayId(null);

//     setInitialHubNameToSelect(null);

//     setError("");

//     setIsFormVisible(false); // Hide form on reset

//   };

 

//   // Handle Edit

//   const handleEdit = (id) => {

//     const holidayToEdit = holidays.find((h) => h.id === id)

//     if (holidayToEdit) {

//       window.scrollTo(0, 0)

 

//       setEventTitle(holidayToEdit.event_name)

//       setStartDate(formatDateForInput(holidayToEdit.start_date))

//       setEndDate(formatDateForInput(holidayToEdit.endDate))

//       setDescription(holidayToEdit.description)

//       setStatus(holidayToEdit.status)

//       setEditingHolidayId(id)

//       setIsEditing(true)

 

//       if (holidayToEdit.employee_hub_name && holidayToEdit.employee_hub_name !== "N/A") {

//         setInitialHubNameToSelect(holidayToEdit.employee_hub_name);

//       } else {

//         setInitialHubNameToSelect(null);

//         setSelectedHub("");

//       }

 

//       const countryObj = countries.find(c => c.country_name === holidayToEdit.country);

//       if (countryObj) {

//         setSelectedCountryId(countryObj.country_id);

//       }

 

//       setSelectedCountry(holidayToEdit.country);

//       setSelectedState(holidayToEdit.state);

//       setIsFormVisible(true); // Show form

//     }

//   }

 

//   // Handle Delete

//   const handleDelete = async (id) => {

//     await deleteHoliday(id)

//   }

 

//   // Handle sorting

//   const handleSort = (field) => {

//     const newDirection = (sortField === field && sortDirection === "asc") ? "desc" : "asc";

//     setSortField(field);

//     setSortDirection(newDirection);

//     setCurrentPage(1);

//   }

 

//   // Get sorted and filtered holidays

//   const getSortedAndFilteredHolidays = () => {

//     let filteredHolidays = [...holidays]

 

//     if (filterCountry) {

//       filteredHolidays = filteredHolidays.filter((holiday) => holiday.country === filterCountry)

//       if (filterState) {

//         filteredHolidays = filteredHolidays.filter((holiday) => holiday.state === filterState)

//       }

//     }

//     if (filterHub) {

//       const hubMatch = filterHubOptions.find(h => h.employee_hub_id == filterHub);

//       if (hubMatch) {

//         filteredHolidays = filteredHolidays.filter(

//           (holiday) => holiday.employee_hub_name.trim() === hubMatch.employee_hub_name.trim()

//         );

//       }

//     }

 

//     if (searchTerm) {

//       const lowercasedTerm = searchTerm.toLowerCase();

//       filteredHolidays = filteredHolidays.filter((holiday) =>

//         Object.values(holiday).some((value) => String(value).toLowerCase().includes(lowercasedTerm)),

//       )

//     }

 

//     if (sortField) {

//       filteredHolidays.sort((a, b) => {

//         let valA = a[sortField];

//         let valB = b[sortField];

//         let comparison = 0;

 

//         if (sortField === "startDate" || sortField === "endDate") {

//           comparison = parseDate(valA) - parseDate(valB);

//         } else {

//           comparison = String(valA).toLowerCase().localeCompare(String(valB).toLowerCase());

//         }

//         return sortDirection === "asc" ? comparison : -comparison;

//       });

//     }

//     return filteredHolidays;

//   }

 

//   const getPaginatedHolidays = () => {

//     const filteredHolidays = getSortedAndFilteredHolidays()

//     const startIndex = (currentPage - 1) * entriesPerPage

//     return filteredHolidays.slice(startIndex, startIndex + entriesPerPage)

//   }

 

//   const getTotalPages = () => Math.ceil(getSortedAndFilteredHolidays().length / entriesPerPage)

 

//   useEffect(() => { setCurrentPage(1) }, [entriesPerPage, searchTerm, filterCountry, filterState, filterHub]);

 

//   const handlePreviousPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

//   const handleNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, getTotalPages()));

 

//   // Calendar utility functions

//   const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate()

//   const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay()

 

//   const generateCalendarDays = () => {

//     const year = currentMonth.getFullYear()

//     const month = currentMonth.getMonth()

//     const daysInMonth = getDaysInMonth(year, month)

//     const firstDayOfMonthIndex = getFirstDayOfMonth(year, month)

//     const calendarDays = [];

 

//     const prevMonthLastDate = new Date(year, month, 0);

//     const prevMonth = prevMonthLastDate.getMonth();

//     const prevYear = prevMonthLastDate.getFullYear();

//     for (let i = firstDayOfMonthIndex; i > 0; i--) {

//       calendarDays.push({ day: prevMonthLastDate.getDate() - i + 1, month: prevMonth, year: prevYear, isCurrentMonth: false });

//     }

//     for (let i = 1; i <= daysInMonth; i++) {

//       calendarDays.push({ day: i, month, year, isCurrentMonth: true });

//     }

//     const nextMonth = (month + 1) % 12;

//     const nextYear = month === 11 ? year + 1 : year;

//     const remainingDays = 42 - calendarDays.length;

//     for (let i = 1; i <= remainingDays; i++) {

//       calendarDays.push({ day: i, month: nextMonth, year: nextYear, isCurrentMonth: false });

//     }

//     return calendarDays;

//   }

 

//   const getHolidaysForDay = (day, month, year) => {

//     const currentDateStr = new Intl.DateTimeFormat('en-GB').format(new Date(year, month, day));

//     const currentDateObj = parseDate(currentDateStr);

 

//     return holidays.filter((holiday) => {

//       const countryMatch = !filterCountry || holiday.country === filterCountry;

//       const stateMatch = !filterState || holiday.state === filterState;

 

//       const hubToCompare = filterHubOptions.find(h => h.employee_hub_id == filterHub);

//       const hubMatch = !filterHub || (hubToCompare && holiday.employee_hub_name.trim() === hubToCompare.employee_hub_name.trim());

 

//       if (!countryMatch || !stateMatch || !hubMatch) return false;

 

//       const holidayStartDateObj = parseDate(holiday.start_date);

//       const holidayEndDateObj = parseDate(holiday.endDate);

//       return currentDateObj >= holidayStartDateObj && currentDateObj <= holidayEndDateObj;

//     });

//   }

 

//   const goToPreviousMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))

//   const goToNextMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))

//   const goToToday = () => setCurrentMonth(new Date())

//   const getMonthName = (date) => date.toLocaleString("default", { month: "long" })

 

//   const handleFormCountryChange = (e) => {

//     const countryName = e.target.value;

//     const countryObj = countries.find(c => c.country_name === countryName);

//     setSelectedCountry(countryName);

//     setSelectedCountryId(countryObj ? countryObj.country_id : "");

//     setSelectedState("");

//   }

 

//   const handleFilterCountryChange = (e) => {

//     setFilterCountry(e.target.value)

//     setFilterState("")

//     setCurrentPage(1)

//   }

 

//   const handleFilterStateChange = (e) => {

//     setFilterState(e.target.value)

//     setFilterHub("");

//     setCurrentPage(1)

//   }

 

//   const handleFilterHubChange = (e) => {

//     setFilterHub(e.target.value);

//     setCurrentPage(1);

//   }

 

//   // Render list view

//   const renderListView = () => {

//     const paginatedHolidays = getPaginatedHolidays();

//     const totalFilteredHolidays = getSortedAndFilteredHolidays().length;

//     const startEntry = totalFilteredHolidays === 0 ? 0 : (currentPage - 1) * entriesPerPage + 1;

//     const endEntry = Math.min(startEntry + entriesPerPage - 1, totalFilteredHolidays);

 

//     return (

//       <div style={styles.listView}>

//         <div style={styles.listControls}>

//           <div style={styles.entriesSearchRow}>

//             <div style={styles.entriesSelector}>

//               <span>Show</span>

//               <select

//                 style={styles.filterSelect}

//                 value={entriesPerPage}

//                 onChange={(e) => setEntriesPerPage(Number(e.target.value))}

//               >

//                 <option value={5}>5</option>

//                 <option value={10}>10</option>

//                 <option value={25}>25</option>

//                 <option value={50}>50</option>

//                 <option value={100}>100</option>

//               </select>

//               <span>entries</span>

//             </div>

//             <div style={styles.searchBox}>

//               <span>Search:</span>

//               <input

//                 type="text"

//                 style={styles.searchInput}

//                 value={searchTerm}

//                 onChange={(e) => setSearchTerm(e.target.value)}

//                 placeholder="Search..."

//               />

//             </div>

//           </div>

//           <div style={styles.filterRow}>

//             <div style={styles.filterGroup}>

//               <label htmlFor="filterCountry" style={styles.filterLabel}>Country:</label>

//               <select

//                 id="filterCountry"

//                 style={styles.filterSelect}

//                 value={filterCountry}

//                 onChange={handleFilterCountryChange}

//               >

//                 <option value="">All Countries</option>

//                 {countries.map((c) => (

//                   <option key={c.country_id} value={c.country_name}>{c.country_name}</option>

//                 ))}

//               </select>

//             </div>

//             <div style={styles.filterGroup}>

//               <label htmlFor="filterState" style={styles.filterLabel}>State:</label>

//               <select

//                 id="filterState"

//                 style={styles.filterSelect}

//                 value={filterState}

//                 onChange={handleFilterStateChange}

//                 disabled={!filterCountry}

//               >

//                 <option value="">All States</option>

//                 {filterStates.map((s) => (

//                   <option key={s.state_id} value={s.state_name}>{s.state_name}</option>

//                 ))}

//               </select>

//             </div>

//             <div style={styles.filterGroup}>

//               <label htmlFor="filterHub" style={styles.filterLabel}>Hub:</label>

//               <select id="filterHub" style={styles.filterSelect} value={filterHub} onChange={handleFilterHubChange} disabled={!filterState || filterHubOptions.length === 0}>

//                 <option value="">All Hubs</option>

//                 {filterHubOptions.map((hub) => (

//                   <option key={hub.employee_hub_id} value={hub.employee_hub_id}>{hub.employee_hub_name}</option>

//                 ))}

//               </select>

//             </div>

//           </div>

//         </div>

 

//         {error && <div style={styles.errorMessage}>{error}</div>}

//         {loading && !isEditing && <div style={styles.loadingMessage}>Loading...</div>}

 

//         <div style={{ overflowX: 'auto' }}>

//           <table style={styles.holidaysTable}>

//             <thead>

//               <tr>

//                 <th style={styles.tableHeader} onClick={() => handleSort("event_name")}>EVENT TITLE</th>

//                 <th style={styles.tableHeader} onClick={() => handleSort("startDate")}>START DATE</th>

//                 <th style={styles.tableHeader} onClick={() => handleSort("endDate")}>END DATE</th>

//                 <th style={styles.tableHeader} onClick={() => handleSort("country")}>COUNTRY</th>

//                 <th style={styles.tableHeader} onClick={() => handleSort("state")}>STATE</th>

//                 <th style={styles.tableHeader} onClick={() => handleSort("employee_hub_name")}>EMPLOYEE HUB</th>

//                 <th style={styles.tableHeader} onClick={() => handleSort("status")}>STATUS</th>

//                 <th style={styles.tableHeader}>ACTIONS</th>

//               </tr>

//             </thead>

//             <tbody>

//               {paginatedHolidays.length > 0 ? (

//                 paginatedHolidays.map((holiday) => (

//                   <tr key={holiday.id}>

//                     <td style={styles.tableCell}>{holiday.event_name}</td>

//                     <td style={styles.tableCell}>{holiday.start_date}</td>

//                     <td style={styles.tableCell}>{holiday.endDate}</td>

//                     <td style={styles.tableCell}>{holiday.country}</td>

//                     <td style={styles.tableCell}>{holiday.state}</td>

//                     <td style={styles.tableCell}>{holiday.employee_hub_name}</td>

//                     <td style={styles.tableCell}>

//                       <span style={{ ...styles.statusBadge, ...(String(holiday.status).toLowerCase() === "published" ? styles.statusPublished : styles.statusRestricted) }}>{holiday.status}</span>

//                     </td>

//                     <td style={styles.tableCell}>

//                       <button onClick={() => handleEdit(holiday.id)} style={{ ...styles.actionButton, ...styles.editButtonIcon }} disabled={loading}><FontAwesomeIcon icon={faEdit} /></button>

//                       <button onClick={() => handleDelete(holiday.id)} style={{ ...styles.actionButton, ...styles.deleteButtonIcon }} disabled={loading}><FontAwesomeIcon icon={faTrash} /></button>

//                     </td>

//                   </tr>

//                 ))

//               ) : (

//                 <tr><td colSpan="8" style={{ ...styles.tableCell, textAlign: 'center' }}>No holidays found.</td></tr>

//               )}

//             </tbody>

//           </table>

//         </div>

 

//         <div style={styles.pagination}>

//           <div>Showing {startEntry} to {endEntry} of {totalFilteredHolidays} records</div>

//           <div style={styles.paginationControls}>

//             <button onClick={handlePreviousPage} disabled={currentPage === 1} style={{ ...styles.paginationButton, ...(currentPage === 1 ? styles.paginationButtonDisabled : {}) }}>Previous</button>

//             <button style={{ ...styles.paginationButton, ...styles.paginationButtonActive }}>{currentPage}</button>

//             <button onClick={handleNextPage} disabled={currentPage >= getTotalPages()} style={{ ...styles.paginationButton, ...(currentPage >= getTotalPages() ? styles.paginationButtonDisabled : {}) }}>Next</button>

//           </div>

//         </div>

//       </div>

//     )

//   }

 

//   // Render calendar view

//   const renderCalendarView = () => {

//     const calendarDays = generateCalendarDays();

//     const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

 

//     return (

//       <div style={styles.calendarView}>

//         <div style={styles.calendarHeader}>

//           <div style={styles.calendarNavigation}>

//             <button style={styles.navButton} onClick={goToPreviousMonth}><FontAwesomeIcon icon={faChevronLeft} /></button>

//             <button style={styles.todayButton} onClick={goToToday}>Today</button>

//             <button style={styles.navButton} onClick={goToNextMonth}><FontAwesomeIcon icon={faChevronRight} /></button>

//           </div>

//           <div style={styles.calendarTitle}>{getMonthName(currentMonth).toUpperCase()} {currentMonth.getFullYear()}</div>

//           <div style={styles.calendarFilters}>

//             <div style={styles.filterGroup}>

//               <label htmlFor="calendarFilterCountry" style={styles.filterLabel}>Country:</label>

//               <select id="calendarFilterCountry" style={styles.filterSelect} value={filterCountry} onChange={handleFilterCountryChange}>

//                 <option value="">All Countries</option>

//                 {countries.map((c) => (<option key={c.country_id} value={c.country_name}>{c.country_name}</option>))}

//               </select>

//             </div>

//             <div style={styles.filterGroup}>

//               <label htmlFor="calendarFilterState" style={styles.filterLabel}>State:</label>

//               <select id="calendarFilterState" style={styles.filterSelect} value={filterState} onChange={handleFilterStateChange} disabled={!filterCountry}>

//                 <option value="">All States</option>

//                 {filterStates.map((s) => (<option key={s.state_id} value={s.state_name}>{s.state_name}</option>))}

//               </select>

//             </div>

//             <div style={styles.filterGroup}>

//               <label htmlFor="calendarFilterHub" style={styles.filterLabel}>Hub:</label>

//               <select id="calendarFilterHub" style={styles.filterSelect} value={filterHub} onChange={handleFilterHubChange} disabled={!filterState || filterHubOptions.length === 0}>

//                 <option value="">All Hubs</option>

//                 {filterHubOptions.map((hub) => (

//                   <option key={hub.employee_hub_id} value={hub.employee_hub_id}>{hub.employee_hub_name}</option>

//                 ))}

//               </select>

//             </div>

//           </div>

//         </div>

 

//         <div style={styles.calendarGrid}>

//           <div style={styles.calendarDaysHeader}>

//             {daysOfWeek.map((day) => (<div key={day} style={styles.calendarHeaderCell}>{day}</div>))}

//           </div>

//           <div style={styles.calendarDays}>

//             {calendarDays.map((dayInfo, index) => {

//               const dayHolidays = getHolidaysForDay(dayInfo.day, dayInfo.month, dayInfo.year);

//               const isToday = new Date().toDateString() === new Date(dayInfo.year, dayInfo.month, dayInfo.day).toDateString();

//               return (

//                 <div key={index} style={{ ...styles.calendarDay, ...(!dayInfo.isCurrentMonth ? styles.calendarDayOtherMonth : {}), ...(isToday ? styles.calendarDayToday : {}) }}>

//                   <div style={styles.dayNumber}>{dayInfo.day}</div>

//                   <div style={styles.dayHolidays}>

//                     {dayHolidays.map((holiday) => (

//                       <div key={holiday.id} style={{ ...styles.holidayEvent, ...(holiday.status.toLowerCase() === "published" ? styles.holidayEventPublished : styles.holidayEventRestricted) }} title={`${holiday.event_name} (${holiday.country} - ${holiday.state})`}>

//                         {holiday.event_name}

//                       </div>

//                     ))}

//                   </div>

//                 </div>

//               )

//             })}

//           </div>

//         </div>

//       </div>

//     )

//   }

 

//   // Render holidays form and list view

//   const renderHolidaysView = () => {

//     return (

//       <div>

//         {isFormVisible ? (

//           <div style={styles.formSection}>

//             <h2>{isEditing ? "Edit Holiday" : "Add New Holiday"}</h2>

//             {error && <div style={styles.errorMessage}>{error}</div>}

//             <form onSubmit={handleSubmit}>

//               <div style={styles.formGroup}>

//                 <label htmlFor="eventTitle" style={styles.label}>Event Title <span style={styles.required}>*</span></label>

//                 <input type="text" id="eventTitle" style={styles.input} value={eventTitle} onChange={(e) => setEventTitle(e.target.value)} required disabled={loading} />

//               </div>

//               <div style={styles.formRow}>

//                 <div style={{ ...styles.formGroup, ...styles.formRowGroup }}>

//                   <label htmlFor="startDate" style={styles.label}>Start Date <span style={styles.required}>*</span></label>

//                   <input type="date" id="startDate" style={styles.input} value={startDate} onChange={(e) => setStartDate(e.target.value)} required disabled={loading} />

//                 </div>

//                <div style={{ ...styles.formGroup, ...styles.formRowGroup }}>

//   <label htmlFor="endDate" style={styles.label}>End Date <span style={styles.required}>*</span></label>

//   <input

//     type="date"

//     id="endDate"

//     style={styles.input}

//     value={endDate}

//     onChange={(e) => setEndDate(e.target.value)}

//     required

//     disabled={loading}

//     min={startDate} // <--- Add this line

//   />

// </div>

//               </div>

//               <div style={styles.formRow}>

//                 <div style={{ ...styles.formGroup, ...styles.formRowGroup }}>

//                   <label htmlFor="selectedCountry" style={styles.label}>Country <span style={styles.required}>*</span></label>

//                   <select id="selectedCountry" style={styles.input} value={selectedCountry} onChange={handleFormCountryChange} required disabled={loading}>

//                     <option value="">Select Country</option>

//                     {countries.map((c) => (<option key={c.country_id} value={c.country_name}>{c.country_name}</option>))}

//                   </select>

//                 </div>

//                 <div style={{ ...styles.formGroup, ...styles.formRowGroup }}>

//                   <label htmlFor="selectedState" style={styles.label}>State <span style={styles.required}>*</span></label>

//                   <select id="selectedState" style={styles.input} value={selectedState} onChange={(e) => setSelectedState(Number(e.target.value))} disabled={loading || !selectedCountry || formStates.length === 0} required>

//                     <option value="">Select State</option>

//                     {formStates.map((s) => (<option key={s.state_id} value={s.state_id}>{s.state_name}</option>))}

//                   </select>

//                 </div>

//               </div>

//               <div style={styles.formGroup}>

//                 <label htmlFor="selectedHub" style={styles.label}>Employee Hub <span style={styles.required}>*</span></label>

//                 <select id="selectedHub" style={styles.input} value={selectedHub} onChange={(e) => setSelectedHub(e.target.value)} required disabled={loading || !selectedState || hubOptions.length === 0}>

//                   <option value="">Select Hub</option>

//                   {hubOptions.map((hub) => (<option key={hub.employee_hub_id} value={hub.employee_hub_id}>{hub.employee_hub_name}</option>))}

//                 </select>

//               </div>

//               <div style={styles.formGroup}>

//                 <label htmlFor="description" style={styles.label}>Description <span style={styles.required}>*</span></label>

//                 <textarea id="description" style={styles.textarea} value={description} onChange={(e) => setDescription(e.target.value)} required disabled={loading} />

//               </div>

//               <div style={styles.formGroup}>

//                 <label htmlFor="status" style={styles.label}>Status</label>

//                 <select id="status" style={styles.input} value={status} onChange={(e) => setStatus(e.target.value)} disabled={loading}>

//                   <option value="Published">Published</option>

//                   <option value="Restricted">Restricted</option>

//                 </select>

//               </div>

//               <div style={styles.formActions}>

//                 <button type="submit" style={{ ...styles.saveButton, ...(loading ? styles.saveButtonDisabled : {}) }} disabled={loading}>{loading ? "Processing..." : isEditing ? "Update" : "Save"}</button>

//                 <button type="button" onClick={handleCancelClick} style={styles.cancelButton} disabled={loading}>Cancel</button>

//               </div>

//             </form>

//           </div>

//         ) : (

//           <div style={styles.viewSection}>

//             <div style={styles.viewSectionHeader}>

//               <h2>List All Holidays</h2>

//               <button style={styles.addNewButton} onClick={handleAddNewClick}>Add New Holiday</button>

//             </div>

//             {renderListView()}

//           </div>

//         )}

//       </div>

//     )

//   }

 

//   const renderCalendarViewWithSidebar = () => {

//     return (

//       <div style={{ ...styles.content, ...styles.calendarContent }}>

//         <div style={styles.eventsSidebar}>

//           <h2>Events Legend</h2>

//           <div style={styles.eventTypes}>

//             <div style={styles.eventType}><span style={{ ...styles.eventTypeSpan, ...styles.eventTypeRestricted }}></span>Restricted</div>

//             <div style={styles.eventType}><span style={{ ...styles.eventTypeSpan, ...styles.eventTypePublished }}></span>Published</div>

//           </div>

//         </div>

//         <div style={styles.calendarContainer}>{renderCalendarView()}</div>

//       </div>

//     )

//   }

 

//   return (

//     <div style={styles.holidaysContainer}>

//       <div style={styles.header}>

//         <div style={{ ...styles.titleSection, ...(viewMode === "holidays" ? styles.titleSectionActive : {}) }} onClick={() => setViewMode("holidays")}>

//           <div style={styles.titleText}>

//             <h1 style={styles.titleH1}>Holidays</h1>

//             <p style={styles.titleP}>Manage Holidays</p>

//           </div>

//         </div>

//         <div style={{ ...styles.viewToggle, ...(viewMode === "calendar" ? styles.viewToggleActive : {}) }} onClick={() => setViewMode("calendar")}>

//           <div style={styles.titleText}>

//             <h2 style={styles.titleH1}>Calendar View</h2>

//             <p style={styles.titleP}>Holidays Calendar</p>

//           </div>

//         </div>

//       </div>

//       {viewMode === "holidays" ? renderHolidaysView() : renderCalendarViewWithSidebar()}

//     </div>

//   )

// }












// import { useState, useEffect } from "react"
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
// import {
//   faSort,
//   faSortUp,
//   faSortDown,
//   faChevronLeft,
//   faChevronRight,
//   faEdit,
//   faTrash,
// } from "@fortawesome/free-solid-svg-icons"
// import axiosInstance from "../../utils/axiosInstance";
// export default function Holidays() {
//   // State for form inputs
//   const [eventTitle, setEventTitle] = useState("")
//   const [startDate, setStartDate] = useState("")
//   const [endDate, setEndDate] = useState("")
//   const [description, setDescription] = useState("")
//   const [status, setStatus] = useState("Published")
//   const [selectedCountry, setSelectedCountry] = useState("") // Stores country NAME for the form (used for state fetching)
//   const [selectedCountryId, setSelectedCountryId] = useState(""); // Stores country ID for the form (used for submission)
//   const [selectedState, setSelectedState] = useState("") // Stores state ID for the form
//   const [selectedHub, setSelectedHub] = useState("");     // Stores hub ID for the form
//   // State for API-driven dropdown options
//   const [countries, setCountries] = useState([]);
//   const [formStates, setFormStates] = useState([]);      // States for the form dropdown
//   const [hubOptions, setHubOptions] = useState([]);      // Hubs for the form dropdown (dynamic)
//   const [filterStates, setFilterStates] = useState([]);  // States for the filter dropdowns
//   const [filterHubOptions, setFilterHubOptions] = useState([]); // Hubs for the filter dropdown (dynamic)
//   // State for holidays list
//   const [holidays, setHolidays] = useState([])
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState("")
//   // State for pagination
//   const [currentPage, setCurrentPage] = useState(1)
//   const [entriesPerPage, setEntriesPerPage] = useState(5)
//   const [searchTerm, setSearchTerm] = useState("")
//   // State for sorting
//   const [sortField, setSortField] = useState("")
//   const [sortDirection, setSortDirection] = useState("asc")
//   // State for view mode
//   const [viewMode, setViewMode] = useState("holidays")
//   const [isFormVisible, setIsFormVisible] = useState(false); // Controls form visibility
//   // State for calendar
//   const [currentMonth, setCurrentMonth] = useState(new Date())
//   const [calendarView, setCalendarView] = useState("month")
//   // State for filtering
//   const [filterCountry, setFilterCountry] = useState("") // Stores country name for filtering
//   const [filterState, setFilterState] = useState("")     // Stores state NAME for filtering
//   const [filterHub, setFilterHub] = useState("");         // Stores hub ID for filtering
//   // State for editing
//   const [isEditing, setIsEditing] = useState(false)
//   const [editingHolidayId, setEditingHolidayId] = useState(null)
//   const [initialHubNameToSelect, setInitialHubNameToSelect] = useState(null); // Helper for edit auto-fill
//   // Styles object (UPDATED with new colors)
//   const vibrantPurple = '#7F56D9';
//   const styles = {
//     holidaysContainer: {
//       maxWidth: "1200px",

//       margin: "0 auto",

//       padding: "20px",

//       fontFamily: "Arial, sans-serif",

//     },

//     header: {

//       display: "flex",

//       justifyContent: "space-between",

//       alignItems: "center",

//       marginBottom: "30px",

//       borderBottom: "2px solid #e0e0e0",

//       paddingBottom: "20px",

//     },

//     titleSection: {

//       cursor: "pointer",

//       padding: "10px 20px",

//       borderRadius: "8px",

//       transition: "all 0.3s ease",

//       border: "1px solid #0c0000ff",

//     },

//     titleSectionActive: {

//       backgroundColor: vibrantPurple,

//       color: "white",

//     },

//     viewToggle: {

//       cursor: "pointer",

//       padding: "10px 20px",

//       borderRadius: "8px",

//       transition: "all 0.3s ease",
//        border: "1px solid #050000ff", 

//     },

//     viewToggleActive: {

//       backgroundColor: vibrantPurple,

//       color: "white",

//     },

//     titleText: {

//       margin: 0,

//     },

//     titleH1: {

//       margin: 0,

//       fontSize: "24px",

//     },

//     titleP: {

//       margin: "5px 0 0 0",

//       fontSize: "14px",

//       opacity: 0.8,

//     },

//     content: {

//       display: "flex",

//       gap: "30px",

//     },

//     contentColumn: {

//       flexDirection: "column",

//     },

//     formSection: {

//       background: "#f8f9fa",

//       padding: "25px",

//       borderRadius: "8px",

//       boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",

//       marginBottom: '30px', // Add some space when it appears

//     },

//     viewSection: {

//       flex: 1, // Take full width when form is hidden

//     },

//     viewSectionHeader: {

//       display: 'flex',

//       justifyContent: 'space-between',

//       alignItems: 'center',

//       marginBottom: '20px',

//     },

//     addNewButton: {

//       padding: "10px 20px",

//       border: `2px solid ${vibrantPurple}`,

//       borderRadius: "4px",

//       cursor: "pointer",

//       fontSize: "14px",

//       fontWeight: "bold",

//       backgroundColor: vibrantPurple,

//       color: "white",

//       transition: "background-color 0.3s ease",

//     },

//     formGroup: {

//       marginBottom: "20px",

//     },

//     formRow: {

//       display: "flex",

//       gap: "15px",

//     },

//     formRowGroup: {

//       flex: 1,

//     },

//     label: {

//       display: "block",

//       marginBottom: "5px",

//       fontWeight: "bold",

//       color: "#333",

//     },

//     required: {

//       color: "red",

//     },

//     input: {

//       width: "100%",

//       padding: "10px",

//       border: "1px solid #ddd",

//       borderRadius: "4px",

//       fontSize: "14px",

//       boxSizing: "border-box",

//     },

//     inputFocus: {

//       outline: "none",

//       borderColor: vibrantPurple,

//       boxShadow: `0 0 0 2px rgba(127, 86, 217, 0.25)`,

//     },

//     textarea: {

//       width: "100%",

//       padding: "10px",

//       border: "1px solid #ddd",

//       borderRadius: "4px",

//       fontSize: "14px",

//       resize: "vertical",

//       minHeight: "80px",

//       boxSizing: "border-box",

//     },

//     formActions: {

//       display: "flex",

//       gap: "10px",

//       marginTop: "25px",

//     },

//     saveButton: {

//       padding: "12px 24px",

//       border: `2px solid ${vibrantPurple}`,

//       borderRadius: "4px",

//       cursor: "pointer",

//       fontSize: "14px",

//       fontWeight: "bold",

//       backgroundColor: vibrantPurple,

//       color: "white",

//       transition: "background-color 0.3s ease",

//     },

//     saveButtonDisabled: {

//       backgroundColor: "#6c757d",

//       cursor: "not-allowed",

//     },

//     cancelButton: {

//       padding: "12px 24px",

//       border: "2px solid #6c757d",

//       borderRadius: "4px",

//       cursor: "pointer",

//       fontSize: "14px",

//       fontWeight: "bold",

//       backgroundColor: "#6c757d",

//       color: "white",

//     },

//     listView: {

//       background: "white",

//       borderRadius: "8px",

//       boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",

//       overflow: "hidden",

//     },

//     listControls: {

//       padding: "20px",

//       background: "#f8f9fa",

//       borderBottom: "1px solid #e0e0e0",

//     },

//     entriesSearchRow: {

//       display: "flex",

//       justifyContent: "space-between",

//       alignItems: "center",

//       marginBottom: "15px",

//     },

//     entriesSelector: {

//       display: "flex",

//       alignItems: "center",

//       gap: "10px",

//     },

//     searchBox: {

//       display: "flex",

//       alignItems: "center",

//       gap: "10px",

//     },

//     searchInput: {

//       width: "250px",

//       padding: "8px 12px",

//       border: `2px solid ${vibrantPurple}`,

//       borderRadius: "4px",

//     },

//     filterRow: {

//       display: "flex",

//       gap: "20px",

//       alignItems: "center",

//       flexWrap: "wrap",

//     },

//     filterGroup: {

//       display: "flex",

//       alignItems: "center",

//       gap: "10px",

//     },

//     filterLabel: {

//       margin: 0,

//       fontWeight: "normal",

//     },

//     filterSelect: {

//       width: "auto",

//       minWidth: "150px",

//       padding: "5px 10px",

//       border: "1px solid #ddd",

//       borderRadius: "4px",

//     },

//     holidaysTable: {

//       width: "100%",

//       borderCollapse: "collapse",

//     },

//     tableHeader: {

//       backgroundColor: '#344054', // New charcoal color

//       color: "white",

//       padding: "12px",

//       textAlign: "left",

//       cursor: "pointer",

//       userSelect: "none",

//     },

//     tableHeaderHover: {

//       backgroundColor: "#475467",

//     },

//     tableCell: {

//       padding: "12px",

//       borderBottom: "1px solid #e0e0e0",

//     },

//     tableRowHover: {

//       backgroundColor: "#f8f9fa",

//     },

//     statusBadge: {

//       padding: "4px 8px",

//       borderRadius: "12px",

//       fontSize: "12px",

//       fontWeight: "bold",

//       textTransform: "uppercase",

//     },

//     statusPublished: {

//       backgroundColor: "#d4edda",

//       color: "#155724",

//     },

//     statusRestricted: {

//       backgroundColor: "#f8d7da",

//       color: "#721c24",

//     },

//     actionButton: {

//       padding: "6px 10px",

//       marginRight: "5px",

//       border: "none",

//       borderRadius: "4px",

//       cursor: "pointer",

//       fontSize: "14px",

//       backgroundColor: 'transparent',

//       transition: "opacity 0.3s ease",

//     },

//     editButtonIcon: {

//       color: '#2E90FA', // Blue icon color

//     },

//     deleteButtonIcon: {

//       color: '#D92D20', // Red icon color

//     },

//     actionButtonDisabled: {

//       opacity: 0.6,

//       cursor: "not-allowed",

//     },

//     pagination: {

//       display: "flex",

//       justifyContent: "space-between",

//       alignItems: "center",

//       padding: "20px",

//       background: "#f8f9fa",

//       borderTop: "1px solid #e0e0e0",

//     },

//     // ... (rest of the styles are unchanged)

//     paginationControls: {

//       display: "flex",

//       gap: "5px",

//     },

//     paginationButton: {

//       padding: "8px 12px",

//       border: "1px solid #ddd",

//       background: "white",

//       cursor: "pointer",

//       borderRadius: "4px",

//     },

//     paginationButtonActive: {

//       backgroundColor: vibrantPurple,

//       color: "white",

//       borderColor: vibrantPurple,

//     },

//     paginationButtonDisabled: {

//       opacity: 0.6,

//       cursor: "not-allowed",

//     },

//     calendarContent: {

//       flexDirection: "row",

//     },

//     eventsSidebar: {

//       flex: "0 0 200px",

//       background: "#f8f9fa",

//       padding: "20px",

//       borderRadius: "8px",

//       marginRight: "20px",

//     },

//     calendarContainer: {

//       flex: 1,

//     },

//     eventTypes: {

//       marginTop: "15px",

//     },

//     eventType: {

//       display: "flex",

//       alignItems: "center",

//       marginBottom: "10px",

//       fontSize: "14px",

//     },

//     eventTypeSpan: {

//       width: "12px",

//       height: "12px",

//       borderRadius: "50%",

//       marginRight: "8px",

//     },

//     eventTypePublished: {

//       backgroundColor: "#28a745",

//     },

//     eventTypeRestricted: {

//       backgroundColor: "#dc3545",

//     },

//     calendarView: {

//       background: "white",

//       borderRadius: "8px",

//       boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",

//       overflow: "hidden",

//     },

//     calendarHeader: {

//       padding: "20px",

//       background: "#f8f9fa",

//       borderBottom: "1px solid #e0e0e0",

//       display: "flex",

//       justifyContent: "space-between",

//       alignItems: "center",

//       flexWrap: "wrap",

//       gap: "15px",

//     },

//     calendarNavigation: {

//       display: "flex",

//       alignItems: "center",

//       gap: "10px",

//     },

//     navButton: {

//       padding: "8px 12px",

//       border: "1px solid #ddd",

//       background: "white",

//       cursor: "pointer",

//       borderRadius: "4px",

//     },

//     todayButton: {

//       padding: "8px 12px",

//       border: "1px solid #ddd",

//       background: "white",

//       cursor: "pointer",

//       borderRadius: "4px",

//     },

//     calendarTitle: {

//       fontSize: "18px",

//       fontWeight: "bold",

//       color: "#333",

//     },

//     calendarFilters: {

//       display: "flex",

//       gap: "15px",

//       flexWrap: "wrap",

//     },

//     viewOptions: {

//       display: "flex",

//       gap: "5px",

//     },

//     viewOption: {

//       padding: "6px 12px",

//       border: "1px solid #ddd",

//       background: "white",

//       cursor: "pointer",

//       borderRadius: "4px",

//       textTransform: "capitalize",

//     },

//     viewOptionActive: {

//       backgroundColor: vibrantPurple,

//       color: "white",

//       borderColor: vibrantPurple,

//     },

//     calendarGrid: {

//       padding: "20px",

//     },

//     calendarDaysHeader: {

//       display: "grid",

//       gridTemplateColumns: "repeat(7, 1fr)",

//       gap: "1px",

//       marginBottom: "10px",

//     },

//     calendarHeaderCell: {

//       padding: "10px",

//       textAlign: "center",

//       fontWeight: "bold",

//       backgroundColor: "#f8f9fa",

//       border: "1px solid #e0e0e0",

//     },

//     calendarDays: {

//       display: "grid",

//       gridTemplateColumns: "repeat(7, 1fr)",

//       gap: "1px",

//     },

//     calendarDay: {

//       minHeight: "100px",

//       padding: "8px",

//       border: "1px solid #e0e0e0",

//       background: "white",

//       position: "relative",

//     },

//     calendarDayOtherMonth: {

//       backgroundColor: "#f8f9fa",

//       color: "#6c757d",

//     },

//     calendarDayToday: {

//       backgroundColor: "#e3f2fd",

//       borderColor: "#2196f3",

//     },

//     dayNumber: {

//       fontWeight: "bold",

//       marginBottom: "5px",

//     },

//     dayHolidays: {

//       display: "flex",

//       flexDirection: "column",

//       gap: "2px",

//     },

//     holidayEvent: {

//       padding: "2px 6px",

//       borderRadius: "3px",

//       fontSize: "11px",

//       color: "white",

//       overflow: "hidden",

//       textOverflow: "ellipsis",

//       whiteSpace: "nowrap",

//     },

//     holidayEventPublished: {

//       backgroundColor: "#28a745",

//     },

//     holidayEventRestricted: {

//       backgroundColor: "#dc3545",

//     },

//     errorMessage: {

//       backgroundColor: "#f8d7da",

//       color: "#721c24",

//       padding: "10px",

//       border: "1px solid #f5c6cb",

//       borderRadius: "4px",

//       marginBottom: "15px",

//     },

//     loadingMessage: {

//       textAlign: "center",

//       padding: "20px",

//       color: "#6c757d",

//     },

//   }

 

//   // API Functions

//   const fetchHolidays = async () => {

//     setLoading(true);

//     try {

//       const response = await axiosInstance.get("https://tdtlworld.com/hrms-backend/api/holiday/");

//       const holidaysFromAPI = response.data.data || [];

 

//       const mappedHolidays = holidaysFromAPI.map((holiday) => ({

//         id: holiday.holiday_id,

//         event_name: holiday.event_name,

//         start_date: formatDateFromAPI(holiday.start_date),

//         endDate: formatDateFromAPI(holiday.end_date),

//         description: holiday.description || "",

//         status: holiday.status == 1 ? "Published" : "Restricted",

//         country: holiday.country,

//         state: holiday.state,

//         employee_hub_name: holiday.employee_hub_name || "N/A",

//       }));

//       setHolidays(mappedHolidays);

//     } catch (error) {

//       console.error("Error fetching holidays:", error);

//       setError("Failed to load holidays");

//     } finally {

//       setLoading(false);

//     }

//   };

 

//   const createHoliday = async () => {

//     setLoading(true);

//     try {

//       const payload = {

//         state: selectedState,

//         employee_hub: selectedHub,

//         country: selectedCountryId,

//         event_name: eventTitle,

//         start_date: startDate,

//         end_date: endDate,

//         description,

//         is_publish: status === "Published" ? 1 : 0,

//       };

//       await axiosInstance.post("api/holiday/", payload);

//       await fetchHolidays();

//       resetForm();

//     } catch (error) {

//       console.error("Failed to create holiday:", error);

//       setError("Failed to create holiday.");

//     } finally {

//       setLoading(false);

//     }

//   };

 

//   const updateHoliday = async () => {

//     setLoading(true);

//     try {

//       const payload = {

//         holiday_id: editingHolidayId,

//         state: selectedState,

//         employee_hub: selectedHub,

//         country: selectedCountryId,

//         event_name: eventTitle,

//         start_date: startDate,

//         end_date: endDate,

//         description,

//         is_publish: status === "Published" ? 1 : 0,

//       };

//       await axiosInstance.put("api/holiday/", payload);

//       await fetchHolidays();

//       resetForm();

//     } catch (error) {

//       console.error("Failed to update holiday:", error);

//       setError("Failed to update holiday.");

//     } finally {

//       setLoading(false);

//     }

//   };

 

//   const deleteHoliday = async (holidayId) => {

//     if (!window.confirm("Are you sure you want to delete this holiday?")) return;

//     setLoading(true);

//     try {

//       await axiosInstance.delete("api/holiday/", { data: { holiday_id: holidayId } });

//       await fetchHolidays();

//     } catch (error) {

//       console.error("Failed to delete holiday:", error);

//       setError("Failed to delete holiday.");

//     } finally {

//       setLoading(false);

//     }

//   };

 

//   // Initial data fetching

//   useEffect(() => {

//     fetchHolidays();

//     const fetchCountries = async () => {

//       try {

//         const response = await axiosInstance.get("https://tdtlworld.com/hrms-backend/api/countries/");

//         setCountries(response.data.data || []);

//       } catch (error) {

//         console.error("Failed to fetch countries:", error);

//       }

//     };

//     fetchCountries();

//   }, []);

 

//   // Fetch states for the ADD/EDIT FORM when its country changes

//   useEffect(() => {

//     if (selectedCountry) {

//       const fetchStates = async () => {

//         try {

//           const response = await axiosInstance.get(`https://tdtlworld.com/hrms-backend/api/states/?country_name=${selectedCountry}`);

//           setFormStates(response.data.data || []);

//         } catch (error) {

//           console.error("Failed to fetch states for form:", error);

//           setFormStates([]);

//         }

//       };

//       fetchStates();

//     } else {

//       setFormStates([]);

//       setSelectedState("");

//     }

//   }, [selectedCountry]);

 

//   // Fetch HUBS for the ADD/EDIT FORM when its state changes

//   useEffect(() => {

//     if (selectedState && typeof selectedState === 'number') {

//       const fetchHubsForState = async () => {

//         try {

//           const response = await axiosInstance.get(`https://tdtlworld.com/hrms-backend/api/employee_hub_dropdown/${selectedState}/`);

//           setHubOptions(response.data.data || []);

//         } catch (error) {

//           console.error("Failed to fetch hubs for form:", error);

//           setHubOptions([]);

//         }

//       };

//       fetchHubsForState();

//     } else {

//       setHubOptions([]);

//     }

//   }, [selectedState]);

 

//   // Fetch states for the FILTER DROPDOWNS when its country changes

//   useEffect(() => {

//     if (filterCountry) {

//       const fetchStates = async () => {

//         try {

//           const response = await axiosInstance.get(`https://tdtlworld.com/hrms-backend/api/states/?country_name=${filterCountry}`);

//           setFilterStates(response.data.data || []);

//         } catch (error) {

//           console.error("Failed to fetch states for filter:", error);

//           setFilterStates([]);

//         }

//       };

//       fetchStates();

//     } else {

//       setFilterStates([]);

//       setFilterState("");

//     }

//   }, [filterCountry]);

 

//   // Fetch HUBS for the FILTER DROPDOWNS when the state filter changes

//   useEffect(() => {

//     const fetchHubsForFilter = async () => {

//       const selectedStateObj = filterStates.find(s => s.state_name === filterState);

//       if (selectedStateObj) {

//         try {

//           const response = await axiosInstance.get(`https://tdtlworld.com/hrms-backend/api/employee_hub_dropdown/${selectedStateObj.state_id}/`);

//           setFilterHubOptions(response.data.data || []);

//         } catch (error) {

//           console.error("Failed to fetch hubs for filter:", error);

//           setFilterHubOptions([]);

//         }

//       } else {

//         setFilterHubOptions([]);

//       }

//     };

 

//     if (filterState) {

//       fetchHubsForFilter();

//     } else {

//       setFilterHubOptions([]);

//       setFilterHub("");

//     }

//   }, [filterState, filterStates]);

 

//   // When editing, convert state NAME to state ID after states are fetched

//   useEffect(() => {

//     if (isEditing && formStates.length > 0 && typeof selectedState === 'string') {

//       const stateToSet = formStates.find(s => s.state_name === selectedState);

//       if (stateToSet) {

//         setSelectedState(stateToSet.state_id);

//       }

//     }

//   }, [formStates, isEditing, selectedState]);

 

//   // When editing, select the correct hub ID after the hubs for the state are fetched

//   useEffect(() => {

//     if (isEditing && hubOptions.length > 0 && initialHubNameToSelect) {

//       const hubToSet = hubOptions.find(h => h.employee_hub_name.trim() === initialHubNameToSelect.trim());

//       if (hubToSet) {

//         setSelectedHub(hubToSet.employee_hub_id);

//       }

//       setInitialHubNameToSelect(null);

//     }

//   }, [hubOptions, isEditing, initialHubNameToSelect]);

 

//   const handleAddNewClick = () => {

//     resetForm();

//     setIsEditing(false);

//     setIsFormVisible(true);

//   };

 

//   const handleCancelClick = () => {

//     resetForm();

//     setIsFormVisible(false);

//   }

 

//   // Helper functions for date formatting

//   const formatDateFromAPI = (apiDate) => {

//     if (!apiDate) return ""

//     const date = new Date(apiDate)

//     return new Intl.DateTimeFormat('en-GB').format(date);

//   }

 

//   const formatDateForInput = (dateString_ddmmyyyy) => {

//     if (!dateString_ddmmyyyy) return ""

//     const parts = dateString_ddmmyyyy.split("/")

//     if (parts.length !== 3) return ""

//     return `${parts[2]}-${parts[1].padStart(2, "0")}-${parts[0].padStart(2, "0")}`

//   }

 

//   const parseDate = (dateString_ddmmyyyy) => {

//     if (!dateString_ddmmyyyy || typeof dateString_ddmmyyyy !== "string") {

//       return new Date("");

//     }

//     const parts = dateString_ddmmyyyy.split("/");

//     if (parts.length !== 3) return new Date("");

//     const [day, month, year] = parts;

//     return new Date(year, month - 1, day);

//   };

 

//   // Handle form submission

//   const handleSubmit = async (e) => {

//     e.preventDefault()

//     if (!eventTitle || !startDate || !endDate || !description || !selectedCountryId || !selectedState || !selectedHub) {

//       alert("Please fill in all required fields.")

//       return

//     }

//     if (new Date(startDate) > new Date(endDate)) {

//       alert("End date cannot be before start date.")

//       return

//     }

 

//     try {

//       if (isEditing) {

//         await updateHoliday()

//       } else {

//         await createHoliday()

//       }

//     } catch (err) {

//       // Errors handled in API functions

//     }

//   }

 

//   // Reset form fields and hide form

//   const resetForm = () => {

//     setEventTitle("");

//     setStartDate("");

//     setEndDate("");

//     setDescription("");

//     setSelectedCountry("");

//     setSelectedCountryId("");

//     setSelectedState("");

//     setSelectedHub("");

//     setStatus("Published");

//     setIsEditing(false);

//     setEditingHolidayId(null);

//     setInitialHubNameToSelect(null);

//     setError("");

//     setIsFormVisible(false); // Hide form on reset

//   };

 

//   // Handle Edit

//   const handleEdit = (id) => {

//     const holidayToEdit = holidays.find((h) => h.id === id)

//     if (holidayToEdit) {

//       window.scrollTo(0, 0)

 

//       setEventTitle(holidayToEdit.event_name)

//       setStartDate(formatDateForInput(holidayToEdit.start_date))

//       setEndDate(formatDateForInput(holidayToEdit.endDate))

//       setDescription(holidayToEdit.description)

//       setStatus(holidayToEdit.status)

//       setEditingHolidayId(id)

//       setIsEditing(true)

 

//       if (holidayToEdit.employee_hub_name && holidayToEdit.employee_hub_name !== "N/A") {

//         setInitialHubNameToSelect(holidayToEdit.employee_hub_name);

//       } else {

//         setInitialHubNameToSelect(null);

//         setSelectedHub("");

//       }

 

//       const countryObj = countries.find(c => c.country_name === holidayToEdit.country);

//       if (countryObj) {

//         setSelectedCountryId(countryObj.country_id);

//       }

 

//       setSelectedCountry(holidayToEdit.country);

//       setSelectedState(holidayToEdit.state);

//       setIsFormVisible(true); // Show form

//     }

//   }

 

//   // Handle Delete

//   const handleDelete = async (id) => {

//     await deleteHoliday(id)

//   }

 

//   // Handle sorting

//   const handleSort = (field) => {

//     const newDirection = (sortField === field && sortDirection === "asc") ? "desc" : "asc";

//     setSortField(field);

//     setSortDirection(newDirection);

//     setCurrentPage(1);

//   }

 

//   // Get sorted and filtered holidays

//   const getSortedAndFilteredHolidays = () => {

//     let filteredHolidays = [...holidays]

 

//     if (filterCountry) {

//       filteredHolidays = filteredHolidays.filter((holiday) => holiday.country === filterCountry)

//       if (filterState) {

//         filteredHolidays = filteredHolidays.filter((holiday) => holiday.state === filterState)

//       }

//     }

//     if (filterHub) {

//       const hubMatch = filterHubOptions.find(h => h.employee_hub_id == filterHub);

//       if (hubMatch) {

//         filteredHolidays = filteredHolidays.filter(

//           (holiday) => holiday.employee_hub_name.trim() === hubMatch.employee_hub_name.trim()

//         );

//       }

//     }

 

//     if (searchTerm) {

//       const lowercasedTerm = searchTerm.toLowerCase();

//       filteredHolidays = filteredHolidays.filter((holiday) =>

//         Object.values(holiday).some((value) => String(value).toLowerCase().includes(lowercasedTerm)),

//       )

//     }

 

//     if (sortField) {

//       filteredHolidays.sort((a, b) => {

//         let valA = a[sortField];

//         let valB = b[sortField];

//         let comparison = 0;

 

//         if (sortField === "startDate" || sortField === "endDate") {

//           comparison = parseDate(valA) - parseDate(valB);

//         } else {

//           comparison = String(valA).toLowerCase().localeCompare(String(valB).toLowerCase());

//         }

//         return sortDirection === "asc" ? comparison : -comparison;

//       });

//     }

//     return filteredHolidays;

//   }

 

//   const getPaginatedHolidays = () => {

//     const filteredHolidays = getSortedAndFilteredHolidays()

//     const startIndex = (currentPage - 1) * entriesPerPage

//     return filteredHolidays.slice(startIndex, startIndex + entriesPerPage)

//   }

 

//   const getTotalPages = () => Math.ceil(getSortedAndFilteredHolidays().length / entriesPerPage)

 

//   useEffect(() => { setCurrentPage(1) }, [entriesPerPage, searchTerm, filterCountry, filterState, filterHub]);

 

//   const handlePreviousPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

//   const handleNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, getTotalPages()));

 

//   // Calendar utility functions

//   const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate()

//   const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay()

 

//   const generateCalendarDays = () => {

//     const year = currentMonth.getFullYear()

//     const month = currentMonth.getMonth()

//     const daysInMonth = getDaysInMonth(year, month)

//     const firstDayOfMonthIndex = getFirstDayOfMonth(year, month)

//     const calendarDays = [];

 

//     const prevMonthLastDate = new Date(year, month, 0);

//     const prevMonth = prevMonthLastDate.getMonth();

//     const prevYear = prevMonthLastDate.getFullYear();

//     for (let i = firstDayOfMonthIndex; i > 0; i--) {

//       calendarDays.push({ day: prevMonthLastDate.getDate() - i + 1, month: prevMonth, year: prevYear, isCurrentMonth: false });

//     }

//     for (let i = 1; i <= daysInMonth; i++) {

//       calendarDays.push({ day: i, month, year, isCurrentMonth: true });

//     }

//     const nextMonth = (month + 1) % 12;

//     const nextYear = month === 11 ? year + 1 : year;

//     const remainingDays = 42 - calendarDays.length;

//     for (let i = 1; i <= remainingDays; i++) {

//       calendarDays.push({ day: i, month: nextMonth, year: nextYear, isCurrentMonth: false });

//     }

//     return calendarDays;

//   }

 

//   const getHolidaysForDay = (day, month, year) => {

//     const currentDateStr = new Intl.DateTimeFormat('en-GB').format(new Date(year, month, day));

//     const currentDateObj = parseDate(currentDateStr);

 

//     return holidays.filter((holiday) => {

//       const countryMatch = !filterCountry || holiday.country === filterCountry;

//       const stateMatch = !filterState || holiday.state === filterState;

 

//       const hubToCompare = filterHubOptions.find(h => h.employee_hub_id == filterHub);

//       const hubMatch = !filterHub || (hubToCompare && holiday.employee_hub_name.trim() === hubToCompare.employee_hub_name.trim());

 

//       if (!countryMatch || !stateMatch || !hubMatch) return false;

 

//       const holidayStartDateObj = parseDate(holiday.start_date);

//       const holidayEndDateObj = parseDate(holiday.endDate);

//       return currentDateObj >= holidayStartDateObj && currentDateObj <= holidayEndDateObj;

//     });

//   }

 

//   const goToPreviousMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))

//   const goToNextMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))

//   const goToToday = () => setCurrentMonth(new Date())

//   const getMonthName = (date) => date.toLocaleString("default", { month: "long" })

 

//   const handleFormCountryChange = (e) => {

//     const countryName = e.target.value;

//     const countryObj = countries.find(c => c.country_name === countryName);

//     setSelectedCountry(countryName);

//     setSelectedCountryId(countryObj ? countryObj.country_id : "");

//     setSelectedState("");

//   }

 

//   const handleFilterCountryChange = (e) => {

//     setFilterCountry(e.target.value)

//     setFilterState("")

//     setCurrentPage(1)

//   }

 

//   const handleFilterStateChange = (e) => {

//     setFilterState(e.target.value)

//     setFilterHub("");

//     setCurrentPage(1)

//   }

 

//   const handleFilterHubChange = (e) => {

//     setFilterHub(e.target.value);

//     setCurrentPage(1);

//   }

 

//   // Render list view

//   const renderListView = () => {

//     const paginatedHolidays = getPaginatedHolidays();

//     const totalFilteredHolidays = getSortedAndFilteredHolidays().length;

//     const startEntry = totalFilteredHolidays === 0 ? 0 : (currentPage - 1) * entriesPerPage + 1;

//     const endEntry = Math.min(startEntry + entriesPerPage - 1, totalFilteredHolidays);

 

//     return (

//       <div style={styles.listView}>

//         <div style={styles.listControls}>

//           <div style={styles.entriesSearchRow}>

//             <div style={styles.entriesSelector}>

//               <span>Show</span>

//               <select

//                 style={styles.filterSelect}

//                 value={entriesPerPage}

//                 onChange={(e) => setEntriesPerPage(Number(e.target.value))}

//               >

//                 <option value={5}>5</option>

//                 <option value={10}>10</option>

//                 <option value={25}>25</option>

//                 <option value={50}>50</option>

//                 <option value={100}>100</option>

//               </select>

//               <span>entries</span>

//             </div>

//             <div style={styles.searchBox}>

//               <span>Search:</span>

//               <input

//                 type="text"

//                 style={styles.searchInput}

//                 value={searchTerm}

//                 onChange={(e) => setSearchTerm(e.target.value)}

//                 placeholder="Search..."

//               />

//             </div>

//           </div>

//           <div style={styles.filterRow}>

//             <div style={styles.filterGroup}>

//               <label htmlFor="filterCountry" style={styles.filterLabel}>Country:</label>

//               <select

//                 id="filterCountry"

//                 style={styles.filterSelect}

//                 value={filterCountry}

//                 onChange={handleFilterCountryChange}

//               >

//                 <option value="">All Countries</option>

//                 {countries.map((c) => (

//                   <option key={c.country_id} value={c.country_name}>{c.country_name}</option>

//                 ))}

//               </select>

//             </div>

//             <div style={styles.filterGroup}>

//               <label htmlFor="filterState" style={styles.filterLabel}>State:</label>

//               <select

//                 id="filterState"

//                 style={styles.filterSelect}

//                 value={filterState}

//                 onChange={handleFilterStateChange}

//                 disabled={!filterCountry}

//               >

//                 <option value="">All States</option>

//                 {filterStates.map((s) => (

//                   <option key={s.state_id} value={s.state_name}>{s.state_name}</option>

//                 ))}

//               </select>

//             </div>

//             <div style={styles.filterGroup}>

//               <label htmlFor="filterHub" style={styles.filterLabel}>Hub:</label>

//               <select id="filterHub" style={styles.filterSelect} value={filterHub} onChange={handleFilterHubChange} disabled={!filterState || filterHubOptions.length === 0}>

//                 <option value="">All Hubs</option>

//                 {filterHubOptions.map((hub) => (

//                   <option key={hub.employee_hub_id} value={hub.employee_hub_id}>{hub.employee_hub_name}</option>

//                 ))}

//               </select>

//             </div>

//           </div>

//         </div>

 

//         {error && <div style={styles.errorMessage}>{error}</div>}

//         {loading && !isEditing && <div style={styles.loadingMessage}>Loading...</div>}

 

//         <div style={{ overflowX: 'auto' }}>

//           <table style={styles.holidaysTable}>

//             <thead>

//               <tr>
//                 <th style={styles.tableHeader}>SR NO.</th>

//                 <th style={styles.tableHeader} onClick={() => handleSort("event_name")}>EVENT TITLE</th>

//                 <th style={styles.tableHeader} onClick={() => handleSort("startDate")}>START DATE</th>

//                 <th style={styles.tableHeader} onClick={() => handleSort("endDate")}>END DATE</th>

//                 <th style={styles.tableHeader} onClick={() => handleSort("country")}>COUNTRY</th>

//                 <th style={styles.tableHeader} onClick={() => handleSort("state")}>STATE</th>

//                 <th style={styles.tableHeader} onClick={() => handleSort("employee_hub_name")}>EMPLOYEE HUB</th>

//                 <th style={styles.tableHeader} onClick={() => handleSort("status")}>STATUS</th>

//                 <th style={styles.tableHeader}>ACTIONS</th>

//               </tr>

//             </thead>

//             <tbody>

//               {paginatedHolidays.length > 0 ? (

//                 paginatedHolidays.map((holiday, index) => (

//                   <tr key={holiday.id}>
//                     <td style={styles.tableCell}>{(currentPage - 1) * entriesPerPage + index + 1}</td>

//                     <td style={styles.tableCell}>{holiday.event_name}</td>

//                     <td style={styles.tableCell}>{holiday.start_date}</td>

//                     <td style={styles.tableCell}>{holiday.endDate}</td>

//                     <td style={styles.tableCell}>{holiday.country}</td>

//                     <td style={styles.tableCell}>{holiday.state}</td>

//                     <td style={styles.tableCell}>{holiday.employee_hub_name}</td>

//                     <td style={styles.tableCell}>

//                       <span style={{ ...styles.statusBadge, ...(String(holiday.status).toLowerCase() === "published" ? styles.statusPublished : styles.statusRestricted) }}>{holiday.status}</span>

//                     </td>

//                     <td style={styles.tableCell}>

//                       <button onClick={() => handleEdit(holiday.id)} style={{ ...styles.actionButton, ...styles.editButtonIcon }} disabled={loading}><FontAwesomeIcon icon={faEdit} /></button>

//                       <button onClick={() => handleDelete(holiday.id)} style={{ ...styles.actionButton, ...styles.deleteButtonIcon }} disabled={loading}><FontAwesomeIcon icon={faTrash} /></button>

//                     </td>

//                   </tr>

//                 ))

//               ) : (

//                 <tr><td colSpan="9" style={{ ...styles.tableCell, textAlign: 'center' }}>No holidays found.</td></tr>

//               )}

//             </tbody>

//           </table>

//         </div>

 

//         <div style={styles.pagination}>

//           <div>Showing {startEntry} to {endEntry} of {totalFilteredHolidays} records</div>

//           <div style={styles.paginationControls}>

//             <button onClick={handlePreviousPage} disabled={currentPage === 1} style={{ ...styles.paginationButton, ...(currentPage === 1 ? styles.paginationButtonDisabled : {}) }}>Previous</button>

//             <button style={{ ...styles.paginationButton, ...styles.paginationButtonActive }}>{currentPage}</button>

//             <button onClick={handleNextPage} disabled={currentPage >= getTotalPages()} style={{ ...styles.paginationButton, ...(currentPage >= getTotalPages() ? styles.paginationButtonDisabled : {}) }}>Next</button>

//           </div>

//         </div>

//       </div>

//     )

//   }

 

//   // Render calendar view

//   const renderCalendarView = () => {

//     const calendarDays = generateCalendarDays();

//     const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

 

//     return (

//       <div style={styles.calendarView}>

//         <div style={styles.calendarHeader}>

//           <div style={styles.calendarNavigation}>

//             <button style={styles.navButton} onClick={goToPreviousMonth}><FontAwesomeIcon icon={faChevronLeft} /></button>

//             <button style={styles.todayButton} onClick={goToToday}>Today</button>

//             <button style={styles.navButton} onClick={goToNextMonth}><FontAwesomeIcon icon={faChevronRight} /></button>

//           </div>

//           <div style={styles.calendarTitle}>{getMonthName(currentMonth).toUpperCase()} {currentMonth.getFullYear()}</div>

//           <div style={styles.calendarFilters}>

//             <div style={styles.filterGroup}>

//               <label htmlFor="calendarFilterCountry" style={styles.filterLabel}>Country:</label>

//               <select id="calendarFilterCountry" style={styles.filterSelect} value={filterCountry} onChange={handleFilterCountryChange}>

//                 <option value="">All Countries</option>

//                 {countries.map((c) => (<option key={c.country_id} value={c.country_name}>{c.country_name}</option>))}

//               </select>

//             </div>

//             <div style={styles.filterGroup}>

//               <label htmlFor="calendarFilterState" style={styles.filterLabel}>State:</label>

//               <select id="calendarFilterState" style={styles.filterSelect} value={filterState} onChange={handleFilterStateChange} disabled={!filterCountry}>

//                 <option value="">All States</option>

//                 {filterStates.map((s) => (<option key={s.state_id} value={s.state_name}>{s.state_name}</option>))}

//               </select>

//             </div>

//             <div style={styles.filterGroup}>

//               <label htmlFor="calendarFilterHub" style={styles.filterLabel}>Hub:</label>

//               <select id="calendarFilterHub" style={styles.filterSelect} value={filterHub} onChange={handleFilterHubChange} disabled={!filterState || filterHubOptions.length === 0}>

//                 <option value="">All Hubs</option>

//                 {filterHubOptions.map((hub) => (

//                   <option key={hub.employee_hub_id} value={hub.employee_hub_id}>{hub.employee_hub_name}</option>

//                 ))}

//               </select>

//             </div>

//           </div>

//         </div>

 

//         <div style={styles.calendarGrid}>

//           <div style={styles.calendarDaysHeader}>

//             {daysOfWeek.map((day) => (<div key={day} style={styles.calendarHeaderCell}>{day}</div>))}

//           </div>

//           <div style={styles.calendarDays}>

//             {calendarDays.map((dayInfo, index) => {

//               const dayHolidays = getHolidaysForDay(dayInfo.day, dayInfo.month, dayInfo.year);

//               const isToday = new Date().toDateString() === new Date(dayInfo.year, dayInfo.month, dayInfo.day).toDateString();

//               return (

//                 <div key={index} style={{ ...styles.calendarDay, ...(!dayInfo.isCurrentMonth ? styles.calendarDayOtherMonth : {}), ...(isToday ? styles.calendarDayToday : {}) }}>

//                   <div style={styles.dayNumber}>{dayInfo.day}</div>

//                   <div style={styles.dayHolidays}>

//                     {dayHolidays.map((holiday) => (

//                       <div key={holiday.id} style={{ ...styles.holidayEvent, ...(holiday.status.toLowerCase() === "published" ? styles.holidayEventPublished : styles.holidayEventRestricted) }} title={`${holiday.event_name} (${holiday.country} - ${holiday.state})`}>

//                         {holiday.event_name}

//                       </div>

//                     ))}

//                   </div>

//                 </div>

//               )

//             })}

//           </div>

//         </div>

//       </div>

//     )

//   }

 

//   // Render holidays form and list view

//   const renderHolidaysView = () => {

//     return (

//       <div>

//         {isFormVisible ? (

//           <div style={styles.formSection}>

//             <h2>{isEditing ? "Edit Holiday" : "Add New Holiday"}</h2>

//             {error && <div style={styles.errorMessage}>{error}</div>}

//             <form onSubmit={handleSubmit}>

//               <div style={styles.formGroup}>

//                 <label htmlFor="eventTitle" style={styles.label}>Event Title <span style={styles.required}>*</span></label>

//                 <input type="text" id="eventTitle" style={styles.input} value={eventTitle} onChange={(e) => setEventTitle(e.target.value)} required disabled={loading} />

//               </div>

//               <div style={styles.formRow}>

//                 <div style={{ ...styles.formGroup, ...styles.formRowGroup }}>

//                   <label htmlFor="startDate" style={styles.label}>Start Date <span style={styles.required}>*</span></label>

//                   <input type="date" id="startDate" style={styles.input} value={startDate} onChange={(e) => setStartDate(e.target.value)} required disabled={loading} />

//                 </div>

//                <div style={{ ...styles.formGroup, ...styles.formRowGroup }}>

//   <label htmlFor="endDate" style={styles.label}>End Date <span style={styles.required}>*</span></label>

//   <input

//     type="date"

//     id="endDate"

//     style={styles.input}

//     value={endDate}

//     onChange={(e) => setEndDate(e.target.value)}

//     required

//     disabled={loading}

//     min={startDate} // <--- Add this line

//   />

// </div>

//               </div>

//               <div style={styles.formRow}>

//                 <div style={{ ...styles.formGroup, ...styles.formRowGroup }}>

//                   <label htmlFor="selectedCountry" style={styles.label}>Country <span style={styles.required}>*</span></label>

//                   <select id="selectedCountry" style={styles.input} value={selectedCountry} onChange={handleFormCountryChange} required disabled={loading}>

//                     <option value="">Select Country</option>

//                     {countries.map((c) => (<option key={c.country_id} value={c.country_name}>{c.country_name}</option>))}

//                   </select>

//                 </div>

//                 <div style={{ ...styles.formGroup, ...styles.formRowGroup }}>

//                   <label htmlFor="selectedState" style={styles.label}>State <span style={styles.required}>*</span></label>

//                   <select id="selectedState" style={styles.input} value={selectedState} onChange={(e) => setSelectedState(Number(e.target.value))} disabled={loading || !selectedCountry || formStates.length === 0} required>

//                     <option value="">Select State</option>

//                     {formStates.map((s) => (<option key={s.state_id} value={s.state_id}>{s.state_name}</option>))}

//                   </select>

//                 </div>

//               </div>

//               <div style={styles.formGroup}>

//                 <label htmlFor="selectedHub" style={styles.label}>Employee Hub <span style={styles.required}>*</span></label>

//                 <select id="selectedHub" style={styles.input} value={selectedHub} onChange={(e) => setSelectedHub(e.target.value)} required disabled={loading || !selectedState || hubOptions.length === 0}>

//                   <option value="">Select Hub</option>

//                   {hubOptions.map((hub) => (<option key={hub.employee_hub_id} value={hub.employee_hub_id}>{hub.employee_hub_name}</option>))}

//                 </select>

//               </div>

//               <div style={styles.formGroup}>

//                 <label htmlFor="description" style={styles.label}>Description <span style={styles.required}>*</span></label>

//                 <textarea id="description" style={styles.textarea} value={description} onChange={(e) => setDescription(e.target.value)} required disabled={loading} />

//               </div>

//               <div style={styles.formGroup}>

//                 <label htmlFor="status" style={styles.label}>Status</label>

//                 <select id="status" style={styles.input} value={status} onChange={(e) => setStatus(e.target.value)} disabled={loading}>

//                   <option value="Published">Published</option>

//                   <option value="Restricted">Restricted</option>

//                 </select>

//               </div>

//               <div style={styles.formActions}>

//                 <button type="submit" style={{ ...styles.saveButton, ...(loading ? styles.saveButtonDisabled : {}) }} disabled={loading}>{loading ? "Processing..." : isEditing ? "Update" : "Save"}</button>

//                 <button type="button" onClick={handleCancelClick} style={styles.cancelButton} disabled={loading}>Cancel</button>

//               </div>

//             </form>

//           </div>

//         ) : (

//           <div style={styles.viewSection}>

//             <div style={styles.viewSectionHeader}>

//               <h2>List All Holidays</h2>

//               <button style={styles.addNewButton} onClick={handleAddNewClick}>Add New Holiday</button>

//             </div>

//             {renderListView()}

//           </div>

//         )}

//       </div>

//     )

//   }

 

//   const renderCalendarViewWithSidebar = () => {

//     return (

//       <div style={{ ...styles.content, ...styles.calendarContent }}>

//         <div style={styles.eventsSidebar}>

//           <h2>Events Legend</h2>

//           <div style={styles.eventTypes}>

//             <div style={styles.eventType}><span style={{ ...styles.eventTypeSpan, ...styles.eventTypeRestricted }}></span>Restricted</div>

//             <div style={styles.eventType}><span style={{ ...styles.eventTypeSpan, ...styles.eventTypePublished }}></span>Published</div>

//           </div>

//         </div>

//         <div style={styles.calendarContainer}>{renderCalendarView()}</div>

//       </div>

//     )

//   }

 

//   return (

//     <div style={styles.holidaysContainer}>

//       <div style={styles.header}>

//         <div style={{ ...styles.titleSection, ...(viewMode === "holidays" ? styles.titleSectionActive : {}) }} onClick={() => setViewMode("holidays")}>

//           <div style={styles.titleText}>

//             <h1 style={styles.titleH1}>Holidays</h1>

//             <p style={styles.titleP}>Manage Holidays</p>

//           </div>

//         </div>

//         <div style={{ ...styles.viewToggle, ...(viewMode === "calendar" ? styles.viewToggleActive : {}) }} onClick={() => setViewMode("calendar")}>

//           <div style={styles.titleText}>

//             <h2 style={styles.titleH1}>Calendar View</h2>

//             <p style={styles.titleP}>Holidays Calendar</p>

//           </div>

//         </div>

//       </div>

//       {viewMode === "holidays" ? renderHolidaysView() : renderCalendarViewWithSidebar()}

//     </div>

//   )

// }









// import { useState, useEffect } from "react";
// import axiosInstance from "../../utils/axiosInstance";
// import Swal from "sweetalert2";

// // MUI Components
// import {
//   Box,
//   Paper,
//   Typography,
//   Button,
//   TextField,
//   InputAdornment,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TablePagination,
//   IconButton,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   Skeleton,
//   CircularProgress,
//   useTheme,
//   useMediaQuery,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   ToggleButton,
//   ToggleButtonGroup,
//   Grid,
// } from "@mui/material";

// // MUI Icons
// import AddIcon from "@mui/icons-material/Add";
// import SearchIcon from "@mui/icons-material/Search";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
// import ChevronRightIcon from '@mui/icons-material/ChevronRight';
// import TodayIcon from '@mui/icons-material/Today';

// export default function Holidays() {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

//   // --- THEME COLORS ---
//   const PRIMARY_COLOR = "#8C257C";
//   const PRIMARY_DARK_COLOR = "#6d1d60";
//   const TEXT_ON_PRIMARY = "#FFFFFF";

//   // --- STATE MANAGEMENT ---
//   const [viewMode, setViewMode] = useState("holidays"); // 'holidays' or 'calendar'
//   const [currentMonth, setCurrentMonth] = useState(new Date());

//   // Form & Dialog State
//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [editingHolidayId, setEditingHolidayId] = useState(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   // Form Input State
//   const [eventTitle, setEventTitle] = useState("");
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");
//   const [description, setDescription] = useState("");
//   const [status, setStatus] = useState("Published");
//   const [selectedCountryId, setSelectedCountryId] = useState("");
//   const [selectedStateId, setSelectedStateId] = useState("");
//   const [selectedHubId, setSelectedHubId] = useState("");

//   // Data & API State
//   const [holidays, setHolidays] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [countries, setCountries] = useState([]);
//   const [states, setStates] = useState([]);
//   const [hubs, setHubs] = useState([]);
//   const [filterStates, setFilterStates] = useState([]);
//   const [filterHubs, setFilterHubs] = useState([]);

//   // Table State
//   const [searchTerm, setSearchTerm] = useState("");
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);

//   // Filter State
//   const [filterCountry, setFilterCountry] = useState("");
//   const [filterState, setFilterState] = useState("");
//   const [filterHub, setFilterHub] = useState("");

//   // --- API HELPER FUNCTIONS ---
//   const showToast = (icon, title, text) => {
//     Swal.fire({
//       icon, title, text, toast: true, position: 'top-end',
//       showConfirmButton: false, timer: 3000, timerProgressBar: true,
//     });
//   };

//   // --- API DATA FETCHING ---
//   const fetchHolidays = async () => {
//     setLoading(true);
//     try {
//       const response = await axiosInstance.get("https://tdtlworld.com/hrms-backend/api/holiday/");
//       const mappedHolidays = (response.data.data || []).map((h) => ({
//         id: h.holiday_id, event_name: h.event_name, start_date: h.start_date,
//         end_date: h.end_date, description: h.description || "",
//         status: h.status === 1 ? "Published" : "Restricted", country: h.country,
//         state: h.state, employee_hub_name: h.employee_hub_name || "N/A",
//       }));
//       setHolidays(mappedHolidays);
//     } catch (error) {
//       console.error("Error fetching holidays:", error);
//       showToast('error', 'Error', 'Failed to fetch holidays.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchDropdownData = async () => {
//     try {
//       const countryRes = await axiosInstance.get("https://tdtlworld.com/hrms-backend/api/countries/");
//       setCountries(countryRes.data.data || []);
//     } catch (error) {
//       console.error("Error fetching countries:", error);
//     }
//   };

//   useEffect(() => {
//     fetchHolidays();
//     fetchDropdownData();
//   }, []);

//   // Effect for Form Dropdowns
//   useEffect(() => {
//     if (selectedCountryId) {
//       const country = countries.find(c => c.country_id === selectedCountryId);
//       if (!country) return;
//       axiosInstance.get(`https://tdtlworld.com/hrms-backend/api/states/?country_name=${country.country_name}`)
//         .then(res => setStates(res.data.data || []))
//         .catch(() => setStates([]));
//     } else { setStates([]); setSelectedStateId(""); }
//   }, [selectedCountryId, countries]);

//   useEffect(() => {
//     if (selectedStateId) {
//       axiosInstance.get(`https://tdtlworld.com/hrms-backend/api/employee_hub_dropdown/${selectedStateId}/`)
//         .then(res => setHubs(res.data.data || []))
//         .catch(() => setHubs([]));
//     } else { setHubs([]); setSelectedHubId(""); }
//   }, [selectedStateId]);

//   // Effect for Filter Dropdowns
//   useEffect(() => {
//     if (filterCountry) {
//       const country = countries.find(c => c.country_name === filterCountry);
//       if (!country) return;
//       axiosInstance.get(`https://tdtlworld.com/hrms-backend/api/states/?country_name=${country.country_name}`)
//         .then(res => setFilterStates(res.data.data || []))
//         .catch(() => setFilterStates([]));
//     } else { setFilterStates([]); setFilterState(""); }
//   }, [filterCountry, countries]);

//   useEffect(() => {
//     if (filterState) {
//       const state = filterStates.find(s => s.state_name === filterState);
//       if (!state) return;
//       axiosInstance.get(`https://tdtlworld.com/hrms-backend/api/employee_hub_dropdown/${state.state_id}/`)
//         .then(res => setFilterHubs(res.data.data || []))
//         .catch(() => setFilterHubs([]));
//     } else { setFilterHubs([]); setFilterHub(""); }
//   }, [filterState, filterStates]);

//   // --- FORM & DIALOG HANDLERS ---
//   const resetForm = () => {
//     setEventTitle(""); setStartDate(""); setEndDate(""); setDescription("");
//     setStatus("Published"); setSelectedCountryId(""); setSelectedStateId("");
//     setSelectedHubId(""); setIsEditing(false); setEditingHolidayId(null);
//   };

//   const handleAddNewClick = () => { resetForm(); setIsDialogOpen(true); };

//   const handleEditClick = async (holiday) => {
//     resetForm(); setIsEditing(true); setEditingHolidayId(holiday.id);
//     setEventTitle(holiday.event_name); setStartDate(holiday.start_date);
//     setEndDate(holiday.end_date); setDescription(holiday.description);
//     setStatus(holiday.status);
//     const country = countries.find(c => c.country_name === holiday.country);
//     if (country) {
//       setSelectedCountryId(country.country_id);
//       const statesRes = await axiosInstance.get(`https://tdtlworld.com/hrms-backend/api/states/?country_name=${country.country_name}`);
//       const holidayStates = statesRes.data.data || [];
//       setStates(holidayStates);
//       const state = holidayStates.find(s => s.state_name === holiday.state);
//       if (state) {
//         setSelectedStateId(state.state_id);
//         const hubsRes = await axiosInstance.get(`https://tdtlworld.com/hrms-backend/api/employee_hub_dropdown/${state.state_id}/`);
//         const holidayHubs = hubsRes.data.data || [];
//         setHubs(holidayHubs);
//         const hub = holidayHubs.find(h => h.employee_hub_name === holiday.employee_hub_name);
//         if (hub) setSelectedHubId(hub.employee_hub_id);
//       }
//     }
//     setIsDialogOpen(true);
//   };

//   const handleCloseDialog = () => { if (!isSubmitting) { setIsDialogOpen(false); resetForm(); }};

//   const handleSubmit = async (e) => {
//     e.preventDefault(); setIsSubmitting(true);
//     const payload = { event_name: eventTitle, start_date: startDate, end_date: endDate,
//       description, is_publish: status === "Published" ? 1 : 0, country: selectedCountryId,
//       state: selectedStateId, employee_hub: selectedHubId };
//     try {
//       if (isEditing) {
//         await axiosInstance.put("api/holiday/", { ...payload, holiday_id: editingHolidayId });
//         showToast('success', 'Success!', 'Holiday updated successfully.');
//       } else {
//         await axiosInstance.post("api/holiday/", payload);
//         showToast('success', 'Success!', 'Holiday created successfully.');
//       }
//       fetchHolidays(); handleCloseDialog();
//     } catch (error) {
//       console.error("Failed to save holiday:", error);
//       showToast('error', 'Error', 'Failed to save the holiday.');
//     } finally { setIsSubmitting(false); }
//   };

//   const handleDelete = (holidayId) => {
//     Swal.fire({ title: 'Are you sure?', text: "You won't be able to revert this!", icon: 'warning',
//       showCancelButton: true, confirmButtonColor: PRIMARY_COLOR, cancelButtonColor: '#757575',
//       confirmButtonText: 'Yes, delete it!'
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         try {
//           await axiosInstance.delete("api/holiday/", { data: { holiday_id: holidayId } });
//           showToast('success', 'Deleted!', 'The holiday has been deleted.'); fetchHolidays();
//         } catch (error) {
//           console.error("Failed to delete holiday:", error);
//           showToast('error', 'Error', 'Could not delete the holiday.');
//         }
//       }
//     });
//   };

//   // --- FILTERING & PAGINATION LOGIC ---
//   const filteredHolidays = holidays.filter((holiday) => {
//     const searchMatch = holiday.event_name.toLowerCase().includes(searchTerm.toLowerCase());
//     const countryMatch = !filterCountry || holiday.country === filterCountry;
//     const stateMatch = !filterState || holiday.state === filterState;
//     const hubMatch = !filterHub || (filterHubs.find(h => h.employee_hub_id == filterHub)?.employee_hub_name === holiday.employee_hub_name);
//     return searchMatch && countryMatch && stateMatch && hubMatch;
//   });

//   const paginatedHolidays = filteredHolidays.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

//   // --- CALENDAR LOGIC ---
//   const generateCalendarDays = () => {
//     const year = currentMonth.getFullYear();
//     const month = currentMonth.getMonth();
//     const firstDayOfMonth = new Date(year, month, 1).getDay();
//     const daysInMonth = new Date(year, month + 1, 0).getDate();
//     const days = [];
//     for (let i = 0; i < firstDayOfMonth; i++) days.push(null);
//     for (let i = 1; i <= daysInMonth; i++) days.push(new Date(year, month, i));
//     return days;
//   };
//   const calendarDays = generateCalendarDays();
//   const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

//   const getHolidaysForDay = (date) => {
//     if (!date) return [];
//     return filteredHolidays.filter(holiday => {
//         const startDate = new Date(holiday.start_date);
//         const endDate = new Date(holiday.end_date);
//         startDate.setHours(0,0,0,0);
//         endDate.setHours(0,0,0,0);
//         return date >= startDate && date <= endDate;
//     });
//   };
  
//   // --- RENDER FUNCTIONS ---
//   const renderHolidaysView = () => (
//     <>
//       <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2,
//           flexDirection: isMobile ? 'column' : 'row', gap: 2 }}>
//         <Button variant="contained" startIcon={<AddIcon />} onClick={handleAddNewClick}
//           sx={{ backgroundColor: PRIMARY_COLOR, color: TEXT_ON_PRIMARY, '&:hover': { backgroundColor: PRIMARY_DARK_COLOR }, alignSelf: isMobile ? 'stretch' : 'auto' }}>
//           Add New Holiday
//         </Button>
//         <TextField size="small" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
//           InputProps={{ startAdornment: (<InputAdornment position="start"><SearchIcon /></InputAdornment>)}}
//           sx={{ width: isMobile ? '100%' : 'auto' }}
//         />
//       </Box>
//       <TableContainer>
//         <Table sx={{ minWidth: '100%', whiteSpace: 'nowrap' }}>
//           <TableHead sx={{ backgroundColor: PRIMARY_COLOR }}>
//             <TableRow>
//               <TableCell sx={{ color: TEXT_ON_PRIMARY, fontWeight: 'bold' }}>SR NO.</TableCell>
//               <TableCell sx={{ color: TEXT_ON_PRIMARY, fontWeight: 'bold' }}>EVENT TITLE</TableCell>
//               <TableCell sx={{ color: TEXT_ON_PRIMARY, fontWeight: 'bold' }}>START DATE</TableCell>
//               <TableCell sx={{ color: TEXT_ON_PRIMARY, fontWeight: 'bold' }}>END DATE</TableCell>
//               <TableCell sx={{ color: TEXT_ON_PRIMARY, fontWeight: 'bold' }}>COUNTRY</TableCell>
//               <TableCell sx={{ color: TEXT_ON_PRIMARY, fontWeight: 'bold' }}>STATE</TableCell>
//               <TableCell sx={{ color: TEXT_ON_PRIMARY, fontWeight: 'bold' }}>HUB</TableCell>
//               <TableCell sx={{ color: TEXT_ON_PRIMARY, fontWeight: 'bold' }}>STATUS</TableCell>
//               <TableCell align="center" sx={{ color: TEXT_ON_PRIMARY, fontWeight: 'bold' }}>ACTIONS</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {loading ? Array.from(new Array(5)).map((_, index) => (
//               <TableRow key={index}>
//                 <TableCell><Skeleton /></TableCell><TableCell><Skeleton /></TableCell>
//                 <TableCell><Skeleton /></TableCell><TableCell><Skeleton /></TableCell>
//                 <TableCell><Skeleton /></TableCell><TableCell><Skeleton /></TableCell>
//                 <TableCell><Skeleton /></TableCell><TableCell><Skeleton /></TableCell>
//                 <TableCell align="center"><Skeleton variant="rectangular" width={80} height={30} /></TableCell>
//               </TableRow>
//             )) : paginatedHolidays.length > 0 ? ( paginatedHolidays.map((holiday, index) => (
//                 <TableRow key={holiday.id} hover>
//                   <TableCell sx={{ fontSize: '0.95rem' }}>{page * rowsPerPage + index + 1}</TableCell>
//                   <TableCell sx={{ fontSize: '0.95rem' }}>{holiday.event_name}</TableCell>
//                   <TableCell sx={{ fontSize: '0.95rem' }}>{new Date(holiday.start_date).toLocaleDateString('en-GB')}</TableCell>
//                   <TableCell sx={{ fontSize: '0.95rem' }}>{new Date(holiday.end_date).toLocaleDateString('en-GB')}</TableCell>
//                   <TableCell sx={{ fontSize: '0.95rem' }}>{holiday.country}</TableCell>
//                   <TableCell sx={{ fontSize: '0.95rem' }}>{holiday.state}</TableCell>
//                   <TableCell sx={{ fontSize: '0.95rem' }}>{holiday.employee_hub_name}</TableCell>
//                   <TableCell sx={{ fontSize: '0.95rem' }}>{holiday.status}</TableCell>
//                   <TableCell>
//                     <Box display="flex" justifyContent="center" gap={0.5}>
//                       <IconButton onClick={() => handleEditClick(holiday)} sx={{ color: '#2E90FA' }}><EditIcon /></IconButton>
//                       <IconButton onClick={() => handleDelete(holiday.id)} sx={{ color: '#D92D20' }}><DeleteIcon /></IconButton>
//                     </Box>
//                   </TableCell>
//                 </TableRow>
//             ))) : (<TableRow><TableCell colSpan={9} align="center">No holidays found.</TableCell></TableRow>)}
//           </TableBody>
//         </Table>
//       </TableContainer>
//       <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2,
//           flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? 2 : 0, }}>
//         <Typography variant="body2" color="text.secondary">
//           Showing {filteredHolidays.length > 0 ? page * rowsPerPage + 1 : 0} to {Math.min((page + 1) * rowsPerPage, filteredHolidays.length)} of {filteredHolidays.length} results
//         </Typography>
//         <TablePagination component="div" count={filteredHolidays.length} page={page} onPageChange={(e, newPage) => setPage(newPage)}
//           rowsPerPage={rowsPerPage} onRowsPerPageChange={(e) => { setRowsPerPage(parseInt(e.target.value, 10)); setPage(0); }}
//           rowsPerPageOptions={[5, 10, 15, 25]} sx={{ '& .MuiSvgIcon-root': { color: PRIMARY_COLOR }}} />
//       </Box>
//     </>
//   );

//   const renderCalendarView = () => (
//     <Box sx={{ mt: 2 }}>
//       <Paper elevation={1} sx={{ p: 2, mb: 2 }}>
//         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
//           <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//             <IconButton onClick={() => setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() - 1)))}><ChevronLeftIcon /></IconButton>
//             <Button variant="outlined" startIcon={<TodayIcon />} onClick={() => setCurrentMonth(new Date())}>Today</Button>
//             <IconButton onClick={() => setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() + 1)))}><ChevronRightIcon /></IconButton>
//           </Box>
//           <Typography variant="h6" sx={{ fontWeight: 'bold', color: PRIMARY_COLOR }}>
//             {currentMonth.toLocaleString('default', { month: 'long' })} {currentMonth.getFullYear()}
//           </Typography>
//           <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
//              {/* Filter Dropdowns for Calendar */}
//           </Box>
//         </Box>
//       </Paper>

//       {/* Calendar Grid */}
//       <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', borderTop: '1px solid #ddd', borderLeft: '1px solid #ddd' }}>
//         {daysOfWeek.map(day => (
//           <Box key={day} sx={{ textAlign: 'center', p: 1, backgroundColor: '#f5f5f5', fontWeight: 'bold', borderBottom: '1px solid #ddd', borderRight: '1px solid #ddd' }}>
//             {day}
//           </Box>
//         ))}
//         {calendarDays.map((day, index) => (
//           <Box key={index} sx={{ minHeight: 120, p: 1, borderBottom: '1px solid #ddd', borderRight: '1px solid #ddd',
//               backgroundColor: day ? 'white' : '#fafafa' }}>
//             {day && (
//               <>
//                 <Typography variant="body2" sx={{ fontWeight: new Date().toDateString() === day.toDateString() ? 'bold' : 'normal', color: new Date().toDateString() === day.toDateString() ? PRIMARY_COLOR : 'text.primary' }}>
//                   {day.getDate()}
//                 </Typography>
//                 {getHolidaysForDay(day).map(holiday => (
//                   <Typography key={holiday.id} sx={{ fontSize: '0.75rem', p: '2px 4px', borderRadius: '4px', color: TEXT_ON_PRIMARY,
//                       backgroundColor: holiday.status === 'Published' ? PRIMARY_COLOR : '#F58E35', // Orange for Restricted
//                       whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', my: 0.5 }}>
//                     {holiday.event_name}
//                   </Typography>
//                 ))}
//               </>
//             )}
//           </Box>
//         ))}
//       </Box>
//     </Box>
//   );

//   return (
//     <Box component={Paper} p={3} elevation={3}>
//       <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, flexWrap: 'wrap', gap: 2 }}>
//         <Typography variant="h4" sx={{ color: PRIMARY_COLOR, fontWeight: 'bold' }}>
//           Holidays
//         </Typography>
//         <ToggleButtonGroup value={viewMode} exclusive onChange={(e, newView) => { if (newView) setViewMode(newView); }} >
//           <ToggleButton value="holidays" sx={{ '&.Mui-selected': { backgroundColor: PRIMARY_COLOR, color: TEXT_ON_PRIMARY } }}>List View</ToggleButton>
//           <ToggleButton value="calendar" sx={{ '&.Mui-selected': { backgroundColor: PRIMARY_COLOR, color: TEXT_ON_PRIMARY } }}>Calendar View</ToggleButton>
//         </ToggleButtonGroup>
//       </Box>
      
//       {/* Shared Filters */}
//       <Grid container spacing={2} sx={{ mb: 2 }}>
//           <Grid item xs={12} sm={4}>
//             <FormControl fullWidth size="small">
//               <InputLabel>Country</InputLabel>
//               <Select value={filterCountry} label="Country" onChange={(e) => setFilterCountry(e.target.value)}>
//                 <MenuItem value=""><em>All Countries</em></MenuItem>
//                 {countries.map(c => <MenuItem key={c.country_id} value={c.country_name}>{c.country_name}</MenuItem>)}
//               </Select>
//             </FormControl>
//           </Grid>
//           <Grid item xs={12} sm={4}>
//             <FormControl fullWidth size="small" disabled={!filterCountry}>
//               <InputLabel>State</InputLabel>
//               <Select value={filterState} label="State" onChange={(e) => setFilterState(e.target.value)}>
//                 <MenuItem value=""><em>All States</em></MenuItem>
//                 {filterStates.map(s => <MenuItem key={s.state_id} value={s.state_name}>{s.state_name}</MenuItem>)}
//               </Select>
//             </FormControl>
//           </Grid>
//           <Grid item xs={12} sm={4}>
//             <FormControl fullWidth size="small" disabled={!filterState}>
//               <InputLabel>Hub</InputLabel>
//               <Select value={filterHub} label="Hub" onChange={(e) => setFilterHub(e.target.value)}>
//                 <MenuItem value=""><em>All Hubs</em></MenuItem>
//                 {filterHubs.map(h => <MenuItem key={h.employee_hub_id} value={h.employee_hub_id}>{h.employee_hub_name}</MenuItem>)}
//               </Select>
//             </FormControl>
//           </Grid>
//         </Grid>

//       {viewMode === 'holidays' ? renderHolidaysView() : renderCalendarView()}

//       <Dialog open={isDialogOpen} onClose={handleCloseDialog} fullWidth maxWidth="sm">
//         <DialogTitle sx={{ color: PRIMARY_COLOR, fontWeight: 'bold' }}>
//           {isEditing ? "Edit Holiday" : "Add New Holiday"}
//         </DialogTitle>
//         <form onSubmit={handleSubmit}>
//           <DialogContent>
//             <TextField label="Event Title" fullWidth margin="dense" value={eventTitle} onChange={(e) => setEventTitle(e.target.value)} required />
//             <Box display="flex" gap={2} mt={1}>
//               <TextField label="Start Date" type="date" fullWidth margin="dense" InputLabelProps={{ shrink: true }} value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
//               <TextField label="End Date" type="date" fullWidth margin="dense" InputLabelProps={{ shrink: true }} value={endDate} onChange={(e) => setEndDate(e.target.value)} inputProps={{ min: startDate }} required />
//             </Box>
//             <FormControl fullWidth margin="dense" required>
//               <InputLabel>Country</InputLabel>
//               <Select value={selectedCountryId} label="Country" onChange={(e) => setSelectedCountryId(e.target.value)}>
//                 {countries.map((c) => (<MenuItem key={c.country_id} value={c.country_id}>{c.country_name}</MenuItem>))}
//               </Select>
//             </FormControl>
//             <FormControl fullWidth margin="dense" required disabled={!selectedCountryId || states.length === 0}>
//               <InputLabel>State</InputLabel>
//               <Select value={selectedStateId} label="State" onChange={(e) => setSelectedStateId(e.target.value)}>
//                 {states.map((s) => (<MenuItem key={s.state_id} value={s.state_id}>{s.state_name}</MenuItem>))}
//               </Select>
//             </FormControl>
//             <FormControl fullWidth margin="dense" required disabled={!selectedStateId || hubs.length === 0}>
//               <InputLabel>Employee Hub</InputLabel>
//               <Select value={selectedHubId} label="Employee Hub" onChange={(e) => setSelectedHubId(e.target.value)}>
//                 {hubs.map((h) => (<MenuItem key={h.employee_hub_id} value={h.employee_hub_id}>{h.employee_hub_name}</MenuItem>))}
//               </Select>
//             </FormControl>
//             <TextField label="Description" fullWidth multiline rows={3} margin="dense" value={description} onChange={(e) => setDescription(e.target.value)} required />
//             <FormControl fullWidth margin="dense">
//               <InputLabel>Status</InputLabel>
//               <Select value={status} label="Status" onChange={(e) => setStatus(e.target.value)}>
//                 <MenuItem value="Published">Published</MenuItem><MenuItem value="Restricted">Restricted</MenuItem>
//               </Select>
//             </FormControl>
//             <Button variant="outlined" component="label" fullWidth sx={{ mt: 2 }}>
//               Upload Attachment (.pdf) <input type="file" hidden accept=".pdf" />
//             </Button>
//           </DialogContent>
//           <DialogActions sx={{ p: '0 24px 16px' }}>
//             <Button onClick={handleCloseDialog} sx={{ color: '#757575', '&:hover': { backgroundColor: 'rgba(0,0,0,0.04)' } }} disabled={isSubmitting}>Cancel</Button>
//             <Button type="submit" variant="contained" sx={{ backgroundColor: PRIMARY_COLOR, color: TEXT_ON_PRIMARY, '&:hover': { backgroundColor: PRIMARY_DARK_COLOR } }} disabled={isSubmitting}>
//               {isSubmitting ? <CircularProgress size={24} sx={{ color: TEXT_ON_PRIMARY }} /> : "Save"}
//             </Button>
//           </DialogActions>
//         </form>
//       </Dialog>
//     </Box>
//   );
// }












// import { useState, useEffect } from "react";
// import axiosInstance from "../../utils/axiosInstance";
// import Swal from "sweetalert2";

// import {
//   Box,
//   Paper,
//   Typography,
//   Button,
//   TextField,
//   InputAdornment,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TablePagination,
//   IconButton,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   Skeleton,
//   CircularProgress,
//   useTheme,
//   useMediaQuery,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   ToggleButton,
//   ToggleButtonGroup,
//   Grid,
// } from "@mui/material";

// import AddIcon from "@mui/icons-material/Add";
// import SearchIcon from "@mui/icons-material/Search";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
// import ChevronRightIcon from '@mui/icons-material/ChevronRight';
// import TodayIcon from '@mui/icons-material/Today';

// export default function Holidays() {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

//   const PRIMARY_COLOR = "#8C257C";
//   const PRIMARY_DARK_COLOR = "#6d1d60";
//   const TEXT_ON_PRIMARY = "#FFFFFF";

//   const [viewMode, setViewMode] = useState("holidays");
//   const [currentMonth, setCurrentMonth] = useState(new Date());

//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);
//   const [editingHolidayId, setEditingHolidayId] = useState(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const [eventTitle, setEventTitle] = useState("");
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");
//   const [description, setDescription] = useState("");
//   const [status, setStatus] = useState("Published");
//   const [selectedCountryId, setSelectedCountryId] = useState("");
//   const [selectedStateId, setSelectedStateId] = useState("");
//   const [selectedHubId, setSelectedHubId] = useState("");

//   const [holidays, setHolidays] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [countries, setCountries] = useState([]);
//   const [states, setStates] = useState([]);
//   const [hubs, setHubs] = useState([]);
//   const [filterStates, setFilterStates] = useState([]);
//   const [filterHubs, setFilterHubs] = useState([]);

//   const [searchTerm, setSearchTerm] = useState("");
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);

//   const [filterCountry, setFilterCountry] = useState("");
//   const [filterState, setFilterState] = useState("");
//   const [filterHub, setFilterHub] = useState("");

//   const showToast = (icon, title, text) => {
//     Swal.fire({
//       icon, title, text, toast: true, position: 'top-end',
//       showConfirmButton: false, timer: 3000, timerProgressBar: true,
//     });
//   };

//   const fetchHolidays = async () => {
//     setLoading(true);
//     try {
//       const response = await axiosInstance.get("https://tdtlworld.com/hrms-backend/api/holiday/");
//       const mappedHolidays = (response.data.data || []).map((h) => ({
//         id: h.holiday_id, event_name: h.event_name, start_date: h.start_date,
//         end_date: h.end_date, description: h.description || "",
//         status: h.status === 1 ? "Published" : "Restricted", country: h.country,
//         state: h.state, employee_hub_name: h.employee_hub_name || "N/A",
//       }));
//       setHolidays(mappedHolidays);
//     } catch (error) {
//       console.error("Error fetching holidays:", error);
//       showToast('error', 'Error', 'Failed to fetch holidays.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchDropdownData = async () => {
//     try {
//       const countryRes = await axiosInstance.get("https://tdtlworld.com/hrms-backend/api/countries/");
//       setCountries(countryRes.data.data || []);
//     } catch (error) {
//       console.error("Error fetching countries:", error);
//     }
//   };

//   useEffect(() => {
//     fetchHolidays();
//     fetchDropdownData();
//   }, []);

//   useEffect(() => {
//     if (selectedCountryId) {
//       const country = countries.find(c => c.country_id === selectedCountryId);
//       if (!country) return;
//       axiosInstance.get(`https://tdtlworld.com/hrms-backend/api/states/?country_name=${country.country_name}`)
//         .then(res => setStates(res.data.data || []))
//         .catch(() => setStates([]));
//     } else { setStates([]); setSelectedStateId(""); }
//   }, [selectedCountryId, countries]);

//   useEffect(() => {
//     if (selectedStateId) {
//       axiosInstance.get(`https://tdtlworld.com/hrms-backend/api/employee_hub_dropdown/${selectedStateId}/`)
//         .then(res => setHubs(res.data.data || []))
//         .catch(() => setHubs([]));
//     } else { setHubs([]); setSelectedHubId(""); }
//   }, [selectedStateId]);

//   useEffect(() => {
//     if (filterCountry) {
//       const country = countries.find(c => c.country_name === filterCountry);
//       if (!country) return;
//       axiosInstance.get(`https://tdtlworld.com/hrms-backend/api/states/?country_name=${country.country_name}`)
//         .then(res => setFilterStates(res.data.data || []))
//         .catch(() => setFilterStates([]));
//     } else { setFilterStates([]); setFilterState(""); }
//   }, [filterCountry, countries]);

//   useEffect(() => {
//     if (filterState) {
//       const state = filterStates.find(s => s.state_name === filterState);
//       if (!state) return;
//       axiosInstance.get(`https://tdtlworld.com/hrms-backend/api/employee_hub_dropdown/${state.state_id}/`)
//         .then(res => setFilterHubs(res.data.data || []))
//         .catch(() => setFilterHubs([]));
//     } else { setFilterHubs([]); setFilterHub(""); }
//   }, [filterState, filterStates]);

//   const resetForm = () => {
//     setEventTitle(""); setStartDate(""); setEndDate(""); setDescription("");
//     setStatus("Published"); setSelectedCountryId(""); setSelectedStateId("");
//     setSelectedHubId(""); setIsEditing(false); setEditingHolidayId(null);
//   };

//   const handleAddNewClick = () => { resetForm(); setIsDialogOpen(true); };

//   const handleEditClick = async (holiday) => {
//     resetForm(); setIsEditing(true); setEditingHolidayId(holiday.id);
//     setEventTitle(holiday.event_name); setStartDate(holiday.start_date);
//     setEndDate(holiday.end_date); setDescription(holiday.description);
//     setStatus(holiday.status);
//     const country = countries.find(c => c.country_name === holiday.country);
//     if (country) {
//       setSelectedCountryId(country.country_id);
//       const statesRes = await axiosInstance.get(`https://tdtlworld.com/hrms-backend/api/states/?country_name=${country.country_name}`);
//       const holidayStates = statesRes.data.data || [];
//       setStates(holidayStates);
//       const state = holidayStates.find(s => s.state_name === holiday.state);
//       if (state) {
//         setSelectedStateId(state.state_id);
//         const hubsRes = await axiosInstance.get(`https://tdtlworld.com/hrms-backend/api/employee_hub_dropdown/${state.state_id}/`);
//         const holidayHubs = hubsRes.data.data || [];
//         setHubs(holidayHubs);
//         const hub = holidayHubs.find(h => h.employee_hub_name === holiday.employee_hub_name);
//         if (hub) setSelectedHubId(hub.employee_hub_id);
//       }
//     }
//     setIsDialogOpen(true);
//   };

//   const handleCloseDialog = () => { if (!isSubmitting) { setIsDialogOpen(false); resetForm(); }};

//   const handleSubmit = async (e) => {
//     e.preventDefault(); setIsSubmitting(true);
//     const payload = { event_name: eventTitle, start_date: startDate, end_date: endDate,
//       description, is_publish: status === "Published" ? 1 : 0, country: selectedCountryId,
//       state: selectedStateId, employee_hub: selectedHubId };
//     try {
//       if (isEditing) {
//         await axiosInstance.put("api/holiday/", { ...payload, holiday_id: editingHolidayId });
//         showToast('success', 'Success!', 'Holiday updated successfully.');
//       } else {
//         await axiosInstance.post("api/holiday/", payload);
//         showToast('success', 'Success!', 'Holiday created successfully.');
//       }
//       fetchHolidays(); handleCloseDialog();
//     } catch (error) {
//       console.error("Failed to save holiday:", error);
//       showToast('error', 'Error', 'Failed to save the holiday.');
//     } finally { setIsSubmitting(false); }
//   };

//   const handleDelete = (holidayId) => {
//     Swal.fire({ title: 'Are you sure?', text: "You won't be able to revert this!", icon: 'warning',
//       showCancelButton: true, confirmButtonColor: PRIMARY_COLOR, cancelButtonColor: '#757575',
//       confirmButtonText: 'Yes, delete it!'
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         try {
//           await axiosInstance.delete("api/holiday/", { data: { holiday_id: holidayId } });
//           showToast('success', 'Deleted!', 'The holiday has been deleted.'); fetchHolidays();
//         } catch (error) {
//           console.error("Failed to delete holiday:", error);
//           showToast('error', 'Error', 'Could not delete the holiday.');
//         }
//       }
//     });
//   };

//   const filteredHolidays = holidays.filter((holiday) => {
//     const searchMatch = holiday.event_name.toLowerCase().includes(searchTerm.toLowerCase());
//     const countryMatch = !filterCountry || holiday.country === filterCountry;
//     const stateMatch = !filterState || holiday.state === filterState;
//     const hubMatch = !filterHub || (filterHubs.find(h => h.employee_hub_id == filterHub)?.employee_hub_name === holiday.employee_hub_name);
//     return searchMatch && countryMatch && stateMatch && hubMatch;
//   });

//   const paginatedHolidays = filteredHolidays.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

//   const generateCalendarDays = () => {
//     const year = currentMonth.getFullYear();
//     const month = currentMonth.getMonth();
//     const firstDayOfMonth = new Date(year, month, 1).getDay();
//     const daysInMonth = new Date(year, month + 1, 0).getDate();
//     const days = [];
//     for (let i = 0; i < firstDayOfMonth; i++) days.push(null);
//     for (let i = 1; i <= daysInMonth; i++) days.push(new Date(year, month, i));
//     return days;
//   };
//   const calendarDays = generateCalendarDays();
//   const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

//   const getHolidaysForDay = (date) => {
//     if (!date) return [];
//     return filteredHolidays.filter(holiday => {
//         const startDate = new Date(holiday.start_date);
//         const endDate = new Date(holiday.end_date);
//         startDate.setHours(0,0,0,0);
//         endDate.setHours(0,0,0,0);
//         return date >= startDate && date <= endDate;
//     });
//   };
  
//   const renderHolidaysView = () => (
//     <>
//       <TableContainer>
//         <Table sx={{ minWidth: '100%', whiteSpace: 'nowrap' }}>
//           <TableHead sx={{ backgroundColor: PRIMARY_COLOR }}>
//             <TableRow>
//               <TableCell sx={{ color: TEXT_ON_PRIMARY, fontWeight: 'bold' }}>SR NO.</TableCell>
//               <TableCell sx={{ color: TEXT_ON_PRIMARY, fontWeight: 'bold' }}>EVENT TITLE</TableCell>
//               <TableCell sx={{ color: TEXT_ON_PRIMARY, fontWeight: 'bold' }}>START DATE</TableCell>
//               <TableCell sx={{ color: TEXT_ON_PRIMARY, fontWeight: 'bold' }}>END DATE</TableCell>
//               <TableCell sx={{ color: TEXT_ON_PRIMARY, fontWeight: 'bold' }}>COUNTRY</TableCell>
//               <TableCell sx={{ color: TEXT_ON_PRIMARY, fontWeight: 'bold' }}>STATE</TableCell>
//               <TableCell sx={{ color: TEXT_ON_PRIMARY, fontWeight: 'bold' }}>HUB</TableCell>
//               <TableCell sx={{ color: TEXT_ON_PRIMARY, fontWeight: 'bold' }}>STATUS</TableCell>
//               <TableCell align="center" sx={{ color: TEXT_ON_PRIMARY, fontWeight: 'bold' }}>ACTIONS</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {loading ? Array.from(new Array(5)).map((_, index) => (
//               <TableRow key={index}>
//                 <TableCell><Skeleton /></TableCell><TableCell><Skeleton /></TableCell>
//                 <TableCell><Skeleton /></TableCell><TableCell><Skeleton /></TableCell>
//                 <TableCell><Skeleton /></TableCell><TableCell><Skeleton /></TableCell>
//                 <TableCell><Skeleton /></TableCell><TableCell><Skeleton /></TableCell>
//                 <TableCell align="center"><Skeleton variant="rectangular" width={80} height={30} /></TableCell>
//               </TableRow>
//             )) : paginatedHolidays.length > 0 ? ( paginatedHolidays.map((holiday, index) => (
//                 <TableRow key={holiday.id} hover>
//                   <TableCell sx={{ fontSize: '0.95rem' }}>{page * rowsPerPage + index + 1}</TableCell>
//                   <TableCell sx={{ fontSize: '0.95rem' }}>{holiday.event_name}</TableCell>
//                   <TableCell sx={{ fontSize: '0.95rem' }}>{new Date(holiday.start_date).toLocaleDateString('en-GB')}</TableCell>
//                   <TableCell sx={{ fontSize: '0.95rem' }}>{new Date(holiday.end_date).toLocaleDateString('en-GB')}</TableCell>
//                   <TableCell sx={{ fontSize: '0.95rem' }}>{holiday.country}</TableCell>
//                   <TableCell sx={{ fontSize: '0.95rem' }}>{holiday.state}</TableCell>
//                   <TableCell sx={{ fontSize: '0.95rem' }}>{holiday.employee_hub_name}</TableCell>
//                   <TableCell sx={{ fontSize: '0.95rem' }}>{holiday.status}</TableCell>
//                   <TableCell>
//                     <Box display="flex" justifyContent="center" gap={0.5}>
//                       <IconButton onClick={() => handleEditClick(holiday)} sx={{ color: '#2E90FA' }}><EditIcon /></IconButton>
//                       <IconButton onClick={() => handleDelete(holiday.id)} sx={{ color: '#D92D20' }}><DeleteIcon /></IconButton>
//                     </Box>
//                   </TableCell>
//                 </TableRow>
//             ))) : (<TableRow><TableCell colSpan={9} align="center">No holidays found.</TableCell></TableRow>)}
//           </TableBody>
//         </Table>
//       </TableContainer>
//       <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2,
//           flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? 2 : 0, }}>
//         <Typography variant="body2" color="text.secondary">
//           Showing {filteredHolidays.length > 0 ? page * rowsPerPage + 1 : 0} to {Math.min((page + 1) * rowsPerPage, filteredHolidays.length)} of {filteredHolidays.length} results
//         </Typography>
//         <TablePagination component="div" count={filteredHolidays.length} page={page} onPageChange={(e, newPage) => setPage(newPage)}
//           rowsPerPage={rowsPerPage} onRowsPerPageChange={(e) => { setRowsPerPage(parseInt(e.target.value, 10)); setPage(0); }}
//           rowsPerPageOptions={[5, 10, 15, 25]} sx={{ '& .MuiSvgIcon-root': { color: PRIMARY_COLOR }}} />
//       </Box>
//     </>
//   );

//   const renderCalendarView = () => (
//     <Box sx={{ mt: 2 }}>
//       <Paper elevation={1} sx={{ p: 2, mb: 2 }}>
//         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
//           <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//             <IconButton onClick={() => setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() - 1)))}><ChevronLeftIcon /></IconButton>
//             <Button variant="outlined" startIcon={<TodayIcon />} onClick={() => setCurrentMonth(new Date())}>Today</Button>
//             <IconButton onClick={() => setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() + 1)))}><ChevronRightIcon /></IconButton>
//           </Box>
//           <Typography variant="h6" sx={{ fontWeight: 'bold', color: PRIMARY_COLOR }}>
//             {currentMonth.toLocaleString('default', { month: 'long' })} {currentMonth.getFullYear()}
//           </Typography>
//           <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
//           </Box>
//         </Box>
//       </Paper>

//       <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', borderTop: '1px solid #ddd', borderLeft: '1px solid #ddd' }}>
//         {daysOfWeek.map(day => (
//           <Box key={day} sx={{ textAlign: 'center', p: 1, backgroundColor: '#f5f5f5', fontWeight: 'bold', borderBottom: '1px solid #ddd', borderRight: '1px solid #ddd' }}>
//             {day}
//           </Box>
//         ))}
//         {calendarDays.map((day, index) => (
//           <Box key={index} sx={{ minHeight: 120, p: 1, borderBottom: '1px solid #ddd', borderRight: '1px solid #ddd',
//               backgroundColor: day ? 'white' : '#fafafa' }}>
//             {day && (
//               <>
//                 <Typography variant="body2" sx={{ fontWeight: new Date().toDateString() === day.toDateString() ? 'bold' : 'normal', color: new Date().toDateString() === day.toDateString() ? PRIMARY_COLOR : 'text.primary' }}>
//                   {day.getDate()}
//                 </Typography>
//                 {getHolidaysForDay(day).map(holiday => (
//                   <Typography key={holiday.id} sx={{ fontSize: '0.75rem', p: '2px 4px', borderRadius: '4px', color: TEXT_ON_PRIMARY,
//                       backgroundColor: holiday.status === 'Published' ? PRIMARY_COLOR : '#F58E35',
//                       whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', my: 0.5 }}>
//                     {holiday.event_name}
//                   </Typography>
//                 ))}
//               </>
//             )}
//           </Box>
//         ))}
//       </Box>
//     </Box>
//   );

//   return (
//     <Box component={Paper} p={3} elevation={3}>
//       <Typography variant="h4" sx={{ color: PRIMARY_COLOR, fontWeight: 'bold', mb: 4 }}>
//         Holidays
//       </Typography>
//       <ToggleButtonGroup 
//         value={viewMode} 
//         exclusive 
//         onChange={(e, newView) => { if (newView) setViewMode(newView); }}
//         sx={{ my: 2 }}
//       >
//         <ToggleButton value="holidays" sx={{ '&.Mui-selected': { backgroundColor: PRIMARY_COLOR, color: TEXT_ON_PRIMARY } }}>List View</ToggleButton>
//         <ToggleButton value="calendar" sx={{ '&.Mui-selected': { backgroundColor: PRIMARY_COLOR, color: TEXT_ON_PRIMARY } }}>Calendar View</ToggleButton>
//       </ToggleButtonGroup>

//       <Box sx={{ display: 'flex', justifyContent: viewMode === 'holidays' ? 'space-between' : 'flex-start', alignItems: 'center', mb: 2,
//           flexDirection: isMobile ? 'column' : 'row', gap: 2 }}>
//         <Button variant="contained" startIcon={<AddIcon />} onClick={handleAddNewClick}
//           sx={{ backgroundColor: PRIMARY_COLOR, color: TEXT_ON_PRIMARY, '&:hover': { backgroundColor: PRIMARY_DARK_COLOR }, alignSelf: isMobile ? 'stretch' : 'auto' }}>
//           Add New 
//         </Button>
//         {viewMode === 'holidays' && (
//           <TextField size="small" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
//             InputProps={{ startAdornment: (<InputAdornment position="start"><SearchIcon /></InputAdornment>)}}
//             sx={{ width: isMobile ? '100%' : 'auto' }}
//           />
//         )}
//       </Box>
      
//       <Grid container spacing={2} sx={{ mb: 2 }}>
//           <Grid item xs={12} sm={4}>
//             <FormControl fullWidth size="small">
//               <InputLabel>Country</InputLabel>
//               <Select value={filterCountry} label="Country" onChange={(e) => setFilterCountry(e.target.value)}>
//                 <MenuItem value=""><em>All Countries</em></MenuItem>
//                 {countries.map(c => <MenuItem key={c.country_id} value={c.country_name}>{c.country_name}</MenuItem>)}
//               </Select>
//             </FormControl>
//           </Grid>
//           <Grid item xs={12} sm={4}>
//             <FormControl fullWidth size="small" disabled={!filterCountry}>
//               <InputLabel>State</InputLabel>
//               <Select value={filterState} label="State" onChange={(e) => setFilterState(e.target.value)}>
//                 <MenuItem value=""><em>All States</em></MenuItem>
//                 {filterStates.map(s => <MenuItem key={s.state_id} value={s.state_name}>{s.state_name}</MenuItem>)}
//               </Select>
//             </FormControl>
//           </Grid>
//           <Grid item xs={12} sm={4}>
//             <FormControl fullWidth size="small" disabled={!filterState}>
//               <InputLabel>Hub</InputLabel>
//               <Select value={filterHub} label="Hub" onChange={(e) => setFilterHub(e.target.value)}>
//                 <MenuItem value=""><em>All Hubs</em></MenuItem>
//                 {filterHubs.map(h => <MenuItem key={h.employee_hub_id} value={h.employee_hub_id}>{h.employee_hub_name}</MenuItem>)}
//               </Select>
//             </FormControl>
//           </Grid>
//       </Grid>

//       {viewMode === 'holidays' ? renderHolidaysView() : renderCalendarView()}

//       <Dialog open={isDialogOpen} onClose={handleCloseDialog} fullWidth maxWidth="sm">
//         <DialogTitle variant="h5" sx={{ color: PRIMARY_COLOR, fontWeight: 'bold' }}>
//           {isEditing ? "Edit Holiday" : "Add New Holiday"}
//         </DialogTitle>
//         <form onSubmit={handleSubmit}>
//           <DialogContent>
//             <TextField label="Event Title" fullWidth margin="dense" value={eventTitle} onChange={(e) => setEventTitle(e.target.value)} required />
//             <Box display="flex" gap={2} mt={1}>
//               <TextField label="Start Date" type="date" fullWidth margin="dense" InputLabelProps={{ shrink: true }} value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
//               <TextField label="End Date" type="date" fullWidth margin="dense" InputLabelProps={{ shrink: true }} value={endDate} onChange={(e) => setEndDate(e.target.value)} inputProps={{ min: startDate }} required />
//             </Box>
//             <FormControl fullWidth margin="dense" required>
//               <InputLabel>Country</InputLabel>
//               <Select value={selectedCountryId} label="Country" onChange={(e) => setSelectedCountryId(e.target.value)}>
//                 {countries.map((c) => (<MenuItem key={c.country_id} value={c.country_id}>{c.country_name}</MenuItem>))}
//               </Select>
//             </FormControl>
//             <FormControl fullWidth margin="dense" required disabled={!selectedCountryId || states.length === 0}>
//               <InputLabel>State</InputLabel>
//               <Select value={selectedStateId} label="State" onChange={(e) => setSelectedStateId(e.target.value)}>
//                 {states.map((s) => (<MenuItem key={s.state_id} value={s.state_id}>{s.state_name}</MenuItem>))}
//               </Select>
//             </FormControl>
//             <FormControl fullWidth margin="dense" required disabled={!selectedStateId || hubs.length === 0}>
//               <InputLabel>Employee Hub</InputLabel>
//               <Select value={selectedHubId} label="Employee Hub" onChange={(e) => setSelectedHubId(e.target.value)}>
//                 {hubs.map((h) => (<MenuItem key={h.employee_hub_id} value={h.employee_hub_id}>{h.employee_hub_name}</MenuItem>))}
//               </Select>
//             </FormControl>
//             <TextField label="Description" fullWidth multiline rows={3} margin="dense" value={description} onChange={(e) => setDescription(e.target.value)} required />
//             <FormControl fullWidth margin="dense">
//               <InputLabel>Status</InputLabel>
//               <Select value={status} label="Status" onChange={(e) => setStatus(e.target.value)}>
//                 <MenuItem value="Published">Published</MenuItem><MenuItem value="Restricted">Restricted</MenuItem>
//               </Select>
//             </FormControl>
//             <Button variant="outlined" component="label" fullWidth sx={{ mt: 2 }}>
//               Upload Attachment (.pdf) <input type="file" hidden accept=".pdf" />
//             </Button>
//           </DialogContent>
//           <DialogActions sx={{ p: '0 24px 16px' }}>
//             <Button onClick={handleCloseDialog} sx={{ color: '#757575', '&:hover': { backgroundColor: 'rgba(0,0,0,0.04)' } }} disabled={isSubmitting}>Cancel</Button>
//             <Button type="submit" variant="contained" sx={{ backgroundColor: PRIMARY_COLOR, color: TEXT_ON_PRIMARY, '&:hover': { backgroundColor: PRIMARY_DARK_COLOR } }} disabled={isSubmitting}>
//               {isSubmitting ? <CircularProgress size={24} sx={{ color: TEXT_ON_PRIMARY }} /> : "Save"}
//             </Button>
//           </DialogActions>
//         </form>
//       </Dialog>
//     </Box>
//   );
// }




import { useState, useEffect } from "react";
import axiosInstance from "../../utils/axiosInstance";
import Swal from "sweetalert2";
import {
  Box,
  Paper,
  Typography,
  Button,
  TextField,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Skeleton,
  CircularProgress,
  useTheme,
  useMediaQuery,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  ToggleButton,
  ToggleButtonGroup,
  Grid,
  Pagination,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TodayIcon from '@mui/icons-material/Today';

export default function Holidays() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const PRIMARY_COLOR = "#8C257C";
  const PRIMARY_DARK_COLOR = "#6d1d60";
  const SECONDARY_COLOR = "#F58E35";
  const TEXT_ON_PRIMARY = "#FFFFFF";

  const [viewMode, setViewMode] = useState("holidays");
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingHolidayId, setEditingHolidayId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [eventTitle, setEventTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Published");
  const [selectedCountryId, setSelectedCountryId] = useState("");
  const [selectedStateId, setSelectedStateId] = useState("");
  const [selectedHubId, setSelectedHubId] = useState("");

  const [holidays, setHolidays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [hubs, setHubs] = useState([]);
  const [filterStates, setFilterStates] = useState([]);
  const [filterHubs, setFilterHubs] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [filterCountry, setFilterCountry] = useState("");
  const [filterState, setFilterState] = useState("");
  const [filterHub, setFilterHub] = useState("");

  const showToast = (icon, title, text) => {
    Swal.fire({
      icon, title, text, toast: true, position: 'top-end',
      showConfirmButton: false, timer: 3000, timerProgressBar: true,
    });
  };

  const fetchHolidays = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("https://tdtlworld.com/hrms-backend/api/holiday/");
      const mappedHolidays = (response.data.data || []).map((h) => ({
        id: h.holiday_id, event_name: h.event_name, start_date: h.start_date,
        end_date: h.end_date, description: h.description || "",
        status: h.status === 1 ? "Published" : "Restricted", country: h.country,
        state: h.state, employee_hub_name: h.employee_hub_name || "N/A",
      }));
      setHolidays(mappedHolidays);
    } catch (error) {
      console.error("Error fetching holidays:", error);
      showToast('error', 'Error', 'Failed to fetch holidays.');
    } finally {
      setLoading(false);
    }
  };

  const fetchDropdownData = async () => {
    try {
      const countryRes = await axiosInstance.get("https://tdtlworld.com/hrms-backend/api/countries/");
      setCountries(countryRes.data.data || []);
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };

  useEffect(() => {
    fetchHolidays();
    fetchDropdownData();
  }, []);

  useEffect(() => {
    if (selectedCountryId) {
      const country = countries.find(c => c.country_id === selectedCountryId);
      if (!country) return;
      axiosInstance.get(`https://tdtlworld.com/hrms-backend/api/states/?country_name=${country.country_name}`)
        .then(res => setStates(res.data.data || []))
        .catch(() => setStates([]));
    } else { setStates([]); setSelectedStateId(""); }
  }, [selectedCountryId, countries]);

  useEffect(() => {
    if (selectedStateId) {
      axiosInstance.get(`https://tdtlworld.com/hrms-backend/api/employee_hub_dropdown/${selectedStateId}/`)
        .then(res => setHubs(res.data.data || []))
        .catch(() => setHubs([]));
    } else { setHubs([]); setSelectedHubId(""); }
  }, [selectedStateId]);

  useEffect(() => {
    if (filterCountry) {
      const country = countries.find(c => c.country_name === filterCountry);
      if (!country) return;
      axiosInstance.get(`https://tdtlworld.com/hrms-backend/api/states/?country_name=${country.country_name}`)
        .then(res => setFilterStates(res.data.data || []))
        .catch(() => setFilterStates([]));
    } else { setFilterStates([]); setFilterState(""); }
  }, [filterCountry, countries]);

  useEffect(() => {
    if (filterState) {
      const state = filterStates.find(s => s.state_name === filterState);
      if (!state) return;
      axiosInstance.get(`https://tdtlworld.com/hrms-backend/api/employee_hub_dropdown/${state.state_id}/`)
        .then(res => setFilterHubs(res.data.data || []))
        .catch(() => setFilterHubs([]));
    } else { setFilterHubs([]); setFilterHub(""); }
  }, [filterState, filterStates]);

  const resetForm = () => {
    setEventTitle(""); setStartDate(""); setEndDate(""); setDescription("");
    setStatus("Published"); setSelectedCountryId(""); setSelectedStateId("");
    setSelectedHubId(""); setIsEditing(false); setEditingHolidayId(null);
  };

  const handleAddNewClick = () => { resetForm(); setIsDialogOpen(true); };

  const handleEditClick = async (holiday) => {
    resetForm(); setIsEditing(true); setEditingHolidayId(holiday.id);
    setEventTitle(holiday.event_name); setStartDate(holiday.start_date);
    setEndDate(holiday.end_date); setDescription(holiday.description);
    setStatus(holiday.status);
    const country = countries.find(c => c.country_name === holiday.country);
    if (country) {
      setSelectedCountryId(country.country_id);
      const statesRes = await axiosInstance.get(`https://tdtlworld.com/hrms-backend/api/states/?country_name=${country.country_name}`);
      const holidayStates = statesRes.data.data || [];
      setStates(holidayStates);
      const state = holidayStates.find(s => s.state_name === holiday.state);
      if (state) {
        setSelectedStateId(state.state_id);
        const hubsRes = await axiosInstance.get(`https://tdtlworld.com/hrms-backend/api/employee_hub_dropdown/${state.state_id}/`);
        const holidayHubs = hubsRes.data.data || [];
        setHubs(holidayHubs);
        const hub = holidayHubs.find(h => h.employee_hub_name === holiday.employee_hub_name);
        if (hub) setSelectedHubId(hub.employee_hub_id);
      }
    }
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => { if (!isSubmitting) { setIsDialogOpen(false); resetForm(); }};

  const handleSubmit = async (e) => {
    e.preventDefault(); setIsSubmitting(true);
    const payload = { event_name: eventTitle, start_date: startDate, end_date: endDate,
      description, is_publish: status === "Published" ? 1 : 0, country: selectedCountryId,
      state: selectedStateId, employee_hub: selectedHubId };
    try {
      if (isEditing) {
        await axiosInstance.put("api/holiday/", { ...payload, holiday_id: editingHolidayId });
        showToast('success', 'Success!', 'Holiday updated successfully.');
      } else {
        await axiosInstance.post("api/holiday/", payload);
        showToast('success', 'Success!', 'Holiday created successfully.');
      }
      fetchHolidays(); handleCloseDialog();
    } catch (error) {
      console.error("Failed to save holiday:", error);
      showToast('error', 'Error', 'Failed to save the holiday.');
    } finally { setIsSubmitting(false); }
  };

  const handleDelete = (holidayId) => {
    Swal.fire({ title: 'Are you sure?', text: "You won't be able to revert this!", icon: 'warning',
      showCancelButton: true, confirmButtonColor: PRIMARY_COLOR, cancelButtonColor: '#757575',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosInstance.delete("api/holiday/", { data: { holiday_id: holidayId } });
          showToast('success', 'Deleted!', 'The holiday has been deleted.'); fetchHolidays();
        } catch (error) {
          console.error("Failed to delete holiday:", error);
          showToast('error', 'Error', 'Could not delete the holiday.');
        }
      }
    });
  };

  const handlePaginationChange = (event, newPage) => {
    setPage(newPage - 1);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredHolidays = holidays.filter((holiday) => {
    const searchMatch = holiday.event_name.toLowerCase().includes(searchTerm.toLowerCase());
    const countryMatch = !filterCountry || holiday.country === filterCountry;
    const stateMatch = !filterState || holiday.state === filterState;
    const hubMatch = !filterHub || (filterHubs.find(h => h.employee_hub_id == filterHub)?.employee_hub_name === holiday.employee_hub_name);
    return searchMatch && countryMatch && stateMatch && hubMatch;
  });

  const paginatedHolidays = filteredHolidays.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  const startEntry = filteredHolidays.length > 0 ? page * rowsPerPage + 1 : 0;
  const endEntry = Math.min((page + 1) * rowsPerPage, filteredHolidays.length);

  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const days = [];
    for (let i = 0; i < firstDayOfMonth; i++) days.push(null);
    for (let i = 1; i <= daysInMonth; i++) days.push(new Date(year, month, i));
    return days;
  };

  const calendarDays = generateCalendarDays();
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const getHolidaysForDay = (date) => {
    if (!date) return [];
    return filteredHolidays.filter(holiday => {
        const startDate = new Date(holiday.start_date);
        const endDate = new Date(holiday.end_date);
        startDate.setHours(0,0,0,0);
        endDate.setHours(0,0,0,0);
        return date >= startDate && date <= endDate;
    });
  };
  
  const renderHolidaysView = () => (
    <>
      <TableContainer>
        <Table sx={{ minWidth: '100%', whiteSpace: 'nowrap' }}>
          <TableHead sx={{ backgroundColor: PRIMARY_COLOR }}>
            <TableRow>
              <TableCell sx={{ color: TEXT_ON_PRIMARY, fontWeight: 'bold' }}>SR NO.</TableCell>
              <TableCell sx={{ color: TEXT_ON_PRIMARY, fontWeight: 'bold' }}>HOLIDAY</TableCell>
              <TableCell sx={{ color: TEXT_ON_PRIMARY, fontWeight: 'bold' }}>START DATE</TableCell>
              <TableCell sx={{ color: TEXT_ON_PRIMARY, fontWeight: 'bold' }}>END DATE</TableCell>
              <TableCell sx={{ color: TEXT_ON_PRIMARY, fontWeight: 'bold' }}>COUNTRY</TableCell>
              <TableCell sx={{ color: TEXT_ON_PRIMARY, fontWeight: 'bold' }}>STATE</TableCell>
              <TableCell sx={{ color: TEXT_ON_PRIMARY, fontWeight: 'bold' }}>HUB</TableCell>
              <TableCell sx={{ color: TEXT_ON_PRIMARY, fontWeight: 'bold' }}>STATUS</TableCell>
              <TableCell align="center" sx={{ color: TEXT_ON_PRIMARY, fontWeight: 'bold' }}>ACTIONS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? Array.from(new Array(rowsPerPage)).map((_, index) => (
              <TableRow key={index}>
                {[...Array(9)].map((_, i) => <TableCell key={i}><Skeleton /></TableCell>)}
              </TableRow>
            )) : paginatedHolidays.length > 0 ? ( paginatedHolidays.map((holiday, index) => (
                <TableRow key={holiday.id} hover>
                  <TableCell sx={{ fontSize: '0.95rem' }}>{page * rowsPerPage + index + 1}</TableCell>
                  <TableCell sx={{ fontSize: '0.95rem' }}>{holiday.event_name}</TableCell>
                  <TableCell sx={{ fontSize: '0.95rem' }}>{new Date(holiday.start_date).toLocaleDateString('en-GB')}</TableCell>
                  <TableCell sx={{ fontSize: '0.95rem' }}>{new Date(holiday.end_date).toLocaleDateString('en-GB')}</TableCell>
                  <TableCell sx={{ fontSize: '0.95rem' }}>{holiday.country}</TableCell>
                  <TableCell sx={{ fontSize: '0.95rem' }}>{holiday.state}</TableCell>
                  <TableCell sx={{ fontSize: '0.95rem' }}>{holiday.employee_hub_name}</TableCell>
                  <TableCell sx={{ fontSize: '0.95rem' }}>{holiday.status}</TableCell>
                  <TableCell>
                    <Box display="flex" justifyContent="center" gap={0.5}>
                      <IconButton onClick={() => handleEditClick(holiday)} sx={{ color: '#2E90FA' }}><EditIcon /></IconButton>
                      <IconButton onClick={() => handleDelete(holiday.id)} sx={{ color: '#D92D20' }}><DeleteIcon /></IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
            ))) : (<TableRow><TableCell colSpan={9} align="center">No holidays found.</TableCell></TableRow>)}
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
          filteredHolidays.length > 0 && (
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <FormControl variant="outlined" size="small">
                        <Select
                            value={rowsPerPage}
                            onChange={handleChangeRowsPerPage}
                            sx={{
                                backgroundColor: PRIMARY_COLOR,
                                color: 'white',
                                borderRadius: '4px',
                                '&:hover': { backgroundColor: PRIMARY_DARK_COLOR },
                                '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                                '& .MuiSvgIcon-root': { color: 'white' },
                            }}
                        >
                            {[5, 10, 15, 25].map((value) => ( <MenuItem key={value} value={value}>{value}</MenuItem> ))}
                        </Select>
                    </FormControl>
                    <Typography variant="body2" color="text.secondary">
                       {`Showing ${startEntry} to ${endEntry} of ${filteredHolidays.length} results`}
                    </Typography>
                </Box>
                <Pagination
                    count={Math.ceil(filteredHolidays.length / rowsPerPage)}
                    page={page + 1}
                    onChange={handlePaginationChange}
                    showFirstButton showLastButton
                    sx={{
                        '& .MuiPaginationItem-root:hover': { backgroundColor: SECONDARY_COLOR, color: 'white' },
                        '& .MuiPaginationItem-page': {
                            color: PRIMARY_COLOR,
                            '&.Mui-selected': {
                                backgroundColor: PRIMARY_COLOR,
                                color: 'white',
                                '&:hover': { backgroundColor: SECONDARY_COLOR }
                            },
                        },
                         '& .MuiPaginationItem-icon': { color: PRIMARY_COLOR }
                    }}
                />
            </Box>
          )
        )}
      </Box>
    </>
  );

  const renderCalendarView = () => (
    <Box sx={{ mt: 2 }}>
      <Paper elevation={1} sx={{ p: 2, mb: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton onClick={() => setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() - 1)))}><ChevronLeftIcon /></IconButton>
            <Button variant="outlined" startIcon={<TodayIcon />} onClick={() => setCurrentMonth(new Date())}>Today</Button>
            <IconButton onClick={() => setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() + 1)))}><ChevronRightIcon /></IconButton>
          </Box>
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: PRIMARY_COLOR }}>
            {currentMonth.toLocaleString('default', { month: 'long' })} {currentMonth.getFullYear()}
          </Typography>
          <Box/>
        </Box>
      </Paper>
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', borderTop: '1px solid #ddd', borderLeft: '1px solid #ddd' }}>
        {daysOfWeek.map(day => (
          <Box key={day} sx={{ textAlign: 'center', p: 1, backgroundColor: '#f5f5f5', fontWeight: 'bold', borderBottom: '1px solid #ddd', borderRight: '1px solid #ddd' }}>
            {day}
          </Box>
        ))}
        {calendarDays.map((day, index) => (
          <Box key={index} sx={{ minHeight: 120, p: 1, borderBottom: '1px solid #ddd', borderRight: '1px solid #ddd',
              backgroundColor: day ? 'white' : '#fafafa' }}>
            {day && (
              <>
                <Typography variant="body2" sx={{ fontWeight: new Date().toDateString() === day.toDateString() ? 'bold' : 'normal', color: new Date().toDateString() === day.toDateString() ? PRIMARY_COLOR : 'text.primary' }}>
                  {day.getDate()}
                </Typography>
                {getHolidaysForDay(day).map(holiday => (
                  <Typography key={holiday.id} sx={{ fontSize: '0.75rem', p: '2px 4px', borderRadius: '4px', color: TEXT_ON_PRIMARY,
                      backgroundColor: holiday.status === 'Published' ? PRIMARY_COLOR : '#F58E35',
                      whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', my: 0.5 }}>
                    {holiday.event_name}
                  </Typography>
                ))}
              </>
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );

  return (
    <Box component={Paper} p={3} elevation={3}>
      <Typography variant="h4" sx={{ color: PRIMARY_COLOR, fontWeight: 'bold', mb: 4 }}>
        Holidays
      </Typography>
      <ToggleButtonGroup 
        value={viewMode} 
        exclusive 
        onChange={(e, newView) => { if (newView) setViewMode(newView); }}
        sx={{ my: 2 }}
      >
        <ToggleButton value="holidays" sx={{ '&.Mui-selected': { backgroundColor: PRIMARY_COLOR, color: TEXT_ON_PRIMARY } }}>List View</ToggleButton>
        <ToggleButton value="calendar" sx={{ '&.Mui-selected': { backgroundColor: PRIMARY_COLOR, color: TEXT_ON_PRIMARY } }}>Calendar View</ToggleButton>
      </ToggleButtonGroup>

      <Box sx={{ display: 'flex', justifyContent: viewMode === 'holidays' ? 'space-between' : 'flex-start', alignItems: 'center', mb: 2,
          flexDirection: isMobile ? 'column' : 'row', gap: 2 }}>
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleAddNewClick}
          sx={{ backgroundColor: PRIMARY_COLOR, color: TEXT_ON_PRIMARY, '&:hover': { backgroundColor: PRIMARY_DARK_COLOR }, alignSelf: isMobile ? 'stretch' : 'auto' }}>
          Add New 
        </Button>
        {viewMode === 'holidays' && (
          <TextField size="small" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{ startAdornment: (<InputAdornment position="start"><SearchIcon /></InputAdornment>)}}
            sx={{ width: isMobile ? '100%' : 'auto' }}
          />
        )}
      </Box>
      
      <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth size="small">
              <InputLabel>Country</InputLabel>
              <Select value={filterCountry} label="Country" onChange={(e) => setFilterCountry(e.target.value)}>
                <MenuItem value=""><em>All Countries</em></MenuItem>
                {countries.map(c => <MenuItem key={c.country_id} value={c.country_name}>{c.country_name}</MenuItem>)}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth size="small" disabled={!filterCountry}>
              <InputLabel>State</InputLabel>
              <Select value={filterState} label="State" onChange={(e) => setFilterState(e.target.value)}>
                <MenuItem value=""><em>All States</em></MenuItem>
                {filterStates.map(s => <MenuItem key={s.state_id} value={s.state_name}>{s.state_name}</MenuItem>)}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth size="small" disabled={!filterState}>
              <InputLabel>Hub</InputLabel>
              <Select value={filterHub} label="Hub" onChange={(e) => setFilterHub(e.target.value)}>
                <MenuItem value=""><em>All Hubs</em></MenuItem>
                {filterHubs.map(h => <MenuItem key={h.employee_hub_id} value={h.employee_hub_id}>{h.employee_hub_name}</MenuItem>)}
              </Select>
            </FormControl>
          </Grid>
      </Grid>

      {viewMode === 'holidays' ? renderHolidaysView() : renderCalendarView()}

      <Dialog open={isDialogOpen} onClose={handleCloseDialog} fullWidth maxWidth="sm">
        <DialogTitle variant="h5" sx={{ color: PRIMARY_COLOR, fontWeight: 'bold' }}>
          {isEditing ? "Edit Holiday" : "Add New Holiday"}
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <TextField label="Holiday" fullWidth margin="dense" value={eventTitle} onChange={(e) => setEventTitle(e.target.value)} required />
            <Box display="flex" gap={2} mt={1}>
              <TextField label="Start Date" type="date" fullWidth margin="dense" InputLabelProps={{ shrink: true }} value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
              <TextField label="End Date" type="date" fullWidth margin="dense" InputLabelProps={{ shrink: true }} value={endDate} onChange={(e) => setEndDate(e.target.value)} inputProps={{ min: startDate }} required />
            </Box>
            <FormControl fullWidth margin="dense" required>
              <InputLabel>Country</InputLabel>
              <Select value={selectedCountryId} label="Country" onChange={(e) => setSelectedCountryId(e.target.value)}>
                {countries.map((c) => (<MenuItem key={c.country_id} value={c.country_id}>{c.country_name}</MenuItem>))}
              </Select>
            </FormControl>
            <FormControl fullWidth margin="dense" required disabled={!selectedCountryId || states.length === 0}>
              <InputLabel>State</InputLabel>
              <Select value={selectedStateId} label="State" onChange={(e) => setSelectedStateId(e.target.value)}>
                {states.map((s) => (<MenuItem key={s.state_id} value={s.state_id}>{s.state_name}</MenuItem>))}
              </Select>
            </FormControl>
            <FormControl fullWidth margin="dense" required disabled={!selectedStateId || hubs.length === 0}>
              <InputLabel>Holiday Hub</InputLabel>
              <Select value={selectedHubId} label="holiday Hub" onChange={(e) => setSelectedHubId(e.target.value)}>
                {hubs.map((h) => (<MenuItem key={h.employee_hub_id} value={h.employee_hub_id}>{h.employee_hub_name}</MenuItem>))}
              </Select>
            </FormControl>
            <TextField label="Description" fullWidth multiline rows={3} margin="dense" value={description} onChange={(e) => setDescription(e.target.value)} required />
            <FormControl fullWidth margin="dense">
              <InputLabel>Status</InputLabel>
              <Select value={status} label="Status" onChange={(e) => setStatus(e.target.value)}>
                <MenuItem value="Published">Published</MenuItem><MenuItem value="Restricted">Restricted</MenuItem>
              </Select>
            </FormControl>
           
          </DialogContent>
          <DialogActions sx={{ p: '0 24px 16px' }}>
            <Button onClick={handleCloseDialog} sx={{ color: '#757575', '&:hover': { backgroundColor: 'rgba(0,0,0,0.04)' } }} disabled={isSubmitting}>Cancel</Button>
            <Button type="submit" variant="contained" sx={{ backgroundColor: PRIMARY_COLOR, color: TEXT_ON_PRIMARY, '&:hover': { backgroundColor: PRIMARY_DARK_COLOR } }} disabled={isSubmitting}>
              {isSubmitting ? <CircularProgress size={24} sx={{ color: TEXT_ON_PRIMARY }} /> : "Save"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
}